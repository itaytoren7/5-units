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
  {
    id: '35581-8-4',
    questionnaire: '35581',
    slot: 8,
    title: 'מלבן חסום מתחת לפרבולה – שטח והיקף',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-graphical-extrema', 'diff-rules', 'diff-second-derivative'],
    difficulty: 2,
    estimatedMinutes: 20,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-8-4-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=9-x^2$. חוסמים מלבן בין גרף הפונקציה לבין ציר ה-x כך ששני קדקודיו נמצאים על ציר ה-x בנקודות $(-t,0)$ ו-$(t,0)$, ושני הקדקודים האחרים נמצאים על גרף הפונקציה ($t>0$).

הביעו באמצעות $t$ את שטח המלבן $S(t)$, ורשמו את תחום ההגדרה של $t$.`,
        hints: [
          String.raw`הפונקציה זוגית, ולכן הקדקודים העליונים הם $(-t,f(t))$ ו-$(t,f(t))$.`,
          String.raw`רוחב המלבן $2t$ וגובהו $9-t^2$; הגובה חייב להיות חיובי.`,
        ],
        solutionSteps: [
          String.raw`$f(-t)=f(t)=9-t^2$, ולכן הקדקודים העליונים הם $\left(-t,9-t^2\right)$ ו-$\left(t,9-t^2\right)$, והצלע העליונה מקבילה לציר ה-x.`,
          String.raw`רוחב המלבן הוא $2t$ וגובהו $9-t^2$.`,
          String.raw`$S(t)=2t\left(9-t^2\right)=18t-2t^3$.`,
          String.raw`כדי שהמלבן יהיה מעל ציר ה-x נדרש $9-t^2>0$, ולכן תחום ההגדרה הוא $0<t<3$.`,
        ],
        finalAnswer: String.raw`$S(t)=18t-2t^3$, $0<t<3$`,
      },
      {
        id: '35581-8-4-b',
        label: 'ב',
        statement: String.raw`מצאו את הערך של $t$ שעבורו שטח המלבן מקסימלי, הוכיחו שזהו אכן מקסימום, וחשבו את השטח המקסימלי.`,
        hints: [
          String.raw`$S'(t)=18-6t^2$.`,
          String.raw`השתמשו בנגזרת השנייה $S''(t)=-12t$ כדי לקבוע את סוג הקיצון.`,
        ],
        solutionSteps: [
          String.raw`$S'(t)=18-6t^2$.`,
          String.raw`$S'(t)=0\iff t^2=3\iff t=\sqrt{3}$ (הפתרון השלילי אינו בתחום).`,
          String.raw`$S''(t)=-12t$, ו-$S''\left(\sqrt{3}\right)=-12\sqrt{3}<0$, ולכן ב-$t=\sqrt{3}$ מקסימום. זהו הקיצון היחיד בתחום $0<t<3$, ובקצוות התחום השטח שואף ל-0, ולכן זהו מקסימום מוחלט.`,
          String.raw`$S\left(\sqrt{3}\right)=18\sqrt{3}-2\cdot3\sqrt{3}=12\sqrt{3}\approx20.78$.`,
        ],
        finalAnswer: String.raw`$t=\sqrt{3}$; $S_{\max}=12\sqrt{3}\approx 20.78$`,
        numericAnswer: 20.784609690826528,
      },
      {
        id: '35581-8-4-c',
        label: 'ג',
        statement: String.raw`חשבו את אורך האלכסון של המלבן בעל השטח המקסימלי.`,
        hints: [
          String.raw`צלעות המלבן הן $2t$ ו-$9-t^2$ עבור $t=\sqrt{3}$.`,
          String.raw`האלכסון הוא היתר במשולש ישר-זווית שניצביו הם צלעות המלבן – משפט פיתגורס.`,
        ],
        solutionSteps: [
          String.raw`עבור $t=\sqrt{3}$: רוחב המלבן $2\sqrt{3}$ וגובהו $9-3=6$.`,
          String.raw`לפי משפט פיתגורס: $d^2=\left(2\sqrt{3}\right)^2+6^2=12+36=48$.`,
          String.raw`$d=\sqrt{48}=4\sqrt{3}\approx6.93$.`,
        ],
        finalAnswer: String.raw`$d=4\sqrt{3}\approx 6.93$`,
        numericAnswer: 6.928203230275509,
      },
      {
        id: '35581-8-4-d',
        label: 'ד',
        statement: String.raw`הביעו באמצעות $t$ את היקף המלבן $P(t)$, ומצאו את הערך של $t$ שעבורו ההיקף מקסימלי. חשבו את ההיקף המקסימלי. האם המלבן בעל ההיקף המקסימלי הוא המלבן בעל השטח המקסימלי? נמקו.`,
        hints: [
          String.raw`$P(t)=2\cdot2t+2\left(9-t^2\right)$.`,
          String.raw`$P'(t)=4-4t$; קבעו את סוג הקיצון בעזרת $P''(t)$.`,
        ],
        solutionSteps: [
          String.raw`$P(t)=4t+2\left(9-t^2\right)=18+4t-2t^2$, עבור $0<t<3$.`,
          String.raw`$P'(t)=4-4t=0\iff t=1$.`,
          String.raw`$P''(t)=-4<0$, ולכן ב-$t=1$ מקסימום; זהו מקסימום מוחלט כי $P$ היא פרבולה עם מקדם מוביל שלילי וקודקודה בתחום.`,
          String.raw`$P(1)=18+4-2=20$.`,
          String.raw`לא: השטח מקסימלי עבור $t=\sqrt{3}\approx1.73$ ואילו ההיקף מקסימלי עבור $t=1$ – אלה שני מלבנים שונים.`,
        ],
        finalAnswer: String.raw`$P(t)=18+4t-2t^2$; ההיקף מקסימלי עבור $t=1$ והוא $20$; זה אינו המלבן בעל השטח המקסימלי.`,
        numericAnswer: 20,
      },
    ],
  },
  {
    id: '35581-8-5',
    questionnaire: '35581',
    slot: 8,
    title: 'משיק להיפרבולה – שטח קבוע וקטע מינימלי',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-graphical-extrema', 'diff-tangent-on-graph', 'diff-rules', 'ag-segments'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-8-5-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{1}{x}$ בתחום $x>0$. הנקודה $P\left(t,\frac{1}{t}\right)$ נמצאת על גרף הפונקציה ($t>0$), ודרכה מעבירים משיק לגרף. המשיק חותך את ציר ה-x בנקודה $A$ ואת ציר ה-y בנקודה $B$.

הראו שמשוואת המשיק היא $y=-\frac{1}{t^2}x+\frac{2}{t}$, ומצאו את שיעורי הנקודות $A$ ו-$B$ באמצעות $t$.`,
        hints: [
          String.raw`$f'(x)=-\frac{1}{x^2}$, ולכן שיפוע המשיק ב-$P$ הוא $-\frac{1}{t^2}$.`,
          String.raw`משוואת משיק: $y-f(t)=f'(t)(x-t)$; לחיתוך עם הצירים הציבו $y=0$ ואחר כך $x=0$.`,
        ],
        solutionSteps: [
          String.raw`$f(x)=x^{-1}$, ולכן $f'(x)=-x^{-2}=-\frac{1}{x^2}$, ושיפוע המשיק בנקודה $P$ הוא $f'(t)=-\frac{1}{t^2}$.`,
          String.raw`משוואת המשיק: $y-\frac{1}{t}=-\frac{1}{t^2}(x-t)$, כלומר $y=-\frac{1}{t^2}x+\frac{1}{t}+\frac{1}{t}=-\frac{1}{t^2}x+\frac{2}{t}$.`,
          String.raw`חיתוך עם ציר ה-x ($y=0$): $\frac{1}{t^2}x=\frac{2}{t}$, ולכן $x=2t$, כלומר $A(2t,0)$.`,
          String.raw`חיתוך עם ציר ה-y ($x=0$): $y=\frac{2}{t}$, כלומר $B\left(0,\frac{2}{t}\right)$.`,
        ],
        finalAnswer: String.raw`$y=-\frac{1}{t^2}x+\frac{2}{t}$; $A(2t,0)$, $B\left(0,\frac{2}{t}\right)$`,
      },
      {
        id: '35581-8-5-b',
        label: 'ב',
        statement: String.raw`הוכיחו ששטח המשולש $OAB$ ($O$ ראשית הצירים) אינו תלוי ב-$t$, ומצאו את השטח.`,
        hints: [
          String.raw`המשולש ישר-זווית בראשית הצירים; ניצביו הם $OA$ ו-$OB$.`,
          String.raw`$S=\frac{1}{2}\cdot OA\cdot OB$ – הציבו את אורכי הקטעים מסעיף א.`,
        ],
        solutionSteps: [
          String.raw`המשולש $OAB$ ישר-זווית ב-$O$ (הניצבים מונחים על הצירים), ו-$OA=2t$, $OB=\frac{2}{t}$ (שניהם חיוביים כי $t>0$).`,
          String.raw`$S=\frac{1}{2}\cdot2t\cdot\frac{2}{t}=2$.`,
          String.raw`הביטוי שהתקבל אינו תלוי ב-$t$, ולכן לכל נקודה $P$ על הגרף המשיק יוצר עם הצירים משולש ששטחו $2$.`,
        ],
        finalAnswer: String.raw`$S_{OAB}=2$ לכל $t>0$`,
        numericAnswer: 2,
      },
      {
        id: '35581-8-5-c',
        label: 'ג',
        statement: String.raw`הביעו באמצעות $t$ את אורך הקטע $AB$, ומצאו את הערך של $t$ שעבורו אורך הקטע מינימלי. חשבו את האורך המינימלי.`,
        hints: [
          String.raw`לפי פיתגורס $AB^2=OA^2+OB^2=4t^2+\frac{4}{t^2}$.`,
          String.raw`מספיק למצוא מינימום של $g(t)=t^2+\frac{1}{t^2}$, כי $AB=2\sqrt{g(t)}$ ופונקציית השורש עולה.`,
          String.raw`$g'(t)=2t-\frac{2}{t^3}$; השוו לאפס וקבלו $t^4=1$.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט פיתגורס: $AB=\sqrt{(2t)^2+\left(\frac{2}{t}\right)^2}=\sqrt{4t^2+\frac{4}{t^2}}=2\sqrt{t^2+\frac{1}{t^2}}$.`,
          String.raw`נסמן $g(t)=t^2+t^{-2}$ ($t>0$). פונקציית השורש עולה, ולכן $AB$ מינימלי בדיוק כאשר $g$ מינימלית.`,
          String.raw`$g'(t)=2t-2t^{-3}=\frac{2t^4-2}{t^3}=\frac{2\left(t^2-1\right)\left(t^2+1\right)}{t^3}$.`,
          String.raw`עבור $t>0$: $g'(t)=0\iff t=1$. עבור $0<t<1$: $g'<0$ (יורדת); עבור $t>1$: $g'>0$ (עולה). לכן ב-$t=1$ מינימום מוחלט.`,
          String.raw`$g(1)=2$, ולכן $AB_{\min}=2\sqrt{2}\approx2.83$.`,
        ],
        finalAnswer: String.raw`$AB=2\sqrt{t^2+\frac{1}{t^2}}$; מינימום עבור $t=1$; $AB_{\min}=2\sqrt{2}\approx 2.83$`,
        numericAnswer: 2.8284271247461903,
      },
      {
        id: '35581-8-5-d',
        label: 'ד',
        statement: String.raw`הוכיחו שלכל $t>0$ הנקודה $P$ היא אמצע הקטע $AB$. בעזרת תוצאה זו חשבו את המרחק $OP$ עבור הערך של $t$ שמצאתם בסעיף ג.`,
        hints: [
          String.raw`נוסחת אמצע קטע: $\left(\frac{x_A+x_B}{2},\frac{y_A+y_B}{2}\right)$.`,
          String.raw`במשולש ישר-זווית התיכון ליתר שווה למחצית היתר.`,
        ],
        solutionSteps: [
          String.raw`אמצע הקטע $AB$: $\left(\frac{2t+0}{2},\frac{0+\frac{2}{t}}{2}\right)=\left(t,\frac{1}{t}\right)$, וזו בדיוק הנקודה $P$.`,
          String.raw`לכן $OP$ הוא התיכון ליתר במשולש ישר-הזווית $OAB$, ובמשולש ישר-זווית התיכון ליתר שווה למחצית היתר: $OP=\frac{AB}{2}$.`,
          String.raw`עבור $t=1$: $AB=2\sqrt{2}$, ולכן $OP=\sqrt{2}\approx1.41$.`,
          String.raw`בדיקה ישירה: $P(1,1)$ ו-$OP=\sqrt{1^2+1^2}=\sqrt{2}$.`,
        ],
        finalAnswer: String.raw`$P$ אמצע $AB$; $OP=\sqrt{2}\approx 1.41$`,
        numericAnswer: 1.4142135623730951,
      },
    ],
  },
  {
    id: '35581-8-6',
    questionnaire: '35581',
    slot: 8,
    title: 'טרפז מקסימלי מתחת לגרף שורש',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-graphical-extrema', 'diff-rules', 'diff-investigation', 'alg-substitution'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-8-6-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\sqrt{x}$. הנקודה $B(9,3)$ נמצאת על גרף הפונקציה, והנקודה $A$ נמצאת על הגרף משמאל ל-$B$; שיעור ה-x של $A$ הוא $t$ ($0<t<9$). מהנקודות $A$ ו-$B$ מורידים אנכים לציר ה-x, הפוגשים אותו בנקודות $A_1$ ו-$B_1$ בהתאמה.

הביעו באמצעות $t$ את שטח הטרפז $AA_1B_1B$.`,
        hints: [
          String.raw`$A\left(t,\sqrt{t}\right)$, $A_1(t,0)$, $B_1(9,0)$.`,
          String.raw`בסיסי הטרפז הם $AA_1$ ו-$BB_1$ (שניהם מאונכים לציר ה-x), והגובה הוא $A_1B_1$.`,
        ],
        solutionSteps: [
          String.raw`$A\left(t,\sqrt{t}\right)$, ולכן $AA_1=\sqrt{t}$; $B(9,3)$, ולכן $BB_1=3$.`,
          String.raw`$AA_1\parallel BB_1$ (שניהם מאונכים לציר ה-x), ולכן $AA_1B_1B$ הוא טרפז ישר-זווית שבסיסיו $\sqrt{t}$ ו-$3$ וגובהו $A_1B_1=9-t$.`,
          String.raw`$S(t)=\frac{\left(\sqrt{t}+3\right)(9-t)}{2}$, עבור $0<t<9$.`,
        ],
        finalAnswer: String.raw`$S(t)=\frac{\left(\sqrt{t}+3\right)(9-t)}{2}$, $0<t<9$`,
      },
      {
        id: '35581-8-6-b',
        label: 'ב',
        statement: String.raw`מצאו את הערך של $t$ שעבורו שטח הטרפז מקסימלי, והוכיחו שזהו מקסימום.`,
        hints: [
          String.raw`גזרו כמכפלה: $\left(\sqrt{t}\right)'=\frac{1}{2\sqrt{t}}$.`,
          String.raw`לאחר הבאה למכנה משותף תתקבל במונה משוואה ב-$\sqrt{t}$; סמנו $u=\sqrt{t}$ ופתרו משוואה ריבועית.`,
          String.raw`בדקו את סימן $S'$ משני צידי הפתרון.`,
        ],
        solutionSteps: [
          String.raw`$S'(t)=\frac{1}{2}\left[\frac{1}{2\sqrt{t}}(9-t)+\left(\sqrt{t}+3\right)\cdot(-1)\right]=\frac{1}{2}\cdot\frac{9-t-2t-6\sqrt{t}}{2\sqrt{t}}=\frac{9-3t-6\sqrt{t}}{4\sqrt{t}}$.`,
          String.raw`$S'(t)=0\iff 3-t-2\sqrt{t}=0$. נסמן $u=\sqrt{t}>0$: $u^2+2u-3=0$, כלומר $(u+3)(u-1)=0$, ולכן $u=1$ (הפתרון $u=-3$ נפסל), ומכאן $t=1$.`,
          String.raw`סימן הנגזרת: $S'(t)=\frac{-3(u+3)(u-1)}{4u}$ כאשר $u=\sqrt{t}$. עבור $0<t<1$ ($u<1$): $S'>0$ והשטח גדל; עבור $1<t<9$ ($u>1$): $S'<0$ והשטח קטן.`,
          String.raw`לכן ב-$t=1$ מקסימום מוחלט של השטח בתחום $0<t<9$.`,
        ],
        finalAnswer: String.raw`$t=1$`,
        numericAnswer: 1,
      },
      {
        id: '35581-8-6-c',
        label: 'ג',
        statement: String.raw`חשבו את השטח המקסימלי של הטרפז ואת שיעורי הנקודה $A$ במצב זה.`,
        hints: [
          String.raw`הציבו $t=1$ ב-$S(t)$.`,
          String.raw`$A\left(1,\sqrt{1}\right)$.`,
        ],
        solutionSteps: [
          String.raw`עבור $t=1$: $\sqrt{t}=1$, ולכן $A(1,1)$.`,
          String.raw`$S(1)=\frac{(1+3)(9-1)}{2}=\frac{4\cdot8}{2}=16$.`,
          String.raw`לשם השוואה: כאשר $t\to0$ הטרפז הופך למשולש $OB_1B$ ששטחו $\frac{9\cdot3}{2}=13.5<16$, בהתאם לסעיף ב.`,
        ],
        finalAnswer: String.raw`$S_{\max}=16$; $A(1,1)$`,
        numericAnswer: 16,
      },
      {
        id: '35581-8-6-d',
        label: 'ד',
        statement: String.raw`עבור הנקודה $A$ שמצאתם, חשבו את שטח המשולש $OAB$ ($O$ ראשית הצירים).`,
        hints: [
          String.raw`חשבו את שטח המשולש כהפרש שטחים: השטח שמתחת לקו השבור $OAB$ פחות שטח המשולש $OB_1B$.`,
          String.raw`$S_{OAB}=S_{OA_1A}+S_{AA_1B_1B}-S_{OB_1B}$.`,
        ],
        solutionSteps: [
          String.raw`המשולש $OB_1B$ ישר-זווית: $S_{OB_1B}=\frac{1}{2}\cdot9\cdot3=13.5$. המשולש $OA_1A$ ישר-זווית: $S_{OA_1A}=\frac{1}{2}\cdot1\cdot1=0.5$.`,
          String.raw`השטח שמתחת לקו השבור $OAB$ (מעל ציר ה-x, בין $x=0$ ל-$x=9$) הוא $S_{OA_1A}+S_{AA_1B_1B}=0.5+16=16.5$.`,
          String.raw`הנקודה $A(1,1)$ נמצאת מעל הישר $OB$ (משוואתו $y=\frac{1}{3}x$, ובו $y(1)=\frac{1}{3}<1$), ולכן $S_{OAB}=16.5-S_{OB_1B}=16.5-13.5=3$.`,
          String.raw`בדיקה: לפי נוסחת השטח של משולש שקודקודיו $O(0,0)$, $A(1,1)$, $B(9,3)$: $\frac{1}{2}\left|1\cdot3-9\cdot1\right|=3$.`,
        ],
        finalAnswer: String.raw`$S_{OAB}=3$`,
        numericAnswer: 3,
      },
    ],
  },
  {
    id: '35581-8-7',
    questionnaire: '35581',
    slot: 8,
    title: 'המרחק הקצר ביותר מנקודה לפרבולה',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-graphical-extrema', 'diff-rules', 'diff-tangent-on-graph', 'ag-lines'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-8-7-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=x^2-2x+2$ והנקודה $C(6,0)$. הנקודה $P$ נמצאת על גרף הפונקציה, ושיעור ה-x שלה הוא $x$.

הביעו באמצעות $x$ את ריבוע המרחק $D(x)=CP^2$, ורשמו את תחום ההגדרה.`,
        hints: [
          String.raw`$P\left(x,x^2-2x+2\right)$.`,
          String.raw`$CP^2=(x-6)^2+\left(x^2-2x+2-0\right)^2$; הנקודה P יכולה להיות בכל מקום על הגרף.`,
        ],
        solutionSteps: [
          String.raw`הנקודה P על הגרף, ולכן $P\left(x,x^2-2x+2\right)$.`,
          String.raw`לפי נוסחת המרחק: $D(x)=CP^2=(x-6)^2+\left(x^2-2x+2\right)^2$.`,
          String.raw`הפונקציה $f$ מוגדרת לכל $x$, ולכן תחום ההגדרה של $D$ הוא כל המספרים הממשיים.`,
          String.raw`המרחק $CP=\sqrt{D(x)}$ ופונקציית השורש עולה, ולכן המרחק מינימלי בדיוק כאשר $D$ מינימלית – נוח לעבוד עם $D$.`,
        ],
        finalAnswer: String.raw`$D(x)=(x-6)^2+\left(x^2-2x+2\right)^2$, לכל $x$ ממשי`,
      },
      {
        id: '35581-8-7-b',
        label: 'ב',
        statement: String.raw`מצאו את הערך של $x$ שעבורו המרחק $CP$ מינימלי, והוכיחו שזהו מינימום מוחלט.`,
        hints: [
          String.raw`גזרו בכלל השרשרת: $\left(\left(x^2-2x+2\right)^2\right)'=2\left(x^2-2x+2\right)(2x-2)$.`,
          String.raw`לאחר פתיחת סוגריים תתקבל המשוואה $2x^3-6x^2+9x-10=0$. נסו את $x=2$.`,
          String.raw`פרקו: $2x^3-6x^2+9x-10=(x-2)\left(2x^2-2x+5\right)$ ובדקו את הדיסקרימיננטה של הגורם הריבועי.`,
        ],
        solutionSteps: [
          String.raw`$D'(x)=2(x-6)+2\left(x^2-2x+2\right)(2x-2)$.`,
          String.raw`$\left(x^2-2x+2\right)(2x-2)=2x^3-6x^2+8x-4$, ולכן $D'(x)=2\left(2x^3-6x^2+9x-10\right)$.`,
          String.raw`$x=2$ הוא שורש: $16-24+18-10=0$, ומתקיים $2x^3-6x^2+9x-10=(x-2)\left(2x^2-2x+5\right)$.`,
          String.raw`לגורם $2x^2-2x+5$ דיסקרימיננטה $4-40<0$ ומקדם מוביל חיובי, ולכן הוא חיובי תמיד. לכן $x=2$ הוא האפס היחיד של $D'$.`,
          String.raw`סימן $D'$ כסימן $x-2$: עבור $x<2$: $D'<0$ (יורדת); עבור $x>2$: $D'>0$ (עולה). לכן ב-$x=2$ מינימום מוחלט.`,
        ],
        finalAnswer: String.raw`$x=2$`,
        numericAnswer: 2,
      },
      {
        id: '35581-8-7-c',
        label: 'ג',
        statement: String.raw`מצאו את שיעורי הנקודה $P$ הקרובה ביותר לנקודה $C$, וחשבו את המרחק המינימלי.`,
        hints: [
          String.raw`$f(2)=4-4+2$.`,
          String.raw`$CP=\sqrt{D(2)}$.`,
        ],
        solutionSteps: [
          String.raw`$f(2)=4-4+2=2$, ולכן $P(2,2)$.`,
          String.raw`$D(2)=(2-6)^2+2^2=16+4=20$.`,
          String.raw`$CP_{\min}=\sqrt{20}=2\sqrt{5}\approx4.47$.`,
        ],
        finalAnswer: String.raw`$P(2,2)$; $CP_{\min}=2\sqrt{5}\approx 4.47$`,
        numericAnswer: 4.47213595499958,
      },
      {
        id: '35581-8-7-d',
        label: 'ד',
        statement: String.raw`מצאו את משוואת המשיק לגרף הפונקציה בנקודה $P$ שמצאתם, והוכיחו שהקטע $CP$ מאונך למשיק זה.`,
        hints: [
          String.raw`$f'(x)=2x-2$, ולכן שיפוע המשיק ב-$P$ הוא $f'(2)$.`,
          String.raw`חשבו את שיפוע הקטע $CP$ והראו שמכפלת השיפועים היא $-1$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2x-2$, ולכן שיפוע המשיק ב-$P(2,2)$ הוא $f'(2)=2$.`,
          String.raw`משוואת המשיק: $y-2=2(x-2)$, כלומר $y=2x-2$.`,
          String.raw`שיפוע הקטע $CP$: $m_{CP}=\frac{2-0}{2-6}=-\frac{1}{2}$.`,
          String.raw`מכפלת השיפועים: $2\cdot\left(-\frac{1}{2}\right)=-1$, ולכן $CP$ מאונך למשיק בנקודה $P$.`,
          String.raw`זו בדיוק המשמעות הגאומטרית של התנאי $D'(x)=0$: $D'(x)=2\left[(x-6)+f(x)f'(x)\right]=0$ פירושו שהווקטור מ-$C$ ל-$P$ מאונך לכיוון המשיק.`,
        ],
        finalAnswer: String.raw`$y=2x-2$; $m_{CP}\cdot f'(2)=-\frac{1}{2}\cdot2=-1$, ולכן $CP$ מאונך למשיק.`,
      },
    ],
  },
  {
    id: '35581-8-8',
    questionnaire: '35581',
    slot: 8,
    title: 'פונקציה עם פרמטר – משולש מקסימלי',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-graphical-extrema', 'diff-investigation', 'diff-second-derivative', 'diff-rules'],
    difficulty: 3,
    estimatedMinutes: 35,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-8-8-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-3a^2x$, כאשר $a>0$ פרמטר.

מצאו באמצעות $a$ את שיעורי נקודות הקיצון של הפונקציה וקבעו את סוגן. הראו שנקודות הקיצון סימטריות זו לזו ביחס לראשית הצירים.`,
        hints: [
          String.raw`$f'(x)=3x^2-3a^2=3(x-a)(x+a)$.`,
          String.raw`קבעו את סוג הקיצון בעזרת $f''(x)=6x$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3x^2-3a^2=3(x-a)(x+a)$, ולכן $f'(x)=0\iff x=a$ או $x=-a$.`,
          String.raw`$f''(x)=6x$: $f''(-a)=-6a<0$ – מקסימום; $f''(a)=6a>0$ – מינימום (כי $a>0$).`,
          String.raw`$f(-a)=-a^3+3a^3=2a^3$ ו-$f(a)=a^3-3a^3=-2a^3$.`,
          String.raw`לכן $M\left(-a,2a^3\right)$ מקסימום ו-$N\left(a,-2a^3\right)$ מינימום. הנקודות נגדיות בשני השיעורים, ולכן סימטריות ביחס לראשית (כמצופה, כי $f$ אי-זוגית: $f(-x)=-f(x)$).`,
        ],
        finalAnswer: String.raw`מקסימום $\left(-a,2a^3\right)$, מינימום $\left(a,-2a^3\right)$; סימטריות ביחס לראשית.`,
      },
      {
        id: '35581-8-8-b',
        label: 'ב',
        statement: String.raw`נתון כי $0<a<2$. מנקודת המינימום $N$ מורידים אנך לציר ה-x הפוגש אותו בנקודה $Q$. הנקודה $C(2,0)$ נמצאת על ציר ה-x.

הביעו באמצעות $a$ את שטח המשולש $NQC$.`,
        hints: [
          String.raw`$Q(a,0)$; המשולש ישר-זווית ב-$Q$.`,
          String.raw`$QC=2-a$ (כי $a<2$) ו-$NQ=\left|-2a^3\right|=2a^3$.`,
        ],
        solutionSteps: [
          String.raw`$N\left(a,-2a^3\right)$, ולכן $Q(a,0)$ והקטע $NQ$ מאונך לציר ה-x, כך שהמשולש $NQC$ ישר-זווית ב-$Q$.`,
          String.raw`$NQ=2a^3$ ו-$QC=2-a$ (חיובי, כי $0<a<2$).`,
          String.raw`$S(a)=\frac{1}{2}\cdot2a^3(2-a)=2a^3-a^4$, עבור $0<a<2$.`,
        ],
        finalAnswer: String.raw`$S(a)=2a^3-a^4$, $0<a<2$`,
      },
      {
        id: '35581-8-8-c',
        label: 'ג',
        statement: String.raw`מצאו את הערך של $a$ שעבורו שטח המשולש $NQC$ מקסימלי, והוכיחו שזהו מקסימום.`,
        hints: [
          String.raw`$S'(a)=6a^2-4a^3=2a^2(3-2a)$.`,
          String.raw`$a=0$ אינו בתחום; בדקו את סימן $S'$ משני צידי $a=1.5$.`,
        ],
        solutionSteps: [
          String.raw`$S'(a)=6a^2-4a^3=2a^2(3-2a)$.`,
          String.raw`בתחום $0<a<2$ הגורם $2a^2$ חיובי, ולכן $S'(a)=0\iff a=1.5$.`,
          String.raw`עבור $0<a<1.5$: $3-2a>0$, ולכן $S'>0$ והשטח גדל; עבור $1.5<a<2$: $S'<0$ והשטח קטן.`,
          String.raw`לכן ב-$a=1.5$ מקסימום מוחלט של השטח בתחום.`,
        ],
        finalAnswer: String.raw`$a=1.5$`,
        numericAnswer: 1.5,
      },
      {
        id: '35581-8-8-d',
        label: 'ד',
        statement: String.raw`חשבו את השטח המקסימלי של המשולש, ורשמו את הפונקציה ואת שיעורי נקודת המינימום שלה עבור ערך זה של $a$.`,
        hints: [
          String.raw`$S(1.5)=1.5^3(2-1.5)$.`,
          String.raw`$3a^2=3\cdot2.25$.`,
        ],
        solutionSteps: [
          String.raw`$S(1.5)=1.5^3\cdot(2-1.5)=3.375\cdot0.5=1.6875=\frac{27}{16}$.`,
          String.raw`עבור $a=1.5$: $3a^2=6.75$, ולכן $f(x)=x^3-6.75x$.`,
          String.raw`נקודת המינימום: $N\left(1.5,-2\cdot1.5^3\right)=N(1.5,-6.75)$. בדיקה: $\frac{1}{2}\cdot6.75\cdot0.5=1.6875$.`,
        ],
        finalAnswer: String.raw`$S_{\max}=\frac{27}{16}=1.6875$; $f(x)=x^3-6.75x$, $N(1.5,-6.75)$`,
        numericAnswer: 1.6875,
      },
    ],
  },
  {
    id: '35581-8-9',
    questionnaire: '35581',
    slot: 8,
    title: 'ישר דרך נקודה קבועה – משולש מינימלי עם הצירים',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-graphical-extrema', 'diff-rules', 'diff-second-derivative', 'ag-lines'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-8-9-a',
        label: 'א',
        statement: String.raw`דרך הנקודה $K(1,4)$ מעבירים ישר בעל שיפוע $m$ החותך את החלק החיובי של ציר ה-x בנקודה $A$ ואת החלק החיובי של ציר ה-y בנקודה $B$.

מצאו באמצעות $m$ את שיעורי $A$ ו-$B$, קבעו את תחום הערכים של $m$, והראו ששטח המשולש $OAB$ ($O$ ראשית הצירים) הוא $S(m)=4-\frac{m}{2}-\frac{8}{m}$.`,
        hints: [
          String.raw`משוואת הישר: $y-4=m(x-1)$.`,
          String.raw`כדי ששני החיתוכים יהיו חיוביים, השיפוע חייב להיות שלילי.`,
          String.raw`$S=\frac{1}{2}\cdot OA\cdot OB$.`,
        ],
        solutionSteps: [
          String.raw`משוואת הישר: $y=m(x-1)+4$.`,
          String.raw`חיתוך עם ציר ה-y ($x=0$): $B(0,4-m)$. חיתוך עם ציר ה-x ($y=0$): $x=1-\frac{4}{m}$, ולכן $A\left(1-\frac{4}{m},0\right)$.`,
          String.raw`נדרש $4-m>0$ ו-$1-\frac{4}{m}>0$. עבור $m<0$ שני התנאים מתקיימים; עבור $0<m<4$ מתקיים $\frac{4}{m}>1$ והתנאי השני נכשל; עבור $m\ge4$ התנאי הראשון נכשל. לכן $m<0$.`,
          String.raw`$S(m)=\frac{1}{2}\left(1-\frac{4}{m}\right)(4-m)=\frac{1}{2}\left(4-m-\frac{16}{m}+4\right)=4-\frac{m}{2}-\frac{8}{m}$.`,
        ],
        finalAnswer: String.raw`$A\left(1-\frac{4}{m},0\right)$, $B(0,4-m)$, $m<0$, $S(m)=4-\frac{m}{2}-\frac{8}{m}$`,
      },
      {
        id: '35581-8-9-b',
        label: 'ב',
        statement: String.raw`מצאו את השיפוע $m$ שעבורו שטח המשולש $OAB$ מינימלי, וחשבו את השטח המינימלי.`,
        hints: [
          String.raw`$S'(m)=-\frac{1}{2}+\frac{8}{m^2}$.`,
          String.raw`$S''(m)=-\frac{16}{m^3}$; מה סימנה כאשר $m<0$?`,
        ],
        solutionSteps: [
          String.raw`$S'(m)=-\frac{1}{2}+\frac{8}{m^2}=\frac{16-m^2}{2m^2}$.`,
          String.raw`$S'(m)=0\iff m^2=16$, ובתחום $m<0$: $m=-4$.`,
          String.raw`$S''(m)=-\frac{16}{m^3}$, ו-$S''(-4)=-\frac{16}{-64}=\frac{1}{4}>0$, ולכן מינימום. זו נקודת הקיצון היחידה בתחום (ו-$S\to\infty$ כאשר $m\to0^-$ וכאשר $m\to-\infty$), ולכן זהו מינימום מוחלט.`,
          String.raw`$S(-4)=4+2+2=8$.`,
        ],
        finalAnswer: String.raw`$m=-4$; $S_{\min}=8$`,
        numericAnswer: 8,
      },
      {
        id: '35581-8-9-c',
        label: 'ג',
        statement: String.raw`עבור השיפוע שמצאתם, רשמו את משוואת הישר ואת שיעורי $A$ ו-$B$, והוכיחו שהנקודה $K$ היא אמצע הקטע $AB$.`,
        hints: [
          String.raw`הציבו $m=-4$ בתוצאות סעיף א.`,
          String.raw`נוסחת אמצע קטע.`,
        ],
        solutionSteps: [
          String.raw`עבור $m=-4$: $y=-4(x-1)+4=-4x+8$.`,
          String.raw`$A\left(1+1,0\right)=A(2,0)$ ו-$B(0,8)$.`,
          String.raw`אמצע $AB$: $\left(\frac{2+0}{2},\frac{0+8}{2}\right)=(1,4)=K$.`,
        ],
        finalAnswer: String.raw`$y=-4x+8$; $A(2,0)$, $B(0,8)$; אמצע $AB$ הוא $(1,4)=K$.`,
      },
      {
        id: '35581-8-9-d',
        label: 'ד',
        statement: String.raw`חשבו את המרחק של ראשית הצירים מהישר $AB$ שמצאתם.`,
        hints: [
          String.raw`המרחק הוא הגובה ליתר $AB$ במשולש ישר-הזווית $OAB$.`,
          String.raw`$2S=AB\cdot h$, כאשר $AB=\sqrt{2^2+8^2}$.`,
        ],
        solutionSteps: [
          String.raw`המרחק מ-$O$ לישר $AB$ הוא אורך הגובה $h$ ליתר במשולש ישר-הזווית $OAB$.`,
          String.raw`$AB=\sqrt{2^2+8^2}=\sqrt{68}=2\sqrt{17}$.`,
          String.raw`חישוב השטח בשתי דרכים: $\frac{1}{2}\cdot AB\cdot h=8$, ולכן $h=\frac{16}{2\sqrt{17}}=\frac{8}{\sqrt{17}}\approx1.94$.`,
        ],
        finalAnswer: String.raw`$h=\frac{8}{\sqrt{17}}=\frac{8\sqrt{17}}{17}\approx 1.94$`,
        numericAnswer: 1.9402850002906638,
      },
    ],
  },
  {
    id: '35581-8-10',
    questionnaire: '35581',
    slot: 8,
    title: 'הקטע האנכי הארוך ביותר בין שני גרפים',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-graphical-extrema', 'diff-intersections-monotonicity', 'diff-tangent-on-graph', 'diff-rules'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-8-10-a',
        label: 'א',
        statement: String.raw`נתונות הפונקציות $f(x)=2\sqrt{x}$ ו-$g(x)=x$.

מצאו את נקודות החיתוך של הגרפים, וקבעו איזה גרף נמצא מעל השני בין נקודות החיתוך.`,
        hints: [
          String.raw`פתרו $2\sqrt{x}=x$ (שימו לב לתחום $x\ge0$).`,
          String.raw`הציבו נקודה בין נקודות החיתוך, למשל $x=1$.`,
        ],
        solutionSteps: [
          String.raw`תחום ההגדרה של $f$: $x\ge0$.`,
          String.raw`$2\sqrt{x}=x\Rightarrow4x=x^2\Rightarrow x(x-4)=0$, ולכן $x=0$ או $x=4$ (שניהם מקיימים את המשוואה המקורית).`,
          String.raw`נקודות החיתוך: $(0,0)$ ו-$(4,4)$.`,
          String.raw`עבור $x=1$: $f(1)=2>g(1)=1$, ולכן בתחום $0<x<4$ גרף $f$ נמצא מעל גרף $g$.`,
        ],
        finalAnswer: String.raw`$(0,0)$ ו-$(4,4)$; בתחום $0<x<4$ גרף $f$ מעל גרף $g$.`,
      },
      {
        id: '35581-8-10-b',
        label: 'ב',
        statement: String.raw`ישר המקביל לציר ה-y, $x=t$ ($0<t<4$), חותך את גרף $f$ בנקודה $A$ ואת גרף $g$ בנקודה $B$. מצאו את הערך של $t$ שעבורו אורך הקטע $AB$ מקסימלי, והוכיחו שזהו מקסימום.`,
        hints: [
          String.raw`$AB=f(t)-g(t)=2\sqrt{t}-t$ (לפי סעיף א, $f$ מעל $g$).`,
          String.raw`$\left(2\sqrt{t}\right)'=\frac{1}{\sqrt{t}}$.`,
        ],
        solutionSteps: [
          String.raw`לפי סעיף א, בתחום $0<t<4$: $AB=d(t)=2\sqrt{t}-t$.`,
          String.raw`$d'(t)=\frac{1}{\sqrt{t}}-1=\frac{1-\sqrt{t}}{\sqrt{t}}$.`,
          String.raw`$d'(t)=0\iff\sqrt{t}=1\iff t=1$.`,
          String.raw`עבור $0<t<1$: $\sqrt{t}<1$ ו-$d'>0$; עבור $1<t<4$: $d'<0$. לכן ב-$t=1$ מקסימום מוחלט בתחום.`,
        ],
        finalAnswer: String.raw`$t=1$`,
        numericAnswer: 1,
      },
      {
        id: '35581-8-10-c',
        label: 'ג',
        statement: String.raw`חשבו את האורך המקסימלי של הקטע $AB$, ומצאו את שיעורי הנקודות $A$ ו-$B$ במצב זה.`,
        hints: [
          String.raw`הציבו $t=1$ ב-$f$ וב-$g$.`,
          String.raw`$d(1)=f(1)-g(1)$.`,
        ],
        solutionSteps: [
          String.raw`$f(1)=2\sqrt{1}=2$, ולכן $A(1,2)$.`,
          String.raw`$g(1)=1$, ולכן $B(1,1)$.`,
          String.raw`$AB_{\max}=2-1=1$.`,
        ],
        finalAnswer: String.raw`$AB_{\max}=1$; $A(1,2)$, $B(1,1)$`,
        numericAnswer: 1,
      },
      {
        id: '35581-8-10-d',
        label: 'ד',
        statement: String.raw`הוכיחו שהמשיק לגרף $f$ בנקודה $A$ מקביל לגרף $g$ (שהוא גם המיתר המחבר את נקודות החיתוך של שני הגרפים), ומצאו את משוואת המשיק.`,
        hints: [
          String.raw`$f'(x)=\frac{1}{\sqrt{x}}$; חשבו $f'(1)$.`,
          String.raw`שיפוע המיתר בין $(0,0)$ ל-$(4,4)$ הוא $\frac{4-0}{4-0}$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\frac{1}{\sqrt{x}}$, ולכן שיפוע המשיק ב-$A(1,2)$ הוא $f'(1)=1$.`,
          String.raw`שיפוע המיתר בין נקודות החיתוך $(0,0)$ ו-$(4,4)$ הוא $\frac{4-0}{4-0}=1$, וזה גם השיפוע של $g(x)=x$.`,
          String.raw`השיפועים שווים, והמשיק אינו מתלכד עם $g$ (הוא עובר דרך $A(1,2)$ שאינה על $y=x$), ולכן המשיק מקביל לגרף $g$.`,
          String.raw`משוואת המשיק: $y-2=1\cdot(x-1)$, כלומר $y=x+1$.`,
          String.raw`זה אינו מקרי: בנקודת הקיצון $d'(t)=f'(t)-g'(t)=0$, כלומר $f'(t)=g'(t)$ – המשיקים לשני הגרפים מקבילים.`,
        ],
        finalAnswer: String.raw`$f'(1)=1$, שווה לשיפוע $g$ ולשיפוע המיתר, ולכן המשיק מקביל לגרף $g$; משוואת המשיק $y=x+1$.`,
      },
    ],
  },
];
