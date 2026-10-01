import type { MotivationState } from './types';

export const MOTIVATION_KEY = 'bagrut:v1:motivation';

export function defaultMotivation(): MotivationState {
  return { version: 1, activityDays: [], unlockedBadges: {}, seeded: false, reducedMotion: false };
}

const isoDay = /^\d{4}-\d{2}-\d{2}$/;

export function sanitizeMotivation(raw: unknown): MotivationState {
  const base = defaultMotivation();
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return base;
  const value = raw as Record<string, unknown>;
  const activityDays = Array.isArray(value.activityDays) ? [...new Set(value.activityDays.filter((day): day is string => typeof day === 'string' && isoDay.test(day)))].sort() : [];
  const unlockedBadges: Record<string, string> = {};
  if (typeof value.unlockedBadges === 'object' && value.unlockedBadges !== null) {
    for (const [id, at] of Object.entries(value.unlockedBadges as Record<string, unknown>)) if (typeof at === 'string') unlockedBadges[id] = at;
  }
  return { version: 1, activityDays, unlockedBadges, seeded: value.seeded === true, reducedMotion: value.reducedMotion === true };
}

export function loadMotivation(): MotivationState {
  try {
    const text = localStorage.getItem(MOTIVATION_KEY);
    return text ? sanitizeMotivation(JSON.parse(text)) : defaultMotivation();
  } catch {
    return defaultMotivation();
  }
}

export function saveMotivation(state: MotivationState): void {
  try {
    localStorage.setItem(MOTIVATION_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — keep working in memory */
  }
}

export function clearMotivation(): void {
  try {
    localStorage.removeItem(MOTIVATION_KEY);
  } catch {
    /* ignore */
  }
}

/** Reads the optional `motivation` field of a backup file; returns null when the backup predates this layer. */
export function motivationFromBackup(text: string): MotivationState | null {
  try {
    const parsed: unknown = JSON.parse(text);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const field = (parsed as Record<string, unknown>).motivation;
    return field === undefined ? null : sanitizeMotivation(field);
  } catch {
    return null;
  }
}
