/**
 * "תרגול אינסופי" – הסתברות (שאלון 35581, שאלה 3): חוקי ההסתברות, טבלה דו-ממדית, עץ דו-שלבי
 * (בלי החזרה), נוסחת בייס והתפלגות בינומית. ההסתברויות מוצגות עד 4 ספרות אחרי הנקודה, ולכן
 * הסבולת בבדיקה האוטומטית היא 0.0006.
 */
import type { NumericAnswer } from '../lessons/types';
import { fmt, fracTex } from './helpers';
import type { ExerciseGenerator, Rng } from './types';

// ---------- local helpers ----------

const PROBABILITY_TOLERANCE = 0.0006;

function probability(label: string, value: number): NumericAnswer {
  return { label, value, tolerance: PROBABILITY_TOLERANCE };
}

/** '= 0.25' when exact to `digits` decimals, otherwise '\approx 0.3333'. */
function eq(value: number, digits = 4): string {
  return Math.abs(value - Number(value.toFixed(digits))) < 1e-12 ? `= ${fmt(value, digits)}` : `\\approx ${fmt(value, digits)}`;
}

function binomial(n: number, k: number): number {
  let result = 1;
  for (let i = 1; i <= k; i += 1) result = (result * (n - k + i)) / i;
  return Math.round(result);
}

/** A probability given in percent, as a decimal string: 35 → '0.35'. */
function pct(percent: number): string {
  return fmt(percent / 100, 4);
}

/** A repeated independent trial with two outcomes, told as a short story. */
interface TrialStory {
  setup: (n: number, p: number) => string;
  /** What X counts (after 'מספר'). */
  counted: string;
  exactly: (k: number, n: number) => string;
  none: string;
  atLeastOne: string;
  atLeastTwo: string;
  /** Forced success probabilities (e.g. guessing among 4 or 5 answers). */
  pValues?: number[];
}

const TRIAL_STORIES: TrialStory[] = [
  {
    setup: (n, p) => String.raw`ההסתברות שמתאמן קולע לסל בזריקה בודדת היא $${fmt(p)}$, והזריקות בלתי תלויות זו בזו. המתאמן זורק $${n}$ זריקות.`,
    counted: 'הקליעות',
    exactly: (k, n) => String.raw`מה ההסתברות שבדיוק $${k}$ מתוך $${n}$ הזריקות יהיו קליעות?`,
    none: 'שהמתאמן לא יקלע באף זריקה',
    atLeastOne: 'שהמתאמן יקלע לפחות פעם אחת',
    atLeastTwo: 'שהמתאמן יקלע לפחות פעמיים',
  },
  {
    setup: (n, p) => String.raw`ההסתברות שמוצר שיוצא מפס ייצור הוא פגום היא $${fmt(p)}$, ללא תלות במוצרים האחרים. בוחרים באקראי $${n}$ מוצרים.`,
    counted: 'המוצרים הפגומים',
    exactly: (k) => String.raw`מה ההסתברות שבדיוק $${k}$ מהם פגומים?`,
    none: 'שאף אחד מהמוצרים אינו פגום',
    atLeastOne: 'שלפחות אחד מהמוצרים פגום',
    atLeastTwo: 'שלפחות שניים מהמוצרים פגומים',
  },
  {
    setup: (n, p) => String.raw`ההסתברות שהאוטובוס לבית הספר מאחר ביום מסוים היא $${fmt(p)}$, ללא תלות בימים אחרים. בוחנים $${n}$ ימי לימודים.`,
    counted: 'הימים שבהם האוטובוס מאחר',
    exactly: (k) => String.raw`מה ההסתברות שהאוטובוס יאחר בדיוק ב-$${k}$ מהימים?`,
    none: 'שהאוטובוס לא יאחר באף אחד מהימים',
    atLeastOne: 'שהאוטובוס יאחר לפחות ביום אחד',
    atLeastTwo: 'שהאוטובוס יאחר לפחות ביומיים',
  },
  {
    setup: (n, p) =>
      String.raw`במבחן אמריקאי יש $${n}$ שאלות, ולכל שאלה $${Math.round(1 / p)}$ תשובות אפשריות שרק אחת מהן נכונה. תלמיד עונה על כל השאלות בניחוש, באקראי ובאופן בלתי תלוי.`,
    counted: 'התשובות הנכונות',
    exactly: (k) => String.raw`מה ההסתברות שהתלמיד יענה נכון בדיוק על $${k}$ שאלות?`,
    none: 'שהתלמיד לא יענה נכון על אף שאלה',
    atLeastOne: 'שהתלמיד יענה נכון על שאלה אחת לפחות',
    atLeastTwo: 'שהתלמיד יענה נכון על שתי שאלות לפחות',
    pValues: [0.25, 0.2],
  },
];

const P_VALUES = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8];

function pickTrial(rng: Rng): { storyIndex: number; story: TrialStory; p: number } {
  const storyIndex = rng.int(0, TRIAL_STORIES.length - 1);
  const story = TRIAL_STORIES[storyIndex];
  const p = rng.pick(story.pValues ?? P_VALUES);
  return { storyIndex, story, p };
}

function successStep(story: TrialStory, n: number, p: number): string {
  const pTex = story.pValues ? String.raw`p=\frac{1}{${Math.round(1 / p)}}=${fmt(p)}` : `p=${fmt(p)}`;
  const why = story.pValues ? String.raw` (תשובה נכונה אחת מתוך $${Math.round(1 / p)}$)` : '';
  return String.raw`נסמן ב-$X$ את מספר ${story.counted}. יש $${n}$ חזרות בלתי תלויות על אותו ניסוי, עם הסתברות קבועה להצלחה $${pTex}$${why}, ולכן $X\sim B(${n},\,${fmt(p)})$.`;
}

// ---------- generators ----------

const binomialExact: ExerciseGenerator = {
  id: 'gen-prob-binomial-exact',
  lessonIds: ['prob-binomial'],
  title: 'נוסחת ברנולי: בדיוק k הצלחות',
  difficulty: 1,
  generate(rng) {
    const { storyIndex, story, p } = pickTrial(rng);
    const n = rng.int(4, 8);
    const q = Math.round((1 - p) * 100) / 100;
    let k = rng.int(1, n - 1);
    while (binomial(n, k) * p ** k * q ** (n - k) < 0.01) k = rng.int(1, n - 1);
    const c = binomial(n, k);
    const pk = p ** k;
    const qk = q ** (n - k);
    const value = c * pk * qk;
    return {
      statement: `${story.setup(n, p)} ${story.exactly(k, n)}`,
      hints: [
        String.raw`זו התפלגות בינומית: $${n}$ חזרות בלתי תלויות, ובכל אחת הסתברות ההצלחה היא $${fmt(p)}$.`,
        String.raw`נוסחת ברנולי: $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$. המקדם $\binom{${n}}{${k}}$ סופר את הסידורים של $${k}$ ההצלחות.`,
      ],
      solutionSteps: [
        successStep(story, n, p),
        String.raw`לפי נוסחת ברנולי: $P(X=${k})=\binom{${n}}{${k}}\cdot(${fmt(p)})^{${k}}\cdot(${fmt(q)})^{${n - k}}$.`,
        String.raw`$\binom{${n}}{${k}}=\frac{${n}!}{${k}!\cdot${n - k}!}=${c}$, $(${fmt(p)})^{${k}}${eq(pk, 6)}$, $(${fmt(q)})^{${n - k}}${eq(qk, 6)}$.`,
        String.raw`$P(X=${k})=${c}\cdot${fmt(pk, 6)}\cdot${fmt(qk, 6)}${eq(value)}$.`,
      ],
      finalAnswer: String.raw`$P(X=${k})${eq(value)}$`,
      answers: [probability(String.raw`$P(X=${k})$`, value)],
      data: { story: storyIndex, n, k, p },
    };
  },
};

const atLeastOne: ExerciseGenerator = {
  id: 'gen-prob-at-least-one',
  lessonIds: ['prob-binomial'],
  title: 'לפחות הצלחה אחת (מאורע משלים)',
  difficulty: 1,
  generate(rng) {
    const variant = rng.int(0, 1);
    const { storyIndex, story, p } = pickTrial(rng);
    const n = rng.int(3, 8);
    const q = Math.round((1 - p) * 100) / 100;
    const none = q ** n;
    const one = n * p * q ** (n - 1);
    const atLeast1 = 1 - none;
    const atLeast2 = 1 - none - one;
    const noneStep = String.raw`אף הצלחה: $P(X=0)=(${fmt(q)})^{${n}}${eq(none, 6)}$.`;
    const complementStep = String.raw`לפי המאורע המשלים: $P(X\ge1)=1-P(X=0)=1-(${fmt(q)})^{${n}}${eq(atLeast1)}$.`;
    if (variant === 0) {
      return {
        statement: String.raw`${story.setup(n, p)} א. מה ההסתברות ${story.none}? ב. מה ההסתברות ${story.atLeastOne}?`,
        hints: [
          String.raw`$X\sim B(${n},\,${fmt(p)})$. ״אף הצלחה״ פירושו $X=0$: כל הניסויים כישלונות.`,
          String.raw`״לפחות אחת״ הוא המשלים של ״אף אחת״: $P(X\ge1)=1-P(X=0)$.`,
        ],
        solutionSteps: [successStep(story, n, p), noneStep, complementStep],
        finalAnswer: String.raw`א. $P(X=0)${eq(none)}$. ב. $P(X\ge1)${eq(atLeast1)}$.`,
        answers: [probability('א. $P(X=0)$', none), probability(String.raw`ב. $P(X\ge1)$`, atLeast1)],
        data: { variant, story: storyIndex, n, p },
      };
    }
    return {
      statement: String.raw`${story.setup(n, p)} א. מה ההסתברות ${story.atLeastOne}? ב. מה ההסתברות ${story.atLeastTwo}?`,
      hints: [
        String.raw`$X\sim B(${n},\,${fmt(p)})$. עברו למשלים: $P(X\ge1)=1-P(X=0)$.`,
        String.raw`המשלים של ״לפחות שתיים״ הוא $X=0$ או $X=1$: $P(X\ge2)=1-P(X=0)-P(X=1)$.`,
      ],
      solutionSteps: [
        successStep(story, n, p),
        noneStep,
        complementStep,
        String.raw`$P(X=1)=\binom{${n}}{1}\cdot${fmt(p)}\cdot(${fmt(q)})^{${n - 1}}${eq(one, 6)}$.`,
        String.raw`$P(X\ge2)=1-P(X=0)-P(X=1)${eq(atLeast2)}$.`,
      ],
      finalAnswer: String.raw`א. $P(X\ge1)${eq(atLeast1)}$. ב. $P(X\ge2)${eq(atLeast2)}$.`,
      answers: [probability(String.raw`א. $P(X\ge1)$`, atLeast1), probability(String.raw`ב. $P(X\ge2)$`, atLeast2)],
      data: { variant, story: storyIndex, n, p },
    };
  },
};

const URN_COLORS = [
  { plural1: 'אדומים', single1: 'אדום', plural2: 'לבנים', single2: 'לבן' },
  { plural1: 'כחולים', single1: 'כחול', plural2: 'צהובים', single2: 'צהוב' },
  { plural1: 'ירוקים', single1: 'ירוק', plural2: 'שחורים', single2: 'שחור' },
];

const urnTwoDraws: ExerciseGenerator = {
  id: 'gen-prob-urn-two-draws',
  lessonIds: ['prob-tree-two', 'prob-basic'],
  title: 'שתי הוצאות מכד בלי החזרה',
  difficulty: 2,
  generate(rng) {
    const colorIndex = rng.int(0, URN_COLORS.length - 1);
    const colors = URN_COLORS[colorIndex];
    const r = rng.int(2, 7);
    const w = rng.int(2, 7);
    const total = r + w;
    const pairs = total * (total - 1);
    const both = (r * (r - 1)) / pairs;
    const different = (2 * r * w) / pairs;
    const second = (r * (r - 1) + w * r) / pairs;
    const tail = (num: number) => `${fracTex(num, pairs)}${eq(num / pairs)}`;
    return {
      statement: String.raw`בכד יש $${r}$ כדורים ${colors.plural1} ו-$${w}$ כדורים ${colors.plural2}. מוציאים מהכד באקראי כדור אחד, ואחר כך, בלי להחזיר אותו, מוציאים באקראי כדור נוסף. א. מה ההסתברות ששני הכדורים ${colors.plural1}? ב. מה ההסתברות שהכדורים בצבעים שונים? ג. מה ההסתברות שהכדור השני שהוצא ${colors.single1}?`,
      hints: [
        String.raw`שרטטו עץ דו-שלבי. בשלב השני נשארו בכד $${total - 1}$ כדורים, והרכבם תלוי במה שהוצא בשלב הראשון.`,
        String.raw`״צבעים שונים״ – שני מסלולים: ${colors.single1} ואז ${colors.single2}, או ${colors.single2} ואז ${colors.single1}.`,
        'בסעיף ג חברו את שני המסלולים שבהם הכדור השני הוא בצבע המבוקש (נוסחת ההסתברות השלמה).',
      ],
      solutionSteps: [
        String.raw`נסמן ב-$A_i$ את המאורע ״בהוצאה ה-$i$ יצא כדור ${colors.single1}״ וב-$B_i$ – ״יצא כדור ${colors.single2}״. בשלב הראשון $P(A_1)=\frac{${r}}{${total}}$, $P(B_1)=\frac{${w}}{${total}}$.`,
        String.raw`בשלב השני נשארו $${total - 1}$ כדורים: $P(A_2|A_1)=\frac{${r - 1}}{${total - 1}}$, $P(B_2|A_1)=\frac{${w}}{${total - 1}}$, $P(A_2|B_1)=\frac{${r}}{${total - 1}}$.`,
        String.raw`א. $P(A_1\cap A_2)=\frac{${r}}{${total}}\cdot\frac{${r - 1}}{${total - 1}}=${tail(r * (r - 1))}$.`,
        String.raw`ב. $P(A_1\cap B_2)+P(B_1\cap A_2)=\frac{${r}}{${total}}\cdot\frac{${w}}{${total - 1}}+\frac{${w}}{${total}}\cdot\frac{${r}}{${total - 1}}=${tail(2 * r * w)}$.`,
        String.raw`ג. $P(A_2)=P(A_1\cap A_2)+P(B_1\cap A_2)=${fracTex(r * (r - 1), pairs)}+${fracTex(w * r, pairs)}=${tail(r * (r - 1) + w * r)}$ – בדיוק כמו ההסתברות שהכדור הראשון ${colors.single1}, $\frac{${r}}{${total}}$.`,
      ],
      finalAnswer: String.raw`א. $${tail(r * (r - 1))}$. ב. $${tail(2 * r * w)}$. ג. $${tail(r * (r - 1) + w * r)}$.`,
      answers: [
        probability(`א. שני הכדורים ${colors.plural1}`, both),
        probability('ב. הכדורים בצבעים שונים', different),
        probability(`ג. הכדור השני ${colors.single1}`, second),
      ],
      data: { colors: colorIndex, r, w },
    };
  },
};

interface BayesStory {
  intro: (a: number, d1: number, d2: number) => string;
  first: string;
  second: string;
  firstLetter: string;
  secondLetter: string;
  question1: string;
  question2: string;
  shares: number[];
  rates1: number[];
  rates2: number[];
}

const BAYES_STORIES: BayesStory[] = [
  {
    intro: (a, d1, d2) =>
      String.raw`במפעל שתי מכונות, A ו-B. מכונה A מייצרת $${a}\%$ מהמוצרים, ומכונה B מייצרת את השאר. $${d1}\%$ מהמוצרים של מכונה A פגומים, ו-$${d2}\%$ מהמוצרים של מכונה B פגומים. בוחרים באקראי מוצר אחד מכלל המוצרים.`,
    first: 'המוצר יוצר במכונה A',
    second: 'המוצר פגום',
    firstLetter: 'A',
    secondLetter: 'D',
    question1: 'מה ההסתברות שהמוצר פגום?',
    question2: 'ידוע שהמוצר שנבחר פגום. מה ההסתברות שהוא יוצר במכונה A?',
    shares: [20, 25, 30, 35, 40, 45, 55, 60, 65, 70, 75, 80],
    rates1: [2, 3, 4, 5, 6, 8, 10],
    rates2: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    intro: (a, d1, d2) =>
      String.raw`$${a}\%$ מהאוכלוסייה נושאים נגיף מסוים. בדיקה לגילוי הנגיף מחזירה תוצאה חיובית אצל $${d1}\%$ מנושאי הנגיף, וגם אצל $${d2}\%$ מאלה שאינם נושאים אותו. בוחרים באקראי אדם ובודקים אותו.`,
    first: 'האדם נושא את הנגיף',
    second: 'תוצאת הבדיקה חיובית',
    firstLetter: 'V',
    secondLetter: 'T',
    question1: 'מה ההסתברות שתוצאת הבדיקה חיובית?',
    question2: 'ידוע שתוצאת הבדיקה חיובית. מה ההסתברות שהאדם אכן נושא את הנגיף?',
    shares: [2, 4, 5, 8, 10, 15, 20],
    rates1: [80, 85, 90, 95, 98],
    rates2: [2, 3, 5, 8, 10, 15],
  },
  {
    intro: (a, d1, d2) =>
      String.raw`בבית ספר $${a}\%$ מהתלמידים לומדים במגמה הריאלית והשאר במגמה ההומנית. $${d1}\%$ מתלמידי המגמה הריאלית משתתפים בחוג רובוטיקה, ו-$${d2}\%$ מתלמידי המגמה ההומנית משתתפים בו. בוחרים באקראי תלמיד מבית הספר.`,
    first: 'התלמיד לומד במגמה הריאלית',
    second: 'התלמיד משתתף בחוג הרובוטיקה',
    firstLetter: 'R',
    secondLetter: 'C',
    question1: 'מה ההסתברות שהתלמיד משתתף בחוג הרובוטיקה?',
    question2: 'ידוע שהתלמיד שנבחר משתתף בחוג הרובוטיקה. מה ההסתברות שהוא לומד במגמה הריאלית?',
    shares: [30, 35, 40, 45, 50, 55, 60, 65, 70],
    rates1: [15, 20, 25, 30, 35, 40, 45],
    rates2: [5, 8, 10, 12, 15],
  },
];

const bayesTree: ExerciseGenerator = {
  id: 'gen-prob-bayes-tree',
  lessonIds: ['prob-tree-two', 'prob-dependence'],
  title: 'עץ דו-שלבי, הסתברות שלמה ונוסחת בייס',
  difficulty: 2,
  generate(rng) {
    const storyIndex = rng.int(0, BAYES_STORIES.length - 1);
    const story = BAYES_STORIES[storyIndex];
    const a = rng.pick(story.shares);
    const d1 = rng.pick(story.rates1);
    let d2 = rng.pick(story.rates2);
    if (d2 === d1) d2 = story.rates2.find((value) => value !== d1)!;
    // counts per 10 000 individuals keep every product exact
    const both = a * d1;
    const other = (100 - a) * d2;
    const total = both + other;
    const pTotal = total / 10000;
    const posterior = both / total;
    const F = story.firstLetter;
    const D = story.secondLetter;
    return {
      statement: String.raw`${story.intro(a, d1, d2)} א. ${story.question1} ב. ${story.question2}`,
      hints: [
        String.raw`בנו עץ: בשלב הראשון $${F}$ או $\bar{${F}}$, ובשלב השני $${D}$ או $\bar{${D}}$. האחוזים בשלב השני הם הסתברויות מותנות.`,
        String.raw`סעיף א: נוסחת ההסתברות השלמה – סכום שני המסלולים שמסתיימים ב-$${D}$.`,
        String.raw`סעיף ב: נוסחת בייס, $P(${F}|${D})=\frac{P(${F}\cap ${D})}{P(${D})}$.`,
      ],
      solutionSteps: [
        String.raw`נסמן: $${F}$ – ${story.first}, $${D}$ – ${story.second}. נתון: $P(${F})=${pct(a)}$, $P(\bar{${F}})=${pct(100 - a)}$, $P(${D}|${F})=${pct(d1)}$, $P(${D}|\bar{${F}})=${pct(d2)}$.`,
        String.raw`א. לפי נוסחת ההסתברות השלמה (שני המסלולים בעץ שמסתיימים ב-$${D}$): $P(${D})=${pct(a)}\cdot${pct(d1)}+${pct(100 - a)}\cdot${pct(d2)}=${fmt(both / 10000, 4)}+${fmt(other / 10000, 4)}=${fmt(pTotal, 4)}$.`,
        String.raw`ב. לפי נוסחת בייס: $P(${F}|${D})=\frac{P(${F}\cap ${D})}{P(${D})}=\frac{${fmt(both / 10000, 4)}}{${fmt(pTotal, 4)}}${eq(posterior)}$.`,
        String.raw`שימו לב: $P(${F}|${D})\ne P(${F})=${pct(a)}$, ולכן המאורעות $${F}$ ו-$${D}$ תלויים.`,
      ],
      finalAnswer: String.raw`א. $P(${D})=${fmt(pTotal, 4)}$. ב. $P(${F}|${D})${eq(posterior)}$.`,
      answers: [probability(String.raw`א. $P(${D})$`, pTotal), probability(String.raw`ב. $P(${F}|${D})$`, posterior)],
      data: { story: storyIndex, a, d1, d2 },
    };
  },
};

const unionComplement: ExerciseGenerator = {
  id: 'gen-prob-union-complement',
  lessonIds: ['prob-laws'],
  title: 'איחוד, חיתוך ומשלים',
  difficulty: 1,
  generate(rng) {
    const variant = rng.int(0, 1);
    const story = rng.int(0, 1);
    let pA = 0;
    let pB = 0;
    let pAB = 0;
    do {
      pA = 5 * rng.int(4, 14);
      pB = 5 * rng.int(3, 13);
      pAB = 5 * rng.int(1, Math.min(pA, pB) / 5 - 1);
    } while (pA + pB - pAB > 95);
    const union = pA + pB - pAB;
    const neither = 100 - union;
    const onlyA = pA - pAB;
    const onlyB = pB - pAB;
    const [A, B, AB, U] = [pct(pA), pct(pB), pct(pAB), pct(union)];
    const storyIntro =
      story === 0
        ? 'נתונים שני מאורעות $A$ ו-$B$ במרחב הסתברות.'
        : 'בבית ספר נערך סקר על החוגים שהתלמידים משתתפים בהם. בוחרים באקראי תלמיד; $A$ – המאורע ״התלמיד משתתף בחוג שחמט״, $B$ – ״התלמיד משתתף בחוג מחול״.';
    if (variant === 0) {
      const questions =
        story === 0
          ? String.raw`חשבו את $P(A\cup B)$, את $P(\bar A\cap\bar B)$ ואת $P(A\cap\bar B)$.`
          : String.raw`מה ההסתברות שהתלמיד משתתף לפחות באחד החוגים, $P(A\cup B)$? מה ההסתברות שאינו משתתף באף אחד מהם, $P(\bar A\cap\bar B)$? ומה ההסתברות שהוא משתתף בחוג שחמט בלבד, $P(A\cap\bar B)$?`;
      return {
        statement: String.raw`${storyIntro} נתון: $P(A)=${A}$, $P(B)=${B}$, $P(A\cap B)=${AB}$. ${questions}`,
        hints: [
          String.raw`נוסחת האיחוד: $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.`,
          String.raw`$\bar A\cap\bar B$ הוא המשלים של $A\cup B$. ו-$A\cap\bar B$ הוא החלק של $A$ שמחוץ ל-$B$.`,
        ],
        solutionSteps: [
          String.raw`$P(A\cup B)=P(A)+P(B)-P(A\cap B)=${A}+${B}-${AB}=${U}$.`,
          String.raw`$\bar A\cap\bar B$ הוא המשלים של ״לפחות אחד מהמאורעות״: $P(\bar A\cap\bar B)=1-P(A\cup B)=1-${U}=${pct(neither)}$.`,
          String.raw`$A$ מתחלק לחלק המשותף עם $B$ ולחלק שמחוצה לו: $P(A\cap\bar B)=P(A)-P(A\cap B)=${A}-${AB}=${pct(onlyA)}$.`,
        ],
        finalAnswer: String.raw`$P(A\cup B)=${U}$, $P(\bar A\cap\bar B)=${pct(neither)}$, $P(A\cap\bar B)=${pct(onlyA)}$.`,
        answers: [probability(String.raw`$P(A\cup B)$`, union / 100), probability(String.raw`$P(\bar A\cap\bar B)$`, neither / 100), probability(String.raw`$P(A\cap\bar B)$`, onlyA / 100)],
        data: { variant, story, pA, pB, pAB, pUnion: union },
      };
    }
    const questions =
      story === 0
        ? String.raw`חשבו את $P(A\cap B)$, את $P(\bar A\cap B)$ ואת $P(\bar A\cap\bar B)$.`
        : String.raw`מה ההסתברות שהתלמיד משתתף בשני החוגים, $P(A\cap B)$? מה ההסתברות שהוא משתתף בחוג מחול בלבד, $P(\bar A\cap B)$? ומה ההסתברות שאינו משתתף באף אחד מהם, $P(\bar A\cap\bar B)$?`;
    return {
      statement: String.raw`${storyIntro} נתון: $P(A)=${A}$, $P(B)=${B}$, $P(A\cup B)=${U}$. ${questions}`,
      hints: [String.raw`בודדו את $P(A\cap B)$ מנוסחת האיחוד $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.`, String.raw`$P(\bar A\cap B)=P(B)-P(A\cap B)$, ו-$\bar A\cap\bar B$ הוא המשלים של $A\cup B$.`],
      solutionSteps: [
        String.raw`מנוסחת האיחוד: $P(A\cap B)=P(A)+P(B)-P(A\cup B)=${A}+${B}-${U}=${AB}$.`,
        String.raw`$P(\bar A\cap B)=P(B)-P(A\cap B)=${B}-${AB}=${pct(onlyB)}$.`,
        String.raw`$P(\bar A\cap\bar B)=1-P(A\cup B)=1-${U}=${pct(neither)}$.`,
      ],
      finalAnswer: String.raw`$P(A\cap B)=${AB}$, $P(\bar A\cap B)=${pct(onlyB)}$, $P(\bar A\cap\bar B)=${pct(neither)}$.`,
      answers: [probability(String.raw`$P(A\cap B)$`, pAB / 100), probability(String.raw`$P(\bar A\cap B)$`, onlyB / 100), probability(String.raw`$P(\bar A\cap\bar B)$`, neither / 100)],
      data: { variant, story, pA, pB, pAB, pUnion: union },
    };
  },
};

const TABLE_STORIES = [
  {
    intro: 'בשכבה של תלמידים נשאל כל תלמיד לאן הוא מעדיף לצאת לטיול השנתי.',
    a: 'התלמיד שנבחר הוא בת',
    b: 'התלמיד העדיף טיול בצפון',
    unit: 'תלמידים',
    chosen: 'בוחרים באקראי תלמיד מהשכבה.',
  },
  {
    intro: 'בסקר בקרב עובדי חברה נבדק מי מגיע לעבודה בתחבורה ציבורית.',
    a: 'העובד מעל גיל 40',
    b: 'העובד מגיע לעבודה בתחבורה ציבורית',
    unit: 'עובדים',
    chosen: 'בוחרים באקראי עובד אחד.',
  },
  {
    intro: 'במפעל נבדקו מוצרים משתי משמרות, וכל מוצר עבר בקרת איכות או נפסל.',
    a: 'המוצר יוצר במשמרת הבוקר',
    b: 'המוצר עבר את בקרת האיכות',
    unit: 'מוצרים',
    chosen: 'בוחרים באקראי מוצר אחד.',
  },
];

const twoWayTable: ExerciseGenerator = {
  id: 'gen-prob-table-conditional',
  lessonIds: ['prob-table', 'prob-dependence'],
  title: 'הסתברות מותנית מטבלה דו-ממדית',
  difficulty: 1,
  generate(rng) {
    const storyIndex = rng.int(0, TABLE_STORIES.length - 1);
    const story = TABLE_STORIES[storyIndex];
    const n11 = rng.int(6, 45);
    const n12 = rng.int(6, 45);
    const n21 = rng.int(6, 45);
    const n22 = rng.int(6, 45);
    const total = n11 + n12 + n21 + n22;
    const nA = n11 + n12;
    const nB = n11 + n21;
    const nNotA = n21 + n22;
    const pA = nA / total;
    const pAgivenB = n11 / nB;
    const pBgivenNotA = n21 / nNotA;
    const table = String.raw`$$\begin{array}{c|c|c} & B & \bar{B} \\ \hline A & ${n11} & ${n12} \\ \hline \bar{A} & ${n21} & ${n22} \end{array}$$`;
    return {
      statement: String.raw`${story.intro} מספרי ה${story.unit} מסוכמים בטבלה שלפניכם, כאשר $A$ – ${story.a}, ו-$B$ – ${story.b}:

${table}

${story.chosen} א. חשבו את $P(A)$. ב. חשבו את $P(A|B)$. ג. חשבו את $P(B|\bar A)$.`,
      hints: [
        'חשבו קודם את סכומי השורות והעמודות ואת המספר הכולל.',
        String.raw`בהסתברות מותנית המרחב מצטמצם למאורע הידוע: $P(A|B)=\frac{|A\cap B|}{|B|}$ – מתוך עמודת $B$ בלבד.`,
      ],
      solutionSteps: [
        String.raw`א. סך הכול: $${n11}+${n12}+${n21}+${n22}=${total}$. בשורת $A$ יש $${n11}+${n12}=${nA}$, ולכן $P(A)=\frac{${nA}}{${total}}${eq(pA)}$.`,
        String.raw`ב. ידוע ש-$B$ קרה, לכן המרחב מצטמצם לעמודת $B$: $${n11}+${n21}=${nB}$, ומתוכם $${n11}$ ב-$A$. $P(A|B)=\frac{${n11}}{${nB}}${eq(pAgivenB)}$.`,
        String.raw`ג. ידוע ש-$\bar A$ קרה – שורת $\bar A$: $${n21}+${n22}=${nNotA}$, ומתוכם $${n21}$ ב-$B$. $P(B|\bar A)=\frac{${n21}}{${nNotA}}${eq(pBgivenNotA)}$.`,
      ],
      finalAnswer: String.raw`א. $${fracTex(nA, total)}${eq(pA)}$. ב. $${fracTex(n11, nB)}${eq(pAgivenB)}$. ג. $${fracTex(n21, nNotA)}${eq(pBgivenNotA)}$.`,
      answers: [probability('א. $P(A)$', pA), probability('ב. $P(A|B)$', pAgivenB), probability(String.raw`ג. $P(B|\bar A)$`, pBgivenNotA)],
      data: { story: storyIndex, n11, n12, n21, n22 },
    };
  },
};

export const probabilityGenerators: ExerciseGenerator[] = [binomialExact, atLeastOne, urnTwoDraws, bayesTree, unionComplement, twoWayTable];
