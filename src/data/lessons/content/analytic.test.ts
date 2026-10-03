/**
 * Independent numeric verification of the analytic-geometry lessons (מבוא לגאומטריה אנליטית).
 * Every exercise with `answers` is rebuilt as a concrete coordinate model. Values are recomputed with generic
 * tools – distances, Cramer's rule for line intersections, shoelace areas, dot products for perpendicularity,
 * numeric root finding for unknown parameters, numeric minimisation / differentiation for circles and tangents –
 * never by re-evaluating the closed forms written in the solutions. Each test also checks the givens of the model.
 */
import { lusolve } from 'mathjs';
import { describe, expect, it } from 'vitest';
import { analyticContent } from './analytic';
import { bisect, distance, findRoots, numericDerivative } from '../../problems/verify';

type Pt = [number, number];
/** The line a·x + b·y = c. */
interface Line {
  a: number;
  b: number;
  c: number;
}

const ex = (id: string) => Object.values(analyticContent).flatMap((lesson) => lesson.exercises).find((e) => e.id === id)!;

function expectAnswers(id: string, computed: number[], digits = 9) {
  const given = (ex(id).answers ?? []).map((answer) => answer.value);
  expect(given.length, `${id}: number of answers`).toBe(computed.length);
  computed.forEach((value, index) => expect(given[index], `${id}: answer ${index + 1}`).toBeCloseTo(value, digits));
}

const len = (p: Pt, q: Pt) => distance(p[0], p[1], q[0], q[1]);
const mid = (p: Pt, q: Pt): Pt => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const vec = (p: Pt, q: Pt): Pt => [q[0] - p[0], q[1] - p[1]];
const dot = (u: Pt, v: Pt) => u[0] * v[0] + u[1] * v[1];
const cross = (u: Pt, v: Pt) => u[0] * v[1] - u[1] * v[0];

/** Line through two points, in the form a·x + b·y = c (works for vertical lines too). */
function through(p: Pt, q: Pt): Line {
  const a = q[1] - p[1];
  const b = p[0] - q[0];
  return { a, b, c: a * p[0] + b * p[1] };
}

/** y = m·x + n as a Line. */
const explicit = (m: number, n: number): Line => ({ a: -m, b: 1, c: n });

/** Intersection of two lines by Cramer's rule. */
function meet(l1: Line, l2: Line): Pt {
  const det = l1.a * l2.b - l2.a * l1.b;
  expect(Math.abs(det), 'lines are not parallel').toBeGreaterThan(1e-12);
  return [(l1.c * l2.b - l2.c * l1.b) / det, (l1.a * l2.c - l2.a * l1.c) / det];
}

/** The line through p perpendicular to the direction d. */
function perpendicularThrough(p: Pt, d: Pt): Line {
  return { a: d[0], b: d[1], c: d[0] * p[0] + d[1] * p[1] };
}

/** The line through p parallel to the direction d. */
function parallelThrough(p: Pt, d: Pt): Line {
  return through(p, [p[0] + d[0], p[1] + d[1]]);
}

/** Slope and y-intercept of a (non-vertical) line. */
function slopeIntercept(l: Line): [number, number] {
  expect(Math.abs(l.b), 'line is not vertical').toBeGreaterThan(1e-12);
  return [-l.a / l.b, l.c / l.b];
}

const onLine = (p: Pt, l: Line) => Math.abs(l.a * p[0] + l.b * p[1] - l.c) < 1e-9;

function shoelace(points: Pt[]): number {
  let sum = 0;
  points.forEach((p, index) => {
    const q = points[(index + 1) % points.length];
    sum += p[0] * q[1] - q[0] * p[1];
  });
  return Math.abs(sum) / 2;
}

/** Point equidistant from three points: solves |X−p|² = |X−q|² = |X−r|² as a linear system. */
function circumcenter(p: Pt, q: Pt, r: Pt): Pt {
  const row = (u: Pt, v: Pt): Line => ({ a: 2 * (v[0] - u[0]), b: 2 * (v[1] - u[1]), c: v[0] ** 2 + v[1] ** 2 - u[0] ** 2 - u[1] ** 2 });
  return meet(row(p, q), row(q, r));
}

/** Minimiser of a smooth convex function of one variable on [a, b] (zero of the numeric derivative). */
function argmin(f: (t: number) => number, a: number, b: number): number {
  return bisect((t) => numericDerivative(f, t, 1e-6), a, b, 1e-12);
}

/** Centre and radius of the curve F(x, y) = 0 for F = x² + y² + …: the centre minimises F and R² = −F(centre). */
function circleOf(F: (x: number, y: number) => number): { center: Pt; r: number } {
  const cx = argmin((x) => F(x, 0), -100, 100);
  const cy = argmin((y) => F(cx, y), -100, 100);
  const r2 = -F(cx, cy);
  expect(r2, 'the equation describes a circle').toBeGreaterThan(0);
  return { center: [cx, cy], r: Math.sqrt(r2) };
}

/** Tangent direction of the circle with centre c through the point p, by differentiating the parametrisation numerically. */
function tangentSlopeAt(center: Pt, p: Pt): number {
  const r = len(center, p);
  const t0 = Math.atan2(p[1] - center[1], p[0] - center[0]);
  const dx = numericDerivative((t) => center[0] + r * Math.cos(t), t0);
  const dy = numericDerivative((t) => center[1] + r * Math.sin(t), t0);
  return dy / dx;
}

describe('ag-distance', () => {
  it('ag-distance-1', () => {
    expectAnswers('ag-distance-1', [len([-2, 3], [4, 11])]);
  });

  it('ag-distance-2', () => {
    const P: Pt = [-6, 8];
    const Q: Pt = [-6, -1];
    expectAnswers('ag-distance-2', [len([0, 0], P), len(P, Q)]);
  });

  it('ag-distance-3', () => {
    const [A, B, C]: Pt[] = [[1, 1], [7, 3], [3, 7]];
    expect(len(A, B)).toBeCloseTo(len(A, C), 12);
    expect(Math.abs(len(B, C) - len(A, B))).toBeGreaterThan(0.1);
    expectAnswers('ag-distance-3', [len(A, B) + len(B, C) + len(C, A)]);
  });

  it('ag-distance-4', () => {
    const [A, B, C]: Pt[] = [[-1, 2], [3, 4], [1, 8]];
    expect(dot(vec(B, A), vec(B, C))).toBeCloseTo(0, 12);
    expectAnswers('ag-distance-4', [shoelace([A, B, C])]);
  });

  it('ag-distance-5', () => {
    const roots = findRoots((k) => len([2, -1], [k, 5]) - 10, -50, 50);
    expect(roots.length).toBe(2);
    expectAnswers('ag-distance-5', [roots[1], roots[0]]);
  });

  it('ag-distance-6', () => {
    const A: Pt = [1, 6];
    const B: Pt = [9, 2];
    const roots = findRoots((x) => len([x, 0], A) - len([x, 0], B), -50, 50);
    expect(roots.length).toBe(1);
    const P: Pt = [roots[0], 0];
    expectAnswers('ag-distance-6', [P[0], len(P, A)]);
  });

  it('ag-distance-7', () => {
    const A: Pt = [1, 2];
    const B: Pt = [5, 2];
    const c = bisect((t) => len(A, [3, t]) - len(A, B), 2, 20);
    const C: Pt = [3, c];
    expect(len(B, C)).toBeCloseTo(len(A, B), 9);
    expectAnswers('ag-distance-7', [c, shoelace([A, B, C])]);
  });

  it('ag-distance-8', () => {
    const [A, B, C, D]: Pt[] = [[-2, 1], [1, 5], [6, 5], [3, 1]];
    for (const [p, q] of [[A, B], [B, C], [C, D], [D, A]] as Array<[Pt, Pt]>) expect(len(p, q)).toBeCloseTo(5, 12);
    expectAnswers('ag-distance-8', [len(A, C), len(B, D), shoelace([A, B, C, D])]);
  });
});

describe('ag-midpoint', () => {
  it('ag-midpoint-1', () => {
    const A: Pt = [-3, 7];
    const B: Pt = [5, -1];
    const M = mid(A, B);
    expect(len(A, M)).toBeCloseTo(len(M, B), 12);
    expect(cross(vec(A, M), vec(A, B))).toBeCloseTo(0, 12);
    expectAnswers('ag-midpoint-1', M);
  });

  it('ag-midpoint-2', () => {
    const A: Pt = [-4, 3];
    const M: Pt = [2, -1];
    const B: Pt = [M[0] + (M[0] - A[0]), M[1] + (M[1] - A[1])];
    expect(mid(A, B)).toEqual(M);
    expectAnswers('ag-midpoint-2', B);
  });

  it('ag-midpoint-3', () => {
    const [A, B, C]: Pt[] = [[1, 2], [7, 4], [3, 10]];
    const M = mid(A, B);
    expectAnswers('ag-midpoint-3', [M[0], M[1], len(C, M)]);
  });

  it('ag-midpoint-4', () => {
    const [A, B, C]: Pt[] = [[-2, 1], [3, 2], [5, 6]];
    const D: Pt = [A[0] + vec(B, C)[0], A[1] + vec(B, C)[1]];
    expect(mid(A, C)).toEqual(mid(B, D));
    expect(cross(vec(A, B), vec(D, C))).toBeCloseTo(0, 12);
    expectAnswers('ag-midpoint-4', D);
  });

  it('ag-midpoint-5', () => {
    const M: Pt = [4, 1];
    // A = (a, 0) and B = (0, b) with midpoint M: search a, b numerically
    const a = bisect((t) => (t + 0) / 2 - M[0], -100, 100);
    const b = bisect((t) => (0 + t) / 2 - M[1], -100, 100);
    expect(mid([a, 0], [0, b])[0]).toBeCloseTo(M[0], 9);
    expect(mid([a, 0], [0, b])[1]).toBeCloseTo(M[1], 9);
    expectAnswers('ag-midpoint-5', [a, b, len([a, 0], [0, b])]);
  });

  it('ag-midpoint-6', () => {
    const [A, B, C]: Pt[] = [[-1, 5], [-3, -1], [7, 1]];
    const D = mid(A, B);
    const E = mid(A, C);
    expect(len(D, E)).toBeCloseTo(len(B, C) / 2, 12);
    expectAnswers('ag-midpoint-6', [len(D, E), len(B, C)]);
  });

  it('ag-midpoint-7', () => {
    const P: Pt = [4, 3];
    const Q: Pt = [1, 5];
    const R: Pt = [2, 1];
    // unknowns (A, B, C): B + C = 2P, C + A = 2Q, A + B = 2R, solved as a linear system per coordinate
    const system = [[0, 1, 1], [1, 0, 1], [1, 1, 0]];
    const xs = (lusolve(system, [2 * P[0], 2 * Q[0], 2 * R[0]]) as number[][]).map((row) => row[0]);
    const ys = (lusolve(system, [2 * P[1], 2 * Q[1], 2 * R[1]]) as number[][]).map((row) => row[0]);
    const [A, B, C]: Pt[] = [0, 1, 2].map((i) => [xs[i], ys[i]] as Pt);
    expect(mid(B, C)[0]).toBeCloseTo(P[0], 12);
    expect(mid(C, A)[1]).toBeCloseTo(Q[1], 12);
    expect(mid(A, B)[0]).toBeCloseTo(R[0], 12);
    expectAnswers('ag-midpoint-7', [A[0], A[1], B[0], B[1], C[0], C[1]]);
  });

  it('ag-midpoint-8', () => {
    const A: Pt = [1, 1];
    const B: Pt = [6, 2];
    const M: Pt = [4, 4];
    const C: Pt = [M[0] + vec(A, M)[0], M[1] + vec(A, M)[1]];
    const D: Pt = [M[0] + vec(B, M)[0], M[1] + vec(B, M)[1]];
    expect(cross(vec(A, B), vec(D, C))).toBeCloseTo(0, 12);
    expect(len(A, B)).toBeCloseTo(len(B, C), 12);
    expectAnswers('ag-midpoint-8', [C[0], C[1], D[0], D[1], shoelace([A, B, C, D])]);
  });
});

const xAxis: Line = { a: 0, b: 1, c: 0 };
const yAxis: Line = { a: 1, b: 0, c: 0 };
const vertical = (k: number): Line => ({ a: 1, b: 0, c: k });
const horizontal = (k: number): Line => ({ a: 0, b: 1, c: k });

describe('ag-line', () => {
  it('ag-line-1', () => {
    // two points of 2x + 3y − 12 = 0 found numerically, then the slope between them
    const yAt = (x: number) => bisect((y) => 2 * x + 3 * y - 12, -100, 100);
    const p: Pt = [0, yAt(0)];
    const q: Pt = [3, yAt(3)];
    expectAnswers('ag-line-1', [(q[1] - p[1]) / (q[0] - p[0]), p[1]]);
  });

  it('ag-line-2', () => {
    const line = explicit(3, -5);
    const k = bisect((x) => 3 * x - 5 - 7, -100, 100);
    expect(onLine([k, 7], line)).toBe(true);
    const B = meet(line, vertical(-1));
    expectAnswers('ag-line-2', [k, B[1]]);
  });

  it('ag-line-3', () => {
    const line = explicit(-1.5, 6);
    const A = meet(line, xAxis);
    const B = meet(line, yAxis);
    expectAnswers('ag-line-3', [A[0], B[1], shoelace([A, [0, 0], B])]);
  });

  it('ag-line-4', () => {
    expectAnswers('ag-line-4', meet(explicit(2, -3), { a: 1, b: 1, c: 9 }));
  });

  it('ag-line-5', () => {
    const slanted = explicit(1, 1);
    const A = meet(vertical(3), slanted);
    const B = meet(vertical(3), horizontal(-2));
    const C = meet(horizontal(-2), slanted);
    expect(dot(vec(B, A), vec(B, C))).toBeCloseTo(0, 12);
    expectAnswers('ag-line-5', [A[1], C[0], shoelace([A, B, C])]);
  });

  it('ag-line-6', () => {
    const m = bisect((t) => t * 2 + 4 - -2, -100, 100);
    const roots = findRoots((x) => m * x + 4, -50, 50);
    expect(roots.length).toBe(1);
    expectAnswers('ag-line-6', [m, roots[0]]);
  });

  it('ag-line-7', () => {
    const l1 = explicit(2, 2);
    const l2 = explicit(-1, 8);
    const A = meet(l1, l2);
    const B = meet(l1, xAxis);
    const C = meet(l2, xAxis);
    expectAnswers('ag-line-7', [A[0], A[1], shoelace([A, B, C]), len(A, C)]);
  });

  it('ag-line-8', () => {
    const l1 = explicit(2, -1);
    const l2 = explicit(-1, 5);
    const P = meet(l1, l2);
    const k = bisect((t) => t * P[0] + 1 - P[1], -100, 100);
    expect(onLine(P, explicit(k, 1))).toBe(true);
    expectAnswers('ag-line-8', [k, shoelace([P, meet(l1, yAxis), meet(l2, yAxis)])]);
  });
});

describe('ag-line-equation', () => {
  it('ag-line-equation-1', () => {
    const line = parallelThrough([2, -1], [1, 3]);
    expectAnswers('ag-line-equation-1', slopeIntercept(line));
  });

  it('ag-line-equation-2', () => {
    const line = through([-1, 4], [3, -4]);
    expectAnswers('ag-line-equation-2', slopeIntercept(line));
  });

  it('ag-line-equation-3', () => {
    const AB = through([2, 5], [2, -3]);
    const CD = through([-1, 4], [6, 4]);
    expect(AB.b).toBe(0);
    expect(CD.a).toBe(0);
    expectAnswers('ag-line-equation-3', meet(AB, CD));
  });

  it('ag-line-equation-4', () => {
    const line = through([-4, 1], [2, 4]);
    const [m, n] = slopeIntercept(line);
    expectAnswers('ag-line-equation-4', [m, n, meet(line, xAxis)[0]]);
  });

  it('ag-line-equation-5', () => {
    const [A, B, C]: Pt[] = [[-2, -5], [1, 1], [4, 7]];
    expect(cross(vec(A, B), vec(A, C))).toBeCloseTo(0, 12);
    const line = through(A, C);
    expect(onLine(B, line)).toBe(true);
    const [m, n] = slopeIntercept(line);
    expectAnswers('ag-line-equation-5', [m, n, meet(line, horizontal(15))[0]]);
  });

  it('ag-line-equation-6', () => {
    const P = meet(explicit(1, 1), explicit(-2, 7));
    expectAnswers('ag-line-equation-6', slopeIntercept(through(P, [5, 12])));
  });

  it('ag-line-equation-7', () => {
    const [A, B, C]: Pt[] = [[-2, 3], [4, -1], [6, 7]];
    const K = mid(B, C);
    const L = mid(A, C);
    const AK = through(A, K);
    const BL = through(B, L);
    const G = meet(AK, BL);
    expect(onLine(G, through(C, mid(A, B)))).toBe(true);
    const [m, n] = slopeIntercept(BL);
    expectAnswers('ag-line-equation-7', [m, n, G[0], G[1]]);
  });

  it('ag-line-equation-8', () => {
    const A: Pt = [1, 4];
    const lineWithSlope = (m: number) => parallelThrough(A, [1, m]);
    const area = (m: number) => {
      const line = lineWithSlope(m);
      return shoelace([[0, 0], meet(line, xAxis), meet(line, yAxis)]);
    };
    const slopes = findRoots((m) => area(m) - 9, -50, -0.05, 20000);
    expect(slopes.length).toBe(2);
    for (const m of slopes) {
      expect(meet(lineWithSlope(m), xAxis)[0]).toBeGreaterThan(0);
      expect(meet(lineWithSlope(m), yAxis)[1]).toBeGreaterThan(0);
    }
    const [small, large] = slopes;
    expectAnswers('ag-line-equation-8', [large, meet(lineWithSlope(large), yAxis)[1], small, meet(lineWithSlope(small), yAxis)[1]]);
  });
});

/** Inclination angle in degrees, in [0, 180), of the direction d. */
function inclination(d: Pt): number {
  const angle = (Math.atan2(d[1], d[0]) * 180) / Math.PI;
  return ((angle % 180) + 180) % 180;
}

/** Foot of the perpendicular from p to the line y = m·x + n, found by minimising the distance numerically. */
function footOnGraph(p: Pt, m: number, n: number): Pt {
  const t = argmin((x) => len(p, [x, m * x + n]) ** 2, -100, 100);
  return [t, m * t + n];
}

describe('ag-slope-parallel', () => {
  it('ag-slope-parallel-1', () => {
    const yAt = (x: number) => bisect((y) => 3 * x - 6 * y + 5, -100, 100);
    const p: Pt = [0, yAt(0)];
    const q: Pt = [4, yAt(4)];
    expectAnswers('ag-slope-parallel-1', [slopeIntercept(through([-1, -2], [3, 6]))[0], (q[1] - p[1]) / (q[0] - p[0])]);
  });

  it('ag-slope-parallel-2', () => {
    const direction = vec([0, 2], [1, -1]);
    const line = parallelThrough([1, 4], direction);
    const [m, n] = slopeIntercept(line);
    expect(n).not.toBeCloseTo(2, 6);
    expectAnswers('ag-slope-parallel-2', [m, n]);
  });

  it('ag-slope-parallel-3', () => {
    const a = inclination(vec([0, -2], [1, Math.sqrt(3) - 2]));
    const b = inclination(vec([1, 5], [4, 2]));
    expectAnswers('ag-slope-parallel-3', [a, b]);
  });

  it('ag-slope-parallel-4', () => {
    const k1 = bisect((k) => cross([1, 2 * k - 1], [1, k + 2]), -100, 100);
    expect(onLine([0, 3], explicit(k1 + 2, -1))).toBe(false);
    const k2 = bisect((k) => inclination([1, 2 * k - 1]) - 45, 0.5, 10);
    expectAnswers('ag-slope-parallel-4', [k1, k2]);
  });

  it('ag-slope-parallel-5', () => {
    const [A, B, C, D]: Pt[] = [[-3, -1], [3, 1], [5, 5], [-1, 3]];
    expect(cross(vec(A, B), vec(D, C))).toBeCloseTo(0, 12);
    expect(cross(vec(A, D), vec(B, C))).toBeCloseTo(0, 12);
    expectAnswers('ag-slope-parallel-5', [slopeIntercept(through(A, B))[0], slopeIntercept(through(A, D))[0]]);
  });

  it('ag-slope-parallel-6', () => {
    // directions of kx + 2y = 4 and 3x + (k + 1)y = 1 are (2, −k) and (k + 1, −3)
    const roots = findRoots((k) => cross([2, -k], [k + 1, -3]), -20, 20);
    expect(roots.length).toBe(2);
    for (const k of roots) {
      const first: Line = { a: k, b: 2, c: 4 };
      const second: Line = { a: 3, b: k + 1, c: 1 };
      expect(onLine([0, 2], first)).toBe(true);
      expect(onLine([0, 2], second)).toBe(false);
    }
    expectAnswers('ag-slope-parallel-6', [roots[1], roots[0]]);
  });

  it('ag-slope-parallel-7', () => {
    const [A, B, D]: Pt[] = [[-2, 0], [6, 4], [-1, 5]];
    const DC = parallelThrough(D, vec(A, B));
    const C = meet(DC, explicit(2, -2));
    expect(cross(vec(A, B), vec(D, C))).toBeCloseTo(0, 12);
    expectAnswers('ag-slope-parallel-7', [C[0], C[1], len(D, C) / len(A, B)]);
  });

  it('ag-slope-parallel-8', () => {
    const A: Pt = [1, 2];
    const B: Pt = [7, 4];
    const AD = explicit(3, -1);
    expect(onLine(A, AD)).toBe(true);
    const DC = parallelThrough([0, 7], vec(A, B));
    const D = meet(AD, DC);
    const C = meet(parallelThrough(B, vec(A, D)), DC);
    expect(mid(A, C)[0]).toBeCloseTo(mid(B, D)[0], 12);
    expect(mid(A, C)[1]).toBeCloseTo(mid(B, D)[1], 12);
    expectAnswers('ag-slope-parallel-8', [D[0], D[1], C[0], C[1]]);
  });
});

describe('ag-perpendicular', () => {
  it('ag-perpendicular-1', () => {
    const normal = perpendicularThrough([0, 0], [3, 2]);
    expect(dot([1, 4], [4, -1])).toBe(0); // directions of y = 4x − 1 and x + 4y = 8
    expectAnswers('ag-perpendicular-1', [slopeIntercept(normal)[0]]);
  });

  it('ag-perpendicular-2', () => {
    expectAnswers('ag-perpendicular-2', slopeIntercept(perpendicularThrough([2, -1], [2, 1])));
  });

  it('ag-perpendicular-3', () => {
    const [A, B, C]: Pt[] = [[0, 4], [2, 0], [8, 3]];
    expect(dot(vec(B, A), vec(B, C))).toBeCloseTo(0, 12);
    expectAnswers('ag-perpendicular-3', [shoelace([A, B, C])]);
  });

  it('ag-perpendicular-4', () => {
    const A: Pt = [-3, 2];
    const B: Pt = [5, 6];
    const bisector = perpendicularThrough(mid(A, B), vec(A, B));
    const [m, n] = slopeIntercept(bisector);
    for (const x of [-4, 0, 7]) expect(len([x, m * x + n], A)).toBeCloseTo(len([x, m * x + n], B), 9);
    const roots = findRoots((x) => len([x, 0], A) - len([x, 0], B), -50, 50);
    expectAnswers('ag-perpendicular-4', [m, n, roots[0]]);
  });

  it('ag-perpendicular-5', () => {
    const P: Pt = [7, 1];
    const H = footOnGraph(P, 2, -3);
    expect(dot(vec(H, P), [1, 2])).toBeCloseTo(0, 6);
    expectAnswers('ag-perpendicular-5', [H[0], H[1], len(P, H)], 6);
  });

  it('ag-perpendicular-6', () => {
    const roots = findRoots((a) => dot([1, a], [1, a - 2.5]), -20, 20);
    expect(roots.length).toBe(2);
    expectAnswers('ag-perpendicular-6', [roots[1], roots[0]]);
  });

  it('ag-perpendicular-7', () => {
    const [A, B, C]: Pt[] = [[-3, -1], [6, 2], [1, 7]];
    const ABline = slopeIntercept(through(A, B));
    const D = footOnGraph(C, ABline[0], ABline[1]);
    expect(dot(vec(D, C), vec(A, B))).toBeCloseTo(0, 6);
    const [m, n] = slopeIntercept(through(C, D));
    expectAnswers('ag-perpendicular-7', [m, n, D[0], D[1], shoelace([A, B, C])], 6);
  });

  it('ag-perpendicular-8', () => {
    const [A, B, C]: Pt[] = [[-1, 5], [5, 5], [6, -2]];
    const O = circumcenter(A, B, C);
    expect(len(O, B)).toBeCloseTo(len(O, A), 12);
    expect(len(O, C)).toBeCloseTo(len(O, A), 12);
    expectAnswers('ag-perpendicular-8', [O[0], O[1], len(O, A)]);
  });
});

describe('ag-line-review', () => {
  it('ag-line-review-1', () => {
    const A: Pt = [-1, -2];
    const B: Pt = [5, 1];
    const AC = perpendicularThrough(A, vec(A, B));
    const C = meet(AC, yAxis);
    expect(dot(vec(A, B), vec(A, C))).toBeCloseTo(0, 12);
    expectAnswers('ag-line-review-1', [...slopeIntercept(AC), shoelace([A, B, C])]);
  });

  it('ag-line-review-2', () => {
    const [A, B, C]: Pt[] = [[0, -1], [4, 0], [5, 4]];
    const D: Pt = [A[0] + vec(B, C)[0], A[1] + vec(B, C)[1]];
    expect(mid(A, C)).toEqual(mid(B, D));
    expect(len(A, B)).toBeCloseTo(len(B, C), 12);
    expect(dot(vec(A, C), vec(B, D))).toBeCloseTo(0, 12);
    expectAnswers('ag-line-review-2', [D[0], D[1], shoelace([A, B, C, D])]);
  });

  it('ag-line-review-3', () => {
    const first = explicit(2, 1);
    const second = explicit(-2, 9);
    const A = meet(first, second);
    const B = meet(first, horizontal(1));
    const C = meet(second, horizontal(1));
    expect(len(A, B)).toBeCloseTo(len(A, C), 12);
    expectAnswers('ag-line-review-3', [A[0], A[1], shoelace([A, B, C])]);
  });

  it('ag-line-review-4', () => {
    const [A, B, C]: Pt[] = [[-4, 0], [6, 0], [0, 8]];
    const altitudeA = perpendicularThrough(A, vec(B, C));
    const altitudeC = perpendicularThrough(C, vec(A, B));
    const H = meet(altitudeA, altitudeC);
    expect(dot(vec(B, H), vec(A, C))).toBeCloseTo(0, 12);
    expectAnswers('ag-line-review-4', [...slopeIntercept(altitudeA), H[0], H[1]]);
  });

  it('ag-line-review-5', () => {
    const A: Pt = [1, 0];
    const B: Pt = [5, 2];
    const bisector = perpendicularThrough(mid(A, B), vec(A, B));
    const roots = findRoots((t) => len([t, t + 1], A) - len([t, t + 1], B), -50, 50);
    expect(roots.length).toBe(1);
    const P: Pt = [roots[0], roots[0] + 1];
    expect(onLine(P, bisector)).toBe(true);
    expectAnswers('ag-line-review-5', [...slopeIntercept(bisector), P[0], P[1], shoelace([P, A, B])]);
  });

  it('ag-line-review-6', () => {
    const A: Pt = [1, 1];
    const B: Pt = [4, 2];
    const side = vec(A, B);
    // C = B + (AB rotated by ±90°); keep the one in the first quadrant
    const candidates: Pt[] = [[B[0] - side[1], B[1] + side[0]], [B[0] + side[1], B[1] - side[0]]];
    const firstQuadrant = candidates.filter((p) => p[0] > 0 && p[1] > 0);
    expect(firstQuadrant.length).toBe(1);
    const C = firstQuadrant[0];
    const D: Pt = [A[0] + vec(B, C)[0], A[1] + vec(B, C)[1]];
    expect(dot(vec(B, A), vec(B, C))).toBeCloseTo(0, 12);
    expect(len(C, D)).toBeCloseTo(len(A, B), 12);
    expect(onLine(C, explicit(-3, 14))).toBe(true);
    expectAnswers('ag-line-review-6', [C[0], C[1], D[0], D[1], shoelace([A, B, C, D])]);
  });
});

/** min of F over the plane (F = x² + y² + … is convex); negative ⇔ the equation F = 0 is a circle. */
function minimumOf(F: (x: number, y: number) => number): number {
  const cx = argmin((x) => F(x, 0), -100, 100);
  const cy = argmin((y) => F(cx, y), -100, 100);
  return F(cx, cy);
}

describe('ag-circle-equation', () => {
  it('ag-circle-equation-1', () => {
    const { center, r } = circleOf((x, y) => (x - 3) ** 2 + (y + 1) ** 2 - 16);
    expectAnswers('ag-circle-equation-1', [center[0], center[1], r], 6);
  });

  it('ag-circle-equation-2', () => {
    const M: Pt = [-2, 5];
    const P: Pt = [1, 1];
    expect((P[0] + 2) ** 2 + (P[1] - 5) ** 2).toBe(25);
    expectAnswers('ag-circle-equation-2', [len(M, P)]);
  });

  it('ag-circle-equation-3', () => {
    const { center, r } = circleOf((x, y) => x ** 2 + y ** 2 - 8 * x + 6 * y - 11);
    expectAnswers('ag-circle-equation-3', [center[0], center[1], r], 6);
  });

  it('ag-circle-equation-4', () => {
    const A: Pt = [-3, 2];
    const B: Pt = [5, 8];
    const M = mid(A, B);
    const R = len(A, B) / 2;
    expect(len(M, [4, 9])).toBeCloseTo(R, 12);
    expect(len(M, [0, 1])).toBeLessThan(R);
    expectAnswers('ag-circle-equation-4', [M[0], M[1], R]);
  });

  it('ag-circle-equation-5', () => {
    const { center, r } = circleOf((x, y) => (2 * x ** 2 + 2 * y ** 2 - 4 * x + 12 * y + 2) / 2);
    expect(minimumOf((x, y) => x ** 2 + y ** 2 + 4 * x - 2 * y + 6)).toBeGreaterThan(0);
    expectAnswers('ag-circle-equation-5', [center[0], center[1], r], 6);
  });

  it('ag-circle-equation-6', () => {
    const F = (k: number) => (x: number, y: number) => x ** 2 + y ** 2 - 6 * x + 2 * y + k;
    expect(minimumOf(F(9.9))).toBeLessThan(0);
    expect(minimumOf(F(10.1))).toBeGreaterThan(0);
    const kRadius3 = bisect((k) => Math.sqrt(-minimumOf(F(k))) - 3, -20, 9.9, 1e-10);
    const kOrigin = bisect((k) => F(k)(0, 0), -20, 9.9);
    expectAnswers('ag-circle-equation-6', [kRadius3, kOrigin], 6);
  });

  it('ag-circle-equation-7', () => {
    const a = bisect((t) => t - 1 - (2 * t - 5), -100, 100);
    expect(a - 1).not.toBe(0);
    const { center, r } = circleOf((x, y) => ((a - 1) * x ** 2 + (2 * a - 5) * y ** 2 - 6 * x + 12 * y + 6) / (a - 1));
    expectAnswers('ag-circle-equation-7', [a, center[0], center[1], r], 6);
  });

  it('ag-circle-equation-8', () => {
    const [A, B, C]: Pt[] = [[1, 1], [7, 1], [1, 9]];
    const M = circumcenter(A, B, C);
    const R = len(M, A);
    expect(len(M, [8, 8])).toBeCloseTo(R, 12);
    expectAnswers('ag-circle-equation-8', [M[0], M[1], R]);
  });
});

const onCircle = (p: Pt, center: Pt, r: number) => Math.abs(len(p, center) - r) < 1e-9;

describe('ag-circle-tangent', () => {
  it('ag-circle-tangent-1', () => {
    const A: Pt = [-3, 4];
    expect(onCircle(A, [0, 0], 5)).toBe(true);
    const m = tangentSlopeAt([0, 0], A);
    expectAnswers('ag-circle-tangent-1', [m, A[1] - m * A[0]], 6);
  });

  it('ag-circle-tangent-2', () => {
    const M: Pt = [2, -1];
    const r = 3;
    expect(onCircle([5, -1], M, r)).toBe(true);
    expect(onCircle([2, 2], M, r)).toBe(true);
    // the tangent at the rightmost point is vertical and at the topmost point horizontal: find those extreme points numerically
    const tRight = argmin((t) => -(M[0] + r * Math.cos(t)), -1, 1);
    const tTop = argmin((t) => -(M[1] + r * Math.sin(t)), 1, 2);
    expectAnswers('ag-circle-tangent-2', [M[0] + r * Math.cos(tRight), M[1] + r * Math.sin(tTop)], 6);
  });

  it('ag-circle-tangent-3', () => {
    const M: Pt = [1, 2];
    const A: Pt = [3, 6];
    expect(onCircle(A, M, Math.sqrt(20))).toBe(true);
    const m = tangentSlopeAt(M, A);
    expectAnswers('ag-circle-tangent-3', [m, A[1] - m * A[0]], 6);
  });

  it('ag-circle-tangent-4', () => {
    const F = (x: number, y: number) => x ** 2 + y ** 2 + 4 * x - 6 * y - 12;
    const { center } = circleOf(F);
    const ys = findRoots((y) => F(1, y), -20, 20);
    expect(ys.length).toBe(2);
    const A: Pt = [1, ys.filter((y) => y < 3)[0]];
    const m = tangentSlopeAt(center, A);
    expectAnswers('ag-circle-tangent-4', [A[1], m, A[1] - m * A[0]], 6);
  });

  it('ag-circle-tangent-5', () => {
    const A: Pt = [2, 4];
    expect(onCircle(A, [0, 0], Math.sqrt(20))).toBe(true);
    const m = tangentSlopeAt([0, 0], A);
    const tangent = explicit(m, A[1] - m * A[0]);
    const B = meet(tangent, xAxis);
    const C = meet(tangent, yAxis);
    expectAnswers('ag-circle-tangent-5', [m, A[1] - m * A[0], shoelace([B, [0, 0], C])], 6);
  });

  it('ag-circle-tangent-6', () => {
    const M: Pt = [1, 0];
    const ys = findRoots((y) => (4 - 1) ** 2 + y ** 2 - 25, -10, 10);
    const A: Pt = [4, ys[1]];
    const B: Pt = [4, ys[0]];
    const mA = tangentSlopeAt(M, A);
    const mB = tangentSlopeAt(M, B);
    const P = meet(explicit(mA, A[1] - mA * A[0]), explicit(mB, B[1] - mB * B[0]));
    expect(len(P, A)).toBeCloseTo(len(P, B), 6);
    expectAnswers('ag-circle-tangent-6', [mA, A[1] - mA * A[0], P[0], P[1]], 6);
  });

  it('ag-circle-tangent-7', () => {
    const M: Pt = [3, 1];
    const A: Pt = [4, 4];
    const B: Pt = [0, 2];
    expect(onCircle(A, M, Math.sqrt(10))).toBe(true);
    expect(onCircle(B, M, Math.sqrt(10))).toBe(true);
    const mA = tangentSlopeAt(M, A);
    const mB = tangentSlopeAt(M, B);
    const P = meet(explicit(mA, A[1] - mA * A[0]), explicit(mB, B[1] - mB * B[0]));
    expect(len(P, A)).toBeCloseTo(len(M, A), 6);
    expect(dot(vec(M, A), vec(M, B))).toBeCloseTo(0, 12);
    expectAnswers('ag-circle-tangent-7', [P[0], P[1], shoelace([P, A, M, B])], 6);
  });

  it('ag-circle-tangent-8', () => {
    const M: Pt = [2, 1];
    const r = Math.sqrt(5);
    // points where the tangent direction (−sin t, cos t) is parallel to (1, 2)
    const ts = findRoots((t) => cross([-Math.sin(t), Math.cos(t)], [1, 2]), 0, 2 * Math.PI);
    expect(ts.length).toBe(2);
    const points = ts.map((t) => [M[0] + r * Math.cos(t), M[1] + r * Math.sin(t)] as Pt).sort((p, q) => q[0] - p[0]);
    for (const p of points) expect(tangentSlopeAt(M, p)).toBeCloseTo(2, 6);
    const [right, left] = points;
    expectAnswers('ag-circle-tangent-8', [right[0], right[1] - 2 * right[0], left[0], left[1] - 2 * left[0]], 6);
  });
});

describe('ag-line-more', () => {
  it('ag-line-more-1', () => {
    const P: Pt = [5, 0];
    const H = footOnGraph(P, 2, 0);
    const reflected: Pt = [H[0] + (H[0] - P[0]), H[1] + (H[1] - P[1])];
    expect(dot(vec(P, reflected), [1, 2])).toBeCloseTo(0, 6);
    expect(len([0, 0], reflected)).toBeCloseTo(len([0, 0], P), 6);
    expectAnswers('ag-line-more-1', [H[0], H[1], reflected[0], reflected[1]], 6);
  });

  it('ag-line-more-2', () => {
    const A: Pt = [-1, 2];
    const B: Pt = [3, 0];
    const C = meet(perpendicularThrough(B, vec(A, B)), explicit(1, -1));
    const D: Pt = [A[0] + vec(B, C)[0], A[1] + vec(B, C)[1]];
    expect(dot(vec(B, A), vec(B, C))).toBeCloseTo(0, 12);
    expect(len(A, B)).toBeCloseTo(len(B, C), 12);
    expectAnswers('ag-line-more-2', [C[0], C[1], D[0], D[1], shoelace([A, B, C, D])]);
  });

  it('ag-line-more-3', () => {
    const ell = explicit(-0.5, 4);
    const A = meet(ell, xAxis);
    const B = meet(ell, yAxis);
    const C = meet(perpendicularThrough(B, [2, -1]), xAxis);
    expect(len(A, B) ** 2 + len(B, C) ** 2).toBeCloseTo(len(A, C) ** 2, 9);
    expectAnswers('ag-line-more-3', [C[0], shoelace([A, B, C])]);
  });

  it('ag-line-more-4', () => {
    const [A, B, D]: Pt[] = [[1, 1], [9, 5], [0, 4]];
    const C: Pt = [D[0] + vec(A, B)[0] / 2, D[1] + vec(A, B)[1] / 2];
    const [m, n] = slopeIntercept(through(A, B));
    const H = footOnGraph(D, m, n);
    expectAnswers('ag-line-more-4', [C[0], C[1], H[0], H[1], len(D, H), shoelace([A, B, C, D])], 6);
  });

  it('ag-line-more-5', () => {
    const A: Pt = [1, 4];
    const B: Pt = [7, 2];
    const xs = findRoots((x) => dot(vec([x, 0], A), vec([x, 0], B)), -20, 20);
    expect(xs.length).toBe(2);
    const isosceles = xs.filter((x) => Math.abs(len([x, 0], A) - len([x, 0], B)) < 1e-6);
    expect(isosceles.length).toBe(1);
    expectAnswers('ag-line-more-5', [xs[0], xs[1], shoelace([A, [isosceles[0], 0], B])]);
  });

  it('ag-line-more-6', () => {
    const A: Pt = [4, 8];
    const B: Pt = [2, 2];
    const M = footOnGraph(A, 0.5, 1);
    const C: Pt = [M[0] + (M[0] - B[0]), M[1] + (M[1] - B[1])];
    expect(len(A, C)).toBeCloseTo(len(A, B), 6);
    expect(onLine(B, explicit(0.5, 1))).toBe(true);
    expectAnswers('ag-line-more-6', [M[0], M[1], C[0], C[1], shoelace([A, B, C])], 6);
  });
});

describe('ag-circle-more', () => {
  it('ag-circle-more-1', () => {
    const F = (x: number, y: number) => x ** 2 + y ** 2 - 2 * x - 6 * y - 15;
    const { center, r } = circleOf(F);
    const xs = findRoots((x) => F(x, 0), -20, 20);
    expect(xs.length).toBe(2);
    const A: Pt = [xs[1], 0];
    expect(A[0]).toBeGreaterThan(0);
    const m = tangentSlopeAt(center, A);
    expectAnswers('ag-circle-more-1', [center[0], center[1], r, m, A[1] - m * A[0]], 6);
  });

  it('ag-circle-more-2', () => {
    const A: Pt = [1, 3];
    const B: Pt = [5, 1];
    const ts = findRoots((t) => len([t, 0], A) - len([t, 0], B), -50, 50);
    expect(ts.length).toBe(1);
    const M: Pt = [ts[0], 0];
    const m = tangentSlopeAt(M, A);
    expectAnswers('ag-circle-more-2', [M[0], len(M, A), m, A[1] - m * A[0]], 6);
  });

  it('ag-circle-more-3', () => {
    const T: Pt = [1, 3];
    expect(onLine(T, explicit(2, 1))).toBe(true);
    // centre (t, 0) such that the radius to T is perpendicular to the direction (1, 2) of the line
    const ts = findRoots((t) => dot(vec([t, 0], T), [1, 2]), -50, 50);
    expect(ts.length).toBe(1);
    const M: Pt = [ts[0], 0];
    const R = len(M, T);
    // the line touches the circle: its closest point to the centre is at distance R
    const closest = argmin((x) => len(M, [x, 2 * x + 1]) ** 2, -50, 50);
    expect(len(M, [closest, 2 * closest + 1])).toBeCloseTo(R, 6);
    expectAnswers('ag-circle-more-3', [M[0], R], 6);
  });

  it('ag-circle-more-4', () => {
    const F = (k: number) => (x: number, y: number) => x ** 2 + y ** 2 + 2 * k * x - 4 * y + 2 * k + 7;
    expect(minimumOf(F(-1.1))).toBeLessThan(0);
    expect(minimumOf(F(-0.9))).toBeGreaterThan(0);
    expect(minimumOf(F(2.9))).toBeGreaterThan(0);
    expect(minimumOf(F(3.1))).toBeLessThan(0);
    const ks = findRoots((k) => -minimumOf(F(k)) - 5, -20, 20, 400);
    expect(ks.length).toBe(2);
    const k = ks[1];
    const { center, r } = circleOf(F(k));
    const P: Pt = [-2, 3];
    expect(len(center, P)).toBeCloseTo(r, 6);
    const m = tangentSlopeAt(center, P);
    expectAnswers('ag-circle-more-4', [ks[1], ks[0], m, P[1] - m * P[0]], 6);
  });

  it('ag-circle-more-5', () => {
    const M: Pt = [-1, 3];
    const F = (x: number, y: number) => (x + 1) ** 2 + (y - 3) ** 2 - 20;
    const xs = findRoots((x) => F(x, x + 2), -20, 20);
    expect(xs.length).toBe(2);
    const B: Pt = [xs[0], xs[0] + 2];
    const A: Pt = [xs[1], xs[1] + 2];
    const closest = argmin((t) => len(M, [t, t + 2]) ** 2, -20, 20);
    const mA = tangentSlopeAt(M, A);
    const mB = tangentSlopeAt(M, B);
    const P = meet(explicit(mA, A[1] - mA * A[0]), explicit(mB, B[1] - mB * B[0]));
    expectAnswers('ag-circle-more-5', [len(A, B), len(M, [closest, closest + 2]), P[0], P[1]], 6);
  });

  it('ag-circle-more-6', () => {
    const [K, L, N]: Pt[] = [[2, 6], [-4, -2], [3, -1]];
    const M = circumcenter(K, L, N);
    expect(mid(K, L)[0]).toBeCloseTo(M[0], 12);
    expect(mid(K, L)[1]).toBeCloseTo(M[1], 12);
    expect(dot(vec(N, K), vec(N, L))).toBeCloseTo(0, 12);
    const mK = tangentSlopeAt(M, K);
    const mL = tangentSlopeAt(M, L);
    expect(mK).toBeCloseTo(mL, 6);
    expectAnswers('ag-circle-more-6', [M[0], M[1], len(M, K), K[1] - mK * K[0], L[1] - mL * L[0]], 6);
  });
});

describe('ag-self-practice', () => {
  it('ag-self-practice-1', () => {
    const xs = findRoots((x) => x ** 2 + (x + 1) ** 2 - 25, -10, 10);
    expect(xs.length).toBe(2);
    const B: Pt = [xs[0], xs[0] + 1];
    const A: Pt = [xs[1], xs[1] + 1];
    expect(A[0] > 0 && A[1] > 0).toBe(true);
    expect(dot(mid(A, B), vec(A, B))).toBeCloseTo(0, 9);
    expectAnswers('ag-self-practice-1', [A[0], A[1], B[0], B[1], len(A, B)], 9);
  });

  it('ag-self-practice-2', () => {
    const y = bisect((t) => 0.36 + t ** 2 - 1, 0, 2);
    const P: Pt = [-0.6, y];
    const Q: Pt = [0.8, 0.6];
    expect(len([0, 0], Q)).toBeCloseTo(1, 12);
    expect(dot(P, Q)).toBeCloseTo(0, 9);
    expectAnswers('ag-self-practice-2', [y, slopeIntercept(through([0, 0], P))[0], len(P, Q)], 9);
  });

  it('ag-self-practice-3', () => {
    const A: Pt = [6, 8];
    const R = len([0, 0], A);
    const B: Pt = [-A[0], -A[1]];
    const C: Pt = [10, 0];
    expect(len([0, 0], C)).toBeCloseTo(R, 12);
    expect(dot(vec(C, A), vec(C, B))).toBeCloseTo(0, 12);
    expectAnswers('ag-self-practice-3', [R, B[0], B[1], shoelace([A, B, C])]);
  });

  it('ag-self-practice-4', () => {
    const xs = findRoots((x) => len([x, 2 * x], [5, 0]) - 5, -10, 10);
    const others = xs.filter((x) => Math.abs(x) > 1e-6);
    expect(others.length).toBe(1);
    const P: Pt = [others[0], 2 * others[0]];
    expectAnswers('ag-self-practice-4', [P[0], P[1], shoelace([[0, 0], [5, 0], P])], 9);
  });

  it('ag-self-practice-5', () => {
    const [A, B, C]: Pt[] = [[-1, 7], [7, 1], [-5, -5]];
    const O = circumcenter(A, B, C);
    expect(O[0]).toBeCloseTo(0, 12);
    expect(O[1]).toBeCloseTo(0, 12);
    const D: Pt = [2 * O[0] - B[0], 2 * O[1] - B[1]];
    expectAnswers('ag-self-practice-5', [len(O, A), D[0], D[1]]);
  });

  it('ag-self-practice-6', () => {
    const A: Pt = [3, 4];
    const r = len([0, 0], A);
    const C: Pt = [-A[0], -A[1]];
    const ts = findRoots((t) => dot([r * Math.cos(t), r * Math.sin(t)], A), 0, 2 * Math.PI);
    expect(ts.length).toBe(2);
    const ends = ts.map((t) => [r * Math.cos(t), r * Math.sin(t)] as Pt);
    const B = ends.find((p) => p[0] > 0 && p[1] < 0)!;
    const D = ends.find((p) => p !== B)!;
    for (const [p, q] of [[A, B], [B, C], [C, D], [D, A]] as Array<[Pt, Pt]>) expect(len(p, q)).toBeCloseTo(r * Math.SQRT2, 9);
    expectAnswers('ag-self-practice-6', [C[0], C[1], B[0], B[1], shoelace([A, B, C, D])], 9);
  });
});
