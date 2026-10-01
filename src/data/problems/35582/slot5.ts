import type { Problem } from '../types';

/**
 * שאלון 35582 – שאלה 5 (חדו״א של פונקציות לוגריתמיות בבסיס e).
 * חקירה, משיק בנקודה על הגרף, קעירות ופיתול, הקשר בין f ל-f′ ושטחים.
 * אינטגרלים של ln x ושל (ln x)² – רק דרך "הראו כי g היא פונקציה קדומה" (ללא אינטגרציה בחלקים).
 */
export const slot5Problems: Problem[] = [
  {
    id: '35582-5-1',
    questionnaire: '35582',
    slot: 5,
    title: 'חקירת x−2ln x ושטח בין הגרף למשיק',
    topicId: 'differential-integral',
    subtopicIds: ['calc-investigation', 'calc-second-derivative', 'calc-antiderivative', 'calc-area'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35582-5-1-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=x-2\ln x$.

מצאו את תחום ההגדרה של $f$, את האסימפטוטה האנכית שלה, ואת נקודת הקיצון שלה וסוגה. הסבירו מדוע הגרף אינו חותך את ציר $x$.`,
        hints: [
          String.raw`$\ln x$ מוגדרת רק עבור $x>0$. כאשר $x\to0^+$: $\ln x\to-\infty$.`,
          String.raw`$f'(x)=1-\frac{2}{x}=\frac{x-2}{x}$.`,
          String.raw`אם ערך המינימום המוחלט חיובי, הפונקציה חיובית בכל תחומה.`,
        ],
        solutionSteps: [
          String.raw`תחום ההגדרה: $x>0$.`,
          String.raw`כאשר $x\to0^+$: $x\to0$ ו-$-2\ln x\to+\infty$, לכן $f(x)\to+\infty$ ו-$x=0$ אסימפטוטה אנכית.`,
          String.raw`$f'(x)=1-\frac2x=\frac{x-2}{x}$; בתחום $x>0$ המכנה חיובי, לכן $f'(x)=0\iff x=2$.`,
          String.raw`עבור $0<x<2$: $f'<0$ (יורדת); עבור $x>2$: $f'>0$ (עולה). לכן ב-$x=2$ מינימום מוחלט: $f(2)=2-2\ln2\approx0.614$.`,
          String.raw`$\ln2<1$ ולכן $2-2\ln2>0$. מכיוון שזה הערך הקטן ביותר של $f$, מתקיים $f(x)>0$ לכל $x>0$ – הגרף אינו חותך את ציר $x$.`,
        ],
        finalAnswer: String.raw`תחום $x>0$; אסימפטוטה $x=0$; מינימום $(2,\,2-2\ln2)\approx(2,\,0.614)$; $f>0$ תמיד`,
        numericAnswer: 0.6137056388801094,
      },
      {
        id: '35582-5-1-b',
        label: 'ב',
        statement: String.raw`הראו כי הפונקציה קעורה כלפי מעלה ($\cup$) בכל תחום הגדרתה, ומצאו את משוואת המשיק לגרף $f$ בנקודה שבה $x=1$. הסבירו מדוע הגרף נמצא מעל המשיק (פרט לנקודת ההשקה).`,
        hints: [
          String.raw`$f''(x)=\frac{2}{x^2}$.`,
          String.raw`$f(1)=1$ ו-$f'(1)=-1$.`,
        ],
        solutionSteps: [
          String.raw`$f''(x)=\left(1-2x^{-1}\right)'=2x^{-2}=\frac{2}{x^2}>0$ לכל $x>0$, ולכן $f$ קעורה כלפי מעלה בכל התחום (ואין לה נקודות פיתול).`,
          String.raw`$f(1)=1-2\ln1=1$, $f'(1)=1-2=-1$.`,
          String.raw`משוואת המשיק: $y-1=-1\cdot(x-1)$, כלומר $y=-x+2$.`,
          String.raw`גרף של פונקציה הקעורה כלפי מעלה נמצא מעל כל משיק שלו, ולכן $f(x)\ge2-x$ בכל התחום, עם שוויון רק ב-$x=1$.`,
        ],
        finalAnswer: String.raw`$f''=\frac{2}{x^2}>0$; משיק: $y=2-x$`,
      },
      {
        id: '35582-5-1-c',
        label: 'ג',
        statement: String.raw`הראו כי $G(x)=x\ln x-x$ היא פונקציה קדומה של $\ln x$, ומצאו פונקציה קדומה של $f$.`,
        hints: [
          String.raw`גזרו את $x\ln x$ לפי כלל המכפלה.`,
          String.raw`$\int x\,dx=\frac{x^2}{2}$, ואת $\int 2\ln x\,dx$ מקבלים מ-$G$.`,
        ],
        solutionSteps: [
          String.raw`$G'(x)=\left(1\cdot\ln x+x\cdot\frac1x\right)-1=\ln x+1-1=\ln x$, לכן $G$ פונקציה קדומה של $\ln x$.`,
          String.raw`פונקציה קדומה של $x$ היא $\frac{x^2}{2}$, ופונקציה קדומה של $2\ln x$ היא $2G(x)=2x\ln x-2x$.`,
          String.raw`לכן $F(x)=\frac{x^2}{2}-2x\ln x+2x$ היא פונקציה קדומה של $f$.`,
          String.raw`בדיקה: $F'(x)=x-2(\ln x+1)+2=x-2\ln x$ ✓.`,
        ],
        finalAnswer: String.raw`$F(x)=\frac{x^2}{2}-2x\ln x+2x+C$`,
      },
      {
        id: '35582-5-1-d',
        label: 'ד',
        statement: String.raw`חשבו את השטח המוגבל על ידי גרף $f$, המשיק מסעיף ב והישר $x=e$.`,
        hints: [
          String.raw`לפי סעיף ב הגרף מעל המשיק, והם נפגשים ב-$x=1$. לכן $S=\int_1^e\left(f(x)-(2-x)\right)dx$.`,
          String.raw`$f(x)-(2-x)=2x-2-2\ln x$; השתמשו בפונקציה הקדומה $G$ מסעיף ג.`,
        ],
        solutionSteps: [
          String.raw`התחום: מנקודת ההשקה $x=1$ עד $x=e$, והגרף מעל המשיק.`,
          String.raw`$f(x)-(2-x)=2x-2-2\ln x$. פונקציה קדומה: $H(x)=x^2-2x-2(x\ln x-x)=x^2-2x\ln x$.`,
          String.raw`$H(e)=e^2-2e\cdot1=e^2-2e$; $H(1)=1-0=1$.`,
          String.raw`$S=H(e)-H(1)=e^2-2e-1\approx0.952$.`,
        ],
        finalAnswer: String.raw`$S=e^2-2e-1\approx0.952$`,
        numericAnswer: 0.9524924420125593,
      },
    ],
  },
  {
    id: '35582-5-2',
    questionnaire: '35582',
    slot: 5,
    title: 'חקירת ln x / x',
    topicId: 'differential-integral',
    subtopicIds: ['calc-investigation', 'calc-derivatives', 'calc-second-derivative', 'calc-area'],
    difficulty: 2,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35582-5-2-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{\ln x}{x}$.

מצאו את תחום ההגדרה של $f$, את נקודות החיתוך עם הצירים ואת האסימפטוטות המקבילות לצירים. היעזרו בכך ש-$\lim_{x\to\infty}\frac{\ln x}{x}=0$.`,
        hints: [
          String.raw`תחום ההגדרה נקבע לפי $\ln x$.`,
          String.raw`כאשר $x\to0^+$: המונה שואף ל-$-\infty$ והמכנה ל-$0^+$.`,
        ],
        solutionSteps: [
          String.raw`תחום ההגדרה: $x>0$, ולכן אין חיתוך עם ציר $y$.`,
          String.raw`חיתוך עם ציר $x$: $\ln x=0\iff x=1$, הנקודה $(1,0)$.`,
          String.raw`כאשר $x\to0^+$: $\ln x\to-\infty$ ו-$x\to0^+$, לכן $f(x)\to-\infty$ – אסימפטוטה אנכית $x=0$.`,
          String.raw`כאשר $x\to\infty$: לפי הנתון $f(x)\to0$ – אסימפטוטה אופקית $y=0$.`,
        ],
        finalAnswer: String.raw`תחום $x>0$; חיתוך $(1,0)$; אסימפטוטות $x=0$ ו-$y=0$`,
      },
      {
        id: '35582-5-2-b',
        label: 'ב',
        statement: String.raw`מצאו את תחומי העלייה והירידה ואת נקודת הקיצון של $f$. מהו ערך הפונקציה בנקודת הקיצון?`,
        hints: [
          String.raw`לפי כלל המנה: $f'(x)=\frac{\frac1x\cdot x-\ln x\cdot1}{x^2}$.`,
          String.raw`$1-\ln x>0\iff x<e$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\frac{1-\ln x}{x^2}$.`,
          String.raw`$f'(x)=0\iff\ln x=1\iff x=e$.`,
          String.raw`עבור $0<x<e$: $f'>0$ (עולה); עבור $x>e$: $f'<0$ (יורדת). לכן ב-$x=e$ מקסימום.`,
          String.raw`$f(e)=\frac{\ln e}{e}=\frac1e\approx0.368$. נקודת מקסימום $\left(e,\frac1e\right)$.`,
        ],
        finalAnswer: String.raw`עולה ב-$0<x<e$, יורדת ב-$x>e$; מקסימום $\left(e,\frac1e\right)$`,
        numericAnswer: 0.36787944117144233,
      },
      {
        id: '35582-5-2-c',
        label: 'ג',
        statement: String.raw`מצאו את שיעור ה-$x$ של נקודת הפיתול של $f$, וקבעו את תחומי הקעירות.`,
        hints: [
          String.raw`רשמו $f'(x)=(1-\ln x)\cdot x^{-2}$ וגזרו לפי כלל המכפלה.`,
          String.raw`$f''(x)=\frac{2\ln x-3}{x^3}$.`,
        ],
        solutionSteps: [
          String.raw`$f''(x)=-\frac1x\cdot x^{-2}+(1-\ln x)\cdot(-2x^{-3})=\frac{-1-2+2\ln x}{x^3}=\frac{2\ln x-3}{x^3}$.`,
          String.raw`$f''(x)=0\iff\ln x=\frac32\iff x=e^{3/2}\approx4.48$.`,
          String.raw`המכנה חיובי בתחום. עבור $0<x<e^{3/2}$: $f''<0$ ($\cap$); עבור $x>e^{3/2}$: $f''>0$ ($\cup$).`,
          String.raw`הסימן מתחלף, ולכן יש פיתול ב-$x=e^{3/2}$, עם $f\left(e^{3/2}\right)=\frac{3}{2}e^{-3/2}\approx0.335$.`,
        ],
        finalAnswer: String.raw`$x=e^{3/2}\approx4.482$; $\cap$ ב-$0<x<e^{3/2}$, $\cup$ ב-$x>e^{3/2}$`,
        numericAnswer: 4.4816890703380645,
      },
      {
        id: '35582-5-2-d',
        label: 'ד',
        statement: String.raw`הראו כי $g(x)=\frac12(\ln x)^2$ היא פונקציה קדומה של $f$, וחשבו את השטח המוגבל על ידי גרף $f$, ציר $x$ והישר $x=e^2$.`,
        hints: [
          String.raw`גזרו את $g$ לפי כלל השרשרת: $\left[(\ln x)^2\right]'=2\ln x\cdot\frac1x$.`,
          String.raw`הגרף חותך את ציר $x$ ב-$x=1$, ועבור $x>1$ מתקיים $f(x)>0$.`,
        ],
        solutionSteps: [
          String.raw`$g'(x)=\frac12\cdot2\ln x\cdot\frac1x=\frac{\ln x}{x}=f(x)$ ✓.`,
          String.raw`השטח בין נקודת החיתוך $x=1$ לבין $x=e^2$; שם $\ln x\ge0$ ולכן $f(x)\ge0$.`,
          String.raw`$S=\int_1^{e^2}f(x)\,dx=g(e^2)-g(1)=\frac12\cdot2^2-\frac12\cdot0^2$.`,
          String.raw`$S=2$.`,
        ],
        finalAnswer: String.raw`$S=2$`,
        numericAnswer: 2,
      },
    ],
  },
  {
    id: '35582-5-3',
    questionnaire: '35582',
    slot: 5,
    title: 'חקירת (ln x)²−2ln x, שטחים של f ושל f′',
    topicId: 'differential-integral',
    subtopicIds: ['calc-investigation', 'calc-second-derivative', 'calc-function-relations', 'calc-antiderivative'],
    difficulty: 3,
    estimatedMinutes: 35,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35582-5-3-a',
        label: 'א',
        statement: String.raw`נתונה הפונקציה $f(x)=(\ln x)^2-2\ln x$.

מצאו את תחום ההגדרה, את נקודות החיתוך עם ציר $x$, את האסימפטוטה האנכית ואת נקודת הקיצון של $f$ וסוגה. מהו הערך המינימלי של $f$?`,
        hints: [
          String.raw`הוציאו גורם משותף: $f(x)=\ln x\,(\ln x-2)$.`,
          String.raw`$f'(x)=2\ln x\cdot\frac1x-\frac2x=\frac{2(\ln x-1)}{x}$.`,
        ],
        solutionSteps: [
          String.raw`תחום ההגדרה: $x>0$.`,
          String.raw`$f(x)=\ln x(\ln x-2)=0\iff\ln x=0$ או $\ln x=2$, כלומר $x=1$ או $x=e^2$. נקודות: $(1,0)$, $(e^2,0)$.`,
          String.raw`כאשר $x\to0^+$: $\ln x\to-\infty$ ו-$\ln x-2\to-\infty$, ולכן $f(x)\to+\infty$ – אסימפטוטה אנכית $x=0$.`,
          String.raw`$f'(x)=\frac{2(\ln x-1)}{x}$, מתאפסת ב-$x=e$. עבור $0<x<e$: $f'<0$; עבור $x>e$: $f'>0$.`,
          String.raw`לכן ב-$x=e$ מינימום: $f(e)=1-2=-1$, הנקודה $(e,-1)$.`,
        ],
        finalAnswer: String.raw`תחום $x>0$; חיתוך $(1,0)$, $(e^2,0)$; אסימפטוטה $x=0$; מינימום $(e,-1)$`,
        numericAnswer: -1,
      },
      {
        id: '35582-5-3-b',
        label: 'ב',
        statement: String.raw`הראו כי לפונקציה יש נקודת פיתול על ציר $x$, ומצאו את משוואת המשיק לגרף $f$ בנקודה זו.`,
        hints: [
          String.raw`גזרו את $f'(x)=\frac{2\ln x-2}{x}$ לפי כלל המנה.`,
          String.raw`$f''(x)=\frac{4-2\ln x}{x^2}$.`,
        ],
        solutionSteps: [
          String.raw`$f''(x)=\frac{\frac2x\cdot x-(2\ln x-2)\cdot1}{x^2}=\frac{4-2\ln x}{x^2}$.`,
          String.raw`$f''(x)=0\iff\ln x=2\iff x=e^2$. עבור $x<e^2$: $f''>0$; עבור $x>e^2$: $f''<0$ – הסימן מתחלף ויש פיתול.`,
          String.raw`$f(e^2)=4-4=0$, ולכן נקודת הפיתול $(e^2,0)$ נמצאת על ציר $x$.`,
          String.raw`שיפוע המשיק: $f'(e^2)=\frac{2(2-1)}{e^2}=\frac{2}{e^2}$.`,
          String.raw`$y-0=\frac{2}{e^2}(x-e^2)$, כלומר $y=\frac{2}{e^2}x-2$.`,
        ],
        finalAnswer: String.raw`פיתול $(e^2,0)$; משיק: $y=\frac{2}{e^2}x-2$`,
      },
      {
        id: '35582-5-3-c',
        label: 'ג',
        statement: String.raw`נתונה הפונקציה $g(x)=x(\ln x)^2-4x\ln x+4x$.

הראו כי $g$ היא פונקציה קדומה של $f$, וחשבו את השטח המוגבל על ידי גרף $f$ וציר $x$.`,
        hints: [
          String.raw`גזרו כל מחובר לפי כלל המכפלה: $\left[x(\ln x)^2\right]'=(\ln x)^2+2\ln x$.`,
          String.raw`בין נקודות החיתוך $x=1$ ו-$x=e^2$ הגרף מתחת לציר $x$ (שם נמצא המינימום $-1$).`,
        ],
        solutionSteps: [
          String.raw`$\left[x(\ln x)^2\right]'=(\ln x)^2+x\cdot2\ln x\cdot\frac1x=(\ln x)^2+2\ln x$.`,
          String.raw`$\left[4x\ln x\right]'=4\ln x+4$, ו-$(4x)'=4$.`,
          String.raw`$g'(x)=(\ln x)^2+2\ln x-4\ln x-4+4=(\ln x)^2-2\ln x=f(x)$ ✓.`,
          String.raw`בתחום $1<x<e^2$: $0<\ln x<2$, לכן $f(x)=\ln x(\ln x-2)<0$.`,
          String.raw`$g(e^2)=4e^2-8e^2+4e^2=0$, $g(1)=0-0+4=4$, ולכן $\int_1^{e^2}f(x)\,dx=0-4=-4$.`,
          String.raw`$S=4$.`,
        ],
        finalAnswer: String.raw`$S=4$`,
        numericAnswer: 4,
      },
      {
        id: '35582-5-3-d',
        label: 'ד',
        statement: String.raw`חשבו את השטח המוגבל על ידי גרף הנגזרת $f'$, ציר $x$ והישר $x=1$.`,
        hints: [
          String.raw`גרף $f'$ חותך את ציר $x$ רק ב-$x=e$, ובתחום $1\le x\le e$ מתקיים $f'(x)\le0$.`,
          String.raw`$f$ היא פונקציה קדומה של $f'$, ולכן $\int_1^e f'(x)\,dx=f(e)-f(1)$.`,
        ],
        solutionSteps: [
          String.raw`מסעיף א, $f'(x)=\frac{2(\ln x-1)}{x}$ מתאפסת רק ב-$x=e$, ולכן התחום הוא $1\le x\le e$.`,
          String.raw`בתחום זה $\ln x\le1$ ולכן $f'(x)\le0$ – גרף הנגזרת מתחת לציר $x$.`,
          String.raw`$\int_1^e f'(x)\,dx=f(e)-f(1)=-1-0=-1$.`,
          String.raw`$S=1$.`,
        ],
        finalAnswer: String.raw`$S=1$`,
        numericAnswer: 1,
      },
    ],
  },
];
