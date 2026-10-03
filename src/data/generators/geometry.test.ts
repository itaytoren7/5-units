/**
 * Numeric verification of the geometry generators: for 200 seeds every answer is recomputed from
 * `exercise.data` with a concrete coordinate model (construct the figure, then measure lengths,
 * angles and areas), or by numeric root finding when the asked value is an unknown of the figure.
 */
import { describe, expect, it } from 'vitest';
import { bisect, findRoots } from '../problems/verify';
import { geometryGenerators } from './geometry';
import { fmt } from './helpers';
import { createRng } from './rng';
import type { GeneratedExercise } from './types';

interface V {
  x: number;
  y: number;
}
const v = (x: number, y: number): V => ({ x, y });
const add = (a: V, b: V): V => v(a.x + b.x, a.y + b.y);
const sub = (a: V, b: V): V => v(a.x - b.x, a.y - b.y);
const scale = (a: V, k: number): V => v(a.x * k, a.y * k);
const len = (a: V): number => Math.hypot(a.x, a.y);
const dist = (a: V, b: V): number => len(sub(a, b));
const mid = (a: V, b: V): V => v((a.x + b.x) / 2, (a.y + b.y) / 2);
const dir = (degrees: number): V => v(Math.cos((degrees * Math.PI) / 180), Math.sin((degrees * Math.PI) / 180));
const cross = (a: V, b: V): number => a.x * b.y - a.y * b.x;
const dot = (a: V, b: V): number => a.x * b.x + a.y * b.y;
/** Angle AVB in degrees, measured from the coordinates. */
const angleAt = (vertex: V, a: V, b: V): number => {
  const u = sub(a, vertex);
  const w = sub(b, vertex);
  return (Math.abs(Math.atan2(cross(u, w), dot(u, w))) * 180) / Math.PI;
};
/** Intersection of the lines P + t·d and Q + s·e. */
const intersect = (P: V, d: V, Q: V, e: V): V => {
  const t = cross(sub(Q, P), e) / cross(d, e);
  return add(P, scale(d, t));
};
const shoelace = (points: V[]): number => Math.abs(points.reduce((sum, p, i) => sum + cross(p, points[(i + 1) % points.length]), 0)) / 2;
/** Intersections of two circles (the one with the larger y first). */
const circles = (c1: V, r1: number, c2: V, r2: number): [V, V] => {
  const d = dist(c1, c2);
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(r1 * r1 - a * a, 0));
  const base = add(c1, scale(sub(c2, c1), a / d));
  const n = scale(v(-(c2.y - c1.y), c2.x - c1.x), 1 / d);
  const p1 = add(base, scale(n, h));
  const p2 = sub(base, scale(n, h));
  return p1.y >= p2.y ? [p1, p2] : [p2, p1];
};

const SEEDS = 200;
const tested = new Set<string>();
function check(id: string, verify: (exercise: GeneratedExercise, data: Record<string, number>) => void) {
  tested.add(id);
  it(id, () => {
    const generator = geometryGenerators.find((g) => g.id === id);
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

describe('geometry generators: answers recomputed from the data', () => {
  check('gen-polygon-angles', (e, d) => {
    const polygon = (n: number) => Array.from({ length: n }, (_, k) => dir((360 * k) / n));
    const interiorAngles = (n: number) => {
      const p = polygon(n);
      return p.map((vertex, k) => angleAt(vertex, p[(k + n - 1) % n], p[(k + 1) % n]));
    };
    if (d.mode === 0) {
      expect(d.n).toBeGreaterThanOrEqual(5);
      const angles = interiorAngles(d.n);
      expect(ans(e, 0)).toBeCloseTo(angles.reduce((s, a) => s + a, 0), 8);
      expect(ans(e, 1)).toBeCloseTo(angles[0], 8);
      mentions(e, `${d.n} צלעות`);
    } else {
      // find the number of sides whose measured interior angle is the given angle
      let found = 0;
      for (let n = 3; n <= 400 && !found; n += 1) if (Math.abs(interiorAngles(n)[0] - d.angle) < 1e-9) found = n;
      expect(found).toBeGreaterThan(0);
      expect(ans(e, 0)).toBe(found);
      expect(ans(e, 1)).toBeCloseTo(interiorAngles(found).reduce((s, a) => s + a, 0), 8);
      mentions(e, `${d.angle}^\\circ`);
    }
  });

  check('gen-parallel-angles', (e, d) => {
    // line a through P, line b through Q parallel to a, transversal t through Q and P
    const Q = v(0, 0);
    const P = add(Q, scale(dir(d.theta), 3));
    const aDir = v(1, 0);
    const bDir = sub(add(P, aDir), P); // parallel copy of a's direction
    const tDir = sub(P, Q);
    const rays = (along: V) => [along, tDir, scale(along, -1), scale(tDir, -1)];
    const sectorAngle = (V0: V, along: V, k: number) => {
      const r = rays(along);
      return angleAt(V0, add(V0, r[k]), add(V0, r[(k + 1) % 4]));
    };
    expect(Math.abs(d.theta - 90)).toBeGreaterThan(5);
    expect(sectorAngle(P, aDir, d.i)).toBeCloseTo(d.given, 8);
    expect(ans(e, 0)).toBeCloseTo(sectorAngle(Q, bDir, d.j), 8);
    mentions(e, `${d.given}^\\circ`);
  });

  check('gen-isosceles-angles', (e, d) => {
    if (d.mode === 0) {
      const A = v(0, 0);
      const B = dir(270 - d.apex / 2);
      const C = dir(270 + d.apex / 2);
      expect(angleAt(A, B, C)).toBeCloseTo(d.apex, 8);
      expect(ans(e, 0)).toBeCloseTo(angleAt(B, A, C), 8);
      mentions(e, `${d.apex}^\\circ`);
    } else if (d.mode === 1) {
      const B = v(0, 0);
      const C = v(1, 0);
      const A = intersect(B, dir(d.base), C, dir(180 - d.base));
      expect(A.y).toBeGreaterThan(0);
      expect(dist(A, B)).toBeCloseTo(dist(A, C), 10);
      expect(ans(e, 0)).toBeCloseTo(angleAt(A, B, C), 8);
      mentions(e, `${d.base}^\\circ`);
    } else {
      // A on the perpendicular bisector of BC (AB = AC) with the exterior angle ACD given
      const B = v(0, 0);
      const C = v(1, 0);
      const D = v(2, 0);
      const A = intersect(C, dir(d.exterior), v(0.5, 0), v(0, 1));
      expect(A.y).toBeGreaterThan(0);
      expect(angleAt(C, A, D)).toBeCloseTo(d.exterior, 8);
      expect(ans(e, 0)).toBeCloseTo(angleAt(C, A, B), 8);
      expect(ans(e, 1)).toBeCloseTo(angleAt(A, B, C), 8);
      mentions(e, `${d.exterior}^\\circ`);
    }
  });

  check('gen-pythagoras', (e, d) => {
    const C = v(0, 0);
    if (d.mode === 0) {
      expect(ans(e, 0)).toBeCloseTo(dist(v(0, d.b), v(d.a, 0)), 8);
      mentions(e, `AC=${d.b}`, `BC=${d.a}`);
    } else if (d.mode === 1) {
      expect(d.b).toBeLessThan(d.c);
      const A = v(0, d.b);
      const leg = bisect((x) => dist(A, v(x, 0)) - d.c, 1e-9, d.c);
      expect(ans(e, 0)).toBeCloseTo(dist(C, v(leg, 0)), 8);
      mentions(e, `AB=${d.c}`, `$${d.b}$`);
    } else {
      expect(d.side).toBeGreaterThan(d.base / 2);
      const B = v(-d.base / 2, 0);
      const t = bisect((y) => dist(v(0, y), B) - d.side, 0, d.side);
      const A = v(0, t);
      const Cc = v(d.base / 2, 0);
      expect(dist(A, Cc)).toBeCloseTo(d.side, 10);
      // distance from A to the line BC
      expect(ans(e, 0)).toBeCloseTo(Math.abs(cross(sub(Cc, B), sub(A, B))) / dist(B, Cc), 8);
      mentions(e, `AB=AC=${d.side}`, `BC=${d.base}`);
    }
  });

  check('gen-midsegment', (e, d) => {
    const triangleDE = (base: number) => {
      const B = v(0, 0);
      const C = v(base, 0);
      const A = v(d.shape * base, 0.7 * base);
      return dist(mid(A, B), mid(A, C));
    };
    const trapezoidEF = (top: number, bottom: number) => {
      const D = v(0, 0);
      const C = v(bottom, 0);
      const A = v(1.3, 3);
      const B = v(1.3 + top, 3);
      return dist(mid(A, D), mid(B, C));
    };
    if (d.mode === 0 && d.fromBase === 1) {
      expect(ans(e, 0)).toBeCloseTo(triangleDE(d.bc), 8);
      mentions(e, `BC=${d.bc}`);
    } else if (d.mode === 0) {
      const base = bisect((L) => triangleDE(L) - d.de, 1e-6, 200);
      expect(ans(e, 0)).toBeCloseTo(base, 8);
      mentions(e, `DE=${fmt(d.de)}`);
    } else if (d.mode === 1) {
      const f = (x: number) => {
        const base = d.r * x + d.s;
        if (base <= 0) return Number.NaN;
        return triangleDE(base) - (d.p * x + d.q);
      };
      const roots = findRoots(f, -30, 30, 6000).filter((x) => d.p * x + d.q > 0 && d.r * x + d.s > 0);
      expect(roots.length).toBe(1);
      const x = roots[0];
      expect(ans(e, 0)).toBeCloseTo(x, 8);
      expect(ans(e, 1)).toBeCloseTo(triangleDE(d.r * x + d.s), 8);
      expect(ans(e, 2)).toBeCloseTo(d.r * x + d.s, 8);
    } else if (d.mode === 2) {
      expect(d.a).not.toBe(d.b);
      expect(ans(e, 0)).toBeCloseTo(trapezoidEF(d.a, d.b), 8);
      mentions(e, `AB=${d.a}`, `DC=${d.b}`);
    } else {
      const bottom = bisect((b) => trapezoidEF(d.a, b) - d.median, 1e-6, 200);
      expect(bottom).toBeGreaterThan(0);
      expect(Math.abs(bottom - d.a)).toBeGreaterThan(0.5);
      expect(ans(e, 0)).toBeCloseTo(bottom, 8);
      mentions(e, `EF=${fmt(d.median)}`, `AB=${d.a}`);
    }
  });

  check('gen-inscribed-angle', (e, d) => {
    const O = v(0, 0);
    const model = (central: number) => ({ A: dir(270 - central / 2), B: dir(270 + central / 2), C: dir(90 + d.offset) });
    const central = d.mode === 0 ? d.central : bisect((c) => {
      const m = model(c);
      return angleAt(m.C, m.A, m.B) - d.inscribed;
    }, 1, 179);
    const { A, B, C } = model(central);
    // C is on the major arc: on the same side of the chord AB as the centre
    expect(Math.sign(cross(sub(B, A), sub(C, A)))).toBe(Math.sign(cross(sub(B, A), sub(O, A))));
    if (d.mode === 0) {
      expect(angleAt(O, A, B)).toBeCloseTo(d.central, 8);
      expect(ans(e, 0)).toBeCloseTo(angleAt(C, A, B), 8);
      expect(ans(e, 1)).toBeCloseTo(angleAt(A, O, B), 8);
      mentions(e, `${d.central}^\\circ`);
    } else {
      expect(ans(e, 0)).toBeCloseTo(angleAt(O, A, B), 8);
      expect(ans(e, 1)).toBeCloseTo(angleAt(B, O, A), 8);
      mentions(e, `${d.inscribed}^\\circ`);
    }
  });

  check('gen-tangent-length', (e, d) => {
    // tangency points = circle ∩ circle on the diameter OP (Thales)
    const model = (R: number, OP: number) => {
      const O = v(0, 0);
      const P = v(OP, 0);
      const [A, B] = circles(O, R, mid(O, P), OP / 2);
      return { O, P, A, B };
    };
    const tangent = (R: number, OP: number) => {
      const { P, A } = model(R, OP);
      return dist(P, A);
    };
    let R: number;
    let OP: number;
    if (d.mode === 0) {
      R = d.R;
      OP = d.d;
    } else if (d.mode === 1) {
      R = d.R;
      OP = bisect((x) => tangent(d.R, x) - d.t, d.R * (1 + 1e-9), d.R + d.t + 100);
    } else {
      OP = d.d;
      R = bisect((r) => tangent(r, d.d) - d.t, 1e-9, d.d * (1 - 1e-12));
    }
    expect(OP).toBeGreaterThan(R);
    const { O, P, A, B } = model(R, OP);
    expect(dist(O, A)).toBeCloseTo(R, 9);
    expect(dot(sub(A, O), sub(P, A))).toBeCloseTo(0, 8); // radius ⟂ tangent
    const asked = [dist(P, A), OP, R][d.mode];
    expect(ans(e, 0)).toBeCloseTo(asked, 8);
    expect(ans(e, 1)).toBeCloseTo(dist(O, A) + dist(A, P) + dist(P, B) + dist(B, O), 8);
  });

  check('gen-thales', (e, d) => {
    const A = v(0, 0);
    const ray2 = dir(d.phi);
    // E = the point where the parallel to BC through D meets the second ray
    const model = (AB: number, AD: number, AC: number) => {
      const B = v(AB, 0);
      const D = v(AD, 0);
      const C = scale(ray2, AC);
      const E = intersect(D, sub(C, B), A, ray2);
      return { B, C, D, E };
    };
    if (d.mode === 0) {
      const { C, E } = model(d.AB, d.AB + d.BD, d.AC);
      expect(ans(e, 0)).toBeCloseTo(dist(C, E), 8);
      mentions(e, `AB=${d.AB}`, `BD=${d.BD}`, `AC=${d.AC}`);
    } else if (d.mode === 1) {
      const ac = bisect((x) => {
        const { C, E } = model(d.AB, d.AB + d.BD, x);
        return dist(C, E) - d.CE;
      }, 1e-6, 500);
      expect(ans(e, 0)).toBeCloseTo(ac, 8);
      mentions(e, `CE=${fmt(d.CE)}`);
    } else {
      expect(d.AD).toBeGreaterThan(d.AB);
      const { C, E } = model(d.AB, d.AD, d.AC);
      expect(ans(e, 0)).toBeCloseTo(dist(C, E), 8);
      expect(ans(e, 1)).toBeCloseTo(dist(A, E), 8);
      mentions(e, `AD=${d.AD}`);
    }
  });

  check('gen-angle-bisector', (e, d) => {
    const model = (a: number, b: number, c: number) => {
      const B = v(0, 0);
      const C = v(a, 0);
      const [A] = circles(B, c, C, b);
      const bisector = add(scale(sub(B, A), 1 / dist(A, B)), scale(sub(C, A), 1 / dist(A, C)));
      const D = intersect(A, bisector, B, v(1, 0));
      return { A, B, C, D };
    };
    const bd = (a: number, b: number, c: number) => {
      const m = model(a, b, c);
      return dist(m.B, m.D);
    };
    const isBisector = (a: number, b: number, c: number) => {
      const { A, B, C, D } = model(a, b, c);
      expect(angleAt(A, B, D)).toBeCloseTo(angleAt(A, D, C), 8);
      expect(D.x).toBeGreaterThan(0);
      expect(D.x).toBeLessThan(a);
    };
    const valid = (a: number, b: number, c: number) => {
      expect(a + b).toBeGreaterThan(c);
      expect(a + c).toBeGreaterThan(b);
      expect(b + c).toBeGreaterThan(a);
    };
    if (d.mode === 0) {
      valid(d.a, d.b, d.c);
      isBisector(d.a, d.b, d.c);
      const { B, C, D } = model(d.a, d.b, d.c);
      expect(ans(e, 0)).toBeCloseTo(dist(B, D), 8);
      expect(ans(e, 1)).toBeCloseTo(dist(D, C), 8);
      mentions(e, `AB=${d.c}`, `AC=${d.b}`, `BC=${d.a}`);
    } else if (d.mode === 1) {
      const a = d.BD + d.DC;
      const b = bisect((x) => bd(a, x, d.c) - d.BD, Math.abs(a - d.c) + 1e-6, a + d.c - 1e-6);
      valid(a, b, d.c);
      isBisector(a, b, d.c);
      expect(ans(e, 0)).toBeCloseTo(b, 8);
      mentions(e, `AB=${d.c}`, `BD=${d.BD}`, `DC=${d.DC}`);
    } else {
      const a = bisect((x) => bd(x, d.b, d.c) - d.BD, Math.abs(d.b - d.c) + 1e-6, d.b + d.c - 1e-6);
      valid(a, d.b, d.c);
      isBisector(a, d.b, d.c);
      mentions(e, `AB=${d.c}`, `AC=${d.b}`, `BD=${d.BD}`);
      const { D, C } = model(a, d.b, d.c);
      expect(ans(e, 0)).toBeCloseTo(dist(D, C), 8);
      expect(ans(e, 1)).toBeCloseTo(a, 8);
    }
  });

  check('gen-similar-triangles', (e, d) => {
    // the second triangle is built with the same angles (AA) on its own base, then measured
    const similarOnBase = (P: V, Q: V, R: V, base: number) => {
      const angleP = angleAt(P, Q, R);
      const angleQ = angleAt(Q, P, R);
      const P2 = v(0, 0);
      const Q2 = v(base, 0);
      return { P2, Q2, R2: intersect(P2, dir(angleP), Q2, dir(180 - angleQ)) };
    };
    if (d.mode === 0) {
      const A = v(0, 0);
      const B = v(d.AB, 0);
      const C = v(d.shape * d.AB, (2 * d.S1) / d.AB);
      expect(shoelace([A, B, C])).toBeCloseTo(d.S1, 9);
      const { P2, Q2, R2 } = similarOnBase(A, B, C, d.DE);
      expect(ans(e, 0)).toBeCloseTo(shoelace([P2, Q2, R2]), 8);
      mentions(e, `AB=${d.AB}`, `DE=${d.DE}`);
    } else if (d.mode === 1) {
      const B = v(0, 0);
      const C = v(d.BC, 0);
      const A = v(d.shape * d.BC, (2 * d.S1) / d.BC);
      const area = (L: number) => {
        const { P2, Q2, R2 } = similarOnBase(B, C, A, L);
        return shoelace([P2, Q2, R2]);
      };
      expect(ans(e, 0)).toBeCloseTo(bisect((L) => area(L) - d.S2, 1e-6, 500), 8);
      mentions(e, `BC=${d.BC}`);
    } else if (d.mode === 2) {
      const A = v(0, 0);
      const B = v(d.AB, 0);
      const C = v(d.shape * d.AB, d.CH);
      const { R2 } = similarOnBase(A, B, C, d.DE);
      expect(ans(e, 0)).toBeCloseTo(R2.y, 8); // height from F to DE (DE on the x-axis)
      mentions(e, `CH=${d.CH}`);
    } else {
      // AB = AD + DB, BC on the x-axis, area of ABC = S
      const B = v(0, 0);
      const A = scale(dir(30 + 60 * d.shape), d.m + d.n);
      const C = v((2 * d.S) / A.y, 0);
      expect(shoelace([A, B, C])).toBeCloseTo(d.S, 9);
      const D = add(A, scale(sub(B, A), d.m / dist(A, B)));
      const E = intersect(D, sub(C, B), A, sub(C, A));
      expect(dist(A, D)).toBeCloseTo(d.m, 10);
      expect(dist(D, B)).toBeCloseTo(d.n, 10);
      expect(ans(e, 0)).toBeCloseTo(shoelace([A, D, E]), 8);
      expect(ans(e, 1)).toBeCloseTo(shoelace([D, B, C, E]), 8);
      mentions(e, `AD=${d.m}`, `DB=${d.n}`);
    }
  });

  check('gen-trapezoid-diagonals', (e, d) => {
    expect(d.DC).toBeGreaterThan(d.AB);
    // D(0,0), C(DC,0), AB on the line y = h; h is found so that the area of AOB is the given one
    const model = (h: number) => {
      const D = v(0, 0);
      const C = v(d.DC, 0);
      const A = v(d.shift * d.DC, h);
      const B = v(d.shift * d.DC + d.AB, h);
      const O = intersect(A, sub(C, A), B, sub(D, B));
      return { A, B, C, D, O };
    };
    const h = bisect((x) => {
      const { A, B, O } = model(x);
      return shoelace([A, O, B]) - d.S1;
    }, 1e-6, 1000);
    const { A, B, C, D, O } = model(h);
    expect(dist(A, B)).toBeCloseTo(d.AB, 10);
    expect(ans(e, 0)).toBeCloseTo(shoelace([C, O, D]), 8);
    expect(ans(e, 1)).toBeCloseTo(shoelace([A, O, D]), 8);
    expect(ans(e, 2)).toBeCloseTo(shoelace([A, B, C, D]), 8);
    mentions(e, `AB=${d.AB}`, `DC=${d.DC}`, `$${d.S1}$`);
  });

  check('gen-sector', (e, d) => {
    // polygonal approximations of the arc, sharpened with Richardson extrapolation
    const arcPoints = (R: number, alpha: number, n: number) => Array.from({ length: n + 1 }, (_, k) => scale(dir((alpha * k) / n), R));
    const polyLength = (R: number, alpha: number, n: number) => {
      const p = arcPoints(R, alpha, n);
      let total = 0;
      for (let k = 0; k < n; k += 1) total += dist(p[k], p[k + 1]);
      return total;
    };
    const polyArea = (R: number, alpha: number, n: number) => shoelace([v(0, 0), ...arcPoints(R, alpha, n)]);
    const arc = (R: number, alpha: number) => (4 * polyLength(R, alpha, 2000) - polyLength(R, alpha, 1000)) / 3;
    const area = (R: number, alpha: number) => (4 * polyArea(R, alpha, 2000) - polyArea(R, alpha, 1000)) / 3;
    if (d.mode === 0) {
      expect(ans(e, 0)).toBeCloseTo(arc(d.R, d.alpha), 8);
      expect(ans(e, 1)).toBeCloseTo(area(d.R, d.alpha), 8);
      mentions(e, `R=${d.R}`, `${d.alpha}^\\circ`);
    } else if (d.mode === 1) {
      const alpha = bisect((x) => arc(d.R, x) - d.arcOverPi * Math.PI, 1, 359);
      expect(ans(e, 0)).toBeCloseTo(alpha, 8);
      expect(ans(e, 1)).toBeCloseTo(area(d.R, alpha), 8);
    } else {
      const R = bisect((r) => area(r, d.alpha) - d.areaOverPi * Math.PI, 0.01, 100);
      expect(ans(e, 0)).toBeCloseTo(R, 8);
      expect(ans(e, 1)).toBeCloseTo(arc(R, d.alpha), 8);
    }
  });

  it('every geometry generator has a numeric test', () => {
    expect(geometryGenerators.map((g) => g.id).sort()).toEqual([...tested].sort());
  });
});
