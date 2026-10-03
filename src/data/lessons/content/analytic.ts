import type { LessonContent } from '../types';

/**
 * מבוא לגאומטריה אנליטית – תוכן השיעורים.
 * כל השרטוטים מצוירים בקנה מידה ממודל הקואורדינטות של התרגיל; כל תשובה מספרית נבדקת בנפרד ב-analytic.test.ts.
 * השיעורים ag-circle-equation, ag-circle-tangent ו-ag-circle-more שייכים לשאלון 807 (מעגל כללי ומשיק בנקודה שעל המעגל);
 * כל שאר השיעורים בהיקף שאלון 806 (קטעים, ישרים, מעגל שמרכזו בראשית).
 */
export const analyticContent: Record<string, LessonContent> = {
  'ag-distance': {
    intro: String.raw`בשיעור הזה מחשבים את המרחק בין שתי נקודות במערכת צירים. הנוסחה נובעת ממשפט פיתגורס: ההפרש בין שיעורי ה-$x$ וההפרש בין שיעורי ה-$y$ הם ניצבים של משולש ישר זווית, והקטע עצמו הוא היתר. בעזרת הנוסחה מחשבים אורכי צלעות והיקפים, מוכיחים שמשולש שווה שוקיים או ישר זווית, ומוצאים שיעור חסר של נקודה. זה כלי בסיסי בשאלה 4 בשאלון 806 (גאומטריה במישור), וגם בשאלת הגאומטריה האנליטית בשאלון 807.`,
    keyFacts: [
      String.raw`**נוסחת המרחק**: המרחק בין $A(x_1,y_1)$ ל-$B(x_2,y_2)$ הוא $AB=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$ (משפט פיתגורס במשולש שניצביו מקבילים לצירים).`,
      String.raw`**קטע מקביל לציר**: אם $x_1=x_2$ אז $AB=|y_2-y_1|$, ואם $y_1=y_2$ אז $AB=|x_2-x_1|$. המרחק של הנקודה $(x,y)$ מראשית הצירים הוא $\sqrt{x^2+y^2}$.`,
      String.raw`**הוכחת משולש שווה שוקיים**: מחשבים את אורכי שלוש הצלעות ומראים ששתיים מהן שוות.`,
      String.raw`**הוכחת משולש ישר זווית** – לפי המשפט ההפוך למשפט פיתגורס: אם $AB^2+BC^2=AC^2$, אז $\angle ABC=90^\circ$ (הזווית הישרה מול הצלע הארוכה).`,
      String.raw`**שיעור חסר**: כשהמרחק נתון, מעלים בריבוע את שני האגפים ופותרים. לרוב מתקבלים שני פתרונות – בודקים איזה מהם מתאים לנתונים.`,
      String.raw`**נקודה שנמצאת במרחקים שווים משתי נקודות**: משווים את ריבועי המרחקים, $PA^2=PB^2$. האיברים הריבועיים מצטמצמים ונשארת משוואה ממעלה ראשונה.`,
    ],
    exercises: [
      {
        id: 'ag-distance-1',
        difficulty: 1,
        statement: String.raw`חשבו את המרחק בין הנקודות $A(-2,3)$ ו-$B(4,11)$.`,
        hints: [
          String.raw`השתמשו בנוסחת המרחק $AB=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.`,
          String.raw`ההפרשים הם $4-(-2)=6$ ו-$11-3=8$.`,
        ],
        solutionSteps: [
          String.raw`לפי נוסחת המרחק: $AB=\sqrt{(4-(-2))^2+(11-3)^2}$.`,
          String.raw`$AB=\sqrt{6^2+8^2}=\sqrt{36+64}=\sqrt{100}=10$.`,
        ],
        finalAnswer: String.raw`$AB=10$`,
        answers: [{ label: String.raw`אורך $AB$`, value: 10 }],
      },
      {
        id: 'ag-distance-2',
        difficulty: 1,
        statement: String.raw`נתונות הנקודות $P(-6,8)$ ו-$Q(-6,-1)$. חשבו את המרחק של $P$ מראשית הצירים $O$, ואת אורך הקטע $PQ$.`,
        hints: [
          String.raw`המרחק של הנקודה $(x,y)$ מראשית הצירים הוא $\sqrt{x^2+y^2}$.`,
          String.raw`ל-$P$ ול-$Q$ אותו שיעור $x$, ולכן הקטע $PQ$ מקביל לציר ה-$y$ ואורכו הוא הפרש שיעורי ה-$y$.`,
        ],
        solutionSteps: [
          String.raw`$OP=\sqrt{(-6)^2+8^2}=\sqrt{36+64}=\sqrt{100}=10$.`,
          String.raw`ל-$P$ ול-$Q$ אותו שיעור $x$ ($x=-6$), ולכן הקטע $PQ$ מקביל לציר ה-$y$, ו-$PQ=|8-(-1)|=9$.`,
          String.raw`בדיקה בנוסחת המרחק: $PQ=\sqrt{0^2+(-1-8)^2}=\sqrt{81}=9$.`,
        ],
        finalAnswer: String.raw`$OP=10$, $PQ=9$`,
        answers: [
          { label: String.raw`$OP$`, value: 10 },
          { label: String.raw`$PQ$`, value: 9 },
        ],
      },
      {
        id: 'ag-distance-3',
        difficulty: 2,
        statement: String.raw`קודקודי המשולש $ABC$ הם $A(1,1)$, $B(7,3)$ ו-$C(3,7)$ (ראו שרטוט). הוכיחו שהמשולש שווה שוקיים, וחשבו את היקפו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="54" y1="194.7" x2="268" y2="194.7" />
    <polyline points="261,190.7 268,194.7 261,198.7" />
    <line x1="85.3" y1="226" x2="85.3" y2="12" />
    <polyline points="81.3,19 85.3,12 89.3,19" />
  </g>
  <polygon points="106.7,173.3 234.7,130.7 149.3,45.3" />
  <circle cx="106.7" cy="173.3" r="3" fill="currentColor" stroke="none" />
  <circle cx="234.7" cy="130.7" r="3" fill="currentColor" stroke="none" />
  <circle cx="149.3" cy="45.3" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="96.8" y="188.7">A</text>
    <text x="248.4" y="138.9">B</text>
    <text x="146.6" y="37.1">C</text>
    <text x="266" y="210.7" font-style="italic">x</text>
    <text x="97.3" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`חשבו את אורכי שלוש הצלעות בנוסחת המרחק.`,
          String.raw`השוו בין האורכים: אילו שתי צלעות שוות?`,
          String.raw`ההיקף הוא סכום הצלעות. אפשר לפשט: $\sqrt{40}=2\sqrt{10}$ ו-$\sqrt{32}=4\sqrt{2}$.`,
        ],
        solutionSteps: [
          String.raw`$AB=\sqrt{(7-1)^2+(3-1)^2}=\sqrt{36+4}=\sqrt{40}$.`,
          String.raw`$AC=\sqrt{(3-1)^2+(7-1)^2}=\sqrt{4+36}=\sqrt{40}$.`,
          String.raw`$BC=\sqrt{(3-7)^2+(7-3)^2}=\sqrt{16+16}=\sqrt{32}$.`,
          String.raw`$AB=AC=\sqrt{40}$, ולכן המשולש $ABC$ שווה שוקיים (השוקיים $AB$ ו-$AC$, הבסיס $BC$).`,
          String.raw`ההיקף: $AB+AC+BC=2\sqrt{40}+\sqrt{32}=4\sqrt{10}+4\sqrt{2}\approx18.31$.`,
        ],
        finalAnswer: String.raw`$AB=AC=\sqrt{40}$, ולכן המשולש שווה שוקיים; ההיקף $4\sqrt{10}+4\sqrt{2}\approx18.31$.`,
        answers: [{ label: 'היקף המשולש', value: 4 * Math.sqrt(10) + 4 * Math.sqrt(2) }],
      },
      {
        id: 'ag-distance-4',
        difficulty: 2,
        statement: String.raw`קודקודי המשולש $ABC$ הם $A(-1,2)$, $B(3,4)$ ו-$C(1,8)$ (ראו שרטוט). הוכיחו שהמשולש ישר זווית, ציינו באיזה קודקוד נמצאת הזווית הישרה, וחשבו את שטח המשולש.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="82.8" y1="196.8" x2="239.2" y2="196.8" />
    <polyline points="232.2,192.8 239.2,196.8 232.2,200.8" />
    <line x1="131.2" y1="226" x2="131.2" y2="12" />
    <polyline points="127.2,19 131.2,12 135.2,19" />
  </g>
  <polygon points="112,158.4 188.8,120 150.4,43.2" />
  <circle cx="112" cy="158.4" r="3" fill="currentColor" stroke="none" />
  <circle cx="188.8" cy="120" r="3" fill="currentColor" stroke="none" />
  <circle cx="150.4" cy="43.2" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="98" y="163.9">A</text>
    <text x="202.8" y="125.5">B</text>
    <text x="150.4" y="34.7">C</text>
    <text x="237.2" y="212.8" font-style="italic">x</text>
    <text x="143.2" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`חשבו את ריבועי אורכי הצלעות (אין צורך להוציא שורש).`,
          String.raw`בדקו אם סכום שני הריבועים הקטנים שווה לריבוע הגדול – המשפט ההפוך למשפט פיתגורס.`,
          String.raw`במשולש ישר זווית השטח הוא מחצית מכפלת הניצבים.`,
        ],
        solutionSteps: [
          String.raw`$AB^2=(3+1)^2+(4-2)^2=16+4=20$.`,
          String.raw`$BC^2=(1-3)^2+(8-4)^2=4+16=20$ ו-$AC^2=(1+1)^2+(8-2)^2=4+36=40$.`,
          String.raw`$AB^2+BC^2=20+20=40=AC^2$, ולכן לפי המשפט ההפוך למשפט פיתגורס המשולש ישר זווית, והזווית הישרה נמצאת מול הצלע $AC$: $\angle ABC=90^\circ$.`,
          String.raw`הניצבים הם $AB=BC=\sqrt{20}$, ולכן $S=\frac{AB\cdot BC}{2}=\frac{\sqrt{20}\cdot\sqrt{20}}{2}=\frac{20}{2}=10$.`,
          String.raw`(מאחר ש-$AB=BC$, המשולש גם שווה שוקיים.)`,
        ],
        finalAnswer: String.raw`$\angle B=90^\circ$, כי $AB^2+BC^2=AC^2$; שטח המשולש $10$.`,
        answers: [{ label: 'שטח המשולש', value: 10 }],
      },
      {
        id: 'ag-distance-5',
        difficulty: 2,
        statement: String.raw`נתונות הנקודות $A(2,-1)$ ו-$B(k,5)$. אורך הקטע $AB$ הוא $10$. מצאו את הערכים האפשריים של $k$.`,
        hints: [
          String.raw`כתבו את נוסחת המרחק עם $k$ והשוו ל-$10$.`,
          String.raw`העלו את שני האגפים בריבוע: $(k-2)^2+36=100$.`,
        ],
        solutionSteps: [
          String.raw`לפי נוסחת המרחק: $\sqrt{(k-2)^2+(5-(-1))^2}=10$.`,
          String.raw`מעלים בריבוע: $(k-2)^2+36=100$, ולכן $(k-2)^2=64$.`,
          String.raw`$k-2=8$ או $k-2=-8$, כלומר $k=10$ או $k=-6$.`,
          String.raw`בדיקה: בשני המקרים $AB=\sqrt{8^2+6^2}=\sqrt{100}=10$, ולכן שני הערכים מתאימים.`,
        ],
        finalAnswer: String.raw`$k=10$ או $k=-6$`,
        answers: [
          { label: String.raw`$k$ (הערך הגדול)`, value: 10 },
          { label: String.raw`$k$ (הערך הקטן)`, value: -6 },
        ],
      },
      {
        id: 'ag-distance-6',
        difficulty: 2,
        statement: String.raw`נתונות הנקודות $A(1,6)$ ו-$B(9,2)$. הנקודה $P$ נמצאת על ציר ה-$x$, ומרחקה מ-$A$ שווה למרחקה מ-$B$ (ראו שרטוט). מצאו את שיעורי $P$, וחשבו את המרחק $PA$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="18" y1="192" x2="304" y2="192" />
    <polyline points="297,188 304,192 297,196" />
    <line x1="52" y1="226" x2="52" y2="12" />
    <polyline points="48,19 52,12 56,19" />
  </g>
  <line x1="124" y1="192" x2="76" y2="48" />
  <line x1="124" y1="192" x2="268" y2="144" />
  <circle cx="76" cy="48" r="3" fill="currentColor" stroke="none" />
  <circle cx="268" cy="144" r="3" fill="currentColor" stroke="none" />
  <circle cx="124" cy="192" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="76" y="39.5">A</text>
    <text x="268" y="135.5">B</text>
    <text x="124" y="211.5">P</text>
    <text x="302" y="208" font-style="italic">x</text>
    <text x="64" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`נקודה על ציר ה-$x$ היא מהצורה $P(x,0)$.`,
          String.raw`כתבו $PA^2=PB^2$ – כך נמנעים משורשים.`,
          String.raw`האיבר $x^2$ מצטמצם משני האגפים, ונשארת משוואה ממעלה ראשונה.`,
        ],
        solutionSteps: [
          String.raw`נסמן $P(x,0)$. התנאי $PA=PB$ שקול ל-$PA^2=PB^2$ (המרחקים חיוביים).`,
          String.raw`$PA^2=(x-1)^2+(0-6)^2=x^2-2x+37$ ו-$PB^2=(x-9)^2+(0-2)^2=x^2-18x+85$.`,
          String.raw`$x^2-2x+37=x^2-18x+85$, כלומר $16x=48$ ו-$x=3$. לכן $P(3,0)$.`,
          String.raw`$PA=\sqrt{(3-1)^2+(0-6)^2}=\sqrt{4+36}=\sqrt{40}=2\sqrt{10}\approx6.32$. בדיקה: $PB=\sqrt{(3-9)^2+(0-2)^2}=\sqrt{40}$.`,
        ],
        finalAnswer: String.raw`$P(3,0)$, $PA=\sqrt{40}=2\sqrt{10}\approx6.32$`,
        answers: [
          { label: String.raw`$x$ של $P$`, value: 3 },
          { label: String.raw`$PA$`, value: Math.sqrt(40) },
        ],
      },
      {
        id: 'ag-distance-7',
        difficulty: 3,
        statement: String.raw`נתונות הנקודות $A(1,2)$ ו-$B(5,2)$, והנקודה $C(3,c)$, כאשר $c>2$. מצאו את $c$ שעבורו המשולש $ABC$ שווה צלעות, וחשבו את שטח המשולש.`,
        hints: [
          String.raw`חשבו את $AB$. במשולש שווה צלעות גם $AC$ וגם $BC$ שווים לו.`,
          String.raw`שימו לב: $CA=CB$ לכל ערך של $c$, כי $x=3$ נמצא באמצע בין $1$ ל-$5$. נשאר לדרוש $CA=AB$.`,
          String.raw`הצלע $AB$ מקבילה לציר ה-$x$, ולכן הגובה אליה הוא $c-2$.`,
        ],
        solutionSteps: [
          String.raw`ל-$A$ ול-$B$ אותו שיעור $y$, ולכן $AB=|5-1|=4$.`,
          String.raw`$CA^2=(3-1)^2+(c-2)^2=4+(c-2)^2$ ו-$CB^2=(3-5)^2+(c-2)^2=4+(c-2)^2$, כלומר $CA=CB$ לכל $c$.`,
          String.raw`נדרוש $CA=AB=4$: $4+(c-2)^2=16$, ולכן $(c-2)^2=12$ ו-$c-2=\pm2\sqrt{3}$.`,
          String.raw`לפי הנתון $c>2$, ולכן $c=2+2\sqrt{3}\approx5.46$.`,
          String.raw`הבסיס $AB=4$ מקביל לציר ה-$x$, והגובה אליו הוא הפרש שיעורי ה-$y$: $h=c-2=2\sqrt{3}$.`,
          String.raw`$S=\frac{AB\cdot h}{2}=\frac{4\cdot2\sqrt{3}}{2}=4\sqrt{3}\approx6.93$.`,
        ],
        finalAnswer: String.raw`$c=2+2\sqrt{3}\approx5.46$; שטח המשולש $4\sqrt{3}\approx6.93$.`,
        answers: [
          { label: String.raw`$c$`, value: 2 + 2 * Math.sqrt(3) },
          { label: 'שטח המשולש', value: 4 * Math.sqrt(3) },
        ],
      },
      {
        id: 'ag-distance-8',
        difficulty: 3,
        statement: String.raw`קודקודי המרובע $ABCD$ הם $A(-2,1)$, $B(1,5)$, $C(6,5)$ ו-$D(3,1)$ (ראו שרטוט). הוכיחו שהמרובע הוא מעוין, חשבו את אורכי האלכסונים שלו, וחשבו את שטחו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="14" y1="188" x2="308" y2="188" />
    <polyline points="301,184 308,188 301,192" />
    <line x1="105.6" y1="225.2" x2="105.6" y2="12.8" />
    <polyline points="101.6,19.8 105.6,12.8 109.6,19.8" />
  </g>
  <polygon points="51.2,160.8 132.8,52 268.8,52 187.2,160.8" />
  <line x1="51.2" y1="160.8" x2="268.8" y2="52" stroke-dasharray="6 4" stroke-width="1.5" />
  <line x1="132.8" y1="52" x2="187.2" y2="160.8" stroke-dasharray="6 4" stroke-width="1.5" />
  <circle cx="51.2" cy="160.8" r="3" fill="currentColor" stroke="none" />
  <circle cx="132.8" cy="52" r="3" fill="currentColor" stroke="none" />
  <circle cx="268.8" cy="52" r="3" fill="currentColor" stroke="none" />
  <circle cx="187.2" cy="160.8" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="40.7" y="176.8">A</text>
    <text x="122.3" y="47">B</text>
    <text x="279.3" y="47">C</text>
    <text x="197.7" y="176.8">D</text>
    <text x="306" y="204" font-style="italic">x</text>
    <text x="117.6" y="18.8" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`מרובע שכל צלעותיו שוות הוא מעוין. חשבו את ארבע הצלעות.`,
          String.raw`שטח מעוין שווה למחצית מכפלת האלכסונים.`,
          String.raw`בדיקה: הצלע $AD$ מקבילה לציר ה-$x$, וגובה המעוין אליה הוא הפרש שיעורי ה-$y$.`,
        ],
        solutionSteps: [
          String.raw`$AB=\sqrt{(1+2)^2+(5-1)^2}=\sqrt{9+16}=5$ ו-$CD=\sqrt{(3-6)^2+(1-5)^2}=\sqrt{9+16}=5$.`,
          String.raw`הצלעות $BC$ ו-$AD$ מקבילות לציר ה-$x$: $BC=|6-1|=5$ ו-$AD=|3-(-2)|=5$.`,
          String.raw`כל ארבע הצלעות שוות ל-$5$, ולכן $ABCD$ מעוין (מרובע שכל צלעותיו שוות).`,
          String.raw`האלכסונים: $AC=\sqrt{(6+2)^2+(5-1)^2}=\sqrt{64+16}=\sqrt{80}$ ו-$BD=\sqrt{(3-1)^2+(1-5)^2}=\sqrt{4+16}=\sqrt{20}$.`,
          String.raw`שטח המעוין: $S=\frac{AC\cdot BD}{2}=\frac{\sqrt{80}\cdot\sqrt{20}}{2}=\frac{\sqrt{1600}}{2}=\frac{40}{2}=20$.`,
          String.raw`בדיקה: הבסיס $AD=5$ והגובה אליו $5-1=4$, ולכן $S=5\cdot4=20$.`,
        ],
        finalAnswer: String.raw`כל הצלעות שוות ל-$5$, ולכן $ABCD$ מעוין; $AC=\sqrt{80}\approx8.94$, $BD=\sqrt{20}\approx4.47$; השטח $20$.`,
        answers: [
          { label: String.raw`$AC$`, value: Math.sqrt(80) },
          { label: String.raw`$BD$`, value: Math.sqrt(20) },
          { label: 'שטח המעוין', value: 20 },
        ],
      },
    ],
  },
  'ag-midpoint': {
    intro: String.raw`אמצע קטע הוא הנקודה שמחלקת אותו לשני חלקים שווים, ושיעוריה הם הממוצעים של שיעורי הקצוות. בעזרת הנוסחה מוצאים אמצע של צלע (למשל כדי לבנות תיכון או קטע אמצעים), מוצאים קצה חסר כשהאמצע נתון, ומוצאים קודקוד רביעי של מקבילית בעזרת התכונה שהאלכסונים חוצים זה את זה. אלה צעדים שכיחים בשאלה 4 בשאלון 806 ובשאלת הגאומטריה האנליטית בשאלון 807.`,
    keyFacts: [
      String.raw`**אמצע קטע**: האמצע של $AB$, כאשר $A(x_1,y_1)$ ו-$B(x_2,y_2)$, הוא $M\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$.`,
      String.raw`**קצה חסר**: אם $M$ אמצע $AB$ והקצה $A$ ידוע, אז $x_B=2x_M-x_A$ ו-$y_B=2y_M-y_A$.`,
      String.raw`**תיכון** במשולש מחבר קודקוד עם אמצע הצלע שמולו; את אורכו מחשבים בנוסחת המרחק.`,
      String.raw`**מקבילית**: האלכסונים חוצים זה את זה, ולכן לאלכסונים $AC$ ו-$BD$ יש אותו אמצע. מכאן הקודקוד הרביעי: $x_D=x_A+x_C-x_B$ ו-$y_D=y_A+y_C-y_B$.`,
      String.raw`**קטע אמצעים** במשולש (מחבר אמצעי שתי צלעות) מקביל לצלע השלישית ושווה למחציתה.`,
      String.raw`**סוג המקבילית**: מקבילית שבה שתי צלעות סמוכות שוות היא מעוין; מקבילית שאלכסוניה שווים היא מלבן.`,
    ],
    exercises: [
      {
        id: 'ag-midpoint-1',
        difficulty: 1,
        statement: String.raw`מצאו את שיעורי האמצע $M$ של הקטע שקצותיו $A(-3,7)$ ו-$B(5,-1)$.`,
        hints: [String.raw`שיעורי האמצע הם הממוצעים של שיעורי הקצוות.`],
        solutionSteps: [
          String.raw`$x_M=\frac{-3+5}{2}=\frac{2}{2}=1$.`,
          String.raw`$y_M=\frac{7+(-1)}{2}=\frac{6}{2}=3$.`,
          String.raw`לכן $M(1,3)$.`,
        ],
        finalAnswer: String.raw`$M(1,3)$`,
        answers: [
          { label: String.raw`$x$ של $M$`, value: 1 },
          { label: String.raw`$y$ של $M$`, value: 3 },
        ],
      },
      {
        id: 'ag-midpoint-2',
        difficulty: 1,
        statement: String.raw`הנקודה $M(2,-1)$ היא אמצע הקטע $AB$, ונתון $A(-4,3)$. מצאו את שיעורי הנקודה $B$.`,
        hints: [
          String.raw`כתבו את נוסחת האמצע עם $B(x,y)$ הלא ידועה: $\frac{-4+x}{2}=2$.`,
          String.raw`או ישירות: $x_B=2x_M-x_A$ ו-$y_B=2y_M-y_A$.`,
        ],
        solutionSteps: [
          String.raw`נסמן $B(x,y)$. לפי נוסחת האמצע: $\frac{-4+x}{2}=2$ ו-$\frac{3+y}{2}=-1$.`,
          String.raw`מהמשוואה הראשונה $-4+x=4$, כלומר $x=8$; מהשנייה $3+y=-2$, כלומר $y=-5$.`,
          String.raw`לכן $B(8,-5)$. בדיקה: $\left(\frac{-4+8}{2},\frac{3-5}{2}\right)=(2,-1)$.`,
        ],
        finalAnswer: String.raw`$B(8,-5)$`,
        answers: [
          { label: String.raw`$x$ של $B$`, value: 8 },
          { label: String.raw`$y$ של $B$`, value: -5 },
        ],
      },
      {
        id: 'ag-midpoint-3',
        difficulty: 2,
        statement: String.raw`קודקודי המשולש $ABC$ הם $A(1,2)$, $B(7,4)$ ו-$C(3,10)$. הקטע $CM$ הוא התיכון לצלע $AB$ (ראו שרטוט). מצאו את שיעורי $M$, וחשבו את אורך התיכון $CM$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="78" y1="200" x2="244" y2="200" />
    <polyline points="237,196 244,200 237,204" />
    <line x1="104" y1="226" x2="104" y2="12" />
    <polyline points="100,19 104,12 108,19" />
  </g>
  <polygon points="120,168 216,136 152,40" />
  <line x1="152" y1="40" x2="168" y2="152" />
  <circle cx="120" cy="168" r="3" fill="currentColor" stroke="none" />
  <circle cx="216" cy="136" r="3" fill="currentColor" stroke="none" />
  <circle cx="152" cy="40" r="3" fill="currentColor" stroke="none" />
  <circle cx="168" cy="152" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="106" y="173.5">A</text>
    <text x="230" y="141.5">B</text>
    <text x="152" y="31.5">C</text>
    <text x="168" y="171.5">M</text>
    <text x="242" y="216" font-style="italic">x</text>
    <text x="116" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`התיכון לצלע $AB$ יוצא מהקודקוד $C$ אל אמצע הצלע $AB$.`,
          String.raw`מצאו את אמצע $AB$, ואחר כך חשבו את $CM$ בנוסחת המרחק.`,
        ],
        solutionSteps: [
          String.raw`$M$ היא אמצע $AB$: $M\left(\frac{1+7}{2},\frac{2+4}{2}\right)=M(4,3)$.`,
          String.raw`$CM=\sqrt{(4-3)^2+(3-10)^2}=\sqrt{1+49}=\sqrt{50}$.`,
          String.raw`$\sqrt{50}=5\sqrt{2}\approx7.07$.`,
        ],
        finalAnswer: String.raw`$M(4,3)$, $CM=\sqrt{50}=5\sqrt{2}\approx7.07$`,
        answers: [
          { label: String.raw`$x$ של $M$`, value: 4 },
          { label: String.raw`$y$ של $M$`, value: 3 },
          { label: String.raw`אורך התיכון $CM$`, value: Math.sqrt(50) },
        ],
      },
      {
        id: 'ag-midpoint-4',
        difficulty: 2,
        statement: String.raw`$ABCD$ היא מקבילית. נתון: $A(-2,1)$, $B(3,2)$ ו-$C(5,6)$ (ראו שרטוט). מצאו את שיעורי הקודקוד $D$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="42" y1="192" x2="280" y2="192" />
    <polyline points="273,188 280,192 273,196" />
    <line x1="124" y1="226" x2="124" y2="12" />
    <polyline points="120,19 124,12 128,19" />
  </g>
  <polygon points="76,168 196,144 244,48 124,72" />
  <line x1="76" y1="168" x2="244" y2="48" stroke-dasharray="6 4" stroke-width="1.5" />
  <line x1="196" y1="144" x2="124" y2="72" stroke-dasharray="6 4" stroke-width="1.5" />
  <circle cx="76" cy="168" r="3" fill="currentColor" stroke="none" />
  <circle cx="196" cy="144" r="3" fill="currentColor" stroke="none" />
  <circle cx="244" cy="48" r="3" fill="currentColor" stroke="none" />
  <circle cx="124" cy="72" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="65.5" y="184">A</text>
    <text x="206.5" y="160">B</text>
    <text x="254.5" y="43">C</text>
    <text x="113.5" y="67">D</text>
    <text x="278" y="208" font-style="italic">x</text>
    <text x="136" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`במקבילית האלכסונים חוצים זה את זה.`,
          String.raw`מצאו את אמצע האלכסון $AC$ – זה גם אמצע האלכסון $BD$.`,
          String.raw`מצאו את הקצה $D$ כשהאמצע של $BD$ והקצה $B$ ידועים.`,
        ],
        solutionSteps: [
          String.raw`במקבילית האלכסונים חוצים זה את זה, ולכן לאלכסונים $AC$ ו-$BD$ יש אותו אמצע.`,
          String.raw`אמצע $AC$: $\left(\frac{-2+5}{2},\frac{1+6}{2}\right)=(1.5,\,3.5)$.`,
          String.raw`נסמן $D(x,y)$. אמצע $BD$ הוא $\left(\frac{3+x}{2},\frac{2+y}{2}\right)=(1.5,\,3.5)$, ולכן $3+x=3$ ו-$2+y=7$, כלומר $x=0$ ו-$y=5$.`,
          String.raw`$D(0,5)$. בדיקה: המעבר מ-$A$ ל-$B$ הוא $5$ ימינה ו-$1$ למעלה, וגם המעבר מ-$D$ ל-$C$ הוא $5$ ימינה ו-$1$ למעלה.`,
        ],
        finalAnswer: String.raw`$D(0,5)$`,
        answers: [
          { label: String.raw`$x$ של $D$`, value: 0 },
          { label: String.raw`$y$ של $D$`, value: 5 },
        ],
      },
      {
        id: 'ag-midpoint-5',
        difficulty: 2,
        statement: String.raw`הנקודה $M(4,1)$ היא אמצע הקטע $AB$. הנקודה $A$ נמצאת על ציר ה-$x$, והנקודה $B$ נמצאת על ציר ה-$y$. מצאו את שיעורי $A$ ו-$B$, וחשבו את אורך הקטע $AB$.`,
        hints: [
          String.raw`נקודה על ציר ה-$x$ היא $(a,0)$, ונקודה על ציר ה-$y$ היא $(0,b)$.`,
          String.raw`הציבו בנוסחת האמצע: $\frac{a+0}{2}=4$ ו-$\frac{0+b}{2}=1$.`,
        ],
        solutionSteps: [
          String.raw`נסמן $A(a,0)$ ו-$B(0,b)$.`,
          String.raw`לפי נוסחת האמצע: $\frac{a+0}{2}=4$, כלומר $a=8$; ו-$\frac{0+b}{2}=1$, כלומר $b=2$.`,
          String.raw`לכן $A(8,0)$ ו-$B(0,2)$.`,
          String.raw`$AB=\sqrt{(0-8)^2+(2-0)^2}=\sqrt{64+4}=\sqrt{68}=2\sqrt{17}\approx8.25$.`,
        ],
        finalAnswer: String.raw`$A(8,0)$, $B(0,2)$, $AB=\sqrt{68}=2\sqrt{17}\approx8.25$`,
        answers: [
          { label: String.raw`$x$ של $A$`, value: 8 },
          { label: String.raw`$y$ של $B$`, value: 2 },
          { label: String.raw`אורך $AB$`, value: Math.sqrt(68) },
        ],
      },
      {
        id: 'ag-midpoint-6',
        difficulty: 2,
        statement: String.raw`קודקודי המשולש $ABC$ הם $A(-1,5)$, $B(-3,-1)$ ו-$C(7,1)$. הנקודה $D$ היא אמצע הצלע $AB$, והנקודה $E$ היא אמצע הצלע $AC$ (ראו שרטוט). מצאו את $D$ ואת $E$, חשבו את האורכים $DE$ ו-$BC$, והראו ש-$DE=\frac12 BC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="14" y1="165.3" x2="308" y2="165.3" />
    <polyline points="301,161.3 308,165.3 301,169.3" />
    <line x1="114.7" y1="220.7" x2="114.7" y2="17.3" />
    <polyline points="110.7,24.3 114.7,17.3 118.7,24.3" />
  </g>
  <polygon points="92,52 46.7,188 273.3,142.7" />
  <line x1="69.3" y1="120" x2="182.7" y2="97.3" />
  <circle cx="92" cy="52" r="3" fill="currentColor" stroke="none" />
  <circle cx="46.7" cy="188" r="3" fill="currentColor" stroke="none" />
  <circle cx="273.3" cy="142.7" r="3" fill="currentColor" stroke="none" />
  <circle cx="69.3" cy="120" r="3" fill="currentColor" stroke="none" />
  <circle cx="182.7" cy="97.3" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="92" y="43.5">A</text>
    <text x="36.2" y="204">B</text>
    <text x="287.3" y="148.2">C</text>
    <text x="55.3" y="125.5">D</text>
    <text x="193.2" y="92.3">E</text>
    <text x="306" y="181.3" font-style="italic">x</text>
    <text x="126.7" y="23.3" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`מצאו כל אמצע בנוסחת האמצע.`,
          String.raw`חשבו את שני האורכים בנוסחת המרחק ופשטו את השורשים.`,
          String.raw`$\sqrt{104}=\sqrt{4\cdot26}=2\sqrt{26}$.`,
        ],
        solutionSteps: [
          String.raw`$D\left(\frac{-1-3}{2},\frac{5-1}{2}\right)=D(-2,2)$ ו-$E\left(\frac{-1+7}{2},\frac{5+1}{2}\right)=E(3,3)$.`,
          String.raw`$DE=\sqrt{(3+2)^2+(3-2)^2}=\sqrt{25+1}=\sqrt{26}$.`,
          String.raw`$BC=\sqrt{(7+3)^2+(1+1)^2}=\sqrt{100+4}=\sqrt{104}=2\sqrt{26}$.`,
          String.raw`לכן $DE=\frac12 BC$, בהתאם למשפט קטע האמצעים במשולש.`,
        ],
        finalAnswer: String.raw`$D(-2,2)$, $E(3,3)$; $DE=\sqrt{26}\approx5.10$, $BC=2\sqrt{26}\approx10.20$, ולכן $DE=\frac12BC$.`,
        answers: [
          { label: String.raw`$DE$`, value: Math.sqrt(26) },
          { label: String.raw`$BC$`, value: Math.sqrt(104) },
        ],
      },
      {
        id: 'ag-midpoint-7',
        difficulty: 3,
        statement: String.raw`הנקודות $P(4,3)$, $Q(1,5)$ ו-$R(2,1)$ הן אמצעי הצלעות $BC$, $CA$ ו-$AB$ (בהתאמה) של המשולש $ABC$. מצאו את שיעורי הקודקודים $A$, $B$ ו-$C$.`,
        hints: [
          String.raw`סמנו את שיעורי הקודקודים וכתבו את נוסחת האמצע לכל צלע – מתקבלות שלוש משוואות בשיעורי ה-$x$ ושלוש בשיעורי ה-$y$.`,
          String.raw`בשיעורי ה-$x$: $x_B+x_C=8$, $x_C+x_A=2$, $x_A+x_B=4$. חברו את שלוש המשוואות.`,
          String.raw`דרך נוספת: $ARPQ$ היא מקבילית (שתיים מצלעותיה, $RP$ ו-$PQ$, הן קטעי אמצעים), ולכן $x_A=x_Q+x_R-x_P$ וכך גם ב-$y$.`,
        ],
        solutionSteps: [
          String.raw`לפי נוסחת האמצע, בשיעורי ה-$x$: $x_B+x_C=2\cdot4=8$, $x_C+x_A=2\cdot1=2$, $x_A+x_B=2\cdot2=4$.`,
          String.raw`חיבור שלוש המשוואות: $2(x_A+x_B+x_C)=14$, ולכן $x_A+x_B+x_C=7$. מכאן $x_A=7-8=-1$, $x_B=7-2=5$, $x_C=7-4=3$.`,
          String.raw`בשיעורי ה-$y$: $y_B+y_C=6$, $y_C+y_A=10$, $y_A+y_B=2$. חיבור: $2(y_A+y_B+y_C)=18$, ולכן $y_A+y_B+y_C=9$.`,
          String.raw`מכאן $y_A=9-6=3$, $y_B=9-10=-1$, $y_C=9-2=7$.`,
          String.raw`לכן $A(-1,3)$, $B(5,-1)$, $C(3,7)$. בדיקה: אמצע $BC$ הוא $\left(\frac{5+3}{2},\frac{-1+7}{2}\right)=(4,3)=P$.`,
        ],
        finalAnswer: String.raw`$A(-1,3)$, $B(5,-1)$, $C(3,7)$`,
        answers: [
          { label: String.raw`$x$ של $A$`, value: -1 },
          { label: String.raw`$y$ של $A$`, value: 3 },
          { label: String.raw`$x$ של $B$`, value: 5 },
          { label: String.raw`$y$ של $B$`, value: -1 },
          { label: String.raw`$x$ של $C$`, value: 3 },
          { label: String.raw`$y$ של $C$`, value: 7 },
        ],
      },
      {
        id: 'ag-midpoint-8',
        difficulty: 3,
        statement: String.raw`$ABCD$ היא מקבילית שאלכסוניה נחתכים בנקודה $M(4,4)$. נתון: $A(1,1)$ ו-$B(6,2)$ (ראו שרטוט). מצאו את שיעורי $C$ ו-$D$, הוכיחו שהמקבילית היא מעוין, וחשבו את שטחה.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="54" y1="194.7" x2="268" y2="194.7" />
    <polyline points="261,190.7 268,194.7 261,198.7" />
    <line x1="85.3" y1="226" x2="85.3" y2="12" />
    <polyline points="81.3,19 85.3,12 89.3,19" />
  </g>
  <polygon points="106.7,173.3 213.3,152 234.7,45.3 128,66.7" />
  <line x1="106.7" y1="173.3" x2="234.7" y2="45.3" stroke-dasharray="6 4" stroke-width="1.5" />
  <line x1="213.3" y1="152" x2="128" y2="66.7" stroke-dasharray="6 4" stroke-width="1.5" />
  <circle cx="106.7" cy="173.3" r="3" fill="currentColor" stroke="none" />
  <circle cx="213.3" cy="152" r="3" fill="currentColor" stroke="none" />
  <circle cx="234.7" cy="45.3" r="3" fill="currentColor" stroke="none" />
  <circle cx="128" cy="66.7" r="3" fill="currentColor" stroke="none" />
  <circle cx="170.7" cy="109.3" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="96.2" y="189.3">A</text>
    <text x="223.8" y="168">B</text>
    <text x="245.2" y="40.3">C</text>
    <text x="117.5" y="61.7">D</text>
    <text x="184.7" y="114.8">M</text>
    <text x="266" y="210.7" font-style="italic">x</text>
    <text x="97.3" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`$M$ היא אמצע של כל אחד מהאלכסונים – גם של $AC$ וגם של $BD$.`,
          String.raw`מקבילית שבה שתי צלעות סמוכות שוות היא מעוין – השוו את $AB$ ל-$BC$.`,
          String.raw`שטח מעוין הוא מחצית מכפלת האלכסונים.`,
        ],
        solutionSteps: [
          String.raw`האלכסונים במקבילית חוצים זה את זה, ולכן $M$ היא אמצע $AC$: $C=(2\cdot4-1,\ 2\cdot4-1)=(7,7)$.`,
          String.raw`באותו אופן $M$ היא אמצע $BD$: $D=(2\cdot4-6,\ 2\cdot4-2)=(2,6)$.`,
          String.raw`$AB=\sqrt{(6-1)^2+(2-1)^2}=\sqrt{26}$ ו-$BC=\sqrt{(7-6)^2+(7-2)^2}=\sqrt{26}$.`,
          String.raw`במקבילית $ABCD$ שתי צלעות סמוכות שוות ($AB=BC$), ולכן היא מעוין.`,
          String.raw`האלכסונים: $AC=\sqrt{6^2+6^2}=\sqrt{72}$ ו-$BD=\sqrt{(2-6)^2+(6-2)^2}=\sqrt{32}$.`,
          String.raw`$S=\frac{AC\cdot BD}{2}=\frac{\sqrt{72\cdot32}}{2}=\frac{\sqrt{2304}}{2}=\frac{48}{2}=24$.`,
        ],
        finalAnswer: String.raw`$C(7,7)$, $D(2,6)$; $AB=BC=\sqrt{26}$, ולכן המקבילית מעוין; השטח $24$.`,
        answers: [
          { label: String.raw`$x$ של $C$`, value: 7 },
          { label: String.raw`$y$ של $C$`, value: 7 },
          { label: String.raw`$x$ של $D$`, value: 2 },
          { label: String.raw`$y$ של $D$`, value: 6 },
          { label: 'שטח המעוין', value: 24 },
        ],
      },
    ],
  },
  'ag-line': {
    intro: String.raw`הקו הישר הוא הגרף של משוואה ממעלה ראשונה. בצורה המפורשת $y=mx+n$ המספר $m$ הוא השיפוע (בכמה משתנה $y$ כש-$x$ גדל ב-$1$), והמספר $n$ קובע את נקודת החיתוך עם ציר ה-$y$. בשיעור לומדים לבדוק אם נקודה נמצאת על ישר, למצוא את נקודות החיתוך עם הצירים ואת נקודת החיתוך של שני ישרים, ולחשב שטח של משולש שנוצר מישרים ומהצירים. כל אלה חוזרים בשאלה 4 בשאלון 806 ובשאלות החדו״א (משיק, חיתוך עם הצירים ושטח).`,
    keyFacts: [
      String.raw`**הצורה המפורשת** $y=mx+n$: $m$ הוא השיפוע, והישר חותך את ציר ה-$y$ בנקודה $(0,n)$.`,
      String.raw`**הצורה הכללית** $ax+by+c=0$: כדי למצוא שיפוע מבודדים את $y$. למשל $2x+3y-12=0$ נותן $y=-\frac{2}{3}x+4$.`,
      String.raw`**נקודה על ישר**: נקודה נמצאת על ישר אם״ם שיעוריה מקיימים את משוואתו (מציבים ובודקים).`,
      String.raw`**חיתוך עם הצירים**: עם ציר ה-$x$ מציבים $y=0$; עם ציר ה-$y$ מציבים $x=0$.`,
      String.raw`**ישרים מקבילים לצירים**: $y=k$ הוא ישר אופקי (שיפועו $0$); $x=k$ הוא ישר אנכי (אין לו שיפוע).`,
      String.raw`**נקודת החיתוך של שני ישרים** היא הפתרון של מערכת שתי המשוואות שלהם (בהצבה או בהשוואה).`,
      String.raw`**שטח משולש** שאחת מצלעותיו על ציר (או מקבילה לציר): הבסיס הוא אורך הצלע הזאת, והגובה הוא המרחק של הקודקוד השלישי מהציר – הערך המוחלט של השיעור המתאים.`,
    ],
    exercises: [
      {
        id: 'ag-line-1',
        difficulty: 1,
        statement: String.raw`מצאו את השיפוע $m$ של הישר $2x+3y-12=0$ ואת נקודת החיתוך שלו עם ציר ה-$y$.`,
        hints: [String.raw`בודדו את $y$ כדי להגיע לצורה $y=mx+n$.`],
        solutionSteps: [
          String.raw`מעבירים אגפים: $3y=-2x+12$.`,
          String.raw`מחלקים ב-$3$: $y=-\frac{2}{3}x+4$.`,
          String.raw`לכן $m=-\frac{2}{3}$, והישר חותך את ציר ה-$y$ בנקודה $(0,4)$.`,
        ],
        finalAnswer: String.raw`$m=-\frac23$; נקודת החיתוך עם ציר ה-$y$ היא $(0,4)$.`,
        answers: [
          { label: String.raw`השיפוע $m$`, value: -2 / 3 },
          { label: String.raw`$n$ במשוואה $y=mx+n$`, value: 4 },
        ],
      },
      {
        id: 'ag-line-2',
        difficulty: 1,
        statement: String.raw`הנקודות $A(k,7)$ ו-$B(-1,t)$ נמצאות על הישר $y=3x-5$. מצאו את $k$ ואת $t$.`,
        hints: [String.raw`נקודה נמצאת על ישר אם שיעוריה מקיימים את משוואתו – הציבו כל נקודה במשוואה.`],
        solutionSteps: [
          String.raw`מציבים את $A$: $7=3k-5$, ולכן $3k=12$ ו-$k=4$.`,
          String.raw`מציבים את $B$: $t=3\cdot(-1)-5=-8$.`,
        ],
        finalAnswer: String.raw`$k=4$, $t=-8$`,
        answers: [
          { label: String.raw`$k$`, value: 4 },
          { label: String.raw`$t$`, value: -8 },
        ],
      },
      {
        id: 'ag-line-3',
        difficulty: 2,
        statement: String.raw`הישר $y=-1.5x+6$ חותך את ציר ה-$x$ בנקודה $A$ ואת ציר ה-$y$ בנקודה $B$ (ראו שרטוט). מצאו את $A$ ו-$B$, וחשבו את שטח המשולש $AOB$, כאשר $O$ היא ראשית הצירים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="66" y1="192" x2="256" y2="192" />
    <polyline points="249,188 256,192 249,196" />
    <line x1="100" y1="226" x2="100" y2="12" />
    <polyline points="96,19 100,12 104,19" />
  </g>
  <line x1="79.2" y1="16.8" x2="216.8" y2="223.2" stroke-width="1.5" />
  <circle cx="196" cy="192" r="3" fill="currentColor" stroke="none" />
  <circle cx="100" cy="48" r="3" fill="currentColor" stroke="none" />
  <circle cx="100" cy="192" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="196" y="211.5">A</text>
    <text x="86" y="53.5">B</text>
    <text x="89.5" y="208">O</text>
    <text x="254" y="208" font-style="italic">x</text>
    <text x="112" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`חיתוך עם ציר ה-$x$: הציבו $y=0$. חיתוך עם ציר ה-$y$: הציבו $x=0$.`,
          String.raw`המשולש $AOB$ ישר זווית ב-$O$, והניצבים שלו הם $OA$ ו-$OB$.`,
        ],
        solutionSteps: [
          String.raw`חיתוך עם ציר ה-$x$: $0=-1.5x+6$, ולכן $x=4$ ו-$A(4,0)$.`,
          String.raw`חיתוך עם ציר ה-$y$: $y=-1.5\cdot0+6=6$, ולכן $B(0,6)$.`,
          String.raw`הצירים ניצבים זה לזה, ולכן המשולש $AOB$ ישר זווית ב-$O$, וניצביו $OA=4$ ו-$OB=6$.`,
          String.raw`$S_{AOB}=\frac{4\cdot6}{2}=12$.`,
        ],
        finalAnswer: String.raw`$A(4,0)$, $B(0,6)$, $S_{AOB}=12$`,
        answers: [
          { label: String.raw`$x$ של $A$`, value: 4 },
          { label: String.raw`$y$ של $B$`, value: 6 },
          { label: String.raw`שטח המשולש $AOB$`, value: 12 },
        ],
      },
      {
        id: 'ag-line-4',
        difficulty: 2,
        statement: String.raw`מצאו את נקודת החיתוך של הישרים $y=2x-3$ ו-$x+y=9$.`,
        hints: [
          String.raw`הציבו את $y=2x-3$ במשוואה השנייה.`,
          String.raw`אחרי שמצאתם את $x$, הציבו אותו באחת המשוואות כדי למצוא את $y$.`,
        ],
        solutionSteps: [
          String.raw`מציבים $y=2x-3$ במשוואה $x+y=9$: $x+(2x-3)=9$.`,
          String.raw`$3x=12$, ולכן $x=4$.`,
          String.raw`$y=2\cdot4-3=5$. בדיקה במשוואה השנייה: $4+5=9$.`,
          String.raw`נקודת החיתוך היא $(4,5)$.`,
        ],
        finalAnswer: String.raw`$(4,5)$`,
        answers: [
          { label: String.raw`$x$ של נקודת החיתוך`, value: 4 },
          { label: String.raw`$y$ של נקודת החיתוך`, value: 5 },
        ],
      },
      {
        id: 'ag-line-5',
        difficulty: 2,
        statement: String.raw`הישרים $x=3$, $y=-2$ ו-$y=x+1$ יוצרים את המשולש $ABC$ (ראו שרטוט): $A$ היא נקודת החיתוך של $x=3$ ו-$y=x+1$, $B$ היא נקודת החיתוך של $x=3$ ו-$y=-2$, ו-$C$ היא נקודת החיתוך של $y=-2$ ו-$y=x+1$. מצאו את קודקודי המשולש, וחשבו את שטחו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="42" y1="144" x2="280" y2="144" />
    <polyline points="273,140 280,144 273,148" />
    <line x1="148" y1="226" x2="148" y2="12" />
    <polyline points="144,19 148,12 152,19" />
  </g>
  <line x1="220" y1="223.2" x2="220" y2="16.8" stroke-width="1.5" />
  <line x1="44.8" y1="192" x2="275.2" y2="192" stroke-width="1.5" />
  <line x1="44.8" y1="223.2" x2="251.2" y2="16.8" stroke-width="1.5" />
  <circle cx="220" cy="48" r="3" fill="currentColor" stroke="none" />
  <circle cx="220" cy="192" r="3" fill="currentColor" stroke="none" />
  <circle cx="76" cy="192" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="234" y="53.5">A</text>
    <text x="230.5" y="208">B</text>
    <text x="65.5" y="187">C</text>
    <text x="278" y="160" font-style="italic">x</text>
    <text x="160" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`$x=3$ הוא ישר אנכי ו-$y=-2$ הוא ישר אופקי, ולכן הם ניצבים זה לזה.`,
          String.raw`כל קודקוד מתקבל מחיתוך של שני ישרים – הציבו את הערך הקבוע במשוואה השנייה.`,
          String.raw`המשולש ישר זווית ב-$B$, והניצבים מקבילים לצירים – אורכיהם הם הפרשי שיעורים.`,
        ],
        solutionSteps: [
          String.raw`$A$: מציבים $x=3$ ב-$y=x+1$ ומקבלים $y=4$, ולכן $A(3,4)$.`,
          String.raw`$B$: נקודת החיתוך של $x=3$ ו-$y=-2$ היא $B(3,-2)$.`,
          String.raw`$C$: מציבים $y=-2$ ב-$y=x+1$: $-2=x+1$, ולכן $x=-3$ ו-$C(-3,-2)$.`,
          String.raw`הישר $x=3$ אנכי והישר $y=-2$ אופקי, ולכן $\angle ABC=90^\circ$. הניצבים: $AB=|4-(-2)|=6$ ו-$BC=|3-(-3)|=6$.`,
          String.raw`$S_{ABC}=\frac{6\cdot6}{2}=18$.`,
        ],
        finalAnswer: String.raw`$A(3,4)$, $B(3,-2)$, $C(-3,-2)$; השטח $18$.`,
        answers: [
          { label: String.raw`$y$ של $A$`, value: 4 },
          { label: String.raw`$x$ של $C$`, value: -3 },
          { label: 'שטח המשולש', value: 18 },
        ],
      },
      {
        id: 'ag-line-6',
        difficulty: 2,
        statement: String.raw`הישר $y=mx+4$ עובר דרך הנקודה $(2,-2)$. מצאו את $m$, ומצאו את נקודת החיתוך של הישר עם ציר ה-$x$.`,
        hints: [
          String.raw`הציבו את הנקודה במשוואת הישר – מתקבלת משוואה ב-$m$.`,
          String.raw`לחיתוך עם ציר ה-$x$ הציבו $y=0$.`,
        ],
        solutionSteps: [
          String.raw`מציבים את $(2,-2)$: $-2=2m+4$, ולכן $2m=-6$ ו-$m=-3$.`,
          String.raw`משוואת הישר: $y=-3x+4$.`,
          String.raw`חיתוך עם ציר ה-$x$: $0=-3x+4$, ולכן $x=\frac{4}{3}$. הנקודה היא $\left(\frac43,0\right)$.`,
        ],
        finalAnswer: String.raw`$m=-3$; הישר חותך את ציר ה-$x$ בנקודה $\left(\frac43,0\right)$.`,
        answers: [
          { label: String.raw`$m$`, value: -3 },
          { label: String.raw`$x$ של נקודת החיתוך עם ציר ה-$x$`, value: 4 / 3 },
        ],
      },
      {
        id: 'ag-line-7',
        difficulty: 3,
        statement: String.raw`הישרים $y=2x+2$ ו-$y=-x+8$ נחתכים בנקודה $A$. הישר הראשון חותך את ציר ה-$x$ בנקודה $B$, והישר השני חותך את ציר ה-$x$ בנקודה $C$ (ראו שרטוט). מצאו את $A$, $B$ ו-$C$, חשבו את שטח המשולש $ABC$, וחשבו את אורך הצלע $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="18" y1="192" x2="304" y2="192" />
    <polyline points="297,188 304,192 297,196" />
    <line x1="76" y1="226" x2="76" y2="12" />
    <polyline points="72,19 76,12 80,19" />
  </g>
  <line x1="36.4" y1="223.2" x2="139.6" y2="16.8" stroke-width="1.5" />
  <line x1="92.8" y1="16.8" x2="299.2" y2="223.2" stroke-width="1.5" />
  <circle cx="124" cy="48" r="3" fill="currentColor" stroke="none" />
  <circle cx="52" cy="192" r="3" fill="currentColor" stroke="none" />
  <circle cx="268" cy="192" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="138" y="53.5">A</text>
    <text x="41.5" y="187">B</text>
    <text x="278.5" y="187">C</text>
    <text x="302" y="208" font-style="italic">x</text>
    <text x="88" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`את $A$ מוצאים בהשוואת שני הביטויים של $y$.`,
          String.raw`את $B$ ו-$C$ מוצאים בהצבת $y=0$ בכל אחת מהמשוואות.`,
          String.raw`הבסיס $BC$ נמצא על ציר ה-$x$, והגובה אליו הוא שיעור ה-$y$ של $A$.`,
        ],
        solutionSteps: [
          String.raw`$A$: $2x+2=-x+8$, ולכן $3x=6$, $x=2$ ו-$y=2\cdot2+2=6$. $A(2,6)$.`,
          String.raw`$B$: $0=2x+2$, ולכן $x=-1$ ו-$B(-1,0)$. $C$: $0=-x+8$, ולכן $x=8$ ו-$C(8,0)$.`,
          String.raw`הבסיס $BC$ על ציר ה-$x$: $BC=8-(-1)=9$. הגובה מ-$A$ לציר ה-$x$ הוא $6$.`,
          String.raw`$S_{ABC}=\frac{9\cdot6}{2}=27$.`,
          String.raw`$AC=\sqrt{(8-2)^2+(0-6)^2}=\sqrt{72}=6\sqrt{2}\approx8.49$.`,
        ],
        finalAnswer: String.raw`$A(2,6)$, $B(-1,0)$, $C(8,0)$; $S_{ABC}=27$; $AC=6\sqrt2\approx8.49$.`,
        answers: [
          { label: String.raw`$x$ של $A$`, value: 2 },
          { label: String.raw`$y$ של $A$`, value: 6 },
          { label: 'שטח המשולש', value: 27 },
          { label: String.raw`אורך $AC$`, value: Math.sqrt(72) },
        ],
      },
      {
        id: 'ag-line-8',
        difficulty: 3,
        statement: String.raw`הישרים $y=2x-1$, $y=-x+5$ ו-$y=kx+1$ עוברים דרך נקודה אחת. מצאו את $k$, וחשבו את שטח המשולש שהישרים $y=2x-1$ ו-$y=-x+5$ יוצרים עם ציר ה-$y$.`,
        hints: [
          String.raw`מצאו את נקודת החיתוך של שני הישרים הראשונים, ודרשו שהישר השלישי יעבור דרכה.`,
          String.raw`שני הישרים חותכים את ציר ה-$y$ בנקודות $(0,-1)$ ו-$(0,5)$ – זה בסיס המשולש.`,
          String.raw`הגובה לבסיס שעל ציר ה-$y$ הוא המרחק של נקודת החיתוך מציר ה-$y$, כלומר שיעור ה-$x$ שלה.`,
        ],
        solutionSteps: [
          String.raw`החיתוך של שני הישרים הראשונים: $2x-1=-x+5$, ולכן $x=2$ ו-$y=3$. נסמן $P(2,3)$.`,
          String.raw`הישר השלישי עובר דרך $P$: $3=2k+1$, ולכן $k=1$.`,
          String.raw`הישר $y=2x-1$ חותך את ציר ה-$y$ ב-$(0,-1)$, והישר $y=-x+5$ חותך אותו ב-$(0,5)$. אורך הבסיס שעל ציר ה-$y$ הוא $5-(-1)=6$.`,
          String.raw`הגובה לבסיס הזה הוא המרחק של $P$ מציר ה-$y$, כלומר $2$.`,
          String.raw`$S=\frac{6\cdot2}{2}=6$.`,
        ],
        finalAnswer: String.raw`$k=1$; שטח המשולש $6$.`,
        answers: [
          { label: String.raw`$k$`, value: 1 },
          { label: 'שטח המשולש', value: 6 },
        ],
      },
    ],
  },
  'ag-line-equation': {
    intro: String.raw`בשיעור הזה בונים את משוואת הישר מהנתונים: כשנתונים שיפוע ונקודה מציבים בנוסחה $y-y_1=m(x-x_1)$, וכשנתונות שתי נקודות מחשבים קודם את השיפוע. כך מוצאים משוואות של צלעות, תיכונים וישרים העוברים דרך נקודות חיתוך, ובודקים אם שלוש נקודות נמצאות על ישר אחד. מציאת משוואת ישר היא הצעד הראשון כמעט בכל שאלה בגאומטריה אנליטית (שאלה 4 בשאלון 806), וגם בכל שאלת משיק בחדו״א.`,
    keyFacts: [
      String.raw`**שיפוע לפי שתי נקודות**: $m=\frac{y_2-y_1}{x_2-x_1}$ – באותו סדר במונה ובמכנה.`,
      String.raw`**ישר לפי שיפוע ונקודה**: $y-y_1=m(x-x_1)$; אחר כך מעבירים לצורה $y=mx+n$.`,
      String.raw`**ישר לפי שתי נקודות**: מחשבים את השיפוע, מציבים אחת הנקודות בנוסחה, ובודקים שהנקודה השנייה מקיימת את המשוואה.`,
      String.raw`**מקרים מיוחדים**: אם $x_1=x_2$ הישר אנכי, $x=x_1$; אם $y_1=y_2$ הישר אופקי, $y=y_1$.`,
      String.raw`**שלוש נקודות על ישר אחד**: השיפוע בין $A$ ל-$B$ שווה לשיפוע בין $B$ ל-$C$ (ישרים עם שיפוע שווה ונקודה משותפת מתלכדים).`,
      String.raw`**תיכון במשולש**: מוצאים את אמצע הצלע, ואז את משוואת הישר דרך הקודקוד ודרך האמצע. שלושת התיכונים נפגשים בנקודה אחת.`,
    ],
    exercises: [
      {
        id: 'ag-line-equation-1',
        difficulty: 1,
        statement: String.raw`מצאו את משוואת הישר ששיפועו $3$ והוא עובר דרך הנקודה $(2,-1)$.`,
        hints: [String.raw`הציבו בנוסחה $y-y_1=m(x-x_1)$.`],
        solutionSteps: [
          String.raw`$y-(-1)=3(x-2)$, כלומר $y+1=3x-6$.`,
          String.raw`$y=3x-7$. בדיקה: $3\cdot2-7=-1$.`,
        ],
        finalAnswer: String.raw`$y=3x-7$`,
        answers: [
          { label: String.raw`השיפוע $m$`, value: 3 },
          { label: String.raw`$n$ במשוואה $y=mx+n$`, value: -7 },
        ],
      },
      {
        id: 'ag-line-equation-2',
        difficulty: 1,
        statement: String.raw`מצאו את משוואת הישר העובר דרך הנקודות $A(-1,4)$ ו-$B(3,-4)$.`,
        hints: [
          String.raw`חשבו קודם את השיפוע $m=\frac{y_2-y_1}{x_2-x_1}$.`,
          String.raw`הציבו את השיפוע ואת אחת הנקודות בנוסחה $y-y_1=m(x-x_1)$.`,
        ],
        solutionSteps: [
          String.raw`$m=\frac{-4-4}{3-(-1)}=\frac{-8}{4}=-2$.`,
          String.raw`לפי הנקודה $A$: $y-4=-2(x+1)$, כלומר $y=-2x+2$.`,
          String.raw`בדיקה עם $B$: $-2\cdot3+2=-4$.`,
        ],
        finalAnswer: String.raw`$y=-2x+2$`,
        answers: [
          { label: String.raw`השיפוע $m$`, value: -2 },
          { label: String.raw`$n$ במשוואה $y=mx+n$`, value: 2 },
        ],
      },
      {
        id: 'ag-line-equation-3',
        difficulty: 2,
        statement: String.raw`נתונות הנקודות $A(2,5)$, $B(2,-3)$, $C(-1,4)$ ו-$D(6,4)$. מצאו את משוואת הישר $AB$ ואת משוואת הישר $CD$, ומצאו את נקודת החיתוך שלהם.`,
        hints: [
          String.raw`ל-$A$ ול-$B$ אותו שיעור $x$ – איזה ישר עובר דרכן?`,
          String.raw`ל-$C$ ול-$D$ אותו שיעור $y$.`,
        ],
        solutionSteps: [
          String.raw`ל-$A$ ול-$B$ אותו שיעור $x$, ולכן הישר $AB$ מקביל לציר ה-$y$ ומשוואתו $x=2$ (אין לו שיפוע; הנוסחה למשוואת ישר לפי שיפוע לא מתאימה כאן).`,
          String.raw`ל-$C$ ול-$D$ אותו שיעור $y$, ולכן הישר $CD$ מקביל לציר ה-$x$ ומשוואתו $y=4$ (שיפועו $0$).`,
          String.raw`נקודת החיתוך מקיימת את שתי המשוואות, ולכן היא $(2,4)$.`,
        ],
        finalAnswer: String.raw`$AB:\ x=2$; $CD:\ y=4$; נקודת החיתוך $(2,4)$.`,
        answers: [
          { label: String.raw`$x$ של נקודת החיתוך`, value: 2 },
          { label: String.raw`$y$ של נקודת החיתוך`, value: 4 },
        ],
      },
      {
        id: 'ag-line-equation-4',
        difficulty: 2,
        statement: String.raw`מצאו את משוואת הישר העובר דרך הנקודות $(-4,1)$ ו-$(2,4)$, ומצאו את נקודת החיתוך שלו עם ציר ה-$x$.`,
        hints: [
          String.raw`$m=\frac{4-1}{2-(-4)}$.`,
          String.raw`לחיתוך עם ציר ה-$x$ הציבו $y=0$.`,
        ],
        solutionSteps: [
          String.raw`$m=\frac{4-1}{2-(-4)}=\frac{3}{6}=\frac12$.`,
          String.raw`לפי הנקודה $(2,4)$: $y-4=\frac12(x-2)$, כלומר $y=\frac12x+3$.`,
          String.raw`בדיקה עם $(-4,1)$: $\frac12\cdot(-4)+3=1$.`,
          String.raw`חיתוך עם ציר ה-$x$: $0=\frac12x+3$, ולכן $x=-6$. הנקודה $(-6,0)$.`,
        ],
        finalAnswer: String.raw`$y=\frac12x+3$; הישר חותך את ציר ה-$x$ בנקודה $(-6,0)$.`,
        answers: [
          { label: String.raw`השיפוע $m$`, value: 0.5 },
          { label: String.raw`$n$ במשוואה $y=mx+n$`, value: 3 },
          { label: String.raw`$x$ של נקודת החיתוך עם ציר ה-$x$`, value: -6 },
        ],
      },
      {
        id: 'ag-line-equation-5',
        difficulty: 2,
        statement: String.raw`הראו שהנקודות $A(-2,-5)$, $B(1,1)$ ו-$C(4,7)$ נמצאות על ישר אחד, ומצאו את משוואתו. מצאו את $k$ שעבורו גם הנקודה $D(k,15)$ נמצאת על הישר.`,
        hints: [
          String.raw`השוו את השיפוע של $AB$ לשיפוע של $BC$.`,
          String.raw`מצאו את משוואת הישר בצורה $y=mx+n$ והציבו בה את $D$.`,
        ],
        solutionSteps: [
          String.raw`$m_{AB}=\frac{1-(-5)}{1-(-2)}=\frac{6}{3}=2$ ו-$m_{BC}=\frac{7-1}{4-1}=\frac{6}{3}=2$.`,
          String.raw`לישרים $AB$ ו-$BC$ אותו שיפוע ונקודה משותפת $B$, ולכן הם אותו ישר – שלוש הנקודות על ישר אחד.`,
          String.raw`משוואת הישר: $y-1=2(x-1)$, כלומר $y=2x-1$.`,
          String.raw`$D$ על הישר: $15=2k-1$, ולכן $k=8$.`,
        ],
        finalAnswer: String.raw`$m_{AB}=m_{BC}=2$, ולכן הנקודות על הישר $y=2x-1$; $k=8$.`,
        answers: [
          { label: String.raw`השיפוע $m$`, value: 2 },
          { label: String.raw`$n$ במשוואה $y=mx+n$`, value: -1 },
          { label: String.raw`$k$`, value: 8 },
        ],
      },
      {
        id: 'ag-line-equation-6',
        difficulty: 2,
        statement: String.raw`מצאו את משוואת הישר העובר דרך נקודת החיתוך של הישרים $y=x+1$ ו-$y=-2x+7$ ודרך הנקודה $Q(5,12)$.`,
        hints: [
          String.raw`מצאו קודם את נקודת החיתוך $P$ של שני הישרים הנתונים.`,
          String.raw`עכשיו יש שתי נקודות, $P$ ו-$Q$: חשבו את השיפוע והציבו בנוסחה.`,
        ],
        solutionSteps: [
          String.raw`נקודת החיתוך: $x+1=-2x+7$, ולכן $3x=6$, $x=2$ ו-$y=3$. נסמן $P(2,3)$.`,
          String.raw`$m_{PQ}=\frac{12-3}{5-2}=\frac93=3$.`,
          String.raw`$y-3=3(x-2)$, כלומר $y=3x-3$. בדיקה עם $Q$: $3\cdot5-3=12$.`,
        ],
        finalAnswer: String.raw`$y=3x-3$`,
        answers: [
          { label: String.raw`השיפוע $m$`, value: 3 },
          { label: String.raw`$n$ במשוואה $y=mx+n$`, value: -3 },
        ],
      },
      {
        id: 'ag-line-equation-7',
        difficulty: 3,
        statement: String.raw`קודקודי המשולש $ABC$ הם $A(-2,3)$, $B(4,-1)$ ו-$C(6,7)$. $K$ היא אמצע הצלע $BC$ ו-$L$ היא אמצע הצלע $AC$ (ראו שרטוט). מצאו את משוואת התיכון $AK$ ואת משוואת התיכון $BL$, ומצאו את נקודת המפגש $G$ של התיכונים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="54" y1="177.6" x2="268" y2="177.6" />
    <polyline points="261,173.6 268,177.6 261,181.6" />
    <line x1="121.6" y1="226" x2="121.6" y2="12" />
    <polyline points="117.6,19 121.6,12 125.6,19" />
  </g>
  <polygon points="83.2,120 198.4,196.8 236.8,43.2" />
  <line x1="83.2" y1="120" x2="217.6" y2="120" stroke-dasharray="6 4" stroke-width="1.5" />
  <line x1="198.4" y1="196.8" x2="160" y2="81.6" stroke-dasharray="6 4" stroke-width="1.5" />
  <circle cx="83.2" cy="120" r="3" fill="currentColor" stroke="none" />
  <circle cx="198.4" cy="196.8" r="3" fill="currentColor" stroke="none" />
  <circle cx="236.8" cy="43.2" r="3" fill="currentColor" stroke="none" />
  <circle cx="217.6" cy="120" r="3" fill="currentColor" stroke="none" />
  <circle cx="160" cy="81.6" r="3" fill="currentColor" stroke="none" />
  <circle cx="172.8" cy="120" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="69.2" y="125.5">A</text>
    <text x="198.4" y="216.3">B</text>
    <text x="236.8" y="34.7">C</text>
    <text x="231.6" y="125.5">K</text>
    <text x="149.5" y="76.6">L</text>
    <text x="162.3" y="136">G</text>
    <text x="266" y="193.6" font-style="italic">x</text>
    <text x="133.6" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`מצאו את $K$ ואת $L$ בנוסחת האמצע.`,
          String.raw`שימו לב: ל-$A$ ול-$K$ אותו שיעור $y$.`,
          String.raw`$G$ היא הפתרון של מערכת המשוואות של שני התיכונים.`,
        ],
        solutionSteps: [
          String.raw`$K\left(\frac{4+6}{2},\frac{-1+7}{2}\right)=K(5,3)$. ל-$A$ ול-$K$ אותו שיעור $y$, ולכן משוואת התיכון $AK$ היא $y=3$.`,
          String.raw`$L\left(\frac{-2+6}{2},\frac{3+7}{2}\right)=L(2,5)$.`,
          String.raw`שיפוע התיכון $BL$: $m=\frac{5-(-1)}{2-4}=\frac{6}{-2}=-3$, ולכן $y+1=-3(x-4)$, כלומר $y=-3x+11$.`,
          String.raw`$G$: מציבים $y=3$ ב-$y=-3x+11$: $3=-3x+11$, ולכן $x=\frac83$. $G\left(\frac83,3\right)$.`,
          String.raw`בדיקה: נקודת המפגש של התיכונים היא ממוצע הקודקודים, $\left(\frac{-2+4+6}{3},\frac{3-1+7}{3}\right)=\left(\frac83,3\right)$.`,
        ],
        finalAnswer: String.raw`$AK:\ y=3$; $BL:\ y=-3x+11$; $G\left(\frac83,3\right)$.`,
        answers: [
          { label: String.raw`השיפוע של $BL$`, value: -3 },
          { label: String.raw`$n$ במשוואת $BL$ ($y=mx+n$)`, value: 11 },
          { label: String.raw`$x$ של $G$`, value: 8 / 3 },
          { label: String.raw`$y$ של $G$`, value: 3 },
        ],
      },
      {
        id: 'ag-line-equation-8',
        difficulty: 3,
        statement: String.raw`ישר בעל שיפוע שלילי עובר דרך הנקודה $A(1,4)$, וחותך את החלק החיובי של ציר ה-$x$ ואת החלק החיובי של ציר ה-$y$. שטח המשולש שהישר יוצר עם הצירים הוא $9$. מצאו את משוואת הישר (יש שתי אפשרויות).`,
        hints: [
          String.raw`כתבו את הישר בעזרת השיפוע: $y-4=m(x-1)$, ומצאו בעזרת $m$ את נקודות החיתוך שלו עם הצירים.`,
          String.raw`החיתוך עם ציר ה-$y$ הוא $(0,4-m)$, והחיתוך עם ציר ה-$x$ הוא $\left(1-\frac4m,0\right)$.`,
          String.raw`השטח הוא מחצית מכפלת הקטעים שהישר חותך על הצירים. כדי להימנע מבלבול בסימנים סמנו $m=-s$, כאשר $s>0$.`,
        ],
        solutionSteps: [
          String.raw`משוואת הישר: $y=m(x-1)+4$, כאשר $m<0$.`,
          String.raw`חיתוך עם ציר ה-$y$ ($x=0$): $y=4-m$. חיתוך עם ציר ה-$x$ ($y=0$): $x=1-\frac{4}{m}$. כאשר $m<0$ שני הקטעים חיוביים.`,
          String.raw`נסמן $m=-s$, $s>0$. הקטעים הם $4+s$ ו-$1+\frac4s=\frac{s+4}{s}$, והשטח $\frac12(4+s)\cdot\frac{s+4}{s}=\frac{(s+4)^2}{2s}$.`,
          String.raw`$\frac{(s+4)^2}{2s}=9$ נותן $s^2+8s+16=18s$, כלומר $s^2-10s+16=0$, ולכן $s=2$ או $s=8$.`,
          String.raw`$s=2$: $m=-2$ והישר $y=-2x+6$. הוא חותך את הצירים ב-$(3,0)$ וב-$(0,6)$, והשטח $\frac{3\cdot6}{2}=9$.`,
          String.raw`$s=8$: $m=-8$ והישר $y=-8x+12$. הוא חותך את הצירים ב-$(1.5,0)$ וב-$(0,12)$, והשטח $\frac{1.5\cdot12}{2}=9$.`,
        ],
        finalAnswer: String.raw`$y=-2x+6$ או $y=-8x+12$`,
        answers: [
          { label: 'השיפוע הגדול מבין השניים', value: -2 },
          { label: String.raw`$n$ של הישר בעל השיפוע הגדול`, value: 6 },
          { label: 'השיפוע הקטן מבין השניים', value: -8 },
          { label: String.raw`$n$ של הישר בעל השיפוע הקטן`, value: 12 },
        ],
      },
    ],
  },
  'ag-slope-parallel': {
    intro: String.raw`השיפוע מתאר את התלילות ואת הכיוון של ישר: שיפוע חיובי – הישר עולה, שלילי – יורד, אפס – אופקי. השיפוע שווה ל-$\tan\alpha$, כאשר $\alpha$ היא הזווית שהישר יוצר עם הכיוון החיובי של ציר ה-$x$ (זווית הנטייה). שני ישרים מקבילים אם״ם יש להם אותו שיפוע – כך מוכיחים שמרובע הוא מקבילית או טרפז, ומוצאים ישר מקביל לישר נתון דרך נקודה. בבגרות זה מופיע בשאלה 4 בשאלון 806, והקשר $m=\tan\alpha$ משמש גם בטריגונומטריה.`,
    keyFacts: [
      String.raw`**שיפוע**: $m=\frac{y_2-y_1}{x_2-x_1}$ – השינוי ב-$y$ כש-$x$ גדל ב-$1$. $m>0$ – הישר עולה; $m<0$ – יורד; $m=0$ – אופקי; לישר אנכי אין שיפוע.`,
      String.raw`**שיפוע וזווית נטייה**: $m=\tan\alpha$, כאשר $\alpha$ היא הזווית בין הישר לכיוון החיובי של ציר ה-$x$ ($0^\circ\le\alpha<180^\circ$). למשל $m=1$ מתאים ל-$45^\circ$, ו-$m=-1$ ל-$135^\circ$.`,
      String.raw`**ישרים מקבילים**: $m_1=m_2$ (ו-$n_1\ne n_2$, אחרת הישרים מתלכדים). ישרים אנכיים $x=k_1$ ו-$x=k_2$ מקבילים זה לזה.`,
      String.raw`**ישר מקביל דרך נקודה**: לוקחים את השיפוע של הישר הנתון ומציבים אותו ואת הנקודה בנוסחה $y-y_1=m(x-x_1)$.`,
      String.raw`**הוכחת מקבילית**: מראים ששני זוגות של צלעות נגדיות מקבילים (שיפועים שווים). **טרפז**: יש בו זוג אחד של צלעות מקבילות.`,
      String.raw`**ישרים עם פרמטר**: מבודדים את $y$ בכל אחד מהישרים, משווים את השיפועים, ובודקים שהישרים לא מתלכדים.`,
    ],
    exercises: [
      {
        id: 'ag-slope-parallel-1',
        difficulty: 1,
        statement: String.raw`חשבו את השיפוע של הישר העובר דרך $A(-1,-2)$ ו-$B(3,6)$, ואת השיפוע של הישר $3x-6y+5=0$. איזה מהשניים תלול יותר?`,
        hints: [
          String.raw`$m=\frac{y_2-y_1}{x_2-x_1}$.`,
          String.raw`בישר השני בודדו את $y$.`,
        ],
        solutionSteps: [
          String.raw`$m_{AB}=\frac{6-(-2)}{3-(-1)}=\frac84=2$.`,
          String.raw`$3x-6y+5=0$, ולכן $6y=3x+5$ ו-$y=\frac12x+\frac56$. השיפוע הוא $\frac12$.`,
          String.raw`שני השיפועים חיוביים (שני הישרים עולים), והישר $AB$ תלול יותר, כי $2>\frac12$.`,
        ],
        finalAnswer: String.raw`$m_{AB}=2$; שיפוע הישר השני $\frac12$; הישר $AB$ תלול יותר.`,
        answers: [
          { label: String.raw`השיפוע של $AB$`, value: 2 },
          { label: String.raw`השיפוע של $3x-6y+5=0$`, value: 0.5 },
        ],
      },
      {
        id: 'ag-slope-parallel-2',
        difficulty: 1,
        statement: String.raw`מצאו את משוואת הישר המקביל לישר $y=-3x+2$ ועובר דרך הנקודה $(1,4)$.`,
        hints: [
          String.raw`לישרים מקבילים יש אותו שיפוע.`,
          String.raw`הציבו את השיפוע $-3$ ואת הנקודה בנוסחה $y-y_1=m(x-x_1)$.`,
        ],
        solutionSteps: [
          String.raw`הישר המבוקש מקביל ל-$y=-3x+2$, ולכן שיפועו $m=-3$.`,
          String.raw`$y-4=-3(x-1)$, כלומר $y=-3x+7$.`,
          String.raw`$7\ne2$, ולכן זה ישר אחר, מקביל לישר הנתון.`,
        ],
        finalAnswer: String.raw`$y=-3x+7$`,
        answers: [
          { label: String.raw`השיפוע $m$`, value: -3 },
          { label: String.raw`$n$ במשוואה $y=mx+n$`, value: 7 },
        ],
      },
      {
        id: 'ag-slope-parallel-3',
        difficulty: 2,
        statement: String.raw`מצאו את זווית הנטייה (הזווית עם הכיוון החיובי של ציר ה-$x$) של כל אחד מהישרים: א. $y=\sqrt3x-2$. ב. הישר העובר דרך הנקודות $(1,5)$ ו-$(4,2)$.`,
        hints: [
          String.raw`זווית הנטייה $\alpha$ מקיימת $\tan\alpha=m$, כאשר $0^\circ\le\alpha<180^\circ$.`,
          String.raw`כשהשיפוע שלילי, זווית הנטייה קהה: $\alpha=180^\circ-\beta$, כאשר $\tan\beta=|m|$.`,
        ],
        solutionSteps: [
          String.raw`א. $m=\sqrt3$, ולכן $\tan\alpha=\sqrt3$ ו-$\alpha=60^\circ$.`,
          String.raw`ב. $m=\frac{2-5}{4-1}=\frac{-3}{3}=-1$.`,
          String.raw`$\tan\alpha=-1$ והזווית בתחום $0^\circ\le\alpha<180^\circ$, ולכן $\alpha$ קהה: $\alpha=180^\circ-45^\circ=135^\circ$.`,
        ],
        finalAnswer: String.raw`א. $60^\circ$. ב. $135^\circ$.`,
        answers: [
          { label: 'זווית הנטייה בסעיף א (במעלות)', value: 60 },
          { label: 'זווית הנטייה בסעיף ב (במעלות)', value: 135 },
        ],
      },
      {
        id: 'ag-slope-parallel-4',
        difficulty: 2,
        statement: String.raw`נתונים הישרים $y=(2k-1)x+3$ ו-$y=(k+2)x-1$. א. מצאו את $k$ שעבורו הישרים מקבילים. ב. מצאו את $k$ שעבורו הישר הראשון יוצר זווית של $45^\circ$ עם הכיוון החיובי של ציר ה-$x$.`,
        hints: [
          String.raw`ישרים מקבילים – שיפועים שווים: $2k-1=k+2$.`,
          String.raw`זווית נטייה של $45^\circ$ פירושה $m=\tan45^\circ=1$.`,
        ],
        solutionSteps: [
          String.raw`א. הישרים מקבילים כשהשיפועים שווים: $2k-1=k+2$, ולכן $k=3$. אז שני השיפועים שווים ל-$5$, והקבועים $3$ ו-$-1$ שונים, כך שהישרים אינם מתלכדים.`,
          String.raw`ב. $\tan45^\circ=1$, ולכן נדרוש $2k-1=1$, כלומר $k=1$.`,
        ],
        finalAnswer: String.raw`א. $k=3$. ב. $k=1$.`,
        answers: [
          { label: String.raw`$k$ בסעיף א`, value: 3 },
          { label: String.raw`$k$ בסעיף ב`, value: 1 },
        ],
      },
      {
        id: 'ag-slope-parallel-5',
        difficulty: 2,
        statement: String.raw`קודקודי המרובע $ABCD$ הם $A(-3,-1)$, $B(3,1)$, $C(5,5)$ ו-$D(-1,3)$ (ראו שרטוט). חשבו את שיפועי הצלעות, והוכיחו שהמרובע הוא מקבילית.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="30" y1="168" x2="292" y2="168" />
    <polyline points="285,164 292,168 285,172" />
    <line x1="136" y1="226" x2="136" y2="12" />
    <polyline points="132,19 136,12 140,19" />
  </g>
  <polygon points="64,192 208,144 256,48 112,96" />
  <circle cx="64" cy="192" r="3" fill="currentColor" stroke="none" />
  <circle cx="208" cy="144" r="3" fill="currentColor" stroke="none" />
  <circle cx="256" cy="48" r="3" fill="currentColor" stroke="none" />
  <circle cx="112" cy="96" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="53.5" y="208">A</text>
    <text x="218.5" y="160">B</text>
    <text x="266.5" y="43">C</text>
    <text x="101.5" y="91">D</text>
    <text x="290" y="184" font-style="italic">x</text>
    <text x="148" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`חשבו את $m_{AB}$, $m_{BC}$, $m_{DC}$ ו-$m_{AD}$.`,
          String.raw`מרובע שבו כל שתי צלעות נגדיות מקבילות הוא מקבילית.`,
        ],
        solutionSteps: [
          String.raw`$m_{AB}=\frac{1-(-1)}{3-(-3)}=\frac26=\frac13$ ו-$m_{DC}=\frac{5-3}{5-(-1)}=\frac26=\frac13$.`,
          String.raw`$m_{AD}=\frac{3-(-1)}{-1-(-3)}=\frac42=2$ ו-$m_{BC}=\frac{5-1}{5-3}=\frac42=2$.`,
          String.raw`$m_{AB}=m_{DC}$, ולכן $AB\parallel DC$; $m_{AD}=m_{BC}$, ולכן $AD\parallel BC$.`,
          String.raw`במרובע $ABCD$ שני זוגות של צלעות נגדיות מקבילות, ולכן הוא מקבילית.`,
        ],
        finalAnswer: String.raw`$m_{AB}=m_{DC}=\frac13$ ו-$m_{AD}=m_{BC}=2$, ולכן $ABCD$ מקבילית.`,
        answers: [
          { label: String.raw`$m_{AB}$`, value: 1 / 3 },
          { label: String.raw`$m_{AD}$`, value: 2 },
        ],
      },
      {
        id: 'ag-slope-parallel-6',
        difficulty: 2,
        statement: String.raw`נתונים הישרים $kx+2y=4$ ו-$3x+(k+1)y=1$. מצאו את ערכי $k$ שעבורם הישרים מקבילים.`,
        hints: [
          String.raw`בודדו את $y$ בכל אחת מהמשוואות כדי למצוא את השיפועים (בישר השני הניחו $k\ne-1$, ובדקו את המקרה $k=-1$ בנפרד).`,
          String.raw`השוו את השיפועים, $-\frac{k}{2}=-\frac{3}{k+1}$, וקבלו משוואה ריבועית.`,
          String.raw`בדקו שעבור כל פתרון הישרים אינם מתלכדים.`,
        ],
        solutionSteps: [
          String.raw`הישר הראשון: $y=-\frac{k}{2}x+2$, ושיפועו $-\frac{k}{2}$.`,
          String.raw`אם $k=-1$, הישר השני הוא $3x=1$ – ישר אנכי, ואילו הראשון אינו אנכי, ולכן הם לא מקבילים. עבור $k\ne-1$: $y=-\frac{3}{k+1}x+\frac{1}{k+1}$, ושיפועו $-\frac{3}{k+1}$.`,
          String.raw`השוואת השיפועים: $\frac{k}{2}=\frac{3}{k+1}$, ולכן $k(k+1)=6$, כלומר $k^2+k-6=0$ ו-$(k+3)(k-2)=0$.`,
          String.raw`$k=2$: הישרים $y=-x+2$ ו-$y=-x+\frac13$ – מקבילים ושונים.`,
          String.raw`$k=-3$: הישרים $y=1.5x+2$ ו-$y=1.5x-0.5$ – מקבילים ושונים.`,
        ],
        finalAnswer: String.raw`$k=2$ או $k=-3$`,
        answers: [
          { label: String.raw`$k$ (הערך הגדול)`, value: 2 },
          { label: String.raw`$k$ (הערך הקטן)`, value: -3 },
        ],
      },
      {
        id: 'ag-slope-parallel-7',
        difficulty: 3,
        statement: String.raw`$ABCD$ הוא טרפז ($AB\parallel DC$). נתון: $A(-2,0)$, $B(6,4)$, $D(-1,5)$, והקודקוד $C$ נמצא על הישר $y=2x-2$ (ראו שרטוט). מצאו את משוואת הישר $DC$, מצאו את שיעורי $C$, וחשבו את היחס $\frac{DC}{AB}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="54" y1="196.8" x2="268" y2="196.8" />
    <polyline points="261,192.8 268,196.8 261,200.8" />
    <line x1="121.6" y1="226" x2="121.6" y2="12" />
    <polyline points="117.6,19 121.6,12 125.6,19" />
  </g>
  <line x1="128.3" y1="221.8" x2="230.1" y2="18.2" stroke-width="1.5" stroke-dasharray="6 4" />
  <polygon points="83.2,196.8 236.8,120 217.6,43.2 102.4,100.8" />
  <circle cx="83.2" cy="196.8" r="3" fill="currentColor" stroke="none" />
  <circle cx="236.8" cy="120" r="3" fill="currentColor" stroke="none" />
  <circle cx="217.6" cy="43.2" r="3" fill="currentColor" stroke="none" />
  <circle cx="102.4" cy="100.8" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="72.7" y="212.8">A</text>
    <text x="250.8" y="125.5">B</text>
    <text x="207.1" y="38.2">C</text>
    <text x="91.9" y="95.8">D</text>
    <text x="266" y="212.8" font-style="italic">x</text>
    <text x="133.6" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`$DC\parallel AB$, ולכן לישר $DC$ אותו שיפוע כמו ל-$AB$, והוא עובר דרך $D$.`,
          String.raw`$C$ היא נקודת החיתוך של הישר $DC$ עם הישר $y=2x-2$.`,
          String.raw`חשבו את שני האורכים בנוסחת המרחק ופשטו: $\sqrt{45}=3\sqrt5$ ו-$\sqrt{80}=4\sqrt5$.`,
        ],
        solutionSteps: [
          String.raw`$m_{AB}=\frac{4-0}{6-(-2)}=\frac48=\frac12$.`,
          String.raw`$DC\parallel AB$, ולכן $m_{DC}=\frac12$: $y-5=\frac12(x+1)$, כלומר $y=\frac12x+5.5$.`,
          String.raw`$C$: $\frac12x+5.5=2x-2$, ולכן $1.5x=7.5$, $x=5$ ו-$y=2\cdot5-2=8$. $C(5,8)$.`,
          String.raw`$DC=\sqrt{(5+1)^2+(8-5)^2}=\sqrt{45}=3\sqrt5$ ו-$AB=\sqrt{8^2+4^2}=\sqrt{80}=4\sqrt5$.`,
          String.raw`$\frac{DC}{AB}=\frac{3\sqrt5}{4\sqrt5}=\frac34$.`,
        ],
        finalAnswer: String.raw`$DC:\ y=\frac12x+5.5$; $C(5,8)$; $\frac{DC}{AB}=\frac34$.`,
        answers: [
          { label: String.raw`$x$ של $C$`, value: 5 },
          { label: String.raw`$y$ של $C$`, value: 8 },
          { label: String.raw`היחס $\frac{DC}{AB}$`, value: 0.75 },
        ],
      },
      {
        id: 'ag-slope-parallel-8',
        difficulty: 3,
        statement: String.raw`$ABCD$ היא מקבילית. נתון: $A(1,2)$ ו-$B(7,4)$. הצלע $AD$ נמצאת על הישר $y=3x-1$, והישר שעליו נמצאת הצלע $DC$ עובר דרך הנקודה $E(0,7)$ (ראו שרטוט). מצאו את שיעורי הקודקודים $D$ ו-$C$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="68.8" y1="186.5" x2="253.2" y2="186.5" />
    <polyline points="246.2,182.5 253.2,186.5 246.2,190.5" />
    <line x1="93.5" y1="226" x2="93.5" y2="12" />
    <polyline points="89.5,19 93.5,12 97.5,19" />
  </g>
  <line x1="87.1" y1="220.4" x2="154.1" y2="19.6" stroke-width="1.5" stroke-dasharray="6 4" />
  <line x1="74.3" y1="89.5" x2="245.7" y2="32.4" stroke-width="1.5" stroke-dasharray="6 4" />
  <polygon points="108.3,156.9 196.9,127.4 226.5,38.8 137.8,68.3" />
  <circle cx="108.3" cy="156.9" r="3" fill="currentColor" stroke="none" />
  <circle cx="196.9" cy="127.4" r="3" fill="currentColor" stroke="none" />
  <circle cx="226.5" cy="38.8" r="3" fill="currentColor" stroke="none" />
  <circle cx="137.8" cy="68.3" r="3" fill="currentColor" stroke="none" />
  <circle cx="93.5" cy="83.1" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="118.8" y="172.9">A</text>
    <text x="207.4" y="143.4">B</text>
    <text x="226.5" y="30.3">C</text>
    <text x="127.3" y="63.3">D</text>
    <text x="83" y="78.1">E</text>
    <text x="251.2" y="202.5" font-style="italic">x</text>
    <text x="105.5" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`$DC\parallel AB$: מצאו את שיפוע $AB$ ואת משוואת הישר $DC$ דרך $E$.`,
          String.raw`$D$ היא נקודת החיתוך של הישר $DC$ עם הישר $AD$.`,
          String.raw`$BC\parallel AD$: הישר $BC$ עובר דרך $B$ בשיפוע $3$, ו-$C$ היא נקודת החיתוך שלו עם $DC$.`,
        ],
        solutionSteps: [
          String.raw`$m_{AB}=\frac{4-2}{7-1}=\frac13$. במקבילית $DC\parallel AB$, ולכן הישר $DC$ עובר דרך $E(0,7)$ בשיפוע $\frac13$: $y=\frac13x+7$.`,
          String.raw`$D$ – חיתוך עם הישר $AD$: $3x-1=\frac13x+7$, ולכן $\frac83x=8$, $x=3$ ו-$y=8$. $D(3,8)$.`,
          String.raw`במקבילית $BC\parallel AD$, ולכן הישר $BC$ עובר דרך $B(7,4)$ בשיפוע $3$: $y-4=3(x-7)$, כלומר $y=3x-17$.`,
          String.raw`$C$ – חיתוך של $BC$ עם $DC$: $3x-17=\frac13x+7$, ולכן $\frac83x=24$, $x=9$ ו-$y=10$. $C(9,10)$.`,
          String.raw`בדיקה: אמצע $AC$ הוא $\left(\frac{1+9}{2},\frac{2+10}{2}\right)=(5,6)$, וגם אמצע $BD$ הוא $\left(\frac{7+3}{2},\frac{4+8}{2}\right)=(5,6)$ – האלכסונים חוצים זה את זה.`,
        ],
        finalAnswer: String.raw`$D(3,8)$, $C(9,10)$`,
        answers: [
          { label: String.raw`$x$ של $D$`, value: 3 },
          { label: String.raw`$y$ של $D$`, value: 8 },
          { label: String.raw`$x$ של $C$`, value: 9 },
          { label: String.raw`$y$ של $C$`, value: 10 },
        ],
      },
    ],
  },
  'ag-perpendicular': {
    intro: String.raw`שני ישרים (שאינם מקבילים לצירים) ניצבים זה לזה אם״ם מכפלת השיפועים שלהם היא $-1$, כלומר השיפוע של האחד הוא ההופכי והנגדי של השיפוע של האחר. בעזרת התנאי הזה מוכיחים שזווית במשולש ישרה, מוצאים גובה במשולש ואת עקב האנך מנקודה לישר, ומוצאים אנך אמצעי לקטע. נקודת המפגש של האנכים האמצעיים היא מרכז המעגל החוסם את המשולש. בבגרות זה מופיע בשאלה 4 בשאלון 806, וגם בשאלות חדו״א (ישר הניצב למשיק).`,
    keyFacts: [
      String.raw`**ישרים ניצבים**: $m_1\cdot m_2=-1$, כלומר $m_2=-\frac{1}{m_1}$ (הופכי ונגדי). ישר אופקי $y=a$ וישר אנכי $x=b$ ניצבים זה לזה.`,
      String.raw`**זווית ישרה במשולש**: $\angle ABC=90^\circ$ אם״ם $m_{BA}\cdot m_{BC}=-1$.`,
      String.raw`**גובה במשולש** עובר דרך הקודקוד וניצב לצלע שמולו – שיפועו הופכי ונגדי לשיפוע הצלע.`,
      String.raw`**עקב האנך** מנקודה $P$ לישר: מוצאים את הישר דרך $P$ הניצב לישר הנתון, ואת נקודת החיתוך $H$ של שני הישרים. המרחק של $P$ מהישר הוא $PH$.`,
      String.raw`**אנך אמצעי** לקטע $AB$ עובר דרך אמצע $AB$ וניצב לו. כל נקודה עליו נמצאת במרחקים שווים מ-$A$ ומ-$B$.`,
      String.raw`**מרכז המעגל החוסם** משולש הוא נקודת המפגש של האנכים האמצעיים של צלעותיו; הרדיוס הוא המרחק מהמרכז לאחד הקודקודים.`,
    ],
    exercises: [
      {
        id: 'ag-perpendicular-1',
        difficulty: 1,
        statement: String.raw`א. מהו השיפוע של ישר הניצב לישר $y=\frac23x+1$? ב. האם הישרים $y=4x-1$ ו-$x+4y=8$ ניצבים זה לזה?`,
        hints: [
          String.raw`שיפוע ניצב הוא ההופכי והנגדי: $-\frac{1}{m}$.`,
          String.raw`בישר $x+4y=8$ בודדו את $y$, וחשבו את מכפלת השיפועים.`,
        ],
        solutionSteps: [
          String.raw`א. $m=\frac23$, ולכן שיפוע הניצב הוא $-\frac{1}{2/3}=-\frac32$.`,
          String.raw`ב. $x+4y=8$ נותן $y=-\frac14x+2$, ושיפועו $-\frac14$.`,
          String.raw`$4\cdot\left(-\frac14\right)=-1$, ולכן הישרים ניצבים זה לזה.`,
        ],
        finalAnswer: String.raw`א. $-\frac32$. ב. כן – מכפלת השיפועים היא $-1$.`,
        answers: [{ label: 'השיפוע בסעיף א', value: -1.5 }],
      },
      {
        id: 'ag-perpendicular-2',
        difficulty: 1,
        statement: String.raw`מצאו את משוואת הישר העובר דרך הנקודה $(2,-1)$ וניצב לישר $y=\frac12x+3$.`,
        hints: [String.raw`השיפוע של הישר המבוקש הוא ההופכי והנגדי של $\frac12$.`],
        solutionSteps: [
          String.raw`שיפוע הישר הנתון $\frac12$, ולכן שיפוע הניצב $m=-2$ (כי $\frac12\cdot(-2)=-1$).`,
          String.raw`$y-(-1)=-2(x-2)$, כלומר $y=-2x+3$.`,
        ],
        finalAnswer: String.raw`$y=-2x+3$`,
        answers: [
          { label: String.raw`השיפוע $m$`, value: -2 },
          { label: String.raw`$n$ במשוואה $y=mx+n$`, value: 3 },
        ],
      },
      {
        id: 'ag-perpendicular-3',
        difficulty: 2,
        statement: String.raw`קודקודי המשולש $ABC$ הם $A(0,4)$, $B(2,0)$ ו-$C(8,3)$ (ראו שרטוט). הוכיחו בעזרת שיפועים שהמשולש ישר זווית, וחשבו את שטחו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="14" y1="174.4" x2="308" y2="174.4" />
    <polyline points="301,170.4 308,174.4 301,178.4" />
    <line x1="51.2" y1="211.6" x2="51.2" y2="26.4" />
    <polyline points="47.2,33.4 51.2,26.4 55.2,33.4" />
  </g>
  <polygon points="51.2,65.6 105.6,174.4 268.8,92.8" />
  <circle cx="51.2" cy="65.6" r="3" fill="currentColor" stroke="none" />
  <circle cx="105.6" cy="174.4" r="3" fill="currentColor" stroke="none" />
  <circle cx="268.8" cy="92.8" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="40.7" y="60.6">A</text>
    <text x="105.6" y="193.9">B</text>
    <text x="282.8" y="98.3">C</text>
    <text x="306" y="190.4" font-style="italic">x</text>
    <text x="63.2" y="32.4" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`חשבו את השיפועים של $AB$ ושל $BC$ ואת מכפלתם.`,
          String.raw`במשולש ישר זווית השטח הוא מחצית מכפלת הניצבים.`,
        ],
        solutionSteps: [
          String.raw`$m_{AB}=\frac{0-4}{2-0}=-2$ ו-$m_{BC}=\frac{3-0}{8-2}=\frac12$.`,
          String.raw`$m_{AB}\cdot m_{BC}=-2\cdot\frac12=-1$, ולכן $AB\perp BC$, כלומר $\angle ABC=90^\circ$.`,
          String.raw`$AB=\sqrt{2^2+4^2}=\sqrt{20}$ ו-$BC=\sqrt{6^2+3^2}=\sqrt{45}$.`,
          String.raw`$S=\frac{AB\cdot BC}{2}=\frac{\sqrt{20}\cdot\sqrt{45}}{2}=\frac{\sqrt{900}}{2}=\frac{30}{2}=15$.`,
        ],
        finalAnswer: String.raw`$m_{AB}\cdot m_{BC}=-1$, ולכן $\angle B=90^\circ$; השטח $15$.`,
        answers: [{ label: 'שטח המשולש', value: 15 }],
      },
      {
        id: 'ag-perpendicular-4',
        difficulty: 2,
        statement: String.raw`מצאו את משוואת האנך האמצעי לקטע $AB$, כאשר $A(-3,2)$ ו-$B(5,6)$, ומצאו את נקודת החיתוך שלו עם ציר ה-$x$.`,
        hints: [
          String.raw`האנך האמצעי עובר דרך אמצע $AB$ וניצב ל-$AB$.`,
          String.raw`מצאו את אמצע $AB$ ואת שיפוע $AB$, וקחו שיפוע הופכי ונגדי.`,
        ],
        solutionSteps: [
          String.raw`אמצע $AB$: $M\left(\frac{-3+5}{2},\frac{2+6}{2}\right)=M(1,4)$.`,
          String.raw`$m_{AB}=\frac{6-2}{5-(-3)}=\frac48=\frac12$, ולכן שיפוע האנך האמצעי הוא $-2$.`,
          String.raw`$y-4=-2(x-1)$, כלומר $y=-2x+6$.`,
          String.raw`חיתוך עם ציר ה-$x$: $0=-2x+6$, ולכן $x=3$. בדיקה: הנקודה $(3,0)$ נמצאת במרחק $\sqrt{36+4}=\sqrt{40}$ מ-$A$, וגם במרחק $\sqrt{4+36}=\sqrt{40}$ מ-$B$.`,
        ],
        finalAnswer: String.raw`$y=-2x+6$; האנך האמצעי חותך את ציר ה-$x$ בנקודה $(3,0)$.`,
        answers: [
          { label: String.raw`השיפוע $m$`, value: -2 },
          { label: String.raw`$n$ במשוואה $y=mx+n$`, value: 6 },
          { label: String.raw`$x$ של נקודת החיתוך עם ציר ה-$x$`, value: 3 },
        ],
      },
      {
        id: 'ag-perpendicular-5',
        difficulty: 2,
        statement: String.raw`מצאו את עקב האנך $H$ מהנקודה $P(7,1)$ לישר $y=2x-3$, וחשבו את המרחק של $P$ מהישר (ראו שרטוט).`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="71.5" y1="146.2" x2="250.5" y2="146.2" />
    <polyline points="243.5,142.2 250.5,146.2 243.5,150.2" />
    <line x1="98.9" y1="226" x2="98.9" y2="12" />
    <polyline points="94.9,19 98.9,12 102.9,19" />
  </g>
  <line x1="87.6" y1="221.2" x2="188.8" y2="18.8" stroke-width="1.5" />
  <line x1="221.1" y1="128.7" x2="151.3" y2="93.8" stroke-dasharray="6 4" stroke-width="1.5" />
  <polyline points="159.3,97.8 163.3,89.8 155.3,85.8" stroke-width="1" />
  <circle cx="221.1" cy="128.7" r="3" fill="currentColor" stroke="none" />
  <circle cx="151.3" cy="93.8" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="235.1" y="134.2">P</text>
    <text x="140.8" y="88.8">H</text>
    <text x="248.5" y="162.2" font-style="italic">x</text>
    <text x="110.9" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`העבירו דרך $P$ ישר הניצב לישר הנתון (שיפועו $-\frac12$).`,
          String.raw`$H$ היא נקודת החיתוך של שני הישרים.`,
          String.raw`המרחק של נקודה מישר הוא אורך האנך $PH$.`,
        ],
        solutionSteps: [
          String.raw`שיפוע הישר הנתון $2$, ולכן שיפוע האנך $-\frac12$. האנך דרך $P$: $y-1=-\frac12(x-7)$, כלומר $y=-\frac12x+4.5$.`,
          String.raw`$H$: $2x-3=-\frac12x+4.5$, ולכן $2.5x=7.5$, $x=3$ ו-$y=2\cdot3-3=3$. $H(3,3)$.`,
          String.raw`המרחק של $P$ מהישר: $PH=\sqrt{(7-3)^2+(1-3)^2}=\sqrt{16+4}=\sqrt{20}=2\sqrt5\approx4.47$.`,
        ],
        finalAnswer: String.raw`$H(3,3)$; המרחק $\sqrt{20}=2\sqrt5\approx4.47$.`,
        answers: [
          { label: String.raw`$x$ של $H$`, value: 3 },
          { label: String.raw`$y$ של $H$`, value: 3 },
          { label: String.raw`המרחק $PH$`, value: Math.sqrt(20) },
        ],
      },
      {
        id: 'ag-perpendicular-6',
        difficulty: 2,
        statement: String.raw`נתונים הישרים $y=ax+3$ ו-$2y=(2a-5)x+1$. מצאו את ערכי $a$ שעבורם הישרים ניצבים זה לזה.`,
        hints: [
          String.raw`בודדו את $y$ בישר השני: שיפועו $\frac{2a-5}{2}$.`,
          String.raw`דרשו שמכפלת השיפועים תהיה $-1$.`,
        ],
        solutionSteps: [
          String.raw`שיפוע הישר הראשון $a$. הישר השני: $y=\frac{2a-5}{2}x+\frac12$, ושיפועו $a-2.5$.`,
          String.raw`ניצבות: $a(a-2.5)=-1$, כלומר $a^2-2.5a+1=0$, ובכפל ב-$2$: $2a^2-5a+2=0$.`,
          String.raw`$a=\frac{5\pm\sqrt{25-16}}{4}=\frac{5\pm3}{4}$, ולכן $a=2$ או $a=\frac12$.`,
          String.raw`בדיקה: עבור $a=2$ השיפועים $2$ ו-$-\frac12$; עבור $a=\frac12$ השיפועים $\frac12$ ו-$-2$. בשני המקרים המכפלה $-1$.`,
        ],
        finalAnswer: String.raw`$a=2$ או $a=\frac12$`,
        answers: [
          { label: String.raw`$a$ (הערך הגדול)`, value: 2 },
          { label: String.raw`$a$ (הערך הקטן)`, value: 0.5 },
        ],
      },
      {
        id: 'ag-perpendicular-7',
        difficulty: 3,
        statement: String.raw`קודקודי המשולש $ABC$ הם $A(-3,-1)$, $B(6,2)$ ו-$C(1,7)$. $CD$ הוא הגובה לצלע $AB$ (ראו שרטוט). מצאו את משוואת הגובה $CD$, מצאו את שיעורי $D$, וחשבו את שטח המשולש $ABC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="44.4" y1="177.6" x2="277.6" y2="177.6" />
    <polyline points="270.6,173.6 277.6,177.6 270.6,181.6" />
    <line x1="131.2" y1="226" x2="131.2" y2="12" />
    <polyline points="127.2,19 131.2,12 135.2,19" />
  </g>
  <polygon points="73.6,196.8 246.4,139.2 150.4,43.2" />
  <line x1="150.4" y1="43.2" x2="188.8" y2="158.4" stroke-dasharray="6 4" stroke-width="1.5" />
  <polyline points="186,149.9 194.5,147 197.3,155.6" stroke-width="1" />
  <circle cx="73.6" cy="196.8" r="3" fill="currentColor" stroke="none" />
  <circle cx="246.4" cy="139.2" r="3" fill="currentColor" stroke="none" />
  <circle cx="150.4" cy="43.2" r="3" fill="currentColor" stroke="none" />
  <circle cx="188.8" cy="158.4" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="63.1" y="212.8">A</text>
    <text x="260.4" y="144.7">B</text>
    <text x="150.4" y="34.7">C</text>
    <text x="199.3" y="174.4">D</text>
    <text x="275.6" y="193.6" font-style="italic">x</text>
    <text x="143.2" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`הגובה $CD$ ניצב ל-$AB$ ועובר דרך $C$.`,
          String.raw`$D$ היא נקודת החיתוך של הגובה עם הישר $AB$.`,
          String.raw`$S=\frac{AB\cdot CD}{2}$.`,
        ],
        solutionSteps: [
          String.raw`$m_{AB}=\frac{2-(-1)}{6-(-3)}=\frac39=\frac13$. הישר $AB$: $y+1=\frac13(x+3)$, כלומר $y=\frac13x$.`,
          String.raw`הגובה ניצב ל-$AB$, ולכן שיפועו $-3$, והוא עובר דרך $C$: $y-7=-3(x-1)$, כלומר $y=-3x+10$.`,
          String.raw`$D$: $\frac13x=-3x+10$, ולכן $\frac{10}{3}x=10$, $x=3$ ו-$y=1$. $D(3,1)$.`,
          String.raw`$CD=\sqrt{(3-1)^2+(1-7)^2}=\sqrt{40}$ ו-$AB=\sqrt{9^2+3^2}=\sqrt{90}$.`,
          String.raw`$S=\frac{AB\cdot CD}{2}=\frac{\sqrt{90}\cdot\sqrt{40}}{2}=\frac{\sqrt{3600}}{2}=\frac{60}{2}=30$.`,
        ],
        finalAnswer: String.raw`$CD:\ y=-3x+10$; $D(3,1)$; $S_{ABC}=30$.`,
        answers: [
          { label: String.raw`השיפוע של $CD$`, value: -3 },
          { label: String.raw`$n$ במשוואת $CD$ ($y=mx+n$)`, value: 10 },
          { label: String.raw`$x$ של $D$`, value: 3 },
          { label: String.raw`$y$ של $D$`, value: 1 },
          { label: 'שטח המשולש', value: 30 },
        ],
      },
      {
        id: 'ag-perpendicular-8',
        difficulty: 3,
        statement: String.raw`קודקודי המשולש $ABC$ הם $A(-1,5)$, $B(5,5)$ ו-$C(6,-2)$ (ראו שרטוט). מצאו את מרכז המעגל החוסם את המשולש בעזרת האנכים האמצעיים לצלעות $AB$ ו-$BC$, וחשבו את רדיוס המעגל.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="54" y1="137.5" x2="268" y2="137.5" />
    <polyline points="261,133.5 268,137.5 261,141.5" />
    <line x1="125.1" y1="226" x2="125.1" y2="12" />
    <polyline points="121.1,19 125.1,12 129.1,19" />
  </g>
  <circle cx="160" cy="120" r="87.3" stroke-width="1.8" stroke-dasharray="6 4" />
  <polygon points="107.6,50.2 212.4,50.2 229.8,172.4" />
  <circle cx="107.6" cy="50.2" r="3" fill="currentColor" stroke="none" />
  <circle cx="212.4" cy="50.2" r="3" fill="currentColor" stroke="none" />
  <circle cx="229.8" cy="172.4" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="97.1" y="45.2">A</text>
    <text x="222.9" y="45.2">B</text>
    <text x="243.8" y="177.9">C</text>
    <text x="266" y="153.5" font-style="italic">x</text>
    <text x="137.1" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`הצלע $AB$ אופקית, ולכן האנך האמצעי שלה הוא ישר אנכי.`,
          String.raw`האנך האמצעי ל-$BC$ עובר דרך אמצע $BC$, ושיפועו הופכי ונגדי לשיפוע $BC$.`,
          String.raw`מרכז המעגל החוסם הוא נקודת המפגש של האנכים האמצעיים; הרדיוס הוא המרחק מהמרכז לקודקוד.`,
        ],
        solutionSteps: [
          String.raw`ל-$A$ ול-$B$ אותו שיעור $y$, ולכן $AB$ אופקית ואמצעה $(2,5)$. האנך האמצעי ל-$AB$ הוא הישר האנכי $x=2$.`,
          String.raw`אמצע $BC$: $\left(\frac{5+6}{2},\frac{5-2}{2}\right)=(5.5,\,1.5)$. $m_{BC}=\frac{-2-5}{6-5}=-7$, ולכן שיפוע האנך האמצעי $\frac17$.`,
          String.raw`האנך האמצעי ל-$BC$: $y-1.5=\frac17(x-5.5)$.`,
          String.raw`מרכז המעגל: מציבים $x=2$ ומקבלים $y=1.5+\frac17\cdot(-3.5)=1.5-0.5=1$. המרכז $O(2,1)$.`,
          String.raw`הרדיוס: $R=OA=\sqrt{(2+1)^2+(1-5)^2}=\sqrt{9+16}=5$. בדיקה: $OB=\sqrt{9+16}=5$ ו-$OC=\sqrt{16+9}=5$.`,
        ],
        finalAnswer: String.raw`מרכז המעגל החוסם $(2,1)$; הרדיוס $5$.`,
        answers: [
          { label: String.raw`$x$ של המרכז`, value: 2 },
          { label: String.raw`$y$ של המרכז`, value: 1 },
          { label: String.raw`רדיוס $R$`, value: 5 },
        ],
      },
    ],
  },
  'ag-line-review': {
    intro: String.raw`שיעור מסכם על קטעים וישרים. כל תרגיל משלב כמה כלים – מרחק, אמצע, שיפוע, משוואת ישר, מקבילות, ניצבות וחיתוך – כמו שאלה 4 בשאלון 806. ההרגל החשוב: לשרטט סקיצה, לתרגם כל נתון מילולי לתנאי אלגברי (מקביל – שיפועים שווים, ניצב – מכפלת שיפועים $-1$, אמצע – ממוצע שיעורים), ולבדוק כל תשובה בהצבה.`,
    keyFacts: [
      String.raw`**מרחק ואמצע**: $d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$; $M\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$.`,
      String.raw`**ישר**: $m=\frac{y_2-y_1}{x_2-x_1}$, $y-y_1=m(x-x_1)$. מקבילים – $m_1=m_2$; ניצבים – $m_1m_2=-1$.`,
      String.raw`**זיהוי מרובעים**: מקבילית – שני זוגות צלעות נגדיות מקבילות (או אלכסונים שחוצים זה את זה); מעוין – מקבילית שבה שתי צלעות סמוכות שוות (ואז האלכסונים ניצבים); מלבן – מקבילית עם זווית ישרה; ריבוע – מעוין עם זווית ישרה.`,
      String.raw`**נקודות מיוחדות במשולש**: מפגש התיכונים, מפגש הגבהים ומפגש האנכים האמצעיים (מרכז המעגל החוסם) – כל אחת מהן היא נקודת החיתוך של שני ישרים מתאימים.`,
      String.raw`**שטח**: מחצית הבסיס כפול הגובה, כשהבסיס על ציר או מקביל לציר; במשולש ישר זווית – מחצית מכפלת הניצבים; במעוין – מחצית מכפלת האלכסונים.`,
    ],
    exercises: [
      {
        id: 'ag-line-review-1',
        difficulty: 2,
        statement: String.raw`נתונות הנקודות $A(-1,-2)$ ו-$B(5,1)$. הישר העובר דרך $A$ וניצב ל-$AB$ חותך את ציר ה-$y$ בנקודה $C$ (ראו שרטוט).

א. מצאו את משוואת הישר $AC$.

ב. מצאו את שיעורי $C$.

ג. חשבו את שטח המשולש $ABC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="40.3" y1="78.9" x2="281.7" y2="78.9" />
    <polyline points="274.7,74.9 281.7,78.9 274.7,82.9" />
    <line x1="105.1" y1="226" x2="105.1" y2="12" />
    <polyline points="101.1,19 105.1,12 109.1,19" />
  </g>
  <polygon points="77.7,133.7 242.3,51.4 105.1,188.6" />
  <polyline points="85.8,129.7 89.8,137.7 81.7,141.8" stroke-width="1" />
  <circle cx="77.7" cy="133.7" r="3" fill="currentColor" stroke="none" />
  <circle cx="242.3" cy="51.4" r="3" fill="currentColor" stroke="none" />
  <circle cx="105.1" cy="188.6" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="63.7" y="139.2">A</text>
    <text x="256.3" y="56.9">B</text>
    <text x="115.6" y="204.6">C</text>
    <text x="279.7" y="94.9" font-style="italic">x</text>
    <text x="117.1" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`שיפוע $AC$ הוא ההופכי והנגדי של שיפוע $AB$.`,
          String.raw`$C$ נמצאת על ציר ה-$y$, ולכן מציבים $x=0$.`,
          String.raw`הזווית $A$ ישרה, ולכן השטח הוא מחצית מכפלת הניצבים $AB$ ו-$AC$.`,
        ],
        solutionSteps: [
          String.raw`א. $m_{AB}=\frac{1-(-2)}{5-(-1)}=\frac36=\frac12$, ולכן $m_{AC}=-2$: $y+2=-2(x+1)$, כלומר $y=-2x-4$.`,
          String.raw`ב. מציבים $x=0$: $y=-4$, ולכן $C(0,-4)$.`,
          String.raw`ג. $AC\perp AB$, ולכן $\angle BAC=90^\circ$. $AB=\sqrt{6^2+3^2}=\sqrt{45}$ ו-$AC=\sqrt{1^2+2^2}=\sqrt5$.`,
          String.raw`$S_{ABC}=\frac{AB\cdot AC}{2}=\frac{\sqrt{45}\cdot\sqrt5}{2}=\frac{\sqrt{225}}{2}=\frac{15}{2}=7.5$.`,
        ],
        finalAnswer: String.raw`א. $y=-2x-4$. ב. $C(0,-4)$. ג. $S_{ABC}=7.5$.`,
        answers: [
          { label: String.raw`השיפוע של $AC$`, value: -2 },
          { label: String.raw`$n$ במשוואת $AC$ ($y=mx+n$)`, value: -4 },
          { label: 'שטח המשולש', value: 7.5 },
        ],
      },
      {
        id: 'ag-line-review-2',
        difficulty: 2,
        statement: String.raw`$ABCD$ היא מקבילית. נתון: $A(0,-1)$, $B(4,0)$ ו-$C(5,4)$ (ראו שרטוט).

א. מצאו את שיעורי $D$.

ב. הוכיחו שהמקבילית היא מעוין, והראו שאלכסוניה ניצבים זה לזה.

ג. חשבו את שטח המעוין.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="54" y1="161.1" x2="268" y2="161.1" />
    <polyline points="261,157.1 268,161.1 261,165.1" />
    <line x1="91.4" y1="226" x2="91.4" y2="12" />
    <polyline points="87.4,19 91.4,12 95.4,19" />
  </g>
  <polygon points="91.4,188.6 201.1,161.1 228.6,51.4 118.9,78.9" />
  <line x1="91.4" y1="188.6" x2="228.6" y2="51.4" stroke-dasharray="6 4" stroke-width="1.5" />
  <line x1="201.1" y1="161.1" x2="118.9" y2="78.9" stroke-dasharray="6 4" stroke-width="1.5" />
  <circle cx="91.4" cy="188.6" r="3" fill="currentColor" stroke="none" />
  <circle cx="201.1" cy="161.1" r="3" fill="currentColor" stroke="none" />
  <circle cx="228.6" cy="51.4" r="3" fill="currentColor" stroke="none" />
  <circle cx="118.9" cy="78.9" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="80.9" y="204.6">A</text>
    <text x="211.6" y="177.1">B</text>
    <text x="239.1" y="46.4">C</text>
    <text x="108.4" y="73.9">D</text>
    <text x="266" y="177.1" font-style="italic">x</text>
    <text x="103.4" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`האלכסונים במקבילית חוצים זה את זה – לאלכסונים $AC$ ו-$BD$ יש אותו אמצע.`,
          String.raw`השוו את שתי הצלעות הסמוכות $AB$ ו-$BC$. לניצבות האלכסונים – בדקו את מכפלת השיפועים.`,
          String.raw`שטח מעוין הוא מחצית מכפלת האלכסונים.`,
        ],
        solutionSteps: [
          String.raw`א. אמצע $AC$: $\left(\frac{0+5}{2},\frac{-1+4}{2}\right)=(2.5,\,1.5)$. זה גם אמצע $BD$, ולכן $D=(2\cdot2.5-4,\ 2\cdot1.5-0)=(1,3)$.`,
          String.raw`ב. $AB=\sqrt{4^2+1^2}=\sqrt{17}$ ו-$BC=\sqrt{1^2+4^2}=\sqrt{17}$. במקבילית יש שתי צלעות סמוכות שוות, ולכן היא מעוין.`,
          String.raw`$m_{AC}=\frac{4-(-1)}{5-0}=1$ ו-$m_{BD}=\frac{3-0}{1-4}=-1$. $m_{AC}\cdot m_{BD}=-1$, ולכן $AC\perp BD$.`,
          String.raw`ג. $AC=\sqrt{5^2+5^2}=\sqrt{50}$ ו-$BD=\sqrt{3^2+3^2}=\sqrt{18}$, ולכן $S=\frac{\sqrt{50}\cdot\sqrt{18}}{2}=\frac{\sqrt{900}}{2}=15$.`,
        ],
        finalAnswer: String.raw`א. $D(1,3)$. ב. $AB=BC=\sqrt{17}$ ו-$m_{AC}\cdot m_{BD}=-1$. ג. $S=15$.`,
        answers: [
          { label: String.raw`$x$ של $D$`, value: 1 },
          { label: String.raw`$y$ של $D$`, value: 3 },
          { label: 'שטח המעוין', value: 15 },
        ],
      },
      {
        id: 'ag-line-review-3',
        difficulty: 2,
        statement: String.raw`הישרים $y=2x+1$, $y=-2x+9$ ו-$y=1$ יוצרים את המשולש $ABC$: $A$ היא נקודת החיתוך של שני הישרים הראשונים, $B$ נמצאת על הישר הראשון ו-$C$ על הישר השני (ראו שרטוט).

א. מצאו את קודקודי המשולש.

ב. הוכיחו שהמשולש שווה שוקיים.

ג. חשבו את שטח המשולש.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="67.7" y1="188.6" x2="254.3" y2="188.6" />
    <polyline points="247.3,184.6 254.3,188.6 247.3,192.6" />
    <line x1="105.1" y1="226" x2="105.1" y2="12" />
    <polyline points="101.1,19 105.1,12 109.1,19" />
  </g>
  <line x1="73.6" y1="224.2" x2="177.8" y2="15.8" stroke-width="1.5" />
  <line x1="142.2" y1="15.8" x2="246.4" y2="224.2" stroke-width="1.5" />
  <line x1="69.5" y1="161.1" x2="250.5" y2="161.1" stroke-width="1.5" />
  <circle cx="160" cy="51.4" r="3" fill="currentColor" stroke="none" />
  <circle cx="105.1" cy="161.1" r="3" fill="currentColor" stroke="none" />
  <circle cx="214.9" cy="161.1" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="174" y="56.9">A</text>
    <text x="94.6" y="156.1">B</text>
    <text x="225.4" y="156.1">C</text>
    <text x="252.3" y="204.6" font-style="italic">x</text>
    <text x="117.1" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`כל קודקוד הוא נקודת החיתוך של שניים מהישרים.`,
          String.raw`חשבו את $AB$ ואת $AC$ בנוסחת המרחק.`,
          String.raw`הבסיס $BC$ מונח על הישר האופקי $y=1$, והגובה אליו הוא הפרש שיעורי ה-$y$.`,
        ],
        solutionSteps: [
          String.raw`א. $A$: $2x+1=-2x+9$, ולכן $x=2$ ו-$y=5$, כלומר $A(2,5)$.`,
          String.raw`$B$: $2x+1=1$, ולכן $x=0$ ו-$B(0,1)$. $C$: $-2x+9=1$, ולכן $x=4$ ו-$C(4,1)$.`,
          String.raw`ב. $AB=\sqrt{2^2+4^2}=\sqrt{20}$ ו-$AC=\sqrt{2^2+4^2}=\sqrt{20}$, ולכן $AB=AC$ והמשולש שווה שוקיים.`,
          String.raw`ג. הבסיס $BC$ על הישר $y=1$: $BC=4-0=4$, והגובה מ-$A$ אליו הוא $5-1=4$. $S=\frac{4\cdot4}{2}=8$.`,
        ],
        finalAnswer: String.raw`א. $A(2,5)$, $B(0,1)$, $C(4,1)$. ב. $AB=AC=\sqrt{20}$. ג. $S=8$.`,
        answers: [
          { label: String.raw`$x$ של $A$`, value: 2 },
          { label: String.raw`$y$ של $A$`, value: 5 },
          { label: 'שטח המשולש', value: 8 },
        ],
      },
      {
        id: 'ag-line-review-4',
        difficulty: 3,
        statement: String.raw`קודקודי המשולש $ABC$ הם $A(-4,0)$, $B(6,0)$ ו-$C(0,8)$ (ראו שרטוט).

א. מצאו את משוואת הגובה מהקודקוד $A$ לצלע $BC$.

ב. הגובה מהקודקוד $C$ לצלע $AB$ מונח על ציר ה-$y$. מצאו את נקודת המפגש $H$ של הגבהים.

ג. הראו שגם הישר $BH$ ניצב לצלע $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="34.8" y1="196.8" x2="287.2" y2="196.8" />
    <polyline points="280.2,192.8 287.2,196.8 280.2,200.8" />
    <line x1="140.8" y1="226" x2="140.8" y2="12" />
    <polyline points="136.8,19 140.8,12 144.8,19" />
  </g>
  <polygon points="64,196.8 256,196.8 140.8,43.2" />
  <line x1="64" y1="196.8" x2="186.9" y2="104.6" stroke-dasharray="6 4" stroke-width="1.5" />
  <polyline points="179.7,110 174.3,102.8 181.5,97.4" stroke-width="1" />
  <circle cx="64" cy="196.8" r="3" fill="currentColor" stroke="none" />
  <circle cx="256" cy="196.8" r="3" fill="currentColor" stroke="none" />
  <circle cx="140.8" cy="43.2" r="3" fill="currentColor" stroke="none" />
  <circle cx="140.8" cy="139.2" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="64" y="216.3">A</text>
    <text x="256" y="216.3">B</text>
    <text x="151.3" y="38.2">C</text>
    <text x="154.8" y="144.7">H</text>
    <text x="285.2" y="212.8" font-style="italic">x</text>
    <text x="152.8" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`הגובה מ-$A$ ניצב ל-$BC$ – שיפועו הופכי ונגדי לשיפוע $BC$.`,
          String.raw`הצלע $AB$ על ציר ה-$x$, ולכן הגובה מ-$C$ הוא הישר $x=0$. הציבו $x=0$ במשוואת הגובה מ-$A$.`,
          String.raw`חשבו את $m_{BH}$ ואת $m_{AC}$, ובדקו את מכפלתם.`,
        ],
        solutionSteps: [
          String.raw`א. $m_{BC}=\frac{8-0}{0-6}=-\frac43$, ולכן שיפוע הגובה מ-$A$ הוא $\frac34$: $y=\frac34(x+4)$, כלומר $y=\frac34x+3$.`,
          String.raw`ב. $AB$ על ציר ה-$x$, ולכן הגובה מ-$C$ ניצב לציר ה-$x$ ועובר דרך $C(0,8)$ – זה הישר $x=0$.`,
          String.raw`מציבים $x=0$ במשוואת הגובה מ-$A$: $y=3$. לכן $H(0,3)$.`,
          String.raw`ג. $m_{BH}=\frac{3-0}{0-6}=-\frac12$ ו-$m_{AC}=\frac{8-0}{0+4}=2$. $m_{BH}\cdot m_{AC}=-1$, ולכן $BH\perp AC$ – גם הגובה השלישי עובר דרך $H$.`,
        ],
        finalAnswer: String.raw`א. $y=\frac34x+3$. ב. $H(0,3)$. ג. $m_{BH}\cdot m_{AC}=-\frac12\cdot2=-1$.`,
        answers: [
          { label: 'השיפוע של הגובה מ-$A$', value: 0.75 },
          { label: String.raw`$n$ במשוואת הגובה מ-$A$`, value: 3 },
          { label: String.raw`$x$ של $H$`, value: 0 },
          { label: String.raw`$y$ של $H$`, value: 3 },
        ],
      },
      {
        id: 'ag-line-review-5',
        difficulty: 3,
        statement: String.raw`נתונות הנקודות $A(1,0)$ ו-$B(5,2)$ והישר $y=x+1$ (ראו שרטוט).

א. מצאו את משוואת האנך האמצעי לקטע $AB$.

ב. הנקודה $P$ נמצאת על הישר $y=x+1$, ומרחקה מ-$A$ שווה למרחקה מ-$B$. מצאו את $P$.

ג. חשבו את שטח המשולש $PAB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="38" y1="184" x2="284" y2="184" />
    <polyline points="277,180 284,184 277,188" />
    <line x1="80" y1="226" x2="80" y2="12" />
    <polyline points="76,19 80,12 84,19" />
  </g>
  <line x1="38.4" y1="193.6" x2="217.6" y2="14.4" stroke-width="1.5" />
  <line x1="112" y1="184" x2="240" y2="120" />
  <circle cx="112" cy="184" r="3" fill="currentColor" stroke="none" />
  <circle cx="240" cy="120" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="112" y="203.5">A</text>
    <text x="254" y="125.5">B</text>
    <text x="282" y="200" font-style="italic">x</text>
    <text x="92" y="18" font-style="italic">y</text>
    <text x="233.6" y="68.8">y = x + 1</text>
  </g>
</svg>`,
        hints: [
          String.raw`האנך האמצעי עובר דרך אמצע $AB$ וניצב לו.`,
          String.raw`כל נקודה שמרחקה מ-$A$ שווה למרחקה מ-$B$ נמצאת על האנך האמצעי; $P$ היא החיתוך שלו עם $y=x+1$.`,
          String.raw`במשולש שווה השוקיים $PAB$ הגובה לבסיס $AB$ הוא הקטע מ-$P$ לאמצע $AB$.`,
        ],
        solutionSteps: [
          String.raw`א. אמצע $AB$: $M(3,1)$. $m_{AB}=\frac{2-0}{5-1}=\frac12$, ולכן שיפוע האנך האמצעי $-2$: $y-1=-2(x-3)$, כלומר $y=-2x+7$.`,
          String.raw`ב. $PA=PB$, ולכן $P$ על האנך האמצעי. חיתוך עם $y=x+1$: $x+1=-2x+7$, ולכן $x=2$ ו-$y=3$. $P(2,3)$.`,
          String.raw`בדיקה: $PA=\sqrt{1^2+3^2}=\sqrt{10}$ ו-$PB=\sqrt{3^2+1^2}=\sqrt{10}$.`,
          String.raw`ג. $PM$ ניצב ל-$AB$ (הוא על האנך האמצעי), ולכן הוא הגובה לבסיס $AB$. $PM=\sqrt{(3-2)^2+(1-3)^2}=\sqrt5$ ו-$AB=\sqrt{4^2+2^2}=\sqrt{20}$.`,
          String.raw`$S=\frac{AB\cdot PM}{2}=\frac{\sqrt{20}\cdot\sqrt5}{2}=\frac{10}{2}=5$.`,
        ],
        finalAnswer: String.raw`א. $y=-2x+7$. ב. $P(2,3)$. ג. $S=5$.`,
        answers: [
          { label: String.raw`השיפוע של האנך האמצעי`, value: -2 },
          { label: String.raw`$n$ במשוואת האנך האמצעי`, value: 7 },
          { label: String.raw`$x$ של $P$`, value: 2 },
          { label: String.raw`$y$ של $P$`, value: 3 },
          { label: 'שטח המשולש', value: 5 },
        ],
      },
      {
        id: 'ag-line-review-6',
        difficulty: 3,
        statement: String.raw`$ABCD$ הוא ריבוע. נתון: $A(1,1)$ ו-$B(4,2)$, והקודקוד $C$ נמצא ברביע הראשון (ראו שרטוט).

א. מצאו את משוואת הישר $BC$.

ב. מצאו את שיעורי $C$.

ג. מצאו את שיעורי $D$, וחשבו את שטח הריבוע.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="54" y1="188.6" x2="268" y2="188.6" />
    <polyline points="261,184.6 268,188.6 261,192.6" />
    <line x1="91.4" y1="226" x2="91.4" y2="12" />
    <polyline points="87.4,19 91.4,12 95.4,19" />
  </g>
  <polygon points="118.9,161.1 201.1,133.7 173.7,51.4 91.4,78.9" />
  <circle cx="118.9" cy="161.1" r="3" fill="currentColor" stroke="none" />
  <circle cx="201.1" cy="133.7" r="3" fill="currentColor" stroke="none" />
  <circle cx="173.7" cy="51.4" r="3" fill="currentColor" stroke="none" />
  <circle cx="91.4" cy="78.9" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="108.4" y="177.1">A</text>
    <text x="215.1" y="139.2">B</text>
    <text x="184.2" y="46.4">C</text>
    <text x="77.4" y="84.4">D</text>
    <text x="266" y="204.6" font-style="italic">x</text>
    <text x="103.4" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`בריבוע $BC\perp AB$ ו-$BC=AB$.`,
          String.raw`הציבו נקודה כללית של הישר $BC$, $(x,\,-3x+14)$, בתנאי $BC^2=AB^2=10$.`,
          String.raw`את $D$ מוצאים בעזרת האלכסונים: בריבוע (כמו בכל מקבילית) הם חוצים זה את זה.`,
        ],
        solutionSteps: [
          String.raw`א. $m_{AB}=\frac{2-1}{4-1}=\frac13$, ולכן $m_{BC}=-3$: $y-2=-3(x-4)$, כלומר $y=-3x+14$.`,
          String.raw`ב. $AB^2=3^2+1^2=10$. נקודה על $BC$: $C(x,-3x+14)$, ו-$BC^2=(x-4)^2+(-3x+12)^2=(x-4)^2+9(x-4)^2=10(x-4)^2$.`,
          String.raw`$10(x-4)^2=10$, ולכן $x-4=\pm1$: $x=5$ או $x=3$. עבור $x=5$ מתקבל $C(5,-1)$ – לא ברביע הראשון. עבור $x=3$ מתקבל $C(3,5)$, ברביע הראשון.`,
          String.raw`ג. אמצע $AC$ הוא $(2,3)$, והוא גם אמצע $BD$: $D=(2\cdot2-4,\ 2\cdot3-2)=(0,4)$.`,
          String.raw`שטח הריבוע: $AB^2=10$.`,
        ],
        finalAnswer: String.raw`א. $y=-3x+14$. ב. $C(3,5)$. ג. $D(0,4)$; השטח $10$.`,
        answers: [
          { label: String.raw`$x$ של $C$`, value: 3 },
          { label: String.raw`$y$ של $C$`, value: 5 },
          { label: String.raw`$x$ של $D$`, value: 0 },
          { label: String.raw`$y$ של $D$`, value: 4 },
          { label: 'שטח הריבוע', value: 10 },
        ],
      },
    ],
  },
  'ag-circle-equation': {
    intro: String.raw`מעגל הוא אוסף כל הנקודות שמרחקן מנקודה קבועה (המרכז) שווה לרדיוס. מנוסחת המרחק מקבלים את משוואת המעגל $(x-a)^2+(y-b)^2=R^2$. בשיעור לומדים לקרוא מהמשוואה את המרכז ואת הרדיוס, להשלים לריבוע כשהמשוואה פתוחה, ולזהות מתי משוואה מהצורה $Ax^2+By^2+Cx+Dy+E=0$ מתארת מעגל. בשאלון 806 נדרש רק מעגל שמרכזו בראשית, $x^2+y^2=R^2$ (לצורך המעגל הטריגונומטרי); המעגל הכללי נדרש בשאלון 807, שאלה 1.`,
    keyFacts: [
      String.raw`**משוואת מעגל** שמרכזו $(a,b)$ ורדיוסו $R$: $(x-a)^2+(y-b)^2=R^2$. מעגל שמרכזו בראשית: $x^2+y^2=R^2$.`,
      String.raw`**שימו לב לסימנים**: $(x+2)^2+(y-5)^2=25$ הוא מעגל שמרכזו $(-2,5)$ ורדיוסו $5$ (ולא $25$).`,
      String.raw`**הצורה הפתוחה** $x^2+y^2+Cx+Dy+E=0$: משלימים לריבוע ומקבלים מרכז $\left(-\frac C2,-\frac D2\right)$ ו-$R^2=\frac{C^2}{4}+\frac{D^2}{4}-E$.`,
      String.raw`**מתי $Ax^2+By^2+Cx+Dy+E=0$ היא מעגל**: צריך $A=B\ne0$ (ואין איבר $xy$); מחלקים ב-$A$ ומשלימים לריבוע, ואגף ימין חייב להיות חיובי. אם הוא $0$ – זו נקודה אחת; אם הוא שלילי – אין אף נקודה.`,
      String.raw`**מיקום נקודה ביחס למעגל**: משווים את המרחק $d$ של הנקודה מהמרכז לרדיוס – $d<R$ בתוך המעגל, $d=R$ על המעגל, $d>R$ מחוץ למעגל.`,
      String.raw`**מעגל לפי קוטר $AB$**: המרכז הוא אמצע $AB$ והרדיוס $\frac{AB}{2}$. **מעגל דרך שלוש נקודות**: המרכז הוא נקודת המפגש של האנכים האמצעיים.`,
    ],
    exercises: [
      {
        id: 'ag-circle-equation-1',
        difficulty: 1,
        statement: String.raw`מצאו את המרכז ואת הרדיוס של המעגל $(x-3)^2+(y+1)^2=16$.`,
        hints: [String.raw`השוו לצורה $(x-a)^2+(y-b)^2=R^2$. שימו לב: $y+1=y-(-1)$.`],
        solutionSteps: [
          String.raw`נכתוב $(x-3)^2+(y-(-1))^2=4^2$.`,
          String.raw`לכן המרכז הוא $(3,-1)$ והרדיוס $R=\sqrt{16}=4$.`,
        ],
        finalAnswer: String.raw`מרכז $(3,-1)$, רדיוס $4$.`,
        answers: [
          { label: String.raw`$x$ של המרכז`, value: 3 },
          { label: String.raw`$y$ של המרכז`, value: -1 },
          { label: String.raw`רדיוס $R$`, value: 4 },
        ],
      },
      {
        id: 'ag-circle-equation-2',
        difficulty: 1,
        statement: String.raw`מצאו את משוואת המעגל שמרכזו $M(-2,5)$ והוא עובר דרך הנקודה $P(1,1)$.`,
        hints: [
          String.raw`הרדיוס הוא המרחק מהמרכז לנקודה שעל המעגל.`,
          String.raw`הציבו את המרכז ואת הרדיוס בצורה $(x-a)^2+(y-b)^2=R^2$.`,
        ],
        solutionSteps: [
          String.raw`$R=MP=\sqrt{(1+2)^2+(1-5)^2}=\sqrt{9+16}=5$.`,
          String.raw`משוואת המעגל: $(x+2)^2+(y-5)^2=25$.`,
        ],
        finalAnswer: String.raw`$(x+2)^2+(y-5)^2=25$`,
        answers: [{ label: String.raw`רדיוס $R$`, value: 5 }],
      },
      {
        id: 'ag-circle-equation-3',
        difficulty: 2,
        statement: String.raw`מצאו את המרכז ואת הרדיוס של המעגל $x^2+y^2-8x+6y-11=0$.`,
        hints: [
          String.raw`סדרו: $(x^2-8x)+(y^2+6y)=11$.`,
          String.raw`השלימו לריבוע: הוסיפו $16$ ו-$9$ לשני האגפים.`,
        ],
        solutionSteps: [
          String.raw`$(x^2-8x+16)+(y^2+6y+9)=11+16+9$.`,
          String.raw`$(x-4)^2+(y+3)^2=36$.`,
          String.raw`לכן המרכז $(4,-3)$ והרדיוס $6$.`,
        ],
        finalAnswer: String.raw`מרכז $(4,-3)$, רדיוס $6$.`,
        answers: [
          { label: String.raw`$x$ של המרכז`, value: 4 },
          { label: String.raw`$y$ של המרכז`, value: -3 },
          { label: String.raw`רדיוס $R$`, value: 6 },
        ],
      },
      {
        id: 'ag-circle-equation-4',
        difficulty: 2,
        statement: String.raw`נתונות הנקודות $A(-3,2)$ ו-$B(5,8)$. מצאו את משוואת המעגל שהקטע $AB$ הוא קוטר בו. קבעו אם הנקודה $P(4,9)$ נמצאת על המעגל, ואם הנקודה $Q(0,1)$ נמצאת בתוך המעגל או מחוצה לו.`,
        hints: [
          String.raw`המרכז הוא אמצע הקוטר, והרדיוס הוא מחצית אורכו.`,
          String.raw`השוו את המרחק של כל נקודה מהמרכז לרדיוס.`,
        ],
        solutionSteps: [
          String.raw`המרכז הוא אמצע $AB$: $M\left(\frac{-3+5}{2},\frac{2+8}{2}\right)=M(1,5)$.`,
          String.raw`$AB=\sqrt{8^2+6^2}=10$, ולכן $R=5$, והמשוואה $(x-1)^2+(y-5)^2=25$.`,
          String.raw`$P$: $(4-1)^2+(9-5)^2=9+16=25$, ולכן $P$ על המעגל.`,
          String.raw`$Q$: $(0-1)^2+(1-5)^2=1+16=17<25$, כלומר $MQ=\sqrt{17}<5$, ולכן $Q$ בתוך המעגל.`,
        ],
        finalAnswer: String.raw`$(x-1)^2+(y-5)^2=25$; $P$ על המעגל; $Q$ בתוך המעגל.`,
        answers: [
          { label: String.raw`$x$ של המרכז`, value: 1 },
          { label: String.raw`$y$ של המרכז`, value: 5 },
          { label: String.raw`רדיוס $R$`, value: 5 },
        ],
      },
      {
        id: 'ag-circle-equation-5',
        difficulty: 2,
        statement: String.raw`אחת מהמשוואות הבאות מתארת מעגל, והשנייה אינה מתארת מעגל:

(1) $2x^2+2y^2-4x+12y+2=0$

(2) $x^2+y^2+4x-2y+6=0$

קבעו איזו מהן מתארת מעגל, ומצאו את מרכזו ואת רדיוסו.`,
        hints: [
          String.raw`במשוואה (1) חלקו קודם ב-$2$, כדי שהמקדמים של $x^2$ ושל $y^2$ יהיו $1$.`,
          String.raw`בכל משוואה השלימו לריבוע ובדקו את הסימן של אגף ימין.`,
        ],
        solutionSteps: [
          String.raw`(1): מחלקים ב-$2$: $x^2+y^2-2x+6y+1=0$. השלמה לריבוע: $(x-1)^2+(y+3)^2=-1+1+9=9$.`,
          String.raw`אגף ימין חיובי, ולכן (1) היא מעגל שמרכזו $(1,-3)$ ורדיוסו $3$.`,
          String.raw`(2): השלמה לריבוע: $(x+2)^2+(y-1)^2=-6+4+1=-1$.`,
          String.raw`סכום של ריבועים אינו יכול להיות שלילי, ולכן אין נקודות שמקיימות את (2) – היא אינה מעגל.`,
        ],
        finalAnswer: String.raw`(1) היא מעגל שמרכזו $(1,-3)$ ורדיוסו $3$; (2) אינה מעגל (מתקבל $R^2=-1$).`,
        answers: [
          { label: String.raw`$x$ של המרכז`, value: 1 },
          { label: String.raw`$y$ של המרכז`, value: -3 },
          { label: String.raw`רדיוס $R$`, value: 3 },
        ],
      },
      {
        id: 'ag-circle-equation-6',
        difficulty: 2,
        statement: String.raw`נתונה המשוואה $x^2+y^2-6x+2y+k=0$.

א. לאילו ערכי $k$ המשוואה מתארת מעגל?

ב. מצאו את $k$ שעבורו רדיוס המעגל הוא $3$.

ג. מצאו את $k$ שעבורו המעגל עובר דרך ראשית הצירים.`,
        hints: [
          String.raw`השלימו לריבוע: $(x-3)^2+(y+1)^2=10-k$.`,
          String.raw`המשוואה מתארת מעגל כשאגף ימין חיובי, ואז $R^2=10-k$.`,
          String.raw`מעגל עובר דרך $(0,0)$ אם״ם הנקודה מקיימת את המשוואה.`,
        ],
        solutionSteps: [
          String.raw`$(x^2-6x+9)+(y^2+2y+1)=-k+9+1$, כלומר $(x-3)^2+(y+1)^2=10-k$.`,
          String.raw`א. מעגל אם״ם $10-k>0$, כלומר $k<10$.`,
          String.raw`ב. $R^2=10-k=9$, ולכן $k=1$.`,
          String.raw`ג. מציבים $(0,0)$ במשוואה: $0+0-0+0+k=0$, ולכן $k=0$ (ואז $R^2=10>0$, כך שזה אכן מעגל).`,
        ],
        finalAnswer: String.raw`א. $k<10$. ב. $k=1$. ג. $k=0$.`,
        answers: [
          { label: String.raw`$k$ בסעיף ב`, value: 1 },
          { label: String.raw`$k$ בסעיף ג`, value: 0 },
        ],
      },
      {
        id: 'ag-circle-equation-7',
        difficulty: 3,
        statement: String.raw`נתונה המשוואה $(a-1)x^2+(2a-5)y^2-6x+12y+6=0$. מצאו את $a$ שעבורו המשוואה מתארת מעגל, ומצאו את מרכז המעגל ואת רדיוסו.`,
        hints: [
          String.raw`כדי שזה יהיה מעגל, המקדמים של $x^2$ ושל $y^2$ חייבים להיות שווים (ושונים מ-$0$).`,
          String.raw`אחרי שמציבים את $a$, חלקו במקדם המשותף והשלימו לריבוע.`,
          String.raw`ודאו שאגף ימין שמתקבל חיובי.`,
        ],
        solutionSteps: [
          String.raw`תנאי הכרחי למעגל: $a-1=2a-5$, ולכן $a=4$. אז שני המקדמים שווים ל-$3\ne0$.`,
          String.raw`עבור $a=4$: $3x^2+3y^2-6x+12y+6=0$. מחלקים ב-$3$: $x^2+y^2-2x+4y+2=0$.`,
          String.raw`השלמה לריבוע: $(x-1)^2+(y+2)^2=-2+1+4=3$.`,
          String.raw`אגף ימין חיובי, ולכן זהו מעגל שמרכזו $(1,-2)$ ורדיוסו $\sqrt3\approx1.73$.`,
        ],
        finalAnswer: String.raw`$a=4$; מרכז $(1,-2)$, רדיוס $\sqrt3$.`,
        answers: [
          { label: String.raw`$a$`, value: 4 },
          { label: String.raw`$x$ של המרכז`, value: 1 },
          { label: String.raw`$y$ של המרכז`, value: -2 },
          { label: String.raw`רדיוס $R$`, value: Math.sqrt(3) },
        ],
      },
      {
        id: 'ag-circle-equation-8',
        difficulty: 3,
        statement: String.raw`מצאו את משוואת המעגל העובר דרך הנקודות $A(1,1)$, $B(7,1)$ ו-$C(1,9)$ (ראו שרטוט), ובדקו אם הנקודה $D(8,8)$ נמצאת על המעגל.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="62.7" y1="198.5" x2="259.3" y2="198.5" />
    <polyline points="252.3,194.5 259.3,198.5 252.3,202.5" />
    <line x1="90.2" y1="226" x2="90.2" y2="12" />
    <polyline points="86.2,19 90.2,12 94.2,19" />
  </g>
  <polygon points="107.6,181.1 212.4,181.1 107.6,41.5" />
  <circle cx="107.6" cy="181.1" r="3" fill="currentColor" stroke="none" />
  <circle cx="212.4" cy="181.1" r="3" fill="currentColor" stroke="none" />
  <circle cx="107.6" cy="41.5" r="3" fill="currentColor" stroke="none" />
  <circle cx="229.8" cy="58.9" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="97.1" y="197.1">A</text>
    <text x="222.9" y="197.1">B</text>
    <text x="118.1" y="36.5">C</text>
    <text x="243.8" y="64.4">D</text>
    <text x="257.3" y="214.5" font-style="italic">x</text>
    <text x="102.2" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`מרכז המעגל נמצא במרחקים שווים משלוש הנקודות, ולכן הוא על האנכים האמצעיים של $AB$ ושל $AC$.`,
          String.raw`$AB$ אופקי ו-$AC$ אנכי, ולכן האנכים האמצעיים שלהם הם $x=4$ ו-$y=5$.`,
          String.raw`דרך נוספת: הזווית $A$ ישרה, ולכן $BC$ הוא קוטר (זווית היקפית בת $90^\circ$ נשענת על קוטר).`,
        ],
        solutionSteps: [
          String.raw`האנך האמצעי ל-$AB$ (קטע אופקי מ-$x=1$ עד $x=7$) הוא $x=4$.`,
          String.raw`האנך האמצעי ל-$AC$ (קטע אנכי מ-$y=1$ עד $y=9$) הוא $y=5$.`,
          String.raw`מרכז המעגל הוא נקודת המפגש שלהם: $M(4,5)$. הרדיוס: $R=MA=\sqrt{3^2+4^2}=5$.`,
          String.raw`משוואת המעגל: $(x-4)^2+(y-5)^2=25$. (בדיקה: $M$ היא אמצע $BC$, בהתאם לכך ש-$\angle BAC=90^\circ$.)`,
          String.raw`$D(8,8)$: $(8-4)^2+(8-5)^2=16+9=25$, ולכן $D$ על המעגל.`,
        ],
        finalAnswer: String.raw`$(x-4)^2+(y-5)^2=25$; הנקודה $D$ נמצאת על המעגל.`,
        answers: [
          { label: String.raw`$x$ של המרכז`, value: 4 },
          { label: String.raw`$y$ של המרכז`, value: 5 },
          { label: String.raw`רדיוס $R$`, value: 5 },
        ],
      },
    ],
  },
  'ag-circle-tangent': {
    intro: String.raw`משיק למעגל הוא ישר שיש לו נקודה משותפת אחת בלבד עם המעגל. התכונה המרכזית: המשיק ניצב לרדיוס בנקודת ההשקה. לכן, כדי למצוא את המשיק בנקודה $P$ שעל המעגל, מחשבים את שיפוע הרדיוס $MP$, לוקחים את השיפוע ההופכי והנגדי, ומציבים את $P$. בשיעור עוסקים רק במשיק בנקודה שעל המעגל (לא במשיק מנקודה שמחוץ למעגל), כפי שנדרש בשאלון 807, שאלה 1. בשאלון 806 הנושא אינו נדרש.`,
    keyFacts: [
      String.raw`**משיק ורדיוס**: המשיק למעגל ניצב לרדיוס בנקודת ההשקה.`,
      String.raw`**השיטה**: מוצאים את המרכז $M(a,b)$; בודקים שהנקודה $P(x_0,y_0)$ על המעגל; מחשבים $m_r=\frac{y_0-b}{x_0-a}$; שיפוע המשיק $m=-\frac{1}{m_r}$; משוואת המשיק $y-y_0=m(x-x_0)$.`,
      String.raw`**מקרי קצה**: אם הרדיוס אופקי ($y_0=b$) המשיק אנכי, $x=x_0$; אם הרדיוס אנכי ($x_0=a$) המשיק אופקי, $y=y_0$.`,
      String.raw`**משיקים בקצות קוטר** מקבילים זה לזה. **שני משיקים** בשתי נקודות של המעגל נפגשים בנקודה שנמצאת במרחקים שווים משתי נקודות ההשקה.`,
      String.raw`**משיק בעל שיפוע נתון** $m$: הרדיוס לנקודת ההשקה ניצב למשיק, ולכן נקודות ההשקה הן נקודות החיתוך של המעגל עם הישר דרך המרכז בשיפוע $-\frac1m$.`,
    ],
    exercises: [
      {
        id: 'ag-circle-tangent-1',
        difficulty: 1,
        statement: String.raw`הנקודה $A(-3,4)$ נמצאת על המעגל $x^2+y^2=25$. מצאו את משוואת המשיק למעגל בנקודה $A$.`,
        hints: [
          String.raw`מרכז המעגל הוא $O(0,0)$. חשבו את שיפוע הרדיוס $OA$.`,
          String.raw`המשיק ניצב לרדיוס, ולכן שיפועו הופכי ונגדי לשיפוע $OA$.`,
        ],
        solutionSteps: [
          String.raw`בדיקה: $(-3)^2+4^2=25$, ולכן $A$ על המעגל.`,
          String.raw`שיפוע הרדיוס: $m_{OA}=\frac{4-0}{-3-0}=-\frac43$.`,
          String.raw`המשיק ניצב לרדיוס בנקודת ההשקה, ולכן שיפועו $\frac34$.`,
          String.raw`$y-4=\frac34(x+3)$, כלומר $y=\frac34x+6.25$.`,
        ],
        finalAnswer: String.raw`$y=\frac34x+6.25$`,
        answers: [
          { label: String.raw`השיפוע $m$`, value: 0.75 },
          { label: String.raw`$n$ במשוואה $y=mx+n$`, value: 6.25 },
        ],
      },
      {
        id: 'ag-circle-tangent-2',
        difficulty: 1,
        statement: String.raw`נתון המעגל $(x-2)^2+(y+1)^2=9$. מצאו את משוואת המשיק למעגל בנקודה $A(5,-1)$, ואת משוואת המשיק בנקודה $B(2,2)$.`,
        hints: [
          String.raw`מרכז המעגל $M(2,-1)$. איך נראה הרדיוס $MA$? ואיך נראה הרדיוס $MB$?`,
          String.raw`משיק לרדיוס אופקי הוא ישר אנכי, ומשיק לרדיוס אנכי הוא ישר אופקי.`,
        ],
        solutionSteps: [
          String.raw`מרכז המעגל $M(2,-1)$ ורדיוסו $3$. שתי הנקודות על המעגל: $MA=|5-2|=3$ ו-$MB=|2-(-1)|=3$.`,
          String.raw`ל-$M$ ול-$A$ אותו שיעור $y$, ולכן הרדיוס $MA$ אופקי, והמשיק ב-$A$, שניצב לו, הוא הישר האנכי $x=5$.`,
          String.raw`ל-$M$ ול-$B$ אותו שיעור $x$, ולכן הרדיוס $MB$ אנכי, והמשיק ב-$B$ הוא הישר האופקי $y=2$.`,
        ],
        finalAnswer: String.raw`המשיק ב-$A$: $x=5$; המשיק ב-$B$: $y=2$.`,
        answers: [
          { label: String.raw`$k$ במשיק ב-$A$, $x=k$`, value: 5 },
          { label: String.raw`$k$ במשיק ב-$B$, $y=k$`, value: 2 },
        ],
      },
      {
        id: 'ag-circle-tangent-3',
        difficulty: 2,
        statement: String.raw`הראו שהנקודה $A(3,6)$ נמצאת על המעגל $(x-1)^2+(y-2)^2=20$, ומצאו את משוואת המשיק למעגל בנקודה $A$.`,
        hints: [
          String.raw`הציבו את $A$ במשוואת המעגל.`,
          String.raw`המשיק ניצב לרדיוס $MA$, כאשר $M(1,2)$ הוא המרכז.`,
        ],
        solutionSteps: [
          String.raw`$(3-1)^2+(6-2)^2=4+16=20$, ולכן $A$ על המעגל.`,
          String.raw`מרכז המעגל $M(1,2)$. שיפוע הרדיוס: $m_{MA}=\frac{6-2}{3-1}=2$.`,
          String.raw`המשיק ניצב לרדיוס בנקודת ההשקה, ולכן שיפועו $-\frac12$.`,
          String.raw`$y-6=-\frac12(x-3)$, כלומר $y=-\frac12x+7.5$.`,
        ],
        finalAnswer: String.raw`$y=-\frac12x+7.5$`,
        answers: [
          { label: String.raw`השיפוע $m$`, value: -0.5 },
          { label: String.raw`$n$ במשוואה $y=mx+n$`, value: 7.5 },
        ],
      },
      {
        id: 'ag-circle-tangent-4',
        difficulty: 2,
        statement: String.raw`נתון המעגל $x^2+y^2+4x-6y-12=0$. הנקודה $A$ נמצאת על המעגל, שיעור ה-$x$ שלה הוא $1$, ושיעור ה-$y$ שלה קטן מ-$3$. מצאו את $A$, ומצאו את משוואת המשיק למעגל בנקודה $A$.`,
        hints: [
          String.raw`השלימו לריבוע כדי למצוא את המרכז ואת הרדיוס.`,
          String.raw`הציבו $x=1$ במשוואת המעגל, ובחרו את הפתרון שבו $y<3$.`,
          String.raw`שיפוע המשיק הוא ההופכי והנגדי של שיפוע הרדיוס לנקודה $A$.`,
        ],
        solutionSteps: [
          String.raw`השלמה לריבוע: $(x+2)^2+(y-3)^2=12+4+9=25$. המרכז $M(-2,3)$ והרדיוס $5$.`,
          String.raw`מציבים $x=1$: $9+(y-3)^2=25$, ולכן $(y-3)^2=16$, כלומר $y=7$ או $y=-1$. לפי הנתון $y<3$, ולכן $A(1,-1)$.`,
          String.raw`שיפוע הרדיוס: $m_{MA}=\frac{-1-3}{1-(-2)}=-\frac43$, ולכן שיפוע המשיק $\frac34$.`,
          String.raw`$y+1=\frac34(x-1)$, כלומר $y=\frac34x-1.75$.`,
        ],
        finalAnswer: String.raw`$A(1,-1)$; המשיק $y=\frac34x-1.75$.`,
        answers: [
          { label: String.raw`$y$ של $A$`, value: -1 },
          { label: String.raw`השיפוע $m$`, value: 0.75 },
          { label: String.raw`$n$ במשוואה $y=mx+n$`, value: -1.75 },
        ],
      },
      {
        id: 'ag-circle-tangent-5',
        difficulty: 2,
        statement: String.raw`המשיק למעגל $x^2+y^2=20$ בנקודה $A(2,4)$ חותך את ציר ה-$x$ בנקודה $B$ ואת ציר ה-$y$ בנקודה $C$ (ראו שרטוט). מצאו את משוואת המשיק, וחשבו את שטח המשולש $BOC$, כאשר $O$ היא ראשית הצירים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="14" y1="128.5" x2="308" y2="128.5" />
    <polyline points="301,124.5 308,128.5 301,132.5" />
    <line x1="109" y1="223.5" x2="109" y2="14.5" />
    <polyline points="105,21.5 109,14.5 113,21.5" />
  </g>
  <line x1="64.8" y1="21.4" x2="301.1" y2="139.6" stroke-width="1.5" />
  <circle cx="109" cy="128.5" r="76" stroke-width="1.8" />
  <circle cx="143" cy="60.5" r="3" fill="currentColor" stroke="none" />
  <circle cx="279" cy="128.5" r="3" fill="currentColor" stroke="none" />
  <circle cx="109" cy="43.5" r="3" fill="currentColor" stroke="none" />
  <circle cx="109" cy="128.5" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="153.5" y="55.5">A</text>
    <text x="279" y="148">B</text>
    <text x="119.5" y="38.5">C</text>
    <text x="98.5" y="144.5">O</text>
    <text x="306" y="144.5" font-style="italic">x</text>
    <text x="121" y="20.5" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`שיפוע הרדיוס $OA$ הוא $2$.`,
          String.raw`מצאו את נקודות החיתוך של המשיק עם הצירים.`,
          String.raw`המשולש $BOC$ ישר זווית ב-$O$.`,
        ],
        solutionSteps: [
          String.raw`$2^2+4^2=20$, ולכן $A$ על המעגל. שיפוע הרדיוס $OA$ הוא $\frac42=2$, ולכן שיפוע המשיק $-\frac12$.`,
          String.raw`$y-4=-\frac12(x-2)$, כלומר $y=-\frac12x+5$.`,
          String.raw`חיתוך עם ציר ה-$x$: $0=-\frac12x+5$, ולכן $B(10,0)$. חיתוך עם ציר ה-$y$: $C(0,5)$.`,
          String.raw`$S_{BOC}=\frac{OB\cdot OC}{2}=\frac{10\cdot5}{2}=25$.`,
        ],
        finalAnswer: String.raw`המשיק $y=-\frac12x+5$; $S_{BOC}=25$.`,
        answers: [
          { label: String.raw`השיפוע $m$`, value: -0.5 },
          { label: String.raw`$n$ במשוואה $y=mx+n$`, value: 5 },
          { label: String.raw`שטח המשולש $BOC$`, value: 25 },
        ],
      },
      {
        id: 'ag-circle-tangent-6',
        difficulty: 2,
        statement: String.raw`נתון המעגל $(x-1)^2+y^2=25$ שמרכזו $M$. הנקודות $A$ ו-$B$ נמצאות על המעגל, ושיעור ה-$x$ של כל אחת מהן הוא $4$ ($A$ מעל ציר ה-$x$). המשיקים למעגל ב-$A$ וב-$B$ נפגשים בנקודה $P$ (ראו שרטוט). מצאו את משוואת המשיק ב-$A$, ומצאו את שיעורי $P$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="23.5" y1="120" x2="298.5" y2="120" />
    <polyline points="291.5,116 298.5,120 291.5,124" />
    <line x1="112" y1="226" x2="112" y2="12" />
    <polyline points="108,19 112,12 116,19" />
  </g>
  <line x1="139.9" y1="18.8" x2="291.8" y2="132.7" stroke-width="1.5" />
  <line x1="139.9" y1="221.2" x2="291.8" y2="107.3" stroke-width="1.5" />
  <circle cx="129.5" cy="120" r="87.3" stroke-width="1.8" />
  <line x1="129.5" y1="120" x2="181.8" y2="50.2" stroke-dasharray="6 4" stroke-width="1.5" />
  <line x1="129.5" y1="120" x2="181.8" y2="189.8" stroke-dasharray="6 4" stroke-width="1.5" />
  <circle cx="181.8" cy="50.2" r="3" fill="currentColor" stroke="none" />
  <circle cx="181.8" cy="189.8" r="3" fill="currentColor" stroke="none" />
  <circle cx="274.9" cy="120" r="3" fill="currentColor" stroke="none" />
  <circle cx="129.5" cy="120" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="181.8" y="41.7">A</text>
    <text x="181.8" y="209.3">B</text>
    <text x="274.9" y="111.5">P</text>
    <text x="129.5" y="139.5">M</text>
    <text x="296.5" y="136" font-style="italic">x</text>
    <text x="124" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`הציבו $x=4$ במשוואת המעגל.`,
          String.raw`המרכז $M(1,0)$, והמשיק ב-$A$ ניצב ל-$MA$.`,
          String.raw`מצאו באותה דרך את המשיק ב-$B$, ופתרו את מערכת שתי המשוואות.`,
        ],
        solutionSteps: [
          String.raw`$x=4$: $9+y^2=25$, ולכן $y=\pm4$: $A(4,4)$ ו-$B(4,-4)$.`,
          String.raw`המרכז $M(1,0)$. $m_{MA}=\frac{4-0}{4-1}=\frac43$, ולכן שיפוע המשיק ב-$A$ הוא $-\frac34$: $y-4=-\frac34(x-4)$, כלומר $y=-\frac34x+7$.`,
          String.raw`$m_{MB}=\frac{-4-0}{4-1}=-\frac43$, ולכן שיפוע המשיק ב-$B$ הוא $\frac34$: $y+4=\frac34(x-4)$, כלומר $y=\frac34x-7$.`,
          String.raw`$P$: $-\frac34x+7=\frac34x-7$, ולכן $\frac32x=14$, $x=\frac{28}{3}$ ו-$y=0$. $P\left(\frac{28}{3},0\right)$.`,
          String.raw`(כצפוי, $P$ על ציר ה-$x$ – ציר הסימטריה של השרטוט, שעובר דרך המרכז.)`,
        ],
        finalAnswer: String.raw`המשיק ב-$A$: $y=-\frac34x+7$; $P\left(\frac{28}{3},0\right)$.`,
        answers: [
          { label: String.raw`השיפוע של המשיק ב-$A$`, value: -0.75 },
          { label: String.raw`$n$ במשוואת המשיק ב-$A$`, value: 7 },
          { label: String.raw`$x$ של $P$`, value: 28 / 3 },
          { label: String.raw`$y$ של $P$`, value: 0 },
        ],
      },
      {
        id: 'ag-circle-tangent-7',
        difficulty: 3,
        statement: String.raw`נתון המעגל $(x-3)^2+(y-1)^2=10$ שמרכזו $M$, והנקודות $A(4,4)$ ו-$B(0,2)$ (ראו שרטוט).

א. הראו ש-$A$ ו-$B$ נמצאות על המעגל.

ב. מצאו את משוואות המשיקים למעגל ב-$A$ וב-$B$, ואת נקודת המפגש שלהם $P$.

ג. הוכיחו שהמרובע $PAMB$ הוא ריבוע, וחשבו את שטחו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="64.7" y1="162.7" x2="257.3" y2="162.7" />
    <polyline points="250.3,158.7 257.3,162.7 250.3,166.7" />
    <line x1="96" y1="226" x2="96" y2="12" />
    <polyline points="92,19 96,12 100,19" />
  </g>
  <line x1="68.3" y1="39.6" x2="251.7" y2="100.8" stroke-width="1.5" />
  <line x1="68.3" y1="203.2" x2="130.1" y2="17.6" stroke-width="1.5" />
  <circle cx="160" cy="141.3" r="67.5" stroke-width="1.8" />
  <line x1="160" y1="141.3" x2="181.3" y2="77.3" stroke-dasharray="6 4" stroke-width="1.5" />
  <line x1="160" y1="141.3" x2="96" y2="120" stroke-dasharray="6 4" stroke-width="1.5" />
  <circle cx="181.3" cy="77.3" r="3" fill="currentColor" stroke="none" />
  <circle cx="96" cy="120" r="3" fill="currentColor" stroke="none" />
  <circle cx="160" cy="141.3" r="3" fill="currentColor" stroke="none" />
  <circle cx="117.3" cy="56" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="191.8" y="72.3">A</text>
    <text x="85.5" y="115">B</text>
    <text x="160" y="160.8">M</text>
    <text x="104.2" y="66.3">P</text>
    <text x="255.3" y="178.7" font-style="italic">x</text>
    <text x="108" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`הציבו כל נקודה במשוואת המעגל.`,
          String.raw`לכל משיק: מחשבים את שיפוע הרדיוס, ולוקחים שיפוע הופכי ונגדי.`,
          String.raw`ב-$PAMB$ הזוויות $A$ ו-$B$ ישרות (משיק ורדיוס). בדקו גם את הזווית $M$ ואת אורכי הצלעות.`,
        ],
        solutionSteps: [
          String.raw`א. $(4-3)^2+(4-1)^2=1+9=10$ ו-$(0-3)^2+(2-1)^2=9+1=10$, ולכן שתי הנקודות על המעגל.`,
          String.raw`ב. $M(3,1)$. $m_{MA}=\frac{4-1}{4-3}=3$, ולכן המשיק ב-$A$: $y-4=-\frac13(x-4)$, כלומר $y=-\frac13x+\frac{16}{3}$.`,
          String.raw`$m_{MB}=\frac{2-1}{0-3}=-\frac13$, ולכן המשיק ב-$B$ בשיפוע $3$: $y-2=3x$, כלומר $y=3x+2$.`,
          String.raw`$P$: $3x+2=-\frac13x+\frac{16}{3}$, ולכן $\frac{10}{3}x=\frac{10}{3}$, $x=1$ ו-$y=5$. $P(1,5)$.`,
          String.raw`ג. $\angle PAM=\angle PBM=90^\circ$ (משיק ניצב לרדיוס בנקודת ההשקה), ו-$m_{MA}\cdot m_{MB}=3\cdot\left(-\frac13\right)=-1$, ולכן גם $\angle AMB=90^\circ$. מרובע עם שלוש זוויות ישרות הוא מלבן.`,
          String.raw`$MA=MB=\sqrt{10}$ (רדיוסים), כלומר במלבן יש שתי צלעות סמוכות שוות – הוא ריבוע. (בדיקה: $PA=\sqrt{3^2+1^2}=\sqrt{10}$.) שטחו $\left(\sqrt{10}\right)^2=10$.`,
        ],
        finalAnswer: String.raw`ב. $y=-\frac13x+\frac{16}{3}$ ו-$y=3x+2$; $P(1,5)$. ג. ריבוע שצלעו $\sqrt{10}$; השטח $10$.`,
        answers: [
          { label: String.raw`$x$ של $P$`, value: 1 },
          { label: String.raw`$y$ של $P$`, value: 5 },
          { label: String.raw`שטח $PAMB$`, value: 10 },
        ],
      },
      {
        id: 'ag-circle-tangent-8',
        difficulty: 3,
        statement: String.raw`נתון המעגל $(x-2)^2+(y-1)^2=5$ והישר $y=2x+7$ (ראו שרטוט). מצאו את הנקודות שעל המעגל שבהן המשיק למעגל מקביל לישר הנתון, ואת משוואות המשיקים האלה.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="42" y1="168" x2="280" y2="168" />
    <polyline points="273,164 280,168 273,172" />
    <line x1="148" y1="226" x2="148" y2="12" />
    <polyline points="144,19 148,12 152,19" />
  </g>
  <line x1="44.8" y1="206.4" x2="139.6" y2="16.8" stroke-width="1.5" />
  <circle cx="196" cy="144" r="53.7" stroke-width="1.8" />
  <circle cx="196" cy="144" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="196" y="163.5">M</text>
    <text x="278" y="184" font-style="italic">x</text>
    <text x="160" y="18" font-style="italic">y</text>
    <text x="78.4" y="33.6">y = 2x + 7</text>
  </g>
</svg>`,
        hints: [
          String.raw`שיפוע המשיקים המבוקשים הוא $2$. הרדיוס לנקודת ההשקה ניצב למשיק, ולכן שיפועו $-\frac12$.`,
          String.raw`נקודות ההשקה הן נקודות החיתוך של המעגל עם הישר העובר דרך המרכז בשיפוע $-\frac12$.`,
          String.raw`הציבו $y=-\frac12x+2$ במשוואת המעגל.`,
        ],
        solutionSteps: [
          String.raw`המרכז $M(2,1)$. משיק בשיפוע $2$ ניצב לרדיוס בנקודת ההשקה, ולכן הרדיוס הזה בשיפוע $-\frac12$, והוא נמצא על הישר $y-1=-\frac12(x-2)$, כלומר $y=-\frac12x+2$.`,
          String.raw`הצבה במשוואת המעגל: $(x-2)^2+\left(-\frac12x+1\right)^2=5$. מאחר ש-$-\frac12x+1=-\frac12(x-2)$, מקבלים $\frac54(x-2)^2=5$, כלומר $(x-2)^2=4$.`,
          String.raw`$x=4$ או $x=0$, ולכן נקודות ההשקה הן $T_1(4,0)$ ו-$T_2(0,2)$.`,
          String.raw`המשיק ב-$T_1$: $y=2(x-4)$, כלומר $y=2x-8$. המשיק ב-$T_2$: $y-2=2x$, כלומר $y=2x+2$.`,
          String.raw`בדיקה: אמצע $T_1T_2$ הוא $(2,1)=M$, כלומר $T_1T_2$ קוטר, והמשיקים בקצות קוטר אכן מקבילים.`,
        ],
        finalAnswer: String.raw`נקודות ההשקה $(4,0)$ ו-$(0,2)$; המשיקים $y=2x-8$ ו-$y=2x+2$.`,
        answers: [
          { label: String.raw`$x$ של נקודת ההשקה הימנית`, value: 4 },
          { label: String.raw`$n$ של המשיק בנקודה הימנית ($y=2x+n$)`, value: -8 },
          { label: String.raw`$x$ של נקודת ההשקה השמאלית`, value: 0 },
          { label: String.raw`$n$ של המשיק בנקודה השמאלית ($y=2x+n$)`, value: 2 },
        ],
      },
    ],
  },
  'ag-line-more': {
    intro: String.raw`תרגילים נוספים על קטעים וישרים, ברמה של שאלה 4 בשאלון 806. מופיעים כאן רעיונות שחוזרים בבגרות: שיקוף של נקודה ביחס לישר, מלבן וריבוע שנבנים מתנאי ניצבות, טרפז שגובהו מחושב בעזרת עקב האנך, נקודה על ציר שממנה רואים קטע בזווית ישרה, ומשולש שווה שוקיים שבו הגובה לבסיס הוא גם תיכון. בכל תרגיל: סקיצה, תרגום הנתונים לשיפועים, למרחקים ולאמצעים, ובדיקה בסוף.`,
    keyFacts: [
      String.raw`**שיקוף נקודה $P$ ביחס לישר**: מוצאים את עקב האנך $H$ מ-$P$ לישר. $H$ היא אמצע הקטע $PP'$, ולכן $x_{P'}=2x_H-x_P$ ו-$y_{P'}=2y_H-y_P$.`,
      String.raw`**מלבן וריבוע**: צלעות סמוכות ניצבות ($m_1m_2=-1$); בריבוע הן גם שוות באורכן.`,
      String.raw`**גובה של טרפז או של משולש** כשהבסיס אינו מקביל לציר: מוצאים את עקב האנך מהקודקוד לבסיס, ומחשבים את אורך האנך בנוסחת המרחק.`,
      String.raw`**זווית ישרה בנקודה לא ידועה** $P$: $m_{PA}\cdot m_{PB}=-1$ – מתקבלת משוואה (לעיתים ריבועית) בשיעור הלא ידוע.`,
      String.raw`**משולש שווה שוקיים**: הגובה לבסיס הוא גם תיכון, ולכן עקב הגובה הוא אמצע הבסיס.`,
    ],
    exercises: [
      {
        id: 'ag-line-more-1',
        difficulty: 2,
        statement: String.raw`נתונים הישר $y=2x$ והנקודה $P(5,0)$ (ראו שרטוט).

א. מצאו את עקב האנך $H$ מהנקודה $P$ לישר.

ב. מצאו את הנקודה $P'$, השיקוף של $P$ ביחס לישר (כלומר הישר $y=2x$ הוא האנך האמצעי של $PP'$).

ג. הראו ש-$OP=OP'$, כאשר $O$ היא ראשית הצירים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="14" y1="174.4" x2="308" y2="174.4" />
    <polyline points="301,170.4 308,174.4 301,178.4" />
    <line x1="132.8" y1="211.6" x2="132.8" y2="26.4" />
    <polyline points="128.8,33.4 132.8,26.4 136.8,33.4" />
  </g>
  <line x1="115.1" y1="209.8" x2="204.9" y2="30.2" stroke-width="1.5" />
  <line x1="268.8" y1="174.4" x2="51.2" y2="65.6" stroke-dasharray="6 4" stroke-width="1.5" />
  <polyline points="168,124 172.1,116 164,112" stroke-width="1" />
  <circle cx="268.8" cy="174.4" r="3" fill="currentColor" stroke="none" />
  <circle cx="160" cy="120" r="3" fill="currentColor" stroke="none" />
  <circle cx="51.2" cy="65.6" r="3" fill="currentColor" stroke="none" />
  <circle cx="132.8" cy="174.4" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="268.8" y="193.9">P</text>
    <text x="160" y="111.5">H</text>
    <text x="37.2" y="71.1">P′</text>
    <text x="143.3" y="190.4">O</text>
    <text x="306" y="190.4" font-style="italic">x</text>
    <text x="144.8" y="32.4" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`האנך מ-$P$ ניצב לישר $y=2x$, ולכן שיפועו $-\frac12$.`,
          String.raw`$H$ היא אמצע הקטע $PP'$.`,
          String.raw`הישר $y=2x$ עובר דרך $O$, ולכן $O$ על האנך האמצעי של $PP'$.`,
        ],
        solutionSteps: [
          String.raw`א. האנך מ-$P$: $y=-\frac12(x-5)$, כלומר $y=-\frac12x+2.5$. חיתוך עם $y=2x$: $2x=-\frac12x+2.5$, ולכן $x=1$ ו-$y=2$. $H(1,2)$.`,
          String.raw`ב. $H$ היא אמצע $PP'$: $P'=(2\cdot1-5,\ 2\cdot2-0)=(-3,4)$.`,
          String.raw`ג. $OP=5$ ו-$OP'=\sqrt{(-3)^2+4^2}=5$, ולכן $OP=OP'$ – כמצופה, כי $O$ נמצאת על הישר $y=2x$, שהוא האנך האמצעי של $PP'$.`,
        ],
        finalAnswer: String.raw`א. $H(1,2)$. ב. $P'(-3,4)$. ג. $OP=OP'=5$.`,
        answers: [
          { label: String.raw`$x$ של $H$`, value: 1 },
          { label: String.raw`$y$ של $H$`, value: 2 },
          { label: String.raw`$x$ של $P'$`, value: -3 },
          { label: String.raw`$y$ של $P'$`, value: 4 },
        ],
      },
      {
        id: 'ag-line-more-2',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא מלבן. נתון: $A(-1,2)$ ו-$B(3,0)$, והקודקוד $C$ נמצא על הישר $y=x-1$ (ראו שרטוט).

א. מצאו את משוואת הישר $BC$.

ב. מצאו את שיעורי $C$ ואת שיעורי $D$.

ג. הראו שהמלבן הוא ריבוע, וחשבו את שטחו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="54" y1="192" x2="268" y2="192" />
    <polyline points="261,188 268,192 261,196" />
    <line x1="112" y1="226" x2="112" y2="12" />
    <polyline points="108,19 112,12 116,19" />
  </g>
  <line x1="104.8" y1="223.2" x2="263.2" y2="64.8" stroke-width="1.5" stroke-dasharray="6 4" />
  <polygon points="88,144 184,192 232,96 136,48" />
  <circle cx="88" cy="144" r="3" fill="currentColor" stroke="none" />
  <circle cx="184" cy="192" r="3" fill="currentColor" stroke="none" />
  <circle cx="232" cy="96" r="3" fill="currentColor" stroke="none" />
  <circle cx="136" cy="48" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="74" y="149.5">A</text>
    <text x="184" y="211.5">B</text>
    <text x="246" y="101.5">C</text>
    <text x="136" y="39.5">D</text>
    <text x="266" y="208" font-style="italic">x</text>
    <text x="124" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`במלבן $BC\perp AB$.`,
          String.raw`$C$ היא נקודת החיתוך של $BC$ עם $y=x-1$. את $D$ מוצאים בעזרת האלכסונים, שחוצים זה את זה.`,
          String.raw`מלבן שבו שתי צלעות סמוכות שוות הוא ריבוע.`,
        ],
        solutionSteps: [
          String.raw`א. $m_{AB}=\frac{0-2}{3-(-1)}=-\frac12$, ולכן $m_{BC}=2$: $y=2(x-3)$, כלומר $y=2x-6$.`,
          String.raw`ב. $C$: $2x-6=x-1$, ולכן $x=5$ ו-$y=4$. $C(5,4)$.`,
          String.raw`אמצע $AC$ הוא $(2,3)$, והוא גם אמצע $BD$: $D=(2\cdot2-3,\ 2\cdot3-0)=(1,6)$.`,
          String.raw`ג. $AB=\sqrt{4^2+2^2}=\sqrt{20}$ ו-$BC=\sqrt{2^2+4^2}=\sqrt{20}$. במלבן יש שתי צלעות סמוכות שוות, ולכן הוא ריבוע.`,
          String.raw`שטח הריבוע: $AB^2=20$.`,
        ],
        finalAnswer: String.raw`א. $y=2x-6$. ב. $C(5,4)$, $D(1,6)$. ג. $AB=BC=\sqrt{20}$; השטח $20$.`,
        answers: [
          { label: String.raw`$x$ של $C$`, value: 5 },
          { label: String.raw`$y$ של $C$`, value: 4 },
          { label: String.raw`$x$ של $D$`, value: 1 },
          { label: String.raw`$y$ של $D$`, value: 6 },
          { label: 'שטח הריבוע', value: 20 },
        ],
      },
      {
        id: 'ag-line-more-3',
        difficulty: 2,
        statement: String.raw`הישר $\ell:\ y=-\frac12x+4$ חותך את ציר ה-$x$ בנקודה $A$ ואת ציר ה-$y$ בנקודה $B$. הישר העובר דרך $B$ וניצב ל-$\ell$ חותך את ציר ה-$x$ בנקודה $C$ (ראו שרטוט).

א. מצאו את $A$, $B$ ו-$C$.

ב. חשבו את שטח המשולש $ABC$.

ג. הראו ש-$AB^2+BC^2=AC^2$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="14" y1="165.3" x2="308" y2="165.3" />
    <polyline points="301,161.3 308,165.3 301,169.3" />
    <line x1="92" y1="198" x2="92" y2="40" />
    <polyline points="88,47 92,40 96,47" />
  </g>
  <line x1="33.1" y1="45.2" x2="302.8" y2="180.1" stroke-width="1.5" />
  <line x1="31.9" y1="194.8" x2="106.7" y2="45.2" stroke-width="1.5" />
  <polyline points="100,78.7 96,86.7 88,82.7" stroke-width="1" />
  <circle cx="273.3" cy="165.3" r="3" fill="currentColor" stroke="none" />
  <circle cx="92" cy="74.7" r="3" fill="currentColor" stroke="none" />
  <circle cx="46.7" cy="165.3" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="273.3" y="184.8">A</text>
    <text x="105.2" y="75.4">B</text>
    <text x="46.7" y="184.8">C</text>
    <text x="306" y="181.3" font-style="italic">x</text>
    <text x="104" y="46" font-style="italic">y</text>
    <text x="216.7" y="106.4">ℓ</text>
  </g>
</svg>`,
        hints: [
          String.raw`הישר הניצב ל-$\ell$ הוא בשיפוע $2$, והוא עובר דרך $B$.`,
          String.raw`הבסיס $AC$ נמצא על ציר ה-$x$, והגובה אליו הוא $OB$.`,
          String.raw`חשבו את ריבועי האורכים בנוסחת המרחק.`,
        ],
        solutionSteps: [
          String.raw`א. $A$: $0=-\frac12x+4$, ולכן $A(8,0)$. $B$: $x=0$ נותן $B(0,4)$.`,
          String.raw`הישר הניצב ל-$\ell$ דרך $B$: שיפועו $2$, ולכן $y=2x+4$. חיתוך עם ציר ה-$x$: $x=-2$, ולכן $C(-2,0)$.`,
          String.raw`ב. $AC=8-(-2)=10$, והגובה מ-$B$ לציר ה-$x$ הוא $4$: $S=\frac{10\cdot4}{2}=20$.`,
          String.raw`ג. $AB^2=8^2+4^2=80$, $BC^2=2^2+4^2=20$ ו-$AC^2=10^2=100$. אכן $80+20=100$, בהתאם לכך ש-$\angle ABC=90^\circ$.`,
        ],
        finalAnswer: String.raw`א. $A(8,0)$, $B(0,4)$, $C(-2,0)$. ב. $S=20$. ג. $80+20=100$.`,
        answers: [
          { label: String.raw`$x$ של $C$`, value: -2 },
          { label: String.raw`שטח המשולש $ABC$`, value: 20 },
        ],
      },
      {
        id: 'ag-line-more-4',
        difficulty: 3,
        statement: String.raw`$ABCD$ הוא טרפז ($AB\parallel DC$). נתון: $A(1,1)$, $B(9,5)$, $D(0,4)$, ו-$DC=\frac12AB$, כאשר $C$ נמצא מימין ל-$D$ (ראו שרטוט).

א. מצאו את שיעורי $C$.

ב. מצאו את עקב האנך $H$ מ-$D$ לישר $AB$, וחשבו את גובה הטרפז $DH$.

ג. חשבו את שטח הטרפז.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="18" y1="192" x2="304" y2="192" />
    <polyline points="297,188 304,192 297,196" />
    <line x1="52" y1="226" x2="52" y2="12" />
    <polyline points="48,19 52,12 56,19" />
  </g>
  <polygon points="76,168 268,72 148,48 52,96" />
  <line x1="52" y1="96" x2="85.6" y2="163.2" stroke-dasharray="6 4" stroke-width="1.5" />
  <polyline points="81.6,155.2 89.6,151.1 93.6,159.2" stroke-width="1" />
  <circle cx="76" cy="168" r="3" fill="currentColor" stroke="none" />
  <circle cx="268" cy="72" r="3" fill="currentColor" stroke="none" />
  <circle cx="148" cy="48" r="3" fill="currentColor" stroke="none" />
  <circle cx="52" cy="96" r="3" fill="currentColor" stroke="none" />
  <circle cx="85.6" cy="163.2" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="65.5" y="184">A</text>
    <text x="282" y="77.5">B</text>
    <text x="148" y="39.5">C</text>
    <text x="38" y="101.5">D</text>
    <text x="96.1" y="179.2">H</text>
    <text x="302" y="208" font-style="italic">x</text>
    <text x="64" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`$DC\parallel AB$ ו-$DC=\frac12AB$, ולכן המעבר מ-$D$ ל-$C$ הוא מחצית המעבר מ-$A$ ל-$B$.`,
          String.raw`$H$ היא נקודת החיתוך של הישר $AB$ עם האנך אליו מ-$D$.`,
          String.raw`שטח טרפז: $\frac{(AB+DC)\cdot h}{2}$.`,
        ],
        solutionSteps: [
          String.raw`א. המעבר מ-$A$ ל-$B$ הוא $8$ ימינה ו-$4$ למעלה. $DC$ באותו כיוון ובחצי האורך: $C=(0+4,\ 4+2)=(4,6)$. בדיקה: $m_{DC}=\frac{6-4}{4-0}=\frac12=m_{AB}$.`,
          String.raw`ב. הישר $AB$: $y-1=\frac12(x-1)$, כלומר $y=\frac12x+\frac12$. האנך מ-$D$ בשיפוע $-2$: $y=-2x+4$.`,
          String.raw`$H$: $\frac12x+\frac12=-2x+4$, ולכן $2.5x=3.5$, $x=1.4$ ו-$y=1.2$. $H(1.4,\,1.2)$.`,
          String.raw`$DH=\sqrt{1.4^2+(1.2-4)^2}=\sqrt{1.96+7.84}=\sqrt{9.8}\approx3.13$.`,
          String.raw`ג. $AB=\sqrt{80}=4\sqrt5$, $DC=\sqrt{20}=2\sqrt5$ ו-$DH=\sqrt{9.8}=\frac{7}{\sqrt5}$. לכן $S=\frac{4\sqrt5+2\sqrt5}{2}\cdot\frac{7}{\sqrt5}=3\sqrt5\cdot\frac{7}{\sqrt5}=21$.`,
        ],
        finalAnswer: String.raw`א. $C(4,6)$. ב. $H(1.4,\,1.2)$, $DH=\sqrt{9.8}\approx3.13$. ג. $S=21$.`,
        answers: [
          { label: String.raw`$x$ של $C$`, value: 4 },
          { label: String.raw`$y$ של $C$`, value: 6 },
          { label: String.raw`$x$ של $H$`, value: 1.4 },
          { label: String.raw`$y$ של $H$`, value: 1.2 },
          { label: String.raw`גובה הטרפז $DH$`, value: Math.sqrt(9.8) },
          { label: 'שטח הטרפז', value: 21 },
        ],
      },
      {
        id: 'ag-line-more-5',
        difficulty: 3,
        statement: String.raw`נתונות הנקודות $A(1,4)$ ו-$B(7,2)$. מצאו את הנקודות $P$ שעל ציר ה-$x$ שעבורן $\angle APB=90^\circ$. עבור איזו מהן המשולש $APB$ הוא גם שווה שוקיים? חשבו את שטחו של המשולש הזה.`,
        hints: [
          String.raw`סמנו $P(x,0)$ ודרשו $m_{PA}\cdot m_{PB}=-1$.`,
          String.raw`$\frac{4}{1-x}\cdot\frac{2}{7-x}=-1$ מוביל למשוואה ריבועית.`,
          String.raw`בכל אחת מהנקודות השוו את $PA$ ל-$PB$.`,
        ],
        solutionSteps: [
          String.raw`נסמן $P(x,0)$, כאשר $x\ne1$ ו-$x\ne7$. $m_{PA}=\frac{4-0}{1-x}$ ו-$m_{PB}=\frac{2-0}{7-x}$.`,
          String.raw`$\angle APB=90^\circ$ אם״ם $\frac{4}{1-x}\cdot\frac{2}{7-x}=-1$, כלומר $8=-(1-x)(7-x)$, ולכן $x^2-8x+15=0$.`,
          String.raw`$(x-3)(x-5)=0$, ולכן $P_1(3,0)$ או $P_2(5,0)$.`,
          String.raw`$P_1$: $P_1A=\sqrt{2^2+4^2}=\sqrt{20}$ ו-$P_1B=\sqrt{4^2+2^2}=\sqrt{20}$ – המשולש שווה שוקיים. $P_2$: $P_2A=\sqrt{32}$ ו-$P_2B=\sqrt8$ – לא.`,
          String.raw`שטח המשולש $AP_1B$ (ישר זווית ב-$P_1$): $\frac{\sqrt{20}\cdot\sqrt{20}}{2}=10$.`,
        ],
        finalAnswer: String.raw`$P(3,0)$ או $P(5,0)$; עבור $P(3,0)$ המשולש ישר זווית ושווה שוקיים, ושטחו $10$.`,
        answers: [
          { label: String.raw`$x$ של $P$ (הערך הקטן)`, value: 3 },
          { label: String.raw`$x$ של $P$ (הערך הגדול)`, value: 5 },
          { label: 'שטח המשולש שווה השוקיים', value: 10 },
        ],
      },
      {
        id: 'ag-line-more-6',
        difficulty: 3,
        statement: String.raw`במשולש שווה השוקיים $ABC$ ($AB=AC$) הבסיס $BC$ מונח על הישר $y=\frac12x+1$. נתון: $A(4,8)$ ו-$B(2,2)$ (ראו שרטוט).

א. מצאו את עקב הגובה $M$ מהקודקוד $A$ לבסיס.

ב. מצאו את שיעורי $C$.

ג. חשבו את שטח המשולש.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="34.8" y1="196.8" x2="287.2" y2="196.8" />
    <polyline points="280.2,192.8 287.2,196.8 280.2,200.8" />
    <line x1="64" y1="226" x2="64" y2="12" />
    <polyline points="60,19 64,12 68,19" />
  </g>
  <polygon points="140.8,43.2 102.4,158.4 256,81.6" />
  <line x1="140.8" y1="43.2" x2="179.2" y2="120" stroke-dasharray="6 4" stroke-width="1.5" />
  <polyline points="175.2,112 183.2,107.9 187.2,116" stroke-width="1" />
  <circle cx="140.8" cy="43.2" r="3" fill="currentColor" stroke="none" />
  <circle cx="102.4" cy="158.4" r="3" fill="currentColor" stroke="none" />
  <circle cx="256" cy="81.6" r="3" fill="currentColor" stroke="none" />
  <circle cx="179.2" cy="120" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="140.8" y="34.7">A</text>
    <text x="91.9" y="174.4">B</text>
    <text x="270" y="87.1">C</text>
    <text x="189.7" y="136">M</text>
    <text x="285.2" y="212.8" font-style="italic">x</text>
    <text x="76" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`הגובה מ-$A$ ניצב לבסיס, ולכן שיפועו $-2$.`,
          String.raw`במשולש שווה שוקיים הגובה לבסיס הוא גם תיכון, ולכן $M$ היא אמצע $BC$.`,
          String.raw`$S=\frac{BC\cdot AM}{2}$.`,
        ],
        solutionSteps: [
          String.raw`א. הגובה מ-$A$: $y-8=-2(x-4)$, כלומר $y=-2x+16$. חיתוך עם הבסיס: $\frac12x+1=-2x+16$, ולכן $2.5x=15$, $x=6$ ו-$y=4$. $M(6,4)$.`,
          String.raw`ב. במשולש שווה שוקיים הגובה לבסיס הוא גם תיכון, ולכן $M$ אמצע $BC$: $C=(2\cdot6-2,\ 2\cdot4-2)=(10,6)$.`,
          String.raw`בדיקה: $AB=\sqrt{2^2+6^2}=\sqrt{40}$ ו-$AC=\sqrt{6^2+2^2}=\sqrt{40}$.`,
          String.raw`ג. $BC=\sqrt{8^2+4^2}=\sqrt{80}$ ו-$AM=\sqrt{2^2+4^2}=\sqrt{20}$. $S=\frac{\sqrt{80}\cdot\sqrt{20}}{2}=\frac{40}{2}=20$.`,
        ],
        finalAnswer: String.raw`א. $M(6,4)$. ב. $C(10,6)$. ג. $S=20$.`,
        answers: [
          { label: String.raw`$x$ של $M$`, value: 6 },
          { label: String.raw`$y$ של $M$`, value: 4 },
          { label: String.raw`$x$ של $C$`, value: 10 },
          { label: String.raw`$y$ של $C$`, value: 6 },
          { label: 'שטח המשולש', value: 20 },
        ],
      },
    ],
  },
  'ag-circle-more': {
    intro: String.raw`תרגילים מסכמים על המעגל, ברמה של שאלה 1 בשאלון 807: מעגל כללי (השלמה לריבוע, מעגל דרך נקודות, מעגל שמרכזו על ישר נתון), התנאי שמשוואה מתארת מעגל, ומשיק בנקודה שעל המעגל. כמו בבגרות, כל תרגיל משלב כמה צעדים – חיתוך של מעגל עם ישר או עם ציר, אורך של מיתר ומרחקו מהמרכז, ומשיקים. המשיקים כאן הם תמיד משיקים בנקודה שעל המעגל.`,
    keyFacts: [
      String.raw`**מרכז ורדיוס**: $(x-a)^2+(y-b)^2=R^2$; מצורה פתוחה – השלמה לריבוע. המשוואה $Ax^2+Ay^2+Cx+Dy+E=0$ היא מעגל רק אם אחרי החלוקה ב-$A$ וההשלמה לריבוע אגף ימין חיובי.`,
      String.raw`**מרכז על ישר נתון**: מסמנים את המרכז בעזרת פרמטר אחד (למשל $(t,0)$ על ציר ה-$x$), ודורשים שהמרחקים מהמרכז לנקודות הנתונות יהיו שווים.`,
      String.raw`**משיק בנקודה $P$ שעל המעגל** ניצב לרדיוס $MP$. ולהפך: אם ישר משיק למעגל בנקודה $T$, המרכז נמצא על הישר הניצב למשיק ב-$T$.`,
      String.raw`**חיתוך מעגל וישר**: מציבים את משוואת הישר במשוואת המעגל ופותרים משוואה ריבועית.`,
      String.raw`**מיתר**: האנך מהמרכז למיתר חוצה אותו, ולכן המרחק מהמרכז למיתר הוא המרחק מהמרכז לאמצע המיתר. המשיקים בקצות מיתר נפגשים על הישר העובר דרך המרכז ודרך אמצע המיתר.`,
      String.raw`**מעגל דרך שלוש נקודות**: מציבים אותן בצורה $x^2+y^2+Cx+Dy+E=0$ ופותרים מערכת, או מוצאים את נקודת המפגש של האנכים האמצעיים.`,
    ],
    exercises: [
      {
        id: 'ag-circle-more-1',
        difficulty: 2,
        statement: String.raw`נתון המעגל $x^2+y^2-2x-6y-15=0$.

א. מצאו את מרכז המעגל ואת רדיוסו.

ב. מצאו את נקודות החיתוך של המעגל עם ציר ה-$x$.

ג. מצאו את משוואת המשיק למעגל בנקודת החיתוך שלו עם החלק החיובי של ציר ה-$x$.`,
        hints: [
          String.raw`השלימו לריבוע: הוסיפו $1$ ו-$9$ לשני האגפים.`,
          String.raw`על ציר ה-$x$ מתקיים $y=0$.`,
          String.raw`חשבו את שיפוע הרדיוס לנקודה $(5,0)$, וקחו שיפוע הופכי ונגדי.`,
        ],
        solutionSteps: [
          String.raw`א. $(x^2-2x+1)+(y^2-6y+9)=15+1+9$, כלומר $(x-1)^2+(y-3)^2=25$. המרכז $M(1,3)$ והרדיוס $5$.`,
          String.raw`ב. $y=0$: $x^2-2x-15=0$, כלומר $(x-5)(x+3)=0$. נקודות החיתוך: $(5,0)$ ו-$(-3,0)$.`,
          String.raw`ג. הנקודה היא $A(5,0)$. שיפוע הרדיוס $MA$: $\frac{0-3}{5-1}=-\frac34$, ולכן שיפוע המשיק $\frac43$.`,
          String.raw`$y-0=\frac43(x-5)$, כלומר $y=\frac43x-\frac{20}{3}$.`,
        ],
        finalAnswer: String.raw`א. $M(1,3)$, $R=5$. ב. $(5,0)$ ו-$(-3,0)$. ג. $y=\frac43x-\frac{20}{3}$.`,
        answers: [
          { label: String.raw`$x$ של המרכז`, value: 1 },
          { label: String.raw`$y$ של המרכז`, value: 3 },
          { label: String.raw`רדיוס $R$`, value: 5 },
          { label: String.raw`השיפוע של המשיק`, value: 4 / 3 },
          { label: String.raw`$n$ במשוואת המשיק ($y=mx+n$)`, value: -20 / 3 },
        ],
      },
      {
        id: 'ag-circle-more-2',
        difficulty: 2,
        statement: String.raw`מרכז מעגל נמצא על ציר ה-$x$, והמעגל עובר דרך הנקודות $A(1,3)$ ו-$B(5,1)$.

א. מצאו את משוואת המעגל.

ב. מצאו את משוואת המשיק למעגל בנקודה $A$.`,
        hints: [
          String.raw`סמנו את המרכז $M(t,0)$ ודרשו $MA^2=MB^2$.`,
          String.raw`האיבר $t^2$ מצטמצם ומתקבלת משוואה ממעלה ראשונה.`,
          String.raw`המשיק ב-$A$ ניצב לרדיוס $MA$.`,
        ],
        solutionSteps: [
          String.raw`א. נסמן $M(t,0)$: $MA^2=(t-1)^2+9$ ו-$MB^2=(t-5)^2+1$.`,
          String.raw`$(t-1)^2+9=(t-5)^2+1$, כלומר $t^2-2t+10=t^2-10t+26$, ולכן $8t=16$ ו-$t=2$. $M(2,0)$.`,
          String.raw`$R^2=MA^2=1+9=10$, ולכן המעגל: $(x-2)^2+y^2=10$.`,
          String.raw`ב. שיפוע הרדיוס $MA$: $\frac{3-0}{1-2}=-3$, ולכן שיפוע המשיק $\frac13$: $y-3=\frac13(x-1)$, כלומר $y=\frac13x+\frac83$.`,
        ],
        finalAnswer: String.raw`א. $(x-2)^2+y^2=10$. ב. $y=\frac13x+\frac83$.`,
        answers: [
          { label: String.raw`$x$ של המרכז`, value: 2 },
          { label: String.raw`רדיוס $R$`, value: Math.sqrt(10) },
          { label: String.raw`השיפוע של המשיק`, value: 1 / 3 },
          { label: String.raw`$n$ במשוואת המשיק ($y=mx+n$)`, value: 8 / 3 },
        ],
      },
      {
        id: 'ag-circle-more-3',
        difficulty: 2,
        statement: String.raw`הישר $y=2x+1$ משיק למעגל בנקודה $T(1,3)$, ומרכז המעגל נמצא על ציר ה-$x$ (ראו שרטוט). מצאו את מרכז המעגל ואת רדיוסו, וכתבו את משוואת המעגל.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="50.8" y1="120" x2="271.2" y2="120" />
    <polyline points="264.2,116 271.2,120 264.2,124" />
    <line x1="73.6" y1="226" x2="73.6" y2="12" />
    <polyline points="69.6,19 73.6,12 77.6,19" />
  </g>
  <line x1="57" y1="140.5" x2="117.1" y2="20.2" stroke-width="1.5" />
  <circle cx="163.2" cy="120" r="85.9" stroke-width="1.8" />
  <line x1="163.2" y1="120" x2="86.4" y2="81.6" stroke-dasharray="6 4" stroke-width="1.5" />
  <polyline points="94.4,85.6 98.5,77.6 90.4,73.6" stroke-width="1" />
  <circle cx="86.4" cy="81.6" r="3" fill="currentColor" stroke="none" />
  <circle cx="163.2" cy="120" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="91.2" y="100.3">T</text>
    <text x="163.2" y="139.5">M</text>
    <text x="269.2" y="136" font-style="italic">x</text>
    <text x="85.6" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`הרדיוס $MT$ ניצב למשיק בנקודת ההשקה.`,
          String.raw`מצאו את הישר העובר דרך $T$ וניצב למשיק – המרכז נמצא עליו.`,
          String.raw`המרכז הוא נקודת החיתוך של הישר הזה עם ציר ה-$x$.`,
        ],
        solutionSteps: [
          String.raw`בדיקה: $2\cdot1+1=3$, ולכן $T$ על הישר.`,
          String.raw`הרדיוס $MT$ ניצב למשיק, ששיפועו $2$, ולכן $MT$ נמצא על הישר דרך $T$ בשיפוע $-\frac12$: $y-3=-\frac12(x-1)$, כלומר $y=-\frac12x+3.5$.`,
          String.raw`המרכז על ציר ה-$x$: $0=-\frac12x+3.5$, ולכן $x=7$ ו-$M(7,0)$.`,
          String.raw`$R=MT=\sqrt{(7-1)^2+(0-3)^2}=\sqrt{45}=3\sqrt5\approx6.71$.`,
          String.raw`משוואת המעגל: $(x-7)^2+y^2=45$.`,
        ],
        finalAnswer: String.raw`מרכז $(7,0)$, רדיוס $\sqrt{45}=3\sqrt5$; המעגל $(x-7)^2+y^2=45$.`,
        answers: [
          { label: String.raw`$x$ של המרכז`, value: 7 },
          { label: String.raw`רדיוס $R$`, value: Math.sqrt(45) },
        ],
      },
      {
        id: 'ag-circle-more-4',
        difficulty: 3,
        statement: String.raw`נתונה המשוואה $x^2+y^2+2kx-4y+2k+7=0$.

א. לאילו ערכי $k$ המשוואה מתארת מעגל?

ב. מצאו את ערכי $k$ שעבורם רדיוס המעגל הוא $\sqrt5$.

ג. עבור הערך החיובי של $k$ מסעיף ב: הראו שהנקודה $P(-2,3)$ נמצאת על המעגל, ומצאו את משוואת המשיק למעגל ב-$P$.`,
        hints: [
          String.raw`השלימו לריבוע: $(x+k)^2+(y-2)^2=k^2-2k-3$.`,
          String.raw`המשוואה מתארת מעגל אם״ם אגף ימין חיובי: $k^2-2k-3>0$ – אי-שוויון ריבועי.`,
          String.raw`בסעיף ג המרכז הוא $(-k,2)$, והמשיק ניצב לרדיוס.`,
        ],
        solutionSteps: [
          String.raw`$(x^2+2kx+k^2)+(y^2-4y+4)=k^2+4-2k-7$, כלומר $(x+k)^2+(y-2)^2=k^2-2k-3$.`,
          String.raw`א. מעגל אם״ם $k^2-2k-3>0$, כלומר $(k-3)(k+1)>0$: $k<-1$ או $k>3$.`,
          String.raw`ב. $k^2-2k-3=5$, כלומר $k^2-2k-8=0$ ו-$(k-4)(k+2)=0$: $k=4$ או $k=-2$. שני הערכים מקיימים את התנאי מסעיף א.`,
          String.raw`ג. עבור $k=4$: $(x+4)^2+(y-2)^2=5$. הצבת $P$: $(-2+4)^2+(3-2)^2=4+1=5$, ולכן $P$ על המעגל.`,
          String.raw`המרכז $M(-4,2)$. שיפוע הרדיוס $MP$: $\frac{3-2}{-2+4}=\frac12$, ולכן שיפוע המשיק $-2$: $y-3=-2(x+2)$, כלומר $y=-2x-1$.`,
        ],
        finalAnswer: String.raw`א. $k<-1$ או $k>3$. ב. $k=4$ או $k=-2$. ג. $y=-2x-1$.`,
        answers: [
          { label: String.raw`$k$ בסעיף ב (הערך הגדול)`, value: 4 },
          { label: String.raw`$k$ בסעיף ב (הערך הקטן)`, value: -2 },
          { label: String.raw`השיפוע של המשיק`, value: -2 },
          { label: String.raw`$n$ במשוואת המשיק ($y=mx+n$)`, value: -1 },
        ],
      },
      {
        id: 'ag-circle-more-5',
        difficulty: 3,
        statement: String.raw`נתונים המעגל $(x+1)^2+(y-3)^2=20$ שמרכזו $M$, והישר $y=x+2$ (ראו שרטוט).

א. מצאו את נקודות החיתוך $A$ ו-$B$ של הישר עם המעגל ($A$ – הנקודה ששיעור ה-$x$ שלה חיובי).

ב. חשבו את אורך המיתר $AB$, ואת המרחק של המרכז $M$ מהמיתר.

ג. המשיקים למעגל ב-$A$ וב-$B$ נפגשים בנקודה $P$. מצאו את $P$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="54" y1="120" x2="268" y2="120" />
    <polyline points="261,116 268,120 261,124" />
    <line x1="136" y1="226" x2="136" y2="12" />
    <polyline points="132,19 136,12 140,19" />
  </g>
  <line x1="60.4" y1="171.6" x2="211.6" y2="20.4" stroke-width="1.5" />
  <circle cx="124" cy="84" r="53.7" stroke-width="1.8" />
  <line x1="172" y1="60" x2="244" y2="204" />
  <line x1="100" y1="132" x2="244" y2="204" />
  <circle cx="172" cy="60" r="3" fill="currentColor" stroke="none" />
  <circle cx="100" cy="132" r="3" fill="currentColor" stroke="none" />
  <circle cx="124" cy="84" r="3" fill="currentColor" stroke="none" />
  <circle cx="244" cy="204" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="172" y="51.5">A</text>
    <text x="86" y="137.5">B</text>
    <text x="124" y="75.5">M</text>
    <text x="258" y="209.5">P</text>
    <text x="266" y="136" font-style="italic">x</text>
    <text x="148" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`הציבו $y=x+2$ במשוואת המעגל.`,
          String.raw`המרחק מהמרכז למיתר הוא המרחק מהמרכז לאמצע המיתר (האנך מהמרכז למיתר חוצה אותו).`,
          String.raw`מצאו את שני המשיקים (כל אחד ניצב לרדיוס שלו) ופתרו את מערכת המשוואות.`,
        ],
        solutionSteps: [
          String.raw`א. $(x+1)^2+(x+2-3)^2=20$, כלומר $(x+1)^2+(x-1)^2=20$, ולכן $2x^2+2=20$ ו-$x=\pm3$. $A(3,5)$ ו-$B(-3,-1)$.`,
          String.raw`ב. $AB=\sqrt{6^2+6^2}=\sqrt{72}=6\sqrt2\approx8.49$.`,
          String.raw`אמצע המיתר: $K(0,2)$. $m_{MK}=\frac{2-3}{0+1}=-1$ ו-$m_{AB}=1$, ולכן $MK\perp AB$, והמרחק של $M$ מהמיתר הוא $MK=\sqrt{1^2+1^2}=\sqrt2$.`,
          String.raw`ג. $M(-1,3)$. $m_{MA}=\frac{5-3}{3+1}=\frac12$, ולכן המשיק ב-$A$: $y-5=-2(x-3)$, כלומר $y=-2x+11$.`,
          String.raw`$m_{MB}=\frac{-1-3}{-3+1}=2$, ולכן המשיק ב-$B$: $y+1=-\frac12(x+3)$, כלומר $y=-\frac12x-2.5$.`,
          String.raw`$P$: $-2x+11=-\frac12x-2.5$, ולכן $1.5x=13.5$, $x=9$ ו-$y=-7$. $P(9,-7)$. בדיקה: $P$ על הישר $MK$, שמשוואתו $y=-x+2$.`,
        ],
        finalAnswer: String.raw`א. $A(3,5)$, $B(-3,-1)$. ב. $AB=6\sqrt2\approx8.49$; המרחק $\sqrt2$. ג. $P(9,-7)$.`,
        answers: [
          { label: String.raw`אורך המיתר $AB$`, value: Math.sqrt(72) },
          { label: String.raw`המרחק של $M$ מהמיתר`, value: Math.SQRT2 },
          { label: String.raw`$x$ של $P$`, value: 9 },
          { label: String.raw`$y$ של $P$`, value: -7 },
        ],
      },
      {
        id: 'ag-circle-more-6',
        difficulty: 3,
        statement: String.raw`נתונות הנקודות $K(2,6)$, $L(-4,-2)$ ו-$N(3,-1)$ (ראו שרטוט).

א. מצאו את משוואת המעגל העובר דרך שלוש הנקודות, ואת מרכזו ורדיוסו.

ב. הראו ש-$KL$ הוא קוטר במעגל, והסיקו מהו גודל הזווית $KNL$.

ג. מצאו את משוואות המשיקים למעגל ב-$K$ וב-$L$, והראו שהם מקבילים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="49.6" y1="154.9" x2="272.4" y2="154.9" />
    <polyline points="265.4,150.9 272.4,154.9 265.4,158.9" />
    <line x1="173.1" y1="226" x2="173.1" y2="12" />
    <polyline points="169.1,19 173.1,12 177.1,19" />
  </g>
  <circle cx="155.6" cy="120" r="87.3" stroke-width="1.8" stroke-dasharray="6 4" />
  <polygon points="208,50.2 225.5,172.4 103.3,189.8" />
  <circle cx="208" cy="50.2" r="3" fill="currentColor" stroke="none" />
  <circle cx="103.3" cy="189.8" r="3" fill="currentColor" stroke="none" />
  <circle cx="225.5" cy="172.4" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="218.5" y="45.2">K</text>
    <text x="92.8" y="205.8">L</text>
    <text x="236" y="188.4">N</text>
    <text x="270.4" y="170.9" font-style="italic">x</text>
    <text x="185.1" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`הציבו את שלוש הנקודות במשוואה $x^2+y^2+Cx+Dy+E=0$ – מתקבלת מערכת של שלוש משוואות ליניאריות.`,
          String.raw`בדקו אם המרכז הוא אמצע $KL$. זווית היקפית הנשענת על קוטר היא ישרה.`,
          String.raw`משיק ניצב לרדיוס; לרדיוסים $MK$ ו-$ML$ אותו שיפוע.`,
        ],
        solutionSteps: [
          String.raw`א. הצבה: $K$: $40+2C+6D+E=0$; $L$: $20-4C-2D+E=0$; $N$: $10+3C-D+E=0$.`,
          String.raw`חיסור המשוואה של $L$ מזו של $K$: $20+6C+8D=0$. חיסור המשוואה של $N$ מזו של $K$: $30-C+7D=0$, כלומר $C=30+7D$. הצבה: $20+180+42D+8D=0$, ולכן $D=-4$, $C=2$, ומהמשוואה של $K$: $E=-40-4+24=-20$.`,
          String.raw`המעגל: $x^2+y^2+2x-4y-20=0$, כלומר $(x+1)^2+(y-2)^2=25$. המרכז $M(-1,2)$ והרדיוס $5$.`,
          String.raw`ב. אמצע $KL$ הוא $\left(\frac{2-4}{2},\frac{6-2}{2}\right)=(-1,2)=M$, ולכן $KL$ קוטר. $\angle KNL$ היא זווית היקפית הנשענת על קוטר, ולכן $\angle KNL=90^\circ$.`,
          String.raw`בדיקה: $m_{NK}=\frac{6+1}{2-3}=-7$ ו-$m_{NL}=\frac{-2+1}{-4-3}=\frac17$, ומכפלתם $-1$.`,
          String.raw`ג. $m_{MK}=\frac{6-2}{2+1}=\frac43$, ולכן המשיק ב-$K$: $y-6=-\frac34(x-2)$, כלומר $y=-\frac34x+7.5$. $m_{ML}=\frac{-2-2}{-4+1}=\frac43$, ולכן המשיק ב-$L$: $y+2=-\frac34(x+4)$, כלומר $y=-\frac34x-5$.`,
          String.raw`לשני המשיקים אותו שיפוע, $-\frac34$, ולכן הם מקבילים (משיקים בקצות קוטר).`,
        ],
        finalAnswer: String.raw`א. $x^2+y^2+2x-4y-20=0$: מרכז $(-1,2)$, רדיוס $5$. ב. $\angle KNL=90^\circ$. ג. $y=-\frac34x+7.5$ ו-$y=-\frac34x-5$ – מקבילים.`,
        answers: [
          { label: String.raw`$x$ של המרכז`, value: -1 },
          { label: String.raw`$y$ של המרכז`, value: 2 },
          { label: String.raw`רדיוס $R$`, value: 5 },
          { label: String.raw`$n$ במשוואת המשיק ב-$K$`, value: 7.5 },
          { label: String.raw`$n$ במשוואת המשיק ב-$L$`, value: -5 },
        ],
      },
    ],
  },
  'ag-self-practice': {
    intro: String.raw`תרגילים לעבודה עצמית בהיקף של שאלון 806: קטעים (מרחק ואמצע), ישרים (משוואה, הקבלה, ניצבות וחיתוך) ומעגל שמרכזו בראשית הצירים, $x^2+y^2=R^2$. מעגל כזה הוא הבסיס למעגל היחידה בטריגונומטריה – כל נקודה עליו היא $(R\cos\alpha,R\sin\alpha)$. התרגילים משלבים כמה כלים, כמו בשאלה 4.`,
    keyFacts: [
      String.raw`**מעגל שמרכזו בראשית**: $x^2+y^2=R^2$. הנקודה $(x,y)$ על המעגל אם״ם מרחקה מהראשית הוא $R$, ובתוך המעגל אם $x^2+y^2<R^2$.`,
      String.raw`**מעגל היחידה** ($R=1$): הנקודה שהרדיוס אליה יוצר זווית $\alpha$ עם הכיוון החיובי של ציר ה-$x$ היא $(\cos\alpha,\sin\alpha)$, ושיפוע הרדיוס הזה הוא $\tan\alpha$.`,
      String.raw`**קוטר**: הנקודה הנגדית ל-$(x,y)$ על מעגל שמרכזו בראשית היא $(-x,-y)$ (הראשית היא אמצע הקוטר). זווית היקפית הנשענת על קוטר היא ישרה.`,
      String.raw`**חיתוך ישר ומעגל**: מציבים את $y$ מהישר במשוואת המעגל ופותרים משוואה ריבועית.`,
      String.raw`**מרכז מעגל חוסם**: נקודת המפגש של האנכים האמצעיים. אם היא ראשית הצירים, המעגל החוסם הוא $x^2+y^2=R^2$.`,
    ],
    exercises: [
      {
        id: 'ag-self-practice-1',
        difficulty: 2,
        statement: String.raw`הישר $y=x+1$ חותך את המעגל $x^2+y^2=25$ בנקודות $A$ ו-$B$, כאשר $A$ ברביע הראשון (ראו שרטוט).

א. מצאו את $A$ ואת $B$.

ב. חשבו את אורך המיתר $AB$.

ג. מצאו את אמצע המיתר $K$, והראו ש-$OK\perp AB$, כאשר $O$ היא ראשית הצירים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="54" y1="120" x2="268" y2="120" />
    <polyline points="261,116 268,120 261,124" />
    <line x1="160" y1="226" x2="160" y2="12" />
    <polyline points="156,19 160,12 164,19" />
  </g>
  <line x1="59.2" y1="204.8" x2="244.8" y2="19.2" stroke-width="1.5" />
  <circle cx="160" cy="120" r="80" stroke-width="1.8" />
  <circle cx="208" cy="56" r="3" fill="currentColor" stroke="none" />
  <circle cx="96" cy="168" r="3" fill="currentColor" stroke="none" />
  <circle cx="160" cy="120" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="218.5" y="51">A</text>
    <text x="85.5" y="184">B</text>
    <text x="170.5" y="136">O</text>
    <text x="266" y="136" font-style="italic">x</text>
    <text x="172" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`הציבו $y=x+1$ במשוואת המעגל.`,
          String.raw`$x^2+(x+1)^2=25$ מוביל למשוואה $x^2+x-12=0$.`,
          String.raw`השוו את שיפוע $OK$ לשיפוע $AB$.`,
        ],
        solutionSteps: [
          String.raw`א. $x^2+(x+1)^2=25$, כלומר $2x^2+2x-24=0$, ולכן $x^2+x-12=0$ ו-$(x+4)(x-3)=0$.`,
          String.raw`$x=3$: $y=4$, ולכן $A(3,4)$. $x=-4$: $y=-3$, ולכן $B(-4,-3)$.`,
          String.raw`ב. $AB=\sqrt{7^2+7^2}=\sqrt{98}=7\sqrt2\approx9.90$.`,
          String.raw`ג. $K\left(\frac{3-4}{2},\frac{4-3}{2}\right)=K(-0.5,\,0.5)$. $m_{OK}=\frac{0.5}{-0.5}=-1$ ו-$m_{AB}=1$, ומכפלתם $-1$, ולכן $OK\perp AB$ – הישר מהמרכז לאמצע מיתר ניצב למיתר.`,
        ],
        finalAnswer: String.raw`א. $A(3,4)$, $B(-4,-3)$. ב. $AB=7\sqrt2\approx9.90$. ג. $K(-0.5,\,0.5)$; $m_{OK}\cdot m_{AB}=-1$.`,
        answers: [
          { label: String.raw`$x$ של $A$`, value: 3 },
          { label: String.raw`$y$ של $A$`, value: 4 },
          { label: String.raw`$x$ של $B$`, value: -4 },
          { label: String.raw`$y$ של $B$`, value: -3 },
          { label: String.raw`אורך $AB$`, value: Math.sqrt(98) },
        ],
      },
      {
        id: 'ag-self-practice-2',
        difficulty: 2,
        statement: String.raw`הנקודה $P$ נמצאת על מעגל היחידה $x^2+y^2=1$ ברביע השני, ושיעור ה-$x$ שלה הוא $-0.6$. גם הנקודה $Q(0.8,\,0.6)$ נמצאת על מעגל היחידה (ראו שרטוט).

א. מצאו את שיעור ה-$y$ של $P$.

ב. חשבו את שיפוע הרדיוס $OP$, והראו ש-$OP\perp OQ$.

ג. חשבו את אורך הקטע $PQ$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="38" y1="120" x2="284" y2="120" />
    <polyline points="277,116 284,120 277,124" />
    <line x1="160" y1="226" x2="160" y2="12" />
    <polyline points="156,19 160,12 164,19" />
  </g>
  <circle cx="160" cy="120" r="80" stroke-width="1.8" />
  <line x1="160" y1="120" x2="112" y2="56" />
  <line x1="160" y1="120" x2="224" y2="72" />
  <line x1="112" y1="56" x2="224" y2="72" stroke-dasharray="6 4" stroke-width="1.5" />
  <polyline points="154.6,112.8 161.8,107.4 167.2,114.6" stroke-width="1" />
  <circle cx="112" cy="56" r="3" fill="currentColor" stroke="none" />
  <circle cx="224" cy="72" r="3" fill="currentColor" stroke="none" />
  <circle cx="160" cy="120" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="101.5" y="51">P</text>
    <text x="234.5" y="67">Q</text>
    <text x="149.5" y="136">O</text>
    <text x="282" y="136" font-style="italic">x</text>
    <text x="172" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`הציבו $x=-0.6$ במשוואת המעגל; ברביע השני $y>0$.`,
          String.raw`שיפוע $OP$ הוא $\frac{y_P}{x_P}$ (וזה גם $\tan\alpha$, כאשר $\alpha$ הזווית של $P$ במעגל היחידה).`,
          String.raw`המשולש $POQ$ ישר זווית ושווה שוקיים (שתי השוקיים הן רדיוסים).`,
        ],
        solutionSteps: [
          String.raw`א. $0.36+y^2=1$, ולכן $y^2=0.64$ ו-$y=\pm0.8$. ברביע השני $y>0$, ולכן $P(-0.6,\,0.8)$.`,
          String.raw`ב. $m_{OP}=\frac{0.8}{-0.6}=-\frac43$ ו-$m_{OQ}=\frac{0.6}{0.8}=\frac34$. $m_{OP}\cdot m_{OQ}=-1$, ולכן $OP\perp OQ$.`,
          String.raw`ג. $PQ=\sqrt{(0.8+0.6)^2+(0.6-0.8)^2}=\sqrt{1.96+0.04}=\sqrt2\approx1.41$.`,
          String.raw`בדיקה: המשולש $POQ$ ישר זווית ב-$O$ וניצביו $OP=OQ=1$, ולכן לפי משפט פיתגורס $PQ=\sqrt{1+1}=\sqrt2$.`,
        ],
        finalAnswer: String.raw`א. $y_P=0.8$. ב. $m_{OP}=-\frac43$; $m_{OP}\cdot m_{OQ}=-1$. ג. $PQ=\sqrt2$.`,
        answers: [
          { label: String.raw`$y$ של $P$`, value: 0.8 },
          { label: String.raw`השיפוע של $OP$`, value: -4 / 3 },
          { label: String.raw`אורך $PQ$`, value: Math.SQRT2 },
        ],
      },
      {
        id: 'ag-self-practice-3',
        difficulty: 2,
        statement: String.raw`מעגל שמרכזו בראשית הצירים $O$ עובר דרך הנקודה $A(6,8)$. $AB$ הוא קוטר במעגל, ונתונה הנקודה $C(10,0)$ (ראו שרטוט).

א. מצאו את משוואת המעגל ואת שיעורי $B$.

ב. הראו ש-$C$ על המעגל, והוכיחו בעזרת שיפועים ש-$\angle ACB=90^\circ$.

ג. חשבו את שטח המשולש $ABC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="49.6" y1="120" x2="272.4" y2="120" />
    <polyline points="265.4,116 272.4,120 265.4,124" />
    <line x1="155.6" y1="226" x2="155.6" y2="12" />
    <polyline points="151.6,19 155.6,12 159.6,19" />
  </g>
  <circle cx="155.6" cy="120" r="87.3" stroke-width="1.8" />
  <polygon points="208,50.2 103.3,189.8 242.9,120" />
  <circle cx="208" cy="50.2" r="3" fill="currentColor" stroke="none" />
  <circle cx="103.3" cy="189.8" r="3" fill="currentColor" stroke="none" />
  <circle cx="242.9" cy="120" r="3" fill="currentColor" stroke="none" />
  <circle cx="155.6" cy="120" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="218.5" y="45.2">A</text>
    <text x="92.8" y="205.8">B</text>
    <text x="253.4" y="115">C</text>
    <text x="145.1" y="115">O</text>
    <text x="270.4" y="136" font-style="italic">x</text>
    <text x="167.6" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`הרדיוס הוא $OA$, ו-$O$ היא אמצע הקוטר $AB$.`,
          String.raw`חשבו את $m_{CA}$ ואת $m_{CB}$.`,
          String.raw`המשולש ישר זווית ב-$C$, ולכן השטח הוא מחצית מכפלת הניצבים. (אפשר גם לחלק אותו לשני משולשים שהבסיס המשותף שלהם $OC$ על ציר ה-$x$.)`,
        ],
        solutionSteps: [
          String.raw`א. $R=OA=\sqrt{6^2+8^2}=10$, ולכן המעגל $x^2+y^2=100$.`,
          String.raw`$O$ היא אמצע הקוטר $AB$, ולכן $B(-6,-8)$.`,
          String.raw`ב. $10^2+0^2=100$, ולכן $C$ על המעגל.`,
          String.raw`$m_{CA}=\frac{8-0}{6-10}=-2$ ו-$m_{CB}=\frac{-8-0}{-6-10}=\frac12$. $m_{CA}\cdot m_{CB}=-1$, ולכן $\angle ACB=90^\circ$ – בהתאם לכך שזווית היקפית הנשענת על קוטר היא ישרה.`,
          String.raw`ג. $CA=\sqrt{4^2+8^2}=\sqrt{80}$ ו-$CB=\sqrt{16^2+8^2}=\sqrt{320}$. $S=\frac{\sqrt{80}\cdot\sqrt{320}}{2}=\frac{\sqrt{25600}}{2}=\frac{160}{2}=80$.`,
          String.raw`בדיקה: $O$ נמצאת על $AB$, והקטע $OC$ (על ציר ה-$x$) מחלק את המשולש לשני משולשים שגובהם $8$: $S=\frac{10\cdot8}{2}+\frac{10\cdot8}{2}=80$.`,
        ],
        finalAnswer: String.raw`א. $x^2+y^2=100$, $B(-6,-8)$. ב. $m_{CA}\cdot m_{CB}=-1$. ג. $S=80$.`,
        answers: [
          { label: String.raw`רדיוס $R$`, value: 10 },
          { label: String.raw`$x$ של $B$`, value: -6 },
          { label: String.raw`$y$ של $B$`, value: -8 },
          { label: 'שטח המשולש', value: 80 },
        ],
      },
      {
        id: 'ag-self-practice-4',
        difficulty: 2,
        statement: String.raw`מצאו את הנקודות שעל הישר $y=2x$ שמרחקן מהנקודה $A(5,0)$ הוא $5$. עבור הנקודה שאינה ראשית הצירים, חשבו את שטח המשולש שקודקודיו הם הנקודה הזו, הנקודה $A$ וראשית הצירים $O$.`,
        hints: [
          String.raw`נקודה על הישר היא $(x,2x)$. דרשו שריבוע המרחק שלה מ-$A$ יהיה $25$.`,
          String.raw`$(x-5)^2+(2x)^2=25$.`,
          String.raw`הבסיס $OA$ על ציר ה-$x$, והגובה הוא שיעור ה-$y$ של הנקודה.`,
        ],
        solutionSteps: [
          String.raw`נקודה על הישר: $P(x,2x)$. $PA^2=(x-5)^2+(2x)^2=25$.`,
          String.raw`$x^2-10x+25+4x^2=25$, כלומר $5x^2-10x=0$, ולכן $5x(x-2)=0$: $x=0$ או $x=2$.`,
          String.raw`הנקודות: $O(0,0)$ ו-$P(2,4)$. (אכן $OA=5$ ו-$PA=\sqrt{3^2+4^2}=5$.)`,
          String.raw`במשולש $OAP$ הבסיס $OA=5$ על ציר ה-$x$, והגובה מ-$P$ הוא $4$. $S=\frac{5\cdot4}{2}=10$.`,
        ],
        finalAnswer: String.raw`$(0,0)$ ו-$(2,4)$; השטח $10$.`,
        answers: [
          { label: String.raw`$x$ של הנקודה שאינה הראשית`, value: 2 },
          { label: String.raw`$y$ של הנקודה שאינה הראשית`, value: 4 },
          { label: 'שטח המשולש', value: 10 },
        ],
      },
      {
        id: 'ag-self-practice-5',
        difficulty: 3,
        statement: String.raw`קודקודי המשולש $ABC$ הם $A(-1,7)$, $B(7,1)$ ו-$C(-5,-5)$ (ראו שרטוט).

א. מצאו את משוואות האנכים האמצעיים לצלעות $AB$ ו-$BC$, והראו ששניהם עוברים דרך ראשית הצירים.

ב. מצאו את משוואת המעגל החוסם את המשולש.

ג. $BD$ הוא קוטר במעגל. מצאו את שיעורי $D$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="51" y1="120" x2="271" y2="120" />
    <polyline points="264,116 271,120 264,124" />
    <line x1="157" y1="226" x2="157" y2="12" />
    <polyline points="153,19 157,12 161,19" />
  </g>
  <circle cx="157" cy="120" r="84.9" stroke-width="1.8" stroke-dasharray="6 4" />
  <polygon points="145,36 241,108 97,180" />
  <circle cx="145" cy="36" r="3" fill="currentColor" stroke="none" />
  <circle cx="241" cy="108" r="3" fill="currentColor" stroke="none" />
  <circle cx="97" cy="180" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="145" y="27.5">A</text>
    <text x="255" y="113.5">B</text>
    <text x="86.5" y="196">C</text>
    <text x="269" y="136" font-style="italic">x</text>
    <text x="169" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`לכל צלע: אמצע, שיפוע, ושיפוע הופכי ונגדי.`,
          String.raw`מרכז המעגל החוסם הוא נקודת המפגש של האנכים האמצעיים, והרדיוס הוא המרחק מהמרכז לקודקוד.`,
          String.raw`מרכז המעגל הוא אמצע הקוטר $BD$.`,
        ],
        solutionSteps: [
          String.raw`א. אמצע $AB$: $(3,4)$; $m_{AB}=\frac{1-7}{7+1}=-\frac34$, ולכן שיפוע האנך האמצעי $\frac43$: $y-4=\frac43(x-3)$, כלומר $y=\frac43x$.`,
          String.raw`אמצע $BC$: $(1,-2)$; $m_{BC}=\frac{-5-1}{-5-7}=\frac12$, ולכן שיפוע האנך האמצעי $-2$: $y+2=-2(x-1)$, כלומר $y=-2x$.`,
          String.raw`בשתי המשוואות $n=0$, ולכן שני האנכים האמצעיים עוברים דרך $(0,0)$.`,
          String.raw`ב. מרכז המעגל החוסם הוא נקודת המפגש של האנכים האמצעיים – הראשית. $R^2=OA^2=1+49=50$ (בדיקה: $OB^2=49+1=50$, $OC^2=25+25=50$). המעגל: $x^2+y^2=50$.`,
          String.raw`ג. $O$ היא אמצע הקוטר $BD$, ולכן $D(-7,-1)$.`,
        ],
        finalAnswer: String.raw`א. $y=\frac43x$ ו-$y=-2x$. ב. $x^2+y^2=50$. ג. $D(-7,-1)$.`,
        answers: [
          { label: String.raw`רדיוס $R$`, value: Math.sqrt(50) },
          { label: String.raw`$x$ של $D$`, value: -7 },
          { label: String.raw`$y$ של $D$`, value: -1 },
        ],
      },
      {
        id: 'ag-self-practice-6',
        difficulty: 3,
        statement: String.raw`$ABCD$ הוא ריבוע שקודקודיו נמצאים על המעגל $x^2+y^2=25$. נתון $A(3,4)$, והקודקוד $B$ נמצא ברביע הרביעי (ראו שרטוט).

א. מצאו את שיעורי $C$.

ב. מצאו את שיעורי $B$ ו-$D$.

ג. חשבו את שטח הריבוע.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <g stroke-width="1.2">
    <line x1="54" y1="120" x2="268" y2="120" />
    <polyline points="261,116 268,120 261,124" />
    <line x1="160" y1="226" x2="160" y2="12" />
    <polyline points="156,19 160,12 164,19" />
  </g>
  <circle cx="160" cy="120" r="80" stroke-width="1.8" />
  <polygon points="208,56 224,168 112,184 96,72" />
  <circle cx="208" cy="56" r="3" fill="currentColor" stroke="none" />
  <circle cx="224" cy="168" r="3" fill="currentColor" stroke="none" />
  <circle cx="112" cy="184" r="3" fill="currentColor" stroke="none" />
  <circle cx="96" cy="72" r="3" fill="currentColor" stroke="none" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="218.5" y="51">A</text>
    <text x="234.5" y="184">B</text>
    <text x="101.5" y="200">C</text>
    <text x="85.5" y="67">D</text>
    <text x="266" y="136" font-style="italic">x</text>
    <text x="172" y="18" font-style="italic">y</text>
  </g>
</svg>`,
        hints: [
          String.raw`אלכסוני הריבוע שווים וחוצים זה את זה, ולכן הם קטרים של המעגל: $AC$ קוטר.`,
          String.raw`אלכסוני ריבוע ניצבים זה לזה: $BD$ עובר דרך הראשית וניצב ל-$OA$.`,
          String.raw`שטח ריבוע הוא מחצית מכפלת האלכסונים.`,
        ],
        solutionSteps: [
          String.raw`א. בריבוע האלכסונים שווים וחוצים זה את זה, ולכן נקודת המפגש שלהם נמצאת במרחקים שווים מארבעת הקודקודים – זה מרכז המעגל $O$. לכן $AC$ קוטר, ו-$C(-3,-4)$.`,
          String.raw`ב. גם $BD$ קוטר, והוא ניצב ל-$AC$ (אלכסוני ריבוע ניצבים). $m_{OA}=\frac43$, ולכן $BD$ נמצא על הישר $y=-\frac34x$.`,
          String.raw`חיתוך עם המעגל: $x^2+\frac{9}{16}x^2=25$, כלומר $\frac{25}{16}x^2=25$ ו-$x=\pm4$. הנקודות $(4,-3)$ ו-$(-4,3)$.`,
          String.raw`$B$ ברביע הרביעי, ולכן $B(4,-3)$ ו-$D(-4,3)$.`,
          String.raw`ג. האלכסונים הם קטרים באורך $10$, ולכן $S=\frac{10\cdot10}{2}=50$.`,
        ],
        finalAnswer: String.raw`א. $C(-3,-4)$. ב. $B(4,-3)$, $D(-4,3)$. ג. $S=50$.`,
        answers: [
          { label: String.raw`$x$ של $C$`, value: -3 },
          { label: String.raw`$y$ של $C$`, value: -4 },
          { label: String.raw`$x$ של $B$`, value: 4 },
          { label: String.raw`$y$ של $B$`, value: -3 },
          { label: 'שטח הריבוע', value: 50 },
        ],
      },
    ],
  },
};
