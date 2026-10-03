import { fmt, fracTex, gcd, polyTex } from './helpers';
import type { ExerciseGenerator, GeneratedExercise, Rng } from './types';

/* ------------------------------------------------------------------------------------------
 * Shared helpers for the geometry / analytic / trigonometry generators (pure functions).
 * ------------------------------------------------------------------------------------------ */

export interface Pt {
  x: number;
  y: number;
}

export const pt = (x: number, y: number): Pt => ({ x, y });
export const toRad = (degrees: number): number => (degrees * Math.PI) / 180;
export const toDeg = (radians: number): number => (radians * 180) / Math.PI;
export const polar = (origin: Pt, length: number, degrees: number): Pt => pt(origin.x + length * Math.cos(toRad(degrees)), origin.y + length * Math.sin(toRad(degrees)));

/** True when the value is exact at `digits` decimals (so it can be written with '=' instead of '≈'). */
export function isExact(value: number, digits = 2): boolean {
  return Math.abs(value - Number(value.toFixed(digits))) < 1e-9;
}

/** '=5' when the value is exact at `digits` decimals, otherwise '\approx5.39' (to append after an expression in KaTeX). */
export function approx(value: number, digits = 2): string {
  return isExact(value, digits) ? `=${fmt(value, digits)}` : String.raw`\approx${fmt(value, digits)}`;
}

/** Number in parentheses when negative, for substitutions: -3 → '(-3)'. */
export function par(value: number, digits = 2): string {
  return value < 0 ? `(${fmt(value, digits)})` : fmt(value, digits);
}

/** Simplified square root of a non-negative integer: 50 → '5\sqrt{2}', 49 → '7'. */
export function sqrtTex(n: number): string {
  let outside = 1;
  let inside = n;
  for (let f = 2; f * f <= inside; f += 1) {
    while (inside % (f * f) === 0) {
      inside /= f * f;
      outside *= f;
    }
  }
  if (inside === 1) return String(outside);
  return String.raw`${outside === 1 ? '' : outside}\sqrt{${inside}}`;
}

/** '\sqrt{50}=5\sqrt{2}\approx7.07' / '\sqrt{169}=13' / '\sqrt{41}\approx6.4' for an integer radicand. */
export function rootText(n: number): string {
  const root = Math.sqrt(n);
  if (Number.isInteger(root)) return String.raw`\sqrt{${n}}=${root}`;
  const simplified = sqrtTex(n);
  const middle = simplified === String.raw`\sqrt{${n}}` ? '' : `=${simplified}`;
  return String.raw`\sqrt{${n}}${middle}${approx(root)}`;
}

/** Multiple of π in lowest terms: (3, 2) → '\frac{3\pi}{2}', (1, 1) → '\pi', (4, 1) → '4\pi'. */
export function piTex(p: number, q: number): string {
  const g = gcd(p, q);
  const n = p / g;
  const d = q / g;
  if (d === 1) return n === 1 ? String.raw`\pi` : String.raw`${n}\pi`;
  return n === 1 ? String.raw`\frac{\pi}{${d}}` : String.raw`\frac{${n}\pi}{${d}}`;
}

/** Linear combination like '2x - y + 3' from [[2,'x'],[-1,'y'],[3,'']] (zero terms are dropped). */
export function linearTex(terms: Array<[number, string]>): string {
  const parts: string[] = [];
  for (const [value, variable] of terms) {
    if (value === 0) continue;
    const abs = Math.abs(value);
    const body = variable === '' ? fmt(abs) : `${abs === 1 ? '' : fmt(abs)}${variable}`;
    if (parts.length === 0) parts.push(value < 0 ? `-${body}` : body);
    else parts.push(value < 0 ? `- ${body}` : `+ ${body}`);
  }
  return parts.length ? parts.join(' ') : '0';
}

/** Right-hand side of y = (mp/mq)x + (np/nq) in lowest terms, e.g. '\frac{2}{3}x - 1'. */
export function lineRhs(mp: number, mq: number, np: number, nq: number): string {
  const m = mp / mq;
  const n = np / nq;
  let slope = '';
  if (m !== 0) slope = m === 1 ? 'x' : m === -1 ? '-x' : `${fracTex(mp, mq)}x`;
  let intercept = '';
  if (n !== 0) intercept = slope === '' ? fracTex(np, nq) : `${n < 0 ? '-' : '+'} ${fracTex(Math.abs(np), Math.abs(nq))}`;
  return [slope, intercept].filter(Boolean).join(' ') || '0';
}

/** Integers most of the time, sometimes x.5 (inputs are integers or one decimal). */
export function randomDecimalHalf(rng: Rng, min: number, max: number): number {
  const base = rng.int(min, max);
  return rng.next() < 0.25 && base < max ? base + 0.5 : base;
}

/* ---------------------------------------- figures ---------------------------------------- */

export interface FigureSpec {
  points: Record<string, Pt>;
  polygons?: string[][];
  segments?: Array<{ a: string; b: string; dashed?: boolean }>;
  circles?: Array<{ center: string; r: number }>;
  /** Points that get a letter label (pushed away from labelCenter, or along labelDirs). */
  labels?: string[];
  labelCenter?: Pt;
  /** Model-space direction in which to push a label (overrides labelCenter). */
  labelDirs?: Record<string, Pt>;
  /** Points labelled at the free spot farthest from the drawn lines (good for centres). */
  autoLabels?: string[];
  /** Text next to a segment (outside the figure, away from labelCenter or from `away`). */
  sideLabels?: Array<{ a: string; b: string; text: string; flip?: boolean; away?: Pt; auto?: boolean }>;
  /** Angle arc at `at` between the rays to `a` and `b` (the smaller angle), or a right-angle mark. */
  angles?: Array<{ at: string; a: string; b: string; text?: string; right?: boolean; radius?: number }>;
  texts?: Array<{ at: Pt; text: string; dx?: number; dy?: number }>;
  dots?: string[];
}

const f1 = (value: number) => value.toFixed(1);

/** Inline SVG (viewBox 0 0 320 240, no width/height) drawn to scale from model coordinates (y up). */
export function svgFigure(spec: FigureSpec): string {
  const xs: number[] = [];
  const ys: number[] = [];
  for (const p of Object.values(spec.points)) {
    xs.push(p.x);
    ys.push(p.y);
  }
  for (const circle of spec.circles ?? []) {
    const c = spec.points[circle.center];
    xs.push(c.x - circle.r, c.x + circle.r);
    ys.push(c.y - circle.r, c.y + circle.r);
  }
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const pad = 30;
  const w = Math.max(maxX - minX, 1e-9);
  const h = Math.max(maxY - minY, 1e-9);
  const s = Math.min((320 - 2 * pad) / w, (240 - 2 * pad) / h);
  const ox = (320 - s * w) / 2;
  const oy = (240 - s * h) / 2;
  const map = (p: Pt): Pt => pt(ox + (p.x - minX) * s, oy + (maxY - p.y) * s);
  const P = (name: string) => map(spec.points[name]);
  const unit = (v: Pt): Pt => {
    const len = Math.hypot(v.x, v.y);
    return len < 1e-12 ? pt(0, -1) : pt(v.x / len, v.y / len);
  };

  const shapes: string[] = [];
  const texts: string[] = [];
  const placed: Pt[] = [];
  /** Text centred at p (the baseline is shifted down by about a third of the font size). */
  const text = (p: Pt, content: string, size = 16) => {
    placed.push(p);
    texts.push(`    <text x="${f1(p.x)}" y="${f1(p.y + size / 3)}" text-anchor="middle"${size === 16 ? '' : ` font-size="${size}"`}>${content}</text>`);
  };
  const lines: Array<[Pt, Pt]> = [];
  for (const polygon of spec.polygons ?? []) polygon.forEach((n, i) => lines.push([P(n), P(polygon[(i + 1) % polygon.length])]));
  for (const segment of spec.segments ?? []) lines.push([P(segment.a), P(segment.b)]);
  const rings = (spec.circles ?? []).map((circle) => ({ c: P(circle.center), r: circle.r * s }));
  const clearance = (p: Pt): number => {
    let best = Infinity;
    for (const [a, b] of lines) {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / Math.max(dx * dx + dy * dy, 1e-12)));
      best = Math.min(best, Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy));
    }
    for (const ring of rings) best = Math.min(best, Math.abs(Math.hypot(p.x - ring.c.x, p.y - ring.c.y) - ring.r));
    for (const q of placed) best = Math.min(best, Math.hypot(p.x - q.x, p.y - q.y) - 8);
    return best;
  };

  for (const polygon of spec.polygons ?? []) {
    shapes.push(`  <polygon points="${polygon.map((n) => `${f1(P(n).x)},${f1(P(n).y)}`).join(' ')}" />`);
  }
  for (const segment of spec.segments ?? []) {
    const a = P(segment.a);
    const b = P(segment.b);
    shapes.push(`  <line x1="${f1(a.x)}" y1="${f1(a.y)}" x2="${f1(b.x)}" y2="${f1(b.y)}" stroke-width="1.5"${segment.dashed ? ' stroke-dasharray="5 3"' : ''} />`);
  }
  for (const circle of spec.circles ?? []) {
    const c = P(circle.center);
    shapes.push(`  <circle cx="${f1(c.x)}" cy="${f1(c.y)}" r="${f1(circle.r * s)}" stroke-width="1.5" />`);
  }
  for (const name of spec.dots ?? []) {
    const c = P(name);
    shapes.push(`  <circle cx="${f1(c.x)}" cy="${f1(c.y)}" r="2.5" fill="currentColor" />`);
  }
  for (const angle of spec.angles ?? []) {
    const v = P(angle.at);
    const ua = unit(pt(P(angle.a).x - v.x, P(angle.a).y - v.y));
    const ub = unit(pt(P(angle.b).x - v.x, P(angle.b).y - v.y));
    if (angle.right) {
      const k = 10;
      shapes.push(
        `  <polyline points="${f1(v.x + k * ua.x)},${f1(v.y + k * ua.y)} ${f1(v.x + k * ua.x + k * ub.x)},${f1(v.y + k * ua.y + k * ub.y)} ${f1(v.x + k * ub.x)},${f1(v.y + k * ub.y)}" stroke-width="1" />`,
      );
    } else {
      const ta = Math.atan2(ua.y, ua.x);
      let d = Math.atan2(ub.y, ub.x) - ta;
      while (d > Math.PI) d -= 2 * Math.PI;
      while (d <= -Math.PI) d += 2 * Math.PI;
      const r = angle.radius ?? (Math.abs(d) < toRad(35) ? 30 : 20);
      const start = pt(v.x + r * Math.cos(ta), v.y + r * Math.sin(ta));
      const end = pt(v.x + r * Math.cos(ta + d), v.y + r * Math.sin(ta + d));
      shapes.push(`  <path d="M ${f1(start.x)},${f1(start.y)} A ${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${f1(end.x)},${f1(end.y)}" stroke-width="1.2" />`);
      if (angle.text) {
        // narrow angles: move the text out until it fits between the two rays
        const tr = Math.min(Math.max(r + 14, 12 / Math.sin(Math.abs(d) / 2)), 75);
        const mid = ta + d / 2;
        text(pt(v.x + tr * Math.cos(mid), v.y + tr * Math.sin(mid)), angle.text, 13);
      }
    }
  }

  const labelled = spec.labels ?? [];
  const center = spec.labelCenter
    ? map(spec.labelCenter)
    : pt(labelled.reduce((sum, n) => sum + P(n).x, 0) / Math.max(labelled.length, 1), labelled.reduce((sum, n) => sum + P(n).y, 0) / Math.max(labelled.length, 1));
  for (const name of labelled) {
    const p = P(name);
    const given = spec.labelDirs?.[name];
    const dir = given ? unit(pt(given.x, -given.y)) : unit(pt(p.x - center.x, p.y - center.y));
    text(pt(p.x + 14 * dir.x, p.y + 14 * dir.y), name);
  }
  for (const side of spec.sideLabels ?? []) {
    const a = P(side.a);
    const b = P(side.b);
    const mid = pt((a.x + b.x) / 2, (a.y + b.y) / 2);
    let n = unit(pt(-(b.y - a.y), b.x - a.x));
    if (side.auto) {
      const plus = pt(mid.x + 14 * n.x, mid.y + 14 * n.y);
      const minus = pt(mid.x - 14 * n.x, mid.y - 14 * n.y);
      text(clearance(plus) >= clearance(minus) ? plus : minus, side.text, 14);
      continue;
    }
    const from = side.away ? map(side.away) : center;
    if (n.x * (mid.x - from.x) + n.y * (mid.y - from.y) < 0) n = pt(-n.x, -n.y);
    if (side.flip) n = pt(-n.x, -n.y);
    text(pt(mid.x + 14 * n.x, mid.y + 14 * n.y), side.text, 14);
  }
  for (const name of spec.autoLabels ?? []) {
    const p = P(name);
    let bestPos = pt(p.x, p.y - 15);
    let bestScore = -Infinity;
    for (const radius of [15, 20, 26]) {
      for (let k = 0; k < 16; k += 1) {
        const candidate = pt(p.x + radius * Math.cos((k * Math.PI) / 8), p.y + radius * Math.sin((k * Math.PI) / 8));
        // prefer the nearest ring: a farther spot must be clearly better
        const score = clearance(candidate) - (radius - 15) * 0.25;
        if (score > bestScore + 1e-9) {
          bestScore = score;
          bestPos = candidate;
        }
      }
    }
    text(bestPos, name);
  }
  for (const t of spec.texts ?? []) {
    const p = map(t.at);
    text(pt(p.x + (t.dx ?? 0), p.y + (t.dy ?? 0) - 5), t.text, 14);
  }

  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">',
    ...shapes,
    '  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">',
    ...texts,
    '  </g>',
    '</svg>',
  ].join('\n');
}

/** Triangle with B at the origin, C = (a, 0), and the angles at B and C given in degrees (A above BC). */
export function triangleFromBase(a: number, betaDeg: number, gammaDeg: number): { A: Pt; B: Pt; C: Pt } {
  const alpha = 180 - betaDeg - gammaDeg;
  const c = (a * Math.sin(toRad(gammaDeg))) / Math.sin(toRad(alpha));
  return { A: polar(pt(0, 0), c, betaDeg), B: pt(0, 0), C: pt(a, 0) };
}

/** Triangle with B at the origin, C = (a, 0), |AC| = b, |AB| = c, A above BC. */
export function triangleFromSides(a: number, b: number, c: number): { A: Pt; B: Pt; C: Pt } {
  const x = (a * a + c * c - b * b) / (2 * a);
  return { A: pt(x, Math.sqrt(Math.max(c * c - x * x, 0))), B: pt(0, 0), C: pt(a, 0) };
}

/** Degrees in KaTeX: 40 → '40^\circ'. */
export const degTex = (value: number, digits = 2) => String.raw`${fmt(value, digits)}^\circ`;
const deg = degTex;

/* ------------------------------------- the generators ------------------------------------- */

const polygonAngles: ExerciseGenerator = {
  id: 'gen-polygon-angles',
  lessonIds: ['geo-angles'],
  title: 'זוויות במצולע משוכלל',
  difficulty: 1,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 1);
    if (mode === 0) {
      const n = rng.int(5, 20);
      const sum = 180 * (n - 2);
      const angle = sum / n;
      return {
        statement: `נתון מצולע משוכלל בעל ${n} צלעות.\n\nחשבו את סכום הזוויות הפנימיות של המצולע ואת גודלה של זווית פנימית אחת שלו (במעלות).`,
        hints: [String.raw`סכום הזוויות הפנימיות במצולע בעל $n$ צלעות הוא $180^\circ(n-2)$.`, 'במצולע משוכלל כל הזוויות הפנימיות שוות זו לזו, ולכן מחלקים את הסכום במספר הזוויות.'],
        solutionSteps: [
          String.raw`סכום הזוויות הפנימיות במצולע בעל $n$ צלעות הוא $180^\circ(n-2)$. עבור $n=${n}$: $180^\circ\cdot ${n - 2}=${sum}^\circ$.`,
          String.raw`במצולע משוכלל כל ${n} הזוויות הפנימיות שוות, ולכן כל אחת מהן היא $\frac{${sum}^\circ}{${n}}${approx(angle)}^\circ$.`,
        ],
        finalAnswer: String.raw`סכום הזוויות $${sum}^\circ$, וכל זווית פנימית $${isExact(angle) ? '' : String.raw`\approx`}${deg(angle)}$.`,
        answers: [
          { label: 'סכום הזוויות הפנימיות (במעלות)', value: sum },
          { label: 'זווית פנימית אחת (במעלות)', value: angle },
        ],
        data: { mode, n },
      };
    }
    const n = rng.pick([5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36]);
    const angle = 180 - 360 / n;
    const sum = 180 * (n - 2);
    return {
      statement: String.raw`כל זווית פנימית של מצולע משוכלל היא $${deg(angle)}$.` + '\n\nכמה צלעות יש למצולע? מהו סכום הזוויות הפנימיות שלו (במעלות)?',
      hints: [String.raw`במצולע משוכלל בעל $n$ צלעות כל זווית פנימית היא $\frac{180^\circ(n-2)}{n}$.`, String.raw`השוו את הביטוי ל-$${deg(angle)}$ ופתרו משוואה ב-$n$.`],
      solutionSteps: [
        String.raw`סכום הזוויות הפנימיות במצולע בעל $n$ צלעות הוא $180^\circ(n-2)$, ובמצולע משוכלל כל הזוויות שוות, ולכן כל זווית היא $\frac{180(n-2)}{n}$ מעלות.`,
        String.raw`$\frac{180(n-2)}{n}=${fmt(angle)}\ \Rightarrow\ 180n-360=${fmt(angle)}n\ \Rightarrow\ ${fmt(180 - angle)}n=360\ \Rightarrow\ n=\frac{360}{${fmt(180 - angle)}}=${n}$.`,
        String.raw`סכום הזוויות הפנימיות: $180^\circ\cdot(${n}-2)=${sum}^\circ$.`,
      ],
      finalAnswer: String.raw`למצולע $${n}$ צלעות, וסכום זוויותיו $${sum}^\circ$.`,
      answers: [
        { label: 'מספר הצלעות $n$', value: n },
        { label: 'סכום הזוויות הפנימיות (במעלות)', value: sum },
      ],
      data: { mode, n, angle },
    };
  },
};

const POSITION_NAMES = ['מעל הישר ומימין לחותך', 'מעל הישר ומשמאל לחותך', 'מתחת לישר ומשמאל לחותך', 'מתחת לישר ומימין לחותך'];

const parallelAngles: ExerciseGenerator = {
  id: 'gen-parallel-angles',
  lessonIds: ['geo-angles'],
  title: 'זוויות בין ישרים מקבילים',
  difficulty: 1,
  generate(rng): GeneratedExercise {
    const theta = rng.next() < 0.5 ? rng.int(35, 80) : rng.int(100, 145);
    const i = rng.int(0, 3);
    const j = rng.int(0, 3);
    // sector k at a crossing point: 0 = above-right, 1 = above-left, 2 = below-left, 3 = below-right
    const sector = (k: number) => (k % 2 === 0 ? theta : 180 - theta);
    const given = sector(i);
    const x = sector(j);

    // model: b is y = 0, a is y = H; the transversal passes through Q(0,0) and P on a.
    const H = 2;
    const Q = pt(0, 0);
    const P = pt(H / Math.tan(toRad(theta)), H);
    const u = polar(pt(0, 0), 1, theta);
    const ext = 0.9 / Math.sin(toRad(theta));
    const xl = Math.min(Q.x, P.x) - 2.2;
    const xr = Math.max(Q.x, P.x) + 2.2;
    const rays = (V: Pt, prefix: string): Record<string, Pt> => ({
      [`${prefix}0`]: pt(V.x + 1, V.y),
      [`${prefix}1`]: pt(V.x + u.x, V.y + u.y),
      [`${prefix}2`]: pt(V.x - 1, V.y),
      [`${prefix}3`]: pt(V.x - u.x, V.y - u.y),
    });
    const sectorMid = (k: number) => (k === 0 ? theta / 2 : k === 1 ? (theta + 180) / 2 : k === 2 ? 180 + theta / 2 : 270 + theta / 2);
    const figureSvg = svgFigure({
      points: {
        P,
        Q,
        AL: pt(xl, H),
        AR: pt(xr, H),
        BL: pt(xl, 0),
        BR: pt(xr, 0),
        T1: pt(Q.x - u.x * ext, Q.y - u.y * ext),
        T2: pt(P.x + u.x * ext, P.y + u.y * ext),
        ...rays(P, 'p'),
        ...rays(Q, 'q'),
      },
      segments: [
        { a: 'AL', b: 'AR' },
        { a: 'BL', b: 'BR' },
        { a: 'T1', b: 'T2' },
      ],
      angles: [
        { at: 'P', a: `p${i}`, b: `p${(i + 1) % 4}`, text: 'α' },
        { at: 'Q', a: `q${j}`, b: `q${(j + 1) % 4}`, text: 'x' },
      ],
      labels: ['P', 'Q'],
      // each letter sits in the sector opposite to the marked one
      labelDirs: { P: polar(pt(0, 0), 1, sectorMid((i + 2) % 4)), Q: polar(pt(0, 0), 1, sectorMid((j + 2) % 4)) },
      texts: [
        { at: pt(xr, H), text: 'a', dx: -6, dy: -8 },
        { at: pt(xr, 0), text: 'b', dx: -6, dy: -8 },
        { at: pt(P.x + u.x * ext, P.y + u.y * ext), text: 't', dx: theta < 90 ? 10 : -10, dy: 4 },
      ],
    });

    const steps: string[] = [];
    if (i === j) {
      steps.push(String.raw`הזוויות $\alpha$ ו-$x$ נמצאות באותו מיקום (${POSITION_NAMES[i]}) בשתי נקודות החיתוך, ולכן הן זוויות מתאימות בין הישרים המקבילים $a$ ו-$b$.`);
      steps.push(String.raw`זוויות מתאימות בין ישרים מקבילים שוות, ולכן $x=\alpha=${deg(x)}$.`);
    } else {
      steps.push(
        String.raw`נסמן ב-$y$ את הזווית שבנקודה $P$ הנמצאת באותו מיקום כמו $x$ (${POSITION_NAMES[j]}). $x$ ו-$y$ הן זוויות מתאימות בין הישרים המקבילים $a$ ו-$b$, ולכן $x=y$.`,
      );
      if ((i + 2) % 4 === j) steps.push(String.raw`$\alpha$ ו-$y$ הן זוויות קודקודיות, ולכן הן שוות: $y=${deg(given)}$.`);
      else steps.push(String.raw`$\alpha$ ו-$y$ הן זוויות צמודות, ולכן סכומן $180^\circ$: $y=180^\circ-${deg(given)}=${deg(x)}$.`);
      let direct = '';
      if ((i === 2 && j === 0) || (i === 3 && j === 1)) direct = String.raw` (אפשר גם ישירות: $\alpha$ ו-$x$ הן זוויות מתחלפות בין ישרים מקבילים, ולכן הן שוות.)`;
      if ((i === 2 && j === 1) || (i === 3 && j === 0)) direct = String.raw` (אפשר גם ישירות: $\alpha$ ו-$x$ הן זוויות חד-צדדיות בין ישרים מקבילים, ולכן סכומן $180^\circ$.)`;
      steps.push(String.raw`לכן $x=${deg(x)}$.${direct}`);
    }
    return {
      statement:
        String.raw`הישרים $a$ ו-$b$ מקבילים, והישר $t$ חותך אותם בנקודות $P$ ו-$Q$ (ראו שרטוט). נתון כי הזווית המסומנת ב-$\alpha$ היא $${deg(given)}$.` +
        '\n\n' +
        String.raw`חשבו את הזווית המסומנת ב-$x$.`,
      hints: [
        String.raw`בין ישרים מקבילים: זוויות מתאימות שוות, זוויות מתחלפות שוות, וזוויות חד-צדדיות משלימות ל-$180^\circ$.`,
        String.raw`מצאו קודם את הזווית שבנקודה $P$ הנמצאת באותו מיקום כמו $x$ – בעזרת זוויות קודקודיות או צמודות.`,
      ],
      solutionSteps: steps,
      finalAnswer: String.raw`$x=${deg(x)}$`,
      answers: [{ label: String.raw`$x$ (במעלות)`, value: x }],
      figureSvg,
      data: { theta, i, j, given },
    };
  },
};

const isoscelesAngles: ExerciseGenerator = {
  id: 'gen-isosceles-angles',
  lessonIds: ['geo-triangles-basic'],
  title: 'זוויות במשולש שווה-שוקיים',
  difficulty: 1,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 2);
    let apex: number;
    let base: number;
    let exterior = 0;
    if (mode === 0) {
      apex = 2 * rng.int(10, 80);
      base = (180 - apex) / 2;
    } else if (mode === 1) {
      base = rng.int(20, 85);
      apex = 180 - 2 * base;
    } else {
      exterior = rng.int(95, 170);
      base = 180 - exterior;
      apex = 180 - 2 * base;
    }
    const height = Math.tan(toRad(base));
    const points: Record<string, Pt> = { A: pt(0, height), B: pt(-1, 0), C: pt(1, 0) };
    if (mode === 2) points.D = pt(1 + 0.9 * Math.max(1, height / 2.5), 0);
    const angles: NonNullable<FigureSpec['angles']> = [];
    if (mode === 0) angles.push({ at: 'A', a: 'B', b: 'C', text: `${apex}°` }, { at: 'B', a: 'A', b: 'C', text: '?' });
    if (mode === 1) angles.push({ at: 'B', a: 'A', b: 'C', text: `${base}°` }, { at: 'A', a: 'B', b: 'C', text: '?' });
    if (mode === 2) angles.push({ at: 'C', a: 'A', b: 'D', text: `${exterior}°` });
    const figureSvg = svgFigure({
      points,
      polygons: [['A', 'B', 'C']],
      segments: mode === 2 ? [{ a: 'C', b: 'D' }] : [],
      labels: mode === 2 ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C'],
      labelCenter: pt(0, height / 3),
      labelDirs: mode === 2 ? { C: pt(0, -1), D: pt(0, -1) } : undefined,
      angles,
    });
    const intro = String.raw`במשולש שווה-השוקיים $ABC$ ($AB=AC$)`;
    const baseHints = ['במשולש שווה-שוקיים זוויות הבסיס שוות זו לזו.', String.raw`סכום הזוויות במשולש הוא $180^\circ$.`];
    if (mode === 0) {
      return {
        statement: String.raw`${intro} נתון $\angle BAC=${deg(apex)}$ (ראו שרטוט).` + '\n\n' + String.raw`חשבו את זווית הבסיס $\angle ABC$.`,
        hints: baseHints,
        solutionSteps: [
          String.raw`במשולש שווה-שוקיים זוויות הבסיס שוות: $\angle ABC=\angle ACB$.`,
          String.raw`סכום הזוויות במשולש הוא $180^\circ$, ולכן $2\angle ABC=180^\circ-${deg(apex)}=${deg(180 - apex)}$.`,
          String.raw`מכאן $\angle ABC=${deg(base)}$.`,
        ],
        finalAnswer: String.raw`$\angle ABC=\angle ACB=${deg(base)}$`,
        answers: [{ label: String.raw`$\angle ABC$ (במעלות)`, value: base }],
        figureSvg,
        data: { mode, apex },
      };
    }
    if (mode === 1) {
      return {
        statement: String.raw`${intro} נתון $\angle ABC=${deg(base)}$ (ראו שרטוט).` + '\n\n' + String.raw`חשבו את זווית הראש $\angle BAC$.`,
        hints: baseHints,
        solutionSteps: [
          String.raw`במשולש שווה-שוקיים זוויות הבסיס שוות: $\angle ACB=\angle ABC=${deg(base)}$.`,
          String.raw`סכום הזוויות במשולש הוא $180^\circ$, ולכן $\angle BAC=180^\circ-2\cdot ${deg(base)}=${deg(apex)}$.`,
        ],
        finalAnswer: String.raw`$\angle BAC=${deg(apex)}$`,
        answers: [{ label: String.raw`$\angle BAC$ (במעלות)`, value: apex }],
        figureSvg,
        data: { mode, base },
      };
    }
    return {
      statement:
        String.raw`${intro} הנקודה $D$ נמצאת על המשך הבסיס $BC$, מעבר ל-$C$. נתון $\angle ACD=${deg(exterior)}$ (ראו שרטוט).` + '\n\n' + String.raw`חשבו את $\angle ACB$ ואת זווית הראש $\angle BAC$.`,
      hints: [String.raw`$\angle ACD$ ו-$\angle ACB$ הן זוויות צמודות.`, String.raw`זוויות הבסיס שוות, וסכום הזוויות במשולש הוא $180^\circ$.`],
      solutionSteps: [
        String.raw`$\angle ACD$ ו-$\angle ACB$ זוויות צמודות, ולכן $\angle ACB=180^\circ-${deg(exterior)}=${deg(base)}$.`,
        String.raw`במשולש שווה-שוקיים זוויות הבסיס שוות: $\angle ABC=\angle ACB=${deg(base)}$.`,
        String.raw`סכום הזוויות במשולש הוא $180^\circ$: $\angle BAC=180^\circ-2\cdot ${deg(base)}=${deg(apex)}$.`,
      ],
      finalAnswer: String.raw`$\angle ACB=${deg(base)}$, $\angle BAC=${deg(apex)}$`,
      answers: [
        { label: String.raw`$\angle ACB$ (במעלות)`, value: base },
        { label: String.raw`$\angle BAC$ (במעלות)`, value: apex },
      ],
      figureSvg,
      data: { mode, exterior },
    };
  },
};

const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5],
  [6, 8, 10],
  [9, 12, 15],
  [12, 16, 20],
  [5, 12, 13],
  [10, 24, 26],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
];

/** A Pythagorean triple (legs in random order) — keeps the answer an integer. */
export function pickTriple(rng: Rng): [number, number, number] {
  const [p, q, r] = rng.pick(TRIPLES);
  return rng.next() < 0.5 ? [p, q, r] : [q, p, r];
}

const pythagoras: ExerciseGenerator = {
  id: 'gen-pythagoras',
  lessonIds: ['geo-triangles-basic', 'trig-pythagoras'],
  title: 'משפט פיתגורס: צלע חסרה',
  difficulty: 1,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 2);
    const nice = rng.next() < 0.5;
    const rightTriangle = (a: number, b: number, labels: [string, string, string]) =>
      svgFigure({
        points: { A: pt(0, b), B: pt(a, 0), C: pt(0, 0) },
        polygons: [['A', 'B', 'C']],
        labels: ['A', 'B', 'C'],
        angles: [{ at: 'C', a: 'A', b: 'B', right: true }],
        sideLabels: [
          { a: 'A', b: 'C', text: labels[0] },
          { a: 'B', b: 'C', text: labels[1] },
          { a: 'A', b: 'B', text: labels[2] },
        ],
      });
    if (mode === 0) {
      let a: number;
      let b: number;
      if (nice) [a, b] = pickTriple(rng);
      else {
        a = rng.int(2, 15);
        b = rng.int(2, 15);
      }
      const sq = a * a + b * b;
      const c = Math.sqrt(sq);
      return {
        statement: String.raw`במשולש ישר-הזווית $ABC$ ($\angle C=90^\circ$) אורכי הניצבים הם $AC=${b}$ ו-$BC=${a}$ (ראו שרטוט).` + '\n\n' + String.raw`חשבו את אורך היתר $AB$.`,
        hints: ['לפי משפט פיתגורס, ריבוע היתר שווה לסכום ריבועי הניצבים.', String.raw`$AB^2=AC^2+BC^2$`],
        solutionSteps: [
          String.raw`לפי משפט פיתגורס במשולש ישר-הזווית $ABC$: $AB^2=AC^2+BC^2=${b}^2+${a}^2=${b * b}+${a * a}=${sq}$.`,
          String.raw`$AB=${rootText(sq)}$.`,
        ],
        finalAnswer: String.raw`$AB${approx(c)}$`,
        answers: [{ label: '$AB$', value: c }],
        figureSvg: rightTriangle(a, b, [String(b), String(a), '?']),
        data: { mode, a, b },
      };
    }
    if (mode === 1) {
      let b: number;
      let c: number;
      if (nice) [, b, c] = pickTriple(rng);
      else {
        c = rng.int(6, 20);
        b = rng.int(2, c - 1);
      }
      const sq = c * c - b * b;
      const legA = Math.sqrt(sq);
      return {
        statement: String.raw`במשולש ישר-הזווית $ABC$ ($\angle C=90^\circ$) אורך היתר הוא $AB=${c}$ ואורך הניצב $AC$ הוא $${b}$ (ראו שרטוט).` + '\n\n' + String.raw`חשבו את אורך הניצב $BC$.`,
        hints: [String.raw`לפי משפט פיתגורס: $AB^2=AC^2+BC^2$.`, String.raw`בודדו את $BC^2$: $BC^2=AB^2-AC^2$.`],
        solutionSteps: [
          String.raw`לפי משפט פיתגורס במשולש ישר-הזווית $ABC$: $AC^2+BC^2=AB^2$.`,
          String.raw`$BC^2=AB^2-AC^2=${c}^2-${b}^2=${c * c}-${b * b}=${sq}$.`,
          String.raw`$BC=${rootText(sq)}$.`,
        ],
        finalAnswer: String.raw`$BC${approx(legA)}$`,
        answers: [{ label: '$BC$', value: legA }],
        figureSvg: rightTriangle(legA, b, [String(b), '?', String(c)]),
        data: { mode, c, b },
      };
    }
    let half: number;
    let side: number;
    if (nice) {
      const [p, , r] = pickTriple(rng);
      half = p;
      side = r;
    } else {
      half = rng.int(2, 9);
      side = rng.int(half + 1, half + 8);
    }
    const sq = side * side - half * half;
    const hgt = Math.sqrt(sq);
    return {
      statement: String.raw`במשולש שווה-השוקיים $ABC$ ($AB=AC=${side}$) אורך הבסיס הוא $BC=${2 * half}$. $AD$ הוא הגובה לבסיס (ראו שרטוט).` + '\n\n' + String.raw`חשבו את אורך הגובה $AD$.`,
      hints: ['במשולש שווה-שוקיים הגובה לבסיס הוא גם תיכון.', String.raw`במשולש ישר-הזווית $ABD$ היתר הוא $AB$.`],
      solutionSteps: [
        String.raw`במשולש שווה-שוקיים הגובה לבסיס הוא גם תיכון, ולכן $BD=DC=\frac{BC}{2}=${half}$.`,
        String.raw`לפי משפט פיתגורס במשולש ישר-הזווית $ABD$ ($\angle ADB=90^\circ$): $AD^2=AB^2-BD^2=${side}^2-${half}^2=${side * side}-${half * half}=${sq}$.`,
        String.raw`$AD=${rootText(sq)}$.`,
      ],
      finalAnswer: String.raw`$AD${approx(hgt)}$`,
      answers: [{ label: '$AD$', value: hgt }],
      figureSvg: svgFigure({
        points: { A: pt(0, hgt), B: pt(-half, 0), C: pt(half, 0), D: pt(0, 0) },
        polygons: [['A', 'B', 'C']],
        segments: [{ a: 'A', b: 'D', dashed: true }],
        labels: ['A', 'B', 'C', 'D'],
        labelCenter: pt(0, hgt / 3),
        labelDirs: { D: pt(0, -1) },
        angles: [{ at: 'D', a: 'A', b: 'C', right: true }],
        sideLabels: [
          { a: 'A', b: 'B', text: String(side) },
          { a: 'A', b: 'C', text: String(side) },
        ],
      }),
      data: { mode, side, base: 2 * half },
    };
  },
};

const midsegment: ExerciseGenerator = {
  id: 'gen-midsegment',
  lessonIds: ['geo-triangles-advanced', 'geo-quadrilaterals-basic', 'geo-thales'],
  title: 'קטע אמצעים במשולש ובטרפז',
  difficulty: 2,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 3);
    if (mode <= 1) {
      const shape = rng.int(25, 70) / 100;
      const A = pt(shape * 6, 4);
      const figureSvg = svgFigure({
        points: { A, B: pt(0, 0), C: pt(6, 0), D: pt(A.x / 2, 2), E: pt((A.x + 6) / 2, 2) },
        polygons: [['A', 'B', 'C']],
        segments: [{ a: 'D', b: 'E' }],
        labels: ['A', 'B', 'C', 'D', 'E'],
        labelCenter: pt(3, 1.6),
      });
      const intro = String.raw`במשולש $ABC$ הנקודה $D$ היא אמצע הצלע $AB$ והנקודה $E$ היא אמצע הצלע $AC$ (ראו שרטוט).`;
      const midHints = [String.raw`$DE$ מחבר את אמצעי שתי צלעות במשולש – זהו קטע אמצעים.`, 'קטע אמצעים במשולש מקביל לצלע השלישית ושווה למחציתה.'];
      const isMid = String.raw`$DE$ מחבר את אמצעי הצלעות $AB$ ו-$AC$, ולכן הוא קטע אמצעים במשולש $ABC$.`;
      if (mode === 0) {
        const fromBase = rng.int(0, 1);
        if (fromBase === 1) {
          const bc = rng.int(6, 30);
          return {
            statement: intro + '\n\n' + String.raw`נתון $BC=${bc}$. חשבו את אורך הקטע $DE$.`,
            hints: midHints,
            solutionSteps: [isMid, String.raw`לפי משפט קטע האמצעים במשולש, $DE\parallel BC$ ו-$DE=\frac12BC=\frac{${bc}}{2}=${fmt(bc / 2)}$.`],
            finalAnswer: String.raw`$DE=${fmt(bc / 2)}$`,
            answers: [{ label: '$DE$', value: bc / 2 }],
            figureSvg,
            data: { mode, fromBase, bc, shape },
          };
        }
        const de = randomDecimalHalf(rng, 3, 15);
        return {
          statement: intro + '\n\n' + String.raw`נתון $DE=${fmt(de)}$. חשבו את אורך הצלע $BC$.`,
          hints: midHints,
          solutionSteps: [isMid, String.raw`לפי משפט קטע האמצעים במשולש, $DE=\frac12BC$, ולכן $BC=2\cdot DE=2\cdot ${fmt(de)}=${fmt(2 * de)}$.`],
          finalAnswer: String.raw`$BC=${fmt(2 * de)}$`,
          answers: [{ label: '$BC$', value: 2 * de }],
          figureSvg,
          data: { mode, fromBase, de, shape },
        };
      }
      // algebra: DE = px + q, BC = rx + s
      const x0 = rng.int(2, 9);
      const p = rng.int(1, 3);
      let q = rng.int(-2, 6);
      if (p * x0 + q <= 0) q = 1;
      let r = rng.int(1, 6);
      if (r === 2 * p) r += 1;
      const de = p * x0 + q;
      const s = 2 * de - r * x0;
      const bc = 2 * de;
      const deSubstitution = String.raw`${p === 1 ? '' : String.raw`${p}\cdot`}${x0}${q === 0 ? '' : q > 0 ? `+${q}` : `${q}`}`;
      return {
        statement: intro + '\n\n' + String.raw`נתון $DE=${polyTex([p, q])}$ ו-$BC=${polyTex([r, s])}$. מצאו את $x$ ואת אורכי הקטעים $DE$ ו-$BC$.`,
        hints: ['קטע אמצעים במשולש שווה למחצית הצלע השלישית.', String.raw`כתבו את המשוואה $BC=2\cdot DE$ ופתרו אותה.`],
        solutionSteps: [
          String.raw`$DE$ מחבר את אמצעי הצלעות $AB$ ו-$AC$, ולכן הוא קטע אמצעים במשולש $ABC$, ולפי משפט קטע האמצעים $BC=2\cdot DE$.`,
          String.raw`$${polyTex([r, s])}=2(${polyTex([p, q])})\ \Rightarrow\ ${polyTex([r, s])}=${polyTex([2 * p, 2 * q])}\ \Rightarrow\ ${polyTex([r - 2 * p, 0])}=${2 * q - s}\ \Rightarrow\ x=${x0}$.`,
          String.raw`$DE=${deSubstitution}=${de}$ ו-$BC=2\cdot ${de}=${bc}$.`,
        ],
        finalAnswer: String.raw`$x=${x0}$, $DE=${de}$, $BC=${bc}$`,
        answers: [
          { label: '$x$', value: x0 },
          { label: '$DE$', value: de },
          { label: '$BC$', value: bc },
        ],
        figureSvg,
        data: { mode, p, q, r, s, shape },
      };
    }
    // trapezoid ABCD, AB ∥ DC, E and F are the midpoints of the legs AD and BC
    const a = rng.int(4, 16);
    let b = rng.int(4, 20);
    if (a === b) b += 3;
    const shift = (rng.int(-10, 10) / 10) * 0.3 * Math.min(a, b);
    const hgt = 0.45 * Math.max(a, b);
    const D = pt(0, 0);
    const C = pt(b, 0);
    const A = pt((b - a) / 2 + shift, hgt);
    const B = pt(A.x + a, hgt);
    const figureSvg = svgFigure({
      points: { A, B, C, D, E: pt(A.x / 2, hgt / 2), F: pt((B.x + C.x) / 2, hgt / 2) },
      polygons: [['A', 'B', 'C', 'D']],
      segments: [{ a: 'E', b: 'F', dashed: true }],
      labels: ['A', 'B', 'C', 'D', 'E', 'F'],
      labelCenter: pt(b / 2, hgt / 2),
      labelDirs: { E: pt(-1, 0), F: pt(1, 0) },
    });
    const intro = String.raw`בטרפז $ABCD$ ($AB\parallel DC$) הנקודות $E$ ו-$F$ הן אמצעי השוקיים $AD$ ו-$BC$ (ראו שרטוט).`;
    const median = (a + b) / 2;
    if (mode === 2) {
      return {
        statement: intro + '\n\n' + String.raw`נתון $AB=${a}$ ו-$DC=${b}$. חשבו את אורך הקטע $EF$.`,
        hints: [String.raw`$EF$ מחבר את אמצעי השוקיים – זהו קטע האמצעים של הטרפז.`, 'קטע אמצעים בטרפז מקביל לבסיסים ושווה למחצית סכומם.'],
        solutionSteps: [
          String.raw`$EF$ מחבר את אמצעי השוקיים $AD$ ו-$BC$, ולכן הוא קטע האמצעים של הטרפז.`,
          String.raw`לפי משפט קטע האמצעים בטרפז: $EF=\frac{AB+DC}{2}=\frac{${a}+${b}}{2}=${fmt(median)}$.`,
        ],
        finalAnswer: String.raw`$EF=${fmt(median)}$`,
        answers: [{ label: '$EF$', value: median }],
        figureSvg,
        data: { mode, a, b },
      };
    }
    return {
      statement: intro + '\n\n' + String.raw`נתון $EF=${fmt(median)}$ ו-$AB=${a}$. חשבו את אורך הבסיס $DC$.`,
      hints: [String.raw`$EF$ הוא קטע האמצעים של הטרפז.`, String.raw`$EF=\frac{AB+DC}{2}$ – הציבו ובודדו את $DC$.`],
      solutionSteps: [
        String.raw`$EF$ מחבר את אמצעי השוקיים $AD$ ו-$BC$, ולכן הוא קטע האמצעים של הטרפז, ולפי משפט קטע האמצעים בטרפז $EF=\frac{AB+DC}{2}$.`,
        String.raw`$${fmt(median)}=\frac{${a}+DC}{2}\ \Rightarrow\ ${a}+DC=${a + b}\ \Rightarrow\ DC=${b}$.`,
      ],
      finalAnswer: String.raw`$DC=${b}$`,
      answers: [{ label: '$DC$', value: b }],
      figureSvg,
      data: { mode, a, median },
    };
  },
};

const inscribedAngle: ExerciseGenerator = {
  id: 'gen-inscribed-angle',
  lessonIds: ['geo-circles-basic'],
  title: 'זווית היקפית וזווית מרכזית',
  difficulty: 1,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 1);
    const c = 2 * rng.int(20, 80);
    const inscribed = c / 2;
    const offset = rng.int(-40, 40);
    const O = pt(0, 0);
    const A = polar(O, 1, 270 - c / 2);
    const B = polar(O, 1, 270 + c / 2);
    const C = polar(O, 1, 90 + offset);
    const base = (180 - c) / 2;
    const figureSvg = svgFigure({
      points: { O, A, B, C },
      circles: [{ center: 'O', r: 1 }],
      polygons: [['A', 'B', 'C']],
      segments: [
        { a: 'O', b: 'A' },
        { a: 'O', b: 'B' },
      ],
      dots: ['O'],
      labels: ['A', 'B', 'C'],
      labelCenter: O,
      autoLabels: ['O'],
      angles: [
        { at: 'O', a: 'A', b: 'B', text: mode === 0 ? `${c}°` : '?' },
        { at: 'C', a: 'A', b: 'B', text: mode === 1 ? `${inscribed}°` : '?' },
      ],
    });
    const intro = String.raw`הנקודות $A$, $B$ ו-$C$ נמצאות על מעגל שמרכזו $O$, והנקודה $C$ נמצאת על הקשת הגדולה $AB$ (ראו שרטוט).`;
    const hints = [String.raw`$\angle ACB$ היא זווית היקפית ו-$\angle AOB$ היא זווית מרכזית, ושתיהן נשענות על אותה קשת.`, String.raw`במשולש $AOB$ הצלעות $OA$ ו-$OB$ הן רדיוסים.`];
    if (mode === 0) {
      return {
        statement: intro + ' ' + String.raw`נתון $\angle AOB=${deg(c)}$.` + '\n\n' + String.raw`חשבו את $\angle ACB$ ואת $\angle OAB$.`,
        hints,
        solutionSteps: [
          String.raw`$\angle ACB$ היא זווית היקפית ו-$\angle AOB$ היא זווית מרכזית, ושתיהן נשענות על הקשת $AB$. זווית היקפית שווה למחצית הזווית המרכזית הנשענת על אותה קשת: $\angle ACB=\frac{${c}^\circ}{2}=${deg(inscribed)}$.`,
          String.raw`$OA=OB$ (רדיוסים), ולכן המשולש $AOB$ שווה-שוקיים וזוויות הבסיס שלו שוות: $\angle OAB=\angle OBA=\frac{180^\circ-${deg(c)}}{2}=${deg(base)}$.`,
        ],
        finalAnswer: String.raw`$\angle ACB=${deg(inscribed)}$, $\angle OAB=${deg(base)}$`,
        answers: [
          { label: String.raw`$\angle ACB$ (במעלות)`, value: inscribed },
          { label: String.raw`$\angle OAB$ (במעלות)`, value: base },
        ],
        figureSvg,
        data: { mode, central: c, offset },
      };
    }
    return {
      statement: intro + ' ' + String.raw`נתון $\angle ACB=${deg(inscribed)}$.` + '\n\n' + String.raw`חשבו את $\angle AOB$ ואת $\angle OBA$.`,
      hints,
      solutionSteps: [
        String.raw`$\angle ACB$ היא זווית היקפית ו-$\angle AOB$ היא זווית מרכזית, ושתיהן נשענות על הקשת $AB$. זווית מרכזית גדולה פי 2 מזווית היקפית הנשענת על אותה קשת: $\angle AOB=2\cdot ${deg(inscribed)}=${deg(c)}$.`,
        String.raw`$OA=OB$ (רדיוסים), ולכן המשולש $AOB$ שווה-שוקיים: $\angle OBA=\angle OAB=\frac{180^\circ-${deg(c)}}{2}=${deg(base)}$.`,
      ],
      finalAnswer: String.raw`$\angle AOB=${deg(c)}$, $\angle OBA=${deg(base)}$`,
      answers: [
        { label: String.raw`$\angle AOB$ (במעלות)`, value: c },
        { label: String.raw`$\angle OBA$ (במעלות)`, value: base },
      ],
      figureSvg,
      data: { mode, inscribed, offset },
    };
  },
};

const tangentLength: ExerciseGenerator = {
  id: 'gen-tangent-length',
  lessonIds: ['geo-circles-basic'],
  title: 'אורך משיק מנקודה חיצונית',
  difficulty: 1,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 2);
    let R: number;
    let t: number;
    let d: number;
    if (rng.next() < 0.5) {
      [R, t, d] = pickTriple(rng);
    } else if (mode === 0) {
      R = rng.int(2, 10);
      d = rng.int(R + 1, R + 10);
      t = Math.sqrt(d * d - R * R);
    } else if (mode === 1) {
      R = rng.int(2, 10);
      t = rng.int(2, 15);
      d = Math.sqrt(R * R + t * t);
    } else {
      t = rng.int(3, 15);
      d = rng.int(t + 1, t + 8);
      R = Math.sqrt(d * d - t * t);
    }
    const O = pt(0, 0);
    const P = pt(d, 0);
    const angleA = toDeg(Math.acos(R / d));
    const figureSvg = svgFigure({
      points: { O, P, A: polar(O, R, angleA), B: polar(O, R, -angleA) },
      circles: [{ center: 'O', r: R }],
      segments: [
        { a: 'P', b: 'A' },
        { a: 'P', b: 'B' },
        { a: 'O', b: 'A' },
        { a: 'O', b: 'B' },
        { a: 'O', b: 'P', dashed: true },
      ],
      dots: ['O'],
      labels: ['O', 'P', 'A', 'B'],
      labelCenter: O,
      labelDirs: { O: pt(-1, 0), P: pt(1, 0) },
      angles: [
        { at: 'A', a: 'O', b: 'P', right: true },
        { at: 'B', a: 'O', b: 'P', right: true },
      ],
    });
    const intro = String.raw`מהנקודה $P$ שמחוץ למעגל שמרכזו $O$ העבירו שני משיקים למעגל, $PA$ ו-$PB$ ($A$ ו-$B$ נקודות ההשקה, ראו שרטוט).`;
    const perimeter = 2 * R + 2 * t;
    const tangentStep = String.raw`המשיק מאונך לרדיוס בנקודת ההשקה, ולכן $\angle OAP=90^\circ$ והמשולש $OAP$ ישר-זווית, והיתר שלו הוא $OP$.`;
    const perimeterStep = String.raw`שני משיקים למעגל היוצאים מאותה נקודה שווים זה לזה, ולכן $PB=PA$, וגם $OB=OA$ (רדיוסים). היקף המרובע $OAPB$ הוא $2\cdot OA+2\cdot PA${approx(perimeter)}$.`;
    const perimeterAnswer = { label: 'היקף המרובע $OAPB$', value: perimeter };
    const perimeterFinal = String.raw`היקף המרובע $p_{OAPB}${approx(perimeter)}$`;
    const hintsCommon = ['המשיק מאונך לרדיוס בנקודת ההשקה.', 'שני משיקים היוצאים מאותה נקודה שווים זה לזה.'];
    if (mode === 0) {
      const sq = d * d - R * R;
      return {
        statement: intro + ' ' + String.raw`רדיוס המעגל הוא $${R}$ ו-$OP=${d}$.` + '\n\n' + String.raw`חשבו את אורך המשיק $PA$ ואת היקף המרובע $OAPB$.`,
        hints: [hintsCommon[0], String.raw`השתמשו במשפט פיתגורס במשולש $OAP$.`, hintsCommon[1]],
        solutionSteps: [tangentStep, String.raw`לפי משפט פיתגורס: $PA^2=OP^2-OA^2=${d}^2-${R}^2=${sq}$, ולכן $PA=${rootText(sq)}$.`, perimeterStep],
        finalAnswer: String.raw`$PA${approx(t)}$, ${perimeterFinal}`,
        answers: [{ label: '$PA$', value: t }, perimeterAnswer],
        figureSvg,
        data: { mode, R, d },
      };
    }
    if (mode === 1) {
      const sq = R * R + t * t;
      return {
        statement: intro + ' ' + String.raw`רדיוס המעגל הוא $${R}$ ואורך המשיק הוא $PA=${t}$.` + '\n\n' + String.raw`חשבו את המרחק $OP$ ואת היקף המרובע $OAPB$.`,
        hints: [hintsCommon[0], String.raw`במשולש ישר-הזווית $OAP$ הקטע $OP$ הוא היתר.`, hintsCommon[1]],
        solutionSteps: [tangentStep, String.raw`לפי משפט פיתגורס: $OP^2=OA^2+PA^2=${R}^2+${t}^2=${sq}$, ולכן $OP=${rootText(sq)}$.`, perimeterStep],
        finalAnswer: String.raw`$OP${approx(d)}$, ${perimeterFinal}`,
        answers: [{ label: '$OP$', value: d }, perimeterAnswer],
        figureSvg,
        data: { mode, R, t },
      };
    }
    const sq = d * d - t * t;
    return {
      statement: intro + ' ' + String.raw`אורך המשיק הוא $PA=${t}$ ו-$OP=${d}$.` + '\n\n' + String.raw`חשבו את רדיוס המעגל ואת היקף המרובע $OAPB$.`,
      hints: [hintsCommon[0], String.raw`במשולש ישר-הזווית $OAP$ הקטע $OP$ הוא היתר, ו-$OA$ הוא ניצב.`, hintsCommon[1]],
      solutionSteps: [tangentStep, String.raw`לפי משפט פיתגורס: $OA^2=OP^2-PA^2=${d}^2-${t}^2=${sq}$, ולכן $R=OA=${rootText(sq)}$.`, perimeterStep],
      finalAnswer: String.raw`$R${approx(R)}$, ${perimeterFinal}`,
      answers: [{ label: 'הרדיוס $R$', value: R }, perimeterAnswer],
      figureSvg,
      data: { mode, t, d },
    };
  },
};

const thales: ExerciseGenerator = {
  id: 'gen-thales',
  lessonIds: ['geo-thales'],
  title: 'משפט תאלס: ישרים מקבילים החותכים זווית',
  difficulty: 2,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 2);
    const p = rng.int(2, 9);
    let q = rng.int(2, 9);
    if (q === p) q = p === 9 ? 4 : p + 1;
    const m = rng.int(1, 2);
    const AB = p * m;
    const BD = q * m;
    const integerVariant = mode === 1 || rng.next() < 0.6;
    const AC = integerVariant ? p * rng.int(1, 3) : rng.int(3, 15);
    const CE = (AC * BD) / AB;
    const phi = rng.int(28, 45);
    const A = pt(0, 0);
    const figureSvg = svgFigure({
      points: {
        A,
        B: pt(AB, 0),
        D: pt(AB + BD, 0),
        C: polar(A, AC, phi),
        E: polar(A, AC + CE, phi),
        R1: pt((AB + BD) * 1.12, 0),
        R2: polar(A, (AC + CE) * 1.12, phi),
      },
      segments: [
        { a: 'A', b: 'R1' },
        { a: 'A', b: 'R2' },
        { a: 'B', b: 'C' },
        { a: 'D', b: 'E' },
      ],
      labels: ['A', 'B', 'C', 'D', 'E'],
      labelDirs: { A: pt(-1, 0), B: pt(0, -1), D: pt(0, -1), C: polar(pt(0, 0), 1, phi + 90), E: polar(pt(0, 0), 1, phi + 90) },
    });
    const intro = String.raw`הישרים $BC$ ו-$DE$ מקבילים וחותכים את שוקי הזווית $A$: הנקודות $B$ ו-$D$ על שוק אחת והנקודות $C$ ו-$E$ על השוק השנייה (ראו שרטוט).`;
    const thalesStep = String.raw`לפי משפט תאלס, ישרים מקבילים החותכים את שוקי זווית מקצים על השוקיים קטעים פרופורציוניים: $\frac{AB}{BD}=\frac{AC}{CE}$.`;
    const hints = ['השתמשו במשפט תאלס: ישרים מקבילים מקצים על שוקי הזווית קטעים פרופורציוניים.', String.raw`$\frac{AB}{BD}=\frac{AC}{CE}$`];
    if (mode === 0) {
      return {
        statement: intro + ' ' + String.raw`נתון $AB=${AB}$, $BD=${BD}$, $AC=${AC}$.` + '\n\n' + String.raw`חשבו את אורך הקטע $CE$.`,
        hints,
        solutionSteps: [thalesStep, String.raw`$\frac{${AB}}{${BD}}=\frac{${AC}}{CE}\ \Rightarrow\ CE=\frac{${AC}\cdot ${BD}}{${AB}}${approx(CE)}$.`],
        finalAnswer: String.raw`$CE${approx(CE)}$`,
        answers: [{ label: '$CE$', value: CE }],
        figureSvg,
        data: { mode, AB, BD, AC, phi },
      };
    }
    if (mode === 1) {
      return {
        statement: intro + ' ' + String.raw`נתון $AB=${AB}$, $BD=${BD}$, $CE=${fmt(CE)}$.` + '\n\n' + String.raw`חשבו את אורך הקטע $AC$.`,
        hints,
        solutionSteps: [thalesStep, String.raw`$\frac{${AB}}{${BD}}=\frac{AC}{${fmt(CE)}}\ \Rightarrow\ AC=\frac{${AB}\cdot ${fmt(CE)}}{${BD}}${approx(AC)}$.`],
        finalAnswer: String.raw`$AC${approx(AC)}$`,
        answers: [{ label: '$AC$', value: AC }],
        figureSvg,
        data: { mode, AB, BD, CE, phi },
      };
    }
    const AD = AB + BD;
    const AE = AC + CE;
    return {
      statement: intro + ' ' + String.raw`נתון $AB=${AB}$, $AD=${AD}$, $AC=${AC}$.` + '\n\n' + String.raw`חשבו את אורכי הקטעים $CE$ ו-$AE$.`,
      hints: [String.raw`חשבו קודם את $BD=AD-AB$.`, String.raw`לפי משפט תאלס: $\frac{AB}{BD}=\frac{AC}{CE}$.`],
      solutionSteps: [
        String.raw`$BD=AD-AB=${AD}-${AB}=${BD}$.`,
        thalesStep,
        String.raw`$\frac{${AB}}{${BD}}=\frac{${AC}}{CE}\ \Rightarrow\ CE=\frac{${AC}\cdot ${BD}}{${AB}}${approx(CE)}$.`,
        String.raw`$AE=AC+CE${approx(AE)}$.`,
      ],
      finalAnswer: String.raw`$CE${approx(CE)}$, $AE${approx(AE)}$`,
      answers: [
        { label: '$CE$', value: CE },
        { label: '$AE$', value: AE },
      ],
      figureSvg,
      data: { mode, AB, AD, AC, phi },
    };
  },
};

const angleBisector: ExerciseGenerator = {
  id: 'gen-angle-bisector',
  lessonIds: ['geo-angle-bisector'],
  title: 'משפט חוצה זווית במשולש',
  difficulty: 2,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 2);
    // AB = k1·g, AC = k2·g, BD = k1·u, DC = k2·u, BC = (k1 + k2)·u, with |b − c| < a < b + c.
    let k1 = 2;
    let k2 = 3;
    let g = 3;
    let u = 2;
    for (let attempt = 0; attempt < 50; attempt += 1) {
      const c1 = rng.int(1, 5);
      const c2 = rng.int(1, 5);
      const gg = rng.int(2, 4);
      if (c1 === c2 || gcd(c1, c2) !== 1) continue;
      const lo = (Math.abs(c2 - c1) * gg) / (c1 + c2);
      const options: number[] = [];
      for (let v = 1; v < gg; v += 1) if (v > lo + 0.15) options.push(v);
      if (options.length === 0) continue;
      k1 = c1;
      k2 = c2;
      g = gg;
      u = rng.pick(options);
      break;
    }
    const c = k1 * g;
    const b = k2 * g;
    const BD = k1 * u;
    const DC = k2 * u;
    const a = BD + DC;
    const tri = triangleFromSides(a, b, c);
    const figureSvg = svgFigure({
      points: { ...tri, D: pt(BD, 0) },
      polygons: [['A', 'B', 'C']],
      segments: [{ a: 'A', b: 'D' }],
      labels: ['A', 'B', 'C', 'D'],
      labelDirs: { D: pt(0, -1) },
      labelCenter: pt((tri.A.x + a) / 3, tri.A.y / 3),
      angles: [
        { at: 'A', a: 'B', b: 'D', radius: 18 },
        { at: 'A', a: 'D', b: 'C', radius: 23 },
      ],
    });
    const intro = String.raw`במשולש $ABC$ הקטע $AD$ חוצה את הזווית $\angle BAC$, והנקודה $D$ נמצאת על הצלע $BC$ (ראו שרטוט).`;
    const theorem = String.raw`לפי משפט חוצה זווית פנימית במשולש, חוצה הזווית מחלק את הצלע שמול הזווית ביחס הצלעות הכולאות אותה: $\frac{BD}{DC}=\frac{AB}{AC}$.`;
    if (mode === 0) {
      return {
        statement: intro + ' ' + String.raw`נתון $AB=${c}$, $AC=${b}$, $BC=${a}$.` + '\n\n' + String.raw`חשבו את אורכי הקטעים $BD$ ו-$DC$.`,
        hints: [String.raw`משפט חוצה זווית: $\frac{BD}{DC}=\frac{AB}{AC}$.`, String.raw`סמנו $BD=x$, ואז $DC=${a}-x$.`],
        solutionSteps: [
          theorem,
          String.raw`נסמן $BD=x$, ואז $DC=${a}-x$, ולכן $\frac{x}{${a}-x}=\frac{${c}}{${b}}$.`,
          String.raw`$${b}x=${c}(${a}-x)\ \Rightarrow\ ${b + c}x=${a * c}\ \Rightarrow\ x=${BD}$.`,
          String.raw`$BD=${BD}$ ו-$DC=${a}-${BD}=${DC}$.`,
        ],
        finalAnswer: String.raw`$BD=${BD}$, $DC=${DC}$`,
        answers: [
          { label: '$BD$', value: BD },
          { label: '$DC$', value: DC },
        ],
        figureSvg,
        data: { mode, a, b, c },
      };
    }
    if (mode === 1) {
      return {
        statement: intro + ' ' + String.raw`נתון $AB=${c}$, $BD=${BD}$, $DC=${DC}$.` + '\n\n' + String.raw`חשבו את אורך הצלע $AC$.`,
        hints: [String.raw`משפט חוצה זווית: $\frac{BD}{DC}=\frac{AB}{AC}$.`, String.raw`הציבו את הנתונים ובודדו את $AC$.`],
        solutionSteps: [theorem, String.raw`$\frac{${BD}}{${DC}}=\frac{${c}}{AC}\ \Rightarrow\ AC=\frac{${c}\cdot ${DC}}{${BD}}=${b}$.`],
        finalAnswer: String.raw`$AC=${b}$`,
        answers: [{ label: '$AC$', value: b }],
        figureSvg,
        data: { mode, c, BD, DC },
      };
    }
    return {
      statement: intro + ' ' + String.raw`נתון $AB=${c}$, $AC=${b}$, $BD=${BD}$.` + '\n\n' + String.raw`חשבו את אורך הקטע $DC$ ואת אורך הצלע $BC$.`,
      hints: [String.raw`משפט חוצה זווית: $\frac{BD}{DC}=\frac{AB}{AC}$.`, String.raw`$BC=BD+DC$.`],
      solutionSteps: [theorem, String.raw`$\frac{${BD}}{DC}=\frac{${c}}{${b}}\ \Rightarrow\ DC=\frac{${BD}\cdot ${b}}{${c}}=${DC}$.`, String.raw`$BC=BD+DC=${BD}+${DC}=${a}$.`],
      finalAnswer: String.raw`$DC=${DC}$, $BC=${a}$`,
      answers: [
        { label: '$DC$', value: DC },
        { label: '$BC$', value: a },
      ],
      figureSvg,
      data: { mode, b, c, BD },
    };
  },
};

const similarTriangles: ExerciseGenerator = {
  id: 'gen-similar-triangles',
  lessonIds: ['geo-similar-areas', 'geo-similar-ratios'],
  title: 'משולשים דומים: יחס צלעות, גבהים ושטחים',
  difficulty: 2,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 3);
    const q = rng.int(1, 4);
    let p = rng.int(1, 4);
    if (p === q) p = q === 4 ? 3 : q + 1;
    const kTex = fracTex(p, q);
    const shape = rng.int(30, 70) / 100;
    const intro = String.raw`המשולשים $ABC$ ו-$DEF$ דומים ($\triangle ABC\sim\triangle DEF$: הקודקוד $A$ מתאים ל-$D$, $B$ ל-$E$ ו-$C$ ל-$F$).`;
    if (mode === 0) {
      const u = rng.int(1, 3);
      const w = rng.int(1, 6);
      const AB = q * u;
      const DE = p * u;
      const S1 = q * q * w;
      const S2 = p * p * w;
      return {
        statement: intro + ' ' + String.raw`נתון $AB=${AB}$, $DE=${DE}$, ושטח המשולש $ABC$ הוא $${S1}$.` + '\n\n' + String.raw`חשבו את שטח המשולש $DEF$.`,
        hints: ['יחס הדמיון הוא היחס בין צלעות מתאימות.', 'יחס השטחים של משולשים דומים שווה לריבוע יחס הדמיון.'],
        solutionSteps: [
          String.raw`$DE$ ו-$AB$ הן צלעות מתאימות, ולכן יחס הדמיון הוא $k=\frac{DE}{AB}=\frac{${DE}}{${AB}}=${kTex}$.`,
          String.raw`יחס השטחים של משולשים דומים שווה לריבוע יחס הדמיון: $\frac{S_{DEF}}{S_{ABC}}=k^2=${fracTex(p * p, q * q)}$.`,
          String.raw`$S_{DEF}=${fracTex(p * p, q * q)}\cdot ${S1}=${S2}$.`,
        ],
        finalAnswer: String.raw`$S_{DEF}=${S2}$`,
        answers: [{ label: 'שטח המשולש $DEF$', value: S2 }],
        data: { mode, AB, DE, S1, shape },
      };
    }
    if (mode === 1) {
      const u = rng.int(1, 3);
      const w = rng.int(1, 6);
      const BC = q * u;
      const EF = p * u;
      const S1 = q * q * w;
      const S2 = p * p * w;
      return {
        statement: intro + ' ' + String.raw`שטח המשולש $ABC$ הוא $${S1}$, שטח המשולש $DEF$ הוא $${S2}$, ו-$BC=${BC}$.` + '\n\n' + String.raw`חשבו את אורך הצלע $EF$.`,
        hints: ['יחס השטחים של משולשים דומים שווה לריבוע יחס הדמיון.', String.raw`מצאו את $k$ מתוך $k^2=\frac{S_{DEF}}{S_{ABC}}$, ואז $EF=k\cdot BC$.`],
        solutionSteps: [
          String.raw`יחס השטחים של משולשים דומים שווה לריבוע יחס הדמיון: $k^2=\frac{S_{DEF}}{S_{ABC}}=\frac{${S2}}{${S1}}=${fracTex(p * p, q * q)}$, ולכן $k=${kTex}$ ($k>0$).`,
          String.raw`$EF$ ו-$BC$ הן צלעות מתאימות, ולכן $\frac{EF}{BC}=k$, כלומר $EF=${kTex}\cdot ${BC}=${EF}$.`,
        ],
        finalAnswer: String.raw`$EF=${EF}$`,
        answers: [{ label: '$EF$', value: EF }],
        data: { mode, BC, S1, S2, shape },
      };
    }
    if (mode === 2) {
      const u = rng.int(1, 3);
      const v = rng.int(1, 3);
      const AB = q * u;
      const DE = p * u;
      const CH = q * v;
      const FK = p * v;
      const gap = Math.max(AB, DE) * 0.35 + 0.5;
      const D = pt(AB + gap, 0);
      const figureSvg = svgFigure({
        points: {
          A: pt(0, 0),
          B: pt(AB, 0),
          C: pt(shape * AB, CH),
          D,
          E: pt(D.x + DE, 0),
          F: pt(D.x + shape * DE, FK),
          H: pt(shape * AB, 0),
          K: pt(D.x + shape * DE, 0),
        },
        polygons: [
          ['A', 'B', 'C'],
          ['D', 'E', 'F'],
        ],
        segments: [
          { a: 'C', b: 'H', dashed: true },
          { a: 'F', b: 'K', dashed: true },
        ],
        labels: ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'K'],
        labelDirs: { A: pt(-1, -0.6), B: pt(1, -0.6), C: pt(0, 1), D: pt(-1, -0.6), E: pt(1, -0.6), F: pt(0, 1), H: pt(0, -1), K: pt(0, -1) },
        angles: [
          { at: 'H', a: 'C', b: 'B', right: true },
          { at: 'K', a: 'F', b: 'E', right: true },
        ],
      });
      return {
        statement:
          intro +
          ' ' +
          String.raw`$CH$ הוא הגובה לצלע $AB$ במשולש $ABC$, ו-$FK$ הוא הגובה לצלע $DE$ במשולש $DEF$ (ראו שרטוט). נתון $AB=${AB}$, $DE=${DE}$, $CH=${CH}$.` +
          '\n\n' +
          String.raw`חשבו את אורך הגובה $FK$.`,
        hints: ['יחס הדמיון הוא היחס בין צלעות מתאימות.', 'במשולשים דומים היחס בין גבהים מתאימים שווה ליחס הדמיון.'],
        solutionSteps: [
          String.raw`$DE$ ו-$AB$ הן צלעות מתאימות, ולכן יחס הדמיון הוא $k=\frac{DE}{AB}=\frac{${DE}}{${AB}}=${kTex}$.`,
          String.raw`$FK$ ו-$CH$ הם גבהים מתאימים (לצלעות המתאימות $DE$ ו-$AB$), ובמשולשים דומים יחס הגבהים המתאימים שווה ליחס הדמיון: $FK=k\cdot CH=${kTex}\cdot ${CH}=${FK}$.`,
        ],
        finalAnswer: String.raw`$FK=${FK}$`,
        answers: [{ label: '$FK$', value: FK }],
        figureSvg,
        data: { mode, AB, DE, CH, shape },
      };
    }
    // DE ∥ BC inside triangle ABC
    const m = rng.int(1, 5);
    let n = rng.int(1, 5);
    if (n === m && m > 1) n = m - 1;
    const w = rng.int(1, 4);
    const S = (m + n) * (m + n) * w;
    const SADE = m * m * w;
    const t = m / (m + n);
    const A = pt(shape * 6, 4.5);
    const figureSvg = svgFigure({
      points: { A, B: pt(0, 0), C: pt(6, 0), D: pt(A.x - t * A.x, A.y - t * A.y), E: pt(A.x + t * (6 - A.x), A.y - t * A.y) },
      polygons: [['A', 'B', 'C']],
      segments: [{ a: 'D', b: 'E' }],
      labels: ['A', 'B', 'C', 'D', 'E'],
      labelCenter: pt(3, 1.8),
    });
    return {
      statement:
        String.raw`במשולש $ABC$ הנקודה $D$ נמצאת על הצלע $AB$ והנקודה $E$ נמצאת על הצלע $AC$, כך ש-$DE\parallel BC$ (ראו שרטוט). נתון $AD=${m}$, $DB=${n}$, ושטח המשולש $ABC$ הוא $${S}$.` +
        '\n\n' +
        String.raw`חשבו את שטח המשולש $ADE$ ואת שטח הטרפז $DBCE$.`,
      hints: [String.raw`הוכיחו ש-$\triangle ADE\sim\triangle ABC$ (זוויות מתאימות בין ישרים מקבילים).`, String.raw`יחס הדמיון הוא $\frac{AD}{AB}$, ויחס השטחים הוא ריבועו.`],
      solutionSteps: [
        String.raw`$DE\parallel BC$, ולכן $\angle ADE=\angle ABC$ (זוויות מתאימות בין ישרים מקבילים), והזווית $\angle A$ משותפת. לכן $\triangle ADE\sim\triangle ABC$ (משפט דמיון ז.ז.).`,
        String.raw`יחס הדמיון: $k=\frac{AD}{AB}=\frac{${m}}{${m}+${n}}=${fracTex(m, m + n)}$.`,
        String.raw`יחס השטחים שווה לריבוע יחס הדמיון: $S_{ADE}=k^2\cdot S_{ABC}=${fracTex(m * m, (m + n) * (m + n))}\cdot ${S}=${SADE}$.`,
        String.raw`$S_{DBCE}=S_{ABC}-S_{ADE}=${S}-${SADE}=${S - SADE}$.`,
      ],
      finalAnswer: String.raw`$S_{ADE}=${SADE}$, $S_{DBCE}=${S - SADE}$`,
      answers: [
        { label: 'שטח המשולש $ADE$', value: SADE },
        { label: 'שטח הטרפז $DBCE$', value: S - SADE },
      ],
      figureSvg,
      data: { mode, m, n, S, shape },
    };
  },
};

const sector: ExerciseGenerator = {
  id: 'gen-sector',
  lessonIds: ['geo-circle-area'],
  title: 'אורך קשת ושטח גזרה',
  difficulty: 2,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 2);
    const R = rng.int(2, 12);
    const alpha = rng.pick([20, 30, 36, 40, 45, 60, 72, 80, 90, 100, 120, 135, 150, 160, 200, 210, 240, 270, 300]);
    const arc = (2 * Math.PI * R * alpha) / 360;
    const area = (Math.PI * R * R * alpha) / 360;
    const arcTex = piTex(R * alpha, 180);
    const areaTex = piTex(R * R * alpha, 360);
    const O = pt(0, 0);
    const start = 90 - alpha / 2;
    const figureSvg = svgFigure({
      points: { O, A: polar(O, R, start), B: polar(O, R, start + alpha) },
      circles: [{ center: 'O', r: R }],
      segments: [
        { a: 'O', b: 'A' },
        { a: 'O', b: 'B' },
      ],
      dots: ['O'],
      labels: ['O', 'A', 'B'],
      labelCenter: O,
      labelDirs: { O: pt(0, -1) },
      angles: alpha < 180 ? [{ at: 'O', a: 'A', b: 'B', text: mode === 1 ? 'α' : `${alpha}°` }] : [],
    });
    const big = alpha > 180 ? ' (זו הגזרה הגדולה)' : '';
    const intro = String.raw`$AOB$ היא גזרה במעגל שמרכזו $O$${big}`;
    const arcFormula = String.raw`אורך הקשת של גזרה שזווית המרכז שלה $\alpha$ (במעלות) הוא חלק $\frac{\alpha}{360^\circ}$ מהיקף המעגל: $l=\frac{\alpha}{360^\circ}\cdot2\pi R$.`;
    const areaFormula = String.raw`שטח הגזרה הוא חלק $\frac{\alpha}{360^\circ}$ משטח העיגול: $S=\frac{\alpha}{360^\circ}\cdot\pi R^2$.`;
    if (mode === 0) {
      return {
        statement: intro + String.raw`. רדיוס המעגל הוא $R=${R}$ וזווית המרכז של הגזרה היא $${deg(alpha)}$.` + '\n\n' + 'חשבו את אורך הקשת של הגזרה ואת שטח הגזרה.',
        hints: [String.raw`הגזרה היא חלק $\frac{\alpha}{360^\circ}$ מהעיגול.`, String.raw`$l=\frac{\alpha}{360^\circ}\cdot2\pi R$, $S=\frac{\alpha}{360^\circ}\cdot\pi R^2$.`],
        solutionSteps: [
          arcFormula,
          String.raw`$l=\frac{${alpha}}{360}\cdot2\pi\cdot ${R}=${arcTex}\approx${fmt(arc)}$.`,
          areaFormula,
          String.raw`$S=\frac{${alpha}}{360}\cdot\pi\cdot ${R}^2=${areaTex}\approx${fmt(area)}$.`,
        ],
        finalAnswer: String.raw`$l=${arcTex}\approx${fmt(arc)}$, $S=${areaTex}\approx${fmt(area)}$`,
        answers: [
          { label: 'אורך הקשת', value: arc },
          { label: 'שטח הגזרה', value: area },
        ],
        figureSvg,
        data: { mode, R, alpha },
      };
    }
    if (mode === 1) {
      return {
        statement: intro + String.raw`. רדיוס המעגל הוא $R=${R}$ ואורך הקשת של הגזרה הוא $${arcTex}$.` + '\n\n' + String.raw`חשבו את זווית המרכז $\alpha$ של הגזרה (במעלות) ואת שטח הגזרה.`,
        hints: [String.raw`$l=\frac{\alpha}{360^\circ}\cdot2\pi R$ – הציבו את $l$ ואת $R$ ובודדו את $\alpha$.`, String.raw`אחרי שמצאתם את $\alpha$: $S=\frac{\alpha}{360^\circ}\cdot\pi R^2$.`],
        solutionSteps: [
          arcFormula,
          String.raw`$\frac{\alpha}{360}\cdot2\pi\cdot ${R}=${arcTex}\ \Rightarrow\ \alpha=\frac{360\cdot ${arcTex}}{${2 * R}\pi}=${deg(alpha)}$.`,
          areaFormula,
          String.raw`$S=\frac{${alpha}}{360}\cdot\pi\cdot ${R}^2=${areaTex}\approx${fmt(area)}$.`,
        ],
        finalAnswer: String.raw`$\alpha=${deg(alpha)}$, $S=${areaTex}\approx${fmt(area)}$`,
        answers: [
          { label: String.raw`$\alpha$ (במעלות)`, value: alpha },
          { label: 'שטח הגזרה', value: area },
        ],
        figureSvg,
        data: { mode, R, arcOverPi: (R * alpha) / 180 },
      };
    }
    return {
      statement: intro + String.raw`. זווית המרכז של הגזרה היא $${deg(alpha)}$ ושטח הגזרה הוא $${areaTex}$.` + '\n\n' + 'חשבו את רדיוס המעגל ואת אורך הקשת של הגזרה.',
      hints: [String.raw`$S=\frac{\alpha}{360^\circ}\cdot\pi R^2$ – הציבו את $S$ ואת $\alpha$ ובודדו את $R^2$.`, String.raw`אחרי שמצאתם את $R$: $l=\frac{\alpha}{360^\circ}\cdot2\pi R$.`],
      solutionSteps: [
        areaFormula,
        String.raw`$\frac{${alpha}}{360}\cdot\pi R^2=${areaTex}\ \Rightarrow\ R^2=${R * R}\ \Rightarrow\ R=${R}$.`,
        arcFormula,
        String.raw`$l=\frac{${alpha}}{360}\cdot2\pi\cdot ${R}=${arcTex}\approx${fmt(arc)}$.`,
      ],
      finalAnswer: String.raw`$R=${R}$, $l=${arcTex}\approx${fmt(arc)}$`,
      answers: [
        { label: '$R$', value: R },
        { label: 'אורך הקשת', value: arc },
      ],
      figureSvg,
      data: { mode, alpha, areaOverPi: (R * R * alpha) / 360 },
    };
  },
};

const trapezoidDiagonals: ExerciseGenerator = {
  id: 'gen-trapezoid-diagonals',
  lessonIds: ['geo-similar-areas', 'geo-similarity-review'],
  title: 'שטחים בטרפז שאלכסוניו נחתכים',
  difficulty: 3,
  generate(rng): GeneratedExercise {
    const p = rng.int(1, 4);
    const q = rng.int(p + 1, 6);
    const u = rng.int(1, 3);
    const w = rng.int(1, 4);
    const AB = p * u;
    const DC = q * u;
    const S1 = p * p * w;
    const S2 = q * q * w;
    const side = p * q * w;
    const total = S1 + S2 + 2 * side;
    // figure: D(0,0), C(DC,0), AB on top
    const hgt = 0.55 * DC;
    const shift = (DC - AB) / 2 + rng.int(-3, 3) * 0.08 * AB;
    const A = pt(shift, hgt);
    const B = pt(shift + AB, hgt);
    const C = pt(DC, 0);
    const D = pt(0, 0);
    const t = p / (p + q);
    const O = pt(A.x + t * (C.x - A.x), A.y + t * (C.y - A.y));
    const k = fracTex(q, p);
    const figureSvg = svgFigure({
      points: { A, B, C, D, O },
      polygons: [['A', 'B', 'C', 'D']],
      segments: [
        { a: 'A', b: 'C' },
        { a: 'B', b: 'D' },
      ],
      labels: ['A', 'B', 'C', 'D'],
      labelCenter: O,
      autoLabels: ['O'],
    });
    return {
      statement:
        String.raw`בטרפז $ABCD$ ($AB\parallel DC$) האלכסונים $AC$ ו-$BD$ נחתכים בנקודה $O$ (ראו שרטוט). נתון $AB=${AB}$, $DC=${DC}$, ושטח המשולש $AOB$ הוא $${S1}$.` +
        '\n\n' +
        String.raw`חשבו את שטח המשולש $COD$, את שטח המשולש $AOD$ ואת שטח הטרפז.`,
      hints: [
        String.raw`הוכיחו ש-$\triangle AOB\sim\triangle COD$ בעזרת זוויות מתחלפות בין ישרים מקבילים.`,
        'יחס השטחים של משולשים דומים שווה לריבוע יחס הדמיון.',
        String.raw`למשולשים $AOB$ ו-$AOD$ יש אותו גובה מהקודקוד $A$ לישר $BD$, ולכן יחס השטחים שלהם שווה ליחס הבסיסים $\frac{OD}{OB}$.`,
      ],
      solutionSteps: [
        String.raw`$AB\parallel DC$, ולכן $\angle OAB=\angle OCD$ ו-$\angle OBA=\angle ODC$ (זוויות מתחלפות בין ישרים מקבילים). מכאן $\triangle AOB\sim\triangle COD$ (משפט דמיון ז.ז.), ויחס הדמיון הוא $k=\frac{DC}{AB}=\frac{${DC}}{${AB}}=${k}$.`,
        String.raw`יחס השטחים של משולשים דומים שווה לריבוע יחס הדמיון: $S_{COD}=k^2\cdot S_{AOB}=${fracTex(q * q, p * p)}\cdot${S1}=${S2}$.`,
        String.raw`מהדמיון גם $\frac{OD}{OB}=\frac{DC}{AB}=${k}$. למשולשים $AOB$ ו-$AOD$ יש אותו גובה מ-$A$ לישר $BD$, ולכן $\frac{S_{AOD}}{S_{AOB}}=\frac{OD}{OB}=${k}$, כלומר $S_{AOD}=${k}\cdot${S1}=${side}$.`,
        String.raw`באותו אופן (גובה משותף מ-$B$ לישר $AC$, ו-$\frac{OC}{OA}=${k}$) גם $S_{BOC}=${side}$.`,
        String.raw`$S_{ABCD}=S_{AOB}+S_{BOC}+S_{COD}+S_{AOD}=${S1}+${side}+${S2}+${side}=${total}$.`,
      ],
      finalAnswer: String.raw`$S_{COD}=${S2}$, $S_{AOD}=${side}$, $S_{ABCD}=${total}$`,
      answers: [
        { label: 'שטח המשולש $COD$', value: S2 },
        { label: 'שטח המשולש $AOD$', value: side },
        { label: 'שטח הטרפז $ABCD$', value: total },
      ],
      figureSvg,
      data: { AB, DC, S1, shift: shift / DC },
    };
  },
};

export const geometryGenerators: ExerciseGenerator[] = [
  polygonAngles,
  parallelAngles,
  isoscelesAngles,
  pythagoras,
  midsegment,
  inscribedAngle,
  tangentLength,
  thales,
  angleBisector,
  similarTriangles,
  trapezoidDiagonals,
  sector,
];
