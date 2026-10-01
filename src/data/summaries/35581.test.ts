/**
 * Verification for the 35581 (806) topic summaries:
 *  - a summary exists for every topic of the questionnaire, with the agreed size ranges
 *  - every worked-example number is recomputed independently (numeric root finding, integration,
 *    enumeration or coordinate models) rather than by re-evaluating the closed form in the text.
 */
import { describe, expect, it } from 'vitest';
import { questionnaire35581 } from '../syllabus/35581';
import { summaries35581 } from './35581';
import {
  bisect,
  binomialPmf,
  binomialRange,
  degreesToRadians,
  distance,
  enumerateProbability,
  findCriticalPoints,
  findInflectionPoints,
  findRoots,
  fn,
  numericDerivative,
  simpson,
  solveQuadratic,
} from '../problems/verify';

const requiredTopics = [
  'analytic-geometry',
  'algebra',
  'word-problems',
  'sequences',
  'probability',
  'euclidean-geometry',
  'trigonometry',
  'differential-calculus',
  'integral-calculus',
];

describe('35581 summaries – coverage', () => {
  it('has exactly one summary per required topic, all for 35581', () => {
    for (const topicId of requiredTopics) {
      const matches = summaries35581.filter((summary) => summary.topicId === topicId);
      expect(matches.length, topicId).toBe(1);
      expect(matches[0].questionnaire).toBe('35581');
    }
    expect(summaries35581.length).toBe(requiredTopics.length);
    for (const topic of questionnaire35581.topics) expect(requiredTopics).toContain(topic.id);
  });

  it('respects the size ranges', () => {
    for (const summary of summaries35581) {
      const where = summary.topicId;
      expect(summary.keyPoints.length, `${where} keyPoints`).toBeGreaterThanOrEqual(8);
      expect(summary.keyPoints.length, `${where} keyPoints`).toBeLessThanOrEqual(14);
      expect(summary.formulas.length, `${where} formulas`).toBeGreaterThanOrEqual(6);
      expect(summary.formulas.length, `${where} formulas`).toBeLessThanOrEqual(15);
      expect(summary.bagrutPatterns.length, `${where} patterns`).toBeGreaterThanOrEqual(4);
      expect(summary.bagrutPatterns.length, `${where} patterns`).toBeLessThanOrEqual(8);
      expect(summary.commonMistakes.length, `${where} mistakes`).toBeGreaterThanOrEqual(4);
      expect(summary.commonMistakes.length, `${where} mistakes`).toBeLessThanOrEqual(8);
      expect(summary.workedExamples.length, `${where} examples`).toBeGreaterThanOrEqual(2);
      expect(summary.workedExamples.length, `${where} examples`).toBeLessThanOrEqual(3);
      for (const example of summary.workedExamples) {
        expect(example.steps.length, `${where}: ${example.title}`).toBeGreaterThanOrEqual(3);
        expect(example.steps.length, `${where}: ${example.title}`).toBeLessThanOrEqual(7);
      }
    }
  });

  it('attaches the right tools', () => {
    const byId = new Map(summaries35581.map((summary) => [summary.topicId, summary]));
    expect(byId.get('trigonometry')?.tools).toEqual(['unit-circle', 'function-explorer']);
    expect(byId.get('differential-calculus')?.tools).toEqual(['function-explorer']);
    expect(byId.get('integral-calculus')?.tools).toEqual(['function-explorer']);
  });
});

describe('35581 summaries – analytic geometry examples', () => {
  it('AB = 10 and the perpendicular bisector meets the x-axis at x = 12', () => {
    expect(distance(1, 2, 7, 10)).toBeCloseTo(10, 10);
    // point on the x-axis equidistant from A and B
    const x = bisect((t) => distance(t, 0, 1, 2) - distance(t, 0, 7, 10), 0, 100);
    expect(x).toBeCloseTo(12, 8);
  });

  it('intersection P(2,3) and radius sqrt(13)', () => {
    const x = bisect((t) => 2 * t - 1 - (11 - t) / 3, -100, 100);
    const y = 2 * x - 1;
    expect(x).toBeCloseTo(2, 9);
    expect(y).toBeCloseTo(3, 9);
    expect(distance(0, 0, x, y)).toBeCloseTo(Math.sqrt(13), 9);
  });
});

describe('35581 summaries – algebra examples', () => {
  it('x^4-5x^2+4=0 has roots -2,-1,1,2', () => {
    const roots = findRoots(fn('x^4-5x^2+4'), -5, 5.001);
    expect(roots.length).toBe(4);
    [-2, -1, 1, 2].forEach((value, index) => expect(roots[index]).toBeCloseTo(value, 7));
  });

  it('|x^2-5x+6|=2 has roots 1 and 4', () => {
    const roots = findRoots(fn('abs(x^2-5x+6)-2'), -10, 10.001);
    expect(roots.length).toBe(2);
    expect(roots[0]).toBeCloseTo(1, 7);
    expect(roots[1]).toBeCloseTo(4, 7);
  });

  it('system ax+2y=4, 2x+ay=4 has x=y=4/(a+2) for a sample a', () => {
    const a = 3.7;
    const det = a * a - 4;
    const x = (4 * a - 2 * 4) / det;
    const y = (a * 4 - 2 * 4) / det;
    expect(a * x + 2 * y).toBeCloseTo(4, 10);
    expect(2 * x + a * y).toBeCloseTo(4, 10);
    expect(x).toBeCloseTo(4 / (a + 2), 10);
    expect(y).toBeCloseTo(x, 10);
  });
});

describe('35581 summaries – word problems examples', () => {
  it('car speed is 60 km/h', () => {
    const v = bisect((t) => 240 / t - 240 / (t + 20) - 1, 1, 1000);
    expect(v).toBeCloseTo(60, 8);
  });

  it('x = 20 percent', () => {
    const x = bisect((t) => 200 * (1 + t / 100) * (1 - t / 100) - 192, 0, 100);
    expect(x).toBeCloseTo(20, 8);
  });
});

describe('35581 summaries – sequences examples', () => {
  it('a3=12, a6=96 gives S8 = 765', () => {
    const q = bisect((t) => t ** 3 - 96 / 12, 0, 10);
    const a1 = 12 / q ** 2;
    let sum = 0;
    let term = a1;
    for (let n = 1; n <= 8; n += 1) {
      sum += term;
      term *= q;
    }
    expect(a1).toBeCloseTo(3, 9);
    expect(sum).toBeCloseTo(765, 8);
  });

  it('infinite sum 24, first two 18, positive terms: sum of squares = 192', () => {
    const q = bisect((t) => 24 * (1 - t) * (1 + t) - 18, 0, 0.99);
    const a1 = 24 * (1 - q);
    let sumSquares = 0;
    let term = a1;
    for (let n = 0; n < 200; n += 1) {
      sumSquares += term * term;
      term *= q;
    }
    expect(a1).toBeCloseTo(12, 9);
    expect(sumSquares).toBeCloseTo(192, 8);
  });

  it('a1=64, a(n+1)=a(n)/2: sum 126 after 6 terms', () => {
    let sum = 0;
    let term = 64;
    let n = 0;
    while (sum < 126 - 1e-9 && n < 100) {
      sum += term;
      term /= 2;
      n += 1;
    }
    expect(n).toBe(6);
    expect(sum).toBe(126);
  });
});

describe('35581 summaries – probability examples', () => {
  it('Bayes: P(D)=0.032 and P(A|D)=0.625', () => {
    // two-stage space: machine, then defective (1) / fine (0); conditional rates folded into weights
    const outcomes: Array<[string, number]> = [
      ['A1', 0.4 * 0.05], ['A0', 0.4 * 0.95], ['B1', 0.6 * 0.02], ['B0', 0.6 * 0.98],
    ];
    const pD = enumerateProbability([outcomes], ([o]) => o.endsWith('1'));
    const pAandD = enumerateProbability([outcomes], ([o]) => o === 'A1');
    expect(enumerateProbability([outcomes], () => true)).toBeCloseTo(1, 12);
    expect(pD).toBeCloseTo(0.032, 12);
    expect(pAandD / pD).toBeCloseTo(0.625, 12);
  });

  it('binomial n=5, p=0.3', () => {
    const coin: Array<[number, number]> = [[1, 0.3], [0, 0.7]];
    const spaces = Array.from({ length: 5 }, () => coin);
    const exactlyTwo = enumerateProbability(spaces, (outcome) => outcome.reduce((s, v) => s + v, 0) === 2);
    const atLeastOne = enumerateProbability(spaces, (outcome) => outcome.some((v) => v === 1));
    expect(exactlyTwo).toBeCloseTo(0.3087, 12);
    expect(binomialPmf(5, 2, 0.3)).toBeCloseTo(exactlyTwo, 12);
    expect(atLeastOne).toBeCloseTo(0.83193, 12);
    expect(binomialRange(5, 1, 5, 0.3)).toBeCloseTo(atLeastOne, 12);
  });

  it('independence check gives P(A|B)=0.5', () => {
    const pAB = 0.5 + 0.4 - 0.7;
    expect(pAB).toBeCloseTo(0.5 * 0.4, 12);
    expect(pAB / 0.4).toBeCloseTo(0.5, 12);
  });
});

describe('35581 summaries – euclidean geometry examples', () => {
  // Coordinate model of triangle ABC with AB=6, AC=9, BC=10.
  const B = { x: 0, y: 0 };
  const C = { x: 10, y: 0 };
  const Ax = (36 - 81 + 100) / 20;
  const A = { x: Ax, y: Math.sqrt(36 - Ax * Ax) };

  it('bisector foot D gives BD=4 and DE=3.6', () => {
    // D is where the angle at A is split equally: find it numerically on BC
    const angle = (P: { x: number; y: number }, Q: { x: number; y: number }) => {
      const u = { x: P.x - A.x, y: P.y - A.y };
      const v = { x: Q.x - A.x, y: Q.y - A.y };
      return Math.acos((u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y)));
    };
    const d = bisect((t) => angle(B, { x: t, y: 0 }) - angle({ x: t, y: 0 }, C), 0.001, 9.999);
    expect(distance(A.x, A.y, B.x, B.y)).toBeCloseTo(6, 10);
    expect(distance(A.x, A.y, C.x, C.y)).toBeCloseTo(9, 10);
    expect(d).toBeCloseTo(4, 8);
    // E on AC with DE parallel to AB: intersect line through D with direction AB and line AC
    const dir = { x: A.x - B.x, y: A.y - B.y };
    const s = bisect((t) => {
      const px = d + t * dir.x;
      const py = t * dir.y;
      // signed cross product to line AC
      return (C.x - A.x) * (py - A.y) - (C.y - A.y) * (px - A.x);
    }, 0, 1);
    const E = { x: d + s * dir.x, y: s * dir.y };
    expect(distance(d, 0, E.x, E.y)).toBeCloseTo(3.6, 8);
  });

  it('trapezoid DBCE has area 42 when area(ABC)=50 and AD:DB=2:3', () => {
    const shoelace = (pts: Array<[number, number]>) =>
      Math.abs(pts.reduce((acc, [x1, y1], i) => {
        const [x2, y2] = pts[(i + 1) % pts.length];
        return acc + x1 * y2 - x2 * y1;
      }, 0)) / 2;
    const A: [number, number] = [3, 10];
    const Bp: [number, number] = [0, 0];
    const Cp: [number, number] = [10, 0];
    const D: [number, number] = [A[0] + 0.4 * (Bp[0] - A[0]), A[1] + 0.4 * (Bp[1] - A[1])];
    const E: [number, number] = [A[0] + 0.4 * (Cp[0] - A[0]), A[1] + 0.4 * (Cp[1] - A[1])];
    expect(shoelace([A, Bp, Cp])).toBeCloseTo(50, 10);
    expect(shoelace([D, Bp, Cp, E])).toBeCloseTo(42, 10);
  });

  it('tangents: angle APB = 50 and inscribed angle ACB = 65 degrees', () => {
    const central = degreesToRadians(130);
    const Apt = { x: Math.cos(central / 2), y: Math.sin(central / 2) };
    const Bpt = { x: Math.cos(central / 2), y: -Math.sin(central / 2) };
    // P on the x-axis where tangent at A meets it: OA ⟂ PA
    const p = bisect((t) => Apt.x * (t - Apt.x) + Apt.y * (0 - Apt.y), 1, 10);
    const angleAt = (V: { x: number; y: number }, P1: { x: number; y: number }, P2: { x: number; y: number }) => {
      const u = { x: P1.x - V.x, y: P1.y - V.y };
      const v = { x: P2.x - V.x, y: P2.y - V.y };
      return (Math.acos((u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y))) * 180) / Math.PI;
    };
    expect(angleAt({ x: p, y: 0 }, Apt, Bpt)).toBeCloseTo(50, 8);
    const C = { x: Math.cos(2.5), y: Math.sin(2.5) }; // a point on the major arc
    expect(angleAt(C, Apt, Bpt)).toBeCloseTo(65, 8);
  });
});

describe('35581 summaries – trigonometry examples', () => {
  it('2sin^2x - sin x - 1 = 0 on [0, 2pi]', () => {
    // sin x = 1 is a double-touch root (no sign change), so find it as a critical point
    const f = fn('2*sin(x)^2-sin(x)-1');
    const signChanges = findRoots(f, 0, 2 * Math.PI);
    const touch = findCriticalPoints(f, 0.1, 3).filter((x) => Math.abs(f(x)) < 1e-9);
    const all = [...signChanges, ...touch]
      .sort((a, b) => a - b)
      .filter((x, i, arr) => i === 0 || x - arr[i - 1] > 1e-5);
    expect(all.length).toBe(3);
    expect(all[0]).toBeCloseTo(Math.PI / 2, 6);
    expect(all[1]).toBeCloseTo((7 * Math.PI) / 6, 7);
    expect(all[2]).toBeCloseTo((11 * Math.PI) / 6, 7);
  });

  it('triangle with AB=8, AC=5, angle 60: BC=7, area=10√3, R=7/√3', () => {
    const angle = degreesToRadians(60);
    const A = { x: 0, y: 0 };
    const B = { x: 8, y: 0 };
    const C = { x: 5 * Math.cos(angle), y: 5 * Math.sin(angle) };
    expect(distance(B.x, B.y, C.x, C.y)).toBeCloseTo(7, 10);
    const area = Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)) / 2;
    expect(area).toBeCloseTo(10 * Math.sqrt(3), 10);
    // circumcenter: equidistant from A, B, C -> x = 4, solve for y numerically
    const y = bisect((t) => distance(4, t, A.x, A.y) - distance(4, t, C.x, C.y), -20, 20);
    expect(distance(4, y, A.x, A.y)).toBeCloseTo((7 * Math.sqrt(3)) / 3, 8);
  });

  it('sin 2x = cos x on [0, 2pi) has x = pi/6, pi/2, 5pi/6, 3pi/2', () => {
    const roots = findRoots(fn('sin(2x)-cos(x)'), 0, 2 * Math.PI - 1e-6);
    expect(roots.length).toBe(4);
    [Math.PI / 6, Math.PI / 2, (5 * Math.PI) / 6, (3 * Math.PI) / 2].forEach((value, index) => expect(roots[index]).toBeCloseTo(value, 7));
  });
});

describe('35581 summaries – differential calculus examples', () => {
  it('x^2/(x^2-4): only critical point x=0 (max, value 0), horizontal asymptote 1', () => {
    const f = fn('x^2/(x^2-4)');
    const critical = findCriticalPoints(f, -1.9, 1.9);
    expect(critical.length).toBe(1);
    expect(critical[0]).toBeCloseTo(0, 6);
    expect(numericDerivative(f, -0.5)).toBeGreaterThan(0);
    expect(numericDerivative(f, 0.5)).toBeLessThan(0);
    expect(numericDerivative(f, 3)).toBeLessThan(0);
    expect(numericDerivative(f, -3)).toBeGreaterThan(0);
    expect(findCriticalPoints(f, 2.1, 50).length).toBe(0);
    expect(f(1e6)).toBeCloseTo(1, 9);
  });

  it('x + 2cos x on [0, 2pi]: extrema, inflections and tangent at 0', () => {
    const f = fn('x+2*cos(x)');
    const critical = findCriticalPoints(f, 0, 2 * Math.PI);
    expect(critical.length).toBe(2);
    expect(critical[0]).toBeCloseTo(Math.PI / 6, 6);
    expect(critical[1]).toBeCloseTo((5 * Math.PI) / 6, 6);
    expect(f(critical[0])).toBeCloseTo(2.2556496, 6);
    expect(f(critical[1])).toBeCloseTo(0.8859431, 6);
    const inflections = findInflectionPoints(f, 0.01, 2 * Math.PI - 0.01);
    expect(inflections.length).toBe(2);
    expect(inflections[0]).toBeCloseTo(Math.PI / 2, 5);
    expect(inflections[1]).toBeCloseTo((3 * Math.PI) / 2, 5);
    expect(numericDerivative(f, 0)).toBeCloseTo(1, 7);
    expect(f(0)).toBeCloseTo(2, 12);
    expect(f(2 * Math.PI)).toBeCloseTo(2 * Math.PI + 2, 12);
  });

  it('rectangle under 12-x^2 has maximal area 16 at x=2', () => {
    const area = fn('x*(12-x^2)');
    const critical = findCriticalPoints(area, 0.001, Math.sqrt(12));
    expect(critical.length).toBe(1);
    expect(critical[0]).toBeCloseTo(2, 6);
    expect(area(critical[0])).toBeCloseTo(16, 8);
  });
});

describe('35581 summaries – integral calculus examples', () => {
  it('f(2) = 7 from f\'(x)=3x^2-4x+1 and f(1)=5', () => {
    const fPrime = fn('3x^2-4x+1');
    expect(5 + simpson(fPrime, 1, 2)).toBeCloseTo(7, 10);
  });

  it('area between y=x^2 and y=2x+3 is 32/3', () => {
    const [a, b] = solveQuadratic(1, -2, -3);
    const roots = findRoots(fn('x^2-2x-3'), -10, 10);
    expect(roots[0]).toBeCloseTo(a, 8);
    expect(roots[1]).toBeCloseTo(b, 8);
    expect(simpson(fn('2x+3-x^2'), roots[0], roots[1])).toBeCloseTo(32 / 3, 8);
  });

  it('area under 6x/(x^2+1)^3 on [0,1] is 9/8', () => {
    expect(simpson(fn('6x/(x^2+1)^3'), 0, 1)).toBeCloseTo(1.125, 9);
  });
});
