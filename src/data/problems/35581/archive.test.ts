/**
 * Verification of the bagrut-archive problems (Wikibooks, questionnaire 035806).
 * Every numericAnswer is recomputed independently from first principles: simulation of the motion,
 * counting / enumeration of the probability space, coordinate models of the figures, numeric root
 * finding / differentiation / integration — never by re-evaluating the closed form of the solution.
 * Sections whose answers are expressions, intervals or proofs get sanity checks of the same kind,
 * and every coordinate model is checked against the givens (and against the drawn figure).
 */
import { afterAll, describe, expect, it } from 'vitest';
import { questionnaire35581 } from '../../syllabus/35581';
import { archiveProblems } from './archive';
import {
  absoluteArea,
  bisect,
  findInflectionPoints,
  simpson,
  degreesToRadians,
  distance,
  enumerateProbability,
  findCriticalPoints,
  findRoots,
  numericDerivative,
  radiansToDegrees,
  solveQuadratic,
} from '../verify';

type Point = [number, number];

function section(sectionId: string) {
  for (const problem of archiveProblems) {
    const found = problem.sections.find((item) => item.id === sectionId);
    if (found) return found;
  }
  throw new Error(`Unknown section ${sectionId}`);
}

function problem(problemId: string) {
  const found = archiveProblems.find((item) => item.id === problemId);
  if (!found) throw new Error(`Unknown problem ${problemId}`);
  return found;
}

const checkedAnswers = new Set<string>();

function expectAnswer(sectionId: string, computed: number, digits = 9) {
  const value = section(sectionId).numericAnswer;
  if (value === undefined) throw new Error(`${sectionId} has no numericAnswer`);
  expect(value).toBeCloseTo(computed, digits);
  checkedAnswers.add(sectionId);
}

afterAll(() => {
  const numericSections = archiveProblems.flatMap((item) => item.sections).filter((item) => item.numericAnswer !== undefined);
  for (const item of numericSections) expect(checkedAnswers.has(item.id), `${item.id} was never verified`).toBe(true);
});

// ───────── geometry helpers ─────────
const len = (p: Point, q: Point) => distance(p[0], p[1], q[0], q[1]);
const mid = (p: Point, q: Point): Point => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const cross = (u: Point, v: Point) => u[0] * v[1] - u[1] * v[0];
const vec = (p: Point, q: Point): Point => [q[0] - p[0], q[1] - p[1]];

/** Angle PVQ in degrees. */
function angleAt(v: Point, p: Point, q: Point): number {
  const u = vec(v, p);
  const w = vec(v, q);
  return radiansToDegrees(Math.acos((u[0] * w[0] + u[1] * w[1]) / (Math.hypot(...u) * Math.hypot(...w))));
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

/** The `points` of the first <polygon> in a figure, as SVG coordinates. */
function figurePolygon(problemId: string): Point[] {
  const match = /<polygon points="([^"]+)"/.exec(problem(problemId).figureSvg ?? '');
  if (!match) throw new Error(`${problemId}: no polygon in the figure`);
  return match[1].split(' ').map((pair) => pair.split(',').map(Number) as Point);
}

function expectFigureMatches(problemId: string, model: Point[], toSvg: (p: Point) => Point) {
  const drawn = figurePolygon(problemId);
  expect(drawn.length).toBe(model.length);
  drawn.forEach((point, index) => {
    const expected = toSvg(model[index]);
    expect(Math.abs(point[0] - expected[0])).toBeLessThan(0.02);
    expect(Math.abs(point[1] - expected[1])).toBeLessThan(0.02);
  });
}

// ───────── probability helpers ─────────
/** One draw with success probability p, as an enumeration space. */
const trial = (p: number): Array<[boolean, number]> => [[true, p], [false, 1 - p]];
const trials = (n: number, p: number): Array<Array<[boolean, number]>> => Array.from({ length: n }, () => trial(p));
const count = (outcome: boolean[]) => outcome.filter(Boolean).length;
const exactly = (n: number, k: number, p: number) => enumerateProbability(trials(n, p), (o) => count(o) === k);

/** The Wikibooks pages (paths under "פתרונות מבחני בגרות/") imported into the archive. */
const BOOK_PATH = 'מתמטיקה תיכונית/מתמטיקה לבגרות/פתרונות מבחני בגרות/';
const importedPages: Record<string, string> = {
  '35581-1-101': 'אינטרני/קיץ א, תשס"ט (ניסוי)/035806/תרגיל 3',
  '35581-1-102': 'אינטרני/קיץ, תשע"ז/035806/תרגיל 1',
  '35581-1-103': 'אינטרני/קיץ מועד א, תשע"ו/035806/תרגיל 1',
  '35581-2-101': 'אינטרני/קיץ, תשע"ז/035806/תרגיל 2',
  '35581-3-101': 'אינטרני/חורף, תשע"ד/035806/תרגיל 3',
  '35581-3-102': 'אינטרני/חורף, תשע"ה/035806/תרגיל 3',
  '35581-3-103': 'אינטרני/קיץ, תשע"ז/035806/תרגיל 3',
  '35581-3-104': 'אינטרני/קיץ ב, תשע"ד/035806/תרגיל 3',
  '35581-3-105': 'אינטרני/קיץ ב, תשע"ה/035806/תרגיל 3',
  '35581-3-106': 'אינטרני (או אקסטרני)/קיץ ג, תשע"ד/035806/תרגיל 3',
  '35581-4-101': 'אינטרני/חורף, תש"ע (ניסוי)/035806/תרגיל 4',
  '35581-4-102': 'אינטרני/קיץ, תשע"ז/035806/תרגיל 4',
  '35581-5-101': 'אינטרני/קיץ, תשע"ז/035806/תרגיל 5',
  '35581-6-101': 'אינטרני/חורף, תש"ע (ניסוי)/035806/תרגיל 7',
  '35581-6-102': 'אינטרני/חורף, תשע"ז/035806/תרגיל 6',
  '35581-6-103': 'אינטרני/חורף, תשע"ז/035806/תרגיל 7',
  '35581-6-104': 'אינטרני/קיץ, תשע"ז/035806/תרגיל 6',
  '35581-6-105': 'אינטרני/קיץ מועד א, תשע"ו/035806/תרגיל 7',
  '35581-6-106': 'אינטרני/קיץ מועד א, תשע"ו/035806/תרגיל 8',
  // the listed page "קיץ א, תשע"א (ניסוי)/035806/תרגיל 8" is a redirect to this page
  '35581-7-101': 'אינטרני/קיץ א, תשע"א/035006/תרגיל 4',
};

const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
const labels = ['א', 'ב', 'ג', 'ד', 'ה', 'ו'];

describe('archive (Wikibooks 035806) – structure', () => {
  it('has ids numbered per slot from 101, in order', () => {
    const perSlot = new Map<number, number>();
    for (const item of archiveProblems) {
      const next = (perSlot.get(item.slot) ?? 100) + 1;
      perSlot.set(item.slot, next);
      expect(item.id).toBe(`35581-${item.slot}-${next}`);
      expect(item.questionnaire).toBe('35581');
    }
  });

  it('imports exactly the expected pages', () => {
    expect(archiveProblems.map((item) => item.id).sort()).toEqual(Object.keys(importedPages).sort());
  });

  it.each(archiveProblems.map((item) => [item.id, item] as const))('%s: attribution, shape and scope', (id, item) => {
    expect(item.source).toBe('open-source');
    expect(item.verified).toBe(false);
    expect([2, 3]).toContain(item.difficulty);
    expect(item.estimatedMinutes).toBeGreaterThanOrEqual(20);
    expect(item.estimatedMinutes).toBeLessThanOrEqual(35);
    expect(item.title.startsWith('בגרות ')).toBe(true);

    const attribution = item.attribution;
    expect(attribution).toBeDefined();
    if (!attribution) return;
    expect(attribution.kind).toBe('wikibooks');
    expect(attribution.work).toBe('ויקיספר: מתמטיקה תיכונית — פתרונות מבחני בגרות');
    expect(attribution.section).toContain('שאלון 035806, שאלה ');
    expect(attribution.license).toBe('CC BY-SA 4.0');
    expect(attribution.licenseUrl).toBe('https://creativecommons.org/licenses/by-sa/4.0/');
    expect(attribution.adapted).toBe(true);
    expect(attribution.url.startsWith('https://he.wikibooks.org/wiki/')).toBe(true);
    const title = attribution.url
      .slice('https://he.wikibooks.org/wiki/'.length)
      .split('/')
      .map((segment) => decodeURIComponent(segment))
      .join('/')
      .replace(/_/g, ' ');
    expect(title).toBe(`${BOOK_PATH}${importedPages[id]}`);
    expect(attribution.section.startsWith(importedPages[id].split('/')[1])).toBe(true);

    expect(item.sections.length).toBeGreaterThanOrEqual(2);
    expect(item.sections.length).toBeLessThanOrEqual(6);
    item.sections.forEach((part, index) => {
      expect(part.id).toBe(`${id}-${letters[index]}`);
      expect(part.label).toBe(labels[index]);
      expect(part.hints.length).toBeGreaterThanOrEqual(2);
      expect(part.hints.length).toBeLessThanOrEqual(3);
      expect(part.solutionSteps.length).toBeGreaterThanOrEqual(3);
      expect(part.solutionSteps.length).toBeLessThanOrEqual(8);
    });

    const slot = questionnaire35581.slots.find((candidate) => candidate.number === item.slot);
    expect(slot?.topicIds).toContain(item.topicId);
    const status = new Map(questionnaire35581.topics.flatMap((topic) => topic.subtopics).map((subtopic) => [subtopic.id, subtopic.status]));
    for (const subtopicId of item.subtopicIds) expect(status.get(subtopicId), `${id}: ${subtopicId}`).toBe('in');

    if (item.slot === 4 || item.slot === 5) {
      expect(item.figureSvg, `${id} needs a figure`).toContain('viewBox="0 0 320 240"');
    }
    if (item.figureSvg) {
      expect(item.figureSvg).toContain('viewBox="0 0 320 240"');
      expect(item.figureSvg).not.toMatch(/<svg[^>]*\s(width|height)=/);
    }
  });
});

describe('archive slot 1 – motion problems (simulation)', () => {
  it('35581-1-101 (two speeds for every 0<m<5; |x1-x2|<11 exactly when 4<m<5)', () => {
    for (let i = 1; i < 100; i += 1) {
      const m = i / 20;
      // second rider's speed x: rider 1 arrives after 45/(x+m) h, rider 2 has then ridden one hour less and is 25 km from B.
      const story = (x: number) => x * (45 / (x + m) - 1) - 20;
      const roots = findRoots(story, 0.01, 45 - m - 0.01, 20000);
      expect(roots.length).toBe(2);
      for (const x of roots) {
        const firstArrival = 45 / (x + m);
        expect(firstArrival).toBeGreaterThan(1);
        expect(45 - x * (firstArrival - 1)).toBeCloseTo(25, 6);
      }
      const delta = m * m - 130 * m + 625;
      expect(roots[0]).toBeCloseTo((25 - m - Math.sqrt(delta)) / 2, 6);
      expect(roots[1]).toBeCloseTo((25 - m + Math.sqrt(delta)) / 2, 6);
      if (i !== 80) expect(Math.abs(roots[1] - roots[0]) < 11).toBe(m > 4);
    }
  });

  /** Noga: four equal quarters at speeds 5, 10, 20, 40 km/h; her km-position t hours after 8:00. */
  function nogaPosition(length: number, t: number): number {
    let position = 0;
    let time = 0;
    for (const speed of [5, 10, 20, 40]) {
      const duration = length / 4 / speed;
      if (t <= time + duration) return position + speed * (t - time);
      position += length / 4;
      time += duration;
    }
    return length;
  }

  it('35581-1-102-a', () => {
    const totalTime = (length: number) => [5, 10, 20, 40].reduce((sum, speed) => sum + length / 4 / speed, 0);
    expectAnswer('35581-1-102-a', bisect((length) => totalTime(length) - 3.75, 1, 200));
  });

  it('35581-1-102-b (first meeting simulated)', () => {
    const length = 40;
    const danielSpeed = length / 2; // 9:45 → 11:45
    let meeting = Number.NaN;
    for (let t = 1.75; t <= 3.75; t += 1e-5) {
      if (danielSpeed * (t - 1.75) >= nogaPosition(length, t) - 1e-9) {
        meeting = t;
        break;
      }
    }
    expect(8 + meeting).toBeCloseTo(10.5, 4);
    const place = nogaPosition(length, meeting);
    expect(place).toBeCloseTo(15, 3);
    expect(Math.floor(place / (length / 4)) + 1).toBe(2);
    expect(section('35581-1-102-b').finalAnswer).toContain('10:30');
  });

  /** Distance first − second, t hours after departure, for second-car speed x. */
  function carGap(x: number, t: number): number {
    const first = t <= 1.5 ? (x + 25) * t : 1.5 * (x + 25) + ((x + 25) / 2) * (t - 1.5);
    return first - x * t;
  }

  function arrivalDifference(x: number): number {
    const firstTime = 1.5 + (300 - 1.5 * (x + 25)) / ((x + 25) / 2);
    return firstTime - 300 / x;
  }

  it('35581-1-103-a', () => {
    const roots = findRoots((x) => arrivalDifference(x) - 0.5, 20, 170, 15000);
    expect(roots.length).toBe(2);
    expect(roots[0]).toBeCloseTo(50, 6);
    expectAnswer('35581-1-103-a', roots.filter((x) => x > 60)[0], 6);
  });

  it('35581-1-103-b (distance of 12.5 km before the overtaking)', () => {
    const x = 75;
    const overtaking = findRoots((t) => carGap(x, t), 0.1, 4, 4000)[0];
    expect(overtaking).toBeCloseTo(3, 6);
    const times = findRoots((t) => carGap(x, t) - 12.5, 0.01, overtaking, 4000);
    expect(times.length).toBe(2);
    expect(times[0]).toBeCloseTo(0.5, 6);
    expect(times[1]).toBeCloseTo(2.5, 6);
  });
});

describe('archive slot 2 – geometric sequences', () => {
  const a = (n: number) => ((2 ** n + 1) * (2 ** n - 1)) / 2 ** n;
  const b = (n: number) => 2 * 2 ** (n - 1);
  const c = (n: number) => 0.5 * 0.5 ** (n - 1);

  it('35581-2-101-a/b (the stated sequences satisfy every given)', () => {
    expect(b(6)).toBe(64);
    expect(c(3)).toBeCloseTo(1 / 8, 14);
    for (let n = 1; n <= 30; n += 1) {
      expect(b(n) - c(n)).toBeCloseTo(a(n), 9);
      expect(b(n)).toBeGreaterThan(0);
      expect(c(n)).toBeGreaterThan(0);
    }
    // c is forced: c6 = b6 − a6 and c3 are given, so its ratio is the cube root of their quotient.
    expect(Math.cbrt((b(6) - a(6)) / c(3))).toBeCloseTo(0.5, 12);
  });

  it('35581-2-101-d (0.9 < B_n − A_n < 1 exactly for n ≥ 4, by direct summation)', () => {
    let sumA = 0;
    let sumB = 0;
    for (let n = 1; n <= 20; n += 1) {
      sumA += a(n);
      sumB += b(n);
      const difference = sumB - sumA;
      expect(difference > 0.9 && difference < 1).toBe(n >= 4);
    }
  });
});

describe('archive slot 3 – probability (counting and enumeration)', () => {
  // 35581-3-101: unknown t = P(theatre); folk dance = 2t; independence + P(R|T) = 0.6 ⇒ 2t·t = 0.6·t.
  const theatreShare = bisect((p) => 2 * p * p - 0.6 * p, 0.05, 1);
  const town = { theatre: 10000 * theatreShare, folk: 2 * 10000 * theatreShare, both: 0.6 * 10000 * theatreShare };

  it('35581-3-101-a', () => {
    expect(town.both / 10000).toBeCloseTo((town.folk / 10000) * (town.theatre / 10000), 12); // independent
    expectAnswer('35581-3-101-a', (100 * town.both) / 10000);
  });

  it('35581-3-101-b', () => {
    const p = town.both / town.folk;
    expectAnswer('35581-3-101-b', enumerateProbability(trials(6, p), (o) => count(o) >= 2), 12);
  });

  const man = 1 - 1 / 3;
  it('35581-3-102-a', () => {
    expectAnswer('35581-3-102-a', enumerateProbability(trials(8, man), (o) => count(o.slice(0, 4)) === 2 && count(o.slice(4)) === 2), 12);
  });

  it('35581-3-102-b', () => {
    const exactlyTwo = enumerateProbability(trials(4, man), (o) => count(o) === 2);
    const atMostTwo = enumerateProbability(trials(4, man), (o) => count(o) <= 2);
    expectAnswer('35581-3-102-b', exactlyTwo / atMostTwo, 12);
  });

  const scooterRoots = findRoots((p) => exactly(9, 4, p) - 24 * exactly(9, 6, p), 0.01, 0.99, 400);
  it('35581-3-103-a', () => {
    expect(scooterRoots.length).toBe(1);
    expectAnswer('35581-3-103-a', scooterRoots[0], 9);
  });

  it('35581-3-103-b', () => {
    const six = trials(6, scooterRoots[0]);
    expectAnswer('35581-3-103-b', enumerateProbability(six, (o) => count(o) === 4) / enumerateProbability(six, (o) => count(o) >= 3), 8);
  });

  it('35581-3-103-c', () => {
    // drawing one by one: the third resident with a scooter is the sixth one drawn
    const thirdAtSix = enumerateProbability(trials(6, scooterRoots[0]), (o) => {
      let seen = 0;
      for (let i = 0; i < o.length; i += 1) {
        if (o[i]) seen += 1;
        if (seen === 3) return i === 5;
      }
      return false;
    });
    expectAnswer('35581-3-103-c', thirdAtSix, 8);
  });

  // 35581-3-104: 1000 students, 400 girls, 10% of them (40) on route B; boys on route A fixed by "75% of route A are girls".
  const girlsA = 400 * 0.9;
  const boysA = bisect((value) => girlsA / (girlsA + value) - 0.75, 0, 600);
  const routeA = (girlsA + boysA) / 1000;

  it('35581-3-104-a', () => {
    expect(girlsA / (girlsA + boysA)).toBeCloseTo(0.75, 10);
    expectAnswer('35581-3-104-a', routeA, 9);
  });

  it('35581-3-104-b (dependent events)', () => {
    expect(Math.abs(girlsA / 1000 - 0.4 * routeA)).toBeGreaterThan(0.1);
  });

  it('35581-3-104-c', () => {
    const chosen = [1, 2, 3, 4, 5, 6].filter((n) => Math.abs(1 - enumerateProbability(trials(n, 40 / 400), (o) => o.every(Boolean)) - 0.99) < 1e-12);
    expect(chosen).toEqual([2]);
    expectAnswer('35581-3-104-c', chosen[0], 12);
  });

  const homeRoots = findRoots((p) => exactly(4, 2, p) - 6 * exactly(4, 1, p), 0.01, 0.99, 400);
  // a university of 10 000 students
  const students = { home: 10000 * homeRoots[0], notHome: 10000 - 10000 * homeRoots[0] };
  const cafeteria = students.notHome - 0.6 * students.notHome;

  it('35581-3-105-a', () => {
    expect(homeRoots.length).toBe(1);
    expectAnswer('35581-3-105-a', 100 * homeRoots[0], 8);
  });

  it('35581-3-105-b', () => {
    expectAnswer('35581-3-105-b', enumerateProbability(trials(8, homeRoots[0]), (o) => count(o) >= 1 && count(o) <= 7), 8);
  });

  it('35581-3-105-c', () => expectAnswer('35581-3-105-c', (100 * cafeteria) / 10000, 8));
  it('35581-3-105-d', () => expectAnswer('35581-3-105-d', students.home / (students.home + cafeteria), 8));

  const higherShare = bisect((value) => enumerateProbability(trials(4, value), (o) => count(o) <= 3) - 255 / 256, 0.01, 0.99);
  it('35581-3-106-a', () => expectAnswer('35581-3-106-a', 100 * higherShare, 8));
  it('35581-3-106-b', () => {
    expectAnswer('35581-3-106-b', enumerateProbability(trials(4, higherShare), (o) => o.filter((x) => !x).length === 3), 8);
  });

  it('35581-3-106-c', () => {
    // 10 000 employees: 4000 women, a quarter of them with higher education; 10 000·p employees with higher education
    const womanAmongHigher = 4000 / 4 / (10000 * higherShare);
    expectAnswer('35581-3-106-c', enumerateProbability(trials(2, womanAmongHigher), (o) => o.every(Boolean)), 8);
  });
});

describe('archive slot 4 – plane geometry (coordinate models)', () => {
  /** 35581-4-101: unit circle, diameter DC on the x-axis, ∠BOC = α, A = second intersection of the parallel to OB through D. */
  function cyclicModel(alphaDeg: number) {
    const angle = degreesToRadians(alphaDeg);
    const O: Point = [0, 0];
    const D: Point = [-1, 0];
    const C: Point = [1, 0];
    const B: Point = [Math.cos(angle), Math.sin(angle)];
    const roots = solveQuadratic(1, 2 * (D[0] * B[0] + D[1] * B[1]), D[0] ** 2 + D[1] ** 2 - 1);
    const t = roots.reduce((best, value) => (Math.abs(value) > Math.abs(best) ? value : best), 0);
    const A: Point = [D[0] + t * B[0], D[1] + t * B[1]];
    const E = intersect(D, A, C, B);
    return { O, A, B, C, D, E };
  }

  it('35581-4-101 model satisfies the givens and matches the figure', () => {
    for (const alpha of [30, 50, 60, 75]) {
      const { O, A, B, C, D, E } = cyclicModel(alpha);
      expect(len(O, A)).toBeCloseTo(1, 12);
      expect(cross(vec(O, B), vec(D, E))).toBeCloseTo(0, 12); // OB ∥ DE
      expect(cross(vec(C, B), vec(C, E))).toBeCloseTo(0, 12); // E on line CB
      expect(Math.atan2(A[1], A[0])).toBeGreaterThan(Math.atan2(B[1], B[0])); // order D, A, B, C on the circle
      expect(angleAt(O, B, C)).toBeCloseTo(alpha, 10);
    }
    const { A, B, C, D } = cyclicModel(60);
    expectFigureMatches('35581-4-101', [A, B, C, D], ([x, y]) => [160 + 72 * x, 148 - 72 * y]);
  });

  it('35581-4-101-a (∠ABO = 90° − α/2 in the model)', () => {
    for (const alpha of [30, 50, 60, 75]) {
      const { O, A, B } = cyclicModel(alpha);
      expect(angleAt(B, A, O)).toBeCloseTo(90 - alpha / 2, 9);
    }
  });

  it('35581-4-101-b/c (equal areas force α; then the triangles are congruent)', () => {
    const areaDifference = (alpha: number) => {
      const { O, A, B, C, E } = cyclicModel(alpha);
      return shoelace([O, B, C]) - shoelace([B, E, A]);
    };
    const roots = findRoots(areaDifference, 5, 85, 800);
    expect(roots.length).toBe(1);
    expectAnswer('35581-4-101-c', roots[0], 8);
    const { O, A, B, C, E } = cyclicModel(roots[0]);
    expect(len(O, B)).toBeCloseTo(len(B, E), 8);
    expect(len(B, C)).toBeCloseTo(len(E, A), 8);
    expect(len(O, C)).toBeCloseTo(len(B, A), 8);
  });

  /** 35581-4-102: D(0,0), C(c,0), A(0,h), B(b,h); h is fixed by "the circle on diameter BC touches AD". */
  function trapezoidModel(b: number, c: number) {
    const h = bisect((value) => (b + c) / 2 - distance(b, value, c, 0) / 2, 0.01, 100);
    const D: Point = [0, 0];
    const C: Point = [c, 0];
    const A: Point = [0, h];
    const B: Point = [b, h];
    const O = mid(B, C);
    const R = len(B, C) / 2;
    const E: Point = [0, O[1]]; // foot of the perpendicular from O to AD (the y-axis)
    const xs = solveQuadratic(1, -2 * O[0], O[0] ** 2 + O[1] ** 2 - R ** 2); // circle ∩ line DC (y = 0)
    const F: Point = [xs.find((x) => Math.abs(x - c) > 1e-6) ?? Number.NaN, 0];
    return { A, B, C, D, E, F, O, R };
  }

  it('35581-4-102 model satisfies the givens and matches the figure', () => {
    for (const [b, c] of [[2, 8], [1, 9], [3, 5]]) {
      const { A, B, C, D, E, F, O, R } = trapezoidModel(b, c);
      expect(Math.abs(O[0])).toBeCloseTo(R, 9); // distance from O to AD equals the radius: AD is tangent
      expect(len(O, E)).toBeCloseTo(R, 9);
      expect(len(O, F)).toBeCloseTo(R, 9);
      expect(E[1]).toBeGreaterThan(0);
      expect(E[1]).toBeLessThan(A[1]);
      expect(F[0]).toBeGreaterThan(0);
      expect(F[0]).toBeLessThan(C[0]);
      expect(angleAt(D, A, C)).toBeCloseTo(90, 10);
      expect(B[1]).toBe(A[1]); // AB ∥ DC
      void D;
    }
    const { A, B, C, D } = trapezoidModel(2, 8);
    expectFigureMatches('35581-4-102', [A, B, C, D], ([x, y]) => [60 + 20 * x, 210 - 20 * y]);
  });

  it('35581-4-102-a/b/c (the three claims hold in several models)', () => {
    for (const [b, c] of [[2, 8], [1, 9], [3, 5]]) {
      const { A, B, C, D, E, F } = trapezoidModel(b, c);
      expect(angleAt(C, B, D)).toBeCloseTo(2 * angleAt(E, D, F), 9);
      expect(len(A, B)).toBeCloseTo(len(D, F), 9);
      expect(len(A, E)).toBeCloseTo(len(D, E), 9);
      expect(len(B, E)).toBeCloseTo(len(F, E), 9);
      expect(len(B, C)).toBeCloseTo(len(D, F) + len(D, C), 9);
    }
  });
});

describe('archive slot 5 – plane trigonometry (coordinate model)', () => {
  /** Isosceles ABC (AB = BC) with base AC on the x-axis, D the midpoint of AC at the origin. */
  function isosceles(halfBase: number, height: number) {
    const A: Point = [-halfBase, 0];
    const C: Point = [halfBase, 0];
    const B: Point = [0, height];
    const D = mid(A, C);
    const E = mid(A, B);
    const F = mid(B, C);
    const O = intersect(A, F, C, E);
    return { A, B, C, D, E, F, O };
  }

  // r = 1: the height is fixed by OD = 1, then the half-base by S(AOC) = π·r².
  const height = bisect((k) => isosceles(1, k).O[1] - 1, 0.1, 20);
  const halfBase = bisect((d) => {
    const { A, O, C } = isosceles(d, height);
    return shoelace([A, O, C]) - Math.PI * O[1] ** 2;
  }, 0.1, 20);
  const model = isosceles(halfBase, height);

  it('35581-5-101 model satisfies the givens and matches the figure', () => {
    const { A, B, C, D, O } = model;
    expect(len(A, B)).toBeCloseTo(len(B, C), 12);
    expect(cross(vec(B, D), vec(B, O))).toBeCloseTo(0, 12); // O on the median BD
    expect(O[1]).toBeCloseTo(1, 10); // circle of radius 1 about O touches AC at D
    expect(shoelace([A, O, C])).toBeCloseTo(Math.PI, 10);
    expectFigureMatches('35581-5-101', [A, B, C], ([x, y]) => [160 + 40 * x, 190 - 40 * y]);
  });

  it('35581-5-101-a (equal areas, here and in another isosceles triangle)', () => {
    for (const { B, C, D, E, O } of [model, isosceles(3, 7)]) {
      expect(shoelace([B, O, E])).toBeCloseTo(shoelace([C, O, D]), 10);
    }
  });

  it('35581-5-101-b', () => {
    const { A, C, E } = model;
    expectAnswer('35581-5-101-b', angleAt(C, A, E), 9);
  });

  it('35581-5-101-c (OE in units of r)', () => {
    const { E, O } = model;
    expect(len(O, E) / O[1]).toBeCloseTo(Math.sqrt(1 + Math.PI ** 2) / 2, 10);
    expect(section('35581-5-101-c').finalAnswer).toContain(String.raw`\sqrt{1+\pi^2}`);
  });
});

describe('archive slot 6 – calculus of polynomial, rational and root functions (numeric)', () => {
  const grid = (from: number, to: number, step: number) => {
    const xs: number[] = [];
    for (let i = 0; from + i * step <= to + 1e-9; i += 1) xs.push(from + i * step);
    return xs;
  };
  const d1 = (f: (x: number) => number, x: number) => numericDerivative(f, x, 1e-6);
  const d2 = (f: (x: number) => number, x: number) => numericDerivative((t) => numericDerivative(f, t, 1e-5), x, 1e-5);

  // 35581-6-101: f(x) = (x − b)² / (x² − 4), b > 2
  const parameters = [2.5, 3, 4, 6];
  const rational = (b: number) => (x: number) => (x - b) ** 2 / (x * x - 4);

  it('35581-6-101-a/b (domain, asymptotes, intercepts)', () => {
    for (const b of parameters) {
      const f = rational(b);
      expect(f(2 + 1e-7)).toBeGreaterThan(1e4);
      expect(f(2 - 1e-7)).toBeLessThan(-1e4);
      expect(f(-2 - 1e-7)).toBeGreaterThan(1e4);
      expect(f(-2 + 1e-7)).toBeLessThan(-1e4);
      expect(f(1e7)).toBeCloseTo(1, 5);
      expect(f(-1e7)).toBeCloseTo(1, 5);
      expect(f(0)).toBeCloseTo(-(b * b) / 4, 12);
      expect(f(b)).toBe(0);
      for (const x of grid(-30, 30, 0.01)) {
        if (Math.abs(Math.abs(x) - 2) < 1e-6 || Math.abs(x - b) < 1e-6) continue;
        expect(f(x) > 0).toBe(Math.abs(x) > 2); // the only zero is x = b
      }
    }
  });

  it('35581-6-101-c (extremum points)', () => {
    for (const b of parameters) {
      const f = rational(b);
      expect(findCriticalPoints(f, -60, -2.01, 20000)).toEqual([]);
      const middle = findCriticalPoints(f, -1.99, 1.99, 4000);
      const right = findCriticalPoints(f, 2.01, 60, 20000);
      expect(middle.length).toBe(1);
      expect(right.length).toBe(1);
      expect(middle[0]).toBeCloseTo(4 / b, 6);
      expect(right[0]).toBeCloseTo(b, 6);
      expect(d1(f, middle[0] - 0.01)).toBeGreaterThan(0); // maximum
      expect(d1(f, right[0] - 0.01)).toBeLessThan(0); // minimum
      expect(f(middle[0])).toBeCloseTo((4 - b * b) / 4, 8);
    }
  });

  it('35581-6-101-e (one inflection point, right of b; f′ < 0 and f″ < 0 exactly on 4/b < x < 2)', () => {
    for (const b of parameters) {
      const f = rational(b);
      expect(findInflectionPoints(f, -30, -2.05, 4000)).toEqual([]);
      expect(findInflectionPoints(f, -1.95, 1.95, 4000)).toEqual([]);
      const right = findInflectionPoints(f, 2.05, 30, 4000);
      expect(right.length).toBe(1);
      expect(right[0]).toBeGreaterThan(b);
      for (const x of grid(-10, 25, 0.01)) {
        if (Math.abs(Math.abs(x) - 2) < 0.05 || Math.abs(x - 4 / b) < 0.02 || Math.abs(x - right[0]) < 0.02) continue;
        expect(d1(f, x) < 0 && d2(f, x) < 0, `b=${b}, x=${x}`).toBe(x > 4 / b && x < 2);
      }
    }
  });

  // 35581-6-102: f(x) = (ax² + 4x) / (x² + 3x + b)
  const withParameters = (a: number, b: number) => (x: number) => (a * x * x + 4 * x) / (x * x + 3 * x + b);
  const hole = withParameters(1, -4);

  it('35581-6-102-a (a = 1, b = −4 give the asymptotes x = 1 and y = 1)', () => {
    expect(findRoots((x) => x * x + 3 * x - 4, -10, 10)).toEqual([-4, 1].map((value) => expect.closeTo(value, 9)));
    expect(1 + 4).not.toBe(0); // numerator at x = 1 with a = 1
    expect(Math.abs(hole(1 + 1e-8))).toBeGreaterThan(1e7);
    expect(hole(1e8)).toBeCloseTo(1, 6);
    expect(hole(-1e8)).toBeCloseTo(1, 6);
    expect(withParameters(2, -4)(1e8)).toBeCloseTo(2, 6); // the horizontal asymptote is y = a
  });

  it('35581-6-102-b (only intercept (0,0); a hole at (−4, 0.8))', () => {
    expect(findRoots(hole, -3.99, 0.99, 4000)).toEqual([expect.closeTo(0, 9)]);
    expect(findRoots(hole, -30, -4.01, 4000)).toEqual([]);
    expect(findRoots(hole, 1.01, 30, 4000)).toEqual([]);
    expect(Number.isNaN(hole(-4))).toBe(true);
    expect(hole(-4 + 1e-7)).toBeCloseTo(0.8, 6);
    expect(hole(-4 - 1e-7)).toBeCloseTo(0.8, 6);
  });

  it('35581-6-102-c (decreasing on every interval of the domain)', () => {
    for (const x of grid(-20, 20, 0.05)) {
      if (Math.abs(x + 4) < 0.01 || Math.abs(x - 1) < 0.01) continue;
      expect(d1(hole, x)).toBeLessThan(0);
    }
  });

  it('35581-6-102-e (|f| = −f exactly for 0 ≤ x < 1)', () => {
    for (const x of grid(-20, 20, 0.01)) {
      if (Math.abs(x + 4) < 1e-6 || Math.abs(x - 1) < 1e-6) continue;
      const value = hole(x);
      expect(Math.abs(value) === -value, `x=${x}`).toBe(x > -1e-9 && x < 1);
    }
  });

  it('35581-6-102-f', () => {
    const g = (x: number) => hole(x) ** 2 * d1(hole, x);
    for (const x of grid(0.01, 0.5, 0.01)) expect(g(x)).toBeLessThan(0);
    expect(g(0)).toBeCloseTo(0, 12);
    expectAnswer('35581-6-102-f', absoluteArea(g, 0, 0.5, 4000), 6);
  });

  // 35581-6-103: f(x) = x / √(x² − a²)
  const rootQuotient = (a: number) => (x: number) => x / Math.sqrt(x * x - a * a);

  it('35581-6-103-a/b (domain |x| > a; asymptotes x = ±a, y = ±1)', () => {
    for (const a of [1, 2, 3]) {
      const f = rootQuotient(a);
      for (const x of grid(-10, 10, 0.05)) {
        if (Math.abs(Math.abs(x) - a) < 1e-9) continue;
        expect(Number.isFinite(f(x))).toBe(Math.abs(x) > a);
      }
      expect(f(a + 1e-9)).toBeGreaterThan(1e3);
      expect(f(-a - 1e-9)).toBeLessThan(-1e3);
      expect(f(1e8)).toBeCloseTo(1, 8);
      expect(f(-1e8)).toBeCloseTo(-1, 8);
    }
  });

  it('35581-6-103-c/d (decreasing, odd, |f| > 1)', () => {
    for (const a of [1, 2, 3]) {
      const f = rootQuotient(a);
      for (const x of grid(a + 0.05, a + 30, 0.05)) {
        expect(d1(f, x)).toBeLessThan(0);
        expect(d1(f, -x)).toBeLessThan(0);
        expect(f(-x)).toBeCloseTo(-f(x), 12);
        expect(f(x)).toBeGreaterThan(1);
      }
    }
  });

  it('35581-6-103-e (f′: negative, even, x = ±a and y = 0 asymptotes, increasing for x > a)', () => {
    for (const a of [1, 2, 3]) {
      const f = rootQuotient(a);
      const fPrime = (x: number) => d1(f, x);
      for (const x of grid(a + 0.1, a + 20, 0.1)) {
        expect(fPrime(x)).toBeLessThan(0);
        expect(fPrime(-x)).toBeCloseTo(fPrime(x), 5);
        expect(fPrime(x + 0.05)).toBeGreaterThan(fPrime(x));
      }
      expect(fPrime(a + 1e-3)).toBeLessThan(-1e3);
      expect(Math.abs(fPrime(1e4))).toBeLessThan(1e-6);
    }
  });

  it('35581-6-103-f (a = 0: f = ±1)', () => {
    const f = rootQuotient(0);
    expect(Number.isNaN(f(0))).toBe(true);
    for (const x of grid(0.05, 10, 0.05)) {
      expect(f(x)).toBe(1);
      expect(f(-x)).toBe(-1);
    }
  });

  // 35581-6-104: f(x) = (x − 5) / √(x² − 10x + 24), g(x) = f(x + 5)
  const shifted = (x: number) => (x - 5) / Math.sqrt(x * x - 10 * x + 24);
  const g104 = (x: number) => shifted(x + 5);

  it('35581-6-104-a/b (domain, intercepts, asymptotes)', () => {
    for (const x of grid(-10, 20, 0.05)) {
      if (Math.abs(x - 4) < 1e-9 || Math.abs(x - 6) < 1e-9) continue;
      expect(Number.isFinite(shifted(x))).toBe(x < 4 || x > 6);
    }
    expect(shifted(0)).toBeCloseTo(-1.0206207262, 9);
    expect(findRoots(shifted, -50, 3.99, 4000)).toEqual([]);
    expect(findRoots(shifted, 6.01, 50, 4000)).toEqual([]);
    expect(shifted(4 - 1e-9)).toBeLessThan(-1e3);
    expect(shifted(6 + 1e-9)).toBeGreaterThan(1e3);
    expect(shifted(1e8)).toBeCloseTo(1, 6);
    expect(shifted(-1e8)).toBeCloseTo(-1, 6);
  });

  it('35581-6-104-c/d (decreasing; the branches stay outside y = ±1)', () => {
    for (const x of [...grid(-30, 3.95, 0.05), ...grid(6.05, 40, 0.05)]) {
      expect(d1(shifted, x)).toBeLessThan(0);
      expect(Math.abs(shifted(x))).toBeGreaterThan(1);
    }
  });

  it('35581-6-104-e (g is odd on |x| > 1)', () => {
    for (const x of grid(1.01, 20, 0.01)) {
      expect(g104(x)).toBeCloseTo(x / Math.sqrt(x * x - 1), 9);
      expect(g104(-x)).toBeCloseTo(-g104(x), 9);
    }
    expect(Number.isNaN(g104(0.5))).toBe(true);
  });

  it('35581-6-104-f (∫ₐᵇ g = ∫ f from a+5 to b+5)', () => {
    for (const [a, b] of [[1.1, 1.9], [1.5, 3], [2, 7]]) {
      expect(simpson(g104, a, b, 4000)).toBeCloseTo(simpson(shifted, a + 5, b + 5, 4000), 8);
    }
  });

  // 35581-6-105: f(x) = (ax³ + 2ax) / √(x⁴ + 4x² + 4)
  const quotient = (a: number) => (x: number) => (a * x ** 3 + 2 * a * x) / Math.sqrt(x ** 4 + 4 * x * x + 4);

  it('35581-6-105-a/b (defined everywhere, odd)', () => {
    for (const x of grid(-20, 20, 0.05)) {
      expect(x ** 4 + 4 * x * x + 4).toBeGreaterThanOrEqual(4);
      expect(quotient(1.7)(-x)).toBeCloseTo(-quotient(1.7)(x), 12);
    }
  });

  it('35581-6-105-c', () => {
    const area = (a: number) => absoluteArea(quotient(a), -1, 1, 4000);
    const a = bisect((value) => area(value) - 4, 0.1, 20);
    expectAnswer('35581-6-105-c', a, 6);
    for (const x of grid(-5, 5, 0.1)) expect(quotient(4)(x)).toBeCloseTo(4 * x, 10);
  });

  it('35581-6-105-d/e (g = 2x² is an antiderivative through (0,0); f > g exactly on 0 < x < 2)', () => {
    const f = quotient(4);
    const g = (x: number) => 2 * x * x;
    for (const x of grid(-5, 5, 0.1)) expect(d1(g, x)).toBeCloseTo(f(x), 6);
    expect(g(0)).toBe(f(0));
    for (const x of grid(-5, 5, 0.01)) {
      if (Math.abs(x) < 1e-6 || Math.abs(x - 2) < 1e-6) continue;
      expect(f(x) > g(x), `x=${x}`).toBe(x > 0 && x < 2);
    }
  });

  // 35581-6-106: f(x) = (1 + 1/x)^n
  const power = (n: number) => (x: number) => (1 + 1 / x) ** n;
  const secondDerivative = (n: number) => (x: number) => (n / x ** 4) * (1 + 1 / x) ** (n - 2) * (2 * x + n + 1);
  /** Number of sign changes of h along xs (exact zeros are skipped). */
  const signChanges = (h: (x: number) => number, xs: number[]) => {
    let changes = 0;
    let last = 0;
    for (const x of xs) {
      const sign = Math.sign(h(x));
      if (sign === 0) continue;
      if (last !== 0 && sign !== last) changes += 1;
      last = sign;
    }
    return changes;
  };
  const leftSide = grid(-40, -0.02, 0.001);
  const rightSide = grid(0.02, 40, 0.001);

  it('35581-6-106-a (asymptotes x = 0 and y = 1)', () => {
    for (let n = 2; n <= 7; n += 1) {
      expect(power(n)(1e8)).toBeCloseTo(1, 6);
      expect(power(n)(-1e8)).toBeCloseTo(1, 6);
      expect(Math.abs(power(n)(1e-6))).toBeGreaterThan(1e10);
      expect(Math.abs(power(n)(-1e-6))).toBeGreaterThan(1e10);
    }
  });

  it('35581-6-106-b (n odd ⇒ f′ ≤ 0)', () => {
    for (const n of [3, 5, 7]) {
      for (const x of [...grid(-20, -0.05, 0.01), ...grid(0.05, 20, 0.01)]) expect(d1(power(n), x)).toBeLessThan(1e-7);
    }
  });

  it('35581-6-106 f″ formula agrees with numeric second derivatives', () => {
    for (let n = 2; n <= 7; n += 1) {
      for (const x of [-6, -3.3, -1.7, -0.6, 0.4, 1.3, 5]) {
        const exact = secondDerivative(n)(x);
        expect(d2(power(n), x)).toBeCloseTo(exact, Math.abs(exact) > 100 ? 1 : 4);
      }
    }
  });

  it('35581-6-106-c/d (counts of extremum and inflection points)', () => {
    for (let n = 2; n <= 9; n += 1) {
      const odd = n % 2 === 1;
      const fPrime = (x: number) => d1(power(n), x);
      expect(signChanges(fPrime, leftSide) + signChanges(fPrime, rightSide)).toBe(odd ? 0 : 1);
      expect(signChanges(secondDerivative(n), leftSide) + signChanges(secondDerivative(n), rightSide)).toBe(odd ? 2 : 1);
      if (!odd) {
        expect(findRoots(fPrime, -40, -0.05, 4000)).toEqual([expect.closeTo(-1, 6)]);
        expect(power(n)(-1)).toBe(0);
      }
    }
  });

  it('35581-6-106-e (g″·h″ > 0 for x > 0)', () => {
    for (const x of grid(0.2, 10, 0.05)) expect(d2(power(3), x) * d2(power(4), x)).toBeGreaterThan(0);
  });

  it('35581-6-106 figure: graph I (n odd) never rises above the x-axis, graph II (n even) does', () => {
    const paths = [...(problem('35581-6-106').figureSvg ?? '').matchAll(/<path d="([^"]+)"/g)].map((match) =>
      match[1].replace(/[ML]/g, ' ').trim().split(/\s+/).map((pair) => pair.split(',').map(Number) as Point),
    );
    expect(paths.length).toBe(4);
    const panelOne = paths.filter((path) => path.every(([x]) => x < 160)).flat();
    const panelTwo = paths.filter((path) => path.every(([x]) => x > 160)).flat();
    expect(panelOne.length + panelTwo.length).toBe(paths.flat().length);
    expect(Math.min(...panelOne.map(([, y]) => y))).toBeGreaterThan(119.5); // y = 120 is the x-axis
    expect(Math.min(...panelTwo.map(([, y]) => y))).toBeLessThan(60);
  });
});

describe('archive slot 7 – calculus of trigonometric functions (numeric)', () => {
  const f = (x: number) => Math.cos(x * x - 2 * x);
  const df = (x: number) => numericDerivative(f, x, 1e-6);

  it('35581-7-101-a (extremum points)', () => {
    const critical = findCriticalPoints(f, -0.5, 2.5, 6000);
    expect(critical.length).toBe(3);
    [0, 1, 2].forEach((x, index) => expect(critical[index]).toBeCloseTo(x, 6));
    expect(df(-0.25)).toBeGreaterThan(0);
    expect(df(0.5)).toBeLessThan(0);
    expect(df(1.5)).toBeGreaterThan(0);
    expect(df(2.25)).toBeLessThan(0);
    expect(f(0)).toBeCloseTo(1, 12);
    expect(f(1)).toBeCloseTo(0.5403023059, 9);
    expect(f(-0.5)).toBeCloseTo(0.3153223624, 9);
    expect(f(2.5)).toBeCloseTo(0.3153223624, 9);
  });

  it('35581-7-101-b (symmetric about x = 1 and above the x-axis)', () => {
    for (let t = 0; t <= 1.5; t += 0.01) expect(f(1 + t)).toBeCloseTo(f(1 - t), 12);
    for (let x = -0.5; x <= 2.5; x += 0.01) expect(f(x)).toBeGreaterThan(0.3);
  });

  it('35581-7-101-c', () => {
    expectAnswer('35581-7-101-c', absoluteArea(df, 0, 2, 8000), 6);
  });
});
