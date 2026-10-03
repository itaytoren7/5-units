import type { ExerciseSource, LessonExercise } from '../types';

/**
 * Exercises adapted (translated) from OpenStax books, keyed by lesson id. Every exercise carries a `source` attribution.
 *
 * Source: OpenStax, Algebra and Trigonometry 2e (Jay Abramson et al.), section exercises — CC BY-NC-SA 4.0.
 * The statements are Hebrew translations (Israeli notation); hints and step-by-step solutions were written for this site.
 * This adapted material is shared under the same licence.
 */

const BOOK_URL = 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/';

const SECTIONS = {
  coordinates: ['2.1 The Rectangular Coordinate Systems and Graphs', '2-1-the-rectangular-coordinate-systems-and-graphs'],
  models: ['2.3 Models and Applications', '2-3-models-and-applications'],
  linear: ['4.1 Linear Functions', '4-1-linear-functions'],
  angles: ['7.1 Angles', '7-1-angles'],
  rightTriangle: ['7.2 Right Triangle Trigonometry', '7-2-right-triangle-trigonometry'],
  unitCircle: ['7.3 Unit Circle', '7-3-unit-circle'],
  verifying: [
    '9.1 Verifying Trigonometric Identities and Using Trigonometric Identities to Simplify Trigonometric Expressions',
    '9-1-verifying-trigonometric-identities-and-using-trigonometric-identities-to-simplify-trigonometric-expressions',
  ],
  sumDifference: ['9.2 Sum and Difference Identities', '9-2-sum-and-difference-identities'],
  doubleAngle: ['9.3 Double-Angle, Half-Angle, and Reduction Formulas', '9-3-double-angle-half-angle-and-reduction-formulas'],
  trigEquations: ['9.5 Solving Trigonometric Equations', '9-5-solving-trigonometric-equations'],
  lawOfSines: ['10.1 Non-right Triangles: Law of Sines', '10-1-non-right-triangles-law-of-sines'],
  lawOfCosines: ['10.2 Non-right Triangles: Law of Cosines', '10-2-non-right-triangles-law-of-cosines'],
  systems: ['11.1 Systems of Linear Equations: Two Variables', '11-1-systems-of-linear-equations-two-variables'],
  geometric: ['13.3 Geometric Sequences', '13-3-geometric-sequences'],
  series: ['13.4 Series and Their Notations', '13-4-series-and-their-notations'],
  probability: ['13.7 Probability', '13-7-probability'],
} as const;

type SectionKey = keyof typeof SECTIONS;

/** Attribution for exercise `exercise` (a number, or a range such as '56–57') of an OpenStax section. */
function openstax(section: SectionKey, exercise: number | string): ExerciseSource {
  const [title, slug] = SECTIONS[section];
  const label = typeof exercise === 'string' && exercise.includes('–') ? `תרגילים ${exercise}` : `תרגיל ${exercise}`;
  return {
    kind: 'openstax',
    work: 'OpenStax, Algebra and Trigonometry 2e',
    section: `${title}, ${label}`,
    url: BOOK_URL + slug,
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    adapted: true,
  };
}

const SPINNER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="95.0" />
  <line x1="160.0" y1="120.0" x2="160.0" y2="25.0" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="227.2" y2="52.8" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="255.0" y2="120.0" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="227.2" y2="187.2" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="160.0" y2="215.0" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="92.8" y2="187.2" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="65.0" y2="120.0" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="92.8" y2="52.8" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="185.9" y2="105.0" stroke-width="3" />
  <polygon points="194.6,100.0 188.4,109.3 183.4,100.7" fill="currentColor" stroke-width="1" />
  <circle cx="160.0" cy="120.0" r="5.0" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif" text-anchor="middle">
    <text x="183.7" y="68.7">A</text>
    <text x="217.3" y="102.3">B</text>
    <text x="217.3" y="149.7">C</text>
    <text x="183.7" y="183.3">D</text>
    <text x="136.3" y="183.3">E</text>
    <text x="102.7" y="149.7">F</text>
    <text x="102.7" y="102.3">I</text>
    <text x="136.3" y="68.7">O</text>
  </g>
</svg>`;

const SPINNER_COLORS = 'A – כחול, B – סגול, C – כתום, D – כחול, E – אדום, F – ירוק, I – ירוק, O – צהוב';

export const openstaxPrecalcExercises: Record<string, LessonExercise[]> = {
  // ───────────────────────── טריגונומטריה ─────────────────────────
  'trig-basics': [
    {
      id: 'trig-basics-os1',
      difficulty: 1,
      statement: String.raw`מצאו את אורך הקשת במעגל שרדיוסו 10 סנטימטרים, הנשענת על זווית מרכזית של $50^\circ$. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`אורך קשת הוא $L=R\theta$, כאשר $\theta$ היא הזווית המרכזית ברדיאנים.`, String.raw`המירו קודם: $50^\circ=50\cdot\frac{\pi}{180}$ רדיאנים.`],
      solutionSteps: [
        String.raw`נמיר את הזווית המרכזית לרדיאנים: $\theta=50\cdot\frac{\pi}{180}=\frac{5\pi}{18}$.`,
        String.raw`אורך הקשת: $L=R\theta=10\cdot\frac{5\pi}{18}=\frac{25\pi}{9}$.`,
        String.raw`בדיקה בדרך אחרת: הקשת היא $\frac{50}{360}$ מהיקף המעגל, כלומר $\frac{50}{360}\cdot2\pi\cdot10=\frac{25\pi}{9}\approx8.73$ סנטימטרים.`,
      ],
      finalAnswer: String.raw`$L=\frac{25\pi}{9}\approx8.73$ ס״מ`,
      answers: [{ label: 'אורך הקשת (ס״מ)', value: (25 * Math.PI) / 9 }],
      source: openstax('angles', 43),
    },
    {
      id: 'trig-basics-os2',
      difficulty: 1,
      statement: String.raw`לגזרה של מעגל יש זווית מרכזית של $30^\circ$, ורדיוס המעגל הוא 20 סנטימטרים. מצאו את שטח הגזרה. עגלו לארבע ספרות אחרי הנקודה.`,
      hints: [String.raw`שטח גזרה הוא $S=\frac12R^2\theta$ ($\theta$ ברדיאנים), או החלק $\frac{\alpha}{360}$ משטח העיגול.`],
      solutionSteps: [
        String.raw`נמיר לרדיאנים: $30^\circ=30\cdot\frac{\pi}{180}=\frac{\pi}{6}$.`,
        String.raw`$S=\frac12R^2\theta=\frac12\cdot20^2\cdot\frac{\pi}{6}=\frac{400\pi}{12}=\frac{100\pi}{3}$.`,
        String.raw`בדיקה: הגזרה היא $\frac{30}{360}$ מהעיגול, $\frac{30}{360}\cdot\pi\cdot20^2=\frac{400\pi}{12}=\frac{100\pi}{3}\approx104.7198$ סמ״ר.`,
      ],
      finalAnswer: String.raw`$S=\frac{100\pi}{3}\approx104.7198$ סמ״ר`,
      answers: [{ label: 'שטח הגזרה (סמ״ר)', value: (100 * Math.PI) / 3 }],
      source: openstax('angles', 47),
    },
    {
      id: 'trig-basics-os3',
      difficulty: 2,
      statement: String.raw`נתון $\sin t=-\frac14$, והזווית $t$ נמצאת ברביע השלישי. מצאו את $\cos t$.`,
      hints: [String.raw`השתמשו בזהות $\sin^2t+\cos^2t=1$.`, String.raw`ברביע השלישי גם הסינוס וגם הקוסינוס שליליים.`],
      solutionSteps: [
        String.raw`לפי $\sin^2t+\cos^2t=1$: $\cos^2t=1-\left(-\frac14\right)^2=1-\frac1{16}=\frac{15}{16}$.`,
        String.raw`לכן $\cos t=\pm\frac{\sqrt{15}}{4}$.`,
        String.raw`ברביע השלישי שיעור ה-$x$ של הנקודה על מעגל היחידה שלילי, ולכן $\cos t<0$: $\cos t=-\frac{\sqrt{15}}{4}\approx-0.968$.`,
      ],
      finalAnswer: String.raw`$\cos t=-\frac{\sqrt{15}}{4}$`,
      answers: [{ label: String.raw`$\cos t$`, value: -Math.sqrt(15) / 4 }],
      source: openstax('unitCircle', 53),
    },
    {
      id: 'trig-basics-os4',
      difficulty: 2,
      statement: String.raw`מצאו את שיעורי הנקודה שעל מעגל שמרכזו בראשית הצירים ורדיוסו 20, המתאימה לזווית של $120^\circ$ (הזווית נמדדת מהכיוון החיובי של ציר $x$, נגד כיוון השעון).`,
      hints: [String.raw`על מעגל שרדיוסו $R$ הנקודה המתאימה לזווית $\alpha$ היא $(R\cos\alpha,\ R\sin\alpha)$.`, String.raw`זווית הייחוס של $120^\circ$ היא $60^\circ$, והנקודה ברביע השני.`],
      solutionSteps: [
        String.raw`הנקודה המתאימה לזווית $\alpha$ על מעגל שרדיוסו $R$ היא $(R\cos\alpha,\ R\sin\alpha)$ – הנקודה שעל מעגל היחידה מוכפלת ב-$R$.`,
        String.raw`$\cos120^\circ=\cos(180^\circ-60^\circ)=-\cos60^\circ=-\frac12$, ו-$\sin120^\circ=\sin(180^\circ-60^\circ)=\sin60^\circ=\frac{\sqrt3}{2}$.`,
        String.raw`לכן $x=20\cdot\left(-\frac12\right)=-10$ ו-$y=20\cdot\frac{\sqrt3}{2}=10\sqrt3\approx17.32$.`,
        String.raw`בדיקה: $(-10)^2+(10\sqrt3)^2=100+300=400=20^2$, כלומר הנקודה אכן על המעגל.`,
      ],
      finalAnswer: String.raw`$(-10,\ 10\sqrt3)$`,
      answers: [
        { label: String.raw`$x$`, value: -10 },
        { label: String.raw`$y$`, value: 10 * Math.sqrt(3) },
      ],
      source: openstax('unitCircle', 55),
    },
    {
      id: 'trig-basics-os5',
      difficulty: 2,
      statement: String.raw`חשבו את הערך המדויק של הביטוי $\sin\left(-\frac{9\pi}{4}\right)\cos\left(-\frac{\pi}{6}\right)$.`,
      hints: [String.raw`השתמשו בזוגיות: $\sin(-x)=-\sin x$ ו-$\cos(-x)=\cos x$.`, String.raw`הורידו מחזור שלם: $\frac{9\pi}{4}=2\pi+\frac{\pi}{4}$.`],
      solutionSteps: [
        String.raw`$\sin$ פונקציה אי-זוגית: $\sin\left(-\frac{9\pi}{4}\right)=-\sin\frac{9\pi}{4}$.`,
        String.raw`המחזור של $\sin$ הוא $2\pi$, ו-$\frac{9\pi}{4}=2\pi+\frac{\pi}{4}$, לכן $\sin\frac{9\pi}{4}=\sin\frac{\pi}{4}=\frac{\sqrt2}{2}$, ומכאן $\sin\left(-\frac{9\pi}{4}\right)=-\frac{\sqrt2}{2}$.`,
        String.raw`$\cos$ פונקציה זוגית: $\cos\left(-\frac{\pi}{6}\right)=\cos\frac{\pi}{6}=\frac{\sqrt3}{2}$.`,
        String.raw`המכפלה: $-\frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2}=-\frac{\sqrt6}{4}\approx-0.612$.`,
      ],
      finalAnswer: String.raw`$-\frac{\sqrt6}{4}$`,
      answers: [{ label: 'ערך הביטוי', value: -Math.sqrt(6) / 4 }],
      source: openstax('unitCircle', 93),
    },
    {
      id: 'trig-basics-os6',
      difficulty: 3,
      statement: String.raw`ילד עולה על קרוסלה שמשלימה סיבוב שלם אחד בדקה. הילד עולה בנקודה $(0,1)$, כלומר בנקודה הצפונית ביותר, והקרוסלה מסתובבת נגד כיוון השעון (את הקרוסלה מתארים כמעגל היחידה). מתי יהיו שיעורי הילד $(0.707,\,-0.707)$, אם הסיבוב נמשך 6 דקות? (יש כמה תשובות.)`,
      hints: [
        String.raw`בכל שנייה הקרוסלה מסתובבת $\frac{360^\circ}{60}=6^\circ$.`,
        String.raw`הנקודה $(0,1)$ מתאימה לזווית $90^\circ$, והנקודה $(0.707,-0.707)\approx\left(\frac{\sqrt2}{2},-\frac{\sqrt2}{2}\right)$ מתאימה לזווית $315^\circ$.`,
        String.raw`פתרו $90+6t=315+360k$ עבור $0\le t\le360$.`,
      ],
      solutionSteps: [
        String.raw`הקרוסלה משלימה $360^\circ$ ב-60 שניות, כלומר $6^\circ$ בשנייה. בזמן $t=0$ הילד בנקודה $(0,1)$, המתאימה לזווית $90^\circ$, ולכן אחרי $t$ שניות הוא נמצא בזווית $90^\circ+6t$.`,
        String.raw`$0.707\approx\frac{\sqrt2}{2}$, ולכן $(0.707,-0.707)$ היא הנקודה $(\cos315^\circ,\sin315^\circ)$ – ברביע הרביעי, עם זווית ייחוס $45^\circ$.`,
        String.raw`בגלל המחזוריות, הילד נמצא בנקודה הזו כאשר $90+6t=315+360k$ ($k$ שלם), כלומר $6t=225+360k$ ו-$t=37.5+60k$ שניות.`,
        String.raw`הסיבוב נמשך 6 דקות, כלומר 360 שניות, ולכן $0\le t\le360$, ומתקבלים $k=0,1,\dots,5$.`,
        String.raw`הזמנים: 37.5, 97.5, 157.5, 217.5, 277.5 ו-337.5 שניות – 6 פעמים.`,
      ],
      finalAnswer: 'אחרי 37.5, 97.5, 157.5, 217.5, 277.5 ו-337.5 שניות (6 פעמים).',
      answers: [
        { label: 'הפעם הראשונה (שניות)', value: 37.5 },
        { label: 'מספר הפעמים', value: 6 },
      ],
      source: openstax('unitCircle', 103),
    },
  ],

  'trig-right-triangle': [
    {
      id: 'trig-right-triangle-os1',
      difficulty: 1,
      statement: String.raw`במשולש ישר זווית הצלע $a$ נמצאת מול הזווית $A$, הצלע $b$ מול הזווית $B$, ו-$c$ הוא היתר. נתון $\sin B=\frac12$ ו-$a=20$. מצאו את אורכי הצלעות החסרות.`,
      hints: [String.raw`$\sin B=\frac12$ והזווית $B$ חדה, לכן $B=30^\circ$.`, String.raw`הצלע $a$ היא הניצב שליד הזווית $B$: $\tan B=\frac ba$ ו-$\cos B=\frac ac$.`],
      solutionSteps: [
        String.raw`$B$ היא זווית חדה במשולש ישר זווית ו-$\sin B=\frac12$, לכן $B=30^\circ$.`,
        String.raw`הצלע $a$ נמצאת מול $A$, כלומר היא הניצב שליד $B$, ו-$b$ הוא הניצב שמול $B$.`,
        String.raw`$\tan B=\frac{b}{a}$, ולכן $b=20\tan30^\circ=20\cdot\frac{\sqrt3}{3}=\frac{20\sqrt3}{3}\approx11.55$.`,
        String.raw`$\cos B=\frac{a}{c}$, ולכן $c=\frac{20}{\cos30^\circ}=\frac{20}{\frac{\sqrt3}{2}}=\frac{40\sqrt3}{3}\approx23.09$.`,
        String.raw`בדיקה: $\sin B=\frac bc=\frac{20\sqrt3/3}{40\sqrt3/3}=\frac12$, כנדרש.`,
      ],
      finalAnswer: String.raw`$b=\frac{20\sqrt3}{3}\approx11.55$, $c=\frac{40\sqrt3}{3}\approx23.09$`,
      answers: [
        { label: String.raw`$b$`, value: 20 / Math.sqrt(3) },
        { label: String.raw`$c$`, value: 40 / Math.sqrt(3) },
      ],
      source: openstax('rightTriangle', 11),
    },
    {
      id: 'trig-right-triangle-os2',
      difficulty: 1,
      statement: String.raw`מצאו את אורכי הצלעות $b$ ו-$c$ במשולש ישר הזווית שבשרטוט ($\angle C=90^\circ$, $\angle A=30^\circ$, והניצב שמול הזווית $A$ הוא $a=7$).`,
      figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="40.0,196.0 280.0,196.0 280.0,57.4" />
  <polyline points="268.0,196.0 268.0,184.0 280.0,184.0" stroke-width="1" />
  <path d="M 74.0,196.0 A 34 34 0 0 0 69.4,179.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="24.0" y="204.0">A</text>
    <text x="286.0" y="212.0">C</text>
    <text x="286.0" y="56.0">B</text>
    <text x="80.0" y="190.0" font-size="13">30°</text>
    <text x="288.0" y="132.0">7</text>
    <text x="156.0" y="218.0" font-style="italic">b</text>
    <text x="146.0" y="114.0" font-style="italic">c</text>
  </g>
</svg>`,
      hints: [String.raw`$c$ הוא היתר: $\sin30^\circ=\frac{7}{c}$.`, String.raw`$b$ הוא הניצב שליד הזווית $30^\circ$: $\tan30^\circ=\frac{7}{b}$.`],
      solutionSteps: [
        String.raw`הצלע 7 נמצאת מול הזווית $30^\circ$, ו-$c$ הוא היתר, לכן $\sin30^\circ=\frac7c$, כלומר $c=\frac{7}{1/2}=14$.`,
        String.raw`$b$ הוא הניצב שליד הזווית $30^\circ$: $\tan30^\circ=\frac7b$, ולכן $b=\frac{7}{\tan30^\circ}=\frac{7}{\sqrt3/3}=7\sqrt3\approx12.12$.`,
        String.raw`בדיקה לפי משפט פיתגורס: $7^2+(7\sqrt3)^2=49+147=196=14^2$.`,
      ],
      finalAnswer: String.raw`$c=14$, $b=7\sqrt3\approx12.12$`,
      answers: [
        { label: String.raw`$b$`, value: 7 * Math.sqrt(3) },
        { label: String.raw`$c$`, value: 14 },
      ],
      source: openstax('rightTriangle', 29),
    },
    {
      id: 'trig-right-triangle-os3',
      difficulty: 2,
      statement: String.raw`מגדל שידור עומד במרחק 325 רגל מבניין. אדם העומד ליד חלון בבניין מוצא שזווית ההרמה לראש המגדל היא $43^\circ$, וזווית ההשפלה לבסיס המגדל היא $31^\circ$. מהו גובה המגדל? עגלו לעשיריות.`,
      hints: [
        'העבירו מהחלון קו אופקי אל המגדל. הוא מחלק את המגדל לשני חלקים, וכל חלק הוא ניצב במשולש ישר זווית שהניצב השני שלו הוא 325.',
        String.raw`החלק העליון: $325\tan43^\circ$; החלק התחתון: $325\tan31^\circ$.`,
      ],
      solutionSteps: [
        'נעביר מהחלון קו אופקי עד המגדל. אורכו 325 רגל, והוא מאונך למגדל ומחלק אותו לחלק שמעל הקו ולחלק שמתחתיו.',
        String.raw`במשולש ישר הזווית העליון, הזווית שליד החלון היא זווית ההרמה $43^\circ$, ולכן החלק העליון הוא $325\tan43^\circ\approx303.07$ רגל.`,
        String.raw`במשולש התחתון, הזווית שליד החלון היא זווית ההשפלה $31^\circ$, ולכן החלק התחתון (שהוא גם גובה החלון מעל הקרקע) הוא $325\tan31^\circ\approx195.28$ רגל.`,
        String.raw`גובה המגדל: $325(\tan43^\circ+\tan31^\circ)\approx498.35$ רגל, כלומר כ-498.3 רגל.`,
      ],
      finalAnswer: 'כ-498.3 רגל',
      answers: [{ label: 'גובה המגדל (רגל)', value: 498.3471041786971 }],
      source: openstax('rightTriangle', 47),
    },
    {
      id: 'trig-right-triangle-os4',
      difficulty: 2,
      statement: String.raw`על גג בניין מותקן כליא ברק. ממקום הנמצא 500 רגל מבסיס הבניין, זווית ההרמה לראש הבניין היא $36^\circ$, ומאותו מקום זווית ההרמה לראש כליא הברק היא $38^\circ$. מצאו את גובהו של כליא הברק. עגלו לשלוש ספרות אחרי הנקודה.`,
      hints: ['יש שני משולשים ישרי זווית עם אותו ניצב אופקי, 500 רגל.', String.raw`גובה כליא הברק הוא ההפרש $500\tan38^\circ-500\tan36^\circ$.`],
      solutionSteps: [
        String.raw`במשולש ישר הזווית שקודקודיו הם נקודת המדידה, בסיס הבניין וראש הבניין: $\tan36^\circ=\frac{h_1}{500}$, ולכן גובה הבניין $h_1=500\tan36^\circ\approx363.27$ רגל.`,
        String.raw`באותו אופן, הגובה של ראש כליא הברק מעל הקרקע הוא $h_2=500\tan38^\circ\approx390.64$ רגל.`,
        String.raw`כליא הברק הוא ההפרש: $h_2-h_1=500(\tan38^\circ-\tan36^\circ)\approx27.372$ רגל.`,
      ],
      finalAnswer: 'כ-27.372 רגל',
      answers: [{ label: 'גובה כליא הברק (רגל)', value: 27.371549250678306 }],
      source: openstax('rightTriangle', 51),
    },
    {
      id: 'trig-right-triangle-os5',
      difficulty: 3,
      statement: String.raw`מצאו את $x$ (ראו שרטוט): במשולש, הזוויות שליד הצלע $x$ הן $36^\circ$ ו-$50^\circ$, והגובה לצלע $x$ הוא 85. עגלו לארבע ספרות אחרי הנקודה.`,
      figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,200.0 290.0,200.0 191.5,82.6" />
  <line x1="191.5" y1="82.6" x2="191.5" y2="200.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="181.5,200.0 181.5,190.0 191.5,190.0" stroke-width="1" />
  <path d="M 60.0,200.0 A 30 30 0 0 0 54.3,182.4" stroke-width="1.2" />
  <path d="M 260.0,200.0 A 30 30 0 0 1 270.7,177.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="64.0" y="195.0" font-size="13">36°</text>
    <text x="232.0" y="195.0" font-size="13">50°</text>
    <text x="198.0" y="150.0">85</text>
    <text x="156.0" y="222.0" font-style="italic">x</text>
  </g>
</svg>`,
      hints: [
        String.raw`הגובה מחלק את הצלע $x$ לשני קטעים, וכל קטע הוא ניצב במשולש ישר זווית.`,
        String.raw`בכל אחד מהמשולשים הניצב שמול הזווית הוא 85, ולכן הקטע שליד הזווית הוא $\frac{85}{\tan36^\circ}$ או $\frac{85}{\tan50^\circ}$.`,
      ],
      solutionSteps: [
        String.raw`הגובה שאורכו 85 מאונך לצלע $x$ ומחלק אותה לשני קטעים: $x_1$ ליד הזווית $36^\circ$ ו-$x_2$ ליד הזווית $50^\circ$. נוצרו שני משולשים ישרי זווית.`,
        String.raw`במשולש השמאלי: $\tan36^\circ=\frac{85}{x_1}$, ולכן $x_1=\frac{85}{\tan36^\circ}\approx116.9925$.`,
        String.raw`במשולש הימני: $\tan50^\circ=\frac{85}{x_2}$, ולכן $x_2=\frac{85}{\tan50^\circ}\approx71.3235$.`,
        String.raw`$x=x_1+x_2\approx188.3159$.`,
      ],
      finalAnswer: String.raw`$x\approx188.3159$`,
      answers: [{ label: String.raw`$x$`, value: 188.31593189011858 }],
      source: openstax('rightTriangle', 43),
    },
  ],

  'trig-identities': [
    {
      id: 'trig-identities-os1',
      difficulty: 1,
      statement: String.raw`השתמשו בזהויות היסוד כדי לפשט עד הסוף את הביטוי $\frac{1-\cos^2x}{\tan^2x}+2\sin^2x$.`,
      hints: [String.raw`$1-\cos^2x=\sin^2x$ ו-$\tan^2x=\frac{\sin^2x}{\cos^2x}$.`],
      solutionSteps: [
        String.raw`לפי $\sin^2x+\cos^2x=1$: $1-\cos^2x=\sin^2x$.`,
        String.raw`$\frac{\sin^2x}{\tan^2x}=\sin^2x\cdot\frac{\cos^2x}{\sin^2x}=\cos^2x$ (בתחום ההגדרה, שבו $\sin x\ne0$ ו-$\cos x\ne0$).`,
        String.raw`לכן הביטוי שווה ל-$\cos^2x+2\sin^2x=(\cos^2x+\sin^2x)+\sin^2x=1+\sin^2x$.`,
      ],
      finalAnswer: String.raw`$1+\sin^2x$`,
      source: openstax('verifying', 15),
    },
    {
      id: 'trig-identities-os2',
      difficulty: 1,
      statement: String.raw`מצאו את הערך המדויק של $\sin195^\circ$ בעזרת נוסחת הסכום, ובדקו את התוצאה במחשבון עד ארבע ספרות אחרי הנקודה.`,
      hints: [String.raw`כתבו $195^\circ=135^\circ+60^\circ$ (או $150^\circ+45^\circ$).`, String.raw`$\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta$.`],
      solutionSteps: [
        String.raw`$195^\circ=135^\circ+60^\circ$, ולשתי הזוויות ערכים ידועים: $\sin135^\circ=\frac{\sqrt2}{2}$, $\cos135^\circ=-\frac{\sqrt2}{2}$, $\sin60^\circ=\frac{\sqrt3}{2}$, $\cos60^\circ=\frac12$.`,
        String.raw`$\sin195^\circ=\sin135^\circ\cos60^\circ+\cos135^\circ\sin60^\circ=\frac{\sqrt2}{2}\cdot\frac12-\frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2}=\frac{\sqrt2-\sqrt6}{4}$.`,
        String.raw`הסימן שלילי כצפוי: $195^\circ$ ברביע השלישי, שבו הסינוס שלילי.`,
        String.raw`במחשבון: $\frac{\sqrt2-\sqrt6}{4}\approx-0.2588$ ו-$\sin195^\circ\approx-0.2588$ – מתאים. (בספר התשובה רשומה בצורה השקולה $-\frac{\sqrt3-1}{2\sqrt2}$.)`,
      ],
      finalAnswer: String.raw`$\sin195^\circ=\frac{\sqrt2-\sqrt6}{4}\approx-0.2588$`,
      answers: [{ label: String.raw`$\sin195^\circ$`, value: (Math.SQRT2 - Math.sqrt(6)) / 4 }],
      source: openstax('sumDifference', 43),
    },
    {
      id: 'trig-identities-os3',
      difficulty: 2,
      statement: String.raw`נתון $\sin a=\frac45$ ו-$\cos b=\frac13$, כאשר $a$ ו-$b$ שתיהן בתחום $\left[0,\frac{\pi}{2}\right)$. מצאו את $\sin(a-b)$ ואת $\cos(a+b)$.`,
      hints: [
        String.raw`חשבו קודם את $\cos a$ ואת $\sin b$ בעזרת הזהות $\sin^2x+\cos^2x=1$; ברביע הראשון שניהם חיוביים.`,
        String.raw`$\sin(a-b)=\sin a\cos b-\cos a\sin b$ ו-$\cos(a+b)=\cos a\cos b-\sin a\sin b$.`,
      ],
      solutionSteps: [
        String.raw`$a$ ברביע הראשון, לכן $\cos a=\sqrt{1-\frac{16}{25}}=\frac35$.`,
        String.raw`$b$ ברביע הראשון, לכן $\sin b=\sqrt{1-\frac19}=\sqrt{\frac89}=\frac{2\sqrt2}{3}$.`,
        String.raw`$\sin(a-b)=\sin a\cos b-\cos a\sin b=\frac45\cdot\frac13-\frac35\cdot\frac{2\sqrt2}{3}=\frac{4-6\sqrt2}{15}\approx-0.299$.`,
        String.raw`$\cos(a+b)=\cos a\cos b-\sin a\sin b=\frac35\cdot\frac13-\frac45\cdot\frac{2\sqrt2}{3}=\frac{3-8\sqrt2}{15}\approx-0.554$.`,
      ],
      finalAnswer: String.raw`$\sin(a-b)=\frac{4-6\sqrt2}{15}$, $\cos(a+b)=\frac{3-8\sqrt2}{15}$`,
      answers: [
        { label: String.raw`$\sin(a-b)$`, value: (4 - 6 * Math.SQRT2) / 15 },
        { label: String.raw`$\cos(a+b)$`, value: (3 - 8 * Math.SQRT2) / 15 },
      ],
      source: openstax('sumDifference', 21),
    },
    {
      id: 'trig-identities-os4',
      difficulty: 2,
      statement: String.raw`נתון $\sin x=\frac18$, והזווית $x$ ברביע הראשון. מצאו את הערכים המדויקים של $\sin2x$, $\cos2x$ ו-$\tan2x$ בלי למצוא את $x$.`,
      hints: [String.raw`מצאו קודם את $\cos x$ (חיובי ברביע הראשון).`, String.raw`$\sin2x=2\sin x\cos x$, $\cos2x=1-2\sin^2x$, ו-$\tan2x=\frac{\sin2x}{\cos2x}$.`],
      solutionSteps: [
        String.raw`$\cos x=\sqrt{1-\frac1{64}}=\sqrt{\frac{63}{64}}=\frac{3\sqrt7}{8}$ (חיובי, כי $x$ ברביע הראשון).`,
        String.raw`$\sin2x=2\sin x\cos x=2\cdot\frac18\cdot\frac{3\sqrt7}{8}=\frac{3\sqrt7}{32}\approx0.248$.`,
        String.raw`$\cos2x=1-2\sin^2x=1-\frac{2}{64}=\frac{31}{32}$.`,
        String.raw`$\tan2x=\frac{\sin2x}{\cos2x}=\frac{3\sqrt7/32}{31/32}=\frac{3\sqrt7}{31}\approx0.256$.`,
      ],
      finalAnswer: String.raw`$\sin2x=\frac{3\sqrt7}{32}$, $\cos2x=\frac{31}{32}$, $\tan2x=\frac{3\sqrt7}{31}$`,
      answers: [
        { label: String.raw`$\sin2x$`, value: (3 * Math.sqrt(7)) / 32 },
        { label: String.raw`$\cos2x$`, value: 31 / 32 },
        { label: String.raw`$\tan2x$`, value: (3 * Math.sqrt(7)) / 31 },
      ],
      source: openstax('doubleAngle', 5),
    },
    {
      id: 'trig-identities-os5',
      difficulty: 2,
      statement: String.raw`בשרטוט משולש ישר זווית שניצביו 12 (הבסיס) ו-5 (הגובה). $\theta$ היא הזווית שבין הבסיס ליתר, ו-$\alpha$ היא הזווית שבין הגובה ליתר. מצאו את $\sin2\alpha$, $\cos2\alpha$ ו-$\tan2\alpha$.`,
      figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="40.0,190.0 280.0,190.0 280.0,90.0" />
  <polyline points="268.0,190.0 268.0,178.0 280.0,178.0" stroke-width="1" />
  <path d="M 76.0,190.0 A 36 36 0 0 0 73.2,176.2" stroke-width="1.2" />
  <path d="M 280.0,116.0 A 26 26 0 0 1 256.0,100.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="152.0" y="212.0">12</text>
    <text x="290.0" y="145.0">5</text>
    <text x="84.0" y="185.0" font-style="italic">θ</text>
    <text x="262.0" y="130.0" font-style="italic">α</text>
  </g>
</svg>`,
      hints: [String.raw`היתר לפי משפט פיתגורס: $\sqrt{12^2+5^2}=13$.`, String.raw`מול הזווית $\alpha$ נמצא הניצב 12, ולידה הניצב 5.`],
      solutionSteps: [
        String.raw`לפי משפט פיתגורס היתר הוא $\sqrt{144+25}=13$.`,
        String.raw`הניצב שמול $\alpha$ הוא 12 והניצב שלידה הוא 5, לכן $\sin\alpha=\frac{12}{13}$ ו-$\cos\alpha=\frac{5}{13}$.`,
        String.raw`$\sin2\alpha=2\sin\alpha\cos\alpha=2\cdot\frac{12}{13}\cdot\frac5{13}=\frac{120}{169}$.`,
        String.raw`$\cos2\alpha=\cos^2\alpha-\sin^2\alpha=\frac{25-144}{169}=-\frac{119}{169}$ (שלילי, כי $\alpha>45^\circ$ ולכן $2\alpha$ קהה).`,
        String.raw`$\tan2\alpha=\frac{\sin2\alpha}{\cos2\alpha}=-\frac{120}{119}$.`,
      ],
      finalAnswer: String.raw`$\sin2\alpha=\frac{120}{169}$, $\cos2\alpha=-\frac{119}{169}$, $\tan2\alpha=-\frac{120}{119}$`,
      answers: [
        { label: String.raw`$\sin2\alpha$`, value: 120 / 169 },
        { label: String.raw`$\cos2\alpha$`, value: -119 / 169 },
        { label: String.raw`$\tan2\alpha$`, value: -120 / 119 },
      ],
      source: openstax('doubleAngle', 25),
    },
    {
      id: 'trig-identities-os6',
      difficulty: 3,
      statement: String.raw`הוכיחו את הזהות $\frac{1+\cos2t}{\sin2t-\cos t}=\frac{2\cos t}{2\sin t-1}$.`,
      hints: [String.raw`כתבו את $\cos2t$ בצורה $2\cos^2t-1$, כדי שה-1 במונה יתבטל.`, String.raw`במכנה הוציאו $\cos t$ כגורם משותף.`],
      solutionSteps: [
        String.raw`במונה: $1+\cos2t=1+(2\cos^2t-1)=2\cos^2t$.`,
        String.raw`במכנה: $\sin2t-\cos t=2\sin t\cos t-\cos t=\cos t(2\sin t-1)$.`,
        String.raw`לכן $\frac{1+\cos2t}{\sin2t-\cos t}=\frac{2\cos^2t}{\cos t(2\sin t-1)}=\frac{2\cos t}{2\sin t-1}$, אחרי צמצום ב-$\cos t$ (מותר, כי בתחום ההגדרה של אגף שמאל $\cos t\ne0$ – אחרת המכנה מתאפס).`,
        'קיבלנו את אגף ימין, ולכן הזהות מתקיימת לכל ערך שבו שני האגפים מוגדרים.',
      ],
      finalAnswer: String.raw`הזהות מתקיימת: המונה שווה ל-$2\cos^2t$ והמכנה ל-$\cos t(2\sin t-1)$.`,
      source: openstax('doubleAngle', 61),
    },
  ],

  'trig-equations': [
    {
      id: 'trig-equations-os1',
      difficulty: 1,
      statement: String.raw`פתרו בתחום $0\le x<2\pi$ (ערכים מדויקים): $\tan^2x-\sqrt3\tan x=0$. רשמו את הפתרונות בסדר עולה.`,
      hints: [String.raw`הוציאו $\tan x$ כגורם משותף.`, String.raw`$\tan x=0$ או $\tan x=\sqrt3$; המחזור של $\tan$ הוא $\pi$.`],
      solutionSteps: [
        String.raw`פירוק לגורמים: $\tan x(\tan x-\sqrt3)=0$, ולכן $\tan x=0$ או $\tan x=\sqrt3$.`,
        String.raw`$\tan x=0\iff x=\pi k$; בתחום: $x=0$ ו-$x=\pi$.`,
        String.raw`$\tan x=\sqrt3\iff x=\frac{\pi}{3}+\pi k$; בתחום: $x=\frac{\pi}{3}$ ו-$x=\frac{4\pi}{3}$.`,
        String.raw`כל הפתרונות בתחום: $0,\ \frac{\pi}{3},\ \pi,\ \frac{4\pi}{3}$ (בכולם $\cos x\ne0$, כך ש-$\tan x$ מוגדר).`,
      ],
      finalAnswer: String.raw`$x=0,\ \frac{\pi}{3},\ \pi,\ \frac{4\pi}{3}$`,
      answers: [
        { label: String.raw`$x_1$`, value: 0 },
        { label: String.raw`$x_2$`, value: Math.PI / 3 },
        { label: String.raw`$x_3$`, value: Math.PI },
        { label: String.raw`$x_4$`, value: (4 * Math.PI) / 3 },
      ],
      source: openstax('trigEquations', 41),
    },
    {
      id: 'trig-equations-os2',
      difficulty: 2,
      statement: String.raw`פתרו בתחום $[0,2\pi)$ (ערכים מדויקים): $2\sin(3\theta)=1$. רשמו את הפתרונות בסדר עולה.`,
      hints: [String.raw`פתרו קודם עבור $3\theta$: $\sin(3\theta)=\frac12$.`, String.raw`$3\theta=\frac{\pi}{6}+2\pi k$ או $3\theta=\frac{5\pi}{6}+2\pi k$; חלקו ב-3 גם את המחזור.`],
      solutionSteps: [
        String.raw`$\sin(3\theta)=\frac12$, ולכן $3\theta=\frac{\pi}{6}+2\pi k$ או $3\theta=\pi-\frac{\pi}{6}+2\pi k=\frac{5\pi}{6}+2\pi k$.`,
        String.raw`נחלק ב-3: $\theta=\frac{\pi}{18}+\frac{2\pi k}{3}$ או $\theta=\frac{5\pi}{18}+\frac{2\pi k}{3}$.`,
        String.raw`$\frac{2\pi}{3}=\frac{12\pi}{18}$, והתחום מסתיים ב-$2\pi=\frac{36\pi}{18}$, לכן בכל משפחה מתקבלים $k=0,1,2$: $\frac{\pi}{18},\frac{13\pi}{18},\frac{25\pi}{18}$ ו-$\frac{5\pi}{18},\frac{17\pi}{18},\frac{29\pi}{18}$.`,
        String.raw`בסדר עולה: $\frac{\pi}{18},\frac{5\pi}{18},\frac{13\pi}{18},\frac{17\pi}{18},\frac{25\pi}{18},\frac{29\pi}{18}$ – שישה פתרונות (המחזור $\frac{2\pi}{3}$ נכנס שלוש פעמים בתחום).`,
      ],
      finalAnswer: String.raw`$\theta=\frac{\pi}{18},\frac{5\pi}{18},\frac{13\pi}{18},\frac{17\pi}{18},\frac{25\pi}{18},\frac{29\pi}{18}$`,
      answers: [
        { label: String.raw`$\theta_1$`, value: Math.PI / 18 },
        { label: String.raw`$\theta_2$`, value: (5 * Math.PI) / 18 },
        { label: String.raw`$\theta_3$`, value: (13 * Math.PI) / 18 },
        { label: String.raw`$\theta_4$`, value: (17 * Math.PI) / 18 },
        { label: String.raw`$\theta_5$`, value: (25 * Math.PI) / 18 },
        { label: String.raw`$\theta_6$`, value: (29 * Math.PI) / 18 },
      ],
      source: openstax('trigEquations', 17),
    },
    {
      id: 'trig-equations-os3',
      difficulty: 2,
      statement: String.raw`פתרו בתחום $[0,2\pi)$ (ערכים מדויקים): $2\cos^2t+\cos t=1$. רשמו את הפתרונות בסדר עולה.`,
      hints: [String.raw`זו משוואה ריבועית ב-$\cos t$: הציבו $u=\cos t$.`, String.raw`$2u^2+u-1=0$ נותן $u=\frac12$ או $u=-1$.`],
      solutionSteps: [
        String.raw`נעביר אגף ונציב $u=\cos t$: $2u^2+u-1=0$.`,
        String.raw`$(2u-1)(u+1)=0$, ולכן $u=\frac12$ או $u=-1$ (שני הערכים בתחום $[-1,1]$).`,
        String.raw`$\cos t=\frac12\iff t=\pm\frac{\pi}{3}+2\pi k$; בתחום: $\frac{\pi}{3}$ ו-$\frac{5\pi}{3}$.`,
        String.raw`$\cos t=-1\iff t=\pi+2\pi k$; בתחום: $\pi$.`,
      ],
      finalAnswer: String.raw`$t=\frac{\pi}{3},\ \pi,\ \frac{5\pi}{3}$`,
      answers: [
        { label: String.raw`$t_1$`, value: Math.PI / 3 },
        { label: String.raw`$t_2$`, value: Math.PI },
        { label: String.raw`$t_3$`, value: (5 * Math.PI) / 3 },
      ],
      source: openstax('trigEquations', 25),
    },
    {
      id: 'trig-equations-os4',
      difficulty: 2,
      statement: String.raw`פתרו בתחום $[0,2\pi)$ (ערכים מדויקים): $\cos(2t)=\sin t$. רשמו את הפתרונות בסדר עולה.`,
      hints: [String.raw`כתבו $\cos2t=1-2\sin^2t$ כדי שהמשוואה תהיה רק ב-$\sin t$.`, String.raw`מתקבלת המשוואה הריבועית $2\sin^2t+\sin t-1=0$.`],
      solutionSteps: [
        String.raw`לפי נוסחת הזווית הכפולה $\cos2t=1-2\sin^2t$, ולכן $1-2\sin^2t=\sin t$, כלומר $2\sin^2t+\sin t-1=0$.`,
        String.raw`$(2\sin t-1)(\sin t+1)=0$, ולכן $\sin t=\frac12$ או $\sin t=-1$.`,
        String.raw`$\sin t=\frac12\iff t=\frac{\pi}{6}+2\pi k$ או $t=\frac{5\pi}{6}+2\pi k$; בתחום: $\frac{\pi}{6}$ ו-$\frac{5\pi}{6}$.`,
        String.raw`$\sin t=-1\iff t=\frac{3\pi}{2}+2\pi k$; בתחום: $\frac{3\pi}{2}$.`,
      ],
      finalAnswer: String.raw`$t=\frac{\pi}{6},\ \frac{5\pi}{6},\ \frac{3\pi}{2}$`,
      answers: [
        { label: String.raw`$t_1$`, value: Math.PI / 6 },
        { label: String.raw`$t_2$`, value: (5 * Math.PI) / 6 },
        { label: String.raw`$t_3$`, value: (3 * Math.PI) / 2 },
      ],
      source: openstax('trigEquations', 39),
    },
    {
      id: 'trig-equations-os5',
      difficulty: 3,
      statement: String.raw`פתרו בתחום $[0,2\pi)$ (ערכים מדויקים): $2\sin x\cos x-\sin x+2\cos x-1=0$. רשמו את הפתרונות בסדר עולה.`,
      hints: [String.raw`פרקו לגורמים בשיטת הקיבוץ: $\sin x(2\cos x-1)+(2\cos x-1)$.`],
      solutionSteps: [
        String.raw`נקבץ: $2\sin x\cos x-\sin x+2\cos x-1=\sin x(2\cos x-1)+(2\cos x-1)=(2\cos x-1)(\sin x+1)$.`,
        String.raw`מכפלה שווה לאפס כאשר אחד הגורמים שווה לאפס: $\cos x=\frac12$ או $\sin x=-1$.`,
        String.raw`$\cos x=\frac12$: בתחום $x=\frac{\pi}{3}$ או $x=\frac{5\pi}{3}$.`,
        String.raw`$\sin x=-1$: בתחום $x=\frac{3\pi}{2}$.`,
        String.raw`בסדר עולה: $\frac{\pi}{3},\ \frac{3\pi}{2},\ \frac{5\pi}{3}$.`,
      ],
      finalAnswer: String.raw`$x=\frac{\pi}{3},\ \frac{3\pi}{2},\ \frac{5\pi}{3}$`,
      answers: [
        { label: String.raw`$x_1$`, value: Math.PI / 3 },
        { label: String.raw`$x_2$`, value: (3 * Math.PI) / 2 },
        { label: String.raw`$x_3$`, value: (5 * Math.PI) / 3 },
      ],
      source: openstax('trigEquations', 27),
    },
    {
      id: 'trig-equations-os6',
      difficulty: 3,
      statement: String.raw`פתרו בתחום $[0,2\pi)$ (ערכים מדויקים): $\cos(6x)-\cos(3x)=0$. כמה פתרונות יש בתחום, ומהו הפתרון החיובי הקטן ביותר?`,
      hints: [String.raw`זו משוואה מהסוג $\cos\alpha=\cos\beta$: $6x=\pm3x+2\pi k$.`, String.raw`אפשר גם בדרך אחרת: $\cos6x=2\cos^2(3x)-1$, ואז משוואה ריבועית ב-$\cos3x$.`],
      solutionSteps: [
        String.raw`$\cos(6x)=\cos(3x)\iff 6x=3x+2\pi k$ או $6x=-3x+2\pi k$.`,
        String.raw`מהאפשרות הראשונה $x=\frac{2\pi k}{3}$, ומהשנייה $9x=2\pi k$, כלומר $x=\frac{2\pi k}{9}$.`,
        String.raw`כל פתרון מהמשפחה הראשונה נמצא גם בשנייה ($\frac{2\pi k}{3}=\frac{2\pi\cdot3k}{9}$), ולכן הפתרון הכללי הוא $x=\frac{2\pi k}{9}$.`,
        String.raw`בתחום $0\le x<2\pi$: $k=0,1,\dots,8$, כלומר $x=0,\frac{2\pi}{9},\frac{4\pi}{9},\frac{2\pi}{3},\frac{8\pi}{9},\frac{10\pi}{9},\frac{4\pi}{3},\frac{14\pi}{9},\frac{16\pi}{9}$ – 9 פתרונות.`,
        String.raw`בדיקה בדרך השנייה: $2\cos^2(3x)-\cos(3x)-1=0$ נותן $\cos3x=1$ או $\cos3x=-\frac12$, כלומר $3x$ הוא כפולה של $\frac{2\pi}{3}$ – אותה תוצאה. הפתרון החיובי הקטן ביותר הוא $\frac{2\pi}{9}$.`,
      ],
      finalAnswer: String.raw`$x=\frac{2\pi k}{9}$, $k=0,1,\dots,8$: תשעה פתרונות, והחיובי הקטן ביותר הוא $\frac{2\pi}{9}$`,
      answers: [
        { label: 'מספר הפתרונות בתחום', value: 9 },
        { label: 'הפתרון החיובי הקטן ביותר', value: (2 * Math.PI) / 9 },
      ],
      source: openstax('trigEquations', 40),
    },
  ],

  'trig-sine-law': [
    {
      id: 'trig-sine-law-os1',
      difficulty: 1,
      statement: String.raw`השתמשו במשפט הסינוסים כדי למצוא את הצלע $b$, כאשר $A=37^\circ$, $B=49^\circ$ ו-$c=5$ (הזווית $A$ מול הצלע $a$, $B$ מול $b$ ו-$C$ מול $c$). עגלו למאיות.`,
      hints: [String.raw`מצאו קודם את הזווית $C$, שמול הצלע הנתונה.`, String.raw`$\frac{b}{\sin B}=\frac{c}{\sin C}$.`],
      solutionSteps: [
        String.raw`סכום הזוויות במשולש $180^\circ$: $C=180^\circ-37^\circ-49^\circ=94^\circ$.`,
        String.raw`לפי משפט הסינוסים $\frac{b}{\sin49^\circ}=\frac{5}{\sin94^\circ}$.`,
        String.raw`$b=\frac{5\sin49^\circ}{\sin94^\circ}\approx\frac{5\cdot0.7547}{0.9976}\approx3.78$.`,
      ],
      finalAnswer: String.raw`$b\approx3.78$`,
      answers: [{ label: String.raw`$b$`, value: 3.7827625204928013 }],
      source: openstax('lawOfSines', 11),
    },
    {
      id: 'trig-sine-law-os2',
      difficulty: 2,
      statement: String.raw`מצאו את הזווית $x$ במשולש שבשרטוט: מול הזווית $55^\circ$ נמצאת צלע שאורכה 21, ומול הזווית $x$ נמצאת צלע שאורכה 24. שימו לב: $x$ היא זווית קהה. עגלו לעשיריות.`,
      figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,190.0 290.0,190.0 69.7,133.4" />
  <path d="M 54.0,190.0 A 24 24 0 0 0 43.8,170.3" stroke-width="1.2" />
  <path d="M 60.5,146.5 A 16 16 0 0 0 85.2,137.4" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="58.0" y="185.0" font-size="13">55°</text>
    <text x="74.0" y="164.0" font-style="italic">x</text>
    <text x="172.0" y="148.0">21</text>
    <text x="154.0" y="212.0">24</text>
  </g>
</svg>`,
      hints: [String.raw`משפט הסינוסים: $\frac{24}{\sin x}=\frac{21}{\sin55^\circ}$.`, String.raw`למשוואה $\sin x=k$ יש שני פתרונות בין $0^\circ$ ל-$180^\circ$: $x_0$ ו-$180^\circ-x_0$. בחרו את הקהה.`],
      solutionSteps: [
        String.raw`לפי משפט הסינוסים: $\frac{24}{\sin x}=\frac{21}{\sin55^\circ}$, ולכן $\sin x=\frac{24\sin55^\circ}{21}\approx0.9362$.`,
        String.raw`הזווית החדה שהסינוס שלה $0.9362$ היא בערך $69.4^\circ$, ולכן $x\approx69.4^\circ$ או $x\approx180^\circ-69.4^\circ=110.6^\circ$.`,
        String.raw`נתון ש-$x$ קהה, ולכן $x\approx110.6^\circ$. (בדיקה: $55^\circ+110.6^\circ<180^\circ$, ומול הצלע הארוכה יותר, 24, נמצאת הזווית הגדולה יותר.)`,
      ],
      finalAnswer: String.raw`$x\approx110.6^\circ$`,
      answers: [{ label: String.raw`$x$ (מעלות)`, value: 110.58139027015758 }],
      source: openstax('lawOfSines', 41),
    },
    {
      id: 'trig-sine-law-os3',
      difficulty: 2,
      statement: String.raw`במשולש הזווית $A$ נמצאת מול הצלע $a$, והזווית $B$ מול הצלע $b$. נתון $a=13$, $b=6$ ו-$B=20^\circ$. השתמשו במשפט הסינוסים כדי למצוא את הזווית $A$ (זה המקרה הדו-משמעי – ייתכן יותר מפתרון אחד). עגלו לעשיריות.`,
      hints: [String.raw`$\sin A=\frac{a\sin B}{b}$.`, String.raw`בדקו את שתי האפשרויות, $A_0$ ו-$180^\circ-A_0$: בכל אחת מהן הסכום $A+B$ חייב להיות קטן מ-$180^\circ$.`],
      solutionSteps: [
        String.raw`לפי משפט הסינוסים $\frac{13}{\sin A}=\frac{6}{\sin20^\circ}$, ולכן $\sin A=\frac{13\sin20^\circ}{6}\approx0.7410$.`,
        String.raw`יש שתי זוויות בין $0^\circ$ ל-$180^\circ$ עם הסינוס הזה: $A\approx47.8^\circ$ ו-$A'\approx180^\circ-47.8^\circ=132.2^\circ$.`,
        String.raw`בשתי האפשרויות $A+B<180^\circ$ ($67.8^\circ$ ו-$152.2^\circ$), ולכן שתיהן אפשריות – יש שני משולשים שונים המתאימים לנתונים.`,
      ],
      finalAnswer: String.raw`$A\approx47.8^\circ$ או $A\approx132.2^\circ$`,
      answers: [
        { label: String.raw`$A$ החדה (מעלות)`, value: 47.82039405529482 },
        { label: String.raw`$A$ הקהה (מעלות)`, value: 132.17960594470517 },
      ],
      source: openstax('lawOfSines', 25),
    },
    {
      id: 'trig-sine-law-os4',
      difficulty: 3,
      statement: String.raw`במשולש הזווית $\alpha$ נמצאת מול הצלע $a$, $\beta$ מול $b$ ו-$\gamma$ מול $c$. נתון $a=12$, $c=17$ ו-$\alpha=35^\circ$. קבעו אם אין משולש כזה, אם יש משולש אחד או אם יש שני משולשים, ופתרו כל משולש אפשרי. עגלו לעשיריות.`,
      hints: [String.raw`מצאו את $\gamma$ לפי משפט הסינוסים, ובדקו את שתי האפשרויות.`, String.raw`לכל אפשרות: $\beta=180^\circ-\alpha-\gamma$, ואחר כך $b=\frac{a\sin\beta}{\sin\alpha}$.`],
      solutionSteps: [
        String.raw`$\sin\gamma=\frac{c\sin\alpha}{a}=\frac{17\sin35^\circ}{12}\approx0.8126$, ולכן $\gamma\approx54.3^\circ$ או $\gamma'\approx125.7^\circ$.`,
        String.raw`בשתי האפשרויות $\alpha+\gamma<180^\circ$ ($89.3^\circ$ ו-$160.7^\circ$), ולכן יש שני משולשים. (זה המקרה הדו-משמעי: הזווית הנתונה חדה, והצלע שמולה, 12, קצרה מהצלע הנתונה השנייה, 17.)`,
        String.raw`משולש ראשון: $\beta=180^\circ-35^\circ-54.3^\circ\approx90.7^\circ$, ו-$b=\frac{12\sin90.7^\circ}{\sin35^\circ}\approx20.9$.`,
        String.raw`משולש שני: $\beta'=180^\circ-35^\circ-125.7^\circ\approx19.3^\circ$, ו-$b'=\frac{12\sin19.3^\circ}{\sin35^\circ}\approx6.9$.`,
      ],
      finalAnswer: String.raw`שני משולשים: $\gamma\approx54.3^\circ,\ \beta\approx90.7^\circ,\ b\approx20.9$ או $\gamma'\approx125.7^\circ,\ \beta'\approx19.3^\circ,\ b'\approx6.9$`,
      answers: [
        { label: String.raw`$\gamma$ במשולש הראשון (מעלות)`, value: 54.34746032749619 },
        { label: String.raw`$\beta$ במשולש הראשון (מעלות)`, value: 90.65253967250382 },
        { label: String.raw`$b$ במשולש הראשון`, value: 20.92000472247139 },
        { label: String.raw`$\gamma'$ במשולש השני (מעלות)`, value: 125.65253967250382 },
        { label: String.raw`$\beta'$ במשולש השני (מעלות)`, value: 19.34746032749618 },
        { label: String.raw`$b'$ במשולש השני`, value: 6.9311647833543315 },
      ],
      source: openstax('lawOfSines', 17),
    },
    {
      id: 'trig-sine-law-os5',
      difficulty: 3,
      statement: String.raw`כדי להעריך את גובהו של בניין, שני תלמידים עומדים במרחק מסוים ממנו, בגובה הרחוב. מנקודה זו זווית ההרמה לראש הבניין היא $35^\circ$. אחר כך הם מתקרבים לבניין ב-250 רגל, ומוצאים שזווית ההרמה היא $53^\circ$. בהנחה שהרחוב מישורי, העריכו את גובה הבניין, בעיגול לרגל שלמה.`,
      hints: [
        String.raw`במשולש שקודקודיו הם שתי נקודות המדידה וראש הבניין ידועות צלע (250) ושתי זוויות: $35^\circ$, ו-$180^\circ-53^\circ=127^\circ$.`,
        'מצאו במשפט הסינוסים את המרחק מהנקודה הקרובה לראש הבניין, ואחר כך את הגובה במשולש ישר הזווית.',
      ],
      solutionSteps: [
        String.raw`נסמן את נקודת המדידה הראשונה $P$, את השנייה (הקרובה) $Q$ ואת ראש הבניין $T$. במשולש $PQT$: $\angle P=35^\circ$, ו-$\angle PQT=180^\circ-53^\circ=127^\circ$ (זווית צמודה לזווית ההרמה ב-$Q$).`,
        String.raw`לכן $\angle T=180^\circ-35^\circ-127^\circ=18^\circ$.`,
        String.raw`לפי משפט הסינוסים: $\frac{QT}{\sin35^\circ}=\frac{250}{\sin18^\circ}$, ולכן $QT=\frac{250\sin35^\circ}{\sin18^\circ}\approx464.0$ רגל.`,
        String.raw`במשולש ישר הזווית שקודקודיו $Q$, $T$ ובסיס הבניין: הגובה הוא $h=QT\sin53^\circ\approx464.0\cdot0.7986\approx370.6$ רגל.`,
        'בעיגול: גובה הבניין כ-371 רגל.',
      ],
      finalAnswer: 'כ-371 רגל',
      answers: [{ label: 'גובה הבניין (רגל)', value: 370.5932991831788 }],
      source: openstax('lawOfSines', 67),
    },
  ],

  'trig-triangle-area': [
    {
      id: 'trig-triangle-area-os1',
      difficulty: 1,
      statement: String.raw`מצאו את שטח המשולש שבו $a=32$, $b=24$, והזווית שביניהן היא $\gamma=75^\circ$. עגלו לעשיריות.`,
      hints: [String.raw`שטח משולש: $S=\frac12ab\sin\gamma$, כאשר $\gamma$ היא הזווית שבין הצלעות $a$ ו-$b$.`],
      solutionSteps: [
        String.raw`הזווית $\gamma$ נמצאת מול הצלע $c$, כלומר היא הזווית שבין הצלעות $a$ ו-$b$.`,
        String.raw`$S=\frac12ab\sin\gamma=\frac12\cdot32\cdot24\cdot\sin75^\circ=384\sin75^\circ\approx370.9$.`,
      ],
      finalAnswer: String.raw`$S\approx370.9$`,
      answers: [{ label: String.raw`$S$`, value: 370.91551729500225 }],
      source: openstax('lawOfSines', 29),
    },
    {
      id: 'trig-triangle-area-os2',
      difficulty: 1,
      statement: String.raw`מצאו את שטח המשולש שבשרטוט: שתי הצלעות שיוצאות מהזווית $30^\circ$ הן באורך 10 ו-16.`,
      figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="30.0,200.0 270.0,200.0 159.9,125.0" />
  <path d="M 60.0,200.0 A 30 30 0 0 0 56.0,185.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="64.0" y="195.0" font-size="13">30°</text>
    <text x="142.0" y="222.0">16</text>
    <text x="80.0" y="150.0">10</text>
  </g>
</svg>`,
      hints: [String.raw`$S=\frac12\cdot10\cdot16\cdot\sin30^\circ$.`],
      solutionSteps: [
        String.raw`הזווית $30^\circ$ כלואה בין הצלעות 10 ו-16, ולכן אפשר להשתמש בנוסחה $S=\frac12ab\sin\gamma$.`,
        String.raw`$S=\frac12\cdot10\cdot16\cdot\sin30^\circ=80\cdot\frac12=40$.`,
      ],
      finalAnswer: String.raw`$S=40$`,
      answers: [{ label: String.raw`$S$`, value: 40 }],
      source: openstax('lawOfSines', 44),
    },
    {
      id: 'trig-triangle-area-os3',
      difficulty: 1,
      statement: String.raw`מצאו את השטח של חלקת אדמה משולשת שאורך צלע אחת שלה 30 רגל, אורך צלע אחרת 42 רגל, והזווית שביניהן $132^\circ$. עגלו לרגל רבועה שלמה.`,
      hints: [String.raw`$S=\frac12ab\sin\gamma$ – הנוסחה נכונה גם כשהזווית קהה.`],
      solutionSteps: [
        String.raw`$S=\frac12\cdot30\cdot42\cdot\sin132^\circ=630\sin132^\circ$.`,
        String.raw`$\sin132^\circ=\sin(180^\circ-48^\circ)=\sin48^\circ\approx0.7431$, ולכן $S\approx468.2$, כלומר כ-468 רגל רבועה.`,
      ],
      finalAnswer: 'כ-468 רגל רבועה',
      answers: [{ label: String.raw`$S$ (רגל רבועה)`, value: 468.1812400507584 }],
      source: openstax('lawOfCosines', 77),
    },
    {
      id: 'trig-triangle-area-os4',
      difficulty: 2,
      statement: 'מצאו את שטח המשולש שאורכי צלעותיו 8, 12 ו-17. עגלו למאיות.',
      hints: ['מצאו קודם זווית אחת לפי משפט הקוסינוסים – למשל הזווית שמול הצלע 17.', String.raw`אחר כך: $\sin\gamma=\sqrt{1-\cos^2\gamma}$ ו-$S=\frac12\cdot8\cdot12\sin\gamma$.`],
      solutionSteps: [
        String.raw`נסמן ב-$\gamma$ את הזווית שמול הצלע 17 (הכלואה בין הצלעות 8 ו-12). לפי משפט הקוסינוסים: $17^2=8^2+12^2-2\cdot8\cdot12\cos\gamma$.`,
        String.raw`$289=208-192\cos\gamma$, ולכן $\cos\gamma=-\frac{81}{192}=-0.421875$ (הזווית קהה, $\gamma\approx115^\circ$).`,
        String.raw`$\sin\gamma=\sqrt{1-0.421875^2}\approx0.9067$ (הסינוס של זווית במשולש תמיד חיובי).`,
        String.raw`$S=\frac12\cdot8\cdot12\cdot\sin\gamma\approx48\cdot0.9067\approx43.52$.`,
        'בספר המקורי התרגיל מופיע אחרי נוסחת הרון, שאינה בתכנית הבגרות; הדרך כאן נותנת אותה תוצאה.',
      ],
      finalAnswer: String.raw`$S\approx43.52$`,
      answers: [{ label: String.raw`$S$`, value: 43.51939222921202 }],
      source: openstax('lawOfCosines', 47),
    },
    {
      id: 'trig-triangle-area-os5',
      difficulty: 3,
      statement: String.raw`אורכי ארבע הצלעות של מרובע קמור, לפי הסדר, הם 4.5 ס״מ, 7.9 ס״מ, 9.4 ס״מ ו-12.9 ס״מ. הזווית שבין שתי הצלעות הקצרות ביותר היא $117^\circ$. מהו שטח המרובע? עגלו לעשיריות.`,
      hints: [
        'העבירו את האלכסון שמחבר את הקצוות של שתי הצלעות הקצרות. הוא מחלק את המרובע לשני משולשים.',
        'במשולש הראשון ידועות שתי צלעות והזווית שביניהן: חשבו את האלכסון (משפט הקוסינוסים) ואת השטח.',
        'במשולש השני ידועות שלוש צלעות: מצאו זווית במשפט הקוסינוסים, ואחר כך את השטח.',
      ],
      solutionSteps: [
        String.raw`נסמן את המרובע $ABCD$ עם $AB=4.5$, $BC=7.9$, $CD=9.4$, $DA=12.9$ ו-$\angle B=117^\circ$. האלכסון $AC$ מחלק אותו למשולשים $ABC$ ו-$ACD$.`,
        String.raw`משפט הקוסינוסים במשולש $ABC$: $AC^2=4.5^2+7.9^2-2\cdot4.5\cdot7.9\cos117^\circ\approx114.94$, ולכן $AC\approx10.72$.`,
        String.raw`$S_{ABC}=\frac12\cdot4.5\cdot7.9\cdot\sin117^\circ\approx15.84$.`,
        String.raw`במשולש $ACD$: $\cos D=\frac{9.4^2+12.9^2-AC^2}{2\cdot9.4\cdot12.9}\approx0.5766$, ולכן $\angle D\approx54.8^\circ$.`,
        String.raw`$S_{ACD}=\frac12\cdot9.4\cdot12.9\cdot\sin D\approx49.54$.`,
        String.raw`שטח המרובע: $S\approx15.84+49.54\approx65.4$ סמ״ר.`,
      ],
      finalAnswer: 'כ-65.4 סמ״ר',
      answers: [{ label: 'שטח המרובע (סמ״ר)', value: 65.37497840147834 }],
      source: openstax('lawOfCosines', 75),
    },
  ],

  'trig-cosine-law': [
    {
      id: 'trig-cosine-law-os1',
      difficulty: 1,
      statement: String.raw`במשולש הזווית $\alpha$ נמצאת מול הצלע $a$, $\beta$ מול $b$ ו-$\gamma$ מול $c$. נתון $\alpha=120^\circ$, $b=6$ ו-$c=7$. מצאו את הצלע $a$. עגלו לעשיריות.`,
      hints: [String.raw`$a^2=b^2+c^2-2bc\cos\alpha$.`, String.raw`$\cos120^\circ=-\frac12$.`],
      solutionSteps: [
        String.raw`לפי משפט הקוסינוסים: $a^2=6^2+7^2-2\cdot6\cdot7\cos120^\circ=36+49-84\cdot\left(-\frac12\right)=127$.`,
        String.raw`$a=\sqrt{127}\approx11.3$. (הגיוני: מול הזווית הקהה נמצאת הצלע הארוכה ביותר.)`,
      ],
      finalAnswer: String.raw`$a=\sqrt{127}\approx11.3$`,
      answers: [{ label: String.raw`$a$`, value: Math.sqrt(127) }],
      source: openstax('lawOfCosines', 7),
    },
    {
      id: 'trig-cosine-law-os2',
      difficulty: 1,
      statement: String.raw`במשולש $a=14$, $b=13$ ו-$c=20$ (הזווית $C$ מול הצלע $c$). השתמשו במשפט הקוסינוסים כדי למצוא את הזווית $C$. עגלו לעשיריות.`,
      hints: [String.raw`$\cos C=\frac{a^2+b^2-c^2}{2ab}$.`],
      solutionSteps: [
        String.raw`לפי משפט הקוסינוסים $c^2=a^2+b^2-2ab\cos C$, ולכן $\cos C=\frac{14^2+13^2-20^2}{2\cdot14\cdot13}=\frac{196+169-400}{364}=-\frac{35}{364}\approx-0.0962$.`,
        String.raw`הקוסינוס שלילי, ולכן $C$ זווית קהה: $C\approx95.5^\circ$.`,
      ],
      finalAnswer: String.raw`$C\approx95.5^\circ$`,
      answers: [{ label: String.raw`$C$ (מעלות)`, value: 95.5177343737805 }],
      source: openstax('lawOfCosines', 17),
    },
    {
      id: 'trig-cosine-law-os3',
      difficulty: 2,
      statement: String.raw`פתרו את המשולש שבו $C=121^\circ$, $a=21$ ו-$b=37$ (הזווית $A$ מול $a$, $B$ מול $b$, $C$ מול $c$): מצאו את $c$, $A$ ו-$B$. עגלו לעשיריות.`,
      hints: [
        String.raw`נתונות שתי צלעות והזווית שביניהן – התחילו במשפט הקוסינוסים כדי למצוא את $c$.`,
        String.raw`אחר כך מצאו את $A$ (הזווית הקטנה, מול הצלע הקצרה) במשפט הסינוסים, ואת $B$ מסכום הזוויות.`,
      ],
      solutionSteps: [
        String.raw`$c^2=21^2+37^2-2\cdot21\cdot37\cos121^\circ=1810-1554\cos121^\circ\approx2610.4$, ולכן $c\approx51.1$.`,
        String.raw`לפי משפט הסינוסים: $\sin A=\frac{21\sin121^\circ}{c}\approx0.3523$. $A$ נמצאת מול הצלע הקצרה ביותר, ולכן היא חדה: $A\approx20.6^\circ$.`,
        String.raw`$B=180^\circ-121^\circ-20.6^\circ\approx38.4^\circ$.`,
      ],
      finalAnswer: String.raw`$c\approx51.1$, $A\approx20.6^\circ$, $B\approx38.4^\circ$`,
      answers: [
        { label: String.raw`$c$`, value: 51.09177202260873 },
        { label: String.raw`$A$ (מעלות)`, value: 20.629114975998384 },
        { label: String.raw`$B$ (מעלות)`, value: 38.370885024001616 },
      ],
      source: openstax('lawOfCosines', 23),
    },
    {
      id: 'trig-cosine-law-os4',
      difficulty: 2,
      statement: 'אורכי הצלעות של מקבילית הם 11 רגל ו-17 רגל, ואורך האלכסון הארוך שלה הוא 22 רגל. מצאו את אורך האלכסון הקצר. עגלו לעשיריות.',
      hints: [
        'האלכסון הארוך יוצר עם שתי צלעות משולש שצלעותיו 11, 17 ו-22. מצאו בו את הזווית שמול האלכסון.',
        String.raw`האלכסון הקצר נמצא מול הזווית הסמוכה במקבילית, $180^\circ-\theta$, ו-$\cos(180^\circ-\theta)=-\cos\theta$.`,
      ],
      solutionSteps: [
        String.raw`נסמן ב-$\theta$ את זווית המקבילית שמול האלכסון הארוך. לפי משפט הקוסינוסים: $22^2=11^2+17^2-2\cdot11\cdot17\cos\theta$, כלומר $484=410-374\cos\theta$, ולכן $\cos\theta=-\frac{74}{374}$.`,
        String.raw`זוויות סמוכות במקבילית משלימות ל-$180^\circ$, והאלכסון הקצר נמצא מול הזווית $180^\circ-\theta$, שהקוסינוס שלה $+\frac{74}{374}$.`,
        String.raw`$d^2=11^2+17^2-2\cdot11\cdot17\cdot\frac{74}{374}=410-74=336$.`,
        String.raw`$d=\sqrt{336}\approx18.3$ רגל.`,
      ],
      finalAnswer: String.raw`$\sqrt{336}\approx18.3$ רגל`,
      answers: [{ label: 'האלכסון הקצר (רגל)', value: Math.sqrt(336) }],
      source: openstax('lawOfCosines', 53),
    },
    {
      id: 'trig-cosine-law-os5',
      difficulty: 3,
      statement: String.raw`מגדל שגובהו 113 רגל עומד אנכית על גבעה המשופעת ב-$34^\circ$ ביחס לאופק (ראו שרטוט). כבל מתיחה יחובר לראש המגדל ויעוגן בנקודה שנמצאת 98 רגל במעלה הגבעה מבסיס המגדל. מצאו את אורך הכבל הדרוש. עגלו לעשיריות.`,
      figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="30.0" y1="224.0" x2="295.0" y2="45.2" />
  <line x1="30.0" y1="224.0" x2="120.0" y2="224.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="110.0" y1="170.0" x2="110.0" y2="28.8" stroke-width="3" />
  <line x1="110.0" y1="28.8" x2="211.6" y2="101.5" stroke-width="1.5" />
  <path d="M 70.0,224.0 A 40 40 0 0 0 63.2,201.6" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="74.0" y="219.0" font-size="13">34°</text>
    <text x="78.0" y="104.0">113</text>
    <text x="166.0" y="156.0">98</text>
    <text x="90.0" y="166.0">P</text>
    <text x="114.0" y="26.0">T</text>
    <text x="216.0" y="124.0">Q</text>
  </g>
</svg>`,
      hints: [
        'מצאו את הזווית שבין המגדל (האנכי) לבין מדרון הגבעה, בכיוון מעלה הגבעה.',
        String.raw`המגדל מאונך לאופק, והמדרון נוטה $34^\circ$ מעל האופק, לכן הזווית ביניהם היא $90^\circ-34^\circ=56^\circ$.`,
        'משפט הקוסינוסים במשולש שצלעותיו 113, 98 והכבל.',
      ],
      solutionSteps: [
        String.raw`נסמן את בסיס המגדל $P$, את ראשו $T$ ואת נקודת העיגון $Q$: $PT=113$ ו-$PQ=98$.`,
        String.raw`$PT$ אנכי ו-$PQ$ עולה ב-$34^\circ$ מעל האופק, לכן $\angle TPQ=90^\circ-34^\circ=56^\circ$.`,
        String.raw`משפט הקוסינוסים במשולש $TPQ$: $TQ^2=113^2+98^2-2\cdot113\cdot98\cos56^\circ\approx22373-12385=9988$.`,
        String.raw`$TQ\approx\sqrt{9988}\approx99.9$ רגל.`,
      ],
      finalAnswer: 'כ-99.9 רגל',
      answers: [{ label: 'אורך הכבל (רגל)', value: 99.93995984554877 }],
      source: openstax('lawOfCosines', 65),
    },
  ],

  // ───────────────────────── סדרות ─────────────────────────
  'seq-geometric-intro': [
    {
      id: 'seq-geometric-intro-os1',
      difficulty: 1,
      statement: String.raw`האיבר הראשון בסדרה הנדסית הוא 16, והמנה היא $-\frac13$. מצאו את האיבר הרביעי.`,
      hints: [String.raw`$a_n=a_1q^{n-1}$.`],
      solutionSteps: [
        String.raw`לפי נוסחת האיבר הכללי $a_n=a_1q^{n-1}$: $a_4=16\cdot\left(-\frac13\right)^3$.`,
        String.raw`$\left(-\frac13\right)^3=-\frac1{27}$, ולכן $a_4=-\frac{16}{27}\approx-0.593$.`,
      ],
      finalAnswer: String.raw`$a_4=-\frac{16}{27}$`,
      answers: [{ label: String.raw`$a_4$`, value: -16 / 27 }],
      source: openstax('geometric', 19),
    },
    {
      id: 'seq-geometric-intro-os2',
      difficulty: 2,
      statement: String.raw`בסדרה הנדסית $a_6=25$ ו-$a_8=6.25$. כתבו את חמשת האיברים הראשונים של הסדרה.`,
      hints: [String.raw`$\frac{a_8}{a_6}=q^2$.`, String.raw`שימו לב: למשוואה $q^2=\frac14$ יש שני פתרונות.`],
      solutionSteps: [
        String.raw`$\frac{a_8}{a_6}=\frac{a_1q^7}{a_1q^5}=q^2$, ולכן $q^2=\frac{6.25}{25}=\frac14$, כלומר $q=\frac12$ או $q=-\frac12$.`,
        String.raw`$a_6=a_1q^5$, ולכן $a_1=\frac{25}{q^5}$. עבור $q=\frac12$: $a_1=25\cdot32=800$.`,
        String.raw`עבור $q=\frac12$ חמשת האיברים הראשונים הם $800,400,200,100,50$.`,
        String.raw`עבור $q=-\frac12$: $a_1=\frac{25}{-1/32}=-800$, והאיברים הם $-800,400,-200,100,-50$ (גם כאן $a_6=25$ ו-$a_8=6.25$).`,
        String.raw`בספר מופיעה רק הסדרה עם $q=\frac12$, אבל שתי הסדרות מתאימות לנתונים.`,
      ],
      finalAnswer: String.raw`$800,400,200,100,50$ (כאשר $q=\frac12$), או $-800,400,-200,100,-50$ (כאשר $q=-\frac12$)`,
      answers: [
        { label: String.raw`$a_1$ כאשר $q>0$`, value: 800 },
        { label: String.raw`$a_1$ כאשר $q<0$`, value: -800 },
      ],
      source: openstax('geometric', 17),
    },
    {
      id: 'seq-geometric-intro-os3',
      difficulty: 2,
      statement: String.raw`מצאו את מספר האיברים בסדרה ההנדסית הסופית $2,1,\frac12,\dots,\frac1{1024}$.`,
      hints: [String.raw`$a_1=2$ ו-$q=\frac12$. פתרו $2\cdot\left(\frac12\right)^{n-1}=\frac1{1024}$.`, String.raw`$1024=2^{10}$.`],
      solutionSteps: [
        String.raw`$a_1=2$ ו-$q=\frac12$, ולכן $a_n=2\cdot\left(\frac12\right)^{n-1}=2^{2-n}$.`,
        String.raw`האיבר האחרון: $2^{2-n}=\frac1{1024}=2^{-10}$, ולכן $2-n=-10$ ו-$n=12$.`,
        'בסדרה יש 12 איברים.',
      ],
      finalAnswer: '12 איברים',
      answers: [{ label: 'מספר האיברים', value: 12 }],
      source: openstax('geometric', 45),
    },
    {
      id: 'seq-geometric-intro-os4',
      difficulty: 2,
      statement: String.raw`באיזה איבר הסדרה ההנדסית $a_n=-36\left(\frac23\right)^{n-1}$ מקבלת לראשונה ערך שאינו מספר שלם? מהו האיבר הזה?`,
      hints: [String.raw`חשבו כמה איברים ראשונים: בכל צעד כופלים ב-$\frac23$.`, String.raw`$36=4\cdot9$: כמה פעמים אפשר לחלק ב-3 ולקבל מספר שלם?`],
      solutionSteps: [
        String.raw`$a_1=-36$, $a_2=-36\cdot\frac23=-24$, $a_3=-24\cdot\frac23=-16$ – כולם שלמים.`,
        String.raw`$a_4=-16\cdot\frac23=-\frac{32}{3}$, שאינו שלם.`,
        String.raw`הסבר: $a_n=-\frac{36\cdot2^{n-1}}{3^{n-1}}$, ו-$36=2^2\cdot3^2$ מתחלק ב-$3^{n-1}$ רק כאשר $n-1\le2$. לכן האיבר הראשון שאינו שלם הוא $a_4=-\frac{32}{3}$.`,
      ],
      finalAnswer: String.raw`האיבר הרביעי: $a_4=-\frac{32}{3}$`,
      answers: [
        { label: String.raw`$n$`, value: 4 },
        { label: String.raw`$a_4$`, value: -32 / 3 },
      ],
      source: openstax('geometric', 57),
    },
  ],

  'seq-recursion': [
    {
      id: 'seq-recursion-os1',
      difficulty: 1,
      statement: String.raw`כתבו את חמשת האיברים הראשונים של הסדרה ההנדסית הנתונה בכלל הנסיגה $a_1=7$, $a_{n+1}=0.2\,a_n$.`,
      hints: ['כל איבר שווה ל-0.2 כפול האיבר הקודם.'],
      solutionSteps: [
        String.raw`לפי כלל הנסיגה: $a_2=0.2\cdot7=1.4$ ו-$a_3=0.2\cdot1.4=0.28$.`,
        String.raw`$a_4=0.2\cdot0.28=0.056$ ו-$a_5=0.2\cdot0.056=0.0112$.`,
        String.raw`בספר הכלל כתוב בצורה $a_n=0.2\,a_{n-1}$ – זה אותו כלל: כל איבר שווה ל-0.2 כפול קודמו. זו סדרה הנדסית עם $q=0.2$, ולכן גם $a_n=7\cdot0.2^{n-1}$.`,
      ],
      finalAnswer: String.raw`$7,\ 1.4,\ 0.28,\ 0.056,\ 0.0112$`,
      answers: [
        { label: String.raw`$a_2$`, value: 1.4 },
        { label: String.raw`$a_3$`, value: 0.28, tolerance: 0.001 },
        { label: String.raw`$a_4$`, value: 0.056, tolerance: 0.0005 },
        { label: String.raw`$a_5$`, value: 0.0112, tolerance: 0.00005 },
      ],
      source: openstax('geometric', 23),
    },
    {
      id: 'seq-recursion-os2',
      difficulty: 1,
      statement: String.raw`כתבו כלל נסיגה לסדרה ההנדסית $10,\,-3,\,0.9,\,-0.27,\dots$`,
      hints: [String.raw`חשבו את המנה $q=\frac{a_2}{a_1}$ ובדקו אותה גם על הזוגות הבאים.`],
      solutionSteps: [
        String.raw`$q=\frac{-3}{10}=-0.3$; בדיקה: $\frac{0.9}{-3}=-0.3$ ו-$\frac{-0.27}{0.9}=-0.3$ – המנה קבועה.`,
        String.raw`כלל הנסיגה: $a_1=10$, $a_{n+1}=-0.3\,a_n$ (בכתיב של הספר: $a_n=-0.3\,a_{n-1}$).`,
      ],
      finalAnswer: String.raw`$a_1=10,\ a_{n+1}=-0.3\,a_n$`,
      answers: [{ label: String.raw`$q$`, value: -0.3 }],
      source: openstax('geometric', 27),
    },
    {
      id: 'seq-recursion-os3',
      difficulty: 1,
      statement: String.raw`כתבו כלל נסיגה לסדרה ההנדסית $\frac1{512},\,-\frac1{128},\,\frac1{32},\,-\frac18,\dots$`,
      hints: [String.raw`$\frac{a_2}{a_1}=-\frac{512}{128}$.`],
      solutionSteps: [
        String.raw`$q=\frac{-1/128}{1/512}=-\frac{512}{128}=-4$; בדיקה: $\frac{1/32}{-1/128}=-4$ ו-$\frac{-1/8}{1/32}=-4$.`,
        String.raw`כלל הנסיגה: $a_1=\frac1{512}$, $a_{n+1}=-4a_n$.`,
      ],
      finalAnswer: String.raw`$a_1=\frac1{512},\ a_{n+1}=-4a_n$`,
      answers: [{ label: String.raw`$q$`, value: -4 }],
      source: openstax('geometric', 31),
    },
    {
      id: 'seq-recursion-os4',
      difficulty: 2,
      statement: String.raw`נתון כלל הנסיגה $a_1=4$, $a_{n+1}=-3a_n$. מצאו את $a_8$.`,
      hints: [String.raw`זו סדרה הנדסית עם $a_1=4$ ו-$q=-3$; עברו לנוסחת האיבר הכללי.`],
      solutionSteps: [
        String.raw`כל איבר שווה ל-$-3$ כפול קודמו, ולכן זו סדרה הנדסית עם $a_1=4$ ו-$q=-3$, והאיבר הכללי הוא $a_n=4\cdot(-3)^{n-1}$.`,
        String.raw`$a_8=4\cdot(-3)^7=4\cdot(-2187)=-8748$.`,
        String.raw`בדיקה בכלל הנסיגה: $4,-12,36,-108,324,-972,2916,-8748$.`,
      ],
      finalAnswer: String.raw`$a_8=-8748$`,
      answers: [{ label: String.raw`$a_8$`, value: -8748 }],
      source: openstax('geometric', 42),
    },
  ],

  'seq-geometric-sum': [
    {
      id: 'seq-geometric-sum-os1',
      difficulty: 1,
      statement: String.raw`השתמשו בנוסחת הסכום של $n$ האיברים הראשונים בסדרה הנדסית כדי לחשב את הסכום $9+3+1+\frac13+\frac19$.`,
      hints: [String.raw`$a_1=9$, $q=\frac13$, $n=5$.`, String.raw`$S_n=\frac{a_1(q^n-1)}{q-1}$.`],
      solutionSteps: [
        String.raw`$a_1=9$, $q=\frac13$ ו-$n=5$.`,
        String.raw`$S_5=\frac{9\left(1-\left(\frac13\right)^5\right)}{1-\frac13}=\frac{9\cdot\frac{242}{243}}{\frac23}=\frac{9\cdot242\cdot3}{243\cdot2}=\frac{121}{9}$.`,
        String.raw`$S_5=\frac{121}{9}\approx13.44$ (בדיקה: $9+3+1+\frac13+\frac19=13+\frac49=\frac{121}{9}$).`,
      ],
      finalAnswer: String.raw`$S_5=\frac{121}{9}\approx13.44$`,
      answers: [{ label: String.raw`$S_5$`, value: 121 / 9 }],
      source: openstax('series', 19),
    },
    {
      id: 'seq-geometric-sum-os2',
      difficulty: 1,
      statement: String.raw`חשבו את $S_6$, סכום ששת האיברים הראשונים של הסדרה ההנדסית $-2,\,-10,\,-50,\,-250,\dots$`,
      hints: [String.raw`$a_1=-2$ ו-$q=5$.`],
      solutionSteps: [
        String.raw`$q=\frac{-10}{-2}=5$ ו-$a_1=-2$.`,
        String.raw`$S_6=\frac{a_1(q^6-1)}{q-1}=\frac{-2(5^6-1)}{4}=\frac{-2\cdot15624}{4}=-7812$.`,
      ],
      finalAnswer: String.raw`$S_6=-7812$`,
      answers: [{ label: String.raw`$S_6$`, value: -7812 }],
      source: openstax('series', 38),
    },
    {
      id: 'seq-geometric-sum-os3',
      difficulty: 2,
      statement: String.raw`חשבו את $S_7$, סכום שבעת האיברים הראשונים של הסדרה ההנדסית $0.4,\,-2,\,10,\,-50,\dots$`,
      hints: [String.raw`$q=\frac{-2}{0.4}=-5$. שימו לב לסימן של $(-5)^7$.`],
      solutionSteps: [
        String.raw`$a_1=0.4$ ו-$q=\frac{-2}{0.4}=-5$.`,
        String.raw`$S_7=\frac{0.4\left((-5)^7-1\right)}{-5-1}=\frac{0.4(-78125-1)}{-6}=\frac{0.4\cdot78126}{6}=5208.4$.`,
      ],
      finalAnswer: String.raw`$S_7=5208.4$`,
      answers: [{ label: String.raw`$S_7$`, value: 5208.4 }],
      source: openstax('series', 39),
    },
    {
      id: 'seq-geometric-sum-os4',
      difficulty: 2,
      statement: String.raw`חשבו את סכום עשרת האיברים הראשונים של הסדרה ההנדסית $a_n=-2\cdot\left(\frac12\right)^{n-1}$.`,
      hints: [String.raw`$a_1=-2$, $q=\frac12$, $n=10$.`],
      solutionSteps: [
        String.raw`$a_1=-2\cdot\left(\frac12\right)^0=-2$, $q=\frac12$ ו-$n=10$.`,
        String.raw`$S_{10}=\frac{-2\left(1-\left(\frac12\right)^{10}\right)}{1-\frac12}=-4\left(1-\frac1{1024}\right)=-4\cdot\frac{1023}{1024}=-\frac{1023}{256}$.`,
        String.raw`$S_{10}=-\frac{1023}{256}\approx-3.996$ – קרוב ל-$-4$, שהוא הסכום של הסדרה האינסופית.`,
      ],
      finalAnswer: String.raw`$S_{10}=-\frac{1023}{256}\approx-3.996$`,
      answers: [{ label: String.raw`$S_{10}$`, value: -1023 / 256 }],
      source: openstax('series', 41),
    },
  ],

  'seq-infinite': [
    {
      id: 'seq-infinite-os1',
      difficulty: 1,
      statement: String.raw`קבעו אם לסדרה ההנדסית האינסופית $2+1.6+1.28+1.024+\dots$ יש סכום. אם כן – חשבו אותו; אם לא – הסבירו מדוע.`,
      hints: [String.raw`חשבו את $q$ ובדקו אם $|q|<1$.`],
      solutionSteps: [
        String.raw`$q=\frac{1.6}{2}=0.8$ (ובדיקה: $\frac{1.28}{1.6}=0.8$).`,
        String.raw`$|q|=0.8<1$, ולכן הסדרה מתכנסת ויש לה סכום.`,
        String.raw`$S=\frac{a_1}{1-q}=\frac{2}{1-0.8}=\frac{2}{0.2}=10$.`,
      ],
      finalAnswer: String.raw`יש סכום: $S=10$`,
      answers: [{ label: String.raw`$S$`, value: 10 }],
      source: openstax('series', 23),
    },
    {
      id: 'seq-infinite-os2',
      difficulty: 1,
      statement: String.raw`מצאו את הסכום של הסדרה ההנדסית האינסופית $-1-\frac14-\frac1{16}-\frac1{64}-\dots$`,
      hints: [String.raw`$a_1=-1$ ו-$q=\frac14$.`],
      solutionSteps: [
        String.raw`$a_1=-1$ ו-$q=\frac{-1/4}{-1}=\frac14$; $|q|<1$, ולכן הסכום קיים.`,
        String.raw`$S=\frac{a_1}{1-q}=\frac{-1}{1-\frac14}=\frac{-1}{3/4}=-\frac43$.`,
      ],
      finalAnswer: String.raw`$S=-\frac43$`,
      answers: [{ label: String.raw`$S$`, value: -4 / 3 }],
      source: openstax('series', 43),
    },
    {
      id: 'seq-infinite-os3',
      difficulty: 2,
      statement: String.raw`כתבו את $0.\overline{65}$ (כלומר $0.656565\dots$) כסכום של סדרה הנדסית אינסופית, והשתמשו בנוסחת הסכום כדי להמיר אותו לשבר.`,
      hints: [String.raw`$0.\overline{65}=0.65+0.0065+0.000065+\dots$`, String.raw`$a_1=0.65$ ו-$q=0.01$.`],
      solutionSteps: [
        String.raw`$0.\overline{65}=0.65+0.0065+0.000065+\dots=\frac{65}{100}+\frac{65}{100^2}+\frac{65}{100^3}+\dots$`,
        String.raw`זו סדרה הנדסית אינסופית עם $a_1=\frac{65}{100}$ ו-$q=\frac1{100}$; $|q|<1$, ולכן הסכום קיים.`,
        String.raw`$S=\frac{65/100}{1-1/100}=\frac{65/100}{99/100}=\frac{65}{99}$.`,
      ],
      finalAnswer: String.raw`$0.\overline{65}=\frac{65}{99}$`,
      answers: [{ label: String.raw`$S$ (כשבר עשרוני)`, value: 65 / 99, tolerance: 0.0001 }],
      source: openstax('series', 54),
    },
    {
      id: 'seq-infinite-os4',
      difficulty: 2,
      statement: 'הסכום של סדרה הנדסית אינסופית גדול פי חמישה מהאיבר הראשון שלה. מהי מנת הסדרה?',
      hints: [String.raw`$\frac{a_1}{1-q}=5a_1$.`],
      solutionSteps: [
        String.raw`סכום הסדרה הוא $S=\frac{a_1}{1-q}$ (כאשר $|q|<1$), ונתון $S=5a_1$.`,
        String.raw`$\frac{a_1}{1-q}=5a_1$; נחלק ב-$a_1\ne0$: $\frac{1}{1-q}=5$, ולכן $1-q=\frac15$ ו-$q=\frac45$.`,
        String.raw`$|q|=0.8<1$, ולכן הסדרה אכן מתכנסת.`,
      ],
      finalAnswer: String.raw`$q=\frac45$`,
      answers: [{ label: String.raw`$q$`, value: 0.8 }],
      source: openstax('series', 55),
    },
    {
      id: 'seq-infinite-os5',
      difficulty: 2,
      statement: String.raw`מטוטלת עוברת מרחק של 3 רגל בתנודה הראשונה שלה. בכל תנודה היא עוברת $\frac34$ מהמרחק שעברה בתנודה הקודמת. מהו המרחק הכולל שהמטוטלת עוברת עד שהיא נעצרת?`,
      hints: [String.raw`המרחקים יוצרים סדרה הנדסית עם $a_1=3$ ו-$q=\frac34$.`],
      solutionSteps: [
        String.raw`המרחקים בתנודות הם $3,\ 3\cdot\frac34,\ 3\cdot\left(\frac34\right)^2,\dots$ – סדרה הנדסית אינסופית עם $a_1=3$ ו-$q=\frac34$.`,
        String.raw`$|q|<1$, ולכן המרחק הכולל הוא $S=\frac{3}{1-\frac34}=\frac{3}{1/4}=12$ רגל.`,
      ],
      finalAnswer: '12 רגל',
      answers: [{ label: 'המרחק הכולל (רגל)', value: 12 }],
      source: openstax('series', 61),
    },
  ],

  // ───────────────────────── הסתברות ─────────────────────────
  'prob-basic': [
    {
      id: 'prob-basic-os1',
      difficulty: 1,
      statement: `גלגל מזל עם חץ מחולק לשמונה גזרות שוות (ראו שרטוט). על כל גזרה כתובה אות, והגזרות צבועות כך: ${SPINNER_COLORS}. מסובבים את החץ פעם אחת. מהי ההסתברות שהחץ ייעצר על אות תנועה (vowel – אחת מהאותיות A, E, I, O, U)?`,
      figureSvg: SPINNER_SVG,
      hints: [String.raw`כל הגזרות שוות, ולכן ההסתברות של כל גזרה היא $\frac18$.`, 'אילו מהאותיות על הגלגל הן תנועות?'],
      solutionSteps: [
        String.raw`שמונה הגזרות שוות, ולכן זה מרחב הסתברות אחיד: לכל גזרה הסתברות $\frac18$.`,
        'אותיות התנועה שעל הגלגל הן A, E, I, O – ארבע גזרות.',
        String.raw`$P=\frac48=\frac12$.`,
      ],
      finalAnswer: String.raw`$\frac12$`,
      answers: [{ label: String.raw`$P$`, value: 0.5 }],
      source: openstax('probability', 7),
    },
    {
      id: 'prob-basic-os2',
      difficulty: 1,
      statement: 'שולפים קלף אחד באקראי מחפיסה רגילה של 52 קלפים (4 סדרות – לב, יהלום, תלתן ועלה – ובכל סדרה 13 קלפים: 2 עד 10, נסיך, מלכה, מלך ואס). מהי ההסתברות לשלוף קלף 2?',
      hints: ['בחפיסה יש 4 קלפים שעליהם המספר 2 – אחד בכל סדרה.'],
      solutionSteps: [
        'יש 52 תוצאות אפשריות, וכולן שוות הסתברות.',
        'הקלף 2 מופיע פעם אחת בכל אחת מ-4 הסדרות, כלומר יש 4 תוצאות רצויות.',
        String.raw`$P=\frac{4}{52}=\frac1{13}$.`,
      ],
      finalAnswer: String.raw`$\frac1{13}$`,
      answers: [{ label: String.raw`$P$`, value: 1 / 13 }],
      source: openstax('probability', 27),
    },
    {
      id: 'prob-basic-os3',
      difficulty: 2,
      statement: 'מטילים ארבעה מטבעות. מצאו את ההסתברות לקבל בדיוק פעמיים ״עץ״.',
      hints: [String.raw`במרחב המדגם יש $2^4=16$ תוצאות שוות הסתברות.`, 'מנו את התוצאות שיש בהן בדיוק שני ״עץ״ – בחירה של שני מקומות מתוך ארבעה.'],
      solutionSteps: [
        String.raw`לכל מטבע יש 2 תוצאות, ולכן במרחב המדגם יש $2^4=16$ תוצאות שוות הסתברות.`,
        'התוצאות עם בדיוק שני ״עץ״ (ע) ושני ״פלי״ (פ) הן: עעפפ, עפעפ, עפפע, פעעפ, פעפע, פפעע – 6 תוצאות.',
        String.raw`$P=\frac{6}{16}=\frac38$.`,
      ],
      finalAnswer: String.raw`$\frac38$`,
      answers: [{ label: String.raw`$P$`, value: 3 / 8 }],
      source: openstax('probability', 19),
    },
    {
      id: 'prob-basic-os4',
      difficulty: 2,
      statement: 'מטילים שתי קוביות ומחברים את התוצאות. מצאו את ההסתברות שהסכום יהיה 5 או 6.',
      hints: ['במרחב המדגם יש 36 זוגות שווי הסתברות.', 'מנו את הזוגות שסכומם 5 ואת הזוגות שסכומם 6.'],
      solutionSteps: [
        String.raw`במרחב המדגם יש $6\cdot6=36$ זוגות סדורים שווי הסתברות.`,
        String.raw`סכום 5: $(1,4),(2,3),(3,2),(4,1)$ – 4 זוגות. סכום 6: $(1,5),(2,4),(3,3),(4,2),(5,1)$ – 5 זוגות.`,
        String.raw`המאורעות זרים, ולכן $P=\frac{4+5}{36}=\frac{9}{36}=\frac14$.`,
      ],
      finalAnswer: String.raw`$\frac14$`,
      answers: [{ label: String.raw`$P$`, value: 0.25 }],
      source: openstax('probability', 41),
    },
  ],

  'prob-laws': [
    {
      id: 'prob-laws-os1',
      difficulty: 1,
      statement: 'מטילים ארבעה מטבעות. מצאו את ההסתברות שלא כל המטבעות ייפלו על ״פלי״.',
      hints: ['השתמשו במאורע המשלים: ״כל המטבעות פלי״.'],
      solutionSteps: [
        String.raw`המאורע המשלים הוא ״כל ארבעת המטבעות פלי״ – תוצאה אחת מתוך $2^4=16$, ולכן ההסתברות שלו היא $\frac1{16}$.`,
        String.raw`לפי חוק המשלים: $P=1-\frac1{16}=\frac{15}{16}$.`,
      ],
      finalAnswer: String.raw`$\frac{15}{16}$`,
      answers: [{ label: String.raw`$P$`, value: 15 / 16 }],
      source: openstax('probability', 23),
    },
    {
      id: 'prob-laws-os2',
      difficulty: 1,
      statement: `גלגל מזל עם חץ מחולק לשמונה גזרות שוות (ראו שרטוט): ${SPINNER_COLORS}. מסובבים את החץ פעם אחת. מהי ההסתברות שהחץ ייעצר על גזרה סגולה או על אות תנועה (A, E, I, O או U)?`,
      figureSvg: SPINNER_SVG,
      hints: [String.raw`$P(X\cup Y)=P(X)+P(Y)-P(X\cap Y)$.`, 'האם יש גזרה שהיא גם סגולה וגם אות תנועה?'],
      solutionSteps: [
        String.raw`נסמן $X$ – ״סגול״ ו-$Y$ – ״אות תנועה״. רק הגזרה B סגולה, ולכן $P(X)=\frac18$. אותיות התנועה הן A, E, I, O, ולכן $P(Y)=\frac48$.`,
        String.raw`הגזרה הסגולה B אינה תנועה, ולכן $X\cap Y=\emptyset$ – המאורעות זרים.`,
        String.raw`$P(X\cup Y)=\frac18+\frac48=\frac58$.`,
      ],
      finalAnswer: String.raw`$\frac58$`,
      answers: [{ label: String.raw`$P$`, value: 5 / 8 }],
      source: openstax('probability', 9),
    },
    {
      id: 'prob-laws-os3',
      difficulty: 2,
      statement: 'שולפים קלף אחד באקראי מחפיסה רגילה של 52 קלפים (4 סדרות של 13 קלפים; בכל סדרה יש אס אחד). מהי ההסתברות לשלוף אס או קלף מסדרת היהלום?',
      hints: [String.raw`$P(X\cup Y)=P(X)+P(Y)-P(X\cap Y)$.`, 'אס היהלום נספר פעמיים.'],
      solutionSteps: [
        String.raw`$X$ – ״אס״: 4 קלפים, $P(X)=\frac4{52}$. $Y$ – ״יהלום״: 13 קלפים, $P(Y)=\frac{13}{52}$.`,
        String.raw`$X\cap Y$ – ״אס יהלום״: קלף אחד, $P(X\cap Y)=\frac1{52}$.`,
        String.raw`לפי נוסחת החיבור: $P(X\cup Y)=\frac{4+13-1}{52}=\frac{16}{52}=\frac4{13}\approx0.308$.`,
      ],
      finalAnswer: String.raw`$\frac4{13}$`,
      answers: [{ label: String.raw`$P$`, value: 4 / 13 }],
      source: openstax('probability', 30),
    },
    {
      id: 'prob-laws-os4',
      difficulty: 2,
      statement: 'מטילים מטבע ושולפים קלף מחפיסה רגילה של 52 קלפים (13 מהם מסדרת התלתן). מצאו את ההסתברות לקבל ״עץ״ במטבע או קלף תלתן.',
      hints: [String.raw`המטבע והקלף בלתי תלויים: $P(X\cap Y)=P(X)\cdot P(Y)$.`, 'אפשר גם דרך המשלים: לא ״עץ״ וגם לא תלתן.'],
      solutionSteps: [
        String.raw`$X$ – ״עץ״: $P(X)=\frac12$. $Y$ – ״תלתן״: $P(Y)=\frac{13}{52}=\frac14$.`,
        String.raw`ההטלה והשליפה בלתי תלויות, ולכן $P(X\cap Y)=\frac12\cdot\frac14=\frac18$.`,
        String.raw`$P(X\cup Y)=\frac12+\frac14-\frac18=\frac58$.`,
        String.raw`בדיקה דרך המשלים: $P(\overline{X}\cap\overline{Y})=\frac12\cdot\frac34=\frac38$, ו-$1-\frac38=\frac58$.`,
      ],
      finalAnswer: String.raw`$\frac58$`,
      answers: [{ label: String.raw`$P$`, value: 5 / 8 }],
      source: openstax('probability', 43),
    },
    {
      id: 'prob-laws-os5',
      difficulty: 2,
      statement: 'מטילים שתי קוביות ומחברים את התוצאות. מצאו את ההסתברות שלפחות אחת הקוביות תראה 4, או שהסכום יהיה 8.',
      hints: ['מנו את הזוגות עם לפחות 4 אחד, את הזוגות שסכומם 8, ואת הזוגות ששייכים לשני המאורעות.'],
      solutionSteps: [
        String.raw`$X$ – ״לפחות קובייה אחת מראה 4״: $6+6-1=11$ זוגות (הזוג $(4,4)$ נספר פעם אחת).`,
        String.raw`$Y$ – ״הסכום 8״: $(2,6),(3,5),(4,4),(5,3),(6,2)$ – 5 זוגות.`,
        String.raw`$X\cap Y$: רק $(4,4)$ – זוג אחד.`,
        String.raw`$P(X\cup Y)=\frac{11+5-1}{36}=\frac{15}{36}=\frac5{12}$.`,
      ],
      finalAnswer: String.raw`$\frac5{12}$`,
      answers: [{ label: String.raw`$P$`, value: 5 / 12 }],
      source: openstax('probability', 35),
    },
  ],

  // ───────────────────────── גאומטריה אנליטית ─────────────────────────
  'ag-distance': [
    {
      id: 'ag-distance-os1',
      difficulty: 1,
      statement: String.raw`מצאו את המרחק בין הנקודות $(-4,1)$ ו-$(3,-4)$. כתבו את התשובה המדויקת בצורת שורש פשוטה.`,
      hints: [String.raw`$d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.`],
      solutionSteps: [
        String.raw`$x_2-x_1=3-(-4)=7$ ו-$y_2-y_1=-4-1=-5$.`,
        String.raw`$d=\sqrt{7^2+(-5)^2}=\sqrt{49+25}=\sqrt{74}\approx8.60$.`,
      ],
      finalAnswer: String.raw`$d=\sqrt{74}$`,
      answers: [{ label: String.raw`$d$`, value: Math.sqrt(74) }],
      source: openstax('coordinates', 17),
    },
    {
      id: 'ag-distance-os2',
      difficulty: 1,
      statement: String.raw`במפה שבה השיעורים נמדדים במיילים, שיעורי סן פרנסיסקו הם $(53,17)$ ושיעורי סן חוזה הם $(76,-12)$. מצאו את המרחק בין שתי הערים, בעיגול למייל שלם.`,
      hints: ['השתמשו בנוסחת המרחק בין שתי נקודות.'],
      solutionSteps: [
        String.raw`הפרשי השיעורים: $76-53=23$ ו-$-12-17=-29$.`,
        String.raw`$d=\sqrt{23^2+29^2}=\sqrt{529+841}=\sqrt{1370}\approx37.01$.`,
        'המרחק הוא כ-37 מייל.',
      ],
      finalAnswer: 'כ-37 מייל',
      answers: [{ label: String.raw`$d$ (מייל)`, value: Math.sqrt(1370) }],
      source: openstax('coordinates', '60–61'),
    },
    {
      id: 'ag-distance-os3',
      difficulty: 2,
      statement: String.raw`סירה קטנה באגם אונטריו שולחת אות מצוקה. שיעורי הסירה הם $(49,64)$. סירת הצלה אחת נמצאת בנקודה $(60,82)$, וסירה שנייה של משמר החופים נמצאת בנקודה $(58,47)$. בהנחה ששתי סירות ההצלה שטות באותה מהירות, איזו מהן תגיע ראשונה לסירה שבמצוקה?`,
      hints: ['חשבו את המרחק מכל סירת הצלה לסירה שבמצוקה. באותה מהירות, מרחק קצר יותר פירושו זמן קצר יותר.'],
      solutionSteps: [
        String.raw`המרחק של סירת ההצלה הראשונה: $\sqrt{(60-49)^2+(82-64)^2}=\sqrt{121+324}=\sqrt{445}\approx21.10$.`,
        String.raw`המרחק של הסירה השנייה: $\sqrt{(58-49)^2+(47-64)^2}=\sqrt{81+289}=\sqrt{370}\approx19.24$.`,
        String.raw`$\sqrt{370}<\sqrt{445}$, ולכן הסירה השנייה (בנקודה $(58,47)$) תגיע ראשונה.`,
      ],
      finalAnswer: String.raw`הסירה שבנקודה $(58,47)$ (מרחק $\sqrt{370}\approx19.24$ לעומת $\sqrt{445}\approx21.10$)`,
      answers: [
        { label: 'המרחק של הסירה הראשונה', value: Math.sqrt(445) },
        { label: 'המרחק של הסירה השנייה', value: Math.sqrt(370) },
      ],
      source: openstax('coordinates', 62),
    },
    {
      id: 'ag-distance-os4',
      difficulty: 2,
      statement: String.raw`קודקודי מלבן הם $(-6,5)$, $(10,5)$, $(10,-1)$ ו-$(-6,-1)$. הוכיחו שאלכסוני המלבן שווים באורכם, ומצאו את אורכם.`,
      hints: [String.raw`האלכסונים מחברים קודקודים נגדיים: $(-6,5)$ עם $(10,-1)$, ו-$(10,5)$ עם $(-6,-1)$.`],
      solutionSteps: [
        String.raw`האלכסון הראשון, בין $(-6,5)$ ל-$(10,-1)$: $\sqrt{16^2+(-6)^2}=\sqrt{256+36}=\sqrt{292}$.`,
        String.raw`האלכסון השני, בין $(10,5)$ ל-$(-6,-1)$: $\sqrt{(-16)^2+(-6)^2}=\sqrt{292}$.`,
        String.raw`שני האלכסונים באורך $\sqrt{292}=2\sqrt{73}\approx17.09$, ולכן הם שווים.`,
      ],
      finalAnswer: String.raw`שני האלכסונים באורך $\sqrt{292}=2\sqrt{73}\approx17.09$`,
      answers: [{ label: 'אורך אלכסון', value: Math.sqrt(292) }],
      source: openstax('coordinates', 58),
    },
  ],

  'ag-midpoint': [
    {
      id: 'ag-midpoint-os1',
      difficulty: 1,
      statement: String.raw`מצאו את שיעורי אמצע הקטע המחבר את הנקודות $(-1,1)$ ו-$(7,-4)$.`,
      hints: [String.raw`$M=\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$.`],
      solutionSteps: [
        String.raw`$x_M=\frac{-1+7}{2}=3$ ו-$y_M=\frac{1+(-4)}{2}=-\frac32$.`,
        String.raw`$M=\left(3,-\frac32\right)$.`,
      ],
      finalAnswer: String.raw`$\left(3,-\frac32\right)$`,
      answers: [
        { label: String.raw`$x_M$`, value: 3 },
        { label: String.raw`$y_M$`, value: -1.5 },
      ],
      source: openstax('coordinates', 23),
    },
    {
      id: 'ag-midpoint-os2',
      difficulty: 1,
      statement: String.raw`מצאו את שיעורי אמצע הקטע המחבר את הנקודות $(-43,17)$ ו-$(23,-34)$.`,
      hints: [String.raw`שיעור ה-$x$ של האמצע הוא ממוצע שיעורי ה-$x$, וכך גם שיעור ה-$y$.`],
      solutionSteps: [
        String.raw`$x_M=\frac{-43+23}{2}=\frac{-20}{2}=-10$.`,
        String.raw`$y_M=\frac{17+(-34)}{2}=-\frac{17}{2}=-8.5$, ולכן $M=(-10,-8.5)$.`,
      ],
      finalAnswer: String.raw`$(-10,\,-8.5)$`,
      answers: [
        { label: String.raw`$x_M$`, value: -10 },
        { label: String.raw`$y_M$`, value: -8.5 },
      ],
      source: openstax('coordinates', 26),
    },
    {
      id: 'ag-midpoint-os3',
      difficulty: 2,
      statement: String.raw`נתונות הנקודות $A(1,3)$, $B(-3,5)$, $C(4,7)$ ו-$D(5,-4)$. מצאו את שיעורי האמצע של הקטע $AB$ ושל הקטע $CD$, ואחר כך את המרחק בין שתי נקודות האמצע. עגלו לשלוש ספרות אחרי הנקודה.`,
      hints: ['חשבו כל אמצע לפי נוסחת אמצע קטע.', 'אחר כך השתמשו בנוסחת המרחק.'],
      solutionSteps: [
        String.raw`אמצע $AB$: $M_1=\left(\frac{1-3}{2},\frac{3+5}{2}\right)=(-1,4)$.`,
        String.raw`אמצע $CD$: $M_2=\left(\frac{4+5}{2},\frac{7-4}{2}\right)=(4.5,1.5)$.`,
        String.raw`$M_1M_2=\sqrt{(4.5+1)^2+(1.5-4)^2}=\sqrt{30.25+6.25}=\sqrt{36.5}\approx6.042$.`,
      ],
      finalAnswer: String.raw`$M_1=(-1,4)$, $M_2=(4.5,1.5)$, $M_1M_2=\sqrt{36.5}\approx6.042$`,
      answers: [
        { label: String.raw`$x$ של אמצע $AB$`, value: -1 },
        { label: String.raw`$y$ של אמצע $AB$`, value: 4 },
        { label: String.raw`$x$ של אמצע $CD$`, value: 4.5 },
        { label: String.raw`$y$ של אמצע $CD$`, value: 1.5 },
        { label: 'המרחק בין נקודות האמצע', value: Math.sqrt(36.5) },
      ],
      source: openstax('coordinates', '56–57'),
    },
    {
      id: 'ag-midpoint-os4',
      difficulty: 2,
      statement: String.raw`קודקודי מלבן הם $(-6,5)$, $(10,5)$, $(10,-1)$ ו-$(-6,-1)$. מצאו את שיעורי האמצע של כל אחד מאלכסוני המלבן. מה אפשר להסיק?`,
      hints: [String.raw`אלכסון אחד מחבר את $(-6,5)$ ו-$(10,-1)$, והשני את $(10,5)$ ו-$(-6,-1)$.`],
      solutionSteps: [
        String.raw`אמצע האלכסון בין $(-6,5)$ ל-$(10,-1)$: $\left(\frac{-6+10}{2},\frac{5-1}{2}\right)=(2,2)$.`,
        String.raw`אמצע האלכסון בין $(10,5)$ ל-$(-6,-1)$: $\left(\frac{10-6}{2},\frac{5-1}{2}\right)=(2,2)$.`,
        String.raw`לשני האלכסונים אותו אמצע, $(2,2)$, כלומר האלכסונים חוצים זה את זה – תכונה של כל מקבילית, ובפרט של מלבן.`,
      ],
      finalAnswer: String.raw`לשני האלכסונים אותו אמצע, $(2,2)$: האלכסונים חוצים זה את זה.`,
      answers: [
        { label: String.raw`$x$ של האמצע`, value: 2 },
        { label: String.raw`$y$ של האמצע`, value: 2 },
      ],
      source: openstax('coordinates', 59),
    },
  ],

  'ag-line-equation': [
    {
      id: 'ag-line-equation-os1',
      difficulty: 1,
      statement: String.raw`מצאו את משוואת הישר העובר דרך הנקודות $(2,4)$ ו-$(4,10)$. כתבו אותה בצורה $y=mx+n$.`,
      hints: [String.raw`חשבו קודם את השיפוע $m=\frac{y_2-y_1}{x_2-x_1}$.`, String.raw`הציבו נקודה ב-$y-y_1=m(x-x_1)$.`],
      solutionSteps: [
        String.raw`$m=\frac{10-4}{4-2}=3$.`,
        String.raw`$y-4=3(x-2)$, ולכן $y=3x-2$.`,
        String.raw`בדיקה: $3\cdot4-2=10$ – גם הנקודה $(4,10)$ על הישר.`,
      ],
      finalAnswer: String.raw`$y=3x-2$`,
      answers: [
        { label: String.raw`השיפוע $m$`, value: 3 },
        { label: String.raw`$n$`, value: -2 },
      ],
      source: openstax('linear', 31),
    },
    {
      id: 'ag-line-equation-os2',
      difficulty: 1,
      statement: String.raw`מצאו את משוואת הישר העובר דרך הנקודות $(-1,4)$ ו-$(5,2)$. כתבו אותה בצורה $y=mx+n$.`,
      hints: [String.raw`$m=\frac{2-4}{5-(-1)}$.`],
      solutionSteps: [
        String.raw`$m=\frac{2-4}{5-(-1)}=\frac{-2}{6}=-\frac13$.`,
        String.raw`$y-4=-\frac13(x+1)$, ולכן $y=-\frac13x-\frac13+4=-\frac13x+\frac{11}{3}$.`,
        String.raw`בדיקה: $-\frac13\cdot5+\frac{11}{3}=\frac63=2$, כנדרש.`,
      ],
      finalAnswer: String.raw`$y=-\frac13x+\frac{11}{3}$`,
      answers: [
        { label: String.raw`השיפוע $m$`, value: -1 / 3 },
        { label: String.raw`$n$`, value: 11 / 3 },
      ],
      source: openstax('linear', 33),
    },
    {
      id: 'ag-line-equation-os3',
      difficulty: 2,
      statement: String.raw`$f$ היא פונקציה קווית (הגרף שלה ישר), ונתון $f(-5)=-4$ ו-$f(5)=2$. מצאו את $f(x)$.`,
      hints: [String.raw`הנתונים אומרים שהישר עובר דרך הנקודות $(-5,-4)$ ו-$(5,2)$.`],
      solutionSteps: [
        String.raw`הגרף של $f$ עובר דרך הנקודות $(-5,-4)$ ו-$(5,2)$.`,
        String.raw`$m=\frac{2-(-4)}{5-(-5)}=\frac{6}{10}=\frac35$.`,
        String.raw`$y-2=\frac35(x-5)$, כלומר $y=\frac35x-1$, ולכן $f(x)=\frac35x-1$.`,
      ],
      finalAnswer: String.raw`$f(x)=\frac35x-1$`,
      answers: [
        { label: String.raw`השיפוע $m$`, value: 0.6 },
        { label: String.raw`$n$`, value: -1 },
      ],
      source: openstax('linear', 29),
    },
    {
      id: 'ag-line-equation-os4',
      difficulty: 2,
      statement: String.raw`כאשר הטמפרטורה היא 0 מעלות צלזיוס, הטמפרטורה בפרנהייט היא 32, וכאשר הטמפרטורה היא 100 מעלות צלזיוס, היא 212 מעלות פרנהייט. הביעו את הטמפרטורה בפרנהייט כפונקציה קווית $F(C)$ של הטמפרטורה בצלזיוס.

א. מהו קצב השינוי של הטמפרטורה בפרנהייט לכל מעלת צלזיוס?

ב. חשבו את $F(28)$ ופרשו את התוצאה.

ג. חשבו את $F(-40)$ ופרשו את התוצאה.`,
      hints: [String.raw`הישר עובר דרך הנקודות $(0,32)$ ו-$(100,212)$ (הטמפרטורה בצלזיוס על הציר האופקי).`, 'השיפוע הוא קצב השינוי.'],
      solutionSteps: [
        String.raw`הנקודות $(0,32)$ ו-$(100,212)$ על הישר. השיפוע: $m=\frac{212-32}{100-0}=\frac{180}{100}=1.8$.`,
        String.raw`הישר חותך את הציר האנכי ב-32, ולכן $F(C)=1.8C+32$.`,
        'א. קצב השינוי הוא השיפוע: כל עלייה של מעלת צלזיוס אחת מעלה את הטמפרטורה ב-1.8 מעלות פרנהייט.',
        String.raw`ב. $F(28)=1.8\cdot28+32=82.4$: טמפרטורה של 28 מעלות צלזיוס היא 82.4 מעלות פרנהייט.`,
        String.raw`ג. $F(-40)=1.8\cdot(-40)+32=-40$: בטמפרטורה של 40 מעלות מתחת לאפס שתי הסקאלות מראות אותו מספר.`,
      ],
      finalAnswer: String.raw`$F(C)=1.8C+32$; א. 1.8; ב. $F(28)=82.4$; ג. $F(-40)=-40$`,
      answers: [
        { label: 'קצב השינוי', value: 1.8 },
        { label: String.raw`$F(28)$`, value: 82.4 },
        { label: String.raw`$F(-40)$`, value: -40 },
      ],
      source: openstax('linear', 122),
    },
  ],

  'ag-slope-parallel': [
    {
      id: 'ag-slope-parallel-os1',
      difficulty: 1,
      statement: String.raw`מצאו את שיפוע הישר העובר דרך הנקודות $(8,-2)$ ו-$(4,6)$.`,
      hints: [String.raw`$m=\frac{y_2-y_1}{x_2-x_1}$.`],
      solutionSteps: [String.raw`$m=\frac{6-(-2)}{4-8}=\frac{8}{-4}=-2$.`, 'השיפוע שלילי – הישר יורד משמאל לימין.'],
      finalAnswer: String.raw`$m=-2$`,
      answers: [{ label: String.raw`$m$`, value: -2 }],
      source: openstax('linear', 27),
    },
    {
      id: 'ag-slope-parallel-os2',
      difficulty: 1,
      statement: String.raw`קבעו אם הישרים $3y+4x=12$ ו-$-6y=8x+1$ מקבילים, מאונכים או אף אחד מהשניים.`,
      hints: [String.raw`העבירו כל משוואה לצורה $y=mx+n$ והשוו את השיפועים.`],
      solutionSteps: [
        String.raw`$3y+4x=12\Rightarrow y=-\frac43x+4$, שיפוע $-\frac43$.`,
        String.raw`$-6y=8x+1\Rightarrow y=-\frac43x-\frac16$, שיפוע $-\frac43$.`,
        String.raw`השיפועים שווים והחיתוכים עם ציר $y$ שונים ($4\ne-\frac16$), ולכן הישרים מקבילים (ואינם מתלכדים).`,
      ],
      finalAnswer: String.raw`מקבילים (לשניהם שיפוע $-\frac43$)`,
      answers: [
        { label: 'שיפוע הישר הראשון', value: -4 / 3 },
        { label: 'שיפוע הישר השני', value: -4 / 3 },
      ],
      source: openstax('linear', 39),
    },
    {
      id: 'ag-slope-parallel-os3',
      difficulty: 2,
      statement: String.raw`ישר עובר דרך הנקודות $(x,2)$ ו-$(-4,6)$, ושיפועו 3. מצאו את $x$.`,
      hints: [String.raw`כתבו את נוסחת השיפוע עם הנעלם $x$ והשוו ל-3.`],
      solutionSteps: [
        String.raw`$m=\frac{6-2}{-4-x}=3$.`,
        String.raw`$4=3(-4-x)=-12-3x$, ולכן $3x=-16$ ו-$x=-\frac{16}{3}$.`,
        String.raw`בדיקה: $\frac{6-2}{-4+\frac{16}{3}}=\frac{4}{4/3}=3$. (בספר התשובה רשומה בטעות כ-$y=-\frac{16}{3}$; הנעלם הוא $x$.)`,
      ],
      finalAnswer: String.raw`$x=-\frac{16}{3}$`,
      answers: [{ label: String.raw`$x$`, value: -16 / 3 }],
      source: openstax('linear', 105),
    },
    {
      id: 'ag-slope-parallel-os4',
      difficulty: 3,
      statement: String.raw`מצאו את משוואת הישר המקביל לישר $g(x)=-0.01x+2.01$ ועובר דרך הנקודה $(1,2)$.`,
      hints: [String.raw`לישר מקביל יש אותו שיפוע: $m=-0.01$.`, String.raw`הציבו את הנקודה $(1,2)$ ומצאו את $n$. מה מתקבל?`],
      solutionSteps: [
        String.raw`לישרים מקבילים יש אותו שיפוע, ולכן הישר המבוקש הוא $y=-0.01x+n$.`,
        String.raw`הצבת $(1,2)$: $2=-0.01+n$, ולכן $n=2.01$.`,
        String.raw`התקבל $y=-0.01x+2.01$ – זה הישר $g$ עצמו! הסיבה: $g(1)=-0.01+2.01=2$, כלומר הנקודה $(1,2)$ נמצאת על $g$, ולכן הישר היחיד דרכה עם אותו שיפוע הוא $g$ (ישר מתלכד).`,
      ],
      finalAnswer: String.raw`$y=-0.01x+2.01$ – מתלכד עם $g$, כי הנקודה $(1,2)$ נמצאת עליו`,
      answers: [
        { label: String.raw`השיפוע $m$`, value: -0.01, tolerance: 0.0005 },
        { label: String.raw`$n$`, value: 2.01, tolerance: 0.001 },
      ],
      source: openstax('linear', 110),
    },
  ],

  'ag-perpendicular': [
    {
      id: 'ag-perpendicular-os1',
      difficulty: 1,
      statement: String.raw`קבעו אם הישרים $4x-7y=10$ ו-$7x+4y=1$ מקבילים, מאונכים או אף אחד מהשניים.`,
      hints: [String.raw`מצאו את שני השיפועים; ישרים מאונכים כאשר מכפלת השיפועים היא $-1$.`],
      solutionSteps: [
        String.raw`$4x-7y=10\Rightarrow y=\frac47x-\frac{10}7$, שיפוע $\frac47$.`,
        String.raw`$7x+4y=1\Rightarrow y=-\frac74x+\frac14$, שיפוע $-\frac74$.`,
        String.raw`מכפלת השיפועים $\frac47\cdot\left(-\frac74\right)=-1$, ולכן הישרים מאונכים.`,
      ],
      finalAnswer: 'מאונכים',
      answers: [
        { label: 'שיפוע הישר הראשון', value: 4 / 7 },
        { label: 'שיפוע הישר השני', value: -7 / 4 },
      ],
      source: openstax('linear', 37),
    },
    {
      id: 'ag-perpendicular-os2',
      difficulty: 1,
      statement: String.raw`מצאו את משוואת הישר המאונך לישר $y=3x+4$ ועובר דרך הנקודה $(3,1)$.`,
      hints: [String.raw`שיפוע המאונך $m$ מקיים $3m=-1$.`],
      solutionSteps: [
        String.raw`שיפוע הישר הנתון הוא 3, ולכן שיפוע המאונך $m$ מקיים $3m=-1$, כלומר $m=-\frac13$.`,
        String.raw`$y-1=-\frac13(x-3)$, ולכן $y=-\frac13x+2$.`,
      ],
      finalAnswer: String.raw`$y=-\frac13x+2$`,
      answers: [
        { label: String.raw`השיפוע $m$`, value: -1 / 3 },
        { label: String.raw`$n$`, value: 2 },
      ],
      source: openstax('linear', 55),
    },
    {
      id: 'ag-perpendicular-os3',
      difficulty: 2,
      statement: String.raw`ישר 1 עובר דרך הנקודות $(1,7)$ ו-$(5,5)$, וישר 2 עובר דרך הנקודות $(-1,-3)$ ו-$(1,1)$. מצאו את שיפועי שני הישרים, וקבעו אם הם מקבילים, מאונכים או אף אחד מהשניים.`,
      hints: ['חשבו כל שיפוע לפי שתי הנקודות, ואחר כך השוו או הכפילו.'],
      solutionSteps: [
        String.raw`$m_1=\frac{5-7}{5-1}=-\frac12$.`,
        String.raw`$m_2=\frac{1-(-3)}{1-(-1)}=\frac42=2$.`,
        String.raw`$m_1\cdot m_2=-\frac12\cdot2=-1$, ולכן הישרים מאונכים.`,
      ],
      finalAnswer: String.raw`$m_1=-\frac12$, $m_2=2$: הישרים מאונכים`,
      answers: [
        { label: String.raw`$m_1$`, value: -0.5 },
        { label: String.raw`$m_2$`, value: 2 },
      ],
      source: openstax('linear', 50),
    },
    {
      id: 'ag-perpendicular-os4',
      difficulty: 2,
      statement: String.raw`מצאו את משוואת הישר המאונך לישר $g(x)=-0.01x+2.01$ ועובר דרך הנקודה $(1,2)$.`,
      hints: [String.raw`שיפוע המאונך הוא $-\frac{1}{-0.01}$.`],
      solutionSteps: [
        String.raw`שיפוע $g$ הוא $-0.01$, ולכן שיפוע המאונך הוא $m=-\frac{1}{-0.01}=100$.`,
        String.raw`$y-2=100(x-1)$, ולכן $y=100x-98$.`,
        String.raw`הנקודה $(1,2)$ נמצאת על $g$ (כי $g(1)=2$), כך שזה הישר המאונך ל-$g$ בנקודה הזו.`,
      ],
      finalAnswer: String.raw`$y=100x-98$`,
      answers: [
        { label: String.raw`השיפוע $m$`, value: 100 },
        { label: String.raw`$n$`, value: -98 },
      ],
      source: openstax('linear', 111),
    },
  ],

  // ───────────────────────── בעיות מילוליות ─────────────────────────
  'word-motion': [
    {
      id: 'word-motion-os1',
      difficulty: 1,
      statement: 'שני מטוסים טסים מאותה נקודה בכיוונים מנוגדים. אחד טס במהירות 450 מייל לשעה והשני במהירות 550 מייל לשעה. כעבור כמה זמן יהיה המרחק ביניהם 4,000 מייל?',
      hints: ['בכיוונים מנוגדים המרחק ביניהם גדל בכל שעה בסכום המהירויות.'],
      solutionSteps: [
        String.raw`נסמן ב-$t$ את הזמן בשעות. המטוס הראשון עובר $450t$ מייל והשני $550t$ מייל, בכיוונים מנוגדים.`,
        String.raw`המרחק ביניהם הוא סכום הדרכים: $450t+550t=1000t$.`,
        String.raw`$1000t=4000$, ולכן $t=4$ שעות.`,
      ],
      finalAnswer: '4 שעות',
      answers: [{ label: 'הזמן (שעות)', value: 4 }],
      source: openstax('models', 19),
    },
    {
      id: 'word-motion-os2',
      difficulty: 2,
      statement: 'בן מתחיל ללכת לאורך שביל במהירות 4 מייל לשעה. שעה וחצי אחרי שבן יצא, אחותו אמנדה מתחילה לרוץ לאורך אותו שביל במהירות 6 מייל לשעה. כמה זמן אחרי שאמנדה יצאה היא תשיג את בן?',
      hints: [String.raw`נסמן ב-$t$ את זמן הריצה של אמנדה; בן הלך עד אז $t+1.5$ שעות.`, 'ברגע ההשגה שניהם עברו אותה דרך.'],
      solutionSteps: [
        String.raw`נסמן ב-$t$ את הזמן (בשעות) מהרגע שאמנדה יצאה. עד ההשגה אמנדה עוברת $6t$ מייל, ובן, שיצא שעה וחצי קודם, עובר $4(t+1.5)$ מייל.`,
        String.raw`ברגע ההשגה הדרכים שוות: $6t=4(t+1.5)=4t+6$.`,
        String.raw`$2t=6$, ולכן $t=3$ שעות. (בדיקה: שניהם עברו 18 מייל.)`,
      ],
      finalAnswer: '3 שעות אחרי שאמנדה יצאה',
      answers: [{ label: 'הזמן (שעות)', value: 3 }],
      source: openstax('models', 20),
    },
    {
      id: 'word-motion-os3',
      difficulty: 2,
      statement: 'פיורה מתחילה לרכוב על אופניה במהירות 20 מייל לשעה. אחרי זמן מה היא מאטה ל-12 מייל לשעה, ושומרת על המהירות הזו עד סוף הנסיעה. כל הנסיעה, באורך 70 מייל, נמשכת 4.5 שעות. איזה מרחק עברה פיורה במהירות 20 מייל לשעה?',
      hints: [String.raw`נסמן ב-$t$ את הזמן במהירות 20; הזמן במהירות 12 הוא $4.5-t$.`, 'סכום הדרכים הוא 70 מייל.'],
      solutionSteps: [
        String.raw`נסמן ב-$t$ את הזמן (בשעות) שבו רכבה במהירות 20 מייל לשעה; במהירות 12 רכבה $4.5-t$ שעות.`,
        String.raw`הדרך הכוללת: $20t+12(4.5-t)=70$.`,
        String.raw`$20t+54-12t=70$, ולכן $8t=16$ ו-$t=2$ שעות.`,
        String.raw`המרחק במהירות 20: $20\cdot2=40$ מייל (ובמהירות 12: $12\cdot2.5=30$ מייל – ביחד 70).`,
      ],
      finalAnswer: '40 מייל',
      answers: [{ label: 'המרחק (מייל)', value: 40 }],
      source: openstax('models', 21),
    },
    {
      id: 'word-motion-os4',
      difficulty: 3,
      statement: 'ג׳יפ וטנדר נכנסים לכביש מהיר, שעובר בכיוון מזרח–מערב, באותה יציאה, ונוסעים בכיוונים מנוגדים. הג׳יפ נכנס לכביש 30 דקות לפני הטנדר, ונסע במהירות הקטנה ב-7 מייל לשעה ממהירות הטנדר. שעתיים אחרי שהטנדר נכנס לכביש, המרחק בין שני הרכבים היה 306.5 מייל. מצאו את המהירות של כל אחד מהרכבים, בהנחה ששניהם נסעו במהירות קבועה.',
      hints: [String.raw`נסמן ב-$v$ את מהירות הטנדר; מהירות הג׳יפ היא $v-7$.`, 'הטנדר נסע 2 שעות והג׳יפ 2.5 שעות, בכיוונים מנוגדים – הדרכים מתחברות.'],
      solutionSteps: [
        String.raw`נסמן ב-$v$ את מהירות הטנדר (מייל לשעה); מהירות הג׳יפ היא $v-7$.`,
        'עד הרגע הנתון הטנדר נסע 2 שעות, והג׳יפ, שנכנס חצי שעה קודם, נסע 2.5 שעות.',
        String.raw`הם נוסעים בכיוונים מנוגדים מאותה יציאה, ולכן המרחק ביניהם הוא סכום הדרכים: $2v+2.5(v-7)=306.5$.`,
        String.raw`$4.5v-17.5=306.5$, ולכן $4.5v=324$ ו-$v=72$.`,
        String.raw`מהירות הטנדר 72 מייל לשעה ומהירות הג׳יפ 65 מייל לשעה. (בדיקה: $144+162.5=306.5$.)`,
      ],
      finalAnswer: 'הטנדר: 72 מייל לשעה; הג׳יפ: 65 מייל לשעה',
      answers: [
        { label: 'מהירות הטנדר (מייל לשעה)', value: 72 },
        { label: 'מהירות הג׳יפ (מייל לשעה)', value: 65 },
      ],
      source: openstax('systems', 68),
    },
  ],

  'word-percentages': [
    {
      id: 'word-percentages-os1',
      difficulty: 1,
      statement: 'בשנת 2013 היו בארצות הברית כ-317 מיליון אזרחים, וכ-40 מיליון מהם היו קשישים (בני 65 ומעלה). אם פוגשים אזרח אמריקאי באקראי, מהו הסיכוי (באחוזים) שהוא קשיש? עגלו לעשירית האחוז.',
      hints: [String.raw`חשבו $\frac{40}{317}$ והכפילו ב-100 כדי לקבל אחוזים.`],
      solutionSteps: [
        String.raw`החלק של הקשישים באוכלוסייה: $\frac{40}{317}\approx0.12618$.`,
        String.raw`באחוזים: $0.12618\cdot100\approx12.6$, כלומר הסיכוי הוא כ-12.6%.`,
      ],
      finalAnswer: 'כ-12.6%',
      answers: [{ label: 'הסיכוי (באחוזים)', value: 4000 / 317 }],
      source: openstax('probability', 56),
    },
    {
      id: 'word-percentages-os2',
      difficulty: 2,
      statement: 'לראול יש 20,000 דולר להשקעה, והוא רוצה להרוויח ריבית של 11% על כל הסכום. הוא יכול להשקיע חלק מהכסף בריבית של 8% ואת השאר בריבית של 12%. כמה עליו להשקיע בכל אפשרות כדי שהתשואה הכוללת תהיה 11% מ-20,000 הדולר?',
      hints: [String.raw`נסמן ב-$x$ את הסכום שמושקע ב-8%; ב-12% מושקע $20000-x$.`, String.raw`הריבית הכוללת צריכה להיות $0.11\cdot20000=2200$ דולר.`],
      solutionSteps: [
        String.raw`נסמן ב-$x$ את הסכום (בדולרים) שמושקע בריבית של 8%; הסכום שמושקע בריבית של 12% הוא $20000-x$.`,
        String.raw`הריבית הרצויה היא 11% מ-20,000, כלומר $0.11\cdot20000=2200$ דולר.`,
        String.raw`$0.08x+0.12(20000-x)=2200$, כלומר $2400-0.04x=2200$.`,
        String.raw`$0.04x=200$, ולכן $x=5000$: 5,000 דולר בריבית של 8% ו-15,000 דולר בריבית של 12%.`,
        String.raw`בדיקה: $400+1800=2200$.`,
      ],
      finalAnswer: '5,000 דולר ב-8% ו-15,000 דולר ב-12%',
      answers: [
        { label: 'הסכום בריבית 8% (דולר)', value: 5000 },
        { label: 'הסכום בריבית 12% (דולר)', value: 15000 },
      ],
      source: openstax('models', 23),
    },
    {
      id: 'word-percentages-os3',
      difficulty: 2,
      statement: 'מורה לכימיה צריכה לערבב תמיסת מלח בריכוז 30% עם תמיסת מלח בריכוז 70%, כדי לקבל 20 קווארט (יחידת נפח) של תמיסה בריכוז 40%. כמה קווארט מכל תמיסה עליה לערבב?',
      hints: [String.raw`נסמן ב-$x$ את כמות התמיסה של 30%; מהתמיסה של 70% יש $20-x$.`, String.raw`כמות המלח: $0.3x+0.7(20-x)=0.4\cdot20$.`],
      solutionSteps: [
        String.raw`נסמן ב-$x$ את כמות התמיסה בריכוז 30% (בקווארט); מהתמיסה בריכוז 70% צריך $20-x$.`,
        String.raw`כמות המלח נשמרת בערבוב: $0.3x+0.7(20-x)=0.4\cdot20=8$.`,
        String.raw`$14-0.4x=8$, ולכן $0.4x=6$ ו-$x=15$.`,
        String.raw`יש לערבב 15 קווארט מהתמיסה של 30% ו-5 קווארט מהתמיסה של 70%. (בדיקה: $4.5+3.5=8$.)`,
      ],
      finalAnswer: '15 קווארט מהתמיסה של 30% ו-5 קווארט מהתמיסה של 70%',
      answers: [
        { label: 'תמיסה של 30% (קווארט)', value: 15 },
        { label: 'תמיסה של 70% (קווארט)', value: 5 },
      ],
      source: openstax('models', 22),
    },
    {
      id: 'word-percentages-os4',
      difficulty: 2,
      statement: 'מדענית מכניסה 50 תאים לצלחת פטרי. בכל שעה אוכלוסיית התאים גדלה ב-1.5%. כמה תאים יהיו בצלחת אחרי יממה אחת? עגלו למספר שלם.',
      hints: ['גידול של 1.5% פירושו כפל ב-1.015 בכל שעה.', String.raw`אחרי 24 שעות: $50\cdot1.015^{24}$.`],
      solutionSteps: [
        String.raw`גידול של 1.5% בשעה פירושו שבכל שעה מספר התאים מוכפל ב-$1+\frac{1.5}{100}=1.015$.`,
        String.raw`מספרי התאים בתחילת כל שעה יוצרים סדרה הנדסית עם איבר ראשון 50 ומנה $q=1.015$; ביממה יש 24 שעות, כלומר 24 הכפלות.`,
        String.raw`$50\cdot1.015^{24}\approx50\cdot1.4295\approx71.5$, כלומר כ-71 תאים.`,
      ],
      finalAnswer: 'כ-71 תאים',
      answers: [{ label: 'מספר התאים', value: 71.4751405964511, tolerance: 0.5 }],
      source: openstax('series', 60),
    },
    {
      id: 'word-percentages-os5',
      difficulty: 3,
      statement: 'משקיעה השקיעה 1.1 מיליון דולר בשתי עסקאות קרקע. בעסקה הראשונה, ״סוואן פיק״, התשואה הייתה עלייה של 110% על הכסף שהשקיעה. בעסקה השנייה, ״ריברסייד״, היא הרוויחה 50% מעל מה שהשקיעה. הרווח הכולל שלה היה מיליון דולר. כמה השקיעה בכל אחת מהעסקאות?',
      hints: [String.raw`נסמן ב-$x$ את ההשקעה ב-״סוואן פיק״ וב-$y$ את ההשקעה ב-״ריברסייד״ (במיליוני דולרים).`, String.raw`רווח של 110% הוא $1.1x$, ורווח של 50% הוא $0.5y$.`],
      solutionSteps: [
        String.raw`נסמן ב-$x$ וב-$y$ את הסכומים (במיליוני דולרים) שהושקעו ב-״סוואן פיק״ וב-״ריברסייד״. סך ההשקעה: $x+y=1.1$.`,
        String.raw`עלייה של 110% פירושה רווח של $1.1x$, ורווח של 50% הוא $0.5y$. סך הרווח: $1.1x+0.5y=1$.`,
        String.raw`מהמשוואה הראשונה $y=1.1-x$, ולכן $1.1x+0.5(1.1-x)=1$, כלומר $0.6x+0.55=1$.`,
        String.raw`$0.6x=0.45$, ולכן $x=0.75$ ו-$y=0.35$.`,
        'היא השקיעה 750,000 דולר ב-״סוואן פיק״ ו-350,000 דולר ב-״ריברסייד״. (בדיקה: רווח של 825,000 ועוד 175,000 – ביחד מיליון דולר.)',
      ],
      finalAnswer: '750,000 דולר ב-״סוואן פיק״ ו-350,000 דולר ב-״ריברסייד״',
      answers: [
        { label: 'ההשקעה ב-״סוואן פיק״ (דולר)', value: 750000 },
        { label: 'ההשקעה ב-״ריברסייד״ (דולר)', value: 350000 },
      ],
      source: openstax('systems', 71),
    },
  ],
};
