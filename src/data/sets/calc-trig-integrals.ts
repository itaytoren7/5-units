import type { Exercise, ExerciseSet } from './types';

/**
 * סט: אינטגרלים ושטחים של פונקציות טריגונומטריות (שאלון 35581, שאלה 7).
 * 1–4 צעד אחד · 5–8 שניים-שלושה סעיפים · 9–12 שאלות בסגנון בגרות. כל הזוויות ברדיאנים.
 */

const T = 'integral-calculus';
const PI = Math.PI;
const ROUND = 'אפשר לעגל לשתי ספרות אחרי הנקודה.';

const e1: Exercise = {
  id: 'cti-1',
  level: 1,
  topicId: T,
  subtopicIds: ['int-trig', 'int-indefinite'],
  intro: String.raw`נתונה הפונקציה $f(x)=4\sin\left(2x-\dfrac{\pi}{3}\right)$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [0, 3.5], functions: [{ expr: '4*sin(2*x-pi/3)', label: 'f', domain: [0, PI] }], points: [{ x: PI, y: 0, label: 'π' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזו מהפונקציות הבאות היא פונקציה קדומה של $f(x)$?`,
      hints: [
        String.raw`חפשו פונקציה שהנגזרת שלה היא $f(x)$. זכרו ש-$(\cos x)'=-\sin x$, ושבגזירת פונקציה מורכבת כופלים בנגזרת הפנימית.`,
        String.raw`$\displaystyle\int\sin(ax+b)\,dx=-\dfrac{1}{a}\cos(ax+b)+C$, וכאן $a=2$.`,
      ],
      check: {
        kind: 'choice',
        options: [
          String.raw`$F(x)=-8\cos\left(2x-\dfrac{\pi}{3}\right)$`,
          String.raw`$F(x)=-2\cos\left(2x-\dfrac{\pi}{3}\right)$`,
          String.raw`$F(x)=2\cos\left(2x-\dfrac{\pi}{3}\right)$`,
          String.raw`$F(x)=-4\cos\left(2x-\dfrac{\pi}{3}\right)$`,
        ],
        correct: 1,
      },
      short: String.raw`מחלקים בנגזרת הפנימית $2$, והסינוס הופך למינוס קוסינוס: $F(x)=-2\cos\left(2x-\dfrac{\pi}{3}\right)$.`,
      full: [
        String.raw`כלל: $\displaystyle\int\sin(ax+b)\,dx=-\dfrac1a\cos(ax+b)+C$, כי בגזירת $\cos(ax+b)$ מתקבל $-a\sin(ax+b)$.`,
        String.raw`כאן $a=2$: $\displaystyle\int 4\sin\left(2x-\dfrac{\pi}{3}\right)dx=-\dfrac42\cos\left(2x-\dfrac{\pi}{3}\right)+C=-2\cos\left(2x-\dfrac{\pi}{3}\right)+C$.`,
        String.raw`בדיקה בגזירה: $\left(-2\cos\left(2x-\dfrac{\pi}{3}\right)\right)'=-2\cdot\left(-\sin\left(2x-\dfrac{\pi}{3}\right)\right)\cdot 2=4\sin\left(2x-\dfrac{\pi}{3}\right)$.`,
      ],
    },
  ],
};

const e2: Exercise = {
  id: 'cti-2',
  level: 1,
  topicId: T,
  subtopicIds: ['int-trig', 'int-definite-areas'],
  intro: String.raw`נתונה הפונקציה $f(x)=\dfrac{6}{\cos^2 2x}$ בתחום $0\le x\le\dfrac{\pi}{8}$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [0, 0.46], functions: [{ expr: '6/cos(2*x)^2', label: 'f', domain: [0, PI / 8] }], points: [{ x: PI / 8, y: 0, label: 'π/8' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $\displaystyle\int_0^{\pi/8}\dfrac{6}{\cos^2 2x}\,dx$.`,
      hints: [
        String.raw`הנגזרת של איזו פונקציה טריגונומטרית היא $\dfrac{1}{\cos^2x}$?`,
        String.raw`$\displaystyle\int\dfrac{1}{\cos^2(ax+b)}\,dx=\dfrac1a\tan(ax+b)+C$, ולכן פונקציה קדומה כאן היא $3\tan 2x$.`,
      ],
      check: { kind: 'numeric', answer: 3, verify: "integrate('6/cos(2*x)^2', 0, pi/8)" },
      short: String.raw`$\Big[3\tan 2x\Big]_0^{\pi/8}=3\tan\dfrac{\pi}{4}-3\tan 0=3$.`,
      full: [
        String.raw`$(\tan x)'=\dfrac{1}{\cos^2x}$, ולכן $\displaystyle\int\dfrac{1}{\cos^2 2x}\,dx=\dfrac12\tan 2x+C$ (מחלקים בנגזרת הפנימית $2$).`,
        String.raw`פונקציה קדומה של $f$: $F(x)=6\cdot\dfrac12\tan 2x=3\tan 2x$.`,
        String.raw`$\displaystyle\int_0^{\pi/8}f(x)\,dx=F\left(\dfrac{\pi}{8}\right)-F(0)=3\tan\dfrac{\pi}{4}-3\tan 0=3\cdot 1-0=3$.`,
      ],
    },
  ],
};

const e3: Exercise = {
  id: 'cti-3',
  level: 1,
  topicId: T,
  subtopicIds: ['int-trig', 'int-definite-areas'],
  intro: String.raw`נתונה הפונקציה $f(x)=4\cos 2x$. ברביע הראשון הגרף חותך את ציר ה-$x$ בנקודה $A\left(\dfrac{\pi}{4},0\right)$. בשרטוט מסומן השטח המוגבל בין גרף הפונקציה, ציר ה-$x$ וציר ה-$y$.`,
  diagram: { kind: 'plot', xRange: [0, 1.1], functions: [{ expr: '4*cos(2*x)', label: 'f' }], shade: [{ between: '4*cos(2*x)', from: 0, to: PI / 4 }], points: [{ x: PI / 4, y: 0, label: 'A' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את השטח המסומן.`,
      hints: [
        String.raw`בתחום $0\le x\le\dfrac{\pi}{4}$ הפונקציה אי-שלילית, ולכן השטח שווה לאינטגרל המסוים של $f$ בין הגבולות האלה.`,
        String.raw`פונקציה קדומה של $4\cos 2x$ היא $2\sin 2x$.`,
      ],
      check: { kind: 'numeric', answer: 2, verify: "integrate('4*cos(2*x)', 0, pi/4)" },
      short: String.raw`$S=\displaystyle\int_0^{\pi/4}4\cos 2x\,dx=\Big[2\sin 2x\Big]_0^{\pi/4}=2\sin\dfrac{\pi}{2}-0=2$.`,
      full: [
        String.raw`בתחום $0\le x\le\dfrac{\pi}{4}$ מתקיים $\cos 2x\ge 0$, ולכן הגרף מעל ציר ה-$x$ והשטח הוא $S=\displaystyle\int_0^{\pi/4}4\cos 2x\,dx$.`,
        String.raw`פונקציה קדומה: $\displaystyle\int 4\cos 2x\,dx=\dfrac42\sin 2x+C=2\sin 2x+C$.`,
        String.raw`$S=2\sin\left(2\cdot\dfrac{\pi}{4}\right)-2\sin 0=2\sin\dfrac{\pi}{2}=2$.`,
      ],
    },
  ],
};

const e4: Exercise = {
  id: 'cti-4',
  level: 1,
  topicId: T,
  subtopicIds: ['int-trig', 'int-antiderivative-point'],
  intro: String.raw`נגזרת הפונקציה $f(x)$ היא $f'(x)=6\sin 3x$ (בשרטוט מופיע גרף הנגזרת). גרף הפונקציה $f(x)$ עובר דרך הנקודה $\left(\dfrac{\pi}{3},\,5\right)$.`,
  diagram: { kind: 'plot', xRange: [0, 2.3], functions: [{ expr: '6*sin(3*x)', label: "f'", domain: [0, (2 * PI) / 3] }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את $f(0)$.`,
      hints: [
        String.raw`$f(x)=\displaystyle\int f'(x)\,dx$. אל תשכחו את קבוע האינטגרציה $C$.`,
        String.raw`$f(x)=-2\cos 3x+C$. הציבו את הנקודה $\left(\dfrac{\pi}{3},5\right)$ כדי למצוא את $C$.`,
      ],
      check: { kind: 'numeric', answer: 1, verify: "5-integrate('6*sin(3*x)', 0, pi/3)" },
      short: String.raw`$f(x)=-2\cos 3x+C$; מהנקודה: $2+C=5$, כלומר $C=3$, ולכן $f(0)=-2+3=1$.`,
      full: [
        String.raw`$f(x)=\displaystyle\int 6\sin 3x\,dx=-\dfrac63\cos 3x+C=-2\cos 3x+C$.`,
        String.raw`הצבת הנקודה $\left(\dfrac{\pi}{3},5\right)$: $-2\cos\pi+C=5$, כלומר $2+C=5$ ו-$C=3$.`,
        String.raw`$f(x)=-2\cos 3x+3$, ולכן $f(0)=-2\cos 0+3=1$.`,
      ],
    },
  ],
};

const e5: Exercise = {
  id: 'cti-5',
  level: 2,
  topicId: T,
  subtopicIds: ['int-trig', 'int-definite-areas'],
  intro: String.raw`נתונה הפונקציה $f(x)=3\sin x$ בתחום $0\le x\le\dfrac{3\pi}{2}$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [0, 5.3], functions: [{ expr: '3*sin(x)', label: 'f', domain: [0, 1.5 * PI] }], points: [{ x: 1.5 * PI, y: 0, label: '3π/2' }] },
  solutionDiagram: { kind: 'plot', xRange: [0, 5.3], functions: [{ expr: '3*sin(x)', label: 'f', domain: [0, 1.5 * PI] }], shade: [{ between: '3*sin(x)', from: 0, to: PI }, { between: '3*sin(x)', from: PI, to: 1.5 * PI }], labels: [{ at: [1.57, 1.2], text: 'S₁' }, { at: [4.2, -1], text: 'S₂' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מלבד ראשית הצירים, גרף הפונקציה חותך את ציר ה-$x$ בנקודה נוספת בתחום. מצאו את שיעור ה-$x$ שלה. (${ROUND})`,
      hints: [String.raw`פתרו $3\sin x=0$ בתחום הנתון.`, String.raw`$\sin x=0$ כאשר $x=\pi k$, $k$ שלם.`],
      check: { kind: 'numeric', answer: 3.141592654, tol: 0.005, verify: "root('3*sin(x)', 2, 4)" },
      short: String.raw`$\sin x=0$ בתחום כאשר $x=0$ או $x=\pi$, ולכן הנקודה הנוספת היא $(\pi,0)$: $x=\pi\approx 3.14$.`,
      full: [
        String.raw`נקודות חיתוך עם ציר ה-$x$: $3\sin x=0$, כלומר $\sin x=0$ ו-$x=\pi k$.`,
        String.raw`בתחום $0\le x\le\dfrac{3\pi}{2}$ הפתרונות הם $x=0$ ו-$x=\pi$.`,
        String.raw`הנקודה הנוספת היא $(\pi,0)$, כלומר $x=\pi\approx 3.14$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את $\displaystyle\int_0^{3\pi/2}f(x)\,dx$.`,
      hints: [String.raw`פונקציה קדומה של $3\sin x$ היא $-3\cos x$.`, String.raw`$\cos\dfrac{3\pi}{2}=0$ ו-$\cos 0=1$.`],
      check: { kind: 'numeric', answer: 3, verify: "integrate('3*sin(x)', 0, 3*pi/2)" },
      short: String.raw`$\Big[-3\cos x\Big]_0^{3\pi/2}=-3\cos\dfrac{3\pi}{2}+3\cos 0=3$.`,
      full: [
        String.raw`פונקציה קדומה של $3\sin x$ היא $-3\cos x$.`,
        String.raw`$\displaystyle\int_0^{3\pi/2}3\sin x\,dx=\Big[-3\cos x\Big]_0^{3\pi/2}=-3\cos\dfrac{3\pi}{2}+3\cos 0=0+3=3$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את השטח הכולל המוגבל בין גרף הפונקציה, ציר ה-$x$ והישר $x=\dfrac{3\pi}{2}$.`,
      hints: [
        String.raw`בתחום $\pi<x\le\dfrac{3\pi}{2}$ הפונקציה שלילית. האם אינטגרל אחד על כל התחום נותן את השטח?`,
        String.raw`חשבו בנפרד: $S_1=\displaystyle\int_0^{\pi}f(x)\,dx$ ו-$S_2=-\displaystyle\int_{\pi}^{3\pi/2}f(x)\,dx$.`,
      ],
      check: { kind: 'numeric', answer: 9, verify: "integrate('3*sin(x)', 0, pi)-integrate('3*sin(x)', pi, 3*pi/2)" },
      short: String.raw`$S_1=6$ ו-$S_2=3$, ולכן $S=9$ (ולא $3$, כמו האינטגרל שבסעיף ב).`,
      full: [
        String.raw`בתחום $0<x<\pi$ הפונקציה חיובית, ובתחום $\pi<x\le\dfrac{3\pi}{2}$ היא שלילית, ולכן מחשבים כל חלק בנפרד.`,
        String.raw`$S_1=\displaystyle\int_0^{\pi}3\sin x\,dx=\Big[-3\cos x\Big]_0^{\pi}=3+3=6$.`,
        String.raw`$\displaystyle\int_{\pi}^{3\pi/2}3\sin x\,dx=\Big[-3\cos x\Big]_{\pi}^{3\pi/2}=0-3=-3$, ולכן $S_2=3$.`,
        String.raw`$S=S_1+S_2=6+3=9$. שימו לב: האינטגרל מסעיף ב הוא $S_1-S_2=3$, ואינו שווה לשטח.`,
      ],
    },
  ],
};

const e6: Exercise = {
  id: 'cti-6',
  level: 2,
  topicId: T,
  subtopicIds: ['int-trig', 'int-definite-areas'],
  intro: String.raw`נתונות הפונקציות $f(x)=4\sin^2x$ ו-$g(x)=8\sin x\cos x$ בתחום $0\le x\le\dfrac{\pi}{2}$ (ראו שרטוט). לפני חישוב האינטגרל של כל אחת מהן צריך להשתמש בזהות טריגונומטרית.`,
  diagram: { kind: 'plot', xRange: [0, 1.75], functions: [{ expr: '4*sin(x)^2', label: 'f', domain: [0, PI / 2] }, { expr: '8*sin(x)*cos(x)', label: 'g', domain: [0, PI / 2] }], points: [{ x: PI / 2, y: 0, label: 'π/2' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`לאיזה מהביטויים הבאים שווה $4\sin^2x$ לכל $x$?`,
      hints: [String.raw`היעזרו בזהות של $\cos 2x$ שמופיע בה רק $\sin^2x$.`, String.raw`$\cos 2x=1-2\sin^2x$, ולכן $\sin^2x=\dfrac{1-\cos 2x}{2}$.`],
      check: { kind: 'choice', options: [String.raw`$2+2\cos 2x$`, String.raw`$2-2\cos 2x$`, String.raw`$4-4\cos 2x$`, String.raw`$2\sin 2x$`], correct: 1 },
      short: String.raw`$\sin^2x=\dfrac{1-\cos 2x}{2}$, ולכן $4\sin^2x=2-2\cos 2x$.`,
      full: [
        String.raw`$\cos 2x=1-2\sin^2x$, ולכן $2\sin^2x=1-\cos 2x$.`,
        String.raw`כופלים ב-$2$: $4\sin^2x=2-2\cos 2x$.`,
        String.raw`בדיקה ב-$x=\dfrac{\pi}{2}$: $4\sin^2\dfrac{\pi}{2}=4$, וגם $2-2\cos\pi=4$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את $\displaystyle\int_0^{\pi/2}4\sin^2x\,dx$. (${ROUND})`,
      hints: [String.raw`החליפו את האינטגרנד בביטוי מסעיף א.`, String.raw`פונקציה קדומה של $2-2\cos 2x$ היא $2x-\sin 2x$.`],
      check: { kind: 'numeric', answer: 3.141592654, tol: 0.005, verify: "integrate('4*sin(x)^2', 0, pi/2)" },
      short: String.raw`$\Big[2x-\sin 2x\Big]_0^{\pi/2}=\pi-\sin\pi=\pi\approx 3.14$.`,
      full: [
        String.raw`לפי סעיף א: $4\sin^2x=2-2\cos 2x$.`,
        String.raw`$\displaystyle\int(2-2\cos 2x)\,dx=2x-\sin 2x+C$.`,
        String.raw`$\displaystyle\int_0^{\pi/2}4\sin^2x\,dx=\Big[2x-\sin 2x\Big]_0^{\pi/2}=(\pi-\sin\pi)-(0-\sin 0)=\pi\approx 3.14$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את $\displaystyle\int_0^{\pi/2}8\sin x\cos x\,dx$.`,
      hints: [String.raw`$\sin 2x=2\sin x\cos x$.`, String.raw`$8\sin x\cos x=4\sin 2x$, ופונקציה קדומה שלה היא $-2\cos 2x$.`],
      check: { kind: 'numeric', answer: 4, verify: "integrate('8*sin(x)*cos(x)', 0, pi/2)" },
      short: String.raw`$8\sin x\cos x=4\sin 2x$, ולכן $\Big[-2\cos 2x\Big]_0^{\pi/2}=2+2=4$.`,
      full: [
        String.raw`$8\sin x\cos x=4\cdot 2\sin x\cos x=4\sin 2x$.`,
        String.raw`$\displaystyle\int 4\sin 2x\,dx=-2\cos 2x+C$.`,
        String.raw`$\displaystyle\int_0^{\pi/2}4\sin 2x\,dx=\Big[-2\cos 2x\Big]_0^{\pi/2}=-2\cos\pi+2\cos 0=2+2=4$.`,
        String.raw`דרך נוספת: $8\sin x\cos x$ הוא מהצורה $8u\cdot u'$ עם $u=\sin x$, ולכן גם $4\sin^2x$ היא פונקציה קדומה, ומתקבל $4\sin^2\dfrac{\pi}{2}-0=4$.`,
      ],
    },
  ],
};

const e7: Exercise = {
  id: 'cti-7',
  level: 2,
  topicId: T,
  subtopicIds: ['int-trig', 'int-composite', 'int-definite-areas'],
  intro: String.raw`נתונה הפונקציה $f(x)=3\sin^2x\cos x$ בתחום $0\le x\le\pi$ (ראו שרטוט). שימו לב ש-$\cos x$ היא הנגזרת של $\sin x$.`,
  diagram: { kind: 'plot', xRange: [0, 3.5], functions: [{ expr: '3*sin(x)^2*cos(x)', label: 'f', domain: [0, PI] }], points: [{ x: PI, y: 0, label: 'π' }] },
  solutionDiagram: { kind: 'plot', xRange: [0, 3.5], functions: [{ expr: '3*sin(x)^2*cos(x)', label: 'f', domain: [0, PI] }], shade: [{ between: '3*sin(x)^2*cos(x)', from: 0, to: PI / 2 }, { between: '3*sin(x)^2*cos(x)', from: PI / 2, to: PI }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזו מהפונקציות הבאות היא פונקציה קדומה של $f(x)$?`,
      hints: [String.raw`האינטגרנד הוא מהצורה $g'(u)\cdot u'$, כאשר $u=\sin x$ ו-$u'=\cos x$.`, String.raw`$\displaystyle\int 3u^2\cdot u'\,dx=u^3+C$.`],
      check: { kind: 'choice', options: [String.raw`$3\sin^3x$`, String.raw`$\sin^3x$`, String.raw`$-\cos^3x$`, String.raw`$\sin^3x\cos x$`], correct: 1 },
      short: String.raw`עם $u=\sin x$: $\displaystyle\int 3u^2u'\,dx=u^3+C$, כלומר $F(x)=\sin^3x$.`,
      full: [
        String.raw`נסמן $u=\sin x$, ואז $u'=\cos x$ ו-$f(x)=3u^2\cdot u'$.`,
        String.raw`$\displaystyle\int 3u^2\cdot u'\,dx=u^3+C$, ולכן $F(x)=\sin^3x$ היא פונקציה קדומה.`,
        String.raw`בדיקה בגזירה: $(\sin^3x)'=3\sin^2x\cdot\cos x=f(x)$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את $\displaystyle\int_0^{\pi/2}f(x)\,dx$.`,
      hints: [String.raw`השתמשו בפונקציה הקדומה מסעיף א.`, String.raw`$\sin\dfrac{\pi}{2}=1$ ו-$\sin 0=0$.`],
      check: { kind: 'numeric', answer: 1, verify: "integrate('3*sin(x)^2*cos(x)', 0, pi/2)" },
      short: String.raw`$\Big[\sin^3x\Big]_0^{\pi/2}=1-0=1$.`,
      full: [String.raw`לפי סעיף א, $F(x)=\sin^3x$ היא פונקציה קדומה של $f$.`, String.raw`$\displaystyle\int_0^{\pi/2}f(x)\,dx=\sin^3\dfrac{\pi}{2}-\sin^3 0=1-0=1$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את השטח הכולל המוגבל בין גרף הפונקציה לציר ה-$x$ בתחום $0\le x\le\pi$.`,
      hints: [
        String.raw`בדקו את סימן הפונקציה: $3\sin^2x\ge 0$, ולכן הסימן נקבע לפי $\cos x$.`,
        String.raw`הפונקציה חיובית ב-$0<x<\dfrac{\pi}{2}$ ושלילית ב-$\dfrac{\pi}{2}<x<\pi$. חשבו כל חלק בנפרד.`,
      ],
      check: { kind: 'numeric', answer: 2, verify: "integrate('3*sin(x)^2*cos(x)', 0, pi/2)-integrate('3*sin(x)^2*cos(x)', pi/2, pi)" },
      short: String.raw`$S=\displaystyle\int_0^{\pi/2}f\,dx-\int_{\pi/2}^{\pi}f\,dx=1-(-1)=2$.`,
      full: [
        String.raw`$3\sin^2x\ge 0$, ולכן סימן הפונקציה כסימן $\cos x$: חיובית ב-$0<x<\dfrac{\pi}{2}$ ושלילית ב-$\dfrac{\pi}{2}<x<\pi$.`,
        String.raw`$S_1=\displaystyle\int_0^{\pi/2}f(x)\,dx=1$ (סעיף ב).`,
        String.raw`$\displaystyle\int_{\pi/2}^{\pi}f(x)\,dx=\sin^3\pi-\sin^3\dfrac{\pi}{2}=0-1=-1$, ולכן $S_2=1$.`,
        String.raw`$S=S_1+S_2=2$. (האינטגרל על כל התחום הוא $0$, אבל השטח הוא $2$.)`,
      ],
    },
  ],
};

const e8: Exercise = {
  id: 'cti-8',
  level: 2,
  topicId: T,
  subtopicIds: ['int-trig', 'int-definite-areas'],
  intro: String.raw`נתונים הפונקציה $f(x)=2\sin x$ בתחום $0\le x\le\pi$ והישר $y=1$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [0, 3.5], functions: [{ expr: '2*sin(x)', label: 'f', domain: [0, PI] }, { expr: '1', label: 'y=1' }], points: [{ x: PI, y: 0, label: 'π' }] },
  solutionDiagram: { kind: 'plot', xRange: [0, 3.5], functions: [{ expr: '2*sin(x)', label: 'f', domain: [0, PI] }, { expr: '1', label: 'y=1' }], shade: [{ between: ['2*sin(x)', '1'], from: PI / 6, to: (5 * PI) / 6 }, { between: ['1', '2*sin(x)'], from: 0, to: PI / 6 }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הגרף והישר נחתכים בשתי נקודות. מצאו את שיעור ה-$x$ של נקודת החיתוך השמאלית. (${ROUND})`,
      hints: [String.raw`השוו: $2\sin x=1$.`, String.raw`$\sin x=\dfrac12$ בתחום כאשר $x=\dfrac{\pi}{6}$ או $x=\pi-\dfrac{\pi}{6}$.`],
      check: { kind: 'numeric', answer: 0.5235987756, tol: 0.005, verify: "root('2*sin(x)-1', 0, pi/2)" },
      short: String.raw`$\sin x=\dfrac12$, ולכן $x=\dfrac{\pi}{6}\approx 0.52$ (והנקודה הימנית: $x=\dfrac{5\pi}{6}$).`,
      full: [
        String.raw`$2\sin x=1$, כלומר $\sin x=\dfrac12$.`,
        String.raw`בתחום $0\le x\le\pi$: $x=\dfrac{\pi}{6}$ או $x=\pi-\dfrac{\pi}{6}=\dfrac{5\pi}{6}$.`,
        String.raw`הנקודה השמאלית: $x=\dfrac{\pi}{6}\approx 0.52$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את השטח המוגבל בין גרף הפונקציה לישר $y=1$ (השטח שמתחת לגרף ומעל הישר). עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`בין שתי נקודות החיתוך הגרף נמצא מעל הישר, ולכן מחשבים אינטגרל של ההפרש $2\sin x-1$.`,
        String.raw`הגבולות: $\dfrac{\pi}{6}$ ו-$\dfrac{5\pi}{6}$. פונקציה קדומה: $-2\cos x-x$.`,
      ],
      check: { kind: 'numeric', answer: 1.369706513, tol: 0.005, verify: "integrate('2*sin(x)-1', pi/6, 5*pi/6)" },
      short: String.raw`$S=\displaystyle\int_{\pi/6}^{5\pi/6}(2\sin x-1)\,dx=2\sqrt3-\dfrac{2\pi}{3}\approx 1.37$.`,
      full: [
        String.raw`בתחום $\dfrac{\pi}{6}<x<\dfrac{5\pi}{6}$ מתקיים $2\sin x>1$, ולכן $S=\displaystyle\int_{\pi/6}^{5\pi/6}(2\sin x-1)\,dx$.`,
        String.raw`פונקציה קדומה: $-2\cos x-x$.`,
        String.raw`$S=\left(-2\cos\dfrac{5\pi}{6}-\dfrac{5\pi}{6}\right)-\left(-2\cos\dfrac{\pi}{6}-\dfrac{\pi}{6}\right)=\left(\sqrt3-\dfrac{5\pi}{6}\right)-\left(-\sqrt3-\dfrac{\pi}{6}\right)$.`,
        String.raw`$S=2\sqrt3-\dfrac{2\pi}{3}\approx 3.464-2.094=1.37$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את השטח המוגבל בין גרף הפונקציה, הישר $y=1$ וציר ה-$y$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`בתחום $0\le x\le\dfrac{\pi}{6}$ הישר נמצא מעל הגרף.`, String.raw`$S=\displaystyle\int_0^{\pi/6}(1-2\sin x)\,dx$, ופונקציה קדומה היא $x+2\cos x$.`],
      check: { kind: 'numeric', answer: 0.2556495832, tol: 0.005, verify: "integrate('1-2*sin(x)', 0, pi/6)" },
      short: String.raw`$S=\Big[x+2\cos x\Big]_0^{\pi/6}=\dfrac{\pi}{6}+\sqrt3-2\approx 0.26$.`,
      full: [
        String.raw`השטח נמצא בין $x=0$ (ציר ה-$y$) לבין נקודת החיתוך $x=\dfrac{\pi}{6}$, ושם $1\ge 2\sin x$.`,
        String.raw`$S=\displaystyle\int_0^{\pi/6}(1-2\sin x)\,dx=\Big[x+2\cos x\Big]_0^{\pi/6}$.`,
        String.raw`$S=\left(\dfrac{\pi}{6}+2\cdot\dfrac{\sqrt3}{2}\right)-(0+2)=\dfrac{\pi}{6}+\sqrt3-2\approx 0.26$.`,
      ],
    },
  ],
};

const e9: Exercise = {
  id: 'cti-9',
  level: 3,
  topicId: T,
  subtopicIds: ['int-trig', 'int-definite-areas'],
  intro: String.raw`נתונה הפונקציה $f(x)=2\sin x+\sin 2x$ בתחום $0\le x\le\pi$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [0, 3.5], functions: [{ expr: '2*sin(x)+sin(2*x)', domain: [0, PI] }], points: [{ x: PI, y: 0, label: 'π' }], labels: [{ at: [2.1, 1.6], text: 'f' }] },
  solutionDiagram: { kind: 'plot', xRange: [0, 3.5], functions: [{ expr: '2*sin(x)+sin(2*x)', domain: [0, PI] }], shade: [{ between: '2*sin(x)+sin(2*x)', from: 0, to: PI }], points: [{ x: PI / 3, y: 2.598, label: 'max' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את כל נקודות החיתוך של גרף הפונקציה עם ציר ה-$x$ בתחום הנתון.`,
      hints: [String.raw`השתמשו בזהות $\sin 2x=2\sin x\cos x$ והוציאו גורם משותף.`, String.raw`$2\sin x(1+\cos x)=0$: או $\sin x=0$ או $\cos x=-1$.`],
      check: { kind: 'choice', options: [String.raw`$x=0$, $x=\dfrac{\pi}{2}$ ו-$x=\pi$`, String.raw`$x=0$ ו-$x=\pi$ בלבד`, String.raw`$x=0$ ו-$x=\dfrac{2\pi}{3}$`, String.raw`$x=\pi$ בלבד`], correct: 1 },
      short: String.raw`$f(x)=2\sin x(1+\cos x)=0$ כאשר $\sin x=0$ או $\cos x=-1$; בתחום: $x=0$ ו-$x=\pi$ בלבד.`,
      full: [
        String.raw`$f(x)=2\sin x+2\sin x\cos x=2\sin x(1+\cos x)$.`,
        String.raw`$\sin x=0$ בתחום כאשר $x=0$ או $x=\pi$.`,
        String.raw`$\cos x=-1$ בתחום כאשר $x=\pi$, שכבר נמצא.`,
        String.raw`לכן נקודות החיתוך הן $(0,0)$ ו-$(\pi,0)$ בלבד.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את שיעור ה-$x$ של נקודת המקסימום של הפונקציה. (${ROUND})`,
      hints: [
        String.raw`גזרו והשוו לאפס: $f'(x)=2\cos x+2\cos 2x$.`,
        String.raw`הציבו $\cos 2x=2\cos^2x-1$ וקבלו משוואה ריבועית ב-$\cos x$.`,
        String.raw`$2\cos^2x+\cos x-1=0$, כלומר $(2\cos x-1)(\cos x+1)=0$.`,
      ],
      check: { kind: 'numeric', answer: 1.047197551, tol: 0.005, verify: "root('2*cos(x)+2*cos(2*x)', 0.5, 2)" },
      short: String.raw`$f'(x)=2(2\cos x-1)(\cos x+1)=0$; בתוך התחום $\cos x=\dfrac12$, כלומר $x=\dfrac{\pi}{3}\approx 1.05$, והנגזרת עוברת שם מחיובית לשלילית.`,
      full: [
        String.raw`$f'(x)=2\cos x+2\cos 2x$.`,
        String.raw`מציבים $\cos 2x=2\cos^2x-1$: $f'(x)=4\cos^2x+2\cos x-2=2(2\cos x-1)(\cos x+1)$.`,
        String.raw`$f'(x)=0$ כאשר $\cos x=\dfrac12$, כלומר $x=\dfrac{\pi}{3}$, או כאשר $\cos x=-1$, כלומר $x=\pi$ (קצה התחום).`,
        String.raw`בתחום $0<x<\pi$ מתקיים $\cos x+1>0$, ולכן סימן הנגזרת כסימן $2\cos x-1$: חיובית עבור $x<\dfrac{\pi}{3}$ ושלילית עבור $x>\dfrac{\pi}{3}$. לכן $x=\dfrac{\pi}{3}\approx 1.05$ היא נקודת מקסימום.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את ערך הפונקציה בנקודת המקסימום. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`הציבו בפונקציה את ה-$x$ שמצאתם בסעיף ב.`, String.raw`$\sin\dfrac{\pi}{3}=\sin\dfrac{2\pi}{3}=\dfrac{\sqrt3}{2}$.`],
      check: { kind: 'numeric', answer: 2.598076211, tol: 0.005, verify: "2*sin(root('2*cos(x)+2*cos(2*x)', 0.5, 2))+sin(2*root('2*cos(x)+2*cos(2*x)', 0.5, 2))" },
      short: String.raw`$f\left(\dfrac{\pi}{3}\right)=2\cdot\dfrac{\sqrt3}{2}+\dfrac{\sqrt3}{2}=\dfrac{3\sqrt3}{2}\approx 2.60$.`,
      full: [
        String.raw`$f\left(\dfrac{\pi}{3}\right)=2\sin\dfrac{\pi}{3}+\sin\dfrac{2\pi}{3}=2\cdot\dfrac{\sqrt3}{2}+\dfrac{\sqrt3}{2}=\dfrac{3\sqrt3}{2}\approx 2.60$.`,
        String.raw`בקצוות $f(0)=f(\pi)=0$, ולכן זהו גם המקסימום המוחלט בתחום.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את השטח המוגבל בין גרף הפונקציה לציר ה-$x$.`,
      hints: [
        String.raw`לפי סעיף א הגרף חותך את הציר רק בקצות התחום. מה סימן הפונקציה ביניהם?`,
        String.raw`$S=\displaystyle\int_0^{\pi}(2\sin x+\sin 2x)\,dx$, ופונקציה קדומה היא $-2\cos x-\dfrac12\cos 2x$.`,
      ],
      check: { kind: 'numeric', answer: 4, verify: "integrate('2*sin(x)+sin(2*x)', 0, pi)" },
      short: String.raw`$S=\Big[-2\cos x-\dfrac12\cos 2x\Big]_0^{\pi}=\left(2-\dfrac12\right)-\left(-2-\dfrac12\right)=4$.`,
      full: [
        String.raw`$f(x)=2\sin x(1+\cos x)\ge 0$ בתחום $0\le x\le\pi$, ולכן השטח שווה לאינטגרל המסוים.`,
        String.raw`$\displaystyle\int(2\sin x+\sin 2x)\,dx=-2\cos x-\dfrac12\cos 2x+C$.`,
        String.raw`$S=\Big[-2\cos x-\dfrac12\cos 2x\Big]_0^{\pi}=\left(2-\dfrac12\right)-\left(-2-\dfrac12\right)=1.5+2.5=4$.`,
      ],
    },
  ],
};

const e10: Exercise = {
  id: 'cti-10',
  level: 3,
  topicId: T,
  subtopicIds: ['int-trig', 'int-definite-areas'],
  intro: String.raw`נתונה הפונקציה $f(x)=2\cos x$ בתחום $0\le x\le\dfrac{\pi}{2}$. גרף הפונקציה חותך את ציר ה-$x$ בנקודה $A\left(\dfrac{\pi}{2},0\right)$, ובנקודה זו העבירו משיק לגרף. המשיק חותך את ציר ה-$y$ בנקודה $B$, ו-$O$ היא ראשית הצירים (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [0, 1.85], functions: [{ expr: '2*cos(x)', domain: [0, PI / 2] }, { expr: 'pi-2*x', domain: [0, PI / 2], dashed: true }], shade: [{ between: ['pi-2*x', '2*cos(x)'], from: 0, to: PI / 2 }], points: [{ x: PI / 2, y: 0, label: 'A' }, { x: 0, y: PI, label: 'B' }], labels: [{ at: [0.5, 1.4], text: 'f' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את שיפוע המשיק.`,
      hints: [String.raw`שיפוע המשיק שווה לערך הנגזרת בנקודת ההשקה.`, String.raw`$f'(x)=-2\sin x$. הציבו $x=\dfrac{\pi}{2}$.`],
      check: { kind: 'numeric', answer: -2, verify: "deriv('2*cos(x)', pi/2)" },
      short: String.raw`$f'(x)=-2\sin x$, ולכן $m=f'\left(\dfrac{\pi}{2}\right)=-2$.`,
      full: [String.raw`$f'(x)=-2\sin x$.`, String.raw`שיפוע המשיק בנקודה $A$: $m=f'\left(\dfrac{\pi}{2}\right)=-2\sin\dfrac{\pi}{2}=-2$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את שיעור ה-$y$ של הנקודה $B$. (${ROUND})`,
      hints: [String.raw`כתבו את משוואת המשיק: ישר ששיפועו $-2$ ועובר דרך $A\left(\dfrac{\pi}{2},0\right)$.`, String.raw`$y=-2\left(x-\dfrac{\pi}{2}\right)$. הציבו $x=0$.`],
      check: { kind: 'numeric', answer: 3.141592654, tol: 0.005, verify: "-deriv('2*cos(x)', pi/2)*pi/2" },
      short: String.raw`משוואת המשיק: $y=-2x+\pi$, ולכן $B(0,\pi)$, כלומר $y_B=\pi\approx 3.14$.`,
      full: [
        String.raw`משוואת המשיק: $y-0=-2\left(x-\dfrac{\pi}{2}\right)$, כלומר $y=-2x+\pi$.`,
        String.raw`חיתוך עם ציר ה-$y$: $x=0$, ולכן $y=\pi$.`,
        String.raw`$B(0,\pi)$, כלומר $y_B=\pi\approx 3.14$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את השטח המוגבל בין גרף הפונקציה לבין שני הצירים.`,
      hints: [String.raw`בתחום הנתון הפונקציה אי-שלילית, והגבולות הם $0$ ו-$\dfrac{\pi}{2}$.`, String.raw`פונקציה קדומה של $2\cos x$ היא $2\sin x$.`],
      check: { kind: 'numeric', answer: 2, verify: "integrate('2*cos(x)', 0, pi/2)" },
      short: String.raw`$\displaystyle\int_0^{\pi/2}2\cos x\,dx=\Big[2\sin x\Big]_0^{\pi/2}=2$.`,
      full: [String.raw`$2\cos x\ge 0$ בתחום $0\le x\le\dfrac{\pi}{2}$, ולכן השטח הוא $\displaystyle\int_0^{\pi/2}2\cos x\,dx$.`, String.raw`$\Big[2\sin x\Big]_0^{\pi/2}=2\sin\dfrac{\pi}{2}-2\sin 0=2$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את השטח המוגבל בין המשיק, גרף הפונקציה וציר ה-$y$ (השטח המסומן בשרטוט). עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`השטח המבוקש הוא שטח המשולש $OAB$ פחות השטח שמצאתם בסעיף ג.`, String.raw`שטח המשולש: $\dfrac12\cdot OA\cdot OB=\dfrac12\cdot\dfrac{\pi}{2}\cdot\pi$.`],
      check: { kind: 'numeric', answer: 0.4674011003, tol: 0.005, verify: "integrate('pi-2*x-2*cos(x)', 0, pi/2)" },
      short: String.raw`$S=S_{\triangle OAB}-2=\dfrac{\pi^2}{4}-2\approx 0.47$.`,
      full: [
        String.raw`המשיק נמצא מעל הגרף בתחום, ולכן השטח המבוקש הוא ההפרש בין השטח שמתחת למשיק לבין השטח שמתחת לגרף.`,
        String.raw`מתחת למשיק נמצא המשולש ישר הזווית $OAB$: $S_{\triangle}=\dfrac12\cdot\dfrac{\pi}{2}\cdot\pi=\dfrac{\pi^2}{4}$.`,
        String.raw`$S=\dfrac{\pi^2}{4}-2\approx 2.467-2=0.47$.`,
        String.raw`בדיקה באינטגרל: $\displaystyle\int_0^{\pi/2}(\pi-2x-2\cos x)\,dx=\Big[\pi x-x^2-2\sin x\Big]_0^{\pi/2}=\dfrac{\pi^2}{2}-\dfrac{\pi^2}{4}-2=\dfrac{\pi^2}{4}-2$.`,
      ],
    },
  ],
};

const e11: Exercise = {
  id: 'cti-11',
  level: 3,
  topicId: T,
  subtopicIds: ['int-trig', 'int-antiderivative-point', 'int-definite-areas'],
  intro: String.raw`נגזרת הפונקציה $f(x)$ היא $f'(x)=4\sin 2x$, והפונקציה מוגדרת בתחום $0\le x\le\dfrac{\pi}{2}$ (בשרטוט מופיע גרף הנגזרת). גרף הפונקציה $f(x)$ עובר דרך הנקודה $\left(\dfrac{\pi}{4},\,1\right)$.`,
  diagram: { kind: 'plot', xRange: [0, 1.75], functions: [{ expr: '4*sin(2*x)', label: "f'", domain: [0, PI / 2] }], points: [{ x: PI / 2, y: 0, label: 'π/2' }] },
  solutionDiagram: { kind: 'plot', xRange: [0, 1.75], functions: [{ expr: '1-2*cos(2*x)', label: 'f', domain: [0, PI / 2] }], shade: [{ between: '1-2*cos(2*x)', from: 0, to: PI / 6 }, { between: '1-2*cos(2*x)', from: PI / 6, to: PI / 2 }], points: [{ x: PI / 6, y: 0, label: 'π/6' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את הפונקציה $f(x)$.`,
      hints: [String.raw`$f(x)=\displaystyle\int f'(x)\,dx$, עם קבוע אינטגרציה $C$ שמוצאים מהנקודה הנתונה.`, String.raw`$f(x)=-2\cos 2x+C$. הציבו $x=\dfrac{\pi}{4}$, $y=1$.`],
      check: { kind: 'choice', options: [String.raw`$f(x)=-2\cos 2x$`, String.raw`$f(x)=1+2\cos 2x$`, String.raw`$f(x)=1-2\cos 2x$`, String.raw`$f(x)=1-8\cos 2x$`], correct: 2 },
      short: String.raw`$f(x)=-2\cos 2x+C$, ומהנקודה: $-2\cos\dfrac{\pi}{2}+C=1$, כלומר $C=1$ ו-$f(x)=1-2\cos 2x$.`,
      full: [
        String.raw`$f(x)=\displaystyle\int 4\sin 2x\,dx=-\dfrac42\cos 2x+C=-2\cos 2x+C$.`,
        String.raw`הצבת הנקודה $\left(\dfrac{\pi}{4},1\right)$: $-2\cos\dfrac{\pi}{2}+C=1$, כלומר $0+C=1$.`,
        String.raw`$f(x)=1-2\cos 2x$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את שיעור ה-$x$ של נקודת החיתוך של גרף $f(x)$ עם ציר ה-$x$. (${ROUND})`,
      hints: [String.raw`פתרו $f(x)=0$ בתחום הנתון.`, String.raw`$\cos 2x=\dfrac12$, כאשר $0\le 2x\le\pi$.`],
      check: { kind: 'numeric', answer: 0.5235987756, tol: 0.005, verify: "root('1-2*cos(2*x)', 0, pi/2)" },
      short: String.raw`$\cos 2x=\dfrac12$, ולכן $2x=\dfrac{\pi}{3}$ ו-$x=\dfrac{\pi}{6}\approx 0.52$.`,
      full: [
        String.raw`$1-2\cos 2x=0$, כלומר $\cos 2x=\dfrac12$.`,
        String.raw`בתחום $0\le x\le\dfrac{\pi}{2}$ מתקיים $0\le 2x\le\pi$, ושם הפתרון היחיד הוא $2x=\dfrac{\pi}{3}$.`,
        String.raw`$x=\dfrac{\pi}{6}\approx 0.52$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את השטח המוגבל בין גרף $f(x)$, ציר ה-$x$ וציר ה-$y$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`בדקו את סימן הפונקציה בתחום $0\le x<\dfrac{\pi}{6}$, למשל לפי $f(0)$.`,
        String.raw`הפונקציה שלילית שם, ולכן $S_1=-\displaystyle\int_0^{\pi/6}(1-2\cos 2x)\,dx$. פונקציה קדומה: $x-\sin 2x$.`,
      ],
      check: { kind: 'numeric', answer: 0.3424266282, tol: 0.005, verify: "-integrate('1-2*cos(2*x)', 0, pi/6)" },
      short: String.raw`$S_1=-\Big[x-\sin 2x\Big]_0^{\pi/6}=\dfrac{\sqrt3}{2}-\dfrac{\pi}{6}\approx 0.34$.`,
      full: [
        String.raw`$f(0)=1-2=-1<0$, ולכן בתחום $0\le x<\dfrac{\pi}{6}$ הגרף מתחת לציר ה-$x$.`,
        String.raw`$\displaystyle\int_0^{\pi/6}(1-2\cos 2x)\,dx=\Big[x-\sin 2x\Big]_0^{\pi/6}=\dfrac{\pi}{6}-\sin\dfrac{\pi}{3}=\dfrac{\pi}{6}-\dfrac{\sqrt3}{2}$.`,
        String.raw`האינטגרל שלילי, והשטח הוא הערך הנגדי: $S_1=\dfrac{\sqrt3}{2}-\dfrac{\pi}{6}\approx 0.866-0.524=0.34$.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את השטח הכולל המוגבל בין גרף $f(x)$, ציר ה-$x$, ציר ה-$y$ והישר $x=\dfrac{\pi}{2}$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`השטח מורכב משני חלקים: מתחת לציר (סעיף ג) ומעל הציר, בתחום $\dfrac{\pi}{6}\le x\le\dfrac{\pi}{2}$.`,
        String.raw`$S_2=\displaystyle\int_{\pi/6}^{\pi/2}(1-2\cos 2x)\,dx=\Big[x-\sin 2x\Big]_{\pi/6}^{\pi/2}$.`,
      ],
      check: { kind: 'numeric', answer: 2.255649583, tol: 0.005, verify: "-integrate('1-2*cos(2*x)', 0, pi/6)+integrate('1-2*cos(2*x)', pi/6, pi/2)" },
      short: String.raw`$S_2=\dfrac{\pi}{3}+\dfrac{\sqrt3}{2}\approx 1.91$, ולכן $S=S_1+S_2=\sqrt3+\dfrac{\pi}{6}\approx 2.26$.`,
      full: [
        String.raw`בתחום $\dfrac{\pi}{6}<x\le\dfrac{\pi}{2}$ הפונקציה חיובית (למשל $f\left(\dfrac{\pi}{2}\right)=3$).`,
        String.raw`$S_2=\Big[x-\sin 2x\Big]_{\pi/6}^{\pi/2}=\left(\dfrac{\pi}{2}-0\right)-\left(\dfrac{\pi}{6}-\dfrac{\sqrt3}{2}\right)=\dfrac{\pi}{3}+\dfrac{\sqrt3}{2}\approx 1.91$.`,
        String.raw`$S=S_1+S_2=\left(\dfrac{\sqrt3}{2}-\dfrac{\pi}{6}\right)+\left(\dfrac{\pi}{3}+\dfrac{\sqrt3}{2}\right)=\sqrt3+\dfrac{\pi}{6}\approx 2.26$.`,
      ],
    },
  ],
};

const e12: Exercise = {
  id: 'cti-12',
  level: 3,
  topicId: T,
  subtopicIds: ['int-trig', 'int-definite-areas'],
  intro: String.raw`נתונות הפונקציות $f(x)=2\cos^2x$ ו-$g(x)=\sin 2x$ בתחום $0\le x\le\dfrac{\pi}{2}$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [0, 1.75], functions: [{ expr: '2*cos(x)^2', domain: [0, PI / 2] }, { expr: 'sin(2*x)', domain: [0, PI / 2] }], points: [{ x: PI / 2, y: 0, label: 'π/2' }], labels: [{ at: [0.32, 2.1], text: 'f' }, { at: [1.2, 0.95], text: 'g' }] },
  solutionDiagram: { kind: 'plot', xRange: [0, 1.75], functions: [{ expr: '2*cos(x)^2', domain: [0, PI / 2] }, { expr: 'sin(2*x)', domain: [0, PI / 2] }], shade: [{ between: ['2*cos(x)^2', 'sin(2*x)'], from: 0, to: PI / 4 }, { between: ['sin(2*x)', '2*cos(x)^2'], from: PI / 4, to: PI / 2 }], points: [{ x: PI / 4, y: 1, label: 'π/4' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את שיעורי ה-$x$ של נקודות החיתוך של שני הגרפים בתחום.`,
      hints: [String.raw`השוו $2\cos^2x=\sin 2x$ והשתמשו ב-$\sin 2x=2\sin x\cos x$.`, String.raw`אל תחלקו ב-$\cos x$. הוציאו גורם משותף: $2\cos x(\cos x-\sin x)=0$.`],
      check: { kind: 'choice', options: [String.raw`$x=\dfrac{\pi}{4}$ בלבד`, String.raw`$x=0$ ו-$x=\dfrac{\pi}{4}$`, String.raw`$x=\dfrac{\pi}{4}$ ו-$x=\dfrac{\pi}{2}$`, String.raw`$x=\dfrac{\pi}{6}$ ו-$x=\dfrac{\pi}{2}$`], correct: 2 },
      short: String.raw`$2\cos x(\cos x-\sin x)=0$: $\cos x=0$ נותן $x=\dfrac{\pi}{2}$, ו-$\tan x=1$ נותן $x=\dfrac{\pi}{4}$.`,
      full: [
        String.raw`$2\cos^2x=2\sin x\cos x$, כלומר $2\cos x(\cos x-\sin x)=0$.`,
        String.raw`$\cos x=0$ בתחום כאשר $x=\dfrac{\pi}{2}$.`,
        String.raw`$\cos x=\sin x$, כלומר $\tan x=1$, בתחום כאשר $x=\dfrac{\pi}{4}$.`,
        String.raw`נקודות החיתוך: $x=\dfrac{\pi}{4}$ ו-$x=\dfrac{\pi}{2}$. (מי שמחלק ב-$\cos x$ מאבד את הפתרון $x=\dfrac{\pi}{2}$.)`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את $\displaystyle\int_0^{\pi/4}2\cos^2x\,dx$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`אי אפשר לחשב ישירות אינטגרל של $\cos^2x$. היעזרו בזהות של $\cos 2x$.`, String.raw`$\cos 2x=2\cos^2x-1$, ולכן $2\cos^2x=1+\cos 2x$, ופונקציה קדומה היא $x+\dfrac12\sin 2x$.`],
      check: { kind: 'numeric', answer: 1.285398163, tol: 0.005, verify: "integrate('2*cos(x)^2', 0, pi/4)" },
      short: String.raw`$2\cos^2x=1+\cos 2x$, ולכן $\Big[x+\dfrac12\sin 2x\Big]_0^{\pi/4}=\dfrac{\pi}{4}+\dfrac12\approx 1.29$.`,
      full: [
        String.raw`$\cos 2x=2\cos^2x-1$, ולכן $2\cos^2x=1+\cos 2x$.`,
        String.raw`$\displaystyle\int(1+\cos 2x)\,dx=x+\dfrac12\sin 2x+C$.`,
        String.raw`$\displaystyle\int_0^{\pi/4}2\cos^2x\,dx=\left(\dfrac{\pi}{4}+\dfrac12\sin\dfrac{\pi}{2}\right)-0=\dfrac{\pi}{4}+\dfrac12\approx 1.29$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את השטח המוגבל בין שני הגרפים וציר ה-$y$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`השטח נמצא בין $x=0$ לנקודת החיתוך הראשונה. איזה גרף עליון שם? בדקו ב-$x=0$.`, String.raw`$S=\displaystyle\int_0^{\pi/4}\left(2\cos^2x-\sin 2x\right)dx$; את החלק הראשון חישבתם בסעיף ב.`],
      check: { kind: 'numeric', answer: 0.7853981634, tol: 0.005, verify: "integrate('2*cos(x)^2-sin(2*x)', 0, pi/4)" },
      short: String.raw`$S=\left(\dfrac{\pi}{4}+\dfrac12\right)-\dfrac12=\dfrac{\pi}{4}\approx 0.79$.`,
      full: [
        String.raw`ב-$x=0$: $f(0)=2$ ו-$g(0)=0$, ולכן בתחום $0\le x<\dfrac{\pi}{4}$ הגרף של $f$ עליון.`,
        String.raw`$\displaystyle\int_0^{\pi/4}\sin 2x\,dx=\Big[-\dfrac12\cos 2x\Big]_0^{\pi/4}=0+\dfrac12=\dfrac12$.`,
        String.raw`$S=\displaystyle\int_0^{\pi/4}2\cos^2x\,dx-\int_0^{\pi/4}\sin 2x\,dx=\left(\dfrac{\pi}{4}+\dfrac12\right)-\dfrac12=\dfrac{\pi}{4}\approx 0.79$.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את השטח המוגבל בין שני הגרפים, בין שתי נקודות החיתוך שלהם. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`בתחום $\dfrac{\pi}{4}<x<\dfrac{\pi}{2}$ הגרף של $g$ עליון (בדקו למשל ב-$x=\dfrac{\pi}{3}$).`, String.raw`$S=\displaystyle\int_{\pi/4}^{\pi/2}\left(\sin 2x-1-\cos 2x\right)dx$, ופונקציה קדומה היא $-\dfrac12\cos 2x-x-\dfrac12\sin 2x$.`],
      check: { kind: 'numeric', answer: 0.2146018366, tol: 0.005, verify: "integrate('sin(2*x)-2*cos(x)^2', pi/4, pi/2)" },
      short: String.raw`$S=\Big[-\dfrac12\cos 2x-x-\dfrac12\sin 2x\Big]_{\pi/4}^{\pi/2}=1-\dfrac{\pi}{4}\approx 0.21$.`,
      full: [
        String.raw`ב-$x=\dfrac{\pi}{3}$: $f=2\cdot\dfrac14=0.5$ ו-$g=\sin\dfrac{2\pi}{3}\approx 0.87$, ולכן בין נקודות החיתוך הגרף של $g$ עליון.`,
        String.raw`$S=\displaystyle\int_{\pi/4}^{\pi/2}\left(\sin 2x-(1+\cos 2x)\right)dx=\Big[-\dfrac12\cos 2x-x-\dfrac12\sin 2x\Big]_{\pi/4}^{\pi/2}$.`,
        String.raw`בגבול העליון: $\dfrac12-\dfrac{\pi}{2}-0$. בגבול התחתון: $0-\dfrac{\pi}{4}-\dfrac12$.`,
        String.raw`$S=\left(\dfrac12-\dfrac{\pi}{2}\right)-\left(-\dfrac{\pi}{4}-\dfrac12\right)=1-\dfrac{\pi}{4}\approx 0.21$.`,
      ],
    },
  ],
};

export const calcTrigIntegrals: ExerciseSet = {
  id: 'calc-trig-integrals',
  questionnaire: '35581',
  title: 'אינטגרלים ושטחים של פונקציות טריגונומטריות',
  topicIds: ['integral-calculus'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
