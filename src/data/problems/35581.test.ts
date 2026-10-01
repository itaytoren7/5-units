/**
 * Independent numeric verification of the 35581 problem bank.
 * Every numericAnswer is recomputed from first principles (counting, coordinate models,
 * numeric differentiation / root finding / integration, numeric optimisation) — never from the closed form.
 */
import { describe, expect, it } from 'vitest';
import { problems35581 } from './35581';
import {
  absoluteArea,
  binomialPmf,
  distance,
  enumerateProbability,
  findCriticalPoints,
  findRoots,
  numericDerivative,
  type RealFn,
} from './verify';

type Point = [number, number];

function answer(sectionId: string): number {
  for (const problem of problems35581) {
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

/** Golden-section search for the minimiser of a unimodal function on [a, b]. */
function argmin(f: RealFn, a: number, b: number): number {
  const g = (Math.sqrt(5) - 1) / 2;
  let lo = a;
  let hi = b;
  for (let i = 0; i < 200; i += 1) {
    const x1 = hi - g * (hi - lo);
    const x2 = lo + g * (hi - lo);
    if (f(x1) < f(x2)) hi = x2;
    else lo = x1;
  }
  return (lo + hi) / 2;
}

/** Tangent line to f at x0 as [slope, intercept], using a numeric derivative. */
function tangent(f: RealFn, x0: number): [number, number] {
  const m = numericDerivative(f, x0, 1e-6);
  return [m, f(x0) - m * x0];
}

describe('35581 problem bank structure', () => {
  it.each([3, 4, 6, 7, 8])('slot %i has exactly 3 problems with 3–4 sections', (slot) => {
    const slotProblems = problems35581.filter((problem) => problem.slot === slot);
    expect(slotProblems.length).toBe(3);
    for (const problem of slotProblems) {
      expect(problem.sections.length).toBeGreaterThanOrEqual(3);
      expect(problem.sections.length).toBeLessThanOrEqual(4);
      expect(problem.estimatedMinutes).toBeGreaterThanOrEqual(20);
      expect(problem.estimatedMinutes).toBeLessThanOrEqual(30);
      expect(problem.sections.map((section) => section.label)).toEqual(['א', 'ב', 'ג', 'ד'].slice(0, problem.sections.length));
      for (const section of problem.sections) {
        expect(section.hints.length).toBeGreaterThanOrEqual(2);
        expect(section.hints.length).toBeLessThanOrEqual(3);
        expect(section.solutionSteps.length).toBeGreaterThanOrEqual(3);
        expect(section.solutionSteps.length).toBeLessThanOrEqual(8);
      }
    }
    const difficulties = slotProblems.map((problem) => problem.difficulty).sort();
    expect(difficulties[0]).toBe(2);
    expect(difficulties[2]).toBe(3);
  });

  it('slot 4 problems have a viewBox-based figure', () => {
    for (const problem of problems35581.filter((item) => item.slot === 4)) {
      expect(problem.figureSvg).toContain('viewBox="0 0 320 240"');
      expect(problem.figureSvg).not.toMatch(/<svg[^>]*\s(width|height)=/);
    }
  });
});

describe('35581 slot 3 – probability (counting on a concrete population)', () => {
  // 1000 students: 500 in 5 units (300 physics), 500 not (100 physics).
  const school = { fiveAndPhysics: 300, fiveOnly: 200, physicsOnly: 100, neither: 400 };
  const schoolTotal = school.fiveAndPhysics + school.fiveOnly + school.physicsOnly + school.neither;
  const physics = (school.fiveAndPhysics + school.physicsOnly) / schoolTotal;

  it('35581-3-1-a', () => expectAnswer('35581-3-1-a', physics));
  it('35581-3-1-b', () => expectAnswer('35581-3-1-b', school.fiveAndPhysics / (school.fiveAndPhysics + school.physicsOnly)));
  it('35581-3-1-c (dependence)', () => {
    const five = (school.fiveAndPhysics + school.fiveOnly) / schoolTotal;
    expect(Math.abs(school.fiveAndPhysics / schoolTotal - five * physics)).toBeGreaterThan(0.05);
  });
  it('35581-3-1-d', () => {
    const draw: Array<[boolean, number]> = [[true, physics], [false, 1 - physics]];
    expectAnswer('35581-3-1-d', enumerateProbability(Array(5).fill(draw), (o) => o.filter(Boolean).length === 2));
  });

  // 10000 products: line A 6000 (300 defective), line B 4000 (400 defective).
  const factory = { aDefective: 300, aGood: 5700, bDefective: 400, bGood: 3600 };
  const defective = (factory.aDefective + factory.bDefective) / 10000;
  it('35581-3-2-a', () => expectAnswer('35581-3-2-a', defective));
  it('35581-3-2-b', () => expectAnswer('35581-3-2-b', factory.aDefective / (factory.aDefective + factory.bDefective)));
  it('35581-3-2-c (dependence)', () => {
    expect(Math.abs(factory.aDefective / 10000 - 0.6 * defective)).toBeGreaterThan(0.005);
  });
  it('35581-3-2-d', () => {
    const draw: Array<[boolean, number]> = [[true, defective], [false, 1 - defective]];
    expectAnswer('35581-3-2-d', enumerateProbability(Array(5).fill(draw), (o) => o.filter(Boolean).length >= 2));
  });

  // 100 club members: swim P(S)=40, S∩R = 30, neither = 35.
  const club = { both: 30, swimOnly: 40 - 30, neither: 35, runOnly: 100 - 30 - 10 - 35 };
  it('35581-3-3-a', () => expectAnswer('35581-3-3-a', (club.both + club.runOnly) / 100));
  it('35581-3-3-b', () => expectAnswer('35581-3-3-b', club.both / (club.both + club.runOnly)));
  it('35581-3-3-c (dependence)', () => {
    expect(Math.abs(club.both / 100 - 0.4 * ((club.both + club.runOnly) / 100))).toBeGreaterThan(0.05);
  });
  it('35581-3-3-d', () => {
    const p = (club.both + club.swimOnly) / 100;
    const draw: Array<[boolean, number]> = [[true, p], [false, 1 - p]];
    const spaces = Array(4).fill(draw);
    const exactlyTwo = enumerateProbability(spaces, (o) => o.filter(Boolean).length === 2);
    const atLeastOne = enumerateProbability(spaces, (o) => o.some(Boolean));
    expectAnswer('35581-3-3-d', exactlyTwo / atLeastOne);
    expect(exactlyTwo).toBeCloseTo(binomialPmf(4, 2, p), 12);
  });
});

describe('35581 slot 4 – geometry (coordinate models)', () => {
  // Trapezoid ABCD, AB ∥ DC, AB = 6, DC = 10, height 8, AC = 12.
  const hx = Math.sqrt(80);
  const A1: Point = [10 - hx, 8];
  const B1: Point = [16 - hx, 8];
  const C1: Point = [10, 0];
  const D1: Point = [0, 0];
  const O1 = intersect(A1, C1, B1, D1);
  it('35581-4-1 model satisfies the givens', () => {
    expect(len(A1, B1)).toBeCloseTo(6, 12);
    expect(len(D1, C1)).toBeCloseTo(10, 12);
    expect(len(A1, C1)).toBeCloseTo(12, 12);
  });
  it('35581-4-1-b', () => expectAnswer('35581-4-1-b', len(A1, O1)));
  it('35581-4-1-c', () => expectAnswer('35581-4-1-c', pointLineDistance(O1, A1, B1)));
  it('35581-4-1-d', () => expectAnswer('35581-4-1-d', shoelace([A1, O1, D1])));

  // Acute triangle ABC with altitude AD; AE diameter of the circumcircle.
  const A2: Point = [0, 6];
  const B2: Point = [-8, 0];
  const C2: Point = [2.5, 0];
  const D2: Point = [0, 0];
  // Circumcentre: intersection of the perpendicular bisectors of BC and AB.
  const midBC: Point = [(B2[0] + C2[0]) / 2, 0];
  const midAB: Point = [(A2[0] + B2[0]) / 2, (A2[1] + B2[1]) / 2];
  const center = intersect(midBC, [midBC[0], 1], midAB, [midAB[0] + (A2[1] - B2[1]), midAB[1] - (A2[0] - B2[0])]);
  const E2: Point = [2 * center[0] - A2[0], 2 * center[1] - A2[1]];
  it('35581-4-2 model satisfies the givens', () => {
    expect(len(A2, B2)).toBeCloseTo(10, 12);
    expect(len(A2, C2)).toBeCloseTo(6.5, 12);
    expect(len(A2, D2)).toBeCloseTo(6, 12);
    expect(len(center, A2)).toBeCloseTo(len(center, B2), 10);
    expect(len(center, A2)).toBeCloseTo(len(center, C2), 10);
    const ab2 = len(A2, B2) ** 2;
    const ac2 = len(A2, C2) ** 2;
    const bc2 = len(B2, C2) ** 2;
    expect(ab2 + ac2 > bc2 && ab2 + bc2 > ac2 && ac2 + bc2 > ab2).toBe(true);
  });
  it('35581-4-2-b', () => expectAnswer('35581-4-2-b', len(center, A2)));
  it('35581-4-2-c', () => expectAnswer('35581-4-2-c', shoelace([A2, B2, D2]) / shoelace([A2, E2, C2])));
  it('35581-4-2-d', () => expectAnswer('35581-4-2-d', pointLineDistance(C2, A2, E2)));

  // Triangle ABC with AB = 12, AC = 8, distance of C from AB = 5; AD bisector, DE ∥ AB.
  const A3: Point = [0, 0];
  const B3: Point = [12, 0];
  const C3: Point = [Math.sqrt(39), 5];
  const ub: Point = [(B3[0] - A3[0]) / 12, (B3[1] - A3[1]) / 12];
  const uc: Point = [(C3[0] - A3[0]) / 8, (C3[1] - A3[1]) / 8];
  const D3 = intersect(A3, [ub[0] + uc[0], ub[1] + uc[1]], B3, C3);
  const E3 = intersect(D3, [D3[0] + 1, D3[1]], A3, C3);
  it('35581-4-3 model satisfies the givens', () => {
    expect(len(A3, C3)).toBeCloseTo(8, 12);
    expect(len(A3, E3)).toBeCloseTo(len(D3, E3), 10);
    expect(D3[1]).toBeCloseTo(3, 10);
  });
  it('35581-4-3-b', () => expectAnswer('35581-4-3-b', len(D3, E3)));
  it('35581-4-3-c', () => expectAnswer('35581-4-3-c', shoelace([A3, B3, D3, E3]) / shoelace([A3, B3, C3])));
  it('35581-4-3-d', () => expectAnswer('35581-4-3-d', shoelace([A3, B3, D3, E3])));
});

describe('35581 slot 6 – calculus of polynomial / rational / root', () => {
  const f1: RealFn = (x) => x ** 3 - 6 * x ** 2 + 9 * x;
  const crit1 = findCriticalPoints(f1, -1, 5);
  const xMax = crit1.reduce((best, x) => (f1(x) > f1(best) ? x : best));
  const yMax = f1(xMax);
  const others = findRoots((x) => f1(x) - yMax, -1, 6).filter((x) => Math.abs(x - xMax) > 1e-3);
  it('35581-6-1-c', () => {
    expect(others.length).toBe(1);
    expectAnswer('35581-6-1-c', others[0], 6);
  });
  it('35581-6-1-d', () => expectAnswer('35581-6-1-d', absoluteArea((x) => f1(x) - yMax, xMax, others[0]), 6));

  const f2: RealFn = (x) => (x * x) / (x * x - 4);
  it('35581-6-2-c', () => {
    const [, b] = tangent(f2, 3);
    expectAnswer('35581-6-2-c', b, 6);
  });
  it('35581-6-2-d', () => expectAnswer('35581-6-2-d', absoluteArea((x) => numericDerivative(f2, x), -1, 1), 6));

  const f3: RealFn = (x) => x * Math.sqrt(4 - x);
  it('35581-6-3-d', () => {
    const [m1, b1] = tangent(f3, 0);
    const [m2, b2] = tangent(f3, 3);
    const x0 = (b2 - b1) / (m1 - m2);
    const vertices: Point[] = [[-b1 / m1, 0], [-b2 / m2, 0], [x0, m1 * x0 + b1]];
    expectAnswer('35581-6-3-d', shoelace(vertices), 5);
  });
});

describe('35581 slot 7 – trigonometric calculus (no trig integrals)', () => {
  const f1: RealFn = (x) => Math.sin(x) * Math.cos(x) + Math.cos(x);
  it('35581-7-1-c', () => {
    const x0 = findRoots(f1, 0.1, 2)[0];
    const [m, b] = tangent(f1, x0);
    expectAnswer('35581-7-1-c', shoelace([[0, 0], [-b / m, 0], [0, b]]), 6);
  });

  const f2: RealFn = (x) => Math.cos(2 * x) + 2 * Math.sin(x);
  it('35581-7-2-c', () => {
    const [m, b] = tangent(f2, Math.PI);
    const xOnLine = (1 - b) / m;
    expectAnswer('35581-7-2-c', shoelace([[0, 1], [xOnLine, 1], [0, b]]), 6);
  });
  it('35581-7-2-d', () => {
    const crit = findCriticalPoints(f2, 0, Math.PI);
    const maxValue = Math.max(...crit.map(f2));
    const maxima = crit.filter((x) => Math.abs(f2(x) - maxValue) < 1e-8);
    expect(maxima.length).toBe(2);
    expect(findRoots((x) => f2(x) - (maxValue - 0.05), 0, Math.PI).length).toBe(4);
    expectAnswer('35581-7-2-d', maxValue, 8);
  });

  const f3: RealFn = (x) => Math.sin(x) / (2 - Math.cos(x));
  it('35581-7-3-c', () => {
    const z0 = findRoots(f3, -0.5, 0.7)[0];
    const zPi = findRoots(f3, 3, 3.4)[0];
    const [m1, b1] = tangent(f3, z0);
    const [m2, b2] = tangent(f3, zPi);
    const x0 = (b2 - b1) / (m1 - m2);
    expectAnswer('35581-7-3-c', shoelace([[-b1 / m1, 0], [-b2 / m2, 0], [x0, m1 * x0 + b1]]), 6);
  });
});

describe('35581 slot 8 – graphical extremum problems', () => {
  it('35581-8-1-b', () => {
    const d: RealFn = (x) => distance(x, Math.sqrt(x), 4.5, 0);
    expectAnswer('35581-8-1-b', d(argmin(d, 0, 20)), 8);
  });
  it('35581-8-2-b', () => {
    const f: RealFn = (x) => 8 / (x * x + 4);
    const negArea: RealFn = (t) => -shoelace([[-t, 0], [t, 0], [t, f(t)], [-t, f(t)]]);
    expectAnswer('35581-8-2-b', -negArea(argmin(negArea, 0.01, 20)), 8);
  });
  const parabola: RealFn = (x) => 4 - x * x;
  const triangleArea: RealFn = (t) => {
    const [m, b] = tangent(parabola, t);
    return shoelace([[0, 0], [-b / m, 0], [0, b]]);
  };
  const tBest = argmin(triangleArea, 0.05, 1.99);
  it('35581-8-3-c', () => expectAnswer('35581-8-3-c', tBest, 5));
  it('35581-8-3-d', () => expectAnswer('35581-8-3-d', triangleArea(tBest), 6));
});
