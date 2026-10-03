/**
 * Independent numeric verification of the Euclidean-geometry lessons (geometry-a.ts).
 * Every figure is rebuilt here as a concrete coordinate model constructed from the GIVENS only
 * (rays at given angles, circles of given radii, points found by bisection on a measured condition).
 * Each numeric answer is then MEASURED in the model (distances, angles from dot products, line
 * intersections) — never recomputed from the closed forms written in the solutions.
 * Proof exercises get a numeric sanity check: the claimed equal segments / angles really are equal.
 */
import { describe, expect, it } from 'vitest';
import { geometryAContent } from './geometry-a';
import { bisect, degreesToRadians, distance, radiansToDegrees } from '../../problems/verify';

type Point = [number, number];

const ex = (id: string) =>
  Object.values(geometryAContent)
    .flatMap((lesson) => lesson.exercises)
    .find((e) => e.id === id)!;

const tested = new Set<string>();

/** Compares the exercise's answers (in order) with values measured in the model. */
function expectAnswers(id: string, measured: number[], digits = 8) {
  tested.add(id);
  const answers = ex(id).answers ?? [];
  expect(answers.length, `${id}: number of answers`).toBe(measured.length);
  answers.forEach((answer, index) => expect(answer.value, `${id}: ${answer.label}`).toBeCloseTo(measured[index], digits));
}

const add = (p: Point, q: Point): Point => [p[0] + q[0], p[1] + q[1]];
const sub = (p: Point, q: Point): Point => [p[0] - q[0], p[1] - q[1]];
const mul = (p: Point, k: number): Point => [p[0] * k, p[1] * k];
const dot = (u: Point, v: Point) => u[0] * v[0] + u[1] * v[1];
const cross = (u: Point, v: Point) => u[0] * v[1] - u[1] * v[0];
const len = (p: Point, q: Point) => distance(p[0], p[1], q[0], q[1]);
const mid = (p: Point, q: Point): Point => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
/** Unit vector at `deg` degrees from the positive x-axis. */
const dir = (deg: number): Point => [Math.cos(degreesToRadians(deg)), Math.sin(degreesToRadians(deg))];
const polar = (c: Point, r: number, deg: number): Point => add(c, mul(dir(deg), r));

/** The angle PVQ in degrees, measured from the coordinates. */
function angle(p: Point, v: Point, q: Point): number {
  const a = sub(p, v);
  const b = sub(q, v);
  return radiansToDegrees(Math.acos(Math.max(-1, Math.min(1, dot(a, b) / (Math.hypot(...a) * Math.hypot(...b))))));
}

/** Intersection of line P1P2 with line P3P4. */
function intersect(p1: Point, p2: Point, p3: Point, p4: Point): Point {
  const d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
  const a = p1[0] * p2[1] - p1[1] * p2[0];
  const b = p3[0] * p4[1] - p3[1] * p4[0];
  return [(a * (p3[0] - p4[0]) - (p1[0] - p2[0]) * b) / d, (a * (p3[1] - p4[1]) - (p1[1] - p2[1]) * b) / d];
}

/** Foot of the perpendicular from P to line AB. */
function foot(p: Point, a: Point, b: Point): Point {
  const d = sub(b, a);
  return add(a, mul(d, dot(sub(p, a), d) / dot(d, d)));
}

/** A point on the internal bisector of angle PVQ (sum of the unit vectors along VP and VQ). */
function bisectorPoint(v: Point, p: Point, q: Point): Point {
  const u1 = sub(p, v);
  const u2 = sub(q, v);
  return add(v, add(mul(u1, 1 / Math.hypot(...u1)), mul(u2, 1 / Math.hypot(...u2))));
}

/** Rotation of P about C by `deg` degrees (counter-clockwise). */
function rotate(p: Point, c: Point, deg: number): Point {
  const [x, y] = sub(p, c);
  const co = Math.cos(degreesToRadians(deg));
  const si = Math.sin(degreesToRadians(deg));
  return add(c, [x * co - y * si, x * si + y * co]);
}

/** Distance from P to line AB. */
function lineDist(p: Point, a: Point, b: Point): number {
  return Math.abs(cross(sub(b, a), sub(p, a))) / len(a, b);
}

/** Which side of line AB the point P lies on (+1 / -1). */
const side = (p: Point, a: Point, b: Point) => Math.sign(cross(sub(b, a), sub(p, a)));

describe('geo-angles', () => {
  it('geo-angles-1', () => {
    // AB horizontal through O, CD at the angle AOC = 3x+10; solve "BOD measured = 5x-30" for x.
    const O: Point = [0, 0];
    const A: Point = [-5, 0];
    const B: Point = [5, 0];
    const model = (x: number) => {
      const C = polar(O, 4, 180 - (3 * x + 10));
      return { C, D: mul(C, -1) };
    };
    const x = bisect((t) => angle(B, O, model(t).D) - (5 * t - 30), 10, 30);
    const { C, D } = model(x);
    expect(angle(A, O, C)).toBeCloseTo(3 * x + 10, 9);
    expectAnswers('geo-angles-1', [x, angle(A, O, D)]);
  });

  it('geo-angles-2', () => {
    // AB: y = 4, CD: y = 0; the transversal leaves G at the angle AGH = 2x+15; solve "GHD measured = 3x-20".
    const G: Point = [0, 4];
    const A: Point = [-5, 4];
    const B: Point = [5, 4];
    const C: Point = [-5, 0];
    const D: Point = [5, 0];
    const H = (x: number) => intersect(G, add(G, dir(180 + 2 * x + 15)), C, D);
    const x = bisect((t) => angle(G, H(t), D) - (3 * t - 20), 20, 50);
    expect(angle(A, G, H(x))).toBeCloseTo(2 * x + 15, 9);
    expectAnswers('geo-angles-2', [x, angle(B, G, H(x))]);
  });

  it('geo-angles-3', () => {
    const B: Point = [0, 4];
    const A: Point = [6, 4];
    const D: Point = [0, 0];
    const C: Point = [6, 0];
    const E = intersect(B, add(B, dir(-40)), D, add(D, dir(35)));
    expect(angle(A, B, E)).toBeCloseTo(40, 9);
    expect(angle(C, D, E)).toBeCloseTo(35, 9);
    expect(E[1] > 0 && E[1] < 4).toBe(true);
    expectAnswers('geo-angles-3', [angle(B, E, D)]);
  });

  it('geo-angles-4', () => {
    // The ray from B at the angle ABC = 5k; the exterior angle at C is fixed by bisection; then k from the measured ratio A : B = 3 : 5.
    const B: Point = [0, 0];
    const C: Point = [7, 0];
    const D: Point = [10, 0];
    const model = (k: number, gamma: number) => intersect(B, add(B, dir(5 * k)), C, add(C, dir(180 - gamma)));
    const gamma = bisect((g) => angle(model(16.5, g), C, D) - 128, 20, 80);
    const k = bisect((t) => angle(B, model(t, gamma), C) / angle(model(t, gamma), B, C) - 3 / 5, 10, 20);
    const A = model(k, gamma);
    expect(angle(A, C, D)).toBeCloseTo(128, 9);
    expectAnswers('geo-angles-4', [angle(B, A, C), angle(A, B, C), angle(A, C, B)]);
  });

  it('geo-angles-5', () => {
    // Build regular n-gons and measure: find n whose interior angle is 5 times the adjacent exterior angle.
    const regular = (n: number) => Array.from({ length: n }, (_, i) => polar([0, 0], 1, (360 * i) / n));
    const interior = (pts: Point[], i: number) => angle(pts[(i + pts.length - 1) % pts.length], pts[i], pts[(i + 1) % pts.length]);
    const matches = [];
    for (let n = 3; n <= 60; n += 1) {
      const a = interior(regular(n), 0);
      if (Math.abs(a - 5 * (180 - a)) < 1e-9) matches.push(n);
    }
    expect(matches).toHaveLength(1);
    const pts = regular(matches[0]);
    const sum = pts.reduce((total, _, i) => total + interior(pts, i), 0);
    expectAnswers('geo-angles-5', [matches[0], sum]);
  });

  it('geo-angles-6', () => {
    const G: Point = [0, 4];
    const A: Point = [-5, 4];
    const B: Point = [5, 4];
    const C: Point = [-5, 0];
    const D: Point = [5, 0];
    const E = polar(G, 2, 70);
    const H = intersect(G, E, C, D);
    const K = intersect(G, bisectorPoint(G, B, H), C, D);
    expect(angle(E, G, B)).toBeCloseTo(70, 9);
    expect(angle(B, G, K)).toBeCloseTo(angle(K, G, H), 9);
    expect(side(A, C, D)).toBe(side(B, C, D));
    expectAnswers('geo-angles-6', [angle(G, K, H), angle(G, H, K)]);
  });

  it('geo-angles-7', () => {
    // For two different shapes: fix angle B, find angle C by bisection so that the measured BIC is 125°; then measure A.
    for (const b of [60, 80]) {
      const B: Point = [0, 0];
      const C: Point = [8, 0];
      const apex = (c: number) => intersect(B, add(B, dir(b)), C, add(C, dir(180 - c)));
      const incenter = (A: Point) => intersect(B, bisectorPoint(B, A, C), C, bisectorPoint(C, A, B));
      const c = bisect((t) => angle(B, incenter(apex(t)), C) - 125, 5, 100 - b + 19);
      const A = apex(c);
      expect(angle(B, incenter(A), C)).toBeCloseTo(125, 9);
      expectAnswers('geo-angles-7', [angle(B, A, C)]);
    }
  });

  it('geo-angles-8', () => {
    // Two different quadrilaterals with angle C = 100° and angle D = 70°.
    for (const [a, b] of [
      [5, 4.2],
      [3.5, 5],
    ]) {
      const D: Point = [0, 0];
      const C: Point = [6.5, 0];
      const A = polar(D, a, 70);
      const B = polar(C, b, 80);
      expect(angle(B, C, D)).toBeCloseTo(100, 9);
      expect(angle(C, D, A)).toBeCloseTo(70, 9);
      const E = intersect(A, bisectorPoint(A, D, B), B, bisectorPoint(B, A, C));
      expectAnswers('geo-angles-8', [angle(A, E, B)]);
    }
  });
});

describe('geo-triangles-basic', () => {
  it('geo-triangles-basic-1', () => {
    // AB = AC = 1 with the apex angle 40° built from two rays.
    const A: Point = [0, 0];
    const B = polar(A, 1, -110);
    const C = polar(A, 1, -70);
    expect(angle(B, A, C)).toBeCloseTo(40, 9);
    expectAnswers('geo-triangles-basic-1', [angle(A, B, C)]);
  });

  it('geo-triangles-basic-2', () => {
    const C: Point = [0, 0];
    const B: Point = [8, 0];
    const y = bisect((t) => len([0, t], B) - 17, 0, 17);
    const A: Point = [0, y];
    expect(len(A, B)).toBeCloseTo(17, 9);
    expectAnswers('geo-triangles-basic-2', [len(A, C)]);
  });

  it('geo-triangles-basic-3', () => {
    // A is the intersection of the circles (B, 13) and (C, 13), found by bisection.
    const B: Point = [0, 0];
    const C: Point = [10, 0];
    const x = bisect((t) => len([t, 1], B) - len([t, 1], C), 0, 10);
    const y = bisect((t) => len([x, t], B) - 13, 0, 13);
    const A: Point = [x, y];
    expect(len(A, C)).toBeCloseTo(13, 9);
    const D = foot(A, B, C);
    expectAnswers('geo-triangles-basic-3', [len(B, D), len(A, D)]);
  });

  it('geo-triangles-basic-4', () => {
    // Isosceles triangle with base angles beta; D on BC with DA = DC; solve "BAD measured = 54°" for beta.
    const B: Point = [-1, 0];
    const C: Point = [1, 0];
    const model = (beta: number) => {
      const A: Point = [0, Math.tan(degreesToRadians(beta))];
      const x = bisect((t) => len([t, 0], A) - len([t, 0], C), -1, 1);
      return { A, D: [x, 0] as Point };
    };
    const beta = bisect((t) => angle(B, model(t).A, model(t).D) - 54, 30, 59);
    const { A, D } = model(beta);
    expect(len(A, B)).toBeCloseTo(len(A, C), 9);
    expect(len(A, D)).toBeCloseTo(len(D, C), 9);
    expectAnswers('geo-triangles-basic-4', [angle(A, B, C), angle(A, D, B)]);
  });

  it('geo-triangles-basic-5', () => {
    const O: Point = [0, 0];
    const A: Point = [-4, 0];
    const B = polar(A, 7, 50);
    const C = mul(A, -1);
    const D = mul(B, -1);
    expect(len(A, O)).toBeCloseTo(len(O, C), 12);
    expect(len(B, O)).toBeCloseTo(len(O, D), 12);
    expect(angle(O, A, B)).toBeCloseTo(50, 9);
    expectAnswers('geo-triangles-basic-5', [len(C, D), angle(O, C, D)]);
  });

  it('geo-triangles-basic-6', () => {
    const B: Point = [0, 0];
    const C: Point = [6, 0];
    const A = rotate(C, B, 60);
    const D = add(C, mul(sub(C, B), len(C, A) / len(B, C)));
    expect(len(A, B)).toBeCloseTo(6, 9);
    expect(len(A, C)).toBeCloseTo(6, 9);
    expect(len(C, D)).toBeCloseTo(len(C, A), 9);
    expectAnswers('geo-triangles-basic-6', [angle(B, A, D), len(A, D)]);
  });

  it('geo-triangles-basic-7', () => {
    // B is 8 units above the line AC with AB = 10, on the side where the foot E falls on the segment AC.
    const A: Point = [0, 0];
    const C: Point = [10, 0];
    const x = bisect((t) => len([t, 8], A) - 10, 0, 10);
    const B: Point = [x, 8];
    const E = foot(B, A, C);
    expect(len(B, E)).toBeCloseTo(8, 9);
    expect(E[0] > 0 && E[0] < 10).toBe(true);
    expectAnswers('geo-triangles-basic-7', [len(A, E), len(B, C)]);
  });

  it('geo-triangles-basic-8', () => {
    // AB = 1 on AX; C on AY with BC = 1; D on AX with CD = 1; E on AY with DE = 1 (each found by bisection).
    const A: Point = [0, 0];
    const B: Point = [1, 0];
    const onY = (t: number) => polar(A, t, 20);
    const C = onY(bisect((t) => len(onY(t), B) - 1, 1.2, 3));
    const D: Point = [bisect((t) => len([t, 0], C) - 1, 1.5, 4), 0];
    const E = onY(bisect((t) => len(onY(t), D) - 1, len(A, C) + 0.1, 6));
    expect([len(B, C), len(C, D), len(D, E)].every((d) => Math.abs(d - 1) < 1e-9)).toBe(true);
    expectAnswers('geo-triangles-basic-8', [angle(B, C, D), angle(C, D, E)]);
  });
});

describe('geo-triangles-advanced', () => {
  it('geo-triangles-advanced-1', () => {
    const B: Point = [0, 0];
    const C: Point = [14, 0];
    const x = bisect((t) => {
      const y = Math.sqrt(100 - t * t);
      return len([t, y], C) - 12;
    }, 2, 9.99);
    const A: Point = [x, Math.sqrt(100 - x * x)];
    expect(len(A, B)).toBeCloseTo(10, 9);
    expect(len(A, C)).toBeCloseTo(12, 9);
    const D = mid(A, B);
    const E = mid(A, C);
    expectAnswers('geo-triangles-advanced-1', [len(D, E), len(A, D) + len(D, E) + len(E, A)]);
  });

  it('geo-triangles-advanced-2', () => {
    const C: Point = [0, 0];
    const A: Point = [0, 6];
    const B: Point = [8, 0];
    expectAnswers('geo-triangles-advanced-2', [len(C, mid(A, B))]);
  });

  it('geo-triangles-advanced-3', () => {
    const C: Point = [0, 0];
    const B: Point = [5, 0];
    const y = bisect((t) => angle(C, [0, t], B) - 30, 1, 30);
    const A: Point = [0, y];
    const D = foot(C, A, B);
    expectAnswers('geo-triangles-advanced-3', [len(A, B), len(B, D), len(A, D)]);
  });

  it('geo-triangles-advanced-4', () => {
    const B: Point = [0, 0];
    const C: Point = [10, 0];
    const A = intersect(B, polar(B, 1, 70), C, polar(C, 1, 150));
    expect(angle(A, B, C)).toBeCloseTo(70, 9);
    expect(angle(A, C, B)).toBeCloseTo(30, 9);
    const D = foot(A, B, C);
    const E = intersect(A, bisectorPoint(A, B, C), B, C);
    expect(D[0] < E[0]).toBe(true);
    expectAnswers('geo-triangles-advanced-4', [angle(D, A, E)]);
  });

  it('geo-triangles-advanced-5', () => {
    const C: Point = [0, 0];
    const A: Point = [0, 6];
    const B: Point = [8, 0];
    const G = intersect(C, mid(A, B), A, mid(B, C));
    expectAnswers('geo-triangles-advanced-5', [len(C, G), len(A, G)]);
  });

  it('geo-triangles-advanced-6', () => {
    const B: Point = [0, 0];
    const A: Point = [0, 4];
    const c = bisect((t) => len(B, mid(A, [t, 0])) - 4, 1, 20);
    const C: Point = [c, 0];
    expect(len(B, mid(A, C))).toBeCloseTo(len(A, B), 9);
    expectAnswers('geo-triangles-advanced-6', [angle(A, C, B), len(B, C)]);
  });

  it('geo-triangles-advanced-7', () => {
    const C: Point = [0, 0];
    const A: Point = [10, 0];
    const B = intersect(A, polar(A, 1, 180 - 32), C, [0, 1]);
    expect(angle(B, A, C)).toBeCloseTo(32, 9);
    const D = foot(C, A, B);
    const M = mid(A, B);
    const E = intersect(C, bisectorPoint(C, A, B), A, B);
    expectAnswers('geo-triangles-advanced-7', [angle(D, C, M), angle(E, C, D)]);
  });

  it('geo-triangles-advanced-8', () => {
    // A(0,0), C(12,0); B = (7, y) with y chosen by bisection so that the measured BF is 10.
    const A: Point = [0, 0];
    const C: Point = [12, 0];
    const model = (y: number) => {
      const B: Point = [7, y];
      const D = mid(B, C);
      const E = mid(A, D);
      return { B, E, F: intersect(B, E, A, C) };
    };
    const y = bisect((t) => len(model(t).B, model(t).F) - 10, 1, 20);
    const { B, E, F } = model(y);
    expect(len(B, F)).toBeCloseTo(10, 9);
    expectAnswers('geo-triangles-advanced-8', [len(A, F), len(E, F)]);
  });
});

/** Marks a proof exercise as sanity-checked (it has no numeric answers). */
function sanity(id: string) {
  expect(ex(id).answers, `${id} is a proof exercise`).toBeUndefined();
  tested.add(id);
}

/** All intersection points of the circles (c1, r1) and (c2, r2), found by scanning circle 1 and bisecting. */
function circleCircle(c1: Point, r1: number, c2: Point, r2: number): Point[] {
  const f = (t: number) => len(polar(c1, r1, t), c2) - r2;
  const roots: Point[] = [];
  const steps = 3600;
  for (let i = 0; i < steps; i += 1) {
    const a = (360 * i) / steps;
    const b = (360 * (i + 1)) / steps;
    if (Math.sign(f(a)) !== Math.sign(f(b))) roots.push(polar(c1, r1, bisect(f, a, b)));
  }
  return roots;
}

/** Intersections of line P + t·u with the circle (c, r), found by bisection on t (P inside the circle). */
function lineCircle(p: Point, u: Point, c: Point, r: number): [Point, Point] {
  const at = (t: number) => add(p, mul(u, t));
  const far = 4 * r + len(p, c);
  return [at(bisect((t) => len(at(t), c) - r, -far, 0)), at(bisect((t) => len(at(t), c) - r, 0, far))];
}

/** The two tangent points from an external point P to the circle (c, r): points T with OT ⟂ PT, by bisection. */
function tangentPoints(c: Point, r: number, p: Point): [Point, Point] {
  const base = radiansToDegrees(Math.atan2(p[1] - c[1], p[0] - c[0]));
  const f = (phi: number) => {
    const t = polar(c, r, base + phi);
    return dot(sub(t, c), sub(t, p));
  };
  return [polar(c, r, base + bisect(f, 0, 90)), polar(c, r, base - bisect(f, 0, 90))];
}

describe('geo-triangles-proof', () => {
  it('geo-triangles-proof-1', () => {
    // D is the second intersection of the circles (A, AB) and (C, CB).
    const A: Point = [0, 4];
    const C: Point = [0, -6];
    const B: Point = [-3.5, 0.5];
    const D = circleCircle(A, len(A, B), C, len(C, B)).find((p) => len(p, B) > 0.1)!;
    expect(len(A, D)).toBeCloseTo(len(A, B), 9);
    expect(len(C, D)).toBeCloseTo(len(C, B), 9);
    expect(angle(B, A, C)).toBeCloseTo(angle(D, A, C), 8);
    sanity('geo-triangles-proof-1');
  });

  it('geo-triangles-proof-2', () => {
    const A: Point = [-5, 1.2];
    const B: Point = [1.8, 4];
    const C = mul(A, -1);
    const D = mul(B, -1);
    expect(len(A, B)).toBeCloseTo(len(C, D), 12);
    expect(cross(sub(B, A), sub(D, C))).toBeCloseTo(0, 12);
    sanity('geo-triangles-proof-2');
  });

  it('geo-triangles-proof-3', () => {
    const A: Point = [0, 7];
    const B: Point = [-6, 0];
    const C: Point = [6, 0];
    const u = mul(sub(C, B), 1 / len(B, C));
    for (const t of [0.5, 2.2, 4]) {
      const D = add(B, mul(u, t));
      const E = sub(C, mul(u, t));
      expect(len(A, D)).toBeCloseTo(len(A, E), 12);
    }
    sanity('geo-triangles-proof-3');
  });

  it('geo-triangles-proof-4', () => {
    const A: Point = [0.0, 8];
    const B: Point = [-4, 0];
    const C: Point = [4, 0];
    expect(len(B, mid(A, C))).toBeCloseTo(len(C, mid(A, B)), 12);
    sanity('geo-triangles-proof-4');
  });

  it('geo-triangles-proof-5', () => {
    const A: Point = [0, 0];
    const B = polar(A, 1, -115);
    const C = polar(A, 1, -65);
    expect(angle(B, A, C)).toBeCloseTo(50, 9);
    const E = foot(B, A, C);
    const F = foot(C, A, B);
    const H = intersect(B, E, C, F);
    expect(len(B, E)).toBeCloseTo(len(C, F), 12);
    expectAnswers('geo-triangles-proof-5', [angle(B, H, C)]);
  });

  it('geo-triangles-proof-6', () => {
    // A = (a, 6) over the base B(-4.5,0)C(4.5,0): DE = DF happens only at a = 0, where AB = AC.
    const B: Point = [-4.5, 0];
    const C: Point = [4.5, 0];
    const D = mid(B, C);
    const g = (a: number) => len(D, foot(D, [a, 6], B)) - len(D, foot(D, [a, 6], C));
    const a = bisect(g, -3, 3);
    expect(Math.abs(g(1))).toBeGreaterThan(0.1);
    expect(len([a, 6], B)).toBeCloseTo(len([a, 6], C), 9);
    sanity('geo-triangles-proof-6');
  });

  it('geo-triangles-proof-7', () => {
    for (const A of [
      [2.6, 5.2],
      [5, 3],
    ] as Point[]) {
      const B: Point = [0, 0];
      const C: Point = [7, 0];
      const D = rotate(B, A, -60);
      const E = rotate(C, A, 60);
      expect(side(D, A, B)).toBe(-side(C, A, B));
      expect(side(E, A, C)).toBe(-side(B, A, C));
      expect(len(D, B)).toBeCloseTo(len(A, B), 12);
      expect(len(E, C)).toBeCloseTo(len(A, C), 12);
      expect(len(B, E)).toBeCloseTo(len(C, D), 12);
    }
    sanity('geo-triangles-proof-7');
  });

  it('geo-triangles-proof-8', () => {
    const A: Point = [0, 0];
    const B: Point = [6, 0];
    const C: Point = [0, 8];
    const M = mid(B, C);
    const D = sub(mul(M, 2), A);
    expect(len(A, B)).toBeCloseTo(len(D, C), 12);
    expect(cross(sub(B, A), sub(D, C))).toBeCloseTo(0, 12);
    expect(angle(A, C, D)).toBeCloseTo(90, 9);
    expect(len(A, D)).toBeCloseTo(len(B, C), 12);
    expectAnswers('geo-triangles-proof-8', [len(A, M)]);
  });
});

describe('geo-quadrilaterals-basic', () => {
  it('geo-quadrilaterals-basic-1', () => {
    const A: Point = [0, 0];
    const B: Point = [7, 0];
    const model = (t: number) => {
      const D = polar(A, 4.5, t);
      return { D, C: add(B, D) };
    };
    const t = bisect((s) => angle(B, A, model(s).D) - 2 * angle(A, B, model(s).C), 91, 179);
    const { D, C } = model(t);
    expectAnswers('geo-quadrilaterals-basic-1', [angle(B, A, D), angle(A, B, C)]);
  });

  it('geo-quadrilaterals-basic-2', () => {
    // A rhombus of side 1 with angle 2α at A; α from the measured diagonal ratio 16 : 12, then scaled.
    const A: Point = [0, 0];
    const model = (alpha: number) => {
      const B = polar(A, 1, -alpha);
      const D = polar(A, 1, alpha);
      return { B, D, C: add(B, D) };
    };
    const alpha = bisect((s) => len(A, model(s).C) / len(model(s).B, model(s).D) - 16 / 12, 1, 89);
    const { B, C, D } = model(alpha);
    const k = 16 / len(A, C);
    expect(k * len(B, D)).toBeCloseTo(12, 9);
    expectAnswers('geo-quadrilaterals-basic-2', [k * len(A, B), k * (len(A, B) + len(B, C) + len(C, D) + len(D, A))]);
  });

  it('geo-quadrilaterals-basic-3', () => {
    const model = (phi: number) => {
      const w = 10 * Math.cos(degreesToRadians(phi));
      const h = 10 * Math.sin(degreesToRadians(phi));
      return { A: [0, 0] as Point, B: [w, 0] as Point, C: [w, h] as Point, D: [0, h] as Point };
    };
    const phi = bisect((s) => {
      const { A, C, D } = model(s);
      return angle(A, mid(A, C), D) - 60;
    }, 1, 89);
    const { A, B, C, D } = model(phi);
    expect(len(A, C)).toBeCloseTo(10, 12);
    expectAnswers('geo-quadrilaterals-basic-3', [len(A, D), len(A, B)]);
  });

  it('geo-quadrilaterals-basic-4', () => {
    const D: Point = [-10.5, 0];
    const C: Point = [10.5, 0];
    const y = bisect((t) => len([-4.5, t], D) - 10, 0.1, 10);
    const A: Point = [-4.5, y];
    const B: Point = [4.5, y];
    expect(len(A, B)).toBeCloseTo(9, 12);
    expect(len(B, C)).toBeCloseTo(10, 9);
    expectAnswers('geo-quadrilaterals-basic-4', [lineDist(A, D, C), len(A, C)]);
  });

  it('geo-quadrilaterals-basic-5', () => {
    const A: Point = [0, 0];
    const D: Point = [10, 0];
    const B = polar(A, 6, 80);
    const C = add(B, D);
    expect(angle(A, B, C)).toBeCloseTo(100, 9);
    const E = intersect(A, bisectorPoint(A, B, D), B, C);
    expectAnswers('geo-quadrilaterals-basic-5', [len(E, C), angle(A, E, B)]);
  });

  it('geo-quadrilaterals-basic-6', () => {
    const B: Point = [0, 0];
    const D: Point = [16, 0];
    const A: Point = [8, bisect((t) => len([8, t], B) - 10, 0, 10)];
    const C: Point = [8, -bisect((t) => len([8, t], B) - 17, 0, 17)];
    expect(len(A, D)).toBeCloseTo(10, 9);
    expect(len(C, D)).toBeCloseTo(17, 9);
    expect(side(A, B, D)).toBe(-side(C, B, D));
    expectAnswers('geo-quadrilaterals-basic-6', [len(A, C)]);
  });

  it('geo-quadrilaterals-basic-7', () => {
    for (const theta of [70, 55]) {
      const A: Point = [0, 0];
      const D: Point = [8, 0];
      const B = polar(A, 5, theta);
      const C = add(B, D);
      const E = intersect(A, bisectorPoint(A, B, D), B, C);
      const F = intersect(D, bisectorPoint(D, A, C), B, C);
      const G = intersect(A, E, D, F);
      expectAnswers('geo-quadrilaterals-basic-7', [len(E, F), angle(A, G, D)]);
    }
  });

  it('geo-quadrilaterals-basic-8', () => {
    const A: Point = [0, 0];
    const B: Point = [4, 0];
    const C: Point = [4, 4];
    const D: Point = [0, 4];
    const E: Point = [2, bisect((t) => len([2, t], A) - 4, 0, 4)];
    expect(len(B, E)).toBeCloseTo(4, 9);
    expectAnswers('geo-quadrilaterals-basic-8', [angle(A, D, E), angle(D, E, C)]);
  });
});

describe('geo-quadrilaterals-advanced', () => {
  it('geo-quadrilaterals-advanced-1', () => {
    const D: Point = [0, 0];
    const C: Point = [14, 0];
    const A: Point = [2.5, 5];
    const B: Point = [10.5, 5];
    expect(len(A, B)).toBe(8);
    expectAnswers('geo-quadrilaterals-advanced-1', [len(mid(A, D), mid(B, C))]);
  });

  it('geo-quadrilaterals-advanced-2', () => {
    const A: Point = [0, 0];
    const B: Point = [5, -4];
    const C: Point = [14, 0];
    const D: Point = [11, 4];
    expect(len(A, C)).toBe(14);
    expect(len(B, D)).toBeCloseTo(10, 12);
    const quad = [mid(A, B), mid(B, C), mid(C, D), mid(D, A)];
    const perimeter = quad.reduce((total, p, i) => total + len(p, quad[(i + 1) % 4]), 0);
    expectAnswers('geo-quadrilaterals-advanced-2', [perimeter]);
  });

  it('geo-quadrilaterals-advanced-3', () => {
    const D: Point = [0, 0];
    const A = polar(D, 1, 80);
    const B = add(A, [1, 0]);
    const C = intersect(D, [1, 0], B, add(B, dir(110)));
    expect(angle(C, D, A)).toBeCloseTo(80, 9);
    expect(angle(B, C, D)).toBeCloseTo(70, 9);
    expect(len(A, D)).toBeCloseTo(len(A, B), 12);
    expectAnswers('geo-quadrilaterals-advanced-3', [angle(D, B, C), angle(A, B, C)]);
  });

  it('geo-quadrilaterals-advanced-4', () => {
    const D: Point = [0, 0];
    const C: Point = [14, 0];
    const A: Point = [3, 6];
    const B: Point = [9, 6];
    const E = mid(A, D);
    const F = mid(B, C);
    const K = intersect(E, F, B, D);
    const L = intersect(E, F, A, C);
    expectAnswers('geo-quadrilaterals-advanced-4', [len(E, K), len(K, L)]);
  });

  it('geo-quadrilaterals-advanced-5', () => {
    const B: Point = [0, 0];
    const C: Point = [6, 0];
    const A = polar(B, 6, 60);
    const D = add(A, C);
    expect(angle(A, B, C)).toBeCloseTo(60, 9);
    expectAnswers('geo-quadrilaterals-advanced-5', [len(A, C), len(B, D)]);
  });

  it('geo-quadrilaterals-advanced-6', () => {
    const D: Point = [0, 0];
    const A = polar(D, 5, 60);
    const B = add(A, [5, 0]);
    const C: Point = [bisect((t) => len([t, 0], B) - 5, B[0], B[0] + 5), 0];
    expect(len(A, D)).toBeCloseTo(5, 12);
    expect(len(B, C)).toBeCloseTo(5, 9);
    expectAnswers('geo-quadrilaterals-advanced-6', [len(D, C), len(mid(A, D), mid(B, C))]);
  });

  it('geo-quadrilaterals-advanced-7', () => {
    const D: Point = [-7, 0];
    const C: Point = [7, 0];
    const h = bisect((t) => dot(sub(C, [-3, t]), sub(D, [3, t])), 1, 30);
    const A: Point = [-3, h];
    const B: Point = [3, h];
    expect(angle(A, intersect(A, C, B, D), B)).toBeCloseTo(90, 9);
    expect(len(A, D)).toBeCloseTo(len(B, C), 12);
    expectAnswers('geo-quadrilaterals-advanced-7', [lineDist(A, D, C), len(A, D)]);
  });

  it('geo-quadrilaterals-advanced-8', () => {
    // A(0,0), D(14,0), B(p,q) with BD = 12; p by bisection so that the measured AF is 15.
    const A: Point = [0, 0];
    const D: Point = [14, 0];
    const model = (p: number) => {
      const B: Point = [p, Math.sqrt(144 - (14 - p) ** 2)];
      const C = add(B, D);
      return { B, C, E: mid(A, D), F: mid(B, C) };
    };
    const p = bisect((t) => len(A, model(t).F) - 15, 2.1, 14);
    const { B, C, E, F } = model(p);
    expect(len(B, D)).toBeCloseTo(12, 9);
    expect(len(A, F)).toBeCloseTo(15, 9);
    const K = intersect(A, F, B, D);
    const L = intersect(C, E, B, D);
    expectAnswers('geo-quadrilaterals-advanced-8', [len(K, L), len(A, K)]);
  });
});

describe('geo-quadrilaterals-proof', () => {
  it('geo-quadrilaterals-proof-1', () => {
    const A: Point = [0, 0];
    const B: Point = [10, 0];
    const D: Point = [3, 5];
    const C = add(B, D);
    const E: Point = [3.5, 0];
    const F = sub(C, [3.5, 0]);
    expect(len(A, F)).toBeCloseTo(len(E, C), 12);
    expect(cross(sub(F, A), sub(C, E))).toBeCloseTo(0, 12);
    sanity('geo-quadrilaterals-proof-1');
  });

  it('geo-quadrilaterals-proof-2', () => {
    const A: Point = [0, 0];
    const B: Point = [10, 0];
    const D: Point = [3, 6];
    const C = add(B, D);
    const O = intersect(A, C, B, D);
    for (const t of [70, 110, 135]) {
      const E = intersect(O, polar(O, 1, t), A, B);
      const F = intersect(O, polar(O, 1, t), D, C);
      expect(len(O, E)).toBeCloseTo(len(O, F), 12);
    }
    sanity('geo-quadrilaterals-proof-2');
  });

  it('geo-quadrilaterals-proof-3', () => {
    const A: Point = [0, 0];
    const B: Point = [9, -1.5];
    const C: Point = [11, 5];
    const D: Point = [2.5, 6.5];
    const [K, L, M, N] = [mid(A, B), mid(B, C), mid(C, D), mid(D, A)];
    expect(len(K, L)).toBeCloseTo(len(N, M), 12);
    expect(cross(sub(L, K), sub(M, N))).toBeCloseTo(0, 12);
    sanity('geo-quadrilaterals-proof-3');
  });

  it('geo-quadrilaterals-proof-4', () => {
    for (const theta of [70, 50]) {
      const A: Point = [0, 0];
      const D: Point = [10, 0];
      const B = polar(A, 5, theta);
      const C = add(B, D);
      const E = intersect(A, bisectorPoint(A, B, D), B, C);
      const F = intersect(C, bisectorPoint(C, B, D), A, D);
      expect(len(A, E)).toBeCloseTo(len(F, C), 12);
      expect(cross(sub(E, A), sub(C, F))).toBeCloseTo(0, 12);
    }
    sanity('geo-quadrilaterals-proof-4');
  });

  it('geo-quadrilaterals-proof-5', () => {
    // א: a parallelogram whose diagonal AC lies on the bisector of angle A (the x-axis) has AB = AD.
    const A: Point = [0, 0];
    const B = polar(A, 5, -35);
    const d = bisect((t) => add(B, polar(A, t, 35))[1], 1, 20);
    expect(d).toBeCloseTo(len(A, B), 9);
    // ב: a rhombus of side 1 and angle 2α, with α from the diagonal ratio 24 : 10, then scaled.
    const model = (alpha: number) => {
      const P = polar(A, 1, -alpha);
      const Q = polar(A, 1, alpha);
      return { P, Q, R: add(P, Q) };
    };
    const alpha = bisect((s) => len(A, model(s).R) / len(model(s).P, model(s).Q) - 24 / 10, 1, 89);
    const { P, Q, R } = model(alpha);
    const k = 24 / len(A, R);
    expect(k * len(P, Q)).toBeCloseTo(10, 9);
    expectAnswers('geo-quadrilaterals-proof-5', [k * (len(A, P) + len(P, R) + len(R, Q) + len(Q, A))]);
  });

  it('geo-quadrilaterals-proof-6', () => {
    const A: Point = [0, 0];
    const B: Point = [11, 0];
    const C: Point = [11, 6.5];
    const D: Point = [0, 6.5];
    const quad = [mid(A, B), mid(B, C), mid(C, D), mid(D, A)];
    const sides = quad.map((p, i) => len(p, quad[(i + 1) % 4]));
    for (const s of sides) expect(s).toBeCloseTo(sides[0], 12);
    sanity('geo-quadrilaterals-proof-6');
  });

  it('geo-quadrilaterals-proof-7', () => {
    const A: Point = [0, 0];
    const B: Point = [12, 0];
    const D = polar(A, 7, 60);
    const C = add(B, D);
    const bA = bisectorPoint(A, B, D);
    const bB = bisectorPoint(B, A, C);
    const bC = bisectorPoint(C, B, D);
    const bD = bisectorPoint(D, C, A);
    const P = intersect(A, bA, B, bB);
    const Q = intersect(B, bB, C, bC);
    const R = intersect(C, bC, D, bD);
    const S = intersect(D, bD, A, bA);
    const quad = [P, Q, R, S];
    quad.forEach((v, i) => expect(angle(quad[(i + 3) % 4], v, quad[(i + 1) % 4])).toBeCloseTo(90, 9));
    expect(Math.min(len(P, Q), len(Q, R))).toBeGreaterThan(1);
    sanity('geo-quadrilaterals-proof-7');
  });

  it('geo-quadrilaterals-proof-8', () => {
    // A(a,h), B(a+7,h) over D(0,0), C(17,0); a(h) makes AC = BD, then h from AC = 13.
    const D: Point = [0, 0];
    const C: Point = [17, 0];
    const shift = (h: number) => bisect((a) => len([a, h], C) - len([a + 7, h], D), 0, 10);
    const check = shift(3);
    expect(len([check, 3], D)).toBeCloseTo(len([check + 7, 3], C), 9);
    const h = bisect((t) => len([shift(t), t], C) - 13, 0.5, 12);
    const A: Point = [shift(h), h];
    const B: Point = [shift(h) + 7, h];
    expect(len(B, D)).toBeCloseTo(13, 9);
    expectAnswers('geo-quadrilaterals-proof-8', [lineDist(A, D, C), len(B, C)]);
  });
});

describe('geo-circles-basic', () => {
  it('geo-circles-basic-1', () => {
    const O: Point = [0, 0];
    const A = polar(O, 5, 215);
    const B = polar(O, 5, 325);
    expect(angle(A, O, B)).toBeCloseTo(110, 9);
    for (const [c, d] of [
      [105, 280],
      [40, 250],
    ]) {
      expectAnswers('geo-circles-basic-1', [angle(A, polar(O, 5, c), B), angle(A, polar(O, 5, d), B)]);
    }
  });

  it('geo-circles-basic-2', () => {
    const O: Point = [0, 0];
    const chord = (d: number) => {
      const [A, B] = lineCircle([0, -d], [1, 0], O, 13);
      return len(A, B);
    };
    const d = bisect((t) => chord(t) - 24, 0, 12.9);
    expectAnswers('geo-circles-basic-2', [d]);
  });

  it('geo-circles-basic-3', () => {
    const O: Point = [0, 0];
    const A: Point = [-5, 0];
    const B: Point = [5, 0];
    const C = polar(O, 5, bisect((t) => angle(polar(O, 5, t), A, B) - 35, 1, 179));
    for (const d of [245, 300]) {
      const D = polar(O, 5, d);
      expect(side(D, A, B)).toBe(-side(C, A, B));
      expectAnswers('geo-circles-basic-3', [angle(A, B, C), angle(B, D, C)]);
    }
  });

  it('geo-circles-basic-4', () => {
    const O: Point = [0, 0];
    const at = (d: number) => tangentPoints(O, 4, [d, 0]);
    const d = bisect((t) => angle(at(t)[0], [t, 0], at(t)[1]) - 50, 4.5, 40);
    const [A, B] = at(d);
    expect(angle(O, A, [d, 0])).toBeCloseTo(90, 9);
    expectAnswers('geo-circles-basic-4', [angle(A, O, B), angle(O, A, B)]);
  });

  it('geo-circles-basic-5', () => {
    const O: Point = [0, 0];
    const P: Point = [13, 0];
    const [A, B] = tangentPoints(O, 5, P);
    for (const c of [20, -35]) {
      const C = polar(O, 5, c);
      const tangent = add(C, [-C[1], C[0]]);
      const D = intersect(C, tangent, P, A);
      const E = intersect(C, tangent, P, B);
      expectAnswers('geo-circles-basic-5', [len(P, A), len(P, D) + len(D, E) + len(E, P)]);
    }
  });

  it('geo-circles-basic-6', () => {
    const A: Point = [0, 12];
    const B: Point = [0, -12];
    const O1: Point = [-bisect((x) => len([-x, 0], A) - 13, 0, 13), 0];
    const O2: Point = [bisect((x) => len([x, 0], A) - 15, 0, 15), 0];
    expect(len(O1, B)).toBeCloseTo(13, 9);
    expect(len(O2, B)).toBeCloseTo(15, 9);
    expectAnswers('geo-circles-basic-6', [len(O1, O2)]);
  });

  it('geo-circles-basic-7', () => {
    // Tangent line y = 0 touches (O1, 9) at A; O2 = (x, 4) is placed so that the circles touch externally.
    const A: Point = [0, 0];
    const O1: Point = [0, 9];
    const x = bisect((t) => len(O1, [t, 4]) - 13, 0, 13);
    const O2: Point = [x, 4];
    const B = foot(O2, A, [1, 0]);
    const T = add(O1, mul(sub(O2, O1), 9 / len(O1, O2)));
    expect(len(O2, T)).toBeCloseTo(4, 9);
    expect(len(O2, B)).toBeCloseTo(4, 12);
    expectAnswers('geo-circles-basic-7', [len(A, B)]);
  });

  it('geo-circles-basic-8', () => {
    const B: Point = [0, 0];
    const C: Point = [1, 0];
    const A = intersect(B, dir(50), C, add(C, dir(120)));
    expect(angle(B, A, C)).toBeCloseTo(70, 9);
    const O = intersect(mid(A, B), add(mid(A, B), [-(B[1] - A[1]), B[0] - A[0]]), mid(A, C), add(mid(A, C), [-(C[1] - A[1]), C[0] - A[0]]));
    expect(len(O, A)).toBeCloseTo(len(O, B), 12);
    const perp: Point = [-(A[1] - O[1]), A[0] - O[0]];
    const T = [add(A, perp), sub(A, perp)].find((p) => side(p, A, B) === -side(C, A, B))!;
    expectAnswers('geo-circles-basic-8', [angle(O, A, B), angle(O, A, C), angle(T, A, B)]);
  });
});

describe('geo-circles-proof', () => {
  it('geo-circles-proof-1', () => {
    const O: Point = [0, 0];
    const P = polar(O, 10, 25);
    const [A, B] = tangentPoints(O, 4, P);
    expect(angle(A, P, O)).toBeCloseTo(angle(B, P, O), 9);
    expect(len(P, A)).toBeCloseTo(len(P, B), 9);
    sanity('geo-circles-proof-1');
  });

  it('geo-circles-proof-2', () => {
    const O: Point = [0, 0];
    const [A, B, C, D] = [polar(O, 5, 160), polar(O, 5, 340), polar(O, 5, 40), polar(O, 5, 220)];
    const quad = [A, C, B, D];
    quad.forEach((v, i) => expect(angle(quad[(i + 3) % 4], v, quad[(i + 1) % 4])).toBeCloseTo(90, 9));
    sanity('geo-circles-proof-2');
  });

  it('geo-circles-proof-3', () => {
    const A: Point = [3.2, 7];
    const B: Point = [0, 0];
    const C: Point = [9, 0];
    const E = foot(B, A, C);
    const F = foot(C, A, B);
    const M = mid(B, C);
    expect(len(M, E)).toBeCloseTo(len(M, B), 12);
    expect(len(M, F)).toBeCloseTo(len(M, B), 12);
    expect(angle(A, E, F)).toBeCloseTo(angle(A, B, C), 9);
    sanity('geo-circles-proof-3');
  });

  it('geo-circles-proof-4', () => {
    // Two parallel chords (direction 25°) at different distances from the centre.
    const O: Point = [0, 0];
    const u = dir(25);
    const n = dir(115);
    const [A, B] = lineCircle(mul(n, 2), u, O, 5);
    const [C, D] = lineCircle(mul(n, -3.5), u, O, 5);
    expect(cross(sub(B, A), sub(D, C))).toBeCloseTo(0, 9);
    const X = intersect(A, C, B, D);
    const within = (p: Point, q: Point) => Math.abs(len(p, X) + len(X, q) - len(p, q)) < 1e-9;
    expect(within(A, C) && within(B, D)).toBe(false);
    expect(len(A, C)).toBeCloseTo(len(B, D), 9);
    sanity('geo-circles-proof-4');
  });

  it('geo-circles-proof-5', () => {
    const O: Point = [0, 0];
    const M = polar(O, 6, 250);
    const [A, B] = lineCircle(M, dir(160), O, 10);
    expect(angle(O, M, A)).toBeCloseTo(90, 9);
    expect(len(A, M)).toBeCloseTo(len(M, B), 9);
    expectAnswers('geo-circles-proof-5', [len(A, B)]);
  });

  it('geo-circles-proof-6', () => {
    const A: Point = [2.5, 7];
    const B: Point = [0, 0];
    const C: Point = [10, 0];
    const I = intersect(B, bisectorPoint(B, A, C), C, bisectorPoint(C, A, B));
    const [D, E, F] = [foot(I, B, C), foot(I, A, C), foot(I, A, B)];
    expect(len(I, E)).toBeCloseTo(len(I, D), 12);
    expect(len(I, F)).toBeCloseTo(len(I, D), 12);
    expect(angle(F, A, I)).toBeCloseTo(angle(E, A, I), 9);
    sanity('geo-circles-proof-6');
  });

  it('geo-circles-proof-7', () => {
    // Circle (6,6), r = 6 touches x = 0, y = 0 and y = 12. BC is the second tangent from B(9,12), found by bisection.
    const Q: Point = [6, 6];
    const D: Point = [0, 0];
    const A: Point = [0, 12];
    const B: Point = [9, 12];
    const theta = bisect((t) => lineDist(Q, B, add(B, dir(t))) - 6, -89.9, -40);
    const C = intersect(B, add(B, dir(theta)), D, [1, 0]);
    for (const [p, q] of [
      [A, B],
      [B, C],
      [C, D],
      [D, A],
    ]) {
      expect(lineDist(Q, p, q)).toBeCloseTo(6, 9);
    }
    expect(len(A, B) + len(C, D)).toBeCloseTo(len(A, D) + len(B, C), 9);
    expectAnswers('geo-circles-proof-7', [len(D, C), len(B, C)]);
  });

  it('geo-circles-proof-8', () => {
    const O1: Point = [0, 9];
    const O2: Point = [bisect((t) => len(O1, [t, 4]) - 13, 0, 13), 4];
    const A: Point = [0, 0];
    const B = foot(O2, A, [1, 0]);
    const T = add(O1, mul(sub(O2, O1), 9 / len(O1, O2)));
    expect(len(O2, T)).toBeCloseTo(4, 9);
    expect(angle(A, T, B)).toBeCloseTo(90, 9);
    sanity('geo-circles-proof-8');
  });
});

describe('geometry-a coverage', () => {
  const all = Object.values(geometryAContent).flatMap((lesson) => lesson.exercises);

  it('every exercise was verified (numeric answers) or sanity-checked (proofs) above', () => {
    expect(all.length).toBe(72);
    expect(all.filter((e) => !tested.has(e.id)).map((e) => e.id)).toEqual([]);
  });

  it('every exercise that refers to a figure has one', () => {
    for (const e of all) if (e.statement.includes('ראו שרטוט')) expect(e.figureSvg, e.id).toBeDefined();
  });
});
