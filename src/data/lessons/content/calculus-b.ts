import type { LessonContent } from '../types';

/**
 * Lessons of the calculus chapter (questionnaire 806), part B: the relation between f and f′,
 * graphical extremum problems, antiderivatives, areas and ∫f′ = f(b) − f(a), plus the chapter review.
 * Figures are drawn to scale from the function model that the tests (calculus-b.test.ts) verify.
 * מיקוד 2026: no integrals of square-root or trigonometric functions, no polynomial division,
 * and only graphical extremum problems.
 */
export const calculusBContent: Record<string, LessonContent> = {
  'calc-graph-derivative': {
    intro: String.raw`בסעיף הזה לומדים לקרוא מידע על פונקציה $f$ מתוך **גרף הנגזרת** $f'$, ולהפך – לזהות את גרף $f'$ מתוך גרף $f$. הרעיון המרכזי: הסימן של $f'$ קובע את העלייה והירידה של $f$, האפסים של $f'$ שבהם היא מחליפה סימן הם נקודות הקיצון של $f$, והעלייה והירידה של $f'$ (כלומר הסימן של $f''$) קובעות את הקעירות של $f$. בבגרות זה מופיע כסעיף בשאלות 6 ו-7: ״בשרטוט נתון גרף פונקציית הנגזרת... מצאו את תחומי העלייה והירידה של $f$, את נקודות הקיצון ואת נקודות הפיתול״, או כשאלת זיהוי – איזה גרף הוא של $f$ ואיזה של $f'$.`,
    keyFacts: [
      String.raw`**סימן הנגזרת ומונוטוניות**: בקטע שבו גרף $f'$ נמצא **מעל** ציר $x$ ($f'>0$) הפונקציה $f$ **עולה**; בקטע שבו גרף $f'$ נמצא **מתחת** לציר $x$ ($f'<0$) הפונקציה $f$ **יורדת**.`,
      String.raw`**אפסי הנגזרת וקיצון**: נקודה שבה גרף $f'$ **חותך** את ציר $x$ היא נקודת קיצון של $f$ – מעבר מ-$+$ ל-$-$ הוא **מקסימום**, ומ-$-$ ל-$+$ הוא **מינימום**. נקודה שבה גרף $f'$ רק **משיק** לציר $x$ (בלי החלפת סימן) אינה נקודת קיצון – יש בה ל-$f$ משיק אופקי.`,
      String.raw`**קעירות**: $f''$ היא הנגזרת של $f'$. בקטע שבו $f'$ **עולה** – $f''>0$ ו-$f$ קעורה כלפי מעלה ($\cup$); בקטע שבו $f'$ **יורדת** – $f''<0$ ו-$f$ קעורה כלפי מטה ($\cap$). לכן **נקודות הקיצון של $f'$ הן נקודות הפיתול של $f$**.`,
      String.raw`**ערך הנגזרת הוא שיפוע**: הערך $f'(x_0)$ שקוראים מגרף הנגזרת הוא שיפוע המשיק לגרף $f$ בנקודה שבה $x=x_0$. השיפוע של $f$ מקסימלי או מינימלי בנקודת פיתול של $f$.`,
      String.raw`**מ-$f$ אל $f'$ וזיהוי גרפים**: נקודות קיצון של $f$ ← אפסים של $f'$; קטעי עלייה של $f$ ← $f'$ חיובית; נקודת פיתול של $f$ ← נקודת קיצון של $f'$. כדי לזהות איזה גרף הוא הנגזרת בודקים שהאפסים שלו נמצאים בדיוק מתחת לנקודות הקיצון של הגרף השני.`,
      String.raw`**זוגיות**: אם $f$ זוגית אז $f'$ אי-זוגית – גוזרים את $f(-x)=f(x)$ לפי כלל השרשרת ומקבלים $-f'(-x)=f'(x)$.`,
      String.raw`**נקודות מחוץ לתחום**: אם $f$ אינה מוגדרת ב-$x=a$ (למשל גרף $f'$ מתקרב שם לאסימפטוטה אנכית), אז $x=a$ אינה נקודת קיצון ואינה נקודת פיתול, גם אם הסימן של $f'$ או הקעירות מתחלפים בה.`,
    ],
    exercises: [
      {
        id: 'calc-graph-derivative-1',
        difficulty: 1,
        statement: String.raw`בשרטוט מתואר גרף פונקציית הנגזרת $f'$ של פונקציה $f$ המוגדרת לכל $x$. גרף הנגזרת הוא פרבולה החותכת את ציר $x$ בנקודות שבהן $x=-2$ ו-$x=3$ (ראו שרטוט).

מצאו את תחומי העלייה והירידה של $f$ ואת שיעורי ה-$x$ של נקודות הקיצון שלה, וקבעו את סוגן.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="137.7" x2="312" y2="137.7" stroke-width="1.5"/>
  <polyline points="306,133.7 312,137.7 306,141.7" stroke-width="1.5"/>
  <line x1="142.7" y1="228" x2="142.7" y2="6" stroke-width="1.5"/>
  <polyline points="138.7,12 142.7,6 146.7,12" stroke-width="1.5"/>
  <text x="310" y="129.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="154.7" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="19.2,17.4 27.5,39.5 36.9,63.1 46.4,85 54.7,102.7 63,119 72.4,136.1 80.7,149.5 90.2,163.3 98.5,173.9 107.9,184.4 116.2,192.2 125.7,199.4 134,204.3 138.7,206.5 143.4,208.2 151.7,210.2 160,210.9 164.7,210.7 169.5,210 177.8,207.8 182.5,205.9 187.2,203.7 195.5,198.6 203.8,192.2 212.1,184.4 220.4,175.3 229.8,163.3 239.3,149.5 247.6,136.1 255.8,121.2 265.3,102.7 274.8,82.3 283.1,63.1 292.5,39.5 300.8,17.4"/>
  <line x1="73.4" y1="133.7" x2="73.4" y2="141.7" stroke-width="1.5"/>
  <text x="57.4" y="157.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">−2</text>
  <line x1="246.6" y1="133.7" x2="246.6" y2="141.7" stroke-width="1.5"/>
  <text x="260.6" y="157.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">3</text>
  <circle cx="73.4" cy="137.7" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="246.6" cy="137.7" r="3.5" fill="currentColor" stroke="none"/>
  <text x="271.8" y="55.8" text-anchor="end" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f′</text>
</svg>`,
        hints: [
          String.raw`היכן גרף $f'$ נמצא מעל ציר $x$, והיכן מתחתיו?`,
          String.raw`$f'>0$ – $f$ עולה; $f'<0$ – $f$ יורדת. נקודת קיצון היא נקודה שבה $f'$ מחליפה סימן.`,
        ],
        solutionSteps: [
          String.raw`לפי השרטוט, גרף $f'$ נמצא מעל ציר $x$ עבור $x<-2$ ועבור $x>3$, כלומר שם $f'(x)>0$, ולכן $f$ עולה בתחומים אלה.`,
          String.raw`עבור $-2<x<3$ גרף $f'$ נמצא מתחת לציר $x$, כלומר $f'(x)<0$, ולכן $f$ יורדת בתחום זה.`,
          String.raw`ב-$x=-2$ הנגזרת מתאפסת ומחליפה סימן מ-$+$ ל-$-$ ($f$ עוברת מעלייה לירידה), ולכן זו נקודת מקסימום של $f$.`,
          String.raw`ב-$x=3$ הנגזרת מתאפסת ומחליפה סימן מ-$-$ ל-$+$, ולכן זו נקודת מינימום של $f$.`,
        ],
        finalAnswer: String.raw`$f$ עולה ב-$x<-2$ וב-$x>3$ ויורדת ב-$-2<x<3$; מקסימום ב-$x=-2$, מינימום ב-$x=3$.`,
        answers: [
          { label: 'נקודת המקסימום: $x$', value: -2 },
          { label: 'נקודת המינימום: $x$', value: 3 },
        ],
      },
      {
        id: 'calc-graph-derivative-2',
        difficulty: 1,
        statement: String.raw`גרף פונקציית הנגזרת $f'$ של פונקציה $f$ עובר דרך הנקודה $(2,3)$. ידוע גם ש-$f(2)=5$.

מצאו את משוואת המשיק לגרף הפונקציה $f$ בנקודה שבה $x=2$.`,
        hints: [
          String.raw`הנקודה $(2,3)$ על גרף הנגזרת אומרת ש-$f'(2)=3$. מה המשמעות הגאומטרית של $f'(2)$?`,
          String.raw`השתמשו במשוואת המשיק $y-f(x_0)=f'(x_0)(x-x_0)$ עם $x_0=2$.`,
        ],
        solutionSteps: [
          String.raw`הנקודה $(2,3)$ נמצאת על גרף $f'$, ולכן $f'(2)=3$ – זהו שיפוע המשיק לגרף $f$ בנקודה שבה $x=2$.`,
          String.raw`נקודת ההשקה על גרף $f$ היא $(2,f(2))=(2,5)$. שימו לב: את ה-$y$ של נקודת ההשקה לוקחים מ-$f$, לא מ-$f'$.`,
          String.raw`משוואת המשיק: $y-5=3(x-2)$, כלומר $y=3x-1$.`,
        ],
        finalAnswer: String.raw`$y=3x-1$`,
        answers: [
          { label: 'השיפוע $m$', value: 3 },
          { label: '$n$ במשוואה $y=mx+n$', value: -1 },
        ],
      },
      {
        id: 'calc-graph-derivative-3',
        difficulty: 2,
        statement: String.raw`בשרטוט מתואר גרף פונקציית הנגזרת $f'$ של פונקציה $f$ המוגדרת לכל $x$. גרף $f'$ חותך את ציר $x$ בנקודות שבהן $x=-3$ ו-$x=2$, ומשיק לציר $x$ בראשית הצירים (ראו שרטוט).

א. מצאו את שיעורי ה-$x$ של נקודות הקיצון של $f$ וקבעו את סוגן.

ב. הסבירו מדוע ל-$f$ אין נקודת קיצון ב-$x=0$, אף על פי ש-$f'(0)=0$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="103.6" x2="312" y2="103.6" stroke-width="1.5"/>
  <polyline points="306,99.6 312,103.6 306,107.6" stroke-width="1.5"/>
  <line x1="182.9" y1="228" x2="182.9" y2="6" stroke-width="1.5"/>
  <polyline points="178.9,12 182.9,6 186.9,12" stroke-width="1.5"/>
  <text x="310" y="95.6" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="194.9" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="26.3,217.5 32.2,174.8 39.3,132.8 45.2,104.7 48.8,90.6 52.3,78.3 55.9,67.8 59.4,59 63,51.7 66.5,45.8 70.1,41.2 74.8,36.9 78.4,34.8 83.1,33.6 86.6,33.7 91.4,34.9 96.1,37.2 100.8,40.4 105.6,44.4 111.5,50 135.1,75.8 147,87.3 154.1,93 160,96.8 165.9,99.9 171.8,102 177.8,103.2 183.7,103.5 189.6,103 195.5,101.7 201.4,99.7 207.3,97.2 231,85.3 236.9,83.1 241.6,81.9 246.4,81.3 251.1,81.7 255.8,83.2 260.6,85.9 264.1,88.9 266.5,91.5 270.1,96.1 272.4,99.8 278.3,111.4 283.1,123.4 287.8,138.1 292.5,155.7 297.3,176.6 302,201"/>
  <line x1="45.5" y1="99.6" x2="45.5" y2="107.6" stroke-width="1.5"/>
  <text x="31.5" y="95.6" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">−3</text>
  <line x1="274.5" y1="99.6" x2="274.5" y2="107.6" stroke-width="1.5"/>
  <text x="284.5" y="95.6" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">2</text>
  <circle cx="45.5" cy="103.6" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="274.5" cy="103.6" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="182.9" cy="103.6" r="3.5" fill="currentColor" stroke="none"/>
  <text x="95.6" y="30.6" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f′</text>
</svg>`,
        hints: [
          String.raw`רשמו טבלת סימנים של $f'$ לפי השרטוט: מתחת לציר, מעל לציר, ושוב מתחת לציר.`,
          String.raw`נקודת קיצון היא רק נקודה שבה $f'$ **מחליפה סימן**. מה הסימן של $f'$ משני צדי $x=0$?`,
        ],
        solutionSteps: [
          String.raw`לפי השרטוט: $f'(x)<0$ עבור $x<-3$; $f'(x)>0$ עבור $-3<x<0$ ועבור $0<x<2$; $f'(x)<0$ עבור $x>2$.`,
          String.raw`לכן $f$ יורדת ב-$x<-3$, עולה ב-$-3<x<2$ ויורדת ב-$x>2$ (בנקודה הבודדת $x=0$ הנגזרת מתאפסת, אבל $f$ עולה משני צדיה).`,
          String.raw`א. ב-$x=-3$ הנגזרת עוברת מ-$-$ ל-$+$ – נקודת מינימום; ב-$x=2$ היא עוברת מ-$+$ ל-$-$ – נקודת מקסימום.`,
          String.raw`ב. ב-$x=0$ גרף $f'$ רק נוגע בציר $x$ ונשאר מעליו משני הצדדים, כלומר $f'>0$ משמאל ל-$0$ ומימין לו. $f$ עולה לפני $x=0$ וגם אחריו, ולכן אין שם קיצון – יש שם משיק אופקי, וזו נקודת פיתול של $f$ (כי ל-$f'$ יש שם מינימום מקומי).`,
        ],
        finalAnswer: String.raw`מינימום ב-$x=-3$, מקסימום ב-$x=2$; ב-$x=0$ הנגזרת אינה מחליפה סימן, ולכן אין שם קיצון (משיק אופקי בנקודת פיתול).`,
        answers: [
          { label: 'נקודת המינימום: $x$', value: -3 },
          { label: 'נקודת המקסימום: $x$', value: 2 },
        ],
      },
      {
        id: 'calc-graph-derivative-4',
        difficulty: 2,
        statement: String.raw`בשרטוט מתואר גרף פונקציית הנגזרת $f'$ של פונקציה $f$ המוגדרת לכל $x$. לגרף $f'$ יש נקודת מקסימום $(1,2)$ ונקודת מינימום $(3,0)$, והוא חותך את ציר $x$ רק בראשית הצירים (ראו שרטוט).

א. מצאו את תחומי העלייה והירידה של $f$ ואת נקודות הקיצון שלה.

ב. מצאו את תחומי הקעירות של $f$ ואת שיעורי ה-$x$ של נקודות הפיתול שלה.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="123" x2="312" y2="123" stroke-width="1.5"/>
  <polyline points="306,119 312,123 306,127" stroke-width="1.5"/>
  <line x1="60.1" y1="228" x2="60.1" y2="6" stroke-width="1.5"/>
  <polyline points="56.1,12 60.1,6 64.1,12" stroke-width="1.5"/>
  <text x="310" y="115" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="72.1" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="22.7,219.7 29.8,195.7 36.9,174.5 44,156 52.3,137.4 60.6,122.1 68.9,109.7 72.4,105.2 77.2,99.9 80.7,96.5 85.5,92.7 89,90.3 93.7,87.7 98.5,85.7 103.2,84.4 107.9,83.6 112.7,83.3 117.4,83.6 122.1,84.3 131.6,86.7 142.3,91 152.9,96.3 182.5,112.5 190.8,116.4 199.1,119.6 208.5,122.1 216.8,122.9 225.1,122.4 232.2,120.6 236.9,118.6 241.7,116 246.4,112.6 251.1,108.6 255.8,103.7 259.4,99.5 267.7,87.9 276,73.3 283.1,58.4 291.4,37.9 298.5,17.5"/>
  <line x1="112.7" y1="123" x2="112.7" y2="83.3" stroke-dasharray="6 4" stroke-width="1.5"/>
  <line x1="112.7" y1="119" x2="112.7" y2="127" stroke-width="1.5"/>
  <text x="112.7" y="143" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">1</text>
  <line x1="217.9" y1="119" x2="217.9" y2="127" stroke-width="1.5"/>
  <text x="217.9" y="143" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">3</text>
  <circle cx="112.7" cy="83.3" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="217.9" cy="123" r="3.5" fill="currentColor" stroke="none"/>
  <text x="112.7" y="73.3" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(1,2)</text>
  <text x="280.2" y="51.7" text-anchor="end" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f′</text>
</svg>`,
        hints: [
          String.raw`בסעיף א הסתכלו על **הסימן** של $f'$; בסעיף ב הסתכלו על **העלייה והירידה** של $f'$.`,
          String.raw`בקטע שבו $f'$ עולה מתקיים $f''>0$, ולכן $f$ קעורה כלפי מעלה. נקודות הקיצון של $f'$ הן נקודות הפיתול של $f$.`,
        ],
        solutionSteps: [
          String.raw`א. גרף $f'$ נמצא מתחת לציר $x$ עבור $x<0$ ומעליו עבור $x>0$ (ב-$x=3$ הוא רק נוגע בציר). לכן $f$ יורדת ב-$x<0$ ועולה ב-$x>0$.`,
          String.raw`ב-$x=0$ הנגזרת מחליפה סימן מ-$-$ ל-$+$, ולכן זו נקודת המינימום היחידה של $f$. ב-$x=3$ הנגזרת מתאפסת בלי להחליף סימן – אין שם קיצון.`,
          String.raw`ב. $f'$ עולה עבור $x<1$, יורדת עבור $1<x<3$ ועולה עבור $x>3$. לכן $f''>0$ ב-$x<1$ וב-$x>3$, ו-$f''<0$ ב-$1<x<3$.`,
          String.raw`$f$ קעורה כלפי מעלה ($\cup$) ב-$x<1$ וב-$x>3$, וקעורה כלפי מטה ($\cap$) ב-$1<x<3$.`,
          String.raw`הקעירות מתחלפת ב-$x=1$ וב-$x=3$ – נקודות הקיצון של $f'$ – ולכן אלה נקודות הפיתול של $f$. ב-$x=3$ זו נקודת פיתול עם משיק אופקי, כי גם $f'(3)=0$.`,
        ],
        finalAnswer: String.raw`יורדת ב-$x<0$, עולה ב-$x>0$, מינימום ב-$x=0$; $\cup$ ב-$x<1$ וב-$x>3$, $\cap$ ב-$1<x<3$; פיתול ב-$x=1$ וב-$x=3$.`,
        answers: [
          { label: 'נקודת המינימום: $x$', value: 0 },
          { label: 'נקודת הפיתול השמאלית: $x$', value: 1 },
          { label: 'נקודת הפיתול הימנית: $x$', value: 3 },
        ],
      },
      {
        id: 'calc-graph-derivative-5',
        difficulty: 2,
        statement: String.raw`בשרטוט מתואר גרף הפונקציה $f$ המוגדרת לכל $x$. לגרף יש נקודת מקסימום $(-1,2)$, נקודת מינימום $(1,-2)$ ונקודת פיתול בראשית הצירים; הוא קעור כלפי מטה עבור $x<0$ וכלפי מעלה עבור $x>0$ (ראו שרטוט).

א. עבור אילו ערכי $x$ מתקיים $f'(x)=0$?

ב. מצאו את התחום שבו $f'(x)<0$.

ג. באיזה ערך של $x$ מקבלת הנגזרת $f'$ את הערך הקטן ביותר שלה? נמקו.

ד. תארו במילים את גרף $f'$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="119" x2="312" y2="119" stroke-width="1.5"/>
  <polyline points="306,115 312,119 306,123" stroke-width="1.5"/>
  <line x1="160" y1="228" x2="160" y2="6" stroke-width="1.5"/>
  <polyline points="156,12 160,6 164,12" stroke-width="1.5"/>
  <text x="310" y="111" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="172" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="20.4,219.4 28.7,185.4 36.9,156.5 45.2,132.4 48.8,123.5 53.5,112.8 57.1,105.8 61.8,97.5 66.5,90.4 71.3,84.6 76,79.8 80.7,76.2 85.5,73.6 90.2,71.9 93.7,71.3 98.5,71.1 102,71.6 106.8,72.8 110.3,74.1 115,76.5 119.8,79.4 124.5,82.8 132.8,89.9 142.3,99.3 171.8,132.3 183.7,144.7 194.3,154.2 199,157.8 203.8,160.9 208.5,163.4 213.3,165.2 218,166.4 222.7,166.9 227.5,166.6 232.2,165.4 236.9,163.2 240.5,161 245.2,157.1 248.8,153.4 252.3,149.2 255.8,144.2 260.6,136.6 264.1,130 271.2,114.5 278.3,95.8 285.4,73.8 292.5,48.1 299.6,18.6"/>
  <circle cx="96.9" cy="71.1" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="223.1" cy="166.9" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="160" cy="119" r="3.5" fill="currentColor" stroke="none"/>
  <text x="96.9" y="59.1" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(−1,2)</text>
  <text x="223.1" y="190.9" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(1,−2)</text>
  <text x="281.4" y="42.3" text-anchor="end" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f</text>
</svg>`,
        hints: [
          String.raw`אפסי $f'$ הם שיעורי ה-$x$ של נקודות הקיצון של $f$, ו-$f'<0$ בדיוק היכן ש-$f$ יורדת.`,
          String.raw`נקודת קיצון של $f'$ היא נקודת פיתול של $f$.`,
        ],
        solutionSteps: [
          String.raw`א. בנקודות קיצון של פונקציה גזירה הנגזרת מתאפסת, ולכן $f'(x)=0$ עבור $x=-1$ ועבור $x=1$.`,
          String.raw`ב. $f$ יורדת בין המקסימום למינימום, כלומר ב-$-1<x<1$, ושם $f'(x)<0$. בתחומים $x<-1$ ו-$x>1$ הפונקציה עולה ו-$f'(x)>0$.`,
          String.raw`ג. $f$ קעורה כלפי מטה עבור $x<0$ וכלפי מעלה עבור $x>0$, כלומר $f''<0$ ב-$x<0$ ו-$f''>0$ ב-$x>0$. לכן $f'$ יורדת עד $x=0$ ועולה אחריו.`,
          String.raw`מכאן ש-$f'$ מקבלת את הערך הקטן ביותר שלה ב-$x=0$ – בנקודת הפיתול של $f$, שם הגרף של $f$ יורד בצורה התלולה ביותר.`,
          String.raw`ד. גרף $f'$ חיובי עבור $x<-1$, חותך את ציר $x$ ב-$x=-1$, יורד עד נקודת מינימום ב-$x=0$ (מתחת לציר $x$), עולה וחותך שוב את ציר $x$ ב-$x=1$, ונשאר חיובי עבור $x>1$ – צורה של פרבולה ״מחייכת״.`,
        ],
        finalAnswer: String.raw`א. $x=\pm1$; ב. $-1<x<1$; ג. ב-$x=0$ (נקודת הפיתול של $f$); ד. ״פרבולה מחייכת״ עם אפסים ב-$x=\pm1$ ומינימום ב-$x=0$.`,
        answers: [
          { label: String.raw`האפס השמאלי של $f'$`, value: -1 },
          { label: String.raw`האפס הימני של $f'$`, value: 1 },
          { label: String.raw`$x$ שבו $f'$ מינימלית`, value: 0 },
        ],
      },
      {
        id: 'calc-graph-derivative-6',
        difficulty: 2,
        statement: String.raw`בשרטוט מתוארים שני גרפים, I ו-II. אחד מהם הוא גרף של פונקציה $f$, והשני הוא גרף של פונקציית הנגזרת $f'$. גרף I הוא פרבולה החותכת את ציר $x$ בראשית ובנקודה $(4,0)$, וקודקודה $(2,4)$. לגרף II יש נקודת מינימום בראשית ונקודת מקסימום שבה $x=4$ (ראו שרטוט).

א. קבעו איזה גרף הוא של $f$ ואיזה של $f'$. נמקו.

ב. מהו שיפוע המשיק לגרף $f$ בנקודה שבה $x=2$?

ג. מצאו את שיעור ה-$x$ של נקודת הפיתול של $f$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="150.2" x2="312" y2="150.2" stroke-width="1.5"/>
  <polyline points="306,146.2 312,150.2 306,154.2" stroke-width="1.5"/>
  <line x1="66.1" y1="228" x2="66.1" y2="6" stroke-width="1.5"/>
  <polyline points="62.1,12 66.1,6 70.1,12" stroke-width="1.5"/>
  <text x="310" y="142.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="78.1" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="18,215.2 27.5,200.2 35.8,187.9 44,176.5 52.3,166 60.6,156.2 68.9,147.3 77.2,139.2 86.6,131 94.9,124.7 104.4,118.5 112.7,114 121,110.4 129.2,107.5 137.5,105.5 145.8,104.3 155.3,104 163.5,104.6 173,106.3 181.3,108.7 189.6,111.9 197.9,115.9 206.2,120.8 214.4,126.5 223.9,134 232.2,141.5 240.5,149.9 249.9,160.4 258.2,170.5 266.5,181.4 274.8,193.2 283.1,205.8 292.5,221.2"/>
  <polyline points="18,117.1 25.1,126.7 33.4,135.7 36.9,138.8 41.7,142.4 45.2,144.6 49.9,146.9 53.5,148.2 58.2,149.5 61.8,150 66.5,150.2 71.3,149.9 76,149.1 80.7,147.8 85.5,146 92.6,142.6 100.8,137.5 109.1,131.5 118.6,123.5 135.1,107.6 176.6,64.6 187.2,54.5 197.9,45.5 208.5,37.9 218,32.6 222.7,30.5 227.5,28.9 235.7,27.1 240.5,26.8 245.2,27 249.9,27.8 253.5,28.8 258.2,30.7 261.8,32.5 266.5,35.6 270,38.3 274.8,42.6 278.3,46.3 286.6,56.7 294.9,69.6 302,82.8"/>
  <circle cx="153.4" cy="104" r="3.5" fill="currentColor" stroke="none"/>
  <text x="157.4" y="126" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(2,4)</text>
  <circle cx="240.8" cy="26.8" r="3.5" fill="currentColor" stroke="none"/>
  <line x1="240.8" y1="150.2" x2="240.8" y2="26.8" stroke-dasharray="6 4" stroke-width="1.5"/>
  <line x1="240.8" y1="146.2" x2="240.8" y2="154.2" stroke-width="1.5"/>
  <text x="250.8" y="168.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">4</text>
  <circle cx="240.8" cy="150.2" r="3.5" fill="currentColor" stroke="none"/>
  <text x="23.3" y="187.3" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">I</text>
  <text x="296.7" y="64.6" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">II</text>
</svg>`,
        hints: [
          String.raw`בדקו: האם האפסים של גרף I נמצאים מתחת לנקודות הקיצון של גרף II? ולהפך – האם לגרף II יש אפס מתחת לנקודת הקיצון של גרף I?`,
          String.raw`שיפוע המשיק ל-$f$ ב-$x=2$ הוא הערך של $f'$ ב-$x=2$. נקודת פיתול של $f$ היא נקודת קיצון של $f'$.`,
        ],
        solutionSteps: [
          String.raw`א. גרף I מתאפס ב-$x=0$ וב-$x=4$ – בדיוק בשיעורי ה-$x$ של נקודות הקיצון של גרף II. בנוסף, גרף I חיובי ב-$0<x<4$, ושם גרף II עולה; גרף I שלילי ב-$x<0$ וב-$x>4$, ושם גרף II יורד.`,
          String.raw`לכן גרף I הוא גרף הנגזרת $f'$, וגרף II הוא גרף הפונקציה $f$. ההפך אינו אפשרי: לגרף I יש קיצון ב-$x=2$, אבל גרף II אינו מתאפס ב-$x=2$.`,
          String.raw`ב. שיפוע המשיק לגרף $f$ ב-$x=2$ הוא $f'(2)$ – ערך ה-$y$ של גרף I ב-$x=2$. זה הקודקוד $(2,4)$, ולכן השיפוע הוא $4$.`,
          String.raw`ג. ל-$f'$ (גרף I) יש מקסימום ב-$x=2$: היא עולה לפניו ויורדת אחריו, כלומר $f''$ מחליפה שם סימן מ-$+$ ל-$-$. לכן ב-$x=2$ יש ל-$f$ נקודת פיתול (מ-$\cup$ ל-$\cap$), ובה שיפוע המשיק לגרף $f$ הוא הגדול ביותר.`,
        ],
        finalAnswer: String.raw`I הוא גרף $f'$ ו-II הוא גרף $f$; השיפוע ב-$x=2$ הוא $4$; נקודת הפיתול של $f$ ב-$x=2$.`,
        answers: [
          { label: 'שיפוע המשיק ב-$x=2$', value: 4 },
          { label: 'נקודת הפיתול של $f$: $x$', value: 2 },
        ],
      },
      {
        id: 'calc-graph-derivative-7',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=-x^3+3x^2+9x-2$.

מצאו את הנקודה על גרף הפונקציה שבה שיפוע המשיק לגרף הוא הגדול ביותר, ואת השיפוע הזה.`,
        hints: [
          String.raw`שיפוע המשיק בנקודה הוא $f'(x)$. אתם מחפשים מקסימום של הפונקציה $f'(x)$.`,
          String.raw`גזרו את $f'$: נקודת הקיצון של $f'$ נמצאת היכן ש-$f''(x)=0$ – בנקודת הפיתול של $f$.`,
        ],
        solutionSteps: [
          String.raw`שיפוע המשיק בנקודה שבה $x$ הוא $f'(x)=-3x^2+6x+9$. זו פרבולה ״בוכה״, ולכן יש לה מקסימום.`,
          String.raw`$f''(x)=-6x+6=0$ עבור $x=1$; $f''>0$ עבור $x<1$ ו-$f''<0$ עבור $x>1$, כלומר $f'$ עולה ואחר כך יורדת – מקסימום של $f'$ ב-$x=1$.`,
          String.raw`השיפוע המקסימלי: $f'(1)=-3+6+9=12$.`,
          String.raw`הנקודה על הגרף: $f(1)=-1+3+9-2=9$, כלומר $(1,9)$ – וזו בדיוק נקודת הפיתול של $f$.`,
        ],
        finalAnswer: String.raw`בנקודה $(1,9)$ (נקודת הפיתול); השיפוע המקסימלי $12$.`,
        answers: [
          { label: '$x$', value: 1 },
          { label: '$y$', value: 9 },
          { label: 'השיפוע המקסימלי', value: 12 },
        ],
      },
      {
        id: 'calc-graph-derivative-8',
        difficulty: 2,
        statement: String.raw`הפונקציה $f$ מוגדרת לכל $x$ והיא **זוגית**. בשרטוט מתואר גרף פונקציית הנגזרת $f'$ עבור $x\ge0$ בלבד: $f'(0)=0$, $f'(x)<0$ עבור $0<x<2$, $f'(2)=0$ ו-$f'(x)>0$ עבור $x>2$ (ראו שרטוט).

א. הראו ש-$f'$ היא פונקציה אי-זוגית, ותארו את גרף $f'$ עבור $x<0$.

ב. מצאו את שיעורי ה-$x$ של כל נקודות הקיצון של $f$ וקבעו את סוגן.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="152.1" x2="312" y2="152.1" stroke-width="1.5"/>
  <polyline points="306,148.1 312,152.1 306,156.1" stroke-width="1.5"/>
  <line x1="160" y1="228" x2="160" y2="6" stroke-width="1.5"/>
  <polyline points="156,12 160,6 164,12" stroke-width="1.5"/>
  <text x="310" y="144.1" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="172" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="160,152.1 174.8,173.1 185.4,186.7 194.9,196.8 199.6,200.8 203.8,203.8 208.5,206.4 212.7,207.9 216.8,208.7 220.9,208.6 225.1,207.6 228.6,206.1 232.8,203.3 236.3,200.1 240.5,195.4 244,190.4 248.2,183.4 251.7,176.4 258.8,159.4 265.9,138.2 273,112.5 279.5,84.8 286,52.7 292.5,16.1"/>
  <line x1="261.4" y1="148.1" x2="261.4" y2="156.1" stroke-width="1.5"/>
  <text x="249.4" y="144.1" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">2</text>
  <circle cx="261.4" cy="152.1" r="3.5" fill="currentColor" stroke="none"/>
  <text x="281.9" y="41.7" text-anchor="end" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f′</text>
</svg>`,
        hints: [
          String.raw`גזרו את שני האגפים של $f(-x)=f(x)$. אל תשכחו את הנגזרת הפנימית של $-x$.`,
          String.raw`גרף של פונקציה אי-זוגית סימטרי ביחס לראשית: אם $f'<0$ ב-$0<x<2$, אז $f'>0$ ב-$-2<x<0$.`,
        ],
        solutionSteps: [
          String.raw`א. $f$ זוגית, כלומר $f(-x)=f(x)$ לכל $x$. גוזרים את שני האגפים (כלל השרשרת באגף שמאל): $f'(-x)\cdot(-1)=f'(x)$, ולכן $f'(-x)=-f'(x)$ – $f'$ אי-זוגית.`,
          String.raw`לכן גרף $f'$ עבור $x<0$ הוא שיקוף של החלק הנתון ביחס לראשית: $f'(-2)=0$, $f'(x)>0$ עבור $-2<x<0$, ו-$f'(x)<0$ עבור $x<-2$.`,
          String.raw`ב. טבלת הסימנים של $f'$: שלילית ב-$x<-2$, חיובית ב-$-2<x<0$, שלילית ב-$0<x<2$, חיובית ב-$x>2$.`,
          String.raw`ב-$x=-2$ וב-$x=2$ הנגזרת עוברת מ-$-$ ל-$+$ – נקודות מינימום. ב-$x=0$ היא עוברת מ-$+$ ל-$-$ – נקודת מקסימום.`,
        ],
        finalAnswer: String.raw`$f'$ אי-זוגית; מקסימום ב-$x=0$, מינימום ב-$x=-2$ וב-$x=2$.`,
        answers: [
          { label: 'נקודת המקסימום: $x$', value: 0 },
          { label: 'המינימום השמאלי: $x$', value: -2 },
          { label: 'המינימום הימני: $x$', value: 2 },
        ],
      },
      {
        id: 'calc-graph-derivative-9',
        difficulty: 3,
        statement: String.raw`בשרטוט מתואר גרף פונקציית הנגזרת $f'$ של פונקציה $f$ המוגדרת לכל $x$. גרף $f'$ הוא פרבולה שקודקודה $(1,-4)$, והיא חותכת את ציר $x$ בנקודות שבהן $x=-1$ ו-$x=3$ (ראו שרטוט).

נגדיר $g(x)=f(x)+kx$, כאשר $k$ פרמטר.

א. הביעו את $g'(x)$ באמצעות $f'(x)$, והסבירו כיצד מתקבל גרף $g'$ מגרף $f'$.

ב. עבור $k=3$ מצאו את שיעורי ה-$x$ של נקודות הקיצון של $g$ וקבעו את סוגן.

ג. מצאו את כל ערכי $k$ שעבורם ל-$g$ אין נקודות קיצון.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="117.2" x2="312" y2="117.2" stroke-width="1.5"/>
  <polyline points="306,113.2 312,117.2 306,121.2" stroke-width="1.5"/>
  <line x1="114.2" y1="228" x2="114.2" y2="6" stroke-width="1.5"/>
  <polyline points="110.2,12 114.2,6 118.2,12" stroke-width="1.5"/>
  <text x="310" y="109.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="126.2" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="19.2,18.7 27.5,38.2 36.9,59 45.2,76 54.7,94 63,108.4 72.4,123.4 80.7,135.3 89,146.1 97.3,155.6 106.8,165.1 116.2,173 124.5,178.6 134,183.6 142.3,186.8 151.7,188.9 160,189.5 169.5,188.7 177.8,186.8 186,183.6 195.5,178.6 205,172.1 213.3,165.1 222.7,155.6 231,146.1 240.5,133.7 248.7,121.6 258.2,106.4 266.5,91.8 274.8,76 283.1,59 291.4,40.9 300.8,18.7"/>
  <line x1="68.4" y1="113.2" x2="68.4" y2="121.2" stroke-width="1.5"/>
  <text x="52.4" y="137.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">−1</text>
  <line x1="251.6" y1="113.2" x2="251.6" y2="121.2" stroke-width="1.5"/>
  <text x="265.6" y="137.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">3</text>
  <circle cx="68.4" cy="117.2" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="251.6" cy="117.2" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="160" cy="189.5" r="3.5" fill="currentColor" stroke="none"/>
  <text x="160" y="213.5" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(1,−4)</text>
  <text x="280.3" y="44.9" text-anchor="end" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f′</text>
</svg>`,
        hints: [
          String.raw`$g'(x)=f'(x)+k$: גרף $g'$ הוא גרף $f'$ מוזז $k$ יחידות כלפי מעלה.`,
          String.raw`מהשרטוט $f'(x)=a(x+1)(x-3)$; את $a$ מוצאים מהקודקוד.`,
          String.raw`ל-$g$ יש קיצון רק אם גרף $g'$ חוצה את ציר $x$. מתי הפרבולה המוזזת כולה מעל ציר $x$ או רק נוגעת בו?`,
        ],
        solutionSteps: [
          String.raw`א. $g'(x)=f'(x)+k$, ולכן גרף $g'$ הוא גרף $f'$ מוזז $k$ יחידות כלפי מעלה (כלפי מטה כש-$k<0$). זו עדיין פרבולה ״מחייכת״, וקודקודה $(1,-4+k)$.`,
          String.raw`ב. מהשרטוט $f'(x)=a(x+1)(x-3)$, והקודקוד נותן $f'(1)=a\cdot2\cdot(-2)=-4$, כלומר $a=1$ ו-$f'(x)=x^2-2x-3$.`,
          String.raw`עבור $k=3$: $g'(x)=x^2-2x-3+3=x(x-2)$. הנגזרת מתאפסת ב-$x=0$ וב-$x=2$; היא חיובית עבור $x<0$, שלילית ב-$0<x<2$ וחיובית עבור $x>2$. לכן ל-$g$ יש מקסימום ב-$x=0$ ומינימום ב-$x=2$.`,
          String.raw`ג. ל-$g$ אין קיצון אם ורק אם $g'$ אינה מחליפה סימן, כלומר הפרבולה $g'$ אינה יורדת מתחת לציר $x$: ערך הקודקוד שלה מקיים $-4+k\ge0$.`,
          String.raw`עבור $k>4$: $g'(x)>0$ לכל $x$. עבור $k=4$: $g'(x)=(x-1)^2\ge0$, והנגזרת מתאפסת רק ב-$x=1$ בלי להחליף סימן – גם אז אין קיצון (יש משיק אופקי בנקודת פיתול). עבור $k<4$ הפרבולה חוצה את ציר $x$ פעמיים, ויש שתי נקודות קיצון.`,
        ],
        finalAnswer: String.raw`א. $g'(x)=f'(x)+k$ (הזזה של גרף $f'$ ב-$k$ יחידות כלפי מעלה); ב. מקסימום ב-$x=0$, מינימום ב-$x=2$; ג. $k\ge4$.`,
        answers: [
          { label: 'ב: נקודת המקסימום של $g$', value: 0 },
          { label: 'ב: נקודת המינימום של $g$', value: 2 },
          { label: 'ג: הערך הקטן ביותר של $k$', value: 4 },
        ],
      },
      {
        id: 'calc-graph-derivative-10',
        difficulty: 3,
        statement: String.raw`הפונקציה $f$ מוגדרת לכל $x\ne1$. בשרטוט מתואר גרף פונקציית הנגזרת $f'$: לגרף אסימפטוטה אנכית $x=1$ ואסימפטוטה אופקית $y=1$, הוא חותך את ציר $x$ רק בנקודות שבהן $x=-1$ ו-$x=3$, הוא יורד בתחום $x<1$ ועולה בתחום $x>1$ (ראו שרטוט).

א. מצאו את תחומי העלייה והירידה של $f$ ואת שיעורי ה-$x$ של נקודות הקיצון שלה, וקבעו את סוגן.

ב. מצאו את תחומי הקעירות של $f$. האם יש ל-$f$ נקודת פיתול? נמקו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="94.8" x2="312" y2="94.8" stroke-width="1.5"/>
  <polyline points="306,90.8 312,94.8 306,98.8" stroke-width="1.5"/>
  <line x1="132.7" y1="228" x2="132.7" y2="6" stroke-width="1.5"/>
  <polyline points="128.7,12 132.7,6 136.7,12" stroke-width="1.5"/>
  <text x="310" y="86.8" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="144.7" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="18,69 37.2,70.5 52.8,72.3 65.9,74.7 77.3,77.7 86.9,81.4 95,85.9 101.8,91.1 107.8,97.6 113.1,105.6 117.7,115.1 121.6,125.9 125.2,139 128.4,154.9 131.2,173.6 133.7,195.2 135.8,219.2"/>
  <polyline points="184.2,219.2 186.3,195.2 188.8,173.6 191.6,154.9 194.8,139 198.4,125.9 202.3,115.1 206.9,105.6 212.2,97.6 218.2,91.1 225,85.9 233.1,81.4 242.7,77.7 254.1,74.7 267.2,72.3 282.8,70.5 302,69"/>
  <line x1="160" y1="222" x2="160" y2="16" stroke-dasharray="6 4" stroke-width="1.5"/>
  <line x1="18" y1="64.5" x2="302" y2="64.5" stroke-dasharray="6 4" stroke-width="1.5"/>
  <line x1="105.4" y1="90.8" x2="105.4" y2="98.8" stroke-width="1.5"/>
  <text x="89.4" y="114.8" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">−1</text>
  <line x1="214.6" y1="90.8" x2="214.6" y2="98.8" stroke-width="1.5"/>
  <text x="228.6" y="114.8" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">3</text>
  <circle cx="105.4" cy="94.8" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="214.6" cy="94.8" r="3.5" fill="currentColor" stroke="none"/>
  <text x="184" y="32" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x=1</text>
  <text x="302" y="56.5" text-anchor="end" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y=1</text>
  <text x="97.2" y="170.5" text-anchor="end" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f′</text>
</svg>`,
        hints: [
          String.raw`בטבלת הסימנים של $f'$ כללו את $x=1$ כנקודה שבה $f$ אינה מוגדרת.`,
          String.raw`בקטע שבו $f'$ יורדת מתקיים $f''<0$, ולכן $f$ קעורה כלפי מטה. נקודת פיתול חייבת להיות נקודה בתחום ההגדרה של $f$.`,
        ],
        solutionSteps: [
          String.raw`א. לפי השרטוט: $f'(x)>0$ עבור $x<-1$; $f'(x)<0$ עבור $-1<x<1$ ועבור $1<x<3$; $f'(x)>0$ עבור $x>3$.`,
          String.raw`לכן $f$ עולה ב-$x<-1$ וב-$x>3$, ויורדת ב-$-1<x<1$ וב-$1<x<3$ (שני תחומים נפרדים, כי $x=1$ אינו בתחום ההגדרה).`,
          String.raw`ב-$x=-1$ הנגזרת עוברת מ-$+$ ל-$-$ – מקסימום; ב-$x=3$ היא עוברת מ-$-$ ל-$+$ – מינימום. ב-$x=1$ אין קיצון, כי $f$ אינה מוגדרת שם.`,
          String.raw`ב. $f'$ יורדת בתחום $x<1$, ולכן $f''<0$ שם ו-$f$ קעורה כלפי מטה ($\cap$); $f'$ עולה בתחום $x>1$, ולכן $f''>0$ ו-$f$ קעורה כלפי מעלה ($\cup$).`,
          String.raw`הקעירות מתחלפת רק ב-$x=1$, אבל $x=1$ אינו בתחום ההגדרה של $f$, ולכן אין ל-$f$ נקודת פיתול.`,
        ],
        finalAnswer: String.raw`עולה ב-$x<-1$ וב-$x>3$, יורדת ב-$-1<x<1$ וב-$1<x<3$; מקסימום ב-$x=-1$, מינימום ב-$x=3$; $\cap$ ב-$x<1$, $\cup$ ב-$x>1$, ואין נקודת פיתול.`,
        answers: [
          { label: 'נקודת המקסימום: $x$', value: -1 },
          { label: 'נקודת המינימום: $x$', value: 3 },
        ],
      },
    ],
  },
  'calc-extremum-problems': {
    intro: String.raw`בבעיית קיצון גרפית נקודה ״זזה״ על גרף של פונקציה נתונה, ומחפשים את המיקום שבו גודל מסוים – שטח של מלבן או של משולש, אורך של קטע, מרחק – מקסימלי או מינימלי. השיטה קבועה: מסמנים נקודה כללית על הגרף $(x,f(x))$, מבטאים את הגודל כפונקציה של משתנה אחד, רושמים את תחום המשתנה, גוזרים, משווים לאפס ומוכיחים שזה אכן מקסימום או מינימום. זו שאלה 8 בבגרות. לפי המיקוד נשארו **רק בעיות קיצון גרפיות**: בעיות מילוליות (מספרים, גופים, תנועה, כלכלה), בעיות קיצון גאומטריות בלי גרף ובעיות קיצון עם פונקציות טריגונומטריות ירדו.`,
    keyFacts: [
      String.raw`**נקודה כללית על הגרף**: נקודה $P$ על גרף $f$ היא $P\left(x,f(x)\right)$. אם $P$ ברביע הראשון – $x>0$ וגם $f(x)>0$; תנאים כאלה קובעים את **תחום המשתנה**.`,
      String.raw`**שטחים נפוצים**: מלבן שקודקוד אחד שלו בראשית והקודקוד הנגדי $P$: $S=x\cdot f(x)$. מלבן סימטרי מתחת לגרף של פונקציה זוגית: $S=2x\cdot f(x)$. משולש שבסיסו על ציר $x$ וקודקודו $P$: הגובה הוא $f(x)$.`,
      String.raw`**קטע אנכי ומרחק**: אורך הקטע בין $(x,f(x))$ ל-$(x,g(x))$ הוא $f(x)-g(x)$ כאשר גרף $f$ מעל גרף $g$. המרחק בין $P(x,f(x))$ לנקודה $A(a,b)$ הוא $d=\sqrt{(x-a)^2+(f(x)-b)^2}$, ו-$d$ מינימלי בדיוק כאשר $d^2$ מינימלי – לכן נוח לגזור את $d^2$.`,
      String.raw`**משיק ומשולש עם הצירים**: משוואת המשיק בנקודה שבה $x=t$ היא $y-f(t)=f'(t)(x-t)$. מציבים $x=0$ ו-$y=0$ כדי למצוא את נקודות החיתוך עם הצירים, ושטח המשולש הוא חצי מכפלת שני הקטעים.`,
      String.raw`**הוכחת סוג הקיצון**: אחרי שפותרים $S'(x)=0$ בודקים את הסימן של $S'$ משני הצדדים (טבלה) או את $S''$. אם בתחום יש נקודה חשודה אחת בלבד והיא מקסימום מקומי – זה המקסימום המוחלט.`,
      String.raw`**סדר העבודה**: (1) שרטוט וסימון הנקודה הכללית; (2) ביטוי הגודל במשתנה אחד; (3) תחום המשתנה; (4) גזירה והשוואה לאפס; (5) הוכחת סוג הקיצון; (6) תשובה למה שנשאל – שיעורי הנקודה ו/או הערך הקיצוני.`,
    ],
    exercises: [
      {
        id: 'calc-extremum-problems-1',
        difficulty: 1,
        statement: String.raw`הנקודה $P$ נמצאת על הישר $y=6-2x$ ברביע הראשון. מ-$P$ מורידים אנכים לצירים, ונוצר מלבן שאחד מקודקודיו בראשית הצירים.

מצאו את שיעורי $P$ שעבורם שטח המלבן מקסימלי, ואת השטח המקסימלי.`,
        hints: [
          String.raw`$P(x,6-2x)$; ברביע הראשון $x>0$ וגם $6-2x>0$, כלומר $0<x<3$.`,
          String.raw`שטח המלבן: $S(x)=x(6-2x)$. גזרו והשוו לאפס.`,
        ],
        solutionSteps: [
          String.raw`$P(x,6-2x)$ ברביע הראשון, ולכן $x>0$ ו-$6-2x>0$: תחום המשתנה $0<x<3$.`,
          String.raw`צלעות המלבן הן $x$ (רוחב) ו-$6-2x$ (גובה), ולכן $S(x)=x(6-2x)=6x-2x^2$.`,
          String.raw`$S'(x)=6-4x=0\Rightarrow x=1.5$. $S''(x)=-4<0$, ולכן זו נקודת מקסימום – והיחידה בתחום, ולכן מוחלטת.`,
          String.raw`$y_P=6-2\cdot1.5=3$, כלומר $P(1.5,3)$, והשטח המקסימלי $S=1.5\cdot3=4.5$.`,
        ],
        finalAnswer: String.raw`$P(1.5,3)$; השטח המקסימלי $4.5$.`,
        answers: [
          { label: '$x_P$', value: 1.5 },
          { label: '$y_P$', value: 3 },
          { label: 'השטח המקסימלי', value: 4.5 },
        ],
      },
      {
        id: 'calc-extremum-problems-2',
        difficulty: 1,
        statement: String.raw`נתונות הפונקציות $f(x)=x^2-4x+7$ ו-$g(x)=x-1$. ישר המקביל לציר $y$ חותך את גרף $f$ בנקודה $A$ ואת גרף $g$ בנקודה $B$. גרף $f$ נמצא כולו מעל גרף $g$.

מצאו את שיעור ה-$x$ של הישר שעבורו אורך הקטע $AB$ מינימלי, ואת האורך המינימלי.`,
        hints: [
          String.raw`לשתי הנקודות אותו שיעור $x$: $A(x,f(x))$ ו-$B(x,g(x))$, ולכן $AB=f(x)-g(x)$.`,
          String.raw`$AB(x)=x^2-5x+8$ – גזרו והשוו לאפס.`,
        ],
        solutionSteps: [
          String.raw`הקטע $AB$ מקביל לציר $y$, ולכן $A(x,x^2-4x+7)$ ו-$B(x,x-1)$, וגרף $f$ מעל גרף $g$: $AB=f(x)-g(x)$.`,
          String.raw`$AB(x)=x^2-4x+7-(x-1)=x^2-5x+8$ לכל $x$ (הביטוי חיובי, כי הדיסקרימיננטה $25-32$ שלילית).`,
          String.raw`$AB'(x)=2x-5=0\Rightarrow x=2.5$; $AB''(x)=2>0$, ולכן מינימום.`,
          String.raw`$AB(2.5)=6.25-12.5+8=1.75$.`,
        ],
        finalAnswer: String.raw`$x=2.5$; האורך המינימלי $1.75$.`,
        answers: [
          { label: '$x$', value: 2.5 },
          { label: 'האורך המינימלי של $AB$', value: 1.75 },
        ],
      },
      {
        id: 'calc-extremum-problems-3',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=27-x^2$. במלבן $ABCD$ הקודקודים $A$ ו-$D$ נמצאים על ציר $x$, והקודקודים $B$ ו-$C$ נמצאים על גרף הפונקציה מעל ציר $x$ (ראו שרטוט). נסמן את שיעור ה-$x$ של $B$ ב-$x$ ($x>0$).

מצאו את $x$ שעבורו שטח המלבן מקסימלי, ואת השטח המקסימלי.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <polygon points="114.2,206.2 205.8,206.2 205.8,60.4 114.2,60.4" fill="currentColor" fill-opacity="0.15" stroke="none"/>
  <line x1="14" y1="206.2" x2="312" y2="206.2" stroke-width="1.5"/>
  <polyline points="306,202.2 312,206.2 306,210.2" stroke-width="1.5"/>
  <line x1="160" y1="228" x2="160" y2="6" stroke-width="1.5"/>
  <polyline points="156,12 160,6 164,12" stroke-width="1.5"/>
  <text x="310" y="198.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="172" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="36,220.8 43.5,199 52,175.8 59.5,157 67,139.5 75.6,121.2 83,106.6 90.5,93.3 98,81.5 105.5,70.9 113,61.7 120.5,53.9 129,46.6 136.5,41.7 144,38.1 148.2,36.7 152.5,35.7 160,35 167.5,35.7 171.8,36.7 176,38.1 183.5,41.7 191,46.6 198.5,52.9 206,60.5 213.4,69.5 222,81.5 229.5,93.3 237,106.6 244.4,121.2 253,139.5 260.5,157 268,175.8 275.4,196 284,220.8"/>
  <polygon points="114.2,206.2 205.8,206.2 205.8,60.4 114.2,60.4" stroke-width="1.5"/>
  <text x="217.8" y="56.4" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">B</text>
  <text x="102.2" y="56.4" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">C</text>
  <text x="215.8" y="224.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">A</text>
  <text x="104.2" y="224.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">D</text>
  <text x="293.1" y="182.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f</text>
</svg>`,
        hints: [
          String.raw`$f$ זוגית, ולכן $B(x,27-x^2)$ ו-$C(-x,27-x^2)$. רוחב המלבן $2x$.`,
          String.raw`$S(x)=2x\left(27-x^2\right)$ עבור $0<x<\sqrt{27}$.`,
        ],
        solutionSteps: [
          String.raw`הפונקציה זוגית, ולכן $B(x,27-x^2)$ ו-$C(-x,27-x^2)$ נמצאות באותו גובה, ו-$A(x,0)$, $D(-x,0)$.`,
          String.raw`רוחב המלבן $BC=2x$ וגובהו $AB=27-x^2$. כדי ש-$B$ יהיה מעל ציר $x$: $0<x<\sqrt{27}$.`,
          String.raw`$S(x)=2x\left(27-x^2\right)=54x-2x^3$, ו-$S'(x)=54-6x^2=0\Rightarrow x^2=9\Rightarrow x=3$ (בתחום).`,
          String.raw`$S''(x)=-12x$, ו-$S''(3)=-36<0$, ולכן מקסימום.`,
          String.raw`$S(3)=6\cdot18=108$.`,
        ],
        finalAnswer: String.raw`$x=3$ (הקודקודים העליונים $(\pm3,18)$); השטח המקסימלי $108$.`,
        answers: [
          { label: '$x$', value: 3 },
          { label: 'השטח המקסימלי', value: 108 },
        ],
      },
      {
        id: 'calc-extremum-problems-4',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\sqrt{12-x}$. הנקודה $P$ נמצאת על גרף הפונקציה ברביע הראשון, הנקודה $Q$ היא היטל $P$ על ציר $x$, ו-$O$ היא ראשית הצירים (ראו שרטוט).

מצאו את שיעורי $P$ שעבורם שטח המשולש $OPQ$ מקסימלי, ואת השטח המקסימלי.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <polygon points="38,192.6 138,192.6 138,81.3" fill="currentColor" fill-opacity="0.15" stroke="none"/>
  <line x1="14" y1="192.6" x2="312" y2="192.6" stroke-width="1.5"/>
  <polyline points="306,188.6 312,192.6 306,196.6" stroke-width="1.5"/>
  <line x1="38" y1="228" x2="38" y2="6" stroke-width="1.5"/>
  <polyline points="34,12 38,6 42,12" stroke-width="1.5"/>
  <text x="310" y="184.6" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="50" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="18,41 49.2,50.4 78.7,59.8 106,69.3 131.5,78.8 154.9,88.3 176.2,97.7 195.7,107.3 213,116.8 228.2,126.2 241.2,135.5 252.4,145 261.5,154.4 268.5,163.5 271.5,168.6 273.7,173 275.4,177.4 276.7,181.9 277.6,186.4 278,192.6"/>
  <polygon points="38,192.6 138,192.6 138,81.3" stroke-width="1.5"/>
  <circle cx="138" cy="81.3" r="3.5" fill="currentColor" stroke="none"/>
  <text x="146" y="71.3" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">P</text>
  <text x="138" y="212.6" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">Q</text>
  <text x="26" y="210.6" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">O</text>
  <text x="278" y="212.6" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">12</text>
  <circle cx="278" cy="192.6" r="3.5" fill="currentColor" stroke="none"/>
</svg>`,
        hints: [
          String.raw`$P\left(x,\sqrt{12-x}\right)$ ו-$Q(x,0)$; המשולש ישר זווית ב-$Q$.`,
          String.raw`$S(x)=\frac12x\sqrt{12-x}$ עבור $0<x<12$. גזרו לפי כלל המכפלה ו-$\left(\sqrt{g}\right)'=\frac{g'}{2\sqrt g}$.`,
          String.raw`אחרי מכנה משותף: $S'(x)=\frac{24-3x}{4\sqrt{12-x}}$.`,
        ],
        solutionSteps: [
          String.raw`$P\left(x,\sqrt{12-x}\right)$ ברביע הראשון: $0<x<12$. $Q(x,0)$, ולכן $OQ=x$ ו-$PQ=\sqrt{12-x}$, והזווית ב-$Q$ ישרה.`,
          String.raw`$S(x)=\frac12\cdot OQ\cdot PQ=\frac12x\sqrt{12-x}$.`,
          String.raw`$S'(x)=\frac12\left(\sqrt{12-x}-\frac{x}{2\sqrt{12-x}}\right)=\frac12\cdot\frac{2(12-x)-x}{2\sqrt{12-x}}=\frac{24-3x}{4\sqrt{12-x}}$.`,
          String.raw`$S'(x)=0\Rightarrow x=8$. המכנה חיובי, ולכן $S'>0$ עבור $0<x<8$ ו-$S'<0$ עבור $8<x<12$: מקסימום ב-$x=8$.`,
          String.raw`$P\left(8,\sqrt4\right)=(8,2)$, והשטח המקסימלי $S(8)=\frac12\cdot8\cdot2=8$.`,
        ],
        finalAnswer: String.raw`$P(8,2)$; השטח המקסימלי $8$.`,
        answers: [
          { label: '$x_P$', value: 8 },
          { label: '$y_P$', value: 2 },
          { label: 'השטח המקסימלי', value: 8 },
        ],
      },
      {
        id: 'calc-extremum-problems-5',
        difficulty: 2,
        statement: String.raw`הנקודה $P$ נמצאת על גרף הפונקציה $f(x)=\frac{4}{x^2}$ ברביע הראשון. מ-$P$ מורידים אנכים לצירים, ונוצר מלבן שאחד מקודקודיו בראשית הצירים.

מצאו את שיעורי $P$ שעבורם היקף המלבן מינימלי, ואת ההיקף המינימלי.`,
        hints: [
          String.raw`צלעות המלבן הן $x$ ו-$\frac4{x^2}$, ולכן ההיקף $p(x)=2x+\frac8{x^2}$ עבור $x>0$.`,
          String.raw`$\left(\frac8{x^2}\right)'=\left(8x^{-2}\right)'=-\frac{16}{x^3}$.`,
        ],
        solutionSteps: [
          String.raw`$P\left(x,\frac4{x^2}\right)$ עם $x>0$, וצלעות המלבן הן $x$ ו-$\frac4{x^2}$.`,
          String.raw`ההיקף: $p(x)=2\left(x+\frac4{x^2}\right)=2x+\frac8{x^2}$.`,
          String.raw`$p'(x)=2-\frac{16}{x^3}=0\Rightarrow x^3=8\Rightarrow x=2$.`,
          String.raw`עבור $0<x<2$: $x^3<8$ ולכן $p'(x)<0$; עבור $x>2$: $p'(x)>0$. לכן ב-$x=2$ מינימום, והוא מוחלט כי זו הנקודה החשודה היחידה.`,
          String.raw`$P\left(2,\frac44\right)=(2,1)$, וההיקף המינימלי $p(2)=2(2+1)=6$.`,
        ],
        finalAnswer: String.raw`$P(2,1)$; ההיקף המינימלי $6$.`,
        answers: [
          { label: '$x_P$', value: 2 },
          { label: '$y_P$', value: 1 },
          { label: 'ההיקף המינימלי', value: 6 },
        ],
      },
      {
        id: 'calc-extremum-problems-6',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\sqrt{2x}$ והנקודה $A(5,0)$. הנקודה $P$ נמצאת על גרף הפונקציה (ראו שרטוט).

מצאו את שיעורי הנקודה $P$ הקרובה ביותר לנקודה $A$, ואת המרחק המינימלי.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="183.9" x2="312" y2="183.9" stroke-width="1.5"/>
  <polyline points="306,179.9 312,183.9 306,187.9" stroke-width="1.5"/>
  <line x1="34" y1="228" x2="34" y2="6" stroke-width="1.5"/>
  <polyline points="30,12 34,6 38,12" stroke-width="1.5"/>
  <text x="310" y="175.9" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="46" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="34,183.9 34.4,177.5 35.3,172.8 36.6,168.2 38.4,163.7 40.7,159.1 43.8,153.9 50.9,144.5 60.3,134.8 71.9,125 85.3,115.4 101,105.7 118.8,95.9 138.9,86 160.8,76.3 185,66.5 211.3,56.7 239.5,46.9 269.8,37.2 302,27.5"/>
  <line x1="193.5" y1="183.9" x2="81.8" y2="117.8" stroke-dasharray="6 4" stroke-width="1.5"/>
  <circle cx="193.5" cy="183.9" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="81.8" cy="117.8" r="3.5" fill="currentColor" stroke="none"/>
  <text x="193.5" y="205.9" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">A(5,0)</text>
  <text x="75.8" y="105.8" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">P</text>
  <text x="280.5" y="57.1" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f</text>
</svg>`,
        hints: [
          String.raw`$P\left(x,\sqrt{2x}\right)$ עם $x\ge0$, ולפי נוסחת המרחק $d^2=(x-5)^2+2x$.`,
          String.raw`$d$ מינימלי בדיוק כאשר $d^2$ מינימלי. גזרו את $d^2=x^2-8x+25$.`,
        ],
        solutionSteps: [
          String.raw`$P\left(x,\sqrt{2x}\right)$ עם $x\ge0$. לפי נוסחת המרחק: $d^2=(x-5)^2+\left(\sqrt{2x}-0\right)^2=x^2-10x+25+2x=x^2-8x+25$.`,
          String.raw`נסמן $h(x)=x^2-8x+25$, כך ש-$d=\sqrt{h(x)}$. מכיוון ש-$d'(x)=\frac{h'(x)}{2\sqrt{h(x)}}$, ל-$d'$ ול-$h'$ אותו סימן, ולכן $d$ ו-$h$ מקבלות מינימום באותה נקודה.`,
          String.raw`$h'(x)=2x-8=0\Rightarrow x=4$; $h'<0$ עבור $0\le x<4$ ו-$h'>0$ עבור $x>4$ – מינימום ב-$x=4$.`,
          String.raw`$P\left(4,\sqrt8\right)=\left(4,2\sqrt2\right)$, והמרחק המינימלי $d=\sqrt{16-32+25}=\sqrt9=3$.`,
        ],
        finalAnswer: String.raw`$P\left(4,2\sqrt2\right)$; המרחק המינימלי $3$.`,
        answers: [
          { label: '$x_P$', value: 4 },
          { label: '$y_P$', value: 2.8284271247461903 },
          { label: 'המרחק המינימלי', value: 3 },
        ],
      },
      {
        id: 'calc-extremum-problems-7',
        difficulty: 2,
        statement: String.raw`נתונות הפונקציות $f(x)=\sqrt x$ ו-$g(x)=\frac x4$. הגרפים נחתכים בראשית הצירים ובנקודה $(16,4)$. ישר המקביל לציר $y$ חותך את גרף $f$ בנקודה $A$ ואת גרף $g$ בנקודה $B$, כאשר $0<x<16$ (ראו שרטוט).

מצאו את שיעור ה-$x$ שעבורו אורך הקטע $AB$ מקסימלי, ואת האורך המקסימלי.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="198.2" x2="312" y2="198.2" stroke-width="1.5"/>
  <polyline points="306,194.2 312,198.2 306,202.2" stroke-width="1.5"/>
  <line x1="27.5" y1="228" x2="27.5" y2="6" stroke-width="1.5"/>
  <polyline points="23.5,12 27.5,6 31.5,12" stroke-width="1.5"/>
  <text x="310" y="190.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="39.5" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="27.5,198.2 27.9,191.5 28.8,186.5 30.2,181.7 32,176.9 34.3,172.1 37.5,166.6 44.9,156.6 54.5,146.4 66.4,136 80.1,125.9 96.1,115.6 114.4,105.2 135,94.8 157.4,84.5 182.1,74.2 209.1,63.8 237.9,53.5 269.1,43.2 302,33"/>
  <polyline points="27.5,198.2 302,25.9"/>
  <line x1="169.5" y1="109.1" x2="169.5" y2="79.4" stroke-width="2.5"/>
  <circle cx="169.5" cy="79.4" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="169.5" cy="109.1" r="3.5" fill="currentColor" stroke="none"/>
  <text x="169.5" y="69.4" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">A</text>
  <text x="169.5" y="131.1" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">B</text>
  <text x="216.8" y="51" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f</text>
  <text x="226.3" y="97.4" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">g</text>
  <circle cx="279.9" cy="39.8" r="3.5" fill="currentColor" stroke="none"/>
  <text x="279.9" y="69.8" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(16,4)</text>
</svg>`,
        hints: [
          String.raw`בתחום $0<x<16$ גרף $f$ מעל גרף $g$ (בדקו למשל ב-$x=4$), ולכן $AB=\sqrt x-\frac x4$.`,
          String.raw`$\left(\sqrt x\right)'=\frac1{2\sqrt x}$. פתרו $\frac1{2\sqrt x}=\frac14$.`,
        ],
        solutionSteps: [
          String.raw`בתחום $0<x<16$ גרף $f$ מעל גרף $g$ (למשל ב-$x=4$: $2>1$), ולכן $AB(x)=\sqrt x-\frac x4$.`,
          String.raw`$AB'(x)=\frac1{2\sqrt x}-\frac14=0\Rightarrow\sqrt x=2\Rightarrow x=4$.`,
          String.raw`עבור $0<x<4$: $\sqrt x<2$, ולכן $\frac1{2\sqrt x}>\frac14$ ו-$AB'>0$; עבור $4<x<16$: $AB'<0$. לכן ב-$x=4$ מקסימום.`,
          String.raw`$AB(4)=2-1=1$.`,
        ],
        finalAnswer: String.raw`$x=4$; האורך המקסימלי $1$.`,
        answers: [
          { label: '$x$', value: 4 },
          { label: 'האורך המקסימלי של $AB$', value: 1 },
        ],
      },
      {
        id: 'calc-extremum-problems-8',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=(x-3)^2$. דרך הנקודה $P\left(t,(t-3)^2\right)$ שעל גרף הפונקציה, כאשר $0<t<3$, מעבירים משיק לגרף. המשיק חותך את ציר $x$ בנקודה $A$ ואת ציר $y$ בנקודה $B$ (ראו שרטוט).

א. הראו ש-$A\left(\frac{t+3}{2},0\right)$ ו-$B\left(0,9-t^2\right)$.

ב. מצאו את $t$ שעבורו שטח המשולש $AOB$ ($O$ – ראשית הצירים) מקסימלי, ואת השטח המקסימלי.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <polygon points="41.3,208 157.7,208 41.3,108" fill="currentColor" fill-opacity="0.15" stroke="none"/>
  <line x1="14" y1="208" x2="312" y2="208" stroke-width="1.5"/>
  <polyline points="306,204 312,208 306,212" stroke-width="1.5"/>
  <line x1="41.3" y1="228" x2="41.3" y2="6" stroke-width="1.5"/>
  <polyline points="37.3,12 41.3,6 45.3,12" stroke-width="1.5"/>
  <text x="310" y="200" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="53.3" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="39,22 46.6,41.5 55.4,62.5 63.1,79.8 71.8,98.1 80.6,115.1 88.3,128.7 97,143 104.7,154.4 112.4,164.6 121.2,175 128.8,182.9 137.6,190.7 146.4,197 154,201.3 161.7,204.6 170.5,207 179.2,208 186.9,207.7 194.6,206.3 203.4,203.4 212.1,199 219.8,194.1 228.6,187.1 236.2,179.8 245,170.1 252.7,160.5 260.4,149.8 269.1,136.3 277.9,121.3 285.6,107 293.2,91.7 302,72.8"/>
  <line x1="32" y1="100" x2="165.8" y2="215" stroke-width="1.5"/>
  <circle cx="134.4" cy="188" r="3.5" fill="currentColor" stroke="none"/>
  <text x="144.4" y="180" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">P</text>
  <circle cx="41.3" cy="108" r="3.5" fill="currentColor" stroke="none"/>
  <text x="29.3" y="104" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">B</text>
  <circle cx="157.7" cy="208" r="3.5" fill="currentColor" stroke="none"/>
  <text x="163.7" y="228" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">A</text>
  <line x1="181" y1="204" x2="181" y2="212" stroke-width="1.5"/>
  <text x="181" y="228" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">3</text>
  <text x="274" y="102" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f</text>
</svg>`,
        hints: [
          String.raw`$f'(x)=2(x-3)$, ולכן משוואת המשיק היא $y-(t-3)^2=2(t-3)(x-t)$.`,
          String.raw`הציבו $x=0$ כדי לקבל את $B$, ו-$y=0$ כדי לקבל את $A$ (חלקו ב-$t-3\ne0$).`,
          String.raw`$S(t)=\frac12\cdot\frac{t+3}{2}\cdot\left(9-t^2\right)=\frac{(3-t)(3+t)^2}{4}$.`,
        ],
        solutionSteps: [
          String.raw`א. $f'(x)=2(x-3)$, ולכן שיפוע המשיק ב-$P$ הוא $2(t-3)$ ומשוואתו $y-(t-3)^2=2(t-3)(x-t)$.`,
          String.raw`הצבת $x=0$: $y=(t-3)^2-2t(t-3)=(t-3)(t-3-2t)=(t-3)(-t-3)=9-t^2$, ולכן $B\left(0,9-t^2\right)$.`,
          String.raw`הצבת $y=0$ וחלוקה ב-$t-3\ne0$: $-(t-3)=2(x-t)$, כלומר $x=t-\frac{t-3}{2}=\frac{t+3}{2}$, ולכן $A\left(\frac{t+3}2,0\right)$.`,
          String.raw`ב. עבור $0<t<3$ שני החיתוכים חיוביים, והמשולש ישר זווית ב-$O$: $S(t)=\frac12\cdot\frac{t+3}{2}\cdot\left(9-t^2\right)=\frac{(3-t)(3+t)^2}{4}$.`,
          String.raw`$S'(t)=\frac{-(3+t)^2+2(3-t)(3+t)}{4}=\frac{(3+t)(3-3t)}{4}$. בתחום $3+t>0$, ולכן $S'(t)=0\iff t=1$.`,
          String.raw`עבור $0<t<1$: $S'>0$; עבור $1<t<3$: $S'<0$. לכן ב-$t=1$ מקסימום, ו-$S(1)=\frac{2\cdot16}{4}=8$ (המשיק הוא $y=-4x+8$).`,
        ],
        finalAnswer: String.raw`$t=1$ (הנקודה $P(1,4)$); השטח המקסימלי $8$.`,
        answers: [
          { label: '$t$', value: 1 },
          { label: 'השטח המקסימלי', value: 8 },
        ],
      },
      {
        id: 'calc-extremum-problems-9',
        difficulty: 3,
        statement: String.raw`הנקודות $A(-2,4)$ ו-$B(4,16)$ נמצאות על גרף הפונקציה $f(x)=x^2$. הנקודה $P\left(t,t^2\right)$ נמצאת על קשת הגרף שבין $A$ ל-$B$, כלומר $-2<t<4$ (ראו שרטוט).

א. מצאו את $t$ שעבורו שטח המשולש $ABP$ מקסימלי, ואת השטח המקסימלי.

ב. הראו שבנקודה $P$ שמצאתם המשיק לגרף מקביל לישר $AB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <polygon points="53.5,165 266.5,33.5 213.3,140.4" fill="currentColor" fill-opacity="0.15" stroke="none"/>
  <line x1="14" y1="208.9" x2="312" y2="208.9" stroke-width="1.5"/>
  <polyline points="306,204.9 312,208.9 306,212.9" stroke-width="1.5"/>
  <line x1="124.5" y1="228" x2="124.5" y2="6" stroke-width="1.5"/>
  <polyline points="120.5,12 124.5,6 128.5,12" stroke-width="1.5"/>
  <text x="310" y="200.9" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="136.5" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="18,110.2 25.5,123.6 34,137.6 41.4,148.9 49.9,160.5 58.5,170.9 65.9,179 73.4,186.1 81.9,193.1 90.4,198.8 97.9,202.7 105.3,205.7 112.8,207.7 120.2,208.7 128.8,208.7 136.2,207.7 144.7,205.3 153.3,201.7 160.7,197.5 168.2,192.3 176.7,185.2 185.2,176.8 192.7,168.5 201.2,157.7 208.6,147.3 217.2,134.2 224.6,121.7 233.1,106.2 240.6,91.7 249.1,73.9 256.6,57.2 265.1,37 272.5,18.3"/>
  <polygon points="53.5,165 266.5,33.5 213.3,140.4" stroke-width="1.5"/>
  <circle cx="53.5" cy="165" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="266.5" cy="33.5" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="213.3" cy="140.4" r="3.5" fill="currentColor" stroke="none"/>
  <text x="39.5" y="163" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">A</text>
  <text x="280.5" y="37.5" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">B</text>
  <text x="225.3" y="150.4" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">P</text>
</svg>`,
        hints: [
          String.raw`משוואת הישר $AB$ היא $y=2x+8$. העבירו דרך $P$ קטע אנכי עד הישר: הוא מחלק את המשולש לשני משולשים שבסיסם המשותף הוא הקטע האנכי.`,
          String.raw`אם אורך הקטע האנכי הוא $h(t)=2t+8-t^2$, אז שטח המשולש הוא $\frac12\cdot h(t)\cdot\left(x_B-x_A\right)=3h(t)$.`,
        ],
        solutionSteps: [
          String.raw`שיפוע $AB$: $\frac{16-4}{4-(-2)}=2$, ומשוואת הישר $y-4=2(x+2)$, כלומר $y=2x+8$. בתחום $-2<t<4$ הקשת מתחת לישר: $2t+8-t^2=-(t+2)(t-4)>0$.`,
          String.raw`נעביר דרך $P$ קטע אנכי $PK$ עד הישר: $K(t,2t+8)$ ו-$PK=h(t)=2t+8-t^2$.`,
          String.raw`הקטע $PK$ מחלק את המשולש $ABP$ לשני משולשים עם בסיס משותף $PK$. הגבהים לבסיס זה הם המרחקים האופקיים $t-(-2)$ ו-$4-t$, שסכומם $6$, ולכן $S(t)=\frac12\cdot PK\cdot6=3\left(2t+8-t^2\right)$.`,
          String.raw`$S'(t)=3(2-2t)=0\Rightarrow t=1$; $S''(t)=-6<0$, ולכן מקסימום. $S(1)=3(2+8-1)=27$, ו-$P(1,1)$.`,
          String.raw`ב. $f'(x)=2x$, ולכן שיפוע המשיק ב-$P(1,1)$ הוא $f'(1)=2$ – שווה לשיפוע $AB$, ולכן המשיק מקביל ל-$AB$. זה הגיוני: $P$ היא הנקודה על הקשת שהקטע האנכי ממנה לישר $AB$ הארוך ביותר.`,
        ],
        finalAnswer: String.raw`$t=1$, כלומר $P(1,1)$; השטח המקסימלי $27$; שיפוע המשיק ב-$P$ ושיפוע $AB$ שווים ל-$2$.`,
        answers: [
          { label: '$t$', value: 1 },
          { label: 'השטח המקסימלי', value: 27 },
        ],
      },
      {
        id: 'calc-extremum-problems-10',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=9-x^2$. בטרפז $ABCD$ הבסיס $AD$ הוא הקטע שבין נקודות החיתוך של גרף הפונקציה עם ציר $x$, והקודקודים $B$ ו-$C$ נמצאים על גרף הפונקציה מעל ציר $x$, כך ש-$BC\parallel AD$ (ראו שרטוט). נסמן את שיעור ה-$x$ של $B$ ב-$x$, כאשר $0<x<3$.

מצאו את $x$ שעבורו שטח הטרפז מקסימלי, ואת השטח המקסימלי.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <polygon points="58.6,200.7 261.4,200.7 227.6,111.9 92.4,111.9" fill="currentColor" fill-opacity="0.15" stroke="none"/>
  <line x1="14" y1="200.7" x2="312" y2="200.7" stroke-width="1.5"/>
  <polyline points="306,196.7 312,200.7 306,204.7" stroke-width="1.5"/>
  <line x1="160" y1="228" x2="160" y2="6" stroke-width="1.5"/>
  <polyline points="156,12 160,6 164,12" stroke-width="1.5"/>
  <text x="310" y="192.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="172" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="52.7,219.7 59.4,198 66.1,177.8 72.8,158.9 79.5,141.5 86.2,125.4 92.9,110.7 99.6,97.4 106.4,85.6 113.1,75.1 119.8,66 126.5,58.3 133.2,52 139.9,47.1 146.6,43.7 153.3,41.6 160,40.9 166.7,41.6 173.4,43.7 180.1,47.1 186.8,52 193.5,58.3 200.2,66 206.9,75.1 213.6,85.6 220.3,97.4 227.1,110.7 233.8,125.4 240.5,141.5 247.2,158.9 253.9,177.8 260.6,198 267.3,219.7"/>
  <polygon points="58.6,200.7 261.4,200.7 227.6,111.9 92.4,111.9" stroke-width="1.5"/>
  <text x="275.4" y="220.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">A</text>
  <text x="44.6" y="220.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">D</text>
  <text x="239.6" y="109.9" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">B</text>
  <text x="80.4" y="109.9" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">C</text>
</svg>`,
        hints: [
          String.raw`$A(3,0)$, $D(-3,0)$, $B(x,9-x^2)$, $C(-x,9-x^2)$. הבסיסים: $AD=6$ ו-$BC=2x$; הגובה $9-x^2$.`,
          String.raw`$S(x)=\frac{6+2x}{2}\left(9-x^2\right)=(3+x)\left(9-x^2\right)$. פתחו סוגריים לפני הגזירה.`,
          String.raw`$S'(x)=-3x^2-6x+9=-3(x+3)(x-1)$.`,
        ],
        solutionSteps: [
          String.raw`חיתוך עם ציר $x$: $9-x^2=0\Rightarrow x=\pm3$, ולכן $A(3,0)$, $D(-3,0)$ ו-$AD=6$.`,
          String.raw`$f$ זוגית, ולכן $B(x,9-x^2)$ ו-$C(-x,9-x^2)$ באותו גובה: $BC=2x$ וגובה הטרפז $9-x^2$, עם $0<x<3$.`,
          String.raw`$S(x)=\frac{AD+BC}{2}\cdot h=\frac{6+2x}{2}\left(9-x^2\right)=(3+x)\left(9-x^2\right)=27+9x-3x^2-x^3$.`,
          String.raw`$S'(x)=9-6x-3x^2=-3\left(x^2+2x-3\right)=-3(x+3)(x-1)$. בתחום $x+3>0$, ולכן $S'(x)=0\iff x=1$.`,
          String.raw`עבור $0<x<1$: $S'>0$; עבור $1<x<3$: $S'<0$. לכן ב-$x=1$ מקסימום.`,
          String.raw`$S(1)=4\cdot8=32$ (הקודקודים העליונים $B(1,8)$ ו-$C(-1,8)$).`,
        ],
        finalAnswer: String.raw`$x=1$; השטח המקסימלי $32$.`,
        answers: [
          { label: '$x$', value: 1 },
          { label: 'השטח המקסימלי', value: 32 },
        ],
      },
    ],
  },
  'calc-indefinite-integral': {
    intro: String.raw`אינטגרל לא מסוים הוא הפעולה ההפוכה לגזירה: מחפשים **פונקציה קדומה** $F$ שהנגזרת שלה היא הפונקציה הנתונה, ומוסיפים קבוע אינטגרציה $C$. בסעיף לומדים אינטגרלים של פולינומים, של חזקות (גם שליליות) של $x$ ושל ביטוי ליניארי, ושל פונקציות מהצורה $\frac{c\,f'(x)}{(f(x))^n}$, ואת השימוש העיקרי בבגרות: מציאת פונקציה לפי הנגזרת שלה ונקודה על הגרף (בשאלה 6). לפי המיקוד **אינטגרל של פונקציית שורש ירד**, וכך גם אינטגרלים של פונקציות טריגונומטריות ואינטגרלים הדורשים חילוק פולינומים.`,
    keyFacts: [
      String.raw`**פונקציה קדומה**: $F$ קדומה ל-$f$ אם $F'(x)=f(x)$. כל הקדומות של $f$ הן $F(x)+C$, ולכן $\int f(x)\,dx=F(x)+C$. בדיקה: גוזרים את התשובה ומקבלים את הפונקציה שבתוך האינטגרל.`,
      String.raw`**אינטגרלים מיידיים**: $\int x^n\,dx=\frac{x^{n+1}}{n+1}+C$ לכל $n\ne-1$ (גם שלילי, למשל $\int\frac{dx}{x^2}=-\frac1x+C$); $\int k\,dx=kx+C$; $\int(f\pm g)\,dx=\int f\,dx\pm\int g\,dx$; $\int kf\,dx=k\int f\,dx$. אין כלל למכפלה – פותחים סוגריים.`,
      String.raw`**ביטוי ליניארי בחזקה**: $\int(ax+b)^n\,dx=\frac{(ax+b)^{n+1}}{a(n+1)}+C$ ($n\ne-1$) – מחלקים גם בנגזרת הפנימית $a$.`,
      String.raw`**הצורה $\frac{c\,f'(x)}{(f(x))^n}$** ($n\ne1$): $\int\frac{c\,f'(x)}{(f(x))^n}\,dx=\frac{c\,(f(x))^{1-n}}{1-n}+C$. מזהים שהמונה הוא כפולה של נגזרת הביטוי שבמכנה ומשלימים קבוע; אותו רעיון עובד גם למכפלה $f'(x)\cdot(f(x))^k$.`,
      String.raw`**מציאת פונקציה לפי נגזרת ונקודה**: $f(x)=\int f'(x)\,dx=F(x)+C$, ואת $C$ מוצאים מהצבת הנתון. נתונים נפוצים: ״הגרף עובר דרך...״ ($f(x_0)=y_0$), ״קיצון ב-...״ ($f'(x_0)=0$), ״הישר ... משיק לגרף״ (שיפוע ונקודה), ״אסימפטוטה אופקית $y=b$״.`,
      String.raw`**נתונה נגזרת שנייה**: מבצעים אינטגרל פעמיים, ולכן יש שני קבועים – צריך שני נתונים (למשל נקודת קיצון: $f'(x_0)=0$ וגם $f(x_0)=y_0$).`,
    ],
    exercises: [
      {
        id: 'calc-indefinite-integral-1',
        difficulty: 1,
        statement: String.raw`מצאו את האינטגרלים הבאים:

א. $\int\left(4x^3-6x+1\right)dx$

ב. $\int\left(x^2-\frac{3}{x^2}\right)dx$

ג. $\int(x+2)(x-1)\,dx$`,
        hints: [
          String.raw`$\int x^n\,dx=\frac{x^{n+1}}{n+1}+C$; כתבו $\frac3{x^2}=3x^{-2}$.`,
          String.raw`בסעיף ג אין כלל למכפלה – פתחו סוגריים קודם.`,
        ],
        solutionSteps: [
          String.raw`א. מבצעים אינטגרל לכל מחובר: $\int\left(4x^3-6x+1\right)dx=4\cdot\frac{x^4}4-6\cdot\frac{x^2}2+x+C=x^4-3x^2+x+C$.`,
          String.raw`ב. $\frac3{x^2}=3x^{-2}$, ו-$\int3x^{-2}\,dx=3\cdot\frac{x^{-1}}{-1}=-\frac3x$. לכן $\int\left(x^2-\frac3{x^2}\right)dx=\frac{x^3}3+\frac3x+C$ (עבור $x\ne0$).`,
          String.raw`ג. $(x+2)(x-1)=x^2+x-2$, ולכן $\int\left(x^2+x-2\right)dx=\frac{x^3}3+\frac{x^2}2-2x+C$.`,
          String.raw`בדיקה בגזירה, למשל בסעיף ב: $\left(\frac{x^3}3+\frac3x\right)'=x^2-\frac3{x^2}$, כנדרש.`,
        ],
        finalAnswer: String.raw`א. $x^4-3x^2+x+C$; ב. $\frac{x^3}3+\frac3x+C$; ג. $\frac{x^3}3+\frac{x^2}2-2x+C$.`,
      },
      {
        id: 'calc-indefinite-integral-2',
        difficulty: 1,
        statement: String.raw`נתון $f'(x)=6x^2-2x+1$, וגרף הפונקציה $f$ עובר דרך הנקודה $(1,4)$.

מצאו את $f(x)$ וחשבו את $f(2)$.`,
        hints: [
          String.raw`$f(x)=\int f'(x)\,dx$ – אל תשכחו את $C$.`,
          String.raw`הציבו $x=1$ ו-$f(1)=4$ כדי למצוא את $C$.`,
        ],
        solutionSteps: [
          String.raw`$f(x)=\int\left(6x^2-2x+1\right)dx=2x^3-x^2+x+C$.`,
          String.raw`הגרף עובר דרך $(1,4)$: $f(1)=2-1+1+C=2+C=4$, ולכן $C=2$.`,
          String.raw`$f(x)=2x^3-x^2+x+2$, ו-$f(2)=16-4+2+2=16$.`,
        ],
        finalAnswer: String.raw`$f(x)=2x^3-x^2+x+2$; $f(2)=16$.`,
        answers: [
          { label: '$f(0)$', value: 2 },
          { label: '$f(2)$', value: 16 },
        ],
      },
      {
        id: 'calc-indefinite-integral-3',
        difficulty: 2,
        statement: String.raw`מצאו את הפונקציה הקדומה $F$ של $f(x)=5(2x+1)^4$ שגרפה עובר דרך הנקודה $(0,3)$, וחשבו את $F(-1)$.`,
        hints: [
          String.raw`$\int(ax+b)^n\,dx=\frac{(ax+b)^{n+1}}{a(n+1)}+C$. כאן $a=2$.`,
          String.raw`$\int5(2x+1)^4\,dx=5\cdot\frac{(2x+1)^5}{2\cdot5}+C=\frac{(2x+1)^5}{2}+C$.`,
        ],
        solutionSteps: [
          String.raw`זו חזקה של ביטוי ליניארי, ולכן מחלקים גם במעריך החדש וגם בנגזרת הפנימית $2$: $F(x)=5\cdot\frac{(2x+1)^5}{5\cdot2}+C=\frac{(2x+1)^5}{2}+C$.`,
          String.raw`בדיקה: $F'(x)=\frac{5(2x+1)^4\cdot2}{2}=5(2x+1)^4$, כנדרש.`,
          String.raw`$F(0)=\frac12+C=3$, ולכן $C=2.5$ ו-$F(x)=\frac{(2x+1)^5}{2}+2.5$.`,
          String.raw`$F(-1)=\frac{(-1)^5}{2}+2.5=-0.5+2.5=2$.`,
        ],
        finalAnswer: String.raw`$F(x)=\frac{(2x+1)^5}{2}+2.5$; $F(-1)=2$.`,
        answers: [{ label: '$F(-1)$', value: 2 }],
      },
      {
        id: 'calc-indefinite-integral-4',
        difficulty: 2,
        statement: String.raw`נתון $f'(x)=\frac{2x-4}{\left(x^2-4x+5\right)^2}$, והנקודה $(2,3)$ נמצאת על גרף הפונקציה $f$.

א. מצאו את $f(x)$.

ב. חשבו את $f(0)$, והראו ש-$(2,3)$ היא נקודת המינימום של $f$.`,
        hints: [
          String.raw`המונה $2x-4$ הוא בדיוק הנגזרת של הביטוי $x^2-4x+5$ שבמכנה.`,
          String.raw`$\int\frac{g'(x)}{(g(x))^2}dx=\frac{(g(x))^{-1}}{-1}+C=-\frac1{g(x)}+C$.`,
        ],
        solutionSteps: [
          String.raw`א. נסמן $g(x)=x^2-4x+5$; אז $g'(x)=2x-4$ ו-$f'(x)=\frac{g'(x)}{(g(x))^2}$ – הצורה $\frac{c\,g'}{g^n}$ עם $c=1$ ו-$n=2$.`,
          String.raw`$f(x)=\frac{(g(x))^{-1}}{-1}+C=-\frac{1}{x^2-4x+5}+C$.`,
          String.raw`$f(2)=-\frac1{4-8+5}+C=-1+C=3$, ולכן $C=4$ ו-$f(x)=4-\frac{1}{x^2-4x+5}$.`,
          String.raw`ב. $f(0)=4-\frac15=3.8$.`,
          String.raw`המכנה של $f'$ חיובי, ולכן הסימן של $f'$ הוא הסימן של $2x-4$: שלילי עבור $x<2$ וחיובי עבור $x>2$. לכן ב-$x=2$ מינימום, והנקודה היא $(2,3)$.`,
        ],
        finalAnswer: String.raw`$f(x)=4-\frac1{x^2-4x+5}$; $f(0)=3.8$; $(2,3)$ מינימום.`,
        answers: [{ label: '$f(0)$', value: 3.8 }],
      },
      {
        id: 'calc-indefinite-integral-5',
        difficulty: 2,
        statement: String.raw`הפונקציה $f$ מוגדרת עבור $x>\frac12$, ונתון $f'(x)=\frac{4}{(2x-1)^2}$. גרף הפונקציה חותך את ציר $x$ בנקודה שבה $x=1$.

א. מצאו את $f(x)$.

ב. מצאו את האסימפטוטה האופקית של גרף $f$, וחשבו את $f(3)$.`,
        hints: [
          String.raw`כתבו $\frac4{(2x-1)^2}=4(2x-1)^{-2}$ ובצעו אינטגרל של ביטוי ליניארי בחזקה (חלקו גם בנגזרת הפנימית $2$).`,
          String.raw`״חותך את ציר $x$ ב-$x=1$״ פירושו $f(1)=0$.`,
        ],
        solutionSteps: [
          String.raw`א. $f(x)=\int4(2x-1)^{-2}dx=4\cdot\frac{(2x-1)^{-1}}{2\cdot(-1)}+C=-\frac{2}{2x-1}+C$.`,
          String.raw`$f(1)=-\frac21+C=0$, ולכן $C=2$ ו-$f(x)=2-\frac2{2x-1}$.`,
          String.raw`ב. כאשר $x\to\infty$ המכנה $2x-1\to\infty$ ו-$\frac2{2x-1}\to0$, ולכן $f(x)\to2$: האסימפטוטה האופקית היא $y=2$.`,
          String.raw`$f(3)=2-\frac25=1.6$.`,
        ],
        finalAnswer: String.raw`$f(x)=2-\frac2{2x-1}$; אסימפטוטה $y=2$; $f(3)=1.6$.`,
        answers: [
          { label: '$f(3)$', value: 1.6 },
          { label: 'האסימפטוטה: $y$', value: 2 },
        ],
      },
      {
        id: 'calc-indefinite-integral-6',
        difficulty: 2,
        statement: String.raw`נתון $f''(x)=6x-6$. לפונקציה $f$ יש נקודת מינימום $(3,-20)$.

א. מצאו את $f'(x)$ ואת $f(x)$.

ב. מצאו את נקודת הקיצון הנוספת של $f$ וקבעו את סוגה.`,
        hints: [
          String.raw`$f'(x)=\int f''(x)\,dx=3x^2-6x+C_1$. בנקודת מינימום $f'(3)=0$.`,
          String.raw`אחרי שמצאתם את $f'$, בצעו אינטגרל שוב והציבו $f(3)=-20$.`,
        ],
        solutionSteps: [
          String.raw`א. $f'(x)=\int(6x-6)\,dx=3x^2-6x+C_1$. ב-$x=3$ יש קיצון של פונקציה גזירה, ולכן $f'(3)=27-18+C_1=0$, כלומר $C_1=-9$.`,
          String.raw`$f'(x)=3x^2-6x-9$, ו-$f(x)=\int\left(3x^2-6x-9\right)dx=x^3-3x^2-9x+C_2$.`,
          String.raw`$f(3)=27-27-27+C_2=-20$, ולכן $C_2=7$ ו-$f(x)=x^3-3x^2-9x+7$.`,
          String.raw`ב. $f'(x)=3\left(x^2-2x-3\right)=3(x+1)(x-3)$, ולכן הנקודה החשודה הנוספת היא $x=-1$. $f''(-1)=-12<0$, ולכן זו נקודת מקסימום.`,
          String.raw`$f(-1)=-1-3+9+7=12$, כלומר נקודת מקסימום $(-1,12)$. (ואכן $f''(3)=12>0$ – מינימום ב-$(3,-20)$, כנתון.)`,
        ],
        finalAnswer: String.raw`$f'(x)=3x^2-6x-9$, $f(x)=x^3-3x^2-9x+7$; מקסימום $(-1,12)$.`,
        answers: [
          { label: '$f(0)$', value: 7 },
          { label: 'המקסימום: $x$', value: -1 },
          { label: 'המקסימום: $y$', value: 12 },
        ],
      },
      {
        id: 'calc-indefinite-integral-7',
        difficulty: 2,
        statement: String.raw`נתון $f'(x)=3x^2-4x$. הישר $y=4x-6$ משיק לגרף הפונקציה $f$ בנקודה ששיעור ה-$x$ שלה חיובי.

א. מצאו את שיעור ה-$x$ של נקודת ההשקה.

ב. מצאו את $f(x)$.`,
        hints: [
          String.raw`שיפוע הישר הוא $4$, ולכן בנקודת ההשקה $f'(x_0)=4$.`,
          String.raw`נקודת ההשקה נמצאת גם על הישר: $f(x_0)=4x_0-6$.`,
        ],
        solutionSteps: [
          String.raw`א. בנקודת ההשקה שיפוע הגרף שווה לשיפוע הישר: $3x_0^2-4x_0=4$, כלומר $3x_0^2-4x_0-4=0$, ו-$(3x_0+2)(x_0-2)=0$.`,
          String.raw`$x_0=2$ או $x_0=-\frac23$; לפי הנתון $x_0>0$, ולכן $x_0=2$.`,
          String.raw`ב. נקודת ההשקה נמצאת על הישר: $y_0=4\cdot2-6=2$, כלומר הנקודה $(2,2)$ נמצאת על גרף $f$.`,
          String.raw`$f(x)=\int\left(3x^2-4x\right)dx=x^3-2x^2+C$, ו-$f(2)=8-8+C=2$, ולכן $C=2$: $f(x)=x^3-2x^2+2$.`,
        ],
        finalAnswer: String.raw`$x_0=2$; $f(x)=x^3-2x^2+2$.`,
        answers: [
          { label: '$x_0$', value: 2 },
          { label: '$f(0)$', value: 2 },
        ],
      },
      {
        id: 'calc-indefinite-integral-8',
        difficulty: 2,
        statement: String.raw`מצאו את הפונקציה הקדומה $F$ של $f(x)=x\left(x^2-1\right)^3$ שמקיימת $F(1)=2$, וחשבו את $F(0)$.`,
        hints: [
          String.raw`הנגזרת של $x^2-1$ היא $2x$, ולכן $x\left(x^2-1\right)^3=\frac12\cdot2x\cdot\left(x^2-1\right)^3$.`,
          String.raw`$\int g'(x)\,(g(x))^3\,dx=\frac{(g(x))^4}{4}+C$ – זו הצורה $\frac{c\,g'}{g^n}$ עם $n=-3$.`,
        ],
        solutionSteps: [
          String.raw`נסמן $g(x)=x^2-1$; אז $g'(x)=2x$ ו-$f(x)=\frac12\,g'(x)\,(g(x))^3$.`,
          String.raw`$F(x)=\frac12\cdot\frac{(g(x))^4}{4}+C=\frac{\left(x^2-1\right)^4}{8}+C$.`,
          String.raw`בדיקה: $F'(x)=\frac{4\left(x^2-1\right)^3\cdot2x}{8}=x\left(x^2-1\right)^3$, כנדרש.`,
          String.raw`$F(1)=0+C=2$, ולכן $F(x)=\frac{\left(x^2-1\right)^4}{8}+2$ ו-$F(0)=\frac18+2=2.125$.`,
        ],
        finalAnswer: String.raw`$F(x)=\frac{\left(x^2-1\right)^4}{8}+2$; $F(0)=\frac{17}8=2.125$.`,
        answers: [{ label: '$F(0)$', value: 2.125 }],
      },
      {
        id: 'calc-indefinite-integral-9',
        difficulty: 3,
        statement: String.raw`נגזרת הפונקציה $f$ היא $f'(x)=ax^2+b$, כאשר $a$ ו-$b$ פרמטרים. גרף $f$ עובר דרך ראשית הצירים, ולפונקציה יש נקודת קיצון $(1,-2)$.

א. מצאו את $a$ ואת $b$.

ב. קבעו את סוג נקודת הקיצון $(1,-2)$, ומצאו את נקודת הקיצון הנוספת של $f$.`,
        hints: [
          String.raw`$f(x)=\frac{a}{3}x^3+bx+C$, והמעבר בראשית נותן $C=0$.`,
          String.raw`שתי משוואות: $f'(1)=0$ ו-$f(1)=-2$.`,
        ],
        solutionSteps: [
          String.raw`א. $f(x)=\int\left(ax^2+b\right)dx=\frac a3x^3+bx+C$, ו-$f(0)=C=0$.`,
          String.raw`קיצון ב-$x=1$: $f'(1)=a+b=0$. הנקודה על הגרף: $f(1)=\frac a3+b=-2$.`,
          String.raw`חיסור המשוואות: $a-\frac a3=2$, כלומר $\frac{2a}3=2$, ולכן $a=3$ ו-$b=-3$.`,
          String.raw`ב. $f(x)=x^3-3x$, $f'(x)=3x^2-3=3(x-1)(x+1)$, $f''(x)=6x$.`,
          String.raw`$f''(1)=6>0$, ולכן $(1,-2)$ נקודת מינימום. הנקודה החשודה הנוספת $x=-1$: $f''(-1)=-6<0$ – מקסימום, ו-$f(-1)=-1+3=2$, כלומר $(-1,2)$.`,
        ],
        finalAnswer: String.raw`$a=3$, $b=-3$; $(1,-2)$ מינימום; מקסימום $(-1,2)$.`,
        answers: [
          { label: '$a$', value: 3 },
          { label: '$b$', value: -3 },
        ],
      },
      {
        id: 'calc-indefinite-integral-10',
        difficulty: 3,
        statement: String.raw`נתון $f'(x)=\frac{x-1}{\left(x^2-2x+2\right)^3}$. לגרף הפונקציה $f$ יש אסימפטוטה אופקית $y=3$.

א. מצאו את $f(x)$.

ב. מצאו את נקודת הקיצון של $f$ וקבעו את סוגה.`,
        hints: [
          String.raw`הנגזרת של $x^2-2x+2$ היא $2x-2=2(x-1)$, ולכן המונה הוא חצי מהנגזרת.`,
          String.raw`$f(x)=-\frac{1}{4\left(x^2-2x+2\right)^2}+C$. מה קורה לשבר כאשר $x\to\pm\infty$?`,
        ],
        solutionSteps: [
          String.raw`א. נסמן $g(x)=x^2-2x+2$; אז $g'(x)=2(x-1)$ ו-$f'(x)=\frac12\cdot\frac{g'(x)}{(g(x))^3}$.`,
          String.raw`$f(x)=\frac12\cdot\frac{(g(x))^{-2}}{-2}+C=-\frac{1}{4\left(x^2-2x+2\right)^2}+C$.`,
          String.raw`כאשר $x\to\pm\infty$ המכנה שואף לאינסוף והשבר שואף ל-$0$, ולכן $f(x)\to C$. האסימפטוטה האופקית היא $y=3$, ולכן $C=3$: $f(x)=3-\frac{1}{4\left(x^2-2x+2\right)^2}$.`,
          String.raw`ב. $g(x)=(x-1)^2+1>0$, ולכן המכנה של $f'$ חיובי והסימן של $f'$ הוא הסימן של $x-1$: שלילי עבור $x<1$ וחיובי עבור $x>1$.`,
          String.raw`לכן ב-$x=1$ יש מינימום: $f(1)=3-\frac1{4\cdot1^2}=2.75$, כלומר נקודת המינימום $(1,2.75)$.`,
        ],
        finalAnswer: String.raw`$f(x)=3-\frac1{4\left(x^2-2x+2\right)^2}$; מינימום $(1,2.75)$.`,
        answers: [
          { label: 'המינימום: $x$', value: 1 },
          { label: 'ערך המינימום', value: 2.75 },
        ],
      },
    ],
  },
  'calc-areas': {
    intro: String.raw`האינטגרל המסוים $\int_a^bf(x)\,dx=F(b)-F(a)$ מאפשר לחשב שטחים של צורות שגבולן עקום. בסעיף לומדים לחשב שטח בין גרף לציר $x$ – כשהפונקציה חיובית, שלילית או מחליפה סימן – שטח בין שני גרפים, ושטחים מורכבים (גרף, משיק וציר; כמה תחומים). בבגרות זה בדרך כלל הסעיף האחרון בשאלה 6, והוא נשען על נקודות החיתוך והקיצון שנמצאו בחקירה. לפי המיקוד האינטגרלים הם של פולינומים ושל $\frac{c\,f'(x)}{(f(x))^n}$ בלבד – **בלי אינטגרל של פונקציית שורש**.`,
    keyFacts: [
      String.raw`**המשפט היסודי**: $\int_a^bf(x)\,dx=\Big[F(x)\Big]_a^b=F(b)-F(a)$, כאשר $F$ קדומה כלשהי של $f$ (הקבוע $C$ מתבטל). תכונות: $\int_b^af\,dx=-\int_a^bf\,dx$ ו-$\int_a^bf\,dx+\int_b^cf\,dx=\int_a^cf\,dx$.`,
      String.raw`**שטח בין גרף לציר $x$**: אם $f(x)\ge0$ בקטע – $S=\int_a^bf(x)\,dx$; אם $f(x)\le0$ – $S=-\int_a^bf(x)\,dx$. אם $f$ מחליפה סימן – מפצלים בנקודות החיתוך עם ציר $x$ ומחברים את השטחים, לא את האינטגרלים עם הסימן.`,
      String.raw`**שטח בין שני גרפים**: $S=\int_a^b\big(f(x)-g(x)\big)\,dx$ כאשר גרף $f$ מעל גרף $g$ בקטע (״עליונה פחות תחתונה״) – גם אם חלק מהשטח מתחת לציר $x$. הגבולות הם בדרך כלל פתרונות המשוואה $f(x)=g(x)$; אם הגרפים מתחלפים – מפצלים.`,
      String.raw`**שטח מורכב**: משרטטים סקיצה, מסמנים את כל נקודות החיתוך ומחלקים את השטח לחלקים שבכל אחד מהם ברור מי הגבול העליון ומי התחתון. לעתים חלק מהשטח הוא משולש או מלבן, ונוח לחשב אותו בנוסחה גאומטרית.`,
      String.raw`**פרמטר**: ״השטח שווה ל-$S$, מצאו את $k$״ – מחשבים את האינטגרל כביטוי ב-$k$ ופותרים משוואה; בודקים שהפתרון מתאים לתנאי השאלה.`,
      String.raw`**סימטריה**: אם הפונקציה (או ההפרש $f-g$) זוגית או אי-זוגית, השטחים משני צדי ציר $y$ שווים – אפשר לחשב צד אחד ולהכפיל ב-$2$.`,
    ],
    exercises: [
      {
        id: 'calc-areas-1',
        difficulty: 1,
        statement: String.raw`חשבו את האינטגרל המסוים $\int_1^3\left(3x^2-2x\right)dx$.`,
        hints: [
          String.raw`פונקציה קדומה של $3x^2-2x$ היא $x^3-x^2$.`,
          String.raw`$\Big[F(x)\Big]_1^3=F(3)-F(1)$.`,
        ],
        solutionSteps: [
          String.raw`פונקציה קדומה: $F(x)=x^3-x^2$ (בלי $C$ – באינטגרל מסוים הוא מתבטל).`,
          String.raw`$\int_1^3\left(3x^2-2x\right)dx=\Big[x^3-x^2\Big]_1^3=(27-9)-(1-1)=18$.`,
        ],
        finalAnswer: '$18$',
        answers: [{ label: 'ערך האינטגרל', value: 18 }],
      },
      {
        id: 'calc-areas-2',
        difficulty: 1,
        statement: String.raw`חשבו את השטח המוגבל על ידי גרף הפונקציה $f(x)=4-x^2$ וציר $x$.`,
        hints: [
          String.raw`מצאו קודם את נקודות החיתוך עם ציר $x$ – הן גבולות האינטגרל.`,
          String.raw`בין נקודות החיתוך $f(x)\ge0$, ולכן $S=\int_{-2}^{2}\left(4-x^2\right)dx$.`,
        ],
        solutionSteps: [
          String.raw`$4-x^2=0\Rightarrow x=\pm2$. בקטע $[-2,2]$ מתקיים $f(x)\ge0$ (למשל $f(0)=4$), ולכן השטח שווה לאינטגרל עצמו.`,
          String.raw`$S=\int_{-2}^{2}\left(4-x^2\right)dx=\left[4x-\frac{x^3}3\right]_{-2}^{2}=\left(8-\frac83\right)-\left(-8+\frac83\right)=\frac{32}3$.`,
        ],
        finalAnswer: String.raw`$S=\frac{32}3\approx10.67$`,
        answers: [{ label: 'השטח', value: 10.666666666666666 }],
      },
      {
        id: 'calc-areas-3',
        difficulty: 2,
        statement: String.raw`חשבו את השטח המוגבל על ידי גרף הפונקציה $f(x)=\frac{4}{(x+1)^2}$, הצירים והישר $x=3$.`,
        hints: [
          String.raw`בקטע $[0,3]$ הפונקציה חיובית, ולכן $S=\int_0^3\frac4{(x+1)^2}dx$.`,
          String.raw`$\int4(x+1)^{-2}dx=-\frac4{x+1}+C$.`,
        ],
        solutionSteps: [
          String.raw`בקטע $[0,3]$ מתקיים $f(x)>0$, והתחום מוגבל משמאל בציר $y$ ($x=0$), מימין בישר $x=3$ ומלמטה בציר $x$.`,
          String.raw`$\int4(x+1)^{-2}dx=4\cdot\frac{(x+1)^{-1}}{-1}+C=-\frac4{x+1}+C$.`,
          String.raw`$S=\left[-\frac4{x+1}\right]_0^3=-\frac44-\left(-\frac41\right)=-1+4=3$.`,
        ],
        finalAnswer: '$S=3$',
        answers: [{ label: 'השטח', value: 3 }],
      },
      {
        id: 'calc-areas-4',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x^2-4x$.

א. חשבו את $\int_1^5f(x)\,dx$.

ב. חשבו את השטח המוגבל על ידי גרף הפונקציה, ציר $x$ והישרים $x=1$ ו-$x=5$, והסבירו מדוע התוצאה שונה מזו של סעיף א.`,
        hints: [
          String.raw`$f(x)=x(x-4)$ מחליפה סימן ב-$x=4$: שלילית ב-$(1,4)$ וחיובית ב-$(4,5)$.`,
          String.raw`השטח הוא $-\int_1^4f\,dx+\int_4^5f\,dx$.`,
        ],
        solutionSteps: [
          String.raw`פונקציה קדומה: $F(x)=\frac{x^3}3-2x^2$, ולכן $F(1)=-\frac53$, $F(4)=-\frac{32}3$, $F(5)=-\frac{25}3$.`,
          String.raw`א. $\int_1^5f(x)\,dx=F(5)-F(1)=-\frac{25}3+\frac53=-\frac{20}3$.`,
          String.raw`ב. $f(x)=x(x-4)<0$ עבור $1\le x<4$ ו-$f(x)>0$ עבור $4<x\le5$, ולכן מפצלים ב-$x=4$.`,
          String.raw`$S_1=-\int_1^4f\,dx=-\big(F(4)-F(1)\big)=-\left(-\frac{32}3+\frac53\right)=9$, ו-$S_2=\int_4^5f\,dx=F(5)-F(4)=-\frac{25}3+\frac{32}3=\frac73$.`,
          String.raw`$S=S_1+S_2=9+\frac73=\frac{34}3$. באינטגרל של סעיף א השטח שמתחת לציר נספר בסימן מינוס ו״מקזז״ את השטח שמעליו: $-9+\frac73=-\frac{20}3$.`,
        ],
        finalAnswer: String.raw`א. $-\frac{20}3$; ב. $S=\frac{34}3\approx11.33$.`,
        answers: [
          { label: 'א: האינטגרל', value: -6.666666666666667 },
          { label: 'ב: השטח', value: 11.333333333333334 },
        ],
      },
      {
        id: 'calc-areas-5',
        difficulty: 2,
        statement: String.raw`חשבו את השטח המוגבל על ידי הגרפים של $f(x)=x^2-2x$ ו-$g(x)=4-x^2$.`,
        hints: [
          String.raw`נקודות החיתוך: $x^2-2x=4-x^2$, כלומר $x^2-x-2=0$.`,
          String.raw`בין נקודות החיתוך גרף $g$ מעל גרף $f$ (בדקו ב-$x=0$), ולכן $S=\int_{-1}^{2}\big(g(x)-f(x)\big)dx$.`,
        ],
        solutionSteps: [
          String.raw`חיתוך: $x^2-2x=4-x^2\Rightarrow2x^2-2x-4=0\Rightarrow x^2-x-2=0\Rightarrow(x-2)(x+1)=0$, ולכן $x=-1$ ו-$x=2$.`,
          String.raw`ב-$x=0$: $g(0)=4>f(0)=0$, ולכן בקטע $(-1,2)$ גרף $g$ מעל גרף $f$, ו-$g(x)-f(x)=4-x^2-x^2+2x=-2x^2+2x+4$.`,
          String.raw`$S=\int_{-1}^{2}\left(-2x^2+2x+4\right)dx=\left[-\frac{2x^3}3+x^2+4x\right]_{-1}^{2}$.`,
          String.raw`$=\left(-\frac{16}3+4+8\right)-\left(\frac23+1-4\right)=\frac{20}3+\frac73=9$.`,
        ],
        finalAnswer: '$S=9$',
        answers: [{ label: 'השטח', value: 9 }],
      },
      {
        id: 'calc-areas-6',
        difficulty: 2,
        statement: String.raw`נתונים הפרבולה $y=x^2$ והישר $y=kx$, כאשר $k>0$. השטח המוגבל על ידי הפרבולה והישר הוא $36$.

מצאו את $k$.`,
        hints: [
          String.raw`נקודות החיתוך: $x^2=kx$, כלומר $x=0$ ו-$x=k$.`,
          String.raw`בקטע $(0,k)$ הישר מעל הפרבולה: $S=\int_0^k\left(kx-x^2\right)dx$.`,
        ],
        solutionSteps: [
          String.raw`חיתוך: $x^2=kx\Rightarrow x(x-k)=0$, ולכן $x=0$ ו-$x=k$ (כאשר $k>0$).`,
          String.raw`בקטע $(0,k)$: $kx-x^2=x(k-x)>0$, כלומר הישר מעל הפרבולה.`,
          String.raw`$S=\int_0^k\left(kx-x^2\right)dx=\left[\frac{kx^2}2-\frac{x^3}3\right]_0^k=\frac{k^3}2-\frac{k^3}3=\frac{k^3}6$.`,
          String.raw`$\frac{k^3}6=36\Rightarrow k^3=216\Rightarrow k=6$.`,
        ],
        finalAnswer: '$k=6$',
        answers: [{ label: '$k$', value: 6 }],
      },
      {
        id: 'calc-areas-7',
        difficulty: 2,
        statement: String.raw`נתונות הפונקציות $f(x)=x^3-3x$ ו-$g(x)=x$.

א. מצאו את נקודות החיתוך של שני הגרפים.

ב. חשבו את סכום השטחים המוגבלים על ידי שני הגרפים.`,
        hints: [
          String.raw`פתרו $x^3-3x=x$, כלומר $x\left(x^2-4\right)=0$.`,
          String.raw`הגרפים מתחלפים ב-$x=0$: בדקו מי מעל מי ב-$(-2,0)$ וב-$(0,2)$. ההפרש $f-g$ אי-זוגי, ולכן שני השטחים שווים.`,
        ],
        solutionSteps: [
          String.raw`א. $x^3-3x=x\Rightarrow x^3-4x=0\Rightarrow x(x-2)(x+2)=0$, ולכן $x=-2,0,2$, והנקודות $(-2,-2)$, $(0,0)$, $(2,2)$.`,
          String.raw`ב. נסמן $h(x)=f(x)-g(x)=x^3-4x$. $h(-1)=3>0$, ולכן ב-$(-2,0)$ גרף $f$ מעל $g$; $h(1)=-3<0$, ולכן ב-$(0,2)$ גרף $g$ מעל $f$.`,
          String.raw`$S_1=\int_{-2}^{0}\left(x^3-4x\right)dx=\left[\frac{x^4}4-2x^2\right]_{-2}^{0}=0-(4-8)=4$.`,
          String.raw`$S_2=\int_{0}^{2}\left(4x-x^3\right)dx=\left[2x^2-\frac{x^4}4\right]_0^2=8-4=4$ (כצפוי, כי $h$ אי-זוגית).`,
          String.raw`סכום השטחים: $S=4+4=8$. אינטגרל אחד מ-$-2$ עד $2$ היה נותן $0$ – לכן חובה לפצל.`,
        ],
        finalAnswer: String.raw`א. $(-2,-2)$, $(0,0)$, $(2,2)$; ב. $S=8$.`,
        answers: [{ label: 'סכום השטחים', value: 8 }],
      },
      {
        id: 'calc-areas-8',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=x^2$. דרך הנקודה $A(2,4)$ שעל הגרף מעבירים משיק לגרף.

א. מצאו את משוואת המשיק ואת נקודת החיתוך שלו עם ציר $x$.

ב. חשבו את השטח המוגבל על ידי גרף הפונקציה, המשיק וציר $x$ (השטח המסומן בשרטוט).`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <polygon points="74.8,199.1 84.3,198.8 92.6,197.9 100.8,196.5 110.3,194.3 118.6,191.9 128.1,188.4 136.3,184.8 145.8,180 155.3,174.6 163.5,169.3 173,162.6 181.3,156.2 190.8,148.2 199,140.7 208.5,131.5 216.8,122.8 216.8,122.8 145.8,199.1 74.8,199.1" fill="currentColor" fill-opacity="0.15" stroke="none"/>
  <line x1="14" y1="199.1" x2="312" y2="199.1" stroke-width="1.5"/>
  <polyline points="306,195.1 312,199.1 306,203.1" stroke-width="1.5"/>
  <line x1="74.8" y1="228" x2="74.8" y2="6" stroke-width="1.5"/>
  <polyline points="70.8,12 74.8,6 78.8,12" stroke-width="1.5"/>
  <text x="310" y="191.1" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="86.8" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="18,186.9 27.1,190.5 35.1,193.1 43.1,195.3 52.2,197.2 61.3,198.4 69.3,199 77.2,199.1 86.3,198.6 95.4,197.5 103.4,196 111.4,194 120.5,191.2 129.6,187.7 137.6,184.2 145.6,180.2 154.7,175 162.6,169.9 171.8,163.5 179.7,157.4 188.8,149.9 198,141.7 205.9,134.1 223,116 240.1,95.7 257.2,73.3 274.3,48.6 291.3,21.7"/>
  <line x1="124.5" y1="222" x2="263" y2="73.2" stroke-width="1.5"/>
  <circle cx="216.8" cy="122.8" r="3.5" fill="currentColor" stroke="none"/>
  <text x="250.8" y="126.8" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">A(2,4)</text>
  <line x1="145.8" y1="195.1" x2="145.8" y2="203.1" stroke-width="1.5"/>
  <text x="153.8" y="219.1" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">1</text>
  <text x="298.3" y="33.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f</text>
</svg>`,
        hints: [
          String.raw`$f'(2)=4$, ולכן המשיק הוא $y=4x-4$, והוא חותך את ציר $x$ ב-$x=1$.`,
          String.raw`השטח המבוקש = השטח שמתחת לפרבולה מ-$0$ עד $2$, פחות שטח המשולש שמתחת למשיק מ-$1$ עד $2$.`,
        ],
        solutionSteps: [
          String.raw`א. $f'(x)=2x$, ולכן שיפוע המשיק ב-$A$ הוא $f'(2)=4$, והמשיק: $y-4=4(x-2)$, כלומר $y=4x-4$. חיתוך עם ציר $x$: $4x-4=0\Rightarrow x=1$.`,
          String.raw`ב. התחום המסומן נמצא בין $x=0$ ל-$x=2$: מלמעלה הוא חסום בפרבולה, ומלמטה – בציר $x$ (מ-$0$ עד $1$) ובמשיק (מ-$1$ עד $2$).`,
          String.raw`השטח שמתחת לפרבולה: $\int_0^2x^2\,dx=\left[\frac{x^3}3\right]_0^2=\frac83$.`,
          String.raw`ממנו מחסירים את המשולש שבין המשיק לציר $x$, שקודקודיו $(1,0)$, $(2,0)$, $(2,4)$: שטחו $\frac{1\cdot4}2=2$.`,
          String.raw`$S=\frac83-2=\frac23$.`,
        ],
        finalAnswer: String.raw`א. $y=4x-4$, חיתוך עם ציר $x$ ב-$(1,0)$; ב. $S=\frac23$.`,
        answers: [{ label: 'השטח', value: 0.6666666666666666 }],
      },
      {
        id: 'calc-areas-9',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=x^3$.

א. מצאו את משוואת המשיק לגרף בנקודה שבה $x=1$, והראו שהמשיק חותך את הגרף בנקודה נוספת שבה $x=-2$.

ב. חשבו את השטח המוגבל על ידי הגרף והמשיק (ראו שרטוט).`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <polygon points="45,204.1 51.8,187.1 60.3,168.1 68.7,151.7 77.2,137.6 85.6,125.6 94.1,115.6 102.5,107.4 107.6,103.2 112.7,99.6 119.4,95.5 126.2,92.3 133,89.8 141.4,87.5 149.9,86 160,85.1 197.2,84.4 205.6,83.9 214.1,82.8 224.2,80.6 232.7,77.7 241.1,73.8 247.9,69.7 247.9,69.7 45,204.1" fill="currentColor" fill-opacity="0.15" stroke="none"/>
  <line x1="14" y1="84.7" x2="312" y2="84.7" stroke-width="1.5"/>
  <polyline points="306,80.7 312,84.7 306,88.7" stroke-width="1.5"/>
  <line x1="180.3" y1="228" x2="180.3" y2="6" stroke-width="1.5"/>
  <polyline points="176.3,12 180.3,6 184.3,12" stroke-width="1.5"/>
  <text x="310" y="76.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="192.3" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="39.1,220.4 46.7,199.6 54.4,181.1 62,164.6 70.7,148.2 78.3,135.9 87,123.9 95.7,113.9 100,109.6 105.5,104.9 114.2,98.6 122.9,93.8 131.6,90.2 141.4,87.5 150.1,86 159.9,85.1 194.7,84.5 208.8,83.5 216.4,82.4 224,80.6 230.5,78.5 237.1,75.8 244.7,71.8 252.3,66.6 259.9,60.3 266.4,53.8 273,46.2 279.5,37.5 286,27.6 292.5,16.4"/>
  <line x1="18" y1="222" x2="302" y2="33.9" stroke-width="1.5"/>
  <circle cx="247.9" cy="69.7" r="3.5" fill="currentColor" stroke="none"/>
  <text x="275.9" y="73.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(1,1)</text>
  <circle cx="45" cy="204.1" r="3.5" fill="currentColor" stroke="none"/>
  <text x="89" y="210.1" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(−2,−8)</text>
</svg>`,
        hints: [
          String.raw`המשיק הוא $y=3x-2$. בנקודת ההשקה $x=1$ יש למשוואה $x^3=3x-2$ שורש כפול.`,
          String.raw`$x^3-3x+2=(x-1)^2(x+2)\ge0$ עבור $x\ge-2$, ולכן בקטע $[-2,1]$ הגרף מעל המשיק.`,
        ],
        solutionSteps: [
          String.raw`א. $f'(x)=3x^2$, $f(1)=1$, $f'(1)=3$, ולכן המשיק: $y-1=3(x-1)$, כלומר $y=3x-2$.`,
          String.raw`חיתוך: $x^3=3x-2\iff x^3-3x+2=0$. נקודת ההשקה $x=1$ היא שורש כפול, ואכן $x^3-3x+2=(x-1)^2(x+2)$. לכן נקודת החיתוך הנוספת היא $x=-2$, כלומר $(-2,-8)$.`,
          String.raw`ב. בקטע $[-2,1]$: $f(x)-(3x-2)=(x-1)^2(x+2)\ge0$, ולכן גרף $f$ מעל המשיק.`,
          String.raw`$S=\int_{-2}^{1}\left(x^3-3x+2\right)dx=\left[\frac{x^4}4-\frac{3x^2}2+2x\right]_{-2}^{1}$.`,
          String.raw`$S=\left(\frac14-\frac32+2\right)-(4-6-4)=\frac34+6=\frac{27}4$.`,
        ],
        finalAnswer: String.raw`א. $y=3x-2$, החיתוך הנוסף $(-2,-8)$; ב. $S=\frac{27}4=6.75$.`,
        answers: [{ label: 'השטח', value: 6.75 }],
      },
      {
        id: 'calc-areas-10',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{2x-2}{\left(x^2-2x+2\right)^2}$.

א. מצאו את נקודת החיתוך של גרף הפונקציה עם ציר $x$, וקבעו היכן הפונקציה חיובית והיכן היא שלילית.

ב. חשבו את השטח המוגבל על ידי גרף הפונקציה, ציר $x$ והישרים $x=0$ ו-$x=3$.`,
        hints: [
          String.raw`המכנה חיובי תמיד, כי $x^2-2x+2=(x-1)^2+1$. הסימן נקבע לפי המונה.`,
          String.raw`המונה הוא הנגזרת של $x^2-2x+2$, ולכן $\int f(x)\,dx=-\frac1{x^2-2x+2}+C$. פצלו ב-$x=1$.`,
        ],
        solutionSteps: [
          String.raw`א. $x^2-2x+2=(x-1)^2+1>0$, ולכן הפונקציה מוגדרת לכל $x$ והסימן שלה הוא הסימן של $2x-2$: $f(1)=0$, $f(x)<0$ עבור $x<1$ ו-$f(x)>0$ עבור $x>1$.`,
          String.raw`ב. נסמן $g(x)=x^2-2x+2$; אז $g'(x)=2x-2$ ו-$f=\frac{g'}{g^2}$, ולכן פונקציה קדומה היא $F(x)=-\frac1{x^2-2x+2}$.`,
          String.raw`ערכים: $F(0)=-\frac12$, $F(1)=-1$, $F(3)=-\frac15$.`,
          String.raw`בקטע $[0,1]$ הפונקציה שלילית: $S_1=-\big(F(1)-F(0)\big)=-\left(-1+\frac12\right)=\frac12$.`,
          String.raw`בקטע $[1,3]$ הפונקציה חיובית: $S_2=F(3)-F(1)=-\frac15+1=\frac45$.`,
          String.raw`$S=S_1+S_2=\frac12+\frac45=\frac{13}{10}=1.3$.`,
        ],
        finalAnswer: String.raw`א. $(1,0)$; שלילית עבור $x<1$, חיובית עבור $x>1$; ב. $S=1.3$.`,
        answers: [{ label: 'השטח', value: 1.3 }],
      },
    ],
  },
  'calc-graph-integral': {
    intro: String.raw`בסעיף הזה משתמשים בכך שאינטגרל של נגזרת מחזיר את הפונקציה: $\int_a^bf'(x)\,dx=f(b)-f(a)$. כשנתון **גרף הנגזרת** $f'$, השטח שבין הגרף לציר $x$ הוא השינוי בערכי $f$ – שטח מעל הציר מגדיל את $f$, ושטח מתחת לציר מקטין אותה. כך אפשר למצוא ערכים של $f$, ערכי קיצון והפרשים ביניהם, לפעמים בעזרת שטחים של משולשים ומלבנים בלבד. הנושא ״אינטגרל של פונקציה נגזרת שמוביל לפונקציה הקדומה״ **נשאר במפורש במיקוד**, והוא מופיע כסעיף בשאלה 6.`,
    keyFacts: [
      String.raw`**אינטגרל של נגזרת**: $\int f'(x)\,dx=f(x)+C$, ובאינטגרל מסוים $\int_a^bf'(x)\,dx=f(b)-f(a)$. מכאן $f(b)=f(a)+\int_a^bf'(x)\,dx$.`,
      String.raw`**קריאה מגרף $f'$**: אם גרף $f'$ מעל ציר $x$ בקטע $[a,b]$ והשטח שבינו לבין הציר הוא $S$, אז $f(b)=f(a)+S$; אם הגרף מתחת לציר, $f(b)=f(a)-S$. כשהגרף מורכב מקטעים ישרים מחשבים את השטחים כמשולשים, מלבנים וטרפזים.`,
      String.raw`**שינוי כולל לעומת שטח**: אם $f'$ מחליפה סימן, $\int_a^bf'(x)\,dx$ הוא סכום השטחים עם סימן (שטח מתחת לציר נספר במינוס) – זה השינוי $f(b)-f(a)$, והוא שונה מהשטח הכולל.`,
      String.raw`**ערכי קיצון**: בין שני אפסים סמוכים של $f'$, השטח שבין גרף $f'$ לציר $x$ שווה להפרש בין ערכי $f$ בשתי נקודות הקיצון. בקטע סגור משווים את ערכי $f$ בנקודות הקיצון ובקצוות כדי למצוא קיצון מוחלט.`,
      String.raw`**מציאת $f$ מגרף $f'$**: מזהים מהגרף את הנוסחה של $f'$ (ישר – לפי שתי נקודות; פרבולה – לפי האפסים והקודקוד), מבצעים אינטגרל ומוצאים את $C$ בעזרת ערך ידוע של $f$.`,
      String.raw`**אותו עיקרון לנגזרת השנייה**: $\int_a^bf''(x)\,dx=f'(b)-f'(a)$ – ההפרש בין שיפועי המשיקים בשתי הנקודות.`,
    ],
    exercises: [
      {
        id: 'calc-graph-integral-1',
        difficulty: 1,
        statement: String.raw`הפונקציה $f$ גזירה, ונתון $f(1)=2$ ו-$f(4)=7$.

חשבו את $\int_1^4f'(x)\,dx$ ואת $\int_4^1f'(x)\,dx$.`,
        hints: [
          String.raw`$f$ היא פונקציה קדומה של $f'$.`,
          String.raw`$\int_a^bf'(x)\,dx=f(b)-f(a)$, והחלפת הגבולות הופכת את הסימן.`,
        ],
        solutionSteps: [
          String.raw`$f$ היא פונקציה קדומה של $f'$, ולכן לפי המשפט היסודי $\int_1^4f'(x)\,dx=f(4)-f(1)=7-2=5$.`,
          String.raw`החלפת הגבולות הופכת את הסימן: $\int_4^1f'(x)\,dx=f(1)-f(4)=-5$.`,
        ],
        finalAnswer: String.raw`$5$ ו-$-5$`,
        answers: [
          { label: String.raw`$\int_1^4f'(x)\,dx$`, value: 5 },
          { label: String.raw`$\int_4^1f'(x)\,dx$`, value: -5 },
        ],
      },
      {
        id: 'calc-graph-integral-2',
        difficulty: 1,
        statement: String.raw`בשרטוט מתואר גרף פונקציית הנגזרת $f'$ – ישר העובר דרך הנקודות $(0,2)$ ו-$(4,0)$. נתון ש-$f(0)=1$.

חשבו את $f(4)$ בעזרת השטח המסומן.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <polygon points="63.8,74.9 247,173 247,173 63.8,173" fill="currentColor" fill-opacity="0.15" stroke="none"/>
  <line x1="14" y1="173" x2="312" y2="173" stroke-width="1.5"/>
  <polyline points="306,169 312,173 306,177" stroke-width="1.5"/>
  <line x1="63.8" y1="228" x2="63.8" y2="6" stroke-width="1.5"/>
  <polyline points="59.8,12 63.8,6 67.8,12" stroke-width="1.5"/>
  <text x="310" y="165" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="75.8" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <line x1="18" y1="50.3" x2="302" y2="202.4"/>
  <line x1="59.8" y1="74.9" x2="67.8" y2="74.9" stroke-width="1.5"/>
  <text x="55.8" y="79.9" text-anchor="end" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">2</text>
  <line x1="247" y1="169" x2="247" y2="177" stroke-width="1.5"/>
  <text x="239" y="193" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">4</text>
  <circle cx="63.8" cy="74.9" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="247" cy="173" r="3.5" fill="currentColor" stroke="none"/>
  <text x="126.8" y="90.3" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f′</text>
</svg>`,
        hints: [
          String.raw`$f(4)-f(0)=\int_0^4f'(x)\,dx$, והאינטגרל שווה לשטח המשולש המסומן (הגרף מעל ציר $x$).`,
          String.raw`שטח המשולש: $\frac{4\cdot2}{2}$.`,
        ],
        solutionSteps: [
          String.raw`בקטע $[0,4]$ גרף $f'$ נמצא מעל ציר $x$, ולכן $\int_0^4f'(x)\,dx$ שווה לשטח המשולש שקודקודיו $(0,0)$, $(4,0)$, $(0,2)$: $\frac{4\cdot2}2=4$.`,
          String.raw`$f(4)-f(0)=\int_0^4f'(x)\,dx=4$, ולכן $f(4)=1+4=5$.`,
        ],
        finalAnswer: '$f(4)=5$',
        answers: [{ label: '$f(4)$', value: 5 }],
      },
      {
        id: 'calc-graph-integral-3',
        difficulty: 2,
        statement: String.raw`בשרטוט מתואר גרף הפונקציה $f$, העובר דרך הנקודות $(-1,4)$, $(2,-2)$ ו-$(5,1)$ (ראו שרטוט).

חשבו את $\int_{-1}^{2}f'(x)\,dx$, את $\int_{2}^{5}f'(x)\,dx$ ואת $\int_{-1}^{5}f'(x)\,dx$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="157.9" x2="312" y2="157.9" stroke-width="1.5"/>
  <polyline points="306,153.9 312,157.9 306,161.9" stroke-width="1.5"/>
  <line x1="76.3" y1="228" x2="76.3" y2="6" stroke-width="1.5"/>
  <polyline points="72.3,12 76.3,6 80.3,12" stroke-width="1.5"/>
  <text x="310" y="149.9" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="88.3" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="19.8,18.8 29.1,41.7 37.2,60.5 45.4,78.2 54.6,97 63.9,114.3 72,128.3 81.3,142.8 89.5,154.3 98.7,166 106.9,175 116.1,184 124.3,190.6 132.4,196 141.7,200.9 149.8,203.9 159.1,206 168.4,206.5 176.5,205.8 184.6,204 193.9,200.4 202,196.1 211.3,189.8 220.6,182 228.7,174 236.8,164.8 246.1,152.9 254.3,141.2 263.5,126.6 271.7,112.5 281,95 289.1,78.5 298.4,58.2"/>
  <circle cx="39.8" cy="66.4" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="149.1" cy="203.7" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="258.3" cy="135" r="3.5" fill="currentColor" stroke="none"/>
  <text x="73.8" y="68.4" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(−1,4)</text>
  <text x="149.1" y="225.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(2,−2)</text>
  <text x="224.3" y="135" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(5,1)</text>
  <text x="277.1" y="77.8" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f</text>
</svg>`,
        hints: [
          String.raw`לא צריך את הנוסחה של $f$: $\int_a^bf'(x)\,dx=f(b)-f(a)$.`,
        ],
        solutionSteps: [
          String.raw`$f$ היא פונקציה קדומה של $f'$, ולכן כל אינטגרל של $f'$ הוא הפרש של ערכי $f$. מהשרטוט: $f(-1)=4$, $f(2)=-2$, $f(5)=1$.`,
          String.raw`$\int_{-1}^{2}f'(x)\,dx=f(2)-f(-1)=-2-4=-6$ (הפונקציה ירדה ב-$6$).`,
          String.raw`$\int_{2}^{5}f'(x)\,dx=f(5)-f(2)=1-(-2)=3$.`,
          String.raw`$\int_{-1}^{5}f'(x)\,dx=f(5)-f(-1)=1-4=-3$, וזה גם הסכום $-6+3$ לפי תכונת הפיצול.`,
        ],
        finalAnswer: String.raw`$-6$, $3$, $-3$`,
        answers: [
          { label: String.raw`$\int_{-1}^{2}f'(x)\,dx$`, value: -6 },
          { label: String.raw`$\int_{2}^{5}f'(x)\,dx$`, value: 3 },
          { label: String.raw`$\int_{-1}^{5}f'(x)\,dx$`, value: -3 },
        ],
      },
      {
        id: 'calc-graph-integral-4',
        difficulty: 2,
        statement: String.raw`בשרטוט מתואר גרף פונקציית הנגזרת $f'$ בקטע $[0,6]$: הגרף קבוע ושווה ל-$2$ בקטע $[0,2]$, יורד בקו ישר מ-$(2,2)$ אל $(4,-2)$ (וחותך את ציר $x$ ב-$x=3$), וקבוע ושווה ל-$-2$ בקטע $[4,6]$. נתון ש-$f(0)=3$.

א. חשבו את $f(2)$, את $f(3)$, את $f(4)$ ואת $f(6)$.

ב. מהו הערך הגדול ביותר של $f$ בקטע $[0,6]$, ובאיזו נקודה הוא מתקבל?`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="122.3" x2="312" y2="122.3" stroke-width="1.5"/>
  <polyline points="306,118.3 312,122.3 306,126.3" stroke-width="1.5"/>
  <line x1="41" y1="228" x2="41" y2="6" stroke-width="1.5"/>
  <polyline points="37,12 41,6 45,12" stroke-width="1.5"/>
  <text x="310" y="114.3" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="53" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="41,55.9 117.8,55.9 194.5,188.8 271.3,188.8"/>
  <circle cx="41" cy="55.9" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="271.3" cy="188.8" r="3.5" fill="currentColor" stroke="none"/>
  <line x1="37" y1="55.9" x2="45" y2="55.9" stroke-width="1.5"/>
  <text x="33" y="60.9" text-anchor="end" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">2</text>
  <line x1="37" y1="188.8" x2="45" y2="188.8" stroke-width="1.5"/>
  <text x="33" y="193.8" text-anchor="end" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">−2</text>
  <line x1="117.8" y1="118.3" x2="117.8" y2="126.3" stroke-width="1.5"/>
  <text x="117.8" y="142.3" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">2</text>
  <line x1="156.2" y1="118.3" x2="156.2" y2="126.3" stroke-width="1.5"/>
  <text x="146.2" y="142.3" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">3</text>
  <line x1="194.5" y1="118.3" x2="194.5" y2="126.3" stroke-width="1.5"/>
  <text x="194.5" y="112.3" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">4</text>
  <line x1="271.3" y1="118.3" x2="271.3" y2="126.3" stroke-width="1.5"/>
  <text x="271.3" y="112.3" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">6</text>
  <line x1="117.8" y1="122.3" x2="117.8" y2="55.9" stroke-dasharray="6 4" stroke-width="1"/>
  <line x1="194.5" y1="122.3" x2="194.5" y2="188.8" stroke-dasharray="6 4" stroke-width="1"/>
  <line x1="271.3" y1="122.3" x2="271.3" y2="188.8" stroke-dasharray="6 4" stroke-width="1"/>
  <text x="79.4" y="45.9" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f′</text>
</svg>`,
        hints: [
          String.raw`$f(b)=f(a)+\int_a^bf'(x)\,dx$. חשבו את השטחים כמלבנים ומשולשים; שטח מתחת לציר נספר במינוס.`,
          String.raw`$f$ עולה כל עוד $f'>0$ ויורדת כש-$f'<0$.`,
        ],
        solutionSteps: [
          String.raw`א. בקטע $[0,2]$ השטח הוא מלבן $2\times2=4$ מעל הציר: $f(2)=3+4=7$.`,
          String.raw`בקטע $[2,3]$ יש משולש מעל הציר עם בסיס $1$ וגובה $2$, ששטחו $1$: $f(3)=7+1=8$.`,
          String.raw`בקטע $[3,4]$ יש משולש זהה מתחת לציר: $f(4)=8-1=7$. בקטע $[4,6]$ מלבן $2\times2=4$ מתחת לציר: $f(6)=7-4=3$.`,
          String.raw`ב. $f'>0$ בקטע $[0,3)$ ו-$f'<0$ בקטע $(3,6]$, ולכן $f$ עולה עד $x=3$ ויורדת אחריו. הערך הגדול ביותר הוא $f(3)=8$.`,
        ],
        finalAnswer: String.raw`$f(2)=7$, $f(3)=8$, $f(4)=7$, $f(6)=3$; הערך הגדול ביותר $8$, ב-$x=3$.`,
        answers: [
          { label: '$f(2)$', value: 7 },
          { label: '$f(3)$', value: 8 },
          { label: '$f(4)$', value: 7 },
          { label: '$f(6)$', value: 3 },
        ],
      },
      {
        id: 'calc-graph-integral-5',
        difficulty: 2,
        statement: String.raw`בשרטוט מתואר גרף פונקציית הנגזרת $f'$ – ישר העובר דרך הנקודות $(1,-2)$ ו-$(3,2)$. נתון ש-$f(1)=4$.

א. מצאו את שיעור ה-$x$ של נקודת המינימום של $f$ ואת ערך המינימום.

ב. חשבו את $f(5)$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="140.3" x2="312" y2="140.3" stroke-width="1.5"/>
  <polyline points="306,136.3 312,140.3 306,144.3" stroke-width="1.5"/>
  <line x1="45.5" y1="228" x2="45.5" y2="6" stroke-width="1.5"/>
  <polyline points="41.5,12 45.5,6 49.5,12" stroke-width="1.5"/>
  <text x="310" y="132.3" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="57.5" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <line x1="31.7" y1="222" x2="297.4" y2="16"/>
  <circle cx="91.3" cy="175.8" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="182.9" cy="104.8" r="3.5" fill="currentColor" stroke="none"/>
  <text x="125.3" y="179.8" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(1,−2)</text>
  <text x="152.9" y="102.8" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(3,2)</text>
  <text x="299.7" y="26.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f′</text>
</svg>`,
        hints: [
          String.raw`הישר חותך את ציר $x$ באמצע בין $x=1$ ל-$x=3$, ושם $f'$ עוברת מ-$-$ ל-$+$.`,
          String.raw`השתמשו בשטחי המשולשים שבין הישר לציר $x$, או מצאו את $f'(x)=2x-4$ ובצעו אינטגרל.`,
        ],
        solutionSteps: [
          String.raw`שיפוע הישר: $\frac{2-(-2)}{3-1}=2$, ולכן $f'(x)=-2+2(x-1)=2x-4$, והוא מתאפס ב-$x=2$.`,
          String.raw`א. $f'<0$ עבור $x<2$ ו-$f'>0$ עבור $x>2$, ולכן ב-$x=2$ מינימום. בקטע $[1,2]$ הגרף מתחת לציר ויוצר משולש עם בסיס $1$ וגובה $2$, ששטחו $1$: $f(2)=f(1)-1=3$.`,
          String.raw`ב. בקטע $[2,5]$ הגרף מעל הציר ויוצר משולש עם בסיס $3$ וגובה $f'(5)=6$, ששטחו $\frac{3\cdot6}2=9$: $f(5)=f(2)+9=12$.`,
          String.raw`בדיקה באינטגרל: $f(x)=x^2-4x+C$, ו-$f(1)=-3+C=4$ נותן $C=7$; אכן $f(2)=3$ ו-$f(5)=25-20+7=12$.`,
        ],
        finalAnswer: String.raw`מינימום ב-$x=2$, וערכו $3$; $f(5)=12$.`,
        answers: [
          { label: 'המינימום: $x$', value: 2 },
          { label: 'ערך המינימום', value: 3 },
          { label: '$f(5)$', value: 12 },
        ],
      },
      {
        id: 'calc-graph-integral-6',
        difficulty: 2,
        statement: String.raw`בשרטוט מתואר גרף פונקציית הנגזרת $f'$ – פרבולה העוברת דרך ראשית הצירים ודרך הנקודה $(4,0)$, שקודקודה $(2,4)$. נתון ש-$f(0)=1$.

א. מצאו את $f'(x)$ ואת $f(x)$.

ב. חשבו את $f(4)$, והראו שההפרש $f(4)-f(0)$ שווה לשטח המוגבל על ידי גרף $f'$ וציר $x$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="135.8" x2="312" y2="135.8" stroke-width="1.5"/>
  <polyline points="306,131.8 312,135.8 306,139.8" stroke-width="1.5"/>
  <line x1="62.1" y1="228" x2="62.1" y2="6" stroke-width="1.5"/>
  <polyline points="58.1,12 62.1,6 66.1,12" stroke-width="1.5"/>
  <text x="310" y="127.8" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="74.1" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="25.3,221.1 34.3,197.8 42.2,178.6 51.2,158.3 59,141.8 66.9,126.6 75.8,110.7 84.8,96.4 92.7,85.2 101.6,74 109.5,65.4 117.4,58.1 126.3,51.3 135.3,46 143.2,42.8 151,40.8 155.5,40.2 160,40 164.5,40.2 169,40.8 176.8,42.8 184.7,46 193.7,51.3 202.6,58.1 210.5,65.4 218.4,74 227.3,85.2 235.2,96.4 244.2,110.7 253.1,126.6 261,141.8 268.8,158.3 277.8,178.6 286.8,200.6 294.7,221.1"/>
  <circle cx="160" cy="40" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="257.9" cy="135.8" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="62.1" cy="135.8" r="3.5" fill="currentColor" stroke="none"/>
  <text x="190" y="44" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(2,4)</text>
  <line x1="257.9" y1="131.8" x2="257.9" y2="139.8" stroke-width="1.5"/>
  <text x="269.9" y="129.8" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">4</text>
  <text x="276.2" y="202.8" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f′</text>
</svg>`,
        hints: [
          String.raw`פרבולה שאפסיה $0$ ו-$4$: $f'(x)=ax(x-4)$. מצאו את $a$ מהקודקוד.`,
          String.raw`$f(x)=\int f'(x)\,dx$, ואת $C$ מוצאים מ-$f(0)=1$.`,
        ],
        solutionSteps: [
          String.raw`א. $f'(x)=ax(x-4)$, והקודקוד נותן $f'(2)=a\cdot2\cdot(-2)=-4a=4$, כלומר $a=-1$ ו-$f'(x)=-x^2+4x$.`,
          String.raw`$f(x)=\int\left(-x^2+4x\right)dx=-\frac{x^3}3+2x^2+C$, ו-$f(0)=C=1$: $f(x)=-\frac{x^3}3+2x^2+1$.`,
          String.raw`ב. $f(4)=-\frac{64}3+32+1=\frac{35}3$.`,
          String.raw`בקטע $[0,4]$ גרף $f'$ מעל ציר $x$, ולכן השטח הוא $\int_0^4f'(x)\,dx=f(4)-f(0)=\frac{35}3-1=\frac{32}3$ – בדיוק ההפרש.`,
        ],
        finalAnswer: String.raw`$f'(x)=-x^2+4x$, $f(x)=-\frac{x^3}3+2x^2+1$; $f(4)=\frac{35}3$; השטח $\frac{32}3$.`,
        answers: [
          { label: '$f(4)$', value: 11.666666666666666 },
          { label: 'השטח', value: 10.666666666666666 },
        ],
      },
      {
        id: 'calc-graph-integral-7',
        difficulty: 2,
        statement: String.raw`נגזרת הפונקציה $f$ היא $f'(x)=x^2-2x$, ונתון $f(0)=1$.

א. חשבו את $\int_0^3f'(x)\,dx$, והסיקו מה הקשר בין $f(3)$ ל-$f(0)$.

ב. חשבו את השטח המוגבל על ידי גרף $f'$, ציר $x$ והישר $x=3$.

ג. מצאו את הערך הקטן ביותר של $f$ בקטע $[0,3]$.`,
        hints: [
          String.raw`$f'(x)=x(x-2)$ שלילית ב-$(0,2)$ וחיובית ב-$(2,3)$.`,
          String.raw`האינטגרל הוא השינוי $f(3)-f(0)$; השטח הוא סכום השטחים בלי סימן.`,
          String.raw`בסעיף ג: $f(2)=f(0)+\int_0^2f'(x)\,dx$.`,
        ],
        solutionSteps: [
          String.raw`א. $\int_0^3\left(x^2-2x\right)dx=\left[\frac{x^3}3-x^2\right]_0^3=9-9=0$, ולכן $f(3)-f(0)=0$, כלומר $f(3)=f(0)=1$.`,
          String.raw`ב. $f'(x)=x(x-2)$: שלילית ב-$(0,2)$ וחיובית ב-$(2,3)$. $\int_0^2f'\,dx=\frac83-4=-\frac43$, ו-$\int_2^3f'\,dx=0-\left(-\frac43\right)=\frac43$.`,
          String.raw`השטח: $S=\frac43+\frac43=\frac83$ – שני חלקים שווים, אחד מתחת לציר ואחד מעליו, ולכן האינטגרל בסעיף א יצא $0$.`,
          String.raw`ג. $f$ יורדת ב-$(0,2)$ ועולה ב-$(2,3)$, ולכן הערך הקטן ביותר בקטע הוא $f(2)=f(0)+\int_0^2f'\,dx=1-\frac43=-\frac13$.`,
        ],
        finalAnswer: String.raw`א. $0$, ולכן $f(3)=f(0)$; ב. $\frac83$; ג. $f(2)=-\frac13$.`,
        answers: [
          { label: 'א: האינטגרל', value: 0 },
          { label: 'ב: השטח', value: 2.6666666666666665 },
          { label: 'ג: הערך הקטן ביותר', value: -0.3333333333333333 },
        ],
      },
      {
        id: 'calc-graph-integral-8',
        difficulty: 2,
        statement: String.raw`נגזרת הפונקציה $f$ היא $f'(x)=3x^2-12$, ונתון $f(2)=-10$.

א. מצאו את שיעורי ה-$x$ של נקודות הקיצון של $f$ וקבעו את סוגן, וחשבו את השטח המוגבל על ידי גרף $f'$ וציר $x$.

ב. בעזרת סעיף א בלבד (בלי למצוא את $f$), מצאו את ערך המקסימום המקומי של $f$.`,
        hints: [
          String.raw`$f'(x)=3(x-2)(x+2)$ – פרבולה שלילית בין $-2$ ל-$2$.`,
          String.raw`$f(2)-f(-2)=\int_{-2}^{2}f'(x)\,dx=-S$.`,
        ],
        solutionSteps: [
          String.raw`א. $f'(x)=3\left(x^2-4\right)=3(x-2)(x+2)$: חיובית עבור $x<-2$, שלילית ב-$(-2,2)$ וחיובית עבור $x>2$. לכן ב-$x=-2$ מקסימום וב-$x=2$ מינימום.`,
          String.raw`גרף $f'$ מתחת לציר $x$ בין $-2$ ל-$2$: $S=-\int_{-2}^{2}\left(3x^2-12\right)dx=-\Big[x^3-12x\Big]_{-2}^{2}=-\big((8-24)-(-8+24)\big)=32$.`,
          String.raw`ב. $f(2)-f(-2)=\int_{-2}^{2}f'(x)\,dx=-32$, כלומר ערך המקסימום גדול מערך המינימום בדיוק בשטח $S$.`,
          String.raw`$f(-2)=f(2)+32=-10+32=22$.`,
        ],
        finalAnswer: String.raw`מקסימום ב-$x=-2$, מינימום ב-$x=2$; $S=32$; ערך המקסימום $f(-2)=22$.`,
        answers: [
          { label: 'השטח', value: 32 },
          { label: 'ערך המקסימום', value: 22 },
        ],
      },
      {
        id: 'calc-graph-integral-9',
        difficulty: 3,
        statement: String.raw`בשרטוט מתואר גרף פונקציית הנגזרת $f'$ בקטע $[0,5]$. הגרף חותך את ציר $x$ בנקודות שבהן $x=0$, $x=2$ ו-$x=4$. השטחים המסומנים בין הגרף לציר $x$ הם $S_1=16$ (בקטע $[0,2]$, מעל הציר), $S_2=16$ (בקטע $[2,4]$, מתחת לציר) ו-$S_3=25$ (בקטע $[4,5]$, מעל הציר). נתון ש-$f(0)=2$.

א. חשבו את $f(2)$, את $f(4)$ ואת $f(5)$.

ב. מצאו את הערך הגדול ביותר ואת הערך הקטן ביותר של $f$ בקטע $[0,5]$, ואת הנקודות שבהן הם מתקבלים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <polygon points="32.9,179.7 37.1,173.1 43.3,164.8 49.6,158.2 55.8,153.3 62,149.9 68.2,147.9 74.5,147.2 80.7,147.7 86.9,149.1 93.2,151.5 99.4,154.7 105.6,158.5 118.1,167.7 143,188.5 153.4,196.6 163.7,203.6 172,208 178.3,210.3 182.4,211.4 186.6,212.1 190.7,212.3 197,211.6 201.1,210.4 205.3,208.6 209.4,206.2 215.6,201.3 219.8,197.1 223.9,192.1 228.1,186.4 234.3,176.1 238.5,168.2 246.8,149.4 253,132.8 257.2,120.3 265.5,92.1 273.8,59.2 282.1,21.3 282.1,179.7 32.9,179.7" fill="currentColor" fill-opacity="0.15" stroke="none"/>
  <line x1="14" y1="179.7" x2="312" y2="179.7" stroke-width="1.5"/>
  <polyline points="306,175.7 312,179.7 306,183.7" stroke-width="1.5"/>
  <line x1="32.9" y1="228" x2="32.9" y2="6" stroke-width="1.5"/>
  <polyline points="28.9,12 32.9,6 36.9,12" stroke-width="1.5"/>
  <text x="310" y="171.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="44.9" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="25.5,193.9 31,183.2 37.6,172.4 43.1,165.1 49.7,158.1 56.3,153 62.9,149.6 69.5,147.7 72.8,147.3 77.2,147.3 82.7,148 89.3,150 95.9,152.8 103.6,157.2 110.2,161.7 117.9,167.5 143.2,188.6 153.1,196.4 163,203.1 172.9,208.3 178.4,210.4 182.8,211.5 188.3,212.2 192.7,212.2 197.1,211.5 201.5,210.2 205.9,208.3 210.3,205.6 215.8,201.1 220.2,196.6 225.7,189.7 230.1,183.2 235.6,173.7 240,165 244.4,155.1 248.8,144.2 257.6,118.8 266.4,88.5 275.2,52.8 282.9,17"/>
  <line x1="132.6" y1="175.7" x2="132.6" y2="183.7" stroke-width="1.5"/>
  <text x="122.6" y="199.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">2</text>
  <line x1="232.2" y1="175.7" x2="232.2" y2="183.7" stroke-width="1.5"/>
  <text x="222.2" y="171.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">4</text>
  <line x1="282.1" y1="175.7" x2="282.1" y2="183.7" stroke-width="1.5"/>
  <text x="288.1" y="199.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">5</text>
  <line x1="282.1" y1="179.7" x2="282.1" y2="21.3" stroke-dasharray="6 4" stroke-width="1"/>
  <text x="82.8" y="173.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">S₁</text>
  <text x="182.4" y="199.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">S₂</text>
  <text x="263.1" y="171.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">S₃</text>
  <text x="271.1" y="34.5" text-anchor="end" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f′</text>
</svg>`,
        hints: [
          String.raw`שטח מעל הציר מוסיף לערך של $f$, ושטח מתחת לציר מחסיר ממנו.`,
          String.raw`קיצון מוחלט בקטע סגור: משווים את ערכי $f$ בנקודות הקיצון המקומי ($x=2$, $x=4$) ובקצוות ($x=0$, $x=5$).`,
        ],
        solutionSteps: [
          String.raw`א. $f(2)=f(0)+S_1=2+16=18$; $f(4)=f(2)-S_2=18-16=2$; $f(5)=f(4)+S_3=2+25=27$.`,
          String.raw`ב. $f'>0$ ב-$(0,2)$, $f'<0$ ב-$(2,4)$ ו-$f'>0$ ב-$(4,5)$: $f$ עולה, יורדת ושוב עולה. לכן ב-$x=2$ מקסימום מקומי, ב-$x=4$ מינימום מקומי, וב-$x=0$ וב-$x=5$ נקודות קיצון קצה.`,
          String.raw`המועמדים: $f(0)=2$, $f(2)=18$, $f(4)=2$, $f(5)=27$.`,
          String.raw`הערך הגדול ביותר הוא $27$ – בקצה $x=5$, ולא במקסימום המקומי. הערך הקטן ביותר הוא $2$, והוא מתקבל בשתי נקודות: $x=0$ ו-$x=4$.`,
        ],
        finalAnswer: String.raw`$f(2)=18$, $f(4)=2$, $f(5)=27$; מקסימום מוחלט $27$ ב-$x=5$; מינימום מוחלט $2$ ב-$x=0$ וב-$x=4$.`,
        answers: [
          { label: '$f(2)$', value: 18 },
          { label: '$f(4)$', value: 2 },
          { label: '$f(5)$', value: 27 },
        ],
      },
      {
        id: 'calc-graph-integral-10',
        difficulty: 3,
        statement: String.raw`בשרטוט מתואר גרף הפונקציה $f$. לפונקציה יש נקודת מקסימום $(1,5)$, והישר $y=3x-10$ משיק לגרף בנקודה $(4,2)$ (ראו שרטוט).

חשבו את $\int_1^4f'(x)\,dx$ ואת $\int_1^4f''(x)\,dx$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="205.5" x2="312" y2="205.5" stroke-width="1.5"/>
  <polyline points="306,201.5 312,205.5 306,209.5" stroke-width="1.5"/>
  <line x1="38.3" y1="228" x2="38.3" y2="6" stroke-width="1.5"/>
  <polyline points="34.3,12 38.3,6 42.3,12" stroke-width="1.5"/>
  <text x="310" y="197.5" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="50.3" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="23.1,197.3 29.9,176.7 37.8,156.4 44.6,141.9 47.9,135.6 52.5,128.2 55.9,123.3 60.4,117.7 63.8,114.1 68.3,110.2 72.8,107.1 77.3,104.8 81.9,103.4 86.4,102.6 93.2,102.8 96.6,103.4 101.1,104.7 109,108.2 118,113.9 125.9,120 133.9,126.8 161,152.8 171.2,162 181.3,170 187,173.8 191.5,176.3 197.2,178.9 201.7,180.4 206.2,181.3 210.7,181.6 215.3,181.3 219.8,180.2 224.3,178.4 228.8,175.8 233.3,172.4 237.9,168.1 242.4,162.8 245.8,158.1 250.3,151.1 254.8,142.9 262.7,125.9 270.7,105.2 278.6,80.5 286.5,51.5 294.4,18"/>
  <line x1="205.6" y1="207.6" x2="286.8" y2="108.7" stroke-dasharray="6 4" stroke-width="1.5"/>
  <circle cx="89" cy="102.5" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="241.1" cy="164.3" r="3.5" fill="currentColor" stroke="none"/>
  <text x="89" y="90.5" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(1,5)</text>
  <text x="271.1" y="170.3" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">(4,2)</text>
  <text x="273.3" y="34.5" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f</text>
</svg>`,
        hints: [
          String.raw`$f$ היא פונקציה קדומה של $f'$, ו-$f'$ היא פונקציה קדומה של $f''$.`,
          String.raw`$\int_1^4f''(x)\,dx=f'(4)-f'(1)$. מהו השיפוע בנקודת מקסימום, ומהו שיפוע המשיק הנתון?`,
        ],
        solutionSteps: [
          String.raw`$f$ היא פונקציה קדומה של $f'$, ולכן $\int_1^4f'(x)\,dx=f(4)-f(1)=2-5=-3$.`,
          String.raw`$f'$ היא פונקציה קדומה של $f''$, ולכן $\int_1^4f''(x)\,dx=f'(4)-f'(1)$.`,
          String.raw`$(1,5)$ היא נקודת מקסימום של פונקציה גזירה, ולכן $f'(1)=0$. שיפוע המשיק בנקודה $(4,2)$ הוא שיפוע הישר $y=3x-10$, כלומר $f'(4)=3$.`,
          String.raw`$\int_1^4f''(x)\,dx=3-0=3$.`,
        ],
        finalAnswer: String.raw`$\int_1^4f'(x)\,dx=-3$; $\int_1^4f''(x)\,dx=3$.`,
        answers: [
          { label: String.raw`$\int_1^4f'(x)\,dx$`, value: -3 },
          { label: String.raw`$\int_1^4f''(x)\,dx$`, value: 3 },
        ],
      },
    ],
  },
  'calc-review': {
    intro: String.raw`תרגילים מסכמים לפרק החדו״א, בסגנון השאלות 6, 7 ו-8 בבגרות: כל תרגיל משלב כמה מיומנויות – חקירה (תחום, חיתוך עם הצירים, קיצון, אסימפטוטות, קעירות), משוואת משיק, חישוב שטחים ובעיות קיצון גרפיות. לפני כל סעיף כדאי לשאול: מה כבר מצאתי בסעיפים הקודמים שאפשר להשתמש בו? זכרו את המיקוד: שטחים מחשבים רק באינטגרלים של פולינומים ושל $\frac{c\,f'(x)}{(f(x))^n}$, ובעיות הקיצון הן גרפיות בלבד.`,
    keyFacts: [
      String.raw`**שאלה 6** (פולינום, מנה, שורש): חקירה מלאה ← סקיצה ← סעיף על משיק או על מספר פתרונות ← שטח בעזרת הנקודות שנמצאו.`,
      String.raw`**שאלה 7** (טריגונומטריה): חקירה בתחום סגור ברדיאנים – נגזרת, פירוק לגורמים בעזרת זהויות, טבלת סימנים, קיצון כולל קצוות, ומשיק.`,
      String.raw`**שאלה 8** (קיצון גרפי): נקודה כללית $(x,f(x))$ ← ביטוי במשתנה אחד ← תחום ← גזירה ← הוכחת סוג הקיצון ← תשובה מלאה.`,
      String.raw`**משיק ושטח**: המשיק בנקודה $(x_0,f(x_0))$ הוא $y-f(x_0)=f'(x_0)(x-x_0)$. כדי לדעת אם הגרף מעל המשיק או מתחתיו מפרקים את ההפרש $f(x)-(mx+n)$ – בנקודת ההשקה יש לו שורש כפול.`,
      String.raw`**פרמטר**: מתרגמים כל נתון למשוואה – ״שיפוע המשיק ב-$x_0$ הוא $m$״ ← $f'(x_0)=m$; ״קיצון ב-$x_0$״ ← $f'(x_0)=0$; ״הגרף עובר דרך...״ ← הצבה.`,
    ],
    exercises: [
      {
        id: 'calc-review-1',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=-x^3+3x^2$.

א. מצאו את נקודות החיתוך של גרף הפונקציה עם הצירים ואת נקודות הקיצון שלה, וקבעו את סוגן.

ב. מצאו את נקודת הפיתול של הפונקציה ואת משוואת המשיק לגרף בנקודה זו.

ג. חשבו את השטח המוגבל על ידי גרף הפונקציה וציר $x$.`,
        hints: [
          String.raw`$f(x)=x^2(3-x)$ ו-$f'(x)=-3x^2+6x=-3x(x-2)$.`,
          String.raw`$f''(x)=-6x+6$. שיפוע המשיק בנקודת הפיתול הוא הערך של $f'$ בנקודה זו.`,
          String.raw`בקטע $[0,3]$ הפונקציה אי-שלילית, ולכן $S=\int_0^3\left(3x^2-x^3\right)dx$.`,
        ],
        solutionSteps: [
          String.raw`א. $f(x)=x^2(3-x)=0\Rightarrow x=0$ (שורש כפול) או $x=3$: נקודות החיתוך הן $(0,0)$ ו-$(3,0)$.`,
          String.raw`$f'(x)=-3x^2+6x=-3x(x-2)$: שלילית עבור $x<0$, חיובית ב-$(0,2)$ ושלילית עבור $x>2$. לכן $(0,0)$ מינימום ו-$(2,f(2))=(2,4)$ מקסימום.`,
          String.raw`ב. $f''(x)=-6x+6$ מתאפסת ב-$x=1$ ומחליפה בה סימן, ולכן נקודת הפיתול היא $(1,f(1))=(1,2)$.`,
          String.raw`שיפוע המשיק: $f'(1)=-3+6=3$, והמשיק: $y-2=3(x-1)$, כלומר $y=3x-1$.`,
          String.raw`ג. בקטע $[0,3]$: $f(x)=x^2(3-x)\ge0$, ולכן $S=\int_0^3\left(3x^2-x^3\right)dx=\left[x^3-\frac{x^4}4\right]_0^3=27-\frac{81}4=\frac{27}4$.`,
        ],
        finalAnswer: String.raw`א. חיתוך $(0,0)$ ו-$(3,0)$; מינימום $(0,0)$, מקסימום $(2,4)$; ב. פיתול $(1,2)$, משיק $y=3x-1$; ג. $S=\frac{27}4$.`,
        answers: [
          { label: 'המקסימום: $y$', value: 4 },
          { label: 'שיפוע המשיק בנקודת הפיתול', value: 3 },
          { label: 'השטח', value: 6.75 },
        ],
      },
      {
        id: 'calc-review-2',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{16x}{\left(x^2+3\right)^2}$.

א. מצאו את תחום ההגדרה, הראו שהפונקציה אי-זוגית, ומצאו את האסימפטוטות שלה המקבילות לצירים.

ב. מצאו את נקודות הקיצון של הפונקציה וקבעו את סוגן.

ג. חשבו את השטח המוגבל על ידי גרף הפונקציה, ציר $x$ והישר $x=3$.`,
        hints: [
          String.raw`המכנה חיובי תמיד. כאשר $x\to\pm\infty$ מעלת המכנה ($4$) גדולה ממעלת המונה ($1$).`,
          String.raw`$f'(x)=\frac{16\left(x^2+3\right)^2-16x\cdot2\left(x^2+3\right)\cdot2x}{\left(x^2+3\right)^4}=\frac{48\left(1-x^2\right)}{\left(x^2+3\right)^3}$.`,
          String.raw`המונה הוא פי $8$ מהנגזרת של $x^2+3$, ולכן $\int f(x)\,dx=-\frac8{x^2+3}+C$.`,
        ],
        solutionSteps: [
          String.raw`א. $x^2+3>0$ לכל $x$, ולכן הפונקציה מוגדרת לכל $x$ ואין אסימפטוטה אנכית. $f(-x)=\frac{-16x}{\left(x^2+3\right)^2}=-f(x)$, ולכן הפונקציה אי-זוגית.`,
          String.raw`כאשר $x\to\pm\infty$ מעלת המכנה גדולה ממעלת המונה, ולכן $f(x)\to0$: אסימפטוטה אופקית $y=0$.`,
          String.raw`ב. לפי כלל המנה, ואחרי צמצום ב-$x^2+3$: $f'(x)=\frac{16\left(x^2+3\right)-64x^2}{\left(x^2+3\right)^3}=\frac{48\left(1-x^2\right)}{\left(x^2+3\right)^3}$.`,
          String.raw`$f'(x)=0\iff x=\pm1$. $f'<0$ עבור $|x|>1$ ו-$f'>0$ עבור $|x|<1$, ולכן $(-1,-1)$ מינימום ו-$(1,1)$ מקסימום (למשל $f(1)=\frac{16}{16}=1$).`,
          String.raw`ג. בקטע $[0,3]$ מתקיים $f(x)\ge0$, ולכן $S=\int_0^3\frac{16x}{\left(x^2+3\right)^2}dx=8\int_0^3\frac{2x}{\left(x^2+3\right)^2}dx$.`,
          String.raw`$S=8\left[-\frac1{x^2+3}\right]_0^3=8\left(-\frac1{12}+\frac13\right)=8\cdot\frac14=2$.`,
        ],
        finalAnswer: String.raw`א. כל $x$, אי-זוגית, אסימפטוטה $y=0$; ב. מקסימום $(1,1)$, מינימום $(-1,-1)$; ג. $S=2$.`,
        answers: [
          { label: 'המקסימום: $y$', value: 1 },
          { label: 'השטח', value: 2 },
        ],
      },
      {
        id: 'calc-review-3',
        difficulty: 2,
        statement: String.raw`נתונה הפונקציה $f(x)=4-x^2$. התחום המוגבל על ידי גרף הפונקציה וציר $x$ מסומן בשרטוט. בתוך התחום חוסמים מלבן $ABCD$ שהצלע $AD$ שלו על ציר $x$ והקודקודים $B$ ו-$C$ על גרף הפונקציה (ראו שרטוט).

א. חשבו את שטח התחום.

ב. מצאו את שיעורי $B$ שעבורם שטח המלבן מקסימלי.

ג. חשבו את היחס בין השטח המקסימלי של המלבן לבין שטח התחום.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <polygon points="58.6,198.2 70.4,163.4 77.2,145.5 83.9,128.9 90.7,113.8 97.5,100 104.2,87.7 109.3,79.4 116,69.5 122.8,61.1 127.9,55.7 134.6,49.7 141.4,45.1 148.2,41.9 154.9,40.2 160,39.8 166.8,40.5 173.5,42.6 178.6,45.1 185.4,49.7 192.1,55.7 198.9,63.1 204,69.5 210.7,79.4 217.5,90.7 224.2,103.3 229.3,113.8 236.1,128.9 242.8,145.5 249.6,163.4 261.4,198.2 261.4,198.2 58.6,198.2" fill="currentColor" fill-opacity="0.15" stroke="none"/>
  <line x1="14" y1="198.2" x2="312" y2="198.2" stroke-width="1.5"/>
  <polyline points="306,194.2 312,198.2 306,202.2" stroke-width="1.5"/>
  <line x1="160" y1="228" x2="160" y2="6" stroke-width="1.5"/>
  <polyline points="156,12 160,6 164,12" stroke-width="1.5"/>
  <text x="310" y="190.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="172" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="52.1,219.1 58.9,197.2 65.7,176.7 72.5,157.6 78.4,142.5 85.2,126.1 92,111.1 98.8,97.5 105.6,85.4 112.4,74.7 119.2,65.4 126,57.6 132.8,51.2 139.6,46.2 146.4,42.6 153.2,40.5 160,39.8 166.8,40.5 173.6,42.6 180.4,46.2 187.2,51.2 194,57.6 200.8,65.4 207.6,74.7 214.4,85.4 221.2,97.5 228,111.1 234.8,126.1 241.7,142.5 248.5,160.3 254.3,176.7 261.1,197.2 267.9,219.1"/>
  <polygon points="89,198.2 231,198.2 231,117.4 89,117.4" stroke-width="2"/>
  <text x="239" y="216.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">A</text>
  <text x="81" y="216.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">D</text>
  <text x="243" y="111.4" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">B</text>
  <text x="77" y="111.4" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">C</text>
</svg>`,
        hints: [
          String.raw`החיתוכים עם ציר $x$ ב-$x=\pm2$, ושטח התחום $\int_{-2}^{2}\left(4-x^2\right)dx$.`,
          String.raw`$B\left(x,4-x^2\right)$ עם $0<x<2$, ושטח המלבן $S(x)=2x\left(4-x^2\right)$.`,
        ],
        solutionSteps: [
          String.raw`א. $4-x^2=0\Rightarrow x=\pm2$, ובקטע $[-2,2]$ הפונקציה אי-שלילית. נסמן את שטח התחום ב-$T$: $T=\int_{-2}^{2}\left(4-x^2\right)dx=\left[4x-\frac{x^3}3\right]_{-2}^{2}=\frac{32}3$.`,
          String.raw`ב. $f$ זוגית, ולכן $B\left(x,4-x^2\right)$ ו-$C\left(-x,4-x^2\right)$ עם $0<x<2$, ושטח המלבן $S(x)=2x\left(4-x^2\right)=8x-2x^3$.`,
          String.raw`$S'(x)=8-6x^2=0\Rightarrow x^2=\frac43\Rightarrow x=\frac2{\sqrt3}$ (בתחום). $S''(x)=-12x<0$, ולכן מקסימום.`,
          String.raw`$y_B=4-\frac43=\frac83$, כלומר $B\left(\frac2{\sqrt3},\frac83\right)\approx(1.155,\,2.667)$, והשטח המקסימלי $S=\frac4{\sqrt3}\cdot\frac83=\frac{32}{3\sqrt3}$.`,
          String.raw`ג. $\frac{S}{T}=\frac{32}{3\sqrt3}\cdot\frac3{32}=\frac1{\sqrt3}=\frac{\sqrt3}3\approx0.577$.`,
        ],
        finalAnswer: String.raw`א. $T=\frac{32}3$; ב. $B\left(\frac2{\sqrt3},\frac83\right)$; ג. $\frac{\sqrt3}3\approx0.577$.`,
        answers: [
          { label: 'שטח התחום', value: 10.666666666666666 },
          { label: '$x_B$', value: 1.1547005383792517 },
          { label: '$y_B$', value: 2.6666666666666665 },
          { label: 'היחס', value: 0.5773502691896258 },
        ],
      },
      {
        id: 'calc-review-4',
        difficulty: 2,
        statement: String.raw`נגזרת הפונקציה $f$ היא $f'(x)=3x^2-6x-9$. גרף הפונקציה משיק לציר $x$ בנקודת המינימום שלו.

א. מצאו את $f(x)$ ואת נקודות הקיצון של $f$, וקבעו את סוגן.

ב. מצאו את נקודות החיתוך של גרף $f$ עם הצירים.

ג. חשבו את השטח המוגבל על ידי גרף $f$ וציר $x$.`,
        hints: [
          String.raw`$f'(x)=3(x+1)(x-3)$. ״משיק לציר $x$ בנקודת המינימום״ פירושו שערך המינימום הוא $0$.`,
          String.raw`$f(x)=x^3-3x^2-9x+C$, ו-$f(3)=0$.`,
          String.raw`ב-$x=3$ יש שורש כפול: $f(x)=(x-3)^2(x+3)$.`,
        ],
        solutionSteps: [
          String.raw`א. $f'(x)=3\left(x^2-2x-3\right)=3(x+1)(x-3)$: חיובית עבור $x<-1$, שלילית ב-$(-1,3)$ וחיובית עבור $x>3$. לכן ב-$x=-1$ מקסימום וב-$x=3$ מינימום.`,
          String.raw`$f(x)=\int\left(3x^2-6x-9\right)dx=x^3-3x^2-9x+C$. הגרף משיק לציר $x$ בנקודת המינימום, כלומר $f(3)=27-27-27+C=0$, ולכן $C=27$: $f(x)=x^3-3x^2-9x+27$. המקסימום: $f(-1)=-1-3+9+27=32$, כלומר $(-1,32)$, והמינימום $(3,0)$.`,
          String.raw`ב. $f(x)=x^2(x-3)-9(x-3)=(x-3)\left(x^2-9\right)=(x-3)^2(x+3)$, ולכן נקודות החיתוך עם ציר $x$ הן $(-3,0)$ ו-$(3,0)$ (נקודת השקה), ועם ציר $y$ – $(0,27)$.`,
          String.raw`ג. בקטע $[-3,3]$: $f(x)=(x-3)^2(x+3)\ge0$, ולכן $S=\int_{-3}^{3}\left(x^3-3x^2-9x+27\right)dx$.`,
          String.raw`האינטגרל של המחוברים האי-זוגיים $x^3$ ו-$-9x$ על קטע סימטרי הוא $0$, ולכן $S=\int_{-3}^{3}\left(27-3x^2\right)dx=\Big[27x-x^3\Big]_{-3}^{3}=54-(-54)=108$.`,
        ],
        finalAnswer: String.raw`א. $f(x)=x^3-3x^2-9x+27$; מקסימום $(-1,32)$, מינימום $(3,0)$; ב. $(-3,0)$, $(3,0)$, $(0,27)$; ג. $S=108$.`,
        answers: [
          { label: 'המקסימום: $y$', value: 32 },
          { label: 'השטח', value: 108 },
        ],
      },
      {
        id: 'calc-review-5',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=2\sin x+\sin2x$ בתחום $0\le x\le2\pi$.

א. הראו ש-$f'(x)=2(2\cos x-1)(\cos x+1)$.

ב. מצאו את נקודות הקיצון של הפונקציה בתחום (כולל קצוות) וקבעו את סוגן.

ג. הראו שהמשיק לגרף בנקודה שבה $x=\pi$ הוא ציר $x$, והסבירו מדוע $x=\pi$ אינה נקודת קיצון.`,
        hints: [
          String.raw`$f'(x)=2\cos x+2\cos2x$; השתמשו בזהות $\cos2x=2\cos^2x-1$.`,
          String.raw`$\cos x+1\ge0$ תמיד, ולכן הסימן של $f'$ נקבע לפי $2\cos x-1$.`,
          String.raw`ב-$x=\pi$: $f(\pi)=0$ ו-$f'(\pi)=0$. האם $f'$ מחליפה שם סימן?`,
        ],
        solutionSteps: [
          String.raw`א. $f'(x)=2\cos x+2\cos2x=2\cos x+2\left(2\cos^2x-1\right)=2\left(2\cos^2x+\cos x-1\right)=2(2\cos x-1)(\cos x+1)$.`,
          String.raw`ב. $f'(x)=0\iff\cos x=\frac12$ או $\cos x=-1$; בתחום: $x=\frac\pi3$, $x=\frac{5\pi}3$ ו-$x=\pi$.`,
          String.raw`$\cos x+1\ge0$, ולכן $f'>0$ כאשר $\cos x>\frac12$ (ב-$0\le x<\frac\pi3$ וב-$\frac{5\pi}3<x\le2\pi$), ו-$f'<0$ כאשר $\cos x<\frac12$ (ב-$\frac\pi3<x<\frac{5\pi}3$, פרט ל-$x=\pi$ שבה $f'=0$).`,
          String.raw`לכן $\left(\frac\pi3,\frac{3\sqrt3}2\right)$ מקסימום ו-$\left(\frac{5\pi}3,-\frac{3\sqrt3}2\right)$ מינימום (למשל $f\left(\frac\pi3\right)=2\cdot\frac{\sqrt3}2+\frac{\sqrt3}2=\frac{3\sqrt3}2$). בקצוות: $(0,0)$ מינימום קצה (הפונקציה עולה מימינו) ו-$(2\pi,0)$ מקסימום קצה (הפונקציה עולה לפניו).`,
          String.raw`ג. $f(\pi)=2\sin\pi+\sin2\pi=0$ ו-$f'(\pi)=2(-2-1)\cdot0=0$, ולכן המשיק בנקודה $(\pi,0)$ הוא $y=0$ – ציר $x$.`,
          String.raw`משני צדי $x=\pi$ מתקיים $f'<0$ (כי $\cos x<\frac12$), כלומר $f$ יורדת לפני $\pi$ וגם אחריו, ולכן אין שם קיצון – זו נקודת פיתול עם משיק אופקי.`,
        ],
        finalAnswer: String.raw`מקסימום $\left(\frac\pi3,\frac{3\sqrt3}2\right)$, מינימום $\left(\frac{5\pi}3,-\frac{3\sqrt3}2\right)$; קצוות: מינימום $(0,0)$, מקסימום $(2\pi,0)$; ב-$x=\pi$ המשיק הוא $y=0$ ואין קיצון.`,
        answers: [
          { label: 'המקסימום המקומי: $x$', value: 1.0471975511965976 },
          { label: 'ערך המקסימום', value: 2.598076211353316 },
          { label: 'ערך המינימום', value: -2.598076211353316 },
        ],
      },
      {
        id: 'calc-review-6',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x^2}4$ והנקודה $A(0,5)$. הנקודה $P$ נמצאת על גרף הפונקציה (ראו שרטוט).

א. מצאו את שיעורי הנקודות על הגרף הקרובות ביותר לנקודה $A$, ואת המרחק המינימלי.

ב. הישר העובר דרך שתי הנקודות שמצאתם בסעיף א חוסם עם גרף הפונקציה תחום. חשבו את שטח התחום.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2" direction="ltr">
  <line x1="14" y1="201.4" x2="312" y2="201.4" stroke-width="1.5"/>
  <polyline points="306,197.4 312,201.4 306,205.4" stroke-width="1.5"/>
  <line x1="160" y1="228" x2="160" y2="6" stroke-width="1.5"/>
  <polyline points="156,12 160,6 164,12" stroke-width="1.5"/>
  <text x="310" y="193.4" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">x</text>
  <text x="172" y="18" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">y</text>
  <polyline points="20.6,20.6 29.9,43.9 38.1,63 47.3,83.2 55.5,99.7 64.8,117 72.9,130.8 81,143.3 90.3,156.2 99.6,167.4 107.7,176 117,184.2 125.2,190.1 134.4,195.3 142.6,198.6 150.7,200.6 155.4,201.2 160,201.4 164.6,201.2 169.3,200.6 177.4,198.6 186.7,194.8 194.8,190.1 203,184.2 212.3,176 220.4,167.4 229.7,156.2 237.8,145 247.1,130.8 256.4,114.9 264.5,99.7 273.8,80.8 281.9,63 291.2,41.1 299.4,20.6"/>
  <circle cx="160" cy="72.7" r="3.5" fill="currentColor" stroke="none"/>
  <text x="194" y="68.7" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">A(0,5)</text>
  <line x1="160" y1="72.7" x2="39" y2="65.2" stroke-dasharray="6 4" stroke-width="1.5"/>
  <circle cx="39" cy="65.2" r="3.5" fill="currentColor" stroke="none"/>
  <text x="43" y="55.2" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">P</text>
  <text x="275.5" y="50.5" text-anchor="middle" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">f</text>
</svg>`,
        hints: [
          String.raw`$d^2=x^2+\left(\frac{x^2}4-5\right)^2=\frac{x^4}{16}-\frac{3x^2}2+25$. מספיק למצוא מינימום של $d^2$.`,
          String.raw`$\left(d^2\right)'=\frac{x^3}4-3x=\frac x4\left(x^2-12\right)$.`,
          String.raw`בסעיף ב הישר הוא $y=3$, והשטח הוא $\int_{-2\sqrt3}^{2\sqrt3}\left(3-\frac{x^2}4\right)dx$.`,
        ],
        solutionSteps: [
          String.raw`א. $P\left(x,\frac{x^2}4\right)$, ולפי נוסחת המרחק $d^2=x^2+\left(\frac{x^2}4-5\right)^2=\frac{x^4}{16}-\frac{3x^2}2+25$. $d$ מינימלי בדיוק כאשר $d^2$ מינימלי.`,
          String.raw`נסמן $h(x)=d^2$: $h'(x)=\frac{x^3}4-3x=\frac x4\left(x^2-12\right)=0\Rightarrow x=0$ או $x=\pm2\sqrt3$.`,
          String.raw`טבלת סימנים של $h'$: שלילית עבור $x<-2\sqrt3$, חיובית ב-$(-2\sqrt3,0)$, שלילית ב-$(0,2\sqrt3)$ וחיובית עבור $x>2\sqrt3$. לכן $x=\pm2\sqrt3$ נקודות מינימום (ו-$x=0$ מקסימום מקומי של המרחק).`,
          String.raw`$f\left(\pm2\sqrt3\right)=\frac{12}4=3$, כלומר הנקודות $\left(\pm2\sqrt3,3\right)$, ו-$h=\frac{144}{16}-18+25=16$, ולכן המרחק המינימלי $4$ (ואכן $d(0)=5>4$).`,
          String.raw`ב. הישר דרך $\left(\pm2\sqrt3,3\right)$ הוא $y=3$, ובין שתי הנקודות הוא מעל הפרבולה.`,
          String.raw`$S=\int_{-2\sqrt3}^{2\sqrt3}\left(3-\frac{x^2}4\right)dx=2\left[3x-\frac{x^3}{12}\right]_0^{2\sqrt3}=2\left(6\sqrt3-\frac{24\sqrt3}{12}\right)=8\sqrt3\approx13.86$.`,
        ],
        finalAnswer: String.raw`א. $\left(\pm2\sqrt3,3\right)$, המרחק המינימלי $4$; ב. $S=8\sqrt3\approx13.86$.`,
        answers: [
          { label: 'הנקודה הימנית: $x$', value: 3.4641016151377544 },
          { label: 'הנקודות: $y$', value: 3 },
          { label: 'המרחק המינימלי', value: 4 },
          { label: 'השטח', value: 13.856406460551018 },
        ],
      },
      {
        id: 'calc-review-7',
        difficulty: 3,
        statement: String.raw`נתונה הפונקציה $f(x)=1-\frac{a}{x^2}$, כאשר $a$ פרמטר. שיפוע המשיק לגרף הפונקציה בנקודה שבה $x=2$ הוא $1$.

א. מצאו את $a$.

ב. מצאו את תחום ההגדרה, את נקודות החיתוך עם הצירים, את האסימפטוטות המקבילות לצירים ואת תחומי העלייה והירידה של הפונקציה.

ג. מצאו את משוואת המשיק לגרף בנקודה שבה $x=2$, וחשבו את השטח המוגבל על ידי גרף הפונקציה, המשיק והישר $x=4$.`,
        hints: [
          String.raw`$f'(x)=\frac{2a}{x^3}$, ו-$f'(2)=1$.`,
          String.raw`המשיק הוא $y=x-2$. ההפרש $(x-2)-f(x)=\frac{x^3-3x^2+4}{x^2}=\frac{(x-2)^2(x+1)}{x^2}$, ולכן המשיק מעל הגרף בקטע $[2,4]$.`,
          String.raw`$\int\frac4{x^2}dx=-\frac4x+C$.`,
        ],
        solutionSteps: [
          String.raw`א. $f(x)=1-ax^{-2}$, ולכן $f'(x)=2ax^{-3}=\frac{2a}{x^3}$. $f'(2)=\frac{2a}8=1\Rightarrow a=4$, ו-$f(x)=1-\frac4{x^2}$.`,
          String.raw`ב. תחום: $x\ne0$. חיתוך עם ציר $x$: $\frac4{x^2}=1\Rightarrow x=\pm2$, הנקודות $(\pm2,0)$; אין חיתוך עם ציר $y$.`,
          String.raw`כאשר $x\to0$: $\frac4{x^2}\to\infty$ ו-$f\to-\infty$ – אסימפטוטה אנכית $x=0$. כאשר $x\to\pm\infty$: $f\to1$ – אסימפטוטה אופקית $y=1$.`,
          String.raw`$f'(x)=\frac8{x^3}$ שלילית עבור $x<0$ וחיובית עבור $x>0$, ולכן $f$ יורדת ב-$x<0$ ועולה ב-$x>0$, ואין לה נקודות קיצון.`,
          String.raw`ג. $f(2)=0$ ו-$f'(2)=1$, ולכן המשיק: $y=x-2$. בקטע $[2,4]$: $(x-2)-f(x)=x-3+\frac4{x^2}=\frac{x^3-3x^2+4}{x^2}=\frac{(x-2)^2(x+1)}{x^2}\ge0$, כלומר המשיק מעל הגרף.`,
          String.raw`$S=\int_2^4\left(x-3+\frac4{x^2}\right)dx=\left[\frac{x^2}2-3x-\frac4x\right]_2^4=(8-12-1)-(2-6-2)=-5+6=1$.`,
        ],
        finalAnswer: String.raw`א. $a=4$; ב. $x\ne0$, חיתוך $(\pm2,0)$, אסימפטוטות $x=0$ ו-$y=1$, יורדת ב-$x<0$ ועולה ב-$x>0$; ג. $y=x-2$, $S=1$.`,
        answers: [
          { label: '$a$', value: 4 },
          { label: 'השטח', value: 1 },
        ],
      },
    ],
  },
};
