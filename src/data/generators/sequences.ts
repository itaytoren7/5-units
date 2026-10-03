/**
 * "תרגול אינסופי" – סדרות (שאלון 35581, שאלה 2). לפי מיקוד 2026 רק סדרה הנדסית:
 * איבר כללי, מציאת a₁ ו-q משני איברים, סכום סופי, סכום אינסופי (|q|<1) וכלל הנסיגה a_{n+1}=q·a_n.
 * המנה נשמרת כשבר qn/qd, ו-a₁ נבחר ככפולה של חזקת המכנה כך שכל האיברים המופיעים שלמים.
 */
import type { NumericAnswer } from '../lessons/types';
import { fracTex } from './helpers';
import type { ExerciseGenerator, GeneratedExercise, Rng } from './types';

// ---------- local helpers ----------

/** The common ratio q = n/d (d > 0). */
interface Ratio {
  n: number;
  d: number;
}

const INTEGER_RATIOS: Ratio[] = [
  { n: 2, d: 1 },
  { n: -2, d: 1 },
  { n: 3, d: 1 },
  { n: -3, d: 1 },
];
const HALF_RATIOS: Ratio[] = [
  { n: 1, d: 2 },
  { n: -1, d: 2 },
];

function qTex(q: Ratio): string {
  return fracTex(q.n, q.d);
}

/** q^e with parentheses when q is negative or a fraction: '2^{5}', '\left(-\frac{1}{2}\right)^{n-1}'. */
function qPowTex(q: Ratio, exponent: number | string): string {
  return q.n < 0 || q.d !== 1 ? `\\left(${qTex(q)}\\right)^{${exponent}}` : `${q.n}^{${exponent}}`;
}

/** q as a factor: '2', '(-2)', '\left(\frac{1}{2}\right)'. */
function qFactor(q: Ratio): string {
  if (q.d !== 1) return `\\left(${qTex(q)}\\right)`;
  return q.n < 0 ? `(${q.n})` : `${q.n}`;
}

/** The value q^e as KaTeX ('32', '\frac{1}{16}'), in parentheses when negative. */
function powValueTex(q: Ratio, e: number): string {
  const tex = fracTex(q.n ** e, q.d ** e);
  return q.n ** e < 0 ? `\\left(${tex}\\right)` : tex;
}

/** The exact term a₁·q^(k−1); a₁ is a multiple of d^(k−1), so the division is exact. */
function term(a1: number, q: Ratio, k: number): number {
  return (a1 * q.n ** (k - 1)) / q.d ** (k - 1);
}

function nonZero(rng: Rng, min: number, max: number): number {
  let value = 0;
  while (value === 0) value = rng.int(min, max);
  return value;
}

/** Integers and short decimals are typed exactly, so the 0.5% default would be too loose for large terms. */
function answer(label: string, value: number): NumericAnswer {
  const short = Math.abs(value * 100 - Math.round(value * 100)) < 1e-7;
  return short ? { label, value, tolerance: 0.006 } : { label, value };
}

/** A first term that keeps the first `count` terms integral (a multiple of d^(count−1) for a fractional q). */
function firstTerm(rng: Rng, q: Ratio, count: number, positive = false): number {
  const sign = positive ? 1 : rng.sign();
  if (q.d === 1) return positive ? rng.int(1, 5) : nonZero(rng, -5, 5);
  return sign * rng.pick([1, 3, 5]) * q.d ** (count - 1);
}

/** Number of terms that keeps the numbers bagrut-sized for the given ratio. */
function termCount(rng: Rng, q: Ratio): number {
  if (q.d === 2) return rng.int(4, 7);
  if (q.d === 3) return rng.int(4, 5);
  return Math.abs(q.n) === 2 ? rng.int(5, 8) : rng.int(4, 6);
}

const generalTerm = String.raw`a_n=a_1q^{n-1}`;

/** '\frac{a}{b}=c', dropping '=c' when the quotient is already written in lowest terms. */
function quotientTex(numerator: number, denominator: number): string {
  const raw = `\\frac{${numerator}}{${denominator}}`;
  const reduced = fracTex(numerator, denominator);
  return raw === reduced ? raw : `${raw}=${reduced}`;
}

/** 'q' or 'q^{3}' (the symbol, for formulas). */
function qSym(exponent: number): string {
  return exponent === 1 ? 'q' : `q^{${exponent}}`;
}

// ---------- generators ----------

const geometricTerm: ExerciseGenerator = {
  id: 'gen-seq-geometric-term',
  lessonIds: ['seq-geometric-intro'],
  title: 'איבר בסדרה הנדסית',
  difficulty: 1,
  generate(rng) {
    const variant = rng.int(0, 1);
    const q = rng.pick([...INTEGER_RATIOS, ...HALF_RATIOS, { n: 1, d: 3 }]);
    const n = termCount(rng, q);
    const a1 = firstTerm(rng, q, n);
    const an = term(a1, q, n);
    const [t1, t2, t3] = [1, 2, 3].map((k) => term(a1, q, k));
    const statement =
      variant === 0
        ? String.raw`בסדרה הנדסית האיבר הראשון הוא $a_1=${a1}$ והמנה היא $q=${qTex(q)}$. חשבו את $a_{${n}}$.`
        : String.raw`שלושת האיברים הראשונים של סדרה הנדסית הם $${t1},\ ${t2},\ ${t3},\ \dots$. חשבו את האיבר ה-${n} בסדרה, $a_{${n}}$.`;
    const steps = [
      ...(variant === 1 ? [String.raw`המנה: $q=\frac{a_2}{a_1}=${quotientTex(t2, t1)}$ (ואכן גם $\frac{a_3}{a_2}=${quotientTex(t3, t2)}$).`] : []),
      String.raw`לפי נוסחת האיבר הכללי $${generalTerm}$: $a_{${n}}=${a1}\cdot${qPowTex(q, n - 1)}$.`,
      String.raw`$${qPowTex(q, n - 1)}=${fracTex(q.n ** (n - 1), q.d ** (n - 1))}$, ולכן $a_{${n}}=${a1}\cdot${powValueTex(q, n - 1)}=${an}$.`,
    ];
    return {
      statement,
      hints: [
        variant === 0 ? String.raw`השתמשו בנוסחת האיבר הכללי $${generalTerm}$.` : String.raw`מצאו קודם את המנה: $q=\frac{a_2}{a_1}$.`,
        String.raw`שימו לב שהחזקה היא $n-1=${n - 1}$ ולא $${n}$.`,
      ],
      solutionSteps: steps,
      finalAnswer: String.raw`$a_{${n}}=${an}$`,
      answers: [answer(String.raw`$a_{${n}}$`, an)],
      data: { variant, a1, qn: q.n, qd: q.d, n },
    };
  },
};

const twoTerms: ExerciseGenerator = {
  id: 'gen-seq-two-terms',
  lessonIds: ['seq-geometric-intro', 'seq-geometric-review'],
  title: 'מציאת a₁ ו-q משני איברים',
  difficulty: 2,
  generate(rng) {
    const q = rng.pick([...INTEGER_RATIOS, ...HALF_RATIOS]);
    const gap = rng.pick([2, 3]);
    const m = rng.int(2, Math.abs(q.n) === 3 ? 6 - gap : 4);
    const k = m + gap;
    const a1 = q.d === 1 ? nonZero(rng, Math.abs(q.n) === 3 ? -3 : -5, Math.abs(q.n) === 3 ? 3 : 5) : rng.sign() * rng.pick([1, 3]) * q.d ** (k - 1);
    const am = term(a1, q, m);
    const ak = term(a1, q, k);
    // for an even gap q² does not fix the sign of q, so the statement adds a condition
    let condition = 0;
    let conditionText = '';
    let reason = '';
    if (gap === 2) {
      if (q.n < 0) {
        condition = 3;
        conditionText = ' נתון שהמנה של הסדרה שלילית.';
        reason = 'לפי הנתון המנה שלילית';
      } else if (a1 > 0) {
        condition = 1;
        conditionText = ' נתון שכל איברי הסדרה חיוביים.';
        reason = 'כל האיברים חיוביים, ולכן המנה חיובית (במנה שלילית הסימנים מתחלפים)';
      } else {
        condition = 2;
        conditionText = ' נתון שכל איברי הסדרה שליליים.';
        reason = 'כל האיברים שליליים, ולכן המנה חיובית (במנה שלילית הסימנים מתחלפים)';
      }
    }
    const ratioTex = fracTex(q.n ** gap, q.d ** gap);
    const rootStep =
      gap === 3
        ? String.raw`לחזקה שלישית יש פתרון ממשי יחיד: $q=\sqrt[3]{${ratioTex}}=${qTex(q)}$.`
        : String.raw`$q^2=${ratioTex}$ נותן $q=${fracTex(Math.abs(q.n), q.d)}$ או $q=${fracTex(-Math.abs(q.n), q.d)}$. ${reason}, לכן $q=${qTex(q)}$.`;
    return {
      statement: String.raw`בסדרה הנדסית $a_{${m}}=${am}$ ו-$a_{${k}}=${ak}$.${conditionText} מצאו את המנה $q$ ואת האיבר הראשון $a_1$.`,
      hints: [
        String.raw`רשמו כל איבר לפי $${generalTerm}$ וחלקו משוואה במשוואה כדי לבטל את $a_1$.`,
        String.raw`$\frac{a_{${k}}}{a_{${m}}}=q^{${gap}}$.${gap === 2 ? ' לשוויון $q^2=c$ יש שני פתרונות – היעזרו בנתון כדי לבחור.' : ''}`,
      ],
      solutionSteps: [
        String.raw`$a_{${m}}=a_1${qSym(m - 1)}$ ו-$a_{${k}}=a_1q^{${k - 1}}$. מחלקים: $\frac{a_{${k}}}{a_{${m}}}=q^{${gap}}$, כלומר $q^{${gap}}=${quotientTex(ak, am)}$.`,
        rootStep,
        String.raw`$a_1=\frac{a_{${m}}}{${qSym(m - 1)}}=\frac{${am}}{${fracTex(q.n ** (m - 1), q.d ** (m - 1))}}=${a1}$.`,
      ],
      finalAnswer: String.raw`$q=${qTex(q)}$, $a_1=${a1}$`,
      answers: [answer('המנה $q$', q.n / q.d), answer('$a_1$', a1)],
      data: { m, k, am, ak, condition, a1, qn: q.n, qd: q.d },
    };
  },
};

const geometricSum: ExerciseGenerator = {
  id: 'gen-seq-geometric-sum',
  lessonIds: ['seq-geometric-sum'],
  title: 'סכום סדרה הנדסית סופית',
  difficulty: 2,
  generate(rng) {
    const variant = rng.int(0, 2);
    const q = variant === 2 ? rng.pick([{ n: 2, d: 1 }, { n: 3, d: 1 }, { n: 1, d: 2 }]) : rng.pick([{ n: 2, d: 1 }, { n: 3, d: 1 }, { n: -2, d: 1 }, ...HALF_RATIOS]);
    const n = termCount(rng, q);
    const a1 = firstTerm(rng, q, n, variant === 2);
    const sum = (a1 * (q.n ** n - q.d ** n)) / (q.d ** (n - 1) * (q.n - q.d));
    const [t1, t2, t3] = [1, 2, 3].map((k) => term(a1, q, k));
    const sumFormula = String.raw`S_n=\frac{a_1(q^n-1)}{q-1}`;
    const qMinusOne = fracTex(q.n - q.d, q.d);
    if (variant === 2) {
      const powerMinusOne = fracTex(q.n ** n - q.d ** n, q.d ** n);
      const power = fracTex(q.n ** n, q.d ** n);
      return {
        statement: String.raw`בסדרה הנדסית $a_1=${a1}$ ו-$q=${qTex(q)}$. סכום $n$ האיברים הראשונים של הסדרה הוא $${sum}$. מצאו את $n$.`,
        hints: [
          String.raw`הציבו בנוסחה $${sumFormula}$ ובודדו את $q^n$.`,
          String.raw`תקבלו משוואה מהצורה $q^n=c$; כתבו את $c$ כחזקה של $${q.d === 1 ? q.n : q.d}$.`,
        ],
        solutionSteps: [
          String.raw`לפי $${sumFormula}$: $\frac{${a1}\left(${qPowTex(q, 'n')}-1\right)}{${qMinusOne}}=${sum}$.`,
          String.raw`$${qPowTex(q, 'n')}-1=\frac{${sum}\cdot${q.d === 1 ? qMinusOne : `\\left(${qMinusOne}\\right)`}}{${a1}}=${powerMinusOne}$, ולכן $${qPowTex(q, 'n')}=${power}$.`,
          String.raw`$${power}=${qPowTex(q, n)}$, ולכן $n=${n}$.`,
        ],
        finalAnswer: String.raw`$n=${n}$`,
        answers: [answer('$n$', n)],
        data: { variant, a1, qn: q.n, qd: q.d, n, sum },
      };
    }
    const computeStep =
      q.d === 1
        ? String.raw`$${qPowTex(q, n)}=${q.n ** n}$, ולכן $S_{${n}}=\frac{${a1}\cdot${q.n ** n - 1 < 0 ? `(${q.n ** n - 1})` : q.n ** n - 1}}{${q.n - 1}}=${sum}$.`
        : String.raw`$${qPowTex(q, n)}=${fracTex(q.n ** n, q.d ** n)}$, ולכן $S_{${n}}=\frac{${a1}\cdot\left(${fracTex(q.n ** n - q.d ** n, q.d ** n)}\right)}{${qMinusOne}}=${sum}$.`;
    return {
      statement:
        variant === 0
          ? String.raw`בסדרה הנדסית $a_1=${a1}$ ו-$q=${qTex(q)}$. חשבו את סכום ${n} האיברים הראשונים של הסדרה, $S_{${n}}$.`
          : String.raw`נתונה הסדרה ההנדסית $${t1},\ ${t2},\ ${t3},\ \dots$. חשבו את סכום ${n} האיברים הראשונים שלה.`,
      hints: [
        variant === 0 ? String.raw`השתמשו בנוסחה $${sumFormula}$.` : String.raw`מצאו קודם את המנה $q=\frac{a_2}{a_1}$, ואז השתמשו בנוסחה $${sumFormula}$.`,
        String.raw`הציבו $n=${n}$ וחשבו קודם את $${qPowTex(q, n)}$.`,
      ],
      solutionSteps: [
        ...(variant === 1 ? [String.raw`$a_1=${t1}$ והמנה $q=\frac{a_2}{a_1}=${quotientTex(t2, t1)}$.`] : []),
        String.raw`לפי $${sumFormula}$: $S_{${n}}=\frac{${a1}\left(${qPowTex(q, n)}-1\right)}{${qTex(q)}-1}$.`,
        computeStep,
      ],
      finalAnswer: String.raw`$S_{${n}}=${sum}$`,
      answers: [answer(String.raw`$S_{${n}}$`, sum)],
      data: { variant, a1, qn: q.n, qd: q.d, n, sum },
    };
  },
};

const INFINITE_RATIOS: Ratio[] = [
  { n: 1, d: 2 },
  { n: -1, d: 2 },
  { n: 1, d: 3 },
  { n: -1, d: 3 },
  { n: 2, d: 3 },
  { n: -2, d: 3 },
  { n: 1, d: 4 },
  { n: 3, d: 4 },
  { n: -1, d: 4 },
  { n: 1, d: 5 },
  { n: 2, d: 5 },
  { n: 3, d: 5 },
  { n: -3, d: 5 },
];

const infiniteSum: ExerciseGenerator = {
  id: 'gen-seq-infinite-sum',
  lessonIds: ['seq-infinite'],
  title: 'סכום סדרה הנדסית אינסופית',
  difficulty: 1,
  generate(rng): GeneratedExercise {
    const variant = rng.int(0, 2);
    const q = rng.pick(INFINITE_RATIOS);
    const sign = rng.sign();
    // S = a₁/(1 − q) = a₁·d/(d − n): choosing a₁ = j(d − n) makes S = j·d an integer
    const j = sign * (variant === 1 ? q.d * rng.int(1, 3) : rng.int(1, 8));
    const a1 = j * (q.d - q.n);
    const sum = j * q.d;
    const oneMinusQ = fracTex(q.d - q.n, q.d);
    const qMinus = q.n < 0 ? `\\left(${qTex(q)}\\right)` : qTex(q);
    const sumStep = String.raw`$S=\frac{a_1}{1-q}=\frac{${a1}}{1-${qMinus}}=\frac{${a1}}{${oneMinusQ}}=${sum}$.`;
    const absQ = fracTex(Math.abs(q.n), q.d);
    if (variant === 2) {
      return {
        statement: String.raw`סכומה של סדרה הנדסית אינסופית מתכנסת הוא $${sum}$, והאיבר הראשון שלה הוא $${a1}$. מצאו את המנה $q$ של הסדרה.`,
        hints: [String.raw`הציבו בנוסחה $S=\frac{a_1}{1-q}$ ובודדו את $q$.`, String.raw`בסוף בדקו ש-$|q|<1$, אחרת לסדרה אין סכום.`],
        solutionSteps: [
          String.raw`$\frac{a_1}{1-q}=S\Rightarrow\frac{${a1}}{1-q}=${sum}\Rightarrow 1-q=${quotientTex(a1, sum)}$.`,
          String.raw`$q=1-${fracTex(q.d - q.n, q.d)}=${qTex(q)}$. בדיקה: $|q|=${absQ}<1$, ולכן הסדרה אכן מתכנסת.`,
        ],
        finalAnswer: String.raw`$q=${qTex(q)}$`,
        answers: [answer('המנה $q$', q.n / q.d)],
        data: { variant, a1, qn: q.n, qd: q.d, sum },
      };
    }
    if (variant === 1) {
      const a2 = (a1 * q.n) / q.d;
      return {
        statement: String.raw`האיבר הראשון של סדרה הנדסית אינסופית הוא $${a1}$ והאיבר השני שלה הוא $${a2}$. מצאו את המנה של הסדרה, הראו שהסדרה מתכנסת וחשבו את סכומה.`,
        hints: [String.raw`$q=\frac{a_2}{a_1}$.`, String.raw`אם $|q|<1$, הסכום הוא $S=\frac{a_1}{1-q}$.`],
        solutionSteps: [String.raw`$q=\frac{a_2}{a_1}=${quotientTex(a2, a1)}$, ו-$|q|=${absQ}<1$, לכן הסדרה מתכנסת ויש לה סכום.`, sumStep],
        finalAnswer: String.raw`$q=${qTex(q)}$, $S=${sum}$`,
        answers: [answer('המנה $q$', q.n / q.d), answer('סכום הסדרה $S$', sum)],
        data: { variant, a1, qn: q.n, qd: q.d, sum, a2 },
      };
    }
    return {
      statement: String.raw`בסדרה הנדסית אינסופית $a_1=${a1}$ ו-$q=${qTex(q)}$. הסבירו מדוע לסדרה יש סכום, וחשבו אותו.`,
      hints: [String.raw`סכום של סדרה הנדסית אינסופית קיים רק כאשר $|q|<1$.`, String.raw`השתמשו בנוסחה $S=\frac{a_1}{1-q}$.`],
      solutionSteps: [String.raw`$|q|=${absQ}<1$, ולכן הסדרה מתכנסת ויש לה סכום.`, sumStep],
      finalAnswer: String.raw`$S=${sum}$`,
      answers: [answer('סכום הסדרה $S$', sum)],
      data: { variant, a1, qn: q.n, qd: q.d, sum },
    };
  },
};

const recursion: ExerciseGenerator = {
  id: 'gen-seq-recursion',
  lessonIds: ['seq-recursion'],
  title: 'כלל נסיגה של סדרה הנדסית',
  difficulty: 2,
  generate(rng): GeneratedExercise {
    const variant = rng.int(0, 2);
    const q = rng.pick([{ n: 2, d: 1 }, { n: -2, d: 1 }, { n: 3, d: 1 }, ...HALF_RATIOS]);
    const recursionTex = String.raw`a_{n+1}=${qTex(q)}\cdot a_n`;
    if (variant === 1) {
      // a_n = c·q^n, with c = j·d so that a₁ = c·q = j·n is an integer
      const j = nonZero(rng, -5, 5);
      const c = j * q.d;
      const a1 = j * q.n;
      return {
        statement: String.raw`האיבר הכללי של סדרה נתון על ידי $a_n=${c}\cdot${qPowTex(q, 'n')}$. הראו שהסדרה הנדסית, ורשמו עבורה כלל נסיגה מהצורה $a_{n+1}=q\cdot a_n$ עם האיבר הראשון $a_1$: מצאו את $a_1$ ואת $q$.`,
        hints: [String.raw`חשבו את המנה $\frac{a_{n+1}}{a_n}$ והראו שאינה תלויה ב-$n$.`, String.raw`את $a_1$ מקבלים בהצבת $n=1$ בנוסחה (שימו לב שהחזקה כאן היא $n$ ולא $n-1$).`],
        solutionSteps: [
          String.raw`$\frac{a_{n+1}}{a_n}=\frac{${c}\cdot${qPowTex(q, 'n+1')}}{${c}\cdot${qPowTex(q, 'n')}}=${qTex(q)}$ – מנה קבועה שאינה תלויה ב-$n$, ולכן הסדרה הנדסית עם $q=${qTex(q)}$.`,
          String.raw`$a_1=${c}\cdot${qFactor(q)}=${a1}$.`,
          String.raw`כלל הנסיגה: $a_1=${a1}$, $${recursionTex}$.`,
        ],
        finalAnswer: String.raw`$a_1=${a1}$, $q=${qTex(q)}$`,
        answers: [answer('$a_1$', a1), answer('$q$', q.n / q.d)],
        data: { variant, c, a1, qn: q.n, qd: q.d, k: 0, am: 0 },
      };
    }
    if (variant === 2) {
      const m = rng.int(3, Math.abs(q.n) === 3 ? 4 : 5);
      const a1 = q.d === 1 ? nonZero(rng, -4, 4) : rng.sign() * rng.pick([1, 3]) * q.d ** (m + 1);
      const am = term(a1, q, m);
      const later = term(a1, q, m + 2);
      return {
        statement: String.raw`סדרה מקיימת את כלל הנסיגה $${recursionTex}$ לכל $n\ge1$, ונתון ש-$a_{${m}}=${am}$. מצאו את $a_1$ ואת $a_{${m + 2}}$.`,
        hints: [String.raw`כלל הנסיגה מראה שהסדרה הנדסית עם $q=${qTex(q)}$.`, String.raw`$a_{${m}}=a_1q^{${m - 1}}$, וכדי להגיע מ-$a_{${m}}$ ל-$a_{${m + 2}}$ כופלים פעמיים ב-$q$.`],
        solutionSteps: [
          String.raw`כל איבר מתקבל מקודמו בכפל ב-$${qTex(q)}$, ולכן הסדרה הנדסית עם $q=${qTex(q)}$, ו-$a_{${m}}=a_1q^{${m - 1}}$.`,
          String.raw`$a_1=\frac{a_{${m}}}{q^{${m - 1}}}=\frac{${am}}{${fracTex(q.n ** (m - 1), q.d ** (m - 1))}}=${a1}$.`,
          String.raw`$a_{${m + 2}}=a_{${m}}\cdot q^2=${am}\cdot${fracTex(q.n ** 2, q.d ** 2)}=${later}$.`,
        ],
        finalAnswer: String.raw`$a_1=${a1}$, $a_{${m + 2}}=${later}$`,
        answers: [answer('$a_1$', a1), answer(String.raw`$a_{${m + 2}}$`, later)],
        data: { variant, c: 0, a1, qn: q.n, qd: q.d, k: m + 2, am, m },
      };
    }
    const k = Math.abs(q.n) === 3 ? rng.int(4, 5) : rng.int(5, 7);
    const a1 = q.d === 1 ? nonZero(rng, -5, 5) : rng.sign() * rng.pick([1, 3]) * q.d ** (k - 1);
    const ak = term(a1, q, k);
    return {
      statement: String.raw`סדרה מוגדרת על ידי כלל הנסיגה $a_1=${a1}$, $${recursionTex}$ (לכל $n\ge1$). הראו שהסדרה הנדסית, רשמו את האיבר הכללי שלה וחשבו את $a_{${k}}$.`,
      hints: [String.raw`מכלל הנסיגה $\frac{a_{n+1}}{a_n}=${qTex(q)}$ – מנה קבועה.`, String.raw`האיבר הכללי: $${generalTerm}$.`],
      solutionSteps: [
        String.raw`$\frac{a_{n+1}}{a_n}=${qTex(q)}$ לכל $n$ – מנה קבועה, ולכן הסדרה הנדסית עם $a_1=${a1}$ ו-$q=${qTex(q)}$.`,
        String.raw`האיבר הכללי: $a_n=${a1}\cdot${qPowTex(q, 'n-1')}$.`,
        String.raw`$a_{${k}}=${a1}\cdot${qPowTex(q, k - 1)}=${a1}\cdot${powValueTex(q, k - 1)}=${ak}$.`,
      ],
      finalAnswer: String.raw`$a_n=${a1}\cdot${qPowTex(q, 'n-1')}$, $a_{${k}}=${ak}$`,
      answers: [answer(String.raw`$a_{${k}}$`, ak)],
      data: { variant, c: 0, a1, qn: q.n, qd: q.d, k, am: 0 },
    };
  },
};

export const sequencesGenerators: ExerciseGenerator[] = [geometricTerm, twoTerms, geometricSum, infiniteSum, recursion];
