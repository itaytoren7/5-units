/**
 * Independent numeric verification of the 35582 problem bank.
 * Each test recomputes a section's numericAnswer from first principles (complex arithmetic with mathjs,
 * brute-force searches, shoelace areas, numeric root finding / differentiation / Simpson integration).
 */
import { abs, add, arg, complex, divide, multiply, pow, type Complex } from 'mathjs';
import { describe, expect, it } from 'vitest';
import { problems35582 } from './35582';
import { absoluteArea, bisect, findCriticalPoints, findInflectionPoints, findRoots, numericDerivative, simpson } from './verify';

const TOL = 1e-6;

function answer(sectionId: string): number {
  for (const problem of problems35582) {
    const section = problem.sections.find((item) => item.id === sectionId);
    if (section) {
      if (section.numericAnswer === undefined) throw new Error(`${sectionId} has no numericAnswer`);
      return section.numericAnswer;
    }
  }
  throw new Error(`Unknown section ${sectionId}`);
}

const c = (re: number, im: number): Complex => complex(re, im);
const cpow = (z: Complex, n: number): Complex => pow(z, n) as Complex;
const cmul = (a: Complex, b: Complex): Complex => multiply(a, b) as Complex;

/** Shoelace area of a polygon whose vertices are sorted by angle around the origin. */
function polygonArea(points: Complex[]): number {
  const sorted = [...points].sort((p, q) => Math.atan2(p.im, p.re) - Math.atan2(q.im, q.re));
  let twice = 0;
  for (let i = 0; i < sorted.length; i += 1) {
    const p = sorted[i];
    const q = sorted[(i + 1) % sorted.length];
    twice += p.re * q.im - q.re * p.im;
  }
  return Math.abs(twice) / 2;
}

/** All roots of z^n = w found by Newton's method from many starting points on a circle. */
function nthRootsNumeric(n: number, w: Complex): Complex[] {
  const found: Complex[] = [];
  const radius = Math.pow(abs(w) as unknown as number, 1 / n);
  for (let s = 0; s < 8 * n; s += 1) {
    const t = (2 * Math.PI * (s + 0.37)) / (8 * n);
    let z = c(radius * 1.1 * Math.cos(t), radius * 1.1 * Math.sin(t));
    for (let k = 0; k < 100; k += 1) {
      const fz = add(cpow(z, n), multiply(w, -1)) as Complex;
      const dfz = multiply(n, cpow(z, n - 1)) as Complex;
      const dz = divide(fz, dfz) as Complex;
      z = c(z.re - dz.re, z.im - dz.im);
    }
    if (!found.some((r) => Math.hypot(r.re - z.re, r.im - z.im) < 1e-6)) found.push(z);
  }
  return found;
}

describe('35582 problem bank structure', () => {
  it.each([3, 4, 5])('slot %i has exactly 3 problems with 3–4 sections each', (slot) => {
    const slotProblems = problems35582.filter((problem) => problem.slot === slot);
    expect(slotProblems).toHaveLength(3);
    for (const problem of slotProblems) {
      expect(problem.sections.length).toBeGreaterThanOrEqual(3);
      expect(problem.sections.length).toBeLessThanOrEqual(4);
      expect(problem.estimatedMinutes).toBeGreaterThanOrEqual(25);
      expect(problem.estimatedMinutes).toBeLessThanOrEqual(35);
    }
    expect(slotProblems.map((problem) => problem.difficulty).sort()).toContain(3);
    expect(slotProblems.map((problem) => problem.difficulty)).toContain(2);
  });
});

describe('35582 slot 3 – complex numbers', () => {
  // z solves 3z + i·conj(z) = -4+4i; the map is R-linear, so solve the 2x2 system built from its action on 1 and i.
  const map = (z: Complex): Complex => add(multiply(3, z), cmul(c(0, 1), c(z.re, -z.im))) as Complex;
  const e1 = map(c(1, 0));
  const e2 = map(c(0, 1));
  const det = e1.re * e2.im - e2.re * e1.im;
  const x = (-4 * e2.im - e2.re * 4) / det;
  const y = (e1.re * 4 - -4 * e1.im) / det;
  const z = c(x, y);

  it('35582-3-1-a/b: z = -2+2i, |z| = 2√2, arg = 135°', () => {
    expect(map(z).re).toBeCloseTo(-4, 10);
    expect(map(z).im).toBeCloseTo(4, 10);
    expect(z.re).toBeCloseTo(-2, 10);
    expect(z.im).toBeCloseTo(2, 10);
    expect(abs(z) as unknown as number).toBeCloseTo(Math.sqrt(8), 10);
    expect(((arg(z) as number) * 180) / Math.PI).toBeCloseTo(135, 8);
  });

  it('35582-3-1-c: smallest n with z^n real positive', () => {
    let n = 1;
    while (n < 100) {
      const p = cpow(z, n);
      if (Math.abs(p.im) < 1e-6 * Math.max(1, Math.abs(p.re)) && p.re > 0) break;
      n += 1;
    }
    expect(n).toBe(answer('35582-3-1-c'));
    expect(cpow(z, n).re).toBeCloseTo(4096, 6);
  });

  it('35582-3-1-d: area of triangle z, conj(z), z^2', () => {
    const pts = [z, c(z.re, -z.im), cpow(z, 2)];
    const [a, b, d] = pts;
    const area = Math.abs((b.re - a.re) * (d.im - a.im) - (d.re - a.re) * (b.im - a.im)) / 2;
    expect(area).toBeCloseTo(answer('35582-3-1-d'), 9);
  });

  it('35582-3-2-a: (√3+i)^6', () => {
    let p = c(1, 0);
    for (let k = 0; k < 6; k += 1) p = cmul(p, c(Math.sqrt(3), 1));
    expect(p.re).toBeCloseTo(answer('35582-3-2-a'), 9);
    expect(p.im).toBeCloseTo(0, 9);
  });

  it('35582-3-2-c: area of the hexagon of roots of z^6 = -64', () => {
    const roots = nthRootsNumeric(6, c(-64, 0));
    expect(roots).toHaveLength(6);
    expect(Math.abs(polygonArea(roots) - answer('35582-3-2-c'))).toBeLessThan(TOL);
  });

  it('35582-3-2-d: triangle of the roots satisfying z^3 = 8i', () => {
    const roots = nthRootsNumeric(6, c(-64, 0)).filter((r) => {
      const cube = cpow(r, 3);
      return Math.abs(cube.re) < 1e-6 && Math.abs(cube.im - 8) < 1e-6;
    });
    expect(roots).toHaveLength(3);
    expect(Math.abs(polygonArea(roots) - answer('35582-3-2-d'))).toBeLessThan(TOL);
  });

  const deg = Math.PI / 180;
  const w = c(Math.cos(40 * deg), Math.sin(40 * deg));

  it('35582-3-3-a: z^9 = 1 and 1+z+…+z^8 = 0 (direct summation)', () => {
    const z9 = cpow(w, 9);
    expect(z9.re).toBeCloseTo(1, 10);
    expect(z9.im).toBeCloseTo(0, 10);
    let sum = c(0, 0);
    for (let k = 0; k <= 8; k += 1) sum = add(sum, cpow(w, k)) as Complex;
    expect(abs(sum) as unknown as number).toBeLessThan(1e-10);
  });

  it('35582-3-3-b: cos40+cos80+cos120+cos160', () => {
    const value = [40, 80, 120, 160].reduce((s, t) => s + Math.cos(t * deg), 0);
    expect(value).toBeCloseTo(answer('35582-3-3-b'), 10);
  });

  it('35582-3-3-c: smallest n with (1+z)^n real negative', () => {
    const u = add(c(1, 0), w) as Complex;
    expect(abs(u) as unknown as number).toBeCloseTo(2 * Math.cos(20 * deg), 10);
    expect(((arg(u) as number) * 180) / Math.PI).toBeCloseTo(20, 8);
    let n = 1;
    while (n < 100) {
      const p = cpow(u, n);
      if (Math.abs(p.im) < 1e-9 * Math.abs(p.re) && p.re < 0) break;
      n += 1;
    }
    expect(n).toBe(answer('35582-3-3-c'));
  });

  it('35582-3-3-d: area of the regular 9-gon of the powers of z', () => {
    const pts = Array.from({ length: 9 }, (_, k) => cpow(w, k));
    expect(Math.abs(polygonArea(pts) - answer('35582-3-3-d'))).toBeLessThan(TOL);
  });
});

describe('35582 slot 4 – exponential functions', () => {
  const f1 = (x: number) => (x - 1) * Math.exp(x);
  it('35582-4-1-b: minimum value of (x-1)e^x', () => {
    const crit = findCriticalPoints(f1, -5, 5);
    expect(crit).toHaveLength(1);
    expect(f1(crit[0])).toBeCloseTo(answer('35582-4-1-b'), 8);
  });
  it('35582-4-1-c: inflection at x=-1 and tangent at (1,0) has slope e', () => {
    const infl = findInflectionPoints(f1, -5, 3);
    expect(infl).toHaveLength(1);
    expect(infl[0]).toBeCloseTo(-1, 4);
    expect(numericDerivative(f1, 1)).toBeCloseTo(Math.E, 6);
  });
  it('35582-4-1-d: area between (x-1)e^x and the axes', () => {
    const root = bisect(f1, 0.5, 2);
    expect(absoluteArea(f1, 0, root)).toBeCloseTo(answer('35582-4-1-d'), 8);
  });

  const f2 = (x: number) => Math.exp(2 * x) - 4 * Math.exp(x);
  it('35582-4-2-b: minimum value of e^{2x}-4e^x', () => {
    const crit = findCriticalPoints(f2, -5, 3);
    expect(crit).toHaveLength(1);
    expect(f2(crit[0])).toBeCloseTo(answer('35582-4-2-b'), 8);
    expect(findInflectionPoints(f2, -5, 3)[0]).toBeCloseTo(0, 4);
  });
  it('35582-4-2-c: area between e^{2x}-4e^x and the axes', () => {
    const roots = findRoots(f2, -5, 3);
    expect(roots).toHaveLength(1);
    expect(absoluteArea(f2, 0, roots[0])).toBeCloseTo(answer('35582-4-2-c'), 8);
  });
  it('35582-4-2-d: area between f and f\' on [0, ln2]', () => {
    const fp = (x: number) => numericDerivative(f2, x);
    const xEnd = findCriticalPoints(f2, -5, 3)[0];
    expect(findRoots((x) => fp(x) - f2(x), -10, 3)).toHaveLength(0);
    expect(absoluteArea((x) => fp(x) - f2(x), 0, xEnd)).toBeCloseTo(answer('35582-4-2-d'), 6);
  });

  const f3 = (x: number) => Math.exp(x) / (x + 1);
  it('35582-4-3-b: local minimum value of e^x/(x+1)', () => {
    const crit = findCriticalPoints(f3, -0.9, 5);
    expect(crit).toHaveLength(1);
    expect(f3(crit[0])).toBeCloseTo(answer('35582-4-3-b'), 8);
    expect(findCriticalPoints(f3, -10, -1.1)).toHaveLength(0);
  });
  it('35582-4-3-d: area under the graph of f\' on [0, 1]', () => {
    const fp = (x: number) => numericDerivative(f3, x);
    const zero = findRoots(fp, -0.5, 1);
    expect(zero).toHaveLength(1);
    expect(absoluteArea(fp, zero[0], 1)).toBeCloseTo(answer('35582-4-3-d'), 6);
  });
});

describe('35582 slot 5 – logarithmic functions', () => {
  const f1 = (x: number) => x - 2 * Math.log(x);
  it('35582-5-1-a: minimum value of x-2ln x (and f>0)', () => {
    const crit = findCriticalPoints(f1, 0.01, 20);
    expect(crit).toHaveLength(1);
    expect(f1(crit[0])).toBeCloseTo(answer('35582-5-1-a'), 8);
    expect(findRoots(f1, 0.001, 50)).toHaveLength(0);
  });
  it('35582-5-1-d: area between x-2ln x, its tangent at x=1, and x=e', () => {
    const m = numericDerivative(f1, 1);
    const tangent = (x: number) => f1(1) + m * (x - 1);
    expect(absoluteArea((x) => f1(x) - tangent(x), 1, Math.E)).toBeCloseTo(answer('35582-5-1-d'), 6);
  });

  const f2 = (x: number) => Math.log(x) / x;
  it('35582-5-2-b: maximum value of ln x / x', () => {
    const crit = findCriticalPoints(f2, 0.1, 30);
    expect(crit).toHaveLength(1);
    expect(f2(crit[0])).toBeCloseTo(answer('35582-5-2-b'), 8);
  });
  it('35582-5-2-c: inflection x of ln x / x', () => {
    const infl = findInflectionPoints(f2, 0.5, 30);
    expect(infl).toHaveLength(1);
    expect(infl[0]).toBeCloseTo(answer('35582-5-2-c'), 3);
  });
  it('35582-5-2-d: area under ln x / x from its root to e^2', () => {
    const root = bisect(f2, 0.5, 2);
    expect(absoluteArea(f2, root, Math.exp(2))).toBeCloseTo(answer('35582-5-2-d'), 8);
  });

  const f3 = (x: number) => Math.log(x) ** 2 - 2 * Math.log(x);
  it('35582-5-3-a: minimum value of (ln x)^2 - 2 ln x', () => {
    const crit = findCriticalPoints(f3, 0.05, 30);
    expect(crit).toHaveLength(1);
    expect(f3(crit[0])).toBeCloseTo(answer('35582-5-3-a'), 8);
  });
  it('35582-5-3-b: inflection point lies on the x-axis', () => {
    const infl = findInflectionPoints(f3, 0.5, 30);
    expect(infl).toHaveLength(1);
    expect(f3(infl[0])).toBeCloseTo(0, 4);
  });
  it('35582-5-3-c: area between (ln x)^2 - 2 ln x and the x-axis', () => {
    const roots = findRoots(f3, 0.05, 30);
    expect(roots).toHaveLength(2);
    expect(absoluteArea(f3, roots[0], roots[1])).toBeCloseTo(answer('35582-5-3-c'), 8);
  });
  it('35582-5-3-d: area between f\' , the x-axis and x=1', () => {
    const fp = (x: number) => numericDerivative(f3, x);
    const zero = findRoots(fp, 0.5, 10);
    expect(zero).toHaveLength(1);
    expect(simpson((x) => -fp(x), 1, zero[0])).toBeCloseTo(answer('35582-5-3-d'), 6);
  });
});
