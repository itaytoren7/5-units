# Build: Math Bagrut 5-Units Study Site (questionnaires 35581 + 35582)

## Goal
Build a personal study website for a Hebrew-speaking student preparing for the Israeli math matriculation exam (בגרות במתמטיקה 5 יח"ל), old program: questionnaire **35581 (806)** and questionnaire **35582 (807)**, according to the syllabus and the "מיקוד" (list of topics removed from the exam) published for summer 2026.

The site must help me:
1. Know exactly what is and isn't on the exam.
2. Study in the recommended order (yellow questions first, blue last).
3. Practice with progressive hints and full step-by-step solutions.
4. Simulate full exams under the real time limits and scoring rules.
5. Track progress, mistakes, and past exams I've solved.

All syllabus content is in this file. **Do not invent syllabus topics.** The exam focus may change for my exam session (I may switch to the new-program questionnaires 35571/35572), so keep everything data-driven: adding or replacing a questionnaire must only require editing data files, never components.

Work in phases (below). At the end of each phase: run `npm run build` and `npm test`, fix anything failing, summarize what you built and how to run it, and **stop and wait for my go-ahead**.

---

## Tech stack
- Vite + React + TypeScript (strict, no `any`). No backend.
- Tailwind CSS. Use logical utilities (`ms-`, `me-`, `ps-`, `pe-`, `text-start`) so RTL works correctly.
- react-router.
- Math: `react-markdown` + `remark-math` + `rehype-katex` (KaTeX). All math content is authored as Markdown with `$...$` and `$$...$$`.
- Interactive graphs: `mafs`.
- Persistence: `localStorage` under a versioned key (`bagrut:v1`) + Export / Import JSON backup + Reset, in Settings.
- Tests: `vitest`; `mathjs` for numeric checking of answers.
- Font: Heebo or Rubik (Google Fonts). Light + dark mode.

## Language & layout
- All UI text in Hebrew. `<html lang="he" dir="rtl">`.
- Display math blocks render `dir="ltr"` inside the RTL page; inline math must not break Hebrew sentence flow.
- Mobile-first — I'll use it a lot on my phone.
- Use proper Hebrew bagrut terminology (חקירת פונקציה, תחום הגדרה, נקודות קיצון, אסימפטוטות, סעיף א/ב/ג, etc.).

---

## Single source of truth: `src/data/syllabus/`
One file per questionnaire (`35581.ts`, `35582.ts`) plus `types.ts` and an `index.ts` that exports the list. Every screen derives from this data; no syllabus text hardcoded in components.

```ts
export type Status =
  | "in"            // בבגרות
  | "out-original"  // לא יופיע – לפי המיקוד המקורי
  | "out-2026";     // לא יופיע – הורדה נוספת 2026

export type Priority = "yellow" | "blue"; // yellow = study first, blue = study last

export interface Subtopic {
  id: string;
  title: string;          // Hebrew
  status: Status;
  keptExplicitly?: boolean; // the מיקוד explicitly says this REMAINS — show a "✓ נשאר במפורש" badge
  note?: string;          // Hebrew
}
export interface Topic { id: string; title: string; subtopics: Subtopic[]; note?: string }
export interface QuestionSlot {
  number: number;
  part: string;            // "א" | "ב" | "ג"
  title: string;
  priority: Priority;
  frequency?: "always" | "usually" | "rare";
  topicIds: string[];
  note?: string;
}
export interface Questionnaire {
  code: string;            // "35581"
  nickname: string;        // "806"
  weightPercent: number;
  durationMinutes: number;
  questionsToAnswer: number;
  totalQuestions: number;
  pointsPerQuestion: number;
  maxScore: number;        // 100
  chapterRestriction: boolean;
  partNotes: Record<string, string>;
  slots: QuestionSlot[];
  topics: Topic[];
  warnings: string[];
}
```

Global setting `focusMode: "focus-2026" | "full"`. In focus mode, `out-*` items are collapsed/greyed with a red "לא בבגרות" badge; in full mode everything shows normally. Progress percentages are always computed only over `in` subtopics.

---

## DATA — Questionnaire 35581 (806)

**Exam rules (summer 2026):** weight 60%. Duration **4 hours** (240 min; was 3.5h). Answer **5 of 8** questions, **no chapter restriction** (was: at least one per part). **22 points** per question (was 20); total score is capped at 100.

**Study order:** yellow first → questions 3, 4, 6, 7, 8. Blue last → questions 1, 2, 5.
**Warning to display:** "אי-למידת כל החומר כרוכה בסיכון."

**Question slots**

| # | Part | Title | Priority | Note |
|---|---|---|---|---|
| 1 | א | שאלות מילוליות | blue | |
| 2 | א | סדרות | blue | |
| 3 | א | הסתברות | yellow | |
| 4 | ב | גאומטריה במישור | yellow | שימוש בטריגונומטריה לא יידרש, אך מותר |
| 5 | ב | טריגונומטריה במישור | blue | |
| 6 | ג | חדו"א (חקירה ושטחים) של פולינום, מנה ושורש – למשל | yellow | |
| 7 | ג | חדו"א (חקירה ושטחים) של פונקציות טריגונומטריות – למשל | yellow | |
| 8 | ג | בעיות קיצון מילוליות – למשל | yellow | אחרי ההורדות נשארו בעיקר בעיות קיצון גרפיות |

**Part notes**
- פרק א: תהיה בדיוק שאלה אחת מכל נושא; לא בהכרח בסדר המוצג.
- פרק ב: תהיה בדיוק שאלה אחת מכל נושא; לא בהכרח בסדר המוצג.
- פרק ג: לא בהכרח שאלה אחת מכל נושא; לא בהכרח בסדר המוצג. הנושאים: חדו"א של פולינומים, שורש ריבועי, פונקציות רציונליות וטריגונומטריות.

**Topics & subtopics** (status in brackets)

מבוא לגאומטריה אנליטית
- קטעים: מרחק בין נקודות, אמצע קטע [in]
- ישרים: משוואת ישר לפי שיפוע ונקודה ולפי שתי נקודות; הקבלה, חיתוך וניצבות [in]
- מעגל שמרכזו בראשית הצירים (לצורך המעגל הטריגונומטרי) [in]

טכניקה אלגברית
- פירוק לגורמים: גורם משותף, נוסחאות הכפל המקוצר, פירוק טרינום (נוסחת השורשים / השלמה לריבוע); שברים אלגבריים [in]
- משוואות ממעלה ראשונה ושנייה; מערכות משוואות (ממעלה שנייה לכל היותר, שני משתנים) [in]
- משוואה ממעלה ראשונה עם פרמטר; מערכת ליניארית בשני משתנים עם פרמטר (פתרון יחיד / אינסוף / אין) ומשמעות גרפית [in]
- משוואות הנפתרות בהצבה (דו-ריבועית); משוואות אי-רציונליות (רק ברמה הנדרשת לחקירת פונקציות) [in]
- note: לא תידרש חקירת משוואה או מערכת ממעלה שנייה עם פרמטר (למעט בגאומטריה אנליטית)
- אי-שוויונות ממעלה ראשונה ושנייה ללא פרמטר; ריבועיים עם פרמטר רק בחדו"א ובשאלות מילוליות [in]
- אי-שוויונות רציונליים מהצורה $\frac{f(x)}{g(x)}\ge 0$ (f, g פולינומים עד מעלה 2), רק בהקשר חקירת פונקציות [in]
- משוואות עם ערך מוחלט אחד, למשל $|x^2-5x+6|=2$ או $\left|\frac{2x-5}{x+3}\right|=3$ [in]
- אי-שוויונות עם ערך מוחלט ללא פרמטרים (כחלק מבעיה, לא כסעיף נפרד), למשל $|2x-5|<3$ [in]
- חזקות וחוקי חזקות, מעריך רציונלי; שורשים: מכפלה ומנה, הכנסה/הוצאה של גורם, ביטול שורש במכנה [in]
- חילוק פולינום בפולינום ליניארי [out-original]

שאלות מילוליות (slot 1)
- שאלות תנועה [in, keptExplicitly]
- שאלות הספק [out-original]
- שאלות עם אחוזים (יכולות להופיע בכל הנושאים) [in]

סדרות (slot 2)
- סדרה הנדסית סופית ואינסופית: איבר כללי, סכום, מעבר בין נוסחת איבר כללי לכלל נסיגה ולהיפך [in, keptExplicitly] — note: נשאר כולל כלל הנסיגה של סדרה הנדסית
- סדרה חשבונית [out-2026]
- סדרות כלליות לפי מקום ולפי כלל נסיגה ("כלל נסיגה וסדרה כללית") [out-original]

הסתברות (slot 3)
- אקראיות, מרחב הסתברות סופי, חוקי ההסתברות [in]
- מאורעות תלויים ובלתי תלויים, הסתברות מותנית, נוסחת בייס [in]
- מרחב דו-שלבי ותלת-שלבי (טבלאות ועצים) [in]
- התפלגות בינומית (נוסחת ברנולי); קומבינטוריקה רק לצורך ההתפלגות הבינומית [in]

גאומטריה אוקלידית (slot 4)
- מצולעים: שטחים והיקפים; ארבעת משפטי החפיפה [in]
- משולשים ומרובעים: תכונות, משפטים, הוכחות; תיכונים, חוצי זווית, גבהים; משפט פיתגורס [in]
- משפט תאלס והמשפט ההפוך; קטע אמצעים; מפגש תיכונים; חלוקת קטע ביחס נתון (פנימית וחיצונית) [in]
- משפט חוצה זווית פנימית במשולש; שלושת משפטי הדמיון (ללא הוכחות) [in]
- יחס בין גבהים ויחס בין שטחים במשולשים דומים [in, keptExplicitly]
- יחס בין היקפים, תיכונים, חוצי זווית, רדיוסי מעגלים חוסמים וחסומים במשולשים דומים [out-original]
- יחס בין היקפים ובין שטחים במצולעים דומים [out-original]
- קטעים פרופורציוניים במשולש ישר זווית [out-original]
- מעגל: קשתות, מיתרים, מרחקים מהמרכז; זוויות היקפיות ומרכזיות ותכונותיהן [in]
- משיקים למעגל; שני מעגלים נחתכים / משיקים מבפנים ומבחוץ [in]
- מרובע חסום במעגל, מרובע חוסם מעגל; דמיון משולשים במעגל [in]
- קטעים פרופורציוניים במעגל (מיתרים נחתכים, חותך ומשיק מנקודה חיצונית, שני חותכים) [out-original]
- מקומות גאומטריים: אנך אמצעי וחוצה זווית; מפגש אנכים אמצעיים = מרכז מעגל חוסם; מפגש חוצי זוויות = מרכז מעגל חסום [in]
- משפטים שאינם בתכנית: משפט חוצה זווית חיצונית במשולש, והמשפט ההפוך לו [out-original]

טריגונומטריה (slot 5, and trig parts of slot 7)
- מחזוריות, היקף ושטח מעגל, אורך קשת, שטח גזרה, מעלות ורדיאנים [in]
- sin, cos, tan במעגל היחידה ותיאורן הגרפי; tan כשיפוע ישר [in]
- קשרים בין פונקציות של זוויות משלימות ל-90° ול-180°; ערכים לזוויות מיוחדות; זוגיות/אי-זוגיות [in]
- תיאור גרפי (מחזור, חיתוך צירים, מקסימום/מינימום, תחומי חיוביות ושליליות, עלייה וירידה), הזזות ומתיחות [in]
- משוואות: $\sin(ax+b)=c$, $\cos(ax+b)=c$, $\tan(ax+b)=c$, $a\sin x \pm b\cos x=0$, $\sin\alpha=\sin\beta$, $\cos\alpha=\cos\beta$, $\tan\alpha=\tan\beta$ — פתרון כללי ובתחום נתון, כולל פירוק לגורמים ומשוואה ריבועית [in]
- זהויות: $\tan x=\frac{\sin x}{\cos x}$, $\sin^2x+\cos^2x=1$, $\sin(\alpha\pm\beta)$, $\cos(\alpha\pm\beta)$, $\sin2\alpha$, $\cos2\alpha$ [in]
- זהויות $\sin\alpha\pm\sin\beta$, $\cos\alpha\pm\cos\beta$ [out-2026]
- פתרון מצולעים המתפרקים למשולשים ישרי זווית; משפט הסינוסים; משפט הקוסינוסים; $S=\frac12 ab\sin\gamma$ [in]
- בעיות גאומטריות במישור (כולל בעיות טריגו בחדו"א) [in]
- notes: לא יידרש פתרון $a\sin x+b\cos x=c$ כאשר $a\ne b$ ו-$c\ne0$; משוואות טריגו לא כתרגיל עצמאי אלא כחלק מבעיה; לא יידרש זיהוי משולש לפי משוואה טריגונומטרית.

חשבון דיפרנציאלי (slots 6–8)
- משיק, שיפוע, נגזרת; גבול אינטואיטיבי; נגזרת כתהליך גבולי [in]
- נקודות חיתוך, עלייה/ירידה, זוגיות; משמעות נקודות חיתוך, $f(x)-g(x)$, $f(x)>g(x)$ [in]
- נגזרות של $x^k$, סכום, הפרש, מכפלה, מנה, הרכבה — לפולינומים, פונקציות רציונליות, טריגונומטריות ושורש ריבועי [in]
- $|x|$, אי-גזירות ב-0, ערך מוחלט של פונקציה [in]
- נגזרת שנייה, קעירות, נקודות פיתול [in]
- משוואת משיק בנקודה על הגרף [in]
- משוואת משיק מנקודה מחוץ לגרף [out-original]
- חקירה ושרטוט: תחום, חיתוך, עלייה/ירידה, קיצון מקומי ומוחלט, קעירות, פיתול, התנהגות ליד נקודות אי-הגדרה, אסימפטוטות מקבילות לצירים [in]
- הקשר בין $f$, $f'$, $f''$ [in]
- בעיות קיצון גרפיות [in, keptExplicitly]
- בעיות קיצון: מספרים, גופים במרחב, תנועה, כלכליות [out-original]
- בעיות קיצון עם פונקציות טריגונומטריות או עם אינטגרל [out-original]
- בעיות קיצון גאומטריות [out-2026]

חשבון אינטגרלי
- אינטגרל לא מסוים, פונקציה קדומה, קבוע אינטגרציה, אינטגרלים מיידיים, סכום וכפל בקבוע [in]
- אינטגרל של פולינומים; של $\frac{c\,f'(x)}{(f(x))^n}$ ($n\ne1$) [in]
- מציאת פונקציה לפי נגזרת ונקודה; אינטגרל של פונקציה נגזרת שמוביל לפונקציה הקדומה [in, keptExplicitly]
- אינטגרל של פונקציה מורכבת $\int f'(u)\,u'\,dx$ [in] — note: כשהפונקציה היא שורש או טריגונומטרית – לא בבגרות לפי המיקוד (ראו השורות הבאות)
- אינטגרל של פונקציית שורש (כולל $\frac{c\,f'(x)}{\sqrt{f(x)}}$) או של פונקציה טריגונומטרית [out-original]
- אינטגרל של פונקציה רציונלית עם מכנה ליניארי בעזרת חילוק פולינומים [out-original]
- אינטגרל מסוים; שטח בין גרף לציר x (חיובית / שלילית / מחליפה סימן); שטח בין שני גרפים; שטחים מורכבים [in]
- נפח גוף סיבוב [out-original]
- בעיות ערך קיצון עם אינטגרל [out-original]

---

## DATA — Questionnaire 35582 (807)

**Exam rules (summer 2026):** weight 40%. Duration **2 hours 55 minutes** (175 min; was 2.5h). Answer **3 of 5**, **no chapter restriction** (was: at least one per part). **33⅓ points** per question.

**Study order:** yellow first → questions 3, 4, 5. Blue last → questions 1, 2.
**Warning to display:** "אי-למידת כל החומר כרוכה בסיכון (למשל: אין מחויבות לשאלה במרוכבים, אבל בפועל נהוג לכלול שאלה כזו)."

**Question slots**

| # | Part | Title | Priority | Frequency |
|---|---|---|---|---|
| 1 | א | גאומטריה אנליטית | blue | usually |
| 2 | א | וקטורים (כולל טריגונומטריה במרחב) | blue | usually |
| 3 | א | מספרים מרוכבים (כולל אלמנטים מאנליטית וסדרות) | yellow | usually |
| 4 | ב | חדו"א (חקירה, שטחים) של פונקציות מעריכיות ולוגריתמיות, כולל שילוב פולינום ורציונלית | yellow | usually |
| 5 | ב | כמו שאלה 4 | yellow | usually |

**Part notes:** בכל פרק – לא בהכרח שאלה אחת בדיוק מכל נושא (אם בכלל). נושא שמופיע לעיתים רחוקות: חדו"א של פונקציות חזקה עם מעריך רציונלי. (גדילה ודעיכה ושילוב חדו"א עם טריגו – הוצאו ב-2026.)

**Topics & subtopics**

וקטורים
- וקטורים גאומטריים במישור ובמרחב: חיבור, חיסור, כפל בסקלר, קומבינציה ליניארית, חלוקת קטע ביחס נתון; חישובים והוכחות [in]
- מכפלה סקלרית ותכונותיה; ניצבות בין ישרים ובין ישר למישור; חישובי אורך וזווית [in]
- מערכת צירים במרחב; הצגה אלגברית ופעולות [in]
- הצגה פרמטרית של ישר; מצב הדדי בין ישרים [in]
- הצגה פרמטרית של מישור ומשוואת מישור; מצב הדדי מישור–מישור וישר–מישור [in]
- מרחק בין שתי נקודות [in, keptExplicitly]
- מרחקים: נקודה–ישר, נקודה–מישור, ישרים מקבילים, ישרים מצטלבים, ישר–מישור, מישורים מקבילים [out-2026]
- זווית בין שני ישרים; זווית בין ישר למישור [in]
- זווית בין שני מישורים [out-2026]
- משפטים לשימוש ללא הוכחה [in]: (א) ישר ניצב למישור אם״ם הוא ניצב לשני ישרים לא מקבילים במישור; (ב) ישר במישור ניצב להיטל אם״ם הוא ניצב למשופע; (ג) ישר ניצב למישור ABC אם״ם $\vec l\cdot\vec{OA}=\vec l\cdot\vec{OB}=\vec l\cdot\vec{OC}$; (ד) כל וקטור במישור ניתן להצגה יחידה כקומבינציה ליניארית של שני וקטורים בלתי תלויים במישור; (ה) כל שלושה וקטורים בלתי תלויים במרחב הם בסיס.
- note: לומדים הוכחות בעזרת וקטורים, אבל בבחינה לא תידרש הוכחת משפט גאומטרי בעזרת וקטורים.

טריגונומטריה במרחב
- חישובי זוויות, אורכים, שטחים (כולל מעטפת/שטח פנים) ונפחים בגופים ישרים: תיבה (כולל קובייה), מנסרה, פירמידה [in]
- ישר ניצב למישור, היטל, זווית בין ישרים, בין ישר למישור, בין מישורים, משפט שלושת האנכים [in] — note: "זווית בין מישורים" הוצאה בנושא הווקטורים; בטריגו במרחב לא צוין – לבדוק מול המורה
- פתרון משולשים: $S=\frac12ab\sin\gamma$, משפט הסינוסים והקוסינוסים [in]

מספרים מרוכבים
- הגדרה, שוויון, ארבע פעולות, ערך מוחלט, צמוד, שורש ריבועי [in]
- הצגה במישור גאוס; משפט דה-מואבר; שורשי יחידה; שורשים [in]
- משמעויות גאומטריות של ארבע הפעולות, הערך המוחלט והשורשים [in]
- note: ייתכן שיידרש ידע בסדרות ושימוש בזהויות טריגונומטריות

גאומטריה אנליטית
- מרחק בין נקודות, חלוקת קטע ביחס נתון [in]
- משוואת ישר, חיתוך, ישרים מקבילים וניצבים, מרחק נקודה מישר [in]
- מעגל כללי; התנאי ש-$Ax^2+By^2+Cx+Dy+E=0$ מתאר מעגל; משיק למעגל בנקודה עליו [in]
- אליפסה: מקום גאומטרי, משוואה קנונית, צירים ומוקדים, מצב הדדי ישר–אליפסה לפי סימן הדיסקרימיננטה [in]
- בעיות המשלבות צורות; מקומות גאומטריים [in]
- פרבולה (מקום גאומטרי, משוואה קנונית, מוקד, מדריך, משיק) [out-2026]

אלגברה: חזקות, מעריכיות, לוגריתמים
- חוקי חזקות, מעריך רציונלי, שורשים, ביטול שורש במכנה [in]
- פונקציות מעריכיות: תכונות וגרף; משוואות ואי-שוויונות מעריכיים (כנדרש בחדו"א) [in]
- לוגריתמים: חוקי לוג, מעבר בסיס; פונקציות לוגריתמיות; משוואות ואי-שוויונות לוגריתמיים (כנדרש בחדו"א) [in]

בעיות גדילה ודעיכה
- גדילה ודעיכה מעריכית, זמן מחצית חיים (כל הנושא) [out-2026]

חשבון דיפרנציאלי ואינטגרלי (slots 4–5)
- מושגי יסוד, גבול אינטואיטיבי, $|x|$, חיתוך, עלייה/ירידה, זוגיות [in]
- נגזרות של $e^x$, $\ln x$, פונקציות חזקה עם מעריך רציונלי, ושילובן עם פולינום ופונקציה רציונלית; סכום, מכפלה, מנה, הרכבה [in]
- פונקציות מעריכיות ולוגריתמיות בבסיס שונה מ-e ($a^x$, $\log_a x$) [out-2026]
- שילוב פונקציות מעריכיות ולוגריתמיות עם פונקציות טריגונומטריות או שורש [out-2026]
- נגזרת שנייה, קעירות, פיתול; משיק בנקודה על הגרף [in]
- משיק מנקודה מחוץ לגרף [out-original]
- חקירה ושרטוט, כולל אסימפטוטות מקבילות לצירים: ל-$e^x$, $\ln x$ ושילובים פשוטים – נדרש; ל-$e^{f(x)}$, $\ln f(x)$ – רק כשמציאתן פשוטה; למכפלה או מנה של פונקציית חזקה עם אחת מהן – לא נדרש [in]
- הקשר בין $f$, $f'$, $f''$ [in]
- בעיות קיצון (כל הסוגים) [out-2026]
- אינטגרלים של $x^r$, $e^x$, $\frac1x$, ושל $[f(x)]^r$, $e^{f(x)}$, $\frac{1}{f(x)}$ כאשר f ליניארית; $\frac{f'(x)}{f(x)}$ — למשל $\int\frac{e^x}{e^x+1}dx=\ln(e^x+1)+C$ [in]
- אינטגרל של $a^x$, $a^{f(x)}$ (בסיס שונה מ-e) [out-2026]
- אינטגרל של פונקציות טריגונומטריות או שורש [out-original]
- חילוק פולינומים (כמו $\int\frac{x^3-x^2+x-1}{x+3}dx$) [out-original]
- אינטגרל מסוים; שטח בין גרף לציר x; שטח בין שני גרפים; שטחים מורכבים [in]
- מציאת פונקציה לפי נגזרת ונקודה; אינטגרל של פונקציה נגזרת שמוביל לפונקציה הקדומה [in, keptExplicitly]
- נפח גוף סיבוב [out-original]
- note: החדו"א כאן כולל את כל הנושאים והשימושים הנדרשים גם בשאלון 35581 (בכפוף להורדות).

---

## Phases

### Phase 1 — Scaffold + syllabus map
- Project setup, routing, RTL, theme toggle, fonts, KaTeX rendering verified.
- Syllabus data files fully populated from the DATA sections above (every line, every status, every note).
- **Dashboard:** a card per questionnaire with exam rules (duration, answer X of Y, points per question, weight), progress ring, and a countdown to the exam date. No default date — if unset, show "הגדר תאריך בחינה" linking to Settings.
- **Syllabus map page** per questionnaire: parts → slots (yellow "ללמוד קודם" / blue "ללמוד בסוף" badge) → topics → subtopics with status badges: green "בבגרות", red "לא בבגרות", orange "הורדה 2026", plus "✓ נשאר במפורש" for keptExplicitly. Focus/full toggle. Warnings shown at the top.
- **Self-rating** per `in` subtopic: לא התחלתי / חלש / בינוני / שולט. Progress bars per slot and per questionnaire.
- **Settings:** exam dates per questionnaire, focus mode, export/import/reset.
- A unit test that validates the data: unique ids, every slot's `topicIds` exist, statuses valid.

### Phase 2 — Topic pages + practice
- **Topic page:** תקציר (definitions, formulas, typical bagrut question patterns, common mistakes), worked examples, practice list. Only cover `in` subtopics; show out-of-exam subtopics as a collapsed "לא בבגרות" section.
- **Problem model** in `src/data/problems/*.ts`: `id, questionnaire, slot, topicId, subtopicIds, difficulty (1–3), sections[] (סעיף א/ב/ג… each with statement, hints[], solutionSteps[], finalAnswer, numericAnswer?), verified: boolean, source: "ai-generated" | "teacher" | "self"`.
- Seed **3 original bagrut-style multi-section problems for each yellow slot** (35581: 3, 4, 6, 7, 8; 35582: 3, 4, 5), using only `in` subtopics. All seeded problems: `verified: false`, shown with a "⚠ לא נבדק" badge until I tick "בדקתי".
- **Math verification:** for every seeded section with a numeric answer, add a vitest test that recomputes it independently with mathjs (e.g. solve f'(x)=0 numerically, definite integrals via Simpson's rule, probabilities by direct computation). If a test fails, fix the problem, not the test.
- **Practice flow:** statement → "רמז" reveals hints one at a time → "הצג פתרון" → per-section self-mark (צדקתי / חלקית / טעיתי) → on טעיתי, offer to log a mistake.
- **Interactive tools (mafs):** function explorer (type f(x); toggle f′ and f″; mark extrema, inflection points, asymptotes) and unit circle (drag angle; show sin/cos/tan and the related angles 180°−α, −α, 180°+α). Embed them in the relevant topic pages.
- **Past-exams tracker:** I log real past exams I solved (year, מועד, questionnaire, question #, score, notes, link). Store links only — never copy exam text into the site. Include a link to the Ministry's official solutions page: https://students.education.gov.il/matriculation-exams/solutions

### Phase 3 — Exam simulator + mistakes log
- **Simulator** per questionnaire: one problem per slot (random from the bank or chosen), all slots visible, I choose which N to answer. Countdown with the real duration (240 / 175 min), alert at 30 and 10 minutes left.
- After: self-grade each chosen question (full / partial with % / none). Score: 35581 = min(100, Σ 22 × fraction); 35582 = Σ 33⅓ × fraction. Save history; show a score-over-time chart.
- **Mistakes log (יומן טעויות):** topic, type (חישוב / הבנה / קריאת שאלה / ניהול זמן), what went wrong, the correct approach. Problems marked wrong enter a spaced-review queue (1, 3, 7, 14 days) shown on the dashboard.
- **Personal formula sheet:** compiled from topic summaries, printable, labelled clearly "סיכום אישי – לא דף הנוסחאות הרשמי".

### Phase 4 — Study planner
- I enter available days/hours per week and the exam date. Generate an editable weekly plan: yellow slots first, then blue, then full simulations in the last 3 weeks; weight toward subtopics I rated חלש.

---

## Quality bar
- Math correctness first. Never present unverified AI-generated math as fact (see the "⚠ לא נבדק" rule).
- Small typed components, no `any`, no syllabus text inside components.
- README in Hebrew: how to run (`npm install`, `npm run dev`), how to edit the syllabus data and focus flags, how to add a problem, how to add a new questionnaire.
- Accessible: keyboard navigation, visible focus, good contrast in both themes.

**Start with Phase 1 now.**
