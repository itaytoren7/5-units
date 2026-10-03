import type { ExerciseSource, LessonExercise } from '../types';

/*
 * Exercises translated into Hebrew (and adapted) from OpenStax, Calculus Volume 1
 * (Gilbert Strang, Edwin “Jed” Herman et al.), https://openstax.org/details/books/calculus-volume-1,
 * licensed CC BY-NC-SA 4.0. The translations and the added hints / solutions are shared under the same licence.
 * Only exercises inside the 2026 מיקוד of questionnaire 35581 were taken.
 */

const BOOK_URL = 'https://openstax.org/books/calculus-volume-1/pages/';

function openstax(section: string, page: string, exercise: number): ExerciseSource {
  return {
    kind: 'openstax',
    work: 'OpenStax, Calculus Volume 1',
    section: `${section}, תרגיל ${exercise}`,
    url: BOOK_URL + page,
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    adapted: true,
  };
}

const s31 = (n: number) => openstax('3.1 Defining the Derivative', '3-1-defining-the-derivative', n);
const s33 = (n: number) => openstax('3.3 Differentiation Rules', '3-3-differentiation-rules', n);
const s35 = (n: number) => openstax('3.5 Derivatives of Trigonometric Functions', '3-5-derivatives-of-trigonometric-functions', n);
const s36 = (n: number) => openstax('3.6 The Chain Rule', '3-6-the-chain-rule', n);
const s43 = (n: number) => openstax('4.3 Maxima and Minima', '4-3-maxima-and-minima', n);
const s45 = (n: number) => openstax('4.5 Derivatives and the Shape of a Graph', '4-5-derivatives-and-the-shape-of-a-graph', n);
const s46 = (n: number) => openstax('4.6 Limits at Infinity and Asymptotes', '4-6-limits-at-infinity-and-asymptotes', n);
const s47 = (n: number) => openstax('4.7 Applied Optimization Problems', '4-7-applied-optimization-problems', n);
const s410 = (n: number) => openstax('4.10 Antiderivatives', '4-10-antiderivatives', n);
const review4 = (n: number) => openstax('Chapter 4 Review Exercises', '4-review-exercises', n);
const s52 = (n: number) => openstax('5.2 The Definite Integral', '5-2-the-definite-integral', n);
const s53 = (n: number) => openstax('5.3 The Fundamental Theorem of Calculus', '5-3-the-fundamental-theorem-of-calculus', n);
const s55 = (n: number) => openstax('5.5 Substitution', '5-5-substitution', n);
const s61 = (n: number) => openstax('6.1 Areas between Curves', '6-1-areas-between-curves', n);

/** Exercises adapted (translated) from OpenStax books, keyed by lesson id. Every exercise carries a `source` attribution. */
export const openstaxCalculusExercises: Record<string, LessonExercise[]> = {
  'calc-derivative': [
    {
      id: 'calc-derivative-os1',
      difficulty: 1,
      statement: String.raw`נתונה הפונקציה $f(x)=x^2+9x$. בעזרת הגדרת הנגזרת כגבול, $f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}$, מצאו את $f'(a)$ עבור $a=2$.`,
      hints: [
        String.raw`חשבו בנפרד את $f(2)$ ואת $f(2+h)$.`,
        String.raw`פתחו סוגריים במונה $f(2+h)-f(2)$, צמצמו ב-$h$ ורק אחר כך הציבו $h\to0$.`,
      ],
      solutionSteps: [
        String.raw`$f(2)=2^2+9\cdot2=22$.`,
        String.raw`$f(2+h)=(2+h)^2+9(2+h)=4+4h+h^2+18+9h=22+13h+h^2$.`,
        String.raw`מנת ההפרשים: $\frac{f(2+h)-f(2)}{h}=\frac{13h+h^2}{h}=13+h$ (עבור $h\ne0$).`,
        String.raw`לכן $f'(2)=\lim_{h\to0}(13+h)=13$.`,
        String.raw`בדיקה בעזרת כללי הגזירה: $f'(x)=2x+9$, ואכן $f'(2)=13$.`,
      ],
      finalAnswer: String.raw`$f'(2)=13$`,
      answers: [{ label: String.raw`$f'(2)$`, value: 13 }],
      source: s31(23),
    },
    {
      id: 'calc-derivative-os2',
      difficulty: 1,
      statement: String.raw`מצאו את $f'(x)$ עבור הפונקציה $f(x)=8x^4+9x^2-1$.`,
      hints: [String.raw`גזרו כל מחובר בנפרד לפי $(x^n)'=nx^{n-1}$ ו-$(cf)'=cf'$. הנגזרת של קבוע היא $0$.`],
      solutionSteps: [
        String.raw`נגזרת של סכום היא סכום הנגזרות, ולכן גוזרים כל מחובר בנפרד.`,
        String.raw`$(8x^4)'=8\cdot4x^3=32x^3$ ו-$(9x^2)'=9\cdot2x=18x$.`,
        String.raw`$(-1)'=0$, ולכן $f'(x)=32x^3+18x$.`,
      ],
      finalAnswer: String.raw`$f'(x)=32x^3+18x$`,
      source: s33(109),
    },
    {
      id: 'calc-derivative-os3',
      difficulty: 2,
      statement: String.raw`מצאו את $f'(x)$ עבור הפונקציה $f(x)=\frac{x+9}{x^2-7x+1}$.`,
      hints: [
        String.raw`השתמשו בנוסחת הנגזרת של מנה: $\left(\frac uv\right)'=\frac{u'v-uv'}{v^2}$.`,
        String.raw`כאן $u=x+9$, $v=x^2-7x+1$, ולכן $u'=1$, $v'=2x-7$.`,
      ],
      solutionSteps: [
        String.raw`לפי נגזרת מנה: $f'(x)=\frac{1\cdot(x^2-7x+1)-(x+9)(2x-7)}{(x^2-7x+1)^2}$.`,
        String.raw`נפתח את המכפלה: $(x+9)(2x-7)=2x^2-7x+18x-63=2x^2+11x-63$.`,
        String.raw`המונה: $x^2-7x+1-2x^2-11x+63=-x^2-18x+64$.`,
        String.raw`לכן $f'(x)=\frac{-x^2-18x+64}{(x^2-7x+1)^2}$, בכל נקודה שבה $x^2-7x+1\ne0$ (תחום ההגדרה של $f$).`,
      ],
      finalAnswer: String.raw`$f'(x)=\frac{-x^2-18x+64}{(x^2-7x+1)^2}$`,
      source: s33(117),
    },
    {
      id: 'calc-derivative-os4',
      difficulty: 2,
      statement: String.raw`מצאו את הנגזרת $y'$ של הפונקציה $y=(2x^3-x^2+6x+1)^3$.`,
      hints: [
        String.raw`זו פונקציה מורכבת: ביטוי פנימי $g(x)=2x^3-x^2+6x+1$ בחזקת $3$.`,
        String.raw`לפי כלל השרשרת $\big(g(x)^n\big)'=n\,g(x)^{n-1}g'(x)$ – אל תשכחו את הנגזרת הפנימית.`,
      ],
      solutionSteps: [
        String.raw`נסמן $g(x)=2x^3-x^2+6x+1$, אז $y=g(x)^3$ ו-$g'(x)=6x^2-2x+6$.`,
        String.raw`לפי כלל השרשרת: $y'=3\,g(x)^2\cdot g'(x)=3(2x^3-x^2+6x+1)^2(6x^2-2x+6)$.`,
        String.raw`נוציא גורם משותף $2$ מהנגזרת הפנימית: $y'=6(2x^3-x^2+6x+1)^2(3x^2-x+3)$.`,
      ],
      finalAnswer: String.raw`$y'=6(2x^3-x^2+6x+1)^2(3x^2-x+3)$`,
      source: s36(231),
    },
    {
      id: 'calc-derivative-os5',
      difficulty: 2,
      statement: String.raw`הפונקציות $f(x)$ ו-$g(x)$ גזירות לכל $x$. הטבלה מציגה כמה מערכיהן ומערכי הנגזרות שלהן:

$$\begin{array}{c|cccc} x & 1 & 2 & 3 & 4 \\ \hline f(x) & 3 & 5 & -2 & 0 \\ g(x) & 2 & 3 & -4 & 6 \\ f'(x) & -1 & 7 & 8 & -3 \\ g'(x) & 4 & 1 & 2 & 9 \end{array}$$

מצאו את $h'(2)$ אם $h(x)=\frac{f(x)}{g(x)}$.`,
      hints: [
        String.raw`גזרו את $h$ לפי נוסחת הנגזרת של מנה, ורק אחר כך הציבו $x=2$.`,
        String.raw`מהטבלה: $f(2)=5$, $g(2)=3$, $f'(2)=7$, $g'(2)=1$.`,
      ],
      solutionSteps: [
        String.raw`לפי נגזרת מנה: $h'(x)=\frac{f'(x)g(x)-f(x)g'(x)}{g(x)^2}$.`,
        String.raw`נציב $x=2$ ואת ערכי הטבלה: $h'(2)=\frac{7\cdot3-5\cdot1}{3^2}=\frac{21-5}{9}$.`,
        String.raw`לכן $h'(2)=\frac{16}{9}$.`,
      ],
      finalAnswer: String.raw`$h'(2)=\frac{16}{9}\approx1.778$`,
      answers: [{ label: String.raw`$h'(2)$`, value: 16 / 9 }],
      source: s33(127),
    },
    {
      id: 'calc-derivative-os6',
      difficulty: 3,
      statement: String.raw`נתון $y=\left(f(x)+5x^2\right)^4$, כאשר $f$ פונקציה גזירה. ידוע ש-$f(-1)=-4$ וש-$y'=3$ כאשר $x=-1$. מצאו את $f'(-1)$.`,
      hints: [
        String.raw`גזרו את $y$ בכלל השרשרת: הביטוי הפנימי הוא $f(x)+5x^2$, והנגזרת שלו היא $f'(x)+10x$.`,
        String.raw`הציבו $x=-1$: הביטוי הפנימי שווה ל-$f(-1)+5=1$. קבלו משוואה שבה הנעלם היחיד הוא $f'(-1)$.`,
      ],
      solutionSteps: [
        String.raw`לפי כלל השרשרת: $y'=4\left(f(x)+5x^2\right)^3\cdot\left(f'(x)+10x\right)$.`,
        String.raw`ב-$x=-1$: $f(-1)+5\cdot(-1)^2=-4+5=1$, ולכן $y'(-1)=4\cdot1^3\cdot\left(f'(-1)-10\right)$.`,
        String.raw`נתון $y'(-1)=3$, ולכן $4\left(f'(-1)-10\right)=3$.`,
        String.raw`מכאן $f'(-1)-10=\frac34$, כלומר $f'(-1)=10\frac34=\frac{43}{4}$.`,
      ],
      finalAnswer: String.raw`$f'(-1)=\frac{43}{4}=10.75$`,
      answers: [{ label: String.raw`$f'(-1)$`, value: 43 / 4 }],
      source: s36(239),
    },
  ],
  'calc-tangent': [
    {
      id: 'calc-tangent-os1',
      difficulty: 1,
      statement: String.raw`נתונה הפונקציה $f(x)=x^2+x$ והנקודה $a=1$.

א. בעזרת הגדרת הנגזרת כגבול מצאו את שיפוע המשיק $m=f'(a)$.

ב. מצאו את משוואת המשיק לגרף $f$ בנקודה שבה $x=a$.`,
      hints: [
        String.raw`$f'(1)=\lim_{h\to0}\frac{f(1+h)-f(1)}{h}$, ו-$f(1)=2$.`,
        String.raw`משוואת המשיק: $y-f(a)=f'(a)(x-a)$.`,
      ],
      solutionSteps: [
        String.raw`$f(1)=1+1=2$ ו-$f(1+h)=(1+h)^2+(1+h)=2+3h+h^2$.`,
        String.raw`$\frac{f(1+h)-f(1)}{h}=\frac{3h+h^2}{h}=3+h\xrightarrow[h\to0]{}3$, ולכן שיפוע המשיק $m=f'(1)=3$.`,
        String.raw`המשיק עובר בנקודה $(1,2)$ שעל הגרף: $y-2=3(x-1)$.`,
        String.raw`כלומר $y=3x-1$.`,
      ],
      finalAnswer: String.raw`א. $m=3$. ב. $y=3x-1$.`,
      answers: [
        { label: String.raw`שיפוע המשיק $m$`, value: 3 },
        { label: String.raw`המקדם החופשי $n$ במשוואת המשיק $y=mx+n$`, value: -1 },
      ],
      source: s31(13),
    },
    {
      id: 'calc-tangent-os2',
      difficulty: 1,
      statement: String.raw`מצאו את משוואת המשיק לגרף הפונקציה $f(x)=2x^3+4x^2-5x-3$ בנקודה שבה $x=-1$.`,
      hints: [
        String.raw`חשבו את נקודת ההשקה $(-1,f(-1))$ ואת השיפוע $f'(-1)$.`,
        String.raw`$f'(x)=6x^2+8x-5$.`,
      ],
      solutionSteps: [
        String.raw`נקודת ההשקה: $f(-1)=-2+4+5-3=4$, כלומר $(-1,4)$.`,
        String.raw`$f'(x)=6x^2+8x-5$, ולכן שיפוע המשיק $f'(-1)=6-8-5=-7$.`,
        String.raw`משוואת המשיק: $y-4=-7(x+1)$, כלומר $y=-7x-3$.`,
      ],
      finalAnswer: String.raw`$y=-7x-3$`,
      answers: [
        { label: String.raw`שיפוע המשיק $m$`, value: -7 },
        { label: String.raw`המקדם החופשי $n$ במשוואת המשיק $y=mx+n$`, value: -3 },
      ],
      source: s33(137),
    },
    {
      id: 'calc-tangent-os3',
      difficulty: 2,
      statement: String.raw`מצאו את משוואת המשיק לגרף הפונקציה $y=\frac{2}{x^2}+1$ בנקודה $(1,3)$.`,
      hints: [
        String.raw`כתבו $\frac{2}{x^2}=2x^{-2}$ וגזרו לפי כלל החזקה.`,
        String.raw`$y'=-\frac{4}{x^3}$; הציבו $x=1$.`,
      ],
      solutionSteps: [
        String.raw`הנקודה על הגרף: $y(1)=2+1=3$ ✓.`,
        String.raw`$y=2x^{-2}+1$, ולכן $y'=-4x^{-3}=-\frac{4}{x^3}$ ושיפוע המשיק $y'(1)=-4$.`,
        String.raw`משוואת המשיק: $y-3=-4(x-1)$, כלומר $y=-4x+7$.`,
      ],
      finalAnswer: String.raw`$y=-4x+7$`,
      answers: [
        { label: String.raw`שיפוע המשיק $m$`, value: -4 },
        { label: String.raw`המקדם החופשי $n$ במשוואת המשיק $y=mx+n$`, value: 7 },
      ],
      source: s33(119),
    },
    {
      id: 'calc-tangent-os4',
      difficulty: 2,
      statement: String.raw`מצאו את משוואת המשיק לגרף הפונקציה $y=\left(3x+\frac1x\right)^2$ בנקודה $(1,16)$.`,
      hints: [
        String.raw`גזרו בכלל השרשרת: $y'=2\left(3x+\frac1x\right)\cdot\left(3x+\frac1x\right)'$.`,
        String.raw`$\left(3x+\frac1x\right)'=3-\frac1{x^2}$.`,
      ],
      solutionSteps: [
        String.raw`הנקודה על הגרף: $y(1)=(3+1)^2=16$ ✓.`,
        String.raw`לפי כלל השרשרת: $y'=2\left(3x+\frac1x\right)\left(3-\frac1{x^2}\right)$.`,
        String.raw`שיפוע המשיק: $y'(1)=2\cdot4\cdot2=16$.`,
        String.raw`משוואת המשיק: $y-16=16(x-1)$, כלומר $y=16x$ (המשיק עובר דרך ראשית הצירים).`,
      ],
      finalAnswer: String.raw`$y=16x$`,
      answers: [
        { label: String.raw`שיפוע המשיק $m$`, value: 16 },
        { label: String.raw`המקדם החופשי $n$ במשוואת המשיק $y=mx+n$`, value: 0 },
      ],
      source: s36(242),
    },
    {
      id: 'calc-tangent-os5',
      difficulty: 2,
      statement: String.raw`מצאו את משוואת הישר העובר דרך הנקודה $P(3,3)$ ומשיק לגרף הפונקציה $f(x)=\frac{6}{x-1}$.`,
      hints: [
        String.raw`בדקו קודם אם $P$ נמצאת על הגרף: חשבו את $f(3)$.`,
        String.raw`$f'(x)=-\frac{6}{(x-1)^2}$.`,
        String.raw`כדי לוודא שאין משיק נוסף דרך $P$: רשמו את המשיק בנקודה כללית $x=t$ ודרשו שיעבור ב-$P$.`,
      ],
      solutionSteps: [
        String.raw`$f(3)=\frac{6}{2}=3$, ולכן $P(3,3)$ נמצאת על הגרף, והמשיק המבוקש הוא המשיק בנקודה $P$.`,
        String.raw`$f(x)=6(x-1)^{-1}$, ולכן $f'(x)=-\frac{6}{(x-1)^2}$ ושיפוע המשיק $f'(3)=-\frac64=-\frac32$.`,
        String.raw`משוואת המשיק: $y-3=-\frac32(x-3)$, כלומר $y=-\frac32x+\frac{15}{2}$.`,
        String.raw`(אין משיק נוסף דרך $P$: המשיק בנקודה $x=t$ הוא $y=\frac{6}{t-1}-\frac{6}{(t-1)^2}(x-t)$; הצבת $(3,3)$ והכפלה ב-$(t-1)^2$ נותנות $3(t-1)^2=12t-24$, כלומר $t^2-6t+9=0$, ולכן $t=3$ בלבד.)`,
      ],
      finalAnswer: String.raw`$y=-\frac32x+\frac{15}{2}$`,
      answers: [
        { label: String.raw`שיפוע המשיק $m$`, value: -1.5 },
        { label: String.raw`המקדם החופשי $n$ במשוואת המשיק $y=mx+n$`, value: 7.5 },
      ],
      source: s33(141),
    },
    {
      id: 'calc-tangent-os6',
      difficulty: 3,
      statement: String.raw`מצאו את הנקודה על גרף הפונקציה $f(x)=x^3$ שהמשיק לגרף בה חותך את ציר $x$ בנקודה שבה $x=6$.`,
      hints: [
        String.raw`סמנו את נקודת ההשקה $(a,a^3)$ ורשמו את משוואת המשיק בה.`,
        String.raw`המשיק: $y=a^3+3a^2(x-a)$. הציבו $y=0$ ובטאו את $x$ באמצעות $a$.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=3x^2$, ולכן המשיק בנקודה $(a,a^3)$ הוא $y-a^3=3a^2(x-a)$.`,
        String.raw`עבור $a=0$ המשיק הוא $y=0$ – ציר $x$ עצמו – ואין לו נקודת חיתוך יחידה עם ציר $x$, לכן $a\ne0$.`,
        String.raw`נציב $y=0$: $-a^3=3a^2(x-a)$, ונחלק ב-$3a^2\ne0$: $x-a=-\frac a3$, כלומר $x=\frac{2a}{3}$.`,
        String.raw`נדרוש $\frac{2a}{3}=6$, ולכן $a=9$ ו-$f(9)=729$.`,
        String.raw`בדיקה: המשיק ב-$(9,729)$ הוא $y=243x-1458$, והוא מתאפס ב-$x=6$ ✓.`,
      ],
      finalAnswer: String.raw`$(9,729)$`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של הנקודה`, value: 9 },
        { label: String.raw`שיעור ה-$y$ של הנקודה`, value: 729 },
      ],
      source: s33(140),
    },
  ],
  'calc-extrema-monotonic': [
    {
      id: 'calc-extrema-monotonic-os1',
      difficulty: 1,
      statement: String.raw`מצאו את הנקודות החשודות לקיצון של הפונקציה $y=x+\frac1x$, כלומר את הנקודות הפנימיות בתחום ההגדרה שבהן $y'=0$ או ש-$y'$ אינה מוגדרת.`,
      hints: [
        String.raw`התחילו מתחום ההגדרה: $x\ne0$.`,
        String.raw`$y'=1-\frac{1}{x^2}=\frac{x^2-1}{x^2}$.`,
      ],
      solutionSteps: [
        String.raw`תחום ההגדרה: $x\ne0$.`,
        String.raw`$y'=1-\frac1{x^2}=\frac{x^2-1}{x^2}$, והנגזרת מוגדרת בכל תחום ההגדרה ($x=0$ אינו בתחום, ולכן אינו נקודה חשודה).`,
        String.raw`$y'=0\iff x^2-1=0\iff x=\pm1$.`,
        String.raw`(סימן $y'$: חיובי עבור $|x|>1$ ושלילי עבור $0<|x|<1$, ולכן ב-$x=-1$ יש מקסימום מקומי $(-1,-2)$ וב-$x=1$ מינימום מקומי $(1,2)$.)`,
      ],
      finalAnswer: String.raw`$x=-1$ ו-$x=1$`,
      answers: [
        { label: String.raw`הנקודה החשודה השלילית $x$`, value: -1 },
        { label: String.raw`הנקודה החשודה החיובית $x$`, value: 1 },
      ],
      source: s43(117),
    },
    {
      id: 'calc-extrema-monotonic-os2',
      difficulty: 1,
      statement: String.raw`מצאו את נקודות הקיצון המקומיות והמוחלטות של הפונקציה $y=x^3-12x$ בכל הישר הממשי.`,
      hints: [
        String.raw`$y'=3x^2-12=3(x-2)(x+2)$.`,
        String.raw`בנו טבלת סימנים ל-$y'$. כדי לבדוק קיצון מוחלט – בדקו לאן הפונקציה שואפת כש-$x\to\pm\infty$.`,
      ],
      solutionSteps: [
        String.raw`$y'=3x^2-12=3(x-2)(x+2)$, ולכן $y'=0$ ב-$x=-2$ וב-$x=2$.`,
        String.raw`סימן $y'$: חיובי עבור $x<-2$, שלילי עבור $-2<x<2$, חיובי עבור $x>2$.`,
        String.raw`ב-$x=-2$ הנגזרת עוברת מ-$+$ ל-$-$: מקסימום מקומי, $y(-2)=-8+24=16$.`,
        String.raw`ב-$x=2$ הנגזרת עוברת מ-$-$ ל-$+$: מינימום מקומי, $y(2)=8-24=-16$.`,
        String.raw`כש-$x\to\infty$ גם $y\to\infty$, וכש-$x\to-\infty$ גם $y\to-\infty$, ולכן אין לפונקציה קיצון מוחלט.`,
      ],
      finalAnswer: String.raw`מקסימום מקומי $(-2,16)$, מינימום מקומי $(2,-16)$; אין קיצון מוחלט.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המקסימום המקומי`, value: -2 },
        { label: String.raw`שיעור ה-$y$ של המקסימום המקומי`, value: 16 },
        { label: String.raw`שיעור ה-$x$ של המינימום המקומי`, value: 2 },
        { label: String.raw`שיעור ה-$y$ של המינימום המקומי`, value: -16 },
      ],
      source: s43(130),
    },
    {
      id: 'calc-extrema-monotonic-os3',
      difficulty: 2,
      statement: String.raw`מצאו את הנקודות החשודות לקיצון של הפונקציה $y=4\sqrt x-x^2$ (נקודות פנימיות בתחום ההגדרה שבהן $y'=0$ או ש-$y'$ אינה מוגדרת), וקבעו את סוגן.`,
      hints: [
        String.raw`תחום ההגדרה: $x\ge0$; הנקודה $x=0$ היא קצה התחום ולא נקודה פנימית.`,
        String.raw`$y'=\frac{2}{\sqrt x}-2x$ עבור $x>0$. השוו לאפס והכפילו ב-$\sqrt x$.`,
      ],
      solutionSteps: [
        String.raw`תחום ההגדרה: $x\ge0$. עבור $x>0$: $y'=4\cdot\frac{1}{2\sqrt x}-2x=\frac{2}{\sqrt x}-2x$, והיא מוגדרת בכל נקודה פנימית.`,
        String.raw`$y'=0\iff\frac2{\sqrt x}=2x\iff x\sqrt x=1\iff x^{3/2}=1\iff x=1$.`,
        String.raw`סימן: $y'(0.25)=4-0.5>0$ ו-$y'(4)=1-8<0$, ולכן הנגזרת עוברת ב-$x=1$ מ-$+$ ל-$-$.`,
        String.raw`לכן $x=1$ היא נקודת מקסימום: $y(1)=4-1=3$, הנקודה $(1,3)$ (והיא גם המקסימום המוחלט).`,
      ],
      finalAnswer: String.raw`$x=1$ – נקודת מקסימום $(1,3)$.`,
      answers: [
        { label: String.raw`הנקודה החשודה $x$`, value: 1 },
        { label: String.raw`ערך הפונקציה בה`, value: 3 },
      ],
      source: s43(109),
    },
    {
      id: 'calc-extrema-monotonic-os4',
      difficulty: 2,
      statement: String.raw`מצאו את נקודות הקיצון המקומיות והמוחלטות של הפונקציה $y=3x^4+8x^3-18x^2$ בכל הישר הממשי.`,
      hints: [
        String.raw`$y'=12x^3+24x^2-36x=12x(x^2+2x-3)$ – פרקו את הטרינום.`,
        String.raw`למעלה $4$ עם מקדם מוביל חיובי: $y\to\infty$ בשני הכיוונים, ולכן יש מינימום מוחלט ואין מקסימום מוחלט.`,
      ],
      solutionSteps: [
        String.raw`$y'=12x^3+24x^2-36x=12x(x+3)(x-1)$, ולכן הנקודות החשודות הן $x=-3,\ 0,\ 1$.`,
        String.raw`סימן $y'$: שלילי עבור $x<-3$, חיובי עבור $-3<x<0$, שלילי עבור $0<x<1$, חיובי עבור $x>1$.`,
        String.raw`ב-$x=-3$: מינימום מקומי, $y(-3)=243-216-162=-135$. ב-$x=0$: מקסימום מקומי, $y(0)=0$. ב-$x=1$: מינימום מקומי, $y(1)=3+8-18=-7$.`,
        String.raw`$y\to\infty$ כש-$x\to\pm\infty$, ולכן הערך הקטן ביותר הוא הקטן מבין המינימומים המקומיים: $-135$ – מינימום מוחלט ב-$x=-3$. אין מקסימום מוחלט.`,
      ],
      finalAnswer: String.raw`מינימום מוחלט (וגם מקומי) $(-3,-135)$; מקסימום מקומי $(0,0)$; מינימום מקומי $(1,-7)$; אין מקסימום מוחלט.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המינימום המוחלט`, value: -3 },
        { label: String.raw`הערך המינימלי המוחלט`, value: -135 },
        { label: String.raw`שיעור ה-$x$ של המקסימום המקומי`, value: 0 },
        { label: String.raw`שיעור ה-$y$ של המינימום המקומי השני (ב-$x=1$)`, value: -7 },
      ],
      source: s43(131),
    },
    {
      id: 'calc-extrema-monotonic-os5',
      difficulty: 2,
      statement: String.raw`מצאו את נקודות הקיצון המקומיות של הפונקציה $y=\frac{x^2+x+6}{x-1}$ וקבעו את סוגן.`,
      hints: [
        String.raw`תחום ההגדרה: $x\ne1$. גזרו לפי נוסחת המנה ופשטו את המונה.`,
        String.raw`$y'=\frac{x^2-2x-7}{(x-1)^2}$; המכנה חיובי, ולכן הסימן נקבע לפי המונה.`,
      ],
      solutionSteps: [
        String.raw`$y'=\frac{(2x+1)(x-1)-(x^2+x+6)}{(x-1)^2}=\frac{x^2-2x-7}{(x-1)^2}$.`,
        String.raw`$x^2-2x-7=0\Rightarrow x=\frac{2\pm\sqrt{32}}{2}=1\pm2\sqrt2$.`,
        String.raw`המונה חיובי מחוץ לשורשים ושלילי ביניהם, ולכן $y$ עולה עבור $x<1-2\sqrt2$, יורדת עבור $1-2\sqrt2<x<1$ ועבור $1<x<1+2\sqrt2$, ועולה עבור $x>1+2\sqrt2$.`,
        String.raw`ב-$x=1-2\sqrt2$ מקסימום מקומי: נסמן $u=x-1=-2\sqrt2$, אז $x^2+x+6=u^2+3u+8=16-6\sqrt2$ ו-$y=\frac{16-6\sqrt2}{-2\sqrt2}=3-4\sqrt2$.`,
        String.raw`ב-$x=1+2\sqrt2$ מינימום מקומי, ובאותו אופן $y=3+4\sqrt2$. (ערך המקסימום קטן מערך המינימום – זה אפשרי כי הם בענפים שונים של הגרף, משני צדי האסימפטוטה $x=1$.)`,
      ],
      finalAnswer: String.raw`מקסימום מקומי $\left(1-2\sqrt2,\ 3-4\sqrt2\right)$, מינימום מקומי $\left(1+2\sqrt2,\ 3+4\sqrt2\right)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המקסימום`, value: 1 - 2 * Math.SQRT2 },
        { label: String.raw`שיעור ה-$y$ של המקסימום`, value: 3 - 4 * Math.SQRT2 },
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: 1 + 2 * Math.SQRT2 },
        { label: String.raw`שיעור ה-$y$ של המינימום`, value: 3 + 4 * Math.SQRT2 },
      ],
      source: s43(133),
    },
    {
      id: 'calc-extrema-monotonic-os6',
      difficulty: 3,
      statement: String.raw`מצאו את נקודות הקיצון המקומיות והמוחלטות של הפונקציה $y=12x^5+45x^4+20x^3-90x^2-120x+3$. (אפשר להיעזר בשרטוט במחשבון גרפי, אבל מצאו את התשובות באופן מדויק.)`,
      hints: [
        String.raw`$y'=60\left(x^4+3x^3+x^2-3x-2\right)$. נחשו שורשים שלמים מבין המחלקים של $2$.`,
        String.raw`$x=1$, $x=-1$ ו-$x=-2$ הם שורשים, ואחד מהם כפול.`,
        String.raw`שורש כפול של $y'$ אינו משנה את סימנה – בנקודה כזו אין קיצון.`,
      ],
      solutionSteps: [
        String.raw`$y'=60x^4+180x^3+60x^2-180x-120=60\left(x^4+3x^3+x^2-3x-2\right)$.`,
        String.raw`הצבה מראה ש-$x=1,-1,-2$ מאפסים את הסוגריים; מכפלת השורשים היא $-2$, ולכן השורש הרביעי הוא שוב $-1$: $y'=60(x-1)(x+1)^2(x+2)$.`,
        String.raw`$(x+1)^2\ge0$, ולכן סימן $y'$ הוא סימן $(x-1)(x+2)$: חיובי עבור $x<-2$, שלילי עבור $-2<x<1$ (גם משני צדי $x=-1$), חיובי עבור $x>1$.`,
        String.raw`ב-$x=-2$ מקסימום מקומי: $y(-2)=-384+720-160-360+240+3=59$.`,
        String.raw`ב-$x=1$ מינימום מקומי: $y(1)=12+45+20-90-120+3=-130$. ב-$x=-1$ הנגזרת מתאפסת בלי להחליף סימן – אין שם קיצון.`,
        String.raw`זה פולינום ממעלה אי-זוגית ($y\to\pm\infty$), ולכן אין לו קיצון מוחלט.`,
      ],
      finalAnswer: String.raw`מקסימום מקומי $(-2,59)$, מינימום מקומי $(1,-130)$; ב-$x=-1$ אין קיצון; אין קיצון מוחלט.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המקסימום המקומי`, value: -2 },
        { label: String.raw`שיעור ה-$y$ של המקסימום המקומי`, value: 59 },
        { label: String.raw`שיעור ה-$x$ של המינימום המקומי`, value: 1 },
        { label: String.raw`שיעור ה-$y$ של המינימום המקומי`, value: -130 },
      ],
      source: s43(137),
    },
  ],
  'calc-absolute-extrema': [
    {
      id: 'calc-absolute-extrema-os1',
      difficulty: 1,
      statement: String.raw`מצאו את נקודות הקיצון המקומיות והמוחלטות של הפונקציה $f(x)=x^2+3$ בקטע $[-1,4]$.`,
      hints: [
        String.raw`מצאו את הנקודות החשודות בתוך הקטע, ואז השוו את ערכי הפונקציה בהן ובקצוות.`,
        String.raw`$f'(x)=2x$.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=2x=0\iff x=0$, והנקודה בתוך הקטע.`,
        String.raw`ערכים: $f(-1)=4$, $f(0)=3$, $f(4)=19$.`,
        String.raw`$f$ יורדת ב-$[-1,0]$ ועולה ב-$[0,4]$: ב-$x=0$ מינימום (מקומי ומוחלט) $3$; בקצה $x=-1$ מקסימום מקומי (קצה) $4$; בקצה $x=4$ מקסימום מוחלט $19$.`,
      ],
      finalAnswer: String.raw`מינימום מוחלט $(0,3)$; מקסימום מוחלט $(4,19)$; מקסימום מקומי בקצה $(-1,4)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המינימום המוחלט`, value: 0 },
        { label: String.raw`הערך המינימלי`, value: 3 },
        { label: String.raw`שיעור ה-$x$ של המקסימום המוחלט`, value: 4 },
        { label: String.raw`הערך המקסימלי`, value: 19 },
      ],
      source: s43(118),
    },
    {
      id: 'calc-absolute-extrema-os2',
      difficulty: 2,
      statement: String.raw`מצאו את נקודות הקיצון המוחלטות של הפונקציה $y=x^2+\frac{2}{x}$ בקטע $[1,4]$.`,
      hints: [
        String.raw`$y'=2x-\frac{2}{x^2}=\frac{2(x^3-1)}{x^2}$.`,
        String.raw`מה סימן הנגזרת בתוך הקטע $1<x\le4$?`,
      ],
      solutionSteps: [
        String.raw`$y'=2x-\frac2{x^2}=\frac{2(x^3-1)}{x^2}$, והיא מתאפסת רק ב-$x=1$ – קצה הקטע.`,
        String.raw`עבור $1<x\le4$: $x^3>1$, ולכן $y'>0$ והפונקציה עולה בכל הקטע.`,
        String.raw`לכן המינימום המוחלט בקצה השמאלי: $y(1)=1+2=3$, והמקסימום המוחלט בקצה הימני: $y(4)=16+\frac12=\frac{33}{2}$.`,
      ],
      finalAnswer: String.raw`מינימום מוחלט $(1,3)$; מקסימום מוחלט $\left(4,\frac{33}{2}\right)$.`,
      answers: [
        { label: String.raw`הערך המינימלי`, value: 3 },
        { label: String.raw`שיעור ה-$x$ של המקסימום`, value: 4 },
        { label: String.raw`הערך המקסימלי`, value: 16.5 },
      ],
      source: s43(119),
    },
    {
      id: 'calc-absolute-extrema-os3',
      difficulty: 2,
      statement: String.raw`מצאו את נקודות הקיצון המקומיות והמוחלטות של הפונקציה $y=\left(x-x^2\right)^2$ בקטע $[-1,1]$.`,
      hints: [
        String.raw`$y'=2\left(x-x^2\right)(1-2x)=2x(1-x)(1-2x)$.`,
        String.raw`חשבו את ערכי הפונקציה בנקודות החשודות $0,\ \frac12,\ 1$ ובקצה $-1$.`,
      ],
      solutionSteps: [
        String.raw`לפי כלל השרשרת: $y'=2\left(x-x^2\right)(1-2x)=2x(1-x)(1-2x)$, ולכן הנקודות החשודות הן $x=0,\ \frac12,\ 1$.`,
        String.raw`סימן $y'$ בקטע: שלילי ב-$(-1,0)$, חיובי ב-$\left(0,\frac12\right)$, שלילי ב-$\left(\frac12,1\right)$.`,
        String.raw`ערכים: $y(-1)=(-1-1)^2=4$, $y(0)=0$, $y\left(\frac12\right)=\left(\frac14\right)^2=\frac1{16}$, $y(1)=0$.`,
        String.raw`מקסימום מוחלט $4$ בקצה $x=-1$; מינימום מוחלט $0$ ב-$x=0$ וב-$x=1$; מקסימום מקומי $\left(\frac12,\frac1{16}\right)$.`,
      ],
      finalAnswer: String.raw`מקסימום מוחלט $(-1,4)$; מינימום מוחלט $(0,0)$ ו-$(1,0)$; מקסימום מקומי $\left(\frac12,\frac1{16}\right)$.`,
      answers: [
        { label: String.raw`הערך המקסימלי המוחלט`, value: 4 },
        { label: String.raw`הערך המינימלי המוחלט`, value: 0 },
        { label: String.raw`שיעור ה-$y$ של המקסימום המקומי (ב-$x=\frac12$)`, value: 1 / 16 },
      ],
      source: s43(120),
    },
    {
      id: 'calc-absolute-extrema-os4',
      difficulty: 2,
      statement: String.raw`מצאו את הנקודות החשודות לקיצון ואת נקודות הקיצון המקומיות והמוחלטות של הפונקציה $f(x)=3x^4-4x^3-12x^2+6$ בקטע $[-3,3]$.`,
      hints: [
        String.raw`$f'(x)=12x^3-12x^2-24x=12x(x^2-x-2)$.`,
        String.raw`השוו את ערכי $f$ בשלוש הנקודות החשודות ובשני הקצוות.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=12x(x^2-x-2)=12x(x-2)(x+1)$, ולכן הנקודות החשודות (כולן בקטע) הן $x=-1,\ 0,\ 2$.`,
        String.raw`סימן $f'$: שלילי ב-$(-3,-1)$, חיובי ב-$(-1,0)$, שלילי ב-$(0,2)$, חיובי ב-$(2,3)$.`,
        String.raw`ערכים: $f(-3)=243+108-108+6=249$, $f(-1)=3+4-12+6=1$, $f(0)=6$, $f(2)=48-32-48+6=-26$, $f(3)=243-108-108+6=33$.`,
        String.raw`קיצון מקומי: מינימום $(-1,1)$, מקסימום $(0,6)$, מינימום $(2,-26)$, ובקצוות מקסימום $(-3,249)$ ו-$(3,33)$.`,
        String.raw`השוואת כל הערכים: המקסימום המוחלט $249$ ב-$x=-3$ והמינימום המוחלט $-26$ ב-$x=2$.`,
      ],
      finalAnswer: String.raw`נקודות חשודות $x=-1,0,2$. מקסימום מוחלט $(-3,249)$, מינימום מוחלט $(2,-26)$; מקומיים: $(-1,1)$ מינימום, $(0,6)$ מקסימום, $(3,33)$ מקסימום בקצה.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המקסימום המוחלט`, value: -3 },
        { label: String.raw`הערך המקסימלי`, value: 249 },
        { label: String.raw`שיעור ה-$x$ של המינימום המוחלט`, value: 2 },
        { label: String.raw`הערך המינימלי`, value: -26 },
      ],
      source: review4(534),
    },
    {
      id: 'calc-absolute-extrema-os5',
      difficulty: 3,
      statement: String.raw`מצאו את נקודות הקיצון המוחלטות של הפונקציה $y=\frac{1}{x-x^2}$ בקטע הפתוח $(0,1)$.`,
      hints: [
        String.raw`$y=\left(x-x^2\right)^{-1}$, ולכן $y'=-\frac{1-2x}{\left(x-x^2\right)^2}$.`,
        String.raw`בקטע פתוח אין קצוות להשוות; בדקו לאן $y$ שואפת כש-$x\to0^+$ וכש-$x\to1^-$.`,
      ],
      solutionSteps: [
        String.raw`בקטע $(0,1)$: $x-x^2=x(1-x)>0$, ולכן הפונקציה מוגדרת וחיובית.`,
        String.raw`$y'=-\frac{1-2x}{\left(x-x^2\right)^2}$, ו-$y'=0\iff x=\frac12$.`,
        String.raw`עבור $x<\frac12$: $y'<0$ (יורדת), ועבור $x>\frac12$: $y'>0$ (עולה). לכן ב-$x=\frac12$ מינימום: $y\left(\frac12\right)=\frac{1}{\frac14}=4$.`,
        String.raw`כש-$x\to0^+$ או $x\to1^-$ המכנה שואף ל-$0^+$ ו-$y\to\infty$, ולכן אין מקסימום מוחלט.`,
      ],
      finalAnswer: String.raw`מינימום מוחלט $\left(\frac12,4\right)$; אין מקסימום מוחלט.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המינימום המוחלט`, value: 0.5 },
        { label: String.raw`הערך המינימלי`, value: 4 },
      ],
      source: s43(121),
    },
    {
      id: 'calc-absolute-extrema-os6',
      difficulty: 3,
      statement: String.raw`מצאו את נקודות הקיצון המוחלטות של הפונקציה $y=\sqrt x-\sqrt{x^3}$ בקטע $[0,4]$.`,
      hints: [
        String.raw`כתבו $y=x^{1/2}-x^{3/2}$ וגזרו לפי כלל החזקה.`,
        String.raw`$y'=\frac{1}{2\sqrt x}-\frac32\sqrt x=\frac{1-3x}{2\sqrt x}$.`,
      ],
      solutionSteps: [
        String.raw`$y=x^{1/2}-x^{3/2}$, ולכן עבור $x>0$: $y'=\frac1{2\sqrt x}-\frac32\sqrt x=\frac{1-3x}{2\sqrt x}$.`,
        String.raw`$y'=0\iff x=\frac13$; הנגזרת חיובית עבור $0<x<\frac13$ ושלילית עבור $\frac13<x<4$.`,
        String.raw`$y\left(\frac13\right)=\sqrt{\frac13}\left(1-\frac13\right)=\frac{2}{3\sqrt3}=\frac{2\sqrt3}{9}\approx0.385$.`,
        String.raw`בקצוות: $y(0)=0$ ו-$y(4)=2-8=-6$.`,
        String.raw`לכן המקסימום המוחלט $\frac{2\sqrt3}{9}$ ב-$x=\frac13$ והמינימום המוחלט $-6$ בקצה $x=4$.`,
      ],
      finalAnswer: String.raw`מקסימום מוחלט $\left(\frac13,\frac{2\sqrt3}{9}\right)$; מינימום מוחלט $(4,-6)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המקסימום`, value: 1 / 3 },
        { label: String.raw`הערך המקסימלי`, value: (2 * Math.sqrt(3)) / 9 },
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: 4 },
        { label: String.raw`הערך המינימלי`, value: -6 },
      ],
      source: s43(126),
    },
  ],
  'calc-asymptotes': [
    {
      id: 'calc-asymptotes-os1',
      difficulty: 1,
      statement: String.raw`מצאו את האסימפטוטות האופקיות והאנכיות של הפונקציה $f(x)=\frac{1}{1-x^2}$.`,
      hints: [
        String.raw`אסימפטוטה אנכית – באפסי המכנה שבהם המונה אינו מתאפס.`,
        String.raw`מעלת המונה קטנה ממעלת המכנה – מה קורה ל-$f$ כש-$x\to\pm\infty$?`,
      ],
      solutionSteps: [
        String.raw`$1-x^2=0\iff x=\pm1$, והמונה $1\ne0$, ולכן $|f(x)|\to\infty$ כש-$x\to\pm1$: אסימפטוטות אנכיות $x=-1$ ו-$x=1$.`,
        String.raw`כש-$x\to\pm\infty$ המכנה שואף ל-$-\infty$ והמונה קבוע, ולכן $f(x)\to0$: אסימפטוטה אופקית $y=0$.`,
      ],
      finalAnswer: String.raw`אנכיות: $x=-1$, $x=1$; אופקית: $y=0$.`,
      answers: [
        { label: String.raw`אסימפטוטה אנכית שמאלית $x=$`, value: -1 },
        { label: String.raw`אסימפטוטה אנכית ימנית $x=$`, value: 1 },
        { label: String.raw`אסימפטוטה אופקית $y=$`, value: 0 },
      ],
      source: s46(272),
    },
    {
      id: 'calc-asymptotes-os2',
      difficulty: 1,
      statement: String.raw`מצאו את האסימפטוטות האופקיות והאנכיות של הפונקציה $f(x)=\frac{x^2+3}{x^2+1}$.`,
      hints: [
        String.raw`האם המכנה מתאפס אי-פעם?`,
        String.raw`המעלות של המונה והמכנה שוות – חלקו מונה ומכנה ב-$x^2$.`,
      ],
      solutionSteps: [
        String.raw`$x^2+1\ge1>0$ לכל $x$, ולכן הפונקציה מוגדרת לכל $x$ ואין אסימפטוטה אנכית.`,
        String.raw`$f(x)=\frac{1+\frac3{x^2}}{1+\frac1{x^2}}\to\frac11=1$ כש-$x\to\pm\infty$: אסימפטוטה אופקית $y=1$.`,
      ],
      finalAnswer: String.raw`אין אסימפטוטה אנכית; אסימפטוטה אופקית $y=1$.`,
      answers: [{ label: String.raw`אסימפטוטה אופקית $y=$`, value: 1 }],
      source: s46(274),
    },
    {
      id: 'calc-asymptotes-os3',
      difficulty: 2,
      statement: String.raw`מצאו את האסימפטוטות האופקיות והאנכיות של הפונקציה $f(x)=\frac{1}{x^3+x^2}$.`,
      hints: [String.raw`פרקו את המכנה: $x^3+x^2=x^2(x+1)$.`],
      solutionSteps: [
        String.raw`$x^3+x^2=x^2(x+1)=0\iff x=0$ או $x=-1$, והמונה $1\ne0$: אסימפטוטות אנכיות $x=0$ ו-$x=-1$.`,
        String.raw`מעלת המונה ($0$) קטנה ממעלת המכנה ($3$), ולכן $f(x)\to0$ כש-$x\to\pm\infty$: אסימפטוטה אופקית $y=0$.`,
      ],
      finalAnswer: String.raw`אנכיות: $x=-1$, $x=0$; אופקית: $y=0$.`,
      answers: [
        { label: String.raw`אסימפטוטה אנכית שמאלית $x=$`, value: -1 },
        { label: String.raw`אסימפטוטה אנכית ימנית $x=$`, value: 0 },
        { label: String.raw`אסימפטוטה אופקית $y=$`, value: 0 },
      ],
      source: s46(279),
    },
    {
      id: 'calc-asymptotes-os4',
      difficulty: 2,
      statement: String.raw`מצאו את האסימפטוטות האופקיות והאנכיות של הפונקציה $f(x)=\frac{x^3+1}{x^3-1}$.`,
      hints: [
        String.raw`המכנה מתאפס רק ב-$x=1$. מה ערך המונה שם?`,
        String.raw`המעלות שוות – היחס בין המקדמים המובילים.`,
      ],
      solutionSteps: [
        String.raw`$x^3-1=0\iff x=1$, ובנקודה זו המונה $1+1=2\ne0$: אסימפטוטה אנכית $x=1$.`,
        String.raw`$f(x)=\frac{1+\frac1{x^3}}{1-\frac1{x^3}}\to1$ כש-$x\to\pm\infty$: אסימפטוטה אופקית $y=1$.`,
      ],
      finalAnswer: String.raw`אנכית: $x=1$; אופקית: $y=1$.`,
      answers: [
        { label: String.raw`אסימפטוטה אנכית $x=$`, value: 1 },
        { label: String.raw`אסימפטוטה אופקית $y=$`, value: 1 },
      ],
      source: s46(281),
    },
    {
      id: 'calc-asymptotes-os5',
      difficulty: 2,
      statement: String.raw`נתונה הפונקציה $f(x)=\frac{x+1}{x^2+5x+4}$. קבעו אם לגרף הפונקציה יש אסימפטוטה ב-$x=a$ עבור $a=-1$. נמקו בלי להיעזר בשרטוט במחשבון.`,
      hints: [
        String.raw`פרקו את המכנה לגורמים וחפשו גורם משותף עם המונה.`,
        String.raw`חשבו את הגבול של $f(x)$ כש-$x\to-1$. אם הוא סופי – אין שם אסימפטוטה.`,
      ],
      solutionSteps: [
        String.raw`$x^2+5x+4=(x+1)(x+4)$, ולכן תחום ההגדרה הוא $x\ne-1,\ -4$.`,
        String.raw`עבור $x\ne-1$ אפשר לצמצם: $f(x)=\frac{x+1}{(x+1)(x+4)}=\frac{1}{x+4}$.`,
        String.raw`לכן $\lim_{x\to-1}f(x)=\frac1{-1+4}=\frac13$ – גבול סופי. הפונקציה אינה שואפת לאינסוף, ולכן ב-$x=-1$ **אין** אסימפטוטה; בגרף יש שם ״חור״ – הנקודה $\left(-1,\frac13\right)$ חסרה.`,
        String.raw`(האסימפטוטה האנכית היחידה היא $x=-4$, שבה רק המכנה מתאפס.)`,
      ],
      finalAnswer: String.raw`אין אסימפטוטה ב-$x=-1$: $\lim_{x\to-1}f(x)=\frac13$ (נקודה חסרה בגרף). האסימפטוטה האנכית היא $x=-4$.`,
      answers: [
        { label: String.raw`$\lim_{x\to-1}f(x)$`, value: 1 / 3 },
        { label: String.raw`האסימפטוטה האנכית $x=$`, value: -4 },
      ],
      source: s46(256),
    },
    {
      id: 'calc-asymptotes-os6',
      difficulty: 2,
      statement: String.raw`מצאו את האסימפטוטות המקבילות לצירים של הפונקציה $f(x)=\frac{x+1}{x^2+7x+6}$. (במקור: הערכה בעזרת שרטוט במחשבון גרפי ואחר כך חישוב מדויק.)`,
      hints: [
        String.raw`פרקו: $x^2+7x+6=(x+1)(x+6)$. באחד מאפסי המכנה גם המונה מתאפס.`,
        String.raw`מעלת המונה קטנה ממעלת המכנה.`,
      ],
      solutionSteps: [
        String.raw`$x^2+7x+6=(x+1)(x+6)$, ולכן תחום ההגדרה $x\ne-1,\ -6$, ועבור $x$ בתחום $f(x)=\frac1{x+6}$.`,
        String.raw`ב-$x=-6$ המונה $-5\ne0$ ו-$|f|\to\infty$: אסימפטוטה אנכית $x=-6$.`,
        String.raw`ב-$x=-1$ הגבול סופי ($\frac15$), ולכן אין שם אסימפטוטה (נקודה חסרה בלבד).`,
        String.raw`$f(x)=\frac1{x+6}\to0$ כש-$x\to\pm\infty$: אסימפטוטה אופקית $y=0$.`,
      ],
      finalAnswer: String.raw`אנכית: $x=-6$ (ב-$x=-1$ אין אסימפטוטה); אופקית: $y=0$.`,
      answers: [
        { label: String.raw`אסימפטוטה אנכית $x=$`, value: -6 },
        { label: String.raw`אסימפטוטה אופקית $y=$`, value: 0 },
      ],
      source: s46(290),
    },
  ],
  'calc-concavity': [
    {
      id: 'calc-concavity-os1',
      difficulty: 1,
      statement: String.raw`נתונה הפונקציה $f(x)=x^3-4x^2+x+2$. מצאו:

א. את התחומים שבהם $f$ קעורה כלפי מעלה ואת התחומים שבהם היא קעורה כלפי מטה.

ב. את נקודות הפיתול של $f$.`,
      hints: [
        String.raw`$f''(x)=6x-8$.`,
        String.raw`$f''>0$ – קעורה כלפי מעלה ($\cup$), $f''<0$ – קעורה כלפי מטה ($\cap$).`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=3x^2-8x+1$ ו-$f''(x)=6x-8$.`,
        String.raw`$f''(x)>0\iff x>\frac43$: קעורה כלפי מעלה; $f''(x)<0\iff x<\frac43$: קעורה כלפי מטה.`,
        String.raw`$f''$ מחליפה סימן ב-$x=\frac43$, ולכן זו נקודת פיתול: $f\left(\frac43\right)=\frac{64}{27}-\frac{64}{9}+\frac43+2=-\frac{38}{27}$.`,
      ],
      finalAnswer: String.raw`קעורה כלפי מטה ב-$x<\frac43$, כלפי מעלה ב-$x>\frac43$; נקודת פיתול $\left(\frac43,-\frac{38}{27}\right)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של נקודת הפיתול`, value: 4 / 3 },
        { label: String.raw`שיעור ה-$y$ של נקודת הפיתול`, value: -38 / 27 },
      ],
      source: s45(223),
    },
    {
      id: 'calc-concavity-os2',
      difficulty: 2,
      statement: String.raw`נתונה הפונקציה $f(x)=x+x^2-x^3$. מצאו:

א. את תחומי העלייה והירידה של $f$;

ב. את נקודות הקיצון המקומיות;

ג. את תחומי הקעירות כלפי מעלה וכלפי מטה;

ד. את נקודות הפיתול.`,
      hints: [
        String.raw`$f'(x)=1+2x-3x^2=-(3x+1)(x-1)$.`,
        String.raw`$f''(x)=2-6x$.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=1+2x-3x^2=-(3x+1)(x-1)$, ולכן $f'=0$ ב-$x=-\frac13$ וב-$x=1$.`,
        String.raw`$f'$ היא פרבולה ״בוכה״: שלילית עבור $x<-\frac13$ ועבור $x>1$ (יורדת), חיובית עבור $-\frac13<x<1$ (עולה).`,
        String.raw`מינימום מקומי ב-$x=-\frac13$: $f=-\frac13+\frac19+\frac1{27}=-\frac{5}{27}$. מקסימום מקומי ב-$x=1$: $f(1)=1+1-1=1$.`,
        String.raw`$f''(x)=2-6x$: חיובית עבור $x<\frac13$ (קעורה כלפי מעלה) ושלילית עבור $x>\frac13$ (קעורה כלפי מטה).`,
        String.raw`נקודת פיתול ב-$x=\frac13$: $f\left(\frac13\right)=\frac13+\frac19-\frac1{27}=\frac{11}{27}$.`,
      ],
      finalAnswer: String.raw`יורדת ב-$x<-\frac13$ וב-$x>1$, עולה ב-$-\frac13<x<1$; מינימום $\left(-\frac13,-\frac5{27}\right)$, מקסימום $(1,1)$; $\cup$ ב-$x<\frac13$, $\cap$ ב-$x>\frac13$; פיתול $\left(\frac13,\frac{11}{27}\right)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: -1 / 3 },
        { label: String.raw`שיעור ה-$y$ של המינימום`, value: -5 / 27 },
        { label: String.raw`שיעור ה-$x$ של המקסימום`, value: 1 },
        { label: String.raw`שיעור ה-$y$ של המקסימום`, value: 1 },
        { label: String.raw`שיעור ה-$x$ של נקודת הפיתול`, value: 1 / 3 },
        { label: String.raw`שיעור ה-$y$ של נקודת הפיתול`, value: 11 / 27 },
      ],
      source: s45(228),
    },
    {
      id: 'calc-concavity-os3',
      difficulty: 2,
      statement: String.raw`נתונה הפונקציה $f(x)=x^3+x^4$. מצאו:

א. את תחומי העלייה והירידה של $f$;

ב. את נקודות הקיצון המקומיות;

ג. את תחומי הקעירות כלפי מעלה וכלפי מטה;

ד. את נקודות הפיתול.`,
      hints: [
        String.raw`$f'(x)=3x^2+4x^3=x^2(4x+3)$. האם $f'$ מחליפה סימן ב-$x=0$?`,
        String.raw`$f''(x)=6x+12x^2=6x(2x+1)$.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=x^2(4x+3)$, ו-$x^2\ge0$, ולכן סימן $f'$ הוא סימן $4x+3$: יורדת עבור $x<-\frac34$ ועולה עבור $x>-\frac34$.`,
        String.raw`מינימום ב-$x=-\frac34$: $f\left(-\frac34\right)=-\frac{27}{64}+\frac{81}{256}=-\frac{27}{256}$. ב-$x=0$ הנגזרת מתאפסת בלי להחליף סימן – אין קיצון.`,
        String.raw`$f''(x)=6x(2x+1)$: חיובית עבור $x<-\frac12$ ועבור $x>0$ (קעורה כלפי מעלה), שלילית עבור $-\frac12<x<0$ (קעורה כלפי מטה).`,
        String.raw`$f''$ מחליפה סימן ב-$x=-\frac12$ וב-$x=0$: נקודות פיתול $\left(-\frac12,-\frac1{16}\right)$ ו-$(0,0)$. ב-$(0,0)$ המשיק אופקי – נקודת פיתול עם משיק אופקי.`,
      ],
      finalAnswer: String.raw`יורדת ב-$x<-\frac34$, עולה ב-$x>-\frac34$; מינימום $\left(-\frac34,-\frac{27}{256}\right)$; $\cup$ ב-$x<-\frac12$ וב-$x>0$, $\cap$ ב-$-\frac12<x<0$; פיתול $\left(-\frac12,-\frac1{16}\right)$ ו-$(0,0)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: -0.75 },
        { label: String.raw`שיעור ה-$y$ של המינימום`, value: -27 / 256 },
        { label: String.raw`שיעור ה-$x$ של נקודת הפיתול השמאלית`, value: -0.5 },
        { label: String.raw`שיעור ה-$x$ של נקודת הפיתול הימנית`, value: 0 },
      ],
      source: s45(230),
    },
    {
      id: 'calc-concavity-os4',
      difficulty: 2,
      statement: String.raw`נתונה הפונקציה $f(x)=\frac{1}{1-x}$, $x\ne1$. מצאו:

א. את תחומי העלייה והירידה של $f$;

ב. את נקודות הקיצון המקומיות;

ג. את תחומי הקעירות כלפי מעלה וכלפי מטה;

ד. את נקודות הפיתול.`,
      hints: [
        String.raw`$f(x)=(1-x)^{-1}$, ולכן $f'(x)=\frac{1}{(1-x)^2}$ ו-$f''(x)=\frac{2}{(1-x)^3}$.`,
        String.raw`נקודת פיתול חייבת להיות בתחום ההגדרה.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=-(1-x)^{-2}\cdot(-1)=\frac1{(1-x)^2}>0$ לכל $x\ne1$: הפונקציה עולה ב-$x<1$ וב-$x>1$.`,
        String.raw`הנגזרת אינה מתאפסת, ולכן אין נקודות קיצון מקומיות.`,
        String.raw`$f''(x)=\frac{2}{(1-x)^3}$: חיובית עבור $x<1$ (קעורה כלפי מעלה) ושלילית עבור $x>1$ (קעורה כלפי מטה).`,
        String.raw`הקעירות מתחלפת רק משני צדי $x=1$, שאינו בתחום ההגדרה (שם אסימפטוטה אנכית), ולכן אין נקודות פיתול.`,
      ],
      finalAnswer: String.raw`עולה ב-$x<1$ וב-$x>1$; אין קיצון; $\cup$ ב-$x<1$, $\cap$ ב-$x>1$; אין נקודות פיתול.`,
      source: s45(235),
    },
    {
      id: 'calc-concavity-os5',
      difficulty: 3,
      statement: String.raw`נתונה הפונקציה $f(x)=x^{11}-6x^{10}$. מצאו:

א. את תחומי העלייה והירידה של $f$;

ב. את שיעורי ה-$x$ של נקודות הקיצון המקומיות;

ג. את תחומי הקעירות כלפי מעלה וכלפי מטה;

ד. את שיעורי ה-$x$ של נקודות הפיתול.`,
      hints: [
        String.raw`$f'(x)=11x^{10}-60x^9=x^9(11x-60)$ – לחזקה אי-זוגית $x^9$ יש אותו סימן כמו ל-$x$.`,
        String.raw`$f''(x)=110x^9-540x^8=10x^8(11x-54)$ – לחזקה זוגית $x^8$ אין שינוי סימן.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=x^9(11x-60)$. עבור $x<0$: שני הגורמים שליליים, $f'>0$; עבור $0<x<\frac{60}{11}$: $f'<0$; עבור $x>\frac{60}{11}$: $f'>0$.`,
        String.raw`לכן $f$ עולה ב-$x<0$ וב-$x>\frac{60}{11}$ ויורדת ב-$0<x<\frac{60}{11}$: מקסימום מקומי ב-$x=0$ ($f(0)=0$) ומינימום מקומי ב-$x=\frac{60}{11}$.`,
        String.raw`$f''(x)=10x^8(11x-54)$, ו-$x^8\ge0$, ולכן סימן $f''$ הוא סימן $11x-54$: קעורה כלפי מטה ב-$x<\frac{54}{11}$ וכלפי מעלה ב-$x>\frac{54}{11}$.`,
        String.raw`נקודת פיתול רק ב-$x=\frac{54}{11}$. ב-$x=0$ גם $f''=0$, אבל $f''$ אינה מחליפה בה סימן, ולכן זו **אינה** נקודת פיתול.`,
      ],
      finalAnswer: String.raw`עולה ב-$x<0$ וב-$x>\frac{60}{11}$, יורדת ב-$0<x<\frac{60}{11}$; מקסימום מקומי ב-$x=0$, מינימום ב-$x=\frac{60}{11}$; $\cap$ ב-$x<\frac{54}{11}$, $\cup$ ב-$x>\frac{54}{11}$; פיתול ב-$x=\frac{54}{11}$ בלבד.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המקסימום המקומי`, value: 0 },
        { label: String.raw`שיעור ה-$x$ של המינימום המקומי`, value: 60 / 11 },
        { label: String.raw`שיעור ה-$x$ של נקודת הפיתול`, value: 54 / 11 },
      ],
      source: s45(227),
    },
  ],
  'calc-investigate-polynomial': [
    {
      id: 'calc-investigate-polynomial-os1',
      difficulty: 1,
      statement: String.raw`שרטטו את גרף הפונקציה $y=3x^2+2x+4$ בלי מחשבון. הקפידו לציין את כל המאפיינים החשובים של הגרף: נקודות מקסימום ומינימום מקומיות, נקודות פיתול והתנהגות בקצוות (אסימפטוטות).`,
      hints: [
        String.raw`$y'=6x+2$ ו-$y''=6$.`,
        String.raw`בדקו את הדיסקרימיננטה כדי לדעת אם יש נקודות חיתוך עם ציר $x$.`,
      ],
      solutionSteps: [
        String.raw`הפונקציה מוגדרת לכל $x$. חיתוך עם ציר $y$: $(0,4)$. חיתוך עם ציר $x$: $\Delta=4-48<0$, ולכן אין.`,
        String.raw`$y'=6x+2=0\iff x=-\frac13$; $y'<0$ עבור $x<-\frac13$ (יורדת) ו-$y'>0$ עבור $x>-\frac13$ (עולה).`,
        String.raw`מינימום (מקומי ומוחלט): $y\left(-\frac13\right)=\frac13-\frac23+4=\frac{11}{3}$.`,
        String.raw`$y''=6>0$: הגרף קעור כלפי מעלה בכל התחום, ואין נקודות פיתול.`,
        String.raw`אין אסימפטוטות; $y\to\infty$ כש-$x\to\pm\infty$. הגרף – פרבולה ״מחייכת״ שקודקודה $\left(-\frac13,\frac{11}{3}\right)$, כולה מעל ציר $x$.`,
      ],
      finalAnswer: String.raw`מינימום $\left(-\frac13,\frac{11}3\right)$; חיתוך $(0,4)$; קעורה כלפי מעלה, בלי פיתול ובלי אסימפטוטות.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: -1 / 3 },
        { label: String.raw`שיעור ה-$y$ של המינימום`, value: 11 / 3 },
      ],
      source: s46(294),
    },
    {
      id: 'calc-investigate-polynomial-os2',
      difficulty: 1,
      statement: String.raw`נתונה הפונקציה $f(x)=x^3-6x^2$. מצאו:

א. את תחומי העלייה והירידה של $f$;

ב. את נקודות הקיצון המקומיות;

ג. את תחומי הקעירות כלפי מעלה וכלפי מטה;

ד. את נקודות הפיתול.`,
      hints: [String.raw`$f'(x)=3x^2-12x=3x(x-4)$ ו-$f''(x)=6x-12$.`],
      solutionSteps: [
        String.raw`$f'(x)=3x(x-4)$: חיובית עבור $x<0$ ועבור $x>4$ (עולה), שלילית עבור $0<x<4$ (יורדת).`,
        String.raw`מקסימום מקומי $(0,0)$; מינימום מקומי ב-$x=4$: $f(4)=64-96=-32$.`,
        String.raw`$f''(x)=6x-12$: שלילית עבור $x<2$ (קעורה כלפי מטה), חיובית עבור $x>2$ (קעורה כלפי מעלה).`,
        String.raw`נקודת פיתול ב-$x=2$: $f(2)=8-24=-16$, כלומר $(2,-16)$ – בדיוק באמצע בין נקודות הקיצון.`,
      ],
      finalAnswer: String.raw`עולה ב-$x<0$ וב-$x>4$, יורדת ב-$0<x<4$; מקסימום $(0,0)$, מינימום $(4,-32)$; $\cap$ ב-$x<2$, $\cup$ ב-$x>2$; פיתול $(2,-16)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: 4 },
        { label: String.raw`שיעור ה-$y$ של המינימום`, value: -32 },
        { label: String.raw`שיעור ה-$x$ של נקודת הפיתול`, value: 2 },
        { label: String.raw`שיעור ה-$y$ של נקודת הפיתול`, value: -16 },
      ],
      source: s45(225),
    },
    {
      id: 'calc-investigate-polynomial-os3',
      difficulty: 2,
      statement: String.raw`שרטטו את גרף הפונקציה $y=x^3-3x^2+4$ בלי מחשבון. הקפידו לציין את כל המאפיינים החשובים של הגרף: נקודות מקסימום ומינימום מקומיות, נקודות פיתול והתנהגות בקצוות.`,
      hints: [
        String.raw`$y'=3x^2-6x=3x(x-2)$ ו-$y''=6x-6$.`,
        String.raw`לנקודות החיתוך עם ציר $x$: נחשו שורש של $x^3-3x^2+4$ ($x=-1$), ושימו לב שהמינימום נמצא על ציר $x$.`,
      ],
      solutionSteps: [
        String.raw`$y'=3x(x-2)$: חיובית עבור $x<0$ ועבור $x>2$, שלילית עבור $0<x<2$. מקסימום מקומי $(0,4)$, מינימום מקומי $(2,0)$.`,
        String.raw`$y''=6x-6$: שלילית עבור $x<1$ ($\cap$), חיובית עבור $x>1$ ($\cup$); נקודת פיתול $(1,2)$.`,
        String.raw`חיתוך עם הצירים: $(0,4)$; ו-$x^3-3x^2+4=(x+1)(x-2)^2$, ולכן $(-1,0)$ ו-$(2,0)$ – בנקודה $(2,0)$ הגרף משיק לציר $x$.`,
        String.raw`$y\to-\infty$ כש-$x\to-\infty$ ו-$y\to\infty$ כש-$x\to\infty$; אין אסימפטוטות.`,
      ],
      finalAnswer: String.raw`מקסימום $(0,4)$, מינימום $(2,0)$, פיתול $(1,2)$; חיתוך $(-1,0)$, $(2,0)$, $(0,4)$.`,
      answers: [
        { label: String.raw`שיעור ה-$y$ של המקסימום (ב-$x=0$)`, value: 4 },
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: 2 },
        { label: String.raw`שיעור ה-$x$ של נקודת הפיתול`, value: 1 },
        { label: String.raw`שיעור ה-$y$ של נקודת הפיתול`, value: 2 },
        { label: String.raw`נקודת החיתוך השלילית עם ציר $x$`, value: -1 },
      ],
      source: s46(295),
    },
    {
      id: 'calc-investigate-polynomial-os4',
      difficulty: 2,
      statement: String.raw`נתונה הפונקציה $f(x)=x^4-6x^3$. מצאו:

א. את תחומי העלייה והירידה של $f$;

ב. את נקודות הקיצון המקומיות;

ג. את תחומי הקעירות כלפי מעלה וכלפי מטה;

ד. את נקודות הפיתול.`,
      hints: [
        String.raw`$f'(x)=4x^3-18x^2=2x^2(2x-9)$ – בדקו אם יש החלפת סימן ב-$x=0$.`,
        String.raw`$f''(x)=12x^2-36x=12x(x-3)$.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=2x^2(2x-9)$; הגורם $2x^2\ge0$, ולכן הסימן הוא סימן $2x-9$: יורדת עבור $x<\frac92$ ועולה עבור $x>\frac92$.`,
        String.raw`מינימום ב-$x=\frac92$: $f\left(\frac92\right)=\left(\frac92\right)^3\left(\frac92-6\right)=\frac{729}{8}\cdot\left(-\frac32\right)=-\frac{2187}{16}$. ב-$x=0$ אין קיצון ($f'$ לא מחליפה סימן).`,
        String.raw`$f''(x)=12x(x-3)$: חיובית עבור $x<0$ ועבור $x>3$ ($\cup$), שלילית עבור $0<x<3$ ($\cap$).`,
        String.raw`נקודות פיתול: $(0,0)$ ו-$(3,f(3))=(3,81-162)=(3,-81)$.`,
      ],
      finalAnswer: String.raw`יורדת ב-$x<\frac92$, עולה ב-$x>\frac92$; מינימום $\left(\frac92,-\frac{2187}{16}\right)$; $\cup$ ב-$x<0$ וב-$x>3$, $\cap$ ב-$0<x<3$; פיתול $(0,0)$ ו-$(3,-81)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: 4.5 },
        { label: String.raw`שיעור ה-$y$ של המינימום`, value: -2187 / 16 },
        { label: String.raw`שיעור ה-$x$ של נקודת הפיתול הימנית`, value: 3 },
        { label: String.raw`שיעור ה-$y$ של נקודת הפיתול הימנית`, value: -81 },
      ],
      source: s45(226),
    },
    {
      id: 'calc-investigate-polynomial-os5',
      difficulty: 3,
      statement: String.raw`נתונה הפונקציה $f(x)=(x-2)^2(x-4)^2$. מצאו:

א. את תחומי העלייה והירידה של $f$;

ב. את נקודות הקיצון המקומיות;

ג. את תחומי הקעירות כלפי מעלה וכלפי מטה;

ד. את נקודות הפיתול.`,
      hints: [
        String.raw`$f(x)=\big((x-2)(x-4)\big)^2=\left(x^2-6x+8\right)^2$, ולכן $f'(x)=2\left(x^2-6x+8\right)(2x-6)=4(x-2)(x-3)(x-4)$.`,
        String.raw`$f''(x)=12x^2-72x+104$; פתרו $f''=0$ בנוסחת השורשים.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=4(x-2)(x-3)(x-4)$: שלילית עבור $x<2$, חיובית ב-$2<x<3$, שלילית ב-$3<x<4$, חיובית עבור $x>4$.`,
        String.raw`לכן: מינימום $(2,0)$, מקסימום $(3,f(3))=(3,1\cdot1)=(3,1)$, מינימום $(4,0)$; יורדת ב-$x<2$ וב-$3<x<4$, עולה ב-$2<x<3$ וב-$x>4$.`,
        String.raw`$f''(x)=2(2x-6)^2+4\left(x^2-6x+8\right)=12x^2-72x+104=4\left(3x^2-18x+26\right)$.`,
        String.raw`$f''=0\iff x=\frac{18\pm\sqrt{324-312}}{6}=3\pm\frac{\sqrt3}{3}$. $f''$ חיובית מחוץ לשורשים ($\cup$) ושלילית ביניהם ($\cap$).`,
        String.raw`בנקודות אלה $(x-3)^2=\frac13$, ו-$f(x)=\left((x-3)^2-1\right)^2=\left(-\frac23\right)^2=\frac49$: נקודות הפיתול $\left(3\pm\frac{\sqrt3}{3},\frac49\right)$.`,
      ],
      finalAnswer: String.raw`יורדת ב-$x<2$, $3<x<4$; עולה ב-$2<x<3$, $x>4$; מינימום $(2,0)$, $(4,0)$, מקסימום $(3,1)$; $\cap$ ב-$3-\frac{\sqrt3}3<x<3+\frac{\sqrt3}3$, $\cup$ מחוץ לו; פיתול $\left(3\pm\frac{\sqrt3}3,\frac49\right)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המקסימום`, value: 3 },
        { label: String.raw`שיעור ה-$y$ של המקסימום`, value: 1 },
        { label: String.raw`שיעור ה-$x$ של נקודת הפיתול השמאלית`, value: 3 - Math.sqrt(3) / 3 },
        { label: String.raw`שיעור ה-$x$ של נקודת הפיתול הימנית`, value: 3 + Math.sqrt(3) / 3 },
        { label: String.raw`שיעור ה-$y$ של נקודות הפיתול`, value: 4 / 9 },
      ],
      source: s45(234),
    },
  ],
  'calc-investigate-rational': [
    {
      id: 'calc-investigate-rational-os1',
      difficulty: 1,
      statement: String.raw`מצאו את הנקודות החשודות לקיצון של הפונקציה $y=\frac{x^2-1}{x^2+2x-3}$ (נקודות פנימיות בתחום ההגדרה שבהן $y'=0$ או ש-$y'$ אינה מוגדרת).`,
      hints: [
        String.raw`התחילו בתחום ההגדרה: פרקו את המכנה $x^2+2x-3=(x-1)(x+3)$.`,
        String.raw`בתחום ההגדרה אפשר לצמצם: $y=\frac{x+1}{x+3}$.`,
      ],
      solutionSteps: [
        String.raw`$x^2+2x-3=(x-1)(x+3)$, ולכן תחום ההגדרה הוא $x\ne1,\ -3$.`,
        String.raw`$x^2-1=(x-1)(x+1)$, ולכן בתחום ההגדרה $y=\frac{x+1}{x+3}$.`,
        String.raw`$y'=\frac{1\cdot(x+3)-(x+1)\cdot1}{(x+3)^2}=\frac{2}{(x+3)^2}$.`,
        String.raw`$y'>0$ ומוגדרת בכל תחום ההגדרה (הנקודות $x=1$ ו-$x=-3$ אינן בתחום), ולכן **אין** נקודות חשודות לקיצון – הפונקציה עולה בכל אחד מקטעי התחום.`,
      ],
      finalAnswer: String.raw`אין נקודות חשודות לקיצון ($y'=\frac{2}{(x+3)^2}>0$ בכל התחום).`,
      source: s43(115),
    },
    {
      id: 'calc-investigate-rational-os2',
      difficulty: 2,
      statement: String.raw`שרטטו את גרף הפונקציה $y=\frac{x^2+x-2}{x^2-3x-4}$ בלי מחשבון. הקפידו לציין את המאפיינים החשובים של הגרף: תחום הגדרה, נקודות חיתוך עם הצירים, נקודות קיצון והתנהגות אסימפטוטית. (בעיבוד זה אין צורך למצוא נקודות פיתול.)`,
      hints: [
        String.raw`פרקו מונה ומכנה: $(x+2)(x-1)$ ו-$(x-4)(x+1)$.`,
        String.raw`אחרי פישוט, מונה הנגזרת הוא $-2\left(2x^2+2x+5\right)$. האם הוא מתאפס?`,
      ],
      solutionSteps: [
        String.raw`$y=\frac{(x+2)(x-1)}{(x-4)(x+1)}$: תחום ההגדרה $x\ne4,\ -1$. אין גורם משותף, ולכן $x=4$ ו-$x=-1$ אסימפטוטות אנכיות.`,
        String.raw`המעלות שוות והמקדמים המובילים $1$: אסימפטוטה אופקית $y=1$. (הגרף חותך אותה כאשר $x^2+x-2=x^2-3x-4$, כלומר ב-$x=-\frac12$.)`,
        String.raw`חיתוך עם ציר $x$: $(-2,0)$ ו-$(1,0)$; עם ציר $y$: $y(0)=\frac{-2}{-4}=\frac12$, הנקודה $\left(0,\frac12\right)$.`,
        String.raw`$y'=\frac{(2x+1)(x^2-3x-4)-(x^2+x-2)(2x-3)}{(x^2-3x-4)^2}=\frac{-4x^2-4x-10}{(x^2-3x-4)^2}=\frac{-2(2x^2+2x+5)}{(x-4)^2(x+1)^2}$.`,
        String.raw`ל-$2x^2+2x+5$ הדיסקרימיננטה $4-40<0$, ולכן הוא חיובי תמיד ו-$y'<0$: הפונקציה יורדת בכל אחד מהקטעים $x<-1$, $-1<x<4$, $x>4$, ואין לה נקודות קיצון.`,
      ],
      finalAnswer: String.raw`תחום $x\ne-1,4$; אסימפטוטות $x=-1$, $x=4$, $y=1$; חיתוך $(-2,0)$, $(1,0)$, $\left(0,\frac12\right)$; יורדת בכל קטע, אין קיצון.`,
      answers: [
        { label: String.raw`אסימפטוטה אנכית שמאלית $x=$`, value: -1 },
        { label: String.raw`אסימפטוטה אנכית ימנית $x=$`, value: 4 },
        { label: String.raw`אסימפטוטה אופקית $y=$`, value: 1 },
        { label: String.raw`שיעור ה-$y$ של נקודת החיתוך עם ציר $y$`, value: 0.5 },
      ],
      source: s46(298),
    },
    {
      id: 'calc-investigate-rational-os3',
      difficulty: 2,
      statement: String.raw`שרטטו את גרף הפונקציה $y=\frac{x^3+4x^2+3x}{3x+9}$ בלי מחשבון. הקפידו לציין את כל המאפיינים החשובים של הגרף: נקודות מקסימום ומינימום מקומיות, נקודות פיתול והתנהגות אסימפטוטית.`,
      hints: [
        String.raw`פרקו את המונה: $x^3+4x^2+3x=x(x+1)(x+3)$, ואת המכנה: $3(x+3)$.`,
        String.raw`בתחום ההגדרה $y=\frac{x^2+x}{3}$ – פרבולה. מה קורה בנקודה $x=-3$?`,
      ],
      solutionSteps: [
        String.raw`תחום ההגדרה: $x\ne-3$. בתחום זה $y=\frac{x(x+1)(x+3)}{3(x+3)}=\frac{x^2+x}{3}$.`,
        String.raw`$\lim_{x\to-3}y=\frac{9-3}{3}=2$ – גבול סופי, ולכן ב-$x=-3$ אין אסימפטוטה אלא ״חור״: הנקודה $(-3,2)$ חסרה בגרף. אין אסימפטוטה אופקית ($y\to\infty$ כש-$x\to\pm\infty$).`,
        String.raw`$y'=\frac{2x+1}{3}=0\iff x=-\frac12$: יורדת עבור $x<-\frac12$ (כולל משני צדי $-3$) ועולה עבור $x>-\frac12$; מינימום $\left(-\frac12,\frac{\frac14-\frac12}{3}\right)=\left(-\frac12,-\frac1{12}\right)$.`,
        String.raw`$y''=\frac23>0$: קעורה כלפי מעלה בכל התחום, אין נקודות פיתול.`,
        String.raw`חיתוך עם הצירים: $(0,0)$ ו-$(-1,0)$. הגרף – פרבולה שקודקודה $\left(-\frac12,-\frac1{12}\right)$, עם נקודה חסרה ב-$(-3,2)$.`,
      ],
      finalAnswer: String.raw`פרבולה $y=\frac{x^2+x}3$ בלי הנקודה $(-3,2)$; מינימום $\left(-\frac12,-\frac1{12}\right)$; אין אסימפטוטות ואין פיתול.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: -0.5 },
        { label: String.raw`שיעור ה-$y$ של המינימום`, value: -1 / 12 },
        { label: String.raw`שיעור ה-$y$ של הנקודה החסרה (ב-$x=-3$)`, value: 2 },
      ],
      source: s46(297),
    },
    {
      id: 'calc-investigate-rational-os4',
      difficulty: 2,
      statement: String.raw`שרטטו את גרף הפונקציה $y=\frac{2x+1}{x^2+6x+5}$ בלי מחשבון. הקפידו לציין את המאפיינים החשובים של הגרף: תחום הגדרה, נקודות חיתוך עם הצירים, נקודות קיצון והתנהגות אסימפטוטית. (בעיבוד זה אין צורך למצוא נקודות פיתול.)`,
      hints: [
        String.raw`$x^2+6x+5=(x+1)(x+5)$.`,
        String.raw`מונה הנגזרת: $2(x^2+6x+5)-(2x+1)(2x+6)=-2x^2-2x+4=-2(x+2)(x-1)$.`,
      ],
      solutionSteps: [
        String.raw`תחום: $x\ne-1,\ -5$. המונה אינו מתאפס בנקודות אלה ($-1$ ו-$-9$), ולכן $x=-5$ ו-$x=-1$ אסימפטוטות אנכיות. מעלת המונה קטנה ממעלת המכנה: אסימפטוטה אופקית $y=0$.`,
        String.raw`חיתוך: $\left(-\frac12,0\right)$ ו-$\left(0,\frac15\right)$.`,
        String.raw`$y'=\frac{-2(x+2)(x-1)}{(x+1)^2(x+5)^2}$; המכנה חיובי, ולכן $y'<0$ עבור $x<-2$ ועבור $x>1$, ו-$y'>0$ עבור $-2<x<1$ (בלי $x=-1$).`,
        String.raw`יורדת ב-$x<-5$, ב-$-5<x<-2$ וב-$x>1$; עולה ב-$-2<x<-1$ וב-$-1<x<1$.`,
        String.raw`מינימום מקומי ב-$x=-2$: $y=\frac{-3}{4-12+5}=1$; מקסימום מקומי ב-$x=1$: $y=\frac{3}{12}=\frac14$.`,
      ],
      finalAnswer: String.raw`אסימפטוטות $x=-5$, $x=-1$, $y=0$; חיתוך $\left(-\frac12,0\right)$, $\left(0,\frac15\right)$; מינימום מקומי $(-2,1)$, מקסימום מקומי $\left(1,\frac14\right)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המינימום המקומי`, value: -2 },
        { label: String.raw`שיעור ה-$y$ של המינימום המקומי`, value: 1 },
        { label: String.raw`שיעור ה-$x$ של המקסימום המקומי`, value: 1 },
        { label: String.raw`שיעור ה-$y$ של המקסימום המקומי`, value: 0.25 },
      ],
      source: s46(296),
    },
    {
      id: 'calc-investigate-rational-os5',
      difficulty: 3,
      statement: String.raw`שרטטו ביד את גרף הפונקציה $y=\frac{1}{x(x+1)^2}$. סמנו את נקודות הפיתול, הנקודות החשודות לקיצון, נקודות החיתוך עם ציר $x$ והאסימפטוטות.`,
      hints: [
        String.raw`$y=\left(x(x+1)^2\right)^{-1}$ ו-$\left(x(x+1)^2\right)'=(x+1)^2+2x(x+1)=(x+1)(3x+1)$.`,
        String.raw`$y'=-\frac{3x+1}{x^2(x+1)^3}$ ו-$y''=\frac{2\left(6x^2+4x+1\right)}{x^3(x+1)^4}$.`,
      ],
      solutionSteps: [
        String.raw`תחום: $x\ne0,\ -1$; המונה $1\ne0$, ולכן אסימפטוטות אנכיות $x=0$, $x=-1$, ואין חיתוך עם ציר $x$. מעלת המונה קטנה: אסימפטוטה אופקית $y=0$.`,
        String.raw`$y'=-\frac{(x+1)(3x+1)}{x^2(x+1)^4}=-\frac{3x+1}{x^2(x+1)^3}$, ו-$y'=0\iff x=-\frac13$.`,
        String.raw`סימן $y'$: שלילית עבור $x<-1$, חיובית ב-$-1<x<-\frac13$, שלילית ב-$-\frac13<x<0$ וב-$x>0$.`,
        String.raw`לכן ב-$x=-\frac13$ מקסימום מקומי: $y=\frac{1}{-\frac13\cdot\frac49}=-\frac{27}{4}$.`,
        String.raw`$y''=\frac{2\left(6x^2+4x+1\right)}{x^3(x+1)^4}$; ל-$6x^2+4x+1$ הדיסקרימיננטה $16-24<0$, והוא חיובי תמיד. $y''$ מחליפה סימן רק ב-$x=0$, שאינו בתחום – אין נקודות פיתול ($\cap$ עבור $x<0$, $\cup$ עבור $x>0$).`,
      ],
      finalAnswer: String.raw`אסימפטוטות $x=-1$, $x=0$, $y=0$; אין חיתוך עם ציר $x$; נקודה חשודה $x=-\frac13$ – מקסימום מקומי $\left(-\frac13,-\frac{27}4\right)$; אין נקודות פיתול.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של נקודת הקיצון`, value: -1 / 3 },
        { label: String.raw`שיעור ה-$y$ של נקודת הקיצון`, value: -27 / 4 },
        { label: String.raw`אסימפטוטה אנכית שמאלית $x=$`, value: -1 },
        { label: String.raw`אסימפטוטה אנכית ימנית $x=$`, value: 0 },
      ],
      source: review4(547),
    },
  ],
  'calc-investigate-root': [
    {
      id: 'calc-investigate-root-os1',
      difficulty: 1,
      statement: String.raw`מצאו את הנקודות החשודות לקיצון של הפונקציה $y=\sqrt{4-x^2}$ – הנקודות שבהן $y'=0$ או ש-$y'$ אינה מוגדרת.`,
      hints: [
        String.raw`תחום ההגדרה: $4-x^2\ge0$, כלומר $-2\le x\le2$.`,
        String.raw`$y'=\frac{-2x}{2\sqrt{4-x^2}}=-\frac{x}{\sqrt{4-x^2}}$.`,
      ],
      solutionSteps: [
        String.raw`תחום ההגדרה: $-2\le x\le2$.`,
        String.raw`$y'=\frac{(4-x^2)'}{2\sqrt{4-x^2}}=-\frac{x}{\sqrt{4-x^2}}$, ו-$y'=0\iff x=0$.`,
        String.raw`ב-$x=\pm2$ המכנה מתאפס, ולכן $y'$ אינה מוגדרת שם (אלה קצות התחום).`,
        String.raw`(סוגן: $y(0)=2$ – מקסימום; $y(\pm2)=0$ – מינימום בקצוות. הגרף הוא חצי מעגל עליון ברדיוס $2$.)`,
      ],
      finalAnswer: String.raw`$x=0$ (שם $y'=0$), ו-$x=\pm2$ (שם $y'$ אינה מוגדרת).`,
      answers: [
        { label: String.raw`הנקודה שבה $y'=0$: $x=$`, value: 0 },
        { label: String.raw`הנקודה השמאלית שבה $y'$ אינה מוגדרת: $x=$`, value: -2 },
        { label: String.raw`הנקודה הימנית שבה $y'$ אינה מוגדרת: $x=$`, value: 2 },
      ],
      source: s43(113),
    },
    {
      id: 'calc-investigate-root-os2',
      difficulty: 2,
      statement: String.raw`מצאו את נקודות הקיצון המקומיות והמוחלטות של הפונקציה $y=3x\sqrt{1-x^2}$. (אפשר להיעזר בשרטוט במחשבון להערכה, אבל מצאו את התשובות באופן מדויק.)`,
      hints: [
        String.raw`תחום: $-1\le x\le1$. גזרו כמכפלה: $y'=3\sqrt{1-x^2}+3x\cdot\frac{-x}{\sqrt{1-x^2}}$.`,
        String.raw`במכנה משותף: $y'=\frac{3(1-2x^2)}{\sqrt{1-x^2}}$.`,
      ],
      solutionSteps: [
        String.raw`תחום ההגדרה: $-1\le x\le1$.`,
        String.raw`$y'=3\sqrt{1-x^2}-\frac{3x^2}{\sqrt{1-x^2}}=\frac{3(1-x^2)-3x^2}{\sqrt{1-x^2}}=\frac{3(1-2x^2)}{\sqrt{1-x^2}}$.`,
        String.raw`$y'=0\iff x^2=\frac12\iff x=\pm\frac{\sqrt2}{2}$. $y'>0$ עבור $|x|<\frac{\sqrt2}2$ ו-$y'<0$ עבור $\frac{\sqrt2}2<|x|<1$.`,
        String.raw`$y\left(\frac{\sqrt2}2\right)=3\cdot\frac{\sqrt2}2\cdot\frac{\sqrt2}2=\frac32$ ו-$y\left(-\frac{\sqrt2}2\right)=-\frac32$; בקצוות $y(\pm1)=0$.`,
        String.raw`לכן מקסימום מוחלט $\left(\frac{\sqrt2}2,\frac32\right)$, מינימום מוחלט $\left(-\frac{\sqrt2}2,-\frac32\right)$; בקצוות: $(-1,0)$ מקסימום מקומי (קצה), $(1,0)$ מינימום מקומי (קצה).`,
      ],
      finalAnswer: String.raw`מקסימום מוחלט $\left(\frac{\sqrt2}2,\frac32\right)$, מינימום מוחלט $\left(-\frac{\sqrt2}2,-\frac32\right)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המקסימום המוחלט`, value: Math.SQRT2 / 2 },
        { label: String.raw`הערך המקסימלי`, value: 1.5 },
        { label: String.raw`שיעור ה-$x$ של המינימום המוחלט`, value: -Math.SQRT2 / 2 },
        { label: String.raw`הערך המינימלי`, value: -1.5 },
      ],
      source: s43(135),
    },
    {
      id: 'calc-investigate-root-os3',
      difficulty: 2,
      statement: String.raw`שרטטו את גרף הפונקציה $y=\sqrt{x^2-5x+4}$ בלי מחשבון. הקפידו לציין את כל המאפיינים החשובים של הגרף: תחום הגדרה, נקודות קיצון, נקודות פיתול והתנהגות אסימפטוטית.`,
      hints: [
        String.raw`תחום: $x^2-5x+4=(x-1)(x-4)\ge0$.`,
        String.raw`$y'=\frac{2x-5}{2\sqrt{x^2-5x+4}}$ – ה-$x$ שמאפס את המונה אינו בתחום.`,
        String.raw`אפשר להראות ש-$y''=-\frac{9}{4\left(x^2-5x+4\right)^{3/2}}$.`,
      ],
      solutionSteps: [
        String.raw`תחום ההגדרה: $(x-1)(x-4)\ge0$, כלומר $x\le1$ או $x\ge4$.`,
        String.raw`חיתוך: עם ציר $x$ – $(1,0)$ ו-$(4,0)$; עם ציר $y$ – $y(0)=\sqrt4=2$, הנקודה $(0,2)$.`,
        String.raw`$y'=\frac{2x-5}{2\sqrt{x^2-5x+4}}$: עבור $x<1$ המונה שלילי (יורדת), ועבור $x>4$ חיובי (עולה). $x=\frac52$ אינו בתחום, ולכן אין קיצון פנימי.`,
        String.raw`בקצוות התחום $(1,0)$ ו-$(4,0)$ יש מינימום (קצה), והוא גם המינימום המוחלט $0$.`,
        String.raw`$y''=-\frac{9}{4\left(x^2-5x+4\right)^{3/2}}<0$ בכל פנים התחום: שני הענפים קעורים כלפי מטה, ואין נקודות פיתול.`,
        String.raw`אין אסימפטוטות אנכיות או אופקיות: $y\to\infty$ כש-$x\to\pm\infty$.`,
      ],
      finalAnswer: String.raw`תחום $x\le1$ או $x\ge4$; יורדת ב-$x<1$, עולה ב-$x>4$; מינימום (קצה) $(1,0)$ ו-$(4,0)$; חיתוך עם ציר $y$ ב-$(0,2)$; קעורה כלפי מטה, אין פיתול ואין אסימפטוטות מקבילות לצירים.`,
      answers: [
        { label: String.raw`שיעור ה-$y$ של נקודת החיתוך עם ציר $y$`, value: 2 },
        { label: String.raw`נקודת המינימום השמאלית: $x=$`, value: 1 },
        { label: String.raw`נקודת המינימום הימנית: $x=$`, value: 4 },
      ],
      source: s46(299),
    },
    {
      id: 'calc-investigate-root-os4',
      difficulty: 2,
      statement: String.raw`שרטטו את גרף הפונקציה $y=2x\sqrt{16-x^2}$ בלי מחשבון. הקפידו לציין את כל המאפיינים החשובים של הגרף: נקודות מקסימום ומינימום מקומיות, נקודות פיתול והתנהגות בקצוות.`,
      hints: [
        String.raw`תחום: $-4\le x\le4$; הפונקציה אי-זוגית.`,
        String.raw`$y'=2\sqrt{16-x^2}-\frac{2x^2}{\sqrt{16-x^2}}=\frac{4\left(8-x^2\right)}{\sqrt{16-x^2}}$.`,
        String.raw`אפשר להראות ש-$y''=\frac{4x\left(x^2-24\right)}{\left(16-x^2\right)^{3/2}}$.`,
      ],
      solutionSteps: [
        String.raw`תחום: $-4\le x\le4$. $y(-x)=-y(x)$ – הגרף סימטרי לראשית. חיתוך: $(0,0)$, $(\pm4,0)$.`,
        String.raw`$y'=\frac{2(16-x^2)-2x^2}{\sqrt{16-x^2}}=\frac{4(8-x^2)}{\sqrt{16-x^2}}$, ו-$y'=0\iff x=\pm2\sqrt2$.`,
        String.raw`$y'>0$ עבור $|x|<2\sqrt2$ ו-$y'<0$ עבור $2\sqrt2<|x|<4$: מקסימום ב-$x=2\sqrt2$, $y=4\sqrt2\cdot\sqrt8=16$; מינימום ב-$x=-2\sqrt2$, $y=-16$.`,
        String.raw`$y''=\frac{4x(x^2-24)}{(16-x^2)^{3/2}}$; בתחום $x^2<24$, ולכן סימן $y''$ הפוך לסימן $x$: $\cup$ ב-$(-4,0)$, $\cap$ ב-$(0,4)$ – נקודת פיתול $(0,0)$.`,
        String.raw`בקצוות $(-4,0)$ מקסימום מקומי (קצה) ו-$(4,0)$ מינימום מקומי (קצה); אין אסימפטוטות (תחום סגור).`,
      ],
      finalAnswer: String.raw`מקסימום $\left(2\sqrt2,16\right)$, מינימום $\left(-2\sqrt2,-16\right)$, פיתול $(0,0)$; חיתוך $(0,0)$, $(\pm4,0)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המקסימום`, value: 2 * Math.SQRT2 },
        { label: String.raw`שיעור ה-$y$ של המקסימום`, value: 16 },
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: -2 * Math.SQRT2 },
        { label: String.raw`שיעור ה-$y$ של המינימום`, value: -16 },
      ],
      source: s46(300),
    },
    {
      id: 'calc-investigate-root-os5',
      difficulty: 2,
      statement: String.raw`שרטטו ביד את גרף הפונקציה $y=x-\sqrt{4-x^2}$. סמנו את נקודות הפיתול, הנקודות החשודות לקיצון, נקודות החיתוך עם ציר $x$ והאסימפטוטות.`,
      hints: [
        String.raw`תחום: $-2\le x\le2$. $y'=1+\frac{x}{\sqrt{4-x^2}}$.`,
        String.raw`$y'=0$ דורש $x<0$ ו-$x^2=4-x^2$.`,
        String.raw`$y''=\frac{4}{\left(4-x^2\right)^{3/2}}$.`,
      ],
      solutionSteps: [
        String.raw`תחום ההגדרה: $-2\le x\le2$; לכן אין אסימפטוטות.`,
        String.raw`$y'=1+\frac{x}{\sqrt{4-x^2}}=0\iff\sqrt{4-x^2}=-x$; צריך $x<0$, ואז $4-x^2=x^2$, כלומר $x=-\sqrt2$.`,
        String.raw`$y'<0$ עבור $-2<x<-\sqrt2$ ו-$y'>0$ עבור $-\sqrt2<x<2$: מינימום (מוחלט) ב-$x=-\sqrt2$: $y=-\sqrt2-\sqrt2=-2\sqrt2$.`,
        String.raw`קצוות: $y(-2)=-2$ – מקסימום מקומי (קצה); $y(2)=2$ – מקסימום מוחלט.`,
        String.raw`חיתוך עם ציר $x$: $x=\sqrt{4-x^2}$ דורש $x\ge0$ ו-$x^2=2$, כלומר $(\sqrt2,0)$; חיתוך עם ציר $y$: $(0,-2)$.`,
        String.raw`$y''=\frac{4}{(4-x^2)^{3/2}}>0$ בכל פנים התחום: קעורה כלפי מעלה, ואין נקודות פיתול.`,
      ],
      finalAnswer: String.raw`תחום $[-2,2]$, אין אסימפטוטות; מינימום $\left(-\sqrt2,-2\sqrt2\right)$; קצוות $(-2,-2)$, $(2,2)$; חיתוך $(\sqrt2,0)$, $(0,-2)$; אין פיתול.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: -Math.SQRT2 },
        { label: String.raw`שיעור ה-$y$ של המינימום`, value: -2 * Math.SQRT2 },
        { label: String.raw`נקודת החיתוך עם ציר $x$: $x=$`, value: Math.SQRT2 },
        { label: String.raw`הערך המקסימלי (בקצה $x=2$)`, value: 2 },
      ],
      source: review4(548),
    },
    {
      id: 'calc-investigate-root-os6',
      difficulty: 3,
      statement: String.raw`שרטטו את גרף הפונקציה $y=\frac{\sqrt{x^2+2}}{x+1}$ בלי מחשבון. הקפידו לציין את המאפיינים החשובים של הגרף: תחום הגדרה, נקודות חיתוך עם הצירים, נקודות קיצון והתנהגות אסימפטוטית. (בעיבוד זה אין צורך למצוא נקודות פיתול.)`,
      hints: [
        String.raw`לאסימפטוטות האופקיות: עבור $x>0$, $\sqrt{x^2+2}=x\sqrt{1+\frac2{x^2}}$, ועבור $x<0$, $\sqrt{x^2+2}=-x\sqrt{1+\frac2{x^2}}$.`,
        String.raw`$y'=\frac{\frac{x}{\sqrt{x^2+2}}(x+1)-\sqrt{x^2+2}}{(x+1)^2}$ – הכפילו מונה ומכנה ב-$\sqrt{x^2+2}$.`,
      ],
      solutionSteps: [
        String.raw`תחום: $x\ne-1$. המונה $\sqrt{x^2+2}>0$ תמיד, ולכן אין חיתוך עם ציר $x$, ו-$x=-1$ אסימפטוטה אנכית. חיתוך עם ציר $y$: $\left(0,\sqrt2\right)$.`,
        String.raw`עבור $x\to\infty$: $y=\frac{x\sqrt{1+\frac2{x^2}}}{x+1}\to1$; עבור $x\to-\infty$: $y=\frac{-x\sqrt{1+\frac2{x^2}}}{x+1}\to-1$. שתי אסימפטוטות אופקיות: $y=1$ (מימין) ו-$y=-1$ (משמאל).`,
        String.raw`$y'=\frac{x(x+1)-(x^2+2)}{\sqrt{x^2+2}\,(x+1)^2}=\frac{x-2}{\sqrt{x^2+2}\,(x+1)^2}$.`,
        String.raw`$y'<0$ עבור $x<-1$ ועבור $-1<x<2$ (יורדת), ו-$y'>0$ עבור $x>2$ (עולה).`,
        String.raw`מינימום מקומי ב-$x=2$: $y=\frac{\sqrt6}{3}\approx0.816$ (מתחת לאסימפטוטה $y=1$, שאליה הגרף מתקרב מלמטה).`,
      ],
      finalAnswer: String.raw`תחום $x\ne-1$; אסימפטוטות $x=-1$, $y=1$ (כש-$x\to\infty$), $y=-1$ (כש-$x\to-\infty$); חיתוך $\left(0,\sqrt2\right)$; יורדת ב-$x<-1$ וב-$-1<x<2$, עולה ב-$x>2$; מינימום $\left(2,\frac{\sqrt6}3\right)$.`,
      answers: [
        { label: String.raw`האסימפטוטה האופקית כש-$x\to\infty$: $y=$`, value: 1 },
        { label: String.raw`האסימפטוטה האופקית כש-$x\to-\infty$: $y=$`, value: -1 },
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: 2 },
        { label: String.raw`שיעור ה-$y$ של המינימום`, value: Math.sqrt(6) / 3 },
      ],
      source: s46(302),
    },
  ],
  'calc-trig-functions': [
    {
      id: 'calc-trig-functions-os1',
      difficulty: 1,
      statement: String.raw`מצאו את משוואת המשיק לגרף הפונקציה $f(x)=-\sin x$ בנקודה שבה $x=0$. (במקור: בדקו את התשובה בשרטוט הפונקציה והמשיק במחשבון.)`,
      hints: [String.raw`$f'(x)=-\cos x$.`],
      solutionSteps: [
        String.raw`נקודת ההשקה: $f(0)=-\sin0=0$, כלומר $(0,0)$.`,
        String.raw`$f'(x)=-\cos x$, ולכן שיפוע המשיק $f'(0)=-1$.`,
        String.raw`משוואת המשיק: $y-0=-1\cdot(x-0)$, כלומר $y=-x$.`,
      ],
      finalAnswer: String.raw`$y=-x$`,
      answers: [
        { label: String.raw`שיפוע המשיק $m$`, value: -1 },
        { label: String.raw`המקדם החופשי $n$ במשוואת המשיק $y=mx+n$`, value: 0 },
      ],
      source: s35(185),
    },
    {
      id: 'calc-trig-functions-os2',
      difficulty: 1,
      statement: String.raw`מצאו את כל ערכי $x$ בתחום $0<x<2\pi$ שבהם שיפוע המשיק לגרף הפונקציה $f(x)=x-2\cos x$ שווה ל-$2$.`,
      hints: [String.raw`שיפוע המשיק הוא $f'(x)=1+2\sin x$. פתרו $f'(x)=2$.`],
      solutionSteps: [
        String.raw`$f'(x)=1-2(-\sin x)=1+2\sin x$.`,
        String.raw`$1+2\sin x=2\iff\sin x=\frac12$.`,
        String.raw`בתחום $0<x<2\pi$: $x=\frac\pi6$ או $x=\pi-\frac\pi6=\frac{5\pi}{6}$.`,
      ],
      finalAnswer: String.raw`$x=\frac\pi6$, $x=\frac{5\pi}6$`,
      answers: [
        { label: String.raw`הפתרון הקטן $x=$`, value: Math.PI / 6 },
        { label: String.raw`הפתרון הגדול $x=$`, value: (5 * Math.PI) / 6 },
      ],
      source: s35(198),
    },
    {
      id: 'calc-trig-functions-os3',
      difficulty: 2,
      statement: String.raw`מצאו את נקודות הקיצון המקומיות והמוחלטות של הפונקציה $y=\sin x+\cos x$ בקטע $[0,2\pi]$.`,
      hints: [
        String.raw`$y'=\cos x-\sin x=0\iff\tan x=1$.`,
        String.raw`השוו את ערכי הפונקציה בנקודות החשודות ובקצוות $0$ ו-$2\pi$.`,
      ],
      solutionSteps: [
        String.raw`$y'=\cos x-\sin x$. $y'=0\iff\sin x=\cos x\iff\tan x=1$ (כאשר $\cos x\ne0$), ובקטע: $x=\frac\pi4$, $x=\frac{5\pi}4$.`,
        String.raw`$y\left(\frac\pi4\right)=\frac{\sqrt2}2+\frac{\sqrt2}2=\sqrt2$ ו-$y\left(\frac{5\pi}4\right)=-\frac{\sqrt2}2-\frac{\sqrt2}2=-\sqrt2$.`,
        String.raw`בקצוות: $y(0)=y(2\pi)=1$.`,
        String.raw`סימן $y'$: חיובית ב-$\left[0,\frac\pi4\right)$, שלילית ב-$\left(\frac\pi4,\frac{5\pi}4\right)$, חיובית ב-$\left(\frac{5\pi}4,2\pi\right]$.`,
        String.raw`לכן מקסימום מוחלט $\left(\frac\pi4,\sqrt2\right)$, מינימום מוחלט $\left(\frac{5\pi}4,-\sqrt2\right)$; בקצוות: $(0,1)$ מינימום מקומי (קצה) ו-$(2\pi,1)$ מקסימום מקומי (קצה).`,
      ],
      finalAnswer: String.raw`מקסימום מוחלט $\left(\frac\pi4,\sqrt2\right)$, מינימום מוחלט $\left(\frac{5\pi}4,-\sqrt2\right)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המקסימום`, value: Math.PI / 4 },
        { label: String.raw`הערך המקסימלי`, value: Math.SQRT2 },
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: (5 * Math.PI) / 4 },
        { label: String.raw`הערך המינימלי`, value: -Math.SQRT2 },
      ],
      source: s43(127),
    },
    {
      id: 'calc-trig-functions-os4',
      difficulty: 2,
      statement: String.raw`נתונה הפונקציה $f(x)=\sin x+\sin^3x$ בתחום $-\pi<x<\pi$. מצאו:

א. את תחומי העלייה והירידה של $f$;

ב. את נקודות הקיצון המקומיות של $f$.`,
      hints: [
        String.raw`$\left(\sin^3x\right)'=3\sin^2x\cos x$ (כלל השרשרת).`,
        String.raw`$f'(x)=\cos x\left(1+3\sin^2x\right)$, והגורם בסוגריים חיובי תמיד.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=\cos x+3\sin^2x\cos x=\cos x\left(1+3\sin^2x\right)$.`,
        String.raw`$1+3\sin^2x\ge1>0$, ולכן סימן $f'$ הוא סימן $\cos x$.`,
        String.raw`$\cos x>0$ עבור $-\frac\pi2<x<\frac\pi2$ (עולה), ו-$\cos x<0$ עבור $-\pi<x<-\frac\pi2$ ועבור $\frac\pi2<x<\pi$ (יורדת).`,
        String.raw`מינימום מקומי ב-$x=-\frac\pi2$: $f=-1+(-1)^3=-2$; מקסימום מקומי ב-$x=\frac\pi2$: $f=1+1=2$.`,
      ],
      finalAnswer: String.raw`עולה ב-$-\frac\pi2<x<\frac\pi2$, יורדת ב-$-\pi<x<-\frac\pi2$ וב-$\frac\pi2<x<\pi$; מינימום $\left(-\frac\pi2,-2\right)$, מקסימום $\left(\frac\pi2,2\right)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המקסימום`, value: Math.PI / 2 },
        { label: String.raw`הערך המקסימלי`, value: 2 },
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: -Math.PI / 2 },
        { label: String.raw`הערך המינימלי`, value: -2 },
      ],
      source: s45(221),
    },
    {
      id: 'calc-trig-functions-os5',
      difficulty: 3,
      statement: String.raw`נתונה הפונקציה $f(x)=x+\sin(2x)$ בקטע $\left[-\frac\pi2,\frac\pi2\right]$. מצאו:

א. את תחומי העלייה והירידה של $f$;

ב. את נקודות הקיצון המקומיות;

ג. את תחומי הקעירות כלפי מעלה וכלפי מטה;

ד. את נקודות הפיתול.`,
      hints: [
        String.raw`$f'(x)=1+2\cos(2x)$; כאשר $x\in\left[-\frac\pi2,\frac\pi2\right]$, הזווית $2x$ נמצאת ב-$[-\pi,\pi]$.`,
        String.raw`$f''(x)=-4\sin(2x)$.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=1+2\cos2x=0\iff\cos2x=-\frac12$. עבור $2x\in[-\pi,\pi]$: $2x=\pm\frac{2\pi}3$, כלומר $x=\pm\frac\pi3$.`,
        String.raw`$f'(0)=3>0$ ו-$f'\left(\pm\frac\pi2\right)=1+2\cos(\pm\pi)=-1<0$: יורדת ב-$\left[-\frac\pi2,-\frac\pi3\right)$, עולה ב-$\left(-\frac\pi3,\frac\pi3\right)$, יורדת ב-$\left(\frac\pi3,\frac\pi2\right]$.`,
        String.raw`מינימום מקומי ב-$x=-\frac\pi3$: $f=-\frac\pi3+\sin\left(-\frac{2\pi}3\right)=-\frac\pi3-\frac{\sqrt3}2$; מקסימום מקומי ב-$x=\frac\pi3$: $f=\frac\pi3+\frac{\sqrt3}2$.`,
        String.raw`בקצוות: $f\left(-\frac\pi2\right)=-\frac\pi2$ – מקסימום מקומי (קצה); $f\left(\frac\pi2\right)=\frac\pi2$ – מינימום מקומי (קצה).`,
        String.raw`$f''(x)=-4\sin2x$: עבור $-\frac\pi2<x<0$, $\sin2x<0$ ולכן $f''>0$ ($\cup$); עבור $0<x<\frac\pi2$, $f''<0$ ($\cap$).`,
        String.raw`$f''$ מחליפה סימן ב-$x=0$: נקודת פיתול $(0,0)$.`,
      ],
      finalAnswer: String.raw`יורדת ב-$\left[-\frac\pi2,-\frac\pi3\right)$ וב-$\left(\frac\pi3,\frac\pi2\right]$, עולה ב-$\left(-\frac\pi3,\frac\pi3\right)$; מינימום $\left(-\frac\pi3,-\frac\pi3-\frac{\sqrt3}2\right)$, מקסימום $\left(\frac\pi3,\frac\pi3+\frac{\sqrt3}2\right)$; $\cup$ ב-$\left(-\frac\pi2,0\right)$, $\cap$ ב-$\left(0,\frac\pi2\right)$; פיתול $(0,0)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המקסימום המקומי`, value: Math.PI / 3 },
        { label: String.raw`שיעור ה-$y$ של המקסימום המקומי`, value: Math.PI / 3 + Math.sqrt(3) / 2 },
        { label: String.raw`שיעור ה-$x$ של המינימום המקומי`, value: -Math.PI / 3 },
        { label: String.raw`שיעור ה-$y$ של המינימום המקומי`, value: -Math.PI / 3 - Math.sqrt(3) / 2 },
        { label: String.raw`שיעור ה-$x$ של נקודת הפיתול`, value: 0 },
      ],
      source: s45(232),
    },
    {
      id: 'calc-trig-functions-os6',
      difficulty: 3,
      statement: String.raw`נתונה הפונקציה $f(x)=\sin(\pi x)-\cos(\pi x)$ בקטע $[-1,1]$. מצאו:

א. את תחומי העלייה והירידה של $f$;

ב. את נקודות הקיצון המקומיות;

ג. את תחומי הקעירות כלפי מעלה וכלפי מטה;

ד. את נקודות הפיתול.`,
      hints: [
        String.raw`לפי כלל השרשרת: $f'(x)=\pi\cos(\pi x)+\pi\sin(\pi x)$ ו-$f''(x)=-\pi^2\sin(\pi x)+\pi^2\cos(\pi x)$.`,
        String.raw`$f'=0\iff\tan(\pi x)=-1$ ו-$f''=0\iff\tan(\pi x)=1$, כאשר $\pi x\in[-\pi,\pi]$.`,
      ],
      solutionSteps: [
        String.raw`$f'(x)=\pi\left(\cos\pi x+\sin\pi x\right)=0\iff\tan\pi x=-1$. עבור $\pi x\in[-\pi,\pi]$: $\pi x=-\frac\pi4$ או $\frac{3\pi}4$, כלומר $x=-\frac14$, $x=\frac34$.`,
        String.raw`$f'(0)=\pi>0$, $f'(-1)=-\pi<0$, $f'(1)=-\pi<0$: יורדת ב-$\left[-1,-\frac14\right)$, עולה ב-$\left(-\frac14,\frac34\right)$, יורדת ב-$\left(\frac34,1\right]$.`,
        String.raw`מינימום ב-$x=-\frac14$: $f=\sin\left(-\frac\pi4\right)-\cos\left(-\frac\pi4\right)=-\sqrt2$; מקסימום ב-$x=\frac34$: $f=\frac{\sqrt2}2+\frac{\sqrt2}2=\sqrt2$. בקצוות $f(\pm1)=0-(-1)=1$ (מקסימום קצה ב-$x=-1$, מינימום קצה ב-$x=1$).`,
        String.raw`$f''(x)=\pi^2\left(\cos\pi x-\sin\pi x\right)=0\iff\tan\pi x=1\iff x=-\frac34$ או $x=\frac14$.`,
        String.raw`$f''(0)=\pi^2>0$ ו-$f''(\pm1)=-\pi^2<0$: $\cup$ ב-$\left(-\frac34,\frac14\right)$, $\cap$ ב-$\left(-1,-\frac34\right)$ וב-$\left(\frac14,1\right)$.`,
        String.raw`נקודות פיתול: $f\left(-\frac34\right)=-\frac{\sqrt2}2+\frac{\sqrt2}2=0$ ו-$f\left(\frac14\right)=\frac{\sqrt2}2-\frac{\sqrt2}2=0$, כלומר $\left(-\frac34,0\right)$ ו-$\left(\frac14,0\right)$.`,
      ],
      finalAnswer: String.raw`יורדת ב-$\left[-1,-\frac14\right)$ וב-$\left(\frac34,1\right]$, עולה ב-$\left(-\frac14,\frac34\right)$; מינימום $\left(-\frac14,-\sqrt2\right)$, מקסימום $\left(\frac34,\sqrt2\right)$; $\cup$ ב-$\left(-\frac34,\frac14\right)$, $\cap$ ב-$\left(-1,-\frac34\right)$ וב-$\left(\frac14,1\right)$; פיתול $\left(-\frac34,0\right)$, $\left(\frac14,0\right)$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של המינימום`, value: -0.25 },
        { label: String.raw`הערך המינימלי`, value: -Math.SQRT2 },
        { label: String.raw`שיעור ה-$x$ של המקסימום`, value: 0.75 },
        { label: String.raw`הערך המקסימלי`, value: Math.SQRT2 },
        { label: String.raw`נקודת הפיתול השמאלית $x=$`, value: -0.75 },
        { label: String.raw`נקודת הפיתול הימנית $x=$`, value: 0.25 },
      ],
      source: s45(231),
    },
  ],
  'calc-extremum-problems': [
    {
      id: 'calc-extremum-problems-os1',
      difficulty: 1,
      statement: String.raw`מצאו את הנקודה על הישר $y=5-2x$ הקרובה ביותר לראשית הצירים. (במקור: היעזרו גם בשרטוט במחשבון.)`,
      hints: [
        String.raw`נקודה כללית על הישר היא $(x,5-2x)$. רשמו את ריבוע המרחק שלה מהראשית כפונקציה של $x$.`,
        String.raw`המרחק מינימלי בדיוק כאשר ריבוע המרחק $D(x)=x^2+(5-2x)^2$ מינימלי – כך נמנעים מגזירת שורש.`,
      ],
      solutionSteps: [
        String.raw`נקודה כללית על הישר: $P(x,5-2x)$. ריבוע מרחקה מהראשית: $D(x)=x^2+(5-2x)^2=5x^2-20x+25$.`,
        String.raw`המרחק $d=\sqrt{D}$ מינימלי כאשר $D$ מינימלי, כי פונקציית השורש עולה.`,
        String.raw`$D'(x)=10x-20=0\iff x=2$, ו-$D''(x)=10>0$, ולכן זה מינימום.`,
        String.raw`$y=5-2\cdot2=1$: הנקודה $(2,1)$, והמרחק המינימלי $\sqrt{D(2)}=\sqrt5$.`,
      ],
      finalAnswer: String.raw`$(2,1)$`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של הנקודה`, value: 2 },
        { label: String.raw`שיעור ה-$y$ של הנקודה`, value: 1 },
      ],
      source: s47(347),
    },
    {
      id: 'calc-extremum-problems-os2',
      difficulty: 2,
      statement: String.raw`מצאו את הנקודה על הישר $y=5-2x$ הקרובה ביותר לנקודה $(1,1)$. (במקור: היעזרו גם בשרטוט במחשבון.)`,
      hints: [
        String.raw`ריבוע המרחק של $(x,5-2x)$ מ-$(1,1)$ הוא $D(x)=(x-1)^2+(4-2x)^2$.`,
        String.raw`גזרו את $D$ והשוו לאפס.`,
      ],
      solutionSteps: [
        String.raw`נקודה כללית על הישר: $P(x,5-2x)$. ריבוע המרחק מ-$(1,1)$: $D(x)=(x-1)^2+(5-2x-1)^2=(x-1)^2+(4-2x)^2=5x^2-18x+17$.`,
        String.raw`$D'(x)=10x-18=0\iff x=\frac95$, ו-$D''=10>0$ – מינימום (והמרחק $\sqrt D$ מינימלי באותה נקודה).`,
        String.raw`$y=5-\frac{18}5=\frac75$: הנקודה $\left(\frac95,\frac75\right)$.`,
        String.raw`המרחק המינימלי: $D\left(\frac95\right)=\frac{16}{25}+\frac4{25}=\frac45$, כלומר $d=\frac{2}{\sqrt5}$.`,
      ],
      finalAnswer: String.raw`$\left(\frac95,\frac75\right)=(1.8,\ 1.4)$`,
      answers: [
        { label: String.raw`שיעור ה-$x$ של הנקודה`, value: 1.8 },
        { label: String.raw`שיעור ה-$y$ של הנקודה`, value: 1.4 },
      ],
      source: s47(348),
    },
    {
      id: 'calc-extremum-problems-os3',
      difficulty: 2,
      statement: String.raw`מצאו את השטח של המלבן הגדול ביותר שאפשר להכניס לתוך המשולש שצלעותיו נמצאות על הישרים $x=0$, $y=0$ ו-$\frac x4+\frac y6=1$. (כמו בשרטוט: שתי צלעות של המלבן מונחות על הצירים, והקודקוד $(x,y)$ שלו נמצא על הצלע השלישית של המשולש.)`,
      figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="61.5,199.8 99.0,199.8 99.0,95.2 61.5,95.2" fill="currentColor" fill-opacity="0.15" stroke-width="1.5" />
  <line x1="40.0" y1="199.8" x2="206.4" y2="199.8" stroke-width="1.5" />
  <polyline points="200.4,195.8 206.4,199.8 200.4,203.8" stroke-width="1.5" />
  <line x1="61.5" y1="224.0" x2="61.5" y2="12.0" stroke-width="1.5" />
  <polyline points="57.5,18.0 61.5,12.0 65.5,18.0" stroke-width="1.5" />
  <polyline points="53.4,26.8 176.9,211.9" />
  <circle cx="99.0" cy="95.2" r="2.5" fill="currentColor" />
  <line x1="168.8" y1="196.8" x2="168.8" y2="202.8" stroke-width="1" />
  <line x1="58.5" y1="38.8" x2="64.5" y2="38.8" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-family="sans-serif">
    <text x="67" y="24" font-size="16">y</text>
    <text x="196" y="218" font-size="16">x</text>
    <text x="165" y="216" font-size="13">4</text>
    <text x="46" y="44" font-size="13">6</text>
    <text x="103" y="91" font-size="16">(x, y)</text>
    <text x="134" y="130" font-size="16">x/4 + y/6 = 1</text>
  </g>
</svg>`,
      hints: [
        String.raw`מהמשוואה של הצלע השלישית: $y=6-\frac32x$, כאשר $0<x<4$.`,
        String.raw`שטח המלבן: $S(x)=x\cdot y=x\left(6-\frac32x\right)$.`,
      ],
      solutionSteps: [
        String.raw`הקודקוד על הישר $\frac x4+\frac y6=1$, ולכן $y=6-\frac32x$, ותחום המשתנה $0<x<4$.`,
        String.raw`שטח המלבן: $S(x)=x\left(6-\frac32x\right)=6x-\frac32x^2$.`,
        String.raw`$S'(x)=6-3x=0\iff x=2$, ו-$S''(x)=-3<0$ – מקסימום.`,
        String.raw`$y=6-3=3$, והשטח המקסימלי $S(2)=2\cdot3=6$ (חצי משטח המשולש, $\frac{4\cdot6}{2}=12$).`,
      ],
      finalAnswer: String.raw`השטח המקסימלי $6$ (המלבן $2\times3$).`,
      answers: [
        { label: String.raw`השטח המקסימלי`, value: 6 },
        { label: String.raw`שיעור ה-$x$ של הקודקוד`, value: 2 },
        { label: String.raw`שיעור ה-$y$ של הקודקוד`, value: 3 },
      ],
      source: s47(343),
    },
    {
      id: 'calc-extremum-problems-os4',
      difficulty: 3,
      statement: String.raw`מצאו את הנקודות על הפרבולה $y=x^2$ הקרובות ביותר לנקודה $(0,3)$. (במקור: היעזרו גם בשרטוט במחשבון.)`,
      hints: [
        String.raw`ריבוע המרחק של $(x,x^2)$ מ-$(0,3)$: $D(x)=x^2+\left(x^2-3\right)^2=x^4-5x^2+9$.`,
        String.raw`$D'(x)=4x^3-10x=2x\left(2x^2-5\right)$ – שלוש נקודות חשודות. בנו טבלת סימנים.`,
      ],
      solutionSteps: [
        String.raw`נקודה כללית על הפרבולה: $(x,x^2)$. ריבוע המרחק מ-$(0,3)$: $D(x)=x^2+\left(x^2-3\right)^2=x^4-5x^2+9$.`,
        String.raw`$D'(x)=4x^3-10x=2x\left(2x^2-5\right)=0\iff x=0$ או $x=\pm\sqrt{\frac52}=\pm\frac{\sqrt{10}}2$.`,
        String.raw`סימן $D'$: שלילי עבור $x<-\frac{\sqrt{10}}2$, חיובי ב-$\left(-\frac{\sqrt{10}}2,0\right)$, שלילי ב-$\left(0,\frac{\sqrt{10}}2\right)$, חיובי עבור $x>\frac{\sqrt{10}}2$.`,
        String.raw`לכן ב-$x=\pm\frac{\sqrt{10}}2$ מינימום, וב-$x=0$ מקסימום מקומי (שם המרחק הוא $3$).`,
        String.raw`$y=x^2=\frac52$ ו-$D=\frac{25}4-\frac{25}2+9=\frac{11}4$, כלומר המרחק המינימלי $\frac{\sqrt{11}}2\approx1.658<3$.`,
        String.raw`יש שתי נקודות כאלה (הפרבולה סימטרית לציר $y$): $\left(\pm\frac{\sqrt{10}}2,\frac52\right)$.`,
      ],
      finalAnswer: String.raw`$\left(\frac{\sqrt{10}}2,\frac52\right)$ ו-$\left(-\frac{\sqrt{10}}2,\frac52\right)$; המרחק המינימלי $\frac{\sqrt{11}}2$.`,
      answers: [
        { label: String.raw`שיעור ה-$x$ החיובי של הנקודה`, value: Math.sqrt(10) / 2 },
        { label: String.raw`שיעור ה-$y$ של הנקודות`, value: 2.5 },
        { label: String.raw`המרחק המינימלי`, value: Math.sqrt(11) / 2 },
      ],
      source: s47(350),
    },
  ],
  'calc-indefinite-integral': [
    {
      id: 'calc-indefinite-integral-os1',
      difficulty: 1,
      statement: String.raw`מצאו את הצורה הכללית של הפונקציה הקדומה $F(x)$ של הפונקציה $f(x)=x+12x^2$.`,
      hints: [String.raw`$\int x^n\,dx=\frac{x^{n+1}}{n+1}+C$; אל תשכחו את קבוע האינטגרציה.`],
      solutionSteps: [
        String.raw`$\int x\,dx=\frac{x^2}2$ ו-$\int12x^2\,dx=12\cdot\frac{x^3}3=4x^3$.`,
        String.raw`לכן $F(x)=\frac12x^2+4x^3+C$.`,
        String.raw`בדיקה: $F'(x)=x+12x^2=f(x)$ ✓.`,
      ],
      finalAnswer: String.raw`$F(x)=\frac12x^2+4x^3+C$`,
      source: s410(475),
    },
    {
      id: 'calc-indefinite-integral-os2',
      difficulty: 1,
      statement: String.raw`חשבו את האינטגרל $\int\frac{3x^2+2}{x^2}\,dx$.`,
      hints: [
        String.raw`אין כלל לאינטגרל של מנה – חלקו כל מחובר במונה ב-$x^2$.`,
        String.raw`$\frac{3x^2+2}{x^2}=3+2x^{-2}$.`,
      ],
      solutionSteps: [
        String.raw`עבור $x\ne0$: $\frac{3x^2+2}{x^2}=3+2x^{-2}$.`,
        String.raw`$\int3\,dx=3x$ ו-$\int2x^{-2}\,dx=2\cdot\frac{x^{-1}}{-1}=-\frac2x$.`,
        String.raw`לכן $\int\frac{3x^2+2}{x^2}\,dx=3x-\frac2x+C$.`,
      ],
      finalAnswer: String.raw`$3x-\frac2x+C$`,
      source: s410(493),
    },
    {
      id: 'calc-indefinite-integral-os3',
      difficulty: 2,
      statement: String.raw`חשבו את האינטגרל $\int\frac{14x^3+2x+1}{x^3}\,dx$.`,
      hints: [String.raw`חלקו כל מחובר ב-$x^3$: $14+2x^{-2}+x^{-3}$.`],
      solutionSteps: [
        String.raw`עבור $x\ne0$: $\frac{14x^3+2x+1}{x^3}=14+2x^{-2}+x^{-3}$.`,
        String.raw`$\int14\,dx=14x$, $\int2x^{-2}\,dx=-2x^{-1}=-\frac2x$, $\int x^{-3}\,dx=\frac{x^{-2}}{-2}=-\frac1{2x^2}$.`,
        String.raw`לכן האינטגרל שווה ל-$14x-\frac2x-\frac{1}{2x^2}+C$.`,
      ],
      finalAnswer: String.raw`$14x-\frac2x-\frac1{2x^2}+C$`,
      source: s410(497),
    },
    {
      id: 'calc-indefinite-integral-os4',
      difficulty: 2,
      statement: String.raw`מצאו את האינטגרל $\int(2x-3)^{-7}\,dx$ בעזרת ההצבה $u=2x-3$.`,
      hints: [
        String.raw`$du=2\,dx$, כלומר $dx=\frac{du}{2}$.`,
        String.raw`אותה תוצאה מתקבלת מהנוסחה $\int(ax+b)^n\,dx=\frac{(ax+b)^{n+1}}{a(n+1)}+C$.`,
      ],
      solutionSteps: [
        String.raw`נציב $u=2x-3$; אז $du=2\,dx$, ולכן $dx=\frac{du}2$.`,
        String.raw`$\int(2x-3)^{-7}\,dx=\frac12\int u^{-7}\,du=\frac12\cdot\frac{u^{-6}}{-6}+C=-\frac{1}{12u^6}+C$.`,
        String.raw`נחזור ל-$x$: $\int(2x-3)^{-7}\,dx=-\frac{1}{12(2x-3)^6}+C$.`,
        String.raw`(לפי הנוסחה עם $a=2$, $n=-7$: $\frac{(2x-3)^{-6}}{2\cdot(-6)}$ – אותה תוצאה.)`,
      ],
      finalAnswer: String.raw`$-\frac{1}{12(2x-3)^6}+C$`,
      source: s55(263),
    },
    {
      id: 'calc-indefinite-integral-os5',
      difficulty: 2,
      statement: String.raw`חשבו את האינטגרל $\int\frac{x^2}{\left(x^3-3\right)^2}\,dx$.`,
      hints: [
        String.raw`הנגזרת של הביטוי שבמכנה, $x^3-3$, היא $3x^2$ – כמעט המונה.`,
        String.raw`$\int\frac{c\,f'(x)}{(f(x))^n}\,dx=\frac{c\,(f(x))^{1-n}}{1-n}+C$ (עבור $n\ne1$).`,
      ],
      solutionSteps: [
        String.raw`נסמן $f(x)=x^3-3$, אז $f'(x)=3x^2$, ולכן $x^2=\frac13f'(x)$.`,
        String.raw`$\int\frac{x^2}{(x^3-3)^2}\,dx=\frac13\int\frac{f'(x)}{(f(x))^2}\,dx$.`,
        String.raw`$\int\frac{f'(x)}{(f(x))^2}\,dx=\frac{(f(x))^{-1}}{-1}+C=-\frac{1}{f(x)}+C$.`,
        String.raw`לכן $\int\frac{x^2}{(x^3-3)^2}\,dx=-\frac{1}{3\left(x^3-3\right)}+C$ (בכל קטע שבו $x^3\ne3$).`,
        String.raw`בדיקה: $\left(-\frac13(x^3-3)^{-1}\right)'=\frac13(x^3-3)^{-2}\cdot3x^2=\frac{x^2}{(x^3-3)^2}$ ✓.`,
      ],
      finalAnswer: String.raw`$-\frac{1}{3\left(x^3-3\right)}+C$`,
      source: s55(281),
    },
    {
      id: 'calc-indefinite-integral-os6',
      difficulty: 3,
      statement: String.raw`מצאו את האינטגרל $\int(x-1)\left(x^2-2x\right)^3\,dx$ בעזרת ההצבה $u=x^2-2x$.`,
      hints: [
        String.raw`$du=(2x-2)\,dx=2(x-1)\,dx$, כלומר $(x-1)\,dx=\frac{du}2$.`,
        String.raw`בשפת הנוסחה: $f(x)=x^2-2x$ ו-$(x-1)=\frac12f'(x)$, ולכן האינטגרנד הוא $\frac12f'(x)\,(f(x))^3$.`,
      ],
      solutionSteps: [
        String.raw`נציב $u=x^2-2x$; אז $du=(2x-2)\,dx=2(x-1)\,dx$, ולכן $(x-1)\,dx=\frac{du}2$.`,
        String.raw`$\int(x-1)\left(x^2-2x\right)^3\,dx=\frac12\int u^3\,du=\frac12\cdot\frac{u^4}4+C=\frac{u^4}8+C$.`,
        String.raw`נחזור ל-$x$: $\frac18\left(x^2-2x\right)^4+C$.`,
        String.raw`בדיקה: $\left(\frac18(x^2-2x)^4\right)'=\frac48(x^2-2x)^3(2x-2)=(x-1)(x^2-2x)^3$ ✓. (אפשר גם לפתוח סוגריים ולקבל פולינום – הדרך ארוכה בהרבה.)`,
      ],
      finalAnswer: String.raw`$\frac18\left(x^2-2x\right)^4+C$`,
      source: s55(267),
    },
  ],
  'calc-graph-integral': [
    {
      id: 'calc-graph-integral-os1',
      difficulty: 1,
      statement: String.raw`מצאו את הפונקציה $f$ שמקיימת $f'(x)=x^{-3}$ ו-$f(1)=1$.`,
      hints: [
        String.raw`$f(x)=\int x^{-3}\,dx=\frac{x^{-2}}{-2}+C$.`,
        String.raw`הציבו $x=1$ ו-$f(1)=1$ כדי למצוא את $C$.`,
      ],
      solutionSteps: [
        String.raw`$f(x)=\int x^{-3}\,dx=\frac{x^{-2}}{-2}+C=-\frac1{2x^2}+C$.`,
        String.raw`$f(1)=-\frac12+C=1$, ולכן $C=\frac32$.`,
        String.raw`$f(x)=-\frac1{2x^2}+\frac32$ (בקטע $x>0$ שבו נמצאת הנקודה $x=1$).`,
      ],
      finalAnswer: String.raw`$f(x)=-\frac{1}{2x^2}+\frac32$`,
      answers: [{ label: String.raw`קבוע האינטגרציה $C$ ב-$f(x)=-\frac{1}{2x^2}+C$`, value: 1.5 }],
      source: s410(499),
    },
    {
      id: 'calc-graph-integral-os2',
      difficulty: 1,
      statement: String.raw`מצאו את הפונקציה $f$ שמקיימת $f'(x)=x^3-8x^2+16x+1$ ו-$f(0)=0$.`,
      hints: [String.raw`בצעו אינטגרל לכל מחובר, הוסיפו $C$ והציבו $x=0$.`],
      solutionSteps: [
        String.raw`$f(x)=\int\left(x^3-8x^2+16x+1\right)dx=\frac{x^4}4-\frac{8x^3}3+8x^2+x+C$.`,
        String.raw`$f(0)=C=0$.`,
        String.raw`לכן $f(x)=\frac{x^4}4-\frac83x^3+8x^2+x$.`,
      ],
      finalAnswer: String.raw`$f(x)=\frac14x^4-\frac83x^3+8x^2+x$`,
      source: s410(502),
    },
    {
      id: 'calc-graph-integral-os3',
      difficulty: 2,
      statement: String.raw`נגדיר $F(x)=\int_1^x(1-t)\,dt$. מצאו את $F'(2)$ ואת הערך הממוצע של $F'$ בקטע $[1,2]$, כלומר $\frac{1}{2-1}\int_1^2F'(x)\,dx$.`,
      hints: [
        String.raw`חשבו את $F(x)$ במפורש: פונקציה קדומה של $1-t$ היא $t-\frac{t^2}2$.`,
        String.raw`האינטגרל של נגזרת שווה לשינוי בפונקציה: $\int_1^2F'(x)\,dx=F(2)-F(1)$.`,
      ],
      solutionSteps: [
        String.raw`$F(x)=\left[t-\frac{t^2}2\right]_1^x=x-\frac{x^2}2-\frac12$.`,
        String.raw`$F'(x)=1-x$ – הפונקציה שבתוך האינטגרל, מוצבת בגבול העליון. לכן $F'(2)=-1$.`,
        String.raw`$\int_1^2F'(x)\,dx=F(2)-F(1)=\left(2-2-\frac12\right)-0=-\frac12$.`,
        String.raw`אורך הקטע $1$, ולכן הערך הממוצע של $F'$ הוא $-\frac12$.`,
      ],
      finalAnswer: String.raw`$F'(2)=-1$; הערך הממוצע $-\frac12$.`,
      answers: [
        { label: String.raw`$F'(2)$`, value: -1 },
        { label: String.raw`הערך הממוצע של $F'$ בקטע $[1,2]$`, value: -0.5 },
      ],
      source: s53(147),
    },
    {
      id: 'calc-graph-integral-os4',
      difficulty: 2,
      statement: String.raw`בשרטוט מתואר גרף הפונקציה $y=f(x)$ בקטע $[0,12]$. הגרף מורכב משלושה משולשים שווי שוקיים: אחד שקודקודיו $(0,0)$, $(1,1)$, $(2,0)$; אחד שקודקודיו $(2,0)$, $(4,-2)$, $(6,0)$; ואחד שקודקודיו $(6,0)$, $(9,3)$, $(12,0)$. חשבו את $\int_0^{12}f(x)\,dx$ בעזרת נוסחת שטח משולש, כשאת השטחים שמתחת לציר $x$ מחסירים.`,
      figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.8,130.8 48.1,109.5 69.5,130.8" fill="currentColor" fill-opacity="0.15" stroke="none" />
  <polygon points="69.5,130.8 112.2,173.5 154.9,130.8" fill="currentColor" fill-opacity="0.15" stroke="none" />
  <polygon points="154.9,130.8 218.9,66.8 282.9,130.8" fill="currentColor" fill-opacity="0.15" stroke="none" />
  <line x1="14.0" y1="130.8" x2="300.0" y2="130.8" stroke-width="1.5" />
  <polyline points="294.0,126.8 300.0,130.8 294.0,134.8" stroke-width="1.5" />
  <line x1="26.8" y1="186.3" x2="26.8" y2="54.0" stroke-width="1.5" />
  <polyline points="22.8,60.0 26.8,54.0 30.8,60.0" stroke-width="1.5" />
  <polyline points="26.8,130.8 48.1,109.5 69.5,130.8 112.2,173.5 154.9,130.8 218.9,66.8 282.9,130.8" />
  <line x1="69.5" y1="127.8" x2="69.5" y2="133.8" stroke-width="1" />
  <line x1="112.2" y1="127.8" x2="112.2" y2="133.8" stroke-width="1" />
  <line x1="154.9" y1="127.8" x2="154.9" y2="133.8" stroke-width="1" />
  <line x1="218.9" y1="127.8" x2="218.9" y2="133.8" stroke-width="1" />
  <line x1="282.9" y1="127.8" x2="282.9" y2="133.8" stroke-width="1" />
  <line x1="23.8" y1="109.5" x2="29.8" y2="109.5" stroke-width="1" />
  <line x1="23.8" y1="88.1" x2="29.8" y2="88.1" stroke-width="1" />
  <line x1="23.8" y1="66.8" x2="29.8" y2="66.8" stroke-width="1" />
  <line x1="23.8" y1="173.5" x2="29.8" y2="173.5" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-family="sans-serif">
    <text x="33" y="66" font-size="16">y</text>
    <text x="290" y="149" font-size="16">x</text>
    <text x="74" y="125" font-size="13">2</text>
    <text x="108" y="125" font-size="13">4</text>
    <text x="142" y="125" font-size="13">6</text>
    <text x="215" y="147" font-size="13">9</text>
    <text x="275" y="147" font-size="13">12</text>
    <text x="12" y="114" font-size="13">1</text>
    <text x="12" y="93" font-size="13">2</text>
    <text x="12" y="72" font-size="13">3</text>
    <text x="5" y="179" font-size="13">-2</text>
    <text x="227" y="63" font-size="16">y = f(x)</text>
  </g>
</svg>`,
      hints: [
        String.raw`האינטגרל המסוים הוא ״שטח עם סימן״: שטח מעל ציר $x$ נספר בחיוב, שטח מתחתיו – בשלילה.`,
        String.raw`שטח משולש הוא חצי ממכפלת הבסיס בגובה – כאן הבסיסים $2$, $4$, $6$ והגבהים $1$, $2$, $3$.`,
      ],
      solutionSteps: [
        String.raw`המשולש הראשון (מעל הציר): בסיס $2$, גובה $1$, שטח $1$.`,
        String.raw`המשולש השני (מתחת לציר): בסיס $4$, גובה $2$, שטח $4$, ולכן $\int_2^6f(x)\,dx=-4$.`,
        String.raw`המשולש השלישי (מעל הציר): בסיס $6$, גובה $3$, שטח $9$.`,
        String.raw`לפי חיבור קטעים: $\int_0^{12}f(x)\,dx=1-4+9=6$.`,
      ],
      finalAnswer: String.raw`$\int_0^{12}f(x)\,dx=6$`,
      answers: [{ label: String.raw`$\int_0^{12}f(x)\,dx$`, value: 6 }],
      source: s52(73),
    },
    {
      id: 'calc-graph-integral-os5',
      difficulty: 2,
      statement: String.raw`בשרטוט מתואר גרף הפונקציה $y=f(x)$ בקטע $[0,12]$. הגרף מורכב ממשולש שקודקודיו $(0,0)$, $(1,1)$, $(2,0)$; מחצי מעגל תחתון שמרכזו $(4,0)$ ורדיוסו $2$ (בין $x=2$ ל-$x=6$, מתחת לציר $x$); וממשולש שקודקודיו $(6,0)$, $(9,3)$, $(12,0)$. חשבו את $\int_0^{12}f(x)\,dx$ בעזרת נוסחאות לשטח משולש ולשטח עיגול, כשאת השטחים שמתחת לציר $x$ מחסירים.`,
      figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.8,130.8 48.1,109.5 69.5,130.8" fill="currentColor" fill-opacity="0.15" stroke="none" />
  <polygon points="69.5,130.8 69.7,134.6 70.1,138.2 70.9,141.9 72.1,145.4 73.5,148.9 75.2,152.2 77.2,155.3 79.5,158.3 82.0,161.0 84.7,163.5 87.7,165.8 90.8,167.8 94.1,169.5 97.6,170.9 101.1,172.1 104.8,172.9 108.5,173.4 112.2,173.5 115.9,173.4 119.6,172.9 123.2,172.1 126.8,170.9 130.2,169.5 133.5,167.8 136.7,165.8 139.6,163.5 142.4,161.0 144.9,158.3 147.1,155.3 149.1,152.2 150.9,148.9 152.3,145.4 153.4,141.9 154.2,138.2 154.7,134.6 154.9,130.8" fill="currentColor" fill-opacity="0.15" stroke="none" />
  <polygon points="154.9,130.8 218.9,66.8 282.9,130.8" fill="currentColor" fill-opacity="0.15" stroke="none" />
  <line x1="14.0" y1="130.8" x2="300.0" y2="130.8" stroke-width="1.5" />
  <polyline points="294.0,126.8 300.0,130.8 294.0,134.8" stroke-width="1.5" />
  <line x1="26.8" y1="186.3" x2="26.8" y2="54.0" stroke-width="1.5" />
  <polyline points="22.8,60.0 26.8,54.0 30.8,60.0" stroke-width="1.5" />
  <polyline points="26.8,130.8 48.1,109.5 69.5,130.8 69.5,130.8 69.7,134.6 70.1,138.2 70.9,141.9 72.1,145.4 73.5,148.9 75.2,152.2 77.2,155.3 79.5,158.3 82.0,161.0 84.7,163.5 87.7,165.8 90.8,167.8 94.1,169.5 97.6,170.9 101.1,172.1 104.8,172.9 108.5,173.4 112.2,173.5 115.9,173.4 119.6,172.9 123.2,172.1 126.8,170.9 130.2,169.5 133.5,167.8 136.7,165.8 139.6,163.5 142.4,161.0 144.9,158.3 147.1,155.3 149.1,152.2 150.9,148.9 152.3,145.4 153.4,141.9 154.2,138.2 154.7,134.6 154.9,130.8 218.9,66.8 282.9,130.8" />
  <line x1="69.5" y1="127.8" x2="69.5" y2="133.8" stroke-width="1" />
  <line x1="112.2" y1="127.8" x2="112.2" y2="133.8" stroke-width="1" />
  <line x1="154.9" y1="127.8" x2="154.9" y2="133.8" stroke-width="1" />
  <line x1="218.9" y1="127.8" x2="218.9" y2="133.8" stroke-width="1" />
  <line x1="282.9" y1="127.8" x2="282.9" y2="133.8" stroke-width="1" />
  <line x1="23.8" y1="109.5" x2="29.8" y2="109.5" stroke-width="1" />
  <line x1="23.8" y1="88.1" x2="29.8" y2="88.1" stroke-width="1" />
  <line x1="23.8" y1="66.8" x2="29.8" y2="66.8" stroke-width="1" />
  <line x1="23.8" y1="173.5" x2="29.8" y2="173.5" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-family="sans-serif">
    <text x="33" y="66" font-size="16">y</text>
    <text x="290" y="149" font-size="16">x</text>
    <text x="74" y="125" font-size="13">2</text>
    <text x="108" y="125" font-size="13">4</text>
    <text x="142" y="125" font-size="13">6</text>
    <text x="215" y="147" font-size="13">9</text>
    <text x="275" y="147" font-size="13">12</text>
    <text x="12" y="114" font-size="13">1</text>
    <text x="12" y="93" font-size="13">2</text>
    <text x="12" y="72" font-size="13">3</text>
    <text x="5" y="179" font-size="13">-2</text>
    <text x="227" y="63" font-size="16">y = f(x)</text>
  </g>
</svg>`,
      hints: [
        String.raw`שטח חצי עיגול ברדיוס $r$ הוא $\frac{\pi r^2}{2}$.`,
        String.raw`החלק שמתחת לציר $x$ נספר בשלילה.`,
      ],
      solutionSteps: [
        String.raw`המשולש הראשון (מעל הציר): שטח $\frac{2\cdot1}2=1$.`,
        String.raw`חצי העיגול (מתחת לציר): שטח $\frac{\pi\cdot2^2}2=2\pi$, ולכן $\int_2^6f(x)\,dx=-2\pi$.`,
        String.raw`המשולש השלישי (מעל הציר): שטח $\frac{6\cdot3}2=9$.`,
        String.raw`$\int_0^{12}f(x)\,dx=1-2\pi+9=10-2\pi\approx3.717$.`,
      ],
      finalAnswer: String.raw`$\int_0^{12}f(x)\,dx=10-2\pi\approx3.717$`,
      answers: [{ label: String.raw`$\int_0^{12}f(x)\,dx$`, value: 10 - 2 * Math.PI }],
      source: s52(75),
    },
    {
      id: 'calc-graph-integral-os6',
      difficulty: 3,
      statement: String.raw`בשרטוט מתואר הגרף של $F(x)=\int_0^xf(t)\,dt$, כאשר $f$ קבועה בכל אחד מהקטעים $(0,1),(1,2),\dots,(5,6)$. הגרף של $F$ הוא קו שבור העובר דרך הנקודות $(0,0)$, $(1,-1)$, $(2,1)$, $(3,1)$, $(4,-2)$, $(5,-2)$, $(6,0)$.

א. באילו קטעים $f$ חיובית? באילו היא שלילית? באילו (אם יש) היא שווה לאפס?

ב. מהם הערך המקסימלי והערך המינימלי של $f$?

ג. מהו הערך הממוצע של $f$ בקטע $[0,6]$, כלומר $\frac16\int_0^6f(t)\,dt$?`,
      figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="44.0" y1="203.3" x2="44.0" y2="54.8" stroke-width="0.5" stroke-dasharray="2 3" />
  <line x1="81.1" y1="203.3" x2="81.1" y2="54.8" stroke-width="0.5" stroke-dasharray="2 3" />
  <line x1="118.2" y1="203.3" x2="118.2" y2="54.8" stroke-width="0.5" stroke-dasharray="2 3" />
  <line x1="155.3" y1="203.3" x2="155.3" y2="54.8" stroke-width="0.5" stroke-dasharray="2 3" />
  <line x1="192.4" y1="203.3" x2="192.4" y2="54.8" stroke-width="0.5" stroke-dasharray="2 3" />
  <line x1="229.5" y1="203.3" x2="229.5" y2="54.8" stroke-width="0.5" stroke-dasharray="2 3" />
  <line x1="266.6" y1="203.3" x2="266.6" y2="54.8" stroke-width="0.5" stroke-dasharray="2 3" />
  <line x1="44.0" y1="184.7" x2="285.2" y2="184.7" stroke-width="0.5" stroke-dasharray="2 3" />
  <line x1="44.0" y1="147.6" x2="285.2" y2="147.6" stroke-width="0.5" stroke-dasharray="2 3" />
  <line x1="44.0" y1="73.4" x2="285.2" y2="73.4" stroke-width="0.5" stroke-dasharray="2 3" />
  <line x1="18.0" y1="110.5" x2="300.0" y2="110.5" stroke-width="1.5" />
  <polyline points="294.0,106.5 300.0,110.5 294.0,114.5" stroke-width="1.5" />
  <line x1="44.0" y1="210.7" x2="44.0" y2="40.0" stroke-width="1.5" />
  <polyline points="40.0,46.0 44.0,40.0 48.0,46.0" stroke-width="1.5" />
  <polyline points="44.0,110.5 81.1,147.6 118.2,73.4 155.3,73.4 192.4,184.7 229.5,184.7 266.6,110.5" />
  <line x1="81.1" y1="107.5" x2="81.1" y2="113.5" stroke-width="1" />
  <line x1="118.2" y1="107.5" x2="118.2" y2="113.5" stroke-width="1" />
  <line x1="155.3" y1="107.5" x2="155.3" y2="113.5" stroke-width="1" />
  <line x1="192.4" y1="107.5" x2="192.4" y2="113.5" stroke-width="1" />
  <line x1="229.5" y1="107.5" x2="229.5" y2="113.5" stroke-width="1" />
  <line x1="266.6" y1="107.5" x2="266.6" y2="113.5" stroke-width="1" />
  <line x1="41.0" y1="73.4" x2="47.0" y2="73.4" stroke-width="1" />
  <line x1="41.0" y1="147.6" x2="47.0" y2="147.6" stroke-width="1" />
  <line x1="41.0" y1="184.7" x2="47.0" y2="184.7" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-family="sans-serif">
    <text x="50" y="52" font-size="16">y</text>
    <text x="290" y="128" font-size="16">x</text>
    <text x="77" y="126" font-size="13">1</text>
    <text x="114" y="126" font-size="13">2</text>
    <text x="151" y="126" font-size="13">3</text>
    <text x="188" y="104" font-size="13">4</text>
    <text x="225" y="104" font-size="13">5</text>
    <text x="271" y="126" font-size="13">6</text>
    <text x="29" y="78" font-size="13">1</text>
    <text x="22" y="153" font-size="13">-1</text>
    <text x="22" y="190" font-size="13">-2</text>
    <text x="126" y="60" font-size="16">y = F(x)</text>
  </g>
</svg>`,
      hints: [
        String.raw`לפי המשפט היסודי $F'(x)=f(x)$: הערך של $f$ בכל קטע הוא השיפוע של הגרף של $F$ באותו קטע.`,
        String.raw`$\int_0^6f(t)\,dt=F(6)-F(0)$.`,
      ],
      solutionSteps: [
        String.raw`לפי המשפט היסודי, $F'(x)=f(x)$, ולכן $f$ בכל קטע שווה לשיפוע הקטע המתאים בגרף של $F$.`,
        String.raw`השיפועים: ב-$(0,1)$: $-1$; ב-$(1,2)$: $\frac{1-(-1)}1=2$; ב-$(2,3)$: $0$; ב-$(3,4)$: $\frac{-2-1}1=-3$; ב-$(4,5)$: $0$; ב-$(5,6)$: $\frac{0-(-2)}1=2$.`,
        String.raw`א. $f$ חיובית ב-$(1,2)$ וב-$(5,6)$, שלילית ב-$(0,1)$ וב-$(3,4)$, ושווה לאפס ב-$(2,3)$ וב-$(4,5)$ – שם $F$ קבועה.`,
        String.raw`ב. הערך המקסימלי של $f$ הוא $2$ והמינימלי $-3$.`,
        String.raw`ג. $\frac16\int_0^6f(t)\,dt=\frac{F(6)-F(0)}6=\frac{0-0}6=0$.`,
      ],
      finalAnswer: String.raw`א. חיובית ב-$(1,2)$, $(5,6)$; שלילית ב-$(0,1)$, $(3,4)$; אפס ב-$(2,3)$, $(4,5)$. ב. מקסימום $2$, מינימום $-3$. ג. $0$.`,
      answers: [
        { label: String.raw`הערך המקסימלי של $f$`, value: 2 },
        { label: String.raw`הערך המינימלי של $f$`, value: -3 },
        { label: String.raw`הערך הממוצע של $f$ בקטע $[0,6]$`, value: 0 },
      ],
      source: s53(161),
    },
  ],
  'calc-areas': [
    {
      id: 'calc-areas-os1',
      difficulty: 1,
      statement: String.raw`חשבו בעזרת המשפט היסודי של החשבון האינטגרלי את האינטגרל המסוים $\int_{-2}^{3}\left(x^2+3x-5\right)dx$.`,
      hints: [
        String.raw`פונקציה קדומה: $F(x)=\frac{x^3}3+\frac{3x^2}2-5x$.`,
        String.raw`$\int_a^bf(x)\,dx=F(b)-F(a)$.`,
      ],
      solutionSteps: [
        String.raw`פונקציה קדומה: $F(x)=\frac{x^3}3+\frac{3x^2}2-5x$.`,
        String.raw`$F(3)=9+\frac{27}2-15=\frac{15}2$ ו-$F(-2)=-\frac83+6+10=\frac{40}3$.`,
        String.raw`$\int_{-2}^3\left(x^2+3x-5\right)dx=\frac{15}2-\frac{40}3=\frac{45-80}{6}=-\frac{35}6$.`,
        String.raw`התוצאה שלילית: זה אינטגרל עם סימן ולא שטח – רוב השטח שבין הגרף לציר בקטע נמצא מתחת לציר $x$.`,
      ],
      finalAnswer: String.raw`$-\frac{35}{6}$`,
      answers: [{ label: String.raw`ערך האינטגרל`, value: -35 / 6 }],
      source: s53(171),
    },
    {
      id: 'calc-areas-os2',
      difficulty: 1,
      statement: String.raw`חשבו את השטח המוגבל בין הגרפים $y=x^2-3$ ו-$y=1$ (ראו שרטוט), באינטגרציה לפי $x$.`,
      figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="70.9,115.3 74.3,115.3 77.7,115.3 81.1,115.3 84.5,115.3 87.9,115.3 91.3,115.3 94.7,115.3 98.1,115.3 101.5,115.3 104.8,115.3 108.2,115.3 111.6,115.3 115.0,115.3 118.4,115.3 121.8,115.3 125.2,115.3 128.6,115.3 132.0,115.3 135.4,115.3 138.8,115.3 142.2,115.3 145.6,115.3 149.0,115.3 152.4,115.3 155.8,115.3 159.2,115.3 162.5,115.3 165.9,115.3 169.3,115.3 172.7,115.3 176.1,115.3 179.5,115.3 182.9,115.3 186.3,115.3 189.7,115.3 193.1,115.3 196.5,115.3 199.9,115.3 203.3,115.3 206.7,115.3 210.1,115.3 213.5,115.3 216.8,115.3 220.2,115.3 223.6,115.3 227.0,115.3 230.4,115.3 233.8,115.3 237.2,115.3 240.6,115.3 240.6,115.3 237.2,122.7 233.8,129.8 230.4,136.6 227.0,143.1 223.6,149.3 220.2,155.2 216.8,160.8 213.5,166.1 210.1,171.1 206.7,175.8 203.3,180.2 199.9,184.3 196.5,188.0 193.1,191.5 189.7,194.7 186.3,197.6 182.9,200.1 179.5,202.4 176.1,204.4 172.7,206.0 169.3,207.4 165.9,208.5 162.5,209.2 159.2,209.7 155.8,209.8 152.4,209.7 149.0,209.2 145.6,208.5 142.2,207.4 138.8,206.0 135.4,204.4 132.0,202.4 128.6,200.1 125.2,197.6 121.8,194.7 118.4,191.5 115.0,188.0 111.6,184.3 108.2,180.2 104.8,175.8 101.5,171.1 98.1,166.1 94.7,160.8 91.3,155.2 87.9,149.3 84.5,143.1 81.1,136.6 77.7,129.8 74.3,122.7 70.9,115.3" fill="currentColor" fill-opacity="0.15" stroke="none" />
  <line x1="20.0" y1="138.9" x2="300.0" y2="138.9" stroke-width="1.5" />
  <polyline points="294.0,134.9 300.0,138.9 294.0,142.9" stroke-width="1.5" />
  <line x1="155.8" y1="224.0" x2="155.8" y2="16.0" stroke-width="1.5" />
  <polyline points="151.8,22.0 155.8,16.0 159.8,22.0" stroke-width="1.5" />
  <polyline points="32.7,11.0 36.2,22.2 39.8,33.1 43.3,43.7 46.8,53.9 50.3,63.8 53.8,73.3 57.3,82.6 60.8,91.5 64.4,100.1 67.9,108.4 71.4,116.4 74.9,124.0 78.4,131.3 81.9,138.3 85.5,144.9 89.0,151.2 92.5,157.2 96.0,162.9 99.5,168.3 103.0,173.3 106.5,178.0 110.1,182.4 113.6,186.5 117.1,190.2 120.6,193.6 124.1,196.7 127.6,199.4 131.2,201.9 134.7,204.0 138.2,205.8 141.7,207.2 145.2,208.4 148.7,209.2 152.2,209.7 155.8,209.8 159.3,209.7 162.8,209.2 166.3,208.4 169.8,207.2 173.3,205.8 176.8,204.0 180.4,201.9 183.9,199.4 187.4,196.7 190.9,193.6 194.4,190.2 197.9,186.5 201.5,182.4 205.0,178.0 208.5,173.3 212.0,168.3 215.5,162.9 219.0,157.2 222.5,151.2 226.1,144.9 229.6,138.3 233.1,131.3 236.6,124.0 240.1,116.4 243.6,108.4 247.2,100.1 250.7,91.5 254.2,82.6 257.7,73.3 261.2,63.8 264.7,53.9 268.2,43.7 271.8,33.1 275.3,22.2 278.8,11.0" />
  <polyline points="28.5,115.3 287.3,115.3" />
  <circle cx="70.9" cy="115.3" r="2.5" fill="currentColor" />
  <circle cx="240.6" cy="115.3" r="2.5" fill="currentColor" />
  <line x1="70.9" y1="135.9" x2="70.9" y2="141.9" stroke-width="1" />
  <line x1="240.6" y1="135.9" x2="240.6" y2="141.9" stroke-width="1" />
  <line x1="152.8" y1="115.3" x2="158.8" y2="115.3" stroke-width="1" />
  <line x1="152.8" y1="209.8" x2="158.8" y2="209.8" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-family="sans-serif">
    <text x="162" y="28" font-size="16">y</text>
    <text x="290" y="157" font-size="16">x</text>
    <text x="63" y="155" font-size="13">-2</text>
    <text x="237" y="155" font-size="13">2</text>
    <text x="141" y="120" font-size="13">1</text>
    <text x="134" y="215" font-size="13">-3</text>
    <text x="166" y="30" font-size="16">y = x² − 3</text>
    <text x="253" y="109" font-size="16">y = 1</text>
  </g>
</svg>`,
      hints: [
        String.raw`נקודות החיתוך: $x^2-3=1$.`,
        String.raw`בין נקודות החיתוך הישר $y=1$ מעל הפרבולה: $S=\int\left(1-(x^2-3)\right)dx$.`,
      ],
      solutionSteps: [
        String.raw`נקודות החיתוך: $x^2-3=1\iff x^2=4\iff x=\pm2$.`,
        String.raw`בקטע $[-2,2]$ הישר מעל הפרבולה (למשל ב-$x=0$: $1>-3$), ולכן $S=\int_{-2}^2\left(1-(x^2-3)\right)dx=\int_{-2}^2\left(4-x^2\right)dx$.`,
        String.raw`$S=\left[4x-\frac{x^3}3\right]_{-2}^2=\left(8-\frac83\right)-\left(-8+\frac83\right)=16-\frac{16}3=\frac{32}3$.`,
      ],
      finalAnswer: String.raw`$S=\frac{32}3\approx10.67$`,
      answers: [{ label: String.raw`השטח`, value: 32 / 3 }],
      source: s61(1),
    },
    {
      id: 'calc-areas-os3',
      difficulty: 2,
      statement: String.raw`חשבו את השטח המוגבל בין הגרפים $y=x^2$ ו-$y=3x+4$ (ראו שרטוט), באינטגרציה לפי $x$.`,
      figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="65.4,198.0 69.2,194.9 73.0,191.8 76.8,188.6 80.5,185.5 84.3,182.4 88.1,179.3 91.9,176.2 95.7,173.0 99.5,169.9 103.2,166.8 107.0,163.7 110.8,160.6 114.6,157.4 118.4,154.3 122.2,151.2 125.9,148.1 129.7,145.0 133.5,141.8 137.3,138.7 141.1,135.6 144.9,132.5 148.6,129.4 152.4,126.2 156.2,123.1 160.0,120.0 163.8,116.9 167.6,113.8 171.4,110.6 175.1,107.5 178.9,104.4 182.7,101.3 186.5,98.2 190.3,95.0 194.1,91.9 197.8,88.8 201.6,85.7 205.4,82.6 209.2,79.4 213.0,76.3 216.8,73.2 220.5,70.1 224.3,67.0 228.1,63.8 231.9,60.7 235.7,57.6 239.5,54.5 243.2,51.4 247.0,48.2 250.8,45.1 254.6,42.0 254.6,42.0 250.8,50.2 247.0,58.2 243.2,66.0 239.5,73.6 235.7,81.0 231.9,88.2 228.1,95.1 224.3,101.9 220.5,108.5 216.8,114.8 213.0,120.9 209.2,126.9 205.4,132.6 201.6,138.1 197.8,143.4 194.1,148.5 190.3,153.4 186.5,158.1 182.7,162.5 178.9,166.8 175.1,170.9 171.4,174.7 167.6,178.3 163.8,181.8 160.0,185.0 156.2,188.0 152.4,190.8 148.6,193.4 144.9,195.8 141.1,198.0 137.3,200.0 133.5,201.7 129.7,203.3 125.9,204.7 122.2,205.8 118.4,206.7 114.6,207.5 110.8,208.0 107.0,208.3 103.2,208.4 99.5,208.3 95.7,208.0 91.9,207.5 88.1,206.7 84.3,205.8 80.5,204.7 76.8,203.3 73.0,201.7 69.2,200.0 65.4,198.0" fill="currentColor" fill-opacity="0.15" stroke="none" />
  <line x1="20.0" y1="208.4" x2="300.0" y2="208.4" stroke-width="1.5" />
  <polyline points="294.0,204.4 300.0,208.4 294.0,212.4" stroke-width="1.5" />
  <line x1="103.2" y1="224.0" x2="103.2" y2="16.0" stroke-width="1.5" />
  <polyline points="99.2,22.0 103.2,16.0 107.2,22.0" stroke-width="1.5" />
  <polyline points="27.6,166.8 30.9,170.4 34.3,173.9 37.7,177.2 41.1,180.3 44.5,183.3 47.8,186.1 51.2,188.7 54.6,191.2 58.0,193.5 61.4,195.7 64.7,197.6 68.1,199.4 71.5,201.1 74.9,202.6 78.2,203.9 81.6,205.0 85.0,206.0 88.4,206.8 91.8,207.4 95.1,207.9 98.5,208.2 101.9,208.4 105.3,208.4 108.6,208.2 112.0,207.8 115.4,207.3 118.8,206.6 122.2,205.8 125.5,204.8 128.9,203.6 132.3,202.3 135.7,200.8 139.1,199.1 142.4,197.2 145.8,195.2 149.2,193.1 152.6,190.7 155.9,188.2 159.3,185.6 162.7,182.7 166.1,179.7 169.5,176.6 172.8,173.2 176.2,169.7 179.6,166.1 183.0,162.2 186.4,158.2 189.7,154.1 193.1,149.7 196.5,145.2 199.9,140.6 203.2,135.8 206.6,130.8 210.0,125.6 213.4,120.3 216.8,114.8 220.1,109.1 223.5,103.3 226.9,97.3 230.3,91.2 233.6,84.9 237.0,78.4 240.4,71.7 243.8,64.9 247.2,57.9 250.5,50.8 253.9,43.5 257.3,36.0 260.7,28.4 264.1,20.6" />
  <polyline points="35.1,223.0 277.3,23.3" />
  <circle cx="65.4" cy="198.0" r="2.5" fill="currentColor" />
  <circle cx="254.6" cy="42.0" r="2.5" fill="currentColor" />
  <line x1="65.4" y1="205.4" x2="65.4" y2="211.4" stroke-width="1" />
  <line x1="254.6" y1="205.4" x2="254.6" y2="211.4" stroke-width="1" />
  <line x1="100.2" y1="42.0" x2="106.2" y2="42.0" stroke-width="1" />
  <line x1="100.2" y1="166.8" x2="106.2" y2="166.8" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-family="sans-serif">
    <text x="109" y="28" font-size="16">y</text>
    <text x="290" y="226" font-size="16">x</text>
    <text x="57" y="224" font-size="13">-1</text>
    <text x="251" y="224" font-size="13">4</text>
    <text x="81" y="47" font-size="13">16</text>
    <text x="88" y="172" font-size="13">4</text>
    <text x="266" y="52" font-size="16">y = x²</text>
    <text x="126" y="37" font-size="16">y = 3x + 4</text>
  </g>
</svg>`,
      hints: [
        String.raw`נקודות החיתוך: $x^2=3x+4$, כלומר $x^2-3x-4=0$.`,
        String.raw`בין נקודות החיתוך הישר מעל הפרבולה.`,
      ],
      solutionSteps: [
        String.raw`$x^2-3x-4=(x-4)(x+1)=0$, ולכן הגרפים נחתכים ב-$x=-1$ וב-$x=4$.`,
        String.raw`ב-$x=0$: $3\cdot0+4=4>0$, ולכן בקטע $[-1,4]$ הישר מעל הפרבולה.`,
        String.raw`$S=\int_{-1}^4\left(3x+4-x^2\right)dx=\left[\frac{3x^2}2+4x-\frac{x^3}3\right]_{-1}^4$.`,
        String.raw`$=\left(24+16-\frac{64}3\right)-\left(\frac32-4+\frac13\right)=\frac{56}3+\frac{13}6=\frac{125}6$.`,
      ],
      finalAnswer: String.raw`$S=\frac{125}6\approx20.83$`,
      answers: [{ label: String.raw`השטח`, value: 125 / 6 }],
      source: s61(2),
    },
    {
      id: 'calc-areas-os4',
      difficulty: 2,
      statement: String.raw`מצאו את שורשי הביטוי שבתוך הערך המוחלט כדי להיפטר מהערך המוחלט, ואז חשבו בעזרת המשפט היסודי: $\int_{-2}^{4}\left|t^2-2t-3\right|dt$. (האינטגרל שווה לשטח המוגבל על ידי הגרף של $y=t^2-2t-3$, ציר $t$ והישרים $t=-2$, $t=4$.)`,
      hints: [
        String.raw`$t^2-2t-3=(t-3)(t+1)$: חיובי מחוץ ל-$[-1,3]$ ושלילי בתוכו.`,
        String.raw`פצלו לשלושה אינטגרלים: $[-2,-1]$, $[-1,3]$, $[3,4]$; באמצעי הפכו סימן. פונקציה קדומה: $G(t)=\frac{t^3}3-t^2-3t$.`,
      ],
      solutionSteps: [
        String.raw`$t^2-2t-3=(t-3)(t+1)$: אפסים $t=-1$ ו-$t=3$; הביטוי שלילי ב-$(-1,3)$ וחיובי מחוץ לקטע.`,
        String.raw`פונקציה קדומה: $G(t)=\frac{t^3}3-t^2-3t$, ו-$G(-2)=-\frac23$, $G(-1)=\frac53$, $G(3)=-9$, $G(4)=-\frac{20}3$.`,
        String.raw`$\int_{-2}^{-1}(t^2-2t-3)\,dt=G(-1)-G(-2)=\frac73$.`,
        String.raw`$\int_{-1}^{3}\left|t^2-2t-3\right|dt=-\left(G(3)-G(-1)\right)=-\left(-9-\frac53\right)=\frac{32}3$.`,
        String.raw`$\int_{3}^{4}(t^2-2t-3)\,dt=G(4)-G(3)=-\frac{20}3+9=\frac73$.`,
        String.raw`סך הכול: $\frac73+\frac{32}3+\frac73=\frac{46}3$.`,
      ],
      finalAnswer: String.raw`$\frac{46}3\approx15.33$`,
      answers: [{ label: String.raw`ערך האינטגרל (השטח)`, value: 46 / 3 }],
      source: s53(195),
    },
    {
      id: 'calc-areas-os5',
      difficulty: 2,
      statement: String.raw`שרטטו את הגרפים של $y=x^3+3x$ ו-$y=4x$, סמנו את השטח המוגבל ביניהם, וחשבו אותו באינטגרציה לפי $x$.`,
      hints: [
        String.raw`נקודות החיתוך: $x^3+3x=4x\iff x^3-x=0$ – שלוש נקודות.`,
        String.raw`הגרפים מתחלפים ב-$x=0$; פצלו את האינטגרל לשניים.`,
      ],
      solutionSteps: [
        String.raw`$x^3+3x=4x\iff x^3-x=x(x-1)(x+1)=0$: נקודות חיתוך ב-$x=-1,\ 0,\ 1$.`,
        String.raw`ההפרש $\left(x^3+3x\right)-4x=x^3-x$ חיובי ב-$(-1,0)$ (למשל $x=-\frac12$: $\frac38$) ושלילי ב-$(0,1)$. כלומר ב-$(-1,0)$ הפולינום מעל הישר, וב-$(0,1)$ הישר מעל.`,
        String.raw`$S_1=\int_{-1}^0\left(x^3-x\right)dx=\left[\frac{x^4}4-\frac{x^2}2\right]_{-1}^0=0-\left(\frac14-\frac12\right)=\frac14$.`,
        String.raw`$S_2=\int_0^1\left(x-x^3\right)dx=\frac12-\frac14=\frac14$ (שווה ל-$S_1$, כי שתי הפונקציות אי-זוגיות).`,
        String.raw`$S=S_1+S_2=\frac12$.`,
      ],
      finalAnswer: String.raw`$S=\frac12$`,
      answers: [{ label: String.raw`השטח`, value: 0.5 }],
      source: s61(19),
    },
    {
      id: 'calc-areas-os6',
      difficulty: 3,
      statement: String.raw`האזור שבין הגרפים של $y=x^3$ ו-$y=x^2+x$ (ראו שרטוט) מורכב משני חלקים. פצלו אותו לשני האזורים הקטנים, וחשבו את השטח הכולל באינטגרציה לפי $x$ (שני אינטגרלים).`,
      figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="63.5,206.5 64.6,205.9 65.8,205.4 66.9,204.9 68.0,204.5 69.1,204.0 70.2,203.6 71.3,203.2 72.5,202.8 73.6,202.4 74.7,202.1 75.8,201.8 76.9,201.4 78.0,201.1 79.2,200.9 80.3,200.6 81.4,200.3 82.5,200.1 83.6,199.9 84.7,199.7 85.9,199.5 87.0,199.3 88.1,199.1 89.2,198.9 90.3,198.8 91.4,198.6 92.6,198.5 93.7,198.4 94.8,198.3 95.9,198.2 97.0,198.1 98.1,198.0 99.3,197.9 100.4,197.9 101.5,197.8 102.6,197.8 103.7,197.7 104.8,197.7 106.0,197.7 107.1,197.6 108.2,197.6 109.3,197.6 110.4,197.6 111.5,197.6 112.7,197.5 113.8,197.5 114.9,197.5 116.0,197.5 117.1,197.5 118.2,197.5 119.4,197.5 119.4,197.5 118.2,198.0 117.1,198.4 116.0,198.9 114.9,199.3 113.8,199.7 112.7,200.1 111.5,200.5 110.4,200.9 109.3,201.3 108.2,201.6 107.1,202.0 106.0,202.3 104.8,202.6 103.7,202.9 102.6,203.2 101.5,203.5 100.4,203.8 99.3,204.1 98.1,204.3 97.0,204.6 95.9,204.8 94.8,205.0 93.7,205.2 92.6,205.4 91.4,205.6 90.3,205.8 89.2,205.9 88.1,206.1 87.0,206.2 85.9,206.4 84.7,206.5 83.6,206.6 82.5,206.7 81.4,206.7 80.3,206.8 79.2,206.9 78.0,206.9 76.9,206.9 75.8,207.0 74.7,207.0 73.6,207.0 72.5,207.0 71.3,206.9 70.2,206.9 69.1,206.9 68.0,206.8 66.9,206.7 65.8,206.7 64.6,206.6 63.5,206.5" fill="currentColor" fill-opacity="0.15" stroke="none" />
  <polygon points="119.4,197.5 122.3,196.3 125.2,194.9 128.1,193.5 131.0,192.0 134.0,190.4 136.9,188.8 139.8,187.0 142.7,185.2 145.7,183.3 148.6,181.3 151.5,179.3 154.4,177.1 157.4,174.9 160.3,172.6 163.2,170.3 166.1,167.8 169.0,165.3 172.0,162.7 174.9,160.0 177.8,157.2 180.7,154.4 183.7,151.4 186.6,148.4 189.5,145.3 192.4,142.2 195.4,138.9 198.3,135.6 201.2,132.2 204.1,128.7 207.0,125.2 210.0,121.5 212.9,117.8 215.8,114.0 218.7,110.1 221.7,106.2 224.6,102.1 227.5,98.0 230.4,93.8 233.3,89.6 236.3,85.2 239.2,80.8 242.1,76.3 245.0,71.7 248.0,67.0 250.9,62.3 253.8,57.4 256.7,52.5 259.7,47.5 262.6,42.5 265.5,37.3 265.5,37.3 262.6,46.7 259.7,55.8 256.7,64.5 253.8,72.8 250.9,80.7 248.0,88.4 245.0,95.6 242.1,102.6 239.2,109.2 236.3,115.5 233.3,121.5 230.4,127.2 227.5,132.6 224.6,137.7 221.7,142.6 218.7,147.2 215.8,151.5 212.9,155.5 210.0,159.3 207.0,162.9 204.1,166.3 201.2,169.4 198.3,172.3 195.4,175.0 192.4,177.5 189.5,179.8 186.6,181.9 183.7,183.9 180.7,185.7 177.8,187.3 174.9,188.7 172.0,190.1 169.0,191.2 166.1,192.3 163.2,193.2 160.3,194.0 157.4,194.7 154.4,195.3 151.5,195.8 148.6,196.2 145.7,196.6 142.7,196.9 139.8,197.1 136.9,197.3 134.0,197.4 131.0,197.4 128.1,197.5 125.2,197.5 122.3,197.5 119.4,197.5" fill="currentColor" fill-opacity="0.15" stroke="none" />
  <line x1="20.0" y1="197.5" x2="300.0" y2="197.5" stroke-width="1.5" />
  <polyline points="294.0,193.5 300.0,197.5 294.0,201.5" stroke-width="1.5" />
  <line x1="119.4" y1="224.0" x2="119.4" y2="16.0" stroke-width="1.5" />
  <polyline points="115.4,22.0 119.4,16.0 123.4,22.0" stroke-width="1.5" />
  <polyline points="39.9,223.3 43.2,220.2 46.5,217.4 49.8,214.8 53.1,212.5 56.4,210.3 59.7,208.4 63.0,206.7 66.3,205.2 69.6,203.8 72.9,202.7 76.2,201.7 79.5,200.8 82.8,200.0 86.1,199.4 89.4,198.9 92.7,198.5 96.0,198.2 99.3,197.9 102.6,197.8 105.9,197.7 109.2,197.6 112.5,197.5 115.8,197.5 119.1,197.5 122.5,197.5 125.8,197.5 129.1,197.5 132.4,197.4 135.7,197.3 139.0,197.1 142.3,196.9 145.6,196.6 148.9,196.2 152.2,195.7 155.5,195.1 158.8,194.4 162.1,193.5 165.4,192.5 168.7,191.4 172.0,190.0 175.3,188.5 178.6,186.9 181.9,185.0 185.2,182.9 188.5,180.5 191.8,178.0 195.1,175.2 198.4,172.2 201.7,168.8 205.0,165.2 208.3,161.4 211.6,157.2 214.9,152.7 218.2,147.9 221.5,142.8 224.9,137.3 228.2,131.4 231.5,125.2 234.8,118.6 238.1,111.7 241.4,104.3 244.7,96.5 248.0,88.3 251.3,79.7 254.6,70.6 257.9,61.1 261.2,51.1 264.5,40.6 267.8,29.7 271.1,18.2" />
  <polyline points="24.5,195.5 28.1,197.1 31.7,198.6 35.2,199.9 38.8,201.2 42.4,202.3 46.0,203.3 49.5,204.2 53.1,204.9 56.7,205.6 60.3,206.1 63.8,206.5 67.4,206.8 71.0,206.9 74.6,207.0 78.1,206.9 81.7,206.7 85.3,206.4 88.9,206.0 92.4,205.4 96.0,204.8 99.6,204.0 103.1,203.1 106.7,202.1 110.3,200.9 113.9,199.7 117.4,198.3 121.0,196.8 124.6,195.2 128.2,193.5 131.7,191.6 135.3,189.7 138.9,187.6 142.5,185.4 146.0,183.1 149.6,180.6 153.2,178.1 156.8,175.4 160.3,172.6 163.9,169.7 167.5,166.6 171.1,163.5 174.6,160.2 178.2,156.8 181.8,153.3 185.4,149.7 188.9,146.0 192.5,142.1 196.1,138.1 199.7,134.0 203.2,129.8 206.8,125.5 210.4,121.0 213.9,116.4 217.5,111.8 221.1,106.9 224.7,102.0 228.2,97.0 231.8,91.8 235.4,86.5 239.0,81.1 242.5,75.6 246.1,70.0 249.7,64.2 253.3,58.3 256.8,52.3 260.4,46.2 264.0,40.0 267.6,33.7 271.1,27.2 274.7,20.6" />
  <circle cx="63.5" cy="206.5" r="2.5" fill="currentColor" />
  <circle cx="119.4" cy="197.5" r="2.5" fill="currentColor" />
  <circle cx="265.5" cy="37.3" r="2.5" fill="currentColor" />
  <line x1="209.7" y1="194.5" x2="209.7" y2="200.5" stroke-width="1" />
  <line x1="116.4" y1="159.7" x2="122.4" y2="159.7" stroke-width="1" />
  <line x1="116.4" y1="46.3" x2="122.4" y2="46.3" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-family="sans-serif">
    <text x="125" y="28" font-size="16">y</text>
    <text x="290" y="216" font-size="16">x</text>
    <text x="255" y="88" font-size="16">y = x³</text>
    <text x="165" y="50" font-size="16">y = x² + x</text>
    <text x="206" y="214" font-size="13">1</text>
    <text x="104" y="165" font-size="13">1</text>
    <text x="104" y="51" font-size="13">4</text>
  </g>
</svg>`,
      hints: [
        String.raw`$x^3=x^2+x\iff x\left(x^2-x-1\right)=0$: $x=0$ ו-$x=\frac{1\pm\sqrt5}2$.`,
        String.raw`נסמן $h(x)=x^3-x^2-x$ ו-$H(x)=\frac{x^4}4-\frac{x^3}3-\frac{x^2}2$. בשורשים $a,b$ של $x^2=x+1$ אפשר להקטין חזקות: $x^3=2x+1$, $x^4=3x+2$.`,
      ],
      solutionSteps: [
        String.raw`נקודות החיתוך: $x=0$, $a=\frac{1-\sqrt5}2\approx-0.618$, $b=\frac{1+\sqrt5}2\approx1.618$.`,
        String.raw`ב-$(a,0)$ הגרף של $x^3$ עליון (למשל $x=-\frac12$: $-\frac18>-\frac14$), וב-$(0,b)$ הגרף של $x^2+x$ עליון (למשל $x=1$: $2>1$).`,
        String.raw`עם $H(x)=\frac{x^4}4-\frac{x^3}3-\frac{x^2}2$ (קדומה של $h=x^3-x^2-x$): $S_1=\int_a^0h\,dx=-H(a)$ ו-$S_2=\int_0^b(-h)\,dx=-H(b)$.`,
        String.raw`עבור שורש $r$ של $r^2=r+1$: $r^3=2r+1$ ו-$r^4=3r+2$, ולכן $H(r)=\frac{3r+2}4-\frac{2r+1}3-\frac{r+1}2=\frac{-5r-4}{12}$.`,
        String.raw`$S_1=\frac{5a+4}{12}=\frac{13-5\sqrt5}{24}\approx0.076$ ו-$S_2=\frac{5b+4}{12}=\frac{13+5\sqrt5}{24}\approx1.007$.`,
        String.raw`$S=S_1+S_2=\frac{5(a+b)+8}{12}=\frac{5+8}{12}=\frac{13}{12}$ (כי $a+b=1$).`,
      ],
      finalAnswer: String.raw`$S=\frac{13}{12}\approx1.083$`,
      answers: [{ label: String.raw`השטח הכולל`, value: 13 / 12 }],
      source: s61(3),
    },
  ],
};
