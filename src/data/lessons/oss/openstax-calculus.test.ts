/**
 * Independent numeric verification of the exercises translated from OpenStax Calculus Volume 1.
 * Every numeric answer is recomputed from the function itself (numeric differentiation, root scanning,
 * Simpson integration, golden-section search, dense sampling) — never from the closed forms in the solutions.
 */
import { describe, expect, it } from 'vitest';
import {
  absoluteArea,
  bisect,
  findCriticalPoints,
  findInflectionPoints,
  findRoots,
  numericDerivative,
  simpson,
  type RealFn,
} from '../../problems/verify';
import { openstaxCalculusExercises } from './openstax-calculus';

const all = Object.values(openstaxCalculusExercises).flat();
const ex = (id: string) => all.find((exercise) => exercise.id === id)!;
const ans = (id: string): number[] => (ex(id).answers ?? []).map((answer) => answer.value);

const { PI, sqrt, sin, cos } = Math;

/** Second derivative by a symmetric difference (larger step than nesting numericDerivative, for big polynomials). */
const second = (f: RealFn, x: number, h = 1e-4) => (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);

/** Golden-section search for the minimum of a unimodal function on [a, b]. */
function goldenMin(f: RealFn, a: number, b: number, iterations = 200): number {
  const r = (sqrt(5) - 1) / 2;
  let lo = a;
  let hi = b;
  let x1 = hi - r * (hi - lo);
  let x2 = lo + r * (hi - lo);
  let f1 = f(x1);
  let f2 = f(x2);
  for (let i = 0; i < iterations && hi - lo > 1e-12; i += 1) {
    if (f1 < f2) {
      hi = x2;
      x2 = x1;
      f2 = f1;
      x1 = hi - r * (hi - lo);
      f1 = f(x1);
    } else {
      lo = x1;
      x1 = x2;
      f1 = f2;
      x2 = lo + r * (hi - lo);
      f2 = f(x2);
    }
  }
  return (lo + hi) / 2;
}
const goldenMax = (f: RealFn, a: number, b: number) => goldenMin((x) => -f(x), a, b);

/** Absolute extremum of f on [a, b]: dense sampling, then golden refinement around the best sample. */
function extremum(f: RealFn, a: number, b: number, kind: 'max' | 'min', samples = 20000): { x: number; y: number } {
  const sign = kind === 'max' ? 1 : -1;
  let bestX = a;
  let bestY = -Infinity;
  for (let i = 0; i <= samples; i += 1) {
    const x = a + ((b - a) * i) / samples;
    const y = sign * f(x);
    if (Number.isFinite(y) && y > bestY) {
      bestY = y;
      bestX = x;
    }
  }
  const step = (b - a) / samples;
  const lo = Math.max(a, bestX - step);
  const hi = Math.min(b, bestX + step);
  const refined = goldenMax((x) => sign * f(x), lo, hi);
  const x = sign * f(refined) >= bestY ? refined : bestX;
  return { x, y: f(x) };
}

/** Tangent line y = m x + n of f at x0, from the numeric derivative. */
function tangentAt(f: RealFn, x0: number): { m: number; n: number } {
  const m = numericDerivative(f, x0, 1e-6);
  return { m, n: f(x0) - m * x0 };
}

/** Real roots of a polynomial-like function, including roots of even multiplicity (roots of p' where p vanishes). */
function allRoots(p: RealFn, a: number, b: number): number[] {
  const simple = findRoots(p, a, b);
  const multiple = findRoots((x) => numericDerivative(p, x), a, b).filter((r) => Math.abs(p(r)) < 1e-9);
  const merged = [...simple, ...multiple].sort((u, v) => u - v);
  return merged.filter((r, i) => i === 0 || Math.abs(r - merged[i - 1]) > 1e-5);
}

/** Linear interpolation through the given vertices (a polyline graph). */
function polyline(points: Array<[number, number]>): RealFn {
  return (x: number) => {
    for (let i = 1; i < points.length; i += 1) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      if (x >= x0 && x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
    return Number.NaN;
  };
}

/** Checks that the polyline with exactly `model.length` vertices in the SVG is the model drawn to scale (one affine map per axis). */
function expectFigureMatches(svg: string, model: Array<[number, number]>) {
  const lines = [...svg.matchAll(/<polyline points="([^"]+)"/g)].map((match) =>
    match[1].split(' ').map((pair) => pair.split(',').map(Number) as [number, number]),
  );
  const drawn = lines.find((points) => points.length === model.length);
  expect(drawn, 'figure polyline').toBeDefined();
  const pts = drawn!;
  const sx = (pts[1][0] - pts[0][0]) / (model[1][0] - model[0][0]);
  const j = model.findIndex(([, y]) => y !== model[0][1]);
  const sy = (pts[j][1] - pts[0][1]) / (model[j][1] - model[0][1]);
  expect(sy).toBeLessThan(0); // SVG y grows downwards
  model.forEach(([x, y], i) => {
    expect(pts[i][0]).toBeCloseTo(pts[0][0] + sx * (x - model[0][0]), 0);
    expect(pts[i][1]).toBeCloseTo(pts[0][1] + sy * (y - model[0][1]), 0);
  });
}

const near = (values: number[], expected: number[], digits = 6) => {
  expect(values.length).toBe(expected.length);
  values.forEach((value, i) => expect(value).toBeCloseTo(expected[i], digits));
};

describe('openstax calculus — structure', () => {
  const lessonIds = [
    'calc-derivative',
    'calc-tangent',
    'calc-extrema-monotonic',
    'calc-absolute-extrema',
    'calc-asymptotes',
    'calc-concavity',
    'calc-investigate-polynomial',
    'calc-investigate-rational',
    'calc-investigate-root',
    'calc-trig-functions',
    'calc-extremum-problems',
    'calc-indefinite-integral',
    'calc-graph-integral',
    'calc-areas',
  ];

  it('covers the target lessons with 4–6 attributed exercises each, ordered and numbered', () => {
    expect(Object.keys(openstaxCalculusExercises).sort()).toEqual([...lessonIds].sort());
    expect(all.length).toBeGreaterThanOrEqual(60);
    expect(all.length).toBeLessThanOrEqual(80);
    const seenSources = new Set<string>();
    for (const [lessonId, exercises] of Object.entries(openstaxCalculusExercises)) {
      expect(exercises.length, lessonId).toBeGreaterThanOrEqual(4);
      expect(exercises.length, lessonId).toBeLessThanOrEqual(6);
      exercises.forEach((exercise, index) => {
        expect(exercise.id).toBe(`${lessonId}-os${index + 1}`);
        if (index > 0) expect(exercise.difficulty, `${exercise.id} is ordered easy → hard`).toBeGreaterThanOrEqual(exercises[index - 1].difficulty);
        const source = exercise.source!;
        expect(source.kind).toBe('openstax');
        expect(source.work).toBe('OpenStax, Calculus Volume 1');
        expect(source.license).toBe('CC BY-NC-SA 4.0');
        expect(source.licenseUrl).toBe('https://creativecommons.org/licenses/by-nc-sa/4.0/');
        expect(source.adapted).toBe(true);
        expect(source.url).toMatch(/^https:\/\/openstax\.org\/books\/calculus-volume-1\/pages\/\d+-(\d+-)?[a-z-]+$/);
        expect(source.section).toMatch(/^(\d+\.\d+ [A-Za-z ]+|Chapter \d+ Review Exercises), תרגיל \d+$/);
        const chapter = source.section.match(/^(?:Chapter )?(\d+)/)![1];
        expect(source.url).toContain(`/pages/${chapter}-`);
        expect(seenSources.has(source.section), `${source.section} used twice`).toBe(false);
        seenSources.add(source.section);
        expect(exercise.hints.length).toBeGreaterThanOrEqual(1);
        expect(exercise.hints.length).toBeLessThanOrEqual(3);
        expect(exercise.solutionSteps.length).toBeGreaterThanOrEqual(2);
        expect(exercise.solutionSteps.length).toBeLessThanOrEqual(8);
        if (exercise.figureSvg) {
          expect(exercise.figureSvg).toContain('viewBox="0 0 320 240"');
          expect(exercise.figureSvg).toContain('stroke="currentColor"');
        }
      });
    }
  });
});

describe('calc-derivative (OpenStax)', () => {
  it('calc-derivative-os1', () => {
    const f = (x: number) => x * x + 9 * x;
    const quotient = (h: number) => (f(2 + h) - f(2)) / h;
    expect(quotient(1e-7)).toBeCloseTo(ans('calc-derivative-os1')[0], 5);
    expect(numericDerivative(f, 2)).toBeCloseTo(ans('calc-derivative-os1')[0], 8);
  });

  it('calc-derivative-os2 (claimed derivative matches numerically)', () => {
    const f = (x: number) => 8 * x ** 4 + 9 * x ** 2 - 1;
    for (const x of [-1.5, -0.3, 0.7, 2]) expect(numericDerivative(f, x)).toBeCloseTo(32 * x ** 3 + 18 * x, 5);
  });

  it('calc-derivative-os3 (claimed derivative matches numerically)', () => {
    const f = (x: number) => (x + 9) / (x * x - 7 * x + 1);
    const claimed = (x: number) => (-x * x - 18 * x + 64) / (x * x - 7 * x + 1) ** 2;
    for (const x of [-2, 1, 3, 10]) expect(numericDerivative(f, x)).toBeCloseTo(claimed(x), 6);
  });

  it('calc-derivative-os4 (claimed derivative matches numerically)', () => {
    const f = (x: number) => (2 * x ** 3 - x * x + 6 * x + 1) ** 3;
    const claimed = (x: number) => 6 * (2 * x ** 3 - x * x + 6 * x + 1) ** 2 * (3 * x * x - x + 3);
    for (const x of [-1, 0.5, 1.2]) {
      const exact = claimed(x);
      expect(Math.abs(numericDerivative(f, x, 1e-6) - exact) / Math.max(1, Math.abs(exact))).toBeLessThan(1e-6);
    }
  });

  it('calc-derivative-os5', () => {
    // Local linear models that reproduce the table at x = 2: f(2)=5, f'(2)=7, g(2)=3, g'(2)=1.
    const f = (x: number) => 5 + 7 * (x - 2);
    const g = (x: number) => 3 + (x - 2);
    expect([f(2), numericDerivative(f, 2), g(2), numericDerivative(g, 2)].map((v) => Math.round(v * 1e6) / 1e6)).toEqual([5, 7, 3, 1]);
    expect(numericDerivative((x) => f(x) / g(x), 2)).toBeCloseTo(ans('calc-derivative-os5')[0], 8);
  });

  it('calc-derivative-os6', () => {
    // f(x) = -4 + c(x+1) satisfies f(-1) = -4 and f'(-1) = c; find c with y'(-1) = 3.
    const yPrimeAtMinus1 = (c: number) => numericDerivative((x) => (-4 + c * (x + 1) + 5 * x * x) ** 4, -1, 1e-6);
    const c = bisect((value) => yPrimeAtMinus1(value) - 3, 0, 20, 1e-10);
    expect(c).toBeCloseTo(ans('calc-derivative-os6')[0], 5);
  });
});

describe('calc-tangent (OpenStax)', () => {
  const check = (id: string, f: RealFn, x0: number, y0?: number) => {
    if (y0 !== undefined) expect(f(x0)).toBeCloseTo(y0, 10);
    const { m, n } = tangentAt(f, x0);
    const [mAns, nAns] = ans(id);
    expect(m).toBeCloseTo(mAns, 6);
    expect(n).toBeCloseTo(nAns, 6);
  };

  it('calc-tangent-os1', () => {
    const f = (x: number) => x * x + x;
    expect((f(1 + 1e-7) - f(1)) / 1e-7).toBeCloseTo(ans('calc-tangent-os1')[0], 5);
    check('calc-tangent-os1', f, 1);
  });
  it('calc-tangent-os2', () => check('calc-tangent-os2', (x) => 2 * x ** 3 + 4 * x * x - 5 * x - 3, -1));
  it('calc-tangent-os3', () => check('calc-tangent-os3', (x) => 2 / (x * x) + 1, 1, 3));
  it('calc-tangent-os4', () => check('calc-tangent-os4', (x) => (3 * x + 1 / x) ** 2, 1, 16));

  it('calc-tangent-os5', () => {
    const f = (x: number) => 6 / (x - 1);
    check('calc-tangent-os5', f, 3, 3);
    // No other tangent line of the graph passes through P(3, 3).
    const missesP = (t: number) => f(t) + numericDerivative(f, t, 1e-6) * (3 - t) - 3;
    for (let t = -20; t <= 20; t += 0.01) {
      if (Math.abs(t - 1) < 0.02 || Math.abs(t - 3) < 0.05) continue;
      expect(Math.abs(missesP(t))).toBeGreaterThan(1e-4);
    }
  });

  it('calc-tangent-os6', () => {
    const f = (x: number) => x ** 3;
    const xIntercept = (a: number) => a - f(a) / numericDerivative(f, a, 1e-6);
    const a = bisect((t) => xIntercept(t) - 6, 1, 20, 1e-10);
    near([a, f(a)], ans('calc-tangent-os6'), 4);
    expect(xIntercept(-9)).toBeCloseTo(-6, 4); // the negative point gives the intercept −6, not 6
  });
});

describe('calc-extrema-monotonic (OpenStax)', () => {
  it('calc-extrema-monotonic-os1', () => {
    const f = (x: number) => x + 1 / x;
    const critical = [...findCriticalPoints(f, -5, -0.01), ...findCriticalPoints(f, 0.01, 5)];
    near(critical, ans('calc-extrema-monotonic-os1'));
  });

  it('calc-extrema-monotonic-os2', () => {
    const f = (x: number) => x ** 3 - 12 * x;
    const [xMax, xMin] = findCriticalPoints(f, -10, 10);
    expect(numericDerivative(f, xMax - 0.1)).toBeGreaterThan(0);
    expect(numericDerivative(f, xMax + 0.1)).toBeLessThan(0);
    near([xMax, f(xMax), xMin, f(xMin)], ans('calc-extrema-monotonic-os2'));
    expect(f(1000)).toBeGreaterThan(1e8);
    expect(f(-1000)).toBeLessThan(-1e8);
  });

  it('calc-extrema-monotonic-os3', () => {
    const f = (x: number) => 4 * sqrt(x) - x * x;
    const critical = findCriticalPoints(f, 0.001, 10);
    expect(critical.length).toBe(1);
    near([critical[0], f(critical[0])], ans('calc-extrema-monotonic-os3'));
    expect(extremum(f, 0, 10, 'max').x).toBeCloseTo(critical[0], 5);
  });

  it('calc-extrema-monotonic-os4', () => {
    const f = (x: number) => 3 * x ** 4 + 8 * x ** 3 - 18 * x * x;
    const critical = findCriticalPoints(f, -10, 10);
    near(critical, [-3, 0, 1]);
    const absMin = extremum(f, -10, 10, 'min');
    const [xAbs, yAbs, xLocMax, yLocMin] = ans('calc-extrema-monotonic-os4');
    expect(absMin.x).toBeCloseTo(xAbs, 5);
    expect(absMin.y).toBeCloseTo(yAbs, 8);
    expect(critical[1]).toBeCloseTo(xLocMax, 6);
    expect(numericDerivative(f, -0.1)).toBeGreaterThan(0);
    expect(numericDerivative(f, 0.1)).toBeLessThan(0);
    expect(f(critical[2])).toBeCloseTo(yLocMin, 8);
  });

  it('calc-extrema-monotonic-os5', () => {
    const f = (x: number) => (x * x + x + 6) / (x - 1);
    const left = findCriticalPoints(f, -20, 0.99);
    const right = findCriticalPoints(f, 1.01, 20);
    expect(left.length).toBe(1);
    expect(right.length).toBe(1);
    expect(numericDerivative(f, left[0] - 0.1)).toBeGreaterThan(0);
    expect(numericDerivative(f, right[0] - 0.1)).toBeLessThan(0);
    near([left[0], f(left[0]), right[0], f(right[0])], ans('calc-extrema-monotonic-os5'));
  });

  it('calc-extrema-monotonic-os6', () => {
    const f = (x: number) => 12 * x ** 5 + 45 * x ** 4 + 20 * x ** 3 - 90 * x * x - 120 * x + 3;
    const critical = findCriticalPoints(f, -5, 5); // sign changes only: x = -1 (double root of f') is not an extremum
    expect(critical.length).toBe(2);
    expect(numericDerivative(f, -1.1)).toBeLessThan(0);
    expect(numericDerivative(f, -0.9)).toBeLessThan(0);
    near([critical[0], f(critical[0]), critical[1], f(critical[1])], ans('calc-extrema-monotonic-os6'), 5);
  });
});

describe('calc-absolute-extrema (OpenStax)', () => {
  it('calc-absolute-extrema-os1', () => {
    const f = (x: number) => x * x + 3;
    const min = extremum(f, -1, 4, 'min');
    const max = extremum(f, -1, 4, 'max');
    near([min.x, min.y, max.x, max.y], ans('calc-absolute-extrema-os1'), 5);
  });

  it('calc-absolute-extrema-os2', () => {
    const f = (x: number) => x * x + 2 / x;
    const min = extremum(f, 1, 4, 'min');
    const max = extremum(f, 1, 4, 'max');
    near([min.y, max.x, max.y], ans('calc-absolute-extrema-os2'), 6);
  });

  it('calc-absolute-extrema-os3', () => {
    const f = (x: number) => (x - x * x) ** 2;
    const max = extremum(f, -1, 1, 'max');
    const min = extremum(f, -1, 1, 'min');
    const local = findCriticalPoints(f, 0.1, 0.9);
    expect(local.length).toBe(1);
    expect(max.x).toBeCloseTo(-1, 6);
    near([max.y, min.y, f(local[0])], ans('calc-absolute-extrema-os3'), 7);
    expect(f(0)).toBe(0);
    expect(f(1)).toBe(0);
  });

  it('calc-absolute-extrema-os4', () => {
    const f = (x: number) => 3 * x ** 4 - 4 * x ** 3 - 12 * x * x + 6;
    near(findCriticalPoints(f, -3, 3), [-1, 0, 2]);
    const max = extremum(f, -3, 3, 'max');
    const min = extremum(f, -3, 3, 'min');
    near([max.x, max.y, min.x, min.y], ans('calc-absolute-extrema-os4'), 5);
  });

  it('calc-absolute-extrema-os5', () => {
    const f = (x: number) => 1 / (x - x * x);
    const min = extremum(f, 1e-3, 1 - 1e-3, 'min');
    near([min.x, min.y], ans('calc-absolute-extrema-os5'), 6);
    expect(f(1e-7)).toBeGreaterThan(1e6);
    expect(f(1 - 1e-7)).toBeGreaterThan(1e6);
  });

  it('calc-absolute-extrema-os6', () => {
    const f = (x: number) => sqrt(x) - sqrt(x ** 3);
    const max = extremum(f, 0, 4, 'max');
    const min = extremum(f, 0, 4, 'min');
    near([max.x, max.y, min.x, min.y], ans('calc-absolute-extrema-os6'), 5);
  });
});

describe('calc-asymptotes (OpenStax)', () => {
  const blowsUp = (f: RealFn, a: number) => expect(Math.min(Math.abs(f(a - 1e-7)), Math.abs(f(a + 1e-7)))).toBeGreaterThan(1e5);

  it('calc-asymptotes-os1', () => {
    const f = (x: number) => 1 / (1 - x * x);
    const poles = allRoots((x) => 1 - x * x, -10, 10);
    poles.forEach((p) => blowsUp(f, p));
    near([...poles, f(1e8), f(-1e8)].slice(0, 3), ans('calc-asymptotes-os1'));
    expect(f(-1e8)).toBeCloseTo(0, 10);
  });

  it('calc-asymptotes-os2', () => {
    const f = (x: number) => (x * x + 3) / (x * x + 1);
    expect(allRoots((x) => x * x + 1, -100, 100)).toEqual([]);
    expect(f(1e8)).toBeCloseTo(ans('calc-asymptotes-os2')[0], 10);
    expect(f(-1e8)).toBeCloseTo(ans('calc-asymptotes-os2')[0], 10);
  });

  it('calc-asymptotes-os3', () => {
    const den = (x: number) => x ** 3 + x * x;
    const f = (x: number) => 1 / den(x);
    const poles = allRoots(den, -10, 10);
    poles.forEach((p) => blowsUp(f, p));
    near([...poles, f(1e8)], ans('calc-asymptotes-os3'));
  });

  it('calc-asymptotes-os4', () => {
    const f = (x: number) => (x ** 3 + 1) / (x ** 3 - 1);
    const poles = allRoots((x) => x ** 3 - 1, -10, 10);
    poles.forEach((p) => blowsUp(f, p));
    near([...poles, f(1e8)], ans('calc-asymptotes-os4'));
    expect(f(-1e8)).toBeCloseTo(1, 10);
  });

  it('calc-asymptotes-os5', () => {
    const f = (x: number) => (x + 1) / (x * x + 5 * x + 4);
    near(allRoots((x) => x * x + 5 * x + 4, -10, 10), [-4, -1]);
    const [limit, pole] = ans('calc-asymptotes-os5');
    expect(f(-1 - 1e-7)).toBeCloseTo(limit, 5);
    expect(f(-1 + 1e-7)).toBeCloseTo(limit, 5);
    blowsUp(f, pole);
  });

  it('calc-asymptotes-os6', () => {
    const f = (x: number) => (x + 1) / (x * x + 7 * x + 6);
    near(allRoots((x) => x * x + 7 * x + 6, -10, 10), [-6, -1]);
    expect(Number.isFinite(f(-1 + 1e-7)) && Math.abs(f(-1 + 1e-7)) < 1).toBe(true); // only a hole at x = -1
    const [pole, horizontal] = ans('calc-asymptotes-os6');
    blowsUp(f, pole);
    expect(f(1e8)).toBeCloseTo(horizontal, 7);
    expect(f(-1e8)).toBeCloseTo(horizontal, 7);
  });
});

describe('calc-concavity (OpenStax)', () => {
  it('calc-concavity-os1', () => {
    const f = (x: number) => x ** 3 - 4 * x * x + x + 2;
    const inflection = findInflectionPoints(f, -10, 10);
    expect(inflection.length).toBe(1);
    near([inflection[0], f(inflection[0])], ans('calc-concavity-os1'), 4);
  });

  it('calc-concavity-os2', () => {
    const f = (x: number) => x + x * x - x ** 3;
    const [xMin, xMax] = findCriticalPoints(f, -10, 10);
    const inflection = findInflectionPoints(f, -10, 10);
    expect(numericDerivative(f, xMin - 0.1)).toBeLessThan(0);
    expect(inflection.length).toBe(1);
    near([xMin, f(xMin), xMax, f(xMax), inflection[0], f(inflection[0])], ans('calc-concavity-os2'), 4);
  });

  it('calc-concavity-os3', () => {
    const f = (x: number) => x ** 3 + x ** 4;
    const critical = findCriticalPoints(f, -5, 5); // x = 0 is a double root of f', no sign change
    expect(critical.length).toBe(1);
    const inflection = findInflectionPoints(f, -5, 5);
    near([critical[0], f(critical[0]), inflection[0], inflection[1]], ans('calc-concavity-os3'), 4);
  });

  it('calc-concavity-os4 (no extrema, no inflection, concavity flips across the asymptote)', () => {
    const f = (x: number) => 1 / (1 - x);
    for (const x of [-5, -1, 0.5, 1.5, 3, 8]) expect(numericDerivative(f, x)).toBeGreaterThan(0);
    for (const x of [-3, 0, 0.9]) expect(second(f, x, 1e-3)).toBeGreaterThan(0);
    for (const x of [1.1, 2, 5]) expect(second(f, x, 1e-3)).toBeLessThan(0);
    expect(findInflectionPoints(f, -5, 0.99)).toEqual([]);
    expect(findInflectionPoints(f, 1.01, 5)).toEqual([]);
  });

  it('calc-concavity-os5', () => {
    const f = (x: number) => x ** 11 - 6 * x ** 10;
    const critical = findCriticalPoints(f, -2, 8);
    expect(critical.length).toBe(2);
    expect(numericDerivative(f, -0.5)).toBeGreaterThan(0);
    expect(numericDerivative(f, 0.5)).toBeLessThan(0);
    const inflection = findRoots((x) => second(f, x, 1e-3), -2, 8);
    expect(inflection.length).toBe(1); // x = 0 is not an inflection point
    const [xMax, xMin, xInfl] = ans('calc-concavity-os5');
    expect(critical[0]).toBeCloseTo(xMax, 4);
    expect(critical[1]).toBeCloseTo(xMin, 6);
    expect(inflection[0]).toBeCloseTo(xInfl, 5);
  });
});

describe('calc-investigate-polynomial (OpenStax)', () => {
  it('calc-investigate-polynomial-os1', () => {
    const f = (x: number) => 3 * x * x + 2 * x + 4;
    const critical = findCriticalPoints(f, -10, 10);
    expect(findRoots(f, -100, 100)).toEqual([]);
    expect(findInflectionPoints(f, -10, 10)).toEqual([]);
    near([critical[0], f(critical[0])], ans('calc-investigate-polynomial-os1'));
  });

  it('calc-investigate-polynomial-os2', () => {
    const f = (x: number) => x ** 3 - 6 * x * x;
    const [xMax, xMin] = findCriticalPoints(f, -10, 10);
    expect(xMax).toBeCloseTo(0, 6);
    expect(f(xMax)).toBeCloseTo(0, 6);
    const [xInfl] = findInflectionPoints(f, -10, 10);
    near([xMin, f(xMin), xInfl, f(xInfl)], ans('calc-investigate-polynomial-os2'), 4);
  });

  it('calc-investigate-polynomial-os3', () => {
    const f = (x: number) => x ** 3 - 3 * x * x + 4;
    const [xMax, xMin] = findCriticalPoints(f, -10, 10);
    const [xInfl] = findInflectionPoints(f, -10, 10);
    const crossings = findRoots(f, -10, 10); // x = 2 is a tangential root
    expect(xMax).toBeCloseTo(0, 6);
    near([f(xMax), xMin, xInfl, f(xInfl), crossings[0]], ans('calc-investigate-polynomial-os3'), 4);
    expect(f(xMin)).toBeCloseTo(0, 8);
  });

  it('calc-investigate-polynomial-os4', () => {
    const f = (x: number) => x ** 4 - 6 * x ** 3;
    const critical = findCriticalPoints(f, -10, 10);
    expect(critical.length).toBe(1);
    const inflection = findInflectionPoints(f, -10, 10);
    near(inflection, [0, 3], 4);
    near([critical[0], f(critical[0]), inflection[1], f(inflection[1])], ans('calc-investigate-polynomial-os4'), 3);
  });

  it('calc-investigate-polynomial-os5', () => {
    const f = (x: number) => (x - 2) ** 2 * (x - 4) ** 2;
    near(findCriticalPoints(f, 0, 6), [2, 3, 4]);
    const inflection = findInflectionPoints(f, 0, 6);
    const [xMax, yMax, xLeft, xRight, yInfl] = ans('calc-investigate-polynomial-os5');
    expect(xMax).toBeCloseTo(3, 10);
    expect(f(xMax)).toBeCloseTo(yMax, 10);
    near(inflection, [xLeft, xRight], 4);
    expect(f(inflection[0])).toBeCloseTo(yInfl, 5);
    expect(f(inflection[1])).toBeCloseTo(yInfl, 5);
  });
});

describe('calc-investigate-rational (OpenStax)', () => {
  it('calc-investigate-rational-os1 (no critical points)', () => {
    const f = (x: number) => (x * x - 1) / (x * x + 2 * x - 3);
    for (const [a, b] of [
      [-10, -3.01],
      [-2.99, 0.99],
      [1.01, 10],
    ]) {
      expect(findCriticalPoints(f, a, b)).toEqual([]);
      expect(numericDerivative(f, (a + b) / 2)).toBeGreaterThan(0);
    }
  });

  it('calc-investigate-rational-os2', () => {
    const f = (x: number) => (x * x + x - 2) / (x * x - 3 * x - 4);
    const poles = allRoots((x) => x * x - 3 * x - 4, -10, 10);
    poles.forEach((p) => expect(Math.abs(f(p + 1e-7))).toBeGreaterThan(1e5));
    for (const [a, b] of [
      [-10, -1.01],
      [-0.99, 3.99],
      [4.01, 10],
    ])
      expect(findCriticalPoints(f, a, b)).toEqual([]);
    near([...poles, f(1e8), f(0)], ans('calc-investigate-rational-os2'), 6);
  });

  it('calc-investigate-rational-os3', () => {
    const f = (x: number) => (x ** 3 + 4 * x * x + 3 * x) / (3 * x + 9);
    const critical = [...findCriticalPoints(f, -10, -3.01), ...findCriticalPoints(f, -2.99, 10)];
    expect(critical.length).toBe(1);
    const hole = (f(-3 - 1e-6) + f(-3 + 1e-6)) / 2;
    near([critical[0], f(critical[0]), hole], ans('calc-investigate-rational-os3'), 5);
  });

  it('calc-investigate-rational-os4', () => {
    const f = (x: number) => (2 * x + 1) / (x * x + 6 * x + 5);
    const critical = [...findCriticalPoints(f, -10, -5.01), ...findCriticalPoints(f, -4.99, -1.01), ...findCriticalPoints(f, -0.99, 10)];
    expect(critical.length).toBe(2);
    const [xMin, xMax] = critical;
    expect(numericDerivative(f, xMin - 0.1)).toBeLessThan(0);
    expect(numericDerivative(f, xMin + 0.1)).toBeGreaterThan(0);
    expect(numericDerivative(f, xMax - 0.1)).toBeGreaterThan(0);
    expect(numericDerivative(f, xMax + 0.1)).toBeLessThan(0);
    near([xMin, f(xMin), xMax, f(xMax)], ans('calc-investigate-rational-os4'));
  });

  it('calc-investigate-rational-os5', () => {
    const den = (x: number) => x * (x + 1) ** 2;
    const f = (x: number) => 1 / den(x);
    const critical = [...findCriticalPoints(f, -10, -1.01), ...findCriticalPoints(f, -0.99, -0.01), ...findCriticalPoints(f, 0.01, 10)];
    expect(critical.length).toBe(1);
    for (const [a, b] of [
      [-10, -1.01],
      [-0.99, -0.01],
      [0.01, 10],
    ])
      expect(findInflectionPoints(f, a, b)).toEqual([]);
    const poles = allRoots(den, -5, 5);
    near([critical[0], f(critical[0]), ...poles], ans('calc-investigate-rational-os5'), 6);
  });
});

describe('calc-investigate-root (OpenStax)', () => {
  it('calc-investigate-root-os1', () => {
    const f = (x: number) => sqrt(4 - x * x);
    const critical = findCriticalPoints(f, -1.999, 1.999);
    const [zero, left, right] = ans('calc-investigate-root-os1');
    near(critical, [zero]);
    // Domain [-2, 2]; the one-sided difference quotient blows up at the endpoints.
    expect(Number.isNaN(f(right + 1e-9))).toBe(true);
    expect(Number.isNaN(f(left - 1e-9))).toBe(true);
    expect(Math.abs((f(right) - f(right - 1e-10)) / 1e-10)).toBeGreaterThan(1e4);
    expect(Math.abs((f(left + 1e-10) - f(left)) / 1e-10)).toBeGreaterThan(1e4);
  });

  it('calc-investigate-root-os2', () => {
    const f = (x: number) => 3 * x * sqrt(1 - x * x);
    const max = extremum(f, -1, 1, 'max');
    const min = extremum(f, -1, 1, 'min');
    near([max.x, max.y, min.x, min.y], ans('calc-investigate-root-os2'), 5);
  });

  it('calc-investigate-root-os3', () => {
    const f = (x: number) => sqrt(x * x - 5 * x + 4);
    expect(Number.isNaN(f(2.5))).toBe(true);
    const [yIntercept, left, right] = ans('calc-investigate-root-os3');
    expect(f(0)).toBeCloseTo(yIntercept, 12);
    // Both minima are the endpoints of the two pieces of the domain: f = 0 there, f > 0 outside, undefined inside (1, 4).
    for (const [end, outside, inside] of [
      [left, left - 1e-6, left + 1e-6],
      [right, right + 1e-6, right - 1e-6],
    ]) {
      expect(f(end)).toBeCloseTo(0, 12);
      expect(f(outside)).toBeGreaterThan(0);
      expect(Number.isNaN(f(inside))).toBe(true);
    }
    expect(findCriticalPoints(f, -10, 0.99)).toEqual([]);
    expect(findCriticalPoints(f, 4.01, 10)).toEqual([]);
    expect(numericDerivative(f, 0)).toBeLessThan(0);
    expect(numericDerivative(f, 6)).toBeGreaterThan(0);
    for (const x of [-5, 0, 0.9, 4.1, 7]) expect(second(f, x, 1e-3)).toBeLessThan(0);
  });

  it('calc-investigate-root-os4', () => {
    const f = (x: number) => 2 * x * sqrt(16 - x * x);
    const critical = findCriticalPoints(f, -3.999, 3.999);
    expect(critical.length).toBe(2);
    near(findInflectionPoints(f, -3.99, 3.99), [0], 5);
    const [xMax, yMax, xMin, yMin] = ans('calc-investigate-root-os4');
    near([critical[1], f(critical[1]), critical[0], f(critical[0])], [xMax, yMax, xMin, yMin], 5);
  });

  it('calc-investigate-root-os5', () => {
    const f = (x: number) => x - sqrt(4 - x * x);
    const critical = findCriticalPoints(f, -1.9999, 1.9999);
    expect(critical.length).toBe(1);
    const zeros = findRoots(f, -2, 2);
    const max = extremum(f, -2, 2, 'max');
    near([critical[0], f(critical[0]), zeros[0], max.y], ans('calc-investigate-root-os5'), 5);
    expect(max.x).toBeCloseTo(2, 6);
    expect(findInflectionPoints(f, -1.99, 1.99)).toEqual([]);
  });

  it('calc-investigate-root-os6', () => {
    const f = (x: number) => sqrt(x * x + 2) / (x + 1);
    const critical = [...findCriticalPoints(f, -10, -1.01), ...findCriticalPoints(f, -0.99, 10)];
    expect(critical.length).toBe(1);
    expect(Math.abs(f(-1 + 1e-7))).toBeGreaterThan(1e5);
    near([f(1e9), f(-1e9), critical[0], f(critical[0])], ans('calc-investigate-root-os6'), 6);
  });
});

describe('calc-trig-functions (OpenStax)', () => {
  it('calc-trig-functions-os1', () => {
    const { m, n } = tangentAt((x) => -sin(x), 0);
    near([m, n], ans('calc-trig-functions-os1'));
  });

  it('calc-trig-functions-os2', () => {
    const f = (x: number) => x - 2 * cos(x);
    const solutions = findRoots((x) => numericDerivative(f, x) - 2, 1e-6, 2 * PI - 1e-6);
    near(solutions, ans('calc-trig-functions-os2'));
  });

  it('calc-trig-functions-os3', () => {
    const f = (x: number) => sin(x) + cos(x);
    const max = extremum(f, 0, 2 * PI, 'max');
    const min = extremum(f, 0, 2 * PI, 'min');
    near([max.x, max.y, min.x, min.y], ans('calc-trig-functions-os3'), 5);
  });

  it('calc-trig-functions-os4', () => {
    const f = (x: number) => sin(x) + sin(x) ** 3;
    const [xMin, xMax] = findCriticalPoints(f, -PI + 1e-6, PI - 1e-6);
    expect(numericDerivative(f, 0)).toBeGreaterThan(0);
    expect(numericDerivative(f, 3)).toBeLessThan(0);
    near([xMax, f(xMax), xMin, f(xMin)], ans('calc-trig-functions-os4'));
  });

  it('calc-trig-functions-os5', () => {
    const f = (x: number) => x + sin(2 * x);
    const [xMin, xMax] = findCriticalPoints(f, -PI / 2, PI / 2);
    const inflection = findInflectionPoints(f, -PI / 2 + 1e-3, PI / 2 - 1e-3);
    expect(inflection.length).toBe(1);
    near([xMax, f(xMax), xMin, f(xMin), inflection[0]], ans('calc-trig-functions-os5'), 5);
  });

  it('calc-trig-functions-os6', () => {
    const f = (x: number) => sin(PI * x) - cos(PI * x);
    const [xMin, xMax] = findCriticalPoints(f, -1, 1);
    const inflection = findInflectionPoints(f, -1 + 1e-3, 1 - 1e-3);
    expect(extremum(f, -1, 1, 'min').x).toBeCloseTo(xMin, 5);
    expect(extremum(f, -1, 1, 'max').x).toBeCloseTo(xMax, 5);
    near([xMin, f(xMin), xMax, f(xMax), ...inflection], ans('calc-trig-functions-os6'), 5);
  });
});

describe('calc-extremum-problems (OpenStax)', () => {
  const distance = (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x2 - x1, y2 - y1);

  it('calc-extremum-problems-os1', () => {
    const x = goldenMin((t) => distance(t, 5 - 2 * t, 0, 0), -10, 10);
    near([x, 5 - 2 * x], ans('calc-extremum-problems-os1'));
  });

  it('calc-extremum-problems-os2', () => {
    const x = goldenMin((t) => distance(t, 5 - 2 * t, 1, 1), -10, 10);
    near([x, 5 - 2 * x], ans('calc-extremum-problems-os2'));
  });

  it('calc-extremum-problems-os3', () => {
    const height = (x: number) => 6 * (1 - x / 4); // vertex on x/4 + y/6 = 1
    const x = goldenMax((t) => t * height(t), 0, 4);
    const [area, xAns, yAns] = ans('calc-extremum-problems-os3');
    expect(xAns / 4 + yAns / 6).toBeCloseTo(1, 12);
    near([x * height(x), x, height(x)], [area, xAns, yAns]);
  });

  it('calc-extremum-problems-os4', () => {
    const d = (t: number) => distance(t, t * t, 0, 3);
    const xRight = goldenMin(d, 0.1, 3);
    const xLeft = goldenMin(d, -3, -0.1);
    expect(xLeft).toBeCloseTo(-xRight, 6);
    expect(d(xRight)).toBeLessThan(d(0)); // x = 0 is only a local maximum of the distance
    near([xRight, xRight * xRight, d(xRight)], ans('calc-extremum-problems-os4'));
  });
});

describe('calc-indefinite-integral (OpenStax) — derivative of the answer equals the integrand', () => {
  const checkAntiderivative = (F: RealFn, f: RealFn, points: number[], interval: [number, number]) => {
    for (const x of points) {
      const exact = f(x);
      expect(Math.abs(numericDerivative(F, x, 1e-6) - exact) / Math.max(1, Math.abs(exact))).toBeLessThan(1e-6);
    }
    expect(simpson(f, interval[0], interval[1], 4000)).toBeCloseTo(F(interval[1]) - F(interval[0]), 6);
  };

  it('calc-indefinite-integral-os1', () =>
    checkAntiderivative((x) => x * x / 2 + 4 * x ** 3, (x) => x + 12 * x * x, [-2, 0.3, 1.7], [-1, 2]));
  it('calc-indefinite-integral-os2', () =>
    checkAntiderivative((x) => 3 * x - 2 / x, (x) => (3 * x * x + 2) / (x * x), [-1.5, 0.5, 2], [0.5, 3]));
  it('calc-indefinite-integral-os3', () =>
    checkAntiderivative((x) => 14 * x - 2 / x - 1 / (2 * x * x), (x) => (14 * x ** 3 + 2 * x + 1) / x ** 3, [-1.2, 0.7, 2.5], [1, 4]));
  it('calc-indefinite-integral-os4', () =>
    checkAntiderivative((x) => -1 / (12 * (2 * x - 3) ** 6), (x) => (2 * x - 3) ** -7, [-1, 0, 2, 2.5], [2, 4]));
  it('calc-indefinite-integral-os5', () =>
    checkAntiderivative((x) => -1 / (3 * (x ** 3 - 3)), (x) => (x * x) / (x ** 3 - 3) ** 2, [-1, 0, 2, 3], [2, 3]));
  it('calc-indefinite-integral-os6', () =>
    checkAntiderivative((x) => (x * x - 2 * x) ** 4 / 8, (x) => (x - 1) * (x * x - 2 * x) ** 3, [-1, 0.5, 1.5, 3], [-1, 3]));
});

describe('calc-graph-integral (OpenStax)', () => {
  it('calc-graph-integral-os1', () => {
    // f(x) = f(1) + ∫_1^x t^-3 dt; C is the limit of f at infinity (the -1/(2x²) part vanishes there).
    const fAt = (x: number) => 1 + simpson((t) => t ** -3, 1, x, 200000);
    const [C] = ans('calc-graph-integral-os1');
    expect(fAt(1000)).toBeCloseTo(C, 5);
    for (const x of [0.5, 2, 5]) expect(-1 / (2 * x * x) + C).toBeCloseTo(fAt(x), 8);
  });

  it('calc-graph-integral-os2 (claimed f is the antiderivative through (0, 0))', () => {
    const fPrime = (t: number) => t ** 3 - 8 * t * t + 16 * t + 1;
    const claimed = (x: number) => x ** 4 / 4 - (8 / 3) * x ** 3 + 8 * x * x + x;
    expect(claimed(0)).toBe(0);
    for (const x of [-1, 1, 2.5, 4]) expect(simpson(fPrime, 0, x)).toBeCloseTo(claimed(x), 8);
  });

  it('calc-graph-integral-os3', () => {
    const F = (x: number) => simpson((t) => 1 - t, 1, x, 200);
    const dF = (x: number) => numericDerivative(F, x, 1e-4);
    const average = simpson(dF, 1, 2, 200) / (2 - 1);
    near([dF(2), average], ans('calc-graph-integral-os3'), 6);
  });

  it('calc-graph-integral-os4', () => {
    const vertices: Array<[number, number]> = [
      [0, 0],
      [1, 1],
      [2, 0],
      [4, -2],
      [6, 0],
      [9, 3],
      [12, 0],
    ];
    const f = polyline(vertices);
    let total = 0;
    for (let i = 1; i < vertices.length; i += 1) total += simpson(f, vertices[i - 1][0], vertices[i][0], 200);
    expect(total).toBeCloseTo(ans('calc-graph-integral-os4')[0], 10);
    expectFigureMatches(ex('calc-graph-integral-os4').figureSvg!, vertices);
  });

  it('calc-graph-integral-os5', () => {
    const triangle1 = polyline([
      [0, 0],
      [1, 1],
      [2, 0],
    ]);
    const semicircle = (x: number) => -sqrt(Math.max(0, 4 - (x - 4) ** 2));
    const triangle3 = polyline([
      [6, 0],
      [9, 3],
      [12, 0],
    ]);
    const total = simpson(triangle1, 0, 1, 100) + simpson(triangle1, 1, 2, 100) + simpson(semicircle, 2, 6, 400000) + simpson(triangle3, 6, 9, 100) + simpson(triangle3, 9, 12, 100);
    expect(total).toBeCloseTo(ans('calc-graph-integral-os5')[0], 5);
  });

  it('calc-graph-integral-os6', () => {
    const vertices: Array<[number, number]> = [
      [0, 0],
      [1, -1],
      [2, 1],
      [3, 1],
      [4, -2],
      [5, -2],
      [6, 0],
    ];
    const F = polyline(vertices);
    const f = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5].map((mid) => numericDerivative(F, mid, 1e-3));
    near(f, [-1, 2, 0, -3, 0, 2], 8); // signs: + on (1,2),(5,6); − on (0,1),(3,4); 0 on (2,3),(4,5)
    const average = f.reduce((sum, value) => sum + value, 0) / 6; // each piece has length 1
    near([Math.max(...f), Math.min(...f), average], ans('calc-graph-integral-os6'), 8);
    expectFigureMatches(ex('calc-graph-integral-os6').figureSvg!, vertices);
  });
});

describe('calc-areas (OpenStax)', () => {
  it('calc-areas-os1', () => {
    expect(simpson((x) => x * x + 3 * x - 5, -2, 3)).toBeCloseTo(ans('calc-areas-os1')[0], 10);
  });

  it('calc-areas-os2', () => {
    const diff = (x: number) => 1 - (x * x - 3);
    const [a, b] = findRoots(diff, -10, 10);
    near([a, b], [-2, 2]);
    expect(absoluteArea(diff, a, b)).toBeCloseTo(ans('calc-areas-os2')[0], 8);
  });

  it('calc-areas-os3', () => {
    const diff = (x: number) => 3 * x + 4 - x * x;
    const [a, b] = findRoots(diff, -10, 10);
    near([a, b], [-1, 4]);
    expect(absoluteArea(diff, a, b)).toBeCloseTo(ans('calc-areas-os3')[0], 8);
  });

  it('calc-areas-os4', () => {
    const g = (t: number) => t * t - 2 * t - 3;
    near(findRoots(g, -2, 4), [-1, 3]);
    let total = 0;
    for (const [a, b] of [
      [-2, -1],
      [-1, 3],
      [3, 4],
    ])
      total += absoluteArea(g, a, b);
    expect(total).toBeCloseTo(ans('calc-areas-os4')[0], 8);
  });

  it('calc-areas-os5', () => {
    const diff = (x: number) => x ** 3 + 3 * x - 4 * x;
    const roots = findRoots(diff, -3, 3.001);
    near(roots, [-1, 0, 1]);
    expect(absoluteArea(diff, -1, 0) + absoluteArea(diff, 0, 1)).toBeCloseTo(ans('calc-areas-os5')[0], 8);
  });

  it('calc-areas-os6', () => {
    const diff = (x: number) => x ** 3 - (x * x + x);
    const roots = findRoots(diff, -3, 3);
    expect(roots.length).toBe(3);
    expect(absoluteArea(diff, roots[0], roots[1]) + absoluteArea(diff, roots[1], roots[2])).toBeCloseTo(ans('calc-areas-os6')[0], 8);
  });
});
