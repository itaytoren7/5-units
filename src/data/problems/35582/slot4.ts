import type { Problem } from '../types';

/**
 * שאלון 35582 – שאלה 4 (חדו״א של פונקציות מעריכיות בבסיס e).
 * חקירה מלאה: תחום, אסימפטוטות מקבילות לצירים, קיצון, פיתול, משיק בנקודה על הגרף, הקשר בין f ל-f′ ושטחים.
 * אינטגרלים רק מהסוגים שבתוכנית; היכן שנדרשת פונקציה קדומה של x·eˣ – בדיקה ש-g היא פונקציה קדומה.
 */
export const slot4Problems: Problem[] = [
  {
    id: '35582-4-1',
    questionnaire: '35582',
    slot: 4,
    title: 'חקירת (x−1)eˣ ושטח בעזרת פונקציה קדומה נתונה',
    topicId: 'differential-integral',
    subtopicIds: ['calc-investigation', 'calc-second-derivative', 'calc-area', 'calc-antiderivative'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35582-4-1-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=(x-1)e^x$.

מצאו את תחום ההגדרה של $f$, את נקודות החיתוך של גרף הפונקציה עם הצירים, ואת האסימפטוטות של $f$ המקבילות לצירים (אם יש).

היעזרו בכך ש-$\lim_{x\to-\infty} xe^x=0$.`,
        hints: [
          String.raw`$e^x$ מוגדרת לכל $x$ וחיובית תמיד, ולכן $f(x)=0$ רק כאשר $x-1=0$.`,
          String.raw`רשמו $f(x)=xe^x-e^x$ ובדקו את הגבול כאשר $x\to-\infty$ וכאשר $x\to\infty$.`,
        ],
        solutionSteps: [
          String.raw`$f$ היא מכפלה של פולינום ב-$e^x$, ושתיהן מוגדרות לכל $x$: תחום ההגדרה הוא כל $x$.`,
          String.raw`חיתוך עם ציר $y$: $f(0)=(0-1)e^0=-1$, הנקודה $(0,-1)$.`,
          String.raw`חיתוך עם ציר $x$: $e^x>0$, לכן $f(x)=0\iff x=1$, הנקודה $(1,0)$.`,
          String.raw`אין אסימפטוטה אנכית, כי $f$ רציפה לכל $x$.`,
          String.raw`כאשר $x\to-\infty$: $f(x)=xe^x-e^x\to0-0=0$, ולכן $y=0$ היא אסימפטוטה אופקית (משמאל).`,
          String.raw`כאשר $x\to\infty$: $x-1\to\infty$ ו-$e^x\to\infty$, לכן $f(x)\to\infty$ ואין אסימפטוטה אופקית מימין.`,
        ],
        finalAnswer: String.raw`תחום: כל $x$; חיתוך: $(0,-1)$, $(1,0)$; אסימפטוטה אופקית $y=0$ (כאשר $x\to-\infty$), אין אסימפטוטה אנכית`,
      },
      {
        id: '35582-4-1-b',
        label: 'ב',
        statement: String.raw`מצאו את נקודות הקיצון של $f$ וקבעו את סוגן, ומצאו את תחומי העלייה והירידה של $f$. מהו הערך המינימלי של $f$?`,
        hints: [
          String.raw`גזרו לפי כלל המכפלה: $(uv)'=u'v+uv'$.`,
          String.raw`$f'(x)=xe^x$, והסימן שלה נקבע לפי הסימן של $x$ בלבד.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=1\cdot e^x+(x-1)e^x=xe^x$.`,
          String.raw`$f'(x)=0\iff x=0$ (כי $e^x>0$).`,
          String.raw`עבור $x<0$: $f'(x)<0$ – $f$ יורדת; עבור $x>0$: $f'(x)>0$ – $f$ עולה.`,
          String.raw`לכן ב-$x=0$ יש מינימום: $f(0)=-1$, הנקודה $(0,-1)$. זהו מינימום מוחלט (הפונקציה יורדת עד 0 ועולה אחריו).`,
        ],
        finalAnswer: String.raw`מינימום $(0,-1)$; יורדת ב-$x<0$, עולה ב-$x>0$; הערך המינימלי $-1$`,
        numericAnswer: -1,
      },
      {
        id: '35582-4-1-c',
        label: 'ג',
        statement: String.raw`מצאו את נקודת הפיתול של $f$ ואת תחומי הקעירות. כמו כן, מצאו את משוואת המשיק לגרף $f$ בנקודת החיתוך של הגרף עם ציר $x$.`,
        hints: [
          String.raw`גזרו שוב את $f'(x)=xe^x$ לפי כלל המכפלה.`,
          String.raw`שיפוע המשיק בנקודה $(1,0)$ הוא $f'(1)$.`,
        ],
        solutionSteps: [
          String.raw`$f''(x)=e^x+xe^x=(x+1)e^x$.`,
          String.raw`$f''(x)=0\iff x=-1$. עבור $x<-1$: $f''<0$ – קעורה כלפי מטה ($\cap$); עבור $x>-1$: $f''>0$ – קעורה כלפי מעלה ($\cup$).`,
          String.raw`הסימן מתחלף, לכן יש פיתול ב-$x=-1$: $f(-1)=-2e^{-1}=-\frac{2}{e}\approx-0.736$.`,
          String.raw`המשיק ב-$(1,0)$: שיפוע $m=f'(1)=1\cdot e=e$.`,
          String.raw`$y-0=e(x-1)$, כלומר $y=ex-e$.`,
        ],
        finalAnswer: String.raw`פיתול $\left(-1,-\frac{2}{e}\right)$; $\cap$ ב-$x<-1$, $\cup$ ב-$x>-1$; משיק: $y=ex-e$`,
      },
      {
        id: '35582-4-1-d',
        label: 'ד',
        statement: String.raw`נתונה הפונקציה $g(x)=(x-2)e^x$.

הראו כי $g$ היא פונקציה קדומה של $f$, וחשבו את השטח המוגבל על ידי גרף $f$, ציר $x$ וציר $y$.`,
        hints: [
          String.raw`יש להראות כי $g'(x)=f(x)$ לכל $x$.`,
          String.raw`בתחום $0\le x\le1$ הגרף נמצא מתחת לציר $x$, לכן השטח הוא $-\int_0^1 f(x)\,dx$.`,
        ],
        solutionSteps: [
          String.raw`$g'(x)=1\cdot e^x+(x-2)e^x=(x-1)e^x=f(x)$, ולכן $g$ פונקציה קדומה של $f$.`,
          String.raw`השטח המבוקש נמצא בין $x=0$ (ציר $y$) ל-$x=1$ (נקודת החיתוך עם ציר $x$), ושם $f(x)\le0$.`,
          String.raw`$\int_0^1 f(x)\,dx=g(1)-g(0)=(1-2)e^1-(0-2)e^0=-e+2$.`,
          String.raw`$S=-(2-e)=e-2\approx0.718$.`,
        ],
        finalAnswer: String.raw`$S=e-2\approx0.718$`,
        numericAnswer: 0.7182818284590451,
      },
    ],
  },
  {
    id: '35582-4-2',
    questionnaire: '35582',
    slot: 4,
    title: 'חקירת e²ˣ−4eˣ והקשר בין f ל-f′',
    topicId: 'differential-integral',
    subtopicIds: ['calc-investigation', 'calc-function-relations', 'calc-integrals', 'calc-area'],
    difficulty: 2,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35582-4-2-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=e^{2x}-4e^x$.

מצאו את תחום ההגדרה, את נקודות החיתוך עם הצירים ואת האסימפטוטות המקבילות לצירים.`,
        hints: [
          String.raw`הוציאו גורם משותף: $f(x)=e^x(e^x-4)$.`,
          String.raw`כאשר $x\to-\infty$: $e^x\to0$ וגם $e^{2x}\to0$.`,
        ],
        solutionSteps: [
          String.raw`תחום ההגדרה: כל $x$.`,
          String.raw`ציר $y$: $f(0)=1-4=-3$, הנקודה $(0,-3)$.`,
          String.raw`ציר $x$: $f(x)=e^x(e^x-4)=0$. מאחר ש-$e^x>0$: $e^x=4$, כלומר $x=\ln4$. הנקודה $(\ln4,0)$.`,
          String.raw`כאשר $x\to-\infty$: $f(x)\to0-0=0$, לכן $y=0$ אסימפטוטה אופקית.`,
          String.raw`כאשר $x\to\infty$: $e^x\to\infty$ ו-$e^x-4\to\infty$, לכן $f(x)\to\infty$. אין אסימפטוטות אנכיות (הפונקציה רציפה).`,
        ],
        finalAnswer: String.raw`תחום: כל $x$; חיתוך $(0,-3)$, $(\ln4,0)$; אסימפטוטה $y=0$ כאשר $x\to-\infty$`,
      },
      {
        id: '35582-4-2-b',
        label: 'ב',
        statement: String.raw`מצאו את נקודת הקיצון של $f$ ואת סוגה, ואת נקודת הפיתול של $f$. מהו ערך הפונקציה בנקודת הקיצון?`,
        hints: [
          String.raw`$f'(x)=2e^{2x}-4e^x=2e^x(e^x-2)$.`,
          String.raw`$f''(x)=4e^{2x}-4e^x=4e^x(e^x-1)$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2e^{2x}-4e^x=2e^x(e^x-2)$, ו-$f'(x)=0\iff e^x=2\iff x=\ln2$.`,
          String.raw`עבור $x<\ln2$: $e^x<2$ ולכן $f'<0$ (יורדת); עבור $x>\ln2$: $f'>0$ (עולה). לכן ב-$x=\ln2$ מינימום.`,
          String.raw`$f(\ln2)=e^{2\ln2}-4e^{\ln2}=4-8=-4$. נקודת מינימום $(\ln2,-4)$.`,
          String.raw`$f''(x)=4e^{2x}-4e^x=4e^x(e^x-1)$, מתאפסת ב-$x=0$ ומחליפה שם סימן (שלילית משמאל, חיובית מימין).`,
          String.raw`נקודת פיתול: $(0,f(0))=(0,-3)$.`,
        ],
        finalAnswer: String.raw`מינימום $(\ln2,-4)$; פיתול $(0,-3)$`,
        numericAnswer: -4,
      },
      {
        id: '35582-4-2-c',
        label: 'ג',
        statement: String.raw`חשבו את השטח המוגבל על ידי גרף $f$, ציר $x$ וציר $y$.`,
        hints: [
          String.raw`התחום הוא $0\le x\le\ln4$, ושם $f(x)\le0$.`,
          String.raw`$\int e^{2x}dx=\frac{1}{2}e^{2x}+C$ (אינטגרל של $e^{f(x)}$ עם $f$ ליניארית).`,
        ],
        solutionSteps: [
          String.raw`בין $x=0$ ל-$x=\ln4$ מתקיים $e^x\le4$, ולכן $f(x)=e^x(e^x-4)\le0$ – הגרף מתחת לציר $x$.`,
          String.raw`פונקציה קדומה: $F(x)=\frac12e^{2x}-4e^x$.`,
          String.raw`$F(\ln4)=\frac12\cdot16-4\cdot4=8-16=-8$; $F(0)=\frac12-4=-3.5$.`,
          String.raw`$\int_0^{\ln4}f(x)\,dx=-8-(-3.5)=-4.5$.`,
          String.raw`$S=4.5$.`,
        ],
        finalAnswer: String.raw`$S=4.5$`,
        numericAnswer: 4.5,
      },
      {
        id: '35582-4-2-d',
        label: 'ד',
        statement: String.raw`הראו כי $f'(x)>f(x)$ לכל $x$, וחשבו את השטח המוגבל על ידי הגרפים של $f$ ושל $f'$, ציר $y$ והישר $x=\ln2$.`,
        hints: [
          String.raw`חשבו את ההפרש $f'(x)-f(x)$ ופשטו.`,
          String.raw`השטח בין שני גרפים הוא האינטגרל של (העליונה פחות התחתונה).`,
        ],
        solutionSteps: [
          String.raw`$f'(x)-f(x)=(2e^{2x}-4e^x)-(e^{2x}-4e^x)=e^{2x}$.`,
          String.raw`$e^{2x}>0$ לכל $x$, ולכן $f'(x)>f(x)$ – הגרף של $f'$ נמצא תמיד מעל הגרף של $f$ (ובפרט הגרפים אינם נחתכים).`,
          String.raw`$S=\int_0^{\ln2}\left(f'(x)-f(x)\right)dx=\int_0^{\ln2}e^{2x}\,dx=\left[\frac12e^{2x}\right]_0^{\ln2}$.`,
          String.raw`$=\frac12(e^{2\ln2}-e^0)=\frac12(4-1)=1.5$.`,
        ],
        finalAnswer: String.raw`$f'(x)-f(x)=e^{2x}>0$; $S=1.5$`,
        numericAnswer: 1.5,
      },
    ],
  },
  {
    id: '35582-4-3',
    questionnaire: '35582',
    slot: 4,
    title: 'חקירת eˣ/(x+1) ושטח מתחת לגרף הנגזרת',
    topicId: 'differential-integral',
    subtopicIds: ['calc-investigation', 'calc-derivatives', 'calc-function-relations', 'calc-antiderivative'],
    difficulty: 3,
    estimatedMinutes: 35,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35582-4-3-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{e^x}{x+1}$.

מצאו את תחום ההגדרה של $f$, את נקודות החיתוך עם הצירים ואת האסימפטוטות המקבילות לצירים. ידוע כי $\lim_{x\to\infty}f(x)=\infty$.`,
        hints: [
          String.raw`המכנה מתאפס ב-$x=-1$, והמונה שם שווה ל-$e^{-1}\ne0$.`,
          String.raw`בדקו את סימן המכנה משני צדי $x=-1$. כאשר $x\to-\infty$ המונה שואף ל-0 והמכנה שואף ל-$-\infty$.`,
        ],
        solutionSteps: [
          String.raw`תחום ההגדרה: $x\ne-1$.`,
          String.raw`ציר $y$: $f(0)=\frac{1}{1}=1$, הנקודה $(0,1)$. ציר $x$: $e^x>0$, לכן $f(x)\ne0$ – אין חיתוך עם ציר $x$.`,
          String.raw`ב-$x=-1$ המונה $e^{-1}>0$ והמכנה שואף ל-0: כאשר $x\to-1^+$ המכנה חיובי ו-$f\to+\infty$, כאשר $x\to-1^-$ המכנה שלילי ו-$f\to-\infty$. לכן $x=-1$ אסימפטוטה אנכית.`,
          String.raw`כאשר $x\to-\infty$: $e^x\to0$ ו-$x+1\to-\infty$, לכן $f(x)\to0$ (מערכים שליליים): $y=0$ אסימפטוטה אופקית.`,
          String.raw`כאשר $x\to\infty$ נתון $f\to\infty$, ולכן אין אסימפטוטה אופקית מימין.`,
        ],
        finalAnswer: String.raw`תחום $x\ne-1$; חיתוך $(0,1)$ בלבד; אסימפטוטות: $x=-1$, $y=0$ (כאשר $x\to-\infty$)`,
      },
      {
        id: '35582-4-3-b',
        label: 'ב',
        statement: String.raw`מצאו את תחומי העלייה והירידה של $f$ ואת נקודות הקיצון שלה. מהו ערך הפונקציה בנקודת הקיצון?`,
        hints: [
          String.raw`לפי כלל המנה: $f'(x)=\frac{e^x(x+1)-e^x\cdot1}{(x+1)^2}$.`,
          String.raw`המכנה $(x+1)^2$ חיובי בתחום, ו-$e^x>0$, לכן סימן $f'$ הוא סימן $x$. אל תשכחו את $x=-1$ בטבלת הסימנים.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\frac{e^x(x+1)-e^x}{(x+1)^2}=\frac{xe^x}{(x+1)^2}$.`,
          String.raw`$f'(x)=0\iff x=0$. סימן $f'$ הוא סימן $x$.`,
          String.raw`עבור $x<-1$ ועבור $-1<x<0$: $f'<0$ – $f$ יורדת בכל אחד מהתחומים. עבור $x>0$: $f'>0$ – $f$ עולה.`,
          String.raw`ב-$x=0$ (שבתחום ההגדרה) הנגזרת עוברת משלילית לחיובית: מינימום מקומי $(0,1)$.`,
        ],
        finalAnswer: String.raw`יורדת ב-$x<-1$ וב-$-1<x<0$, עולה ב-$x>0$; מינימום $(0,1)$`,
        numericAnswer: 1,
      },
      {
        id: '35582-4-3-c',
        label: 'ג',
        statement: String.raw`שרטטו סקיצה של גרף $f$, ומצאו את כל ערכי $k$ שעבורם למשוואה $f(x)=k$ אין פתרון.`,
        hints: [
          String.raw`חלקו לשני ענפים: $x<-1$ ו-$x>-1$, ומצאו את טווח הערכים של כל ענף בעזרת הסעיפים הקודמים.`,
          String.raw`בענף השמאלי $f$ יורדת מ-0 (כאשר $x\to-\infty$) ל-$-\infty$ (כאשר $x\to-1^-$).`,
        ],
        solutionSteps: [
          String.raw`ענף שמאלי ($x<-1$): $f$ יורדת, שואפת ל-0 כאשר $x\to-\infty$ ול-$-\infty$ כאשר $x\to-1^-$, ולכן מקבלת בדיוק את הערכים $f<0$.`,
          String.raw`ענף ימני ($x>-1$): $f$ יורדת מ-$+\infty$ (ליד $x=-1$) עד המינימום $f(0)=1$, ואחר כך עולה ל-$\infty$. הערכים: $f\ge1$.`,
          String.raw`לכן קבוצת הערכים של $f$ היא $f<0$ או $f\ge1$.`,
          String.raw`למשוואה $f(x)=k$ אין פתרון בדיוק כאשר $k$ אינו ערך של $f$: $0\le k<1$.`,
        ],
        finalAnswer: String.raw`$0\le k<1$`,
      },
      {
        id: '35582-4-3-d',
        label: 'ד',
        statement: String.raw`חשבו את השטח המוגבל על ידי גרף הנגזרת $f'$, ציר $x$ והישר $x=1$.`,
        hints: [
          String.raw`גרף $f'$ חותך את ציר $x$ ב-$x=0$, ובתחום $0\le x\le1$ מתקיים $f'(x)\ge0$.`,
          String.raw`$f$ היא פונקציה קדומה של $f'$, ולכן $\int_0^1 f'(x)\,dx=f(1)-f(0)$ – אין צורך לחשב אינטגרל של $\frac{xe^x}{(x+1)^2}$ ישירות.`,
        ],
        solutionSteps: [
          String.raw`מסעיף ב $f'(x)=\frac{xe^x}{(x+1)^2}$ מתאפסת רק ב-$x=0$, ולכן השטח הוא בין $x=0$ ל-$x=1$.`,
          String.raw`בתחום זה $f'(x)\ge0$, ולכן $S=\int_0^1 f'(x)\,dx$.`,
          String.raw`$f$ היא פונקציה קדומה של $f'$: $S=f(1)-f(0)=\frac{e}{2}-1$.`,
          String.raw`$S=\frac{e}{2}-1\approx0.359$.`,
        ],
        finalAnswer: String.raw`$S=\frac{e}{2}-1\approx0.359$`,
        numericAnswer: 0.35914091422952255,
      },
    ],
  },
];
