import type { Problem } from '../types';

/**
 * שאלון 35581 – שאלה 6 (חדו״א של פולינום, מנה ושורש).
 * שטחים מחושבים רק באינטגרל של פולינום או של c·g′(x)/(g(x))^n (n≠1), או בגאומטריה אלמנטרית.
 */
export const slot6Problems: Problem[] = [
  {
    id: '35581-6-1',
    questionnaire: '35581',
    slot: 6,
    title: 'חקירת פולינום ממעלה שלישית ושטח בין הגרף למשיק',
    topicId: 'integral-calculus',
    subtopicIds: ['diff-investigation', 'diff-tangent-on-graph', 'diff-second-derivative', 'int-definite-areas'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-6-1-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-6x^2+9x$.

מצאו את נקודות החיתוך של גרף הפונקציה עם הצירים, את נקודות הקיצון שלה וקבעו את סוגן, ואת תחומי העלייה והירידה.`,
        hints: [
          String.raw`הוציאו גורם משותף: $f(x)=x(x^2-6x+9)$, וזהו ריבוע של בינום.`,
          String.raw`$f'(x)=3x^2-12x+9=3(x^2-4x+3)$ – פרקו לגורמים.`,
          String.raw`בדקו את סימן הנגזרת משני צידי כל נקודה חשודה.`,
        ],
        solutionSteps: [
          String.raw`חיתוך עם ציר y: $f(0)=0$, כלומר $(0,0)$.`,
          String.raw`חיתוך עם ציר x: $f(x)=x(x-3)^2=0$, ולכן $x=0$ או $x=3$: הנקודות $(0,0)$ ו-$(3,0)$.`,
          String.raw`הנגזרת: $f'(x)=3x^2-12x+9=3(x-1)(x-3)$, והיא מתאפסת ב-$x=1$ וב-$x=3$.`,
          String.raw`סימן הנגזרת: עבור $x<1$ – חיובית, עבור $1<x<3$ – שלילית, עבור $x>3$ – חיובית.`,
          String.raw`לכן ב-$x=1$ יש מקסימום: $f(1)=1-6+9=4$, הנקודה $(1,4)$; וב-$x=3$ יש מינימום: $(3,0)$.`,
          String.raw`הפונקציה עולה בתחומים $x<1$ ו-$x>3$, ויורדת בתחום $1<x<3$.`,
        ],
        finalAnswer: String.raw`חיתוך: $(0,0)$, $(3,0)$. מקסימום $(1,4)$, מינימום $(3,0)$. עולה ב-$x<1$ וב-$x>3$, יורדת ב-$1<x<3$.`,
      },
      {
        id: '35581-6-1-b',
        label: 'ב',
        statement: String.raw`מצאו את נקודת הפיתול של הפונקציה, ואת משוואת המשיק לגרף הפונקציה בנקודה זו.`,
        hints: [
          String.raw`$f''(x)=6x-12$. היכן היא מתאפסת ומחליפה סימן?`,
          String.raw`שיפוע המשיק בנקודה שבה $x=x_0$ הוא $f'(x_0)$.`,
          String.raw`משוואת המשיק: $y-f(x_0)=f'(x_0)(x-x_0)$.`,
        ],
        solutionSteps: [
          String.raw`$f''(x)=6x-12$, מתאפסת ב-$x=2$ ומחליפה בה סימן (שלילית משמאל, חיובית מימין).`,
          String.raw`$f(2)=8-24+18=2$, ולכן נקודת הפיתול היא $(2,2)$.`,
          String.raw`שיפוע המשיק: $f'(2)=12-24+9=-3$.`,
          String.raw`משוואת המשיק: $y-2=-3(x-2)$, כלומר $y=-3x+8$.`,
        ],
        finalAnswer: String.raw`נקודת פיתול $(2,2)$; משיק: $y=-3x+8$.`,
      },
      {
        id: '35581-6-1-c',
        label: 'ג',
        statement: String.raw`העבירו משיק לגרף הפונקציה בנקודת המקסימום שלה. המשיק חותך את גרף הפונקציה בנקודה נוספת. מצאו את שיעור ה-x של נקודה זו.`,
        hints: [
          String.raw`בנקודת קיצון שיפוע המשיק הוא 0, ולכן המשיק מקביל לציר x.`,
          String.raw`פתרו $x^3-6x^2+9x=4$. ידוע ש-$x=1$ הוא פתרון (נקודת ההשקה), ולכן $(x-1)$ הוא גורם – ואף גורם כפול.`,
          String.raw`נסו לפרק: $x^3-6x^2+9x-4=(x-1)^2(x-a)$ והשוו את המקדם החופשי.`,
        ],
        solutionSteps: [
          String.raw`נקודת המקסימום היא $(1,4)$ ושיפוע המשיק בה $f'(1)=0$, ולכן משוואת המשיק $y=4$.`,
          String.raw`נקודות החיתוך של המשיק עם הגרף: $x^3-6x^2+9x=4$, כלומר $x^3-6x^2+9x-4=0$.`,
          String.raw`בנקודת ההשקה $x=1$ יש שורש כפול, ולכן נחפש פירוק $(x-1)^2(x-a)=x^3-(a+2)x^2+(2a+1)x-a$.`,
          String.raw`השוואת מקדמים: $a+2=6$, $2a+1=9$, $a=4$ – כולם מתקיימים עבור $a=4$.`,
          String.raw`לכן $x^3-6x^2+9x-4=(x-1)^2(x-4)$, ונקודת החיתוך הנוספת היא $x=4$, כלומר $(4,4)$.`,
        ],
        finalAnswer: String.raw`$x=4$ (הנקודה $(4,4)$).`,
        numericAnswer: 4,
      },
      {
        id: '35581-6-1-d',
        label: 'ד',
        statement: String.raw`חשבו את השטח המוגבל על ידי גרף הפונקציה והמשיק שמצאתם בסעיף ג.`,
        hints: [
          String.raw`גבולות האינטגרציה הם נקודות החיתוך $x=1$ ו-$x=4$.`,
          String.raw`בתחום $1<x<4$ מתקיים $f(x)-4=(x-1)^2(x-4)<0$, כלומר המשיק מעל הגרף.`,
          String.raw`$S=\int_1^4\left(4-x^3+6x^2-9x\right)dx$.`,
        ],
        solutionSteps: [
          String.raw`בתחום $1<x<4$: $f(x)-4=(x-1)^2(x-4)<0$, ולכן הישר $y=4$ מעל גרף הפונקציה.`,
          String.raw`$S=\int_1^4\left(4-(x^3-6x^2+9x)\right)dx=\int_1^4\left(-x^3+6x^2-9x+4\right)dx$.`,
          String.raw`פונקציה קדומה: $F(x)=-\frac{x^4}{4}+2x^3-\frac{9x^2}{2}+4x$.`,
          String.raw`$F(4)=-64+128-72+16=8$, $F(1)=-\frac{1}{4}+2-\frac{9}{2}+4=1.25$.`,
          String.raw`$S=F(4)-F(1)=8-1.25=6.75$.`,
        ],
        finalAnswer: String.raw`$S=6.75=\frac{27}{4}$`,
        numericAnswer: 6.75,
      },
    ],
  },
  {
    id: '35581-6-2',
    questionnaire: '35581',
    slot: 6,
    title: 'פונקציה רציונלית ושטח מתחת לגרף הנגזרת',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-investigation', 'diff-tangent-on-graph', 'int-polynomial-rational', 'int-definite-areas'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-6-2-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x^2}{x^2-4}$.

מצאו את תחום ההגדרה של הפונקציה ואת משוואות האסימפטוטות שלה המקבילות לצירים.`,
        hints: [
          String.raw`הפונקציה אינה מוגדרת היכן שהמכנה מתאפס.`,
          String.raw`בדקו שהמונה אינו מתאפס בנקודות אלו – אז הן אסימפטוטות אנכיות.`,
          String.raw`לאסימפטוטה אופקית חשבו $\lim_{x\to\pm\infty}f(x)$ – חלקו מונה ומכנה ב-$x^2$.`,
        ],
        solutionSteps: [
          String.raw`המכנה מתאפס כאשר $x^2=4$, כלומר $x=\pm 2$. תחום ההגדרה: $x\ne 2$, $x\ne -2$.`,
          String.raw`בנקודות $x=\pm 2$ המונה שווה ל-4 (שונה מאפס), ולכן הישרים $x=2$ ו-$x=-2$ הם אסימפטוטות אנכיות.`,
          String.raw`$\lim_{x\to\pm\infty}\frac{x^2}{x^2-4}=\lim_{x\to\pm\infty}\frac{1}{1-\frac{4}{x^2}}=1$, ולכן $y=1$ אסימפטוטה אופקית.`,
        ],
        finalAnswer: String.raw`תחום: $x\ne\pm 2$. אסימפטוטות: $x=2$, $x=-2$, $y=1$.`,
      },
      {
        id: '35581-6-2-b',
        label: 'ב',
        statement: String.raw`מצאו את נקודות הקיצון של הפונקציה וקבעו את סוגן, ואת תחומי העלייה והירידה.`,
        hints: [
          String.raw`גזרו לפי כלל המנה: $\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}$.`,
          String.raw`תתקבל נגזרת שהמכנה שלה חיובי תמיד בתחום, ולכן הסימן נקבע לפי המונה.`,
          String.raw`זכרו לחלק את ציר x גם בנקודות שאינן בתחום ההגדרה.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\frac{2x(x^2-4)-x^2\cdot 2x}{(x^2-4)^2}=\frac{-8x}{(x^2-4)^2}$.`,
          String.raw`המכנה חיובי בכל התחום, ולכן סימן $f'$ הפוך לסימן $x$. $f'(x)=0$ רק ב-$x=0$.`,
          String.raw`עבור $x<0$ (ו-$x\ne -2$): $f'(x)>0$ – הפונקציה עולה. עבור $x>0$ (ו-$x\ne 2$): $f'(x)<0$ – הפונקציה יורדת.`,
          String.raw`לכן ב-$x=0$ יש מקסימום מקומי: $f(0)=0$, הנקודה $(0,0)$.`,
          String.raw`עלייה: $x<-2$ ו-$-2<x<0$. ירידה: $0<x<2$ ו-$x>2$.`,
        ],
        finalAnswer: String.raw`מקסימום מקומי $(0,0)$. עולה ב-$x<-2$ וב-$-2<x<0$; יורדת ב-$0<x<2$ וב-$x>2$.`,
      },
      {
        id: '35581-6-2-c',
        label: 'ג',
        statement: String.raw`מצאו את משוואת המשיק לגרף הפונקציה בנקודה שבה $x=3$, ואת שיעור ה-y של נקודת החיתוך של המשיק עם ציר y.`,
        hints: [
          String.raw`חשבו $f(3)$ ו-$f'(3)$ בעזרת הנגזרת מסעיף ב.`,
          String.raw`$y-f(3)=f'(3)(x-3)$, ואז הציבו $x=0$.`,
        ],
        solutionSteps: [
          String.raw`$f(3)=\frac{9}{9-4}=\frac{9}{5}$.`,
          String.raw`$f'(3)=\frac{-24}{(9-4)^2}=-\frac{24}{25}$.`,
          String.raw`משוואת המשיק: $y-\frac{9}{5}=-\frac{24}{25}(x-3)$, כלומר $y=-\frac{24}{25}x+\frac{72}{25}+\frac{45}{25}=-\frac{24}{25}x+\frac{117}{25}$.`,
          String.raw`בנקודת החיתוך עם ציר y מתקיים $x=0$, ולכן $y=\frac{117}{25}=4.68$.`,
        ],
        finalAnswer: String.raw`$y=-\frac{24}{25}x+\frac{117}{25}$; חותך את ציר y ב-$(0,4.68)$.`,
        numericAnswer: 4.68,
      },
      {
        id: '35581-6-2-d',
        label: 'ד',
        statement: String.raw`חשבו את השטח המוגבל על ידי גרף פונקציית הנגזרת $f'(x)$, ציר ה-x והישרים $x=-1$ ו-$x=1$.`,
        hints: [
          String.raw`לפי סעיף ב, $f'(x)>0$ עבור $-1<x<0$ ו-$f'(x)<0$ עבור $0<x<1$ – יש לפצל את השטח לשני חלקים.`,
          String.raw`הנגזרת היא מהצורה $\frac{c\cdot g'(x)}{(g(x))^2}$ עם $g(x)=x^2-4$, ופונקציה קדומה שלה היא $f(x)$ עצמה.`,
          String.raw`$\int_a^b f'(x)\,dx=f(b)-f(a)$.`,
        ],
        solutionSteps: [
          String.raw`הנגזרת $f'(x)=\frac{-8x}{(x^2-4)^2}=\frac{-4\cdot(x^2-4)'}{(x^2-4)^2}$, ופונקציה קדומה שלה היא $f(x)$ (או $\frac{4}{x^2-4}$, הנבדלת ממנה בקבוע).`,
          String.raw`בתחום $-1<x<0$ הנגזרת חיובית: $S_1=\int_{-1}^{0}f'(x)\,dx=f(0)-f(-1)=0-\left(-\frac{1}{3}\right)=\frac{1}{3}$.`,
          String.raw`בתחום $0<x<1$ הנגזרת שלילית: $S_2=-\int_{0}^{1}f'(x)\,dx=-\left(f(1)-f(0)\right)=-\left(-\frac{1}{3}-0\right)=\frac{1}{3}$.`,
          String.raw`השטח הכולל: $S=S_1+S_2=\frac{2}{3}$.`,
        ],
        finalAnswer: String.raw`$S=\frac{2}{3}$`,
        numericAnswer: 0.6666666666667,
      },
    ],
  },
  {
    id: '35581-6-3',
    questionnaire: '35581',
    slot: 6,
    title: 'פונקציית שורש, משיקים ומשולש',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-investigation', 'diff-rules', 'diff-tangent-on-graph', 'diff-intersections-monotonicity'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-6-3-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=x\sqrt{4-x}$.

מצאו את תחום ההגדרה של הפונקציה ואת נקודות החיתוך של גרפה עם הצירים.`,
        hints: [
          String.raw`ביטוי בתוך שורש ריבועי חייב להיות אי-שלילי.`,
          String.raw`מכפלה שווה לאפס כאשר אחד הגורמים שווה לאפס.`,
        ],
        solutionSteps: [
          String.raw`נדרש $4-x\ge 0$, ולכן תחום ההגדרה הוא $x\le 4$.`,
          String.raw`חיתוך עם ציר y: $f(0)=0$, הנקודה $(0,0)$.`,
          String.raw`חיתוך עם ציר x: $x\sqrt{4-x}=0$ כאשר $x=0$ או $4-x=0$, כלומר הנקודות $(0,0)$ ו-$(4,0)$.`,
        ],
        finalAnswer: String.raw`תחום: $x\le 4$. חיתוך עם הצירים: $(0,0)$, $(4,0)$.`,
      },
      {
        id: '35581-6-3-b',
        label: 'ב',
        statement: String.raw`מצאו את נקודות הקיצון של הפונקציה (כולל קצה התחום) וקבעו את סוגן.`,
        hints: [
          String.raw`גזרו לפי כלל המכפלה: $(\sqrt{4-x})'=\frac{-1}{2\sqrt{4-x}}$.`,
          String.raw`הביאו למכנה משותף: $f'(x)=\frac{2(4-x)-x}{2\sqrt{4-x}}$.`,
          String.raw`בקצה התחום $x=4$ בדקו אם הפונקציה עולה או יורדת לפניו.`,
        ],
        solutionSteps: [
          String.raw`עבור $x<4$: $f'(x)=\sqrt{4-x}+x\cdot\frac{-1}{2\sqrt{4-x}}=\frac{2(4-x)-x}{2\sqrt{4-x}}=\frac{8-3x}{2\sqrt{4-x}}$.`,
          String.raw`$f'(x)=0$ כאשר $x=\frac{8}{3}$. המכנה חיובי, ולכן $f'>0$ עבור $x<\frac{8}{3}$ ו-$f'<0$ עבור $\frac{8}{3}<x<4$.`,
          String.raw`ב-$x=\frac{8}{3}$ יש מקסימום: $f\left(\frac{8}{3}\right)=\frac{8}{3}\sqrt{\frac{4}{3}}=\frac{8}{3}\cdot\frac{2}{\sqrt{3}}=\frac{16}{3\sqrt{3}}=\frac{16\sqrt{3}}{9}\approx 3.08$.`,
          String.raw`בתחום $\frac{8}{3}<x\le 4$ הפונקציה יורדת עד $f(4)=0$, ולכן בקצה התחום $(4,0)$ יש מינימום (קצה).`,
        ],
        finalAnswer: String.raw`מקסימום $\left(\frac{8}{3},\frac{16\sqrt{3}}{9}\right)$; מינימום קצה $(4,0)$.`,
      },
      {
        id: '35581-6-3-c',
        label: 'ג',
        statement: String.raw`מצאו את משוואות המשיקים לגרף הפונקציה בנקודות שבהן $x=0$ ו-$x=3$.`,
        hints: [
          String.raw`הציבו בנגזרת מסעיף ב: $f'(0)$ ו-$f'(3)$.`,
          String.raw`$f(3)=3\sqrt{1}=3$.`,
        ],
        solutionSteps: [
          String.raw`בנקודה $(0,0)$: $f'(0)=\frac{8}{2\cdot 2}=2$, ולכן המשיק הוא $y=2x$.`,
          String.raw`בנקודה שבה $x=3$: $f(3)=3\sqrt{1}=3$ ו-$f'(3)=\frac{8-9}{2\cdot 1}=-\frac{1}{2}$.`,
          String.raw`המשיק: $y-3=-\frac{1}{2}(x-3)$, כלומר $y=-\frac{1}{2}x+4.5$.`,
        ],
        finalAnswer: String.raw`$y=2x$ ו-$y=-\frac{1}{2}x+4.5$.`,
      },
      {
        id: '35581-6-3-d',
        label: 'ד',
        statement: String.raw`חשבו את שטח המשולש המוגבל על ידי שני המשיקים מסעיף ג וציר ה-x.`,
        hints: [
          String.raw`מצאו את נקודת החיתוך של שני המשיקים ואת נקודות החיתוך של כל משיק עם ציר x.`,
          String.raw`הבסיס של המשולש נמצא על ציר x, והגובה הוא שיעור ה-y של נקודת החיתוך של המשיקים.`,
        ],
        solutionSteps: [
          String.raw`המשיק $y=2x$ חותך את ציר x ב-$(0,0)$; המשיק $y=-\frac{1}{2}x+4.5$ חותך את ציר x כאשר $x=9$, כלומר ב-$(9,0)$.`,
          String.raw`חיתוך המשיקים: $2x=-\frac{1}{2}x+4.5$, כלומר $2.5x=4.5$, $x=1.8$, $y=3.6$.`,
          String.raw`בסיס המשולש: 9 (מ-$x=0$ עד $x=9$), והגובה: 3.6.`,
          String.raw`$S=\frac{9\cdot 3.6}{2}=16.2$.`,
        ],
        finalAnswer: String.raw`$S=16.2$`,
        numericAnswer: 16.2,
      },
    ],
  },
];
