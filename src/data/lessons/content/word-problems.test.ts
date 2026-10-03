/**
 * Independent numeric verification of the word-problem lessons (motion + percentages).
 * Every answer is recomputed by simulating the story: bodies move along a line (or a circular track)
 * leg by leg, meetings are found by root finding on position differences, and unknown speeds / percents
 * are found by bisection on the defining condition of the statement. Percent stories are replayed step by
 * step. No test re-evaluates the closed form written in a solution.
 */
import { describe, expect, it } from 'vitest';
import { bisect, findRoots, type RealFn } from '../../problems/verify';
import { wordProblemsContent } from './word-problems';

const ex = (id: string) => Object.values(wordProblemsContent).flatMap((lesson) => lesson.exercises).find((e) => e.id === id)!;

const verified = new Set<string>();

function expectAnswers(id: string, computed: number[], digits = 8) {
  const exercise = ex(id);
  expect(exercise, id).toBeDefined();
  expect(exercise.answers?.length, `${id}: number of answers`).toBe(computed.length);
  computed.forEach((value, index) => expect(exercise.answers![index].value, `${id} answer ${index + 1}`).toBeCloseTo(value, digits));
  verified.add(id);
}

/** The single root of f on [lo, hi]; fails the test if there is none or more than one. */
function uniqueRoot(f: RealFn, lo: number, hi: number, steps = 400): number {
  const roots = findRoots(f, lo, hi, steps);
  expect(roots.length, `expected exactly one root on [${lo}, ${hi}], got ${roots.join(', ')}`).toBe(1);
  return roots[0];
}

// ---------- motion simulation ----------

type Leg = { to: number; speed: number } | { wait: number };

interface Journey {
  /** Position along the road (km or m) at time t. */
  position: RealFn;
  /** Time at which the last leg ends. */
  end: number;
  /** Times at which a leg starts or ends (the position is linear between consecutive breaks). */
  breaks: number[];
}

/** A body that is at `start` until time `t0` and then drives the legs one after another at constant speeds. */
function journey(start: number, t0: number, legs: Leg[]): Journey {
  const segments: Array<{ from: number; until: number; x0: number; x1: number }> = [];
  let time = t0;
  let pos = start;
  const breaks = [t0];
  for (const leg of legs) {
    if ('wait' in leg) {
      segments.push({ from: time, until: time + leg.wait, x0: pos, x1: pos });
      time += leg.wait;
    } else {
      if (!(leg.speed > 0)) throw new Error(`non-positive speed ${leg.speed}`);
      const duration = Math.abs(leg.to - pos) / leg.speed;
      segments.push({ from: time, until: time + duration, x0: pos, x1: leg.to });
      time += duration;
      pos = leg.to;
    }
    breaks.push(time);
  }
  const position = (t: number) => {
    if (t <= t0) return start;
    for (const s of segments) {
      if (t <= s.until) return s.until === s.from ? s.x1 : s.x0 + ((s.x1 - s.x0) * (t - s.from)) / (s.until - s.from);
    }
    return pos;
  };
  return { position, end: time, breaks };
}

/** Travel time of a single leg of length `distance` at `speed`. */
const tripTime = (distance: number, speed: number) => journey(0, 0, [{ to: distance, speed }]).end;

/** First time in [lo, hi] at which two bodies are at the same place (sign change of the difference). */
const meetTime = (a: Journey, b: Journey, lo: number, hi: number) => bisect((t) => a.position(t) - b.position(t), lo, hi);

/**
 * All times in [lo, hi] at which two bodies are at the same place, found exactly: between consecutive
 * breaks both positions are linear, so the difference is linear too. Catches touching meetings
 * (e.g. both bodies reaching an end point together) that a sign-change search would miss.
 */
function meetings(a: Journey, b: Journey, lo: number, hi: number): number[] {
  const points = [...new Set([lo, hi, ...a.breaks, ...b.breaks].filter((t) => t >= lo && t <= hi))].sort((x, y) => x - y);
  const diff = (t: number) => a.position(t) - b.position(t);
  const found: number[] = [];
  for (let i = 0; i < points.length - 1; i += 1) {
    const s = points[i];
    const e = points[i + 1];
    const ds = diff(s);
    const de = diff(e);
    if (Math.abs(ds) < 1e-9) found.push(s);
    else if (Math.abs(de) >= 1e-9 && Math.sign(ds) !== Math.sign(de)) found.push(s + ((e - s) * ds) / (ds - de));
  }
  if (Math.abs(diff(points[points.length - 1])) < 1e-9) found.push(points[points.length - 1]);
  return found.filter((t, i, all) => i === 0 || t - all[i - 1] > 1e-7);
}

/** A body shuttling between `start` and `end` (turning back immediately), for n legs. */
function shuttle(start: number, end: number, speed: number, n = 6): Journey {
  const legs: Leg[] = [];
  for (let i = 0; i < n; i += 1) legs.push({ to: i % 2 === 0 ? end : start, speed });
  return journey(start, 0, legs);
}

/**
 * Circular track of length L: arcA, arcB are the signed distances travelled (opposite direction = negative).
 * The bodies coincide exactly when arcA - arcB is a multiple of L. Returns the meeting times in (0, T].
 */
function circularMeetings(arcA: RealFn, arcB: RealFn, L: number, T: number, steps = 20000): number[] {
  const laps = (t: number) => (arcA(t) - arcB(t)) / L;
  const times: number[] = [];
  const h = T / steps;
  for (let i = 1; i <= steps; i += 1) {
    const t0 = (i - 1) * h;
    const t1 = i * h;
    const k0 = Math.floor(laps(t0));
    const k1 = Math.floor(laps(t1));
    for (let k = Math.min(k0, k1) + 1; k <= Math.max(k0, k1); k += 1) times.push(bisect((t) => laps(t) - k, t0, t1));
  }
  return times.filter((t) => t > 1e-9);
}

/** Position on the circle (in [0, L)) for a signed arc length. */
const onCircle = (arc: number, L: number) => ((arc % L) + L) % L;

// ---------- percentage simulation ----------

/** Apply successive percentage changes (+ = increase, - = decrease), each to the current value. */
function applyChanges(value: number, percents: number[]): number {
  let current = value;
  for (const p of percents) current += (current * p) / 100;
  return current;
}

describe('word-problems lessons: structure', () => {
  it('has content only for the in-scope lessons, with the requested exercise counts', () => {
    expect(Object.keys(wordProblemsContent).sort()).toEqual(['word-motion', 'word-motion-advanced', 'word-motion-practice', 'word-percentages']);
    for (const id of ['word-motion', 'word-motion-advanced', 'word-percentages']) {
      const exercises = wordProblemsContent[id].exercises;
      expect(exercises.length, id).toBe(12);
      expect(exercises.filter((e) => e.difficulty === 1).length, `${id}: warm-ups`).toBeGreaterThanOrEqual(3);
      expect(exercises.filter((e) => e.difficulty === 3).length, `${id}: hard`).toBeGreaterThanOrEqual(3);
      const order = exercises.map((e) => e.difficulty);
      expect(order, `${id}: easy to hard`).toEqual([...order].sort((a, b) => a - b));
    }
    const practice = wordProblemsContent['word-motion-practice'].exercises;
    expect(practice.length).toBe(8);
    expect(practice.every((e) => e.difficulty >= 2)).toBe(true);
    for (const lesson of Object.values(wordProblemsContent)) for (const e of lesson.exercises) expect(e.answers?.length, e.id).toBeGreaterThan(0);
  });
});

describe('word-motion', () => {
  it('word-motion-1', () => {
    const car = journey(0, 0, [{ to: 210, speed: 60 }]);
    const truck = journey(210, 0, [{ to: 0, speed: 45 }]);
    const [t] = findRoots((x) => car.position(x) - truck.position(x), 0, 10);
    expect(truck.position(t)).toBeCloseTo(car.position(t), 9);
    expectAnswers('word-motion-1', [t, car.position(t)]);
  });

  it('word-motion-2', () => {
    const delay = 40 / 60;
    const cyclist = journey(0, 0, [{ to: 100, speed: 18 }]);
    const moto = journey(0, delay, [{ to: 100, speed: 42 }]);
    const [t] = findRoots((x) => moto.position(x) - cyclist.position(x), delay + 1e-9, 5);
    expectAnswers('word-motion-2', [(t - delay) * 60, moto.position(t)]);
  });

  it('word-motion-3', () => {
    const trip = journey(0, 0, [{ to: 120, speed: 60 }, { to: 0, speed: 40 }]);
    const average = 240 / trip.end;
    expect(Math.abs(average - 50)).toBeGreaterThan(1);
    expectAnswers('word-motion-3', [average]);
  });

  it('word-motion-4', () => {
    const v = uniqueRoot((s) => tripTime(360, s) - tripTime(360, s + 18) - 1, 1, 1000);
    expectAnswers('word-motion-4', [v, tripTime(360, v)]);
  });

  it('word-motion-5', () => {
    // clock times in hours: car leaves at 7, truck at 8
    const meeting = (v: number) => meetTime(journey(0, 7, [{ to: 260, speed: v }]), journey(260, 8, [{ to: 0, speed: v - 20 }]), 8, 60);
    const v = uniqueRoot((s) => meeting(s) - 10, 25, 200);
    const car = journey(0, 7, [{ to: 260, speed: v }]);
    const truck = journey(260, 8, [{ to: 0, speed: v - 20 }]);
    expect(truck.position(10)).toBeCloseTo(car.position(10), 8);
    expectAnswers('word-motion-5', [v, v - 20, car.position(10)]);
  });

  it('word-motion-6', () => {
    const roundTrip = (u: number) => journey(0, 0, [{ to: 40, speed: 18 + u }, { to: 0, speed: 18 - u }]).end;
    const u = uniqueRoot((s) => roundTrip(s) - 4.5, 0, 17.5);
    expectAnswers('word-motion-6', [u]);
  });

  it('word-motion-7', () => {
    const planned = (v: number) => tripTime(60, v);
    const actual = (v: number) => journey(0, 0, [{ to: 20, speed: v }, { wait: 20 / 60 }, { to: 60, speed: v + 4 }]).end;
    const v = uniqueRoot((s) => actual(s) - planned(s), 1, 200);
    expect(actual(v)).toBeCloseTo(planned(v), 9);
    expectAnswers('word-motion-7', [v, planned(v)]);
  });

  it('word-motion-8', () => {
    // the return speed v - 3 must be positive, so the physical domain is v > 3
    const total = (v: number) => journey(0, 0, [{ to: 36, speed: v }, { to: 0, speed: v - 3 }]).end;
    const v = uniqueRoot((s) => total(s) - 7, 3.0001, 300);
    expectAnswers('word-motion-8', [v, v - 3]);
  });

  it('word-motion-9', () => {
    const up = (v: number) => tripTime(48, v - 2);
    const down = (v: number) => tripTime(48, v + 2);
    const v = uniqueRoot((s) => up(s) - down(s) - 1, 2.01, 500);
    expectAnswers('word-motion-9', [v, down(v)]);
  });

  it('word-motion-10', () => {
    const D = 240;
    const model = (v1: number, v2: number) => {
      const car = journey(0, 0, [{ to: D, speed: v1 }]);
      const truck = journey(D, 0, [{ to: 0, speed: v2 }]);
      return { car, truck, t: meetTime(car, truck, 0, 1e4) };
    };
    // for a given truck speed, the car speed for which the car needs exactly 1 h after the meeting
    const carSpeedFor = (v2: number) => bisect((v1) => { const m = model(v1, v2); return m.car.end - m.t - 1; }, 1e-3, 1e4);
    const v2 = uniqueRoot((s) => { const m = model(carSpeedFor(s), s); return m.truck.end - m.t - 4; }, 1, 500, 200);
    const v1 = carSpeedFor(v2);
    const m = model(v1, v2);
    expect(m.truck.end - m.t).toBeCloseTo(4, 7);
    expectAnswers('word-motion-10', [m.t, v1, v2], 6);
  });

  it('word-motion-11', () => {
    const bus = (v: number) => journey(0, 0, [{ to: 150, speed: v }]);
    const car = (v: number) => journey(0, 0.5, [{ to: 150, speed: v + 25 }]);
    const v = uniqueRoot((s) => bus(s).end - car(s).end - 0.5, 1, 1000);
    const b = bus(v);
    const c = car(v);
    expect(c.position(0.5)).toBe(0);
    const [t] = findRoots((x) => c.position(x) - b.position(x), 0.5 + 1e-9, c.end);
    expectAnswers('word-motion-11', [v, v + 25, b.position(t)]);
  });

  it('word-motion-12', () => {
    const D = 50;
    const model = (v1: number, v2: number) => {
      const a = journey(0, 0, [{ to: D, speed: v1 }]);
      const b = journey(D, 0, [{ to: 0, speed: v2 }]);
      return { a, b, t: meetTime(a, b, 0, 1e4) };
    };
    // the second rider's speed for which they meet after exactly 2 hours
    const v2For = (v1: number) => bisect((v2) => model(v1, v2).t - 2, 1e-6, 1e4);
    const v1 = uniqueRoot((s) => { const m = model(s, v2For(s)); return m.b.end - m.a.end - 5 / 3; }, 12.6, 24.9, 200);
    const v2 = v2For(v1);
    expect(model(v1, v2).t).toBeCloseTo(2, 8);
    expectAnswers('word-motion-12', [v1, v2], 6);
  });
});

describe('word-motion-advanced', () => {
  it('word-motion-advanced-1', () => {
    const L = 400;
    const arcA = (t: number) => 5 * t;
    const arcB = (t: number) => -3 * t;
    const times = circularMeetings(arcA, arcB, L, 540);
    expect(onCircle(arcA(times[0]), L)).toBeCloseTo(onCircle(arcB(times[0]), L), 6);
    expectAnswers('word-motion-advanced-1', [times[0], times.length]);
  });

  it('word-motion-advanced-2', () => {
    const L = 3;
    const arcFast = (t: number) => 24 * t;
    const arcSlow = (t: number) => 18 * t;
    const [t] = circularMeetings(arcFast, arcSlow, L, 5);
    expect(onCircle(arcFast(t), L)).toBeCloseTo(onCircle(arcSlow(t), L), 8);
    expectAnswers('word-motion-advanced-2', [t * 60, Math.floor(arcFast(t) / L + 1e-9)]);
  });

  it('word-motion-advanced-3', () => {
    const before = tripTime(150, 75);
    const after = tripTime(150, applyChanges(75, [20]));
    expectAnswers('word-motion-advanced-3', [(before - after) * 60, ((before - after) / before) * 100]);
  });

  it('word-motion-advanced-4', () => {
    const L = 300;
    const firstMeeting = (lapA: number, opposite: boolean) => {
      const vA = L / lapA;
      const vB = L / (lapA + 30);
      return circularMeetings((t) => vA * t, (t) => (opposite ? -vB : vB) * t, L, 2000, 8000)[0];
    };
    const lapA = uniqueRoot((T) => firstMeeting(T, true) - 36, 5, 300, 300);
    expectAnswers('word-motion-advanced-4', [lapA, lapA + 30, firstMeeting(lapA, false)], 6);
  });

  it('word-motion-advanced-5', () => {
    const v = uniqueRoot((s) => tripTime(240, s) - tripTime(240, applyChanges(s, [25])) - 48 / 60, 1, 1000);
    expectAnswers('word-motion-advanced-5', [v, applyChanges(v, [25])]);
  });

  it('word-motion-advanced-6', () => {
    const bus = journey(0, 0, [{ to: 340, speed: 60 }]);
    const car = journey(340, 1, [{ to: 0, speed: 80 }]);
    const gap = (t: number) => Math.abs(car.position(t) - bus.position(t));
    expect(gap(1)).toBeCloseTo(280, 9);
    const times = findRoots((t) => gap(t) - 70, 0, Math.min(bus.end, car.end));
    expect(times.length).toBe(2);
    expectAnswers('word-motion-advanced-6', times);
  });

  it('word-motion-advanced-7', () => {
    const PQ = 18;
    // for a given still-water speed v, the current u for which going upstream takes 2 hours
    const currentFor = (v: number) => bisect((u) => tripTime(PQ, v - u) - 2, 0, v - 1e-9);
    const v = uniqueRoot((s) => journey(PQ, 0, [{ to: 0, speed: s + currentFor(s) }]).end - 1.2, 9.5, 100);
    const u = currentFor(v);
    const boat = journey(0, 0, [{ to: PQ, speed: v - u }]);
    const raft = journey(PQ, 0, [{ to: 0, speed: u }]);
    const t = meetTime(boat, raft, 0, 50);
    expectAnswers('word-motion-advanced-7', [v, u, boat.position(t)]);
  });

  it('word-motion-advanced-8', () => {
    const v1 = uniqueRoot((s) => journey(0, 8, [{ to: 300, speed: s }]).position(11) - 150, 1, 1000);
    const v2 = uniqueRoot((s) => 300 - journey(300, 9, [{ to: 0, speed: s }]).position(11) - 150, 1, 1000);
    const a = journey(0, 8, [{ to: 300, speed: v1 }]);
    const b = journey(300, 8, [{ to: 0, speed: v2 }]);
    const t = meetTime(a, b, 8, 30);
    expectAnswers('word-motion-advanced-8', [v1, v2, a.position(t)]);
  });

  it('word-motion-advanced-9', () => {
    const cyclist = journey(0, 0, [{ to: 50, speed: 15 }]);
    const moto = journey(0, 1, [{ to: 50, speed: 45 }, { wait: 20 / 60 }, { to: 0, speed: 45 }]);
    const times = findRoots((t) => moto.position(t) - cyclist.position(t), 1 + 1e-9, cyclist.end - 1e-9);
    expect(times.length).toBe(2);
    expectAnswers('word-motion-advanced-9', [cyclist.position(times[0]), cyclist.position(times[1])]);
  });

  it('word-motion-advanced-10', () => {
    const D = 180;
    const meetingPoint = (v1: number, v2: number, headStart: number) => {
      const car = journey(0, 0, [{ to: D, speed: v1 }]);
      const truck = journey(D, headStart, [{ to: 0, speed: v2 }]);
      const t = meetTime(car, truck, 0, 1e4);
      return { t, x: car.position(t) };
    };
    // the truck speed for which a simultaneous start gives a meeting after 1.5 hours
    const truckFor = (v1: number) => bisect((v2) => meetingPoint(v1, v2, 0).t - 1.5, 1e-6, 1e4);
    const v1 = uniqueRoot((s) => meetingPoint(s, truckFor(s), 0.8).x - D / 2, 1, 119, 200);
    const v2 = truckFor(v1);
    expectAnswers('word-motion-advanced-10', [v1, v2], 6);
  });

  it('word-motion-advanced-11', () => {
    // vA from "after 1 hour, 12 km from A"; vB from "they meet after 1 hour"; D from the second meeting
    const vA = bisect((v) => journey(0, 0, [{ to: 1000, speed: v }]).position(1) - 12, 1e-3, 1e3);
    const model = (D: number) => {
      const vB = bisect((v) => meetTime(journey(0, 0, [{ to: D, speed: vA }]), journey(D, 0, [{ to: 0, speed: v }]), 0, 1e4) - 1, 1e-6, 1e4);
      const a = shuttle(0, D, vA);
      const b = shuttle(D, 0, vB);
      const second = meetings(a, b, 1e-9, 20)[1];
      // "both on their way back": each rider is strictly inside his second leg (turned once, not yet home)
      const bothTurned = second > a.breaks[1] && second < a.breaks[2] && second > b.breaks[1] && second < b.breaks[2];
      return { vB, second, bothTurned, fromB: D - a.position(second) };
    };
    // scan the distances for which the second meeting happens with both riders on their way back
    const candidates: number[] = [];
    for (let D = 13.1; D < 100; D += 0.5) {
      const m0 = model(D);
      const m1 = model(D + 0.5);
      if (m0.bothTurned && m1.bothTurned && Math.sign(m0.fromB - 6) !== Math.sign(m1.fromB - 6)) candidates.push(bisect((x) => model(x).fromB - 6, D, D + 0.5));
    }
    expect(candidates.length).toBe(1);
    const D = candidates[0];
    const m = model(D);
    expect(m.bothTurned).toBe(true);
    expectAnswers('word-motion-advanced-11', [D, vA, m.vB, m.second], 6);
  });

  it('word-motion-advanced-12', () => {
    const going = tripTime(200, 80);
    const back = (p: number) => journey(200, 0, [{ to: 100, speed: applyChanges(80, [-p]) }, { to: 0, speed: applyChanges(80, [p]) }]).end;
    const p = uniqueRoot((x) => back(x) - going - 10 / 60, 0.001, 99);
    expectAnswers('word-motion-advanced-12', [p, 200 / back(p)]);
  });
});

describe('word-motion-practice', () => {
  it('word-motion-practice-1', () => {
    const D = 150;
    const model = (vc: number, vb: number, busHeadStart = 0) => {
      const car = journey(0, busHeadStart, [{ to: D, speed: vc }]);
      const bus = journey(D, 0, [{ to: 0, speed: vb }]);
      return { car, bus, t: meetTime(car, bus, 0, 1e4) };
    };
    const carFor = (vb: number) => bisect((vc) => model(vc, vb).t - 1.5, 1e-6, 1e4);
    const vb = uniqueRoot((s) => { const m = model(carFor(s), s); return m.car.end - m.t - 1; }, 1, 99, 200);
    const vc = carFor(vb);
    const busArrival = model(vc, vb).bus.end;
    const headStart = bisect((h) => { const m = model(vc, vb, h); return m.car.position(m.t) - D / 2; }, 0, 3);
    expectAnswers('word-motion-practice-1', [vc, vb, busArrival, headStart * 60], 6);
  });

  it('word-motion-practice-2', () => {
    const v = uniqueRoot((s) => tripTime(45, applyChanges(s, [-20])) - tripTime(45, s) - 0.75, 1, 200);
    const roundTrip = journey(0, 0, [{ to: 45, speed: v }, { to: 0, speed: applyChanges(v, [-20]) }]);
    const going = tripTime(45, v);
    const back = (p: number) => journey(45, 0, [{ to: 27, speed: 12 }, { to: 0, speed: applyChanges(12, [p]) }]).end;
    const p = uniqueRoot((x) => back(x) - going, 0, 500);
    expectAnswers('word-motion-practice-2', [v, 90 / roundTrip.end, p]);
  });

  it('word-motion-practice-3', () => {
    const planned = (v: number) => tripTime(180, v);
    const actual = (v: number, drivingBeforeStop: number, after: number) => {
      const reached = journey(0, 0, [{ to: 180, speed: v }]).position(drivingBeforeStop);
      return journey(0, 0, [{ to: reached, speed: v }, { wait: 0.5 }, { to: 180, speed: after }]).end;
    };
    const v = uniqueRoot((s) => actual(s, 1, s + 20) - planned(s), 1, 170);
    const p = uniqueRoot((x) => actual(v, 2, applyChanges(v, [x])) - planned(v), 0, 1000);
    expectAnswers('word-motion-practice-3', [v, ((v + 20 - v) / v) * 100, p]);
  });

  it('word-motion-practice-4', () => {
    const roundTrip = (u: number, d: number) => journey(0, 0, [{ to: d, speed: 20 + u }, { to: 0, speed: 20 - u }]).end;
    const u = uniqueRoot((x) => roundTrip(x, 48) - 5, 0, 19.5);
    const d = uniqueRoot((x) => roundTrip(u, x) - 3, 0.1, 100);
    expectAnswers('word-motion-practice-4', [u, 96 / roundTrip(u, 48), d]);
  });

  it('word-motion-practice-5', () => {
    const truck = (v: number) => journey(0, 0, [{ to: 240, speed: v }]);
    const car = (v: number) => journey(0, 1, [{ to: 240, speed: v + 20 }]);
    const v = uniqueRoot((s) => truck(s).end - car(s).end - 1, 1, 500);
    const tr = truck(v);
    const c = car(v);
    const [overtake] = findRoots((t) => c.position(t) - tr.position(t), 1 + 1e-9, c.end);
    const carWithReturn = journey(0, 1, [{ to: 240, speed: v + 20 }, { wait: 0.5 }, { to: 0, speed: v + 20 }]);
    const times = meetings(carWithReturn, tr, 1 + 1e-9, tr.end);
    expect(times.length).toBe(2);
    expectAnswers('word-motion-practice-5', [v, v + 20, tr.position(overtake), 240 - tr.position(times[1])]);
  });

  it('word-motion-practice-6', () => {
    const L = 2; // km, time in minutes
    const firstMeeting = (vA: number, vB: number) => circularMeetings((t) => vA * t, (t) => vB * t, L, 2000, 8000)[0];
    const lapA = uniqueRoot((T) => firstMeeting(L / T, L / (T + 2)) - 12, 0.5, 30, 300);
    const vA = L / lapA; // km per minute
    const vB = L / (lapA + 2);
    const opposite = firstMeeting(vA, -vB);
    const p = uniqueRoot((x) => firstMeeting(vA, applyChanges(vB, [x])) - 24, 0, 49);
    expectAnswers('word-motion-practice-6', [vA * 60, vB * 60, opposite * 60, p], 6);
  });

  it('word-motion-practice-7', () => {
    const D = 105;
    const model = (v1: number, v2: number) => {
      const a = journey(0, 0, [{ to: D, speed: v1 }]);
      const b = journey(D, 0, [{ to: 0, speed: v2 }]);
      return { a, b, t: meetTime(a, b, 0, 1e4) };
    };
    const v1For = (v2: number) => bisect((v1) => { const m = model(v1, v2); return m.a.end - m.t - 2.25; }, 1e-3, 1e4);
    const v2 = uniqueRoot((s) => { const m = model(v1For(s), s); return m.b.end - m.t - 4; }, 1, 500, 200);
    const v1 = v1For(v2);
    const first = model(v1, v2).t;
    const shipA = shuttle(0, D, v1);
    const shipB = shuttle(D, 0, v2);
    const times = meetings(shipA, shipB, 1e-9, 12);
    expect(times[0]).toBeCloseTo(first, 6);
    // the second meeting happens after both ships have turned back
    expect(times[1]).toBeGreaterThan(Math.max(shipA.breaks[1], shipB.breaks[1]));
    expectAnswers('word-motion-practice-7', [first, v1, v2, shipA.position(times[1])], 6);
  });

  it('word-motion-practice-8', () => {
    // for a given speed v, the distance for which 10 km/h more saves exactly 1 hour
    const distanceFor = (v: number) => bisect((d) => tripTime(d, v) - tripTime(d, v + 10) - 1, 1e-3, 1e5);
    const v = uniqueRoot((s) => { const d = distanceFor(s); return tripTime(d, s - 10) - tripTime(d, s) - 1.5; }, 10.5, 500, 300);
    const d = distanceFor(v);
    const usual = tripTime(d, v);
    const decrease = ((usual - tripTime(d, v + 10)) / usual) * 100;
    const w = uniqueRoot((s) => journey(0, 0, [{ to: 120, speed: v - 10 }, { to: d, speed: s }]).end - usual, 1, 1000);
    expectAnswers('word-motion-practice-8', [v, d, decrease, w], 6);
  });
});

describe('word-percentages', () => {
  it('word-percentages-1', () => {
    const final = applyChanges(250, [20, -20]);
    expectAnswers('word-percentages-1', [final, ((250 - final) / 250) * 100]);
  });

  it('word-percentages-2', () => {
    const decrease = ((80 - 60) / 80) * 100;
    const back = uniqueRoot((q) => applyChanges(60, [q]) - 80, 0, 200);
    expectAnswers('word-percentages-2', [decrease, back]);
  });

  it('word-percentages-3', () => {
    const salt = 40 * 0.15;
    let water = 40 - salt;
    water += 10; // adding water leaves the amount of salt unchanged
    expectAnswers('word-percentages-3', [(salt / (salt + water)) * 100]);
  });

  it('word-percentages-4', () => {
    const visitors = (N: number) => (0.6 * N * 35) / 100 + (0.4 * N * 80) / 100;
    // a concrete town of 1000 residents: 600 adults, 400 children
    const sample = 1000;
    const percent = (visitors(sample) / sample) * 100;
    const N = uniqueRoot((n) => visitors(n) - 1060, 1, 1e5);
    expectAnswers('word-percentages-4', [percent, N]);
  });

  it('word-percentages-5', () => {
    const S = uniqueRoot((s) => applyChanges(s, [10, 5, -8]) - 10626, 1, 1e6);
    expectAnswers('word-percentages-5', [S, ((10626 - S) / S) * 100]);
  });

  it('word-percentages-6', () => {
    const p = uniqueRoot((x) => applyChanges(800, [x, -x]) - 782, 0.001, 99.9);
    expectAnswers('word-percentages-6', [p]);
  });

  it('word-percentages-7', () => {
    const p = uniqueRoot((x) => applyChanges(100, [x, x + 10]) - applyChanges(100, [32]), 0, 100);
    expectAnswers('word-percentages-7', [p]);
  });

  it('word-percentages-8', () => {
    const storeA = applyChanges(600, [-25]);
    const storeB = applyChanges(600, [-15, -10]);
    expect(storeA).toBeLessThan(storeB);
    const checkout = uniqueRoot((q) => applyChanges(600, [-15, -q]) - storeA, 0, 100);
    expectAnswers('word-percentages-8', [storeB - storeA, ((600 - storeB) / 600) * 100, checkout]);
  });

  it('word-percentages-9', () => {
    const newTime = applyChanges(2.5, [-20]);
    const oldSpeed = uniqueRoot((v) => tripTime(300, v) - 2.5, 1, 1000);
    const newSpeed = uniqueRoot((v) => tripTime(300, v) - newTime, 1, 1000);
    expectAnswers('word-percentages-9', [newSpeed, ((newSpeed - oldSpeed) / oldSpeed) * 100]);
  });

  it('word-percentages-10', () => {
    const V = 50;
    const pourAndRefill = (x: number) => {
      let concentrate = V;
      let water = 0;
      for (let round = 0; round < 2; round += 1) {
        const total = concentrate + water;
        concentrate -= (x * concentrate) / total;
        water -= (x * water) / total;
        water += x;
      }
      return concentrate;
    };
    const x = uniqueRoot((s) => pourAndRefill(s) / V - 0.64, 0.001, V - 0.001);
    expectAnswers('word-percentages-10', [x, V - pourAndRefill(x)]);
  });

  it('word-percentages-11', () => {
    const price = (p: number) => applyChanges(50, [p]);
    const items = (p: number) => applyChanges(120, [-2 * p]);
    const revenue = (p: number) => price(p) * items(p);
    // the number of items stays positive only for p < 50
    const p = uniqueRoot((x) => revenue(x) - applyChanges(revenue(0), [-12]), 0, 49.9);
    expectAnswers('word-percentages-11', [p, price(p), items(p)]);
  });

  it('word-percentages-12', () => {
    const timeDecrease = (distance: number, speed: number, p: number) => {
      const before = tripTime(distance, speed);
      return ((before - tripTime(distance, applyChanges(speed, [p]))) / before) * 100;
    };
    const p = uniqueRoot((x) => timeDecrease(210, 70, x) - (x - 5), 0, 200);
    // the answer does not depend on the trip: another distance and speed give the same p
    expect(uniqueRoot((x) => timeDecrease(100, 50, x) - (x - 5), 0, 200)).toBeCloseTo(p, 9);
    const saved = (tripTime(210, 70) - tripTime(210, applyChanges(70, [p]))) * 60;
    expectAnswers('word-percentages-12', [p, saved]);
  });
});

describe('word-problems lessons: coverage', () => {
  it('every exercise with answers was verified above', () => {
    const ids = Object.values(wordProblemsContent).flatMap((lesson) => lesson.exercises).filter((e) => e.answers).map((e) => e.id);
    expect(ids.filter((id) => !verified.has(id))).toEqual([]);
  });
});
