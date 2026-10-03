/**
 * Independent verification of the geometric-sequence generators: for ~200 seeds every answer is
 * recomputed from `exercise.data` by generating the sequence term by term (multiplying by q, or
 * dividing by q backwards), by summing terms one at a time, and by numeric root finding for q —
 * never by the closed forms a₁qⁿ⁻¹, a₁(qⁿ−1)/(q−1) or a₁/(1−q).
 */
import { describe, expect, it } from 'vitest';
import { findRoots } from '../problems/verify';
import { createRng } from './rng';
import { sequencesGenerators } from './sequences';
import type { GeneratedExercise } from './types';

const SEEDS = 200;

function forEachExercise(id: string, check: (exercise: GeneratedExercise, seed: number) => void) {
  const generator = sequencesGenerators.find((item) => item.id === id);
  expect(generator, `missing generator ${id}`).toBeDefined();
  for (let seed = 1; seed <= SEEDS; seed += 1) check(generator!.generate(createRng(seed)), seed);
}

/** The first `count` terms, each obtained from the previous one by multiplying by q = qn/qd. */
function terms(first: number, qn: number, qd: number, count: number): number[] {
  const list = [first];
  while (list.length < count) list.push((list[list.length - 1] * qn) / qd);
  return list;
}

const sum = (values: number[]) => values.reduce((acc, value) => acc + value, 0);

describe('sequence generators – answers recomputed term by term', () => {
  it('gen-seq-geometric-term', () => {
    forEachExercise('gen-seq-geometric-term', (exercise) => {
      const { variant, a1, qn, qd, n } = exercise.data;
      expect(qn * qd).not.toBe(0);
      const sequence = terms(a1, qn, qd, n);
      // bagrut-like numbers: every term up to a_n is an integer
      for (const value of sequence) expect(Number.isInteger(value)).toBe(true);
      if (variant === 1) for (const value of sequence.slice(0, 3)) expect(exercise.statement).toContain(String(value));
      else expect(exercise.statement).toContain(`a_1=${a1}`);
      expect(exercise.answers[0].value).toBeCloseTo(sequence[n - 1], 8);
    });
  });

  it('gen-seq-two-terms', () => {
    forEachExercise('gen-seq-two-terms', (exercise) => {
      const { m, k, am, ak, condition } = exercise.data;
      expect(k).toBeGreaterThan(m);
      expect(exercise.statement).toContain(`a_{${m}}=${am}`);
      expect(exercise.statement).toContain(`a_{${k}}=${ak}`);
      const gap = k - m;
      // every real q with a_m·q^(k−m) = a_k, then the conditions stated in the exercise
      const candidates = findRoots((q) => am * q ** gap - ak, -10.0013, 9.9987, 20000)
        .map((q) => {
          const backwards = [am];
          while (backwards.length < m) backwards.push(backwards[backwards.length - 1] / q);
          const first = backwards[backwards.length - 1];
          return { q, first, sequence: terms(first, q, 1, k) };
        })
        .filter(({ q, sequence }) => {
          if (condition === 1) return sequence.every((value) => value > 0);
          if (condition === 2) return sequence.every((value) => value < 0);
          if (condition === 3) return q < 0;
          return true;
        });
      expect(candidates).toHaveLength(1);
      const [{ q, first, sequence }] = candidates;
      expect(sequence[m - 1]).toBeCloseTo(am, 8);
      expect(sequence[k - 1]).toBeCloseTo(ak, 8);
      expect(exercise.answers[0].value).toBeCloseTo(q, 8);
      expect(exercise.answers[1].value).toBeCloseTo(first, 8);
    });
  });

  it('gen-seq-geometric-sum', () => {
    forEachExercise('gen-seq-geometric-sum', (exercise) => {
      const { variant, a1, qn, qd, n } = exercise.data;
      const sequence = terms(a1, qn, qd, 12);
      for (const value of sequence.slice(0, n)) expect(Number.isInteger(value)).toBe(true);
      if (variant === 2) {
        // the given sum is reached by adding terms one at a time after exactly n terms
        const given = exercise.data.sum;
        expect(exercise.statement).toContain(`$${given}$`);
        let partial = 0;
        let count = 0;
        while (Math.abs(partial - given) > 1e-9 && count < 12) partial += sequence[count++];
        expect(partial).toBeCloseTo(given, 9);
        expect(exercise.answers[0].value).toBe(count);
      } else {
        expect(exercise.answers[0].value).toBeCloseTo(sum(sequence.slice(0, n)), 8);
      }
    });
  });

  it('gen-seq-infinite-sum', () => {
    forEachExercise('gen-seq-infinite-sum', (exercise) => {
      const { variant, a1, qn, qd } = exercise.data;
      expect(Math.abs(qn / qd)).toBeLessThan(1); // the series converges
      const partialSum = (q: number) => sum(terms(a1, q, 1, 4000));
      if (variant === 2) {
        const q = exercise.answers[0].value;
        expect(Math.abs(q)).toBeLessThan(1);
        expect(partialSum(q)).toBeCloseTo(exercise.data.sum, 8);
        return;
      }
      if (variant === 1) {
        const q = exercise.answers[0].value;
        expect(terms(a1, q, 1, 2)[1]).toBeCloseTo(exercise.data.a2, 9); // reproduces the given second term
        expect(exercise.answers[1].value).toBeCloseTo(partialSum(q), 8);
        return;
      }
      expect(exercise.answers[0].value).toBeCloseTo(partialSum(qn / qd), 8);
    });
  });

  it('gen-seq-recursion', () => {
    forEachExercise('gen-seq-recursion', (exercise) => {
      const { variant, a1, qn, qd, k } = exercise.data;
      if (variant === 1) {
        // a_n = c·(qn/qd)^n evaluated directly; the ratio of consecutive terms is constant
        const { c } = exercise.data;
        const direct = [1, 2, 3, 4, 5, 6].map((n) => c * (qn / qd) ** n);
        const [ansA1, ansQ] = exercise.answers.map((answer) => answer.value);
        expect(ansA1).toBeCloseTo(direct[0], 9);
        for (let i = 1; i < direct.length; i += 1) expect(direct[i] / direct[i - 1]).toBeCloseTo(ansQ, 9);
        return;
      }
      if (variant === 2) {
        const { am, m } = exercise.data;
        expect(exercise.statement).toContain(`a_{${m}}=${am}`);
        const [ansA1, ansLater] = exercise.answers.map((answer) => answer.value);
        // run the recursion forward from the claimed a₁
        const forward = terms(ansA1, qn, qd, m + 2);
        expect(forward[m - 1]).toBeCloseTo(am, 9);
        expect(ansLater).toBeCloseTo(forward[m + 1], 8);
        return;
      }
      expect(exercise.statement).toContain(`a_1=${a1}`);
      expect(exercise.answers[0].value).toBeCloseTo(terms(a1, qn, qd, k)[k - 1], 8);
    });
  });
});
