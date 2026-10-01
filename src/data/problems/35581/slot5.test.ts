/**
 * Independent numeric verification of 35581 slot 5 (plane trigonometry).
 * Every numericAnswer is recomputed from an explicit coordinate model (vertices placed with
 * Math.cos / Math.sin of the given angles), measuring lengths, areas (shoelace), angles (dot products)
 * and radii (circumcentre from perpendicular bisectors). Angles defined by a condition are found
 * numerically with findRoots on the geometric condition — never from the closed form in the solution.
 */
import { describe, expect, it } from 'vitest';
import { slot5Problems } from './slot5';
import { degreesToRadians, distance, findRoots, radiansToDegrees } from '../verify';

type Point = [number, number];

function answer(sectionId: string): number {
  for (const problem of slot5Problems) {
    const section = problem.sections.find((item) => item.id === sectionId);
    if (section) {
      if (section.numericAnswer === undefined) throw new Error(`${sectionId} has no numericAnswer`);
      return section.numericAnswer;
    }
  }
  throw new Error(`Unknown section ${sectionId}`);
}

function expectAnswer(sectionId: string, computed: number, digits = 8) {
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

/** Angle PVQ in degrees, from the dot product. */
function angleAt(v: Point, p: Point, q: Point): number {
  const a: Point = [p[0] - v[0], p[1] - v[1]];
  const b: Point = [q[0] - v[0], q[1] - v[1]];
  return radiansToDegrees(Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))));
}

/** Foot of the perpendicular from p to line ab. */
function foot(p: Point, a: Point, b: Point): Point {
  const t = ((p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1])) / len(a, b) ** 2;
  return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
}

/** Circumcentre as the intersection of two perpendicular bisectors. */
function circumcenter(a: Point, b: Point, c: Point): Point {
  const mab: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const mbc: Point = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
  return intersect(mab, [mab[0] - (b[1] - a[1]), mab[1] + (b[0] - a[0])], mbc, [mbc[0] - (c[1] - b[1]), mbc[1] + (c[0] - b[0])]);
}

const rad = degreesToRadians;

describe('35581 slot 5 structure', () => {
  it('has 10 bagrut-style problems with valid structure', () => {
    expect(slot5Problems.length).toBeGreaterThanOrEqual(10);
    slot5Problems.forEach((problem, index) => {
      expect(problem.id).toBe(`35581-5-${index + 1}`);
      expect(problem.slot).toBe(5);
      expect(problem.topicId).toBe('trigonometry');
      expect(problem.subtopicIds).not.toContain('trig-sum-identities');
      expect(problem.subtopicIds.length).toBeGreaterThanOrEqual(2);
      expect(problem.subtopicIds.length).toBeLessThanOrEqual(4);
      expect(problem.sections.length).toBeGreaterThanOrEqual(3);
      expect(problem.sections.length).toBeLessThanOrEqual(4);
      expect(problem.estimatedMinutes).toBeGreaterThanOrEqual(15);
      expect(problem.estimatedMinutes).toBeLessThanOrEqual(40);
      expect(problem.figureSvg).toContain('viewBox="0 0 320 240"');
      expect(problem.figureSvg).not.toMatch(/<svg[^>]*\s(width|height)=/);
      expect(problem.sections.map((section) => section.label)).toEqual(['א', 'ב', 'ג', 'ד'].slice(0, problem.sections.length));
      problem.sections.forEach((section, i) => {
        expect(section.id).toBe(`${problem.id}-${'abcd'[i]}`);
        expect(section.hints.length).toBeGreaterThanOrEqual(2);
        expect(section.hints.length).toBeLessThanOrEqual(3);
        expect(section.solutionSteps.length).toBeGreaterThanOrEqual(3);
        expect(section.solutionSteps.length).toBeLessThanOrEqual(8);
      });
    });
    const difficulties = slot5Problems.map((problem) => problem.difficulty);
    expect(difficulties.every((d) => d === 2 || d === 3)).toBe(true);
    expect(difficulties.filter((d) => d === 3).length).toBeGreaterThanOrEqual(4);
  });
});

describe('35581-5-1 isosceles triangle, apex 2α', () => {
  const a = 8;
  const model = (al: number) => {
    const A: Point = [0, 0];
    const B: Point = [-a * Math.sin(al), -a * Math.cos(al)];
    const C: Point = [a * Math.sin(al), -a * Math.cos(al)];
    return { A, B, C, D: foot(A, B, C), E: foot(B, A, C) };
  };
  const roots = findRoots((al) => {
    const m = model(al);
    return len(m.A, m.E) - len(m.B, m.C);
  }, rad(1), rad(44.9));
  it('condition AE = BC has a single root', () => expect(roots.length).toBe(1));
  const m = model(roots[0]);
  it('model satisfies the givens', () => {
    expect(len(m.A, m.B)).toBeCloseTo(8, 12);
    expect(len(m.A, m.C)).toBeCloseTo(8, 12);
    expect(angleAt(m.A, m.B, m.C)).toBeCloseTo(2 * radiansToDegrees(roots[0]), 10);
  });
  it('sections a, b expressions match the model', () => {
    for (const deg of [15, 30]) {
      const mm = model(rad(deg));
      expect(len(mm.B, mm.C)).toBeCloseTo(2 * a * Math.sin(rad(deg)), 10);
      expect(len(mm.A, mm.E)).toBeCloseTo(a * Math.cos(rad(2 * deg)), 10);
      expect(len(mm.E, mm.C)).toBeCloseTo(2 * a * Math.sin(rad(deg)) ** 2, 10);
      expect(shoelace([mm.A, mm.B, mm.C])).toBeCloseTo(0.5 * a * a * Math.sin(rad(2 * deg)), 10);
    }
  });
  it('35581-5-1-c', () => expectAnswer('35581-5-1-c', radiansToDegrees(roots[0])));
  it('35581-5-1-d', () => expectAnswer('35581-5-1-d', shoelace([m.B, m.E, m.C])));
});

describe('35581-5-2 chord and inscribed angle', () => {
  const R = 6;
  const al = rad(35);
  const O: Point = [0, 0];
  const A: Point = [-R * Math.sin(al), -R * Math.cos(al)];
  const B: Point = [R * Math.sin(al), -R * Math.cos(al)];
  const C: Point = [0, R];
  it('model satisfies the givens', () => {
    for (const p of [A, B, C]) expect(len(O, p)).toBeCloseTo(R, 12);
    expect(angleAt(C, A, B)).toBeCloseTo(35, 10);
    expect(len(C, A)).toBeCloseTo(len(C, B), 12);
  });
  it('section a expressions match the model', () => {
    expect(len(A, B)).toBeCloseTo(2 * R * Math.sin(al), 10);
    expect(shoelace([A, O, B])).toBeCloseTo(0.5 * R * R * Math.sin(2 * al), 10);
  });
  it('35581-5-2-c', () => expectAnswer('35581-5-2-c', shoelace([A, B, C])));
  it('35581-5-2-d', () => {
    // arc length by summing many tiny chords along the minor arc
    const start = Math.atan2(A[1], A[0]);
    const end = Math.atan2(B[1], B[0]);
    const n = 200000;
    let arc = 0;
    for (let i = 0; i < n; i += 1) {
      const t1 = start + ((end - start) * i) / n;
      const t2 = start + ((end - start) * (i + 1)) / n;
      arc += len([R * Math.cos(t1), R * Math.sin(t1)], [R * Math.cos(t2), R * Math.sin(t2)]);
    }
    expectAnswer('35581-5-2-d', arc, 6);
  });
});

describe('35581-5-3 trapezoid', () => {
  const Dp: Point = [0, 0];
  const C: Point = [12, 0];
  const A: Point = [6 * Math.cos(rad(55)), 6 * Math.sin(rad(55))];
  const h = A[1];
  const B: Point = [12 - h / Math.tan(rad(65)), h];
  it('model satisfies the givens', () => {
    expect(len(A, Dp)).toBeCloseTo(6, 12);
    expect(len(Dp, C)).toBeCloseTo(12, 12);
    expect(angleAt(Dp, A, C)).toBeCloseTo(55, 10);
    expect(angleAt(C, B, Dp)).toBeCloseTo(65, 10);
    expect(B[1]).toBeCloseTo(A[1], 12);
  });
  it('35581-5-3-b', () => expectAnswer('35581-5-3-b', shoelace([A, B, C, Dp])));
  it('35581-5-3-c', () => expectAnswer('35581-5-3-c', len(B, Dp)));
  it('35581-5-3-d', () => expectAnswer('35581-5-3-d', angleAt(Dp, A, B)));
});

describe('35581-5-4 angle bisector', () => {
  const A: Point = [0, 0];
  const B: Point = [10, 0];
  const C: Point = [6 * Math.cos(rad(80)), 6 * Math.sin(rad(80))];
  const Dp = intersect(A, [1 + Math.cos(rad(80)), Math.sin(rad(80))], B, C);
  it('model satisfies the givens', () => {
    expect(len(A, C)).toBeCloseTo(6, 12);
    expect(angleAt(A, B, C)).toBeCloseTo(80, 10);
    expect(angleAt(A, B, Dp)).toBeCloseTo(angleAt(A, Dp, C), 10);
  });
  it('section a formula matches models', () => {
    for (const [b, c, deg] of [[3, 7, 25], [5, 4, 50]]) {
      const P: Point = [c, 0];
      const Q: Point = [b * Math.cos(rad(2 * deg)), b * Math.sin(rad(2 * deg))];
      const X = intersect([0, 0], [Math.cos(rad(deg)), Math.sin(rad(deg))], P, Q);
      expect(len([0, 0], X)).toBeCloseTo((2 * b * c * Math.cos(rad(deg))) / (b + c), 10);
    }
  });
  it('35581-5-4-b', () => expectAnswer('35581-5-4-b', len(B, C)));
  it('35581-5-4-c', () => expectAnswer('35581-5-4-c', len(A, Dp)));
  it('35581-5-4-d', () => {
    const O = circumcenter(A, B, Dp);
    expect(len(O, A)).toBeCloseTo(len(O, Dp), 10);
    expectAnswer('35581-5-4-d', len(O, B));
  });
});

describe('35581-5-5 cyclic quadrilateral', () => {
  // Build B, A, C for an angle β, then D on the far side of AC with DA = 3, DC = 5; find β so that D is on the circle ABC.
  const build = (beta: number) => {
    const B: Point = [0, 0];
    const A: Point = [6, 0];
    const C: Point = [4 * Math.cos(beta), 4 * Math.sin(beta)];
    const ac = len(A, C);
    const angCAD = Math.acos((9 + ac * ac - 25) / (2 * 3 * ac));
    const u: Point = [(C[0] - A[0]) / ac, (C[1] - A[1]) / ac];
    const t = -angCAD; // rotate clockwise from AC → away from B
    const Dp: Point = [A[0] + 3 * (u[0] * Math.cos(t) - u[1] * Math.sin(t)), A[1] + 3 * (u[0] * Math.sin(t) + u[1] * Math.cos(t))];
    const O = circumcenter(A, B, C);
    return { A, B, C, D: Dp, O };
  };
  const roots = findRoots((beta) => {
    const m = build(beta);
    return len(m.O, m.D) - len(m.O, m.A);
  }, rad(20), rad(170));
  it('a single β puts D on the circle', () => expect(roots.length).toBe(1));
  const m = build(roots[0]);
  it('model satisfies the givens', () => {
    expect(len(m.A, m.B)).toBeCloseTo(6, 12);
    expect(len(m.B, m.C)).toBeCloseTo(4, 12);
    expect(len(m.C, m.D)).toBeCloseTo(5, 10);
    expect(len(m.D, m.A)).toBeCloseTo(3, 10);
    expect(len(m.O, m.D)).toBeCloseTo(len(m.O, m.A), 9);
    const side = (p: Point) => Math.sign((m.C[0] - m.A[0]) * (p[1] - m.A[1]) - (m.C[1] - m.A[1]) * (p[0] - m.A[0]));
    expect(side(m.D)).not.toBe(side(m.B));
  });
  it('35581-5-5-a', () => expectAnswer('35581-5-5-a', angleAt(m.B, m.A, m.C)));
  it('35581-5-5-b', () => expectAnswer('35581-5-5-b', len(m.A, m.C)));
  it('35581-5-5-c', () => expectAnswer('35581-5-5-c', shoelace([m.A, m.B, m.C, m.D])));
  it('35581-5-5-d', () => expectAnswer('35581-5-5-d', len(m.O, m.B)));
});

describe('35581-5-6 rhombus', () => {
  const a = 5;
  const model = (al: number) => {
    const A: Point = [0, 0];
    const B: Point = [a, 0];
    const Dp: Point = [a * Math.cos(2 * al), a * Math.sin(2 * al)];
    const C: Point = [B[0] + Dp[0], Dp[1]];
    return { A, B, C, D: Dp };
  };
  const roots = findRoots((al) => {
    const m = model(al);
    return shoelace([m.A, m.B, m.C, m.D]) - len(m.B, m.D) ** 2;
  }, rad(1), rad(44.9));
  it('condition S = BD² has a single root', () => expect(roots.length).toBe(1));
  const m = model(roots[0]);
  it('model satisfies the givens', () => {
    expect(len(m.B, m.C)).toBeCloseTo(5, 12);
    expect(len(m.C, m.D)).toBeCloseTo(5, 12);
    expect(angleAt(m.A, m.B, m.C)).toBeCloseTo(angleAt(m.A, m.C, m.D), 10);
  });
  it('sections a, b expressions match the model', () => {
    for (const deg of [20, 35]) {
      const mm = model(rad(deg));
      expect(len(mm.A, mm.C)).toBeCloseTo(2 * a * Math.cos(rad(deg)), 10);
      expect(len(mm.B, mm.D)).toBeCloseTo(2 * a * Math.sin(rad(deg)), 10);
      expect(len(mm.A, mm.C) ** 2 - len(mm.B, mm.D) ** 2).toBeCloseTo(4 * a * a * Math.cos(rad(2 * deg)), 9);
    }
  });
  it('35581-5-6-c', () => expectAnswer('35581-5-6-c', radiansToDegrees(roots[0])));
  it('35581-5-6-d', () => expectAnswer('35581-5-6-d', pointLineDistance(m.D, m.A, m.B)));
});

describe('35581-5-7 incircle of a right triangle', () => {
  const c = 10;
  const model = (al: number) => {
    const C: Point = [0, 0];
    const A: Point = [c * Math.cos(al), 0];
    const B: Point = [0, c * Math.sin(al)];
    // incentre: intersection of the bisectors from A and from C
    const uAB: Point = [(B[0] - A[0]) / c, (B[1] - A[1]) / c];
    const bisA: Point = [A[0] + uAB[0] - 1, A[1] + uAB[1]];
    const O = intersect(A, bisA, C, [1, 1]);
    return { A, B, C, O, r: pointLineDistance(O, A, B) };
  };
  const roots = findRoots((al) => model(al).r - c / 5, rad(1), rad(44.9));
  it('condition r = c/5 has a single root below 45°', () => expect(roots.length).toBe(1));
  const m = model(roots[0]);
  it('model satisfies the givens', () => {
    expect(len(m.A, m.B)).toBeCloseTo(10, 12);
    expect(angleAt(m.C, m.A, m.B)).toBeCloseTo(90, 10);
    expect(pointLineDistance(m.O, m.A, m.C)).toBeCloseTo(m.r, 10);
    expect(pointLineDistance(m.O, m.B, m.C)).toBeCloseTo(m.r, 10);
  });
  it('section a radius formula matches the model', () => {
    for (const deg of [20, 60]) {
      const al = rad(deg);
      expect(model(al).r).toBeCloseTo((c * (Math.sin(al) + Math.cos(al) - 1)) / 2, 10);
    }
  });
  it('35581-5-7-b', () => expectAnswer('35581-5-7-b', radiansToDegrees(roots[0])));
  it('35581-5-7-c', () => expectAnswer('35581-5-7-c', shoelace([m.A, m.B, m.C]) - Math.PI * m.r ** 2));
  it('35581-5-7-d', () => expectAnswer('35581-5-7-d', len(m.A, m.O)));
});

describe('35581-5-8 regular pentagon', () => {
  const R = 6;
  const V: Point[] = [0, 1, 2, 3, 4].map((k) => [R * Math.cos(rad(90 + 72 * k)), R * Math.sin(rad(90 + 72 * k))]);
  it('model satisfies the givens', () => {
    for (let i = 0; i < 5; i += 1) expect(len(V[i], V[(i + 1) % 5])).toBeCloseTo(len(V[0], V[1]), 12);
  });
  it('section b ratio matches the model', () => expect(len(V[0], V[2]) / len(V[0], V[1])).toBeCloseTo(2 * Math.cos(rad(36)), 12));
  it('35581-5-8-c', () => expectAnswer('35581-5-8-c', shoelace(V)));
  it('35581-5-8-d', () => {
    const r = Math.min(...V.map((p, i) => pointLineDistance([0, 0], p, V[(i + 1) % 5])));
    expectAnswer('35581-5-8-d', (Math.PI * r * r) / (Math.PI * R * R));
  });
});

describe('35581-5-9 altitude and sin(α+β)', () => {
  const Dp: Point = [0, 0];
  const A: Point = [0, 6];
  const B: Point = [-6 / Math.tan(rad(40)), 0];
  const C: Point = [6 / Math.tan(rad(65)), 0];
  it('model satisfies the givens', () => {
    expect(angleAt(B, A, C)).toBeCloseTo(40, 10);
    expect(angleAt(C, A, B)).toBeCloseTo(65, 10);
    expect(pointLineDistance(A, B, C)).toBeCloseTo(6, 12);
    expect(angleAt(Dp, A, C)).toBeCloseTo(90, 10);
  });
  it('section b identity holds in the model', () => {
    expect(len(A, B) * len(A, C) * Math.sin(rad(105))).toBeCloseTo(6 * len(B, C), 10);
  });
  it('35581-5-9-c', () => expectAnswer('35581-5-9-c', len(B, C)));
  it('35581-5-9-d', () => {
    const O = circumcenter(A, B, C);
    expect(len(O, A)).toBeCloseTo(len(O, C), 10);
    expectAnswer('35581-5-9-d', len(O, B));
  });
});

describe('35581-5-10 sector and segment', () => {
  const R = 6;
  const model = (th: number) => ({
    O: [0, 0] as Point,
    A: [R * Math.cos(Math.PI / 2 + th / 2), R * Math.sin(Math.PI / 2 + th / 2)] as Point,
    B: [R * Math.cos(Math.PI / 2 - th / 2), R * Math.sin(Math.PI / 2 - th / 2)] as Point,
  });
  /** Segment area by polygonal approximation of the region between the arc and the chord. */
  const segmentArea = (th: number) => {
    const n = 20000;
    const pts: Point[] = [];
    for (let i = 0; i <= n; i += 1) {
      const t = Math.PI / 2 + th / 2 - (th * i) / n;
      pts.push([R * Math.cos(t), R * Math.sin(t)]);
    }
    return shoelace(pts);
  };
  it('model satisfies the givens', () => {
    const m = model((2 * Math.PI) / 3);
    expect(angleAt(m.O, m.A, m.B)).toBeCloseTo(120, 10);
    expect(len(m.O, m.A)).toBeCloseTo(R, 12);
  });
  it('35581-5-10-b', () => {
    const th = (2 * Math.PI) / 3;
    const m = model(th);
    const n = 200000;
    let arc = 0;
    for (let i = 0; i < n; i += 1) {
      const t1 = (th * i) / n;
      const t2 = (th * (i + 1)) / n;
      arc += len([R * Math.cos(t1), R * Math.sin(t1)], [R * Math.cos(t2), R * Math.sin(t2)]);
    }
    expectAnswer('35581-5-10-b', arc + len(m.A, m.B), 6);
  });
  const roots = findRoots((th) => {
    const m = model(th);
    return shoelace([m.O, m.A, m.B]) - (R * R) / 4;
  }, 0.001, Math.PI - 0.001);
  it('35581-5-10-c (two roots π/6 and 5π/6)', () => {
    expect(roots.length).toBe(2);
    expect(roots[0]).toBeCloseTo(Math.PI / 6, 9);
    expect(roots[1]).toBeCloseTo((5 * Math.PI) / 6, 9);
  });
  it('35581-5-10-d', () => expectAnswer('35581-5-10-d', segmentArea(roots[1]), 5));
});
