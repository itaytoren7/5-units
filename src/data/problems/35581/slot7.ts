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
  {
    id: '35581-7-4',
    questionnaire: '35581',
    slot: 7,
    title: 'חקירת sin²x − sin x ומשיקים מקבילים',
    topicId: 'differential-calculus',
    subtopicIds: ['trig-equations', 'diff-investigation', 'diff-tangent-on-graph', 'trig-graphs'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-7-4-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\sin^2x-\sin x$ בתחום $0\le x\le 2\pi$.

מצאו את נקודות החיתוך של גרף הפונקציה עם הצירים בתחום הנתון.`,
        hints: [
          String.raw`הציגו את הפונקציה כמכפלה: $f(x)=\sin x(\sin x-1)$.`,
          String.raw`פתרו בנפרד $\sin x=0$ ו-$\sin x=1$ בתחום $0\le x\le 2\pi$.`,
        ],
        solutionSteps: [
          String.raw`חיתוך עם ציר y: $f(0)=0-0=0$, כלומר הגרף עובר דרך הראשית $(0,0)$.`,
          String.raw`חיתוך עם ציר x: $\sin^2x-\sin x=\sin x(\sin x-1)=0$.`,
          String.raw`$\sin x=0$ בתחום: $x=0,\ \pi,\ 2\pi$.`,
          String.raw`$\sin x=1$ בתחום: $x=\frac{\pi}{2}$.`,
          String.raw`נקודות החיתוך עם ציר x: $(0,0)$, $\left(\frac{\pi}{2},0\right)$, $(\pi,0)$, $(2\pi,0)$. שימו לב: כאשר $\sin x\ge 0$ מתקיים $f(x)=\sin x(\sin x-1)\le 0$, ולכן ב-$x=\frac{\pi}{2}$ הגרף נוגע בציר x ואינו חוצה אותו.`,
        ],
        finalAnswer: String.raw`$(0,0)$, $\left(\frac{\pi}{2},0\right)$, $(\pi,0)$, $(2\pi,0)$.`,
      },
      {
        id: '35581-7-4-b',
        label: 'ב',
        statement: String.raw`מצאו את נקודות הקיצון של הפונקציה בתחום הנתון (כולל קצות התחום) וקבעו את סוגן.`,
        hints: [
          String.raw`גזרו לפי כלל השרשרת: $(\sin^2x)'=2\sin x\cos x$.`,
          String.raw`הוציאו גורם משותף: $f'(x)=\cos x(2\sin x-1)$, ופתרו כל גורם בנפרד.`,
          String.raw`בטבלת הסימנים יש חמישה קטעים – בדקו את סימן כל גורם בכל קטע.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2\sin x\cos x-\cos x=\cos x(2\sin x-1)$.`,
          String.raw`$f'(x)=0$: $\cos x=0\Rightarrow x=\frac{\pi}{2},\ \frac{3\pi}{2}$; או $\sin x=\frac{1}{2}\Rightarrow x=\frac{\pi}{6},\ \frac{5\pi}{6}$.`,
          String.raw`סימן $f'$: ב-$\left(0,\frac{\pi}{6}\right)$ שלילי ($\cos x>0$, $2\sin x-1<0$); ב-$\left(\frac{\pi}{6},\frac{\pi}{2}\right)$ חיובי; ב-$\left(\frac{\pi}{2},\frac{5\pi}{6}\right)$ שלילי; ב-$\left(\frac{5\pi}{6},\frac{3\pi}{2}\right)$ חיובי (שני הגורמים שליליים); ב-$\left(\frac{3\pi}{2},2\pi\right)$ שלילי.`,
          String.raw`ערכים: $f\left(\frac{\pi}{6}\right)=\frac{1}{4}-\frac{1}{2}=-\frac{1}{4}$, $f\left(\frac{\pi}{2}\right)=1-1=0$, $f\left(\frac{5\pi}{6}\right)=-\frac{1}{4}$, $f\left(\frac{3\pi}{2}\right)=1+1=2$.`,
          String.raw`מינימום: $\left(\frac{\pi}{6},-\frac{1}{4}\right)$ ו-$\left(\frac{5\pi}{6},-\frac{1}{4}\right)$; מקסימום: $\left(\frac{\pi}{2},0\right)$ ו-$\left(\frac{3\pi}{2},2\right)$.`,
          String.raw`קצוות: הפונקציה יורדת מיד אחרי $x=0$, ולכן $(0,0)$ מקסימום קצה; היא יורדת לקראת $x=2\pi$, ולכן $(2\pi,0)$ מינימום קצה. המקסימום המוחלט הוא $2$ והמינימום המוחלט $-\frac{1}{4}$.`,
        ],
        finalAnswer: String.raw`מינימום $\left(\frac{\pi}{6},-\frac{1}{4}\right)$, $\left(\frac{5\pi}{6},-\frac{1}{4}\right)$; מקסימום $\left(\frac{\pi}{2},0\right)$, $\left(\frac{3\pi}{2},2\right)$; מקסימום קצה $(0,0)$, מינימום קצה $(2\pi,0)$.`,
      },
      {
        id: '35581-7-4-c',
        label: 'ג',
        statement: String.raw`הראו שהמשיקים לגרף הפונקציה בנקודות $(0,0)$ ו-$(2\pi,0)$ מקבילים זה לזה, ומצאו את משוואותיהם.

שני המשיקים האלה, ציר ה-x והמשיק לגרף בנקודת המקסימום $\left(\frac{3\pi}{2},2\right)$ חוסמים מקבילית. חשבו את שטח המקבילית.`,
        hints: [
          String.raw`הציבו $x=0$ ו-$x=2\pi$ בנגזרת מסעיף ב; אפשר גם לנמק באמצעות המחזוריות של $f'$.`,
          String.raw`המשיק בנקודת מקסימום הוא אופקי: $y=2$.`,
          String.raw`שטח מקבילית = בסיס × גובה; הבסיס מונח על ציר x והגובה הוא המרחק בין הישרים $y=0$ ו-$y=2$.`,
        ],
        solutionSteps: [
          String.raw`$f'(0)=\cos 0\,(2\sin 0-1)=-1$ ו-$f'(2\pi)=\cos 2\pi\,(2\sin 2\pi-1)=-1$; השיפועים שווים, ולכן המשיקים מקבילים (באופן כללי $f'(x+2\pi)=f'(x)$, כי הפונקציה מחזורית).`,
          String.raw`משוואת המשיק ב-$(0,0)$: $y=-x$; משוואת המשיק ב-$(2\pi,0)$: $y-0=-(x-2\pi)$, כלומר $y=-x+2\pi$.`,
          String.raw`המשיק בנקודת המקסימום $\left(\frac{3\pi}{2},2\right)$ הוא הישר האופקי $y=2$ (שם $f'=0$).`,
          String.raw`קודקודי המקבילית: על ציר x – $(0,0)$ ו-$(2\pi,0)$; על הישר $y=2$ – חיתוך $y=-x$ עם $y=2$ בנקודה $(-2,2)$, וחיתוך $y=-x+2\pi$ עם $y=2$ בנקודה $(2\pi-2,2)$.`,
          String.raw`הבסיס שעל ציר x אורכו $2\pi$, והגובה (המרחק בין $y=0$ ל-$y=2$) הוא $2$.`,
          String.raw`$S=2\pi\cdot 2=4\pi\approx 12.566$.`,
        ],
        finalAnswer: String.raw`$y=-x$, $y=-x+2\pi$; $S=4\pi\approx 12.566$`,
        numericAnswer: 12.566370614359172,
      },
      {
        id: '35581-7-4-d',
        label: 'ד',
        statement: String.raw`הראו שהמשיק לגרף הפונקציה בנקודה $(\pi,0)$ מאונך לשני המשיקים מסעיף ג, וחשבו בעזרתו את המרחק בין שני המשיקים המקבילים.`,
        hints: [
          String.raw`שני ישרים מאונכים כאשר מכפלת שיפועיהם היא $-1$.`,
          String.raw`מצאו את נקודות החיתוך של המשיק ב-$(\pi,0)$ עם כל אחד משני המשיקים המקבילים.`,
          String.raw`המרחק בין ישרים מקבילים הוא אורך הקטע המאונך שביניהם – השתמשו בנוסחת המרחק בין שתי נקודות.`,
        ],
        solutionSteps: [
          String.raw`$f'(\pi)=\cos\pi\,(2\sin\pi-1)=(-1)(-1)=1$, ולכן משוואת המשיק ב-$(\pi,0)$: $y=x-\pi$.`,
          String.raw`מכפלת השיפועים: $1\cdot(-1)=-1$, ולכן המשיק ב-$(\pi,0)$ מאונך לשני המשיקים המקבילים $y=-x$ ו-$y=-x+2\pi$.`,
          String.raw`חיתוך עם $y=-x$: $x-\pi=-x\Rightarrow x=\frac{\pi}{2}$, הנקודה $P\left(\frac{\pi}{2},-\frac{\pi}{2}\right)$.`,
          String.raw`חיתוך עם $y=-x+2\pi$: $x-\pi=-x+2\pi\Rightarrow x=\frac{3\pi}{2}$, הנקודה $Q\left(\frac{3\pi}{2},\frac{\pi}{2}\right)$.`,
          String.raw`הקטע $PQ$ מאונך לשני המשיקים המקבילים, ולכן אורכו הוא המרחק ביניהם: $PQ=\sqrt{\left(\frac{3\pi}{2}-\frac{\pi}{2}\right)^2+\left(\frac{\pi}{2}+\frac{\pi}{2}\right)^2}=\sqrt{\pi^2+\pi^2}=\pi\sqrt{2}\approx 4.443$.`,
        ],
        finalAnswer: String.raw`$d=\pi\sqrt{2}\approx 4.443$`,
        numericAnswer: 4.442882938158366,
      },
    ],
  },
  {
    id: '35581-7-5',
    questionnaire: '35581',
    slot: 7,
    title: 'חקירת sin 2x − 2 sin x וסימטריה סביב נקודה',
    topicId: 'trigonometry',
    subtopicIds: ['trig-identities', 'trig-equations', 'diff-investigation', 'diff-tangent-on-graph'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-7-5-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\sin 2x-2\sin x$ בתחום $0\le x\le 2\pi$.

מצאו את נקודות החיתוך של גרף הפונקציה עם הצירים.`,
        hints: [
          String.raw`השתמשו בזהות $\sin 2x=2\sin x\cos x$ והוציאו גורם משותף.`,
          String.raw`תתקבל המשוואה $2\sin x(\cos x-1)=0$.`,
        ],
        solutionSteps: [
          String.raw`חיתוך עם ציר y: $f(0)=0-0=0$, הנקודה $(0,0)$.`,
          String.raw`חיתוך עם ציר x: $\sin 2x-2\sin x=2\sin x\cos x-2\sin x=2\sin x(\cos x-1)=0$.`,
          String.raw`$\sin x=0$ בתחום: $x=0,\ \pi,\ 2\pi$.`,
          String.raw`$\cos x=1$ בתחום: $x=0,\ 2\pi$ (פתרונות שכבר נמצאו).`,
          String.raw`נקודות החיתוך: $(0,0)$, $(\pi,0)$, $(2\pi,0)$.`,
        ],
        finalAnswer: String.raw`$(0,0)$, $(\pi,0)$, $(2\pi,0)$.`,
      },
      {
        id: '35581-7-5-b',
        label: 'ב',
        statement: String.raw`מצאו את נקודות הקיצון של הפונקציה בתחום הנתון (כולל קצות התחום) וקבעו את סוגן.`,
        hints: [
          String.raw`$f'(x)=2\cos 2x-2\cos x$. השתמשו בזהות $\cos 2x=2\cos^2x-1$ כדי לקבל ביטוי ריבועי ב-$\cos x$.`,
          String.raw`פרקו לגורמים: $f'(x)=2(2\cos x+1)(\cos x-1)$.`,
          String.raw`הגורם $\cos x-1$ אינו חיובי לעולם, ולכן סימן $f'$ נקבע לפי הגורם $2\cos x+1$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2\cos 2x-2\cos x=2(2\cos^2x-1)-2\cos x=4\cos^2x-2\cos x-2=2(2\cos x+1)(\cos x-1)$.`,
          String.raw`$f'(x)=0$: $\cos x=-\frac{1}{2}\Rightarrow x=\frac{2\pi}{3},\ \frac{4\pi}{3}$; או $\cos x=1\Rightarrow x=0,\ 2\pi$ (קצות התחום).`,
          String.raw`מאחר ש-$\cos x-1\le 0$, סימן $f'$ הפוך לסימן $2\cos x+1$: $f'<0$ כאשר $\cos x>-\frac{1}{2}$, כלומר ב-$\left(0,\frac{2\pi}{3}\right)$ וב-$\left(\frac{4\pi}{3},2\pi\right)$; $f'>0$ ב-$\left(\frac{2\pi}{3},\frac{4\pi}{3}\right)$.`,
          String.raw`$f\left(\frac{2\pi}{3}\right)=\sin\frac{4\pi}{3}-2\sin\frac{2\pi}{3}=-\frac{\sqrt{3}}{2}-\sqrt{3}=-\frac{3\sqrt{3}}{2}$ – מינימום.`,
          String.raw`$f\left(\frac{4\pi}{3}\right)=\sin\frac{8\pi}{3}-2\sin\frac{4\pi}{3}=\frac{\sqrt{3}}{2}+\sqrt{3}=\frac{3\sqrt{3}}{2}$ – מקסימום.`,
          String.raw`קצוות: הפונקציה יורדת מיד אחרי $x=0$, ולכן $(0,0)$ מקסימום קצה; היא יורדת לקראת $x=2\pi$, ולכן $(2\pi,0)$ מינימום קצה (בשתי הנקודות המשיק אופקי).`,
        ],
        finalAnswer: String.raw`מינימום $\left(\frac{2\pi}{3},-\frac{3\sqrt{3}}{2}\right)$, מקסימום $\left(\frac{4\pi}{3},\frac{3\sqrt{3}}{2}\right)$; מקסימום קצה $(0,0)$, מינימום קצה $(2\pi,0)$.`,
      },
      {
        id: '35581-7-5-c',
        label: 'ג',
        statement: String.raw`מצאו את משוואת המשיק לגרף הפונקציה בנקודה $(\pi,0)$.

דרך נקודת המקסימום העבירו ישר המקביל לציר ה-y. חשבו את שטח המשולש המוגבל על ידי המשיק, ציר ה-x והישר הזה.`,
        hints: [
          String.raw`הציבו $x=\pi$ בנגזרת המפורקת לגורמים מסעיף ב.`,
          String.raw`הישר המקביל לציר y דרך נקודת המקסימום הוא $x=\frac{4\pi}{3}$.`,
          String.raw`המשולש ישר-זווית: ניצב אחד על ציר x (מ-$\pi$ עד $\frac{4\pi}{3}$) וניצב שני על הישר $x=\frac{4\pi}{3}$.`,
        ],
        solutionSteps: [
          String.raw`$f'(\pi)=2(2\cos\pi+1)(\cos\pi-1)=2(-1)(-2)=4$.`,
          String.raw`משוואת המשיק: $y-0=4(x-\pi)$, כלומר $y=4x-4\pi$.`,
          String.raw`הישר דרך נקודת המקסימום: $x=\frac{4\pi}{3}$. המשיק חותך אותו בנקודה שבה $y=4\cdot\frac{4\pi}{3}-4\pi=\frac{4\pi}{3}$, כלומר $\left(\frac{4\pi}{3},\frac{4\pi}{3}\right)$.`,
          String.raw`קודקודי המשולש: $(\pi,0)$, $\left(\frac{4\pi}{3},0\right)$, $\left(\frac{4\pi}{3},\frac{4\pi}{3}\right)$; הניצבים: $\frac{4\pi}{3}-\pi=\frac{\pi}{3}$ ו-$\frac{4\pi}{3}$.`,
          String.raw`$S=\frac{1}{2}\cdot\frac{\pi}{3}\cdot\frac{4\pi}{3}=\frac{2\pi^2}{9}\approx 2.193$.`,
        ],
        finalAnswer: String.raw`$y=4x-4\pi$; $S=\frac{2\pi^2}{9}\approx 2.193$`,
        numericAnswer: 2.193245422464302,
      },
      {
        id: '35581-7-5-d',
        label: 'ד',
        statement: String.raw`הוכיחו כי $f(2\pi-x)=-f(x)$ לכל $x$, והסבירו מדוע נובע מכך שהנקודה $(\pi,0)$ היא אמצע הקטע המחבר את נקודת המינימום ונקודת המקסימום.

חשבו את שטח המשולש שקודקודיו הם ראשית הצירים, נקודת המינימום ונקודת המקסימום.`,
        hints: [
          String.raw`השתמשו ב-$\sin(2\pi-\alpha)=-\sin\alpha$ (וגם $\sin(4\pi-2x)=\sin(-2x)$).`,
          String.raw`אם $A$ ו-$B$ הן נקודות הקיצון, בדקו שאמצע $AB$ הוא $(\pi,0)$.`,
          String.raw`התיכון $OM$ (כאשר $M=(\pi,0)$) מחלק את המשולש $OAB$ לשני משולשים שווי-שטח; חשבו את שטח המשולש $OMB$ בעזרת הגובה מ-$B$ אל ציר x.`,
        ],
        solutionSteps: [
          String.raw`$f(2\pi-x)=\sin(4\pi-2x)-2\sin(2\pi-x)=\sin(-2x)-2\sin(-x)=-\sin 2x+2\sin x=-f(x)$.`,
          String.raw`לכן לכל נקודה $(x,y)$ על הגרף גם $(2\pi-x,-y)$ על הגרף: הגרף סימטרי ביחס לנקודה $(\pi,0)$, ובפרט נקודת המינימום $A\left(\frac{2\pi}{3},-\frac{3\sqrt{3}}{2}\right)$ עוברת לנקודת המקסימום $B\left(\frac{4\pi}{3},\frac{3\sqrt{3}}{2}\right)$.`,
          String.raw`בדיקה ישירה: אמצע $AB$ הוא $\left(\frac{\frac{2\pi}{3}+\frac{4\pi}{3}}{2},\ \frac{-\frac{3\sqrt{3}}{2}+\frac{3\sqrt{3}}{2}}{2}\right)=(\pi,0)=M$.`,
          String.raw`במשולש $OAB$ הקטע $OM$ הוא תיכון, ולכן $S_{OAB}=2S_{OMB}$.`,
          String.raw`במשולש $OMB$: הצלע $OM$ מונחת על ציר x ואורכה $\pi$, והגובה אליה הוא המרחק של $B$ מציר x, $\frac{3\sqrt{3}}{2}$. לכן $S_{OMB}=\frac{1}{2}\cdot\pi\cdot\frac{3\sqrt{3}}{2}=\frac{3\sqrt{3}\pi}{4}$.`,
          String.raw`$S_{OAB}=2\cdot\frac{3\sqrt{3}\pi}{4}=\frac{3\sqrt{3}\pi}{2}\approx 8.162$.`,
        ],
        finalAnswer: String.raw`$S=\frac{3\sqrt{3}\pi}{2}\approx 8.162$`,
        numericAnswer: 8.16209713905398,
      },
    ],
  },
  {
    id: '35581-7-6',
    questionnaire: '35581',
    slot: 7,
    title: 'חקירת sin x(1 + cos x) ונקודות פיתול',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-rules', 'diff-second-derivative', 'diff-function-relations', 'trig-equations'],
    difficulty: 3,
    estimatedMinutes: 35,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-7-6-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\sin x\,(1+\cos x)$ בתחום $0\le x\le 2\pi$.

מצאו את נקודות החיתוך של גרף הפונקציה עם הצירים, וקבעו את תחומי החיוביות והשליליות של הפונקציה.`,
        hints: [
          String.raw`מכפלה מתאפסת כאשר אחד הגורמים מתאפס: $\sin x=0$ או $\cos x=-1$.`,
          String.raw`הגורם $1+\cos x$ אינו שלילי לעולם, ולכן סימן $f$ נקבע לפי סימן $\sin x$.`,
        ],
        solutionSteps: [
          String.raw`חיתוך עם ציר y: $f(0)=0\cdot 2=0$, הנקודה $(0,0)$.`,
          String.raw`$f(x)=0\iff\sin x=0$ או $\cos x=-1$. $\sin x=0$ בתחום: $x=0,\ \pi,\ 2\pi$; $\cos x=-1$ בתחום: $x=\pi$.`,
          String.raw`נקודות החיתוך עם ציר x: $(0,0)$, $(\pi,0)$, $(2\pi,0)$.`,
          String.raw`מאחר ש-$1+\cos x\ge 0$ (ושווה לאפס רק ב-$x=\pi$), סימן $f$ הוא סימן $\sin x$: $f>0$ ב-$0<x<\pi$ ו-$f<0$ ב-$\pi<x<2\pi$.`,
        ],
        finalAnswer: String.raw`חיתוך: $(0,0)$, $(\pi,0)$, $(2\pi,0)$; חיובית ב-$0<x<\pi$, שלילית ב-$\pi<x<2\pi$.`,
      },
      {
        id: '35581-7-6-b',
        label: 'ב',
        statement: String.raw`מצאו את נקודות הקיצון של הפונקציה בתחום הנתון (כולל קצות התחום) וקבעו את סוגן. הראו כי בנקודה שבה $x=\pi$ הנגזרת מתאפסת, אך אין שם קיצון.`,
        hints: [
          String.raw`כלל המכפלה: $f'(x)=\cos x(1+\cos x)+\sin x\cdot(-\sin x)$.`,
          String.raw`החליפו $\sin^2x=1-\cos^2x$ וקבלו משוואה ריבועית ב-$\cos x$: $2\cos^2x+\cos x-1=0$.`,
          String.raw`$f'(x)=(2\cos x-1)(\cos x+1)$; הגורם $\cos x+1$ אינו שלילי, ולכן הוא אינו משנה את סימן הנגזרת.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\cos x(1+\cos x)-\sin^2x=\cos x+\cos^2x-(1-\cos^2x)=2\cos^2x+\cos x-1=(2\cos x-1)(\cos x+1)$.`,
          String.raw`$f'(x)=0$: $\cos x=\frac{1}{2}\Rightarrow x=\frac{\pi}{3},\ \frac{5\pi}{3}$; או $\cos x=-1\Rightarrow x=\pi$.`,
          String.raw`מאחר ש-$\cos x+1\ge 0$, סימן $f'$ הוא סימן $2\cos x-1$: חיובי ב-$0\le x<\frac{\pi}{3}$, שלילי ב-$\frac{\pi}{3}<x<\frac{5\pi}{3}$ (פרט לאיפוס ב-$x=\pi$), חיובי ב-$\frac{5\pi}{3}<x\le 2\pi$.`,
          String.raw`משני צידי $x=\pi$ הנגזרת שלילית ואינה מחליפה סימן, ולכן $(\pi,0)$ אינה נקודת קיצון (הפונקציה יורדת דרכה).`,
          String.raw`$f\left(\frac{\pi}{3}\right)=\frac{\sqrt{3}}{2}\left(1+\frac{1}{2}\right)=\frac{3\sqrt{3}}{4}$ – מקסימום; $f\left(\frac{5\pi}{3}\right)=-\frac{\sqrt{3}}{2}\cdot\frac{3}{2}=-\frac{3\sqrt{3}}{4}$ – מינימום.`,
          String.raw`קצוות: הפונקציה עולה מיד אחרי $x=0$, ולכן $(0,0)$ מינימום קצה; היא עולה לקראת $x=2\pi$, ולכן $(2\pi,0)$ מקסימום קצה.`,
        ],
        finalAnswer: String.raw`מקסימום $\left(\frac{\pi}{3},\frac{3\sqrt{3}}{4}\right)$, מינימום $\left(\frac{5\pi}{3},-\frac{3\sqrt{3}}{4}\right)$; מינימום קצה $(0,0)$, מקסימום קצה $(2\pi,0)$; ב-$x=\pi$ אין קיצון.`,
      },
      {
        id: '35581-7-6-c',
        label: 'ג',
        statement: String.raw`מצאו את נקודות הפיתול של הפונקציה בתחום הנתון.`,
        hints: [
          String.raw`גזרו את $f'(x)=2\cos^2x+\cos x-1$ (ולא את הצורה המפורקת).`,
          String.raw`$f''(x)=-\sin x\,(4\cos x+1)$ – פתרו כל גורם בנפרד; המשוואה $\cos x=-\frac{1}{4}$ נפתרת בעזרת מחשבון.`,
          String.raw`בדקו החלפת סימן של $f''$ בכל נקודה חשודה: ב-$x=\pi$ רק הגורם $\sin x$ מחליף סימן, ולכן גם $f''$ מחליפה שם סימן.`,
        ],
        solutionSteps: [
          String.raw`$f''(x)=4\cos x\cdot(-\sin x)-\sin x=-\sin x\,(4\cos x+1)$.`,
          String.raw`$f''(x)=0$: $\sin x=0\Rightarrow x=0,\ \pi,\ 2\pi$; או $\cos x=-\frac{1}{4}\Rightarrow x_1=\arccos\left(-\frac{1}{4}\right)\approx 1.823$ או $x_2=2\pi-x_1\approx 4.460$.`,
          String.raw`סימן $f''$ ב-$(0,\pi)$: $\sin x>0$, ולכן $f''<0$ כאשר $\cos x>-\frac{1}{4}$ (כלומר $0<x<x_1$) ו-$f''>0$ כאשר $x_1<x<\pi$. ב-$(\pi,2\pi)$: $\sin x<0$, ולכן $f''<0$ ב-$\pi<x<x_2$ ו-$f''>0$ ב-$x_2<x<2\pi$.`,
          String.raw`$f''$ מחליפה סימן ב-$x_1$ (מ-$-$ ל-$+$), ב-$\pi$ (מ-$+$ ל-$-$) וב-$x_2$ (מ-$-$ ל-$+$); הנקודות $x=0,\ 2\pi$ הן קצות התחום ואינן נקודות פיתול.`,
          String.raw`שיעורי y: עבור $\cos x_1=-\frac{1}{4}$ מתקיים $\sin x_1=\sqrt{1-\frac{1}{16}}=\frac{\sqrt{15}}{4}$, ולכן $f(x_1)=\frac{\sqrt{15}}{4}\cdot\frac{3}{4}=\frac{3\sqrt{15}}{16}\approx 0.726$; באופן דומה $f(x_2)=-\frac{3\sqrt{15}}{16}$; ו-$f(\pi)=0$.`,
          String.raw`נקודות הפיתול: $\left(x_1,\frac{3\sqrt{15}}{16}\right)\approx(1.823,\,0.726)$, $(\pi,0)$, $\left(x_2,-\frac{3\sqrt{15}}{16}\right)\approx(4.460,\,-0.726)$. בנקודה $(\pi,0)$ המשיק אופקי – ״פיתול אופקי״.`,
        ],
        finalAnswer: String.raw`$\left(\arccos\left(-\frac{1}{4}\right),\frac{3\sqrt{15}}{16}\right)\approx(1.823,\,0.726)$, $(\pi,0)$, $\left(2\pi-\arccos\left(-\frac{1}{4}\right),-\frac{3\sqrt{15}}{16}\right)\approx(4.460,\,-0.726)$.`,
      },
      {
        id: '35581-7-6-d',
        label: 'ד',
        statement: String.raw`נסמן $g(x)=f'(x)$. בלי לגזור שוב, הסבירו באילו נקודות בתחום יש ל-$g$ קיצון, ומצאו את הערך המינימלי של $g(x)$ בתחום $0\le x\le 2\pi$.`,
        hints: [
          String.raw`נקודות הקיצון של $f'$ הן נקודות הפיתול של $f$: שם $g'=f''$ מחליפה סימן.`,
          String.raw`$g$ יורדת כאשר $f''<0$ ועולה כאשר $f''>0$ – השתמשו בטבלת הסימנים מסעיף ג.`,
          String.raw`הציבו $\cos x=-\frac{1}{4}$ ב-$g(x)=(2\cos x-1)(\cos x+1)$; השוו גם לערכי $g$ בקצות התחום.`,
        ],
        solutionSteps: [
          String.raw`$g'(x)=f''(x)$, ולכן נקודות הקיצון של $g$ הן הנקודות שבהן $f''$ מחליפה סימן – נקודות הפיתול של $f$: $x_1$, $\pi$, $x_2$.`,
          String.raw`לפי סעיף ג: $g$ יורדת ב-$(0,x_1)$, עולה ב-$(x_1,\pi)$, יורדת ב-$(\pi,x_2)$ ועולה ב-$(x_2,2\pi)$; לכן ב-$x_1$ וב-$x_2$ ל-$g$ מינימום, וב-$x=\pi$ מקסימום מקומי.`,
          String.raw`ערך המינימום: ב-$x_1$ וב-$x_2$ מתקיים $\cos x=-\frac{1}{4}$, ולכן $g=\left(2\cdot\left(-\frac{1}{4}\right)-1\right)\left(-\frac{1}{4}+1\right)=-\frac{3}{2}\cdot\frac{3}{4}=-\frac{9}{8}$.`,
          String.raw`לשם השוואה: בקצוות $g(0)=g(2\pi)=(2-1)(1+1)=2$, ובמקסימום המקומי $g(\pi)=0$; לכן הערך המינימלי של $g$ בתחום הוא $-\frac{9}{8}$ (והוא מתקבל פעמיים).`,
          String.raw`בדיקה: $g(x)=2\cos^2x+\cos x-1$ היא פרבולה ב-$t=\cos x$ שקודקודה ב-$t=-\frac{1}{4}$, וערכה שם $2\cdot\frac{1}{16}-\frac{1}{4}-1=-\frac{9}{8}$.`,
        ],
        finalAnswer: String.raw`קיצון של $g$ ב-$x_1$, $\pi$, $x_2$; הערך המינימלי $-\frac{9}{8}=-1.125$`,
        numericAnswer: -1.125,
      },
    ],
  },
  {
    id: '35581-7-7',
    questionnaire: '35581',
    slot: 7,
    title: 'חקירת tan x − 2x והגרף של הנגזרת',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-investigation', 'diff-function-relations', 'trig-equations', 'trig-unit-circle'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-7-7-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\tan x-2x$ בתחום $-\frac{\pi}{2}<x<\frac{\pi}{2}$.

הוכיחו שהפונקציה אי-זוגית, מצאו את נקודת החיתוך של גרפה עם ציר ה-y, ותארו את התנהגות הפונקציה כאשר $x$ מתקרב לקצות התחום.`,
        hints: [
          String.raw`$\tan(-x)=-\tan x$.`,
          String.raw`כאשר $x\to\frac{\pi}{2}^-$ מתקיים $\tan x\to+\infty$, ואילו $2x$ נשאר חסום.`,
        ],
        solutionSteps: [
          String.raw`$f(-x)=\tan(-x)-2(-x)=-\tan x+2x=-f(x)$, והתחום סימטרי סביב 0, ולכן $f$ אי-זוגית – הגרף סימטרי ביחס לראשית.`,
          String.raw`$f(0)=\tan 0-0=0$: הגרף חותך את ציר y בראשית $(0,0)$.`,
          String.raw`כאשר $x\to\frac{\pi}{2}^-$: $\tan x\to+\infty$ ו-$2x\to\pi$, ולכן $f(x)\to+\infty$.`,
          String.raw`מאי-זוגיות, כאשר $x\to-\frac{\pi}{2}^+$ מתקיים $f(x)\to-\infty$. לכן הישרים $x=\frac{\pi}{2}$ ו-$x=-\frac{\pi}{2}$ הם אסימפטוטות אנכיות.`,
        ],
        finalAnswer: String.raw`אי-זוגית; חיתוך $(0,0)$; $f\to+\infty$ כאשר $x\to\frac{\pi}{2}^-$ ו-$f\to-\infty$ כאשר $x\to-\frac{\pi}{2}^+$ (אסימפטוטות $x=\pm\frac{\pi}{2}$).`,
      },
      {
        id: '35581-7-7-b',
        label: 'ב',
        statement: String.raw`מצאו את תחומי העלייה והירידה של הפונקציה ואת נקודות הקיצון שלה וקבעו את סוגן.`,
        hints: [
          String.raw`$(\tan x)'=\frac{1}{\cos^2x}$, ולכן $f'(x)=\frac{1}{\cos^2x}-2$.`,
          String.raw`השתמשו בזהות $\frac{1}{\cos^2x}=1+\tan^2x$ וקבלו $f'(x)=\tan^2x-1$.`,
          String.raw`$\tan^2x=1\iff\tan x=1$ או $\tan x=-1$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\frac{1}{\cos^2x}-2=1+\tan^2x-2=\tan^2x-1=(\tan x-1)(\tan x+1)$.`,
          String.raw`$f'(x)=0$: $\tan x=1\Rightarrow x=\frac{\pi}{4}$, או $\tan x=-1\Rightarrow x=-\frac{\pi}{4}$ (אלה הפתרונות היחידים בתחום, כי $\tan$ עולה בו).`,
          String.raw`$f'(x)>0\iff|\tan x|>1\iff\frac{\pi}{4}<|x|<\frac{\pi}{2}$; ו-$f'(x)<0$ ב-$-\frac{\pi}{4}<x<\frac{\pi}{4}$.`,
          String.raw`לכן $f$ עולה ב-$-\frac{\pi}{2}<x<-\frac{\pi}{4}$ וב-$\frac{\pi}{4}<x<\frac{\pi}{2}$, ויורדת ב-$-\frac{\pi}{4}<x<\frac{\pi}{4}$.`,
          String.raw`$f\left(\frac{\pi}{4}\right)=1-\frac{\pi}{2}\approx-0.571$ – מינימום; ומאי-זוגיות $f\left(-\frac{\pi}{4}\right)=\frac{\pi}{2}-1\approx 0.571$ – מקסימום.`,
        ],
        finalAnswer: String.raw`עולה ב-$\left(-\frac{\pi}{2},-\frac{\pi}{4}\right)$ וב-$\left(\frac{\pi}{4},\frac{\pi}{2}\right)$, יורדת ב-$\left(-\frac{\pi}{4},\frac{\pi}{4}\right)$; מקסימום $\left(-\frac{\pi}{4},\frac{\pi}{2}-1\right)$, מינימום $\left(\frac{\pi}{4},1-\frac{\pi}{2}\right)$.`,
      },
      {
        id: '35581-7-7-c',
        label: 'ג',
        statement: String.raw`נסמן $g(x)=f'(x)$.

1. קבעו בעזרת סעיף ב את תחומי החיוביות והשליליות של $g$ ואת נקודות החיתוך של גרף $g$ עם ציר ה-x.
2. מצאו את הערך המינימלי של $g(x)$ בתחום, והסבירו מה המשמעות שלו לגבי גרף $f$.`,
        hints: [
          String.raw`תחומי החיוביות של $f'$ הם תחומי העלייה של $f$, ואפסי $f'$ הם נקודות הקיצון של $f$.`,
          String.raw`$g(x)=\tan^2x-1\ge-1$, ושוויון רק כאשר $\tan x=0$.`,
          String.raw`נקודת הקיצון של $f'$ היא נקודת פיתול של $f$: בדקו ש-$f''(x)=\frac{2\sin x}{\cos^3x}$ מחליפה סימן ב-$x=0$.`,
        ],
        solutionSteps: [
          String.raw`לפי סעיף ב: $g>0$ ב-$\left(-\frac{\pi}{2},-\frac{\pi}{4}\right)$ וב-$\left(\frac{\pi}{4},\frac{\pi}{2}\right)$, $g<0$ ב-$\left(-\frac{\pi}{4},\frac{\pi}{4}\right)$, והגרף של $g$ חותך את ציר x ב-$\left(-\frac{\pi}{4},0\right)$ וב-$\left(\frac{\pi}{4},0\right)$.`,
          String.raw`$g(x)=\tan^2x-1$, ומאחר ש-$\tan^2x\ge 0$ מתקיים $g(x)\ge-1$, עם שוויון רק ב-$x=0$. לכן הערך המינימלי של $g$ הוא $g(0)=-1$.`,
          String.raw`בדיקה בעזרת הנגזרת: $g'(x)=f''(x)=\left((\cos x)^{-2}\right)'=-2(\cos x)^{-3}\cdot(-\sin x)=\frac{2\sin x}{\cos^3x}$. בתחום $\cos x>0$, ולכן $f''<0$ ל-$x<0$ ו-$f''>0$ ל-$x>0$.`,
          String.raw`כלומר $g$ יורדת עד $x=0$ ועולה אחריו – מינימום של $g$ ב-$x=0$, ובאותה נקודה $f''$ מחליפה סימן: $(0,0)$ היא נקודת הפיתול של $f$ (קעורה כלפי מטה משמאל וכלפי מעלה מימין).`,
          String.raw`המשמעות: מבין כל המשיקים לגרף $f$, למשיק בראשית השיפוע הקטן ביותר, $-1$ – שם הפונקציה יורדת ״בתלילות הרבה ביותר״. משוואתו $y=-x$.`,
        ],
        finalAnswer: String.raw`$g>0$ ב-$\frac{\pi}{4}<|x|<\frac{\pi}{2}$, $g<0$ ב-$|x|<\frac{\pi}{4}$, אפסים ב-$\pm\frac{\pi}{4}$; ערך מינימלי $g(0)=-1$ – נקודת הפיתול $(0,0)$ של $f$, שבה המשיק $y=-x$.`,
        numericAnswer: -1,
      },
      {
        id: '35581-7-7-d',
        label: 'ד',
        statement: String.raw`המשיק לגרף $f$ בנקודת הפיתול, המשיק לגרף בנקודת המינימום והאסימפטוטה $x=\frac{\pi}{2}$ חוסמים משולש. חשבו את שטחו.`,
        hints: [
          String.raw`המשיק בנקודת המינימום הוא אופקי: $y=1-\frac{\pi}{2}$.`,
          String.raw`מצאו את נקודות החיתוך של $y=-x$ עם $y=1-\frac{\pi}{2}$ ועם $x=\frac{\pi}{2}$.`,
          String.raw`המשולש ישר-זווית: ניצב אופקי וניצב אנכי (על האסימפטוטה).`,
        ],
        solutionSteps: [
          String.raw`המשיק בנקודת הפיתול: $y=-x$; המשיק בנקודת המינימום: $y=1-\frac{\pi}{2}$.`,
          String.raw`חיתוך $y=-x$ עם $y=1-\frac{\pi}{2}$: $x=\frac{\pi}{2}-1$, הנקודה $\left(\frac{\pi}{2}-1,\,1-\frac{\pi}{2}\right)$.`,
          String.raw`חיתוך $y=-x$ עם $x=\frac{\pi}{2}$: הנקודה $\left(\frac{\pi}{2},-\frac{\pi}{2}\right)$; חיתוך $y=1-\frac{\pi}{2}$ עם $x=\frac{\pi}{2}$: הנקודה $\left(\frac{\pi}{2},1-\frac{\pi}{2}\right)$ – קודקוד הזווית הישרה.`,
          String.raw`הניצב האופקי: $\frac{\pi}{2}-\left(\frac{\pi}{2}-1\right)=1$; הניצב האנכי: $\left(1-\frac{\pi}{2}\right)-\left(-\frac{\pi}{2}\right)=1$.`,
          String.raw`$S=\frac{1}{2}\cdot 1\cdot 1=\frac{1}{2}$.`,
        ],
        finalAnswer: String.raw`$S=\frac{1}{2}$`,
        numericAnswer: 0.5,
      },
    ],
  },
  {
    id: '35581-7-8',
    questionnaire: '35581',
    slot: 7,
    title: 'פונקציה זוגית cos²x + cos x ומשיקים סימטריים',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-intersections-monotonicity', 'trig-identities-angle', 'diff-tangent-on-graph', 'diff-investigation'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-7-8-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\cos^2x+\cos x$ בתחום $-\pi\le x\le\pi$.

הוכיחו ש-$f$ פונקציה זוגית, ומצאו את נקודות החיתוך של גרפה עם הצירים.`,
        hints: [
          String.raw`$\cos(-x)=\cos x$.`,
          String.raw`$f(x)=\cos x(\cos x+1)$ – פתרו $\cos x=0$ ו-$\cos x=-1$ בתחום.`,
        ],
        solutionSteps: [
          String.raw`$f(-x)=\cos^2(-x)+\cos(-x)=\cos^2x+\cos x=f(x)$, והתחום סימטרי, ולכן $f$ זוגית – הגרף סימטרי ביחס לציר y.`,
          String.raw`חיתוך עם ציר y: $f(0)=1+1=2$, הנקודה $(0,2)$.`,
          String.raw`חיתוך עם ציר x: $\cos x(\cos x+1)=0$. $\cos x=0$ בתחום: $x=\pm\frac{\pi}{2}$; $\cos x=-1$ בתחום: $x=\pm\pi$.`,
          String.raw`נקודות החיתוך עם ציר x: $(-\pi,0)$, $\left(-\frac{\pi}{2},0\right)$, $\left(\frac{\pi}{2},0\right)$, $(\pi,0)$.`,
        ],
        finalAnswer: String.raw`זוגית; $(0,2)$, $(\pm\frac{\pi}{2},0)$, $(\pm\pi,0)$.`,
      },
      {
        id: '35581-7-8-b',
        label: 'ב',
        statement: String.raw`מצאו את נקודות הקיצון של הפונקציה בתחום הנתון (כולל קצות התחום) וקבעו את סוגן.`,
        hints: [
          String.raw`$f'(x)=-2\cos x\sin x-\sin x=-\sin x(2\cos x+1)$.`,
          String.raw`בזכות הזוגיות מספיק לחקור את $0\le x\le\pi$ ולשקף.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2\cos x\cdot(-\sin x)-\sin x=-\sin x(2\cos x+1)$.`,
          String.raw`$f'(x)=0$: $\sin x=0\Rightarrow x=0,\ \pm\pi$; או $\cos x=-\frac{1}{2}\Rightarrow x=\pm\frac{2\pi}{3}$.`,
          String.raw`ב-$0<x<\pi$ מתקיים $\sin x>0$, ולכן $f'<0$ כאשר $\cos x>-\frac{1}{2}$ ($0<x<\frac{2\pi}{3}$) ו-$f'>0$ כאשר $\frac{2\pi}{3}<x<\pi$. מהזוגיות: $f$ יורדת ב-$\left(-\pi,-\frac{2\pi}{3}\right)$ ועולה ב-$\left(-\frac{2\pi}{3},0\right)$.`,
          String.raw`$f(0)=2$ – מקסימום; $f\left(\pm\frac{2\pi}{3}\right)=\frac{1}{4}-\frac{1}{2}=-\frac{1}{4}$ – מינימום (בשתי הנקודות).`,
          String.raw`קצוות: $f(\pm\pi)=1-1=0$; הפונקציה עולה לקראת $x=\pi$ ויורדת מיד אחרי $x=-\pi$, ולכן $(\pm\pi,0)$ הן נקודות מקסימום קצה.`,
        ],
        finalAnswer: String.raw`מקסימום $(0,2)$; מינימום $\left(\pm\frac{2\pi}{3},-\frac{1}{4}\right)$; מקסימום קצה $(\pm\pi,0)$.`,
      },
      {
        id: '35581-7-8-c',
        label: 'ג',
        statement: String.raw`מצאו את משוואת המשיק לגרף בנקודה $\left(\frac{\pi}{2},0\right)$, והסיקו ללא חישוב נוסף את משוואת המשיק בנקודה $\left(-\frac{\pi}{2},0\right)$.

חשבו את שטח המשולש המוגבל על ידי שני המשיקים וציר ה-x.`,
        hints: [
          String.raw`$f'\left(\frac{\pi}{2}\right)=-1\cdot(0+1)$.`,
          String.raw`גרף זוגי סימטרי לציר y, ולכן גם המשיק בנקודה הסימטרית הוא שיקוף של המשיק.`,
          String.raw`שני המשיקים נחתכים על ציר y; בסיס המשולש על ציר x.`,
        ],
        solutionSteps: [
          String.raw`$f'\left(\frac{\pi}{2}\right)=-\sin\frac{\pi}{2}\left(2\cos\frac{\pi}{2}+1\right)=-1$, ולכן המשיק: $y=-\left(x-\frac{\pi}{2}\right)=-x+\frac{\pi}{2}$.`,
          String.raw`מהסימטריה לציר y (החלפת $x$ ב-$-x$): המשיק ב-$\left(-\frac{\pi}{2},0\right)$ הוא $y=x+\frac{\pi}{2}$ (ואכן $f'\left(-\frac{\pi}{2}\right)=1$).`,
          String.raw`המשיקים נחתכים ב-$x=0$, בנקודה $\left(0,\frac{\pi}{2}\right)$.`,
          String.raw`בסיס המשולש: מ-$\left(-\frac{\pi}{2},0\right)$ עד $\left(\frac{\pi}{2},0\right)$, אורכו $\pi$; הגובה $\frac{\pi}{2}$.`,
          String.raw`$S=\frac{1}{2}\cdot\pi\cdot\frac{\pi}{2}=\frac{\pi^2}{4}\approx 2.467$.`,
        ],
        finalAnswer: String.raw`$y=-x+\frac{\pi}{2}$, $y=x+\frac{\pi}{2}$; $S=\frac{\pi^2}{4}\approx 2.467$`,
        numericAnswer: 2.4674011002723395,
      },
      {
        id: '35581-7-8-d',
        label: 'ד',
        statement: String.raw`העבירו משיק לגרף בנקודת המקסימום $(0,2)$. חשבו את שטח המשולש המוגבל על ידי משיק זה ושני המשיקים מסעיף ג.`,
        hints: [
          String.raw`המשיק בנקודת המקסימום אופקי: $y=2$. שימו לב ש-$2>\frac{\pi}{2}$.`,
          String.raw`מצאו את נקודות החיתוך של $y=2$ עם שני המשיקים.`,
          String.raw`גובה המשולש הוא ההפרש בין $2$ לבין שיעור ה-y של נקודת החיתוך של שני המשיקים.`,
        ],
        solutionSteps: [
          String.raw`המשיק בנקודת המקסימום: $y=2$ (שם $f'(0)=0$).`,
          String.raw`חיתוך עם $y=-x+\frac{\pi}{2}$: $x=\frac{\pi}{2}-2$; חיתוך עם $y=x+\frac{\pi}{2}$: $x=2-\frac{\pi}{2}$.`,
          String.raw`הבסיס (על הישר $y=2$): $\left(2-\frac{\pi}{2}\right)-\left(\frac{\pi}{2}-2\right)=4-\pi$.`,
          String.raw`הקודקוד השלישי $\left(0,\frac{\pi}{2}\right)$, ולכן הגובה $2-\frac{\pi}{2}=\frac{4-\pi}{2}$.`,
          String.raw`$S=\frac{1}{2}(4-\pi)\cdot\frac{4-\pi}{2}=\frac{(4-\pi)^2}{4}\approx 0.184$.`,
        ],
        finalAnswer: String.raw`$S=\frac{(4-\pi)^2}{4}\approx 0.184$`,
        numericAnswer: 0.18421579309275324,
      },
    ],
  },
  {
    id: '35581-7-9',
    questionnaire: '35581',
    slot: 7,
    title: 'פונקציה עם פרמטרים a sin 2x + bx',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-rules', 'diff-investigation', 'diff-second-derivative', 'diff-tangent-on-graph'],
    difficulty: 3,
    estimatedMinutes: 35,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-7-9-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=a\sin 2x+bx$ בתחום $0\le x\le\pi$ ($a,b$ פרמטרים).

ידוע שלפונקציה יש נקודת קיצון שבה $x=\frac{\pi}{3}$, וכי $f\left(\frac{\pi}{4}\right)=1+\frac{\pi}{4}$. מצאו את $a$ ואת $b$.`,
        hints: [
          String.raw`בנקודת קיצון פנימית $f'\left(\frac{\pi}{3}\right)=0$, כאשר $f'(x)=2a\cos 2x+b$.`,
          String.raw`$\cos\frac{2\pi}{3}=-\frac{1}{2}$ ו-$\sin\frac{\pi}{2}=1$.`,
          String.raw`תתקבל מערכת: $-a+b=0$ ו-$a+\frac{\pi}{4}b=1+\frac{\pi}{4}$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2a\cos 2x+b$, ולכן $f'\left(\frac{\pi}{3}\right)=2a\cos\frac{2\pi}{3}+b=-a+b=0$, כלומר $b=a$.`,
          String.raw`$f\left(\frac{\pi}{4}\right)=a\sin\frac{\pi}{2}+b\cdot\frac{\pi}{4}=a+\frac{\pi}{4}b=1+\frac{\pi}{4}$.`,
          String.raw`הצבת $b=a$: $a\left(1+\frac{\pi}{4}\right)=1+\frac{\pi}{4}$, ולכן $a=1$ ו-$b=1$.`,
          String.raw`בדיקה: $f(x)=\sin 2x+x$, $f'\left(\frac{\pi}{3}\right)=2\cdot\left(-\frac{1}{2}\right)+1=0$ – ובסעיף ב נראה ש-$f'$ אכן מחליפה שם סימן.`,
        ],
        finalAnswer: String.raw`$a=1$, $b=1$, כלומר $f(x)=\sin 2x+x$.`,
      },
      {
        id: '35581-7-9-b',
        label: 'ב',
        statement: String.raw`הציבו $a=1$, $b=1$. מצאו את נקודות הקיצון של הפונקציה בתחום (כולל קצות התחום) וקבעו את סוגן. מהו הערך הגדול ביותר של $f$ בתחום?`,
        hints: [
          String.raw`$f'(x)=2\cos 2x+1=0\iff\cos 2x=-\frac{1}{2}$, כאשר $0\le 2x\le 2\pi$.`,
          String.raw`השוו את ערך המקסימום המקומי לערך הפונקציה בקצה $x=\pi$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2\cos 2x+1=0\iff\cos 2x=-\frac{1}{2}$. מאחר ש-$0\le 2x\le 2\pi$: $2x=\frac{2\pi}{3}$ או $2x=\frac{4\pi}{3}$, כלומר $x=\frac{\pi}{3}$ או $x=\frac{2\pi}{3}$.`,
          String.raw`סימן $f'$: $f'(0)=3>0$, ולכן $f'>0$ ב-$\left[0,\frac{\pi}{3}\right)$; $f'\left(\frac{\pi}{2}\right)=-1<0$, ולכן $f'<0$ ב-$\left(\frac{\pi}{3},\frac{2\pi}{3}\right)$; $f'(\pi)=3>0$, ולכן $f'>0$ ב-$\left(\frac{2\pi}{3},\pi\right]$.`,
          String.raw`מקסימום: $f\left(\frac{\pi}{3}\right)=\sin\frac{2\pi}{3}+\frac{\pi}{3}=\frac{\sqrt{3}}{2}+\frac{\pi}{3}\approx 1.913$.`,
          String.raw`מינימום: $f\left(\frac{2\pi}{3}\right)=\sin\frac{4\pi}{3}+\frac{2\pi}{3}=\frac{2\pi}{3}-\frac{\sqrt{3}}{2}\approx 1.228$.`,
          String.raw`קצוות: $(0,0)$ מינימום קצה (הפונקציה עולה ממנו), $(\pi,\pi)$ מקסימום קצה (הפונקציה עולה אליו).`,
          String.raw`$\pi\approx 3.14>1.913$, ולכן הערך הגדול ביותר של $f$ בתחום הוא $\pi$, בקצה $x=\pi$.`,
        ],
        finalAnswer: String.raw`מקסימום $\left(\frac{\pi}{3},\frac{\pi}{3}+\frac{\sqrt{3}}{2}\right)$, מינימום $\left(\frac{2\pi}{3},\frac{2\pi}{3}-\frac{\sqrt{3}}{2}\right)$, מינימום קצה $(0,0)$, מקסימום קצה $(\pi,\pi)$; הערך הגדול ביותר $\pi$.`,
        numericAnswer: 3.141592653589793,
      },
      {
        id: '35581-7-9-c',
        label: 'ג',
        statement: String.raw`מנקודת המקסימום המקומי $A$ ומנקודת המינימום המקומי $B$ הורידו אנכים לציר ה-x, שעקביהם $A'$ ו-$B'$. חשבו את שטח המרובע $AA'B'B$.`,
        hints: [
          String.raw`המרובע הוא טרפז: $AA'$ ו-$BB'$ מאונכים לציר x ולכן מקבילים.`,
          String.raw`שטח טרפז: $\frac{(AA'+BB')\cdot A'B'}{2}$. שימו לב ששתי נקודות הקיצון נמצאות מעל ציר x.`,
        ],
        solutionSteps: [
          String.raw`$A\left(\frac{\pi}{3},\frac{\pi}{3}+\frac{\sqrt{3}}{2}\right)$, $B\left(\frac{2\pi}{3},\frac{2\pi}{3}-\frac{\sqrt{3}}{2}\right)$, ושני שיעורי ה-y חיוביים ($\frac{2\pi}{3}\approx 2.09>\frac{\sqrt{3}}{2}\approx 0.87$).`,
          String.raw`$AA'\parallel BB'$ (שניהם מאונכים לציר x), ולכן $AA'B'B$ טרפז שבסיסיו $AA'=\frac{\pi}{3}+\frac{\sqrt{3}}{2}$ ו-$BB'=\frac{2\pi}{3}-\frac{\sqrt{3}}{2}$, וגובהו $A'B'=\frac{2\pi}{3}-\frac{\pi}{3}=\frac{\pi}{3}$.`,
          String.raw`סכום הבסיסים: $\frac{\pi}{3}+\frac{\sqrt{3}}{2}+\frac{2\pi}{3}-\frac{\sqrt{3}}{2}=\pi$.`,
          String.raw`$S=\frac{\pi\cdot\frac{\pi}{3}}{2}=\frac{\pi^2}{6}\approx 1.645$.`,
        ],
        finalAnswer: String.raw`$S=\frac{\pi^2}{6}\approx 1.645$`,
        numericAnswer: 1.6449340668482264,
      },
      {
        id: '35581-7-9-d',
        label: 'ד',
        statement: String.raw`מצאו את נקודת הפיתול של הפונקציה בתחום $0<x<\pi$, את משוואת המשיק לגרף בנקודה זו, ואת שטח המשולש שהמשיק יוצר עם הצירים.`,
        hints: [
          String.raw`$f''(x)=-4\sin 2x$; פתרו $\sin 2x=0$ כאשר $0<2x<2\pi$.`,
          String.raw`שיפוע המשיק: $f'\left(\frac{\pi}{2}\right)=2\cos\pi+1$.`,
          String.raw`מצאו את חיתוכי המשיק עם שני הצירים – המשולש ישר-זווית.`,
        ],
        solutionSteps: [
          String.raw`$f''(x)=-4\sin 2x=0\iff\sin 2x=0$; עבור $0<2x<2\pi$ הפתרון היחיד הוא $2x=\pi$, כלומר $x=\frac{\pi}{2}$.`,
          String.raw`ב-$\left(0,\frac{\pi}{2}\right)$ מתקיים $\sin 2x>0$ ולכן $f''<0$; ב-$\left(\frac{\pi}{2},\pi\right)$ מתקיים $\sin 2x<0$ ולכן $f''>0$. $f''$ מחליפה סימן, ונקודת הפיתול היא $\left(\frac{\pi}{2},f\left(\frac{\pi}{2}\right)\right)=\left(\frac{\pi}{2},\frac{\pi}{2}\right)$.`,
          String.raw`$f'\left(\frac{\pi}{2}\right)=2\cos\pi+1=-1$, ולכן המשיק: $y-\frac{\pi}{2}=-\left(x-\frac{\pi}{2}\right)$, כלומר $y=-x+\pi$.`,
          String.raw`המשיק חותך את ציר x ב-$(\pi,0)$ ואת ציר y ב-$(0,\pi)$.`,
          String.raw`$S=\frac{1}{2}\cdot\pi\cdot\pi=\frac{\pi^2}{2}\approx 4.935$.`,
        ],
        finalAnswer: String.raw`פיתול $\left(\frac{\pi}{2},\frac{\pi}{2}\right)$; משיק $y=-x+\pi$; $S=\frac{\pi^2}{2}\approx 4.935$`,
        numericAnswer: 4.934802200544679,
      },
    ],
  },
  {
    id: '35581-7-10',
    questionnaire: '35581',
    slot: 7,
    title: 'חקירת sin x/(1 + cos x) ואסימפטוטות',
    topicId: 'differential-calculus',
    subtopicIds: ['trig-identities', 'diff-investigation', 'diff-tangent-on-graph', 'diff-rules'],
    difficulty: 3,
    estimatedMinutes: 35,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-7-10-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{\sin x}{1+\cos x}$ בתחום $-\pi<x<\pi$.

1. הראו שהפונקציה מוגדרת בכל התחום, ושהיא אי-זוגית.
2. הוכיחו כי $f(x)=\tan\frac{x}{2}$ בתחום.
3. מצאו את נקודות החיתוך עם הצירים ואת האסימפטוטות האנכיות של הגרף.`,
        hints: [
          String.raw`$1+\cos x=0$ רק כאשר $\cos x=-1$, כלומר $x=\pm\pi$ – מחוץ לתחום.`,
          String.raw`הציבו $\alpha=\frac{x}{2}$: $\sin x=2\sin\frac{x}{2}\cos\frac{x}{2}$ ו-$1+\cos x=1+\left(2\cos^2\frac{x}{2}-1\right)=2\cos^2\frac{x}{2}$.`,
          String.raw`כאשר $x\to\pi^-$ מתקיים $\frac{x}{2}\to\frac{\pi}{2}^-$.`,
        ],
        solutionSteps: [
          String.raw`המכנה מתאפס רק כאשר $\cos x=-1$, כלומר $x=\pm\pi$, שאינם בתחום הפתוח; לכן $f$ מוגדרת בכל התחום. $f(-x)=\frac{-\sin x}{1+\cos x}=-f(x)$ – אי-זוגית.`,
          String.raw`לפי נוסחאות הזווית הכפולה עם $\alpha=\frac{x}{2}$: $f(x)=\frac{2\sin\frac{x}{2}\cos\frac{x}{2}}{2\cos^2\frac{x}{2}}=\frac{\sin\frac{x}{2}}{\cos\frac{x}{2}}=\tan\frac{x}{2}$ (בתחום $\cos\frac{x}{2}>0$, כי $-\frac{\pi}{2}<\frac{x}{2}<\frac{\pi}{2}$).`,
          String.raw`$f(x)=0\iff\tan\frac{x}{2}=0\iff\frac{x}{2}=0$ (בתחום $-\frac{\pi}{2}<\frac{x}{2}<\frac{\pi}{2}$), ולכן נקודת החיתוך היחידה עם שני הצירים היא $(0,0)$.`,
          String.raw`כאשר $x\to\pi^-$: $\frac{x}{2}\to\frac{\pi}{2}^-$ ולכן $f(x)\to+\infty$; כאשר $x\to-\pi^+$: $f(x)\to-\infty$. האסימפטוטות האנכיות: $x=\pi$ ו-$x=-\pi$.`,
        ],
        finalAnswer: String.raw`מוגדרת ואי-זוגית; $f(x)=\tan\frac{x}{2}$; חיתוך $(0,0)$; אסימפטוטות $x=\pm\pi$.`,
      },
      {
        id: '35581-7-10-b',
        label: 'ב',
        statement: String.raw`הראו כי $f'(x)=\frac{1}{1+\cos x}$, הסיקו שהפונקציה עולה בכל התחום, ומצאו את השיפוע הקטן ביותר של משיק לגרף הפונקציה. באיזו נקודה מתקבל שיפוע זה, ומה מיוחד בה?`,
        hints: [
          String.raw`כלל המנה: המונה הוא $\cos x(1+\cos x)-\sin x\cdot(-\sin x)$; השתמשו ב-$\sin^2x+\cos^2x=1$.`,
          String.raw`$0<1+\cos x\le 2$ בתחום, ולכן $f'(x)\ge\frac{1}{2}$.`,
          String.raw`נקודת המינימום של $f'$ היא נקודת פיתול של $f$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\frac{\cos x(1+\cos x)+\sin^2x}{(1+\cos x)^2}=\frac{\cos x+\cos^2x+\sin^2x}{(1+\cos x)^2}=\frac{1+\cos x}{(1+\cos x)^2}=\frac{1}{1+\cos x}$.`,
          String.raw`בתחום $1+\cos x>0$, ולכן $f'(x)>0$: הפונקציה עולה בכל התחום ואין לה נקודות קיצון.`,
          String.raw`מאחר ש-$1+\cos x\le 2$, מתקיים $f'(x)\ge\frac{1}{2}$, עם שוויון רק כאשר $\cos x=1$, כלומר $x=0$. השיפוע הקטן ביותר הוא $\frac{1}{2}$, בנקודה $(0,0)$.`,
          String.raw`$f'$ יורדת ב-$(-\pi,0)$ ועולה ב-$(0,\pi)$ (כי $1+\cos x$ עולה ואחר כך יורד), כלומר $f''$ מחליפה סימן ב-$x=0$: הראשית היא נקודת הפיתול של הגרף, והמשיק בה $y=\frac{x}{2}$.`,
        ],
        finalAnswer: String.raw`$f'(x)=\frac{1}{1+\cos x}>0$ – עולה; השיפוע המינימלי $\frac{1}{2}$ בנקודת הפיתול $(0,0)$.`,
        numericAnswer: 0.5,
      },
      {
        id: '35581-7-10-c',
        label: 'ג',
        statement: String.raw`מצאו את הנקודות על גרף הפונקציה שבהן שיפוע המשיק הוא $2$, ואת משוואות המשיקים בנקודות אלה. חשבו את אורך הקטע ששני המשיקים חוצים על ציר ה-y.`,
        hints: [
          String.raw`$\frac{1}{1+\cos x}=2\iff\cos x=-\frac{1}{2}$.`,
          String.raw`$f\left(\frac{2\pi}{3}\right)=\frac{\frac{\sqrt{3}}{2}}{\frac{1}{2}}$; השתמשו באי-זוגיות לנקודה השנייה.`,
          String.raw`חשבו את נקודת החיתוך של כל משיק עם ציר y והפחיתו.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2\iff 1+\cos x=\frac{1}{2}\iff\cos x=-\frac{1}{2}$, ובתחום: $x=\pm\frac{2\pi}{3}$.`,
          String.raw`$f\left(\frac{2\pi}{3}\right)=\frac{\frac{\sqrt{3}}{2}}{1-\frac{1}{2}}=\sqrt{3}$, ומאי-זוגיות $f\left(-\frac{2\pi}{3}\right)=-\sqrt{3}$. הנקודות: $\left(\frac{2\pi}{3},\sqrt{3}\right)$, $\left(-\frac{2\pi}{3},-\sqrt{3}\right)$.`,
          String.raw`המשיק ב-$\left(\frac{2\pi}{3},\sqrt{3}\right)$: $y=2\left(x-\frac{2\pi}{3}\right)+\sqrt{3}=2x-\frac{4\pi}{3}+\sqrt{3}$, וחותך את ציר y ב-$\sqrt{3}-\frac{4\pi}{3}\approx-2.457$.`,
          String.raw`המשיק ב-$\left(-\frac{2\pi}{3},-\sqrt{3}\right)$: $y=2x+\frac{4\pi}{3}-\sqrt{3}$, וחותך את ציר y ב-$\frac{4\pi}{3}-\sqrt{3}\approx 2.457$.`,
          String.raw`אורך הקטע: $\left(\frac{4\pi}{3}-\sqrt{3}\right)-\left(\sqrt{3}-\frac{4\pi}{3}\right)=\frac{8\pi}{3}-2\sqrt{3}\approx 4.913$.`,
        ],
        finalAnswer: String.raw`$\left(\pm\frac{2\pi}{3},\pm\sqrt{3}\right)$; $y=2x-\frac{4\pi}{3}+\sqrt{3}$, $y=2x+\frac{4\pi}{3}-\sqrt{3}$; אורך הקטע $\frac{8\pi}{3}-2\sqrt{3}\approx 4.913$`,
        numericAnswer: 4.913478794435027,
      },
      {
        id: '35581-7-10-d',
        label: 'ד',
        statement: String.raw`העבירו משיק לגרף הפונקציה בנקודה שבה $x=\frac{\pi}{2}$. חשבו את שטח המשולש המוגבל על ידי המשיק, ציר ה-x והאסימפטוטה $x=\pi$.`,
        hints: [
          String.raw`$f\left(\frac{\pi}{2}\right)=1$ ו-$f'\left(\frac{\pi}{2}\right)=\frac{1}{1+0}$.`,
          String.raw`מצאו היכן המשיק חותך את ציר x ואת הישר $x=\pi$.`,
          String.raw`המשולש ישר-זווית, וקודקוד הזווית הישרה הוא $(\pi,0)$.`,
        ],
        solutionSteps: [
          String.raw`$f\left(\frac{\pi}{2}\right)=\frac{1}{1+0}=1$ ו-$f'\left(\frac{\pi}{2}\right)=1$, ולכן המשיק: $y=x-\frac{\pi}{2}+1$.`,
          String.raw`חיתוך עם ציר x: $x=\frac{\pi}{2}-1\approx 0.571$, הנקודה $\left(\frac{\pi}{2}-1,0\right)$.`,
          String.raw`חיתוך עם $x=\pi$: $y=\pi-\frac{\pi}{2}+1=\frac{\pi}{2}+1$, הנקודה $\left(\pi,\frac{\pi}{2}+1\right)$.`,
          String.raw`הניצבים: על ציר x – $\pi-\left(\frac{\pi}{2}-1\right)=\frac{\pi}{2}+1$; על האסימפטוטה – $\frac{\pi}{2}+1$ (משולש ישר-זווית שווה-שוקיים, כי שיפוע המשיק 1).`,
          String.raw`$S=\frac{1}{2}\left(\frac{\pi}{2}+1\right)^2=\frac{(\pi+2)^2}{8}\approx 3.304$.`,
        ],
        finalAnswer: String.raw`$y=x-\frac{\pi}{2}+1$; $S=\frac{(\pi+2)^2}{8}\approx 3.304$`,
        numericAnswer: 3.3044968769310663,
      },
    ],
  },
];
