/**
 * Independent numeric verification of slot 8 problems 35581-8-4 … 35581-8-10
 * (35581-8-1..3 are verified in ../35581.test.ts).
 * Each optimum is found by golden-section search on an objective built directly from the geometry
 * (coordinates on the graph, shoelace areas, Math.hypot distances, numeric tangents) — never from the closed form.
 */
import { describe, expect, it } from 'vitest';
import { slot8Problems } from './slot8';
import { distance, findCriticalPoints, findRoots, numericDerivative, type RealFn } from '../verify';

type Point = [number, number];

function answer(sectionId: string): number {
  for (const problem of slot8Problems) {
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

/** Tangent line to f at x0 as [slope, intercept], using a numeric derivative. */
function tangent(f: RealFn, x0: number): [number, number] {
  const m = numericDerivative(f, x0, 1e-6);
  return [m, f(x0) - m * x0];
}

const newIds = ['35581-8-4', '35581-8-5', '35581-8-6', '35581-8-7', '35581-8-8', '35581-8-9', '35581-8-10'];

describe('slot 8 structure', () => {
  it('keeps the original problems and adds 7 well-formed new ones', () => {
    expect(slot8Problems.map((p) => p.id)).toEqual(['35581-8-1', '35581-8-2', '35581-8-3', ...newIds]);
    const fresh = slot8Problems.filter((p) => newIds.includes(p.id));
    for (const problem of fresh) {
      expect(problem.slot).toBe(8);
      expect(problem.topicId).toBe('differential-calculus');
      expect(problem.subtopicIds).toContain('diff-graphical-extrema');
      expect(problem.subtopicIds.length).toBeGreaterThanOrEqual(2);
      expect(problem.subtopicIds.length).toBeLessThanOrEqual(4);
      expect(problem.estimatedMinutes).toBeGreaterThanOrEqual(15);
      expect(problem.estimatedMinutes).toBeLessThanOrEqual(40);
      expect(problem.sections.length).toBeGreaterThanOrEqual(3);
      expect(problem.sections.length).toBeLessThanOrEqual(4);
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

describe('35581-8-4 – rectangle under y = 9 − x²', () => {
  const f: RealFn = (x) => 9 - x * x;
  const rect = (t: number): Point[] => [[-t, 0], [t, 0], [t, f(t)], [-t, f(t)]];
  const area: RealFn = (t) => shoelace(rect(t));
  const tBest = argmin((t) => -area(t), 0.001, 2.999);
  it('model satisfies the givens (upper vertices on the graph, domain 0<t<3)', () => {
    expect(findRoots(f, 0, 5)).toHaveLength(1);
    expect(findRoots(f, 0, 5)[0]).toBeCloseTo(3, 9);
    expect(area(1)).toBeCloseTo(2 * 1 * 8, 10);
  });
  it('35581-8-4-b', () => expectAnswer('35581-8-4-b', area(tBest), 8));
  it('35581-8-4-c', () => {
    const [, , c, a] = rect(tBest);
    expectAnswer('35581-8-4-c', distance(-tBest, 0, c[0], c[1]), 6);
    expect(distance(a[0], a[1], tBest, 0)).toBeCloseTo(answer('35581-8-4-c'), 6);
  });
  it('35581-8-4-d', () => {
    const perimeter: RealFn = (t) => {
      const pts = rect(t);
      return pts.reduce((sum, p, i) => sum + distance(p[0], p[1], pts[(i + 1) % 4][0], pts[(i + 1) % 4][1]), 0);
    };
    const tp = argmin((t) => -perimeter(t), 0.001, 2.999);
    expectAnswer('35581-8-4-d', perimeter(tp), 8);
    expect(Math.abs(tp - tBest)).toBeGreaterThan(0.5);
  });
});

describe('35581-8-5 – tangent to y = 1/x', () => {
  const f: RealFn = (x) => 1 / x;
  const axes = (t: number): { A: Point; B: Point } => {
    const [m, b] = tangent(f, t);
    return { A: [-b / m, 0], B: [0, b] };
  };
  it('35581-8-5-a sanity (A = (2t,0), B = (0,2/t))', () => {
    for (const t of [0.5, 1.3, 3]) {
      const { A, B } = axes(t);
      expect(A[0]).toBeCloseTo(2 * t, 5);
      expect(B[1]).toBeCloseTo(2 / t, 5);
    }
  });
  it('35581-8-5-b (constant area)', () => {
    for (const t of [0.3, 0.8, 1, 2.5, 7]) {
      const { A, B } = axes(t);
      expectAnswer('35581-8-5-b', shoelace([[0, 0], A, B]), 5);
    }
  });
  const segment: RealFn = (t) => {
    const { A, B } = axes(t);
    return distance(A[0], A[1], B[0], B[1]);
  };
  const tBest = argmin(segment, 0.1, 6);
  it('35581-8-5-c', () => {
    expectAnswer('35581-8-5-c', segment(tBest), 8);
    expect(tBest).toBeCloseTo(1, 5);
  });
  it('35581-8-5-d', () => {
    const { A, B } = axes(tBest);
    expect((A[0] + B[0]) / 2).toBeCloseTo(tBest, 6);
    expect((A[1] + B[1]) / 2).toBeCloseTo(f(tBest), 6);
    expectAnswer('35581-8-5-d', distance(0, 0, tBest, f(tBest)), 8);
  });
});

describe('35581-8-6 – trapezoid under y = √x', () => {
  const f: RealFn = Math.sqrt;
  const B: Point = [9, 3];
  const trapezoid: RealFn = (t) => shoelace([[t, 0], [9, 0], B, [t, f(t)]]);
  const tBest = argmin((t) => -trapezoid(t), 0.0001, 8.9999);
  it('model satisfies the givens (B on the graph)', () => expect(f(9)).toBe(3));
  it('35581-8-6-b', () => expectAnswer('35581-8-6-b', tBest, 6));
  it('35581-8-6-c', () => {
    expectAnswer('35581-8-6-c', trapezoid(tBest), 8);
    expect(trapezoid(1e-9)).toBeLessThan(trapezoid(tBest));
  });
  it('35581-8-6-d', () => expectAnswer('35581-8-6-d', shoelace([[0, 0], [tBest, f(tBest)], B]), 6));
});

describe('35581-8-7 – closest point of y = x² − 2x + 2 to C(6,0)', () => {
  const f: RealFn = (x) => x * x - 2 * x + 2;
  const C: Point = [6, 0];
  const d: RealFn = (x) => distance(x, f(x), C[0], C[1]);
  const xBest = argmin(d, -10, 10);
  it('only one critical point of the distance', () => {
    expect(findCriticalPoints((x) => d(x) ** 2, -10, 10)).toHaveLength(1);
  });
  it('35581-8-7-b', () => expectAnswer('35581-8-7-b', xBest, 6));
  it('35581-8-7-c', () => expectAnswer('35581-8-7-c', d(xBest), 8));
  it('35581-8-7-d (perpendicularity and tangent)', () => {
    const [m, b] = tangent(f, xBest);
    const mCP = (f(xBest) - C[1]) / (xBest - C[0]);
    expect(m * mCP).toBeCloseTo(-1, 5);
    expect(m).toBeCloseTo(2, 5);
    expect(b).toBeCloseTo(-2, 5);
  });
});

describe('35581-8-8 – f(x) = x³ − 3a²x', () => {
  const family = (a: number): RealFn => (x) => x ** 3 - 3 * a * a * x;
  const minPoint = (a: number): Point => {
    const f = family(a);
    const crit = findCriticalPoints(f, -5, 5);
    const xMin = crit.reduce((best, x) => (f(x) < f(best) ? x : best));
    return [xMin, f(xMin)];
  };
  it('35581-8-8-a sanity (extrema at ±a, values ∓2a³, symmetric about O)', () => {
    for (const a of [0.7, 1.2, 1.8]) {
      const f = family(a);
      const crit = findCriticalPoints(f, -5, 5);
      expect(crit).toHaveLength(2);
      expect(crit[0]).toBeCloseTo(-a, 6);
      expect(crit[1]).toBeCloseTo(a, 6);
      expect(f(crit[0])).toBeCloseTo(-f(crit[1]), 6);
      expect(f(crit[1])).toBeCloseTo(-2 * a ** 3, 6);
    }
  });
  const triangle: RealFn = (a) => {
    const N = minPoint(a);
    return shoelace([N, [N[0], 0], [2, 0]]);
  };
  const aBest = argmin((a) => -triangle(a), 0.05, 1.95);
  it('35581-8-8-c', () => expectAnswer('35581-8-8-c', aBest, 4));
  it('35581-8-8-d', () => expectAnswer('35581-8-8-d', triangle(aBest), 6));
});

describe('35581-8-9 – line through K(1,4)', () => {
  const K: Point = [1, 4];
  const intercepts = (m: number): { A: Point; B: Point } => {
    const b = K[1] - m * K[0];
    return { A: [-b / m, 0], B: [0, b] };
  };
  const area: RealFn = (m) => {
    const { A, B } = intercepts(m);
    return shoelace([[0, 0], A, B]);
  };
  const mBest = argmin(area, -60, -0.1);
  it('35581-8-9-a sanity (S(m) = 4 − m/2 − 8/m)', () => {
    for (const m of [-0.5, -3, -9]) {
      const { A, B } = intercepts(m);
      expect(A[0]).toBeGreaterThan(0);
      expect(B[1]).toBeGreaterThan(0);
      expect(area(m)).toBeCloseTo(4 - m / 2 - 8 / m, 10);
    }
  });
  it('35581-8-9-b', () => {
    expectAnswer('35581-8-9-b', area(mBest), 8);
    expect(mBest).toBeCloseTo(-4, 5);
  });
  it('35581-8-9-c sanity (K is the midpoint)', () => {
    const { A, B } = intercepts(mBest);
    expect((A[0] + B[0]) / 2).toBeCloseTo(K[0], 6);
    expect((A[1] + B[1]) / 2).toBeCloseTo(K[1], 6);
  });
  it('35581-8-9-d', () => {
    const { A, B } = intercepts(mBest);
    // Distance from the origin to line AB: minimise |OP| over points P on the segment.
    const toO: RealFn = (s) => distance(0, 0, A[0] + s * (B[0] - A[0]), A[1] + s * (B[1] - A[1]));
    expectAnswer('35581-8-9-d', toO(argmin(toO, 0, 1)), 6);
  });
});

describe('35581-8-10 – vertical segment between 2√x and x', () => {
  const f: RealFn = (x) => 2 * Math.sqrt(x);
  const g: RealFn = (x) => x;
  const gap: RealFn = (x) => f(x) - g(x);
  it('model satisfies the givens (intersections at 0 and 4, f above g between them)', () => {
    expect(gap(0)).toBe(0);
    expect(findRoots(gap, 0.5, 10)[0]).toBeCloseTo(4, 9);
    expect(gap(2)).toBeGreaterThan(0);
  });
  const tBest = argmin((x) => -distance(x, f(x), x, g(x)), 0.0001, 3.9999);
  it('35581-8-10-b', () => expectAnswer('35581-8-10-b', tBest, 6));
  it('35581-8-10-c', () => expectAnswer('35581-8-10-c', distance(tBest, f(tBest), tBest, g(tBest)), 8));
  it('35581-8-10-d sanity (tangent parallel to the chord, y = x + 1)', () => {
    const [m, b] = tangent(f, tBest);
    const chordSlope = (f(4) - f(0)) / (4 - 0);
    expect(m).toBeCloseTo(chordSlope, 5);
    expect(m).toBeCloseTo(numericDerivative(g, tBest), 5);
    expect(b).toBeCloseTo(1, 5);
  });
});
