/**
 * Independent numeric helpers used by the problem-bank verification tests.
 * They deliberately avoid the closed-form answers written in the problems, so that a test
 * recomputes each numeric answer from first principles (numeric integration, root finding, counting).
 */
import { evaluate } from 'mathjs';

export type RealFn = (x: number) => number;

/** Evaluate a mathjs expression in x (or with a scope), e.g. fn('x^3-6x^2+9x+2'). */
export function fn(expression: string, variable = 'x'): RealFn {
  return (x: number) => Number(evaluate(expression, { [variable]: x }));
}

export function evalExpr(expression: string, scope: Record<string, number> = {}): number {
  return Number(evaluate(expression, scope));
}

/** Composite Simpson's rule on [a, b]. */
export function simpson(f: RealFn, a: number, b: number, n = 2000): number {
  const m = n % 2 === 0 ? n : n + 1;
  const h = (b - a) / m;
  let sum = f(a) + f(b);
  for (let i = 1; i < m; i += 1) {
    const x = a + i * h;
    sum += (i % 2 === 0 ? 2 : 4) * f(x);
  }
  return (sum * h) / 3;
}

/** Area between the graph of f and the x-axis on [a, b] (integral of |f|). */
export function absoluteArea(f: RealFn, a: number, b: number, n = 4000): number {
  return simpson((x) => Math.abs(f(x)), a, b, n);
}

/** Central-difference derivative. */
export function numericDerivative(f: RealFn, x: number, h = 1e-5): number {
  return (f(x + h) - f(x - h)) / (2 * h);
}

/** Bisection root finding; requires a sign change on [a, b]. */
export function bisect(f: RealFn, a: number, b: number, tolerance = 1e-12, maxIterations = 300): number {
  let lo = a;
  let hi = b;
  let flo = f(lo);
  if (flo === 0) return lo;
  if (f(hi) === 0) return hi;
  if (Math.sign(flo) === Math.sign(f(hi))) throw new Error(`bisect: no sign change on [${a}, ${b}]`);
  for (let i = 0; i < maxIterations && hi - lo > tolerance; i += 1) {
    const mid = (lo + hi) / 2;
    const fmid = f(mid);
    if (fmid === 0) return mid;
    if (Math.sign(fmid) === Math.sign(flo)) {
      lo = mid;
      flo = fmid;
    } else {
      hi = mid;
    }
  }
  return (lo + hi) / 2;
}

/** All roots of f on [a, b] found by scanning for sign changes (ignores tangential roots). */
export function findRoots(f: RealFn, a: number, b: number, steps = 4000): number[] {
  const roots: number[] = [];
  const h = (b - a) / steps;
  let prevX = a;
  let prevY = f(prevX);
  for (let i = 1; i <= steps; i += 1) {
    const x = a + i * h;
    const y = f(x);
    if (Number.isFinite(prevY) && Number.isFinite(y)) {
      if (prevY === 0) roots.push(prevX);
      else if (Math.sign(prevY) !== Math.sign(y)) roots.push(bisect(f, prevX, x));
    }
    prevX = x;
    prevY = y;
  }
  return dedupe(roots);
}

/** x-values on [a, b] where f' changes sign (local extrema candidates), found numerically. */
export function findCriticalPoints(f: RealFn, a: number, b: number, steps = 4000): number[] {
  return findRoots((x) => numericDerivative(f, x), a, b, steps);
}

/** x-values on [a, b] where f'' changes sign (inflection candidates). */
export function findInflectionPoints(f: RealFn, a: number, b: number, steps = 4000): number[] {
  return findRoots((x) => numericDerivative((t) => numericDerivative(f, t), x), a, b, steps);
}

export function nCr(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let result = 1;
  for (let i = 1; i <= k; i += 1) result = (result * (n - k + i)) / i;
  return Math.round(result);
}

/** Binomial probability P(X = k) for X ~ Bin(n, p). */
export function binomialPmf(n: number, k: number, p: number): number {
  return nCr(n, k) * p ** k * (1 - p) ** (n - k);
}

/** P(a <= X <= b) for X ~ Bin(n, p). */
export function binomialRange(n: number, a: number, b: number, p: number): number {
  let total = 0;
  for (let k = a; k <= b; k += 1) total += binomialPmf(n, k, p);
  return total;
}

export function solveQuadratic(a: number, b: number, c: number): number[] {
  const d = b * b - 4 * a * c;
  if (d < 0) return [];
  if (d === 0) return [-b / (2 * a)];
  const s = Math.sqrt(d);
  return [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort((p, q) => p - q);
}

export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.hypot(x2 - x1, y2 - y1);
}

export function degreesToRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radiansToDegrees(rad: number): number {
  return (rad * 180) / Math.PI;
}

/** Enumerate every outcome of a finite product space and sum probabilities of those matching `predicate`. */
export function enumerateProbability<T>(spaces: Array<Array<[T, number]>>, predicate: (outcome: T[]) => boolean): number {
  let total = 0;
  const walk = (index: number, outcome: T[], probability: number) => {
    if (index === spaces.length) {
      if (predicate(outcome)) total += probability;
      return;
    }
    for (const [value, p] of spaces[index]) walk(index + 1, [...outcome, value], probability * p);
  };
  walk(0, [], 1);
  return total;
}

function dedupe(values: number[], epsilon = 1e-7): number[] {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted.filter((value, index) => index === 0 || Math.abs(value - sorted[index - 1]) > epsilon);
}
