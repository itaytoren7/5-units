import type { Exercise, ExerciseSet } from './types';

/**
 * סט: קטעים פרופורציוניים במעגל (שאלון 35581, שאלה 4 – גאומטריה).
 * 1–4 צעד אחד · 5–8 שניים-שלושה סעיפים · 9–12 שאלות בסגנון בגרות.
 * השרטוטים מחושבים: הנקודות נמצאות על המעגל, המשיק מאונך לרדיוס, והאורכים תואמים את הנתונים.
 */

const T = 'euclidean-geometry';
const CP = 'geo-circle-proportions';
const CA = 'geo-circle-angles';
const CT = 'geo-circle-tangents';
const SIM = 'geo-bisector-similarity';
const TQ = 'geo-triangles-quadrilaterals';

const e1: Exercise = {
  id: 'gpc-1',
  level: 1,
  topicId: T,
  subtopicIds: [CP],
  intro: String.raw`במעגל נתונים שני מיתרים, $AB$ ו-$CD$, הנחתכים בנקודה $P$ שבתוך המעגל (ראו שרטוט). נתון: $PA=3$, $PB=8$, $PC=4$.`,
  diagram: { kind: 'geo', points: { P: [0, 0], A: [-3, 0], B: [8, 0], C: [1.6905, 3.6252], D: [-2.5357, -5.4378] }, circles: [{ center: [2.5, -2.2691], radius: 5.9497 }], segments: [{ from: 'P', to: 'A', label: '3' }, { from: 'P', to: 'B', label: '8' }, { from: 'P', to: 'C', label: '4' }, ['P', 'D']], dots: ['P'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הקטע $PD$.`,
      hints: [String.raw`כששני מיתרים נחתכים בתוך מעגל, יש קשר בין ארבעת הקטעים שנקודת החיתוך יוצרת עליהם.`, String.raw`מכפלת קטעי המיתר האחד שווה למכפלת קטעי המיתר האחר: $PA\cdot PB=PC\cdot PD$.`],
      check: { kind: 'numeric', answer: 6, verify: '3*8/4' },
      short: String.raw`לפי משפט המיתרים הנחתכים $PA\cdot PB=PC\cdot PD$: $3\cdot 8=4\cdot PD$, ולכן $PD=6$.`,
      full: [String.raw`משפט: אם שני מיתרים במעגל נחתכים, אז מכפלת קטעי המיתר האחד שווה למכפלת קטעי המיתר האחר.`, String.raw`הנקודה $P$ מחלקת את $AB$ לקטעים $PA,\ PB$ ואת $CD$ לקטעים $PC,\ PD$, ולכן $PA\cdot PB=PC\cdot PD$.`, String.raw`$3\cdot 8=4\cdot PD\ \Rightarrow\ PD=\dfrac{24}{4}=6$.`],
    },
  ],
};

const e2: Exercise = {
  id: 'gpc-2',
  level: 1,
  topicId: T,
  subtopicIds: [CP],
  intro: String.raw`מנקודה $P$ שמחוץ למעגל יוצאים שני חותכים. האחד חותך את המעגל בנקודות $A$ ו-$B$, והאחר בנקודות $C$ ו-$D$ (ראו שרטוט). נתון: $PA=2$, $AB=10$, $PC=3$.`,
  diagram: { kind: 'geo', points: { P: [0, 0], A: [1.8271, 0.8135], B: [10.9625, 4.8808], C: [2.7406, -1.2202], D: [7.3084, -3.2539] }, circles: [{ center: [6.8415, 1.8439], radius: 5.1192 }], segments: [['P', 'A'], { from: 'A', to: 'B', label: '10' }, { from: 'P', to: 'C', label: '3' }, ['C', 'D']], labels: [{ at: [0.9136, 0.4068], text: '2', dx: -12, dy: -10 }], dots: ['P'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הקטע $PD$.`,
      hints: [String.raw`במשפט על שני חותכים מופיעים רק קטעים שמתחילים בנקודה $P$: החותך כולו וחלקו החיצוני.`, String.raw`$PA\cdot PB=PC\cdot PD$, כאשר $PB=PA+AB$.`],
      check: { kind: 'numeric', answer: 8, verify: '2*(2+10)/3' },
      short: String.raw`$PB=2+10=12$, ולפי משפט שני החותכים $PA\cdot PB=PC\cdot PD$: $2\cdot 12=3\cdot PD$, ולכן $PD=8$.`,
      full: [String.raw`משפט: אם מנקודה שמחוץ למעגל יוצאים שני חותכים, אז מכפלת חותך אחד בחלקו החיצוני שווה למכפלת החותך האחר בחלקו החיצוני.`, String.raw`החותך הראשון הוא $PB$ וחלקו החיצוני $PA$; החותך השני הוא $PD$ וחלקו החיצוני $PC$. לכן $PA\cdot PB=PC\cdot PD$.`, String.raw`$PB=PA+AB=2+10=12$.`, String.raw`$2\cdot 12=3\cdot PD\ \Rightarrow\ PD=8$. שימו לב: במכפלה מופיע החותך כולו ($PB=12$), ולא המיתר $AB=10$.`],
    },
  ],
};

const e3: Exercise = {
  id: 'gpc-3',
  level: 1,
  topicId: T,
  subtopicIds: [CP, CT],
  intro: String.raw`מנקודה $P$ שמחוץ למעגל יוצאים משיק $PT$ ($T$ נקודת ההשקה) וחותך, החותך את המעגל בנקודות $A$ ו-$B$ (ראו שרטוט). נתון: $PA=3$, $AB=9$.`,
  diagram: { kind: 'geo', points: { P: [0, 0], T: [5.2977, 2.8168], A: [2.9344, -0.6237], B: [11.7378, -2.4949] }, circles: [{ center: [7.4185, -1.1718], radius: 4.5174 }], segments: [['P', 'T'], { from: 'P', to: 'A', label: '3' }, { from: 'A', to: 'B', label: '9' }], dots: ['P', 'T'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך המשיק $PT$.`,
      hints: [String.raw`יש משפט שקושר בין משיק לבין חותך היוצאים מאותה נקודה.`, String.raw`$PT^2=PA\cdot PB$, כאשר $PB=PA+AB$.`],
      check: { kind: 'numeric', answer: 6, verify: 'sqrt(3*(3+9))' },
      short: String.raw`$PB=3+9=12$, ולפי משפט המשיק והחותך $PT^2=PA\cdot PB=3\cdot 12=36$, ולכן $PT=6$.`,
      full: [String.raw`משפט: אם מנקודה שמחוץ למעגל יוצאים משיק וחותך, אז ריבוע המשיק שווה למכפלת החותך בחלקו החיצוני: $PT^2=PA\cdot PB$.`, String.raw`$PB=PA+AB=3+9=12$.`, String.raw`$PT^2=3\cdot 12=36\ \Rightarrow\ PT=6$.`],
    },
  ],
};

const e4: Exercise = {
  id: 'gpc-4',
  level: 1,
  topicId: T,
  subtopicIds: [CP],
  intro: String.raw`מנקודה $P$ שמחוץ למעגל יוצאים שני חותכים. האחד חותך את המעגל בנקודות $A$ ו-$B$ ($A$ קרובה יותר ל-$P$), והאחר בנקודות $C$ ו-$D$ ($C$ קרובה יותר ל-$P$), ראו שרטוט.`,
  diagram: { kind: 'geo', points: { P: [0, 0], A: [2.7816, 1.1238], B: [9.2718, 3.7461], C: [3.7588, -1.3681], D: [7.0477, -2.5652] }, circles: [{ center: [6.5415, 1.1608], radius: 3.7601 }], segments: [['P', 'B'], ['P', 'D']], dots: ['P'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזה מהשוויונות הבאים מתקיים בהכרח?`,
      hints: [String.raw`בכל צד של השוויון הנכון מופיעים שני קטעים שמתחילים ב-$P$ ונמצאים על אותו חותך.`, String.raw`המשפט: מכפלת חותך אחד בחלקו החיצוני שווה למכפלת החותך האחר בחלקו החיצוני.`],
      check: { kind: 'choice', options: [String.raw`$PA\cdot AB=PC\cdot CD$`, String.raw`$PA\cdot PB=PC\cdot PD$`, String.raw`$PA\cdot PD=PC\cdot PB$`, String.raw`$PA+PB=PC+PD$`], correct: 1 },
      short: String.raw`לפי משפט שני החותכים, מכפלת חותך בחלקו החיצוני שווה בשני החותכים: $PA\cdot PB=PC\cdot PD$.`,
      full: [String.raw`משפט שני החותכים: מכפלת חותך אחד בחלקו החיצוני שווה למכפלת החותך האחר בחלקו החיצוני.`, String.raw`החותך האחד הוא $PB$ וחלקו החיצוני $PA$; החותך האחר הוא $PD$ וחלקו החיצוני $PC$. לכן $PA\cdot PB=PC\cdot PD$.`, String.raw`השוויונות האחרים אינם נכונים בדרך כלל. דוגמה: $PA=2,\ PB=12,\ PC=3,\ PD=8$ (אכן $2\cdot 12=3\cdot 8$). כאן $PA\cdot AB=2\cdot 10=20$ אבל $PC\cdot CD=3\cdot 5=15$; $PA\cdot PD=16$ אבל $PC\cdot PB=36$; $PA+PB=14$ אבל $PC+PD=11$.`],
    },
  ],
};

const e5: Exercise = {
  id: 'gpc-5',
  level: 2,
  topicId: T,
  subtopicIds: [CP, CA],
  intro: String.raw`במעגל שמרכזו $O$ נתונים שני מיתרים, $AB$ ו-$CD$, הנחתכים בנקודה $P$. דרך $P$ עובר מיתר נוסף, $EF$ (ראו שרטוט). נתון: $PA=3$, $PB=12$, $CD=13$, ו-$PC<PD$.`,
  diagram: { kind: 'geo', points: { O: [6, 0], P: [0, 0], A: [-2.25, -1.9843], B: [9, 7.9373], C: [-1.6667, 3.6362], D: [3.75, -8.1815], E: [0, 6], F: [0, -6] }, circles: [{ center: 'O', radius: 8.4853 }], segments: [['P', 'A'], { from: 'P', to: 'B', label: '12' }, ['C', 'D'], ['E', 'F']], labels: [{ at: 'P', text: 'P', dx: 15, dy: 3 }, { at: [-1.125, -0.9922], text: '3', dx: -9, dy: -7 }], hideNames: ['P'], dots: ['O', 'P'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הקטע $PC$.`,
      hints: [String.raw`סמנו $PC=x$. כמה הוא $PD$?`, String.raw`$PD=13-x$, ולפי משפט המיתרים הנחתכים: $x(13-x)=3\cdot 12$.`, String.raw`פתרו את המשוואה $x^2-13x+36=0$ ובחרו את הפתרון שמתאים לתנאי $PC<PD$.`],
      check: { kind: 'numeric', answer: 4, verify: '(13-sqrt(13^2-4*3*12))/2' },
      short: String.raw`$PC=x$, $PD=13-x$: $x(13-x)=3\cdot 12$, כלומר $x^2-13x+36=0$, $x=4$ או $x=9$. מכיוון ש-$PC<PD$: $PC=4$.`,
      full: [String.raw`נסמן $PC=x$. מכיוון ש-$CD=13$, מתקיים $PD=13-x$.`, String.raw`משפט המיתרים הנחתכים: $PC\cdot PD=PA\cdot PB$, כלומר $x(13-x)=3\cdot 12=36$.`, String.raw`$x^2-13x+36=0\ \Rightarrow\ (x-4)(x-9)=0\ \Rightarrow\ x=4$ או $x=9$.`, String.raw`שני הפתרונות נותנים את אותו זוג קטעים, $4$ ו-$9$. לפי הנתון $PC<PD$, ולכן $PC=4$ (ו-$PD=9$).`],
    },
    {
      label: 'ב',
      prompt: String.raw`נתון כי $P$ היא אמצע המיתר $EF$. חשבו את אורך המיתר $EF$.`,
      hints: [String.raw`סמנו $PE=PF=y$ והשתמשו שוב במשפט המיתרים הנחתכים, הפעם עם המיתרים $AB$ ו-$EF$.`, String.raw`$y^2=PA\cdot PB$.`],
      check: { kind: 'numeric', answer: 12, verify: '2*sqrt(3*12)' },
      short: String.raw`$PE=PF=y$ ו-$y^2=PA\cdot PB=36$, לכן $y=6$ ו-$EF=12$.`,
      full: [String.raw`$P$ אמצע $EF$, ולכן נסמן $PE=PF=y$.`, String.raw`משפט המיתרים הנחתכים עבור $AB$ ו-$EF$: $PE\cdot PF=PA\cdot PB$, כלומר $y^2=36$.`, String.raw`$y=6$, ולכן $EF=2y=12$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`מבין כל המיתרים העוברים דרך הנקודה $P$, המיתר $EF$ (ש-$P$ היא אמצעו) הוא:`,
      hints: [String.raw`המיתר הארוך ביותר דרך $P$ הוא הקוטר. מה מיוחד במיתר $EF$ ביחס למרכז $O$?`, String.raw`הקטע $OP$ מחבר את מרכז המעגל עם אמצע המיתר $EF$, ולכן $OP\perp EF$. השוו את מרחקו של $EF$ מהמרכז למרחקם של מיתרים אחרים דרך $P$.`],
      check: { kind: 'choice', options: [String.raw`הקצר ביותר`, String.raw`הארוך ביותר`, String.raw`לא הקצר ביותר ולא הארוך ביותר`], correct: 0 },
      short: String.raw`$OP\perp EF$, ולכן $EF$ הוא המיתר הרחוק ביותר מהמרכז מבין המיתרים דרך $P$, כלומר הקצר ביותר.`,
      full: [String.raw`קטע המחבר את מרכז המעגל עם אמצע מיתר מאונך למיתר, ולכן $OP\perp EF$, ומרחק המיתר $EF$ מהמרכז הוא $OP$.`, String.raw`לכל מיתר אחר העובר דרך $P$, המרחק מהמרכז הוא אורך האנך מ-$O$ למיתר. אנך זה הוא ניצב במשולש ישר זווית שהיתר שלו הוא $OP$, ולכן הוא קצר מ-$OP$.`, String.raw`במעגל, מיתר רחוק יותר מהמרכז הוא קצר יותר. לכן $EF$ הוא המיתר הקצר ביותר דרך $P$.`, String.raw`בדיקה במספרים: $EF=12$, ואילו $CD=13$ ו-$AB=15$. אפשר לראות זאת גם אלגברית: אם קטעי המיתר הם $x$ ו-$y$ אז $xy=36$, ו-$(x+y)^2=(x-y)^2+4xy\ge 144$, כלומר $x+y\ge 12$.`],
    },
  ],
};

const e6Points = { P: [0, 0], A: [4.2042, 2.7064], B: [16.8168, 10.8256], C: [3.9015, -0.8822], D: [24.3844, -5.5138], T: [6.7267, -7.3994] } satisfies Record<string, [number, number]>;

const e6: Exercise = {
  id: 'gpc-6',
  level: 2,
  topicId: T,
  subtopicIds: [CP, CA, SIM, CT],
  intro: String.raw`מנקודה $P$ שמחוץ למעגל יוצאים שני חותכים: החותך $PAB$ ($A$ בין $P$ ל-$B$) והחותך $PCD$ ($C$ בין $P$ ל-$D$). מ-$P$ יוצא גם משיק למעגל, $PT$ ($T$ נקודת ההשקה), ראו שרטוט.`,
  diagram: { kind: 'geo', points: e6Points, circles: [{ center: [14.8661, 0], radius: 11 }], segments: [{ from: 'P', to: 'A', label: '5' }, { from: 'A', to: 'B', label: '15' }, ['P', 'C'], { from: 'C', to: 'D', label: '21' }, ['P', 'T']], dots: ['P', 'T'] },
  solutionDiagram: { kind: 'geo', points: e6Points, circles: [{ center: [14.8661, 0], radius: 11 }], segments: [['P', 'B'], ['P', 'D'], ['P', 'T'], { from: 'A', to: 'D', dashed: true, accent: true }, { from: 'B', to: 'C', dashed: true, accent: true }], angles: [{ at: 'D', from: 'P', to: 'A' }, { at: 'B', from: 'P', to: 'C' }], dots: ['P', 'T'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו כי $\triangle PAD\sim\triangle PCB$, והסיקו מכך ש-$PA\cdot PB=PC\cdot PD$.`,
      hints: [String.raw`חברו את $A$ עם $D$ ואת $B$ עם $C$. חפשו זווית משותפת לשני המשולשים, וזוג זוויות היקפיות שנשענות על אותה קשת.`, String.raw`$\angle PDA$ ו-$\angle PBC$ הן זוויות היקפיות הנשענות על הקשת $AC$.`],
      check: { kind: 'self' },
      short: String.raw`$\angle P$ משותפת ו-$\angle PDA=\angle PBC$ (היקפיות על הקשת $AC$), ולכן $\triangle PAD\sim\triangle PCB$ (ז.ז.). מכאן $\dfrac{PA}{PC}=\dfrac{PD}{PB}$, כלומר $PA\cdot PB=PC\cdot PD$.`,
      full: [String.raw`נחבר את $A$ עם $D$ ואת $B$ עם $C$, ונתבונן במשולשים $PAD$ ו-$PCB$.`, String.raw`$\angle P$ משותפת לשני המשולשים.`, String.raw`$\angle PDA=\angle PBC$: שתיהן זוויות היקפיות הנשענות על אותה קשת $AC$, וזוויות היקפיות הנשענות על אותה קשת שוות זו לזו.`, String.raw`לכן $\triangle PAD\sim\triangle PCB$ לפי משפט הדמיון ז.ז.`, String.raw`מהדמיון: $\dfrac{PA}{PC}=\dfrac{PD}{PB}$, ובכפל בהצלבה $PA\cdot PB=PC\cdot PD$. זהו משפט שני החותכים.`],
    },
    {
      label: 'ב',
      prompt: String.raw`נתון: $PA=5$, $AB=15$, $CD=21$. חשבו את אורך הקטע $PC$.`,
      hints: [String.raw`סמנו $PC=x$. אז $PD=x+21$.`, String.raw`$PC\cdot PD=PA\cdot PB$: $x(x+21)=5\cdot 20$.`, String.raw`$x^2+21x-100=0$; רק הפתרון החיובי מתאים לאורך של קטע.`],
      check: { kind: 'numeric', answer: 4, verify: '(-21+sqrt(21^2+4*5*(5+15)))/2' },
      short: String.raw`$PB=20$; $x(x+21)=5\cdot 20$, כלומר $x^2+21x-100=0$, ולכן $PC=x=4$ (הפתרון $x=-25$ נפסל).`,
      full: [String.raw`$PB=PA+AB=5+15=20$.`, String.raw`נסמן $PC=x$, ואז $PD=PC+CD=x+21$.`, String.raw`משפט שני החותכים: $PC\cdot PD=PA\cdot PB$, כלומר $x(x+21)=100$.`, String.raw`$x^2+21x-100=0\ \Rightarrow\ (x-4)(x+25)=0\ \Rightarrow\ x=4$ או $x=-25$.`, String.raw`אורך קטע חיובי, ולכן $PC=4$ (ו-$PD=25$; בדיקה: $4\cdot 25=100$).`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את אורך המשיק $PT$.`,
      hints: [String.raw`השתמשו במשפט על משיק וחותך היוצאים מאותה נקודה.`, String.raw`$PT^2=PA\cdot PB$.`],
      check: { kind: 'numeric', answer: 10, verify: 'sqrt(5*(5+15))' },
      short: String.raw`$PT^2=PA\cdot PB=5\cdot 20=100$, ולכן $PT=10$.`,
      full: [String.raw`משפט המשיק והחותך: $PT^2=PA\cdot PB$.`, String.raw`$PT^2=5\cdot 20=100\ \Rightarrow\ PT=10$.`, String.raw`אפשר להשתמש גם בחותך האחר: $PT^2=PC\cdot PD=4\cdot 25=100$.`],
    },
  ],
};

const e7: Exercise = {
  id: 'gpc-7',
  level: 2,
  topicId: T,
  subtopicIds: [CP, CA, SIM],
  intro: String.raw`במעגל נתונים שני מיתרים, $AB$ ו-$CD$, הנחתכים בנקודה $P$. מחברים את $A$ עם $C$ ואת $B$ עם $D$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { P: [0, 0], A: [-6, 0], B: [4, 0], C: [-2.0625, 2.1786], D: [5.5, -5.8095] }, circles: [{ center: [-1, -4.3894], radius: 6.6533 }], segments: [{ from: 'P', to: 'A', label: '6' }, { from: 'P', to: 'B', label: '4' }, { from: 'P', to: 'C', label: '3' }, ['P', 'D'], { from: 'A', to: 'C', label: '4.5' }, ['B', 'D']], labels: [{ at: 'P', text: 'P', dx: -2, dy: 15 }], hideNames: ['P'], dots: ['P'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו כי $\triangle PAC\sim\triangle PDB$, והסיקו מכך ש-$PA\cdot PB=PC\cdot PD$.`,
      hints: [String.raw`אילו זוויות נוצרות בנקודת החיתוך $P$? ואילו זוויות היקפיות נשענות על אותה קשת?`, String.raw`$\angle PAC$ ו-$\angle PDB$ הן זוויות היקפיות הנשענות על הקשת $BC$.`],
      check: { kind: 'self' },
      short: String.raw`$\angle APC=\angle DPB$ (קודקודיות) ו-$\angle PAC=\angle PDB$ (היקפיות על הקשת $BC$), ולכן $\triangle PAC\sim\triangle PDB$ (ז.ז.). מכאן $\dfrac{PA}{PD}=\dfrac{PC}{PB}$, כלומר $PA\cdot PB=PC\cdot PD$.`,
      full: [String.raw`$\angle APC=\angle DPB$ (זוויות קודקודיות).`, String.raw`$\angle PAC=\angle PDB$: אלה הזוויות $\angle BAC$ ו-$\angle BDC$, זוויות היקפיות הנשענות על אותה קשת $BC$.`, String.raw`לכן $\triangle PAC\sim\triangle PDB$ לפי משפט הדמיון ז.ז.`, String.raw`מהדמיון: $\dfrac{PA}{PD}=\dfrac{PC}{PB}=\dfrac{AC}{DB}$.`, String.raw`מהשוויון $\dfrac{PA}{PD}=\dfrac{PC}{PB}$ נקבל בכפל בהצלבה $PA\cdot PB=PC\cdot PD$. זהו משפט המיתרים הנחתכים.`],
    },
    {
      label: 'ב',
      prompt: String.raw`נתון: $PA=6$, $PB=4$, $PC=3$. חשבו את $PD$.`,
      hints: [String.raw`השתמשו בשוויון שהוכחתם בסעיף א.`, String.raw`$6\cdot 4=3\cdot PD$.`],
      check: { kind: 'numeric', answer: 8, verify: '6*4/3' },
      short: String.raw`$PA\cdot PB=PC\cdot PD$: $6\cdot 4=3\cdot PD$, ולכן $PD=8$.`,
      full: [String.raw`$PA\cdot PB=PC\cdot PD$.`, String.raw`$6\cdot 4=3\cdot PD\ \Rightarrow\ PD=8$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`נתון גם: $AC=4.5$. חשבו את אורך המיתר $BD$.`,
      hints: [String.raw`השתמשו ביחס הדמיון של המשולשים מסעיף א. שימו לב אילו צלעות מתאימות זו לזו.`, String.raw`$\dfrac{AC}{DB}=\dfrac{PA}{PD}$.`],
      check: { kind: 'numeric', answer: 6, verify: '4.5*(6*4/3)/6' },
      short: String.raw`$\dfrac{AC}{DB}=\dfrac{PA}{PD}=\dfrac68$, ולכן $DB=\dfrac{4.5\cdot 8}{6}=6$.`,
      full: [String.raw`ב-$\triangle PAC\sim\triangle PDB$ הצלע $AC$ מתאימה לצלע $DB$, והצלע $PA$ מתאימה לצלע $PD$.`, String.raw`$\dfrac{AC}{DB}=\dfrac{PA}{PD}=\dfrac{6}{8}=\dfrac34$.`, String.raw`$DB=\dfrac{4.5\cdot 4}{3}=6$.`],
    },
  ],
};

const e8: Exercise = {
  id: 'gpc-8',
  level: 2,
  topicId: T,
  subtopicIds: [CP, CT, CA, SIM],
  intro: String.raw`מנקודה $P$ שמחוץ למעגל יוצאים משיק $PT$ ($T$ נקודת ההשקה) וחותך $PAB$ ($A$ בין $P$ ל-$B$). מחברים את $T$ עם $A$ ועם $B$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { P: [0, 0], T: [5.375, 2.6663], A: [4, 0], B: [9, 0] }, circles: [{ center: [6.5, 0.3985], radius: 2.5316 }], segments: [['P', 'T'], { from: 'P', to: 'A', label: '4' }, { from: 'A', to: 'B', label: '5' }, ['T', 'A'], ['T', 'B']], labels: [{ at: [4.6875, 1.3332], text: '3', dx: 12 }], dots: ['P'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו כי $\triangle PTA\sim\triangle PBT$, והסיקו מכך ש-$PT^2=PA\cdot PB$.`,
      hints: [String.raw`לשני המשולשים זווית משותפת. לזוג הזוויות השני: איזה משפט עוסק בזווית שבין משיק למיתר?`, String.raw`זווית בין משיק למיתר שווה לזווית ההיקפית הנשענת על המיתר מצידו האחר: $\angle PTA=\angle TBA$.`],
      check: { kind: 'self' },
      short: String.raw`$\angle P$ משותפת ו-$\angle PTA=\angle PBT$ (זווית בין משיק למיתר), ולכן $\triangle PTA\sim\triangle PBT$ (ז.ז.). מכאן $\dfrac{PT}{PB}=\dfrac{PA}{PT}$, כלומר $PT^2=PA\cdot PB$.`,
      full: [String.raw`$\angle P$ משותפת למשולשים $PTA$ ו-$PBT$.`, String.raw`$\angle PTA$ היא זווית בין המשיק $PT$ למיתר $TA$. זווית בין משיק למיתר שווה לזווית ההיקפית הנשענת על המיתר מצידו האחר, ולכן $\angle PTA=\angle TBA=\angle PBT$.`, String.raw`לכן $\triangle PTA\sim\triangle PBT$ לפי משפט הדמיון ז.ז.`, String.raw`מהדמיון: $\dfrac{PT}{PB}=\dfrac{PA}{PT}=\dfrac{TA}{BT}$.`, String.raw`מהשוויון $\dfrac{PT}{PB}=\dfrac{PA}{PT}$ נקבל $PT^2=PA\cdot PB$. זהו משפט המשיק והחותך.`],
    },
    {
      label: 'ב',
      prompt: String.raw`נתון: $PA=4$, $AB=5$. חשבו את $PT$.`,
      hints: [String.raw`$PB=PA+AB$.`, String.raw`$PT^2=PA\cdot PB=4\cdot 9$.`],
      check: { kind: 'numeric', answer: 6, verify: 'sqrt(4*(4+5))' },
      short: String.raw`$PB=9$ ו-$PT^2=4\cdot 9=36$, ולכן $PT=6$.`,
      full: [String.raw`$PB=PA+AB=4+5=9$.`, String.raw`$PT^2=PA\cdot PB=4\cdot 9=36\ \Rightarrow\ PT=6$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`נתון גם: $TA=3$. חשבו את אורך המיתר $TB$.`,
      hints: [String.raw`השתמשו ביחס הדמיון מסעיף א.`, String.raw`$\dfrac{TA}{BT}=\dfrac{PT}{PB}$.`],
      check: { kind: 'numeric', answer: 4.5, verify: '3*(4+5)/sqrt(4*(4+5))' },
      short: String.raw`$\dfrac{TA}{BT}=\dfrac{PT}{PB}=\dfrac69$, ולכן $BT=\dfrac{3\cdot 9}{6}=4.5$.`,
      full: [String.raw`ב-$\triangle PTA\sim\triangle PBT$ הצלע $TA$ מתאימה לצלע $BT$, והצלע $PT$ מתאימה לצלע $PB$.`, String.raw`$\dfrac{TA}{BT}=\dfrac{PT}{PB}=\dfrac{6}{9}=\dfrac23$.`, String.raw`$BT=\dfrac{3\cdot 3}{2}=4.5$.`],
    },
  ],
};

const e9: Exercise = {
  id: 'gpc-9',
  level: 3,
  topicId: T,
  subtopicIds: [CP, CA, TQ],
  intro: String.raw`$AB$ הוא קוטר במעגל שמרכזו $O$. המיתר $CD$ מאונך לקוטר $AB$ וחותך אותו בנקודה $P$. דרך $P$ עובר מיתר נוסף, $EF$ (ראו שרטוט). נתון: $CD=24$, $AP=8$.`,
  diagram: { kind: 'geo', points: { O: [0, 0], A: [-13, 0], B: [13, 0], P: [-5, 0], C: [-5, 12], D: [-5, -12], E: [-11.3, -6.4273], F: [6.2, 11.4263] }, circles: [{ center: 'O', radius: 13 }], segments: [{ from: 'A', to: 'P', label: '8' }, ['P', 'B'], ['C', 'D'], ['E', 'F']], angles: [{ at: 'P', from: 'B', to: 'D', right: true }], labels: [{ at: 'P', text: 'P', dx: -10, dy: -11 }, { at: 'O', text: 'O', dy: 14 }], hideNames: ['P', 'O'], dots: ['O'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הקטע $PB$.`,
      hints: [String.raw`מה עושה קוטר למיתר שהוא מאונך לו?`, String.raw`קוטר המאונך למיתר חוצה אותו, ולכן $PC=PD=12$.`, String.raw`משפט המיתרים הנחתכים: $PA\cdot PB=PC\cdot PD$.`],
      check: { kind: 'numeric', answer: 18, verify: '(24/2)^2/8' },
      short: String.raw`$PC=PD=12$ (קוטר המאונך למיתר חוצה אותו), ו-$8\cdot PB=12\cdot 12$, ולכן $PB=18$.`,
      full: [String.raw`קוטר המאונך למיתר חוצה את המיתר, ולכן $PC=PD=\dfrac{24}{2}=12$.`, String.raw`המיתרים $AB$ ו-$CD$ נחתכים ב-$P$, ולכן $PA\cdot PB=PC\cdot PD$.`, String.raw`$8\cdot PB=12\cdot 12=144\ \Rightarrow\ PB=18$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את רדיוס המעגל.`,
      hints: [String.raw`$AB$ הוא קוטר, ואורכו $AP+PB$.`],
      check: { kind: 'numeric', answer: 13, verify: '(8+(24/2)^2/8)/2' },
      short: String.raw`$AB=8+18=26$, ולכן $R=13$.`,
      full: [String.raw`$AB=AP+PB=8+18=26$.`, String.raw`$AB$ קוטר, ולכן $R=\dfrac{26}{2}=13$.`, String.raw`בדיקה: $OP=OA-AP=13-8=5$, ובמשולש ישר הזווית $OPC$: $5^2+12^2=169=13^2$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את אורך המיתר $AC$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`איזה משולש ישר זווית מכיל את $AC$?`, String.raw`במשולש $APC$ הזווית $APC$ ישרה: $AC^2=AP^2+PC^2$.`],
      check: { kind: 'numeric', answer: 14.4222051, tol: 0.01, verify: 'sqrt(8^2+(24/2)^2)' },
      short: String.raw`במשולש ישר הזווית $APC$: $AC=\sqrt{8^2+12^2}=\sqrt{208}\approx 14.42$.`,
      full: [String.raw`$CD\perp AB$, ולכן המשולש $APC$ ישר זווית ($\angle APC=90^\circ$).`, String.raw`משפט פיתגורס: $AC^2=AP^2+PC^2=8^2+12^2=208$.`, String.raw`$AC=\sqrt{208}=4\sqrt{13}\approx 14.42$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`נתון כי אורך המיתר $EF$ הוא $25$, ו-$PE<PF$. חשבו את $PE$.`,
      hints: [String.raw`סמנו $PE=x$, ואז $PF=25-x$.`, String.raw`המיתרים $EF$ ו-$CD$ נחתכים ב-$P$: $x(25-x)=12\cdot 12$.`, String.raw`$x^2-25x+144=0$.`],
      check: { kind: 'numeric', answer: 9, verify: '(25-sqrt(25^2-4*(24/2)^2))/2' },
      short: String.raw`$x(25-x)=144$, כלומר $x^2-25x+144=0$, $x=9$ או $x=16$. מכיוון ש-$PE<PF$: $PE=9$.`,
      full: [String.raw`נסמן $PE=x$; אז $PF=25-x$.`, String.raw`המיתרים $EF$ ו-$CD$ נחתכים ב-$P$: $PE\cdot PF=PC\cdot PD$, כלומר $x(25-x)=144$.`, String.raw`$x^2-25x+144=0\ \Rightarrow\ (x-9)(x-16)=0$.`, String.raw`$PE<PF$, ולכן $PE=9$ (ו-$PF=16$).`],
    },
  ],
};

const e10Points = { P: [0, 0], A: [4, 0], O: [10, 0], B: [16, 0], T: [6.4, 4.8] } satisfies Record<string, [number, number]>;

const e10: Exercise = {
  id: 'gpc-10',
  level: 3,
  topicId: T,
  subtopicIds: [CP, CT, CA, SIM, TQ],
  intro: String.raw`מנקודה $P$ שמחוץ למעגל שמרכזו $O$ יוצאים משיק $PT$ ($T$ נקודת ההשקה) וחותך העובר דרך המרכז $O$ וחותך את המעגל בנקודות $A$ ו-$B$ ($A$ בין $P$ ל-$B$). מחברים את $T$ עם $A$ ועם $B$ (ראו שרטוט). נתון: $PA=4$, $PT=8$.`,
  diagram: { kind: 'geo', points: e10Points, circles: [{ center: 'O', radius: 6 }], segments: [{ from: 'P', to: 'A', label: '4' }, ['A', 'B'], { from: 'P', to: 'T', label: '8' }, ['T', 'A'], ['T', 'B']], labels: [{ at: 'O', text: 'O', dy: 14 }], hideNames: ['O'], dots: ['O', 'P'] },
  solutionDiagram: { kind: 'geo', points: e10Points, circles: [{ center: 'O', radius: 6 }], segments: [['P', 'B'], ['P', 'T'], ['T', 'A'], ['T', 'B'], { from: 'O', to: 'T', dashed: true, accent: true }], angles: [{ at: 'T', from: 'A', to: 'B', right: true }], labels: [{ at: 'O', text: 'O', dy: 14 }], hideNames: ['O'], dots: ['O', 'P'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $PB$.`,
      hints: [String.raw`משיק וחותך יוצאים מאותה נקודה $P$.`, String.raw`$PT^2=PA\cdot PB$.`],
      check: { kind: 'numeric', answer: 16, verify: '8^2/4' },
      short: String.raw`$PT^2=PA\cdot PB$: $64=4\cdot PB$, ולכן $PB=16$.`,
      full: [String.raw`משפט המשיק והחותך: $PT^2=PA\cdot PB$.`, String.raw`$8^2=4\cdot PB\ \Rightarrow\ PB=16$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את רדיוס המעגל.`,
      hints: [String.raw`החותך עובר דרך המרכז. מהו אם כן המיתר $AB$?`, String.raw`$AB=PB-PA$ הוא קוטר.`],
      check: { kind: 'numeric', answer: 6, verify: '(8^2/4-4)/2' },
      short: String.raw`$AB=16-4=12$ הוא קוטר, ולכן $R=6$.`,
      full: [String.raw`$AB=PB-PA=16-4=12$.`, String.raw`המיתר $AB$ עובר דרך המרכז $O$, ולכן הוא קוטר: $R=6$.`, String.raw`בדיקה: המשיק מאונך לרדיוס בנקודת ההשקה, ולכן המשולש $PTO$ ישר זווית. $PO=PA+AO=10$, ואכן $PT^2+OT^2=64+36=100=PO^2$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`הוכיחו כי $\triangle PTA\sim\triangle PBT$.`,
      hints: [String.raw`לשני המשולשים זווית משותפת.`, String.raw`$\angle PTA$ היא זווית בין משיק למיתר $TA$; היא שווה לזווית ההיקפית הנשענת על $TA$ מצידו האחר.`],
      check: { kind: 'self' },
      short: String.raw`$\angle P$ משותפת ו-$\angle PTA=\angle PBT$ (זווית בין משיק למיתר שווה לזווית ההיקפית הנשענת על המיתר), ולכן $\triangle PTA\sim\triangle PBT$ (ז.ז.).`,
      full: [String.raw`$\angle P$ משותפת למשולשים $PTA$ ו-$PBT$.`, String.raw`$\angle PTA$ היא זווית בין המשיק $PT$ למיתר $TA$, ולכן היא שווה לזווית ההיקפית הנשענת על המיתר $TA$ מצידו האחר: $\angle PTA=\angle TBA=\angle PBT$.`, String.raw`לכן $\triangle PTA\sim\triangle PBT$ לפי משפט הדמיון ז.ז.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את אורך המיתר $TA$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`מהדמיון בסעיף ג אפשר למצוא את היחס בין $TA$ ל-$TB$.`, String.raw`$\dfrac{TA}{BT}=\dfrac{PT}{PB}=\dfrac12$, כלומר $TB=2\cdot TA$.`, String.raw`$AB$ קוטר, ולכן $\angle ATB=90^\circ$. השתמשו במשפט פיתגורס במשולש $ATB$.`],
      check: { kind: 'numeric', answer: 5.366563146, tol: 0.01, verify: '(8^2/4-4)/sqrt(1+((8^2/4)/8)^2)' },
      short: String.raw`$TB=2\cdot TA$ (מהדמיון) ו-$\angle ATB=90^\circ$ (נשענת על קוטר): $TA^2+4TA^2=12^2$, ולכן $TA=\dfrac{12}{\sqrt5}\approx 5.37$.`,
      full: [String.raw`מהדמיון $\triangle PTA\sim\triangle PBT$: $\dfrac{TA}{BT}=\dfrac{PT}{PB}=\dfrac{8}{16}=\dfrac12$, כלומר $TB=2\cdot TA$.`, String.raw`$AB$ קוטר, ולכן $\angle ATB=90^\circ$ (זווית היקפית הנשענת על קוטר היא ישרה).`, String.raw`נסמן $TA=x$. משפט פיתגורס במשולש $ATB$: $x^2+(2x)^2=12^2$.`, String.raw`$5x^2=144\ \Rightarrow\ x=\dfrac{12}{\sqrt5}\approx 5.37$.`],
    },
  ],
};

const e11: Exercise = {
  id: 'gpc-11',
  level: 3,
  topicId: T,
  subtopicIds: [CP, CA, SIM],
  intro: String.raw`מנקודה $P$ שמחוץ למעגל יוצאים שני חותכים: $PAB$ ($A$ בין $P$ ל-$B$) ו-$PCD$ ($C$ בין $P$ ל-$D$). המיתרים $AD$ ו-$BC$ נחתכים בנקודה $E$ (ראו שרטוט). נתון: $PA=6$, $AB=10$, $PC=8$.`,
  diagram: { kind: 'geo', points: { P: [0, 0], A: [5.6624, 1.9843], B: [15.0997, 5.2915], C: [7.5498, -2.6458], D: [11.3248, -3.9686], E: [8.8081, -1.3229] }, circles: [{ center: [11.1261, 1.5119], radius: 5.4841 }], segments: [{ from: 'P', to: 'A', label: '6' }, { from: 'A', to: 'B', label: '10' }, { from: 'P', to: 'C', label: '8' }, ['C', 'D'], ['A', 'C'], ['B', 'D'], ['A', 'D'], ['B', 'C']], labels: [{ at: 'E', text: 'E', dx: 15, dy: 1 }, { at: [6.6061, -0.3308], text: '5', dx: -17, dy: 3 }], hideNames: ['E'], dots: ['P'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך המיתר $CD$.`,
      hints: [String.raw`מצאו קודם את $PD$ בעזרת משפט שני החותכים.`, String.raw`$PA\cdot PB=PC\cdot PD$, כאשר $PB=16$; ואז $CD=PD-PC$.`],
      check: { kind: 'numeric', answer: 4, verify: '6*(6+10)/8-8' },
      short: String.raw`$PB=16$; $6\cdot 16=8\cdot PD$, לכן $PD=12$ ו-$CD=12-8=4$.`,
      full: [String.raw`$PB=PA+AB=6+10=16$.`, String.raw`משפט שני החותכים: $PA\cdot PB=PC\cdot PD$, כלומר $6\cdot 16=8\cdot PD$, ולכן $PD=12$.`, String.raw`$CD=PD-PC=12-8=4$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`הוכיחו כי $\triangle PAC\sim\triangle PDB$.`,
      hints: [String.raw`לשני המשולשים זווית משותפת $P$. בדקו את יחסי הצלעות שכולאות אותה.`, String.raw`השוו בין $\dfrac{PA}{PD}$ לבין $\dfrac{PC}{PB}$.`],
      check: { kind: 'self' },
      short: String.raw`$\dfrac{PA}{PD}=\dfrac{6}{12}=\dfrac12$ ו-$\dfrac{PC}{PB}=\dfrac{8}{16}=\dfrac12$, והזווית $P$ שביניהן משותפת, ולכן $\triangle PAC\sim\triangle PDB$ (צ.ז.צ.).`,
      full: [String.raw`$\dfrac{PA}{PD}=\dfrac{6}{12}=\dfrac12$ ו-$\dfrac{PC}{PB}=\dfrac{8}{16}=\dfrac12$, כלומר $\dfrac{PA}{PD}=\dfrac{PC}{PB}$. (זהו בדיוק השוויון $PA\cdot PB=PC\cdot PD$.)`, String.raw`$\angle P$ משותפת לשני המשולשים: היא כלואה בין הצלעות $PA,\ PC$ במשולש האחד ובין $PD,\ PB$ במשולש האחר.`, String.raw`לכן $\triangle PAC\sim\triangle PDB$ לפי משפט הדמיון צ.ז.צ., ויחס הדמיון הוא $\dfrac12$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`נתון גם: $AC=5$. חשבו את אורך המיתר $BD$.`,
      hints: [String.raw`איזו צלע במשולש $PDB$ מתאימה לצלע $AC$?`, String.raw`$\dfrac{AC}{DB}=\dfrac{PA}{PD}=\dfrac12$.`],
      check: { kind: 'numeric', answer: 10, verify: '5*(6*(6+10)/8)/6' },
      short: String.raw`$\dfrac{AC}{DB}=\dfrac12$, ולכן $BD=2\cdot 5=10$.`,
      full: [String.raw`ב-$\triangle PAC\sim\triangle PDB$ הצלע $AC$ מתאימה לצלע $DB$.`, String.raw`$\dfrac{AC}{DB}=\dfrac{PA}{PD}=\dfrac12$.`, String.raw`$BD=2\cdot AC=10$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`מצאו את היחס $\dfrac{EA}{EB}$.`,
      hints: [String.raw`חפשו שני משולשים דומים שקודקודם המשותף הוא $E$, ושהמיתרים $AC$ ו-$BD$ הם צלעות שלהם.`, String.raw`$\triangle EAC\sim\triangle EBD$: זוויות קודקודיות ב-$E$, ו-$\angle EAC=\angle EBD$ (היקפיות על הקשת $CD$).`, String.raw`$\dfrac{EA}{EB}=\dfrac{AC}{BD}$.`],
      check: { kind: 'numeric', answer: 0.5, verify: '5/(5*(6*(6+10)/8)/6)' },
      short: String.raw`$\triangle EAC\sim\triangle EBD$ (ז.ז.), ולכן $\dfrac{EA}{EB}=\dfrac{AC}{BD}=\dfrac{5}{10}=\dfrac12$.`,
      full: [String.raw`נתבונן במשולשים $EAC$ ו-$EBD$. $\angle AEC=\angle BED$ (זוויות קודקודיות).`, String.raw`$\angle EAC=\angle EBD$: אלה הזוויות $\angle DAC$ ו-$\angle DBC$, זוויות היקפיות הנשענות על אותה קשת $CD$.`, String.raw`לכן $\triangle EAC\sim\triangle EBD$ (ז.ז.), ומכאן $\dfrac{EA}{EB}=\dfrac{AC}{BD}$.`, String.raw`$\dfrac{EA}{EB}=\dfrac{5}{10}=\dfrac12$.`],
    },
  ],
};

const e12: Exercise = {
  id: 'gpc-12',
  level: 3,
  topicId: T,
  subtopicIds: [CP, CT, TQ],
  intro: String.raw`שני מעגלים נחתכים בנקודות $A$ ו-$B$. הנקודה $P$ נמצאת על המשך המיתר המשותף $AB$ ($A$ בין $P$ ל-$B$). מ-$P$ יוצאים משיק $PT$ למעגל האחד ומשיק $PS$ למעגל האחר ($T$ ו-$S$ נקודות ההשקה). מ-$P$ יוצא גם חותך למעגל שעליו נמצאת $S$, והוא חותך אותו בנקודות $C$ ו-$D$ ($C$ בין $P$ ל-$D$), ראו שרטוט.`,
  diagram: { kind: 'geo', points: { P: [0, 0], A: [8, 0], B: [18, 0], T: [11.0374, 4.7092], S: [4.7092, -11.0374], C: [5.0943, -3.1698], D: [20.3774, -12.6792] }, circles: [{ center: [13, 0.1092], radius: 5.0012 }, { center: [13, -7.5], radius: 9.0139 }], segments: [['P', 'B'], ['P', 'T'], ['P', 'S'], ['P', 'C'], { from: 'C', to: 'D', label: '18' }], labels: [{ at: [4.6, 0], text: '8', dy: 11 }, { at: [13, 0], text: '10', dy: 13 }], dots: ['P', 'T', 'S'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו כי $PT=PS$.`,
      hints: [String.raw`הישר $PAB$ הוא חותך של שני המעגלים גם יחד.`, String.raw`כתבו את משפט המשיק והחותך פעם במעגל האחד ופעם במעגל האחר.`],
      check: { kind: 'self' },
      short: String.raw`בשני המעגלים $PAB$ הוא חותך: $PT^2=PA\cdot PB$ וגם $PS^2=PA\cdot PB$, ולכן $PT=PS$.`,
      full: [String.raw`במעגל שעליו נמצאת $T$: $PT$ משיק ו-$PAB$ חותך (הנקודות $A$ ו-$B$ נמצאות על מעגל זה), ולכן $PT^2=PA\cdot PB$.`, String.raw`במעגל שעליו נמצאת $S$: $PS$ משיק ו-$PAB$ חותך גם של מעגל זה, ולכן $PS^2=PA\cdot PB$.`, String.raw`מכאן $PT^2=PS^2$, ומכיוון שאורכים חיוביים: $PT=PS$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`נתון: $PA=8$, $AB=10$. חשבו את $PT$.`,
      hints: [String.raw`$PB=PA+AB$.`, String.raw`$PT^2=PA\cdot PB$.`],
      check: { kind: 'numeric', answer: 12, verify: 'sqrt(8*(8+10))' },
      short: String.raw`$PB=18$ ו-$PT^2=8\cdot 18=144$, ולכן $PT=12$.`,
      full: [String.raw`$PB=PA+AB=8+10=18$.`, String.raw`$PT^2=PA\cdot PB=8\cdot 18=144\ \Rightarrow\ PT=12$ (וגם $PS=12$).`],
    },
    {
      label: 'ג',
      prompt: String.raw`נתון גם: $CD=18$. חשבו את $PC$.`,
      hints: [String.raw`$PCD$ ו-$PAB$ הם שני חותכים של אותו מעגל. סמנו $PC=x$.`, String.raw`$x(x+18)=8\cdot 18$.`, String.raw`$x^2+18x-144=0$; רק הפתרון החיובי מתאים.`],
      check: { kind: 'numeric', answer: 6, verify: '(-18+sqrt(18^2+4*8*(8+10)))/2' },
      short: String.raw`$x(x+18)=144$, כלומר $x^2+18x-144=0$, ולכן $PC=x=6$ (הפתרון $x=-24$ נפסל).`,
      full: [String.raw`נסמן $PC=x$, ואז $PD=x+18$.`, String.raw`$PCD$ ו-$PAB$ חותכים של המעגל שעליו נמצאת $S$: $PC\cdot PD=PA\cdot PB$ (או $PC\cdot PD=PS^2$), כלומר $x(x+18)=144$.`, String.raw`$x^2+18x-144=0\ \Rightarrow\ (x-6)(x+24)=0$.`, String.raw`אורך קטע חיובי, ולכן $PC=6$ (ו-$PD=24$).`],
    },
    {
      label: 'ד',
      prompt: String.raw`נתון גם כי $PT\perp PS$. חשבו את אורך הקטע $TS$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`איזה משולש הוא $PTS$, לפי סעיפים א ו-ב?`, String.raw`המשולש $PTS$ ישר זווית ושווה שוקיים, עם ניצבים באורך $12$.`],
      check: { kind: 'numeric', answer: 16.97056275, tol: 0.01, verify: 'sqrt(2*8*(8+10))' },
      short: String.raw`המשולש $PTS$ ישר זווית ושווה שוקיים ($PT=PS=12$): $TS=\sqrt{12^2+12^2}=12\sqrt2\approx 16.97$.`,
      full: [String.raw`$PT=PS=12$ (סעיפים א ו-ב), ו-$\angle TPS=90^\circ$.`, String.raw`משפט פיתגורס במשולש $PTS$: $TS^2=12^2+12^2=288$.`, String.raw`$TS=\sqrt{288}=12\sqrt2\approx 16.97$.`],
    },
  ],
};

export const geoProportionalCircle: ExerciseSet = {
  id: 'geo-proportional-circle',
  questionnaire: '35581',
  title: 'קטעים פרופורציוניים במעגל',
  topicIds: ['euclidean-geometry'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
