import { addDays } from './dates';

/** Spaced-review ladder in days: a mistake comes back after 1, 3, 7 and 14 days. */
export const REVIEW_INTERVALS_DAYS = [1, 3, 7, 14] as const;

export function reviewDueDate(stage: number, fromIso: string): string {
  const index = Math.min(Math.max(stage, 0), REVIEW_INTERVALS_DAYS.length - 1);
  return addDays(fromIso, REVIEW_INTERVALS_DAYS[index]);
}

export function isReviewFinished(stage: number): boolean {
  return stage >= REVIEW_INTERVALS_DAYS.length;
}
