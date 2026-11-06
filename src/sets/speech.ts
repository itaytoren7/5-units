import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Turns Markdown + KaTeX into sentences for the Hebrew read-aloud.
 * Formulas are skipped entirely (no spoken math), Markdown syntax is stripped.
 */
export function toSentences(markdown: string): string[] {
  const text = markdown
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]*?\$/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/^\s{0,3}(?:[-*+]|\d+[.)])\s+/gm, '')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/[*_~]+/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\\\(|\\\)|\\\[|\\\]/g, ' ');
  return text
    .split(/(?<=[.!?:;])\s+|\n+/)
    .map((sentence) => sentence.replace(/\s+/g, ' ').replace(/^[\s,.;:–-]+|[\s,;:–-]+$/g, '').trim())
    .filter((sentence) => /[֐-׿A-Za-z0-9]{2,}/.test(sentence));
}

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
}

function pickHebrewVoice(): SpeechSynthesisVoice | null {
  if (!speechSupported()) return null;
  const voices = window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith('he'));
  if (voices.length === 0) return null;
  return voices.find((voice) => /carmit/i.test(voice.name)) ?? voices.find((voice) => voice.localService) ?? voices[0];
}

export type SpeechStatus = 'idle' | 'playing' | 'paused';

export interface ReadAloud {
  status: SpeechStatus;
  /** Index of the sentence being spoken, or -1. */
  index: number;
  /** Which text block is playing (the caller's own key). */
  activeKey: string | null;
  hebrewVoice: boolean;
  supported: boolean;
  play(key: string, sentences: string[], rate: number): void;
  pause(): void;
  resume(): void;
  stop(): void;
}

/** Speaks sentences one at a time so the current one can be highlighted. */
export function useReadAloud(): ReadAloud {
  const [status, setStatus] = useState<SpeechStatus>('idle');
  const [index, setIndex] = useState(-1);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [hebrewVoice, setHebrewVoice] = useState(() => pickHebrewVoice() !== null);
  const supported = speechSupported();
  const queue = useRef<{ sentences: string[]; rate: number; position: number; cancelled: boolean } | null>(null);

  useEffect(() => {
    if (!supported) return;
    const refresh = () => setHebrewVoice(pickHebrewVoice() !== null);
    refresh();
    window.speechSynthesis.addEventListener('voiceschanged', refresh);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', refresh);
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  const finish = useCallback(() => {
    queue.current = null;
    setStatus('idle');
    setIndex(-1);
    setActiveKey(null);
  }, []);

  const speakNext = useCallback(() => {
    const job = queue.current;
    if (!job || job.cancelled) return;
    if (job.position >= job.sentences.length) {
      finish();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(job.sentences[job.position]);
    utterance.lang = 'he-IL';
    utterance.rate = job.rate;
    const voice = pickHebrewVoice();
    if (voice) utterance.voice = voice;
    setIndex(job.position);
    utterance.onend = () => {
      if (queue.current !== job || job.cancelled) return;
      job.position += 1;
      speakNext();
    };
    utterance.onerror = () => {
      if (queue.current === job) finish();
    };
    window.speechSynthesis.speak(utterance);
  }, [finish]);

  const stop = useCallback(() => {
    if (queue.current) queue.current.cancelled = true;
    if (supported) window.speechSynthesis.cancel();
    finish();
  }, [finish, supported]);

  const play = useCallback(
    (key: string, sentences: string[], rate: number) => {
      if (!supported || sentences.length === 0) return;
      if (queue.current) queue.current.cancelled = true;
      window.speechSynthesis.cancel();
      queue.current = { sentences, rate, position: 0, cancelled: false };
      setActiveKey(key);
      setStatus('playing');
      speakNext();
    },
    [speakNext, supported],
  );

  const pause = useCallback(() => {
    if (!supported || status !== 'playing') return;
    window.speechSynthesis.pause();
    setStatus('paused');
  }, [status, supported]);

  const resume = useCallback(() => {
    if (!supported || status !== 'paused') return;
    window.speechSynthesis.resume();
    setStatus('playing');
  }, [status, supported]);

  return { status, index, activeKey, hebrewVoice, supported, play, pause, resume, stop };
}
