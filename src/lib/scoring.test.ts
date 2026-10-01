import { describe, expect, it } from 'vitest';
import { calculateExamScore, clampFraction, getQuestionValue } from './scoring';

describe('exam scoring', () => {
  it('scores 35581 with 22 points per question, capped at 100', () => {
    expect(calculateExamScore('35581', [{ slot: 3, fraction: 1 }, { slot: 4, fraction: 0.5 }, { slot: 6, fraction: 1 }])).toBe(55);
    expect(calculateExamScore('35581', [3, 4, 6, 7, 8].map((slot) => ({ slot, fraction: 1 })))).toBe(100);
    expect(calculateExamScore('35581', [{ slot: 1, fraction: 100 }])).toBe(22);
  });
  it('scores 35582 with 33⅓ points per question', () => {
    expect(calculateExamScore('35582', [{ slot: 3, fraction: 1 }, { slot: 4, fraction: 0.5 }, { slot: 5, fraction: 0 }])).toBeCloseTo(50, 5);
    expect(calculateExamScore('35582', [3, 4, 5].map((slot) => ({ slot, fraction: 1 })))).toBe(100);
  });
  it('exposes per-question values and clamps fractions', () => {
    expect(getQuestionValue('35581')).toBe(22);
    expect(getQuestionValue('35582')).toBeCloseTo(100 / 3, 10);
    expect(clampFraction(75)).toBe(0.75);
    expect(clampFraction(-2)).toBe(0);
    expect(clampFraction(Number.NaN)).toBe(0);
  });
});
