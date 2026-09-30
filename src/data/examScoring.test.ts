import { describe, expect, it } from 'vitest';
import { calculateExamScore, getQuestionValue } from './examScoring';

describe('exam scoring', () => {
  it('computes the correct score for 35581 and 35582', () => {
    expect(calculateExamScore('35581', [{ slot: 3, fraction: 1 }, { slot: 4, fraction: 0.5 }, { slot: 6, fraction: 1 }])).toBe(55);
    expect(calculateExamScore('35582', [{ slot: 3, fraction: 1 }, { slot: 4, fraction: 0.5 }, { slot: 5, fraction: 0 }])).toBeCloseTo(50, 10);
    expect(calculateExamScore('35581', [{ slot: 1, fraction: 100 }])).toBe(22);
  });

  it('uses the right per-question value', () => {
    expect(getQuestionValue('35581')).toBe(22);
    expect(getQuestionValue('35582')).toBeCloseTo(100 / 3, 10);
  });
});
