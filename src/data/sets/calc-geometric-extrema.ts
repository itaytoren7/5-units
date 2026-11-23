import type { Exercise, ExerciseSet, Pt } from './types';

/**
 * סט: בעיות קיצון גאומטריות וטריגונומטריות (שאלון 35581, שאלה 8).
 * 1–4 צעד אחד · 5–8 שניים-שלושה סעיפים · 9–12 שאלות בסגנון בגרות. זוויות ברדיאנים.
 */

const T = 'differential-calculus';
const GEO = ['diff-geometric-extrema'];
const GRAPH = ['diff-graphical-extrema'];
const TRIG = ['diff-trig-integral-extrema'];
const ROUND = 'אפשר להקליד ביטוי עם pi או לעגל לשתי ספרות אחרי הנקודה.';

/** נקודות על קשת מעגל, לשרטוט חצי עיגול בתרשים geo (את השמות מסתירים). */
function arcPoints(prefix: string, cx: number, cy: number, r: number, n = 24): Record<string, Pt> {
  const points: Record<string, Pt> = {};
  for (let i = 0; i <= n; i += 1) {
    const t = (Math.PI * i) / n;
    points[`${prefix}${i}`] = [Number((cx + r * Math.cos(t)).toFixed(4)), Number((cy + r * Math.sin(t)).toFixed(4))];
  }
  return points;
}

const windowArc = arcPoints('w', 1.5, 3.2854, 1.5);
const windowArcBest = arcPoints('v', 2, 2, 2);
const semi = arcPoints('s', 0, 0, 5);
const SEMI = Object.keys(semi);

/* verify: the optimal value of the variable, recomputed from the derivative of the quantity */
const R5 = "root('(6-x/2)-x/2', 0.5, 11.5)";
const R6 = "root('2*x+2*(x-3)-2*(12-x)', 0, 12)";
const R7 = "root('2*(12-x^2)-4*x^2', 0.5, 3.4)";
const R8 = "root('20*(cos(x)-sin(x))', 0.1, 1.5)";
const R9 = "root('2*(4+pi-x-pi*x/2)+2*x*(-1-pi/2)+pi*x', 0.5, 2.7)";
const R10 = "root('2*sqrt(25-x^2)-2*x^2/sqrt(25-x^2)', 1, 4.9)";
const R11 = "root('sqrt(12-x)-x/(2*sqrt(12-x))', 1, 11.9)";
const R11P = "root('2-1/sqrt(12-x)', 1, 11.99)";
const R12 = "root('100*(cos(x)*(1+cos(x))-sin(x)^2)', 0.1, 1.5)";

const e1: Exercise = {
  id: 'cge-1',
  level: 1,
  topicId: T,
  subtopicIds: GEO,
  intro: String.raw`היקפו של מלבן $ABCD$ הוא $40$. נסמן ב-$x$ את אורך הצלע $AB$ (ראו שרטוט). רוצים למצוא מתי שטח המלבן מקסימלי, והצעד הראשון הוא לבטא את השטח כפונקציה של $x$.`,
  diagram: { kind: 'geo', points: { A: [0, 0], B: [13, 0], C: [13, 7], D: [0, 7] }, polygons: [['A', 'B', 'C', 'D']], segments: [{ from: 'A', to: 'B', label: 'x' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזו פונקציה מתארת את שטח המלבן, ומהו התחום של $x$ בבעיה?`,
      hints: [String.raw`ההיקף הוא $2\cdot AB+2\cdot BC=40$. הביעו את $BC$ באמצעות $x$.`, String.raw`$BC=20-x$. שתי הצלעות חייבות להיות חיוביות.`],
      check: { kind: 'choice', options: [String.raw`$S(x)=x(40-x)$, $\;0<x<40$`, String.raw`$S(x)=x(20-x)$, $\;0<x<20$`, String.raw`$S(x)=x(40-2x)$, $\;0<x<20$`, String.raw`$S(x)=x(20-x)$, $\;0<x<40$`], correct: 1 },
      short: String.raw`$BC=20-x$, ולכן $S(x)=x(20-x)$; הצלעות חיוביות כאשר $0<x<20$.`,
      full: [
        String.raw`$2x+2\cdot BC=40$, ולכן $BC=20-x$.`,
        String.raw`$S(x)=AB\cdot BC=x(20-x)=20x-x^2$.`,
        String.raw`תחום: $x>0$ וגם $20-x>0$, כלומר $0<x<20$.`,
        String.raw`המשך הפתרון (לא נדרש כאן): $S'(x)=20-2x=0$ כאשר $x=10$, ו-$S''(x)=-2<0$, ולכן השטח מקסימלי כשהמלבן הוא ריבוע שצלעו $10$.`,
      ],
    },
  ],
};

const e2: Exercise = {
  id: 'cge-2',
  level: 1,
  topicId: T,
  subtopicIds: GEO,
  intro: String.raw`שטחו של מלבן $ABCD$ הוא $36$. נסמן $AB=x$ (ראו שרטוט), ולכן $BC=\dfrac{36}{x}$, והיקף המלבן הוא $P(x)=2x+\dfrac{72}{x}$ עבור $x>0$.`,
  diagram: { kind: 'geo', points: { A: [0, 0], B: [9, 0], C: [9, 4], D: [0, 4] }, polygons: [['A', 'B', 'C', 'D']], segments: [{ from: 'A', to: 'B', label: 'x' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את $x$ שעבורו היקף המלבן מינימלי.`,
      hints: [String.raw`גזרו את $P(x)$ והשוו את הנגזרת לאפס.`, String.raw`$P'(x)=2-\dfrac{72}{x^2}$.`],
      check: { kind: 'numeric', answer: 6, verify: "root('2-72/x^2', 1, 30)" },
      short: String.raw`$P'(x)=2-\dfrac{72}{x^2}=0$ כאשר $x^2=36$, כלומר $x=6$; $P''(x)=\dfrac{144}{x^3}>0$, ולכן זו נקודת מינימום.`,
      full: [
        String.raw`$P(x)=2x+72x^{-1}$, ולכן $P'(x)=2-\dfrac{72}{x^2}$.`,
        String.raw`$P'(x)=0\ \Rightarrow\ x^2=36\ \Rightarrow\ x=6$ (כי $x>0$).`,
        String.raw`נימוק: $P''(x)=\dfrac{144}{x^3}>0$ לכל $x>0$, ולכן ב-$x=6$ יש מינימום. (אפשר גם בטבלה: $P'(3)=-6<0$ ו-$P'(9)=2-\dfrac{72}{81}>0$.)`,
        String.raw`המלבן בעל ההיקף המינימלי הוא ריבוע שצלעו $6$, והיקפו $P(6)=12+12=24$.`,
      ],
    },
  ],
};

const e3: Exercise = {
  id: 'cge-3',
  level: 1,
  topicId: T,
  subtopicIds: GRAPH,
  intro: String.raw`הנקודה $P$ נמצאת על גרף הפונקציה $f(x)=\sqrt{x}$, ונתונה הנקודה $A(2,0)$ (ראו שרטוט). ריבוע המרחק בין $P(x,\sqrt{x})$ לבין $A$ הוא $d^2=(x-2)^2+(\sqrt{x})^2=x^2-3x+4$.`,
  diagram: { kind: 'plot', xRange: [-0.5, 6], functions: [{ expr: 'sqrt(x)', label: 'f', domain: [0, 6] }], points: [{ x: 2, y: 0, label: 'A' }, { x: 4, y: 2, label: 'P' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את שיעור ה-$x$ של הנקודה $P$ שעבורה המרחק $AP$ מינימלי.`,
      hints: [String.raw`המרחק מינימלי בדיוק כאשר ריבוע המרחק מינימלי, ולכן מספיק לחקור את $g(x)=x^2-3x+4$ עבור $x\ge 0$.`, String.raw`$g'(x)=2x-3$.`],
      check: { kind: 'numeric', answer: 1.5, verify: "root('(2*(x-2)+1)/(2*sqrt((x-2)^2+x))', 0.1, 6)" },
      short: String.raw`$g'(x)=2x-3=0$ כאשר $x=1.5$; $g''(x)=2>0$, ולכן זו נקודת מינימום.`,
      full: [
        String.raw`נסמן $g(x)=d^2=x^2-3x+4$, $x\ge 0$. המרחק חיובי, ולכן הוא מינימלי כאשר $g(x)$ מינימלי.`,
        String.raw`$g'(x)=2x-3=0\ \Rightarrow\ x=1.5$.`,
        String.raw`$g''(x)=2>0$, ולכן זו נקודת מינימום (פרבולה "מחייכת", והקודקוד בתוך התחום).`,
        String.raw`הנקודה היא $P(1.5,\sqrt{1.5})$, והמרחק המינימלי הוא $\sqrt{g(1.5)}=\sqrt{1.75}\approx 1.32$.`,
      ],
    },
  ],
};

const e4: Exercise = {
  id: 'cge-4',
  level: 1,
  topicId: T,
  subtopicIds: TRIG,
  intro: String.raw`במשולש שווה שוקיים $ABC$ ($AB=AC$) אורך כל שוק הוא $8$, וזווית הראש היא $\alpha$ רדיאנים, $0<\alpha<\pi$ (ראו שרטוט). שטח המשולש הוא $S(\alpha)=\dfrac12\cdot 8\cdot 8\cdot\sin\alpha=32\sin\alpha$.`,
  diagram: { kind: 'geo', points: { A: [0, 7.2505], B: [-3.3809, 0], C: [3.3809, 0] }, polygons: [['A', 'B', 'C']], segments: [{ from: 'A', to: 'B', label: '8' }, { from: 'A', to: 'C', label: '8' }], angles: [{ at: 'A', from: 'B', to: 'C', label: 'α' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את $\alpha$ (ברדיאנים) שעבורה שטח המשולש מקסימלי. (${ROUND})`,
      hints: [String.raw`גזרו את $S(\alpha)$ לפי $\alpha$ והשוו לאפס.`, String.raw`$S'(\alpha)=32\cos\alpha$. מתי $\cos\alpha=0$ בתחום $0<\alpha<\pi$?`],
      check: { kind: 'numeric', answer: 1.570796327, tol: 0.005, verify: "root('32*cos(x)', 0.1, 3)" },
      short: String.raw`$S'(\alpha)=32\cos\alpha=0$ כאשר $\alpha=\dfrac{\pi}{2}\approx 1.57$; הנגזרת עוברת מחיובית לשלילית, ולכן זו נקודת מקסימום.`,
      full: [
        String.raw`$S'(\alpha)=32\cos\alpha$.`,
        String.raw`$S'(\alpha)=0\ \Rightarrow\ \cos\alpha=0\ \Rightarrow\ \alpha=\dfrac{\pi}{2}$ (הפתרון היחיד בתחום $0<\alpha<\pi$).`,
        String.raw`נימוק: עבור $\alpha<\dfrac{\pi}{2}$ מתקיים $\cos\alpha>0$ (השטח עולה), ועבור $\alpha>\dfrac{\pi}{2}$ מתקיים $\cos\alpha<0$ (השטח יורד), ולכן זו נקודת מקסימום.`,
        String.raw`השטח המקסימלי: $S\left(\dfrac{\pi}{2}\right)=32$, כשהמשולש ישר זווית ושווה שוקיים.`,
      ],
    },
  ],
};

const e5: Exercise = {
  id: 'cge-5',
  level: 2,
  topicId: T,
  subtopicIds: GEO,
  intro: String.raw`במשולש ישר זווית $ABC$ ($\angle A=90^\circ$) אורכי הניצבים הם $AB=12$ ו-$AC=6$. במשולש חסום מלבן $ADPE$: הקודקוד $D$ על הניצב $AB$, הקודקוד $E$ על הניצב $AC$ והקודקוד $P$ על היתר $BC$. נסמן $AD=x$ ו-$DP=y$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { A: [0, 0], B: [12, 0], C: [0, 6], D: [4, 0], P: [4, 4], E: [0, 4] }, polygons: [['A', 'B', 'C'], ['A', 'D', 'P', 'E']], segments: [{ from: 'A', to: 'D', label: 'x' }, { from: 'D', to: 'P', label: 'y' }] },
  solutionDiagram: { kind: 'geo', points: { A: [0, 0], B: [12, 0], C: [0, 6], D: [6, 0], P: [6, 3], E: [0, 3] }, polygons: [['A', 'B', 'C'], ['A', 'D', 'P', 'E']], segments: [{ from: 'A', to: 'D', label: '6', accent: true }, { from: 'D', to: 'P', label: '3', accent: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הביעו את $y$ באמצעות $x$.`,
      hints: [String.raw`המשולשים $DBP$ ו-$ABC$ דומים: לשניהם זווית ישרה, והזווית $B$ משותפת.`, String.raw`$\dfrac{DP}{AC}=\dfrac{DB}{AB}$, כלומר $\dfrac{y}{6}=\dfrac{12-x}{12}$.`],
      check: { kind: 'choice', options: [String.raw`$y=12-2x$`, String.raw`$y=6-x$`, String.raw`$y=6-\dfrac{x}{2}$`, String.raw`$y=6-2x$`], correct: 2 },
      short: String.raw`מדמיון המשולשים $DBP\sim ABC$: $\dfrac{y}{6}=\dfrac{12-x}{12}$, ולכן $y=6-\dfrac{x}{2}$.`,
      full: [
        String.raw`$DP\perp AB$ ו-$AC\perp AB$, ולכן $\triangle DBP\sim\triangle ABC$ (זווית ישרה וזווית $B$ משותפת).`,
        String.raw`$DB=12-x$. מהדמיון: $\dfrac{DP}{AC}=\dfrac{DB}{AB}$, כלומר $\dfrac{y}{6}=\dfrac{12-x}{12}$.`,
        String.raw`$y=\dfrac{6(12-x)}{12}=6-\dfrac{x}{2}$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $x$ שעבורו שטח המלבן מקסימלי.`,
      hints: [String.raw`שטח המלבן: $S(x)=x\cdot y=x\left(6-\dfrac{x}{2}\right)$, בתחום $0<x<12$.`, String.raw`$S'(x)=6-x$.`],
      check: { kind: 'numeric', answer: 6, verify: R5 },
      short: String.raw`$S(x)=6x-\dfrac{x^2}{2}$, $S'(x)=6-x=0$ כאשר $x=6$; $S''(x)=-1<0$, ולכן זו נקודת מקסימום.`,
      full: [
        String.raw`$S(x)=x\left(6-\dfrac{x}{2}\right)=6x-\dfrac{x^2}{2}$. תחום: $x>0$ ו-$y>0$, כלומר $0<x<12$.`,
        String.raw`$S'(x)=6-x=0\ \Rightarrow\ x=6$, והוא בתחום.`,
        String.raw`$S''(x)=-1<0$, ולכן $x=6$ היא נקודת מקסימום.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את השטח המקסימלי של המלבן.`,
      hints: [String.raw`הציבו את ה-$x$ שמצאתם ב-$S(x)$.`],
      check: { kind: 'numeric', answer: 18, verify: `${R5}*(6-${R5}/2)` },
      short: String.raw`$S(6)=6\cdot 3=18$, חצי משטח המשולש $ABC$.`,
      full: [String.raw`כאשר $x=6$: $y=6-\dfrac62=3$.`, String.raw`$S(6)=6\cdot 3=18$.`, String.raw`בדיקת סבירות: שטח המשולש $ABC$ הוא $\dfrac{12\cdot 6}{2}=36$, והמלבן המקסימלי תופס חצי ממנו.`],
    },
  ],
};

const e6: Exercise = {
  id: 'cge-6',
  level: 2,
  topicId: T,
  subtopicIds: GEO,
  intro: String.raw`במלבן $ABCD$ נתון $AB=12$ ו-$AD=4$. הנקודה $E$ נמצאת על הצלע $DC$ כך ש-$DE=3$. $P$ היא נקודה על הצלע $AB$, ונסמן $AP=x$ (ראו שרטוט). מחפשים את מיקום הנקודה $P$ שעבורו סכום ריבועי המרחקים $PD^2+PE^2+PC^2$ מינימלי.`,
  diagram: { kind: 'geo', points: { A: [0, 0], B: [12, 0], C: [12, 4], D: [0, 4], E: [3, 4], P: [8, 0] }, polygons: [['A', 'B', 'C', 'D']], segments: [{ from: 'P', to: 'D', dashed: true }, { from: 'P', to: 'E', dashed: true }, { from: 'P', to: 'C', dashed: true }, { from: 'A', to: 'P', label: 'x' }], dots: ['P', 'E'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזו פונקציה מתארת את הסכום $PD^2+PE^2+PC^2$?`,
      hints: [String.raw`כל אחד משלושת הקטעים הוא יתר במשולש ישר זווית שאחד מניצביו באורך $4$ (גובה המלבן). השתמשו במשפט פיתגורס.`, String.raw`$PD^2=x^2+16$, $PE^2=(x-3)^2+16$, $PC^2=(12-x)^2+16$.`],
      check: { kind: 'choice', options: [String.raw`$f(x)=3x^2-30x+153$`, String.raw`$f(x)=3x^2-30x+201$`, String.raw`$f(x)=3x^2+30x+201$`, String.raw`$f(x)=x^2-30x+201$`], correct: 1 },
      short: String.raw`$f(x)=(x^2+16)+\left((x-3)^2+16\right)+\left((12-x)^2+16\right)=3x^2-30x+201$.`,
      full: [
        String.raw`$PD^2=AP^2+AD^2=x^2+16$.`,
        String.raw`המרחק האופקי בין $P$ ל-$E$ הוא $|x-3|$, ולכן $PE^2=(x-3)^2+16$.`,
        String.raw`$PC^2=PB^2+BC^2=(12-x)^2+16$.`,
        String.raw`$f(x)=x^2+(x^2-6x+9)+(144-24x+x^2)+48=3x^2-30x+201$, בתחום $0\le x\le 12$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $x$ שעבורו הסכום מינימלי.`,
      hints: [String.raw`גזרו את $f(x)$ והשוו לאפס. התחום הוא $0\le x\le 12$.`, String.raw`$f'(x)=6x-30$.`],
      check: { kind: 'numeric', answer: 5, verify: R6 },
      short: String.raw`$f'(x)=6x-30=0$ כאשר $x=5$; $f''(x)=6>0$, ולכן זו נקודת מינימום.`,
      full: [
        String.raw`$f'(x)=6x-30=0\ \Rightarrow\ x=5$, והוא בתחום $0\le x\le 12$.`,
        String.raw`$f''(x)=6>0$, ולכן $x=5$ היא נקודת מינימום. זו פרבולה "מחייכת", ולכן זהו גם המינימום המוחלט.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את הערך המינימלי של הסכום.`,
      hints: [String.raw`הציבו את ה-$x$ שמצאתם ב-$f(x)$, או חשבו ישירות את שלושת ריבועי המרחקים.`],
      check: { kind: 'numeric', answer: 126, verify: `${R6}^2+4^2+(${R6}-3)^2+4^2+(12-${R6})^2+4^2` },
      short: String.raw`$f(5)=75-150+201=126$ (בדיקה: $41+20+65=126$).`,
      full: [String.raw`$f(5)=3\cdot 25-30\cdot 5+201=126$.`, String.raw`בדיקה ישירה: $PD^2=25+16=41$, $PE^2=4+16=20$, $PC^2=49+16=65$, וסכומם $126$.`],
    },
  ],
};

const e7: Exercise = {
  id: 'cge-7',
  level: 2,
  topicId: T,
  subtopicIds: GRAPH,
  intro: String.raw`נתונה הפרבולה $f(x)=12-x^2$. מלבן $ABCD$ חסום בין הפרבולה לציר ה-$x$: הקודקודים $A$ ו-$B$ על ציר ה-$x$, והקודקודים $C$ ו-$D$ על הפרבולה, מעל ציר ה-$x$ (ראו שרטוט). נסמן ב-$x$ את שיעור ה-$x$ של הקודקוד $C$, $x>0$.`,
  diagram: { kind: 'plot', xRange: [-4.2, 4.2], functions: [{ expr: '12-x^2', label: 'f', domain: [-3.7, 3.7] }], shade: [{ between: '3', from: -3, to: 3 }], points: [{ x: 3, y: 3, label: 'C' }, { x: -3, y: 3, label: 'D' }, { x: -3, y: 0, label: 'A' }, { x: 3, y: 0, label: 'B' }] },
  solutionDiagram: { kind: 'plot', xRange: [-4.2, 4.2], functions: [{ expr: '12-x^2', label: 'f', domain: [-3.7, 3.7] }], shade: [{ between: '8', from: -2, to: 2 }], points: [{ x: 2, y: 8, label: 'C(2, 8)' }, { x: -2, y: 8 }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזו פונקציה מתארת את שטח המלבן, ומהו התחום של $x$?`,
      hints: [String.raw`הפרבולה סימטרית ביחס לציר ה-$y$, ולכן אם $C(x,\,12-x^2)$ אז $D(-x,\,12-x^2)$.`, String.raw`רוחב המלבן הוא $AB=2x$, וגובהו $BC=12-x^2$ חייב להיות חיובי.`],
      check: { kind: 'choice', options: [String.raw`$S(x)=x(12-x^2)$, $\;0<x<\sqrt{12}$`, String.raw`$S(x)=2x(12-x^2)$, $\;0<x<12$`, String.raw`$S(x)=2x(12-x^2)$, $\;0<x<\sqrt{12}$`, String.raw`$S(x)=2x\cdot x^2$, $\;0<x<\sqrt{12}$`], correct: 2 },
      short: String.raw`רוחב $2x$ וגובה $12-x^2$: $S(x)=2x(12-x^2)$, והגובה חיובי כאשר $0<x<\sqrt{12}$.`,
      full: [
        String.raw`$C(x,\,12-x^2)$ ומהסימטריה $D(-x,\,12-x^2)$, ולכן $AB=DC=2x$.`,
        String.raw`גובה המלבן הוא שיעור ה-$y$ של $C$: $BC=12-x^2$.`,
        String.raw`$S(x)=2x(12-x^2)=24x-2x^3$.`,
        String.raw`תחום: $x>0$ וגם $12-x^2>0$, כלומר $0<x<\sqrt{12}$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $x$ שעבורו שטח המלבן מקסימלי.`,
      hints: [String.raw`פתחו סוגריים: $S(x)=24x-2x^3$, וגזרו.`, String.raw`$S'(x)=24-6x^2$.`],
      check: { kind: 'numeric', answer: 2, verify: R7 },
      short: String.raw`$S'(x)=24-6x^2=0$ כאשר $x=2$; $S''(2)=-24<0$, ולכן זו נקודת מקסימום.`,
      full: [
        String.raw`$S'(x)=24-6x^2=0\ \Rightarrow\ x^2=4\ \Rightarrow\ x=2$ (כי $x>0$), והוא בתחום.`,
        String.raw`$S''(x)=-12x$, ולכן $S''(2)=-24<0$: נקודת מקסימום.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את השטח המקסימלי של המלבן.`,
      hints: [String.raw`הציבו את ה-$x$ שמצאתם ב-$S(x)$.`],
      check: { kind: 'numeric', answer: 32, verify: `2*${R7}*(12-${R7}^2)` },
      short: String.raw`$S(2)=2\cdot 2\cdot(12-4)=32$.`,
      full: [String.raw`כאשר $x=2$: רוחב המלבן $4$ וגובהו $12-4=8$.`, String.raw`$S(2)=4\cdot 8=32$.`],
    },
  ],
};

const e8: Exercise = {
  id: 'cge-8',
  level: 2,
  topicId: T,
  subtopicIds: TRIG,
  intro: String.raw`מלבן $ABCD$ חסום במעגל שמרכזו $O$ ורדיוסו $5$, ולכן האלכסון $AC$ הוא קוטר שאורכו $10$. נסמן ב-$\alpha$ את הזווית $\angle BAC$ שבין האלכסון לצלע $AB$ (ברדיאנים), $0<\alpha<\dfrac{\pi}{2}$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { O: [0, 0], A: [-4.3301, -2.5], B: [4.3301, -2.5], C: [4.3301, 2.5], D: [-4.3301, 2.5] }, circles: [{ center: 'O', radius: 5 }], polygons: [['A', 'B', 'C', 'D']], segments: [{ from: 'A', to: 'C', dashed: true, label: '10' }], angles: [{ at: 'A', from: 'B', to: 'C', label: 'α' }], dots: ['O'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הביעו את היקף המלבן באמצעות $\alpha$.`,
      hints: [String.raw`המשולש $ABC$ ישר זווית ($\angle B=90^\circ$), והיתר שלו הוא הקוטר $AC=10$.`, String.raw`$AB=10\cos\alpha$ ו-$BC=10\sin\alpha$.`],
      check: { kind: 'choice', options: [String.raw`$P(\alpha)=10(\sin\alpha+\cos\alpha)$`, String.raw`$P(\alpha)=20(\sin\alpha+\cos\alpha)$`, String.raw`$P(\alpha)=20\sin\alpha\cos\alpha$`, String.raw`$P(\alpha)=100\sin\alpha\cos\alpha$`], correct: 1 },
      short: String.raw`$AB=10\cos\alpha$, $BC=10\sin\alpha$, ולכן $P(\alpha)=2(AB+BC)=20(\sin\alpha+\cos\alpha)$.`,
      full: [
        String.raw`במשולש ישר הזווית $ABC$: $\cos\alpha=\dfrac{AB}{AC}$ ו-$\sin\alpha=\dfrac{BC}{AC}$.`,
        String.raw`$AB=10\cos\alpha$, $BC=10\sin\alpha$.`,
        String.raw`$P(\alpha)=2\cdot AB+2\cdot BC=20(\sin\alpha+\cos\alpha)$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $\alpha$ שעבורה היקף המלבן מקסימלי. (${ROUND})`,
      hints: [String.raw`גזרו את $P(\alpha)$ והשוו לאפס.`, String.raw`$P'(\alpha)=20(\cos\alpha-\sin\alpha)=0$, כלומר $\tan\alpha=1$.`],
      check: { kind: 'numeric', answer: 0.7853981634, tol: 0.005, verify: R8 },
      short: String.raw`$P'(\alpha)=20(\cos\alpha-\sin\alpha)=0$ כאשר $\tan\alpha=1$, כלומר $\alpha=\dfrac{\pi}{4}\approx 0.79$; הנגזרת עוברת מחיובית לשלילית, ולכן זו נקודת מקסימום.`,
      full: [
        String.raw`$P'(\alpha)=20(\cos\alpha-\sin\alpha)$.`,
        String.raw`$P'(\alpha)=0\ \Rightarrow\ \sin\alpha=\cos\alpha\ \Rightarrow\ \tan\alpha=1\ \Rightarrow\ \alpha=\dfrac{\pi}{4}$ (היחיד בתחום).`,
        String.raw`נימוק: עבור $\alpha<\dfrac{\pi}{4}$ מתקיים $\cos\alpha>\sin\alpha$ ולכן $P'>0$; עבור $\alpha>\dfrac{\pi}{4}$ מתקיים $P'<0$. לכן זו נקודת מקסימום.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את ההיקף המקסימלי של המלבן. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`הציבו את ה-$\alpha$ שמצאתם ב-$P(\alpha)$.`],
      check: { kind: 'numeric', answer: 28.28427125, verify: `20*(sin(${R8})+cos(${R8}))` },
      short: String.raw`$P\left(\dfrac{\pi}{4}\right)=20\left(\dfrac{\sqrt2}{2}+\dfrac{\sqrt2}{2}\right)=20\sqrt2\approx 28.28$; המלבן הוא ריבוע.`,
      full: [String.raw`$P\left(\dfrac{\pi}{4}\right)=20\left(\sin\dfrac{\pi}{4}+\cos\dfrac{\pi}{4}\right)=20\cdot\sqrt2\approx 28.28$.`, String.raw`במצב זה $AB=BC=5\sqrt2$, כלומר המלבן הוא ריבוע.`],
    },
  ],
};

const e9: Exercise = {
  id: 'cge-9',
  level: 3,
  topicId: T,
  subtopicIds: GEO,
  intro: String.raw`חלון מורכב ממלבן $ABCD$ שמעליו חצי עיגול, כך שהצלע העליונה $DC$ של המלבן היא קוטר חצי העיגול (ראו שרטוט). נסמן ב-$r$ את רדיוס חצי העיגול וב-$h$ את גובה המלבן (במטרים). היקף החלון, כלומר אורך הקו החיצוני שלו (שלוש צלעות של המלבן וקשת חצי המעגל), הוא $8+2\pi$ מטרים.`,
  diagram: { kind: 'geo', points: { A: [0, 0], B: [3, 0], C: [3, 3.2854], D: [0, 3.2854], ...windowArc }, polygons: [['A', 'B', ...Object.keys(windowArc)]], segments: [{ from: 'D', to: 'C', dashed: true }, { from: 'A', to: 'B', label: '2r' }, { from: 'B', to: 'C', label: 'h' }], hideNames: Object.keys(windowArc) },
  solutionDiagram: { kind: 'geo', points: { A: [0, 0], B: [4, 0], C: [4, 2], D: [0, 2], ...windowArcBest }, polygons: [['A', 'B', ...Object.keys(windowArcBest)]], segments: [{ from: 'D', to: 'C', dashed: true }, { from: 'A', to: 'B', label: '4' }, { from: 'B', to: 'C', label: '2' }], hideNames: Object.keys(windowArcBest) },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הביעו את $h$ באמצעות $r$.`,
      hints: [String.raw`ההיקף מורכב משתי צלעות אנכיות באורך $h$, מצלע תחתונה באורך $2r$ ומקשת חצי מעגל באורך $\pi r$.`, String.raw`$2h+2r+\pi r=8+2\pi$. בודדו את $h$.`],
      check: { kind: 'choice', options: [String.raw`$h=4+\pi-r-\dfrac{\pi r}{2}$`, String.raw`$h=8+2\pi-2r-\pi r$`, String.raw`$h=4+\pi-r-\pi r$`, String.raw`$h=4+\pi-2r-\dfrac{\pi r}{2}$`], correct: 0 },
      short: String.raw`$2h+2r+\pi r=8+2\pi$, ולכן $h=4+\pi-r-\dfrac{\pi r}{2}$.`,
      full: [
        String.raw`אורך קשת חצי המעגל: $\dfrac12\cdot 2\pi r=\pi r$. הקוטר $DC$ אינו חלק מההיקף.`,
        String.raw`$2h+2r+\pi r=8+2\pi$.`,
        String.raw`$2h=8+2\pi-2r-\pi r$, ולכן $h=4+\pi-r-\dfrac{\pi r}{2}$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $r$ שעבורו שטח החלון מקסימלי.`,
      hints: [
        String.raw`שטח החלון: $S=2r\cdot h+\dfrac{\pi r^2}{2}$. הציבו את $h$ מסעיף א.`,
        String.raw`$S(r)=(8+2\pi)r-\left(2+\dfrac{\pi}{2}\right)r^2$.`,
        String.raw`$S'(r)=(8+2\pi)-(4+\pi)r$.`,
      ],
      check: { kind: 'numeric', answer: 2, verify: R9 },
      short: String.raw`$S(r)=(8+2\pi)r-\left(2+\dfrac{\pi}{2}\right)r^2$, ו-$S'(r)=(8+2\pi)-(4+\pi)r=0$ כאשר $r=\dfrac{2(4+\pi)}{4+\pi}=2$.`,
      full: [
        String.raw`$S=2rh+\dfrac{\pi r^2}{2}=2r\left(4+\pi-r-\dfrac{\pi r}{2}\right)+\dfrac{\pi r^2}{2}$.`,
        String.raw`$S(r)=(8+2\pi)r-2r^2-\pi r^2+\dfrac{\pi r^2}{2}=(8+2\pi)r-\left(2+\dfrac{\pi}{2}\right)r^2$.`,
        String.raw`תחום: $r>0$ ו-$h>0$, כלומר $0<r<\dfrac{2(4+\pi)}{2+\pi}\approx 2.78$.`,
        String.raw`$S'(r)=(8+2\pi)-(4+\pi)r=0\ \Rightarrow\ r=\dfrac{8+2\pi}{4+\pi}=2$, והוא בתחום.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`איזה מהנימוקים הבאים מוכיח שהנקודה שמצאתם היא נקודת מקסימום של $S(r)$?`,
      hints: [String.raw`נקודה שבה הנגזרת מתאפסת יכולה להיות מקסימום, מינימום או אף אחד מהם. בודקים את סימן הנגזרת השנייה, או את סימן הנגזרת הראשונה משני צידי הנקודה.`, String.raw`$S'(r)=(8+2\pi)-(4+\pi)r$. גזרו שוב.`],
      check: { kind: 'choice', options: [String.raw`$S'(2)=0$, וזה לבדו מספיק`, String.raw`$S''(r)=-(4+\pi)<0$, ולכן זו נקודת מקסימום`, String.raw`$S''(r)=-(4+\pi)<0$, ולכן זו נקודת מינימום`, String.raw`$S(2)>0$, ולכן זו נקודת מקסימום`], correct: 1 },
      short: String.raw`$S''(r)=-(4+\pi)<0$, ולכן $r=2$ היא נקודת מקסימום.`,
      full: [
        String.raw`$S''(r)=-(4+\pi)$, מספר שלילי לכל $r$.`,
        String.raw`נגזרת שנייה שלילית בנקודה שבה $S'=0$ פירושה מקסימום. ($S$ היא פרבולה "בוכה", ולכן זה גם המקסימום המוחלט.)`,
        String.raw`התנאי $S'(2)=0$ לבדו אינו מספיק, והסימן של $S(2)$ אינו קשור לסוג הקיצון.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`מצאו את השטח המקסימלי של החלון (במטרים רבועים). עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`מצאו קודם את $h$ עבור $r=2$.`, String.raw`$h=2$, ואז $S=2r\cdot h+\dfrac{\pi r^2}{2}$.`],
      check: { kind: 'numeric', answer: 14.28318531, verify: `2*${R9}*(4+pi-${R9}-pi*${R9}/2)+pi*${R9}^2/2` },
      short: String.raw`$h=4+\pi-2-\pi=2$, ולכן $S=2\cdot 2\cdot 2+\dfrac{\pi\cdot 2^2}{2}=8+2\pi\approx 14.28$.`,
      full: [
        String.raw`$h=4+\pi-2-\dfrac{2\pi}{2}=2$: בחלון המקסימלי גובה המלבן שווה לרדיוס.`,
        String.raw`שטח המלבן: $2r\cdot h=4\cdot 2=8$. שטח חצי העיגול: $\dfrac{\pi\cdot 2^2}{2}=2\pi$.`,
        String.raw`$S=8+2\pi\approx 14.28$ מטרים רבועים.`,
      ],
    },
  ],
};

const e10: Exercise = {
  id: 'cge-10',
  level: 3,
  topicId: T,
  subtopicIds: ['diff-geometric-extrema', 'diff-trig-integral-extrema'],
  intro: String.raw`בחצי עיגול שמרכזו $O$, קוטרו $AB$ ורדיוסו $5$ חסום מלבן $KLMN$: הצלע $KL$ מונחת על הקוטר, והקודקודים $M$ ו-$N$ נמצאים על הקשת (ראו שרטוט). נסמן $OL=x$.`,
  diagram: { kind: 'geo', points: { A: [-5, 0], B: [5, 0], O: [0, 0], K: [-3, 0], L: [3, 0], M: [3, 4], N: [-3, 4], ...semi }, polygons: [SEMI, ['K', 'L', 'M', 'N']], segments: [{ from: 'O', to: 'M', dashed: true, label: '5' }, { from: 'O', to: 'L', label: 'x' }], dots: ['O'], hideNames: SEMI },
  solutionDiagram: { kind: 'geo', points: { A: [-5, 0], B: [5, 0], O: [0, 0], K: [-3.5355, 0], L: [3.5355, 0], M: [3.5355, 3.5355], N: [-3.5355, 3.5355], ...semi }, polygons: [SEMI, ['K', 'L', 'M', 'N']], segments: [{ from: 'O', to: 'M', dashed: true, label: '5' }], angles: [{ at: 'O', from: 'L', to: 'M', label: 'π/4' }], dots: ['O'], hideNames: SEMI },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזו פונקציה מתארת את שטח המלבן בתחום $0<x<5$?`,
      hints: [String.raw`$OM$ הוא רדיוס, והמשולש $OLM$ ישר זווית.`, String.raw`$LM=\sqrt{25-x^2}$, ומהסימטריה $KL=2x$.`],
      check: { kind: 'choice', options: [String.raw`$S(x)=x\sqrt{25-x^2}$`, String.raw`$S(x)=2x\sqrt{25-x^2}$`, String.raw`$S(x)=2x(25-x^2)$`, String.raw`$S(x)=2x\sqrt{5-x^2}$`], correct: 1 },
      short: String.raw`$LM=\sqrt{25-x^2}$ (פיתגורס במשולש $OLM$) ו-$KL=2x$, ולכן $S(x)=2x\sqrt{25-x^2}$.`,
      full: [
        String.raw`במשולש ישר הזווית $OLM$: $OL=x$, $OM=5$, ולכן $LM=\sqrt{25-x^2}$.`,
        String.raw`המלבן סימטרי ביחס לאנך לקוטר דרך $O$, ולכן $OK=OL=x$ ו-$KL=2x$.`,
        String.raw`$S(x)=KL\cdot LM=2x\sqrt{25-x^2}$, $0<x<5$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $x$ שעבורו שטח המלבן מקסימלי. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`גזרו לפי כלל המכפלה; $\left(\sqrt{25-x^2}\right)'=\dfrac{-x}{\sqrt{25-x^2}}$.`,
        String.raw`$S'(x)=2\sqrt{25-x^2}-\dfrac{2x^2}{\sqrt{25-x^2}}=\dfrac{50-4x^2}{\sqrt{25-x^2}}$.`,
      ],
      check: { kind: 'numeric', answer: 3.535533906, tol: 0.005, verify: R10 },
      short: String.raw`$S'(x)=\dfrac{50-4x^2}{\sqrt{25-x^2}}=0$ כאשר $x^2=12.5$, כלומר $x=\dfrac{5}{\sqrt2}\approx 3.54$; הנגזרת עוברת מחיובית לשלילית, ולכן זו נקודת מקסימום.`,
      full: [
        String.raw`$S'(x)=2\sqrt{25-x^2}+2x\cdot\dfrac{-x}{\sqrt{25-x^2}}=\dfrac{2(25-x^2)-2x^2}{\sqrt{25-x^2}}=\dfrac{50-4x^2}{\sqrt{25-x^2}}$.`,
        String.raw`$S'(x)=0\ \Rightarrow\ 4x^2=50\ \Rightarrow\ x=\sqrt{12.5}=\dfrac{5}{\sqrt2}\approx 3.54$ (כי $x>0$).`,
        String.raw`נימוק: המכנה חיובי, ולכן סימן הנגזרת כסימן $50-4x^2$: חיובי עבור $x<3.54$ ושלילי עבור $x>3.54$. לכן זו נקודת מקסימום.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את השטח המקסימלי של המלבן.`,
      hints: [String.raw`הציבו $x^2=12.5$ ב-$S(x)$.`],
      check: { kind: 'numeric', answer: 25, verify: `2*${R10}*sqrt(25-${R10}^2)` },
      short: String.raw`$S=2\cdot\sqrt{12.5}\cdot\sqrt{25-12.5}=2\cdot 12.5=25$.`,
      full: [String.raw`כאשר $x^2=12.5$: $LM=\sqrt{25-12.5}=\sqrt{12.5}$, כלומר $LM=x$.`, String.raw`$S=2x\cdot x=2x^2=2\cdot 12.5=25$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`אפשר לפתור את הבעיה גם בעזרת זווית. נסמן $\angle LOM=\alpha$, $0<\alpha<\dfrac{\pi}{2}$. איזו פונקציה מתארת את שטח המלבן?`,
      hints: [String.raw`במשולש ישר הזווית $OLM$ היתר הוא $OM=5$. הביעו את $OL$ ואת $LM$ באמצעות $\alpha$.`, String.raw`$OL=5\cos\alpha$, $LM=5\sin\alpha$, ו-$2\sin\alpha\cos\alpha=\sin 2\alpha$.`],
      check: { kind: 'choice', options: [String.raw`$S(\alpha)=25\sin 2\alpha$`, String.raw`$S(\alpha)=50\sin 2\alpha$`, String.raw`$S(\alpha)=25\sin\alpha$`, String.raw`$S(\alpha)=25\cos 2\alpha$`], correct: 0 },
      short: String.raw`$S=2\cdot 5\cos\alpha\cdot 5\sin\alpha=50\sin\alpha\cos\alpha=25\sin 2\alpha$, והמקסימום $25$ מתקבל ב-$\alpha=\dfrac{\pi}{4}$.`,
      full: [
        String.raw`$OL=5\cos\alpha$ ו-$LM=5\sin\alpha$, ולכן $S(\alpha)=2\cdot OL\cdot LM=50\sin\alpha\cos\alpha=25\sin 2\alpha$.`,
        String.raw`$S'(\alpha)=50\cos 2\alpha=0\ \Rightarrow\ 2\alpha=\dfrac{\pi}{2}\ \Rightarrow\ \alpha=\dfrac{\pi}{4}$; הנגזרת עוברת שם מחיובית לשלילית, ולכן זו נקודת מקסימום.`,
        String.raw`$S\left(\dfrac{\pi}{4}\right)=25$, ו-$x=5\cos\dfrac{\pi}{4}=\dfrac{5}{\sqrt2}$, בדיוק כמו בסעיפים ב ו-ג. הפעם בלי לגזור שורש.`,
      ],
    },
  ],
};

const e11: Exercise = {
  id: 'cge-11',
  level: 3,
  topicId: T,
  subtopicIds: GRAPH,
  intro: String.raw`נתונה הפונקציה $f(x)=\sqrt{12-x}$. $P$ היא נקודה על גרף הפונקציה ברביע הראשון. מהנקודה $P$ מורידים אנכים לצירים: $A$ על ציר ה-$x$ ו-$B$ על ציר ה-$y$, כך שנוצר מלבן $OAPB$ ($O$ ראשית הצירים; ראו שרטוט). נסמן ב-$x$ את שיעור ה-$x$ של $P$.`,
  diagram: { kind: 'plot', xRange: [-1, 13], functions: [{ expr: 'sqrt(12-x)', label: 'f', domain: [-1, 12] }], shade: [{ between: '3', from: 0, to: 3 }], points: [{ x: 3, y: 3, label: 'P' }, { x: 3, y: 0, label: 'A' }, { x: 0, y: 3, label: 'B' }] },
  solutionDiagram: { kind: 'plot', xRange: [-1, 13], functions: [{ expr: 'sqrt(12-x)', label: 'f', domain: [-1, 12] }], shade: [{ between: '2', from: 0, to: 8 }], points: [{ x: 8, y: 2, label: 'P(8, 2)' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזו פונקציה מתארת את שטח המלבן $OAPB$, ומהו התחום של $x$?`,
      hints: [String.raw`צלעות המלבן הן שיעור ה-$x$ ושיעור ה-$y$ של $P$.`, String.raw`$P$ ברביע הראשון, ולכן $x>0$ וגם $\sqrt{12-x}>0$.`],
      check: { kind: 'choice', options: [String.raw`$S(x)=x\sqrt{12-x}$, $\;0<x<12$`, String.raw`$S(x)=\dfrac12x\sqrt{12-x}$, $\;0<x<12$`, String.raw`$S(x)=x\sqrt{12-x}$, $\;x>0$`, String.raw`$S(x)=2x+2\sqrt{12-x}$, $\;0<x<12$`], correct: 0 },
      short: String.raw`$OA=x$ ו-$AP=\sqrt{12-x}$, ולכן $S(x)=x\sqrt{12-x}$, בתחום $0<x<12$.`,
      full: [
        String.raw`$P\left(x,\sqrt{12-x}\right)$, ולכן $OA=x$ ו-$AP=\sqrt{12-x}$.`,
        String.raw`$S(x)=OA\cdot AP=x\sqrt{12-x}$.`,
        String.raw`$P$ ברביע הראשון: $x>0$ וגם $\sqrt{12-x}>0$, כלומר $0<x<12$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $x$ שעבורו שטח המלבן מקסימלי.`,
      hints: [String.raw`גזרו לפי כלל המכפלה; $\left(\sqrt{12-x}\right)'=\dfrac{-1}{2\sqrt{12-x}}$.`, String.raw`$S'(x)=\sqrt{12-x}-\dfrac{x}{2\sqrt{12-x}}=\dfrac{24-3x}{2\sqrt{12-x}}$.`],
      check: { kind: 'numeric', answer: 8, verify: R11 },
      short: String.raw`$S'(x)=\dfrac{24-3x}{2\sqrt{12-x}}=0$ כאשר $x=8$; הנגזרת עוברת מחיובית לשלילית, ולכן זו נקודת מקסימום.`,
      full: [
        String.raw`$S'(x)=\sqrt{12-x}+x\cdot\dfrac{-1}{2\sqrt{12-x}}=\dfrac{2(12-x)-x}{2\sqrt{12-x}}=\dfrac{24-3x}{2\sqrt{12-x}}$.`,
        String.raw`$S'(x)=0\ \Rightarrow\ 24-3x=0\ \Rightarrow\ x=8$, והוא בתחום.`,
        String.raw`נימוק: המכנה חיובי, ולכן $S'>0$ עבור $x<8$ ו-$S'<0$ עבור $x>8$. לכן $x=8$ היא נקודת מקסימום.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את השטח המקסימלי של המלבן.`,
      hints: [String.raw`הציבו את ה-$x$ שמצאתם ב-$S(x)$.`],
      check: { kind: 'numeric', answer: 16, verify: `${R11}*sqrt(12-${R11})` },
      short: String.raw`$S(8)=8\cdot\sqrt{4}=16$.`,
      full: [String.raw`כאשר $x=8$: $P(8,2)$, כי $\sqrt{12-8}=2$.`, String.raw`$S(8)=8\cdot 2=16$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`כעת בוחנים את היקף המלבן $OAPB$. מצאו את ההיקף המקסימלי.`,
      hints: [
        String.raw`היקף המלבן: $Q(x)=2x+2\sqrt{12-x}$, באותו תחום $0<x<12$.`,
        String.raw`$Q'(x)=2-\dfrac{1}{\sqrt{12-x}}$.`,
        String.raw`הנגזרת מתאפסת כאשר $\sqrt{12-x}=\dfrac12$, כלומר $12-x=\dfrac14$.`,
      ],
      check: { kind: 'numeric', answer: 24.5, verify: `2*${R11P}+2*sqrt(12-${R11P})` },
      short: String.raw`$Q'(x)=2-\dfrac{1}{\sqrt{12-x}}=0$ כאשר $x=11.75$, ואז $Q=2\cdot 11.75+2\cdot 0.5=24.5$ (מקסימום: הנגזרת עוברת מחיובית לשלילית).`,
      full: [
        String.raw`$Q(x)=2\cdot OA+2\cdot AP=2x+2\sqrt{12-x}$, $0<x<12$.`,
        String.raw`$Q'(x)=2+2\cdot\dfrac{-1}{2\sqrt{12-x}}=2-\dfrac{1}{\sqrt{12-x}}$.`,
        String.raw`$Q'(x)=0\ \Rightarrow\ \sqrt{12-x}=\dfrac12\ \Rightarrow\ 12-x=\dfrac14\ \Rightarrow\ x=11.75$.`,
        String.raw`נימוק: עבור $x<11.75$ מתקיים $\sqrt{12-x}>\dfrac12$ ולכן $Q'>0$; עבור $x>11.75$ מתקיים $Q'<0$. לכן זו נקודת מקסימום.`,
        String.raw`$Q(11.75)=23.5+2\cdot 0.5=24.5$. המלבן בעל ההיקף המקסימלי ($11.75\times 0.5$) שונה מאוד מהמלבן בעל השטח המקסימלי ($8\times 2$).`,
      ],
    },
  ],
};

const e12: Exercise = {
  id: 'cge-12',
  level: 3,
  topicId: T,
  subtopicIds: TRIG,
  intro: String.raw`בטרפז שווה שוקיים $ABCD$ ($AB\parallel DC$) נתון $AD=AB=BC=10$. נסמן ב-$\alpha$ את זווית הבסיס $\angle ADC=\angle BCD$ (ברדיאנים), כאשר $0<\alpha<\dfrac{\pi}{2}$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { D: [0, 0], C: [24.1421, 0], B: [17.0711, 7.0711], A: [7.0711, 7.0711] }, polygons: [['D', 'C', 'B', 'A']], segments: [{ from: 'A', to: 'B', label: '10' }, { from: 'D', to: 'A', label: '10' }, { from: 'C', to: 'B', label: '10' }], angles: [{ at: 'D', from: 'C', to: 'A', label: 'α' }, { at: 'C', from: 'D', to: 'B', label: 'α' }] },
  solutionDiagram: { kind: 'geo', points: { D: [0, 0], C: [20, 0], B: [15, 8.6603], A: [5, 8.6603], E: [5, 0], F: [15, 0] }, polygons: [['D', 'C', 'B', 'A']], segments: [{ from: 'A', to: 'B', label: '10' }, { from: 'D', to: 'A', label: '10' }, { from: 'A', to: 'E', dashed: true }, { from: 'B', to: 'F', dashed: true }], angles: [{ at: 'D', from: 'C', to: 'A', label: 'π/3' }, { at: 'E', from: 'A', to: 'D', right: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הביעו את שטח הטרפז באמצעות $\alpha$.`,
      hints: [String.raw`הורידו גבהים $AE$ ו-$BF$ לבסיס $DC$. במשולש ישר הזווית $ADE$: $AE=10\sin\alpha$ ו-$DE=10\cos\alpha$.`, String.raw`$DC=10+2\cdot 10\cos\alpha$, ושטח טרפז הוא $\dfrac{(AB+DC)\cdot AE}{2}$.`],
      check: { kind: 'choice', options: [String.raw`$S(\alpha)=100\sin\alpha(1+\cos\alpha)$`, String.raw`$S(\alpha)=100\sin\alpha(1+2\cos\alpha)$`, String.raw`$S(\alpha)=50\sin\alpha(1+\cos\alpha)$`, String.raw`$S(\alpha)=100\cos\alpha(1+\sin\alpha)$`], correct: 0 },
      short: String.raw`גובה $10\sin\alpha$ ובסיס גדול $10+20\cos\alpha$: $S(\alpha)=\dfrac{(20+20\cos\alpha)\cdot 10\sin\alpha}{2}=100\sin\alpha(1+\cos\alpha)$.`,
      full: [
        String.raw`מורידים גבהים $AE$ ו-$BF$ לבסיס $DC$. במשולש $ADE$: $AE=10\sin\alpha$, $DE=10\cos\alpha$, ובאותו אופן $FC=10\cos\alpha$.`,
        String.raw`$EF=AB=10$, ולכן $DC=10+20\cos\alpha$.`,
        String.raw`$S(\alpha)=\dfrac{(AB+DC)\cdot AE}{2}=\dfrac{(20+20\cos\alpha)\cdot 10\sin\alpha}{2}=100\sin\alpha(1+\cos\alpha)$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $\alpha$ (ברדיאנים) שעבורה שטח הטרפז מקסימלי. (${ROUND})`,
      hints: [
        String.raw`גזרו לפי כלל המכפלה: $S'(\alpha)=100\left[\cos\alpha(1+\cos\alpha)-\sin^2\alpha\right]$.`,
        String.raw`הציבו $\sin^2\alpha=1-\cos^2\alpha$ וקבלו משוואה ריבועית ב-$\cos\alpha$.`,
        String.raw`$2\cos^2\alpha+\cos\alpha-1=0$, כלומר $(2\cos\alpha-1)(\cos\alpha+1)=0$.`,
      ],
      check: { kind: 'numeric', answer: 1.047197551, tol: 0.005, verify: R12 },
      short: String.raw`$S'(\alpha)=100(2\cos\alpha-1)(\cos\alpha+1)=0$ כאשר $\cos\alpha=\dfrac12$, כלומר $\alpha=\dfrac{\pi}{3}\approx 1.05$; הנגזרת עוברת מחיובית לשלילית, ולכן זו נקודת מקסימום.`,
      full: [
        String.raw`$S'(\alpha)=100\left[\cos\alpha(1+\cos\alpha)+\sin\alpha\cdot(-\sin\alpha)\right]=100\left[\cos\alpha+\cos^2\alpha-\sin^2\alpha\right]$.`,
        String.raw`מציבים $\sin^2\alpha=1-\cos^2\alpha$: $S'(\alpha)=100\left[2\cos^2\alpha+\cos\alpha-1\right]=100(2\cos\alpha-1)(\cos\alpha+1)$.`,
        String.raw`בתחום $0<\alpha<\dfrac{\pi}{2}$ מתקיים $\cos\alpha+1>0$, ולכן $S'(\alpha)=0$ רק כאשר $\cos\alpha=\dfrac12$, כלומר $\alpha=\dfrac{\pi}{3}$.`,
        String.raw`נימוק: עבור $\alpha<\dfrac{\pi}{3}$ מתקיים $\cos\alpha>\dfrac12$ ולכן $S'>0$; עבור $\alpha>\dfrac{\pi}{3}$ מתקיים $S'<0$. לכן זו נקודת מקסימום.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את השטח המקסימלי של הטרפז. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`הציבו את ה-$\alpha$ שמצאתם ב-$S(\alpha)$.`, String.raw`$\sin\dfrac{\pi}{3}=\dfrac{\sqrt3}{2}$ ו-$\cos\dfrac{\pi}{3}=\dfrac12$.`],
      check: { kind: 'numeric', answer: 129.9038106, verify: `100*sin(${R12})*(1+cos(${R12}))` },
      short: String.raw`$S\left(\dfrac{\pi}{3}\right)=100\cdot\dfrac{\sqrt3}{2}\cdot\dfrac32=75\sqrt3\approx 129.90$.`,
      full: [
        String.raw`$S\left(\dfrac{\pi}{3}\right)=100\cdot\sin\dfrac{\pi}{3}\cdot\left(1+\cos\dfrac{\pi}{3}\right)=100\cdot\dfrac{\sqrt3}{2}\cdot\dfrac32=75\sqrt3\approx 129.90$.`,
        String.raw`השוואה לקצה התחום: כאשר $\alpha\to\dfrac{\pi}{2}$ הטרפז שואף לריבוע ששטחו $100$, וכאשר $\alpha\to 0$ השטח שואף ל-$0$. שניהם קטנים מ-$129.90$.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`מצאו את אורך הבסיס $DC$ בטרפז ששטחו מקסימלי.`,
      hints: [String.raw`$DC=10+20\cos\alpha$.`],
      check: { kind: 'numeric', answer: 20, verify: `10+20*cos(${R12})` },
      short: String.raw`$DC=10+20\cos\dfrac{\pi}{3}=10+10=20$.`,
      full: [String.raw`$DC=10+20\cos\alpha$, ועבור $\alpha=\dfrac{\pi}{3}$: $DC=10+20\cdot\dfrac12=20$.`, String.raw`בטרפז המקסימלי הבסיס הגדול ארוך פי שניים מכל אחת משלוש הצלעות האחרות (זהו חצי משושה משוכלל).`],
    },
  ],
};

export const calcGeometricExtrema: ExerciseSet = {
  id: 'calc-geometric-extrema',
  questionnaire: '35581',
  title: 'בעיות קיצון גאומטריות וטריגונומטריות',
  topicIds: ['differential-calculus'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
