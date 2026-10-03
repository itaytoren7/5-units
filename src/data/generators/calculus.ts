/**
 * "תרגול אינסופי" – חשבון דיפרנציאלי ואינטגרלי (שאלון 35581, שאלות 6–8).
 * פולינומים עם מקדמים שלמים ופונקציות מנה פשוטות בלבד (בלי מעריכיות ולוגריתמים, לפי המיקוד).
 * הפרמטרים נבחרים כך שהנקודות המיוחדות (קיצון, פיתול, חיתוך) יוצאות במספרים שלמים, כמו בבגרות.
 */
import type { NumericAnswer } from '../lessons/types';
import { coef, fmt, fracTex, gcd, polyTex, signed } from './helpers';
import type { ExerciseGenerator, Rng } from './types';

// ---------- local helpers ----------

/** Value of a polynomial (coefficients from the highest power) by Horner's rule. */
function polyAt(coefficients: number[], x: number): number {
  return coefficients.reduce((acc, c) => acc * x + c, 0);
}

function polyDerivative(coefficients: number[]): number[] {
  const degree = coefficients.length - 1;
  return coefficients.slice(0, degree).map((c, index) => c * (degree - index));
}

function nonZero(rng: Rng, min: number, max: number): number {
  let value = 0;
  while (value === 0) value = rng.int(min, max);
  return value;
}

/** A number used as a factor or a base: negatives in parentheses. */
function par(value: number, digits = 4): string {
  return value < 0 ? `(${fmt(value, digits)})` : fmt(value, digits);
}

/** 'x - 2', 'x + 3', 'x' (the expression variable − value). */
function shift(variable: string, value: number): string {
  return value === 0 ? variable : `${variable} ${signed(-value, 4)}`;
}

/** (x − p) as a factor: '(x - 2)', 'x'. */
function factor(p: number): string {
  return p === 0 ? 'x' : `(${shift('x', p)})`;
}

/** m·(x − x0) for the point-slope form: '3(x - 2)', '-(x + 1)', '4x', '0'. */
function slopeTimes(m: number, x0: number): string {
  if (m === 0) return '0';
  if (x0 === 0) return `${coef(m, 4)}x`;
  return `${coef(m, 4)}(${shift('x', x0)})`;
}

/** The polynomial with x replaced by a number, term by term: '2\cdot(-1)^{3} - 3\cdot(-1) + 4'. */
function substituted(coefficients: number[], x0: number): string {
  const degree = coefficients.length - 1;
  const base = par(x0);
  const parts: string[] = [];
  coefficients.forEach((c, index) => {
    if (c === 0) return;
    const power = degree - index;
    const abs = Math.abs(c);
    const xPart = power === 0 ? '' : power === 1 ? base : `${base}^{${power}}`;
    const body = power === 0 ? fmt(abs, 4) : abs === 1 ? xPart : `${fmt(abs, 4)}\\cdot ${xPart}`;
    if (parts.length === 0) parts.push(c < 0 ? `-${body}` : body);
    else parts.push(c < 0 ? `- ${body}` : `+ ${body}`);
  });
  return parts.length ? parts.join(' ') : '0';
}

/** Polynomial with rational coefficients, terms [numerator, denominator, power]: '\frac{x^{3}}{3} - \frac{5x^{2}}{2} + 6x'. */
function ratPolyTex(terms: Array<[number, number, number]>): string {
  const parts: string[] = [];
  for (const [num, den, power] of terms) {
    if (num === 0) continue;
    const g = gcd(num, den);
    const n = Math.abs(num) / g;
    const d = Math.abs(den) / g;
    const negative = num * den < 0;
    const xPart = power === 0 ? '' : power === 1 ? 'x' : `x^{${power}}`;
    let body: string;
    if (power === 0) body = d === 1 ? `${n}` : `\\frac{${n}}{${d}}`;
    else if (d === 1) body = `${n === 1 ? '' : n}${xPart}`;
    else body = `\\frac{${n === 1 ? '' : n}${xPart}}{${d}}`;
    if (parts.length === 0) parts.push(negative ? `-${body}` : body);
    else parts.push(negative ? `- ${body}` : `+ ${body}`);
  }
  return parts.length ? parts.join(' ') : '0';
}

/** A rational number p/q as KaTeX, wrapped in parentheses when negative (for subtraction). */
function fracPar(p: number, q: number): string {
  const tex = fracTex(p, q);
  return p * q < 0 ? `\\left(${tex}\\right)` : tex;
}

/** '' when the value is an integer, otherwise '\approx 2.3333' (to follow an exact fraction). */
function approxTail(value: number, digits = 4): string {
  return Number.isInteger(value) ? '' : `\\approx ${fmt(value, digits)}`;
}

/** √s in simplest display form (s a positive integer): '2', '\sqrt{3}'. */
function sqrtTex(s: number): string {
  const root = Math.round(Math.sqrt(s));
  return root * root === s ? String(root) : `\\sqrt{${s}}`;
}

/** k·√s: '8', '6\sqrt{2}'. */
function timesSqrtTex(k: number, s: number): string {
  const root = Math.round(Math.sqrt(s));
  return root * root === s ? fmt(k * root) : `${coef(k)}\\sqrt{${s}}`;
}

/** ' + \frac{4}{x}', ' - \frac{3}{x^{2}}' (k/x or k/x² as a trailing term). */
function overX(k: number, power: 1 | 2): string {
  const den = power === 1 ? 'x' : 'x^{2}';
  return `${k < 0 ? '-' : '+'} \\frac{${Math.abs(k)}}{${den}}`;
}

/** The same trailing term with x replaced by a number: ' + \frac{4}{-2}', ' - \frac{3}{(-2)^{2}}'. */
function overValue(k: number, x0: number, power: 1 | 2): string {
  const den = power === 1 ? fmt(x0) : `${par(x0)}^{2}`;
  return `${k < 0 ? '-' : '+'} \\frac{${Math.abs(k)}}{${den}}`;
}

/**
 * Answer helper. Integers and short decimals are typed exactly, so the 0.5% default would be too
 * loose for large values; other values keep the default tolerance.
 */
function answer(label: string, value: number): NumericAnswer {
  const short = Math.abs(value * 100 - Math.round(value * 100)) < 1e-7;
  return short ? { label, value, tolerance: 0.006 } : { label, value };
}

/** Cubic a·x³ + b·x² + c·x + d with f'(x) = 3a(x − p)(x − q). Needs a(p + q) even for integer coefficients. */
function cubicWithCriticalPoints(a: number, p: number, q: number, d: number): number[] {
  return [a, (-3 * a * (p + q)) / 2, 3 * a * p * q, d];
}

/** Two distinct integer critical points p < q with a(p + q) even. */
function criticalPair(rng: Rng, a: number): [number, number] {
  for (;;) {
    const p = rng.int(-3, 2);
    const q = p + rng.int(1, 4);
    if ((a * (p + q)) % 2 === 0) return [p, q];
  }
}

// ---------- generators ----------

const derivativeValue: ExerciseGenerator = {
  id: 'gen-calc-derivative-value',
  lessonIds: ['calc-derivative'],
  title: 'ערך הנגזרת בנקודה',
  difficulty: 1,
  generate(rng) {
    const variant = rng.int(0, 2);
    if (variant === 0) {
      const a = nonZero(rng, -3, 3);
      const b = rng.int(-6, 6);
      const c = rng.int(-8, 8);
      const d = rng.int(-9, 9);
      const x0 = rng.int(-3, 3);
      const coefficients = [a, b, c, d];
      const derivative = polyDerivative(coefficients);
      const value = polyAt(derivative, x0);
      return {
        statement: String.raw`נתונה הפונקציה $f(x)=${polyTex(coefficients)}$. חשבו את $f'(${x0})$.`,
        hints: [
          String.raw`גזרו כל מחובר בנפרד לפי הכלל $(x^n)'=nx^{n-1}$. הנגזרת של מספר קבוע היא $0$.`,
          String.raw`אחרי שמצאתם את $f'(x)$, הציבו בה $x=${x0}$.`,
        ],
        solutionSteps: [
          String.raw`גוזרים כל מחובר לפי $(x^n)'=nx^{n-1}$ (הנגזרת של הקבוע היא $0$): $f'(x)=${polyTex(derivative)}$.`,
          String.raw`מציבים $x=${x0}$ בנגזרת: $f'(${x0})=${substituted(derivative, x0)}=${fmt(value)}$.`,
        ],
        finalAnswer: String.raw`$f'(${x0})=${fmt(value)}$`,
        answers: [answer(String.raw`$f'(${x0})$`, value)],
        data: { variant, a, b, c, d, k: 0, x0 },
      };
    }
    if (variant === 1) {
      const a = nonZero(rng, -3, 3);
      const b = rng.int(-6, 6);
      const k = nonZero(rng, -8, 8);
      const x0 = rng.pick([-2, -1, 1, 2]);
      const value = 2 * a * x0 + b - k / (x0 * x0);
      const fTex = `${polyTex([a, b, 0])} ${overX(k, 1)}`;
      const dTex = `${polyTex([2 * a, b])} ${overX(-k, 2)}`;
      return {
        statement: String.raw`נתונה הפונקציה $f(x)=${fTex}$ (בתחום $x\ne0$). חשבו את $f'(${x0})$.`,
        hints: [
          String.raw`רשמו $\frac{${k}}{x}=${k}x^{-1}$ וגזרו לפי כלל החזקה: $(x^{-1})'=-x^{-2}=-\frac{1}{x^2}$.`,
          String.raw`גזרו את שאר המחוברים כרגיל, ואז הציבו $x=${x0}$.`,
        ],
        solutionSteps: [
          String.raw`כותבים $\frac{${k}}{x}=${k}x^{-1}$, ולפי $(x^n)'=nx^{n-1}$ נגזרתו היא $${-k}x^{-2}=${k > 0 ? '-' : ''}\frac{${Math.abs(k)}}{x^2}$.`,
          String.raw`לכן $f'(x)=${dTex}$.`,
          String.raw`מציבים $x=${x0}$: $f'(${x0})=${substituted([2 * a, b], x0)} ${overValue(-k, x0, 2)}=${fmt(value, 4)}$.`,
        ],
        finalAnswer: String.raw`$f'(${x0})=${fmt(value, 4)}$`,
        answers: [answer(String.raw`$f'(${x0})$`, value)],
        // stored in the common form a·x³ + b·x² + c·x + d + k/x
        data: { variant, a: 0, b: a, c: b, d: 0, k, x0 },
      };
    }
    // variant 2: the quotient (ax + b)/(x + d)
    const a = nonZero(rng, -4, 4);
    const d = nonZero(rng, -4, 4);
    let b = rng.int(-6, 6);
    if (a * d - b === 0) b += 1;
    const s = rng.pick([-2, -1, 1, 2]);
    const x0 = s - d;
    const numerator = a * d - b;
    const value = numerator / (s * s);
    const num = polyTex([a, b]);
    const den = polyTex([1, d]);
    return {
      statement: String.raw`נתונה הפונקציה $f(x)=\frac{${num}}{${den}}$. חשבו את $f'(${x0})$.`,
      hints: [
        String.raw`השתמשו בכלל נגזרת המנה: $\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}$.`,
        String.raw`כאן $u=${num}$, $u'=${a}$, $v=${den}$, $v'=1$. פשטו את המונה לפני ההצבה.`,
      ],
      solutionSteps: [
        String.raw`לפי כלל נגזרת המנה, עם $u=${num}$, $u'=${a}$, $v=${den}$, $v'=1$: $f'(x)=\frac{${coef(a)}(${den})-(${num})\cdot1}{(${den})^2}$.`,
        String.raw`במונה האיברים עם $x$ מתבטלים: $f'(x)=\frac{${numerator}}{(${den})^2}$.`,
        String.raw`מציבים $x=${x0}$: $f'(${x0})=\frac{${numerator}}{${par(s)}^2}=${fmt(value, 4)}$.`,
      ],
      finalAnswer: String.raw`$f'(${x0})=${fmt(value, 4)}$`,
      answers: [answer(String.raw`$f'(${x0})$`, value)],
      data: { variant, a, b, c: 0, d, k: 0, x0 },
    };
  },
};

const tangentLine: ExerciseGenerator = {
  id: 'gen-calc-tangent-line',
  lessonIds: ['calc-tangent', 'calc-derivative'],
  title: 'משוואת משיק בנקודה על הגרף',
  difficulty: 1,
  generate(rng) {
    const variant = rng.int(0, 1);
    let fTex: string;
    let dTex: string;
    let y0Line: string;
    let mLine: string;
    let m: number;
    let y0: number;
    let x0: number;
    let data: Record<string, number>;
    if (variant === 0) {
      const cubic = rng.next() < 0.5;
      const coefficients = cubic ? [nonZero(rng, -2, 2), rng.int(-4, 4), rng.int(-6, 6), rng.int(-8, 8)] : [nonZero(rng, -3, 3), rng.int(-6, 6), rng.int(-8, 8)];
      x0 = rng.int(-2, 3);
      const derivative = polyDerivative(coefficients);
      m = polyAt(derivative, x0);
      y0 = polyAt(coefficients, x0);
      fTex = polyTex(coefficients);
      dTex = polyTex(derivative);
      y0Line = `f(${x0})=${substituted(coefficients, x0)}=${y0}`;
      mLine = `m=f'(${x0})=${substituted(derivative, x0)}=${m}`;
      const [c3, c2, c1, c0] = cubic ? coefficients : [0, ...coefficients];
      data = { variant, a: c3, b: c2, c: c1, d: c0, k: 0, x0 };
    } else {
      const a = nonZero(rng, -3, 3);
      const b = rng.int(-6, 6);
      x0 = rng.pick([-2, -1, 1, 2]);
      const k = Math.abs(x0) === 2 ? 4 * nonZero(rng, -3, 3) : nonZero(rng, -8, 8);
      m = a - k / (x0 * x0);
      y0 = a * x0 + b + k / x0;
      fTex = `${polyTex([a, b])} ${overX(k, 1)}`;
      dTex = `${fmt(a)} ${overX(-k, 2)}`;
      y0Line = `f(${x0})=${substituted([a, b], x0)} ${overValue(k, x0, 1)}=${y0}`;
      mLine = `m=f'(${x0})=${fmt(a)} ${overValue(-k, x0, 2)}=${m}`;
      data = { variant, a: 0, b: 0, c: a, d: b, k, x0 };
    }
    const n = y0 - m * x0;
    const lineTex = polyTex([m, n]);
    return {
      statement: String.raw`נתונה הפונקציה $f(x)=${fTex}$${variant === 1 ? String.raw` (בתחום $x\ne0$)` : ''}. מצאו את משוואת המשיק לגרף הפונקציה בנקודה שבה $x=${x0}$, ורשמו אותה בצורה $y=mx+n$.`,
      hints: [
        String.raw`שיפוע המשיק הוא ערך הנגזרת בנקודת ההשקה: $m=f'(${x0})$.`,
        String.raw`חשבו גם את $f(${x0})$ – שיעור ה-$y$ של נקודת ההשקה – והציבו במשוואה $y-y_0=m(x-x_0)$.`,
      ],
      solutionSteps: [
        String.raw`שיעור ה-$y$ של נקודת ההשקה: $${y0Line}$, כלומר הנקודה $(${x0},${y0})$.`,
        String.raw`הנגזרת: $f'(x)=${dTex}$, ושיפוע המשיק הוא $${mLine}$.`,
        String.raw`לפי $y-y_0=m(x-x_0)$: $${shift('y', y0)}=${slopeTimes(m, x0)}$.`,
        String.raw`מסדרים: $y=${lineTex}$, כלומר $m=${m}$ ו-$n=${n}$.`,
      ],
      finalAnswer: String.raw`$y=${lineTex}$`,
      answers: [answer('שיפוע המשיק $m$', m), answer('$n$ (החיתוך עם ציר $y$)', n)],
      data,
    };
  },
};

const localExtrema: ExerciseGenerator = {
  id: 'gen-calc-local-extrema',
  lessonIds: ['calc-extrema-monotonic', 'calc-investigate-polynomial'],
  title: 'נקודות קיצון של פולינום ממעלה שלישית',
  difficulty: 2,
  generate(rng) {
    const a = rng.pick([1, -1, 1, -1, 2, -2]);
    const [p, q] = criticalPair(rng, a);
    const d = rng.int(-5, 5);
    const coefficients = cubicWithCriticalPoints(a, p, q, d);
    const derivative = polyDerivative(coefficients);
    const xMax = a > 0 ? p : q;
    const xMin = a > 0 ? q : p;
    const yMax = polyAt(coefficients, xMax);
    const yMin = polyAt(coefficients, xMin);
    const lead = 3 * a;
    const outside = a > 0 ? 'חיובית' : 'שלילית';
    const inside = a > 0 ? 'שלילית' : 'חיובית';
    const monotonic =
      a > 0
        ? String.raw`$f$ עולה כאשר $x<${p}$, יורדת כאשר $${p}<x<${q}$ ועולה כאשר $x>${q}$`
        : String.raw`$f$ יורדת כאשר $x<${p}$, עולה כאשר $${p}<x<${q}$ ויורדת כאשר $x>${q}$`;
    return {
      statement: String.raw`נתונה הפונקציה $f(x)=${polyTex(coefficients)}$. מצאו את נקודות הקיצון של הפונקציה וקבעו את סוגן.`,
      hints: [
        String.raw`גזרו והשוו את הנגזרת לאפס. חלקו את המשוואה ב-$${lead}$ כדי לקבל משוואה ריבועית פשוטה.`,
        String.raw`קבעו את סימן $f'$ משני צדי כל נקודה חשודה (טבלה), או בדקו את סימן $f''$ בנקודה.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=${polyTex(derivative)}$.`,
        String.raw`$f'(x)=0$: מחלקים ב-$${lead}$ ומקבלים $${polyTex([1, -(p + q), p * q])}=0$, כלומר $${factor(p)}${factor(q)}=0$, ולכן $x=${p}$ או $x=${q}$.`,
        String.raw`$f'$ היא פרבולה שהמקדם המוביל שלה $${lead}$, ולכן $f'(x)$ ${outside} כאשר $x<${p}$ או $x>${q}$, ו${inside} כאשר $${p}<x<${q}$.`,
        String.raw`מכאן ${monotonic}: ב-$x=${xMax}$ יש מקסימום וב-$x=${xMin}$ יש מינימום.`,
        String.raw`$f(${xMax})=${substituted(coefficients, xMax)}=${yMax}$ ו-$f(${xMin})=${substituted(coefficients, xMin)}=${yMin}$.`,
      ],
      finalAnswer: String.raw`מקסימום $(${xMax},${yMax})$, מינימום $(${xMin},${yMin})$.`,
      answers: [
        answer('$x$ של נקודת המקסימום', xMax),
        answer('$y$ של נקודת המקסימום', yMax),
        answer('$x$ של נקודת המינימום', xMin),
        answer('$y$ של נקודת המינימום', yMin),
      ],
      data: { a: coefficients[0], b: coefficients[1], c: coefficients[2], d: coefficients[3] },
    };
  },
};

const absoluteExtrema: ExerciseGenerator = {
  id: 'gen-calc-absolute-extrema',
  lessonIds: ['calc-absolute-extrema'],
  title: 'מקסימום ומינימום מוחלטים בקטע סגור',
  difficulty: 2,
  generate(rng) {
    const a = rng.pick([1, -1, 2, -2]);
    const [p, q] = criticalPair(rng, a);
    const d = rng.int(-6, 6);
    const coefficients = cubicWithCriticalPoints(a, p, q, d);
    const derivative = polyDerivative(coefficients);
    let left = 0;
    let right = 0;
    for (;;) {
      left = rng.int(p - 3, q - 1);
      right = rng.int(Math.max(left + 2, p + 1), q + 3);
      const insideCount = [p, q].filter((x) => x > left && x < right).length;
      if (left !== p && left !== q && right !== p && right !== q && insideCount > 0) break;
    }
    const inner = [p, q].filter((x) => x > left && x < right);
    const outer = [p, q].filter((x) => x < left || x > right);
    const candidates = [left, ...inner, right];
    const values = candidates.map((x) => polyAt(coefficients, x));
    const max = Math.max(...values);
    const min = Math.min(...values);
    const where = (value: number) =>
      candidates
        .filter((_, i) => values[i] === value)
        .map((x) => `$x=${x}$`)
        .join(' וב-');
    const list = candidates.map((x, i) => `f(${x})=${values[i]}`).join(String.raw`,\quad `);
    const innerText = inner.map((x) => `$x=${x}$`).join(' וגם ');
    const outerText = outer.length ? String.raw` (הנקודה $x=${outer[0]}$ אינה בקטע)` : '';
    return {
      statement: String.raw`נתונה הפונקציה $f(x)=${polyTex(coefficients)}$ בקטע $${left}\le x\le ${right}$. מצאו את הערך הגדול ביותר ואת הערך הקטן ביותר של הפונקציה בקטע (המקסימום והמינימום המוחלטים).`,
      hints: [
        String.raw`מצאו את הנקודות שבהן $f'(x)=0$ ובדקו אילו מהן נמצאות בתוך הקטע.`,
        String.raw`השוו את ערכי הפונקציה בנקודות הקיצון שבתוך הקטע ובשני קצות הקטע, $x=${left}$ ו-$x=${right}$.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=${polyTex(derivative)}=${3 * a}${factor(p)}${factor(q)}$, ולכן $f'(x)=0$ כאשר $x=${p}$ או $x=${q}$.`,
        String.raw`בתוך הקטע: ${innerText}${outerText}.`,
        String.raw`פונקציה רציפה בקטע סגור מקבלת את הערך הגדול ביותר ואת הקטן ביותר בנקודות קיצון פנימיות או בקצות הקטע. מחשבים: $${list}$.`,
        String.raw`הגדול מבין הערכים הוא $${max}$ (ב-${where(max)}) והקטן הוא $${min}$ (ב-${where(min)}).`,
      ],
      finalAnswer: String.raw`מקסימום מוחלט $${max}$, מינימום מוחלט $${min}$.`,
      answers: [answer('הערך הגדול ביותר (מקסימום מוחלט)', max), answer('הערך הקטן ביותר (מינימום מוחלט)', min)],
      data: { a: coefficients[0], b: coefficients[1], c: coefficients[2], d: coefficients[3], left, right },
    };
  },
};

const asymptotes: ExerciseGenerator = {
  id: 'gen-calc-asymptotes',
  lessonIds: ['calc-asymptotes', 'calc-investigate-rational'],
  title: 'אסימפטוטות של פונקציית מנה',
  difficulty: 1,
  generate(rng) {
    let c = rng.pick([1, 1, 2, -1, -2, 3]);
    let d = rng.int(-8, 8);
    const a = rng.next() < 0.2 ? 0 : nonZero(rng, -6, 6);
    let b = rng.int(-7, 7);
    if (a * d - b * c === 0) b += b >= 0 ? 1 : -1;
    if (a === 0 && c < 0) {
      // b/(cx + d) with a negative c reads better as (−b)/(−cx − d)
      b = -b;
      c = -c;
      d = -d;
    }
    const vertical = -d / c;
    const horizontal = a / c;
    const num = polyTex([a, b]);
    const den = polyTex([c, d]);
    const vTex = fracTex(-d, c);
    const hTex = fracTex(a, c);
    const numAtPole = fracTex(b * c - a * d, c);
    const overXTerm = (k: number) => (k === 0 ? '' : ` ${k < 0 ? '-' : '+'} \\frac{${Math.abs(k)}}{x}`);
    const limitStep =
      a === 0
        ? String.raw`המונה הוא מספר קבוע והמכנה שואף לאינסוף כאשר $x\to\pm\infty$, לכן $f(x)\to0$: האסימפטוטה האופקית היא $y=0$.`
        : String.raw`כאשר $x\to\pm\infty$ מחלקים את המונה ואת המכנה ב-$x$: $f(x)=\frac{${fmt(a)}${overXTerm(b)}}{${fmt(c)}${overXTerm(d)}}\to\frac{${a}}{${c}}=${hTex}$, ולכן האסימפטוטה האופקית היא $y=${hTex}$.`;
    return {
      statement: String.raw`נתונה הפונקציה $f(x)=\frac{${num}}{${den}}$. מצאו את האסימפטוטות של הפונקציה המקבילות לצירים.`,
      hints: [
        String.raw`אסימפטוטה אנכית – ב-$x$ שבו המכנה מתאפס והמונה אינו מתאפס.`,
        String.raw`אסימפטוטה אופקית – הגבול של $f(x)$ כאשר $x\to\pm\infty$. כשמעלות המונה והמכנה שוות, הגבול הוא מנת המקדמים המובילים.`,
      ],
      solutionSteps: [
        String.raw`המכנה מתאפס כאשר $${den}=0$, כלומר $x=${vTex}$. בנקודה זו המונה שווה ל-$${numAtPole}\ne0$, ולכן $|f(x)|\to\infty$ כאשר $x\to${vTex}$: זו אסימפטוטה אנכית $x=${vTex}$.`,
        limitStep,
      ],
      finalAnswer: String.raw`אסימפטוטה אנכית $x=${vTex}$, אסימפטוטה אופקית $y=${hTex}$.`,
      answers: [answer('האסימפטוטה האנכית: $x=$', vertical), answer('האסימפטוטה האופקית: $y=$', horizontal)],
      data: { a, b, c, d },
    };
  },
};

const inflection: ExerciseGenerator = {
  id: 'gen-calc-inflection-cubic',
  lessonIds: ['calc-concavity'],
  title: 'נקודת פיתול של פולינום ממעלה שלישית',
  difficulty: 1,
  generate(rng) {
    const a = rng.pick([1, -1, 2, -2]);
    const xi = rng.int(-3, 3);
    const b = -3 * a * xi;
    const c = rng.int(-9, 9);
    const d = rng.int(-6, 6);
    const coefficients = [a, b, c, d];
    const first = polyDerivative(coefficients);
    const second = polyDerivative(first);
    const yi = polyAt(coefficients, xi);
    const upSide = a > 0 ? String.raw`$x>${xi}$` : String.raw`$x<${xi}$`;
    const downSide = a > 0 ? String.raw`$x<${xi}$` : String.raw`$x>${xi}$`;
    return {
      statement: String.raw`נתונה הפונקציה $f(x)=${polyTex(coefficients)}$. מצאו את נקודת הפיתול של הפונקציה וקבעו את תחומי הקעירות שלה.`,
      hints: [
        String.raw`נקודת פיתול היא נקודה שבה $f''$ מחליפה סימן. חשבו את $f''(x)$ והשוו לאפס.`,
        String.raw`$f''(x)=${polyTex(second)}$. אחרי שמצאתם את $x$, הציבו אותו ב-$f$ (לא ב-$f''$) כדי לקבל את שיעור ה-$y$.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=${polyTex(first)}$ ו-$f''(x)=${polyTex(second)}$.`,
        String.raw`$f''(x)=0\Rightarrow ${polyTex(second)}=0\Rightarrow x=${xi}$. $f''$ היא פונקציה קווית, ולכן היא מחליפה סימן ב-$x=${xi}$: זו נקודת פיתול.`,
        String.raw`$f''(x)>0$ (הגרף קעור כלפי מעלה, $\cup$) כאשר ${upSide}, ו-$f''(x)<0$ (קעור כלפי מטה, $\cap$) כאשר ${downSide}.`,
        String.raw`$f(${xi})=${substituted(coefficients, xi)}=${yi}$, ולכן נקודת הפיתול היא $(${xi},${yi})$.`,
      ],
      finalAnswer: String.raw`נקודת הפיתול $(${xi},${yi})$; קעורה כלפי מעלה כאשר ${upSide}, כלפי מטה כאשר ${downSide}.`,
      answers: [answer('$x$ של נקודת הפיתול', xi), answer('$y$ של נקודת הפיתול', yi)],
      data: { a, b, c, d },
    };
  },
};

const antiderivativePoint: ExerciseGenerator = {
  id: 'gen-calc-antiderivative-point',
  lessonIds: ['calc-indefinite-integral', 'calc-graph-integral'],
  title: 'מציאת פונקציה לפי הנגזרת ונקודה',
  difficulty: 2,
  generate(rng) {
    const variant = rng.next() < 0.7 ? 0 : 1;
    if (variant === 0) {
      const quartic = rng.next() < 0.4;
      const e = quartic ? nonZero(rng, -2, 2) : 0;
      const a = quartic ? rng.int(-3, 3) : nonZero(rng, -3, 3);
      const b = rng.int(-4, 4);
      const c = rng.int(-6, 6);
      const antiderivative = quartic ? [e, a, b, c, 0] : [a, b, c, 0];
      const derivative = polyDerivative(antiderivative);
      const x1 = rng.int(-2, 2);
      const y1 = rng.int(-10, 10);
      // xk ≠ 0, so that f(xk) is not just the constant C asked for in the first answer
      let xk = 0;
      while (xk === 0 || xk === x1) xk = rng.int(-3, 3);
      const fAtX1 = polyAt(antiderivative, x1);
      const constant = y1 - fAtX1;
      const full = [...antiderivative.slice(0, -1), constant];
      const value = polyAt(full, xk);
      return {
        statement: String.raw`נתון ש-$f'(x)=${polyTex(derivative)}$, וגרף הפונקציה $f(x)$ עובר בנקודה $(${x1},${y1})$. מצאו את $f(x)$ וחשבו את $f(${xk})$.`,
        hints: [
          String.raw`$f$ היא פונקציה קדומה של $f'$: בצעו אינטגרל לא מסוים לפי $\int x^n\,dx=\frac{x^{n+1}}{n+1}+C$, ואל תשכחו את $C$.`,
          String.raw`הציבו את הנקודה $(${x1},${y1})$ ב-$f(x)$ כדי למצוא את $C$.`,
        ],
        solutionSteps: [
          String.raw`מבצעים אינטגרל לא מסוים איבר-איבר: $f(x)=\int\left(${polyTex(derivative)}\right)dx=${polyTex(antiderivative)}+C$.`,
          String.raw`הגרף עובר בנקודה $(${x1},${y1})$, לכן $f(${x1})=${y1}$: $${substituted(antiderivative, x1)}+C=${y1}$, כלומר $${fAtX1}+C=${y1}$ ו-$C=${constant}$.`,
          String.raw`לכן $f(x)=${polyTex(full)}$.`,
          String.raw`$f(${xk})=${substituted(full, xk)}=${value}$.`,
        ],
        finalAnswer: String.raw`$f(x)=${polyTex(full)}$, $f(${xk})=${value}$.`,
        answers: [answer('האיבר החופשי $C$ של $f(x)$', constant), answer(String.raw`$f(${xk})$`, value)],
        data: { variant, e, a, b, c, k: 0, x1, y1, xk },
      };
    }
    // variant 1: f'(x) = 2a·x + b − k/x² for x > 0, so f(x) = a·x² + b·x + k/x + C
    const a = nonZero(rng, -2, 2);
    const b = rng.int(-5, 5);
    const k = nonZero(rng, -6, 6);
    const x1 = rng.pick([1, 2]);
    const xk = rng.pick([1, 2, 4].filter((x) => x !== x1));
    const y1 = rng.int(-8, 8);
    const fAt = (x: number) => a * x * x + b * x + k / x;
    const constant = y1 - fAt(x1);
    const value = fAt(xk) + constant;
    const derivativeTex = `${polyTex([2 * a, b])} ${overX(-k, 2)}`;
    const antiTex = `${polyTex([a, b, 0])} ${overX(k, 1)}`;
    const subst = (x: number) => `${substituted([a, b, 0], x)} ${overValue(k, x, 1)}`;
    const withConstant = `${antiTex} ${signed(constant, 4, true)}`;
    return {
      statement: String.raw`נתון ש-$f'(x)=${derivativeTex}$ לכל $x>0$, וגרף הפונקציה $f(x)$ עובר בנקודה $(${x1},${y1})$. מצאו את $f(x)$ וחשבו את $f(${xk})$.`,
      hints: [
        String.raw`רשמו $\frac{1}{x^2}=x^{-2}$. לפי $\int x^n\,dx=\frac{x^{n+1}}{n+1}+C$ מתקבל $\int x^{-2}\,dx=-x^{-1}+C=-\frac{1}{x}+C$.`,
        String.raw`הציבו את הנקודה $(${x1},${y1})$ ב-$f(x)$ כדי למצוא את $C$.`,
      ],
      solutionSteps: [
        String.raw`לפי $\int x^{-2}\,dx=-\frac{1}{x}+C$, האינטגרל של $${k > 0 ? '-' : ''}\frac{${Math.abs(k)}}{x^2}$ הוא $${k < 0 ? '-' : ''}\frac{${Math.abs(k)}}{x}$. לכן $f(x)=${antiTex}+C$.`,
        String.raw`$f(${x1})=${y1}$: $${subst(x1)}+C=${y1}$, כלומר $${fmt(fAt(x1), 4)}+C=${y1}$ ו-$C=${fmt(constant, 4)}$.`,
        String.raw`לכן $f(x)=${withConstant}$.`,
        String.raw`$f(${xk})=${subst(xk)} ${signed(constant, 4, true)}=${fmt(value, 4)}$.`,
      ],
      finalAnswer: String.raw`$f(x)=${withConstant}$, $f(${xk})=${fmt(value, 4)}$.`,
      answers: [answer('האיבר החופשי $C$ של $f(x)$', constant), answer(String.raw`$f(${xk})$`, value)],
      data: { variant, e: 0, a, b, c: 0, k, x1, y1, xk },
    };
  },
};

const areaParabolaAxis: ExerciseGenerator = {
  id: 'gen-calc-area-parabola-axis',
  lessonIds: ['calc-areas'],
  title: 'אינטגרל ושטח בין פרבולה לציר x',
  difficulty: 2,
  generate(rng) {
    const a = rng.pick([1, -1, 2, -2, 3, -3]);
    const r1 = rng.int(-5, 3);
    const width = rng.int(2, 5);
    const r2 = r1 + width;
    const coefficients = [a, -a * (r1 + r2), a * r1 * r2];
    const sixF = (x: number) => 2 * a * x ** 3 - 3 * a * (r1 + r2) * x ** 2 + 6 * a * r1 * r2 * x;
    const integral = (-a * width ** 3) / 6;
    const area = Math.abs(integral);
    const integralTex = fracTex(-a * width ** 3, 6);
    const areaTex = fracTex(Math.abs(a) * width ** 3, 6);
    const antiTex = ratPolyTex([
      [a, 3, 3],
      [-a * (r1 + r2), 2, 2],
      [a * r1 * r2, 1, 1],
    ]);
    const divide = a === 1 ? '' : String.raw`מחלקים ב-$${a}$: `;
    const sideText =
      a > 0
        ? String.raw`הפרבולה פתוחה כלפי מעלה, ולכן בין נקודות החיתוך הגרף נמצא מתחת לציר $x$ והאינטגרל שלילי. השטח הוא הערך המוחלט שלו`
        : String.raw`הפרבולה פתוחה כלפי מטה, ולכן בין נקודות החיתוך הגרף נמצא מעל ציר $x$, והשטח שווה לאינטגרל`;
    return {
      statement: String.raw`נתונה הפונקציה $f(x)=${polyTex(coefficients)}$. נסמן ב-$x_1<x_2$ את שיעורי ה-$x$ של נקודות החיתוך של הגרף עם ציר $x$. מצאו את $x_1$ ואת $x_2$, חשבו את $\int_{x_1}^{x_2}f(x)\,dx$, וחשבו את השטח המוגבל על ידי גרף הפונקציה וציר $x$.`,
      hints: [
        String.raw`פתרו $f(x)=0$ (אפשר לחלק קודם במקדם של $x^2$).`,
        String.raw`מצאו פונקציה קדומה $F$ וחשבו $F(x_2)-F(x_1)$.`,
        String.raw`שטח הוא תמיד חיובי: אם הגרף מתחת לציר $x$, השטח הוא מינוס האינטגרל.`,
      ],
      solutionSteps: [
        String.raw`$f(x)=0$: ${divide}$${polyTex([1, -(r1 + r2), r1 * r2])}=0$, כלומר $${factor(r1)}${factor(r2)}=0$, ולכן $x_1=${r1}$ ו-$x_2=${r2}$.`,
        String.raw`פונקציה קדומה: $F(x)=${antiTex}$.`,
        String.raw`$\int_{${r1}}^{${r2}}f(x)\,dx=F(${r2})-F(${r1})=${fracTex(sixF(r2), 6)}-${fracPar(sixF(r1), 6)}=${integralTex}${approxTail(integral)}$.`,
        String.raw`${sideText}: $S=${areaTex}${approxTail(area)}$.`,
      ],
      finalAnswer: String.raw`$x_1=${r1}$, $x_2=${r2}$; האינטגרל $${integralTex}$; השטח $${areaTex}$.`,
      answers: [answer('$x_1$', r1), answer('$x_2$', r2), answer(String.raw`$\int_{x_1}^{x_2}f(x)\,dx$`, integral), answer('השטח המוגבל', area)],
      data: { a: coefficients[0], b: coefficients[1], c: coefficients[2] },
    };
  },
};

const areaParabolaLine: ExerciseGenerator = {
  id: 'gen-calc-area-parabola-line',
  lessonIds: ['calc-areas'],
  title: 'שטח בין פרבולה לישר',
  difficulty: 3,
  generate(rng) {
    const s = rng.sign();
    const x1 = rng.int(-4, 3);
    const x2 = x1 + rng.int(2, 5);
    let m = rng.int(-4, 4);
    const n = rng.int(-6, 6);
    if (m === 0 && n === 0) m = 1;
    const parabola = [s, -s * (x1 + x2) + m, s * x1 * x2 + n];
    const line = [m, n];
    const width = x2 - x1;
    const area = width ** 3 / 6;
    // upper − lower = −(x − x1)(x − x2) in both cases
    const integrand = [-1, x1 + x2, -x1 * x2];
    const sixH = (x: number) => -2 * x ** 3 + 3 * (x1 + x2) * x ** 2 - 6 * x1 * x2 * x;
    const antiTex = ratPolyTex([
      [-1, 3, 3],
      [x1 + x2, 2, 2],
      [-x1 * x2, 1, 1],
    ]);
    const difference = [s, -s * (x1 + x2), s * x1 * x2];
    const areaTex = fracTex(width ** 3, 6);
    const order =
      s > 0
        ? String.raw`הפרבולה פתוחה כלפי מעלה, ולכן בין נקודות החיתוך הישר נמצא מעל הפרבולה: $g(x)-f(x)=${polyTex(integrand)}$`
        : String.raw`הפרבולה פתוחה כלפי מטה, ולכן בין נקודות החיתוך הפרבולה נמצאת מעל הישר: $f(x)-g(x)=${polyTex(integrand)}$`;
    return {
      statement: String.raw`נתונות הפונקציות $f(x)=${polyTex(parabola)}$ ו-$g(x)=${polyTex(line)}$. מצאו את שיעורי ה-$x$ של נקודות החיתוך של שני הגרפים, וחשבו את השטח המוגבל בין הגרפים.`,
      hints: [
        String.raw`השוו $f(x)=g(x)$ והעבירו את כל האיברים לאגף אחד.`,
        'השטח הוא האינטגרל של (הפונקציה העליונה פחות התחתונה) בין נקודות החיתוך. בדקו איזה גרף עליון, למשל בנקודת האמצע.',
      ],
      solutionSteps: [
        String.raw`$f(x)=g(x)\Rightarrow ${polyTex(difference)}=0\Rightarrow ${factor(x1)}${factor(x2)}=0$, ולכן $x=${x1}$ או $x=${x2}$.`,
        String.raw`${order}.`,
        String.raw`$S=\int_{${x1}}^{${x2}}\left(${polyTex(integrand)}\right)dx$, ופונקציה קדומה היא $H(x)=${antiTex}$.`,
        String.raw`$S=H(${x2})-H(${x1})=${fracTex(sixH(x2), 6)}-${fracPar(sixH(x1), 6)}=${areaTex}${approxTail(area)}$.`,
      ],
      finalAnswer: String.raw`נקודות החיתוך ב-$x=${x1}$ וב-$x=${x2}$; השטח $${areaTex}$.`,
      answers: [answer('$x$ של נקודת החיתוך השמאלית', x1), answer('$x$ של נקודת החיתוך הימנית', x2), answer('השטח המוגבל', area)],
      data: { fa: parabola[0], fb: parabola[1], fc: parabola[2], m, n },
    };
  },
};

const maxRectangle: ExerciseGenerator = {
  id: 'gen-calc-max-rectangle',
  lessonIds: ['calc-extremum-problems'],
  title: 'מלבן בשטח מקסימלי מתחת לפרבולה',
  difficulty: 3,
  generate(rng) {
    const variant = rng.int(0, 1);
    const a = rng.pick([1, 1, 2]);
    const s = rng.int(1, 6);
    const c = 3 * a * s;
    const t = Math.sqrt(s);
    const height = 2 * a * s;
    const area = variant === 0 ? 4 * a * s * t : 2 * a * s * t;
    const tTex = sqrtTex(s);
    const areaTex = timesSqrtTex(variant === 0 ? 4 * a * s : 2 * a * s, s);
    const exact = Number.isInteger(t);
    const heightTex = `${c}-${coef(a)}t^2`;
    const setting =
      variant === 0
        ? String.raw`מלבן $ABCD$ בנוי כך שהצלע $AB$ מונחת על ציר $x$, והקודקודים $C$ ו-$D$ נמצאים על גרף הפונקציה מעל ציר $x$, כאשר $C$ ברביע הראשון.`
        : String.raw`מלבן $OABC$ בנוי כך ש-$O$ היא ראשית הצירים, הקודקוד $A$ על החלק החיובי של ציר $x$, הקודקוד $C$ על החלק החיובי של ציר $y$, והקודקוד $B$ על גרף הפונקציה ברביע הראשון.`;
    const vertex = variant === 0 ? 'C' : 'B';
    const sides =
      variant === 0
        ? String.raw`נסמן $C=(t,\ ${heightTex})$, כאשר $0<t<${sqrtTex(c / a)}$. מסימטריית הפרבולה ביחס לציר $y$, $D=(-t,\ ${heightTex})$, ולכן רוחב המלבן $2t$ וגובהו $${heightTex}$.`
        : String.raw`נסמן $B=(t,\ ${heightTex})$, כאשר $0<t<${sqrtTex(c / a)}$. אז $OA=t$ ו-$OC=${heightTex}$.`;
    const areaFn = variant === 0 ? String.raw`S(t)=2t\left(${heightTex}\right)=${polyTex([-2 * a, 0, 2 * c, 0], 't')}` : String.raw`S(t)=t\left(${heightTex}\right)=${polyTex([-a, 0, c, 0], 't')}`;
    const derivative = variant === 0 ? [-6 * a, 0, 2 * c] : [-3 * a, 0, c];
    const approxArea = exact ? '' : `\\approx ${fmt(area, 3)}`;
    return {
      statement: String.raw`נתונה הפונקציה $f(x)=${c} - ${coef(a)}x^{2}$. ${setting} מצאו את שיעור ה-$x$ של הקודקוד $${vertex}$ שעבורו שטח המלבן מקסימלי, וחשבו את השטח המקסימלי.`,
      hints: [
        String.raw`סמנו את שיעור ה-$x$ של $${vertex}$ ב-$t$. נקודה על הגרף היא $(t,f(t))$, ומכאן אורכי צלעות המלבן.`,
        String.raw`בנו את פונקציית השטח $S(t)$, גזרו והשוו לאפס. הראו שזו נקודת מקסימום (סימן $S'$ או $S''$).`,
      ],
      solutionSteps: [
        sides,
        String.raw`$${areaFn}$.`,
        String.raw`$S'(t)=${polyTex(derivative, 't')}=0\Rightarrow t^2=${s}$, ובתחום $t>0$: $t=${tTex}$.`,
        String.raw`$S''(t)=${polyTex([2 * derivative[0], 0], 't')}<0$ עבור $t>0$, לכן זו נקודת מקסימום.`,
        String.raw`גובה המלבן: $f(${tTex})=${c}-${a === 1 ? '' : `${a}\\cdot `}${s}=${height}$. השטח המקסימלי: $S(${tTex})=${variant === 0 ? `2\\cdot ${tTex}` : tTex}\cdot ${height}=${areaTex}${approxArea}$.`,
      ],
      finalAnswer: String.raw`$x=${tTex}${exact ? '' : `\\approx ${fmt(t, 3)}`}$, השטח המקסימלי $${areaTex}${approxArea}$.`,
      answers: [answer(String.raw`$x$ של הקודקוד $${vertex}$`, t), answer('השטח המקסימלי', area)],
      data: { variant, a, c },
    };
  },
};

export const calculusGenerators: ExerciseGenerator[] = [
  derivativeValue,
  tangentLine,
  localExtrema,
  absoluteExtrema,
  asymptotes,
  inflection,
  antiderivativePoint,
  areaParabolaAxis,
  areaParabolaLine,
  maxRectangle,
];
