import type { Problem } from '../types';

/**
 * שאלון 35581 – שאלה 4 (גאומטריה במישור).
 * כל שאלה בנויה על מודל קואורדינטות קונקרטי שמקיים את כל הנתונים (משמש גם לשרטוט וגם לבדיקות).
 * 35581-4-1: D(0,0), C(10,0), A(10-√80, 8), B(16-√80, 8).
 * 35581-4-2: D(0,0), A(0,6), B(-8,0), C(2.5,0); מרכז המעגל (-2.75, 4/3), E(-5.5, -10/3).
 * 35581-4-3: A(0,0), B(12,0), C(√39, 5); D(12-0.6(12-√39), 3), E(0.6√39, 3).
 */
export const slot4Problems: Problem[] = [
  {
    id: '35581-4-1',
    questionnaire: '35581',
    slot: 4,
    title: 'אלכסוני טרפז ומשולשים דומים',
    topicId: 'euclidean-geometry',
    subtopicIds: ['geo-triangles-quadrilaterals', 'geo-bisector-similarity', 'geo-similar-altitudes-areas', 'geo-polygons-congruence'],
    difficulty: 2,
    estimatedMinutes: 20,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="63.2,24 195.2,24 260,200 40,200" />
  <line x1="63.2" y1="24" x2="260" y2="200" stroke-width="1.5" />
  <line x1="195.2" y1="24" x2="40" y2="200" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="50" y="20">A</text>
    <text x="200" y="20">B</text>
    <text x="264" y="216">C</text>
    <text x="24" y="216">D</text>
    <text x="131" y="114">O</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-4-1-a',
        label: 'א',
        statement: String.raw`ABCD הוא טרפז ($AB\parallel DC$). האלכסונים AC ו-BD נחתכים בנקודה O (ראו שרטוט). נתון: $AB=6$, $DC=10$.

הוכיחו: $\triangle AOB\sim\triangle COD$.`,
        hints: [
          String.raw`חפשו זוויות שוות בעזרת הישרים המקבילים AB ו-DC והחותכים AC ו-BD.`,
          String.raw`זוויות מתחלפות בין מקבילים שוות: $\angle OAB=\angle OCD$.`,
          String.raw`מספיק למצוא שתי זוויות שוות כדי להשתמש במשפט הדמיון ז.ז.`,
        ],
        solutionSteps: [
          String.raw`$AB\parallel DC$ ו-AC חותך אותם, ולכן $\angle BAO=\angle DCO$ (זוויות מתחלפות בין ישרים מקבילים).`,
          String.raw`באופן דומה, BD חותך את המקבילים, ולכן $\angle ABO=\angle CDO$ (זוויות מתחלפות).`,
          String.raw`(בנוסף, $\angle AOB=\angle COD$ כזוויות קודקודיות.)`,
          String.raw`לפי משפט הדמיון ז.ז: $\triangle AOB\sim\triangle COD$, כאשר A מתאים ל-C, B מתאים ל-D ו-O מתאים ל-O.`,
          String.raw`יחס הדמיון הוא $\frac{AB}{CD}=\frac{6}{10}=\frac{3}{5}$.`,
        ],
        finalAnswer: String.raw`$\triangle AOB\sim\triangle COD$ (ז.ז), ביחס דמיון $\frac{3}{5}$.`,
      },
      {
        id: '35581-4-1-b',
        label: 'ב',
        statement: String.raw`נתון גם: $AC=12$. חשבו את אורך הקטע AO.`,
        hints: [
          String.raw`מהדמיון בסעיף א: $\frac{AO}{CO}=\frac{AB}{CD}=\frac{3}{5}$.`,
          String.raw`סמנו $AO=3k$, $CO=5k$ והשתמשו ב-$AO+OC=AC=12$.`,
        ],
        solutionSteps: [
          String.raw`מהדמיון $\triangle AOB\sim\triangle COD$ הצלעות המתאימות פרופורציוניות: $\frac{AO}{CO}=\frac{AB}{CD}=\frac{3}{5}$.`,
          String.raw`נסמן $AO=3k$ ו-$CO=5k$. הנקודה O נמצאת על האלכסון AC, ולכן $3k+5k=12$, כלומר $k=1.5$.`,
          String.raw`$AO=3\cdot 1.5=4.5$ (ובהתאם $CO=7.5$).`,
        ],
        finalAnswer: String.raw`$AO=4.5$`,
        numericAnswer: 4.5,
      },
      {
        id: '35581-4-1-c',
        label: 'ג',
        statement: String.raw`גובה הטרפז הוא 8. חשבו את המרחק של הנקודה O מהבסיס AB.`,
        hints: [
          String.raw`המרחק של O מ-AB הוא הגובה לצלע AB במשולש AOB, והמרחק של O מ-DC הוא הגובה לצלע CD במשולש COD.`,
          String.raw`במשולשים דומים, היחס בין גבהים מתאימים שווה ליחס הדמיון.`,
          String.raw`שני הגבהים נמצאים על אותו ישר (ניצב לבסיסים) וסכומם הוא גובה הטרפז.`,
        ],
        solutionSteps: [
          String.raw`נסמן ב-$h_1$ את המרחק של O מ-AB וב-$h_2$ את המרחק של O מ-DC. אלו הגבהים המתאימים לצלעות המתאימות AB ו-CD במשולשים הדומים AOB ו-COD.`,
          String.raw`היחס בין גבהים מתאימים במשולשים דומים שווה ליחס הדמיון: $\frac{h_1}{h_2}=\frac{3}{5}$.`,
          String.raw`הבסיסים מקבילים, ולכן הניצב מ-O ל-AB ממשיך כניצב ל-DC, ו-$h_1+h_2=8$.`,
          String.raw`מכאן $h_1=\frac{3}{8}\cdot 8=3$ ו-$h_2=5$.`,
        ],
        finalAnswer: String.raw`המרחק של O מ-AB הוא 3.`,
        numericAnswer: 3,
      },
      {
        id: '35581-4-1-d',
        label: 'ד',
        statement: String.raw`חשבו את שטח המשולש AOD.`,
        hints: [
          String.raw`חשבו תחילה את שטח המשולש AOB בעזרת הבסיס AB והגובה שמצאתם בסעיף ג.`,
          String.raw`שטח המשולש ABD מחושב לפי הבסיס AB וגובה הטרפז.`,
          String.raw`$S_{AOD}=S_{ABD}-S_{AOB}$.`,
        ],
        solutionSteps: [
          String.raw`$S_{AOB}=\frac{AB\cdot h_1}{2}=\frac{6\cdot 3}{2}=9$.`,
          String.raw`במשולש ABD הגובה לצלע AB הוא גובה הטרפז, ולכן $S_{ABD}=\frac{6\cdot 8}{2}=24$.`,
          String.raw`O נמצאת על BD, ולכן המשולש ABD מתחלק למשולשים AOB ו-AOD: $S_{AOD}=24-9=15$.`,
          String.raw`בדיקה: יחס השטחים בין משולשים דומים שווה לריבוע יחס הדמיון, ולכן $S_{COD}=9\cdot\left(\frac{5}{3}\right)^2=25$, וגם $S_{AOD}=S_{ACD}-S_{COD}=\frac{10\cdot 8}{2}-25=15$.`,
        ],
        finalAnswer: String.raw`$S_{AOD}=15$`,
        numericAnswer: 15,
      },
    ],
  },
  {
    id: '35581-4-2',
    questionnaire: '35581',
    slot: 4,
    title: 'גובה, קוטר ומשולשים דומים במעגל',
    topicId: 'euclidean-geometry',
    subtopicIds: ['geo-circle-angles', 'geo-bisector-similarity', 'geo-similar-altitudes-areas', 'geo-cyclic-quadrilaterals'],
    difficulty: 3,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160" cy="120" r="108.3" stroke-width="1.5" />
  <polygon points="215,26.7 55,146.7 265,146.7" />
  <line x1="215" y1="26.7" x2="215" y2="146.7" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="215" y1="26.7" x2="105" y2="213.3" stroke-width="1.5" />
  <line x1="265" y1="146.7" x2="105" y2="213.3" stroke-width="1.5" />
  <polyline points="215,136.7 205,136.7 205,146.7" stroke-width="1" />
  <circle cx="160" cy="120" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="219" y="20">A</text>
    <text x="36" y="152">B</text>
    <text x="270" y="152">C</text>
    <text x="218" y="164">D</text>
    <text x="92" y="230">E</text>
    <text x="148" y="116">O</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-4-2-a',
        label: 'א',
        statement: String.raw`המשולש החד-זווית ABC חסום במעגל שמרכזו O. AD הוא הגובה לצלע BC, ו-AE הוא קוטר במעגל (ראו שרטוט).

הוכיחו: $\triangle ABD\sim\triangle AEC$.`,
        hints: [
          String.raw`איזו זווית היקפית נשענת על הקוטר AE?`,
          String.raw`הזוויות $\angle ABC$ ו-$\angle AEC$ הן זוויות היקפיות הנשענות על אותה קשת AC.`,
          String.raw`השלימו בעזרת משפט הדמיון ז.ז.`,
        ],
        solutionSteps: [
          String.raw`AD גובה לצלע BC, ולכן $\angle ADB=90^\circ$.`,
          String.raw`AE קוטר, ולכן הזווית ההיקפית הנשענת עליו ישרה: $\angle ACE=90^\circ$.`,
          String.raw`$\angle ABD=\angle ABC$ ו-$\angle AEC$ הן זוויות היקפיות הנשענות על אותה קשת AC (הנקודות B ו-E באותו צד של המיתר AC), ולכן $\angle ABD=\angle AEC$.`,
          String.raw`לפי משפט הדמיון ז.ז: $\triangle ABD\sim\triangle AEC$, כאשר A מתאים ל-A, B מתאים ל-E ו-D מתאים ל-C.`,
          String.raw`מהדמיון נובע גם $\frac{AB}{AE}=\frac{AD}{AC}=\frac{BD}{EC}$.`,
        ],
        finalAnswer: String.raw`$\triangle ABD\sim\triangle AEC$ (ז.ז: זווית ישרה וזוויות היקפיות שוות).`,
      },
      {
        id: '35581-4-2-b',
        label: 'ב',
        statement: String.raw`נתון: $AB=10$, $AC=6.5$, $AD=6$. חשבו את רדיוס המעגל.`,
        hints: [
          String.raw`מהדמיון בסעיף א: $\frac{AB}{AE}=\frac{AD}{AC}$.`,
          String.raw`חלצו את AE, ואז הרדיוס הוא $\frac{AE}{2}$.`,
        ],
        solutionSteps: [
          String.raw`מהדמיון $\triangle ABD\sim\triangle AEC$: $\frac{AB}{AE}=\frac{AD}{AC}$.`,
          String.raw`הצבה: $\frac{10}{AE}=\frac{6}{6.5}$, ולכן $AE=\frac{10\cdot 6.5}{6}=\frac{65}{6}$.`,
          String.raw`AE קוטר, ולכן הרדיוס הוא $R=\frac{AE}{2}=\frac{65}{12}\approx 5.417$.`,
        ],
        finalAnswer: String.raw`$R=\frac{65}{12}\approx 5.417$`,
        numericAnswer: 5.416666666667,
      },
      {
        id: '35581-4-2-c',
        label: 'ג',
        statement: String.raw`חשבו את היחס בין שטח המשולש ABD לשטח המשולש AEC.`,
        hints: [
          String.raw`מצאו את יחס הדמיון בין המשולשים לפי זוג צלעות מתאימות, למשל AB ו-AE.`,
          String.raw`היחס בין שטחי משולשים דומים שווה לריבוע יחס הדמיון.`,
        ],
        solutionSteps: [
          String.raw`יחס הדמיון בין $\triangle ABD$ ל-$\triangle AEC$ הוא $k=\frac{AB}{AE}=\frac{10}{\frac{65}{6}}=\frac{60}{65}=\frac{12}{13}$.`,
          String.raw`בדיקה בזוג צלעות נוסף: $\frac{AD}{AC}=\frac{6}{6.5}=\frac{12}{13}$, כמצופה.`,
          String.raw`היחס בין שטחי משולשים דומים שווה לריבוע יחס הדמיון: $\frac{S_{ABD}}{S_{AEC}}=\left(\frac{12}{13}\right)^2=\frac{144}{169}$.`,
        ],
        finalAnswer: String.raw`$\frac{S_{ABD}}{S_{AEC}}=\frac{144}{169}\approx 0.852$`,
        numericAnswer: 0.8520710059172,
      },
      {
        id: '35581-4-2-d',
        label: 'ד',
        statement: String.raw`חשבו את אורך הגובה לצלע AE במשולש AEC.`,
        hints: [
          String.raw`הצלע AE במשולש AEC מתאימה לצלע AB במשולש ABD. חשבו תחילה את הגובה לצלע AB במשולש ABD.`,
          String.raw`במשולש ישר הזווית ABD: $BD=\sqrt{AB^2-AD^2}$, והגובה ליתר הוא $\frac{AD\cdot BD}{AB}$ (מחישוב השטח בשתי דרכים).`,
          String.raw`היחס בין גבהים מתאימים במשולשים דומים שווה ליחס הדמיון.`,
        ],
        solutionSteps: [
          String.raw`במשולש ישר הזווית ABD (לפי פיתגורס): $BD=\sqrt{10^2-6^2}=8$.`,
          String.raw`שטח המשולש ABD הוא $\frac{AD\cdot BD}{2}=\frac{6\cdot 8}{2}=24$. נסמן ב-$h$ את הגובה מ-D לצלע AB: $\frac{10\cdot h}{2}=24$, ולכן $h=4.8$.`,
          String.raw`הגובה מ-D לצלע AB במשולש ABD מתאים לגובה מ-C לצלע AE במשולש AEC (D מתאים ל-C, AB מתאימה ל-AE).`,
          String.raw`יחס הגבהים שווה ליחס הדמיון: $\frac{h}{h'}=\frac{12}{13}$, ולכן $h'=4.8\cdot\frac{13}{12}=5.2$.`,
        ],
        finalAnswer: String.raw`הגובה לצלע AE במשולש AEC הוא 5.2.`,
        numericAnswer: 5.2,
      },
    ],
  },
  {
    id: '35581-4-3',
    questionnaire: '35581',
    slot: 4,
    title: 'חוצה זווית וקטע מקביל לצלע',
    topicId: 'euclidean-geometry',
    subtopicIds: ['geo-bisector-similarity', 'geo-thales-midline', 'geo-similar-altitudes-areas', 'geo-triangles-quadrilaterals'],
    difficulty: 3,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30,190 294,190 167.4,80" />
  <line x1="30" y1="190" x2="218" y2="124" stroke-width="1.5" />
  <line x1="112.4" y1="124" x2="218" y2="124" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="14" y="206">A</text>
    <text x="298" y="206">B</text>
    <text x="162" y="72">C</text>
    <text x="224" y="124">D</text>
    <text x="94" y="122">E</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-4-3-a',
        label: 'א',
        statement: String.raw`במשולש ABC נתון: $AB=12$, $AC=8$. AD חוצה את הזווית $\angle BAC$ (הנקודה D על BC). דרך D העבירו ישר המקביל ל-AB, והוא חותך את AC בנקודה E (ראו שרטוט).

הוכיחו: $AE=DE$.`,
        hints: [
          String.raw`AD חוצה זווית: $\angle BAD=\angle DAE$.`,
          String.raw`$DE\parallel AB$ ו-AD חותך אותם – אילו זוויות מתחלפות שוות?`,
          String.raw`משולש שבו שתי זוויות שוות הוא שווה-שוקיים.`,
        ],
        solutionSteps: [
          String.raw`AD חוצה את $\angle BAC$, ולכן $\angle BAD=\angle DAE$.`,
          String.raw`$DE\parallel AB$ ו-AD חותך אותם, ולכן $\angle ADE=\angle BAD$ (זוויות מתחלפות בין ישרים מקבילים).`,
          String.raw`מכאן $\angle DAE=\angle ADE$, כלומר במשולש ADE שתי זוויות שוות.`,
          String.raw`מול זוויות שוות מונחות צלעות שוות, ולכן המשולש ADE שווה-שוקיים ו-$AE=DE$.`,
        ],
        finalAnswer: String.raw`$\angle DAE=\angle ADE$, ולכן $AE=DE$.`,
      },
      {
        id: '35581-4-3-b',
        label: 'ב',
        statement: String.raw`הוכיחו כי $\triangle CDE\sim\triangle CBA$, וחשבו את אורך הקטע DE.`,
        hints: [
          String.raw`הדמיון נובע ממקבילות: $\angle CED=\angle CAB$ (זוויות מתאימות), והזווית C משותפת.`,
          String.raw`לפי משפט חוצה הזווית הפנימית: $\frac{BD}{DC}=\frac{AB}{AC}$, ולכן $\frac{CD}{CB}=\frac{AC}{AB+AC}$.`,
          String.raw`דרך אחרת: סמנו $AE=DE=x$; אז $CE=8-x$ ו-$\frac{DE}{AB}=\frac{CE}{CA}$.`,
        ],
        solutionSteps: [
          String.raw`$DE\parallel AB$, ולכן $\angle CED=\angle CAB$ ו-$\angle CDE=\angle CBA$ (זוויות מתאימות). לפי ז.ז: $\triangle CDE\sim\triangle CBA$.`,
          String.raw`לפי משפט חוצה הזווית במשולש ABC: $\frac{BD}{DC}=\frac{AB}{AC}=\frac{12}{8}=\frac{3}{2}$.`,
          String.raw`לכן $\frac{CD}{CB}=\frac{2}{2+3}=\frac{2}{5}$ – זהו יחס הדמיון בין $\triangle CDE$ ל-$\triangle CBA$.`,
          String.raw`$\frac{DE}{BA}=\frac{2}{5}$, ולכן $DE=\frac{2}{5}\cdot 12=4.8$.`,
          String.raw`בדיקה בעזרת סעיף א: $AE=DE=4.8$, ולכן $CE=8-4.8=3.2$, ואכן $\frac{CE}{CA}=\frac{3.2}{8}=\frac{2}{5}$.`,
        ],
        finalAnswer: String.raw`$DE=4.8$`,
        numericAnswer: 4.8,
      },
      {
        id: '35581-4-3-c',
        label: 'ג',
        statement: String.raw`חשבו את היחס בין שטח הטרפז ABDE לשטח המשולש ABC.`,
        hints: [
          String.raw`היחס בין שטחי המשולשים הדומים CDE ו-CBA שווה לריבוע יחס הדמיון.`,
          String.raw`שטח הטרפז הוא ההפרש בין שטח המשולש ABC לשטח המשולש CDE.`,
        ],
        solutionSteps: [
          String.raw`יחס הדמיון בין $\triangle CDE$ ל-$\triangle CBA$ הוא $\frac{2}{5}$ (סעיף ב).`,
          String.raw`יחס השטחים שווה לריבוע יחס הדמיון: $\frac{S_{CDE}}{S_{ABC}}=\left(\frac{2}{5}\right)^2=\frac{4}{25}$.`,
          String.raw`$S_{ABDE}=S_{ABC}-S_{CDE}=S_{ABC}\left(1-\frac{4}{25}\right)=\frac{21}{25}S_{ABC}$.`,
        ],
        finalAnswer: String.raw`$\frac{S_{ABDE}}{S_{ABC}}=\frac{21}{25}=0.84$`,
        numericAnswer: 0.84,
      },
      {
        id: '35581-4-3-d',
        label: 'ד',
        statement: String.raw`נתון גם שהמרחק בין הישרים המקבילים AB ו-DE הוא 3. חשבו את שטח הטרפז ABDE.`,
        hints: [
          String.raw`סמנו ב-$h$ את הגובה מ-C לצלע AB. הגובה מ-C לצלע DE במשולש CDE הוא גובה מתאים.`,
          String.raw`היחס בין גבהים מתאימים במשולשים דומים שווה ליחס הדמיון $\frac{2}{5}$, ולכן המרחק בין המקבילים הוא $h-\frac{2}{5}h$.`,
          String.raw`לאחר שמצאתם את $h$, חשבו את $S_{ABC}$ והשתמשו בסעיף ג.`,
        ],
        solutionSteps: [
          String.raw`נסמן ב-$h$ את הגובה מ-C ל-AB במשולש ABC. הגובה מ-C ל-DE במשולש CDE מתאים לו (DE מתאימה ל-AB), ויחס הגבהים שווה ליחס הדמיון: הגובה מ-C ל-DE הוא $\frac{2}{5}h$.`,
          String.raw`שני הגבהים מונחים על אותו אנך (כי $DE\parallel AB$), והמרחק בין המקבילים הוא ההפרש: $h-\frac{2}{5}h=\frac{3}{5}h=3$, ולכן $h=5$.`,
          String.raw`$S_{ABC}=\frac{AB\cdot h}{2}=\frac{12\cdot 5}{2}=30$.`,
          String.raw`לפי סעיף ג: $S_{ABDE}=\frac{21}{25}\cdot 30=25.2$.`,
          String.raw`בדיקה ישירה בנוסחת שטח טרפז: $\frac{(AB+DE)\cdot 3}{2}=\frac{(12+4.8)\cdot 3}{2}=25.2$.`,
        ],
        finalAnswer: String.raw`$S_{ABDE}=25.2$`,
        numericAnswer: 25.2,
      },
    ],
  },
];
