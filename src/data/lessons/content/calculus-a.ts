import type { LessonContent } from '../types';

/**
 * חדו״א – חלק א: נגזרת, משיק, קיצון, אסימפטוטות, קעירות, חקירות (פולינום, מנה, שורש) ופונקציות טריגונומטריות.
 * שאלון 806 (35581), שאלות 6–8. משיק רק בנקודה שעל הגרף; אסימפטוטות רק מקבילות לצירים;
 * משוואות טריגונומטריות רק מהסוגים שבמיקוד (sin/cos/tan(ax+b)=c, פירוק לגורמים, ריבועית ב-sin/cos).
 * כל הערכים המספריים נבדקים ב-calculus-a.test.ts.
 */
export const calculusAContent: Record<string, LessonContent> = {
  'calc-derivative': {
    intro: String.raw`הנגזרת $f'(x_0)$ מודדת את קצב השינוי הרגעי של הפונקציה, ובאופן גאומטרי – את שיפוע המשיק לגרף בנקודה שבה $x=x_0$. היא מוגדרת כגבול של שיפועי מיתרים, אבל בפועל מחשבים אותה בעזרת כללי גזירה: חזקה, סכום, מכפלה, מנה והרכבה (כלל השרשרת). בשאלון 806 הגזירה היא הכלי הבסיסי של שאלות 6, 7 ו-8 – לפולינומים, למנות, לשורשים ולפונקציות טריגונומטריות – וטעות בנגזרת מפילה את כל השאלה, לכן כדאי לגזור לאט ולפשט את התוצאה.`,
    keyFacts: [
      String.raw`**הגדרה**: $f'(x_0)=\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}$ – הגבול של שיפועי המיתרים, כלומר שיפוע המשיק לגרף בנקודה $(x_0,f(x_0))$.`,
      String.raw`**נגזרות יסודיות**: $(c)'=0$; $(x^n)'=nx^{n-1}$ לכל מעריך (למשל $\left(\frac1x\right)'=-\frac1{x^2}$); $(\sqrt x)'=\frac1{2\sqrt x}$; $(\sin x)'=\cos x$, $(\cos x)'=-\sin x$, $(\tan x)'=\frac1{\cos^2x}$ (ברדיאנים).`,
      String.raw`**מכפלה ומנה**: $(uv)'=u'v+uv'$, $\left(\frac uv\right)'=\frac{u'v-uv'}{v^2}$. קבוע כופל נשאר: $(cf)'=cf'$.`,
      String.raw`**כלל השרשרת**: $\big(f(g(x))\big)'=f'(g(x))\cdot g'(x)$ – נגזרת חיצונית כפול נגזרת פנימית. למשל $\big(g^n\big)'=ng^{n-1}g'$, $\left(\sqrt g\right)'=\frac{g'}{2\sqrt g}$, $\big(\sin(ax+b)\big)'=a\cos(ax+b)$.`,
      String.raw`**טכניקה**: לפני הגזירה כדאי לכתוב שברים ושורשים כחזקות ($\frac{4}{x^2}=4x^{-2}$, $\sqrt x=x^{\frac12}$); אחרי הגזירה – לפשט ולהביא למכנה משותף, כי את הנגזרת נצטרך להשוות לאפס.`,
      String.raw`**גזירות ורציפות**: פונקציה גזירה בנקודה רציפה בה, אך לא להפך – $|x|$ רציפה ב-$x=0$ ואינה גזירה שם (השיפוע משמאל $-1$ ומימין $1$).`,
    ],
    exercises: [
      {
        id: 'calc-derivative-1',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=2x^3-5x^2+4x-7$. מצאו את $f'(x)$, וחשבו את $f'(2)$ ואת $f'(-1)$.`,
        hints: [
          String.raw`גזרו כל מחובר בנפרד לפי $(x^n)'=nx^{n-1}$; הנגזרת של קבוע היא $0$.`,
          String.raw`$f'(x)=6x^2-10x+4$. הציבו בנגזרת (ולא בפונקציה).`,
        ],
        solutionSteps: [
          String.raw`נגזור כל מחובר: $(2x^3)'=6x^2$, $(-5x^2)'=-10x$, $(4x)'=4$, $(-7)'=0$.`,
          String.raw`לכן $f'(x)=6x^2-10x+4$.`,
          String.raw`$f'(2)=6\cdot4-10\cdot2+4=24-20+4=8$.`,
          String.raw`$f'(-1)=6\cdot1-10\cdot(-1)+4=6+10+4=20$.`,
        ],
        finalAnswer: String.raw`$f'(x)=6x^2-10x+4$, $f'(2)=8$, $f'(-1)=20$.`,
        answers: [
          { label: String.raw`$f'(2)$`, value: 8 },
          { label: String.raw`$f'(-1)$`, value: 20 },
        ],
      },
      {
        id: 'calc-derivative-2',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{4}{x^2}+3\sqrt{x}$ (עבור $x>0$). מצאו את $f'(x)$ וחשבו את $f'(4)$.`,
        hints: [
          String.raw`כתבו את הפונקציה כסכום חזקות: $f(x)=4x^{-2}+3x^{\frac12}$.`,
          String.raw`$(x^{-2})'=-2x^{-3}$ ו-$(\sqrt x)'=\frac{1}{2\sqrt x}$.`,
        ],
        solutionSteps: [
          String.raw`נכתוב כחזקות: $f(x)=4x^{-2}+3x^{\frac12}$.`,
          String.raw`לפי נגזרת של חזקה: $f'(x)=4\cdot(-2)x^{-3}+3\cdot\frac12x^{-\frac12}=-\frac{8}{x^3}+\frac{3}{2\sqrt x}$.`,
          String.raw`$f'(4)=-\frac{8}{64}+\frac{3}{2\cdot2}=-\frac18+\frac34=\frac58$.`,
        ],
        finalAnswer: String.raw`$f'(x)=-\frac{8}{x^3}+\frac{3}{2\sqrt x}$, $f'(4)=\frac58=0.625$.`,
        answers: [{ label: String.raw`$f'(4)$`, value: 0.625 }],
      },
      {
        id: 'calc-derivative-3',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{2}{x}$.

א. רשמו את שיפוע המיתר בין הנקודות שעל הגרף שבהן $x=1$ ו-$x=1+h$ ($h\ne0$), ופשטו אותו.

ב. חשבו את $f'(1)$ כגבול של שיפועי המיתרים כאשר $h\to0$, ובדקו את התוצאה בעזרת כללי הגזירה.`,
        hints: [
          String.raw`שיפוע המיתר: $\frac{f(1+h)-f(1)}{h}$.`,
          String.raw`הביאו את $\frac{2}{1+h}-2$ למכנה משותף: $\frac{-2h}{1+h}$.`,
        ],
        solutionSteps: [
          String.raw`$f(1)=2$ ו-$f(1+h)=\frac{2}{1+h}$.`,
          String.raw`שיפוע המיתר: $\frac{f(1+h)-f(1)}{h}=\frac{\frac{2}{1+h}-2}{h}=\frac{2-2(1+h)}{h(1+h)}=\frac{-2h}{h(1+h)}=\frac{-2}{1+h}$.`,
          String.raw`כאשר $h\to0$ המכנה $1+h\to1$, ולכן $f'(1)=\lim_{h\to0}\frac{-2}{1+h}=-2$.`,
          String.raw`בדיקה: $f(x)=2x^{-1}$, $f'(x)=-2x^{-2}=-\frac{2}{x^2}$, ו-$f'(1)=-2$ – אותה תוצאה.`,
        ],
        finalAnswer: String.raw`שיפוע המיתר $\frac{-2}{1+h}$; $f'(1)=-2$.`,
        answers: [{ label: String.raw`$f'(1)$`, value: -2 }],
      },
      {
        id: 'calc-derivative-4',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=(2x-1)\sqrt{x}$. מצאו את $f'(x)$ בעזרת כלל הגזירה של מכפלה, פשטו, וחשבו את $f'(4)$.`,
        hints: [
          String.raw`$u=2x-1$, $v=\sqrt x$, ולכן $u'=2$ ו-$v'=\frac{1}{2\sqrt x}$.`,
          String.raw`$f'(x)=2\sqrt x+\frac{2x-1}{2\sqrt x}$. הביאו למכנה משותף $2\sqrt x$.`,
        ],
        solutionSteps: [
          String.raw`לפי כלל המכפלה $(uv)'=u'v+uv'$ עם $u=2x-1$ ו-$v=\sqrt x$: $f'(x)=2\sqrt x+(2x-1)\cdot\frac{1}{2\sqrt x}$.`,
          String.raw`מכנה משותף: $f'(x)=\frac{2\sqrt x\cdot2\sqrt x+2x-1}{2\sqrt x}=\frac{4x+2x-1}{2\sqrt x}=\frac{6x-1}{2\sqrt x}$.`,
          String.raw`$f'(4)=\frac{24-1}{2\cdot2}=\frac{23}{4}$.`,
        ],
        finalAnswer: String.raw`$f'(x)=\frac{6x-1}{2\sqrt x}$, $f'(4)=\frac{23}{4}=5.75$.`,
        answers: [{ label: String.raw`$f'(4)$`, value: 5.75 }],
      },
      {
        id: 'calc-derivative-5',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{2x+3}{x-1}$. מצאו את $f'(x)$, ומצאו את שיעורי ה-$x$ של הנקודות על הגרף שבהן שיפוע המשיק הוא $-\frac54$.`,
        hints: [
          String.raw`כלל המנה: $\left(\frac uv\right)'=\frac{u'v-uv'}{v^2}$ עם $u=2x+3$ ו-$v=x-1$.`,
          String.raw`המונה מתפשט ל-$-5$. פתרו $\frac{-5}{(x-1)^2}=-\frac54$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\frac{2(x-1)-(2x+3)\cdot1}{(x-1)^2}=\frac{2x-2-2x-3}{(x-1)^2}=\frac{-5}{(x-1)^2}$, עבור $x\ne1$.`,
          String.raw`שיפוע המשיק בנקודה הוא ערך הנגזרת בה: $\frac{-5}{(x-1)^2}=-\frac54\iff(x-1)^2=4$.`,
          String.raw`$x-1=2$ או $x-1=-2$, כלומר $x=3$ או $x=-1$ (שניהם בתחום ההגדרה).`,
        ],
        finalAnswer: String.raw`$f'(x)=\frac{-5}{(x-1)^2}$; $x=-1$ ו-$x=3$.`,
        answers: [
          { label: String.raw`$x$ הקטן`, value: -1 },
          { label: String.raw`$x$ הגדול`, value: 3 },
        ],
      },
      {
        id: 'calc-derivative-6',
        difficulty: 2,
        statement: String.raw`גזרו בעזרת כלל השרשרת וחשבו:

א. $f(x)=(x^2-3)^4$; חשבו את $f'(2)$.

ב. $g(x)=\sqrt{2x+1}$; חשבו את $g'(4)$.

ג. $h(x)=\sin(3x)$; חשבו את $h'\left(\frac{\pi}{9}\right)$.`,
        hints: [
          String.raw`נגזרת חיצונית כפול נגזרת פנימית: $\big(f(g(x))\big)'=f'(g(x))\cdot g'(x)$.`,
          String.raw`$f'(x)=4(x^2-3)^3\cdot2x$, $g'(x)=\frac{1}{2\sqrt{2x+1}}\cdot2$, $h'(x)=\cos(3x)\cdot3$.`,
        ],
        solutionSteps: [
          String.raw`א. הפונקציה החיצונית $u^4$ והפנימית $u=x^2-3$: $f'(x)=4(x^2-3)^3\cdot2x=8x(x^2-3)^3$, ולכן $f'(2)=16\cdot1^3=16$.`,
          String.raw`ב. $g'(x)=\frac{1}{2\sqrt{2x+1}}\cdot2=\frac{1}{\sqrt{2x+1}}$, ולכן $g'(4)=\frac{1}{\sqrt9}=\frac13$.`,
          String.raw`ג. $h'(x)=\cos(3x)\cdot3=3\cos(3x)$, ולכן $h'\left(\frac\pi9\right)=3\cos\frac\pi3=3\cdot\frac12=\frac32$.`,
        ],
        finalAnswer: String.raw`$f'(2)=16$, $g'(4)=\frac13$, $h'\left(\frac\pi9\right)=\frac32$.`,
        answers: [
          { label: String.raw`$f'(2)$`, value: 16 },
          { label: String.raw`$g'(4)$`, value: 1 / 3 },
          { label: String.raw`$h'\left(\frac{\pi}{9}\right)$`, value: 1.5 },
        ],
      },
      {
        id: 'calc-derivative-7',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x}{\sqrt{x^2+1}}$.

א. הראו ש-$f'(x)=\frac{1}{(x^2+1)\sqrt{x^2+1}}$.

ב. חשבו את $f'(\sqrt3)$, והסבירו מדוע הפונקציה עולה לכל $x$.`,
        hints: [
          String.raw`כלל המנה עם $u=x$ ו-$v=\sqrt{x^2+1}$, כאשר לפי כלל השרשרת $v'=\frac{2x}{2\sqrt{x^2+1}}=\frac{x}{\sqrt{x^2+1}}$.`,
          String.raw`במונה יתקבל $\sqrt{x^2+1}-\frac{x^2}{\sqrt{x^2+1}}$; כפלו מונה ומכנה ב-$\sqrt{x^2+1}$.`,
          String.raw`מה הסימן של הנגזרת לכל $x$?`,
        ],
        solutionSteps: [
          String.raw`$x^2+1>0$ לכל $x$, ולכן הפונקציה מוגדרת לכל $x$. לפי כלל השרשרת $\left(\sqrt{x^2+1}\right)'=\frac{2x}{2\sqrt{x^2+1}}=\frac{x}{\sqrt{x^2+1}}$.`,
          String.raw`לפי כלל המנה: $f'(x)=\frac{1\cdot\sqrt{x^2+1}-x\cdot\frac{x}{\sqrt{x^2+1}}}{x^2+1}$.`,
          String.raw`נכפול מונה ומכנה ב-$\sqrt{x^2+1}$: $f'(x)=\frac{(x^2+1)-x^2}{(x^2+1)\sqrt{x^2+1}}=\frac{1}{(x^2+1)\sqrt{x^2+1}}$, כנדרש.`,
          String.raw`$f'(\sqrt3)=\frac{1}{4\cdot\sqrt4}=\frac18$.`,
          String.raw`המונה $1$ והמכנה חיובי לכל $x$, ולכן $f'(x)>0$ לכל $x$ – הפונקציה עולה בכל תחום הגדרתה.`,
        ],
        finalAnswer: String.raw`$f'(\sqrt3)=\frac18$; $f'(x)>0$ לכל $x$, ולכן $f$ עולה לכל $x$.`,
        answers: [{ label: String.raw`$f'(\sqrt3)$`, value: 0.125 }],
      },
      {
        id: 'calc-derivative-8',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{\sin x}{1+\cos x}$ בתחום $-\pi<x<\pi$.

א. הראו ש-$f'(x)=\frac{1}{1+\cos x}$.

ב. חשבו את $f'\left(\frac{\pi}{3}\right)$.

ג. מצאו את ערכי $x$ בתחום שבהם $f'(x)=2$.`,
        hints: [
          String.raw`כלל המנה עם $u=\sin x$ ו-$v=1+\cos x$, כאשר $v'=-\sin x$.`,
          String.raw`במונה יתקבל $\cos x+\cos^2x+\sin^2x$; השתמשו ב-$\sin^2x+\cos^2x=1$ וצמצמו.`,
          String.raw`$\frac{1}{1+\cos x}=2\iff\cos x=-\frac12$.`,
        ],
        solutionSteps: [
          String.raw`בתחום $-\pi<x<\pi$ מתקיים $\cos x>-1$, ולכן המכנה $1+\cos x$ חיובי והפונקציה מוגדרת.`,
          String.raw`לפי כלל המנה: $f'(x)=\frac{\cos x(1+\cos x)-\sin x\cdot(-\sin x)}{(1+\cos x)^2}=\frac{\cos x+\cos^2x+\sin^2x}{(1+\cos x)^2}$.`,
          String.raw`לפי $\sin^2x+\cos^2x=1$ המונה הוא $1+\cos x$, ולאחר צמצום $f'(x)=\frac{1}{1+\cos x}$.`,
          String.raw`ב. $f'\left(\frac\pi3\right)=\frac{1}{1+\frac12}=\frac23$.`,
          String.raw`ג. $\frac{1}{1+\cos x}=2\iff1+\cos x=\frac12\iff\cos x=-\frac12$.`,
          String.raw`הפתרון הכללי: $x=\pm\frac{2\pi}{3}+2\pi k$, ובתחום $-\pi<x<\pi$: $x=-\frac{2\pi}3$ ו-$x=\frac{2\pi}3$.`,
        ],
        finalAnswer: String.raw`$f'\left(\frac\pi3\right)=\frac23$; $x=\pm\frac{2\pi}{3}$.`,
        answers: [
          { label: String.raw`$f'\left(\frac{\pi}{3}\right)$`, value: 2 / 3 },
          { label: String.raw`$x$ השלילי`, value: (-2 * Math.PI) / 3 },
          { label: String.raw`$x$ החיובי`, value: (2 * Math.PI) / 3 },
        ],
      },
    ],
  },

  'calc-tangent': {
    intro: String.raw`המשיק לגרף בנקודה $(x_0,f(x_0))$ הוא הישר שעובר בנקודה ושיפועו $f'(x_0)$. בבגרות מבקשים משוואת משיק בנקודה נתונה, משיק בעל שיפוע נתון (מקביל או ניצב לישר נתון, או אופקי), ולעתים את השטח שהמשיק יוצר עם הצירים או את נקודת החיתוך הנוספת שלו עם הגרף. **לפי המיקוד** נדרש רק משיק בנקודה שעל הגרף; משיק שעובר דרך נקודה שמחוץ לגרף אינו בבחינה. המשיק מופיע כסעיף בשאלות 6 ו-7.`,
    keyFacts: [
      String.raw`**משוואת המשיק** בנקודה $(x_0,y_0)$ שעל הגרף: $y-y_0=f'(x_0)(x-x_0)$, כאשר $y_0=f(x_0)$.`,
      String.raw`**שלושה צעדים**: (1) $y_0=f(x_0)$ – מציבים בפונקציה; (2) $m=f'(x_0)$ – מציבים בנגזרת; (3) מציבים בנוסחת הישר. טעות נפוצה: להציב את $x_0$ בנגזרת כדי לקבל את $y_0$.`,
      String.raw`**שיפוע נתון**: משיק מקביל לישר $y=mx+b$ – פותרים $f'(x)=m$; משיק ניצב לו – $f'(x)=-\frac1m$; משיק אופקי – $f'(x)=0$. לכל פתרון מחשבים $y_0=f(x)$.`,
      String.raw`**חיתוך המשיק עם הגרף**: פותרים $f(x)=mx+b$. נקודת ההשקה היא שורש כפול של המשוואה – וזה עוזר לפרק פולינום לגורמים.`,
      String.raw`**משולש עם הצירים**: אם המשיק חותך את הצירים ב-$(a,0)$ וב-$(0,b)$, שטח המשולש שהוא יוצר עם הצירים הוא $S=\frac12|a|\cdot|b|$.`,
    ],
    exercises: [
      {
        id: 'calc-tangent-1',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=x^2-4x+5$. מצאו את משוואת המשיק לגרף הפונקציה בנקודה שבה $x=3$.`,
        hints: [
          String.raw`חשבו את $f(3)$ כדי לקבל את נקודת ההשקה, ואת $f'(3)$ כדי לקבל את השיפוע.`,
          String.raw`$y-y_0=f'(x_0)(x-x_0)$.`,
        ],
        solutionSteps: [
          String.raw`נקודת ההשקה: $f(3)=9-12+5=2$, כלומר $(3,2)$.`,
          String.raw`$f'(x)=2x-4$, ולכן שיפוע המשיק $f'(3)=2$.`,
          String.raw`משוואת המשיק: $y-2=2(x-3)$, כלומר $y=2x-4$.`,
        ],
        finalAnswer: String.raw`$y=2x-4$`,
        answers: [
          { label: String.raw`שיפוע המשיק $m$`, value: 2 },
          { label: String.raw`המקדם החופשי $b$ (במשוואה $y=mx+b$)`, value: -4 },
        ],
      },
      {
        id: 'calc-tangent-2',
        difficulty: 1,
        statement: String.raw`מצאו את משוואת המשיק לגרף הפונקציה $f(x)=\sqrt{x}$ בנקודה שבה $x=4$.`,
        hints: [
          String.raw`$f(4)=2$, ו-$f'(x)=\frac{1}{2\sqrt x}$.`,
          String.raw`הציבו בנוסחה $y-y_0=f'(x_0)(x-x_0)$.`,
        ],
        solutionSteps: [
          String.raw`נקודת ההשקה: $f(4)=\sqrt4=2$, כלומר $(4,2)$.`,
          String.raw`$f'(x)=\frac{1}{2\sqrt x}$, ולכן $f'(4)=\frac{1}{4}$.`,
          String.raw`משוואת המשיק: $y-2=\frac14(x-4)$, כלומר $y=\frac14x+1$.`,
        ],
        finalAnswer: String.raw`$y=\frac14x+1$`,
        answers: [
          { label: String.raw`שיפוע המשיק $m$`, value: 0.25 },
          { label: String.raw`המקדם החופשי $b$ (במשוואה $y=mx+b$)`, value: 1 },
        ],
      },
      {
        id: 'calc-tangent-3',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-3x^2+2$. מצאו את משוואות המשיקים לגרף הפונקציה המקבילים לישר $y=9x-1$.`,
        hints: [
          String.raw`ישרים מקבילים – שיפועים שווים. לכן שיפוע המשיק הוא $9$.`,
          String.raw`פתרו $f'(x)=3x^2-6x=9$.`,
          String.raw`לכל פתרון חשבו את $f(x)$ ורשמו משוואת ישר ששיפועו $9$.`,
        ],
        solutionSteps: [
          String.raw`משיק המקביל לישר $y=9x-1$ הוא בעל שיפוע $9$, ולכן מחפשים נקודות שבהן $f'(x)=9$.`,
          String.raw`$f'(x)=3x^2-6x$, ו-$3x^2-6x=9\iff x^2-2x-3=0\iff(x-3)(x+1)=0$, כלומר $x=3$ או $x=-1$.`,
          String.raw`עבור $x=-1$: $f(-1)=-1-3+2=-2$, והמשיק: $y+2=9(x+1)$, כלומר $y=9x+7$.`,
          String.raw`עבור $x=3$: $f(3)=27-27+2=2$, והמשיק: $y-2=9(x-3)$, כלומר $y=9x-25$.`,
        ],
        finalAnswer: String.raw`$y=9x+7$ (בנקודה $(-1,-2)$) ו-$y=9x-25$ (בנקודה $(3,2)$).`,
        answers: [
          { label: String.raw`$x$ של נקודת ההשקה השמאלית`, value: -1 },
          { label: String.raw`$x$ של נקודת ההשקה הימנית`, value: 3 },
          { label: 'המקדם החופשי של המשיק השמאלי', value: 7 },
          { label: 'המקדם החופשי של המשיק הימני', value: -25 },
        ],
      },
      {
        id: 'calc-tangent-4',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x+1}{x-1}$. העבירו משיק לגרף הפונקציה בנקודת החיתוך שלו עם ציר $y$.

א. מצאו את משוואת המשיק.

ב. חשבו את שטח המשולש שהמשיק יוצר עם הצירים.`,
        hints: [
          String.raw`נקודת החיתוך עם ציר $y$ היא הנקודה שבה $x=0$.`,
          String.raw`$f'(x)=\frac{(x-1)-(x+1)}{(x-1)^2}=\frac{-2}{(x-1)^2}$.`,
          String.raw`מצאו את נקודות החיתוך של המשיק עם שני הצירים; המשולש ישר-זווית וניצביו על הצירים.`,
        ],
        solutionSteps: [
          String.raw`$f(0)=\frac{1}{-1}=-1$, ולכן נקודת ההשקה היא $(0,-1)$.`,
          String.raw`לפי כלל המנה $f'(x)=\frac{1\cdot(x-1)-(x+1)\cdot1}{(x-1)^2}=\frac{-2}{(x-1)^2}$, ולכן $f'(0)=-2$.`,
          String.raw`משוואת המשיק: $y+1=-2(x-0)$, כלומר $y=-2x-1$.`,
          String.raw`המשיק חותך את ציר $y$ ב-$(0,-1)$ ואת ציר $x$ כאשר $-2x-1=0$, כלומר ב-$\left(-\frac12,0\right)$.`,
          String.raw`המשולש ישר-זווית וניצביו באורך $1$ ו-$\frac12$, ולכן $S=\frac12\cdot1\cdot\frac12=\frac14$.`,
        ],
        finalAnswer: String.raw`$y=-2x-1$; $S=\frac14$.`,
        answers: [
          { label: 'שיפוע המשיק', value: -2 },
          { label: 'שטח המשולש', value: 0.25 },
        ],
      },
      {
        id: 'calc-tangent-5',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\sqrt{2x+1}$. מצאו את משוואת המשיק לגרף הפונקציה שניצב לישר $y=-3x+5$.`,
        hints: [
          String.raw`מכפלת השיפועים של ישרים ניצבים היא $-1$, ולכן שיפוע המשיק הוא $\frac13$.`,
          String.raw`$f'(x)=\frac{1}{\sqrt{2x+1}}$. פתרו $\frac{1}{\sqrt{2x+1}}=\frac13$.`,
        ],
        solutionSteps: [
          String.raw`שיפוע הישר הנתון $-3$, ולכן שיפוע המשיק $m$ הניצב לו מקיים $-3m=-1$, כלומר $m=\frac13$.`,
          String.raw`לפי כלל השרשרת $f'(x)=\frac{2}{2\sqrt{2x+1}}=\frac{1}{\sqrt{2x+1}}$.`,
          String.raw`$\frac{1}{\sqrt{2x+1}}=\frac13\iff\sqrt{2x+1}=3\iff2x+1=9\iff x=4$.`,
          String.raw`$f(4)=\sqrt9=3$, והמשיק: $y-3=\frac13(x-4)$, כלומר $y=\frac13x+\frac53$.`,
        ],
        finalAnswer: String.raw`$y=\frac13x+\frac53$ (נקודת ההשקה $(4,3)$).`,
        answers: [
          { label: String.raw`$x$ של נקודת ההשקה`, value: 4 },
          { label: String.raw`המקדם החופשי $b$ (במשוואה $y=mx+b$)`, value: 5 / 3 },
        ],
      },
      {
        id: 'calc-tangent-6',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\sin 2x$ בתחום $0\le x\le\pi$. מצאו את שיעורי ה-$x$ של הנקודות על הגרף שבהן המשיק מקביל לישר $y=x$, ואת משוואת המשיק בנקודה השמאלית מביניהן.`,
        hints: [
          String.raw`שיפוע הישר $y=x$ הוא $1$. פתרו $f'(x)=2\cos2x=1$.`,
          String.raw`$\cos2x=\frac12\Rightarrow2x=\pm\frac\pi3+2\pi k$. זכרו לחלק גם את $2\pi k$ ב-$2$.`,
          String.raw`בתחום $0\le x\le\pi$ מתקיים $0\le2x\le2\pi$.`,
        ],
        solutionSteps: [
          String.raw`לפי כלל השרשרת $f'(x)=2\cos2x$. משיק המקביל ל-$y=x$ שיפועו $1$, ולכן $2\cos2x=1$, כלומר $\cos2x=\frac12$.`,
          String.raw`$2x=\pm\frac\pi3+2\pi k$, ולכן $x=\pm\frac\pi6+\pi k$.`,
          String.raw`בתחום $0\le x\le\pi$: $x=\frac\pi6$ ו-$x=\pi-\frac\pi6=\frac{5\pi}6$.`,
          String.raw`בנקודה השמאלית: $f\left(\frac\pi6\right)=\sin\frac\pi3=\frac{\sqrt3}2$, והמשיק: $y-\frac{\sqrt3}2=1\cdot\left(x-\frac\pi6\right)$, כלומר $y=x+\frac{\sqrt3}2-\frac\pi6$.`,
        ],
        finalAnswer: String.raw`$x=\frac\pi6$ ו-$x=\frac{5\pi}6$; המשיק: $y=x+\frac{\sqrt3}2-\frac\pi6\approx x+0.342$.`,
        answers: [
          { label: String.raw`$x$ של הנקודה השמאלית`, value: Math.PI / 6 },
          { label: String.raw`$x$ של הנקודה הימנית`, value: (5 * Math.PI) / 6 },
          { label: 'המקדם החופשי של המשיק השמאלי', value: Math.sqrt(3) / 2 - Math.PI / 6 },
        ],
      },
      {
        id: 'calc-tangent-7',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-3x$.

א. מצאו את משוואת המשיק לגרף הפונקציה בנקודה שבה $x=2$.

ב. המשיק חותך את גרף הפונקציה בנקודה נוספת. מצאו את שיעוריה.`,
        hints: [
          String.raw`$f(2)=2$ ו-$f'(x)=3x^2-3$.`,
          String.raw`השוו $x^3-3x=9x-16$. נקודת ההשקה $x=2$ היא שורש כפול, ולכן $(x-2)^2$ מחלק את הפולינום.`,
          String.raw`$x^3-12x+16=(x-2)^2(x+a)$ – השוו את המקדם החופשי: $4a=16$.`,
        ],
        solutionSteps: [
          String.raw`$f(2)=8-6=2$, $f'(x)=3x^2-3$ ו-$f'(2)=9$. המשיק: $y-2=9(x-2)$, כלומר $y=9x-16$.`,
          String.raw`נקודות החיתוך של המשיק עם הגרף: $x^3-3x=9x-16\iff x^3-12x+16=0$.`,
          String.raw`בנקודת ההשקה $x=2$ למשוואה שורש כפול, ולכן $x^3-12x+16=(x-2)^2(x+a)=(x^2-4x+4)(x+a)$.`,
          String.raw`השוואת המקדם החופשי: $4a=16$, ולכן $a=4$. בדיקה במקדם של $x^2$: $a-4=0$ – מתאים.`,
          String.raw`לכן $x^3-12x+16=(x-2)^2(x+4)$, והנקודה הנוספת היא $x=-4$, $f(-4)=-64+12=-52$.`,
        ],
        finalAnswer: String.raw`המשיק $y=9x-16$; נקודת החיתוך הנוספת $(-4,-52)$.`,
        answers: [
          { label: 'שיפוע המשיק', value: 9 },
          { label: 'המקדם החופשי של המשיק', value: -16 },
          { label: String.raw`$x$ של נקודת החיתוך הנוספת`, value: -4 },
          { label: String.raw`$y$ של נקודת החיתוך הנוספת`, value: -52 },
        ],
      },
      {
        id: 'calc-tangent-8',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=x^3+ax^2+b$. הישר $y=9x+11$ משיק לגרף הפונקציה בנקודה שבה $x=-1$.

א. מצאו את $a$ ואת $b$.

ב. לגרף יש נקודה נוספת שבה המשיק מקביל לישר $y=9x+11$. מצאו את משוואת המשיק בנקודה זו.`,
        hints: [
          String.raw`שני תנאים: השיפוע $f'(-1)=9$, ונקודת ההשקה נמצאת על הישר: $f(-1)=9\cdot(-1)+11=2$.`,
          String.raw`$f'(x)=3x^2+2ax$. מהתנאי הראשון מוצאים את $a$, ומהשני את $b$.`,
          String.raw`בסעיף ב פתרו $f'(x)=9$; אחד הפתרונות הוא $x=-1$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3x^2+2ax$. שיפוע המשיק ב-$x=-1$ הוא $9$: $3-2a=9$, ולכן $a=-3$.`,
          String.raw`נקודת ההשקה נמצאת גם על הגרף וגם על המשיק: $y=9\cdot(-1)+11=2$, ולכן $f(-1)=-1+a+b=-4+b=2$, כלומר $b=6$.`,
          String.raw`$f(x)=x^3-3x^2+6$ ו-$f'(x)=3x^2-6x$. משיק מקביל – שיפוע $9$: $3x^2-6x=9\iff x^2-2x-3=0\iff x=-1$ או $x=3$.`,
          String.raw`הנקודה הנוספת: $x=3$, $f(3)=27-27+6=6$. המשיק: $y-6=9(x-3)$, כלומר $y=9x-21$.`,
        ],
        finalAnswer: String.raw`$a=-3$, $b=6$; המשיק $y=9x-21$ בנקודה $(3,6)$.`,
        answers: [
          { label: String.raw`$a$`, value: -3 },
          { label: String.raw`$b$`, value: 6 },
          { label: String.raw`$x$ של נקודת ההשקה הנוספת`, value: 3 },
          { label: 'המקדם החופשי של המשיק הנוסף', value: -21 },
        ],
      },
    ],
  },

  'calc-extrema-monotonic': {
    intro: String.raw`סימן הנגזרת קובע את כיוון הגרף: בתחום שבו $f'>0$ הפונקציה עולה, ובתחום שבו $f'<0$ – יורדת. נקודה שבה הנגזרת מחליפה סימן היא נקודת קיצון (מקסימום או מינימום מקומי). השיטה: מוצאים את הנקודות החשודות לקיצון ($f'(x)=0$ או $f'$ לא מוגדרת), מחלקים את תחום ההגדרה לקטעים ובודקים את סימן הנגזרת בכל קטע (טבלת סימנים). זה הלב של כל סעיף חקירה בשאלות 6 ו-7.`,
    keyFacts: [
      String.raw`**עלייה וירידה**: אם $f'(x)>0$ בקטע – $f$ עולה בו; אם $f'(x)<0$ – יורדת. נקודות שאינן בתחום ההגדרה מפרידות בין קטעים, ואינן נכללות בהם.`,
      String.raw`**נקודה חשודה לקיצון**: נקודה פנימית בתחום שבה $f'(x)=0$, או שבה $f'$ אינה מוגדרת (למשל ״שפיץ״ של ערך מוחלט).`,
      String.raw`**סוג הקיצון לפי טבלת סימנים**: $f'$ עוברת מ-$+$ ל-$-$ – מקסימום; מ-$-$ ל-$+$ – מינימום; אם $f'$ אינה מחליפה סימן – אין קיצון (למשל $f(x)=x^3$ ב-$x=0$).`,
      String.raw`**ערך הקיצון** מחשבים בהצבה בפונקציה המקורית: הנקודה היא $(x_0,f(x_0))$.`,
      String.raw`**קיצון קצה**: בקצה של תחום ההגדרה (למשל $x=4$ ב-$\sqrt{4-x}$) יש קיצון קצה – מינימום אם הפונקציה יורדת לקראת הקצה (או עולה ממנו), ומקסימום במקרה ההפוך.`,
      String.raw`**ערך מוחלט**: ל-$|g(x)|$ יש מינימום (בערך $0$) בכל נקודה שבה $g$ מחליפה סימן; שם הגרף ״שפיץ״ והפונקציה אינה גזירה.`,
    ],
    exercises: [
      {
        id: 'calc-extrema-monotonic-1',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=2x^3-3x^2-12x+1$. מצאו את נקודות הקיצון של הפונקציה וקבעו את סוגן, ומצאו את תחומי העלייה והירידה.`,
        hints: [
          String.raw`$f'(x)=6x^2-6x-12=6(x^2-x-2)$.`,
          String.raw`פרקו: $x^2-x-2=(x-2)(x+1)$, ובדקו את סימן $f'$ בשלושת הקטעים.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=6x^2-6x-12=6(x-2)(x+1)$, ולכן $f'(x)=0$ עבור $x=-1$ ועבור $x=2$.`,
          String.raw`$f'$ היא פרבולה ״מחייכת״ ששורשיה $-1$ ו-$2$: חיובית עבור $x<-1$, שלילית עבור $-1<x<2$, חיובית עבור $x>2$.`,
          String.raw`ב-$x=-1$ הנגזרת עוברת מ-$+$ ל-$-$: מקסימום, $f(-1)=-2-3+12+1=8$.`,
          String.raw`ב-$x=2$ הנגזרת עוברת מ-$-$ ל-$+$: מינימום, $f(2)=16-12-24+1=-19$.`,
          String.raw`הפונקציה עולה עבור $x<-1$ ועבור $x>2$, ויורדת עבור $-1<x<2$.`,
        ],
        finalAnswer: String.raw`מקסימום $(-1,8)$, מינימום $(2,-19)$; עולה ב-$x<-1$ וב-$x>2$, יורדת ב-$-1<x<2$.`,
        answers: [
          { label: String.raw`$x$ של נקודת המקסימום`, value: -1 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 8 },
          { label: String.raw`$x$ של נקודת המינימום`, value: 2 },
          { label: String.raw`$y$ של נקודת המינימום`, value: -19 },
        ],
      },
      {
        id: 'calc-extrema-monotonic-2',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=x^4-8x^2+3$. מצאו את נקודות הקיצון שלה וקבעו את סוגן, ואת תחומי העלייה והירידה.`,
        hints: [
          String.raw`$f'(x)=4x^3-16x=4x(x^2-4)$.`,
          String.raw`לנגזרת שלושה אפסים: $0$ ו-$\pm2$. בדקו את הסימן בארבעה קטעים.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=4x^3-16x=4x(x-2)(x+2)$, ומתאפסת ב-$x=-2$, $x=0$, $x=2$.`,
          String.raw`סימן $f'$ (למשל בהצבת $x=-3,-1,1,3$): שלילי עבור $x<-2$, חיובי עבור $-2<x<0$, שלילי עבור $0<x<2$, חיובי עבור $x>2$.`,
          String.raw`לכן מינימום ב-$x=\pm2$: $f(\pm2)=16-32+3=-13$; ומקסימום ב-$x=0$: $f(0)=3$.`,
          String.raw`עולה ב-$-2<x<0$ וב-$x>2$; יורדת ב-$x<-2$ וב-$0<x<2$. (הפונקציה זוגית, ולכן הגרף סימטרי לציר $y$.)`,
        ],
        finalAnswer: String.raw`מינימום $(-2,-13)$ ו-$(2,-13)$, מקסימום $(0,3)$; עולה ב-$-2<x<0$ וב-$x>2$, יורדת ב-$x<-2$ וב-$0<x<2$.`,
        answers: [
          { label: String.raw`$y$ של נקודת המקסימום`, value: 3 },
          { label: String.raw`$x$ החיובי של נקודת מינימום`, value: 2 },
          { label: String.raw`$y$ של נקודות המינימום`, value: -13 },
        ],
      },
      {
        id: 'calc-extrema-monotonic-3',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x^2}{x-1}$. מצאו את תחום ההגדרה, את נקודות הקיצון וסוגן, ואת תחומי העלייה והירידה.`,
        hints: [
          String.raw`תחום: $x\ne1$. כלל המנה: $f'(x)=\frac{2x(x-1)-x^2}{(x-1)^2}$.`,
          String.raw`$f'(x)=\frac{x(x-2)}{(x-1)^2}$; המכנה חיובי, ולכן הסימן נקבע לפי המונה.`,
          String.raw`בטבלת הסימנים כללו גם את $x=1$ כגבול בין קטעים – אך לא כנקודת קיצון.`,
        ],
        solutionSteps: [
          String.raw`תחום ההגדרה: $x\ne1$.`,
          String.raw`$f'(x)=\frac{2x(x-1)-x^2\cdot1}{(x-1)^2}=\frac{x^2-2x}{(x-1)^2}=\frac{x(x-2)}{(x-1)^2}$, ומתאפסת ב-$x=0$ וב-$x=2$.`,
          String.raw`המכנה חיובי בכל התחום, ולכן סימן $f'$ כסימן $x(x-2)$: חיובי עבור $x<0$, שלילי עבור $0<x<1$ ועבור $1<x<2$, חיובי עבור $x>2$.`,
          String.raw`ב-$x=0$: מקסימום, $f(0)=0$. ב-$x=2$: מינימום, $f(2)=\frac{4}{1}=4$.`,
          String.raw`עולה ב-$x<0$ וב-$x>2$; יורדת ב-$0<x<1$ וב-$1<x<2$. ערך המינימום ($4$) גדול מערך המקסימום ($0$) – זה אפשרי, כי הם בענפים שונים של הגרף, משני צדי $x=1$.`,
        ],
        finalAnswer: String.raw`$x\ne1$; מקסימום $(0,0)$, מינימום $(2,4)$; עולה ב-$x<0$ וב-$x>2$, יורדת ב-$0<x<1$ וב-$1<x<2$.`,
        answers: [
          { label: String.raw`$x$ של נקודת המקסימום`, value: 0 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 0 },
          { label: String.raw`$x$ של נקודת המינימום`, value: 2 },
          { label: String.raw`$y$ של נקודת המינימום`, value: 4 },
        ],
      },
      {
        id: 'calc-extrema-monotonic-4',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x\sqrt{4-x}$. מצאו את תחום ההגדרה ואת נקודות הקיצון של הפונקציה (כולל קיצון בקצה התחום), וקבעו את סוגן.`,
        hints: [
          String.raw`תחום: $4-x\ge0$. גזרו כמכפלה: $f'(x)=\sqrt{4-x}+x\cdot\frac{-1}{2\sqrt{4-x}}$.`,
          String.raw`מכנה משותף: $f'(x)=\frac{8-3x}{2\sqrt{4-x}}$.`,
          String.raw`בקצה $x=4$ בדקו אם הפונקציה עולה או יורדת לקראתו.`,
        ],
        solutionSteps: [
          String.raw`תחום ההגדרה: $4-x\ge0$, כלומר $x\le4$.`,
          String.raw`לפי כלל המכפלה וכלל השרשרת: $f'(x)=\sqrt{4-x}+x\cdot\frac{-1}{2\sqrt{4-x}}=\frac{2(4-x)-x}{2\sqrt{4-x}}=\frac{8-3x}{2\sqrt{4-x}}$, עבור $x<4$.`,
          String.raw`$f'(x)=0\iff x=\frac83$. המכנה חיובי, ולכן $f'>0$ עבור $x<\frac83$ ו-$f'<0$ עבור $\frac83<x<4$.`,
          String.raw`ב-$x=\frac83$ מקסימום: $f\left(\frac83\right)=\frac83\sqrt{\frac43}=\frac83\cdot\frac{2}{\sqrt3}=\frac{16}{3\sqrt3}=\frac{16\sqrt3}{9}\approx3.08$.`,
          String.raw`בקצה $x=4$: $f(4)=0$, והפונקציה יורדת לקראתו – מינימום קצה $(4,0)$.`,
        ],
        finalAnswer: String.raw`$x\le4$; מקסימום $\left(\frac83,\frac{16\sqrt3}{9}\right)$, מינימום קצה $(4,0)$.`,
        answers: [
          { label: String.raw`$x$ של נקודת המקסימום`, value: 8 / 3 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: (16 * Math.sqrt(3)) / 9 },
        ],
      },
      {
        id: 'calc-extrema-monotonic-5',
        difficulty: 2,
        statement: String.raw`לפונקציה $f(x)=x^3+ax^2+9x$ יש נקודת קיצון שבה $x=1$.

א. מצאו את $a$.

ב. מצאו את נקודות הקיצון של הפונקציה וקבעו את סוגן.`,
        hints: [
          String.raw`בנקודת קיצון של פונקציה גזירה הנגזרת מתאפסת: $f'(1)=0$.`,
          String.raw`$f'(x)=3x^2+2ax+9$.`,
          String.raw`אחרי שמצאתם את $a$, פרקו את $f'$ ובנו טבלת סימנים.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3x^2+2ax+9$. בנקודת קיצון של פונקציה גזירה $f'(1)=0$: $3+2a+9=0$, ולכן $a=-6$.`,
          String.raw`$f(x)=x^3-6x^2+9x$ ו-$f'(x)=3x^2-12x+9=3(x-1)(x-3)$.`,
          String.raw`$f'>0$ עבור $x<1$, $f'<0$ עבור $1<x<3$, $f'>0$ עבור $x>3$.`,
          String.raw`ב-$x=1$ מקסימום: $f(1)=1-6+9=4$. ב-$x=3$ מינימום: $f(3)=27-54+27=0$.`,
        ],
        finalAnswer: String.raw`$a=-6$; מקסימום $(1,4)$, מינימום $(3,0)$.`,
        answers: [
          { label: String.raw`$a$`, value: -6 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 4 },
          { label: String.raw`$x$ של נקודת המינימום`, value: 3 },
          { label: String.raw`$y$ של נקודת המינימום`, value: 0 },
        ],
      },
      {
        id: 'calc-extrema-monotonic-6',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=|x^2-4|$.

א. כתבו את הפונקציה בלי סימן ערך מוחלט בכל אחד מהתחומים $|x|\ge2$ ו-$|x|<2$.

ב. מצאו את נקודות הקיצון של הפונקציה וקבעו את סוגן. באילו נקודות הפונקציה אינה גזירה?`,
        hints: [
          String.raw`$x^2-4\ge0$ כאשר $x\le-2$ או $x\ge2$, ושם $f(x)=x^2-4$. בין $-2$ ל-$2$: $f(x)=4-x^2$.`,
          String.raw`גזרו כל חלק בנפרד, ובדקו את סימן הנגזרת משני צדי $x=-2$, $x=0$, $x=2$.`,
          String.raw`ב-$x=\pm2$ השיפוע משמאל והשיפוע מימין שונים.`,
        ],
        solutionSteps: [
          String.raw`עבור $|x|\ge2$: $f(x)=x^2-4$ ו-$f'(x)=2x$. עבור $|x|<2$: $f(x)=4-x^2$ ו-$f'(x)=-2x$.`,
          String.raw`סימן הנגזרת: עבור $x<-2$, $2x<0$ (יורדת); עבור $-2<x<0$, $-2x>0$ (עולה); עבור $0<x<2$, $-2x<0$ (יורדת); עבור $x>2$, $2x>0$ (עולה).`,
          String.raw`ב-$x=0$: מקסימום, $f(0)=4$. ב-$x=\pm2$ הפונקציה עוברת מירידה לעלייה – מינימום, $f(\pm2)=0$.`,
          String.raw`ב-$x=2$ השיפוע משמאל $-2\cdot2=-4$ והשיפוע מימין $2\cdot2=4$ – שונים, ולכן הפונקציה אינה גזירה ב-$x=2$ (״שפיץ״), וכך גם ב-$x=-2$. אלה נקודות קיצון שבהן הנגזרת אינה מוגדרת (ולא מתאפסת).`,
        ],
        finalAnswer: String.raw`מקסימום $(0,4)$; מינימום $(-2,0)$ ו-$(2,0)$, ובהן הפונקציה אינה גזירה.`,
        answers: [
          { label: 'מספר נקודות הקיצון', value: 3 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 4 },
        ],
      },
      {
        id: 'calc-extrema-monotonic-7',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{ax}{x^2+4}$, כאשר $a>0$ פרמטר. ידוע שערך המקסימום המקומי של הפונקציה הוא $1$.

א. מצאו את נקודות הקיצון של הפונקציה (באמצעות $a$) וקבעו את סוגן.

ב. מצאו את $a$ ואת נקודת המינימום.`,
        hints: [
          String.raw`כלל המנה: $f'(x)=\frac{a(x^2+4)-ax\cdot2x}{(x^2+4)^2}=\frac{a(4-x^2)}{(x^2+4)^2}$.`,
          String.raw`מאחר ש-$a>0$, סימן $f'$ כסימן $4-x^2$.`,
          String.raw`ערך המקסימום: $f(2)=\frac{2a}{8}=\frac a4$.`,
        ],
        solutionSteps: [
          String.raw`הפונקציה מוגדרת לכל $x$. $f'(x)=\frac{a(x^2+4)-ax\cdot2x}{(x^2+4)^2}=\frac{a(4-x^2)}{(x^2+4)^2}$, ומתאפסת ב-$x=\pm2$.`,
          String.raw`$a>0$ והמכנה חיובי, לכן סימן $f'$ כסימן $4-x^2$: שלילי עבור $x<-2$, חיובי עבור $-2<x<2$, שלילי עבור $x>2$.`,
          String.raw`לכן ב-$x=-2$ מינימום וב-$x=2$ מקסימום: $f(2)=\frac{2a}{8}=\frac a4$ ו-$f(-2)=-\frac a4$.`,
          String.raw`ערך המקסימום $1$: $\frac a4=1$, ולכן $a=4$.`,
          String.raw`נקודת המינימום: $\left(-2,-\frac44\right)=(-2,-1)$.`,
        ],
        finalAnswer: String.raw`מקסימום $\left(2,\frac a4\right)$, מינימום $\left(-2,-\frac a4\right)$; $a=4$, ונקודת המינימום $(-2,-1)$.`,
        answers: [
          { label: String.raw`$a$`, value: 4 },
          { label: String.raw`$x$ של נקודת המינימום`, value: -2 },
          { label: String.raw`$y$ של נקודת המינימום`, value: -1 },
        ],
      },
      {
        id: 'calc-extrema-monotonic-8',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=x^3+ax^2+3x$, כאשר $a$ פרמטר.

א. מצאו את כל ערכי $a$ שעבורם הפונקציה עולה לכל $x$ (ואין לה נקודות קיצון).

ב. מצאו את הערך הגדול ביותר של $a$ שמקיים את סעיף א. עבור ערך זה מצאו את הנקודה שבה המשיק לגרף אופקי, והסבירו מדוע אין בה קיצון.`,
        hints: [
          String.raw`$f'(x)=3x^2+2ax+3$ היא פרבולה ״מחייכת״. מתי היא אינה שלילית לכל $x$?`,
          String.raw`דרוש $\Delta=(2a)^2-4\cdot3\cdot3\le0$.`,
          String.raw`עבור $a=3$: $f'(x)=3(x+1)^2$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3x^2+2ax+3$ – פרבולה עם מקדם מוביל חיובי. היא אינה שלילית לכל $x$ (ומתאפסת לכל היותר בנקודה אחת) כאשר ההבחנה אינה חיובית.`,
          String.raw`$\Delta=4a^2-36\le0\iff a^2\le9\iff-3\le a\le3$.`,
          String.raw`אם $|a|>3$, ל-$f'$ שני שורשים שונים והיא שלילית ביניהם – הפונקציה יורדת שם ויש לה מקסימום ומינימום. לכן התשובה לסעיף א: $-3\le a\le3$.`,
          String.raw`הערך הגדול ביותר: $a=3$. אז $f'(x)=3x^2+6x+3=3(x+1)^2$, והיא מתאפסת רק ב-$x=-1$: $f(-1)=-1+3-3=-1$, ושם המשיק אופקי.`,
          String.raw`$f'(x)=3(x+1)^2>0$ משני צדי $x=-1$ – הנגזרת אינה מחליפה סימן, ולכן $(-1,-1)$ אינה נקודת קיצון (הפונקציה ממשיכה לעלות).`,
        ],
        finalAnswer: String.raw`$-3\le a\le3$; עבור $a=3$ המשיק אופקי בנקודה $(-1,-1)$, אך זו אינה נקודת קיצון.`,
        answers: [
          { label: String.raw`הערך הגדול ביותר של $a$`, value: 3 },
          { label: String.raw`$x$ של הנקודה עם משיק אופקי`, value: -1 },
          { label: String.raw`$y$ של הנקודה עם משיק אופקי`, value: -1 },
        ],
      },
    ],
  },

  'calc-absolute-extrema': {
    intro: String.raw`נקודת קיצון מוחלט היא נקודה שבה הפונקציה מקבלת את הערך הגדול ביותר (מקסימום מוחלט) או הקטן ביותר (מינימום מוחלט) בכל התחום – לא רק בסביבה קרובה. בקטע סגור $a\le x\le b$ מוצאים אותן כך: מחשבים את ערכי הפונקציה בנקודות הקיצון המקומי שבתוך הקטע ובשני הקצוות, ומשווים. בבגרות זה מופיע בעיקר בשאלה 7 (פונקציה טריגונומטרית בתחום נתון) ובשאלה 8, ולעתים כדי למצוא את קבוצת הערכים של הפונקציה.`,
    keyFacts: [
      String.raw`**מקסימום מוחלט** ב-$x_0$: $f(x_0)\ge f(x)$ לכל $x$ בתחום; **מינימום מוחלט**: $f(x_0)\le f(x)$ לכל $x$ בתחום. ערך מוחלט יכול להתקבל ביותר מנקודה אחת.`,
      String.raw`**שיטה בקטע סגור** $a\le x\le b$: (1) מוצאים את הנקודות החשודות בתוך הקטע; (2) מחשבים את $f$ בהן ובקצוות $f(a)$, $f(b)$; (3) הערך הגדול ביותר – מקסימום מוחלט, הקטן ביותר – מינימום מוחלט.`,
      String.raw`**קיצון קצה**: בקצה של קטע סגור יש תמיד קיצון מקומי – אם הפונקציה עולה מימין ל-$a$, ב-$a$ מינימום קצה; אם היא עולה לקראת $b$, ב-$b$ מקסימום קצה.`,
      String.raw`**תחום פתוח או לא חסום**: ייתכן שאין קיצון מוחלט – כשהפונקציה שואפת לאינסוף, או מתקרבת לערך בלי להגיע אליו. אם לפונקציה רציפה יש בתחום כזה (קטע ללא קצוות) נקודת קיצון מקומי אחת בלבד, היא גם הקיצון המוחלט מאותו סוג.`,
      String.raw`**קבוצת הערכים**: אם $f$ רציפה בקטע סגור, היא מקבלת את כל הערכים מהמינימום המוחלט $m$ עד המקסימום המוחלט $M$, כלומר $m\le f(x)\le M$.`,
    ],
    exercises: [
      {
        id: 'calc-absolute-extrema-1',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=x^2-4x+1$ בקטע $0\le x\le5$. מצאו את המקסימום המוחלט ואת המינימום המוחלט של הפונקציה בקטע, ואת הנקודות שבהן הם מתקבלים.`,
        hints: [
          String.raw`$f'(x)=2x-4$. היכן היא מתאפסת? האם הנקודה בתוך הקטע?`,
          String.raw`השוו את $f$ בנקודה החשודה ובשני הקצוות $x=0$, $x=5$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2x-4=0\Rightarrow x=2$, שנמצא בתוך הקטע.`,
          String.raw`ערכים: $f(0)=1$, $f(2)=4-8+1=-3$, $f(5)=25-20+1=6$.`,
          String.raw`הערך הגדול ביותר $6$ – מקסימום מוחלט בנקודה $(5,6)$; הקטן ביותר $-3$ – מינימום מוחלט בנקודה $(2,-3)$.`,
        ],
        finalAnswer: String.raw`מקסימום מוחלט $(5,6)$, מינימום מוחלט $(2,-3)$.`,
        answers: [
          { label: 'המקסימום המוחלט', value: 6 },
          { label: String.raw`$x$ של המקסימום המוחלט`, value: 5 },
          { label: 'המינימום המוחלט', value: -3 },
          { label: String.raw`$x$ של המינימום המוחלט`, value: 2 },
        ],
      },
      {
        id: 'calc-absolute-extrema-2',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-3x$ בקטע $0\le x\le2$. מצאו את הערך הגדול ביותר ואת הערך הקטן ביותר של הפונקציה בקטע.`,
        hints: [
          String.raw`$f'(x)=3x^2-3$ מתאפסת ב-$x=\pm1$. איזו מהן בקטע?`,
          String.raw`חשבו את $f(0)$, $f(1)$, $f(2)$ והשוו.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3x^2-3=0\Rightarrow x=\pm1$; בקטע $0\le x\le2$ נמצאת רק $x=1$.`,
          String.raw`ערכים: $f(0)=0$, $f(1)=1-3=-2$, $f(2)=8-6=2$.`,
          String.raw`הערך הגדול ביותר $2$ (ב-$x=2$, מקסימום קצה) והקטן ביותר $-2$ (ב-$x=1$).`,
        ],
        finalAnswer: String.raw`הגדול ביותר $2$ (ב-$x=2$), הקטן ביותר $-2$ (ב-$x=1$).`,
        answers: [
          { label: 'הערך הגדול ביותר', value: 2 },
          { label: 'הערך הקטן ביותר', value: -2 },
        ],
      },
      {
        id: 'calc-absolute-extrema-3',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-6x^2+9x+1$ בקטע $-1\le x\le4$. מצאו את המקסימום המוחלט ואת המינימום המוחלט של הפונקציה בקטע, ואת כל הנקודות שבהן הם מתקבלים.`,
        hints: [
          String.raw`$f'(x)=3x^2-12x+9=3(x-1)(x-3)$.`,
          String.raw`חשבו את $f$ בארבע נקודות: $x=-1,1,3,4$.`,
          String.raw`ייתכן שערך מוחלט מתקבל בשתי נקודות.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3x^2-12x+9=3(x-1)(x-3)$, מתאפסת ב-$x=1$ וב-$x=3$ – שתיהן בקטע.`,
          String.raw`ערכים: $f(-1)=-1-6-9+1=-15$, $f(1)=1-6+9+1=5$, $f(3)=27-54+27+1=1$, $f(4)=64-96+36+1=5$.`,
          String.raw`הערך הגדול ביותר $5$ מתקבל פעמיים: במקסימום המקומי $(1,5)$ ובקצה $(4,5)$.`,
          String.raw`הערך הקטן ביותר $-15$ מתקבל בקצה $(-1,-15)$ – המינימום המקומי $(3,1)$ אינו המינימום המוחלט.`,
        ],
        finalAnswer: String.raw`מקסימום מוחלט $5$ (ב-$x=1$ וב-$x=4$); מינימום מוחלט $-15$ (ב-$x=-1$).`,
        answers: [
          { label: 'המקסימום המוחלט', value: 5 },
          { label: 'המינימום המוחלט', value: -15 },
          { label: String.raw`$x$ של המינימום המוחלט`, value: -1 },
        ],
      },
      {
        id: 'calc-absolute-extrema-4',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x^2+\frac{16}{x}$ בתחום $x>0$. מצאו את נקודת המינימום המוחלט של הפונקציה בתחום זה. האם יש לפונקציה מקסימום מוחלט בתחום? נמקו.`,
        hints: [
          String.raw`$f'(x)=2x-\frac{16}{x^2}=\frac{2x^3-16}{x^2}$.`,
          String.raw`בדקו את סימן $f'$ משני צדי הנקודה החשודה היחידה.`,
          String.raw`מה קורה ל-$f$ כאשר $x\to0^+$ וכאשר $x\to\infty$?`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2x-\frac{16}{x^2}=\frac{2x^3-16}{x^2}$.`,
          String.raw`$f'(x)=0\iff x^3=8\iff x=2$. עבור $0<x<2$: $f'<0$; עבור $x>2$: $f'>0$.`,
          String.raw`הפונקציה יורדת עד $x=2$ ועולה אחריו, ולכן $x=2$ הוא מינימום מקומי יחיד, ובפרט מינימום מוחלט: $f(2)=4+8=12$.`,
          String.raw`כאשר $x\to0^+$, $\frac{16}{x}\to\infty$, וכאשר $x\to\infty$, $x^2\to\infty$; הפונקציה אינה חסומה מלמעלה, ולכן אין לה מקסימום מוחלט.`,
        ],
        finalAnswer: String.raw`מינימום מוחלט $(2,12)$; אין מקסימום מוחלט.`,
        answers: [
          { label: String.raw`$x$ של המינימום המוחלט`, value: 2 },
          { label: 'המינימום המוחלט', value: 12 },
        ],
      },
      {
        id: 'calc-absolute-extrema-5',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\sqrt{x}+\sqrt{4-x}$. מצאו את תחום ההגדרה שלה, ואת הערך הגדול ביותר והערך הקטן ביותר שלה.`,
        hints: [
          String.raw`שני השורשים צריכים להיות מוגדרים: $x\ge0$ ו-$4-x\ge0$.`,
          String.raw`$f'(x)=\frac{1}{2\sqrt x}-\frac{1}{2\sqrt{4-x}}$. מתי שני השברים שווים?`,
          String.raw`השוו את הערך בנקודה החשודה לערכים בקצוות $x=0$, $x=4$.`,
        ],
        solutionSteps: [
          String.raw`תחום: $x\ge0$ ו-$4-x\ge0$, כלומר $0\le x\le4$ – קטע סגור.`,
          String.raw`$f'(x)=\frac{1}{2\sqrt x}-\frac{1}{2\sqrt{4-x}}$ (עבור $0<x<4$).`,
          String.raw`$f'(x)=0\iff\sqrt x=\sqrt{4-x}\iff x=4-x\iff x=2$.`,
          String.raw`ערכים: $f(0)=0+2=2$, $f(2)=2\sqrt2\approx2.83$, $f(4)=2+0=2$.`,
          String.raw`לכן הערך הגדול ביותר הוא $2\sqrt2$ (ב-$x=2$), והקטן ביותר $2$ (בשני הקצוות $x=0$ ו-$x=4$).`,
        ],
        finalAnswer: String.raw`$0\le x\le4$; הגדול ביותר $2\sqrt2$ (ב-$x=2$), הקטן ביותר $2$ (ב-$x=0$ וב-$x=4$).`,
        answers: [
          { label: 'הערך הגדול ביותר', value: 2 * Math.SQRT2 },
          { label: String.raw`$x$ שבו מתקבל הערך הגדול ביותר`, value: 2 },
          { label: 'הערך הקטן ביותר', value: 2 },
        ],
      },
      {
        id: 'calc-absolute-extrema-6',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\sin x+\cos x$ בתחום $0\le x\le\pi$. מצאו את המקסימום המוחלט ואת המינימום המוחלט של הפונקציה בתחום.`,
        hints: [
          String.raw`$f'(x)=\cos x-\sin x$. פתרו $\cos x=\sin x$.`,
          String.raw`חלקו ב-$\cos x$ (שאינו $0$ בפתרון): $\tan x=1$.`,
          String.raw`השוו את ערך הפונקציה בנקודה שמצאתם לערכים בקצוות.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\cos x-\sin x$, ו-$f'(x)=0\iff\sin x=\cos x$. אם $\cos x=0$ אז $\sin x=\pm1\ne0$, ולכן מותר לחלק ב-$\cos x$: $\tan x=1$.`,
          String.raw`$x=\frac\pi4+\pi k$, ובתחום $0\le x\le\pi$: $x=\frac\pi4$.`,
          String.raw`ערכים: $f(0)=0+1=1$, $f\left(\frac\pi4\right)=\frac{\sqrt2}2+\frac{\sqrt2}2=\sqrt2$, $f(\pi)=0-1=-1$.`,
          String.raw`מקסימום מוחלט $\sqrt2$ ב-$x=\frac\pi4$; מינימום מוחלט $-1$ ב-$x=\pi$.`,
        ],
        finalAnswer: String.raw`מקסימום מוחלט $\left(\frac\pi4,\sqrt2\right)$; מינימום מוחלט $(\pi,-1)$.`,
        answers: [
          { label: String.raw`$x$ של המקסימום המוחלט`, value: Math.PI / 4 },
          { label: 'המקסימום המוחלט', value: Math.SQRT2 },
          { label: 'המינימום המוחלט', value: -1 },
        ],
      },
      {
        id: 'calc-absolute-extrema-7',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-3x^2+a$ בקטע $-1\le x\le3$, כאשר $a$ פרמטר. ידוע שהמקסימום המוחלט של הפונקציה בקטע הוא $6$. מצאו את $a$ ואת המינימום המוחלט של הפונקציה בקטע, ובאילו נקודות הוא מתקבל.`,
        hints: [
          String.raw`$f'(x)=3x^2-6x=3x(x-2)$.`,
          String.raw`הביעו באמצעות $a$ את ערכי $f$ בנקודות החשודות ובקצוות.`,
          String.raw`הערך הגדול מביניהם שווה ל-$6$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3x^2-6x=3x(x-2)$, מתאפסת ב-$x=0$ וב-$x=2$ – שתיהן בתוך הקטע.`,
          String.raw`ערכים באמצעות $a$: $f(-1)=-1-3+a=a-4$, $f(0)=a$, $f(2)=8-12+a=a-4$, $f(3)=27-27+a=a$.`,
          String.raw`הערך הגדול ביותר הוא $a$ (ב-$x=0$ וב-$x=3$), ולכן $a=6$.`,
          String.raw`הערך הקטן ביותר: $a-4=2$, והוא מתקבל ב-$x=-1$ וב-$x=2$.`,
        ],
        finalAnswer: String.raw`$a=6$; המינימום המוחלט $2$, בנקודות $(-1,2)$ ו-$(2,2)$.`,
        answers: [
          { label: String.raw`$a$`, value: 6 },
          { label: 'המינימום המוחלט', value: 2 },
        ],
      },
      {
        id: 'calc-absolute-extrema-8',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=2\sin x+\cos2x$ בתחום $0\le x\le\pi$. מצאו את כל נקודות הקיצון של הפונקציה בתחום (כולל קצוות) וקבעו את סוגן, ומצאו את הערך הגדול ביותר ואת הערך הקטן ביותר שלה.`,
        hints: [
          String.raw`$f'(x)=2\cos x-2\sin2x$. השתמשו ב-$\sin2x=2\sin x\cos x$.`,
          String.raw`$f'(x)=2\cos x(1-2\sin x)$. פתרו $\cos x=0$ ו-$\sin x=\frac12$ בתחום.`,
          String.raw`השוו את ערכי $f$ בכל הנקודות החשודות ובקצוות.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2\cos x-2\sin2x=2\cos x-4\sin x\cos x=2\cos x(1-2\sin x)$.`,
          String.raw`$\cos x=0\Rightarrow x=\frac\pi2$; $\sin x=\frac12\Rightarrow x=\frac\pi6$ או $x=\frac{5\pi}6$.`,
          String.raw`סימן $f'$: ב-$0\le x<\frac\pi6$ – $\cos x>0$ ו-$1-2\sin x>0$, חיובי; ב-$\frac\pi6<x<\frac\pi2$ – שלילי; ב-$\frac\pi2<x<\frac{5\pi}6$ – $\cos x<0$ ו-$1-2\sin x<0$, חיובי; ב-$\frac{5\pi}6<x\le\pi$ – שלילי.`,
          String.raw`מקסימום ב-$x=\frac\pi6$ וב-$x=\frac{5\pi}6$: $f=2\cdot\frac12+\frac12=\frac32$ (כי $\cos\frac\pi3=\cos\frac{5\pi}3=\frac12$). מינימום ב-$x=\frac\pi2$: $f=2+\cos\pi=1$.`,
          String.raw`קצוות: $f(0)=0+1=1$ – מינימום קצה (הפונקציה עולה מימין); $f(\pi)=0+\cos2\pi=1$ – מינימום קצה (יורדת לקראתו).`,
          String.raw`הערך הגדול ביותר $\frac32$ (ב-$\frac\pi6$ וב-$\frac{5\pi}6$), והקטן ביותר $1$ (ב-$0$, $\frac\pi2$ ו-$\pi$).`,
        ],
        finalAnswer: String.raw`מקסימום $\left(\frac\pi6,\frac32\right)$, $\left(\frac{5\pi}6,\frac32\right)$; מינימום $\left(\frac\pi2,1\right)$, ומינימום קצה $(0,1)$, $(\pi,1)$. הגדול ביותר $\frac32$, הקטן ביותר $1$.`,
        answers: [
          { label: String.raw`$x$ של נקודת המקסימום השמאלית`, value: Math.PI / 6 },
          { label: 'הערך הגדול ביותר', value: 1.5 },
          { label: 'הערך הקטן ביותר', value: 1 },
        ],
      },
    ],
  },

  'calc-asymptotes': {
    intro: String.raw`אסימפטוטה היא ישר שגרף הפונקציה מתקרב אליו ככל שמתקדמים לאורכו. **לפי המיקוד נדרשות רק אסימפטוטות המקבילות לצירים**: אנכיות ($x=a$ – ליד נקודה שבה הפונקציה אינה מוגדרת והערכים שואפים ל-$\pm\infty$) ואופקיות ($y=b$ – כאשר $x\to\pm\infty$). הן חלק קבוע בחקירה של פונקציית מנה או שורש בשאלה 6, ועוזרות לשרטט סקיצה נכונה ולקבוע את מספר הפתרונות של משוואה.`,
    keyFacts: [
      String.raw`**אסימפטוטה אנכית** $x=a$: כאשר $x\to a$ (מצד אחד לפחות) $f(x)\to\pm\infty$. במנה – אפס של המכנה שאינו אפס של המונה.`,
      String.raw`**״חור״ בגרף**: אם $x=a$ מאפס גם את המונה וגם את המכנה, מצמצמים את הגורם $(x-a)$. אם אחרי הצמצום המכנה כבר אינו מתאפס ב-$a$, אין שם אסימפטוטה אלא נקודה חסרה בגרף.`,
      String.raw`**אסימפטוטה אופקית** $y=b$: $\lim_{x\to\infty}f(x)=b$ או $\lim_{x\to-\infty}f(x)=b$. במנת פולינומים: מעלת המונה קטנה – $y=0$; מעלות שוות – $y$ שווה למנת המקדמים המובילים; מעלת המונה גדולה – אין אסימפטוטה אופקית.`,
      String.raw`**חישוב הגבול באינסוף**: מחלקים מונה ומכנה בחזקה הגבוהה של $x$ שבמכנה. בשורש זכרו ש-$\sqrt{x^2}=|x|$, ולכן הגבולות ב-$\infty$ וב-$-\infty$ יכולים להיות שונים.`,
      String.raw`**התנהגות ליד אסימפטוטה אנכית**: בודקים את סימני המונה והמכנה משני צדי $a$, כדי לדעת אם $f\to+\infty$ או $f\to-\infty$ בכל צד.`,
      String.raw`גרף **יכול לחתוך** אסימפטוטה אופקית (בתחום סופי); כדי למצוא היכן – פותרים $f(x)=b$. אסימפטוטה אנכית הגרף אינו חותך.`,
    ],
    exercises: [
      {
        id: 'calc-asymptotes-1',
        difficulty: 1,
        statement: String.raw`מצאו את האסימפטוטות המקבילות לצירים של הפונקציה $f(x)=\frac{3}{x-2}+1$, ותארו את התנהגות הפונקציה משני צדי האסימפטוטה האנכית.`,
        hints: [
          String.raw`היכן הפונקציה אינה מוגדרת?`,
          String.raw`כאשר $x\to\pm\infty$, השבר $\frac{3}{x-2}$ שואף ל-$0$.`,
        ],
        solutionSteps: [
          String.raw`הפונקציה אינה מוגדרת ב-$x=2$, ושם המונה $3\ne0$, ולכן $x=2$ אסימפטוטה אנכית.`,
          String.raw`כאשר $x\to2^+$ המכנה חיובי וקטן, ולכן $\frac{3}{x-2}\to+\infty$ ו-$f(x)\to+\infty$; כאשר $x\to2^-$ המכנה שלילי וקטן, ולכן $f(x)\to-\infty$.`,
          String.raw`כאשר $x\to\pm\infty$, $\frac{3}{x-2}\to0$, ולכן $f(x)\to1$: אסימפטוטה אופקית $y=1$.`,
        ],
        finalAnswer: String.raw`$x=2$ (משמאל $f\to-\infty$, מימין $f\to+\infty$) ו-$y=1$.`,
        answers: [
          { label: 'האסימפטוטה האנכית $x=$', value: 2 },
          { label: 'האסימפטוטה האופקית $y=$', value: 1 },
        ],
      },
      {
        id: 'calc-asymptotes-2',
        difficulty: 1,
        statement: String.raw`מצאו את האסימפטוטות המקבילות לצירים של הפונקציה $f(x)=\frac{2x+1}{x-3}$.`,
        hints: [
          String.raw`אסימפטוטה אנכית: אפס של המכנה שאינו מאפס את המונה.`,
          String.raw`לאסימפטוטה אופקית חלקו מונה ומכנה ב-$x$.`,
        ],
        solutionSteps: [
          String.raw`המכנה מתאפס ב-$x=3$, ושם המונה $2\cdot3+1=7\ne0$, ולכן $x=3$ אסימפטוטה אנכית.`,
          String.raw`$f(x)=\frac{2+\frac1x}{1-\frac3x}\to\frac21=2$ כאשר $x\to\pm\infty$, ולכן $y=2$ אסימפטוטה אופקית (מעלות שוות – מנת המקדמים המובילים).`,
        ],
        finalAnswer: String.raw`$x=3$ ו-$y=2$.`,
        answers: [
          { label: 'האסימפטוטה האנכית $x=$', value: 3 },
          { label: 'האסימפטוטה האופקית $y=$', value: 2 },
        ],
      },
      {
        id: 'calc-asymptotes-3',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x^2-x-2}{x^2-4}$. מצאו את תחום ההגדרה ואת האסימפטוטות המקבילות לצירים. האם הישר $x=2$ הוא אסימפטוטה? נמקו.`,
        hints: [
          String.raw`פרקו את המונה ואת המכנה לגורמים.`,
          String.raw`$x^2-x-2=(x-2)(x+1)$ ו-$x^2-4=(x-2)(x+2)$.`,
          String.raw`אחרי הצמצום, בדקו לאיזה ערך שואפת הפונקציה כאשר $x\to2$.`,
        ],
        solutionSteps: [
          String.raw`תחום: $x^2-4\ne0$, כלומר $x\ne\pm2$.`,
          String.raw`פירוק: $f(x)=\frac{(x-2)(x+1)}{(x-2)(x+2)}$, ועבור $x\ne2$: $f(x)=\frac{x+1}{x+2}$.`,
          String.raw`ב-$x=-2$ המכנה מתאפס והמונה המצומצם $-1\ne0$: $x=-2$ אסימפטוטה אנכית.`,
          String.raw`ב-$x=2$ הגורם מצטמצם, ו-$f(x)\to\frac34$ כאשר $x\to2$ – ערכים סופיים, ולכן $x=2$ אינו אסימפטוטה: בגרף יש ״חור״ בנקודה $\left(2,\frac34\right)$.`,
          String.raw`מעלות המונה והמכנה שוות ($2$) ומנת המקדמים המובילים $\frac11$: אסימפטוטה אופקית $y=1$.`,
        ],
        finalAnswer: String.raw`$x\ne\pm2$; אסימפטוטות $x=-2$ ו-$y=1$. $x=2$ אינו אסימפטוטה (״חור״ ב-$\left(2,\frac34\right)$).`,
        answers: [
          { label: 'האסימפטוטה האנכית $x=$', value: -2 },
          { label: 'האסימפטוטה האופקית $y=$', value: 1 },
          { label: String.raw`$y$ של ה״חור״ בגרף`, value: 0.75 },
        ],
      },
      {
        id: 'calc-asymptotes-4',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x^2+1}{x^2-2x-3}$.

א. מצאו את האסימפטוטות המקבילות לצירים.

ב. האם גרף הפונקציה חותך את האסימפטוטה האופקית? אם כן – מצאו את נקודת החיתוך.`,
        hints: [
          String.raw`$x^2-2x-3=(x-3)(x+1)$, והמונה $x^2+1$ חיובי תמיד.`,
          String.raw`לסעיף ב פתרו $f(x)=1$.`,
        ],
        solutionSteps: [
          String.raw`$x^2-2x-3=(x-3)(x+1)$ מתאפס ב-$x=3$ וב-$x=-1$; המונה $x^2+1>0$ תמיד, ולכן $x=-1$ ו-$x=3$ אסימפטוטות אנכיות.`,
          String.raw`מעלות שוות ומקדמים מובילים $1$ ו-$1$: אסימפטוטה אופקית $y=1$.`,
          String.raw`חיתוך עם $y=1$: $x^2+1=x^2-2x-3\iff2x=-4\iff x=-2$ (בתחום ההגדרה).`,
          String.raw`לכן הגרף חותך את האסימפטוטה האופקית בנקודה $(-2,1)$.`,
        ],
        finalAnswer: String.raw`$x=-1$, $x=3$, $y=1$; הגרף חותך את $y=1$ בנקודה $(-2,1)$.`,
        answers: [
          { label: 'האסימפטוטה האנכית השמאלית $x=$', value: -1 },
          { label: 'האסימפטוטה האנכית הימנית $x=$', value: 3 },
          { label: 'האסימפטוטה האופקית $y=$', value: 1 },
          { label: String.raw`$x$ של נקודת החיתוך עם האסימפטוטה האופקית`, value: -2 },
        ],
      },
      {
        id: 'calc-asymptotes-5',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x}{\sqrt{x^2+4}}$. הראו שאין לה אסימפטוטה אנכית, ומצאו את האסימפטוטות האופקיות שלה (כאשר $x\to\infty$ וכאשר $x\to-\infty$).`,
        hints: [
          String.raw`$x^2+4>0$ לכל $x$.`,
          String.raw`$\sqrt{x^2+4}=|x|\sqrt{1+\frac4{x^2}}$.`,
          String.raw`עבור $x>0$: $|x|=x$; עבור $x<0$: $|x|=-x$.`,
        ],
        solutionSteps: [
          String.raw`$x^2+4\ge4>0$, ולכן המכנה מוגדר ושונה מאפס לכל $x$ – אין אסימפטוטה אנכית.`,
          String.raw`נוציא $x^2$ מהשורש: $\sqrt{x^2+4}=\sqrt{x^2}\cdot\sqrt{1+\frac{4}{x^2}}=|x|\sqrt{1+\frac4{x^2}}$.`,
          String.raw`עבור $x>0$: $f(x)=\frac{x}{x\sqrt{1+\frac4{x^2}}}=\frac{1}{\sqrt{1+\frac4{x^2}}}\to1$ כאשר $x\to\infty$: אסימפטוטה $y=1$.`,
          String.raw`עבור $x<0$: $|x|=-x$, ולכן $f(x)=\frac{-1}{\sqrt{1+\frac4{x^2}}}\to-1$ כאשר $x\to-\infty$: אסימפטוטה $y=-1$.`,
        ],
        finalAnswer: String.raw`אין אסימפטוטה אנכית; $y=1$ (כאשר $x\to\infty$) ו-$y=-1$ (כאשר $x\to-\infty$).`,
        answers: [
          { label: String.raw`האסימפטוטה כאשר $x\to\infty$: $y=$`, value: 1 },
          { label: String.raw`האסימפטוטה כאשר $x\to-\infty$: $y=$`, value: -1 },
        ],
      },
      {
        id: 'calc-asymptotes-6',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{2\sqrt{x}+1}{\sqrt{x}-1}$. מצאו את תחום ההגדרה ואת האסימפטוטות המקבילות לצירים.`,
        hints: [
          String.raw`שני תנאים: השורש מוגדר, והמכנה שונה מאפס.`,
          String.raw`לאסימפטוטה אופקית חלקו מונה ומכנה ב-$\sqrt x$.`,
        ],
        solutionSteps: [
          String.raw`תחום: $x\ge0$ (בגלל השורש) ו-$\sqrt x\ne1$, כלומר $x\ge0$, $x\ne1$.`,
          String.raw`ב-$x=1$ המכנה מתאפס והמונה $2\cdot1+1=3\ne0$, ולכן $x=1$ אסימפטוטה אנכית (כאשר $x\to1^+$, $f\to+\infty$; כאשר $x\to1^-$, $f\to-\infty$).`,
          String.raw`כאשר $x\to\infty$ נחלק מונה ומכנה ב-$\sqrt x$: $f(x)=\frac{2+\frac{1}{\sqrt x}}{1-\frac1{\sqrt x}}\to\frac21=2$. אסימפטוטה אופקית $y=2$ (רק בכיוון $x\to\infty$, כי התחום אינו כולל ערכים שליליים).`,
        ],
        finalAnswer: String.raw`$x\ge0$, $x\ne1$; אסימפטוטות $x=1$ ו-$y=2$.`,
        answers: [
          { label: 'האסימפטוטה האנכית $x=$', value: 1 },
          { label: 'האסימפטוטה האופקית $y=$', value: 2 },
        ],
      },
      {
        id: 'calc-asymptotes-7',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{ax^2+3}{x^2+bx}$, כאשר $a$ ו-$b$ פרמטרים. ידוע שהישרים $x=2$ ו-$y=3$ הם אסימפטוטות של גרף הפונקציה.

א. מצאו את $a$ ואת $b$.

ב. לגרף יש אסימפטוטה אנכית נוספת. מצאו אותה.

ג. מצאו את נקודת החיתוך של גרף הפונקציה עם האסימפטוטה האופקית.`,
        hints: [
          String.raw`מעלות המונה והמכנה שוות, ולכן האסימפטוטה האופקית היא $y=a$.`,
          String.raw`$x=2$ מאפס את המכנה: $4+2b=0$.`,
          String.raw`המכנה $x^2+bx=x(x+b)$ מתאפס בשתי נקודות.`,
        ],
        solutionSteps: [
          String.raw`מעלות המונה והמכנה שוות ($2$), ולכן האסימפטוטה האופקית היא $y=\frac a1=a$, ומכאן $a=3$.`,
          String.raw`אסימפטוטה אנכית $x=2$ – המכנה מתאפס בה: $4+2b=0$, ולכן $b=-2$. בדיקה: המונה $3\cdot4+3=15\ne0$, כנדרש.`,
          String.raw`$f(x)=\frac{3x^2+3}{x^2-2x}=\frac{3x^2+3}{x(x-2)}$. המכנה מתאפס גם ב-$x=0$, ושם המונה $3\ne0$: אסימפטוטה אנכית נוספת $x=0$.`,
          String.raw`חיתוך עם $y=3$: $3x^2+3=3(x^2-2x)\iff3=-6x\iff x=-\frac12$, הנקודה $\left(-\frac12,3\right)$.`,
        ],
        finalAnswer: String.raw`$a=3$, $b=-2$; אסימפטוטה נוספת $x=0$; נקודת החיתוך $\left(-\frac12,3\right)$.`,
        answers: [
          { label: String.raw`$a$`, value: 3 },
          { label: String.raw`$b$`, value: -2 },
          { label: 'האסימפטוטה האנכית הנוספת $x=$', value: 0 },
          { label: String.raw`$x$ של נקודת החיתוך עם $y=3$`, value: -0.5 },
        ],
      },
      {
        id: 'calc-asymptotes-8',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{\cos x}{1-2\sin x}$ בתחום $0\le x\le\pi$. מצאו את האסימפטוטות האנכיות של הפונקציה בתחום, ותארו את התנהגות הפונקציה משני צדי כל אחת מהן.`,
        hints: [
          String.raw`המכנה מתאפס כאשר $\sin x=\frac12$.`,
          String.raw`בדקו שהמונה $\cos x$ אינו מתאפס באותן נקודות.`,
          String.raw`בין $\frac\pi6$ ל-$\frac{5\pi}6$ מתקיים $\sin x>\frac12$, ולכן המכנה שלילי שם.`,
        ],
        solutionSteps: [
          String.raw`$1-2\sin x=0\iff\sin x=\frac12\iff x=\frac\pi6+2\pi k$ או $x=\frac{5\pi}6+2\pi k$. בתחום: $x=\frac\pi6$ ו-$x=\frac{5\pi}6$.`,
          String.raw`המונה בנקודות אלה: $\cos\frac\pi6=\frac{\sqrt3}2\ne0$ ו-$\cos\frac{5\pi}6=-\frac{\sqrt3}2\ne0$, ולכן $x=\frac\pi6$ ו-$x=\frac{5\pi}6$ אסימפטוטות אנכיות.`,
          String.raw`סימן המכנה: חיובי עבור $x<\frac\pi6$ ועבור $x>\frac{5\pi}6$ (שם $\sin x<\frac12$), ושלילי ביניהן.`,
          String.raw`ליד $x=\frac\pi6$ המונה חיובי: $f\to+\infty$ כאשר $x\to\left(\frac\pi6\right)^-$, ו-$f\to-\infty$ כאשר $x\to\left(\frac\pi6\right)^+$.`,
          String.raw`ליד $x=\frac{5\pi}6$ המונה שלילי: $f\to+\infty$ כאשר $x\to\left(\frac{5\pi}6\right)^-$ (מונה ומכנה שליליים), ו-$f\to-\infty$ כאשר $x\to\left(\frac{5\pi}6\right)^+$.`,
        ],
        finalAnswer: String.raw`$x=\frac\pi6$ ו-$x=\frac{5\pi}6$; בשתיהן $f\to+\infty$ משמאל ו-$f\to-\infty$ מימין.`,
        answers: [
          { label: 'האסימפטוטה האנכית השמאלית $x=$', value: Math.PI / 6 },
          { label: 'האסימפטוטה האנכית הימנית $x=$', value: (5 * Math.PI) / 6 },
        ],
      },
    ],
  },

  'calc-concavity': {
    intro: String.raw`הנגזרת השנייה $f''(x)$ היא הנגזרת של $f'(x)$, והיא מתארת את הקעירות של הגרף: היכן הוא קעור כלפי מעלה ($\cup$) והיכן כלפי מטה ($\cap$). נקודה על הגרף שבה הקעירות מתחלפת נקראת נקודת פיתול. בעזרת $f''$ אפשר גם לקבוע את סוג הקיצון בלי טבלת סימנים. הנושא מופיע כסעיף בחקירה בשאלות 6 ו-7, וקשור ישירות לשאלות על הקשר בין גרף הפונקציה לגרף הנגזרת.`,
    keyFacts: [
      String.raw`**קעירות**: אם $f''(x)>0$ בקטע – הגרף קעור כלפי מעלה ($\cup$) והשיפוע $f'$ עולה; אם $f''(x)<0$ – קעור כלפי מטה ($\cap$) והשיפוע יורד.`,
      String.raw`**נקודת פיתול**: נקודה על הגרף שבה הקעירות מתחלפת, כלומר $f''$ מחליפה סימן. מועמדות: $f''(x)=0$ – אבל חייבים לבדוק החלפת סימן. למשל ל-$f(x)=x^4$ יש $f''(0)=0$ ואין פיתול.`,
      String.raw`**מבחן הנגזרת השנייה**: אם $f'(x_0)=0$ ו-$f''(x_0)<0$ – מקסימום; אם $f''(x_0)>0$ – מינימום; אם $f''(x_0)=0$ – המבחן אינו מכריע, וחוזרים לטבלת הסימנים של $f'$.`,
      String.raw`**נקודת פיתול היא נקודת קיצון של $f'$**: בה שיפוע המשיק הגדול ביותר או הקטן ביותר בסביבתה. אם בנוסף $f'=0$ שם – זו ״נקודת פיתול עם משיק אופקי״, ולא נקודת קיצון.`,
      String.raw`נקודה שאינה בתחום ההגדרה (למשל אסימפטוטה אנכית) אינה נקודת פיתול, גם אם הקעירות מתחלפת משני צדיה.`,
    ],
    exercises: [
      {
        id: 'calc-concavity-1',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-6x^2+4$. מצאו את נקודת הפיתול של הפונקציה ואת תחומי הקעירות שלה.`,
        hints: [
          String.raw`גזרו פעמיים: $f'(x)=3x^2-12x$.`,
          String.raw`$f''(x)=6x-12$. היכן היא מתאפסת, והאם היא מחליפה שם סימן?`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3x^2-12x$, ולכן $f''(x)=6x-12$.`,
          String.raw`$f''(x)=0\iff x=2$; $f''<0$ עבור $x<2$ ו-$f''>0$ עבור $x>2$ – הקעירות מתחלפת.`,
          String.raw`$f(2)=8-24+4=-12$, ולכן נקודת הפיתול $(2,-12)$. הגרף קעור כלפי מטה ($\cap$) ב-$x<2$ וקעור כלפי מעלה ($\cup$) ב-$x>2$.`,
        ],
        finalAnswer: String.raw`נקודת פיתול $(2,-12)$; $\cap$ ב-$x<2$, $\cup$ ב-$x>2$.`,
        answers: [
          { label: String.raw`$x$ של נקודת הפיתול`, value: 2 },
          { label: String.raw`$y$ של נקודת הפיתול`, value: -12 },
        ],
      },
      {
        id: 'calc-concavity-2',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=x^4-6x^2$. מצאו את נקודות הפיתול של הפונקציה ואת תחומי הקעירות שלה.`,
        hints: [
          String.raw`$f'(x)=4x^3-12x$ ו-$f''(x)=12x^2-12$.`,
          String.raw`$f''(x)=12(x-1)(x+1)$ – בדקו את הסימן בשלושה קטעים.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=4x^3-12x$, ו-$f''(x)=12x^2-12=12(x-1)(x+1)$.`,
          String.raw`$f''>0$ עבור $x<-1$ ועבור $x>1$, ו-$f''<0$ עבור $-1<x<1$ – הסימן מתחלף ב-$x=\pm1$.`,
          String.raw`$f(\pm1)=1-6=-5$, ולכן נקודות הפיתול $(-1,-5)$ ו-$(1,-5)$. קעורה כלפי מעלה ב-$x<-1$ וב-$x>1$, וכלפי מטה ב-$-1<x<1$.`,
        ],
        finalAnswer: String.raw`נקודות פיתול $(\pm1,-5)$; $\cup$ ב-$|x|>1$, $\cap$ ב-$|x|<1$.`,
        answers: [
          { label: String.raw`$x$ החיובי של נקודת פיתול`, value: 1 },
          { label: String.raw`$y$ של נקודות הפיתול`, value: -5 },
        ],
      },
      {
        id: 'calc-concavity-3',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x^4-4x^3$.

א. מצאו את נקודות הפיתול ואת תחומי הקעירות.

ב. מצאו את נקודות הקיצון. הסבירו מדוע $x=0$ אינה נקודת קיצון אף ש-$f'(0)=0$.`,
        hints: [
          String.raw`$f'(x)=4x^3-12x^2=4x^2(x-3)$ ו-$f''(x)=12x^2-24x=12x(x-2)$.`,
          String.raw`בדקו בטבלת סימנים אם $f''$ מחליפה סימן ב-$x=0$ וב-$x=2$.`,
          String.raw`הגורם $4x^2$ בנגזרת אינו שלילי – מה זה אומר על הסימן של $f'$ משני צדי $x=0$?`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=4x^3-12x^2=4x^2(x-3)$, ו-$f''(x)=12x^2-24x=12x(x-2)$.`,
          String.raw`$f''$ מתאפסת ב-$x=0$ וב-$x=2$: חיובית עבור $x<0$, שלילית עבור $0<x<2$, חיובית עבור $x>2$ – הסימן מתחלף בשתיהן.`,
          String.raw`נקודות פיתול: $(0,0)$ ו-$(2,16-32)=(2,-16)$. קעורה כלפי מעלה ב-$x<0$ וב-$x>2$, וכלפי מטה ב-$0<x<2$.`,
          String.raw`$f'(x)=4x^2(x-3)$: הגורם $4x^2\ge0$, ולכן סימן $f'$ כסימן $x-3$ – שלילי עבור $x<3$ (פרט לאיפוס ב-$x=0$) וחיובי עבור $x>3$.`,
          String.raw`לכן יש מינימום יחיד בנקודה $(3,81-108)=(3,-27)$. ב-$x=0$ הנגזרת מתאפסת אך אינה מחליפה סימן – זו נקודת פיתול עם משיק אופקי, ולא קיצון.`,
        ],
        finalAnswer: String.raw`נקודות פיתול $(0,0)$ ו-$(2,-16)$; מינימום $(3,-27)$; ב-$x=0$ פיתול עם משיק אופקי.`,
        answers: [
          { label: String.raw`$x$ של נקודת הפיתול שאינה בראשית`, value: 2 },
          { label: String.raw`$y$ של נקודת הפיתול שאינה בראשית`, value: -16 },
          { label: String.raw`$x$ של נקודת המינימום`, value: 3 },
          { label: String.raw`$y$ של נקודת המינימום`, value: -27 },
        ],
      },
      {
        id: 'calc-concavity-4',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x+\frac{4}{x}$.

א. מצאו את נקודות הקיצון וקבעו את סוגן בעזרת הנגזרת השנייה.

ב. מצאו את תחומי הקעירות. האם יש לפונקציה נקודת פיתול?`,
        hints: [
          String.raw`$f'(x)=1-\frac{4}{x^2}$ ו-$f''(x)=\frac{8}{x^3}$.`,
          String.raw`הציבו את הנקודות החשודות ב-$f''$ ובדקו את הסימן.`,
          String.raw`היכן $f''$ מחליפה סימן? האם הנקודה בתחום ההגדרה?`,
        ],
        solutionSteps: [
          String.raw`תחום: $x\ne0$. $f'(x)=1-\frac4{x^2}$, ומתאפסת כאשר $x^2=4$, כלומר $x=\pm2$.`,
          String.raw`$f''(x)=\left(-4x^{-2}\right)'=8x^{-3}=\frac{8}{x^3}$.`,
          String.raw`$f''(2)=1>0$ – מינימום: $f(2)=2+2=4$. $f''(-2)=-1<0$ – מקסימום: $f(-2)=-4$.`,
          String.raw`$f''(x)=\frac8{x^3}$ חיובית עבור $x>0$ (קעורה כלפי מעלה) ושלילית עבור $x<0$ (קעורה כלפי מטה).`,
          String.raw`הקעירות מתחלפת רק ב-$x=0$, שאינו בתחום ההגדרה – לכן אין לפונקציה נקודת פיתול.`,
        ],
        finalAnswer: String.raw`מינימום $(2,4)$, מקסימום $(-2,-4)$; $\cup$ ב-$x>0$, $\cap$ ב-$x<0$; אין נקודת פיתול.`,
        answers: [
          { label: String.raw`$x$ של נקודת המינימום`, value: 2 },
          { label: String.raw`$y$ של נקודת המינימום`, value: 4 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: -4 },
        ],
      },
      {
        id: 'calc-concavity-5',
        difficulty: 2,
        statement: String.raw`לגרף הפונקציה $f(x)=x^3+ax^2+bx$ יש נקודת פיתול $(1,-2)$. מצאו את $a$ ואת $b$, ואת שיפוע המשיק לגרף בנקודת הפיתול.`,
        hints: [
          String.raw`בנקודת הפיתול $f''(1)=0$, והנקודה נמצאת על הגרף: $f(1)=-2$.`,
          String.raw`$f''(x)=6x+2a$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3x^2+2ax+b$ ו-$f''(x)=6x+2a$.`,
          String.raw`נקודת פיתול ב-$x=1$: $f''(1)=6+2a=0$, ולכן $a=-3$ (ואז $f''(x)=6x-6$ אכן מחליפה סימן ב-$x=1$).`,
          String.raw`הנקודה על הגרף: $f(1)=1-3+b=-2$, ולכן $b=0$.`,
          String.raw`$f(x)=x^3-3x^2$, ו-$f'(1)=3-6=-3$ – שיפוע המשיק בנקודת הפיתול.`,
        ],
        finalAnswer: String.raw`$a=-3$, $b=0$; שיפוע המשיק בנקודת הפיתול $-3$.`,
        answers: [
          { label: String.raw`$a$`, value: -3 },
          { label: String.raw`$b$`, value: 0 },
          { label: 'שיפוע המשיק בנקודת הפיתול', value: -3 },
        ],
      },
      {
        id: 'calc-concavity-6',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\sin x+\cos x$ בתחום $0\le x\le2\pi$. מצאו את נקודות הפיתול של הפונקציה ואת תחומי הקעירות שלה בתחום.`,
        hints: [
          String.raw`$f''(x)=-\sin x-\cos x$.`,
          String.raw`$f''(x)=0\iff\sin x=-\cos x\iff\tan x=-1$ (כאשר $\cos x\ne0$).`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\cos x-\sin x$, ו-$f''(x)=-\sin x-\cos x$.`,
          String.raw`$f''(x)=0\iff\sin x=-\cos x$. $\cos x=0$ אינו פתרון (אז $\sin x=\pm1$), ולכן נחלק ב-$\cos x$: $\tan x=-1$, כלומר $x=\frac{3\pi}4+\pi k$.`,
          String.raw`בתחום: $x=\frac{3\pi}4$ ו-$x=\frac{7\pi}4$, ובשתיהן $f(x)=0$.`,
          String.raw`סימן $f''$: שלילי ב-$0\le x<\frac{3\pi}4$ (למשל $f''(0)=-1$), חיובי ב-$\frac{3\pi}4<x<\frac{7\pi}4$ (למשל $f''(\pi)=1$), שלילי ב-$\frac{7\pi}4<x\le2\pi$.`,
          String.raw`נקודות פיתול: $\left(\frac{3\pi}4,0\right)$ ו-$\left(\frac{7\pi}4,0\right)$. קעורה כלפי מטה ב-$0\le x<\frac{3\pi}4$ וב-$\frac{7\pi}4<x\le2\pi$, וכלפי מעלה ב-$\frac{3\pi}4<x<\frac{7\pi}4$.`,
        ],
        finalAnswer: String.raw`נקודות פיתול $\left(\frac{3\pi}4,0\right)$, $\left(\frac{7\pi}4,0\right)$; $\cup$ ב-$\frac{3\pi}4<x<\frac{7\pi}4$, $\cap$ בשאר התחום.`,
        answers: [
          { label: String.raw`$x$ של נקודת הפיתול השמאלית`, value: (3 * Math.PI) / 4 },
          { label: String.raw`$x$ של נקודת הפיתול הימנית`, value: (7 * Math.PI) / 4 },
        ],
      },
      {
        id: 'calc-concavity-7',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-3x^2+5$. מצאו את הנקודה על גרף הפונקציה שבה שיפוע המשיק הוא הקטן ביותר, ואת משוואת המשיק בנקודה זו. הראו שזו נקודת הפיתול של הפונקציה.`,
        hints: [
          String.raw`שיפוע המשיק בנקודה שבה שיעור ה-$x$ הוא $x$ הוא $f'(x)=3x^2-6x$ – פונקציה ריבועית של $x$.`,
          String.raw`מצאו את המינימום של $f'$: גזרו אותה (זו $f''$) והשוו לאפס.`,
        ],
        solutionSteps: [
          String.raw`שיפוע המשיק בנקודה שבה שיעור ה-$x$ הוא $x$: $g(x)=f'(x)=3x^2-6x$.`,
          String.raw`$g'(x)=f''(x)=6x-6=0\iff x=1$, ו-$g''(x)=6>0$ – זה מינימום של השיפוע (קודקוד של פרבולה ״מחייכת״).`,
          String.raw`ב-$x=1$ הנגזרת השנייה $f''$ עוברת משלילית לחיובית – הקעירות מתחלפת, ולכן זו נקודת הפיתול: $f(1)=1-3+5=3$, הנקודה $(1,3)$.`,
          String.raw`השיפוע הקטן ביותר: $f'(1)=3-6=-3$, והמשיק: $y-3=-3(x-1)$, כלומר $y=-3x+6$.`,
        ],
        finalAnswer: String.raw`הנקודה $(1,3)$ (נקודת הפיתול); השיפוע הקטן ביותר $-3$; המשיק $y=-3x+6$.`,
        answers: [
          { label: String.raw`$x$ של הנקודה`, value: 1 },
          { label: String.raw`$y$ של הנקודה`, value: 3 },
          { label: 'השיפוע הקטן ביותר', value: -3 },
          { label: 'המקדם החופשי של המשיק', value: 6 },
        ],
      },
      {
        id: 'calc-concavity-8',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x}{x^2+3}$.

א. הראו ש-$f''(x)=\frac{2x(x^2-9)}{(x^2+3)^3}$.

ב. מצאו את נקודות הפיתול של הפונקציה ואת תחומי הקעירות.`,
        hints: [
          String.raw`$f'(x)=\frac{3-x^2}{(x^2+3)^2}$ (כלל המנה).`,
          String.raw`גזרו שוב בכלל המנה, עם $\big((x^2+3)^2\big)'=2(x^2+3)\cdot2x$; הוציאו גורם משותף $(x^2+3)$ מהמונה וצמצמו.`,
          String.raw`סימן $f''$ כסימן $2x(x^2-9)=2x(x-3)(x+3)$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\frac{1\cdot(x^2+3)-x\cdot2x}{(x^2+3)^2}=\frac{3-x^2}{(x^2+3)^2}$.`,
          String.raw`לפי כלל המנה, עם $\big((x^2+3)^2\big)'=2(x^2+3)\cdot2x$: $f''(x)=\frac{-2x(x^2+3)^2-(3-x^2)\cdot4x(x^2+3)}{(x^2+3)^4}$.`,
          String.raw`נצמצם ב-$(x^2+3)$: $f''(x)=\frac{-2x(x^2+3)-4x(3-x^2)}{(x^2+3)^3}=\frac{2x^3-18x}{(x^2+3)^3}=\frac{2x(x^2-9)}{(x^2+3)^3}$, כנדרש.`,
          String.raw`המכנה חיובי, ולכן סימן $f''$ כסימן $2x(x-3)(x+3)$: שלילי עבור $x<-3$, חיובי עבור $-3<x<0$, שלילי עבור $0<x<3$, חיובי עבור $x>3$.`,
          String.raw`הסימן מתחלף ב-$x=-3$, $x=0$, $x=3$: נקודות הפיתול $\left(-3,-\frac14\right)$, $(0,0)$, $\left(3,\frac14\right)$.`,
          String.raw`קעורה כלפי מעלה ב-$-3<x<0$ וב-$x>3$; כלפי מטה ב-$x<-3$ וב-$0<x<3$.`,
        ],
        finalAnswer: String.raw`נקודות פיתול $\left(-3,-\frac14\right)$, $(0,0)$, $\left(3,\frac14\right)$; $\cup$ ב-$-3<x<0$ וב-$x>3$, $\cap$ ב-$x<-3$ וב-$0<x<3$.`,
        answers: [
          { label: 'מספר נקודות הפיתול', value: 3 },
          { label: String.raw`$x$ של נקודת הפיתול הימנית`, value: 3 },
          { label: String.raw`$y$ של נקודת הפיתול הימנית`, value: 0.25 },
        ],
      },
    ],
  },

  'calc-investigate-polynomial': {
    intro: String.raw`חקירת פולינום היא החקירה הפשוטה ביותר: התחום הוא כל המספרים, אין אסימפטוטות, והגרף רציף וחלק. עוברים לפי הסדר: נקודות חיתוך עם הצירים (פירוק לגורמים, ולפעמים הצבה $t=x^2$), נגזרת, נקודות קיצון ותחומי עלייה וירידה, ולפי הצורך נקודות פיתול – ובסוף משרטטים סקיצה. בשאלה 6 הסקיצה משמשת לסעיפי המשך, למשל לקביעת מספר הפתרונות של המשוואה $f(x)=k$.`,
    keyFacts: [
      String.raw`**סדר החקירה**: (1) תחום – כל $x$; (2) חיתוך עם הצירים: $f(0)$, ופתרון $f(x)=0$; (3) $f'(x)$, נקודות חשודות וטבלת סימנים; (4) סוג הקיצון וערכו; (5) לפי הצורך $f''$ ונקודות פיתול; (6) סקיצה.`,
      String.raw`**זוגיות**: אם $f(-x)=f(x)$ (רק חזקות זוגיות של $x$) הגרף סימטרי לציר $y$; אם $f(-x)=-f(x)$ (רק חזקות אי-זוגיות) הגרף סימטרי לראשית הצירים. אז מספיק לחקור את $x\ge0$.`,
      String.raw`**שורש כפול**: אם $(x-a)^2$ הוא גורם של $f$, הגרף **משיק** לציר $x$ ב-$x=a$ (ושם יש מינימום או מקסימום), ואינו חוצה אותו.`,
      String.raw`**התנהגות בקצוות**: פולינום ממעלה אי-זוגית עם מקדם מוביל חיובי שואף ל-$-\infty$ משמאל ול-$+\infty$ מימין; פולינום ממעלה זוגית שואף לאותו כיוון בשני הצדדים.`,
      String.raw`**מספר הפתרונות של $f(x)=k$** הוא מספר נקודות החיתוך של הגרף עם הישר האופקי $y=k$; משווים את $k$ לערכי הקיצון.`,
    ],
    exercises: [
      {
        id: 'calc-investigate-polynomial-1',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-3x^2$. מצאו את נקודות החיתוך של הגרף עם הצירים, את נקודות הקיצון וסוגן ואת תחומי העלייה והירידה.`,
        hints: [
          String.raw`חיתוך עם ציר $x$: $x^2(x-3)=0$.`,
          String.raw`$f'(x)=3x^2-6x=3x(x-2)$.`,
        ],
        solutionSteps: [
          String.raw`חיתוך עם הצירים: $f(x)=x^2(x-3)=0\iff x=0$ או $x=3$ – הנקודות $(0,0)$ ו-$(3,0)$ (ב-$x=0$ שורש כפול: הגרף משיק לציר $x$).`,
          String.raw`$f'(x)=3x^2-6x=3x(x-2)$: חיובית עבור $x<0$, שלילית עבור $0<x<2$, חיובית עבור $x>2$.`,
          String.raw`מקסימום $(0,0)$; מינימום: $f(2)=8-12=-4$, הנקודה $(2,-4)$.`,
          String.raw`עולה ב-$x<0$ וב-$x>2$, יורדת ב-$0<x<2$.`,
        ],
        finalAnswer: String.raw`חיתוך $(0,0)$, $(3,0)$; מקסימום $(0,0)$, מינימום $(2,-4)$; עולה ב-$x<0$ וב-$x>2$, יורדת ב-$0<x<2$.`,
        answers: [
          { label: String.raw`נקודת החיתוך הנוספת עם ציר $x$: $x=$`, value: 3 },
          { label: String.raw`$x$ של נקודת המינימום`, value: 2 },
          { label: String.raw`$y$ של נקודת המינימום`, value: -4 },
        ],
      },
      {
        id: 'calc-investigate-polynomial-2',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=-x^3+3x+2$.

א. מצאו את נקודות הקיצון וקבעו את סוגן.

ב. הראו ש-$f(x)=-(x+1)^2(x-2)$, ומצאו את נקודות החיתוך של הגרף עם הצירים.`,
        hints: [
          String.raw`$f'(x)=-3x^2+3=-3(x-1)(x+1)$.`,
          String.raw`לבדיקת הפירוק – פתחו סוגריים.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=-3x^2+3=-3(x-1)(x+1)$, מתאפסת ב-$x=\pm1$.`,
          String.raw`$f'<0$ עבור $x<-1$, $f'>0$ עבור $-1<x<1$, $f'<0$ עבור $x>1$.`,
          String.raw`מינימום: $f(-1)=1-3+2=0$, הנקודה $(-1,0)$. מקסימום: $f(1)=-1+3+2=4$, הנקודה $(1,4)$.`,
          String.raw`פתיחת סוגריים: $-(x^2+2x+1)(x-2)=-(x^3-3x-2)=-x^3+3x+2$, כנדרש.`,
          String.raw`חיתוך עם ציר $x$: $x=-1$ (שורש כפול – הגרף משיק לציר בנקודת המינימום) ו-$x=2$. חיתוך עם ציר $y$: $(0,2)$.`,
        ],
        finalAnswer: String.raw`מינימום $(-1,0)$, מקסימום $(1,4)$; חיתוך $(-1,0)$, $(2,0)$, $(0,2)$.`,
        answers: [
          { label: String.raw`$x$ של נקודת המקסימום`, value: 1 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 4 },
          { label: String.raw`הנקודה שבה הגרף חוצה את ציר $x$: $x=$`, value: 2 },
          { label: String.raw`נקודת החיתוך עם ציר $y$: $y=$`, value: 2 },
        ],
      },
      {
        id: 'calc-investigate-polynomial-3',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x^4-4x^3+4x^2$. חקרו את הפונקציה: נקודות חיתוך עם הצירים, נקודות קיצון וסוגן, ותחומי עלייה וירידה. תארו את הסקיצה.`,
        hints: [
          String.raw`הוציאו $x^2$ כגורם משותף: $f(x)=x^2(x^2-4x+4)$, וזה ריבוע של בינום.`,
          String.raw`$f'(x)=4x^3-12x^2+8x=4x(x-1)(x-2)$.`,
        ],
        solutionSteps: [
          String.raw`$f(x)=x^2(x^2-4x+4)=x^2(x-2)^2\ge0$ לכל $x$. חיתוך עם הצירים: $(0,0)$ ו-$(2,0)$ – בשתיהן שורש כפול, והגרף משיק לציר $x$.`,
          String.raw`$f'(x)=4x^3-12x^2+8x=4x(x^2-3x+2)=4x(x-1)(x-2)$.`,
          String.raw`סימן $f'$: שלילי עבור $x<0$, חיובי עבור $0<x<1$, שלילי עבור $1<x<2$, חיובי עבור $x>2$.`,
          String.raw`מינימום: $(0,0)$ ו-$(2,0)$; מקסימום: $f(1)=1\cdot1=1$, הנקודה $(1,1)$.`,
          String.raw`עולה ב-$0<x<1$ וב-$x>2$, יורדת ב-$x<0$ וב-$1<x<2$. הסקיצה בצורת ״W״: יורדת אל $(0,0)$, עולה אל $(1,1)$, יורדת אל $(2,0)$ ועולה שוב; הגרף סימטרי לישר $x=1$.`,
        ],
        finalAnswer: String.raw`חיתוך $(0,0)$, $(2,0)$; מינימום $(0,0)$, $(2,0)$; מקסימום $(1,1)$; עולה ב-$0<x<1$ וב-$x>2$, יורדת ב-$x<0$ וב-$1<x<2$.`,
        answers: [
          { label: String.raw`$x$ של נקודת המקסימום`, value: 1 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 1 },
          { label: 'מספר נקודות המינימום', value: 2 },
        ],
      },
      {
        id: 'calc-investigate-polynomial-4',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x^4-5x^2+4$. מצאו את נקודות החיתוך של הגרף עם הצירים ואת נקודות הקיצון של הפונקציה, וקבעו את סוגן.`,
        hints: [
          String.raw`חיתוך עם ציר $x$: הציבו $t=x^2$ וקבלו משוואה ריבועית.`,
          String.raw`$f'(x)=4x^3-10x=2x(2x^2-5)$.`,
          String.raw`הפונקציה זוגית – מספיק לחקור את $x\ge0$ ולשקף.`,
        ],
        solutionSteps: [
          String.raw`חיתוך עם ציר $y$: $(0,4)$.`,
          String.raw`חיתוך עם ציר $x$: נציב $t=x^2$: $t^2-5t+4=0$, ולכן $t=1$ או $t=4$, כלומר $x=\pm1$ ו-$x=\pm2$.`,
          String.raw`$f'(x)=4x^3-10x=2x(2x^2-5)$, מתאפסת ב-$x=0$ וב-$x=\pm\sqrt{\frac52}$.`,
          String.raw`סימן $f'$: שלילי עבור $x<-\sqrt{\frac52}$, חיובי עבור $-\sqrt{\frac52}<x<0$, שלילי עבור $0<x<\sqrt{\frac52}$, חיובי עבור $x>\sqrt{\frac52}$.`,
          String.raw`מקסימום $(0,4)$. מינימום ב-$x=\pm\sqrt{\frac52}$: $f=\frac{25}4-\frac{25}2+4=-\frac94$.`,
        ],
        finalAnswer: String.raw`חיתוך: $(\pm1,0)$, $(\pm2,0)$, $(0,4)$; מקסימום $(0,4)$; מינימום $\left(\pm\sqrt{\frac52},-\frac94\right)$.`,
        answers: [
          { label: String.raw`נקודת החיתוך הגדולה ביותר עם ציר $x$: $x=$`, value: 2 },
          { label: String.raw`$x$ החיובי של נקודת מינימום`, value: Math.sqrt(2.5) },
          { label: String.raw`$y$ של נקודות המינימום`, value: -2.25 },
        ],
      },
      {
        id: 'calc-investigate-polynomial-5',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-3x+1$.

א. מצאו את נקודות הקיצון של הפונקציה, קבעו את סוגן ותארו את הסקיצה של הגרף.

ב. בעזרת הסקיצה, קבעו כמה פתרונות יש למשוואה $f(x)=k$ עבור $k=2$, עבור $k=3$ ועבור $k=5$.`,
        hints: [
          String.raw`$f'(x)=3x^2-3=3(x-1)(x+1)$.`,
          String.raw`מספר הפתרונות של $f(x)=k$ הוא מספר נקודות החיתוך של הגרף עם הישר $y=k$.`,
          String.raw`השוו את $k$ לערך המקסימום ולערך המינימום.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3x^2-3=3(x-1)(x+1)$: חיובית עבור $x<-1$, שלילית עבור $-1<x<1$, חיובית עבור $x>1$.`,
          String.raw`מקסימום $(-1,3)$ (כי $f(-1)=-1+3+1=3$), מינימום $(1,-1)$ (כי $f(1)=1-3+1=-1$). הגרף מגיע מ-$-\infty$, עולה עד $(-1,3)$, יורד עד $(1,-1)$ ועולה ל-$+\infty$.`,
          String.raw`$k=2$: $-1<2<3$ – הישר $y=2$ חותך כל אחד משלושת חלקי הגרף (העולה, היורד והעולה): $3$ פתרונות.`,
          String.raw`$k=3$: הישר משיק לגרף בנקודת המקסימום וחותך את החלק הימני: $2$ פתרונות.`,
          String.raw`$k=5$: $5>3$ – רק החלק הימני מגיע לגובה זה: פתרון $1$.`,
        ],
        finalAnswer: String.raw`מקסימום $(-1,3)$, מינימום $(1,-1)$; $3$ פתרונות עבור $k=2$, $2$ עבור $k=3$, $1$ עבור $k=5$.`,
        answers: [
          { label: String.raw`מספר הפתרונות עבור $k=2$`, value: 3 },
          { label: String.raw`מספר הפתרונות עבור $k=3$`, value: 2 },
          { label: String.raw`מספר הפתרונות עבור $k=5$`, value: 1 },
        ],
      },
      {
        id: 'calc-investigate-polynomial-6',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-3x^2+a$. ידוע שנקודת המינימום של הפונקציה נמצאת על ציר $x$.

א. מצאו את $a$.

ב. מצאו את נקודות החיתוך של הגרף עם הצירים.`,
        hints: [
          String.raw`$f'(x)=3x^2-6x=3x(x-2)$. באיזו נקודה יש מינימום?`,
          String.raw`״על ציר $x$״ פירושו $f(x_{\min})=0$.`,
          String.raw`נקודת המינימום שעל הציר היא שורש כפול של $f$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3x^2-6x=3x(x-2)$: חיובית עבור $x<0$, שלילית עבור $0<x<2$, חיובית עבור $x>2$. לכן מקסימום ב-$x=0$ ומינימום ב-$x=2$.`,
          String.raw`המינימום על ציר $x$: $f(2)=8-12+a=0$, ולכן $a=4$.`,
          String.raw`$f(x)=x^3-3x^2+4$. $x=2$ שורש כפול (הגרף משיק לציר שם), ואכן $(x-2)^2(x+1)=(x^2-4x+4)(x+1)=x^3-3x^2+4$.`,
          String.raw`חיתוך עם ציר $x$: $(2,0)$ ו-$(-1,0)$; חיתוך עם ציר $y$: $(0,4)$.`,
        ],
        finalAnswer: String.raw`$a=4$; חיתוך $(-1,0)$, $(2,0)$, $(0,4)$.`,
        answers: [
          { label: String.raw`$a$`, value: 4 },
          { label: String.raw`נקודת החיתוך הנוספת עם ציר $x$: $x=$`, value: -1 },
        ],
      },
      {
        id: 'calc-investigate-polynomial-7',
        difficulty: 3,
        statement: String.raw`לפונקציה $f(x)=ax^3+bx$ יש נקודת מינימום $(1,-2)$.

א. מצאו את $a$ ואת $b$.

ב. הראו שהפונקציה אי-זוגית, והסיקו מהי נקודת המקסימום שלה בלי לגזור שוב.

ג. מצאו את נקודות החיתוך של הגרף עם הצירים ואת נקודת הפיתול.`,
        hints: [
          String.raw`שני תנאים: $f'(1)=0$ ו-$f(1)=-2$.`,
          String.raw`$f'(x)=3ax^2+b$. קבלו מערכת $3a+b=0$, $a+b=-2$.`,
          String.raw`גרף של פונקציה אי-זוגית סימטרי לראשית: הנקודה $(x,y)$ עוברת ל-$(-x,-y)$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3ax^2+b$. תנאים: $f'(1)=3a+b=0$ ו-$f(1)=a+b=-2$.`,
          String.raw`חיסור המשוואות: $2a=2$, כלומר $a=1$, ו-$b=-3$. בדיקה: $f(x)=x^3-3x$, $f''(x)=6x$, $f''(1)=6>0$ – אכן מינימום.`,
          String.raw`$f(-x)=-x^3+3x=-f(x)$ – הפונקציה אי-זוגית והגרף סימטרי לראשית, ולכן למינימום $(1,-2)$ מתאימה נקודת מקסימום $(-1,2)$.`,
          String.raw`חיתוך: $x^3-3x=x(x^2-3)=0$, כלומר $x=0$ או $x=\pm\sqrt3$.`,
          String.raw`$f''(x)=6x$ מחליפה סימן ב-$x=0$: נקודת פיתול $(0,0)$ – מרכז הסימטריה.`,
        ],
        finalAnswer: String.raw`$a=1$, $b=-3$; מקסימום $(-1,2)$; חיתוך $(0,0)$, $(\pm\sqrt3,0)$; פיתול $(0,0)$.`,
        answers: [
          { label: String.raw`$a$`, value: 1 },
          { label: String.raw`$b$`, value: -3 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 2 },
          { label: String.raw`נקודת החיתוך החיובית עם ציר $x$: $x=$`, value: Math.sqrt(3) },
        ],
      },
      {
        id: 'calc-investigate-polynomial-8',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=(x^2-4)^2$.

א. מצאו את נקודות הקיצון של הפונקציה וקבעו את סוגן.

ב. מצאו את נקודות הפיתול.

ג. עבור אילו ערכים של $k$ יש למשוואה $f(x)=k$ בדיוק ארבעה פתרונות?`,
        hints: [
          String.raw`כלל השרשרת: $f'(x)=2(x^2-4)\cdot2x=4x(x-2)(x+2)$.`,
          String.raw`$f'(x)=4x^3-16x$, ולכן $f''(x)=12x^2-16$.`,
          String.raw`שרטטו סקיצה ובדקו לאילו גבהים ישר אופקי חותך אותה ארבע פעמים.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2(x^2-4)\cdot2x=4x(x-2)(x+2)$ (כלל השרשרת).`,
          String.raw`סימן $f'$: שלילי עבור $x<-2$, חיובי עבור $-2<x<0$, שלילי עבור $0<x<2$, חיובי עבור $x>2$. מינימום: $(-2,0)$ ו-$(2,0)$; מקסימום: $(0,16)$.`,
          String.raw`$f'(x)=4x^3-16x$, ולכן $f''(x)=12x^2-16$, שמתאפסת ב-$x=\pm\frac{2}{\sqrt3}$ ומחליפה בהן סימן.`,
          String.raw`$f\left(\pm\frac2{\sqrt3}\right)=\left(\frac43-4\right)^2=\frac{64}9$: נקודות הפיתול $\left(\pm\frac2{\sqrt3},\frac{64}9\right)$.`,
          String.raw`הגרף בצורת ״W״: יורד מ-$+\infty$ אל $(-2,0)$, עולה אל $(0,16)$, יורד אל $(2,0)$ ועולה ל-$+\infty$. ישר אופקי $y=k$ חותך אותו בדיוק ב-$4$ נקודות כאשר $0<k<16$.`,
        ],
        finalAnswer: String.raw`מינימום $(\pm2,0)$, מקסימום $(0,16)$; פיתול $\left(\pm\frac2{\sqrt3},\frac{64}9\right)$; ארבעה פתרונות עבור $0<k<16$.`,
        answers: [
          { label: String.raw`$y$ של נקודת המקסימום`, value: 16 },
          { label: String.raw`$x$ החיובי של נקודת פיתול`, value: 2 / Math.sqrt(3) },
          { label: String.raw`$y$ של נקודות הפיתול`, value: 64 / 9 },
        ],
      },
    ],
  },

  'calc-investigate-rational': {
    intro: String.raw`פונקציית מנה (רציונלית) היא מנה של שני פולינומים, $f(x)=\frac{p(x)}{q(x)}$. בחקירה שלה מצטרפים לשלבים הרגילים שני דברים: תחום ההגדרה (המכנה שונה מאפס) והאסימפטוטות המקבילות לצירים. הנגזרת מחושבת בכלל המנה, והמכנה שלה $\big(q(x)\big)^2$ חיובי, כך שהסימן נקבע לפי המונה. זה הסוג הנפוץ ביותר בשאלה 6, ובדרך כלל מלווה בסעיף על מספר הפתרונות של $f(x)=k$ או על שרטוט נוסף.`,
    keyFacts: [
      String.raw`**תחום**: $q(x)\ne0$. **אסימפטוטות**: אנכיות – אפסי המכנה שאינם מצטמצמים; אופקית – לפי השוואת מעלות המונה והמכנה (אם מעלת המונה גדולה יותר – אין אסימפטוטה אופקית).`,
      String.raw`**נגזרת**: $f'(x)=\frac{p'q-pq'}{q^2}$. המכנה $q^2>0$ בכל התחום, לכן סימן $f'$ נקבע לפי המונה (כדאי לפרק אותו לגורמים).`,
      String.raw`**טבלת סימנים**: כוללים בה גם את הנקודות שאינן בתחום (אסימפטוטות אנכיות) כגבולות של קטעים – הסימן יכול להשתנות שם – אך הן אינן נקודות קיצון.`,
      String.raw`ערך מקסימום מקומי יכול להיות **קטן** מערך מינימום מקומי, כשהם בענפים שונים של הגרף (משני צדי אסימפטוטה אנכית).`,
      String.raw`**סקיצה**: משרטטים קודם את האסימפטוטות, מסמנים את נקודות החיתוך והקיצון, ומחברים לפי תחומי העלייה והירידה וההתנהגות ליד האסימפטוטות.`,
    ],
    exercises: [
      {
        id: 'calc-investigate-rational-1',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x}{x-2}$. מצאו את תחום ההגדרה, את האסימפטוטות המקבילות לצירים ואת תחומי העלייה והירידה. האם יש לפונקציה נקודות קיצון?`,
        hints: [
          String.raw`המכנה מתאפס ב-$x=2$; מעלות המונה והמכנה שוות.`,
          String.raw`$f'(x)=\frac{(x-2)-x}{(x-2)^2}$. מה הסימן שלה?`,
        ],
        solutionSteps: [
          String.raw`תחום: $x\ne2$. ב-$x=2$ המונה $2\ne0$, ולכן $x=2$ אסימפטוטה אנכית.`,
          String.raw`מעלות שוות ומקדמים מובילים $1$ ו-$1$: אסימפטוטה אופקית $y=1$.`,
          String.raw`$f'(x)=\frac{1\cdot(x-2)-x\cdot1}{(x-2)^2}=\frac{-2}{(x-2)^2}<0$ בכל התחום.`,
          String.raw`לכן הפונקציה יורדת בכל אחד מהתחומים $x<2$ ו-$x>2$, ו-$f'$ אינה מתאפסת – אין נקודות קיצון. (שימו לב: היא אינה יורדת ״בכל התחום כמקשה אחת״ – $f(1)=-1<f(3)=3$.) הגרף עובר דרך $(0,0)$.`,
        ],
        finalAnswer: String.raw`$x\ne2$; אסימפטוטות $x=2$, $y=1$; יורדת ב-$x<2$ וב-$x>2$; אין נקודות קיצון.`,
        answers: [
          { label: 'האסימפטוטה האנכית $x=$', value: 2 },
          { label: 'האסימפטוטה האופקית $y=$', value: 1 },
          { label: 'מספר נקודות הקיצון', value: 0 },
        ],
      },
      {
        id: 'calc-investigate-rational-2',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x^2+4}{x}$. מצאו את תחום ההגדרה, את האסימפטוטה האנכית ואת נקודות הקיצון וסוגן. האם הגרף חותך את הצירים?`,
        hints: [
          String.raw`אפשר לכתוב $f(x)=x+\frac4x$ ולגזור כל מחובר.`,
          String.raw`$f'(x)=1-\frac4{x^2}=\frac{x^2-4}{x^2}$.`,
        ],
        solutionSteps: [
          String.raw`תחום: $x\ne0$; ב-$x=0$ המונה $4\ne0$ – אסימפטוטה אנכית $x=0$. (מעלת המונה גדולה ממעלת המכנה – אין אסימפטוטה אופקית.)`,
          String.raw`$f(x)=x+\frac4x$, ולכן $f'(x)=1-\frac4{x^2}=\frac{x^2-4}{x^2}$, שמתאפסת ב-$x=\pm2$.`,
          String.raw`סימן $f'$ כסימן $x^2-4$: חיובי עבור $x<-2$, שלילי עבור $-2<x<0$ ועבור $0<x<2$, חיובי עבור $x>2$.`,
          String.raw`מקסימום $(-2,-4)$, מינימום $(2,4)$.`,
          String.raw`חיתוך: $x=0$ אינו בתחום, ול-$x^2+4=0$ אין פתרון – הגרף אינו חותך את הצירים.`,
        ],
        finalAnswer: String.raw`$x\ne0$; אסימפטוטה $x=0$; מקסימום $(-2,-4)$, מינימום $(2,4)$; אין חיתוך עם הצירים.`,
        answers: [
          { label: String.raw`$x$ של נקודת המקסימום`, value: -2 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: -4 },
          { label: String.raw`$y$ של נקודת המינימום`, value: 4 },
        ],
      },
      {
        id: 'calc-investigate-rational-3',
        difficulty: 2,
        statement: String.raw`חקרו את הפונקציה $f(x)=\frac{4x}{x^2+4}$: תחום הגדרה, אסימפטוטות המקבילות לצירים, נקודות חיתוך עם הצירים, נקודות קיצון ותחומי עלייה וירידה. תארו את הסקיצה.`,
        hints: [
          String.raw`$x^2+4>0$ לכל $x$; מעלת המונה קטנה ממעלת המכנה.`,
          String.raw`$f'(x)=\frac{4(x^2+4)-4x\cdot2x}{(x^2+4)^2}=\frac{4(4-x^2)}{(x^2+4)^2}$.`,
        ],
        solutionSteps: [
          String.raw`$x^2+4>0$ לכל $x$: התחום – כל $x$, ואין אסימפטוטה אנכית.`,
          String.raw`מעלת המונה ($1$) קטנה ממעלת המכנה ($2$): אסימפטוטה אופקית $y=0$. חיתוך עם הצירים: רק $(0,0)$.`,
          String.raw`$f'(x)=\frac{4(x^2+4)-4x\cdot2x}{(x^2+4)^2}=\frac{4(4-x^2)}{(x^2+4)^2}$, מתאפסת ב-$x=\pm2$; שלילית עבור $|x|>2$ וחיובית עבור $|x|<2$.`,
          String.raw`מינימום $(-2,-1)$, מקסימום $(2,1)$. יורדת ב-$x<-2$ וב-$x>2$, עולה ב-$-2<x<2$.`,
          String.raw`סקיצה: הגרף מתקרב ל-$y=0$ מלמטה כאשר $x\to-\infty$, יורד אל $(-2,-1)$, עולה דרך הראשית אל $(2,1)$ ויורד חזרה אל $y=0$ מלמעלה. הפונקציה אי-זוגית – הגרף סימטרי לראשית.`,
        ],
        finalAnswer: String.raw`תחום – כל $x$; אסימפטוטה $y=0$; חיתוך $(0,0)$; מקסימום $(2,1)$, מינימום $(-2,-1)$; עולה ב-$-2<x<2$, יורדת ב-$|x|>2$.`,
        answers: [
          { label: 'האסימפטוטה האופקית $y=$', value: 0 },
          { label: String.raw`$x$ של נקודת המקסימום`, value: 2 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 1 },
          { label: String.raw`$y$ של נקודת המינימום`, value: -1 },
        ],
      },
      {
        id: 'calc-investigate-rational-4',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x^2}{(x-2)^2}$.

א. מצאו את תחום ההגדרה ואת האסימפטוטות המקבילות לצירים.

ב. מצאו את נקודות הקיצון ואת תחומי העלייה והירידה.

ג. מצאו את הנקודה שבה הגרף חותך את האסימפטוטה האופקית.`,
        hints: [
          String.raw`$(x-2)^2=x^2-4x+4$ – פולינום ממעלה $2$ עם מקדם מוביל $1$.`,
          String.raw`$f'(x)=\frac{2x(x-2)^2-x^2\cdot2(x-2)}{(x-2)^4}$ – הוציאו $2x(x-2)$ מהמונה וצמצמו.`,
          String.raw`$f'(x)=\frac{-4x}{(x-2)^3}$; שימו לב שהמכנה מחליף סימן ב-$x=2$.`,
        ],
        solutionSteps: [
          String.raw`תחום: $x\ne2$. המונה ב-$x=2$ שווה $4\ne0$: אסימפטוטה אנכית $x=2$ (ושם $f\to+\infty$ משני הצדדים, כי $f\ge0$).`,
          String.raw`$(x-2)^2=x^2-4x+4$: מעלות שוות ומקדמים מובילים $1$, ולכן אסימפטוטה אופקית $y=1$.`,
          String.raw`$f'(x)=\frac{2x(x-2)^2-x^2\cdot2(x-2)}{(x-2)^4}=\frac{2x(x-2)\big[(x-2)-x\big]}{(x-2)^4}=\frac{-4x}{(x-2)^3}$.`,
          String.raw`סימן $f'$: עבור $x<0$ – מונה חיובי ומכנה שלילי, $f'<0$; עבור $0<x<2$ – שניהם שליליים, $f'>0$; עבור $x>2$ – מונה שלילי ומכנה חיובי, $f'<0$.`,
          String.raw`מינימום $(0,0)$; יורדת ב-$x<0$ וב-$x>2$, עולה ב-$0<x<2$.`,
          String.raw`חיתוך עם $y=1$: $x^2=(x-2)^2\iff0=-4x+4\iff x=1$, הנקודה $(1,1)$.`,
        ],
        finalAnswer: String.raw`$x\ne2$; אסימפטוטות $x=2$, $y=1$; מינימום $(0,0)$; יורדת ב-$x<0$ וב-$x>2$, עולה ב-$0<x<2$; חיתוך עם $y=1$ ב-$(1,1)$.`,
        answers: [
          { label: 'האסימפטוטה האנכית $x=$', value: 2 },
          { label: 'האסימפטוטה האופקית $y=$', value: 1 },
          { label: String.raw`$x$ של נקודת המינימום`, value: 0 },
          { label: String.raw`$x$ של נקודת החיתוך עם $y=1$`, value: 1 },
        ],
      },
      {
        id: 'calc-investigate-rational-5',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{(x-1)^2}{x+1}$. מצאו את תחום ההגדרה, את האסימפטוטה האנכית, את נקודות הקיצון וסוגן ואת נקודות החיתוך עם הצירים.`,
        hints: [
          String.raw`כלל המנה: $f'(x)=\frac{2(x-1)(x+1)-(x-1)^2}{(x+1)^2}$.`,
          String.raw`הוציאו $(x-1)$ כגורם משותף מהמונה: $f'(x)=\frac{(x-1)(x+3)}{(x+1)^2}$.`,
        ],
        solutionSteps: [
          String.raw`תחום: $x\ne-1$; המונה ב-$x=-1$ שווה $4\ne0$ – אסימפטוטה אנכית $x=-1$. (מעלת המונה גדולה ממעלת המכנה – אין אסימפטוטה אופקית.)`,
          String.raw`$f'(x)=\frac{2(x-1)(x+1)-(x-1)^2}{(x+1)^2}=\frac{(x-1)\big[2(x+1)-(x-1)\big]}{(x+1)^2}=\frac{(x-1)(x+3)}{(x+1)^2}$.`,
          String.raw`אפסי $f'$: $x=1$, $x=-3$. סימן $f'$ כסימן $(x-1)(x+3)$: חיובי עבור $x<-3$, שלילי עבור $-3<x<-1$ ועבור $-1<x<1$, חיובי עבור $x>1$.`,
          String.raw`מקסימום: $f(-3)=\frac{16}{-2}=-8$, הנקודה $(-3,-8)$. מינימום: $(1,0)$.`,
          String.raw`חיתוך: $f(0)=1$ – הנקודה $(0,1)$; $f(x)=0\iff x=1$ – הגרף משיק לציר $x$ בנקודת המינימום $(1,0)$.`,
        ],
        finalAnswer: String.raw`$x\ne-1$; אסימפטוטה $x=-1$; מקסימום $(-3,-8)$, מינימום $(1,0)$; חיתוך $(1,0)$, $(0,1)$.`,
        answers: [
          { label: 'האסימפטוטה האנכית $x=$', value: -1 },
          { label: String.raw`$x$ של נקודת המקסימום`, value: -3 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: -8 },
          { label: String.raw`נקודת החיתוך עם ציר $y$: $y=$`, value: 1 },
        ],
      },
      {
        id: 'calc-investigate-rational-6',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x-1}{x^2}$. מצאו את האסימפטוטות המקבילות לצירים, את נקודת הקיצון וסוגה ואת נקודת החיתוך עם ציר $x$. תארו את התנהגות הפונקציה ליד האסימפטוטה האנכית.`,
        hints: [
          String.raw`ליד $x=0$ המונה שלילי והמכנה $x^2$ חיובי.`,
          String.raw`$f'(x)=\frac{x^2-(x-1)\cdot2x}{x^4}$ – צמצמו ב-$x$.`,
        ],
        solutionSteps: [
          String.raw`תחום: $x\ne0$; ב-$x=0$ המונה $-1\ne0$: אסימפטוטה אנכית $x=0$. כאשר $x\to0$ (משני הצדדים) המונה שלילי והמכנה $x^2$ חיובי וקטן, ולכן $f\to-\infty$.`,
          String.raw`מעלת המונה קטנה ממעלת המכנה: אסימפטוטה אופקית $y=0$.`,
          String.raw`$f'(x)=\frac{1\cdot x^2-(x-1)\cdot2x}{x^4}=\frac{-x^2+2x}{x^4}=\frac{2-x}{x^3}$.`,
          String.raw`סימן $f'$: עבור $x<0$ – מונה חיובי ומכנה שלילי, $f'<0$; עבור $0<x<2$: $f'>0$; עבור $x>2$: $f'<0$.`,
          String.raw`מקסימום ב-$x=2$: $f(2)=\frac14$. חיתוך עם ציר $x$: $(1,0)$.`,
        ],
        finalAnswer: String.raw`אסימפטוטות $x=0$ (משני הצדדים $f\to-\infty$) ו-$y=0$; מקסימום $\left(2,\frac14\right)$; חיתוך $(1,0)$.`,
        answers: [
          { label: String.raw`$x$ של נקודת המקסימום`, value: 2 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 0.25 },
          { label: String.raw`נקודת החיתוך עם ציר $x$: $x=$`, value: 1 },
        ],
      },
      {
        id: 'calc-investigate-rational-7',
        difficulty: 3,
        statement: String.raw`לפונקציה $f(x)=\frac{x^2+a}{x-1}$ יש נקודת קיצון שבה $x=3$.

א. מצאו את $a$.

ב. מצאו את כל נקודות הקיצון של הפונקציה וקבעו את סוגן.

ג. הסבירו מדוע ערך המקסימום של הפונקציה קטן מערך המינימום שלה.`,
        hints: [
          String.raw`$f'(x)=\frac{2x(x-1)-(x^2+a)}{(x-1)^2}=\frac{x^2-2x-a}{(x-1)^2}$, ו-$f'(3)=0$.`,
          String.raw`אחרי שמצאתם את $a$, פרקו את המונה של $f'$.`,
          String.raw`מה הסימן של $f$ בכל אחד מצדי האסימפטוטה $x=1$?`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\frac{2x(x-1)-(x^2+a)}{(x-1)^2}=\frac{x^2-2x-a}{(x-1)^2}$.`,
          String.raw`בנקודת הקיצון $f'(3)=0$: $9-6-a=0$, ולכן $a=3$.`,
          String.raw`$f'(x)=\frac{x^2-2x-3}{(x-1)^2}=\frac{(x-3)(x+1)}{(x-1)^2}$, מתאפסת ב-$x=3$ וב-$x=-1$.`,
          String.raw`סימן $f'$: חיובי עבור $x<-1$, שלילי עבור $-1<x<1$ ועבור $1<x<3$, חיובי עבור $x>3$. מקסימום: $f(-1)=\frac{4}{-2}=-2$; מינימום: $f(3)=\frac{12}{2}=6$.`,
          String.raw`המונה $x^2+3$ חיובי תמיד, ולכן בענף השמאלי ($x<1$) $f(x)<0$ ובענף הימני ($x>1$) $f(x)>0$. המקסימום $(-1,-2)$ בענף השמאלי והמינימום $(3,6)$ בענף הימני – כל ערך קיצון ״מקומי״ רק בענף שלו, ולכן אין סתירה.`,
        ],
        finalAnswer: String.raw`$a=3$; מקסימום $(-1,-2)$, מינימום $(3,6)$ – בענפים שונים משני צדי $x=1$.`,
        answers: [
          { label: String.raw`$a$`, value: 3 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: -2 },
          { label: String.raw`$y$ של נקודת המינימום`, value: 6 },
        ],
      },
      {
        id: 'calc-investigate-rational-8',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x^2+1}{x^2-1}$.

א. חקרו את הפונקציה: תחום, אסימפטוטות, קיצון, תחומי עלייה וירידה, ותארו את הסקיצה.

ב. בעזרת הסקיצה, קבעו כמה פתרונות יש למשוואה $f(x)=k$ עבור $k=3$, עבור $k=0$ ועבור $k=-1$.`,
        hints: [
          String.raw`$f'(x)=\frac{2x(x^2-1)-(x^2+1)\cdot2x}{(x^2-1)^2}=\frac{-4x}{(x^2-1)^2}$.`,
          String.raw`בדקו את הסימן של $f$ בכל אחד משלושת הענפים: $x<-1$, $-1<x<1$, $x>1$.`,
          String.raw`ישר אופקי $y=k$ – כמה פעמים הוא חותך כל ענף?`,
        ],
        solutionSteps: [
          String.raw`תחום: $x\ne\pm1$; המונה חיובי תמיד, ולכן $x=1$ ו-$x=-1$ אסימפטוטות אנכיות. מעלות שוות: אסימפטוטה אופקית $y=1$.`,
          String.raw`$f'(x)=\frac{2x(x^2-1)-(x^2+1)2x}{(x^2-1)^2}=\frac{-4x}{(x^2-1)^2}$: חיובית עבור $x<0$ ($x\ne-1$) ושלילית עבור $x>0$ ($x\ne1$). מקסימום $(0,-1)$.`,
          String.raw`עבור $|x|>1$ המונה גדול מהמכנה וחיובי, ולכן $f(x)>1$: הענף השמאלי עולה מ-$y=1$ אל $+\infty$ (ליד $x=-1$), והימני יורד מ-$+\infty$ (ליד $x=1$) אל $y=1$. עבור $|x|<1$ המכנה שלילי: $f(x)\le-1$, עם מקסימום $-1$ ב-$x=0$ ו-$f\to-\infty$ ליד $x=\pm1$.`,
          String.raw`$k=3$: $3>1$ – הישר $y=3$ חותך כל אחד מהענפים החיצוניים פעם אחת: $2$ פתרונות.`,
          String.raw`$k=0$: $-1<0\le1$ – אין לפונקציה ערכים כאלה: $0$ פתרונות.`,
          String.raw`$k=-1$: הישר משיק לענף האמצעי בנקודת המקסימום: פתרון $1$ ($x=0$).`,
        ],
        finalAnswer: String.raw`אסימפטוטות $x=\pm1$, $y=1$; מקסימום $(0,-1)$; עולה ב-$x<0$, יורדת ב-$x>0$ (בתחום); מספר הפתרונות: $2$, $0$, $1$.`,
        answers: [
          { label: String.raw`מספר הפתרונות עבור $k=3$`, value: 2 },
          { label: String.raw`מספר הפתרונות עבור $k=0$`, value: 0 },
          { label: String.raw`מספר הפתרונות עבור $k=-1$`, value: 1 },
        ],
      },
    ],
  },

  'calc-investigate-root': {
    intro: String.raw`בחקירת פונקציה עם שורש ריבועי הצעד הראשון הוא תחום ההגדרה: הביטוי שבתוך השורש אינו שלילי, ושורש במכנה חייב להיות חיובי. הנגזרת מחושבת בכלל השרשרת, $\left(\sqrt{g}\right)'=\frac{g'}{2\sqrt g}$, ובדרך כלל כדאי להביא אותה למכנה משותף. בקצוות של תחום ההגדרה יש לעתים קרובות קיצון קצה, ושם הנגזרת אינה מוגדרת. כדי למצוא נקודות חיתוך פותרים משוואה אי-רציונלית – מעלים בריבוע ובודקים את הפתרונות. זה אחד מסוגי הפונקציות של שאלה 6.`,
    keyFacts: [
      String.raw`**תחום**: $\sqrt{g(x)}$ מוגדר כאשר $g(x)\ge0$; $\frac{1}{\sqrt{g(x)}}$ – כאשר $g(x)>0$.`,
      String.raw`**נגזרת**: $\left(\sqrt{g(x)}\right)'=\frac{g'(x)}{2\sqrt{g(x)}}$. אחרי כלל המכפלה או המנה מביאים למכנה משותף שבו מופיע $\sqrt{g(x)}$ – החיובי בתוך התחום – והסימן נקבע לפי המונה.`,
      String.raw`**קצוות התחום**: בקצה סגור (למשל נקודה שבה $g(a)=0$) הפונקציה מוגדרת אך בדרך כלל אינה גזירה; יש שם **קיצון קצה**, וסוגו נקבע לפי העלייה או הירידה לידו.`,
      String.raw`**משוואה אי-רציונלית** $\sqrt{A}=B$: דורשים $B\ge0$, מעלים בריבוע $A=B^2$, ו**בודקים** כל פתרון במשוואה המקורית (העלאה בריבוע עלולה להוסיף פתרונות זרים).`,
      String.raw`**אסימפטוטות**: אנכית – כשהמכנה (עם שורש) שואף ל-$0$ והמונה לא; אופקית – בעזרת $\sqrt{x^2}=|x|$, והגבולות ב-$\infty$ וב-$-\infty$ יכולים להיות שונים.`,
    ],
    exercises: [
      {
        id: 'calc-investigate-root-1',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=\sqrt{x^2-4x+8}$. הראו שהפונקציה מוגדרת לכל $x$, ומצאו את נקודת הקיצון שלה וקבעו את סוגה.`,
        hints: [
          String.raw`השלמה לריבוע: $x^2-4x+8=(x-2)^2+4$.`,
          String.raw`$f'(x)=\frac{2x-4}{2\sqrt{x^2-4x+8}}$.`,
        ],
        solutionSteps: [
          String.raw`$x^2-4x+8=(x-2)^2+4\ge4>0$, ולכן הפונקציה מוגדרת לכל $x$.`,
          String.raw`לפי כלל השרשרת: $f'(x)=\frac{2x-4}{2\sqrt{x^2-4x+8}}=\frac{x-2}{\sqrt{x^2-4x+8}}$.`,
          String.raw`המכנה חיובי, ולכן $f'<0$ עבור $x<2$ ו-$f'>0$ עבור $x>2$.`,
          String.raw`מינימום ב-$x=2$: $f(2)=\sqrt{4-8+8}=2$, הנקודה $(2,2)$.`,
        ],
        finalAnswer: String.raw`מינימום $(2,2)$.`,
        answers: [
          { label: String.raw`$x$ של נקודת המינימום`, value: 2 },
          { label: String.raw`$y$ של נקודת המינימום`, value: 2 },
        ],
      },
      {
        id: 'calc-investigate-root-2',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=\sqrt{9-x^2}$. מצאו את תחום ההגדרה, ואת נקודות הקיצון (כולל קיצון בקצוות התחום) וקבעו את סוגן.`,
        hints: [
          String.raw`תחום: $9-x^2\ge0$.`,
          String.raw`$f'(x)=\frac{-2x}{2\sqrt{9-x^2}}=\frac{-x}{\sqrt{9-x^2}}$.`,
        ],
        solutionSteps: [
          String.raw`תחום: $9-x^2\ge0\iff-3\le x\le3$.`,
          String.raw`$f'(x)=\frac{-2x}{2\sqrt{9-x^2}}=\frac{-x}{\sqrt{9-x^2}}$ עבור $-3<x<3$, ומתאפסת ב-$x=0$.`,
          String.raw`$f'>0$ עבור $-3<x<0$ ו-$f'<0$ עבור $0<x<3$: מקסימום $(0,3)$.`,
          String.raw`בקצוות: $f(\pm3)=0$; הפונקציה עולה מימין ל-$-3$ ויורדת לקראת $3$ – מינימום קצה ב-$(-3,0)$ וב-$(3,0)$. (הגרף הוא החצי העליון של המעגל $x^2+y^2=9$.)`,
        ],
        finalAnswer: String.raw`$-3\le x\le3$; מקסימום $(0,3)$; מינימום קצה $(-3,0)$ ו-$(3,0)$.`,
        answers: [
          { label: 'הקצה הימני של תחום ההגדרה', value: 3 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 3 },
        ],
      },
      {
        id: 'calc-investigate-root-3',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x-2\sqrt{x}$. מצאו את תחום ההגדרה, את נקודות החיתוך עם הצירים ואת נקודות הקיצון (כולל קצה) וקבעו את סוגן.`,
        hints: [
          String.raw`לחיתוך עם ציר $x$ הוציאו $\sqrt x$ כגורם משותף: $x-2\sqrt x=\sqrt x(\sqrt x-2)$.`,
          String.raw`$f'(x)=1-\frac{1}{\sqrt x}=\frac{\sqrt x-1}{\sqrt x}$.`,
        ],
        solutionSteps: [
          String.raw`תחום: $x\ge0$.`,
          String.raw`חיתוך: $f(0)=0$ – הנקודה $(0,0)$. $x-2\sqrt x=\sqrt x(\sqrt x-2)=0\iff x=0$ או $x=4$ – הנקודה $(4,0)$.`,
          String.raw`$f'(x)=1-\frac{2}{2\sqrt x}=\frac{\sqrt x-1}{\sqrt x}$ עבור $x>0$, ומתאפסת ב-$x=1$.`,
          String.raw`$f'<0$ עבור $0<x<1$ ו-$f'>0$ עבור $x>1$: מינימום $(1,1-2)=(1,-1)$.`,
          String.raw`בקצה $x=0$ הפונקציה יורדת מימינו – מקסימום קצה $(0,0)$.`,
        ],
        finalAnswer: String.raw`$x\ge0$; חיתוך $(0,0)$, $(4,0)$; מינימום $(1,-1)$; מקסימום קצה $(0,0)$.`,
        answers: [
          { label: String.raw`$x$ של נקודת המינימום`, value: 1 },
          { label: String.raw`$y$ של נקודת המינימום`, value: -1 },
          { label: String.raw`נקודת החיתוך החיובית עם ציר $x$: $x=$`, value: 4 },
        ],
      },
      {
        id: 'calc-investigate-root-4',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x}{\sqrt{x-1}}$. מצאו את תחום ההגדרה, את האסימפטוטה האנכית ואת נקודת הקיצון וסוגה.`,
        hints: [
          String.raw`השורש נמצא במכנה, ולכן דרוש $x-1>0$.`,
          String.raw`כלל המנה: $f'(x)=\frac{\sqrt{x-1}-x\cdot\frac{1}{2\sqrt{x-1}}}{x-1}$; כפלו מונה ומכנה ב-$2\sqrt{x-1}$.`,
        ],
        solutionSteps: [
          String.raw`השורש במכנה: $x-1>0$, כלומר $x>1$.`,
          String.raw`כאשר $x\to1^+$ המונה שואף ל-$1$ והמכנה ל-$0^+$, ולכן $f\to+\infty$: אסימפטוטה אנכית $x=1$.`,
          String.raw`$f'(x)=\frac{\sqrt{x-1}-x\cdot\frac{1}{2\sqrt{x-1}}}{x-1}=\frac{2(x-1)-x}{2(x-1)\sqrt{x-1}}=\frac{x-2}{2(x-1)\sqrt{x-1}}$.`,
          String.raw`המכנה חיובי בתחום; $f'<0$ עבור $1<x<2$ ו-$f'>0$ עבור $x>2$: מינימום $\left(2,\frac{2}{1}\right)=(2,2)$.`,
          String.raw`כאשר $x\to\infty$: $f(x)=\frac{x}{\sqrt{x-1}}>\frac{x}{\sqrt x}=\sqrt x\to\infty$ – אין אסימפטוטה אופקית.`,
        ],
        finalAnswer: String.raw`$x>1$; אסימפטוטה $x=1$; מינימום $(2,2)$.`,
        answers: [
          { label: 'האסימפטוטה האנכית $x=$', value: 1 },
          { label: String.raw`$x$ של נקודת המינימום`, value: 2 },
          { label: String.raw`$y$ של נקודת המינימום`, value: 2 },
        ],
      },
      {
        id: 'calc-investigate-root-5',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x\sqrt{8-x^2}$.

א. מצאו את תחום ההגדרה והראו שהפונקציה אי-זוגית.

ב. מצאו את נקודות הקיצון (כולל קצוות) וקבעו את סוגן.`,
        hints: [
          String.raw`תחום: $8-x^2\ge0$.`,
          String.raw`כלל המכפלה: $f'(x)=\sqrt{8-x^2}+x\cdot\frac{-2x}{2\sqrt{8-x^2}}=\frac{8-2x^2}{\sqrt{8-x^2}}$.`,
          String.raw`בקצוות בדקו את כיוון הפונקציה לידם.`,
        ],
        solutionSteps: [
          String.raw`תחום: $8-x^2\ge0\iff-2\sqrt2\le x\le2\sqrt2$. $f(-x)=-x\sqrt{8-x^2}=-f(x)$ – הפונקציה אי-זוגית, והגרף סימטרי לראשית.`,
          String.raw`$f'(x)=\sqrt{8-x^2}+x\cdot\frac{-2x}{2\sqrt{8-x^2}}=\frac{8-x^2-x^2}{\sqrt{8-x^2}}=\frac{8-2x^2}{\sqrt{8-x^2}}$, מתאפסת ב-$x=\pm2$.`,
          String.raw`$f'<0$ עבור $-2\sqrt2<x<-2$, $f'>0$ עבור $-2<x<2$, $f'<0$ עבור $2<x<2\sqrt2$.`,
          String.raw`מקסימום: $f(2)=2\sqrt4=4$, הנקודה $(2,4)$; מינימום: $(-2,-4)$ (לפי הסימטריה).`,
          String.raw`קצוות: $f(\pm2\sqrt2)=0$. ב-$x=-2\sqrt2$ הפונקציה יורדת מימינו – מקסימום קצה $(-2\sqrt2,0)$; ב-$x=2\sqrt2$ היא יורדת לקראתו – מינימום קצה $(2\sqrt2,0)$.`,
        ],
        finalAnswer: String.raw`$-2\sqrt2\le x\le2\sqrt2$; מקסימום $(2,4)$, מינימום $(-2,-4)$; מקסימום קצה $(-2\sqrt2,0)$, מינימום קצה $(2\sqrt2,0)$.`,
        answers: [
          { label: 'הקצה הימני של תחום ההגדרה', value: 2 * Math.SQRT2 },
          { label: String.raw`$x$ של נקודת המקסימום`, value: 2 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 4 },
        ],
      },
      {
        id: 'calc-investigate-root-6',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\sqrt{x+2}-x$. מצאו את תחום ההגדרה, את נקודת החיתוך עם ציר $x$ ואת נקודות הקיצון (כולל קצה) וקבעו את סוגן.`,
        hints: [
          String.raw`חיתוך עם ציר $x$: $\sqrt{x+2}=x$. זכרו לדרוש $x\ge0$ לפני העלאה בריבוע.`,
          String.raw`$f'(x)=\frac{1}{2\sqrt{x+2}}-1$. מתי $\sqrt{x+2}=\frac12$?`,
        ],
        solutionSteps: [
          String.raw`תחום: $x\ge-2$.`,
          String.raw`חיתוך עם ציר $x$: $\sqrt{x+2}=x$. דרוש $x\ge0$; בריבוע: $x+2=x^2\iff x^2-x-2=0\iff x=2$ או $x=-1$. הפתרון $x=-1$ נפסל (אגף ימין שלילי), ולכן הנקודה $(2,0)$.`,
          String.raw`$f'(x)=\frac{1}{2\sqrt{x+2}}-1$ עבור $x>-2$. $f'(x)=0\iff\sqrt{x+2}=\frac12\iff x+2=\frac14\iff x=-\frac74$.`,
          String.raw`עבור $-2<x<-\frac74$: $\sqrt{x+2}<\frac12$ ולכן $f'>0$; עבור $x>-\frac74$: $f'<0$. מקסימום: $f\left(-\frac74\right)=\frac12+\frac74=\frac94$.`,
          String.raw`בקצה: $f(-2)=0+2=2$, והפונקציה עולה מימינו – מינימום קצה $(-2,2)$.`,
        ],
        finalAnswer: String.raw`$x\ge-2$; חיתוך $(2,0)$; מקסימום $\left(-\frac74,\frac94\right)$; מינימום קצה $(-2,2)$.`,
        answers: [
          { label: String.raw`נקודת החיתוך עם ציר $x$: $x=$`, value: 2 },
          { label: String.raw`$x$ של נקודת המקסימום`, value: -1.75 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 2.25 },
        ],
      },
      {
        id: 'calc-investigate-root-7',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x+1}{\sqrt{x^2+3}}$.

א. מצאו את האסימפטוטות האופקיות של הפונקציה.

ב. מצאו את נקודות הקיצון וקבעו את סוגן.

ג. מצאו את קבוצת הערכים של הפונקציה.`,
        hints: [
          String.raw`לגבולות באינסוף: $\sqrt{x^2+3}=|x|\sqrt{1+\frac3{x^2}}$.`,
          String.raw`$f'(x)=\frac{3-x}{(x^2+3)\sqrt{x^2+3}}$.`,
          String.raw`לקבוצת הערכים: בין אילו ערכים הפונקציה נעה? מה קורה כאשר $x\to-\infty$?`,
        ],
        solutionSteps: [
          String.raw`התחום – כל $x$ ($x^2+3>0$), ואין אסימפטוטה אנכית.`,
          String.raw`עבור $x>0$: $f(x)=\frac{x\left(1+\frac1x\right)}{x\sqrt{1+\frac3{x^2}}}\to1$; עבור $x<0$: $\sqrt{x^2+3}=-x\sqrt{1+\frac3{x^2}}$, ולכן $f(x)\to-1$. אסימפטוטות: $y=1$ (כאשר $x\to\infty$) ו-$y=-1$ (כאשר $x\to-\infty$).`,
          String.raw`$f'(x)=\frac{\sqrt{x^2+3}-(x+1)\cdot\frac{x}{\sqrt{x^2+3}}}{x^2+3}=\frac{x^2+3-x^2-x}{(x^2+3)\sqrt{x^2+3}}=\frac{3-x}{(x^2+3)\sqrt{x^2+3}}$.`,
          String.raw`$f'>0$ עבור $x<3$ ו-$f'<0$ עבור $x>3$: מקסימום יחיד $f(3)=\frac{4}{\sqrt{12}}=\frac{2}{\sqrt3}$, בנקודה $\left(3,\frac{2}{\sqrt3}\right)$. אין מינימום.`,
          String.raw`הפונקציה עולה מערכים הקרובים ל-$-1$ (אך אינם מגיעים אליו, כי $-1$ הוא רק גבול כאשר $x\to-\infty$) עד $\frac{2}{\sqrt3}$, ואחר כך יורדת ומתקרבת ל-$1$. לכן קבוצת הערכים: $-1<y\le\frac2{\sqrt3}$.`,
        ],
        finalAnswer: String.raw`אסימפטוטות $y=1$ ו-$y=-1$; מקסימום $\left(3,\frac2{\sqrt3}\right)$; קבוצת הערכים $-1<y\le\frac2{\sqrt3}$.`,
        answers: [
          { label: String.raw`האסימפטוטה כאשר $x\to\infty$: $y=$`, value: 1 },
          { label: String.raw`האסימפטוטה כאשר $x\to-\infty$: $y=$`, value: -1 },
          { label: String.raw`$x$ של נקודת המקסימום`, value: 3 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 2 / Math.sqrt(3) },
        ],
      },
      {
        id: 'calc-investigate-root-8',
        difficulty: 3,
        statement: String.raw`לפונקציה $f(x)=x\sqrt{a-x}$ ($a>0$ פרמטר) יש נקודת קיצון פנימית שבה $x=4$.

א. מצאו את $a$.

ב. מצאו את תחום ההגדרה ואת כל נקודות הקיצון של הפונקציה (כולל קצה) וקבעו את סוגן.`,
        hints: [
          String.raw`$f'(x)=\sqrt{a-x}-\frac{x}{2\sqrt{a-x}}=\frac{2a-3x}{2\sqrt{a-x}}$.`,
          String.raw`בנקודת קיצון פנימית $f'(4)=0$.`,
          String.raw`הקצה של התחום הוא $x=a$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\sqrt{a-x}-\frac{x}{2\sqrt{a-x}}=\frac{2(a-x)-x}{2\sqrt{a-x}}=\frac{2a-3x}{2\sqrt{a-x}}$, עבור $x<a$.`,
          String.raw`בנקודת הקיצון $f'(4)=0$: $2a-12=0$, ולכן $a=6$.`,
          String.raw`תחום: $6-x\ge0$, כלומר $x\le6$. $f'(x)=\frac{12-3x}{2\sqrt{6-x}}$: חיובית עבור $x<4$ ושלילית עבור $4<x<6$.`,
          String.raw`מקסימום: $f(4)=4\sqrt2$, הנקודה $(4,4\sqrt2)$.`,
          String.raw`בקצה $x=6$: $f(6)=0$, והפונקציה יורדת לקראתו – מינימום קצה $(6,0)$. (כאשר $x\to-\infty$, $f\to-\infty$, ולכן אין מינימום מוחלט.)`,
        ],
        finalAnswer: String.raw`$a=6$; $x\le6$; מקסימום $(4,4\sqrt2)$, מינימום קצה $(6,0)$.`,
        answers: [
          { label: String.raw`$a$`, value: 6 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: 4 * Math.SQRT2 },
        ],
      },
    ],
  },

  'calc-trig-functions': {
    intro: String.raw`בשאלה 7 חוקרים פונקציה טריגונומטרית – בדרך כלל בתחום סגור נתון, ברדיאנים. גוזרים לפי $(\sin x)'=\cos x$, $(\cos x)'=-\sin x$, $(\tan x)'=\frac1{\cos^2x}$ וכלל השרשרת, פותרים $f'(x)=0$ בתחום, בונים טבלת סימנים, ולא שוכחים את הקצוות. המשוואות שנדרשות: $\sin(ax+b)=c$, $\cos(ax+b)=c$, $\tan(ax+b)=c$, פירוק לגורמים ומשוואה ריבועית ב-$\sin x$ או ב-$\cos x$. לפי המיקוד לא יידרש לפתור $a\sin x+b\cos x=c$ כאשר $a\ne b$ ו-$c\ne0$.`,
    keyFacts: [
      String.raw`**נגזרות**: $(\sin x)'=\cos x$, $(\cos x)'=-\sin x$, $(\tan x)'=\frac{1}{\cos^2x}$; עם כלל השרשרת: $\big(\sin(ax+b)\big)'=a\cos(ax+b)$, $(\sin^2x)'=2\sin x\cos x=\sin2x$.`,
      String.raw`**זהויות שימושיות**: $\sin2x=2\sin x\cos x$, $\cos2x=1-2\sin^2x=2\cos^2x-1$, $\sin^2x+\cos^2x=1$ – כדי להביא את $f'(x)=0$ למכפלה או למשוואה ריבועית בפונקציה אחת.`,
      String.raw`**פתרון בתחום**: פותרים פתרון כללי (עם $k$ שלם) ובוחרים את הפתרונות שבתחום. במשוואה כמו $\cos2x=c$ פותרים עבור $2x$ בתחום הכפול (למשל $0\le2x\le2\pi$ כאשר $0\le x\le\pi$).`,
      String.raw`**סימן הנגזרת** בודקים בהצבת נקודה מכל קטע, או לפי גורמים שסימנם ידוע (למשל $1+\sin x\ge0$ תמיד, ולכן בנקודה שבה $\sin x=-1$ הנגזרת אינה מחליפה סימן).`,
      String.raw`**קצוות התחום** הם נקודות קיצון קצה; הקיצון המוחלט נקבע בהשוואה בין ערכי הקיצון המקומי והקצוות. ל-$\tan x$ אסימפטוטות אנכיות ב-$x=\frac\pi2+\pi k$.`,
    ],
    exercises: [
      {
        id: 'calc-trig-functions-1',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=3\sin x+\cos2x$. מצאו את $f'(x)$, וחשבו את שיפוע המשיק לגרף הפונקציה בנקודה שבה $x=\frac\pi6$.`,
        hints: [
          String.raw`$(\cos2x)'=-\sin2x\cdot2$ (כלל השרשרת).`,
          String.raw`$f'(x)=3\cos x-2\sin2x$; הציבו $x=\frac\pi6$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3\cos x-2\sin2x$ (לפי כלל השרשרת $(\cos2x)'=-2\sin2x$).`,
          String.raw`$f'\left(\frac\pi6\right)=3\cos\frac\pi6-2\sin\frac\pi3=3\cdot\frac{\sqrt3}2-2\cdot\frac{\sqrt3}2=\frac{\sqrt3}2$.`,
        ],
        finalAnswer: String.raw`$f'(x)=3\cos x-2\sin2x$; שיפוע המשיק $\frac{\sqrt3}2\approx0.866$.`,
        answers: [{ label: 'שיפוע המשיק', value: Math.sqrt(3) / 2 }],
      },
      {
        id: 'calc-trig-functions-2',
        difficulty: 1,
        statement: String.raw`נתונה הפונקציה $f(x)=2\sin x+x$ בתחום $0\le x\le2\pi$. מצאו את שיעורי ה-$x$ של נקודות הקיצון המקומי שבתוך התחום וקבעו את סוגן.`,
        hints: [
          String.raw`$f'(x)=2\cos x+1$. פתרו $\cos x=-\frac12$ בתחום.`,
          String.raw`$\cos x=-\frac12\Rightarrow x=\pm\frac{2\pi}3+2\pi k$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2\cos x+1$, ו-$f'(x)=0\iff\cos x=-\frac12\iff x=\pm\frac{2\pi}3+2\pi k$.`,
          String.raw`בתחום: $x=\frac{2\pi}3$ ו-$x=\frac{4\pi}3$.`,
          String.raw`סימן $f'$: עבור $0\le x<\frac{2\pi}3$, $\cos x>-\frac12$ ולכן $f'>0$; עבור $\frac{2\pi}3<x<\frac{4\pi}3$, $f'<0$; עבור $\frac{4\pi}3<x\le2\pi$, $f'>0$.`,
          String.raw`לכן מקסימום ב-$x=\frac{2\pi}3$ (שם $f=\sqrt3+\frac{2\pi}3\approx3.83$) ומינימום ב-$x=\frac{4\pi}3$ (שם $f=-\sqrt3+\frac{4\pi}3\approx2.46$).`,
        ],
        finalAnswer: String.raw`מקסימום ב-$x=\frac{2\pi}3$, מינימום ב-$x=\frac{4\pi}3$.`,
        answers: [
          { label: String.raw`$x$ של נקודת המקסימום המקומי`, value: (2 * Math.PI) / 3 },
          { label: String.raw`$x$ של נקודת המינימום המקומי`, value: (4 * Math.PI) / 3 },
        ],
      },
      {
        id: 'calc-trig-functions-3',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=2\sin\left(2x-\frac{\pi}{3}\right)$ בתחום $0\le x\le\pi$.

א. מצאו את נקודות החיתוך של הגרף עם ציר $x$.

ב. מצאו את נקודות הקיצון (כולל קצוות) וקבעו את סוגן.`,
        hints: [
          String.raw`סמנו $\alpha=2x-\frac\pi3$. כאשר $0\le x\le\pi$: $-\frac\pi3\le\alpha\le\frac{5\pi}3$.`,
          String.raw`$\sin\alpha=0\iff\alpha=\pi k$.`,
          String.raw`$f'(x)=4\cos\left(2x-\frac\pi3\right)$; $\cos\alpha=0\iff\alpha=\frac\pi2+\pi k$.`,
        ],
        solutionSteps: [
          String.raw`נסמן $\alpha=2x-\frac\pi3$. כאשר $0\le x\le\pi$: $-\frac\pi3\le\alpha\le\frac{5\pi}3$.`,
          String.raw`$f(x)=0\iff\sin\alpha=0\iff\alpha=0$ או $\alpha=\pi$ (בטווח), כלומר $2x=\frac\pi3$ או $2x=\frac{4\pi}3$: $x=\frac\pi6$ ו-$x=\frac{2\pi}3$.`,
          String.raw`$f'(x)=2\cos\left(2x-\frac\pi3\right)\cdot2=4\cos\alpha$. $\cos\alpha=0\iff\alpha=\frac\pi2$ או $\alpha=\frac{3\pi}2$, כלומר $x=\frac{5\pi}{12}$ או $x=\frac{11\pi}{12}$.`,
          String.raw`סימן $\cos\alpha$: חיובי עבור $-\frac\pi3\le\alpha<\frac\pi2$, שלילי עבור $\frac\pi2<\alpha<\frac{3\pi}2$, חיובי עבור $\frac{3\pi}2<\alpha\le\frac{5\pi}3$.`,
          String.raw`מקסימום $\left(\frac{5\pi}{12},2\right)$, מינימום $\left(\frac{11\pi}{12},-2\right)$.`,
          String.raw`קצוות: $f(0)=2\sin\left(-\frac\pi3\right)=-\sqrt3$ – מינימום קצה (הפונקציה עולה מימין); $f(\pi)=2\sin\frac{5\pi}3=-\sqrt3$ – מקסימום קצה (היא עולה לקראתו).`,
        ],
        finalAnswer: String.raw`חיתוך: $x=\frac\pi6$, $x=\frac{2\pi}3$; מקסימום $\left(\frac{5\pi}{12},2\right)$, מינימום $\left(\frac{11\pi}{12},-2\right)$; מינימום קצה $(0,-\sqrt3)$, מקסימום קצה $(\pi,-\sqrt3)$.`,
        answers: [
          { label: String.raw`נקודת החיתוך השמאלית עם ציר $x$: $x=$`, value: Math.PI / 6 },
          { label: String.raw`נקודת החיתוך הימנית עם ציר $x$: $x=$`, value: (2 * Math.PI) / 3 },
          { label: String.raw`$x$ של נקודת המקסימום`, value: (5 * Math.PI) / 12 },
          { label: String.raw`$x$ של נקודת המינימום`, value: (11 * Math.PI) / 12 },
        ],
      },
      {
        id: 'calc-trig-functions-4',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\sin^2x-\sin x$ בתחום $0\le x\le2\pi$. מצאו את נקודות הקיצון של הפונקציה בתחום (כולל קצוות) וקבעו את סוגן, ומצאו את הערך הגדול ביותר שלה.`,
        hints: [
          String.raw`$f'(x)=2\sin x\cos x-\cos x$ – הוציאו גורם משותף.`,
          String.raw`$f'(x)=\cos x(2\sin x-1)$. פתרו $\cos x=0$ ו-$\sin x=\frac12$.`,
          String.raw`בדקו את הסימן בכל אחד מחמשת הקטעים.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2\sin x\cos x-\cos x=\cos x(2\sin x-1)$.`,
          String.raw`$\cos x=0\Rightarrow x=\frac\pi2,\frac{3\pi}2$; $\sin x=\frac12\Rightarrow x=\frac\pi6,\frac{5\pi}6$.`,
          String.raw`סימן $f'$ (מכפלת הסימנים של $\cos x$ ושל $2\sin x-1$): ב-$\left[0,\frac\pi6\right)$: $(+)(-)=-$; ב-$\left(\frac\pi6,\frac\pi2\right)$: $(+)(+)=+$; ב-$\left(\frac\pi2,\frac{5\pi}6\right)$: $(-)(+)=-$; ב-$\left(\frac{5\pi}6,\frac{3\pi}2\right)$: $(-)(-)=+$; ב-$\left(\frac{3\pi}2,2\pi\right]$: $(+)(-)=-$.`,
          String.raw`מינימום ב-$x=\frac\pi6$ וב-$x=\frac{5\pi}6$: $f=\frac14-\frac12=-\frac14$. מקסימום ב-$x=\frac\pi2$: $f=1-1=0$, וב-$x=\frac{3\pi}2$: $f=1+1=2$.`,
          String.raw`קצוות: $f(0)=0$ – מקסימום קצה (יורדת מימין); $f(2\pi)=0$ – מינימום קצה (יורדת לקראתו).`,
          String.raw`הערך הגדול ביותר: $2$, ב-$x=\frac{3\pi}2$.`,
        ],
        finalAnswer: String.raw`מינימום $\left(\frac\pi6,-\frac14\right)$, $\left(\frac{5\pi}6,-\frac14\right)$; מקסימום $\left(\frac\pi2,0\right)$, $\left(\frac{3\pi}2,2\right)$; קצוות: מקסימום $(0,0)$, מינימום $(2\pi,0)$. הערך הגדול ביותר $2$.`,
        answers: [
          { label: String.raw`$y$ של נקודות המינימום`, value: -0.25 },
          { label: String.raw`$x$ שבו מתקבל הערך הגדול ביותר`, value: (3 * Math.PI) / 2 },
          { label: 'הערך הגדול ביותר', value: 2 },
        ],
      },
      {
        id: 'calc-trig-functions-5',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\cos2x+2\cos x$ בתחום $0\le x\le2\pi$. מצאו את נקודות הקיצון של הפונקציה (כולל קצוות) וקבעו את סוגן.`,
        hints: [
          String.raw`$f'(x)=-2\sin2x-2\sin x$; החליפו $\sin2x=2\sin x\cos x$.`,
          String.raw`$f'(x)=-2\sin x(2\cos x+1)$.`,
          String.raw`$\sin x=0$ בתחום: $x=0,\pi,2\pi$; $\cos x=-\frac12$: $x=\frac{2\pi}3,\frac{4\pi}3$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=-2\sin2x-2\sin x=-4\sin x\cos x-2\sin x=-2\sin x(2\cos x+1)$.`,
          String.raw`$\sin x=0\Rightarrow x=0,\pi,2\pi$; $\cos x=-\frac12\Rightarrow x=\frac{2\pi}3,\frac{4\pi}3$.`,
          String.raw`סימן $f'=-2\sin x(2\cos x+1)$: ב-$\left(0,\frac{2\pi}3\right)$ – $\sin x>0$ ו-$2\cos x+1>0$, שלילי; ב-$\left(\frac{2\pi}3,\pi\right)$ – חיובי; ב-$\left(\pi,\frac{4\pi}3\right)$ – $\sin x<0$ ו-$2\cos x+1<0$, שלילי; ב-$\left(\frac{4\pi}3,2\pi\right)$ – חיובי.`,
          String.raw`מינימום ב-$x=\frac{2\pi}3$ וב-$x=\frac{4\pi}3$: $f=\cos\frac{4\pi}3+2\cos\frac{2\pi}3=-\frac12-1=-\frac32$. מקסימום מקומי ב-$x=\pi$: $f=1-2=-1$.`,
          String.raw`קצוות: $f(0)=f(2\pi)=1+2=3$ – מקסימום קצה בשניהם (יורדת מימין ל-$0$ ועולה לקראת $2\pi$); זה גם המקסימום המוחלט.`,
        ],
        finalAnswer: String.raw`מינימום $\left(\frac{2\pi}3,-\frac32\right)$, $\left(\frac{4\pi}3,-\frac32\right)$; מקסימום מקומי $(\pi,-1)$; מקסימום קצה $(0,3)$, $(2\pi,3)$.`,
        answers: [
          { label: String.raw`$y$ של נקודות המינימום`, value: -1.5 },
          { label: String.raw`$y$ של המקסימום המקומי שבתוך התחום`, value: -1 },
          { label: 'הערך הגדול ביותר', value: 3 },
        ],
      },
      {
        id: 'calc-trig-functions-6',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\tan x-2x$ בתחום $-\frac\pi2<x<\frac\pi2$. מצאו את האסימפטוטות האנכיות של הפונקציה, ואת נקודות הקיצון שלה וקבעו את סוגן.`,
        hints: [
          String.raw`$\tan x$ אינה מוגדרת כאשר $\cos x=0$.`,
          String.raw`$f'(x)=\frac{1}{\cos^2x}-2$. פתרו $\cos^2x=\frac12$.`,
          String.raw`בתחום $-\frac\pi2<x<\frac\pi2$ מתקיים $\cos x>0$.`,
        ],
        solutionSteps: [
          String.raw`$\tan x=\frac{\sin x}{\cos x}$ אינה מוגדרת כאשר $\cos x=0$, ובקצוות התחום $x=\pm\frac\pi2$ מתקיים $\tan x\to\pm\infty$: האסימפטוטות האנכיות הן $x=-\frac\pi2$ ו-$x=\frac\pi2$.`,
          String.raw`$f'(x)=\frac{1}{\cos^2x}-2$. $f'(x)=0\iff\cos^2x=\frac12\iff\cos x=\frac{\sqrt2}2$ (בתחום $\cos x>0$), כלומר $x=\pm\frac\pi4$.`,
          String.raw`$f'(x)=\frac{1-2\cos^2x}{\cos^2x}$: עבור $|x|<\frac\pi4$, $\cos^2x>\frac12$ ולכן $f'<0$; עבור $\frac\pi4<|x|<\frac\pi2$, $f'>0$.`,
          String.raw`מקסימום ב-$x=-\frac\pi4$: $f=-1+\frac\pi2\approx0.571$. מינימום ב-$x=\frac\pi4$: $f=1-\frac\pi2\approx-0.571$.`,
        ],
        finalAnswer: String.raw`אסימפטוטות $x=\pm\frac\pi2$; מקסימום $\left(-\frac\pi4,\frac\pi2-1\right)$, מינימום $\left(\frac\pi4,1-\frac\pi2\right)$.`,
        answers: [
          { label: String.raw`$x$ של נקודת המינימום`, value: Math.PI / 4 },
          { label: String.raw`$y$ של נקודת המינימום`, value: 1 - Math.PI / 2 },
          { label: 'האסימפטוטה האנכית הימנית $x=$', value: Math.PI / 2 },
        ],
      },
      {
        id: 'calc-trig-functions-7',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=x+\sin2x$ בתחום $0\le x\le\pi$.

א. מצאו את נקודות הקיצון המקומי (כולל קצוות) וקבעו את סוגן.

ב. מצאו את המקסימום המוחלט ואת המינימום המוחלט.

ג. מצאו את נקודת הפיתול.`,
        hints: [
          String.raw`$f'(x)=1+2\cos2x$. פתרו $\cos2x=-\frac12$ כאשר $0\le2x\le2\pi$.`,
          String.raw`השוו את ערכי הקיצון המקומי לערכים בקצוות $f(0)$, $f(\pi)$.`,
          String.raw`$f''(x)=-4\sin2x$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=1+2\cos2x$, ו-$f'(x)=0\iff\cos2x=-\frac12$. בתחום $0\le2x\le2\pi$: $2x=\frac{2\pi}3$ או $2x=\frac{4\pi}3$, כלומר $x=\frac\pi3$ ו-$x=\frac{2\pi}3$.`,
          String.raw`$f'>0$ עבור $0\le x<\frac\pi3$, $f'<0$ עבור $\frac\pi3<x<\frac{2\pi}3$, $f'>0$ עבור $\frac{2\pi}3<x\le\pi$.`,
          String.raw`מקסימום מקומי: $f\left(\frac\pi3\right)=\frac\pi3+\frac{\sqrt3}2\approx1.913$; מינימום מקומי: $f\left(\frac{2\pi}3\right)=\frac{2\pi}3-\frac{\sqrt3}2\approx1.228$.`,
          String.raw`קצוות: $f(0)=0$ – מינימום קצה; $f(\pi)=\pi+\sin2\pi=\pi\approx3.14$ – מקסימום קצה.`,
          String.raw`בהשוואה: המקסימום המוחלט הוא $\pi$ (ב-$x=\pi$), והוא גדול מהמקסימום המקומי $1.913$; המינימום המוחלט הוא $0$ (ב-$x=0$).`,
          String.raw`$f''(x)=-4\sin2x$, מתאפסת בתוך התחום ב-$x=\frac\pi2$ ומחליפה בה סימן (שלילית לפני, חיובית אחרי): נקודת הפיתול $\left(\frac\pi2,\frac\pi2\right)$.`,
        ],
        finalAnswer: String.raw`מקסימום מקומי $\left(\frac\pi3,\frac\pi3+\frac{\sqrt3}2\right)$, מינימום מקומי $\left(\frac{2\pi}3,\frac{2\pi}3-\frac{\sqrt3}2\right)$; מקסימום מוחלט $(\pi,\pi)$, מינימום מוחלט $(0,0)$; פיתול $\left(\frac\pi2,\frac\pi2\right)$.`,
        answers: [
          { label: String.raw`$x$ של המקסימום המקומי`, value: Math.PI / 3 },
          { label: String.raw`$y$ של המקסימום המקומי`, value: Math.PI / 3 + Math.sqrt(3) / 2 },
          { label: 'המקסימום המוחלט', value: Math.PI },
          { label: String.raw`$x$ של נקודת הפיתול`, value: Math.PI / 2 },
        ],
      },
      {
        id: 'calc-trig-functions-8',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{\sin x}{2+\cos x}$ בתחום $0\le x\le2\pi$.

א. הסבירו מדוע הפונקציה מוגדרת בכל התחום, ומצאו את נקודות החיתוך שלה עם ציר $x$.

ב. הראו ש-$f'(x)=\frac{2\cos x+1}{(2+\cos x)^2}$.

ג. מצאו את נקודות הקיצון (כולל קצוות) וקבעו את סוגן.`,
        hints: [
          String.raw`$\cos x\ge-1$, ולכן $2+\cos x\ge1$.`,
          String.raw`כלל המנה; במונה יתקבל $2\cos x+\cos^2x+\sin^2x$.`,
          String.raw`סימן $f'$ כסימן $2\cos x+1$.`,
        ],
        solutionSteps: [
          String.raw`$\cos x\ge-1$, ולכן $2+\cos x\ge1>0$ – המכנה אינו מתאפס. $f(x)=0\iff\sin x=0\iff x=0,\pi,2\pi$.`,
          String.raw`לפי כלל המנה: $f'(x)=\frac{\cos x(2+\cos x)-\sin x\cdot(-\sin x)}{(2+\cos x)^2}=\frac{2\cos x+\cos^2x+\sin^2x}{(2+\cos x)^2}=\frac{2\cos x+1}{(2+\cos x)^2}$.`,
          String.raw`$f'(x)=0\iff\cos x=-\frac12\iff x=\frac{2\pi}3$ או $x=\frac{4\pi}3$. המכנה חיובי, וסימן $f'$ כסימן $2\cos x+1$: חיובי ב-$0\le x<\frac{2\pi}3$, שלילי ב-$\frac{2\pi}3<x<\frac{4\pi}3$, חיובי ב-$\frac{4\pi}3<x\le2\pi$.`,
          String.raw`מקסימום: $f\left(\frac{2\pi}3\right)=\frac{\frac{\sqrt3}2}{2-\frac12}=\frac{\sqrt3}{3}$. מינימום: $f\left(\frac{4\pi}3\right)=-\frac{\sqrt3}3$.`,
          String.raw`קצוות: $(0,0)$ – מינימום קצה (הפונקציה עולה מימינו); $(2\pi,0)$ – מקסימום קצה (עולה לקראתו).`,
        ],
        finalAnswer: String.raw`חיתוך $(0,0)$, $(\pi,0)$, $(2\pi,0)$; מקסימום $\left(\frac{2\pi}3,\frac{\sqrt3}3\right)$, מינימום $\left(\frac{4\pi}3,-\frac{\sqrt3}3\right)$; מינימום קצה $(0,0)$, מקסימום קצה $(2\pi,0)$.`,
        answers: [
          { label: String.raw`$x$ של נקודת המקסימום`, value: (2 * Math.PI) / 3 },
          { label: String.raw`$y$ של נקודת המקסימום`, value: Math.sqrt(3) / 3 },
          { label: String.raw`$y$ של נקודת המינימום`, value: -Math.sqrt(3) / 3 },
        ],
      },
    ],
  },
};
