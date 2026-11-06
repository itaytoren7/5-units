import type { Exercise, ExerciseSet } from './types';

/**
 * סט: טריגונומטריה במשולש ישר זווית (שאלון 35581, שאלה 5).
 * 1–4 צעד אחד · 5–8 שניים-שלושה סעיפים · 9–12 שאלות בסגנון בגרות עם פרמטר.
 * כל התשובות המספריות מחושבות מחדש בבדיקה הגנרית (sets.test.ts) מתוך `verify`.
 */

const T = 'trigonometry';
const S = ['trig-triangle-solutions'];
const SG = ['trig-triangle-solutions', 'trig-geometry-problems'];

const e1: Exercise = {
  id: 'trt-1',
  level: 1,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`במשולש $ABC$ הזווית $C$ ישרה. נתון: $AB=10$, $\angle A=35^\circ$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { C: [0, 0], A: [8.1915, 0], B: [0, 5.7358] }, polygons: [['A', 'B', 'C']], segments: [{ from: 'A', to: 'B', label: '10' }], angles: [{ at: 'C', from: 'A', to: 'B', right: true }, { at: 'A', from: 'C', to: 'B', label: '35°' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הניצב $BC$.`,
      hints: [String.raw`$BC$ הוא הניצב שמול הזווית $A$, ו-$AB$ הוא היתר.`, String.raw`$\sin A=\dfrac{BC}{AB}$.`],
      check: { kind: 'numeric', answer: 5.7357643635, verify: '10*sin(35*pi/180)' },
      short: String.raw`ניצב מול זווית = יתר × סינוס: $BC=10\sin 35^\circ\approx 5.74$.`,
      full: [String.raw`במשולש ישר זווית, $\sin A=\dfrac{\text{הניצב מול } A}{\text{היתר}}=\dfrac{BC}{AB}$.`, String.raw`מכאן $BC=AB\cdot\sin A=10\cdot\sin 35^\circ$.`, String.raw`$BC\approx 10\cdot 0.5736=5.74$.`],
    },
  ],
};

const e2: Exercise = {
  id: 'trt-2',
  level: 1,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`במשולש $ABC$ הזווית $C$ ישרה. נתון: $BC=6$, $AC=8$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { C: [0, 0], A: [8, 0], B: [0, 6] }, polygons: [['A', 'B', 'C']], segments: [{ from: 'B', to: 'C', label: '6' }, { from: 'A', to: 'C', label: '8' }], angles: [{ at: 'C', from: 'A', to: 'B', right: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את הזווית $A$ (במעלות).`,
      hints: [String.raw`נתונים שני הניצבים, ולכן מתאימה הפונקציה שמקשרת ביניהם.`, String.raw`$\tan A=\dfrac{BC}{AC}=\dfrac{6}{8}$.`],
      check: { kind: 'numeric', answer: 36.8698976458, verify: 'atan(6/8)*180/pi' },
      short: String.raw`$\tan A=\dfrac{6}{8}=0.75$, ולכן $\angle A\approx 36.87^\circ$.`,
      full: [String.raw`$\tan A=\dfrac{\text{הניצב מול } A}{\text{הניצב ליד } A}=\dfrac{BC}{AC}=\dfrac{6}{8}=0.75$.`, String.raw`$\angle A=\tan^{-1}(0.75)\approx 36.87^\circ$.`, String.raw`בדיקה: $\angle B=90^\circ-36.87^\circ=53.13^\circ$, ואכן $\tan B=\dfrac{8}{6}$.`],
    },
  ],
};

const e3: Exercise = {
  id: 'trt-3',
  level: 1,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`במשולש $ABC$ הזווית $C$ ישרה. נתון: $AC=7$, $\angle A=52^\circ$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { C: [0, 0], A: [7, 0], B: [0, 8.9596] }, polygons: [['A', 'B', 'C']], segments: [{ from: 'A', to: 'C', label: '7' }], angles: [{ at: 'C', from: 'A', to: 'B', right: true }, { at: 'A', from: 'C', to: 'B', label: '52°' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך היתר $AB$.`,
      hints: [String.raw`$AC$ הוא הניצב שליד הזווית $A$.`, String.raw`$\cos A=\dfrac{AC}{AB}$, ומכאן $AB=\dfrac{AC}{\cos A}$.`],
      check: { kind: 'numeric', answer: 11.3698847184, verify: '7/cos(52*pi/180)' },
      short: String.raw`$AB=\dfrac{AC}{\cos A}=\dfrac{7}{\cos 52^\circ}\approx 11.37$.`,
      full: [String.raw`$\cos A=\dfrac{\text{הניצב ליד } A}{\text{היתר}}=\dfrac{AC}{AB}$.`, String.raw`$AB=\dfrac{7}{\cos 52^\circ}\approx\dfrac{7}{0.6157}$.`, String.raw`$AB\approx 11.37$.`],
    },
  ],
};

const e4: Exercise = {
  id: 'trt-4',
  level: 1,
  topicId: T,
  subtopicIds: SG,
  intro: String.raw`במשולש שווה-השוקיים $ABC$ ($AB=AC$) הבסיס $BC=12$ וזווית הבסיס $\angle B=40^\circ$. $AD$ הוא הגובה לבסיס (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { B: [0, 0], C: [12, 0], A: [6, 5.0346], D: [6, 0] }, polygons: [['A', 'B', 'C']], segments: [{ from: 'A', to: 'D', dashed: true }, { from: 'B', to: 'C', label: '12' }], angles: [{ at: 'B', from: 'C', to: 'A', label: '40°' }, { at: 'D', from: 'C', to: 'A', right: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הגובה $AD$.`,
      hints: [String.raw`במשולש שווה-שוקיים הגובה לבסיס הוא גם תיכון, ולכן $BD=6$.`, String.raw`במשולש $ABD$: $\tan B=\dfrac{AD}{BD}$.`],
      check: { kind: 'numeric', answer: 5.0345977871, verify: '6*tan(40*pi/180)' },
      short: String.raw`$BD=6$ ו-$AD=6\tan 40^\circ\approx 5.03$.`,
      full: [String.raw`במשולש שווה-שוקיים הגובה לבסיס חוצה אותו: $BD=DC=6$.`, String.raw`במשולש ישר הזווית $ABD$: $\tan B=\dfrac{AD}{BD}$, ולכן $AD=6\tan 40^\circ$.`, String.raw`$AD\approx 6\cdot 0.8391=5.03$.`],
    },
  ],
};

const e5: Exercise = {
  id: 'trt-5',
  level: 2,
  topicId: T,
  subtopicIds: SG,
  intro: String.raw`במשולש $ABC$ הזווית $C$ ישרה. נתון: $AB=13$, $BC=5$. $CD$ הוא הגובה ליתר (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { C: [0, 0], B: [5, 0], A: [0, 12], D: [4.2604, 1.7751] }, polygons: [['A', 'B', 'C']], segments: [{ from: 'C', to: 'D', dashed: true }, { from: 'A', to: 'B', label: '13' }, { from: 'B', to: 'C', label: '5' }], angles: [{ at: 'C', from: 'B', to: 'A', right: true }, { at: 'D', from: 'B', to: 'C', right: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הניצב $AC$.`,
      hints: [String.raw`נתונים היתר וניצב אחד. איזה משפט מקשר ביניהם?`, String.raw`משפט פיתגורס: $AC^2=AB^2-BC^2$.`],
      check: { kind: 'numeric', answer: 12, verify: 'sqrt(13^2-5^2)' },
      short: String.raw`פיתגורס: $AC=\sqrt{13^2-5^2}=12$.`,
      full: [String.raw`לפי משפט פיתגורס במשולש $ABC$: $AC^2+BC^2=AB^2$.`, String.raw`$AC^2=169-25=144$, ולכן $AC=12$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את הזווית $B$ (במעלות).`,
      hints: [String.raw`אפשר להשתמש בכל פונקציה טריגונומטרית, כי כל הצלעות ידועות.`, String.raw`$\cos B=\dfrac{BC}{AB}=\dfrac{5}{13}$.`],
      check: { kind: 'numeric', answer: 67.380135052, verify: 'acos(5/13)*180/pi' },
      short: String.raw`$\cos B=\dfrac{5}{13}$, ולכן $\angle B\approx 67.38^\circ$.`,
      full: [String.raw`$\cos B=\dfrac{\text{הניצב ליד } B}{\text{היתר}}=\dfrac{BC}{AB}=\dfrac{5}{13}$.`, String.raw`$\angle B=\cos^{-1}\!\left(\dfrac{5}{13}\right)\approx 67.38^\circ$.`, String.raw`(אפשר גם $\tan B=\dfrac{12}{5}$ או $\sin B=\dfrac{12}{13}$, ומקבלים אותה זווית.)`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את אורך הגובה $CD$.`,
      hints: [String.raw`התבוננו במשולש ישר הזווית $CDB$: היתר שלו הוא $BC$.`, String.raw`$\sin B=\dfrac{CD}{BC}$, ו-$\sin B=\dfrac{AC}{AB}=\dfrac{12}{13}$.`],
      check: { kind: 'numeric', answer: 4.6153846154, verify: '5*(12/13)' },
      short: String.raw`$CD=BC\sin B=5\cdot\dfrac{12}{13}\approx 4.62$.`,
      full: [String.raw`במשולש $CDB$ ($\angle D=90^\circ$): $\sin B=\dfrac{CD}{BC}$.`, String.raw`מהמשולש הגדול, $\sin B=\dfrac{AC}{AB}=\dfrac{12}{13}$.`, String.raw`$CD=5\cdot\dfrac{12}{13}=\dfrac{60}{13}\approx 4.62$.`, String.raw`בדיקה דרך שטח: $S=\dfrac{5\cdot 12}{2}=30=\dfrac{13\cdot CD}{2}$, ואכן $CD=\dfrac{60}{13}$.`],
    },
  ],
};

const e6: Exercise = {
  id: 'trt-6',
  level: 2,
  topicId: T,
  subtopicIds: SG,
  intro: String.raw`במעוין $ABCD$ אורך הצלע 8 ו-$\angle A=60^\circ$. האלכסונים נחתכים בנקודה $O$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { A: [0, 0], B: [8, 0], C: [12, 6.9282], D: [4, 6.9282], O: [6, 3.4641] }, polygons: [['A', 'B', 'C', 'D']], segments: [{ from: 'A', to: 'C', dashed: true }, { from: 'B', to: 'D', dashed: true }, { from: 'A', to: 'B', label: '8' }], angles: [{ at: 'A', from: 'B', to: 'D', label: '60°' }, { at: 'O', from: 'B', to: 'C', right: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך האלכסון $BD$.`,
      hints: [String.raw`אלכסוני המעוין מאונכים זה לזה וחוצים את זוויות המעוין.`, String.raw`במשולש $AOB$: $\angle OAB=30^\circ$, $AB=8$, ו-$BO=AB\sin 30^\circ$.`],
      check: { kind: 'numeric', answer: 8, verify: '2*8*sin(30*pi/180)' },
      short: String.raw`$BO=8\sin 30^\circ=4$, ולכן $BD=8$.`,
      full: [String.raw`האלכסונים במעוין חוצים את הזוויות, ולכן $\angle OAB=30^\circ$, ומאונכים זה לזה, ולכן $\angle AOB=90^\circ$.`, String.raw`במשולש $AOB$: $BO=AB\sin 30^\circ=8\cdot 0.5=4$.`, String.raw`האלכסונים חוצים זה את זה: $BD=2\cdot BO=8$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את אורך האלכסון $AC$.`,
      hints: [String.raw`באותו משולש $AOB$, הפעם הניצב שליד הזווית $30^\circ$.`, String.raw`$AO=AB\cos 30^\circ$.`],
      check: { kind: 'numeric', answer: 13.8564064606, verify: '2*8*cos(30*pi/180)' },
      short: String.raw`$AO=8\cos 30^\circ=4\sqrt3$, ולכן $AC=8\sqrt3\approx 13.86$.`,
      full: [String.raw`במשולש $AOB$: $AO=AB\cos 30^\circ=8\cdot\dfrac{\sqrt3}{2}=4\sqrt3$.`, String.raw`$AC=2\cdot AO=8\sqrt3\approx 13.86$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את שטח המעוין.`,
      hints: [String.raw`שטח מעוין שווה למחצית מכפלת האלכסונים.`, String.raw`$S=\dfrac{AC\cdot BD}{2}$.`],
      check: { kind: 'numeric', answer: 55.4256258422, verify: '(2*8*sin(30*pi/180))*(2*8*cos(30*pi/180))/2' },
      short: String.raw`$S=\dfrac{8\sqrt3\cdot 8}{2}=32\sqrt3\approx 55.43$.`,
      full: [String.raw`$S=\dfrac{d_1 d_2}{2}=\dfrac{8\sqrt3\cdot 8}{2}=32\sqrt3$.`, String.raw`$S\approx 55.43$.`, String.raw`בדיקה: $S=AB\cdot AD\cdot\sin A=8\cdot 8\cdot\sin 60^\circ=32\sqrt3$.`],
    },
  ],
};

const e7: Exercise = {
  id: 'trt-7',
  level: 2,
  topicId: T,
  subtopicIds: SG,
  intro: String.raw`$ABCD$ טרפז שווה-שוקיים ($AB\parallel DC$, $AD=BC$). נתון: $DC=14$, $AB=6$, $\angle D=55^\circ$. $AE$ ו-$BF$ גבהים (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { D: [0, 0], C: [14, 0], A: [4, 5.7126], B: [10, 5.7126], E: [4, 0], F: [10, 0] }, polygons: [['A', 'B', 'C', 'D']], segments: [{ from: 'A', to: 'E', dashed: true }, { from: 'B', to: 'F', dashed: true }, { from: 'D', to: 'C', label: '14' }, { from: 'A', to: 'B', label: '6' }], angles: [{ at: 'D', from: 'C', to: 'A', label: '55°' }, { at: 'E', from: 'C', to: 'A', right: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך השוק $AD$.`,
      hints: [String.raw`בטרפז שווה-שוקיים הגבהים חותכים מהבסיס הגדול שני קטעים שווים: $DE=FC$.`, String.raw`$DE=\dfrac{14-6}{2}=4$, ובמשולש $AED$: $\cos D=\dfrac{DE}{AD}$.`],
      check: { kind: 'numeric', answer: 6.9737871825, verify: '4/cos(55*pi/180)' },
      short: String.raw`$DE=4$ ו-$AD=\dfrac{4}{\cos 55^\circ}\approx 6.97$.`,
      full: [String.raw`$EF=AB=6$ (מלבן $ABFE$), ולכן $DE=FC=\dfrac{14-6}{2}=4$.`, String.raw`במשולש ישר הזווית $AED$: $\cos D=\dfrac{DE}{AD}$.`, String.raw`$AD=\dfrac{4}{\cos 55^\circ}\approx 6.97$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את גובה הטרפז $AE$.`,
      hints: [String.raw`באותו משולש $AED$: $\tan D=\dfrac{AE}{DE}$.`],
      check: { kind: 'numeric', answer: 5.712592027, verify: '4*tan(55*pi/180)' },
      short: String.raw`$AE=4\tan 55^\circ\approx 5.71$.`,
      full: [String.raw`במשולש $AED$: $\tan D=\dfrac{AE}{DE}$.`, String.raw`$AE=4\tan 55^\circ\approx 4\cdot 1.4281=5.71$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את שטח הטרפז.`,
      hints: [String.raw`$S=\dfrac{(AB+DC)\cdot h}{2}$.`],
      check: { kind: 'numeric', answer: 57.1259202697, verify: '(14+6)/2*4*tan(55*pi/180)' },
      short: String.raw`$S=\dfrac{(6+14)}{2}\cdot 5.71\approx 57.13$.`,
      full: [String.raw`$S=\dfrac{(AB+DC)\cdot AE}{2}=\dfrac{20\cdot 4\tan 55^\circ}{2}=40\tan 55^\circ$.`, String.raw`$S\approx 57.13$.`],
    },
  ],
};

const e8: Exercise = {
  id: 'trt-8',
  level: 2,
  topicId: T,
  subtopicIds: SG,
  intro: String.raw`במשולש $ABC$ הזווית $C$ ישרה, $\angle A=35^\circ$ ו-$AC=9$. $CD$ הוא הגובה ליתר $AB$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { C: [0, 0], A: [9, 0], B: [0, 6.3019], D: [2.9609, 4.2286] }, polygons: [['A', 'B', 'C']], segments: [{ from: 'C', to: 'D', dashed: true }, { from: 'A', to: 'C', label: '9' }], angles: [{ at: 'C', from: 'A', to: 'B', right: true }, { at: 'A', from: 'C', to: 'B', label: '35°' }, { at: 'D', from: 'A', to: 'C', right: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הגובה $CD$.`,
      hints: [String.raw`במשולש $ACD$ הזווית $D$ ישרה והיתר הוא $AC$.`, String.raw`$\sin A=\dfrac{CD}{AC}$.`],
      check: { kind: 'numeric', answer: 5.1621879272, verify: '9*sin(35*pi/180)' },
      short: String.raw`$CD=9\sin 35^\circ\approx 5.16$.`,
      full: [String.raw`במשולש ישר הזווית $ACD$: $\sin A=\dfrac{CD}{AC}$.`, String.raw`$CD=9\sin 35^\circ\approx 5.16$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את אורך הקטע $AD$.`,
      hints: [String.raw`באותו משולש $ACD$, הניצב שליד הזווית $A$.`, String.raw`$\cos A=\dfrac{AD}{AC}$.`],
      check: { kind: 'numeric', answer: 7.3723683986, verify: '9*cos(35*pi/180)' },
      short: String.raw`$AD=9\cos 35^\circ\approx 7.37$.`,
      full: [String.raw`במשולש $ACD$: $\cos A=\dfrac{AD}{AC}$.`, String.raw`$AD=9\cos 35^\circ\approx 7.37$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את אורך הניצב $BC$.`,
      hints: [String.raw`עכשיו חזרו למשולש הגדול $ABC$.`, String.raw`$\tan A=\dfrac{BC}{AC}$.`],
      check: { kind: 'numeric', answer: 6.3018678439, verify: '9*tan(35*pi/180)' },
      short: String.raw`$BC=9\tan 35^\circ\approx 6.30$.`,
      full: [String.raw`במשולש $ABC$: $\tan A=\dfrac{BC}{AC}$.`, String.raw`$BC=9\tan 35^\circ\approx 6.30$.`, String.raw`בדיקה: $\angle BCD=\angle A=35^\circ$ (שתיהן משלימות את $\angle B$ ל-$90^\circ$), ואכן $BC=\dfrac{CD}{\cos 35^\circ}\approx 6.30$.`],
    },
  ],
};

const e9: Exercise = {
  id: 'trt-9',
  level: 3,
  topicId: T,
  subtopicIds: SG,
  intro: String.raw`במשולש שווה-השוקיים $ABC$ ($AB=AC$) זווית הראש היא $\angle BAC=2\alpha$ והבסיס $BC=2a$. $D$ היא אמצע הבסיס (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { B: [0, 0], C: [10, 0], A: [5, 9.4036], D: [5, 0] }, polygons: [['A', 'B', 'C']], segments: [{ from: 'A', to: 'D', dashed: true }, { from: 'B', to: 'C', label: '2a' }], angles: [{ at: 'A', from: 'B', to: 'C', label: '2α' }, { at: 'D', from: 'C', to: 'A', right: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הביעו באמצעות $a$ ו-$\alpha$ את אורך הגובה $AD$ ואת אורך השוק $AB$.`,
      hints: [String.raw`$AD$ הוא גם חוצה זווית הראש, ולכן $\angle BAD=\alpha$ ו-$\angle ADB=90^\circ$.`, String.raw`במשולש $ABD$: $BD=a$, $\tan\alpha=\dfrac{BD}{AD}$, $\sin\alpha=\dfrac{BD}{AB}$.`],
      check: { kind: 'self' },
      short: String.raw`$AD=\dfrac{a}{\tan\alpha}$ ו-$AB=\dfrac{a}{\sin\alpha}$.`,
      full: [String.raw`במשולש שווה-שוקיים הגובה לבסיס הוא גם תיכון וגם חוצה זווית: $BD=a$ ו-$\angle BAD=\alpha$.`, String.raw`במשולש ישר הזווית $ABD$: $\tan\alpha=\dfrac{BD}{AD}=\dfrac{a}{AD}$, ולכן $AD=\dfrac{a}{\tan\alpha}$.`, String.raw`$\sin\alpha=\dfrac{BD}{AB}=\dfrac{a}{AB}$, ולכן $AB=\dfrac{a}{\sin\alpha}$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`נתון: $a=5$, $\alpha=28^\circ$. חשבו את $AD$.`,
      hints: [String.raw`הציבו בביטוי מסעיף א.`],
      check: { kind: 'numeric', answer: 9.4036323267, verify: '5/tan(28*pi/180)' },
      short: String.raw`$AD=\dfrac{5}{\tan 28^\circ}\approx 9.40$.`,
      full: [String.raw`$AD=\dfrac{a}{\tan\alpha}=\dfrac{5}{\tan 28^\circ}$.`, String.raw`$AD\approx\dfrac{5}{0.5317}=9.40$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את אורך השוק $AB$ (לאותם נתונים).`,
      hints: [String.raw`$AB=\dfrac{a}{\sin\alpha}$.`],
      check: { kind: 'numeric', answer: 10.6502723409, verify: '5/sin(28*pi/180)' },
      short: String.raw`$AB=\dfrac{5}{\sin 28^\circ}\approx 10.65$.`,
      full: [String.raw`$AB=\dfrac{a}{\sin\alpha}=\dfrac{5}{\sin 28^\circ}$.`, String.raw`$AB\approx\dfrac{5}{0.4695}=10.65$.`, String.raw`בדיקה בפיתגורס: $AB^2=AD^2+BD^2\approx 88.43+25=113.43$, ו-$\sqrt{113.43}\approx 10.65$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את שטח המשולש $ABC$ (לאותם נתונים).`,
      hints: [String.raw`$S=\dfrac{BC\cdot AD}{2}$, ו-$BC=2a$.`],
      check: { kind: 'numeric', answer: 47.0181616337, verify: '5*5/tan(28*pi/180)' },
      short: String.raw`$S=\dfrac{2a\cdot AD}{2}=a\cdot AD=5\cdot 9.40\approx 47.02$.`,
      full: [String.raw`$S=\dfrac{BC\cdot AD}{2}=\dfrac{2a\cdot AD}{2}=a\cdot AD$.`, String.raw`$S=5\cdot\dfrac{5}{\tan 28^\circ}\approx 47.02$.`],
    },
  ],
};

const e10: Exercise = {
  id: 'trt-10',
  level: 3,
  topicId: T,
  subtopicIds: SG,
  intro: String.raw`במלבן $ABCD$ אורך האלכסון $AC=d$, והזווית בין האלכסון לצלע $AB$ היא $\angle CAB=\alpha$. האלכסונים נחתכים בנקודה $O$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { A: [0, 0], B: [7.9864, 0], C: [7.9864, 6.0182], D: [0, 6.0182], O: [3.9932, 3.0091] }, polygons: [['A', 'B', 'C', 'D']], segments: [{ from: 'A', to: 'C', label: 'd' }, { from: 'B', to: 'D', dashed: true }], angles: [{ at: 'A', from: 'B', to: 'C', label: 'α' }, { at: 'B', from: 'A', to: 'C', right: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הביעו באמצעות $d$ ו-$\alpha$ את אורכי הצלעות $AB$ ו-$BC$.`,
      hints: [String.raw`במשולש $ABC$ הזווית $B$ ישרה והיתר הוא האלכסון $d$.`, String.raw`$\cos\alpha=\dfrac{AB}{d}$, $\sin\alpha=\dfrac{BC}{d}$.`],
      check: { kind: 'self' },
      short: String.raw`$AB=d\cos\alpha$ ו-$BC=d\sin\alpha$.`,
      full: [String.raw`במלבן כל זווית ישרה, ולכן משולש $ABC$ ישר זווית ($\angle B=90^\circ$) והיתר שלו הוא $AC=d$.`, String.raw`$\cos\alpha=\dfrac{AB}{AC}$, ולכן $AB=d\cos\alpha$.`, String.raw`$\sin\alpha=\dfrac{BC}{AC}$, ולכן $BC=d\sin\alpha$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`נתון: $d=10$, $\alpha=37^\circ$. חשבו את $AB$.`,
      hints: [String.raw`הציבו ב-$AB=d\cos\alpha$.`],
      check: { kind: 'numeric', answer: 7.9863551005, verify: '10*cos(37*pi/180)' },
      short: String.raw`$AB=10\cos 37^\circ\approx 7.99$.`,
      full: [String.raw`$AB=d\cos\alpha=10\cos 37^\circ$.`, String.raw`$AB\approx 10\cdot 0.7986=7.99$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את היקף המלבן (לאותם נתונים).`,
      hints: [String.raw`$P=2(AB+BC)$, ו-$BC=d\sin\alpha$.`],
      check: { kind: 'numeric', answer: 28.009010664, verify: '2*(10*cos(37*pi/180)+10*sin(37*pi/180))' },
      short: String.raw`$BC=10\sin 37^\circ\approx 6.02$, ולכן $P=2(7.99+6.02)\approx 28.01$.`,
      full: [String.raw`$BC=d\sin\alpha=10\sin 37^\circ\approx 6.02$.`, String.raw`$P=2(AB+BC)=2(10\cos 37^\circ+10\sin 37^\circ)\approx 28.01$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את הזווית $\angle AOB$ שבין האלכסונים (במעלות, לאותם נתונים).`,
      hints: [String.raw`אלכסוני המלבן שווים וחוצים זה את זה, ולכן $OA=OB$.`, String.raw`במשולש שווה-השוקיים $AOB$ זוויות הבסיס שוות ל-$\alpha$.`],
      check: { kind: 'numeric', answer: 106, verify: '180-2*37' },
      short: String.raw`$\angle AOB=180^\circ-2\alpha=106^\circ$.`,
      full: [String.raw`אלכסוני המלבן שווים וחוצים זה את זה, ולכן $OA=OB=\dfrac{d}{2}$ ומשולש $AOB$ שווה-שוקיים.`, String.raw`$\angle OAB=\alpha$, ולכן גם $\angle OBA=\alpha$ (זוויות בסיס).`, String.raw`$\angle AOB=180^\circ-2\alpha=180^\circ-74^\circ=106^\circ$.`],
    },
  ],
};

const e11: Exercise = {
  id: 'trt-11',
  level: 3,
  topicId: T,
  subtopicIds: SG,
  intro: String.raw`$ABCD$ טרפז ישר זווית ($AB\parallel DC$, $\angle A=\angle D=90^\circ$). נתון: $AD=6$, $DC=12$, $\angle C=50^\circ$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { D: [0, 0], C: [12, 0], A: [0, 6], B: [6.9654, 6] }, polygons: [['A', 'B', 'C', 'D']], segments: [{ from: 'B', to: 'D', dashed: true }, { from: 'A', to: 'D', label: '6' }, { from: 'D', to: 'C', label: '12' }], angles: [{ at: 'C', from: 'D', to: 'B', label: '50°' }, { at: 'D', from: 'C', to: 'A', right: true }, { at: 'A', from: 'D', to: 'B', right: true }] },
  solutionDiagram: { kind: 'geo', points: { D: [0, 0], C: [12, 0], A: [0, 6], B: [6.9654, 6], E: [6.9654, 0] }, polygons: [['A', 'B', 'C', 'D']], segments: [{ from: 'B', to: 'D', dashed: true }, { from: 'B', to: 'E', dashed: true, accent: true }, { from: 'A', to: 'D', label: '6' }], angles: [{ at: 'C', from: 'D', to: 'B', label: '50°' }, { at: 'E', from: 'C', to: 'B', right: true }, { at: 'D', from: 'C', to: 'B', label: '?' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך השוק $BC$.`,
      hints: [String.raw`העבירו גובה $BE$ מ-$B$ אל $DC$. אז $BE=AD=6$.`, String.raw`במשולש $BEC$: $\sin C=\dfrac{BE}{BC}$.`],
      check: { kind: 'numeric', answer: 7.832443736, verify: '6/sin(50*pi/180)' },
      short: String.raw`$BE=6$ ו-$BC=\dfrac{6}{\sin 50^\circ}\approx 7.83$.`,
      full: [String.raw`נעביר גובה $BE\perp DC$. המרובע $ABED$ הוא מלבן, ולכן $BE=AD=6$ ו-$DE=AB$.`, String.raw`במשולש ישר הזווית $BEC$: $\sin C=\dfrac{BE}{BC}$.`, String.raw`$BC=\dfrac{6}{\sin 50^\circ}\approx 7.83$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את אורך הבסיס $AB$.`,
      hints: [String.raw`$AB=DE=DC-EC$.`, String.raw`במשולש $BEC$: $\tan C=\dfrac{BE}{EC}$.`],
      check: { kind: 'numeric', answer: 6.9654022129, verify: '12-6/tan(50*pi/180)' },
      short: String.raw`$EC=\dfrac{6}{\tan 50^\circ}\approx 5.03$, ולכן $AB=12-5.03\approx 6.97$.`,
      full: [String.raw`במשולש $BEC$: $\tan C=\dfrac{BE}{EC}$, ולכן $EC=\dfrac{6}{\tan 50^\circ}\approx 5.03$.`, String.raw`$AB=DE=DC-EC=12-\dfrac{6}{\tan 50^\circ}\approx 6.97$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את אורך האלכסון $BD$.`,
      hints: [String.raw`במשולש $ABD$ הזווית $A$ ישרה.`, String.raw`משפט פיתגורס: $BD^2=AB^2+AD^2$.`],
      check: { kind: 'numeric', answer: 9.1933034317, verify: 'sqrt((12-6/tan(50*pi/180))^2+6^2)' },
      short: String.raw`$BD=\sqrt{AB^2+6^2}\approx\sqrt{48.52+36}\approx 9.19$.`,
      full: [String.raw`במשולש ישר הזווית $ABD$: $BD^2=AB^2+AD^2$.`, String.raw`$BD=\sqrt{6.9654^2+36}\approx\sqrt{84.52}\approx 9.19$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את הזווית $\angle BDC$ שבין האלכסון $BD$ לבסיס $DC$ (במעלות).`,
      hints: [String.raw`$AB\parallel DC$, ולכן $\angle BDC=\angle ABD$ (זוויות מתחלפות).`, String.raw`במשולש $ABD$: $\tan\angle ABD=\dfrac{AD}{AB}$.`],
      check: { kind: 'numeric', answer: 40.741621755, verify: 'atan(6/(12-6/tan(50*pi/180)))*180/pi' },
      short: String.raw`$\tan\angle BDC=\dfrac{AD}{AB}=\dfrac{6}{6.97}$, ולכן $\angle BDC\approx 40.74^\circ$.`,
      full: [String.raw`$AB\parallel DC$ ו-$BD$ חותך, ולכן $\angle BDC=\angle ABD$ (זוויות מתחלפות).`, String.raw`במשולש $ABD$: $\tan\angle ABD=\dfrac{AD}{AB}=\dfrac{6}{6.9654}\approx 0.8614$.`, String.raw`$\angle BDC=\tan^{-1}(0.8614)\approx 40.74^\circ$.`],
    },
  ],
};

const e12: Exercise = {
  id: 'trt-12',
  level: 3,
  topicId: T,
  subtopicIds: ['trig-triangle-solutions', 'trig-geometry-problems', 'geo-circle-angles'],
  intro: String.raw`במעגל שמרכזו $O$ ורדיוסו $R$ נתון המיתר $AB$. הזווית המרכזית הנשענת על המיתר היא $\angle AOB=2\alpha$, ו-$M$ היא אמצע המיתר (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { O: [0, 0], A: [-3.8567, 4.5963], B: [3.8567, 4.5963], M: [0, 4.5963] }, circles: [{ center: 'O', radius: 6 }], polygons: [['A', 'O', 'B']], segments: [{ from: 'O', to: 'M', dashed: true }, { from: 'O', to: 'A', label: 'R' }], angles: [{ at: 'O', from: 'A', to: 'B', label: '2α' }, { at: 'M', from: 'B', to: 'O', right: true }], dots: ['O'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הביעו באמצעות $R$ ו-$\alpha$ את אורך המיתר $AB$ ואת המרחק $OM$ של המיתר ממרכז המעגל.`,
      hints: [String.raw`$OM$ הוא תיכון במשולש שווה-השוקיים $AOB$ ($OA=OB=R$), ולכן הוא גם גובה וגם חוצה זווית.`, String.raw`במשולש $OMB$: $\angle MOB=\alpha$, $\sin\alpha=\dfrac{MB}{R}$, $\cos\alpha=\dfrac{OM}{R}$.`],
      check: { kind: 'self' },
      short: String.raw`$AB=2R\sin\alpha$ ו-$OM=R\cos\alpha$.`,
      full: [String.raw`$OA=OB=R$ ולכן $AOB$ שווה-שוקיים; התיכון $OM$ הוא גם גובה וחוצה זווית: $\angle MOB=\alpha$, $\angle OMB=90^\circ$.`, String.raw`במשולש $OMB$: $MB=R\sin\alpha$, ולכן $AB=2MB=2R\sin\alpha$.`, String.raw`$OM=R\cos\alpha$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`נתון: $R=6$, $\alpha=40^\circ$. חשבו את אורך המיתר $AB$.`,
      hints: [String.raw`$AB=2R\sin\alpha$.`],
      check: { kind: 'numeric', answer: 7.7134513162, verify: '2*6*sin(40*pi/180)' },
      short: String.raw`$AB=12\sin 40^\circ\approx 7.71$.`,
      full: [String.raw`$AB=2R\sin\alpha=2\cdot 6\cdot\sin 40^\circ$.`, String.raw`$AB\approx 12\cdot 0.6428=7.71$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את המרחק $OM$ (לאותם נתונים).`,
      hints: [String.raw`$OM=R\cos\alpha$.`],
      check: { kind: 'numeric', answer: 4.5962666587, verify: '6*cos(40*pi/180)' },
      short: String.raw`$OM=6\cos 40^\circ\approx 4.60$.`,
      full: [String.raw`$OM=R\cos\alpha=6\cos 40^\circ$.`, String.raw`$OM\approx 6\cdot 0.7660=4.60$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את שטח המשולש $AOB$ (לאותם נתונים).`,
      hints: [String.raw`$OM$ הוא הגובה לצלע $AB$.`, String.raw`$S=\dfrac{AB\cdot OM}{2}$.`],
      check: { kind: 'numeric', answer: 17.7265395542, verify: '0.5*(2*6*sin(40*pi/180))*(6*cos(40*pi/180))' },
      short: String.raw`$S=\dfrac{AB\cdot OM}{2}=\dfrac{7.71\cdot 4.60}{2}\approx 17.73$.`,
      full: [String.raw`$S=\dfrac{AB\cdot OM}{2}=\dfrac{2R\sin\alpha\cdot R\cos\alpha}{2}=R^2\sin\alpha\cos\alpha$.`, String.raw`$S=36\sin 40^\circ\cos 40^\circ\approx 17.73$.`, String.raw`(זהו גם $\dfrac12 R^2\sin 2\alpha=18\sin 80^\circ$.)`],
    },
  ],
};

export const trigRightTriangle: ExerciseSet = {
  id: 'trig-right-triangle',
  questionnaire: '35581',
  title: 'טריגונומטריה במשולש ישר זווית',
  topicIds: ['trigonometry'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
