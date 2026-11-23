import type { Exercise, ExerciseSet } from './types';

/**
 * סט: כלל נסיגה וסדרות כלליות (שאלון 35581, שאלת הסדרות והאינדוקציה).
 * 1–4 צעד אחד · 5–8 שלושה סעיפים · 9–12 שאלות בסגנון בגרות.
 * הסדרה החשבונית מחוץ למיקוד: אף תרגיל כאן אינו נשען עליה.
 */

const T = 'sequences';
const GEN = ['seq-general'];
const GEO = ['seq-geometric'];
const BOTH = ['seq-general', 'seq-geometric'];

const e1: Exercise = {
  id: 'srg-1',
  level: 1,
  topicId: T,
  subtopicIds: GEN,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי כלל הנסיגה $a_1=3$, $a_{n+1}=2a_n-1$. בשרטוט מוצגים שני האיברים הראשונים של הסדרה.`,
  diagram: { kind: 'seq', terms: [3, 5] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $a_5$.`,
      hints: [String.raw`כלל נסיגה נותן כל איבר בעזרת האיבר שלפניו, ולכן מתקדמים צעד אחר צעד: $a_3$, אחר כך $a_4$, ורק אז $a_5$.`, String.raw`$a_3=2a_2-1=2\cdot5-1=9$. המשיכו באותה דרך.`],
      check: { kind: 'numeric', answer: 33, verify: '2*(2*(2*(2*3-1)-1)-1)-1' },
      short: String.raw`$a_2=5,\ a_3=9,\ a_4=17$, ולכן $a_5=2\cdot17-1=33$.`,
      full: [String.raw`מציבים $n=1$ בכלל הנסיגה: $a_2=2a_1-1=2\cdot3-1=5$.`, String.raw`$n=2$: $a_3=2a_2-1=2\cdot5-1=9$.`, String.raw`$n=3$: $a_4=2a_3-1=2\cdot9-1=17$.`, String.raw`$n=4$: $a_5=2a_4-1=2\cdot17-1=33$.`],
    },
  ],
};

const e2: Exercise = {
  id: 'srg-2',
  level: 1,
  topicId: T,
  subtopicIds: GEN,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי $a_1=5$, $a_{n+1}=a_n+n^2$. בשרטוט מוצגים שני האיברים הראשונים של הסדרה.`,
  diagram: { kind: 'seq', terms: [5, 6] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $a_4$.`,
      hints: [String.raw`בכלל הנסיגה הזה מופיע גם המקום $n$. שימו לב איזה $n$ מציבים כדי לקבל כל איבר.`, String.raw`כדי לקבל את $a_3$ מציבים $n=2$: $a_3=a_2+2^2$. כדי לקבל את $a_4$ מציבים $n=3$.`],
      check: { kind: 'numeric', answer: 19, verify: '5+1^2+2^2+3^2' },
      short: String.raw`$a_2=5+1^2=6$, $a_3=6+2^2=10$, $a_4=10+3^2=19$.`,
      full: [String.raw`הכלל $a_{n+1}=a_n+n^2$ אומר: לאיבר שבמקום $n$ מוסיפים $n^2$ ומקבלים את האיבר שבמקום $n+1$.`, String.raw`$n=1$: $a_2=a_1+1^2=5+1=6$.`, String.raw`$n=2$: $a_3=a_2+2^2=6+4=10$.`, String.raw`$n=3$: $a_4=a_3+3^2=10+9=19$.`, String.raw`טעות נפוצה: להוסיף $4^2$ כדי לקבל את $a_4$. המספר שמעלים בריבוע הוא המקום של האיבר הקודם.`],
    },
  ],
};

const e3: Exercise = {
  id: 'srg-3',
  level: 1,
  topicId: T,
  subtopicIds: GEO,
  intro: String.raw`הסדרה $a_n$ נתונה בנוסחה לפי מקום: $a_n=4\cdot3^{n-1}$. בשרטוט מוצגים ארבעת האיברים הראשונים של הסדרה.`,
  diagram: { kind: 'seq', terms: [4, 12, 36, 108], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזה כלל נסיגה מגדיר את אותה סדרה (לכל $n$ טבעי)?`,
      hints: [String.raw`כלל נסיגה מורכב משני חלקים: האיבר הראשון, והקשר בין $a_{n+1}$ ל-$a_n$.`, String.raw`חשבו את $a_1$ מהנוסחה ואת המנה $\dfrac{a_{n+1}}{a_n}$. כלל נכון חייב להתאים לכל האיברים, לא רק לשניים הראשונים.`],
      check: { kind: 'choice', options: [String.raw`$a_1=3,\ a_{n+1}=4a_n$`, String.raw`$a_1=4,\ a_{n+1}=a_n+8n$`, String.raw`$a_1=4,\ a_{n+1}=3a_n$`, String.raw`$a_1=12,\ a_{n+1}=3a_n$`], correct: 2 },
      short: String.raw`$a_1=4\cdot3^0=4$ ו-$\dfrac{a_{n+1}}{a_n}=\dfrac{4\cdot3^{n}}{4\cdot3^{n-1}}=3$, ולכן $a_1=4,\ a_{n+1}=3a_n$.`,
      full: [String.raw`האיבר הראשון: $a_1=4\cdot3^{1-1}=4$.`, String.raw`האיבר הבא: $a_{n+1}=4\cdot3^{(n+1)-1}=4\cdot3^{n}=3\cdot\left(4\cdot3^{n-1}\right)=3a_n$.`, String.raw`לכן זו סדרה הנדסית שמנתה 3, וכלל הנסיגה שלה: $a_1=4,\ a_{n+1}=3a_n$.`, String.raw`הכלל $a_{n+1}=a_n+8n$ נותן אמנם $a_2=12$, אבל $a_3=12+16=28\ne36$, ולכן הוא אינו מתאים.`],
    },
  ],
};

const e4: Exercise = {
  id: 'srg-4',
  level: 1,
  topicId: T,
  subtopicIds: GEO,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי $a_1=27$, $a_{n+1}=\dfrac23a_n$. בשרטוט מוצגים ארבעת האיברים הראשונים של הסדרה.`,
  diagram: { kind: 'seq', terms: [27, 18, 12, 8], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הסדרה נמשכת בלי סוף. חשבו את סכום כל איבריה: $a_1+a_2+a_3+\dots$`,
      hints: [String.raw`לפי כלל הנסיגה כל איבר מתקבל מקודמו בכפל באותו מספר. איזו סדרה זו, ומהי המנה שלה?`, String.raw`סכום סדרה הנדסית אינסופית שמנתה מקיימת $-1<q<1$: $S=\dfrac{a_1}{1-q}$.`],
      check: { kind: 'numeric', answer: 81, verify: '27/(1-2/3)' },
      short: String.raw`סדרה הנדסית אינסופית, $a_1=27$, $q=\dfrac23$: $S=\dfrac{27}{1-\frac23}=81$.`,
      full: [String.raw`$\dfrac{a_{n+1}}{a_n}=\dfrac23$ לכל $n$, ולכן זו סדרה הנדסית שמנתה $q=\dfrac23$.`, String.raw`$-1<q<1$, ולכן לסדרה האינסופית יש סכום: $S=\dfrac{a_1}{1-q}$.`, String.raw`$S=\dfrac{27}{1-\frac23}=\dfrac{27}{\frac13}=81$.`],
    },
  ],
};

const e5: Exercise = {
  id: 'srg-5',
  level: 2,
  topicId: T,
  subtopicIds: BOTH,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי $a_1=5$, $a_{n+1}=3a_n-4$. מגדירים סדרה חדשה: $b_n=a_n-2$. בשרטוט מוצגים שלושת האיברים הראשונים של $a_n$.`,
  diagram: { kind: 'seq', terms: [5, 11, 29] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הביעו את $b_{n+1}$ באמצעות $b_n$. $b_{n+1}$ שווה ל:`,
      hints: [String.raw`לפי ההגדרה $b_{n+1}=a_{n+1}-2$. הציבו את כלל הנסיגה במקום $a_{n+1}$.`, String.raw`מקבלים $b_{n+1}=3a_n-6$. הוציאו גורם משותף והשוו ל-$b_n=a_n-2$.`],
      check: { kind: 'choice', options: [String.raw`$3b_n-4$`, String.raw`$3b_n$`, String.raw`$b_n+3$`, String.raw`$3b_n+2$`], correct: 1 },
      short: String.raw`$b_{n+1}=a_{n+1}-2=3a_n-6=3(a_n-2)=3b_n$: הסדרה $b_n$ הנדסית ומנתה 3.`,
      full: [String.raw`$b_{n+1}=a_{n+1}-2$ (ההגדרה של $b$ במקום $n+1$).`, String.raw`מציבים $a_{n+1}=3a_n-4$: $b_{n+1}=3a_n-4-2=3a_n-6$.`, String.raw`$3a_n-6=3(a_n-2)=3b_n$.`, String.raw`$b_1=5-2=3\ne0$, ולכן $\dfrac{b_{n+1}}{b_n}=3$ לכל $n$: $b_n$ סדרה הנדסית שמנתה 3.`],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $a_6$.`,
      hints: [String.raw`מצאו את $b_1$ ואת האיבר הכללי של הסדרה ההנדסית $b_n$, ורק אחר כך חזרו ל-$a_n$.`, String.raw`$b_n=b_1\cdot q^{n-1}=3\cdot3^{n-1}$, ו-$a_n=b_n+2$.`],
      check: { kind: 'numeric', answer: 731, verify: '(5-2)*3^(6-1)+2' },
      short: String.raw`$b_1=3$, $b_6=3\cdot3^5=729$, ולכן $a_6=b_6+2=731$.`,
      full: [String.raw`$b_1=a_1-2=3$ ו-$q=3$, ולכן $b_n=3\cdot3^{n-1}=3^n$.`, String.raw`$a_n=b_n+2=3^n+2$. (בדיקה: $a_1=5$, $a_2=11$, $a_3=29$, כמו בשרטוט.)`, String.raw`$a_6=3^6+2=729+2=731$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את הסכום $a_1+a_2+\dots+a_6$.`,
      hints: [String.raw`כל איבר $a_k$ שווה ל-$b_k+2$. פרקו את הסכום לסכום האיברים של $b$ ועוד שש פעמים 2.`, String.raw`סכום $n$ האיברים הראשונים של סדרה הנדסית: $S_n=\dfrac{b_1(q^n-1)}{q-1}$.`],
      check: { kind: 'numeric', answer: 1104, verify: '(5-2)*(3^6-1)/(3-1)+2*6' },
      short: String.raw`$\left(b_1+\dots+b_6\right)+6\cdot2=\dfrac{3(3^6-1)}{3-1}+12=1092+12=1104$.`,
      full: [String.raw`$a_1+\dots+a_6=(b_1+2)+(b_2+2)+\dots+(b_6+2)=(b_1+\dots+b_6)+6\cdot2$.`, String.raw`$b_1+\dots+b_6=\dfrac{3\left(3^6-1\right)}{3-1}=\dfrac{3\cdot728}{2}=1092$.`, String.raw`הסכום המבוקש: $1092+12=1104$.`],
    },
  ],
};

const e6: Exercise = {
  id: 'srg-6',
  level: 2,
  topicId: T,
  subtopicIds: BOTH,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי $a_1=2$, $a_{n+1}=4a_n-3$. מגדירים את סדרת ההפרשים: $b_n=a_{n+1}-a_n$. בשרטוט מוצגים ארבעת האיברים הראשונים של $a_n$.`,
  diagram: { kind: 'seq', terms: [2, 5, 17, 65] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הביעו את $b_{n+1}$ באמצעות $b_n$. $b_{n+1}$ שווה ל:`,
      hints: [String.raw`$b_{n+1}=a_{n+2}-a_{n+1}$. כתבו את $a_{n+2}$ ואת $a_{n+1}$ בעזרת כלל הנסיגה.`, String.raw`$a_{n+2}=4a_{n+1}-3$ ו-$a_{n+1}=4a_n-3$. כשמחסרים, ה-$3$ מתבטל.`],
      check: { kind: 'choice', options: [String.raw`$4b_n-3$`, String.raw`$b_n+3$`, String.raw`$4b_n$`, String.raw`$3b_n$`], correct: 2 },
      short: String.raw`$b_{n+1}=(4a_{n+1}-3)-(4a_n-3)=4(a_{n+1}-a_n)=4b_n$: סדרת ההפרשים הנדסית ומנתה 4.`,
      full: [String.raw`$b_{n+1}=a_{n+2}-a_{n+1}$.`, String.raw`לפי כלל הנסיגה: $a_{n+2}=4a_{n+1}-3$ ו-$a_{n+1}=4a_n-3$.`, String.raw`$b_{n+1}=(4a_{n+1}-3)-(4a_n-3)=4a_{n+1}-4a_n=4(a_{n+1}-a_n)=4b_n$.`, String.raw`$b_1=a_2-a_1=5-2=3\ne0$, ולכן $b_n$ סדרה הנדסית שמנתה 4. (בשרטוט: ההפרשים הם $3,\ 12,\ 48$.)`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את הסכום $b_1+b_2+\dots+b_5$.`,
      hints: [String.raw`מצאו את $b_1$ מתוך $a_1$ ו-$a_2$.`, String.raw`$b_1=3$, $q=4$, ו-$S_5=\dfrac{b_1(q^5-1)}{q-1}$.`],
      check: { kind: 'numeric', answer: 1023, verify: '((4*2-3)-2)*(4^5-1)/(4-1)' },
      short: String.raw`$b_1=3$, $q=4$: $S_5=\dfrac{3(4^5-1)}{4-1}=1023$.`,
      full: [String.raw`$b_1=a_2-a_1=5-2=3$, והמנה $q=4$.`, String.raw`$S_5=\dfrac{b_1(q^5-1)}{q-1}=\dfrac{3\cdot(1024-1)}{3}=1023$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את $a_6$ בעזרת הסכום שחישבתם בסעיף ב.`,
      hints: [String.raw`כתבו את הסכום $b_1+b_2+\dots+b_5$ באמצעות איברי $a$: $(a_2-a_1)+(a_3-a_2)+\dots$ מה מצטמצם?`, String.raw`$b_1+b_2+\dots+b_5=a_6-a_1$.`],
      check: { kind: 'numeric', answer: 1025, verify: '2+((4*2-3)-2)*(4^5-1)/(4-1)' },
      short: String.raw`ההפרשים מצטמצמים: $b_1+\dots+b_5=a_6-a_1$, ולכן $a_6=2+1023=1025$.`,
      full: [String.raw`$b_1+b_2+\dots+b_5=(a_2-a_1)+(a_3-a_2)+(a_4-a_3)+(a_5-a_4)+(a_6-a_5)$.`, String.raw`כל האיברים האמצעיים מצטמצמים, ונשאר $a_6-a_1$.`, String.raw`$a_6=a_1+1023=2+1023=1025$.`, String.raw`בדיקה ישירה: $a_5=4\cdot65-3=257$, $a_6=4\cdot257-3=1025$.`],
    },
  ],
};

const e7: Exercise = {
  id: 'srg-7',
  level: 2,
  topicId: T,
  subtopicIds: BOTH,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי $a_1=1$, $a_{n+1}=\dfrac{2^n}{a_n}$. בשרטוט מוצגים שלושת האיברים הראשונים של הסדרה.`,
  diagram: { kind: 'seq', terms: [1, 2, 2], style: 'bars' },
  solutionDiagram: { kind: 'seq', terms: [1, 2, 2, 4, 4, 8, 8, 16, 16, 32], style: 'bars', highlight: [1, 3, 5, 7, 9] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $a_5$.`,
      hints: [String.raw`המעריך בכלל הנסיגה הוא המקום של האיבר הקודם: $a_4=\dfrac{2^3}{a_3}$.`, String.raw`$a_4=\dfrac82=4$, ו-$a_5=\dfrac{2^4}{a_4}$.`],
      check: { kind: 'numeric', answer: 4, verify: '2^4/(2^3/(2^2/(2^1/1)))' },
      short: String.raw`$a_4=\dfrac{2^3}{a_3}=\dfrac82=4$, $a_5=\dfrac{2^4}{a_4}=\dfrac{16}{4}=4$.`,
      full: [String.raw`$a_2=\dfrac{2^1}{a_1}=2$ ו-$a_3=\dfrac{2^2}{a_2}=2$ (כמו בשרטוט).`, String.raw`$n=3$: $a_4=\dfrac{2^3}{a_3}=\dfrac82=4$.`, String.raw`$n=4$: $a_5=\dfrac{2^4}{a_4}=\dfrac{16}{4}=4$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`המנה $\dfrac{a_{n+2}}{a_n}$ שווה (לכל $n$ טבעי) ל:`,
      hints: [String.raw`כתבו את כלל הנסיגה למקום הבא: $a_{n+2}=\dfrac{2^{n+1}}{a_{n+1}}$.`, String.raw`הציבו $a_{n+1}=\dfrac{2^n}{a_n}$ וצמצמו.`],
      check: { kind: 'choice', options: [String.raw`$2^n$`, String.raw`$4$`, String.raw`$2$`, String.raw`$\dfrac12$`], correct: 2 },
      short: String.raw`$a_{n+2}=\dfrac{2^{n+1}}{a_{n+1}}=2^{n+1}\cdot\dfrac{a_n}{2^n}=2a_n$, ולכן המנה היא 2.`,
      full: [String.raw`$a_{n+2}=\dfrac{2^{n+1}}{a_{n+1}}$ (כלל הנסיגה עם $n+1$ במקום $n$).`, String.raw`מציבים $a_{n+1}=\dfrac{2^n}{a_n}$: $a_{n+2}=2^{n+1}\cdot\dfrac{a_n}{2^n}=2a_n$.`, String.raw`כלומר $\dfrac{a_{n+2}}{a_n}=2$: כל איבר גדול פי 2 מהאיבר שנמצא שני מקומות לפניו.`, String.raw`מסקנה: האיברים שבמקומות האי-זוגיים ($a_1,a_3,a_5,\dots$) מהווים סדרה הנדסית שמנתה 2, וכך גם האיברים שבמקומות הזוגיים ($a_2,a_4,a_6,\dots$).`, String.raw`הסדרה כולה אינה הנדסית: $\dfrac{a_2}{a_1}=2$ אבל $\dfrac{a_3}{a_2}=1$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את סכום עשרת האיברים הראשונים של הסדרה.`,
      hints: [String.raw`הפרידו לשני סכומים: חמשת האיברים שבמקומות האי-זוגיים וחמשת האיברים שבמקומות הזוגיים.`, String.raw`במקומות האי-זוגיים: סדרה הנדסית שאיברה הראשון $a_1=1$ ומנתה 2. במקומות הזוגיים: איבר ראשון $a_2=2$ ומנה 2. בכל אחת חמישה איברים.`],
      check: { kind: 'numeric', answer: 93, verify: '1*(2^5-1)/(2-1)+(2^1/1)*(2^5-1)/(2-1)' },
      short: String.raw`$\dfrac{1\cdot(2^5-1)}{2-1}+\dfrac{2\cdot(2^5-1)}{2-1}=31+62=93$.`,
      full: [String.raw`מקומות אי-זוגיים: $a_1,a_3,a_5,a_7,a_9$. סדרה הנדסית, איבר ראשון 1, מנה 2, חמישה איברים: $\dfrac{1\cdot(2^5-1)}{2-1}=31$.`, String.raw`מקומות זוגיים: $a_2,a_4,a_6,a_8,a_{10}$. איבר ראשון 2, מנה 2, חמישה איברים: $\dfrac{2\cdot(2^5-1)}{2-1}=62$.`, String.raw`הסכום: $31+62=93$.`, String.raw`בדיקה: האיברים הם $1,2,2,4,4,8,8,16,16,32$, וסכומם 93.`],
    },
  ],
};

const e8: Exercise = {
  id: 'srg-8',
  level: 2,
  topicId: T,
  subtopicIds: BOTH,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי $a_1=10$, $a_{n+1}=\dfrac12a_n+1$. מגדירים סדרה חדשה $b_n=a_n-c$, כאשר $c$ מספר קבוע. בשרטוט מוצגים ארבעת האיברים הראשונים של $a_n$.`,
  diagram: { kind: 'seq', terms: [10, 6, 4, 3] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את ערכו של $c$ שעבורו $b_n$ היא סדרה הנדסית.`,
      hints: [String.raw`כתבו $b_{n+1}=a_{n+1}-c$, הציבו את כלל הנסיגה, ואחר כך הציבו $a_n=b_n+c$.`, String.raw`מתקבל $b_{n+1}=\dfrac12b_n+1-\dfrac{c}{2}$. בסדרה הנדסית $b_{n+1}=q\cdot b_n$, בלי מחובר חופשי.`],
      check: { kind: 'numeric', answer: 2, verify: '1/(1-1/2)' },
      short: String.raw`$b_{n+1}=\dfrac12b_n+\left(1-\dfrac c2\right)$; המחובר החופשי מתאפס כאשר $c=2$, ואז $b_{n+1}=\dfrac12b_n$.`,
      full: [String.raw`$b_{n+1}=a_{n+1}-c=\dfrac12a_n+1-c$.`, String.raw`מציבים $a_n=b_n+c$: $b_{n+1}=\dfrac12(b_n+c)+1-c=\dfrac12b_n+1-\dfrac{c}{2}$.`, String.raw`כדי שיתקיים $b_{n+1}=q\cdot b_n$ צריך $1-\dfrac c2=0$, כלומר $c=2$.`, String.raw`אז $b_{n+1}=\dfrac12b_n$ ו-$b_1=10-2=8\ne0$: סדרה הנדסית שמנתה $\dfrac12$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $a_7$.`,
      hints: [String.raw`$b_n$ סדרה הנדסית: $b_1=8$, $q=\dfrac12$. מצאו את $b_7$.`, String.raw`$a_7=b_7+2$.`],
      check: { kind: 'numeric', answer: 2.125, verify: '(10-2)*(1/2)^(7-1)+2' },
      short: String.raw`$b_7=8\cdot\left(\dfrac12\right)^6=\dfrac18$, ולכן $a_7=2+\dfrac18=2.125$.`,
      full: [String.raw`$b_n=8\cdot\left(\dfrac12\right)^{n-1}$, ולכן $a_n=2+8\cdot\left(\dfrac12\right)^{n-1}$.`, String.raw`$b_7=8\cdot\dfrac{1}{64}=\dfrac18$.`, String.raw`$a_7=2+\dfrac18=2.125$. (בדיקה: המשך הסדרה שבשרטוט הוא $2.5,\ 2.25,\ 2.125$.)`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את סכום הסדרה האינסופית $b_1+b_2+b_3+\dots$`,
      hints: [String.raw`$b_n$ סדרה הנדסית אינסופית שמנתה בין $-1$ ל-$1$.`, String.raw`$S=\dfrac{b_1}{1-q}$.`],
      check: { kind: 'numeric', answer: 16, verify: '(10-2)/(1-1/2)' },
      short: String.raw`$S=\dfrac{b_1}{1-q}=\dfrac{8}{1-\frac12}=16$.`,
      full: [String.raw`$b_1=8$, $q=\dfrac12$, ו-$-1<q<1$, ולכן יש סכום אינסופי.`, String.raw`$S=\dfrac{8}{1-\frac12}=16$.`, String.raw`שימו לב: לסדרה $a_n$ עצמה אין סכום אינסופי, כי איבריה מתקרבים ל-2 ולא ל-0.`],
    },
  ],
};

const e9: Exercise = {
  id: 'srg-9',
  level: 3,
  topicId: T,
  subtopicIds: BOTH,
  intro: String.raw`במאגר מים יש בתחילת היום הראשון $2500$ ליטר. בכל יום נצרכים $20\%$ מכמות המים שהייתה במאגר בתחילת אותו יום, ובסוף היום מוסיפים למאגר $300$ ליטר. נסמן ב-$a_n$ את כמות המים במאגר (בליטרים) בתחילת היום ה-$n$. בשרטוט מוצגות הכמויות בתחילת היום הראשון ובתחילת היום השני.`,
  diagram: { kind: 'seq', terms: [2500, 2300], style: 'bars' },
  solutionDiagram: { kind: 'seq', terms: [2500, 2300, 2140, 2012, 1909.6, 1827.68], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את כמות המים במאגר בתחילת היום השלישי.`,
      hints: [String.raw`אם נצרכים $20\%$ מהמים, נשארים $80\%$ מהם. כתבו כלל נסיגה שמקשר בין $a_{n+1}$ ל-$a_n$.`, String.raw`$a_{n+1}=0.8a_n+300$. חשבו את $a_2$ ואחר כך את $a_3$.`],
      check: { kind: 'numeric', answer: 2140, verify: '0.8*(0.8*2500+300)+300' },
      short: String.raw`$a_{n+1}=0.8a_n+300$: $a_2=2300$, $a_3=0.8\cdot2300+300=2140$ ליטר.`,
      full: [String.raw`במהלך היום ה-$n$ נצרכים $0.2a_n$ ליטר ונשארים $0.8a_n$; בסוף היום מוסיפים 300 ליטר.`, String.raw`כלל הנסיגה: $a_1=2500$, $a_{n+1}=0.8a_n+300$.`, String.raw`$a_2=0.8\cdot2500+300=2300$.`, String.raw`$a_3=0.8\cdot2300+300=1840+300=2140$ ליטר.`],
    },
    {
      label: 'ב',
      prompt: String.raw`הוכיחו שהסדרה $b_n=a_n-1500$ היא סדרה הנדסית, ומצאו את מנתה.`,
      hints: [String.raw`כתבו $b_{n+1}=a_{n+1}-1500$ והציבו את כלל הנסיגה.`, String.raw`$0.8a_n+300-1500=0.8a_n-1200$. הוציאו $0.8$ כגורם משותף.`],
      check: { kind: 'self' },
      short: String.raw`$b_{n+1}=0.8a_n+300-1500=0.8(a_n-1500)=0.8b_n$, ו-$b_1=1000\ne0$: סדרה הנדסית שמנתה $0.8$.`,
      full: [String.raw`$b_{n+1}=a_{n+1}-1500=0.8a_n+300-1500=0.8a_n-1200$.`, String.raw`$0.8a_n-1200=0.8(a_n-1500)=0.8b_n$.`, String.raw`$b_1=a_1-1500=1000\ne0$, ולכן כל איברי $b_n$ שונים מאפס ו-$\dfrac{b_{n+1}}{b_n}=0.8$ לכל $n$ טבעי.`, String.raw`המנה קבועה, ולכן $b_n$ סדרה הנדסית שמנתה $q=0.8$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את כמות המים במאגר בתחילת היום השישי.`,
      hints: [String.raw`מצאו את האיבר הכללי של $b_n$, ואחר כך $a_n=b_n+1500$.`, String.raw`$b_n=1000\cdot0.8^{n-1}$, ולכן $a_6=1500+1000\cdot0.8^5$.`],
      check: { kind: 'numeric', answer: 1827.68, verify: '1500+(2500-1500)*0.8^(6-1)' },
      short: String.raw`$a_n=1500+1000\cdot0.8^{n-1}$, ולכן $a_6=1500+1000\cdot0.8^5=1827.68$ ליטר.`,
      full: [String.raw`$b_n=b_1q^{n-1}=1000\cdot0.8^{n-1}$.`, String.raw`$a_n=b_n+1500=1500+1000\cdot0.8^{n-1}$.`, String.raw`$0.8^5=0.32768$, ולכן $a_6=1500+327.68=1827.68$ ליטר.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את כמות המים הכוללת שנצרכה מהמאגר בששת הימים הראשונים (אפשר לעגל לליטר שלם).`,
      hints: [String.raw`ביום ה-$n$ נצרכים $0.2a_n$ ליטר, ולכן הכמות הכוללת היא $0.2\cdot(a_1+a_2+\dots+a_6)$.`, String.raw`$a_1+\dots+a_6=(b_1+\dots+b_6)+6\cdot1500$, והסכום של $b$ הוא סכום של סדרה הנדסית.`, String.raw`$b_1+\dots+b_6=\dfrac{1000\left(1-0.8^6\right)}{1-0.8}$.`],
      check: { kind: 'numeric', answer: 2537.856, verify: '0.2*(6*1500+(2500-1500)*(1-0.8^6)/(1-0.8))' },
      short: String.raw`$0.2\cdot\left(6\cdot1500+\dfrac{1000(1-0.8^6)}{1-0.8}\right)=0.2\cdot12689.28\approx2538$ ליטר.`,
      full: [String.raw`הצריכה ביום ה-$n$ היא $0.2a_n$, ולכן הצריכה הכוללת: $0.2\,(a_1+a_2+\dots+a_6)$.`, String.raw`$a_1+\dots+a_6=(b_1+\dots+b_6)+6\cdot1500$.`, String.raw`$b_1+\dots+b_6=\dfrac{1000\left(1-0.8^6\right)}{1-0.8}=5000\cdot(1-0.262144)=3689.28$.`, String.raw`$a_1+\dots+a_6=3689.28+9000=12689.28$.`, String.raw`הצריכה הכוללת: $0.2\cdot12689.28=2537.856\approx2538$ ליטר.`],
    },
  ],
};

const e10: Exercise = {
  id: 'srg-10',
  level: 3,
  topicId: T,
  subtopicIds: BOTH,
  intro: String.raw`הסדרה $a_n$ מוגדרת לכל $n$ טבעי על ידי $a_1=1$, $a_{n+1}=\dfrac{a_n}{3a_n+2}$. כל איברי הסדרה חיוביים. מגדירים סדרה חדשה: $b_n=\dfrac{1}{a_n}+3$. בשרטוט מוצגים שני האיברים הראשונים של $a_n$.`,
  diagram: { kind: 'seq', terms: [1, 0.2] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $a_3$ (אפשר להקליד שבר, למשל 2/7).`,
      hints: [String.raw`הציבו $a_2=\dfrac15$ בכלל הנסיגה.`, String.raw`$a_3=\dfrac{\frac15}{3\cdot\frac15+2}$. כפלו מונה ומכנה ב-5.`],
      check: { kind: 'numeric', answer: 0.0769230769, tol: 0.0005, verify: '(1/(3*1+2))/(3*(1/(3*1+2))+2)' },
      short: String.raw`$a_3=\dfrac{\frac15}{\frac35+2}=\dfrac{1}{3+10}=\dfrac{1}{13}$.`,
      full: [String.raw`$a_2=\dfrac{a_1}{3a_1+2}=\dfrac15$.`, String.raw`$a_3=\dfrac{a_2}{3a_2+2}=\dfrac{\frac15}{\frac35+2}$.`, String.raw`כופלים מונה ומכנה ב-5: $a_3=\dfrac{1}{3+10}=\dfrac{1}{13}\approx0.077$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`הוכיחו ש-$b_n$ היא סדרה הנדסית, ומצאו את מנתה.`,
      hints: [String.raw`$b_{n+1}=\dfrac{1}{a_{n+1}}+3$. ההופכי של $a_{n+1}$ הוא $\dfrac{3a_n+2}{a_n}$.`, String.raw`$\dfrac{3a_n+2}{a_n}=3+\dfrac{2}{a_n}$. חברו 3 והוציאו גורם משותף 2.`],
      check: { kind: 'self' },
      short: String.raw`$b_{n+1}=\dfrac{3a_n+2}{a_n}+3=\dfrac{2}{a_n}+6=2\left(\dfrac{1}{a_n}+3\right)=2b_n$, ו-$b_1=4\ne0$: סדרה הנדסית שמנתה 2.`,
      full: [String.raw`$\dfrac{1}{a_{n+1}}=\dfrac{3a_n+2}{a_n}=3+\dfrac{2}{a_n}$ (האיברים חיוביים, ולכן מותר להפוך).`, String.raw`$b_{n+1}=\dfrac{1}{a_{n+1}}+3=\dfrac{2}{a_n}+6=2\left(\dfrac{1}{a_n}+3\right)=2b_n$.`, String.raw`$b_1=\dfrac{1}{a_1}+3=4\ne0$, ולכן $\dfrac{b_{n+1}}{b_n}=2$ לכל $n$ טבעי.`, String.raw`המנה קבועה: $b_n$ סדרה הנדסית שמנתה $q=2$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את $a_6$.`,
      hints: [String.raw`מצאו את $b_6$ מהאיבר הכללי של הסדרה ההנדסית, ואחר כך חלצו את $a_6$ מתוך $b_6=\dfrac{1}{a_6}+3$.`, String.raw`$b_6=4\cdot2^5=128$, ולכן $\dfrac{1}{a_6}=125$.`],
      check: { kind: 'numeric', answer: 0.008, verify: '1/((1/1+3)*2^(6-1)-3)' },
      short: String.raw`$b_6=4\cdot2^5=128$, $\dfrac{1}{a_6}=128-3=125$, ולכן $a_6=\dfrac{1}{125}=0.008$.`,
      full: [String.raw`$b_n=b_1q^{n-1}=4\cdot2^{n-1}=2^{n+1}$.`, String.raw`$\dfrac{1}{a_n}=b_n-3=2^{n+1}-3$, ולכן $a_n=\dfrac{1}{2^{n+1}-3}$. (בדיקה: $a_2=\dfrac15$, $a_3=\dfrac{1}{13}$.)`, String.raw`$a_6=\dfrac{1}{2^7-3}=\dfrac{1}{125}=0.008$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את הסכום $\dfrac{1}{a_1}+\dfrac{1}{a_2}+\dots+\dfrac{1}{a_8}$.`,
      hints: [String.raw`$\dfrac{1}{a_k}=b_k-3$. פרקו את הסכום לסכום של $b_k$ פחות שמונה פעמים 3.`, String.raw`$b_1+\dots+b_8=\dfrac{4(2^8-1)}{2-1}$.`],
      check: { kind: 'numeric', answer: 996, verify: '(1/1+3)*(2^8-1)/(2-1)-3*8' },
      short: String.raw`$(b_1+\dots+b_8)-8\cdot3=\dfrac{4(2^8-1)}{2-1}-24=1020-24=996$.`,
      full: [String.raw`$\dfrac{1}{a_1}+\dots+\dfrac{1}{a_8}=(b_1-3)+\dots+(b_8-3)=(b_1+\dots+b_8)-8\cdot3$.`, String.raw`$b_1+\dots+b_8=\dfrac{4\left(2^8-1\right)}{2-1}=4\cdot255=1020$.`, String.raw`הסכום המבוקש: $1020-24=996$.`, String.raw`בדיקה: ההופכיים הם $1,5,13,29,61,125,253,509$, וסכומם 996.`],
    },
  ],
};

const e11: Exercise = {
  id: 'srg-11',
  level: 3,
  topicId: T,
  subtopicIds: BOTH,
  intro: String.raw`בסדרה $a_n$ כל האיברים חיוביים. נתון: $a_1=3$, ולכל $n$ טבעי $a_n\cdot a_{n+1}=6\cdot4^{n-1}$. בשרטוט מוצגים ששת האיברים הראשונים של הסדרה, בלי ערכיהם; האיברים שבמקומות האי-זוגיים מודגשים.`,
  diagram: { kind: 'seq', terms: [3, 2, 12, 8, 48, 32], style: 'bars', labels: false, highlight: [1, 3, 5] },
  solutionDiagram: { kind: 'seq', terms: [3, 2, 12, 8, 48, 32], style: 'bars', highlight: [1, 3, 5] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $a_4$.`,
      hints: [String.raw`הציבו $n=1$ בנתון כדי למצוא את $a_2$, אחר כך $n=2$, וכן הלאה.`, String.raw`$a_1a_2=6$, $a_2a_3=6\cdot4=24$, $a_3a_4=6\cdot4^2=96$.`],
      check: { kind: 'numeric', answer: 8, verify: '6*4^2/(6*4^1/(6*4^0/3))' },
      short: String.raw`$a_2=\dfrac63=2$, $a_3=\dfrac{24}{2}=12$, $a_4=\dfrac{96}{12}=8$.`,
      full: [String.raw`$n=1$: $a_1\cdot a_2=6\cdot4^0=6$, ולכן $a_2=\dfrac63=2$.`, String.raw`$n=2$: $a_2\cdot a_3=6\cdot4=24$, ולכן $a_3=12$.`, String.raw`$n=3$: $a_3\cdot a_4=6\cdot16=96$, ולכן $a_4=\dfrac{96}{12}=8$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`הוכיחו שלכל $n$ טבעי $a_{n+2}=4a_n$. הסבירו מה אפשר להסיק מכך על האיברים שבמקומות האי-זוגיים ועל האיברים שבמקומות הזוגיים.`,
      hints: [String.raw`כתבו את הנתון פעמיים: פעם עבור $n$ ופעם עבור $n+1$.`, String.raw`חלקו את השוויון $a_{n+1}\cdot a_{n+2}=6\cdot4^{n}$ בשוויון $a_n\cdot a_{n+1}=6\cdot4^{n-1}$.`],
      check: { kind: 'self' },
      short: String.raw`$\dfrac{a_{n+1}a_{n+2}}{a_na_{n+1}}=\dfrac{6\cdot4^n}{6\cdot4^{n-1}}=4$, כלומר $a_{n+2}=4a_n$: האיברים שבמקומות האי-זוגיים מהווים סדרה הנדסית שמנתה 4, וכך גם האיברים שבמקומות הזוגיים.`,
      full: [String.raw`הנתון עבור $n$: $a_n\cdot a_{n+1}=6\cdot4^{n-1}$. הנתון עבור $n+1$: $a_{n+1}\cdot a_{n+2}=6\cdot4^{n}$.`, String.raw`האיברים חיוביים, ולכן מותר לחלק את השוויון השני בראשון: $\dfrac{a_{n+1}\cdot a_{n+2}}{a_n\cdot a_{n+1}}=\dfrac{6\cdot4^{n}}{6\cdot4^{n-1}}$.`, String.raw`אחרי צמצום: $\dfrac{a_{n+2}}{a_n}=4$, כלומר $a_{n+2}=4a_n$ לכל $n$ טבעי.`, String.raw`מסקנה: כל איבר גדול פי 4 מהאיבר שנמצא שני מקומות לפניו. לכן $a_1,a_3,a_5,\dots$ היא סדרה הנדסית שמנתה 4 (איבר ראשון 3), וגם $a_2,a_4,a_6,\dots$ היא סדרה הנדסית שמנתה 4 (איבר ראשון 2).`, String.raw`הסדרה כולה אינה הנדסית: $\dfrac{a_2}{a_1}=\dfrac23$ אבל $\dfrac{a_3}{a_2}=6$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את סכום עשרת האיברים הראשונים של הסדרה.`,
      hints: [String.raw`בעשרת האיברים הראשונים יש חמישה במקומות אי-זוגיים וחמישה במקומות זוגיים. חשבו כל סכום בנפרד.`, String.raw`אי-זוגיים: איבר ראשון 3, מנה 4, חמישה איברים. זוגיים: איבר ראשון 2, מנה 4, חמישה איברים.`],
      check: { kind: 'numeric', answer: 1705, verify: '3*(4^5-1)/(4-1)+(6/3)*(4^5-1)/(4-1)' },
      short: String.raw`$\dfrac{3(4^5-1)}{4-1}+\dfrac{2(4^5-1)}{4-1}=1023+682=1705$.`,
      full: [String.raw`מקומות אי-זוגיים ($a_1,a_3,\dots,a_9$): $\dfrac{3\left(4^5-1\right)}{4-1}=1023$.`, String.raw`מקומות זוגיים ($a_2,a_4,\dots,a_{10}$): $\dfrac{2\left(4^5-1\right)}{4-1}=\dfrac{2\cdot1023}{3}=682$.`, String.raw`הסכום: $1023+682=1705$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`סכום $2n$ האיברים הראשונים של הסדרה הוא $6825$. מצאו את $n$.`,
      hints: [String.raw`ב-$2n$ האיברים הראשונים יש $n$ איברים במקומות אי-זוגיים ו-$n$ במקומות זוגיים.`, String.raw`$S_{2n}=\dfrac{3(4^n-1)}{3}+\dfrac{2(4^n-1)}{3}=\dfrac53\left(4^n-1\right)$.`, String.raw`$\dfrac53(4^n-1)=6825$ נותן $4^n=4096$. כתבו את $4096$ כחזקה של 4.`],
      check: { kind: 'numeric', answer: 6, verify: 'log(6825*(4-1)/(3+2)+1, 4)' },
      short: String.raw`$\dfrac53\left(4^n-1\right)=6825\Rightarrow4^n=4096=4^6$, ולכן $n=6$.`,
      full: [String.raw`סכום $n$ האיברים שבמקומות האי-זוגיים: $\dfrac{3(4^n-1)}{4-1}=4^n-1$.`, String.raw`סכום $n$ האיברים שבמקומות הזוגיים: $\dfrac{2(4^n-1)}{4-1}=\dfrac23(4^n-1)$.`, String.raw`$S_{2n}=\dfrac53\left(4^n-1\right)=6825$, ולכן $4^n-1=4095$ ו-$4^n=4096$.`, String.raw`$4096=2^{12}=4^6$, ולכן $n=6$ (כלומר 12 האיברים הראשונים).`],
    },
  ],
};

const e12: Exercise = {
  id: 'srg-12',
  level: 3,
  topicId: T,
  subtopicIds: BOTH,
  intro: String.raw`גובהו של שתיל נמדד בסוף כל שבוע. בסוף השבוע הראשון גובהו $20$ ס״מ. במהלך השבוע השני הוא גבה ב-$12$ ס״מ, ובכל שבוע שאחריו הוא גבה בחצי ממה שגבה בשבוע הקודם. נסמן ב-$a_n$ את גובה השתיל (בס״מ) בסוף השבוע ה-$n$. בשרטוט מוצג הגובה בסוף השבוע הראשון ובסוף השבוע השני.`,
  diagram: { kind: 'seq', terms: [20, 32], style: 'bars' },
  solutionDiagram: { kind: 'seq', terms: [20, 32, 38, 41, 42.5, 43.25] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $a_4$.`,
      hints: [String.raw`בשבוע השלישי השתיל גבה בחצי מ-12 ס״מ. כמה גבה בשבוע הרביעי?`, String.raw`התוספות הן $12,\ 6,\ 3$: $a_3=32+6$, $a_4=a_3+3$.`],
      check: { kind: 'numeric', answer: 41, verify: '20+12+12/2+12/4' },
      short: String.raw`$a_2=32$, $a_3=32+6=38$, $a_4=38+3=41$.`,
      full: [String.raw`$a_2=20+12=32$.`, String.raw`בשבוע השלישי התוספת היא $\dfrac{12}{2}=6$: $a_3=38$.`, String.raw`בשבוע הרביעי התוספת היא $\dfrac62=3$: $a_4=41$ ס״מ.`],
    },
    {
      label: 'ב',
      prompt: String.raw`איזה כלל נסיגה מתאר את הסדרה $a_n$ (לכל $n$ טבעי, עם $a_1=20$)?`,
      hints: [String.raw`ההפרש $a_{n+1}-a_n$ הוא התוספת לגובה בשבוע ה-$(n+1)$. איזו סדרה יוצרות התוספות $12, 6, 3,\dots$?`, String.raw`התוספות הן סדרה הנדסית: הראשונה (עבור $n=1$) היא 12 והמנה $\dfrac12$. בדקו את הכלל שבחרתם גם עבור $n=3$.`],
      check: { kind: 'choice', options: [String.raw`$a_{n+1}=\dfrac12a_n+12$`, String.raw`$a_{n+1}=a_n+12\cdot\left(\dfrac12\right)^{n}$`, String.raw`$a_{n+1}=a_n+\dfrac{12}{n}$`, String.raw`$a_{n+1}=a_n+12\cdot\left(\dfrac12\right)^{n-1}$`], correct: 3 },
      short: String.raw`התוספות $a_{n+1}-a_n$ הן סדרה הנדסית שאיברה הראשון 12 ומנתה $\dfrac12$, ולכן $a_{n+1}=a_n+12\cdot\left(\dfrac12\right)^{n-1}$.`,
      full: [String.raw`$a_{n+1}-a_n$ היא התוספת לגובה בשבוע ה-$(n+1)$: עבור $n=1$ היא 12, עבור $n=2$ היא 6, עבור $n=3$ היא 3.`, String.raw`התוספות מהוות סדרה הנדסית שאיברה הראשון 12 ומנתה $\dfrac12$, ולכן $a_{n+1}-a_n=12\cdot\left(\dfrac12\right)^{n-1}$.`, String.raw`כלל הנסיגה: $a_1=20$, $a_{n+1}=a_n+12\cdot\left(\dfrac12\right)^{n-1}$.`, String.raw`הכלל $a_{n+1}=a_n+\dfrac{12}{n}$ מתאים ל-$a_2$ ול-$a_3$, אבל נותן $a_4=38+4=42\ne41$. הכלל עם $\left(\dfrac12\right)^{n}$ נותן $a_2=26$, והכלל $\dfrac12a_n+12$ נותן $a_2=22$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את גובה השתיל בסוף השבוע השמיני.`,
      hints: [String.raw`$a_8$ הוא $a_1$ ועוד סכום כל התוספות מהשבוע השני עד השבוע השמיני. כמה תוספות יש?`, String.raw`יש 7 תוספות, והן סדרה הנדסית: איבר ראשון 12, מנה $\dfrac12$.`, String.raw`$a_8=20+\dfrac{12\left(1-\left(\frac12\right)^7\right)}{1-\frac12}$.`],
      check: { kind: 'numeric', answer: 43.8125, verify: '20+12*(1-(1/2)^7)/(1-1/2)' },
      short: String.raw`$a_8=20+\dfrac{12\left(1-\left(\frac12\right)^7\right)}{1-\frac12}=20+24\cdot\dfrac{127}{128}=43.8125$ ס״מ.`,
      full: [String.raw`$a_8=a_1+(a_2-a_1)+(a_3-a_2)+\dots+(a_8-a_7)$: לגובה ההתחלתי מוסיפים 7 תוספות.`, String.raw`סכום 7 התוספות (סדרה הנדסית, איבר ראשון 12, מנה $\dfrac12$): $\dfrac{12\left(1-\left(\frac12\right)^7\right)}{1-\frac12}=24\cdot\dfrac{127}{128}=23.8125$.`, String.raw`$a_8=20+23.8125=43.8125$ ס״מ.`],
    },
    {
      label: 'ד',
      prompt: String.raw`לאיזה גובה (בס״מ) יתקרב השתיל אם התהליך יימשך בלי סוף?`,
      hints: [String.raw`הגובה הוא $20$ ועוד סכום כל התוספות. מה קורה לסכום כשמספר התוספות גדל בלי סוף?`, String.raw`סכום סדרה הנדסית אינסופית: $S=\dfrac{12}{1-\frac12}$.`],
      check: { kind: 'numeric', answer: 44, verify: '20+12/(1-1/2)' },
      short: String.raw`סכום כל התוספות: $\dfrac{12}{1-\frac12}=24$, ולכן הגובה מתקרב ל-$20+24=44$ ס״מ.`,
      full: [String.raw`התוספות מהוות סדרה הנדסית אינסופית שמנתה $\dfrac12$ (בין $-1$ ל-$1$), ולכן יש לה סכום: $S=\dfrac{12}{1-\frac12}=24$.`, String.raw`הגובה מתקרב ל-$20+24=44$ ס״מ, אך אינו מגיע אליו: בכל שלב חסר עדיין חלק מהתוספות.`, String.raw`אפשר לראות זאת גם בנוסחה לפי מקום: $a_n=44-24\cdot\left(\dfrac12\right)^{n-1}$, והמחוסר הולך וקטן.`],
    },
  ],
};

export const seqRecursionGeneral: ExerciseSet = {
  id: 'seq-recursion-general',
  questionnaire: '35581',
  title: 'כלל נסיגה וסדרות כלליות',
  topicIds: ['sequences'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
