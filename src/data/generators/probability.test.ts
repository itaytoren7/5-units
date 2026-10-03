/**
 * Independent verification of the probability generators: for ~200 seeds every answer is recomputed
 * from `exercise.data` by exhaustive enumeration — of all 2ⁿ outcome sequences (enumerateProbability)
 * for the binomial questions, of all ordered pairs of labelled balls for the urn, of a product space
 * with auxiliary independent coins for the two-stage tree, of a 100-outcome equally likely model for
 * the laws of probability, and of the individuals of the two-way table.
 */
import { describe, expect, it } from 'vitest';
import { enumerateProbability } from '../problems/verify';
import { probabilityGenerators } from './probability';
import { createRng } from './rng';
import type { GeneratedExercise } from './types';

const SEEDS = 200;

function forEachExercise(id: string, check: (exercise: GeneratedExercise, seed: number) => void) {
  const generator = probabilityGenerators.find((item) => item.id === id);
  expect(generator, `missing generator ${id}`).toBeDefined();
  for (let seed = 1; seed <= SEEDS; seed += 1) check(generator!.generate(createRng(seed)), seed);
}

/** n independent success/failure trials: P(number of successes satisfies the predicate). */
function trials(n: number, p: number, predicate: (successes: number) => boolean): number {
  const space: Array<[number, number]> = [
    [1, p],
    [0, 1 - p],
  ];
  return enumerateProbability(
    Array.from({ length: n }, () => space),
    (outcome) => predicate(outcome.reduce((acc, value) => acc + value, 0)),
  );
}

function expectProbabilityAnswers(exercise: GeneratedExercise) {
  for (const answer of exercise.answers) {
    expect(answer.value).toBeGreaterThanOrEqual(0);
    expect(answer.value).toBeLessThanOrEqual(1);
    expect(answer.tolerance).toBe(0.0006);
  }
}

describe('probability generators – answers recomputed by enumeration', () => {
  it('gen-prob-binomial-exact', () => {
    forEachExercise('gen-prob-binomial-exact', (exercise) => {
      const { n, k, p } = exercise.data;
      expect(p).toBeGreaterThan(0);
      expect(p).toBeLessThan(1);
      expect(k).toBeGreaterThanOrEqual(1);
      expect(k).toBeLessThan(n);
      expectProbabilityAnswers(exercise);
      const value = trials(n, p, (successes) => successes === k);
      expect(value).toBeGreaterThan(0.01); // never a "0.0000"-type answer
      expect(exercise.answers[0].value).toBeCloseTo(value, 10);
    });
  });

  it('gen-prob-at-least-one', () => {
    forEachExercise('gen-prob-at-least-one', (exercise) => {
      const { variant, n, p } = exercise.data;
      expectProbabilityAnswers(exercise);
      const [first, second] = exercise.answers.map((answer) => answer.value);
      if (variant === 0) {
        expect(first).toBeCloseTo(trials(n, p, (successes) => successes === 0), 10);
        expect(second).toBeCloseTo(trials(n, p, (successes) => successes >= 1), 10);
      } else {
        expect(first).toBeCloseTo(trials(n, p, (successes) => successes >= 1), 10);
        expect(second).toBeCloseTo(trials(n, p, (successes) => successes >= 2), 10);
      }
    });
  });

  it('gen-prob-urn-two-draws', () => {
    forEachExercise('gen-prob-urn-two-draws', (exercise) => {
      const { r, w } = exercise.data;
      expect(exercise.statement).toContain(`$${r}$`);
      expectProbabilityAnswers(exercise);
      // label every ball and list all ordered pairs of two different balls (draws without replacement)
      const balls = [...Array.from({ length: r }, () => 'first'), ...Array.from({ length: w }, () => 'second')];
      let all = 0;
      let both = 0;
      let different = 0;
      let secondIsFirstColor = 0;
      balls.forEach((x, i) =>
        balls.forEach((y, j) => {
          if (i === j) return;
          all += 1;
          if (x === 'first' && y === 'first') both += 1;
          if (x !== y) different += 1;
          if (y === 'first') secondIsFirstColor += 1;
        }),
      );
      const [ansBoth, ansDifferent, ansSecond] = exercise.answers.map((answer) => answer.value);
      expect(ansBoth).toBeCloseTo(both / all, 10);
      expect(ansDifferent).toBeCloseTo(different / all, 10);
      expect(ansSecond).toBeCloseTo(secondIsFirstColor / all, 10);
    });
  });

  it('gen-prob-bayes-tree', () => {
    forEachExercise('gen-prob-bayes-tree', (exercise) => {
      const { a, d1, d2 } = exercise.data;
      for (const percent of [a, d1, d2]) {
        expect(percent).toBeGreaterThan(0);
        expect(percent).toBeLessThan(100);
        expect(exercise.statement).toContain(`$${percent}\\%$`);
      }
      expectProbabilityAnswers(exercise);
      // product space: the group, and an independent "property" coin for each group;
      // the property of the chosen item is the coin of its own group
      const spaces: Array<Array<[number, number]>> = [
        [
          [1, a / 100],
          [0, 1 - a / 100],
        ],
        [
          [1, d1 / 100],
          [0, 1 - d1 / 100],
        ],
        [
          [1, d2 / 100],
          [0, 1 - d2 / 100],
        ],
      ];
      const hasProperty = ([group, coinA, coinB]: number[]) => (group === 1 ? coinA === 1 : coinB === 1);
      const pProperty = enumerateProbability(spaces, hasProperty);
      const pBoth = enumerateProbability(spaces, (outcome) => outcome[0] === 1 && hasProperty(outcome));
      expect(exercise.answers[0].value).toBeCloseTo(pProperty, 10);
      expect(exercise.answers[1].value).toBeCloseTo(pBoth / pProperty, 10);
      // the dependence remark of the solution is true
      expect(Math.abs(pBoth / pProperty - a / 100)).toBeGreaterThan(1e-6);
    });
  });

  it('gen-prob-union-complement', () => {
    forEachExercise('gen-prob-union-complement', (exercise) => {
      const { variant, pA, pB, pUnion } = exercise.data;
      expect(exercise.statement).toContain(`P(A)=${pA / 100}`);
      expect(exercise.statement).toContain(`P(B)=${pB / 100}`);
      if (variant === 0) expect(exercise.statement).toContain(String.raw`P(A\cap B)=${exercise.data.pAB / 100}`);
      else expect(exercise.statement).toContain(String.raw`P(A\cup B)=${pUnion / 100}`);
      expectProbabilityAnswers(exercise);
      // 100 equally likely outcomes; A = [0, pA), B overlaps A in `overlap` outcomes
      const model = (overlap: number) => {
        const inA = (x: number) => x < pA;
        const inB = (x: number) => x >= pA - overlap && x < pA - overlap + pB;
        const count = (predicate: (x: number) => boolean) => Array.from({ length: 100 }, (_, x) => x).filter(predicate).length / 100;
        return {
          union: count((x) => inA(x) || inB(x)),
          both: count((x) => inA(x) && inB(x)),
          neither: count((x) => !inA(x) && !inB(x)),
          onlyA: count((x) => inA(x) && !inB(x)),
          onlyB: count((x) => !inA(x) && inB(x)),
        };
      };
      // the overlap is not read from the answers: it is the one that reproduces the givens
      const overlaps = Array.from({ length: Math.min(pA, pB) + 1 }, (_, s) => s).filter((s) =>
        variant === 0 ? s === exercise.data.pAB : Math.abs(model(s).union - pUnion / 100) < 1e-12,
      );
      expect(overlaps).toHaveLength(1);
      const result = model(overlaps[0]);
      expect(pA - overlaps[0] + pB).toBeLessThanOrEqual(100); // the givens are consistent
      const answers = exercise.answers.map((answer) => answer.value);
      if (variant === 0) {
        expect(answers[0]).toBeCloseTo(result.union, 10);
        expect(answers[1]).toBeCloseTo(result.neither, 10);
        expect(answers[2]).toBeCloseTo(result.onlyA, 10);
      } else {
        expect(answers[0]).toBeCloseTo(result.both, 10);
        expect(answers[1]).toBeCloseTo(result.onlyB, 10);
        expect(answers[2]).toBeCloseTo(result.neither, 10);
      }
    });
  });

  it('gen-prob-table-conditional', () => {
    forEachExercise('gen-prob-table-conditional', (exercise) => {
      const { n11, n12, n21, n22 } = exercise.data;
      for (const count of [n11, n12, n21, n22]) expect(exercise.statement).toContain(`& ${count}`);
      expectProbabilityAnswers(exercise);
      // one record per counted individual
      const people = [
        ...Array.from({ length: n11 }, () => ({ a: true, b: true })),
        ...Array.from({ length: n12 }, () => ({ a: true, b: false })),
        ...Array.from({ length: n21 }, () => ({ a: false, b: true })),
        ...Array.from({ length: n22 }, () => ({ a: false, b: false })),
      ];
      const share = (pool: typeof people, predicate: (person: (typeof people)[number]) => boolean) => pool.filter(predicate).length / pool.length;
      const [pA, pAgivenB, pBgivenNotA] = exercise.answers.map((answer) => answer.value);
      expect(pA).toBeCloseTo(share(people, (person) => person.a), 10);
      expect(pAgivenB).toBeCloseTo(
        share(
          people.filter((person) => person.b),
          (person) => person.a,
        ),
        10,
      );
      expect(pBgivenNotA).toBeCloseTo(
        share(
          people.filter((person) => !person.a),
          (person) => person.b,
        ),
        10,
      );
    });
  });
});
