/**
 * Independent numeric verification of 35581 slot 6 (new problems 35581-6-4 .. 35581-6-10;
 * problems 1–3 are verified in ../35581.test.ts).
 * Every numericAnswer is recomputed from the numeric function: critical / inflection points by
 * numeric differentiation, intersections by root finding, areas by Simpson integration of |f|,
 * tangents by numeric derivatives, parameters by solving the stated conditions — never by the
 * antiderivative written in the solution.
 */
import { describe, expect, it } from 'vitest';
import { slot6Problems } from './slot6';
import {
  absoluteArea,
  findCriticalPoints,
  findInflectionPoints,
  findRoots,
  numericDerivative,
  type RealFn,
} from '../verify';

type Point = [number, number];

function section(sectionId: string) {
  for (const problem of slot6Problems) {
    const found = problem.sections.find((item) => item.id === sectionId);
    if (found) return found;
  }
  throw new Error(`Unknown section ${sectionId}`);
}

function answer(sectionId: string): number {
  const found = section(sectionId);
  if (found.numericAnswer === undefined) throw new Error(`${sectionId} has no numericAnswer`);
  return found.numericAnswer;
}

function expectAnswer(sectionId: string, computed: number, digits = 8) {
  expect(answer(sectionId)).toBeCloseTo(computed, digits);
}

function shoelace(points: Point[]): number {
  let sum = 0;
  points.forEach(([x1, y1], index) => {
    const [x2, y2] = points[(index + 1) % points.length];
    sum += x1 * y2 - x2 * y1;
  });
  return Math.abs(sum) / 2;
}

/** Tangent line to f at x0 as [slope, intercept], using a numeric derivative. */
function tangent(f: RealFn, x0: number): [number, number] {
  const m = numericDerivative(f, x0, 1e-6);
  return [m, f(x0) - m * x0];
}

/** Number of distinct solutions of f(x) = k on [a, b] (sign changes of f − k). */
function countSolutions(f: RealFn, k: number, a: number, b: number): number {
  return findRoots((x) => f(x) - k, a, b, 20000).length;
}

const newProblems = slot6Problems.filter((problem) => Number(problem.id.split('-')[2]) >= 4);

describe('35581 slot 6 – structure of the new problems', () => {
  it('has 7 new problems with ids 4..10', () => {
    expect(newProblems.map((problem) => problem.id)).toEqual([4, 5, 6, 7, 8, 9, 10].map((n) => `35581-6-${n}`));
    expect(slot6Problems.slice(0, 3).map((problem) => problem.id)).toEqual(['35581-6-1', '35581-6-2', '35581-6-3']);
  });

  it('follows the bagrut structure rules', () => {
    for (const problem of newProblems) {
      expect(problem.questionnaire).toBe('35581');
      expect(problem.slot).toBe(6);
      expect(['differential-calculus', 'integral-calculus']).toContain(problem.topicId);
      expect(problem.subtopicIds.length).toBeGreaterThanOrEqual(2);
      expect(problem.subtopicIds.length).toBeLessThanOrEqual(4);
      expect([2, 3]).toContain(problem.difficulty);
      expect(problem.estimatedMinutes).toBeGreaterThanOrEqual(15);
      expect(problem.estimatedMinutes).toBeLessThanOrEqual(40);
      expect(problem.verified).toBe(false);
      expect(problem.source).toBe('ai-generated');
      expect(problem.sections.length).toBeGreaterThanOrEqual(3);
      expect(problem.sections.length).toBeLessThanOrEqual(4);
      const labels = ['א', 'ב', 'ג', 'ד'];
      const letters = ['a', 'b', 'c', 'd'];
      problem.sections.forEach((item, index) => {
        expect(item.label).toBe(labels[index]);
        expect(item.id).toBe(`${problem.id}-${letters[index]}`);
        expect(item.hints.length).toBeGreaterThanOrEqual(2);
        expect(item.hints.length).toBeLessThanOrEqual(3);
        expect(item.solutionSteps.length).toBeGreaterThanOrEqual(3);
        expect(item.solutionSteps.length).toBeLessThanOrEqual(8);
      });
    }
    const difficulties = newProblems.map((problem) => problem.difficulty);
    expect(Math.max(...difficulties)).toBe(3);
    expect(difficulties.filter((d) => d === 3).length).toBeGreaterThanOrEqual(3);
  });

  it('never references out-of-scope subtopics', () => {
    const out = ['diff-tangent-external', 'int-roots-trig', 'int-rational-division', 'int-volume', 'int-extrema', 'diff-word-extrema', 'diff-geometric-extrema'];
    for (const problem of newProblems) for (const id of problem.subtopicIds) expect(out).not.toContain(id);
  });
});

describe('35581-6-4 – cubic with parameters', () => {
  // Solve the stated conditions f'(3)=0 and f(1)=-11 numerically by a grid-free linear solve on (a, b).
  const fab = (a: number, b: number): RealFn => (x) => x ** 3 + a * x * x + b * x;
  const cond1 = (a: number, b: number) => numericDerivative(fab(a, b), 3); // linear in a, b
  const cond2 = (a: number, b: number) => fab(a, b)(1) + 11;
  // Linear system from evaluating the conditions at basis points.
  const c10 = cond1(0, 0);
  const c1a = cond1(1, 0) - c10;
  const c1b = cond1(0, 1) - c10;
  const c20 = cond2(0, 0);
  const c2a = cond2(1, 0) - c20;
  const c2b = cond2(0, 1) - c20;
  const det = c1a * c2b - c1b * c2a;
  const a = (-c10 * c2b + c1b * c20) / det;
  const b = (-c1a * c20 + c10 * c2a) / det;
  const f = fab(a, b);

  it('parameters satisfy the givens (a = -3, b = -9)', () => {
    expect(a).toBeCloseTo(-3, 6);
    expect(b).toBeCloseTo(-9, 6);
    const crit = findCriticalPoints(f, -5, 6);
    expect(crit.length).toBe(2);
    expect(crit[1]).toBeCloseTo(3, 6);
    expect(f(1)).toBeCloseTo(-11, 6);
  });
  it('investigation: extrema, inflection, x-intercepts', () => {
    const crit = findCriticalPoints(f, -5, 6);
    expect(crit[0]).toBeCloseTo(-1, 6);
    expect(f(crit[0])).toBeCloseTo(5, 6);
    expect(f(crit[1])).toBeCloseTo(-27, 6);
    const infl = findInflectionPoints(f, -5, 6);
    expect(infl.length).toBeGreaterThanOrEqual(1);
    expect(infl[0]).toBeCloseTo(1, 4);
    const roots = findRoots(f, -5, 7);
    expect(roots.length).toBe(3);
    expect(roots[0]).toBeCloseTo((3 - 3 * Math.sqrt(5)) / 2, 8);
    expect(roots[2]).toBeCloseTo((3 + 3 * Math.sqrt(5)) / 2, 8);
  });
  it('35581-6-4-c', () => {
    const [, intercept] = tangent(f, 1);
    expectAnswer('35581-6-4-c', intercept, 5);
  });
  it('35581-6-4-d', () => expectAnswer('35581-6-4-d', absoluteArea(f, -1, 1, 20000), 8));
});

describe('35581-6-5 – rational function x/(x²−1)²', () => {
  const f: RealFn = (x) => x / (x * x - 1) ** 2;
  it('model satisfies the givens (odd, no extrema, claimed derivative)', () => {
    for (const x of [0.3, 1.7, 3]) expect(f(-x)).toBeCloseTo(-f(x), 12);
    expect(findCriticalPoints(f, -0.95, 0.95).length).toBe(0);
    expect(findCriticalPoints(f, 1.05, 10).length).toBe(0);
    expect(findCriticalPoints(f, -10, -1.05).length).toBe(0);
    for (const x of [-3, -0.5, 0.2, 2.5]) expect(numericDerivative(f, x)).toBeCloseTo(-(3 * x * x + 1) / (x * x - 1) ** 3, 5);
    expect(numericDerivative(f, 0.5)).toBeGreaterThan(0);
    expect(numericDerivative(f, 2)).toBeLessThan(0);
  });
  it('35581-6-5-c', () => {
    const [m, c] = tangent(f, 0);
    expect(m).toBeCloseTo(1, 6);
    expect(c).toBeCloseTo(0, 8);
    const meets = findRoots((x) => f(x) - (m * x + c), 1.01, 10);
    expect(meets.length).toBe(1);
    expectAnswer('35581-6-5-c', meets[0], 5);
  });
  it('35581-6-5-d', () => expectAnswer('35581-6-5-d', absoluteArea(f, Math.SQRT2, 2, 20000), 8));
});

describe('35581-6-6 – function from its derivative', () => {
  const fPrime: RealFn = (x) => 3 * x * x - 6 * x;
  const f: RealFn = (x) => x ** 3 - 3 * x * x + 2;
  it('candidate satisfies the givens', () => {
    for (const x of [-2, -0.5, 0, 1, 2.5, 4]) expect(numericDerivative(f, x)).toBeCloseTo(fPrime(x), 6);
    expect(f(3)).toBeCloseTo(2, 12);
    const crit = findCriticalPoints(f, -3, 5);
    expect(crit.map(f)).toEqual([expect.closeTo(2, 6), expect.closeTo(-2, 6)]);
    expect(findInflectionPoints(f, -3, 5)[0]).toBeCloseTo(1, 4);
  });
  it('35581-6-6-c', () => expectAnswer('35581-6-6-c', tangent(f, 1)[0], 5));
  it('35581-6-6-d', () => {
    const [m, c] = tangent(f, 1);
    expectAnswer('35581-6-6-d', absoluteArea((x) => f(x) - (m * x + c), 0, 1, 20000), 6);
  });
});

describe('35581-6-7 – |x⁴ − 4x²|', () => {
  const f: RealFn = (x) => x ** 4 - 4 * x * x;
  const g: RealFn = (x) => Math.abs(f(x));
  it('model: non-differentiable only at ±2, extrema of g', () => {
    const h = 1e-6;
    for (const x0 of [-2, 2]) {
      const left = (g(x0) - g(x0 - h)) / h;
      const right = (g(x0 + h) - g(x0)) / h;
      expect(Math.abs(left - right)).toBeGreaterThan(30);
    }
    expect((g(h) - g(0)) / h).toBeCloseTo((g(0) - g(-h)) / h, 4);
    const crit = findCriticalPoints(g, -1.9, 1.9);
    expect(crit.length).toBe(3);
    expect(g(crit[0])).toBeCloseTo(4, 6);
    expect(crit[2]).toBeCloseTo(Math.SQRT2, 6);
  });
  it('35581-6-7-c', () => {
    const [m, c] = tangent(g, 1);
    expectAnswer('35581-6-7-c', shoelace([[0, 0], [-c / m, 0], [0, c]]), 6);
  });
  it('35581-6-7-d', () => {
    const zeros = findRoots((x) => f(x) + 1e-12 * x, -3, 3);
    expect(zeros[0]).toBeCloseTo(-2, 8);
    expect(zeros[zeros.length - 1]).toBeCloseTo(2, 8);
    expectAnswer('35581-6-7-d', absoluteArea(g, -2, 2, 20000), 8);
  });
});

describe('35581-6-8 – from f′ to f', () => {
  const fPrime: RealFn = (x) => 6 * (x + 1) * (x - 2);
  const f: RealFn = (x) => 2 * x ** 3 - 3 * x * x - 12 * x + 5;
  it('candidate satisfies the givens and the claimed extrema / inflection', () => {
    for (const x of [-3, -1, 0, 0.5, 2, 3.5]) expect(numericDerivative(f, x)).toBeCloseTo(fPrime(x), 6);
    expect(f(0)).toBe(5);
    const crit = findCriticalPoints(f, -4, 5);
    expect(crit[0]).toBeCloseTo(-1, 6);
    expect(crit[1]).toBeCloseTo(2, 6);
    expect(f(crit[0])).toBeCloseTo(12, 6);
    expect(f(crit[1])).toBeCloseTo(-15, 6);
    expect(findCriticalPoints(fPrime, -4, 5)[0]).toBeCloseTo(0.5, 6);
    expect(findInflectionPoints(f, -4, 5)[0]).toBeCloseTo(0.5, 4);
  });
  it('35581-6-8-c', () => {
    const zeros = findRoots(fPrime, -4, 5);
    const area = absoluteArea(fPrime, zeros[0], zeros[1], 20000);
    expectAnswer('35581-6-8-c', area, 8);
    expect(area).toBeCloseTo(f(-1) - f(2), 8);
  });
  it('35581-6-8-d (three solutions exactly for -15 < k < 12)', () => {
    expect(countSolutions(f, 11.9, -10, 10)).toBe(3);
    expect(countSolutions(f, -14.9, -10, 10)).toBe(3);
    expect(countSolutions(f, 12.1, -10, 10)).toBe(1);
    expect(countSolutions(f, -15.1, -10, 10)).toBe(1);
  });
});

describe('35581-6-9 – (x−3)√(x+1)', () => {
  const f: RealFn = (x) => (x - 3) * Math.sqrt(x + 1);
  it('model: minimum, convexity, vertical tangent at the endpoint', () => {
    const crit = findCriticalPoints(f, -0.999, 10);
    expect(crit.length).toBe(1);
    expect(crit[0]).toBeCloseTo(1 / 3, 6);
    expect(f(crit[0])).toBeCloseTo((-16 * Math.sqrt(3)) / 9, 8);
    for (const x of [-0.9, 0, 1, 5, 20]) {
      const second = numericDerivative((t) => numericDerivative(f, t, 1e-4), x, 1e-4);
      expect(second).toBeGreaterThan(0);
      expect(second).toBeCloseTo((3 * x + 7) / (4 * (x + 1) * Math.sqrt(x + 1)), 3);
    }
    expect(numericDerivative(f, -0.99999, 1e-7)).toBeLessThan(-100);
  });
  it('35581-6-9-c', () => {
    const [m, c] = tangent(f, 0);
    expectAnswer('35581-6-9-c', shoelace([[0, 0], [-c / m, 0], [0, c]]), 6);
    for (const x of [-1, -0.5, 1, 3, 8]) expect(f(x)).toBeGreaterThan(m * x + c);
  });
  it('35581-6-9-d (two solutions exactly for -16√3/9 < k ≤ 0)', () => {
    const minValue = (-16 * Math.sqrt(3)) / 9;
    expect(countSolutions(f, -0.5, -1, 20)).toBe(2);
    expect(countSolutions(f, minValue + 0.01, -1, 20)).toBe(2);
    expect(countSolutions(f, 0.5, -1, 20)).toBe(1);
    expect(countSolutions(f, minValue - 0.01, -1, 20)).toBe(0);
  });
});

describe('35581-6-10 – cubic and a line', () => {
  const f: RealFn = (x) => x ** 3 - 3 * x;
  const g: RealFn = (x) => x;
  const meets = findRoots((x) => f(x) - g(x), -4.1, 4.3);
  it('model: intersections and parallel tangents', () => {
    expect(meets.length).toBe(3);
    expect(meets[0]).toBeCloseTo(-2, 8);
    expect(meets[1]).toBeCloseTo(0, 8);
    expect(meets[2]).toBeCloseTo(2, 8);
    expect(f(-1) - g(-1)).toBeGreaterThan(0);
    expect(f(1) - g(1)).toBeLessThan(0);
    const touch = findRoots((x) => numericDerivative(f, x) - 1, -3, 3);
    expect(touch.length).toBe(2);
    const intercepts = touch.map((x) => tangent(f, x)[1]);
    expect(intercepts[1]).toBeCloseTo((-16 * Math.sqrt(3)) / 9, 5);
    expect(intercepts[0]).toBeCloseTo((16 * Math.sqrt(3)) / 9, 5);
  });
  it('35581-6-10-b', () => expectAnswer('35581-6-10-b', absoluteArea((x) => f(x) - g(x), meets[0], meets[2], 20000), 8));
  it('35581-6-10-d', () => {
    const [m, c] = tangent(f, 2);
    expectAnswer('35581-6-10-d', shoelace([[0, 0], [-c / m, 0], [2, f(2)]]), 6);
  });
});
