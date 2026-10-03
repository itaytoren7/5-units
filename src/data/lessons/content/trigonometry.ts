import type { LessonContent } from '../types';

/**
 * טריגונומטריה במישור – שאלה 5 בשאלון 806 (וחלקי הטריגונומטריה של שאלה 7).
 * כל שרטוט נבנה בקנה מידה ממודל קואורדינטות (קודקודים לפי Math.cos / Math.sin), ואותו מודל משמש
 * לבדיקה המספרית ב-trigonometry.test.ts.
 */
export const trigonometryContent: Record<string, LessonContent> = {
  'trig-basics': {
    intro: String.raw`בשיעור הזה מגדירים את $\sin$, $\cos$ ו-$\tan$ של כל זווית בעזרת **מעגל היחידה**: לזווית $\alpha$ מתאימה על המעגל שרדיוסו 1 הנקודה $(\cos\alpha,\sin\alpha)$. מההגדרה נובעים הסימנים ברביעים, הקשרים בין זוויות המשלימות ל-$90^\circ$ ול-$180^\circ$, הזוגיות והמחזוריות. בנוסף נמדוד זוויות ב**רדיאנים** ונחשב אורך קשת ושטח גזרה. אלה כלי היסוד של שאלה 5 (טריגונומטריה במישור) ושל שאלה 7 (חדו״א של פונקציות טריגונומטריות, שבה עובדים ברדיאנים).`,
    keyFacts: [
      String.raw`**מעגל היחידה**: לזווית $\alpha$ (נמדדת מהכיוון החיובי של ציר $x$ נגד כיוון השעון) מתאימה הנקודה $P(\cos\alpha,\sin\alpha)$, ו-$\tan\alpha=\frac{\sin\alpha}{\cos\alpha}$ הוא שיפוע הרדיוס $OP$. לכן **שיפוע ישר הוא $\tan$ של זווית הנטייה שלו**. סימנים: ברביע I הכול חיובי, ב-II רק $\sin$, ב-III רק $\tan$, ב-IV רק $\cos$.`,
      String.raw`**ערכים מיוחדים**: $\sin30^\circ=\frac12$, $\sin45^\circ=\frac{\sqrt2}{2}$, $\sin60^\circ=\frac{\sqrt3}{2}$, $\sin90^\circ=1$; ל-$\cos$ אותם ערכים בסדר הפוך; $\tan30^\circ=\frac{\sqrt3}{3}$, $\tan45^\circ=1$, $\tan60^\circ=\sqrt3$.`,
      String.raw`**זוויות משלימות**: $\sin(180^\circ-\alpha)=\sin\alpha$, $\cos(180^\circ-\alpha)=-\cos\alpha$, $\tan(180^\circ-\alpha)=-\tan\alpha$; $\sin(90^\circ-\alpha)=\cos\alpha$, $\cos(90^\circ-\alpha)=\sin\alpha$.`,
      String.raw`**זוגיות ומחזוריות**: $\cos(-\alpha)=\cos\alpha$ (זוגית), $\sin(-\alpha)=-\sin\alpha$ ו-$\tan(-\alpha)=-\tan\alpha$ (אי-זוגיות). $\sin$ ו-$\cos$ מחזוריות עם מחזור $360^\circ$, ו-$\tan$ עם מחזור $180^\circ$.`,
      String.raw`**רדיאנים**: $\pi$ רדיאנים $=180^\circ$, ולכן $\theta_{\text{rad}}=\alpha^\circ\cdot\frac{\pi}{180}$ ו-$\alpha^\circ=\theta_{\text{rad}}\cdot\frac{180}{\pi}$.`,
      String.raw`**אורך קשת ושטח גזרה** במעגל שרדיוסו $R$ עם זווית מרכזית $\theta$ ברדיאנים: $l=R\theta$, $S=\frac12R^2\theta$. במעלות: $l=2\pi R\cdot\frac{\alpha}{360^\circ}$, $S=\pi R^2\cdot\frac{\alpha}{360^\circ}$.`,
    ],
    exercises: [
      {
        id: 'trig-basics-1',
        difficulty: 1,
        statement: String.raw`המירו את $135^\circ$ לרדיאנים, ואת $\frac{5\pi}{6}$ רדיאנים למעלות.`,
        hints: [
          String.raw`השתמשו בקשר $\pi$ רדיאנים $=180^\circ$.`,
          String.raw`ממעלות לרדיאנים כופלים ב-$\frac{\pi}{180}$; מרדיאנים למעלות כופלים ב-$\frac{180}{\pi}$.`,
        ],
        solutionSteps: [
          String.raw`מכיוון ש-$\pi$ רדיאנים הם $180^\circ$, זווית של $1^\circ$ היא $\frac{\pi}{180}$ רדיאנים.`,
          String.raw`$135^\circ=135\cdot\frac{\pi}{180}=\frac{3\pi}{4}\approx2.36$ רדיאנים.`,
          String.raw`$\frac{5\pi}{6}=\frac56\cdot180^\circ=150^\circ$.`,
        ],
        finalAnswer: String.raw`$135^\circ=\frac{3\pi}{4}\approx2.36$ רדיאנים; $\frac{5\pi}{6}=150^\circ$.`,
        answers: [
          { label: String.raw`$135^\circ$ ברדיאנים`, value: 2.356194490192345 },
          { label: String.raw`$\frac{5\pi}{6}$ במעלות`, value: 150 },
        ],
      },
      {
        id: 'trig-basics-2',
        difficulty: 1,
        statement: String.raw`חשבו בלי מחשבון: $\sin150^\circ+\cos120^\circ+\tan135^\circ+\sin390^\circ$.`,
        hints: [
          String.raw`העבירו כל זווית לזווית חדה בעזרת הקשר $180^\circ-\alpha$ ובעזרת המחזוריות.`,
          String.raw`$150^\circ=180^\circ-30^\circ$, $120^\circ=180^\circ-60^\circ$, $135^\circ=180^\circ-45^\circ$, $390^\circ=30^\circ+360^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$\sin150^\circ=\sin(180^\circ-30^\circ)=\sin30^\circ=\frac12$.`,
          String.raw`$\cos120^\circ=\cos(180^\circ-60^\circ)=-\cos60^\circ=-\frac12$.`,
          String.raw`$\tan135^\circ=\tan(180^\circ-45^\circ)=-\tan45^\circ=-1$.`,
          String.raw`המחזור של $\sin$ הוא $360^\circ$, ולכן $\sin390^\circ=\sin(30^\circ+360^\circ)=\sin30^\circ=\frac12$.`,
          String.raw`הסכום: $\frac12-\frac12-1+\frac12=-\frac12$.`,
        ],
        finalAnswer: String.raw`$-\frac12$`,
        answers: [{ label: String.raw`ערך הביטוי`, value: -0.5 }],
      },
      {
        id: 'trig-basics-3',
        difficulty: 2,
        statement: String.raw`הנקודה $P$ נמצאת על מעגל היחידה ברביע השני, ושיעור ה-$x$ שלה הוא $-0.6$ (ראו שרטוט). $\alpha$ היא הזווית שבין הכיוון החיובי של ציר $x$ לבין הרדיוס $OP$.

מצאו את $\sin\alpha$ ואת $\tan\alpha$, וחשבו את $\alpha$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="66.5" y1="123.5" x2="253.5" y2="123.5" stroke-width="1" />
  <line x1="160.0" y1="210.0" x2="160.0" y2="30.0" stroke-width="1" />
  <polyline points="247.5,119.5 253.5,123.5 247.5,127.5" stroke-width="1" />
  <polyline points="156.0,36.0 160.0,30.0 164.0,36.0" stroke-width="1" />
  <circle cx="160.0" cy="123.5" r="69.2" stroke-width="1.5" />
  <line x1="160.0" y1="123.5" x2="118.5" y2="68.1" />
  <line x1="118.5" y1="68.1" x2="118.5" y2="123.5" stroke-width="1.5" stroke-dasharray="5 3" />
  <path d="M 180.0,123.5 A 20 20 0 0 0 148.0,107.5" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="173.9" y="100.7" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="249.5" y="141.5" font-size="14" text-anchor="middle" font-style="italic">x</text>
    <text x="172.0" y="38.0" font-size="14" text-anchor="middle" font-style="italic">y</text>
    <text x="237.2" y="139.5" font-size="14" text-anchor="middle">1</text>
    <text x="118.5" y="141.5" font-size="14" text-anchor="middle">−0.6</text>
    <text x="170.0" y="143.5" text-anchor="middle">O</text>
    <text x="106.5" y="66.1" text-anchor="middle">P</text>
  </g>
</svg>`,
        hints: [
          String.raw`לנקודה על מעגל היחידה יש שיעורים $(\cos\alpha,\sin\alpha)$, ולכן $\cos\alpha=-0.6$.`,
          String.raw`הנקודה על מעגל שרדיוסו 1 ומרכזו בראשית, ולכן $x^2+y^2=1$; ברביע השני $y>0$.`,
          String.raw`המחשבון נותן ל-$\cos^{-1}(-0.6)$ זווית בין $0^\circ$ ל-$180^\circ$ – בדיוק הזווית המבוקשת.`,
        ],
        solutionSteps: [
          String.raw`לנקודה על מעגל היחידה המתאימה לזווית $\alpha$ יש שיעורים $(\cos\alpha,\sin\alpha)$, ולכן $\cos\alpha=-0.6$.`,
          String.raw`הנקודה על המעגל $x^2+y^2=1$, ולכן $y^2=1-0.36=0.64$ ו-$y=\pm0.8$. הנקודה ברביע השני, לכן $y>0$: $\sin\alpha=0.8$.`,
          String.raw`$\tan\alpha=\frac{\sin\alpha}{\cos\alpha}=\frac{0.8}{-0.6}=-\frac43$ (שלילי, כמצופה ברביע השני).`,
          String.raw`הזווית החדה $\beta$ שבה $\cos\beta=0.6$ היא $\beta\approx53.13^\circ$, ולפי $\cos(180^\circ-\beta)=-\cos\beta$ מתקבל $\alpha=180^\circ-\beta\approx126.87^\circ$.`,
        ],
        finalAnswer: String.raw`$\sin\alpha=0.8$, $\tan\alpha=-\frac43$, $\alpha\approx126.87^\circ$`,
        answers: [
          { label: String.raw`$\sin\alpha$`, value: 0.8 },
          { label: String.raw`$\tan\alpha$`, value: -1.3333333333333333 },
          { label: String.raw`$\alpha$ (במעלות)`, value: 126.86989764584402 },
        ],
      },
      {
        id: 'trig-basics-4',
        difficulty: 2,
        statement: String.raw`הראו שערך הביטוי $$\frac{\sin(180^\circ-\alpha)\cdot\cos(-\alpha)}{\cos(90^\circ-\alpha)\cdot\cos(180^\circ-\alpha)}$$ אינו תלוי ב-$\alpha$ (לכל $\alpha$ שבה הביטוי מוגדר), ומצאו אותו.`,
        hints: [
          String.raw`החליפו כל גורם בפונקציה טריגונומטרית של $\alpha$ עצמה.`,
          String.raw`$\sin(180^\circ-\alpha)=\sin\alpha$, $\cos(-\alpha)=\cos\alpha$, $\cos(90^\circ-\alpha)=\sin\alpha$, $\cos(180^\circ-\alpha)=-\cos\alpha$.`,
        ],
        solutionSteps: [
          String.raw`לפי הקשרים בין זוויות המשלימות ל-$180^\circ$: $\sin(180^\circ-\alpha)=\sin\alpha$ ו-$\cos(180^\circ-\alpha)=-\cos\alpha$.`,
          String.raw`$\cos$ היא פונקציה זוגית, ולכן $\cos(-\alpha)=\cos\alpha$. לפי הקשר בין זוויות המשלימות ל-$90^\circ$: $\cos(90^\circ-\alpha)=\sin\alpha$.`,
          String.raw`מציבים: $\frac{\sin\alpha\cdot\cos\alpha}{\sin\alpha\cdot(-\cos\alpha)}=-1$. הצמצום מותר כי הביטוי מוגדר רק כאשר $\sin\alpha\ne0$ ו-$\cos\alpha\ne0$.`,
        ],
        finalAnswer: String.raw`ערך הביטוי הוא $-1$ לכל $\alpha$ שבה הוא מוגדר.`,
        answers: [{ label: String.raw`ערך הביטוי`, value: -1 }],
      },
      {
        id: 'trig-basics-5',
        difficulty: 2,
        statement: String.raw`במעגל שמרכזו $O$ ורדיוסו 9 ס״מ, הזווית המרכזית היא $\angle AOB=140^\circ$ (ראו שרטוט). חשבו את אורך הקשת $AB$ המודגשת ואת שטח הגזרה $AOB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="90.0" stroke-width="1" stroke-dasharray="5 3" />
  <line x1="160.0" y1="120.0" x2="244.6" y2="89.2" />
  <line x1="160.0" y1="120.0" x2="75.4" y2="89.2" />
  <path d="M 244.6,89.2 A 90.0 90.0 0 0 0 75.4,89.2" stroke-width="3.5" />
  <path d="M 176.9,113.8 A 18 18 0 0 0 143.1,113.8" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="160.0" y="88.0" font-size="14" text-anchor="middle">140°</text>
    <text x="206.4" y="120.9" font-size="14" text-anchor="middle">9</text>
    <text x="160.0" y="142.0" text-anchor="middle">O</text>
    <text x="259.6" y="95.1" text-anchor="middle">A</text>
    <text x="60.4" y="95.1" text-anchor="middle">B</text>
  </g>
</svg>`,
        hints: [
          String.raw`המירו את הזווית לרדיאנים: $\theta=140\cdot\frac{\pi}{180}$.`,
          String.raw`אורך קשת $l=R\theta$ ושטח גזרה $S=\frac12R^2\theta$ ($\theta$ ברדיאנים).`,
        ],
        solutionSteps: [
          String.raw`$\theta=140\cdot\frac{\pi}{180}=\frac{7\pi}{9}$ רדיאנים.`,
          String.raw`אורך הקשת: $l=R\theta=9\cdot\frac{7\pi}{9}=7\pi\approx21.99$ ס״מ.`,
          String.raw`שטח הגזרה: $S=\frac12R^2\theta=\frac12\cdot81\cdot\frac{7\pi}{9}=31.5\pi\approx98.96$ סמ״ר.`,
          String.raw`בדיקה במעלות: הגזרה היא $\frac{140}{360}=\frac{7}{18}$ מהעיגול, ואכן $\frac{7}{18}\cdot2\pi\cdot9=7\pi$ ו-$\frac{7}{18}\cdot\pi\cdot9^2=31.5\pi$.`,
        ],
        finalAnswer: String.raw`אורך הקשת $7\pi\approx21.99$ ס״מ, שטח הגזרה $31.5\pi\approx98.96$ סמ״ר.`,
        answers: [
          { label: String.raw`אורך הקשת $AB$`, value: 21.991148575128552 },
          { label: String.raw`שטח הגזרה`, value: 98.96016858807849 },
        ],
      },
      {
        id: 'trig-basics-6',
        difficulty: 2,
        statement: String.raw`ישר עובר בראשית הצירים $O$ ויוצר זווית של $150^\circ$ עם הכיוון החיובי של ציר $x$ (ראו שרטוט).

א. מצאו את שיפוע הישר.

ב. מצאו את נקודת החיתוך $P$ של הישר עם מעגל היחידה ברביע השני.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="62.8" y1="123.6" x2="257.2" y2="123.6" stroke-width="1" />
  <line x1="160.0" y1="210.0" x2="160.0" y2="30.0" stroke-width="1" />
  <polyline points="251.2,119.6 257.2,123.6 251.2,127.6" stroke-width="1" />
  <polyline points="156.0,36.0 160.0,30.0 164.0,36.0" stroke-width="1" />
  <circle cx="160.0" cy="123.6" r="72.0" stroke-width="1.5" />
  <line x1="78.9" y1="76.8" x2="241.1" y2="170.4" />
  <path d="M 182.0,123.6 A 22 22 0 0 0 140.9,112.6" stroke-width="1.2" />
  <circle cx="97.6" cy="87.6" r="2.5" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="170.6" y="89.0" font-size="14" text-anchor="middle">150°</text>
    <text x="253.2" y="141.6" font-size="14" text-anchor="middle" font-style="italic">x</text>
    <text x="172.0" y="38.0" font-size="14" text-anchor="middle" font-style="italic">y</text>
    <text x="170.0" y="143.6" text-anchor="middle">O</text>
    <text x="93.6" y="77.6" text-anchor="middle">P</text>
  </g>
</svg>`,
        hints: [
          String.raw`שיפוע ישר שווה ל-$\tan$ של הזווית שהוא יוצר עם הכיוון החיובי של ציר $x$.`,
          String.raw`$\tan150^\circ=-\tan30^\circ$; הנקודה המתאימה לזווית $150^\circ$ על מעגל היחידה היא $(\cos150^\circ,\sin150^\circ)$.`,
        ],
        solutionSteps: [
          String.raw`א. שיפוע ישר הוא $\tan$ של זווית הנטייה שלו: $m=\tan150^\circ=\tan(180^\circ-30^\circ)=-\tan30^\circ=-\frac{\sqrt3}{3}\approx-0.577$.`,
          String.raw`ב. הנקודה על מעגל היחידה בכיוון $150^\circ$ היא $P(\cos150^\circ,\sin150^\circ)$.`,
          String.raw`$\cos150^\circ=-\cos30^\circ=-\frac{\sqrt3}{2}$ ו-$\sin150^\circ=\sin30^\circ=\frac12$, ולכן $P\left(-\frac{\sqrt3}{2},\frac12\right)$.`,
          String.raw`בדיקה: $\frac{y_P}{x_P}=\frac{1/2}{-\sqrt3/2}=-\frac{1}{\sqrt3}$ – שווה לשיפוע, ו-$x_P^2+y_P^2=\frac34+\frac14=1$.`,
        ],
        finalAnswer: String.raw`$m=-\frac{\sqrt3}{3}\approx-0.58$; $P\left(-\frac{\sqrt3}{2},\frac12\right)\approx(-0.87,\,0.5)$`,
        answers: [
          { label: String.raw`השיפוע $m$`, value: -0.5773502691896258 },
          { label: String.raw`$x_P$`, value: -0.8660254037844386 },
          { label: String.raw`$y_P$`, value: 0.5 },
        ],
      },
      {
        id: 'trig-basics-7',
        difficulty: 3,
        statement: String.raw`היקף של גזרה עיגולית (שני הרדיוסים והקשת) הוא 20 ס״מ, ושטחה 24 סמ״ר. מצאו את רדיוס הגזרה ואת הזווית המרכזית שלה ברדיאנים. מצאו את כל האפשרויות.`,
        hints: [
          String.raw`סמנו רדיוס $r$ וזווית $\theta$ ברדיאנים: ההיקף $2r+r\theta$ והשטח $\frac12r^2\theta$.`,
          String.raw`מהמשוואה הראשונה $r\theta=20-2r$; כתבו את השטח כ-$\frac12r\cdot(r\theta)$ והציבו.`,
          String.raw`תתקבל משוואה ריבועית ב-$r$; בדקו שבכל פתרון $0<\theta<2\pi$.`,
        ],
        solutionSteps: [
          String.raw`נסמן את הרדיוס $r$ ואת הזווית המרכזית $\theta$ (ברדיאנים). אורך הקשת הוא $r\theta$, ולכן ההיקף $2r+r\theta=20$, והשטח $\frac12r^2\theta=24$.`,
          String.raw`מהמשוואה הראשונה $r\theta=20-2r$. נכתוב את השטח כ-$\frac12r\cdot(r\theta)=24$ ונציב: $\frac12r(20-2r)=24$.`,
          String.raw`$10r-r^2=24\iff r^2-10r+24=0\iff(r-4)(r-6)=0$, ולכן $r=4$ או $r=6$.`,
          String.raw`עבור $r=4$: $\theta=\frac{20-8}{4}=3$ רדיאנים ($\approx171.9^\circ$). עבור $r=6$: $\theta=\frac{20-12}{6}=\frac43$ רדיאנים ($\approx76.4^\circ$).`,
          String.raw`בשני המקרים $0<\theta<2\pi$, ולכן שתי הגזרות אפשריות. בדיקה: $\frac12\cdot16\cdot3=24$ ו-$\frac12\cdot36\cdot\frac43=24$.`,
        ],
        finalAnswer: String.raw`$r=4$ ס״מ ו-$\theta=3$ רדיאנים, או $r=6$ ס״מ ו-$\theta=\frac43$ רדיאנים.`,
        answers: [
          { label: String.raw`$r$ (פתרון ראשון)`, value: 4 },
          { label: String.raw`$\theta$ (פתרון ראשון)`, value: 3 },
          { label: String.raw`$r$ (פתרון שני)`, value: 6 },
          { label: String.raw`$\theta$ (פתרון שני)`, value: 1.3333333333333333 },
        ],
      },
      {
        id: 'trig-basics-8',
        difficulty: 3,
        statement: String.raw`במעגל שמרכזו $O$ ורדיוסו 10, המיתר $AB$ נשען על הזווית המרכזית $\angle AOB=120^\circ$ (ראו שרטוט).

א. חשבו את אורך המיתר $AB$.

ב. חשבו את שטח הקטע המעגלי האפור – השטח שבין המיתר $AB$ לקשת הקטנה $AB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="90.0" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="82.1" y2="165.0" />
  <line x1="160.0" y1="120.0" x2="237.9" y2="165.0" />
  <line x1="82.1" y1="165.0" x2="237.9" y2="165.0" />
  <path d="M 82.1,165.0 A 90.0 90.0 0 0 0 237.9,165.0 Z" fill="currentColor" fill-opacity="0.18" stroke="none" />
  <path d="M 146.1,128.0 A 16 16 0 0 0 173.9,128.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="160.0" y="160.0" font-size="14" text-anchor="middle">120°</text>
    <text x="193.0" y="157.9" font-size="14" text-anchor="middle">10</text>
    <text x="160.0" y="114.0" text-anchor="middle">O</text>
    <text x="70.1" y="175.0" text-anchor="middle">A</text>
    <text x="249.9" y="175.0" text-anchor="middle">B</text>
  </g>
</svg>`,
        hints: [
          String.raw`הורידו אנך $OM$ למיתר. במשולש שווה-השוקיים $AOB$ הוא גם תיכון וגם חוצה זווית, ולכן $\angle AOM=60^\circ$.`,
          String.raw`שטח הקטע = שטח הגזרה $AOB$ פחות שטח המשולש $AOB$.`,
          String.raw`שטח המשולש $\frac12\cdot AB\cdot OM$; שטח הגזרה $\frac12R^2\theta$ עם $\theta=\frac{2\pi}{3}$.`,
        ],
        solutionSteps: [
          String.raw`המשולש $AOB$ שווה-שוקיים ($OA=OB=10$, רדיוסים). נוריד אנך $OM$ למיתר; במשולש שווה-שוקיים הגובה לבסיס הוא גם תיכון וגם חוצה זווית הראש, ולכן $AM=MB$ ו-$\angle AOM=60^\circ$.`,
          String.raw`במשולש ישר הזווית $AOM$: $AM=10\sin60^\circ=5\sqrt3$ ו-$OM=10\cos60^\circ=5$.`,
          String.raw`א. $AB=2AM=10\sqrt3\approx17.32$.`,
          String.raw`שטח המשולש: $S_{AOB}=\frac12\cdot AB\cdot OM=\frac12\cdot10\sqrt3\cdot5=25\sqrt3\approx43.30$.`,
          String.raw`$120^\circ=\frac{2\pi}{3}$ רדיאנים, ולכן שטח הגזרה $\frac12\cdot10^2\cdot\frac{2\pi}{3}=\frac{100\pi}{3}\approx104.72$.`,
          String.raw`ב. שטח הקטע $=\frac{100\pi}{3}-25\sqrt3\approx61.42$.`,
        ],
        finalAnswer: String.raw`$AB=10\sqrt3\approx17.32$; שטח הקטע $\frac{100\pi}{3}-25\sqrt3\approx61.42$.`,
        answers: [
          { label: String.raw`אורך $AB$`, value: 17.32050807568877 },
          { label: String.raw`שטח הקטע`, value: 61.41848493043785 },
        ],
      },
    ],
  },
  'trig-identities': {
    intro: String.raw`זהות טריגונומטרית היא שוויון שמתקיים לכל זווית שבה שני האגפים מוגדרים. בבחינה של 2026 נדרשות רק הזהויות $\tan\alpha=\frac{\sin\alpha}{\cos\alpha}$, $\sin^2\alpha+\cos^2\alpha=1$, סינוס וקוסינוס של **סכום והפרש** זוויות ו**זווית כפולה**; הזהויות של סכום והפרש סינוסים או קוסינוסים ($\sin\alpha\pm\sin\beta$, $\cos\alpha\pm\cos\beta$) ירדו במיקוד, ולא נשתמש בהן. בעזרת הזהויות מחשבים ערכים מדויקים, מפשטים ביטויים ומוכיחים – בשאלה 5 (למשל כשמביעים אורכים באמצעות $\alpha$) ובשאלה 7 (בפתרון $f'(x)=0$).`,
    keyFacts: [
      String.raw`**זהויות יסוד**: $\sin^2\alpha+\cos^2\alpha=1$ (הזהות הפיתגורית) ו-$\tan\alpha=\frac{\sin\alpha}{\cos\alpha}$. מחלוקה ב-$\cos^2\alpha$ מתקבל $1+\tan^2\alpha=\frac{1}{\cos^2\alpha}$.`,
      String.raw`**מציאת פונקציה מתוך אחרת**: $\cos\alpha=\pm\sqrt{1-\sin^2\alpha}$ – הסימן נקבע לפי הרביע שבו נמצאת $\alpha$ (בזווית של משולש: $\sin\alpha>0$ תמיד, ו-$\cos\alpha<0$ רק בזווית קהה).`,
      String.raw`**סכום והפרש זוויות**: $\sin(\alpha\pm\beta)=\sin\alpha\cos\beta\pm\cos\alpha\sin\beta$, $\cos(\alpha\pm\beta)=\cos\alpha\cos\beta\mp\sin\alpha\sin\beta$.`,
      String.raw`**זווית כפולה**: $\sin2\alpha=2\sin\alpha\cos\alpha$, $\cos2\alpha=\cos^2\alpha-\sin^2\alpha=2\cos^2\alpha-1=1-2\sin^2\alpha$. בוחרים את הצורה של $\cos2\alpha$ שמתאימה לביטוי (למשל $1+\cos2\alpha=2\cos^2\alpha$).`,
      String.raw`**הוכחת זהות**: יוצאים מאגף אחד (בדרך כלל המסובך) ומגיעים לאגף השני, או מפשטים את שני האגפים לאותו ביטוי. לא ״מעבירים אגפים״ בשוויון שעדיין לא הוכח.`,
    ],
    exercises: [
      {
        id: 'trig-identities-1',
        difficulty: 1,
        statement: String.raw`נתון $\sin\alpha=\frac35$, ו-$\alpha$ זווית חדה. חשבו את $\cos\alpha$ ואת $\tan\alpha$.`,
        hints: [
          String.raw`השתמשו בזהות $\sin^2\alpha+\cos^2\alpha=1$.`,
          String.raw`$\alpha$ חדה, ולכן $\cos\alpha>0$.`,
        ],
        solutionSteps: [
          String.raw`לפי הזהות $\sin^2\alpha+\cos^2\alpha=1$: $\cos^2\alpha=1-\frac{9}{25}=\frac{16}{25}$.`,
          String.raw`$\alpha$ חדה, ולכן $\cos\alpha>0$ ו-$\cos\alpha=\frac45$.`,
          String.raw`$\tan\alpha=\frac{\sin\alpha}{\cos\alpha}=\frac{3/5}{4/5}=\frac34$.`,
        ],
        finalAnswer: String.raw`$\cos\alpha=\frac45$, $\tan\alpha=\frac34$`,
        answers: [
          { label: String.raw`$\cos\alpha$`, value: 0.8 },
          { label: String.raw`$\tan\alpha$`, value: 0.75 },
        ],
      },
      {
        id: 'trig-identities-2',
        difficulty: 1,
        statement: String.raw`חשבו את הערכים המדויקים של $\sin75^\circ$ ושל $\cos75^\circ$, בעזרת $75^\circ=45^\circ+30^\circ$.`,
        hints: [
          String.raw`השתמשו בזהויות $\sin(\alpha+\beta)$ ו-$\cos(\alpha+\beta)$ עם $\alpha=45^\circ$, $\beta=30^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$\sin(45^\circ+30^\circ)=\sin45^\circ\cos30^\circ+\cos45^\circ\sin30^\circ=\frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2}+\frac{\sqrt2}{2}\cdot\frac12=\frac{\sqrt6+\sqrt2}{4}\approx0.966$.`,
          String.raw`$\cos(45^\circ+30^\circ)=\cos45^\circ\cos30^\circ-\sin45^\circ\sin30^\circ=\frac{\sqrt6}{4}-\frac{\sqrt2}{4}=\frac{\sqrt6-\sqrt2}{4}\approx0.259$.`,
          String.raw`בדיקת סבירות: $75^\circ$ קרובה ל-$90^\circ$, ולכן $\sin75^\circ$ קרוב ל-1 ו-$\cos75^\circ$ קטן.`,
        ],
        finalAnswer: String.raw`$\sin75^\circ=\frac{\sqrt6+\sqrt2}{4}\approx0.97$, $\cos75^\circ=\frac{\sqrt6-\sqrt2}{4}\approx0.26$`,
        answers: [
          { label: String.raw`$\sin75^\circ$`, value: 0.9659258262890682 },
          { label: String.raw`$\cos75^\circ$`, value: 0.2588190451025207 },
        ],
      },
      {
        id: 'trig-identities-3',
        difficulty: 2,
        statement: String.raw`נתון $\cos\alpha=-0.6$ ו-$180^\circ<\alpha<270^\circ$. חשבו את $\sin2\alpha$ ואת $\cos2\alpha$.`,
        hints: [
          String.raw`מצאו תחילה את $\sin\alpha$; ברביע השלישי $\sin\alpha<0$.`,
          String.raw`$\sin2\alpha=2\sin\alpha\cos\alpha$, $\cos2\alpha=\cos^2\alpha-\sin^2\alpha$.`,
        ],
        solutionSteps: [
          String.raw`$\sin^2\alpha=1-\cos^2\alpha=1-0.36=0.64$. ברביע השלישי $\sin\alpha<0$, ולכן $\sin\alpha=-0.8$.`,
          String.raw`$\sin2\alpha=2\sin\alpha\cos\alpha=2\cdot(-0.8)\cdot(-0.6)=0.96$.`,
          String.raw`$\cos2\alpha=\cos^2\alpha-\sin^2\alpha=0.36-0.64=-0.28$.`,
          String.raw`בדיקה: $0.96^2+(-0.28)^2=0.9216+0.0784=1$, כנדרש מהזהות הפיתגורית לזווית $2\alpha$.`,
        ],
        finalAnswer: String.raw`$\sin2\alpha=0.96$, $\cos2\alpha=-0.28$`,
        answers: [
          { label: String.raw`$\sin2\alpha$`, value: 0.96 },
          { label: String.raw`$\cos2\alpha$`, value: -0.28 },
        ],
      },
      {
        id: 'trig-identities-4',
        difficulty: 2,
        statement: String.raw`הוכיחו את הזהות $$\frac{\sin2\alpha}{1+\cos2\alpha}=\tan\alpha$$ (לכל $\alpha$ שבה שני האגפים מוגדרים).`,
        hints: [
          String.raw`פתחו את המונה ואת המכנה לפי זהויות הזווית הכפולה.`,
          String.raw`בחרו את הצורה של $\cos2\alpha$ שמבטלת את ה-1: $\cos2\alpha=2\cos^2\alpha-1$.`,
        ],
        solutionSteps: [
          String.raw`המונה: לפי זהות הזווית הכפולה $\sin2\alpha=2\sin\alpha\cos\alpha$.`,
          String.raw`המכנה: לפי $\cos2\alpha=2\cos^2\alpha-1$ מתקבל $1+\cos2\alpha=2\cos^2\alpha$.`,
          String.raw`לכן האגף השמאלי שווה ל-$\frac{2\sin\alpha\cos\alpha}{2\cos^2\alpha}=\frac{\sin\alpha}{\cos\alpha}=\tan\alpha$ (הצמצום ב-$2\cos\alpha$ מותר, כי כאשר שני האגפים מוגדרים $\cos\alpha\ne0$).`,
        ],
        finalAnswer: String.raw`האגף השמאלי מצטמצם ל-$\frac{\sin\alpha}{\cos\alpha}=\tan\alpha$, והזהות הוכחה.`,
      },
      {
        id: 'trig-identities-5',
        difficulty: 2,
        statement: String.raw`א. הוכיחו כי $(\sin\alpha-\cos\alpha)^2=1-\sin2\alpha$.

ב. נתון $\sin\alpha-\cos\alpha=\frac13$. חשבו את $\sin2\alpha$.`,
        hints: [
          String.raw`פתחו את הריבוע לפי נוסחת הכפל המקוצר.`,
          String.raw`$\sin^2\alpha+\cos^2\alpha=1$ ו-$2\sin\alpha\cos\alpha=\sin2\alpha$.`,
        ],
        solutionSteps: [
          String.raw`א. $(\sin\alpha-\cos\alpha)^2=\sin^2\alpha-2\sin\alpha\cos\alpha+\cos^2\alpha$.`,
          String.raw`לפי $\sin^2\alpha+\cos^2\alpha=1$ ולפי $2\sin\alpha\cos\alpha=\sin2\alpha$, הביטוי שווה ל-$1-\sin2\alpha$.`,
          String.raw`ב. מציבים את הנתון בזהות: $\left(\frac13\right)^2=1-\sin2\alpha$, ולכן $\sin2\alpha=1-\frac19=\frac89$.`,
        ],
        finalAnswer: String.raw`$\sin2\alpha=\frac89\approx0.89$`,
        answers: [{ label: String.raw`$\sin2\alpha$`, value: 0.8888888888888888 }],
      },
      {
        id: 'trig-identities-6',
        difficulty: 2,
        statement: String.raw`הוכיחו כי לכל זווית $\alpha$ מתקיים $$\sin(30^\circ+\alpha)-\cos(60^\circ+\alpha)=\sqrt3\sin\alpha.$$`,
        hints: [
          String.raw`פתחו כל איבר בעזרת זהויות הסכום.`,
          String.raw`$\sin30^\circ=\cos60^\circ=\frac12$ ו-$\cos30^\circ=\sin60^\circ=\frac{\sqrt3}{2}$.`,
        ],
        solutionSteps: [
          String.raw`לפי סינוס של סכום: $\sin(30^\circ+\alpha)=\sin30^\circ\cos\alpha+\cos30^\circ\sin\alpha=\frac12\cos\alpha+\frac{\sqrt3}{2}\sin\alpha$.`,
          String.raw`לפי קוסינוס של סכום: $\cos(60^\circ+\alpha)=\cos60^\circ\cos\alpha-\sin60^\circ\sin\alpha=\frac12\cos\alpha-\frac{\sqrt3}{2}\sin\alpha$.`,
          String.raw`מחסרים: $\frac12\cos\alpha+\frac{\sqrt3}{2}\sin\alpha-\frac12\cos\alpha+\frac{\sqrt3}{2}\sin\alpha=\sqrt3\sin\alpha$, כנדרש.`,
        ],
        finalAnswer: String.raw`האגף השמאלי שווה ל-$\sqrt3\sin\alpha$, והזהות הוכחה.`,
      },
      {
        id: 'trig-identities-7',
        difficulty: 3,
        statement: String.raw`$\alpha$ ו-$\beta$ הן זוויות חדות, ונתון $\tan\alpha=2$, $\tan\beta=\frac13$.

א. חשבו את $\sin(\alpha-\beta)$.

ב. הסיקו את גודל הזווית $\alpha-\beta$.`,
        hints: [
          String.raw`מצאו את $\sin$ ואת $\cos$ של כל זווית בעזרת $1+\tan^2\alpha=\frac{1}{\cos^2\alpha}$.`,
          String.raw`$\sin\alpha=\frac{2}{\sqrt5}$, $\cos\alpha=\frac{1}{\sqrt5}$, $\sin\beta=\frac{1}{\sqrt{10}}$, $\cos\beta=\frac{3}{\sqrt{10}}$.`,
          String.raw`כדי לבחור את הזווית הנכונה, קבעו באיזה תחום נמצאת $\alpha-\beta$.`,
        ],
        solutionSteps: [
          String.raw`$\alpha$ חדה ו-$\tan\alpha=2$: לפי $1+\tan^2\alpha=\frac{1}{\cos^2\alpha}$ מתקבל $\cos^2\alpha=\frac15$, ולכן $\cos\alpha=\frac{1}{\sqrt5}$ ו-$\sin\alpha=\tan\alpha\cdot\cos\alpha=\frac{2}{\sqrt5}$.`,
          String.raw`באותו אופן עבור $\beta$: $\cos^2\beta=\frac{1}{1+\frac19}=\frac{9}{10}$, ולכן $\cos\beta=\frac{3}{\sqrt{10}}$ ו-$\sin\beta=\frac{1}{\sqrt{10}}$.`,
          String.raw`א. $\sin(\alpha-\beta)=\sin\alpha\cos\beta-\cos\alpha\sin\beta=\frac{2}{\sqrt5}\cdot\frac{3}{\sqrt{10}}-\frac{1}{\sqrt5}\cdot\frac{1}{\sqrt{10}}=\frac{5}{\sqrt{50}}=\frac{\sqrt2}{2}$.`,
          String.raw`ב. $\tan$ עולה ברביע הראשון ו-$\tan\alpha>\tan\beta$, ולכן $\alpha>\beta$ ו-$0^\circ<\alpha-\beta<90^\circ$. בתחום זה הזווית היחידה שהסינוס שלה $\frac{\sqrt2}{2}$ היא $45^\circ$.`,
        ],
        finalAnswer: String.raw`$\sin(\alpha-\beta)=\frac{\sqrt2}{2}$, ולכן $\alpha-\beta=45^\circ$.`,
        answers: [
          { label: String.raw`$\sin(\alpha-\beta)$`, value: 0.7071067811865476 },
          { label: String.raw`$\alpha-\beta$ (במעלות)`, value: 45 },
        ],
      },
      {
        id: 'trig-identities-8',
        difficulty: 3,
        statement: String.raw`א. הוכיחו כי $\sin3\alpha=3\sin\alpha-4\sin^3\alpha$.

ב. נתון $\sin\alpha=\frac13$. חשבו את $\sin3\alpha$.`,
        hints: [
          String.raw`כתבו $3\alpha=2\alpha+\alpha$ והשתמשו בסינוס של סכום.`,
          String.raw`הציבו $\sin2\alpha=2\sin\alpha\cos\alpha$ ו-$\cos2\alpha=1-2\sin^2\alpha$, ואת $\cos^2\alpha$ שיתקבל החליפו ב-$1-\sin^2\alpha$.`,
        ],
        solutionSteps: [
          String.raw`א. $\sin3\alpha=\sin(2\alpha+\alpha)=\sin2\alpha\cos\alpha+\cos2\alpha\sin\alpha$.`,
          String.raw`לפי זהות הזווית הכפולה והזהות הפיתגורית: $\sin2\alpha\cos\alpha=2\sin\alpha\cos^2\alpha=2\sin\alpha(1-\sin^2\alpha)=2\sin\alpha-2\sin^3\alpha$.`,
          String.raw`לפי $\cos2\alpha=1-2\sin^2\alpha$: $\cos2\alpha\sin\alpha=\sin\alpha-2\sin^3\alpha$.`,
          String.raw`מחברים: $\sin3\alpha=3\sin\alpha-4\sin^3\alpha$.`,
          String.raw`ב. $\sin3\alpha=3\cdot\frac13-4\cdot\frac{1}{27}=1-\frac{4}{27}=\frac{23}{27}\approx0.85$. התוצאה אינה תלויה ברביע של $\alpha$, כי הביטוי תלוי רק ב-$\sin\alpha$.`,
        ],
        finalAnswer: String.raw`$\sin3\alpha=\frac{23}{27}\approx0.85$`,
        answers: [{ label: String.raw`$\sin3\alpha$`, value: 0.8518518518518519 }],
      },
    ],
  },
  'trig-equations': {
    intro: String.raw`פותרים משוואה טריגונומטרית בשני שלבים: מוצאים **פתרון כללי** (כל הפתרונות, בעזרת המחזוריות ומספר שלם $k$), ואז מציבים ערכי $k$ כדי לקבל את **הפתרונות בתחום הנתון**. לפי המיקוד נדרשים רק הסוגים: $\sin(ax+b)=c$, $\cos(ax+b)=c$, $\tan(ax+b)=c$, $a\sin x\pm b\cos x=0$, השוואות מהצורה $\sin\alpha=\sin\beta$ (וכן ל-$\cos$ ול-$\tan$), ומשוואות שנפתרות בפירוק לגורמים או כמשוואה ריבועית; לא יידרש $a\sin x+b\cos x=c$ כאשר $a\ne b$ ו-$c\ne0$. בבחינה המשוואות מופיעות כחלק מבעיה – בשאלה 5 (מציאת זווית) ובשאלה 7 (פתרון $f'(x)=0$, ברדיאנים) – וכאן מתרגלים אותן בנפרד.`,
    keyFacts: [
      String.raw`**פתרון כללי** ($k$ שלם): $\sin x=c\Rightarrow x=x_0+360^\circ k$ או $x=180^\circ-x_0+360^\circ k$; $\cos x=c\Rightarrow x=\pm x_0+360^\circ k$; $\tan x=c\Rightarrow x=x_0+180^\circ k$ ($x_0$ – הזווית שהמחשבון נותן). ברדיאנים: $360^\circ\to2\pi$, $180^\circ\to\pi$.`,
      String.raw`**$\sin(ax+b)=c$**: פותרים תחילה עבור הביטוי $ax+b$ כולו, ורק אחר כך מבודדים את $x$ – ומחלקים ב-$a$ גם את המחזור (למשל $2x=60^\circ+360^\circ k\Rightarrow x=30^\circ+180^\circ k$).`,
      String.raw`**השוואה**: $\sin\alpha=\sin\beta\iff\alpha=\beta+360^\circ k$ או $\alpha=180^\circ-\beta+360^\circ k$; $\cos\alpha=\cos\beta\iff\alpha=\pm\beta+360^\circ k$; $\tan\alpha=\tan\beta\iff\alpha=\beta+180^\circ k$.`,
      String.raw`**$a\sin x\pm b\cos x=0$**: כאשר $\cos x=0$ מתקיים $\sin x=\pm1$, ולכן זה אינו פתרון; מותר לחלק ב-$\cos x$ ומקבלים $\tan x=\mp\frac ba$.`,
      String.raw`**פירוק לגורמים ומשוואה ריבועית**: מעבירים הכול לאגף אחד ומוציאים גורם משותף (לא מחלקים ב-$\sin x$ או ב-$\cos x$ – זה מאבד פתרונות!). במשוואה ריבועית מציבים $t=\sin x$ (או $t=\cos x$) ופוסלים ערכים שבהם $|t|>1$. זהויות הזווית הכפולה הופכות משוואה ב-$2x$ למשוואה ב-$x$.`,
      String.raw`**פתרונות בתחום**: מציבים בכל משפחת פתרונות $k=\dots,-1,0,1,2,\dots$ עד שיוצאים מהתחום, ושמים לב אם קצות התחום כלולים.`,
    ],
    exercises: [
      {
        id: 'trig-equations-1',
        difficulty: 1,
        statement: String.raw`פתרו את המשוואה $\sin x=\frac12$: מצאו את הפתרון הכללי ואת הפתרונות בתחום $0^\circ\le x\le360^\circ$.`,
        hints: [
          String.raw`הזווית החדה שהסינוס שלה $\frac12$ היא $30^\circ$. יש זווית נוספת בין $0^\circ$ ל-$180^\circ$ עם אותו סינוס.`,
          String.raw`$\sin(180^\circ-30^\circ)=\sin30^\circ$, ולכן הפתרון השני הוא $150^\circ$; הוסיפו $360^\circ k$.`,
        ],
        solutionSteps: [
          String.raw`הזווית החדה שהסינוס שלה $\frac12$ היא $30^\circ$, ולפי $\sin(180^\circ-\alpha)=\sin\alpha$ גם $\sin150^\circ=\frac12$.`,
          String.raw`המחזור של $\sin$ הוא $360^\circ$, ולכן הפתרון הכללי: $x=30^\circ+360^\circ k$ או $x=150^\circ+360^\circ k$ ($k$ שלם).`,
          String.raw`בתחום $0^\circ\le x\le360^\circ$: עבור $k=0$ מתקבלים $30^\circ$ ו-$150^\circ$; עבור $k=1$ ($390^\circ$, $510^\circ$) ועבור $k=-1$ (ערכים שליליים) יוצאים מהתחום.`,
        ],
        finalAnswer: String.raw`$x=30^\circ+360^\circ k$ או $x=150^\circ+360^\circ k$; בתחום: $x=30^\circ,\ 150^\circ$.`,
        answers: [
          { label: String.raw`$x_1$ (במעלות)`, value: 30 },
          { label: String.raw`$x_2$ (במעלות)`, value: 150 },
        ],
      },
      {
        id: 'trig-equations-2',
        difficulty: 1,
        statement: String.raw`פתרו את המשוואה $\cos x=-\frac{\sqrt2}{2}$: מצאו את הפתרון הכללי ואת הפתרונות בתחום $0^\circ\le x\le360^\circ$.`,
        hints: [
          String.raw`$\cos45^\circ=\frac{\sqrt2}{2}$, ולפי $\cos(180^\circ-\alpha)=-\cos\alpha$ מתקבל $\cos135^\circ=-\frac{\sqrt2}{2}$.`,
          String.raw`הפתרון הכללי של $\cos x=c$ הוא $x=\pm x_0+360^\circ k$.`,
        ],
        solutionSteps: [
          String.raw`$\cos135^\circ=\cos(180^\circ-45^\circ)=-\cos45^\circ=-\frac{\sqrt2}{2}$, ולכן $x_0=135^\circ$.`,
          String.raw`$\cos$ זוגית ומחזורית עם מחזור $360^\circ$, ולכן הפתרון הכללי: $x=\pm135^\circ+360^\circ k$.`,
          String.raw`בתחום: $x=135^\circ$ (מ-$+135^\circ$ עם $k=0$) ו-$x=-135^\circ+360^\circ=225^\circ$ (עם $k=1$).`,
        ],
        finalAnswer: String.raw`$x=\pm135^\circ+360^\circ k$; בתחום: $x=135^\circ,\ 225^\circ$.`,
        answers: [
          { label: String.raw`$x_1$ (במעלות)`, value: 135 },
          { label: String.raw`$x_2$ (במעלות)`, value: 225 },
        ],
      },
      {
        id: 'trig-equations-3',
        difficulty: 2,
        statement: String.raw`פתרו את המשוואה $\sin(2x-30^\circ)=\frac{\sqrt3}{2}$ בתחום $0^\circ\le x\le360^\circ$.`,
        hints: [
          String.raw`פתרו תחילה עבור הזווית $2x-30^\circ$: היא שווה ל-$60^\circ+360^\circ k$ או ל-$120^\circ+360^\circ k$.`,
          String.raw`בודדו את $x$ – וחלקו ב-2 גם את $360^\circ k$.`,
          String.raw`המחזור של כל משפחת פתרונות הוא $180^\circ$; בדקו את $k=0$ ו-$k=1$.`,
        ],
        solutionSteps: [
          String.raw`$\sin60^\circ=\sin120^\circ=\frac{\sqrt3}{2}$, ולכן $2x-30^\circ=60^\circ+360^\circ k$ או $2x-30^\circ=120^\circ+360^\circ k$.`,
          String.raw`משפחה ראשונה: $2x=90^\circ+360^\circ k$, כלומר $x=45^\circ+180^\circ k$.`,
          String.raw`משפחה שנייה: $2x=150^\circ+360^\circ k$, כלומר $x=75^\circ+180^\circ k$.`,
          String.raw`בתחום $0^\circ\le x\le360^\circ$: עבור $k=0$ מתקבלים $45^\circ$ ו-$75^\circ$, ועבור $k=1$ מתקבלים $225^\circ$ ו-$255^\circ$ ($k=2$ כבר נותן ערכים גדולים מ-$360^\circ$).`,
        ],
        finalAnswer: String.raw`$x=45^\circ,\ 75^\circ,\ 225^\circ,\ 255^\circ$`,
        answers: [
          { label: String.raw`$x_1$`, value: 45 },
          { label: String.raw`$x_2$`, value: 75 },
          { label: String.raw`$x_3$`, value: 225 },
          { label: String.raw`$x_4$`, value: 255 },
        ],
      },
      {
        id: 'trig-equations-4',
        difficulty: 2,
        statement: String.raw`פתרו את המשוואה $\tan(3x+15^\circ)=1$ בתחום $0^\circ\le x<180^\circ$.`,
        hints: [
          String.raw`המחזור של $\tan$ הוא $180^\circ$: $3x+15^\circ=45^\circ+180^\circ k$.`,
          String.raw`חלקו ב-3 גם את המחזור: המרחק בין פתרונות סמוכים הוא $60^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$\tan45^\circ=1$ והמחזור של $\tan$ הוא $180^\circ$, ולכן $3x+15^\circ=45^\circ+180^\circ k$.`,
          String.raw`$3x=30^\circ+180^\circ k$, ולכן $x=10^\circ+60^\circ k$.`,
          String.raw`בתחום $0^\circ\le x<180^\circ$: $k=0,1,2$ נותנים $x=10^\circ,\ 70^\circ,\ 130^\circ$ ($k=3$ נותן $190^\circ$, מחוץ לתחום).`,
        ],
        finalAnswer: String.raw`$x=10^\circ,\ 70^\circ,\ 130^\circ$`,
        answers: [
          { label: String.raw`$x_1$`, value: 10 },
          { label: String.raw`$x_2$`, value: 70 },
          { label: String.raw`$x_3$`, value: 130 },
        ],
      },
      {
        id: 'trig-equations-5',
        difficulty: 2,
        statement: String.raw`פתרו את המשוואה $\sin x+\sqrt3\cos x=0$ בתחום $0^\circ\le x\le360^\circ$.`,
        hints: [
          String.raw`בדקו שאם $\cos x=0$ אז המשוואה לא מתקיימת – ולכן מותר לחלק ב-$\cos x$.`,
          String.raw`אחרי החלוקה מתקבל $\tan x=-\sqrt3$.`,
        ],
        solutionSteps: [
          String.raw`אם $\cos x=0$ אז $\sin x=\pm1$ והאגף השמאלי שווה ל-$\pm1\ne0$; לכן בכל פתרון $\cos x\ne0$, ומותר לחלק ב-$\cos x$.`,
          String.raw`$\frac{\sin x}{\cos x}+\sqrt3=0$, כלומר $\tan x=-\sqrt3$.`,
          String.raw`$\tan60^\circ=\sqrt3$, ולפי $\tan(180^\circ-\alpha)=-\tan\alpha$: $\tan120^\circ=-\sqrt3$. הפתרון הכללי: $x=120^\circ+180^\circ k$.`,
          String.raw`בתחום: $x=120^\circ$ ו-$x=300^\circ$.`,
        ],
        finalAnswer: String.raw`$x=120^\circ+180^\circ k$; בתחום: $x=120^\circ,\ 300^\circ$.`,
        answers: [
          { label: String.raw`$x_1$`, value: 120 },
          { label: String.raw`$x_2$`, value: 300 },
        ],
      },
      {
        id: 'trig-equations-6',
        difficulty: 2,
        statement: String.raw`פתרו את המשוואה $\cos3x=\cos(x+40^\circ)$ בתחום $0^\circ\le x<180^\circ$.`,
        hints: [
          String.raw`$\cos\alpha=\cos\beta\iff\alpha=\beta+360^\circ k$ או $\alpha=-\beta+360^\circ k$.`,
          String.raw`המשפחה הראשונה: $3x=x+40^\circ+360^\circ k$; השנייה: $3x=-(x+40^\circ)+360^\circ k$.`,
          String.raw`בשנייה $4x=-40^\circ+360^\circ k$, כלומר $x=-10^\circ+90^\circ k$.`,
        ],
        solutionSteps: [
          String.raw`לפי $\cos\alpha=\cos\beta\iff\alpha=\pm\beta+360^\circ k$: $3x=x+40^\circ+360^\circ k$ או $3x=-x-40^\circ+360^\circ k$.`,
          String.raw`משפחה ראשונה: $2x=40^\circ+360^\circ k$, כלומר $x=20^\circ+180^\circ k$; בתחום – רק $x=20^\circ$.`,
          String.raw`משפחה שנייה: $4x=-40^\circ+360^\circ k$, כלומר $x=-10^\circ+90^\circ k$; בתחום – $k=1$: $x=80^\circ$, $k=2$: $x=170^\circ$.`,
          String.raw`בדיקה: עבור $x=80^\circ$: $\cos240^\circ=\cos120^\circ=-\frac12$ ✓.`,
        ],
        finalAnswer: String.raw`$x=20^\circ,\ 80^\circ,\ 170^\circ$`,
        answers: [
          { label: String.raw`$x_1$`, value: 20 },
          { label: String.raw`$x_2$`, value: 80 },
          { label: String.raw`$x_3$`, value: 170 },
        ],
      },
      {
        id: 'trig-equations-7',
        difficulty: 3,
        statement: String.raw`פתרו את המשוואה $\sin2x=\sqrt3\sin x$ בתחום $0^\circ\le x\le360^\circ$.`,
        hints: [
          String.raw`פתחו $\sin2x=2\sin x\cos x$ והעבירו הכול לאגף אחד.`,
          String.raw`אל תחלקו ב-$\sin x$! הוציאו אותו כגורם משותף: $\sin x\,(2\cos x-\sqrt3)=0$.`,
          String.raw`פתרו $\sin x=0$ ו-$\cos x=\frac{\sqrt3}{2}$ בנפרד; שימו לב שקצות התחום כלולים.`,
        ],
        solutionSteps: [
          String.raw`לפי זהות הזווית הכפולה: $2\sin x\cos x=\sqrt3\sin x$, ולכן $2\sin x\cos x-\sqrt3\sin x=0$.`,
          String.raw`מוציאים גורם משותף: $\sin x\,(2\cos x-\sqrt3)=0$. מכפלה שווה לאפס כאשר אחד הגורמים שווה לאפס.`,
          String.raw`$\sin x=0\Rightarrow x=180^\circ k$; בתחום: $x=0^\circ,\ 180^\circ,\ 360^\circ$.`,
          String.raw`$\cos x=\frac{\sqrt3}{2}\Rightarrow x=\pm30^\circ+360^\circ k$; בתחום: $x=30^\circ$ ו-$x=-30^\circ+360^\circ=330^\circ$.`,
          String.raw`חלוקה ב-$\sin x$ הייתה מאבדת את שלושת הפתרונות $0^\circ$, $180^\circ$ ו-$360^\circ$.`,
        ],
        finalAnswer: String.raw`$x=0^\circ,\ 30^\circ,\ 180^\circ,\ 330^\circ,\ 360^\circ$`,
        answers: [
          { label: String.raw`$x_1$`, value: 0 },
          { label: String.raw`$x_2$`, value: 30 },
          { label: String.raw`$x_3$`, value: 180 },
          { label: String.raw`$x_4$`, value: 330 },
          { label: String.raw`$x_5$`, value: 360 },
        ],
      },
      {
        id: 'trig-equations-8',
        difficulty: 3,
        statement: String.raw`(ברדיאנים, כמו בשאלה 7.) פתרו את המשוואה $\cos2x+3\sin x=2$ בתחום $0\le x\le2\pi$.`,
        hints: [
          String.raw`בחרו את הצורה של $\cos2x$ שמכילה רק $\sin x$: $\cos2x=1-2\sin^2x$.`,
          String.raw`מתקבלת משוואה ריבועית: $2\sin^2x-3\sin x+1=0$. הציבו $t=\sin x$.`,
          String.raw`$t=1$ או $t=\frac12$; פתרו כל אחת ברדיאנים ($\sin x=\frac12$ בזוויות $\frac\pi6$ ו-$\frac{5\pi}6$).`,
        ],
        solutionSteps: [
          String.raw`לפי $\cos2x=1-2\sin^2x$: $1-2\sin^2x+3\sin x=2$, ולכן $2\sin^2x-3\sin x+1=0$.`,
          String.raw`נציב $t=\sin x$: $2t^2-3t+1=0\iff(2t-1)(t-1)=0$, ולכן $t=\frac12$ או $t=1$ (שני הערכים בתחום $[-1,1]$).`,
          String.raw`$\sin x=1\Rightarrow x=\frac\pi2+2\pi k$; בתחום: $x=\frac\pi2$.`,
          String.raw`$\sin x=\frac12\Rightarrow x=\frac\pi6+2\pi k$ או $x=\pi-\frac\pi6+2\pi k=\frac{5\pi}{6}+2\pi k$; בתחום: $x=\frac\pi6$, $x=\frac{5\pi}6$.`,
          String.raw`בדיקה ב-$x=\frac\pi6$: $\cos\frac\pi3+3\sin\frac\pi6=\frac12+\frac32=2$ ✓.`,
        ],
        finalAnswer: String.raw`$x=\frac\pi6\approx0.52$, $x=\frac\pi2\approx1.57$, $x=\frac{5\pi}6\approx2.62$`,
        answers: [
          { label: String.raw`$x_1$ (רדיאנים)`, value: 0.5235987755982988 },
          { label: String.raw`$x_2$ (רדיאנים)`, value: 1.5707963267948966 },
          { label: String.raw`$x_3$ (רדיאנים)`, value: 2.6179938779914944 },
        ],
      },
    ],
  },
  'trig-pythagoras': {
    intro: String.raw`**משפט פיתגורס** קושר בין שלוש הצלעות של משולש ישר זווית: סכום ריבועי הניצבים שווה לריבוע היתר. זהו הכלי הראשון לחישוב אורכים במצולעים – מורידים גובה או מעבירים אלכסון כדי ליצור משולשים ישרי זווית, ומחשבים בהם. בשאלה 5 (ולפעמים גם בשאלה 4) פיתגורס משמש בכל שלב: גובה בטרפז, צלע במעוין, גובה במשולש שווה-שוקיים, ובדיקה אם משולש הוא ישר זווית (המשפט ההפוך).`,
    keyFacts: [
      String.raw`**משפט פיתגורס**: במשולש ישר זווית שניצביו $a$, $b$ ויתרו $c$ מתקיים $a^2+b^2=c^2$. היתר הוא הצלע שמול הזווית הישרה, והוא הצלע הארוכה ביותר.`,
      String.raw`**המשפט ההפוך**: אם במשולש $a^2+b^2=c^2$, אז הזווית שמול הצלע $c$ ישרה.`,
      String.raw`**שיטת העבודה במצולעים**: מורידים גבהים או מעבירים אלכסונים כך שייווצרו משולשים ישרי זווית. במשולש שווה-שוקיים הגובה לבסיס הוא גם תיכון; בטרפז שווה-שוקיים שני הגבהים חותכים מהבסיס הגדול שני קטעים שווים $\frac{a-b}{2}$; במעוין האלכסונים מאונכים וחוצים זה את זה.`,
      String.raw`**גובה ליתר**: משטח המשולש בשתי דרכים, $\frac12ab=\frac12c\,h$, מתקבל $h=\frac{ab}{c}$.`,
      String.raw`**כשהגובה מחלק צלע לשני חלקים לא ידועים**: מסמנים חלק אחד $x$, כותבים פיתגורס בשני המשולשים ישרי הזווית ומשווים את ביטויי ריבוע הגובה.`,
    ],
    exercises: [
      {
        id: 'trig-pythagoras-1',
        difficulty: 1,
        statement: String.raw`במשולש ישר הזווית $ABC$ ($\angle C=90^\circ$) היתר הוא $AB=17$ והניצב הוא $AC=8$ (ראו שרטוט). חשבו את אורך הניצב $BC$ ואת היקף המשולש.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,50.7 290.0,189.3 30.0,189.3" />
  <polyline points="30.0,180.3 39.0,180.3 39.0,189.3" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="18.0" y="125.0" font-size="14" text-anchor="middle">8</text>
    <text x="165.6" y="114.4" font-size="14" text-anchor="middle">17</text>
    <text x="19.7" y="45.7" text-anchor="middle">A</text>
    <text x="304.5" y="199.2" text-anchor="middle">B</text>
    <text x="16.8" y="202.4" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`היתר $AB$ נמצא מול הזווית הישרה: $AC^2+BC^2=AB^2$.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט פיתגורס במשולש $ABC$ ($\angle C=90^\circ$): $AC^2+BC^2=AB^2$, כלומר $64+BC^2=289$.`,
          String.raw`$BC^2=225$, ולכן $BC=15$.`,
          String.raw`ההיקף: $AB+AC+BC=17+8+15=40$.`,
        ],
        finalAnswer: String.raw`$BC=15$, היקף 40`,
        answers: [
          { label: String.raw`$BC$`, value: 15 },
          { label: String.raw`היקף המשולש`, value: 40 },
        ],
      },
      {
        id: 'trig-pythagoras-2',
        difficulty: 1,
        statement: String.raw`במלבן $ABCD$ האלכסון הוא $AC=10$ והצלע היא $AB=6$ (ראו שרטוט). חשבו את אורך הצלע $BC$ ואת שטח המלבן.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="92.5,210.0 227.5,210.0 227.5,30.0 92.5,30.0" />
  <line x1="92.5" y1="210.0" x2="227.5" y2="30.0" />
  <polyline points="218.5,210.0 218.5,201.0 227.5,201.0" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="160.0" y="227.0" font-size="14" text-anchor="middle">6</text>
    <text x="152.0" y="119.0" font-size="14" text-anchor="middle">10</text>
    <text x="83.5" y="228.0" text-anchor="middle">A</text>
    <text x="236.5" y="228.0" text-anchor="middle">B</text>
    <text x="236.5" y="24.0" text-anchor="middle">C</text>
    <text x="83.5" y="24.0" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`זוויות המלבן ישרות, ולכן המשולש $ABC$ ישר זווית ב-$B$ והאלכסון $AC$ הוא היתר שלו.`,
        ],
        solutionSteps: [
          String.raw`במלבן כל הזוויות ישרות, ולכן במשולש $ABC$ הזווית $\angle B=90^\circ$ והאלכסון $AC$ הוא היתר.`,
          String.raw`לפי משפט פיתגורס: $AB^2+BC^2=AC^2$, כלומר $36+BC^2=100$, ולכן $BC=8$.`,
          String.raw`שטח המלבן: $AB\cdot BC=6\cdot8=48$.`,
        ],
        finalAnswer: String.raw`$BC=8$, שטח 48`,
        answers: [
          { label: String.raw`$BC$`, value: 8 },
          { label: String.raw`שטח המלבן`, value: 48 },
        ],
      },
      {
        id: 'trig-pythagoras-3',
        difficulty: 2,
        statement: String.raw`במשולש שווה-השוקיים $ABC$ השוקיים הן $AB=AC=13$ והבסיס $BC=10$. $AD$ הוא הגובה לבסיס (ראו שרטוט). חשבו את אורך הגובה $AD$ ואת שטח המשולש.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160.0,30.0 85.0,210.0 235.0,210.0" />
  <line x1="160.0" y1="30.0" x2="160.0" y2="210.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="160.0,201.0 169.0,201.0 169.0,210.0" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="111.4" y="120.4" font-size="14" text-anchor="middle">13</text>
    <text x="208.6" y="120.4" font-size="14" text-anchor="middle">13</text>
    <text x="160.0" y="21.0" text-anchor="middle">A</text>
    <text x="73.3" y="225.4" text-anchor="middle">B</text>
    <text x="246.7" y="225.4" text-anchor="middle">C</text>
    <text x="160.0" y="230.0" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`במשולש שווה-שוקיים הגובה לבסיס הוא גם תיכון, ולכן $BD=5$.`,
          String.raw`הפעילו את משפט פיתגורס במשולש ישר הזווית $ABD$.`,
        ],
        solutionSteps: [
          String.raw`במשולש שווה-שוקיים הגובה לבסיס הוא גם תיכון, ולכן $BD=DC=\frac{10}{2}=5$.`,
          String.raw`במשולש ישר הזווית $ABD$ ($\angle ADB=90^\circ$), לפי משפט פיתגורס: $AD^2=AB^2-BD^2=169-25=144$, ולכן $AD=12$.`,
          String.raw`שטח המשולש: $S=\frac12\cdot BC\cdot AD=\frac12\cdot10\cdot12=60$.`,
        ],
        finalAnswer: String.raw`$AD=12$, שטח 60`,
        answers: [
          { label: String.raw`$AD$`, value: 12 },
          { label: String.raw`שטח המשולש`, value: 60 },
        ],
      },
      {
        id: 'trig-pythagoras-4',
        difficulty: 2,
        statement: String.raw`אורכי האלכסונים של המעוין $ABCD$ הם $AC=16$ ו-$BD=12$ (ראו שרטוט). חשבו את אורך צלע המעוין ואת גובה המעוין.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="40.0,120.0 160.0,210.0 280.0,120.0 160.0,30.0" />
  <line x1="40.0" y1="120.0" x2="280.0" y2="120.0" stroke-width="1.5" />
  <line x1="160.0" y1="210.0" x2="160.0" y2="30.0" stroke-width="1.5" />
  <polyline points="169.0,120.0 169.0,111.0 160.0,111.0" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="25.0" y="126.0" text-anchor="middle">A</text>
    <text x="160.0" y="231.0" text-anchor="middle">B</text>
    <text x="295.0" y="126.0" text-anchor="middle">C</text>
    <text x="160.0" y="21.0" text-anchor="middle">D</text>
    <text x="150.0" y="116.0" text-anchor="middle">O</text>
  </g>
</svg>`,
        hints: [
          String.raw`אלכסוני המעוין מאונכים זה לזה וחוצים זה את זה בנקודה $O$, ולכן $AO=8$ ו-$BO=6$.`,
          String.raw`את הגובה מוצאים משטח המעוין בשתי דרכים: $\frac{AC\cdot BD}{2}$ ו-צלע $\times$ גובה.`,
        ],
        solutionSteps: [
          String.raw`במעוין האלכסונים מאונכים וחוצים זה את זה. נסמן את נקודת החיתוך $O$: $AO=8$, $BO=6$ ו-$\angle AOB=90^\circ$.`,
          String.raw`לפי משפט פיתגורס במשולש $AOB$: $AB^2=8^2+6^2=100$, ולכן צלע המעוין $AB=10$.`,
          String.raw`שטח המעוין שווה למחצית מכפלת האלכסונים: $S=\frac{16\cdot12}{2}=96$.`,
          String.raw`המעוין הוא מקבילית, ולכן $S=AB\cdot h$: $96=10h$, ולכן $h=9.6$.`,
        ],
        finalAnswer: String.raw`צלע 10, גובה 9.6`,
        answers: [
          { label: String.raw`צלע המעוין`, value: 10 },
          { label: String.raw`גובה המעוין`, value: 9.6 },
        ],
      },
      {
        id: 'trig-pythagoras-5',
        difficulty: 2,
        statement: String.raw`אורכי הצלעות של משולש הם 20, 21 ו-29.

א. הוכיחו שהמשולש ישר זווית, וקבעו איזו צלע היא היתר.

ב. חשבו את אורך הגובה ליתר.`,
        hints: [
          String.raw`בדקו אם סכום ריבועי שתי הצלעות הקצרות שווה לריבוע הצלע הארוכה (המשפט ההפוך לפיתגורס).`,
          String.raw`חשבו את השטח בשתי דרכים: חצי מכפלת הניצבים, וחצי היתר כפול הגובה אליו.`,
        ],
        solutionSteps: [
          String.raw`א. $20^2+21^2=400+441=841=29^2$. לפי המשפט ההפוך למשפט פיתגורס, הזווית שמול הצלע 29 ישרה – המשולש ישר זווית והיתר שלו הוא 29.`,
          String.raw`ב. הניצבים 20 ו-21, ולכן שטח המשולש $S=\frac12\cdot20\cdot21=210$.`,
          String.raw`השטח שווה גם ל-$\frac12\cdot29\cdot h$, ולכן $h=\frac{2\cdot210}{29}=\frac{420}{29}\approx14.48$.`,
        ],
        finalAnswer: String.raw`המשולש ישר זווית (היתר 29); הגובה ליתר $\frac{420}{29}\approx14.48$.`,
        answers: [{ label: String.raw`הגובה ליתר`, value: 14.482758620689655 }],
      },
      {
        id: 'trig-pythagoras-6',
        difficulty: 2,
        statement: String.raw`בטרפז שווה-השוקיים $ABCD$ ($AB\parallel DC$) הבסיסים הם $AB=20$ ו-$DC=8$, והשוקיים $AD=BC=10$ (ראו שרטוט). חשבו את גובה הטרפז ואת אורך האלכסון $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,172.0 290.0,172.0 212.0,68.0 108.0,68.0" />
  <line x1="108.0" y1="68.0" x2="108.0" y2="172.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="212.0" y1="68.0" x2="212.0" y2="172.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="30.0" y1="172.0" x2="212.0" y2="68.0" stroke-width="1.5" />
  <polyline points="108.0,163.0 99.0,163.0 99.0,172.0" stroke-width="1" />
  <polyline points="212.0,163.0 221.0,163.0 221.0,172.0" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="59.4" y="117.8" font-size="14" text-anchor="middle">10</text>
    <text x="260.6" y="117.8" font-size="14" text-anchor="middle">10</text>
    <text x="160.0" y="61.0" font-size="14" text-anchor="middle">8</text>
    <text x="16.1" y="183.6" text-anchor="middle">A</text>
    <text x="303.9" y="183.6" text-anchor="middle">B</text>
    <text x="222.6" y="63.4" text-anchor="middle">C</text>
    <text x="97.4" y="63.4" text-anchor="middle">D</text>
    <text x="108.0" y="194.0" text-anchor="middle">E</text>
    <text x="212.0" y="194.0" text-anchor="middle">F</text>
  </g>
</svg>`,
        hints: [
          String.raw`הורידו גבהים $DE$ ו-$CF$ לבסיס $AB$. בטרפז שווה-שוקיים $AE=FB=\frac{20-8}{2}=6$.`,
          String.raw`הגובה – מפיתגורס במשולש $ADE$. האלכסון $AC$ – מפיתגורס במשולש ישר הזווית $AFC$, שבו $AF=AB-FB$.`,
        ],
        solutionSteps: [
          String.raw`נוריד את הגבהים $DE$ ו-$CF$ לבסיס $AB$. $DCFE$ מלבן, ולכן $EF=DC=8$; המשולשים $ADE$ ו-$BCF$ חופפים (יתר וניצב), ולכן $AE=FB=\frac{20-8}{2}=6$.`,
          String.raw`לפי משפט פיתגורס במשולש $ADE$: $DE^2=AD^2-AE^2=100-36=64$, ולכן גובה הטרפז $h=8$.`,
          String.raw`$AF=AB-FB=20-6=14$ ו-$CF=8$, ולכן לפי משפט פיתגורס במשולש $AFC$: $AC^2=14^2+8^2=260$.`,
          String.raw`$AC=\sqrt{260}=2\sqrt{65}\approx16.12$.`,
        ],
        finalAnswer: String.raw`גובה 8; $AC=2\sqrt{65}\approx16.12$`,
        answers: [
          { label: String.raw`גובה הטרפז`, value: 8 },
          { label: String.raw`$AC$`, value: 16.1245154965971 },
        ],
      },
      {
        id: 'trig-pythagoras-7',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ הצלעות הן $AB=10$, $AC=17$, $BC=21$. $AD$ הוא הגובה לצלע $BC$ (ראו שרטוט). חשבו את $BD$, את הגובה $AD$ ואת שטח המשולש.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="104.3,70.5 30.0,169.5 290.0,169.5" />
  <line x1="104.3" y1="70.5" x2="104.3" y2="169.5" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="104.3,160.5 113.3,160.5 113.3,169.5" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="57.5" y="117.8" font-size="14" text-anchor="middle">10</text>
    <text x="202.8" y="114.4" font-size="14" text-anchor="middle">17</text>
    <text x="160.0" y="190.5" font-size="14" text-anchor="middle">21</text>
    <text x="96.9" y="63.4" text-anchor="middle">A</text>
    <text x="15.6" y="179.8" text-anchor="middle">B</text>
    <text x="304.6" y="178.8" text-anchor="middle">C</text>
    <text x="104.3" y="191.5" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`סמנו $BD=x$, ואז $DC=21-x$.`,
          String.raw`כתבו את $AD^2$ פעמיים: מהמשולש $ABD$ ומהמשולש $ACD$, והשוו.`,
          String.raw`$100-x^2=289-(21-x)^2$ – הריבועים $x^2$ מתבטלים ומתקבלת משוואה ממעלה ראשונה.`,
        ],
        solutionSteps: [
          String.raw`נסמן $BD=x$, ולכן $DC=21-x$ (הזוויות $B$ ו-$C$ חדות, כי $AC^2<AB^2+BC^2$ ו-$AB^2<AC^2+BC^2$, ולכן $D$ על הצלע $BC$).`,
          String.raw`לפי משפט פיתגורס במשולש $ABD$: $AD^2=100-x^2$. לפי משפט פיתגורס במשולש $ACD$: $AD^2=289-(21-x)^2$.`,
          String.raw`משווים: $100-x^2=289-441+42x-x^2$, ולכן $42x=252$ ו-$x=6$.`,
          String.raw`$BD=6$, ו-$AD^2=100-36=64$, ולכן $AD=8$.`,
          String.raw`שטח המשולש: $S=\frac12\cdot BC\cdot AD=\frac12\cdot21\cdot8=84$.`,
        ],
        finalAnswer: String.raw`$BD=6$, $AD=8$, שטח 84`,
        answers: [
          { label: String.raw`$BD$`, value: 6 },
          { label: String.raw`$AD$`, value: 8 },
          { label: String.raw`שטח המשולש`, value: 84 },
        ],
      },
      {
        id: 'trig-pythagoras-8',
        difficulty: 3,
        statement: String.raw`במשולש ישר הזווית $ABC$ ($\angle ACB=90^\circ$), $CD$ הוא הגובה ליתר. נתון $AD=4$ ו-$DB=9$ (ראו שרטוט). חשבו את הגובה $CD$ ואת הניצבים $AC$ ו-$BC$, בעזרת משפט פיתגורס בלבד.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,180.0 290.0,180.0 110.0,60.0" />
  <line x1="110.0" y1="60.0" x2="110.0" y2="180.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="105.0,67.5 112.5,72.5 117.5,65.0" stroke-width="1" />
  <polyline points="110.0,171.0 119.0,171.0 119.0,180.0" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="70.0" y="201.0" font-size="14" text-anchor="middle">4</text>
    <text x="200.0" y="201.0" font-size="14" text-anchor="middle">9</text>
    <text x="15.9" y="191.0" text-anchor="middle">A</text>
    <text x="304.5" y="189.9" text-anchor="middle">B</text>
    <text x="104.2" y="52.2" text-anchor="middle">C</text>
    <text x="110.0" y="202.0" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`סמנו $CD=h$, וכתבו את $AC^2$ ואת $BC^2$ באמצעות $h$ (משני המשולשים הקטנים).`,
          String.raw`במשולש הגדול: $AC^2+BC^2=AB^2=13^2$.`,
        ],
        solutionSteps: [
          String.raw`נסמן $CD=h$. לפי משפט פיתגורס במשולש $ADC$ ($\angle ADC=90^\circ$): $AC^2=16+h^2$; במשולש $BDC$: $BC^2=81+h^2$.`,
          String.raw`$AB=AD+DB=13$, ולפי משפט פיתגורס במשולש $ABC$: $AC^2+BC^2=169$.`,
          String.raw`מציבים: $16+h^2+81+h^2=169$, ולכן $2h^2=72$, $h^2=36$ ו-$h=6$.`,
          String.raw`$AC=\sqrt{16+36}=\sqrt{52}=2\sqrt{13}\approx7.21$ ו-$BC=\sqrt{81+36}=\sqrt{117}=3\sqrt{13}\approx10.82$.`,
        ],
        finalAnswer: String.raw`$CD=6$, $AC=2\sqrt{13}\approx7.21$, $BC=3\sqrt{13}\approx10.82$`,
        answers: [
          { label: String.raw`$CD$`, value: 6 },
          { label: String.raw`$AC$`, value: 7.211102550927978 },
          { label: String.raw`$BC$`, value: 10.816653826391969 },
        ],
      },
    ],
  },
  'trig-right-triangle': {
    intro: String.raw`במשולש ישר זווית היחסים בין הצלעות תלויים רק בזוויות: **סינוס, קוסינוס וטנגנס** של זווית חדה. בעזרתם מחשבים צלע מתוך צלע וזווית, וזווית מתוך שתי צלעות. בשאלה 5 משתמשים בכך בכל שלב – גבהים, הטלות, משולשים שווי-שוקיים ומלבנים – ולעתים קרובות הנתונים כוללים פרמטר (״הביעו באמצעות $\alpha$״).`,
    keyFacts: [
      String.raw`במשולש ישר זווית, עבור זווית חדה $\alpha$: $\sin\alpha$ = הניצב שמול $\alpha$ חלקי היתר; $\cos\alpha$ = הניצב שליד $\alpha$ חלקי היתר; $\tan\alpha$ = הניצב שמול $\alpha$ חלקי הניצב שלידה.`,
      String.raw`**מציאת צלע**: ניצב מול $=$ יתר $\cdot\sin\alpha$, ניצב ליד $=$ יתר $\cdot\cos\alpha$, ניצב מול $=$ ניצב ליד $\cdot\tan\alpha$.`,
      String.raw`**מציאת זווית**: מחשבים את היחס המתאים ומשתמשים בפונקציה ההפוכה במחשבון ($\sin^{-1}$, $\cos^{-1}$, $\tan^{-1}$) – במצב מעלות (DEG).`,
      String.raw`שתי הזוויות החדות משלימות ל-$90^\circ$, ולכן $\sin(90^\circ-\alpha)=\cos\alpha$: מה שהוא ״ניצב מול״ לזווית אחת הוא ״ניצב ליד״ לשנייה.`,
      String.raw`**משולש שווה-שוקיים** עם שוק $a$ וזווית ראש $\theta$: הגובה לבסיס מחלק אותו לשני משולשים ישרי זווית חופפים, ולכן הבסיס $2a\sin\frac\theta2$ והגובה $a\cos\frac\theta2$.`,
      String.raw`**זווית הגבהה**: הזווית שבין קו הראייה לבין הקו האופקי. כששני משולשים ישרי זווית חולקים ניצב (למשל גובה של מגדל), מביעים את הניצב המשותף משני המשולשים ומשווים.`,
    ],
    exercises: [
      {
        id: 'trig-right-triangle-1',
        difficulty: 1,
        statement: String.raw`במשולש ישר הזווית $ABC$ ($\angle C=90^\circ$) היתר הוא $AB=10$ ו-$\angle A=35^\circ$ (ראו שרטוט). חשבו את אורכי הניצבים $BC$ ו-$AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="31.5,210.0 288.5,30.0 288.5,210.0" />
  <polyline points="279.5,210.0 279.5,201.0 288.5,201.0" stroke-width="1" />
  <path d="M 61.5,210.0 A 30 30 0 0 0 56.0,192.8" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="78.2" y="200.3" font-size="14" text-anchor="middle">35°</text>
    <text x="153.1" y="115.2" font-size="14" text-anchor="middle">10</text>
    <text x="17.3" y="221.0" text-anchor="middle">A</text>
    <text x="297.3" y="23.8" text-anchor="middle">B</text>
    <text x="300.8" y="224.6" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`$BC$ הוא הניצב שמול הזווית $A$, ו-$AC$ הוא הניצב שלידה.`,
        ],
        solutionSteps: [
          String.raw`במשולש ישר הזווית $ABC$: $\sin A=\frac{BC}{AB}$, ולכן $BC=10\sin35^\circ\approx5.74$.`,
          String.raw`$\cos A=\frac{AC}{AB}$, ולכן $AC=10\cos35^\circ\approx8.19$.`,
          String.raw`בדיקה לפי משפט פיתגורס: $5.736^2+8.192^2\approx32.9+67.1=100=AB^2$.`,
        ],
        finalAnswer: String.raw`$BC\approx5.74$, $AC\approx8.19$`,
        answers: [
          { label: String.raw`$BC$`, value: 5.7357643635104605 },
          { label: String.raw`$AC$`, value: 8.191520442889917 },
        ],
      },
      {
        id: 'trig-right-triangle-2',
        difficulty: 1,
        statement: String.raw`במשולש ישר הזווית $ABC$ ($\angle C=90^\circ$) הניצבים הם $AC=7$ ו-$BC=4$ (ראו שרטוט). חשבו את הזוויות החדות של המשולש.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,194.3 290.0,45.7 290.0,194.3" />
  <polyline points="281.0,194.3 281.0,185.3 290.0,185.3" stroke-width="1" />
  <path d="M 60.0,194.3 A 30 30 0 0 0 56.0,179.4" stroke-width="1.2" />
  <path d="M 270.9,56.6 A 22 22 0 0 0 290.0,67.7" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="160.0" y="211.3" font-size="14" text-anchor="middle">7</text>
    <text x="302.0" y="125.0" font-size="14" text-anchor="middle">4</text>
    <text x="15.6" y="204.4" text-anchor="middle">A</text>
    <text x="299.9" y="40.4" text-anchor="middle">B</text>
    <text x="303.0" y="207.7" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`שני הניצבים ידועים, ולכן מתאים להשתמש ב-$\tan$: $\tan A=\frac{BC}{AC}$.`,
        ],
        solutionSteps: [
          String.raw`$BC$ הוא הניצב שמול $A$ ו-$AC$ הוא הניצב שליד $A$, ולכן $\tan A=\frac{BC}{AC}=\frac47$.`,
          String.raw`$\angle A=\tan^{-1}\frac47\approx29.74^\circ$.`,
          String.raw`סכום הזוויות החדות במשולש ישר זווית הוא $90^\circ$, ולכן $\angle B=90^\circ-29.74^\circ\approx60.26^\circ$ (ואכן $\tan B=\frac74$).`,
        ],
        finalAnswer: String.raw`$\angle A\approx29.74^\circ$, $\angle B\approx60.26^\circ$`,
        answers: [
          { label: String.raw`$\angle A$`, value: 29.744881296942225 },
          { label: String.raw`$\angle B$`, value: 60.255118703057775 },
        ],
      },
      {
        id: 'trig-right-triangle-3',
        difficulty: 2,
        statement: String.raw`במשולש שווה-השוקיים $ABC$ השוקיים הן $AB=AC=9$ וזווית הראש $\angle BAC=40^\circ$. $AD$ הוא הגובה לבסיס (ראו שרטוט). חשבו את אורך הבסיס $BC$ ואת אורך הגובה $AD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160.0,30.0 94.5,210.0 225.5,210.0" />
  <line x1="160.0" y1="30.0" x2="160.0" y2="210.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="160.0,201.0 169.0,201.0 169.0,210.0" stroke-width="1" />
  <path d="M 149.7,58.2 A 30 30 0 0 0 170.3,58.2" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="176.0" y="131.0" font-size="14" text-anchor="middle">40°</text>
    <text x="116.0" y="120.9" font-size="14" text-anchor="middle">9</text>
    <text x="204.0" y="120.9" font-size="14" text-anchor="middle">9</text>
    <text x="160.0" y="21.0" text-anchor="middle">A</text>
    <text x="83.4" y="226.1" text-anchor="middle">B</text>
    <text x="236.6" y="226.1" text-anchor="middle">C</text>
    <text x="160.0" y="232.0" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`במשולש שווה-שוקיים הגובה לבסיס הוא גם חוצה זווית הראש וגם תיכון: $\angle BAD=20^\circ$ ו-$BD=DC$.`,
          String.raw`במשולש ישר הזווית $ABD$ היתר הוא $AB=9$.`,
        ],
        solutionSteps: [
          String.raw`במשולש שווה-שוקיים הגובה לבסיס הוא גם חוצה זווית הראש וגם תיכון, ולכן $\angle BAD=20^\circ$ ו-$BD=DC$.`,
          String.raw`במשולש ישר הזווית $ABD$ ($\angle ADB=90^\circ$): $BD=AB\sin20^\circ=9\sin20^\circ\approx3.078$.`,
          String.raw`$BC=2BD=18\sin20^\circ\approx6.16$.`,
          String.raw`$AD=AB\cos20^\circ=9\cos20^\circ\approx8.46$.`,
        ],
        finalAnswer: String.raw`$BC=18\sin20^\circ\approx6.16$, $AD=9\cos20^\circ\approx8.46$`,
        answers: [
          { label: String.raw`$BC$`, value: 6.156362579862037 },
          { label: String.raw`$AD$`, value: 8.457233587073176 },
        ],
      },
      {
        id: 'trig-right-triangle-4',
        difficulty: 2,
        statement: String.raw`במלבן $ABCD$ אורך האלכסון הוא $AC=12$, והוא יוצר עם הצלע $AB$ זווית $\angle CAB=25^\circ$ (ראו שרטוט).

א. חשבו את אורכי הצלעות $AB$ ו-$BC$.

ב. חשבו את הזווית החדה שבין אלכסוני המלבן.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,180.6 290.0,180.6 290.0,59.4 30.0,59.4" />
  <line x1="30.0" y1="180.6" x2="290.0" y2="59.4" />
  <line x1="290.0" y1="180.6" x2="30.0" y2="59.4" stroke-width="1.5" />
  <path d="M 70.0,180.6 A 40 40 0 0 0 66.3,163.7" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="87.6" y="172.9" font-size="14" text-anchor="middle">25°</text>
    <text x="16.4" y="193.0" text-anchor="middle">A</text>
    <text x="303.6" y="193.0" text-anchor="middle">B</text>
    <text x="303.6" y="59.0" text-anchor="middle">C</text>
    <text x="16.4" y="59.0" text-anchor="middle">D</text>
    <text x="160.0" y="114.0" text-anchor="middle">O</text>
  </g>
</svg>`,
        hints: [
          String.raw`המשולש $ABC$ ישר זווית ב-$B$, והאלכסון $AC$ הוא היתר שלו.`,
          String.raw`אלכסוני המלבן שווים וחוצים זה את זה בנקודה $O$, ולכן המשולש $AOB$ שווה-שוקיים.`,
        ],
        solutionSteps: [
          String.raw`א. במשולש ישר הזווית $ABC$ ($\angle B=90^\circ$): $AB=AC\cos25^\circ=12\cos25^\circ\approx10.88$ ו-$BC=AC\sin25^\circ=12\sin25^\circ\approx5.07$.`,
          String.raw`ב. אלכסוני המלבן שווים זה לזה וחוצים זה את זה בנקודה $O$, ולכן $OA=OB$ והמשולש $AOB$ שווה-שוקיים.`,
          String.raw`זוויות הבסיס שוות: $\angle OBA=\angle OAB=25^\circ$, ולכן $\angle AOB=180^\circ-50^\circ=130^\circ$.`,
          String.raw`הזווית הצמודה לה, $\angle BOC=50^\circ$, היא הזווית החדה שבין האלכסונים.`,
        ],
        finalAnswer: String.raw`$AB\approx10.88$, $BC\approx5.07$; הזווית החדה בין האלכסונים $50^\circ$.`,
        answers: [
          { label: String.raw`$AB$`, value: 10.875693444439799 },
          { label: String.raw`$BC$`, value: 5.071419140888393 },
          { label: String.raw`הזווית בין האלכסונים`, value: 50 },
        ],
      },
      {
        id: 'trig-right-triangle-5',
        difficulty: 2,
        statement: String.raw`במשולש ישר הזווית $ABC$ ($\angle ACB=90^\circ$) נתון $\angle A=28^\circ$, והגובה ליתר הוא $CD=6$ (ראו שרטוט). חשבו את אורכי הניצבים $AC$ ו-$BC$ ואת אורך היתר $AB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,173.9 290.0,173.9 232.7,66.1" />
  <line x1="232.7" y1="66.1" x2="232.7" y2="173.9" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="224.7,70.3 229.0,78.3 236.9,74.1" stroke-width="1" />
  <polyline points="232.7,164.9 241.7,164.9 241.7,173.9" stroke-width="1" />
  <path d="M 70.0,173.9 A 40 40 0 0 0 65.3,155.1" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="87.2" y="164.6" font-size="14" text-anchor="middle">28°</text>
    <text x="222.7" y="125.0" font-size="14" text-anchor="middle">6</text>
    <text x="15.4" y="183.3" text-anchor="middle">A</text>
    <text x="304.2" y="184.7" text-anchor="middle">B</text>
    <text x="241.1" y="59.7" text-anchor="middle">C</text>
    <text x="232.7" y="195.9" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`במשולש ישר הזווית $ADC$ הצלע $CD$ היא הניצב שמול הזווית $A$, ו-$AC$ הוא היתר.`,
          String.raw`$\angle B=90^\circ-28^\circ=62^\circ$; במשולש $BDC$ השתמשו באותה דרך.`,
          String.raw`$AB=AD+DB$, כאשר $AD=\frac{CD}{\tan28^\circ}$ ו-$DB=\frac{CD}{\tan62^\circ}$.`,
        ],
        solutionSteps: [
          String.raw`במשולש ישר הזווית $ADC$ ($\angle ADC=90^\circ$): $\sin A=\frac{CD}{AC}$, ולכן $AC=\frac{6}{\sin28^\circ}\approx12.78$.`,
          String.raw`סכום הזוויות במשולש $ABC$: $\angle B=180^\circ-90^\circ-28^\circ=62^\circ$. במשולש ישר הזווית $BDC$: $BC=\frac{CD}{\sin62^\circ}=\frac{6}{\sin62^\circ}\approx6.80$.`,
          String.raw`$AD=\frac{CD}{\tan28^\circ}\approx11.284$ ו-$DB=\frac{CD}{\tan62^\circ}\approx3.190$, ולכן $AB=AD+DB\approx14.47$.`,
          String.raw`בדיקה לפי משפט פיתגורס: $12.78^2+6.80^2\approx163.3+46.2=209.5\approx14.47^2$.`,
        ],
        finalAnswer: String.raw`$AC\approx12.78$, $BC\approx6.80$, $AB\approx14.47$`,
        answers: [
          { label: String.raw`$AC$`, value: 12.780326809137076 },
          { label: String.raw`$BC$`, value: 6.795420304134235 },
          { label: String.raw`$AB$`, value: 14.474615382046863 },
        ],
      },
      {
        id: 'trig-right-triangle-6',
        difficulty: 2,
        statement: String.raw`במשולש ישר הזווית $ABC$ ($\angle C=90^\circ$) נתון $AC=8$ ו-$\angle B=30^\circ$. הנקודה $D$ נמצאת על הניצב $BC$, כך ש-$\angle ADC=60^\circ$ (ראו שרטוט).

א. חשבו את אורכי הקטעים $BD$ ו-$AD$.

ב. מה סוג המשולש $ABD$? נמקו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,44.9 290.0,195.1 30.0,195.1" />
  <line x1="30.0" y1="44.9" x2="116.7" y2="195.1" />
  <polyline points="30.0,186.1 39.0,186.1 39.0,195.1" stroke-width="1" />
  <path d="M 255.4,175.1 A 40 40 0 0 0 250.0,195.1" stroke-width="1.2" />
  <path d="M 108.7,181.2 A 16 16 0 0 0 100.7,195.1" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="233.0" y="184.8" font-size="14" text-anchor="middle">30°</text>
    <text x="83.8" y="181.1" font-size="14" text-anchor="middle">60°</text>
    <text x="18.0" y="125.0" font-size="14" text-anchor="middle">8</text>
    <text x="20.2" y="39.6" text-anchor="middle">A</text>
    <text x="304.4" y="205.2" text-anchor="middle">B</text>
    <text x="17.0" y="208.6" text-anchor="middle">C</text>
    <text x="116.7" y="217.1" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`במשולש $ABC$: $\tan B=\frac{AC}{BC}$; במשולש $ADC$: $\tan60^\circ=\frac{AC}{CD}$.`,
          String.raw`$BD=BC-CD$. את $AD$ מוצאים מ-$\sin60^\circ=\frac{AC}{AD}$.`,
        ],
        solutionSteps: [
          String.raw`במשולש ישר הזווית $ABC$: $\tan B=\frac{AC}{BC}$, ולכן $BC=\frac{8}{\tan30^\circ}=8\sqrt3\approx13.86$.`,
          String.raw`במשולש ישר הזווית $ADC$: $\tan60^\circ=\frac{AC}{CD}$, ולכן $CD=\frac{8}{\sqrt3}\approx4.62$.`,
          String.raw`$BD=BC-CD=8\sqrt3-\frac{8}{\sqrt3}=\frac{16}{\sqrt3}\approx9.24$.`,
          String.raw`במשולש $ADC$: $\sin60^\circ=\frac{AC}{AD}$, ולכן $AD=\frac{8}{\sin60^\circ}=\frac{16}{\sqrt3}\approx9.24$.`,
          String.raw`ב. $AD=BD$, ולכן המשולש $ABD$ שווה-שוקיים. גם לפי זוויות: $\angle ADB=180^\circ-60^\circ=120^\circ$ (זווית צמודה), ולכן $\angle BAD=180^\circ-120^\circ-30^\circ=30^\circ=\angle B$.`,
        ],
        finalAnswer: String.raw`$BD=AD=\frac{16}{\sqrt3}\approx9.24$; המשולש $ABD$ שווה-שוקיים.`,
        answers: [
          { label: String.raw`$BD$`, value: 9.237604307034012 },
          { label: String.raw`$AD$`, value: 9.237604307034012 },
        ],
      },
      {
        id: 'trig-right-triangle-7',
        difficulty: 3,
        statement: String.raw`מהנקודה $A$ שעל הקרקע רואים את ראש המגדל $T$ בזווית הגבהה של $32^\circ$. מתקרבים למגדל 40 מטר בקו ישר עד לנקודה $B$, ומשם רואים את ראש המגדל בזווית הגבהה של $50^\circ$ (ראו שרטוט; $C$ – בסיס המגדל, $A$, $B$, $C$ על קו ישר אחד).

חשבו את גובה המגדל $TC$ ואת המרחק $BC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,201.2 290.0,201.2 290.0,38.8" />
  <line x1="153.7" y1="201.2" x2="290.0" y2="38.8" />
  <polyline points="281.0,201.2 281.0,192.2 290.0,192.2" stroke-width="1" />
  <path d="M 66.0,201.2 A 36 36 0 0 0 60.5,182.2" stroke-width="1.2" />
  <path d="M 177.7,201.2 A 24 24 0 0 0 169.1,182.8" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="82.9" y="191.1" font-size="14" text-anchor="middle">32°</text>
    <text x="192.6" y="188.1" font-size="14" text-anchor="middle">50°</text>
    <text x="91.8" y="218.2" font-size="14" text-anchor="middle">40</text>
    <text x="24.0" y="221.2" text-anchor="middle">A</text>
    <text x="153.7" y="223.2" text-anchor="middle">B</text>
    <text x="296.0" y="221.2" text-anchor="middle">C</text>
    <text x="299.4" y="33.1" text-anchor="middle">T</text>
  </g>
</svg>`,
        hints: [
          String.raw`סמנו $BC=x$ ו-$TC=h$. בשני המשולשים ישרי הזווית $TBC$ ו-$TAC$ הניצב $h$ משותף.`,
          String.raw`$h=x\tan50^\circ$ וגם $h=(x+40)\tan32^\circ$.`,
          String.raw`השוו את שני הביטויים ובודדו את $x$.`,
        ],
        solutionSteps: [
          String.raw`נסמן $BC=x$ ו-$TC=h$. במשולש ישר הזווית $TBC$ ($\angle C=90^\circ$): $\tan50^\circ=\frac hx$, ולכן $h=x\tan50^\circ$.`,
          String.raw`במשולש ישר הזווית $TAC$: $AC=x+40$ ו-$\tan32^\circ=\frac{h}{x+40}$, ולכן $h=(x+40)\tan32^\circ$.`,
          String.raw`משווים: $x\tan50^\circ=(x+40)\tan32^\circ$, ולכן $x(\tan50^\circ-\tan32^\circ)=40\tan32^\circ$.`,
          String.raw`$x=\frac{40\tan32^\circ}{\tan50^\circ-\tan32^\circ}\approx\frac{24.995}{0.5669}\approx44.09$ מטר.`,
          String.raw`$h=x\tan50^\circ\approx44.09\cdot1.1918\approx52.55$ מטר.`,
        ],
        finalAnswer: String.raw`גובה המגדל $\approx52.55$ מ׳, $BC\approx44.09$ מ׳`,
        answers: [
          { label: String.raw`גובה המגדל $TC$`, value: 52.546198436580795 },
          { label: String.raw`$BC$`, value: 44.09149572790311 },
        ],
      },
      {
        id: 'trig-right-triangle-8',
        difficulty: 3,
        statement: String.raw`במשולש ישר הזווית $ABC$ ($\angle ACB=90^\circ$) היתר הוא $AB=c$ ו-$\angle A=\alpha$. $CD$ הוא הגובה ליתר (ראו שרטוט).

א. הביעו באמצעות $c$ ו-$\alpha$ את אורכי הקטעים $BC$, $CD$ ו-$BD$.

ב. נתון $c=10$ ו-$BD=2.5$. מצאו את $\alpha$ ואת אורך הגובה $CD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,176.3 290.0,176.3 225.0,63.7" />
  <line x1="225.0" y1="63.7" x2="225.0" y2="176.3" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="217.2,68.2 221.7,76.0 229.5,71.5" stroke-width="1" />
  <polyline points="225.0,167.3 234.0,167.3 234.0,176.3" stroke-width="1" />
  <path d="M 70.0,176.3 A 40 40 0 0 0 64.6,156.3" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="79.3" y="168.1" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="160.0" y="198.3" font-size="16" text-anchor="middle" font-style="italic">c</text>
    <text x="15.4" y="185.9" text-anchor="middle">A</text>
    <text x="304.2" y="187.2" text-anchor="middle">B</text>
    <text x="232.5" y="56.7" text-anchor="middle">C</text>
    <text x="225.0" y="198.3" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`$BC$ הוא הניצב שמול $\alpha$ במשולש $ABC$: $BC=c\sin\alpha$.`,
          String.raw`במשולש ישר הזווית $BDC$ הזווית $\angle BCD$ שווה ל-$\alpha$ (שתיהן משלימות את $\angle B$ ל-$90^\circ$).`,
          String.raw`תקבלו $BD=c\sin^2\alpha$; הציבו את הנתונים ופתרו את המשוואה $\sin^2\alpha=\frac14$ לזווית חדה.`,
        ],
        solutionSteps: [
          String.raw`א. במשולש ישר הזווית $ABC$: $BC=AB\sin A=c\sin\alpha$.`,
          String.raw`במשולש $ABC$: $\angle B=90^\circ-\alpha$; במשולש ישר הזווית $BDC$ ($\angle BDC=90^\circ$): $\angle BCD=90^\circ-\angle B=\alpha$.`,
          String.raw`במשולש $BDC$ היתר הוא $BC$: $CD=BC\cos\alpha=c\sin\alpha\cos\alpha$ ו-$BD=BC\sin\alpha=c\sin^2\alpha$.`,
          String.raw`ב. $10\sin^2\alpha=2.5$, ולכן $\sin^2\alpha=\frac14$. $\alpha$ זווית חדה, ולכן $\sin\alpha=\frac12$ ו-$\alpha=30^\circ$.`,
          String.raw`$CD=10\sin30^\circ\cos30^\circ=10\cdot\frac12\cdot\frac{\sqrt3}{2}=\frac{5\sqrt3}{2}\approx4.33$.`,
        ],
        finalAnswer: String.raw`א. $BC=c\sin\alpha$, $CD=c\sin\alpha\cos\alpha$, $BD=c\sin^2\alpha$. ב. $\alpha=30^\circ$, $CD=\frac{5\sqrt3}{2}\approx4.33$.`,
        answers: [
          { label: String.raw`$\alpha$ (במעלות)`, value: 30 },
          { label: String.raw`$CD$`, value: 4.330127018922193 },
        ],
      },
    ],
  },
  'trig-polygons': {
    intro: String.raw`רוב המצולעים בשאלה 5 נפתרים על ידי **פירוק למשולשים ישרי זווית**: מורידים גובה בטרפז או במקבילית, מעבירים אלכסונים במעוין ובדלתון, או רדיוסים ואנך מהמרכז במצולע משוכלל – ואז משתמשים ב-$\sin$, $\cos$, $\tan$ ובמשפט פיתגורס. המיומנות המרכזית היא לבחור את הקו העזר שיוצר משולש ישר זווית שבו יש צלע ידועה וזווית ידועה, ולהשתמש בתכונות המרובע כדי להעביר נתונים ממשולש למשולש.`,
    keyFacts: [
      String.raw`**מקבילית** $ABCD$ עם צלעות $a$, $b$ וזווית $\alpha$: הגובה לצלע $a$ הוא $h=b\sin\alpha$, והשטח $a\cdot h$. זוויות סמוכות משלימות ל-$180^\circ$, והאלכסונים חוצים זה את זה.`,
      String.raw`**מעוין** שצלעו $a$ וזוויתו $\alpha$: האלכסונים מאונכים, חוצים זה את זה וחוצים את זוויות המעוין, ולכן הם $2a\cos\frac\alpha2$ ו-$2a\sin\frac\alpha2$.`,
      String.raw`**טרפז שווה-שוקיים** עם בסיסים $a>b$ וזווית בסיס $\alpha$: הגבהים מקצות התחתונים קטעים $\frac{a-b}{2}$, ולכן השוק $\frac{a-b}{2\cos\alpha}$ והגובה $\frac{a-b}{2}\tan\alpha$. **טרפז ישר זווית**: גובה אחד הוא השוק המאונכת.`,
      String.raw`**דלתון** $ABCD$ ($AB=AD$, $CB=CD$): האלכסון הראשי $AC$ חוצה את הזוויות $A$ ו-$C$, מאונך לאלכסון $BD$ וחוצה אותו.`,
      String.raw`**מצולע משוכלל** בעל $n$ צלעות החסום במעגל שרדיוסו $R$: הזווית המרכזית $\frac{360^\circ}{n}$, הצלע $2R\sin\frac{180^\circ}{n}$, והאנך מהמרכז לצלע $R\cos\frac{180^\circ}{n}$.`,
    ],
    exercises: [
      {
        id: 'trig-polygons-1',
        difficulty: 1,
        statement: String.raw`צלע המעוין $ABCD$ היא 8, והזווית החדה שלו היא $\angle DAB=50^\circ$ (ראו שרטוט). חשבו את אורכי האלכסונים $AC$ ו-$BD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,180.6 188.3,180.6 290.0,59.4 131.7,59.4" />
  <line x1="30.0" y1="180.6" x2="290.0" y2="59.4" stroke-width="1.5" />
  <line x1="188.3" y1="180.6" x2="131.7" y2="59.4" stroke-width="1.5" />
  <polyline points="168.2,116.2 172.0,124.4 163.8,128.2" stroke-width="1" />
  <path d="M 60.0,180.6 A 30 30 0 0 0 49.3,157.6" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="82.9" y="172.8" font-size="14" text-anchor="middle">50°</text>
    <text x="109.1" y="197.6" font-size="14" text-anchor="middle">8</text>
    <text x="16.4" y="193.0" text-anchor="middle">A</text>
    <text x="194.6" y="200.2" text-anchor="middle">B</text>
    <text x="303.6" y="59.0" text-anchor="middle">C</text>
    <text x="125.4" y="51.8" text-anchor="middle">D</text>
    <text x="168.0" y="112.0" text-anchor="middle">O</text>
  </g>
</svg>`,
        hints: [
          String.raw`במעוין האלכסונים מאונכים, חוצים זה את זה וחוצים את זוויות המעוין: $\angle OAB=25^\circ$.`,
          String.raw`במשולש ישר הזווית $AOB$ היתר הוא $AB=8$.`,
        ],
        solutionSteps: [
          String.raw`נסמן את נקודת חיתוך האלכסונים $O$. במעוין האלכסונים מאונכים וחוצים זה את זה, והאלכסון $AC$ חוצה את הזווית $A$, ולכן $\angle AOB=90^\circ$ ו-$\angle OAB=25^\circ$.`,
          String.raw`במשולש ישר הזווית $AOB$: $AO=8\cos25^\circ\approx7.250$ ו-$BO=8\sin25^\circ\approx3.381$.`,
          String.raw`$AC=2AO=16\cos25^\circ\approx14.50$ ו-$BD=2BO=16\sin25^\circ\approx6.76$.`,
        ],
        finalAnswer: String.raw`$AC=16\cos25^\circ\approx14.50$, $BD=16\sin25^\circ\approx6.76$`,
        answers: [
          { label: String.raw`$AC$`, value: 14.500924592586399 },
          { label: String.raw`$BD$`, value: 6.761892187851191 },
        ],
      },
      {
        id: 'trig-polygons-2',
        difficulty: 1,
        statement: String.raw`במקבילית $ABCD$ נתון $AB=10$, $AD=6$ ו-$\angle DAB=60^\circ$. $DE$ הוא הגובה לצלע $AB$ (ראו שרטוט). חשבו את אורך הגובה $DE$ ואת שטח המקבילית.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,172.0 230.0,172.0 290.0,68.0 90.0,68.0" />
  <line x1="90.0" y1="68.0" x2="90.0" y2="172.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="90.0,163.0 99.0,163.0 99.0,172.0" stroke-width="1" />
  <path d="M 54.0,172.0 A 24 24 0 0 0 42.0,151.2" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="67.2" y="155.5" font-size="14" text-anchor="middle">60°</text>
    <text x="49.6" y="119.0" font-size="14" text-anchor="middle">6</text>
    <text x="160.0" y="193.0" font-size="14" text-anchor="middle">10</text>
    <text x="16.1" y="183.5" text-anchor="middle">A</text>
    <text x="242.0" y="186.9" text-anchor="middle">B</text>
    <text x="303.9" y="68.5" text-anchor="middle">C</text>
    <text x="78.0" y="65.1" text-anchor="middle">D</text>
    <text x="90.0" y="194.0" text-anchor="middle">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`במשולש ישר הזווית $AED$ היתר הוא $AD=6$, והגובה $DE$ הוא הניצב שמול הזווית $A$.`,
          String.raw`שטח מקבילית = צלע $\times$ הגובה אליה.`,
        ],
        solutionSteps: [
          String.raw`במשולש ישר הזווית $AED$ ($\angle AED=90^\circ$): $DE=AD\sin60^\circ=6\cdot\frac{\sqrt3}{2}=3\sqrt3\approx5.20$.`,
          String.raw`שטח המקבילית: $S=AB\cdot DE=10\cdot3\sqrt3=30\sqrt3\approx51.96$.`,
        ],
        finalAnswer: String.raw`$DE=3\sqrt3\approx5.20$, שטח $30\sqrt3\approx51.96$`,
        answers: [
          { label: String.raw`$DE$`, value: 5.196152422706632 },
          { label: String.raw`שטח המקבילית`, value: 51.96152422706631 },
        ],
      },
      {
        id: 'trig-polygons-3',
        difficulty: 2,
        statement: String.raw`בטרפז שווה-השוקיים $ABCD$ ($AB\parallel DC$) הבסיסים הם $AB=18$ ו-$DC=8$, וזווית הבסיס היא $\angle DAB=55^\circ$ (ראו שרטוט). חשבו את אורך השוק, את גובה הטרפז ואת שטחו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,171.6 290.0,171.6 217.8,68.4 102.2,68.4" />
  <line x1="102.2" y1="68.4" x2="102.2" y2="171.6" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="217.8" y1="68.4" x2="217.8" y2="171.6" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="102.2,162.6 93.2,162.6 93.2,171.6" stroke-width="1" />
  <polyline points="217.8,162.6 226.8,162.6 226.8,171.6" stroke-width="1" />
  <path d="M 56.0,171.6 A 26 26 0 0 0 44.9,150.3" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="69.9" y="155.8" font-size="14" text-anchor="middle">55°</text>
    <text x="160.0" y="61.4" font-size="14" text-anchor="middle">8</text>
    <text x="160.0" y="192.6" font-size="14" text-anchor="middle">18</text>
    <text x="16.1" y="183.1" text-anchor="middle">A</text>
    <text x="303.9" y="183.1" text-anchor="middle">B</text>
    <text x="229.0" y="64.4" text-anchor="middle">C</text>
    <text x="91.0" y="64.4" text-anchor="middle">D</text>
    <text x="102.2" y="193.6" text-anchor="middle">E</text>
    <text x="217.8" y="193.6" text-anchor="middle">F</text>
  </g>
</svg>`,
        hints: [
          String.raw`הורידו גבהים $DE$ ו-$CF$. בטרפז שווה-שוקיים $AE=FB=\frac{18-8}{2}=5$.`,
          String.raw`במשולש ישר הזווית $AED$: $\cos55^\circ=\frac{AE}{AD}$ ו-$\tan55^\circ=\frac{DE}{AE}$.`,
        ],
        solutionSteps: [
          String.raw`נוריד גבהים $DE$ ו-$CF$ לבסיס $AB$. $DCFE$ מלבן ($EF=DC=8$), והמשולשים $AED$ ו-$BFC$ חופפים, ולכן $AE=FB=\frac{18-8}{2}=5$.`,
          String.raw`במשולש ישר הזווית $AED$: $\cos55^\circ=\frac{AE}{AD}$, ולכן השוק $AD=\frac{5}{\cos55^\circ}\approx8.72$.`,
          String.raw`$\tan55^\circ=\frac{DE}{AE}$, ולכן הגובה $DE=5\tan55^\circ\approx7.14$.`,
          String.raw`שטח הטרפז: $S=\frac{AB+DC}{2}\cdot DE=\frac{18+8}{2}\cdot5\tan55^\circ=65\tan55^\circ\approx92.83$.`,
        ],
        finalAnswer: String.raw`שוק $\approx8.72$, גובה $\approx7.14$, שטח $\approx92.83$`,
        answers: [
          { label: String.raw`השוק $AD$`, value: 8.71723397810549 },
          { label: String.raw`הגובה`, value: 7.140740033710572 },
          { label: String.raw`שטח הטרפז`, value: 92.82962043823744 },
        ],
      },
      {
        id: 'trig-polygons-4',
        difficulty: 2,
        statement: String.raw`בטרפז ישר הזווית $ABCD$ ($AB\parallel DC$, $\angle DAB=90^\circ$) הבסיסים הם $AB=15$ ו-$DC=9$, ו-$\angle ABC=50^\circ$ (ראו שרטוט). חשבו את גובה הטרפז, את אורך השוק $BC$ ואת אורך האלכסון $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,182.0 290.0,182.0 186.0,58.0 30.0,58.0" />
  <line x1="186.0" y1="58.0" x2="186.0" y2="182.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="30.0" y1="182.0" x2="186.0" y2="58.0" stroke-width="1.5" />
  <polyline points="39.0,182.0 39.0,173.0 30.0,173.0" stroke-width="1" />
  <polyline points="186.0,173.0 195.0,173.0 195.0,182.0" stroke-width="1" />
  <path d="M 264.0,182.0 A 26 26 0 0 1 273.3,162.1" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="249.2" y="168.0" font-size="14" text-anchor="middle">50°</text>
    <text x="108.0" y="51.0" font-size="14" text-anchor="middle">9</text>
    <text x="138.0" y="203.0" font-size="14" text-anchor="middle">15</text>
    <text x="17.1" y="195.6" text-anchor="middle">A</text>
    <text x="303.9" y="193.5" text-anchor="middle">B</text>
    <text x="195.6" y="52.5" text-anchor="middle">C</text>
    <text x="17.1" y="56.4" text-anchor="middle">D</text>
    <text x="186.0" y="204.0" text-anchor="middle">F</text>
  </g>
</svg>`,
        hints: [
          String.raw`הורידו גובה $CF$ לבסיס $AB$. $AFCD$ מלבן, ולכן $AF=9$ ו-$FB=6$.`,
          String.raw`במשולש ישר הזווית $CFB$: $\tan50^\circ=\frac{CF}{FB}$, $\cos50^\circ=\frac{FB}{BC}$.`,
          String.raw`האלכסון $AC$ – לפי משפט פיתגורס במשולש $AFC$.`,
        ],
        solutionSteps: [
          String.raw`נוריד גובה $CF$ לבסיס $AB$. $AFCD$ מלבן (שלוש זוויות ישרות), ולכן $AF=DC=9$ ו-$FB=15-9=6$.`,
          String.raw`במשולש ישר הזווית $CFB$: $CF=FB\tan50^\circ=6\tan50^\circ\approx7.15$ – זה גובה הטרפז.`,
          String.raw`$BC=\frac{FB}{\cos50^\circ}=\frac{6}{\cos50^\circ}\approx9.33$.`,
          String.raw`לפי משפט פיתגורס במשולש ישר הזווית $AFC$: $AC=\sqrt{AF^2+CF^2}=\sqrt{81+7.1505^2}\approx11.49$.`,
        ],
        finalAnswer: String.raw`גובה $\approx7.15$, $BC\approx9.33$, $AC\approx11.49$`,
        answers: [
          { label: String.raw`הגובה`, value: 7.15052155556526 },
          { label: String.raw`$BC$`, value: 9.334342961162474 },
          { label: String.raw`$AC$`, value: 11.494779620184262 },
        ],
      },
      {
        id: 'trig-polygons-5',
        difficulty: 2,
        statement: String.raw`בדלתון $ABCD$ נתון $AB=AD=10$ ו-$CB=CD$. זוויות הראש הן $\angle BAD=80^\circ$ ו-$\angle BCD=50^\circ$ (ראו שרטוט). חשבו את האלכסון $BD$, את הצלע $CB$ ואת האלכסון $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,120.0 122.9,197.9 290.0,120.0 122.9,42.1" />
  <line x1="30.0" y1="120.0" x2="290.0" y2="120.0" stroke-width="1.5" />
  <line x1="122.9" y1="197.9" x2="122.9" y2="42.1" stroke-width="1.5" />
  <polyline points="131.9,120.0 131.9,111.0 122.9,111.0" stroke-width="1" />
  <path d="M 46.9,134.1 A 22 22 0 0 0 46.9,105.9" stroke-width="1.2" />
  <path d="M 259.2,105.6 A 34 34 0 0 0 259.2,134.4" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="78.0" y="137.0" font-size="14" text-anchor="middle">80°</text>
    <text x="228.0" y="137.0" font-size="14" text-anchor="middle">50°</text>
    <text x="68.7" y="173.2" font-size="14" text-anchor="middle">10</text>
    <text x="68.7" y="76.8" font-size="14" text-anchor="middle">10</text>
    <text x="15.0" y="126.0" text-anchor="middle">A</text>
    <text x="119.4" y="218.5" text-anchor="middle">B</text>
    <text x="305.0" y="126.0" text-anchor="middle">C</text>
    <text x="119.4" y="33.5" text-anchor="middle">D</text>
    <text x="134.9" y="142.0" text-anchor="middle">M</text>
  </g>
</svg>`,
        hints: [
          String.raw`האלכסון הראשי $AC$ מאונך ל-$BD$, חוצה אותו בנקודה $M$ וחוצה את הזוויות $A$ ו-$C$: $\angle BAM=40^\circ$, $\angle BCM=25^\circ$.`,
          String.raw`מהמשולש ישר הזווית $ABM$ מוצאים $BM$ ו-$AM$; מהמשולש ישר הזווית $CBM$ מוצאים $CB$ ו-$CM$.`,
        ],
        solutionSteps: [
          String.raw`בדלתון האלכסון הראשי $AC$ מאונך לאלכסון $BD$, חוצה אותו (בנקודה $M$) וחוצה את זוויות הראש: $\angle BAM=40^\circ$, $\angle BCM=25^\circ$.`,
          String.raw`במשולש ישר הזווית $ABM$: $BM=10\sin40^\circ\approx6.428$ ו-$AM=10\cos40^\circ\approx7.660$. לכן $BD=2BM=20\sin40^\circ\approx12.86$.`,
          String.raw`במשולש ישר הזווית $CBM$: $\sin25^\circ=\frac{BM}{CB}$, ולכן $CB=\frac{10\sin40^\circ}{\sin25^\circ}\approx15.21$.`,
          String.raw`$\tan25^\circ=\frac{BM}{CM}$, ולכן $CM=\frac{10\sin40^\circ}{\tan25^\circ}\approx13.785$.`,
          String.raw`$AC=AM+MC\approx7.660+13.785\approx21.45$.`,
        ],
        finalAnswer: String.raw`$BD\approx12.86$, $CB\approx15.21$, $AC\approx21.45$`,
        answers: [
          { label: String.raw`$BD$`, value: 12.855752193730785 },
          { label: String.raw`$CB$`, value: 15.209650596710995 },
          { label: String.raw`$AC$`, value: 21.445069205095585 },
        ],
      },
      {
        id: 'trig-polygons-6',
        difficulty: 2,
        statement: String.raw`מחומש משוכלל $ABCDE$ חסום במעגל שמרכזו $O$ ורדיוסו 6 (ראו שרטוט). חשבו את אורך צלע המחומש ואת שטחו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="90.0" stroke-width="1" />
  <polygon points="107.1,192.8 212.9,192.8 245.6,92.2 160.0,30.0 74.4,92.2" />
  <line x1="160.0" y1="120.0" x2="107.1" y2="192.8" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="212.9" y2="192.8" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="160.0" y2="192.8" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="160.0,183.8 169.0,183.8 169.0,192.8" stroke-width="1" />
  <path d="M 151.8,131.3 A 14 14 0 0 0 168.2,131.3" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="194.5" y="155.5" font-size="14" text-anchor="middle">6</text>
    <text x="97.1" y="210.8" text-anchor="middle">A</text>
    <text x="222.9" y="210.8" text-anchor="middle">B</text>
    <text x="259.9" y="93.6" text-anchor="middle">C</text>
    <text x="160.0" y="21.0" text-anchor="middle">D</text>
    <text x="60.1" y="93.6" text-anchor="middle">E</text>
    <text x="148.0" y="122.0" text-anchor="middle">O</text>
    <text x="160.0" y="216.8" text-anchor="middle">M</text>
  </g>
</svg>`,
        hints: [
          String.raw`הרדיוסים מחלקים את המחומש לחמישה משולשים שווי-שוקיים חופפים, עם זווית ראש $\frac{360^\circ}{5}=72^\circ$.`,
          String.raw`האנך $OM$ לצלע $AB$ חוצה את זווית הראש: במשולש ישר הזווית $OMA$, $\angle AOM=36^\circ$.`,
        ],
        solutionSteps: [
          String.raw`הרדיוסים לקודקודים מחלקים את המחומש המשוכלל לחמישה משולשים שווי-שוקיים חופפים ($OA=OB=6$), ולכן $\angle AOB=\frac{360^\circ}{5}=72^\circ$.`,
          String.raw`נוריד אנך $OM$ לצלע $AB$; במשולש שווה-שוקיים הוא גם תיכון וגם חוצה זווית, ולכן $\angle AOM=36^\circ$ ו-$AB=2AM$.`,
          String.raw`במשולש ישר הזווית $OMA$: $AM=6\sin36^\circ\approx3.527$ ו-$OM=6\cos36^\circ\approx4.854$. לכן הצלע $AB=12\sin36^\circ\approx7.05$.`,
          String.raw`שטח משולש אחד: $\frac12\cdot AB\cdot OM\approx\frac12\cdot7.0534\cdot4.8541\approx17.119$, ושטח המחומש פי 5: $\approx85.60$.`,
        ],
        finalAnswer: String.raw`צלע $12\sin36^\circ\approx7.05$, שטח $\approx85.60$`,
        answers: [
          { label: String.raw`צלע המחומש`, value: 7.053423027509678 },
          { label: String.raw`שטח המחומש`, value: 85.59508646656383 },
        ],
      },
      {
        id: 'trig-polygons-7',
        difficulty: 3,
        statement: String.raw`במקבילית $ABCD$ נתון $AB=12$ ו-$\angle DAB=60^\circ$, והאלכסון $BD$ מאונך לצלע $AD$ (ראו שרטוט). חשבו את $AD$, את האלכסון $BD$ ואת האלכסון $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,165.0 238.0,165.0 290.0,75.0 82.0,75.0" />
  <line x1="238.0" y1="165.0" x2="82.0" y2="75.0" />
  <line x1="238.0" y1="165.0" x2="290.0" y2="165.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="290.0" y1="75.0" x2="290.0" y2="165.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="30.0" y1="165.0" x2="290.0" y2="75.0" stroke-width="1.5" />
  <polyline points="77.5,82.8 85.3,87.3 89.8,79.5" stroke-width="1" />
  <polyline points="290.0,156.0 281.0,156.0 281.0,165.0" stroke-width="1" />
  <path d="M 56.0,165.0 A 26 26 0 0 0 43.0,142.5" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="69.0" y="147.5" font-size="14" text-anchor="middle">60°</text>
    <text x="134.0" y="184.0" font-size="14" text-anchor="middle">12</text>
    <text x="15.8" y="175.9" text-anchor="middle">A</text>
    <text x="251.0" y="178.5" text-anchor="middle">B</text>
    <text x="304.2" y="76.1" text-anchor="middle">C</text>
    <text x="69.0" y="73.5" text-anchor="middle">D</text>
    <text x="298.0" y="185.0" text-anchor="middle">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`המשולש $ABD$ ישר זווית ב-$D$, והיתר שלו הוא $AB=12$.`,
          String.raw`לאלכסון $AC$: הורידו גובה $CE$ להמשך הצלע $AB$. הגובה שווה לגובה המקבילית, ו-$BE$ שווה להיטל של $AD$ על $AB$.`,
          String.raw`גובה המקבילית $=AD\sin60^\circ$, ו-$AE=AB+BE$; השלימו בפיתגורס במשולש $AEC$.`,
        ],
        solutionSteps: [
          String.raw`במשולש ישר הזווית $ABD$ ($\angle ADB=90^\circ$) היתר הוא $AB=12$: $AD=12\cos60^\circ=6$ ו-$BD=12\sin60^\circ=6\sqrt3\approx10.39$.`,
          String.raw`נוריד גובה $CE$ להמשך הצלע $AB$. במקבילית $BC=AD=6$ ו-$BC\parallel AD$, ולכן $\angle CBE=\angle DAB=60^\circ$ (זוויות מתאימות).`,
          String.raw`במשולש ישר הזווית $BEC$: $BE=6\cos60^\circ=3$ ו-$CE=6\sin60^\circ=3\sqrt3$.`,
          String.raw`$AE=AB+BE=15$, ולפי משפט פיתגורס במשולש $AEC$: $AC^2=15^2+(3\sqrt3)^2=225+27=252$.`,
          String.raw`$AC=\sqrt{252}=6\sqrt7\approx15.87$.`,
        ],
        finalAnswer: String.raw`$AD=6$, $BD=6\sqrt3\approx10.39$, $AC=6\sqrt7\approx15.87$`,
        answers: [
          { label: String.raw`$AD$`, value: 6 },
          { label: String.raw`$BD$`, value: 10.392304845413264 },
          { label: String.raw`$AC$`, value: 15.874507866387544 },
        ],
      },
      {
        id: 'trig-polygons-8',
        difficulty: 3,
        statement: String.raw`בטרפז שווה-השוקיים $ABCD$ ($AB\parallel DC$) הבסיס הגדול הוא $AB=20$ וזווית הבסיס היא $\angle DAB=70^\circ$. האלכסון $AC$ חוצה את הזווית $DAB$ (ראו שרטוט).

א. הוכיחו כי $AD=DC$.

ב. חשבו את אורך השוק, את גובה הטרפז ואת שטחו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,192.5 290.0,192.5 237.2,47.5 82.8,47.5" />
  <line x1="30.0" y1="192.5" x2="237.2" y2="47.5" />
  <path d="M 60.0,192.5 A 30 30 0 0 0 54.6,175.3" stroke-width="1.2" />
  <path d="M 54.6,175.3 A 30 30 0 0 0 40.3,164.3" stroke-width="1.2" />
  <path d="M 207.2,47.5 A 30 30 0 0 0 212.6,64.7" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="160.0" y="209.5" font-size="14" text-anchor="middle">20</text>
    <text x="16.9" y="205.8" text-anchor="middle">A</text>
    <text x="303.1" y="205.8" text-anchor="middle">B</text>
    <text x="248.1" y="43.2" text-anchor="middle">C</text>
    <text x="71.9" y="43.2" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`$\angle DCA=\angle CAB$ כזוויות מתחלפות בין ישרים מקבילים.`,
          String.raw`סמנו $AD=DC=x$. ההיטל של כל שוק על $AB$ הוא $x\cos70^\circ$, ולכן $AB=x+2x\cos70^\circ$.`,
        ],
        solutionSteps: [
          String.raw`א. $AC$ חוצה את $\angle DAB$, ולכן $\angle DAC=\angle CAB=35^\circ$. $DC\parallel AB$, ולכן $\angle DCA=\angle CAB=35^\circ$ (זוויות מתחלפות).`,
          String.raw`במשולש $ADC$: $\angle DAC=\angle DCA$, ולכן המשולש שווה-שוקיים ו-$AD=DC$ (מול זוויות שוות צלעות שוות).`,
          String.raw`ב. נסמן $AD=DC=BC=x$ ונוריד גבהים $DE$, $CF$. במשולש ישר הזווית $AED$: $AE=x\cos70^\circ$, ובאותו אופן $FB=x\cos70^\circ$.`,
          String.raw`$AB=AE+EF+FB$, כלומר $20=x+2x\cos70^\circ$, ולכן $x=\frac{20}{1+2\cos70^\circ}\approx\frac{20}{1.6840}\approx11.88$.`,
          String.raw`הגובה: $DE=x\sin70^\circ\approx11.876\cdot0.9397\approx11.16$.`,
          String.raw`השטח: $S=\frac{AB+DC}{2}\cdot DE\approx\frac{20+11.876}{2}\cdot11.160\approx177.87$.`,
        ],
        finalAnswer: String.raw`שוק $=DC\approx11.88$, גובה $\approx11.16$, שטח $\approx177.87$`,
        answers: [
          { label: String.raw`השוק $AD$`, value: 11.87620044397476 },
          { label: String.raw`הגובה`, value: 11.15997792017741 },
          { label: String.raw`שטח הטרפז`, value: 177.86884656695383 },
        ],
      },
    ],
  },
  'trig-sine-law': {
    intro: String.raw`**משפט הסינוסים** תקף בכל משולש: היחס בין צלע לסינוס הזווית שמולה קבוע, והוא שווה לקוטר המעגל החוסם, $2R$. משתמשים בו כשידועות **שתי זוויות וצלע**, או **שתי צלעות וזווית שמול אחת מהן**; במקרה השני ייתכנו שתי זוויות שונות עם אותו סינוס – ולכן לפעמים יש שני משולשים, וצריך לדעת להכריע. בשאלה 5 משפט הסינוסים מופיע כמעט תמיד, לבד או יחד עם משפט הקוסינוסים ועם רדיוס המעגל החוסם.`,
    keyFacts: [
      String.raw`**משפט הסינוסים**: $\frac{a}{\sin\alpha}=\frac{b}{\sin\beta}=\frac{c}{\sin\gamma}=2R$, כאשר $a$, $b$, $c$ הצלעות שמול הזוויות $\alpha$, $\beta$, $\gamma$ ו-$R$ רדיוס המעגל החוסם את המשולש.`,
      String.raw`**מתי**: (1) נתונות שתי זוויות וצלע – משלימים את הזווית השלישית ל-$180^\circ$ ומוצאים את שאר הצלעות. (2) נתונות שתי צלעות וזווית שמול אחת מהן – מוצאים את הסינוס של הזווית שמול הצלע השנייה. (3) קשר בין צלע, הזווית שמולה ו-$R$: $a=2R\sin\alpha$.`,
      String.raw`**שתי זוויות עם אותו סינוס**: $\sin(180^\circ-x)=\sin x$, ולכן מ-$\sin\gamma=k$ (עם $0<k<1$) מתקבלות שתי אפשרויות: $\gamma_1=\sin^{-1}k$ (חדה) ו-$\gamma_2=180^\circ-\gamma_1$ (קהה).`,
      String.raw`**איך מכריעים (צ.צ.ז)**: אם הזווית הנתונה נמצאת **מול הצלע הגדולה** מבין השתיים – יש משולש אחד, כי מול צלע קטנה זווית קטנה, ולכן הזווית המבוקשת חדה. אם היא **מול הצלע הקטנה** – בודקים את $\gamma_2$: אם סכומה עם הזווית הנתונה קטן מ-$180^\circ$, יש שני משולשים. אם $k>1$ – אין משולש.`,
      String.raw`במשולש מול הצלע הגדולה נמצאת הזווית הגדולה, ולהפך – זו הבדיקה הראשונה לסבירות התשובה.`,
    ],
    exercises: [
      {
        id: 'trig-sine-law-1',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ נתון $\angle A=40^\circ$, $\angle B=75^\circ$ ו-$BC=10$ (ראו שרטוט). חשבו את אורך הצלע $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,209.1 290.0,209.1 242.3,30.9" />
  <path d="M 60.0,209.1 A 30 30 0 0 0 53.0,189.8" stroke-width="1.2" />
  <path d="M 283.8,185.9 A 24 24 0 0 0 266.0,209.1" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="76.0" y="197.3" font-size="14" text-anchor="middle">40°</text>
    <text x="255.9" y="187.9" font-size="14" text-anchor="middle">75°</text>
    <text x="277.7" y="121.9" font-size="14" text-anchor="middle">10</text>
    <text x="16.0" y="220.4" text-anchor="middle">A</text>
    <text x="303.0" y="222.6" text-anchor="middle">B</text>
    <text x="248.6" y="23.3" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`$BC$ נמצאת מול הזווית $A$, ו-$AC$ נמצאת מול הזווית $B$.`,
          String.raw`לפי משפט הסינוסים: $\frac{AC}{\sin B}=\frac{BC}{\sin A}$.`,
        ],
        solutionSteps: [
          String.raw`הצלע $BC$ נמצאת מול הזווית $A$, והצלע $AC$ מול הזווית $B$.`,
          String.raw`לפי משפט הסינוסים: $\frac{AC}{\sin75^\circ}=\frac{10}{\sin40^\circ}$, ולכן $AC=\frac{10\sin75^\circ}{\sin40^\circ}\approx\frac{9.659}{0.6428}\approx15.03$.`,
          String.raw`סבירות: $\angle B>\angle A$, ולכן $AC>BC$, כמו שיצא.`,
        ],
        finalAnswer: String.raw`$AC\approx15.03$`,
        answers: [{ label: String.raw`$AC$`, value: 15.027138229377353 }],
      },
      {
        id: 'trig-sine-law-2',
        difficulty: 1,
        statement: String.raw`המשולש $ABC$ חסום במעגל. נתון $BC=12$ ו-$\angle BAC=50^\circ$ (ראו שרטוט). חשבו את רדיוס המעגל.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="90.0" stroke-width="1.5" />
  <polygon points="152.2,30.3 91.1,177.9 228.9,177.9" />
  <path d="M 140.7,58.1 A 30 30 0 0 0 166.0,57.0" stroke-width="1.2" />
  <circle cx="160.0" cy="120.0" r="2.5" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="154.3" y="84.3" font-size="14" text-anchor="middle">50°</text>
    <text x="160.0" y="168.9" font-size="14" text-anchor="middle">12</text>
    <text x="150.8" y="21.4" text-anchor="middle">A</text>
    <text x="79.6" y="193.5" text-anchor="middle">B</text>
    <text x="240.4" y="193.5" text-anchor="middle">C</text>
    <text x="170.0" y="120.0" text-anchor="middle">O</text>
  </g>
</svg>`,
        hints: [
          String.raw`לפי משפט הסינוסים, היחס בין צלע לסינוס הזווית שמולה שווה ל-$2R$.`,
        ],
        solutionSteps: [
          String.raw`הצלע $BC$ נמצאת מול הזווית $A$, ולפי משפט הסינוסים $\frac{BC}{\sin A}=2R$.`,
          String.raw`$2R=\frac{12}{\sin50^\circ}\approx\frac{12}{0.7660}\approx15.665$, ולכן $R\approx7.83$.`,
        ],
        finalAnswer: String.raw`$R=\frac{6}{\sin50^\circ}\approx7.83$`,
        answers: [{ label: String.raw`$R$`, value: 7.832443735993672 }],
      },
      {
        id: 'trig-sine-law-3',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $AB=9$, $\angle A=48^\circ$ ו-$\angle B=64^\circ$ (ראו שרטוט). חשבו את הזווית $C$ ואת אורכי הצלעות $AC$ ו-$BC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="35.1,210.0 284.9,210.0 197.1,30.0" />
  <path d="M 63.1,210.0 A 28 28 0 0 0 53.8,189.2" stroke-width="1.2" />
  <path d="M 274.4,188.4 A 24 24 0 0 0 260.9,210.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="78.0" y="195.9" font-size="14" text-anchor="middle">48°</text>
    <text x="248.5" y="192.2" font-size="14" text-anchor="middle">64°</text>
    <text x="160.0" y="227.0" font-size="14" text-anchor="middle">9</text>
    <text x="21.3" y="222.0" text-anchor="middle">A</text>
    <text x="298.2" y="223.1" text-anchor="middle">B</text>
    <text x="200.2" y="21.3" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`מצאו קודם את $\angle C$ מסכום הזוויות במשולש. הצלע הנתונה $AB$ נמצאת מולה.`,
          String.raw`$\frac{AC}{\sin B}=\frac{BC}{\sin A}=\frac{AB}{\sin C}$.`,
        ],
        solutionSteps: [
          String.raw`סכום הזוויות במשולש הוא $180^\circ$: $\angle C=180^\circ-48^\circ-64^\circ=68^\circ$.`,
          String.raw`לפי משפט הסינוסים: $\frac{AB}{\sin C}=\frac{9}{\sin68^\circ}\approx9.707$.`,
          String.raw`$AC=\frac{9\sin64^\circ}{\sin68^\circ}\approx8.72$ ו-$BC=\frac{9\sin48^\circ}{\sin68^\circ}\approx7.21$.`,
          String.raw`סבירות: $\angle C>\angle B>\angle A$, ואכן $AB>AC>BC$.`,
        ],
        finalAnswer: String.raw`$\angle C=68^\circ$, $AC\approx8.72$, $BC\approx7.21$`,
        answers: [
          { label: String.raw`$\angle C$`, value: 68 },
          { label: String.raw`$AC$`, value: 8.724425449008745 },
          { label: String.raw`$BC$`, value: 7.213567618065951 },
        ],
      },
      {
        id: 'trig-sine-law-4',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $BC=12$, $AB=8$ ו-$\angle A=70^\circ$ (ראו שרטוט).

א. חשבו את $\angle C$, והסבירו מדוע יש רק משולש אחד המקיים את הנתונים.

ב. חשבו את $\angle B$ ואת אורך הצלע $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,200.8 88.8,39.2 290.0,200.8" />
  <path d="M 56.0,200.8 A 26 26 0 0 0 38.9,176.4" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="66.9" y="180.0" font-size="14" text-anchor="middle">70°</text>
    <text x="48.1" y="120.9" font-size="14" text-anchor="middle">8</text>
    <text x="196.9" y="115.6" font-size="14" text-anchor="middle">12</text>
    <text x="16.6" y="213.6" text-anchor="middle">A</text>
    <text x="82.8" y="31.4" text-anchor="middle">B</text>
    <text x="304.2" y="211.8" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`הצלע $AB$ נמצאת מול $\angle C$, ו-$BC$ מול $\angle A$: $\frac{AB}{\sin C}=\frac{BC}{\sin A}$.`,
          String.raw`הזווית הנתונה נמצאת מול הצלע הגדולה ($BC>AB$), ולכן $\angle C<\angle A$ – והזווית $C$ חדה.`,
        ],
        solutionSteps: [
          String.raw`א. לפי משפט הסינוסים: $\frac{8}{\sin C}=\frac{12}{\sin70^\circ}$, ולכן $\sin C=\frac{8\sin70^\circ}{12}\approx0.6265$.`,
          String.raw`יש שתי זוויות עם סינוס זה: $\approx38.79^\circ$ ו-$\approx141.21^\circ$. אבל $AB<BC$, ומול הצלע הקטנה נמצאת הזווית הקטנה, ולכן $\angle C<\angle A=70^\circ$. (וגם: $141.21^\circ+70^\circ>180^\circ$.) לכן $\angle C\approx38.79^\circ$ בלבד – משולש אחד.`,
          String.raw`ב. $\angle B=180^\circ-70^\circ-38.79^\circ\approx71.21^\circ$.`,
          String.raw`לפי משפט הסינוסים: $AC=\frac{BC\sin B}{\sin A}=\frac{12\sin71.21^\circ}{\sin70^\circ}\approx12.09$.`,
        ],
        finalAnswer: String.raw`$\angle C\approx38.79^\circ$ (משולש יחיד), $\angle B\approx71.21^\circ$, $AC\approx12.09$`,
        answers: [
          { label: String.raw`$\angle C$`, value: 38.7895564163551 },
          { label: String.raw`$\angle B$`, value: 71.2104435836449 },
          { label: String.raw`$AC$`, value: 12.089587140335814 },
        ],
      },
      {
        id: 'trig-sine-law-5',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $AB=12$, $BC=8$ ו-$\angle A=35^\circ$. הראו שיש שני משולשים שונים המקיימים את הנתונים (בשרטוט: $C_1$ ו-$C_2$), ומצאו בכל אחד מהם את $\angle C$ ואת אורך הצלע $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="30.0" y1="184.3" x2="213.8" y2="55.7" />
  <line x1="30.0" y1="184.3" x2="290.0" y2="184.3" />
  <line x1="213.8" y1="55.7" x2="290.0" y2="184.3" />
  <line x1="213.8" y1="55.7" x2="137.5" y2="184.3" />
  <path d="M 112.5,165.7 A 149.6 149.6 0 0 0 315.1,165.7" stroke-width="1" stroke-dasharray="4 3" />
  <path d="M 60.0,184.3 A 30 30 0 0 0 54.6,167.1" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="76.7" y="174.6" font-size="14" text-anchor="middle">35°</text>
    <text x="115.0" y="115.2" font-size="14" text-anchor="middle">12</text>
    <text x="262.2" y="118.9" font-size="14" text-anchor="middle">8</text>
    <text x="186.0" y="131.1" font-size="14" text-anchor="middle">8</text>
    <text x="15.6" y="194.5" text-anchor="middle">A</text>
    <text x="213.8" y="49.7" text-anchor="middle">B</text>
    <text x="290.0" y="208.3" text-anchor="middle">C<tspan font-size="11" dy="3">1</tspan></text>
    <text x="137.5" y="208.3" text-anchor="middle">C<tspan font-size="11" dy="3">2</tspan></text>
  </g>
</svg>`,
        hints: [
          String.raw`$\frac{AB}{\sin C}=\frac{BC}{\sin A}$ נותן את $\sin C$.`,
          String.raw`הזווית הנתונה נמצאת מול הצלע הקטנה ($BC<AB$), ולכן ייתכן שגם הזווית הקהה $180^\circ-C$ מתאימה. בדקו שסכומה עם $35^\circ$ קטן מ-$180^\circ$.`,
          String.raw`בכל משולש: $\angle B=180^\circ-35^\circ-\angle C$ ו-$AC=\frac{BC\sin B}{\sin A}$.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט הסינוסים: $\frac{12}{\sin C}=\frac{8}{\sin35^\circ}$, ולכן $\sin C=\frac{12\sin35^\circ}{8}\approx0.8604$.`,
          String.raw`$\sin C<1$, ולכן יש שתי זוויות: $C_1\approx59.36^\circ$ ו-$C_2=180^\circ-59.36^\circ\approx120.64^\circ$. הזווית הנתונה נמצאת מול הצלע הקטנה ($8<12$), ו-$120.64^\circ+35^\circ<180^\circ$ – לכן שתי האפשרויות נותנות משולשים: שני משולשים שונים.`,
          String.raw`משולש ראשון: $\angle B_1=180^\circ-35^\circ-59.36^\circ\approx85.64^\circ$, ו-$AC_1=\frac{8\sin85.64^\circ}{\sin35^\circ}\approx13.91$.`,
          String.raw`משולש שני: $\angle B_2=180^\circ-35^\circ-120.64^\circ\approx24.36^\circ$, ו-$AC_2=\frac{8\sin24.36^\circ}{\sin35^\circ}\approx5.75$.`,
          String.raw`בשרטוט רואים זאת: המעגל שמרכזו $B$ ורדיוסו 8 חותך את הקרן $AC$ בשתי נקודות, $C_1$ ו-$C_2$, והמשולש $BC_1C_2$ שווה-שוקיים.`,
        ],
        finalAnswer: String.raw`שני משולשים: $\angle C\approx59.36^\circ$ עם $AC\approx13.91$, או $\angle C\approx120.64^\circ$ עם $AC\approx5.75$.`,
        answers: [
          { label: String.raw`$\angle C$ (משולש ראשון, חדה)`, value: 59.357550964153546 },
          { label: String.raw`$AC$ (משולש ראשון)`, value: 13.907256360382783 },
          { label: String.raw`$\angle C$ (משולש שני, קהה)`, value: 120.64244903584645 },
          { label: String.raw`$AC$ (משולש שני)`, value: 5.752392702553017 },
        ],
      },
      {
        id: 'trig-sine-law-6',
        difficulty: 2,
        statement: String.raw`רדיוס המעגל החוסם את המשולש $ABC$ הוא $R=5$. נתון $\angle A=30^\circ$ ו-$\angle B=45^\circ$. חשבו את אורכי שלוש הצלעות.`,
        hints: [
          String.raw`לפי משפט הסינוסים כל צלע שווה ל-$2R$ כפול הסינוס של הזווית שמולה.`,
          String.raw`$\angle C=105^\circ$; $\sin105^\circ=\sin75^\circ$.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט הסינוסים: $a=2R\sin A$, $b=2R\sin B$, $c=2R\sin C$, ו-$2R=10$.`,
          String.raw`$BC=a=10\sin30^\circ=5$ ו-$AC=b=10\sin45^\circ=5\sqrt2\approx7.07$.`,
          String.raw`$\angle C=180^\circ-30^\circ-45^\circ=105^\circ$, ולכן $AB=c=10\sin105^\circ\approx9.66$.`,
          String.raw`(ערך מדויק: $\sin105^\circ=\sin75^\circ=\frac{\sqrt6+\sqrt2}{4}$, ולכן $AB=\frac{5(\sqrt6+\sqrt2)}{2}$.)`,
        ],
        finalAnswer: String.raw`$BC=5$, $AC=5\sqrt2\approx7.07$, $AB=10\sin105^\circ\approx9.66$`,
        answers: [
          { label: String.raw`$BC$`, value: 5 },
          { label: String.raw`$AC$`, value: 7.071067811865475 },
          { label: String.raw`$AB$`, value: 9.659258262890683 },
        ],
      },
      {
        id: 'trig-sine-law-7',
        difficulty: 3,
        statement: String.raw`במרובע $ABCD$ האלכסון $AC$ מחלק אותו לשני משולשים. נתון: $AB=10$, $\angle BAC=40^\circ$, $\angle ABC=85^\circ$, $\angle CAD=35^\circ$ ו-$\angle ADC=100^\circ$ (ראו שרטוט). חשבו את אורך האלכסון $AC$ ואת אורכי הצלעות $CD$ ו-$AD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="64.3,108.8 184.9,210.0 255.7,108.8 176.9,30.0" />
  <line x1="64.3" y1="108.8" x2="255.7" y2="108.8" />
  <path d="M 90.3,130.7 A 34 34 0 0 0 98.3,108.8" stroke-width="1.2" />
  <path d="M 104.3,108.8 A 40 40 0 0 0 97.1,85.9" stroke-width="1.2" />
  <path d="M 195.2,195.3 A 18 18 0 0 0 171.1,198.4" stroke-width="1.2" />
  <path d="M 163.8,39.2 A 16 16 0 0 0 188.2,41.3" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="114.1" y="132.0" font-size="14" text-anchor="middle">40°</text>
    <text x="120.6" y="96.1" font-size="14" text-anchor="middle">35°</text>
    <text x="180.0" y="178.3" font-size="14" text-anchor="middle">85°</text>
    <text x="173.8" y="69.9" font-size="14" text-anchor="middle">100°</text>
    <text x="116.9" y="173.6" font-size="14" text-anchor="middle">10</text>
    <text x="49.3" y="114.0" text-anchor="middle">A</text>
    <text x="187.1" y="230.8" text-anchor="middle">B</text>
    <text x="270.7" y="113.8" text-anchor="middle">C</text>
    <text x="178.0" y="21.0" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`במשולש $ABC$ ידועות שתי זוויות וצלע: מצאו את $\angle ACB$ והפעילו את משפט הסינוסים כדי למצוא את $AC$.`,
          String.raw`במשולש $ACD$ ידועות עכשיו שתי זוויות והצלע $AC$; מצאו את $\angle ACD$.`,
        ],
        solutionSteps: [
          String.raw`במשולש $ABC$: $\angle ACB=180^\circ-40^\circ-85^\circ=55^\circ$.`,
          String.raw`לפי משפט הסינוסים במשולש $ABC$: $\frac{AC}{\sin85^\circ}=\frac{AB}{\sin55^\circ}$, ולכן $AC=\frac{10\sin85^\circ}{\sin55^\circ}\approx12.16$.`,
          String.raw`במשולש $ACD$: $\angle ACD=180^\circ-35^\circ-100^\circ=45^\circ$.`,
          String.raw`לפי משפט הסינוסים במשולש $ACD$: $\frac{CD}{\sin35^\circ}=\frac{AD}{\sin45^\circ}=\frac{AC}{\sin100^\circ}\approx12.349$.`,
          String.raw`$CD\approx12.349\cdot\sin35^\circ\approx7.08$ ו-$AD\approx12.349\cdot\sin45^\circ\approx8.73$.`,
        ],
        finalAnswer: String.raw`$AC\approx12.16$, $CD\approx7.08$, $AD\approx8.73$`,
        answers: [
          { label: String.raw`$AC$`, value: 12.161291728892936 },
          { label: String.raw`$CD$`, value: 7.083037628357697 },
          { label: String.raw`$AD$`, value: 8.731990404406845 },
        ],
      },
      {
        id: 'trig-sine-law-8',
        difficulty: 3,
        statement: String.raw`המשולש $ABC$ חסום במעגל שרדיוסו $R=7$. נתון $BC=7$ ו-$AC=11$.

א. מצאו את $\angle A$, והסבירו מדוע יש לה ערך אחד בלבד.

ב. הראו שלזווית $B$ יש שני ערכים אפשריים (שני משולשים, ראו שרטוט), ומצאו בכל משולש את $\angle B$ ואת אורך הצלע $AB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="90.0" stroke-width="1" />
  <polygon points="149.9,30.6 144.4,208.6 75.4,150.8" />
  <line x1="149.9" y1="30.6" x2="91.1" y2="62.1" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="75.4" y1="150.8" x2="91.1" y2="62.1" stroke-width="1.5" stroke-dasharray="5 3" />
  <path d="M 136.2,52.7 A 26 26 0 0 0 149.1,56.6" stroke-width="1.2" />
  <circle cx="160.0" cy="120.0" r="2.5" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="124.6" y="103.0" font-size="14" text-anchor="middle">11</text>
    <text x="117.6" y="175.5" font-size="14" text-anchor="middle">7</text>
    <text x="148.2" y="21.7" text-anchor="middle">A</text>
    <text x="141.8" y="229.4" text-anchor="middle">B<tspan font-size="11" dy="3">1</tspan></text>
    <text x="79.6" y="58.5" text-anchor="middle">B<tspan font-size="11" dy="3">2</tspan></text>
    <text x="61.3" y="161.9" text-anchor="middle">C</text>
    <text x="170.0" y="122.0" text-anchor="middle">O</text>
  </g>
</svg>`,
        hints: [
          String.raw`$\frac{BC}{\sin A}=2R$ ו-$\frac{AC}{\sin B}=2R$.`,
          String.raw`$\sin A=\frac12$: האם $\angle A=150^\circ$ אפשרית? השוו את $BC$ ל-$AC$.`,
          String.raw`עבור $B$ בדקו את שתי האפשרויות מול $\angle A=30^\circ$, ואז $AB=2R\sin C$.`,
        ],
        solutionSteps: [
          String.raw`א. לפי משפט הסינוסים: $\sin A=\frac{BC}{2R}=\frac{7}{14}=\frac12$, ולכן $\angle A=30^\circ$ או $150^\circ$.`,
          String.raw`$BC<AC$, ולכן (מול צלע קטנה זווית קטנה) $\angle A<\angle B$. אילו $\angle A=150^\circ$, גם $\angle B>150^\circ$ – סכום גדול מ-$180^\circ$. לכן $\angle A=30^\circ$ בלבד.`,
          String.raw`ב. $\sin B=\frac{AC}{2R}=\frac{11}{14}\approx0.7857$, ולכן $\angle B\approx51.79^\circ$ או $\angle B\approx128.21^\circ$.`,
          String.raw`שתי האפשרויות גדולות מ-$\angle A=30^\circ$, ובשתיהן $\angle A+\angle B<180^\circ$, ולכן יש שני משולשים.`,
          String.raw`משולש ראשון: $\angle C\approx180^\circ-30^\circ-51.79^\circ=98.21^\circ$, ו-$AB=2R\sin C=14\sin98.21^\circ\approx13.86$.`,
          String.raw`משולש שני: $\angle C\approx180^\circ-30^\circ-128.21^\circ=21.79^\circ$, ו-$AB=14\sin21.79^\circ\approx5.20$.`,
          String.raw`ערכים מדויקים: $\cos B=\pm\sqrt{1-\frac{121}{196}}=\pm\frac{5\sqrt3}{14}$, ו-$\sin C=\sin(A+B)=\sin30^\circ\cos B+\cos30^\circ\sin B=\frac{\pm5\sqrt3+11\sqrt3}{28}$, ולכן $AB=14\sin C=8\sqrt3$ או $3\sqrt3$.`,
        ],
        finalAnswer: String.raw`$\angle A=30^\circ$. שני משולשים: $\angle B\approx51.79^\circ$ עם $AB=8\sqrt3\approx13.86$, או $\angle B\approx128.21^\circ$ עם $AB=3\sqrt3\approx5.20$.`,
        answers: [
          { label: String.raw`$\angle A$`, value: 30 },
          { label: String.raw`$\angle B$ (משולש ראשון, חדה)`, value: 51.78678929826181 },
          { label: String.raw`$AB$ (משולש ראשון)`, value: 13.856406460551018 },
          { label: String.raw`$\angle B$ (משולש שני, קהה)`, value: 128.2132107017382 },
          { label: String.raw`$AB$ (משולש שני)`, value: 5.1961524227066285 },
        ],
      },
    ],
  },
  'trig-cosine-law': {
    intro: String.raw`**משפט הקוסינוסים** הוא ״פיתגורס מורחב״ לכל משולש: ריבוע צלע שווה לסכום ריבועי שתי הצלעות האחרות פחות פעמיים מכפלתן בקוסינוס הזווית **שביניהן**. משתמשים בו כשנתונות **שתי צלעות והזווית הכלואה** (מחשבים את הצלע השלישית) או **שלוש צלעות** (מחשבים זווית) – בדיוק המקרים שבהם משפט הסינוסים לא עוזר. בשאלה 5 הוא מופיע בכל מרובע שמחולק באלכסון, במקבילית ובמרובע חסום במעגל.`,
    keyFacts: [
      String.raw`**משפט הקוסינוסים**: $c^2=a^2+b^2-2ab\cos\gamma$, כאשר $\gamma$ היא הזווית **הכלואה** בין הצלעות $a$ ו-$b$ (והצלע $c$ מולה).`,
      String.raw`**מציאת זווית משלוש צלעות**: $\cos\gamma=\frac{a^2+b^2-c^2}{2ab}$. כאן אין דו-משמעות: אם $\cos\gamma<0$ הזווית קהה. הזווית הגדולה נמצאת מול הצלע הגדולה.`,
      String.raw`כאשר $\gamma=90^\circ$ מתקבל משפט פיתגורס ($\cos90^\circ=0$); כאשר $\gamma$ קהה, $\cos\gamma<0$ והצלע $c$ ארוכה יותר מאשר במשולש ישר זווית.`,
      String.raw`**צ.צ.ז במשפט הקוסינוסים**: אם נתונות שתי צלעות וזווית שאינה כלואה ביניהן, אפשר לכתוב את המשפט לצלע שמול הזווית הנתונה ולקבל **משוואה ריבועית** בצלע החסרה (פוסלים פתרון שלילי).`,
      String.raw`**זוויות משלימות ל-$180^\circ$**: $\cos(180^\circ-\alpha)=-\cos\alpha$ – שימושי במקבילית (זוויות סמוכות), במרובע חסום במעגל (זוויות נגדיות) ובזוויות צמודות לאורך תיכון.`,
    ],
    exercises: [
      {
        id: 'trig-cosine-law-1',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ נתון $AB=3$, $AC=8$ ו-$\angle BAC=60^\circ$ (ראו שרטוט). חשבו את אורך הצלע $BC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,162.2 78.8,77.8 290.0,162.2" />
  <path d="M 54.0,162.2 A 24 24 0 0 0 42.0,141.4" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="67.2" y="145.7" font-size="14" text-anchor="middle">60°</text>
    <text x="44.0" y="119.0" font-size="14" text-anchor="middle">3</text>
    <text x="160.0" y="179.2" font-size="14" text-anchor="middle">8</text>
    <text x="15.5" y="172.2" text-anchor="middle">A</text>
    <text x="68.3" y="73.0" text-anchor="middle">B</text>
    <text x="304.8" y="170.9" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`הזווית הנתונה כלואה בין שתי הצלעות הנתונות, ולכן משתמשים במשפט הקוסינוסים לצלע שמולה.`,
        ],
        solutionSteps: [
          String.raw`הזווית $A$ כלואה בין $AB$ ל-$AC$, והצלע $BC$ נמצאת מולה. לפי משפט הקוסינוסים: $BC^2=AB^2+AC^2-2\cdot AB\cdot AC\cos A$.`,
          String.raw`$BC^2=9+64-2\cdot3\cdot8\cdot\frac12=73-24=49$, ולכן $BC=7$.`,
        ],
        finalAnswer: String.raw`$BC=7$`,
        answers: [{ label: String.raw`$BC$`, value: 7 }],
      },
      {
        id: 'trig-cosine-law-2',
        difficulty: 1,
        statement: String.raw`אורכי הצלעות של משולש הם 3, 5 ו-7. חשבו את הזווית הגדולה של המשולש.`,
        hints: [
          String.raw`הזווית הגדולה נמצאת מול הצלע הגדולה, 7.`,
          String.raw`$\cos\gamma=\frac{3^2+5^2-7^2}{2\cdot3\cdot5}$.`,
        ],
        solutionSteps: [
          String.raw`הזווית הגדולה $\gamma$ נמצאת מול הצלע הגדולה, 7, והיא כלואה בין הצלעות 3 ו-5.`,
          String.raw`לפי משפט הקוסינוסים: $49=9+25-2\cdot3\cdot5\cos\gamma$, ולכן $\cos\gamma=\frac{34-49}{30}=-\frac12$.`,
          String.raw`$\cos\gamma<0$, ולכן הזווית קהה: $\gamma=180^\circ-60^\circ=120^\circ$.`,
        ],
        finalAnswer: String.raw`$120^\circ$`,
        answers: [{ label: String.raw`הזווית הגדולה`, value: 120 }],
      },
      {
        id: 'trig-cosine-law-3',
        difficulty: 2,
        statement: String.raw`במשולש שווה-השוקיים $ABC$ השוקיים הן $AB=AC=10$ וזווית הראש $\angle BAC=36^\circ$ (ראו שרטוט). חשבו בעזרת משפט הקוסינוסים את אורך הבסיס $BC$, ומצאו את זוויות הבסיס.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160.0,30.0 101.5,210.0 218.5,210.0" />
  <path d="M 147.6,68.0 A 40 40 0 0 0 172.4,68.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="160.0" y="101.0" font-size="14" text-anchor="middle">36°</text>
    <text x="119.3" y="121.3" font-size="14" text-anchor="middle">10</text>
    <text x="200.7" y="121.3" font-size="14" text-anchor="middle">10</text>
    <text x="160.0" y="21.0" text-anchor="middle">A</text>
    <text x="91.0" y="226.7" text-anchor="middle">B</text>
    <text x="229.0" y="226.7" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`$BC^2=10^2+10^2-2\cdot10\cdot10\cos36^\circ$.`,
          String.raw`זוויות הבסיס במשולש שווה-שוקיים שוות, וסכום הזוויות $180^\circ$.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט הקוסינוסים: $BC^2=AB^2+AC^2-2\cdot AB\cdot AC\cos A=200-200\cos36^\circ\approx200-161.80=38.20$.`,
          String.raw`$BC\approx6.18$.`,
          String.raw`זוויות הבסיס שוות: $\angle B=\angle C=\frac{180^\circ-36^\circ}{2}=72^\circ$.`,
          String.raw`בדיקה בדרך אחרת: הגובה לבסיס חוצה את זווית הראש, ולכן $BC=2\cdot10\sin18^\circ\approx6.18$.`,
        ],
        finalAnswer: String.raw`$BC\approx6.18$; זוויות הבסיס $72^\circ$`,
        answers: [
          { label: String.raw`$BC$`, value: 6.180339887498949 },
          { label: String.raw`זווית בסיס`, value: 72 },
        ],
      },
      {
        id: 'trig-cosine-law-4',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $AC=7$, $BC=8$ ו-$\angle A=60^\circ$ (ראו שרטוט). חשבו את אורך הצלע $AB$ בעזרת משפט הקוסינוסים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="76.6,210.0 180.5,30.0 243.4,210.0" />
  <path d="M 102.6,210.0 A 26 26 0 0 0 89.6,187.5" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="115.5" y="192.5" font-size="14" text-anchor="middle">60°</text>
    <text x="160.0" y="227.0" font-size="14" text-anchor="middle">7</text>
    <text x="223.3" y="121.0" font-size="14" text-anchor="middle">8</text>
    <text x="64.1" y="224.3" text-anchor="middle">A</text>
    <text x="182.2" y="21.1" text-anchor="middle">B</text>
    <text x="255.2" y="225.3" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`הזווית $A$ אינה כלואה בין הצלעות הנתונות, אבל $BC$ נמצאת מולה. סמנו $AB=x$ וכתבו את משפט הקוסינוסים ל-$BC$.`,
          String.raw`מתקבלת המשוואה $64=49+x^2-7x$; פתרו אותה ופסלו פתרון שלילי.`,
        ],
        solutionSteps: [
          String.raw`נסמן $AB=x$. הצלע $BC=8$ נמצאת מול הזווית $A$, הכלואה בין $AB$ ל-$AC$. לפי משפט הקוסינוסים: $8^2=x^2+7^2-2\cdot7\cdot x\cos60^\circ$.`,
          String.raw`$64=x^2+49-7x$, ולכן $x^2-7x-15=0$.`,
          String.raw`$x=\frac{7\pm\sqrt{49+60}}{2}=\frac{7\pm\sqrt{109}}{2}$. הפתרון $\frac{7-\sqrt{109}}{2}<0$ נפסל (אורך חיובי).`,
          String.raw`$AB=\frac{7+\sqrt{109}}{2}\approx8.72$. (כאן הזווית נמצאת מול הצלע הגדולה מבין השתיים הנתונות, ולכן יש משולש אחד בלבד – בהתאם לפתרון חיובי יחיד.)`,
        ],
        finalAnswer: String.raw`$AB=\frac{7+\sqrt{109}}{2}\approx8.72$`,
        answers: [{ label: String.raw`$AB$`, value: 8.720153254455276 }],
      },
      {
        id: 'trig-cosine-law-5',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $AB=5$, $AC=6$, $BC=7$. $AM$ הוא התיכון לצלע $BC$ (ראו שרטוט).

א. חשבו את הזווית הקטנה של המשולש.

ב. חשבו את אורך התיכון $AM$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="130.8,42.0 30.0,198.0 290.0,198.0" />
  <line x1="130.8" y1="42.0" x2="160.0" y2="198.0" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="70.3" y="118.5" font-size="14" text-anchor="middle">5</text>
    <text x="218.8" y="116.4" font-size="14" text-anchor="middle">6</text>
    <text x="128.1" y="33.3" text-anchor="middle">A</text>
    <text x="16.2" y="209.9" text-anchor="middle">B</text>
    <text x="304.1" y="209.2" text-anchor="middle">C</text>
    <text x="160.0" y="220.0" text-anchor="middle">M</text>
  </g>
</svg>`,
        hints: [
          String.raw`הזווית הקטנה נמצאת מול הצלע הקטנה, $AB=5$ – זו הזווית $C$.`,
          String.raw`לתיכון: חשבו את $\cos B$ מהמשולש $ABC$, ואז הפעילו את משפט הקוסינוסים במשולש $ABM$ עם $BM=3.5$.`,
        ],
        solutionSteps: [
          String.raw`א. הזווית הקטנה נמצאת מול הצלע הקטנה $AB=5$, כלומר $\angle C$. לפי משפט הקוסינוסים: $\cos C=\frac{AC^2+BC^2-AB^2}{2\cdot AC\cdot BC}=\frac{36+49-25}{84}=\frac57$, ולכן $\angle C\approx44.42^\circ$.`,
          String.raw`ב. לפי משפט הקוסינוסים במשולש $ABC$: $\cos B=\frac{AB^2+BC^2-AC^2}{2\cdot AB\cdot BC}=\frac{25+49-36}{70}=\frac{38}{70}$.`,
          String.raw`$M$ אמצע $BC$, ולכן $BM=3.5$. לפי משפט הקוסינוסים במשולש $ABM$: $AM^2=AB^2+BM^2-2\cdot AB\cdot BM\cos B=25+12.25-35\cdot\frac{38}{70}=37.25-19=18.25$.`,
          String.raw`$AM=\sqrt{18.25}\approx4.27$.`,
        ],
        finalAnswer: String.raw`$\angle C\approx44.42^\circ$; $AM=\sqrt{18.25}\approx4.27$`,
        answers: [
          { label: String.raw`הזווית הקטנה`, value: 44.415308597192976 },
          { label: String.raw`$AM$`, value: 4.272001872658765 },
        ],
      },
      {
        id: 'trig-cosine-law-6',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $AB=7$, $AC=9$, $BC=10$. הנקודה $D$ נמצאת על הצלע $BC$ כך ש-$BD=4$ (ראו שרטוט). חשבו את אורך הקטע $AD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="118.4,40.5 30.0,199.5 290.0,199.5" />
  <line x1="118.4" y1="40.5" x2="134.0" y2="199.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="63.7" y="119.2" font-size="14" text-anchor="middle">7</text>
    <text x="212.4" y="116.2" font-size="14" text-anchor="middle">9</text>
    <text x="82.0" y="220.5" font-size="14" text-anchor="middle">4</text>
    <text x="114.6" y="31.9" text-anchor="middle">A</text>
    <text x="16.4" y="211.8" text-anchor="middle">B</text>
    <text x="304.1" y="210.7" text-anchor="middle">C</text>
    <text x="134.0" y="221.5" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`הזווית $B$ משותפת למשולשים $ABC$ ו-$ABD$.`,
          String.raw`מצאו את $\cos B$ מהמשולש $ABC$ (שלוש צלעות), ואז השתמשו בו במשולש $ABD$.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט הקוסינוסים במשולש $ABC$: $\cos B=\frac{AB^2+BC^2-AC^2}{2\cdot AB\cdot BC}=\frac{49+100-81}{140}=\frac{68}{140}$.`,
          String.raw`הזווית $B$ היא גם זווית של המשולש $ABD$, כלואה בין $AB=7$ ל-$BD=4$.`,
          String.raw`לפי משפט הקוסינוסים במשולש $ABD$: $AD^2=49+16-2\cdot7\cdot4\cdot\frac{68}{140}=65-27.2=37.8$.`,
          String.raw`$AD=\sqrt{37.8}\approx6.15$.`,
        ],
        finalAnswer: String.raw`$AD=\sqrt{37.8}\approx6.15$`,
        answers: [{ label: String.raw`$AD$`, value: 6.148170459575759 }],
      },
      {
        id: 'trig-cosine-law-7',
        difficulty: 3,
        statement: String.raw`המרובע $ABCD$ חסום במעגל. נתון $AB=5$, $BC=8$, $CD=3$ ו-$\angle ABC=60^\circ$ (ראו שרטוט). חשבו את אורך האלכסון $AC$ ואת אורך הצלע $AD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="90.0" stroke-width="1" />
  <polygon points="126.6,36.4 70.9,132.9 249.1,132.9 233.4,67.9" />
  <line x1="126.6" y1="36.4" x2="249.1" y2="132.9" stroke-width="1.5" />
  <path d="M 94.9,132.9 A 24 24 0 0 0 82.9,112.1" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="108.2" y="116.4" font-size="14" text-anchor="middle">60°</text>
    <text x="109.2" y="95.6" font-size="14" text-anchor="middle">5</text>
    <text x="160.0" y="125.9" font-size="14" text-anchor="middle">8</text>
    <text x="229.6" y="108.2" font-size="14" text-anchor="middle">3</text>
    <text x="121.0" y="28.5" text-anchor="middle">A</text>
    <text x="56.1" y="141.0" text-anchor="middle">B</text>
    <text x="263.9" y="141.0" text-anchor="middle">C</text>
    <text x="245.6" y="65.2" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`במשולש $ABC$ ידועות שתי צלעות והזווית שביניהן.`,
          String.raw`במרובע חסום במעגל סכום זוויות נגדיות $180^\circ$, ולכן $\angle ADC=120^\circ$.`,
          String.raw`במשולש $ADC$ סמנו $AD=x$; משפט הקוסינוסים נותן משוואה ריבועית.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט הקוסינוסים במשולש $ABC$: $AC^2=25+64-2\cdot5\cdot8\cos60^\circ=89-40=49$, ולכן $AC=7$.`,
          String.raw`המרובע חסום במעגל, ולכן סכום הזוויות הנגדיות $180^\circ$: $\angle ADC=180^\circ-60^\circ=120^\circ$.`,
          String.raw`נסמן $AD=x$. לפי משפט הקוסינוסים במשולש $ADC$: $49=x^2+9-2\cdot3x\cos120^\circ=x^2+9+3x$.`,
          String.raw`$x^2+3x-40=0\iff(x+8)(x-5)=0$; הפתרון השלילי נפסל, ולכן $AD=5$.`,
        ],
        finalAnswer: String.raw`$AC=7$, $AD=5$`,
        answers: [
          { label: String.raw`$AC$`, value: 7 },
          { label: String.raw`$AD$`, value: 5 },
        ],
      },
      {
        id: 'trig-cosine-law-8',
        difficulty: 3,
        statement: String.raw`במקבילית $ABCD$ נתון $AB=7$, $AD=5$, ואורך האלכסון הקצר הוא $BD=8$ (ראו שרטוט).

א. חשבו את הזווית $\angle DAB$.

ב. חשבו את אורך האלכסון $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,203.4 265.9,203.4 290.0,36.6 54.1,36.6" />
  <line x1="265.9" y1="203.4" x2="54.1" y2="36.6" />
  <line x1="30.0" y1="203.4" x2="290.0" y2="36.6" stroke-width="1.5" />
  <path d="M 50.0,203.4 A 20 20 0 0 0 32.9,183.6" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="148.0" y="220.4" font-size="14" text-anchor="middle">7</text>
    <text x="30.2" y="123.3" font-size="14" text-anchor="middle">5</text>
    <text x="119.0" y="78.3" font-size="14" text-anchor="middle">8</text>
    <text x="17.4" y="217.5" text-anchor="middle">A</text>
    <text x="277.7" y="218.7" text-anchor="middle">B</text>
    <text x="302.6" y="34.5" text-anchor="middle">C</text>
    <text x="42.3" y="33.3" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`במשולש $ABD$ ידועות שלוש הצלעות.`,
          String.raw`את $AC$ מחשבים במשולש $ABC$: $BC=5$ והזווית $\angle ABC=180^\circ-\angle DAB$ (זוויות סמוכות במקבילית).`,
          String.raw`$\cos(180^\circ-\alpha)=-\cos\alpha$.`,
        ],
        solutionSteps: [
          String.raw`א. לפי משפט הקוסינוסים במשולש $ABD$: $\cos\angle DAB=\frac{49+25-64}{2\cdot7\cdot5}=\frac{10}{70}=\frac17$, ולכן $\angle DAB\approx81.79^\circ$.`,
          String.raw`ב. במקבילית $BC=AD=5$, וזוויות סמוכות משלימות ל-$180^\circ$: $\angle ABC=180^\circ-\angle DAB$, ולכן $\cos\angle ABC=-\frac17$.`,
          String.raw`לפי משפט הקוסינוסים במשולש $ABC$: $AC^2=49+25-2\cdot7\cdot5\cdot\left(-\frac17\right)=74+10=84$.`,
          String.raw`$AC=\sqrt{84}=2\sqrt{21}\approx9.17$. (בדיקה: במקבילית $AC^2+BD^2=2(AB^2+AD^2)$: $84+64=148=2\cdot74$.)`,
        ],
        finalAnswer: String.raw`$\angle DAB\approx81.79^\circ$; $AC=2\sqrt{21}\approx9.17$`,
        answers: [
          { label: String.raw`$\angle DAB$`, value: 81.78678929826182 },
          { label: String.raw`$AC$`, value: 9.16515138991168 },
        ],
      },
    ],
  },
  'trig-triangle-area': {
    intro: String.raw`הנוסחה $S=\frac12ab\sin\gamma$ נותנת את שטח המשולש משתי צלעות והזווית **שביניהן**, בלי לחשב גובה. ממנה נובעים גם שטח מקבילית $ab\sin\alpha$ ושטח מרובע לפי אלכסוניו $\frac12d_1d_2\sin\theta$. בשאלה 5 משתמשים בנוסחה בשני הכיוונים: מחשבים שטח, או מתוך שטח נתון מוצאים זווית או צלע (ושוב ייתכנו שתי זוויות עם אותו סינוס). השוואת שטחים היא גם כלי למציאת אורכים, למשל של חוצה זווית.`,
    keyFacts: [
      String.raw`**שטח משולש**: $S=\frac12ab\sin\gamma$, כאשר $\gamma$ הזווית הכלואה בין הצלעות $a$ ו-$b$. (הגובה לצלע $a$ הוא $b\sin\gamma$.)`,
      String.raw`**מקבילית** שצלעותיה $a$, $b$ והזווית ביניהן $\alpha$: $S=ab\sin\alpha$. **מרובע** שאלכסוניו $d_1$, $d_2$ והזווית ביניהם $\theta$: $S=\frac12d_1d_2\sin\theta$.`,
      String.raw`**משטח לזווית**: $\sin\gamma=\frac{2S}{ab}$. מכיוון ש-$\sin(180^\circ-\gamma)=\sin\gamma$, ייתכנו שתי זוויות (חדה וקהה) – ושני משולשים שונים עם אותו שטח.`,
      String.raw`**שלוש צלעות**: מוצאים זווית במשפט הקוסינוסים, את $\sin$ שלה בזהות $\sin^2\gamma+\cos^2\gamma=1$, ואז מחשבים שטח.`,
      String.raw`**יחס שטחים**: לשני משולשים עם זווית משותפת (או שוות) יחס השטחים שווה ליחס מכפלות הצלעות הכולאות אותה. **פירוק שטח**: $S_{ABC}=S_{ABD}+S_{ADC}$ מאפשר למצוא קטע $AD$ – למשל חוצה זווית.`,
    ],
    exercises: [
      {
        id: 'trig-triangle-area-1',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ נתון $AB=6$, $AC=9$ ו-$\angle BAC=40^\circ$ (ראו שרטוט). חשבו את שטח המשולש.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="52.7,210.0 239.4,210.0 267.3,30.0" />
  <path d="M 82.7,210.0 A 30 30 0 0 0 75.7,190.7" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="98.8" y="198.2" font-size="14" text-anchor="middle">40°</text>
    <text x="146.1" y="227.0" font-size="14" text-anchor="middle">6</text>
    <text x="152.3" y="115.8" font-size="14" text-anchor="middle">9</text>
    <text x="39.1" y="222.1" text-anchor="middle">A</text>
    <text x="249.4" y="227.2" text-anchor="middle">B</text>
    <text x="275.6" y="23.6" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`הזווית $A$ כלואה בין שתי הצלעות הנתונות: $S=\frac12\cdot AB\cdot AC\cdot\sin A$.`,
        ],
        solutionSteps: [
          String.raw`הזווית $A$ כלואה בין $AB$ ל-$AC$, ולכן $S=\frac12\cdot AB\cdot AC\sin A=\frac12\cdot6\cdot9\sin40^\circ$.`,
          String.raw`$S=27\sin40^\circ\approx27\cdot0.6428\approx17.36$.`,
        ],
        finalAnswer: String.raw`$S=27\sin40^\circ\approx17.36$`,
        answers: [{ label: String.raw`שטח המשולש`, value: 17.35526546153656 }],
      },
      {
        id: 'trig-triangle-area-2',
        difficulty: 1,
        statement: String.raw`במקבילית $ABCD$ נתון $AB=8$, $AD=5$ ו-$\angle DAB=130^\circ$ (ראו שרטוט). חשבו את שטח המקבילית.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="104.5,164.4 290.0,164.4 215.5,75.6 30.0,75.6" />
  <path d="M 122.5,164.4 A 18 18 0 0 0 92.9,150.6" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="120.2" y="135.9" font-size="14" text-anchor="middle">130°</text>
    <text x="197.3" y="181.4" font-size="14" text-anchor="middle">8</text>
    <text x="58.1" y="132.7" font-size="14" text-anchor="middle">5</text>
    <text x="92.8" y="179.8" text-anchor="middle">A</text>
    <text x="304.2" y="175.3" text-anchor="middle">B</text>
    <text x="227.2" y="72.2" text-anchor="middle">C</text>
    <text x="15.8" y="76.7" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`האלכסון $BD$ מחלק את המקבילית לשני משולשים חופפים, ולכן $S=2\cdot\frac12\cdot AB\cdot AD\sin A$.`,
        ],
        solutionSteps: [
          String.raw`האלכסון $BD$ מחלק את המקבילית לשני משולשים חופפים ($ABD\cong CDB$), ולכן $S_{ABCD}=2S_{ABD}=AB\cdot AD\sin A$.`,
          String.raw`$S=8\cdot5\sin130^\circ=40\sin50^\circ\approx30.64$ (לפי $\sin(180^\circ-\alpha)=\sin\alpha$).`,
        ],
        finalAnswer: String.raw`$S=40\sin130^\circ\approx30.64$`,
        answers: [{ label: String.raw`שטח המקבילית`, value: 30.64177772475912 }],
      },
      {
        id: 'trig-triangle-area-3',
        difficulty: 2,
        statement: String.raw`שטח המשולש $ABC$ הוא 15. נתון $AB=6$ ו-$AC=10$.

א. מצאו את כל הערכים האפשריים של $\angle BAC$.

ב. חשבו את אורך הצלע $BC$ בכל אחד מהמקרים.`,
        hints: [
          String.raw`$15=\frac12\cdot6\cdot10\sin A$, ולכן $\sin A=\frac12$.`,
          String.raw`גם $30^\circ$ וגם $150^\circ$ אפשריות – לכל אחת חשבו את $BC$ במשפט הקוסינוסים.`,
        ],
        solutionSteps: [
          String.raw`א. לפי נוסחת השטח: $15=\frac12\cdot6\cdot10\sin A=30\sin A$, ולכן $\sin A=\frac12$.`,
          String.raw`$\angle A=30^\circ$ או $\angle A=150^\circ$ (שתיהן אפשריות, כי בכל אחת נשאר מקום לשתי זוויות חיוביות במשולש).`,
          String.raw`ב. עבור $\angle A=30^\circ$, לפי משפט הקוסינוסים: $BC^2=36+100-120\cos30^\circ=136-60\sqrt3\approx32.08$, ולכן $BC\approx5.66$.`,
          String.raw`עבור $\angle A=150^\circ$: $\cos150^\circ=-\frac{\sqrt3}{2}$, ולכן $BC^2=136+60\sqrt3\approx239.92$ ו-$BC\approx15.49$.`,
        ],
        finalAnswer: String.raw`$\angle A=30^\circ$ ו-$BC\approx5.66$, או $\angle A=150^\circ$ ו-$BC\approx15.49$`,
        answers: [
          { label: String.raw`$\angle A$ (חדה)`, value: 30 },
          { label: String.raw`$BC$ (כאשר הזווית חדה)`, value: 5.66365178536493 },
          { label: String.raw`$\angle A$ (קהה)`, value: 150 },
          { label: String.raw`$BC$ (כאשר הזווית קהה)`, value: 15.489449585254237 },
        ],
      },
      {
        id: 'trig-triangle-area-4',
        difficulty: 2,
        statement: String.raw`אלכסוני המרובע $ABCD$ נחתכים בנקודה $E$. נתון $AC=12$, $BD=9$ ו-$\angle AEB=70^\circ$ (ראו שרטוט).

א. הוכיחו כי $S_{ABCD}=\frac12\cdot AC\cdot BD\cdot\sin70^\circ$.

ב. חשבו את שטח המרובע.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="32.3,130.0 109.6,210.0 287.7,130.0 175.1,30.0" />
  <line x1="32.3" y1="130.0" x2="287.7" y2="130.0" stroke-width="1.5" />
  <line x1="109.6" y1="210.0" x2="175.1" y2="30.0" stroke-width="1.5" />
  <path d="M 120.7,130.0 A 18 18 0 0 0 132.6,146.9" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="108.4" y="156.2" font-size="14" text-anchor="middle">70°</text>
    <text x="17.3" y="136.6" text-anchor="middle">A</text>
    <text x="103.0" y="229.5" text-anchor="middle">B</text>
    <text x="302.7" y="136.5" text-anchor="middle">C</text>
    <text x="178.8" y="21.5" text-anchor="middle">D</text>
    <text x="154.7" y="148.0" text-anchor="middle">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`האלכסונים מחלקים את המרובע לארבעה משולשים שקודקודם המשותף $E$. הזוויות שלהם ב-$E$ הן $70^\circ$ או $110^\circ$, ו-$\sin110^\circ=\sin70^\circ$.`,
          String.raw`הוציאו $\frac12\sin70^\circ$ כגורם משותף ופרקו: $AE\cdot BE+BE\cdot CE+CE\cdot DE+DE\cdot AE=(AE+CE)(BE+DE)$.`,
        ],
        solutionSteps: [
          String.raw`א. האלכסונים מחלקים את המרובע לארבעה משולשים: $ABE$, $BCE$, $CDE$, $DAE$. הזוויות שלהם ב-$E$ הן $70^\circ$ (זוויות קודקודיות) או $110^\circ$ (זוויות צמודות), ו-$\sin110^\circ=\sin70^\circ$.`,
          String.raw`לפי נוסחת השטח: $S_{ABCD}=\frac12\sin70^\circ\,(AE\cdot BE+BE\cdot CE+CE\cdot DE+DE\cdot AE)$.`,
          String.raw`הסוגריים מתפרקים: $BE(AE+CE)+DE(CE+AE)=(AE+CE)(BE+DE)=AC\cdot BD$, ולכן $S_{ABCD}=\frac12\cdot AC\cdot BD\sin70^\circ$.`,
          String.raw`ב. $S=\frac12\cdot12\cdot9\sin70^\circ=54\sin70^\circ\approx50.74$.`,
        ],
        finalAnswer: String.raw`$S=54\sin70^\circ\approx50.74$`,
        answers: [{ label: String.raw`שטח המרובע`, value: 50.74340152243905 }],
      },
      {
        id: 'trig-triangle-area-5',
        difficulty: 2,
        statement: String.raw`אורכי הצלעות של משולש הם 7, 8 ו-9. חשבו את שטח המשולש.`,
        hints: [
          String.raw`מצאו זווית אחת במשפט הקוסינוסים, למשל הזווית שמול הצלע 9.`,
          String.raw`$\sin\gamma=\sqrt{1-\cos^2\gamma}$ (זווית במשולש, ולכן $\sin\gamma>0$), ואז $S=\frac12\cdot7\cdot8\sin\gamma$.`,
        ],
        solutionSteps: [
          String.raw`נסמן ב-$\gamma$ את הזווית שמול הצלע 9 (כלואה בין 7 ל-8). לפי משפט הקוסינוסים: $\cos\gamma=\frac{49+64-81}{2\cdot7\cdot8}=\frac{32}{112}=\frac27$.`,
          String.raw`לפי הזהות $\sin^2\gamma+\cos^2\gamma=1$, ומכיוון ש-$\sin\gamma>0$ בזווית של משולש: $\sin\gamma=\sqrt{1-\frac{4}{49}}=\frac{\sqrt{45}}{7}=\frac{3\sqrt5}{7}$.`,
          String.raw`$S=\frac12\cdot7\cdot8\cdot\frac{3\sqrt5}{7}=12\sqrt5\approx26.83$.`,
        ],
        finalAnswer: String.raw`$S=12\sqrt5\approx26.83$`,
        answers: [{ label: String.raw`שטח המשולש`, value: 26.832815729997478 }],
      },
      {
        id: 'trig-triangle-area-6',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $\angle BAC=45^\circ$ ו-$AB=8$, ושטח המשולש הוא 20 (ראו שרטוט). חשבו את אורכי הצלעות $AC$ ו-$BC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,201.3 290.0,201.3 192.5,38.8" />
  <path d="M 60.0,201.3 A 30 30 0 0 0 51.2,180.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="75.3" y="187.5" font-size="14" text-anchor="middle">45°</text>
    <text x="160.0" y="218.3" font-size="14" text-anchor="middle">8</text>
    <text x="16.0" y="212.6" text-anchor="middle">A</text>
    <text x="303.7" y="213.5" text-anchor="middle">B</text>
    <text x="195.4" y="30.0" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`$20=\frac12\cdot8\cdot AC\cdot\sin45^\circ$ – משוואה ב-$AC$.`,
          String.raw`אחרי שמצאתם את $AC$, השתמשו במשפט הקוסינוסים ל-$BC$.`,
        ],
        solutionSteps: [
          String.raw`לפי נוסחת השטח: $20=\frac12\cdot8\cdot AC\cdot\frac{\sqrt2}{2}=2\sqrt2\,AC$, ולכן $AC=\frac{20}{2\sqrt2}=5\sqrt2\approx7.07$.`,
          String.raw`לפי משפט הקוסינוסים: $BC^2=64+50-2\cdot8\cdot5\sqrt2\cdot\frac{\sqrt2}{2}=114-80=34$.`,
          String.raw`$BC=\sqrt{34}\approx5.83$.`,
        ],
        finalAnswer: String.raw`$AC=5\sqrt2\approx7.07$, $BC=\sqrt{34}\approx5.83$`,
        answers: [
          { label: String.raw`$AC$`, value: 7.0710678118654755 },
          { label: String.raw`$BC$`, value: 5.830951894845301 },
        ],
      },
      {
        id: 'trig-triangle-area-7',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ נתון $AB=6$, $AC=3$ ו-$\angle BAC=120^\circ$. $AD$ חוצה את הזווית $BAC$ ($D$ על $BC$; ראו שרטוט). חשבו את אורך חוצה הזווית $AD$ בעזרת שטחים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="82.0,165.0 290.0,165.0 30.0,75.0" />
  <line x1="82.0" y1="165.0" x2="116.7" y2="105.0" />
  <path d="M 98.0,165.0 A 16 16 0 0 0 74.0,151.2" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="86.0" y="131.1" font-size="14" text-anchor="middle">120°</text>
    <text x="186.0" y="182.0" font-size="14" text-anchor="middle">6</text>
    <text x="45.6" y="131.0" font-size="14" text-anchor="middle">3</text>
    <text x="69.0" y="178.5" text-anchor="middle">A</text>
    <text x="304.7" y="173.9" text-anchor="middle">B</text>
    <text x="17.0" y="73.5" text-anchor="middle">C</text>
    <text x="109.2" y="98.0" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`חוצה הזווית מחלק את המשולש לשני משולשים, $ABD$ ו-$ADC$, שבכל אחד הזווית ב-$A$ היא $60^\circ$.`,
          String.raw`$S_{ABC}=S_{ABD}+S_{ADC}$. סמנו $AD=x$ וכתבו כל שטח בנוסחה $\frac12ab\sin\gamma$.`,
        ],
        solutionSteps: [
          String.raw`$AD$ חוצה את $\angle BAC=120^\circ$, ולכן $\angle BAD=\angle DAC=60^\circ$. נסמן $AD=x$.`,
          String.raw`$S_{ABC}=\frac12\cdot6\cdot3\sin120^\circ=9\sin60^\circ$ (לפי $\sin120^\circ=\sin60^\circ$).`,
          String.raw`$S_{ABD}=\frac12\cdot6\cdot x\sin60^\circ=3x\sin60^\circ$ ו-$S_{ADC}=\frac12\cdot3\cdot x\sin60^\circ=1.5x\sin60^\circ$.`,
          String.raw`$S_{ABC}=S_{ABD}+S_{ADC}$: $9\sin60^\circ=4.5x\sin60^\circ$, ולכן $x=2$.`,
        ],
        finalAnswer: String.raw`$AD=2$`,
        answers: [{ label: String.raw`$AD$`, value: 2 }],
      },
      {
        id: 'trig-triangle-area-8',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ נתון $AB=10$, $AC=8$ ו-$\angle BAC=50^\circ$. הנקודה $D$ על $AB$ כך ש-$AD:DB=2:3$, והנקודה $E$ היא אמצע $AC$ (ראו שרטוט).

א. מצאו את היחס $S_{ADE}:S_{ABC}$.

ב. חשבו את שטח המרובע $DBCE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,199.7 290.0,199.7 163.7,40.3" />
  <line x1="134.0" y1="199.7" x2="96.8" y2="120.0" />
  <polygon points="134.0,199.7 290.0,199.7 163.7,40.3 96.8,120.0" fill="currentColor" fill-opacity="0.15" stroke="none" />
  <path d="M 52.0,199.7 A 22 22 0 0 0 44.1,182.8" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="67.2" y="187.3" font-size="14" text-anchor="middle">50°</text>
    <text x="16.1" y="211.3" text-anchor="middle">A</text>
    <text x="303.9" y="211.4" text-anchor="middle">B</text>
    <text x="164.0" y="31.3" text-anchor="middle">C</text>
    <text x="134.0" y="221.7" text-anchor="middle">D</text>
    <text x="83.0" y="120.3" text-anchor="middle">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`לשני המשולשים הזווית $A$ משותפת: $\frac{S_{ADE}}{S_{ABC}}=\frac{\frac12\cdot AD\cdot AE\sin A}{\frac12\cdot AB\cdot AC\sin A}$.`,
          String.raw`$AD=4$, $AE=4$. שטח המרובע = שטח המשולש $ABC$ פחות שטח המשולש $ADE$.`,
        ],
        solutionSteps: [
          String.raw`$AD=\frac25\cdot10=4$ ו-$AE=\frac12\cdot8=4$.`,
          String.raw`א. לשני המשולשים הזווית $A$ משותפת, ולכן $\frac{S_{ADE}}{S_{ABC}}=\frac{\frac12\cdot AD\cdot AE\sin A}{\frac12\cdot AB\cdot AC\sin A}=\frac{4\cdot4}{10\cdot8}=\frac15$.`,
          String.raw`ב. $S_{ABC}=\frac12\cdot10\cdot8\sin50^\circ=40\sin50^\circ\approx30.64$.`,
          String.raw`$S_{DBCE}=S_{ABC}-S_{ADE}=\frac45S_{ABC}=32\sin50^\circ\approx24.51$.`,
        ],
        finalAnswer: String.raw`א. $1:5$. ב. $S_{DBCE}=32\sin50^\circ\approx24.51$`,
        answers: [
          { label: String.raw`$\frac{S_{ADE}}{S_{ABC}}$`, value: 0.2 },
          { label: String.raw`$S_{DBCE}$`, value: 24.513422179807296 },
        ],
      },
    ],
  },
  'trig-laws-level-b': {
    intro: String.raw`ברמה ב׳ הנתונים כוללים **פרמטר** – אורך $a$ וזווית $\alpha$ – והשאלה מתחילה ב״הביעו באמצעות $a$ ו-$\alpha$ את…״. עובדים בדיוק כמו עם מספרים: מבטאים זוויות באמצעות $\alpha$ (סכום זוויות, זוויות מתחלפות, חוצה זווית), מפעילים את משפט הסינוסים, משפט הקוסינוסים או משולש ישר זווית, ומפשטים בעזרת הזהויות. בסעיף הבא בדרך כלל נתון קשר נוסף (שני קטעים שווים, יחס, ערך מספרי), שמוביל ל**משוואה טריגונומטרית** ב-$\alpha$ – וכך נראית כמעט כל שאלה 5 בבגרות.`,
    keyFacts: [
      String.raw`**שלב 1 – זוויות**: לפני כל חישוב כותבים את כל הזוויות בשרטוט באמצעות $\alpha$ (סכום זוויות במשולש, זוויות בסיס במשולש שווה-שוקיים, זוויות מתחלפות, $180^\circ-\alpha$ לזווית צמודה).`,
      String.raw`**שלב 2 – בחירת משולש וכלי**: משולש ישר זווית – $\sin$, $\cos$, $\tan$; שתי זוויות וצלע – משפט הסינוסים; שתי צלעות והזווית ביניהן – משפט הקוסינוסים.`,
      String.raw`**שלב 3 – פישוט**: $\sin2\alpha=2\sin\alpha\cos\alpha$ (למשל $\frac{\sin2\alpha}{\sin\alpha}=2\cos\alpha$), $1-\cos\alpha=2\sin^2\frac\alpha2$, $1+\cos\alpha=2\cos^2\frac\alpha2$, $\sin(180^\circ-x)=\sin x$, $\cos(180^\circ-x)=-\cos x$.`,
      String.raw`**שלב 4 – נתון נוסף**: משווים את הביטויים ופותרים משוואה ב-$\alpha$; בודקים שהפתרון מתאים לתחום (למשל $3\alpha<180^\circ$, $\alpha$ חדה).`,
      String.raw`**בדיקה מהירה**: מציבים ערך נוח (למשל $\alpha=60^\circ$ או $\alpha=90^\circ$) ובודקים שהביטוי שקיבלתם נותן תוצאה הגיונית.`,
    ],
    exercises: [
      {
        id: 'trig-laws-level-b-1',
        difficulty: 1,
        statement: String.raw`במשולש שווה-השוקיים $ABC$ השוקיים הן $AB=AC=a$ וזווית הראש $\angle BAC=\alpha$ (ראו שרטוט).

א. הביעו באמצעות $a$ ו-$\alpha$ את אורך הבסיס $BC$ ואת שטח המשולש.

ב. חשבו את הבסיס ואת השטח עבור $a=10$ ו-$\alpha=50^\circ$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160.0,30.0 76.1,210.0 243.9,210.0" />
  <path d="M 147.3,57.2 A 30 30 0 0 0 172.7,57.2" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="160.0" y="76.0" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="107.2" y="119.9" font-size="16" text-anchor="middle" font-style="italic">a</text>
    <text x="212.8" y="119.9" font-size="16" text-anchor="middle" font-style="italic">a</text>
    <text x="160.0" y="21.0" text-anchor="middle">A</text>
    <text x="63.9" y="224.7" text-anchor="middle">B</text>
    <text x="256.1" y="224.7" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`הגובה לבסיס חוצה את זווית הראש ואת הבסיס; במשולש ישר הזווית שנוצר הזווית ב-$A$ היא $\frac\alpha2$.`,
          String.raw`לשטח: $S=\frac12\cdot AB\cdot AC\sin\alpha$.`,
        ],
        solutionSteps: [
          String.raw`א. הגובה $AD$ לבסיס הוא גם חוצה זווית הראש וגם תיכון, ולכן במשולש ישר הזווית $ABD$: $BD=a\sin\frac\alpha2$, ו-$BC=2a\sin\frac\alpha2$.`,
          String.raw`(אותו ביטוי מתקבל ממשפט הקוסינוסים: $BC^2=2a^2-2a^2\cos\alpha=2a^2(1-\cos\alpha)=4a^2\sin^2\frac\alpha2$.)`,
          String.raw`שטח: $S=\frac12\cdot a\cdot a\sin\alpha=\frac12a^2\sin\alpha$.`,
          String.raw`ב. $BC=20\sin25^\circ\approx8.45$ ו-$S=\frac12\cdot100\sin50^\circ=50\sin50^\circ\approx38.30$.`,
        ],
        finalAnswer: String.raw`א. $BC=2a\sin\frac\alpha2$, $S=\frac12a^2\sin\alpha$. ב. $BC\approx8.45$, $S\approx38.30$.`,
        answers: [
          { label: String.raw`$BC$ (סעיף ב)`, value: 8.452365234813989 },
          { label: String.raw`שטח (סעיף ב)`, value: 38.302222155948904 },
        ],
      },
      {
        id: 'trig-laws-level-b-2',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ נתון $AC=b$, $\angle A=\alpha$ ו-$\angle B=45^\circ$ (ראו שרטוט).

א. הביעו באמצעות $b$ ו-$\alpha$ את אורכי הצלעות $BC$ ו-$AB$.

ב. חשבו אותם עבור $b=8$ ו-$\alpha=70^\circ$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="85.3,210.0 150.8,30.0 234.7,210.0" />
  <path d="M 111.3,210.0 A 26 26 0 0 0 94.2,185.6" stroke-width="1.2" />
  <path d="M 141.9,54.4 A 26 26 0 0 0 161.8,53.6" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="115.6" y="193.8" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="153.0" y="85.0" font-size="14" text-anchor="middle">45°</text>
    <text x="160.0" y="227.0" font-size="16" text-anchor="middle" font-style="italic">b</text>
    <text x="73.8" y="225.6" text-anchor="middle">A</text>
    <text x="150.0" y="21.0" text-anchor="middle">B</text>
    <text x="246.6" y="225.2" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`הביעו את $\angle C$ באמצעות $\alpha$: $\angle C=135^\circ-\alpha$.`,
          String.raw`לפי משפט הסינוסים: $\frac{BC}{\sin\alpha}=\frac{AB}{\sin C}=\frac{b}{\sin45^\circ}$.`,
        ],
        solutionSteps: [
          String.raw`א. סכום הזוויות במשולש: $\angle C=180^\circ-45^\circ-\alpha=135^\circ-\alpha$.`,
          String.raw`לפי משפט הסינוסים: $\frac{BC}{\sin\alpha}=\frac{b}{\sin45^\circ}$, ולכן $BC=\frac{b\sin\alpha}{\sin45^\circ}=\sqrt2\,b\sin\alpha$.`,
          String.raw`באותו אופן: $AB=\frac{b\sin(135^\circ-\alpha)}{\sin45^\circ}=\sqrt2\,b\sin(135^\circ-\alpha)$.`,
          String.raw`ב. $BC=8\sqrt2\sin70^\circ\approx10.63$ ו-$AB=8\sqrt2\sin65^\circ\approx10.25$.`,
        ],
        finalAnswer: String.raw`א. $BC=\sqrt2\,b\sin\alpha$, $AB=\sqrt2\,b\sin(135^\circ-\alpha)$. ב. $BC\approx10.63$, $AB\approx10.25$.`,
        answers: [
          { label: String.raw`$BC$ (סעיף ב)`, value: 10.631408390218795 },
          { label: String.raw`$AB$ (סעיף ב)`, value: 10.253702112892617 },
        ],
      },
      {
        id: 'trig-laws-level-b-3',
        difficulty: 2,
        statement: String.raw`צלע המעוין $ABCD$ היא $a$, וזוויתו החדה היא $\angle DAB=\alpha$ (ראו שרטוט).

א. הביעו באמצעות $a$ ו-$\alpha$ את אורכי האלכסונים $AC$ ו-$BD$.

ב. נתון שהאלכסון הארוך גדול פי 2 מהקצר. מצאו את $\alpha$.

ג. נתון גם $a=5$. חשבו את אורכי האלכסונים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,185.0 192.5,185.0 290.0,55.0 127.5,55.0" />
  <line x1="30.0" y1="185.0" x2="290.0" y2="55.0" stroke-width="1.5" />
  <line x1="192.5" y1="185.0" x2="127.5" y2="55.0" stroke-width="1.5" />
  <polyline points="168.0,116.0 172.1,124.0 164.0,128.0" stroke-width="1" />
  <path d="M 60.0,185.0 A 30 30 0 0 0 48.0,161.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="75.4" y="178.3" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="111.3" y="202.0" font-size="16" text-anchor="middle" font-style="italic">a</text>
    <text x="16.6" y="197.7" text-anchor="middle">A</text>
    <text x="199.2" y="204.4" text-anchor="middle">B</text>
    <text x="303.4" y="54.3" text-anchor="middle">C</text>
    <text x="120.8" y="47.6" text-anchor="middle">D</text>
    <text x="146.0" y="122.0" text-anchor="middle">O</text>
  </g>
</svg>`,
        hints: [
          String.raw`האלכסונים מאונכים וחוצים את זוויות המעוין: במשולש ישר הזווית $AOB$ הזווית ב-$A$ היא $\frac\alpha2$.`,
          String.raw`$\frac{AC}{BD}=\frac{\cos\frac\alpha2}{\sin\frac\alpha2}=\frac{1}{\tan\frac\alpha2}$.`,
        ],
        solutionSteps: [
          String.raw`א. במעוין האלכסונים מאונכים, חוצים זה את זה וחוצים את הזוויות. במשולש ישר הזווית $AOB$ ($O$ – מפגש האלכסונים): $\angle OAB=\frac\alpha2$, $AO=a\cos\frac\alpha2$, $BO=a\sin\frac\alpha2$.`,
          String.raw`לכן $AC=2a\cos\frac\alpha2$ ו-$BD=2a\sin\frac\alpha2$ ($AC$ הארוך, כי $\frac\alpha2<45^\circ$).`,
          String.raw`ב. $\frac{AC}{BD}=\frac{\cos\frac\alpha2}{\sin\frac\alpha2}=2$, ולכן $\tan\frac\alpha2=\frac12$, $\frac\alpha2\approx26.57^\circ$ ו-$\alpha\approx53.13^\circ$.`,
          String.raw`ג. מ-$\tan\frac\alpha2=\frac12$ (חדה): $\cos\frac\alpha2=\frac{2}{\sqrt5}$, $\sin\frac\alpha2=\frac{1}{\sqrt5}$. לכן $AC=10\cdot\frac{2}{\sqrt5}=4\sqrt5\approx8.94$ ו-$BD=2\sqrt5\approx4.47$.`,
        ],
        finalAnswer: String.raw`א. $AC=2a\cos\frac\alpha2$, $BD=2a\sin\frac\alpha2$. ב. $\alpha\approx53.13^\circ$. ג. $AC=4\sqrt5\approx8.94$, $BD=2\sqrt5\approx4.47$.`,
        answers: [
          { label: String.raw`$\alpha$`, value: 53.13010235415598 },
          { label: String.raw`$AC$ (סעיף ג)`, value: 8.94427190999916 },
          { label: String.raw`$BD$ (סעיף ג)`, value: 4.47213595499958 },
        ],
      },
      {
        id: 'trig-laws-level-b-4',
        difficulty: 2,
        statement: String.raw`המשולש $ABC$ חסום במעגל שרדיוסו $R$. נתון $\angle A=\alpha$ ו-$\angle B=2\alpha$ (ראו שרטוט).

א. הביעו באמצעות $R$ ו-$\alpha$ את אורכי שלוש הצלעות.

ב. נתון $R=6$ ו-$BC=6$. מצאו את $\alpha$, וחשבו את $AC$ ואת $AB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="90.0" stroke-width="1" />
  <polygon points="244.6,89.2 102.1,188.9 175.6,208.6" />
  <line x1="160.0" y1="120.0" x2="244.6" y2="89.2" stroke-width="1.5" stroke-dasharray="5 3" />
  <path d="M 216.7,108.7 A 34 34 0 0 0 227.6,118.7" stroke-width="1.2" />
  <path d="M 125.3,195.2 A 24 24 0 0 0 121.8,175.2" stroke-width="1.2" />
  <circle cx="160.0" cy="120.0" r="2.5" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="214.2" y="127.4" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="137.6" y="187.7" font-size="14" text-anchor="middle">2α</text>
    <text x="198.9" y="100.2" font-size="16" text-anchor="middle" font-style="italic">R</text>
    <text x="258.7" y="90.1" text-anchor="middle">A</text>
    <text x="92.5" y="206.4" text-anchor="middle">B</text>
    <text x="178.2" y="229.4" text-anchor="middle">C</text>
    <text x="156.0" y="142.0" text-anchor="middle">O</text>
  </g>
</svg>`,
        hints: [
          String.raw`לפי משפט הסינוסים כל צלע שווה ל-$2R$ כפול הסינוס של הזווית שמולה; $\angle C=180^\circ-3\alpha$.`,
          String.raw`$\sin(180^\circ-3\alpha)=\sin3\alpha$.`,
          String.raw`בסעיף ב: $\sin\alpha=\frac12$; זכרו ש-$3\alpha<180^\circ$.`,
        ],
        solutionSteps: [
          String.raw`א. $\angle C=180^\circ-3\alpha$. לפי משפט הסינוסים: $BC=2R\sin\alpha$, $AC=2R\sin2\alpha$, $AB=2R\sin(180^\circ-3\alpha)=2R\sin3\alpha$.`,
          String.raw`ב. $BC=2R\sin\alpha$: $6=12\sin\alpha$, ולכן $\sin\alpha=\frac12$ ו-$\alpha=30^\circ$ או $150^\circ$.`,
          String.raw`סכום הזוויות $\alpha+2\alpha<180^\circ$, כלומר $\alpha<60^\circ$, ולכן $\alpha=30^\circ$.`,
          String.raw`$AC=12\sin60^\circ=6\sqrt3\approx10.39$ ו-$AB=12\sin90^\circ=12$ (המשולש ישר זווית ב-$C$, ו-$AB$ קוטר).`,
        ],
        finalAnswer: String.raw`א. $BC=2R\sin\alpha$, $AC=2R\sin2\alpha$, $AB=2R\sin3\alpha$. ב. $\alpha=30^\circ$, $AC=6\sqrt3\approx10.39$, $AB=12$.`,
        answers: [
          { label: String.raw`$\alpha$`, value: 30 },
          { label: String.raw`$AC$`, value: 10.392304845413264 },
          { label: String.raw`$AB$`, value: 12 },
        ],
      },
      {
        id: 'trig-laws-level-b-5',
        difficulty: 2,
        statement: String.raw`במשולש ישר הזווית $ABC$ ($\angle ACB=90^\circ$) נתון $AC=m$ ו-$\angle BAC=2\alpha$. $AD$ חוצה את הזווית $BAC$, ו-$D$ על $BC$ (ראו שרטוט).

א. הביעו באמצעות $m$ ו-$\alpha$ את $AD$, את $CD$ ואת $BD$.

ב. חשבו את $BD$ ואת $AD$ עבור $m=6$ ו-$\alpha=20^\circ$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="267.3,210.0 52.7,30.0 52.7,210.0" />
  <line x1="267.3" y1="210.0" x2="52.7" y2="131.9" />
  <polyline points="61.7,210.0 61.7,201.0 52.7,201.0" stroke-width="1" />
  <path d="M 209.3,210.0 A 58 58 0 0 1 212.8,190.2" stroke-width="1.2" />
  <path d="M 212.8,190.2 A 58 58 0 0 1 222.8,172.7" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="196.4" y="202.5" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="204.9" y="179.0" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="160.0" y="227.0" font-size="16" text-anchor="middle" font-style="italic">m</text>
    <text x="281.1" y="221.8" text-anchor="middle">A</text>
    <text x="45.1" y="23.1" text-anchor="middle">B</text>
    <text x="41.3" y="225.6" text-anchor="middle">C</text>
    <text x="38.2" y="134.2" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`במשולש ישר הזווית $ACD$ הזווית ב-$A$ היא $\alpha$, והניצב שליד הוא $m$.`,
          String.raw`במשולש ישר הזווית $ACB$: $BC=m\tan2\alpha$, ו-$BD=BC-CD$.`,
        ],
        solutionSteps: [
          String.raw`א. $AD$ חוצה את $\angle BAC=2\alpha$, ולכן $\angle CAD=\alpha$. במשולש ישר הזווית $ACD$: $\cos\alpha=\frac{m}{AD}$, ולכן $AD=\frac{m}{\cos\alpha}$; ו-$CD=m\tan\alpha$.`,
          String.raw`במשולש ישר הזווית $ACB$: $BC=m\tan2\alpha$.`,
          String.raw`$BD=BC-CD=m(\tan2\alpha-\tan\alpha)$.`,
          String.raw`ב. $BD=6(\tan40^\circ-\tan20^\circ)\approx6(0.8391-0.3640)\approx2.85$ ו-$AD=\frac{6}{\cos20^\circ}\approx6.39$.`,
        ],
        finalAnswer: String.raw`א. $AD=\frac{m}{\cos\alpha}$, $CD=m\tan\alpha$, $BD=m(\tan2\alpha-\tan\alpha)$. ב. $BD\approx2.85$, $AD\approx6.39$.`,
        answers: [
          { label: String.raw`$BD$`, value: 2.8507763814664653 },
          { label: String.raw`$AD$`, value: 6.385066634855472 },
        ],
      },
      {
        id: 'trig-laws-level-b-6',
        difficulty: 2,
        statement: String.raw`בטרפז שווה-השוקיים $ABCD$ ($AB\parallel DC$) שלוש צלעות שוות: $AD=DC=CB=a$, וזווית הבסיס היא $\angle DAB=\alpha$ (ראו שרטוט).

א. הביעו באמצעות $a$ ו-$\alpha$ את הבסיס $AB$ ואת האלכסון $AC$.

ב. נתון $AC=a\sqrt3$. מצאו את $\alpha$.

ג. נתון גם $a=4$. חשבו את שטח הטרפז.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,192.5 290.0,192.5 237.2,47.5 82.8,47.5" />
  <line x1="30.0" y1="192.5" x2="237.2" y2="47.5" stroke-width="1.5" />
  <path d="M 52.0,192.5 A 22 22 0 0 0 37.5,171.9" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="61.9" y="184.0" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="45.1" y="120.9" font-size="16" text-anchor="middle" font-style="italic">a</text>
    <text x="160.0" y="40.5" font-size="16" text-anchor="middle" font-style="italic">a</text>
    <text x="274.9" y="120.9" font-size="16" text-anchor="middle" font-style="italic">a</text>
    <text x="16.9" y="205.8" text-anchor="middle">A</text>
    <text x="303.1" y="205.8" text-anchor="middle">B</text>
    <text x="248.1" y="43.2" text-anchor="middle">C</text>
    <text x="71.9" y="43.2" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`הגבהים מ-$D$ ומ-$C$ חותכים מהבסיס $AB$ שני קטעים של $a\cos\alpha$.`,
          String.raw`במשולש $ADC$: $\angle ADC=180^\circ-\alpha$ (זוויות חד-צדדיות בין מקבילים). השתמשו במשפט הקוסינוסים וב-$\cos(180^\circ-\alpha)=-\cos\alpha$.`,
          String.raw`$1+\cos\alpha=2\cos^2\frac\alpha2$.`,
        ],
        solutionSteps: [
          String.raw`א. נוריד גבהים מ-$D$ ומ-$C$ לבסיס $AB$; בכל אחד מהמשולשים ישרי הזווית שנוצרים ההיטל של השוק הוא $a\cos\alpha$. לכן $AB=a+2a\cos\alpha$.`,
          String.raw`$DC\parallel AB$, ולכן $\angle ADC=180^\circ-\alpha$. לפי משפט הקוסינוסים במשולש $ADC$: $AC^2=a^2+a^2-2a^2\cos(180^\circ-\alpha)=2a^2(1+\cos\alpha)$.`,
          String.raw`לפי $1+\cos\alpha=2\cos^2\frac\alpha2$: $AC^2=4a^2\cos^2\frac\alpha2$, ולכן $AC=2a\cos\frac\alpha2$.`,
          String.raw`ב. $2a\cos\frac\alpha2=a\sqrt3$, ולכן $\cos\frac\alpha2=\frac{\sqrt3}{2}$ ו-$\frac\alpha2=30^\circ$: $\alpha=60^\circ$.`,
          String.raw`ג. $AB=4+8\cos60^\circ=8$, הגובה $a\sin60^\circ=2\sqrt3$, והשטח $\frac{8+4}{2}\cdot2\sqrt3=12\sqrt3\approx20.78$.`,
        ],
        finalAnswer: String.raw`א. $AB=a(1+2\cos\alpha)$, $AC=2a\cos\frac\alpha2$. ב. $\alpha=60^\circ$. ג. $12\sqrt3\approx20.78$.`,
        answers: [
          { label: String.raw`$\alpha$`, value: 60 },
          { label: String.raw`שטח הטרפז`, value: 20.784609690826528 },
        ],
      },
      {
        id: 'trig-laws-level-b-7',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ נתון $\angle ABC=\alpha$ ו-$\angle ACB=2\alpha$ (ראו שרטוט).

א. הוכיחו כי $AB=2AC\cos\alpha$.

ב. נתון $AB=1.6\,AC$. מצאו את $\alpha$.

ג. נתון גם $AC=10$. חשבו את $BC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="243.3,40.0 30.0,200.0 290.0,200.0" />
  <path d="M 66.0,200.0 A 36 36 0 0 0 58.8,178.4" stroke-width="1.2" />
  <path d="M 282.7,175.0 A 26 26 0 0 0 264.0,200.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="74.6" y="190.1" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="258.0" y="181.0" font-size="14" text-anchor="middle">2α</text>
    <text x="250.3" y="32.7" text-anchor="middle">A</text>
    <text x="15.8" y="210.8" text-anchor="middle">B</text>
    <text x="303.3" y="212.9" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`$AB$ נמצאת מול הזווית $2\alpha$ ו-$AC$ מול הזווית $\alpha$; השתמשו במשפט הסינוסים ובזהות $\sin2\alpha=2\sin\alpha\cos\alpha$.`,
          String.raw`$BC$ נמצאת מול $\angle A=180^\circ-3\alpha$, ו-$\sin(180^\circ-3\alpha)=\sin3\alpha$.`,
          String.raw`$\frac{\sin3\alpha}{\sin\alpha}=3-4\sin^2\alpha$ (מהזהות $\sin3\alpha=3\sin\alpha-4\sin^3\alpha$).`,
        ],
        solutionSteps: [
          String.raw`א. לפי משפט הסינוסים: $\frac{AB}{\sin2\alpha}=\frac{AC}{\sin\alpha}$, ולכן $AB=AC\cdot\frac{\sin2\alpha}{\sin\alpha}=AC\cdot\frac{2\sin\alpha\cos\alpha}{\sin\alpha}=2AC\cos\alpha$.`,
          String.raw`ב. $2AC\cos\alpha=1.6AC$, ולכן $\cos\alpha=0.8$ ו-$\alpha\approx36.87^\circ$ (ואכן $3\alpha<180^\circ$).`,
          String.raw`ג. $\angle A=180^\circ-3\alpha$, ולפי משפט הסינוסים: $BC=AC\cdot\frac{\sin(180^\circ-3\alpha)}{\sin\alpha}=AC\cdot\frac{\sin3\alpha}{\sin\alpha}$.`,
          String.raw`לפי $\sin3\alpha=3\sin\alpha-4\sin^3\alpha$: $\frac{\sin3\alpha}{\sin\alpha}=3-4\sin^2\alpha$. מ-$\cos\alpha=0.8$ מתקבל $\sin^2\alpha=0.36$.`,
          String.raw`$BC=10\cdot(3-4\cdot0.36)=10\cdot1.56=15.6$.`,
        ],
        finalAnswer: String.raw`ב. $\cos\alpha=0.8$, $\alpha\approx36.87^\circ$. ג. $BC=15.6$.`,
        answers: [
          { label: String.raw`$\alpha$`, value: 36.86989764584401 },
          { label: String.raw`$BC$`, value: 15.6 },
        ],
      },
      {
        id: 'trig-laws-level-b-8',
        difficulty: 3,
        statement: String.raw`במשולש שווה-השוקיים $ABC$ נתון $AB=AC=a$ ו-$\angle BAC=\alpha$ ($\alpha<60^\circ$). הנקודה $D$ על השוק $AC$ כך ש-$BD=BC$ (ראו שרטוט).

א. הביעו באמצעות $\alpha$ את הזווית $DBC$.

ב. הביעו באמצעות $a$ ו-$\alpha$ את $BC$ ואת $CD$.

ג. נתון $a=10$ ו-$AD=CD$. מצאו את $\alpha$ ואת $BC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160.0,30.0 92.0,210.0 228.0,210.0" />
  <line x1="92.0" y1="210.0" x2="194.0" y2="120.0" />
  <path d="M 148.0,61.8 A 34 34 0 0 0 172.0,61.8" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="160.0" y="80.0" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="114.8" y="120.8" font-size="16" text-anchor="middle" font-style="italic">a</text>
    <text x="160.0" y="21.0" text-anchor="middle">A</text>
    <text x="80.7" y="225.9" text-anchor="middle">B</text>
    <text x="239.3" y="225.9" text-anchor="middle">C</text>
    <text x="205.3" y="116.1" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`זוויות הבסיס של $ABC$ הן $90^\circ-\frac\alpha2$. גם המשולש $BCD$ שווה-שוקיים ($BD=BC$), ולכן $\angle BDC=\angle C$.`,
          String.raw`$BC=2a\sin\frac\alpha2$, ובמשולש $BCD$ (זווית ראש $\alpha$) גם $CD=2\,BC\sin\frac\alpha2$.`,
          String.raw`$AD=CD$ פירושו $CD=\frac a2$; השתמשו ב-$2\sin^2\frac\alpha2=1-\cos\alpha$.`,
        ],
        solutionSteps: [
          String.raw`א. במשולש שווה-השוקיים $ABC$: $\angle ACB=\frac{180^\circ-\alpha}{2}=90^\circ-\frac\alpha2$. במשולש $BCD$: $BD=BC$, ולכן $\angle BDC=\angle BCD=90^\circ-\frac\alpha2$, ו-$\angle DBC=180^\circ-2\left(90^\circ-\frac\alpha2\right)=\alpha$.`,
          String.raw`ב. הגובה מ-$A$ לבסיס חוצה את זווית הראש: $BC=2a\sin\frac\alpha2$.`,
          String.raw`המשולש $BCD$ שווה-שוקיים עם שוקיים $BC$ וזווית ראש $\alpha$, ולכן באותו אופן $CD=2\,BC\sin\frac\alpha2=4a\sin^2\frac\alpha2=2a(1-\cos\alpha)$.`,
          String.raw`ג. $AD=CD$ ו-$AD+CD=AC=10$, ולכן $CD=5$: $20(1-\cos\alpha)=5$, כלומר $\cos\alpha=\frac34$ ו-$\alpha\approx41.41^\circ$ (קטנה מ-$60^\circ$, כנדרש).`,
          String.raw`$\sin^2\frac\alpha2=\frac{1-\cos\alpha}{2}=\frac18$, ולכן $BC=20\sin\frac\alpha2=20\cdot\frac{1}{2\sqrt2}=5\sqrt2\approx7.07$.`,
        ],
        finalAnswer: String.raw`א. $\angle DBC=\alpha$. ב. $BC=2a\sin\frac\alpha2$, $CD=4a\sin^2\frac\alpha2=2a(1-\cos\alpha)$. ג. $\alpha\approx41.41^\circ$, $BC=5\sqrt2\approx7.07$.`,
        answers: [
          { label: String.raw`$\alpha$`, value: 41.40962210927086 },
          { label: String.raw`$BC$`, value: 7.0710678118654755 },
        ],
      },
    ],
  },
  'trig-proof-review': {
    intro: String.raw`בשאלה 5 מופיע לעתים קרובות סעיף ״הוכיחו ש…״: קשר בין צלעות, ביטוי לשטח או נוסחה לקטע (תיכון, חוצה זווית, גובה). ההוכחה נבנית מאותם כלים – משפט הסינוסים, משפט הקוסינוסים, נוסחת השטח והזהויות – ונכתבת בשרשרת של שוויונות שכל אחד מהם מנומק. כאן מתרגלים הוכחות כאלה, ובכל תרגיל יש גם סעיף חישובי שמשתמש בתוצאה – כמו בבגרות.`,
    keyFacts: [
      String.raw`**מבנה הוכחה**: מתחילים מאגף אחד, ובכל מעבר כותבים את הנימוק (״לפי משפט הסינוסים במשולש…״, ״לפי זהות הזווית הכפולה…״) עד שמגיעים לאגף השני. לא מתחילים מהטענה שצריך להוכיח.`,
      String.raw`**זוויות צמודות** (למשל משני צדי תיכון או בנקודה על צלע): $\cos(180^\circ-x)=-\cos x$ ו-$\sin(180^\circ-x)=\sin x$ – כך ״מחברים״ שני משולשים.`,
      String.raw`**משפט הסינוסים להחלפת צלעות בסינוסים**: $a=2R\sin\alpha$ וכו'. כך יחס בין צלעות הופך ליחס בין סינוסים, ואז משתמשים בזהויות.`,
      String.raw`**פירוק שטח**: $S_{ABC}=S_{ABD}+S_{ADC}$ – הדרך הקצרה להוכיח נוסחאות לחוצה זווית או לקטע מקודקוד.`,
      String.raw`**בדיקה מספרית**: אחרי ההוכחה מציבים ערכים ובודקים – זה גם הסעיף החישובי שבדרך כלל בא אחריה.`,
    ],
    exercises: [
      {
        id: 'trig-proof-review-1',
        difficulty: 2,
        statement: String.raw`$ABCD$ מקבילית (ראו שרטוט).

א. הוכיחו כי $AC^2+BD^2=2\left(AB^2+AD^2\right)$ – סכום ריבועי האלכסונים שווה לסכום ריבועי הצלעות.

ב. במקבילית נתון $AB=5$, $AD=7$ ו-$BD=6$. חשבו את $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,206.8 177.7,206.8 290.0,33.2 142.3,33.2" />
  <line x1="30.0" y1="206.8" x2="290.0" y2="33.2" stroke-width="1.5" />
  <line x1="177.7" y1="206.8" x2="142.3" y2="33.2" stroke-width="1.5" />
  <path d="M 48.0,206.8 A 18 18 0 0 0 39.8,191.7" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="17.5" y="221.2" text-anchor="middle">A</text>
    <text x="180.7" y="227.5" text-anchor="middle">B</text>
    <text x="302.5" y="30.8" text-anchor="middle">C</text>
    <text x="139.3" y="24.5" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`סמנו $\angle DAB=\alpha$; אז $\angle ABC=180^\circ-\alpha$ (זוויות סמוכות במקבילית) ו-$BC=AD$.`,
          String.raw`כתבו את משפט הקוסינוסים ל-$BD$ במשולש $ABD$ ול-$AC$ במשולש $ABC$, וחברו.`,
        ],
        solutionSteps: [
          String.raw`א. נסמן $AB=a$, $AD=b$, $\angle DAB=\alpha$. במקבילית $BC=AD=b$ וזוויות סמוכות משלימות ל-$180^\circ$: $\angle ABC=180^\circ-\alpha$.`,
          String.raw`לפי משפט הקוסינוסים במשולש $ABD$: $BD^2=a^2+b^2-2ab\cos\alpha$.`,
          String.raw`לפי משפט הקוסינוסים במשולש $ABC$: $AC^2=a^2+b^2-2ab\cos(180^\circ-\alpha)=a^2+b^2+2ab\cos\alpha$.`,
          String.raw`מחברים: $AC^2+BD^2=2a^2+2b^2=2\left(AB^2+AD^2\right)$, כנדרש.`,
          String.raw`ב. $AC^2=2(25+49)-36=112$, ולכן $AC=\sqrt{112}=4\sqrt7\approx10.58$.`,
        ],
        finalAnswer: String.raw`ב. $AC=4\sqrt7\approx10.58$`,
        answers: [{ label: String.raw`$AC$`, value: 10.583005244258363 }],
      },
      {
        id: 'trig-proof-review-2',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נסמן $BC=a$ ואת הזוויות $\angle A$, $\angle B$, $\angle C$.

א. הוכיחו כי שטח המשולש הוא $S=\dfrac{a^2\sin B\sin C}{2\sin A}$.

ב. חשבו את שטח המשולש כאשר $a=10$, $\angle B=50^\circ$ ו-$\angle C=70^\circ$.`,
        hints: [
          String.raw`התחילו מ-$S=\frac12\cdot BC\cdot AC\cdot\sin C$.`,
          String.raw`הביעו את $AC$ באמצעות $a$ בעזרת משפט הסינוסים: $\frac{AC}{\sin B}=\frac{a}{\sin A}$.`,
        ],
        solutionSteps: [
          String.raw`א. לפי נוסחת השטח עם הזווית $C$ הכלואה בין $BC$ ל-$AC$: $S=\frac12\cdot a\cdot AC\cdot\sin C$.`,
          String.raw`לפי משפט הסינוסים: $\frac{AC}{\sin B}=\frac{a}{\sin A}$, ולכן $AC=\frac{a\sin B}{\sin A}$.`,
          String.raw`מציבים: $S=\frac12\cdot a\cdot\frac{a\sin B}{\sin A}\cdot\sin C=\frac{a^2\sin B\sin C}{2\sin A}$, כנדרש.`,
          String.raw`ב. $\angle A=180^\circ-50^\circ-70^\circ=60^\circ$, ולכן $S=\frac{100\sin50^\circ\sin70^\circ}{2\sin60^\circ}\approx\frac{100\cdot0.7660\cdot0.9397}{1.7321}\approx41.56$.`,
        ],
        finalAnswer: String.raw`ב. $S\approx41.56$`,
        answers: [{ label: String.raw`שטח המשולש`, value: 41.5603461080531 }],
      },
      {
        id: 'trig-proof-review-3',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נסמן $BC=a$, $AC=b$, $AB=c$. $AM$ הוא התיכון לצלע $BC$ (ראו שרטוט).

א. הוכיחו כי $AM^2=\dfrac{2b^2+2c^2-a^2}{4}$.

ב. חשבו את אורך התיכון כאשר $a=8$, $b=7$, $c=5$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="111.3,49.6 30.0,190.4 290.0,190.4" />
  <line x1="111.3" y1="49.6" x2="160.0" y2="190.4" />
  <path d="M 154.8,175.2 A 16 16 0 0 0 144.0,190.4" stroke-width="1.2" />
  <path d="M 180.0,190.4 A 20 20 0 0 0 153.5,171.5" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="137.2" y="179.1" font-size="14" text-anchor="middle" font-style="italic">φ</text>
    <text x="60.2" y="119.0" font-size="16" text-anchor="middle" font-style="italic">c</text>
    <text x="208.0" y="115.6" font-size="16" text-anchor="middle" font-style="italic">b</text>
    <text x="106.3" y="41.5" text-anchor="middle">A</text>
    <text x="16.1" y="202.1" text-anchor="middle">B</text>
    <text x="304.3" y="200.9" text-anchor="middle">C</text>
    <text x="160.0" y="212.4" text-anchor="middle">M</text>
  </g>
</svg>`,
        hints: [
          String.raw`סמנו $\angle AMB=\varphi$; אז $\angle AMC=180^\circ-\varphi$ (זוויות צמודות), ו-$BM=MC=\frac a2$.`,
          String.raw`כתבו את משפט הקוסינוסים ל-$c$ במשולש $ABM$ ול-$b$ במשולש $ACM$, וחברו – האיברים עם $\cos\varphi$ מתבטלים.`,
        ],
        solutionSteps: [
          String.raw`א. נסמן $AM=m$ ו-$\angle AMB=\varphi$. $M$ אמצע $BC$, ולכן $BM=MC=\frac a2$; והזווית $\angle AMC=180^\circ-\varphi$ (זוויות צמודות).`,
          String.raw`לפי משפט הקוסינוסים במשולש $ABM$: $c^2=m^2+\frac{a^2}{4}-am\cos\varphi$.`,
          String.raw`לפי משפט הקוסינוסים במשולש $ACM$: $b^2=m^2+\frac{a^2}{4}-am\cos(180^\circ-\varphi)=m^2+\frac{a^2}{4}+am\cos\varphi$.`,
          String.raw`מחברים: $b^2+c^2=2m^2+\frac{a^2}{2}$, ולכן $m^2=\frac{2b^2+2c^2-a^2}{4}$, כנדרש.`,
          String.raw`ב. $AM^2=\frac{2\cdot49+2\cdot25-64}{4}=\frac{84}{4}=21$, ולכן $AM=\sqrt{21}\approx4.58$.`,
        ],
        finalAnswer: String.raw`ב. $AM=\sqrt{21}\approx4.58$`,
        answers: [{ label: String.raw`$AM$`, value: 4.58257569495584 }],
      },
      {
        id: 'trig-proof-review-4',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ הזוויות $B$ ו-$C$ חדות, ו-$AD$ הוא הגובה לצלע $BC$ (ראו שרטוט).

א. הוכיחו כי $BC=\dfrac{AD\cdot\sin(B+C)}{\sin B\,\sin C}$.

ב. נתון $AD=6$, $\angle B=50^\circ$ ו-$\angle C=70^\circ$. חשבו את $BC$ ואת שטח המשולש.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="202.8,30.0 51.7,210.0 268.3,210.0" />
  <line x1="202.8" y1="30.0" x2="202.8" y2="210.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="202.8,201.0 211.8,201.0 211.8,210.0" stroke-width="1" />
  <path d="M 75.7,210.0 A 24 24 0 0 0 67.2,191.6" stroke-width="1.2" />
  <path d="M 260.1,187.4 A 24 24 0 0 0 244.3,210.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="206.2" y="21.4" text-anchor="middle">A</text>
    <text x="38.3" y="222.6" text-anchor="middle">B</text>
    <text x="280.9" y="224.1" text-anchor="middle">C</text>
    <text x="202.8" y="232.0" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`הזוויות $B$, $C$ חדות, ולכן $D$ בין $B$ ל-$C$ ו-$BC=BD+DC$. במשולשים ישרי הזווית: $BD=\frac{AD}{\tan B}$, $DC=\frac{AD}{\tan C}$.`,
          String.raw`כתבו $\frac{1}{\tan B}=\frac{\cos B}{\sin B}$, הביאו למכנה משותף וזהו את $\sin(B+C)$ במונה.`,
        ],
        solutionSteps: [
          String.raw`א. הזוויות $B$ ו-$C$ חדות, ולכן רגל הגובה $D$ נמצאת בין $B$ ל-$C$, ו-$BC=BD+DC$.`,
          String.raw`במשולש ישר הזווית $ABD$: $\tan B=\frac{AD}{BD}$, ולכן $BD=AD\cdot\frac{\cos B}{\sin B}$; באותו אופן במשולש $ADC$: $DC=AD\cdot\frac{\cos C}{\sin C}$.`,
          String.raw`$BC=AD\left(\frac{\cos B}{\sin B}+\frac{\cos C}{\sin C}\right)=AD\cdot\frac{\sin C\cos B+\cos C\sin B}{\sin B\sin C}$.`,
          String.raw`לפי זהות הסינוס של סכום: $\sin C\cos B+\cos C\sin B=\sin(B+C)$, ולכן $BC=\frac{AD\cdot\sin(B+C)}{\sin B\sin C}$, כנדרש.`,
          String.raw`ב. $BC=\frac{6\sin120^\circ}{\sin50^\circ\sin70^\circ}\approx\frac{5.196}{0.7198}\approx7.22$.`,
          String.raw`$S=\frac12\cdot BC\cdot AD\approx\frac12\cdot7.218\cdot6\approx21.66$.`,
        ],
        finalAnswer: String.raw`ב. $BC\approx7.22$, $S\approx21.66$`,
        answers: [
          { label: String.raw`$BC$`, value: 7.218419192660895 },
          { label: String.raw`שטח המשולש`, value: 21.655257577982685 },
        ],
      },
      {
        id: 'trig-proof-review-5',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ נתון $\angle A=2\angle B$. נסמן $BC=a$, $AC=b$, $AB=c$.

א. הוכיחו כי $a=2b\cos B$.

ב. הוכיחו כי $a^2=b(b+c)$.

ג. נתון $b=4$ ו-$c=5$. חשבו את $a$ ואת $\angle B$.`,
        hints: [
          String.raw`א. משפט הסינוסים: $\frac ab=\frac{\sin2B}{\sin B}$.`,
          String.raw`ב. $\angle C=180^\circ-3B$, ולכן $\frac cb=\frac{\sin3B}{\sin B}=3-4\sin^2B=4\cos^2B-1$.`,
          String.raw`חשבו $b(b+c)=b^2\left(1+\frac cb\right)=4b^2\cos^2B$ והשוו ל-$a^2$ מסעיף א.`,
        ],
        solutionSteps: [
          String.raw`א. לפי משפט הסינוסים: $\frac ab=\frac{\sin A}{\sin B}=\frac{\sin2B}{\sin B}=\frac{2\sin B\cos B}{\sin B}=2\cos B$, ולכן $a=2b\cos B$.`,
          String.raw`ב. $\angle C=180^\circ-3B$, ולכן לפי משפט הסינוסים: $\frac cb=\frac{\sin(180^\circ-3B)}{\sin B}=\frac{\sin3B}{\sin B}$.`,
          String.raw`לפי הזהות $\sin3B=3\sin B-4\sin^3B$: $\frac cb=3-4\sin^2B=3-4(1-\cos^2B)=4\cos^2B-1$.`,
          String.raw`$b(b+c)=b^2\left(1+\frac cb\right)=b^2\cdot4\cos^2B=(2b\cos B)^2=a^2$ (לפי סעיף א), כנדרש.`,
          String.raw`ג. $a^2=4\cdot(4+5)=36$, ולכן $a=6$. מסעיף א: $\cos B=\frac{a}{2b}=\frac68=\frac34$, ולכן $\angle B\approx41.41^\circ$ (ו-$\angle A=2\angle B\approx82.82^\circ$).`,
        ],
        finalAnswer: String.raw`ג. $a=6$, $\angle B=\cos^{-1}\frac34\approx41.41^\circ$`,
        answers: [
          { label: String.raw`$a$`, value: 6 },
          { label: String.raw`$\angle B$`, value: 41.40962210927086 },
        ],
      },
      {
        id: 'trig-proof-review-6',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ נסמן $AC=b$, $AB=c$ ו-$\angle BAC=\alpha$. $AD$ חוצה את הזווית $A$ ($D$ על $BC$; ראו שרטוט).

א. הוכיחו כי $AD=\dfrac{2bc\cos\frac\alpha2}{b+c}$.

ב. חשבו את $AD$ כאשר $b=12$, $c=4$ ו-$\alpha=60^\circ$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="108.0,210.0 177.3,210.0 212.0,30.0" />
  <line x1="108.0" y1="210.0" x2="186.0" y2="165.0" />
  <path d="M 138.0,210.0 A 30 30 0 0 0 134.0,195.0" stroke-width="1.2" />
  <path d="M 137.5,193.0 A 34 34 0 0 0 125.0,180.6" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="142.7" y="227.0" font-size="16" text-anchor="middle" font-style="italic">c</text>
    <text x="149.6" y="119.0" font-size="16" text-anchor="middle" font-style="italic">b</text>
    <text x="97.6" y="226.8" text-anchor="middle">A</text>
    <text x="180.2" y="230.7" text-anchor="middle">B</text>
    <text x="217.3" y="22.0" text-anchor="middle">C</text>
    <text x="198.0" y="179.9" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`$S_{ABC}=S_{ABD}+S_{ADC}$, ובכל אחד מהמשולשים הקטנים הזווית ב-$A$ היא $\frac\alpha2$.`,
          String.raw`בצד שמאל כתבו $\sin\alpha=2\sin\frac\alpha2\cos\frac\alpha2$ וצמצמו ב-$\sin\frac\alpha2$.`,
        ],
        solutionSteps: [
          String.raw`א. נסמן $AD=d$. חוצה הזווית מחלק את המשולש לשני משולשים שבכל אחד מהם הזווית ב-$A$ היא $\frac\alpha2$.`,
          String.raw`לפי נוסחת השטח: $S_{ABC}=\frac12bc\sin\alpha$, $S_{ABD}=\frac12cd\sin\frac\alpha2$, $S_{ADC}=\frac12bd\sin\frac\alpha2$.`,
          String.raw`$S_{ABC}=S_{ABD}+S_{ADC}$: $\frac12bc\sin\alpha=\frac12d(b+c)\sin\frac\alpha2$.`,
          String.raw`לפי זהות הזווית הכפולה $\sin\alpha=2\sin\frac\alpha2\cos\frac\alpha2$; מצמצמים ב-$\frac12\sin\frac\alpha2\ne0$: $2bc\cos\frac\alpha2=d(b+c)$, ולכן $d=\frac{2bc\cos\frac\alpha2}{b+c}$, כנדרש.`,
          String.raw`ב. $AD=\frac{2\cdot12\cdot4\cos30^\circ}{16}=6\cos30^\circ=3\sqrt3\approx5.20$.`,
        ],
        finalAnswer: String.raw`ב. $AD=3\sqrt3\approx5.20$`,
        answers: [{ label: String.raw`$AD$`, value: 5.196152422706632 }],
      },
    ],
  },
  'trig-advanced': {
    intro: String.raw`תרגילים מסכמים ברמת שאלה 5 בבגרות: בכל תרגיל כמה סעיפים שנבנים זה על זה, ובהם שילוב של משפט הסינוסים (כולל $2R$), משפט הקוסינוסים, נוסחת השטח, משולשים ישרי זווית, תכונות מרובעים ומעגלים, וזהויות. חלק מהתרגילים מתחילים בפרמטר ($\alpha$) ומסתיימים במשוואה טריגונומטרית. נסו לפתור כל תרגיל עד הסוף לפני שאתם פותחים רמז – כך זה ייראה בבחינה.`,
    keyFacts: [
      String.raw`**סדר עבודה**: מסמנים בשרטוט את כל הנתונים, משלימים זוויות (סכום זוויות, מקבילים, מעגל), ובוחרים משולש שבו חסר נתון אחד בלבד.`,
      String.raw`**מרובע חסום במעגל**: סכום זוויות נגדיות $180^\circ$; זוויות היקפיות הנשענות על אותה קשת שוות; כל משולש שקודקודיו על המעגל חסום באותו מעגל, ולכן $\frac{a}{\sin\alpha}=2R$ בכל אחד מהם.`,
      String.raw`**זווית היקפית הנשענת על קוטר היא ישרה** – ולהפך: אם זווית היקפית ישרה, המיתר שמולה הוא קוטר ($2R$).`,
      String.raw`**משוואה בסוף התרגיל**: לפני שפותרים, כותבים את התחום של $\alpha$ מתוך השרטוט (זווית חדה, $3\alpha<180^\circ$ וכדומה), ובסוף בודקים שהפתרון בתחום. $\sin\alpha+\cos\alpha=c$ פותרים בהעלאה בריבוע: $1+\sin2\alpha=c^2$.`,
      String.raw`**בדיקת סבירות**: מול צלע גדולה זווית גדולה; אורכים חיוביים; סכום הזוויות $180^\circ$.`,
    ],
    exercises: [
      {
        id: 'trig-advanced-1',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $AB=8$, $BC=7$, $AC=5$ (ראו שרטוט).

א. חשבו את $\angle BAC$.

ב. חשבו את רדיוס המעגל החוסם את המשולש.

ג. חשבו את שטח המשולש ואת אורך הגובה מ-$C$ לצלע $AB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,190.4 290.0,190.4 111.3,49.6" />
  <line x1="111.3" y1="49.6" x2="111.3" y2="190.4" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="111.3,181.4 120.3,181.4 120.3,190.4" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="160.0" y="207.4" font-size="14" text-anchor="middle">8</text>
    <text x="208.0" y="115.6" font-size="14" text-anchor="middle">7</text>
    <text x="60.2" y="119.0" font-size="14" text-anchor="middle">5</text>
    <text x="16.1" y="202.1" text-anchor="middle">A</text>
    <text x="304.3" y="200.9" text-anchor="middle">B</text>
    <text x="106.3" y="41.5" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`א. משפט הקוסינוסים לצלע $BC$, שמול הזווית $A$.`,
          String.raw`ב. $\frac{BC}{\sin A}=2R$.`,
          String.raw`ג. $S=\frac12\cdot AB\cdot AC\sin A$, והגובה $h=\frac{2S}{AB}$.`,
        ],
        solutionSteps: [
          String.raw`א. לפי משפט הקוסינוסים: $\cos A=\frac{AB^2+AC^2-BC^2}{2\cdot AB\cdot AC}=\frac{64+25-49}{80}=\frac12$, ולכן $\angle BAC=60^\circ$.`,
          String.raw`ב. לפי משפט הסינוסים: $2R=\frac{BC}{\sin A}=\frac{7}{\frac{\sqrt3}{2}}=\frac{14}{\sqrt3}$, ולכן $R=\frac{7}{\sqrt3}=\frac{7\sqrt3}{3}\approx4.04$.`,
          String.raw`ג. $S=\frac12\cdot8\cdot5\sin60^\circ=10\sqrt3\approx17.32$.`,
          String.raw`הגובה מ-$C$: $S=\frac12\cdot AB\cdot h$, ולכן $h=\frac{2\cdot10\sqrt3}{8}=\frac{5\sqrt3}{2}\approx4.33$ (וגם ישירות: $h=AC\sin A=5\sin60^\circ$).`,
        ],
        finalAnswer: String.raw`א. $60^\circ$. ב. $R=\frac{7\sqrt3}{3}\approx4.04$. ג. $S=10\sqrt3\approx17.32$, $h=\frac{5\sqrt3}{2}\approx4.33$.`,
        answers: [
          { label: String.raw`$\angle BAC$`, value: 60 },
          { label: String.raw`$R$`, value: 4.041451884327381 },
          { label: String.raw`שטח המשולש`, value: 17.320508075688775 },
          { label: String.raw`הגובה מ-$C$`, value: 4.330127018922193 },
        ],
      },
      {
        id: 'trig-advanced-2',
        difficulty: 2,
        statement: String.raw`הדלתון $ABCD$ ($AB=AD$, $CB=CD$) חסום במעגל. נתון $\angle BAD=70^\circ$ והאלכסון $BD=10$ (ראו שרטוט).

א. הוכיחו כי $\angle ABC=90^\circ$, והסיקו ש-$AC$ קוטר במעגל.

ב. חשבו את רדיוס המעגל ואת אורך הצלע $AB$.

ג. חשבו את שטח הדלתון.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="90.0" stroke-width="1" />
  <polygon points="70.0,120.0 190.8,204.6 250.0,120.0 190.8,35.4" />
  <line x1="70.0" y1="120.0" x2="250.0" y2="120.0" stroke-width="1.5" />
  <line x1="190.8" y1="204.6" x2="190.8" y2="35.4" stroke-width="1.5" />
  <path d="M 94.6,137.2 A 30 30 0 0 0 94.6,102.8" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="126.0" y="137.0" font-size="14" text-anchor="middle">70°</text>
    <text x="202.8" y="76.0" font-size="14" text-anchor="middle">10</text>
    <text x="55.0" y="126.0" text-anchor="middle">A</text>
    <text x="195.9" y="224.7" text-anchor="middle">B</text>
    <text x="265.0" y="126.0" text-anchor="middle">C</text>
    <text x="195.9" y="27.3" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`בדלתון $\angle ABC=\angle ADC$ (המשולשים $ABC$ ו-$ADC$ חופפים), ובמרובע חסום סכומן $180^\circ$.`,
          String.raw`$R$ – ממשפט הסינוסים במשולש $ABD$: $\frac{BD}{\sin\angle BAD}=2R$.`,
          String.raw`אלכסוני הדלתון מאונכים, ולכן $S=\frac12\cdot AC\cdot BD$.`,
        ],
        solutionSteps: [
          String.raw`א. המשולשים $ABC$ ו-$ADC$ חופפים (צ.צ.צ: $AB=AD$, $CB=CD$, $AC$ משותפת), ולכן $\angle ABC=\angle ADC$. המרובע חסום במעגל, ולכן סכומן $180^\circ$, וכל אחת מהן $90^\circ$. זווית היקפית ישרה נשענת על קוטר, ולכן $AC$ קוטר.`,
          String.raw`ב. המשולש $ABD$ חסום באותו מעגל. לפי משפט הסינוסים: $2R=\frac{BD}{\sin70^\circ}=\frac{10}{\sin70^\circ}\approx10.642$, ולכן $R\approx5.32$.`,
          String.raw`$AC$ חוצה את $\angle BAD$ (אלכסון ראשי בדלתון), ולכן $\angle BAC=35^\circ$. במשולש ישר הזווית $ABC$: $AB=AC\cos35^\circ=2R\cos35^\circ\approx8.72$.`,
          String.raw`ג. אלכסוני הדלתון מאונכים, ולכן $S=\frac12\cdot AC\cdot BD=\frac12\cdot2R\cdot10=10R\approx53.21$.`,
        ],
        finalAnswer: String.raw`ב. $R=\frac{5}{\sin70^\circ}\approx5.32$, $AB\approx8.72$. ג. $S\approx53.21$.`,
        answers: [
          { label: String.raw`$R$`, value: 5.320888862379561 },
          { label: String.raw`$AB$`, value: 8.71723397810549 },
          { label: String.raw`שטח הדלתון`, value: 53.20888862379561 },
        ],
      },
      {
        id: 'trig-advanced-3',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ הגובה לצלע $BC$ הוא $AD=h$, והוא מחלק את הזווית $A$ כך ש-$\angle BAD=\alpha$ ו-$\angle DAC=2\alpha$ ($\alpha<45^\circ$; ראו שרטוט).

א. הביעו באמצעות $h$ ו-$\alpha$ את $AB$, את $AC$ ואת $BC$.

ב. נתון $AC=2AB$. מצאו את $\alpha$.

ג. נתון גם $h=5$. חשבו את שטח המשולש $ABC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="89.5,73.4 30.0,166.6 290.0,166.6" />
  <line x1="89.5" y1="73.4" x2="89.5" y2="166.6" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="89.5,157.6 98.5,157.6 98.5,166.6" stroke-width="1" />
  <path d="M 71.2,102.1 A 34 34 0 0 0 89.5,107.4" stroke-width="1.2" />
  <path d="M 89.5,99.4 A 26 26 0 0 0 113.0,84.4" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="76.9" y="121.6" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="112.1" y="113.8" font-size="14" text-anchor="middle">2α</text>
    <text x="79.5" y="147.0" font-size="16" text-anchor="middle" font-style="italic">h</text>
    <text x="80.4" y="67.4" text-anchor="middle">A</text>
    <text x="15.6" y="176.8" text-anchor="middle">B</text>
    <text x="304.7" y="175.6" text-anchor="middle">C</text>
    <text x="89.5" y="188.6" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`במשולשים ישרי הזווית $ABD$ ו-$ACD$ הניצב $AD=h$ צמוד לזוויות $\alpha$ ו-$2\alpha$.`,
          String.raw`$AC=2AB$ נותן $\cos\alpha=2\cos2\alpha$; הציבו $\cos2\alpha=2\cos^2\alpha-1$.`,
          String.raw`תתקבל המשוואה הריבועית $4\cos^2\alpha-\cos\alpha-2=0$; בחרו את הפתרון המתאים ל-$\alpha<45^\circ$.`,
        ],
        solutionSteps: [
          String.raw`א. במשולש ישר הזווית $ABD$: $\cos\alpha=\frac{h}{AB}$, ולכן $AB=\frac{h}{\cos\alpha}$, ו-$BD=h\tan\alpha$. במשולש ישר הזווית $ACD$: $AC=\frac{h}{\cos2\alpha}$ ו-$DC=h\tan2\alpha$.`,
          String.raw`$\alpha<45^\circ$, ולכן שתי הזוויות $B$ ו-$C$ חדות ו-$D$ בין $B$ ל-$C$: $BC=h(\tan\alpha+\tan2\alpha)$.`,
          String.raw`ב. $\frac{h}{\cos2\alpha}=\frac{2h}{\cos\alpha}$, ולכן $\cos\alpha=2\cos2\alpha=2(2\cos^2\alpha-1)$, כלומר $4\cos^2\alpha-\cos\alpha-2=0$.`,
          String.raw`$\cos\alpha=\frac{1\pm\sqrt{1+32}}{8}=\frac{1\pm\sqrt{33}}{8}$. הפתרון השלילי נפסל ($\alpha$ חדה), ולכן $\cos\alpha=\frac{1+\sqrt{33}}{8}\approx0.8431$ ו-$\alpha\approx32.53^\circ$ (קטנה מ-$45^\circ$, כנדרש).`,
          String.raw`ג. $BC=5(\tan32.53^\circ+\tan65.07^\circ)\approx5(0.6379+2.1512)\approx13.946$.`,
          String.raw`$S=\frac12\cdot BC\cdot h\approx\frac12\cdot13.946\cdot5\approx34.86$.`,
        ],
        finalAnswer: String.raw`א. $AB=\frac{h}{\cos\alpha}$, $AC=\frac{h}{\cos2\alpha}$, $BC=h(\tan\alpha+\tan2\alpha)$. ב. $\alpha\approx32.53^\circ$. ג. $S\approx34.86$.`,
        answers: [
          { label: String.raw`$\alpha$`, value: 32.53422655237138 },
          { label: String.raw`שטח המשולש`, value: 34.864046201933974 },
        ],
      },
      {
        id: 'trig-advanced-4',
        difficulty: 3,
        statement: String.raw`המרובע $ABCD$ חסום במעגל. נתון $AB=BC$, $\angle ABC=100^\circ$, $AD=6$ ו-$CD=4$ (ראו שרטוט).

א. חשבו את אורך האלכסון $AC$.

ב. חשבו את רדיוס המעגל.

ג. חשבו את $AB$ ואת שטח המרובע.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="90.0" stroke-width="1" />
  <polygon points="71.4,135.6 160.0,210.0 248.6,135.6 200.6,39.7" />
  <line x1="71.4" y1="135.6" x2="248.6" y2="135.6" stroke-width="1.5" />
  <path d="M 170.7,201.0 A 14 14 0 0 0 149.3,201.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="160.0" y="177.0" font-size="14" text-anchor="middle">100°</text>
    <text x="143.1" y="102.3" font-size="14" text-anchor="middle">6</text>
    <text x="213.9" y="98.0" font-size="14" text-anchor="middle">4</text>
    <text x="56.6" y="144.2" text-anchor="middle">A</text>
    <text x="160.0" y="231.0" text-anchor="middle">B</text>
    <text x="263.4" y="144.2" text-anchor="middle">C</text>
    <text x="207.4" y="32.3" text-anchor="middle">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`במרובע חסום $\angle ADC=180^\circ-100^\circ=80^\circ$; משפט הקוסינוסים במשולש $ADC$.`,
          String.raw`המשולש $ADC$ חסום במעגל: $\frac{AC}{\sin80^\circ}=2R$.`,
          String.raw`במשולש שווה-השוקיים $ABC$ זוויות הבסיס $40^\circ$; שטח המרובע = $S_{ABC}+S_{ADC}$.`,
        ],
        solutionSteps: [
          String.raw`א. המרובע חסום במעגל, ולכן $\angle ADC=180^\circ-\angle ABC=80^\circ$. לפי משפט הקוסינוסים במשולש $ADC$: $AC^2=36+16-48\cos80^\circ\approx52-8.335=43.665$, ולכן $AC\approx6.61$.`,
          String.raw`ב. לפי משפט הסינוסים במשולש $ADC$ (החסום באותו מעגל): $2R=\frac{AC}{\sin80^\circ}\approx\frac{6.608}{0.9848}\approx6.710$, ולכן $R\approx3.35$.`,
          String.raw`ג. במשולש שווה-השוקיים $ABC$: $\angle BAC=\angle BCA=40^\circ$. לפי משפט הסינוסים: $\frac{AB}{\sin40^\circ}=\frac{AC}{\sin100^\circ}$, ולכן $AB=\frac{AC\sin40^\circ}{\sin100^\circ}\approx4.31$.`,
          String.raw`$S_{ADC}=\frac12\cdot6\cdot4\sin80^\circ\approx11.818$ ו-$S_{ABC}=\frac12AB^2\sin100^\circ\approx\frac12\cdot18.602\cdot0.9848\approx9.160$.`,
          String.raw`$S_{ABCD}\approx11.818+9.160\approx20.98$.`,
        ],
        finalAnswer: String.raw`א. $AC\approx6.61$. ב. $R\approx3.35$. ג. $AB\approx4.31$, שטח $\approx20.98$.`,
        answers: [
          { label: String.raw`$AC$`, value: 6.607941243079219 },
          { label: String.raw`$R$`, value: 3.354939694000005 },
          { label: String.raw`$AB$`, value: 4.313027333097506 },
          { label: String.raw`שטח המרובע`, value: 20.977490779432 },
        ],
      },
      {
        id: 'trig-advanced-5',
        difficulty: 3,
        statement: String.raw`במקבילית $ABCD$ נתון $AB=2a$, $AD=a$ ו-$\angle DAB=\alpha$. האלכסונים נחתכים בנקודה $O$ (ראו שרטוט).

א. הביעו באמצעות $a$ ו-$\alpha$ את אורכי האלכסונים $BD$ ו-$AC$.

ב. נתון $BD=a\sqrt3$. מצאו את $\alpha$, והראו ש-$BD\perp AD$.

ג. חשבו את הזווית החדה שבין האלכסונים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,165.0 238.0,165.0 290.0,75.0 82.0,75.0" />
  <line x1="30.0" y1="165.0" x2="290.0" y2="75.0" stroke-width="1.5" />
  <line x1="238.0" y1="165.0" x2="82.0" y2="75.0" stroke-width="1.5" />
  <path d="M 52.0,165.0 A 22 22 0 0 0 41.0,146.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="63.6" y="164.5" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="134.0" y="182.0" font-size="16" text-anchor="middle" font-style="italic">2a</text>
    <text x="45.6" y="119.0" font-size="16" text-anchor="middle" font-style="italic">a</text>
    <text x="15.8" y="175.9" text-anchor="middle">A</text>
    <text x="251.0" y="178.5" text-anchor="middle">B</text>
    <text x="304.2" y="76.1" text-anchor="middle">C</text>
    <text x="69.0" y="73.5" text-anchor="middle">D</text>
    <text x="160.0" y="114.0" text-anchor="middle">O</text>
  </g>
</svg>`,
        hints: [
          String.raw`משפט הקוסינוסים במשולש $ABD$ (זווית $\alpha$) ובמשולש $ABC$ (זווית $180^\circ-\alpha$).`,
          String.raw`ב: בדקו את משפט פיתגורס במשולש $ABD$.`,
          String.raw`ג: האלכסונים חוצים זה את זה; במשולש $AOB$ ידועות שלוש הצלעות: $\frac{AC}{2}$, $\frac{BD}{2}$, $2a$.`,
        ],
        solutionSteps: [
          String.raw`א. לפי משפט הקוסינוסים במשולש $ABD$: $BD^2=4a^2+a^2-4a^2\cos\alpha$, ולכן $BD=a\sqrt{5-4\cos\alpha}$.`,
          String.raw`$\angle ABC=180^\circ-\alpha$ ו-$BC=a$; לפי משפט הקוסינוסים במשולש $ABC$: $AC^2=5a^2-4a^2\cos(180^\circ-\alpha)=5a^2+4a^2\cos\alpha$, ולכן $AC=a\sqrt{5+4\cos\alpha}$.`,
          String.raw`ב. $5-4\cos\alpha=3$, ולכן $\cos\alpha=\frac12$ ו-$\alpha=60^\circ$. אז $AD^2+BD^2=a^2+3a^2=4a^2=AB^2$, ולפי המשפט ההפוך למשפט פיתגורס $\angle ADB=90^\circ$.`,
          String.raw`ג. $AC=a\sqrt{5+2}=a\sqrt7$. האלכסונים חוצים זה את זה: $AO=\frac{a\sqrt7}{2}$, $BO=\frac{a\sqrt3}{2}$.`,
          String.raw`לפי משפט הקוסינוסים במשולש $AOB$: $4a^2=\frac{7a^2}{4}+\frac{3a^2}{4}-2\cdot\frac{a\sqrt7}{2}\cdot\frac{a\sqrt3}{2}\cos\angle AOB$, ולכן $\cos\angle AOB=-\frac{3}{\sqrt{21}}\approx-0.6547$ ו-$\angle AOB\approx130.89^\circ$.`,
          String.raw`הזווית החדה בין האלכסונים היא הזווית הצמודה: $180^\circ-130.89^\circ\approx49.11^\circ$.`,
        ],
        finalAnswer: String.raw`א. $BD=a\sqrt{5-4\cos\alpha}$, $AC=a\sqrt{5+4\cos\alpha}$. ב. $\alpha=60^\circ$. ג. $\approx49.11^\circ$.`,
        answers: [
          { label: String.raw`$\alpha$`, value: 60 },
          { label: String.raw`הזווית החדה בין האלכסונים`, value: 49.106605350869096 },
        ],
      },
      {
        id: 'trig-advanced-6',
        difficulty: 3,
        statement: String.raw`היתר של משולש ישר זווית הוא 10, והיקפו 24. נסמן ב-$\alpha$ את אחת הזוויות החדות (ראו שרטוט).

א. הראו כי $\sin\alpha+\cos\alpha=1.4$.

ב. פתרו את המשוואה ומצאו את $\alpha$ (שתי אפשרויות), ואת אורכי הניצבים.

ג. חשבו את הגובה ליתר.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="280.0,210.0 40.0,30.0 40.0,210.0" />
  <polyline points="49.0,210.0 49.0,201.0 40.0,201.0" stroke-width="1" />
  <path d="M 244.0,210.0 A 36 36 0 0 1 251.2,188.4" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="235.4" y="200.1" font-size="14" text-anchor="middle" font-style="italic">α</text>
    <text x="167.2" y="115.4" font-size="14" text-anchor="middle">10</text>
    <text x="294.0" y="221.3" text-anchor="middle">A</text>
    <text x="31.7" y="23.5" text-anchor="middle">B</text>
    <text x="28.0" y="225.0" text-anchor="middle">C</text>
  </g>
</svg>`,
        hints: [
          String.raw`הניצבים הם $10\sin\alpha$ ו-$10\cos\alpha$.`,
          String.raw`העלו את המשוואה בריבוע: $\sin^2\alpha+2\sin\alpha\cos\alpha+\cos^2\alpha=1.96$, כלומר $1+\sin2\alpha=1.96$.`,
          String.raw`$\sin2\alpha=0.96$ נותן שתי זוויות $2\alpha$ בין $0^\circ$ ל-$180^\circ$; בדקו שתיהן במשוואה המקורית.`,
        ],
        solutionSteps: [
          String.raw`א. במשולש ישר הזווית שיתרו 10, הניצבים הם $10\sin\alpha$ ו-$10\cos\alpha$. ההיקף: $10+10\sin\alpha+10\cos\alpha=24$, ולכן $\sin\alpha+\cos\alpha=1.4$.`,
          String.raw`ב. מעלים בריבוע: $\sin^2\alpha+\cos^2\alpha+2\sin\alpha\cos\alpha=1.96$, ולפי הזהויות $1+\sin2\alpha=1.96$, כלומר $\sin2\alpha=0.96$.`,
          String.raw`$0^\circ<2\alpha<180^\circ$, ולכן $2\alpha\approx73.74^\circ$ או $2\alpha\approx106.26^\circ$, כלומר $\alpha\approx36.87^\circ$ או $\alpha\approx53.13^\circ$.`,
          String.raw`בדיקה (העלאה בריבוע עלולה להוסיף פתרונות): עבור $\alpha\approx36.87^\circ$: $\sin\alpha=0.6$, $\cos\alpha=0.8$ וסכומם $1.4$ ✓; עבור $53.13^\circ$ הערכים מתחלפים ✓. אלה שתי הזוויות החדות של אותו משולש.`,
          String.raw`הניצבים: $10\cdot0.6=6$ ו-$10\cdot0.8=8$.`,
          String.raw`ג. משטח המשולש בשתי דרכים: $\frac12\cdot6\cdot8=\frac12\cdot10\cdot h$, ולכן $h=4.8$.`,
        ],
        finalAnswer: String.raw`ב. $\alpha\approx36.87^\circ$ או $53.13^\circ$; הניצבים 6 ו-8. ג. $h=4.8$.`,
        answers: [
          { label: String.raw`$\alpha$ (הקטנה)`, value: 36.86989764584402 },
          { label: String.raw`הניצב הקצר`, value: 6 },
          { label: String.raw`הניצב הארוך`, value: 8 },
          { label: String.raw`הגובה ליתר`, value: 4.8 },
        ],
      },
    ],
  },
};
