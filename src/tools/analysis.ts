import { derivative, parse, type EvalFunction } from 'mathjs';

export interface CompiledFunction {
  f: (x: number) => number;
  df: (x: number) => number;
  ddf: (x: number) => number;
  derivativeText: string;
  secondDerivativeText: string;
}

function safe(fn: EvalFunction): (x: number) => number {
  return (x: number) => {
    try {
      const value = fn.evaluate({ x, e: Math.E, pi: Math.PI });
      return typeof value === 'number' && Number.isFinite(value) ? value : Number.NaN;
    } catch {
      return Number.NaN;
    }
  };
}

/** Normalizes student-style input: "ln" → log, "√" → sqrt, implicit "2x" handled by mathjs. */
export function normalizeExpression(input: string): string {
  return input
    .replace(/\bln\b/g, 'log')
    .replace(/√/g, 'sqrt')
    .replace(/π/g, 'pi')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/·/g, '*');
}

export function compileFunction(input: string): CompiledFunction {
  const node = parse(normalizeExpression(input));
  const first = derivative(node, 'x');
  const second = derivative(first, 'x');
  return {
    f: safe(node.compile()),
    df: safe(first.compile()),
    ddf: safe(second.compile()),
    derivativeText: first.toString().replace(/log\(/g, 'ln('),
    secondDerivativeText: second.toString().replace(/log\(/g, 'ln('),
  };
}

function signChanges(g: (x: number) => number, a: number, b: number, steps: number): number[] {
  const roots: number[] = [];
  const h = (b - a) / steps;
  let px = a;
  let py = g(px);
  for (let i = 1; i <= steps; i += 1) {
    const x = a + i * h;
    const y = g(x);
    if (Number.isFinite(py) && Number.isFinite(y) && Math.sign(py) !== Math.sign(y) && py !== 0) {
      let lo = px;
      let hi = x;
      let flo = py;
      for (let k = 0; k < 60; k += 1) {
        const mid = (lo + hi) / 2;
        const fm = g(mid);
        if (!Number.isFinite(fm)) break;
        if (Math.sign(fm) === Math.sign(flo)) {
          lo = mid;
          flo = fm;
        } else hi = mid;
      }
      roots.push((lo + hi) / 2);
    }
    px = x;
    py = y;
  }
  return roots;
}

export interface KeyPoint {
  x: number;
  y: number;
  kind: 'max' | 'min' | 'inflection' | 'root';
}

export function analyze(fn: CompiledFunction, a: number, b: number) {
  const steps = 1200;
  const points: KeyPoint[] = [];
  // Discard sign changes of f' / f'' that come from a pole (f jumps to infinity).
  const nearPole = (x: number) => !Number.isFinite(fn.f(x)) || Math.abs(fn.f(x)) > 1e6;
  for (const x of signChanges(fn.df, a, b, steps)) {
    if (nearPole(x)) continue;
    const left = fn.df(x - 1e-4);
    points.push({ x, y: fn.f(x), kind: left > 0 ? 'max' : 'min' });
  }
  for (const x of signChanges(fn.ddf, a, b, steps)) {
    if (nearPole(x)) continue;
    points.push({ x, y: fn.f(x), kind: 'inflection' });
  }
  for (const x of signChanges(fn.f, a, b, steps)) {
    if (Math.abs(fn.f(x)) < 1e-6) points.push({ x, y: 0, kind: 'root' });
  }
  // Vertical asymptotes: |f| blows up between neighbouring samples.
  const vertical: number[] = [];
  const h = (b - a) / steps;
  for (let i = 0; i < steps; i += 1) {
    const x0 = a + i * h;
    const mid = x0 + h / 2;
    const y = Math.abs(fn.f(mid));
    const near = Math.max(Math.abs(fn.f(mid - h * 2)), Math.abs(fn.f(mid + h * 2)));
    if ((y > 200 && y > near * 3) || (!Number.isFinite(fn.f(mid)) && Number.isFinite(fn.f(mid - h * 3)) && Number.isFinite(fn.f(mid + h * 3)))) {
      if (!vertical.some((v) => Math.abs(v - mid) < h * 6)) vertical.push(Math.round(mid * 1000) / 1000);
    }
  }
  // Horizontal asymptotes: f settles at ±∞.
  const horizontal: number[] = [];
  for (const far of [1e4, -1e4]) {
    const y1 = fn.f(far);
    const y2 = fn.f(far * 10);
    if (Number.isFinite(y1) && Number.isFinite(y2) && Math.abs(y1 - y2) < 1e-3 && Math.abs(y2) < 1e4) {
      const value = Math.round(y2 * 1000) / 1000;
      if (!horizontal.some((entry) => Math.abs(entry - value) < 1e-6)) horizontal.push(value);
    }
  }
  return { points, vertical, horizontal };
}
