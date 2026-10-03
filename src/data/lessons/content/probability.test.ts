/**
 * Independent numeric verification of the probability lessons (chapter 'הסתברות', 806 question 3).
 * Every answer is recomputed from first principles — exhaustive enumeration of an explicit outcome space
 * (dice / coin product spaces, labelled-ball urns listing every ordered draw, explicit probability trees),
 * counting on a concrete population (brute-force search over integer populations that satisfy the givens),
 * or enumerating the 2^n outcomes of a repeated Bernoulli trial — never by re-evaluating the closed form
 * written in the solution.
 */
import { describe, expect, it } from 'vitest';
import { enumerateProbability, findRoots } from '../../problems/verify';
import { probabilityContent } from './probability';

type Space<T> = Array<[T, number]>;

const ex = (id: string) => Object.values(probabilityContent).flatMap((lesson) => lesson.exercises).find((e) => e.id === id)!;

function expectAnswers(id: string, computed: number[], digits = 9) {
  const exercise = ex(id);
  expect(exercise, `${id} exists`).toBeDefined();
  const answers = exercise.answers ?? [];
  expect(answers.length, `${id}: number of answers`).toBe(computed.length);
  computed.forEach((value, index) => expect(answers[index].value, `${id} answer ${index + 1}`).toBeCloseTo(value, digits));
}

// ---------- outcome spaces ----------

function uniform<T>(values: T[]): Space<T> {
  return values.map((value) => [value, 1 / values.length]);
}

function repeat<T>(space: Space<T>, n: number): Space<T>[] {
  return Array.from({ length: n }, () => space);
}

function bernoulli(p: number): Space<boolean> {
  return [
    [true, p],
    [false, 1 - p],
  ];
}

const successes = (outcome: boolean[]) => outcome.filter(Boolean).length;
const die = uniform([1, 2, 3, 4, 5, 6]);
const coin = uniform(['H', 'T']);

/** Probability of a predicate on a single (already composite) space. */
function prob<T>(space: Space<T>, predicate: (outcome: T) => boolean): number {
  return enumerateProbability([space], (o) => predicate(o[0]));
}

function totalMass<T>(space: Space<T>): number {
  return space.reduce((sum, [, p]) => sum + p, 0);
}

/** Balls of given colours, e.g. balls({ R: 3, W: 2 }) → ['R','R','R','W','W'] (each ball is a distinct object). */
function balls(counts: Record<string, number>): string[] {
  return Object.entries(counts).flatMap(([colour, count]) => Array.from({ length: count }, () => colour));
}

/** Every ordered draw of k labelled balls without replacement, each with its probability. */
function orderedDraws(items: string[], k: number): Space<string[]> {
  const result: Space<string[]> = [];
  const walk = (remaining: number[], drawn: string[], probability: number) => {
    if (drawn.length === k) {
      result.push([drawn, probability]);
      return;
    }
    for (const index of remaining) walk(remaining.filter((other) => other !== index), [...drawn, items[index]], probability / remaining.length);
  };
  walk(
    items.map((_, index) => index),
    [],
    1,
  );
  return result;
}

/**
 * Explicit probability tree: `next(history)` lists the branches (with their conditional probabilities)
 * leaving the node reached by `history`, or null when the experiment stops there.
 */
function tree(depth: number, next: (history: string[]) => Space<string> | null): Space<string[]> {
  const result: Space<string[]> = [];
  const walk = (history: string[], probability: number) => {
    const options = history.length < depth ? next(history) : null;
    if (!options) {
      result.push([history, probability]);
      return;
    }
    for (const [value, p] of options) walk([...history, value], probability * p);
  };
  walk([], 1);
  return result;
}

// ---------- concrete populations (Venn / two-way tables) ----------

interface Population {
  both: number;
  aOnly: number;
  bOnly: number;
  none: number;
}
interface Person {
  a: boolean;
  b: boolean;
}

function people(pop: Population): Person[] {
  const make = (count: number, a: boolean, b: boolean) => Array.from({ length: count }, () => ({ a, b }));
  return [...make(pop.both, true, true), ...make(pop.aOnly, true, false), ...make(pop.bOnly, false, true), ...make(pop.none, false, false)];
}

function share(group: Person[], predicate: (person: Person) => boolean): number {
  return group.filter(predicate).length / group.length;
}

function conditional(group: Person[], event: (person: Person) => boolean, given: (person: Person) => boolean): number {
  return share(group.filter(given), event);
}

const regionPeople: Array<[keyof Population, Person]> = [
  ['both', { a: true, b: true }],
  ['aOnly', { a: true, b: false }],
  ['bOnly', { a: false, b: true }],
  ['none', { a: false, b: false }],
];

/** Share of a population (given by its region counts) whose members satisfy the predicate. */
function shareOf(pop: Population, predicate: (person: Person) => boolean): number {
  let count = 0;
  let total = 0;
  for (const [key, person] of regionPeople) {
    total += pop[key];
    if (predicate(person)) count += pop[key];
  }
  return count / total;
}

/** All integer populations of size n (four Venn regions) satisfying `givens`, found by exhaustive search. */
function populations(n: number, givens: (pop: Population) => boolean): Population[] {
  const found: Population[] = [];
  for (let both = 0; both <= n; both += 1)
    for (let aOnly = 0; aOnly + both <= n; aOnly += 1)
      for (let bOnly = 0; bOnly + aOnly + both <= n; bOnly += 1) {
        const pop = { both, aOnly, bOnly, none: n - both - aOnly - bOnly };
        if (givens(pop)) found.push(pop);
      }
  return found;
}

const close = (x: number, y: number) => Math.abs(x - y) < 1e-9;
const A = (p: Person) => p.a;
const B = (p: Person) => p.b;
const notA = (p: Person) => !p.a;
const notB = (p: Person) => !p.b;
const AandB = (p: Person) => p.a && p.b;
const AorB = (p: Person) => p.a || p.b;
const exactlyOne = (p: Person) => p.a !== p.b;
const neither = (p: Person) => !p.a && !p.b;

/** The unique population of size n satisfying the givens (asserts uniqueness). */
function uniquePopulation(n: number, givens: (pop: Population) => boolean): Person[] {
  const found = populations(n, givens);
  expect(found, 'exactly one population satisfies the givens').toHaveLength(1);
  return people(found[0]);
}

// =====================================================================
describe('prob-laws — Venn regions on concrete populations of 100', () => {
  it('prob-laws-1', () => {
    const group = uniquePopulation(100, (g) => close(shareOf(g, A), 0.45) && close(shareOf(g, B), 0.3) && close(shareOf(g, AandB), 0.12));
    expectAnswers('prob-laws-1', [share(group, AorB)]);
  });
  it('prob-laws-2', () => {
    const group = uniquePopulation(100, (g) => close(shareOf(g, A), 0.25) && close(shareOf(g, B), 0.4) && shareOf(g, AandB) === 0);
    expectAnswers('prob-laws-2', [share(group, AorB), share(group, neither)]);
  });
  it('prob-laws-3', () => {
    const group = uniquePopulation(100, (g) => close(shareOf(g, A), 0.6) && close(shareOf(g, B), 0.5) && close(shareOf(g, AorB), 0.8));
    expectAnswers('prob-laws-3', [share(group, AandB), share(group, exactlyOne)]);
  });
  it('prob-laws-4', () => {
    const group = uniquePopulation(100, (g) => close(shareOf(g, A), 0.55) && close(shareOf(g, B), 0.4) && close(shareOf(g, neither), 0.2));
    expectAnswers('prob-laws-4', [share(group, AandB), share(group, exactlyOne)]);
  });
  it('prob-laws-5', () => {
    const group = uniquePopulation(100, (g) => close(shareOf(g, notA), 0.3) && close(shareOf(g, B), 0.5) && close(shareOf(g, neither), 0.1));
    expectAnswers('prob-laws-5', [share(group, AandB), share(group, (p) => !p.a && p.b)]);
  });
  it('prob-laws-6', () => {
    const group = uniquePopulation(100, (g) => close(shareOf(g, A), 2 * shareOf(g, B)) && close(shareOf(g, AandB), 0.1) && close(shareOf(g, AorB), 0.65));
    expectAnswers('prob-laws-6', [share(group, B), share(group, A)]);
  });
  it('prob-laws-7 (range of P(A∩B) over every population of 1000 with P(A)=0.6, P(B)=0.7)', () => {
    const intersections: number[] = [];
    // P(A)=0.6 and P(B)=0.7 fix aOnly = 600 - both and bOnly = 700 - both; scan every feasible "both".
    for (let both = 0; both <= 1000; both += 1) {
      const aOnly = 600 - both;
      const bOnly = 700 - both;
      const none = 1000 - both - aOnly - bOnly;
      if (aOnly < 0 || bOnly < 0 || none < 0) continue;
      const group = people({ both, aOnly, bOnly, none });
      expect(share(group, A)).toBeCloseTo(0.6, 12);
      expect(share(group, B)).toBeCloseTo(0.7, 12);
      intersections.push(share(group, AandB));
    }
    expectAnswers('prob-laws-7', [Math.min(...intersections), Math.max(...intersections)]);
  });
  it('prob-laws-8', () => {
    // Venn model with P(A)=p, P(B)=2p, P(A∩B)=p²; P(A∪B) summed over the three occupied regions.
    const regions = (p: number): Space<string> => [
      ['both', p * p],
      ['aOnly', p - p * p],
      ['bOnly', 2 * p - p * p],
      ['none', 1 - (p - p * p) - (2 * p - p * p) - p * p],
    ];
    const union = (p: number) => prob(regions(p), (r) => r !== 'none');
    const roots = findRoots((p) => union(p) - 0.56, 0, 0.5);
    expect(roots).toHaveLength(1);
    const p = roots[0];
    for (const [, mass] of regions(p)) expect(mass).toBeGreaterThanOrEqual(0);
    // same answer on a concrete population of 100
    const group = uniquePopulation(100, (g) => close(shareOf(g, B), 2 * shareOf(g, A)) && close(shareOf(g, AandB), shareOf(g, A) ** 2) && close(shareOf(g, AorB), 0.56));
    expect(share(group, A)).toBeCloseTo(p, 9);
    expectAnswers('prob-laws-8', [p, prob(regions(p), (r) => r === 'aOnly' || r === 'bOnly')]);
    expect(share(group, exactlyOne)).toBeCloseTo(ex('prob-laws-8').answers![1].value, 12);
  });
});

// =====================================================================
describe('prob-basic — equally likely outcomes, enumerated', () => {
  it('prob-basic-1', () => expectAnswers('prob-basic-1', [prob(die, (x) => x % 2 === 0 || x > 4)], 12));
  it('prob-basic-2', () => {
    const box = balls({ R: 7, W: 5, G: 8 });
    expect(box).toHaveLength(20);
    expectAnswers('prob-basic-2', [prob(uniform(box), (ball) => ball !== 'G')], 12);
  });
  it('prob-basic-3', () => {
    expect(enumerateProbability([die, die], () => true)).toBeCloseTo(1, 12);
    expectAnswers('prob-basic-3', [enumerateProbability([die, die], ([a, b]) => a + b === 8), enumerateProbability([die, die], ([a, b]) => a + b >= 10)], 12);
  });
  it('prob-basic-4', () =>
    expectAnswers('prob-basic-4', [enumerateProbability([die, die], (o) => o.includes(6)), enumerateProbability([die, die], ([a, b]) => (a * b) % 2 === 0)], 12));
  it('prob-basic-5', () => {
    const heads = (o: string[]) => o.filter((side) => side === 'H').length;
    expectAnswers('prob-basic-5', [enumerateProbability(repeat(coin, 3), (o) => heads(o) === 2), enumerateProbability(repeat(coin, 3), (o) => heads(o) >= 1)], 12);
  });
  it('prob-basic-6', () => {
    const blueChance = (n: number) => prob(uniform(balls({ R: 4, B: n })), (ball) => ball === 'B');
    const ns = Array.from({ length: 101 }, (_, n) => n).filter((n) => close(blueChance(n), 0.6));
    expect(ns).toHaveLength(1);
    const n = ns[0];
    const redChance = (k: number) => prob(uniform(balls({ R: 4 + k, B: n })), (ball) => ball === 'R');
    const ks = Array.from({ length: 101 }, (_, k) => k).filter((k) => close(redChance(k), 0.5));
    expect(ks).toHaveLength(1);
    expectAnswers('prob-basic-6', [n, ks[0]], 12);
  });
  it('prob-basic-7', () => {
    const numbers = uniform(Array.from({ length: 100 }, (_, i) => i + 1));
    const by4 = (x: number) => x % 4 === 0;
    const by6 = (x: number) => x % 6 === 0;
    expectAnswers('prob-basic-7', [prob(numbers, (x) => by4(x) || by6(x)), prob(numbers, (x) => by4(x) !== by6(x))], 12);
  });
  it('prob-basic-8', () => {
    const red = die;
    const blue = die;
    const eventA = ([r, b]: number[]) => r > b;
    const eventB = ([r, b]: number[]) => r + b === 7;
    expectAnswers(
      'prob-basic-8',
      [
        enumerateProbability([red, blue], eventA),
        enumerateProbability([red, blue], (o) => eventA(o) && eventB(o)),
        enumerateProbability([red, blue], (o) => eventA(o) || eventB(o)),
      ],
      12,
    );
  });
});

// =====================================================================
describe('prob-tree-two — urns (every ordered draw) and explicit two-stage trees', () => {
  it('prob-tree-two-1 (with replacement: independent product space)', () => {
    const urn = uniform(balls({ R: 3, W: 2 }));
    expectAnswers('prob-tree-two-1', [enumerateProbability([urn, urn], (o) => o[0] === 'R' && o[1] === 'R')], 12);
  });
  it('prob-tree-two-2 (without replacement)', () => {
    const draws = orderedDraws(balls({ R: 3, W: 2 }), 2);
    expect(draws).toHaveLength(20);
    expect(totalMass(draws)).toBeCloseTo(1, 12);
    expectAnswers('prob-tree-two-2', [prob(draws, (d) => d[0] === 'R' && d[1] === 'R')], 12);
  });
  it('prob-tree-two-3', () => {
    const draws = orderedDraws(balls({ W: 4, K: 6 }), 2);
    expectAnswers('prob-tree-two-3', [prob(draws, (d) => d[0] !== d[1]), prob(draws, (d) => d[1] === 'K')], 12);
  });
  it('prob-tree-two-4 (population of 1000 products)', () => {
    // 700 from machine I (2% defective = 14), 300 from machine II (5% defective = 15).
    type Item = { machineOne: boolean; defective: boolean };
    const items: Item[] = [
      ...Array.from({ length: 700 }, (_, i) => ({ machineOne: true, defective: i < 14 })),
      ...Array.from({ length: 300 }, (_, i) => ({ machineOne: false, defective: i < 15 })),
    ];
    const fraction = (group: Item[], predicate: (item: Item) => boolean) => group.filter(predicate).length / group.length;
    expect(fraction(items, (i) => i.machineOne)).toBeCloseTo(0.7, 12);
    expect(fraction(items.filter((i) => i.machineOne), (i) => i.defective)).toBeCloseTo(0.02, 12);
    expect(fraction(items.filter((i) => !i.machineOne), (i) => i.defective)).toBeCloseTo(0.05, 12);
    const defective = items.filter((i) => i.defective);
    expectAnswers('prob-tree-two-4', [fraction(items, (i) => i.defective), fraction(defective, (i) => i.machineOne)], 12);
  });
  it('prob-tree-two-5 (die, then a labelled ball from the chosen box)', () => {
    const boxI = balls({ R: 2, B: 3 });
    const boxII = balls({ R: 4, B: 1 });
    const paths = tree(2, (h) => (h.length === 0 ? uniform(['1', '2', '3', '4', '5', '6']) : uniform(h[0] === '6' ? boxI : boxII)));
    expect(paths).toHaveLength(6 * 5);
    expect(totalMass(paths)).toBeCloseTo(1, 12);
    const red = prob(paths, (h) => h[1] === 'R');
    const sixAndRed = prob(paths, (h) => h[0] === '6' && h[1] === 'R');
    expectAnswers('prob-tree-two-5', [red, sixAndRed / red], 12);
  });
  it('prob-tree-two-6 (population of 100000)', () => {
    const sick = 2000;
    const sickPositive = 1900; // 95%
    const healthy = 98000;
    const healthyPositive = 9800; // 10%
    expect(sick / (sick + healthy)).toBeCloseTo(0.02, 12);
    expect(sickPositive / sick).toBeCloseTo(0.95, 12);
    expect(healthyPositive / healthy).toBeCloseTo(0.1, 12);
    const positive = sickPositive + healthyPositive;
    expectAnswers('prob-tree-two-6', [positive / (sick + healthy), sickPositive / positive], 12);
  });
  it('prob-tree-two-7 (search over the number of red balls)', () => {
    const bothRed = (r: number) => prob(orderedDraws(balls({ R: r, W: 5 - r }), 2), (d) => d[0] === 'R' && d[1] === 'R');
    const rs = [0, 1, 2, 3, 4, 5].filter((r) => close(bothRed(r), 0.3));
    expect(rs).toHaveLength(1);
    const r = rs[0];
    expectAnswers('prob-tree-two-7', [r, prob(orderedDraws(balls({ R: r, W: 5 - r }), 2), (d) => d[0] !== d[1])], 12);
  });
  it('prob-tree-two-8 (unknown p found numerically on the explicit tree)', () => {
    const shots = (p: number) =>
      tree(2, (h) => {
        if (h.length === 0) return [['H', p], ['M', 1 - p]];
        return h[0] === 'H' ? [['H', 0.8], ['M', 0.2]] : [['H', 0.5], ['M', 0.5]];
      });
    const exactlyOneHit = (p: number) => prob(shots(p), (h) => h.filter((s) => s === 'H').length === 1);
    const roots = findRoots((p) => exactlyOneHit(p) - 0.38, 0, 1);
    expect(roots).toHaveLength(1);
    const p = roots[0];
    const space = shots(p);
    const secondHit = prob(space, (h) => h[1] === 'H');
    expectAnswers('prob-tree-two-8', [p, prob(space, (h) => h[0] === 'H' && h[1] === 'H') / secondHit]);
  });
});

// =====================================================================
describe('prob-tree-three — three-stage trees, urns and stopping experiments', () => {
  it('prob-tree-three-1', () => {
    const shots = repeat(bernoulli(0.7), 3);
    expectAnswers('prob-tree-three-1', [enumerateProbability(shots, (o) => successes(o) === 3), enumerateProbability(shots, (o) => successes(o) === 0)], 12);
  });
  it('prob-tree-three-2', () => {
    const draws = orderedDraws(balls({ R: 4, W: 2 }), 3);
    expect(draws).toHaveLength(6 * 5 * 4);
    expectAnswers('prob-tree-three-2', [prob(draws, (d) => d.every((ball) => ball === 'R'))], 12);
  });
  it('prob-tree-three-3', () => {
    const draws = orderedDraws(balls({ R: 5, W: 3 }), 3);
    const whites = (d: string[]) => d.filter((ball) => ball === 'W').length;
    expectAnswers('prob-tree-three-3', [prob(draws, (d) => whites(d) === 1), prob(draws, (d) => whites(d) >= 1)], 12);
  });
  it('prob-tree-three-4', () => {
    const students = [bernoulli(0.5), bernoulli(0.6), bernoulli(0.8)];
    expectAnswers('prob-tree-three-4', [enumerateProbability(students, (o) => successes(o) === 1), enumerateProbability(students, (o) => successes(o) >= 1)], 12);
  });
  it('prob-tree-three-5 (stops at the first pass)', () => {
    const attempts = tree(3, (h) => {
      if (h.includes('P')) return null;
      return h.length === 0 ? [['P', 0.6], ['F', 0.4]] : [['P', 0.5], ['F', 0.5]];
    });
    expect(totalMass(attempts)).toBeCloseTo(1, 12);
    expect(attempts).toHaveLength(4);
    const passed = prob(attempts, (h) => h.includes('P'));
    const passedSecond = prob(attempts, (h) => h.length === 2 && h[1] === 'P');
    expectAnswers('prob-tree-three-5', [passed, passedSecond / passed], 12);
  });
  it('prob-tree-three-6 (two-state chain, first game won)', () => {
    const games = tree(2, (h) => {
      const last = h.length === 0 ? 'W' : h[h.length - 1];
      return last === 'W' ? [['W', 0.7], ['L', 0.3]] : [['W', 0.4], ['L', 0.6]];
    });
    expect(totalMass(games)).toBeCloseTo(1, 12);
    expectAnswers('prob-tree-three-6', [prob(games, (h) => h[1] === 'W'), prob(games, (h) => h.filter((g) => g === 'W').length === 1)], 12);
  });
  it('prob-tree-three-7 (move a labelled ball, then every ordered pair from box II)', () => {
    const boxI = balls({ R: 3, W: 2 });
    const boxII = balls({ R: 1, W: 3 });
    let different = 0;
    let movedRedAndDifferent = 0;
    let mass = 0;
    for (const moved of boxI) {
      for (const [pair, p] of orderedDraws([...boxII, moved], 2)) {
        const weight = p / boxI.length;
        mass += weight;
        if (pair[0] !== pair[1]) {
          different += weight;
          if (moved === 'R') movedRedAndDifferent += weight;
        }
      }
    }
    expect(mass).toBeCloseTo(1, 12);
    expectAnswers('prob-tree-three-7', [different, movedRedAndDifferent / different], 12);
  });
  it('prob-tree-three-8 (search over n)', () => {
    const urn = (n: number) => balls({ R: 2, W: n - 2 });
    const noRed = (n: number) => prob(orderedDraws(urn(n), 3), (d) => !d.includes('R'));
    const ns: number[] = [];
    for (let n = 3; n <= 25; n += 1) if (close(noRed(n), 2 / 7)) ns.push(n);
    expect(ns).toHaveLength(1);
    const n = ns[0];
    expectAnswers('prob-tree-three-8', [n, prob(orderedDraws(urn(n), 3), (d) => d.filter((ball) => ball === 'R').length === 1)], 12);
  });
});

// =====================================================================
describe('prob-table — two-way tables as concrete populations', () => {
  it('prob-table-1', () => {
    const group = uniquePopulation(100, (g) => close(shareOf(g, AandB), 0.15) && close(shareOf(g, A), 0.4) && close(shareOf(g, B), 0.35));
    expectAnswers('prob-table-1', [share(group, (p) => p.a && !p.b), share(group, neither)], 12);
  });
  it('prob-table-2 (the frequency table itself)', () => {
    // a = girl, b = takes part in sport
    const group = people({ both: 50, aOnly: 50, bOnly: 60, none: 40 });
    expect(group).toHaveLength(200);
    expect(group.filter(B)).toHaveLength(110);
    expect(group.filter(A)).toHaveLength(100);
    expectAnswers('prob-table-2', [share(group, AandB), share(group, B)], 12);
  });
  it('prob-table-3', () => {
    // a = owns a car, b = owns a bicycle
    const group = uniquePopulation(100, (g) => close(shareOf(g, A), 0.6) && close(shareOf(g, AandB), 0.25) && close(shareOf(g, neither), 0.3));
    expectAnswers('prob-table-3', [share(group, B), conditional(group, A, B)], 12);
  });
  it('prob-table-4', () => {
    // a = boy, b = sings in the choir; percentages are within each group
    const group = uniquePopulation(100, (g) => close(shareOf(g, A), 0.4) && close(shareOf(g, AandB) / shareOf(g, A), 0.3) && close(shareOf(g, (p) => !p.a && p.b) / shareOf(g, notA), 0.5));
    expectAnswers('prob-table-4', [share(group, B), conditional(group, A, B)], 12);
  });
  it('prob-table-5 (search over the vaccinated young patients)', () => {
    // 200 patients: 100 over 60 (40% vaccinated = 40), 100 aged 60 or less with v vaccinated; 35% vaccinated overall.
    const candidates: Person[][] = [];
    for (let v = 0; v <= 100; v += 1) {
      const group = people({ both: 40, aOnly: 60, bOnly: v, none: 100 - v });
      if (close(share(group, B), 0.35)) candidates.push(group);
    }
    expect(candidates).toHaveLength(1);
    const group = candidates[0];
    expect(share(group, A)).toBeCloseTo(0.5, 12);
    expect(conditional(group, B, A)).toBeCloseTo(0.4, 12);
    expectAnswers('prob-table-5', [conditional(group, B, notA), conditional(group, A, notB)], 12);
  });
  it('prob-table-6', () => {
    // a = public transport, b = lives in the city
    const group = uniquePopulation(100, (g) => close(shareOf(g, A), 0.4) && close(shareOf(g, B), 0.5) && close(shareOf(g, AandB) / shareOf(g, A), 0.7));
    expectAnswers('prob-table-6', [share(group, neither), conditional(group, A, B)], 12);
  });
  it('prob-table-7 (search over every population of 120 members)', () => {
    // a = woman, b = plays tennis; 25% of the women, 40% of the men, 35% of all members play tennis
    const group = uniquePopulation(
      120,
      (g) =>
        shareOf(g, A) > 0 &&
        shareOf(g, A) < 1 &&
        close(shareOf(g, AandB) / shareOf(g, A), 0.25) &&
        close(shareOf(g, (p) => !p.a && p.b) / shareOf(g, notA), 0.4) &&
        close(shareOf(g, B), 0.35),
    );
    expect(group).toHaveLength(120);
    expectAnswers('prob-table-7', [group.filter(A).length, conditional(group, A, B)], 12);
  });
  it('prob-table-8', () => {
    // a = camp, b = trip
    const group = uniquePopulation(
      100,
      (g) => shareOf(g, A) > 0 && shareOf(g, B) > 0 && close(shareOf(g, AandB) / shareOf(g, A), 0.25) && close(shareOf(g, AandB) / shareOf(g, B), 0.5) && close(shareOf(g, AorB), 0.75),
    );
    expectAnswers('prob-table-8', [share(group, AandB), share(group, A), share(group, B)], 12);
  });
});

// =====================================================================
describe('prob-dependence — independence checked on explicit spaces', () => {
  it('prob-dependence-1', () => {
    const group = uniquePopulation(100, (g) => close(shareOf(g, A), 0.4) && close(shareOf(g, B), 0.5) && close(shareOf(g, AorB), 0.7));
    expect(share(group, AandB)).toBeCloseTo(share(group, A) * share(group, B), 12);
    expectAnswers('prob-dependence-1', [share(group, AandB)], 12);
  });
  it('prob-dependence-2 (independent product space)', () => {
    const space = [bernoulli(0.3), bernoulli(0.6)];
    const both = enumerateProbability(space, ([a, b]) => a && b);
    expect(both).toBeGreaterThan(0); // so they cannot be disjoint
    expectAnswers('prob-dependence-2', [both, enumerateProbability(space, ([a, b]) => a || b)], 12);
  });
  it('prob-dependence-3 (proof — checked on the die)', () => {
    const even = (x: number) => x % 2 === 0;
    const atMost4 = (x: number) => x <= 4;
    const prime = (x: number) => [2, 3, 5].includes(x);
    expect(prob(die, (x) => even(x) && atMost4(x))).toBeCloseTo(prob(die, even) * prob(die, atMost4), 12);
    expect(Math.abs(prob(die, (x) => even(x) && prime(x)) - prob(die, even) * prob(die, prime))).toBeGreaterThan(0.05);
    expect(ex('prob-dependence-3').answers).toBeUndefined();
  });
  it('prob-dependence-4 (population of 100)', () => {
    // a = smoker, b = disease
    const group = uniquePopulation(100, (g) => close(shareOf(g, A), 0.3) && close(shareOf(g, B), 0.2) && close(shareOf(g, AandB), 0.1));
    expect(Math.abs(share(group, AandB) - share(group, A) * share(group, B))).toBeGreaterThan(0.01);
    expectAnswers('prob-dependence-4', [conditional(group, B, A), conditional(group, B, notA)], 12);
  });
  it('prob-dependence-5 (unknown P(B) on the independent product space)', () => {
    const union = (x: number) => enumerateProbability([bernoulli(0.4), bernoulli(x)], ([a, b]) => a || b);
    const roots = findRoots((x) => union(x) - 0.64, 0, 1);
    expect(roots).toHaveLength(1);
    const x = roots[0];
    expectAnswers('prob-dependence-5', [x, enumerateProbability([bernoulli(0.4), bernoulli(x)], ([a, b]) => a !== b)]);
  });
  it('prob-dependence-6', () => {
    const alarms = [bernoulli(0.9), bernoulli(0.8)];
    expectAnswers('prob-dependence-6', [enumerateProbability(alarms, ([a, b]) => a || b), enumerateProbability(alarms, ([a, b]) => a !== b)], 12);
  });
  it('prob-dependence-7 (every ordered draw)', () => {
    const urnBalls = balls({ R: 3, W: 2 });
    const draws = orderedDraws(urnBalls, 2);
    const pA = prob(draws, (d) => d[0] === 'R');
    const pB = prob(draws, (d) => d[1] === 'R');
    const pAB = prob(draws, (d) => d[0] === 'R' && d[1] === 'R');
    expect(Math.abs(pAB - pA * pB)).toBeGreaterThan(0.05);
    const urn = uniform(urnBalls);
    const withReplacement = enumerateProbability([urn, urn], (o) => o[0] === 'R' && o[1] === 'R');
    expect(withReplacement).toBeCloseTo(enumerateProbability([urn, urn], (o) => o[0] === 'R') * enumerateProbability([urn, urn], (o) => o[1] === 'R'), 12);
    expectAnswers('prob-dependence-7', [pB, pAB], 12);
  });
  it('prob-dependence-8 (parameter found numerically on the explicit tree)', () => {
    const space = (p: number) =>
      tree(2, (h) => {
        if (h.length === 0) return [['A', 0.5], ['a', 0.5]];
        return h[0] === 'A' ? [['B', 0.6], ['b', 0.4]] : [['B', p], ['b', 1 - p]];
      });
    const pA = (p: number) => prob(space(p), (h) => h[0] === 'A');
    const pB = (p: number) => prob(space(p), (h) => h[1] === 'B');
    const pAB = (p: number) => prob(space(p), (h) => h[0] === 'A' && h[1] === 'B');
    const independent = findRoots((p) => pAB(p) - pA(p) * pB(p), 0, 1);
    expect(independent).toHaveLength(1);
    const conditionalRoot = findRoots((p) => pAB(p) / pB(p) - 0.75, 0, 1);
    expect(conditionalRoot).toHaveLength(1);
    const q = conditionalRoot[0];
    expect(Math.abs(pAB(q) - pA(q) * pB(q))).toBeGreaterThan(0.05);
    expectAnswers('prob-dependence-8', [independent[0], q]);
  });
});

// =====================================================================
describe('prob-binomial — repeated trials enumerated outcome by outcome', () => {
  it('prob-binomial-1', () => {
    const heads = (o: string[]) => o.filter((side) => side === 'H').length;
    expectAnswers('prob-binomial-1', [enumerateProbability(repeat(coin, 4), (o) => heads(o) === 3)], 12);
  });
  it('prob-binomial-2 (all 6^5 sequences of the die)', () => {
    const sixes = (o: number[]) => o.filter((x) => x === 6).length;
    expectAnswers('prob-binomial-2', [enumerateProbability(repeat(die, 5), (o) => sixes(o) === 2)], 12);
  });
  it('prob-binomial-3', () => {
    const shots = repeat(bernoulli(0.7), 6);
    expectAnswers('prob-binomial-3', [enumerateProbability(shots, (o) => successes(o) >= 5), enumerateProbability(shots, (o) => successes(o) <= 1)], 12);
  });
  it('prob-binomial-4', () => {
    const bulbs = repeat(bernoulli(0.05), 10);
    expectAnswers('prob-binomial-4', [enumerateProbability(bulbs, (o) => successes(o) >= 1), enumerateProbability(bulbs, (o) => successes(o) === 1)], 12);
  });
  it('prob-binomial-5 (all 4^5 answer sheets; option 0 is the correct one)', () => {
    const sheets = repeat(uniform([0, 1, 2, 3]), 5);
    const correct = (o: number[]) => o.map((answer) => answer === 0);
    expectAnswers(
      'prob-binomial-5',
      [
        enumerateProbability(sheets, (o) => {
          const c = correct(o);
          return !c[0] && !c[1] && c[2];
        }),
        enumerateProbability(sheets, (o) => {
          const c = correct(o);
          return c.filter(Boolean).length === 2 && c[4];
        }),
      ],
      12,
    );
  });
  it('prob-binomial-6', () => {
    const seeds = repeat(bernoulli(0.4), 5);
    const two = enumerateProbability(seeds, (o) => successes(o) === 2);
    const atLeastOne = enumerateProbability(seeds, (o) => successes(o) >= 1);
    expectAnswers('prob-binomial-6', [two / atLeastOne], 12);
  });
  it('prob-binomial-7 (smallest n by increasing n)', () => {
    const atLeastOne = (n: number) => enumerateProbability(repeat(bernoulli(0.3), n), (o) => successes(o) >= 1);
    let n = 1;
    while (atLeastOne(n) <= 0.95) n += 1;
    expect(atLeastOne(n - 1)).toBeLessThanOrEqual(0.95);
    expectAnswers('prob-binomial-7', [n, enumerateProbability(repeat(bernoulli(0.3), n), (o) => successes(o) === 2)], 12);
  });
  it('prob-binomial-8 (unknown p, then the mode)', () => {
    const atLeastOneOfThree = (p: number) => enumerateProbability(repeat(bernoulli(p), 3), (o) => successes(o) >= 1);
    const roots = findRoots((p) => atLeastOneOfThree(p) - 0.784, 0, 1);
    expect(roots).toHaveLength(1);
    const p = roots[0];
    const pmf = [0, 1, 2, 3, 4, 5].map((k) => enumerateProbability(repeat(bernoulli(p), 5), (o) => successes(o) === k));
    const mode = pmf.indexOf(Math.max(...pmf));
    expectAnswers('prob-binomial-8', [p, mode, pmf[mode]]);
  });
});

// =====================================================================
describe('prob-review — mixed bagrut-style questions', () => {
  it('prob-review-1', () => {
    const paths = tree(2, (h) => (h.length === 0 ? [['A', 0.6], ['B', 0.4]] : h[0] === 'A' ? [['D', 0.03], ['ok', 0.97]] : [['D', 0.08], ['ok', 0.92]]));
    const defective = prob(paths, (h) => h[1] === 'D');
    const fromBAndDefective = prob(paths, (h) => h[0] === 'B' && h[1] === 'D');
    expectAnswers('prob-review-1', [defective, fromBAndDefective / defective, enumerateProbability(repeat(bernoulli(defective), 4), (o) => successes(o) === 1)], 12);
  });
  it('prob-review-2 (every ordered draw)', () => {
    const draws = orderedDraws(balls({ R: 4, B: 6 }), 2);
    const secondBlue = prob(draws, (d) => d[1] === 'B');
    const firstRedSecondBlue = prob(draws, (d) => d[0] === 'R' && d[1] === 'B');
    const firstRed = prob(draws, (d) => d[0] === 'R');
    expect(Math.abs(firstRedSecondBlue - firstRed * secondBlue)).toBeGreaterThan(0.02);
    expectAnswers('prob-review-2', [secondBlue, firstRedSecondBlue / secondBlue], 12);
  });
  it('prob-review-3 (population of 100, then 5 independent picks)', () => {
    // a = young, b = rides a bicycle: 40 young (25 riders), 60 not young (15% of them = 9 riders)
    const group = uniquePopulation(100, (g) => close(shareOf(g, A), 0.4) && close(shareOf(g, AandB), 0.25) && close(shareOf(g, (p) => !p.a && p.b) / shareOf(g, notA), 0.15));
    const riders = share(group, B);
    const picks = repeat(bernoulli(riders), 5);
    expectAnswers('prob-review-3', [riders, conditional(group, A, B), enumerateProbability(picks, (o) => successes(o) >= 2)], 12);
  });
  it('prob-review-4 (stopping tree, then 5 players)', () => {
    const hitChance = [0.5, 0.4, 0.3];
    const throws = tree(3, (h) => (h.includes('H') ? null : [['H', hitChance[h.length]], ['M', 1 - hitChance[h.length]]]));
    expect(totalMass(throws)).toBeCloseTo(1, 12);
    const hit = prob(throws, (h) => h.includes('H'));
    const hitOnSecond = prob(throws, (h) => h.length === 2 && h[1] === 'H');
    expectAnswers('prob-review-4', [hit, hitOnSecond / hit, enumerateProbability(repeat(bernoulli(hit), 5), (o) => successes(o) === 4)], 10);
  });
  it('prob-review-5 (unknown p, Bayes, 5 school days)', () => {
    const day = (p: number) => tree(2, (h) => (h.length === 0 ? [['bus', p], ['walk', 1 - p]] : h[0] === 'bus' ? [['late', 0.1], ['on time', 0.9]] : [['late', 0.25], ['on time', 0.75]]));
    const late = (p: number) => prob(day(p), (h) => h[1] === 'late');
    const roots = findRoots((p) => late(p) - 0.16, 0, 1);
    expect(roots).toHaveLength(1);
    const p = roots[0];
    const busAndLate = prob(day(p), (h) => h[0] === 'bus' && h[1] === 'late');
    const week = repeat(bernoulli(late(p)), 5);
    expectAnswers('prob-review-5', [p, busAndLate / late(p), enumerateProbability(week, (o) => successes(o) <= 1)]);
  });
  it('prob-review-6 (quadratic for p, rejected root, then 4 riddles)', () => {
    const pair = (p: number) => [bernoulli(p), bernoulli(p + 0.2)];
    const atLeastOne = (p: number) => enumerateProbability(pair(p), ([n, g]) => n || g);
    // p + 0.2 must also be a probability, so p ∈ [0, 0.8]
    const roots = findRoots((p) => atLeastOne(p) - 0.76, 0, 0.8);
    expect(roots).toHaveLength(1);
    const p = roots[0];
    expectAnswers('prob-review-6', [p, enumerateProbability(pair(p), ([n, g]) => n !== g), enumerateProbability(repeat(bernoulli(p), 4), (o) => successes(o) >= 3)]);
  });
});

// =====================================================================
describe('prob-advanced — harder combinations', () => {
  it('prob-advanced-1 (coin chooses the box, every ordered pair from it)', () => {
    const boxI = balls({ W: 3, K: 1 });
    const boxII = balls({ W: 2, K: 3 });
    let whiteWhite = 0;
    let same = 0;
    let boxIAndSame = 0;
    for (const [side, pSide] of coin) {
      for (const [pair, p] of orderedDraws(side === 'H' ? boxI : boxII, 2)) {
        const weight = pSide * p;
        if (pair[0] === 'W' && pair[1] === 'W') whiteWhite += weight;
        if (pair[0] === pair[1]) {
          same += weight;
          if (side === 'H') boxIAndSame += weight;
        }
      }
    }
    expectAnswers('prob-advanced-1', [whiteWhite, boxIAndSame / same, enumerateProbability(repeat(bernoulli(whiteWhite), 4), (o) => successes(o) >= 1)], 12);
  });
  it('prob-advanced-2 (population of 1000 students, then the smallest n)', () => {
    // a = 12th grade (300 students, 60% licensed = 180), others 700 (20% licensed = 140); b = licensed
    const group = people({ both: 180, aOnly: 120, bOnly: 140, none: 560 });
    expect(share(group, A)).toBeCloseTo(0.3, 12);
    expect(conditional(group, B, A)).toBeCloseTo(0.6, 12);
    expect(conditional(group, B, notA)).toBeCloseTo(0.2, 12);
    const licensed = share(group, B);
    const atLeastOne = (n: number) => enumerateProbability(repeat(bernoulli(licensed), n), (o) => successes(o) >= 1);
    let n = 1;
    while (atLeastOne(n) < 0.9) n += 1;
    expectAnswers('prob-advanced-2', [licensed, conditional(group, A, notB), n], 12);
  });
  it('prob-advanced-3 (search over n, every ordered draw)', () => {
    const urn = (n: number) => balls({ R: 3, W: n - 3 });
    const candidates: number[] = [];
    for (let n = 3; n <= 30; n += 1) if (close(prob(orderedDraws(urn(n), 2), (d) => d[0] !== d[1]), 0.5)) candidates.push(n);
    expect(candidates).toEqual([4, 9]);
    const n = candidates.filter((size) => size - 3 > 3)[0];
    const three = orderedDraws(urn(n), 3);
    const firstTwoDifferent = prob(three, (d) => d[0] !== d[1]);
    const thirdRedAndFirstTwoDifferent = prob(three, (d) => d[0] !== d[1] && d[2] === 'R');
    expectAnswers('prob-advanced-3', [n, prob(orderedDraws(urn(n), 2), (d) => d[0] === 'W' && d[1] === 'W'), thirdRedAndFirstTwoDifferent / firstTwoDifferent], 12);
  });
  it('prob-advanced-4 (search over n, then all 6^5 die sequences)', () => {
    const six = bernoulli(1 / 6);
    const matches: number[] = [];
    for (let n = 1; n <= 15; n += 1) {
      const rolls = repeat(six, n);
      if (close(enumerateProbability(rolls, (o) => successes(o) === 1), enumerateProbability(rolls, (o) => successes(o) === 0))) matches.push(n);
    }
    expect(matches).toHaveLength(1);
    const n = matches[0];
    const sixes = (o: number[]) => o.filter((x) => x === 6).length;
    const rolls = repeat(die, n);
    const atLeastOne = enumerateProbability(rolls, (o) => sixes(o) >= 1);
    expectAnswers('prob-advanced-4', [n, enumerateProbability(rolls, (o) => sixes(o) >= 2), enumerateProbability(rolls, (o) => sixes(o) === 2) / atLeastOne], 12);
  });
  it('prob-advanced-5', () => {
    const arrows = repeat(bernoulli(0.6), 6);
    const pmf = [0, 1, 2, 3, 4, 5, 6].map((k) => enumerateProbability(arrows, (o) => successes(o) === k));
    const mode = pmf.indexOf(Math.max(...pmf));
    const firstHitAndFour = enumerateProbability(arrows, (o) => o[0] && successes(o) === 4);
    expectAnswers('prob-advanced-5', [enumerateProbability(arrows, (o) => successes(o) >= 4), mode, firstHitAndFour / pmf[4]], 12);
  });
  it('prob-advanced-6 (all 6^4 sequences of four tosses)', () => {
    const firstSix = (o: number[]) => o.indexOf(6); // -1 = no six in four tosses (a draw)
    const tosses = repeat(die, 4);
    const amitWins = enumerateProbability(tosses, (o) => firstSix(o) === 0 || firstSix(o) === 2);
    const benWins = enumerateProbability(tosses, (o) => firstSix(o) === 1 || firstSix(o) === 3);
    const draw = enumerateProbability(tosses, (o) => firstSix(o) === -1);
    expect(amitWins + benWins + draw).toBeCloseTo(1, 12);
    const endsAtFirst = enumerateProbability(tosses, (o) => firstSix(o) === 0);
    expectAnswers('prob-advanced-6', [amitWins, amitWins / (amitWins + benWins), endsAtFirst / amitWins], 12);
  });
});
