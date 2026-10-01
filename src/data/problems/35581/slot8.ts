import type { Problem } from '../types';

/**
 * שאלון 35581 – שאלה 8 (בעיות קיצון).
 * לפי מיקוד 2026 נשארו בעיקר בעיות קיצון גרפיות: כל השאלות כאן בנויות על גרף של פונקציה נתונה.
 */
export const slot8Problems: Problem[] = [
  {
    id: '35581-8-1',
    questionnaire: '35581',
    slot: 8,
    title: 'הנקודה הקרובה ביותר על גרף שורש',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-graphical-extrema', 'diff-rules', 'diff-tangent-on-graph', 'ag-segments'],
    difficulty: 2,
    estimatedMinutes: 20,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-8-1-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\sqrt{x}$ והנקודה $A(4.5,0)$. הנקודה $P$ נמצאת על גרף הפונקציה, ושיעור ה-x שלה הוא $x$ ($x\ge 0$).

הביעו באמצעות $x$ את המרחק $d$ בין הנקודות $P$ ו-$A$.`,
        hints: [
          String.raw`שיעורי הנקודה P הם $\left(x,\sqrt{x}\right)$.`,
          String.raw`נוסחת המרחק: $d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.`,
        ],
        solutionSteps: [
          String.raw`הנקודה P על הגרף, ולכן $P\left(x,\sqrt{x}\right)$.`,
          String.raw`לפי נוסחת המרחק: $d=\sqrt{(x-4.5)^2+\left(\sqrt{x}-0\right)^2}=\sqrt{(x-4.5)^2+x}$.`,
          String.raw`פתיחת סוגריים: $d(x)=\sqrt{x^2-8x+20.25}$, עבור $x\ge 0$.`,
        ],
        finalAnswer: String.raw`$d(x)=\sqrt{x^2-8x+20.25}$`,
      },
      {
        id: '35581-8-1-b',
        label: 'ב',
        statement: String.raw`מצאו את שיעורי הנקודה $P$ על הגרף הקרובה ביותר לנקודה $A$, וחשבו את המרחק המינימלי.`,
        hints: [
          String.raw`גזרו את $d(x)$ לפי כלל השרשרת: $\left(\sqrt{g}\right)'=\frac{g'}{2\sqrt{g}}$.`,
          String.raw`הנגזרת מתאפסת כאשר $2x-8=0$. ודאו שזו נקודת מינימום בעזרת טבלת סימנים.`,
        ],
        solutionSteps: [
          String.raw`$d'(x)=\frac{2x-8}{2\sqrt{x^2-8x+20.25}}$. המכנה חיובי (הביטוי שבשורש הוא $(x-4)^2+4.25>0$).`,
          String.raw`$d'(x)=0\iff x=4$. עבור $0\le x<4$: $d'<0$ (יורדת); עבור $x>4$: $d'>0$ (עולה). לכן ב-$x=4$ מינימום מוחלט.`,
          String.raw`$f(4)=\sqrt{4}=2$, ולכן $P(4,2)$.`,
          String.raw`$d(4)=\sqrt{16-32+20.25}=\sqrt{4.25}=\frac{\sqrt{17}}{2}\approx 2.062$.`,
        ],
        finalAnswer: String.raw`$P(4,2)$; המרחק המינימלי $\frac{\sqrt{17}}{2}\approx 2.062$.`,
        numericAnswer: 2.0615528128088,
      },
      {
        id: '35581-8-1-c',
        label: 'ג',
        statement: String.raw`הראו שהקטע $AP$ (עבור הנקודה $P$ שמצאתם בסעיף ב) מאונך למשיק לגרף הפונקציה בנקודה $P$.`,
        hints: [
          String.raw`שיפוע המשיק בנקודה P הוא $f'(4)$, כאשר $f'(x)=\frac{1}{2\sqrt{x}}$.`,
          String.raw`שני ישרים (שאינם מקבילים לצירים) מאונכים אם ורק אם מכפלת שיפועיהם היא $-1$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\frac{1}{2\sqrt{x}}$, ולכן שיפוע המשיק ב-P הוא $f'(4)=\frac{1}{4}$.`,
          String.raw`שיפוע הקטע AP: $m_{AP}=\frac{2-0}{4-4.5}=-4$.`,
          String.raw`מכפלת השיפועים: $\frac{1}{4}\cdot(-4)=-1$, ולכן AP מאונך למשיק.`,
          String.raw`זו תכונה כללית: הקטע מנקודה חיצונית לנקודה הקרובה ביותר על גרף גזיר מאונך למשיק בנקודה זו.`,
        ],
        finalAnswer: String.raw`$m_{AP}\cdot f'(4)=(-4)\cdot\frac{1}{4}=-1$, ולכן $AP$ מאונך למשיק.`,
      },
    ],
  },
  {
    id: '35581-8-2',
    questionnaire: '35581',
    slot: 8,
    title: 'מלבן מקסימלי מתחת לגרף רציונלי',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-graphical-extrema', 'diff-rules', 'diff-investigation'],
    difficulty: 2,
    estimatedMinutes: 20,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-8-2-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{8}{x^2+4}$. בין גרף הפונקציה לבין ציר ה-x חוסמים מלבנים כך: שני קדקודים של המלבן נמצאים על ציר ה-x בנקודות $(-t,0)$ ו-$(t,0)$, ושני הקדקודים האחרים נמצאים על גרף הפונקציה ($t>0$).

הביעו באמצעות $t$ את שטח המלבן $S(t)$.`,
        hints: [
          String.raw`הפונקציה זוגית, ולכן הקדקודים העליונים הם $(-t,f(t))$ ו-$(t,f(t))$.`,
          String.raw`רוחב המלבן $2t$ וגובהו $f(t)$.`,
        ],
        solutionSteps: [
          String.raw`$f(-t)=f(t)$, ולכן שני הקדקודים העליונים הם $\left(\pm t,\frac{8}{t^2+4}\right)$ והצלע העליונה מקבילה לציר x.`,
          String.raw`רוחב המלבן: $2t$. גובה המלבן: $f(t)=\frac{8}{t^2+4}$.`,
          String.raw`$S(t)=2t\cdot\frac{8}{t^2+4}=\frac{16t}{t^2+4}$, עבור $t>0$.`,
        ],
        finalAnswer: String.raw`$S(t)=\frac{16t}{t^2+4}$`,
      },
      {
        id: '35581-8-2-b',
        label: 'ב',
        statement: String.raw`מצאו את הערך של $t$ שעבורו שטח המלבן מקסימלי, וחשבו את השטח המקסימלי.`,
        hints: [
          String.raw`גזרו לפי כלל המנה: $S'(t)=\frac{16(t^2+4)-16t\cdot 2t}{(t^2+4)^2}$.`,
          String.raw`המכנה חיובי; פתרו $4-t^2=0$ עם $t>0$ ובדקו את סימן הנגזרת.`,
        ],
        solutionSteps: [
          String.raw`$S'(t)=\frac{16(t^2+4)-32t^2}{(t^2+4)^2}=\frac{16(4-t^2)}{(t^2+4)^2}$.`,
          String.raw`עבור $t>0$: $S'(t)=0\iff t=2$.`,
          String.raw`עבור $0<t<2$: $S'>0$ (השטח גדל); עבור $t>2$: $S'<0$ (השטח קטן). לכן ב-$t=2$ מקסימום מוחלט.`,
          String.raw`$S(2)=\frac{32}{8}=4$ (רוחב 4 וגובה $f(2)=1$).`,
        ],
        finalAnswer: String.raw`$t=2$; השטח המקסימלי הוא 4.`,
        numericAnswer: 4,
      },
      {
        id: '35581-8-2-c',
        label: 'ג',
        statement: String.raw`מצאו את ערכי $t$ שעבורם שטח המלבן הוא $3.2$. הסבירו מדוע יש בדיוק שני ערכים כאלה בעזרת סעיף ב.`,
        hints: [
          String.raw`פתרו את המשוואה $\frac{16t}{t^2+4}=3.2$ – כפלו במכנה וחלקו ב-3.2.`,
          String.raw`$3.2$ קטן מהשטח המקסימלי 4, ו-$S(t)$ עולה ב-$0<t<2$ ויורדת ב-$t>2$.`,
        ],
        solutionSteps: [
          String.raw`$\frac{16t}{t^2+4}=3.2\iff 16t=3.2t^2+12.8\iff t^2-5t+4=0$.`,
          String.raw`$(t-1)(t-4)=0$, ולכן $t=1$ או $t=4$ (שניהם חיוביים).`,
          String.raw`בדיקה: $S(1)=\frac{16}{5}=3.2$, $S(4)=\frac{64}{20}=3.2$.`,
          String.raw`לפי סעיף ב, $S$ עולה מ-0 עד 4 בתחום $0<t<2$ ויורדת מ-4 לכיוון 0 בתחום $t>2$; לכן כל ערך בין 0 ל-4 מתקבל פעם אחת בכל תחום – בדיוק שני ערכי $t$.`,
        ],
        finalAnswer: String.raw`$t=1$ או $t=4$.`,
      },
    ],
  },
  {
    id: '35581-8-3',
    questionnaire: '35581',
    slot: 8,
    title: 'משולש מינימלי בין משיק לפרבולה לבין הצירים',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-graphical-extrema', 'diff-tangent-on-graph', 'diff-rules'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-8-3-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=4-x^2$. דרך הנקודה $P\left(t,4-t^2\right)$ שעל גרף הפונקציה, כאשר $0<t<2$, מעבירים משיק לגרף.

הראו שמשוואת המשיק היא $y=-2tx+t^2+4$.`,
        hints: [
          String.raw`$f'(x)=-2x$, ולכן שיפוע המשיק ב-P הוא $-2t$.`,
          String.raw`$y-(4-t^2)=-2t(x-t)$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=-2x$, ושיפוע המשיק בנקודה P הוא $f'(t)=-2t$.`,
          String.raw`משוואת המשיק: $y-(4-t^2)=-2t(x-t)$.`,
          String.raw`$y=-2tx+2t^2+4-t^2=-2tx+t^2+4$, כנדרש.`,
        ],
        finalAnswer: String.raw`$y=-2tx+t^2+4$`,
      },
      {
        id: '35581-8-3-b',
        label: 'ב',
        statement: String.raw`המשיק יוצר עם הצירים משולש ברביע הראשון. הראו ששטח המשולש הוא $S(t)=\frac{(t^2+4)^2}{4t}$.`,
        hints: [
          String.raw`חיתוך עם ציר y: הציבו $x=0$. חיתוך עם ציר x: הציבו $y=0$.`,
          String.raw`המשולש ישר-זווית, ושטחו חצי מכפלת הקטעים שהמשיק חותך על הצירים.`,
        ],
        solutionSteps: [
          String.raw`חיתוך עם ציר y ($x=0$): $y=t^2+4>0$.`,
          String.raw`חיתוך עם ציר x ($y=0$): $2tx=t^2+4$, ולכן $x=\frac{t^2+4}{2t}>0$ (כי $t>0$).`,
          String.raw`המשולש ישר-זווית בראשית, ולכן $S(t)=\frac{1}{2}\cdot\frac{t^2+4}{2t}\cdot(t^2+4)=\frac{(t^2+4)^2}{4t}$.`,
        ],
        finalAnswer: String.raw`$S(t)=\frac{(t^2+4)^2}{4t}$`,
      },
      {
        id: '35581-8-3-c',
        label: 'ג',
        statement: String.raw`מצאו את הערך של $t$ שעבורו שטח המשולש מינימלי.`,
        hints: [
          String.raw`גזרו לפי כלל המנה; בנגזרת של המונה השתמשו בכלל השרשרת: $\left((t^2+4)^2\right)'=2(t^2+4)\cdot 2t$.`,
          String.raw`הוציאו את $(t^2+4)$ כגורם משותף במונה הנגזרת.`,
          String.raw`תתקבל המשוואה $3t^2-4=0$.`,
        ],
        solutionSteps: [
          String.raw`$S'(t)=\frac{2(t^2+4)\cdot 2t\cdot 4t-(t^2+4)^2\cdot 4}{16t^2}=\frac{4(t^2+4)\left(4t^2-(t^2+4)\right)}{16t^2}=\frac{(t^2+4)(3t^2-4)}{4t^2}$.`,
          String.raw`$(t^2+4)>0$ ו-$4t^2>0$, ולכן $S'(t)=0\iff 3t^2=4\iff t=\frac{2}{\sqrt{3}}$ (בתחום $0<t<2$).`,
          String.raw`עבור $0<t<\frac{2}{\sqrt{3}}$: $S'<0$; עבור $\frac{2}{\sqrt{3}}<t<2$: $S'>0$. לכן זו נקודת מינימום מוחלט בתחום.`,
          String.raw`$t=\frac{2}{\sqrt{3}}=\frac{2\sqrt{3}}{3}\approx 1.155$.`,
        ],
        finalAnswer: String.raw`$t=\frac{2\sqrt{3}}{3}\approx 1.155$`,
        numericAnswer: 1.1547005383793,
      },
      {
        id: '35581-8-3-d',
        label: 'ד',
        statement: String.raw`חשבו את השטח המינימלי של המשולש.`,
        hints: [
          String.raw`הציבו $t^2=\frac{4}{3}$ בביטוי של $S(t)$.`,
          String.raw`$t^2+4=\frac{16}{3}$.`,
        ],
        solutionSteps: [
          String.raw`עבור $t=\frac{2}{\sqrt{3}}$: $t^2+4=\frac{4}{3}+4=\frac{16}{3}$.`,
          String.raw`$S=\frac{\left(\frac{16}{3}\right)^2}{4\cdot\frac{2}{\sqrt{3}}}=\frac{256}{9}\cdot\frac{\sqrt{3}}{8}=\frac{32\sqrt{3}}{9}$.`,
          String.raw`$S_{\min}=\frac{32\sqrt{3}}{9}\approx 6.158$.`,
        ],
        finalAnswer: String.raw`$S_{\min}=\frac{32\sqrt{3}}{9}\approx 6.158$`,
        numericAnswer: 6.158402871356,
      },
    ],
  },
];
