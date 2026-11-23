import type { DiagramSpec, Exercise, ExerciseSet } from './types';

/**
 * סט: קטעים פרופורציוניים במשולש ישר זווית (שאלון 35581, שאלה 4 – גאומטריה).
 * 1–4 צעד אחד · 5–8 שניים-שלושה סעיפים · 9–12 שאלות בסגנון בגרות.
 * בכל השרטוטים הזווית הישרה ישרה באמת והאורכים תואמים את הנתונים.
 */

const T = 'euclidean-geometry';
const RP = 'geo-right-triangle-proportions';
const TQ = 'geo-triangles-quadrilaterals';
const SIM = 'geo-bisector-similarity';
const AR = 'geo-similar-altitudes-areas';
const CA = 'geo-circle-angles';

type Label = { from: string; to: string; label: string };

/** Right triangle ABC (right angle at C) on the hypotenuse AB, with the altitude CD: AD = p, DB = q. */
function altitudeTriangle(p: number, q: number, labels: Label[] = []): DiagramSpec {
  const h = Math.round(Math.sqrt(p * q) * 10000) / 10000;
  return {
    kind: 'geo',
    points: { A: [0, 0], B: [p + q, 0], C: [p, h], D: [p, 0] },
    polygons: [['A', 'B', 'C']],
    segments: [['C', 'D'], ...labels],
    angles: [{ at: 'C', from: 'A', to: 'B', right: true }, { at: 'D', from: 'C', to: 'B', right: true }],
  };
}

const INTRO = String.raw`במשולש ישר זווית $ABC$ ($\angle ACB=90^\circ$), $CD$ הוא הגובה ליתר $AB$ (ראו שרטוט).`;

const e1: Exercise = {
  id: 'gpr-1',
  level: 1,
  topicId: T,
  subtopicIds: [RP],
  intro: String.raw`${INTRO} נתון: $AD=4$, $DB=9$.`,
  diagram: altitudeTriangle(4, 9, [{ from: 'A', to: 'D', label: '4' }, { from: 'D', to: 'B', label: '9' }]),
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הגובה $CD$.`,
      hints: [String.raw`הקטעים $AD$ ו-$DB$ הם היטלי הניצבים על היתר. יש משפט שקושר אותם לגובה ליתר.`, String.raw`הגובה ליתר הוא הממוצע ההנדסי של היטלי הניצבים על היתר: $CD^2=AD\cdot DB$.`],
      check: { kind: 'numeric', answer: 6, verify: 'sqrt(4*9)' },
      short: String.raw`$CD^2=AD\cdot DB=4\cdot 9=36$, ולכן $CD=6$.`,
      full: [String.raw`משפט: במשולש ישר זווית, הגובה ליתר הוא הממוצע ההנדסי של היטלי הניצבים על היתר.`, String.raw`$AD$ הוא היטל הניצב $AC$ ו-$DB$ הוא היטל הניצב $BC$, ולכן $CD^2=AD\cdot DB$.`, String.raw`$CD^2=4\cdot 9=36\ \Rightarrow\ CD=6$.`],
    },
  ],
};

const e2: Exercise = {
  id: 'gpr-2',
  level: 1,
  topicId: T,
  subtopicIds: [RP],
  intro: String.raw`${INTRO} נתון: $AD=3$, $DB=9$.`,
  diagram: altitudeTriangle(3, 9, [{ from: 'A', to: 'D', label: '3' }, { from: 'D', to: 'B', label: '9' }]),
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הניצב $AC$.`,
      hints: [String.raw`יש משפט שקושר ניצב ליתר כולו ולהיטל של אותו ניצב על היתר.`, String.raw`$AC^2=AD\cdot AB$, כאשר $AB=AD+DB$.`],
      check: { kind: 'numeric', answer: 6, verify: 'sqrt(3*(3+9))' },
      short: String.raw`$AB=12$ ו-$AC^2=AD\cdot AB=3\cdot 12=36$, ולכן $AC=6$.`,
      full: [String.raw`משפט: במשולש ישר זווית, ניצב הוא הממוצע ההנדסי של היתר ושל היטל הניצב על היתר.`, String.raw`ההיטל של $AC$ על היתר הוא $AD$, והיתר הוא $AB=AD+DB=3+9=12$.`, String.raw`$AC^2=AD\cdot AB=3\cdot 12=36\ \Rightarrow\ AC=6$. שימו לב: במכפלה מופיע היתר כולו ($12$), ולא ההיטל האחר ($9$).`],
    },
  ],
};

const e3: Exercise = {
  id: 'gpr-3',
  level: 1,
  topicId: T,
  subtopicIds: [RP, TQ],
  intro: String.raw`במשולש ישר זווית $ABC$ ($\angle ACB=90^\circ$) נתון: $AC=6$, $BC=8$, $AB=10$. $CD$ הוא הגובה ליתר $AB$ (ראו שרטוט).`,
  diagram: altitudeTriangle(3.6, 6.4, [{ from: 'A', to: 'C', label: '6' }, { from: 'B', to: 'C', label: '8' }, { from: 'A', to: 'B', label: '10' }]),
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הגובה $CD$.`,
      hints: [String.raw`חשבו את שטח המשולש בשתי דרכים: בעזרת שני הניצבים, ובעזרת היתר והגובה ליתר.`, String.raw`$\dfrac{AC\cdot BC}{2}=\dfrac{AB\cdot CD}{2}$, ולכן $CD=\dfrac{AC\cdot BC}{AB}$.`],
      check: { kind: 'numeric', answer: 4.8, verify: '6*8/10' },
      short: String.raw`משוויון השטחים: $CD=\dfrac{AC\cdot BC}{AB}=\dfrac{6\cdot 8}{10}=4.8$.`,
      full: [String.raw`שטח המשולש בעזרת הניצבים: $S=\dfrac{AC\cdot BC}{2}=\dfrac{6\cdot 8}{2}=24$.`, String.raw`שטח המשולש בעזרת היתר והגובה ליתר: $S=\dfrac{AB\cdot CD}{2}=5\cdot CD$.`, String.raw`$5\cdot CD=24\ \Rightarrow\ CD=4.8$. בכלל: $CD=\dfrac{AC\cdot BC}{AB}$.`],
    },
  ],
};

const e4: Exercise = {
  id: 'gpr-4',
  level: 1,
  topicId: T,
  subtopicIds: [RP],
  intro: INTRO,
  diagram: altitudeTriangle(5, 11),
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזה מהשוויונות הבאים נכון?`,
      hints: [String.raw`ההיטל של הניצב $BC$ על היתר הוא הקטע שבין $B$ לבין עקב הגובה $D$.`, String.raw`ניצב הוא הממוצע ההנדסי של היתר ושל ההיטל שלו על היתר.`],
      check: { kind: 'choice', options: [String.raw`$BC^2=AD\cdot AB$`, String.raw`$BC^2=BD\cdot AD$`, String.raw`$BC^2=BD\cdot AB$`, String.raw`$BC^2=CD\cdot AB$`], correct: 2 },
      short: String.raw`ההיטל של $BC$ על היתר הוא $BD$, ולכן $BC^2=BD\cdot AB$.`,
      full: [String.raw`משפט: ניצב הוא הממוצע ההנדסי של היתר ושל היטל הניצב על היתר.`, String.raw`ההיטל של הניצב $BC$ על היתר $AB$ הוא $BD$, ולכן $BC^2=BD\cdot AB$.`, String.raw`שאר המכפלות שייכות לקטעים אחרים: $AD\cdot AB=AC^2$ (הניצב האחר), $BD\cdot AD=CD^2$ (הגובה ליתר), ו-$CD\cdot AB=AC\cdot BC$ (פעמיים שטח המשולש).`],
    },
  ],
};

const e5: Exercise = {
  id: 'gpr-5',
  level: 2,
  topicId: T,
  subtopicIds: [RP, TQ],
  intro: String.raw`${INTRO} נתון: $AD=18$, $DB=32$.`,
  diagram: altitudeTriangle(18, 32, [{ from: 'A', to: 'D', label: '18' }, { from: 'D', to: 'B', label: '32' }]),
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הגובה $CD$.`,
      hints: [String.raw`הגובה ליתר קשור לשני ההיטלים.`, String.raw`$CD^2=AD\cdot DB$.`],
      check: { kind: 'numeric', answer: 24, verify: 'sqrt(18*32)' },
      short: String.raw`$CD^2=18\cdot 32=576$, ולכן $CD=24$.`,
      full: [String.raw`הגובה ליתר הוא הממוצע ההנדסי של היטלי הניצבים: $CD^2=AD\cdot DB$.`, String.raw`$CD^2=18\cdot 32=576\ \Rightarrow\ CD=24$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את אורך הניצב $AC$.`,
      hints: [String.raw`מהו אורך היתר $AB$?`, String.raw`$AC^2=AD\cdot AB$.`],
      check: { kind: 'numeric', answer: 30, verify: 'sqrt(18*(18+32))' },
      short: String.raw`$AB=50$ ו-$AC^2=18\cdot 50=900$, ולכן $AC=30$.`,
      full: [String.raw`$AB=AD+DB=18+32=50$.`, String.raw`ניצב הוא הממוצע ההנדסי של היתר ושל היטלו: $AC^2=AD\cdot AB=18\cdot 50=900$.`, String.raw`$AC=30$. (אפשר גם בפיתגורס במשולש $ADC$: $18^2+24^2=900$.)`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את אורך הניצב $BC$.`,
      hints: [String.raw`ההיטל של $BC$ על היתר הוא $DB$.`, String.raw`$BC^2=DB\cdot AB$.`],
      check: { kind: 'numeric', answer: 40, verify: 'sqrt(32*(18+32))' },
      short: String.raw`$BC^2=DB\cdot AB=32\cdot 50=1600$, ולכן $BC=40$.`,
      full: [String.raw`$BC^2=DB\cdot AB=32\cdot 50=1600\ \Rightarrow\ BC=40$.`, String.raw`בדיקה בפיתגורס: $30^2+40^2=2500=50^2$.`, String.raw`בדיקה בנוסחת הגובה: $\dfrac{AC\cdot BC}{AB}=\dfrac{30\cdot 40}{50}=24=CD$.`],
    },
  ],
};

const e6: Exercise = {
  id: 'gpr-6',
  level: 2,
  topicId: T,
  subtopicIds: [RP, AR],
  intro: String.raw`${INTRO} נתון: $AB=25$, $CD=10$, ו-$AD<DB$.`,
  diagram: altitudeTriangle(5, 20, [{ from: 'C', to: 'D', label: '10' }, { from: 'A', to: 'B', label: '25' }]),
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $AD$.`,
      hints: [String.raw`סמנו $AD=x$. כמה הוא $DB$?`, String.raw`$DB=25-x$, ו-$CD^2=AD\cdot DB$: $x(25-x)=100$.`, String.raw`$x^2-25x+100=0$; בחרו את הפתרון שמתאים לתנאי $AD<DB$.`],
      check: { kind: 'numeric', answer: 5, verify: '(25-sqrt(25^2-4*10^2))/2' },
      short: String.raw`$x(25-x)=10^2$, כלומר $x^2-25x+100=0$, $x=5$ או $x=20$. מכיוון ש-$AD<DB$: $AD=5$.`,
      full: [String.raw`נסמן $AD=x$; אז $DB=25-x$.`, String.raw`$CD^2=AD\cdot DB$, כלומר $100=x(25-x)$.`, String.raw`$x^2-25x+100=0\ \Rightarrow\ (x-5)(x-20)=0$.`, String.raw`$AD<DB$, ולכן $AD=5$ (ו-$DB=20$).`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את אורך הניצב $AC$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`$AC^2=AD\cdot AB$.`],
      check: { kind: 'numeric', answer: 11.18033989, tol: 0.01, verify: 'sqrt(((25-sqrt(25^2-4*10^2))/2)*25)' },
      short: String.raw`$AC^2=AD\cdot AB=5\cdot 25=125$, ולכן $AC=5\sqrt5\approx 11.18$.`,
      full: [String.raw`$AC^2=AD\cdot AB=5\cdot 25=125$.`, String.raw`$AC=\sqrt{125}=5\sqrt5\approx 11.18$.`, String.raw`בדיקה בפיתגורס במשולש $ADC$: $5^2+10^2=125$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את היחס בין שטח המשולש $ACD$ לשטח המשולש $CBD$.`,
      hints: [String.raw`לשני המשולשים גובה משותף, $CD$.`, String.raw`למשולשים בעלי אותו גובה, יחס השטחים שווה ליחס הבסיסים: $\dfrac{AD}{DB}$.`],
      check: { kind: 'numeric', answer: 0.25, verify: '((25-sqrt(25^2-4*10^2))/2)/((25+sqrt(25^2-4*10^2))/2)' },
      short: String.raw`לשני המשולשים אותו גובה $CD$, ולכן $\dfrac{S_{ACD}}{S_{CBD}}=\dfrac{AD}{DB}=\dfrac{5}{20}=\dfrac14$.`,
      full: [String.raw`$CD$ הוא גובה לצלע $AD$ במשולש $ACD$ ולצלע $DB$ במשולש $CBD$.`, String.raw`$\dfrac{S_{ACD}}{S_{CBD}}=\dfrac{\frac12 AD\cdot CD}{\frac12 DB\cdot CD}=\dfrac{AD}{DB}=\dfrac{5}{20}=\dfrac14$.`, String.raw`דרך אחרת: $\triangle ACD\sim\triangle CBD$ ויחס הדמיון הוא $\dfrac{AC}{CB}=\dfrac{\sqrt{125}}{\sqrt{500}}=\dfrac12$, ולכן יחס השטחים הוא $\left(\dfrac12\right)^2=\dfrac14$.`],
    },
  ],
};

const e7: Exercise = {
  id: 'gpr-7',
  level: 2,
  topicId: T,
  subtopicIds: [RP, SIM, TQ],
  intro: INTRO,
  diagram: altitudeTriangle(2, 8, [{ from: 'C', to: 'D', label: '4' }]),
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו כי $\triangle ACD\sim\triangle CBD$, והסיקו מכך ש-$CD^2=AD\cdot DB$.`,
      hints: [String.raw`בשני המשולשים יש זווית ישרה ב-$D$. חפשו עוד זוג זוויות שוות.`, String.raw`$\angle A$ ו-$\angle DCB$ משלימות שתיהן את $\angle ACD$ ל-$90^\circ$.`],
      check: { kind: 'self' },
      short: String.raw`$\angle ADC=\angle CDB=90^\circ$ ו-$\angle A=\angle DCB$ (שתיהן משלימות את $\angle ACD$ ל-$90^\circ$), ולכן $\triangle ACD\sim\triangle CBD$ (ז.ז.). מכאן $\dfrac{AD}{CD}=\dfrac{CD}{BD}$, כלומר $CD^2=AD\cdot DB$.`,
      full: [String.raw`$CD\perp AB$, ולכן $\angle ADC=\angle CDB=90^\circ$.`, String.raw`במשולש $ACD$: $\angle A+\angle ACD=90^\circ$. מהנתון $\angle ACB=90^\circ$: $\angle ACD+\angle DCB=90^\circ$. לכן $\angle A=\angle DCB$.`, String.raw`לכן $\triangle ACD\sim\triangle CBD$ לפי משפט הדמיון ז.ז. (הקודקודים המתאימים: $A\leftrightarrow C$, $C\leftrightarrow B$, $D\leftrightarrow D$).`, String.raw`מהדמיון: $\dfrac{AD}{CD}=\dfrac{CD}{BD}=\dfrac{AC}{CB}$.`, String.raw`מהשוויון $\dfrac{AD}{CD}=\dfrac{CD}{BD}$ נקבל $CD^2=AD\cdot DB$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`נתון: $CD=4$, והקטע $DB$ ארוך ב-$6$ מהקטע $AD$. חשבו את $AD$.`,
      hints: [String.raw`סמנו $AD=x$, ואז $DB=x+6$.`, String.raw`$CD^2=AD\cdot DB$: $16=x(x+6)$.`, String.raw`$x^2+6x-16=0$; רק הפתרון החיובי מתאים.`],
      check: { kind: 'numeric', answer: 2, verify: '(-6+sqrt(6^2+4*4^2))/2' },
      short: String.raw`$x(x+6)=16$, כלומר $x^2+6x-16=0$, ולכן $AD=x=2$ (הפתרון $x=-8$ נפסל).`,
      full: [String.raw`נסמן $AD=x$; אז $DB=x+6$.`, String.raw`$CD^2=AD\cdot DB$, כלומר $16=x(x+6)$.`, String.raw`$x^2+6x-16=0\ \Rightarrow\ (x-2)(x+8)=0$.`, String.raw`אורך קטע חיובי, ולכן $AD=2$ (ו-$DB=8$).`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את אורך הניצב $AC$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`אפשר להשתמש במשפט פיתגורס במשולש $ADC$, או במשפט $AC^2=AD\cdot AB$.`],
      check: { kind: 'numeric', answer: 4.472135955, tol: 0.01, verify: 'sqrt(((-6+sqrt(6^2+4*4^2))/2)^2+4^2)' },
      short: String.raw`$AB=10$ ו-$AC^2=AD\cdot AB=2\cdot 10=20$, ולכן $AC=2\sqrt5\approx 4.47$.`,
      full: [String.raw`$AB=AD+DB=2+8=10$.`, String.raw`$AC^2=AD\cdot AB=2\cdot 10=20\ \Rightarrow\ AC=\sqrt{20}=2\sqrt5\approx 4.47$.`, String.raw`בדיקה בפיתגורס במשולש $ADC$: $AD^2+CD^2=4+16=20$.`],
    },
  ],
};

const e8: Exercise = {
  id: 'gpr-8',
  level: 2,
  topicId: T,
  subtopicIds: [RP, SIM],
  intro: INTRO,
  diagram: altitudeTriangle(4, 5, [{ from: 'A', to: 'C', label: '6' }, { from: 'D', to: 'B', label: '5' }]),
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו כי $\triangle ACD\sim\triangle ABC$, והסיקו מכך ש-$AC^2=AD\cdot AB$.`,
      hints: [String.raw`לשני המשולשים זווית משותפת, ובכל אחד מהם יש זווית ישרה.`, String.raw`$\angle A$ משותפת ו-$\angle ADC=\angle ACB=90^\circ$. כתבו את יחס הצלעות המתאימות שמכיל את $AC$ פעמיים.`],
      check: { kind: 'self' },
      short: String.raw`$\angle A$ משותפת ו-$\angle ADC=\angle ACB=90^\circ$, ולכן $\triangle ACD\sim\triangle ABC$ (ז.ז.). מכאן $\dfrac{AC}{AB}=\dfrac{AD}{AC}$, כלומר $AC^2=AD\cdot AB$.`,
      full: [String.raw`$\angle A$ משותפת למשולשים $ACD$ ו-$ABC$.`, String.raw`$\angle ADC=90^\circ$ (כי $CD$ גובה) ו-$\angle ACB=90^\circ$ (נתון), ולכן $\angle ADC=\angle ACB$.`, String.raw`לכן $\triangle ACD\sim\triangle ABC$ לפי משפט הדמיון ז.ז. (הקודקודים המתאימים: $A\leftrightarrow A$, $C\leftrightarrow B$, $D\leftrightarrow C$).`, String.raw`מהדמיון: $\dfrac{AC}{AB}=\dfrac{AD}{AC}$ (יתר מול יתר, והניצב שליד $\angle A$ מול הניצב שליד $\angle A$).`, String.raw`בכפל בהצלבה: $AC^2=AD\cdot AB$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`נתון: $AC=6$, $DB=5$. חשבו את $AD$.`,
      hints: [String.raw`סמנו $AD=x$, ואז $AB=x+5$.`, String.raw`$AC^2=AD\cdot AB$: $36=x(x+5)$.`, String.raw`$x^2+5x-36=0$; רק הפתרון החיובי מתאים.`],
      check: { kind: 'numeric', answer: 4, verify: '(-5+sqrt(5^2+4*6^2))/2' },
      short: String.raw`$x(x+5)=36$, כלומר $x^2+5x-36=0$, ולכן $AD=x=4$ (הפתרון $x=-9$ נפסל).`,
      full: [String.raw`נסמן $AD=x$; אז $AB=AD+DB=x+5$.`, String.raw`$AC^2=AD\cdot AB$, כלומר $36=x(x+5)$.`, String.raw`$x^2+5x-36=0\ \Rightarrow\ (x-4)(x+9)=0$.`, String.raw`אורך קטע חיובי, ולכן $AD=4$ (ו-$AB=9$).`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את אורך הניצב $BC$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`ההיטל של $BC$ על היתר הוא $DB$.`, String.raw`$BC^2=DB\cdot AB$.`],
      check: { kind: 'numeric', answer: 6.708203932, tol: 0.01, verify: 'sqrt(5*(5+(-5+sqrt(5^2+4*6^2))/2))' },
      short: String.raw`$BC^2=DB\cdot AB=5\cdot 9=45$, ולכן $BC=3\sqrt5\approx 6.71$.`,
      full: [String.raw`$BC^2=DB\cdot AB=5\cdot 9=45$.`, String.raw`$BC=\sqrt{45}=3\sqrt5\approx 6.71$.`, String.raw`בדיקה בפיתגורס: $AC^2+BC^2=36+45=81=9^2=AB^2$.`],
    },
  ],
};

const e9: Exercise = {
  id: 'gpr-9',
  level: 3,
  topicId: T,
  subtopicIds: [RP, CA, TQ],
  intro: String.raw`$AB$ הוא קוטר במעגל שמרכזו $O$, ו-$C$ נקודה על המעגל. $CD$ הוא הגובה לצלע $AB$ במשולש $ABC$, והמשכו חותך את המעגל בנקודה $E$ (ראו שרטוט). נתון: $AD=4$, $CD=8$.`,
  diagram: { kind: 'geo', points: { A: [0, 0], B: [20, 0], O: [10, 0], D: [4, 0], C: [4, 8], E: [4, -8] }, circles: [{ center: 'O', radius: 10 }], polygons: [['A', 'C', 'B']], segments: [['C', 'E'], { from: 'A', to: 'E', dashed: true }, { from: 'B', to: 'E', dashed: true }], angles: [{ at: 'D', from: 'C', to: 'B', right: true }], labels: [{ at: [2, 0], text: '4', dy: 12 }, { at: [4, 4.6], text: '8', dx: 11 }, { at: 'D', text: 'D', dx: 11, dy: 14 }, { at: 'O', text: 'O', dy: 14 }], hideNames: ['D', 'O'], dots: ['O'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $DB$.`,
      hints: [String.raw`מה גודל הזווית $ACB$? על מה היא נשענת?`, String.raw`זווית היקפית הנשענת על קוטר היא ישרה, ולכן $CD$ הוא הגובה ליתר במשולש ישר זווית.`, String.raw`$CD^2=AD\cdot DB$.`],
      check: { kind: 'numeric', answer: 16, verify: '8^2/4' },
      short: String.raw`$\angle ACB=90^\circ$ (נשענת על קוטר), ולכן $CD^2=AD\cdot DB$: $64=4\cdot DB$, $DB=16$.`,
      full: [String.raw`$\angle ACB$ היא זווית היקפית הנשענת על הקוטר $AB$, ולכן $\angle ACB=90^\circ$.`, String.raw`במשולש ישר הזווית $ABC$, $CD$ הוא הגובה ליתר, ולכן $CD^2=AD\cdot DB$.`, String.raw`$8^2=4\cdot DB\ \Rightarrow\ DB=16$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את רדיוס המעגל.`,
      hints: [String.raw`$AB=AD+DB$ הוא קוטר.`],
      check: { kind: 'numeric', answer: 10, verify: '(4+8^2/4)/2' },
      short: String.raw`$AB=4+16=20$, ולכן $R=10$.`,
      full: [String.raw`$AB=AD+DB=4+16=20$.`, String.raw`$AB$ קוטר, ולכן $R=10$.`, String.raw`בדיקה: $OD=OA-AD=6$, ובמשולש ישר הזווית $ODC$: $6^2+8^2=100=OC^2$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את אורך המיתר $BC$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`$BC$ הוא ניצב במשולש $ABC$, וההיטל שלו על היתר הוא $DB$.`, String.raw`$BC^2=DB\cdot AB$.`],
      check: { kind: 'numeric', answer: 17.88854382, tol: 0.01, verify: 'sqrt((8^2/4)*(4+8^2/4))' },
      short: String.raw`$BC^2=DB\cdot AB=16\cdot 20=320$, ולכן $BC=8\sqrt5\approx 17.89$.`,
      full: [String.raw`ניצב הוא הממוצע ההנדסי של היתר ושל היטלו: $BC^2=DB\cdot AB=16\cdot 20=320$.`, String.raw`$BC=\sqrt{320}=8\sqrt5\approx 17.89$.`, String.raw`בדיקה בפיתגורס במשולש $CDB$: $8^2+16^2=320$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את שטח המרובע $ACBE$.`,
      hints: [String.raw`מה אפשר לומר על $DE$, בהתחשב בכך שהקוטר $AB$ מאונך למיתר $CE$?`, String.raw`$DE=CD=8$. המרובע מורכב מהמשולשים $ABC$ ו-$ABE$, שלשניהם הבסיס $AB$.`],
      check: { kind: 'numeric', answer: 160, verify: '(4+8^2/4)*(2*8)/2' },
      short: String.raw`$DE=CD=8$ (קוטר המאונך למיתר חוצה אותו), ולכן $S_{ACBE}=\dfrac{AB\cdot CD}{2}+\dfrac{AB\cdot DE}{2}=80+80=160$.`,
      full: [String.raw`הקוטר $AB$ מאונך למיתר $CE$, ולכן הוא חוצה אותו: $DE=CD=8$.`, String.raw`$S_{ABC}=\dfrac{AB\cdot CD}{2}=\dfrac{20\cdot 8}{2}=80$, ובאותו אופן $S_{ABE}=\dfrac{AB\cdot DE}{2}=80$.`, String.raw`$S_{ACBE}=80+80=160$. (במרובע שאלכסוניו מאונכים, השטח הוא מחצית מכפלת האלכסונים: $\dfrac{20\cdot 16}{2}=160$.)`],
    },
  ],
};

const e10: Exercise = {
  id: 'gpr-10',
  level: 3,
  topicId: T,
  subtopicIds: [RP, TQ],
  intro: String.raw`במלבן $ABCD$ העבירו את האלכסון $AC$. מהקודקוד $B$ הורידו אנך $BE$ לאלכסון, ומהקודקוד $D$ הורידו אנך $DF$ לאלכסון ($E$ ו-$F$ על $AC$), ראו שרטוט. נתון: $AE=8$, $EC=18$.`,
  diagram: { kind: 'geo', points: { A: [0, 14.4222], B: [0, 0], C: [21.6333, 0], D: [21.6333, 14.4222], E: [6.6564, 9.9846], F: [14.9769, 4.4376] }, polygons: [['A', 'B', 'C', 'D']], segments: [{ from: 'A', to: 'E', label: '8' }, ['E', 'C'], ['B', 'E'], ['D', 'F']], angles: [{ at: 'E', from: 'B', to: 'C', right: true }, { at: 'F', from: 'D', to: 'A', right: true }], labels: [{ at: 'E', text: 'E', dx: 9, dy: -12 }, { at: 'F', text: 'F', dx: -9, dy: 13 }], hideNames: ['E', 'F'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $BE$.`,
      hints: [String.raw`איזה משולש ישר זווית מכיל את $BE$ כגובה ליתר?`, String.raw`במשולש $ABC$ ($\angle ABC=90^\circ$) $BE$ הוא הגובה ליתר $AC$: $BE^2=AE\cdot EC$.`],
      check: { kind: 'numeric', answer: 12, verify: 'sqrt(8*18)' },
      short: String.raw`במשולש ישר הזווית $ABC$, $BE$ הוא הגובה ליתר: $BE^2=AE\cdot EC=8\cdot 18=144$, ולכן $BE=12$.`,
      full: [String.raw`זוויות המלבן ישרות, ולכן המשולש $ABC$ ישר זווית ($\angle ABC=90^\circ$) והיתר שלו הוא $AC$.`, String.raw`$BE\perp AC$, כלומר $BE$ הוא הגובה ליתר, ולכן $BE^2=AE\cdot EC$.`, String.raw`$BE^2=8\cdot 18=144\ \Rightarrow\ BE=12$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את שטח המלבן $ABCD$.`,
      hints: [String.raw`האלכסון מחלק את המלבן לשני משולשים חופפים.`, String.raw`$S_{ABC}=\dfrac{AC\cdot BE}{2}$, ושטח המלבן כפול.`],
      check: { kind: 'numeric', answer: 312, verify: '(8+18)*sqrt(8*18)' },
      short: String.raw`$AC=26$, $S_{ABC}=\dfrac{26\cdot 12}{2}=156$, ושטח המלבן $2\cdot 156=312$.`,
      full: [String.raw`$AC=AE+EC=8+18=26$.`, String.raw`$S_{ABC}=\dfrac{AC\cdot BE}{2}=\dfrac{26\cdot 12}{2}=156$.`, String.raw`האלכסון מחלק את המלבן לשני משולשים חופפים, ולכן $S_{ABCD}=2\cdot 156=312$.`, String.raw`בדיקה: $AB^2=AE\cdot AC=208$ ו-$BC^2=EC\cdot AC=468$, ואכן $AB\cdot BC=\sqrt{208\cdot 468}=312$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את אורך הקטע $EF$.`,
      hints: [String.raw`מצאו קודם את $CF$. גם המשולש $ADC$ ישר זווית, ו-$DF$ הוא הגובה ליתר שלו.`, String.raw`$CD^2=CF\cdot CA$ ו-$AB^2=AE\cdot AC$, ו-$AB=CD$. לכן $CF=AE$.`, String.raw`$EF=AC-AE-CF$.`],
      check: { kind: 'numeric', answer: 10, verify: '(8+18)-2*8' },
      short: String.raw`$CD=AB$, ולכן $CF\cdot CA=CD^2=AB^2=AE\cdot AC$, כלומר $CF=AE=8$ ו-$EF=26-8-8=10$.`,
      full: [String.raw`במשולש ישר הזווית $ABC$: $AB^2=AE\cdot AC$ (ניצב, היטלו והיתר).`, String.raw`במשולש ישר הזווית $ADC$ ($\angle ADC=90^\circ$), $DF$ הוא הגובה ליתר $AC$, ולכן $CD^2=CF\cdot CA$.`, String.raw`$AB=CD$ (צלעות נגדיות במלבן), ולכן $AE\cdot AC=CF\cdot AC$, כלומר $CF=AE=8$.`, String.raw`$EF=AC-AE-CF=26-8-8=10$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את שטח המרובע $BEDF$.`,
      hints: [String.raw`מה אפשר לומר על הקטעים $BE$ ו-$DF$? (כיוון ואורך.)`, String.raw`$BE\parallel DF$ (שניהם מאונכים ל-$AC$) ו-$BE=DF=12$, ולכן $BEDF$ מקבילית.`, String.raw`חלקו את המרובע לשני המשולשים ישרי הזווית $BEF$ ו-$DFE$.`],
      check: { kind: 'numeric', answer: 120, verify: '((8+18)-2*8)*sqrt(8*18)' },
      short: String.raw`$S_{BEF}=\dfrac{BE\cdot EF}{2}=60$ ו-$S_{DFE}=\dfrac{DF\cdot EF}{2}=60$, ולכן $S_{BEDF}=120$.`,
      full: [String.raw`$DF^2=AF\cdot FC=18\cdot 8=144$, ולכן $DF=12=BE$.`, String.raw`$BE$ ו-$DF$ מאונכים שניהם ל-$AC$, ולכן $BE\parallel DF$. מרובע שבו זוג צלעות נגדיות מקבילות ושוות הוא מקבילית, ולכן $BEDF$ מקבילית.`, String.raw`האלכסון $EF$ מחלק אותה לשני משולשים ישרי זווית: $S_{BEF}=\dfrac{BE\cdot EF}{2}=\dfrac{12\cdot 10}{2}=60$ ו-$S_{DFE}=\dfrac{DF\cdot EF}{2}=60$.`, String.raw`$S_{BEDF}=60+60=120$.`],
    },
  ],
};

const e11: Exercise = {
  id: 'gpr-11',
  level: 3,
  topicId: T,
  subtopicIds: [RP, SIM, AR],
  intro: String.raw`${INTRO} נתון: $BC=2\cdot AC$.`,
  diagram: altitudeTriangle(3, 12),
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו כי $\triangle ACD\sim\triangle CBD$, והסיקו ש-$CD=2\cdot AD$.`,
      hints: [String.raw`בשני המשולשים זווית ישרה ב-$D$; חפשו עוד זוג זוויות שוות.`, String.raw`$\angle A=\angle DCB$. יחס הדמיון הוא יחס היתרים של שני המשולשים, $\dfrac{AC}{CB}$.`],
      check: { kind: 'self' },
      short: String.raw`$\angle ADC=\angle CDB=90^\circ$ ו-$\angle A=\angle DCB$, ולכן $\triangle ACD\sim\triangle CBD$ (ז.ז.). מכאן $\dfrac{AD}{CD}=\dfrac{AC}{CB}=\dfrac12$, כלומר $CD=2\cdot AD$.`,
      full: [String.raw`$\angle ADC=\angle CDB=90^\circ$ (כי $CD$ גובה).`, String.raw`$\angle A+\angle ACD=90^\circ$ (במשולש $ACD$) ו-$\angle ACD+\angle DCB=90^\circ$ (נתון $\angle ACB=90^\circ$), ולכן $\angle A=\angle DCB$.`, String.raw`לכן $\triangle ACD\sim\triangle CBD$ (ז.ז.), עם ההתאמה $A\leftrightarrow C$, $C\leftrightarrow B$, $D\leftrightarrow D$.`, String.raw`מהדמיון: $\dfrac{AD}{CD}=\dfrac{CD}{BD}=\dfrac{AC}{CB}$, ומהנתון $\dfrac{AC}{CB}=\dfrac12$.`, String.raw`לכן $\dfrac{AD}{CD}=\dfrac12$, כלומר $CD=2\cdot AD$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את היחס בין שטח המשולש $ACD$ לשטח המשולש $CBD$.`,
      hints: [String.raw`המשולשים דומים. מה הקשר בין יחס הדמיון ליחס השטחים?`, String.raw`יחס השטחים של משולשים דומים שווה לריבוע יחס הדמיון.`],
      check: { kind: 'numeric', answer: 0.25, verify: '(1/2)^2' },
      short: String.raw`יחס הדמיון $\dfrac12$, ולכן יחס השטחים $\left(\dfrac12\right)^2=\dfrac14$.`,
      full: [String.raw`$\triangle ACD\sim\triangle CBD$ ויחס הדמיון הוא $\dfrac{AC}{CB}=\dfrac12$.`, String.raw`יחס השטחים של משולשים דומים שווה לריבוע יחס הדמיון: $\dfrac{S_{ACD}}{S_{CBD}}=\left(\dfrac12\right)^2=\dfrac14$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`נתון גם: $AB=15$. חשבו את $AD$.`,
      hints: [String.raw`הביעו את $DB$ בעזרת $AD$, בעזרת יחס הדמיון.`, String.raw`$CD=2\cdot AD$ ו-$DB=2\cdot CD=4\cdot AD$, ולכן $AB=5\cdot AD$.`],
      check: { kind: 'numeric', answer: 3, verify: '15/(1+2^2)' },
      short: String.raw`$CD=2AD$ ו-$DB=2CD=4AD$, ולכן $AB=5AD=15$ ו-$AD=3$.`,
      full: [String.raw`מהדמיון: $\dfrac{AD}{CD}=\dfrac{CD}{BD}=\dfrac12$, ולכן $CD=2\cdot AD$ ו-$BD=2\cdot CD=4\cdot AD$.`, String.raw`$AB=AD+DB=5\cdot AD=15\ \Rightarrow\ AD=3$ (ו-$DB=12$).`, String.raw`דרך אחרת: למשולשים $ACD$ ו-$CBD$ גובה משותף $CD$, ולכן $\dfrac{AD}{DB}=\dfrac{S_{ACD}}{S_{CBD}}=\dfrac14$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את שטח המשולש $ABC$.`,
      hints: [String.raw`מצאו את הגובה $CD$.`, String.raw`$CD=2\cdot AD=6$, ו-$S=\dfrac{AB\cdot CD}{2}$.`],
      check: { kind: 'numeric', answer: 45, verify: '15*(2*15/(1+2^2))/2' },
      short: String.raw`$CD=2\cdot 3=6$, ולכן $S_{ABC}=\dfrac{15\cdot 6}{2}=45$.`,
      full: [String.raw`$CD=2\cdot AD=6$ (בדיקה: $CD^2=AD\cdot DB=3\cdot 12=36$).`, String.raw`$S_{ABC}=\dfrac{AB\cdot CD}{2}=\dfrac{15\cdot 6}{2}=45$.`],
    },
  ],
};

const e12Points = { A: [0, 0], B: [25, 0], C: [9, 12], D: [9, 0], E: [3.24, 4.32], F: [14.76, 7.68] } satisfies Record<string, [number, number]>;

const e12: Exercise = {
  id: 'gpr-12',
  level: 3,
  topicId: T,
  subtopicIds: [RP, CA, SIM, AR],
  intro: String.raw`במשולש ישר זווית $ABC$ ($\angle ACB=90^\circ$), $CD$ הוא הגובה ליתר $AB$. מעגל שקוטרו $CD$ חותך את הניצב $AC$ בנקודה $E$ ואת הניצב $BC$ בנקודה $F$ (ראו שרטוט). נתון: $AD=9$, $DB=16$.`,
  diagram: { kind: 'geo', points: e12Points, circles: [{ center: [9, 6], radius: 6 }], polygons: [['A', 'B', 'C']], segments: [['C', 'D'], ['E', 'F'], { from: 'A', to: 'D', label: '9' }, { from: 'D', to: 'B', label: '16' }], angles: [{ at: 'D', from: 'C', to: 'B', right: true }] },
  solutionDiagram: { kind: 'geo', points: e12Points, circles: [{ center: [9, 6], radius: 6 }], polygons: [['A', 'B', 'C']], segments: [['C', 'D'], ['E', 'F'], { from: 'D', to: 'E', dashed: true, accent: true }, { from: 'D', to: 'F', dashed: true, accent: true }], angles: [{ at: 'E', from: 'D', to: 'C', right: true }, { at: 'F', from: 'D', to: 'C', right: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $CD$.`,
      hints: [String.raw`$CD$ הוא הגובה ליתר, ונתונים שני ההיטלים.`, String.raw`$CD^2=AD\cdot DB$.`],
      check: { kind: 'numeric', answer: 12, verify: 'sqrt(9*16)' },
      short: String.raw`$CD^2=AD\cdot DB=9\cdot 16=144$, ולכן $CD=12$.`,
      full: [String.raw`הגובה ליתר הוא הממוצע ההנדסי של היטלי הניצבים: $CD^2=AD\cdot DB$.`, String.raw`$CD^2=9\cdot 16=144\ \Rightarrow\ CD=12$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את $CE$.`,
      hints: [String.raw`חברו את $D$ עם $E$. על מה נשענת הזווית $CED$?`, String.raw`$\angle CED=90^\circ$ (נשענת על הקוטר $CD$), ולכן $DE$ הוא הגובה ליתר $AC$ במשולש ישר הזווית $ADC$.`, String.raw`במשולש $ADC$: $CD^2=CE\cdot CA$. את $CA$ מוצאים מ-$CA^2=AD\cdot AB$.`],
      check: { kind: 'numeric', answer: 9.6, verify: '(9*16)/sqrt(9*(9+16))' },
      short: String.raw`$AC=15$; $\angle CED=90^\circ$, ולכן במשולש $ADC$: $CD^2=CE\cdot CA$, כלומר $CE=\dfrac{144}{15}=9.6$.`,
      full: [String.raw`$AC^2=AD\cdot AB=9\cdot 25=225$, ולכן $AC=15$.`, String.raw`$\angle CED$ היא זווית היקפית הנשענת על הקוטר $CD$, ולכן $\angle CED=90^\circ$, כלומר $DE\perp AC$.`, String.raw`המשולש $ADC$ ישר זווית ($\angle ADC=90^\circ$), היתר שלו $AC$, ו-$DE$ הוא הגובה ליתר. ההיטל של הניצב $CD$ על היתר הוא $CE$, ולכן $CD^2=CE\cdot CA$.`, String.raw`$144=CE\cdot 15\ \Rightarrow\ CE=9.6$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`הוכיחו כי $\triangle CEF\sim\triangle CBA$.`,
      hints: [String.raw`חזרו על הרעיון של סעיף ב עבור הנקודה $F$ והמשולש $CDB$.`, String.raw`$CD^2=CE\cdot CA$ וגם $CD^2=CF\cdot CB$. מה נובע מכך על היחסים $\dfrac{CE}{CB}$ ו-$\dfrac{CF}{CA}$?`],
      check: { kind: 'self' },
      short: String.raw`$CE\cdot CA=CD^2=CF\cdot CB$, ולכן $\dfrac{CE}{CB}=\dfrac{CF}{CA}$; הזווית $C$ משותפת, ולכן $\triangle CEF\sim\triangle CBA$ (צ.ז.צ.).`,
      full: [String.raw`$\angle CFD=90^\circ$ (זווית היקפית הנשענת על הקוטר $CD$), ולכן $DF$ הוא הגובה ליתר $BC$ במשולש ישר הזווית $CDB$, ו-$CD^2=CF\cdot CB$.`, String.raw`בסעיף ב ראינו ש-$CD^2=CE\cdot CA$. לכן $CE\cdot CA=CF\cdot CB$, כלומר $\dfrac{CE}{CB}=\dfrac{CF}{CA}$.`, String.raw`$\angle ECF=\angle BCA$ (אותה זווית), והיא כלואה בין הצלעות האלה.`, String.raw`לכן $\triangle CEF\sim\triangle CBA$ לפי משפט הדמיון צ.ז.צ. (במספרים: $BC=20$, $CF=\dfrac{144}{20}=7.2$, ו-$\dfrac{9.6}{20}=\dfrac{7.2}{15}=0.48$.)`],
    },
    {
      label: 'ד',
      prompt: String.raw`מצאו את היחס בין שטח המשולש $CEF$ לשטח המשולש $CBA$ (אפשר לענות כשבר).`,
      hints: [String.raw`מהו יחס הדמיון בין המשולשים?`, String.raw`יחס הדמיון הוא $\dfrac{CE}{CB}$, ויחס השטחים הוא ריבוע יחס הדמיון. $BC^2=DB\cdot AB$.`],
      check: { kind: 'numeric', answer: 0.2304, verify: '(((9*16)/sqrt(9*(9+16)))/sqrt(16*(9+16)))^2' },
      short: String.raw`$BC=20$, יחס הדמיון $\dfrac{CE}{CB}=\dfrac{9.6}{20}=0.48$, ולכן יחס השטחים $0.48^2=0.2304=\dfrac{144}{625}$.`,
      full: [String.raw`$BC^2=DB\cdot AB=16\cdot 25=400$, ולכן $BC=20$.`, String.raw`יחס הדמיון: $\dfrac{CE}{CB}=\dfrac{9.6}{20}=0.48=\dfrac{12}{25}$.`, String.raw`יחס השטחים של משולשים דומים שווה לריבוע יחס הדמיון: $\dfrac{S_{CEF}}{S_{CBA}}=0.48^2=0.2304=\dfrac{144}{625}$.`, String.raw`בדיקה: $S_{CBA}=\dfrac{15\cdot 20}{2}=150$ ו-$S_{CEF}=\dfrac{9.6\cdot 7.2}{2}=34.56$, ואכן $\dfrac{34.56}{150}=0.2304$.`],
    },
  ],
};

export const geoProportionalRightTriangle: ExerciseSet = {
  id: 'geo-proportional-right-triangle',
  questionnaire: '35581',
  title: 'קטעים פרופורציוניים במשולש ישר זווית',
  topicIds: ['euclidean-geometry'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
