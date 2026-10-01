/**
 * Independent numeric verification of the slot-3 (probability) problems 35581-3-4 … 35581-3-10.
 * Problems 1–3 are verified in ../35581.test.ts.
 * Every numericAnswer is recomputed from first principles: exhaustive enumeration of an explicit
 * outcome space (product spaces, labelled-ball urns, Markov-style trees), counting on a concrete
 * population, or summing a binomial pmf — never by re-evaluating the closed form in the solution.
 */
import { describe, expect, it } from 'vitest';
import { binomialPmf, enumerateProbability, findRoots, solveQuadratic } from '../verify';
import { slot3Problems } from './slot3';

type Space<T> = Array<[T, number]>;

function answer(sectionId: string): number {
  for (const problem of slot3Problems) {
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

/** n independent copies of the same one-stage space. */
function repeat<T>(space: Space<T>, n: number): Space<T>[] {
  return Array.from({ length: n }, () => space);
}

function bernoulli(p: number): Space<boolean> {
  return [[true, p], [false, 1 - p]];
}

function successes(outcome: boolean[]): number {
  return outcome.filter(Boolean).length;
}

function totalMass<T>(space: Space<T>): number {
  return space.reduce((sum, [, p]) => sum + p, 0);
}

/**
 * Every ordered draw of `k` labelled balls without replacement, with its probability
 * (all orderings of distinct balls are equally likely).
 */
function orderedDraws(balls: string[], k: number): Space<string[]> {
  const result: Space<string[]> = [];
  const walk = (remaining: number[], drawn: string[], probability: number) => {
    if (drawn.length === k) {
      result.push([drawn, probability]);
      return;
    }
    for (const index of remaining) {
      walk(remaining.filter((other) => other !== index), [...drawn, balls[index]], probability / remaining.length);
    }
  };
  walk(balls.map((_, index) => index), [], 1);
  return result;
}

/** All length-`steps` paths of a two-state chain started from `start`, as [path, probability]. */
function chainPaths(start: string, transition: Record<string, Record<string, number>>, steps: number): Space<string> {
  const result: Space<string> = [];
  const walk = (current: string, path: string, probability: number) => {
    if (path.length === steps) {
      result.push([path, probability]);
      return;
    }
    for (const [next, p] of Object.entries(transition[current])) walk(next, path + next, probability * p);
  };
  walk(start, '', 1);
  return result;
}

describe('35581-3-4 – two-stage tree with an unknown p (shooter)', () => {
  // Second shot depends on the first: hit→hit p+0.1, miss→hit 0.5. Outcomes are ordered pairs 'HH','HM','MH','MM'.
  const tree = (p: number): Space<string> => [
    ['HH', p * (p + 0.1)],
    ['HM', p * (1 - (p + 0.1))],
    ['MH', (1 - p) * 0.5],
    ['MM', (1 - p) * 0.5],
  ];
  const bothHit = (p: number) => enumerateProbability([tree(p)], (o) => o[0] === 'HH');
  const roots = findRoots((p) => bothHit(p) - 0.42, 0, 1);
  const p = roots[0];
  const space = tree(p);

  it('a: p is the unique root of P(both hit) = 0.42 in (0, 1)', () => {
    expect(roots).toHaveLength(1);
    expect(p).toBeGreaterThan(0);
    expect(p).toBeLessThan(1);
    expectAnswer('35581-3-4-a', p, 9);
    const valid = solveQuadratic(1, 0.1, -0.42).filter((r) => r > 0 && r < 1);
    expect(valid).toHaveLength(1);
    expect(valid[0]).toBeCloseTo(p, 9);
  });
  it('model satisfies the givens', () => {
    expect(totalMass(space)).toBeCloseTo(1, 12);
    for (const [, prob] of space) expect(prob).toBeGreaterThanOrEqual(0);
    expect(bothHit(p)).toBeCloseTo(0.42, 9);
    expect(p + 0.1).toBeLessThanOrEqual(1);
  });
  it('35581-3-4-b', () => expectAnswer('35581-3-4-b', enumerateProbability([space], (o) => o[0] === 'HM' || o[0] === 'MH'), 9));
  it('35581-3-4-c', () => {
    const secondHit = enumerateProbability([space], (o) => o[0].endsWith('H'));
    const bothHitMass = enumerateProbability([space], (o) => o[0] === 'HH');
    expectAnswer('35581-3-4-c', bothHitMass / secondHit, 9);
  });
  it('35581-3-4-d', () => {
    const pBoth = enumerateProbability([space], (o) => o[0] === 'HH');
    expectAnswer('35581-3-4-d', enumerateProbability(repeat(bernoulli(pBoth), 4), (o) => successes(o) === 2), 9);
  });
});

describe('35581-3-5 – urn without replacement (labelled balls)', () => {
  const balls = ['W', 'W', 'W', 'B', 'B', 'B', 'B', 'B'];
  const two = orderedDraws(balls, 2);
  const three = orderedDraws(balls, 3);
  const whites = (draw: string[]) => draw.filter((ball) => ball === 'W').length;

  it('model satisfies the givens', () => {
    expect(balls.filter((ball) => ball === 'W')).toHaveLength(3);
    expect(balls.filter((ball) => ball === 'B')).toHaveLength(5);
    expect(two).toHaveLength(8 * 7);
    expect(three).toHaveLength(8 * 7 * 6);
    expect(totalMass(two)).toBeCloseTo(1, 12);
    expect(totalMass(three)).toBeCloseTo(1, 12);
  });
  it('35581-3-5-a', () => expectAnswer('35581-3-5-a', enumerateProbability([two], (o) => o[0][1] === 'W'), 10));
  it('35581-3-5-b', () => {
    const secondWhite = enumerateProbability([two], (o) => o[0][1] === 'W');
    const firstBlackSecondWhite = enumerateProbability([two], (o) => o[0][0] === 'B' && o[0][1] === 'W');
    expectAnswer('35581-3-5-b', firstBlackSecondWhite / secondWhite, 9);
  });
  it('35581-3-5-c', () => expectAnswer('35581-3-5-c', enumerateProbability([three], (o) => whites(o[0]) === 2), 9));
  it('35581-3-5-d (with replacement)', () => {
    const pWhite = balls.filter((ball) => ball === 'W').length / balls.length;
    const draw: Space<string> = [['W', pWhite], ['B', 1 - pWhite]];
    const withReplacement = enumerateProbability(repeat(draw, 3), (o) => whites(o) === 2);
    expectAnswer('35581-3-5-d', withReplacement, 10);
    expect(withReplacement).toBeLessThan(answer('35581-3-5-c'));
  });
});

describe('35581-3-6 – independence from P(A), P(B|A), P(A∪B) (population of 10000)', () => {
  const pop = { both: 1800, aOnly: 1200, bOnly: 4200, neither: 2800 };
  const total = pop.both + pop.aOnly + pop.bOnly + pop.neither;
  const pA = (pop.both + pop.aOnly) / total;
  const pB = (pop.both + pop.bOnly) / total;

  it('model satisfies the givens', () => {
    expect(total).toBe(10000);
    expect(pA).toBeCloseTo(0.3, 12);
    expect(pop.both / (pop.both + pop.aOnly)).toBeCloseTo(0.6, 12);
    expect((pop.both + pop.aOnly + pop.bOnly) / total).toBeCloseTo(0.72, 12);
  });
  it('35581-3-6-a', () => expectAnswer('35581-3-6-a', pB, 12));
  it('35581-3-6-b (independence holds)', () => {
    expect(pop.both / total).toBeCloseTo(pA * pB, 12);
    expect(pop.both / (pop.both + pop.bOnly)).toBeCloseTo(pA, 12);
  });
  it('35581-3-6-c', () => expectAnswer('35581-3-6-c', (pop.aOnly + pop.bOnly) / total, 12));
  it('35581-3-6-d', () => expectAnswer('35581-3-6-d', pop.aOnly / (pop.aOnly + pop.bOnly), 9));
});

describe('35581-3-7 – three-day weather chain (explicit 8-path tree)', () => {
  // Tomorrow depends only on today: rain→rain 0.6, dry→rain 0.2. Sunday is rainy; paths cover Mon, Tue, Wed.
  const transition = { R: { R: 0.6, D: 0.4 }, D: { R: 0.2, D: 0.8 } };
  const paths = chainPaths('R', transition, 3);
  const prob = (predicate: (path: string) => boolean) => enumerateProbability([paths], (o) => predicate(o[0]));
  const monRain = prob((path) => path[0] === 'R');
  const wedRain = prob((path) => path[2] === 'R');
  const monAndWedRain = prob((path) => path[0] === 'R' && path[2] === 'R');

  it('model satisfies the givens', () => {
    expect(paths).toHaveLength(8);
    expect(totalMass(paths)).toBeCloseTo(1, 12);
    expect(monRain).toBeCloseTo(0.6, 12);
    for (const state of ['R', 'D'] as const) expect(transition[state].R + transition[state].D).toBeCloseTo(1, 12);
  });
  it('35581-3-7-a', () => expectAnswer('35581-3-7-a', prob((path) => path[1] === 'R'), 12));
  it('35581-3-7-b', () => expectAnswer('35581-3-7-b', prob((path) => path.split('').filter((day) => day === 'R').length === 1), 12));
  it('35581-3-7-c', () => expectAnswer('35581-3-7-c', monAndWedRain / wedRain, 9));
  it('35581-3-7-d (dependence)', () => {
    expect(Math.abs(monAndWedRain - monRain * wedRain)).toBeGreaterThan(0.03);
  });
});

describe('35581-3-8 – binomial with an unknown number of trials (product space)', () => {
  const shot = bernoulli(0.3);
  const atLeastOne = (n: number) => enumerateProbability(repeat(shot, n), (o) => successes(o) >= 1);

  it('35581-3-8-a', () => expectAnswer('35581-3-8-a', enumerateProbability(repeat(shot, 4), (o) => successes(o) === 2), 12));
  it('35581-3-8-b: smallest n with P(at least one) >= 0.9', () => {
    let n = 1;
    while (atLeastOne(n) < 0.9) n += 1;
    expect(n).toBe(answer('35581-3-8-b'));
    expect(atLeastOne(n - 1)).toBeLessThan(0.9);
    expect(atLeastOne(n)).toBeGreaterThanOrEqual(0.9);
  });
  it('35581-3-8-c', () => {
    const n = answer('35581-3-8-b');
    const exactlyTwo = enumerateProbability(repeat(shot, n), (o) => successes(o) === 2);
    expectAnswer('35581-3-8-c', exactlyTwo / atLeastOne(n), 9);
    expect(exactlyTwo).toBeCloseTo(binomialPmf(n, 2, 0.3), 12);
  });
  it('35581-3-8-d', () => {
    const firstHitOnFourth = enumerateProbability(repeat(shot, 4), (o) => !o[0] && !o[1] && !o[2] && o[3]);
    expectAnswer('35581-3-8-d', firstHitOnFourth, 12);
  });
});

describe('35581-3-9 – die, two boxes of labelled cards (explicit 6 × card space)', () => {
  const boxA = ['W', 'W', 'W', 'L'];
  const boxB = ['W', 'L', 'L', 'L', 'L'];
  // Every (die face, card index) outcome with its probability.
  const outcomes: Space<[string, string]> = [];
  for (let face = 1; face <= 6; face += 1) {
    const box = face <= 2 ? boxA : boxB;
    const name = face <= 2 ? 'A' : 'B';
    for (const card of box) outcomes.push([[name, card], 1 / 6 / box.length]);
  }
  const prob = (predicate: (o: [string, string]) => boolean) => enumerateProbability([outcomes], (o) => predicate(o[0]));
  const win = prob(([, card]) => card === 'W');

  it('model satisfies the givens', () => {
    expect(totalMass(outcomes)).toBeCloseTo(1, 12);
    expect(prob(([box]) => box === 'A')).toBeCloseTo(1 / 3, 12);
  });
  it('35581-3-9-a', () => expectAnswer('35581-3-9-a', win, 9));
  it('35581-3-9-b', () => expectAnswer('35581-3-9-b', prob(([box, card]) => box === 'A' && card === 'W') / win, 9));
  it('35581-3-9-c', () => {
    const aGivenLose = prob(([box, card]) => box === 'A' && card === 'L') / (1 - win);
    const bGivenLose = prob(([box, card]) => box === 'B' && card === 'L') / (1 - win);
    expect(bGivenLose).toBeGreaterThan(aGivenLose);
    expectAnswer('35581-3-9-c', Math.max(aGivenLose, bGivenLose), 9);
  });
  it('35581-3-9-d', () => {
    const game: Space<boolean> = outcomes.map(([[, card], p]) => [card === 'W', p]);
    expectAnswer('35581-3-9-d', enumerateProbability(repeat(game, 4), (o) => successes(o) <= 1), 9);
  });
});

describe('35581-3-10 – survey table (population of 1000) + binomial over 5 people', () => {
  const pop = { youngUser: 200, youngNon: 100, oldUser: 250, oldNon: 450 };
  const total = pop.youngUser + pop.youngNon + pop.oldUser + pop.oldNon;
  const pUser = (pop.youngUser + pop.oldUser) / total;

  it('model satisfies the givens', () => {
    expect(total).toBe(1000);
    expect((pop.youngUser + pop.youngNon) / total).toBeCloseTo(0.3, 12);
    expect(pop.youngUser / (pop.youngUser + pop.youngNon)).toBeCloseTo(2 / 3, 12);
    expect(pop.youngUser / (pop.youngUser + pop.oldUser)).toBeCloseTo(4 / 9, 12);
  });
  it('35581-3-10-a', () => expectAnswer('35581-3-10-a', pUser, 12));
  it('35581-3-10-b', () => expectAnswer('35581-3-10-b', pop.oldUser / (pop.oldUser + pop.oldNon), 9));
  const five = repeat(bernoulli(pUser), 5);
  it('35581-3-10-c', () => {
    const atLeast3 = enumerateProbability(five, (o) => successes(o) >= 3);
    const atLeast1 = enumerateProbability(five, (o) => successes(o) >= 1);
    expectAnswer('35581-3-10-c', atLeast3 / atLeast1, 9);
  });
  it('35581-3-10-d (most likely k)', () => {
    const values = [0, 1, 2, 3, 4, 5].map((k) => enumerateProbability(five, (o) => successes(o) === k));
    const best = values.indexOf(Math.max(...values));
    expect(best).toBe(answer('35581-3-10-d'));
    expect(values[best]).toBeCloseTo(binomialPmf(5, best, pUser), 12);
  });
});

describe('slot 3 structure (new problems 4–10)', () => {
  const added = slot3Problems.filter((problem) => Number(problem.id.split('-')[2]) >= 4);
  it('has 7 new well-formed problems', () => {
    expect(added.map((problem) => problem.id)).toEqual([4, 5, 6, 7, 8, 9, 10].map((n) => `35581-3-${n}`));
    for (const problem of added) {
      expect(problem.slot).toBe(3);
      expect(problem.topicId).toBe('probability');
      expect(problem.subtopicIds.length).toBeGreaterThanOrEqual(2);
      expect(problem.subtopicIds.length).toBeLessThanOrEqual(4);
      expect(problem.estimatedMinutes).toBeGreaterThanOrEqual(15);
      expect(problem.estimatedMinutes).toBeLessThanOrEqual(40);
      expect(problem.verified).toBe(false);
      expect(problem.source).toBe('ai-generated');
      expect(problem.sections.length).toBeGreaterThanOrEqual(3);
      expect(problem.sections.length).toBeLessThanOrEqual(4);
      problem.sections.forEach((section, index) => {
        expect(section.label).toBe(['א', 'ב', 'ג', 'ד'][index]);
        expect(section.id).toBe(`${problem.id}-${'abcd'[index]}`);
        expect(section.hints.length).toBeGreaterThanOrEqual(2);
        expect(section.hints.length).toBeLessThanOrEqual(3);
        expect(section.solutionSteps.length).toBeGreaterThanOrEqual(3);
        expect(section.solutionSteps.length).toBeLessThanOrEqual(8);
      });
    }
    const difficulties = added.map((problem) => problem.difficulty);
    expect(difficulties.every((d) => d === 2 || d === 3)).toBe(true);
    expect(difficulties.filter((d) => d === 3).length).toBeGreaterThanOrEqual(3);
  });
});
