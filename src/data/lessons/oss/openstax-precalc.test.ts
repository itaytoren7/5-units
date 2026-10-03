/**
 * Independent verification of the OpenStax (Algebra and Trigonometry 2e) exercises adapted for the lessons.
 * Every numeric answer is recomputed from a model of the situation (coordinates, root finding, simulation,
 * enumeration, term-by-term sums) rather than by re-evaluating the closed form written in the solution.
 */
import { describe, expect, it } from 'vitest';
import {
  bisect,
  degreesToRadians as rad,
  distance,
  enumerateProbability,
  findCriticalPoints,
  findRoots,
  radiansToDegrees as deg,
  type RealFn,
} from '../../problems/verify';
import { isInScope, lessonCatalog } from '../catalog';
import type { LessonExercise } from '../types';
import { openstaxPrecalcExercises } from './openstax-precalc';

const TARGET_LESSONS = [
  'trig-basics',
  'trig-right-triangle',
  'trig-identities',
  'trig-equations',
  'trig-sine-law',
  'trig-triangle-area',
  'trig-cosine-law',
  'seq-geometric-intro',
  'seq-recursion',
  'seq-geometric-sum',
  'seq-infinite',
  'prob-basic',
  'prob-laws',
  'ag-distance',
  'ag-midpoint',
  'ag-line-equation',
  'ag-slope-parallel',
  'ag-perpendicular',
  'word-motion',
  'word-percentages',
];

const allExercises: LessonExercise[] = Object.values(openstaxPrecalcExercises).flat();
const ex = (id: string) => allExercises.find((exercise) => exercise.id === id)!;

/** Compares the exercise's answers, in order, with independently computed values. */
function expectAnswers(id: string, expected: number[], digits = 6) {
  const answers = ex(id).answers ?? [];
  expect(answers.length, `${id}: number of answers`).toBe(expected.length);
  answers.forEach((answer, index) => expect(answer.value, `${id}: ${answer.label}`).toBeCloseTo(expected[index], digits));
}

// ─── geometry helpers ───
type Point = [number, number];
const polar = (r: number, degrees: number, from: Point = [0, 0]): Point => [from[0] + r * Math.cos(rad(degrees)), from[1] + r * Math.sin(rad(degrees))];
const dist = (p: Point, q: Point) => distance(p[0], p[1], q[0], q[1]);
/** Angle ABC (at B) in degrees. */
function angleAt(a: Point, b: Point, c: Point): number {
  const u: Point = [a[0] - b[0], a[1] - b[1]];
  const v: Point = [c[0] - b[0], c[1] - b[1]];
  return deg(Math.atan2(Math.abs(u[0] * v[1] - u[1] * v[0]), u[0] * v[0] + u[1] * v[1]));
}
function shoelace(points: Point[]): number {
  let sum = 0;
  points.forEach((p, i) => {
    const q = points[(i + 1) % points.length];
    sum += p[0] * q[1] - q[0] * p[1];
  });
  return Math.abs(sum) / 2;
}
/** Intersection of the ray p + s·(direction degrees) with the ray q + t·(direction degrees). */
function rayIntersection(p: Point, pDeg: number, q: Point, qDeg: number): Point {
  const u: Point = [Math.cos(rad(pDeg)), Math.sin(rad(pDeg))];
  const v: Point = [Math.cos(rad(qDeg)), Math.sin(rad(qDeg))];
  const cross = u[0] * v[1] - u[1] * v[0];
  const s = ((q[0] - p[0]) * v[1] - (q[1] - p[1]) * v[0]) / cross;
  return [p[0] + s * u[0], p[1] + s * u[1]];
}
/** Points at distance r from `target` on the ray from `origin` in direction `degrees` (0, 1 or 2 points, by root finding). */
function pointsOnRayAtDistance(origin: Point, degrees: number, target: Point, r: number, maxT = 200): Point[] {
  const at = (t: number) => polar(t, degrees, origin);
  return findRoots((t) => dist(at(t), target) - r, 0, maxT, 20000).map(at);
}
/** Midpoint found as the point of segment AB equidistant from A and B (bisection along the segment). */
function equidistantPoint(a: Point, b: Point): Point {
  const at = (t: number): Point => [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
  const t = bisect((s) => dist(at(s), a) - dist(at(s), b), 0, 1);
  return at(t);
}
/** Slope of the line a·x + b·y = c, from two sampled points. */
function slopeOfLine(a: number, b: number, c: number): number {
  const y = (x: number) => (c - a * x) / b;
  return (y(10) - y(-10)) / 20;
}

// ─── trig-equation helper: every root on [a, b), including tangential (double) roots ───
function rootsOn(f: RealFn, a = 0, b = 2 * Math.PI): number[] {
  const lo = a - 0.05;
  const hi = b - 1e-9;
  const candidates = [...findRoots(f, lo, hi, 20000), ...findCriticalPoints(f, lo, hi, 20000)]
    .filter((x) => x > a - 1e-9 && x < b - 1e-6 && Math.abs(f(x)) < 1e-8) // a root within 1e-6 of b is b itself (excluded)
    .map((x) => (Math.abs(x - a) < 1e-9 ? a : x))
    .sort((p, q) => p - q);
  return candidates.filter((x, i) => i === 0 || x - candidates[i - 1] > 1e-6);
}

// ─── probability spaces ───
const coin: Array<[string, number]> = [
  ['H', 0.5],
  ['T', 0.5],
];
const die: Array<[number, number]> = [1, 2, 3, 4, 5, 6].map((v) => [v, 1 / 6]);
interface Card {
  rank: number; // 1 = ace, 11–13 = jack, queen, king
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
}
const deck: Array<[Card, number]> = (['hearts', 'diamonds', 'clubs', 'spades'] as const).flatMap((suit) =>
  Array.from({ length: 13 }, (_, i) => [{ rank: i + 1, suit }, 1 / 52] as [Card, number]),
);
const spinner = [
  { letter: 'A', color: 'blue' },
  { letter: 'B', color: 'purple' },
  { letter: 'C', color: 'orange' },
  { letter: 'D', color: 'blue' },
  { letter: 'E', color: 'red' },
  { letter: 'F', color: 'green' },
  { letter: 'I', color: 'green' },
  { letter: 'O', color: 'yellow' },
];
const spinnerSpace: Array<[(typeof spinner)[number], number]> = spinner.map((sector) => [sector, 1 / 8]);
const isVowel = (letter: string) => 'AEIOU'.includes(letter);

// ─── sequence helpers ───
function terms(first: number, ratio: number, count: number): number[] {
  const out = [first];
  while (out.length < count) out.push(out[out.length - 1] * ratio);
  return out;
}
const sum = (values: number[]) => values.reduce((total, v) => total + v, 0);

const checks: Record<string, () => void> = {
  // ───────── trig-basics ─────────
  'trig-basics-os1': () => {
    // arc of radius 10 over 50°, measured as a fine polyline
    const n = 20000;
    let length = 0;
    for (let i = 0; i < n; i += 1) length += dist(polar(10, (50 * i) / n), polar(10, (50 * (i + 1)) / n));
    expectAnswers('trig-basics-os1', [length]);
  },
  'trig-basics-os2': () => {
    // sector of radius 20 and angle 30° as a fan of thin triangles
    const n = 20000;
    let area = 0;
    for (let i = 0; i < n; i += 1) area += shoelace([[0, 0], polar(20, (30 * i) / n), polar(20, (30 * (i + 1)) / n)]);
    expectAnswers('trig-basics-os2', [area]);
  },
  'trig-basics-os3': () => {
    const t = bisect((x) => Math.sin(x) + 0.25, Math.PI, 1.5 * Math.PI); // quadrant III
    expect(Math.sin(t)).toBeCloseTo(-0.25, 12);
    expectAnswers('trig-basics-os3', [Math.cos(t)]);
  },
  'trig-basics-os4': () => {
    const p = polar(20, 120);
    expect(Math.hypot(p[0], p[1])).toBeCloseTo(20, 10);
    expect(angleAt([1, 0], [0, 0], p)).toBeCloseTo(120, 8);
    expectAnswers('trig-basics-os4', p);
  },
  'trig-basics-os5': () => {
    expectAnswers('trig-basics-os5', [Math.sin((-9 * Math.PI) / 4) * Math.cos(-Math.PI / 6)]);
  },
  'trig-basics-os6': () => {
    // child on the unit circle, starting at (0,1), one counterclockwise turn per 60 s, ride of 360 s
    const angle = (t: number) => Math.PI / 2 + (2 * Math.PI * t) / 60;
    const target = Math.SQRT1_2;
    const times = findRoots((t) => Math.cos(angle(t)) - target, 0, 360, 36000).filter((t) => Math.sin(angle(t)) < 0);
    for (const t of times) expect(Math.sin(angle(t))).toBeCloseTo(-target, 8);
    expectAnswers('trig-basics-os6', [times[0], times.length]);
  },

  // ───────── trig-right-triangle ─────────
  'trig-right-triangle-os1': () => {
    // C = (0,0) right angle, B = (20,0) so a = CB = 20, A = (0,b); sin B = AC/AB = 1/2
    const b = bisect((y) => y / Math.hypot(20, y) - 0.5, 0.01, 1000);
    expectAnswers('trig-right-triangle-os1', [b, Math.hypot(20, b)]);
  },
  'trig-right-triangle-os2': () => {
    // A = (0,0), C = (b,0), B = (b,7); angle A = 30°
    const b = bisect((x) => deg(Math.atan2(7, x)) - 30, 0.1, 100);
    const A: Point = [0, 0];
    const B: Point = [b, 7];
    const C: Point = [b, 0];
    expect(angleAt(A, C, B)).toBeCloseTo(90, 10);
    expectAnswers('trig-right-triangle-os2', [dist(A, C), dist(A, B)]);
  },
  'trig-right-triangle-os3': () => {
    // window at the origin, tower 325 ft away: top at (325, up), base at (325, -down)
    const up = bisect((h) => deg(Math.atan2(h, 325)) - 43, 0, 5000);
    const down = bisect((h) => deg(Math.atan2(h, 325)) - 31, 0, 5000);
    expectAnswers('trig-right-triangle-os3', [up + down]);
  },
  'trig-right-triangle-os4': () => {
    const building = bisect((h) => deg(Math.atan2(h, 500)) - 36, 0, 5000);
    const rodTop = bisect((h) => deg(Math.atan2(h, 500)) - 38, 0, 5000);
    expectAnswers('trig-right-triangle-os4', [rodTop - building]);
  },
  'trig-right-triangle-os5': () => {
    // apex (0,85), base on the x-axis; base angles 36° (left) and 50° (right)
    const left = bisect((x) => deg(Math.atan2(85, x)) - 36, 0.1, 1000);
    const right = bisect((x) => deg(Math.atan2(85, x)) - 50, 0.1, 1000);
    const L: Point = [-left, 0];
    const R: Point = [right, 0];
    const P: Point = [0, 85];
    expect(angleAt(P, L, R)).toBeCloseTo(36, 9);
    expect(angleAt(P, R, L)).toBeCloseTo(50, 9);
    expectAnswers('trig-right-triangle-os5', [dist(L, R)]);
  },

  // ───────── trig-identities ─────────
  'trig-identities-os2': () => {
    expectAnswers('trig-identities-os2', [Math.sin(rad(195))]);
  },
  'trig-identities-os3': () => {
    const a = bisect((x) => Math.sin(x) - 0.8, 0, Math.PI / 2);
    const b = bisect((x) => Math.cos(x) - 1 / 3, 0, Math.PI / 2);
    expectAnswers('trig-identities-os3', [Math.sin(a - b), Math.cos(a + b)]);
  },
  'trig-identities-os4': () => {
    const x = bisect((t) => Math.sin(t) - 1 / 8, 0, Math.PI / 2);
    expectAnswers('trig-identities-os4', [Math.sin(2 * x), Math.cos(2 * x), Math.tan(2 * x)]);
  },
  'trig-identities-os5': () => {
    // right angle at R; base LR = 12, height RT = 5; θ at L, α at T
    const L: Point = [0, 0];
    const R: Point = [12, 0];
    const T: Point = [12, 5];
    const alpha = rad(angleAt(R, T, L));
    expect(deg(alpha) + angleAt(R, L, T)).toBeCloseTo(90, 10);
    expectAnswers('trig-identities-os5', [Math.sin(2 * alpha), Math.cos(2 * alpha), Math.tan(2 * alpha)]);
  },

  // ───────── trig-equations (roots found numerically on [0, 2π)) ─────────
  'trig-equations-os1': () => {
    expectAnswers('trig-equations-os1', rootsOn((x) => Math.tan(x) ** 2 - Math.sqrt(3) * Math.tan(x)));
  },
  'trig-equations-os2': () => {
    expectAnswers('trig-equations-os2', rootsOn((t) => 2 * Math.sin(3 * t) - 1));
  },
  'trig-equations-os3': () => {
    expectAnswers('trig-equations-os3', rootsOn((t) => 2 * Math.cos(t) ** 2 + Math.cos(t) - 1));
  },
  'trig-equations-os4': () => {
    expectAnswers('trig-equations-os4', rootsOn((t) => Math.cos(2 * t) - Math.sin(t)));
  },
  'trig-equations-os5': () => {
    expectAnswers('trig-equations-os5', rootsOn((x) => 2 * Math.sin(x) * Math.cos(x) - Math.sin(x) + 2 * Math.cos(x) - 1));
  },
  'trig-equations-os6': () => {
    const roots = rootsOn((x) => Math.cos(6 * x) - Math.cos(3 * x));
    expectAnswers('trig-equations-os6', [roots.length, roots.filter((x) => x > 1e-6)[0]]);
  },

  // ───────── trig-sine-law ─────────
  'trig-sine-law-os1': () => {
    // A = (0,0), B = (5,0) (c = 5); C where the rays at A (37°) and B (180° − 49°) meet
    const A: Point = [0, 0];
    const B: Point = [5, 0];
    const C = rayIntersection(A, 37, B, 180 - 49);
    expect(angleAt(A, C, B)).toBeCloseTo(94, 9);
    expectAnswers('trig-sine-law-os1', [dist(A, C)]);
  },
  'trig-sine-law-os2': () => {
    // P = (0,0) with the 55° angle, R = (24,0); Q on the 55° ray with QR = 21 (opposite P); x = angle Q, opposite PR = 24
    const P: Point = [0, 0];
    const R: Point = [24, 0];
    const candidates = pointsOnRayAtDistance(P, 55, R, 21);
    expect(candidates.length).toBe(2);
    const obtuse = candidates.map((Q) => angleAt(P, Q, R)).filter((x) => x > 90);
    expect(obtuse.length).toBe(1);
    expectAnswers('trig-sine-law-os2', obtuse);
  },
  'trig-sine-law-os3': () => {
    // B = (0,0), C = (13,0) (a = 13), A on the 20° ray from B with CA = b = 6
    const B: Point = [0, 0];
    const C: Point = [13, 0];
    const angles = pointsOnRayAtDistance(B, 20, C, 6)
      .map((A) => angleAt(B, A, C))
      .sort((p, q) => p - q);
    expectAnswers('trig-sine-law-os3', angles);
  },
  'trig-sine-law-os4': () => {
    // A = (0,0), B = (17,0) (c = 17), C on the 35° ray from A with BC = a = 12
    const A: Point = [0, 0];
    const B: Point = [17, 0];
    const triangles = pointsOnRayAtDistance(A, 35, B, 12)
      .map((C) => ({ gamma: angleAt(A, C, B), beta: angleAt(A, B, C), b: dist(A, C) }))
      .sort((p, q) => p.gamma - q.gamma);
    expect(triangles.length).toBe(2);
    expectAnswers(
      'trig-sine-law-os4',
      triangles.flatMap((t) => [t.gamma, t.beta, t.b]),
    );
  },
  'trig-sine-law-os5': () => {
    // building at x = 0; nearer point Q at x = d (53°), farther point P at x = d + 250 (35°)
    const height = (d: number) => d * Math.tan(rad(53));
    const d = bisect((x) => deg(Math.atan2(height(x), x + 250)) - 35, 1, 5000);
    expect(deg(Math.atan2(height(d), d))).toBeCloseTo(53, 10);
    expectAnswers('trig-sine-law-os5', [height(d)]);
  },

  // ───────── trig-triangle-area ─────────
  'trig-triangle-area-os1': () => {
    expectAnswers('trig-triangle-area-os1', [shoelace([[0, 0], [24, 0], polar(32, 75)])]);
  },
  'trig-triangle-area-os2': () => {
    expectAnswers('trig-triangle-area-os2', [shoelace([[0, 0], [16, 0], polar(10, 30)])]);
  },
  'trig-triangle-area-os3': () => {
    expectAnswers('trig-triangle-area-os3', [shoelace([[0, 0], [30, 0], polar(42, 132)])]);
  },
  'trig-triangle-area-os4': () => {
    // A = (0,0), B = (17,0), C with AC = 8 and BC = 12 (found by root finding on the angle at A)
    const A: Point = [0, 0];
    const B: Point = [17, 0];
    const phi = bisect((t) => dist(polar(8, t), B) - 12, 0.001, 179.999);
    const C = polar(8, phi);
    expect(dist(B, C)).toBeCloseTo(12, 9);
    expectAnswers('trig-triangle-area-os4', [shoelace([A, B, C])]);
  },
  'trig-triangle-area-os5': () => {
    // B = (0,0), A = (4.5,0), C = 7.9 at 117°; D with CD = 9.4, DA = 12.9 on the other side of AC (convex)
    const B: Point = [0, 0];
    const A: Point = [4.5, 0];
    const C = polar(7.9, 117);
    const side = (p: Point) => (C[0] - A[0]) * (p[1] - A[1]) - (C[1] - A[1]) * (p[0] - A[0]);
    const dCandidates = findRoots((t) => dist(polar(9.4, t, C), A) - 12.9, -180, 180, 36000)
      .map((t) => polar(9.4, t, C))
      .filter((D) => Math.sign(side(D)) !== Math.sign(side(B)));
    expect(dCandidates.length).toBe(1);
    const D = dCandidates[0];
    expect(dist(C, D)).toBeCloseTo(9.4, 9);
    expect(dist(D, A)).toBeCloseTo(12.9, 9);
    expectAnswers('trig-triangle-area-os5', [shoelace([A, B, C, D])]);
  },

  // ───────── trig-cosine-law ─────────
  'trig-cosine-law-os1': () => {
    expectAnswers('trig-cosine-law-os1', [dist([7, 0], polar(6, 120))]);
  },
  'trig-cosine-law-os2': () => {
    // C = (0,0), B = (14,0), A = 13 at angle C, with AB = 20
    const C = bisect((t) => dist(polar(13, t), [14, 0]) - 20, 0.001, 179.999);
    expectAnswers('trig-cosine-law-os2', [C]);
  },
  'trig-cosine-law-os3': () => {
    const C: Point = [0, 0];
    const A: Point = [37, 0];
    const B = polar(21, 121);
    expectAnswers('trig-cosine-law-os3', [dist(A, B), angleAt(C, A, B), angleAt(C, B, A)]);
  },
  'trig-cosine-law-os4': () => {
    // parallelogram A(0,0), B(17,0), D = 11 at an acute angle φ, C = B + D; longer diagonal AC = 22
    const corner = (phi: number) => {
      const D = polar(11, phi);
      return { D, C: [17 + D[0], D[1]] as Point };
    };
    const phi = bisect((t) => dist([0, 0], corner(t).C) - 22, 1, 90);
    const { D } = corner(phi);
    expectAnswers('trig-cosine-law-os4', [dist([17, 0], D)]);
  },
  'trig-cosine-law-os5': () => {
    // base of the tower P = (0,0), top T = (0,113), anchor Q 98 ft up the 34° slope
    const T: Point = [0, 113];
    const Q = polar(98, 34);
    expectAnswers('trig-cosine-law-os5', [dist(T, Q)]);
  },

  // ───────── seq-geometric-intro ─────────
  'seq-geometric-intro-os1': () => {
    expectAnswers('seq-geometric-intro-os1', [terms(16, -1 / 3, 4)[3]]);
  },
  'seq-geometric-intro-os2': () => {
    // q² = a8 / a6, solved numerically; a1 by dividing a6 by q five times
    const ratios = findRoots((q) => 25 * q * q - 6.25, -2, 2.001);
    expect(ratios.length).toBe(2);
    const firstTerms = ratios.map((q) => {
      let a = 25;
      for (let i = 0; i < 5; i += 1) a /= q;
      const seq = terms(a, q, 8);
      expect(seq[5]).toBeCloseTo(25, 10);
      expect(seq[7]).toBeCloseTo(6.25, 10);
      return { q, a1: a };
    });
    const positive = firstTerms.find((t) => t.q > 0)!;
    const negative = firstTerms.find((t) => t.q < 0)!;
    expectAnswers('seq-geometric-intro-os2', [positive.a1, negative.a1]);
  },
  'seq-geometric-intro-os3': () => {
    const seq = [2];
    while (seq[seq.length - 1] > 1 / 1024) seq.push(seq[seq.length - 1] / 2);
    expect(seq[seq.length - 1]).toBe(1 / 1024);
    expectAnswers('seq-geometric-intro-os3', [seq.length]);
  },
  'seq-geometric-intro-os4': () => {
    // exact rational arithmetic: a1 = -36, multiply by 2/3 until the denominator is not 1
    const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y));
    let num = -36;
    let den = 1;
    let n = 1;
    while (den === 1) {
      num *= 2;
      den *= 3;
      const g = gcd(num, den);
      num /= g;
      den /= g;
      n += 1;
    }
    expectAnswers('seq-geometric-intro-os4', [n, num / den]);
  },

  // ───────── seq-recursion ─────────
  'seq-recursion-os1': () => {
    const seq = [7];
    for (let i = 0; i < 4; i += 1) seq.push(0.2 * seq[i]);
    expectAnswers('seq-recursion-os1', seq.slice(1), 10);
  },
  'seq-recursion-os2': () => {
    const given = [10, -3, 0.9, -0.27];
    const ratios = given.slice(1).map((v, i) => v / given[i]);
    for (const r of ratios) expect(r).toBeCloseTo(ratios[0], 12);
    expectAnswers('seq-recursion-os2', [ratios[0]]);
  },
  'seq-recursion-os3': () => {
    const given = [1 / 512, -1 / 128, 1 / 32, -1 / 8];
    const ratios = given.slice(1).map((v, i) => v / given[i]);
    for (const r of ratios) expect(r).toBeCloseTo(ratios[0], 12);
    expectAnswers('seq-recursion-os3', [ratios[0]]);
  },
  'seq-recursion-os4': () => {
    let a = 4;
    for (let n = 1; n < 8; n += 1) a = -3 * a;
    expectAnswers('seq-recursion-os4', [a]);
  },

  // ───────── seq-geometric-sum (term by term) ─────────
  'seq-geometric-sum-os1': () => {
    expectAnswers('seq-geometric-sum-os1', [sum([9, 3, 1, 1 / 3, 1 / 9])]);
  },
  'seq-geometric-sum-os2': () => {
    expectAnswers('seq-geometric-sum-os2', [sum(terms(-2, 5, 6))]);
  },
  'seq-geometric-sum-os3': () => {
    expectAnswers('seq-geometric-sum-os3', [sum(terms(0.4, -5, 7))]);
  },
  'seq-geometric-sum-os4': () => {
    expectAnswers('seq-geometric-sum-os4', [sum(Array.from({ length: 10 }, (_, i) => -2 * 0.5 ** i))]);
  },

  // ───────── seq-infinite (long partial sums) ─────────
  'seq-infinite-os1': () => {
    expectAnswers('seq-infinite-os1', [sum(terms(2, 0.8, 3000))], 8);
  },
  'seq-infinite-os2': () => {
    expectAnswers('seq-infinite-os2', [sum(terms(-1, 0.25, 200))], 10);
  },
  'seq-infinite-os3': () => {
    const partial = sum(terms(0.65, 0.01, 20));
    expect(partial.toFixed(8)).toBe('0.65656566');
    expectAnswers('seq-infinite-os3', [partial], 10);
  },
  'seq-infinite-os4': () => {
    // q such that the (long) partial sum of 1 + q + q² + … equals 5 (first term 1)
    const q = bisect((r) => sum(terms(1, r, 4000)) - 5, 0, 0.99);
    expectAnswers('seq-infinite-os4', [q], 8);
  },
  'seq-infinite-os5': () => {
    expectAnswers('seq-infinite-os5', [sum(terms(3, 0.75, 400))], 8);
  },

  // ───────── prob-basic (enumeration) ─────────
  'prob-basic-os1': () => {
    expectAnswers('prob-basic-os1', [enumerateProbability([spinnerSpace], ([s]) => isVowel(s.letter))]);
  },
  'prob-basic-os2': () => {
    expectAnswers('prob-basic-os2', [enumerateProbability([deck], ([card]) => card.rank === 2)]);
  },
  'prob-basic-os3': () => {
    expectAnswers('prob-basic-os3', [enumerateProbability([coin, coin, coin, coin], (o) => o.filter((c) => c === 'H').length === 2)]);
  },
  'prob-basic-os4': () => {
    expectAnswers('prob-basic-os4', [enumerateProbability([die, die], ([x, y]) => x + y === 5 || x + y === 6)]);
  },

  // ───────── prob-laws (enumeration) ─────────
  'prob-laws-os1': () => {
    expectAnswers('prob-laws-os1', [enumerateProbability([coin, coin, coin, coin], (o) => !o.every((c) => c === 'T'))]);
  },
  'prob-laws-os2': () => {
    expectAnswers('prob-laws-os2', [enumerateProbability([spinnerSpace], ([s]) => s.color === 'purple' || isVowel(s.letter))]);
  },
  'prob-laws-os3': () => {
    expectAnswers('prob-laws-os3', [enumerateProbability([deck], ([card]) => card.rank === 1 || card.suit === 'diamonds')]);
  },
  'prob-laws-os4': () => {
    const space: Array<Array<[string | Card, number]>> = [coin, deck];
    expectAnswers('prob-laws-os4', [enumerateProbability(space, ([c, card]) => c === 'H' || (card as Card).suit === 'clubs')]);
  },
  'prob-laws-os5': () => {
    expectAnswers('prob-laws-os5', [enumerateProbability([die, die], ([x, y]) => x === 4 || y === 4 || x + y === 8)]);
  },

  // ───────── ag-distance ─────────
  'ag-distance-os1': () => {
    expectAnswers('ag-distance-os1', [dist([-4, 1], [3, -4])]);
  },
  'ag-distance-os2': () => {
    expectAnswers('ag-distance-os2', [dist([53, 17], [76, -12])]);
  },
  'ag-distance-os3': () => {
    const first = dist([60, 82], [49, 64]);
    const second = dist([58, 47], [49, 64]);
    expect(second).toBeLessThan(first);
    expectAnswers('ag-distance-os3', [first, second]);
  },
  'ag-distance-os4': () => {
    const d1 = dist([-6, 5], [10, -1]);
    const d2 = dist([10, 5], [-6, -1]);
    expect(d1).toBeCloseTo(d2, 12);
    expectAnswers('ag-distance-os4', [d1]);
  },

  // ───────── ag-midpoint (equidistant point on the segment) ─────────
  'ag-midpoint-os1': () => {
    expectAnswers('ag-midpoint-os1', equidistantPoint([-1, 1], [7, -4]));
  },
  'ag-midpoint-os2': () => {
    expectAnswers('ag-midpoint-os2', equidistantPoint([-43, 17], [23, -34]));
  },
  'ag-midpoint-os3': () => {
    const m1 = equidistantPoint([1, 3], [-3, 5]);
    const m2 = equidistantPoint([4, 7], [5, -4]);
    expectAnswers('ag-midpoint-os3', [...m1, ...m2, dist(m1, m2)]);
  },
  'ag-midpoint-os4': () => {
    const m1 = equidistantPoint([-6, 5], [10, -1]);
    const m2 = equidistantPoint([10, 5], [-6, -1]);
    expect(m1[0]).toBeCloseTo(m2[0], 9);
    expect(m1[1]).toBeCloseTo(m2[1], 9);
    expectAnswers('ag-midpoint-os4', m1);
  },

  // ───────── ag-line-equation (the line must pass through the given points) ─────────
  'ag-line-equation-os1': () => {
    const [m, n] = ex('ag-line-equation-os1').answers!.map((a) => a.value);
    expect(m * 2 + n).toBeCloseTo(4, 12);
    expect(m * 4 + n).toBeCloseTo(10, 12);
  },
  'ag-line-equation-os2': () => {
    const [m, n] = ex('ag-line-equation-os2').answers!.map((a) => a.value);
    expect(m * -1 + n).toBeCloseTo(4, 12);
    expect(m * 5 + n).toBeCloseTo(2, 12);
  },
  'ag-line-equation-os3': () => {
    const [m, n] = ex('ag-line-equation-os3').answers!.map((a) => a.value);
    expect(m * -5 + n).toBeCloseTo(-4, 12);
    expect(m * 5 + n).toBeCloseTo(2, 12);
  },
  'ag-line-equation-os4': () => {
    // the line through (0, 32) and (100, 212), evaluated by linear interpolation
    const F = (c: number) => 32 + ((212 - 32) * (c - 0)) / (100 - 0);
    expectAnswers('ag-line-equation-os4', [F(1) - F(0), F(28), F(-40)], 10);
  },

  // ───────── ag-slope-parallel ─────────
  'ag-slope-parallel-os1': () => {
    const [m] = ex('ag-slope-parallel-os1').answers!.map((a) => a.value);
    // a line of slope m through (8,-2) must reach (4,6)
    expect(-2 + m * (4 - 8)).toBeCloseTo(6, 12);
  },
  'ag-slope-parallel-os2': () => {
    const s1 = slopeOfLine(4, 3, 12); // 3y + 4x = 12
    const s2 = slopeOfLine(-8, -6, 1); // -6y = 8x + 1  ⇔  -8x - 6y = 1
    expect(s1).toBeCloseTo(s2, 12);
    const intercept = (b: number, c: number) => c / b; // y-value at x = 0
    expect(Math.abs(intercept(3, 12) - intercept(-6, 1))).toBeGreaterThan(1); // different lines
    expectAnswers('ag-slope-parallel-os2', [s1, s2]);
  },
  'ag-slope-parallel-os3': () => {
    const x = bisect((t) => (6 - 2) / (-4 - t) - 3, -10, -4.01);
    expectAnswers('ag-slope-parallel-os3', [x]);
  },
  'ag-slope-parallel-os4': () => {
    const g = (x: number) => -0.01 * x + 2.01;
    const gSlope = g(1) - g(0);
    const [m, n] = ex('ag-slope-parallel-os4').answers!.map((a) => a.value);
    expect(m).toBeCloseTo(gSlope, 12);
    expect(m * 1 + n).toBeCloseTo(2, 12);
    expect(g(1)).toBeCloseTo(2, 12); // the point lies on g, so the lines coincide
    expect(n).toBeCloseTo(g(0), 12);
  },

  // ───────── ag-perpendicular ─────────
  'ag-perpendicular-os1': () => {
    const s1 = slopeOfLine(4, -7, 10);
    const s2 = slopeOfLine(7, 4, 1);
    expect(s1 * s2).toBeCloseTo(-1, 12);
    expectAnswers('ag-perpendicular-os1', [s1, s2]);
  },
  'ag-perpendicular-os2': () => {
    const [m, n] = ex('ag-perpendicular-os2').answers!.map((a) => a.value);
    expect(m * 3).toBeCloseTo(-1, 12);
    expect(m * 3 + n).toBeCloseTo(1, 12);
  },
  'ag-perpendicular-os3': () => {
    const m1 = (5 - 7) / (5 - 1);
    const m2 = (1 - -3) / (1 - -1);
    expect(m1 * m2).toBeCloseTo(-1, 12);
    expectAnswers('ag-perpendicular-os3', [m1, m2]);
  },
  'ag-perpendicular-os4': () => {
    const [m, n] = ex('ag-perpendicular-os4').answers!.map((a) => a.value);
    expect(m * -0.01).toBeCloseTo(-1, 12);
    expect(m * 1 + n).toBeCloseTo(2, 12);
  },

  // ───────── word-motion (simulated positions) ─────────
  'word-motion-os1': () => {
    const gap = (t: number) => 450 * t - -550 * t; // positions on opposite sides of the start
    expectAnswers('word-motion-os1', [bisect((t) => gap(t) - 4000, 0, 100)]);
  },
  'word-motion-os2': () => {
    const ben = (t: number) => 4 * t; // t = hours since Ben left
    const amanda = (t: number) => (t < 1.5 ? 0 : 6 * (t - 1.5));
    const meet = bisect((t) => amanda(t) - ben(t), 1.5, 100);
    expectAnswers('word-motion-os2', [meet - 1.5]);
  },
  'word-motion-os3': () => {
    const fast = bisect((t) => 20 * t + 12 * (4.5 - t) - 70, 0, 4.5);
    expectAnswers('word-motion-os3', [20 * fast]);
  },
  'word-motion-os4': () => {
    const gap = (v: number) => 2 * v - -(2.5 * (v - 7)); // pickup east for 2 h, jeep west for 2.5 h
    const v = bisect((s) => gap(s) - 306.5, 7, 300);
    expectAnswers('word-motion-os4', [v, v - 7]);
  },

  // ───────── word-percentages ─────────
  'word-percentages-os1': () => {
    expectAnswers('word-percentages-os1', [(40e6 / 317e6) * 100]);
  },
  'word-percentages-os2': () => {
    const low = bisect((x) => 0.08 * x + 0.12 * (20000 - x) - 0.11 * 20000, 0, 20000);
    expectAnswers('word-percentages-os2', [low, 20000 - low]);
  },
  'word-percentages-os3': () => {
    const weak = bisect((x) => (0.3 * x + 0.7 * (20 - x)) / 20 - 0.4, 0, 20);
    expectAnswers('word-percentages-os3', [weak, 20 - weak]);
  },
  'word-percentages-os4': () => {
    let cells = 50;
    for (let hour = 0; hour < 24; hour += 1) cells *= 1.015;
    expectAnswers('word-percentages-os4', [cells]);
    expect(Math.round(cells)).toBe(71);
  },
  'word-percentages-os5': () => {
    const swan = bisect((x) => 1.1 * x + 0.5 * (1.1e6 - x) - 1e6, 0, 1.1e6);
    expectAnswers('word-percentages-os5', [swan, 1.1e6 - swan], 4);
  },
};

/** Proof / expression exercises: the claimed identity holds at many sample points. */
const identityChecks: Record<string, Array<[RealFn, RealFn]>> = {
  'trig-identities-os1': [[(x) => (1 - Math.cos(x) ** 2) / Math.tan(x) ** 2 + 2 * Math.sin(x) ** 2, (x) => 1 + Math.sin(x) ** 2]],
  'trig-identities-os6': [[(t) => (1 + Math.cos(2 * t)) / (Math.sin(2 * t) - Math.cos(t)), (t) => (2 * Math.cos(t)) / (2 * Math.sin(t) - 1)]],
};

describe('openstax precalc: structure and attribution', () => {
  it('only targets the assigned, in-scope (non-calculus) lessons', () => {
    for (const lessonId of Object.keys(openstaxPrecalcExercises)) {
      expect(TARGET_LESSONS, lessonId).toContain(lessonId);
      const meta = lessonCatalog.find((entry) => entry.id === lessonId);
      expect(meta, lessonId).toBeDefined();
      expect(isInScope(meta!.status), lessonId).toBe(true);
      expect(meta!.chapterId, lessonId).not.toBe('calculus');
    }
  });

  it('numbers the exercises os1, os2, … within each lesson', () => {
    for (const [lessonId, exercises] of Object.entries(openstaxPrecalcExercises)) {
      expect(exercises.length, lessonId).toBeGreaterThanOrEqual(4);
      expect(exercises.map((exercise) => exercise.id)).toEqual(exercises.map((_, index) => `${lessonId}-os${index + 1}`));
    }
  });

  it('attributes every exercise to its OpenStax section and exercise number', () => {
    for (const exercise of allExercises) {
      const source = exercise.source;
      expect(source, exercise.id).toBeDefined();
      expect(source!.kind).toBe('openstax');
      expect(source!.work).toBe('OpenStax, Algebra and Trigonometry 2e');
      expect(source!.section, exercise.id).toMatch(/^\d+\.\d+ \S.*, תרגילי?ם? \d+(–\d+)?$/);
      const [, chapter, section] = source!.section.match(/^(\d+)\.(\d+) /)!;
      expect(source!.url, exercise.id).toMatch(new RegExp(`^https://openstax\\.org/books/algebra-and-trigonometry-2e/pages/${chapter}-${section}-[a-z0-9-]+$`));
      expect(source!.license).toBe('CC BY-NC-SA 4.0');
      expect(source!.licenseUrl).toBe('https://creativecommons.org/licenses/by-nc-sa/4.0/');
      expect(source!.adapted).toBe(true);
    }
  });

  it('prefers exercises with a numeric answer', () => {
    const withAnswers = allExercises.filter((exercise) => exercise.answers?.length).length;
    expect(withAnswers / allExercises.length).toBeGreaterThan(0.9);
  });
});

describe('openstax precalc: answers recomputed independently', () => {
  for (const [id, check] of Object.entries(checks)) it(id, check);

  it('every exercise with answers has an independent check', () => {
    for (const exercise of allExercises) if (exercise.answers?.length) expect(Object.keys(checks), exercise.id).toContain(exercise.id);
    for (const id of Object.keys(checks)) expect(ex(id), id).toBeDefined();
  });

  for (const [id, pairs] of Object.entries(identityChecks)) {
    it(`${id} (identity holds numerically)`, () => {
      expect(ex(id)).toBeDefined();
      let tested = 0;
      for (let x = -3; x <= 3; x += 0.37) {
        for (const [left, right] of pairs) {
          const l = left(x);
          const r = right(x);
          if (!Number.isFinite(l) || !Number.isFinite(r) || Math.abs(l) > 1e6 || Math.abs(r) > 1e6) continue;
          expect(l, `${id} at x = ${x}`).toBeCloseTo(r, 8);
          tested += 1;
        }
      }
      expect(tested).toBeGreaterThan(10);
    });
  }
});
