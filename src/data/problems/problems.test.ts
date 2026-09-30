import { evaluate } from 'mathjs';
import { describe, expect, it } from 'vitest';
import { seededProblems } from './index';

describe('seeded problem bank', () => {
  it('links every problem to a real questionnaire and a real topic id', () => {
    const validCodes = new Set(['35581', '35582']);
    const validTopicIds = new Set([
      'probability',
      'differential-calculus',
      'trigonometry',
      'analytic-geometry',
      'complex-numbers',
      'differential-integral',
      'euclidean-geometry',
      'integral-calculus',
    ]);

    expect(seededProblems.length).toBeGreaterThan(0);
    for (const problem of seededProblems) {
      expect(validCodes.has(problem.questionnaire)).toBe(true);
      expect(validTopicIds.has(problem.topicId)).toBe(true);
      expect(problem.sections.length).toBeGreaterThan(0);
      expect(problem.difficulty).toBeGreaterThanOrEqual(1);
      expect(problem.difficulty).toBeLessThanOrEqual(3);
      expect(problem.verified).toBe(false);
      expect(problem.source).toMatch(/^(ai-generated|teacher|self)$/);
    }
  });

  it('recomputes each numeric seed with an independent mathjs check', () => {
    const expectedBySectionId: Record<string, string> = {
      '35581-3-1-a': '25/28',
      '35581-4-1-a': 'sqrt(84)',
      '35581-6-1-b': '2',
      '35581-7-1-a': '1/2',
      '35581-8-1-b': '100',
      '35582-3-1-a': '5',
      '35582-4-1-a': '1',
      '35582-5-1-a': '32/3',
    };

    for (const problem of seededProblems) {
      for (const section of problem.sections) {
        if (section.numericAnswer === undefined) continue;
        const expectedExpr = expectedBySectionId[section.id];
        expect(expectedExpr, `Missing independent verification for ${section.id}`).toBeDefined();
        const result = evaluate(expectedExpr);
        expect(result).toBeCloseTo(section.numericAnswer, 6);
      }
    }
  });
});
