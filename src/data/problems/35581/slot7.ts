import type { Problem } from '../types';

/**
 * שאלון 35581 – שאלה 7 (חדו״א של פונקציות טריגונומטריות).
 * ללא אינטגרלים של פונקציות טריגונומטריות: שטחים מחושבים בגאומטריה אלמנטרית בלבד.
 * המשוואות: ריבועיות ב-sin/cos ופירוק לגורמים בלבד.
 */
export const slot7Problems: Problem[] = [
  {
    id: '35581-7-1',
    questionnaire: '35581',
    slot: 7,
    title: 'חקירת sin x·cos x + cos x ומשולש בין משיק לצירים',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-rules', 'diff-investigation', 'trig-equations', 'diff-tangent-on-graph'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-7-1-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\sin x\cos x+\cos x$ בתחום $0\le x\le 2\pi$.

מצאו את נקודות החיתוך של גרף הפונקציה עם הצירים בתחום הנתון.`,
        hints: [
          String.raw`הוציאו גורם משותף: $f(x)=\cos x(\sin x+1)$.`,
          String.raw`פתרו בנפרד $\cos x=0$ ו-$\sin x=-1$ בתחום $0\le x\le 2\pi$.`,
        ],
        solutionSteps: [
          String.raw`חיתוך עם ציר y: $f(0)=0+1=1$, הנקודה $(0,1)$.`,
          String.raw`חיתוך עם ציר x: $f(x)=\cos x(\sin x+1)=0$.`,
          String.raw`$\cos x=0$ בתחום: $x=\frac{\pi}{2}$ או $x=\frac{3\pi}{2}$.`,
          String.raw`$\sin x=-1$ בתחום: $x=\frac{3\pi}{2}$ (כבר נמצא).`,
          String.raw`נקודות החיתוך עם ציר x: $\left(\frac{\pi}{2},0\right)$ ו-$\left(\frac{3\pi}{2},0\right)$.`,
        ],
        finalAnswer: String.raw`$(0,1)$, $\left(\frac{\pi}{2},0\right)$, $\left(\frac{3\pi}{2},0\right)$.`,
      },
      {
        id: '35581-7-1-b',
        label: 'ב',
        statement: String.raw`מצאו את נקודות הקיצון של הפונקציה בתחום הנתון (כולל קצות התחום) וקבעו את סוגן.`,
        hints: [
          String.raw`$f'(x)=\cos^2x-\sin^2x-\sin x$. החליפו $\cos^2x=1-\sin^2x$ וקבלו ביטוי ריבועי ב-$\sin x$.`,
          String.raw`$f'(x)=-2\sin^2x-\sin x+1=-(2\sin x-1)(\sin x+1)$.`,
          String.raw`שימו לב: $\sin x+1\ge 0$ תמיד, ולכן בנקודה שבה $\sin x=-1$ הנגזרת אינה מחליפה סימן.`,
        ],
        solutionSteps: [
          String.raw`לפי כלל המכפלה: $f'(x)=\cos x\cdot\cos x+\sin x\cdot(-\sin x)-\sin x=\cos^2x-\sin^2x-\sin x$.`,
          String.raw`הצבת $\cos^2x=1-\sin^2x$: $f'(x)=1-2\sin^2x-\sin x=-(2\sin x-1)(\sin x+1)$.`,
          String.raw`$f'(x)=0$: $\sin x=\frac{1}{2}$, כלומר $x=\frac{\pi}{6}$ או $x=\frac{5\pi}{6}$; או $\sin x=-1$, כלומר $x=\frac{3\pi}{2}$.`,
          String.raw`מאחר ש-$\sin x+1\ge 0$, סימן $f'$ הוא סימן $1-2\sin x$: חיובי ב-$0\le x<\frac{\pi}{6}$, שלילי ב-$\frac{\pi}{6}<x<\frac{5\pi}{6}$, חיובי ב-$\frac{5\pi}{6}<x\le 2\pi$ (פרט לאיפוס ב-$\frac{3\pi}{2}$, שאינו קיצון).`,
          String.raw`מקסימום: $f\left(\frac{\pi}{6}\right)=\frac{\sqrt{3}}{2}\left(\frac{1}{2}+1\right)=\frac{3\sqrt{3}}{4}$. מינימום: $f\left(\frac{5\pi}{6}\right)=-\frac{\sqrt{3}}{2}\cdot\frac{3}{2}=-\frac{3\sqrt{3}}{4}$.`,
          String.raw`קצוות: הפונקציה עולה מיד אחרי $x=0$, ולכן $(0,1)$ מינימום קצה; היא עולה עד $x=2\pi$, ולכן $(2\pi,1)$ מקסימום קצה.`,
        ],
        finalAnswer: String.raw`מקסימום $\left(\frac{\pi}{6},\frac{3\sqrt{3}}{4}\right)$, מינימום $\left(\frac{5\pi}{6},-\frac{3\sqrt{3}}{4}\right)$; מינימום קצה $(0,1)$, מקסימום קצה $(2\pi,1)$.`,
      },
      {
        id: '35581-7-1-c',
        label: 'ג',
        statement: String.raw`העבירו משיק לגרף הפונקציה בנקודה $\left(\frac{\pi}{2},0\right)$. חשבו את שטח המשולש שהמשיק יוצר עם הצירים.`,
        hints: [
          String.raw`חשבו את $f'\left(\frac{\pi}{2}\right)$ בעזרת הנגזרת מסעיף ב.`,
          String.raw`מצאו את נקודות החיתוך של המשיק עם שני הצירים.`,
          String.raw`המשולש ישר-זווית, וניצביו על הצירים.`,
        ],
        solutionSteps: [
          String.raw`$f'\left(\frac{\pi}{2}\right)=-(2\cdot 1-1)(1+1)=-2$.`,
          String.raw`משוואת המשיק: $y-0=-2\left(x-\frac{\pi}{2}\right)$, כלומר $y=-2x+\pi$.`,
          String.raw`המשיק חותך את ציר x ב-$\left(\frac{\pi}{2},0\right)$ ואת ציר y ב-$(0,\pi)$.`,
          String.raw`שטח המשולש ישר הזווית: $S=\frac{1}{2}\cdot\frac{\pi}{2}\cdot\pi=\frac{\pi^2}{4}\approx 2.467$.`,
        ],
        finalAnswer: String.raw`$S=\frac{\pi^2}{4}\approx 2.467$`,
        numericAnswer: 2.4674011002723,
      },
    ],
  },
  {
    id: '35581-7-2',
    questionnaire: '35581',
    slot: 7,
    title: 'חקירת cos 2x + 2 sin x',
    topicId: 'trigonometry',
    subtopicIds: ['trig-identities', 'trig-equations', 'diff-investigation', 'diff-tangent-on-graph'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-7-2-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\cos 2x+2\sin x$ בתחום $0\le x\le\pi$.

מצאו את נקודות הקיצון של הפונקציה בתחום (כולל קצות התחום) וקבעו את סוגן.`,
        hints: [
          String.raw`$f'(x)=-2\sin 2x+2\cos x$. השתמשו ב-$\sin 2x=2\sin x\cos x$.`,
          String.raw`$f'(x)=2\cos x(1-2\sin x)$ – פתרו כל גורם בנפרד.`,
          String.raw`ערכו טבלת סימנים עם הנקודות $\frac{\pi}{6}$, $\frac{\pi}{2}$, $\frac{5\pi}{6}$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=-2\sin 2x+2\cos x=-4\sin x\cos x+2\cos x=2\cos x(1-2\sin x)$.`,
          String.raw`$f'(x)=0$: $\cos x=0\Rightarrow x=\frac{\pi}{2}$; או $\sin x=\frac{1}{2}\Rightarrow x=\frac{\pi}{6},\ \frac{5\pi}{6}$.`,
          String.raw`סימן $f'$: ב-$\left(0,\frac{\pi}{6}\right)$ חיובי; ב-$\left(\frac{\pi}{6},\frac{\pi}{2}\right)$ שלילי; ב-$\left(\frac{\pi}{2},\frac{5\pi}{6}\right)$ חיובי ($\cos x<0$ וגם $1-2\sin x<0$); ב-$\left(\frac{5\pi}{6},\pi\right)$ שלילי.`,
          String.raw`ערכים: $f\left(\frac{\pi}{6}\right)=\cos\frac{\pi}{3}+1=\frac{3}{2}$, $f\left(\frac{\pi}{2}\right)=\cos\pi+2=1$, $f\left(\frac{5\pi}{6}\right)=\cos\frac{5\pi}{3}+1=\frac{3}{2}$, $f(0)=1$, $f(\pi)=1$.`,
          String.raw`מקסימום: $\left(\frac{\pi}{6},\frac{3}{2}\right)$ ו-$\left(\frac{5\pi}{6},\frac{3}{2}\right)$. מינימום: $\left(\frac{\pi}{2},1\right)$, ומינימום קצה ב-$(0,1)$ וב-$(\pi,1)$.`,
        ],
        finalAnswer: String.raw`מקסימום $\left(\frac{\pi}{6},\frac{3}{2}\right)$, $\left(\frac{5\pi}{6},\frac{3}{2}\right)$; מינימום $\left(\frac{\pi}{2},1\right)$; מינימום קצה $(0,1)$, $(\pi,1)$.`,
      },
      {
        id: '35581-7-2-b',
        label: 'ב',
        statement: String.raw`מצאו את נקודות החיתוך של גרף הפונקציה עם הישר $y=1$ בתחום הנתון.`,
        hints: [
          String.raw`השתמשו בזהות $\cos 2x=1-2\sin^2x$ כדי לקבל משוואה ב-$\sin x$ בלבד.`,
          String.raw`תתקבל המשוואה $2\sin x(1-\sin x)=0$.`,
        ],
        solutionSteps: [
          String.raw`$\cos 2x+2\sin x=1\iff 1-2\sin^2x+2\sin x=1\iff 2\sin x(1-\sin x)=0$.`,
          String.raw`$\sin x=0$: בתחום $x=0$ או $x=\pi$.`,
          String.raw`$\sin x=1$: בתחום $x=\frac{\pi}{2}$.`,
          String.raw`נקודות החיתוך: $(0,1)$, $\left(\frac{\pi}{2},1\right)$, $(\pi,1)$ – אלו בדיוק נקודות המינימום מסעיף א.`,
        ],
        finalAnswer: String.raw`$(0,1)$, $\left(\frac{\pi}{2},1\right)$, $(\pi,1)$.`,
      },
      {
        id: '35581-7-2-c',
        label: 'ג',
        statement: String.raw`העבירו משיק לגרף הפונקציה בנקודה $(\pi,1)$. חשבו את שטח המשולש המוגבל על ידי המשיק, הישר $y=1$ וציר ה-y.`,
        hints: [
          String.raw`$f'(\pi)=2\cos\pi(1-2\sin\pi)$.`,
          String.raw`מצאו היכן המשיק חותך את ציר y. שני הקדקודים האחרים הם $(\pi,1)$ ו-$(0,1)$.`,
          String.raw`המשולש ישר-זווית: ניצב אחד על הישר $y=1$ והשני על ציר y.`,
        ],
        solutionSteps: [
          String.raw`$f'(\pi)=2\cdot(-1)\cdot(1-0)=-2$.`,
          String.raw`משוואת המשיק: $y-1=-2(x-\pi)$, כלומר $y=-2x+2\pi+1$.`,
          String.raw`המשיק חותך את ציר y ב-$(0,2\pi+1)$; הישר $y=1$ חותך את ציר y ב-$(0,1)$ ואת המשיק ב-$(\pi,1)$.`,
          String.raw`ניצבי המשולש: $\pi$ (על הישר $y=1$) ו-$(2\pi+1)-1=2\pi$ (על ציר y).`,
          String.raw`$S=\frac{1}{2}\cdot\pi\cdot 2\pi=\pi^2\approx 9.870$.`,
        ],
        finalAnswer: String.raw`$S=\pi^2\approx 9.870$`,
        numericAnswer: 9.8696044010894,
      },
      {
        id: '35581-7-2-d',
        label: 'ד',
        statement: String.raw`מצאו את הערך של $k$ שעבורו למשוואה $f(x)=k$ יש בדיוק שני פתרונות בתחום $0\le x\le\pi$.`,
        hints: [
          String.raw`שרטטו סקיצה של הגרף לפי סעיף א: עולה, יורד, עולה, יורד, בין הערכים 1 ו-$\frac{3}{2}$.`,
          String.raw`בדקו כמה פעמים ישר אופקי $y=k$ חותך את הגרף עבור $k=1$, עבור $1<k<\frac{3}{2}$ ועבור $k=\frac{3}{2}$.`,
        ],
        solutionSteps: [
          String.raw`לפי סעיף א, טווח הפונקציה בתחום הוא $1\le f(x)\le\frac{3}{2}$, ולכן עבור $k<1$ או $k>\frac{3}{2}$ אין פתרונות.`,
          String.raw`עבור $k=1$ יש שלושה פתרונות: $0,\ \frac{\pi}{2},\ \pi$ (סעיף ב).`,
          String.raw`עבור $1<k<\frac{3}{2}$ הישר חותך כל אחד מארבעת קטעי המונוטוניות פעם אחת – ארבעה פתרונות.`,
          String.raw`עבור $k=\frac{3}{2}$ הישר נוגע בגרף רק בשתי נקודות המקסימום – בדיוק שני פתרונות.`,
        ],
        finalAnswer: String.raw`$k=\frac{3}{2}$`,
        numericAnswer: 1.5,
      },
    ],
  },
  {
    id: '35581-7-3',
    questionnaire: '35581',
    slot: 7,
    title: 'מנה טריגונומטרית אי-זוגית',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-rules', 'diff-investigation', 'diff-tangent-on-graph', 'trig-identities-angle'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-7-3-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{\sin x}{2-\cos x}$ בתחום $-\pi\le x\le\pi$.

הראו שהפונקציה מוגדרת בכל התחום, ושהיא פונקציה אי-זוגית. מצאו את נקודות החיתוך של גרפה עם הצירים.`,
        hints: [
          String.raw`מה הערך המינימלי של $2-\cos x$?`,
          String.raw`זכרו: $\sin(-x)=-\sin x$ ו-$\cos(-x)=\cos x$.`,
          String.raw`$f(x)=0$ כאשר המונה מתאפס.`,
        ],
        solutionSteps: [
          String.raw`$\cos x\le 1$, ולכן $2-\cos x\ge 1>0$: המכנה לעולם אינו מתאפס, והפונקציה מוגדרת לכל x.`,
          String.raw`$f(-x)=\frac{\sin(-x)}{2-\cos(-x)}=\frac{-\sin x}{2-\cos x}=-f(x)$, ולכן f אי-זוגית (התחום סימטרי סביב 0).`,
          String.raw`$f(x)=0\iff\sin x=0$, ובתחום: $x=-\pi,\ 0,\ \pi$.`,
          String.raw`נקודות החיתוך: $(-\pi,0)$, $(0,0)$, $(\pi,0)$.`,
        ],
        finalAnswer: String.raw`מוגדרת לכל x (המכנה $\ge 1$), אי-זוגית; חיתוך: $(-\pi,0)$, $(0,0)$, $(\pi,0)$.`,
      },
      {
        id: '35581-7-3-b',
        label: 'ב',
        statement: String.raw`מצאו את נקודות הקיצון של הפונקציה בתחום (כולל קצות התחום) וקבעו את סוגן.`,
        hints: [
          String.raw`לפי כלל המנה, המונה של הנגזרת הוא $\cos x(2-\cos x)-\sin x\cdot\sin x$.`,
          String.raw`השתמשו ב-$\sin^2x+\cos^2x=1$ כדי לפשט: $f'(x)=\frac{2\cos x-1}{(2-\cos x)^2}$.`,
          String.raw`אפשר להיעזר באי-זוגיות: נקודות הקיצון סימטריות ביחס לראשית.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\frac{\cos x(2-\cos x)-\sin x\cdot\sin x}{(2-\cos x)^2}=\frac{2\cos x-(\cos^2x+\sin^2x)}{(2-\cos x)^2}=\frac{2\cos x-1}{(2-\cos x)^2}$.`,
          String.raw`$f'(x)=0\iff\cos x=\frac{1}{2}$, ובתחום: $x=\pm\frac{\pi}{3}$.`,
          String.raw`המכנה חיובי, ולכן $f'>0$ כאשר $\cos x>\frac{1}{2}$, כלומר ב-$-\frac{\pi}{3}<x<\frac{\pi}{3}$; ו-$f'<0$ ב-$-\pi\le x<-\frac{\pi}{3}$ וב-$\frac{\pi}{3}<x\le\pi$.`,
          String.raw`$f\left(\frac{\pi}{3}\right)=\frac{\frac{\sqrt{3}}{2}}{2-\frac{1}{2}}=\frac{\sqrt{3}}{3}$: מקסימום $\left(\frac{\pi}{3},\frac{\sqrt{3}}{3}\right)$, ומאי-זוגיות מינימום $\left(-\frac{\pi}{3},-\frac{\sqrt{3}}{3}\right)$.`,
          String.raw`קצוות: הפונקציה יורדת מיד אחרי $-\pi$, ולכן $(-\pi,0)$ מקסימום קצה; היא יורדת עד $\pi$, ולכן $(\pi,0)$ מינימום קצה.`,
        ],
        finalAnswer: String.raw`מקסימום $\left(\frac{\pi}{3},\frac{\sqrt{3}}{3}\right)$, מינימום $\left(-\frac{\pi}{3},-\frac{\sqrt{3}}{3}\right)$; מקסימום קצה $(-\pi,0)$, מינימום קצה $(\pi,0)$.`,
      },
      {
        id: '35581-7-3-c',
        label: 'ג',
        statement: String.raw`העבירו משיקים לגרף הפונקציה בנקודות $(0,0)$ ו-$(\pi,0)$. חשבו את שטח המשולש המוגבל על ידי שני המשיקים וציר ה-x.`,
        hints: [
          String.raw`$f'(0)=\frac{2-1}{(2-1)^2}$ ו-$f'(\pi)=\frac{-2-1}{(2+1)^2}$.`,
          String.raw`מצאו את נקודת החיתוך של שני המשיקים – הגובה של המשולש הוא שיעור ה-y שלה.`,
          String.raw`בסיס המשולש הוא הקטע בין $x=0$ ל-$x=\pi$ על ציר x.`,
        ],
        solutionSteps: [
          String.raw`$f'(0)=\frac{1}{1}=1$, ולכן המשיק בראשית: $y=x$.`,
          String.raw`$f'(\pi)=\frac{-3}{9}=-\frac{1}{3}$, ולכן המשיק ב-$(\pi,0)$: $y=-\frac{1}{3}(x-\pi)$.`,
          String.raw`חיתוך המשיקים: $x=-\frac{1}{3}x+\frac{\pi}{3}\Rightarrow\frac{4}{3}x=\frac{\pi}{3}\Rightarrow x=\frac{\pi}{4}$, ו-$y=\frac{\pi}{4}$.`,
          String.raw`בסיס המשולש על ציר x: מ-$(0,0)$ עד $(\pi,0)$, אורכו $\pi$; הגובה $\frac{\pi}{4}$.`,
          String.raw`$S=\frac{1}{2}\cdot\pi\cdot\frac{\pi}{4}=\frac{\pi^2}{8}\approx 1.234$.`,
        ],
        finalAnswer: String.raw`$S=\frac{\pi^2}{8}\approx 1.234$`,
        numericAnswer: 1.2337005501362,
      },
      {
        id: '35581-7-3-d',
        label: 'ד',
        statement: String.raw`מצאו את כל ערכי $k$ שעבורם למשוואה $f(x)=k$ יש בדיוק שני פתרונות בתחום $-\pi\le x\le\pi$.`,
        hints: [
          String.raw`שרטטו סקיצה לפי סעיפים א–ב: יורדת מ-0 עד $-\frac{\sqrt{3}}{3}$, עולה עד $\frac{\sqrt{3}}{3}$, ויורדת חזרה ל-0.`,
          String.raw`בדקו בנפרד את $k=0$, את $k=\pm\frac{\sqrt{3}}{3}$, ואת הערכים שביניהם.`,
        ],
        solutionSteps: [
          String.raw`טווח הפונקציה בתחום: $-\frac{\sqrt{3}}{3}\le f(x)\le\frac{\sqrt{3}}{3}$; מחוץ לטווח אין פתרונות.`,
          String.raw`עבור $k=0$ יש שלושה פתרונות: $-\pi,\ 0,\ \pi$.`,
          String.raw`עבור $0<k<\frac{\sqrt{3}}{3}$: בתחום $-\pi\le x\le 0$ הפונקציה אי-חיובית ואין פתרון; ב-$0<x<\frac{\pi}{3}$ היא עולה מ-0 ל-$\frac{\sqrt{3}}{3}$ (פתרון אחד), וב-$\frac{\pi}{3}<x<\pi$ יורדת חזרה ל-0 (פתרון נוסף) – בסך הכול שני פתרונות.`,
          String.raw`עבור $k=\frac{\sqrt{3}}{3}$ יש פתרון יחיד ($x=\frac{\pi}{3}$).`,
          String.raw`מאי-זוגיות הפונקציה, עבור $-\frac{\sqrt{3}}{3}<k<0$ יש גם כן בדיוק שני פתרונות, ועבור $k=-\frac{\sqrt{3}}{3}$ פתרון יחיד.`,
        ],
        finalAnswer: String.raw`$-\frac{\sqrt{3}}{3}<k<0$ או $0<k<\frac{\sqrt{3}}{3}$.`,
      },
    ],
  },
];
