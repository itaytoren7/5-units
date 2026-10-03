/**
 * Independent verification of the word-problem generators: for ~200 seeds the motion is simulated
 * with explicit position functions and the meeting / catching-up moments are found by bisection, the
 * average speed comes from the simulated total time, and the percentage changes are applied one step
 * at a time (price += price·p/100); the "return to the original price" percent is found by bisection.
 */
import { describe, expect, it } from 'vitest';
import { bisect } from '../problems/verify';
import { createRng } from './rng';
import type { GeneratedExercise } from './types';
import { wordProblemsGenerators } from './word-problems';

const SEEDS = 200;

function forEachExercise(id: string, check: (exercise: GeneratedExercise, seed: number) => void) {
  const generator = wordProblemsGenerators.find((item) => item.id === id);
  expect(generator, `missing generator ${id}`).toBeDefined();
  for (let seed = 1; seed <= SEEDS; seed += 1) check(generator!.generate(createRng(seed)), seed);
}

describe('word-problem generators – answers recomputed by simulation', () => {
  it('gen-word-meeting', () => {
    forEachExercise('gen-word-meeting', (exercise) => {
      const { distance, v1, v2, delay } = exercise.data;
      expect(exercise.statement).toContain(`$${distance}$`);
      expect(exercise.statement).toContain(`$${v1}$`);
      expect(exercise.statement).toContain(`$${v2}$`);
      // positions measured from city A, time from the car's departure
      const car = (t: number) => v1 * t;
      const truck = (t: number) => distance - v2 * Math.max(0, t - delay);
      const meet = bisect((t) => truck(t) - car(t), 0, distance / v1);
      expect(meet).toBeGreaterThan(delay); // the truck is already on the road when they meet
      expect(exercise.answers[0].value).toBeCloseTo(meet, 8);
      expect(exercise.answers[1].value).toBeCloseTo(car(meet), 8);
    });
  });

  it('gen-word-average-speed', () => {
    forEachExercise('gen-word-average-speed', (exercise) => {
      const { d1, v1, d2, v2 } = exercise.data;
      expect(v1).not.toBe(v2);
      // the moment the first leg ends, then the distance travelled as a function of time
      const switchTime = bisect((t) => v1 * t - d1, 0, 100);
      const travelled = (t: number) => (t <= switchTime ? v1 * t : d1 + v2 * (t - switchTime));
      const totalTime = bisect((t) => travelled(t) - (d1 + d2), 0, 100);
      expect(exercise.answers[0].value).toBeCloseTo(totalTime, 8);
      expect(exercise.answers[1].value).toBeCloseTo((d1 + d2) / totalTime, 8);
    });
  });

  it('gen-word-overtake', () => {
    forEachExercise('gen-word-overtake', (exercise) => {
      const { variant, v1, delay, t } = exercise.data;
      expect(exercise.statement).toContain(`$${v1}$`);
      const [first, distance] = exercise.answers.map((answer) => answer.value);
      // in variant 0 the fast speed is given; in variant 1 it is the answer, and the catch-up time is given
      const v2 = variant === 0 ? exercise.data.v2 : first;
      expect(v2).toBeGreaterThan(v1);
      if (variant === 0) expect(exercise.statement).toContain(`$${v2}$`);
      const slow = (time: number) => v1 * time;
      const fast = (time: number) => v2 * Math.max(0, time - delay);
      const caught = bisect((time) => fast(time) - slow(time), delay + 1e-9, 100);
      if (variant === 0) expect(first).toBeCloseTo(caught - delay, 8);
      else expect(caught - delay).toBeCloseTo(t, 8);
      expect(distance).toBeCloseTo(fast(caught), 8);
    });
  });

  it('gen-word-percent-changes', () => {
    forEachExercise('gen-word-percent-changes', (exercise) => {
      const { variant, start, p1, p2, years } = exercise.data;
      expect(exercise.statement).toContain(`$${start}$`);
      const [first, second] = exercise.answers.map((answer) => answer.value);
      if (variant === 2) {
        const raised = start + (start * p1) / 100;
        const back = bisect((x) => raised - (raised * x) / 100 - start, 0, 100);
        expect(first).toBeCloseTo(raised, 8);
        expect(second).toBeCloseTo(back, 8);
        return;
      }
      let price = start;
      const steps = variant === 1 ? Array.from({ length: years }, () => p1) : [p1, p2];
      for (const p of steps) price += (price * p) / 100;
      expect(price).toBeGreaterThan(0);
      expect(first).toBeCloseTo(price, 8);
      expect(second).toBeCloseTo(((price - start) / start) * 100, 8);
    });
  });
});
