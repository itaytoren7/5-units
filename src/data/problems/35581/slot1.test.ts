/**
 * Independent numeric verification of 35581 slot 1 (word problems: motion + percentages).
 * Every numericAnswer is recomputed by simulating the motion / solving the time–distance relations
 * numerically (bisection on position functions, grid scans), never by re-evaluating the closed form
 * written in the solution.
 */
import { describe, expect, it } from 'vitest';
import { slot1Problems } from './slot1';
import { bisect, findRoots, type RealFn } from '../verify';

function section(sectionId: string) {
  for (const problem of slot1Problems) {
    const found = problem.sections.find((item) => item.id === sectionId);
    if (found) return found;
  }
  throw new Error(`Unknown section ${sectionId}`);
}

function answer(sectionId: string): number {
  const found = section(sectionId);
  if (found.numericAnswer === undefined) throw new Error(`${sectionId} has no numericAnswer`);
  return found.numericAnswer;
}

function expectAnswer(sectionId: string, computed: number, digits = 8) {
  expect(answer(sectionId)).toBeCloseTo(computed, digits);
}

/** First time in [lo, hi] at which two position functions coincide (sign change of their difference). */
function meetingTime(a: RealFn, b: RealFn, lo: number, hi: number): number {
  return bisect((t) => a(t) - b(t), lo, hi);
}

/** First t in [lo, hi] (grid scan + refinement) at which g(t) crosses `level` from below. */
function firstCrossing(g: RealFn, level: number, lo: number, hi: number, steps = 20000): number {
  const h = (hi - lo) / steps;
  for (let i = 1; i <= steps; i += 1) {
    const t0 = lo + (i - 1) * h;
    const t1 = lo + i * h;
    if (g(t0) < level && g(t1) >= level) return bisect((t) => g(t) - level, t0, t1);
  }
  throw new Error('no crossing');
}

describe('35581 slot 1 structure', () => {
  it('has the required number of bagrut-style problems with valid sections', () => {
    expect(slot1Problems.length).toBeGreaterThanOrEqual(3);
    for (const problem of slot1Problems) {
      expect(problem.slot).toBe(1);
      expect(problem.topicId).toBe('word-problems');
      expect(problem.subtopicIds.every((id) => id === 'word-motion' || id === 'word-percentages')).toBe(true);
      expect(problem.sections.length).toBeGreaterThanOrEqual(3);
      expect(problem.sections.length).toBeLessThanOrEqual(4);
      expect(problem.sections.map((s) => s.label)).toEqual(['א', 'ב', 'ג', 'ד'].slice(0, problem.sections.length));
      problem.sections.forEach((s, index) => {
        expect(s.id).toBe(`${problem.id}-${['a', 'b', 'c', 'd'][index]}`);
        expect(s.hints.length).toBeGreaterThanOrEqual(2);
        expect(s.hints.length).toBeLessThanOrEqual(3);
        expect(s.solutionSteps.length).toBeGreaterThanOrEqual(3);
        expect(s.solutionSteps.length).toBeLessThanOrEqual(8);
      });
    }
    const difficulties = slot1Problems.map((problem) => problem.difficulty);
    expect(difficulties.every((d) => d === 2 || d === 3)).toBe(true);
    expect(Math.max(...difficulties)).toBe(3);
    expect(difficulties.filter((d) => d === 3).length * 3).toBeGreaterThanOrEqual(slot1Problems.length);
  });
});

describe('35581-1-1 – meeting, then the truck speeds up (d = 200, meet after 2 h, +20 km/h, 40 min gap)', () => {
  // Unknown car speed v; truck speed u = 100 - v follows from the meeting after 2 h.
  // Positions measured from A. After the meeting the car keeps v, the truck drives back at u + 20.
  const carArrival = (v: number) => 200 / v; // car reaches B
  const truckArrival = (v: number) => {
    const u = 100 - v;
    const truckPos: RealFn = (t) => (t <= 2 ? 200 - u * t : 200 - 2 * u - (u + 20) * (t - 2));
    return bisect(truckPos, 2, 50); // truck reaches A (position 0)
  };
  const v = bisect((x) => truckArrival(x) - carArrival(x) - 40 / 60, 1, 99);
  const u = 100 - v;

  it('model satisfies the givens', () => {
    expect(v * 2 + u * 2).toBeCloseTo(200, 10); // they meet after 2 h
    expect(truckArrival(v) - carArrival(v)).toBeCloseTo(40 / 60, 9);
    expect(v).toBeGreaterThan(0);
    expect(u).toBeGreaterThan(0);
  });
  it('35581-1-1-a (claimed after-meeting times match the simulation)', () => {
    for (const x of [45, 60, 75]) {
      expect(carArrival(x) - 2).toBeCloseTo((200 - 2 * x) / x, 10);
      expect(truckArrival(x) - 2).toBeCloseTo((2 * x) / (120 - x), 8);
    }
  });
  it('35581-1-1-b', () => expectAnswer('35581-1-1-b', v));
  it('35581-1-1-c', () => {
    const average = 200 / truckArrival(v);
    expect(average).toBeCloseTo(50, 8);
    expectAnswer('35581-1-1-c', ((average - u) / u) * 100);
  });
  it('35581-1-1-d', () => {
    const car: RealFn = (t) => v * t;
    const truck: RealFn = (t) => (t <= 0.5 ? 200 : 200 - u * (t - 0.5));
    const t = meetingTime(car, truck, 0.5, 10);
    expectAnswer('35581-1-1-d', car(t));
  });
});

describe('35581-1-2 – round trip, return 10 km/h slower and 30 min longer (30 km)', () => {
  const timeOut = (v: number) => 30 / v;
  const timeBack = (v: number) => 30 / (v - 10);
  const v = bisect((x) => timeBack(x) - timeOut(x) - 0.5, 10.01, 500);

  it('model satisfies the givens', () => {
    expect(timeBack(v) - timeOut(v)).toBeCloseTo(0.5, 10);
    expect(v - 10).toBeGreaterThan(0);
    // the other root of the same relation is negative (no second admissible speed)
    expect(findRoots((x) => timeBack(x) - timeOut(x) - 0.5, 10.01, 500).length).toBe(1);
  });
  it('35581-1-2-a', () => expectAnswer('35581-1-2-a', v));
  it('35581-1-2-b', () => expectAnswer('35581-1-2-b', 60 / (timeOut(v) + timeBack(v))));
  it('35581-1-2-c', () => {
    const first: RealFn = (t) => 30 - (v - 10) * t; // from the lake towards the city
    const second: RealFn = (t) => 1.5 * (v - 10) * t; // from the city towards the lake
    const t = meetingTime(first, second, 0, 5);
    expectAnswer('35581-1-2-c', second(t));
  });
  it('35581-1-2-d (claimed average-speed formula and inequality)', () => {
    for (const [v1, v2, s] of [[30, 20, 30], [50, 40, 7], [12, 36, 100]]) {
      const average = (2 * s) / (s / v1 + s / v2);
      expect(average).toBeCloseTo((2 * v1 * v2) / (v1 + v2), 10);
      expect(average).toBeLessThan((v1 + v2) / 2);
      expect((v1 + v2) / 2 - average).toBeCloseTo((v1 - v2) ** 2 / (2 * (v1 + v2)), 10);
    }
  });
});

describe('35581-1-3 – overtaking, 30 min stop at B, meeting on the way back (AB = 150)', () => {
  // Truck leaves A at T = 0 at speed u; car leaves at T = 1 at speed v, stops 0.5 h at B, returns.
  const positions = (u: number, v: number) => {
    const truck: RealFn = (T) => Math.min(u * T, 150);
    const atB = 1 + 150 / v;
    const car: RealFn = (T) => {
      if (T <= 1) return 0;
      if (T <= atB) return v * (T - 1);
      if (T <= atB + 0.5) return 150;
      return Math.max(150 - v * (T - atB - 0.5), 0);
    };
    return { truck, car, atB };
  };
  // Solve the two givens (overtaking at 60 km from A, second meeting 20 km from B) for u and v.
  const uFromOvertaking = (v: number) => {
    // overtaking happens when the truck has driven 60 km, i.e. at T = 1 + 60 / v
    return 60 / (1 + 60 / v);
  };
  const secondMeetingPosition = (v: number) => {
    const u = uFromOvertaking(v);
    const { truck, car, atB } = positions(u, v);
    const T = meetingTime(car, truck, atB + 0.5, atB + 0.5 + 150 / v);
    return truck(T);
  };
  const v = bisect((x) => secondMeetingPosition(x) - 130, 20, 500);
  const u = uFromOvertaking(v);
  const { truck, car, atB } = positions(u, v);

  it('model satisfies the givens', () => {
    const overtake = meetingTime(car, truck, 1.0001, atB);
    expect(truck(overtake)).toBeCloseTo(60, 8);
    const second = meetingTime(car, truck, atB + 0.5, atB + 0.5 + 150 / v);
    expect(150 - truck(second)).toBeCloseTo(20, 8);
    expect(u).toBeGreaterThan(0);
    expect(v).toBeGreaterThan(u);
  });
  it('35581-1-3-a (the two claimed equations hold for the model)', () => {
    expect(60 / u).toBeCloseTo(1 + 60 / v, 8);
    expect(130 / u).toBeCloseTo(1.5 + 170 / v, 8);
  });
  it('35581-1-3-b', () => expectAnswer('35581-1-3-b', v));
  it('35581-1-3-c', () => {
    const carTime = atB - 1;
    const truckTime = bisect((T) => u * T - 150, 0, 100);
    expectAnswer('35581-1-3-c', ((truckTime - carTime) / truckTime) * 100);
  });
  it('35581-1-3-d', () => {
    const gap: RealFn = (T) => Math.abs(car(T) - truck(T));
    expectAnswer('35581-1-3-d', firstCrossing(gap, 40, 0, 8), 7);
  });
});

describe('35581-1-4 – circular track of 1 km (lap times T and T + 1 min, first overtaking after 6 min)', () => {
  // Cumulative distance (km) as a function of time in minutes for a given lap time.
  const ride = (lapMinutes: number): RealFn => (t) => t / lapMinutes;
  const firstOvertaking = (T: number) => bisect((t) => ride(T)(t) - ride(T + 1)(t) - 1, 0, 1e4);
  const T = bisect((x) => firstOvertaking(x) - 6, 0.1, 50);
  const speedA = 60 / T; // km/h
  const speedB = 60 / (T + 1);

  it('model satisfies the givens', () => {
    expect(firstOvertaking(T)).toBeCloseTo(6, 9);
    expect(T + 1 - T).toBe(1);
    expect(speedA).toBeCloseTo(30, 8);
    expect(speedB).toBeCloseTo(20, 8);
  });
  it('35581-1-4-a', () => expectAnswer('35581-1-4-a', T));
  // Opposite directions: B's position on the circle is measured in A's direction as -distance.
  const angleGap: RealFn = (t) => ride(T)(t) + ride(T + 1)(t); // laps of separation along the circle
  const kthMeeting = (k: number) => bisect((t) => angleGap(t) - k, 0, 100);
  it('35581-1-4-b', () => expectAnswer('35581-1-4-b', kthMeeting(1) * 60));
  it('35581-1-4-c', () => {
    const t3 = kthMeeting(3);
    const posA = ride(T)(t3) % 1;
    const posB = (((-ride(T + 1)(t3)) % 1) + 1) % 1;
    expect(posA).toBeCloseTo(posB, 9);
    expectAnswer('35581-1-4-c', posA);
  });
  it('35581-1-4-d', () => {
    const intervalFor = (p: number) => {
      const newB = speedB * (1 + p / 100);
      return bisect((t) => ((speedA - newB) * t) / 60 - 1, 0, 1e5); // minutes until A gains one lap
    };
    expectAnswer('35581-1-4-d', bisect((p) => intervalFor(p) - 10, 0, 49));
  });
});

describe('35581-1-5 – boat with / against the current (still-water speed 10, 24 km each way)', () => {
  const roundTrip = (u: number) => {
    const down = bisect((t) => (10 + u) * t - 24, 0, 100);
    const back = bisect((t) => (10 - u) * t - 24, 0, 1e4);
    return down + back;
  };
  const u = bisect((x) => roundTrip(x) - 5, 0.01, 9.99);

  it('model satisfies the givens', () => {
    expect(roundTrip(u)).toBeCloseTo(5, 9);
    expect(u).toBeGreaterThan(0);
    expect(u).toBeLessThan(10);
  });
  it('35581-1-5-a', () => expectAnswer('35581-1-5-a', u));
  it('35581-1-5-b', () => {
    const tQ = 24 / (10 + u);
    const boat: RealFn = (t) => (t <= tQ ? (10 + u) * t : 24 - (10 - u) * (t - tQ));
    const raft: RealFn = (t) => u * t;
    const t = meetingTime(boat, raft, tQ, 20);
    expectAnswer('35581-1-5-b', raft(t));
  });
  it('35581-1-5-c', () => {
    const flood = bisect((x) => roundTrip(x) - 7.5, 0.01, 9.99);
    expectAnswer('35581-1-5-c', ((flood - u) / u) * 100);
  });
  it('35581-1-5-d (claimed closed form, lower bound and monotonicity)', () => {
    let previous = roundTrip(0);
    expect(previous).toBeCloseTo(4.8, 9);
    for (let x = 0.5; x < 10; x += 0.5) {
      const current = roundTrip(x);
      expect(current).toBeCloseTo(480 / (100 - x * x), 8);
      expect(current).toBeGreaterThan(previous);
      previous = current;
    }
  });
});

describe('35581-1-6 – pedestrian and cyclist, speeds raised by 25% (12 km)', () => {
  const w = bisect((x) => 12 / x - 12 / (x + 8) - 2, 0.1, 100);
  const c = w + 8;
  const tVillage = 12 / c;
  const pedestrian: RealFn = (t) => (t <= 1 ? w * t : w + 1.25 * w * (t - 1));
  const cyclist: RealFn = (t) => (t <= tVillage ? c * t : 12 - 1.25 * c * (t - tVillage));

  it('model satisfies the givens', () => {
    expect(12 / w - 12 / c).toBeCloseTo(2, 10);
    expect(c - w).toBeCloseTo(8, 12);
    expect(tVillage).toBeCloseTo(1, 9); // both speed changes happen at the same moment
  });
  it('35581-1-6-a', () => expectAnswer('35581-1-6-a', w));
  it('35581-1-6-b', () => {
    const t = meetingTime(pedestrian, cyclist, tVillage + 1e-9, 5);
    expectAnswer('35581-1-6-b', pedestrian(t));
  });
  it('35581-1-6-c', () => {
    const cyclistHome = bisect(cyclist, tVillage + 1e-9, 10);
    const pedestrianArrives = bisect((t) => pedestrian(t) - 12, 0, 20);
    expectAnswer('35581-1-6-c', (pedestrianArrives - cyclistHome) * 60);
  });
  it('35581-1-6-d', () => {
    const arrival = (p: number) => bisect((t) => (t <= 1 ? w * t : w + w * (1 + p / 100) * (t - 1)) - 12, 0, 50);
    expectAnswer('35581-1-6-d', bisect((p) => arrival(p) - 7 / 3, 0, 200));
  });
});

describe('35581-1-7 – notebooks: price drop by 6 gives 5 more for 600, successive percentage changes', () => {
  const x = bisect((price) => 600 / (price - 6) - 600 / price - 5, 6.01, 1000);

  it('model satisfies the givens', () => {
    expect(600 / (x - 6) - 600 / x).toBeCloseTo(5, 9);
    expect(Number.isInteger(Math.round(600 / x)) && Math.abs(600 / x - Math.round(600 / x)) < 1e-9).toBe(true);
    expect(Math.abs(600 / (x - 6) - Math.round(600 / (x - 6)))).toBeLessThan(1e-9);
  });
  it('35581-1-7-a', () => expectAnswer('35581-1-7-a', x));
  it('35581-1-7-b', () => {
    const raise = bisect((p) => (x - 6) * (1 + p / 100) - x, 0, 100);
    expectAnswer('35581-1-7-b', raise);
    expect(((x - (x - 6)) / x) * 100).toBeCloseTo(20, 9);
  });
  it('35581-1-7-c', () => {
    const final = (p: number) => (x - 6) * (1 + p / 100) * (1 - (2 * p) / 100);
    const roots = findRoots((p) => final(p) - 17.28, 0, 50);
    expect(roots.length).toBe(1);
    expectAnswer('35581-1-7-c', roots[0]);
  });
  it('35581-1-7-d', () => {
    let price = 17.28;
    const r = bisect((q) => 17.28 * (1 + q / 100) * (1 + q / 100) - 27, 0, 100);
    for (let i = 0; i < 2; i += 1) price *= 1 + r / 100;
    expect(price).toBeCloseTo(27, 9);
    expect(((price - x) / x) * 100).toBeCloseTo(-10, 8);
    expectAnswer('35581-1-7-d', r);
  });
});

describe('35581-1-8 – 320 km, +20 km/h saves 48 min, fuel consumption with a 25% increase', () => {
  const tripTime = (speed: number) => bisect((t) => speed * t - 320, 0, 1000);
  const v = bisect((s) => tripTime(s) - tripTime(s + 20) - 0.8, 1, 1000);
  const perKmSlow = 7.5 / 100;
  const perKmFast = perKmSlow * 1.25;

  it('model satisfies the givens', () => {
    expect(tripTime(v) - tripTime(v + 20)).toBeCloseTo(0.8, 9);
    expect(v).toBeGreaterThan(0);
  });
  it('35581-1-8-a', () => expectAnswer('35581-1-8-a', v));
  it('35581-1-8-b', () => {
    expect(((v + 20 - v) / v) * 100).toBeCloseTo(25, 9);
    expectAnswer('35581-1-8-b', ((tripTime(v) - tripTime(v + 20)) / tripTime(v)) * 100);
  });
  it('35581-1-8-c', () => {
    // integrate fuel kilometre by kilometre
    let slow = 0;
    let fast = 0;
    for (let km = 0; km < 320; km += 1) {
      slow += perKmSlow;
      fast += perKmFast;
    }
    expectAnswer('35581-1-8-c', fast - slow);
  });
  it('35581-1-8-d', () => {
    const km = bisect((d) => d * perKmSlow + (320 - d) * perKmFast - 27, 0, 320);
    const time = tripTime(v) * (km / 320) + tripTime(v + 20) * ((320 - km) / 320);
    expect(((tripTime(v) - time) / tripTime(v)) * 100).toBeCloseTo(10, 8);
    expectAnswer('35581-1-8-d', time);
  });
});
