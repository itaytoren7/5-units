import type { LessonContent } from '../types';

/**
 * גאומטריה אוקלידית – זוויות, משולשים, מרובעים ומעגלים (שאלה 4 בשאלון 806).
 * Every figure is drawn to scale from a concrete coordinate model; the same models are rebuilt
 * independently in geometry-a.test.ts, which recomputes every numeric answer and sanity-checks every proof.
 */
export const geometryAContent: Record<string, LessonContent> = {
  'geo-angles': {
    intro: String.raw`השיעור הראשון בגאומטריה האוקלידית עוסק בזוויות: זוויות צמודות וזוויות קודקודיות, הזוויות שנוצרות כשישר חותך שני ישרים מקבילים, וסכום הזוויות במשולש ובמצולע. אלה כלי העבודה הבסיסיים של כל חישוב ושל כל הוכחה בשאלה 4 בשאלון 806 – כמעט בכל סעיף מופיע נימוק כמו ״זוויות מתחלפות בין ישרים מקבילים שוות״. בכל שלב כותבים את שם המשפט המדויק, כי כך נבדקת התשובה בבגרות.`,
    keyFacts: [
      String.raw`**זוויות צמודות** משלימות זו את זו ל-$180^\circ$; **זוויות קודקודיות** שוות זו לזו.`,
      String.raw`**ישרים מקבילים** שחותך אותם ישר שלישי: זוויות מתאימות שוות, זוויות מתחלפות שוות, וזוויות חד-צדדיות משלימות ל-$180^\circ$. גם ההפך נכון: שוויון כזה מוכיח ששני הישרים מקבילים.`,
      String.raw`**סכום הזוויות במשולש** הוא $180^\circ$. **זווית חיצונית** למשולש שווה לסכום שתי הזוויות הפנימיות שאינן צמודות לה.`,
      String.raw`**סכום הזוויות הפנימיות במצולע** קמור בעל $n$ צלעות הוא $(n-2)\cdot180^\circ$, וסכום הזוויות החיצוניות (אחת בכל קודקוד) הוא $360^\circ$. במצולע משוכלל כל זווית פנימית היא $\frac{(n-2)\cdot180^\circ}{n}$.`,
      String.raw`**שיטה**: מסמנים את הזווית הלא ידועה ב-$x$, כותבים משוואה לפי אחד המשפטים (צמודות, קודקודיות, מקבילים, סכום זוויות) ופותרים. כשנקודה נמצאת בין שני ישרים מקבילים – מעבירים דרכה ישר עזר המקביל להם.`,
    ],
    exercises: [
      {
        id: 'geo-angles-1',
        difficulty: 1,
        statement: String.raw`הישרים $AB$ ו-$CD$ נחתכים בנקודה $O$ (ראו שרטוט). נתון: $\angle AOC=(3x+10)^\circ$ ו-$\angle BOD=(5x-30)^\circ$. מצאו את $x$ וחשבו את $\angle AOD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="48.9" y1="120" x2="271.1" y2="120" />
  <line x1="125.8" y1="26" x2="194.2" y2="214" />
  <path d="M 143 120 A 17 17 0 0 1 154.2 104" stroke-width="1.2" />
  <path d="M 177 120 A 17 17 0 0 1 165.8 136" stroke-width="1.2" />
  <text x="35.9" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="284.1" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="122.4" y="18.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="197.6" y="232.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="166.5" y="114.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
</svg>`,
        hints: [
          String.raw`$\angle AOC$ ו-$\angle BOD$ הן זוויות קודקודיות.`,
          String.raw`זוויות קודקודיות שוות: $3x+10=5x-30$. אחר כך שימו לב ש-$\angle AOD$ צמודה ל-$\angle AOC$.`,
        ],
        solutionSteps: [
          String.raw`$\angle AOC$ ו-$\angle BOD$ זוויות קודקודיות, ולכן הן שוות: $3x+10=5x-30$.`,
          String.raw`מכאן $2x=40$, כלומר $x=20$, ו-$\angle AOC=3\cdot20+10=70^\circ$.`,
          String.raw`$\angle AOD$ ו-$\angle AOC$ זוויות צמודות, ולכן $\angle AOD=180^\circ-70^\circ=110^\circ$.`,
        ],
        finalAnswer: String.raw`$x=20$, $\angle AOD=110^\circ$`,
        answers: [
          { label: String.raw`$x$`, value: 20 },
          { label: String.raw`$\angle AOD$`, value: 110 },
        ],
      },
      {
        id: 'geo-angles-2',
        difficulty: 1,
        statement: String.raw`הישרים $AB$ ו-$CD$ מקבילים. הישר $EF$ חותך אותם בנקודות $G$ ו-$H$ (ראו שרטוט). נתון: $\angle AGH=(2x+15)^\circ$ ו-$\angle GHD=(3x-20)^\circ$. מצאו את $x$ וחשבו את $\angle BGH$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="42.3" y1="67.7" x2="277.7" y2="67.7" />
  <line x1="42.3" y1="172.3" x2="277.7" y2="172.3" />
  <line x1="163.6" y1="26" x2="147.2" y2="214" />
  <path d="M 143 67.7 A 17 17 0 0 0 158.5 84.6" stroke-width="1.2" />
  <path d="M 152.3 155.4 A 17 17 0 0 1 167.8 172.3" stroke-width="1.2" />
  <text x="31" y="66.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="289" y="66.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="31" y="184.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="289" y="184.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="150.8" y="64" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">G</text>
  <text x="160" y="187" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">H</text>
  <text x="163.6" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="147.2" y="232.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
</svg>`,
        hints: [
          String.raw`איזה סוג זוויות הן $\angle AGH$ ו-$\angle GHD$ ביחס לישרים המקבילים?`,
          String.raw`זוויות מתחלפות בין ישרים מקבילים שוות. אחר כך – $\angle BGH$ צמודה ל-$\angle AGH$.`,
        ],
        solutionSteps: [
          String.raw`$AB\parallel CD$ והישר $EF$ חותך אותם, ולכן $\angle AGH=\angle GHD$ (זוויות מתחלפות בין ישרים מקבילים שוות).`,
          String.raw`$2x+15=3x-20$, ולכן $x=35$ ו-$\angle AGH=2\cdot35+15=85^\circ$.`,
          String.raw`$\angle BGH$ צמודה ל-$\angle AGH$, ולכן $\angle BGH=180^\circ-85^\circ=95^\circ$.`,
        ],
        finalAnswer: String.raw`$x=35$, $\angle BGH=95^\circ$`,
        answers: [
          { label: String.raw`$x$`, value: 35 },
          { label: String.raw`$\angle BGH$`, value: 95 },
        ],
      },
      {
        id: 'geo-angles-3',
        difficulty: 2,
        statement: String.raw`הישרים $AB$ ו-$CD$ מקבילים, והנקודה $E$ נמצאת ביניהם (ראו שרטוט). נתון: $\angle ABE=40^\circ$ ו-$\angle CDE=35^\circ$. חשבו את $\angle BED$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="26" y1="37.5" x2="294" y2="37.5" />
  <line x1="26" y1="202.5" x2="294" y2="202.5" />
  <line x1="26" y1="37.5" x2="133.1" y2="127.4" />
  <line x1="26" y1="202.5" x2="133.1" y2="127.4" />
  <path d="M 43 37.5 A 17 17 0 0 1 39 48.5" stroke-width="1.2" />
  <path d="M 43 202.5 A 17 17 0 0 0 39.9 192.7" stroke-width="1.2" />
  <path d="M 120.1 116.5 A 17 17 0 0 0 119.2 137.2" stroke-width="1.2" />
  <text x="305.3" y="36.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="14.7" y="36.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="305.3" y="214.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="14.7" y="214.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="142.3" y="142.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
</svg>`,
        hints: [
          String.raw`העבירו דרך $E$ ישר עזר המקביל ל-$AB$ (ולכן גם ל-$CD$).`,
          String.raw`ישר העזר מחלק את $\angle BED$ לשתי זוויות, וכל אחת מהן מתחלפת עם אחת הזוויות הנתונות.`,
        ],
        solutionSteps: [
          String.raw`נעביר דרך $E$ ישר המקביל ל-$AB$, ונסמן עליו נקודה $K$ בצד של $E$ שאינו הצד של $A$ ו-$C$. ישר המקביל לאחד משני ישרים מקבילים מקביל גם לשני, ולכן גם $EK\parallel CD$.`,
          String.raw`$EK\parallel AB$ והישר $BE$ חותך אותם, ולכן $\angle BEK=\angle ABE=40^\circ$ (זוויות מתחלפות בין ישרים מקבילים).`,
          String.raw`$EK\parallel CD$ והישר $DE$ חותך אותם, ולכן $\angle KED=\angle CDE=35^\circ$ (זוויות מתחלפות).`,
          String.raw`הקרן $EK$ נמצאת בתוך הזווית $BED$, ולכן $\angle BED=\angle BEK+\angle KED=40^\circ+35^\circ=75^\circ$.`,
        ],
        finalAnswer: String.raw`$\angle BED=75^\circ$`,
        answers: [{ label: String.raw`$\angle BED$`, value: 75 }],
      },
      {
        id: 'geo-angles-4',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ הנקודה $D$ נמצאת על המשך הצלע $BC$ (ראו שרטוט). נתון: $\angle ACD=128^\circ$ ו-$\angle BAC:\angle ABC=3:5$. חשבו את זוויות המשולש.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="64.6,26 31.4,214 211.4,214" />
  <line x1="211.4" y1="214" x2="288.6" y2="214" />
  <path d="M 201 200.6 A 17 17 0 0 1 228.4 214" stroke-width="1.2" />
  <text x="58.1" y="20.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="18.8" y="222.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="211.4" y="232.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="301.2" y="222.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`$\angle ACD$ היא זווית חיצונית למשולש $ABC$.`,
          String.raw`זווית חיצונית שווה לסכום שתי הזוויות הפנימיות שאינן צמודות לה: $3k+5k=128^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$\angle ACD$ היא זווית חיצונית למשולש $ABC$, ולכן היא שווה לסכום שתי הזוויות הפנימיות שאינן צמודות לה: $\angle BAC+\angle ABC=128^\circ$.`,
          String.raw`נסמן $\angle BAC=3k$ ו-$\angle ABC=5k$. אז $8k=128^\circ$, כלומר $k=16^\circ$.`,
          String.raw`$\angle BAC=3\cdot16^\circ=48^\circ$ ו-$\angle ABC=5\cdot16^\circ=80^\circ$.`,
          String.raw`$\angle ACB$ צמודה ל-$\angle ACD$, ולכן $\angle ACB=180^\circ-128^\circ=52^\circ$ (בדיקה: $48^\circ+80^\circ+52^\circ=180^\circ$).`,
        ],
        finalAnswer: String.raw`$\angle A=48^\circ$, $\angle B=80^\circ$, $\angle C=52^\circ$`,
        answers: [
          { label: String.raw`$\angle BAC$`, value: 48 },
          { label: String.raw`$\angle ABC$`, value: 80 },
          { label: String.raw`$\angle ACB$`, value: 52 },
        ],
      },
      {
        id: 'geo-angles-5',
        difficulty: 2,
        statement: String.raw`במצולע משוכלל כל זווית פנימית גדולה פי 5 מהזווית החיצונית הצמודה לה. כמה צלעות יש למצולע, ומהו סכום הזוויות הפנימיות שלו?`,
        hints: [
          String.raw`זווית פנימית והזווית החיצונית הצמודה לה משלימות זו את זו ל-$180^\circ$.`,
          String.raw`סכום הזוויות החיצוניות במצולע קמור הוא $360^\circ$, ובמצולע משוכלל כולן שוות.`,
        ],
        solutionSteps: [
          String.raw`נסמן את הזווית החיצונית ב-$x$. הזווית הפנימית צמודה לה, ולכן $x+5x=180^\circ$, כלומר $x=30^\circ$ והזווית הפנימית $150^\circ$.`,
          String.raw`סכום הזוויות החיצוניות במצולע קמור הוא $360^\circ$, ובמצולע משוכלל כולן שוות, ולכן מספר הצלעות $n=\frac{360^\circ}{30^\circ}=12$.`,
          String.raw`סכום הזוויות הפנימיות: $(n-2)\cdot180^\circ=10\cdot180^\circ=1800^\circ$ (בדיקה: $12\cdot150^\circ=1800^\circ$).`,
        ],
        finalAnswer: String.raw`למצולע 12 צלעות, וסכום הזוויות הפנימיות שלו $1800^\circ$.`,
        answers: [
          { label: 'מספר הצלעות', value: 12 },
          { label: 'סכום הזוויות הפנימיות', value: 1800 },
        ],
      },
      {
        id: 'geo-angles-6',
        difficulty: 2,
        statement: String.raw`הישרים $AB$ ו-$CD$ מקבילים. הישר $EF$ חותך אותם בנקודות $G$ ו-$H$, ו-$GK$ חוצה את הזווית $BGH$, כאשר $K$ על $CD$ (ראו שרטוט). נתון: $\angle EGB=70^\circ$. חשבו את $\angle GKH$ ואת $\angle GHK$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="35.9" y1="64.9" x2="284.1" y2="64.9" />
  <line x1="35.9" y1="175.1" x2="284.1" y2="175.1" />
  <line x1="160.4" y1="26" x2="91.9" y2="214" />
  <line x1="146.2" y1="64.9" x2="223.4" y2="175.1" />
  <path d="M 152 48.9 A 17 17 0 0 1 163.2 64.9" stroke-width="1.2" />
  <path d="M 168.2 64.9 A 22 22 0 0 1 158.8 82.9" stroke-width="1.2" />
  <path d="M 161.7 87 A 27 27 0 0 1 137 90.2" stroke-width="1.2" />
  <text x="24.7" y="63.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="295.3" y="63.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="24.7" y="187.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="296.6" y="184" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="139.7" y="59.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">G</text>
  <text x="112.6" y="191.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">H</text>
  <text x="223.4" y="193.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">K</text>
  <text x="160.4" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="85.4" y="230.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
</svg>`,
        hints: [
          String.raw`חשבו את $\angle BGH$ (צמודה ל-$\angle EGB$) ואת מחציתה.`,
          String.raw`$\angle GKH$ מתחלפת עם $\angle BGK$, ו-$\angle GHK$ מתאימה ל-$\angle EGB$.`,
        ],
        solutionSteps: [
          String.raw`$\angle BGH$ צמודה ל-$\angle EGB$, ולכן $\angle BGH=180^\circ-70^\circ=110^\circ$.`,
          String.raw`$GK$ חוצה את $\angle BGH$, ולכן $\angle BGK=\angle KGH=55^\circ$.`,
          String.raw`$AB\parallel CD$ והישר $GK$ חותך אותם, ולכן $\angle GKH=\angle BGK=55^\circ$ (זוויות מתחלפות בין ישרים מקבילים).`,
          String.raw`$AB\parallel CD$ והישר $EF$ חותך אותם, ולכן $\angle GHK=\angle EGB=70^\circ$ (זוויות מתאימות בין ישרים מקבילים).`,
          String.raw`בדיקה במשולש $GHK$: $55^\circ+55^\circ+70^\circ=180^\circ$. שימו לב: $\angle HGK=\angle HKG$, ולכן המשולש $GHK$ שווה שוקיים ($HG=HK$).`,
        ],
        finalAnswer: String.raw`$\angle GKH=55^\circ$, $\angle GHK=70^\circ$`,
        answers: [
          { label: String.raw`$\angle GKH$`, value: 55 },
          { label: String.raw`$\angle GHK$`, value: 70 },
        ],
      },
      {
        id: 'geo-angles-7',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ חוצי הזוויות $B$ ו-$C$ נחתכים בנקודה $I$ (ראו שרטוט). נתון: $\angle BIC=125^\circ$. חשבו את $\angle BAC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="135.4,26 26.9,214 293.1,214" />
  <line x1="26.9" y1="214" x2="145.8" y2="145.3" stroke-width="1.5" />
  <line x1="293.1" y1="214" x2="145.8" y2="145.3" stroke-width="1.5" />
  <path d="M 48.9 214 A 22 22 0 0 0 45.9 203" stroke-width="1.2" />
  <path d="M 49.4 201 A 26 26 0 0 0 39.9 191.5" stroke-width="1.2" />
  <path d="M 271.1 214 A 22 22 0 0 1 273.2 204.7" stroke-width="1.2" />
  <path d="M 267.1 214 A 26 26 0 0 1 269.6 203" stroke-width="1.2" />
  <path d="M 265.1 200.9 A 31 31 0 0 1 273.2 190.3" stroke-width="1.2" />
  <path d="M 261.4 199.2 A 35 35 0 0 1 270.6 187.2" stroke-width="1.2" />
  <text x="135.4" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="15.6" y="226" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="304.4" y="226" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="139.3" y="139.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">I</text>
</svg>`,
        hints: [
          String.raw`סמנו $\angle ABC=2\beta$ ו-$\angle ACB=2\gamma$. מהו סכום הזוויות במשולש $BIC$?`,
          String.raw`מהמשולש $BIC$: $\beta+\gamma=55^\circ$. מכאן $\angle ABC+\angle ACB=110^\circ$.`,
        ],
        solutionSteps: [
          String.raw`נסמן $\angle ABC=2\beta$ ו-$\angle ACB=2\gamma$. $BI$ ו-$CI$ חוצי זוויות, ולכן $\angle IBC=\beta$ ו-$\angle ICB=\gamma$.`,
          String.raw`סכום הזוויות במשולש $BIC$: $\beta+\gamma+125^\circ=180^\circ$, ולכן $\beta+\gamma=55^\circ$.`,
          String.raw`$\angle ABC+\angle ACB=2(\beta+\gamma)=110^\circ$.`,
          String.raw`סכום הזוויות במשולש $ABC$: $\angle BAC=180^\circ-110^\circ=70^\circ$.`,
          String.raw`הערה: באותה דרך מקבלים באופן כללי $\angle BIC=90^\circ+\frac{\angle BAC}{2}$, ואכן $90^\circ+35^\circ=125^\circ$. התשובה אינה תלויה בגודלן של $\angle B$ ו-$\angle C$ לחוד.`,
        ],
        finalAnswer: String.raw`$\angle BAC=70^\circ$`,
        answers: [{ label: String.raw`$\angle BAC$`, value: 70 }],
      },
      {
        id: 'geo-angles-8',
        difficulty: 3,
        statement: String.raw`במרובע $ABCD$ חוצי הזוויות $A$ ו-$B$ נפגשים בנקודה $E$ (ראו שרטוט). נתון: $\angle C=100^\circ$ ו-$\angle D=70^\circ$. חשבו את $\angle AEB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="89.4,32.9 294,53.8 267,207.1 26,207.1" />
  <line x1="89.4" y1="32.9" x2="164.1" y2="152" stroke-width="1.5" />
  <line x1="294" y1="53.8" x2="164.1" y2="152" stroke-width="1.5" />
  <path d="M 109.3 34.9 A 20 20 0 0 1 100 49.9" stroke-width="1.2" />
  <path d="M 102.1 53.2 A 24 24 0 0 1 81.2 55.5" stroke-width="1.2" />
  <path d="M 274.1 51.7 A 20 20 0 0 0 278 65.8" stroke-width="1.2" />
  <path d="M 270.1 51.3 A 24 24 0 0 0 274.9 68.2" stroke-width="1.2" />
  <path d="M 270.9 71.2 A 29 29 0 0 0 289 82.3" stroke-width="1.2" />
  <path d="M 267.7 73.7 A 33 33 0 0 0 288.3 86.3" stroke-width="1.2" />
  <text x="80.2" y="29.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="305.3" y="52.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="276.2" y="221.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="14.7" y="219.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="160.7" y="170" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
</svg>`,
        hints: [
          String.raw`סכום הזוויות במרובע הוא $360^\circ$. חשבו את $\angle A+\angle B$.`,
          String.raw`במשולש $ABE$ הזוויות שליד $A$ ו-$B$ הן מחציות של $\angle A$ ו-$\angle B$.`,
        ],
        solutionSteps: [
          String.raw`סכום הזוויות במרובע הוא $(4-2)\cdot180^\circ=360^\circ$, ולכן $\angle DAB+\angle ABC=360^\circ-100^\circ-70^\circ=190^\circ$.`,
          String.raw`$AE$ ו-$BE$ חוצי זוויות, ולכן $\angle EAB+\angle EBA=\frac{190^\circ}{2}=95^\circ$.`,
          String.raw`סכום הזוויות במשולש $ABE$: $\angle AEB=180^\circ-95^\circ=85^\circ$.`,
          String.raw`הערה: באופן כללי $\angle AEB=\frac{\angle C+\angle D}{2}$, ואכן $\frac{100^\circ+70^\circ}{2}=85^\circ$.`,
        ],
        finalAnswer: String.raw`$\angle AEB=85^\circ$`,
        answers: [{ label: String.raw`$\angle AEB$`, value: 85 }],
      },
    ],
  },
  'geo-triangles-basic': {
    intro: String.raw`בשיעור זה מחשבים זוויות ואורכים במשולשים בעזרת התכונות הבסיסיות: סכום הזוויות, משולש שווה שוקיים ומשולש שווה צלעות, משפט פיתגורס וארבעת משפטי החפיפה. אלה הצעדים הקטנים שמהם בנויים סעיפי החישוב בשאלה 4 בשאלון 806. בכל שלב כותבים נימוק – נתון, הגדרה או שם המשפט.`,
    keyFacts: [
      String.raw`**משולש שווה שוקיים**: זוויות הבסיס שוות, ולהפך – משולש שבו שתי זוויות שוות הוא שווה שוקיים. במשולש שווה שוקיים **חוצה זווית הראש, התיכון לבסיס והגובה לבסיס מתלכדים**.`,
      String.raw`**משולש שווה צלעות**: כל זוויותיו שוות ל-$60^\circ$, ולהפך.`,
      String.raw`**משפט פיתגורס**: במשולש ישר זווית $a^2+b^2=c^2$, כאשר $c$ הוא היתר. המשפט ההפוך: אם $a^2+b^2=c^2$, המשולש ישר זווית.`,
      String.raw`**ארבעת משפטי החפיפה**: צ.ז.צ, ז.צ.ז, צ.צ.צ, וצ.צ.ז (שתי צלעות והזווית שמול **הגדולה** מביניהן). במשולשים חופפים הצלעות המתאימות והזוויות המתאימות שוות.`,
      String.raw`**יחסים במשולש**: מול הצלע הגדולה יותר נמצאת הזווית הגדולה יותר (ולהפך), וסכום שתי צלעות גדול מהצלע השלישית.`,
    ],
    exercises: [
      {
        id: 'geo-triangles-basic-1',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ נתון $AB=AC$ ו-$\angle BAC=40^\circ$ (ראו שרטוט). חשבו את $\angle ABC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160,26 91.6,214 228.4,214" />
  <path d="M 151.8 48.6 A 24 24 0 0 0 168.2 48.6" stroke-width="1.2" />
  <line x1="130.5" y1="121.7" x2="121.1" y2="118.3" stroke-width="1.2" />
  <line x1="198.9" y1="118.3" x2="189.5" y2="121.7" stroke-width="1.2" />
  <text x="160" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="82.4" y="228.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="237.6" y="228.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
</svg>`,
        hints: [
          String.raw`במשולש שווה שוקיים זוויות הבסיס שוות.`,
          String.raw`$2\angle ABC+40^\circ=180^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$AB=AC$, ולכן $\angle ABC=\angle ACB$ (במשולש שווה שוקיים זוויות הבסיס שוות).`,
          String.raw`סכום הזוויות במשולש הוא $180^\circ$: $2\angle ABC=180^\circ-40^\circ=140^\circ$, ולכן $\angle ABC=70^\circ$.`,
        ],
        finalAnswer: String.raw`$\angle ABC=\angle ACB=70^\circ$`,
        answers: [{ label: String.raw`$\angle ABC$`, value: 70 }],
      },
      {
        id: 'geo-triangles-basic-2',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ נתון $\angle ACB=90^\circ$, היתר $AB=17$ והניצב $BC=8$ (ראו שרטוט). חשבו את אורך הניצב $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="109.9,26 210.1,214 109.9,214" />
  <polyline points="109.9,205 118.9,205 118.9,214" stroke-width="1" />
  <text x="106.5" y="18.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="219.3" y="228.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="103.4" y="230.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
</svg>`,
        hints: [String.raw`השתמשו במשפט פיתגורס: $AC^2+BC^2=AB^2$.`],
        solutionSteps: [
          String.raw`לפי משפט פיתגורס במשולש ישר הזווית $ABC$: $AC^2+BC^2=AB^2$.`,
          String.raw`$AC^2=17^2-8^2=289-64=225$, ולכן $AC=15$.`,
        ],
        finalAnswer: String.raw`$AC=15$`,
        answers: [{ label: String.raw`$AC$`, value: 15 }],
      },
      {
        id: 'geo-triangles-basic-3',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $AB=AC=13$ ו-$BC=10$. $AD$ הוא הגובה לצלע $BC$ (ראו שרטוט). חשבו את $BD$ ואת $AD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160,26 81.7,214 238.3,214" />
  <line x1="160" y1="26" x2="160" y2="214" stroke-width="1.5" />
  <polyline points="160,205 169,205 169,214" stroke-width="1" />
  <line x1="125.4" y1="121.9" x2="116.2" y2="118.1" stroke-width="1.2" />
  <line x1="203.8" y1="118.1" x2="194.6" y2="121.9" stroke-width="1.2" />
  <text x="160" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="70.4" y="226" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="249.6" y="226" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="160" y="232.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`במשולש שווה שוקיים הגובה לבסיס הוא גם תיכון.`,
          String.raw`$BD=5$. השתמשו במשפט פיתגורס במשולש $ABD$.`,
        ],
        solutionSteps: [
          String.raw`$AB=AC$, ולכן במשולש שווה השוקיים $ABC$ הגובה לבסיס $AD$ הוא גם תיכון: $BD=DC=\frac{10}{2}=5$.`,
          String.raw`המשולש $ABD$ ישר זווית ($\angle ADB=90^\circ$). לפי משפט פיתגורס: $AD^2=AB^2-BD^2=169-25=144$.`,
          String.raw`$AD=12$.`,
        ],
        finalAnswer: String.raw`$BD=5$, $AD=12$`,
        answers: [
          { label: String.raw`$BD$`, value: 5 },
          { label: String.raw`$AD$`, value: 12 },
        ],
      },
      {
        id: 'geo-triangles-basic-4',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $AB=AC$. הנקודה $D$ נמצאת על $BC$ כך ש-$AD=DC$ (ראו שרטוט). נתון: $\angle BAD=54^\circ$. חשבו את $\angle ABC$ ואת $\angle ADB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160,59.7 26,180.3 294,180.3" />
  <line x1="160" y1="59.7" x2="172.7" y2="180.3" />
  <path d="M 143.7 74.4 A 22 22 0 0 0 162.3 81.6" stroke-width="1.2" />
  <line x1="96.3" y1="123.7" x2="89.7" y2="116.3" stroke-width="1.2" />
  <line x1="230.3" y1="116.3" x2="223.7" y2="123.7" stroke-width="1.2" />
  <line x1="171.1" y1="117.5" x2="161.2" y2="118.5" stroke-width="1.2" />
  <line x1="171.5" y1="121.5" x2="161.6" y2="122.5" stroke-width="1.2" />
  <line x1="231.3" y1="175.3" x2="231.3" y2="185.3" stroke-width="1.2" />
  <line x1="235.3" y1="175.3" x2="235.3" y2="185.3" stroke-width="1.2" />
  <text x="160" y="52.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="13.4" y="189.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="306.6" y="189.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="172.7" y="198.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`סמנו $\angle ABC=\beta$. אילו זוויות נוספות שוות ל-$\beta$?`,
          String.raw`$\angle ACB=\beta$ (המשולש $ABC$ שווה שוקיים) ו-$\angle DAC=\beta$ (המשולש $ADC$ שווה שוקיים). כתבו את סכום הזוויות במשולש $ABC$.`,
          String.raw`$\angle ADB$ היא זווית חיצונית למשולש $ADC$.`,
        ],
        solutionSteps: [
          String.raw`נסמן $\angle ABC=\beta$. $AB=AC$, ולכן $\angle ACB=\beta$ (זוויות הבסיס במשולש שווה שוקיים).`,
          String.raw`$AD=DC$, ולכן גם במשולש $ADC$: $\angle DAC=\angle DCA=\beta$.`,
          String.raw`$\angle BAC=\angle BAD+\angle DAC=54^\circ+\beta$. סכום הזוויות במשולש $ABC$: $(54^\circ+\beta)+\beta+\beta=180^\circ$, ולכן $3\beta=126^\circ$ ו-$\beta=42^\circ$.`,
          String.raw`$\angle ADB$ היא זווית חיצונית למשולש $ADC$, ולכן $\angle ADB=\angle DAC+\angle DCA=42^\circ+42^\circ=84^\circ$.`,
        ],
        finalAnswer: String.raw`$\angle ABC=42^\circ$, $\angle ADB=84^\circ$`,
        answers: [
          { label: String.raw`$\angle ABC$`, value: 42 },
          { label: String.raw`$\angle ADB$`, value: 84 },
        ],
      },
      {
        id: 'geo-triangles-basic-5',
        difficulty: 2,
        statement: String.raw`הקטעים $AC$ ו-$BD$ נחתכים בנקודה $O$, שהיא אמצע של שניהם (ראו שרטוט). נתון: $AB=7$ ו-$\angle OAB=50^\circ$. חשבו את $CD$ ואת $\angle OCD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="89.9" y1="120" x2="230.1" y2="120" />
  <line x1="168.8" y1="26" x2="151.2" y2="214" />
  <line x1="89.9" y1="120" x2="168.8" y2="26" />
  <line x1="230.1" y1="120" x2="151.2" y2="214" />
  <path d="M 109.9 120 A 20 20 0 0 0 102.7 104.7" stroke-width="1.2" />
  <line x1="124.9" y1="115" x2="124.9" y2="125" stroke-width="1.2" />
  <line x1="195.1" y1="115" x2="195.1" y2="125" stroke-width="1.2" />
  <line x1="169.5" y1="71.5" x2="159.6" y2="70.5" stroke-width="1.2" />
  <line x1="169.2" y1="75.5" x2="159.2" y2="74.5" stroke-width="1.2" />
  <line x1="160.8" y1="165.5" x2="150.8" y2="164.5" stroke-width="1.2" />
  <line x1="160.4" y1="169.5" x2="150.5" y2="168.5" stroke-width="1.2" />
  <text x="76.9" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="168.8" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="243.1" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="151.2" y="232.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="169.2" y="134.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
</svg>`,
        hints: [
          String.raw`חפשו שני משולשים חופפים: $\triangle AOB$ ו-$\triangle COD$.`,
          String.raw`$AO=OC$, $BO=OD$ ו-$\angle AOB=\angle COD$ (זוויות קודקודיות) – משפט החפיפה צ.ז.צ.`,
        ],
        solutionSteps: [
          String.raw`$AO=OC$ ו-$BO=OD$ – נתון ($O$ אמצע של שני הקטעים).`,
          String.raw`$\angle AOB=\angle COD$ – זוויות קודקודיות.`,
          String.raw`לכן $\triangle AOB\cong\triangle COD$ לפי משפט החפיפה צ.ז.צ (הזווית כלואה בין שתי הצלעות).`,
          String.raw`מהחפיפה: $CD=AB=7$ (צלעות מתאימות), ו-$\angle OCD=\angle OAB=50^\circ$ (זוויות מתאימות – מול הצלעות השוות $OD$ ו-$OB$).`,
        ],
        finalAnswer: String.raw`$CD=7$, $\angle OCD=50^\circ$`,
        answers: [
          { label: String.raw`$CD$`, value: 7 },
          { label: String.raw`$\angle OCD$`, value: 50 },
        ],
      },
      {
        id: 'geo-triangles-basic-6',
        difficulty: 2,
        statement: String.raw`המשולש $ABC$ שווה צלעות ואורך צלעו $6$. הנקודה $D$ נמצאת על המשך הצלע $BC$ מעבר ל-$C$, כך ש-$CD=CA$ (ראו שרטוט). חשבו את $\angle BAD$ ואת אורך הקטע $AD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="93,62 26,178 160,178" />
  <line x1="160" y1="178" x2="294" y2="178" />
  <line x1="93" y1="62" x2="294" y2="178" />
  <line x1="123.2" y1="124.2" x2="131.8" y2="119.2" stroke-width="1.2" />
  <line x1="121.2" y1="120.8" x2="129.8" y2="115.8" stroke-width="1.2" />
  <line x1="225" y1="173" x2="225" y2="183" stroke-width="1.2" />
  <line x1="229" y1="173" x2="229" y2="183" stroke-width="1.2" />
  <text x="86.5" y="56.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="13.4" y="186.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="160" y="196.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="306.6" y="186.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`$\angle ACD$ צמודה ל-$\angle ACB=60^\circ$, והמשולש $ACD$ שווה שוקיים.`,
          String.raw`$\angle CAD=30^\circ$, ולכן $\angle BAD=90^\circ$. חשבו את $AD$ לפי פיתגורס במשולש $ABD$, שבו $BD=12$.`,
        ],
        solutionSteps: [
          String.raw`במשולש שווה צלעות כל זווית היא $60^\circ$, ולכן $\angle ACD=180^\circ-60^\circ=120^\circ$ (זוויות צמודות).`,
          String.raw`$CD=CA$, ולכן במשולש $ACD$: $\angle CAD=\angle CDA=\frac{180^\circ-120^\circ}{2}=30^\circ$.`,
          String.raw`$\angle BAD=\angle BAC+\angle CAD=60^\circ+30^\circ=90^\circ$.`,
          String.raw`$BD=BC+CD=6+6=12$. במשולש ישר הזווית $ABD$ לפי פיתגורס: $AD^2=BD^2-AB^2=144-36=108$, ולכן $AD=\sqrt{108}=6\sqrt3\approx10.39$.`,
        ],
        finalAnswer: String.raw`$\angle BAD=90^\circ$, $AD=6\sqrt3$`,
        answers: [
          { label: String.raw`$\angle BAD$`, value: 90 },
          { label: String.raw`$AD$`, value: 6 * Math.sqrt(3) },
        ],
      },
      {
        id: 'geo-triangles-basic-7',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ נתון $AB=AC=10$. $BE$ הוא הגובה לשוק $AC$, ואורכו $8$ (הנקודה $E$ נמצאת על הצלע $AC$; ראו שרטוט). חשבו את $AE$ ואת אורך הבסיס $BC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="42.5,214 183.5,26 277.5,214" />
  <line x1="183.5" y1="26" x2="183.5" y2="214" stroke-width="1.5" />
  <polyline points="183.5,205 192.5,205 192.5,214" stroke-width="1" />
  <line x1="109" y1="117" x2="117" y2="123" stroke-width="1.2" />
  <line x1="160" y1="209" x2="160" y2="219" stroke-width="1.2" />
  <text x="29.9" y="222.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="183.5" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="288.8" y="226" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="183.5" y="232.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
</svg>`,
        hints: [
          String.raw`במשולש ישר הזווית $ABE$ ידועים היתר $AB$ והניצב $BE$.`,
          String.raw`$AE=6$, ולכן $EC=AC-AE=4$. עכשיו השתמשו בפיתגורס במשולש $BEC$.`,
        ],
        solutionSteps: [
          String.raw`במשולש $ABE$ הזווית $E$ ישרה ($BE$ גובה). לפי פיתגורס: $AE^2=AB^2-BE^2=100-64=36$, ולכן $AE=6$.`,
          String.raw`$E$ נמצאת על הצלע $AC$, ולכן $EC=AC-AE=10-6=4$.`,
          String.raw`במשולש ישר הזווית $BEC$ לפי פיתגורס: $BC^2=BE^2+EC^2=64+16=80$.`,
          String.raw`$BC=\sqrt{80}=4\sqrt5\approx8.94$.`,
        ],
        finalAnswer: String.raw`$AE=6$, $BC=4\sqrt5$`,
        answers: [
          { label: String.raw`$AE$`, value: 6 },
          { label: String.raw`$BC$`, value: 4 * Math.sqrt(5) },
        ],
      },
      {
        id: 'geo-triangles-basic-8',
        difficulty: 3,
        statement: String.raw`על שוקי הזווית $XAY$, שגודלה $20^\circ$, סימנו את הנקודות $B$ ו-$D$ על $AX$ ואת הנקודות $C$ ו-$E$ על $AY$, כך ש-$AB=BC=CD=DE$ (ראו שרטוט). חשבו את $\angle BCD$ ואת $\angle CDE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="26" y1="168.8" x2="285" y2="168.8" />
  <line x1="26" y1="168.8" x2="294" y2="71.2" />
  <line x1="101.5" y1="168.8" x2="159.3" y2="120.3" />
  <line x1="159.3" y1="120.3" x2="217.1" y2="168.8" />
  <line x1="217.1" y1="168.8" x2="230.2" y2="94.5" />
  <path d="M 56 168.8 A 30 30 0 0 0 54.2 158.5" stroke-width="1.2" />
  <line x1="63.7" y1="163.8" x2="63.7" y2="173.8" stroke-width="1.2" />
  <line x1="127.2" y1="140.7" x2="133.6" y2="148.3" stroke-width="1.2" />
  <line x1="191.4" y1="140.7" x2="185" y2="148.3" stroke-width="1.2" />
  <line x1="218.7" y1="130.7" x2="228.6" y2="132.5" stroke-width="1.2" />
  <text x="13.4" y="177.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="101.5" y="187.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="155.9" y="113.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="217.1" y="187.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="226.8" y="87.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="297.5" y="177.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">X</text>
  <text x="305.3" y="70.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">Y</text>
</svg>`,
        hints: [
          String.raw`התחילו מהמשולש שווה השוקיים $ABC$: $\angle BCA=20^\circ$, ו-$\angle CBD$ היא זווית חיצונית שלו.`,
          String.raw`$\angle CBD=40^\circ$, ומכאן $\angle CDB=40^\circ$ (המשולש $BCD$ שווה שוקיים). $\angle DCE$ היא זווית חיצונית למשולש $ACD$.`,
        ],
        solutionSteps: [
          String.raw`$AB=BC$, ולכן $\angle BCA=\angle BAC=20^\circ$ (המשולש $ABC$ שווה שוקיים).`,
          String.raw`$\angle CBD$ היא זווית חיצונית למשולש $ABC$: $\angle CBD=20^\circ+20^\circ=40^\circ$.`,
          String.raw`$BC=CD$, ולכן $\angle CDB=\angle CBD=40^\circ$, ובמשולש $BCD$: $\angle BCD=180^\circ-40^\circ-40^\circ=100^\circ$.`,
          String.raw`$\angle DCE$ היא זווית חיצונית למשולש $ACD$: $\angle DCE=\angle CAD+\angle ADC=20^\circ+40^\circ=60^\circ$.`,
          String.raw`$CD=DE$, ולכן $\angle DEC=\angle DCE=60^\circ$, ובמשולש $CDE$: $\angle CDE=180^\circ-60^\circ-60^\circ=60^\circ$ (המשולש $CDE$ שווה צלעות).`,
        ],
        finalAnswer: String.raw`$\angle BCD=100^\circ$, $\angle CDE=60^\circ$`,
        answers: [
          { label: String.raw`$\angle BCD$`, value: 100 },
          { label: String.raw`$\angle CDE$`, value: 60 },
        ],
      },
    ],
  },
  'geo-triangles-advanced': {
    intro: String.raw`בשיעור זה משלבים כמה משפטים בחישוב אחד: קטע אמצעים במשולש, התיכון ליתר במשולש ישר זווית, הניצב שמול זווית של $30^\circ$, מפגש התיכונים, והזוויות שבין גובה, תיכון וחוצה זווית. אלה בדיוק הכלים שחוזרים בסעיפי החישוב של שאלה 4 בבגרות – לרוב אחרי שמוכיחים משהו בסעיף הקודם. הדרך: לסמן בשרטוט כל נתון ולחפש משולש שבו אפשר להפעיל משפט.`,
    keyFacts: [
      String.raw`**קטע אמצעים במשולש** – הקטע המחבר את אמצעי שתי צלעות – מקביל לצלע השלישית ושווה למחציתה. ההפך: ישר היוצא מאמצע צלע אחת ומקביל לצלע שנייה חוצה את הצלע השלישית.`,
      String.raw`**התיכון ליתר** במשולש ישר זווית שווה למחצית היתר. ההפך: אם תיכון שווה למחצית הצלע שאליה הוא יורד, המשולש ישר זווית.`,
      String.raw`במשולש ישר זווית **הניצב שמול זווית של $30^\circ$ שווה למחצית היתר**, ולהפך – אם ניצב שווה למחצית היתר, הזווית שמולו היא $30^\circ$.`,
      String.raw`**שלושת התיכונים** במשולש נפגשים בנקודה אחת, המחלקת כל תיכון ביחס $2:1$ החל מהקודקוד.`,
      String.raw`**שיטה**: משרשרים – כל תוצאה של שלב (אורך, זווית, משולש שווה שוקיים) הופכת לנתון של השלב הבא. כשחסר קטע אמצעים – מעבירים ישר עזר מקביל דרך אמצע של צלע.`,
    ],
    exercises: [
      {
        id: 'geo-triangles-advanced-1',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ הנקודות $D$ ו-$E$ הן אמצעי הצלעות $AB$ ו-$AC$ (ראו שרטוט). נתון: $AB=10$, $AC=12$, $BC=14$. חשבו את $DE$ ואת היקף המשולש $ADE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="129.9,39.6 26,200.4 294,200.4" />
  <line x1="78" y1="120" x2="212" y2="120" />
  <line x1="108.1" y1="82.5" x2="99.7" y2="77.1" stroke-width="1.2" />
  <line x1="56.2" y1="162.9" x2="47.8" y2="157.5" stroke-width="1.2" />
  <line x1="173" y1="74.8" x2="166" y2="82" stroke-width="1.2" />
  <line x1="175.9" y1="77.6" x2="168.9" y2="84.8" stroke-width="1.2" />
  <line x1="255.1" y1="155.2" x2="248.1" y2="162.4" stroke-width="1.2" />
  <line x1="257.9" y1="158" x2="250.9" y2="165.2" stroke-width="1.2" />
  <text x="126.6" y="32.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="14.7" y="212.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="305.3" y="212.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="66.7" y="119" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="221.2" y="116.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
</svg>`,
        hints: [
          String.raw`$DE$ הוא קטע אמצעים במשולש $ABC$.`,
          String.raw`קטע אמצעים שווה למחצית הצלע השלישית, ו-$AD$, $AE$ הם מחציות של הצלעות.`,
        ],
        solutionSteps: [
          String.raw`$D$ ו-$E$ הן אמצעי הצלעות $AB$ ו-$AC$, ולכן $DE$ קטע אמצעים במשולש $ABC$: $DE\parallel BC$ ו-$DE=\frac{BC}{2}=7$.`,
          String.raw`$AD=\frac{AB}{2}=5$ ו-$AE=\frac{AC}{2}=6$.`,
          String.raw`היקף המשולש $ADE$: $5+6+7=18$ – מחצית מהיקף המשולש $ABC$.`,
        ],
        finalAnswer: String.raw`$DE=7$, והיקף המשולש $ADE$ הוא $18$.`,
        answers: [
          { label: String.raw`$DE$`, value: 7 },
          { label: String.raw`היקף $\triangle ADE$`, value: 18 },
        ],
      },
      {
        id: 'geo-triangles-advanced-2',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ נתון $\angle ACB=90^\circ$, $AC=6$ ו-$BC=8$. $CM$ הוא התיכון ליתר (ראו שרטוט). חשבו את $CM$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="34.7,26 285.3,214 34.7,214" />
  <line x1="34.7" y1="214" x2="160" y2="120" stroke-width="1.5" />
  <polyline points="34.7,205 43.7,205 43.7,214" stroke-width="1" />
  <line x1="100.3" y1="69" x2="94.3" y2="77" stroke-width="1.2" />
  <line x1="225.7" y1="163" x2="219.7" y2="171" stroke-width="1.2" />
  <text x="25.5" y="22.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="296.6" y="226" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="23.4" y="226" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="169.2" y="116.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">M</text>
</svg>`,
        hints: [
          String.raw`חשבו את היתר $AB$ לפי משפט פיתגורס.`,
          String.raw`התיכון ליתר שווה למחצית היתר.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט פיתגורס: $AB^2=6^2+8^2=100$, ולכן $AB=10$.`,
          String.raw`במשולש ישר זווית התיכון ליתר שווה למחצית היתר: $CM=\frac{AB}{2}=5$.`,
        ],
        finalAnswer: String.raw`$CM=5$`,
        answers: [{ label: String.raw`$CM$`, value: 5 }],
      },
      {
        id: 'geo-triangles-advanced-3',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $\angle ACB=90^\circ$, $\angle BAC=30^\circ$ ו-$BC=5$. $CD$ הוא הגובה ליתר (ראו שרטוט). חשבו את $AB$, את $BD$ ואת $AD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="105.7,26 214.3,214 105.7,214" />
  <line x1="105.7" y1="214" x2="187.1" y2="167" stroke-width="1.5" />
  <polyline points="105.7,205 114.7,205 114.7,214" stroke-width="1" />
  <polyline points="179.3,171.5 183.8,179.3 191.6,174.8" stroke-width="1" />
  <path d="M 105.7 52 A 26 26 0 0 0 118.7 48.5" stroke-width="1.2" />
  <text x="102.4" y="18.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="223.5" y="228.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="96.5" y="228.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="198.4" y="166" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`$BC$ הוא הניצב שמול הזווית של $30^\circ$.`,
          String.raw`במשולש $BCD$: $\angle B=60^\circ$, ולכן $\angle BCD=30^\circ$. איזה ניצב נמצא מול הזווית הזו?`,
        ],
        solutionSteps: [
          String.raw`במשולש ישר הזווית $ABC$ הניצב $BC$ נמצא מול הזווית $\angle A=30^\circ$, ולכן הוא שווה למחצית היתר: $AB=2BC=10$.`,
          String.raw`$\angle ABC=180^\circ-90^\circ-30^\circ=60^\circ$. במשולש ישר הזווית $BCD$ ($\angle BDC=90^\circ$): $\angle BCD=180^\circ-90^\circ-60^\circ=30^\circ$.`,
          String.raw`במשולש $BCD$ הניצב $BD$ נמצא מול הזווית של $30^\circ$, ולכן $BD=\frac{BC}{2}=2.5$.`,
          String.raw`$AD=AB-BD=10-2.5=7.5$.`,
        ],
        finalAnswer: String.raw`$AB=10$, $BD=2.5$, $AD=7.5$`,
        answers: [
          { label: String.raw`$AB$`, value: 10 },
          { label: String.raw`$BD$`, value: 2.5 },
          { label: String.raw`$AD$`, value: 7.5 },
        ],
      },
      {
        id: 'geo-triangles-advanced-4',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $\angle ABC=70^\circ$ ו-$\angle ACB=30^\circ$. $AD$ הוא הגובה ו-$AE$ הוא חוצה הזווית $A$ (הנקודות $D$ ו-$E$ על $BC$; ראו שרטוט). חשבו את $\angle DAE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="72.5,56.1 26,183.9 294,183.9" />
  <line x1="72.5" y1="56.1" x2="72.5" y2="183.9" stroke-width="1.5" />
  <line x1="72.5" y1="56.1" x2="119.1" y2="183.9" stroke-width="1.5" />
  <polyline points="72.5,174.9 81.5,174.9 81.5,183.9" stroke-width="1" />
  <path d="M 62.3 84.3 A 30 30 0 0 0 82.8 84.3" stroke-width="1.2" />
  <path d="M 84.2 88 A 34 34 0 0 0 102 73.1" stroke-width="1.2" />
  <text x="66" y="50.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="13.4" y="192.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="306.6" y="192.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="72.5" y="202.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="119.1" y="202.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
</svg>`,
        hints: [
          String.raw`חשבו את $\angle BAC$ ואת $\angle BAE$.`,
          String.raw`במשולש ישר הזווית $ABD$ חשבו את $\angle BAD$, ואז $\angle DAE=\angle BAE-\angle BAD$.`,
        ],
        solutionSteps: [
          String.raw`סכום הזוויות במשולש: $\angle BAC=180^\circ-70^\circ-30^\circ=80^\circ$.`,
          String.raw`$AE$ חוצה את $\angle BAC$, ולכן $\angle BAE=40^\circ$.`,
          String.raw`במשולש $ABD$ ($\angle ADB=90^\circ$): $\angle BAD=180^\circ-90^\circ-70^\circ=20^\circ$.`,
          String.raw`$D$ נמצאת בין $B$ ל-$E$, ולכן $\angle DAE=\angle BAE-\angle BAD=40^\circ-20^\circ=20^\circ$. (באופן כללי $\angle DAE=\frac{\angle B-\angle C}{2}$.)`,
        ],
        finalAnswer: String.raw`$\angle DAE=20^\circ$`,
        answers: [{ label: String.raw`$\angle DAE$`, value: 20 }],
      },
      {
        id: 'geo-triangles-advanced-5',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $\angle ACB=90^\circ$, $AC=6$ ו-$BC=8$. $CM$ ו-$AN$ הם תיכונים, והם נפגשים בנקודה $G$ (ראו שרטוט). חשבו את $CG$ ואת $AG$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="34.7,26 285.3,214 34.7,214" />
  <line x1="34.7" y1="214" x2="160" y2="120" stroke-width="1.5" />
  <line x1="34.7" y1="26" x2="160" y2="214" stroke-width="1.5" />
  <polyline points="34.7,205 43.7,205 43.7,214" stroke-width="1" />
  <circle cx="118.2" cy="151.3" r="2.5" fill="currentColor" />
  <text x="28.2" y="20.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="297.9" y="222.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="23.4" y="226" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="166.5" y="114.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">M</text>
  <text x="160" y="232.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">N</text>
  <text x="105.7" y="153.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">G</text>
</svg>`,
        hints: [
          String.raw`$CM$ הוא התיכון ליתר, ולכן $CM=\frac{AB}{2}$.`,
          String.raw`מפגש התיכונים מחלק כל תיכון ביחס $2:1$ מהקודקוד: $CG=\frac23CM$. את $AN$ מחשבים בפיתגורס במשולש $ACN$.`,
        ],
        solutionSteps: [
          String.raw`לפי פיתגורס $AB=\sqrt{36+64}=10$, והתיכון ליתר שווה למחצית היתר: $CM=5$.`,
          String.raw`$G$ היא מפגש התיכונים, והיא מחלקת את התיכון ביחס $2:1$ מהקודקוד: $CG=\frac23\cdot5=\frac{10}{3}\approx3.33$.`,
          String.raw`$N$ אמצע $BC$, ולכן $CN=4$. במשולש ישר הזווית $ACN$: $AN=\sqrt{6^2+4^2}=\sqrt{52}=2\sqrt{13}$.`,
          String.raw`$AG=\frac23AN=\frac{4\sqrt{13}}{3}\approx4.81$.`,
        ],
        finalAnswer: String.raw`$CG=\frac{10}{3}$, $AG=\frac{4\sqrt{13}}{3}$`,
        answers: [
          { label: String.raw`$CG$`, value: 10 / 3 },
          { label: String.raw`$AG$`, value: (4 * Math.sqrt(13)) / 3 },
        ],
      },
      {
        id: 'geo-triangles-advanced-6',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $\angle ABC=90^\circ$. $BM$ הוא התיכון ליתר, ונתון ש-$BM=AB=4$ (ראו שרטוט). חשבו את $\angle ACB$ ואת אורך הניצב $BC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26,42.6 26,197.4 294,197.4" />
  <line x1="26" y1="197.4" x2="160" y2="120" stroke-width="1.5" />
  <polyline points="26,188.4 35,188.4 35,197.4" stroke-width="1" />
  <line x1="31" y1="120" x2="21" y2="120" stroke-width="1.2" />
  <line x1="90.5" y1="154.4" x2="95.5" y2="163" stroke-width="1.2" />
  <text x="16.8" y="38.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="14.7" y="209.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="306.6" y="206.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="166.5" y="114.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">M</text>
</svg>`,
        hints: [
          String.raw`התיכון ליתר שווה למחצית היתר, ולכן $AM=BM$.`,
          String.raw`המשולש $ABM$ שווה צלעות, ולכן $\angle BAC=60^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$BM$ הוא התיכון ליתר, ולכן $AM=MC=BM=4$ (התיכון ליתר שווה למחצית היתר), ו-$AC=8$.`,
          String.raw`במשולש $ABM$: $AB=BM=AM=4$, ולכן הוא שווה צלעות ו-$\angle BAC=60^\circ$.`,
          String.raw`סכום הזוויות במשולש $ABC$: $\angle ACB=180^\circ-90^\circ-60^\circ=30^\circ$.`,
          String.raw`לפי פיתגורס: $BC^2=AC^2-AB^2=64-16=48$, ולכן $BC=4\sqrt3\approx6.93$.`,
        ],
        finalAnswer: String.raw`$\angle ACB=30^\circ$, $BC=4\sqrt3$`,
        answers: [
          { label: String.raw`$\angle ACB$`, value: 30 },
          { label: String.raw`$BC$`, value: 4 * Math.sqrt(3) },
        ],
      },
      {
        id: 'geo-triangles-advanced-7',
        difficulty: 3,
        statement: String.raw`במשולש ישר הזווית $ABC$ ($\angle ACB=90^\circ$) נתון $\angle BAC=32^\circ$. מהקודקוד $C$ יוצאים הגובה $CD$, חוצה הזווית $CE$ והתיכון $CM$ ליתר $AB$ (ראו שרטוט). חשבו את $\angle DCM$ ואת $\angle ECD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="294,203.7 26,36.3 26,203.7" />
  <line x1="26" y1="203.7" x2="101.3" y2="83.3" stroke-width="1.5" />
  <line x1="26" y1="203.7" x2="160" y2="120" stroke-width="1.5" />
  <line x1="26" y1="203.7" x2="129.1" y2="100.7" stroke-width="1.5" />
  <polyline points="35,203.7 35,194.7 26,194.7" stroke-width="1" />
  <polyline points="96.5,90.9 88.9,86.2 93.6,78.5" stroke-width="1" />
  <text x="305.3" y="215.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="16.8" y="32.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="16.8" y="218.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="107.8" y="77.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="166.5" y="114.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">M</text>
  <text x="135.6" y="94.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
</svg>`,
        hints: [
          String.raw`$CM$ הוא התיכון ליתר, ולכן $MC=MA$. מה זה אומר על $\angle ACM$?`,
          String.raw`במשולש $BCD$: $\angle BCD=90^\circ-\angle B=32^\circ$. חוצה הזווית יוצר $\angle BCE=45^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$CM$ הוא התיכון ליתר, ולכן $MC=MA=\frac{AB}{2}$. המשולש $AMC$ שווה שוקיים, ו-$\angle ACM=\angle BAC=32^\circ$.`,
          String.raw`$\angle ABC=90^\circ-32^\circ=58^\circ$. במשולש ישר הזווית $BCD$: $\angle BCD=90^\circ-58^\circ=32^\circ$.`,
          String.raw`$\angle DCM=\angle ACB-\angle ACM-\angle BCD=90^\circ-32^\circ-32^\circ=26^\circ$.`,
          String.raw`$CE$ חוצה את הזווית הישרה, ולכן $\angle BCE=45^\circ$ ו-$\angle ECD=\angle BCE-\angle BCD=45^\circ-32^\circ=13^\circ$.`,
          String.raw`שימו לב: גם $\angle MCE=\angle ACE-\angle ACM=45^\circ-32^\circ=13^\circ$, כלומר חוצה הזווית $CE$ חוצה גם את הזווית $DCM$.`,
        ],
        finalAnswer: String.raw`$\angle DCM=26^\circ$, $\angle ECD=13^\circ$`,
        answers: [
          { label: String.raw`$\angle DCM$`, value: 26 },
          { label: String.raw`$\angle ECD$`, value: 13 },
        ],
      },
      {
        id: 'geo-triangles-advanced-8',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ הקטע $AD$ הוא תיכון, והנקודה $E$ היא אמצע $AD$. הישר $BE$ חותך את הצלע $AC$ בנקודה $F$ (ראו שרטוט). נתון: $AC=12$ ו-$BF=10$. חשבו את $AF$ ואת $EF$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="41.8,214 179.7,26 278.2,214" />
  <line x1="41.8" y1="214" x2="229" y2="120" stroke-width="1.5" />
  <line x1="179.7" y1="26" x2="120.6" y2="214" stroke-width="1.5" />
  <line x1="208.8" y1="70.7" x2="199.9" y2="75.3" stroke-width="1.2" />
  <line x1="258" y1="164.7" x2="249.2" y2="169.3" stroke-width="1.2" />
  <line x1="84.5" y1="186.9" x2="89" y2="195.9" stroke-width="1.2" />
  <line x1="88.1" y1="185.1" x2="92.6" y2="194.1" stroke-width="1.2" />
  <line x1="178.1" y1="139.9" x2="182.6" y2="148.9" stroke-width="1.2" />
  <line x1="181.7" y1="138.1" x2="186.2" y2="147.1" stroke-width="1.2" />
  <text x="30.5" y="226" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="179.7" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="289.5" y="226" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="240.2" y="119" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="126.2" y="163.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="120.6" y="232.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
</svg>`,
        hints: [
          String.raw`העבירו דרך $D$ ישר המקביל ל-$BF$, החותך את $AC$ בנקודה $K$.`,
          String.raw`במשולש $BCF$: $D$ אמצע $BC$ ו-$DK\parallel BF$, ולכן $K$ אמצע $FC$. במשולש $ADK$: $E$ אמצע $AD$ ו-$EF\parallel DK$.`,
          String.raw`מקבלים $AF=FK=KC$; ובאותם משולשים $DK=\frac{BF}{2}$ ו-$EF=\frac{DK}{2}$.`,
        ],
        solutionSteps: [
          String.raw`נעביר דרך $D$ ישר המקביל ל-$BF$, ונסמן ב-$K$ את נקודת החיתוך שלו עם $AC$.`,
          String.raw`במשולש $BCF$: $D$ אמצע $BC$ ($AD$ תיכון) ו-$DK\parallel BF$, ולכן $K$ אמצע $FC$ (ישר היוצא מאמצע צלע ומקביל לצלע שנייה חוצה את הצלע השלישית). $DK$ הוא קטע אמצעים: $DK=\frac{BF}{2}=5$.`,
          String.raw`במשולש $ADK$: $E$ אמצע $AD$ ו-$EF\parallel DK$, ולכן $F$ אמצע $AK$, ו-$EF$ הוא קטע אמצעים: $EF=\frac{DK}{2}=2.5$.`,
          String.raw`מכאן $AF=FK=KC$, ולכן $AF=\frac{AC}{3}=4$.`,
        ],
        finalAnswer: String.raw`$AF=4$, $EF=2.5$`,
        answers: [
          { label: String.raw`$AF$`, value: 4 },
          { label: String.raw`$EF$`, value: 2.5 },
        ],
      },
    ],
  },
  'geo-triangles-proof': {
    intro: String.raw`בשאלה 4 בבגרות רוב הסעיפים הם הוכחות. בשיעור זה מתרגלים הוכחות במשולשים: בוחרים זוג משולשים, מוכיחים שהם חופפים לפי אחד מארבעת משפטי החפיפה, ומסיקים מהחפיפה שוויון של צלעות או של זוויות. כותבים כל הוכחה כשרשרת של טענות, ולכל טענה נימוק (נתון, הגדרה או משפט) – כמו בטבלת טענה–נימוק. בסוף חלק מהתרגילים יש סעיף חישוב קצר, כמו בבגרות.`,
    keyFacts: [
      String.raw`**מבנה הוכחה**: טענה ← נימוק. נימוק הוא נתון, הגדרה (למשל ״תיכון מחבר קודקוד לאמצע הצלע שמולו״) או משפט בשמו המלא.`,
      String.raw`**משפטי החפיפה**: צ.ז.צ (הזווית כלואה בין שתי הצלעות), ז.צ.ז (הצלע נמצאת בין שתי הזוויות), צ.צ.צ, וצ.צ.ז (הזווית נמצאת מול הצלע **הגדולה** מבין השתיים – למשל יתר וניצב במשולשים ישרי זווית).`,
      String.raw`**מסקנה מחפיפה**: ״במשולשים חופפים מול זוויות שוות מונחות צלעות שוות״, ולהפך. כותבים את המשולשים בסדר קודקודים מתאים: $\triangle ABD\cong\triangle ACD$ פירושו $A\leftrightarrow A$, $B\leftrightarrow C$, $D\leftrightarrow D$.`,
      String.raw`**כלים נפוצים**: צלע משותפת, זוויות קודקודיות, זוויות בסיס במשולש שווה שוקיים, וחיבור או חיסור של קטעים וזוויות שווים.`,
      String.raw`**טעויות נפוצות**: ״ז.ז.ז״ אינו משפט חפיפה (זה דמיון בלבד), וצ.צ.ז תקף רק כשהזווית נמצאת מול הצלע הגדולה.`,
    ],
    exercises: [
      {
        id: 'geo-triangles-proof-1',
        difficulty: 1,
        statement: String.raw`במרובע $ABCD$ נתון $AB=AD$ ו-$CB=CD$ (ראו שרטוט). הוכיחו: $AC$ חוצה את הזווית $BAD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160,26 94.2,91.8 160,214 225.8,91.8" />
  <line x1="160" y1="26" x2="160" y2="214" stroke-width="1.5" />
  <line x1="130.6" y1="62.4" x2="123.6" y2="55.4" stroke-width="1.2" />
  <line x1="196.4" y1="55.4" x2="189.4" y2="62.4" stroke-width="1.2" />
  <line x1="123.6" y1="157" x2="132.5" y2="152.3" stroke-width="1.2" />
  <line x1="121.7" y1="153.5" x2="130.6" y2="148.8" stroke-width="1.2" />
  <line x1="187.5" y1="152.3" x2="196.4" y2="157" stroke-width="1.2" />
  <line x1="189.4" y1="148.8" x2="198.3" y2="153.5" stroke-width="1.2" />
  <text x="160" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="81.6" y="93.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="160" y="232.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="238.4" y="93.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`התבוננו במשולשים $ABC$ ו-$ADC$. איזו צלע משותפת להם?`,
          String.raw`שלוש צלעות שוות – משפט החפיפה צ.צ.צ.`,
        ],
        solutionSteps: [
          String.raw`$AB=AD$ – נתון.`,
          String.raw`$CB=CD$ – נתון.`,
          String.raw`$AC=AC$ – צלע משותפת.`,
          String.raw`$\triangle ABC\cong\triangle ADC$ – לפי משפט החפיפה צ.צ.צ.`,
          String.raw`$\angle BAC=\angle DAC$ – זוויות מתאימות במשולשים חופפים (מול הצלעות השוות $CB$ ו-$CD$). לכן $AC$ חוצה את $\angle BAD$.`,
        ],
        finalAnswer: String.raw`$\triangle ABC\cong\triangle ADC$ (צ.צ.צ), ולכן $\angle BAC=\angle DAC$.`,
      },
      {
        id: 'geo-triangles-proof-2',
        difficulty: 1,
        statement: String.raw`הקטעים $AC$ ו-$BD$ נחתכים בנקודה $O$, כך ש-$AO=OC$ ו-$BO=OD$ (ראו שרטוט). הוכיחו: $AB=CD$ ו-$AB\parallel CD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="42.5" y1="91.8" x2="277.5" y2="148.2" />
  <line x1="202.3" y1="26" x2="117.7" y2="214" />
  <line x1="42.5" y1="91.8" x2="202.3" y2="26" />
  <line x1="277.5" y1="148.2" x2="117.7" y2="214" />
  <line x1="102.4" y1="101" x2="100.1" y2="110.8" stroke-width="1.2" />
  <line x1="219.9" y1="129.2" x2="217.6" y2="139" stroke-width="1.2" />
  <line x1="186.5" y1="73.2" x2="177.4" y2="69.1" stroke-width="1.2" />
  <line x1="184.9" y1="76.9" x2="175.8" y2="72.8" stroke-width="1.2" />
  <line x1="144.2" y1="167.2" x2="135.1" y2="163.1" stroke-width="1.2" />
  <line x1="142.6" y1="170.9" x2="133.5" y2="166.8" stroke-width="1.2" />
  <text x="29.9" y="93.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="208.8" y="20.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="290.1" y="157.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="111.2" y="230.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="166.5" y="136.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
</svg>`,
        hints: [
          String.raw`חפשו זוג משולשים שבהם $AB$ ו-$CD$ הן צלעות מתאימות.`,
          String.raw`ב-$\triangle AOB$ וב-$\triangle COD$ יש שתי צלעות שוות, והזוויות $\angle AOB$ ו-$\angle COD$ קודקודיות.`,
          String.raw`להקבלה: מהחפיפה $\angle BAO=\angle DCO$ – אלה זוויות מתחלפות.`,
        ],
        solutionSteps: [
          String.raw`$AO=OC$ ו-$BO=OD$ – נתון.`,
          String.raw`$\angle AOB=\angle COD$ – זוויות קודקודיות.`,
          String.raw`$\triangle AOB\cong\triangle COD$ – לפי משפט החפיפה צ.ז.צ (הזווית כלואה בין שתי הצלעות השוות).`,
          String.raw`$AB=CD$ – צלעות מתאימות במשולשים חופפים (מול הזוויות הקודקודיות השוות).`,
          String.raw`$\angle BAO=\angle DCO$ – זוויות מתאימות במשולשים חופפים. אלה זוויות מתחלפות בין הישרים $AB$ ו-$CD$ והחותך $AC$, ולכן $AB\parallel CD$ (זוויות מתחלפות שוות מעידות על ישרים מקבילים).`,
        ],
        finalAnswer: String.raw`$\triangle AOB\cong\triangle COD$ (צ.ז.צ), ולכן $AB=CD$ ו-$AB\parallel CD$.`,
      },
      {
        id: 'geo-triangles-proof-3',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $AB=AC$. הנקודות $D$ ו-$E$ נמצאות על הצלע $BC$ כך ש-$BD=CE$ (ראו שרטוט). הוכיחו: $AD=AE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160,41.8 26,198.2 294,198.2" />
  <line x1="160" y1="41.8" x2="110.9" y2="198.2" />
  <line x1="160" y1="41.8" x2="209.1" y2="198.2" />
  <line x1="96.8" y1="123.3" x2="89.2" y2="116.7" stroke-width="1.2" />
  <line x1="230.8" y1="116.7" x2="223.2" y2="123.3" stroke-width="1.2" />
  <line x1="66.4" y1="193.2" x2="66.4" y2="203.2" stroke-width="1.2" />
  <line x1="70.4" y1="193.2" x2="70.4" y2="203.2" stroke-width="1.2" />
  <line x1="249.6" y1="193.2" x2="249.6" y2="203.2" stroke-width="1.2" />
  <line x1="253.6" y1="193.2" x2="253.6" y2="203.2" stroke-width="1.2" />
  <text x="160" y="34.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="13.4" y="207" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="306.6" y="207" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="110.9" y="216.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="209.1" y="216.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
</svg>`,
        hints: [
          String.raw`השוו את המשולשים $ABD$ ו-$ACE$.`,
          String.raw`$AB=AC$, $BD=CE$, ו-$\angle B=\angle C$ (זוויות בסיס) – צ.ז.צ.`,
        ],
        solutionSteps: [
          String.raw`$AB=AC$ – נתון.`,
          String.raw`$\angle ABD=\angle ACE$ – זוויות הבסיס במשולש שווה שוקיים שוות.`,
          String.raw`$BD=CE$ – נתון.`,
          String.raw`$\triangle ABD\cong\triangle ACE$ – לפי משפט החפיפה צ.ז.צ.`,
          String.raw`$AD=AE$ – צלעות מתאימות במשולשים חופפים (מול הזוויות השוות $\angle B$ ו-$\angle C$). כלומר המשולש $ADE$ שווה שוקיים.`,
        ],
        finalAnswer: String.raw`$\triangle ABD\cong\triangle ACE$ (צ.ז.צ), ולכן $AD=AE$.`,
      },
      {
        id: 'geo-triangles-proof-4',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $AB=AC$. $BE$ ו-$CF$ הם התיכונים לשוקיים $AC$ ו-$AB$ (ראו שרטוט). הוכיחו: $BE=CF$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160,26 66,214 254,214" />
  <line x1="66" y1="214" x2="207" y2="120" stroke-width="1.5" />
  <line x1="254" y1="214" x2="113" y2="120" stroke-width="1.5" />
  <line x1="141" y1="75.2" x2="132" y2="70.8" stroke-width="1.2" />
  <line x1="94" y1="169.2" x2="85" y2="164.8" stroke-width="1.2" />
  <line x1="188" y1="70.8" x2="179" y2="75.2" stroke-width="1.2" />
  <line x1="235" y1="164.8" x2="226" y2="169.2" stroke-width="1.2" />
  <text x="160" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="56.8" y="228.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="263.2" y="228.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="218.3" y="119" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="101.7" y="119" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
</svg>`,
        hints: [
          String.raw`השוו את המשולשים $FBC$ ו-$ECB$ – יש להם צלע משותפת.`,
          String.raw`$BF=CE$ כי אלה מחציות של שוקיים שוות, ו-$\angle FBC=\angle ECB$.`,
        ],
        solutionSteps: [
          String.raw`$F$ אמצע $AB$ ו-$E$ אמצע $AC$ (הגדרת תיכון), ו-$AB=AC$, ולכן $BF=\frac{AB}{2}=\frac{AC}{2}=CE$.`,
          String.raw`$\angle FBC=\angle ECB$ – זוויות הבסיס במשולש שווה שוקיים.`,
          String.raw`$BC=CB$ – צלע משותפת.`,
          String.raw`$\triangle FBC\cong\triangle ECB$ – לפי משפט החפיפה צ.ז.צ.`,
          String.raw`$CF=BE$ – צלעות מתאימות במשולשים חופפים.`,
        ],
        finalAnswer: String.raw`$\triangle FBC\cong\triangle ECB$ (צ.ז.צ), ולכן $BE=CF$.`,
      },
      {
        id: 'geo-triangles-proof-5',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $AB=AC$. $BE$ ו-$CF$ הם הגבהים לשוקיים, והם נחתכים בנקודה $H$ (ראו שרטוט).

א. הוכיחו: $BE=CF$.

ב. נתון: $\angle BAC=50^\circ$. חשבו את $\angle BHC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160,26 72.3,214 247.7,214" />
  <line x1="72.3" y1="214" x2="216.4" y2="146.8" stroke-width="1.5" />
  <line x1="247.7" y1="214" x2="103.6" y2="146.8" stroke-width="1.5" />
  <polyline points="208.2,150.6 204.4,142.5 212.5,138.7" stroke-width="1" />
  <polyline points="111.8,150.6 115.6,142.5 107.5,138.7" stroke-width="1" />
  <line x1="120.7" y1="122.1" x2="111.6" y2="117.9" stroke-width="1.2" />
  <line x1="208.4" y1="117.9" x2="199.3" y2="122.1" stroke-width="1.2" />
  <text x="160" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="61.1" y="226" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="258.9" y="226" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="227.6" y="145.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="92.4" y="145.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
  <text x="160" y="191.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">H</text>
</svg>`,
        hints: [
          String.raw`השוו את המשולשים $BEC$ ו-$CFB$: בשניהם יש זווית ישרה, והצלע $BC$ משותפת.`,
          String.raw`$\angle ECB=\angle FBC$ (זוויות בסיס), ולכן גם הזוויות השלישיות שוות – ז.צ.ז.`,
          String.raw`לסעיף ב: במרובע $AFHE$ יש שתי זוויות ישרות.`,
        ],
        solutionSteps: [
          String.raw`א. $\angle BEC=\angle CFB=90^\circ$ – $BE$ ו-$CF$ גבהים.`,
          String.raw`$\angle ECB=\angle FBC$ – זוויות הבסיס במשולש שווה שוקיים. לכן גם $\angle EBC=\angle FCB$ (סכום הזוויות בכל משולש הוא $180^\circ$).`,
          String.raw`$BC=CB$ – צלע משותפת. לכן $\triangle BEC\cong\triangle CFB$ לפי משפט החפיפה ז.צ.ז, ו-$BE=CF$ (צלעות מתאימות במשולשים חופפים).`,
          String.raw`ב. במרובע $AFHE$: $\angle AFH=\angle AEH=90^\circ$ (גבהים), וסכום הזוויות במרובע $360^\circ$, ולכן $\angle FHE=360^\circ-90^\circ-90^\circ-50^\circ=130^\circ$.`,
          String.raw`$\angle BHC=\angle FHE=130^\circ$ – זוויות קודקודיות.`,
        ],
        finalAnswer: String.raw`א. $\triangle BEC\cong\triangle CFB$ (ז.צ.ז), ולכן $BE=CF$. ב. $\angle BHC=130^\circ$.`,
        answers: [{ label: String.raw`$\angle BHC$`, value: 130 }],
      },
      {
        id: 'geo-triangles-proof-6',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ הנקודה $D$ היא אמצע הצלע $BC$. $DE\perp AB$ ו-$DF\perp AC$ (הנקודות $E$ ו-$F$ על הצלעות), ונתון ש-$DE=DF$ (ראו שרטוט). הוכיחו: $AB=AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160,30.7 26,209.3 294,209.3" />
  <line x1="160" y1="209.3" x2="74.2" y2="145" stroke-width="1.5" />
  <line x1="160" y1="209.3" x2="245.8" y2="145" stroke-width="1.5" />
  <polyline points="81.4,150.4 86.8,143.2 79.6,137.8" stroke-width="1" />
  <polyline points="238.6,150.4 233.2,143.2 240.4,137.8" stroke-width="1" />
  <line x1="93" y1="204.3" x2="93" y2="214.3" stroke-width="1.2" />
  <line x1="227" y1="204.3" x2="227" y2="214.3" stroke-width="1.2" />
  <line x1="115.7" y1="182.4" x2="121.7" y2="174.4" stroke-width="1.2" />
  <line x1="112.5" y1="180" x2="118.5" y2="172" stroke-width="1.2" />
  <line x1="198.3" y1="174.4" x2="204.3" y2="182.4" stroke-width="1.2" />
  <line x1="201.5" y1="172" x2="207.5" y2="180" stroke-width="1.2" />
  <text x="160" y="23.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="13.4" y="218.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="306.6" y="218.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="160" y="227.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="63" y="144" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="257" y="144" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
</svg>`,
        hints: [
          String.raw`השוו את המשולשים ישרי הזווית $BED$ ו-$CFD$.`,
          String.raw`$BD=CD$ (יתרים) ו-$DE=DF$ (ניצבים): צ.צ.ז, כי הזווית הישרה נמצאת מול היתר – הצלע הגדולה.`,
          String.raw`מהחפיפה $\angle B=\angle C$, ומשולש שבו שתי זוויות שוות הוא שווה שוקיים.`,
        ],
        solutionSteps: [
          String.raw`$BD=CD$ – $D$ אמצע $BC$.`,
          String.raw`$DE=DF$ – נתון.`,
          String.raw`$\angle BED=\angle CFD=90^\circ$ – נתון ($DE\perp AB$, $DF\perp AC$). זו הזווית שמול הצלע הגדולה, כי $BD$ ו-$CD$ הם יתרים.`,
          String.raw`$\triangle BED\cong\triangle CFD$ – לפי משפט החפיפה צ.צ.ז.`,
          String.raw`$\angle EBD=\angle FCD$ – זוויות מתאימות במשולשים חופפים, כלומר $\angle ABC=\angle ACB$.`,
          String.raw`$AB=AC$ – במשולש, מול זוויות שוות מונחות צלעות שוות.`,
        ],
        finalAnswer: String.raw`$\triangle BED\cong\triangle CFD$ (צ.צ.ז), ולכן $\angle B=\angle C$ ו-$AB=AC$.`,
      },
      {
        id: 'geo-triangles-proof-7',
        difficulty: 3,
        statement: String.raw`על הצלעות $AB$ ו-$AC$ של המשולש $ABC$ בנו כלפי חוץ את המשולשים שווי הצלעות $ABD$ ו-$ACE$ (ראו שרטוט). הוכיחו: $BE=CD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="150.4,77.3 94.6,188.7 244.6,188.7" />
  <polygon points="150.4,77.3 26,84.7 94.6,188.7" />
  <polygon points="150.4,77.3 244.6,188.7 294,51.3" />
  <line x1="94.6" y1="188.7" x2="294" y2="51.3" stroke-width="1.5" />
  <line x1="244.6" y1="188.7" x2="26" y2="84.7" stroke-width="1.5" />
  <text x="150.4" y="69.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="85.5" y="203.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="253.8" y="203.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="13.4" y="86.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="305.3" y="50.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
</svg>`,
        hints: [
          String.raw`חפשו שני משולשים שהצלעות $BE$ ו-$CD$ שייכות להם ושיש להם קודקוד משותף $A$.`,
          String.raw`השוו את $\triangle DAC$ ו-$\triangle BAE$: $AD=AB$ ו-$AC=AE$.`,
          String.raw`$\angle DAC=\angle DAB+\angle BAC=60^\circ+\angle BAC$, וגם $\angle BAE=\angle BAC+\angle CAE=\angle BAC+60^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$AD=AB$ – צלעות המשולש שווה הצלעות $ABD$.`,
          String.raw`$AC=AE$ – צלעות המשולש שווה הצלעות $ACE$.`,
          String.raw`$\angle DAB=\angle CAE=60^\circ$ – זוויות במשולש שווה צלעות.`,
          String.raw`$\angle DAC=\angle DAB+\angle BAC=60^\circ+\angle BAC$ ו-$\angle BAE=\angle BAC+\angle CAE=\angle BAC+60^\circ$, ולכן $\angle DAC=\angle BAE$.`,
          String.raw`$\triangle DAC\cong\triangle BAE$ – לפי משפט החפיפה צ.ז.צ.`,
          String.raw`$CD=BE$ – צלעות מתאימות במשולשים חופפים (מול הזוויות השוות $\angle DAC$ ו-$\angle BAE$).`,
        ],
        finalAnswer: String.raw`$\triangle DAC\cong\triangle BAE$ (צ.ז.צ), ולכן $BE=CD$.`,
      },
      {
        id: 'geo-triangles-proof-8',
        difficulty: 3,
        statement: String.raw`במשולש ישר הזווית $ABC$ ($\angle BAC=90^\circ$) הקטע $AM$ הוא התיכון ליתר $BC$. המשיכו את $AM$ עד לנקודה $D$, כך ש-$MD=AM$ (ראו שרטוט).

א. הוכיחו: $\triangle ABM\cong\triangle DCM$, ומכאן $AB\parallel CD$.

ב. הוכיחו: $\triangle BAC\cong\triangle DCA$, והסיקו ש-$AM=\frac{BC}{2}$.

ג. נתון: $AB=6$ ו-$AC=8$. חשבו את $AM$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="89.5,214 230.5,214 89.5,26" />
  <line x1="89.5" y1="214" x2="230.5" y2="26" />
  <line x1="89.5" y1="26" x2="230.5" y2="26" />
  <polyline points="98.5,214 98.5,205 89.5,205" stroke-width="1" />
  <line x1="120.8" y1="164" x2="128.8" y2="170" stroke-width="1.2" />
  <line x1="191.3" y1="70" x2="199.3" y2="76" stroke-width="1.2" />
  <line x1="192.5" y1="171.6" x2="200.5" y2="165.6" stroke-width="1.2" />
  <line x1="190.1" y1="168.4" x2="198.1" y2="162.4" stroke-width="1.2" />
  <line x1="122" y1="77.6" x2="130" y2="71.6" stroke-width="1.2" />
  <line x1="119.6" y1="74.4" x2="127.6" y2="68.4" stroke-width="1.2" />
  <text x="83" y="230.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="237" y="230.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="83" y="20.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="237" y="20.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="173" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">M</text>
</svg>`,
        hints: [
          String.raw`א: $BM=MC$, $AM=MD$, והזוויות ב-$M$ קודקודיות – צ.ז.צ. זוויות מתאימות שוות כאן הן זוויות מתחלפות בין $AB$ ל-$CD$.`,
          String.raw`ב: מ-$AB\parallel CD$ ו-$\angle BAC=90^\circ$ נובע $\angle ACD=90^\circ$ (זוויות חד-צדדיות). השוו את $\triangle BAC$ ו-$\triangle DCA$ לפי צ.ז.צ.`,
          String.raw`ג: $AM=\frac{BC}{2}$, ואת $BC$ מחשבים לפי פיתגורס.`,
        ],
        solutionSteps: [
          String.raw`א. $BM=MC$ ($AM$ תיכון), $AM=MD$ (נתון), $\angle AMB=\angle DMC$ (זוויות קודקודיות). לכן $\triangle ABM\cong\triangle DCM$ לפי צ.ז.צ.`,
          String.raw`מהחפיפה: $AB=DC$ (צלעות מתאימות) ו-$\angle BAM=\angle CDM$ (זוויות מתאימות). אלה זוויות מתחלפות בין הישרים $AB$ ו-$CD$ והחותך $AD$, ולכן $AB\parallel CD$.`,
          String.raw`ב. $AB\parallel CD$, ולכן $\angle BAC+\angle ACD=180^\circ$ (זוויות חד-צדדיות בין ישרים מקבילים), כלומר $\angle ACD=90^\circ=\angle BAC$.`,
          String.raw`ב-$\triangle BAC$ וב-$\triangle DCA$: $AB=CD$ (סעיף א), $\angle BAC=\angle DCA=90^\circ$, ו-$AC$ צלע משותפת. לכן $\triangle BAC\cong\triangle DCA$ לפי צ.ז.צ, ו-$BC=AD$ (צלעות מתאימות).`,
          String.raw`$AM=\frac{AD}{2}$ (כי $AM=MD$), ולכן $AM=\frac{BC}{2}$. זו הוכחה של המשפט ״התיכון ליתר שווה למחצית היתר״.`,
          String.raw`ג. לפי פיתגורס $BC=\sqrt{6^2+8^2}=10$, ולכן $AM=5$.`,
        ],
        finalAnswer: String.raw`א, ב – הוכח. ג. $AM=5$`,
        answers: [{ label: String.raw`$AM$`, value: 5 }],
      },
    ],
  },
  'geo-quadrilaterals-basic': {
    intro: String.raw`בשיעור זה מחשבים זוויות ואורכים במרובעים המיוחדים: מקבילית, מלבן, מעוין, ריבוע, טרפז ודלתון. כל חישוב מתחיל בשאלה – איזו תכונה של המרובע נותנת את מה שצריך? (צלעות נגדיות שוות, אלכסונים החוצים זה את זה, אלכסונים מאונכים וכו׳). בשאלה 4 בבגרות התכונות האלה הן הנימוקים של כמעט כל סעיף, ולכן חשוב לכתוב אותן במדויק.`,
    keyFacts: [
      String.raw`**מקבילית**: צלעות נגדיות מקבילות ושוות, זוויות נגדיות שוות, זוויות סמוכות משלימות ל-$180^\circ$, והאלכסונים חוצים זה את זה.`,
      String.raw`**מלבן** – מקבילית עם זווית ישרה; אלכסוניו שווים. **מעוין** – מקבילית שכל צלעותיה שוות; אלכסוניו מאונכים זה לזה וחוצים את זוויותיו. **ריבוע** – מלבן שהוא גם מעוין.`,
      String.raw`**טרפז**: יש לו זוג צלעות נגדיות מקבילות (בסיסים), והזוויות שליד כל שוק משלימות ל-$180^\circ$. **בטרפז שווה שוקיים** זוויות הבסיס שוות והאלכסונים שווים.`,
      String.raw`**דלתון** ($AB=AD$, $CB=CD$): האלכסון הראשי $AC$ חוצה את הזוויות $A$ ו-$C$, מאונך לאלכסון $BD$ וחוצה אותו.`,
      String.raw`**טכניקות**: בטרפז מורידים גבהים ומקבלים מלבן ומשולשים ישרי זווית; חוצה זווית במקבילית יוצר משולש שווה שוקיים (בגלל זוויות מתחלפות); במעוין ובדלתון משתמשים בפיתגורס במשולשים שיוצרים האלכסונים.`,
    ],
    exercises: [
      {
        id: 'geo-quadrilaterals-basic-1',
        difficulty: 1,
        statement: String.raw`במקבילית $ABCD$ הזווית $A$ גדולה פי 2 מהזווית $B$ (ראו שרטוט). חשבו את $\angle A$ ואת $\angle B$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="91.2,176.5 294,176.5 228.8,63.5 26,63.5" />
  <path d="M 107.2 176.5 A 16 16 0 0 0 83.2 162.6" stroke-width="1.2" />
  <path d="M 285 160.9 A 18 18 0 0 0 276 176.5" stroke-width="1.2" />
  <path d="M 283 157.4 A 22 22 0 0 0 272 176.5" stroke-width="1.2" />
  <text x="82" y="191.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="305.3" y="188.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="238" y="59.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="14.7" y="62.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`במקבילית זוויות סמוכות (שליד אותה צלע) משלימות ל-$180^\circ$.`,
          String.raw`סמנו $\angle B=x$: $2x+x=180^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$AD\parallel BC$ ($ABCD$ מקבילית), ולכן $\angle A+\angle B=180^\circ$ (זוויות חד-צדדיות בין ישרים מקבילים).`,
          String.raw`נסמן $\angle B=x$: $2x+x=180^\circ$, ולכן $x=60^\circ$ ו-$\angle A=120^\circ$.`,
          String.raw`במקבילית זוויות נגדיות שוות, ולכן גם $\angle C=\angle A=120^\circ$ ו-$\angle D=\angle B=60^\circ$.`,
        ],
        finalAnswer: String.raw`$\angle A=\angle C=120^\circ$, $\angle B=\angle D=60^\circ$`,
        answers: [
          { label: String.raw`$\angle A$`, value: 120 },
          { label: String.raw`$\angle B$`, value: 60 },
        ],
      },
      {
        id: 'geo-quadrilaterals-basic-2',
        difficulty: 1,
        statement: String.raw`אורכי האלכסונים של המעוין $ABCD$ הם $AC=16$ ו-$BD=12$ (ראו שרטוט). חשבו את אורך צלע המעוין ואת היקפו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="34.7,120 160,214 285.3,120 160,26" />
  <line x1="34.7" y1="120" x2="285.3" y2="120" stroke-width="1.5" />
  <line x1="160" y1="214" x2="160" y2="26" stroke-width="1.5" />
  <text x="21.7" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="160" y="232.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="298.3" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="160" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="150.8" y="134.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
</svg>`,
        hints: [
          String.raw`אלכסוני המעוין חוצים זה את זה ומאונכים זה לזה.`,
          String.raw`במשולש $AOB$: $AO=8$, $BO=6$ ו-$\angle AOB=90^\circ$.`,
        ],
        solutionSteps: [
          String.raw`אלכסוני המעוין חוצים זה את זה, ולכן $AO=8$ ו-$BO=6$ ($O$ – נקודת החיתוך שלהם).`,
          String.raw`אלכסוני המעוין מאונכים זה לזה, ולכן $\angle AOB=90^\circ$, ולפי פיתגורס: $AB=\sqrt{8^2+6^2}=10$.`,
          String.raw`במעוין כל הצלעות שוות, ולכן ההיקף הוא $4\cdot10=40$.`,
        ],
        finalAnswer: String.raw`צלע המעוין $10$, היקפו $40$.`,
        answers: [
          { label: String.raw`$AB$`, value: 10 },
          { label: 'היקף המעוין', value: 40 },
        ],
      },
      {
        id: 'geo-quadrilaterals-basic-3',
        difficulty: 2,
        statement: String.raw`במלבן $ABCD$ האלכסונים נחתכים בנקודה $O$. נתון: $\angle AOD=60^\circ$ ו-$AC=10$ (ראו שרטוט). חשבו את אורכי הצלעות $AD$ ו-$AB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26,197.4 294,197.4 294,42.6 26,42.6" />
  <line x1="26" y1="197.4" x2="294" y2="42.6" stroke-width="1.5" />
  <line x1="294" y1="197.4" x2="26" y2="42.6" stroke-width="1.5" />
  <path d="M 146.1 128 A 16 16 0 0 1 146.1 112" stroke-width="1.2" />
  <text x="14.7" y="209.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="305.3" y="209.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="305.3" y="41.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="14.7" y="41.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="160" y="112.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
</svg>`,
        hints: [
          String.raw`אלכסוני המלבן שווים וחוצים זה את זה, ולכן $OA=OD$.`,
          String.raw`המשולש $AOD$ שווה שוקיים עם זווית ראש של $60^\circ$ – כלומר שווה צלעות.`,
        ],
        solutionSteps: [
          String.raw`אלכסוני המלבן שווים וחוצים זה את זה, ולכן $OA=OD=\frac{AC}{2}=5$.`,
          String.raw`במשולש $AOD$: $OA=OD$, ולכן $\angle OAD=\angle ODA=\frac{180^\circ-60^\circ}{2}=60^\circ$. המשולש שווה צלעות, ו-$AD=5$.`,
          String.raw`המשולש $ADC$ ישר זווית ($\angle D=90^\circ$), ולפי פיתגורס: $DC=\sqrt{AC^2-AD^2}=\sqrt{100-25}=5\sqrt3$.`,
          String.raw`במלבן צלעות נגדיות שוות: $AB=DC=5\sqrt3\approx8.66$.`,
        ],
        finalAnswer: String.raw`$AD=5$, $AB=5\sqrt3$`,
        answers: [
          { label: String.raw`$AD$`, value: 5 },
          { label: String.raw`$AB$`, value: 5 * Math.sqrt(3) },
        ],
      },
      {
        id: 'geo-quadrilaterals-basic-4',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא טרפז שווה שוקיים ($AB\parallel DC$) שבו $AB=9$, $DC=21$ והשוקיים $AD=BC=10$ (ראו שרטוט). חשבו את גובה הטרפז ואת אורך האלכסון $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="102.6,69 217.4,69 294,171 26,171" />
  <line x1="102.6" y1="69" x2="294" y2="171" stroke-width="1.5" />
  <line x1="68.3" y1="123" x2="60.3" y2="117" stroke-width="1.2" />
  <line x1="259.7" y1="117" x2="251.7" y2="123" stroke-width="1.2" />
  <text x="93.4" y="65.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="226.6" y="65.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="306.6" y="179.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="13.4" y="179.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`הורידו את הגובה $AH$ לבסיס $DC$. בטרפז שווה שוקיים $DH=\frac{DC-AB}{2}$.`,
          String.raw`$DH=6$, ולכן $AH=8$ ו-$HC=DC-DH=15$. השתמשו בפיתגורס במשולש $AHC$.`,
        ],
        solutionSteps: [
          String.raw`נוריד את הגבהים $AH$ ו-$BK$ לבסיס $DC$. $ABKH$ מלבן (מרובע שיש בו שלוש זוויות ישרות), ולכן $HK=AB=9$ ו-$AH=BK$.`,
          String.raw`$\triangle ADH\cong\triangle BCK$ (צ.צ.ז: $AD=BC$, $AH=BK$, והזווית הישרה מול היתר), ולכן $DH=KC=\frac{21-9}{2}=6$.`,
          String.raw`במשולש ישר הזווית $ADH$: $AH=\sqrt{10^2-6^2}=8$ – זה גובה הטרפז.`,
          String.raw`$HC=DC-DH=21-6=15$, ובמשולש ישר הזווית $AHC$: $AC=\sqrt{8^2+15^2}=\sqrt{289}=17$.`,
        ],
        finalAnswer: String.raw`גובה הטרפז $8$, $AC=17$`,
        answers: [
          { label: 'גובה הטרפז', value: 8 },
          { label: String.raw`$AC$`, value: 17 },
        ],
      },
      {
        id: 'geo-quadrilaterals-basic-5',
        difficulty: 2,
        statement: String.raw`במקבילית $ABCD$ חוצה הזווית $A$ חותך את הצלע $BC$ בנקודה $E$ (ראו שרטוט). נתון: $AB=6$, $AD=10$ ו-$\angle ABC=100^\circ$. חשבו את $EC$ ואת $\angle AEB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26,191.7 51.3,48.3 294,48.3 268.7,191.7" />
  <line x1="26" y1="191.7" x2="196.9" y2="48.3" />
  <path d="M 29.8 170 A 22 22 0 0 1 42.9 177.6" stroke-width="1.2" />
  <path d="M 45.9 175 A 26 26 0 0 1 52 191.7" stroke-width="1.2" />
  <text x="14.7" y="203.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="40" y="47.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="305.3" y="47.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="277.9" y="206.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="196.9" y="40.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
</svg>`,
        hints: [
          String.raw`$AD\parallel BC$, ולכן $\angle DAE=\angle AEB$ (זוויות מתחלפות).`,
          String.raw`מכאן $\angle BAE=\angle BEA$ – המשולש $ABE$ שווה שוקיים, ו-$BE=AB$.`,
        ],
        solutionSteps: [
          String.raw`$AE$ חוצה את $\angle BAD$, ולכן $\angle BAE=\angle DAE$.`,
          String.raw`$AD\parallel BC$ ($ABCD$ מקבילית), ולכן $\angle DAE=\angle AEB$ (זוויות מתחלפות בין ישרים מקבילים). מכאן $\angle BAE=\angle AEB$.`,
          String.raw`במשולש $ABE$ מול זוויות שוות מונחות צלעות שוות: $BE=AB=6$. במקבילית $BC=AD=10$, ולכן $EC=10-6=4$.`,
          String.raw`$\angle BAD=180^\circ-100^\circ=80^\circ$ (זוויות סמוכות במקבילית), ולכן $\angle AEB=\angle BAE=40^\circ$ (בדיקה: $40^\circ+40^\circ+100^\circ=180^\circ$).`,
        ],
        finalAnswer: String.raw`$EC=4$, $\angle AEB=40^\circ$`,
        answers: [
          { label: String.raw`$EC$`, value: 4 },
          { label: String.raw`$\angle AEB$`, value: 40 },
        ],
      },
      {
        id: 'geo-quadrilaterals-basic-6',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא דלתון קמור שבו $AB=AD=10$ ו-$CB=CD=17$. אורך האלכסון $BD$ הוא $16$ (ראו שרטוט). חשבו את אורך האלכסון $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160,26 88.4,79.7 160,214 231.6,79.7" />
  <line x1="160" y1="26" x2="160" y2="214" stroke-width="1.5" />
  <line x1="88.4" y1="79.7" x2="231.6" y2="79.7" stroke-width="1.5" />
  <line x1="127.2" y1="56.9" x2="121.2" y2="48.9" stroke-width="1.2" />
  <line x1="198.8" y1="48.9" x2="192.8" y2="56.9" stroke-width="1.2" />
  <line x1="120.7" y1="151" x2="129.5" y2="146.3" stroke-width="1.2" />
  <line x1="118.8" y1="147.4" x2="127.7" y2="142.7" stroke-width="1.2" />
  <line x1="190.5" y1="146.3" x2="199.3" y2="151" stroke-width="1.2" />
  <line x1="192.3" y1="142.7" x2="201.2" y2="147.4" stroke-width="1.2" />
  <text x="160" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="75.8" y="81.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="160" y="232.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="244.2" y="81.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="169.2" y="76" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
</svg>`,
        hints: [
          String.raw`בדלתון האלכסון הראשי $AC$ מאונך ל-$BD$ וחוצה אותו.`,
          String.raw`$BO=8$. חשבו את $AO$ ואת $CO$ בעזרת פיתגורס.`,
        ],
        solutionSteps: [
          String.raw`בדלתון האלכסון הראשי $AC$ (המחבר את שני קודקודי הראש) מאונך לאלכסון $BD$ וחוצה אותו. נסמן את נקודת החיתוך ב-$O$: $BO=OD=8$ ו-$\angle AOB=90^\circ$.`,
          String.raw`במשולש ישר הזווית $AOB$: $AO=\sqrt{10^2-8^2}=6$.`,
          String.raw`במשולש ישר הזווית $COB$: $CO=\sqrt{17^2-8^2}=\sqrt{225}=15$.`,
          String.raw`הדלתון קמור, ולכן $O$ נמצאת בין $A$ ל-$C$: $AC=AO+OC=6+15=21$.`,
        ],
        finalAnswer: String.raw`$AC=21$`,
        answers: [{ label: String.raw`$AC$`, value: 21 }],
      },
      {
        id: 'geo-quadrilaterals-basic-7',
        difficulty: 3,
        statement: String.raw`במקבילית $ABCD$ נתון $AB=5$ ו-$AD=8$. חוצה הזווית $A$ חותך את $BC$ בנקודה $E$, וחוצה הזווית $D$ חותך את $BC$ בנקודה $F$. חוצי הזוויות נחתכים בנקודה $G$ (ראו שרטוט). חשבו את $EF$ ואת $\angle AGD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26,184.8 73.2,55.2 294,55.2 246.8,184.8" />
  <line x1="26" y1="184.8" x2="211.2" y2="55.2" />
  <line x1="246.8" y1="184.8" x2="156" y2="55.2" />
  <path d="M 32.2 167.9 A 18 18 0 0 1 40.7 174.5" stroke-width="1.2" />
  <path d="M 44 172.2 A 22 22 0 0 1 48 184.8" stroke-width="1.2" />
  <path d="M 228.8 184.8 A 18 18 0 0 1 236.5 170.1" stroke-width="1.2" />
  <path d="M 224.8 184.8 A 22 22 0 0 1 234.2 166.8" stroke-width="1.2" />
  <path d="M 231.3 162.7 A 27 27 0 0 1 256 159.5" stroke-width="1.2" />
  <path d="M 229 159.4 A 31 31 0 0 1 257.4 155.7" stroke-width="1.2" />
  <text x="14.7" y="196.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="61.9" y="54.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="306.6" y="57.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="256" y="199.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="211.2" y="47.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="156" y="47.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
  <text x="177.5" y="74" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">G</text>
</svg>`,
        hints: [
          String.raw`כמו בתרגיל 5: המשולשים $ABE$ ו-$DCF$ שווי שוקיים, ולכן $BE=CF=5$.`,
          String.raw`$BE+CF=10>BC=8$, כלומר הקטעים $BE$ ו-$CF$ חופפים בחלקם: $EF=BE+CF-BC$.`,
          String.raw`$\angle GAD+\angle GDA=\frac{\angle A+\angle D}{2}$, ו-$\angle A+\angle D=180^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$\angle BAE=\angle EAD$ (חוצה זווית) ו-$\angle EAD=\angle AEB$ (זוויות מתחלפות, $AD\parallel BC$). לכן $\angle BAE=\angle BEA$, ו-$BE=AB=5$ (מול זוויות שוות מונחות צלעות שוות).`,
          String.raw`באותו אופן במשולש $DCF$: $\angle CDF=\angle FDA=\angle DFC$, ולכן $CF=DC=AB=5$.`,
          String.raw`$BC=AD=8$, ו-$BE+CF=10>8$, ולכן $F$ נמצאת בין $B$ ל-$E$: $BF=BC-CF=3$ ו-$EF=BE-BF=5-3=2$.`,
          String.raw`$\angle BAD+\angle ADC=180^\circ$ (זוויות סמוכות במקבילית), ולכן $\angle GAD+\angle GDA=\frac{180^\circ}{2}=90^\circ$.`,
          String.raw`במשולש $AGD$: $\angle AGD=180^\circ-90^\circ=90^\circ$ – חוצי זוויות סמוכות במקבילית מאונכים זה לזה.`,
        ],
        finalAnswer: String.raw`$EF=2$, $\angle AGD=90^\circ$`,
        answers: [
          { label: String.raw`$EF$`, value: 2 },
          { label: String.raw`$\angle AGD$`, value: 90 },
        ],
      },
      {
        id: 'geo-quadrilaterals-basic-8',
        difficulty: 3,
        statement: String.raw`$ABCD$ הוא ריבוע, ובתוכו בנו את המשולש שווה הצלעות $ABE$ (ראו שרטוט). חשבו את $\angle ADE$ ואת $\angle DEC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="66,214 254,214 254,26 66,26" />
  <polygon points="66,214 254,214 160,51.2" />
  <line x1="66" y1="26" x2="160" y2="51.2" />
  <line x1="254" y1="26" x2="160" y2="51.2" />
  <text x="56.8" y="228.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="263.2" y="228.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="263.2" y="22.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="56.8" y="22.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="160" y="43.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
</svg>`,
        hints: [
          String.raw`$AE=AB=AD$, ולכן המשולש $ADE$ שווה שוקיים. מהי זווית הראש שלו?`,
          String.raw`$\angle DAE=90^\circ-60^\circ=30^\circ$, ומכאן $\angle ADE=\angle AED=75^\circ$.`,
          String.raw`באותו אופן $\angle BEC=75^\circ$. סכום הזוויות סביב הנקודה $E$ הוא $360^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$AE=AB$ (משולש שווה צלעות) ו-$AB=AD$ (צלעות הריבוע), ולכן $AE=AD$ – המשולש $ADE$ שווה שוקיים.`,
          String.raw`$\angle DAE=\angle DAB-\angle EAB=90^\circ-60^\circ=30^\circ$, ולכן $\angle ADE=\angle AED=\frac{180^\circ-30^\circ}{2}=75^\circ$.`,
          String.raw`באותו אופן $BE=BC$ ו-$\angle CBE=30^\circ$, ולכן במשולש $BCE$: $\angle BEC=75^\circ$.`,
          String.raw`סכום הזוויות סביב הנקודה $E$ הוא $360^\circ$: $\angle DEC=360^\circ-\angle AED-\angle AEB-\angle BEC=360^\circ-75^\circ-60^\circ-75^\circ=150^\circ$.`,
        ],
        finalAnswer: String.raw`$\angle ADE=75^\circ$, $\angle DEC=150^\circ$`,
        answers: [
          { label: String.raw`$\angle ADE$`, value: 75 },
          { label: String.raw`$\angle DEC$`, value: 150 },
        ],
      },
    ],
  },
  'geo-quadrilaterals-advanced': {
    intro: String.raw`בשיעור זה משלבים את תכונות המרובעים עם קטע אמצעים (במשולש ובטרפז), עם מפגש התיכונים, עם משולשים שווי שוקיים ועם משפט פיתגורס. הטכניקה המרכזית: לזהות בתוך המרובע משולש שבו יש קטע אמצעים, תיכונים או זוויות שוות, ולהעביר את המידע מהמשולש למרובע. כך נראים סעיפי החישוב המתקדמים בשאלה 4 בבגרות.`,
    keyFacts: [
      String.raw`**קטע אמצעים בטרפז** (המחבר את אמצעי השוקיים) מקביל לבסיסים ושווה למחצית סכומם: $EF=\frac{AB+DC}{2}$.`,
      String.raw`**קטע אמצעים במשולש** מקביל לצלע השלישית ושווה למחציתה; ישר היוצא מאמצע צלע ומקביל לצלע שנייה חוצה את הצלע השלישית.`,
      String.raw`**מרובע האמצעים**: אמצעי הצלעות של מרובע כלשהו יוצרים מקבילית שצלעותיה מקבילות לאלכסונים ושוות למחציתם, ולכן היקפה שווה לסכום האלכסונים.`,
      String.raw`**אלכסון החוצה זווית בטרפז** – או אלכסון שיוצר משולש שווה שוקיים עם הבסיס – נובע מזוויות מתחלפות בין הבסיסים.`,
      String.raw`**מפגש התיכונים** מחלק כל תיכון ביחס $2:1$ מהקודקוד. במקבילית, נקודת חיתוך האלכסונים היא אמצע של כל אחד מהם, ולכן אלכסון הוא תיכון במשולשים שהאלכסון השני יוצר.`,
    ],
    exercises: [
      {
        id: 'geo-quadrilaterals-advanced-1',
        difficulty: 1,
        statement: String.raw`בטרפז $ABCD$ ($AB\parallel DC$) הנקודות $E$ ו-$F$ הן אמצעי השוקיים $AD$ ו-$BC$ (ראו שרטוט). נתון: $AB=8$ ו-$DC=14$. חשבו את $EF$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="73.9,72.1 227,72.1 294,167.9 26,167.9" />
  <line x1="49.9" y1="120" x2="260.5" y2="120" />
  <line x1="66.4" y1="98.3" x2="57.4" y2="93.8" stroke-width="1.2" />
  <line x1="42.4" y1="146.2" x2="33.5" y2="141.7" stroke-width="1.2" />
  <line x1="246.7" y1="91.6" x2="238.5" y2="97.3" stroke-width="1.2" />
  <line x1="249" y1="94.8" x2="240.8" y2="100.6" stroke-width="1.2" />
  <line x1="280.2" y1="139.4" x2="272" y2="145.2" stroke-width="1.2" />
  <line x1="282.5" y1="142.7" x2="274.3" y2="148.4" stroke-width="1.2" />
  <text x="62.6" y="71.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="236.2" y="68.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="306.6" y="176.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="13.4" y="176.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="38.7" y="119" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="271.8" y="119" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
</svg>`,
        hints: [
          String.raw`$EF$ הוא קטע האמצעים של הטרפז.`,
          String.raw`קטע האמצעים בטרפז שווה למחצית סכום הבסיסים.`,
        ],
        solutionSteps: [
          String.raw`$E$ ו-$F$ הן אמצעי השוקיים, ולכן $EF$ הוא קטע האמצעים של הטרפז: הוא מקביל לבסיסים ושווה למחצית סכומם.`,
          String.raw`$EF=\frac{8+14}{2}=11$.`,
        ],
        finalAnswer: String.raw`$EF=11$`,
        answers: [{ label: String.raw`$EF$`, value: 11 }],
      },
      {
        id: 'geo-quadrilaterals-advanced-2',
        difficulty: 1,
        statement: String.raw`במרובע $ABCD$ אורכי האלכסונים הם $AC=14$ ו-$BD=10$. הנקודות $K$, $L$, $M$, $N$ הן אמצעי הצלעות $AB$, $BC$, $CD$, $DA$ (ראו שרטוט). חשבו את היקף המרובע $KLMN$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26,120 121.7,196.6 294,120 236.6,43.4" />
  <polygon points="73.9,158.3 207.9,158.3 265.3,81.7 131.3,81.7" />
  <line x1="26" y1="120" x2="294" y2="120" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="121.7" y1="196.6" x2="236.6" y2="43.4" stroke-width="1.5" stroke-dasharray="5 3" />
  <text x="13" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="115.2" y="213.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="307" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="245.8" y="39.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="64.7" y="173" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">K</text>
  <text x="214.4" y="175" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">L</text>
  <text x="276.5" y="80.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">M</text>
  <text x="127.9" y="74.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">N</text>
</svg>`,
        hints: [
          String.raw`$KL$ הוא קטע אמצעים במשולש $ABC$, ו-$LM$ הוא קטע אמצעים במשולש $BCD$.`,
          String.raw`כל צלע של $KLMN$ שווה למחצית אחד האלכסונים של $ABCD$.`,
        ],
        solutionSteps: [
          String.raw`במשולש $ABC$: $KL$ קטע אמצעים, ולכן $KL=\frac{AC}{2}=7$. באותו אופן במשולש $ADC$: $NM=\frac{AC}{2}=7$.`,
          String.raw`במשולש $ABD$: $KN=\frac{BD}{2}=5$, ובמשולש $CBD$: $LM=\frac{BD}{2}=5$.`,
          String.raw`היקף $KLMN$: $7+5+7+5=24$ – בדיוק סכום האלכסונים.`,
        ],
        finalAnswer: String.raw`היקף $KLMN$ הוא $24$.`,
        answers: [{ label: String.raw`היקף $KLMN$`, value: 24 }],
      },
      {
        id: 'geo-quadrilaterals-advanced-3',
        difficulty: 2,
        statement: String.raw`בטרפז $ABCD$ ($AB\parallel DC$) נתון $AD=AB$, $\angle ADC=80^\circ$ ו-$\angle BCD=70^\circ$ (ראו שרטוט). חשבו את $\angle DBC$ ואת $\angle ABC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="56.4,33.9 231.3,33.9 294,206.1 26,206.1" />
  <line x1="26" y1="206.1" x2="231.3" y2="33.9" />
  <path d="M 46 206.1 A 20 20 0 0 0 29.5 186.4" stroke-width="1.2" />
  <path d="M 287.8 189.2 A 18 18 0 0 0 276 206.1" stroke-width="1.2" />
  <path d="M 286.5 185.5 A 22 22 0 0 0 272 206.1" stroke-width="1.2" />
  <line x1="46.1" y1="120.9" x2="36.3" y2="119.1" stroke-width="1.2" />
  <line x1="143.8" y1="28.9" x2="143.8" y2="38.9" stroke-width="1.2" />
  <text x="47.2" y="30.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="240.5" y="30.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="305.3" y="218.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="14.7" y="218.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`במשולש $ABD$: $AD=AB$, ולכן $\angle ADB=\angle ABD$.`,
          String.raw`$\angle ABD=\angle BDC$ (זוויות מתחלפות), ולכן $DB$ חוצה את $\angle ADC$.`,
        ],
        solutionSteps: [
          String.raw`$AD=AB$, ולכן $\angle ADB=\angle ABD$ (זוויות הבסיס במשולש שווה שוקיים).`,
          String.raw`$AB\parallel DC$, ולכן $\angle ABD=\angle BDC$ (זוויות מתחלפות). מכאן $\angle ADB=\angle BDC$, כלומר $DB$ חוצה את $\angle ADC$, ו-$\angle BDC=40^\circ$.`,
          String.raw`במשולש $DBC$: $\angle DBC=180^\circ-40^\circ-70^\circ=70^\circ$ (ולכן גם $DC=DB$).`,
          String.raw`$\angle ABC=\angle ABD+\angle DBC=40^\circ+70^\circ=110^\circ$ (בדיקה: $\angle ABC+\angle BCD=180^\circ$ – זוויות חד-צדדיות).`,
        ],
        finalAnswer: String.raw`$\angle DBC=70^\circ$, $\angle ABC=110^\circ$`,
        answers: [
          { label: String.raw`$\angle DBC$`, value: 70 },
          { label: String.raw`$\angle ABC$`, value: 110 },
        ],
      },
      {
        id: 'geo-quadrilaterals-advanced-4',
        difficulty: 2,
        statement: String.raw`בטרפז $ABCD$ ($AB\parallel DC$) נתון $AB=6$ ו-$DC=14$. קטע האמצעים $EF$ של הטרפז ($E$ על $AD$, $F$ על $BC$) חותך את האלכסונים $BD$ ו-$AC$ בנקודות $K$ ו-$L$ (ראו שרטוט). חשבו את $EK$ ואת $KL$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="83.4,62.6 198.3,62.6 294,177.4 26,177.4" />
  <line x1="54.7" y1="120" x2="246.1" y2="120" />
  <line x1="83.4" y1="62.6" x2="294" y2="177.4" stroke-width="1.5" />
  <line x1="198.3" y1="62.6" x2="26" y2="177.4" stroke-width="1.5" />
  <text x="74.2" y="58.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="207.5" y="58.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="306.6" y="186.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="14.7" y="189.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="43.5" y="119" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="255.3" y="116.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
  <text x="108.8" y="112.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">K</text>
  <text x="192.1" y="112.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">L</text>
</svg>`,
        hints: [
          String.raw`$EF\parallel AB$ ו-$E$ אמצע $AD$, ולכן במשולש $ABD$ הקטע $EK$ הוא קטע אמצעים.`,
          String.raw`$EK=\frac{AB}{2}$, ובמשולש $ADC$: $EL=\frac{DC}{2}$.`,
        ],
        solutionSteps: [
          String.raw`קטע האמצעים בטרפז מקביל לבסיסים: $EF\parallel AB\parallel DC$.`,
          String.raw`במשולש $ABD$: $E$ אמצע $AD$ ו-$EK\parallel AB$, ולכן $K$ אמצע $BD$, ו-$EK$ הוא קטע אמצעים: $EK=\frac{AB}{2}=3$.`,
          String.raw`במשולש $ADC$: $E$ אמצע $AD$ ו-$EL\parallel DC$, ולכן $EL$ הוא קטע אמצעים: $EL=\frac{DC}{2}=7$.`,
          String.raw`$KL=EL-EK=7-3=4$ – מחצית ההפרש בין הבסיסים.`,
        ],
        finalAnswer: String.raw`$EK=3$, $KL=4$`,
        answers: [
          { label: String.raw`$EK$`, value: 3 },
          { label: String.raw`$KL$`, value: 4 },
        ],
      },
      {
        id: 'geo-quadrilaterals-advanced-5',
        difficulty: 2,
        statement: String.raw`במעוין $ABCD$ אורך הצלע $6$ ו-$\angle ABC=60^\circ$ (ראו שרטוט). חשבו את אורכי האלכסונים $AC$ ו-$BD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="115.3,42.6 26,197.4 204.7,197.4 294,42.6" />
  <line x1="115.3" y1="42.6" x2="204.7" y2="197.4" stroke-width="1.5" />
  <line x1="26" y1="197.4" x2="294" y2="42.6" stroke-width="1.5" />
  <path d="M 44 197.4 A 18 18 0 0 0 35 181.8" stroke-width="1.2" />
  <text x="108.8" y="36.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="14.7" y="209.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="211.2" y="214.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="305.3" y="41.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`המשולש $ABC$ שווה שוקיים, וזווית הראש שלו $60^\circ$.`,
          String.raw`אלכסוני המעוין מאונכים זה לזה וחוצים זה את זה. השתמשו בפיתגורס במשולש $ABO$.`,
        ],
        solutionSteps: [
          String.raw`במעוין $AB=BC$, ו-$\angle ABC=60^\circ$, ולכן זוויות הבסיס של המשולש $ABC$ הן $\frac{180^\circ-60^\circ}{2}=60^\circ$ – המשולש שווה צלעות, ו-$AC=6$.`,
          String.raw`אלכסוני המעוין חוצים זה את זה ומאונכים זה לזה. נסמן את נקודת החיתוך ב-$O$: $AO=3$ ו-$\angle AOB=90^\circ$.`,
          String.raw`במשולש ישר הזווית $AOB$: $BO=\sqrt{6^2-3^2}=\sqrt{27}=3\sqrt3$.`,
          String.raw`$BD=2BO=6\sqrt3\approx10.39$.`,
        ],
        finalAnswer: String.raw`$AC=6$, $BD=6\sqrt3$`,
        answers: [
          { label: String.raw`$AC$`, value: 6 },
          { label: String.raw`$BD$`, value: 6 * Math.sqrt(3) },
        ],
      },
      {
        id: 'geo-quadrilaterals-advanced-6',
        difficulty: 2,
        statement: String.raw`בטרפז שווה השוקיים $ABCD$ ($AB\parallel DC$) נתון $AD=AB=BC=5$ ו-$\angle ADC=60^\circ$. $EF$ הוא קטע האמצעים של הטרפז (ראו שרטוט). חשבו את $DC$ ואת $EF$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="93,62 227,62 294,178 26,178" />
  <line x1="59.5" y1="120" x2="260.5" y2="120" stroke-width="1.5" stroke-dasharray="5 3" />
  <path d="M 44 178 A 18 18 0 0 0 35 162.4" stroke-width="1.2" />
  <text x="83.8" y="58.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="236.2" y="58.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="305.3" y="190" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="14.7" y="190" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="48.2" y="119" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="271.8" y="119" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
</svg>`,
        hints: [
          String.raw`העבירו את האלכסון $DB$. כמו בתרגיל 3, הוא חוצה את $\angle ADC$.`,
          String.raw`$\angle BDC=30^\circ$ ו-$\angle BCD=60^\circ$, ולכן $\angle DBC=90^\circ$. איזה ניצב נמצא מול הזווית של $30^\circ$?`,
        ],
        solutionSteps: [
          String.raw`$AD=AB$, ולכן $\angle ADB=\angle ABD$; ו-$\angle ABD=\angle BDC$ (זוויות מתחלפות, $AB\parallel DC$). לכן $DB$ חוצה את $\angle ADC$, ו-$\angle BDC=30^\circ$.`,
          String.raw`בטרפז שווה שוקיים זוויות הבסיס שוות: $\angle BCD=\angle ADC=60^\circ$.`,
          String.raw`במשולש $DBC$: $\angle DBC=180^\circ-30^\circ-60^\circ=90^\circ$.`,
          String.raw`במשולש ישר הזווית $DBC$ הניצב $BC$ נמצא מול זווית של $30^\circ$, ולכן הוא שווה למחצית היתר: $DC=2BC=10$.`,
          String.raw`קטע האמצעים: $EF=\frac{AB+DC}{2}=\frac{5+10}{2}=7.5$.`,
        ],
        finalAnswer: String.raw`$DC=10$, $EF=7.5$`,
        answers: [
          { label: String.raw`$DC$`, value: 10 },
          { label: String.raw`$EF$`, value: 7.5 },
        ],
      },
      {
        id: 'geo-quadrilaterals-advanced-7',
        difficulty: 3,
        statement: String.raw`בטרפז שווה השוקיים $ABCD$ ($AB\parallel DC$) האלכסונים מאונכים זה לזה ונחתכים בנקודה $O$. נתון: $AB=6$ ו-$DC=14$ (ראו שרטוט). חשבו את גובה הטרפז ואת אורך השוק $AD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="103.6,26 216.4,26 291.6,214 28.4,214" />
  <line x1="103.6" y1="26" x2="291.6" y2="214" stroke-width="1.5" />
  <line x1="216.4" y1="26" x2="28.4" y2="214" stroke-width="1.5" />
  <polyline points="166.4,76 172.7,82.4 166.4,88.8" stroke-width="1" />
  <text x="97.1" y="20.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="222.9" y="20.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="300.8" y="228.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="19.2" y="228.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="160" y="74.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
</svg>`,
        hints: [
          String.raw`הראו ש-$OD=OC$ ו-$OA=OB$ (למשל מחפיפת המשולשים $ADC$ ו-$BCD$). המשולשים $AOB$ ו-$DOC$ ישרי זווית ושווי שוקיים.`,
          String.raw`העבירו דרך $O$ גובה לשני הבסיסים. במשולש ישר זווית ושווה שוקיים הגובה ליתר הוא גם התיכון, ולכן הוא שווה למחצית היתר.`,
          String.raw`גובה הטרפז הוא סכום שני הגבהים: $\frac{6}{2}+\frac{14}{2}$.`,
        ],
        solutionSteps: [
          String.raw`בטרפז שווה שוקיים זוויות הבסיס שוות. $\triangle ADC\cong\triangle BCD$ (צ.ז.צ: $AD=BC$, $\angle ADC=\angle BCD$, $DC$ משותפת), ולכן $\angle ACD=\angle BDC$ – המשולש $DOC$ שווה שוקיים: $OD=OC$. גם $AC=BD$ (מהחפיפה), ולכן $OA=AC-OC=BD-OD=OB$.`,
          String.raw`נעביר דרך $O$ ישר המאונך לבסיסים, החותך את $AB$ ב-$M$ ואת $DC$ ב-$N$; $MN$ הוא גובה הטרפז.`,
          String.raw`במשולש שווה השוקיים $DOC$ הגובה $ON$ הוא גם תיכון, ובמשולש ישר הזווית $DOC$ ($\angle DOC=90^\circ$) התיכון ליתר שווה למחצית היתר: $ON=\frac{DC}{2}=7$.`,
          String.raw`באותו אופן במשולש $AOB$: $OM=\frac{AB}{2}=3$.`,
          String.raw`גובה הטרפז: $MN=OM+ON=3+7=10$.`,
          String.raw`נוריד את הגובה $AH$ לבסיס $DC$: $DH=\frac{DC-AB}{2}=4$ (טרפז שווה שוקיים), ובמשולש ישר הזווית $ADH$: $AD=\sqrt{4^2+10^2}=\sqrt{116}=2\sqrt{29}\approx10.77$.`,
        ],
        finalAnswer: String.raw`גובה הטרפז $10$, $AD=2\sqrt{29}$`,
        answers: [
          { label: 'גובה הטרפז', value: 10 },
          { label: String.raw`$AD$`, value: 2 * Math.sqrt(29) },
        ],
      },
      {
        id: 'geo-quadrilaterals-advanced-8',
        difficulty: 3,
        statement: String.raw`במקבילית $ABCD$ הנקודה $E$ היא אמצע $AD$ והנקודה $F$ היא אמצע $BC$. הקטעים $AF$ ו-$CE$ חותכים את האלכסון $BD$ בנקודות $K$ ו-$L$ (ראו שרטוט). נתון: $BD=12$ ו-$AF=15$. חשבו את $KL$ ואת $AK$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26,177.9 100.9,62.1 294,62.1 219.1,177.9" />
  <line x1="26" y1="177.9" x2="197.4" y2="62.1" />
  <line x1="294" y1="62.1" x2="122.6" y2="177.9" />
  <line x1="100.9" y1="62.1" x2="219.1" y2="177.9" stroke-width="1.5" />
  <line x1="74.3" y1="172.9" x2="74.3" y2="182.9" stroke-width="1.2" />
  <line x1="170.8" y1="172.9" x2="170.8" y2="182.9" stroke-width="1.2" />
  <line x1="147.2" y1="57.1" x2="147.2" y2="67.1" stroke-width="1.2" />
  <line x1="151.2" y1="57.1" x2="151.2" y2="67.1" stroke-width="1.2" />
  <line x1="243.7" y1="57.1" x2="243.7" y2="67.1" stroke-width="1.2" />
  <line x1="247.7" y1="57.1" x2="247.7" y2="67.1" stroke-width="1.2" />
  <text x="14.7" y="189.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="91.7" y="58.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="305.3" y="61.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="228.3" y="192.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="122.6" y="196.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="197.4" y="54.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
  <text x="140.3" y="93.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">K</text>
  <text x="179.7" y="157.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">L</text>
</svg>`,
        hints: [
          String.raw`נסמן ב-$O$ את נקודת החיתוך של האלכסונים. $O$ היא אמצע $AC$ ואמצע $BD$.`,
          String.raw`במשולש $ABC$ הקטעים $AF$ ו-$BO$ הם תיכונים, ולכן $K$ היא מפגש התיכונים שלו.`,
          String.raw`מפגש התיכונים מחלק כל תיכון ביחס $2:1$ מהקודקוד: $BK=\frac23BO$, $AK=\frac23AF$. באותו אופן $L$ הוא מפגש התיכונים של המשולש $ADC$.`,
        ],
        solutionSteps: [
          String.raw`נסמן ב-$O$ את נקודת החיתוך של האלכסונים. אלכסוני המקבילית חוצים זה את זה, ולכן $O$ אמצע $AC$ ו-$BO=OD=6$.`,
          String.raw`במשולש $ABC$: $AF$ תיכון ($F$ אמצע $BC$) ו-$BO$ תיכון ($O$ אמצע $AC$). לכן $K$, נקודת החיתוך שלהם, היא מפגש התיכונים של המשולש $ABC$.`,
          String.raw`מפגש התיכונים מחלק כל תיכון ביחס $2:1$ מהקודקוד: $BK=\frac23BO=4$ ו-$AK=\frac23AF=10$.`,
          String.raw`באותו אופן במשולש $ADC$: $CE$ ו-$DO$ תיכונים, ו-$L$ מפגש התיכונים שלו, ולכן $DL=\frac23DO=4$.`,
          String.raw`$KL=BD-BK-DL=12-4-4=4$. כלומר הקטעים $AF$ ו-$CE$ מחלקים את האלכסון $BD$ לשלושה חלקים שווים.`,
        ],
        finalAnswer: String.raw`$KL=4$, $AK=10$`,
        answers: [
          { label: String.raw`$KL$`, value: 4 },
          { label: String.raw`$AK$`, value: 10 },
        ],
      },
    ],
  },
  'geo-quadrilaterals-proof': {
    intro: String.raw`בשיעור זה מוכיחים שמרובע הוא מקבילית, מלבן, מעוין או טרפז שווה שוקיים, ומוכיחים תכונות של מרובעים. בבגרות זה אחד הסעיפים הנפוצים בשאלה 4: ״הוכיחו כי המרובע ... הוא מקבילית״. המפתח הוא לבחור את התנאי המספיק המתאים ולהוכיח בדיוק אותו – ולא ״להראות שזה נראה כמו מקבילית״.`,
    keyFacts: [
      String.raw`**מרובע הוא מקבילית** אם: שני זוגות של צלעות נגדיות מקבילים (הגדרה); או שני זוגות של צלעות נגדיות שוות; או זוג צלעות נגדיות שוות ומקבילות; או האלכסונים חוצים זה את זה; או שני זוגות של זוויות נגדיות שוות.`,
      String.raw`**מקבילית היא מלבן** אם יש בה זווית ישרה או אם אלכסוניה שווים. מרובע שכל זוויותיו ישרות הוא מלבן.`,
      String.raw`**מקבילית היא מעוין** אם יש בה שתי צלעות סמוכות שוות, או שאלכסוניה מאונכים, או שאלכסון חוצה בה זווית. מרובע שכל צלעותיו שוות הוא מעוין.`,
      String.raw`**טרפז הוא שווה שוקיים** אם זוויות הבסיס שלו שוות או אם האלכסונים שלו שווים.`,
      String.raw`**שיטה**: מתחילים מהמסקנה – ״כדי להוכיח שזו מקבילית מספיק להראות ש...״ – ומשם בוחרים משולשים חופפים, זוויות בין ישרים מקבילים או קטעי אמצעים שייתנו את הדרוש.`,
    ],
    exercises: [
      {
        id: 'geo-quadrilaterals-proof-1',
        difficulty: 1,
        statement: String.raw`$ABCD$ היא מקבילית. הנקודה $E$ נמצאת על הצלע $AB$ והנקודה $F$ על הצלע $DC$, כך ש-$AE=CF$ (ראו שרטוט). הוכיחו: המרובע $AECF$ הוא מקבילית.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26,171.5 232.2,171.5 294,68.5 87.8,68.5" />
  <line x1="26" y1="171.5" x2="221.8" y2="68.5" />
  <line x1="98.2" y1="171.5" x2="294" y2="68.5" />
  <line x1="62.1" y1="166.5" x2="62.1" y2="176.5" stroke-width="1.2" />
  <line x1="257.9" y1="63.5" x2="257.9" y2="73.5" stroke-width="1.2" />
  <text x="13.4" y="180.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="241.3" y="186.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="306.6" y="70.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="78.7" y="64.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="98.2" y="190" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="221.8" y="61" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
</svg>`,
        hints: [
          String.raw`מספיק להראות שבמרובע $AECF$ יש זוג צלעות נגדיות שוות ומקבילות.`,
          String.raw`$AE$ ו-$CF$ מונחות על הצלעות המקבילות $AB$ ו-$DC$.`,
        ],
        solutionSteps: [
          String.raw`$AB\parallel DC$ – צלעות נגדיות במקבילית $ABCD$. $E$ על $AB$ ו-$F$ על $DC$, ולכן $AE\parallel FC$.`,
          String.raw`$AE=CF$ – נתון.`,
          String.raw`במרובע $AECF$ זוג הצלעות הנגדיות $AE$ ו-$CF$ שוות ומקבילות, ולכן $AECF$ מקבילית.`,
        ],
        finalAnswer: String.raw`$AE\parallel CF$ ו-$AE=CF$, ולכן $AECF$ מקבילית.`,
      },
      {
        id: 'geo-quadrilaterals-proof-2',
        difficulty: 1,
        statement: String.raw`$ABCD$ היא מקבילית שאלכסוניה נחתכים בנקודה $O$. ישר העובר דרך $O$ חותך את הצלע $AB$ בנקודה $E$ ואת הצלע $DC$ בנקודה $F$ (ראו שרטוט). הוכיחו: $OE=OF$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26,181.8 232.2,181.8 294,58.2 87.8,58.2" />
  <line x1="182.5" y1="181.8" x2="137.5" y2="58.2" />
  <line x1="26" y1="181.8" x2="294" y2="58.2" stroke-width="1.5" />
  <line x1="232.2" y1="181.8" x2="87.8" y2="58.2" stroke-width="1.5" />
  <text x="14.7" y="193.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="241.3" y="196.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="305.3" y="57.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="78.7" y="54.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="163.4" y="112.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
  <text x="182.5" y="200.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="137.5" y="50.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
</svg>`,
        hints: [
          String.raw`השוו את המשולשים $AOE$ ו-$COF$.`,
          String.raw`$AO=OC$ (אלכסוני מקבילית), זוויות מתחלפות וזוויות קודקודיות – ז.צ.ז.`,
        ],
        solutionSteps: [
          String.raw`$AO=OC$ – אלכסוני המקבילית חוצים זה את זה.`,
          String.raw`$\angle EAO=\angle FCO$ – זוויות מתחלפות בין הישרים המקבילים $AB$ ו-$DC$ והחותך $AC$.`,
          String.raw`$\angle AOE=\angle COF$ – זוויות קודקודיות.`,
          String.raw`$\triangle AOE\cong\triangle COF$ – לפי משפט החפיפה ז.צ.ז.`,
          String.raw`$OE=OF$ – צלעות מתאימות במשולשים חופפים.`,
        ],
        finalAnswer: String.raw`$\triangle AOE\cong\triangle COF$ (ז.צ.ז), ולכן $OE=OF$.`,
      },
      {
        id: 'geo-quadrilaterals-proof-3',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא מרובע כלשהו, והנקודות $K$, $L$, $M$, $N$ הן אמצעי הצלעות $AB$, $BC$, $CD$, $DA$ (ראו שרטוט). הוכיחו: $KLMN$ מקבילית.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.8,178.8 242.3,214 289.3,61.3 89.5,26" />
  <polygon points="136.5,196.4 265.8,137.6 189.4,43.6 60.1,102.4" />
  <text x="19.5" y="190.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="251.4" y="228.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="300.5" y="60.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="80.3" y="22.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="133.1" y="214.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">K</text>
  <text x="278.3" y="146.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">L</text>
  <text x="192.7" y="36.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">M</text>
  <text x="47.6" y="104.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">N</text>
</svg>`,
        hints: [
          String.raw`העבירו את האלכסון $AC$.`,
          String.raw`$KL$ ו-$NM$ הם קטעי אמצעים במשולשים $ABC$ ו-$ADC$, ובשניהם הצלע השלישית היא $AC$.`,
        ],
        solutionSteps: [
          String.raw`נעביר את האלכסון $AC$.`,
          String.raw`במשולש $ABC$: $K$ ו-$L$ הן אמצעי הצלעות $AB$ ו-$BC$, ולכן $KL$ קטע אמצעים: $KL\parallel AC$ ו-$KL=\frac{AC}{2}$.`,
          String.raw`במשולש $ADC$: $N$ ו-$M$ הן אמצעי הצלעות $AD$ ו-$DC$, ולכן $NM\parallel AC$ ו-$NM=\frac{AC}{2}$.`,
          String.raw`מכאן $KL\parallel NM$ (שני ישרים המקבילים לישר שלישי מקבילים זה לזה) ו-$KL=NM$.`,
          String.raw`במרובע $KLMN$ זוג צלעות נגדיות שוות ומקבילות, ולכן $KLMN$ מקבילית.`,
        ],
        finalAnswer: String.raw`$KL$ ו-$NM$ שוות ומקבילות (שתיהן $\frac{AC}{2}$ ומקבילות ל-$AC$), ולכן $KLMN$ מקבילית.`,
      },
      {
        id: 'geo-quadrilaterals-proof-4',
        difficulty: 2,
        statement: String.raw`במקבילית $ABCD$ חוצה הזווית $A$ חותך את הצלע $BC$ בנקודה $E$, וחוצה הזווית $C$ חותך את הצלע $AD$ בנקודה $F$ (ראו שרטוט). הוכיחו: $AECF$ מקבילית.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26,173.8 65.1,66.2 294,66.2 254.9,173.8" />
  <line x1="26" y1="173.8" x2="179.6" y2="66.2" />
  <line x1="294" y1="66.2" x2="140.4" y2="173.8" />
  <path d="M 32.8 155 A 20 20 0 0 1 42.4 162.3" stroke-width="1.2" />
  <path d="M 45.7 160 A 24 24 0 0 1 50 173.8" stroke-width="1.2" />
  <path d="M 287.8 83.1 A 18 18 0 0 1 279.3 76.6" stroke-width="1.2" />
  <path d="M 286.5 86.9 A 22 22 0 0 1 276 78.9" stroke-width="1.2" />
  <path d="M 271.9 81.7 A 27 27 0 0 1 267 66.2" stroke-width="1.2" />
  <path d="M 268.6 84 A 31 31 0 0 1 263 66.2" stroke-width="1.2" />
  <text x="13.4" y="182.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="53.9" y="65.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="306.6" y="68.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="266.1" y="185.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="179.6" y="58.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="140.4" y="192.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
</svg>`,
        hints: [
          String.raw`$AF\parallel EC$ כבר ידוע (הן על הצלעות המקבילות $AD$ ו-$BC$). נשאר להוכיח ש-$AE\parallel FC$.`,
          String.raw`הראו ש-$\angle AEB=\angle FCB$: $\angle AEB=\angle EAD$ (מתחלפות), ו-$\angle EAD=\frac12\angle A=\frac12\angle C=\angle FCB$.`,
        ],
        solutionSteps: [
          String.raw`$AF\parallel EC$ – הן מונחות על הצלעות הנגדיות $AD$ ו-$BC$ של המקבילית.`,
          String.raw`$\angle BAD=\angle BCD$ – זוויות נגדיות במקבילית שוות. $AE$ ו-$CF$ חוצי זוויות, ולכן $\angle EAD=\frac12\angle BAD=\frac12\angle BCD=\angle FCB$.`,
          String.raw`$\angle AEB=\angle EAD$ – זוויות מתחלפות בין הישרים המקבילים $AD$ ו-$BC$ והחותך $AE$.`,
          String.raw`מכאן $\angle AEB=\angle FCB$. אלה זוויות מתאימות בין הישרים $AE$ ו-$FC$ והחותך $BC$, ולכן $AE\parallel FC$.`,
          String.raw`במרובע $AECF$ שני זוגות של צלעות נגדיות מקבילים, ולכן הוא מקבילית (לפי ההגדרה).`,
        ],
        finalAnswer: String.raw`$AF\parallel EC$ ו-$AE\parallel FC$, ולכן $AECF$ מקבילית.`,
      },
      {
        id: 'geo-quadrilaterals-proof-5',
        difficulty: 2,
        statement: String.raw`$ABCD$ היא מקבילית, והאלכסון $AC$ חוצה את הזווית $BAD$ (ראו שרטוט).

א. הוכיחו: $ABCD$ מעוין.

ב. נתון: $AC=24$ ו-$BD=10$. חשבו את היקף המעוין.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26,120 160,175.8 294,120 160,64.2" />
  <line x1="26" y1="120" x2="294" y2="120" stroke-width="1.5" />
  <line x1="160" y1="175.8" x2="160" y2="64.2" stroke-width="1.5" />
  <path d="M 53.7 131.5 A 30 30 0 0 0 56 120" stroke-width="1.2" />
  <path d="M 62 120 A 36 36 0 0 0 59.2 106.2" stroke-width="1.2" />
  <text x="13" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="160" y="194.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="307" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="160" y="56.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`הראו ש-$\angle BAC=\angle BCA$ בעזרת זוויות מתחלפות ($AD\parallel BC$).`,
          String.raw`במשולש $ABC$ מול זוויות שוות מונחות צלעות שוות: $AB=BC$. מקבילית שבה שתי צלעות סמוכות שוות היא מעוין.`,
          String.raw`לסעיף ב: אלכסוני המעוין מאונכים זה לזה וחוצים זה את זה.`,
        ],
        solutionSteps: [
          String.raw`א. $\angle BAC=\angle CAD$ – $AC$ חוצה את $\angle BAD$ (נתון).`,
          String.raw`$\angle CAD=\angle BCA$ – זוויות מתחלפות בין הישרים המקבילים $AD$ ו-$BC$ והחותך $AC$.`,
          String.raw`מכאן $\angle BAC=\angle BCA$, ולכן במשולש $ABC$: $AB=BC$ (מול זוויות שוות מונחות צלעות שוות).`,
          String.raw`מקבילית שבה שתי צלעות סמוכות שוות היא מעוין, ולכן $ABCD$ מעוין.`,
          String.raw`ב. אלכסוני המעוין חוצים זה את זה ומאונכים זה לזה: $AO=12$, $BO=5$ ו-$\angle AOB=90^\circ$ ($O$ – נקודת החיתוך). לפי פיתגורס $AB=\sqrt{144+25}=13$.`,
          String.raw`היקף המעוין: $4\cdot13=52$.`,
        ],
        finalAnswer: String.raw`א. הוכח. ב. היקף המעוין $52$.`,
        answers: [{ label: 'היקף המעוין', value: 52 }],
      },
      {
        id: 'geo-quadrilaterals-proof-6',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא מלבן, והנקודות $K$, $L$, $M$, $N$ הן אמצעי הצלעות $AB$, $BC$, $CD$, $DA$ (ראו שרטוט). הוכיחו: $KLMN$ מעוין.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26,199.2 294,199.2 294,40.8 26,40.8" />
  <polygon points="160,199.2 294,120 160,40.8 26,120" />
  <polyline points="35,199.2 35,190.2 26,190.2" stroke-width="1" />
  <text x="14.7" y="211.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="305.3" y="211.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="305.3" y="39.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="14.7" y="39.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="160" y="217.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">K</text>
  <text x="307" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">L</text>
  <text x="160" y="33.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">M</text>
  <text x="13" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">N</text>
</svg>`,
        hints: [
          String.raw`כמו בתרגיל 3: כל צלע של $KLMN$ היא קטע אמצעים, ושווה למחצית אחד האלכסונים של $ABCD$.`,
          String.raw`באיזו תכונה של המלבן כדאי להשתמש? אלכסוני המלבן שווים.`,
        ],
        solutionSteps: [
          String.raw`במשולש $ABC$: $KL$ קטע אמצעים, ולכן $KL=\frac{AC}{2}$. במשולש $ADC$: $NM$ קטע אמצעים, ולכן $NM=\frac{AC}{2}$.`,
          String.raw`במשולש $ABD$: $KN$ קטע אמצעים, ולכן $KN=\frac{BD}{2}$. במשולש $CBD$: $LM=\frac{BD}{2}$.`,
          String.raw`אלכסוני המלבן שווים: $AC=BD$.`,
          String.raw`לכן $KL=LM=MN=NK$. מרובע שבו שני זוגות של צלעות נגדיות שוות הוא מקבילית, ומקבילית שבה שתי צלעות סמוכות שוות היא מעוין – ולכן $KLMN$ מעוין.`,
        ],
        finalAnswer: String.raw`$KL=LM=MN=NK=\frac{AC}{2}$, ולכן $KLMN$ מעוין.`,
      },
      {
        id: 'geo-quadrilaterals-proof-7',
        difficulty: 3,
        statement: String.raw`$ABCD$ היא מקבילית שאינה מעוין. חוצי הזוויות של המקבילית נחתכים ויוצרים את המרובע $PQRS$ (ראו שרטוט): $P$ היא נקודת המפגש של חוצי הזוויות $A$ ו-$B$, $Q$ – של חוצי הזוויות $B$ ו-$C$, $R$ – של $C$ ו-$D$, ו-$S$ – של $D$ ו-$A$. הוכיחו: $PQRS$ מלבן.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26,172.4 233.5,172.4 294,67.6 86.5,67.6" />
  <polygon points="181.6,82.6 203.2,120 138.4,157.4 116.8,120" />
  <line x1="26" y1="172.4" x2="181.6" y2="82.6" stroke-width="1.5" />
  <line x1="233.5" y1="172.4" x2="181.6" y2="82.6" stroke-width="1.5" />
  <line x1="294" y1="67.6" x2="138.4" y2="157.4" stroke-width="1.5" />
  <line x1="86.5" y1="67.6" x2="138.4" y2="157.4" stroke-width="1.5" />
  <text x="13.4" y="181.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="244.7" y="184.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="306.6" y="69.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="75.3" y="66.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="194.2" y="84.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">P</text>
  <text x="215.8" y="128.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">Q</text>
  <text x="125.8" y="166.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">R</text>
  <text x="104.2" y="122.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">S</text>
</svg>`,
        hints: [
          String.raw`חשבו את $\angle APB$: במשולש $APB$ הזוויות שליד $A$ ו-$B$ הן מחציות של זוויות סמוכות במקבילית.`,
          String.raw`$\angle PAB+\angle PBA=\frac{\angle A+\angle B}{2}=90^\circ$, ולכן $\angle APB=90^\circ$. באותו אופן בשאר הקודקודים.`,
        ],
        solutionSteps: [
          String.raw`$\angle DAB+\angle ABC=180^\circ$ – זוויות סמוכות במקבילית (זוויות חד-צדדיות בין $AD\parallel BC$).`,
          String.raw`$AP$ ו-$BP$ חוצי זוויות, ולכן $\angle PAB+\angle PBA=\frac{180^\circ}{2}=90^\circ$, ובמשולש $APB$: $\angle APB=90^\circ$.`,
          String.raw`באותו אופן, כל שני קודקודים סמוכים של המקבילית יוצרים זוג זוויות סמוכות שסכומן $180^\circ$, ולכן גם $\angle BQC=\angle CRD=\angle DSA=90^\circ$.`,
          String.raw`כל זווית של המרובע $PQRS$ נוצרת על ידי שני חוצי זוויות של קודקודים סמוכים, ולכן היא שווה לאחת הזוויות שחישבנו (אותה זווית או זווית קודקודית לה): $\angle P=\angle Q=\angle R=\angle S=90^\circ$.`,
          String.raw`מרובע שכל זוויותיו ישרות הוא מלבן (שני זוגות של זוויות נגדיות שוות – מקבילית, ויש בה זווית ישרה), ולכן $PQRS$ מלבן.`,
          String.raw`הערה: הנתון שהמקבילית אינה מעוין מבטיח שהנקודות שונות זו מזו – במעוין חוצי הזוויות הם האלכסונים, וכולם נפגשים בנקודה אחת.`,
        ],
        finalAnswer: String.raw`כל זווית של $PQRS$ היא $90^\circ$, ולכן $PQRS$ מלבן.`,
      },
      {
        id: 'geo-quadrilaterals-proof-8',
        difficulty: 3,
        statement: String.raw`$ABCD$ הוא טרפז ($AB\parallel DC$) שבו האלכסונים שווים: $AC=BD$ (ראו שרטוט).

א. הוכיחו: הטרפז שווה שוקיים ($AD=BC$). הדרכה: העבירו דרך $B$ ישר המקביל ל-$AC$, החותך את המשך $DC$ בנקודה $E$.

ב. נתון: $AB=7$, $DC=17$ ו-$AC=13$. חשבו את גובה הטרפז ואת אורך השוק $BC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="81.8,92.1 160,92.1 215.8,147.9 26,147.9" />
  <line x1="81.8" y1="92.1" x2="215.8" y2="147.9" stroke-width="1.5" />
  <line x1="160" y1="92.1" x2="26" y2="147.9" stroke-width="1.5" />
  <line x1="160" y1="92.1" x2="294" y2="147.9" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="215.8" y1="147.9" x2="294" y2="147.9" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="160" y1="92.1" x2="160" y2="147.9" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="160,138.9 169,138.9 169,147.9" stroke-width="1" />
  <text x="72.6" y="88.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="160" y="84.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="215.8" y="166.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="13.4" y="156.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="306.6" y="156.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="160" y="166.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">H</text>
</svg>`,
        hints: [
          String.raw`$ABEC$ מקבילית (שני זוגות של צלעות נגדיות מקבילים), ולכן $BE=AC=BD$.`,
          String.raw`המשולש $DBE$ שווה שוקיים: $\angle BDE=\angle BED$, ו-$\angle BED=\angle ACD$ (זוויות מתאימות). השוו את $\triangle ACD$ ו-$\triangle BDC$.`,
          String.raw`לסעיף ב: $DE=DC+CE=17+7=24$, והגובה מ-$B$ במשולש שווה השוקיים $DBE$ הוא גם תיכון.`,
        ],
        solutionSteps: [
          String.raw`א. $AB\parallel CE$ ($E$ על הישר $DC$) ו-$BE\parallel AC$ (בנייה), ולכן $ABEC$ מקבילית, ו-$BE=AC$, $CE=AB$ (צלעות נגדיות במקבילית).`,
          String.raw`$AC=BD$ (נתון), ולכן $BE=BD$ – המשולש $DBE$ שווה שוקיים, ו-$\angle BDE=\angle BED$.`,
          String.raw`$\angle BED=\angle ACD$ – זוויות מתאימות בין הישרים המקבילים $BE$ ו-$AC$ והחותך $DE$. מכאן $\angle BDC=\angle ACD$.`,
          String.raw`ב-$\triangle ACD$ וב-$\triangle BDC$: $AC=BD$ (נתון), $\angle ACD=\angle BDC$, ו-$DC$ צלע משותפת. לכן $\triangle ACD\cong\triangle BDC$ (צ.ז.צ), ו-$AD=BC$ – הטרפז שווה שוקיים.`,
          String.raw`ב. $DE=DC+CE=17+7=24$. נוריד את הגובה $BH$ במשולש שווה השוקיים $DBE$; הוא גם תיכון, ולכן $DH=12$, ולפי פיתגורס $BH=\sqrt{13^2-12^2}=5$ – זה גובה הטרפז.`,
          String.raw`$HC=DC-DH=17-12=5$, ובמשולש ישר הזווית $BHC$: $BC=\sqrt{5^2+5^2}=5\sqrt2\approx7.07$.`,
        ],
        finalAnswer: String.raw`א. הוכח. ב. גובה הטרפז $5$, $BC=5\sqrt2$.`,
        answers: [
          { label: 'גובה הטרפז', value: 5 },
          { label: String.raw`$BC$`, value: 5 * Math.sqrt(2) },
        ],
      },
    ],
  },
  'geo-circles-basic': {
    intro: String.raw`בשיעור זה מחשבים זוויות ואורכים במעגל: זווית היקפית וזווית מרכזית, זווית הנשענת על קוטר, מיתרים והמרחק שלהם מהמרכז, משיקים ושני משיקים מנקודה, ושני מעגלים נחתכים או משיקים. בשאלה 4 בבגרות כמעט תמיד מופיע מעגל, והמשפטים האלה הם הנימוקים של סעיפי החישוב. טיפ: מסמנים בשרטוט את מרכז המעגל ואת הרדיוסים – רדיוסים שווים יוצרים משולשים שווי שוקיים, ורדיוס לנקודת השקה יוצר זווית ישרה.`,
    keyFacts: [
      String.raw`**זווית היקפית** שווה למחצית הזווית המרכזית הנשענת על אותה קשת. זוויות היקפיות הנשענות על אותה קשת שוות זו לזו, ו**זווית היקפית הנשענת על קוטר היא ישרה**.`,
      String.raw`**מיתרים**: האנך מהמרכז למיתר חוצה את המיתר (ולהפך – הקטע מהמרכז לאמצע מיתר מאונך לו). מיתרים שווים נמצאים במרחקים שווים מהמרכז. בחישוב: $r^2=d^2+\left(\frac{\ell}{2}\right)^2$, כאשר $d$ המרחק מהמרכז ו-$\ell$ אורך המיתר.`,
      String.raw`**משיק** מאונך לרדיוס בנקודת ההשקה. **שני משיקים** למעגל מנקודה חיצונית שווים זה לזה, והקטע מהנקודה למרכז חוצה את הזווית שביניהם.`,
      String.raw`**הזווית בין משיק למיתר** שווה לזווית ההיקפית הנשענת על המיתר מהצד השני.`,
      String.raw`**שני מעגלים**: מעגלים משיקים – המרכזים ונקודת ההשקה על ישר אחד, ומרחק המרכזים $R+r$ (השקה מבחוץ) או $R-r$ (השקה מבפנים). מעגלים נחתכים – קו המרכזים הוא האנך האמצעי של המיתר המשותף.`,
    ],
    exercises: [
      {
        id: 'geo-circles-basic-1',
        difficulty: 1,
        statement: String.raw`במעגל שמרכזו $O$ נתון $\angle AOB=110^\circ$. הנקודה $C$ נמצאת על הקשת הגדולה $AB$, והנקודה $D$ על הקשת הקטנה $AB$ (ראו שרטוט). חשבו את $\angle ACB$ ואת $\angle ADB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="83" y1="173.9" x2="135.7" y2="29.2" />
  <line x1="135.7" y1="29.2" x2="237" y2="173.9" />
  <line x1="83" y1="173.9" x2="176.3" y2="212.6" />
  <line x1="176.3" y1="212.6" x2="237" y2="173.9" />
  <line x1="160" y1="120" x2="83" y2="173.9" stroke-width="1.5" />
  <line x1="160" y1="120" x2="237" y2="173.9" stroke-width="1.5" />
  <circle cx="160" cy="120" r="94" stroke-width="1.5" />
  <path d="M 148.5 128 A 14 14 0 0 0 171.5 128" stroke-width="1.2" />
  <circle cx="160" cy="120" r="2.5" fill="currentColor" />
  <text x="160" y="112.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
  <text x="71.7" y="185.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="248.3" y="185.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="132.3" y="22.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="179.7" y="230.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`$\angle ACB$ היא זווית היקפית הנשענת על אותה קשת כמו הזווית המרכזית $\angle AOB$.`,
          String.raw`$\angle ADB$ נשענת על הקשת הגדולה $AB$, שהזווית המרכזית שלה היא $360^\circ-110^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$\angle ACB$ היא זווית היקפית הנשענת על הקשת הקטנה $AB$, שעליה נשענת גם הזווית המרכזית $\angle AOB$. לכן $\angle ACB=\frac{110^\circ}{2}=55^\circ$.`,
          String.raw`$\angle ADB$ נשענת על הקשת הגדולה $AB$, שהזווית המרכזית שלה היא $360^\circ-110^\circ=250^\circ$. לכן $\angle ADB=\frac{250^\circ}{2}=125^\circ$.`,
        ],
        finalAnswer: String.raw`$\angle ACB=55^\circ$, $\angle ADB=125^\circ$`,
        answers: [
          { label: String.raw`$\angle ACB$`, value: 55 },
          { label: String.raw`$\angle ADB$`, value: 125 },
        ],
      },
      {
        id: 'geo-circles-basic-2',
        difficulty: 1,
        statement: String.raw`במעגל שמרכזו $O$ ורדיוסו $13$ העבירו מיתר $AB$ שאורכו $24$ (ראו שרטוט). חשבו את המרחק של המיתר ממרכז המעגל.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="73.2" y1="156.2" x2="246.8" y2="156.2" />
  <line x1="160" y1="120" x2="73.2" y2="156.2" stroke-width="1.5" />
  <line x1="160" y1="120" x2="160" y2="156.2" stroke-width="1.5" />
  <circle cx="160" cy="120" r="94" stroke-width="1.5" />
  <polyline points="160,147.2 169,147.2 169,156.2" stroke-width="1" />
  <circle cx="160" cy="120" r="2.5" fill="currentColor" />
  <text x="160" y="112.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
  <text x="62" y="168.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="258" y="168.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="160" y="174.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">M</text>
</svg>`,
        hints: [
          String.raw`הורידו אנך $OM$ מהמרכז למיתר. האנך חוצה את המיתר.`,
          String.raw`במשולש ישר הזווית $OMA$: $OA=13$ ו-$AM=12$.`,
        ],
        solutionSteps: [
          String.raw`נוריד אנך $OM$ למיתר. האנך מהמרכז למיתר חוצה אותו, ולכן $AM=\frac{24}{2}=12$.`,
          String.raw`במשולש ישר הזווית $OMA$ ($OA=13$ – רדיוס): $OM=\sqrt{13^2-12^2}=\sqrt{25}=5$.`,
        ],
        finalAnswer: String.raw`המרחק $OM=5$`,
        answers: [{ label: String.raw`$OM$`, value: 5 }],
      },
      {
        id: 'geo-circles-basic-3',
        difficulty: 2,
        statement: String.raw`$AB$ הוא קוטר במעגל שמרכזו $O$. הנקודות $C$ ו-$D$ נמצאות על המעגל משני צדי הקוטר (ראו שרטוט). נתון: $\angle CAB=35^\circ$. חשבו את $\angle ABC$ ואת $\angle BDC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="66" y1="120" x2="254" y2="120" />
  <line x1="66" y1="120" x2="192.1" y2="31.7" />
  <line x1="254" y1="120" x2="192.1" y2="31.7" />
  <line x1="120.3" y1="205.2" x2="254" y2="120" />
  <line x1="120.3" y1="205.2" x2="192.1" y2="31.7" />
  <circle cx="160" cy="120" r="94" stroke-width="1.5" />
  <path d="M 88 120 A 22 22 0 0 0 84 107.4" stroke-width="1.2" />
  <circle cx="160" cy="120" r="2.5" fill="currentColor" />
  <text x="160" y="138.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
  <text x="53" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="267" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="195.5" y="24.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="113.8" y="222" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`זווית היקפית הנשענת על קוטר היא ישרה: $\angle ACB=90^\circ$.`,
          String.raw`$\angle BDC$ ו-$\angle BAC$ נשענות על אותה קשת $BC$.`,
        ],
        solutionSteps: [
          String.raw`$\angle ACB$ היא זווית היקפית הנשענת על הקוטר $AB$, ולכן $\angle ACB=90^\circ$.`,
          String.raw`סכום הזוויות במשולש $ABC$: $\angle ABC=180^\circ-90^\circ-35^\circ=55^\circ$.`,
          String.raw`$\angle BDC$ ו-$\angle BAC$ הן זוויות היקפיות הנשענות על אותה קשת $BC$, ולכן $\angle BDC=\angle BAC=35^\circ$.`,
        ],
        finalAnswer: String.raw`$\angle ABC=55^\circ$, $\angle BDC=35^\circ$`,
        answers: [
          { label: String.raw`$\angle ABC$`, value: 55 },
          { label: String.raw`$\angle BDC$`, value: 35 },
        ],
      },
      {
        id: 'geo-circles-basic-4',
        difficulty: 2,
        statement: String.raw`מהנקודה $P$ העבירו שני משיקים $PA$ ו-$PB$ למעגל שמרכזו $O$ ($A$ ו-$B$ נקודות ההשקה; ראו שרטוט). נתון: $\angle APB=50^\circ$. חשבו את $\angle AOB$ ואת $\angle OAB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="294" y1="120" x2="139.3" y2="47.8" />
  <line x1="294" y1="120" x2="139.3" y2="192.2" />
  <line x1="139.3" y1="47.8" x2="139.3" y2="192.2" />
  <line x1="105.6" y1="120" x2="139.3" y2="47.8" stroke-width="1.5" />
  <line x1="105.6" y1="120" x2="139.3" y2="192.2" stroke-width="1.5" />
  <circle cx="105.6" cy="120" r="79.6" stroke-width="1.5" />
  <path d="M 272.2 109.9 A 24 24 0 0 0 272.2 130.1" stroke-width="1.2" />
  <circle cx="105.6" cy="120" r="2.5" fill="currentColor" />
  <text x="92.6" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
  <text x="307" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">P</text>
  <text x="145.8" y="42.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="145.8" y="208.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
</svg>`,
        hints: [
          String.raw`המשיק מאונך לרדיוס בנקודת ההשקה: $\angle OAP=\angle OBP=90^\circ$.`,
          String.raw`סכום הזוויות במרובע $OAPB$ הוא $360^\circ$, והמשולש $AOB$ שווה שוקיים ($OA=OB$).`,
        ],
        solutionSteps: [
          String.raw`המשיק מאונך לרדיוס בנקודת ההשקה, ולכן $\angle OAP=\angle OBP=90^\circ$.`,
          String.raw`סכום הזוויות במרובע $OAPB$ הוא $360^\circ$: $\angle AOB=360^\circ-90^\circ-90^\circ-50^\circ=130^\circ$.`,
          String.raw`$OA=OB$ (רדיוסים), ולכן במשולש $AOB$: $\angle OAB=\angle OBA=\frac{180^\circ-130^\circ}{2}=25^\circ$.`,
          String.raw`בדיקה: $PA=PB$ (שני משיקים מנקודה), ולכן $\angle PAB=\frac{180^\circ-50^\circ}{2}=65^\circ$, ואכן $\angle OAB=90^\circ-65^\circ=25^\circ$.`,
        ],
        finalAnswer: String.raw`$\angle AOB=130^\circ$, $\angle OAB=25^\circ$`,
        answers: [
          { label: String.raw`$\angle AOB$`, value: 130 },
          { label: String.raw`$\angle OAB$`, value: 25 },
        ],
      },
      {
        id: 'geo-circles-basic-5',
        difficulty: 2,
        statement: String.raw`מהנקודה $P$ העבירו שני משיקים $PA$ ו-$PB$ למעגל שמרכזו $O$ ורדיוסו $5$, ונתון $OP=13$. בנקודה $C$ שעל הקשת הקטנה $AB$ העבירו משיק שלישי, החותך את $PA$ בנקודה $D$ ואת $PB$ בנקודה $E$ (ראו שרטוט). חשבו את $PA$ ואת היקף המשולש $PDE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="294" y1="120" x2="129.1" y2="51.3" />
  <line x1="294" y1="120" x2="129.1" y2="188.7" />
  <line x1="159.2" y1="63.8" x2="194.7" y2="161.4" />
  <line x1="100.4" y1="120" x2="129.1" y2="51.3" stroke-width="1.5" />
  <circle cx="100.4" cy="120" r="74.4" stroke-width="1.5" />
  <circle cx="100.4" cy="120" r="2.5" fill="currentColor" />
  <text x="87.4" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
  <text x="307" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">P</text>
  <text x="135.6" y="45.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="135.6" y="205.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="183" y="96.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="162.6" y="56.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="201.2" y="178.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
</svg>`,
        hints: [
          String.raw`$\angle OAP=90^\circ$. השתמשו בפיתגורס במשולש $OAP$.`,
          String.raw`שני משיקים מנקודה שווים: $DA=DC$ ו-$EB=EC$.`,
          String.raw`היקף $PDE$ הוא $PD+DC+CE+EP=PD+DA+BE+EP=PA+PB$.`,
        ],
        solutionSteps: [
          String.raw`המשיק מאונך לרדיוס: $\angle OAP=90^\circ$. לפי פיתגורס במשולש $OAP$: $PA=\sqrt{13^2-5^2}=12$, וגם $PB=PA=12$ (שני משיקים מנקודה).`,
          String.raw`$DA=DC$ – שני משיקים למעגל מהנקודה $D$; $EC=EB$ – שני משיקים מהנקודה $E$.`,
          String.raw`היקף $PDE$: $PD+DE+EP=PD+(DC+CE)+EP=(PD+DA)+(BE+EP)=PA+PB=24$.`,
          String.raw`שימו לב: ההיקף אינו תלוי במיקום הנקודה $C$ על הקשת.`,
        ],
        finalAnswer: String.raw`$PA=12$, היקף המשולש $PDE$ הוא $24$.`,
        answers: [
          { label: String.raw`$PA$`, value: 12 },
          { label: String.raw`היקף $\triangle PDE$`, value: 24 },
        ],
      },
      {
        id: 'geo-circles-basic-6',
        difficulty: 2,
        statement: String.raw`שני מעגלים, שמרכזיהם $O_1$ ו-$O_2$ ורדיוסיהם $13$ ו-$15$, נחתכים בנקודות $A$ ו-$B$. אורך המיתר המשותף $AB$ הוא $24$, והמרכזים נמצאים משני צדי המיתר (ראו שרטוט). חשבו את המרחק בין המרכזים $O_1O_2$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="141.2" y1="44.8" x2="141.2" y2="195.2" />
  <line x1="109.9" y1="120" x2="197.6" y2="120" />
  <line x1="109.9" y1="120" x2="141.2" y2="44.8" stroke-width="1.5" />
  <line x1="197.6" y1="120" x2="141.2" y2="44.8" stroke-width="1.5" />
  <circle cx="109.9" cy="120" r="81.5" stroke-width="1.5" />
  <circle cx="197.6" cy="120" r="94" stroke-width="1.5" />
  <circle cx="109.9" cy="120" r="2.5" fill="currentColor" />
  <circle cx="197.6" cy="120" r="2.5" fill="currentColor" />
  <text x="116.4" y="136.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O<tspan font-size="11" dy="4">1</tspan></text>
  <text x="210.6" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O<tspan font-size="11" dy="4">2</tspan></text>
  <text x="137.8" y="37.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="137.8" y="213.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
</svg>`,
        hints: [
          String.raw`קו המרכזים $O_1O_2$ הוא האנך האמצעי של המיתר המשותף $AB$. סמנו את נקודת החיתוך ב-$M$.`,
          String.raw`$AM=12$. חשבו את $O_1M$ ואת $O_2M$ בעזרת פיתגורס.`,
        ],
        solutionSteps: [
          String.raw`כל אחד מהמרכזים נמצא במרחק שווה מ-$A$ ומ-$B$, ולכן שניהם על האנך האמצעי של $AB$: קו המרכזים מאונך ל-$AB$ וחוצה אותו. נסמן את נקודת החיתוך ב-$M$: $AM=MB=12$.`,
          String.raw`במשולש ישר הזווית $O_1MA$: $O_1M=\sqrt{13^2-12^2}=5$.`,
          String.raw`במשולש ישר הזווית $O_2MA$: $O_2M=\sqrt{15^2-12^2}=\sqrt{81}=9$.`,
          String.raw`המרכזים משני צדי המיתר, ולכן $O_1O_2=O_1M+MO_2=5+9=14$.`,
        ],
        finalAnswer: String.raw`$O_1O_2=14$`,
        answers: [{ label: String.raw`$O_1O_2$`, value: 14 }],
      },
      {
        id: 'geo-circles-basic-7',
        difficulty: 3,
        statement: String.raw`שני מעגלים, שמרכזיהם $O_1$ ו-$O_2$ ורדיוסיהם $9$ ו-$4$, משיקים זה לזה מבחוץ בנקודה $T$. ישר משיק לשני המעגלים בנקודות $A$ ו-$B$ (ראו שרטוט). חשבו את אורך הקטע $AB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="125.4" y1="204.1" x2="244.1" y2="204.1" />
  <line x1="125.4" y1="115.1" x2="244.1" y2="164.5" />
  <line x1="125.4" y1="115.1" x2="125.4" y2="204.1" stroke-width="1.5" />
  <line x1="244.1" y1="164.5" x2="244.1" y2="204.1" stroke-width="1.5" />
  <circle cx="125.4" cy="115.1" r="89.1" stroke-width="1.5" />
  <circle cx="244.1" cy="164.5" r="39.6" stroke-width="1.5" />
  <circle cx="125.4" cy="115.1" r="2.5" fill="currentColor" />
  <circle cx="244.1" cy="164.5" r="2.5" fill="currentColor" />
  <text x="116.2" y="111.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O<tspan font-size="11" dy="4">1</tspan></text>
  <text x="257.1" y="170" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O<tspan font-size="11" dy="4">2</tspan></text>
  <text x="125.4" y="222.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="244.1" y="222.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="195" y="158.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">T</text>
</svg>`,
        hints: [
          String.raw`$O_1A\perp AB$ ו-$O_2B\perp AB$. מה אורכו של $O_1O_2$?`,
          String.raw`העבירו מ-$O_2$ ישר המקביל ל-$AB$, החותך את $O_1A$ בנקודה $K$. $ABO_2K$ מלבן.`,
          String.raw`במשולש ישר הזווית $O_1KO_2$: $O_1K=9-4=5$ ו-$O_1O_2=13$.`,
        ],
        solutionSteps: [
          String.raw`המעגלים משיקים מבחוץ, ולכן $O_1$, $T$, $O_2$ על ישר אחד ו-$O_1O_2=9+4=13$.`,
          String.raw`המשיק מאונך לרדיוס בנקודת ההשקה: $O_1A\perp AB$ ו-$O_2B\perp AB$.`,
          String.raw`נעביר מ-$O_2$ ישר המקביל ל-$AB$, החותך את $O_1A$ בנקודה $K$. המרובע $ABO_2K$ הוא מלבן (יש בו שלוש זוויות ישרות), ולכן $KO_2=AB$ ו-$AK=BO_2=4$.`,
          String.raw`$O_1K=O_1A-AK=9-4=5$, והמשולש $O_1KO_2$ ישר זווית ב-$K$.`,
          String.raw`לפי פיתגורס: $AB=KO_2=\sqrt{13^2-5^2}=\sqrt{144}=12$.`,
        ],
        finalAnswer: String.raw`$AB=12$`,
        answers: [{ label: String.raw`$AB$`, value: 12 }],
      },
      {
        id: 'geo-circles-basic-8',
        difficulty: 3,
        statement: String.raw`המשולש $ABC$ חסום במעגל שמרכזו $O$. נתון: $\angle BAC=70^\circ$ ו-$\angle ABC=50^\circ$. בנקודה $A$ העבירו משיק למעגל, ועליו סימנו נקודה $T$, כך ש-$T$ ו-$C$ נמצאות משני צדי הישר $AB$ (ראו שרטוט). חשבו את $\angle OAB$, את $\angle OAC$ ואת $\angle TAB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160,26 78.6,167 252.6,136.3" />
  <line x1="75.4" y1="26" x2="244.6" y2="26" />
  <line x1="160" y1="120" x2="160" y2="26" stroke-width="1.5" />
  <line x1="160" y1="120" x2="78.6" y2="167" stroke-width="1.5" />
  <line x1="160" y1="120" x2="252.6" y2="136.3" stroke-width="1.5" />
  <circle cx="160" cy="120" r="94" stroke-width="1.5" />
  <circle cx="160" cy="120" r="2.5" fill="currentColor" />
  <text x="163.4" y="138.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
  <text x="160" y="18.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="67.3" y="179" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="265.1" y="145.2" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="64.1" y="25" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">T</text>
</svg>`,
        hints: [
          String.raw`חשבו את $\angle ACB$, ומשם את הזווית המרכזית $\angle AOB$.`,
          String.raw`המשולשים $AOB$ ו-$AOC$ שווי שוקיים (רדיוסים).`,
          String.raw`המשיק מאונך לרדיוס: $\angle TAO=90^\circ$. (זו גם הזווית בין משיק למיתר.)`,
        ],
        solutionSteps: [
          String.raw`סכום הזוויות במשולש: $\angle ACB=180^\circ-70^\circ-50^\circ=60^\circ$.`,
          String.raw`הזווית המרכזית $\angle AOB$ נשענת על אותה קשת כמו הזווית ההיקפית $\angle ACB$, ולכן $\angle AOB=2\cdot60^\circ=120^\circ$. $OA=OB$ (רדיוסים), ולכן $\angle OAB=\frac{180^\circ-120^\circ}{2}=30^\circ$.`,
          String.raw`באותו אופן $\angle AOC=2\angle ABC=100^\circ$, ו-$\angle OAC=\frac{180^\circ-100^\circ}{2}=40^\circ$ (בדיקה: $30^\circ+40^\circ=70^\circ=\angle BAC$).`,
          String.raw`המשיק מאונך לרדיוס: $\angle TAO=90^\circ$, ולכן $\angle TAB=90^\circ-\angle OAB=90^\circ-30^\circ=60^\circ$.`,
          String.raw`זה מתאים למשפט: הזווית בין המשיק למיתר $AB$ שווה לזווית ההיקפית $\angle ACB=60^\circ$ הנשענת על המיתר מהצד השני.`,
        ],
        finalAnswer: String.raw`$\angle OAB=30^\circ$, $\angle OAC=40^\circ$, $\angle TAB=60^\circ$`,
        answers: [
          { label: String.raw`$\angle OAB$`, value: 30 },
          { label: String.raw`$\angle OAC$`, value: 40 },
          { label: String.raw`$\angle TAB$`, value: 60 },
        ],
      },
    ],
  },
  'geo-circles-proof': {
    intro: String.raw`בשיעור זה מוכיחים טענות במעגל: חפיפת משולשים בעזרת רדיוסים ומשיקים, זוויות היקפיות שוות, מרובע חסום במעגל ומרובע חוסם מעגל, ומקומות גאומטריים (אנך אמצעי וחוצה זווית). בשאלה 4 בבגרות מופיעות טענות כמו ״הוכיחו כי המרובע חסום במעגל״ או ״הוכיחו כי $PO$ חוצה את הזווית״ – ובכל אחת מהן הנימוק הוא משפט מעגל מדויק.`,
    keyFacts: [
      String.raw`**מרובע חסום במעגל**: סכום כל שתי זוויות נגדיות הוא $180^\circ$, ולהפך – מרובע שבו סכום זוג זוויות נגדיות הוא $180^\circ$ חסום במעגל. מקבילית חסומה היא מלבן, וטרפז חסום הוא שווה שוקיים.`,
      String.raw`**מרובע חוסם מעגל** (כל צלעותיו משיקות למעגל): סכומי הצלעות הנגדיות שווים, $AB+CD=AD+BC$ – זה נובע משוויון שני משיקים מנקודה. גם ההפך נכון.`,
      String.raw`**מקומות גאומטריים**: האנך האמצעי של קטע – כל הנקודות שמרחקן מקצות הקטע שווה; חוצה זווית – כל הנקודות שמרחקן משוקי הזווית שווה. מפגש האנכים האמצעיים במשולש – מרכז המעגל החוסם; מפגש חוצי הזוויות – מרכז המעגל החסום.`,
      String.raw`**כלים להוכחה במעגל**: רדיוסים שווים (משולש שווה שוקיים), זווית ישרה בין משיק לרדיוס, זווית היקפית ישרה הנשענת על קוטר, זוויות היקפיות על אותה קשת. מיתרים שווים, קשתות שוות וזוויות מרכזיות שוות – כל אחד מהם גורר את האחרים.`,
      String.raw`**זווית ישרה ומעגל**: אם $\angle AXB=90^\circ$, הנקודה $X$ נמצאת על המעגל שקוטרו $AB$ (התיכון ליתר שווה למחצית היתר). ולהפך: תיכון השווה למחצית הצלע שאליה הוא יורד מעיד על זווית ישרה.`,
    ],
    exercises: [
      {
        id: 'geo-circles-proof-1',
        difficulty: 1,
        statement: String.raw`מהנקודה $P$ העבירו שני משיקים $PA$ ו-$PB$ למעגל שמרכזו $O$ (ראו שרטוט). הוכיחו: $PO$ חוצה את הזווית $APB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="294" y1="120" x2="133.2" y2="49.8" />
  <line x1="294" y1="120" x2="133.2" y2="190.2" />
  <line x1="294" y1="120" x2="102.6" y2="120" />
  <line x1="102.6" y1="120" x2="133.2" y2="49.8" stroke-width="1.5" />
  <line x1="102.6" y1="120" x2="133.2" y2="190.2" stroke-width="1.5" />
  <circle cx="102.6" cy="120" r="76.6" stroke-width="1.5" />
  <circle cx="102.6" cy="120" r="2.5" fill="currentColor" />
  <text x="89.6" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
  <text x="307" y="125.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">P</text>
  <text x="139.7" y="44.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="139.7" y="206.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
</svg>`,
        hints: [
          String.raw`השוו את המשולשים $OAP$ ו-$OBP$.`,
          String.raw`$\angle OAP=\angle OBP=90^\circ$, $OA=OB$, ו-$OP$ משותפת – צ.צ.ז (הזווית הישרה נמצאת מול היתר $OP$).`,
        ],
        solutionSteps: [
          String.raw`$\angle OAP=\angle OBP=90^\circ$ – משיק מאונך לרדיוס בנקודת ההשקה.`,
          String.raw`$OA=OB$ – רדיוסים.`,
          String.raw`$OP=OP$ – צלע משותפת. זה היתר בשני המשולשים, הצלע הגדולה, שמולה נמצאת הזווית הישרה.`,
          String.raw`$\triangle OAP\cong\triangle OBP$ – לפי משפט החפיפה צ.צ.ז.`,
          String.raw`$\angle APO=\angle BPO$ – זוויות מתאימות במשולשים חופפים, ולכן $PO$ חוצה את $\angle APB$. (מהחפיפה נובע גם $PA=PB$.)`,
        ],
        finalAnswer: String.raw`$\triangle OAP\cong\triangle OBP$ (צ.צ.ז), ולכן $\angle APO=\angle BPO$.`,
      },
      {
        id: 'geo-circles-proof-2',
        difficulty: 1,
        statement: String.raw`$AB$ ו-$CD$ הם שני קטרים במעגל שמרכזו $O$ (ראו שרטוט). הוכיחו: המרובע $ACBD$ הוא מלבן.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="71.7,87.9 232,59.6 248.3,152.1 88,180.4" />
  <line x1="71.7" y1="87.9" x2="248.3" y2="152.1" stroke-width="1.5" />
  <line x1="232" y1="59.6" x2="88" y2="180.4" stroke-width="1.5" />
  <circle cx="160" cy="120" r="94" stroke-width="1.5" />
  <circle cx="160" cy="120" r="2.5" fill="currentColor" />
  <text x="163.4" y="138.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
  <text x="59.1" y="90" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="260.9" y="161" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="241.2" y="55.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="78.8" y="195.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`מה ידוע על האלכסונים $AB$ ו-$CD$ של המרובע?`,
          String.raw`הקטרים שווים זה לזה וחוצים זה את זה ב-$O$. מקבילית שאלכסוניה שווים היא מלבן.`,
        ],
        solutionSteps: [
          String.raw`$OA=OB=OC=OD$ – רדיוסים. לכן האלכסונים $AB$ ו-$CD$ של המרובע $ACBD$ חוצים זה את זה, ו-$ACBD$ מקבילית.`,
          String.raw`$AB=CD$ – שני קטרים (כל אחד מהם שווה לשני רדיוסים).`,
          String.raw`מקבילית שאלכסוניה שווים היא מלבן, ולכן $ACBD$ מלבן.`,
          String.raw`דרך נוספת: כל זווית של המרובע היא זווית היקפית הנשענת על קוטר, ולכן $\angle ACB=\angle CBD=\angle BDA=\angle DAC=90^\circ$.`,
        ],
        finalAnswer: String.raw`האלכסונים $AB$ ו-$CD$ שווים וחוצים זה את זה, ולכן $ACBD$ מלבן.`,
      },
      {
        id: 'geo-circles-proof-3',
        difficulty: 2,
        statement: String.raw`במשולש חד-הזוויות $ABC$ העבירו את הגבהים $BE$ ו-$CF$ ($E$ על $AC$, $F$ על $AB$; ראו שרטוט). הוכיחו:

א. הנקודות $B$, $C$, $E$, $F$ נמצאות על מעגל אחד.

ב. $\angle AEF=\angle ABC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="125.1,26 39.1,214 280.9,214" />
  <line x1="39.1" y1="214" x2="182.5" y2="95.2" stroke-width="1.5" />
  <line x1="280.9" y1="214" x2="80.9" y2="122.6" stroke-width="1.5" />
  <line x1="182.5" y1="95.2" x2="80.9" y2="122.6" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="175.5,101 169.8,94.1 176.7,88.3" stroke-width="1" />
  <polyline points="89.1,126.3 92.9,118.2 84.7,114.4" stroke-width="1" />
  <text x="121.7" y="18.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="30" y="228.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="292.1" y="226" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="191.7" y="91.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="69.7" y="121.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
</svg>`,
        hints: [
          String.raw`סמנו ב-$M$ את אמצע $BC$. במשולשים ישרי הזווית $BEC$ ו-$BFC$, $EM$ ו-$FM$ הם תיכונים ליתר.`,
          String.raw`התיכון ליתר שווה למחצית היתר, ולכן $MB=MC=ME=MF$.`,
          String.raw`לסעיף ב: במרובע החסום $BCEF$ הזוויות הנגדיות משלימות ל-$180^\circ$, ו-$\angle AEF$ צמודה ל-$\angle FEC$.`,
        ],
        solutionSteps: [
          String.raw`א. $\angle BEC=\angle BFC=90^\circ$ – $BE$ ו-$CF$ גבהים.`,
          String.raw`נסמן ב-$M$ את אמצע $BC$. במשולש ישר הזווית $BEC$ התיכון ליתר שווה למחצית היתר: $ME=\frac{BC}{2}$. באותו אופן במשולש ישר הזווית $BFC$: $MF=\frac{BC}{2}$.`,
          String.raw`$MB=MC=ME=MF=\frac{BC}{2}$, ולכן $B$, $C$, $E$, $F$ נמצאות על מעגל שמרכזו $M$ – המעגל שקוטרו $BC$.`,
          String.raw`ב. המרובע $BCEF$ חסום במעגל, ולכן סכום הזוויות הנגדיות בו הוא $180^\circ$: $\angle FEC+\angle FBC=180^\circ$.`,
          String.raw`$\angle AEF+\angle FEC=180^\circ$ – זוויות צמודות ($A$, $E$, $C$ על ישר אחד).`,
          String.raw`מכאן $\angle AEF=\angle FBC=\angle ABC$.`,
        ],
        finalAnswer: String.raw`$BCEF$ חסום במעגל שקוטרו $BC$, ולכן $\angle AEF=\angle ABC$.`,
      },
      {
        id: 'geo-circles-proof-4',
        difficulty: 2,
        statement: String.raw`במעגל העבירו שני מיתרים מקבילים $AB$ ו-$CD$, כך שהקטעים $AC$ ו-$BD$ אינם נחתכים (ראו שרטוט). הוכיחו: $AC=BD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="84.8" y1="63.6" x2="235.2" y2="63.6" />
  <line x1="103.6" y1="195.2" x2="216.4" y2="195.2" />
  <line x1="84.8" y1="63.6" x2="103.6" y2="195.2" />
  <line x1="235.2" y1="63.6" x2="216.4" y2="195.2" />
  <circle cx="160" cy="120" r="94" stroke-width="1.5" />
  <circle cx="160" cy="120" r="2.5" fill="currentColor" />
  <text x="160" y="112.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
  <text x="73.5" y="62.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="246.5" y="62.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="97.1" y="212" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="222.9" y="212" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`העבירו את המיתר $AD$. אילו זוויות שוות נוצרות בין המקבילים?`,
          String.raw`$\angle BAD=\angle ADC$ (זוויות מתחלפות). אלה זוויות היקפיות – על אילו קשתות הן נשענות?`,
        ],
        solutionSteps: [
          String.raw`נעביר את המיתר $AD$. $AB\parallel CD$, ולכן $\angle BAD=\angle ADC$ – זוויות מתחלפות בין ישרים מקבילים.`,
          String.raw`$\angle BAD$ היא זווית היקפית הנשענת על הקשת $BD$, ו-$\angle ADC$ היא זווית היקפית הנשענת על הקשת $AC$.`,
          String.raw`במעגל, זוויות היקפיות שוות נשענות על קשתות שוות, ולקשתות שוות מתאימים מיתרים שווים. לכן $AC=BD$.`,
          String.raw`מסקנה: טרפז החסום במעגל הוא שווה שוקיים.`,
        ],
        finalAnswer: String.raw`$\angle BAD=\angle ADC$, ולכן הקשתות $BD$ ו-$AC$ שוות, ו-$AC=BD$.`,
      },
      {
        id: 'geo-circles-proof-5',
        difficulty: 2,
        statement: String.raw`לשני מעגלים מרכז משותף $O$. המיתר $AB$ של המעגל הגדול משיק למעגל הקטן בנקודה $M$ (ראו שרטוט).

א. הוכיחו: $AM=MB$.

ב. נתון: רדיוס המעגל הגדול $10$ ורדיוס המעגל הקטן $6$. חשבו את אורך המיתר $AB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="211.4" y1="198.7" x2="70" y2="147.3" />
  <circle cx="160" cy="120" r="56.4" stroke-width="1.5" />
  <circle cx="160" cy="120" r="94" stroke-width="1.5" />
  <circle cx="160" cy="120" r="2.5" fill="currentColor" />
  <text x="163.4" y="112.9" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O</text>
  <text x="217.9" y="215.5" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="57.5" y="156.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="137.3" y="191.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">M</text>
</svg>`,
        hints: [
          String.raw`חברו את $O$ ל-$M$. מהי הזווית בין $OM$ ל-$AB$?`,
          String.raw`$OM$ מאונך למיתר $AB$ של המעגל הגדול – והאנך מהמרכז למיתר חוצה אותו.`,
          String.raw`לסעיף ב: במשולש $OMA$: $OA=10$ ו-$OM=6$.`,
        ],
        solutionSteps: [
          String.raw`א. $AB$ משיק למעגל הקטן ב-$M$, ולכן $OM\perp AB$ (משיק מאונך לרדיוס בנקודת ההשקה).`,
          String.raw`$AB$ הוא מיתר במעגל הגדול, ו-$OM$ הוא האנך ממרכז המעגל הגדול למיתר. האנך מהמרכז למיתר חוצה אותו, ולכן $AM=MB$.`,
          String.raw`(אפשר גם בחפיפה: $\triangle OMA\cong\triangle OMB$ לפי צ.צ.ז – $OA=OB$, $OM$ משותפת, $\angle OMA=\angle OMB=90^\circ$.)`,
          String.raw`ב. במשולש ישר הזווית $OMA$: $OA=10$ (רדיוס המעגל הגדול) ו-$OM=6$ (רדיוס המעגל הקטן), ולכן $AM=\sqrt{10^2-6^2}=8$.`,
          String.raw`$AB=2AM=16$.`,
        ],
        finalAnswer: String.raw`א. הוכח. ב. $AB=16$`,
        answers: [{ label: String.raw`$AB$`, value: 16 }],
      },
      {
        id: 'geo-circles-proof-6',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ חוצי הזוויות $B$ ו-$C$ נחתכים בנקודה $I$. מ-$I$ הורידו אנכים לצלעות: $ID\perp BC$, $IE\perp AC$, $IF\perp AB$ (ראו שרטוט). הוכיחו:

א. $ID=IE=IF$.

ב. $AI$ חוצה את הזווית $BAC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="93,26.2 26,213.8 294,213.8" />
  <line x1="26" y1="213.8" x2="122.1" y2="146.1" stroke-width="1.5" />
  <line x1="294" y1="213.8" x2="122.1" y2="146.1" stroke-width="1.5" />
  <line x1="122.1" y1="146.1" x2="122.1" y2="213.8" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="122.1" y1="146.1" x2="168.4" y2="96.5" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="122.1" y1="146.1" x2="58.3" y2="123.3" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="122.1,204.8 131.1,204.8 131.1,213.8" stroke-width="1" />
  <polyline points="162.2,103.1 168.8,109.3 174.9,102.7" stroke-width="1" />
  <polyline points="66.8,126.3 63.8,134.8 55.3,131.7" stroke-width="1" />
  <text x="89.6" y="19.1" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="14.7" y="225.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="306.6" y="222.7" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="118.8" y="139" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">I</text>
  <text x="122.1" y="232.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
  <text x="177.5" y="92.8" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">E</text>
  <text x="45.8" y="125.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">F</text>
</svg>`,
        hints: [
          String.raw`השוו את המשולשים $BFI$ ו-$BDI$: זווית ישרה, זוויות שוות ב-$B$, וצלע משותפת $BI$.`,
          String.raw`באותו אופן $IE=ID$ מהמשולשים $CEI$ ו-$CDI$.`,
          String.raw`לסעיף ב: השוו את $\triangle AFI$ ו-$\triangle AEI$ – ניצב ויתר (צ.צ.ז).`,
        ],
        solutionSteps: [
          String.raw`א. ב-$\triangle BFI$ וב-$\triangle BDI$: $\angle BFI=\angle BDI=90^\circ$, $\angle FBI=\angle DBI$ ($BI$ חוצה זווית), ו-$BI$ משותפת. לכן גם הזוויות השלישיות שוות, ו-$\triangle BFI\cong\triangle BDI$ (ז.צ.ז). מכאן $IF=ID$.`,
          String.raw`באותו אופן $\triangle CEI\cong\triangle CDI$ (ז.צ.ז), ולכן $IE=ID$. לכן $ID=IE=IF$ – כל נקודה על חוצה זווית נמצאת במרחקים שווים משוקי הזווית.`,
          String.raw`ב. ב-$\triangle AFI$ וב-$\triangle AEI$: $\angle AFI=\angle AEI=90^\circ$, $IF=IE$ (סעיף א), ו-$AI$ צלע משותפת (היתר).`,
          String.raw`$\triangle AFI\cong\triangle AEI$ לפי צ.צ.ז (הזווית הישרה מול הצלע הגדולה $AI$), ולכן $\angle FAI=\angle EAI$ – $AI$ חוצה את $\angle BAC$.`,
          String.raw`מסקנה: שלושת חוצי הזוויות במשולש נפגשים בנקודה אחת $I$, והמעגל שמרכזו $I$ ורדיוסו $ID$ משיק לשלוש הצלעות – זה המעגל החסום במשולש.`,
        ],
        finalAnswer: String.raw`$ID=IE=IF$ ו-$AI$ חוצה את $\angle A$; $I$ הוא מרכז המעגל החסום.`,
      },
      {
        id: 'geo-circles-proof-7',
        difficulty: 3,
        statement: String.raw`א. המרובע $ABCD$ חוסם מעגל (כל צלעותיו משיקות למעגל). הוכיחו: $AB+CD=AD+BC$.

ב. $ABCD$ הוא טרפז ישר זווית ($AB\parallel DC$, $\angle A=\angle D=90^\circ$) החוסם מעגל שרדיוסו $6$. נתון: $AB=9$ (ראו שרטוט). חשבו את הבסיס $DC$ ואת השוק $BC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26,30.7 160,30.7 294,209.3 26,209.3" />
  <circle cx="115.3" cy="120" r="89.3" stroke-width="1.5" />
  <polyline points="26,200.3 35,200.3 35,209.3" stroke-width="1" />
  <polyline points="35,30.7 35,39.7 26,39.7" stroke-width="1" />
  <text x="16.8" y="27" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="163.4" y="23.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="305.3" y="221.3" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">C</text>
  <text x="16.8" y="224" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">D</text>
</svg>`,
        hints: [
          String.raw`סמנו את נקודות ההשקה $K$, $L$, $M$, $N$ על $AB$, $BC$, $CD$, $DA$. מכל קודקוד יוצאים שני משיקים שווים.`,
          String.raw`לסעיף ב: השוק $AD$ מאונכת לשני הבסיסים, שמשיקים למעגל, ולכן $AD$ שווה לקוטר: $AD=12$.`,
          String.raw`סמנו $DC=x$. אז $BC=9+x-12$, והגובה מ-$B$ יוצר משולש ישר זווית שניצביו $12$ ו-$x-9$.`,
        ],
        solutionSteps: [
          String.raw`א. נסמן את נקודות ההשקה על $AB$, $BC$, $CD$, $DA$ ב-$K$, $L$, $M$, $N$. שני משיקים למעגל מנקודה חיצונית שווים: $AK=AN$, $BK=BL$, $CL=CM$, $DM=DN$.`,
          String.raw`$AB+CD=(AK+KB)+(CM+MD)=AN+BL+CL+DN=(AN+ND)+(BL+LC)=AD+BC$.`,
          String.raw`ב. הרדיוסים לנקודות ההשקה על $AB$ ועל $DC$ מאונכים לבסיסים המקבילים, ולכן הם על ישר אחד, והמרחק בין הבסיסים הוא קוטר. $AD$ מאונכת לבסיסים, ולכן $AD=2\cdot6=12$.`,
          String.raw`נסמן $DC=x$. לפי סעיף א: $BC=AB+DC-AD=9+x-12=x-3$.`,
          String.raw`נוריד את הגובה $BH$ ל-$DC$. $ABHD$ מלבן, ולכן $BH=AD=12$ ו-$HC=DC-AB=x-9$. לפי פיתגורס במשולש $BHC$: $(x-3)^2=12^2+(x-9)^2$.`,
          String.raw`$x^2-6x+9=144+x^2-18x+81$, ולכן $12x=216$ ו-$x=18$. מכאן $DC=18$ ו-$BC=15$ (בדיקה: $9+18=12+15$).`,
        ],
        finalAnswer: String.raw`א. הוכח. ב. $DC=18$, $BC=15$`,
        answers: [
          { label: String.raw`$DC$`, value: 18 },
          { label: String.raw`$BC$`, value: 15 },
        ],
      },
      {
        id: 'geo-circles-proof-8',
        difficulty: 3,
        statement: String.raw`שני מעגלים, שמרכזיהם $O_1$ ו-$O_2$, משיקים זה לזה מבחוץ בנקודה $T$. ישר משיק לשני המעגלים בנקודות $A$ ו-$B$ (ראו שרטוט). הוכיחו: $\angle ATB=90^\circ$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="125.4" y1="204.1" x2="244.1" y2="204.1" />
  <line x1="125.4" y1="204.1" x2="207.6" y2="149.3" />
  <line x1="244.1" y1="204.1" x2="207.6" y2="149.3" />
  <circle cx="125.4" cy="115.1" r="89.1" stroke-width="1.5" />
  <circle cx="244.1" cy="164.5" r="39.6" stroke-width="1.5" />
  <circle cx="125.4" cy="115.1" r="2.5" fill="currentColor" />
  <circle cx="244.1" cy="164.5" r="2.5" fill="currentColor" />
  <text x="116.2" y="111.4" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O<tspan font-size="11" dy="4">1</tspan></text>
  <text x="257.1" y="170" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">O<tspan font-size="11" dy="4">2</tspan></text>
  <text x="125.4" y="222.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">A</text>
  <text x="244.1" y="222.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">B</text>
  <text x="198.4" y="145.6" fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">T</text>
</svg>`,
        hints: [
          String.raw`העבירו בנקודה $T$ את המשיק המשותף לשני המעגלים, וסמנו ב-$M$ את נקודת החיתוך שלו עם $AB$.`,
          String.raw`מ-$M$ יוצאים שני משיקים לכל אחד מהמעגלים: $MA=MT$ ו-$MT=MB$.`,
          String.raw`במשולש $ATB$ התיכון $TM$ שווה למחצית הצלע $AB$.`,
        ],
        solutionSteps: [
          String.raw`נעביר בנקודה $T$ ישר המאונך ל-$O_1O_2$. ישר המאונך לרדיוס בקצהו משיק למעגל, ולכן הוא משיק לשני המעגלים ($O_1$, $T$, $O_2$ על ישר אחד). נסמן ב-$M$ את נקודת החיתוך שלו עם $AB$.`,
          String.raw`$MA=MT$ – שני משיקים למעגל $O_1$ מהנקודה $M$.`,
          String.raw`$MT=MB$ – שני משיקים למעגל $O_2$ מהנקודה $M$.`,
          String.raw`לכן $MA=MB=MT$: $M$ היא אמצע $AB$, ו-$TM$ הוא תיכון במשולש $ATB$ השווה למחצית הצלע $AB$.`,
          String.raw`משולש שבו תיכון שווה למחצית הצלע שאליה הוא יורד הוא ישר זווית, והזווית הישרה נמצאת מול אותה צלע: $\angle ATB=90^\circ$.`,
          String.raw`דרך נוספת: המשולשים $AMT$ ו-$BMT$ שווי שוקיים, ולכן $\angle ATB=\angle MAT+\angle MBT$. מסכום הזוויות במשולש $ATB$ מקבלים $2\angle ATB=180^\circ$.`,
        ],
        finalAnswer: String.raw`$MA=MT=MB$, ולכן $\angle ATB=90^\circ$.`,
      },
    ],
  },
};
