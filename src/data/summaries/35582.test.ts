/**
 * Verification for the 35582 (807) topic summaries: every required topic has a summary,
 * size guidelines hold, and every worked-example number is recomputed independently
 * (coordinate models, numeric root finding / integration, mathjs complex arithmetic).
 */
import { complex, multiply, pow, type Complex } from 'mathjs';
import { describe, expect, it } from 'vitest';
import { summaries35582 } from './35582';
import { bisect, distance, findCriticalPoints, findInflectionPoints, findRoots, numericDerivative, simpson } from '../problems/verify';

const requiredTopics = ['vectors', 'solid-trigonometry', 'complex-numbers', 'analytic-geometry', 'exponential-logarithms', 'differential-integral'];
const deg = (rad: number) => (rad * 180) / Math.PI;
type V3 = [number, number, number];
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a: V3) => Math.sqrt(dot(a, a));
const angleDeg = (a: V3, b: V3) => deg(Math.acos(dot(a, b) / (norm(a) * norm(b))));

describe('35582 summaries – coverage', () => {
  it('has exactly one summary per required topic and none for growth-decay', () => {
    const ids = summaries35582.map((summary) => summary.topicId).sort();
    expect(ids).toEqual([...requiredTopics].sort());
    for (const summary of summaries35582) expect(summary.questionnaire).toBe('35582');
  });

  it('respects the size guidelines', () => {
    for (const summary of summaries35582) {
      const where = summary.topicId;
      expect(summary.keyPoints.length, `${where}.keyPoints`).toBeGreaterThanOrEqual(8);
      expect(summary.keyPoints.length, `${where}.keyPoints`).toBeLessThanOrEqual(14);
      expect(summary.formulas.length, `${where}.formulas`).toBeGreaterThanOrEqual(6);
      expect(summary.formulas.length, `${where}.formulas`).toBeLessThanOrEqual(15);
      expect(summary.bagrutPatterns.length, `${where}.bagrutPatterns`).toBeGreaterThanOrEqual(4);
      expect(summary.bagrutPatterns.length, `${where}.bagrutPatterns`).toBeLessThanOrEqual(8);
      expect(summary.commonMistakes.length, `${where}.commonMistakes`).toBeGreaterThanOrEqual(4);
      expect(summary.commonMistakes.length, `${where}.commonMistakes`).toBeLessThanOrEqual(8);
      expect(summary.workedExamples.length, `${where}.workedExamples`).toBeGreaterThanOrEqual(2);
      expect(summary.workedExamples.length, `${where}.workedExamples`).toBeLessThanOrEqual(3);
      for (const example of summary.workedExamples) {
        expect(example.steps.length, `${where}: ${example.title}`).toBeGreaterThanOrEqual(3);
        expect(example.steps.length, `${where}: ${example.title}`).toBeLessThanOrEqual(7);
      }
    }
  });

  it('vectors keyPoints quote all five theorems usable without proof', () => {
    const vectors = summaries35582.find((summary) => summary.topicId === 'vectors');
    const theorems = vectors?.keyPoints.find((point) => point.includes('ללא הוכחה')) ?? '';
    for (const label of ['(א)', '(ב)', '(ג)', '(ד)', '(ה)']) expect(theorems).toContain(label);
  });

  it('calculus summary embeds the function explorer', () => {
    expect(summaries35582.find((summary) => summary.topicId === 'differential-integral')?.tools).toContain('function-explorer');
  });
});

describe('vectors worked examples', () => {
  it('two lines intersect at (0,1,3) with a 60° angle', () => {
    const p1: V3 = [1, 2, 3], u: V3 = [1, 1, 0], p2: V3 = [1, 1, 4], v: V3 = [1, 0, 1];
    // Minimise the squared distance between the lines numerically (grid + refine on t, s).
    let best = { t: 0, s: 0, d: Infinity };
    for (let t = -5; t <= 5; t += 0.01) for (let s = -5; s <= 5; s += 0.01) {
      const d = norm(sub([p1[0] + t * u[0], p1[1] + t * u[1], p1[2] + t * u[2]], [p2[0] + s * v[0], p2[1] + s * v[1], p2[2] + s * v[2]]));
      if (d < best.d) best = { t, s, d };
    }
    expect(best.d).toBeLessThan(1e-6);
    expect(p1[0] + best.t * u[0]).toBeCloseTo(0, 6);
    expect(p1[1] + best.t * u[1]).toBeCloseTo(1, 6);
    expect(p1[2] + best.t * u[2]).toBeCloseTo(3, 6);
    expect(angleDeg(u, v)).toBeCloseTo(60, 9);
  });

  it('plane ABC, intersection (1,1,-1) and line–plane angle 60°', () => {
    const A: V3 = [1, 0, 0], B: V3 = [0, 2, 0], C: V3 = [0, 0, 2];
    const n: V3 = [2, 1, 1];
    expect(dot(n, sub(B, A))).toBe(0);
    expect(dot(n, sub(C, A))).toBe(0);
    const d = dot(n, A);
    const onPlane = (t: number) => dot(n, [3 + t, 1, 1 + t]) - d;
    const t = bisect(onPlane, -10, 10);
    expect([3 + t, 1, 1 + t][0]).toBeCloseTo(1, 9);
    expect(1 + t).toBeCloseTo(-1, 9);
    // angle between the line and its projection on the plane = 90° − angle to the normal
    expect(90 - angleDeg([1, 0, 1], n)).toBeCloseTo(60, 9);
  });

  it('M divides BC 1:2 and AM = √6', () => {
    const A: V3 = [1, 2, 3], B: V3 = [4, 2, -1], C: V3 = [-2, 5, 5];
    const M: V3 = [B[0] + (C[0] - B[0]) / 3, B[1] + (C[1] - B[1]) / 3, B[2] + (C[2] - B[2]) / 3];
    expect(norm(sub(M, B)) / norm(sub(C, M))).toBeCloseTo(0.5, 12);
    expect(M).toEqual([2, 3, 1]);
    expect(norm(sub(M, A))).toBeCloseTo(Math.sqrt(6), 12);
  });
});

describe('solid trigonometry worked examples', () => {
  it('square pyramid 6×6, height 4', () => {
    const S: V3 = [0, 0, 4], A: V3 = [-3, -3, 0], M: V3 = [3, 0, 0], O: V3 = [0, 0, 0];
    expect(angleDeg(sub(S, A), sub(O, A))).toBeCloseTo(43.31, 2);
    expect(angleDeg(sub(S, M), sub(O, M))).toBeCloseTo(53.13, 2);
    const slant = norm(sub(S, M));
    expect(4 * 0.5 * 6 * slant).toBeCloseTo(60, 9);
    expect((1 / 3) * 36 * 4).toBeCloseTo(48, 12);
  });

  it('box 4×3×12', () => {
    const A: V3 = [0, 0, 0], B: V3 = [4, 0, 0], C: V3 = [4, 3, 0], C1: V3 = [4, 3, 12];
    expect(norm(sub(C1, A))).toBeCloseTo(13, 12);
    expect(angleDeg(sub(C1, A), sub(C, A))).toBeCloseTo(67.38, 2);
    expect(dot(sub(A, B), sub(C1, B))).toBe(0);
    expect(angleDeg(sub(C1, A), sub(B, A))).toBeCloseTo(72.08, 2);
  });

  it('triangular prism with 5, 8, 60°', () => {
    const A: V3 = [0, 0, 0], B: V3 = [5, 0, 0], C: V3 = [8 * Math.cos(Math.PI / 3), 8 * Math.sin(Math.PI / 3), 0];
    const BC = norm(sub(C, B));
    expect(BC).toBeCloseTo(7, 12);
    const base = 0.5 * Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]));
    expect(base * 6).toBeCloseTo(103.92, 2);
    expect((5 + 8 + BC) * 6).toBeCloseTo(120, 10);
    const C1: V3 = [C[0], C[1], 6];
    expect(angleDeg(sub(C1, B), sub(C, B))).toBeCloseTo(40.6, 2);
  });
});

describe('complex numbers worked examples', () => {
  it('z² = −5+12i', () => {
    for (const z of [complex(2, 3), complex(-2, -3)]) {
      const square = pow(z, 2) as Complex;
      expect(square.re).toBeCloseTo(-5, 12);
      expect(square.im).toBeCloseTo(12, 12);
    }
  });

  it('(1+i√3)^10 by repeated multiplication', () => {
    let product: Complex = complex(1, 0);
    for (let k = 0; k < 10; k++) product = multiply(product, complex(1, Math.sqrt(3))) as Complex;
    expect(product.re).toBeCloseTo(-512, 8);
    expect(product.im).toBeCloseTo(-512 * Math.sqrt(3), 8);
  });

  it('roots of z³ = 8i form an equilateral triangle of area 3√3', () => {
    const roots = [complex(Math.sqrt(3), 1), complex(-Math.sqrt(3), 1), complex(0, -2)];
    for (const root of roots) {
      const cube = pow(root, 3) as Complex;
      expect(cube.re).toBeCloseTo(0, 10);
      expect(cube.im).toBeCloseTo(8, 10);
    }
    const [p, q, r] = roots;
    const sides = [distance(p.re, p.im, q.re, q.im), distance(q.re, q.im, r.re, r.im), distance(r.re, r.im, p.re, p.im)];
    for (const side of sides) expect(side).toBeCloseTo(2 * Math.sqrt(3), 12);
    const area = 0.5 * Math.abs((q.re - p.re) * (r.im - p.im) - (q.im - p.im) * (r.re - p.re));
    expect(area).toBeCloseTo(3 * Math.sqrt(3), 12);
  });
});

describe('analytic geometry worked examples', () => {
  it('circle centre/radius and tangent at (6,2)', () => {
    const circle = (x: number, y: number) => x * x + y * y - 6 * x + 4 * y - 12;
    expect(circle(6, 2)).toBe(0);
    // centre = where the gradient vanishes; radius = distance to a point on the circle
    const cx = 3, cy = -2;
    expect(2 * cx - 6).toBe(0);
    expect(2 * cy + 4).toBe(0);
    expect(distance(cx, cy, 6, 2)).toBeCloseTo(5, 12);
    // the tangent 3x+4y−26=0 meets the circle in exactly one point
    const onTangent = (x: number) => circle(x, (26 - 3 * x) / 4);
    expect(findRoots(onTangent, -20, 20, 40000).length).toBeLessThanOrEqual(1);
    expect(onTangent(6)).toBeCloseTo(0, 12);
    expect(onTangent(5.9)).toBeGreaterThan(0);
    expect(onTangent(6.1)).toBeGreaterThan(0);
  });

  it('ellipse foci and tangency at k = √34', () => {
    const a = 5, b = 3;
    const c = bisect((x) => distance(0, b, x, 0) + distance(0, b, -x, 0) - 2 * a, 0, 5);
    expect(c).toBeCloseTo(4, 10);
    const intersections = (k: number) => findRoots((x) => (x * x) / 25 + ((x + k) ** 2) / 9 - 1, -6, 6, 20000).length;
    expect(intersections(5.8)).toBe(2);
    expect(intersections(5.9)).toBe(0);
    const k = bisect((kk) => {
      const minValue = Math.min(...Array.from({ length: 20001 }, (_, i) => -6 + (12 * i) / 20000).map((x) => (x * x) / 25 + ((x + kk) ** 2) / 9 - 1));
      return minValue;
    }, 5, 6, 1e-6);
    expect(k).toBeCloseTo(Math.sqrt(34), 3);
    const x0 = -25 / Math.sqrt(34), y0 = 9 / Math.sqrt(34);
    expect((x0 * x0) / 25 + (y0 * y0) / 9).toBeCloseTo(1, 12);
    expect(y0 - x0).toBeCloseTo(Math.sqrt(34), 12);
  });

  it('locus of midpoints is the circle centred (4,0) with radius 2', () => {
    for (let k = 0; k < 24; k++) {
      const angle = (k * Math.PI) / 12;
      const P = [4 * Math.cos(angle), 4 * Math.sin(angle)];
      const M = [(P[0] + 8) / 2, P[1] / 2];
      expect(distance(M[0], M[1], 4, 0)).toBeCloseTo(2, 12);
    }
  });
});

describe('exponential & logarithm worked examples', () => {
  it('e^{2x} − 5e^x + 6 = 0 has roots ln 2, ln 3', () => {
    const roots = findRoots((x) => Math.exp(2 * x) - 5 * Math.exp(x) + 6, -5, 5);
    expect(roots.length).toBe(2);
    expect(roots[0]).toBeCloseTo(Math.log(2), 9);
    expect(roots[1]).toBeCloseTo(Math.log(3), 9);
  });

  it('ln x + ln(x−2) = ln 3 has the single root 3', () => {
    const roots = findRoots((x) => Math.log(x) + Math.log(x - 2) - Math.log(3), 2.0001, 20);
    expect(roots.length).toBe(1);
    expect(roots[0]).toBeCloseTo(3, 9);
  });

  it('e^x + 2e^{−x} > 3 changes truth at 0 and ln 2', () => {
    const g = (x: number) => Math.exp(x) + 2 * Math.exp(-x) - 3;
    const roots = findRoots(g, -5, 5);
    expect(roots[0]).toBeCloseTo(0, 9);
    expect(roots[1]).toBeCloseTo(Math.log(2), 9);
    expect(g(-1)).toBeGreaterThan(0);
    expect(g(0.3)).toBeLessThan(0);
    expect(g(2)).toBeGreaterThan(0);
  });
});

describe('calculus worked examples', () => {
  const f = (x: number) => x * Math.exp(-x);

  it('x·e^{−x}: max at (1, 1/e), inflection at (2, 2/e²), tangent slope 1 at 0', () => {
    const critical = findCriticalPoints(f, -3, 10);
    expect(critical.length).toBe(1);
    expect(critical[0]).toBeCloseTo(1, 5);
    expect(f(critical[0])).toBeCloseTo(0.36787944117, 9);
    const inflection = findInflectionPoints(f, -3, 10);
    expect(inflection.length).toBe(1);
    expect(inflection[0]).toBeCloseTo(2, 3);
    expect(f(2)).toBeCloseTo(0.27067056647, 10);
    expect(numericDerivative(f, 0)).toBeCloseTo(1, 8);
    expect(f(50)).toBeLessThan(1e-15);
  });

  it('area under ln x from 1 to e is 1, and G′ = ln x', () => {
    expect(simpson(Math.log, 1, Math.E)).toBeCloseTo(1, 9);
    const G = (x: number) => x * Math.log(x) - x;
    for (const x of [0.5, 1, 2, 5]) expect(numericDerivative(G, x)).toBeCloseTo(Math.log(x), 6);
  });

  it('area between e^x and e^{2−x} from the y-axis is (e−1)²', () => {
    const meet = bisect((x) => Math.exp(x) - Math.exp(2 - x), -5, 5);
    expect(meet).toBeCloseTo(1, 10);
    expect(simpson((x) => Math.exp(2 - x) - Math.exp(x), 0, meet)).toBeCloseTo(2.952492442012559, 9);
  });
});
