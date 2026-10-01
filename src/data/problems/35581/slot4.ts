import type { Problem } from '../types';

/**
 * שאלון 35581 – שאלה 4 (גאומטריה במישור).
 * כל שאלה בנויה על מודל קואורדינטות קונקרטי שמקיים את כל הנתונים (משמש גם לשרטוט וגם לבדיקות).
 * 35581-4-1: D(0,0), C(10,0), A(10-√80, 8), B(16-√80, 8).
 * 35581-4-2: D(0,0), A(0,6), B(-8,0), C(2.5,0); מרכז המעגל (-2.75, 4/3), E(-5.5, -10/3).
 * 35581-4-3: A(0,0), B(12,0), C(√39, 5); D(12-0.6(12-√39), 3), E(0.6√39, 3).
 * 35581-4-4: A(-3,0), B(0,4), C(8,0), D(0,-6), E(0,0); מרכז המעגל (2.5,-1).
 * 35581-4-5: O(0,0), r=15, P(25,0), A(9,12), B(9,-12), M(9,0), C(-9,-12).
 * 35581-4-6: D(0,0), B(4,0), C(9,0), A=6(cos65°, sin65°) (המעגל דרך A, B, C משיק ל-DA ב-A), E(6,0).
 * 35581-4-7: A(0,0), B(12,0), C(4,8); D(8,4), E(2,4), G(16/3, 8/3), H(8/3, 4/3), K(26/3, 4/3).
 * 35581-4-8: O1(0,9), R=9, O2(12,4), r=4; A(0,0), B(12,0), M(6,0), T=O1+(9/13)(O2-O1).
 * 35581-4-9: A(0,0), B(12,0), C(16,6), D(4,6); E(8,6), F(6,4.5), G(24,18).
 * 35581-4-10: C(0,0), A(0,6), B(8,0); I(2,2), r=2; D(2,0), E(0,2), F(3.2,3.6), M(4,3).
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
  {
    id: '35581-4-4',
    questionnaire: '35581',
    slot: 4,
    title: 'מרובע חסום ואלכסונים נחתכים',
    topicId: 'euclidean-geometry',
    subtopicIds: ['geo-cyclic-quadrilaterals', 'geo-circle-angles', 'geo-bisector-similarity', 'geo-similar-altitudes-areas'],
    difficulty: 2,
    estimatedMinutes: 20,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="145" cy="120" r="111.8" stroke-width="1.5" />
  <polygon points="35,100 95,20 255,100 95,220" />
  <line x1="35" y1="100" x2="255" y2="100" stroke-width="1.5" />
  <line x1="95" y1="20" x2="95" y2="220" stroke-width="1.5" />
  <circle cx="95" cy="100" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="18" y="106">A</text>
    <text x="84" y="16">B</text>
    <text x="260" y="106">C</text>
    <text x="84" y="236">D</text>
    <text x="101" y="95">E</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-4-4-a',
        label: 'א',
        statement: String.raw`המרובע ABCD חסום במעגל. האלכסונים AC ו-BD נחתכים בנקודה E (ראו שרטוט).

הוכיחו: $\triangle ABE\sim\triangle DCE$.`,
        hints: [
          String.raw`חפשו זוויות היקפיות הנשענות על אותה קשת.`,
          String.raw`הזוויות $\angle BAC$ ו-$\angle BDC$ נשענות שתיהן על הקשת BC.`,
          String.raw`הוסיפו זוויות קודקודיות (או זוג נוסף של זוויות היקפיות) והשתמשו במשפט הדמיון ז.ז.`,
        ],
        solutionSteps: [
          String.raw`$\angle BAE=\angle BAC$ ו-$\angle CDE=\angle BDC$ הן זוויות היקפיות הנשענות על אותה קשת BC (הקודקודים A ו-D נמצאים באותו צד של המיתר BC), ולכן $\angle BAE=\angle CDE$.`,
          String.raw`$\angle AEB=\angle DEC$ – זוויות קודקודיות.`,
          String.raw`(אפשר גם: $\angle ABE=\angle ABD$ ו-$\angle DCE=\angle ACD$ הן זוויות היקפיות הנשענות על אותה קשת AD, ולכן שוות.)`,
          String.raw`לפי משפט הדמיון ז.ז: $\triangle ABE\sim\triangle DCE$, כאשר A מתאים ל-D, B מתאים ל-C ו-E מתאים ל-E.`,
          String.raw`מהדמיון: $\frac{AB}{DC}=\frac{AE}{DE}=\frac{BE}{CE}$.`,
        ],
        finalAnswer: String.raw`$\triangle ABE\sim\triangle DCE$ (ז.ז: זוויות היקפיות על אותה קשת וזוויות קודקודיות).`,
      },
      {
        id: '35581-4-4-b',
        label: 'ב',
        statement: String.raw`נתון: $AB=5$, $DC=10$, $AE=3$, $BE=4$. חשבו את אורך האלכסון BD.`,
        hints: [
          String.raw`יחס הדמיון בין המשולשים הוא $\frac{AB}{DC}$.`,
          String.raw`מהדמיון: $\frac{AE}{DE}=\frac{AB}{DC}$ – חלצו את DE.`,
          String.raw`$BD=BE+ED$, כי E נמצאת על האלכסון BD.`,
        ],
        solutionSteps: [
          String.raw`יחס הדמיון בין $\triangle ABE$ ל-$\triangle DCE$ הוא $k=\frac{AB}{DC}=\frac{5}{10}=\frac{1}{2}$.`,
          String.raw`מהדמיון $\frac{AE}{DE}=\frac{1}{2}$, ולכן $DE=2\cdot AE=6$.`,
          String.raw`באופן דומה $\frac{BE}{CE}=\frac{1}{2}$, ולכן $CE=2\cdot BE=8$ (נשתמש בכך בהמשך).`,
          String.raw`E נמצאת על האלכסון BD, ולכן $BD=BE+ED=4+6=10$.`,
        ],
        finalAnswer: String.raw`$BD=10$ (וגם $DE=6$, $CE=8$).`,
        numericAnswer: 10,
      },
      {
        id: '35581-4-4-c',
        label: 'ג',
        statement: String.raw`הוכיחו כי האלכסונים AC ו-BD מאונכים זה לזה, וחשבו את שטח המשולש ABE.`,
        hints: [
          String.raw`בדקו את שלוש הצלעות של המשולש ABE: $AE=3$, $BE=4$, $AB=5$.`,
          String.raw`המשפט ההפוך למשפט פיתגורס: אם $a^2+b^2=c^2$, הזווית שמול הצלע c ישרה.`,
        ],
        solutionSteps: [
          String.raw`במשולש ABE: $AE^2+BE^2=3^2+4^2=9+16=25=5^2=AB^2$.`,
          String.raw`לפי המשפט ההפוך למשפט פיתגורס, הזווית שמול הצלע AB ישרה: $\angle AEB=90^\circ$, כלומר $AC\perp BD$.`,
          String.raw`שטח משולש ישר-זווית הוא מחצית מכפלת הניצבים: $S_{ABE}=\frac{AE\cdot BE}{2}=\frac{3\cdot 4}{2}=6$.`,
        ],
        finalAnswer: String.raw`$\angle AEB=90^\circ$ ו-$S_{ABE}=6$.`,
        numericAnswer: 6,
      },
      {
        id: '35581-4-4-d',
        label: 'ד',
        statement: String.raw`חשבו את שטח המרובע ABCD.`,
        hints: [
          String.raw`האלכסונים מחלקים את המרובע לארבעה משולשים ישרי-זווית בעלי קודקוד משותף E.`,
          String.raw`יחס השטחים של המשולשים הדומים ABE ו-DCE שווה לריבוע יחס הדמיון; שטחי שני המשולשים האחרים מתקבלים ישירות מהניצבים.`,
          String.raw`דרך נוספת: שטח מרובע שאלכסוניו מאונכים הוא $\frac{d_1\cdot d_2}{2}$.`,
        ],
        solutionSteps: [
          String.raw`יחס השטחים במשולשים דומים שווה לריבוע יחס הדמיון: $\frac{S_{DCE}}{S_{ABE}}=\left(\frac{DC}{AB}\right)^2=4$, ולכן $S_{DCE}=4\cdot 6=24$.`,
          String.raw`$\angle AED=\angle BEC=90^\circ$ (זוויות צמודות לזווית ישרה), ולכן $S_{ADE}=\frac{AE\cdot DE}{2}=\frac{3\cdot 6}{2}=9$ ו-$S_{BCE}=\frac{BE\cdot CE}{2}=\frac{4\cdot 8}{2}=16$.`,
          String.raw`$S_{ABCD}=S_{ABE}+S_{DCE}+S_{ADE}+S_{BCE}=6+24+9+16=55$.`,
          String.raw`בדיקה: $AC=AE+EC=3+8=11$, $BD=10$ והאלכסונים מאונכים, ולכן $S_{ABCD}=\frac{AC\cdot BD}{2}=\frac{11\cdot 10}{2}=55$.`,
        ],
        finalAnswer: String.raw`$S_{ABCD}=55$`,
        numericAnswer: 55,
      },
    ],
  },
  {
    id: '35581-4-5',
    questionnaire: '35581',
    slot: 4,
    title: 'שני משיקים מנקודה חיצונית ודלתון',
    topicId: 'euclidean-geometry',
    subtopicIds: ['geo-circle-tangents', 'geo-polygons-congruence', 'geo-triangles-quadrilaterals', 'geo-circle-angles'],
    difficulty: 2,
    estimatedMinutes: 20,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="115" cy="115" r="105" stroke-width="1.5" />
  <line x1="290" y1="115" x2="178" y2="31" />
  <line x1="290" y1="115" x2="178" y2="199" />
  <line x1="115" y1="115" x2="178" y2="31" stroke-width="1.5" />
  <line x1="115" y1="115" x2="178" y2="199" stroke-width="1.5" />
  <line x1="115" y1="115" x2="290" y2="115" stroke-width="1.5" />
  <line x1="178" y1="31" x2="178" y2="199" stroke-width="1.5" />
  <line x1="178" y1="31" x2="52" y2="199" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="178" y1="199" x2="52" y2="199" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="173.2,37.4 179.6,42.2 184.4,35.8" stroke-width="1" />
  <circle cx="115" cy="115" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="99" y="110">O</text>
    <text x="294" y="121">P</text>
    <text x="182" y="26">A</text>
    <text x="182" y="216">B</text>
    <text x="162" y="110">M</text>
    <text x="36" y="216">C</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-4-5-a',
        label: 'א',
        statement: String.raw`מהנקודה P שמחוץ למעגל שמרכזו O יוצאים שני משיקים למעגל: PA ו-PB (A ו-B נקודות ההשקה). המיתר AB חותך את הקטע PO בנקודה M (ראו שרטוט).

הוכיחו: $PO\perp AB$ וכן $AM=MB$.`,
        hints: [
          String.raw`מה ידוע על שני משיקים היוצאים מאותה נקודה חיצונית?`,
          String.raw`הוכיחו $\triangle PAO\cong\triangle PBO$ והסיקו ש-PO חוצה את $\angle APB$.`,
          String.raw`במשולש שווה-השוקיים PAB, חוצה זווית הראש הוא גם הגובה והתיכון לבסיס.`,
        ],
        solutionSteps: [
          String.raw`$PA=PB$ – שני משיקים למעגל היוצאים מאותה נקודה שווים זה לזה.`,
          String.raw`$OA=OB$ – רדיוסים; PO צלע משותפת. לכן $\triangle PAO\cong\triangle PBO$ (צ.צ.צ).`,
          String.raw`זוויות מתאימות במשולשים חופפים שוות: $\angle APO=\angle BPO$, כלומר PM חוצה את זווית הראש $\angle APB$ במשולש שווה-השוקיים PAB ($PA=PB$).`,
          String.raw`במשולש שווה-שוקיים חוצה זווית הראש מתלכד עם הגובה ועם התיכון לבסיס, ולכן $PM\perp AB$ (כלומר $PO\perp AB$) ו-$AM=MB$.`,
        ],
        finalAnswer: String.raw`$PO\perp AB$ ו-$AM=MB$ (חפיפה צ.צ.צ ותכונות משולש שווה-שוקיים).`,
      },
      {
        id: '35581-4-5-b',
        label: 'ב',
        statement: String.raw`נתון: $PA=20$, $AB=24$. חשבו את רדיוס המעגל.`,
        hints: [
          String.raw`מצאו תחילה את PM במשולש ישר-הזווית PAM.`,
          String.raw`סמנו $OM=x$ ורשמו את משפט פיתגורס פעמיים: במשולש OAM ובמשולש OAP (המשיק מאונך לרדיוס).`,
          String.raw`השוו את שני הביטויים ל-$OA^2$ וחלצו את x.`,
        ],
        solutionSteps: [
          String.raw`לפי סעיף א, $AM=\frac{AB}{2}=12$ ו-$\angle AMP=90^\circ$. במשולש PAM לפי פיתגורס: $PM=\sqrt{20^2-12^2}=\sqrt{256}=16$.`,
          String.raw`נסמן $OM=x$ ו-$OA=r$. במשולש ישר-הזווית OAM: $r^2=12^2+x^2=144+x^2$.`,
          String.raw`המשיק מאונך לרדיוס בנקודת ההשקה: $\angle OAP=90^\circ$. במשולש OAP: $PO^2=PA^2+OA^2$, כלומר $(16+x)^2=400+r^2$.`,
          String.raw`נציב $r^2=144+x^2$: $256+32x+x^2=544+x^2$, ומכאן $32x=288$, $x=9$.`,
          String.raw`$r^2=144+81=225$, ולכן $r=15$ (וגם $PO=16+9=25$).`,
        ],
        finalAnswer: String.raw`$r=15$`,
        numericAnswer: 15,
      },
      {
        id: '35581-4-5-c',
        label: 'ג',
        statement: String.raw`חשבו את שטח הדלתון PAOB.`,
        hints: [
          String.raw`הראו שהמרובע PAOB הוא דלתון: $PA=PB$ ו-$OA=OB$.`,
          String.raw`שטח דלתון שווה למחצית מכפלת האלכסונים, או לפעמיים שטח המשולש PAO.`,
        ],
        solutionSteps: [
          String.raw`$PA=PB$ ו-$OA=OB$, ולכן PAOB הוא דלתון שאלכסוניו PO ו-AB, ולפי סעיף א הם מאונכים זה לזה.`,
          String.raw`$PO=PM+MO=16+9=25$ (סעיף ב), $AB=24$.`,
          String.raw`$S_{PAOB}=\frac{PO\cdot AB}{2}=\frac{25\cdot 24}{2}=300$.`,
          String.raw`בדיקה: $S_{PAOB}=2\cdot S_{PAO}=2\cdot\frac{PA\cdot OA}{2}=20\cdot 15=300$ (המשולש PAO ישר-זווית ב-A).`,
        ],
        finalAnswer: String.raw`$S_{PAOB}=300$`,
        numericAnswer: 300,
      },
      {
        id: '35581-4-5-d',
        label: 'ד',
        statement: String.raw`המשך הרדיוס AO חותך את המעגל בנקודה C (כלומר AC קוטר). הוכיחו כי $BC\parallel PO$, וחשבו את אורך הקטע BC.`,
        hints: [
          String.raw`איזו זווית היקפית נשענת על הקוטר AC?`,
          String.raw`שני ישרים המאונכים לאותו ישר מקבילים זה לזה.`,
          String.raw`לחישוב BC: פיתגורס במשולש ABC, או קטע אמצעים במשולש ABC (O אמצע AC, M אמצע AB).`,
        ],
        solutionSteps: [
          String.raw`AC קוטר, ולכן הזווית ההיקפית הנשענת עליו ישרה: $\angle ABC=90^\circ$, כלומר $BC\perp AB$.`,
          String.raw`לפי סעיף א, $PO\perp AB$. שני ישרים המאונכים לאותו ישר (AB) מקבילים זה לזה, ולכן $BC\parallel PO$.`,
          String.raw`במשולש ישר-הזווית ABC: $AC=2r=30$, $AB=24$, ולפי פיתגורס $BC=\sqrt{30^2-24^2}=\sqrt{324}=18$.`,
          String.raw`בדיקה: O אמצע AC ו-M אמצע AB (סעיף א), ולכן OM קטע אמצעים במשולש ABC: $BC=2\cdot OM=2\cdot 9=18$.`,
        ],
        finalAnswer: String.raw`$BC\parallel PO$, $BC=18$.`,
        numericAnswer: 18,
      },
    ],
  },
  {
    id: '35581-4-6',
    questionnaire: '35581',
    slot: 4,
    title: 'זווית בין משיק למיתר וחוצה זווית',
    topicId: 'euclidean-geometry',
    subtopicIds: ['geo-circle-tangents', 'geo-circle-angles', 'geo-bisector-similarity', 'geo-similar-altitudes-areas'],
    difficulty: 3,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="186" cy="108.9" r="105" stroke-width="1.5" />
  <line x1="30" y1="195" x2="262" y2="195" />
  <line x1="30" y1="195" x2="112.2" y2="18.8" />
  <line x1="90.9" y1="64.5" x2="126" y2="195" stroke-width="1.5" />
  <line x1="90.9" y1="64.5" x2="246" y2="195" stroke-width="1.5" />
  <line x1="90.9" y1="64.5" x2="174" y2="195" stroke-width="1.5" stroke-dasharray="5 3" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="14" y="211">D</text>
    <text x="118" y="214">B</text>
    <text x="250" y="214">C</text>
    <text x="74" y="60">A</text>
    <text x="168" y="214">E</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-4-6-a',
        label: 'א',
        statement: String.raw`הישר DA משיק למעגל בנקודה A. ישר העובר דרך D חותך את המעגל בנקודות B ו-C (B בין D ל-C), ראו שרטוט.

הוכיחו: $\triangle DAB\sim\triangle DCA$.`,
        hints: [
          String.raw`איזו זווית היקפית שווה לזווית $\angle DAB$ שבין המשיק DA למיתר AB?`,
          String.raw`הזווית בין משיק למיתר שווה לזווית ההיקפית הנשענת על הקשת הכלואה ביניהם – הקשת AB.`,
          String.raw`לשני המשולשים יש גם זווית משותפת בקודקוד D.`,
        ],
        solutionSteps: [
          String.raw`$\angle DAB$ היא הזווית בין המשיק DA למיתר AB, ולכן היא שווה לזווית ההיקפית הנשענת על הקשת AB הכלואה ביניהם: $\angle DAB=\angle ACB$.`,
          String.raw`$\angle ACB=\angle DCA$ – אותה זווית, כי B נמצאת על הקטע DC.`,
          String.raw`$\angle ADB=\angle CDA$ – זווית משותפת לשני המשולשים.`,
          String.raw`לפי משפט הדמיון ז.ז: $\triangle DAB\sim\triangle DCA$, כאשר D מתאים ל-D, A מתאים ל-C ו-B מתאים ל-A.`,
          String.raw`מהדמיון: $\frac{DA}{DC}=\frac{DB}{DA}=\frac{AB}{CA}$.`,
        ],
        finalAnswer: String.raw`$\triangle DAB\sim\triangle DCA$ (ז.ז: זווית בין משיק למיתר וזווית משותפת).`,
      },
      {
        id: '35581-4-6-b',
        label: 'ב',
        statement: String.raw`נתון: $DA=6$, $DB=4$. חשבו את אורך המיתר BC.`,
        hints: [
          String.raw`מהדמיון בסעיף א: $\frac{DA}{DC}=\frac{DB}{DA}$.`,
          String.raw`חלצו את DC, ואז $BC=DC-DB$.`,
        ],
        solutionSteps: [
          String.raw`מהדמיון $\triangle DAB\sim\triangle DCA$: $\frac{DA}{DC}=\frac{DB}{DA}$, כלומר $\frac{6}{DC}=\frac{4}{6}$.`,
          String.raw`$DC=\frac{36}{4}=9$.`,
          String.raw`B נמצאת בין D ל-C, ולכן $BC=DC-DB=9-4=5$.`,
        ],
        finalAnswer: String.raw`$BC=5$`,
        numericAnswer: 5,
      },
      {
        id: '35581-4-6-c',
        label: 'ג',
        statement: String.raw`AE חוצה את הזווית $\angle BAC$ (הנקודה E על BC). חשבו את אורך הקטע BE.`,
        hints: [
          String.raw`מהדמיון בסעיף א אפשר למצוא את היחס $\frac{AB}{AC}$ בלי לחשב את האורכים עצמם.`,
          String.raw`משפט חוצה הזווית הפנימית: $\frac{BE}{EC}=\frac{AB}{AC}$.`,
          String.raw`סמנו $BE=2t$, $EC=3t$ והשתמשו ב-$BE+EC=5$.`,
        ],
        solutionSteps: [
          String.raw`מהדמיון: $\frac{AB}{CA}=\frac{DB}{DA}=\frac{4}{6}=\frac{2}{3}$.`,
          String.raw`AE חוצה את $\angle BAC$ במשולש ABC, ולכן לפי משפט חוצה הזווית הפנימית: $\frac{BE}{EC}=\frac{AB}{AC}=\frac{2}{3}$.`,
          String.raw`נסמן $BE=2t$ ו-$EC=3t$. אז $2t+3t=BC=5$, ולכן $t=1$.`,
          String.raw`$BE=2$ (ו-$EC=3$).`,
        ],
        finalAnswer: String.raw`$BE=2$`,
        numericAnswer: 2,
      },
      {
        id: '35581-4-6-d',
        label: 'ד',
        statement: String.raw`חשבו את היחס בין שטח המשולש ABE לשטח המשולש DCA.`,
        hints: [
          String.raw`המשולשים DAB ו-DCA דומים – מה היחס בין שטחיהם? ומה היחס $\frac{S_{ABC}}{S_{DCA}}$?`,
          String.raw`למשולשים ABE ו-ABC אותו גובה מהקודקוד A, ולכן יחס שטחיהם כיחס הבסיסים BE ו-BC.`,
          String.raw`כפלו את שני היחסים.`,
        ],
        solutionSteps: [
          String.raw`יחס הדמיון בין $\triangle DAB$ ל-$\triangle DCA$ הוא $\frac{DB}{DA}=\frac{2}{3}$, ולכן יחס השטחים הוא $\frac{S_{DAB}}{S_{DCA}}=\left(\frac{2}{3}\right)^2=\frac{4}{9}$.`,
          String.raw`B על DC, ולכן $S_{ABC}=S_{DCA}-S_{DAB}=\left(1-\frac{4}{9}\right)S_{DCA}=\frac{5}{9}S_{DCA}$.`,
          String.raw`למשולשים ABE ו-ABC אותו גובה מהקודקוד A לישר BC, ולכן $\frac{S_{ABE}}{S_{ABC}}=\frac{BE}{BC}=\frac{2}{5}$.`,
          String.raw`$\frac{S_{ABE}}{S_{DCA}}=\frac{2}{5}\cdot\frac{5}{9}=\frac{2}{9}$.`,
          String.raw`בדיקה: גם $\frac{S_{DAB}}{S_{DCA}}=\frac{DB}{DC}=\frac{4}{9}$ (אותו גובה מ-A), בהתאמה לריבוע יחס הדמיון.`,
        ],
        finalAnswer: String.raw`$\frac{S_{ABE}}{S_{DCA}}=\frac{2}{9}\approx 0.222$`,
        numericAnswer: 0.2222222222222,
      },
    ],
  },
  {
    id: '35581-4-7',
    questionnaire: '35581',
    slot: 4,
    title: 'תיכונים, קטעי אמצעים ומקבילית',
    topicId: 'euclidean-geometry',
    subtopicIds: ['geo-thales-midline', 'geo-triangles-quadrilaterals', 'geo-polygons-congruence'],
    difficulty: 2,
    estimatedMinutes: 20,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="28,210 292,210 116,34" />
  <line x1="28" y1="210" x2="204" y2="122" stroke-width="1.5" />
  <line x1="292" y1="210" x2="72" y2="122" stroke-width="1.5" />
  <polygon points="86.7,180.7 218.7,180.7 204,122 72,122" stroke-width="1.5" stroke-dasharray="5 3" />
  <circle cx="145.3" cy="151.3" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="12" y="226">A</text>
    <text x="296" y="226">B</text>
    <text x="110" y="28">C</text>
    <text x="208" y="118">D</text>
    <text x="56" y="118">E</text>
    <text x="140" y="172">G</text>
    <text x="70" y="196">H</text>
    <text x="222" y="198">K</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-4-7-a',
        label: 'א',
        statement: String.raw`במשולש ABC, AD ו-BE הם תיכונים (D אמצע BC, E אמצע AC), והם נחתכים בנקודה G. הנקודה H היא אמצע הקטע AG, והנקודה K היא אמצע הקטע BG (ראו שרטוט).

הוכיחו: המרובע HKDE הוא מקבילית.`,
        hints: [
          String.raw`חפשו שני קטעי אמצעים: אחד במשולש ABC ואחד במשולש ABG.`,
          String.raw`קטע אמצעים במשולש מקביל לצלע השלישית ושווה למחציתה.`,
          String.raw`מרובע שבו זוג צלעות נגדיות שוות ומקבילות הוא מקבילית.`,
        ],
        solutionSteps: [
          String.raw`במשולש ABC: E אמצע AC ו-D אמצע BC, ולכן ED קטע אמצעים: $ED\parallel AB$ ו-$ED=\frac{1}{2}AB$.`,
          String.raw`במשולש ABG: H אמצע AG ו-K אמצע BG, ולכן HK קטע אמצעים: $HK\parallel AB$ ו-$HK=\frac{1}{2}AB$.`,
          String.raw`מכאן $HK\parallel ED$ (שניהם מקבילים ל-AB) ו-$HK=ED$ (שניהם שווים ל-$\frac{1}{2}AB$).`,
          String.raw`מרובע שבו זוג צלעות נגדיות שוות ומקבילות הוא מקבילית, ולכן HKDE מקבילית.`,
        ],
        finalAnswer: String.raw`HK ו-ED קטעי אמצעים, ולכן $HK\parallel ED$ ו-$HK=ED$ – HKDE מקבילית.`,
      },
      {
        id: '35581-4-7-b',
        label: 'ב',
        statement: String.raw`היעזרו בסעיף א והוכיחו כי $AG=2\cdot GD$ (כלומר נקודת מפגש התיכונים מחלקת את התיכון AD ביחס $2:1$ מהקודקוד).`,
        hints: [
          String.raw`מהם האלכסונים של המקבילית HKDE, ובאיזו נקודה הם נחתכים?`,
          String.raw`אלכסוני מקבילית חוצים זה את זה, ולכן $HG=GD$.`,
        ],
        solutionSteps: [
          String.raw`הנקודות H, G, D נמצאות על התיכון AD, והנקודות K, G, E נמצאות על התיכון BE. לכן HD ו-KE הם אלכסוני המקבילית HKDE, והם נחתכים ב-G.`,
          String.raw`אלכסוני מקבילית חוצים זה את זה, ולכן $HG=GD$.`,
          String.raw`H אמצע AG, ולכן $AH=HG$.`,
          String.raw`מכאן $AH=HG=GD$, ולכן $AG=AH+HG=2\cdot GD$.`,
        ],
        finalAnswer: String.raw`$AH=HG=GD$, ולכן $AG=2\cdot GD$.`,
      },
      {
        id: '35581-4-7-c',
        label: 'ג',
        statement: String.raw`נתון: $AB=12$, והמרחק של הקודקוד C מהישר AB הוא 8. חשבו את המרחק של הנקודה G מהישר AB.`,
        hints: [
          String.raw`הורידו אנכים מ-C, מ-D ומ-G לישר AB. האנכים מקבילים זה לזה.`,
          String.raw`D אמצע BC – האנך מ-D הוא קטע אמצעים במשולש שנוצר מ-C, B ועקב האנך מ-C.`,
          String.raw`לפי סעיף ב $\frac{AG}{AD}=\frac{2}{3}$; השתמשו בתאלס (משולשים דומים בעלי קודקוד משותף A).`,
        ],
        solutionSteps: [
          String.raw`נסמן ב-$C'$, $D'$, $G'$ את עקבי האנכים מ-C, D, G לישר AB. שלושת האנכים מקבילים (כולם מאונכים ל-AB).`,
          String.raw`במשולש $BCC'$: D אמצע BC ו-$DD'\parallel CC'$, ולכן $DD'$ קטע אמצעים: $DD'=\frac{1}{2}CC'=4$.`,
          String.raw`לפי סעיף ב $AG=\frac{2}{3}AD$. במשולש $ADD'$ הקטע $GG'$ מקביל ל-$DD'$, ולכן לפי משפט תאלס המורחב $\frac{GG'}{DD'}=\frac{AG}{AD}=\frac{2}{3}$.`,
          String.raw`$GG'=\frac{2}{3}\cdot 4=\frac{8}{3}$.`,
        ],
        finalAnswer: String.raw`המרחק של G מ-AB הוא $\frac{8}{3}\approx 2.667$.`,
        numericAnswer: 2.6666666666667,
      },
      {
        id: '35581-4-7-d',
        label: 'ד',
        statement: String.raw`חשבו את שטח המקבילית HKDE ואת היחס בין שטחה לשטח המשולש ABC.`,
        hints: [
          String.raw`הבסיס HK שווה ל-$\frac{1}{2}AB$. גובה המקבילית הוא המרחק בין הישרים המקבילים HK ו-ED.`,
          String.raw`מרחק HK מ-AB הוא מחצית המרחק של G מ-AB (H אמצע AG), ומרחק ED מ-AB הוא 4.`,
        ],
        solutionSteps: [
          String.raw`$HK=ED=\frac{1}{2}\cdot 12=6$.`,
          String.raw`HK קטע אמצעים במשולש ABG, ולכן (כמו בסעיף ג) המרחק שלו מ-AB הוא מחצית המרחק של G: $\frac{1}{2}\cdot\frac{8}{3}=\frac{4}{3}$.`,
          String.raw`ED עובר דרך D, ולכן המרחק שלו מ-AB הוא $DD'=4$. גובה המקבילית: $4-\frac{4}{3}=\frac{8}{3}$.`,
          String.raw`$S_{HKDE}=6\cdot\frac{8}{3}=16$.`,
          String.raw`$S_{ABC}=\frac{12\cdot 8}{2}=48$, ולכן $\frac{S_{HKDE}}{S_{ABC}}=\frac{16}{48}=\frac{1}{3}$.`,
        ],
        finalAnswer: String.raw`$S_{HKDE}=16$, והיחס לשטח המשולש הוא $\frac{1}{3}$.`,
        numericAnswer: 16,
      },
    ],
  },
  {
    id: '35581-4-8',
    questionnaire: '35581',
    slot: 4,
    title: 'שני מעגלים משיקים ומשיק משותף',
    topicId: 'euclidean-geometry',
    subtopicIds: ['geo-circle-tangents', 'geo-triangles-quadrilaterals', 'geo-polygons-congruence'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="110" cy="116" r="99" stroke-width="1.5" />
  <circle cx="242" cy="171" r="44" stroke-width="1.5" />
  <line x1="20" y1="215" x2="300" y2="215" />
  <line x1="176" y1="215" x2="212" y2="128.7" />
  <line x1="110" y1="116" x2="242" y2="171" stroke-width="1.5" />
  <line x1="110" y1="116" x2="110" y2="215" stroke-width="1.5" />
  <line x1="242" y1="171" x2="242" y2="215" stroke-width="1.5" />
  <line x1="110" y1="116" x2="176" y2="215" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="242" y1="171" x2="176" y2="215" stroke-width="1.5" stroke-dasharray="5 3" />
  <circle cx="110" cy="116" r="2.5" fill="currentColor" />
  <circle cx="242" cy="171" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="104" y="233">A</text>
    <text x="238" y="233">B</text>
    <text x="171" y="233">M</text>
    <text x="194" y="148">T</text>
    <text x="86" y="112">O₁</text>
    <text x="246" y="166">O₂</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-4-8-a',
        label: 'א',
        statement: String.raw`שני מעגלים, שמרכזיהם $O_1$ ו-$O_2$, משיקים זה לזה מבחוץ בנקודה T. רדיוס המעגל הראשון 9 ורדיוס המעגל השני 4. ישר משיק לשני המעגלים בנקודות A (על המעגל הראשון) ו-B (על המעגל השני). המשיק המשותף לשני המעגלים בנקודה T חותך את AB בנקודה M (ראו שרטוט).

הוכיחו: M היא אמצע הקטע AB, ו-$\angle ATB=90^\circ$.`,
        hints: [
          String.raw`MA ו-MT הם שני משיקים מהנקודה M למעגל הראשון; MT ו-MB – שני משיקים למעגל השני.`,
          String.raw`שני משיקים למעגל מאותה נקודה חיצונית שווים זה לזה.`,
          String.raw`במשולש ATB, TM הוא תיכון השווה למחצית הצלע שאליה הוא יורד.`,
        ],
        solutionSteps: [
          String.raw`MA ו-MT הם שני משיקים למעגל הראשון היוצאים מהנקודה M, ולכן $MA=MT$.`,
          String.raw`MT ו-MB הם שני משיקים למעגל השני היוצאים מ-M, ולכן $MT=MB$.`,
          String.raw`מכאן $MA=MB$, כלומר M אמצע AB, ו-$MT=\frac{1}{2}AB$.`,
          String.raw`במשולש ATB הקטע TM הוא תיכון לצלע AB והוא שווה למחציתה, ולכן המשולש ישר-זווית: $\angle ATB=90^\circ$.`,
        ],
        finalAnswer: String.raw`$MA=MT=MB$, ולכן M אמצע AB ו-$\angle ATB=90^\circ$.`,
      },
      {
        id: '35581-4-8-b',
        label: 'ב',
        statement: String.raw`הוכיחו: המרובע $O_1ABO_2$ הוא טרפז ישר-זווית, ו-$\angle O_1MO_2=90^\circ$.`,
        hints: [
          String.raw`המשיק מאונך לרדיוס בנקודת ההשקה – גם ב-A, גם ב-B וגם ב-T.`,
          String.raw`$MO_1$ חוצה את הזווית $\angle AMT$ ו-$MO_2$ חוצה את הזווית $\angle TMB$ (קטע מנקודה חיצונית למרכז חוצה את הזווית בין המשיקים).`,
          String.raw`הזוויות $\angle AMT$ ו-$\angle TMB$ צמודות.`,
        ],
        solutionSteps: [
          String.raw`המשיק מאונך לרדיוס בנקודת ההשקה: $O_1A\perp AB$ ו-$O_2B\perp AB$. שני ישרים המאונכים לאותו ישר מקבילים, ולכן $O_1A\parallel O_2B$, ו-$O_1A\ne O_2B$ ($9\ne 4$) – המרובע $O_1ABO_2$ הוא טרפז שבו $\angle A=\angle B=90^\circ$, כלומר טרפז ישר-זווית.`,
          String.raw`$\triangle O_1AM\cong\triangle O_1TM$: $O_1A=O_1T$ (רדיוסים), $MA=MT$ (סעיף א), $O_1M$ צלע משותפת (צ.צ.צ). לכן $\angle AMO_1=\angle TMO_1$.`,
          String.raw`באופן דומה $\triangle O_2BM\cong\triangle O_2TM$ (צ.צ.צ), ולכן $\angle BMO_2=\angle TMO_2$.`,
          String.raw`$\angle AMT+\angle TMB=180^\circ$ (זוויות צמודות), ולכן $\angle O_1MO_2=\angle O_1MT+\angle TMO_2=\frac{1}{2}\angle AMT+\frac{1}{2}\angle TMB=90^\circ$.`,
        ],
        finalAnswer: String.raw`$O_1A\parallel O_2B$, שניהם מאונכים ל-AB; $\angle O_1MO_2=90^\circ$.`,
      },
      {
        id: '35581-4-8-c',
        label: 'ג',
        statement: String.raw`חשבו את אורך הקטע AB.`,
        hints: [
          String.raw`המרכזים ונקודת ההשקה נמצאים על ישר אחד, ולכן $O_1O_2=9+4$.`,
          String.raw`הורידו אנך מ-$O_2$ לרדיוס $O_1A$ – מתקבל מלבן ומשולש ישר-זווית.`,
        ],
        solutionSteps: [
          String.raw`בשני מעגלים המשיקים מבחוץ המרכזים ונקודת ההשקה על ישר אחד, ולכן $O_1O_2=O_1T+TO_2=9+4=13$.`,
          String.raw`נוריד מ-$O_2$ אנך $O_2N$ לקטע $O_1A$. המרובע $NABO_2$ מלבן (שלוש זוויות ישרות), ולכן $NA=O_2B=4$ ו-$O_2N=AB$.`,
          String.raw`$O_1N=O_1A-NA=9-4=5$.`,
          String.raw`במשולש ישר-הזווית $O_1NO_2$ לפי פיתגורס: $AB=O_2N=\sqrt{13^2-5^2}=\sqrt{144}=12$.`,
        ],
        finalAnswer: String.raw`$AB=12$`,
        numericAnswer: 12,
      },
      {
        id: '35581-4-8-d',
        label: 'ד',
        statement: String.raw`חשבו את שטח המשולש $O_1MO_2$.`,
        hints: [
          String.raw`שטח המשולש = שטח הטרפז $O_1ABO_2$ פחות שטחי המשולשים $O_1AM$ ו-$O_2BM$.`,
          String.raw`לפי סעיף א, $MA=MB=6$.`,
          String.raw`בדיקה: MT מאונך ל-$O_1O_2$, ולכן הוא הגובה לצלע $O_1O_2$.`,
        ],
        solutionSteps: [
          String.raw`שטח הטרפז: $S_{O_1ABO_2}=\frac{(O_1A+O_2B)\cdot AB}{2}=\frac{(9+4)\cdot 12}{2}=78$.`,
          String.raw`$MA=MB=6$, ולכן $S_{O_1AM}=\frac{9\cdot 6}{2}=27$ ו-$S_{O_2BM}=\frac{4\cdot 6}{2}=12$ (משולשים ישרי-זווית).`,
          String.raw`$S_{O_1MO_2}=78-27-12=39$.`,
          String.raw`בדיקה: המשיק MT מאונך לרדיוסים בנקודה T, כלומר ל-$O_1O_2$, ו-$MT=6$. לכן $S_{O_1MO_2}=\frac{13\cdot 6}{2}=39$.`,
        ],
        finalAnswer: String.raw`$S_{O_1MO_2}=39$`,
        numericAnswer: 39,
      },
    ],
  },
  {
    id: '35581-4-9',
    questionnaire: '35581',
    slot: 4,
    title: 'מקבילית, חלוקת צלע ויחס שטחים',
    topicId: 'euclidean-geometry',
    subtopicIds: ['geo-thales-midline', 'geo-bisector-similarity', 'geo-similar-altitudes-areas', 'geo-triangles-quadrilaterals'],
    difficulty: 3,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30,225 150,225 190,165 70,165" />
  <line x1="150" y1="225" x2="70" y2="165" stroke-width="1.5" />
  <line x1="30" y1="225" x2="270" y2="45" stroke-width="1.5" />
  <line x1="190" y1="165" x2="270" y2="45" stroke-width="1.5" stroke-dasharray="5 3" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="14" y="236">A</text>
    <text x="150" y="240">B</text>
    <text x="196" y="170">C</text>
    <text x="54" y="160">D</text>
    <text x="104" y="158">E</text>
    <text x="78" y="196">F</text>
    <text x="276" y="44">G</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-4-9-a',
        label: 'א',
        statement: String.raw`ABCD מקבילית. הנקודה E על הצלע DC כך ש-$DE:EC=1:2$. הישר AE חותך את האלכסון BD בנקודה F ואת המשך הצלע BC בנקודה G (ראו שרטוט).

הוכיחו: $\triangle DEF\sim\triangle BAF$, ו-$DF:FB=1:3$.`,
        hints: [
          String.raw`במקבילית $DC\parallel AB$ – אילו זוויות מתחלפות שוות?`,
          String.raw`$AB=DC=DE+EC$, ולכן $\frac{DE}{AB}=\frac{1}{3}$.`,
        ],
        solutionSteps: [
          String.raw`במקבילית $DC\parallel AB$. לכן $\angle FDE=\angle FBA$ ו-$\angle FED=\angle FAB$ (זוויות מתחלפות בין ישרים מקבילים).`,
          String.raw`לפי משפט הדמיון ז.ז: $\triangle DEF\sim\triangle BAF$, כאשר D מתאים ל-B, E מתאים ל-A ו-F מתאים ל-F.`,
          String.raw`במקבילית צלעות נגדיות שוות: $AB=DC=DE+EC$. נסמן $DE=t$, $EC=2t$, ואז $AB=3t$.`,
          String.raw`יחס הדמיון: $\frac{DF}{BF}=\frac{DE}{BA}=\frac{t}{3t}=\frac{1}{3}$.`,
        ],
        finalAnswer: String.raw`$\triangle DEF\sim\triangle BAF$ (ז.ז) ביחס $\frac{1}{3}$, ולכן $DF:FB=1:3$.`,
      },
      {
        id: '35581-4-9-b',
        label: 'ב',
        statement: String.raw`נתון: $BD=10$. חשבו את אורך הקטע DF.`,
        hints: [
          String.raw`סמנו $DF=k$, $FB=3k$.`,
          String.raw`$DF+FB=BD$.`,
        ],
        solutionSteps: [
          String.raw`לפי סעיף א $DF:FB=1:3$. נסמן $DF=k$ ו-$FB=3k$.`,
          String.raw`F על האלכסון BD, ולכן $k+3k=10$, כלומר $k=2.5$.`,
          String.raw`$DF=2.5$ (ו-$FB=7.5$).`,
        ],
        finalAnswer: String.raw`$DF=2.5$`,
        numericAnswer: 2.5,
      },
      {
        id: '35581-4-9-c',
        label: 'ג',
        statement: String.raw`נתון גם: שטח המקבילית ABCD הוא 72. חשבו את שטח המשולש DEF.`,
        hints: [
          String.raw`האלכסון BD מחלק את המקבילית לשני משולשים שווי שטח.`,
          String.raw`למשולשים ABF ו-ABD אותו גובה מהקודקוד A, ולכן יחס שטחיהם כיחס הבסיסים BF ו-BD.`,
          String.raw`יחס השטחים של המשולשים הדומים DEF ו-BAF שווה לריבוע יחס הדמיון.`,
        ],
        solutionSteps: [
          String.raw`האלכסון מחלק את המקבילית לשני משולשים חופפים, ולכן $S_{ABD}=\frac{72}{2}=36$.`,
          String.raw`למשולשים ABF ו-ABD אותו גובה מ-A לישר BD, ולכן $\frac{S_{ABF}}{S_{ABD}}=\frac{BF}{BD}=\frac{3}{4}$, כלומר $S_{ABF}=27$.`,
          String.raw`יחס השטחים במשולשים דומים שווה לריבוע יחס הדמיון: $\frac{S_{DEF}}{S_{BAF}}=\left(\frac{1}{3}\right)^2=\frac{1}{9}$.`,
          String.raw`$S_{DEF}=\frac{27}{9}=3$.`,
        ],
        finalAnswer: String.raw`$S_{DEF}=3$`,
        numericAnswer: 3,
      },
      {
        id: '35581-4-9-d',
        label: 'ד',
        statement: String.raw`חשבו את שטח המשולש CEG.`,
        hints: [
          String.raw`$CG\parallel AD$ (המשך הצלע BC מקביל לצלע AD). איזה משולש דומה למשולש CEG?`,
          String.raw`$\triangle CEG\sim\triangle DEA$ ביחס $\frac{EC}{ED}=2$.`,
          String.raw`חשבו את $S_{ADE}$: גובהו מ-A לישר DC שווה לגובה המקבילית, ובסיסו $DE=\frac{1}{3}DC$.`,
        ],
        solutionSteps: [
          String.raw`$CG\parallel AD$ (G על המשך BC), ולכן $\angle ECG=\angle EDA$ (זוויות מתחלפות), ו-$\angle CEG=\angle DEA$ (זוויות קודקודיות). לפי ז.ז: $\triangle CEG\sim\triangle DEA$.`,
          String.raw`יחס הדמיון: $\frac{CE}{DE}=\frac{2}{1}=2$.`,
          String.raw`במשולש ADE הגובה מ-A לישר DC שווה לגובה המקבילית לצלע DC, והבסיס $DE=\frac{1}{3}DC$. לכן $S_{ADE}=\frac{1}{2}\cdot\frac{1}{3}DC\cdot h=\frac{1}{6}S_{ABCD}=12$.`,
          String.raw`יחס השטחים שווה לריבוע יחס הדמיון: $S_{CEG}=2^2\cdot 12=48$.`,
        ],
        finalAnswer: String.raw`$S_{CEG}=48$`,
        numericAnswer: 48,
      },
    ],
  },
  {
    id: '35581-4-10',
    questionnaire: '35581',
    slot: 4,
    title: 'מעגל חסום במשולש ישר-זווית',
    topicId: 'euclidean-geometry',
    subtopicIds: ['geo-loci', 'geo-cyclic-quadrilaterals', 'geo-circle-tangents', 'geo-polygons-congruence'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="50,205 50,43 266,205" />
  <circle cx="104" cy="151" r="54" stroke-width="1.5" />
  <line x1="104" y1="151" x2="104" y2="205" stroke-width="1.5" />
  <line x1="104" y1="151" x2="50" y2="151" stroke-width="1.5" />
  <line x1="104" y1="151" x2="136.4" y2="107.8" stroke-width="1.5" />
  <line x1="104" y1="151" x2="158" y2="124" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="50,193 62,193 62,205" stroke-width="1" />
  <circle cx="104" cy="151" r="2.5" fill="currentColor" />
  <circle cx="158" cy="124" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="34" y="221">C</text>
    <text x="36" y="40">A</text>
    <text x="270" y="221">B</text>
    <text x="100" y="222">D</text>
    <text x="34" y="156">E</text>
    <text x="134" y="100">F</text>
    <text x="96" y="168">I</text>
    <text x="162" y="120">M</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-4-10-a',
        label: 'א',
        statement: String.raw`במשולש ABC הזווית C ישרה. I היא נקודת המפגש של חוצי הזוויות של המשולש. D, E, F הם עקבי האנכים מ-I לצלעות BC, AC, AB בהתאמה (ראו שרטוט).

הוכיחו: $ID=IE=IF$ (ולכן המעגל שמרכזו I ורדיוסו $r=ID$ חסום במשולש), והמרובע CDIE הוא ריבוע.`,
        hints: [
          String.raw`חוצה זווית הוא המקום הגאומטרי של הנקודות שמרחקיהן משוקי הזווית שווים.`,
          String.raw`I על חוצה הזווית A ועל חוצה הזווית B – מה ניתן להסיק על מרחקיה מהצלעות?`,
          String.raw`במרובע CDIE שלוש זוויות ישרות, והצלעות הסמוכות ID ו-IE שוות.`,
        ],
        solutionSteps: [
          String.raw`I נמצאת על חוצה הזווית A, ולכן היא שווה-מרחק משוקי הזווית: $IE=IF$ (המקום הגאומטרי של חוצה זווית).`,
          String.raw`I נמצאת על חוצה הזווית B, ולכן $ID=IF$. מכאן $ID=IE=IF=r$, והמעגל שמרכזו I ורדיוסו r עובר דרך D, E, F ומשיק לשלוש הצלעות (כל צלע מאונכת לרדיוס בקצהו).`,
          String.raw`במרובע CDIE: $\angle C=90^\circ$ (נתון), $\angle IDC=\angle IEC=90^\circ$ (ID, IE אנכים). לכן גם הזווית הרביעית ישרה ($360^\circ-3\cdot 90^\circ$), והמרובע מלבן.`,
          String.raw`מלבן שבו שתי צלעות סמוכות שוות ($ID=IE$) הוא ריבוע, ולכן CDIE ריבוע: $CD=CE=r$.`,
        ],
        finalAnswer: String.raw`$ID=IE=IF$ מתכונת חוצה הזווית כמקום גאומטרי; CDIE מלבן עם צלעות סמוכות שוות, כלומר ריבוע.`,
      },
      {
        id: '35581-4-10-b',
        label: 'ב',
        statement: String.raw`הוכיחו: המרובע AEIF חסום במעגל, וכן $AE=AF$.`,
        hints: [
          String.raw`חשבו את סכום הזוויות הנגדיות $\angle AEI$ ו-$\angle AFI$.`,
          String.raw`לחפיפת המשולשים AEI ו-AFI: יתר משותף, ניצב שווה – איזה משפט חפיפה מתאים?`,
        ],
        solutionSteps: [
          String.raw`$\angle AEI=\angle AFI=90^\circ$ (IE ו-IF אנכים), ולכן $\angle AEI+\angle AFI=180^\circ$.`,
          String.raw`מרובע שבו סכום זוג זוויות נגדיות הוא $180^\circ$ ניתן לחסום במעגל, ולכן AEIF חסום במעגל (שקוטרו AI).`,
          String.raw`במשולשים AEI ו-AFI: AI צלע משותפת, $IE=IF$ (סעיף א), והזווית הישרה מונחת מול AI – הצלע הגדולה מבין השתיים (היתר). לכן $\triangle AEI\cong\triangle AFI$ (צ.צ.ז).`,
          String.raw`צלעות מתאימות במשולשים חופפים שוות: $AE=AF$. (באותו אופן $BD=BF$.)`,
        ],
        finalAnswer: String.raw`$\angle AEI+\angle AFI=180^\circ$, לכן AEIF בר-חסימה; $\triangle AEI\cong\triangle AFI$, לכן $AE=AF$.`,
      },
      {
        id: '35581-4-10-c',
        label: 'ג',
        statement: String.raw`נתון: $AC=6$, $BC=8$. חשבו את רדיוס המעגל החסום r.`,
        hints: [
          String.raw`חשבו את AB לפי פיתגורס.`,
          String.raw`לפי סעיף א, $CE=CD=r$. בטאו את AE ואת BD באמצעות r.`,
          String.raw`לפי סעיף ב: $AB=AF+FB=AE+BD$.`,
        ],
        solutionSteps: [
          String.raw`לפי פיתגורס במשולש ABC: $AB=\sqrt{6^2+8^2}=10$.`,
          String.raw`CDIE ריבוע, ולכן $CE=CD=r$, ומכאן $AE=6-r$ ו-$BD=8-r$.`,
          String.raw`לפי סעיף ב $AF=AE=6-r$ ו-$BF=BD=8-r$. F על AB, ולכן $AB=AF+FB=(6-r)+(8-r)=14-2r$.`,
          String.raw`$14-2r=10$, ולכן $r=2$. (באופן כללי קיבלנו $r=\frac{AC+BC-AB}{2}$.)`,
        ],
        finalAnswer: String.raw`$r=2$`,
        numericAnswer: 2,
      },
      {
        id: '35581-4-10-d',
        label: 'ד',
        statement: String.raw`M היא מרכז המעגל החוסם את המשולש ABC. הסבירו מדוע M היא אמצע היתר AB, וחשבו את המרחק IM.`,
        hints: [
          String.raw`מרכז המעגל החוסם הוא נקודת המפגש של האנכים האמצעיים. זווית היקפית ישרה נשענת על קוטר.`,
          String.raw`לפי סעיף ב, $AF=AE=4$; ו-$AM=5$. מה אורך FM?`,
          String.raw`$IF\perp AB$ – פיתגורס במשולש IFM.`,
        ],
        solutionSteps: [
          String.raw`M שווה-מרחק מכל קודקודי המשולש (מפגש האנכים האמצעיים). הזווית ההיקפית $\angle ACB=90^\circ$ נשענת על קוטר, ולכן AB קוטר של המעגל החוסם ומרכזו M הוא אמצע AB: $AM=5$.`,
          String.raw`לפי סעיפים ב, ג: $AF=AE=6-2=4$. F ו-M שתיהן על AB ו-$AF<AM$, ולכן $FM=AM-AF=5-4=1$.`,
          String.raw`$IF\perp AB$ ו-$IF=r=2$. במשולש ישר-הזווית IFM לפי פיתגורס: $IM=\sqrt{IF^2+FM^2}=\sqrt{4+1}=\sqrt{5}$.`,
        ],
        finalAnswer: String.raw`$IM=\sqrt{5}\approx 2.236$`,
        numericAnswer: 2.2360679774998,
      },
    ],
  },
];
