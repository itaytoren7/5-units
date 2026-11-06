import { useSyncExternalStore } from 'react';

/** Everything the exercise sets store, under their own key (the main state in bagrut:v1 is untouched). */
export const SETS_KEY = 'bagrut:v1:sets';

export type SectionOutcome = 'correct' | 'wrong';

export interface SetProgress {
  /** `${exerciseId}:${sectionLabel}` → outcome of the last check. */
  results: Record<string, SectionOutcome>;
  /** Index of the exercise the student is on. */
  current: number;
  completedAt?: string;
}

export interface SetsState {
  version: 1;
  /** Read-aloud speed, remembered. */
  speechRate: number;
  progress: Record<string, SetProgress>;
}

export const SPEECH_RATES = [0.75, 1, 1.25, 1.5] as const;

export function defaultSetsState(): SetsState {
  return { version: 1, speechRate: 1, progress: {} };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function sanitizeSetsState(raw: unknown): SetsState {
  const base = defaultSetsState();
  if (!isRecord(raw)) return base;
  const rate = typeof raw.speechRate === 'number' && (SPEECH_RATES as readonly number[]).includes(raw.speechRate) ? raw.speechRate : 1;
  const progress: Record<string, SetProgress> = {};
  if (isRecord(raw.progress)) {
    for (const [setId, entry] of Object.entries(raw.progress)) {
      if (!isRecord(entry)) continue;
      const results: Record<string, SectionOutcome> = {};
      if (isRecord(entry.results)) for (const [key, outcome] of Object.entries(entry.results)) if (outcome === 'correct' || outcome === 'wrong') results[key] = outcome;
      const current = typeof entry.current === 'number' && Number.isFinite(entry.current) ? Math.max(0, Math.floor(entry.current)) : 0;
      const record: SetProgress = { results, current };
      if (typeof entry.completedAt === 'string') record.completedAt = entry.completedAt;
      progress[setId] = record;
    }
  }
  return { version: 1, speechRate: rate, progress };
}

export function loadSets(): SetsState {
  try {
    const text = localStorage.getItem(SETS_KEY);
    return text ? sanitizeSetsState(JSON.parse(text)) : defaultSetsState();
  } catch {
    return defaultSetsState();
  }
}

function persist(state: SetsState): void {
  try {
    localStorage.setItem(SETS_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — keep working in memory */
  }
}

/* A tiny module-level store so every component sees the same state without a provider. */
let current: SetsState | null = null;
const listeners = new Set<() => void>();

function read(): SetsState {
  if (!current) current = loadSets();
  return current;
}

function write(next: SetsState): void {
  current = next;
  persist(next);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSetsState(): SetsState {
  return useSyncExternalStore(subscribe, read, read);
}

export function updateSets(updater: (state: SetsState) => SetsState): void {
  write(updater(read()));
}

export function setSpeechRate(rate: number): void {
  updateSets((state) => ({ ...state, speechRate: rate }));
}

export function recordOutcome(setId: string, exerciseId: string, label: string, outcome: SectionOutcome): void {
  updateSets((state) => {
    const entry = state.progress[setId] ?? { results: {}, current: 0 };
    return { ...state, progress: { ...state.progress, [setId]: { ...entry, results: { ...entry.results, [`${exerciseId}:${label}`]: outcome } } } };
  });
}

export function setCurrentExercise(setId: string, index: number, completed = false): void {
  updateSets((state) => {
    const entry = state.progress[setId] ?? { results: {}, current: 0 };
    const next: SetProgress = { ...entry, current: index };
    if (completed) next.completedAt = new Date().toISOString();
    return { ...state, progress: { ...state.progress, [setId]: next } };
  });
}

export function resetSet(setId: string, keepWrongOnly = false): void {
  updateSets((state) => {
    const entry = state.progress[setId];
    if (!entry) return state;
    const results: Record<string, SectionOutcome> = {};
    if (keepWrongOnly) for (const [key, outcome] of Object.entries(entry.results)) if (outcome === 'wrong') results[key] = outcome;
    return { ...state, progress: { ...state.progress, [setId]: { results, current: 0 } } };
  });
}

/** Reads the optional `sets` field of a backup; null when the backup predates the sets. */
export function setsFromBackup(text: string): SetsState | null {
  try {
    const parsed: unknown = JSON.parse(text);
    if (!isRecord(parsed) || parsed.sets === undefined) return null;
    return sanitizeSetsState(parsed.sets);
  } catch {
    return null;
  }
}

export function importSetsFromBackup(text: string): void {
  const imported = setsFromBackup(text);
  if (imported) write(imported);
}

export function clearSets(): void {
  try {
    localStorage.removeItem(SETS_KEY);
  } catch {
    /* ignore */
  }
  write(defaultSetsState());
}
