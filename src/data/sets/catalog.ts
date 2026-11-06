import type { QuestionnaireCode } from '../problems/types';

export interface CatalogEntry {
  id: string;
  title: string;
  questionnaire: QuestionnaireCode;
  topicId: string;
  /** One line: what the set covers. */
  summary: string;
  status: 'planned' | 'done';
}

/** The planned sets, in study order. "סט הבא" = the first `planned` entry. */
const planned = (id: string, questionnaire: QuestionnaireCode, topicId: string, title: string, summary: string): CatalogEntry => ({ id, title, questionnaire, topicId, summary, status: 'planned' });

export const setsCatalog: CatalogEntry[] = [
  /* ---- 35581 · טריגונומטריה (שאלה 5, וחלקים משאלה 7) ---- */
  { id: 'trig-right-triangle', title: 'טריגונומטריה במשולש ישר זווית', questionnaire: '35581', topicId: 'trigonometry', summary: 'סינוס, קוסינוס וטנגנס במשולש ישר זווית, מצולעים שמתפרקים למשולשים ישרי זווית, ושאלות עם פרמטר α.', status: 'done' },
  planned('trig-unit-circle', '35581', 'trigonometry', 'מעגל היחידה, רדיאנים וזוויות מיוחדות', 'ערכי sin, cos, tan במעגל היחידה, מעבר בין מעלות לרדיאנים, זוויות משלימות ל-90° ול-180°, אורך קשת ושטח גזרה.'),
  planned('trig-identities', '35581', 'trigonometry', 'זהויות טריגונומטריות', 'tan=sin/cos, sin²+cos²=1, סכום והפרש זוויות, זווית כפולה; פישוט ביטויים והוכחת זהויות.'),
  planned('trig-equations-basic', '35581', 'trigonometry', 'משוואות טריגונומטריות בסיסיות', 'sin(ax+b)=c, cos(ax+b)=c, tan(ax+b)=c: פתרון כללי ופתרון בתחום נתון, במעלות וברדיאנים.'),
  planned('trig-equations-advanced', '35581', 'trigonometry', 'משוואות טריגונומטריות מתקדמות', 'sinα=sinβ, cosα=cosβ, a·sinx±b·cosx=0, פירוק לגורמים ומשוואה ריבועית ב-sin או ב-cos, כחלק מבעיה.'),
  planned('trig-sine-cosine-laws', '35581', 'trigonometry', 'משפט הסינוסים ומשפט הקוסינוסים', 'פתרון משולש כללי, המקרה הדו-משמעי, רדיוס המעגל החוסם a/sinα=2R ונוסחת השטח ½ab·sinγ.'),
  planned('trig-polygons', '35581', 'trigonometry', 'טריגונומטריה במרובעים', 'טרפזים, מקביליות, מעוינים, דלתונים ומרובעים חסומים במעגל, בעזרת פירוק למשולשים ומשפטי הסינוסים והקוסינוסים.'),
  planned('trig-parameter-alpha', '35581', 'trigonometry', 'שאלות עם פרמטר α', 'הבעת אורכים ושטחים באמצעות α, הוכחת קשרים בעזרת זהויות, ומציאת α מתנאי נתון.'),
  planned('trig-circle-problems', '35581', 'trigonometry', 'טריגונומטריה במעגל', 'מיתרים, משיקים, זוויות מרכזיות והיקפיות, מעגל חוסם וחסום, קשתות וגזרות עם טריגונומטריה.'),
  planned('trig-bagrut-mix', '35581', 'trigonometry', 'טריגונומטריה במישור: סט מסכם', 'שתים-עשרה שאלות בסגנון שאלה 5, שמשלבות את כל הכלים של הפרק.'),

  /* ---- 35581 · חדו״א (שאלות 6–8) ---- */
  planned('calc-derivatives-technique', '35581', 'differential-calculus', 'טכניקת גזירה', 'נגזרות של פולינום, פונקציה רציונלית, שורש ריבועי ופונקציות טריגונומטריות; כללי המכפלה, המנה וההרכבה.'),
  planned('calc-tangents', '35581', 'differential-calculus', 'משיקים', 'משוואת משיק בנקודה על הגרף, משיק מקביל או מאונך לישר נתון, ומציאת פרמטרים מתוך משיק נתון.'),
  planned('calc-extrema-monotonicity', '35581', 'differential-calculus', 'נקודות קיצון ותחומי עלייה וירידה', 'טבלת סימנים של הנגזרת, קיצון מקומי ומוחלט, קעירות ונקודות פיתול.'),
  planned('calc-investigate-polynomial', '35581', 'differential-calculus', 'חקירת פולינום', 'חקירה מלאה של פולינום, פרמטרים מתוך תכונות הגרף, ומספר הפתרונות של f(x)=k.'),
  planned('calc-investigate-rational', '35581', 'differential-calculus', 'חקירת פונקציה רציונלית', 'תחום הגדרה, אסימפטוטות מקבילות לצירים, קיצון, חיתוך עם הצירים ושרטוט.'),
  planned('calc-investigate-root', '35581', 'differential-calculus', 'חקירת פונקציית שורש', 'תחום הגדרה, קיצון בקצה התחום, משיק אנכי וחקירה מלאה של פונקציות עם שורש ריבועי.'),
  planned('calc-investigate-trig', '35581', 'differential-calculus', 'חקירת פונקציה טריגונומטרית', 'נגזרת, קיצון ופיתול של פונקציות טריגונומטריות בתחום נתון, עם משוואות מהסוגים שבתכנית (שאלה 7).'),
  planned('calc-graph-relations', '35581', 'differential-calculus', 'הקשר בין הפונקציה לנגזרת', 'קריאת תכונות f מגרף f′ ולהפך, סימן הנגזרת, אפסים וקיצון, ונגזרת שנייה.'),
  planned('calc-graphical-extrema', '35581', 'differential-calculus', 'בעיות קיצון גרפיות', 'נקודה על גרף: מרחק מינימלי, מלבן או משולש בעלי שטח מקסימלי, משיק שיוצר משולש מינימלי (שאלה 8).'),
  planned('calc-integrals-technique', '35581', 'integral-calculus', 'אינטגרל לא מסוים', 'פונקציה קדומה של פולינום ושל c·f′/(f)ⁿ, מציאת פונקציה לפי נגזרת ונקודה.'),
  planned('calc-areas-basic', '35581', 'integral-calculus', 'חישוב שטחים: בסיס', 'שטח בין גרף לציר x, כולל פונקציה שמחליפה סימן, ושטח בין גרף לישר.'),
  planned('calc-areas-advanced', '35581', 'integral-calculus', 'חישוב שטחים: מתקדם', 'שטח בין שני גרפים, שטחים מורכבים, שטח עם משיק, ואינטגרל של נגזרת שמוביל לפונקציה הקדומה.'),
  planned('calc-bagrut-mix', '35581', 'differential-calculus', 'חדו״א: סט מסכם', 'שתים-עשרה שאלות בסגנון שאלות 6–8: חקירה, משיקים, שטחים וקיצון גרפי.'),

  /* ---- 35581 · הסתברות (שאלה 3) ---- */
  planned('prob-laws-basic', '35581', 'probability', 'חוקי ההסתברות', 'מרחב מדגם, מאורע משלים, איחוד וחיתוך, חישובים בסיסיים בקוביות, מטבעות וכדורים.'),
  planned('prob-trees-conditional', '35581', 'probability', 'עצים והסתברות מותנית', 'ניסויים דו-שלביים ותלת-שלביים עם ובלי החזרה, הסתברות מותנית ונוסחת בייס.'),
  planned('prob-tables-independence', '35581', 'probability', 'טבלאות ותלות בין מאורעות', 'טבלאות דו-ממדיות באחוזים, השלמת טבלה, ובדיקת תלות ואי-תלות.'),
  planned('prob-binomial', '35581', 'probability', 'התפלגות בינומית', 'נוסחת ברנולי, "לפחות אחד", הסתברות מותנית בבינומי, ומציאת n או p.'),
  planned('prob-bagrut-mix', '35581', 'probability', 'הסתברות: סט מסכם', 'שתים-עשרה שאלות בסגנון שאלה 3 שמשלבות עץ, טבלה ובינומי.'),

  /* ---- 35581 · סדרות (שאלה 2) ---- */
  planned('seq-geometric-basic', '35581', 'sequences', 'סדרה הנדסית: איבר כללי וסכום', 'מציאת a₁ ו-q, איבר כללי, סכום n איברים ראשונים, ומציאת n.'),
  planned('seq-geometric-infinite', '35581', 'sequences', 'סדרה הנדסית אינסופית וכלל נסיגה', 'סכום סדרה אינסופית מתכנסת, סדרות שנגזרות מסדרה הנדסית, ומעבר בין כלל נסיגה לאיבר כללי.'),
  planned('seq-bagrut-mix', '35581', 'sequences', 'סדרות: סט מסכם', 'שתים-עשרה שאלות בסגנון שאלה 2, כולל הקשרים של אחוזים.'),

  /* ---- 35581 · בעיות מילוליות (שאלה 1) ---- */
  planned('word-motion-basic', '35581', 'word-problems', 'בעיות תנועה: בסיס', 'תנועה זה לקראת זה, השגה, הלוך ושוב ומהירות ממוצעת, עם משוואה אחת.'),
  planned('word-motion-advanced', '35581', 'word-problems', 'בעיות תנועה: מתקדם', 'מערכות משוואות, מסלול מעגלי, סירה בזרם, הפרשי זמנים ושינויי מהירות באחוזים.'),
  planned('word-percentages', '35581', 'word-problems', 'בעיות אחוזים', 'שינויים עוקבים, מציאת אחוז השינוי מתוך משוואה ריבועית, ואחוזים בבעיות תנועה.'),

  /* ---- 35582 · גאומטריה אנליטית (שאלה 1) ---- */
  planned('ag582-lines-distance', '35582', 'analytic-geometry', 'ישרים, מרחקים וחלוקת קטע', 'משוואת ישר, ישרים מקבילים וניצבים, מרחק נקודה מישר וחלוקת קטע ביחס נתון.'),
  planned('ag582-circle', '35582', 'analytic-geometry', 'מעגל ומשיק למעגל', 'משוואת המעגל הכללית, התנאי למעגל, מעגל דרך נקודות, ומשיק בנקודה על המעגל.'),
  planned('ag582-ellipse', '35582', 'analytic-geometry', 'אליפסה', 'משוואה קנונית, צירים ומוקדים, מצב הדדי של ישר ואליפסה לפי הדיסקרימיננטה.'),
  planned('ag582-loci-mix', '35582', 'analytic-geometry', 'מקומות גאומטריים: סט מסכם', 'בעיות שמשלבות ישר, מעגל ואליפסה, ומקומות גאומטריים בסגנון שאלה 1.'),

  /* ---- 35582 · וקטורים וטריגונומטריה במרחב (שאלה 2) ---- */
  planned('vec-geometric', '35582', 'vectors', 'וקטורים גאומטריים', 'חיבור, חיסור, כפל בסקלר, קומבינציה ליניארית וחלוקת קטע ביחס נתון; הוכחות וחישובים.'),
  planned('vec-algebraic-dot', '35582', 'vectors', 'הצגה אלגברית ומכפלה סקלרית', 'מערכת צירים במרחב, אורך וזווית בין וקטורים, ניצבות ומכפלה סקלרית.'),
  planned('vec-lines-planes', '35582', 'vectors', 'ישרים ומישורים במרחב', 'הצגה פרמטרית של ישר ומישור, משוואת מישור, מצב הדדי, וזוויות בין ישרים ובין ישר למישור.'),
  planned('solid-trig', '35582', 'solid-trigonometry', 'טריגונומטריה במרחב', 'תיבה, מנסרה ופירמידה: זוויות בין ישר למישור ובין מישורים, אורכים, שטחים ונפחים.'),
  planned('vec-bagrut-mix', '35582', 'vectors', 'וקטורים: סט מסכם', 'שתים-עשרה שאלות בסגנון שאלה 2 שמשלבות וקטורים וגופים במרחב.'),

  /* ---- 35582 · מספרים מרוכבים (שאלה 3) ---- */
  planned('complex-arithmetic', '35582', 'complex-numbers', 'מספרים מרוכבים: פעולות', 'ארבע הפעולות, צמוד, ערך מוחלט, שוויון מרוכבים ושורש ריבועי של מספר מרוכב.'),
  planned('complex-polar-demoivre', '35582', 'complex-numbers', 'הצגה קוטבית ומשפט דה-מואבר', 'מעבר בין הצגות, חזקות ושורשים, שורשי יחידה וציורם במישור גאוס.'),
  planned('complex-geometry-loci', '35582', 'complex-numbers', 'משמעויות גאומטריות', 'המשמעות הגאומטרית של הפעולות, מרחקים וזוויות במישור גאוס, ומקומות גאומטריים.'),
  planned('complex-bagrut-mix', '35582', 'complex-numbers', 'מספרים מרוכבים: סט מסכם', 'שתים-עשרה שאלות בסגנון שאלה 3, כולל שילוב עם סדרות ואנליטית.'),

  /* ---- 35582 · מעריכיות ולוגריתמים (שאלות 4–5) ---- */
  planned('explog-technique', '35582', 'exponential-logarithms', 'חוקי חזקות ולוגריתמים', 'חוקי חזקות ושורשים, חוקי לוגריתמים ומעבר בסיס, משוואות ואי-שוויונות מעריכיים ולוגריתמיים.'),
  planned('calc582-derivatives', '35582', 'differential-integral', 'נגזרות של eˣ ו-ln x', 'גזירת פונקציות מעריכיות ולוגריתמיות ושילובן עם פולינום ופונקציה רציונלית; משיקים.'),
  planned('calc582-investigate-exp', '35582', 'differential-integral', 'חקירת פונקציה מעריכית', 'תחום, אסימפטוטות, קיצון, פיתול ושרטוט של פונקציות עם eˣ.'),
  planned('calc582-investigate-log', '35582', 'differential-integral', 'חקירת פונקציה לוגריתמית', 'תחום הגדרה, אסימפטוטות, קיצון ושרטוט של פונקציות עם ln x, והקשר בין f ל-f′.'),
  planned('calc582-integrals', '35582', 'differential-integral', 'אינטגרלים של eˣ ו-1/x', 'פונקציה קדומה של e^{f(x)}, 1/f(x) ו-f′/f, ומציאת פונקציה לפי נגזרת ונקודה.'),
  planned('calc582-areas', '35582', 'differential-integral', 'שטחים עם פונקציות מעריכיות ולוגריתמיות', 'שטח בין גרף לצירים ובין שני גרפים, שטחים מורכבים ושטח עם משיק.'),
  planned('calc582-bagrut-mix', '35582', 'differential-integral', 'חדו״א של מעריכיות ולוגריתמים: סט מסכם', 'שתים-עשרה שאלות בסגנון שאלות 4–5: חקירה, משיקים ושטחים.'),
];

export function nextPlanned(): CatalogEntry | undefined {
  return setsCatalog.find((entry) => entry.status === 'planned');
}
