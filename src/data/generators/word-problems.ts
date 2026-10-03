/**
 * "תרגול אינסופי" – בעיות מילוליות (שאלון 35581, שאלה 1): בעיות תנועה (נשארו במפורש במיקוד)
 * ובעיות אחוזים. המהירויות והזמנים נבחרים כך שהתשובות יוצאות במספרים "של בגרות".
 */
import type { NumericAnswer } from '../lessons/types';
import { fmt, fracTex, gcd } from './helpers';
import type { ExerciseGenerator } from './types';

// ---------- local helpers ----------

/** Integers and short decimals are typed exactly; other values keep the default tolerance. */
function answer(label: string, value: number): NumericAnswer {
  const short = Math.abs(value * 100 - Math.round(value * 100)) < 1e-7;
  return short ? { label, value, tolerance: 0.006 } : { label, value };
}

/** Money: accept the value rounded to 2 decimals (the 0.5% default would allow several shekels). */
function money(label: string, value: number): NumericAnswer {
  return { label, value, tolerance: 0.01 };
}

/** '= 2.5' when exact to `digits` decimals, otherwise '\approx 2.33'. */
function eq(value: number, digits = 2): string {
  return Math.abs(value - Number(value.toFixed(digits))) < 1e-9 ? `= ${fmt(value, digits)}` : `\\approx ${fmt(value, digits)}`;
}

/** Hours from minutes as KaTeX: 30 → '0.5', 40 → '\frac{2}{3}'. */
function hoursTex(minutes: number): string {
  const hours = minutes / 60;
  return Math.abs(hours * 100 - Math.round(hours * 100)) < 1e-9 ? fmt(hours) : fracTex(minutes, 60);
}

/** 'שעה' after the number 1, 'שעות' otherwise. */
function hourWord(value: number): string {
  return value === 1 ? 'שעה' : 'שעות';
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

// ---------- generators ----------

const meeting: ExerciseGenerator = {
  id: 'gen-word-meeting',
  lessonIds: ['word-motion', 'word-motion-practice'],
  title: 'תנועה זה לקראת זה: זמן ומקום הפגישה',
  difficulty: 1,
  generate(rng) {
    const variant = rng.int(0, 1);
    const v1 = rng.pick([50, 60, 70, 80, 90]);
    const v2 = rng.pick([40, 50, 60, 70, 80]);
    const delayMinutes = variant === 1 ? rng.pick([30, 60]) : 0;
    const h = delayMinutes / 60;
    const t = rng.pick([1, 1.5, 2, 2.5, 3]);
    const distance = v1 * h + (v1 + v2) * t;
    const meet = h + t;
    const fromA = v1 * meet;
    const truck = v2 * t;
    if (variant === 0) {
      return {
        statement: String.raw`המרחק בין עיר A לעיר B הוא $${distance}$ ק״מ. מכונית יצאה מעיר A לכיוון עיר B במהירות קבועה של $${v1}$ קמ״ש, ובאותו רגע יצאה משאית מעיר B לכיוון עיר A במהירות קבועה של $${v2}$ קמ״ש. כעבור כמה שעות ייפגשו המכונית והמשאית, ובאיזה מרחק מעיר A?`,
        hints: [
          String.raw`סמנו ב-$t$ את הזמן עד הפגישה. שני כלי הרכב נוסעים אותו זמן, כי יצאו יחד.`,
          String.raw`בתנועה זה לקראת זה, עד הפגישה סכום הדרכים שווה למרחק בין הערים.`,
        ],
        solutionSteps: [
          String.raw`נסמן ב-$t$ את הזמן (בשעות) מהיציאה ועד הפגישה. עד הפגישה המכונית עוברת $${v1}t$ ק״מ והמשאית $${v2}t$ ק״מ.`,
          String.raw`סכום הדרכים שווה למרחק בין הערים: $${v1}t+${v2}t=${distance}$, כלומר $${v1 + v2}t=${distance}$ ו-$t=${fmt(t)}$ ${hourWord(t)}.`,
          String.raw`המרחק מעיר A הוא הדרך שעברה המכונית: $${v1}\cdot${fmt(t)}=${fmt(fromA)}$ ק״מ. בדיקה: המשאית עברה $${v2}\cdot${fmt(t)}=${fmt(truck)}$ ק״מ, ו-$${fmt(fromA)}+${fmt(truck)}=${distance}$.`,
        ],
        finalAnswer: String.raw`הפגישה כעבור $${fmt(t)}$ ${hourWord(t)}, במרחק $${fmt(fromA)}$ ק״מ מעיר A.`,
        answers: [answer('זמן הפגישה (שעות)', meet), answer('המרחק מעיר A (ק״מ)', fromA)],
        data: { variant, distance, v1, v2, delay: h },
      };
    }
    const hTex = fmt(h);
    return {
      statement: String.raw`המרחק בין עיר A לעיר B הוא $${distance}$ ק״מ. מכונית יצאה מעיר A לכיוון עיר B במהירות קבועה של $${v1}$ קמ״ש. כעבור ${delayMinutes === 60 ? 'שעה' : `$${delayMinutes}$ דקות`} יצאה משאית מעיר B לכיוון עיר A במהירות קבועה של $${v2}$ קמ״ש. כעבור כמה שעות מרגע יציאת המכונית ייפגשו המכונית והמשאית, ובאיזה מרחק מעיר A?`,
      hints: [
        String.raw`עד יציאת המשאית המכונית נוסעת לבד ${delayMinutes === 60 ? 'שעה אחת' : 'חצי שעה'}. סמנו ב-$t$ את זמן הנסיעה של המשאית עד הפגישה; המכונית נוסעת $t+${hTex}$ שעות.`,
        'סכום הדרכים של שני כלי הרכב עד הפגישה שווה למרחק בין הערים.',
      ],
      solutionSteps: [
        String.raw`${delayMinutes === 60 ? 'ההפרש בין היציאות הוא שעה אחת' : `$${delayMinutes}$ דקות הן $${hTex}$ שעה`}. נסמן ב-$t$ את זמן הנסיעה של המשאית עד הפגישה (בשעות); המכונית נוסעת עד הפגישה $t+${hTex}$ שעות.`,
        String.raw`סכום הדרכים עד הפגישה: $${v1}\left(t+${hTex}\right)+${v2}t=${distance}$, כלומר $${v1 + v2}t=${distance - v1 * h}$ ו-$t=${fmt(t)}$.`,
        String.raw`הפגישה מתרחשת $${fmt(t)}+${hTex}=${fmt(meet)}$ ${hourWord(meet)} אחרי יציאת המכונית, במרחק $${v1}\cdot${fmt(meet)}=${fmt(fromA)}$ ק״מ מעיר A. בדיקה: המשאית עברה $${v2}\cdot${fmt(t)}=${fmt(truck)}$ ק״מ, ו-$${fmt(fromA)}+${fmt(truck)}=${distance}$.`,
      ],
      finalAnswer: String.raw`הפגישה כעבור $${fmt(meet)}$ ${hourWord(meet)} מיציאת המכונית, במרחק $${fmt(fromA)}$ ק״מ מעיר A.`,
      answers: [answer('זמן הפגישה (שעות מיציאת המכונית)', meet), answer('המרחק מעיר A (ק״מ)', fromA)],
      data: { variant, distance, v1, v2, delay: h },
    };
  },
};

const ROUND_TRIP_SPEEDS: Array<[number, number]> = [
  [40, 60],
  [60, 40],
  [45, 60],
  [60, 90],
  [90, 60],
  [50, 75],
  [80, 120],
  [60, 80],
  [80, 60],
  [30, 45],
  [40, 50],
  [75, 100],
];

const averageSpeed: ExerciseGenerator = {
  id: 'gen-word-average-speed',
  lessonIds: ['word-motion'],
  title: 'מהירות ממוצעת',
  difficulty: 1,
  generate(rng) {
    const variant = rng.int(0, 1);
    let v1: number;
    let v2: number;
    let d1: number;
    let d2: number;
    let statement: string;
    if (variant === 0) {
      [v1, v2] = rng.pick(ROUND_TRIP_SPEEDS);
      d1 = (lcm(v1, v2) * rng.pick([1, 2])) / 2;
      d2 = d1;
      statement = String.raw`מכונית נסעה מעיר A לעיר B, המרוחקות זו מזו $${d1}$ ק״מ, במהירות קבועה של $${v1}$ קמ״ש, וחזרה באותה דרך מ-B ל-A במהירות קבועה של $${v2}$ קמ״ש. כמה זמן נמשכה כל הנסיעה (הלוך וחזור), ומה הייתה המהירות הממוצעת של המכונית בכל הנסיעה?`;
    } else {
      v1 = rng.pick([50, 60, 70, 80, 90, 100]);
      v2 = rng.pick([40, 50, 60, 70, 80, 90].filter((v) => v !== v1));
      d1 = v1 * rng.pick([1, 1.5, 2, 2.5]);
      d2 = v2 * rng.pick([0.5, 1, 1.5, 2]);
      statement = String.raw`מכונית נסעה $${d1}$ ק״מ במהירות קבועה של $${v1}$ קמ״ש, ומיד אחר כך נסעה עוד $${d2}$ ק״מ במהירות קבועה של $${v2}$ קמ״ש. כמה זמן נמשכה כל הנסיעה, ומה הייתה המהירות הממוצעת של המכונית בכל הנסיעה?`;
    }
    const t1 = d1 / v1;
    const t2 = d2 / v2;
    const totalTime = t1 + t2;
    const totalDistance = d1 + d2;
    const average = totalDistance / totalTime;
    const mean = (v1 + v2) / 2;
    const meanRemark =
      t1 === t2
        ? String.raw` (כאן זמני שני הקטעים שווים, ולכן במקרה זה המהירות הממוצעת שווה לממוצע המהירויות)`
        : String.raw` (ולא $\frac{${v1}+${v2}}{2}=${fmt(mean)}$)`;
    return {
      statement,
      hints: [
        String.raw`חשבו את זמן כל קטע לפי $t=\frac{s}{v}$.`,
        String.raw`מהירות ממוצעת = הדרך הכוללת חלקי הזמן הכולל – לא הממוצע של שתי המהירויות.`,
      ],
      solutionSteps: [
        String.raw`זמן הקטע הראשון: $t_1=\frac{${d1}}{${v1}}=${fmt(t1)}$ ${hourWord(t1)}; זמן הקטע השני: $t_2=\frac{${d2}}{${v2}}=${fmt(t2)}$ ${hourWord(t2)}.`,
        String.raw`הזמן הכולל: $${fmt(t1)}+${fmt(t2)}=${fmt(totalTime)}$ ${hourWord(totalTime)}, והדרך הכוללת: $${d1}+${d2}=${totalDistance}$ ק״מ.`,
        String.raw`המהירות הממוצעת: $\bar v=\frac{s_1+s_2}{t_1+t_2}=\frac{${totalDistance}}{${fmt(totalTime)}}${eq(average)}$ קמ״ש${meanRemark}.`,
      ],
      finalAnswer: String.raw`הנסיעה נמשכה $${fmt(totalTime)}$ ${hourWord(totalTime)}; המהירות הממוצעת $${eq(average).replace('= ', '')}$ קמ״ש.`,
      answers: [answer('הזמן הכולל (שעות)', totalTime), answer('המהירות הממוצעת (קמ״ש)', average)],
      data: { variant, d1, v1, d2, v2 },
    };
  },
};

/** Both vehicles of a story share the grammatical gender, so one set of verb forms serves both. */
const OVERTAKE_STORIES = [
  {
    slow: 'משאית',
    fast: 'מכונית',
    slowDef: 'המשאית',
    fastDef: 'המכונית',
    speeds: [40, 45, 50, 60, 70],
    minFast: 60,
    maxFast: 120,
    words: { left: 'יצאה', rode: 'נסעה', rides: 'נוסעת', passed: 'עברה', catches: 'תשיג', caught: 'השיגה', departure: 'יציאתה', speed: 'מהירותה' },
  },
  {
    slow: 'רוכב אופניים',
    fast: 'רוכב אופנוע',
    slowDef: 'רוכב האופניים',
    fastDef: 'רוכב האופנוע',
    speeds: [12, 15, 16, 18, 20, 24],
    minFast: 30,
    maxFast: 90,
    words: { left: 'יצא', rode: 'נסע', rides: 'נוסע', passed: 'עבר', catches: 'ישיג', caught: 'השיג', departure: 'יציאתו', speed: 'מהירותו' },
  },
];

const overtake: ExerciseGenerator = {
  id: 'gen-word-overtake',
  lessonIds: ['word-motion-advanced', 'word-motion-practice'],
  title: 'השגה עם יציאה מאוחרת',
  difficulty: 2,
  generate(rng) {
    const variant = rng.int(0, 1);
    const storyIndex = rng.int(0, OVERTAKE_STORIES.length - 1);
    const story = OVERTAKE_STORIES[storyIndex];
    let v1 = 0;
    let delayMinutes = 0;
    let t = 0;
    let v2 = 0;
    for (let attempt = 0; ; attempt += 1) {
      v1 = rng.pick(story.speeds);
      delayMinutes = rng.pick([20, 30, 40, 45, 60, 90]);
      t = rng.pick([0.5, 1, 1.5, 2, 2.5, 3]);
      v2 = v1 * (1 + delayMinutes / 60 / t);
      const headStart = (v1 * delayMinutes) / 60;
      const ok = Math.abs(v2 - Math.round(v2)) < 1e-9 && v2 >= story.minFast && v2 <= story.maxFast && Math.abs(headStart * 2 - Math.round(headStart * 2)) < 1e-9;
      if (ok) break;
      if (attempt > 200) {
        // fallback that satisfies every constraint of both stories: delay of one hour, caught half an hour later
        v1 = story.speeds[0];
        delayMinutes = 60;
        t = 0.5;
        v2 = 3 * v1;
        break;
      }
    }
    v2 = Math.round(v2);
    const h = delayMinutes / 60;
    const hTex = hoursTex(delayMinutes);
    const headStart = v1 * h;
    const distance = v2 * t;
    const w = story.words;
    const delayText = delayMinutes === 60 ? 'שעה' : `$${delayMinutes}$ דקות`;
    const conversion = delayMinutes === 60 ? 'ההפרש בין היציאות הוא שעה אחת' : String.raw`$${delayMinutes}$ דקות הן $${hTex}$ שעה`;
    const setupSteps = [
      String.raw`${conversion}. נסמן ב-$t$ את זמן הנסיעה של ${story.fastDef} עד ההשגה (בשעות); ${story.slowDef} ${w.rode} עד אז $t+${hTex}$ שעות.`,
    ];
    if (variant === 0) {
      return {
        statement: String.raw`${story.slow} ${w.left} מעיר A במהירות קבועה של $${v1}$ קמ״ש. כעבור ${delayText} ${w.left} ${story.fast} מאותה עיר, באותה דרך ובאותו כיוון, במהירות קבועה של $${v2}$ קמ״ש. כעבור כמה שעות מרגע ${w.departure} ${w.catches} ${story.fastDef} את ${story.slowDef}, ובאיזה מרחק מעיר A?`,
        hints: [
          String.raw`סמנו ב-$t$ את זמן הנסיעה של ${story.fastDef}. ${story.slowDef} ${w.rides} ${delayMinutes === 60 ? 'שעה אחת' : `$${hTex}$ שעות`} יותר.`,
          'ברגע ההשגה שניהם נמצאים באותה נקודה, כלומר עברו מהעיר A את אותה דרך.',
        ],
        solutionSteps: [
          ...setupSteps,
          String.raw`ברגע ההשגה הדרכים שוות: $${v1}\left(t+${hTex}\right)=${v2}t$, כלומר $${fmt(headStart)}=${v2 - v1}t$ ו-$t=${fmt(t)}$ ${hourWord(t)}.`,
          String.raw`המרחק מעיר A: $${v2}\cdot${fmt(t)}=${fmt(distance)}$ ק״מ (בדיקה: $${v1}\left(${fmt(t)}+${hTex}\right)=${fmt(distance)}$).`,
        ],
        finalAnswer: String.raw`ההשגה כעבור $${fmt(t)}$ ${hourWord(t)}, במרחק $${fmt(distance)}$ ק״מ מעיר A.`,
        answers: [answer(`זמן ההשגה (שעות מיציאת ${story.fastDef})`, t), answer('המרחק מעיר A (ק״מ)', distance)],
        data: { variant, story: storyIndex, v1, v2, delay: h, t },
      };
    }
    return {
      statement: String.raw`${story.slow} ${w.left} מעיר A במהירות קבועה של $${v1}$ קמ״ש. כעבור ${delayText} ${w.left} ${story.fast} מאותה עיר, באותה דרך ובאותו כיוון, במהירות קבועה, ו${w.caught} את ${story.slowDef} $${fmt(t)}$ ${hourWord(t)} אחרי ${w.departure}. מצאו את מהירות ${story.fastDef} ואת המרחק מעיר A שבו התרחשה ההשגה.`,
      hints: [
        String.raw`עד ההשגה ${story.fastDef} ${w.rode} $${fmt(t)}$ ${hourWord(t)}, ו${story.slowDef} – $${fmt(t)}+${hTex}$ שעות.`,
        String.raw`שניהם עברו אותה דרך: מהדרך של ${story.slowDef} מקבלים את המרחק, ואז $v=\frac{s}{t}$.`,
      ],
      solutionSteps: [
        String.raw`${conversion}. עד ההשגה ${story.slowDef} ${w.rode} $${fmt(t)}+${hTex}$ שעות, ו${story.fastDef} – $${fmt(t)}$ ${hourWord(t)}.`,
        String.raw`הדרך של ${story.slowDef} עד ההשגה: $${v1}\left(${fmt(t)}+${hTex}\right)=${fmt(distance)}$ ק״מ – זה גם המרחק מעיר A.`,
        String.raw`${story.fastDef} ${w.passed} את אותה דרך ב-$${fmt(t)}$ ${hourWord(t)}, ולכן ${w.speed} $v=\frac{${fmt(distance)}}{${fmt(t)}}=${v2}$ קמ״ש.`,
      ],
      finalAnswer: String.raw`מהירות ${story.fastDef} $${v2}$ קמ״ש; ההשגה במרחק $${fmt(distance)}$ ק״מ מעיר A.`,
      answers: [answer(`מהירות ${story.fastDef} (קמ״ש)`, v2), answer('המרחק מעיר A (ק״מ)', distance)],
      data: { variant, story: storyIndex, v1, v2, delay: h, t },
    };
  },
};

const PRICE_ITEMS = ['מעיל', 'טלפון נייד', 'זוג נעליים', 'מכונת קפה'];

const percentChanges: ExerciseGenerator = {
  id: 'gen-word-percent-changes',
  lessonIds: ['word-percentages'],
  title: 'שינויים באחוזים בזה אחר זה',
  difficulty: 2,
  generate(rng) {
    const variant = rng.int(0, 2);
    if (variant === 1) {
      const up = rng.next() < 0.5;
      const start = up ? rng.pick([800, 1000, 1200, 1500, 2000]) : rng.pick([80, 100, 120, 150]);
      const p = up ? rng.pick([2, 4, 5, 10]) : rng.pick([10, 12, 15, 20]);
      const years = rng.int(2, 4);
      const factor = up ? 1 + p / 100 : 1 - p / 100;
      let value = start;
      for (let i = 0; i < years; i += 1) value = Number((value * factor).toFixed(10));
      const change = ((value - start) / start) * 100;
      const what = up ? 'דירה' : 'מכונית';
      return {
        statement: String.raw`ערכה של ${what} היה $${start}$ אלף ש״ח. בכל שנה ${up ? 'עלה' : 'ירד'} ערכה ב-$${p}\%$ ביחס לערכה בשנה הקודמת. מה יהיה ערכה כעבור $${years}$ שנים (באלפי ש״ח), ובכמה אחוזים ${up ? 'יעלה' : 'ירד'} ערכה בסך הכול?`,
        hints: [
          String.raw`${up ? 'עלייה' : 'ירידה'} ב-$${p}\%$ היא כפל ב-$${fmt(factor)}$, והשינוי של כל שנה מחושב מהערך של השנה הקודמת.`,
          String.raw`אחרי $${years}$ שנים הערך הוא $${start}\cdot${fmt(factor)}^{${years}}$. אחוז השינוי מחושב ביחס לערך ההתחלתי.`,
        ],
        solutionSteps: [
          String.raw`בכל שנה הערך מוכפל ב-$1${up ? '+' : '-'}\frac{${p}}{100}=${fmt(factor)}$, ולכן אחרי $${years}$ שנים: $${start}\cdot${fmt(factor)}^{${years}}${eq(value)}$ אלף ש״ח.`,
          String.raw`אחוז השינוי: $\frac{${fmt(value, 2)}-${start}}{${start}}\cdot100\%${eq(change)}\%$ (או ישירות: $\left(${fmt(factor)}^{${years}}-1\right)\cdot100\%$).`,
          String.raw`כלומר הערך ${up ? 'עלה' : 'ירד'} בכ-$${fmt(Math.abs(change))}\%$ – ${up ? 'יותר' : 'פחות'} מ-$${years}\cdot${p}\%=${years * p}\%$, כי כל שינוי מחושב מערך ${up ? 'גדול' : 'קטן'} יותר.`,
        ],
        finalAnswer: String.raw`הערך כעבור $${years}$ שנים $${eq(value).replace('= ', '')}$ אלף ש״ח; שינוי של $${eq(change).replace('= ', '')}\%$.`,
        answers: [money('הערך הסופי (אלפי ש״ח)', value), answer(`אחוז השינוי הכולל (${up ? 'עלייה' : 'ירידה – מספר שלילי'})`, change)],
        data: { variant, start, p1: up ? p : -p, p2: 0, years },
      };
    }
    const item = rng.pick(PRICE_ITEMS);
    const start = rng.pick([120, 150, 200, 240, 250, 300, 360, 400, 450, 500, 800]);
    if (variant === 2) {
      const p = rng.pick([10, 20, 25, 30, 40, 50, 60, 75, 100]);
      const raised = (start * (100 + p)) / 100;
      const x = (100 * p) / (100 + p);
      return {
        statement: String.raw`המחיר של ${item} היה $${start}$ ש״ח. המחיר הועלה ב-$${p}\%$. מה המחיר אחרי ההעלאה, ובכמה אחוזים יש להוריד את המחיר החדש כדי לחזור למחיר המקורי?`,
        hints: [String.raw`העלאה ב-$${p}\%$ היא כפל ב-$${fmt(1 + p / 100)}$.`, String.raw`ההורדה מחושבת מהמחיר החדש: $${fmt(raised)}\left(1-\frac{x}{100}\right)=${start}$.`],
        solutionSteps: [
          String.raw`אחרי ההעלאה: $${start}\cdot${fmt(1 + p / 100)}=${fmt(raised)}$ ש״ח.`,
          String.raw`נסמן ב-$x$ את אחוז ההורדה. ההורדה מחושבת מהמחיר החדש: $${fmt(raised)}\left(1-\frac{x}{100}\right)=${start}$.`,
          String.raw`$1-\frac{x}{100}=\frac{${start}}{${fmt(raised)}}=${fracTex(100, 100 + p)}$, ולכן $\frac{x}{100}=${fracTex(p, 100 + p)}$ ו-$x=${fracTex(100 * p, 100 + p)}${Number.isInteger(x) ? '' : `\\approx ${fmt(x)}`}$.`,
          String.raw`שימו לב: ההורדה קטנה מ-$${p}\%$, כי היא מחושבת ממחיר גבוה יותר.`,
        ],
        finalAnswer: String.raw`המחיר החדש $${fmt(raised)}$ ש״ח; יש להוריד אותו ב-$${eq(x).replace('= ', '')}\%$.`,
        answers: [money('המחיר אחרי ההעלאה (ש״ח)', raised), answer('אחוז ההורדה הדרוש', x)],
        data: { variant, start, p1: p, p2: 0, years: 0 },
      };
    }
    const percents = [5, 10, 12, 15, 20, 25, 30, 40];
    const p1 = rng.sign() * rng.pick(percents);
    const p2 = rng.sign() * rng.pick(percents);
    const m1 = (100 + p1) / 100;
    const m2 = (100 + p2) / 100;
    const middle = (start * (100 + p1)) / 100;
    const final = (start * (100 + p1) * (100 + p2)) / 10000;
    const change = ((100 + p1) * (100 + p2) - 10000) / 100;
    const verb = (p: number) => (p > 0 ? 'הועלה' : 'הורד');
    const kind = (p: number) => (p > 0 ? 'עלייה' : 'ירידה');
    const summary = change === 0 ? 'המחיר חזר בדיוק למחיר המקורי' : `${change > 0 ? 'עלייה' : 'ירידה'} של $${fmt(Math.abs(change))}\\%$ ביחס למחיר המקורי`;
    return {
      statement: String.raw`המחיר של ${item} היה $${start}$ ש״ח. בתחילת החודש המחיר ${verb(p1)} ב-$${Math.abs(p1)}\%$, ובסוף החודש המחיר החדש ${verb(p2)} ב-$${Math.abs(p2)}\%$. מה המחיר הסופי, ובכמה אחוזים השתנה המחיר הסופי ביחס למחיר המקורי?`,
      hints: [
        String.raw`${kind(p1)} ב-$${Math.abs(p1)}\%$ היא כפל ב-$${fmt(m1)}$, ו${kind(p2)} ב-$${Math.abs(p2)}\%$ היא כפל ב-$${fmt(m2)}$.`,
        'השינוי השני מחושב מהמחיר שאחרי השינוי הראשון, ולא מהמחיר המקורי.',
      ],
      solutionSteps: [
        String.raw`אחרי השינוי הראשון: $${start}\cdot${fmt(m1)}=${fmt(middle)}$ ש״ח.`,
        String.raw`השינוי השני מחושב מהמחיר החדש: $${fmt(middle)}\cdot${fmt(m2)}${eq(final)}$ ש״ח.`,
        String.raw`המכפיל הכולל הוא $${fmt(m1)}\cdot${fmt(m2)}=${fmt(m1 * m2, 4)}$, ולכן אחוז השינוי: $(${fmt(m1 * m2, 4)}-1)\cdot100\%=${fmt(change)}\%$ – ${summary}.`,
      ],
      finalAnswer: String.raw`המחיר הסופי $${eq(final).replace('= ', '')}$ ש״ח; ${summary}.`,
      answers: [money('המחיר הסופי (ש״ח)', final), answer('אחוז השינוי הכולל (ירידה – מספר שלילי)', change)],
      data: { variant, start, p1, p2, years: 0 },
    };
  },
};

export const wordProblemsGenerators: ExerciseGenerator[] = [meeting, averageSpeed, overtake, percentChanges];
