import type { Exercise, ExerciseSet } from './types';

/**
 * סט: חדו"א של פונקציות מעריכיות ולוגריתמיות בבסיס שונה מ-e (שאלון 35582, שאלות 4–5).
 * 1–4 צעד אחד · 5–8 שלושה סעיפים · 9–12 שאלות בסגנון בגרות.
 * ב-verify: log(x) הוא ln, ו-log(x, 2) הוא לוגריתם בבסיס 2.
 */

const T = 'differential-integral';

const e1: Exercise = {
  id: 'cob-1',
  level: 1,
  topicId: T,
  subtopicIds: ['calc-other-bases'],
  intro: String.raw`נתונה הפונקציה $f(x)=3^x$. הנקודה $A(2,9)$ נמצאת על גרף הפונקציה (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-2, 2.6], yRange: [-1, 17], functions: [{ expr: '3^x', label: 'f' }], points: [{ x: 2, y: 9, label: 'A' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את שיפוע המשיק לגרף הפונקציה בנקודה $A$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`שיפוע המשיק בנקודה הוא ערך הנגזרת בה. מהי הנגזרת של $a^x$?`, String.raw`$(a^x)'=a^x\ln a$, ולכן $f'(x)=3^x\ln3$.`],
      check: { kind: 'numeric', answer: 9.887510598, tol: 0.01, verify: 'deriv("3^x", 2)' },
      short: String.raw`$f'(x)=3^x\ln3$, ולכן $f'(2)=9\ln3\approx9.89$.`,
      full: [
        String.raw`כותבים בבסיס $e$: $3^x=e^{x\ln3}$, ולכן $(3^x)'=e^{x\ln3}\cdot\ln3=3^x\ln3$.`,
        String.raw`$f'(2)=3^2\cdot\ln3=9\ln3$.`,
        String.raw`$9\ln3\approx9\cdot1.0986\approx9.89$.`,
      ],
    },
  ],
};

const e2: Exercise = {
  id: 'cob-2',
  level: 1,
  topicId: T,
  subtopicIds: ['calc-other-bases', 'calc-derivatives'],
  intro: String.raw`נתונה הפונקציה $f(x)=2^{3x+1}$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-2, 1], yRange: [-1, 17], functions: [{ expr: '2^(3*x+1)', label: 'f' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזה מהביטויים הבאים הוא $f'(x)$?`,
      hints: [String.raw`כתבו את הפונקציה בבסיס $e$: $2^{3x+1}=e^{(3x+1)\ln2}$, וגזרו כפונקציה מורכבת.`, String.raw`$\left(a^{u(x)}\right)'=a^{u(x)}\cdot\ln a\cdot u'(x)$.`],
      check: { kind: 'choice', options: [String.raw`$2^{3x+1}\cdot\ln2$`, String.raw`$3\ln2\cdot2^{3x+1}$`, String.raw`$(3x+1)\cdot2^{3x}$`, String.raw`$3\cdot2^{3x+1}$`], correct: 1 },
      short: String.raw`$f'(x)=2^{3x+1}\cdot\ln2\cdot(3x+1)'=3\ln2\cdot2^{3x+1}$.`,
      full: [
        String.raw`בבסיס $e$: $2^{3x+1}=e^{(3x+1)\ln2}$.`,
        String.raw`נגזרת של $e^{u}$ היא $e^{u}\cdot u'$, וכאן $u=(3x+1)\ln2$ ו-$u'=3\ln2$.`,
        String.raw`$f'(x)=e^{(3x+1)\ln2}\cdot3\ln2=3\ln2\cdot2^{3x+1}$.`,
        String.raw`הטעויות שבהצעות האחרות: שכחת הנגזרת הפנימית $3$; שימוש בכלל של $x^n$ (המשתנה כאן במעריך, לא בבסיס); שכחת $\ln2$.`,
      ],
    },
  ],
};

const e3: Exercise = {
  id: 'cob-3',
  level: 1,
  topicId: T,
  subtopicIds: ['calc-other-bases'],
  intro: String.raw`נתונה הפונקציה $f(x)=\log_2x$, המוגדרת עבור $x>0$. הנקודה $A(4,2)$ נמצאת על גרף הפונקציה (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-0.5, 8], yRange: [-4.5, 3.5], functions: [{ expr: 'log(x, 2)', domain: [0.05, 8], label: 'f' }], points: [{ x: 4, y: 2, label: 'A' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את שיפוע המשיק לגרף הפונקציה בנקודה $A$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`עברו לבסיס $e$: $\log_2x=\dfrac{\ln x}{\ln2}$, כאשר $\dfrac{1}{\ln2}$ הוא מספר קבוע.`, String.raw`$(\log_ax)'=\dfrac{1}{x\ln a}$.`],
      check: { kind: 'numeric', answer: 0.3606737602, tol: 0.01, verify: 'deriv("log(x, 2)", 4)' },
      short: String.raw`$f'(x)=\dfrac{1}{x\ln2}$, ולכן $f'(4)=\dfrac{1}{4\ln2}\approx0.36$.`,
      full: [
        String.raw`מעבר בסיס: $\log_2x=\dfrac{\ln x}{\ln2}$.`,
        String.raw`$\dfrac{1}{\ln2}$ קבוע, ולכן $f'(x)=\dfrac{1}{\ln2}\cdot\dfrac1x=\dfrac{1}{x\ln2}$.`,
        String.raw`$f'(4)=\dfrac{1}{4\ln2}\approx\dfrac{1}{4\cdot0.6931}\approx0.36$.`,
      ],
    },
  ],
};

const e4: Exercise = {
  id: 'cob-4',
  level: 1,
  topicId: T,
  subtopicIds: ['calc-other-base-integrals', 'calc-area'],
  intro: String.raw`נתונה הפונקציה $f(x)=3^x$. בשרטוט מסומן השטח המוגבל בין גרף הפונקציה, ציר $x$, ציר $y$ והישר $x=2$.`,
  diagram: { kind: 'plot', xRange: [-1.5, 2.5], yRange: [-1, 12], functions: [{ expr: '3^x', label: 'f' }], shade: [{ between: '3^x', from: 0, to: 2 }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את השטח המסומן. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`הפונקציה חיובית, ולכן השטח הוא $\displaystyle\int_0^2 3^x\,dx$. מהי פונקציה קדומה של $a^x$?`, String.raw`$\displaystyle\int a^x\,dx=\dfrac{a^x}{\ln a}+C$.`],
      check: { kind: 'numeric', answer: 7.281913813, tol: 0.01, verify: 'integrate("3^x", 0, 2)' },
      short: String.raw`$S=\left[\dfrac{3^x}{\ln3}\right]_0^2=\dfrac{9-1}{\ln3}=\dfrac{8}{\ln3}\approx7.28$.`,
      full: [
        String.raw`$3^x>0$ לכל $x$, ולכן $S=\displaystyle\int_0^2 3^x\,dx$.`,
        String.raw`פונקציה קדומה: $\dfrac{3^x}{\ln3}$, כי $\left(\dfrac{3^x}{\ln3}\right)'=\dfrac{3^x\ln3}{\ln3}=3^x$.`,
        String.raw`$S=\dfrac{3^2}{\ln3}-\dfrac{3^0}{\ln3}=\dfrac{8}{\ln3}\approx\dfrac{8}{1.0986}\approx7.28$.`,
      ],
    },
  ],
};

const e5: Exercise = {
  id: 'cob-5',
  level: 2,
  topicId: T,
  subtopicIds: ['calc-other-bases', 'calc-second-derivative'],
  intro: String.raw`נתונה הפונקציה $f(x)=2^x$. בנקודה $A(1,2)$ שעל גרף הפונקציה מעבירים משיק לגרף (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-3, 3], yRange: [-1, 8.5], functions: [{ expr: '2^x', label: 'f' }], points: [{ x: 1, y: 2, label: 'A' }] },
  solutionDiagram: { kind: 'plot', xRange: [-3, 3], yRange: [-1, 8.5], functions: [{ expr: '2^x', label: 'f' }, { expr: '2*log(2)*(x-1)+2', dashed: true }], points: [{ x: 1, y: 2, label: 'A' }, { x: 0, y: 0.6137, label: 'B' }, { x: -0.4427, y: 0, label: 'C' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את שיפוע המשיק. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`גזרו את $2^x$ והציבו את שיעור ה-$x$ של $A$.`, String.raw`$f'(x)=2^x\ln2$.`],
      check: { kind: 'numeric', answer: 1.386294361, tol: 0.01, verify: 'deriv("2^x", 1)' },
      short: String.raw`$f'(x)=2^x\ln2$, ולכן $m=f'(1)=2\ln2\approx1.39$.`,
      full: [String.raw`$f'(x)=2^x\ln2$.`, String.raw`$m=f'(1)=2\ln2\approx2\cdot0.6931\approx1.39$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`המשיק חותך את ציר $y$ בנקודה $B$. מצאו את שיעור ה-$y$ של $B$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`כתבו את משוואת המשיק: $y-2=m(x-1)$.`, String.raw`הציבו $x=0$: $y=2-m$.`],
      check: { kind: 'numeric', answer: 0.6137056389, tol: 0.01, verify: '2^1-deriv("2^x", 1)*1' },
      short: String.raw`משוואת המשיק: $y=2\ln2\,(x-1)+2$; ב-$x=0$: $y=2-2\ln2\approx0.61$.`,
      full: [String.raw`משיק דרך $A(1,2)$ בשיפוע $2\ln2$: $y-2=2\ln2\,(x-1)$.`, String.raw`ב-$x=0$: $y=2-2\ln2\approx2-1.386\approx0.61$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`המשיק חותך את ציר $x$ בנקודה $C$. מצאו את שיעור ה-$x$ של $C$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`הציבו $y=0$ במשוואת המשיק.`, String.raw`$-2=2\ln2\,(x-1)$, ולכן $x-1=-\dfrac{1}{\ln2}$.`],
      check: { kind: 'numeric', answer: -0.4426950409, tol: 0.01, verify: '1-2^1/deriv("2^x", 1)' },
      short: String.raw`$0-2=2\ln2\,(x-1)\ \Rightarrow\ x=1-\dfrac{1}{\ln2}\approx-0.44$.`,
      full: [String.raw`מציבים $y=0$: $-2=2\ln2\,(x-1)$.`, String.raw`$x-1=-\dfrac{2}{2\ln2}=-\dfrac{1}{\ln2}\approx-1.4427$.`, String.raw`$x\approx-0.44$.`],
    },
  ],
};

const e6: Exercise = {
  id: 'cob-6',
  level: 2,
  topicId: T,
  subtopicIds: ['calc-other-bases', 'calc-derivatives', 'calc-investigation'],
  intro: String.raw`נתונה הפונקציה $f(x)=\log_2(x^2+4)$, המוגדרת לכל $x$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-4, 4], yRange: [-0.5, 5], functions: [{ expr: 'log(x^2+4, 2)', label: 'f' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $f'(2)$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`עברו לבסיס $e$: $\log_2(x^2+4)=\dfrac{\ln(x^2+4)}{\ln2}$.`, String.raw`$\left(\log_au(x)\right)'=\dfrac{u'(x)}{u(x)\cdot\ln a}$, וכאן $u(x)=x^2+4$.`],
      check: { kind: 'numeric', answer: 0.7213475204, tol: 0.01, verify: 'deriv("log(x^2+4, 2)", 2)' },
      short: String.raw`$f'(x)=\dfrac{2x}{(x^2+4)\ln2}$, ולכן $f'(2)=\dfrac{4}{8\ln2}=\dfrac{1}{2\ln2}\approx0.72$.`,
      full: [
        String.raw`$f(x)=\dfrac{\ln(x^2+4)}{\ln2}$.`,
        String.raw`$\left(\ln(x^2+4)\right)'=\dfrac{2x}{x^2+4}$, ולכן $f'(x)=\dfrac{2x}{(x^2+4)\ln2}$.`,
        String.raw`$f'(2)=\dfrac{4}{8\ln2}=\dfrac{1}{2\ln2}\approx0.72$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את שיעור ה-$x$ של נקודת הקיצון של הפונקציה.`,
      hints: [String.raw`השוו את הנגזרת לאפס. שבר מתאפס כשהמונה מתאפס.`, String.raw`המכנה $(x^2+4)\ln2$ חיובי תמיד, ולכן נותר $2x=0$.`],
      check: { kind: 'numeric', answer: 0, verify: 'root("2*x/((x^2+4)*log(2))", -1, 2)' },
      short: String.raw`$f'(x)=0\iff 2x=0$, כלומר $x=0$; הנגזרת עוברת משלילית לחיובית, ולכן זו נקודת מינימום.`,
      full: [
        String.raw`$f'(x)=\dfrac{2x}{(x^2+4)\ln2}=0$ רק כאשר $2x=0$, כלומר $x=0$.`,
        String.raw`המכנה חיובי לכל $x$, ולכן סימן הנגזרת כסימן $x$: שלילית עבור $x<0$ וחיובית עבור $x>0$.`,
        String.raw`הפונקציה יורדת עבור $x<0$ ועולה עבור $x>0$, ולכן ב-$x=0$ יש מינימום.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את הערך המינימלי של הפונקציה.`,
      hints: [String.raw`הציבו את שיעור ה-$x$ של נקודת המינימום בפונקציה עצמה (לא בנגזרת).`, String.raw`$f(0)=\log_24$.`],
      check: { kind: 'numeric', answer: 2, verify: 'log(root("2*x/((x^2+4)*log(2))", -1, 2)^2+4, 2)' },
      short: String.raw`$f(0)=\log_24=2$.`,
      full: [String.raw`$f(0)=\log_2(0^2+4)=\log_24$.`, String.raw`$2^2=4$, ולכן $\log_24=2$. נקודת המינימום היא $(0,2)$.`],
    },
  ],
};

const e7: Exercise = {
  id: 'cob-7',
  level: 2,
  topicId: T,
  subtopicIds: ['calc-other-bases', 'calc-investigation', 'calc-second-derivative'],
  intro: String.raw`נתונה הפונקציה $f(x)=3^x-3x\ln3$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-1.5, 2.5], yRange: [-1.5, 8], functions: [{ expr: '3^x-3*x*log(3)', label: 'f' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את שיעור ה-$x$ של נקודת הקיצון של הפונקציה.`,
      hints: [String.raw`גזרו: $(3^x)'=3^x\ln3$, ו-$3\ln3$ הוא מקדם קבוע של $x$.`, String.raw`$f'(x)=3^x\ln3-3\ln3=\ln3\,(3^x-3)$. מתי הביטוי מתאפס?`],
      check: { kind: 'numeric', answer: 1, verify: 'root("3^x*log(3)-3*log(3)", 0, 3)' },
      short: String.raw`$f'(x)=\ln3\,(3^x-3)=0\iff3^x=3$, כלומר $x=1$ (מינימום).`,
      full: [
        String.raw`$f'(x)=3^x\ln3-3\ln3=\ln3\,(3^x-3)$.`,
        String.raw`$\ln3>0$, ולכן $f'(x)=0$ כאשר $3^x=3$, כלומר $x=1$.`,
        String.raw`עבור $x<1$: $3^x<3$ והנגזרת שלילית; עבור $x>1$ היא חיובית. לכן ב-$x=1$ יש מינימום.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את שיעור ה-$y$ של נקודת הקיצון. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`הציבו $x=1$ בפונקציה $f$.`],
      check: { kind: 'numeric', answer: -0.295836866, tol: 0.01, verify: '3^root("3^x*log(3)-3*log(3)", 0, 3)-3*root("3^x*log(3)-3*log(3)", 0, 3)*log(3)' },
      short: String.raw`$f(1)=3-3\ln3\approx-0.30$.`,
      full: [String.raw`$f(1)=3^1-3\cdot1\cdot\ln3=3-3\ln3$.`, String.raw`$3-3\cdot1.0986\approx-0.30$. נקודת המינימום: $(1,\,-0.30)$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את שיפוע המשיק לגרף הפונקציה בנקודת החיתוך של הגרף עם ציר $y$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`בנקודת החיתוך עם ציר $y$ מתקיים $x=0$.`, String.raw`$f'(0)=\ln3\,(3^0-3)$.`],
      check: { kind: 'numeric', answer: -2.197224577, tol: 0.01, verify: 'deriv("3^x-3*x*log(3)", 0)' },
      short: String.raw`$f'(0)=\ln3\,(1-3)=-2\ln3\approx-2.20$.`,
      full: [String.raw`נקודת החיתוך עם ציר $y$: $x=0$, $f(0)=1$.`, String.raw`$f'(0)=\ln3\,(3^0-3)=-2\ln3\approx-2.20$.`],
    },
  ],
};

const e8: Exercise = {
  id: 'cob-8',
  level: 2,
  topicId: T,
  subtopicIds: ['calc-other-base-integrals', 'calc-area'],
  intro: String.raw`נתונה הפונקציה $f(x)=3^{2x-1}$. הישר $y=3$ חותך את גרף הפונקציה בנקודה $A(1,3)$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-1, 1.3], yRange: [-0.5, 6.5], functions: [{ expr: '3^(2*x-1)', label: 'f' }, { expr: '3', dashed: true }], points: [{ x: 1, y: 3, label: 'A' }] },
  solutionDiagram: { kind: 'plot', xRange: [-1, 1.3], yRange: [-0.5, 6.5], functions: [{ expr: '3^(2*x-1)', label: 'f' }, { expr: '3', dashed: true }], shade: [{ between: '3^(2*x-1)', from: 0, to: 1 }, { between: ['3', '3^(2*x-1)'], from: 0, to: 1 }], points: [{ x: 1, y: 3, label: 'A' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזה מהביטויים הבאים הוא פונקציה קדומה של $f(x)$?`,
      hints: [String.raw`בדקו כל הצעה על ידי גזירה: הנגזרת של פונקציה קדומה חייבת להיות $3^{2x-1}$.`, String.raw`$\left(3^{2x-1}\right)'=3^{2x-1}\cdot\ln3\cdot2$, ולכן צריך לחלק ב-$2\ln3$.`],
      check: { kind: 'choice', options: [String.raw`$\dfrac{3^{2x-1}}{\ln3}$`, String.raw`$\dfrac{3^{2x-1}}{2\ln3}$`, String.raw`$2\ln3\cdot3^{2x-1}$`, String.raw`$\dfrac{3^{2x}}{2x}$`], correct: 1 },
      short: String.raw`$\displaystyle\int a^{mx+n}\,dx=\dfrac{a^{mx+n}}{m\ln a}+C$, ולכן $F(x)=\dfrac{3^{2x-1}}{2\ln3}$.`,
      full: [
        String.raw`$\left(3^{2x-1}\right)'=3^{2x-1}\cdot\ln3\cdot2$ (נגזרת פנימית $2$).`,
        String.raw`לכן $\left(\dfrac{3^{2x-1}}{2\ln3}\right)'=3^{2x-1}$, וזו פונקציה קדומה.`,
        String.raw`באופן כללי: $\displaystyle\int a^{mx+n}\,dx=\dfrac{a^{mx+n}}{m\ln a}+C$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את השטח המוגבל בין גרף הפונקציה, ציר $x$, ציר $y$ והישר $x=1$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`הפונקציה חיובית, ולכן $S=\displaystyle\int_0^1 3^{2x-1}\,dx$.`, String.raw`$S=\left[\dfrac{3^{2x-1}}{2\ln3}\right]_0^1$; שימו לב ש-$3^{-1}=\dfrac13$.`],
      check: { kind: 'numeric', answer: 1.213652302, tol: 0.01, verify: 'integrate("3^(2*x-1)", 0, 1)' },
      short: String.raw`$S=\dfrac{3^1-3^{-1}}{2\ln3}=\dfrac{8/3}{2\ln3}=\dfrac{4}{3\ln3}\approx1.21$.`,
      full: [
        String.raw`$S=\displaystyle\int_0^1 3^{2x-1}\,dx=\left[\dfrac{3^{2x-1}}{2\ln3}\right]_0^1$.`,
        String.raw`$S=\dfrac{3^1}{2\ln3}-\dfrac{3^{-1}}{2\ln3}=\dfrac{3-\frac13}{2\ln3}=\dfrac{4}{3\ln3}$.`,
        String.raw`$S\approx\dfrac{4}{3\cdot1.0986}\approx1.21$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את השטח המוגבל בין גרף הפונקציה, הישר $y=3$ וציר $y$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`בתחום $0\le x\le1$ הישר נמצא מעל הגרף: $S=\displaystyle\int_0^1\left(3-3^{2x-1}\right)dx$.`, String.raw`זהו שטח המלבן ($3\cdot1$) פחות השטח שמצאתם בסעיף ב.`],
      check: { kind: 'numeric', answer: 1.786347698, tol: 0.01, verify: 'integrate("3-3^(2*x-1)", 0, 1)' },
      short: String.raw`$S=\displaystyle\int_0^1\left(3-3^{2x-1}\right)dx=3-\dfrac{4}{3\ln3}\approx1.79$.`,
      full: [
        String.raw`הפונקציה עולה ו-$f(1)=3$, ולכן בתחום $0\le x\le1$ מתקיים $f(x)\le3$: הישר מעל הגרף.`,
        String.raw`$S=\displaystyle\int_0^1\left(3-3^{2x-1}\right)dx=3\cdot1-\displaystyle\int_0^1 3^{2x-1}\,dx$.`,
        String.raw`$S=3-\dfrac{4}{3\ln3}\approx3-1.2137\approx1.79$.`,
      ],
    },
  ],
};

const e9: Exercise = {
  id: 'cob-9',
  level: 3,
  topicId: T,
  subtopicIds: ['calc-other-bases', 'calc-derivatives', 'calc-second-derivative', 'calc-investigation'],
  intro: String.raw`נתונה הפונקציה $f(x)=x\cdot3^{-x}$, המוגדרת לכל $x$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-0.5, 4.5], yRange: [-1, 0.6], functions: [{ expr: 'x*3^(-x)', label: 'f' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את שיפוע המשיק לגרף הפונקציה בראשית הצירים.`,
      hints: [String.raw`גזרו לפי כלל המכפלה. $\left(3^{-x}\right)'=-3^{-x}\ln3$.`, String.raw`$f'(x)=3^{-x}-x\cdot3^{-x}\ln3=3^{-x}(1-x\ln3)$. הציבו $x=0$.`],
      check: { kind: 'numeric', answer: 1, verify: 'deriv("x*3^(-x)", 0)' },
      short: String.raw`$f'(x)=3^{-x}(1-x\ln3)$, ולכן $f'(0)=1$.`,
      full: [
        String.raw`$\left(3^{-x}\right)'=3^{-x}\cdot\ln3\cdot(-1)=-3^{-x}\ln3$.`,
        String.raw`כלל המכפלה: $f'(x)=1\cdot3^{-x}+x\cdot\left(-3^{-x}\ln3\right)=3^{-x}(1-x\ln3)$.`,
        String.raw`$f'(0)=3^0\cdot(1-0)=1$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את שיעור ה-$x$ של נקודת הקיצון של הפונקציה. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`$f'(x)=3^{-x}(1-x\ln3)$. איזה גורם יכול להתאפס?`, String.raw`$3^{-x}>0$ תמיד, ולכן $1-x\ln3=0$.`],
      check: { kind: 'numeric', answer: 0.9102392266, tol: 0.01, verify: 'root("3^(-x)*(1-x*log(3))", 0, 3)' },
      short: String.raw`$1-x\ln3=0\ \Rightarrow\ x=\dfrac{1}{\ln3}\approx0.91$; הנגזרת עוברת מחיובית לשלילית, ולכן זו נקודת מקסימום.`,
      full: [
        String.raw`$3^{-x}>0$ לכל $x$, ולכן $f'(x)=0$ רק כאשר $1-x\ln3=0$, כלומר $x=\dfrac{1}{\ln3}\approx0.91$.`,
        String.raw`עבור $x<\dfrac{1}{\ln3}$ הנגזרת חיובית (הפונקציה עולה), ועבור $x>\dfrac{1}{\ln3}$ היא שלילית (הפונקציה יורדת).`,
        String.raw`לכן זו נקודת מקסימום.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את שיעור ה-$y$ של נקודת הקיצון. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`הציבו $x=\dfrac{1}{\ln3}$ בפונקציה.`, String.raw`$3^{\frac{1}{\ln3}}=e^{\ln3\cdot\frac{1}{\ln3}}=e$.`],
      check: { kind: 'numeric', answer: 0.334858298, tol: 0.01, verify: 'root("3^(-x)*(1-x*log(3))", 0, 3)*3^(-root("3^(-x)*(1-x*log(3))", 0, 3))' },
      short: String.raw`$f\!\left(\dfrac{1}{\ln3}\right)=\dfrac{1}{\ln3}\cdot3^{-\frac{1}{\ln3}}=\dfrac{1}{e\ln3}\approx0.33$.`,
      full: [
        String.raw`$f\!\left(\dfrac{1}{\ln3}\right)=\dfrac{1}{\ln3}\cdot3^{-\frac{1}{\ln3}}$.`,
        String.raw`$3^{\frac{1}{\ln3}}=\left(e^{\ln3}\right)^{\frac{1}{\ln3}}=e$, ולכן $3^{-\frac{1}{\ln3}}=\dfrac1e$.`,
        String.raw`$y=\dfrac{1}{e\ln3}\approx\dfrac{1}{2.7183\cdot1.0986}\approx0.33$. (גם הצבה במחשבון, $0.9102\cdot3^{-0.9102}$, נותנת $0.33$.)`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`מצאו את שיעור ה-$x$ של נקודת הפיתול של הפונקציה. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`גזרו את $f'(x)=3^{-x}(1-x\ln3)$ פעם נוספת, לפי כלל המכפלה.`, String.raw`$f''(x)=\ln3\cdot3^{-x}(x\ln3-2)$.`],
      check: { kind: 'numeric', answer: 1.820478453, tol: 0.01, verify: 'root("3^(-x)*log(3)*(x*log(3)-2)", 1, 4)' },
      short: String.raw`$f''(x)=\ln3\cdot3^{-x}(x\ln3-2)=0\ \Rightarrow\ x=\dfrac{2}{\ln3}\approx1.82$, ושם $f''$ מחליפה סימן.`,
      full: [
        String.raw`$f''(x)=-3^{-x}\ln3\cdot(1-x\ln3)+3^{-x}\cdot(-\ln3)=-\ln3\cdot3^{-x}(2-x\ln3)=\ln3\cdot3^{-x}(x\ln3-2)$.`,
        String.raw`$f''(x)=0$ כאשר $x\ln3=2$, כלומר $x=\dfrac{2}{\ln3}\approx1.82$.`,
        String.raw`עבור $x<\dfrac{2}{\ln3}$: $f''<0$ (קעורה כלפי מטה); עבור $x>\dfrac{2}{\ln3}$: $f''>0$ (קעורה כלפי מעלה). הנגזרת השנייה מחליפה סימן, ולכן זו נקודת פיתול.`,
      ],
    },
  ],
};

const e10: Exercise = {
  id: 'cob-10',
  level: 3,
  topicId: T,
  subtopicIds: ['calc-other-bases', 'calc-derivatives', 'calc-investigation', 'calc-area'],
  intro: String.raw`נתונה הפונקציה $f(x)=\dfrac{\log_2x}{x}$, המוגדרת עבור $x>0$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-0.4, 8], yRange: [-1.4, 0.9], functions: [{ expr: 'log(x, 2)/x', domain: [0.6, 8], label: 'f' }] },
  solutionDiagram: { kind: 'plot', xRange: [-0.4, 8], yRange: [-1.4, 0.9], functions: [{ expr: 'log(x, 2)/x', domain: [0.6, 8], label: 'f' }], shade: [{ between: 'log(x, 2)/x', from: 1, to: 4 }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את שיעור ה-$x$ של נקודת הקיצון של הפונקציה. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`כתבו $f(x)=\dfrac{1}{\ln2}\cdot\dfrac{\ln x}{x}$ וגזרו לפי כלל המנה.`, String.raw`$f'(x)=\dfrac{1-\ln x}{x^2\ln2}$. מתי המונה מתאפס?`],
      check: { kind: 'numeric', answer: 2.718281828, tol: 0.01, verify: 'root("(1-log(x))/(x^2*log(2))", 1, 5)' },
      short: String.raw`$f'(x)=\dfrac{1-\ln x}{x^2\ln2}=0\iff\ln x=1$, כלומר $x=e\approx2.72$ (מקסימום).`,
      full: [
        String.raw`מעבר בסיס: $f(x)=\dfrac{\ln x}{x\ln2}=\dfrac{1}{\ln2}\cdot\dfrac{\ln x}{x}$.`,
        String.raw`כלל המנה: $\left(\dfrac{\ln x}{x}\right)'=\dfrac{\frac1x\cdot x-\ln x\cdot1}{x^2}=\dfrac{1-\ln x}{x^2}$, ולכן $f'(x)=\dfrac{1-\ln x}{x^2\ln2}$.`,
        String.raw`$f'(x)=0$ כאשר $\ln x=1$, כלומר $x=e\approx2.72$.`,
        String.raw`עבור $0<x<e$ הנגזרת חיובית, ועבור $x>e$ היא שלילית; לכן זו נקודת מקסימום.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את הערך המקסימלי של הפונקציה. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`הציבו $x=e$ בפונקציה.`, String.raw`$\log_2e=\dfrac{\ln e}{\ln2}=\dfrac{1}{\ln2}$.`],
      check: { kind: 'numeric', answer: 0.5307378454, tol: 0.01, verify: 'log(root("(1-log(x))/(x^2*log(2))", 1, 5), 2)/root("(1-log(x))/(x^2*log(2))", 1, 5)' },
      short: String.raw`$f(e)=\dfrac{\log_2e}{e}=\dfrac{1}{e\ln2}\approx0.53$.`,
      full: [String.raw`$f(e)=\dfrac{\log_2e}{e}$, ו-$\log_2e=\dfrac{1}{\ln2}\approx1.4427$.`, String.raw`$f(e)=\dfrac{1}{e\ln2}\approx\dfrac{1.4427}{2.7183}\approx0.53$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`נתונה הפונקציה $g(x)=(\log_2x)^2$. הוכיחו כי $g'(x)=\dfrac{2}{\ln2}\cdot f(x)$.`,
      hints: [String.raw`גזרו כפונקציה מורכבת: $\left(u^2\right)'=2u\cdot u'$, עם $u=\log_2x$.`, String.raw`$(\log_2x)'=\dfrac{1}{x\ln2}$.`],
      check: { kind: 'self' },
      short: String.raw`$g'(x)=2\log_2x\cdot\dfrac{1}{x\ln2}=\dfrac{2}{\ln2}\cdot\dfrac{\log_2x}{x}=\dfrac{2}{\ln2}\cdot f(x)$.`,
      full: [
        String.raw`$g(x)=u^2$ עם $u=\log_2x$, ולכן $g'(x)=2u\cdot u'=2\log_2x\cdot(\log_2x)'$.`,
        String.raw`$(\log_2x)'=\dfrac{1}{x\ln2}$, ולכן $g'(x)=2\log_2x\cdot\dfrac{1}{x\ln2}$.`,
        String.raw`מסדרים: $g'(x)=\dfrac{2}{\ln2}\cdot\dfrac{\log_2x}{x}=\dfrac{2}{\ln2}\cdot f(x)$. מ.ש.ל.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את השטח המוגבל בין גרף הפונקציה $f$, ציר $x$ והישר $x=4$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`מצאו היכן הגרף חותך את ציר $x$: זה הגבול השני של האינטגרל. בדקו גם את סימן הפונקציה בתחום.`,
        String.raw`לפי סעיף ג, $f(x)=\dfrac{\ln2}{2}\cdot g'(x)$, ולכן $\dfrac{\ln2}{2}(\log_2x)^2$ היא פונקציה קדומה של $f$.`,
        String.raw`$S=\dfrac{\ln2}{2}\left[(\log_2x)^2\right]_1^4$.`,
      ],
      check: { kind: 'numeric', answer: 1.386294361, tol: 0.01, verify: 'integrate("log(x, 2)/x", 1, 4)' },
      short: String.raw`$S=\displaystyle\int_1^4 f(x)\,dx=\dfrac{\ln2}{2}\left[(\log_2x)^2\right]_1^4=\dfrac{\ln2}{2}\cdot(4-0)=2\ln2\approx1.39$.`,
      full: [
        String.raw`חיתוך עם ציר $x$: $\log_2x=0$, כלומר $x=1$. בתחום $1\le x\le4$ מתקיים $\log_2x\ge0$, ולכן $f(x)\ge0$ והשטח הוא $\displaystyle\int_1^4 f(x)\,dx$.`,
        String.raw`לפי סעיף ג: $f(x)=\dfrac{\ln2}{2}\cdot g'(x)$, ולכן פונקציה קדומה של $f$ היא $F(x)=\dfrac{\ln2}{2}(\log_2x)^2$.`,
        String.raw`$S=F(4)-F(1)=\dfrac{\ln2}{2}\left(2^2-0^2\right)=2\ln2$.`,
        String.raw`$S\approx2\cdot0.6931\approx1.39$.`,
      ],
    },
  ],
};

const e11: Exercise = {
  id: 'cob-11',
  level: 3,
  topicId: T,
  subtopicIds: ['calc-other-bases', 'calc-other-base-integrals', 'calc-investigation', 'calc-second-derivative', 'calc-area'],
  intro: String.raw`נתונה הפונקציה $f(x)=2^x+2^{-x}$. הישר $y=2.5$ חותך את גרף הפונקציה בשתי נקודות (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-2, 2], yRange: [-0.5, 4.6], functions: [{ expr: '2^x+2^(-x)', label: 'f' }, { expr: '2.5', dashed: true }] },
  solutionDiagram: { kind: 'plot', xRange: [-2, 2], yRange: [-0.5, 4.6], functions: [{ expr: '2^x+2^(-x)', label: 'f' }, { expr: '2.5', dashed: true }], shade: [{ between: ['2.5', '2^x+2^(-x)'], from: -1, to: 1 }], points: [{ x: 1, y: 2.5, label: '(1, 2.5)' }, { x: -1, y: 2.5 }, { x: 0, y: 2 }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את הערך המינימלי של הפונקציה.`,
      hints: [String.raw`גזרו והשוו לאפס. $\left(2^{-x}\right)'=-2^{-x}\ln2$.`, String.raw`$f'(x)=\ln2\,(2^x-2^{-x})$, והנגזרת מתאפסת כאשר $2^x=2^{-x}$.`],
      check: { kind: 'numeric', answer: 2, verify: '2^root("2^x*log(2)-2^(-x)*log(2)", -1, 2)+2^(-root("2^x*log(2)-2^(-x)*log(2)", -1, 2))' },
      short: String.raw`$f'(x)=\ln2\,(2^x-2^{-x})=0\iff x=0$, והערך המינימלי הוא $f(0)=2$.`,
      full: [
        String.raw`$f'(x)=2^x\ln2-2^{-x}\ln2=\ln2\,(2^x-2^{-x})$.`,
        String.raw`$f'(x)=0$ כאשר $2^x=2^{-x}$, כלומר $x=-x$ ולכן $x=0$.`,
        String.raw`עבור $x>0$: $2^x>1>2^{-x}$ והנגזרת חיובית; עבור $x<0$ היא שלילית. לכן ב-$x=0$ יש מינימום.`,
        String.raw`$f(0)=2^0+2^0=2$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את שיעור ה-$x$ של נקודת החיתוך של הישר $y=2.5$ עם גרף הפונקציה שנמצאת ברביע הראשון.`,
      hints: [String.raw`פתרו $2^x+2^{-x}=2.5$ בעזרת ההצבה $t=2^x$ ($t>0$); אז $2^{-x}=\dfrac1t$.`, String.raw`$t+\dfrac1t=2.5$, כלומר $2t^2-5t+2=0$.`],
      check: { kind: 'numeric', answer: 1, verify: 'root("2^x+2^(-x)-2.5", 0.5, 3)' },
      short: String.raw`$t=2^x$: $2t^2-5t+2=0\ \Rightarrow\ t=2$ או $t=\dfrac12$, כלומר $x=\pm1$; ברביע הראשון $x=1$.`,
      full: [
        String.raw`מסמנים $t=2^x>0$: $t+\dfrac1t=2.5$. כופלים ב-$2t$: $2t^2-5t+2=0$.`,
        String.raw`$t=\dfrac{5\pm\sqrt{25-16}}{4}$, כלומר $t=2$ או $t=\dfrac12$.`,
        String.raw`$2^x=2\Rightarrow x=1$; $2^x=\dfrac12\Rightarrow x=-1$.`,
        String.raw`נקודות החיתוך: $(1,\,2.5)$ ו-$(-1,\,2.5)$. ברביע הראשון: $x=1$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את שיפוע המשיק לגרף הפונקציה בנקודה שמצאתם בסעיף ב. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`הציבו $x=1$ בנגזרת מסעיף א.`],
      check: { kind: 'numeric', answer: 1.039720771, tol: 0.01, verify: 'deriv("2^x+2^(-x)", 1)' },
      short: String.raw`$f'(1)=\ln2\left(2-\dfrac12\right)=1.5\ln2\approx1.04$.`,
      full: [String.raw`$f'(x)=\ln2\,(2^x-2^{-x})$.`, String.raw`$f'(1)=\ln2\left(2-\dfrac12\right)=1.5\ln2\approx1.5\cdot0.6931\approx1.04$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את השטח המוגבל בין גרף הפונקציה לישר $y=2.5$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`גבולות האינטגרל הם שיעורי ה-$x$ של שתי נקודות החיתוך, והישר נמצא מעל הגרף.`,
        String.raw`$S=\displaystyle\int_{-1}^{1}\left(2.5-2^x-2^{-x}\right)dx$; פונקציה קדומה של $2^{-x}$ היא $-\dfrac{2^{-x}}{\ln2}$.`,
      ],
      check: { kind: 'numeric', answer: 0.6719148773, tol: 0.01, verify: 'integrate("2.5-2^x-2^(-x)", -1, 1)' },
      short: String.raw`$S=\displaystyle\int_{-1}^{1}\left(2.5-2^x-2^{-x}\right)dx=5-\dfrac{3}{\ln2}\approx0.67$.`,
      full: [
        String.raw`בין $x=-1$ ל-$x=1$ הגרף מתחת לישר (המינימום $2$ קטן מ-$2.5$), ולכן $S=\displaystyle\int_{-1}^{1}\left(2.5-2^x-2^{-x}\right)dx$.`,
        String.raw`פונקציה קדומה: $F(x)=2.5x-\dfrac{2^x}{\ln2}+\dfrac{2^{-x}}{\ln2}$.`,
        String.raw`$F(1)=2.5-\dfrac{2}{\ln2}+\dfrac{0.5}{\ln2}=2.5-\dfrac{1.5}{\ln2}$, ו-$F(-1)=-2.5-\dfrac{0.5}{\ln2}+\dfrac{2}{\ln2}=-2.5+\dfrac{1.5}{\ln2}$.`,
        String.raw`$S=F(1)-F(-1)=5-\dfrac{3}{\ln2}\approx5-4.328\approx0.67$.`,
      ],
    },
  ],
};

const e12: Exercise = {
  id: 'cob-12',
  level: 3,
  topicId: T,
  subtopicIds: ['calc-other-bases', 'calc-other-base-integrals', 'calc-second-derivative', 'calc-area'],
  intro: String.raw`נתונות הפונקציות $f(x)=2^x$ ו-$g(x)=2^{2-x}$. הגרפים של שתי הפונקציות נחתכים בנקודה $A$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-1, 3], yRange: [-0.5, 8.5], functions: [{ expr: '2^x', label: 'f' }, { expr: '2^(2-x)', label: 'g' }] },
  solutionDiagram: { kind: 'plot', xRange: [-1, 3], yRange: [-0.5, 8.5], functions: [{ expr: '2^x', label: 'f' }, { expr: '2^(2-x)', label: 'g' }, { expr: '2-2*log(2)*(x-1)', dashed: true }], shade: [{ between: ['2^(2-x)', '2^x'], from: 0, to: 1 }], points: [{ x: 1, y: 2, label: 'A' }, { x: 0, y: 3.386, label: 'B' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את שיעור ה-$x$ של הנקודה $A$.`,
      hints: [String.raw`השוו בין הפונקציות. כששני האגפים הם חזקות של אותו בסיס, משווים מעריכים.`, String.raw`$2^x=2^{2-x}\ \Rightarrow\ x=2-x$.`],
      check: { kind: 'numeric', answer: 1, verify: 'root("2^x-2^(2-x)", 0, 3)' },
      short: String.raw`$2^x=2^{2-x}\ \Rightarrow\ x=2-x\ \Rightarrow\ x=1$, כלומר $A(1,2)$.`,
      full: [String.raw`$2^x=2^{2-x}$. הבסיסים שווים, ולכן $x=2-x$.`, String.raw`$x=1$, ו-$f(1)=g(1)=2$: $A(1,2)$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את שיפוע המשיק לגרף הפונקציה $g$ בנקודה $A$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`$g(x)=2^{u(x)}$ עם $u(x)=2-x$. מהי הנגזרת הפנימית?`, String.raw`$g'(x)=2^{2-x}\cdot\ln2\cdot(-1)$.`],
      check: { kind: 'numeric', answer: -1.386294361, tol: 0.01, verify: 'deriv("2^(2-x)", 1)' },
      short: String.raw`$g'(x)=-2^{2-x}\ln2$, ולכן $g'(1)=-2\ln2\approx-1.39$.`,
      full: [String.raw`$g'(x)=2^{2-x}\cdot\ln2\cdot(2-x)'=-2^{2-x}\ln2$.`, String.raw`$g'(1)=-2^1\cdot\ln2=-2\ln2\approx-1.39$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`המשיק מסעיף ב חותך את ציר $y$ בנקודה $B$. מצאו את שיעור ה-$y$ של $B$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`משוואת המשיק: $y-2=-2\ln2\,(x-1)$.`, String.raw`הציבו $x=0$.`],
      check: { kind: 'numeric', answer: 3.386294361, tol: 0.01, verify: '2^(2-1)-deriv("2^(2-x)", 1)*1' },
      short: String.raw`$y=2-2\ln2\,(x-1)$; ב-$x=0$: $y=2+2\ln2\approx3.39$.`,
      full: [String.raw`משיק דרך $A(1,2)$ בשיפוע $-2\ln2$: $y-2=-2\ln2\,(x-1)$.`, String.raw`ב-$x=0$: $y=2+2\ln2\approx2+1.386\approx3.39$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את השטח המוגבל בין הגרפים של שתי הפונקציות וציר $y$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`התחום הוא מ-$x=0$ עד נקודת החיתוך. איזה גרף עליון שם? בדקו ב-$x=0$.`,
        String.raw`$S=\displaystyle\int_0^1\left(2^{2-x}-2^x\right)dx$; פונקציה קדומה של $2^{2-x}$ היא $-\dfrac{2^{2-x}}{\ln2}$.`,
      ],
      check: { kind: 'numeric', answer: 1.442695041, tol: 0.01, verify: 'integrate("2^(2-x)-2^x", 0, 1)' },
      short: String.raw`$S=\displaystyle\int_0^1\left(2^{2-x}-2^x\right)dx=\left[-\dfrac{2^{2-x}+2^x}{\ln2}\right]_0^1=\dfrac{1}{\ln2}\approx1.44$.`,
      full: [
        String.raw`ב-$x=0$: $g(0)=4>f(0)=1$, ולכן בתחום $0\le x\le1$ הגרף של $g$ מעל הגרף של $f$.`,
        String.raw`$S=\displaystyle\int_0^1\left(2^{2-x}-2^x\right)dx$. פונקציה קדומה: $F(x)=-\dfrac{2^{2-x}}{\ln2}-\dfrac{2^x}{\ln2}$ (המקדם של $x$ במעריך הוא $-1$).`,
        String.raw`$F(1)=-\dfrac{2+2}{\ln2}=-\dfrac{4}{\ln2}$, ו-$F(0)=-\dfrac{4+1}{\ln2}=-\dfrac{5}{\ln2}$.`,
        String.raw`$S=F(1)-F(0)=\dfrac{1}{\ln2}\approx1.44$.`,
      ],
    },
  ],
};

export const calc582OtherBases: ExerciseSet = {
  id: 'calc582-other-bases',
  questionnaire: '35582',
  title: 'פונקציות בבסיס שונה מ-e',
  topicIds: ['differential-integral'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
