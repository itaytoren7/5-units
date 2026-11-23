import { useSyncExternalStore } from 'react';

/** Listening progress and preferences, under their own key. The main state in bagrut:v1 is untouched. */
export const PODCAST_KEY = 'bagrut:v1:podcast';

export const PLAYBACK_RATES = [1, 1.25, 1.5] as const;
export type PlaybackRate = (typeof PLAYBACK_RATES)[number];

export interface EpisodeProgress {
  /** Seconds into the episode. 0 once it was heard to the end. */
  position: number;
  duration?: number;
  done?: boolean;
  updatedAt: string;
}

export interface PodcastState {
  version: 1;
  rate: PlaybackRate;
  captions: boolean;
  progress: Record<string, EpisodeProgress>;
}

export function defaultPodcastState(): PodcastState {
  return { version: 1, rate: 1, captions: true, progress: {} };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function sanitizePodcastState(raw: unknown): PodcastState {
  const base = defaultPodcastState();
  if (!isRecord(raw)) return base;
  const rate = (PLAYBACK_RATES as readonly number[]).includes(raw.rate as number) ? (raw.rate as PlaybackRate) : 1;
  const captions = typeof raw.captions === 'boolean' ? raw.captions : true;
  const progress: Record<string, EpisodeProgress> = {};
  if (isRecord(raw.progress)) {
    for (const [id, entry] of Object.entries(raw.progress)) {
      if (!isRecord(entry) || typeof entry.position !== 'number' || !Number.isFinite(entry.position)) continue;
      const record: EpisodeProgress = {
        position: Math.max(0, entry.position),
        updatedAt: typeof entry.updatedAt === 'string' ? entry.updatedAt : new Date().toISOString(),
      };
      if (typeof entry.duration === 'number' && Number.isFinite(entry.duration) && entry.duration > 0) record.duration = entry.duration;
      if (entry.done === true) record.done = true;
      progress[id] = record;
    }
  }
  return { version: 1, rate, captions, progress };
}

export function loadPodcast(): PodcastState {
  try {
    const text = localStorage.getItem(PODCAST_KEY);
    return text ? sanitizePodcastState(JSON.parse(text)) : defaultPodcastState();
  } catch {
    return defaultPodcastState();
  }
}

let current: PodcastState | null = null;
const listeners = new Set<() => void>();

function read(): PodcastState {
  if (!current) current = loadPodcast();
  return current;
}

function write(next: PodcastState) {
  current = next;
  try {
    localStorage.setItem(PODCAST_KEY, JSON.stringify(next));
  } catch {
    // Private mode or a full disk: the session still works, it just won't be remembered.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function usePodcastState(): PodcastState {
  return useSyncExternalStore(subscribe, read, read);
}

export function updatePodcast(mutate: (state: PodcastState) => PodcastState) {
  write(mutate(read()));
}

export function setPlaybackRate(rate: PlaybackRate) {
  updatePodcast((state) => ({ ...state, rate }));
}

export function setCaptionsEnabled(captions: boolean) {
  updatePodcast((state) => ({ ...state, captions }));
}

export function savePosition(id: string, position: number, duration?: number) {
  updatePodcast((state) => ({
    ...state,
    progress: { ...state.progress, [id]: { position: Math.max(0, position), duration: duration ?? state.progress[id]?.duration, updatedAt: new Date().toISOString() } },
  }));
}

export function markDone(id: string, duration?: number) {
  updatePodcast((state) => ({
    ...state,
    progress: { ...state.progress, [id]: { position: 0, duration: duration ?? state.progress[id]?.duration, done: true, updatedAt: new Date().toISOString() } },
  }));
}

/** Where to resume: only when meaningfully into the episode and not at the very end. */
export function resumePosition(state: PodcastState, id: string, duration?: number): number {
  const entry = state.progress[id];
  if (!entry || entry.done || entry.position < 3) return 0;
  const total = duration ?? entry.duration;
  if (total && entry.position > total - 3) return 0;
  return entry.position;
}
