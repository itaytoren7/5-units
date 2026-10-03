/**
 * Independent numeric verification of the geometry-b lessons (areas, circle area, Thales, angle bisector, similarity).
 * Every exercise is rebuilt as a concrete coordinate model that satisfies its givens; each answer is then MEASURED in
 * the model (distances, shoelace areas, line intersections, polygon approximations of arcs, bisection), never taken
 * from the closed forms of the solutions. Proof exercises also get numeric sanity checks of the claims they prove.
 */
import { describe, expect, it } from 'vitest';
import { geometryBContent } from './geometry-b';
import { bisect, degreesToRadians, distance, radiansToDegrees } from '../../problems/verify';

type P = [number, number];

const ex = (id: string) => Object.values(geometryBContent).flatMap((lesson) => lesson.exercises).find((e) => e.id === id)!;

function expectAnswers(id: string, computed: number[], digits = 8) {
  const answers = ex(id).answers ?? [];
  expect(answers.length, `${id}: number of answers`).toBe(computed.length);
  computed.forEach((value, index) => expect(answers[index].value, `${id}: answer ${index + 1}`).toBeCloseTo(value, digits));
}

const len = (p: P, q: P) => distance(p[0], p[1], q[0], q[1]);
const add = (p: P, q: P): P => [p[0] + q[0], p[1] + q[1]];
const sub = (p: P, q: P): P => [p[0] - q[0], p[1] - q[1]];
const mul = (p: P, k: number): P => [p[0] * k, p[1] * k];
const mid = (p: P, q: P): P => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const lerp = (p: P, q: P, t: number): P => [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
const unit = (v: P): P => mul(v, 1 / Math.hypot(v[0], v[1]));
const cross = (u: P, v: P) => u[0] * v[1] - u[1] * v[0];
const dot = (u: P, v: P) => u[0] * v[0] + u[1] * v[1];
const polar = (c: P, r: number, deg: number): P => [c[0] + r * Math.cos(degreesToRadians(deg)), c[1] + r * Math.sin(degreesToRadians(deg))];

/** Shoelace area of a polygon given as an array. */
function polyArea(pts: P[]): number {
  let s = 0;
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % pts.length];
    s += p[0] * q[1] - q[0] * p[1];
  });
  return Math.abs(s) / 2;
}

const area = (...pts: P[]) => polyArea(pts);

/** Intersection of line p1p2 with line p3p4. */
function intersect(p1: P, p2: P, p3: P, p4: P): P {
  const d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
  const a = p1[0] * p2[1] - p1[1] * p2[0];
  const b = p3[0] * p4[1] - p3[1] * p4[0];
  return [(a * (p3[0] - p4[0]) - (p1[0] - p2[0]) * b) / d, (a * (p3[1] - p4[1]) - (p1[1] - p2[1]) * b) / d];
}

function foot(p: P, a: P, b: P): P {
  const d = sub(b, a);
  return add(a, mul(d, dot(sub(p, a), d) / dot(d, d)));
}

const distToLine = (p: P, a: P, b: P) => len(p, foot(p, a, b));

/** Angle at vertex v (radians). */
function angle(p: P, v: P, q: P): number {
  const a = sub(p, v);
  const b = sub(q, v);
  return Math.acos(dot(a, b) / (Math.hypot(...a) * Math.hypot(...b)));
}

/** Vertex A above line BC with AB = c, AC = b (found by intersecting two circles numerically). */
function apex(B: P, C: P, c: number, b: number): P {
  const u = unit(sub(C, B));
  const nrm: P = [-u[1], u[0]];
  // walk along the circle |AB| = c and find where |AC| = b, on the upper side of BC
  const point = (t: number): P => add(B, add(mul(u, c * Math.cos(t)), mul(nrm, c * Math.sin(t))));
  const t = bisect((s) => len(point(s), C) - b, 1e-9, Math.PI - 1e-9);
  return point(t);
}

/** Foot of the internal bisector from A on line BC (direction = sum of unit vectors, no bisector theorem). */
function bisectorFoot(A: P, B: P, C: P): P {
  const dir = add(unit(sub(B, A)), unit(sub(C, A)));
  return intersect(A, add(A, dir), B, C);
}

function circumcenter(p: P, q: P, r: P): P {
  const m1 = mid(p, q);
  const m2 = mid(q, r);
  return intersect(m1, [m1[0] - (q[1] - p[1]), m1[1] + (q[0] - p[0])], m2, [m2[0] - (r[1] - q[1]), m2[1] + (r[0] - q[0])]);
}

/** Second intersection of the line through P (on the circle) and Q with the circle (c, r). */
function secondOnCircle(Pt: P, Q: P, c: P, r: number): P {
  const d = sub(Q, Pt);
  const f = sub(Pt, c);
  const a = dot(d, d);
  const b = 2 * dot(f, d);
  const cc = dot(f, f) - r * r;
  const disc = Math.sqrt(b * b - 4 * a * cc);
  const t1 = (-b - disc) / (2 * a);
  const t2 = (-b + disc) / (2 * a);
  const t = Math.abs(t1) > Math.abs(t2) ? t1 : t2;
  return add(Pt, mul(d, t));
}

/** Points on the arc of circle (c, r) from angle a1 to a2 (degrees, counter-clockwise), n segments. */
function arcPoints(c: P, r: number, a1: number, a2: number, n = 20000): P[] {
  return Array.from({ length: n + 1 }, (_, i) => polar(c, r, a1 + ((a2 - a1) * i) / n));
}

function polylineLength(pts: P[]): number {
  let s = 0;
  for (let i = 1; i < pts.length; i += 1) s += len(pts[i - 1], pts[i]);
  return s;
}

const expectParallel = (a: P, b: P, c: P, d: P) => expect(cross(sub(b, a), sub(d, c))).toBeCloseTo(0, 9);

// ---------------------------------------------------------------- geo-areas-basic
describe('geo-areas-basic', () => {
  it('geo-areas-basic-1', () => {
    const A: P = [-12, 0], B: P = [0, 5], C: P = [12, 0], D: P = [0, -5];
    expect(len(A, C)).toBeCloseTo(24, 12);
    expect(len(B, D)).toBeCloseTo(10, 12);
    [len(A, B), len(B, C), len(C, D), len(D, A)].forEach((side) => expect(side).toBeCloseTo(len(A, B), 12));
    expectAnswers('geo-areas-basic-1', [area(A, B, C, D), len(A, B)]);
  });

  it('geo-areas-basic-2', () => {
    const A: P = [0, 0], B: P = [12, 0], D: P = [6, 8];
    const C = add(B, D);
    expect(len(A, B)).toBeCloseTo(12, 12);
    expect(len(A, D)).toBeCloseTo(10, 12);
    expect(distToLine(D, A, B)).toBeCloseTo(8, 12);
    expectAnswers('geo-areas-basic-2', [area(A, B, C, D), distToLine(B, A, D)]);
  });

  it('geo-areas-basic-3', () => {
    const C: P = [0, 0], A: P = [0, 9];
    const B: P = [Math.sqrt(15 ** 2 - 81), 0];
    expect(len(A, B)).toBeCloseTo(15, 12);
    const D = foot(C, A, B);
    expectAnswers('geo-areas-basic-3', [len(B, C), area(A, B, C), len(C, D)]);
  });

  it('geo-areas-basic-4', () => {
    // isosceles trapezoid built from the givens: bases 20 and 8 centred on the same vertical axis, legs 10
    const A: P = [0, 0], B: P = [20, 0];
    const h = bisect((y) => len(A, [6, y]) - 10, 0.1, 10);
    const D: P = [6, h], C: P = [14, h];
    expect(len(D, C)).toBeCloseTo(8, 12);
    expect(len(B, C)).toBeCloseTo(10, 9);
    expectAnswers('geo-areas-basic-4', [distToLine(D, A, B), area(A, B, C, D)]);
  });

  it('geo-areas-basic-5', () => {
    const B: P = [-8, 0], D: P = [8, 0];
    const A = apex(B, D, 10, 10);
    const C = apex(D, B, 17, 17); // below BD
    expect(len(C, B)).toBeCloseTo(17, 9);
    expect(len(A, D)).toBeCloseTo(10, 9);
    expectAnswers('geo-areas-basic-5', [len(A, C), area(A, B, C, D)]);
  });

  it('geo-areas-basic-6', () => {
    const A: P = [0, 0], B: P = [14, 0];
    const h = bisect((y) => len(B, [8, y]) - 10, 0.1, 20);
    const C: P = [8, h], D: P = [0, h];
    expect(len(D, C)).toBeCloseTo(8, 12);
    expect(angle(B, A, D)).toBeCloseTo(Math.PI / 2, 12);
    expectAnswers('geo-areas-basic-6', [area(A, B, C, D), len(A, B) + len(B, C) + len(C, D) + len(D, A)]);
  });

  it('geo-areas-basic-7', () => {
    const B: P = [0, 0], C: P = [14, 0];
    const A = apex(B, C, 13, 15);
    const D = foot(A, B, C);
    const E = foot(B, A, C);
    expectAnswers('geo-areas-basic-7', [len(A, D), area(A, B, C), len(B, E)]);
  });

  it('geo-areas-basic-8', () => {
    // rhombus with side 10: search the half-diagonal p (other half-diagonal sqrt(100-p^2)) giving area 96, longer diagonal first
    const areaOf = (p: number) => area([-p, 0], [0, Math.sqrt(100 - p * p)], [p, 0], [0, -Math.sqrt(100 - p * p)]);
    const p = bisect((t) => areaOf(t) - 96, Math.SQRT2 * 5, 9.999);
    const A: P = [-p, 0], B: P = [0, Math.sqrt(100 - p * p)], C: P = [p, 0], D: P = [0, -B[1]];
    expect(len(A, B)).toBeCloseTo(10, 9);
    expect(area(A, B, C, D)).toBeCloseTo(96, 9);
    expectAnswers('geo-areas-basic-8', [len(A, C), len(B, D), distToLine(A, B, C)]);
  });
});

// ---------------------------------------------------------------- geo-areas-proof
describe('geo-areas-proof', () => {
  it('geo-areas-proof-1', () => {
    const B: P = [0, 0], C: P = [10, 0], A: P = [3, 8];
    const D = lerp(B, C, 2 / 5);
    expect(area(A, B, C)).toBeCloseTo(40, 12);
    expect(area(A, B, D) / area(A, D, C)).toBeCloseTo(len(B, D) / len(D, C), 12);
    expectAnswers('geo-areas-proof-1', [area(A, B, D), area(A, D, C)]);
  });

  it('geo-areas-proof-2', () => {
    const A: P = [0, 0], B: P = [7, 0], D: P = [2, 4];
    const C = add(B, D);
    const O = intersect(A, C, B, D);
    expect(area(A, O, B)).toBeCloseTo(7, 12);
    [area(B, O, C), area(C, O, D), area(D, O, A)].forEach((s) => expect(s).toBeCloseTo(area(A, O, B), 12));
    expectAnswers('geo-areas-proof-2', [area(A, B, C, D)]);
  });

  it('geo-areas-proof-3', () => {
    const D: P = [0, 0], C: P = [16, 0], A: P = [3, 6.25], B: P = [12, 6.25];
    const O = intersect(A, C, B, D);
    expect(area(A, D, C)).toBeCloseTo(50, 12);
    expect(area(D, O, C)).toBeCloseTo(32, 10);
    expect(area(A, O, D)).toBeCloseTo(area(B, O, C), 10);
    expectAnswers('geo-areas-proof-3', [area(B, O, C)]);
  });

  it('geo-areas-proof-4', () => {
    const B: P = [0, 0], C: P = [12, 0], A: P = [4, 8];
    const D = mid(B, C), E = mid(A, D);
    expect(area(A, B, C)).toBeCloseTo(48, 12);
    expect(area(B, E, C)).toBeCloseTo(area(A, B, C) / 2, 12);
    expectAnswers('geo-areas-proof-4', [area(A, B, E), area(B, E, C)]);
  });

  it('geo-areas-proof-5', () => {
    const A: P = [0, 0], B: P = [10, 0], D: P = [3, 6];
    const C = add(B, D);
    const E = lerp(D, C, 2 / 5);
    expect(distToLine(D, A, B)).toBeCloseTo(6, 12);
    expect(area(A, D, E) + area(B, C, E)).toBeCloseTo(area(A, B, E), 12);
    expectAnswers('geo-areas-proof-5', [area(A, B, E), area(A, D, E)]);
  });

  it('geo-areas-proof-6', () => {
    const B: P = [0, 0], C: P = [12, 0], A: P = [4, 6];
    const E = mid(A, C), F = mid(A, B);
    const G = intersect(B, E, C, F);
    expect(area(A, B, C)).toBeCloseTo(36, 12);
    expect(area(B, G, C)).toBeCloseTo(12, 12);
    expect(area(B, G, F)).toBeCloseTo(area(C, G, E), 12);
    expectAnswers('geo-areas-proof-6', [area(B, G, F), area(A, F, G, E)]);
  });

  it('geo-areas-proof-7', () => {
    const D: P = [0, 0], C: P = [10, 0], A: P = [1, 5], B: P = [7, 5];
    const E = mid(B, C);
    expect(len(A, B)).toBeCloseTo(6, 12);
    expect(area(A, D, E)).toBeCloseTo(area(A, B, C, D) / 2, 12);
    // a second, non-symmetric trapezoid also satisfies the claim
    const B2: P = [9, 3], A2: P = [2, 3], D2: P = [-1, 0], C2: P = [13, 0];
    expect(area(A2, D2, mid(B2, C2))).toBeCloseTo(area(A2, B2, C2, D2) / 2, 12);
    expectAnswers('geo-areas-proof-7', [area(A, D, E)]);
  });

  it('geo-areas-proof-8', () => {
    const A: P = [0, 0], B: P = [10, 0], C: P = [12, 6], D: P = [2, 6];
    // find P from the givens S_PAB = 13 and S_PBC = 20
    const y = bisect((t) => area([5, t], A, B) - 13, 0, 6);
    const x = bisect((t) => area([t, y], B, C) - 20, 1, 10);
    const Pt: P = [x, y];
    expect(area(A, B, C, D)).toBeCloseTo(60, 12);
    expect(area(Pt, A, B) + area(Pt, C, D)).toBeCloseTo(30, 9);
    expectAnswers('geo-areas-proof-8', [area(Pt, C, D), area(Pt, A, D)]);
  });
});

// ---------------------------------------------------------------- geo-circle-area
describe('geo-circle-area', () => {
  const O: P = [0, 0];

  it('geo-circle-area-1', () => {
    const circle = arcPoints(O, 6, 0, 360, 200000);
    expectAnswers('geo-circle-area-1', [polylineLength(circle), polyArea(circle.slice(0, -1))], 5);
  });

  it('geo-circle-area-2', () => {
    expectAnswers('geo-circle-area-2', [degreesToRadians(150), radiansToDegrees((3 * Math.PI) / 5)], 10);
  });

  it('geo-circle-area-3', () => {
    const arc = arcPoints(O, 9, 50, 130);
    const l = polylineLength(arc);
    expect(angle(arc[0], O, arc[arc.length - 1])).toBeCloseTo(degreesToRadians(80), 12);
    expectAnswers('geo-circle-area-3', [l, polyArea([O, ...arc]), l + 18], 6);
  });

  it('geo-circle-area-4', () => {
    // find the central angle (degrees) whose arc of radius 5 is 7.5 long, by measuring polyline lengths
    const deg = bisect((d) => polylineLength(arcPoints(O, 5, 0, d, 4000)) - 7.5, 1, 179);
    const arc = arcPoints(O, 5, 0, deg);
    expectAnswers('geo-circle-area-4', [angle(arc[0], O, arc[arc.length - 1]), deg, polyArea([O, ...arc])], 5);
  });

  it('geo-circle-area-5', () => {
    const arc = arcPoints(O, 6, -45, 45);
    expect(angle(arc[0], O, arc[arc.length - 1])).toBeCloseTo(Math.PI / 2, 12);
    expectAnswers('geo-circle-area-5', [polyArea(arc)], 6);
  });

  it('geo-circle-area-6', () => {
    const A: P = [-4, -4], B: P = [4, -4], C: P = [4, 4], D: P = [-4, 4];
    const centre = circumcenter(A, B, C);
    const R = len(centre, A);
    expect(len(centre, D)).toBeCloseTo(R, 12);
    const circle = arcPoints(centre, R, 0, 360, 200000);
    expectAnswers('geo-circle-area-6', [R, polyArea(circle.slice(0, -1)) - area(A, B, C, D)], 5);
  });

  it('geo-circle-area-7', () => {
    const arc = arcPoints(O, 6, 210, 330);
    const A = arc[0], B = arc[arc.length - 1];
    expect(angle(A, O, B)).toBeCloseTo(degreesToRadians(120), 12);
    expectAnswers('geo-circle-area-7', [len(A, B), polyArea(arc), polylineLength(arc) + len(A, B)], 5);
  });

  it('geo-circle-area-8', () => {
    // the answer must not depend on the inner radius: check two different models with AB = 16 tangent to the small circle
    for (const r of [6, 3]) {
      const T: P = [0, -r];
      const B = add(T, [8, 0]);
      const R = len(O, B);
      expect(distToLine(O, add(T, [-8, 0]), B)).toBeCloseTo(r, 12);
      const big = arcPoints(O, R, 0, 360, 200000).slice(0, -1);
      const small = arcPoints(O, r, 0, 360, 200000).slice(0, -1);
      expectAnswers('geo-circle-area-8', [polyArea(big) - polyArea(small)], 4);
    }
  });
});

// ---------------------------------------------------------------- geo-thales
describe('geo-thales', () => {
  it('geo-thales-1', () => {
    // built from the givens only: AD = 4, DB = 6, AE = 5 on an arbitrary direction, C from DE ∥ BC
    const A: P = [6, 8], B: P = [0, 0];
    const D = lerp(A, B, 0.4);
    const E = add(A, mul(unit([9, -8]), 5));
    const C = intersect(A, E, B, add(B, sub(E, D)));
    expect(len(A, D)).toBeCloseTo(4, 12);
    expect(len(D, B)).toBeCloseTo(6, 12);
    expectParallel(D, E, B, C);
    expectAnswers('geo-thales-1', [len(E, C)]);
  });

  it('geo-thales-2', () => {
    const B: P = [0, 0], C: P = [14, 0];
    const A = apex(B, C, 10, 12);
    const D = mid(A, B), E = mid(A, C);
    expectAnswers('geo-thales-2', [len(D, E), len(D, B) + len(B, C) + len(C, E) + len(E, D)]);
  });

  it('geo-thales-3', () => {
    const B: P = [0, 0], C: P = [15, 0];
    const A = apex(B, C, 10, 12);
    const D = lerp(A, B, 0.6);
    const E = intersect(D, add(D, sub(C, B)), A, C);
    expect(len(A, D)).toBeCloseTo(6, 12);
    expectAnswers('geo-thales-3', [len(D, E), len(A, E)]);
  });

  it('geo-thales-4', () => {
    const B: P = [0, 0], C: P = [20, 0];
    const A = apex(B, C, 10, 15);
    const D = add(A, mul(unit(sub(B, A)), 4));
    const E = add(A, mul(unit(sub(C, A)), 6));
    expect(len(D, B)).toBeCloseTo(6, 9);
    expect(len(E, C)).toBeCloseTo(9, 9);
    expectParallel(D, E, B, C);
    expectAnswers('geo-thales-4', [len(D, E)]);
  });

  it('geo-thales-5', () => {
    const D: P = [0, 0], C: P = [14, 0], A: P = [2, 6], B: P = [10, 6];
    const E = mid(A, D), F = mid(B, C);
    const G = intersect(A, C, E, F);
    expectAnswers('geo-thales-5', [len(E, F), len(E, G), len(G, F)]);
  });

  it('geo-thales-6', () => {
    const A = 0, B = 10;
    const p = bisect((x) => Math.abs(x - A) / Math.abs(B - x) - 1.5, A + 1e-9, B - 1e-9);
    const q = bisect((x) => Math.abs(x - A) / Math.abs(B - x) - 1.5, B + 1e-9, 1000);
    // no external point before A: there AQ < QB, so the ratio is below 1
    expect(Math.abs(-5 - A) / Math.abs(B + 5)).toBeLessThan(1);
    expectAnswers('geo-thales-6', [p - A, q - A, q - p]);
  });

  it('geo-thales-7', () => {
    const D: P = [0, 0], C: P = [15, 0], A: P = [3, 6], B: P = [9, 6];
    const E = lerp(A, D, 1 / 3);
    const F = intersect(E, add(E, [1, 0]), B, C);
    expect(len(A, E) / len(E, D)).toBeCloseTo(0.5, 12);
    expectAnswers('geo-thales-7', [len(E, F)]);
  });

  it('geo-thales-8', () => {
    const B: P = [0, 0], C: P = [10, 0], A: P = [2.8, 9.6];
    expect(len(A, C)).toBeCloseTo(12, 12);
    const D = mid(B, C), E = mid(A, D);
    const F = intersect(B, E, A, C);
    // the 1:3 claim holds in another triangle too
    const B2: P = [1, -2], C2: P = [17, 3], A2: P = [5, 11];
    const F2 = intersect(B2, mid(A2, mid(B2, C2)), A2, C2);
    expect(len(A2, F2) / len(A2, C2)).toBeCloseTo(1 / 3, 12);
    expectAnswers('geo-thales-8', [len(A, F), len(F, C)]);
  });
});

// ---------------------------------------------------------------- geo-angle-bisector
describe('geo-angle-bisector', () => {
  it('geo-angle-bisector-1', () => {
    const B: P = [0, 0], C: P = [15, 0];
    const A = apex(B, C, 8, 12);
    const D = bisectorFoot(A, B, C);
    expect(angle(B, A, D)).toBeCloseTo(angle(D, A, C), 12);
    expectAnswers('geo-angle-bisector-1', [len(B, D), len(D, C)]);
  });

  it('geo-angle-bisector-2', () => {
    // B, D, C fixed by BD = 6, DC = 9; A on the circle |AB| = 10 such that AD bisects angle A
    const B: P = [0, 0], C: P = [15, 0];
    const at = (t: number): P => [10 * Math.cos(t), 10 * Math.sin(t)];
    const t = bisect((s) => bisectorFoot(at(s), B, C)[0] - 6, 0.3, 2.8);
    const A = at(t);
    expect(len(B, bisectorFoot(A, B, C))).toBeCloseTo(6, 9);
    expectAnswers('geo-angle-bisector-2', [len(A, C)]);
  });

  it('geo-angle-bisector-3', () => {
    const C: P = [0, 0], A: P = [0, 6], B: P = [8, 0];
    const D = bisectorFoot(A, C, B);
    expectAnswers('geo-angle-bisector-3', [len(C, D), len(D, B), len(A, D)]);
  });

  it('geo-angle-bisector-4', () => {
    const B: P = [-4, 0], C: P = [4, 0];
    const A = apex(B, C, 12, 12);
    const E = bisectorFoot(B, A, C);
    expectAnswers('geo-angle-bisector-4', [len(A, E), len(E, C)]);
  });

  it('geo-angle-bisector-5', () => {
    const A: P = [0, 0], B: P = [8, 0];
    const t = bisect((s) => area(A, B, polar(A, 12, s)) - 40, 1, 89);
    const C = polar(A, 12, t);
    expect(area(A, B, C)).toBeCloseTo(40, 9);
    const D = bisectorFoot(A, B, C);
    expectAnswers('geo-angle-bisector-5', [area(A, B, D), area(A, D, C)]);
  });

  it('geo-angle-bisector-6', () => {
    const B: P = [0, 0], C: P = [20, 0];
    const A = apex(B, C, 10, 15);
    const D = bisectorFoot(A, B, C);
    const E = intersect(D, add(D, sub(C, A)), A, B);
    expect(len(A, E)).toBeCloseTo(len(E, D), 9);
    expectAnswers('geo-angle-bisector-6', [len(B, D), len(D, E)]);
  });

  it('geo-angle-bisector-7', () => {
    // for each x build the triangle AB = 6, BC = 2x + 2, AC = x + 5 and require the true bisector foot at BD = x
    const mismatch = (x: number) => {
      const B: P = [0, 0], C: P = [2 * x + 2, 0];
      const A = apex(B, C, 6, x + 5);
      return len(B, bisectorFoot(A, B, C)) - x;
    };
    const x = bisect(mismatch, 0.01, 8.9);
    expectAnswers('geo-angle-bisector-7', [x, 2 * x + 2]);
  });

  it('geo-angle-bisector-8', () => {
    const B: P = [0, 0], C: P = [10, 0];
    const A = apex(B, C, 8, 12);
    const D = bisectorFoot(A, B, C);
    const E = bisectorFoot(B, A, C);
    const I = intersect(A, D, B, E);
    expectAnswers('geo-angle-bisector-8', [len(B, D), len(A, I) / len(I, D)]);
  });
});

// ---------------------------------------------------------------- geo-similarity
describe('geo-similarity', () => {
  it('geo-similarity-1', () => {
    const B: P = [0, 0], C: P = [6, 0];
    const A = apex(B, C, 4, 8);
    const E: P = [9, 0], F: P = [18, 0];
    const D = apex(E, F, 6, 12);
    expect(angle(B, A, C)).toBeCloseTo(angle(E, D, F), 12);
    expect(angle(A, B, C)).toBeCloseTo(angle(D, E, F), 12);
    expectAnswers('geo-similarity-1', [len(D, E) / len(A, B)]);
  });

  it('geo-similarity-2', () => {
    const B: P = [0, 0], C: P = [8, 0];
    const A = apex(B, C, 6, 7);
    const angA = angle(B, A, C), angB = angle(A, B, C);
    const D: P = [0, 0], E: P = [9, 0];
    const F = intersect(D, [Math.cos(angA), Math.sin(angA)], E, add(E, [-Math.cos(angB), Math.sin(angB)]));
    expect(angle(E, D, F)).toBeCloseTo(angA, 12);
    expect(angle(D, E, F)).toBeCloseTo(angB, 12);
    expectAnswers('geo-similarity-2', [len(E, F), len(D, F)]);
  });

  it('geo-similarity-3', () => {
    const A: P = [0, 0], B: P = [12, 0];
    const C = apex(A, B, 8, 14);
    const D = lerp(A, B, 4 / 12), E = lerp(A, C, 6 / 8);
    expect(angle(A, D, E)).toBeCloseTo(angle(A, C, B), 12);
    expectAnswers('geo-similarity-3', [len(D, E)]);
  });

  it('geo-similarity-4', () => {
    const D: P = [0, 0], C: P = [15, 0];
    const x = bisect((s) => len([s, 8], C) - 14, -10, 14);
    const A: P = [x, 8], B: P = [x + 6, 8];
    const O = intersect(A, C, B, D);
    expect(len(A, C)).toBeCloseTo(14, 9);
    expectAnswers('geo-similarity-4', [len(A, O), len(O, C)]);
  });

  it('geo-similarity-5', () => {
    const A: P = [0, 0], B: P = [10, 0];
    const t = bisect((s) => len(A, foot(B, A, polar(A, 8, s))) - 5, 1, 89);
    const C = polar(A, 8, t);
    const E = foot(B, A, C), F = foot(C, A, B);
    expect(len(A, E)).toBeCloseTo(5, 9);
    expectAnswers('geo-similarity-5', [len(A, F)]);
  });

  it('geo-similarity-6', () => {
    const B: P = [0, 0], C: P = [9, 0];
    const A = apex(B, C, 6, 8);
    const x = bisect((s) => angle(B, A, [s, 0]) - angle(B, C, A), 0.01, 8.99);
    const D: P = [x, 0];
    expectAnswers('geo-similarity-6', [len(B, D), len(A, D)]);
  });

  it('geo-similarity-7', () => {
    const A0: P = [0, 0], B0: P = [10, 0], D0: P = [3, 8], C0: P = [13, 8];
    const build = (g: number) => {
      const G = lerp(D0, C0, g);
      return { G, F: intersect(B0, G, A0, C0), E: intersect(B0, G, A0, D0) };
    };
    const g = bisect((s) => {
      const m = build(s);
      return len(m.F, m.E) / len(m.F, m.G) - 9 / 4;
    }, 0.01, 0.9);
    const m = build(g);
    const k = 4 / len(m.F, m.G); // scale the whole figure so that FG = 4
    const FG = k * len(m.F, m.G), FE = k * len(m.F, m.E), FB = k * len(m.F, B0);
    expect(FG).toBeCloseTo(4, 9);
    expect(FE).toBeCloseTo(9, 9);
    expect(FB * FB).toBeCloseTo(FG * FE, 9);
    expectAnswers('geo-similarity-7', [FB]);
  });

  it('geo-similarity-8', () => {
    const B: P = [0, 0], C: P = [12, 0], A: P = [4, 8];
    expect(distToLine(A, B, C)).toBeCloseTo(8, 12);
    const width = (y: number) => len(intersect(B, A, [0, y], [1, y]), intersect(C, A, [0, y], [1, y]));
    const x = bisect((y) => width(y) - y, 0.01, 7.99);
    expectAnswers('geo-similarity-8', [x]);
  });
});

/** Triangle DEF with D, E given and angles at D, E equal to the angles of ABC at A, B (F above DE). */
function similarOn(A: P, B: P, C: P, D: P, E: P): P {
  const angA = angle(B, A, C), angB = angle(A, B, C);
  const u = unit(sub(E, D));
  const nrm: P = [-u[1], u[0]];
  const dirD = add(mul(u, Math.cos(angA)), mul(nrm, Math.sin(angA)));
  const dirE = add(mul(u, -Math.cos(angB)), mul(nrm, Math.sin(angB)));
  return intersect(D, add(D, dirD), E, add(E, dirE));
}

// ---------------------------------------------------------------- geo-similar-ratios
describe('geo-similar-ratios', () => {
  it('geo-similar-ratios-1', () => {
    const A: P = [0, 0], B: P = [6, 0], C: P = [2, 6];
    const D: P = [9, 0], E: P = [13, 0];
    const F = similarOn(A, B, C, D, E);
    expect(distToLine(C, A, B)).toBeCloseTo(6, 12);
    expect(angle(D, F, E)).toBeCloseTo(angle(A, C, B), 12);
    expectAnswers('geo-similar-ratios-1', [distToLine(F, D, E)]);
  });

  it('geo-similar-ratios-2', () => {
    const B: P = [0, 0], C: P = [15, 0], A: P = [5, 12];
    const H = foot(A, B, C);
    const D = lerp(A, B, 2 / 3);
    const E = intersect(D, add(D, sub(C, B)), A, C);
    const K = intersect(A, H, D, E);
    expect(len(A, H)).toBeCloseTo(12, 12);
    expectAnswers('geo-similar-ratios-2', [len(A, K), distToLine(D, B, C)]);
  });

  it('geo-similar-ratios-3', () => {
    const D: P = [0, 0], C: P = [12, 0], A: P = [3, 10], B: P = [7, 10];
    const O = intersect(A, C, B, D);
    expectAnswers('geo-similar-ratios-3', [distToLine(O, A, B), distToLine(O, D, C)]);
  });

  it('geo-similar-ratios-4', () => {
    const B: P = [0, 0], C: P = [15, 0], A: P = [5, 10];
    const width = (y: number) => len(intersect(B, A, [0, y], [1, y]), intersect(C, A, [0, y], [1, y]));
    expectAnswers('geo-similar-ratios-4', [bisect((y) => width(y) - y, 0.01, 9.99)]);
  });

  it('geo-similar-ratios-5', () => {
    // AB = 6 at height 7 (= OM + ON); the length of DC is found from the distance of O to DC being 5
    const A: P = [4, 7], B: P = [10, 7], D: P = [0, 0];
    const O = (c: number) => intersect(A, [c, 0], B, D);
    const c = bisect((t) => distToLine(O(t), D, [t, 0]) - 5, 7, 100);
    const C: P = [c, 0];
    expect(distToLine(O(c), A, B)).toBeCloseTo(2, 9);
    expectAnswers('geo-similar-ratios-5', [len(D, C), area(A, B, C, D)]);
  });

  it('geo-similar-ratios-6', () => {
    const B: P = [0, 0], C: P = [12, 0], A: P = [4, 9];
    const D = intersect(A, B, [0, 3], [1, 3]), E = intersect(A, C, [0, 3], [1, 3]);
    expectAnswers('geo-similar-ratios-6', [len(D, E), area(D, B, C, E)]);
  });

  it('geo-similar-ratios-7', () => {
    const D: P = [0, 0], C: P = [12, 0], A: P = [2, 6], B: P = [8, 6];
    const O = intersect(A, C, B, D);
    const E = intersect(O, add(O, [1, 0]), A, D), F = intersect(O, add(O, [1, 0]), B, C);
    expect(len(E, O)).toBeCloseTo(len(O, F), 12);
    expectAnswers('geo-similar-ratios-7', [len(E, F)]);
  });

  it('geo-similar-ratios-8', () => {
    const B: P = [0, 0], C: P = [16, 0], A: P = [6, 12];
    const width = (y: number) => len(intersect(B, A, [0, y], [1, y]), intersect(C, A, [0, y], [1, y]));
    const rect = (y: number) => width(y) * y - 45;
    const y1 = bisect(rect, 0.01, 6), y2 = bisect(rect, 6, 11.99);
    const values = [width(y1), width(y2)].sort((p, q) => p - q);
    expectAnswers('geo-similar-ratios-8', values);
  });
});

// ---------------------------------------------------------------- geo-similar-areas
describe('geo-similar-areas', () => {
  it('geo-similar-areas-1', () => {
    const A: P = [0, 0], B: P = [4, 0], C: P = [1, 10];
    const D: P = [20, 0], E: P = [26, 0];
    const F = similarOn(A, B, C, D, E);
    expect(area(A, B, C)).toBeCloseTo(20, 12);
    expectAnswers('geo-similar-areas-1', [area(D, E, F)]);
  });

  it('geo-similar-areas-2', () => {
    const B: P = [0, 0], C: P = [9, 0], A: P = [3, 4];
    expect(area(A, B, C)).toBeCloseTo(18, 12);
    // E F on the x-axis with |EF| = s, D from the angles of B and C; search s with area 50
    const tri = (s: number) => {
      const E: P = [20, 0], F: P = [20 + s, 0];
      return { E, F, D: similarOn(B, C, A, E, F) };
    };
    const s = bisect((t) => {
      const m = tri(t);
      return area(m.D, m.E, m.F) - 50;
    }, 1, 40);
    expectAnswers('geo-similar-areas-2', [len(tri(s).E, tri(s).F)]);
  });

  it('geo-similar-areas-3', () => {
    const B: P = [0, 0], C: P = [20, 0], A: P = [6, 10];
    const D = lerp(A, B, 0.6);
    const E = intersect(D, add(D, sub(C, B)), A, C);
    expect(area(A, B, C)).toBeCloseTo(100, 12);
    expectAnswers('geo-similar-areas-3', [area(A, D, E), area(D, B, C, E)]);
  });

  it('geo-similar-areas-4', () => {
    const D: P = [0, 0], C: P = [12, 0];
    const model = (h: number) => {
      const A: P = [1, h], B: P = [9, h];
      return { A, B, O: intersect(A, C, B, D) };
    };
    const h = bisect((t) => {
      const m = model(t);
      return area(m.A, m.O, m.B) - 16;
    }, 1, 30);
    const { A, B, O } = model(h);
    expectAnswers('geo-similar-areas-4', [area(C, O, D), area(A, O, D), area(A, B, C, D)]);
  });

  it('geo-similar-areas-5', () => {
    const B: P = [0, 0], C: P = [14, 0], A: P = [6, 8];
    expect(len(A, B)).toBeCloseTo(10, 12);
    const cut = (t: number) => {
      const D = lerp(A, B, t);
      return { D, E: intersect(D, add(D, sub(C, B)), A, C) };
    };
    const t = bisect((s) => area(A, cut(s).D, cut(s).E) - area(A, B, C) / 2, 0.01, 0.99);
    expectAnswers('geo-similar-areas-5', [len(A, cut(t).D)]);
  });

  it('geo-similar-areas-6', () => {
    const A: P = [0, 0], C: P = [9, 0];
    const bx = bisect((x) => len([x, 4], A) - 6, 0, 6);
    const B: P = [bx, 4];
    expect(area(A, B, C)).toBeCloseTo(18, 12);
    const xd = bisect((x) => angle(A, B, [x, 0]) - angle(B, C, A), 0.01, 8.99);
    const D: P = [xd, 0];
    expectAnswers('geo-similar-areas-6', [area(A, B, D), area(B, D, C)]);
  });

  it('geo-similar-areas-7', () => {
    const B: P = [0, 0], C: P = [10, 0];
    const model = (t: number, h: number) => {
      const A: P = [3, h];
      const D = lerp(A, B, t);
      return { A, D, E: intersect(D, add(D, sub(C, B)), A, C) };
    };
    // the ratio S_ADE : S_DBE does not depend on the height: find the position of D first, then the height
    const t = bisect((s) => {
      const m = model(s, 5);
      return area(m.A, m.D, m.E) / area(m.D, B, m.E) - 4 / 6;
    }, 0.01, 0.99);
    const h = bisect((s) => {
      const m = model(t, s);
      return area(m.A, m.D, m.E) - 4;
    }, 0.1, 50);
    const { A, D, E } = model(t, h);
    expect(area(D, B, E)).toBeCloseTo(6, 9);
    expectAnswers('geo-similar-areas-7', [area(A, B, C), area(E, B, C)]);
  });

  it('geo-similar-areas-8', () => {
    const smallAreas = (A: P, B: P, C: P, Pt: P) => {
      const through = (u: P, v: P): [P, P] => [Pt, add(Pt, sub(v, u))];
      const [a1, a2] = through(B, C), [b1, b2] = through(C, A), [c1, c2] = through(A, B);
      const onAB = area(Pt, intersect(a1, a2, A, B), intersect(b1, b2, A, B));
      const onBC = area(Pt, intersect(b1, b2, B, C), intersect(c1, c2, B, C));
      const onCA = area(Pt, intersect(c1, c2, C, A), intersect(a1, a2, C, A));
      return [onAB, onBC, onCA];
    };
    // the model of the figure satisfies the givens 16, 4, 9
    const A: P = [0, 0], B: P = [18, 0], C: P = [6, 9], Pt: P = [26 / 3, 4];
    const [s1, s2, s3] = smallAreas(A, B, C, Pt);
    expect(s1).toBeCloseTo(16, 9);
    expect(s2).toBeCloseTo(4, 9);
    expect(s3).toBeCloseTo(9, 9);
    // sanity check of the proved relation in an arbitrary triangle with an arbitrary interior point
    const q = smallAreas([1, 2], [13, -1], [5, 9], [6, 3]);
    expect((Math.sqrt(q[0]) + Math.sqrt(q[1]) + Math.sqrt(q[2])) ** 2).toBeCloseTo(area([1, 2], [13, -1], [5, 9]), 9);
    expectAnswers('geo-similar-areas-8', [area(A, B, C)]);
  });
});

// ---------------------------------------------------------------- geo-similarity-circles
describe('geo-similarity-circles', () => {
  const O: P = [0, 0];

  it('geo-similarity-circles-1', () => {
    // circle R = 6; A, B, C, D in order with AB = 6, DC = 9; the arc BC is chosen so that BE = 4
    const R = 6;
    const arcAB = 60;
    const arcDC = 2 * radiansToDegrees(Math.asin(9 / (2 * R)));
    const build = (x: number) => {
      const A = polar(O, R, 120), B = polar(O, R, 120 - arcAB), C = polar(O, R, 120 - arcAB - x), D = polar(O, R, 120 - arcAB - x - arcDC);
      return { A, B, C, D, E: intersect(A, C, B, D) };
    };
    const x = bisect((t) => len(build(t).B, build(t).E) - 4, 30, 150);
    const { A, B, C, D, E } = build(x);
    expect(len(A, B)).toBeCloseTo(6, 9);
    expect(len(D, C)).toBeCloseTo(9, 9);
    expect(len(B, E)).toBeCloseTo(4, 9);
    expect(angle(B, A, E)).toBeCloseTo(angle(C, D, E), 9);
    expectAnswers('geo-similarity-circles-1', [len(C, E), area(A, B, E) / area(D, C, E)]);
  });

  it('geo-similarity-circles-2', () => {
    const E: P = [0, 0], A: P = [-4, 0], B: P = [6, 0];
    const C = polar(E, 3, 70);
    const centre = circumcenter(A, B, C);
    const D = secondOnCircle(C, E, centre, len(centre, A));
    expectAnswers('geo-similarity-circles-2', [len(E, D)]);
  });

  it('geo-similarity-circles-3', () => {
    const Pt: P = [0, 0], B: P = [4, 0], C: P = [9, 0];
    const centre: P = [6.5, 3];
    const r = len(centre, B);
    expect(len(centre, C)).toBeCloseTo(r, 12);
    // tangent point: the point A on the circle with OA ⊥ PA
    const onCircle = (t: number) => polar(centre, r, t);
    const t = bisect((s) => dot(sub(onCircle(s), centre), sub(onCircle(s), Pt)), 100, 200);
    const A = onCircle(t);
    expect(angle(Pt, A, centre)).toBeCloseTo(Math.PI / 2, 9);
    expectAnswers('geo-similarity-circles-3', [len(Pt, A)]);
  });

  it('geo-similarity-circles-4', () => {
    // BC is unknown: choose it so that the bisector AD has length 4 (AB = 6, AC = 8)
    const model = (a: number) => {
      const B: P = [0, 0], C: P = [a, 0];
      const A = apex(B, C, 6, 8);
      return { A, B, C, D: bisectorFoot(A, B, C) };
    };
    const a = bisect((s) => len(model(s).A, model(s).D) - 4, 2.5, 13.5);
    const { A, B, C, D } = model(a);
    const centre = circumcenter(A, B, C);
    const E = secondOnCircle(A, D, centre, len(centre, A));
    expectAnswers('geo-similarity-circles-4', [len(A, E), len(D, E)]);
  });

  it('geo-similarity-circles-5', () => {
    const B: P = [0, 0], C: P = [14, 0], A: P = [5, 12];
    expect(len(A, B)).toBeCloseTo(13, 12);
    expect(len(A, C)).toBeCloseTo(15, 12);
    expect(distToLine(A, B, C)).toBeCloseTo(12, 12);
    const centre = circumcenter(A, B, C);
    const E = sub(mul(centre, 2), A);
    const D = foot(A, B, C);
    expect(angle(A, B, D)).toBeCloseTo(angle(A, E, C), 9);
    expectAnswers('geo-similarity-circles-5', [len(A, E), len(centre, A)]);
  });

  it('geo-similarity-circles-6', () => {
    const Pt: P = [0, 0], A: P = [4, 0], B: P = [9, 0];
    const C = polar(Pt, 3, 35);
    const centre = circumcenter(A, B, C);
    const D = secondOnCircle(C, Pt, centre, len(centre, A));
    expectAnswers('geo-similarity-circles-6', [len(Pt, D), len(C, D)]);
  });

  it('geo-similarity-circles-7', () => {
    const R = 5;
    const A = polar(O, R, 90);
    const tc = bisect((s) => len(A, polar(O, R, s)) - 9, 90, 270);
    const C = polar(O, R, tc);
    const build = (beta: number) => {
      const B = polar(O, R, 90 + beta), D = polar(O, R, 90 - beta);
      return { B, D, E: intersect(A, C, B, D) };
    };
    const beta = bisect((b) => len(A, build(b).E) - 4, 10, 120);
    const { B, D, E } = build(beta);
    expect(len(A, B)).toBeCloseTo(len(A, D), 12);
    expect(len(E, C)).toBeCloseTo(5, 9);
    expectAnswers('geo-similarity-circles-7', [len(A, B)]);
  });

  it('geo-similarity-circles-8', () => {
    for (const bc of [12, 9]) {
      const B: P = [0, 0], C: P = [bc, 0];
      const A = apex(B, C, 10, 8);
      const centre = circumcenter(A, B, C);
      const u = unit(sub(A, centre));
      const tangent: P = [-u[1], u[0]];
      const D = add(A, mul(unit(sub(B, A)), 4));
      const E = intersect(D, add(D, tangent), A, C);
      expect(angle(A, D, E)).toBeCloseTo(angle(A, C, B), 9);
      expectAnswers('geo-similarity-circles-8', [len(A, E)]);
    }
  });
});

// ---------------------------------------------------------------- geo-similarity-review
describe('geo-similarity-review', () => {
  it('geo-similarity-review-1', () => {
    const B: P = [0, 0], C: P = [15, 0];
    const A = apex(B, C, 12, 8);
    const D = bisectorFoot(A, B, C);
    const E = intersect(D, add(D, sub(A, B)), A, C);
    expectAnswers('geo-similarity-review-1', [len(B, D), len(D, E), area(C, D, E) / area(A, B, D, E)]);
  });

  it('geo-similarity-review-2', () => {
    const D: P = [0, 0], C: P = [15, 0], A: P = [2, 8], B: P = [11, 8];
    const O = intersect(A, C, B, D);
    expectAnswers('geo-similarity-review-2', [distToLine(O, A, B), area(A, O, D)]);
  });

  it('geo-similarity-review-3', () => {
    const E: P = [0, 0], A: P = [-6, 0], B: P = [5, 0];
    const D = polar(E, 10, 245);
    const centre = circumcenter(A, B, D);
    const C = secondOnCircle(D, E, centre, len(centre, A));
    expectAnswers('geo-similarity-review-3', [len(C, E), area(A, E, C) / area(D, E, B)]);
  });

  it('geo-similarity-review-4', () => {
    const B: P = [0, 0], C: P = [12, 0];
    const x = bisect((s) => len(B, mid([s, 8], C)) - 12, -12, 40);
    const A: P = [x, 8];
    const E = mid(A, C), F = mid(A, B);
    const G = intersect(B, E, C, F);
    expect(area(A, B, C)).toBeCloseTo(48, 12);
    expect(len(B, E)).toBeCloseTo(12, 9);
    expectParallel(F, E, B, C);
    expectAnswers('geo-similarity-review-4', [len(G, E), area(G, F, E)]);
  });

  it('geo-similarity-review-5', () => {
    const B: P = [0, 0], C: P = [21, 0], A: P = [7, 14];
    const top = (y: number) => [intersect(B, A, [0, y], [1, y]), intersect(C, A, [0, y], [1, y])];
    const y = bisect((s) => len(top(s)[0], top(s)[1]) - 2 * s, 0.01, 13.99);
    const [G, F] = top(y);
    expectAnswers('geo-similarity-review-5', [y, len(G, F), area(A, G, F) / area(A, B, C)]);
  });

  it('geo-similarity-review-6', () => {
    for (const bc of [14, 10]) {
      const B: P = [0, 0], C: P = [bc, 0];
      const A = apex(B, C, 6, 12);
      const D = bisectorFoot(A, B, C);
      const E = intersect(D, add(D, sub(A, B)), A, C);
      const F = intersect(D, add(D, sub(C, A)), A, B);
      [len(F, D), len(D, E), len(E, A)].forEach((side) => expect(side).toBeCloseTo(len(A, F), 9));
      expectAnswers('geo-similarity-review-6', [len(A, F), area(A, F, D, E) / area(A, B, C)]);
    }
  });
});
