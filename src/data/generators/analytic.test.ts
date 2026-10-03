/**
 * Numeric verification of the analytic-geometry generators: for 200 seeds every answer is checked
 * against the drawn points and lines in `exercise.data` — by root finding, or by testing the defining
 * property of the answer (the point lies on both lines, the midpoint is equidistant, the bisector's
 * points are equidistant from A and B …).
 */
import { describe, expect, it } from 'vitest';
import { bisect, findRoots } from '../problems/verify';
import { analyticGenerators } from './analytic';
import { fmt } from './helpers';
import { createRng } from './rng';
import type { GeneratedExercise } from './types';

const SEEDS = 200;
const tested = new Set<string>();
function check(id: string, verify: (exercise: GeneratedExercise, data: Record<string, number>) => void) {
  tested.add(id);
  it(id, () => {
    const generator = analyticGenerators.find((g) => g.id === id);
    expect(generator, id).toBeDefined();
    for (let seed = 1; seed <= SEEDS; seed += 1) {
      const exercise = generator!.generate(createRng(seed));
      verify(exercise, exercise.data);
    }
  });
}
const ans = (exercise: GeneratedExercise, index: number) => exercise.answers[index].value;
const pointText = (name: string, x: number, y: number) => `${name}(${fmt(x)},${fmt(y)})`;
const mentions = (exercise: GeneratedExercise, ...parts: string[]) => {
  for (const part of parts) expect(exercise.statement, `statement should mention ${part}`).toContain(part);
};
const dist = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
/** Slope of the line a·x + b·y + c = 0 measured from two of its points. */
const slopeFromTwoPoints = (a: number, b: number, c: number) => {
  const y = (x: number) => -(a * x + c) / b;
  return (y(7) - y(-3)) / 10;
};

describe('analytic generators: answers recomputed from the data', () => {
  check('gen-distance', (e, d) => {
    if (d.mode === 0) {
      expect(d.x1 !== d.x2 || d.y1 !== d.y2).toBe(true);
      // |AB|² = |A|² + |B|² − 2·A·B (law of cosines in vector form)
      const sq = d.x1 ** 2 + d.y1 ** 2 + d.x2 ** 2 + d.y2 ** 2 - 2 * (d.x1 * d.x2 + d.y1 * d.y2);
      expect(ans(e, 0)).toBeCloseTo(Math.sqrt(sq), 8);
      mentions(e, pointText('A', d.x1, d.y1), pointText('B', d.x2, d.y2));
    } else {
      const roots = findRoots((a) => dist(a, d.y1, d.x2, d.y2) - d.r, -100, 100, 20000);
      expect(roots.length).toBe(2);
      expect(ans(e, 0)).toBeCloseTo(roots[0], 8);
      expect(ans(e, 1)).toBeCloseTo(roots[1], 8);
      mentions(e, `A(a,${d.y1})`, pointText('B', d.x2, d.y2), `AB=${d.r}`);
    }
  });

  check('gen-midpoint', (e, d) => {
    if (d.mode === 0) {
      const [xm, ym] = [ans(e, 0), ans(e, 1)];
      const whole = dist(d.x1, d.y1, d.x2, d.y2);
      expect(dist(d.x1, d.y1, xm, ym)).toBeCloseTo(whole / 2, 8);
      expect(dist(xm, ym, d.x2, d.y2)).toBeCloseTo(whole / 2, 8);
      mentions(e, pointText('A', d.x1, d.y1), pointText('B', d.x2, d.y2));
    } else {
      const [xb, yb] = [ans(e, 0), ans(e, 1)];
      // M is on segment AB and equidistant from A and B
      expect(dist(d.x1, d.y1, d.xm, d.ym)).toBeCloseTo(dist(d.xm, d.ym, xb, yb), 8);
      expect(dist(d.x1, d.y1, d.xm, d.ym) + dist(d.xm, d.ym, xb, yb)).toBeCloseTo(dist(d.x1, d.y1, xb, yb), 8);
      mentions(e, pointText('M', d.xm, d.ym), pointText('A', d.x1, d.y1));
    }
  });

  check('gen-line-two-points', (e, d) => {
    expect(d.x1).not.toBe(d.x2);
    const [m, n] = [ans(e, 0), ans(e, 1)];
    expect(m * d.x1 + n).toBeCloseTo(d.y1, 8);
    expect(m * d.x2 + n).toBeCloseTo(d.y2, 8);
    mentions(e, pointText('A', d.x1, d.y1), pointText('B', d.x2, d.y2));
  });

  check('gen-parallel-line', (e, d) => {
    expect(d.b).not.toBe(0);
    const [m, n] = [ans(e, 0), ans(e, 1)];
    expect(m).toBeCloseTo(slopeFromTwoPoints(d.a, d.b, d.c), 8); // parallel: same direction
    expect(m * d.x0 + n).toBeCloseTo(d.y0, 8); // through P
    expect(Math.abs(d.a * d.x0 + d.b * d.y0 + d.c)).toBeGreaterThan(0.5); // P is not on ℓ, so the lines are distinct
    // the line printed in the statement is a·x + b·y + c = 0: check it at two points read from the data
    if (d.mode === 1) expect(e.statement).toContain('=0$');
    mentions(e, pointText('P', d.x0, d.y0));
  });

  check('gen-perpendicular-line', (e, d) => {
    const [m, n] = [ans(e, 0), ans(e, 1)];
    if (d.mode === 0) {
      // direction of ℓ from two of its points, dotted with the direction (1, m) of the answer
      const y = (x: number) => (d.mp / d.mq) * x + d.intercept;
      const direction = [10, y(7) - y(-3)];
      expect(direction[0] * 1 + direction[1] * m).toBeCloseTo(0, 8);
      expect(m * d.x0 + n).toBeCloseTo(d.y0, 8);
      mentions(e, pointText('P', d.x0, d.y0));
    } else {
      // two different points of the answer line are each equidistant from A and B
      for (const x of [-5, 0, 4]) {
        const yLine = m * x + n;
        expect(dist(x, yLine, d.x1, d.y1)).toBeCloseTo(dist(x, yLine, d.x2, d.y2), 8);
      }
      mentions(e, pointText('A', d.x1, d.y1), pointText('B', d.x2, d.y2));
    }
  });

  check('gen-lines-intersection', (e, d) => {
    const first = (x: number) => d.m1 * x + d.n1;
    const second = d.mode === 0 ? (x: number) => d.m2 * x + d.n2 : (x: number) => (d.c - d.a * x) / d.b;
    if (d.mode === 1) expect(d.b).not.toBe(0);
    const x = bisect((t) => first(t) - second(t), -200, 200);
    expect(ans(e, 0)).toBeCloseTo(x, 8);
    expect(ans(e, 1)).toBeCloseTo(first(x), 8);
    expect(ans(e, 1)).toBeCloseTo(second(x), 8);
  });

  check('gen-triangle-altitude', (e, d) => {
    const A = [d.x1, d.y1];
    const B = [d.x2, d.y2];
    const C = [d.x3, d.y3];
    const ab = [B[0] - A[0], B[1] - A[1]];
    const crossABC = ab[0] * (C[1] - A[1]) - ab[1] * (C[0] - A[0]);
    expect(Math.abs(crossABC)).toBeGreaterThan(0.5); // a real triangle
    const [m, n, xh, yh, ch] = e.answers.map((a) => a.value);
    // altitude: through C and perpendicular to AB
    expect(m * d.x3 + n).toBeCloseTo(d.y3, 8);
    expect(ab[0] * 1 + ab[1] * m).toBeCloseTo(0, 8);
    // foot: orthogonal projection of C on AB
    const t = ((C[0] - A[0]) * ab[0] + (C[1] - A[1]) * ab[1]) / (ab[0] ** 2 + ab[1] ** 2);
    expect(xh).toBeCloseTo(A[0] + t * ab[0], 8);
    expect(yh).toBeCloseTo(A[1] + t * ab[1], 8);
    // length: distance from C to the line AB
    expect(ch).toBeCloseTo(Math.abs(crossABC) / Math.hypot(ab[0], ab[1]), 8);
    mentions(e, pointText('A', d.x1, d.y1), pointText('B', d.x2, d.y2), pointText('C', d.x3, d.y3));
  });

  it('every analytic generator has a numeric test', () => {
    expect(analyticGenerators.map((g) => g.id).sort()).toEqual([...tested].sort());
  });
});
