/**
 * Independent numeric verification of 35581 question 1 in the new format ("שאלות קצרות").
 * Every numericAnswer is recomputed from the givens by a route that differs from the closed form in the
 * solution text: counting on concrete populations, coordinate models, simulation of motion / filling,
 * direct iteration of sequences, numeric root finding, differentiation, integration and optimisation.
 */
import { describe, expect, it } from 'vitest';
import { shortProblems } from './short';
import { questionnaire35581 } from '../../syllabus/35581';
import {
  absoluteArea,
  bisect,
  degreesToRadians,
  distance,
  enumerateProbability,
  findCriticalPoints,
  findRoots,
  numericDerivative,
  simpson,
  type RealFn,
} from '../verify';

type Point = [number, number];

const checked = new Set<string>();

function section(sectionId: string) {
  for (const problem of shortProblems) {
    const found = problem.sections.find((item) => item.id === sectionId);
    if (found) return found;
  }
  throw new Error(`Unknown section ${sectionId}`);
}

function expectAnswer(sectionId: string, computed: number, digits = 8) {
  const found = section(sectionId);
  if (found.numericAnswer === undefined) throw new Error(`${sectionId} has no numericAnswer`);
  expect(found.numericAnswer).toBeCloseTo(computed, digits);
  checked.add(sectionId);
}

const len = (p: Point, q: Point) => distance(p[0], p[1], q[0], q[1]);

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

/** Angle PVQ in degrees. */
function angleAt(v: Point, p: Point, q: Point): number {
  const dot = (p[0] - v[0]) * (q[0] - v[0]) + (p[1] - v[1]) * (q[1] - v[1]);
  return (Math.acos(dot / (len(v, p) * len(v, q))) * 180) / Math.PI;
}

/** Tangent line to f at x0 as [slope, intercept], using a numeric derivative. */
function tangent(f: RealFn, x0: number): [number, number] {
  const m = numericDerivative(f, x0, 1e-6);
  return [m, f(x0) - m * x0];
}

/** Maximum of f on [a, b] by a grid scan refined with golden-section search. */
function maximum(f: RealFn, a: number, b: number, steps = 2000): { x: number; value: number } {
  const h = (b - a) / steps;
  let best = a;
  for (let i = 0; i <= steps; i += 1) if (f(a + i * h) > f(best)) best = a + i * h;
  let lo = Math.max(a, best - h);
  let hi = Math.min(b, best + h);
  const g = (Math.sqrt(5) - 1) / 2;
  for (let i = 0; i < 200; i += 1) {
    const x1 = hi - g * (hi - lo);
    const x2 = lo + g * (hi - lo);
    if (f(x1) > f(x2)) hi = x2;
    else lo = x1;
  }
  const x = (lo + hi) / 2;
  return { x, value: f(x) };
}

const SECTION_TOPIC: Record<string, string> = {
  '35581-1-201-a': 'probability',
  '35581-1-201-b': 'sequences',
  '35581-1-201-c': 'trigonometry',
  '35581-1-201-d': 'differential-calculus',
  '35581-1-202-a': 'word-problems',
  '35581-1-202-b': 'induction',
  '35581-1-202-c': 'euclidean-geometry',
  '35581-1-202-d': 'integral-calculus',
  '35581-1-203-a': 'algebra',
  '35581-1-203-b': 'probability',
  '35581-1-203-c': 'trigonometry',
  '35581-1-203-d': 'differential-calculus',
  '35581-1-204-a': 'sequences',
  '35581-1-204-b': 'euclidean-geometry',
  '35581-1-204-c': 'differential-calculus',
  '35581-1-204-d': 'word-problems',
  '35581-1-205-a': 'probability',
  '35581-1-205-b': 'induction',
  '35581-1-205-c': 'integral-calculus',
  '35581-1-205-d': 'euclidean-geometry',
  '35581-1-206-a': 'word-problems',
  '35581-1-206-b': 'sequences',
  '35581-1-206-c': 'trigonometry',
  '35581-1-206-d': 'differential-calculus',
  '35581-1-207-a': 'algebra',
  '35581-1-207-b': 'probability',
  '35581-1-207-c': 'euclidean-geometry',
  '35581-1-207-d': 'integral-calculus',
  '35581-1-208-a': 'differential-calculus',
  '35581-1-208-b': 'sequences',
  '35581-1-208-c': 'trigonometry',
  '35581-1-208-d': 'probability',
};

describe('35581 short questions – structure', () => {
  it('has 8 sets of four independent short sections', () => {
    expect(shortProblems.map((problem) => problem.id)).toEqual([201, 202, 203, 204, 205, 206, 207, 208].map((n) => `35581-1-${n}`));
    for (const problem of shortProblems) {
      expect(problem.questionnaire).toBe('35581');
      expect(problem.slot).toBe(1);
      expect(problem.format).toBe('short-questions');
      expect(problem.source).toBe('ai-generated');
      expect(problem.verified).toBe(false);
      expect(problem.title.startsWith('שאלות קצרות')).toBe(true);
      expect([2, 3]).toContain(problem.difficulty);
      expect(problem.estimatedMinutes).toBeGreaterThanOrEqual(15);
      expect(problem.estimatedMinutes).toBeLessThanOrEqual(40);
      expect(problem.sections.length).toBe(4);
      expect(problem.sections.map((s) => s.label)).toEqual(['א', 'ב', 'ג', 'ד']);
      problem.sections.forEach((s, index) => {
        expect(s.id).toBe(`${problem.id}-${['a', 'b', 'c', 'd'][index]}`);
        expect(s.hints.length).toBeGreaterThanOrEqual(2);
        expect(s.hints.length).toBeLessThanOrEqual(3);
        expect(s.solutionSteps.length).toBeGreaterThanOrEqual(3);
        expect(s.solutionSteps.length).toBeLessThanOrEqual(8);
      });
    }
  });

  it('mixes at least 3 different topics in every set, and topicId is the topic of section א', () => {
    const topicOfSubtopic = new Map(questionnaire35581.topics.flatMap((topic) => topic.subtopics.map((sub) => [sub.id, topic.id] as const)));
    expect(Object.keys(SECTION_TOPIC).sort()).toEqual(shortProblems.flatMap((problem) => problem.sections.map((s) => s.id)).sort());
    for (const problem of shortProblems) {
      const topics = problem.sections.map((s) => SECTION_TOPIC[s.id]);
      expect(new Set(topics).size, `${problem.id}: topics`).toBeGreaterThanOrEqual(3);
      expect(problem.topicId).toBe(topics[0]);
      // every section's topic is represented among the listed subtopics, and nothing else is listed
      const listed = new Set(problem.subtopicIds.map((id) => topicOfSubtopic.get(id)));
      expect([...listed].sort()).toEqual([...new Set(topics)].sort());
    }
  });

  it('covers every topic of the questionnaire that short questions draw on', () => {
    const all = new Set(Object.values(SECTION_TOPIC));
    for (const topic of ['probability', 'sequences', 'induction', 'euclidean-geometry', 'trigonometry', 'differential-calculus', 'integral-calculus', 'word-problems', 'algebra']) {
      expect(all.has(topic), topic).toBe(true);
    }
    const subtopics = new Set(shortProblems.flatMap((problem) => problem.subtopicIds));
    for (const id of ['word-motion', 'word-work-rate', 'word-percentages', 'probability-conditional', 'probability-binomial', 'induction-sums', 'induction-recursive']) {
      expect(subtopics.has(id), id).toBe(true);
    }
  });

  it('has a viewBox-based figure that names its section', () => {
    for (const problem of shortProblems) {
      if (!problem.figureSvg) continue;
      expect(problem.figureSvg).toContain('viewBox="0 0 320 240"');
      expect(problem.figureSvg).not.toMatch(/<svg[^>]*\s(width|height)=/);
      const match = /<title>שרטוט לסעיף ([א-ד])<\/title>/.exec(problem.figureSvg);
      expect(match, `${problem.id}: figure title`).not.toBeNull();
      const target = problem.sections.find((s) => s.label === match?.[1]);
      expect(target?.statement, `${problem.id}: the section named in the figure refers to it`).toContain('ראו שרטוט');
      for (const other of problem.sections) if (other !== target) expect(other.statement).not.toContain('שרטוט');
    }
  });
});

describe('35581-1-201 – probability / geometric series / median / tangent', () => {
  it('a: die chooses the urn, Bayes (counting equally likely tickets)', () => {
    const first = ['R', 'R', 'R', 'B', 'B'];
    const second = ['R', 'R', 'B', 'B', 'B', 'B'];
    let red = 0;
    let redFromFirst = 0;
    for (let die = 1; die <= 6; die += 1) {
      const urn = die <= 2 ? first : second;
      for (const ball of urn) {
        const p = (1 / 6) * (1 / urn.length);
        if (ball === 'R') {
          red += p;
          if (urn === first) redFromFirst += p;
        }
      }
    }
    expect(red).toBeCloseTo(19 / 45, 12);
    expectAnswer('35581-1-201-a', redFromFirst / red);
  });

  it('b: infinite geometric series with total 24 and even places 6 (partial sums)', () => {
    const N = 600;
    const model = (q: number) => {
      let unit = 0;
      for (let n = 0; n < N; n += 1) unit += q ** n;
      const a1 = 24 / unit;
      let even = 0;
      for (let n = 1; n < N; n += 2) even += a1 * q ** n;
      return { a1, even };
    };
    const roots = findRoots((q) => model(q).even - 6, -0.9, 0.9, 900);
    expect(roots.length).toBe(1);
    expect(roots[0]).toBeCloseTo(1 / 3, 9);
    expectAnswer('35581-1-201-b', model(roots[0]).a1, 7);
  });

  it('c: AB = 5, AC = 8, angle A = 60° (coordinates)', () => {
    const A: Point = [0, 0];
    const B: Point = [5, 0];
    const C: Point = [8 * Math.cos(degreesToRadians(60)), 8 * Math.sin(degreesToRadians(60))];
    const D: Point = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
    expect(len(B, C)).toBeCloseTo(7, 12);
    expect(angleAt(A, B, C)).toBeCloseTo(60, 10);
    expectAnswer('35581-1-201-c', len(A, D));
  });

  it('d: tangent to x^3 - 3x^2 + 4 at x = 3 meets the graph again', () => {
    const f: RealFn = (x) => x ** 3 - 3 * x ** 2 + 4;
    const [m, b] = tangent(f, 3);
    expect(m).toBeCloseTo(9, 6);
    expect(b).toBeCloseTo(-23, 5);
    const others = findRoots((x) => f(x) - (9 * x - 23), -20, 2.9).concat(findRoots((x) => f(x) - (9 * x - 23), 3.1, 20));
    expect(others.length).toBe(1);
    expectAnswer('35581-1-201-d', others[0]);
  });
});

describe('35581-1-202 – delayed train / induction / chords / sign-changing area', () => {
  it('a: 240 km, 20 min stop at half way, +18 km/h, arrives on time (simulation)', () => {
    const arrival = (v: number) => {
      const t1 = 120 / v;
      const position: RealFn = (t) => (t <= t1 ? v * t : t <= t1 + 1 / 3 ? 120 : 120 + (v + 18) * (t - t1 - 1 / 3));
      return bisect((t) => position(t) - 240, 0, 1000);
    };
    const roots = findRoots((v) => arrival(v) - 240 / v, 5, 400, 800);
    expect(roots.length).toBe(1);
    expectAnswer('35581-1-202-a', roots[0], 6);
  });

  it('b: the sum formula and the induction step hold (direct summation)', () => {
    let sum = 0;
    for (let n = 1; n <= 60; n += 1) {
      sum += 1 / ((3 * n - 2) * (3 * n + 1));
      expect(sum).toBeCloseTo(n / (3 * n + 1), 12);
      expect(n / (3 * n + 1) + 1 / ((3 * n + 1) * (3 * n + 4))).toBeCloseTo((n + 1) / (3 * n + 4), 12);
    }
    expect(section('35581-1-202-b').numericAnswer).toBeUndefined();
  });

  it('c: diameter AB = 13, chord CD bisected at E with AE = 4 (coordinates)', () => {
    const R = (4 + 9) / 2;
    const A: Point = [-R, 0];
    const B: Point = [R, 0];
    const E: Point = [-R + 4, 0];
    // chord through E in direction theta: E + t(cos, sin) on the circle; E is its midpoint iff t1 + t2 = 0
    const chord = (theta: number) => {
      const u: Point = [Math.cos(theta), Math.sin(theta)];
      const bHalf = E[0] * u[0] + E[1] * u[1];
      const c = E[0] ** 2 + E[1] ** 2 - R * R;
      const s = Math.sqrt(bHalf * bHalf - c);
      return { t1: -bHalf - s, t2: -bHalf + s, u };
    };
    const theta = bisect((x) => chord(x).t1 + chord(x).t2, 0.2, Math.PI - 0.2);
    const { t1, t2, u } = chord(theta);
    const C: Point = [E[0] + t2 * u[0], E[1] + t2 * u[1]];
    const D: Point = [E[0] + t1 * u[0], E[1] + t1 * u[1]];
    expect(Math.hypot(C[0], C[1])).toBeCloseTo(R, 9);
    expect(len(C, E)).toBeCloseTo(len(E, D), 9);
    expect(len(C, D)).toBeCloseTo(12, 8);
    expect(theta).toBeCloseTo(Math.PI / 2, 8);
    expectAnswer('35581-1-202-c', shoelace([A, C, B, D]), 7);
  });

  it('d: area between x^3 - 3x^2 + 2x and the x-axis', () => {
    const f: RealFn = (x) => x ** 3 - 3 * x ** 2 + 2 * x;
    const roots = findRoots(f, -5.03, 5.01);
    expect(roots.length).toBe(3);
    [0, 1, 2].forEach((r, i) => expect(roots[i]).toBeCloseTo(r, 9));
    expect(simpson(f, roots[0], roots[2])).toBeCloseTo(0, 10);
    expectAnswer('35581-1-202-d', absoluteArea(f, roots[0], roots[2]), 7);
  });
});

describe('35581-1-203 – absolute value / binomial / sine theorem / rational extremum', () => {
  it('a: |x^2 - 6x + 4| = 4 and the k with exactly three solutions', () => {
    const g: RealFn = (x) => Math.abs(x * x - 6 * x + 4);
    const four = findRoots((x) => g(x) - 4, -10.03, 16.01);
    expect(four.length).toBe(4);
    [0, 2, 4, 6].forEach((r, i) => expect(four[i]).toBeCloseTo(r, 9));
    // three solutions happen exactly when the horizontal line passes through the local maximum of |g|
    const zeros = findRoots((x) => x * x - 6 * x + 4, -10.03, 16.01);
    expect(zeros.length).toBe(2);
    const k = maximum(g, zeros[0], zeros[1]).value;
    expect(findRoots((x) => g(x) - (k - 1e-3), -10.03, 16.01).length).toBe(4);
    expect(findRoots((x) => g(x) - (k + 1e-3), -10.03, 16.01).length).toBe(2);
    expectAnswer('35581-1-203-a', k, 7);
  });

  it('b: two misses in a row 0.16, at least 4 of 5 (enumeration)', () => {
    const p = bisect((x) => (1 - x) ** 2 - 0.16, 0, 1);
    expect(p).toBeCloseTo(0.6, 10);
    const shot: Array<[boolean, number]> = [[true, p], [false, 1 - p]];
    expectAnswer('35581-1-203-b', enumerateProbability(Array(5).fill(shot), (o) => o.filter(Boolean).length >= 4));
  });

  it('c: BC = 10, angle A = 30°, angle C = 45° (coordinates)', () => {
    const B: Point = [0, 0];
    const C: Point = [10, 0];
    const rad = degreesToRadians;
    const A = intersect(B, [Math.cos(rad(105)), Math.sin(rad(105))], C, [10 + Math.cos(rad(135)), Math.sin(rad(135))]);
    expect(angleAt(A, B, C)).toBeCloseTo(30, 9);
    expect(angleAt(C, A, B)).toBeCloseTo(45, 9);
    // circumcentre: intersection of the perpendicular bisectors of BC and AB
    const mid: Point = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    const centre = intersect([5, 0], [5, 1], mid, [mid[0] + (A[1] - B[1]), mid[1] - (A[0] - B[0])]);
    expect(len(centre, A)).toBeCloseTo(10, 9);
    expect(len(centre, C)).toBeCloseTo(10, 9);
    expectAnswer('35581-1-203-c', shoelace([A, B, C]), 7);
  });

  it('d: (x^2 + a)/(x - 1) with an extremum at x = 3', () => {
    const f = (a: number): RealFn => (x) => (x * x + a) / (x - 1);
    const a = bisect((value) => numericDerivative(f(value), 3), -20, 20);
    expect(a).toBeCloseTo(3, 6);
    const fa = f(a);
    expect(fa(2.9)).toBeGreaterThan(fa(3));
    expect(fa(3.1)).toBeGreaterThan(fa(3));
    const critical = findCriticalPoints(fa, 1.2, 10);
    expect(critical.length).toBe(1);
    expectAnswer('35581-1-203-d', fa(critical[0]), 6);
  });
});

describe('35581-1-204 – recursion / similar triangles / tangent to a root function / percentages', () => {
  it('a: a(n+1) = 2a(n) - 3, a1 = 5 (iteration)', () => {
    const a = [5];
    for (let n = 1; n < 12; n += 1) a.push(2 * a[n - 1] - 3);
    const b = a.map((value) => value - 3);
    for (let n = 1; n < b.length; n += 1) expect(b[n] / b[n - 1]).toBe(2);
    expectAnswer('35581-1-204-a', a.slice(0, 8).reduce((s, v) => s + v, 0));
  });

  it('b: DE ∥ BC, AD = 6, DB = 4, S(ADE) = 27 (coordinates, any shape of the triangle)', () => {
    for (const cx of [-3, 2, 7, 14]) {
      const A: Point = [0, 0];
      const B: Point = [10, 0];
      const D: Point = [6, 0];
      const build = (h: number) => {
        const C: Point = [cx, h];
        const E = intersect(D, [D[0] + (C[0] - B[0]), D[1] + (C[1] - B[1])], A, C);
        return { C, E };
      };
      const h = bisect((value) => shoelace([A, D, build(value).E]) - 27, 0.1, 200);
      const { C, E } = build(h);
      expect(shoelace([A, B, C])).toBeCloseTo(75, 8);
      expectAnswer('35581-1-204-b', shoelace([B, E, C]), 7);
    }
  });

  it('c: tangent of slope 0.8 to sqrt(x^2 + 9)', () => {
    const f: RealFn = (x) => Math.sqrt(x * x + 9);
    const xs = findRoots((x) => numericDerivative(f, x) - 0.8, -60, 60);
    expect(xs.length).toBe(1);
    expect(xs[0]).toBeCloseTo(4, 6);
    const [m, b] = tangent(f, xs[0]);
    expectAnswer('35581-1-204-c', shoelace([[0, 0], [-b / m, 0], [0, b]]), 5);
  });

  it('d: 5000 → 6600 with growth p% then (p + 10)%', () => {
    const after = (p: number) => 5000 * (1 + p / 100) * (1 + (p + 10) / 100);
    const roots = findRoots((p) => after(p) - 6600, 0.003, 100);
    expect(roots.length).toBe(1);
    expectAnswer('35581-1-204-d', roots[0]);
  });
});

describe('35581-1-205 – conditional probability / induction on a recursion / trig area / angle bisector', () => {
  it('a: P(A) = 0.4, P(B|A) = 0.75, P(A|B) = 0.6 (search over a population of 100)', () => {
    const tables: number[] = [];
    for (let both = 0; both <= 100; both += 1) {
      for (let onlyA = 0; both + onlyA <= 100; onlyA += 1) {
        for (let onlyB = 0; both + onlyA + onlyB <= 100; onlyB += 1) {
          const a = both + onlyA;
          const b = both + onlyB;
          if (a === 40 && both * 100 === 75 * a && both * 100 === 60 * b) tables.push(100 - both - onlyA - onlyB);
        }
      }
    }
    expect(tables.length).toBe(1);
    expectAnswer('35581-1-205-a', tables[0] / 100);
  });

  it('b: a(n+1) = a(n)/(1 + 3a(n)), a1 = 2 (iteration)', () => {
    let a = 2;
    let place = 0;
    for (let n = 1; n <= 60; n += 1) {
      expect(a).toBeCloseTo(2 / (6 * n - 5), 13);
      if (Math.abs(a - 2 / 55) < 1e-12) place = n;
      a = a / (1 + 3 * a);
    }
    expectAnswer('35581-1-205-b', place);
  });

  it('c: area between sin 2x and sin x', () => {
    const d: RealFn = (x) => Math.sin(2 * x) - Math.sin(x);
    const roots = findRoots(d, 0, Math.PI / 2);
    expect(roots.length).toBe(2);
    expect(roots[0]).toBe(0);
    expect(roots[1]).toBeCloseTo(Math.PI / 3, 9);
    expect(d((roots[0] + roots[1]) / 2)).toBeGreaterThan(0);
    expectAnswer('35581-1-205-c', absoluteArea(d, roots[0], roots[1]), 8);
  });

  it('d: right triangle 6-8-10 with the bisector of angle A (coordinates)', () => {
    const C: Point = [0, 0];
    const A: Point = [0, 6];
    const B: Point = [8, 0];
    const d = bisect((x) => angleAt(A, C, [x, 0]) - angleAt(A, [x, 0], B), 0.01, 7.99);
    expect(d).toBeCloseTo(3, 8);
    expectAnswer('35581-1-205-d', len(A, [d, 0]), 7);
  });
});

describe('35581-1-206 – work rate / geometric sequence / quadrilateral / trig extremum', () => {
  it('a: two pipes, 4 h together and 5 h more for the second (simulation)', () => {
    const finish = (x: number) => {
      const fill: RealFn = (t) => Math.min(t, 4) / x + t / (x + 5);
      return bisect((t) => fill(t) - 1, 4, 1000);
    };
    // for x < 6.5 the pool is already full before the first pipe is closed, so it cannot fit the story
    const roots = findRoots((x) => finish(x) - 9, 7, 80, 730);
    expect(roots.length).toBe(1);
    expect(4 / roots[0] + 4 / (roots[0] + 5)).toBeLessThan(1);
    expectAnswer('35581-1-206-a', roots[0], 6);
  });

  it('b: a1 + a2 = 20, a3 + a4 = 45, positive terms (terms built one by one)', () => {
    const terms = (a1: number, q: number) => Array.from({ length: 6 }, (_, n) => a1 * q ** n);
    const q = bisect((x) => {
      const t = terms(1, x);
      return (t[2] + t[3]) / (t[0] + t[1]) - 45 / 20;
    }, 0.01, 10);
    const a1 = bisect((x) => terms(x, q)[0] + terms(x, q)[1] - 20, 0, 100);
    expect(q).toBeCloseTo(1.5, 9);
    expect(a1).toBeCloseTo(8, 9);
    expectAnswer('35581-1-206-b', terms(a1, q).reduce((s, v) => s + v, 0), 7);
  });

  it('c: AB = 6, AD = 10, angle A = 120°, BC = CD, angle C = 60° (coordinates)', () => {
    const A: Point = [0, 0];
    const B: Point = [6, 0];
    const D: Point = [10 * Math.cos(degreesToRadians(120)), 10 * Math.sin(degreesToRadians(120))];
    expect(len(B, D)).toBeCloseTo(14, 10);
    const M: Point = [(B[0] + D[0]) / 2, (B[1] + D[1]) / 2];
    let normal: Point = [-(D[1] - B[1]) / len(B, D), (D[0] - B[0]) / len(B, D)];
    // C lies on the perpendicular bisector of BD (BC = CD), on the side opposite to A (convex quadrilateral)
    if ((A[0] - M[0]) * normal[0] + (A[1] - M[1]) * normal[1] > 0) normal = [-normal[0], -normal[1]];
    const at = (h: number): Point => [M[0] + h * normal[0], M[1] + h * normal[1]];
    const h = bisect((x) => angleAt(at(x), B, D) - 60, 1, 200);
    const C = at(h);
    expect(len(B, C)).toBeCloseTo(len(C, D), 9);
    expect(angleAt(A, B, D)).toBeCloseTo(120, 9);
    expectAnswer('35581-1-206-c', shoelace([A, B, C, D]), 7);
  });

  it('d: maximum of 2 sin x + sin 2x on [0, π]', () => {
    const f: RealFn = (x) => 2 * Math.sin(x) + Math.sin(2 * x);
    const top = maximum(f, 0, Math.PI, 5000);
    expect(top.x).toBeCloseTo(Math.PI / 3, 6);
    expect(findCriticalPoints(f, 0.01, Math.PI - 0.01).length).toBe(1);
    expectAnswer('35581-1-206-d', top.value, 8);
  });
});

describe('35581-1-207 – linear system with a parameter / two-level binomial / tangent and secant / rational integral', () => {
  it('a: mx + 4y = m + 2, x + my = 2', () => {
    const det = (m: number) => m * m - 4;
    const singular = findRoots(det, -10.03, 10.01);
    expect(singular.length).toBe(2);
    // unique solution elsewhere: Cramer's rule satisfies both equations and matches the solution text
    for (const m of [-7, -1, 0, 0.5, 1, 3, 12]) {
      const x = ((m + 2) * m - 8) / det(m);
      const y = (2 * m - (m + 2)) / det(m);
      expect(m * x + 4 * y).toBeCloseTo(m + 2, 10);
      expect(x + m * y).toBeCloseTo(2, 10);
      expect(y).toBeCloseTo(1 / (2 + m), 10);
      expect(x).toBeCloseTo((m + 4) / (m + 2), 10);
    }
    // parallel lines: either identical (two points of the second line lie on the first) or disjoint
    const onFirst = (m: number, [x, y]: Point) => Math.abs(m * x + 4 * y - (m + 2)) < 1e-6;
    const classify = (m: number) => {
      const p: Point = [2, 0];
      const q: Point = [2 - m, 1];
      return onFirst(m, p) && onFirst(m, q) ? 'infinite' : !onFirst(m, p) && !onFirst(m, q) ? 'none' : 'unexpected';
    };
    expect(singular.map(classify).sort()).toEqual(['infinite', 'none']);
    expectAnswer('35581-1-207-a', singular.filter((m) => classify(m) === 'none')[0]);
  });

  it('b: bulbs in pairs, exactly 3 good packs of 4 (enumeration of 8 bulbs)', () => {
    const bulb: Array<[boolean, number]> = [[true, 0.8], [false, 0.2]];
    expect(enumerateProbability(Array(2).fill(bulb), (o) => o.every(Boolean))).toBeCloseTo(0.64, 12);
    const exactlyThree = enumerateProbability(Array(8).fill(bulb), (o) => {
      let good = 0;
      for (let i = 0; i < 8; i += 2) if (o[i] && o[i + 1]) good += 1;
      return good === 3;
    });
    expectAnswer('35581-1-207-b', exactlyThree);
  });

  it('c: tangent PT and a secant through the centre, PA = 4, R = 2.5 (coordinates)', () => {
    const R = 2.5;
    const O: Point = [0, 0];
    const P: Point = [-(4 + R), 0];
    const A: Point = [-R, 0];
    const B: Point = [R, 0];
    const onCircle = (theta: number): Point => [R * Math.cos(theta), R * Math.sin(theta)];
    // tangency: PT ⟂ OT
    const theta = bisect((x) => {
      const T = onCircle(x);
      return (T[0] - P[0]) * (T[0] - O[0]) + (T[1] - P[1]) * (T[1] - O[1]);
    }, 0.1, Math.PI - 0.1);
    const T = onCircle(theta);
    expect(len(P, T)).toBeCloseTo(6, 9);
    expect(angleAt(T, A, B)).toBeCloseTo(90, 8);
    expect(len(T, A) / len(T, B)).toBeCloseTo(2 / 3, 9);
    expectAnswer('35581-1-207-c', len(T, A));
  });

  it('d: area under 4x/(x^2 + 1)^2 from 0 to a equals 1.6', () => {
    const f: RealFn = (x) => (4 * x) / (x * x + 1) ** 2;
    expect(findRoots(f, -3.03, 9.01).length).toBe(1);
    const a = bisect((x) => simpson(f, 0, x, 4000) - 1.6, 0.1, 50);
    expectAnswer('35581-1-207-d', a, 6);
  });
});

describe('35581-1-208 – graphical extremum / product sequence / double angle / independent sensors', () => {
  it('a: largest triangle AOB under y = 12 - x^2', () => {
    const f: RealFn = (x) => 12 - x * x;
    const area: RealFn = (t) => shoelace([[0, 0], [t, f(t)], [-t, f(-t)]]);
    const top = maximum(area, 0, Math.sqrt(12));
    expect(top.x).toBeCloseTo(2, 6);
    expectAnswer('35581-1-208-a', top.value, 8);
  });

  it('b: a1 = 6, total 12; b(n) = a(n)·a(n+1) (partial sums)', () => {
    const N = 400;
    const a = (q: number) => Array.from({ length: N + 1 }, (_, n) => 6 * q ** n);
    const q = bisect((x) => a(x).slice(0, N).reduce((s, v) => s + v, 0) - 12, -0.9, 0.9);
    expect(q).toBeCloseTo(0.5, 10);
    const terms = a(q);
    const b = terms.slice(0, N).map((value, n) => value * terms[n + 1]);
    for (let n = 1; n < 20; n += 1) expect(b[n] / b[n - 1]).toBeCloseTo(0.25, 10);
    expectAnswer('35581-1-208-b', b.reduce((s, v) => s + v, 0), 8);
  });

  it('c: AB = 6, AC = 9, angle B = 2·angle C (coordinates)', () => {
    // B at the origin, C on the x-axis; for a trial gamma build the triangle with BC = 1 and rescale to AB = 6
    const build = (gamma: number) => {
      const B: Point = [0, 0];
      const C: Point = [1, 0];
      const A = intersect(B, [Math.cos(2 * gamma), Math.sin(2 * gamma)], C, [1 + Math.cos(Math.PI - gamma), Math.sin(Math.PI - gamma)]);
      const scale = 6 / len(A, B);
      return { ac: len(A, C) * scale, bc: scale, A, B, C };
    };
    const gammas = findRoots((x) => build(x).ac - 9, 0.05, Math.PI / 3 - 0.05);
    expect(gammas.length).toBe(1);
    const t = build(gammas[0]);
    expect(Math.cos(gammas[0])).toBeCloseTo(0.75, 9);
    expect(angleAt(t.B, t.A, t.C)).toBeCloseTo(2 * angleAt(t.C, t.A, t.B), 8);
    expectAnswer('35581-1-208-c', t.bc);
  });

  it('d: independent sensors, at least one 0.94, exactly one detected', () => {
    const atLeastOne = (p: number) =>
      enumerateProbability<boolean>([[[true, 0.7], [false, 0.3]], [[true, p], [false, 1 - p]]], (o) => o.some(Boolean));
    const p = bisect((x) => atLeastOne(x) - 0.94, 0, 1);
    expect(p).toBeCloseTo(0.8, 10);
    const spaces: Array<Array<[boolean, number]>> = [[[true, 0.7], [false, 0.3]], [[true, p], [false, 1 - p]]];
    const exactlyOne = enumerateProbability(spaces, (o) => o.filter(Boolean).length === 1);
    const onlyFirst = enumerateProbability(spaces, (o) => o[0] && !o[1]);
    expectAnswer('35581-1-208-d', onlyFirst / exactlyOne);
  });
});

describe('35581 short questions – coverage', () => {
  it('every numericAnswer was recomputed above', () => {
    const withNumeric = shortProblems.flatMap((problem) => problem.sections.filter((s) => s.numericAnswer !== undefined).map((s) => s.id));
    expect([...checked].sort()).toEqual(withNumeric.sort());
    expect(withNumeric.length).toBe(31);
  });
});
