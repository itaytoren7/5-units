import { useCallback, useEffect, useRef, useState } from 'react';
import { episodeAssetUrl, type Episode } from './catalog';
import { loadPodcast, markDone, resumePosition, savePosition, type PlaybackRate } from './storage';

export interface Player {
  episode: Episode | null;
  playing: boolean;
  /** Buffering after a play request. */
  waiting: boolean;
  time: number;
  duration: number;
  error: string | null;
  /** Opens an episode. Same episode again → toggles. */
  play: (episode: Episode, options?: { autoplay?: boolean }) => void;
  toggle: () => void;
  seek: (seconds: number) => void;
  skip: (delta: number) => void;
}

const SKIP_SECONDS = 15;

/**
 * One hidden <audio> element for the whole page, so only one episode can ever play at a time and
 * the controls, the captions and the lock-screen all talk to the same clock.
 */
export function usePlayer(rate: PlaybackRate, albumOf?: (episode: Episode) => string): Player {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const episodeRef = useRef<Episode | null>(null);
  const lastSaved = useRef(0);
  const resumeRef = useRef(0);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const persist = (force = false) => {
      const current = episodeRef.current;
      if (!current) return;
      const now = Date.now();
      if (!force && now - lastSaved.current < 3000) return;
      lastSaved.current = now;
      const total = audio.duration || current.duration;
      if (audio.currentTime > 0 && (!total || audio.currentTime < total - 1)) savePosition(current.id, audio.currentTime, total || undefined);
    };
    const onMeta = () => {
      setDuration(audio.duration || 0);
      const resume = resumeRef.current;
      resumeRef.current = 0;
      if (resume > 0 && audio.duration && resume < audio.duration - 3 && Math.abs(audio.currentTime - resume) > 1) audio.currentTime = resume;
    };
    const onTime = () => {
      setTime(audio.currentTime);
      persist();
    };
    const onPlay = () => {
      setPlaying(true);
      setError(null);
    };
    const onPause = () => {
      setPlaying(false);
      setWaiting(false);
      persist(true);
    };
    const onEnded = () => {
      const current = episodeRef.current;
      if (current) markDone(current.id, audio.duration || current.duration);
      setPlaying(false);
      setTime(audio.duration || 0);
    };
    const onWaiting = () => setWaiting(true);
    const onReady = () => setWaiting(false);
    const onError = () => {
      if (!audio.getAttribute('src')) return;
      setWaiting(false);
      setPlaying(false);
      setError('לא הצלחנו לטעון את הפרק. בדקו את החיבור ונסו שוב.');
    };
    const onHide = () => {
      if (document.visibilityState === 'hidden') persist(true);
    };
    const onPageHide = () => persist(true);

    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onReady);
    audio.addEventListener('canplay', onReady);
    audio.addEventListener('error', onError);
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onPageHide);

    // Lock-screen and headphone controls, where the browser offers them.
    const session = 'mediaSession' in navigator ? navigator.mediaSession : null;
    const handlers: Array<[MediaSessionAction, MediaSessionActionHandler]> = [
      ['play', () => void audio.play().catch(() => undefined)],
      ['pause', () => audio.pause()],
      ['seekbackward', () => (audio.currentTime = Math.max(0, audio.currentTime - SKIP_SECONDS))],
      ['seekforward', () => (audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + SKIP_SECONDS))],
      ['seekto', (details) => (audio.currentTime = details.seekTime ?? audio.currentTime)],
    ];
    if (session) {
      for (const [action, handler] of handlers) {
        try {
          session.setActionHandler(action, handler);
        } catch {
          // Not every browser supports every action.
        }
      }
    }

    return () => {
      persist(true);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onReady);
      audio.removeEventListener('canplay', onReady);
      audio.removeEventListener('error', onError);
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', onPageHide);
      if (session) {
        for (const [action] of handlers) {
          try {
            session.setActionHandler(action, null);
          } catch {
            // ignore
          }
        }
        session.metadata = null;
      }
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }, [rate]);

  const play = useCallback(
    (next: Episode, options?: { autoplay?: boolean }) => {
      const audio = audioRef.current;
      if (!audio) return;
      const autoplay = options?.autoplay ?? true;

      if (episodeRef.current?.id === next.id) {
        if (!autoplay) return;
        if (audio.paused) void audio.play().catch(() => setWaiting(false));
        else audio.pause();
        return;
      }

      const previous = episodeRef.current;
      if (previous && audio.currentTime > 0) {
        const total = audio.duration || previous.duration;
        if (!total || audio.currentTime < total - 1) savePosition(previous.id, audio.currentTime, total || undefined);
      }

      episodeRef.current = next;
      setEpisode(next);
      setError(null);
      setDuration(next.duration ?? 0);

      const resume = resumePosition(loadPodcast(), next.id, next.duration);
      resumeRef.current = resume;
      setTime(resume);

      audio.src = episodeAssetUrl(next.file);
      audio.playbackRate = rate;
      // Before metadata arrives this sets the start position; onMeta double-checks it landed.
      if (resume > 0) audio.currentTime = resume;

      if ('mediaSession' in navigator) {
        try {
          navigator.mediaSession.metadata = new MediaMetadata({ title: next.title, artist: 'יעל ועומר · פודקאסט 5 יחידות', album: albumOf?.(next) ?? '' });
        } catch {
          // ignore
        }
      }

      if (autoplay) {
        setWaiting(true);
        void audio.play().catch(() => setWaiting(false));
      }
    },
    [rate, albumOf],
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !episodeRef.current) return;
    if (audio.paused) {
      setWaiting(true);
      void audio.play().catch(() => setWaiting(false));
    } else audio.pause();
  }, []);

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !episodeRef.current) return;
    const max = audio.duration || episodeRef.current.duration || Infinity;
    audio.currentTime = Math.min(Math.max(0, seconds), max);
    setTime(audio.currentTime);
  }, []);

  const skip = useCallback((delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    seek(audio.currentTime + delta);
  }, [seek]);

  return { episode, playing, waiting, time, duration, error, play, toggle, seek, skip };
}

export { SKIP_SECONDS };
