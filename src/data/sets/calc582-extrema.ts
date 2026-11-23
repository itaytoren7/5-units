import type { Exercise, ExerciseSet, PlotDiagram } from './types';

/**
 * סט: בעיות קיצון עם eˣ ו-ln x (שאלון 35582, שאלות 4–5).
 * 1–4 צעד אחד · 5–8 בניית פונקציית מטרה ומציאת הקיצון · 9–12 שאלות בסגנון בגרות.
 */

const T = 'differential-integral';
const EX = ['calc-extrema'];
const EXD = ['calc-extrema', 'calc-derivatives'];

type Fn = PlotDiagram['functions'][number];

/** Vertical segment x = x0 between the heights a and b, drawn as a very steep line on a tiny domain. */
function vseg(x0: number, a: number, b: number, dashed = true): Fn {
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  return { expr: `${lo} + (x - (${x0})) * 20000`, domain: [x0, x0 + (hi - lo) / 20000], dashed };
}

/** Horizontal segment y = y0 between x = a and x = b. */
function hseg(y0: number, a: number, b: number, dashed = true): Fn {
  return { expr: `${y0}`, domain: [a, b], dashed };
}

const e1: Exercise = {
  id: 'cex-1',
  level: 1,
  topicId: T,
  subtopicIds: EX,
  intro: String.raw`נתונה הפונקציה $f(x)=3e^{-x}$. הנקודה $A$ נמצאת על גרף הפונקציה ברביע הראשון, ושיעור ה-$x$ שלה הוא $t$ ($t>0$). מהנקודה $A$ מורידים אנך לציר $x$, והוא פוגש את הציר בנקודה $B$. $O$ היא ראשית הצירים (ראו שרטוט).`,
  diagram: {
    kind: 'plot',
    xRange: [-0.4, 4],
    yRange: [-0.4, 3.4],
    functions: [{ expr: '3*exp(-x)', domain: [-0.12, 4] }, { expr: 'x*3*exp(-1.5)/1.5', domain: [0, 1.5] }, vseg(1.5, 0, 0.6694, false)],
    points: [{ x: 1.5, y: 0.6694, label: 'A' }],
    labels: [{ at: [1.5, -0.22], text: 'B' }, { at: [-0.2, -0.22], text: 'O' }, { at: [0.72, 2], text: 'f' }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזה ביטוי מתאר את שטח המשולש $OAB$ כפונקציה של $t$?`,
      hints: [String.raw`המשולש $OAB$ ישר זווית: הניצבים שלו הם $OB$ ו-$AB$.`, String.raw`$OB=t$ ו-$AB=f(t)=3e^{-t}$. שטח משולש ישר זווית הוא מחצית מכפלת הניצבים.`],
      check: { kind: 'choice', options: [String.raw`$3te^{-t}$`, String.raw`$\dfrac32te^{-t}$`, String.raw`$\dfrac32e^{-t}$`, String.raw`$t+3e^{-t}$`], correct: 1 },
      short: String.raw`$S(t)=\dfrac12\cdot OB\cdot AB=\dfrac12\cdot t\cdot 3e^{-t}=\dfrac32te^{-t}$.`,
      full: [
        String.raw`$B$ נמצאת על ציר $x$ מתחת ל-$A$, ולכן $B(t,0)$ והזווית $OBA$ ישרה.`,
        String.raw`$OB=t$ (כי $t>0$), ו-$AB$ הוא שיעור ה-$y$ של $A$: $AB=f(t)=3e^{-t}$ (חיובי לכל $t$).`,
        String.raw`$S(t)=\dfrac{OB\cdot AB}{2}=\dfrac{t\cdot 3e^{-t}}{2}=\dfrac32te^{-t}$.`,
        String.raw`הביטוי $3te^{-t}$ הוא שטח המלבן שצלעותיו $OB$ ו-$AB$ – פי שניים משטח המשולש.`,
      ],
    },
  ],
};

const e2: Exercise = {
  id: 'cex-2',
  level: 1,
  topicId: T,
  subtopicIds: EXD,
  intro: String.raw`הנקודה $A$ נמצאת על גרף הפונקציה $f(x)=\ln x$, ושיעור ה-$x$ שלה הוא $t$ ($t>0$). $O$ היא ראשית הצירים. שיפוע הישר $OA$ הוא $m(t)=\dfrac{\ln t}{t}$ (ראו שרטוט).`,
  diagram: {
    kind: 'plot',
    xRange: [-0.5, 6],
    yRange: [-2.2, 2.2],
    functions: [{ expr: 'log(x)', domain: [0.12, 6] }, { expr: 'x*log(4.5)/4.5', domain: [0, 4.5] }],
    points: [{ x: 4.5, y: 1.5041, label: 'A' }],
    labels: [{ at: [-0.25, -0.24], text: 'O' }, { at: [5.6, 1.33], text: 'f' }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $m'(1)$ – קצב השינוי של השיפוע כאשר $t=1$.`,
      hints: [String.raw`גזרו לפי כלל המנה: $\left(\dfrac{u}{v}\right)'=\dfrac{u'v-uv'}{v^2}$, עם $u=\ln t$ ו-$v=t$.`, String.raw`$m'(t)=\dfrac{\frac1t\cdot t-\ln t\cdot 1}{t^2}=\dfrac{1-\ln t}{t^2}$. הציבו $t=1$.`],
      check: { kind: 'numeric', answer: 1, verify: "deriv('log(x)/x', 1)" },
      short: String.raw`$m'(t)=\dfrac{1-\ln t}{t^2}$, ולכן $m'(1)=\dfrac{1-0}{1}=1$.`,
      full: [
        String.raw`כלל המנה עם $u=\ln t$, $v=t$: $u'=\dfrac1t$, $v'=1$.`,
        String.raw`$m'(t)=\dfrac{\frac1t\cdot t-\ln t\cdot 1}{t^2}=\dfrac{1-\ln t}{t^2}$.`,
        String.raw`$m'(1)=\dfrac{1-\ln 1}{1^2}=1$, כי $\ln 1=0$.`,
        String.raw`המשמעות: $m'(1)>0$, כלומר כאשר $A$ עוברת דרך $t=1$ ונעה ימינה, שיפוע הישר $OA$ גדל.`,
      ],
    },
  ],
};

const e3: Exercise = {
  id: 'cex-3',
  level: 1,
  topicId: T,
  subtopicIds: EXD,
  intro: String.raw`הישר $x=t$ ($t>0$) חותך את גרף הפונקציה $f(x)=2x^2$ בנקודה $A$ ואת גרף הפונקציה $g(x)=\ln x$ בנקודה $B$. אורך הקטע $AB$ הוא $d(t)=2t^2-\ln t$ (ראו שרטוט).`,
  diagram: {
    kind: 'plot',
    xRange: [-0.4, 2],
    yRange: [-2.6, 4.6],
    functions: [{ expr: '2*x^2', domain: [-0.4, 1.5] }, { expr: 'log(x)', domain: [0.08, 2] }, vseg(1.2, 0.1823, 2.88, false)],
    points: [
      { x: 1.2, y: 2.88 },
      { x: 1.2, y: 0.1823 },
    ],
    labels: [{ at: [1.07, 3.05], text: 'A' }, { at: [1.31, 0.85], text: 'B' }, { at: [1.3, 4.2], text: 'f' }, { at: [1.75, 1.05], text: 'g' }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את ערך $t$ שעבורו $d'(t)=0$.`,
      hints: [String.raw`$(\ln t)'=\dfrac1t$. גזרו את $d(t)$ והשוו לאפס.`, String.raw`$4t-\dfrac1t=0$. כפלו ב-$t$, וזכרו ש-$t>0$.`],
      check: { kind: 'numeric', answer: 0.5, verify: "root('4*x - 1/x', 0.1, 2)" },
      short: String.raw`$d'(t)=4t-\dfrac1t=0\ \Rightarrow\ t^2=\dfrac14\ \Rightarrow\ t=\dfrac12$ (כי $t>0$).`,
      full: [
        String.raw`$d'(t)=4t-\dfrac1t$.`,
        String.raw`$4t-\dfrac1t=0\ \Rightarrow\ 4t^2=1\ \Rightarrow\ t^2=\dfrac14$.`,
        String.raw`$t=\pm\dfrac12$, אבל $\ln t$ מוגדר רק עבור $t>0$, ולכן $t=\dfrac12$.`,
        String.raw`זהו ה-$t$ שעבורו הקטע $AB$ הקצר ביותר: $d'<0$ עבור $0<t<\dfrac12$ ו-$d'>0$ עבור $t>\dfrac12$.`,
      ],
    },
  ],
};

const e4: Exercise = {
  id: 'cex-4',
  level: 1,
  topicId: T,
  subtopicIds: EX,
  intro: String.raw`קודקוד $A$ של מלבן נמצא על גרף הפונקציה $y=5e^{-x}$ ברביע הראשון, ושתיים מצלעות המלבן מונחות על הצירים (ראו שרטוט). כאשר שיעור ה-$x$ של $A$ הוא $x$, שטח המלבן הוא $S(x)=5xe^{-x}$, $x>0$. הנגזרת $S'(x)=5(1-x)e^{-x}$ מתאפסת ב-$x=1$.`,
  diagram: {
    kind: 'plot',
    xRange: [-0.4, 4.2],
    yRange: [-0.5, 5.5],
    functions: [{ expr: '5*exp(-x)', domain: [-0.09, 4.2] }, hseg(0.9134, 0, 1.7, false), vseg(1.7, 0, 0.9134, false)],
    points: [{ x: 1.7, y: 0.9134, label: 'A' }],
    labels: [{ at: [-0.2, -0.3], text: 'O' }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מה סוג הקיצון של $S$ ב-$x=1$, ומה הנימוק?`,
      hints: [String.raw`$e^{-x}>0$ לכל $x$, ולכן הסימן של $S'(x)$ נקבע רק לפי הגורם $(1-x)$.`, String.raw`בדקו את סימן $S'$ בערך אחד משמאל ל-1 ובערך אחד מימין לו, למשל $x=0.5$ ו-$x=2$.`],
      check: {
        kind: 'choice',
        options: [
          String.raw`מינימום, כי $S'$ שלילית עבור $0<x<1$ וחיובית עבור $x>1$.`,
          String.raw`מקסימום, כי $S'$ חיובית עבור $0<x<1$ ושלילית עבור $x>1$.`,
          String.raw`מקסימום, כי $S'$ שלילית עבור $0<x<1$ וחיובית עבור $x>1$.`,
          String.raw`אין קיצון, כי $e^{-x}$ חיובי תמיד ולכן $S'$ אינה מחליפה סימן.`,
        ],
        correct: 1,
      },
      short: String.raw`$S'>0$ עבור $0<x<1$ (עלייה) ו-$S'<0$ עבור $x>1$ (ירידה), ולכן ב-$x=1$ יש מקסימום.`,
      full: [
        String.raw`$5e^{-x}>0$ לכל $x$, ולכן סימן $S'(x)=5(1-x)e^{-x}$ זהה לסימן של $(1-x)$.`,
        String.raw`עבור $0<x<1$: $1-x>0$, ולכן $S'>0$ והפונקציה עולה. עבור $x>1$: $1-x<0$, ולכן $S'<0$ והפונקציה יורדת.`,
        String.raw`פונקציה שעולה עד $x=1$ ויורדת אחריו מקבלת שם מקסימום.`,
        String.raw`זו נקודת הקיצון היחידה בתחום $x>0$, ולכן זה גם השטח הגדול ביותר: $S(1)=\dfrac5e\approx 1.84$.`,
      ],
    },
  ],
};

const e5: Exercise = {
  id: 'cex-5',
  level: 2,
  topicId: T,
  subtopicIds: EXD,
  intro: String.raw`נתונות הפונקציות $f(x)=e^{2x}$ ו-$g(x)=4e^{x}-5$. הישר $x=t$ חותך את גרף $f$ בנקודה $A$ ואת גרף $g$ בנקודה $B$ (ראו שרטוט).`,
  diagram: {
    kind: 'plot',
    xRange: [-2, 1.2],
    yRange: [-5.6, 11.5],
    functions: [{ expr: 'exp(2*x)' }, { expr: '4*exp(x) - 5' }, vseg(-0.5, -2.5739, 0.3679, false)],
    points: [
      { x: -0.5, y: 0.3679 },
      { x: -0.5, y: -2.5739 },
    ],
    labels: [{ at: [-0.66, 1.25], text: 'A' }, { at: [-0.36, -3.4], text: 'B' }, { at: [0.72, 6.6], text: 'f' }, { at: [1.08, 4.9], text: 'g' }],
  },
  solutionDiagram: {
    kind: 'plot',
    xRange: [-1, 1.2],
    yRange: [-3.5, 9],
    functions: [{ expr: 'exp(2*x)' }, { expr: '4*exp(x) - 5' }, vseg(0.6931, 3, 4, false)],
    points: [
      { x: 0.6931, y: 4 },
      { x: 0.6931, y: 3 },
    ],
    labels: [{ at: [0.55, 4.7], text: 'A' }, { at: [0.84, 2.3], text: 'B' }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזה ביטוי מתאר את אורך הקטע $AB$ לכל $t$?`,
      hints: [String.raw`אורך של קטע אנכי הוא הפרש שיעורי ה-$y$: העליון פחות התחתון. איזה גרף גבוה יותר – ותמיד?`, String.raw`בדקו את הסימן של $f(t)-g(t)=e^{2t}-4e^{t}+5$. סמנו $u=e^{t}$ והשלימו לריבוע.`],
      check: { kind: 'choice', options: [String.raw`$4e^{t}-5-e^{2t}$`, String.raw`$e^{2t}+4e^{t}-5$`, String.raw`$e^{2t}-4e^{t}+5$`, String.raw`$e^{2t}-4e^{t}-5$`], correct: 2 },
      short: String.raw`$f(t)-g(t)=e^{2t}-4e^{t}+5=(e^{t}-2)^2+1>0$, ולכן $AB=e^{2t}-4e^{t}+5$.`,
      full: [
        String.raw`$A\left(t,\,e^{2t}\right)$ ו-$B\left(t,\,4e^{t}-5\right)$ נמצאות על אותו ישר אנכי, ולכן $AB=|f(t)-g(t)|$.`,
        String.raw`$f(t)-g(t)=e^{2t}-4e^{t}+5$. נסמן $u=e^{t}$: $u^2-4u+5=(u-2)^2+1$.`,
        String.raw`הביטוי חיובי לכל $t$, כלומר גרף $f$ נמצא תמיד מעל גרף $g$ (הגרפים אינם נחתכים).`,
        String.raw`לכן פונקציית המטרה היא $d(t)=e^{2t}-4e^{t}+5$, לכל $t$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את ערך $t$ שעבורו אורך הקטע $AB$ מינימלי (אפשר לעגל לשתי ספרות אחרי הנקודה).`,
      hints: [String.raw`גזרו את $d(t)=e^{2t}-4e^{t}+5$; זכרו ש-$\left(e^{2t}\right)'=2e^{2t}$.`, String.raw`$d'(t)=2e^{2t}-4e^{t}=2e^{t}\left(e^{t}-2\right)$. מתי המכפלה מתאפסת?`],
      check: { kind: 'numeric', answer: 0.6931471806, tol: 0.005, verify: "root('2*exp(2*x) - 4*exp(x)', 0, 2)" },
      short: String.raw`$d'(t)=2e^{t}\left(e^{t}-2\right)=0\ \Rightarrow\ e^{t}=2\ \Rightarrow\ t=\ln 2\approx 0.69$, ושם מינימום.`,
      full: [
        String.raw`$d'(t)=2e^{2t}-4e^{t}=2e^{t}\left(e^{t}-2\right)$.`,
        String.raw`$2e^{t}>0$ תמיד, ולכן $d'(t)=0$ רק כאשר $e^{t}=2$, כלומר $t=\ln 2\approx 0.69$.`,
        String.raw`סימן הנגזרת: עבור $t<\ln 2$ מתקיים $e^{t}<2$ ולכן $d'<0$; עבור $t>\ln 2$ מתקיים $d'>0$.`,
        String.raw`הפונקציה יורדת ואחר כך עולה, ולכן ב-$t=\ln 2$ יש מינימום – והוא מוחלט, כי זו נקודת הקיצון היחידה.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את האורך המינימלי של הקטע $AB$.`,
      hints: [String.raw`הציבו $t=\ln 2$ ב-$d(t)$. זכרו: $e^{\ln 2}=2$ ו-$e^{2\ln 2}=\left(e^{\ln 2}\right)^2$.`],
      check: { kind: 'numeric', answer: 1, verify: "exp(2*root('2*exp(2*x) - 4*exp(x)', 0, 2)) - 4*exp(root('2*exp(2*x) - 4*exp(x)', 0, 2)) + 5" },
      short: String.raw`$d(\ln 2)=4-4\cdot 2+5=1$.`,
      full: [
        String.raw`$e^{\ln 2}=2$ ו-$e^{2\ln 2}=\left(e^{\ln 2}\right)^2=4$.`,
        String.raw`$d(\ln 2)=4-8+5=1$. הנקודות: $A(\ln 2,\,4)$ ו-$B(\ln 2,\,3)$.`,
        String.raw`בדיקה: $d(t)=\left(e^{t}-2\right)^2+1\ge 1$, ושוויון מתקבל בדיוק כאשר $e^{t}=2$.`,
      ],
    },
  ],
};

const e6: Exercise = {
  id: 'cex-6',
  level: 2,
  topicId: T,
  subtopicIds: ['calc-extrema', 'calc-derivatives', 'calc-second-derivative'],
  intro: String.raw`נתונה הפונקציה $f(x)=e^{-2x}$. הנקודה $A$ נמצאת על גרף הפונקציה ברביע הראשון, ושיעור ה-$x$ שלה הוא $t$ ($t>0$). מהנקודה $A$ מורידים אנכים לצירים: $B$ על ציר $x$ ו-$C$ על ציר $y$, כך שנוצר המלבן $OBAC$ ($O$ ראשית הצירים; ראו שרטוט).`,
  diagram: {
    kind: 'plot',
    xRange: [-0.2, 1.6],
    yRange: [-0.15, 1.25],
    functions: [{ expr: 'exp(-2*x)', domain: [-0.1, 1.6] }, hseg(0.2019, 0, 0.8, false), vseg(0.8, 0, 0.2019, false)],
    points: [{ x: 0.8, y: 0.2019, label: 'A' }],
    labels: [{ at: [0.8, -0.08], text: 'B' }, { at: [0.07, 0.29], text: 'C' }, { at: [-0.08, -0.08], text: 'O' }],
  },
  solutionDiagram: {
    kind: 'plot',
    xRange: [-0.2, 1.6],
    yRange: [-0.15, 1.25],
    functions: [{ expr: 'exp(-2*x)', domain: [-0.1, 1.6] }, hseg(0.5, 0, 0.3466, false), vseg(0.3466, 0, 0.5, false)],
    points: [{ x: 0.3466, y: 0.5, label: 'A' }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את ערך $t$ שעבורו היקף המלבן $OBAC$ מינימלי (אפשר לעגל לשתי ספרות אחרי הנקודה).`,
      hints: [String.raw`צלעות המלבן: $OB=t$ ו-$AB=f(t)$. כתבו את ההיקף $P(t)$.`, String.raw`$P(t)=2t+2e^{-2t}$, ולכן $P'(t)=2-4e^{-2t}$. פתרו $P'(t)=0$.`, String.raw`$e^{-2t}=\dfrac12\ \Rightarrow\ -2t=\ln\dfrac12=-\ln 2$.`],
      check: { kind: 'numeric', answer: 0.3465735903, tol: 0.005, verify: "root('2 - 4*exp(-2*x)', 0.01, 3)" },
      short: String.raw`$P(t)=2t+2e^{-2t}$, $P'(t)=2-4e^{-2t}=0\ \Rightarrow\ e^{-2t}=\dfrac12\ \Rightarrow\ t=\dfrac{\ln 2}{2}\approx 0.35$.`,
      full: [
        String.raw`$B(t,0)$ ו-$C\left(0,\,e^{-2t}\right)$. צלעות המלבן: $OB=t$, $AB=e^{-2t}$ (חיובי תמיד).`,
        String.raw`פונקציית המטרה: $P(t)=2\left(t+e^{-2t}\right)=2t+2e^{-2t}$, בתחום $t>0$.`,
        String.raw`$P'(t)=2+2\cdot(-2)e^{-2t}=2-4e^{-2t}$.`,
        String.raw`$P'(t)=0\ \Rightarrow\ e^{-2t}=\dfrac12\ \Rightarrow\ -2t=\ln\dfrac12=-\ln 2\ \Rightarrow\ t=\dfrac{\ln 2}{2}\approx 0.35$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את ההיקף המינימלי (אפשר לעגל לשתי ספרות אחרי הנקודה).`,
      hints: [String.raw`הציבו $t=\dfrac{\ln 2}{2}$ ב-$P(t)$. בנקודה זו $e^{-2t}=\dfrac12$.`],
      check: { kind: 'numeric', answer: 1.6931471806, tol: 0.005, verify: "2*root('2 - 4*exp(-2*x)', 0.01, 3) + 2*exp(-2*root('2 - 4*exp(-2*x)', 0.01, 3))" },
      short: String.raw`$P_{\min}=2\cdot\dfrac{\ln 2}{2}+2\cdot\dfrac12=\ln 2+1\approx 1.69$.`,
      full: [
        String.raw`בנקודת הקיצון $e^{-2t}=\dfrac12$, כלומר גובה המלבן הוא $\dfrac12$ ורוחבו $\dfrac{\ln 2}{2}\approx 0.35$.`,
        String.raw`$P=2t+2e^{-2t}=2\cdot\dfrac{\ln 2}{2}+2\cdot\dfrac12=\ln 2+1\approx 1.69$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`איזה נימוק מראה שבנקודה שמצאתם ההיקף אכן מינימלי?`,
      hints: [String.raw`גזרו את $P'(t)=2-4e^{-2t}$ פעם נוספת.`, String.raw`נגזרת שנייה חיובית בנקודת קיצון פירושה מינימום.`],
      check: {
        kind: 'choice',
        options: [
          String.raw`$P''(t)=-8e^{-2t}<0$ לכל $t$, ולכן זו נקודת מינימום.`,
          String.raw`$P''(t)=8e^{-2t}>0$ לכל $t$, ולכן זו נקודת מקסימום.`,
          String.raw`$P''(t)=8e^{-2t}>0$ לכל $t$, ולכן זו נקודת מינימום.`,
          String.raw`$P'(t)>0$ לכל $t>0$, ולכן הפונקציה עולה בכל התחום.`,
        ],
        correct: 2,
      },
      short: String.raw`$P''(t)=8e^{-2t}>0$ לכל $t$, ולכן ב-$t=\dfrac{\ln 2}{2}$ יש מינימום.`,
      full: [
        String.raw`$P'(t)=2-4e^{-2t}$, ולכן $P''(t)=-4\cdot(-2)e^{-2t}=8e^{-2t}$.`,
        String.raw`$e^{-2t}>0$ לכל $t$, ולכן $P''>0$: נקודת הקיצון היא מינימום.`,
        String.raw`אפשר גם לפי סימן $P'$: עבור $0<t<\dfrac{\ln 2}{2}$ מתקיים $e^{-2t}>\dfrac12$ ולכן $P'<0$; עבור $t>\dfrac{\ln 2}{2}$ מתקיים $P'>0$.`,
        String.raw`ירידה ואחריה עלייה – מינימום. זו נקודת הקיצון היחידה בתחום, ולכן המינימום מוחלט.`,
      ],
    },
  ],
};

const e7: Exercise = {
  id: 'cex-7',
  level: 2,
  topicId: T,
  subtopicIds: EXD,
  intro: String.raw`נתונה הפונקציה $f(x)=2\ln x$. הנקודה $A$ נמצאת על גרף הפונקציה מתחת לציר $x$, ושיעור ה-$x$ שלה הוא $t$ ($0<t<1$). מהנקודה $A$ מעבירים אנכים לצירים: $B$ על ציר $x$ ו-$C$ על ציר $y$, כך שנוצר המלבן $OBAC$ ($O$ ראשית הצירים; ראו שרטוט).`,
  diagram: {
    kind: 'plot',
    xRange: [-0.3, 2.2],
    yRange: [-4.2, 1.8],
    functions: [{ expr: '2*log(x)', domain: [0.13, 2.2] }, hseg(-1.0217, 0, 0.6, false), vseg(0.6, -1.0217, 0, false)],
    points: [{ x: 0.6, y: -1.0217 }],
    labels: [{ at: [0.75, -1.35], text: 'A' }, { at: [0.6, 0.3], text: 'B' }, { at: [0.12, -1.42], text: 'C' }, { at: [-0.13, 0.3], text: 'O' }],
  },
  solutionDiagram: {
    kind: 'plot',
    xRange: [-0.3, 2.2],
    yRange: [-4.2, 1.8],
    functions: [{ expr: '2*log(x)', domain: [0.13, 2.2] }, hseg(-2, 0, 0.3679, false), vseg(0.3679, -2, 0, false)],
    points: [{ x: 0.3679, y: -2 }],
    labels: [{ at: [0.53, -2.3], text: 'A' }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזה ביטוי מתאר את שטח המלבן $OBAC$ כפונקציה של $t$?`,
      hints: [String.raw`אורך של צלע הוא מספר חיובי. מה הסימן של $\ln t$ כאשר $0<t<1$?`, String.raw`$OB=t$, ו-$AB=|2\ln t|=-2\ln t$.`],
      check: { kind: 'choice', options: [String.raw`$2t\ln t$`, String.raw`$-\dfrac{2\ln t}{t}$`, String.raw`$t-2\ln t$`, String.raw`$-2t\ln t$`], correct: 3 },
      short: String.raw`עבור $0<t<1$ מתקיים $\ln t<0$, ולכן $AB=-2\ln t$ ו-$S(t)=t\cdot(-2\ln t)=-2t\ln t$.`,
      full: [
        String.raw`$B(t,0)$ ו-$C(0,\,2\ln t)$. רוחב המלבן: $OB=t$.`,
        String.raw`עבור $0<t<1$ מתקיים $\ln t<0$, ולכן $A$ מתחת לציר $x$ וגובה המלבן הוא $AB=|2\ln t|=-2\ln t$.`,
        String.raw`$S(t)=OB\cdot AB=-2t\ln t$, בתחום $0<t<1$.`,
        String.raw`הביטוי $2t\ln t$ שלילי בתחום זה, ולכן אינו יכול לתאר שטח.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את ערך $t$ שעבורו שטח המלבן מקסימלי (אפשר לעגל לשתי ספרות אחרי הנקודה).`,
      hints: [String.raw`גזרו את $S(t)=-2t\ln t$ לפי כלל המכפלה.`, String.raw`$S'(t)=-2\ln t-2t\cdot\dfrac1t=-2\ln t-2$. פתרו $S'(t)=0$.`],
      check: { kind: 'numeric', answer: 0.3678794412, tol: 0.005, verify: "root('-2*log(x) - 2', 0.05, 0.95)" },
      short: String.raw`$S'(t)=-2\ln t-2=0\ \Rightarrow\ \ln t=-1\ \Rightarrow\ t=\dfrac1e\approx 0.37$, ושם מקסימום.`,
      full: [
        String.raw`$S'(t)=-2\left(1\cdot\ln t+t\cdot\dfrac1t\right)=-2\ln t-2$.`,
        String.raw`$S'(t)=0\ \Rightarrow\ \ln t=-1\ \Rightarrow\ t=e^{-1}=\dfrac1e\approx 0.37$ (בתוך התחום $0<t<1$).`,
        String.raw`סוג הקיצון: עבור $0<t<\dfrac1e$ מתקיים $\ln t<-1$ ולכן $S'>0$; עבור $\dfrac1e<t<1$ מתקיים $S'<0$.`,
        String.raw`עלייה ואחריה ירידה – מקסימום. (אפשר גם: $S''(t)=-\dfrac2t<0$.)`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את השטח המקסימלי של המלבן (אפשר לעגל לשתי ספרות אחרי הנקודה).`,
      hints: [String.raw`הציבו $t=\dfrac1e$ ב-$S(t)$; $\ln\dfrac1e=-1$.`],
      check: { kind: 'numeric', answer: 0.7357588823, tol: 0.005, verify: "-2*root('-2*log(x) - 2', 0.05, 0.95)*log(root('-2*log(x) - 2', 0.05, 0.95))" },
      short: String.raw`$S\!\left(\dfrac1e\right)=-2\cdot\dfrac1e\cdot(-1)=\dfrac2e\approx 0.74$.`,
      full: [
        String.raw`$\ln\dfrac1e=-1$, ולכן $A\!\left(\dfrac1e,\,-2\right)$: רוחב המלבן $\dfrac1e$ וגובהו $2$.`,
        String.raw`$S_{\max}=\dfrac1e\cdot 2=\dfrac2e\approx 0.74$.`,
      ],
    },
  ],
};

const e8: Exercise = {
  id: 'cex-8',
  level: 2,
  topicId: T,
  subtopicIds: EXD,
  intro: String.raw`נתונה הפונקציה $f(x)=xe^{-x}$. הנקודה $A$ נעה על גרף הפונקציה, ושיעור ה-$x$ שלה מקיים $1\le x\le 4$. מהנקודה $A$ מורידים אנכים לצירים, ונוצר מלבן ששניים מקודקודיו הם $A$ וראשית הצירים $O$ (ראו שרטוט; הקווים המקווקווים מסמנים את קצות התחום).`,
  diagram: {
    kind: 'plot',
    xRange: [-0.4, 5],
    yRange: [-0.05, 0.45],
    functions: [{ expr: 'x*exp(-x)', domain: [0, 5] }, hseg(0.1494, 0, 3, false), vseg(3, 0, 0.1494, false), vseg(1, 0, 0.3679), vseg(4, 0, 0.0733)],
    points: [{ x: 3, y: 0.1494, label: 'A' }],
    labels: [{ at: [-0.2, -0.03], text: 'O' }],
  },
  solutionDiagram: {
    kind: 'plot',
    xRange: [-0.4, 5],
    yRange: [-0.05, 0.45],
    functions: [{ expr: 'x*exp(-x)', domain: [0, 5] }, hseg(0.2707, 0, 2, false), vseg(2, 0, 0.2707, false), vseg(1, 0, 0.3679), vseg(4, 0, 0.0733)],
    points: [{ x: 2, y: 0.2707, label: 'A' }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את שיעור ה-$x$ של $A$ שעבורו שטח המלבן מקסימלי.`,
      hints: [String.raw`רוחב המלבן הוא $x$ וגובהו $f(x)$. כתבו את פונקציית השטח $S(x)$.`, String.raw`$S(x)=x\cdot xe^{-x}=x^2e^{-x}$. גזרו לפי כלל המכפלה והוציאו גורם משותף.`, String.raw`$S'(x)=2xe^{-x}-x^2e^{-x}=x(2-x)e^{-x}$.`],
      check: { kind: 'numeric', answer: 2, verify: "root('(2*x - x^2)*exp(-x)', 1, 3)" },
      short: String.raw`$S(x)=x^2e^{-x}$, $S'(x)=x(2-x)e^{-x}$ מתאפסת בתחום רק ב-$x=2$, ושם מקסימום.`,
      full: [
        String.raw`צלעות המלבן: $x$ ו-$f(x)=xe^{-x}$ (חיובי בתחום), ולכן $S(x)=x^2e^{-x}$, $1\le x\le 4$.`,
        String.raw`$S'(x)=2x\cdot e^{-x}+x^2\cdot\left(-e^{-x}\right)=x(2-x)e^{-x}$.`,
        String.raw`$S'(x)=0$ כאשר $x=0$ או $x=2$; בתחום $1\le x\le 4$ נמצא רק $x=2$.`,
        String.raw`עבור $1\le x<2$: $S'>0$ (עלייה); עבור $2<x\le 4$: $S'<0$ (ירידה). לכן ב-$x=2$ מקסימום, והוא המקסימום המוחלט בקטע.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את השטח המקסימלי של המלבן (אפשר לעגל לשתי ספרות אחרי הנקודה).`,
      hints: [String.raw`הציבו $x=2$ ב-$S(x)=x^2e^{-x}$.`],
      check: { kind: 'numeric', answer: 0.5413411329, tol: 0.005, verify: "root('(2*x - x^2)*exp(-x)', 1, 3)^2*exp(-root('(2*x - x^2)*exp(-x)', 1, 3))" },
      short: String.raw`$S(2)=4e^{-2}=\dfrac{4}{e^2}\approx 0.54$.`,
      full: [String.raw`$S(2)=2^2\cdot e^{-2}=\dfrac{4}{e^2}\approx 0.54$.`, String.raw`המלבן: רוחב $2$ וגובה $f(2)=\dfrac{2}{e^2}\approx 0.27$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`מהו השטח הקטן ביותר שהמלבן יכול לקבל בתחום הנתון? (אפשר לעגל לשתי ספרות אחרי הנקודה)`,
      hints: [String.raw`בקטע סגור הערך הקטן ביותר מתקבל בנקודת מינימום פנימית או באחד מקצות הקטע. יש כאן נקודת מינימום פנימית?`, String.raw`השוו בין $S(1)$ לבין $S(4)$.`],
      check: { kind: 'numeric', answer: 0.293050222, tol: 0.005, verify: 'min(1^2*exp(-1), 4^2*exp(-4))' },
      short: String.raw`אין מינימום פנימי, ולכן משווים קצוות: $S(1)=\dfrac1e\approx 0.37$, $S(4)=\dfrac{16}{e^4}\approx 0.29$. השטח המינימלי הוא $\dfrac{16}{e^4}\approx 0.29$.`,
      full: [
        String.raw`הפונקציה עולה ב-$[1,2]$ ויורדת ב-$[2,4]$, ולכן הערך הקטן ביותר מתקבל באחד מקצות הקטע.`,
        String.raw`$S(1)=1\cdot e^{-1}=\dfrac1e\approx 0.368$.`,
        String.raw`$S(4)=16e^{-4}=\dfrac{16}{e^4}\approx 0.293$.`,
        String.raw`$S(4)<S(1)$, ולכן השטח המינימלי הוא $\dfrac{16}{e^4}\approx 0.29$, והוא מתקבל כאשר $x=4$.`,
      ],
    },
  ],
};

const e9: Exercise = {
  id: 'cex-9',
  level: 3,
  topicId: T,
  subtopicIds: ['calc-extrema', 'calc-derivatives', 'calc-investigation'],
  intro: String.raw`נתונה הפונקציה $f(x)=\dfrac{6\ln x}{x^2}$. הנקודה $A$ נמצאת על גרף הפונקציה ברביע הראשון, ושיעור ה-$x$ שלה הוא $x$. מהנקודה $A$ מורידים אנכים לצירים: $B$ על ציר $x$ ו-$C$ על ציר $y$, כך שנוצר המלבן $OBAC$ ($O$ ראשית הצירים; ראו שרטוט).`,
  diagram: {
    kind: 'plot',
    xRange: [-0.5, 7],
    yRange: [-1.2, 1.5],
    functions: [{ expr: '6*log(x)/x^2', domain: [0.88, 7] }, hseg(0.4457, 0, 4.5, false), vseg(4.5, 0, 0.4457, false)],
    points: [{ x: 4.5, y: 0.4457, label: 'A' }],
    labels: [{ at: [4.5, -0.16], text: 'B' }, { at: [0.25, 0.62], text: 'C' }, { at: [-0.25, -0.16], text: 'O' }],
  },
  solutionDiagram: {
    kind: 'plot',
    xRange: [-0.5, 7],
    yRange: [-1.2, 1.5],
    functions: [{ expr: '6*log(x)/x^2', domain: [0.88, 7] }, hseg(0.812, 0, 2.7183, false), vseg(2.7183, 0, 0.812, false)],
    points: [{ x: 2.7183, y: 0.812, label: 'A' }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`עבור אילו ערכי $x$ הנקודה $A$ נמצאת ברביע הראשון, כלומר $f(x)>0$?`,
      hints: [String.raw`תחום ההגדרה הוא $x>0$, ושם המכנה $x^2$ חיובי. מה קובע את הסימן של $f(x)$?`, String.raw`$\ln x>0$ כאשר $x>1$.`],
      check: { kind: 'choice', options: [String.raw`$x>0$`, String.raw`$x>1$`, String.raw`$0<x<1$`, String.raw`$x>e$`], correct: 1 },
      short: String.raw`$x^2>0$, ולכן $f(x)>0$ בדיוק כאשר $\ln x>0$, כלומר $x>1$.`,
      full: [
        String.raw`תחום ההגדרה של $f$: $x>0$ (בגלל $\ln x$).`,
        String.raw`בתחום זה $x^2>0$, ולכן הסימן של $f(x)$ כסימן של $\ln x$.`,
        String.raw`$\ln x>0\iff x>1$. לכן תחום הבעיה הוא $x>1$ (ב-$x=1$ הגרף חותך את ציר $x$).`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`איזה ביטוי מתאר את שטח המלבן $OBAC$ כפונקציה של $x$?`,
      hints: [String.raw`רוחב המלבן הוא $OB=x$ וגובהו $AB=f(x)$.`, String.raw`$S(x)=x\cdot\dfrac{6\ln x}{x^2}$ – צמצמו.`],
      check: { kind: 'choice', options: [String.raw`$\dfrac{6\ln x}{x^2}$`, String.raw`$\dfrac{6\ln x}{x^3}$`, String.raw`$\dfrac{6\ln x}{x}$`, String.raw`$6x\ln x$`], correct: 2 },
      short: String.raw`$S(x)=x\cdot f(x)=x\cdot\dfrac{6\ln x}{x^2}=\dfrac{6\ln x}{x}$, $x>1$.`,
      full: [
        String.raw`$B(x,0)$, ולכן $OB=x$; $AB=f(x)=\dfrac{6\ln x}{x^2}$ (חיובי עבור $x>1$).`,
        String.raw`$S(x)=OB\cdot AB=x\cdot\dfrac{6\ln x}{x^2}=\dfrac{6\ln x}{x}$, בתחום $x>1$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את שיעור ה-$x$ של $A$ שעבורו שטח המלבן מקסימלי (אפשר לעגל לשתי ספרות אחרי הנקודה).`,
      hints: [String.raw`גזרו את $S(x)=\dfrac{6\ln x}{x}$ לפי כלל המנה.`, String.raw`$S'(x)=\dfrac{6\cdot\frac1x\cdot x-6\ln x}{x^2}=\dfrac{6(1-\ln x)}{x^2}$. מתי המונה מתאפס?`],
      check: { kind: 'numeric', answer: 2.718281828, tol: 0.005, verify: "root('6*(1 - log(x))/x^2', 1.5, 5)" },
      short: String.raw`$S'(x)=\dfrac{6(1-\ln x)}{x^2}=0\ \Rightarrow\ \ln x=1\ \Rightarrow\ x=e\approx 2.72$, ושם מקסימום.`,
      full: [
        String.raw`$S'(x)=\dfrac{6\cdot\frac1x\cdot x-6\ln x\cdot 1}{x^2}=\dfrac{6(1-\ln x)}{x^2}$.`,
        String.raw`$S'(x)=0\ \Rightarrow\ 1-\ln x=0\ \Rightarrow\ x=e\approx 2.72$ (בתחום $x>1$).`,
        String.raw`המכנה חיובי, ולכן הסימן של $S'$ כסימן של $(1-\ln x)$: עבור $1<x<e$ מתקיים $S'>0$, ועבור $x>e$ מתקיים $S'<0$.`,
        String.raw`הפונקציה עולה ואחר כך יורדת, ולכן ב-$x=e$ יש מקסימום – והוא מוחלט, כי זו נקודת הקיצון היחידה בתחום.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את השטח המקסימלי של המלבן (אפשר לעגל לשתי ספרות אחרי הנקודה).`,
      hints: [String.raw`הציבו $x=e$ ב-$S(x)$; $\ln e=1$.`],
      check: { kind: 'numeric', answer: 2.207276647, tol: 0.005, verify: "6*log(root('6*(1 - log(x))/x^2', 1.5, 5))/root('6*(1 - log(x))/x^2', 1.5, 5)" },
      short: String.raw`$S(e)=\dfrac{6\ln e}{e}=\dfrac6e\approx 2.21$.`,
      full: [
        String.raw`$S(e)=\dfrac{6\cdot 1}{e}=\dfrac6e\approx 2.21$.`,
        String.raw`בדיקה דרך הצלעות: $OB=e$, $AB=f(e)=\dfrac{6}{e^2}\approx 0.81$, ומכפלתן $\dfrac6e$.`,
        String.raw`שימו לב: $A$ אינה נקודת המקסימום של $f$ (זו מתקבלת ב-$x=\sqrt e\approx 1.65$). המלבן בעל השטח הגדול ביותר אינו בהכרח הגבוה ביותר.`,
      ],
    },
  ],
};

const e10: Exercise = {
  id: 'cex-10',
  level: 3,
  topicId: T,
  subtopicIds: ['calc-extrema', 'calc-derivatives', 'calc-second-derivative'],
  intro: String.raw`נתונה הפונקציה $f(x)=e^{1-x}$. הנקודה $A$ נמצאת על גרף הפונקציה ברביע הראשון, ושיעור ה-$x$ שלה הוא $t$ ($t>0$). המשיק לגרף הפונקציה בנקודה $A$ חותך את ציר $x$ בנקודה $B$ ואת ציר $y$ בנקודה $C$. $O$ היא ראשית הצירים (ראו שרטוט).`,
  diagram: {
    kind: 'plot',
    xRange: [-0.5, 4.2],
    yRange: [-0.4, 3],
    functions: [{ expr: 'exp(1-x)', domain: [-0.09, 4.2] }, { expr: 'exp(1-2.5)*(3.5 - x)', domain: [-0.35, 3.5] }],
    points: [
      { x: 2.5, y: 0.2231, label: 'A' },
      { x: 3.5, y: 0 },
      { x: 0, y: 0.7809 },
    ],
    labels: [{ at: [3.5, -0.2], text: 'B' }, { at: [0.2, 1.08], text: 'C' }, { at: [-0.22, -0.2], text: 'O' }],
  },
  solutionDiagram: {
    kind: 'plot',
    xRange: [-0.5, 4.2],
    yRange: [-0.4, 3],
    functions: [{ expr: 'exp(1-x)', domain: [-0.09, 4.2] }, { expr: '2 - x', domain: [0, 2] }],
    shade: [{ between: '2 - x', from: 0, to: 2 }],
    points: [
      { x: 1, y: 1, label: 'A' },
      { x: 2, y: 0 },
      { x: 0, y: 2 },
    ],
    labels: [{ at: [2.3, -0.2], text: 'B' }, { at: [-0.25, 2.35], text: 'C' }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הראו ששיעורי הנקודה $B$ הם $(t+1,\,0)$.`,
      hints: [String.raw`שיפוע המשיק הוא $f'(t)$. מהי הנגזרת של $e^{1-x}$?`, String.raw`משוואת המשיק: $y-e^{1-t}=-e^{1-t}(x-t)$. הציבו $y=0$.`],
      check: { kind: 'self' },
      short: String.raw`המשיק: $y-e^{1-t}=-e^{1-t}(x-t)$. מציבים $y=0$ ומחלקים ב-$e^{1-t}\neq 0$: $x-t=1$, כלומר $B(t+1,\,0)$.`,
      full: [
        String.raw`$f'(x)=-e^{1-x}$ (הנגזרת הפנימית היא $-1$), ולכן שיפוע המשיק בנקודה $A\left(t,\,e^{1-t}\right)$ הוא $-e^{1-t}$.`,
        String.raw`משוואת המשיק: $y-e^{1-t}=-e^{1-t}(x-t)$.`,
        String.raw`חיתוך עם ציר $x$: מציבים $y=0$ ומקבלים $-e^{1-t}=-e^{1-t}(x-t)$.`,
        String.raw`$e^{1-t}\neq 0$, ולכן אפשר לחלק בו: $x-t=1$, כלומר $x=t+1$ ו-$B(t+1,\,0)$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`איזה ביטוי מתאר את שטח המשולש $OBC$ כפונקציה של $t$?`,
      hints: [String.raw`מצאו את $C$: הציבו $x=0$ במשוואת המשיק.`, String.raw`$C\left(0,\,(t+1)e^{1-t}\right)$. המשולש $OBC$ ישר זווית, והניצבים שלו הם $OB$ ו-$OC$.`],
      check: { kind: 'choice', options: [String.raw`$\dfrac12(t+1)e^{1-t}$`, String.raw`$\dfrac12(t+1)^2e^{1-t}$`, String.raw`$(t+1)^2e^{1-t}$`, String.raw`$\dfrac12t(t+1)e^{1-t}$`], correct: 1 },
      short: String.raw`$OB=t+1$, $OC=(t+1)e^{1-t}$, ולכן $S(t)=\dfrac12(t+1)^2e^{1-t}$.`,
      full: [
        String.raw`חיתוך המשיק עם ציר $y$: מציבים $x=0$ ומקבלים $y=e^{1-t}+t\,e^{1-t}=(t+1)e^{1-t}$, כלומר $C\left(0,\,(t+1)e^{1-t}\right)$.`,
        String.raw`עבור $t>0$ שני השיעורים חיוביים: $OB=t+1$, $OC=(t+1)e^{1-t}$.`,
        String.raw`המשולש $OBC$ ישר זווית ב-$O$, ולכן $S(t)=\dfrac{OB\cdot OC}{2}=\dfrac12(t+1)^2e^{1-t}$, בתחום $t>0$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את ערך $t$ שעבורו שטח המשולש $OBC$ מקסימלי.`,
      hints: [String.raw`גזרו את $S(t)=\dfrac12(t+1)^2e^{1-t}$ לפי כלל המכפלה.`, String.raw`$S'(t)=(t+1)e^{1-t}-\dfrac12(t+1)^2e^{1-t}$. הוציאו את הגורם המשותף $\dfrac12(t+1)e^{1-t}$.`],
      check: { kind: 'numeric', answer: 1, verify: "root('(x+1)*exp(1-x) - 0.5*(x+1)^2*exp(1-x)', 0.2, 3)" },
      short: String.raw`$S'(t)=\dfrac12(t+1)(1-t)e^{1-t}=0\ \Rightarrow\ t=1$ (בתחום $t>0$), ושם מקסימום.`,
      full: [
        String.raw`$S'(t)=\dfrac12\left[2(t+1)e^{1-t}+(t+1)^2\cdot\left(-e^{1-t}\right)\right]$.`,
        String.raw`$S'(t)=\dfrac12(t+1)e^{1-t}\left[2-(t+1)\right]=\dfrac12(t+1)(1-t)e^{1-t}$.`,
        String.raw`בתחום $t>0$ הגורמים $(t+1)$ ו-$e^{1-t}$ חיוביים, ולכן $S'(t)=0$ רק ב-$t=1$, והסימן של $S'$ כסימן של $(1-t)$.`,
        String.raw`עבור $0<t<1$: $S'>0$; עבור $t>1$: $S'<0$. עלייה ואחריה ירידה – מקסימום מוחלט ב-$t=1$.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את השטח המקסימלי של המשולש $OBC$.`,
      hints: [String.raw`הציבו $t=1$ ב-$S(t)$; $e^{0}=1$.`],
      check: { kind: 'numeric', answer: 2, verify: "0.5*(root('(x+1)*exp(1-x) - 0.5*(x+1)^2*exp(1-x)', 0.2, 3) + 1)^2*exp(1 - root('(x+1)*exp(1-x) - 0.5*(x+1)^2*exp(1-x)', 0.2, 3))" },
      short: String.raw`$S(1)=\dfrac12\cdot 2^2\cdot e^{0}=2$.`,
      full: [
        String.raw`$S(1)=\dfrac12(1+1)^2e^{1-1}=\dfrac12\cdot 4\cdot 1=2$.`,
        String.raw`במצב זה $A(1,1)$, המשיק הוא $y=-x+2$, ו-$B(2,0)$, $C(0,2)$: משולש ישר זווית ושווה שוקיים ששטחו $\dfrac{2\cdot 2}{2}=2$.`,
      ],
    },
  ],
};

const e11: Exercise = {
  id: 'cex-11',
  level: 3,
  topicId: T,
  subtopicIds: ['calc-extrema', 'calc-derivatives', 'calc-second-derivative'],
  intro: String.raw`נתונה הפונקציה $f(x)=\ln x$ והנקודה $P(0,1)$. $A$ היא נקודה על גרף הפונקציה, ושיעור ה-$x$ שלה הוא $x$ (ראו שרטוט). מחפשים את הנקודה $A$ הקרובה ביותר ל-$P$.`,
  diagram: {
    kind: 'plot',
    xRange: [-0.6, 4.4],
    yRange: [-2, 1.627],
    functions: [{ expr: 'log(x)', domain: [0.14, 4.4] }, { expr: '1 + x*(log(2.4) - 1)/2.4', domain: [0, 2.4], dashed: true }],
    points: [
      { x: 0, y: 1, label: 'P' },
      { x: 2.4, y: 0.8755 },
    ],
    labels: [{ at: [2.58, 0.58], text: 'A' }, { at: [4.1, 1.08], text: 'f' }],
  },
  solutionDiagram: {
    kind: 'plot',
    xRange: [-0.6, 4.4],
    yRange: [-2, 1.627],
    functions: [{ expr: 'log(x)', domain: [0.14, 4.4] }, { expr: '1 - x', domain: [0, 1] }, { expr: 'x - 1', domain: [0.1, 2.5], dashed: true }],
    points: [
      { x: 0, y: 1, label: 'P' },
      { x: 1, y: 0 },
    ],
    labels: [{ at: [1.12, 0.48], text: 'A' }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזה ביטוי מתאר את ריבוע המרחק $PA$ כפונקציה של $x$?`,
      hints: [String.raw`שיעורי הנקודה: $A(x,\,\ln x)$. השתמשו בנוסחת המרחק בין שתי נקודות.`, String.raw`$PA^2=(x-0)^2+(\ln x-1)^2$.`],
      check: { kind: 'choice', options: [String.raw`$x^2+(\ln x)^2-1$`, String.raw`$(x-1)^2+(\ln x)^2$`, String.raw`$x^2+(\ln x+1)^2$`, String.raw`$x^2+(\ln x-1)^2$`], correct: 3 },
      short: String.raw`$PA^2=(x-0)^2+(\ln x-1)^2=x^2+(\ln x-1)^2$.`,
      full: [
        String.raw`$A(x,\,\ln x)$, $P(0,1)$.`,
        String.raw`$PA^2=(x_A-x_P)^2+(y_A-y_P)^2=x^2+(\ln x-1)^2$, בתחום $x>0$.`,
        String.raw`המרחק חיובי, ולכן הוא מינימלי בדיוק כאשר ריבוע המרחק מינימלי. נוח לחקור את $g(x)=x^2+(\ln x-1)^2$ – בלי שורש.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`נסמן $g(x)=x^2+(\ln x-1)^2$. הראו ש-$g'(1)=0$, והסבירו מדוע $x=1$ היא נקודת המינימום היחידה של $g$.`,
      hints: [String.raw`גזרו: $\left[(\ln x-1)^2\right]'=2(\ln x-1)\cdot\dfrac1x$.`, String.raw`כתבו $g'(x)=\dfrac2x\left(x^2+\ln x-1\right)$. עבור $x>0$ הסימן של $g'$ כסימן של $h(x)=x^2+\ln x-1$.`, String.raw`$h(1)=0$, ו-$h$ עולה כי $h'(x)=2x+\dfrac1x>0$. מה הסימן של $h$ משמאל ל-1 ומימין לו?`],
      check: { kind: 'self' },
      short: String.raw`$g'(x)=\dfrac2x\left(x^2+\ln x-1\right)$, ו-$g'(1)=0$. הפונקציה $h(x)=x^2+\ln x-1$ עולה ו-$h(1)=0$, ולכן $g'<0$ עבור $0<x<1$ ו-$g'>0$ עבור $x>1$: מינימום יחיד ב-$x=1$.`,
      full: [
        String.raw`$g'(x)=2x+2(\ln x-1)\cdot\dfrac1x=\dfrac{2x^2+2\ln x-2}{x}=\dfrac2x\left(x^2+\ln x-1\right)$.`,
        String.raw`$g'(1)=\dfrac21\left(1+\ln 1-1\right)=0$.`,
        String.raw`עבור $x>0$ הגורם $\dfrac2x$ חיובי, ולכן הסימן של $g'(x)$ כסימן של $h(x)=x^2+\ln x-1$.`,
        String.raw`$h'(x)=2x+\dfrac1x>0$ לכל $x>0$, ולכן $h$ עולה בכל התחום ומתאפסת רק פעם אחת – ב-$x=1$.`,
        String.raw`לכן $h<0$ (ו-$g'<0$) עבור $0<x<1$, ו-$h>0$ (ו-$g'>0$) עבור $x>1$: $g$ יורדת ואחר כך עולה. $x=1$ היא נקודת מינימום, היא היחידה, ולכן המינימום מוחלט.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את המרחק המינימלי בין $P$ לגרף הפונקציה (אפשר לעגל לשתי ספרות אחרי הנקודה).`,
      hints: [String.raw`הנקודה הקרובה ביותר היא $A(1,\,\ln 1)$.`, String.raw`$PA=\sqrt{g(1)}$ – אל תשכחו את השורש.`],
      check: { kind: 'numeric', answer: 1.414213562, tol: 0.005, verify: "sqrt(root('2*x + 2*(log(x) - 1)/x', 0.3, 3)^2 + (log(root('2*x + 2*(log(x) - 1)/x', 0.3, 3)) - 1)^2)" },
      short: String.raw`$A(1,0)$, ולכן $PA=\sqrt{1^2+(0-1)^2}=\sqrt2\approx 1.41$.`,
      full: [
        String.raw`ב-$x=1$: $A(1,\,\ln 1)=A(1,0)$.`,
        String.raw`$g(1)=1^2+(0-1)^2=2$.`,
        String.raw`$PA_{\min}=\sqrt{g(1)}=\sqrt2\approx 1.41$. (זכרו להוציא שורש: $g$ הוא ריבוע המרחק.)`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`עבור הנקודה $A$ שמצאתם, חשבו את מכפלת שיפוע הישר $PA$ בשיפוע המשיק לגרף הפונקציה בנקודה $A$.`,
      hints: [String.raw`שיפוע המשיק ב-$A$ הוא $f'(1)$, ו-$f'(x)=\dfrac1x$.`, String.raw`שיפוע $PA$: $\dfrac{y_A-y_P}{x_A-x_P}=\dfrac{0-1}{1-0}$.`],
      check: { kind: 'numeric', answer: -1, verify: "deriv('log(x)', 1) * (log(1) - 1)/(1 - 0)" },
      short: String.raw`שיפוע המשיק $f'(1)=1$, שיפוע $PA$ הוא $-1$; המכפלה $-1$, כלומר $PA$ מאונך למשיק.`,
      full: [
        String.raw`$f'(x)=\dfrac1x$, ולכן שיפוע המשיק בנקודה $A(1,0)$ הוא $f'(1)=1$.`,
        String.raw`שיפוע $PA$: $m_{PA}=\dfrac{0-1}{1-0}=-1$.`,
        String.raw`המכפלה: $1\cdot(-1)=-1$.`,
        String.raw`מכפלת שיפועים $-1$ פירושה ישרים מאונכים: הקטע הקצר ביותר מנקודה לגרף מאונך למשיק לגרף בקצה הקטע.`,
      ],
    },
  ],
};

const e12: Exercise = {
  id: 'cex-12',
  level: 3,
  topicId: T,
  subtopicIds: ['calc-extrema', 'calc-derivatives', 'calc-second-derivative', 'calc-investigation'],
  intro: String.raw`נתונה משפחת הפונקציות $f(x)=e^{x}-ax$, כאשר $a>0$ פרמטר. בשרטוט מוצגים הגרפים של שתי פונקציות מהמשפחה: עבור $a=2$ ועבור $a=4$. לכל $a>0$ יש לפונקציה נקודת קיצון אחת.`,
  diagram: {
    kind: 'plot',
    xRange: [-1.5, 2.6],
    yRange: [-2.6, 8],
    functions: [{ expr: 'exp(x) - 2*x' }, { expr: 'exp(x) - 4*x' }],
    labels: [{ at: [1.7, 4.9], text: 'a=2' }, { at: [1.4, -2.25], text: 'a=4' }],
  },
  solutionDiagram: {
    kind: 'plot',
    xRange: [-1.5, 2.6],
    yRange: [-2.6, 8],
    functions: [{ expr: 'exp(x) - x' }, { expr: 'exp(x) - e*x' }],
    points: [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ],
    labels: [{ at: [1.55, 5.6], text: 'a=1' }, { at: [2.25, 1.2], text: 'a=e' }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מהו שיעור ה-$x$ של נקודת הקיצון של $f$, ומה סוג הקיצון?`,
      hints: [String.raw`$f'(x)=e^{x}-a$. פתרו $f'(x)=0$.`, String.raw`לסוג הקיצון: $f''(x)=e^{x}$, והוא חיובי תמיד.`],
      check: { kind: 'choice', options: [String.raw`$x=e^{a}$, מינימום`, String.raw`$x=\ln a$, מקסימום`, String.raw`$x=\ln a$, מינימום`, String.raw`$x=a$, מינימום`], correct: 2 },
      short: String.raw`$f'(x)=e^{x}-a=0\ \Rightarrow\ x=\ln a$; $f''(x)=e^{x}>0$, ולכן זו נקודת מינימום.`,
      full: [
        String.raw`$f'(x)=e^{x}-a$.`,
        String.raw`$f'(x)=0\ \Rightarrow\ e^{x}=a\ \Rightarrow\ x=\ln a$ (יש פתרון כי $a>0$).`,
        String.raw`$f''(x)=e^{x}>0$ לכל $x$, ולכן הנקודה היא מינימום – והוא מוחלט, כי זו נקודת הקיצון היחידה.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`נסמן ב-$m(a)$ את הערך המינימלי של $f$. איזה ביטוי מתאר את $m(a)$?`,
      hints: [String.raw`הציבו $x=\ln a$ בפונקציה $f(x)=e^{x}-ax$.`, String.raw`$e^{\ln a}=a$.`],
      check: { kind: 'choice', options: [String.raw`$a-\ln a$`, String.raw`$a-a\ln a$`, String.raw`$a\ln a-a$`, String.raw`$1-a\ln a$`], correct: 1 },
      short: String.raw`$m(a)=f(\ln a)=e^{\ln a}-a\ln a=a-a\ln a$.`,
      full: [
        String.raw`$m(a)=f(\ln a)=e^{\ln a}-a\cdot\ln a$.`,
        String.raw`$e^{\ln a}=a$, ולכן $m(a)=a-a\ln a=a(1-\ln a)$.`,
        String.raw`בדיקה מול השרטוט: עבור $a=2$ מתקבל $m=2-2\ln 2\approx 0.61$, ועבור $a=4$ מתקבל $m=4-4\ln 4\approx -1.55$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את ערך הפרמטר $a$ שעבורו הערך המינימלי של $f$ הוא הגדול ביותר.`,
      hints: [String.raw`כעת $m(a)=a-a\ln a$ היא פונקציית המטרה, והמשתנה הוא $a$ ($a>0$).`, String.raw`$m'(a)=1-\left(\ln a+a\cdot\dfrac1a\right)=-\ln a$.`],
      check: { kind: 'numeric', answer: 1, verify: "root('1 - (log(x) + 1)', 0.2, 5)" },
      short: String.raw`$m'(a)=-\ln a=0\ \Rightarrow\ a=1$; $m'$ עוברת מחיובית לשלילית, ולכן מקסימום. הערך: $m(1)=1$.`,
      full: [
        String.raw`פונקציית המטרה: $m(a)=a-a\ln a$, $a>0$.`,
        String.raw`$m'(a)=1-\left(1\cdot\ln a+a\cdot\dfrac1a\right)=1-\ln a-1=-\ln a$.`,
        String.raw`$m'(a)=0\ \Rightarrow\ \ln a=0\ \Rightarrow\ a=1$.`,
        String.raw`עבור $0<a<1$: $\ln a<0$ ולכן $m'>0$; עבור $a>1$: $m'<0$. עלייה ואחריה ירידה – מקסימום מוחלט ב-$a=1$.`,
        String.raw`הערך המינימלי הגדול ביותר הוא $m(1)=1-1\cdot\ln 1=1$: עבור $a=1$ הפונקציה היא $f(x)=e^{x}-x$, ונקודת המינימום שלה היא $(0,1)$.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`עבור איזה ערך של $a$ נקודת המינימום של $f$ נמצאת על ציר $x$? (אפשר לעגל לשתי ספרות אחרי הנקודה)`,
      hints: [String.raw`נקודת מינימום על ציר $x$ פירושה שהערך המינימלי הוא אפס: $m(a)=0$.`, String.raw`$a(1-\ln a)=0$, ו-$a>0$.`],
      check: { kind: 'numeric', answer: 2.718281828, tol: 0.005, verify: "root('x - x*log(x)', 2, 4)" },
      short: String.raw`$m(a)=a(1-\ln a)=0\ \Rightarrow\ \ln a=1\ \Rightarrow\ a=e\approx 2.72$.`,
      full: [
        String.raw`נקודת המינימום היא $\left(\ln a,\ a-a\ln a\right)$. היא נמצאת על ציר $x$ כאשר $a-a\ln a=0$.`,
        String.raw`$a(1-\ln a)=0$; $a>0$, ולכן $1-\ln a=0$, כלומר $a=e\approx 2.72$.`,
        String.raw`עבור $a=e$: $f(x)=e^{x}-ex$, נקודת המינימום היא $(1,0)$, והגרף משיק לציר $x$.`,
        String.raw`עבור $a<e$ הגרף כולו מעל הציר, ועבור $a>e$ הוא חותך את הציר פעמיים.`,
      ],
    },
  ],
};

export const calc582Extrema: ExerciseSet = {
  id: 'calc582-extrema',
  questionnaire: '35582',
  title: 'בעיות קיצון עם eˣ ו-ln x',
  topicIds: ['differential-integral'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
