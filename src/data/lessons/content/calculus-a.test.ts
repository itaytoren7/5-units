/**
 * Independent numeric verification of the calculus-a lessons (derivative, tangent, extrema, asymptotes,
 * concavity, investigations, trigonometric functions).
 * Every answer is recomputed from the numeric function itself: derivatives by central differences,
 * critical / inflection points by sign changes of the numeric derivatives, asymptotes by locating the
 * zeros of 1/f and evaluating f far away, parameters by bisection on the stated condition, numbers of
 * solutions by root counting — never by the hand-derived derivative or closed form in the solution.
 */
import { describe, expect, it } from 'vitest';
import { calculusAContent } from './calculus-a';
import { bisect, findCriticalPoints, findInflectionPoints, findRoots, numericDerivative, type RealFn } from '../../problems/verify';

const ex = (id: string) => Object.values(calculusAContent).flatMap((lesson) => lesson.exercises).find((e) => e.id === id)!;

function expectValues(id: string, computed: number[], digits = 6) {
  const exercise = ex(id);
  expect(exercise, id).toBeDefined();
  const values = (exercise.answers ?? []).map((answer) => answer.value);
  expect(values.length, `${id}: number of answers`).toBe(computed.length);
  computed.forEach((value, index) => expect(values[index], `${id}: answer ${index + 1}`).toBeCloseTo(value, digits));
}

const PI = Math.PI;
const d = (f: RealFn, x: number) => numericDerivative(f, x, 1e-6);

/** Critical points where the numeric derivative really vanishes (drops sign changes across poles). */
function criticalPoints(f: RealFn, a: number, b: number, steps = 8000): number[] {
  return findCriticalPoints(f, a, b, steps).filter((x) => Math.abs(numericDerivative(f, x)) < 1e-4);
}

/** Inflection points where f'' changes sign (drops sign changes across poles). */
function inflectionPoints(f: RealFn, a: number, b: number, steps = 8000): number[] {
  return findInflectionPoints(f, a, b, steps).filter((x) => Number.isFinite(f(x)) && Math.abs(numericDerivative((t) => numericDerivative(f, t), x)) < 1e-3);
}

/** Five-point second difference quotient (more accurate than nesting two central differences). */
const second = (f: RealFn, x: number, h = 1e-3) => (-f(x + 2 * h) + 16 * f(x + h) - 30 * f(x) + 16 * f(x - h) - f(x - 2 * h)) / (12 * h * h);

/** Inflection points, refined by bisection on the second difference quotient. */
function inflections(f: RealFn, a: number, b: number): number[] {
  return inflectionPoints(f, a, b).map((x) => bisect((t) => second(f, t), x - 1e-3, x + 1e-3));
}

const isLocalMax = (f: RealFn, x: number, h = 1e-3) => f(x) > f(x - h) && f(x) > f(x + h);
const isLocalMin = (f: RealFn, x: number, h = 1e-3) => f(x) < f(x - h) && f(x) < f(x + h);

/** Tangent line y = m x + b at x0 from the numeric derivative. */
function tangentLine(f: RealFn, x0: number): [number, number] {
  const m = numericDerivative(f, x0);
  return [m, f(x0) - m * x0];
}

/** Absolute max / min on [a, b]: compares endpoints and numeric critical points, and cross-checks with a dense grid. */
function absoluteExtrema(f: RealFn, a: number, b: number) {
  const candidates = [a, b, ...findCriticalPoints(f, a, b, 8000)];
  const values = candidates.map(f);
  const max = Math.max(...values);
  const min = Math.min(...values);
  let gridMax = -Infinity;
  let gridMin = Infinity;
  for (let i = 0; i <= 20000; i += 1) {
    const y = f(a + ((b - a) * i) / 20000);
    gridMax = Math.max(gridMax, y);
    gridMin = Math.min(gridMin, y);
  }
  expect(gridMax).toBeLessThanOrEqual(max + 1e-9);
  expect(gridMax).toBeGreaterThan(max - 1e-5);
  expect(gridMin).toBeGreaterThanOrEqual(min - 1e-9);
  expect(gridMin).toBeLessThan(min + 1e-5);
  return { max, min, argMax: candidates.filter((x) => f(x) > max - 1e-9), argMin: candidates.filter((x) => f(x) < min + 1e-9) };
}

/** Vertical asymptotes on [a, b]: zeros of 1/f around which |f| blows up. */
function verticalAsymptotes(f: RealFn, a: number, b: number): number[] {
  return findRoots((x) => 1 / f(x), a, b, 8000).filter((x) => Math.abs(f(x + 1e-7)) > 1e5 && Math.abs(f(x - 1e-7)) > 1e5);
}

/** Number of solutions of f(x) = k on the given intervals: sign changes of f − k plus tangential touches. */
function countSolutions(f: RealFn, k: number, intervals: Array<[number, number]>): number {
  let count = 0;
  for (const [a, b] of intervals) {
    const g = (x: number) => f(x) - k;
    const crossings = findRoots(g, a, b, 20000);
    const touches = criticalPoints(f, a, b).filter((c) => Math.abs(g(c)) < 1e-8 && !crossings.some((r) => Math.abs(r - c) < 1e-6));
    count += crossings.length + touches.length;
  }
  return count;
}

describe('calc-derivative', () => {
  it('calc-derivative-1', () => {
    const f = (x: number) => 2 * x ** 3 - 5 * x ** 2 + 4 * x - 7;
    expectValues('calc-derivative-1', [d(f, 2), d(f, -1)]);
  });

  it('calc-derivative-2', () => {
    const f = (x: number) => 4 / x ** 2 + 3 * Math.sqrt(x);
    expectValues('calc-derivative-2', [d(f, 4)]);
  });

  it('calc-derivative-3', () => {
    const f = (x: number) => 2 / x;
    // chord slopes approach the derivative, and the simplified chord slope of the solution is right
    for (const h of [0.5, -0.3, 0.01]) expect((f(1 + h) - f(1)) / h).toBeCloseTo(-2 / (1 + h), 10);
    expect((f(1 + 1e-7) - f(1)) / 1e-7).toBeCloseTo(d(f, 1), 5);
    expectValues('calc-derivative-3', [d(f, 1)]);
  });

  it('calc-derivative-4', () => {
    const f = (x: number) => (2 * x - 1) * Math.sqrt(x);
    for (const x of [0.5, 2, 9]) expect(d(f, x)).toBeCloseTo((6 * x - 1) / (2 * Math.sqrt(x)), 6);
    expectValues('calc-derivative-4', [d(f, 4)]);
  });

  it('calc-derivative-5', () => {
    const f = (x: number) => (2 * x + 3) / (x - 1);
    const slope = (x: number) => d(f, x) + 5 / 4;
    const roots = [...findRoots(slope, -20, 0.9), ...findRoots(slope, 1.1, 20)];
    expect(roots.length).toBe(2);
    expectValues('calc-derivative-5', roots);
  });

  it('calc-derivative-6', () => {
    const f = (x: number) => (x * x - 3) ** 4;
    const g = (x: number) => Math.sqrt(2 * x + 1);
    const h = (x: number) => Math.sin(3 * x);
    expectValues('calc-derivative-6', [d(f, 2), d(g, 4), d(h, PI / 9)]);
  });

  it('calc-derivative-7', () => {
    const f = (x: number) => x / Math.sqrt(x * x + 1);
    for (const x of [-3, -0.5, 0, 1, 4]) {
      expect(d(f, x)).toBeCloseTo(1 / ((x * x + 1) * Math.sqrt(x * x + 1)), 6);
      expect(d(f, x)).toBeGreaterThan(0);
    }
    expectValues('calc-derivative-7', [d(f, Math.sqrt(3))]);
  });

  it('calc-derivative-8', () => {
    const f = (x: number) => Math.sin(x) / (1 + Math.cos(x));
    for (const x of [-2, -0.7, 0.4, 2.5]) expect(d(f, x)).toBeCloseTo(1 / (1 + Math.cos(x)), 6);
    const roots = findRoots((x) => d(f, x) - 2, -3.1, 3.1);
    expect(roots.length).toBe(2);
    expectValues('calc-derivative-8', [d(f, PI / 3), ...roots]);
  });
});

describe('calc-tangent', () => {
  it('calc-tangent-1', () => {
    expectValues('calc-tangent-1', tangentLine((x) => x * x - 4 * x + 5, 3));
  });

  it('calc-tangent-2', () => {
    expectValues('calc-tangent-2', tangentLine(Math.sqrt, 4));
  });

  it('calc-tangent-3', () => {
    const f = (x: number) => x ** 3 - 3 * x ** 2 + 2;
    const xs = findRoots((x) => d(f, x) - 9, -10, 10);
    expect(xs.length).toBe(2);
    const [, b1] = tangentLine(f, xs[0]);
    const [, b2] = tangentLine(f, xs[1]);
    expectValues('calc-tangent-3', [xs[0], xs[1], b1, b2]);
  });

  it('calc-tangent-4', () => {
    const f = (x: number) => (x + 1) / (x - 1);
    const [m, b] = tangentLine(f, 0);
    const xIntercept = -b / m;
    // right triangle with vertices (0,0), (xIntercept,0), (0,b)
    const area = Math.abs(xIntercept * b) / 2;
    expectValues('calc-tangent-4', [m, area]);
  });

  it('calc-tangent-5', () => {
    const f = (x: number) => Math.sqrt(2 * x + 1);
    // tangent perpendicular to y = -3x + 5: slope m with m·(−3) = −1
    const xs = findRoots((x) => -3 * d(f, x) + 1, 0, 20);
    expect(xs.length).toBe(1);
    const [m, b] = tangentLine(f, xs[0]);
    expect(m * -3).toBeCloseTo(-1, 6);
    expectValues('calc-tangent-5', [xs[0], b]);
  });

  it('calc-tangent-6', () => {
    const f = (x: number) => Math.sin(2 * x);
    const xs = findRoots((x) => d(f, x) - 1, 0, PI);
    expect(xs.length).toBe(2);
    const [m, b] = tangentLine(f, xs[0]);
    expect(m).toBeCloseTo(1, 6);
    expectValues('calc-tangent-6', [xs[0], xs[1], b]);
  });

  it('calc-tangent-7', () => {
    const f = (x: number) => x ** 3 - 3 * x;
    const [m, b] = tangentLine(f, 2);
    const others = findRoots((x) => f(x) - (m * x + b), -10, 1.5);
    expect(others.length).toBe(1);
    expectValues('calc-tangent-7', [m, b, others[0], f(others[0])]);
  });

  it('calc-tangent-8', () => {
    const family = (a: number, b: number) => (x: number) => x ** 3 + a * x ** 2 + b;
    // slope at x = -1 equals 9 (independent of b), and the point lies on y = 9x + 11
    const a = bisect((t) => d(family(t, 0), -1) - 9, -20, 20);
    const b = 9 * -1 + 11 - family(a, 0)(-1);
    const f = family(a, b);
    expect(f(-1)).toBeCloseTo(2, 9);
    const xs = findRoots((x) => d(f, x) - 9, -10, 10);
    expect(xs.length).toBe(2);
    const other = xs.find((x) => Math.abs(x + 1) > 1e-3)!;
    const [m, intercept] = tangentLine(f, other);
    expect(m).toBeCloseTo(9, 6);
    expectValues('calc-tangent-8', [a, b, other, intercept]);
  });
});

describe('calc-extrema-monotonic', () => {
  it('calc-extrema-monotonic-1', () => {
    const f = (x: number) => 2 * x ** 3 - 3 * x ** 2 - 12 * x + 1;
    const [xMax, xMin] = criticalPoints(f, -10, 10);
    expect(isLocalMax(f, xMax)).toBe(true);
    expect(isLocalMin(f, xMin)).toBe(true);
    expect(d(f, -3)).toBeGreaterThan(0);
    expect(d(f, 0)).toBeLessThan(0);
    expectValues('calc-extrema-monotonic-1', [xMax, f(xMax), xMin, f(xMin)]);
  });

  it('calc-extrema-monotonic-2', () => {
    const f = (x: number) => x ** 4 - 8 * x ** 2 + 3;
    const xs = criticalPoints(f, -10, 10.1);
    expect(xs.length).toBe(3);
    expect(isLocalMin(f, xs[0]) && isLocalMax(f, xs[1]) && isLocalMin(f, xs[2])).toBe(true);
    expectValues('calc-extrema-monotonic-2', [f(xs[1]), xs[2], f(xs[2])]);
  });

  it('calc-extrema-monotonic-3', () => {
    const f = (x: number) => (x * x) / (x - 1);
    const xs = [...criticalPoints(f, -10, 0.9), ...criticalPoints(f, 1.1, 10)];
    expect(xs.length).toBe(2);
    expect(isLocalMax(f, xs[0])).toBe(true);
    expect(isLocalMin(f, xs[1])).toBe(true);
    expectValues('calc-extrema-monotonic-3', [xs[0], f(xs[0]), xs[1], f(xs[1])]);
  });

  it('calc-extrema-monotonic-4', () => {
    const f = (x: number) => x * Math.sqrt(4 - x);
    const xs = criticalPoints(f, -10, 3.999);
    expect(xs.length).toBe(1);
    expect(isLocalMax(f, xs[0])).toBe(true);
    // end point x = 4: f(4) = 0 and f decreases towards it
    expect(f(4)).toBe(0);
    expect(f(3.99)).toBeGreaterThan(0);
    expectValues('calc-extrema-monotonic-4', [xs[0], f(xs[0])]);
  });

  it('calc-extrema-monotonic-5', () => {
    const family = (a: number) => (x: number) => x ** 3 + a * x ** 2 + 9 * x;
    const a = bisect((t) => d(family(t), 1), -20, 20);
    const f = family(a);
    const xs = criticalPoints(f, -10, 10);
    expect(xs.length).toBe(2);
    expect(xs[0]).toBeCloseTo(1, 6);
    expect(isLocalMax(f, xs[0])).toBe(true);
    expect(isLocalMin(f, xs[1])).toBe(true);
    expectValues('calc-extrema-monotonic-5', [a, f(xs[0]), xs[1], f(xs[1])]);
  });

  it('calc-extrema-monotonic-6', () => {
    const f = (x: number) => Math.abs(x * x - 4);
    // sign changes of f' include the corners, where f is not differentiable
    const xs = findCriticalPoints(f, -10, 10.3, 8000);
    expect(xs.length).toBe(3);
    const xMax = xs.find((x) => isLocalMax(f, x))!;
    expect(xs.filter((x) => isLocalMin(f, x)).length).toBe(2);
    for (const corner of [-2, 2]) {
      const right = (f(corner + 1e-7) - f(corner)) / 1e-7;
      const left = (f(corner) - f(corner - 1e-7)) / 1e-7;
      expect(Math.abs(right - left)).toBeGreaterThan(7);
    }
    expectValues('calc-extrema-monotonic-6', [xs.length, f(xMax)]);
  });

  it('calc-extrema-monotonic-7', () => {
    const family = (a: number) => (x: number) => (a * x) / (x * x + 4);
    const xMax = criticalPoints(family(1), -10, 10).find((x) => isLocalMax(family(1), x))!;
    const a = bisect((t) => family(t)(xMax) - 1, 0.01, 50);
    const f = family(a);
    const xMin = criticalPoints(f, -10, 10).find((x) => isLocalMin(f, x))!;
    expect(f(xMax)).toBeCloseTo(1, 9);
    expectValues('calc-extrema-monotonic-7', [a, xMin, f(xMin)]);
  });

  it('calc-extrema-monotonic-8', () => {
    const family = (a: number) => (x: number) => x ** 3 + a * x ** 2 + 3 * x;
    // smallest slope of the graph = f' at the inflection point; the boundary a makes it exactly 0
    const minSlope = (a: number) => d(family(a), inflections(family(a), -20, 20)[0]);
    const a = bisect(minSlope, 0.5, 10);
    expect(minSlope(2.9)).toBeGreaterThan(0);
    expect(minSlope(3.1)).toBeLessThan(0);
    const f = family(a);
    const xFlat = inflections(f, -20, 20)[0];
    expect(Math.abs(d(f, xFlat))).toBeLessThan(1e-6);
    expect(findCriticalPoints(family(3), -20, 20).length).toBe(0);
    expectValues('calc-extrema-monotonic-8', [a, xFlat, f(xFlat)]);
  });
});

describe('calc-absolute-extrema', () => {
  it('calc-absolute-extrema-1', () => {
    const f = (x: number) => x * x - 4 * x + 1;
    const { max, min, argMax, argMin } = absoluteExtrema(f, 0, 5);
    expectValues('calc-absolute-extrema-1', [max, argMax[0], min, argMin[0]]);
  });

  it('calc-absolute-extrema-2', () => {
    const { max, min } = absoluteExtrema((x) => x ** 3 - 3 * x, 0, 2);
    expectValues('calc-absolute-extrema-2', [max, min]);
  });

  it('calc-absolute-extrema-3', () => {
    const f = (x: number) => x ** 3 - 6 * x ** 2 + 9 * x + 1;
    const { max, min, argMax, argMin } = absoluteExtrema(f, -1, 4);
    expect(argMax.length).toBe(2);
    expectValues('calc-absolute-extrema-3', [max, min, argMin[0]]);
  });

  it('calc-absolute-extrema-4', () => {
    const f = (x: number) => x * x + 16 / x;
    const xs = criticalPoints(f, 0.01, 50);
    expect(xs.length).toBe(1);
    expect(isLocalMin(f, xs[0])).toBe(true);
    for (const x of [0.05, 0.5, 1, 3, 10, 40]) expect(f(x)).toBeGreaterThan(f(xs[0]));
    expect(f(1e-4)).toBeGreaterThan(1e5);
    expect(f(1e4)).toBeGreaterThan(1e7);
    expectValues('calc-absolute-extrema-4', [xs[0], f(xs[0])]);
  });

  it('calc-absolute-extrema-5', () => {
    const f = (x: number) => Math.sqrt(x) + Math.sqrt(4 - x);
    expect(Number.isNaN(f(-0.01)) && Number.isNaN(f(4.01))).toBe(true);
    const { max, min, argMax } = absoluteExtrema(f, 0, 4);
    expectValues('calc-absolute-extrema-5', [max, argMax[0], min]);
  });

  it('calc-absolute-extrema-6', () => {
    const f = (x: number) => Math.sin(x) + Math.cos(x);
    const { max, min, argMax } = absoluteExtrema(f, 0, PI);
    expectValues('calc-absolute-extrema-6', [argMax[0], max, min]);
  });

  it('calc-absolute-extrema-7', () => {
    const family = (a: number) => (x: number) => x ** 3 - 3 * x ** 2 + a;
    const a = bisect((t) => absoluteExtrema(family(t), -1, 3).max - 6, -20, 20);
    const { min, argMin } = absoluteExtrema(family(a), -1, 3);
    expect(argMin.length).toBe(2);
    expectValues('calc-absolute-extrema-7', [a, min]);
  });

  it('calc-absolute-extrema-8', () => {
    const f = (x: number) => 2 * Math.sin(x) + Math.cos(2 * x);
    const { max, min, argMax, argMin } = absoluteExtrema(f, 0, PI);
    argMax.sort((p, q) => p - q);
    expect(argMax.length).toBe(2);
    expect(argMin.length).toBe(3);
    expectValues('calc-absolute-extrema-8', [argMax[0], max, min]);
  });
});

describe('calc-asymptotes', () => {
  it('calc-asymptotes-1', () => {
    const f = (x: number) => 3 / (x - 2) + 1;
    const vertical = verticalAsymptotes(f, -10, 10.3);
    expect(vertical.length).toBe(1);
    expect(f(vertical[0] + 1e-6)).toBeGreaterThan(1e5);
    expect(f(vertical[0] - 1e-6)).toBeLessThan(-1e5);
    expect(f(-1e9)).toBeCloseTo(f(1e9), 6);
    expectValues('calc-asymptotes-1', [vertical[0], f(1e9)]);
  });

  it('calc-asymptotes-2', () => {
    const f = (x: number) => (2 * x + 1) / (x - 3);
    const vertical = verticalAsymptotes(f, -10, 10.3);
    expect(vertical.length).toBe(1);
    expect(f(-1e9)).toBeCloseTo(f(1e9), 6);
    expectValues('calc-asymptotes-2', [vertical[0], f(1e9)]);
  });

  it('calc-asymptotes-3', () => {
    const f = (x: number) => (x * x - x - 2) / (x * x - 4);
    const vertical = verticalAsymptotes(f, -10, 10.3);
    expect(vertical.length).toBe(1);
    // near x = 2 the values stay bounded (a hole, not an asymptote)
    expect(f(2 + 1e-6)).toBeCloseTo(f(2 - 1e-6), 5);
    expectValues('calc-asymptotes-3', [vertical[0], f(1e9), f(2 + 1e-7)], 5);
  });

  it('calc-asymptotes-4', () => {
    const f = (x: number) => (x * x + 1) / (x * x - 2 * x - 3);
    const vertical = verticalAsymptotes(f, -10, 10.3);
    expect(vertical.length).toBe(2);
    const horizontal = f(1e9);
    expect(f(-1e9)).toBeCloseTo(horizontal, 6);
    const crossings = [
      ...findRoots((x) => f(x) - horizontal, -10, vertical[0] - 1e-3),
      ...findRoots((x) => f(x) - horizontal, vertical[0] + 1e-3, vertical[1] - 1e-3),
      ...findRoots((x) => f(x) - horizontal, vertical[1] + 1e-3, 50),
    ];
    expect(crossings.length).toBe(1);
    expectValues('calc-asymptotes-4', [vertical[0], vertical[1], horizontal, crossings[0]]);
  });

  it('calc-asymptotes-5', () => {
    const f = (x: number) => x / Math.sqrt(x * x + 4);
    for (let x = -50; x <= 50; x += 0.37) expect(Number.isFinite(f(x))).toBe(true);
    expectValues('calc-asymptotes-5', [f(1e9), f(-1e9)]);
  });

  it('calc-asymptotes-6', () => {
    const f = (x: number) => (2 * Math.sqrt(x) + 1) / (Math.sqrt(x) - 1);
    expect(Number.isNaN(f(-0.5))).toBe(true);
    const vertical = verticalAsymptotes(f, 0, 10.3);
    expect(vertical.length).toBe(1);
    expect(f(vertical[0] + 1e-6)).toBeGreaterThan(1e5);
    expect(f(vertical[0] - 1e-6)).toBeLessThan(-1e5);
    expectValues('calc-asymptotes-6', [vertical[0], f(1e18)]);
  });

  it('calc-asymptotes-7', () => {
    const family = (a: number, b: number) => (x: number) => (a * x * x + 3) / (x * x + b * x);
    // horizontal asymptote y = 3 fixes a; a vertical asymptote at x = 2 needs the denominator to vanish there
    const a = bisect((t) => family(t, 0)(1e9) - 3, -20, 20);
    const b = bisect((t) => 4 + 2 * t, -20, 20);
    const f = family(a, b);
    const vertical = verticalAsymptotes(f, -10, 10.3);
    expect(vertical.length).toBe(2);
    expect(vertical[1]).toBeCloseTo(2, 6);
    expect(f(-1e9)).toBeCloseTo(3, 6);
    const crossings = [
      ...findRoots((x) => f(x) - 3, -50, vertical[0] - 1e-3),
      ...findRoots((x) => f(x) - 3, vertical[0] + 1e-3, vertical[1] - 1e-3),
      ...findRoots((x) => f(x) - 3, vertical[1] + 1e-3, 50),
    ];
    expect(crossings.length).toBe(1);
    expectValues('calc-asymptotes-7', [a, b, vertical[0], crossings[0]]);
  });

  it('calc-asymptotes-8', () => {
    const f = (x: number) => Math.cos(x) / (1 - 2 * Math.sin(x));
    const vertical = verticalAsymptotes(f, 0, PI);
    expect(vertical.length).toBe(2);
    for (const x0 of vertical) {
      expect(f(x0 - 1e-6)).toBeGreaterThan(1e4);
      expect(f(x0 + 1e-6)).toBeLessThan(-1e4);
    }
    expectValues('calc-asymptotes-8', vertical);
  });
});

/** Boundary of the domain between a point where f is defined and finite and one where it is not. */
function domainEdge(f: RealFn, inside: number, outside: number): number {
  const defined = (x: number) => (Number.isFinite(f(x)) ? 1 : -1);
  return inside < outside ? bisect(defined, inside, outside) : bisect(defined, outside, inside);
}

/** Poles where f → ±∞ with the same sign on both sides (1/f has a double zero). */
function evenPoles(f: RealFn, a: number, b: number): number[] {
  const g = (x: number) => 1 / f(x);
  return criticalPoints(g, a, b).filter((x) => Math.abs(g(x)) < 1e-8);
}

describe('calc-concavity', () => {
  it('calc-concavity-1', () => {
    const f = (x: number) => x ** 3 - 6 * x ** 2 + 4;
    const xs = inflections(f, -10, 10.3);
    expect(xs.length).toBe(1);
    expect(second(f, 0)).toBeLessThan(0);
    expect(second(f, 3)).toBeGreaterThan(0);
    expectValues('calc-concavity-1', [xs[0], f(xs[0])]);
  });

  it('calc-concavity-2', () => {
    const f = (x: number) => x ** 4 - 6 * x ** 2;
    const xs = inflections(f, -10, 10.3);
    expect(xs.length).toBe(2);
    expect(f(xs[0])).toBeCloseTo(f(xs[1]), 9);
    expectValues('calc-concavity-2', [xs[1], f(xs[1])]);
  });

  it('calc-concavity-3', () => {
    const f = (x: number) => x ** 4 - 4 * x ** 3;
    const xs = inflections(f, -10, 10.3);
    expect(xs.length).toBe(2);
    expect(xs[0]).toBeCloseTo(0, 6);
    // x = 0: horizontal tangent but f keeps decreasing — not an extremum
    expect(Math.abs(d(f, 0))).toBeLessThan(1e-8);
    expect(f(-0.01)).toBeGreaterThan(f(0));
    expect(f(0)).toBeGreaterThan(f(0.01));
    const extrema = criticalPoints(f, -10, 10.3);
    expect(extrema.length).toBe(1);
    expect(isLocalMin(f, extrema[0])).toBe(true);
    expectValues('calc-concavity-3', [xs[1], f(xs[1]), extrema[0], f(extrema[0])]);
  });

  it('calc-concavity-4', () => {
    const f = (x: number) => x + 4 / x;
    const xs = [...criticalPoints(f, -10, -0.1), ...criticalPoints(f, 0.1, 10.3)];
    expect(xs.length).toBe(2);
    expect(second(f, xs[0])).toBeLessThan(0);
    expect(second(f, xs[1])).toBeGreaterThan(0);
    expect([...inflectionPoints(f, -10, -0.1), ...inflectionPoints(f, 0.1, 10.3)].length).toBe(0);
    expectValues('calc-concavity-4', [xs[1], f(xs[1]), f(xs[0])]);
  });

  it('calc-concavity-5', () => {
    const family = (a: number, b: number) => (x: number) => x ** 3 + a * x ** 2 + b * x;
    const a = bisect((t) => second(family(t, 0), 1), -20, 20);
    const b = -2 - family(a, 0)(1);
    const f = family(a, b);
    const xs = inflections(f, -10, 10.3);
    expect(xs.length).toBe(1);
    expect(xs[0]).toBeCloseTo(1, 6);
    expect(f(1)).toBeCloseTo(-2, 9);
    expectValues('calc-concavity-5', [a, b, d(f, 1)]);
  });

  it('calc-concavity-6', () => {
    const f = (x: number) => Math.sin(x) + Math.cos(x);
    const xs = inflections(f, 0.001, 2 * PI - 0.001);
    expect(xs.length).toBe(2);
    for (const x of xs) expect(f(x)).toBeCloseTo(0, 6);
    expectValues('calc-concavity-6', xs);
  });

  it('calc-concavity-7', () => {
    const f = (x: number) => x ** 3 - 3 * x ** 2 + 5;
    const xs = inflections(f, -10, 10.3);
    expect(xs.length).toBe(1);
    const x0 = xs[0];
    // the slope there is the smallest slope on the graph
    for (let x = -5; x <= 5; x += 0.013) expect(d(f, x)).toBeGreaterThanOrEqual(d(f, x0) - 1e-9);
    const [m, b] = tangentLine(f, x0);
    expectValues('calc-concavity-7', [x0, f(x0), m, b]);
  });

  it('calc-concavity-8', () => {
    const f = (x: number) => x / (x * x + 3);
    for (const x of [-4, -1, 0.5, 2, 5]) expect(second(f, x)).toBeCloseTo((2 * x * (x * x - 9)) / (x * x + 3) ** 3, 5);
    const xs = inflections(f, -10, 10.3);
    expect(xs.length).toBe(3);
    expectValues('calc-concavity-8', [xs.length, xs[2], f(xs[2])]);
  });
});

describe('calc-investigate-polynomial', () => {
  it('calc-investigate-polynomial-1', () => {
    const f = (x: number) => x ** 3 - 3 * x ** 2;
    expect(f(0)).toBe(0);
    const crossings = findRoots(f, -10.3, 10);
    expect(crossings.length).toBe(1);
    const xs = criticalPoints(f, -10.3, 10);
    expect(xs.length).toBe(2);
    expect(isLocalMax(f, xs[0]) && isLocalMin(f, xs[1])).toBe(true);
    expectValues('calc-investigate-polynomial-1', [crossings[0], xs[1], f(xs[1])]);
  });

  it('calc-investigate-polynomial-2', () => {
    const f = (x: number) => -(x ** 3) + 3 * x + 2;
    for (const x of [-3, -0.4, 1.7, 5]) expect(f(x)).toBeCloseTo(-((x + 1) ** 2) * (x - 2), 9);
    const xs = criticalPoints(f, -10.3, 10);
    expect(xs.length).toBe(2);
    expect(isLocalMin(f, xs[0]) && isLocalMax(f, xs[1])).toBe(true);
    expect(f(xs[0])).toBeCloseTo(0, 9);
    const crossings = findRoots(f, -10.3, 10);
    expect(crossings.length).toBe(1);
    expectValues('calc-investigate-polynomial-2', [xs[1], f(xs[1]), crossings[0], f(0)]);
  });

  it('calc-investigate-polynomial-3', () => {
    const f = (x: number) => x ** 4 - 4 * x ** 3 + 4 * x ** 2;
    const xs = criticalPoints(f, -10.3, 10);
    expect(xs.length).toBe(3);
    const maxima = xs.filter((x) => isLocalMax(f, x));
    const minima = xs.filter((x) => isLocalMin(f, x));
    expect(maxima.length).toBe(1);
    expectValues('calc-investigate-polynomial-3', [maxima[0], f(maxima[0]), minima.length]);
  });

  it('calc-investigate-polynomial-4', () => {
    const f = (x: number) => x ** 4 - 5 * x ** 2 + 4;
    const roots = findRoots(f, -10.3, 10);
    expect(roots.length).toBe(4);
    const xs = criticalPoints(f, -10.3, 10);
    expect(xs.length).toBe(3);
    expect(isLocalMax(f, xs[1]) && isLocalMin(f, xs[2])).toBe(true);
    expectValues('calc-investigate-polynomial-4', [roots[3], xs[2], f(xs[2])]);
  });

  it('calc-investigate-polynomial-5', () => {
    const f = (x: number) => x ** 3 - 3 * x + 1;
    const counts = [2, 3, 5].map((k) => countSolutions(f, k, [[-10.3, 10.1]]));
    expectValues('calc-investigate-polynomial-5', counts);
  });

  it('calc-investigate-polynomial-6', () => {
    const family = (a: number) => (x: number) => x ** 3 - 3 * x ** 2 + a;
    const xMin = criticalPoints(family(0), -10.3, 10).find((x) => isLocalMin(family(0), x))!;
    const a = bisect((t) => family(t)(xMin), -20, 20);
    const f = family(a);
    const crossings = findRoots(f, -10.3, 10);
    expect(crossings.length).toBe(1);
    expectValues('calc-investigate-polynomial-6', [a, crossings[0]]);
  });

  it('calc-investigate-polynomial-7', () => {
    const family = (a: number, b: number) => (x: number) => a * x ** 3 + b * x;
    // f'(1) = 0 fixes b for each a; then f(1) = -2 fixes a
    const bFor = (a: number) => -d(family(a, 0), 1) / d(family(0, 1), 1);
    const a = bisect((t) => family(t, bFor(t))(1) + 2, -20, 20);
    const b = bFor(a);
    const f = family(a, b);
    expect(isLocalMin(f, 1)).toBe(true);
    for (const x of [0.3, 1.7, 4]) expect(f(-x)).toBeCloseTo(-f(x), 9);
    const xMax = criticalPoints(f, -10.3, 10).find((x) => isLocalMax(f, x))!;
    const positiveRoot = findRoots(f, 0.5, 10);
    expect(positiveRoot.length).toBe(1);
    expect(inflections(f, -10.3, 10)[0]).toBeCloseTo(0, 6);
    expectValues('calc-investigate-polynomial-7', [a, b, f(xMax), positiveRoot[0]]);
  });

  it('calc-investigate-polynomial-8', () => {
    const f = (x: number) => (x * x - 4) ** 2;
    const xs = criticalPoints(f, -10.3, 10);
    expect(xs.length).toBe(3);
    expect(isLocalMax(f, xs[1])).toBe(true);
    const infl = inflections(f, -10.3, 10);
    expect(infl.length).toBe(2);
    // exactly four solutions for 0 < k < 16, fewer outside
    expect(countSolutions(f, 8, [[-10.3, 10]])).toBe(4);
    expect(countSolutions(f, 15.9, [[-10.3, 10]])).toBe(4);
    expect(countSolutions(f, 16, [[-10.3, 10]])).toBe(3);
    expect(countSolutions(f, 20, [[-10.3, 10]])).toBe(2);
    expectValues('calc-investigate-polynomial-8', [f(xs[1]), infl[1], f(infl[1])]);
  });
});

describe('calc-investigate-rational', () => {
  it('calc-investigate-rational-1', () => {
    const f = (x: number) => x / (x - 2);
    const vertical = verticalAsymptotes(f, -10, 10.3);
    expect(vertical.length).toBe(1);
    for (const x of [-5, 0, 1.9, 2.1, 7]) expect(d(f, x)).toBeLessThan(0);
    const extrema = [...criticalPoints(f, -10, 1.99), ...criticalPoints(f, 2.01, 10.3)];
    expectValues('calc-investigate-rational-1', [vertical[0], f(1e9), extrema.length]);
  });

  it('calc-investigate-rational-2', () => {
    const f = (x: number) => (x * x + 4) / x;
    const vertical = verticalAsymptotes(f, -10, 10.3);
    expect(vertical.length).toBe(1);
    expect([...findRoots(f, -10, -0.01), ...findRoots(f, 0.01, 10)].length).toBe(0);
    const xs = [...criticalPoints(f, -10, -0.01), ...criticalPoints(f, 0.01, 10.3)];
    expect(xs.length).toBe(2);
    expect(isLocalMax(f, xs[0]) && isLocalMin(f, xs[1])).toBe(true);
    expectValues('calc-investigate-rational-2', [xs[0], f(xs[0]), f(xs[1])]);
  });

  it('calc-investigate-rational-3', () => {
    const f = (x: number) => (4 * x) / (x * x + 4);
    for (let x = -30; x <= 30; x += 0.29) expect(Number.isFinite(f(x))).toBe(true);
    const xs = criticalPoints(f, -10.3, 10);
    expect(xs.length).toBe(2);
    expect(isLocalMin(f, xs[0]) && isLocalMax(f, xs[1])).toBe(true);
    expectValues('calc-investigate-rational-3', [f(1e9), xs[1], f(xs[1]), f(xs[0])]);
  });

  it('calc-investigate-rational-4', () => {
    const f = (x: number) => (x * x) / (x - 2) ** 2;
    const poles = evenPoles(f, -10.3, 10);
    expect(poles.length).toBe(1);
    expect(f(poles[0] + 1e-6)).toBeGreaterThan(1e5);
    expect(f(poles[0] - 1e-6)).toBeGreaterThan(1e5);
    const horizontal = f(1e9);
    expect(f(-1e9)).toBeCloseTo(horizontal, 6);
    const xs = [...criticalPoints(f, -10.3, 1.99), ...criticalPoints(f, 2.01, 10)];
    expect(xs.length).toBe(1);
    expect(isLocalMin(f, xs[0])).toBe(true);
    const crossings = [...findRoots((x) => f(x) - horizontal, -50, 1.99), ...findRoots((x) => f(x) - horizontal, 2.01, 50)];
    expect(crossings.length).toBe(1);
    expectValues('calc-investigate-rational-4', [poles[0], horizontal, xs[0], crossings[0]]);
  });

  it('calc-investigate-rational-5', () => {
    const f = (x: number) => (x - 1) ** 2 / (x + 1);
    const vertical = verticalAsymptotes(f, -10, 10.3);
    expect(vertical.length).toBe(1);
    const xs = [...criticalPoints(f, -10, -1.01), ...criticalPoints(f, -0.99, 10.3)];
    expect(xs.length).toBe(2);
    expect(isLocalMax(f, xs[0]) && isLocalMin(f, xs[1])).toBe(true);
    expect(f(xs[1])).toBeCloseTo(0, 9);
    expectValues('calc-investigate-rational-5', [vertical[0], xs[0], f(xs[0]), f(0)]);
  });

  it('calc-investigate-rational-6', () => {
    const f = (x: number) => (x - 1) / (x * x);
    expect(f(1e-6)).toBeLessThan(-1e5);
    expect(f(-1e-6)).toBeLessThan(-1e5);
    expect(f(1e9)).toBeCloseTo(0, 6);
    const xs = [...criticalPoints(f, -10, -0.01), ...criticalPoints(f, 0.01, 10.3)];
    expect(xs.length).toBe(1);
    expect(isLocalMax(f, xs[0])).toBe(true);
    const crossings = [...findRoots(f, -10, -0.01), ...findRoots(f, 0.01, 10.3)];
    expect(crossings.length).toBe(1);
    expectValues('calc-investigate-rational-6', [xs[0], f(xs[0]), crossings[0]]);
  });

  it('calc-investigate-rational-7', () => {
    const family = (a: number) => (x: number) => (x * x + a) / (x - 1);
    const a = bisect((t) => d(family(t), 3), -20, 20);
    const f = family(a);
    const xs = [...criticalPoints(f, -10, 0.99), ...criticalPoints(f, 1.01, 10.3)];
    expect(xs.length).toBe(2);
    expect(isLocalMax(f, xs[0]) && isLocalMin(f, xs[1])).toBe(true);
    for (const x of [-20, -1, 0, 0.9]) expect(f(x)).toBeLessThan(0);
    for (const x of [1.1, 3, 20]) expect(f(x)).toBeGreaterThan(0);
    expectValues('calc-investigate-rational-7', [a, f(xs[0]), f(xs[1])]);
  });

  it('calc-investigate-rational-8', () => {
    const f = (x: number) => (x * x + 1) / (x * x - 1);
    const branches: Array<[number, number]> = [
      [-60, -1.0001],
      [-0.99, 0.98],
      [1.0001, 60],
    ];
    const xs = criticalPoints(f, -0.99, 0.98);
    expect(xs.length).toBe(1);
    expect(isLocalMax(f, xs[0])).toBe(true);
    expectValues('calc-investigate-rational-8', [3, 0, -1].map((k) => countSolutions(f, k, branches)));
  });
});

describe('calc-investigate-root', () => {
  it('calc-investigate-root-1', () => {
    const f = (x: number) => Math.sqrt(x * x - 4 * x + 8);
    for (let x = -30; x <= 30; x += 0.31) expect(Number.isFinite(f(x))).toBe(true);
    const xs = criticalPoints(f, -10.3, 10);
    expect(xs.length).toBe(1);
    expect(isLocalMin(f, xs[0])).toBe(true);
    expectValues('calc-investigate-root-1', [xs[0], f(xs[0])]);
  });

  it('calc-investigate-root-2', () => {
    const f = (x: number) => Math.sqrt(9 - x * x);
    const edge = domainEdge(f, 0, 10);
    expect(domainEdge(f, 0, -10)).toBeCloseTo(-edge, 9);
    const xs = criticalPoints(f, -2.99, 2.98);
    expect(xs.length).toBe(1);
    expect(isLocalMax(f, xs[0])).toBe(true);
    expectValues('calc-investigate-root-2', [edge, f(xs[0])]);
  });

  it('calc-investigate-root-3', () => {
    const f = (x: number) => x - 2 * Math.sqrt(x);
    expect(domainEdge(f, 1, -1)).toBeCloseTo(0, 9);
    const xs = criticalPoints(f, 0.001, 10.3);
    expect(xs.length).toBe(1);
    expect(isLocalMin(f, xs[0])).toBe(true);
    expect(f(0.001)).toBeLessThan(f(0));
    const crossings = findRoots(f, 0.5, 10.3);
    expect(crossings.length).toBe(1);
    expectValues('calc-investigate-root-3', [xs[0], f(xs[0]), crossings[0]]);
  });

  it('calc-investigate-root-4', () => {
    const f = (x: number) => x / Math.sqrt(x - 1);
    const edge = domainEdge(f, 5, 0);
    expect(f(edge + 1e-9)).toBeGreaterThan(1e3);
    const xs = criticalPoints(f, 1.001, 10.3);
    expect(xs.length).toBe(1);
    expect(isLocalMin(f, xs[0])).toBe(true);
    expect(f(1e8)).toBeGreaterThan(1e3);
    expectValues('calc-investigate-root-4', [edge, xs[0], f(xs[0])]);
  });

  it('calc-investigate-root-5', () => {
    const f = (x: number) => x * Math.sqrt(8 - x * x);
    const edge = domainEdge(f, 0, 5);
    for (const x of [0.4, 1.3, 2.5]) expect(f(-x)).toBeCloseTo(-f(x), 9);
    const xs = criticalPoints(f, -edge + 1e-6, edge - 1e-6);
    expect(xs.length).toBe(2);
    expect(isLocalMin(f, xs[0]) && isLocalMax(f, xs[1])).toBe(true);
    expectValues('calc-investigate-root-5', [edge, xs[1], f(xs[1])]);
  });

  it('calc-investigate-root-6', () => {
    const f = (x: number) => Math.sqrt(x + 2) - x;
    expect(domainEdge(f, 0, -5)).toBeCloseTo(-2, 9);
    const crossings = findRoots(f, -2, 10.3);
    expect(crossings.length).toBe(1);
    const xs = criticalPoints(f, -1.999, 10.3);
    expect(xs.length).toBe(1);
    expect(isLocalMax(f, xs[0])).toBe(true);
    expect(f(-2)).toBeLessThan(f(-1.99));
    expectValues('calc-investigate-root-6', [crossings[0], xs[0], f(xs[0])]);
  });

  it('calc-investigate-root-7', () => {
    const f = (x: number) => (x + 1) / Math.sqrt(x * x + 3);
    const xs = criticalPoints(f, -10.3, 10);
    expect(xs.length).toBe(1);
    expect(isLocalMax(f, xs[0])).toBe(true);
    // range: above -1 everywhere, at most the maximum
    for (let x = -200; x <= 200; x += 0.7) {
      expect(f(x)).toBeGreaterThan(-1);
      expect(f(x)).toBeLessThanOrEqual(f(xs[0]) + 1e-12);
    }
    expectValues('calc-investigate-root-7', [f(1e9), f(-1e9), xs[0], f(xs[0])]);
  });

  it('calc-investigate-root-8', () => {
    const family = (a: number) => (x: number) => x * Math.sqrt(a - x);
    const a = bisect((t) => d(family(t), 4), 4.5, 30);
    const f = family(a);
    expect(domainEdge(f, 0, 50)).toBeCloseTo(a, 9);
    const xs = criticalPoints(f, -10.3, a - 1e-6);
    expect(xs.length).toBe(1);
    expect(isLocalMax(f, xs[0])).toBe(true);
    expectValues('calc-investigate-root-8', [a, f(xs[0])]);
  });
});

describe('calc-trig-functions', () => {
  it('calc-trig-functions-1', () => {
    expectValues('calc-trig-functions-1', [d((x) => 3 * Math.sin(x) + Math.cos(2 * x), PI / 6)]);
  });

  it('calc-trig-functions-2', () => {
    const f = (x: number) => 2 * Math.sin(x) + x;
    const xs = criticalPoints(f, 0.001, 2 * PI - 0.001);
    expect(xs.length).toBe(2);
    expect(isLocalMax(f, xs[0]) && isLocalMin(f, xs[1])).toBe(true);
    expectValues('calc-trig-functions-2', xs);
  });

  it('calc-trig-functions-3', () => {
    const f = (x: number) => 2 * Math.sin(2 * x - PI / 3);
    const zeros = findRoots(f, 0, PI);
    expect(zeros.length).toBe(2);
    const xs = criticalPoints(f, 0.001, PI - 0.001);
    expect(xs.length).toBe(2);
    expect(isLocalMax(f, xs[0]) && isLocalMin(f, xs[1])).toBe(true);
    expect(f(0)).toBeLessThan(f(0.01));
    expect(f(PI)).toBeGreaterThan(f(PI - 0.01));
    expectValues('calc-trig-functions-3', [zeros[0], zeros[1], xs[0], xs[1]]);
  });

  it('calc-trig-functions-4', () => {
    const f = (x: number) => Math.sin(x) ** 2 - Math.sin(x);
    const xs = criticalPoints(f, 0.001, 2 * PI - 0.001);
    expect(xs.length).toBe(4);
    const minima = xs.filter((x) => isLocalMin(f, x));
    expect(minima.length).toBe(2);
    expect(f(minima[0])).toBeCloseTo(f(minima[1]), 9);
    const { max, argMax } = absoluteExtrema(f, 0, 2 * PI);
    expect(argMax.length).toBe(1);
    expectValues('calc-trig-functions-4', [f(minima[0]), argMax[0], max]);
  });

  it('calc-trig-functions-5', () => {
    const f = (x: number) => Math.cos(2 * x) + 2 * Math.cos(x);
    const xs = criticalPoints(f, 0.001, 2 * PI - 0.001);
    expect(xs.length).toBe(3);
    expect(isLocalMin(f, xs[0]) && isLocalMax(f, xs[1]) && isLocalMin(f, xs[2])).toBe(true);
    const { max } = absoluteExtrema(f, 0, 2 * PI);
    expectValues('calc-trig-functions-5', [f(xs[0]), f(xs[1]), max]);
  });

  it('calc-trig-functions-6', () => {
    const f = (x: number) => Math.tan(x) - 2 * x;
    const xs = criticalPoints(f, -1.5, 1.5);
    expect(xs.length).toBe(2);
    expect(isLocalMax(f, xs[0]) && isLocalMin(f, xs[1])).toBe(true);
    const vertical = verticalAsymptotes(f, 0, 3);
    expect(vertical.length).toBe(1);
    expectValues('calc-trig-functions-6', [xs[1], f(xs[1]), vertical[0]]);
  });

  it('calc-trig-functions-7', () => {
    const f = (x: number) => x + Math.sin(2 * x);
    const xs = criticalPoints(f, 0.001, PI - 0.001);
    expect(xs.length).toBe(2);
    expect(isLocalMax(f, xs[0]) && isLocalMin(f, xs[1])).toBe(true);
    const { max, min, argMax, argMin } = absoluteExtrema(f, 0, PI);
    expect(argMax[0]).toBeCloseTo(PI, 9);
    expect(argMin[0]).toBeCloseTo(0, 9);
    expect(min).toBeCloseTo(0, 9);
    const infl = inflections(f, 0.001, PI - 0.001);
    expect(infl.length).toBe(1);
    expectValues('calc-trig-functions-7', [xs[0], f(xs[0]), max, infl[0]]);
  });

  it('calc-trig-functions-8', () => {
    const f = (x: number) => Math.sin(x) / (2 + Math.cos(x));
    for (const x of [0.3, 1.9, 3.5, 5.6]) expect(d(f, x)).toBeCloseTo((2 * Math.cos(x) + 1) / (2 + Math.cos(x)) ** 2, 6);
    expect(findRoots(f, 0.1, 2 * PI - 0.1).length).toBe(1);
    const xs = criticalPoints(f, 0.001, 2 * PI - 0.001);
    expect(xs.length).toBe(2);
    expect(isLocalMax(f, xs[0]) && isLocalMin(f, xs[1])).toBe(true);
    expectValues('calc-trig-functions-8', [xs[0], f(xs[0]), f(xs[1])]);
  });
});
