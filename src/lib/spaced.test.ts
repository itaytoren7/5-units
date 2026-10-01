import { describe, expect, it } from 'vitest';
import { REVIEW_INTERVALS_DAYS, isReviewFinished, reviewDueDate } from './spaced';

describe('spaced review ladder', () => {
  it('uses the 1 / 3 / 7 / 14 day ladder', () => {
    expect(REVIEW_INTERVALS_DAYS).toEqual([1, 3, 7, 14]);
    expect(reviewDueDate(0, '2026-05-01')).toBe('2026-05-02');
    expect(reviewDueDate(1, '2026-05-01')).toBe('2026-05-04');
    expect(reviewDueDate(2, '2026-05-01')).toBe('2026-05-08');
    expect(reviewDueDate(3, '2026-05-01')).toBe('2026-05-15');
    expect(reviewDueDate(9, '2026-05-01')).toBe('2026-05-15');
  });
  it('finishes after the last interval', () => {
    expect(isReviewFinished(3)).toBe(false);
    expect(isReviewFinished(4)).toBe(true);
  });
});
