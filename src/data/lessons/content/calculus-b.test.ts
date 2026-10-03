/**
 * Independent numeric verification of the calculus-b lessons
 * (f ↔ f′ graphs, graphical extremum problems, antiderivatives, areas, ∫f′ = f(b) − f(a), review).
 * Every value is recomputed from a concrete model: the function drawn in the figure, the geometry
 * of the moving point (shoelace areas, Math.hypot distances, numeric tangents), golden-section search,
 * Simpson integration split at numerically found roots, and numeric differentiation — never from the
 * closed form written in the solution.
 */
import { describe, expect, it } from 'vitest';
import { calculusBContent } from './calculus-b';
import { bisect, findCriticalPoints, findRoots, numericDerivative, simpson, type RealFn } from '../../problems/verify';

type Point = [number, number];

const ex = (id: string) => Object.values(calculusBContent).flatMap((lesson) => lesson.exercises).find((e) => e.id === id)!;

/** Compares the exercise's answers, in order, with independently computed values. */
function expectAnswers(id: string, computed: number[], digits = 6) {
  const answers = ex(id).answers ?? [];
  expect(answers.length, `${id}: number of answers`).toBe(computed.length);
  answers.forEach((answer, index) => expect(answer.value, `${id}: ${answer.label}`).toBeCloseTo(computed[index], digits));
}

/** Five-point central difference (exact for polynomials of degree ≤ 4 up to rounding). */
const derivative5 = (f: RealFn, x: number, h = 1e-3) => (-f(x + 2 * h) + 8 * f(x + h) - 8 * f(x - h) + f(x - 2 * h)) / (12 * h);

/** Golden-section search for the maximiser of a unimodal function on [a, b], polished by bisection on f′. */
function argmax(f: RealFn, a: number, b: number): number {
  const g = (Math.sqrt(5) - 1) / 2;
  let lo = a;
  let hi = b;
  for (let i = 0; i < 200; i += 1) {
    const x1 = hi - g * (hi - lo);
    const x2 = lo + g * (hi - lo);
    if (f(x1) > f(x2)) hi = x2;
    else lo = x1;
  }
  const x = (lo + hi) / 2;
  const h = Math.min(1e-3, (x - a) / 4, (b - x) / 4);
  const slope: RealFn = (t) => derivative5(f, t, h / 4);
  const left = x - h;
  const right = x + h;
  return h > 0 && slope(left) > 0 && slope(right) < 0 ? bisect(slope, left, right, 1e-14) : x;
}
const argmin = (f: RealFn, a: number, b: number) => argmax((x) => -f(x), a, b);

/** Second difference; exact (up to rounding) for polynomials of degree ≤ 3. */
const secondDiff = (f: RealFn, x: number, h = 1e-3) => (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);

/** f(x) = y0 + ∫_{x0}^{x} f′, by Simpson. */
const antiderivative = (fp: RealFn, x0: number, y0: number, n = 2000): RealFn => (x) => y0 + simpson(fp, x0, x, n);

/** Area between the graph of f and the x-axis on [a, b], split at the numerically found sign changes. */
function area(f: RealFn, a: number, b: number): number {
  const cuts = [a, ...findRoots(f, a, b).filter((r) => r > a + 1e-9 && r < b - 1e-9), b];
  let total = 0;
  for (let i = 0; i < cuts.length - 1; i += 1) total += Math.abs(simpson(f, cuts[i], cuts[i + 1]));
  return total;
}

function shoelace(points: Point[]): number {
  let sum = 0;
  points.forEach(([x1, y1], index) => {
    const [x2, y2] = points[(index + 1) % points.length];
    sum += x1 * y2 - x2 * y1;
  });
  return Math.abs(sum) / 2;
}

/** Tangent line to f at x0 as [slope, intercept], from a five-point numeric derivative. */
function tangent(f: RealFn, x0: number, h = 0.05): [number, number] {
  const m = derivative5(f, x0, h);
  return [m, f(x0) - m * x0];
}

/** Classifies the critical points of a function from the sign of its derivative on both sides. */
function classify(fp: RealFn, points: number[]) {
  const max = points.filter((c) => fp(c - 1e-3) > 0 && fp(c + 1e-3) < 0);
  const min = points.filter((c) => fp(c - 1e-3) < 0 && fp(c + 1e-3) > 0);
  return { max, min };
}

describe('calculus-b structure', () => {
  it('has 10 exercises per core lesson and 7 in the review, with the planned difficulty spread', () => {
    const core = ['calc-graph-derivative', 'calc-extremum-problems', 'calc-indefinite-integral', 'calc-areas', 'calc-graph-integral'];
    expect(Object.keys(calculusBContent).sort()).toEqual([...core, 'calc-review'].sort());
    for (const id of core) {
      const exercises = calculusBContent[id].exercises;
      expect(exercises.length, id).toBe(10);
      expect(exercises.filter((e) => e.difficulty === 1).length, id).toBeGreaterThanOrEqual(2);
      expect(exercises.filter((e) => e.difficulty === 3).length, id).toBeGreaterThanOrEqual(2);
      expect(exercises.filter((e) => e.answers?.length).length / exercises.length, id).toBeGreaterThanOrEqual(0.6);
      const difficulties = exercises.map((e) => e.difficulty);
      expect([...difficulties].sort((a, b) => a - b), `${id}: ordered from easy to hard`).toEqual(difficulties);
    }
    const review = calculusBContent['calc-review'].exercises;
    expect(review.length).toBe(7);
    expect(review.every((e) => e.difficulty >= 2 && e.answers?.length)).toBe(true);
  });

  it('figures use the shared SVG conventions', () => {
    for (const lesson of Object.values(calculusBContent)) {
      for (const exercise of lesson.exercises) {
        if (!exercise.figureSvg) continue;
        expect(exercise.figureSvg).toContain('viewBox="0 0 320 240"');
        expect(exercise.figureSvg).toContain('stroke="currentColor"');
        expect(exercise.statement, `${exercise.id} refers to its figure`).toContain('שרטוט');
      }
    }
  });
});

describe('calc-graph-derivative', () => {
  it('calc-graph-derivative-1', () => {
    const fp: RealFn = (x) => ((x + 2) * (x - 3)) / 2; // the parabola in the figure
    expect(findRoots(fp, -10, 10).map((r) => Math.round(r * 1e9) / 1e9)).toEqual([-2, 3]);
    const f = antiderivative(fp, 0, 0, 20); // Simpson is exact for this quadratic f′
    const { max, min } = classify(fp, findCriticalPoints(f, -6, 6, 600));
    expect(max.length).toBe(1);
    expect(min.length).toBe(1);
    expectAnswers('calc-graph-derivative-1', [max[0], min[0]]);
  });

  it('calc-graph-derivative-2', () => {
    const f: RealFn = (x) => 5 + 3 * (x - 2) + (x - 2) ** 2 - 0.5 * (x - 2) ** 3; // any f with f(2)=5, f′(2)=3
    expect(f(2)).toBe(5);
    expect(numericDerivative(f, 2)).toBeCloseTo(3, 8);
    const [m, n] = tangent(f, 2);
    expectAnswers('calc-graph-derivative-2', [m, n]);
  });

  it('calc-graph-derivative-3', () => {
    const fp: RealFn = (x) => (-(x ** 2) * (x + 3) * (x - 2)) / 6; // figure model
    expect(fp(0)).toBeCloseTo(0, 12);
    expect(fp(-0.1)).toBeGreaterThan(0);
    expect(fp(0.1)).toBeGreaterThan(0); // touches the x-axis at the origin
    expect(findRoots(fp, -5, 5.0013).map((r) => Math.round(r * 1e9) / 1e9)).toEqual([-3, 2]);
    const f = antiderivative(fp, 0, 0, 400);
    const { max, min } = classify(fp, findCriticalPoints(f, -5, 5.0013, 500));
    expect(max.length).toBe(1);
    expect(min.length).toBe(1);
    expectAnswers('calc-graph-derivative-3', [min[0], max[0]]);
  });

  it('calc-graph-derivative-4', () => {
    const fp: RealFn = (x) => (x * (x - 3) ** 2) / 2; // figure model
    const fpp: RealFn = (x) => numericDerivative(fp, x);
    const fpExtrema = findRoots(fpp, -2, 6.0011);
    expect(fpExtrema.length).toBe(2);
    expect(fp(fpExtrema[0])).toBeCloseTo(2, 8); // max (1,2)
    expect(fp(fpExtrema[1])).toBeCloseTo(0, 8); // min (3,0)
    expect(findRoots(fp, -2, 6.0011).length).toBe(1); // crosses the x-axis only once
    const f = antiderivative(fp, 0, 0, 20); // Simpson is exact for the cubic f′
    const { min } = classify(fp, findCriticalPoints(f, -2, 6.0011, 500));
    expect(min.length).toBe(1);
    const inflections = findRoots((x) => secondDiff(f, x), -2, 6.0011, 500); // second difference of the quartic f: O(h²) ≈ 1e-7
    expect(inflections.length).toBe(2);
    expectAnswers('calc-graph-derivative-4', [min[0], inflections[0], inflections[1]]);
  });

  it('calc-graph-derivative-5', () => {
    const f: RealFn = (x) => x ** 3 - 3 * x; // figure model
    expect(f(-1)).toBe(2);
    expect(f(1)).toBe(-2);
    const fp: RealFn = (x) => numericDerivative(f, x);
    const zeros = findRoots(fp, -3, 3.0007);
    const lowest = findRoots((x) => secondDiff(f, x), -3, 3.0007)[0]; // where f′ stops decreasing
    expect(fp(lowest)).toBeLessThan(fp(lowest - 0.1));
    expect(fp(lowest)).toBeLessThan(fp(lowest + 0.1));
    expect(secondDiff(f, -0.5)).toBeLessThan(0);
    expect(secondDiff(f, 0.5)).toBeGreaterThan(0);
    expectAnswers('calc-graph-derivative-5', [zeros[0], zeros[1], lowest]);
  });

  it('calc-graph-derivative-6', () => {
    const graphI: RealFn = (x) => 4 * x - x * x;
    const graphII: RealFn = (x) => 2 * x * x - x ** 3 / 3;
    for (const x of [-1, 0.5, 2, 3.3, 5]) expect(numericDerivative(graphII, x)).toBeCloseTo(graphI(x), 7); // I = (II)′
    expect(Math.abs(graphII(argmax(graphI, -1, 5)))).toBeGreaterThan(1); // II is not the derivative of I
    const slope = derivative5(graphII, 2);
    const inflection = findRoots((x) => secondDiff(graphII, x), -1, 5)[0];
    expectAnswers('calc-graph-derivative-6', [slope, inflection]);
  });

  it('calc-graph-derivative-7', () => {
    const f: RealFn = (x) => -(x ** 3) + 3 * x * x + 9 * x - 2;
    const x = findRoots((t) => secondDiff(f, t), -5, 5)[0];
    const slope = derivative5(f, x);
    expect(slope).toBeGreaterThan(numericDerivative(f, x - 0.1));
    expect(slope).toBeGreaterThan(numericDerivative(f, x + 0.1));
    expectAnswers('calc-graph-derivative-7', [x, f(x), slope]);
  });

  it('calc-graph-derivative-8', () => {
    const f: RealFn = (x) => x ** 4 / 4 - 2 * x * x; // an even function whose f′ matches the figure for x ≥ 0
    for (const x of [0.3, 1.7, 2.9]) {
      expect(f(-x)).toBeCloseTo(f(x), 12);
      expect(numericDerivative(f, -x)).toBeCloseTo(-numericDerivative(f, x), 7); // f′ is odd
    }
    expect(numericDerivative(f, 1)).toBeLessThan(0);
    expect(numericDerivative(f, 3)).toBeGreaterThan(0);
    const fp: RealFn = (x) => numericDerivative(f, x);
    const { max, min } = classify(fp, findCriticalPoints(f, -4.01, 4.03));
    expect(max.length).toBe(1);
    expect(min.length).toBe(2);
    expectAnswers('calc-graph-derivative-8', [max[0], min[0], min[1]]);
  });

  it('calc-graph-derivative-9', () => {
    const fp: RealFn = (x) => x * x - 2 * x - 3; // figure model
    const vertex = argmin(fp, -5, 5);
    expect(vertex).toBeCloseTo(1, 7);
    expect(fp(vertex)).toBeCloseTo(-4, 10);
    const gp: RealFn = (x) => fp(x) + 3; // k = 3
    const { max, min } = classify(gp, findRoots(gp, -10, 10));
    const kStar = -fp(vertex); // smallest shift that keeps g′ ≥ 0
    expect(findRoots((x) => fp(x) + kStar - 0.01, -10, 10).length).toBe(2);
    expect(findRoots((x) => fp(x) + kStar + 0.01, -10, 10).length).toBe(0);
    expect(findRoots((x) => fp(x) + kStar, -10, 10.0007).length).toBe(0); // only touches: no sign change, no extremum
    expectAnswers('calc-graph-derivative-9', [max[0], min[0], kStar]);
  });

  it('calc-graph-derivative-10', () => {
    const fp: RealFn = (x) => 1 - 4 / (x - 1) ** 2; // figure model
    const left = findRoots(fp, -20, 0.99);
    const right = findRoots(fp, 1.01, 20);
    expect(left.length).toBe(1);
    expect(right.length).toBe(1);
    for (const x of [-5, -2, 0, 0.5]) expect(numericDerivative(fp, x)).toBeLessThan(0); // f′ decreasing for x < 1
    for (const x of [1.5, 2, 4, 8]) expect(numericDerivative(fp, x)).toBeGreaterThan(0); // f′ increasing for x > 1
    const { max } = classify(fp, left);
    const { min } = classify(fp, right);
    expectAnswers('calc-graph-derivative-10', [max[0], min[0]]);
  });
});

describe('calc-extremum-problems', () => {
  it('calc-extremum-problems-1', () => {
    const y: RealFn = (x) => 6 - 2 * x;
    const S: RealFn = (x) => shoelace([[0, 0], [x, 0], [x, y(x)], [0, y(x)]]);
    const x = argmax(S, 0, 3);
    expectAnswers('calc-extremum-problems-1', [x, y(x), S(x)]);
  });

  it('calc-extremum-problems-2', () => {
    const f: RealFn = (x) => x * x - 4 * x + 7;
    const g: RealFn = (x) => x - 1;
    for (let x = -10; x <= 10; x += 0.25) expect(f(x)).toBeGreaterThan(g(x));
    const AB: RealFn = (x) => Math.hypot(0, f(x) - g(x));
    const x = argmin(AB, -10, 10);
    expectAnswers('calc-extremum-problems-2', [x, AB(x)]);
  });

  it('calc-extremum-problems-3', () => {
    const f: RealFn = (x) => 27 - x * x;
    const S: RealFn = (x) => shoelace([[x, 0], [x, f(x)], [-x, f(x)], [-x, 0]]);
    const x = argmax(S, 0, Math.sqrt(27));
    expectAnswers('calc-extremum-problems-3', [x, S(x)]);
  });

  it('calc-extremum-problems-4', () => {
    const f: RealFn = (x) => Math.sqrt(12 - x);
    const S: RealFn = (x) => shoelace([[0, 0], [x, 0], [x, f(x)]]);
    const x = argmax(S, 0, 12);
    expectAnswers('calc-extremum-problems-4', [x, f(x), S(x)]);
  });

  it('calc-extremum-problems-5', () => {
    const f: RealFn = (x) => 4 / (x * x);
    const perimeter: RealFn = (x) => {
      const corners: Point[] = [[0, 0], [x, 0], [x, f(x)], [0, f(x)]];
      return corners.reduce((sum, [x1, y1], i) => sum + Math.hypot(corners[(i + 1) % 4][0] - x1, corners[(i + 1) % 4][1] - y1), 0);
    };
    const x = argmin(perimeter, 0.1, 20);
    expectAnswers('calc-extremum-problems-5', [x, f(x), perimeter(x)]);
  });

  it('calc-extremum-problems-6', () => {
    const f: RealFn = (x) => Math.sqrt(2 * x);
    const d: RealFn = (x) => Math.hypot(x - 5, f(x) - 0);
    const x = argmin(d, 0, 20);
    expectAnswers('calc-extremum-problems-6', [x, f(x), d(x)]);
  });

  it('calc-extremum-problems-7', () => {
    const f: RealFn = (x) => Math.sqrt(x);
    const g: RealFn = (x) => x / 4;
    expect(f(16)).toBe(g(16));
    for (let x = 0.5; x < 16; x += 0.5) expect(f(x)).toBeGreaterThan(g(x));
    const AB: RealFn = (x) => Math.hypot(0, f(x) - g(x));
    const x = argmax(AB, 0, 16);
    expectAnswers('calc-extremum-problems-7', [x, AB(x)]);
  });

  it('calc-extremum-problems-8', () => {
    const f: RealFn = (x) => (x - 3) ** 2;
    const triangle = (t: number) => {
      const [m, n] = tangent(f, t);
      return { A: -n / m, B: n, S: shoelace([[0, 0], [-n / m, 0], [0, n]]) };
    };
    for (const t of [0.5, 1.7, 2.6]) {
      expect(triangle(t).A).toBeCloseTo((t + 3) / 2, 6); // part א
      expect(triangle(t).B).toBeCloseTo(9 - t * t, 6);
    }
    const t = argmax((s) => triangle(s).S, 0.01, 2.99);
    expectAnswers('calc-extremum-problems-8', [t, triangle(t).S], 6);
  });

  it('calc-extremum-problems-9', () => {
    const f: RealFn = (x) => x * x;
    const A: Point = [-2, f(-2)];
    const B: Point = [4, f(4)];
    expect(A[1]).toBe(4);
    expect(B[1]).toBe(16);
    const S: RealFn = (t) => shoelace([A, B, [t, f(t)]]);
    const t = argmax(S, -2, 4);
    expect(numericDerivative(f, t)).toBeCloseTo((B[1] - A[1]) / (B[0] - A[0]), 6); // tangent ∥ AB
    expectAnswers('calc-extremum-problems-9', [t, S(t)]);
  });

  it('calc-extremum-problems-10', () => {
    const f: RealFn = (x) => 9 - x * x;
    const roots = findRoots(f, -10, 10);
    const S: RealFn = (x) => shoelace([[roots[1], 0], [x, f(x)], [-x, f(x)], [roots[0], 0]]);
    const x = argmax(S, 0, roots[1]);
    expectAnswers('calc-extremum-problems-10', [x, S(x)]);
  });
});

describe('calc-indefinite-integral', () => {
  it('calc-indefinite-integral-1 (antiderivatives differentiate back to the integrands)', () => {
    const pairs: Array<[RealFn, RealFn]> = [
      [(x) => x ** 4 - 3 * x * x + x, (x) => 4 * x ** 3 - 6 * x + 1],
      [(x) => x ** 3 / 3 + 3 / x, (x) => x * x - 3 / (x * x)],
      [(x) => x ** 3 / 3 + (x * x) / 2 - 2 * x, (x) => (x + 2) * (x - 1)],
    ];
    for (const [F, f] of pairs) for (const x of [-2.5, -0.7, 0.4, 1.9]) expect(numericDerivative(F, x)).toBeCloseTo(f(x), 6);
  });

  it('calc-indefinite-integral-2', () => {
    const f = antiderivative((x) => 6 * x * x - 2 * x + 1, 1, 4);
    expectAnswers('calc-indefinite-integral-2', [f(0), f(2)]);
  });

  it('calc-indefinite-integral-3', () => {
    const F = antiderivative((x) => 5 * (2 * x + 1) ** 4, 0, 3);
    expectAnswers('calc-indefinite-integral-3', [F(-1)]);
  });

  it('calc-indefinite-integral-4', () => {
    const fp: RealFn = (x) => (2 * x - 4) / (x * x - 4 * x + 5) ** 2;
    const f = antiderivative(fp, 2, 3);
    expect(classify(fp, findRoots(fp, -10, 10)).min.map((x) => Math.round(x * 1e9) / 1e9)).toEqual([2]);
    expectAnswers('calc-indefinite-integral-4', [f(0)]);
  });

  it('calc-indefinite-integral-5', () => {
    const fp: RealFn = (x) => 4 / (2 * x - 1) ** 2;
    const f = antiderivative(fp, 1, 0);
    // limit at infinity: f(1) + ∫_1^∞ f′, with the substitution x = 1/t on (0, 1]
    const tail = simpson((t) => fp(1 / Math.max(t, 1e-9)) / Math.max(t, 1e-9) ** 2, 0, 1);
    expectAnswers('calc-indefinite-integral-5', [f(3), f(1) + tail]);
  });

  it('calc-indefinite-integral-6', () => {
    const fpp: RealFn = (x) => 6 * x - 6;
    const fp = antiderivative(fpp, 3, 0, 200); // f′(3) = 0 at the minimum
    const f = antiderivative(fp, 3, -20, 200);
    const { max, min } = classify(fp, findRoots(fp, -10, 10, 400));
    expect(min[0]).toBeCloseTo(3, 8);
    expectAnswers('calc-indefinite-integral-6', [f(0), max[0], f(max[0])]);
  });

  it('calc-indefinite-integral-7', () => {
    const fp: RealFn = (x) => 3 * x * x - 4 * x;
    const x0 = findRoots((x) => fp(x) - 4, 0.01, 10)[0]; // slope of y = 4x − 6, positive x
    const f = antiderivative(fp, x0, 4 * x0 - 6);
    expectAnswers('calc-indefinite-integral-7', [x0, f(0)]);
  });

  it('calc-indefinite-integral-8', () => {
    const F = antiderivative((x) => x * (x * x - 1) ** 3, 1, 2);
    expectAnswers('calc-indefinite-integral-8', [F(0)]);
  });

  it('calc-indefinite-integral-9', () => {
    // f(x) = ∫_0^x (a t² + b) dt (through the origin); conditions f′(1) = a + b = 0 and f(1) = −2.
    const i2 = simpson((t) => t * t, 0, 1);
    const i0 = simpson(() => 1, 0, 1);
    const det = 1 * i0 - 1 * i2;
    const a = (0 * i0 - 1 * -2) / det;
    const b = (1 * -2 - i2 * 0) / det;
    const fp: RealFn = (x) => a * x * x + b;
    expect(classify(fp, [1]).min).toEqual([1]); // (1, −2) is a minimum
    expect(antiderivative(fp, 0, 0)(1)).toBeCloseTo(-2, 10);
    expectAnswers('calc-indefinite-integral-9', [a, b]);
  });

  it('calc-indefinite-integral-10', () => {
    const fp: RealFn = (x) => (x - 1) / (x * x - 2 * x + 2) ** 3;
    const xMin = classify(fp, findRoots(fp, -10, 10)).min[0];
    // f(x) = 3 − ∫_x^∞ f′ (horizontal asymptote y = 3); the tail beyond 400 is below 1e-10.
    const fAt = (x: number) => 3 - (simpson(fp, x, x + 20, 4000) + simpson(fp, x + 20, 400, 4000));
    expectAnswers('calc-indefinite-integral-10', [xMin, fAt(xMin)]);
  });
});

describe('calc-areas', () => {
  it('calc-areas-1', () => {
    expectAnswers('calc-areas-1', [simpson((x) => 3 * x * x - 2 * x, 1, 3)]);
  });

  it('calc-areas-2', () => {
    const f: RealFn = (x) => 4 - x * x;
    const [a, b] = findRoots(f, -10, 10);
    expectAnswers('calc-areas-2', [area(f, a, b)]);
  });

  it('calc-areas-3', () => {
    const f: RealFn = (x) => 4 / (x + 1) ** 2;
    expectAnswers('calc-areas-3', [area(f, 0, 3)]);
  });

  it('calc-areas-4', () => {
    const f: RealFn = (x) => x * x - 4 * x;
    expectAnswers('calc-areas-4', [simpson(f, 1, 5), area(f, 1, 5)]);
  });

  it('calc-areas-5', () => {
    const h: RealFn = (x) => 4 - x * x - (x * x - 2 * x);
    const [a, b] = findRoots(h, -10, 10);
    expectAnswers('calc-areas-5', [area(h, a, b)]);
  });

  it('calc-areas-6', () => {
    const enclosed = (k: number) => {
      const h: RealFn = (x) => k * x - x * x;
      return area(h, 0, k);
    };
    const k = bisect((s) => enclosed(s) - 36, 1, 20);
    expectAnswers('calc-areas-6', [k], 6);
  });

  it('calc-areas-7', () => {
    const h: RealFn = (x) => x ** 3 - 3 * x - x;
    const roots = findRoots(h, -10, 10.0003);
    expect(roots.length).toBe(3);
    expectAnswers('calc-areas-7', [area(h, roots[0], roots[2])]);
  });

  it('calc-areas-8', () => {
    const f: RealFn = (x) => x * x;
    const [m, n] = tangent(f, 2);
    const xi = -n / m; // tangent meets the x-axis
    const region = simpson(f, 0, xi) + simpson((x) => f(x) - (m * x + n), xi, 2);
    expectAnswers('calc-areas-8', [region]);
  });

  it('calc-areas-9', () => {
    const f: RealFn = (x) => x ** 3;
    const [m, n] = tangent(f, 1);
    const h: RealFn = (x) => f(x) - (m * x + n);
    const other = findRoots(h, -10, 10.0007);
    expect(other.length).toBe(1); // the tangency point is a double root
    expect(other[0]).toBeCloseTo(-2, 6);
    for (let x = -1.9; x < 1; x += 0.1) expect(h(x)).toBeGreaterThanOrEqual(-1e-9);
    expectAnswers('calc-areas-9', [simpson(h, other[0], 1)], 6);
  });

  it('calc-areas-10', () => {
    const f: RealFn = (x) => (2 * x - 2) / (x * x - 2 * x + 2) ** 2;
    expect(findRoots(f, 0, 3).length).toBe(1);
    expectAnswers('calc-areas-10', [area(f, 0, 3)]);
  });
});

describe('calc-graph-integral', () => {
  it('calc-graph-integral-1', () => {
    const f: RealFn = (x) => 2 + (5 / 3) * (x - 1) + (x - 1) * (x - 4) * Math.cos(x); // any f with f(1)=2, f(4)=7
    const fp: RealFn = (x) => numericDerivative(f, x);
    expectAnswers('calc-graph-integral-1', [simpson(fp, 1, 4), simpson(fp, 4, 1)]);
  });

  it('calc-graph-integral-2', () => {
    const [p, q]: Point[] = [[0, 2], [4, 0]];
    const fp: RealFn = (x) => p[1] + ((q[1] - p[1]) / (q[0] - p[0])) * (x - p[0]);
    expectAnswers('calc-graph-integral-2', [1 + simpson(fp, 0, 4)]);
  });

  it('calc-graph-integral-3', () => {
    const f: RealFn = (x) => 0.5 * x * x - 2.5 * x + 1; // figure model
    expect([f(-1), f(2), f(5)]).toEqual([4, -2, 1]);
    const fp: RealFn = (x) => numericDerivative(f, x);
    expectAnswers('calc-graph-integral-3', [simpson(fp, -1, 2), simpson(fp, 2, 5), simpson(fp, -1, 5)]);
  });

  it('calc-graph-integral-4', () => {
    const vertices: Point[] = [[0, 2], [2, 2], [4, -2], [6, -2]];
    const fp: RealFn = (x) => {
      for (let i = 0; i < vertices.length - 1; i += 1) {
        const [x1, y1] = vertices[i];
        const [x2, y2] = vertices[i + 1];
        if (x >= x1 && x <= x2) return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
      }
      return Number.NaN;
    };
    const zero = findRoots(fp, 0, 6)[0];
    const breaks = [0, 2, zero, 4, 6];
    // Simpson is exact on each linear piece
    const f = (x: number) => 3 + breaks.slice(0, -1).reduce((sum, a, i) => sum + simpson(fp, Math.min(a, x), Math.min(breaks[i + 1], x), 20), 0);
    let best = 0;
    for (let x = 0; x <= 6; x += 0.01) if (f(x) > f(best)) best = x;
    expect(best).toBeCloseTo(zero, 1);
    expectAnswers('calc-graph-integral-4', [f(2), f(zero), f(4), f(6)]);
  });

  it('calc-graph-integral-5', () => {
    const [p, q]: Point[] = [[1, -2], [3, 2]];
    const fp: RealFn = (x) => p[1] + ((q[1] - p[1]) / (q[0] - p[0])) * (x - p[0]);
    const f = antiderivative(fp, 1, 4);
    const xMin = classify(fp, findRoots(fp, -10, 10)).min[0];
    expectAnswers('calc-graph-integral-5', [xMin, f(xMin), f(5)]);
  });

  it('calc-graph-integral-6', () => {
    const fp: RealFn = (x) => -x * (x - 4); // parabola through (0,0), (4,0) with vertex (2,4)
    expect(argmax(fp, -5, 5)).toBeCloseTo(2, 7);
    expect(fp(2)).toBe(4);
    const f = antiderivative(fp, 0, 1);
    expectAnswers('calc-graph-integral-6', [f(4), area(fp, 0, 4)]);
  });

  it('calc-graph-integral-7', () => {
    const fp: RealFn = (x) => x * x - 2 * x;
    const f = antiderivative(fp, 0, 1, 20);
    const xLow = argmin(f, 0, 3);
    expectAnswers('calc-graph-integral-7', [simpson(fp, 0, 3), area(fp, 0, 3), f(xLow)]);
  });

  it('calc-graph-integral-8', () => {
    const fp: RealFn = (x) => 3 * x * x - 12;
    const [a, b] = findRoots(fp, -10, 10);
    const f = antiderivative(fp, 2, -10);
    expect(classify(fp, [a, b]).max).toEqual([a]);
    expectAnswers('calc-graph-integral-8', [area(fp, a, b), f(a)]);
  });

  it('calc-graph-integral-9', () => {
    const fp: RealFn = (x) => 4 * x * (x - 2) * (x - 4); // figure model
    expect(area(fp, 0, 2)).toBeCloseTo(16, 8);
    expect(area(fp, 2, 4)).toBeCloseTo(16, 8);
    expect(area(fp, 4, 5)).toBeCloseTo(25, 8);
    const f = antiderivative(fp, 0, 2, 20);
    const samples = Array.from({ length: 501 }, (_, i) => f(i / 100));
    expect(Math.max(...samples)).toBeCloseTo(f(5), 8); // absolute max at the endpoint x = 5
    expect(Math.min(...samples)).toBeCloseTo(2, 8); // absolute min 2 (at x = 0 and x = 4)
    expectAnswers('calc-graph-integral-9', [f(2), f(4), f(5)]);
  });

  it('calc-graph-integral-10', () => {
    const f: RealFn = (x) => (5 / 9) * (x - 1) ** 2 * (x - 4.6) + 5; // figure model
    expect(f(1)).toBe(5);
    expect(numericDerivative(f, 1)).toBeCloseTo(0, 8);
    expect(secondDiff(f, 1)).toBeLessThan(0); // maximum
    expect(f(4)).toBeCloseTo(2, 12);
    const [m, n] = tangent(f, 4);
    expect(m).toBeCloseTo(3, 7);
    expect(n).toBeCloseTo(-10, 6);
    const fp: RealFn = (x) => numericDerivative(f, x);
    const fpp: RealFn = (x) => secondDiff(f, x);
    expectAnswers('calc-graph-integral-10', [simpson(fp, 1, 4), simpson(fpp, 1, 4)], 6);
  });
});

describe('calc-review', () => {
  it('calc-review-1', () => {
    const f: RealFn = (x) => -(x ** 3) + 3 * x * x;
    const xMax = argmax(f, 0.5, 4);
    const inflection = findRoots((x) => secondDiff(f, x), -5, 5)[0];
    const zeros = findRoots(f, -1, 5);
    expect(zeros.length).toBe(1); // the double root at 0 does not change sign
    expectAnswers('calc-review-1', [f(xMax), numericDerivative(f, inflection), area(f, 0, zeros[0])]);
  });

  it('calc-review-2', () => {
    const f: RealFn = (x) => (16 * x) / (x * x + 3) ** 2;
    for (const x of [0.5, 1, 2.5]) expect(f(-x)).toBe(-f(x));
    const xMax = argmax(f, 0, 5);
    expectAnswers('calc-review-2', [f(xMax), area(f, 0, 3)]);
  });

  it('calc-review-3', () => {
    const f: RealFn = (x) => 4 - x * x;
    const [a, b] = findRoots(f, -10, 10);
    const T = area(f, a, b);
    const S: RealFn = (x) => shoelace([[x, 0], [x, f(x)], [-x, f(x)], [-x, 0]]);
    const x = argmax(S, 0, b);
    expectAnswers('calc-review-3', [T, x, f(x), S(x) / T]);
  });

  it('calc-review-4', () => {
    const fp: RealFn = (x) => 3 * x * x - 6 * x - 9;
    const { max, min } = classify(fp, findRoots(fp, -10, 10));
    const f = antiderivative(fp, min[0], 0, 20); // tangent to the x-axis at the minimum (Simpson exact for quadratic f′)
    const zeros = findRoots(f, -10, 10.0007);
    expect(zeros.length).toBe(1);
    expect(f(-3)).toBeCloseTo(0, 8);
    expectAnswers('calc-review-4', [f(max[0]), area(f, zeros[0], min[0])]);
  });

  it('calc-review-5', () => {
    const f: RealFn = (x) => 2 * Math.sin(x) + Math.sin(2 * x);
    const xMax = argmax(f, 0, Math.PI);
    const xMin = argmin(f, Math.PI, 2 * Math.PI);
    expect(numericDerivative(f, Math.PI)).toBeCloseTo(0, 8);
    expect(numericDerivative(f, Math.PI - 0.05)).toBeLessThan(0);
    expect(numericDerivative(f, Math.PI + 0.05)).toBeLessThan(0); // no sign change at π
    expect(f(Math.PI)).toBeCloseTo(0, 12);
    expect(numericDerivative(f, 0)).toBeGreaterThan(0);
    expect(numericDerivative(f, 2 * Math.PI)).toBeGreaterThan(0);
    expectAnswers('calc-review-5', [xMax, f(xMax), f(xMin)], 6);
  });

  it('calc-review-6', () => {
    const f: RealFn = (x) => (x * x) / 4;
    const d: RealFn = (x) => Math.hypot(x - 0, f(x) - 5);
    const x = argmin(d, 0.5, 10);
    expect(argmin(d, -10, -0.5)).toBeCloseTo(-x, 6);
    const line = f(x);
    expectAnswers('calc-review-6', [x, line, d(x), area((t) => line - f(t), -x, x)], 6);
  });

  it('calc-review-7', () => {
    const a = bisect((s) => numericDerivative((x) => 1 - s / (x * x), 2) - 1, 0.1, 20, 1e-12);
    const f: RealFn = (x) => 1 - a / (x * x);
    const [m, n] = tangent(f, 2, 1e-3);
    const gap: RealFn = (x) => m * x + n - f(x);
    for (let x = 2.1; x <= 4; x += 0.1) expect(gap(x)).toBeGreaterThan(0);
    expectAnswers('calc-review-7', [a, simpson(gap, 2, 4)], 6);
  });
});
