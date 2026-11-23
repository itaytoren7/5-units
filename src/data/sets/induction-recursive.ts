import type { Exercise, ExerciseSet } from './types';

/**
 * סט: אינדוקציה – סדרות בכלל נסיגה (שאלון 35581, שאלה 3).
 * הוכחת נוסחה לאיבר הכללי של סדרה הנתונה בכלל נסיגה.
 * 1–4 צעד אחד · 5–8 שלבי ההוכחה מפוצלים לסעיפים · 9–12 הוכחה מלאה ושימוש בנוסחה שהוכחה.
 */

const T = 'induction';
const S = ['induction-recursive'];

/** The closing step of every model proof. */
const CONCLUSION = String.raw`מסקנה: הטענה נכונה עבור $n=1$, ומנכונותה עבור $n=k$ נובעת נכונותה עבור $n=k+1$. לכן, לפי עקרון האינדוקציה המתמטית, הטענה נכונה לכל $n$ טבעי.`;

const e1: Exercise = {
  id: 'inr-1',
  level: 1,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי כלל הנסיגה $a_1=1,\ a_{n+1}=a_n+6n$. בשרטוט מוצגים שני האיברים הראשונים של הסדרה.`,
  diagram: { kind: 'seq', terms: [1, 7], style: 'bars' },
  solutionDiagram: { kind: 'seq', terms: [1, 7, 19, 37], style: 'bars', highlight: [4] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $a_4$.`,
      hints: [String.raw`בכלל הנסיגה, $n$ הוא המקום של האיבר הקודם. כדי לקבל את $a_3$ מציבים $n=2$.`, String.raw`$a_3=a_2+6\cdot 2=19$. עכשיו הציבו $n=3$ כדי לקבל את $a_4$.`],
      check: { kind: 'numeric', answer: 37, verify: '1+6*1+6*2+6*3' },
      short: String.raw`$a_3=a_2+6\cdot 2=19$, ולכן $a_4=a_3+6\cdot 3=37$.`,
      full: [String.raw`בכלל הנסיגה $a_{n+1}=a_n+6n$ המספר $n$ הוא המקום של האיבר הקודם (זה שבאגף ימין).`, String.raw`$n=1$: $a_2=a_1+6\cdot 1=1+6=7$, כמו בשרטוט.`, String.raw`$n=2$: $a_3=a_2+6\cdot 2=7+12=19$.`, String.raw`$n=3$: $a_4=a_3+6\cdot 3=19+18=37$.`],
    },
  ],
};

const e2: Exercise = {
  id: 'inr-2',
  level: 1,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי כלל הנסיגה $a_1=5,\ a_{n+1}=2a_n-3$ (ראו שרטוט). רוצים להוכיח באינדוקציה שהאיבר הכללי של הסדרה הוא $a_n=2^n+c$, כאשר $c$ מספר קבוע.`,
  diagram: { kind: 'seq', terms: [5, 7, 11, 19], style: 'dots' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכחה באינדוקציה מתחילה בבדיקה עבור $n=1$. מצאו את הערך של $c$ שעבורו הנוסחה נכונה כאשר $n=1$.`,
      hints: [String.raw`בשלב הבדיקה מציבים $n=1$ בנוסחה, ומשווים את התוצאה לאיבר הראשון הנתון.`, String.raw`$2^1+c=5$.`],
      check: { kind: 'numeric', answer: 3, verify: '5-2^1' },
      short: String.raw`עבור $n=1$: $2^1+c=a_1=5$, ולכן $c=3$.`,
      full: [String.raw`בשלב הבדיקה מציבים $n=1$ בנוסחה ומשווים לאיבר הראשון הנתון, $a_1=5$.`, String.raw`$a_1=2^1+c=2+c$, ולכן $2+c=5$ ו-$c=3$. הנוסחה היא $a_n=2^n+3$.`, String.raw`לדוגמה, $a_2=2\cdot 5-3=7$, ואכן $2^2+3=7$. בדיקה של איברים בודדים אינה הוכחה: את הנכונות לכל $n$ מוכיחים בצעד האינדוקציה, $a_{k+1}=2a_k-3=2\left(2^k+3\right)-3=2^{k+1}+3$.`],
    },
  ],
};

const e3: Exercise = {
  id: 'inr-3',
  level: 1,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי כלל הנסיגה $a_1=3,\ a_{n+1}=3a_n-2$ (ראו שרטוט). רוצים להוכיח באינדוקציה שלכל $n$ טבעי $a_n=2\cdot 3^{n-1}+1$. הנחת האינדוקציה היא $a_k=2\cdot 3^{k-1}+1$.`,
  diagram: { kind: 'seq', terms: [3, 7, 19, 55], style: 'dots' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מה צריך להוכיח עבור $n=k+1$?`,
      hints: [String.raw`מציבים $k+1$ במקום $n$ בנוסחה שרוצים להוכיח (ולא בכלל הנסיגה).`, String.raw`המעריך $n-1$ הופך ל-$(k+1)-1$.`],
      check: { kind: 'choice', options: [String.raw`$a_{k+1}=2\cdot 3^{k+1}+1$`, String.raw`$a_{k+1}=3a_k-2$`, String.raw`$a_{k+1}=2\cdot 3^{k}+1$`, String.raw`$a_{k+1}=2\cdot 3^{k-1}+2$`], correct: 2 },
      short: String.raw`מציבים $n=k+1$ בנוסחה: $a_{k+1}=2\cdot 3^{(k+1)-1}+1=2\cdot 3^{k}+1$.`,
      full: [String.raw`מה שצריך להוכיח הוא הנוסחה עצמה, כאשר במקום $n$ כותבים $k+1$.`, String.raw`$a_{k+1}=2\cdot 3^{(k+1)-1}+1=2\cdot 3^{k}+1$.`, String.raw`השוויון $a_{k+1}=3a_k-2$ הוא כלל הנסיגה הנתון. אותו לא מוכיחים, אלא משתמשים בו בהוכחה.`, String.raw`ההוכחה עצמה: $a_{k+1}=3a_k-2=3\left(2\cdot 3^{k-1}+1\right)-2=2\cdot 3^{k}+3-2=2\cdot 3^{k}+1$.`],
    },
  ],
};

const e4: Exercise = {
  id: 'inr-4',
  level: 1,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי כלל הנסיגה $a_1=2,\ a_{n+1}=a_n+2n$ (ראו שרטוט). רוצים להוכיח באינדוקציה שלכל $n$ טבעי $a_n=n^2-n+2$. הנחת האינדוקציה היא $a_k=k^2-k+2$.`,
  diagram: { kind: 'seq', terms: [2, 4, 8, 14], style: 'dots' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מציבים את הנחת האינדוקציה בכלל הנסיגה. איזה ביטוי מתקבל עבור $a_{k+1}$?`,
      hints: [String.raw`כתבו את כלל הנסיגה כאשר $n=k$. שימו לב איזה מספר מוכפל ב-$2$.`, String.raw`$a_{k+1}=a_k+2k$, ובמקום $a_k$ כותבים את הביטוי שבהנחת האינדוקציה.`],
      check: { kind: 'choice', options: [String.raw`$k^2-k+2+2(k+1)$`, String.raw`$k^2-k+2+2k$`, String.raw`$(k+1)^2-(k+1)+2+2k$`, String.raw`$k^2-k+2+2$`], correct: 1 },
      short: String.raw`כלל הנסיגה עבור $n=k$ הוא $a_{k+1}=a_k+2k$, ולכן $a_{k+1}=k^2-k+2+2k$.`,
      full: [String.raw`בכלל הנסיגה $a_{n+1}=a_n+2n$ מציבים $n=k$ ומקבלים $a_{k+1}=a_k+2k$. המספר שמוכפל ב-$2$ הוא המקום של האיבר הקודם, כלומר $k$ ולא $k+1$.`, String.raw`לפי הנחת האינדוקציה $a_k=k^2-k+2$, ולכן $a_{k+1}=k^2-k+2+2k=k^2+k+2$.`, String.raw`זה בדיוק מה שצריך להוכיח, כי $(k+1)^2-(k+1)+2=k^2+2k+1-k-1+2=k^2+k+2$.`, String.raw`בביטוי $(k+1)^2-(k+1)+2+2k$ כבר השתמשו בנוסחה עבור $k+1$, שאותה עוד לא הוכחנו. לכן הוא אינו מתאים.`],
    },
  ],
};

const e5: Exercise = {
  id: 'inr-5',
  level: 2,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי כלל הנסיגה $a_1=1,\ a_{n+1}=a_n+2n+1$. בשרטוט מוצגים שלושת האיברים הראשונים של הסדרה.`,
  diagram: { kind: 'seq', terms: [1, 4, 9], style: 'dots' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $a_5$ לפי כלל הנסיגה.`,
      hints: [String.raw`ממשיכים מ-$a_3=9$: כדי לקבל את $a_4$ מציבים בכלל הנסיגה $n=3$.`, String.raw`$a_4=9+2\cdot 3+1=16$. עכשיו הציבו $n=4$.`],
      check: { kind: 'numeric', answer: 25, verify: '1+(2*1+1)+(2*2+1)+(2*3+1)+(2*4+1)' },
      short: String.raw`$a_4=9+2\cdot 3+1=16$, ולכן $a_5=16+2\cdot 4+1=25$.`,
      full: [String.raw`$n=3$: $a_4=a_3+2\cdot 3+1=9+7=16$.`, String.raw`$n=4$: $a_5=a_4+2\cdot 4+1=16+9=25$.`, String.raw`האיברים הראשונים הם $1,4,9,16,25$: נראה שכל איבר הוא ריבוע המקום שלו.`],
    },
    {
      label: 'ב',
      prompt: String.raw`לפי האיברים הראשונים משערים שלכל $n$ טבעי $a_n=n^2$, ורוצים להוכיח זאת באינדוקציה. מניחים ש-$a_k=k^2$. מה מתקבל כאשר מציבים את ההנחה בכלל הנסיגה?`,
      hints: [String.raw`כתבו את כלל הנסיגה כאשר $n=k$.`, String.raw`$a_{k+1}=a_k+2k+1$, ובמקום $a_k$ כותבים $k^2$.`],
      check: { kind: 'choice', options: [String.raw`$a_{k+1}=k^2+2(k+1)+1$`, String.raw`$a_{k+1}=(k+1)^2+2k+1$`, String.raw`$a_{k+1}=k^2+2k+1$`], correct: 2 },
      short: String.raw`כלל הנסיגה עבור $n=k$: $a_{k+1}=a_k+2k+1=k^2+2k+1$.`,
      full: [String.raw`בכלל הנסיגה $a_{n+1}=a_n+2n+1$ מציבים $n=k$: $a_{k+1}=a_k+2k+1$.`, String.raw`לפי ההנחה $a_k=k^2$, ולכן $a_{k+1}=k^2+2k+1$.`, String.raw`בביטוי $k^2+2(k+1)+1$ הוצב $k+1$ במקום $n$ רק בחלק מהכלל, ובביטוי $(k+1)^2+2k+1$ הוצבה הנוסחה עבור $k+1$, שאותה עוד לא הוכחנו.`],
    },
    {
      label: 'ג',
      prompt: String.raw`כתבו הוכחה מלאה באינדוקציה לטענה: לכל $n$ טבעי $a_n=n^2$.`,
      hints: [String.raw`שלושה שלבים: בדיקה עבור $n=1$, הנחה עבור $n=k$, והוכחה עבור $n=k+1$.`, String.raw`צריך להוכיח ש-$a_{k+1}=(k+1)^2$. היעזרו בסעיף ב ובנוסחת הכפל המקוצר $(k+1)^2=k^2+2k+1$.`],
      check: { kind: 'self' },
      short: String.raw`בדיקה: $1^2=1=a_1$. צעד: $a_{k+1}=a_k+2k+1=k^2+2k+1=(k+1)^2$.`,
      full: [String.raw`בדיקה עבור $n=1$: לפי הנוסחה $1^2=1$, וזה האיבר הראשון הנתון, $a_1=1$.`, String.raw`הנחת האינדוקציה: נניח שהטענה נכונה עבור $n=k$ ($k$ טבעי), כלומר $a_k=k^2$.`, String.raw`צריך להוכיח שהטענה נכונה עבור $n=k+1$, כלומר $a_{k+1}=(k+1)^2$.`, String.raw`הוכחה: לפי כלל הנסיגה $a_{k+1}=a_k+2k+1$. לפי ההנחה $a_k=k^2$, ולכן $a_{k+1}=k^2+2k+1=(k+1)^2$.`, CONCLUSION],
    },
  ],
};

const e6: Exercise = {
  id: 'inr-6',
  level: 2,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי כלל הנסיגה $a_1=1,\ a_{n+1}=2a_n+1$ (ראו שרטוט). טוענים שלכל $n$ טבעי $a_n=2^n-1$.`,
  diagram: { kind: 'seq', terms: [1, 3, 7, 15], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`בהוכחה באינדוקציה מניחים ש-$a_k=2^k-1$, ומציבים בכלל הנסיגה: $a_{k+1}=2\left(2^k-1\right)+1$. לאיזה ביטוי שווה אגף ימין?`,
      hints: [String.raw`פתחו סוגריים וכנסו את המספרים.`, String.raw`לפי חוקי החזקות $2\cdot 2^k=2^1\cdot 2^k=2^{k+1}$.`],
      check: { kind: 'choice', options: [String.raw`$4^k-1$`, String.raw`$2^{k+1}-1$`, String.raw`$2^{k+1}+1$`, String.raw`$2^{2k}-1$`], correct: 1 },
      short: String.raw`$2\left(2^k-1\right)+1=2\cdot 2^k-2+1=2^{k+1}-1$.`,
      full: [String.raw`פותחים סוגריים: $2\left(2^k-1\right)+1=2\cdot 2^k-2+1$.`, String.raw`כפל חזקות בעלות אותו בסיס: $2\cdot 2^k=2^{1+k}=2^{k+1}$. (לא $4^k$: $4^k=2^{2k}$.)`, String.raw`לכן $a_{k+1}=2^{k+1}-1$, וזו בדיוק הנוסחה עבור $n=k+1$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`כתבו הוכחה מלאה באינדוקציה לטענה: לכל $n$ טבעי $a_n=2^n-1$.`,
      hints: [String.raw`בדיקה עבור $n=1$, הנחה עבור $n=k$, והוכחה עבור $n=k+1$.`, String.raw`צריך להוכיח ש-$a_{k+1}=2^{k+1}-1$. התחילו מכלל הנסיגה $a_{k+1}=2a_k+1$ והציבו את ההנחה.`],
      check: { kind: 'self' },
      short: String.raw`בדיקה: $2^1-1=1=a_1$. צעד: $a_{k+1}=2a_k+1=2\left(2^k-1\right)+1=2^{k+1}-1$.`,
      full: [String.raw`בדיקה עבור $n=1$: לפי הנוסחה $2^1-1=1$, וזה האיבר הראשון הנתון, $a_1=1$.`, String.raw`הנחת האינדוקציה: נניח שהטענה נכונה עבור $n=k$ ($k$ טבעי), כלומר $a_k=2^k-1$.`, String.raw`צריך להוכיח שהטענה נכונה עבור $n=k+1$, כלומר $a_{k+1}=2^{k+1}-1$.`, String.raw`הוכחה: לפי כלל הנסיגה $a_{k+1}=2a_k+1$. לפי ההנחה: $a_{k+1}=2\left(2^k-1\right)+1=2^{k+1}-2+1=2^{k+1}-1$.`, CONCLUSION],
    },
    {
      label: 'ג',
      prompt: String.raw`היעזרו בנוסחה שהוכחתם וחשבו את $a_{10}$.`,
      hints: [String.raw`אין צורך לחשב את כל האיברים שלפניו: מציבים $n=10$ בנוסחה $a_n=2^n-1$.`, String.raw`$2^{10}=1024$.`],
      check: { kind: 'numeric', answer: 1023, verify: '2^10-1' },
      short: String.raw`$a_{10}=2^{10}-1=1023$.`,
      full: [String.raw`הנוסחה לאיבר הכללי מאפשרת לחשב כל איבר ישירות, בלי לעבור דרך האיברים שלפניו.`, String.raw`$a_{10}=2^{10}-1=1024-1=1023$.`],
    },
  ],
};

const e7: Exercise = {
  id: 'inr-7',
  level: 2,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי כלל הנסיגה $a_1=1,\ a_{n+1}=\dfrac{a_n}{1+2a_n}$. בשרטוט מוצגים שני האיברים הראשונים של הסדרה.`,
  diagram: { kind: 'seq', terms: [1, 0.3333], style: 'dots' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $a_3$.`,
      hints: [String.raw`$a_2=\dfrac{a_1}{1+2a_1}=\dfrac13$. הציבו את $a_2$ בכלל הנסיגה.`, String.raw`$a_3=\dfrac{\frac13}{1+2\cdot\frac13}$. המכנה שווה ל-$\dfrac53$.`],
      check: { kind: 'numeric', answer: 0.2, verify: '(1/(1+2*1))/(1+2*(1/(1+2*1)))' },
      short: String.raw`$a_2=\dfrac13$, ולכן $a_3=\dfrac{\frac13}{1+\frac23}=\dfrac{\frac13}{\frac53}=\dfrac15$.`,
      full: [String.raw`$a_2=\dfrac{a_1}{1+2a_1}=\dfrac{1}{1+2}=\dfrac13$.`, String.raw`$a_3=\dfrac{a_2}{1+2a_2}=\dfrac{\frac13}{1+\frac23}=\dfrac{\frac13}{\frac53}=\dfrac15=0.2$.`, String.raw`האיברים הראשונים הם $1,\dfrac13,\dfrac15$: המונה $1$ והמכנים הם המספרים האי-זוגיים.`],
    },
    {
      label: 'ב',
      prompt: String.raw`טוענים שלכל $n$ טבעי $a_n=\dfrac{1}{2n-1}$. בהוכחה באינדוקציה מניחים ש-$a_k=\dfrac{1}{2k-1}$. מה צריך להוכיח עבור $n=k+1$?`,
      hints: [String.raw`מציבים $k+1$ במקום $n$ בנוסחה $\dfrac{1}{2n-1}$.`, String.raw`$2(k+1)-1=2k+2-1$.`],
      check: { kind: 'choice', options: [String.raw`$a_{k+1}=\dfrac{1}{2k}$`, String.raw`$a_{k+1}=\dfrac{1}{2k+1}$`, String.raw`$a_{k+1}=\dfrac{1}{2k-1}+1$`, String.raw`$a_{k+1}=\dfrac{1}{2k+2}$`], correct: 1 },
      short: String.raw`$a_{k+1}=\dfrac{1}{2(k+1)-1}=\dfrac{1}{2k+1}$.`,
      full: [String.raw`מציבים $n=k+1$ בנוסחה: $a_{k+1}=\dfrac{1}{2(k+1)-1}$.`, String.raw`$2(k+1)-1=2k+2-1=2k+1$, ולכן צריך להוכיח ש-$a_{k+1}=\dfrac{1}{2k+1}$.`, String.raw`טעות נפוצה: להוסיף $1$ למכנה ולקבל $\dfrac{1}{2k}$. ה-$1$ מתווסף ל-$k$, ולכן המכנה גדל ב-$2$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`השלימו את ההוכחה: בדקו את הטענה עבור $n=1$, והוכיחו שמההנחה $a_k=\dfrac{1}{2k-1}$ נובע $a_{k+1}=\dfrac{1}{2k+1}$.`,
      hints: [String.raw`התחילו מכלל הנסיגה עבור $n=k$: $a_{k+1}=\dfrac{a_k}{1+2a_k}$, והציבו את ההנחה במונה ובמכנה.`, String.raw`במכנה: $1+\dfrac{2}{2k-1}=\dfrac{2k-1+2}{2k-1}=\dfrac{2k+1}{2k-1}$.`, String.raw`חילוק בשבר הוא כפל בשבר ההופכי: $\dfrac{1}{2k-1}\cdot\dfrac{2k-1}{2k+1}$.`],
      check: { kind: 'self' },
      short: String.raw`בדיקה: $\dfrac{1}{2\cdot 1-1}=1=a_1$. צעד: $a_{k+1}=\dfrac{\frac{1}{2k-1}}{1+\frac{2}{2k-1}}=\dfrac{\frac{1}{2k-1}}{\frac{2k+1}{2k-1}}=\dfrac{1}{2k+1}$.`,
      full: [String.raw`בדיקה עבור $n=1$: לפי הנוסחה $\dfrac{1}{2\cdot 1-1}=1$, וזה האיבר הראשון הנתון, $a_1=1$.`, String.raw`הנחת האינדוקציה: $a_k=\dfrac{1}{2k-1}$. צריך להוכיח: $a_{k+1}=\dfrac{1}{2k+1}$.`, String.raw`לפי כלל הנסיגה ולפי ההנחה: $a_{k+1}=\dfrac{a_k}{1+2a_k}=\dfrac{\frac{1}{2k-1}}{1+\frac{2}{2k-1}}$.`, String.raw`מכנה משותף במכנה: $1+\dfrac{2}{2k-1}=\dfrac{2k-1+2}{2k-1}=\dfrac{2k+1}{2k-1}$.`, String.raw`לכן $a_{k+1}=\dfrac{1}{2k-1}\cdot\dfrac{2k-1}{2k+1}=\dfrac{1}{2k+1}$. (עבור $k$ טבעי $2k-1\ne 0$, ולכן מותר לצמצם.)`, CONCLUSION],
    },
  ],
};

const e8: Exercise = {
  id: 'inr-8',
  level: 2,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי כלל הנסיגה $a_1=2,\ a_{n+1}=\dfrac{n+2}{n}\cdot a_n$. בשרטוט מוצגים שלושת האיברים הראשונים של הסדרה.`,
  diagram: { kind: 'seq', terms: [2, 6, 12], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $a_4$.`,
      hints: [String.raw`כדי לקבל את $a_4$ מציבים בכלל הנסיגה $n=3$, גם בשבר וגם באיבר.`, String.raw`$a_4=\dfrac{3+2}{3}\cdot a_3=\dfrac53\cdot 12$.`],
      check: { kind: 'numeric', answer: 20, verify: '2*((1+2)/1)*((2+2)/2)*((3+2)/3)' },
      short: String.raw`$a_4=\dfrac{3+2}{3}\cdot a_3=\dfrac53\cdot 12=20$.`,
      full: [String.raw`בדיקת האיברים שבשרטוט: $a_2=\dfrac{1+2}{1}\cdot 2=6$, $a_3=\dfrac{2+2}{2}\cdot 6=12$.`, String.raw`$n=3$: $a_4=\dfrac{3+2}{3}\cdot a_3=\dfrac53\cdot 12=20$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`הוכיחו באינדוקציה שלכל $n$ טבעי $a_n=n(n+1)$.`,
      hints: [String.raw`בדיקה עבור $n=1$, הנחה $a_k=k(k+1)$, וצריך להוכיח ש-$a_{k+1}=(k+1)(k+2)$.`, String.raw`כלל הנסיגה עבור $n=k$: $a_{k+1}=\dfrac{k+2}{k}\cdot a_k$. הציבו את ההנחה וצמצמו ב-$k$.`],
      check: { kind: 'self' },
      short: String.raw`בדיקה: $1\cdot 2=2=a_1$. צעד: $a_{k+1}=\dfrac{k+2}{k}\cdot k(k+1)=(k+1)(k+2)$.`,
      full: [String.raw`בדיקה עבור $n=1$: לפי הנוסחה $1\cdot(1+1)=2$, וזה האיבר הראשון הנתון, $a_1=2$.`, String.raw`הנחת האינדוקציה: נניח שהטענה נכונה עבור $n=k$ ($k$ טבעי), כלומר $a_k=k(k+1)$.`, String.raw`צריך להוכיח שהטענה נכונה עבור $n=k+1$, כלומר $a_{k+1}=(k+1)\big((k+1)+1\big)=(k+1)(k+2)$.`, String.raw`הוכחה: לפי כלל הנסיגה $a_{k+1}=\dfrac{k+2}{k}\cdot a_k$. לפי ההנחה: $a_{k+1}=\dfrac{k+2}{k}\cdot k(k+1)=(k+2)(k+1)$. ($k$ טבעי, ולכן $k\ne 0$ ומותר לצמצם.)`, CONCLUSION],
    },
    {
      label: 'ג',
      prompt: String.raw`אחד מאיברי הסדרה שווה ל-$420$. מהו מקומו בסדרה?`,
      hints: [String.raw`לפי הנוסחה שהוכחתם, מחפשים $n$ טבעי שעבורו $n(n+1)=420$.`, String.raw`$n^2+n-420=0$. פתרו ובחרו את הפתרון הטבעי.`],
      check: { kind: 'numeric', answer: 20, verify: '(-1+sqrt(1+4*420))/2' },
      short: String.raw`$n(n+1)=420$ נותן $n^2+n-420=0$, ולכן $n=20$ (הפתרון $n=-21$ נפסל).`,
      full: [String.raw`לפי הנוסחה: $n(n+1)=420$, כלומר $n^2+n-420=0$.`, String.raw`$n=\dfrac{-1\pm\sqrt{1+1680}}{2}=\dfrac{-1\pm 41}{2}$, ולכן $n=20$ או $n=-21$.`, String.raw`$n$ הוא מקום בסדרה ולכן טבעי: $n=-21$ נפסל, ו-$n=20$.`, String.raw`בדיקה: $a_{20}=20\cdot 21=420$.`],
    },
  ],
};

const e9: Exercise = {
  id: 'inr-9',
  level: 3,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי כלל הנסיגה $a_1=5,\ a_{n+1}=3a_n-4$. בשרטוט מוצגים ארבעת האיברים הראשונים של הסדרה.`,
  diagram: { kind: 'seq', terms: [5, 11, 29, 83], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו באינדוקציה שלכל $n$ טבעי $a_n=3^n+2$.`,
      hints: [String.raw`בדיקה עבור $n=1$, הנחה $a_k=3^k+2$, וצריך להוכיח ש-$a_{k+1}=3^{k+1}+2$.`, String.raw`$a_{k+1}=3a_k-4=3\left(3^k+2\right)-4$. פתחו סוגריים; $3\cdot 3^k=3^{k+1}$.`],
      check: { kind: 'self' },
      short: String.raw`בדיקה: $3^1+2=5=a_1$. צעד: $a_{k+1}=3a_k-4=3\left(3^k+2\right)-4=3^{k+1}+2$.`,
      full: [String.raw`בדיקה עבור $n=1$: לפי הנוסחה $3^1+2=5$, וזה האיבר הראשון הנתון, $a_1=5$.`, String.raw`הנחת האינדוקציה: נניח שהטענה נכונה עבור $n=k$ ($k$ טבעי), כלומר $a_k=3^k+2$.`, String.raw`צריך להוכיח שהטענה נכונה עבור $n=k+1$, כלומר $a_{k+1}=3^{k+1}+2$.`, String.raw`הוכחה: לפי כלל הנסיגה $a_{k+1}=3a_k-4$. לפי ההנחה: $a_{k+1}=3\left(3^k+2\right)-4=3\cdot 3^k+6-4=3^{k+1}+2$.`, CONCLUSION],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את $a_8$.`,
      hints: [String.raw`היעזרו בנוסחה שהוכחתם בסעיף א.`, String.raw`$3^8=6561$.`],
      check: { kind: 'numeric', answer: 6563, verify: '3*(3*(3*(3*(3*(3*(3*5-4)-4)-4)-4)-4)-4)-4' },
      short: String.raw`$a_8=3^8+2=6561+2=6563$.`,
      full: [String.raw`לפי הנוסחה שהוכחה בסעיף א: $a_8=3^8+2$.`, String.raw`$3^8=6561$, ולכן $a_8=6563$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`מגדירים סדרה חדשה: $b_n=a_n-2$. הראו ש-$b_n$ היא סדרה הנדסית, ומצאו את מנת הסדרה.`,
      hints: [String.raw`בסדרה הנדסית המנה $\dfrac{b_{n+1}}{b_n}$ קבועה (אינה תלויה ב-$n$).`, String.raw`לפי סעיף א, $b_n=a_n-2=3^n$. חשבו את $\dfrac{b_{n+1}}{b_n}$.`],
      check: { kind: 'numeric', answer: 3, verify: '((3*5-4)-2)/(5-2)' },
      short: String.raw`$b_n=3^n$, ולכן $\dfrac{b_{n+1}}{b_n}=\dfrac{3^{n+1}}{3^n}=3$ לכל $n$: סדרה הנדסית שמנתה $3$.`,
      full: [String.raw`לפי סעיף א: $b_n=a_n-2=3^n+2-2=3^n$.`, String.raw`$\dfrac{b_{n+1}}{b_n}=\dfrac{3^{n+1}}{3^n}=3$. המנה קבועה לכל $n$, ולכן $b_n$ סדרה הנדסית שמנתה $q=3$ ואיברה הראשון $b_1=3$.`, String.raw`דרך נוספת, ישירות מכלל הנסיגה: $b_{n+1}=a_{n+1}-2=3a_n-6=3\left(a_n-2\right)=3b_n$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את סכום ששת האיברים הראשונים של הסדרה $a_n$.`,
      hints: [String.raw`$a_n=b_n+2$. פרקו את הסכום לסכום של $b_n$ ולסכום של המספר $2$ שש פעמים.`, String.raw`סכום סדרה הנדסית: $S_n=\dfrac{b_1\left(q^n-1\right)}{q-1}$, עם $b_1=3$, $q=3$, $n=6$.`],
      check: { kind: 'numeric', answer: 1104, verify: '3*(3^6-1)/(3-1)+2*6' },
      short: String.raw`$\dfrac{3\left(3^6-1\right)}{3-1}+6\cdot 2=1092+12=1104$.`,
      full: [String.raw`$a_n=b_n+2$, ולכן $a_1+\dots+a_6=\left(b_1+\dots+b_6\right)+6\cdot 2$.`, String.raw`$b_n$ הנדסית עם $b_1=3$ ו-$q=3$: $b_1+\dots+b_6=\dfrac{3\left(3^6-1\right)}{3-1}=\dfrac{3\cdot 728}{2}=1092$.`, String.raw`הסכום המבוקש: $1092+12=1104$.`, String.raw`בדיקה: $5+11+29+83+245+731=1104$.`],
    },
  ],
};

const e10: Exercise = {
  id: 'inr-10',
  level: 3,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי כלל הנסיגה $a_1=3,\ a_{n+1}=2a_n-n+1$. בשרטוט מוצגים שלושת האיברים הראשונים של הסדרה.`,
  diagram: { kind: 'seq', terms: [3, 6, 11], style: 'dots' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $a_5$ לפי כלל הנסיגה.`,
      hints: [String.raw`כדי לקבל את $a_4$ מציבים $n=3$: $a_4=2a_3-3+1$.`, String.raw`$a_4=20$. עכשיו הציבו $n=4$.`],
      check: { kind: 'numeric', answer: 37, verify: '2*(2*(2*(2*3-1+1)-2+1)-3+1)-4+1' },
      short: String.raw`$a_4=2\cdot 11-3+1=20$, ולכן $a_5=2\cdot 20-4+1=37$.`,
      full: [String.raw`$n=3$: $a_4=2a_3-3+1=22-2=20$.`, String.raw`$n=4$: $a_5=2a_4-4+1=40-3=37$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`הוכיחו באינדוקציה שלכל $n$ טבעי $a_n=2^n+n$.`,
      hints: [String.raw`בדיקה עבור $n=1$, הנחה $a_k=2^k+k$, וצריך להוכיח ש-$a_{k+1}=2^{k+1}+k+1$.`, String.raw`כלל הנסיגה עבור $n=k$: $a_{k+1}=2a_k-k+1$. הציבו את ההנחה ופתחו סוגריים.`],
      check: { kind: 'self' },
      short: String.raw`בדיקה: $2^1+1=3=a_1$. צעד: $a_{k+1}=2\left(2^k+k\right)-k+1=2^{k+1}+k+1$.`,
      full: [String.raw`בדיקה עבור $n=1$: לפי הנוסחה $2^1+1=3$, וזה האיבר הראשון הנתון, $a_1=3$.`, String.raw`הנחת האינדוקציה: נניח שהטענה נכונה עבור $n=k$ ($k$ טבעי), כלומר $a_k=2^k+k$.`, String.raw`צריך להוכיח שהטענה נכונה עבור $n=k+1$, כלומר $a_{k+1}=2^{k+1}+(k+1)$.`, String.raw`הוכחה: לפי כלל הנסיגה $a_{k+1}=2a_k-k+1$. לפי ההנחה: $a_{k+1}=2\left(2^k+k\right)-k+1=2^{k+1}+2k-k+1=2^{k+1}+(k+1)$.`, CONCLUSION],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את $a_{12}$.`,
      hints: [String.raw`היעזרו בנוסחה שהוכחתם בסעיף ב.`, String.raw`$2^{12}=4096$.`],
      check: { kind: 'numeric', answer: 4108, verify: '2^12+12' },
      short: String.raw`$a_{12}=2^{12}+12=4096+12=4108$.`,
      full: [String.raw`לפי הנוסחה שהוכחה בסעיף ב: $a_{12}=2^{12}+12$.`, String.raw`$2^{12}=4096$, ולכן $a_{12}=4108$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`מהו ה-$n$ הקטן ביותר שעבורו $a_n>10{,}000$?`,
      hints: [String.raw`הסדרה עולה, ולכן מספיק למצוא את האיבר הראשון שגדול מ-$10{,}000$. המשיכו מ-$a_{12}=4108$.`, String.raw`חשבו את $a_{13}$ ואת $a_{14}$ בעזרת הנוסחה.`],
      check: { kind: 'numeric', answer: 14, verify: 'ceil(root("2^x+x-10000", 1, 30))' },
      short: String.raw`$a_{13}=2^{13}+13=8205<10{,}000$ ו-$a_{14}=2^{14}+14=16{,}398>10{,}000$, ולכן $n=14$.`,
      full: [String.raw`הסדרה עולה: גם $2^n$ וגם $n$ גדלים כאשר $n$ גדל. לכן מהאיבר הראשון שגדול מ-$10{,}000$ והלאה כל האיברים גדולים מ-$10{,}000$.`, String.raw`$a_{13}=2^{13}+13=8192+13=8205<10{,}000$.`, String.raw`$a_{14}=2^{14}+14=16{,}384+14=16{,}398>10{,}000$.`, String.raw`לכן ה-$n$ הקטן ביותר הוא $n=14$.`],
    },
  ],
};

const e11: Exercise = {
  id: 'inr-11',
  level: 3,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי כלל הנסיגה $a_1=\dfrac12,\ a_{n+1}=\dfrac{1}{2-a_n}$. בשרטוט מוצגים שני האיברים הראשונים של הסדרה.`,
  diagram: { kind: 'seq', terms: [0.5, 0.6667], style: 'dots' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $a_3$.`,
      hints: [String.raw`$a_2=\dfrac{1}{2-\frac12}=\dfrac23$. הציבו את $a_2$ בכלל הנסיגה.`, String.raw`$a_3=\dfrac{1}{2-\frac23}$, והמכנה שווה ל-$\dfrac43$.`],
      check: { kind: 'numeric', answer: 0.75, verify: '1/(2-1/(2-1/2))' },
      short: String.raw`$a_2=\dfrac23$, ולכן $a_3=\dfrac{1}{2-\frac23}=\dfrac{1}{\frac43}=\dfrac34$.`,
      full: [String.raw`$a_2=\dfrac{1}{2-a_1}=\dfrac{1}{2-\frac12}=\dfrac{1}{\frac32}=\dfrac23$.`, String.raw`$a_3=\dfrac{1}{2-a_2}=\dfrac{1}{2-\frac23}=\dfrac{1}{\frac43}=\dfrac34=0.75$.`, String.raw`האיברים הראשונים הם $\dfrac12,\dfrac23,\dfrac34$: המונה הוא המקום, והמכנה גדול ממנו ב-$1$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`הוכיחו באינדוקציה שלכל $n$ טבעי $a_n=\dfrac{n}{n+1}$.`,
      hints: [String.raw`בדיקה עבור $n=1$, הנחה $a_k=\dfrac{k}{k+1}$, וצריך להוכיח ש-$a_{k+1}=\dfrac{k+1}{k+2}$.`, String.raw`$a_{k+1}=\dfrac{1}{2-\frac{k}{k+1}}$. עשו מכנה משותף במכנה: $2-\dfrac{k}{k+1}=\dfrac{2(k+1)-k}{k+1}$.`],
      check: { kind: 'self' },
      short: String.raw`בדיקה: $\dfrac{1}{1+1}=\dfrac12=a_1$. צעד: $a_{k+1}=\dfrac{1}{2-\frac{k}{k+1}}=\dfrac{1}{\frac{k+2}{k+1}}=\dfrac{k+1}{k+2}$.`,
      full: [String.raw`בדיקה עבור $n=1$: לפי הנוסחה $\dfrac{1}{1+1}=\dfrac12$, וזה האיבר הראשון הנתון, $a_1=\dfrac12$.`, String.raw`הנחת האינדוקציה: נניח שהטענה נכונה עבור $n=k$ ($k$ טבעי), כלומר $a_k=\dfrac{k}{k+1}$.`, String.raw`צריך להוכיח שהטענה נכונה עבור $n=k+1$, כלומר $a_{k+1}=\dfrac{k+1}{(k+1)+1}=\dfrac{k+1}{k+2}$.`, String.raw`הוכחה: לפי כלל הנסיגה ולפי ההנחה, $a_{k+1}=\dfrac{1}{2-a_k}=\dfrac{1}{2-\frac{k}{k+1}}$.`, String.raw`מכנה משותף: $2-\dfrac{k}{k+1}=\dfrac{2(k+1)-k}{k+1}=\dfrac{k+2}{k+1}$. לכן $a_{k+1}=\dfrac{1}{\frac{k+2}{k+1}}=\dfrac{k+1}{k+2}$.`, CONCLUSION],
    },
    {
      label: 'ג',
      prompt: String.raw`אחד מאיברי הסדרה שווה ל-$0.96$. מהו מקומו בסדרה?`,
      hints: [String.raw`לפי הנוסחה שהוכחתם, פותרים את המשוואה $\dfrac{n}{n+1}=0.96$.`, String.raw`$n=0.96(n+1)$, כלומר $0.04n=0.96$.`],
      check: { kind: 'numeric', answer: 24, verify: '(96/100)/(1-96/100)' },
      short: String.raw`$\dfrac{n}{n+1}=0.96$ נותן $0.04n=0.96$, ולכן $n=24$.`,
      full: [String.raw`לפי הנוסחה: $\dfrac{n}{n+1}=0.96$.`, String.raw`$n=0.96(n+1)=0.96n+0.96$, ולכן $0.04n=0.96$ ו-$n=24$.`, String.raw`בדיקה: $a_{24}=\dfrac{24}{25}=0.96$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`מהו ה-$n$ הקטן ביותר שעבורו $a_n>0.99$?`,
      hints: [String.raw`פתרו את אי-השוויון $\dfrac{n}{n+1}>0.99$. המכנה $n+1$ חיובי, ולכן מותר לכפול בו בלי להפוך את סימן אי-השוויון.`, String.raw`$n>0.99n+0.99$, כלומר $0.01n>0.99$. שימו לב שאי-השוויון חזק.`],
      check: { kind: 'numeric', answer: 100, verify: 'floor(99/(100-99))+1' },
      short: String.raw`$\dfrac{n}{n+1}>0.99$ שקול ל-$n>99$, ולכן ה-$n$ הקטן ביותר הוא $100$.`,
      full: [String.raw`$\dfrac{n}{n+1}>0.99$. מכיוון ש-$n+1>0$, כופלים ב-$n+1$: $n>0.99n+0.99$.`, String.raw`$0.01n>0.99$, ולכן $n>99$.`, String.raw`אי-השוויון חזק: $a_{99}=\dfrac{99}{100}=0.99$ בדיוק, ולכן $n=99$ אינו מתאים. ה-$n$ הקטן ביותר הוא $n=100$.`, String.raw`בדיקה: $a_{100}=\dfrac{100}{101}\approx 0.9901>0.99$.`],
    },
  ],
};

const e12: Exercise = {
  id: 'inr-12',
  level: 3,
  topicId: T,
  subtopicIds: S,
  intro: String.raw`בבוקר היום הראשון יש במאגר מים $8$ אלפי ליטרים. במהלך כל יום נצרכת מחצית מכמות המים שבמאגר, ובלילה מזרימים אל המאגר $3$ אלפי ליטרים. מסמנים ב-$a_n$ את כמות המים במאגר (באלפי ליטרים) בבוקר היום ה-$n$. לכן $a_1=8,\ a_{n+1}=\dfrac12a_n+3$. בשרטוט מוצגות הכמויות בארבעת הבקרים הראשונים.`,
  diagram: { kind: 'seq', terms: [8, 7, 6.5, 6.25], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו באינדוקציה שלכל $n$ טבעי $a_n=6+\dfrac{4}{2^n}$.`,
      hints: [String.raw`בדיקה עבור $n=1$, הנחה $a_k=6+\dfrac{4}{2^k}$, וצריך להוכיח ש-$a_{k+1}=6+\dfrac{4}{2^{k+1}}$.`, String.raw`$a_{k+1}=\dfrac12\left(6+\dfrac{4}{2^k}\right)+3$. שימו לב: $\dfrac12\cdot\dfrac{4}{2^k}=\dfrac{4}{2^{k+1}}$.`],
      check: { kind: 'self' },
      short: String.raw`בדיקה: $6+\dfrac42=8=a_1$. צעד: $a_{k+1}=\dfrac12\left(6+\dfrac{4}{2^k}\right)+3=6+\dfrac{4}{2^{k+1}}$.`,
      full: [String.raw`בדיקה עבור $n=1$: לפי הנוסחה $6+\dfrac{4}{2^1}=6+2=8$, וזה האיבר הראשון הנתון, $a_1=8$.`, String.raw`הנחת האינדוקציה: נניח שהטענה נכונה עבור $n=k$ ($k$ טבעי), כלומר $a_k=6+\dfrac{4}{2^k}$.`, String.raw`צריך להוכיח שהטענה נכונה עבור $n=k+1$, כלומר $a_{k+1}=6+\dfrac{4}{2^{k+1}}$.`, String.raw`הוכחה: לפי כלל הנסיגה $a_{k+1}=\dfrac12a_k+3$. לפי ההנחה: $a_{k+1}=\dfrac12\left(6+\dfrac{4}{2^k}\right)+3=3+\dfrac{4}{2\cdot 2^k}+3=6+\dfrac{4}{2^{k+1}}$.`, CONCLUSION],
    },
    {
      label: 'ב',
      prompt: String.raw`מגדירים סדרה חדשה: $b_n=a_n-6$. הראו ש-$b_n$ היא סדרה הנדסית, ומצאו את מנת הסדרה.`,
      hints: [String.raw`לפי סעיף א, $b_n=\dfrac{4}{2^n}$. חשבו את המנה $\dfrac{b_{n+1}}{b_n}$.`, String.raw`$\dfrac{b_{n+1}}{b_n}=\dfrac{4}{2^{n+1}}\cdot\dfrac{2^n}{4}$.`],
      check: { kind: 'numeric', answer: 0.5, verify: '((8/2+3)-6)/(8-6)' },
      short: String.raw`$b_n=\dfrac{4}{2^n}$, ולכן $\dfrac{b_{n+1}}{b_n}=\dfrac{2^n}{2^{n+1}}=\dfrac12$ לכל $n$: סדרה הנדסית שמנתה $\dfrac12$.`,
      full: [String.raw`לפי סעיף א: $b_n=a_n-6=\dfrac{4}{2^n}$.`, String.raw`$\dfrac{b_{n+1}}{b_n}=\dfrac{4}{2^{n+1}}:\dfrac{4}{2^n}=\dfrac{2^n}{2^{n+1}}=\dfrac12$. המנה קבועה לכל $n$, ולכן $b_n$ סדרה הנדסית שמנתה $q=\dfrac12$ ואיברה הראשון $b_1=2$.`, String.raw`דרך נוספת, ישירות מכלל הנסיגה: $b_{n+1}=a_{n+1}-6=\dfrac12a_n-3=\dfrac12\left(a_n-6\right)=\dfrac12b_n$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את הסכום האינסופי $b_1+b_2+b_3+\dots$`,
      hints: [String.raw`זו סדרה הנדסית אינסופית שמנתה מקיימת $|q|<1$, ולכן יש לה סכום.`, String.raw`$S=\dfrac{b_1}{1-q}$, עם $b_1=a_1-6=2$ ו-$q=\dfrac12$.`],
      check: { kind: 'numeric', answer: 4, verify: '(8-6)/(1-((8/2+3)-6)/(8-6))' },
      short: String.raw`$S=\dfrac{b_1}{1-q}=\dfrac{2}{1-\frac12}=4$.`,
      full: [String.raw`$b_1=a_1-6=2$ ו-$q=\dfrac12$. מכיוון ש-$|q|<1$, לסדרה ההנדסית האינסופית יש סכום.`, String.raw`$S=\dfrac{b_1}{1-q}=\dfrac{2}{1-\frac12}=\dfrac{2}{\frac12}=4$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`בבוקר של איזה יום תהיה כמות המים במאגר, בפעם הראשונה, קטנה מ-$6.01$ אלפי ליטרים?`,
      hints: [String.raw`לפי הנוסחה, $a_n<6.01$ פירושו $\dfrac{4}{2^n}<0.01$.`, String.raw`$2^n>400$. בדקו חזקות של $2$: $2^8=256$, $2^9=512$.`],
      check: { kind: 'numeric', answer: 9, verify: 'ceil(log2(4/(6.01-6)))' },
      short: String.raw`$\dfrac{4}{2^n}<0.01$ שקול ל-$2^n>400$. $2^8=256$ ו-$2^9=512$, ולכן ביום ה-$9$.`,
      full: [String.raw`$a_n<6.01$, כלומר $6+\dfrac{4}{2^n}<6.01$, ולכן $\dfrac{4}{2^n}<0.01$.`, String.raw`$2^n>0$, ולכן מותר לכפול בו: $4<0.01\cdot 2^n$, כלומר $2^n>400$.`, String.raw`$2^8=256<400$ ו-$2^9=512>400$. הסדרה יורדת (האיבר $\dfrac{4}{2^n}$ קטֵן כאשר $n$ גדל), ולכן הפעם הראשונה היא $n=9$.`, String.raw`בדיקה: $a_8=6+\dfrac{4}{256}\approx 6.0156>6.01$ ו-$a_9=6+\dfrac{4}{512}\approx 6.0078<6.01$.`],
    },
  ],
};

export const inductionRecursive: ExerciseSet = {
  id: 'induction-recursive',
  questionnaire: '35581',
  title: 'אינדוקציה: סדרות בכלל נסיגה',
  topicIds: ['induction'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
