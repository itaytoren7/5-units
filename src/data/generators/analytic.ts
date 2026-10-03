import { approx, lineRhs, linearTex, par, rootText } from './geometry';
import { fmt, fracTex } from './helpers';
import type { ExerciseGenerator, GeneratedExercise, Rng } from './types';

const point = (name: string, x: number, y: number) => `${name}(${fmt(x)},${fmt(y)})`;

/** Exact fraction with its decimal value when it is not a terminating 2-decimal number: '\frac{2}{3}\approx0.67'. */
function fracWithDecimal(p: number, q: number): string {
  const value = p / q;
  const tex = fracTex(p, q);
  if (!tex.includes('frac')) return tex;
  return `${tex}${approx(value)}`;
}

/** 'm(x - x0)' for point-slope form, written naturally: '\frac{2}{3}x', '(x - 1)', '-(x + 2)', '3(x - 0.5)'. */
function slopeTimes(mp: number, mq: number, x0: number): string {
  const inner = x0 === 0 ? 'x' : `(${linearTex([
    [1, 'x'],
    [-x0, ''],
  ])})`;
  const m = mp / mq;
  if (m === 1) return inner;
  if (m === -1) return `-${inner}`;
  return `${fracTex(mp, mq)}${inner}`;
}

/** A non-zero slope as a fraction p/q (q > 0): integers or simple fractions. */
function pickSlope(rng: Rng): [number, number] {
  if (rng.next() < 0.5) {
    const m = rng.pick([1, 2, 3, 4]) * rng.sign();
    return [m, 1];
  }
  const [p, q] = rng.pick([
    [1, 2],
    [1, 3],
    [2, 3],
    [3, 2],
    [3, 4],
    [4, 3],
    [5, 2],
  ] as const);
  return [p * rng.sign(), q];
}

const distance: ExerciseGenerator = {
  id: 'gen-distance',
  lessonIds: ['ag-distance'],
  title: 'המרחק בין שתי נקודות',
  difficulty: 1,
  generate(rng): GeneratedExercise {
    const mode = rng.next() < 0.6 ? 0 : 1;
    const formula = String.raw`המרחק בין הנקודות $A(x_A,y_A)$ ו-$B(x_B,y_B)$ הוא $AB=\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$.`;
    if (mode === 0) {
      const x1 = rng.int(-8, 8);
      const y1 = rng.int(-8, 8);
      let dx: number;
      let dy: number;
      if (rng.next() < 0.5) {
        const [p, q] = rng.pick([
          [3, 4],
          [4, 3],
          [6, 8],
          [8, 6],
          [5, 12],
          [12, 5],
        ] as const);
        dx = p * rng.sign();
        dy = q * rng.sign();
      } else {
        dx = rng.int(1, 9) * rng.sign();
        dy = rng.int(-9, 9);
      }
      const x2 = x1 + dx;
      const y2 = y1 + dy;
      const sq = dx * dx + dy * dy;
      const d = Math.sqrt(sq);
      return {
        statement: String.raw`נתונות הנקודות $${point('A', x1, y1)}$ ו-$${point('B', x2, y2)}$.` + '\n\n' + String.raw`חשבו את המרחק $AB$.`,
        hints: [String.raw`$AB=\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$`, 'הקפידו על סוגריים כשמציבים מספרים שליליים.'],
        solutionSteps: [
          formula,
          String.raw`$AB=\sqrt{(${x2}-${par(x1)})^2+(${y2}-${par(y1)})^2}=\sqrt{${par(dx)}^2+${par(dy)}^2}=\sqrt{${dx * dx}+${dy * dy}}$.`,
          String.raw`$AB=${rootText(sq)}$.`,
        ],
        finalAnswer: String.raw`$AB${approx(d)}$`,
        answers: [{ label: '$AB$', value: d }],
        data: { mode, x1, y1, x2, y2 },
      };
    }
    // A(a, y1), B(x2, y2), AB = r → two values of a
    const [p, q, r] = rng.pick([
      [3, 4, 5],
      [4, 3, 5],
      [6, 8, 10],
      [8, 6, 10],
      [5, 12, 13],
      [12, 5, 13],
    ] as const);
    const x2 = rng.int(-6, 6);
    const y2 = rng.int(-6, 6);
    const y1 = y2 + q * rng.sign();
    const a1 = x2 - p;
    const a2 = x2 + p;
    const shifted = linearTex([
      [1, 'a'],
      [-x2, ''],
    ]);
    const shiftedSq = x2 === 0 ? 'a^2' : `(${shifted})^2`;
    return {
      statement: String.raw`נתונות הנקודות $A(a,${y1})$ ו-$${point('B', x2, y2)}$, ונתון כי $AB=${r}$.` + '\n\n' + String.raw`מצאו את שני הערכים האפשריים של $a$.`,
      hints: [String.raw`כתבו את $AB^2$ לפי נוסחת המרחק והשוו ל-$${r}^2$.`, String.raw`תקבלו משוואה מהצורה $${shiftedSq}=k$, שיש לה שני פתרונות.`],
      solutionSteps: [
        formula,
        String.raw`$AB^2=(${x2}-a)^2+(${y2}-${par(y1)})^2=${shiftedSq}+${q * q}$, ולכן $${shiftedSq}+${q * q}=${r * r}$.`,
        String.raw`$${shiftedSq}=${r * r - q * q}\ \Rightarrow\ ${shifted}=\pm${p}$.`,
        String.raw`$a=${x2}-${p}=${a1}$ או $a=${x2}+${p}=${a2}$.`,
      ],
      finalAnswer: String.raw`$a=${a1}$ או $a=${a2}$`,
      answers: [
        { label: '$a$ (הערך הקטן)', value: a1 },
        { label: '$a$ (הערך הגדול)', value: a2 },
      ],
      data: { mode, y1, x2, y2, r },
    };
  },
};

const midpoint: ExerciseGenerator = {
  id: 'gen-midpoint',
  lessonIds: ['ag-midpoint'],
  title: 'אמצע קטע וקצה חסר',
  difficulty: 1,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 1);
    const formula = String.raw`אמצע הקטע $AB$ הוא $M\left(\frac{x_A+x_B}{2},\frac{y_A+y_B}{2}\right)$.`;
    const x1 = rng.int(-9, 9);
    const y1 = rng.int(-9, 9);
    if (mode === 0) {
      const x2 = rng.int(-9, 9);
      let y2 = rng.int(-9, 9);
      if (x2 === x1 && y2 === y1) y2 += 3;
      const xm = (x1 + x2) / 2;
      const ym = (y1 + y2) / 2;
      return {
        statement: String.raw`נתונות הנקודות $${point('A', x1, y1)}$ ו-$${point('B', x2, y2)}$.` + '\n\n' + String.raw`מצאו את שיעורי הנקודה $M$, אמצע הקטע $AB$.`,
        hints: ['שיעור ה-$x$ של אמצע הקטע הוא הממוצע של שיעורי ה-$x$ של הקצוות, וכך גם שיעור ה-$y$.'],
        solutionSteps: [
          formula,
          String.raw`$x_M=\frac{${x1}+${par(x2)}}{2}=\frac{${x1 + x2}}{2}=${fmt(xm)}$, $y_M=\frac{${y1}+${par(y2)}}{2}=\frac{${y1 + y2}}{2}=${fmt(ym)}$.`,
        ],
        finalAnswer: String.raw`$${point('M', xm, ym)}$`,
        answers: [
          { label: '$x_M$', value: xm },
          { label: '$y_M$', value: ym },
        ],
        data: { mode, x1, y1, x2, y2 },
      };
    }
    const xm = rng.int(-12, 12) / 2;
    const ym = rng.int(-12, 12) / 2;
    const x2 = 2 * xm - x1;
    const y2 = 2 * ym - y1;
    return {
      statement: String.raw`הנקודה $${point('M', xm, ym)}$ היא אמצע הקטע $AB$, ונתון $${point('A', x1, y1)}$.` + '\n\n' + String.raw`מצאו את שיעורי הנקודה $B$.`,
      hints: [String.raw`כתבו $x_M=\frac{x_A+x_B}{2}$ ובודדו את $x_B$; כך גם עבור $y_B$.`, String.raw`$x_B=2x_M-x_A$, $y_B=2y_M-y_A$.`],
      solutionSteps: [
        formula,
        String.raw`$\frac{${x1}+x_B}{2}=${fmt(xm)}\ \Rightarrow\ x_B=2\cdot ${par(xm)}-${par(x1)}=${fmt(x2)}$.`,
        String.raw`$\frac{${y1}+y_B}{2}=${fmt(ym)}\ \Rightarrow\ y_B=2\cdot ${par(ym)}-${par(y1)}=${fmt(y2)}$.`,
      ],
      finalAnswer: String.raw`$${point('B', x2, y2)}$`,
      answers: [
        { label: '$x_B$', value: x2 },
        { label: '$y_B$', value: y2 },
      ],
      data: { mode, x1, y1, xm, ym },
    };
  },
};

const lineThroughPoints: ExerciseGenerator = {
  id: 'gen-line-two-points',
  lessonIds: ['ag-line-equation', 'ag-line'],
  title: 'משוואת ישר דרך שתי נקודות',
  difficulty: 1,
  generate(rng): GeneratedExercise {
    const x1 = rng.int(-6, 6);
    const y1 = rng.int(-6, 6);
    let dx: number;
    let dy: number;
    if (rng.next() < 0.6) {
      dx = rng.int(1, 4) * rng.sign();
      dy = rng.pick([-3, -2, -1, 1, 2, 3]) * dx;
    } else {
      dx = rng.int(1, 6) * rng.sign();
      dy = rng.int(-6, 6);
    }
    const x2 = x1 + dx;
    const y2 = y1 + dy;
    const m = dy / dx;
    const nNum = y1 * dx - dy * x1;
    const n = nNum / dx;
    const mTex = fracTex(dy, dx);
    return {
      statement:
        String.raw`נתונות הנקודות $${point('A', x1, y1)}$ ו-$${point('B', x2, y2)}$.` +
        '\n\n' +
        String.raw`מצאו את שיפוע הישר $AB$, את נקודת החיתוך שלו עם ציר ה-$y$, וכתבו את משוואת הישר בצורה $y=mx+n$.`,
      hints: [String.raw`$m=\frac{y_B-y_A}{x_B-x_A}$`, String.raw`הציבו את אחת הנקודות במשוואה $y=mx+n$ ומצאו את $n$.`],
      solutionSteps: [
        String.raw`השיפוע: $m=\frac{y_B-y_A}{x_B-x_A}=\frac{${y2}-${par(y1)}}{${x2}-${par(x1)}}=\frac{${dy}}{${dx}}=${mTex}$.`,
        String.raw`מציבים את הנקודה $A$ במשוואה $y=mx+n$: $${y1}=${mTex}\cdot ${par(x1)}+n\ \Rightarrow\ n=${fracTex(nNum, dx)}$.`,
        String.raw`משוואת הישר: $y=${lineRhs(dy, dx, nNum, dx)}$, והוא חותך את ציר ה-$y$ בנקודה $(0,${fracTex(nNum, dx)})$.`,
      ],
      finalAnswer: String.raw`$m=${fracWithDecimal(dy, dx)}$, $n=${fracWithDecimal(nNum, dx)}$, כלומר $y=${lineRhs(dy, dx, nNum, dx)}$`,
      answers: [
        { label: '$m$ (השיפוע)', value: m },
        { label: String.raw`$n$ (חיתוך עם ציר $y$)`, value: n },
      ],
      data: { x1, y1, x2, y2 },
    };
  },
};

const parallelLine: ExerciseGenerator = {
  id: 'gen-parallel-line',
  lessonIds: ['ag-slope-parallel'],
  title: 'ישר מקביל דרך נקודה',
  difficulty: 1,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 1);
    let mp: number;
    let mq: number;
    let lineText: string;
    const steps: string[] = [];
    // the given line ℓ, described in the data as a·x + b·y + c = 0
    let a: number;
    let b: number;
    let c: number;
    if (mode === 0) {
      [mp, mq] = pickSlope(rng);
      const intercept = rng.int(-6, 6);
      lineText = String.raw`y=${lineRhs(mp, mq, intercept, 1)}`;
      a = mp;
      b = -mq;
      c = intercept * mq;
      steps.push(String.raw`שיפוע הישר הנתון $${lineText}$ הוא המקדם של $x$: $m_\ell=${fracTex(mp, mq)}$.`);
    } else {
      a = rng.int(1, 5) * rng.sign();
      b = rng.int(1, 5) * rng.sign();
      c = rng.int(-9, 9);
      mp = -a;
      mq = b;
      if (mq < 0) {
        mp = -mp;
        mq = -mq;
      }
      lineText = String.raw`${linearTex([
        [a, 'x'],
        [b, 'y'],
        [c, ''],
      ])}=0`;
      steps.push(
        String.raw`נבודד את $y$ במשוואת הישר הנתון: $${linearTex([[b, 'y']])}=${linearTex([
          [-a, 'x'],
          [-c, ''],
        ])}\ \Rightarrow\ y=${lineRhs(-a, b, -c, b)}$, ולכן שיפועו $m_\ell=${fracTex(mp, mq)}$.`,
      );
    }
    let x0 = rng.int(-6, 6);
    const y0 = rng.int(-6, 6);
    if (a * x0 + b * y0 + c === 0) x0 += x0 < 6 ? 1 : -1;
    const nNum = y0 * mq - mp * x0;
    steps.push(String.raw`ישרים מקבילים – שיפועיהם שווים, ולכן גם שיפוע הישר המבוקש הוא $m=${fracTex(mp, mq)}$.`);
    steps.push(
      String.raw`משוואת ישר דרך הנקודה $${point('P', x0, y0)}$ בשיפוע $m$: $${linearTex([
        [1, 'y'],
        [-y0, ''],
      ])}=${slopeTimes(mp, mq, x0)}\ \Rightarrow\ y=${lineRhs(mp, mq, nNum, mq)}$.`,
    );
    return {
      statement: String.raw`נתון הישר $\ell$: $${lineText}$ והנקודה $${point('P', x0, y0)}$.` + '\n\n' + String.raw`מצאו את משוואת הישר העובר דרך $P$ ומקביל לישר $\ell$ (בצורה $y=mx+n$).`,
      hints: ['לישרים מקבילים יש שיפועים שווים.', String.raw`משוואת ישר לפי נקודה ושיפוע: $y-y_0=m(x-x_0)$.`],
      solutionSteps: steps,
      finalAnswer: String.raw`$y=${lineRhs(mp, mq, nNum, mq)}$ ($m=${fracWithDecimal(mp, mq)}$, $n=${fracWithDecimal(nNum, mq)}$)`,
      answers: [
        { label: '$m$ (השיפוע)', value: mp / mq },
        { label: '$n$', value: nNum / mq },
      ],
      data: { mode, a, b, c, x0, y0 },
    };
  },
};

const perpendicularLine: ExerciseGenerator = {
  id: 'gen-perpendicular-line',
  lessonIds: ['ag-perpendicular'],
  title: 'ישר מאונך ואנך אמצעי',
  difficulty: 2,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 1);
    const perpRule = String.raw`מכפלת השיפועים של שני ישרים מאונכים היא $-1$.`;
    if (mode === 0) {
      const [mp, mq] = pickSlope(rng);
      const intercept = rng.int(-6, 6);
      const x0 = rng.int(-6, 6);
      const y0 = rng.int(-6, 6);
      // perpendicular slope −mq/mp, written with a positive denominator
      const pp = mp > 0 ? -mq : mq;
      const pq = Math.abs(mp);
      const nNum = y0 * pq - pp * x0;
      return {
        statement:
          String.raw`נתון הישר $\ell$: $y=${lineRhs(mp, mq, intercept, 1)}$ והנקודה $${point('P', x0, y0)}$.` +
          '\n\n' +
          String.raw`מצאו את משוואת הישר העובר דרך $P$ ומאונך לישר $\ell$ (בצורה $y=mx+n$).`,
        hints: [perpRule, String.raw`אם שיפוע $\ell$ הוא $m_\ell$, שיפוע הישר המאונך הוא $-\frac{1}{m_\ell}$.`],
        solutionSteps: [
          String.raw`שיפוע הישר $\ell$ הוא $m_\ell=${fracTex(mp, mq)}$.`,
          String.raw`${perpRule} לכן $m\cdot ${fracTex(mp, mq)}=-1$, ומכאן $m=${fracTex(pp, pq)}$.`,
          String.raw`משוואת ישר דרך $P$ בשיפוע $m$: $${linearTex([
            [1, 'y'],
            [-y0, ''],
          ])}=${slopeTimes(pp, pq, x0)}\ \Rightarrow\ y=${lineRhs(pp, pq, nNum, pq)}$.`,
        ],
        finalAnswer: String.raw`$y=${lineRhs(pp, pq, nNum, pq)}$ ($m=${fracWithDecimal(pp, pq)}$, $n=${fracWithDecimal(nNum, pq)}$)`,
        answers: [
          { label: '$m$ (השיפוע)', value: pp / pq },
          { label: '$n$', value: nNum / pq },
        ],
        data: { mode, mp, mq, intercept, x0, y0 },
      };
    }
    // perpendicular bisector of AB
    const x1 = rng.int(-6, 6);
    const y1 = rng.int(-6, 6);
    const dx = rng.int(1, 6) * rng.sign();
    const dy = rng.int(1, 6) * rng.sign();
    const x2 = x1 + dx;
    const y2 = y1 + dy;
    const xm = (x1 + x2) / 2;
    const ym = (y1 + y2) / 2;
    // slope −dx/dy, positive denominator
    const pp = dy > 0 ? -dx : dx;
    const pq = Math.abs(dy);
    // n = ym − m·xm = (y1 + y2)/2 + (dx/dy)(x1 + x2)/2
    const nNum = (y1 + y2) * dy + dx * (x1 + x2);
    const nDen = 2 * dy;
    return {
      statement: String.raw`נתונות הנקודות $${point('A', x1, y1)}$ ו-$${point('B', x2, y2)}$.` + '\n\n' + String.raw`מצאו את משוואת האנך האמצעי לקטע $AB$ (בצורה $y=mx+n$).`,
      hints: ['האנך האמצעי עובר דרך אמצע הקטע ומאונך לקטע.', String.raw`חשבו את אמצע הקטע $M$ ואת שיפוע $AB$, ואז את השיפוע המאונך.`],
      solutionSteps: [
        String.raw`האנך האמצעי לקטע $AB$ עובר דרך אמצע הקטע ומאונך לו. אמצע הקטע: $M\left(\frac{${x1}+${par(x2)}}{2},\frac{${y1}+${par(y2)}}{2}\right)=M(${fmt(xm)},${fmt(ym)})$.`,
        String.raw`שיפוע הקטע: $m_{AB}=\frac{${y2}-${par(y1)}}{${x2}-${par(x1)}}=${fracTex(dy, dx)}$.`,
        String.raw`${perpRule} לכן שיפוע האנך האמצעי הוא $m=${fracTex(pp, pq)}$.`,
        String.raw`משוואת ישר דרך $M$ בשיפוע $m$: $${linearTex([
          [1, 'y'],
          [-ym, ''],
        ])}=${slopeTimes(pp, pq, xm)}\ \Rightarrow\ y=${lineRhs(pp, pq, nNum, nDen)}$.`,
      ],
      finalAnswer: String.raw`$y=${lineRhs(pp, pq, nNum, nDen)}$ ($m=${fracWithDecimal(pp, pq)}$, $n=${fracWithDecimal(nNum, nDen)}$)`,
      answers: [
        { label: '$m$ (השיפוע)', value: pp / pq },
        { label: '$n$', value: nNum / nDen },
      ],
      data: { mode, x1, y1, x2, y2 },
    };
  },
};

const linesIntersection: ExerciseGenerator = {
  id: 'gen-lines-intersection',
  lessonIds: ['ag-line', 'ag-line-equation'],
  title: 'נקודת חיתוך של שני ישרים',
  difficulty: 1,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 1);
    const x0 = rng.int(-6, 6);
    const y0 = rng.int(-6, 6);
    const m1 = rng.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
    const n1 = y0 - m1 * x0;
    const line1 = String.raw`y=${lineRhs(m1, 1, n1, 1)}`;
    if (mode === 0) {
      let m2 = rng.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
      if (m2 === m1) m2 = m1 === 4 ? -1 : m1 + 1;
      const n2 = y0 - m2 * x0;
      const line2 = String.raw`y=${lineRhs(m2, 1, n2, 1)}`;
      return {
        statement: String.raw`מצאו את נקודת החיתוך של הישרים $${line1}$ ו-$${line2}$.`,
        hints: [String.raw`בנקודת החיתוך ערכי ה-$y$ של שני הישרים שווים: השוו את שני הביטויים.`, String.raw`אחרי שמצאתם את $x$, הציבו אותו באחת המשוואות.`],
        solutionSteps: [
          String.raw`בנקודת החיתוך ערך ה-$y$ זהה בשני הישרים: $${lineRhs(m1, 1, n1, 1)}=${lineRhs(m2, 1, n2, 1)}$.`,
          String.raw`$${linearTex([[m1 - m2, 'x']])}=${n2 - n1}\ \Rightarrow\ x=${x0}$.`,
          String.raw`מציבים בישר הראשון: $y=${m1}\cdot ${par(x0)}${n1 === 0 ? '' : n1 > 0 ? `+${n1}` : `${n1}`}=${y0}$.`,
        ],
        finalAnswer: String.raw`נקודת החיתוך היא $(${x0},${y0})$`,
        answers: [
          { label: '$x$', value: x0 },
          { label: '$y$', value: y0 },
        ],
        data: { mode, m1, n1, m2, n2 },
      };
    }
    let a = rng.int(1, 4) * rng.sign();
    const b = rng.int(1, 4) * rng.sign();
    if (-a / b === m1) a = -a; // ensure the lines are not parallel (slope of a·x + b·y = c is −a/b)
    if (-a / b === m1) a += 1;
    const c = a * x0 + b * y0;
    const line2 = String.raw`${linearTex([
      [a, 'x'],
      [b, 'y'],
    ])}=${c}`;
    const coefX = a + b * m1;
    const rhs = c - b * n1;
    return {
      statement: String.raw`מצאו את נקודת החיתוך של הישרים $${line1}$ ו-$${line2}$.`,
      hints: [String.raw`הציבו את הביטוי של $y$ מהמשוואה הראשונה במשוואה השנייה.`, String.raw`אחרי שמצאתם את $x$, הציבו אותו במשוואה הראשונה.`],
      solutionSteps: [
        String.raw`מציבים $y=${lineRhs(m1, 1, n1, 1)}$ במשוואה השנייה: $${linearTex([[a, 'x']])}${b > 0 ? '+' : '-'}${Math.abs(b) === 1 ? '' : Math.abs(b)}(${lineRhs(m1, 1, n1, 1)})=${c}$.`,
        String.raw`$${linearTex([[coefX, 'x']])}${b * n1 === 0 ? '' : b * n1 > 0 ? `+${b * n1}` : `${b * n1}`}=${c}\ \Rightarrow\ ${linearTex([[coefX, 'x']])}=${rhs}\ \Rightarrow\ x=${x0}$.`,
        String.raw`מציבים במשוואה הראשונה: $y=${m1}\cdot ${par(x0)}${n1 === 0 ? '' : n1 > 0 ? `+${n1}` : `${n1}`}=${y0}$.`,
      ],
      finalAnswer: String.raw`נקודת החיתוך היא $(${x0},${y0})$`,
      answers: [
        { label: '$x$', value: x0 },
        { label: '$y$', value: y0 },
      ],
      data: { mode, m1, n1, a, b, c },
    };
  },
};

const triangleAltitude: ExerciseGenerator = {
  id: 'gen-triangle-altitude',
  lessonIds: ['ag-line-review', 'ag-self-practice'],
  title: 'גובה במשולש: משוואה, עקב ואורך',
  difficulty: 3,
  generate(rng): GeneratedExercise {
    // AB has direction (dx, dy); H = A + s·(dx, dy) is the foot; C = H + r·(−dy, dx)
    const dx = rng.int(1, 3) * rng.sign();
    const dy = rng.int(1, 3) * rng.sign();
    const x1 = rng.int(-5, 5);
    const y1 = rng.int(-5, 5);
    const t = rng.int(2, 3);
    const sFoot = rng.int(1, t - 1 + (rng.next() < 0.3 ? 1 : 0));
    const r = rng.pick([-2, -1, 1, 2]);
    const x2 = x1 + t * dx;
    const y2 = y1 + t * dy;
    const xh = x1 + sFoot * dx;
    const yh = y1 + sFoot * dy;
    const x3 = xh - r * dy;
    const y3 = yh + r * dx;
    // AB: y = (dy/dx)x + nAB/dx ; altitude: y = (−dx/dy)x + nH/dy
    const nAB = y1 * dx - dy * x1;
    const pp = dy > 0 ? -dx : dx;
    const pq = Math.abs(dy);
    const nH = y3 * pq - pp * x3;
    const sq = (x3 - xh) ** 2 + (y3 - yh) ** 2;
    const height = Math.sqrt(sq);
    return {
      statement:
        String.raw`נתון המשולש $ABC$ שקודקודיו $${point('A', x1, y1)}$, $${point('B', x2, y2)}$, $${point('C', x3, y3)}$.` +
        '\n\n' +
        String.raw`א. מצאו את משוואת הגובה לצלע $AB$ היוצא מהקודקוד $C$ (בצורה $y=mx+n$).` +
        '\n\n' +
        String.raw`ב. מצאו את שיעורי הנקודה $H$, עקב הגובה על הצלע $AB$.` +
        '\n\n' +
        String.raw`ג. חשבו את אורך הגובה $CH$.`,
      hints: [
        String.raw`הגובה מאונך ל-$AB$: שיפועו הוא $-\frac{1}{m_{AB}}$, והוא עובר דרך $C$.`,
        String.raw`עקב הגובה הוא נקודת החיתוך של הגובה עם הישר $AB$ – מצאו את משוואת $AB$ ופתרו מערכת משוואות.`,
        String.raw`$CH$ הוא המרחק בין הנקודות $C$ ו-$H$.`,
      ],
      solutionSteps: [
        String.raw`שיפוע הצלע: $m_{AB}=\frac{${y2}-${par(y1)}}{${x2}-${par(x1)}}=${fracTex(dy, dx)}$. מכפלת השיפועים של ישרים מאונכים היא $-1$, ולכן שיפוע הגובה הוא $${fracTex(pp, pq)}$.`,
        String.raw`הגובה עובר דרך $C$: $${linearTex([
          [1, 'y'],
          [-y3, ''],
        ])}=${slopeTimes(pp, pq, x3)}\ \Rightarrow\ y=${lineRhs(pp, pq, nH, pq)}$.`,
        String.raw`משוואת הישר $AB$ (דרך $A$ בשיפוע $${fracTex(dy, dx)}$): $${linearTex([
          [1, 'y'],
          [-y1, ''],
        ])}=${slopeTimes(dy, dx, x1)}\ \Rightarrow\ y=${lineRhs(dy, dx, nAB, dx)}$.`,
        String.raw`עקב הגובה הוא נקודת החיתוך: $${lineRhs(dy, dx, nAB, dx)}=${lineRhs(pp, pq, nH, pq)}\ \Rightarrow\ x=${xh}$, ומהצבה $y=${yh}$, כלומר $${point('H', xh, yh)}$.`,
        String.raw`$CH=\sqrt{(${xh}-${par(x3)})^2+(${yh}-${par(y3)})^2}=${rootText(sq)}$.`,
      ],
      finalAnswer: String.raw`א. $y=${lineRhs(pp, pq, nH, pq)}$; ב. $${point('H', xh, yh)}$; ג. $CH${approx(height)}$`,
      answers: [
        { label: 'שיפוע הגובה $m$', value: pp / pq },
        { label: '$n$ במשוואת הגובה', value: nH / pq },
        { label: '$x_H$', value: xh },
        { label: '$y_H$', value: yh },
        { label: '$CH$', value: height },
      ],
      data: { x1, y1, x2, y2, x3, y3 },
    };
  },
};

export const analyticGenerators: ExerciseGenerator[] = [distance, midpoint, lineThroughPoints, parallelLine, perpendicularLine, linesIntersection, triangleAltitude];
