/**
 * Independent numeric verification of the calculus generators: for ~200 seeds every answer is
 * recomputed from `exercise.data` by numeric differentiation, numeric root / critical-point search,
 * Simpson integration and grid searches on the function itself — never by the closed forms the
 * generator uses (integer critical points, (x₂−x₁)³/6, t = √(c/3a) …).
 */
import { describe, expect, it } from 'vitest';
import { absoluteArea, bisect, findCriticalPoints, findRoots, simpson, type RealFn } from '../problems/verify';
import { calculusGenerators } from './calculus';
import { createRng } from './rng';
import type { GeneratedExercise } from './types';

const SEEDS = 200;

function forEachExercise(id: string, check: (exercise: GeneratedExercise, seed: number) => void) {
  const generator = calculusGenerators.find((item) => item.id === id);
  expect(generator, `missing generator ${id}`).toBeDefined();
  for (let seed = 1; seed <= SEEDS; seed += 1) check(generator!.generate(createRng(seed)), seed);
}

/** Richardson-extrapolated central difference: exact for polynomials up to degree 4 (up to rounding). */
function derivative(f: RealFn, x: number, h = 1e-3): number {
  const central = (step: number) => (f(x + step) - f(x - step)) / (2 * step);
  return (4 * central(h / 2) - central(h)) / 3;
}

/** Second central difference: exact for cubics (up to rounding). */
function secondDerivative(f: RealFn, x: number, h = 1e-2): number {
  return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
}

/** Critical points found by the scan of `findCriticalPoints`, refined by bisection on the accurate derivative. */
function criticalPoints(f: RealFn, a: number, b: number): number[] {
  return findCriticalPoints(f, a, b).map((c) => bisect((x) => derivative(f, x), c - 1e-3, c + 1e-3));
}

/** a·x³ + b·x² + c·x + d (+ k/x), built from the drawn parameters. */
function cubicFromData(data: Record<string, number>): RealFn {
  const { a, b, c, d } = data;
  const k = data.k ?? 0;
  return (x) => a * x ** 3 + b * x ** 2 + c * x + d + (k === 0 ? 0 : k / x);
}

// non-round, non-symmetric scan limits, so that no grid point falls exactly on a pole or a root (e.g. x = 0)
const LO = -20.00731;
const HI = 19.99377;

describe('calculus generators – answers recomputed numerically', () => {
  it('gen-calc-derivative-value', () => {
    forEachExercise('gen-calc-derivative-value', (exercise) => {
      const { variant, a, b, d, x0 } = exercise.data;
      const f: RealFn = variant === 2 ? (x) => (a * x + b) / (x + d) : cubicFromData(exercise.data);
      if (variant === 2) {
        expect(x0 + d).not.toBe(0); // x0 is in the domain
        expect(a * d - b).not.toBe(0); // f is not constant
      }
      if (variant === 1) expect(x0).not.toBe(0);
      expect(exercise.statement).toContain(`f'(${x0})`);
      expect(exercise.answers[0].value).toBeCloseTo(derivative(f, x0), 7);
    });
  });

  it('gen-calc-tangent-line', () => {
    forEachExercise('gen-calc-tangent-line', (exercise) => {
      const f = cubicFromData(exercise.data);
      const { x0 } = exercise.data;
      const [m, n] = exercise.answers.map((answer) => answer.value);
      const line = (x: number) => m * x + n;
      // the line passes through the point of tangency and has the slope of the graph there
      expect(line(x0)).toBeCloseTo(f(x0), 8);
      expect(m).toBeCloseTo(derivative(f, x0), 7);
      // tangency: f − line vanishes to second order at x0
      const gap = (delta: number) => Math.abs(f(x0 + delta) - line(x0 + delta)) / delta;
      expect(gap(1e-4)).toBeLessThan(1e-2);
    });
  });

  it('gen-calc-local-extrema', () => {
    forEachExercise('gen-calc-local-extrema', (exercise) => {
      const f = cubicFromData(exercise.data);
      const critical = criticalPoints(f, LO, HI);
      expect(critical).toHaveLength(2);
      const isMax = (x: number) => f(x) > f(x - 0.01) && f(x) > f(x + 0.01);
      const isMin = (x: number) => f(x) < f(x - 0.01) && f(x) < f(x + 0.01);
      const xMax = critical.find(isMax)!;
      const xMin = critical.find(isMin)!;
      expect(xMax).toBeDefined();
      expect(xMin).toBeDefined();
      const [ansXMax, ansYMax, ansXMin, ansYMin] = exercise.answers.map((answer) => answer.value);
      expect(ansXMax).toBeCloseTo(xMax, 8);
      expect(ansYMax).toBeCloseTo(f(xMax), 8);
      expect(ansXMin).toBeCloseTo(xMin, 8);
      expect(ansYMin).toBeCloseTo(f(xMin), 8);
    });
  });

  it('gen-calc-absolute-extrema', () => {
    forEachExercise('gen-calc-absolute-extrema', (exercise) => {
      const f = cubicFromData(exercise.data);
      const { left, right } = exercise.data;
      expect(left).toBeLessThan(right);
      const inner = criticalPoints(f, left, right);
      expect(inner.length).toBeGreaterThan(0); // the interval contains a critical point
      const values = [left, right, ...inner].map(f);
      const max = Math.max(...values);
      const min = Math.min(...values);
      // sanity: a dense grid never beats the candidates
      const grid = Array.from({ length: 2001 }, (_, i) => f(left + ((right - left) * i) / 2000));
      expect(Math.max(...grid)).toBeLessThanOrEqual(max + 1e-9);
      expect(Math.min(...grid)).toBeGreaterThanOrEqual(min - 1e-9);
      expect(exercise.answers[0].value).toBeCloseTo(max, 8);
      expect(exercise.answers[1].value).toBeCloseTo(min, 8);
    });
  });

  it('gen-calc-asymptotes', () => {
    forEachExercise('gen-calc-asymptotes', (exercise) => {
      const { a, b, c, d } = exercise.data;
      expect(c).not.toBe(0);
      expect(a * d - b * c).not.toBe(0); // not a constant function with a hole
      const f: RealFn = (x) => (a * x + b) / (c * x + d);
      // sign changes of f are roots or poles; a pole is where |f| explodes
      const poles = findRoots(f, LO, HI, 8000).filter((x) => Math.abs(f(x + 1e-7)) > 1e5);
      expect(poles).toHaveLength(1);
      expect(exercise.answers[0].value).toBeCloseTo(poles[0], 8);
      expect(exercise.answers[1].value).toBeCloseTo(f(1e10), 7);
      expect(exercise.answers[1].value).toBeCloseTo(f(-1e10), 7);
    });
  });

  it('gen-calc-inflection-cubic', () => {
    forEachExercise('gen-calc-inflection-cubic', (exercise) => {
      const f = cubicFromData(exercise.data);
      const second = (x: number) => secondDerivative(f, x);
      const roots = findRoots(second, LO, HI);
      expect(roots).toHaveLength(1);
      const xi = roots[0];
      expect(Math.sign(second(xi - 0.5))).toBe(-Math.sign(second(xi + 0.5))); // concavity changes
      expect(exercise.answers[0].value).toBeCloseTo(xi, 8);
      expect(exercise.answers[1].value).toBeCloseTo(f(xi), 7);
    });
  });

  it('gen-calc-antiderivative-point', () => {
    forEachExercise('gen-calc-antiderivative-point', (exercise) => {
      const { variant, e, a, b, c, k, x1, y1, xk } = exercise.data;
      // f' exactly as printed in the statement
      const fPrime: RealFn = variant === 0 ? (x) => 4 * e * x ** 3 + 3 * a * x ** 2 + 2 * b * x + c : (x) => 2 * a * x + b - k / (x * x);
      if (variant === 1) {
        expect(x1).toBeGreaterThan(0);
        expect(xk).toBeGreaterThan(0);
      }
      // f(x) = y1 + ∫_{x1}^{x} f'(t) dt (the graph passes through (x1, y1))
      const f = (x: number) => y1 + simpson(fPrime, x1, x);
      const [constant, valueAtK] = exercise.answers.map((answer) => answer.value);
      expect(valueAtK).toBeCloseTo(f(xk), 8);
      if (variant === 0) {
        expect(constant).toBeCloseTo(f(0), 8); // the free term of a polynomial is f(0)
      } else {
        // the free term C makes f(x) − C equal to the printed antiderivative a·x² + b·x + k/x
        for (const x of [1, 2, 3, 4]) expect(f(x) - constant).toBeCloseTo(a * x * x + b * x + k / x, 8);
      }
    });
  });

  it('gen-calc-area-parabola-axis', () => {
    forEachExercise('gen-calc-area-parabola-axis', (exercise) => {
      const { a, b, c } = exercise.data;
      const f: RealFn = (x) => a * x * x + b * x + c;
      const roots = findRoots(f, LO, HI, 8000);
      expect(roots).toHaveLength(2);
      const [x1, x2, integral, area] = exercise.answers.map((answer) => answer.value);
      expect(x1).toBeCloseTo(roots[0], 8);
      expect(x2).toBeCloseTo(roots[1], 8);
      expect(integral).toBeCloseTo(simpson(f, roots[0], roots[1]), 8);
      expect(area).toBeCloseTo(absoluteArea(f, roots[0], roots[1]), 8);
    });
  });

  it('gen-calc-area-parabola-line', () => {
    forEachExercise('gen-calc-area-parabola-line', (exercise) => {
      const { fa, fb, fc, m, n } = exercise.data;
      const f: RealFn = (x) => fa * x * x + fb * x + fc;
      const g: RealFn = (x) => m * x + n;
      const difference: RealFn = (x) => f(x) - g(x);
      const meet = findRoots(difference, LO, HI, 8000);
      expect(meet).toHaveLength(2);
      const [x1, x2, area] = exercise.answers.map((answer) => answer.value);
      expect(x1).toBeCloseTo(meet[0], 8);
      expect(x2).toBeCloseTo(meet[1], 8);
      expect(area).toBeCloseTo(absoluteArea(difference, meet[0], meet[1]), 8);
    });
  });

  it('gen-calc-max-rectangle', () => {
    forEachExercise('gen-calc-max-rectangle', (exercise) => {
      const { variant, a, c } = exercise.data;
      const f: RealFn = (x) => c - a * x * x;
      const end = Math.sqrt(c / a); // where the graph meets the x-axis
      // area of the rectangle whose vertex on the graph is (t, f(t))
      const area: RealFn = (t) => (variant === 0 ? 2 * t : t) * f(t);
      const critical = criticalPoints(area, 1e-6, end - 1e-6);
      expect(critical).toHaveLength(1);
      const best = critical[0];
      expect(f(best)).toBeGreaterThan(0); // the vertex is above the x-axis
      const grid = Array.from({ length: 1999 }, (_, i) => area((end * (i + 1)) / 2000));
      expect(Math.max(...grid)).toBeLessThanOrEqual(area(best) + 1e-9);
      expect(exercise.answers[0].value).toBeCloseTo(best, 8);
      expect(exercise.answers[1].value).toBeCloseTo(area(best), 8);
    });
  });
});
