/**
 * Independent numeric verification of the new slot-7 problems (35581-7-4 onward).
 * Problems 35581-7-1..3 are verified in ../35581.test.ts.
 * Every number is recomputed from a numeric model (root finding, numeric derivatives, shoelace areas
 * of the geometric figures) — never from the closed forms written in the solutions.
 */
import { describe, expect, it } from 'vitest';
import { slot7Problems } from './slot7';
import { findCriticalPoints, findInflectionPoints, findRoots, numericDerivative, type RealFn } from '../verify';

type Point = [number, number];
const PI = Math.PI;

function answer(sectionId: string): number {
  for (const problem of slot7Problems) {
    const section = problem.sections.find((item) => item.id === sectionId);
    if (section) {
      if (section.numericAnswer === undefined) throw new Error(`${sectionId} has no numericAnswer`);
      return section.numericAnswer;
    }
  }
  throw new Error(`Unknown section ${sectionId}`);
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

/** Intersection point of two lines given as [slope, intercept]. */
function meet([m1, b1]: [number, number], [m2, b2]: [number, number]): Point {
  const x = (b2 - b1) / (m1 - m2);
  return [x, m1 * x + b1];
}

/** Golden-section search for the minimiser of a unimodal function on [a, b]. */
function argmin(f: RealFn, a: number, b: number): number {
  const g = (Math.sqrt(5) - 1) / 2;
  let lo = a;
  let hi = b;
  for (let i = 0; i < 200; i += 1) {
    const x1 = hi - g * (hi - lo);
    const x2 = lo + g * (hi - lo);
    if (f(x1) < f(x2)) hi = x2;
    else lo = x1;
  }
  return (lo + hi) / 2;
}

const newIds = ['35581-7-4', '35581-7-5', '35581-7-6', '35581-7-7', '35581-7-8', '35581-7-9', '35581-7-10'];

describe('slot 7 structure (new problems)', () => {
  const fresh = slot7Problems.filter((problem) => newIds.includes(problem.id));
  it('has all new problems, original ones unchanged in place', () => {
    expect(slot7Problems.slice(0, 3).map((p) => p.id)).toEqual(['35581-7-1', '35581-7-2', '35581-7-3']);
    expect(fresh.map((p) => p.id)).toEqual(newIds.slice(0, fresh.length));
    expect(fresh.length).toBe(newIds.length);
  });
  it('follows the bagrut structure', () => {
    for (const problem of fresh) {
      expect(problem.slot).toBe(7);
      expect(problem.sections.length).toBeGreaterThanOrEqual(3);
      expect(problem.sections.length).toBeLessThanOrEqual(4);
      expect(problem.subtopicIds.length).toBeGreaterThanOrEqual(2);
      expect(problem.subtopicIds.length).toBeLessThanOrEqual(4);
      expect(problem.estimatedMinutes).toBeGreaterThanOrEqual(15);
      expect(problem.estimatedMinutes).toBeLessThanOrEqual(40);
      expect(problem.verified).toBe(false);
      expect(problem.source).toBe('ai-generated');
      expect(problem.sections.map((s) => s.label)).toEqual(['א', 'ב', 'ג', 'ד'].slice(0, problem.sections.length));
      problem.sections.forEach((section, index) => {
        expect(section.id).toBe(`${problem.id}-${'abcd'[index]}`);
        expect(section.hints.length).toBeGreaterThanOrEqual(2);
        expect(section.hints.length).toBeLessThanOrEqual(3);
        expect(section.solutionSteps.length).toBeGreaterThanOrEqual(3);
        expect(section.solutionSteps.length).toBeLessThanOrEqual(8);
      });
    }
    const difficulties = fresh.map((p) => p.difficulty);
    expect(difficulties.every((d) => d === 2 || d === 3)).toBe(true);
    expect(difficulties.filter((d) => d === 3).length).toBeGreaterThanOrEqual(3);
  });
});

describe('35581-7-4 – sin²x − sin x', () => {
  const f: RealFn = (x) => Math.sin(x) ** 2 - Math.sin(x);
  it('zeros and extrema (model satisfies the givens)', () => {
    // pi/2 is a tangential zero: check it directly; the sign-changing zeros by scanning.
    expect(f(PI / 2)).toBeCloseTo(0, 12);
    const crossing = findRoots(f, -0.01, 2 * PI + 0.01);
    [0, PI, 2 * PI].forEach((z, i) => expect(crossing[i]).toBeCloseTo(z, 8));
    const crit = findCriticalPoints(f, 0.01, 2 * PI - 0.01);
    expect(crit.length).toBe(4);
    [PI / 6, PI / 2, (5 * PI) / 6, (3 * PI) / 2].forEach((c, i) => expect(crit[i]).toBeCloseTo(c, 6));
    expect(f(crit[0])).toBeCloseTo(-0.25, 10);
    expect(f(crit[3])).toBeCloseTo(2, 10);
  });
  it('35581-7-4-c', () => {
    const t0 = tangent(f, 0);
    const t2 = tangent(f, 2 * PI);
    expect(t0[0]).toBeCloseTo(t2[0], 6);
    const yTop = Math.max(...findCriticalPoints(f, 0.01, 2 * PI - 0.01).map(f));
    const vertices: Point[] = [meet(t0, [0, 0]), meet(t2, [0, 0]), meet(t2, [0, yTop]), meet(t0, [0, yTop])];
    expectAnswer('35581-7-4-c', shoelace(vertices), 6);
  });
  it('35581-7-4-d', () => {
    const tp = tangent(f, PI);
    const t0 = tangent(f, 0);
    const t2 = tangent(f, 2 * PI);
    expect(tp[0] * t0[0]).toBeCloseTo(-1, 6);
    const P = meet(tp, t0);
    const Q = meet(tp, t2);
    expectAnswer('35581-7-4-d', Math.hypot(Q[0] - P[0], Q[1] - P[1]), 6);
  });
});

describe('35581-7-5 – sin 2x − 2 sin x', () => {
  const f: RealFn = (x) => Math.sin(2 * x) - 2 * Math.sin(x);
  const crit = findCriticalPoints(f, 0.01, 2 * PI - 0.01);
  it('model: zeros and extrema', () => {
    const zeros = findRoots(f, 0.01, 2 * PI - 0.01);
    expect(zeros.length).toBe(1);
    expect(zeros[0]).toBeCloseTo(PI, 8);
    expect(crit.length).toBe(2);
    expect(crit[0]).toBeCloseTo((2 * PI) / 3, 6);
    expect(crit[1]).toBeCloseTo((4 * PI) / 3, 6);
    expect(f(crit[1])).toBeGreaterThan(0);
  });
  it('35581-7-5-c', () => {
    const t = tangent(f, PI);
    const xMax = crit[1];
    expectAnswer('35581-7-5-c', shoelace([[PI, 0], [xMax, 0], [xMax, t[0] * xMax + t[1]]]), 6);
  });
  it('35581-7-5-d', () => {
    for (const x of [0.3, 1.7, 4]) expect(f(2 * PI - x)).toBeCloseTo(-f(x), 12);
    const A: Point = [crit[0], f(crit[0])];
    const B: Point = [crit[1], f(crit[1])];
    expect((A[0] + B[0]) / 2).toBeCloseTo(PI, 6);
    expect((A[1] + B[1]) / 2).toBeCloseTo(0, 8);
    expectAnswer('35581-7-5-d', shoelace([[0, 0], A, B]), 6);
  });
});

describe('35581-7-6 – sin x (1 + cos x)', () => {
  const f: RealFn = (x) => Math.sin(x) * (1 + Math.cos(x));
  it('model: extrema (no extremum at pi) and inflection points', () => {
    const crit = findCriticalPoints(f, 0.01, 2 * PI - 0.01);
    expect(crit.length).toBe(2);
    expect(crit[0]).toBeCloseTo(PI / 3, 6);
    expect(crit[1]).toBeCloseTo((5 * PI) / 3, 6);
    expect(numericDerivative(f, PI)).toBeCloseTo(0, 8);
    expect(f(crit[0])).toBeCloseTo((3 * Math.sqrt(3)) / 4, 10);
    const infl = findInflectionPoints(f, 0.05, 2 * PI - 0.05);
    expect(infl.length).toBe(3);
    expect(infl[1]).toBeCloseTo(PI, 4);
    expect(f(infl[0])).toBeCloseTo((3 * Math.sqrt(15)) / 16, 5);
    expect(Math.cos(infl[0])).toBeCloseTo(-0.25, 4);
  });
  it('35581-7-6-d', () => {
    const g: RealFn = (x) => numericDerivative(f, x, 1e-6);
    const xMin = argmin(g, PI + 0.01, 2 * PI);
    expect(g(0)).toBeGreaterThan(g(xMin));
    expectAnswer('35581-7-6-d', g(xMin), 6);
    expect(g(argmin(g, 0, PI - 0.01))).toBeCloseTo(g(xMin), 6);
  });
});

describe('35581-7-7 – tan x − 2x', () => {
  const f: RealFn = (x) => Math.tan(x) - 2 * x;
  const lo = -PI / 2 + 0.01;
  const hi = PI / 2 - 0.01;
  it('model: odd, extrema at ±π/4', () => {
    for (const x of [0.2, 0.9, 1.4]) expect(f(-x)).toBeCloseTo(-f(x), 12);
    const crit = findCriticalPoints(f, lo, hi);
    expect(crit.length).toBe(2);
    expect(crit[0]).toBeCloseTo(-PI / 4, 6);
    expect(crit[1]).toBeCloseTo(PI / 4, 6);
    expect(f(crit[0])).toBeGreaterThan(0);
    expect(f(PI / 2 - 1e-6)).toBeGreaterThan(1e5);
  });
  it('35581-7-7-c', () => {
    const g: RealFn = (x) => numericDerivative(f, x, 1e-6);
    const xMin = argmin(g, lo, hi);
    expect(xMin).toBeCloseTo(0, 5);
    const infl = findInflectionPoints(f, -1.2, 1.2);
    expect(infl.length).toBe(1);
    expect(infl[0]).toBeCloseTo(0, 4);
    expectAnswer('35581-7-7-c', g(xMin), 7);
  });
  it('35581-7-7-d', () => {
    const t0 = tangent(f, 0);
    const xMin = findCriticalPoints(f, 0.01, hi)[0];
    const flat: [number, number] = [0, f(xMin)];
    const P1 = meet(t0, flat);
    const P2: Point = [PI / 2, t0[0] * (PI / 2) + t0[1]];
    const P3: Point = [PI / 2, f(xMin)];
    expectAnswer('35581-7-7-d', shoelace([P1, P2, P3]), 7);
  });
});

describe('35581-7-8 – cos²x + cos x', () => {
  const f: RealFn = (x) => Math.cos(x) ** 2 + Math.cos(x);
  it('model: even, zeros, extrema', () => {
    for (const x of [0.4, 1.9, 3]) expect(f(-x)).toBeCloseTo(f(x), 12);
    const zeros = findRoots(f, -PI + 0.01, PI - 0.01);
    expect(zeros.length).toBe(2);
    expect(zeros[1]).toBeCloseTo(PI / 2, 8);
    expect(f(PI)).toBeCloseTo(0, 12);
    const crit = findCriticalPoints(f, -PI + 0.01, PI - 0.01);
    expect(crit.length).toBe(3);
    expect(crit[2]).toBeCloseTo((2 * PI) / 3, 6);
    expect(f(crit[2])).toBeCloseTo(-0.25, 10);
    expect(f(crit[1])).toBeCloseTo(2, 10);
  });
  const tr = tangent(f, PI / 2);
  const tl = tangent(f, -PI / 2);
  const apex = meet(tr, tl);
  it('35581-7-8-c', () => {
    expectAnswer('35581-7-8-c', shoelace([meet(tl, [0, 0]), meet(tr, [0, 0]), apex]), 6);
  });
  it('35581-7-8-d', () => {
    const top: [number, number] = [0, Math.max(...findCriticalPoints(f, -1, 1).map(f))];
    expectAnswer('35581-7-8-d', shoelace([apex, meet(tr, top), meet(tl, top)]), 6);
  });
});

describe('35581-7-9 – a sin 2x + bx', () => {
  // Solve the two stated conditions numerically: f'(π/3) = 0 and f(π/4) = 1 + π/4 (linear in a, b).
  const basis1: RealFn = (x) => Math.sin(2 * x);
  const basis2: RealFn = (x) => x;
  const m11 = numericDerivative(basis1, PI / 3);
  const m12 = numericDerivative(basis2, PI / 3);
  const m21 = basis1(PI / 4);
  const m22 = basis2(PI / 4);
  const rhs = 1 + PI / 4;
  const det = m11 * m22 - m12 * m21;
  const a = (0 * m22 - m12 * rhs) / det;
  const b = (m11 * rhs - m21 * 0) / det;
  const f: RealFn = (x) => a * basis1(x) + b * basis2(x);
  const crit = findCriticalPoints(f, 0.01, PI - 0.01);
  it('model satisfies the givens (a = b = 1)', () => {
    expect(a).toBeCloseTo(1, 8);
    expect(b).toBeCloseTo(1, 8);
    expect(crit.length).toBe(2);
    expect(crit[0]).toBeCloseTo(PI / 3, 6);
  });
  it('35581-7-9-b', () => {
    const candidates = [0, ...crit, PI];
    expectAnswer('35581-7-9-b', Math.max(...candidates.map(f)), 7);
  });
  it('35581-7-9-c', () => {
    const [xa, xb] = crit;
    expect(f(xb)).toBeGreaterThan(0);
    expectAnswer('35581-7-9-c', shoelace([[xa, f(xa)], [xa, 0], [xb, 0], [xb, f(xb)]]), 7);
  });
  it('35581-7-9-d', () => {
    const infl = findInflectionPoints(f, 0.05, PI - 0.05);
    expect(infl.length).toBe(1);
    const [m, c] = tangent(f, infl[0]);
    expectAnswer('35581-7-9-d', shoelace([[0, 0], [-c / m, 0], [0, c]]), 5);
  });
});

describe('35581-7-10 – sin x / (1 + cos x)', () => {
  const f: RealFn = (x) => Math.sin(x) / (1 + Math.cos(x));
  it('model: equals tan(x/2), increasing, asymptote at π', () => {
    for (const x of [-2.5, -0.4, 1.1, 3]) expect(f(x)).toBeCloseTo(Math.tan(x / 2), 10);
    expect(findCriticalPoints(f, -PI + 0.05, PI - 0.05).length).toBe(0);
    expect(f(PI - 1e-6)).toBeGreaterThan(1e5);
  });
  it('35581-7-10-b', () => {
    const g: RealFn = (x) => numericDerivative(f, x, 1e-6);
    const xMin = argmin(g, -PI + 0.05, PI - 0.05);
    expect(xMin).toBeCloseTo(0, 4);
    expectAnswer('35581-7-10-b', g(xMin), 7);
  });
  it('35581-7-10-c', () => {
    const points = findRoots((x) => numericDerivative(f, x, 1e-6) - 2, -PI + 0.05, PI - 0.05);
    expect(points.length).toBe(2);
    const intercepts = points.map((x) => tangent(f, x)[1]);
    expectAnswer('35581-7-10-c', Math.abs(intercepts[1] - intercepts[0]), 5);
  });
  it('35581-7-10-d', () => {
    const t = tangent(f, PI / 2);
    expectAnswer('35581-7-10-d', shoelace([meet(t, [0, 0]), [PI, 0], [PI, t[0] * PI + t[1]]]), 6);
  });
});
