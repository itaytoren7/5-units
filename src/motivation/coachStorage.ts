/**
 * Small persistent memory of the tough coach, kept under its own key so the main state
 * (bagrut:v1) and the motivation state (bagrut:v1:motivation) keep their shapes.
 */
export const COACH_KEY = 'bagrut:v1:coach';

export interface CoachState {
  version: 1;
  /** Last day of the broken streak the coach already scolded about. */
  streakBreakAck: string | null;
  /** YYYY-MM-DD → how many times a solution was opened too fast. */
  peeks: Record<string, number>;
  /** lesson id or 'slot:<questionnaire>-<n>' → consecutive wrong results. */
  wrongRuns: Record<string, number>;
  /** Banner ids (they include the date) the student closed. */
  dismissed: Record<string, true>;
}

export function defaultCoach(): CoachState {
  return { version: 1, streakBreakAck: null, peeks: {}, wrongRuns: {}, dismissed: {} };
}

const isoDay = /^\d{4}-\d{2}-\d{2}$/;

export function sanitizeCoach(raw: unknown): CoachState {
  const base = defaultCoach();
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return base;
  const value = raw as Record<string, unknown>;
  const numbers = (input: unknown, keyOk: (key: string) => boolean) => {
    const result: Record<string, number> = {};
    if (typeof input === 'object' && input !== null) for (const [key, entry] of Object.entries(input as Record<string, unknown>)) if (keyOk(key) && typeof entry === 'number' && Number.isFinite(entry) && entry > 0) result[key] = Math.floor(entry);
    return result;
  };
  const peekDays = Object.entries(numbers(value.peeks, (key) => isoDay.test(key))).sort(([a], [b]) => b.localeCompare(a)).slice(0, 60);
  const dismissed: Record<string, true> = {};
  if (typeof value.dismissed === 'object' && value.dismissed !== null) {
    Object.entries(value.dismissed as Record<string, unknown>)
      .filter(([, entry]) => entry === true)
      .slice(-200)
      .forEach(([key]) => (dismissed[key] = true));
  }
  return {
    version: 1,
    streakBreakAck: typeof value.streakBreakAck === 'string' && isoDay.test(value.streakBreakAck) ? value.streakBreakAck : null,
    peeks: Object.fromEntries(peekDays),
    wrongRuns: numbers(value.wrongRuns, () => true),
    dismissed,
  };
}

export function loadCoach(): CoachState {
  try {
    const text = localStorage.getItem(COACH_KEY);
    return text ? sanitizeCoach(JSON.parse(text)) : defaultCoach();
  } catch {
    return defaultCoach();
  }
}

export function saveCoach(state: CoachState): void {
  try {
    localStorage.setItem(COACH_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — keep working in memory */
  }
}

export function clearCoach(): void {
  try {
    localStorage.removeItem(COACH_KEY);
  } catch {
    /* ignore */
  }
}

/** Reads the optional `coach` field of a backup file; null when the backup predates it. */
export function coachFromBackup(text: string): CoachState | null {
  try {
    const parsed: unknown = JSON.parse(text);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const field = (parsed as Record<string, unknown>).coach;
    return field === undefined ? null : sanitizeCoach(field);
  } catch {
    return null;
  }
}
