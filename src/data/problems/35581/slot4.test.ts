/**
 * Independent numeric verification of slot-4 problems 35581-4-4 … 35581-4-10 (Euclidean geometry).
 * Each problem is rebuilt as a concrete coordinate model; every numericAnswer is recomputed from that
 * model (lengths, shoelace areas, point–line distances, line intersections, circumcentres), never from
 * the closed forms in the solutions. Problems 35581-4-1..3 are verified in ../35581.test.ts.
 */
import { describe, expect, it } from 'vitest';
import { slot4Problems } from './slot4';
import { distance } from '../verify';

type Point = [number, number];

const newIds = ['35581-4-4', '35581-4-5', '35581-4-6', '35581-4-7', '35581-4-8', '35581-4-9', '35581-4-10'];
const newProblems = slot4Problems.filter((problem) => newIds.includes(problem.id));

function answer(sectionId: string): number {
  for (const problem of slot4Problems) {
    const section = problem.sections.find((item) => item.id === sectionId);
    if (section) {
      if (section.numericAnswer === undefined) throw new Error(`${sectionId} has no numericAnswer`);
      return section.numericAnswer;
    }
  }
  throw new Error(`Unknown section ${sectionId}`);
}

function expectAnswer(sectionId: string, computed: number, digits = 9) {
  expect(answer(sectionId)).toBeCloseTo(computed, digits);
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

function pointLineDistance(p: Point, a: Point, b: Point): number {
  return Math.abs((b[0] - a[0]) * (a[1] - p[1]) - (a[0] - p[0]) * (b[1] - a[1])) / distance(a[0], a[1], b[0], b[1]);
}

function len(p: Point, q: Point): number {
  return distance(p[0], p[1], q[0], q[1]);
}

function mid(p: Point, q: Point): Point {
  return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
}

function dot(u: Point, v: Point): number {
  return u[0] * v[0] + u[1] * v[1];
}

function vec(p: Point, q: Point): Point {
  return [q[0] - p[0], q[1] - p[1]];
}

/** Circumcentre as the intersection of two perpendicular bisectors. */
function circumcenter(p: Point, q: Point, r: Point): Point {
  const m1 = mid(p, q);
  const m2 = mid(q, r);
  return intersect(m1, [m1[0] - (q[1] - p[1]), m1[1] + (q[0] - p[0])], m2, [m2[0] - (r[1] - q[1]), m2[1] + (r[0] - q[0])]);
}

/** Point on the internal bisector of the angle at vertex v (direction = sum of unit vectors). */
function bisectorPoint(v: Point, p: Point, q: Point): Point {
  const u1 = vec(v, p);
  const u2 = vec(v, q);
  const l1 = Math.hypot(...u1);
  const l2 = Math.hypot(...u2);
  return [v[0] + u1[0] / l1 + u2[0] / l2, v[1] + u1[1] / l1 + u2[1] / l2];
}

function angle(p: Point, v: Point, q: Point): number {
  const a = vec(v, p);
  const b = vec(v, q);
  return Math.acos(dot(a, b) / (Math.hypot(...a) * Math.hypot(...b)));
}

function foot(p: Point, a: Point, b: Point): Point {
  const d = vec(a, b);
  const t = dot(vec(a, p), d) / dot(d, d);
  return [a[0] + t * d[0], a[1] + t * d[1]];
}

describe('35581 slot 4 (new problems) – structure', () => {
  it('has the 7 new problems with bagrut structure', () => {
    expect(newProblems.map((problem) => problem.id)).toEqual(newIds);
    for (const problem of newProblems) {
      expect(problem.topicId).toBe('euclidean-geometry');
      expect(problem.subtopicIds.length).toBeGreaterThanOrEqual(2);
      expect(problem.subtopicIds.length).toBeLessThanOrEqual(4);
      expect(problem.sections.length).toBeGreaterThanOrEqual(3);
      expect(problem.sections.length).toBeLessThanOrEqual(4);
      expect(problem.estimatedMinutes).toBeGreaterThanOrEqual(15);
      expect(problem.estimatedMinutes).toBeLessThanOrEqual(40);
      expect(problem.verified).toBe(false);
      expect(problem.source).toBe('ai-generated');
      expect(problem.figureSvg).toContain('viewBox="0 0 320 240"');
      expect(problem.figureSvg).not.toMatch(/<svg[^>]*\s(width|height)=/);
      const labels = ['א', 'ב', 'ג', 'ד'];
      problem.sections.forEach((section, index) => {
        expect(section.label).toBe(labels[index]);
        expect(section.id).toBe(`${problem.id}-${'abcd'[index]}`);
        expect(section.hints.length).toBeGreaterThanOrEqual(2);
        expect(section.hints.length).toBeLessThanOrEqual(3);
        expect(section.solutionSteps.length).toBeGreaterThanOrEqual(3);
        expect(section.solutionSteps.length).toBeLessThanOrEqual(8);
      });
    }
    const difficulties = newProblems.map((problem) => problem.difficulty);
    expect(difficulties.every((d) => d === 2 || d === 3)).toBe(true);
    expect(difficulties.filter((d) => d === 3).length).toBeGreaterThanOrEqual(3);
  });

  it('every numericAnswer section of the new problems is covered below', () => {
    const numericIds = newProblems.flatMap((problem) => problem.sections.filter((s) => s.numericAnswer !== undefined).map((s) => s.id));
    expect(numericIds.sort()).toEqual(
      [
        '35581-4-4-b', '35581-4-4-c', '35581-4-4-d',
        '35581-4-5-b', '35581-4-5-c', '35581-4-5-d',
        '35581-4-6-b', '35581-4-6-c', '35581-4-6-d',
        '35581-4-7-c', '35581-4-7-d',
        '35581-4-8-c', '35581-4-8-d',
        '35581-4-9-b', '35581-4-9-c', '35581-4-9-d',
        '35581-4-10-c', '35581-4-10-d',
      ].sort(),
    );
  });
});

describe('35581-4-4 – cyclic quadrilateral, intersecting diagonals', () => {
  const A: Point = [-3, 0];
  const B: Point = [0, 4];
  const C: Point = [8, 0];
  const D: Point = [0, -6];
  const O = circumcenter(A, B, C);
  const E = intersect(A, C, B, D);
  it('model satisfies the givens', () => {
    expect(len(O, D)).toBeCloseTo(len(O, A), 10); // D on the circle through A, B, C
    expect(len(A, B)).toBeCloseTo(5, 12);
    expect(len(D, C)).toBeCloseTo(10, 12);
    expect(len(A, E)).toBeCloseTo(3, 12);
    expect(len(B, E)).toBeCloseTo(4, 12);
    expect(angle(B, A, C)).toBeCloseTo(angle(B, D, C), 10); // inscribed angles on arc BC (part א)
  });
  it('35581-4-4-b', () => expectAnswer('35581-4-4-b', len(B, D)));
  it('35581-4-4-c', () => {
    expect(dot(vec(E, A), vec(E, B))).toBeCloseTo(0, 10);
    expectAnswer('35581-4-4-c', shoelace([A, B, E]));
  });
  it('35581-4-4-d', () => expectAnswer('35581-4-4-d', shoelace([A, B, C, D])));
});

describe('35581-4-5 – two tangents from an external point', () => {
  const O: Point = [0, 0];
  const P: Point = [25, 0];
  // Tangency points: A on the circle x²+y²=225 with OA ⟂ PA ⇒ A·(A−P)=0 ⇒ 25x = 225.
  const r = 15;
  const ax = (r * r) / P[0];
  const A: Point = [ax, Math.sqrt(r * r - ax * ax)];
  const B: Point = [ax, -Math.sqrt(r * r - ax * ax)];
  const M = intersect(A, B, P, O);
  const C: Point = [2 * O[0] - A[0], 2 * O[1] - A[1]];
  it('model satisfies the givens', () => {
    expect(len(P, A)).toBeCloseTo(20, 12);
    expect(len(P, B)).toBeCloseTo(20, 12);
    expect(len(A, B)).toBeCloseTo(24, 12);
    expect(dot(vec(A, O), vec(A, P))).toBeCloseTo(0, 10);
    expect(dot(vec(B, O), vec(B, P))).toBeCloseTo(0, 10);
    expect(len(A, M)).toBeCloseTo(len(M, B), 12);
    expect(dot(vec(P, O), vec(A, B))).toBeCloseTo(0, 10);
  });
  it('35581-4-5-b', () => expectAnswer('35581-4-5-b', len(O, A)));
  it('35581-4-5-c', () => expectAnswer('35581-4-5-c', shoelace([P, A, O, B])));
  it('35581-4-5-d', () => {
    const cross = vec(B, C)[0] * vec(P, O)[1] - vec(B, C)[1] * vec(P, O)[0];
    expect(cross).toBeCloseTo(0, 10); // BC ∥ PO
    expectAnswer('35581-4-5-d', len(B, C));
  });
});

describe('35581-4-6 – tangent–chord angle and angle bisector', () => {
  const phi = (65 * Math.PI) / 180; // any direction works: the circle through A, B, C is tangent to DA
  const D: Point = [0, 0];
  const B: Point = [4, 0];
  const C: Point = [9, 0];
  const A: Point = [6 * Math.cos(phi), 6 * Math.sin(phi)];
  const O = circumcenter(A, B, C);
  const E = intersect(A, bisectorPoint(A, B, C), B, C);
  it('model satisfies the givens', () => {
    expect(dot(vec(A, O), vec(A, D))).toBeCloseTo(0, 10); // DA tangent at A
    expect(len(D, A)).toBeCloseTo(6, 12);
    expect(len(D, B)).toBeCloseTo(4, 12);
    expect(angle(D, A, B)).toBeCloseTo(angle(A, C, B), 10); // tangent–chord angle
    expect(angle(B, A, E)).toBeCloseTo(angle(E, A, C), 10);
  });
  it('35581-4-6-b', () => expectAnswer('35581-4-6-b', len(B, C)));
  it('35581-4-6-c', () => expectAnswer('35581-4-6-c', len(B, E)));
  it('35581-4-6-d', () => expectAnswer('35581-4-6-d', shoelace([A, B, E]) / shoelace([D, C, A])));
  it('35581-4-6-d does not depend on the chosen direction of DA', () => {
    const A2: Point = [6 * Math.cos(1.1), 6 * Math.sin(1.1)];
    const E2 = intersect(A2, bisectorPoint(A2, B, C), B, C);
    expectAnswer('35581-4-6-d', shoelace([A2, B, E2]) / shoelace([D, C, A2]));
    expectAnswer('35581-4-6-c', len(B, E2));
  });
});

describe('35581-4-7 – medians, midsegments, parallelogram', () => {
  const A: Point = [0, 0];
  const B: Point = [12, 0];
  const C: Point = [4, 8];
  const D = mid(B, C);
  const E = mid(A, C);
  const G = intersect(A, D, B, E);
  const H = mid(A, G);
  const K = mid(B, G);
  it('model satisfies the givens', () => {
    expect(len(A, B)).toBeCloseTo(12, 12);
    expect(pointLineDistance(C, A, B)).toBeCloseTo(8, 12);
  });
  it('35581-4-7-a/b sanity (parallelogram, AG = 2GD)', () => {
    expect(vec(H, K)[0]).toBeCloseTo(vec(E, D)[0], 10);
    expect(vec(H, K)[1]).toBeCloseTo(vec(E, D)[1], 10);
    expect(len(A, G)).toBeCloseTo(2 * len(G, D), 10);
  });
  it('35581-4-7-c', () => expectAnswer('35581-4-7-c', pointLineDistance(G, A, B)));
  it('35581-4-7-d', () => {
    expectAnswer('35581-4-7-d', shoelace([H, K, D, E]));
    expect(shoelace([H, K, D, E]) / shoelace([A, B, C])).toBeCloseTo(1 / 3, 10);
  });
});

describe('35581-4-8 – two externally tangent circles with a common tangent', () => {
  const R = 9;
  const r = 4;
  const O1: Point = [0, R];
  const O2: Point = [12, r]; // AB on the x-axis; O1O2 must equal R + r
  const A: Point = [0, 0];
  const B: Point = [12, 0];
  const T: Point = [O1[0] + (R / (R + r)) * (O2[0] - O1[0]), O1[1] + (R / (R + r)) * (O2[1] - O1[1])];
  // Tangent at T: perpendicular to O1O2 through T; M is where it meets AB.
  const M = intersect(T, [T[0] - (O2[1] - O1[1]), T[1] + (O2[0] - O1[0])], A, B);
  it('model satisfies the givens', () => {
    expect(len(O1, O2)).toBeCloseTo(R + r, 12); // externally tangent
    expect(len(O1, T)).toBeCloseTo(R, 12);
    expect(len(O2, T)).toBeCloseTo(r, 12);
    expect(pointLineDistance(O1, A, B)).toBeCloseTo(R, 12);
    expect(pointLineDistance(O2, A, B)).toBeCloseTo(r, 12);
  });
  it('35581-4-8-a/b sanity', () => {
    expect(len(M, A)).toBeCloseTo(len(M, B), 10);
    expect(len(M, T)).toBeCloseTo(len(M, A), 10);
    expect(angle(A, T, B)).toBeCloseTo(Math.PI / 2, 10);
    expect(angle(O1, M, O2)).toBeCloseTo(Math.PI / 2, 10);
  });
  it('35581-4-8-c', () => expectAnswer('35581-4-8-c', len(A, B)));
  it('35581-4-8-d', () => expectAnswer('35581-4-8-d', shoelace([O1, M, O2])));
});

describe('35581-4-9 – parallelogram, point dividing a side, similar triangles', () => {
  const A: Point = [0, 0];
  const B: Point = [12, 0];
  const D: Point = [4, 6];
  const C: Point = [B[0] + D[0] - A[0], B[1] + D[1] - A[1]];
  const E: Point = [D[0] + (C[0] - D[0]) / 3, D[1] + (C[1] - D[1]) / 3];
  const F = intersect(A, E, B, D);
  const G = intersect(A, E, B, C);
  it('model satisfies the givens', () => {
    expect(len(D, E) / len(E, C)).toBeCloseTo(0.5, 12);
    expect(len(B, D)).toBeCloseTo(10, 12);
    expect(shoelace([A, B, C, D])).toBeCloseTo(72, 12);
    expect(len(B, G)).toBeGreaterThan(len(B, C)); // G on the extension of BC beyond C
  });
  it('35581-4-9-a sanity', () => expect(len(D, F) / len(F, B)).toBeCloseTo(1 / 3, 10));
  it('35581-4-9-b', () => expectAnswer('35581-4-9-b', len(D, F)));
  it('35581-4-9-c', () => expectAnswer('35581-4-9-c', shoelace([D, E, F])));
  it('35581-4-9-d', () => expectAnswer('35581-4-9-d', shoelace([C, E, G])));
});

describe('35581-4-10 – incircle of a right triangle (loci, cyclic quadrilateral)', () => {
  const C: Point = [0, 0];
  const A: Point = [0, 6];
  const B: Point = [8, 0];
  const I = intersect(A, bisectorPoint(A, B, C), B, bisectorPoint(B, A, C));
  const D = foot(I, B, C);
  const E = foot(I, A, C);
  const F = foot(I, A, B);
  const M = circumcenter(A, B, C);
  it('model satisfies the givens', () => {
    expect(angle(A, C, B)).toBeCloseTo(Math.PI / 2, 12);
    expect(len(A, C)).toBeCloseTo(6, 12);
    expect(len(B, C)).toBeCloseTo(8, 12);
    expect(angle(A, C, I)).toBeCloseTo(angle(I, C, B), 10); // third bisector also passes through I
  });
  it('35581-4-10-a/b sanity', () => {
    expect(len(I, D)).toBeCloseTo(len(I, E), 10);
    expect(len(I, E)).toBeCloseTo(len(I, F), 10);
    expect(len(C, D)).toBeCloseTo(len(I, D), 10);
    expect(len(A, E)).toBeCloseTo(len(A, F), 10);
    expect(angle(A, E, I) + angle(A, F, I)).toBeCloseTo(Math.PI, 10);
  });
  it('35581-4-10-c', () => expectAnswer('35581-4-10-c', pointLineDistance(I, A, B)));
  it('35581-4-10-d', () => {
    expect(len(M, mid(A, B))).toBeCloseTo(0, 10);
    expectAnswer('35581-4-10-d', len(I, M));
  });
});
