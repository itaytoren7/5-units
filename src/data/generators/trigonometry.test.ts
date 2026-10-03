/**
 * Numeric verification of the trigonometry generators: for 200 seeds every answer is recomputed from
 * `exercise.data` with a coordinate model of the triangle (constructed from rays and circles, then
 * measured), by numeric root finding for unknown sides / angles, and by scanning the equation's graph
 * for the trig-equation generator.
 */
import { evaluate } from 'mathjs';
import { describe, expect, it } from 'vitest';
import { bisect, findRoots } from '../problems/verify';
import { fmt } from './helpers';
import { createRng } from './rng';
import { trigonometryGenerators } from './trigonometry';
import type { GeneratedExercise } from './types';

interface V {
  x: number;
  y: number;
}
const v = (x: number, y: number): V => ({ x, y });
const add = (a: V, b: V): V => v(a.x + b.x, a.y + b.y);
const sub = (a: V, b: V): V => v(a.x - b.x, a.y - b.y);
const scale = (a: V, k: number): V => v(a.x * k, a.y * k);
const dist = (a: V, b: V): number => Math.hypot(a.x - b.x, a.y - b.y);
const dir = (degrees: number): V => v(Math.cos((degrees * Math.PI) / 180), Math.sin((degrees * Math.PI) / 180));
const cross = (a: V, b: V): number => a.x * b.y - a.y * b.x;
const dot = (a: V, b: V): number => a.x * b.x + a.y * b.y;
const angleAt = (vertex: V, a: V, b: V): number => {
  const u = sub(a, vertex);
  const w = sub(b, vertex);
  return (Math.abs(Math.atan2(cross(u, w), dot(u, w))) * 180) / Math.PI;
};
const intersect = (P: V, d: V, Q: V, e: V): V => add(P, scale(d, cross(sub(Q, P), e) / cross(d, e)));
const shoelace = (points: V[]): number => Math.abs(points.reduce((sum, p, i) => sum + cross(p, points[(i + 1) % points.length]), 0)) / 2;
/** Point at distance r1 from c1 and r2 from c2, above the line c1c2 (c1, c2 on the x-axis). */
const apex = (c1: V, r1: number, c2: V, r2: number): V => {
  const d = dist(c1, c2);
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  return v(c1.x + a, Math.sqrt(r1 * r1 - a * a));
};
/** Circumcentre from the two perpendicular-bisector equations 2(Q−P)·X = |Q|² − |P|². */
const circumcentre = (A: V, B: V, C: V): V => {
  const a1 = 2 * (B.x - A.x);
  const b1 = 2 * (B.y - A.y);
  const c1 = B.x ** 2 + B.y ** 2 - A.x ** 2 - A.y ** 2;
  const a2 = 2 * (C.x - A.x);
  const b2 = 2 * (C.y - A.y);
  const c2 = C.x ** 2 + C.y ** 2 - A.x ** 2 - A.y ** 2;
  const det = a1 * b2 - a2 * b1;
  return v((c1 * b2 - c2 * b1) / det, (a1 * c2 - a2 * c1) / det);
};
/** Triangle with BC = a on the x-axis and the angles at B and C (A from two rays). */
const fromBaseAngles = (a: number, beta: number, gamma: number) => {
  const B = v(0, 0);
  const C = v(a, 0);
  const A = intersect(B, dir(beta), C, dir(180 - gamma));
  return { A, B, C };
};

const SEEDS = 200;
const tested = new Set<string>();
function check(id: string, verify: (exercise: GeneratedExercise, data: Record<string, number>) => void) {
  tested.add(id);
  it(id, () => {
    const generator = trigonometryGenerators.find((g) => g.id === id);
    expect(generator, id).toBeDefined();
    for (let seed = 1; seed <= SEEDS; seed += 1) {
      const exercise = generator!.generate(createRng(seed));
      verify(exercise, exercise.data);
    }
  });
}
const ans = (exercise: GeneratedExercise, index: number) => exercise.answers[index].value;
const mentions = (exercise: GeneratedExercise, ...parts: string[]) => {
  for (const part of parts) expect(exercise.statement, `statement should mention ${part}`).toContain(part);
};

describe('trigonometry generators: answers recomputed from the data', () => {
  check('gen-right-triangle-trig', (e, d) => {
    if (d.mode === 5) {
      const C = v(0, 0);
      const A = v(d.AC, 0);
      const B = v(0, d.BC);
      expect(ans(e, 0)).toBeCloseTo(angleAt(A, B, C), 8);
      mentions(e, `AC=${fmt(d.AC)}`, `BC=${fmt(d.BC)}`);
      return;
    }
    expect(d.alpha).toBeGreaterThan(0);
    expect(d.alpha).toBeLessThan(90);
    // unit shape: A(0,0), C(1,0), B(1,t) with the measured angle at A equal to alpha; then scale to the given side
    const t = bisect((h) => angleAt(v(0, 0), v(1, h), v(1, 0)) - d.alpha, 1e-6, 1e4);
    const A = v(0, 0);
    const C = v(1, 0);
    const B = v(1, t);
    expect(angleAt(C, A, B)).toBeCloseTo(90, 10);
    const givenSide = [dist(A, B), dist(A, B), dist(A, C), dist(A, C), dist(B, C)][d.mode];
    const k = d.given / givenSide;
    const asked = [dist(B, C), dist(A, C), dist(B, C), dist(A, B), dist(A, B)][d.mode] * k;
    const askedName = ['$BC$', '$AC$', '$BC$', '$AB$', '$AB$'][d.mode];
    expect(e.answers[0].label).toBe(askedName);
    expect(ans(e, 0)).toBeCloseTo(asked, 8);
    mentions(e, `${d.alpha}^\\circ`, `=${fmt(d.given)}$`);
  });

  check('gen-sine-law-side', (e, d) => {
    const gamma = 180 - d.alpha - d.beta;
    expect(gamma).toBeGreaterThanOrEqual(30);
    const unit = fromBaseAngles(1, d.beta, gamma);
    expect(unit.A.y).toBeGreaterThan(0);
    expect(angleAt(unit.A, unit.B, unit.C)).toBeCloseTo(d.alpha, 8);
    const k = d.mode === 2 ? d.given / dist(unit.A, unit.C) : d.given / dist(unit.B, unit.C);
    const asked = [dist(unit.A, unit.C), dist(unit.A, unit.B), dist(unit.B, unit.C)][d.mode] * k;
    expect(e.answers[0].label).toBe(['$AC$', '$AB$', '$BC$'][d.mode]);
    expect(ans(e, 0)).toBeCloseTo(asked, 8);
    mentions(e, `${d.alpha}^\\circ`, `${d.beta}^\\circ`, `${d.mode === 2 ? 'AC' : 'BC'}=${fmt(d.given)}`);
  });

  check('gen-circumradius', (e, d) => {
    const radius = (a: number, alpha: number) => {
      const beta = ((180 - alpha) * d.shape) / 100;
      const { A, B, C } = fromBaseAngles(a, beta, 180 - alpha - beta);
      const O = circumcentre(A, B, C);
      expect(dist(O, B)).toBeCloseTo(dist(O, A), 6);
      expect(dist(O, C)).toBeCloseTo(dist(O, A), 6);
      return dist(O, A);
    };
    if (d.mode === 0) {
      expect(ans(e, 0)).toBeCloseTo(radius(d.a, d.alpha), 8);
      mentions(e, `BC=${fmt(d.a)}`, `${d.alpha}^\\circ`);
    } else if (d.mode === 1) {
      const a = bisect((x) => radius(x, d.alpha) - d.R, 1e-6, 4 * d.R);
      expect(ans(e, 0)).toBeCloseTo(a, 8);
      mentions(e, `R=${d.R}`, `${d.alpha}^\\circ`);
    } else {
      expect(d.a).toBeLessThan(2 * d.R);
      const alpha = bisect((x) => radius(d.a, x) - d.R, 0.5, 90); // the acute solution
      expect(ans(e, 0)).toBeCloseTo(alpha, 8);
      mentions(e, `R=${d.R}`, `BC=${d.a}`);
    }
  });

  check('gen-cosine-law-side', (e, d) => {
    const names = ['A', 'B', 'C'];
    const V0 = v(0, 0);
    const U = v(d.p, 0);
    const W = scale(dir(d.theta), d.q);
    expect(angleAt(V0, U, W)).toBeCloseTo(d.theta, 8);
    // the asked side is the one opposite the given angle (its label has no vertex letter of the angle)
    expect(e.answers[0].label).not.toContain(names[d.vertex]);
    expect(ans(e, 0)).toBeCloseTo(dist(U, W), 8);
    mentions(e, `\\angle ${names[d.vertex]}=${d.theta}^\\circ`, `=${fmt(d.p)}$`, `=${fmt(d.q)}$`);
  });

  check('gen-cosine-law-angle', (e, d) => {
    expect(d.a + d.b).toBeGreaterThan(d.c);
    expect(d.a + d.c).toBeGreaterThan(d.b);
    expect(d.b + d.c).toBeGreaterThan(d.a);
    const B = v(0, 0);
    const C = v(d.a, 0);
    const A = apex(B, d.c, C, d.b);
    const angles = [angleAt(A, B, C), angleAt(B, A, C), angleAt(C, A, B)];
    expect(angles.reduce((s, x) => s + x, 0)).toBeCloseTo(180, 8);
    for (const angle of angles) expect(angle).toBeGreaterThanOrEqual(15);
    expect(ans(e, 0)).toBeCloseTo(angles[d.target], 8);
    mentions(e, `AB=${d.c}`, `AC=${d.b}`, `BC=${d.a}`);
  });

  check('gen-triangle-area-sin', (e, d) => {
    const area = (b: number, c: number, alpha: number) => shoelace([v(0, 0), v(c, 0), scale(dir(alpha), b)]);
    if (d.mode === 0) {
      expect(ans(e, 0)).toBeCloseTo(area(d.b, d.c, d.alpha), 8);
      mentions(e, `AB=${fmt(d.c)}`, `AC=${fmt(d.b)}`, `${d.alpha}^\\circ`);
    } else if (d.mode === 1) {
      expect(2 * d.S).toBeLessThan(d.b * d.c); // such a triangle exists
      const alpha = bisect((x) => area(d.b, d.c, x) - d.S, 1e-6, 90);
      expect(ans(e, 0)).toBeCloseTo(alpha, 8);
      mentions(e, `AB=${d.c}`, `AC=${d.b}`, `$${d.S}$`);
    } else if (d.mode === 2) {
      const c = bisect((x) => area(d.b, x, d.alpha) - d.S, 1e-9, 1e4);
      expect(ans(e, 0)).toBeCloseTo(c, 8);
      mentions(e, `AC=${d.b}`, `${d.alpha}^\\circ`, `$${d.S}$`);
    } else {
      const A = v(0, 0);
      const B = v(d.a, 0);
      const D = scale(dir(d.alpha), d.d);
      const C = add(B, D);
      expect(ans(e, 0)).toBeCloseTo(shoelace([A, B, C, D]), 8);
      mentions(e, `AB=${fmt(d.a)}`, `AD=${fmt(d.d)}`, `${d.alpha}^\\circ`);
    }
  });

  check('gen-solve-triangle-sas', (e, d) => {
    expect(d.b).not.toBe(d.c);
    const A = v(0, 0);
    const B = v(d.c, 0);
    const C = scale(dir(d.alpha), d.b);
    const O = circumcentre(A, B, C);
    const vertex = d.b < d.c ? B : C;
    expect(e.answers[1].label).toContain(d.b < d.c ? 'B' : 'C');
    const angle = d.b < d.c ? angleAt(B, A, C) : angleAt(C, A, B);
    expect(angle).toBeLessThan(90);
    expect(ans(e, 0)).toBeCloseTo(dist(B, C), 8);
    expect(ans(e, 1)).toBeCloseTo(angle, 8);
    expect(ans(e, 2)).toBeCloseTo(dist(O, vertex), 8);
    expect(ans(e, 3)).toBeCloseTo(shoelace([A, B, C]), 8);
    mentions(e, `AB=${fmt(d.c)}`, `AC=${fmt(d.b)}`, `${d.alpha}^\\circ`);
  });

  check('gen-trig-equation', (e, d) => {
    const F = [Math.sin, Math.cos, Math.tan][d.fn];
    const g = (x: number) => d.coef * F((x * Math.PI) / 180) + d.constant;
    // the equation printed in the statement is the same equation: evaluate it with mathjs
    const tex = /\$([^$]+)\$ בתחום/.exec(e.statement)![1];
    const [lhs, rhs] = tex
      .replace(/\\sqrt\{(\d+)\}/g, 'sqrt($1)')
      .replace(/\\(sin|cos|tan) x/g, ' * $1(x deg)')
      .split('=')
      .map((side) => side.trim().replace(/^\*/, ''));
    for (const x of [7, 61, 133, 222, 318]) expect(Number(evaluate(`(${lhs}) - (${rhs})`, { x }))).toBeCloseTo(g(x), 10);

    // simple roots: sign changes (tan's poles are rejected because |g| is huge there)
    const simple = findRoots(g, -0.5, 360.5, 14420).filter((x) => Math.abs(g(x)) < 1e-6);
    // double roots (sin x = ±1, cos x = ±1): local minima of |g| that reach zero, refined by golden-section search
    const double: number[] = [];
    const step = 0.025;
    for (let x = -0.5 + step; x < 360.5; x += step) {
      const here = Math.abs(g(x));
      if (here < 1e-3 && here <= Math.abs(g(x - step)) && here <= Math.abs(g(x + step)) && Math.sign(g(x - step)) === Math.sign(g(x + step))) {
        let lo = x - step;
        let hi = x + step;
        for (let k = 0; k < 200; k += 1) {
          const m1 = hi - (hi - lo) * 0.618;
          const m2 = lo + (hi - lo) * 0.618;
          if (Math.abs(g(m1)) < Math.abs(g(m2))) hi = m2;
          else lo = m1;
        }
        const root = (lo + hi) / 2;
        if (Math.abs(g(root)) < 1e-12) double.push(root);
      }
    }
    const inRange = (x: number) => {
      const snapped = Math.abs(x) < 1e-6 || Math.abs(x - 360) < 1e-6 ? 0 : x;
      return snapped;
    };
    const all = [...simple, ...double]
      .map(inRange)
      .filter((x) => x >= 0 && x < 360)
      .sort((p, q) => p - q)
      .filter((x, i, list) => i === 0 || x - list[i - 1] > 1e-4);
    expect(ans(e, 0)).toBe(all.length);
    expect(e.answers.length).toBe(all.length + 1);
    all.forEach((root, i) => {
      const isDouble = double.some((x) => Math.abs(inRange(x) - root) < 1e-4);
      expect(ans(e, i + 1)).toBeCloseTo(root, isDouble ? 5 : 8);
      expect(Math.abs(g(ans(e, i + 1)))).toBeLessThan(1e-9);
    });
  });

  it('every trigonometry generator has a numeric test', () => {
    expect(trigonometryGenerators.map((g) => g.id).sort()).toEqual([...tested].sort());
  });
});
