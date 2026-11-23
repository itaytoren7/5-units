import type { DiagramSpec, Exercise, ExerciseSet, Pt } from './types';

/**
 * סט: מרחקים וזווית בין מישורים (שאלון 35582, שאלה 2 – וקטורים במרחב).
 * 1–4 צעד אחד · 5–8 שלושה סעיפים · 9–12 שאלות בסגנון בגרות.
 * השרטוטים מסוג geo סכמטיים בלבד (לא בקנה מידה).
 */

const T = 'vectors';
const DIST = 'vec-distances';
const ANG = 'vec-planes-angle';

/** A plane drawn as a parallelogram (schematic). */
const PLANE: Record<string, Pt> = { K: [0, 0], L: [7, 0], N: [9.5, 3], R: [2.5, 3] };
const PLANE_NAMES = ['K', 'L', 'N', 'R'];

/** Two intersecting planes with the angle between them (schematic). */
const TWO_PLANES: DiagramSpec = {
  kind: 'geo',
  points: { K: [0, 0], L: [6, 0], N: [9, 3], R: [3, 3], U: [1.5, 1.5], V: [7.5, 1.5], W: [6.5, 4.8], Z: [0.5, 4.8], J: [4.5, 1.5], J1: [5.7, 2.7], J2: [4.1, 2.82] },
  polygons: [['K', 'L', 'N', 'R'], ['U', 'V', 'W', 'Z']],
  segments: [['J', 'J1'], ['J', 'J2']],
  angles: [{ at: 'J', from: 'J1', to: 'J2', label: 'α' }],
  hideNames: ['K', 'L', 'N', 'R', 'U', 'V', 'W', 'Z', 'J', 'J1', 'J2'],
  labels: [{ at: 'L', text: 'π₁', dx: -14, dy: -10 }, { at: 'W', text: 'π₂', dx: -14, dy: 12 }],
};

const e1: Exercise = {
  id: 'vds-1',
  level: 1,
  topicId: T,
  subtopicIds: [DIST],
  intro: String.raw`נתונים המישור $\pi:\ 2x-y+2z-5=0$ והנקודה $A(3,-1,2)$ (ראו שרטוט סכמטי).`,
  diagram: {
    kind: 'geo',
    points: { ...PLANE, H: [5, 1.5], X: [6.3, 1.5], A: [5, 5.2] },
    polygons: [PLANE_NAMES],
    segments: [{ from: 'A', to: 'H', dashed: true }],
    angles: [{ at: 'H', from: 'A', to: 'X', right: true }],
    hideNames: [...PLANE_NAMES, 'H', 'X'],
    dots: ['A', 'H'],
    labels: [{ at: 'L', text: 'π', dx: -16, dy: -10 }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את מרחק הנקודה $A$ מהמישור $\pi$.`,
      hints: [
        String.raw`מרחק נקודה ממישור: מציבים את הנקודה באגף שמאל של משוואת המישור, לוקחים ערך מוחלט ומחלקים באורך וקטור הנורמל.`,
        String.raw`$d=\dfrac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}$, כאשר $(A,B,C)=(2,-1,2)$ ו-$D=-5$.`,
      ],
      check: { kind: 'numeric', answer: 2, verify: 'abs(dot([2,-1,2],[3,-1,2])-5)/norm([2,-1,2])' },
      short: String.raw`$d=\dfrac{|2\cdot 3-(-1)+2\cdot 2-5|}{\sqrt{4+1+4}}=\dfrac63=2$.`,
      full: [
        String.raw`מרחק הנקודה $(x_0,y_0,z_0)$ מהמישור $Ax+By+Cz+D=0$: $d=\dfrac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}$.`,
        String.raw`מונה: $|2\cdot 3-(-1)+2\cdot 2-5|=|6+1+4-5|=6$.`,
        String.raw`מכנה: $\sqrt{2^2+(-1)^2+2^2}=\sqrt9=3$.`,
        String.raw`$d=\dfrac63=2$.`,
      ],
    },
  ],
};

const e2: Exercise = {
  id: 'vds-2',
  level: 1,
  topicId: T,
  subtopicIds: [DIST, 'vec-plane'],
  intro: String.raw`נתונים המישורים המקבילים $\pi_1:\ x+2y-2z+3=0$ ו-$\pi_2:\ x+2y-2z-9=0$ (ראו שרטוט סכמטי).`,
  diagram: {
    kind: 'geo',
    points: { ...PLANE, K2: [0, 4], L2: [7, 4], N2: [9.5, 7], R2: [2.5, 7], H1: [4.5, 1.5], H2: [4.5, 5.5] },
    polygons: [PLANE_NAMES, ['K2', 'L2', 'N2', 'R2']],
    segments: [{ from: 'H1', to: 'H2', dashed: true }],
    hideNames: [...PLANE_NAMES, 'K2', 'L2', 'N2', 'R2', 'H1', 'H2'],
    dots: ['H1', 'H2'],
    labels: [{ at: 'L', text: 'π₁', dx: -16, dy: -10 }, { at: 'L2', text: 'π₂', dx: -16, dy: -10 }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את המרחק בין שני המישורים.`,
      hints: [
        String.raw`בחרו נקודה כלשהי על אחד המישורים וחשבו את מרחקה מהמישור האחר.`,
        String.raw`למשל, הנקודה $(-3,0,0)$ נמצאת על $\pi_1$. חשבו את מרחקה מ-$\pi_2$.`,
      ],
      check: { kind: 'numeric', answer: 4, verify: 'abs(dot([1,2,-2],[-3,0,0])-9)/norm([1,2,-2])' },
      short: String.raw`הנקודה $(-3,0,0)$ על $\pi_1$; מרחקה מ-$\pi_2$: $\dfrac{|-3-9|}{\sqrt{1+4+4}}=\dfrac{12}{3}=4$.`,
      full: [
        String.raw`המישורים מקבילים (אותו נורמל $(1,2,-2)$), ולכן המרחק ביניהם שווה למרחק של נקודה כלשהי על האחד מן האחר.`,
        String.raw`נקודה על $\pi_1$: מציבים $y=z=0$ ומקבלים $x=-3$, כלומר $(-3,0,0)$.`,
        String.raw`מרחקה מ-$\pi_2$: $d=\dfrac{|-3+2\cdot 0-2\cdot 0-9|}{\sqrt{1^2+2^2+(-2)^2}}=\dfrac{12}{3}=4$.`,
        String.raw`דרך קצרה: כשהמקדמים $A,B,C$ זהים, $d=\dfrac{|D_1-D_2|}{\sqrt{A^2+B^2+C^2}}=\dfrac{|3-(-9)|}{3}=4$.`,
      ],
    },
  ],
};

const e3: Exercise = {
  id: 'vds-3',
  level: 1,
  topicId: T,
  subtopicIds: [ANG],
  intro: String.raw`נתונים המישורים $\pi_1:\ x+z-3=0$ ו-$\pi_2:\ y+z+1=0$ (ראו שרטוט סכמטי).`,
  diagram: TWO_PLANES,
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את הזווית בין שני המישורים (במעלות).`,
      hints: [
        String.raw`הזווית בין שני מישורים שווה לזווית החדה שבין וקטורי הנורמל שלהם.`,
        String.raw`$\vec n_1=(1,0,1)$, $\vec n_2=(0,1,1)$, ו-$\cos\alpha=\dfrac{|\vec n_1\cdot\vec n_2|}{|\vec n_1|\,|\vec n_2|}$.`,
      ],
      check: { kind: 'numeric', answer: 60, tol: 0.05, verify: 'acos(abs(dot([1,0,1],[0,1,1]))/(norm([1,0,1])*norm([0,1,1])))*180/pi' },
      short: String.raw`$\cos\alpha=\dfrac{|1|}{\sqrt2\cdot\sqrt2}=\dfrac12$, ולכן $\alpha=60^\circ$.`,
      full: [
        String.raw`הנורמלים: $\vec n_1=(1,0,1)$ (אין $y$ במשוואה), $\vec n_2=(0,1,1)$ (אין $x$ במשוואה).`,
        String.raw`$\vec n_1\cdot\vec n_2=1\cdot 0+0\cdot 1+1\cdot 1=1$, $|\vec n_1|=|\vec n_2|=\sqrt2$.`,
        String.raw`$\cos\alpha=\dfrac{|\vec n_1\cdot\vec n_2|}{|\vec n_1|\,|\vec n_2|}=\dfrac{1}{2}$.`,
        String.raw`$\alpha=60^\circ$.`,
      ],
    },
  ],
};

const e4: Exercise = {
  id: 'vds-4',
  level: 1,
  topicId: T,
  subtopicIds: [DIST, 'vec-plane'],
  intro: String.raw`הישר $\ell:\ \underline{x}=(1,-1,1)+t(1,2,2)$ מקביל למישור $\pi:\ 2x-2y+z-20=0$ (ראו שרטוט סכמטי).`,
  diagram: {
    kind: 'geo',
    points: { ...PLANE, E: [1.5, 4.8], G: [8.5, 4.8], P: [5, 4.8], H: [5, 1.5], X: [6.3, 1.5] },
    polygons: [PLANE_NAMES],
    segments: [['E', 'G'], { from: 'P', to: 'H', dashed: true }],
    angles: [{ at: 'H', from: 'P', to: 'X', right: true }],
    hideNames: [...PLANE_NAMES, 'E', 'G', 'P', 'H', 'X'],
    dots: ['P', 'H'],
    labels: [{ at: 'L', text: 'π', dx: -16, dy: -10 }, { at: 'G', text: 'ℓ', dx: 4, dy: -12 }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את המרחק בין הישר $\ell$ למישור $\pi$.`,
      hints: [
        String.raw`כשישר מקביל למישור, כל נקודותיו נמצאות באותו מרחק מהמישור.`,
        String.raw`בחרו את הנקודה $(1,-1,1)$ שעל הישר וחשבו את מרחקה מהמישור.`,
      ],
      check: { kind: 'numeric', answer: 5, verify: 'abs(dot([2,-2,1],[1,-1,1])-20)/norm([2,-2,1])' },
      short: String.raw`מרחק $(1,-1,1)$ מהמישור: $\dfrac{|2+2+1-20|}{\sqrt{4+4+1}}=\dfrac{15}{3}=5$.`,
      full: [
        String.raw`בדיקת הנתון: $(1,2,2)\cdot(2,-2,1)=2-4+2=0$, כלומר כיוון הישר מאונך לנורמל, והישר אכן מקביל למישור.`,
        String.raw`לכן המרחק בין הישר למישור שווה למרחק של נקודה כלשהי על הישר מהמישור. ניקח את $(1,-1,1)$.`,
        String.raw`$d=\dfrac{|2\cdot 1-2\cdot(-1)+1-20|}{\sqrt{2^2+(-2)^2+1^2}}=\dfrac{|-15|}{3}=5$.`,
      ],
    },
  ],
};

const d5: DiagramSpec = {
  kind: 'geo',
  points: { P: [-1.5, -0.5], Q: [10.5, 3.5], B: [3, 1], A: [1.7, 4.9] },
  segments: [['P', 'Q'], { from: 'A', to: 'B', dashed: true }],
  angles: [{ at: 'B', from: 'A', to: 'Q', right: true }],
  hideNames: ['P', 'Q'],
  dots: ['A', 'B'],
  labels: [{ at: 'Q', text: 'ℓ', dx: 0, dy: -12 }],
};

const e5: Exercise = {
  id: 'vds-5',
  level: 2,
  topicId: T,
  subtopicIds: [DIST, 'vec-line', 'vec-dot-product', 'vec-point-distance'],
  intro: String.raw`נתונים הישר $\ell:\ \underline{x}=(1,0,2)+t(2,1,-2)$ והנקודה $A(5,5,4)$. $B$ היא הנקודה על $\ell$ שעבורה $AB\perp\ell$ (ראו שרטוט סכמטי).`,
  diagram: d5,
  solutionDiagram: {
    kind: 'geo',
    points: { C: [0, 0], D: [9, 3], B: [3, 1], A: [1.7, 4.9] },
    polygons: [['A', 'C', 'D']],
    segments: [{ from: 'A', to: 'B', dashed: true, accent: true, label: '6' }],
    angles: [{ at: 'B', from: 'A', to: 'D', right: true }],
    dots: ['A', 'B', 'C', 'D'],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את ערך הפרמטר $t$ המתאים לנקודה $B$.`,
      hints: [
        String.raw`כתבו נקודה כללית על הישר, $B(1+2t,\ t,\ 2-2t)$, ואת הווקטור $\overrightarrow{AB}$.`,
        String.raw`$\overrightarrow{AB}$ מאונך לווקטור הכיוון של הישר: $\overrightarrow{AB}\cdot(2,1,-2)=0$.`,
      ],
      check: { kind: 'numeric', answer: 1, verify: 'dot([5-1,5-0,4-2],[2,1,-2])/dot([2,1,-2],[2,1,-2])' },
      short: String.raw`$\overrightarrow{AB}=(2t-4,\ t-5,\ -2t-2)$; $\overrightarrow{AB}\cdot(2,1,-2)=9t-9=0$, ולכן $t=1$.`,
      full: [
        String.raw`נקודה כללית על הישר: $B(1+2t,\ t,\ 2-2t)$.`,
        String.raw`$\overrightarrow{AB}=(1+2t-5,\ t-5,\ 2-2t-4)=(2t-4,\ t-5,\ -2t-2)$.`,
        String.raw`תנאי הניצבות: $\overrightarrow{AB}\cdot(2,1,-2)=2(2t-4)+(t-5)-2(-2t-2)=9t-9=0$.`,
        String.raw`$t=1$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את מרחק הנקודה $A$ מהישר $\ell$.`,
      hints: [String.raw`מרחק נקודה מישר הוא אורך האנך מהנקודה לישר, כלומר $|AB|$.`, String.raw`הציבו $t=1$ כדי למצוא את $B$, וחשבו את $|\overrightarrow{AB}|$.`],
      check: { kind: 'numeric', answer: 6, verify: 'sqrt(norm([5-1,5-0,4-2])^2-(dot([5-1,5-0,4-2],[2,1,-2])/norm([2,1,-2]))^2)' },
      short: String.raw`$B(3,1,0)$, $\overrightarrow{AB}=(-2,-4,-4)$, ולכן המרחק $\sqrt{4+16+16}=6$.`,
      full: [
        String.raw`עבור $t=1$: $B(3,1,0)$.`,
        String.raw`$\overrightarrow{AB}=(3-5,\ 1-5,\ 0-4)=(-2,-4,-4)$.`,
        String.raw`$|AB|=\sqrt{4+16+16}=\sqrt{36}=6$. זה מרחק $A$ מהישר.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`הנקודות $C(1,0,2)$ ו-$D(7,3,-4)$ נמצאות על $\ell$. חשבו את שטח המשולש $ACD$.`,
      hints: [String.raw`הצלע $CD$ מונחת על הישר $\ell$. מהו הגובה לצלע זו במשולש $ACD$?`, String.raw`$S=\dfrac12\cdot CD\cdot AB$, ו-$CD=|(6,3,-6)|$.`],
      check: { kind: 'numeric', answer: 27, verify: '0.5*sqrt(norm([5-1,5-0,4-2])^2*norm([7-1,3-0,-4-2])^2-dot([5-1,5-0,4-2],[7-1,3-0,-4-2])^2)' },
      short: String.raw`$CD=\sqrt{36+9+36}=9$ והגובה אליה $AB=6$, ולכן $S=\dfrac12\cdot 9\cdot 6=27$.`,
      full: [
        String.raw`$C$ ו-$D$ על $\ell$ ($t=0$ ו-$t=3$), ולכן הגובה מ-$A$ לצלע $CD$ הוא האנך $AB$ שאורכו $6$.`,
        String.raw`$\overrightarrow{CD}=(6,3,-6)$, $CD=\sqrt{36+9+36}=9$.`,
        String.raw`$S_{ACD}=\dfrac12\cdot CD\cdot AB=\dfrac12\cdot 9\cdot 6=27$.`,
      ],
    },
  ],
};

const LINES6: Record<string, Pt> = { S1: [0, 0], S2: [8, 2], T1: [-0.8, 3.2], T2: [7.2, 5.2], Q: [4, 4.4], P: [4.8, 1.2] };

const e6: Exercise = {
  id: 'vds-6',
  level: 2,
  topicId: T,
  subtopicIds: [DIST, 'vec-line', 'vec-dot-product', 'vec-point-distance'],
  intro: String.raw`נתונים הישרים המקבילים $\ell_1:\ \underline{x}=(-1,3,-3)+t(2,-1,2)$ ו-$\ell_2:\ \underline{x}=(5,3,0)+s(-4,2,-4)$. הנקודה $Q(5,3,0)$ נמצאת על $\ell_2$, ו-$P$ היא הנקודה על $\ell_1$ שעבורה $PQ\perp\ell_1$ (ראו שרטוט סכמטי).`,
  diagram: {
    kind: 'geo',
    points: LINES6,
    segments: [['S1', 'S2'], ['T1', 'T2'], { from: 'P', to: 'Q', dashed: true }],
    angles: [{ at: 'P', from: 'Q', to: 'S2', right: true }],
    hideNames: ['S1', 'S2', 'T1', 'T2'],
    dots: ['P', 'Q'],
    labels: [{ at: 'S2', text: 'ℓ₁', dx: 6, dy: 12 }, { at: 'T2', text: 'ℓ₂', dx: 6, dy: -12 }],
  },
  solutionDiagram: {
    kind: 'geo',
    points: { ...LINES6, R: [-0.27, 3.33] },
    segments: [['S1', 'S2'], ['T1', 'T2'], { from: 'P', to: 'Q', dashed: true, label: '3' }, { from: 'P', to: 'R', accent: true, label: '5' }],
    angles: [{ at: 'Q', from: 'P', to: 'R', right: true }],
    hideNames: ['S1', 'S2', 'T1', 'T2'],
    dots: ['P', 'Q', 'R'],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את ערך הפרמטר $t$ המתאים לנקודה $P$.`,
      hints: [
        String.raw`כתבו נקודה כללית על $\ell_1$: $P(-1+2t,\ 3-t,\ -3+2t)$, ואת הווקטור $\overrightarrow{QP}$.`,
        String.raw`דרשו $\overrightarrow{QP}\cdot(2,-1,2)=0$.`,
      ],
      check: { kind: 'numeric', answer: 2, verify: 'dot([5+1,3-3,0+3],[2,-1,2])/dot([2,-1,2],[2,-1,2])' },
      short: String.raw`$\overrightarrow{QP}=(2t-6,\ -t,\ 2t-3)$; $\overrightarrow{QP}\cdot(2,-1,2)=9t-18=0$, ולכן $t=2$.`,
      full: [
        String.raw`נקודה כללית על $\ell_1$: $P(-1+2t,\ 3-t,\ -3+2t)$.`,
        String.raw`$\overrightarrow{QP}=(-1+2t-5,\ 3-t-3,\ -3+2t-0)=(2t-6,\ -t,\ 2t-3)$.`,
        String.raw`$\overrightarrow{QP}\cdot(2,-1,2)=2(2t-6)+t+2(2t-3)=9t-18=0$.`,
        String.raw`$t=2$, כלומר $P(3,1,1)$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את המרחק בין הישרים $\ell_1$ ו-$\ell_2$.`,
      hints: [String.raw`המרחק בין ישרים מקבילים שווה למרחק של נקודה על האחד מהישר האחר.`, String.raw`המרחק הוא $|PQ|$, כאשר $P(3,1,1)$ ו-$Q(5,3,0)$.`],
      check: { kind: 'numeric', answer: 3, verify: 'sqrt(norm([5+1,3-3,0+3])^2-(dot([5+1,3-3,0+3],[2,-1,2])/norm([2,-1,2]))^2)' },
      short: String.raw`$\overrightarrow{PQ}=(2,2,-1)$, ולכן המרחק $\sqrt{4+4+1}=3$.`,
      full: [
        String.raw`$PQ$ מאונך ל-$\ell_1$, ו-$Q$ על $\ell_2$, ולכן המרחק בין הישרים המקבילים הוא $|PQ|$.`,
        String.raw`$\overrightarrow{PQ}=(5-3,\ 3-1,\ 0-1)=(2,2,-1)$.`,
        String.raw`$|PQ|=\sqrt{4+4+1}=3$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`הנקודה $R$ נמצאת על $\ell_2$, ומרחקה מהנקודה $P$ הוא $5$. חשבו את אורך הקטע $QR$.`,
      hints: [String.raw`$PQ$ מאונך ל-$\ell_1$, והישרים מקבילים. מה אפשר לומר על הזווית $PQR$?`, String.raw`המשולש $PQR$ ישר זווית ב-$Q$: $QR^2=PR^2-PQ^2$.`],
      check: { kind: 'numeric', answer: 4, verify: 'sqrt(5^2-(norm([5+1,3-3,0+3])^2-(dot([5+1,3-3,0+3],[2,-1,2])/norm([2,-1,2]))^2))' },
      short: String.raw`$PQ\perp\ell_2$, ולכן $QR=\sqrt{PR^2-PQ^2}=\sqrt{25-9}=4$.`,
      full: [
        String.raw`$PQ\perp\ell_1$ ו-$\ell_1\parallel\ell_2$, ולכן $PQ\perp\ell_2$. הקטע $QR$ מונח על $\ell_2$, ולכן $\angle PQR=90^\circ$.`,
        String.raw`לפי משפט פיתגורס במשולש $PQR$: $QR^2=PR^2-PQ^2=25-9=16$.`,
        String.raw`$QR=4$.`,
      ],
    },
  ],
};

const e7: Exercise = {
  id: 'vds-7',
  level: 2,
  topicId: T,
  subtopicIds: [DIST, 'vec-plane'],
  intro: String.raw`נתונים המישור $\pi_1:\ 2x+y-2z+4=0$ והנקודה $A(-3,-2,7)$ (ראו שרטוט סכמטי).`,
  diagram: {
    kind: 'geo',
    points: { ...PLANE, H: [5, 1.5], X: [6.3, 1.5], A: [5, 5.2] },
    polygons: [PLANE_NAMES],
    segments: [{ from: 'A', to: 'H', dashed: true }],
    angles: [{ at: 'H', from: 'A', to: 'X', right: true }],
    hideNames: [...PLANE_NAMES, 'H', 'X'],
    dots: ['A', 'H'],
    labels: [{ at: 'L', text: 'π₁', dx: -16, dy: -10 }],
  },
  solutionDiagram: {
    kind: 'geo',
    points: { K3: [0, 0], L3: [7, 0], N3: [9.5, 3], R3: [2.5, 3], K: [0, 3.5], L: [7, 3.5], N: [9.5, 6.5], R: [2.5, 6.5], K2: [0, 7], L2: [7, 7], N2: [9.5, 10], R2: [2.5, 10], A: [5, 8.5] },
    polygons: [['K3', 'L3', 'N3', 'R3'], ['K', 'L', 'N', 'R'], ['K2', 'L2', 'N2', 'R2']],
    hideNames: ['K3', 'L3', 'N3', 'R3', 'K', 'L', 'N', 'R', 'K2', 'L2', 'N2', 'R2'],
    dots: ['A'],
    labels: [{ at: 'L3', text: 'π₃', dx: -16, dy: -10 }, { at: 'L', text: 'π₁', dx: -16, dy: -10 }, { at: 'L2', text: 'π₂', dx: -16, dy: -10 }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את מרחק הנקודה $A$ מהמישור $\pi_1$.`,
      hints: [String.raw`השתמשו בנוסחת המרחק מנקודה למישור.`, String.raw`$d=\dfrac{|2\cdot(-3)+(-2)-2\cdot 7+4|}{\sqrt{2^2+1^2+(-2)^2}}$.`],
      check: { kind: 'numeric', answer: 6, verify: 'abs(dot([2,1,-2],[-3,-2,7])+4)/norm([2,1,-2])' },
      short: String.raw`$d=\dfrac{|-6-2-14+4|}{3}=\dfrac{18}{3}=6$.`,
      full: [String.raw`$d=\dfrac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}$ עם $(A,B,C)=(2,1,-2)$, $D=4$.`, String.raw`מונה: $|2\cdot(-3)+(-2)-2\cdot 7+4|=|-18|=18$. מכנה: $\sqrt{4+1+4}=3$.`, String.raw`$d=\dfrac{18}{3}=6$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`המישור $\pi_2$ מקביל ל-$\pi_1$ ועובר דרך $A$. משוואתו $2x+y-2z+d=0$. מצאו את $d$.`,
      hints: [String.raw`למישורים מקבילים אותו נורמל, ולכן רק האיבר החופשי משתנה.`, String.raw`הציבו את שיעורי $A$ במשוואה $2x+y-2z+d=0$.`],
      check: { kind: 'numeric', answer: 22, verify: '-dot([2,1,-2],[-3,-2,7])' },
      short: String.raw`$2\cdot(-3)+(-2)-2\cdot 7+d=0\ \Rightarrow\ d=22$.`,
      full: [String.raw`$A$ נמצאת על $\pi_2$, ולכן שיעוריה מקיימים את משוואתו.`, String.raw`$-6-2-14+d=0\ \Rightarrow\ d=22$.`, String.raw`$\pi_2:\ 2x+y-2z+22=0$. בדיקה: המרחק בין המישורים $\dfrac{|22-4|}{3}=6$, כמו בסעיף א.`],
    },
    {
      label: 'ג',
      prompt: String.raw`המישור $\pi_3:\ 2x+y-2z+m=0$ שונה מ-$\pi_2$, ומרחקו מ-$\pi_1$ הוא $6$. מצאו את $m$.`,
      hints: [String.raw`המרחק בין מישורים מקבילים בעלי אותם מקדמים: $\dfrac{|D_1-D_2|}{\sqrt{A^2+B^2+C^2}}$.`, String.raw`$\dfrac{|m-4|}{3}=6$. למשוואה שני פתרונות; אחד מהם שייך ל-$\pi_2$.`],
      check: { kind: 'numeric', answer: -14, verify: '4-6*norm([2,1,-2])' },
      short: String.raw`$|m-4|=18\ \Rightarrow\ m=22$ (זהו $\pi_2$) או $m=-14$. לכן $m=-14$.`,
      full: [
        String.raw`$\pi_3\parallel\pi_1$, והמרחק ביניהם: $\dfrac{|m-4|}{\sqrt{4+1+4}}=\dfrac{|m-4|}{3}$.`,
        String.raw`$\dfrac{|m-4|}{3}=6\ \Rightarrow\ |m-4|=18\ \Rightarrow\ m=22$ או $m=-14$.`,
        String.raw`$m=22$ הוא המישור $\pi_2$, ולכן $m=-14$: $\pi_3:\ 2x+y-2z-14=0$.`,
        String.raw`$\pi_2$ ו-$\pi_3$ נמצאים משני צידי $\pi_1$, במרחק $6$ ממנו.`,
      ],
    },
  ],
};

const e8: Exercise = {
  id: 'vds-8',
  level: 2,
  topicId: T,
  subtopicIds: [ANG, 'vec-plane', 'vec-dot-product'],
  intro: String.raw`נתונים המישור $\pi_1:\ x-2y+2z+5=0$ והמישור $\pi_2:\ \underline{x}=(1,0,2)+t(1,1,0)+s(0,1,1)$ (ראו שרטוט סכמטי).`,
  diagram: TWO_PLANES,
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזה מהווקטורים הבאים הוא נורמל למישור $\pi_2$?`,
      hints: [String.raw`נורמל למישור מאונך לכל וקטור במישור, ובפרט לשני וקטורי הכיוון $(1,1,0)$ ו-$(0,1,1)$.`, String.raw`סמנו $\vec n=(a,b,c)$ ודרשו $\vec n\cdot(1,1,0)=0$ וגם $\vec n\cdot(0,1,1)=0$.`],
      check: { kind: 'choice', options: [String.raw`$(1,1,1)$`, String.raw`$(1,-1,1)$`, String.raw`$(1,1,-1)$`, String.raw`$(1,0,1)$`], correct: 1 },
      short: String.raw`$a+b=0$ ו-$b+c=0$, ולכן $\vec n=(1,-1,1)$.`,
      full: [
        String.raw`נסמן $\vec n=(a,b,c)$. $\vec n\cdot(1,1,0)=a+b=0$ ו-$\vec n\cdot(0,1,1)=b+c=0$.`,
        String.raw`מכאן $b=-a$ ו-$c=-b=a$. בוחרים $a=1$: $\vec n=(1,-1,1)$.`,
        String.raw`בדיקה: $(1,-1,1)\cdot(1,1,0)=0$ ו-$(1,-1,1)\cdot(0,1,1)=0$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`משוואת המישור $\pi_2$ היא $x-y+z+d=0$. מצאו את $d$.`,
      hints: [String.raw`הנקודה $(1,0,2)$ נמצאת על המישור.`],
      check: { kind: 'numeric', answer: -3, verify: '-dot([1,-1,1],[1,0,2])' },
      short: String.raw`$1-0+2+d=0\ \Rightarrow\ d=-3$.`,
      full: [String.raw`הנקודה $(1,0,2)$ (המתקבלת עבור $t=s=0$) נמצאת על $\pi_2$.`, String.raw`$1-0+2+d=0\ \Rightarrow\ d=-3$.`, String.raw`$\pi_2:\ x-y+z-3=0$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את הזווית בין $\pi_1$ ל-$\pi_2$ (במעלות). עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`הזווית בין המישורים היא הזווית החדה בין הנורמלים $(1,-2,2)$ ו-$(1,-1,1)$.`, String.raw`$\cos\alpha=\dfrac{|1+2+2|}{3\cdot\sqrt3}$.`],
      check: { kind: 'numeric', answer: 15.79316905, tol: 0.05, verify: 'acos(abs(dot([1,-2,2],[1,-1,1]))/(norm([1,-2,2])*norm([1,-1,1])))*180/pi' },
      short: String.raw`$\cos\alpha=\dfrac{5}{3\sqrt3}\approx 0.9623$, ולכן $\alpha\approx 15.79^\circ$.`,
      full: [
        String.raw`$\vec n_1=(1,-2,2)$, $\vec n_2=(1,-1,1)$.`,
        String.raw`$\vec n_1\cdot\vec n_2=1+2+2=5$, $|\vec n_1|=\sqrt{1+4+4}=3$, $|\vec n_2|=\sqrt3$.`,
        String.raw`$\cos\alpha=\dfrac{|5|}{3\sqrt3}\approx 0.9623$.`,
        String.raw`$\alpha\approx 15.79^\circ$.`,
      ],
    },
  ],
};

const BOX_LABELS = ['A', 'B', 'C', 'D', "A'", "B'", "C'", "D'"];

const e9: Exercise = {
  id: 'vds-9',
  level: 3,
  topicId: T,
  subtopicIds: [DIST, ANG, 'vec-plane', 'vec-coordinate-system'],
  intro: String.raw`התיבה $ABCDA'B'C'D'$ מונחת במערכת צירים כך ש-$A(0,0,0)$, $B(6,0,0)$, $D(0,4,0)$ ו-$A'(0,0,2)$ (ראו שרטוט; בשרטוט מודגש המשולש $A'BD$).`,
  diagram: {
    kind: 'solid',
    shape: 'box',
    size: [6, 4, 2],
    labels: BOX_LABELS,
    highlightSegments: [["A'", 'B'], ['B', 'D'], ["A'", 'D']],
    segmentLabels: [{ from: 'A', to: 'B', text: '6' }, { from: 'B', to: 'C', text: '4' }, { from: 'C', to: "C'", text: '2' }],
  },
  solutionDiagram: { kind: 'solid', shape: 'box', size: [6, 4, 2], labels: BOX_LABELS, highlightSegments: [["A'", 'B'], ["B'", "D'"], ['B', 'D']] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מהי משוואת המישור $A'BD$?`,
      hints: [String.raw`מצאו נורמל $\vec n=(a,b,c)$ שמאונך לשני וקטורים במישור, למשל $\overrightarrow{A'B}$ ו-$\overrightarrow{A'D}$.`, String.raw`$\overrightarrow{A'B}=(6,0,-2)$, $\overrightarrow{A'D}=(0,4,-2)$: $6a-2c=0$ ו-$4b-2c=0$.`, String.raw`אפשר גם לבדוק כל תשובה על ידי הצבת שלוש הנקודות.`],
      check: { kind: 'choice', options: [String.raw`$3x+2y+6z-12=0$`, String.raw`$2x+3y+6z+12=0$`, String.raw`$6x+4y+2z-12=0$`, String.raw`$2x+3y+6z-12=0$`], correct: 3 },
      short: String.raw`$\vec n=(2,3,6)$, ומהצבת $B$: $2x+3y+6z-12=0$.`,
      full: [
        String.raw`$\overrightarrow{A'B}=(6,0,-2)$, $\overrightarrow{A'D}=(0,4,-2)$. נסמן $\vec n=(a,b,c)$.`,
        String.raw`$\vec n\cdot\overrightarrow{A'B}=6a-2c=0\ \Rightarrow\ c=3a$; $\vec n\cdot\overrightarrow{A'D}=4b-2c=0\ \Rightarrow\ b=\dfrac c2$.`,
        String.raw`בוחרים $a=2$: $c=6$, $b=3$, כלומר $\vec n=(2,3,6)$.`,
        String.raw`המישור: $2x+3y+6z+d=0$. הצבת $B(6,0,0)$: $12+d=0$, $d=-12$.`,
        String.raw`$2x+3y+6z-12=0$. בדיקה: $D$: $12-12=0$; $A'$: $12-12=0$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את מרחק הקדקוד $C'$ מהמישור $A'BD$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`מצאו את שיעורי $C'$ והשתמשו בנוסחת המרחק מנקודה למישור.`, String.raw`$C'(6,4,2)$, ואורך הנורמל $\sqrt{4+9+36}=7$.`],
      check: { kind: 'numeric', answer: 3.428571429, tol: 0.01, verify: 'abs(det([[6,0,-2],[0,4,-2],[6,4,0]]))/norm(cross([6,0,-2],[0,4,-2]))' },
      short: String.raw`$C'(6,4,2)$: $d=\dfrac{|12+12+12-12|}{7}=\dfrac{24}{7}\approx 3.43$.`,
      full: [String.raw`$C'(6,4,2)$.`, String.raw`$d=\dfrac{|2\cdot 6+3\cdot 4+6\cdot 2-12|}{\sqrt{2^2+3^2+6^2}}=\dfrac{24}{7}$.`, String.raw`$d\approx 3.43$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את הזווית בין המישור $A'BD$ למישור הבסיס $ABCD$ (במעלות). עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`הבסיס $ABCD$ נמצא במישור $z=0$. מהו הנורמל שלו?`, String.raw`$\cos\alpha=\dfrac{|(2,3,6)\cdot(0,0,1)|}{7\cdot 1}$.`],
      check: { kind: 'numeric', answer: 31.00271913, tol: 0.05, verify: 'acos(abs(dot(cross([6,0,-2],[0,4,-2]),[0,0,1]))/norm(cross([6,0,-2],[0,4,-2])))*180/pi' },
      short: String.raw`$\cos\alpha=\dfrac67$, ולכן $\alpha\approx 31.00^\circ$.`,
      full: [String.raw`הבסיס במישור $z=0$, שהנורמל שלו $(0,0,1)$. הנורמל של $A'BD$: $(2,3,6)$.`, String.raw`$\cos\alpha=\dfrac{|2\cdot 0+3\cdot 0+6\cdot 1|}{7\cdot 1}=\dfrac67$.`, String.raw`$\alpha\approx 31.00^\circ$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את המרחק בין הישרים המצטלבים $A'B$ ו-$B'D'$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`חפשו מישור שמכיל את אחד הישרים ומקביל לישר האחר.`, String.raw`$B'D'\parallel BD$, ולכן $B'D'$ מקביל למישור $A'BD$, שמכיל את $A'B$.`, String.raw`המרחק המבוקש שווה למרחק של $B'(6,0,2)$ מהמישור $A'BD$.`],
      check: { kind: 'numeric', answer: 1.714285714, tol: 0.01, verify: 'abs(det([[6,0,-2],[-6,4,0],[6,0,0]]))/norm(cross([6,0,-2],[-6,4,0]))' },
      short: String.raw`$B'D'$ מקביל למישור $A'BD$ שמכיל את $A'B$; מרחק $B'(6,0,2)$ מהמישור: $\dfrac{|12+12-12|}{7}=\dfrac{12}{7}\approx 1.71$.`,
      full: [
        String.raw`$\overrightarrow{B'D'}=(-6,4,0)=\overrightarrow{BD}$, ולכן $B'D'\parallel BD$. $BD$ מוכל במישור $A'BD$, ולכן $B'D'$ מקביל למישור זה.`,
        String.raw`הישר $A'B$ מוכל במישור $A'BD$. לכן המרחק בין הישרים המצטלבים שווה למרחק של נקודה כלשהי על $B'D'$ מהמישור $A'BD$.`,
        String.raw`$B'(6,0,2)$: $d=\dfrac{|2\cdot 6+3\cdot 0+6\cdot 2-12|}{7}=\dfrac{12}{7}$.`,
        String.raw`$d\approx 1.71$.`,
      ],
    },
  ],
};

const e10: Exercise = {
  id: 'vds-10',
  level: 3,
  topicId: T,
  subtopicIds: [DIST, ANG, 'vec-plane', 'vec-coordinate-system'],
  intro: String.raw`הפירמידה $SABCD$ מונחת במערכת צירים: בסיסה הוא הריבוע $ABCD$, $A(0,0,0)$, $B(6,0,0)$, $C(6,6,0)$, $D(0,6,0)$, וקדקודה $S(3,3,h)$, כאשר $h>0$ (ראו שרטוט; מודגשת הפאה $SBC$).`,
  diagram: { kind: 'solid', shape: 'pyramid', size: [4.243, 0, 4], baseSides: 4, labels: ['B', 'C', 'D', 'A', 'S'], highlightSegments: [['S', 'B'], ['S', 'C'], ['B', 'C']], segmentLabels: [{ from: 'A', to: 'B', text: '6' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הראו שמשוואת המישור $SBC$ היא $hx+3z-6h=0$.`,
      hints: [String.raw`מצאו נורמל שמאונך ל-$\overrightarrow{BC}$ ול-$\overrightarrow{BS}$.`, String.raw`$\overrightarrow{BC}=(0,6,0)$, $\overrightarrow{BS}=(-3,3,h)$.`],
      check: { kind: 'self' },
      short: String.raw`$\vec n\perp(0,6,0)$ ו-$\vec n\perp(-3,3,h)$ נותנים $\vec n=(h,0,3)$; הצבת $B$ נותנת $hx+3z-6h=0$.`,
      full: [
        String.raw`$\overrightarrow{BC}=(0,6,0)$, $\overrightarrow{BS}=(-3,3,h)$. נסמן $\vec n=(a,b,c)$.`,
        String.raw`$\vec n\cdot\overrightarrow{BC}=6b=0\ \Rightarrow\ b=0$.`,
        String.raw`$\vec n\cdot\overrightarrow{BS}=-3a+3b+hc=0\ \Rightarrow\ hc=3a$. בוחרים $a=h$, $c=3$: $\vec n=(h,0,3)$.`,
        String.raw`המישור: $hx+3z+d=0$. הצבת $B(6,0,0)$: $6h+d=0$, $d=-6h$. לכן $hx+3z-6h=0$.`,
        String.raw`בדיקה: $C(6,6,0)$: $6h-6h=0$; $S(3,3,h)$: $3h+3h-6h=0$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`נתון שמרחק הקדקוד $A$ מהמישור $SBC$ הוא $4.8$. מצאו את $h$.`,
      hints: [String.raw`כתבו את מרחק $A(0,0,0)$ מהמישור $hx+3z-6h=0$ כביטוי ב-$h$.`, String.raw`$\dfrac{6h}{\sqrt{h^2+9}}=4.8$. העלו בריבוע.`],
      check: { kind: 'numeric', answer: 4, verify: 'root("6*x/sqrt(x^2+9)-4.8", 1, 10)' },
      short: String.raw`$\dfrac{6h}{\sqrt{h^2+9}}=4.8\ \Rightarrow\ 36h^2=23.04(h^2+9)\ \Rightarrow\ h^2=16$, $h=4$.`,
      full: [
        String.raw`$d=\dfrac{|h\cdot 0+3\cdot 0-6h|}{\sqrt{h^2+9}}=\dfrac{6h}{\sqrt{h^2+9}}$ (כי $h>0$).`,
        String.raw`$\dfrac{6h}{\sqrt{h^2+9}}=4.8\ \Rightarrow\ 36h^2=23.04(h^2+9)$.`,
        String.raw`$12.96h^2=207.36\ \Rightarrow\ h^2=16\ \Rightarrow\ h=4$.`,
        String.raw`מעתה $S(3,3,4)$ והמישור $SBC$: $4x+3z-24=0$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את הזווית בין המישור $SBC$ למישור הבסיס $ABCD$ (במעלות). עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`הנורמל של $SBC$ הוא $(4,0,3)$, והנורמל של הבסיס ($z=0$) הוא $(0,0,1)$.`, String.raw`$\cos\alpha=\dfrac{3}{5\cdot 1}$.`],
      check: { kind: 'numeric', answer: 53.13010235, tol: 0.05, verify: 'acos(abs(dot(cross([0,6,0],[-3,3,4]),[0,0,1]))/norm(cross([0,6,0],[-3,3,4])))*180/pi' },
      short: String.raw`$\cos\alpha=\dfrac{|(4,0,3)\cdot(0,0,1)|}{5}=\dfrac35$, ולכן $\alpha\approx 53.13^\circ$.`,
      full: [String.raw`$\vec n_1=(4,0,3)$, $|\vec n_1|=5$; נורמל הבסיס $\vec n_2=(0,0,1)$.`, String.raw`$\cos\alpha=\dfrac{|3|}{5\cdot 1}=0.6$.`, String.raw`$\alpha\approx 53.13^\circ$. (בדיקה גאומטרית: $\tan\alpha=\dfrac{h}{3}=\dfrac43$, כי מרחק מרכז הבסיס מהצלע $BC$ הוא $3$.)`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את הזווית בין המישורים $SBC$ ו-$SCD$ (במעלות). עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`מצאו נורמל למישור $SCD$ בעזרת $\overrightarrow{CD}=(-6,0,0)$ ו-$\overrightarrow{CS}=(-3,-3,4)$.`, String.raw`הנורמל של $SCD$ הוא $(0,4,3)$.`, String.raw`$\cos\alpha=\dfrac{|(4,0,3)\cdot(0,4,3)|}{5\cdot 5}$.`],
      check: { kind: 'numeric', answer: 68.89980398, tol: 0.05, verify: 'acos(abs(dot(cross([0,6,0],[-3,3,4]),cross([-6,0,0],[-3,-3,4])))/(norm(cross([0,6,0],[-3,3,4]))*norm(cross([-6,0,0],[-3,-3,4]))))*180/pi' },
      short: String.raw`נורמל $SCD$: $(0,4,3)$; $\cos\alpha=\dfrac{9}{25}=0.36$, ולכן $\alpha\approx 68.90^\circ$.`,
      full: [
        String.raw`נורמל ל-$SCD$, $\vec m=(a,b,c)$: $\vec m\cdot(-6,0,0)=-6a=0\ \Rightarrow\ a=0$; $\vec m\cdot(-3,-3,4)=-3b+4c=0$. בוחרים $b=4$, $c=3$: $\vec m=(0,4,3)$.`,
        String.raw`$(4,0,3)\cdot(0,4,3)=9$, ואורך כל נורמל $5$.`,
        String.raw`$\cos\alpha=\dfrac{|9|}{25}=0.36\ \Rightarrow\ \alpha\approx 68.90^\circ$.`,
        String.raw`שימו לב: זווית בין מישורים מוגדרת כזווית החדה (לכן הערך המוחלט). הזווית שבין שתי הפאות בתוך הפירמידה היא המשלימה, $180^\circ-68.90^\circ=111.10^\circ$.`,
      ],
    },
  ],
};

const SKEW: Record<string, Pt> = { ...PLANE, E1: [1.5, 0.8], E2: [8, 2.2], G1: [1, 5.5], G2: [8.5, 4.2] };

const e11: Exercise = {
  id: 'vds-11',
  level: 3,
  topicId: T,
  subtopicIds: [DIST, 'vec-line', 'vec-plane', 'vec-dot-product'],
  intro: String.raw`נתונים הישרים $\ell_1:\ \underline{x}=(1,2,-1)+t(2,1,0)$ ו-$\ell_2:\ \underline{x}=(6,-4,-2)+s(0,1,3)$. המישור $\pi$ מכיל את $\ell_1$ ומקביל ל-$\ell_2$ (ראו שרטוט סכמטי).`,
  diagram: {
    kind: 'geo',
    points: SKEW,
    polygons: [PLANE_NAMES],
    segments: [['E1', 'E2'], ['G1', 'G2']],
    hideNames: [...PLANE_NAMES, 'E1', 'E2', 'G1', 'G2'],
    labels: [{ at: 'L', text: 'π', dx: -16, dy: -10 }, { at: 'E2', text: 'ℓ₁', dx: -4, dy: -12 }, { at: 'G2', text: 'ℓ₂', dx: 4, dy: -12 }],
  },
  solutionDiagram: {
    kind: 'geo',
    points: { ...SKEW, M: [5, 1.554], N: [5, 4.807] },
    polygons: [PLANE_NAMES],
    segments: [['E1', 'E2'], ['G1', 'G2'], { from: 'M', to: 'N', dashed: true, accent: true, label: '7' }],
    hideNames: [...PLANE_NAMES, 'E1', 'E2', 'G1', 'G2'],
    dots: ['M', 'N'],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו שהישרים $\ell_1$ ו-$\ell_2$ מצטלבים.`,
      hints: [String.raw`ישרים מצטלבים אינם מקבילים ואינם נחתכים. בדקו כל תנאי בנפרד.`, String.raw`להראות שאינם נחתכים: השוו שיעורים, פתרו שתי משוואות עבור $t$ ו-$s$ ובדקו את השלישית.`],
      check: { kind: 'self' },
      short: String.raw`הכיוונים $(2,1,0)$ ו-$(0,1,3)$ אינם פרופורציוניים; מהשוואת $x$ ו-$z$: $t=2.5$, $s=\dfrac13$, אך אז שיעורי ה-$y$ שונים. לכן הישרים מצטלבים.`,
      full: [
        String.raw`וקטורי הכיוון $(2,1,0)$ ו-$(0,1,3)$ אינם כפולה זה של זה, ולכן הישרים אינם מקבילים (ואינם מתלכדים).`,
        String.raw`נבדוק חיתוך: $1+2t=6$, $2+t=-4+s$, $-1=-2+3s$.`,
        String.raw`מהמשוואה הראשונה $t=2.5$, ומהשלישית $s=\dfrac13$.`,
        String.raw`הצבה בשנייה: $2+2.5=4.5$, אבל $-4+\dfrac13=-3\dfrac23$. אין פתרון, ולכן הישרים אינם נחתכים.`,
        String.raw`ישרים שאינם מקבילים ואינם נחתכים הם מצטלבים.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מהי משוואת המישור $\pi$?`,
      hints: [String.raw`הנורמל של $\pi$ מאונך לכיווני שני הישרים.`, String.raw`$\vec n=(a,b,c)$: $2a+b=0$ ו-$b+3c=0$. את האיבר החופשי מוצאים מנקודה על $\ell_1$.`],
      check: { kind: 'choice', options: [String.raw`$3x-6y+2z+11=0$`, String.raw`$3x+6y+2z-13=0$`, String.raw`$3x-6y+2z-11=0$`, String.raw`$2x+y-4=0$`], correct: 0 },
      short: String.raw`$\vec n=(3,-6,2)$, והצבת $(1,2,-1)$ נותנת $3x-6y+2z+11=0$.`,
      full: [
        String.raw`$\pi$ מכיל את $\ell_1$ ומקביל ל-$\ell_2$, ולכן הנורמל שלו מאונך ל-$(2,1,0)$ ול-$(0,1,3)$.`,
        String.raw`$\vec n=(a,b,c)$: $2a+b=0\ \Rightarrow\ b=-2a$; $b+3c=0\ \Rightarrow\ c=-\dfrac b3=\dfrac{2a}{3}$.`,
        String.raw`בוחרים $a=3$: $\vec n=(3,-6,2)$.`,
        String.raw`הנקודה $(1,2,-1)$ על $\ell_1$ נמצאת במישור: $3-12-2+d=0\ \Rightarrow\ d=11$.`,
        String.raw`$\pi:\ 3x-6y+2z+11=0$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את המרחק בין הישרים $\ell_1$ ו-$\ell_2$.`,
      hints: [String.raw`$\ell_2$ מקביל ל-$\pi$, ו-$\ell_1$ מוכל ב-$\pi$. לכן המרחק בין הישרים שווה למרחק של $\ell_2$ מ-$\pi$.`, String.raw`חשבו את מרחק הנקודה $(6,-4,-2)$ מהמישור $3x-6y+2z+11=0$.`],
      check: { kind: 'numeric', answer: 7, verify: 'abs(det([[2,1,0],[0,1,3],[6-1,-4-2,-2+1]]))/norm(cross([2,1,0],[0,1,3]))' },
      short: String.raw`מרחק $(6,-4,-2)$ מ-$\pi$: $\dfrac{|18+24-4+11|}{\sqrt{9+36+4}}=\dfrac{49}{7}=7$.`,
      full: [
        String.raw`המרחק בין ישרים מצטלבים שווה למרחק בין אחד מהם לבין המישור שמכיל את האחר ומקביל לו.`,
        String.raw`ניקח את הנקודה $(6,-4,-2)$ שעל $\ell_2$.`,
        String.raw`$d=\dfrac{|3\cdot 6-6\cdot(-4)+2\cdot(-2)+11|}{\sqrt{3^2+(-6)^2+2^2}}=\dfrac{|18+24-4+11|}{7}=\dfrac{49}{7}=7$.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`האנך המשותף לשני הישרים פוגש את $\ell_1$ בנקודה $M$ ואת $\ell_2$ בנקודה $N$. מצאו את ערך הפרמטר $t$ המתאים לנקודה $M$.`,
      hints: [String.raw`כתבו $M(1+2t,\ 2+t,\ -1)$ ו-$N(6,\ -4+s,\ -2+3s)$, ואת הווקטור $\overrightarrow{MN}$.`, String.raw`$\overrightarrow{MN}$ מאונך לשני וקטורי הכיוון: שתי משוואות בשני נעלמים.`, String.raw`$4-5t+s=0$ ו-$-9-t+10s=0$.`],
      check: { kind: 'numeric', answer: 1, verify: '(dot([5,-6,-1],[2,1,0])*dot([0,1,3],[0,1,3])-dot([5,-6,-1],[0,1,3])*dot([2,1,0],[0,1,3]))/(dot([2,1,0],[2,1,0])*dot([0,1,3],[0,1,3])-dot([2,1,0],[0,1,3])^2)' },
      short: String.raw`$\overrightarrow{MN}\cdot(2,1,0)=0$ ו-$\overrightarrow{MN}\cdot(0,1,3)=0$ נותנים $t=1$, $s=1$: $M(3,3,-1)$, $N(6,-3,1)$.`,
      full: [
        String.raw`$M(1+2t,\ 2+t,\ -1)$, $N(6,\ -4+s,\ -2+3s)$, ולכן $\overrightarrow{MN}=(5-2t,\ -6+s-t,\ -1+3s)$.`,
        String.raw`$\overrightarrow{MN}\cdot(2,1,0)=10-4t-6+s-t=4-5t+s=0$.`,
        String.raw`$\overrightarrow{MN}\cdot(0,1,3)=-6+s-t-3+9s=-9-t+10s=0$.`,
        String.raw`מהראשונה $s=5t-4$; הצבה בשנייה: $-9-t+50t-40=0\ \Rightarrow\ 49t=49\ \Rightarrow\ t=1$, $s=1$.`,
        String.raw`$M(3,3,-1)$, $N(6,-3,1)$, $\overrightarrow{MN}=(3,-6,2)$ ו-$|MN|=\sqrt{9+36+4}=7$, בהתאמה לסעיף ג.`,
      ],
    },
  ],
};

const e12: Exercise = {
  id: 'vds-12',
  level: 3,
  topicId: T,
  subtopicIds: [DIST, ANG, 'vec-plane', 'vec-line'],
  intro: String.raw`המישור $\pi_1$ עובר דרך הנקודות $A(1,0,2)$, $B(2,2,2)$ ו-$C(0,0,3)$. נתון גם הישר $\ell:\ \underline{x}=(2,-1,5)+t(2,2,-1)$ (ראו שרטוט סכמטי).`,
  diagram: {
    kind: 'geo',
    points: { ...PLANE, A: [2.5, 0.8], B: [5.5, 1.2], C: [4.5, 2.4], E: [1, 5], G: [9, 5] },
    polygons: [PLANE_NAMES],
    segments: [['E', 'G']],
    hideNames: [...PLANE_NAMES, 'E', 'G'],
    dots: ['A', 'B', 'C'],
    labels: [{ at: 'L', text: 'π₁', dx: -16, dy: -10 }, { at: 'G', text: 'ℓ', dx: 4, dy: -12 }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מהי משוואת המישור $\pi_1$?`,
      hints: [String.raw`מצאו נורמל שמאונך ל-$\overrightarrow{AB}$ ול-$\overrightarrow{AC}$.`, String.raw`$\overrightarrow{AB}=(1,2,0)$, $\overrightarrow{AC}=(-1,0,1)$: $a+2b=0$ ו-$-a+c=0$.`],
      check: { kind: 'choice', options: [String.raw`$2x+y+2z-6=0$`, String.raw`$x-2y+2z-5=0$`, String.raw`$2x-y+2z-6=0$`, String.raw`$2x-y+2z+6=0$`], correct: 2 },
      short: String.raw`$\vec n=(2,-1,2)$, והצבת $A$ נותנת $2x-y+2z-6=0$.`,
      full: [
        String.raw`$\overrightarrow{AB}=(1,2,0)$, $\overrightarrow{AC}=(-1,0,1)$. נסמן $\vec n=(a,b,c)$.`,
        String.raw`$a+2b=0$ ו-$-a+c=0$. בוחרים $a=2$: $b=-1$, $c=2$, כלומר $\vec n=(2,-1,2)$.`,
        String.raw`$2x-y+2z+d=0$; הצבת $A(1,0,2)$: $2+4+d=0$, $d=-6$.`,
        String.raw`$\pi_1:\ 2x-y+2z-6=0$. בדיקה: $B$: $4-2+4-6=0$; $C$: $6-6=0$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`הראו שהישר $\ell$ מקביל למישור $\pi_1$, וחשבו את המרחק ביניהם.`,
      hints: [String.raw`ישר מקביל למישור כאשר וקטור הכיוון שלו מאונך לנורמל (והישר אינו מוכל במישור).`, String.raw`חשבו את מרחק הנקודה $(2,-1,5)$ מהמישור $\pi_1$.`],
      check: { kind: 'numeric', answer: 3, verify: 'abs(det([[2-1,2-0,2-2],[0-1,0-0,3-2],[2-1,-1-0,5-2]]))/norm(cross([2-1,2-0,2-2],[0-1,0-0,3-2]))' },
      short: String.raw`$(2,2,-1)\cdot(2,-1,2)=0$, ומרחק $(2,-1,5)$ מהמישור: $\dfrac{|4+1+10-6|}{3}=3$.`,
      full: [
        String.raw`$(2,2,-1)\cdot(2,-1,2)=4-2-2=0$, ולכן כיוון הישר מאונך לנורמל: הישר מקביל למישור או מוכל בו.`,
        String.raw`מרחק הנקודה $(2,-1,5)$ מהמישור: $d=\dfrac{|2\cdot 2-(-1)+2\cdot 5-6|}{\sqrt{4+1+4}}=\dfrac{9}{3}=3$.`,
        String.raw`המרחק שונה מאפס, ולכן הישר אינו מוכל במישור: הוא מקביל לו, והמרחק ביניהם $3$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`המישור $\pi_2:\ x+ky-3=0$ ($k$ מספר שלם) יוצר עם $\pi_1$ זווית של $45^\circ$. מצאו את $k$.`,
      hints: [String.raw`הנורמל של $\pi_2$ הוא $(1,k,0)$. כתבו את $\cos 45^\circ$ בעזרת הנורמלים.`, String.raw`$\dfrac{|2-k|}{3\sqrt{1+k^2}}=\dfrac{1}{\sqrt2}$. העלו בריבוע.`, String.raw`מתקבל $7k^2+8k+1=0$.`],
      check: { kind: 'numeric', answer: -1, verify: 'root("abs(dot([2,-1,2],[1,x,0]))/(norm([2,-1,2])*norm([1,x,0]))-cos(pi/4)", -3, -0.5)' },
      short: String.raw`$\dfrac{|2-k|}{3\sqrt{1+k^2}}=\dfrac{1}{\sqrt2}\ \Rightarrow\ 7k^2+8k+1=0\ \Rightarrow\ k=-1$ או $k=-\dfrac17$; $k$ שלם, ולכן $k=-1$.`,
      full: [
        String.raw`$\vec n_1=(2,-1,2)$, $\vec n_2=(1,k,0)$: $\vec n_1\cdot\vec n_2=2-k$, $|\vec n_1|=3$, $|\vec n_2|=\sqrt{1+k^2}$.`,
        String.raw`$\cos 45^\circ=\dfrac{|2-k|}{3\sqrt{1+k^2}}=\dfrac{1}{\sqrt2}$.`,
        String.raw`מעלים בריבוע: $2(2-k)^2=9(1+k^2)\ \Rightarrow\ 8-8k+2k^2=9+9k^2\ \Rightarrow\ 7k^2+8k+1=0$.`,
        String.raw`$k=\dfrac{-8\pm\sqrt{64-28}}{14}=\dfrac{-8\pm 6}{14}$, כלומר $k=-1$ או $k=-\dfrac17$.`,
        String.raw`$k$ שלם, ולכן $k=-1$: $\pi_2:\ x-y-3=0$.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`עבור ערך $k$ שמצאתם: מהו המצב ההדדי של הישר $\ell$ והמישור $\pi_2$?`,
      hints: [String.raw`בדקו אם וקטור הכיוון של $\ell$ מאונך לנורמל של $\pi_2$.`, String.raw`אם כן, הציבו נקודה של הישר במשוואת המישור כדי להבחין בין "מקביל" ל"מוכל".`],
      check: { kind: 'choice', options: ['הישר חותך את המישור בנקודה אחת', 'הישר מקביל למישור ואינו מוכל בו', 'הישר מוכל במישור'], correct: 2 },
      short: String.raw`$(2,2,-1)\cdot(1,-1,0)=0$, והנקודה $(2,-1,5)$ מקיימת $2+1-3=0$: הישר מוכל ב-$\pi_2$.`,
      full: [
        String.raw`$\pi_2:\ x-y-3=0$, נורמל $(1,-1,0)$.`,
        String.raw`$(2,2,-1)\cdot(1,-1,0)=2-2+0=0$, ולכן הישר מקביל למישור או מוכל בו.`,
        String.raw`הצבת $(2,-1,5)$: $2-(-1)-3=0$. הנקודה במישור, ולכן הישר כולו מוכל ב-$\pi_2$.`,
        String.raw`מסקנה: $\ell$ מוכל ב-$\pi_2$ ומקביל ל-$\pi_1$, ולכן הוא מקביל לישר החיתוך של שני המישורים.`,
      ],
    },
  ],
};

export const vecDistances: ExerciseSet = {
  id: 'vec-distances',
  questionnaire: '35582',
  title: 'מרחקים וזווית בין מישורים',
  topicIds: ['vectors'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
