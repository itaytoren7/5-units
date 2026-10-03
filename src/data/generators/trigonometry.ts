import { approx, degTex, isExact, polar, pt, randomDecimalHalf, svgFigure, toDeg, toRad, triangleFromBase, triangleFromSides, type Pt } from './geometry';
import { fmt, fracTex } from './helpers';
import type { ExerciseGenerator, GeneratedExercise } from './types';

const sinD = (degrees: number) => Math.sin(toRad(degrees));
const cosD = (degrees: number) => Math.cos(toRad(degrees));
const tanD = (degrees: number) => Math.tan(toRad(degrees));
const deg = degTex;
/** Approximate value with 4 decimals for intermediate trig values: '\approx0.6428'. */
const approx4 = (value: number) => approx(value, 4);

const rightTriangle: ExerciseGenerator = {
  id: 'gen-right-triangle-trig',
  lessonIds: ['trig-right-triangle'],
  title: 'צלע או זווית במשולש ישר-זווית',
  difficulty: 1,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 5);
    const alpha = rng.int(20, 70);
    const given = randomDecimalHalf(rng, 4, 20);
    // model: C(0,0), A(b,0), B(0,a), right angle at C
    let a: number;
    let b: number;
    let c: number;
    if (mode <= 1) {
      c = given;
      a = c * sinD(alpha);
      b = c * cosD(alpha);
    } else if (mode <= 3) {
      b = given;
      a = b * tanD(alpha);
      c = b / cosD(alpha);
    } else if (mode === 4) {
      a = given;
      b = a / tanD(alpha);
      c = a / sinD(alpha);
    } else {
      b = given;
      a = randomDecimalHalf(rng, 3, 20);
      c = Math.hypot(a, b);
    }
    const angleA = mode === 5 ? toDeg(Math.atan(a / b)) : alpha;
    const sideText = (value: number, isGiven: boolean, asked: boolean) => (isGiven ? fmt(value) : asked ? '?' : '');
    const figureSvg = svgFigure({
      points: { A: pt(b, 0), B: pt(0, a), C: pt(0, 0) },
      polygons: [['A', 'B', 'C']],
      labels: ['A', 'B', 'C'],
      angles: [
        { at: 'C', a: 'A', b: 'B', right: true },
        { at: 'A', a: 'B', b: 'C', text: mode === 5 ? '?' : `${alpha}°` },
      ],
      sideLabels: [
        { a: 'A', b: 'B', text: sideText(c, mode <= 1, mode === 3 || mode === 4) },
        { a: 'A', b: 'C', text: sideText(b, mode === 2 || mode === 3 || mode === 5, mode === 1) },
        { a: 'B', b: 'C', text: sideText(a, mode === 4 || mode === 5, mode === 0 || mode === 2) },
      ].filter((side) => side.text !== ''),
    });
    const intro = String.raw`במשולש ישר-הזווית $ABC$ ($\angle C=90^\circ$)`;
    const roles = String.raw`במשולש ישר-הזווית $ABC$ היתר הוא $AB$ (מול הזווית הישרה); $BC$ הוא הניצב שמול $\angle A$ ו-$AC$ הוא הניצב שליד $\angle A$.`;
    const hints = [
      String.raw`זהו את היתר, את הניצב שמול $\angle A$ ואת הניצב שליד $\angle A$.`,
      String.raw`$\sin\angle A=\frac{BC}{AB}$, $\cos\angle A=\frac{AC}{AB}$, $\tan\angle A=\frac{BC}{AC}$.`,
    ];
    const configs = [
      { givenText: String.raw`$AB=${fmt(c)}$`, ask: 'BC', relation: String.raw`$\sin\angle A=\frac{BC}{AB}\ \Rightarrow\ BC=AB\cdot\sin\angle A=${fmt(c)}\cdot\sin${deg(alpha)}${approx(a)}$.`, value: a },
      { givenText: String.raw`$AB=${fmt(c)}$`, ask: 'AC', relation: String.raw`$\cos\angle A=\frac{AC}{AB}\ \Rightarrow\ AC=AB\cdot\cos\angle A=${fmt(c)}\cdot\cos${deg(alpha)}${approx(b)}$.`, value: b },
      { givenText: String.raw`$AC=${fmt(b)}$`, ask: 'BC', relation: String.raw`$\tan\angle A=\frac{BC}{AC}\ \Rightarrow\ BC=AC\cdot\tan\angle A=${fmt(b)}\cdot\tan${deg(alpha)}${approx(a)}$.`, value: a },
      { givenText: String.raw`$AC=${fmt(b)}$`, ask: 'AB', relation: String.raw`$\cos\angle A=\frac{AC}{AB}\ \Rightarrow\ AB=\frac{AC}{\cos\angle A}=\frac{${fmt(b)}}{\cos${deg(alpha)}}${approx(c)}$.`, value: c },
      { givenText: String.raw`$BC=${fmt(a)}$`, ask: 'AB', relation: String.raw`$\sin\angle A=\frac{BC}{AB}\ \Rightarrow\ AB=\frac{BC}{\sin\angle A}=\frac{${fmt(a)}}{\sin${deg(alpha)}}${approx(c)}$.`, value: c },
    ];
    if (mode < 5) {
      const config = configs[mode];
      const which = config.ask === 'AB' ? 'היתר' : 'הניצב';
      return {
        statement: String.raw`${intro} נתון $\angle A=${deg(alpha)}$ ו-${config.givenText} (ראו שרטוט).` + '\n\n' + String.raw`חשבו את אורך ${which} $${config.ask}$.`,
        hints,
        solutionSteps: [roles, config.relation],
        finalAnswer: String.raw`$${config.ask}${approx(config.value)}$`,
        answers: [{ label: `$${config.ask}$`, value: config.value }],
        figureSvg,
        data: { mode, alpha, given },
      };
    }
    return {
      statement: String.raw`${intro} נתון $AC=${fmt(b)}$ ו-$BC=${fmt(a)}$ (ראו שרטוט).` + '\n\n' + String.raw`חשבו את הזווית $\angle A$ (במעלות).`,
      hints: [hints[0], String.raw`שני הניצבים נתונים, ולכן נוח להשתמש ב-$\tan\angle A=\frac{BC}{AC}$.`],
      solutionSteps: [
        roles,
        String.raw`$\tan\angle A=\frac{BC}{AC}=\frac{${fmt(a)}}{${fmt(b)}}${approx4(a / b)}$.`,
        String.raw`$\angle A$ חדה (זווית במשולש ישר-זווית שאינה הזווית הישרה), ולכן בעזרת המחשבון $\angle A${approx(angleA)}^\circ$.`,
      ],
      finalAnswer: String.raw`$\angle A${approx(angleA)}^\circ$`,
      answers: [{ label: String.raw`$\angle A$ (במעלות)`, value: angleA }],
      figureSvg,
      data: { mode, AC: b, BC: a },
    };
  },
};

const sineLawSide: ExerciseGenerator = {
  id: 'gen-sine-law-side',
  lessonIds: ['trig-sine-law'],
  title: 'צלע לפי משפט הסינוסים',
  difficulty: 2,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 2);
    const alpha = rng.int(25, 110);
    const beta = rng.int(25, Math.min(110, 150 - alpha));
    const gamma = 180 - alpha - beta;
    const given = randomDecimalHalf(rng, 4, 20);
    // a = BC (opposite A), b = AC (opposite B), c = AB (opposite C)
    const a = mode === 2 ? (given * sinD(alpha)) / sinD(beta) : given;
    const b = (a * sinD(beta)) / sinD(alpha);
    const c = (a * sinD(gamma)) / sinD(alpha);
    const tri = triangleFromBase(a, beta, gamma);
    const figureSvg = svgFigure({
      points: tri,
      polygons: [['A', 'B', 'C']],
      labels: ['A', 'B', 'C'],
      angles: [
        { at: 'A', a: 'B', b: 'C', text: `${alpha}°` },
        { at: 'B', a: 'A', b: 'C', text: `${beta}°` },
      ],
      sideLabels: [
        { a: 'B', b: 'C', text: mode === 2 ? '?' : fmt(a) },
        { a: 'A', b: 'C', text: mode === 2 ? fmt(b) : mode === 0 ? '?' : '' },
        { a: 'A', b: 'B', text: mode === 1 ? '?' : '' },
      ].filter((side) => side.text !== ''),
    });
    const law = String.raw`לפי משפט הסינוסים: $\frac{BC}{\sin\angle A}=\frac{AC}{\sin\angle B}=\frac{AB}{\sin\angle C}$.`;
    const hints = ['במשפט הסינוסים כל צלע מחולקת בסינוס הזווית שמולה.', String.raw`זהו את הזווית שמול הצלע הנתונה ואת הזווית שמול הצלע המבוקשת.`];
    if (mode === 0) {
      return {
        statement: String.raw`במשולש $ABC$ נתון $BC=${fmt(a)}$, $\angle A=${deg(alpha)}$, $\angle B=${deg(beta)}$ (ראו שרטוט).` + '\n\n' + String.raw`חשבו את אורך הצלע $AC$.`,
        hints,
        solutionSteps: [law, String.raw`$\frac{AC}{\sin${deg(beta)}}=\frac{${fmt(a)}}{\sin${deg(alpha)}}\ \Rightarrow\ AC=\frac{${fmt(a)}\cdot\sin${deg(beta)}}{\sin${deg(alpha)}}${approx(b)}$.`],
        finalAnswer: String.raw`$AC${approx(b)}$`,
        answers: [{ label: '$AC$', value: b }],
        figureSvg,
        data: { mode, alpha, beta, given },
      };
    }
    if (mode === 1) {
      return {
        statement: String.raw`במשולש $ABC$ נתון $BC=${fmt(a)}$, $\angle A=${deg(alpha)}$, $\angle B=${deg(beta)}$ (ראו שרטוט).` + '\n\n' + String.raw`חשבו את אורך הצלע $AB$.`,
        hints: [String.raw`הצלע $AB$ נמצאת מול הזווית $\angle C$ – חשבו אותה קודם לפי סכום הזוויות במשולש.`, hints[0]],
        solutionSteps: [
          String.raw`סכום הזוויות במשולש הוא $180^\circ$: $\angle C=180^\circ-${deg(alpha)}-${deg(beta)}=${deg(gamma)}$.`,
          law,
          String.raw`$\frac{AB}{\sin${deg(gamma)}}=\frac{${fmt(a)}}{\sin${deg(alpha)}}\ \Rightarrow\ AB=\frac{${fmt(a)}\cdot\sin${deg(gamma)}}{\sin${deg(alpha)}}${approx(c)}$.`,
        ],
        finalAnswer: String.raw`$AB${approx(c)}$`,
        answers: [{ label: '$AB$', value: c }],
        figureSvg,
        data: { mode, alpha, beta, given },
      };
    }
    return {
      statement: String.raw`במשולש $ABC$ נתון $AC=${fmt(given)}$, $\angle A=${deg(alpha)}$, $\angle B=${deg(beta)}$ (ראו שרטוט).` + '\n\n' + String.raw`חשבו את אורך הצלע $BC$.`,
      hints,
      solutionSteps: [law, String.raw`$\frac{BC}{\sin${deg(alpha)}}=\frac{${fmt(given)}}{\sin${deg(beta)}}\ \Rightarrow\ BC=\frac{${fmt(given)}\cdot\sin${deg(alpha)}}{\sin${deg(beta)}}${approx(a)}$.`],
      finalAnswer: String.raw`$BC${approx(a)}$`,
      answers: [{ label: '$BC$', value: a }],
      figureSvg,
      data: { mode, alpha, beta, given },
    };
  },
};

/** Circumcentre of a triangle whose side BC lies on the x-axis from (0,0) to (a,0). */
function circumcentre(A: Pt, a: number): Pt {
  const y = (A.x * A.x + A.y * A.y - a * A.x) / (2 * A.y);
  return pt(a / 2, y);
}

const circumradius: ExerciseGenerator = {
  id: 'gen-circumradius',
  lessonIds: ['trig-sine-law'],
  title: 'רדיוס המעגל החוסם לפי משפט הסינוסים',
  difficulty: 2,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 2);
    const shape = rng.int(25, 75);
    let alpha: number;
    let a: number;
    let R: number;
    if (mode === 0) {
      alpha = rng.int(20, 150);
      a = randomDecimalHalf(rng, 4, 20);
      R = a / (2 * sinD(alpha));
    } else if (mode === 1) {
      alpha = rng.int(20, 150);
      R = rng.int(3, 12);
      a = 2 * R * sinD(alpha);
    } else {
      R = rng.int(4, 12);
      a = rng.int(2, 2 * R - 1);
      alpha = toDeg(Math.asin(a / (2 * R)));
    }
    const beta = ((180 - alpha) * shape) / 100;
    const gamma = 180 - alpha - beta;
    const tri = triangleFromBase(a, beta, gamma);
    const O = circumcentre(tri.A, a);
    const figureSvg = svgFigure({
      points: { ...tri, O },
      circles: [{ center: 'O', r: R }],
      polygons: [['A', 'B', 'C']],
      dots: ['O'],
      labels: ['A', 'B', 'C'],
      labelCenter: O,
      angles: [{ at: 'A', a: 'B', b: 'C', text: mode === 2 ? '?' : `${alpha}°` }],
      sideLabels: [{ a: 'B', b: 'C', text: mode === 1 ? '?' : fmt(a), auto: true }],
      autoLabels: ['O'],
    });
    const intro = String.raw`המשולש $ABC$ חסום במעגל שמרכזו $O$ (ראו שרטוט).`;
    const law = String.raw`לפי משפט הסינוסים, היחס בין צלע לסינוס הזווית שמולה שווה לקוטר המעגל החוסם: $\frac{BC}{\sin\angle A}=2R$.`;
    const hints = [String.raw`משפט הסינוסים: $\frac{a}{\sin\alpha}=2R$, כאשר $R$ רדיוס המעגל החוסם את המשולש.`, String.raw`הצלע $BC$ נמצאת מול הזווית $\angle A$.`];
    if (mode === 0) {
      return {
        statement: intro + ' ' + String.raw`נתון $BC=${fmt(a)}$ ו-$\angle BAC=${deg(alpha)}$.` + '\n\n' + 'חשבו את רדיוס המעגל.',
        hints,
        solutionSteps: [law, String.raw`$2R=\frac{${fmt(a)}}{\sin${deg(alpha)}}${approx(2 * R)}$, ולכן $R${approx(R)}$.`],
        finalAnswer: String.raw`$R${approx(R)}$`,
        answers: [{ label: '$R$', value: R }],
        figureSvg,
        data: { mode, alpha, a, shape },
      };
    }
    if (mode === 1) {
      return {
        statement: intro + ' ' + String.raw`רדיוס המעגל הוא $R=${R}$ ו-$\angle BAC=${deg(alpha)}$.` + '\n\n' + String.raw`חשבו את אורך הצלע $BC$.`,
        hints,
        solutionSteps: [law, String.raw`$BC=2R\cdot\sin\angle A=2\cdot ${R}\cdot\sin${deg(alpha)}${approx(a)}$.`],
        finalAnswer: String.raw`$BC${approx(a)}$`,
        answers: [{ label: '$BC$', value: a }],
        figureSvg,
        data: { mode, alpha, R, shape },
      };
    }
    const sinA = a / (2 * R);
    return {
      statement: intro + ' ' + String.raw`רדיוס המעגל הוא $R=${R}$ ו-$BC=${a}$. ידוע כי הזווית $\angle BAC$ חדה.` + '\n\n' + String.raw`חשבו את $\angle BAC$ (במעלות).`,
      hints: [hints[0], String.raw`בודדו את $\sin\angle A$; הנתון שהזווית חדה קובע איזה משני הפתרונות לבחור.`],
      solutionSteps: [
        law,
        String.raw`$\sin\angle A=\frac{BC}{2R}=\frac{${a}}{${2 * R}}${approx4(sinA)}$.`,
        String.raw`למשוואה $\sin\angle A=${fracTex(a, 2 * R)}$ יש במשולש שני פתרונות אפשריים – זווית חדה וזווית קהה המשלימה אותה ל-$180^\circ$. נתון ש-$\angle A$ חדה, ולכן $\angle A${approx(alpha)}^\circ$.`,
      ],
      finalAnswer: String.raw`$\angle BAC${approx(alpha)}^\circ$`,
      answers: [{ label: String.raw`$\angle BAC$ (במעלות)`, value: alpha }],
      figureSvg,
      data: { mode, R, a, shape },
    };
  },
};

const VERTICES = ['A', 'B', 'C'] as const;
const segName = (p: string, q: string) => [p, q].sort().join('');

const cosineLawSide: ExerciseGenerator = {
  id: 'gen-cosine-law-side',
  lessonIds: ['trig-cosine-law'],
  title: 'צלע לפי משפט הקוסינוסים',
  difficulty: 2,
  generate(rng): GeneratedExercise {
    const vertex = rng.int(0, 2);
    const V = VERTICES[vertex];
    const [U, W] = VERTICES.filter((name) => name !== V);
    const p = randomDecimalHalf(rng, 3, 15);
    const q = randomDecimalHalf(rng, 3, 15);
    const theta = rng.int(20, 150);
    const sq = p * p + q * q - 2 * p * q * cosD(theta);
    const side = Math.sqrt(sq);
    const VU = segName(V, U);
    const VW = segName(V, W);
    const UW = segName(U, W);
    const figureSvg = svgFigure({
      points: { [V]: pt(0, 0), [U]: pt(p, 0), [W]: polar(pt(0, 0), q, theta) },
      polygons: [[V, U, W]],
      labels: [V, U, W],
      angles: [{ at: V, a: U, b: W, text: `${theta}°` }],
      sideLabels: [
        { a: V, b: U, text: fmt(p) },
        { a: V, b: W, text: fmt(q) },
        { a: U, b: W, text: '?' },
      ],
    });
    return {
      statement: String.raw`במשולש $ABC$ נתון $${VU}=${fmt(p)}$, $${VW}=${fmt(q)}$, $\angle ${V}=${deg(theta)}$ (ראו שרטוט).` + '\n\n' + String.raw`חשבו את אורך הצלע $${UW}$.`,
      hints: [String.raw`נתונות שתי צלעות והזווית שביניהן – זה המצב של משפט הקוסינוסים.`, String.raw`$${UW}^2=${VU}^2+${VW}^2-2\cdot ${VU}\cdot ${VW}\cdot\cos\angle ${V}$`],
      solutionSteps: [
        String.raw`הזווית $\angle ${V}$ כלואה בין הצלעות $${VU}$ ו-$${VW}$, והצלע $${UW}$ נמצאת מולה. לפי משפט הקוסינוסים: $${UW}^2=${VU}^2+${VW}^2-2\cdot ${VU}\cdot ${VW}\cdot\cos\angle ${V}$.`,
        String.raw`$${UW}^2=${fmt(p)}^2+${fmt(q)}^2-2\cdot ${fmt(p)}\cdot ${fmt(q)}\cdot\cos${deg(theta)}${approx(sq)}$.`,
        String.raw`$${UW}${approx(side)}$.`,
      ],
      finalAnswer: String.raw`$${UW}${approx(side)}$`,
      answers: [{ label: `$${UW}$`, value: side }],
      figureSvg,
      data: { vertex, p, q, theta },
    };
  },
};

const cosineLawAngle: ExerciseGenerator = {
  id: 'gen-cosine-law-angle',
  lessonIds: ['trig-cosine-law'],
  title: 'זווית לפי משפט הקוסינוסים',
  difficulty: 2,
  generate(rng): GeneratedExercise {
    // a = BC, b = AC, c = AB; every angle at least 15°
    let a = 7;
    let b = 8;
    let c = 5;
    for (let attempt = 0; attempt < 100; attempt += 1) {
      const x = rng.int(3, 15);
      const y = rng.int(3, 15);
      const z = rng.int(3, 15);
      if (x + y <= z || x + z <= y || y + z <= x) continue;
      const cosines = [(y * y + z * z - x * x) / (2 * y * z), (x * x + z * z - y * y) / (2 * x * z), (x * x + y * y - z * z) / (2 * x * y)];
      if (cosines.some((value) => value > cosD(15))) continue;
      a = x;
      b = y;
      c = z;
      break;
    }
    const target = rng.int(0, 2);
    const sides = { a, b, c };
    // the angle at VERTICES[target], its opposite side and the two adjacent sides
    const opposite = [a, b, c][target];
    const V = VERTICES[target];
    const [U, W] = VERTICES.filter((name) => name !== V);
    const oppName = segName(U, W);
    const name1 = segName(V, U);
    const name2 = segName(V, W);
    const len = (name: string) => (name === 'BC' ? sides.a : name === 'AC' ? sides.b : sides.c);
    const n1 = len(name1);
    const n2 = len(name2);
    const num = n1 * n1 + n2 * n2 - opposite * opposite;
    const den = 2 * n1 * n2;
    const cosValue = num / den;
    const angle = toDeg(Math.acos(cosValue));
    const tri = triangleFromSides(a, b, c);
    const figureSvg = svgFigure({
      points: tri,
      polygons: [['A', 'B', 'C']],
      labels: ['A', 'B', 'C'],
      angles: [{ at: V, a: U, b: W, text: '?' }],
      sideLabels: [
        { a: 'B', b: 'C', text: String(a) },
        { a: 'A', b: 'C', text: String(b) },
        { a: 'A', b: 'B', text: String(c) },
      ],
    });
    return {
      statement: String.raw`במשולש $ABC$ נתון $AB=${c}$, $AC=${b}$, $BC=${a}$ (ראו שרטוט).` + '\n\n' + String.raw`חשבו את הזווית $\angle ${V}$ (במעלות).`,
      hints: [String.raw`כשנתונות שלוש צלעות, מוצאים זווית בעזרת משפט הקוסינוסים.`, String.raw`כתבו את משפט הקוסינוסים לצלע שמול $\angle ${V}$, כלומר ל-$${oppName}$, ובודדו את $\cos\angle ${V}$.`],
      solutionSteps: [
        String.raw`הצלע $${oppName}$ נמצאת מול $\angle ${V}$. לפי משפט הקוסינוסים: $${oppName}^2=${name1}^2+${name2}^2-2\cdot ${name1}\cdot ${name2}\cdot\cos\angle ${V}$.`,
        String.raw`$${opposite}^2=${n1}^2+${n2}^2-2\cdot ${n1}\cdot ${n2}\cdot\cos\angle ${V}\ \Rightarrow\ \cos\angle ${V}=\frac{${n1 * n1}+${n2 * n2}-${opposite * opposite}}{${den}}=${fracTex(num, den)}${approx4(cosValue)}$.`,
        String.raw`${cosValue < 0 ? 'הקוסינוס שלילי, ולכן הזווית קהה: ' : cosValue === 0 ? 'הקוסינוס אפס, ולכן הזווית ישרה: ' : 'הקוסינוס חיובי, ולכן הזווית חדה: '}$\angle ${V}${approx(angle)}^\circ$.`,
      ],
      finalAnswer: String.raw`$\angle ${V}${approx(angle)}^\circ$`,
      answers: [{ label: String.raw`$\angle ${V}$ (במעלות)`, value: angle }],
      figureSvg,
      data: { a, b, c, target },
    };
  },
};

const triangleArea: ExerciseGenerator = {
  id: 'gen-triangle-area-sin',
  lessonIds: ['trig-triangle-area'],
  title: 'שטח משולש לפי שתי צלעות והזווית שביניהן',
  difficulty: 2,
  generate(rng): GeneratedExercise {
    const mode = rng.int(0, 3);
    const formula = String.raw`שטח משולש לפי שתי צלעות והזווית הכלואה ביניהן: $S=\frac12\cdot AB\cdot AC\cdot\sin\angle A$.`;
    const hints = [String.raw`$S=\frac12ab\sin\gamma$ – שתי צלעות והזווית הכלואה ביניהן.`];
    const triangleFigure = (c: number, b: number, alpha: number, labels: { c: string; b: string; angle: string }) =>
      svgFigure({
        points: { A: pt(0, 0), B: pt(c, 0), C: polar(pt(0, 0), b, alpha) },
        polygons: [['A', 'B', 'C']],
        labels: ['A', 'B', 'C'],
        angles: [{ at: 'A', a: 'B', b: 'C', text: labels.angle }],
        sideLabels: [
          { a: 'A', b: 'B', text: labels.c },
          { a: 'A', b: 'C', text: labels.b },
        ].filter((side) => side.text !== ''),
      });
    if (mode === 0) {
      const b = randomDecimalHalf(rng, 3, 15);
      const c = randomDecimalHalf(rng, 3, 15);
      const alpha = rng.int(20, 160);
      const S = 0.5 * b * c * sinD(alpha);
      return {
        statement: String.raw`במשולש $ABC$ נתון $AB=${fmt(c)}$, $AC=${fmt(b)}$, $\angle A=${deg(alpha)}$ (ראו שרטוט).` + '\n\n' + 'חשבו את שטח המשולש.',
        hints: [...hints, String.raw`הזווית $\angle A$ כלואה בין הצלעות $AB$ ו-$AC$.`],
        solutionSteps: [formula, String.raw`$S=\frac12\cdot ${fmt(c)}\cdot ${fmt(b)}\cdot\sin${deg(alpha)}${approx(S)}$.`],
        finalAnswer: String.raw`$S${approx(S)}$`,
        answers: [{ label: 'שטח המשולש', value: S }],
        figureSvg: triangleFigure(c, b, alpha, { c: fmt(c), b: fmt(b), angle: `${alpha}°` }),
        data: { mode, b, c, alpha },
      };
    }
    if (mode === 1) {
      const b = rng.int(4, 15);
      const c = rng.int(4, 15);
      const S = rng.int(Math.ceil(0.1 * b * c), Math.floor(0.48 * b * c));
      const sinA = (2 * S) / (b * c);
      const alpha = toDeg(Math.asin(sinA));
      return {
        statement:
          String.raw`במשולש $ABC$ נתון $AB=${c}$, $AC=${b}$, ושטח המשולש הוא $${S}$. ידוע כי הזווית $\angle A$ חדה.` + '\n\n' + String.raw`חשבו את $\angle A$ (במעלות).`,
        hints: [...hints, String.raw`הציבו את הנתונים ובודדו את $\sin\angle A$; זכרו שהזווית חדה.`],
        solutionSteps: [
          formula,
          String.raw`$${S}=\frac12\cdot ${c}\cdot ${b}\cdot\sin\angle A\ \Rightarrow\ \sin\angle A=\frac{2\cdot ${S}}{${c}\cdot ${b}}=${fracTex(2 * S, b * c)}${approx4(sinA)}$.`,
          String.raw`$\angle A$ חדה, ולכן $\angle A${approx(alpha)}^\circ$ (הפתרון הקהה $180^\circ-\angle A$ נפסל).`,
        ],
        finalAnswer: String.raw`$\angle A${approx(alpha)}^\circ$`,
        answers: [{ label: String.raw`$\angle A$ (במעלות)`, value: alpha }],
        figureSvg: triangleFigure(c, b, alpha, { c: String(c), b: String(b), angle: '?' }),
        data: { mode, b, c, S },
      };
    }
    if (mode === 2) {
      const b = rng.int(4, 15);
      const alpha = rng.int(20, 160);
      const c0 = rng.int(4, 15);
      const S = Math.max(1, Math.round(0.5 * b * c0 * sinD(alpha)));
      const c = (2 * S) / (b * sinD(alpha));
      return {
        statement: String.raw`במשולש $ABC$ נתון $AC=${b}$, $\angle A=${deg(alpha)}$, ושטח המשולש הוא $${S}$.` + '\n\n' + String.raw`חשבו את אורך הצלע $AB$.`,
        hints: [...hints, String.raw`הציבו את הנתונים בנוסחה ובודדו את $AB$.`],
        solutionSteps: [formula, String.raw`$${S}=\frac12\cdot AB\cdot ${b}\cdot\sin${deg(alpha)}\ \Rightarrow\ AB=\frac{2\cdot ${S}}{${b}\cdot\sin${deg(alpha)}}${approx(c)}$.`],
        finalAnswer: String.raw`$AB${approx(c)}$`,
        answers: [{ label: '$AB$', value: c }],
        figureSvg: triangleFigure(c, b, alpha, { c: '?', b: String(b), angle: `${alpha}°` }),
        data: { mode, b, alpha, S },
      };
    }
    const a = randomDecimalHalf(rng, 3, 15);
    const d = randomDecimalHalf(rng, 3, 12);
    const alpha = rng.int(20, 160);
    const S = a * d * sinD(alpha);
    const D = polar(pt(0, 0), d, alpha);
    return {
      statement: String.raw`במקבילית $ABCD$ נתון $AB=${fmt(a)}$, $AD=${fmt(d)}$, $\angle DAB=${deg(alpha)}$ (ראו שרטוט).` + '\n\n' + 'חשבו את שטח המקבילית.',
      hints: [String.raw`האלכסון $BD$ מחלק את המקבילית לשני משולשים חופפים.`, String.raw`שטח המשולש $ABD$ הוא $\frac12\cdot AB\cdot AD\cdot\sin\angle A$.`],
      solutionSteps: [
        String.raw`האלכסון $BD$ מחלק את המקבילית לשני משולשים חופפים ($\triangle ABD\cong\triangle CDB$, לפי צ.צ.צ.), ולכן $S_{ABCD}=2S_{ABD}$.`,
        String.raw`$S_{ABD}=\frac12\cdot AB\cdot AD\cdot\sin\angle A=\frac12\cdot ${fmt(a)}\cdot ${fmt(d)}\cdot\sin${deg(alpha)}${approx(S / 2)}$.`,
        String.raw`$S_{ABCD}=AB\cdot AD\cdot\sin\angle A${approx(S)}$.`,
      ],
      finalAnswer: String.raw`$S_{ABCD}${approx(S)}$`,
      answers: [{ label: 'שטח המקבילית', value: S }],
      figureSvg: svgFigure({
        points: { A: pt(0, 0), B: pt(a, 0), C: pt(a + D.x, D.y), D },
        polygons: [['A', 'B', 'C', 'D']],
        segments: [{ a: 'B', b: 'D', dashed: true }],
        labels: ['A', 'B', 'C', 'D'],
        angles: [{ at: 'A', a: 'B', b: 'D', text: `${alpha}°` }],
        sideLabels: [
          { a: 'A', b: 'B', text: fmt(a) },
          { a: 'A', b: 'D', text: fmt(d) },
        ],
      }),
      data: { mode, a, d, alpha },
    };
  },
};

interface EquationSpec {
  /** KaTeX with F standing for the function name. */
  tex: string;
  /** The equation is coef·F(x) + constant = 0. */
  coef: number;
  constant: number;
  /** The isolated value as KaTeX, e.g. '\frac{\sqrt{3}}{2}'. */
  valueTex: string;
}

const S3 = Math.sqrt(3);
const S2 = Math.sqrt(2);
const SIN_COS_EQUATIONS: EquationSpec[] = [
  { tex: '2F x=1', coef: 2, constant: -1, valueTex: String.raw`\frac{1}{2}` },
  { tex: '2F x+1=0', coef: 2, constant: 1, valueTex: String.raw`-\frac{1}{2}` },
  { tex: String.raw`2F x=\sqrt{3}`, coef: 2, constant: -S3, valueTex: String.raw`\frac{\sqrt{3}}{2}` },
  { tex: String.raw`2F x+\sqrt{3}=0`, coef: 2, constant: S3, valueTex: String.raw`-\frac{\sqrt{3}}{2}` },
  { tex: String.raw`\sqrt{2}F x=1`, coef: S2, constant: -1, valueTex: String.raw`\frac{1}{\sqrt{2}}=\frac{\sqrt{2}}{2}` },
  { tex: String.raw`\sqrt{2}F x+1=0`, coef: S2, constant: 1, valueTex: String.raw`-\frac{\sqrt{2}}{2}` },
  { tex: 'F x=1', coef: 1, constant: -1, valueTex: '1' },
  { tex: 'F x+1=0', coef: 1, constant: 1, valueTex: '-1' },
  { tex: '3F x=0', coef: 3, constant: 0, valueTex: '0' },
  { tex: '5F x=2', coef: 5, constant: -2, valueTex: String.raw`\frac{2}{5}` },
  { tex: '10F x+3=0', coef: 10, constant: 3, valueTex: String.raw`-\frac{3}{10}` },
  { tex: '4F x=3', coef: 4, constant: -3, valueTex: String.raw`\frac{3}{4}` },
  { tex: '5F x+4=0', coef: 5, constant: 4, valueTex: String.raw`-\frac{4}{5}` },
  { tex: '5F x=1', coef: 5, constant: -1, valueTex: String.raw`\frac{1}{5}` },
];
const TAN_EQUATIONS: EquationSpec[] = [
  { tex: 'F x=1', coef: 1, constant: -1, valueTex: '1' },
  { tex: 'F x+1=0', coef: 1, constant: 1, valueTex: '-1' },
  { tex: String.raw`\sqrt{3}F x=1`, coef: S3, constant: -1, valueTex: String.raw`\frac{1}{\sqrt{3}}` },
  { tex: String.raw`F x=\sqrt{3}`, coef: 1, constant: -S3, valueTex: String.raw`\sqrt{3}` },
  { tex: String.raw`F x+\sqrt{3}=0`, coef: 1, constant: S3, valueTex: String.raw`-\sqrt{3}` },
  { tex: String.raw`\sqrt{3}F x+1=0`, coef: S3, constant: 1, valueTex: String.raw`-\frac{1}{\sqrt{3}}` },
  { tex: '2F x=3', coef: 2, constant: -3, valueTex: String.raw`\frac{3}{2}` },
  { tex: '4F x+1=0', coef: 4, constant: 1, valueTex: String.raw`-\frac{1}{4}` },
  { tex: '5F x=2', coef: 5, constant: -2, valueTex: String.raw`\frac{2}{5}` },
];

/** Normalises an angle in degrees to [0, 360), snapping values within 1e-9 of an integer. */
function normalise(x: number): number {
  let y = x % 360;
  if (y < 0) y += 360;
  const near = Math.round(y);
  if (Math.abs(y - near) < 1e-9) y = near;
  return y === 360 ? 0 : y;
}

const trigEquation: ExerciseGenerator = {
  id: 'gen-trig-equation',
  lessonIds: ['trig-equations'],
  title: 'משוואה טריגונומטרית בסיסית בתחום נתון',
  difficulty: 2,
  generate(rng): GeneratedExercise {
    const fn = rng.int(0, 2); // 0 sin, 1 cos, 2 tan
    const name = [String.raw`\sin`, String.raw`\cos`, String.raw`\tan`][fn];
    const spec = fn === 2 ? rng.pick(TAN_EQUATIONS) : rng.pick(SIN_COS_EQUATIONS);
    const value = -spec.constant / spec.coef;
    const equation = spec.tex.replace('F', name);
    const isolated = String.raw`${name} x=${spec.valueTex}`;
    let base: number;
    let families: string;
    let candidates: number[];
    if (fn === 0) {
      base = toDeg(Math.asin(value));
      families = String.raw`$x=${fmt(base)}^\circ+360^\circ k$ או $x=180^\circ-${base < 0 ? `(${fmt(base)}^\circ)` : `${fmt(base)}^\circ`}+360^\circ k=${fmt(180 - base)}^\circ+360^\circ k$`;
      candidates = [base, 180 - base];
    } else if (fn === 1) {
      base = toDeg(Math.acos(value));
      families = String.raw`$x=\pm${fmt(base)}^\circ+360^\circ k$`;
      candidates = [base, -base];
    } else {
      base = toDeg(Math.atan(value));
      families = String.raw`$x=${fmt(base)}^\circ+180^\circ k$`;
      candidates = [base, base + 180];
    }
    const solutions = [...new Set(candidates.map(normalise).map((x) => Math.round(x * 1e9) / 1e9))].sort((p, q) => p - q);
    const exact = isExact(base, 2);
    const baseText = fn === 0 ? String.raw`\sin x=\sin(${fmt(base)}^\circ)` : fn === 1 ? String.raw`\cos x=\cos(${fmt(base)}^\circ)` : String.raw`\tan x=\tan(${fmt(base)}^\circ)`;
    const listText = solutions.map((x) => `${rel(x)}${fmt(x)}^\\circ`);
    const steps = [
      String.raw`מבודדים את הפונקציה הטריגונומטרית: $${equation}\ \Rightarrow\ ${isolated}$.`,
      exact
        ? String.raw`$${name}(${fmt(base)}^\circ)=${spec.valueTex}$, ולכן $${baseText}$, והפתרון הכללי הוא ${families}.`
        : String.raw`בעזרת המחשבון מוצאים זווית אחת המקיימת את המשוואה: $${name}(${fmt(base)}^\circ)\approx${fmt(value, 4)}$ (הזווית מעוגלת), ולכן הפתרון הכללי הוא בקירוב ${families}.`,
      String.raw`מציבים ערכים שלמים של $k$ ובוחרים את הפתרונות שבתחום $0^\circ\le x<360^\circ$: ${solutions.map((_, index) => String.raw`$x_{${index + 1}}${listText[index]}$`).join(', ')}.`,
    ];
    if (candidates.length === 2 && solutions.length === 1) steps.push('שתי משפחות הפתרונות מתלכדות כאן, ולכן בתחום יש פתרון אחד בלבד.');
    const answers = [
      { label: 'מספר הפתרונות בתחום', value: solutions.length },
      ...solutions.map((x, index) => ({
        label: solutions.length === 1 ? String.raw`$x_1$ (במעלות)` : index === 0 ? String.raw`$x_1$ (הפתרון הקטן, במעלות)` : String.raw`$x_${index + 1}$ (במעלות)`,
        value: x,
      })),
    ];
    return {
      statement: String.raw`פתרו את המשוואה $${equation}$ בתחום $0^\circ\le x<360^\circ$.` + '\n\n' + 'כמה פתרונות יש למשוואה בתחום? רשמו אותם בסדר עולה.',
      hints: [
        String.raw`בודדו את $${name} x$.`,
        fn === 0
          ? String.raw`אם $\sin x=\sin\alpha$ אז $x=\alpha+360^\circ k$ או $x=180^\circ-\alpha+360^\circ k$.`
          : fn === 1
            ? String.raw`אם $\cos x=\cos\alpha$ אז $x=\pm\alpha+360^\circ k$.`
            : String.raw`אם $\tan x=\tan\alpha$ אז $x=\alpha+180^\circ k$.`,
        'הציבו ערכים שלמים של $k$ ושמרו רק את הפתרונות שבתחום.',
      ],
      solutionSteps: steps,
      finalAnswer: String.raw`${solutions.length === 1 ? 'פתרון אחד' : `${solutions.length} פתרונות`}: ${solutions.map((_, index) => String.raw`$x_{${index + 1}}${listText[index]}$`).join(', ')}`,
      answers,
      data: { fn, coef: spec.coef, constant: spec.constant },
    };
  },
};

const solveTriangleSAS: ExerciseGenerator = {
  id: 'gen-solve-triangle-sas',
  lessonIds: ['trig-laws-level-b', 'trig-polygons'],
  title: 'פתרון משולש: צלע, זווית, רדיוס ושטח',
  difficulty: 3,
  generate(rng): GeneratedExercise {
    const c = randomDecimalHalf(rng, 4, 14); // AB
    let b = randomDecimalHalf(rng, 4, 14); // AC
    if (b === c) b += 1.5;
    const alpha = rng.int(30, 140);
    const sq = b * b + c * c - 2 * b * c * cosD(alpha);
    const a = Math.sqrt(sq);
    // ask for the angle opposite the shorter of AB, AC — it is never the largest angle, so it is acute
    const askB = b < c; // angle B is opposite AC = b
    const V = askB ? 'B' : 'C';
    const opposite = askB ? b : c;
    const oppositeName = askB ? 'AC' : 'AB';
    const sinAngle = (opposite * sinD(alpha)) / a;
    const angle = toDeg(Math.asin(sinAngle));
    const R = a / (2 * sinD(alpha));
    const S = 0.5 * b * c * sinD(alpha);
    const figureSvg = svgFigure({
      points: { A: pt(0, 0), B: pt(c, 0), C: polar(pt(0, 0), b, alpha) },
      polygons: [['A', 'B', 'C']],
      labels: ['A', 'B', 'C'],
      angles: [
        { at: 'A', a: 'B', b: 'C', text: `${alpha}°` },
        { at: V, a: 'A', b: askB ? 'C' : 'B', text: '?' },
      ],
      sideLabels: [
        { a: 'A', b: 'B', text: fmt(c) },
        { a: 'A', b: 'C', text: fmt(b) },
      ],
    });
    return {
      statement:
        String.raw`במשולש $ABC$ נתון $AB=${fmt(c)}$, $AC=${fmt(b)}$, $\angle BAC=${deg(alpha)}$ (ראו שרטוט).` +
        '\n\n' +
        String.raw`א. חשבו את אורך הצלע $BC$.` +
        '\n\n' +
        String.raw`ב. חשבו את הזווית $\angle ${V}$ (במעלות).` +
        '\n\n' +
        'ג. חשבו את רדיוס המעגל החוסם את המשולש ואת שטח המשולש.',
      hints: [
        String.raw`נתונות שתי צלעות והזווית שביניהן – התחילו במשפט הקוסינוסים.`,
        String.raw`למציאת $\angle ${V}$ השתמשו במשפט הסינוסים; הזווית נמצאת מול הצלע הקצרה מבין $AB$ ו-$AC$, ולכן אינה הזווית הגדולה במשולש – היא חדה.`,
        String.raw`$\frac{BC}{\sin\angle A}=2R$ ו-$S=\frac12\cdot AB\cdot AC\cdot\sin\angle A$.`,
      ],
      solutionSteps: [
        String.raw`לפי משפט הקוסינוסים: $BC^2=AB^2+AC^2-2\cdot AB\cdot AC\cdot\cos\angle A=${fmt(c)}^2+${fmt(b)}^2-2\cdot ${fmt(c)}\cdot ${fmt(b)}\cdot\cos${deg(alpha)}${approx(sq)}$, ולכן $BC${approx(a)}$.`,
        String.raw`לפי משפט הסינוסים: $\frac{${oppositeName}}{\sin\angle ${V}}=\frac{BC}{\sin\angle A}$, ולכן $\sin\angle ${V}=\frac{${fmt(opposite)}\cdot\sin${deg(alpha)}}{BC}${approx4(sinAngle)}$.`,
        String.raw`$${oppositeName}$ אינה הצלע הארוכה במשולש (${askB ? '$AC<AB$' : '$AB<AC$'}), ולכן מולה נמצאת זווית שאינה הגדולה במשולש – זווית חדה. מכאן $\angle ${V}${approx(angle)}^\circ$.`,
        String.raw`רדיוס המעגל החוסם לפי משפט הסינוסים: $2R=\frac{BC}{\sin\angle A}$, ולכן $R=\frac{BC}{2\sin${deg(alpha)}}${approx(R)}$.`,
        String.raw`שטח המשולש: $S=\frac12\cdot${fmt(c)}\cdot${fmt(b)}\cdot\sin${deg(alpha)}${approx(S)}$.`,
      ],
      finalAnswer: String.raw`$BC${approx(a)}$, $\angle ${V}${approx(angle)}^\circ$, $R${approx(R)}$, $S${approx(S)}$`,
      answers: [
        { label: '$BC$', value: a },
        { label: String.raw`$\angle ${V}$ (במעלות)`, value: angle },
        { label: 'רדיוס המעגל החוסם $R$', value: R },
        { label: 'שטח המשולש', value: S },
      ],
      figureSvg,
      data: { b, c, alpha },
    };
  },
};

/** '=' when exact at 2 decimals, otherwise '\approx'. */
function rel(value: number): string {
  return isExact(value, 2) ? '=' : String.raw`\approx`;
}

export const trigonometryGenerators: ExerciseGenerator[] = [rightTriangle, sineLawSide, circumradius, cosineLawSide, cosineLawAngle, triangleArea, solveTriangleSAS, trigEquation];
