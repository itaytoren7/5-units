import { addDays, toIsoDate } from '../lib/dates';
import type { SavedState } from '../state/types';

export interface Streak {
  /** Consecutive days ending today (or yesterday, when today has no activity yet). */
  current: number;
  longest: number;
  activeToday: boolean;
  /** True when the streak is alive only thanks to yesterday — studying today keeps it. */
  atRisk: boolean;
}

function dayOf(isoDateTime: string): string | null {
  const date = new Date(isoDateTime);
  return Number.isNaN(date.getTime()) ? null : toIsoDate(date);
}

/** Activity days that can be read from the existing data (so days before this layer existed still count). */
export function activityDaysFromState(saved: SavedState): string[] {
  const days = new Set<string>();
  for (const record of Object.values(saved.practice)) {
    const day = dayOf(record.lastPracticedAt);
    if (day) days.add(day);
  }
  for (const exam of saved.exams) {
    const day = dayOf(exam.finishedAt);
    if (day) days.add(day);
  }
  for (const mistake of saved.mistakes) {
    const day = dayOf(mistake.createdAt);
    if (day) days.add(day);
  }
  for (const review of saved.reviews) {
    if (!review.completedAt) continue;
    const day = dayOf(review.completedAt);
    if (day) days.add(day);
  }
  return [...days].sort();
}

export function mergeDays(...lists: Iterable<string>[]): string[] {
  const days = new Set<string>();
  for (const list of lists) for (const day of list) days.add(day);
  return [...days].sort();
}

export function computeStreak(days: Iterable<string>, today: string): Streak {
  const set = new Set(days);
  const activeToday = set.has(today);
  const yesterday = addDays(today, -1);
  const anchor = activeToday ? today : set.has(yesterday) ? yesterday : null;
  let current = 0;
  if (anchor) {
    let cursor = anchor;
    while (set.has(cursor)) {
      current += 1;
      cursor = addDays(cursor, -1);
    }
  }
  let longest = 0;
  let run = 0;
  let previous: string | null = null;
  for (const day of [...set].sort()) {
    run = previous && addDays(previous, 1) === day ? run + 1 : 1;
    longest = Math.max(longest, run);
    previous = day;
  }
  return { current, longest, activeToday, atRisk: !activeToday && current > 0 };
}
