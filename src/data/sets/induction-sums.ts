import type { Exercise, ExerciseSet } from './types';

/**
 * סט: אינדוקציה – נוסחאות סכום ושוויונות (שאלון 35581, שאלת הסדרות והאינדוקציה).
 * 1–4 צעד אחד · 5–8 שלושת שלבי ההוכחה בסעיפים · 9–12 הוכחה מלאה ושימוש בנוסחה.
 * בעיות התחלקות וטענות ויזואליות מחוץ למיקוד ואינן מופיעות כאן.
 */

const T = 'induction';
const SUB = ['induction-sums'];
const CONCLUSION = String.raw`מסקנה: הטענה נכונה עבור $n=1$, ומנכונותה עבור $n=k$ נובעת נכונותה עבור $n=k+1$. לכן, לפי עקרון האינדוקציה המתמטית, היא נכונה לכל $n$ טבעי.`;

const e1: Exercise = {
  id: 'ins-1',
  level: 1,
  topicId: T,
  subtopicIds: SUB,
  intro: String.raw`רוצים להוכיח באינדוקציה שלכל $n$ טבעי מתקיים: $$1\cdot3+2\cdot4+3\cdot5+\dots+n(n+2)=\frac{n(n+1)(2n+7)}{6}$$ בשרטוט מוצגים ארבעת המחוברים הראשונים של אגף שמאל, בלי ערכיהם.`,
  diagram: { kind: 'seq', terms: [3, 8, 15, 24], style: 'bars', labels: false },
  sections: [
    {
      label: 'א',
      prompt: String.raw`שלב הבדיקה: מהו הערך של כל אחד מהאגפים עבור $n=1$?`,
      hints: [String.raw`עבור $n=1$ יש באגף שמאל מחובר אחד בלבד: המחובר הראשון.`, String.raw`באגף ימין מציבים $n=1$ בכל מקום: $\dfrac{1\cdot(1+1)\cdot(2\cdot1+7)}{6}$.`],
      check: { kind: 'numeric', answer: 3, verify: '1*(1+1)*(2*1+7)/6' },
      short: String.raw`אגף שמאל: $1\cdot3=3$. אגף ימין: $\dfrac{1\cdot2\cdot9}{6}=3$. האגפים שווים, ולכן הטענה נכונה עבור $n=1$.`,
      full: [String.raw`המחובר האחרון באגף שמאל הוא $n(n+2)$. עבור $n=1$ הוא $1\cdot3$, וזה גם המחובר הראשון, כלומר יש מחובר אחד: אגף שמאל שווה 3.`, String.raw`אגף ימין עבור $n=1$: $\dfrac{1\cdot2\cdot(2+7)}{6}=\dfrac{18}{6}=3$.`, String.raw`שני האגפים שווים ל-3, ולכן הטענה נכונה עבור $n=1$. זהו השלב הראשון בהוכחה באינדוקציה.`],
    },
  ],
};

const e2: Exercise = {
  id: 'ins-2',
  level: 1,
  topicId: T,
  subtopicIds: SUB,
  intro: String.raw`רוצים להוכיח באינדוקציה שלכל $n$ טבעי מתקיים: $$\frac{1}{1\cdot3}+\frac{1}{3\cdot5}+\frac{1}{5\cdot7}+\dots+\frac{1}{(2n-1)(2n+1)}=\frac{n}{2n+1}$$ בשרטוט מוצגים ערכי אגף שמאל עבור $n=1,2,3,4$.`,
  diagram: { kind: 'seq', terms: [0.3333333, 0.4, 0.4285714, 0.4444444] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מניחים שהטענה נכונה עבור $n=k$. איזה מחובר מתווסף לאגף שמאל כשעוברים ל-$n=k+1$?`,
      hints: [String.raw`המחובר האחרון באגף שמאל הוא $\dfrac{1}{(2n-1)(2n+1)}$. המחובר החדש מתקבל כשמציבים בו $n=k+1$.`, String.raw`הציבו בזהירות, עם סוגריים: $2(k+1)-1$ ו-$2(k+1)+1$.`],
      check: { kind: 'choice', options: [String.raw`$\dfrac{1}{(2k-1)(2k+1)}$`, String.raw`$\dfrac{1}{2k(2k+2)}$`, String.raw`$\dfrac{1}{(2k+1)(2k+3)}$`, String.raw`$\dfrac{1}{(2k+1)(2k+2)}$`], correct: 2 },
      short: String.raw`מציבים $n=k+1$ במחובר האחרון: $\dfrac{1}{(2(k+1)-1)(2(k+1)+1)}=\dfrac{1}{(2k+1)(2k+3)}$.`,
      full: [String.raw`עבור $n=k$ המחובר האחרון הוא $\dfrac{1}{(2k-1)(2k+1)}$.`, String.raw`עבור $n=k+1$ המחובר האחרון הוא $\dfrac{1}{(2(k+1)-1)(2(k+1)+1)}$.`, String.raw`$2(k+1)-1=2k+1$ ו-$2(k+1)+1=2k+3$, ולכן מתווסף המחובר $\dfrac{1}{(2k+1)(2k+3)}$.`, String.raw`טעות נפוצה: להוסיף 1 לכל גורם ולקבל $2k(2k+2)$. מציבים $k+1$ במקום $n$, ולכן כל גורם גדל ב-2.`, String.raw`בדיקה: הגורם הראשון של המחובר החדש, $2k+1$, שווה לגורם השני של המחובר הקודם, כמו ברצף $1\cdot3,\ 3\cdot5,\ 5\cdot7$.`],
    },
  ],
};

const e3: Exercise = {
  id: 'ins-3',
  level: 1,
  topicId: T,
  subtopicIds: SUB,
  intro: String.raw`רוצים להוכיח באינדוקציה שלכל $n$ טבעי מתקיים: $$3+3^2+3^3+\dots+3^{2n}=\frac{3^{2n+1}-3}{2}$$ בשרטוט מוצגים ארבעת המחוברים הראשונים של אגף שמאל.`,
  diagram: { kind: 'seq', terms: [3, 9, 27, 81], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`כמה מחוברים יש באגף שמאל כאשר $n=4$?`,
      hints: [String.raw`הסתכלו על המעריך של המחובר האחרון: הוא $2n$, לא $n$.`, String.raw`המעריכים באגף שמאל הם $1,2,3,\dots,2n$. מה המעריך האחרון כאשר $n=4$?`],
      check: { kind: 'numeric', answer: 8, verify: '2*4' },
      short: String.raw`המעריכים הם $1,2,\dots,2n$, ולכן יש $2n$ מחוברים; עבור $n=4$ יש $8$.`,
      full: [String.raw`המחובר האחרון הוא $3^{2n}$, והמעריכים עולים ב-1 בכל פעם: $1,2,3,\dots,2n$. לכן מספר המחוברים הוא $2n$.`, String.raw`עבור $n=4$: המחוברים הם $3,3^2,\dots,3^8$, כלומר שמונה מחוברים.`, String.raw`מה זה אומר על ההוכחה? בבדיקה עבור $n=1$ אגף שמאל הוא $3+3^2=12$ (שני מחוברים), ואגף ימין $\dfrac{3^3-3}{2}=12$.`, String.raw`ובמעבר מ-$n=k$ ל-$n=k+1$ מתווספים שני מחוברים: $3^{2k+1}+3^{2k+2}$.`],
    },
  ],
};

const e4: Exercise = {
  id: 'ins-4',
  level: 1,
  topicId: T,
  subtopicIds: SUB,
  intro: String.raw`הוכח באינדוקציה שלכל $n$ טבעי מתקיים: $$1^3+2^3+3^3+\dots+n^3=\frac{n^2(n+1)^2}{4}$$ בשרטוט מוצגים חמשת המחוברים הראשונים של אגף שמאל.`,
  diagram: { kind: 'seq', terms: [1, 8, 27, 64, 125], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו בעזרת הנוסחה: $1^3+2^3+3^3+\dots+10^3$.`,
      hints: [String.raw`זהו אגף שמאל של הנוסחה עבור ערך מסוים של $n$. איזה?`, String.raw`הציבו $n=10$ באגף ימין: $\dfrac{10^2\cdot11^2}{4}$.`],
      check: { kind: 'numeric', answer: 3025, verify: '10^2*(10+1)^2/4' },
      short: String.raw`$n=10$: $\dfrac{10^2\cdot11^2}{4}=\dfrac{12100}{4}=3025$.`,
      full: [String.raw`המחובר האחרון הוא $10^3$, כלומר $n=10$.`, String.raw`לפי הנוסחה: $\dfrac{10^2\cdot(10+1)^2}{4}=\dfrac{100\cdot121}{4}=3025$.`, String.raw`אפשר לבדוק את הנוסחה על השרטוט: עבור $n=5$ הסכום הוא $1+8+27+64+125=225$, ואכן $\dfrac{25\cdot36}{4}=225$.`],
    },
  ],
};

const e5: Exercise = {
  id: 'ins-5',
  level: 2,
  topicId: T,
  subtopicIds: SUB,
  intro: String.raw`נתונה הטענה: לכל $n$ טבעי $$1\cdot2+2\cdot3+3\cdot4+\dots+n(n+1)=\frac{n(n+1)(n+2)}{3}$$ בסעיפים הבאים מוכיחים אותה באינדוקציה, שלב אחרי שלב. בשרטוט מוצגים ארבעת המחוברים הראשונים של אגף שמאל, בלי ערכיהם.`,
  diagram: { kind: 'seq', terms: [2, 6, 12, 20], style: 'bars', labels: false },
  sections: [
    {
      label: 'א',
      prompt: String.raw`שלב הבדיקה: מהו הערך של כל אחד מהאגפים עבור $n=1$?`,
      hints: [String.raw`עבור $n=1$ יש באגף שמאל רק את המחובר הראשון.`, String.raw`אגף ימין: $\dfrac{1\cdot2\cdot3}{3}$.`],
      check: { kind: 'numeric', answer: 2, verify: '1*(1+1)*(1+2)/3' },
      short: String.raw`אגף שמאל: $1\cdot2=2$. אגף ימין: $\dfrac{1\cdot2\cdot3}{3}=2$. הטענה נכונה עבור $n=1$.`,
      full: [String.raw`עבור $n=1$ המחובר האחרון $n(n+1)$ הוא $1\cdot2$, ולכן אגף שמאל הוא $2$.`, String.raw`אגף ימין: $\dfrac{1\cdot(1+1)\cdot(1+2)}{3}=\dfrac63=2$.`, String.raw`האגפים שווים, ולכן הטענה נכונה עבור $n=1$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`מניחים שהטענה נכונה עבור $n=k$. מה צריך להוכיח עבור $n=k+1$?`,
      hints: [String.raw`כותבים את הטענה כולה עם $k+1$ במקום $n$, בשני האגפים.`, String.raw`באגף שמאל מתווסף המחובר $(k+1)(k+2)$; באגף ימין כל $n$ הופך ל-$k+1$.`],
      check: { kind: 'choice', options: [String.raw`$1\cdot2+\dots+k(k+1)=\dfrac{(k+1)(k+2)(k+3)}{3}$`, String.raw`$1\cdot2+\dots+k(k+1)+(k+1)(k+2)=\dfrac{k(k+1)(k+2)}{3}$`, String.raw`$1\cdot2+\dots+k(k+1)+(k+1)(k+2)=\dfrac{(k+1)(k+2)(k+3)}{3}$`, String.raw`$1\cdot2+\dots+k(k+1)+(k+1)=\dfrac{(k+1)(k+2)(k+3)}{3}$`], correct: 2 },
      short: String.raw`מציבים $n=k+1$ בשני האגפים: $1\cdot2+\dots+k(k+1)+(k+1)(k+2)=\dfrac{(k+1)(k+2)(k+3)}{3}$.`,
      full: [String.raw`הנחת האינדוקציה ($n=k$): $1\cdot2+2\cdot3+\dots+k(k+1)=\dfrac{k(k+1)(k+2)}{3}$.`, String.raw`עבור $n=k+1$ המחובר האחרון באגף שמאל הוא $(k+1)\big((k+1)+1\big)=(k+1)(k+2)$, והוא מתווסף אחרי $k(k+1)$.`, String.raw`אגף ימין עבור $n=k+1$: $\dfrac{(k+1)\big((k+1)+1\big)\big((k+1)+2\big)}{3}=\dfrac{(k+1)(k+2)(k+3)}{3}$.`, String.raw`צריך להוכיח: $1\cdot2+\dots+k(k+1)+(k+1)(k+2)=\dfrac{(k+1)(k+2)(k+3)}{3}$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`הוכיחו את השוויון עבור $n=k+1$ בעזרת הנחת האינדוקציה, וכתבו את המסקנה.`,
      hints: [String.raw`החליפו את הסכום $1\cdot2+\dots+k(k+1)$ שבאגף שמאל בביטוי שנותנת הנחת האינדוקציה.`, String.raw`מתקבל $\dfrac{k(k+1)(k+2)}{3}+(k+1)(k+2)$. הוציאו גורם משותף $(k+1)(k+2)$.`],
      check: { kind: 'self' },
      short: String.raw`$\dfrac{k(k+1)(k+2)}{3}+(k+1)(k+2)=(k+1)(k+2)\left(\dfrac k3+1\right)=\dfrac{(k+1)(k+2)(k+3)}{3}$, ולכן הטענה נכונה לכל $n$ טבעי.`,
      full: [String.raw`אגף שמאל עבור $n=k+1$: $1\cdot2+2\cdot3+\dots+k(k+1)+(k+1)(k+2)$.`, String.raw`לפי הנחת האינדוקציה סכום $k$ המחוברים הראשונים שווה ל-$\dfrac{k(k+1)(k+2)}{3}$, ולכן אגף שמאל שווה ל-$\dfrac{k(k+1)(k+2)}{3}+(k+1)(k+2)$.`, String.raw`מוציאים גורם משותף: $(k+1)(k+2)\left(\dfrac{k}{3}+1\right)=(k+1)(k+2)\cdot\dfrac{k+3}{3}=\dfrac{(k+1)(k+2)(k+3)}{3}$.`, String.raw`קיבלנו את אגף ימין עבור $n=k+1$.`, CONCLUSION],
    },
  ],
};

const e6: Exercise = {
  id: 'ins-6',
  level: 2,
  topicId: T,
  subtopicIds: SUB,
  intro: String.raw`נתונה הטענה: לכל $n$ טבעי $$\frac{1}{1\cdot4}+\frac{1}{4\cdot7}+\frac{1}{7\cdot10}+\dots+\frac{1}{(3n-2)(3n+1)}=\frac{n}{3n+1}$$ בסעיפים הבאים מוכיחים אותה באינדוקציה, שלב אחרי שלב. בשרטוט מוצגים ערכי אגף שמאל עבור $n=1,2,3,4,5$, בלי הערכים המספריים.`,
  diagram: { kind: 'seq', terms: [0.25, 0.2857143, 0.3, 0.3076923, 0.3125], labels: false },
  sections: [
    {
      label: 'א',
      prompt: String.raw`שלב הבדיקה: מהו הערך של כל אחד מהאגפים עבור $n=1$? (אפשר להקליד שבר.)`,
      hints: [String.raw`עבור $n=1$ יש באגף שמאל מחובר אחד: המחובר הראשון.`, String.raw`אגף ימין: $\dfrac{1}{3\cdot1+1}$.`],
      check: { kind: 'numeric', answer: 0.25, verify: '1/(3*1+1)' },
      short: String.raw`אגף שמאל: $\dfrac{1}{1\cdot4}=\dfrac14$. אגף ימין: $\dfrac{1}{3\cdot1+1}=\dfrac14$. הטענה נכונה עבור $n=1$.`,
      full: [String.raw`עבור $n=1$ המחובר האחרון $\dfrac{1}{(3n-2)(3n+1)}$ הוא $\dfrac{1}{1\cdot4}$, וזה המחובר היחיד: אגף שמאל שווה $\dfrac14$.`, String.raw`אגף ימין: $\dfrac{1}{3\cdot1+1}=\dfrac14$.`, String.raw`האגפים שווים, ולכן הטענה נכונה עבור $n=1$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`מניחים שהטענה נכונה עבור $n=k$. איזה מחובר מתווסף לאגף שמאל במעבר ל-$n=k+1$?`,
      hints: [String.raw`הציבו $n=k+1$ במחובר האחרון $\dfrac{1}{(3n-2)(3n+1)}$.`, String.raw`$3(k+1)-2=3k+1$ ו-$3(k+1)+1=3k+4$.`],
      check: { kind: 'choice', options: [String.raw`$\dfrac{1}{(3k-1)(3k+2)}$`, String.raw`$\dfrac{1}{(3k+1)(3k+4)}$`, String.raw`$\dfrac{1}{(3k-2)(3k+1)}$`, String.raw`$\dfrac{1}{(3k+1)(3k+2)}$`], correct: 1 },
      short: String.raw`$\dfrac{1}{(3(k+1)-2)(3(k+1)+1)}=\dfrac{1}{(3k+1)(3k+4)}$.`,
      full: [String.raw`מציבים $n=k+1$ במחובר האחרון: $\dfrac{1}{(3(k+1)-2)(3(k+1)+1)}$.`, String.raw`$3(k+1)-2=3k+1$ ו-$3(k+1)+1=3k+4$, ולכן מתווסף $\dfrac{1}{(3k+1)(3k+4)}$.`, String.raw`כל גורם גדל ב-3 (ולא ב-1), כי מחליפים את $n$ ב-$k+1$ בתוך $3n$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`כתבו מה צריך להוכיח עבור $n=k+1$, הוכיחו זאת בעזרת הנחת האינדוקציה, וכתבו את המסקנה.`,
      hints: [String.raw`צריך להוכיח: $\dfrac{1}{1\cdot4}+\dots+\dfrac{1}{(3k-2)(3k+1)}+\dfrac{1}{(3k+1)(3k+4)}=\dfrac{k+1}{3k+4}$.`, String.raw`לפי ההנחה אגף שמאל שווה ל-$\dfrac{k}{3k+1}+\dfrac{1}{(3k+1)(3k+4)}$. עשו מכנה משותף.`, String.raw`המונה $3k^2+4k+1$ מתפרק ל-$(3k+1)(k+1)$.`],
      check: { kind: 'self' },
      short: String.raw`$\dfrac{k}{3k+1}+\dfrac{1}{(3k+1)(3k+4)}=\dfrac{3k^2+4k+1}{(3k+1)(3k+4)}=\dfrac{(3k+1)(k+1)}{(3k+1)(3k+4)}=\dfrac{k+1}{3k+4}$, ולכן הטענה נכונה לכל $n$ טבעי.`,
      full: [String.raw`הנחת האינדוקציה: $\dfrac{1}{1\cdot4}+\dfrac{1}{4\cdot7}+\dots+\dfrac{1}{(3k-2)(3k+1)}=\dfrac{k}{3k+1}$.`, String.raw`צריך להוכיח: $\dfrac{1}{1\cdot4}+\dots+\dfrac{1}{(3k-2)(3k+1)}+\dfrac{1}{(3k+1)(3k+4)}=\dfrac{k+1}{3(k+1)+1}=\dfrac{k+1}{3k+4}$.`, String.raw`לפי ההנחה, אגף שמאל שווה ל-$\dfrac{k}{3k+1}+\dfrac{1}{(3k+1)(3k+4)}$.`, String.raw`מכנה משותף: $\dfrac{k(3k+4)+1}{(3k+1)(3k+4)}=\dfrac{3k^2+4k+1}{(3k+1)(3k+4)}$.`, String.raw`פירוק המונה: $3k^2+4k+1=(3k+1)(k+1)$. מצמצמים ב-$3k+1$ (שונה מאפס) ומקבלים $\dfrac{k+1}{3k+4}$, שהוא אגף ימין עבור $n=k+1$.`, CONCLUSION],
    },
  ],
};

const e7: Exercise = {
  id: 'ins-7',
  level: 2,
  topicId: T,
  subtopicIds: SUB,
  intro: String.raw`נתונה הטענה: לכל $n$ טבעי $$1^2-2^2+3^2-4^2+\dots+(2n-1)^2-(2n)^2=-n(2n+1)$$ בסעיפים הבאים מוכיחים אותה באינדוקציה, שלב אחרי שלב. בשרטוט מוצגים ששת המחוברים הראשונים של אגף שמאל, עם סימניהם.`,
  diagram: { kind: 'seq', terms: [1, -4, 9, -16, 25, -36], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`שלב הבדיקה: מהו הערך של כל אחד מהאגפים עבור $n=1$?`,
      hints: [String.raw`שימו לב למחובר האחרון באגף שמאל: $-(2n)^2$. אילו מחוברים יש עבור $n=1$?`, String.raw`עבור $n=1$ אגף שמאל הוא $1^2-2^2$, ואגף ימין $-1\cdot(2\cdot1+1)$.`],
      check: { kind: 'numeric', answer: -3, verify: '1^2-2^2' },
      short: String.raw`אגף שמאל: $1^2-2^2=-3$ (שני מחוברים). אגף ימין: $-1\cdot3=-3$. הטענה נכונה עבור $n=1$.`,
      full: [String.raw`אגף שמאל מסתיים ב-$(2n-1)^2-(2n)^2$. עבור $n=1$ אלה $1^2-2^2$, כלומר שני מחוברים: $1-4=-3$.`, String.raw`אגף ימין: $-1\cdot(2\cdot1+1)=-3$.`, String.raw`האגפים שווים, ולכן הטענה נכונה עבור $n=1$. (מי שלוקח רק את $1^2$ מקבל $1\ne-3$ וחושב בטעות שהטענה אינה נכונה.)`],
    },
    {
      label: 'ב',
      prompt: String.raw`מניחים שהטענה נכונה עבור $n=k$. מה מתווסף לאגף שמאל במעבר ל-$n=k+1$?`,
      hints: [String.raw`עבור $n=k$ אגף שמאל מסתיים ב-$(2k-1)^2-(2k)^2$. במה הוא מסתיים עבור $n=k+1$?`, String.raw`הציבו $n=k+1$ בשני המחוברים האחרונים: $(2(k+1)-1)^2-(2(k+1))^2$.`],
      check: { kind: 'choice', options: [String.raw`$-(2k+2)^2$`, String.raw`$(2k)^2-(2k+1)^2$`, String.raw`$(2k+1)^2$`, String.raw`$(2k+1)^2-(2k+2)^2$`], correct: 3 },
      short: String.raw`מתווספים שני מחוברים: $(2(k+1)-1)^2-(2(k+1))^2=(2k+1)^2-(2k+2)^2$.`,
      full: [String.raw`עבור $n=k$ אגף שמאל מסתיים ב-$-(2k)^2$.`, String.raw`עבור $n=k+1$ הוא מסתיים ב-$(2(k+1)-1)^2-(2(k+1))^2=(2k+1)^2-(2k+2)^2$.`, String.raw`לכן מתווספים שני מחוברים: $(2k+1)^2-(2k+2)^2$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`כתבו מה צריך להוכיח עבור $n=k+1$, הוכיחו זאת בעזרת הנחת האינדוקציה, וכתבו את המסקנה.`,
      hints: [String.raw`צריך להוכיח שאגף שמאל שווה ל-$-(k+1)(2k+3)$.`, String.raw`לפי ההנחה אגף שמאל שווה ל-$-k(2k+1)+(2k+1)^2-(2k+2)^2$. השתמשו בנוסחת הפרש ריבועים.`, String.raw`$(2k+1)^2-(2k+2)^2=-(4k+3)$, ו-$2k^2+5k+3=(k+1)(2k+3)$.`],
      check: { kind: 'self' },
      short: String.raw`$-k(2k+1)+(2k+1)^2-(2k+2)^2=-2k^2-k-(4k+3)=-(2k^2+5k+3)=-(k+1)(2k+3)$, ולכן הטענה נכונה לכל $n$ טבעי.`,
      full: [String.raw`הנחת האינדוקציה: $1^2-2^2+\dots+(2k-1)^2-(2k)^2=-k(2k+1)$.`, String.raw`צריך להוכיח: $1^2-2^2+\dots+(2k-1)^2-(2k)^2+(2k+1)^2-(2k+2)^2=-(k+1)\big(2(k+1)+1\big)=-(k+1)(2k+3)$.`, String.raw`לפי ההנחה, אגף שמאל שווה ל-$-k(2k+1)+(2k+1)^2-(2k+2)^2$.`, String.raw`הפרש ריבועים: $(2k+1)^2-(2k+2)^2=\big((2k+1)-(2k+2)\big)\big((2k+1)+(2k+2)\big)=-(4k+3)$.`, String.raw`לכן אגף שמאל: $-2k^2-k-4k-3=-(2k^2+5k+3)=-(k+1)(2k+3)$, שהוא אגף ימין עבור $n=k+1$. (בדיקת הפירוק: $(k+1)(2k+3)=2k^2+5k+3$.)`, CONCLUSION],
    },
  ],
};

const e8: Exercise = {
  id: 'ins-8',
  level: 2,
  topicId: T,
  subtopicIds: SUB,
  intro: String.raw`נתונה הטענה: לכל $n$ טבעי $$1\cdot2+2\cdot2^2+3\cdot2^3+\dots+n\cdot2^n=(n-1)\cdot2^{n+1}+2$$ בשרטוט מוצגים ארבעת המחוברים הראשונים של אגף שמאל.`,
  diagram: { kind: 'seq', terms: [2, 8, 24, 64], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מהו אגף ימין של הטענה עבור $n=k+1$?`,
      hints: [String.raw`מציבים $k+1$ במקום כל $n$ שבאגף ימין: גם בגורם $(n-1)$ וגם במעריך.`, String.raw`$(k+1)-1=k$ ו-$(k+1)+1=k+2$.`],
      check: { kind: 'choice', options: [String.raw`$k\cdot2^{k+1}+2$`, String.raw`$(k+1)\cdot2^{k+2}+2$`, String.raw`$k\cdot2^{k+2}+2$`, String.raw`$(k-1)\cdot2^{k+2}+2$`], correct: 2 },
      short: String.raw`$\big((k+1)-1\big)\cdot2^{(k+1)+1}+2=k\cdot2^{k+2}+2$.`,
      full: [String.raw`אגף ימין הוא $(n-1)\cdot2^{n+1}+2$.`, String.raw`מציבים $n=k+1$: $\big((k+1)-1\big)\cdot2^{(k+1)+1}+2$.`, String.raw`אחרי פישוט: $k\cdot2^{k+2}+2$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`הוכיחו את הטענה באינדוקציה (בדיקה, הנחה, הוכחה עבור $n=k+1$ ומסקנה).`,
      hints: [String.raw`בדיקה עבור $n=1$: אגף שמאל $1\cdot2$, אגף ימין $(1-1)\cdot2^2+2$.`, String.raw`במעבר ל-$n=k+1$ מתווסף המחובר $(k+1)\cdot2^{k+1}$. לפי ההנחה אגף שמאל שווה ל-$(k-1)\cdot2^{k+1}+2+(k+1)\cdot2^{k+1}$.`, String.raw`הוציאו גורם משותף $2^{k+1}$: $(k-1)+(k+1)=2k$, ו-$2k\cdot2^{k+1}=k\cdot2^{k+2}$.`],
      check: { kind: 'self' },
      short: String.raw`בדיקה: $2=2$. צעד: $(k-1)2^{k+1}+2+(k+1)2^{k+1}=2k\cdot2^{k+1}+2=k\cdot2^{k+2}+2$, שהוא אגף ימין עבור $n=k+1$.`,
      full: [String.raw`בדיקה עבור $n=1$: אגף שמאל $1\cdot2=2$; אגף ימין $(1-1)\cdot2^{2}+2=2$. האגפים שווים.`, String.raw`הנחת האינדוקציה ($n=k$): $1\cdot2+2\cdot2^2+\dots+k\cdot2^k=(k-1)\cdot2^{k+1}+2$.`, String.raw`צריך להוכיח ($n=k+1$): $1\cdot2+2\cdot2^2+\dots+k\cdot2^k+(k+1)\cdot2^{k+1}=k\cdot2^{k+2}+2$.`, String.raw`לפי ההנחה, אגף שמאל שווה ל-$(k-1)\cdot2^{k+1}+2+(k+1)\cdot2^{k+1}$.`, String.raw`גורם משותף $2^{k+1}$: $\big((k-1)+(k+1)\big)\cdot2^{k+1}+2=2k\cdot2^{k+1}+2=k\cdot2^{k+2}+2$, שהוא אגף ימין עבור $n=k+1$.`, CONCLUSION],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו בעזרת הנוסחה: $1\cdot2+2\cdot2^2+3\cdot2^3+\dots+8\cdot2^8$.`,
      hints: [String.raw`המחובר האחרון הוא $8\cdot2^8$. מהו $n$?`, String.raw`$n=8$: $(8-1)\cdot2^{9}+2$.`],
      check: { kind: 'numeric', answer: 3586, verify: '(8-1)*2^(8+1)+2' },
      short: String.raw`$n=8$: $7\cdot2^9+2=3584+2=3586$.`,
      full: [String.raw`המחובר האחרון הוא $n\cdot2^n$ עם $n=8$.`, String.raw`לפי הנוסחה: $(8-1)\cdot2^{8+1}+2=7\cdot512+2=3586$.`],
    },
  ],
};

const e9: Exercise = {
  id: 'ins-9',
  level: 3,
  topicId: T,
  subtopicIds: SUB,
  intro: String.raw`נתונה הטענה: לכל $n$ טבעי $$1\cdot2+2\cdot5+3\cdot8+\dots+n(3n-1)=n^2(n+1)$$ בשרטוט מוצגים חמשת המחוברים הראשונים של אגף שמאל.`,
  diagram: { kind: 'seq', terms: [2, 10, 24, 44, 70], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו את הטענה באינדוקציה.`,
      hints: [String.raw`שלושה שלבים: בדיקה עבור $n=1$, הנחה עבור $n=k$, והוכחה עבור $n=k+1$. המחובר שמתווסף הוא $(k+1)\big(3(k+1)-1\big)$.`, String.raw`צריך להוכיח: $k^2(k+1)+(k+1)(3k+2)=(k+1)^2(k+2)$.`, String.raw`הוציאו גורם משותף $(k+1)$ ופרקו את $k^2+3k+2$.`],
      check: { kind: 'self' },
      short: String.raw`בדיקה: $2=2$. צעד: $k^2(k+1)+(k+1)(3k+2)=(k+1)(k^2+3k+2)=(k+1)^2(k+2)$.`,
      full: [String.raw`בדיקה עבור $n=1$: אגף שמאל $1\cdot2=2$; אגף ימין $1^2\cdot(1+1)=2$. האגפים שווים.`, String.raw`הנחת האינדוקציה ($n=k$): $1\cdot2+2\cdot5+\dots+k(3k-1)=k^2(k+1)$.`, String.raw`צריך להוכיח ($n=k+1$): $1\cdot2+2\cdot5+\dots+k(3k-1)+(k+1)(3k+2)=(k+1)^2(k+2)$. (המחובר החדש: $(k+1)\big(3(k+1)-1\big)=(k+1)(3k+2)$.)`, String.raw`לפי ההנחה, אגף שמאל שווה ל-$k^2(k+1)+(k+1)(3k+2)$.`, String.raw`גורם משותף $(k+1)$: $(k+1)(k^2+3k+2)=(k+1)(k+1)(k+2)=(k+1)^2(k+2)$, שהוא אגף ימין עבור $n=k+1$.`, CONCLUSION],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו: $1\cdot2+2\cdot5+3\cdot8+\dots+10\cdot29$.`,
      hints: [String.raw`זהו אגף שמאל עבור ערך מסוים של $n$: המחובר האחרון הוא $n(3n-1)$.`, String.raw`$n=10$ (ואכן $3\cdot10-1=29$). הציבו ב-$n^2(n+1)$.`],
      check: { kind: 'numeric', answer: 1100, verify: '10^2*(10+1)' },
      short: String.raw`$n=10$: $10^2\cdot11=1100$.`,
      full: [String.raw`המחובר האחרון $10\cdot29$ מתאים ל-$n=10$, כי $3\cdot10-1=29$.`, String.raw`לפי הנוסחה: $10^2\cdot(10+1)=1100$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו: $11\cdot32+12\cdot35+13\cdot38+\dots+20\cdot59$.`,
      hints: [String.raw`הסכום הזה אינו מתחיל במחובר הראשון. איך אפשר לקבל אותו משני סכומים שכן מתחילים ב-$1\cdot2$?`, String.raw`זהו הסכום עד $n=20$ פחות הסכום עד $n=10$.`],
      check: { kind: 'numeric', answer: 7300, verify: '20^2*(20+1)-10^2*(10+1)' },
      short: String.raw`$S_{20}-S_{10}=20^2\cdot21-10^2\cdot11=8400-1100=7300$.`,
      full: [String.raw`אלה המחוברים ה-11 עד ה-20 של אגף שמאל (למשל $11\cdot(3\cdot11-1)=11\cdot32$ ו-$20\cdot(3\cdot20-1)=20\cdot59$).`, String.raw`נסמן ב-$S_n$ את הסכום עד המחובר ה-$n$. הסכום המבוקש הוא $S_{20}-S_{10}$.`, String.raw`$S_{20}=20^2\cdot21=8400$ ו-$S_{10}=1100$.`, String.raw`$S_{20}-S_{10}=8400-1100=7300$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`מצאו את $n$ שעבורו הסכום $1\cdot2+2\cdot5+\dots+n(3n-1)$ שווה ל-$36(n+1)$.`,
      hints: [String.raw`החליפו את הסכום בנוסחה שהוכחתם וקבלו משוואה ב-$n$.`, String.raw`$n^2(n+1)=36(n+1)$. $n$ טבעי, ולכן $n+1\ne0$ ואפשר לחלק בו.`],
      check: { kind: 'numeric', answer: 6, verify: 'sqrt(36)' },
      short: String.raw`$n^2(n+1)=36(n+1)\Rightarrow n^2=36\Rightarrow n=6$.`,
      full: [String.raw`לפי הנוסחה הסכום שווה ל-$n^2(n+1)$, ולכן $n^2(n+1)=36(n+1)$.`, String.raw`$n$ טבעי, ולכן $n+1>0$ ומותר לחלק בו: $n^2=36$.`, String.raw`$n=6$ (הפתרון $n=-6$ אינו טבעי).`, String.raw`בדיקה: $2+10+24+44+70+102=252=36\cdot7$.`],
    },
  ],
};

const e10: Exercise = {
  id: 'ins-10',
  level: 3,
  topicId: T,
  subtopicIds: SUB,
  intro: String.raw`נתונה הטענה: לכל $n$ טבעי $$\frac{1}{2\cdot5}+\frac{1}{5\cdot8}+\frac{1}{8\cdot11}+\dots+\frac{1}{(3n-1)(3n+2)}=\frac{n}{2(3n+2)}$$ בשרטוט מוצגים ערכי אגף שמאל עבור $n=1,2,3,4,5$.`,
  diagram: { kind: 'seq', terms: [0.1, 0.125, 0.1363636, 0.1428571, 0.1470588] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו את הטענה באינדוקציה.`,
      hints: [String.raw`המחובר שמתווסף במעבר ל-$n=k+1$ הוא $\dfrac{1}{(3k+2)(3k+5)}$, ואגף ימין הופך ל-$\dfrac{k+1}{2(3k+5)}$.`, String.raw`לפי ההנחה אגף שמאל שווה ל-$\dfrac{k}{2(3k+2)}+\dfrac{1}{(3k+2)(3k+5)}$. המכנה המשותף הוא $2(3k+2)(3k+5)$.`, String.raw`המונה $3k^2+5k+2$ מתפרק ל-$(3k+2)(k+1)$.`],
      check: { kind: 'self' },
      short: String.raw`בדיקה: $\dfrac{1}{10}=\dfrac{1}{10}$. צעד: $\dfrac{k}{2(3k+2)}+\dfrac{1}{(3k+2)(3k+5)}=\dfrac{3k^2+5k+2}{2(3k+2)(3k+5)}=\dfrac{(3k+2)(k+1)}{2(3k+2)(3k+5)}=\dfrac{k+1}{2(3k+5)}$.`,
      full: [String.raw`בדיקה עבור $n=1$: אגף שמאל $\dfrac{1}{2\cdot5}=\dfrac{1}{10}$; אגף ימין $\dfrac{1}{2\cdot(3+2)}=\dfrac{1}{10}$. האגפים שווים.`, String.raw`הנחת האינדוקציה ($n=k$): $\dfrac{1}{2\cdot5}+\dfrac{1}{5\cdot8}+\dots+\dfrac{1}{(3k-1)(3k+2)}=\dfrac{k}{2(3k+2)}$.`, String.raw`צריך להוכיח ($n=k+1$): $\dfrac{1}{2\cdot5}+\dots+\dfrac{1}{(3k-1)(3k+2)}+\dfrac{1}{(3k+2)(3k+5)}=\dfrac{k+1}{2(3k+5)}$. (כי $3(k+1)-1=3k+2$ ו-$3(k+1)+2=3k+5$.)`, String.raw`לפי ההנחה, אגף שמאל שווה ל-$\dfrac{k}{2(3k+2)}+\dfrac{1}{(3k+2)(3k+5)}=\dfrac{k(3k+5)+2}{2(3k+2)(3k+5)}=\dfrac{3k^2+5k+2}{2(3k+2)(3k+5)}$.`, String.raw`פירוק המונה: $3k^2+5k+2=(3k+2)(k+1)$. מצמצמים ב-$3k+2$ ומקבלים $\dfrac{k+1}{2(3k+5)}$, שהוא אגף ימין עבור $n=k+1$.`, CONCLUSION],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו: $\dfrac{1}{2\cdot5}+\dfrac{1}{5\cdot8}+\dots+\dfrac{1}{47\cdot50}$.`,
      hints: [String.raw`מצאו את $n$ מהמחובר האחרון: $(3n-1)(3n+2)=47\cdot50$.`, String.raw`$3n-1=47$, ולכן $n=16$. הציבו ב-$\dfrac{n}{2(3n+2)}$.`],
      check: { kind: 'numeric', answer: 0.16, verify: '((47+1)/3)/(2*50)' },
      short: String.raw`$n=16$: $\dfrac{16}{2\cdot50}=\dfrac{4}{25}=0.16$.`,
      full: [String.raw`$3n-1=47$ נותן $n=16$ (ואכן $3\cdot16+2=50$).`, String.raw`לפי הנוסחה: $\dfrac{16}{2\cdot(3\cdot16+2)}=\dfrac{16}{100}=0.16$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו: $\dfrac{1}{14\cdot17}+\dfrac{1}{17\cdot20}+\dfrac{1}{20\cdot23}+\dfrac{1}{23\cdot26}$ (הקלידו שבר, למשל 2/35).`,
      hints: [String.raw`אלה המחוברים החמישי עד השמיני של אגף שמאל. כתבו אותם כהפרש של שני סכומים שמתחילים ב-$\dfrac{1}{2\cdot5}$.`, String.raw`הסכום עד $n=8$ פחות הסכום עד $n=4$: $\dfrac{8}{2\cdot26}-\dfrac{4}{2\cdot14}$.`],
      check: { kind: 'numeric', answer: 0.01098901099, tol: 0.00005, verify: '1/(14*17)+1/(17*20)+1/(20*23)+1/(23*26)' },
      short: String.raw`$S_8-S_4=\dfrac{8}{52}-\dfrac{4}{28}=\dfrac{2}{13}-\dfrac17=\dfrac{1}{91}$.`,
      full: [String.raw`$3n-1=14$ נותן $n=5$, ו-$3n-1=23$ נותן $n=8$: אלה המחוברים החמישי עד השמיני.`, String.raw`נסמן ב-$S_n$ את הסכום עד המחובר ה-$n$. הסכום המבוקש הוא $S_8-S_4$.`, String.raw`$S_8=\dfrac{8}{2\cdot26}=\dfrac{2}{13}$ ו-$S_4=\dfrac{4}{2\cdot14}=\dfrac17$.`, String.raw`$S_8-S_4=\dfrac{2}{13}-\dfrac17=\dfrac{14-13}{91}=\dfrac{1}{91}$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`מצאו את $n$ שעבורו אגף שמאל שווה ל-$\dfrac{5}{32}$.`,
      hints: [String.raw`השוו את הנוסחה ל-$\dfrac{5}{32}$: $\dfrac{n}{2(3n+2)}=\dfrac{5}{32}$.`, String.raw`כפל בהצלבה: $32n=10(3n+2)$.`],
      check: { kind: 'numeric', answer: 10, verify: '4*(5/32)/(1-6*(5/32))' },
      short: String.raw`$\dfrac{n}{2(3n+2)}=\dfrac{5}{32}\Rightarrow32n=30n+20\Rightarrow n=10$.`,
      full: [String.raw`$\dfrac{n}{2(3n+2)}=\dfrac{5}{32}$.`, String.raw`כפל בהצלבה: $32n=10(3n+2)=30n+20$.`, String.raw`$2n=20$, ולכן $n=10$.`, String.raw`בדיקה: $\dfrac{10}{2\cdot32}=\dfrac{10}{64}=\dfrac{5}{32}$.`],
    },
  ],
};

const e11: Exercise = {
  id: 'ins-11',
  level: 3,
  topicId: T,
  subtopicIds: SUB,
  intro: String.raw`נתונה הטענה: לכל $n$ טבעי $$1^2-2^2+3^2-4^2+\dots+(-1)^{n-1}\cdot n^2=(-1)^{n-1}\cdot\frac{n(n+1)}{2}$$ בשרטוט מוצגים ערכי אגף שמאל עבור $n=1,2,\dots,6$.`,
  diagram: { kind: 'seq', terms: [1, -3, 6, -10, 15, -21] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו את הטענה באינדוקציה.`,
      hints: [String.raw`המחובר שמתווסף במעבר ל-$n=k+1$ הוא $(-1)^{k}(k+1)^2$, ואגף ימין הופך ל-$(-1)^{k}\cdot\dfrac{(k+1)(k+2)}{2}$.`, String.raw`כדי לחבר את שני הביטויים כתבו $(-1)^{k-1}=-(-1)^{k}$.`, String.raw`הוציאו גורם משותף $(-1)^k(k+1)$: בסוגריים נשאר $-\dfrac{k}{2}+(k+1)$.`],
      check: { kind: 'self' },
      short: String.raw`בדיקה: $1=1$. צעד: $(-1)^{k-1}\dfrac{k(k+1)}{2}+(-1)^k(k+1)^2=(-1)^k(k+1)\left(k+1-\dfrac k2\right)=(-1)^k\dfrac{(k+1)(k+2)}{2}$.`,
      full: [String.raw`בדיקה עבור $n=1$: אגף שמאל $1^2=1$; אגף ימין $(-1)^{0}\cdot\dfrac{1\cdot2}{2}=1$. האגפים שווים.`, String.raw`הנחת האינדוקציה ($n=k$): $1^2-2^2+\dots+(-1)^{k-1}k^2=(-1)^{k-1}\cdot\dfrac{k(k+1)}{2}$.`, String.raw`צריך להוכיח ($n=k+1$): $1^2-2^2+\dots+(-1)^{k-1}k^2+(-1)^{k}(k+1)^2=(-1)^{k}\cdot\dfrac{(k+1)(k+2)}{2}$.`, String.raw`לפי ההנחה, אגף שמאל שווה ל-$(-1)^{k-1}\cdot\dfrac{k(k+1)}{2}+(-1)^{k}(k+1)^2$.`, String.raw`$(-1)^{k-1}=-(-1)^{k}$, ולכן אגף שמאל: $(-1)^{k}(k+1)\left[-\dfrac{k}{2}+(k+1)\right]=(-1)^{k}(k+1)\cdot\dfrac{k+2}{2}$, שהוא אגף ימין עבור $n=k+1$.`, CONCLUSION],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו: $1^2-2^2+3^2-4^2+\dots+19^2-20^2$.`,
      hints: [String.raw`המחובר האחרון הוא $-20^2$, כלומר $n=20$. מה הסימן של $(-1)^{n-1}$ כאשר $n$ זוגי?`, String.raw`$(-1)^{19}\cdot\dfrac{20\cdot21}{2}$.`],
      check: { kind: 'numeric', answer: -210, verify: '(-1)^(20-1)*20*(20+1)/2' },
      short: String.raw`$n=20$: $(-1)^{19}\cdot\dfrac{20\cdot21}{2}=-210$.`,
      full: [String.raw`$n=20$, ו-$(-1)^{20-1}=-1$.`, String.raw`לפי הנוסחה: $-\dfrac{20\cdot21}{2}=-210$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו: $21^2-22^2+23^2-24^2+\dots+39^2-40^2$.`,
      hints: [String.raw`זהו המשך הסכום מסעיף ב: הסכום עד $n=40$ פחות הסכום עד $n=20$.`, String.raw`$S_{40}=-\dfrac{40\cdot41}{2}=-820$ ו-$S_{20}=-210$. שימו לב לסימנים בחיסור.`],
      check: { kind: 'numeric', answer: -610, verify: '(-1)^(40-1)*40*41/2-(-1)^(20-1)*20*21/2' },
      short: String.raw`$S_{40}-S_{20}=-820-(-210)=-610$.`,
      full: [String.raw`באגף שמאל המחובר ה-21 הוא $(-1)^{20}\cdot21^2=+21^2$, ולכן הביטוי הנתון הוא בדיוק המחוברים ה-21 עד ה-40.`, String.raw`נסמן ב-$S_n$ את הסכום עד המחובר ה-$n$. הסכום המבוקש: $S_{40}-S_{20}$.`, String.raw`$S_{40}=(-1)^{39}\cdot\dfrac{40\cdot41}{2}=-820$ ו-$S_{20}=-210$.`, String.raw`$S_{40}-S_{20}=-820+210=-610$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`מצאו את $n$ שעבורו אגף שמאל שווה ל-$-78$.`,
      hints: [String.raw`הסכום שלילי. מה זה אומר על הזוגיות של $n$?`, String.raw`$n$ זוגי ו-$\dfrac{n(n+1)}{2}=78$, כלומר $n^2+n-156=0$.`],
      check: { kind: 'numeric', answer: 12, verify: '(-1+sqrt(1+8*78))/2' },
      short: String.raw`הסכום שלילי, ולכן $n$ זוגי ו-$\dfrac{n(n+1)}{2}=78$: $n^2+n-156=0\Rightarrow n=12$ (זוגי, מתאים).`,
      full: [String.raw`$(-1)^{n-1}\cdot\dfrac{n(n+1)}{2}=-78$. השבר חיובי, ולכן $(-1)^{n-1}=-1$, כלומר $n$ זוגי.`, String.raw`$\dfrac{n(n+1)}{2}=78$, ולכן $n^2+n-156=0$.`, String.raw`$n=\dfrac{-1\pm\sqrt{1+624}}{2}=\dfrac{-1\pm25}{2}$: $n=12$ או $n=-13$.`, String.raw`$n$ טבעי, ולכן $n=12$. הוא זוגי, כנדרש.`],
    },
  ],
};

const e12: Exercise = {
  id: 'ins-12',
  level: 3,
  topicId: T,
  subtopicIds: SUB,
  intro: String.raw`נתונה הטענה: לכל $n$ טבעי $$1^2+3^2+5^2+\dots+(2n-1)^2=\frac{n(2n-1)(2n+1)}{3}$$ בשרטוט מוצגים חמשת המחוברים הראשונים של אגף שמאל.`,
  diagram: { kind: 'seq', terms: [1, 9, 25, 49, 81], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הוכיחו את הטענה באינדוקציה.`,
      hints: [String.raw`המחובר שמתווסף במעבר ל-$n=k+1$ הוא $(2(k+1)-1)^2=(2k+1)^2$, ואגף ימין הופך ל-$\dfrac{(k+1)(2k+1)(2k+3)}{3}$.`, String.raw`לפי ההנחה אגף שמאל שווה ל-$\dfrac{k(2k-1)(2k+1)}{3}+(2k+1)^2$. הוציאו גורם משותף $\dfrac{2k+1}{3}$.`, String.raw`בסוגריים נשאר $k(2k-1)+3(2k+1)=2k^2+5k+3=(k+1)(2k+3)$.`],
      check: { kind: 'self' },
      short: String.raw`בדיקה: $1=\dfrac{1\cdot1\cdot3}{3}$. צעד: $\dfrac{k(2k-1)(2k+1)}{3}+(2k+1)^2=\dfrac{(2k+1)(2k^2+5k+3)}{3}=\dfrac{(k+1)(2k+1)(2k+3)}{3}$.`,
      full: [String.raw`בדיקה עבור $n=1$: אגף שמאל $1^2=1$; אגף ימין $\dfrac{1\cdot1\cdot3}{3}=1$. האגפים שווים.`, String.raw`הנחת האינדוקציה ($n=k$): $1^2+3^2+\dots+(2k-1)^2=\dfrac{k(2k-1)(2k+1)}{3}$.`, String.raw`צריך להוכיח ($n=k+1$): $1^2+3^2+\dots+(2k-1)^2+(2k+1)^2=\dfrac{(k+1)(2k+1)(2k+3)}{3}$.`, String.raw`לפי ההנחה, אגף שמאל שווה ל-$\dfrac{k(2k-1)(2k+1)}{3}+(2k+1)^2=\dfrac{(2k+1)\big(k(2k-1)+3(2k+1)\big)}{3}=\dfrac{(2k+1)(2k^2+5k+3)}{3}$.`, String.raw`$2k^2+5k+3=(k+1)(2k+3)$, ולכן אגף שמאל שווה ל-$\dfrac{(k+1)(2k+1)(2k+3)}{3}$, שהוא אגף ימין עבור $n=k+1$.`, CONCLUSION],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו: $1^2+3^2+5^2+\dots+19^2$.`,
      hints: [String.raw`מצאו את $n$ מהמחובר האחרון: $2n-1=19$.`, String.raw`$n=10$: $\dfrac{10\cdot19\cdot21}{3}$.`],
      check: { kind: 'numeric', answer: 1330, verify: '10*(2*10-1)*(2*10+1)/3' },
      short: String.raw`$n=10$: $\dfrac{10\cdot19\cdot21}{3}=1330$.`,
      full: [String.raw`$2n-1=19$ נותן $n=10$.`, String.raw`לפי הנוסחה: $\dfrac{10\cdot19\cdot21}{3}=10\cdot19\cdot7=1330$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו: $21^2+23^2+25^2+\dots+39^2$.`,
      hints: [String.raw`הסכום עד $39^2$ פחות הסכום עד $19^2$.`, String.raw`$2n-1=39$ נותן $n=20$: $S_{20}=\dfrac{20\cdot39\cdot41}{3}$.`],
      check: { kind: 'numeric', answer: 9330, verify: '20*(2*20-1)*(2*20+1)/3-10*(2*10-1)*(2*10+1)/3' },
      short: String.raw`$S_{20}-S_{10}=10660-1330=9330$.`,
      full: [String.raw`נסמן ב-$S_n$ את הסכום עד המחובר ה-$n$. $39=2\cdot20-1$, ולכן הסכום המבוקש הוא $S_{20}-S_{10}$.`, String.raw`$S_{20}=\dfrac{20\cdot39\cdot41}{3}=20\cdot13\cdot41=10660$.`, String.raw`$S_{20}-S_{10}=10660-1330=9330$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`נתון גם שלכל $m$ טבעי $1^2+2^2+3^2+\dots+m^2=\dfrac{m(m+1)(2m+1)}{6}$. חשבו: $2^2+4^2+6^2+\dots+20^2$.`,
      hints: [String.raw`סכום ריבועי כל המספרים מ-1 עד 20 מורכב מריבועי האי-זוגיים ומריבועי הזוגיים.`, String.raw`$\left(1^2+2^2+\dots+20^2\right)-\left(1^2+3^2+\dots+19^2\right)$.`],
      check: { kind: 'numeric', answer: 1540, verify: '20*21*41/6-10*19*21/3' },
      short: String.raw`$\dfrac{20\cdot21\cdot41}{6}-1330=2870-1330=1540$.`,
      full: [String.raw`$1^2+2^2+\dots+20^2=\dfrac{20\cdot21\cdot41}{6}=2870$ (הנוסחה הנתונה, $m=20$).`, String.raw`ריבועי האי-זוגיים עד 19: $1330$ (סעיף ב).`, String.raw`ריבועי הזוגיים: $2870-1330=1540$.`, String.raw`בדיקה: $2^2+4^2+\dots+20^2=4\cdot(1^2+2^2+\dots+10^2)=4\cdot385=1540$.`],
    },
  ],
};

export const inductionSums: ExerciseSet = {
  id: 'induction-sums',
  questionnaire: '35581',
  title: 'אינדוקציה: נוסחאות סכום ושוויונות',
  topicIds: ['induction'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
