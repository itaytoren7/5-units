import type { Chapter, ChapterId, LessonMeta, LessonStatus } from './types';

/**
 * The study-book table of contents for questionnaire 806 (35581), section by section,
 * with the status of every section in the summer-2026 מיקוד.
 * Content (intro, key facts, exercises) lives in ./content and ./oss and is merged in ./index.
 */
export const chapters: Chapter[] = [
  { id: 'euclidean-geometry', questionnaire: '35581', title: 'גאומטריה אוקלידית', description: 'זוויות, משולשים, מרובעים, מעגלים, שטחים ודמיון. הבסיס לשאלה 4 בשאלון 806.', topicIds: ['euclidean-geometry'], slots: [4] },
  { id: 'analytic-geometry', questionnaire: '35581', title: 'מבוא לגאומטריה אנליטית', description: 'נקודות, ישרים ומעגלים במערכת צירים. כלי עזר לשאלות 4 ו-6–8, ובסיס לשאלה 1 בשאלון 807.', topicIds: ['analytic-geometry'], slots: [4] },
  { id: 'trigonometry', questionnaire: '35581', title: 'טריגונומטריה במישור', description: 'פונקציות טריגונומטריות, זהויות, משוואות, ופתרון משולשים ומרובעים. שאלה 5 בשאלון 806.', topicIds: ['trigonometry'], slots: [5] },
  { id: 'calculus', questionnaire: '35581', title: 'חדו״א של פולינום, מנה, שורש ופונקציות טריגונומטריות', description: 'נגזרות, חקירה, בעיות קיצון גרפיות, אינטגרלים ושטחים. שאלות 6, 7 ו-8 בשאלון 806.', topicIds: ['differential-calculus', 'integral-calculus'], slots: [6, 7, 8] },
  { id: 'sequences', questionnaire: '35581', title: 'סדרות', description: 'סדרה הנדסית סופית ואינסופית וכלל נסיגה. שאלה 2 בשאלון 806. הסדרה החשבונית ירדה במיקוד 2026.', topicIds: ['sequences'], slots: [2] },
  { id: 'probability', questionnaire: '35581', title: 'הסתברות', description: 'חוקי ההסתברות, עצים, טבלאות, תלות והתפלגות בינומית. שאלה 3 בשאלון 806.', topicIds: ['probability'], slots: [3] },
  { id: 'word-problems', questionnaire: '35581', title: 'בעיות מילוליות', description: 'בעיות תנועה ובעיות אחוזים. שאלה 1 בשאלון 806. בעיות הספק ירדו מהבחינה.', topicIds: ['word-problems'], slots: [1] },
];

interface Options {
  note?: string;
  kind?: 'core' | 'review';
  questionnaire?: '35581' | '35582';
  topicId?: string;
  extra?: boolean;
}

function lesson(chapterId: ChapterId, id: string, title: string, status: LessonStatus, subtopicIds: string[], slots: number[], options: Options = {}): LessonMeta {
  const chapter = chapters.find((entry) => entry.id === chapterId)!;
  return {
    id,
    chapterId,
    questionnaire: options.questionnaire ?? chapter.questionnaire,
    topicId: options.topicId ?? chapter.topicIds[0],
    title,
    status,
    statusNote: options.note,
    subtopicIds,
    slots,
    kind: options.kind ?? 'core',
    extra: options.extra,
  };
}

const OUT_ORIGINAL = 'לא בבחינה לפי המיקוד המקורי. מוצג לידיעה, כי ייתכן שיחזור במיקוד של שנה הבאה.';
const OUT_2026 = 'ירד בהורדה של 2026. מוצג לידיעה, כי ייתכן שיחזור במיקוד של שנה הבאה.';

const G = 'euclidean-geometry';
const A = 'analytic-geometry';
const T = 'trigonometry';
const C = 'calculus';
const S = 'sequences';
const P = 'probability';
const W = 'word-problems';

export const lessonCatalog: LessonMeta[] = [
  // גאומטריה אוקלידית
  lesson(G, 'geo-angles', 'זוויות', 'in', ['geo-triangles-quadrilaterals'], [4], { note: 'זוויות קודקודיות וצמודות, זוויות בין ישרים מקבילים, סכום זוויות במשולש ובמצולע.' }),
  lesson(G, 'geo-triangles-basic', 'משולשים: תרגילי חישוב בסיסיים', 'in', ['geo-triangles-quadrilaterals', 'geo-polygons-congruence'], [4]),
  lesson(G, 'geo-triangles-advanced', 'משולשים: תרגילי חישוב מתקדמים', 'in', ['geo-triangles-quadrilaterals', 'geo-thales-midline'], [4]),
  lesson(G, 'geo-triangles-proof', 'משולשים: תרגילי הוכחה', 'in', ['geo-polygons-congruence', 'geo-triangles-quadrilaterals'], [4]),
  lesson(G, 'geo-quadrilaterals-basic', 'מרובעים: תרגילי חישוב בסיסיים', 'in', ['geo-triangles-quadrilaterals'], [4]),
  lesson(G, 'geo-quadrilaterals-advanced', 'מרובעים: תרגילי חישוב מתקדמים', 'in', ['geo-triangles-quadrilaterals', 'geo-thales-midline'], [4]),
  lesson(G, 'geo-quadrilaterals-proof', 'מרובעים: תרגילי הוכחה', 'in', ['geo-triangles-quadrilaterals', 'geo-polygons-congruence'], [4]),
  lesson(G, 'geo-circles-basic', 'מעגלים: תרגילי חישוב בסיסיים', 'in', ['geo-circle-angles', 'geo-circle-tangents'], [4]),
  lesson(G, 'geo-circles-proof', 'מעגלים: תרגילי הוכחה', 'in', ['geo-circle-angles', 'geo-circle-tangents', 'geo-cyclic-quadrilaterals', 'geo-loci'], [4]),
  lesson(G, 'geo-areas-basic', 'שטחים: תרגילי חישוב בסיסיים', 'in', ['geo-polygons-congruence'], [4]),
  lesson(G, 'geo-areas-proof', 'שטחים: תרגילי הוכחה', 'in', ['geo-polygons-congruence', 'geo-triangles-quadrilaterals'], [4]),
  lesson(G, 'geo-circle-area', 'שטח מעגל: תרגילי חישוב', 'in', ['geo-polygons-congruence', 'trig-circle-measure'], [4, 5]),
  lesson(G, 'geo-thales', 'משפט תאלס', 'in', ['geo-thales-midline'], [4], { note: 'כולל המשפט ההפוך, קטע אמצעים וחלוקת קטע ביחס נתון.' }),
  lesson(G, 'geo-angle-bisector', 'משפט חוצה זווית במשולש', 'partial', ['geo-bisector-similarity'], [4], { note: 'רק חוצה זווית פנימית. משפט חוצה זווית חיצונית אינו בתכנית.' }),
  lesson(G, 'geo-similarity', 'משפטי דמיון', 'in', ['geo-bisector-similarity'], [4], { note: 'שלושת משפטי הדמיון משמשים בלי הוכחה.' }),
  lesson(G, 'geo-similar-ratios', 'יחס גדלים במשולשים דומים', 'partial', ['geo-similar-altitudes-areas', 'geo-bisector-similarity'], [4], { note: 'בבחינה: יחס צלעות ויחס גבהים. יחס היקפים, תיכונים, חוצי זווית ורדיוסים ירד במיקוד.' }),
  lesson(G, 'geo-similar-areas', 'יחס שטחים במשולשים דומים', 'in', ['geo-similar-altitudes-areas'], [4], { note: 'נשאר במפורש במיקוד.' }),
  lesson(G, 'geo-similarity-circles', 'יישום משפטי דמיון במעגלים', 'in', ['geo-cyclic-quadrilaterals', 'geo-circle-angles', 'geo-bisector-similarity'], [4], { note: 'דמיון משולשים במעגל, בלי משפטי הקטעים הפרופורציוניים (שירדו).' }),
  lesson(G, 'geo-right-triangle-proportions', 'קטעים פרופורציוניים במשולש ישר זווית', 'out-original', ['geo-right-triangle-proportions'], [4], { note: OUT_ORIGINAL }),
  lesson(G, 'geo-similarity-review', 'פרופורציה ודמיון: תרגילים מסכמים', 'in', ['geo-thales-midline', 'geo-bisector-similarity', 'geo-similar-altitudes-areas'], [4], { kind: 'review' }),
  lesson(G, 'geo-circle-proportions', 'קטעים פרופורציוניים במעגל', 'out-original', ['geo-circle-proportions'], [4], { note: OUT_ORIGINAL }),

  // מבוא לגאומטריה אנליטית
  lesson(A, 'ag-distance', 'המרחק בין שתי נקודות', 'in', ['ag-segments'], [4]),
  lesson(A, 'ag-midpoint', 'אמצע קטע', 'in', ['ag-segments'], [4]),
  lesson(A, 'ag-line', 'הקו הישר', 'in', ['ag-lines'], [4]),
  lesson(A, 'ag-line-equation', 'מציאת משוואת ישר', 'in', ['ag-lines'], [4]),
  lesson(A, 'ag-slope-parallel', 'שיפוע של ישר וישרים מקבילים', 'in', ['ag-lines'], [4]),
  lesson(A, 'ag-perpendicular', 'ניצבות בין ישרים', 'in', ['ag-lines'], [4]),
  lesson(A, 'ag-line-review', 'תרגילים מסכמים: הישר', 'in', ['ag-segments', 'ag-lines'], [4], { kind: 'review' }),
  lesson(A, 'ag-circle-equation', 'משוואת המעגל', 'in', ['analytic-circle'], [1], { questionnaire: '35582', note: 'בשאלון 806 נדרש רק מעגל שמרכזו בראשית הצירים (לצורך המעגל הטריגונומטרי). המעגל הכללי נדרש בשאלון 807, שאלה 1.' }),
  lesson(A, 'ag-circle-tangent', 'המשיק למעגל', 'in', ['analytic-circle'], [1], { questionnaire: '35582', note: 'נדרש בשאלון 807, שאלה 1 (משיק בנקודה שעל המעגל). לא נדרש בשאלון 806.' }),
  lesson(A, 'ag-line-more', 'תרגילים נוספים: ישר', 'in', ['ag-segments', 'ag-lines'], [4], { kind: 'review' }),
  lesson(A, 'ag-circle-more', 'תרגילים נוספים: מעגל', 'in', ['analytic-circle'], [1], { questionnaire: '35582', kind: 'review', note: 'מעגל כללי ומשיק: שאלון 807, שאלה 1.' }),
  lesson(A, 'ag-self-practice', 'תרגילים לעבודה עצמית', 'in', ['ag-segments', 'ag-lines', 'ag-circle-origin'], [4], { kind: 'review' }),

  // טריגונומטריה במישור
  lesson(T, 'trig-basics', 'הפונקציה הטריגונומטרית: תכונות יסוד', 'in', ['trig-unit-circle', 'trig-identities-angle', 'trig-circle-measure'], [5, 7]),
  lesson(T, 'trig-identities', 'זהויות טריגונומטריות', 'partial', ['trig-identities', 'trig-identities-angle'], [5, 7], { note: 'בבחינה: $\\tan x=\\frac{\\sin x}{\\cos x}$, $\\sin^2x+\\cos^2x=1$, סכום והפרש זוויות וזווית כפולה. זהויות סכום והפרש של סינוסים וקוסינוסים ירדו ב-2026.' }),
  lesson(T, 'trig-equations', 'משוואות טריגונומטריות', 'partial', ['trig-equations'], [5, 7], { note: 'רק הסוגים שבתכנית, וכחלק מבעיה. לא יידרש $a\\sin x+b\\cos x=c$ כאשר $a\\ne b$ ו-$c\\ne 0$.' }),
  lesson(T, 'trig-pythagoras', 'משפט פיתגורס', 'in', ['geo-triangles-quadrilaterals', 'trig-triangle-solutions'], [4, 5]),
  lesson(T, 'trig-right-triangle', 'משולש ישר זווית: תרגילי מבוא', 'in', ['trig-triangle-solutions'], [5]),
  lesson(T, 'trig-polygons', 'טריגונומטריה במישור: משולשים ומרובעים', 'in', ['trig-triangle-solutions', 'trig-geometry-problems'], [5]),
  lesson(T, 'trig-sine-law', 'משפט הסינוסים', 'in', ['trig-triangle-solutions'], [5]),
  lesson(T, 'trig-cosine-law', 'משפט הקוסינוסים', 'in', ['trig-triangle-solutions'], [5]),
  lesson(T, 'trig-triangle-area', 'נוסחאות שטח משולש', 'in', ['trig-triangle-solutions'], [5]),
  lesson(T, 'trig-laws-level-b', 'רמה ב׳: משפט הסינוסים והקוסינוסים', 'in', ['trig-triangle-solutions', 'trig-geometry-problems'], [5]),
  lesson(T, 'trig-proof-review', 'רמה ב׳: תרגילי הוכחה מסכמים', 'in', ['trig-geometry-problems', 'trig-identities'], [5], { kind: 'review' }),
  lesson(T, 'trig-advanced', 'תרגילים מתקדמים', 'in', ['trig-geometry-problems', 'trig-triangle-solutions', 'trig-identities'], [5], { kind: 'review' }),

  // חדו״א
  lesson(C, 'calc-derivative', 'נגזרת', 'in', ['diff-derivative-concept', 'diff-rules'], [6, 7, 8], { topicId: 'differential-calculus' }),
  lesson(C, 'calc-tangent', 'המשיק', 'partial', ['diff-tangent-on-graph', 'diff-rules'], [6, 7], { topicId: 'differential-calculus', note: 'רק משיק בנקודה שעל הגרף. משיק מנקודה מחוץ לגרף אינו בבחינה.' }),
  lesson(C, 'calc-extrema-monotonic', 'נקודות קיצון ותחומי עלייה וירידה', 'in', ['diff-intersections-monotonicity', 'diff-investigation'], [6, 7], { topicId: 'differential-calculus' }),
  lesson(C, 'calc-absolute-extrema', 'נקודות קיצון מוחלטות', 'in', ['diff-investigation'], [6, 7, 8], { topicId: 'differential-calculus' }),
  lesson(C, 'calc-asymptotes', 'אסימפטוטות', 'in', ['diff-investigation'], [6], { topicId: 'differential-calculus', note: 'אסימפטוטות המקבילות לצירים בלבד.' }),
  lesson(C, 'calc-concavity', 'נקודות פיתול ותחומי קעירות', 'in', ['diff-second-derivative'], [6, 7], { topicId: 'differential-calculus' }),
  lesson(C, 'calc-investigate-polynomial', 'חקירת פונקציה: פולינום', 'in', ['diff-investigation', 'diff-intersections-monotonicity'], [6], { topicId: 'differential-calculus' }),
  lesson(C, 'calc-investigate-rational', 'חקירת פונקציה: מנה', 'in', ['diff-investigation', 'diff-rules'], [6], { topicId: 'differential-calculus' }),
  lesson(C, 'calc-investigate-root', 'חקירת פונקציה: שורש ריבועי', 'in', ['diff-investigation', 'diff-rules'], [6], { topicId: 'differential-calculus' }),
  lesson(C, 'calc-trig-functions', 'הפונקציה הטריגונומטרית', 'in', ['diff-rules', 'diff-investigation', 'trig-graphs', 'trig-equations'], [7], { topicId: 'differential-calculus' }),
  lesson(C, 'calc-graph-derivative', 'הקשר בין גרף הפונקציה וגרף הנגזרת', 'in', ['diff-function-relations'], [6, 7], { topicId: 'differential-calculus' }),
  lesson(C, 'calc-extremum-problems', 'בעיות קיצון', 'partial', ['diff-graphical-extrema'], [8], { topicId: 'differential-calculus', note: 'בבחינה נשארו בעיות קיצון גרפיות (על גרף של פונקציה). בעיות קיצון מילוליות, גאומטריות, במרחב, כלכליות ועם פונקציות טריגונומטריות ירדו.' }),
  lesson(C, 'calc-indefinite-integral', 'אינטגרל בלתי מסוים: פולינום, מנה ושורש', 'partial', ['int-indefinite', 'int-polynomial-rational', 'int-antiderivative-point'], [6], { topicId: 'integral-calculus', note: 'אינטגרל של פונקציית שורש ירד במיקוד. נשארו פולינומים ו-$\\frac{c\\,f\'(x)}{(f(x))^n}$.' }),
  lesson(C, 'calc-areas', 'חישוב שטחים: פולינום, מנה ושורש', 'partial', ['int-definite-areas', 'int-polynomial-rational'], [6], { topicId: 'integral-calculus', note: 'בלי אינטגרל של פונקציית שורש.' }),
  lesson(C, 'calc-trig-integral', 'אינטגרל בלתי מסוים: פונקציות טריגונומטריות', 'out-original', ['int-roots-trig'], [7], { topicId: 'integral-calculus', note: OUT_ORIGINAL }),
  lesson(C, 'calc-trig-areas', 'חישוב שטחים: פונקציות טריגונומטריות', 'out-original', ['int-roots-trig'], [7], { topicId: 'integral-calculus', note: OUT_ORIGINAL }),
  lesson(C, 'calc-graph-integral', 'הקשר בין גרף הפונקציה וגרף הנגזרת: אינטגרלים', 'in', ['int-antiderivative-point', 'diff-function-relations', 'int-definite-areas'], [6], { topicId: 'integral-calculus', note: 'נשאר במפורש במיקוד: אינטגרל של פונקציה נגזרת שמוביל לפונקציה הקדומה.' }),
  lesson(C, 'calc-volume', 'נפח גוף סיבוב', 'out-original', ['int-volume'], [6], { topicId: 'integral-calculus', note: OUT_ORIGINAL }),
  lesson(C, 'calc-integral-extrema', 'בעיות קיצון עם שימוש באינטגרלים', 'out-original', ['int-extrema'], [8], { topicId: 'integral-calculus', note: OUT_ORIGINAL }),
  lesson(C, 'calc-review', 'תרגילים מסכמים', 'in', ['diff-investigation', 'diff-tangent-on-graph', 'int-definite-areas', 'diff-graphical-extrema'], [6, 7, 8], { topicId: 'differential-calculus', kind: 'review' }),

  // סדרות
  lesson(S, 'seq-arithmetic-intro', 'סדרה חשבונית: מבוא', 'out-2026', ['seq-arithmetic'], [2], { note: OUT_2026 }),
  lesson(S, 'seq-arithmetic-sum', 'סכום סדרה חשבונית', 'out-2026', ['seq-arithmetic'], [2], { note: OUT_2026 }),
  lesson(S, 'seq-arithmetic-review', 'סדרה חשבונית: תרגילי חזרה', 'out-2026', ['seq-arithmetic'], [2], { note: OUT_2026 }),
  lesson(S, 'seq-arithmetic-advanced', 'סדרה חשבונית: תרגילים מתקדמים', 'out-2026', ['seq-arithmetic'], [2], { note: OUT_2026 }),
  lesson(S, 'seq-geometric-intro', 'סדרה הנדסית: מבוא', 'in', ['seq-geometric'], [2]),
  lesson(S, 'seq-geometric-sum', 'סכום סדרה הנדסית', 'in', ['seq-geometric'], [2]),
  lesson(S, 'seq-geometric-review', 'סדרה הנדסית: תרגילי חזרה', 'in', ['seq-geometric'], [2], { kind: 'review' }),
  lesson(S, 'seq-geometric-advanced', 'סדרה הנדסית: תרגילים מתקדמים', 'in', ['seq-geometric'], [2]),
  lesson(S, 'seq-infinite', 'סדרה הנדסית אינסופית מתכנסת', 'in', ['seq-geometric'], [2]),
  lesson(S, 'seq-recursion', 'כלל נסיגה', 'partial', ['seq-geometric'], [2], { note: 'בבחינה רק כלל הנסיגה של סדרה הנדסית ($a_{n+1}=q\\cdot a_n$) והמעבר בינו לבין האיבר הכללי. סדרות כלליות לפי כלל נסיגה אינן בבחינה.' }),
  lesson(S, 'seq-advanced-practice', 'שאלות מתקדמות לעבודה עצמית', 'in', ['seq-geometric'], [2], { kind: 'review', note: 'רק סדרות הנדסיות.' }),
  lesson(S, 'seq-review-a', 'שאלות חזרה: רמה א׳', 'in', ['seq-geometric'], [2], { kind: 'review', note: 'רק סדרות הנדסיות.' }),
  lesson(S, 'seq-review-b', 'שאלות חזרה: רמה ב׳', 'in', ['seq-geometric'], [2], { kind: 'review', note: 'רק סדרות הנדסיות.' }),

  // הסתברות
  lesson(P, 'prob-laws', 'שימוש בחוקי ההסתברות', 'in', ['probability-basics'], [3]),
  lesson(P, 'prob-basic', 'חישובי הסתברות בסיסיים', 'in', ['probability-basics'], [3]),
  lesson(P, 'prob-tree-two', 'עץ הסתברויות: ניסויים דו-שלביים', 'in', ['probability-trees', 'probability-conditional'], [3]),
  lesson(P, 'prob-tree-three', 'עץ הסתברויות: ניסויים תלת-שלביים', 'in', ['probability-trees'], [3]),
  lesson(P, 'prob-table', 'טבלת הסתברויות', 'in', ['probability-trees', 'probability-conditional'], [3]),
  lesson(P, 'prob-dependence', 'תלות בין מאורעות', 'in', ['probability-conditional'], [3]),
  lesson(P, 'prob-binomial', 'התפלגות בינומית ונוסחת ברנולי', 'in', ['probability-binomial'], [3]),
  lesson(P, 'prob-review', 'תרגילים מסכמים', 'in', ['probability-basics', 'probability-conditional', 'probability-trees', 'probability-binomial'], [3], { kind: 'review' }),
  lesson(P, 'prob-advanced', 'שאלות מתקדמות לעבודה עצמית', 'in', ['probability-conditional', 'probability-trees', 'probability-binomial'], [3], { kind: 'review' }),

  // בעיות מילוליות
  lesson(W, 'word-motion', 'בעיות תנועה', 'in', ['word-motion'], [1], { note: 'נשאר במפורש במיקוד.' }),
  lesson(W, 'word-motion-advanced', 'בעיות תנועה: תרגילים מתקדמים', 'in', ['word-motion'], [1]),
  lesson(W, 'word-work', 'בעיות הספק', 'out-original', ['word-work-rate'], [1], { note: OUT_ORIGINAL }),
  lesson(W, 'word-work-advanced', 'בעיות הספק: תרגילים מתקדמים', 'out-original', ['word-work-rate'], [1], { note: OUT_ORIGINAL }),
  lesson(W, 'word-motion-practice', 'בעיות תנועה: שאלות לעבודה עצמית', 'in', ['word-motion'], [1], { kind: 'review' }),
  lesson(W, 'word-work-practice', 'בעיות הספק: שאלות לעבודה עצמית', 'out-original', ['word-work-rate'], [1], { note: OUT_ORIGINAL }),
  lesson(W, 'word-percentages', 'בעיות אחוזים', 'in', ['word-percentages'], [1], { extra: true, note: 'לא פרק נפרד בספר, אבל שאלות אחוזים יכולות להופיע בשאלה 1 ובכל נושא אחר.' }),
];

export function isInScope(status: LessonStatus): boolean {
  return status === 'in' || status === 'partial';
}

const catalogById = new Map(lessonCatalog.map((meta) => [meta.id, meta]));

/** Lesson metadata without loading the (large) lesson content. */
export function lessonMetaById(id: string | undefined): LessonMeta | undefined {
  return id ? catalogById.get(id) : undefined;
}

/** 'trig-sine-law-3' → 'trig-sine-law', 'trig-sine-law-os2' → 'trig-sine-law'; undefined for other ids. */
export function lessonIdOfExercise(exerciseId: string): string | undefined {
  const match = /^(.*)-(?:os)?\d+$/.exec(exerciseId);
  return match && catalogById.has(match[1]) ? match[1] : undefined;
}

export function lessonPath(meta: Pick<LessonMeta, 'chapterId' | 'id'>): string {
  return `/learn/${meta.chapterId}/${meta.id}`;
}
