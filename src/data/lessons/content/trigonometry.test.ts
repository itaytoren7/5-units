/**
 * Independent numeric verification of the trigonometry lessons.
 * Geometry answers are recomputed from explicit coordinate models (vertices placed with Math.cos / Math.sin),
 * measuring lengths (distance), angles (dot products), areas (shoelace) and radii (circumcentre).
 * Values defined by a condition are found numerically (bisect / findRoots on the geometric condition);
 * equation answers are found by scanning the interval for every root; identities are checked at many angles.
 * Nothing re-evaluates the closed form written in a solution.
 */
import { describe, expect, it } from 'vitest';
import { trigonometryContent } from './trigonometry';
import { bisect, degreesToRadians, distance, findRoots, radiansToDegrees } from '../../problems/verify';

type Point = [number, number];

const ex = (id: string) =>
  Object.values(trigonometryContent)
    .flatMap((lesson) => lesson.exercises)
    .find((e) => e.id === id)!;

function answers(id: string): number[] {
  const exercise = ex(id);
  expect(exercise, id).toBeDefined();
  expect(exercise.answers, `${id} has answers`).toBeDefined();
  return exercise.answers!.map((a) => a.value);
}

/** Compare every answer of an exercise, in order, with independently computed values. */
function expectAnswers(id: string, computed: number[], digits = 8) {
  const given = answers(id);
  expect(given.length, `${id}: number of answers`).toBe(computed.length);
  given.forEach((value, index) => expect(value, `${id} answer #${index + 1}`).toBeCloseTo(computed[index], digits));
}

const rad = degreesToRadians;
const deg = radiansToDegrees;
const sind = (d: number) => Math.sin(rad(d));
const cosd = (d: number) => Math.cos(rad(d));
const tand = (d: number) => Math.tan(rad(d));

function pol(r: number, angleDeg: number, origin: Point = [0, 0]): Point {
  return [origin[0] + r * Math.cos(rad(angleDeg)), origin[1] + r * Math.sin(rad(angleDeg))];
}
function add(p: Point, q: Point): Point {
  return [p[0] + q[0], p[1] + q[1]];
}
function sub(p: Point, q: Point): Point {
  return [p[0] - q[0], p[1] - q[1]];
}
function scale(p: Point, k: number): Point {
  return [p[0] * k, p[1] * k];
}
function mid(p: Point, q: Point): Point {
  return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
}
function len(p: Point, q: Point): number {
  return distance(p[0], p[1], q[0], q[1]);
}
/** Angle PVQ in degrees, from the dot product. */
function angleAt(v: Point, p: Point, q: Point): number {
  const a = sub(p, v);
  const b = sub(q, v);
  return deg(Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))));
}
function shoelace(points: Point[]): number {
  let sum = 0;
  points.forEach(([x1, y1], index) => {
    const [x2, y2] = points[(index + 1) % points.length];
    sum += x1 * y2 - x2 * y1;
  });
  return Math.abs(sum) / 2;
}
/** Intersection of line P1P2 with line P3P4. */
function intersect(p1: Point, p2: Point, p3: Point, p4: Point): Point {
  const d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
  const a = p1[0] * p2[1] - p1[1] * p2[0];
  const b = p3[0] * p4[1] - p3[1] * p4[0];
  return [(a * (p3[0] - p4[0]) - (p1[0] - p2[0]) * b) / d, (a * (p3[1] - p4[1]) - (p1[1] - p2[1]) * b) / d];
}
/** Foot of the perpendicular from p to line ab. */
function foot(p: Point, a: Point, b: Point): Point {
  const t = ((p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1])) / len(a, b) ** 2;
  return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
}
/** Circumcentre as the intersection of two perpendicular bisectors. */
function circumcenter(a: Point, b: Point, c: Point): Point {
  const mab = mid(a, b);
  const mbc = mid(b, c);
  return intersect(mab, [mab[0] - (b[1] - a[1]), mab[1] + (b[0] - a[0])], mbc, [mbc[0] - (c[1] - b[1]), mbc[1] + (c[0] - b[0])]);
}
/** Point C on the ray from A in direction `dirDeg` with |BC| = d (all solutions, by root finding along the ray). */
function pointsOnRayAtDistance(a: Point, dirDeg: number, b: Point, d: number, maxT = 100): Point[] {
  return findRoots((t) => len(pol(t, dirDeg, a), b) - d, 1e-9, maxT, 20000).map((t) => pol(t, dirDeg, a));
}
/** Polyline approximation of a circular arc (counter-clockwise from a to b, degrees). */
function arcPoints(center: Point, r: number, fromDeg: number, toDeg: number, n = 20000): Point[] {
  return Array.from({ length: n + 1 }, (_, i) => pol(r, fromDeg + ((toDeg - fromDeg) * i) / n, center));
}
/** Richardson extrapolation of a polygon approximation whose error is O(1/n²). */
function richardson(approx: (n: number) => number, n: number): number {
  return (4 * approx(2 * n) - approx(n)) / 3;
}
function polylineLength(points: Point[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) total += len(points[i - 1], points[i]);
  return total;
}
/**
 * Every root of f on [a, b]: sign changes plus tangential zeros (local minima of |f| that reach 0).
 * The scan is widened slightly so that roots at the endpoints are not missed.
 */
function allRoots(f: (x: number) => number, a: number, b: number, steps = 20000): number[] {
  const pad = (b - a) * 1e-4;
  const lo = a - pad;
  const hi = b + pad;
  const roots = findRoots(f, lo, hi, steps);
  const h = (hi - lo) / steps;
  for (let i = 1; i < steps; i += 1) {
    const x0 = lo + (i - 1) * h;
    const x1 = lo + i * h;
    const x2 = lo + (i + 1) * h;
    if (Math.abs(f(x1)) <= Math.abs(f(x0)) && Math.abs(f(x1)) <= Math.abs(f(x2)) && Math.abs(f(x1)) < 1e-3) {
      let l = x0;
      let r = x2;
      for (let k = 0; k < 200; k += 1) {
        const m1 = l + (r - l) / 3;
        const m2 = r - (r - l) / 3;
        if (Math.abs(f(m1)) < Math.abs(f(m2))) r = m2;
        else l = m1;
      }
      const x = (l + r) / 2;
      if (Math.abs(f(x)) < 1e-9) roots.push(x);
    }
  }
  // drop sign changes across poles (e.g. of tan) and anything outside [a, b]
  const sorted = roots.filter((x) => x >= a - 1e-7 && x <= b + 1e-7 && Math.abs(f(x)) < 1e-6).sort((p, q) => p - q);
  return sorted.filter((x, i) => i === 0 || Math.abs(x - sorted[i - 1]) > 1e-5);
}
/** Check an identity numerically at many angles (degrees), skipping points where either side is undefined. */
function expectIdentity(lhs: (a: number) => number, rhs: (a: number) => number, angles: number[] = [-170, -95, -40, -7, 12, 33, 58, 77, 101, 146, 199, 251, 318]) {
  let checked = 0;
  for (const a of angles) {
    const l = lhs(a);
    const r = rhs(a);
    if (!Number.isFinite(l) || !Number.isFinite(r) || Math.abs(l) > 1e6 || Math.abs(r) > 1e6) continue;
    expect(l, `identity at ${a}°`).toBeCloseTo(r, 9);
    checked += 1;
  }
  expect(checked).toBeGreaterThan(5);
}

describe('trig-basics', () => {
  it('trig-basics-1', () => {
    // A radian is the arc length on the unit circle: measure the arc of 135° with a fine polyline,
    // and turn the arc 5π/6 into degrees as a fraction of the measured full circumference.
    const arc135 = richardson((n) => polylineLength(arcPoints([0, 0], 1, 0, 135, n)), 4000);
    const circumference = richardson((n) => polylineLength(arcPoints([0, 0], 1, 0, 360, n)), 4000);
    expectAnswers('trig-basics-1', [arc135, (360 * ((5 * Math.PI) / 6)) / circumference], 9);
  });

  it('trig-basics-2', () => {
    expectAnswers('trig-basics-2', [sind(150) + cosd(120) + tand(135) + sind(390)]);
  });

  it('trig-basics-3', () => {
    const alpha = bisect((a) => cosd(a) + 0.6, 90, 180);
    const p = pol(1, alpha);
    expect(p[0]).toBeCloseTo(-0.6, 10);
    expect(p[1]).toBeGreaterThan(0);
    expectAnswers('trig-basics-3', [p[1], p[1] / p[0], alpha]);
  });

  it('trig-basics-4', () => {
    for (const a of [13, 47, 100, 161, 222, 300, -35]) {
      const value = (sind(180 - a) * cosd(-a)) / (cosd(90 - a) * cosd(180 - a));
      expect(value).toBeCloseTo(answers('trig-basics-4')[0], 9);
    }
  });

  it('trig-basics-5', () => {
    const arc = arcPoints([0, 0], 9, 20, 160);
    expect(angleAt([0, 0], arc[0], arc[arc.length - 1])).toBeCloseTo(140, 9);
    const arcLength = richardson((n) => polylineLength(arcPoints([0, 0], 9, 20, 160, n)), 4000);
    const sector = richardson((n) => shoelace([[0, 0], ...arcPoints([0, 0], 9, 20, 160, n)]), 4000);
    expectAnswers('trig-basics-5', [arcLength, sector], 8);
  });

  it('trig-basics-6', () => {
    const far = pol(5, 150);
    const slope = far[1] / far[0];
    const x = bisect((t) => t * t + (slope * t) ** 2 - 1, -1, 0);
    const p: Point = [x, slope * x];
    expect(p[1]).toBeGreaterThan(0);
    expectAnswers('trig-basics-6', [slope, p[0], p[1]]);
  });

  it('trig-basics-7', () => {
    // perimeter 2r + arc = 20 fixes the arc for each r; the sector area (polygon of the arc) must be 24.
    const area = (r: number) => {
      const theta = (20 - 2 * r) / r;
      return richardson((n) => shoelace([[0, 0], ...arcPoints([0, 0], r, 0, deg(theta), n)]), 1000) - 24;
    };
    const roots = findRoots(area, 2.5, 9.9, 40);
    expect(roots.length).toBe(2);
    const thetas = roots.map((r) => (20 - 2 * r) / r);
    thetas.forEach((t) => expect(t).toBeLessThan(2 * Math.PI));
    expectAnswers('trig-basics-7', [roots[0], thetas[0], roots[1], thetas[1]], 8);
  });

  it('trig-basics-8', () => {
    const a = pol(10, 210);
    const b = pol(10, 330);
    expect(angleAt([0, 0], a, b)).toBeCloseTo(120, 9);
    const segment = richardson((n) => shoelace(arcPoints([0, 0], 10, 210, 330, n)), 4000);
    expectAnswers('trig-basics-8', [len(a, b), segment], 8);
  });
});

describe('trig-identities', () => {
  it('trig-identities-1', () => {
    const alpha = Math.asin(3 / 5);
    expectAnswers('trig-identities-1', [Math.cos(alpha), Math.tan(alpha)]);
  });

  it('trig-identities-2', () => {
    expectAnswers('trig-identities-2', [sind(75), cosd(75)]);
  });

  it('trig-identities-3', () => {
    const alpha = bisect((a) => cosd(a) + 0.6, 180, 270);
    expectAnswers('trig-identities-3', [sind(2 * alpha), cosd(2 * alpha)]);
  });

  it('trig-identities-7', () => {
    const alpha = deg(Math.atan(2));
    const beta = deg(Math.atan(1 / 3));
    expectAnswers('trig-identities-7', [sind(alpha - beta), alpha - beta]);
  });

  it('trig-identities-4', () => {
    expectIdentity((a) => sind(2 * a) / (1 + cosd(2 * a)), tand);
  });

  it('trig-identities-5', () => {
    expectIdentity((a) => (sind(a) - cosd(a)) ** 2, (a) => 1 - sind(2 * a));
    const solutions = findRoots((a) => sind(a) - cosd(a) - 1 / 3, 0, 360);
    expect(solutions.length).toBe(2);
    for (const a of solutions) expectAnswers('trig-identities-5', [sind(2 * a)]);
  });

  it('trig-identities-6', () => {
    expectIdentity((a) => sind(30 + a) - cosd(60 + a), (a) => Math.sqrt(3) * sind(a));
  });

  it('trig-identities-8', () => {
    expectIdentity((a) => sind(3 * a), (a) => 3 * sind(a) - 4 * sind(a) ** 3);
    for (const a of [deg(Math.asin(1 / 3)), 180 - deg(Math.asin(1 / 3))]) expectAnswers('trig-identities-8', [sind(3 * a)]);
  });
});

describe('trig-equations', () => {
  it('trig-equations-1', () => {
    expectAnswers('trig-equations-1', allRoots((x) => sind(x) - 0.5, 0, 360), 7);
  });

  it('trig-equations-2', () => {
    expectAnswers('trig-equations-2', allRoots((x) => cosd(x) + Math.SQRT2 / 2, 0, 360), 7);
  });

  it('trig-equations-3', () => {
    expectAnswers('trig-equations-3', allRoots((x) => sind(2 * x - 30) - Math.sqrt(3) / 2, 0, 360), 7);
  });

  it('trig-equations-4', () => {
    const roots = allRoots((x) => tand(3 * x + 15) - 1, 0, 180).filter((x) => x < 180 - 1e-9);
    expectAnswers('trig-equations-4', roots, 7);
  });

  it('trig-equations-5', () => {
    expectAnswers('trig-equations-5', allRoots((x) => sind(x) + Math.sqrt(3) * cosd(x), 0, 360), 7);
  });

  it('trig-equations-6', () => {
    const roots = allRoots((x) => cosd(3 * x) - cosd(x + 40), 0, 180).filter((x) => x < 180 - 1e-9);
    expectAnswers('trig-equations-6', roots, 7);
  });

  it('trig-equations-7', () => {
    expectAnswers('trig-equations-7', allRoots((x) => sind(2 * x) - Math.sqrt(3) * sind(x), 0, 360), 6);
  });

  it('trig-equations-8', () => {
    // x = π/2 is a tangential root (sin x = 1 is a maximum), found by the |f| minimum scan
    expectAnswers('trig-equations-8', allRoots((x) => Math.cos(2 * x) + 3 * Math.sin(x) - 2, 0, 2 * Math.PI), 6);
  });
});

describe('trig-pythagoras', () => {
  it('trig-pythagoras-1', () => {
    const a: Point = [0, 8];
    const c: Point = [0, 0];
    const t = bisect((x) => len(a, [x, 0]) - 17, 0, 17);
    const b: Point = [t, 0];
    expect(angleAt(c, a, b)).toBeCloseTo(90, 10);
    expectAnswers('trig-pythagoras-1', [len(b, c), len(a, b) + len(a, c) + len(b, c)]);
  });

  it('trig-pythagoras-2', () => {
    const t = bisect((y) => len([0, 0], [6, y]) - 10, 0, 10);
    const rect: Point[] = [[0, 0], [6, 0], [6, t], [0, t]];
    expectAnswers('trig-pythagoras-2', [len(rect[1], rect[2]), shoelace(rect)]);
  });

  it('trig-pythagoras-3', () => {
    const b: Point = [-5, 0];
    const c: Point = [5, 0];
    const a: Point = [0, bisect((y) => len([0, y], b) - 13, 0, 13)];
    expect(len(a, c)).toBeCloseTo(13, 10);
    const d = foot(a, b, c);
    expectAnswers('trig-pythagoras-3', [len(a, d), shoelace([a, b, c])]);
  });

  it('trig-pythagoras-4', () => {
    const a: Point = [-8, 0];
    const b: Point = [0, -6];
    const c: Point = [8, 0];
    const d: Point = [0, 6];
    [len(b, c), len(c, d), len(d, a)].forEach((side) => expect(side).toBeCloseTo(len(a, b), 10));
    expectAnswers('trig-pythagoras-4', [len(a, b), len(d, foot(d, a, b))]);
  });

  it('trig-pythagoras-5', () => {
    const a: Point = [0, 0];
    const b: Point = [29, 0];
    const c = pol(20, bisect((t) => len(pol(20, t), b) - 21, 1, 179));
    expect(angleAt(c, a, b)).toBeCloseTo(90, 9);
    expectAnswers('trig-pythagoras-5', [c[1]]);
  });

  it('trig-pythagoras-6', () => {
    const a: Point = [0, 0];
    const b: Point = [20, 0];
    const theta = bisect((t) => len(add(pol(10, t), [8, 0]), b) - 10, 1, 89);
    const d = pol(10, theta);
    const c = add(d, [8, 0]);
    expect(len(d, c)).toBeCloseTo(8, 10);
    expectAnswers('trig-pythagoras-6', [d[1], len(a, c)]);
  });

  it('trig-pythagoras-7', () => {
    const b: Point = [0, 0];
    const c: Point = [21, 0];
    const a = pol(10, bisect((t) => len(pol(10, t), c) - 17, 0.01, 179.99));
    const d = foot(a, b, c);
    expectAnswers('trig-pythagoras-7', [len(b, d), len(a, d), shoelace([a, b, c])]);
  });

  it('trig-pythagoras-8', () => {
    const a: Point = [0, 0];
    const b: Point = [13, 0];
    const h = bisect((y) => angleAt([4, y], a, b) - 90, 0.1, 20);
    const c: Point = [4, h];
    expectAnswers('trig-pythagoras-8', [len(c, [4, 0]), len(a, c), len(b, c)]);
  });
});

describe('trig-right-triangle', () => {
  it('trig-right-triangle-1', () => {
    const a: Point = [0, 0];
    const b = pol(10, 35);
    const c = foot(b, a, [1, 0]);
    expect(angleAt(c, a, b)).toBeCloseTo(90, 9);
    expectAnswers('trig-right-triangle-1', [len(b, c), len(a, c)]);
  });

  it('trig-right-triangle-2', () => {
    const a: Point = [0, 0];
    const c: Point = [7, 0];
    const b: Point = [7, 4];
    expectAnswers('trig-right-triangle-2', [angleAt(a, c, b), angleAt(b, a, c)]);
  });

  it('trig-right-triangle-3', () => {
    const a: Point = [0, 0];
    const b = pol(9, 250);
    const c = pol(9, 290);
    expect(angleAt(a, b, c)).toBeCloseTo(40, 10);
    expectAnswers('trig-right-triangle-3', [len(b, c), len(a, foot(a, b, c))]);
  });

  it('trig-right-triangle-4', () => {
    const a: Point = [0, 0];
    const c = pol(12, 25);
    const b: Point = [c[0], 0];
    const d: Point = [0, c[1]];
    const o = intersect(a, c, b, d);
    const between = angleAt(o, a, b);
    expectAnswers('trig-right-triangle-4', [len(a, b), len(b, c), Math.min(between, 180 - between)]);
  });

  it('trig-right-triangle-5', () => {
    // C on the ray from A at 28°, B where the perpendicular to AC at C meets line AB; the altitude must be 6.
    const build = (t: number) => {
      const c = pol(t, 28);
      const b = intersect(c, add(c, pol(1, 118)), [0, 0], [1, 0]);
      return { c, b };
    };
    const t = bisect((x) => build(x).c[1] - 6, 1, 50);
    const { c, b } = build(t);
    expect(angleAt(c, [0, 0], b)).toBeCloseTo(90, 9);
    expectAnswers('trig-right-triangle-5', [len([0, 0], c), len(b, c), b[0]]);
  });

  it('trig-right-triangle-6', () => {
    const a: Point = [0, 8];
    const c: Point = [0, 0];
    const b: Point = [bisect((x) => angleAt([x, 0], a, c) - 30, 1, 100), 0];
    const d: Point = [bisect((x) => angleAt([x, 0], a, c) - 60, 0.1, b[0]), 0];
    expectAnswers('trig-right-triangle-6', [len(b, d), len(a, d)]);
    expect(angleAt(a, b, d)).toBeCloseTo(angleAt(b, a, d), 9);
  });

  it('trig-right-triangle-7', () => {
    // C = foot of the tower at the origin, T = (0, h); A and B on the negative x-axis, AB = 40.
    const elevationPoint = (h: number) => bisect((x) => angleAt([-x, 0], [0, 0], [0, h]) - 32, 0.01, 1e4);
    const h = bisect((height) => angleAt([-(elevationPoint(height) - 40), 0], [0, 0], [0, height]) - 50, 26, 500); // h > 26 keeps B between A and C
    const bc = elevationPoint(h) - 40;
    expectAnswers('trig-right-triangle-7', [h, bc], 7);
  });

  it('trig-right-triangle-8', () => {
    const a: Point = [0, 0];
    const b: Point = [10, 0];
    const build = (alpha: number) => {
      const t = bisect((x) => angleAt(pol(x, alpha), a, b) - 90, 0.01, 9.99);
      const c = pol(t, alpha);
      return { c, d: foot(c, a, b) };
    };
    const alpha = bisect((x) => len(b, build(x).d) - 2.5, 5, 85);
    const { c, d } = build(alpha);
    expectAnswers('trig-right-triangle-8', [alpha, len(c, d)]);
    // part א at another angle: BC = c·sinα, CD = c·sinα·cosα, BD = c·sin²α
    const other = build(40);
    expect(len(b, other.c)).toBeCloseTo(10 * sind(40), 8);
    expect(len(other.c, other.d)).toBeCloseTo(10 * sind(40) * cosd(40), 8);
    expect(len(b, other.d)).toBeCloseTo(10 * sind(40) ** 2, 8);
  });
});

describe('trig-polygons', () => {
  it('trig-polygons-1', () => {
    const a: Point = [0, 0];
    const b: Point = [8, 0];
    const d = pol(8, 50);
    const c = add(b, d);
    expect(len(b, c)).toBeCloseTo(8, 10);
    expect(angleAt(a, b, d)).toBeCloseTo(50, 10);
    expectAnswers('trig-polygons-1', [len(a, c), len(b, d)]);
  });

  it('trig-polygons-2', () => {
    const a: Point = [0, 0];
    const b: Point = [10, 0];
    const d = pol(6, 60);
    const c = add(b, d);
    const e = foot(d, a, b);
    expectAnswers('trig-polygons-2', [len(d, e), shoelace([a, b, c, d])]);
  });

  it('trig-polygons-3', () => {
    // D on the ray from A at 55°, DC = 8 parallel to AB; the trapezoid is isosceles when ∠B = 55° as well.
    const a: Point = [0, 0];
    const b: Point = [18, 0];
    const t = bisect((x) => angleAt(b, a, add(pol(x, 55), [8, 0])) - 55, 0.5, 11);
    const d = pol(t, 55);
    const c = add(d, [8, 0]);
    expect(len(b, c)).toBeCloseTo(len(a, d), 9);
    expectAnswers('trig-polygons-3', [len(a, d), d[1], shoelace([a, b, c, d])]);
  });

  it('trig-polygons-4', () => {
    const a: Point = [0, 0];
    const b: Point = [15, 0];
    const h = bisect((y) => angleAt(b, a, [9, y]) - 50, 0.1, 50);
    const c: Point = [9, h];
    expectAnswers('trig-polygons-4', [h, len(b, c), len(a, c)]);
  });

  it('trig-polygons-5', () => {
    const a: Point = [0, 0];
    const b = pol(10, -40);
    const d = pol(10, 40);
    const c: Point = [bisect((x) => angleAt([x, 0], b, d) - 50, 8, 100), 0];
    expect(len(c, b)).toBeCloseTo(len(c, d), 10);
    expect(angleAt(a, b, d)).toBeCloseTo(80, 10);
    expectAnswers('trig-polygons-5', [len(b, d), len(c, b), len(a, c)]);
  });

  it('trig-polygons-6', () => {
    const vertices = [0, 1, 2, 3, 4].map((k) => pol(6, 234 + 72 * k));
    vertices.forEach((v, i) => expect(len(v, vertices[(i + 1) % 5])).toBeCloseTo(len(vertices[0], vertices[1]), 10));
    expectAnswers('trig-polygons-6', [len(vertices[0], vertices[1]), shoelace(vertices)]);
  });

  it('trig-polygons-7', () => {
    const a: Point = [0, 0];
    const b: Point = [12, 0];
    const t = bisect((x) => angleAt(pol(x, 60), a, b) - 90, 0.1, 11.9);
    const d = pol(t, 60);
    const c = add(b, d);
    expectAnswers('trig-polygons-7', [len(a, d), len(b, d), len(a, c)]);
  });

  it('trig-polygons-8', () => {
    // legs of length x at 70° (isosceles: C on the line DC with BC = x, C left of B); AC must bisect ∠A.
    const a: Point = [0, 0];
    const b: Point = [20, 0];
    const build = (x: number) => {
      const d = pol(x, 70);
      const c: Point = [bisect((u) => len([u, d[1]], b) - x, d[0], 20), d[1]];
      return { d, c };
    };
    const x = bisect((s) => angleAt(a, b, build(s).c) - 35, 5, 19);
    const { c, d } = build(x);
    expect(len(d, c)).toBeCloseTo(len(a, d), 9);
    expectAnswers('trig-polygons-8', [len(a, d), d[1], shoelace([a, b, c, d])]);
  });
});

describe('trig-sine-law', () => {
  it('trig-sine-law-1', () => {
    // a triangle with the right angles on a unit base, scaled so that BC = 10
    const a: Point = [0, 0];
    const b: Point = [1, 0];
    const c = intersect(a, pol(1, 40), b, add(b, pol(1, 180 - 75)));
    const k = 10 / len(b, c);
    expectAnswers('trig-sine-law-1', [k * len(a, c)]);
  });

  it('trig-sine-law-2', () => {
    const b: Point = [0, 0];
    const c: Point = [12, 0];
    const a = intersect(b, pol(1, 60), c, add(c, pol(1, 110)));
    expect(angleAt(a, b, c)).toBeCloseTo(50, 10);
    expectAnswers('trig-sine-law-2', [len(circumcenter(a, b, c), a)]);
  });

  it('trig-sine-law-3', () => {
    const a: Point = [0, 0];
    const b: Point = [9, 0];
    const c = intersect(a, pol(1, 48), b, add(b, pol(1, 180 - 64)));
    expectAnswers('trig-sine-law-3', [angleAt(c, a, b), len(a, c), len(b, c)]);
  });

  it('trig-sine-law-4', () => {
    const a: Point = [0, 0];
    const b = pol(8, 70);
    const candidates = pointsOnRayAtDistance(a, 0, b, 12);
    expect(candidates.length).toBe(1);
    const c = candidates[0];
    expectAnswers('trig-sine-law-4', [angleAt(c, a, b), angleAt(b, a, c), len(a, c)]);
  });

  it('trig-sine-law-5', () => {
    const a: Point = [0, 0];
    const b = pol(12, 35);
    const candidates = pointsOnRayAtDistance(a, 0, b, 8);
    expect(candidates.length).toBe(2);
    const [near, far] = candidates;
    expectAnswers('trig-sine-law-5', [angleAt(far, a, b), len(a, far), angleAt(near, a, b), len(a, near)]);
  });

  it('trig-sine-law-6', () => {
    const a: Point = [0, 0];
    const b: Point = [1, 0];
    const c = intersect(a, pol(1, 30), b, add(b, pol(1, 180 - 45)));
    const k = 5 / len(circumcenter(a, b, c), a);
    expectAnswers('trig-sine-law-6', [k * len(b, c), k * len(a, c), k * len(a, b)]);
  });

  it('trig-sine-law-7', () => {
    const a: Point = [0, 0];
    const b = pol(10, -40);
    const c: Point = [bisect((x) => angleAt(b, a, [x, 0]) - 85, 1, 100), 0];
    const d = pol(bisect((t) => angleAt(pol(t, 35), a, c) - 100, 0.1, c[0]), 35);
    expect(angleAt(a, b, c)).toBeCloseTo(40, 10);
    expectAnswers('trig-sine-law-7', [len(a, c), len(c, d), len(a, d)]);
  });

  it('trig-sine-law-8', () => {
    const o: Point = [0, 0];
    const c = pol(7, 200);
    const a = pol(7, bisect((phi) => len(pol(7, phi), c) - 11, 20, 199));
    const bs = findRoots((psi) => len(pol(7, psi), c) - 7, 0, 359.9, 3600).map((psi) => pol(7, psi));
    expect(bs.length).toBe(2);
    const triangles = bs.map((b) => ({ angleA: angleAt(a, b, c), angleB: angleAt(b, a, c), ab: len(a, b), r: len(circumcenter(a, b, c), o) }));
    triangles.forEach((t) => {
      expect(t.angleA).toBeCloseTo(30, 8);
      expect(t.r).toBeCloseTo(0, 8);
    });
    triangles.sort((p, q) => p.angleB - q.angleB);
    expectAnswers('trig-sine-law-8', [triangles[0].angleA, triangles[0].angleB, triangles[0].ab, triangles[1].angleB, triangles[1].ab]);
  });
});

/** Triangle with BC on the x-axis from B(0,0), AB = c and AC = b (A found by root finding on the angle at B). */
function triangleFromSides(a: number, b: number, c: number): { A: Point; B: Point; C: Point } {
  const B: Point = [0, 0];
  const C: Point = [a, 0];
  const A = pol(c, bisect((t) => len(pol(c, t), C) - b, 1e-9, 180 - 1e-9));
  return { A, B, C };
}

describe('trig-cosine-law', () => {
  it('trig-cosine-law-1', () => {
    expectAnswers('trig-cosine-law-1', [len(pol(3, 60), [8, 0])]);
  });

  it('trig-cosine-law-2', () => {
    const { A, B, C } = triangleFromSides(7, 5, 3);
    const angles = [angleAt(A, B, C), angleAt(B, A, C), angleAt(C, A, B)];
    expect(angles.reduce((s, x) => s + x, 0)).toBeCloseTo(180, 9);
    expectAnswers('trig-cosine-law-2', [Math.max(...angles)]);
  });

  it('trig-cosine-law-3', () => {
    const a: Point = [0, 0];
    const b = pol(10, 252);
    const c = pol(10, 288);
    expect(angleAt(a, b, c)).toBeCloseTo(36, 10);
    expectAnswers('trig-cosine-law-3', [len(b, c), angleAt(b, a, c)]);
  });

  it('trig-cosine-law-4', () => {
    const a: Point = [0, 0];
    const c: Point = [7, 0];
    const candidates = pointsOnRayAtDistance(a, 60, c, 8);
    expect(candidates.length).toBe(1);
    expectAnswers('trig-cosine-law-4', [len(a, candidates[0])]);
  });

  it('trig-cosine-law-5', () => {
    const { A, B, C } = triangleFromSides(7, 6, 5);
    const angles = [angleAt(A, B, C), angleAt(B, A, C), angleAt(C, A, B)];
    expectAnswers('trig-cosine-law-5', [Math.min(...angles), len(A, mid(B, C))]);
  });

  it('trig-cosine-law-6', () => {
    const { A } = triangleFromSides(10, 9, 7);
    expectAnswers('trig-cosine-law-6', [len(A, [4, 0])]);
  });

  it('trig-cosine-law-7', () => {
    const b: Point = [0, 0];
    const c: Point = [8, 0];
    const a = pol(5, 60);
    const o = circumcenter(a, b, c);
    const r = len(o, a);
    const side = (p: Point) => (c[0] - a[0]) * (p[1] - a[1]) - (c[1] - a[1]) * (p[0] - a[0]);
    const ds = findRoots((psi) => len(pol(r, psi, o), c) - 3, 0, 359.9, 3600)
      .map((psi) => pol(r, psi, o))
      .filter((p) => Math.sign(side(p)) !== Math.sign(side(b)));
    expect(ds.length).toBe(1);
    const d = ds[0];
    expect(angleAt(d, a, c)).toBeCloseTo(120, 9);
    expectAnswers('trig-cosine-law-7', [len(a, c), len(a, d)]);
  });

  it('trig-cosine-law-8', () => {
    const a: Point = [0, 0];
    const b: Point = [7, 0];
    const d = pol(5, bisect((t) => len(pol(5, t), b) - 8, 1e-9, 180 - 1e-9));
    const c = add(b, d);
    expectAnswers('trig-cosine-law-8', [angleAt(a, b, d), len(a, c)]);
  });
});

describe('trig-triangle-area', () => {
  it('trig-triangle-area-1', () => {
    expectAnswers('trig-triangle-area-1', [shoelace([[0, 0], [6, 0], pol(9, 40)])]);
  });

  it('trig-triangle-area-2', () => {
    const d = pol(5, 130);
    expectAnswers('trig-triangle-area-2', [shoelace([[0, 0], [8, 0], add([8, 0], d), d])]);
  });

  it('trig-triangle-area-3', () => {
    const b: Point = [6, 0];
    const roots = findRoots((t) => shoelace([[0, 0], b, pol(10, t)]) - 15, 0.01, 179.99, 18000);
    expect(roots.length).toBe(2);
    expectAnswers('trig-triangle-area-3', [roots[0], len(b, pol(10, roots[0])), roots[1], len(b, pol(10, roots[1]))]);
  });

  it('trig-triangle-area-4', () => {
    // two different quadrilaterals with AC = 12, BD = 9 and a 70° angle between the diagonals have the same area
    const quad = (ae: number, be: number) => [pol(ae, 180), pol(be, 250), pol(12 - ae, 0), pol(9 - be, 70)] as Point[];
    const [a, b, c, d] = quad(5, 4);
    expect(len(a, c)).toBeCloseTo(12, 10);
    expect(len(b, d)).toBeCloseTo(9, 10);
    expect(angleAt([0, 0], a, b)).toBeCloseTo(70, 10);
    expectAnswers('trig-triangle-area-4', [shoelace([a, b, c, d])]);
    expectAnswers('trig-triangle-area-4', [shoelace(quad(2.5, 6))]);
  });

  it('trig-triangle-area-5', () => {
    const { A, B, C } = triangleFromSides(9, 8, 7);
    expectAnswers('trig-triangle-area-5', [shoelace([A, B, C])]);
  });

  it('trig-triangle-area-6', () => {
    const a: Point = [0, 0];
    const b: Point = [8, 0];
    const t = bisect((x) => shoelace([a, b, pol(x, 45)]) - 20, 0.1, 50);
    expectAnswers('trig-triangle-area-6', [t, len(b, pol(t, 45))]);
  });

  it('trig-triangle-area-7', () => {
    const a: Point = [0, 0];
    const b: Point = [6, 0];
    const c = pol(3, 120);
    const d = intersect(a, pol(1, 60), b, c);
    expect(angleAt(a, b, d)).toBeCloseTo(angleAt(a, d, c), 10);
    expectAnswers('trig-triangle-area-7', [len(a, d)]);
  });

  it('trig-triangle-area-8', () => {
    const a: Point = [0, 0];
    const b: Point = [10, 0];
    const c = pol(8, 50);
    const d: Point = [4, 0];
    const e = mid(a, c);
    expect(len(a, d) / len(d, b)).toBeCloseTo(2 / 3, 12);
    expectAnswers('trig-triangle-area-8', [shoelace([a, d, e]) / shoelace([a, b, c]), shoelace([d, b, c, e])]);
  });
});

describe('trig-laws-level-b', () => {
  it('trig-laws-level-b-1', () => {
    const model = (a: number, alpha: number) => {
      const b = pol(a, 270 - alpha / 2);
      const c = pol(a, 270 + alpha / 2);
      return { bc: len(b, c), area: shoelace([[0, 0], b, c]) };
    };
    const m = model(10, 50);
    expectAnswers('trig-laws-level-b-1', [m.bc, m.area]);
    // part א at other values: BC = 2a·sin(α/2), S = ½a²·sinα
    const other = model(3, 80);
    expect(other.bc).toBeCloseTo(6 * sind(40), 10);
    expect(other.area).toBeCloseTo(4.5 * sind(80), 10);
  });

  it('trig-laws-level-b-2', () => {
    const model = (b: number, alpha: number) => {
      const a: Point = [0, 0];
      const c: Point = [b, 0];
      const B = pol(bisect((t) => angleAt(pol(t, alpha), a, c) - 45, 0.01, 1000), alpha);
      return { bc: len(B, c), ab: len(a, B) };
    };
    const m = model(8, 70);
    expectAnswers('trig-laws-level-b-2', [m.bc, m.ab]);
    const other = model(5, 30);
    expect(other.bc).toBeCloseTo(Math.SQRT2 * 5 * sind(30), 8);
    expect(other.ab).toBeCloseTo(Math.SQRT2 * 5 * sind(105), 8);
  });

  it('trig-laws-level-b-3', () => {
    const rhombus = (alpha: number) => {
      const d = pol(5, alpha);
      return { ac: len([0, 0], add([5, 0], d)), bd: len([5, 0], d) };
    };
    const alpha = bisect((x) => rhombus(x).ac - 2 * rhombus(x).bd, 1, 89);
    expectAnswers('trig-laws-level-b-3', [alpha, rhombus(alpha).ac, rhombus(alpha).bd]);
  });

  it('trig-laws-level-b-4', () => {
    // triangle with angles α at A and 2α at B, scaled to circumradius 6; the condition is BC = 6
    const model = (alpha: number) => {
      const a: Point = [0, 0];
      const b: Point = [1, 0];
      const c = intersect(a, pol(1, alpha), b, add(b, pol(1, 180 - 2 * alpha)));
      const k = 6 / len(circumcenter(a, b, c), a);
      return { bc: k * len(b, c), ac: k * len(a, c), ab: k * len(a, b) };
    };
    const alpha = bisect((x) => model(x).bc - 6, 1, 59);
    expectAnswers('trig-laws-level-b-4', [alpha, model(alpha).ac, model(alpha).ab]);
    // part א at α = 25°: sides 2R·sinα, 2R·sin2α, 2R·sin3α
    expect(model(25).ab).toBeCloseTo(12 * sind(75), 9);
  });

  it('trig-laws-level-b-5', () => {
    const a: Point = [6, 0];
    const c: Point = [0, 0];
    const b: Point = [0, bisect((y) => angleAt(a, c, [0, y]) - 40, 0.1, 100)];
    const d: Point = [0, bisect((y) => angleAt(a, c, [0, y]) - angleAt(a, [0, y], b), 0.01, b[1] - 0.01)];
    expect(angleAt(a, c, d)).toBeCloseTo(20, 9);
    expectAnswers('trig-laws-level-b-5', [len(b, d), len(a, d)]);
  });

  it('trig-laws-level-b-6', () => {
    const a = 4;
    const model = (alpha: number) => {
      const A: Point = [0, 0];
      const D = pol(a, alpha);
      const C = add(D, [a, 0]);
      const B: Point = [bisect((x) => len([x, 0], C) - a, C[0], C[0] + a), 0];
      return { A, B, C, D };
    };
    const alpha = bisect((x) => len(model(x).A, model(x).C) - a * Math.sqrt(3), 10, 85);
    const { A, B, C, D } = model(alpha);
    expect(len(C, B)).toBeCloseTo(a, 9);
    expectAnswers('trig-laws-level-b-6', [alpha, shoelace([A, B, C, D])]);
  });

  it('trig-laws-level-b-7', () => {
    const model = (alpha: number) => {
      const b: Point = [0, 0];
      const c: Point = [1, 0];
      const a = intersect(b, pol(1, alpha), c, add(c, pol(1, 180 - 2 * alpha)));
      return { a, b, c };
    };
    const alpha = bisect((x) => {
      const { a, b, c } = model(x);
      return len(a, b) / len(a, c) - 1.6;
    }, 5, 55);
    const { a, b, c } = model(alpha);
    const k = 10 / len(a, c);
    expectAnswers('trig-laws-level-b-7', [alpha, k * len(b, c)]);
    // part א: AB = 2·AC·cosα at another angle
    const other = model(25);
    expect(len(other.a, other.b)).toBeCloseTo(2 * len(other.a, other.c) * cosd(25), 10);
  });

  it('trig-laws-level-b-8', () => {
    const a: Point = [0, 0];
    const model = (alpha: number) => {
      const b = pol(10, 270 - alpha / 2);
      const c = pol(10, 270 + alpha / 2);
      const t = bisect((s) => len(b, scale(c, s)) - len(b, c), 1e-6, 0.999);
      return { b, c, d: scale(c, t), t };
    };
    const alpha = bisect((x) => model(x).t - 0.5, 10, 59);
    const { b, c, d } = model(alpha);
    expect(len(a, d)).toBeCloseTo(len(d, c), 9);
    expect(angleAt(b, d, c)).toBeCloseTo(alpha, 9);
    expectAnswers('trig-laws-level-b-8', [alpha, len(b, c)]);
  });
});

describe('trig-proof-review', () => {
  it('trig-proof-review-1', () => {
    for (const [p, q, angle] of [[3, 8, 40], [5, 5, 100], [2, 9, 133]]) {
      const d = pol(q, angle);
      const b: Point = [p, 0];
      const c = add(b, d);
      expect(len([0, 0], c) ** 2 + len(b, d) ** 2).toBeCloseTo(2 * (p * p + q * q), 9);
    }
    const d = pol(7, bisect((t) => len(pol(7, t), [5, 0]) - 6, 1e-9, 180 - 1e-9));
    expectAnswers('trig-proof-review-1', [len([0, 0], add([5, 0], d))]);
  });

  it('trig-proof-review-2', () => {
    const triangle = (a: number, angleB: number, angleC: number) => {
      const B: Point = [0, 0];
      const C: Point = [a, 0];
      const A = intersect(B, pol(1, angleB), C, add(C, pol(1, 180 - angleC)));
      return { A, B, C };
    };
    for (const [a, angleB, angleC] of [[3, 30, 100], [7, 65, 45]]) {
      const { A, B, C } = triangle(a, angleB, angleC);
      expect(shoelace([A, B, C])).toBeCloseTo((a * a * sind(angleB) * sind(angleC)) / (2 * sind(angleAt(A, B, C))), 9);
    }
    const { A, B, C } = triangle(10, 50, 70);
    expectAnswers('trig-proof-review-2', [shoelace([A, B, C])]);
  });

  it('trig-proof-review-3', () => {
    for (const [a, b, c] of [[6, 5, 4], [9, 7, 3]]) {
      const t = triangleFromSides(a, b, c);
      expect(len(t.A, mid(t.B, t.C)) ** 2).toBeCloseTo((2 * b * b + 2 * c * c - a * a) / 4, 9);
    }
    const { A, B, C } = triangleFromSides(8, 7, 5);
    expectAnswers('trig-proof-review-3', [len(A, mid(B, C))]);
  });

  it('trig-proof-review-4', () => {
    const triangle = (h: number, angleB: number, angleC: number) => {
      const A: Point = [0, h];
      const B: Point = [-bisect((x) => angleAt([-x, 0], A, [1, 0]) - angleB, 1e-6, 1e4), 0];
      const C: Point = [bisect((x) => angleAt([x, 0], A, [-1, 0]) - angleC, 1e-6, 1e4), 0];
      return { A, B, C };
    };
    const check = triangle(3, 35, 80);
    expect(len(check.B, check.C)).toBeCloseTo((3 * sind(115)) / (sind(35) * sind(80)), 8);
    const { A, B, C } = triangle(6, 50, 70);
    expectAnswers('trig-proof-review-4', [len(B, C), shoelace([A, B, C])]);
  });

  it('trig-proof-review-5', () => {
    // a triangle with b = 4, c = 5 and the side a chosen so that ∠A = 2∠B
    const angles = (a: number) => {
      const { A, B, C } = triangleFromSides(a, 4, 5);
      return { angleA: angleAt(A, B, C), angleB: angleAt(B, A, C) };
    };
    const a = bisect((x) => angles(x).angleA - 2 * angles(x).angleB, 1.5, 8.5);
    expectAnswers('trig-proof-review-5', [a, angles(a).angleB]);
    // part ב for another triangle with ∠A = 2∠B (angles 2β, β, 180° − 3β)
    const b0: Point = [0, 0];
    const c0: Point = [1, 0];
    const a0 = intersect(b0, pol(1, 25), c0, add(c0, pol(1, 180 - (180 - 75))));
    const [sa, sb, sc] = [len(b0, c0), len(a0, c0), len(a0, b0)];
    expect(angleAt(a0, b0, c0)).toBeCloseTo(2 * angleAt(b0, a0, c0), 9);
    expect(sa * sa).toBeCloseTo(sb * (sb + sc), 9);
  });

  it('trig-proof-review-6', () => {
    const bisectorLength = (b: number, c: number, alpha: number) => {
      const B: Point = [c, 0];
      const C = pol(b, alpha);
      const t = bisect((s) => {
        const d = add(B, scale(sub(C, B), s));
        return angleAt([0, 0], B, d) - angleAt([0, 0], d, C);
      }, 1e-9, 1 - 1e-9);
      return len([0, 0], add(B, scale(sub(C, B), t)));
    };
    expect(bisectorLength(7, 3, 100)).toBeCloseTo((2 * 7 * 3 * cosd(50)) / 10, 9);
    expectAnswers('trig-proof-review-6', [bisectorLength(12, 4, 60)]);
  });
});

describe('trig-advanced', () => {
  it('trig-advanced-1', () => {
    const a: Point = [0, 0];
    const b: Point = [8, 0];
    const c = pol(5, bisect((t) => len(pol(5, t), b) - 7, 1e-9, 180 - 1e-9));
    expectAnswers('trig-advanced-1', [angleAt(a, b, c), len(circumcenter(a, b, c), a), shoelace([a, b, c]), c[1]]);
  });

  it('trig-advanced-2', () => {
    // kite symmetric about the x-axis; C is the second intersection of the circle through A, B, D with the axis
    const a: Point = [0, 0];
    const s = bisect((x) => len(pol(x, -35), pol(x, 35)) - 10, 0.1, 100);
    const b = pol(s, -35);
    const d = pol(s, 35);
    const o = circumcenter(a, b, d);
    const c: Point = [2 * o[0], 0];
    expect(len(o, c)).toBeCloseTo(len(o, a), 10);
    expect(angleAt(b, a, c)).toBeCloseTo(90, 9);
    expectAnswers('trig-advanced-2', [len(o, a), len(a, b), shoelace([a, b, c, d])]);
  });

  it('trig-advanced-3', () => {
    const model = (alpha: number) => {
      const A: Point = [0, 5];
      const D: Point = [0, 0];
      const B = intersect(A, add(A, pol(1, 270 - alpha)), D, [1, 0]);
      const C = intersect(A, add(A, pol(1, 270 + 2 * alpha)), D, [1, 0]);
      return { A, B, C };
    };
    const alpha = bisect((x) => {
      const { A, B, C } = model(x);
      return len(A, C) - 2 * len(A, B);
    }, 1, 44);
    const { A, B, C } = model(alpha);
    expectAnswers('trig-advanced-3', [alpha, shoelace([A, B, C])]);
  });

  it('trig-advanced-4', () => {
    // AB = BC = s with ∠ABC = 100°; D on the circumcircle (other side of AC) with AD = 6; s is fixed by CD = 4
    const model = (s: number) => {
      const b: Point = [0, 0];
      const a = pol(s, 140);
      const c = pol(s, 40);
      const o = circumcenter(a, b, c);
      const r = len(o, a);
      const side = (p: Point) => (c[0] - a[0]) * (p[1] - a[1]) - (c[1] - a[1]) * (p[0] - a[0]);
      const ds = findRoots((psi) => len(pol(r, psi, o), a) - 6, 0, 359.9, 3600)
        .map((psi) => pol(r, psi, o))
        .filter((p) => Math.sign(side(p)) !== Math.sign(side(b)));
      return { a, b, c, d: ds[0], r };
    };
    const s = bisect((x) => len(model(x).c, model(x).d) - 4, 3.9, 6); // s > 3.86 so that the diameter exceeds AD = 6
    const { a, b, c, d, r } = model(s);
    expect(angleAt(d, a, c)).toBeCloseTo(80, 8);
    expectAnswers('trig-advanced-4', [len(a, c), r, s, shoelace([a, b, c, d])], 7);
  });

  it('trig-advanced-5', () => {
    const a: Point = [0, 0];
    const b: Point = [2, 0];
    const alpha = bisect((x) => len(b, pol(1, x)) - Math.sqrt(3), 1, 179);
    const d = pol(1, alpha);
    const c = add(b, d);
    expect(angleAt(d, a, b)).toBeCloseTo(90, 9);
    const o = intersect(a, c, b, d);
    const between = angleAt(o, a, b);
    expectAnswers('trig-advanced-5', [alpha, Math.min(between, 180 - between)]);
  });

  it('trig-advanced-6', () => {
    const c: Point = [0, 0];
    const tri = (t: number) => ({ a: [10 * cosd(t), 0] as Point, b: [0, 10 * sind(t)] as Point });
    const roots = findRoots((t) => {
      const { a, b } = tri(t);
      return len(a, b) + len(a, c) + len(b, c) - 24;
    }, 0.01, 89.99, 9000);
    expect(roots.length).toBe(2);
    const { a, b } = tri(roots[0]);
    // the angle at A is opposite BC: the smaller acute angle
    expectAnswers('trig-advanced-6', [Math.min(angleAt(a, b, c), angleAt(b, a, c)), Math.min(len(a, c), len(b, c)), Math.max(len(a, c), len(b, c)), len(c, foot(c, a, b))]);
  });
});
