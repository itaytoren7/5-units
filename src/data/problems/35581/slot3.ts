import type { Problem } from '../types';

/**
 * שאלון 35581 – שאלה 3 (הסתברות).
 * שלוש שאלות בסגנון בגרות: אוכלוסייה עם שתי תכונות (עץ / טבלה דו-ממדית), הסתברות מותנית ונוסחת בייס,
 * בדיקת אי-תלות, וסעיף מסכם של התפלגות בינומית (נוסחת ברנולי).
 */
export const slot3Problems: Problem[] = [
  {
    id: '35581-3-1',
    questionnaire: '35581',
    slot: 3,
    title: 'תלמידי 5 יחידות ופיזיקה',
    topicId: 'probability',
    subtopicIds: ['probability-basics', 'probability-conditional', 'probability-trees', 'probability-binomial'],
    difficulty: 2,
    estimatedMinutes: 20,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-3-1-a',
        label: 'א',
        statement: String.raw`בבית ספר תיכון, מחצית מהתלמידים לומדים מתמטיקה ברמה של 5 יחידות. ידוע כי 60% מהתלמידים הלומדים 5 יחידות לומדים גם פיזיקה, ואילו מבין התלמידים שאינם לומדים 5 יחידות, רק 20% לומדים פיזיקה.

בוחרים באקראי תלמיד מבית הספר. מה ההסתברות שהוא לומד פיזיקה?`,
        hints: [
          String.raw`סמנו: A – התלמיד לומד 5 יחידות, B – התלמיד לומד פיזיקה. רשמו את הנתונים כהסתברויות: $P(A)=0.5$, $P(B|A)=0.6$, $P(B|\bar{A})=0.2$.`,
          String.raw`בנו עץ הסתברויות דו-שלבי: השלב הראשון – רמת המתמטיקה, השלב השני – פיזיקה. ההסתברות של כל ענף היא מכפלת ההסתברויות לאורכו.`,
          String.raw`נוסחת ההסתברות השלמה: $P(B)=P(A)\cdot P(B|A)+P(\bar{A})\cdot P(B|\bar{A})$.`,
        ],
        solutionSteps: [
          String.raw`נסמן ב-A את המאורע "התלמיד לומד 5 יחידות" וב-B את המאורע "התלמיד לומד פיזיקה". מהנתונים: $P(A)=0.5$, $P(\bar{A})=0.5$, $P(B|A)=0.6$, $P(B|\bar{A})=0.2$.`,
          String.raw`ההסתברות שתלמיד לומד גם 5 יחידות וגם פיזיקה היא מכפלת ההסתברויות לאורך הענף המתאים בעץ: $P(A\cap B)=0.5\cdot 0.6=0.3$.`,
          String.raw`ההסתברות שתלמיד אינו לומד 5 יחידות אך לומד פיזיקה: $P(\bar{A}\cap B)=0.5\cdot 0.2=0.1$.`,
          String.raw`המאורע "לומד פיזיקה" מורכב משני הענפים הזרים הללו, ולכן לפי נוסחת ההסתברות השלמה: $P(B)=P(A\cap B)+P(\bar{A}\cap B)=0.3+0.1=0.4$.`,
        ],
        finalAnswer: String.raw`$P(B)=0.4$`,
        numericAnswer: 0.4,
      },
      {
        id: '35581-3-1-b',
        label: 'ב',
        statement: String.raw`בחרו באקראי תלמיד מבית הספר, והתברר שהוא לומד פיזיקה. מה ההסתברות שהוא לומד 5 יחידות?`,
        hints: [
          String.raw`זו הסתברות מותנית "הפוכה" (נוסחת בייס): המידע הנתון הוא שהתלמיד לומד פיזיקה, ולכן מרחב המדגם מצטמצם לתלמידי הפיזיקה בלבד.`,
          String.raw`השתמשו בהגדרה $P(A|B)=\frac{P(A\cap B)}{P(B)}$ עם הערכים שחישבתם בסעיף א.`,
          String.raw`$P(A|B)=\frac{0.3}{0.4}$.`,
        ],
        solutionSteps: [
          String.raw`נדרש לחשב $P(A|B)$ – ההסתברות שהתלמיד לומד 5 יחידות בהינתן שהוא לומד פיזיקה.`,
          String.raw`לפי הגדרת ההסתברות המותנית: $P(A|B)=\frac{P(A\cap B)}{P(B)}$.`,
          String.raw`מסעיף א: $P(A\cap B)=0.3$ ו-$P(B)=0.4$, ולכן $P(A|B)=\frac{0.3}{0.4}=0.75$.`,
          String.raw`כלומר, 75% מתלמידי הפיזיקה בבית הספר לומדים מתמטיקה ברמה של 5 יחידות.`,
        ],
        finalAnswer: String.raw`$P(A|B)=0.75$`,
        numericAnswer: 0.75,
      },
      {
        id: '35581-3-1-c',
        label: 'ג',
        statement: String.raw`האם המאורעות "התלמיד לומד 5 יחידות" ו"התלמיד לומד פיזיקה" הם מאורעות בלתי תלויים? נמקו.`,
        hints: [
          String.raw`שני מאורעות הם בלתי תלויים אם ורק אם $P(A\cap B)=P(A)\cdot P(B)$ (או, באופן שקול, $P(B|A)=P(B)$).`,
          String.raw`השוו את $P(B|A)=0.6$ הנתון ל-$P(B)$ שחישבתם בסעיף א.`,
        ],
        solutionSteps: [
          String.raw`המאורעות A ו-B בלתי תלויים אם ורק אם מתקיים $P(A\cap B)=P(A)\cdot P(B)$.`,
          String.raw`חישוב המכפלה: $P(A)\cdot P(B)=0.5\cdot 0.4=0.2$.`,
          String.raw`לעומת זאת, $P(A\cap B)=0.3$, ולכן $P(A\cap B)\ne P(A)\cdot P(B)$.`,
          String.raw`בדיקה שקולה: $P(B|A)=0.6$ בעוד $P(B)=0.4$; מאחר ש-$P(B|A)\ne P(B)$, הידיעה שהתלמיד לומד 5 יחידות משנה את ההסתברות שהוא לומד פיזיקה.`,
          String.raw`מסקנה: המאורעות תלויים (אינם בלתי תלויים).`,
        ],
        finalAnswer: String.raw`המאורעות תלויים, כי $P(A\cap B)=0.3\ne 0.2=P(A)\cdot P(B)$.`,
      },
      {
        id: '35581-3-1-d',
        label: 'ד',
        statement: String.raw`בוחרים באקראי 5 תלמידים מבית הספר (ניתן להניח שהבחירות בלתי תלויות זו בזו). מה ההסתברות שבדיוק שניים מהם לומדים פיזיקה?`,
        hints: [
          String.raw`זהו ניסוי ברנולי: 5 חזרות בלתי תלויות, ובכל חזרה "הצלחה" פירושה שהתלמיד לומד פיזיקה, בהסתברות $p=0.4$ (סעיף א).`,
          String.raw`נוסחת ברנולי: $P(X=k)=\binom{n}{k}p^{k}(1-p)^{n-k}$.`,
          String.raw`$P(X=2)=\binom{5}{2}\cdot 0.4^{2}\cdot 0.6^{3}$.`,
        ],
        solutionSteps: [
          String.raw`בכל בחירה ההסתברות שהתלמיד לומד פיזיקה היא $p=0.4$ (סעיף א), וההסתברות שאינו לומד פיזיקה היא $q=1-p=0.6$. הבחירות בלתי תלויות, ולכן מספר לומדי הפיזיקה X מבין חמשת התלמידים מתפלג בינומית.`,
          String.raw`לפי נוסחת ברנולי: $P(X=2)=\binom{5}{2}\cdot 0.4^{2}\cdot 0.6^{3}$.`,
          String.raw`חישוב הגורמים: $\binom{5}{2}=\frac{5\cdot 4}{2}=10$, $0.4^{2}=0.16$, $0.6^{3}=0.216$.`,
          String.raw`$P(X=2)=10\cdot 0.16\cdot 0.216=0.3456$.`,
        ],
        finalAnswer: String.raw`$P(X=2)=0.3456$`,
        numericAnswer: 0.3456,
      },
    ],
  },
  {
    id: '35581-3-2',
    questionnaire: '35581',
    slot: 3,
    title: 'מוצרים פגומים בשני פסי ייצור',
    topicId: 'probability',
    subtopicIds: ['probability-basics', 'probability-conditional', 'probability-trees', 'probability-binomial'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-3-2-a',
        label: 'א',
        statement: String.raw`במפעל שני פסי ייצור. 60% מהמוצרים מיוצרים בפס A והשאר בפס B. ידוע כי 5% מהמוצרים המיוצרים בפס A פגומים, ו-10% מהמוצרים המיוצרים בפס B פגומים.

בוחרים באקראי מוצר מתוצרת המפעל. מה ההסתברות שהמוצר פגום?`,
        hints: [
          String.raw`סמנו: A – המוצר יוצר בפס A, B – המוצר יוצר בפס B, D – המוצר פגום. הנתונים: $P(A)=0.6$, $P(B)=0.4$, $P(D|A)=0.05$, $P(D|B)=0.1$.`,
          String.raw`בנו עץ דו-שלבי: פס הייצור ואז מצב המוצר. מוצר פגום יכול להגיע מאחד משני ענפים זרים.`,
          String.raw`$P(D)=P(A)\cdot P(D|A)+P(B)\cdot P(D|B)$.`,
        ],
        solutionSteps: [
          String.raw`נסמן: A – המוצר יוצר בפס A, B – המוצר יוצר בפס B, D – המוצר פגום. מהנתונים: $P(A)=0.6$, $P(B)=0.4$, $P(D|A)=0.05$, $P(D|B)=0.1$.`,
          String.raw`ההסתברות שמוצר יוצר בפס A והוא פגום: $P(A\cap D)=0.6\cdot 0.05=0.03$.`,
          String.raw`ההסתברות שמוצר יוצר בפס B והוא פגום: $P(B\cap D)=0.4\cdot 0.1=0.04$.`,
          String.raw`המאורעות $A\cap D$ ו-$B\cap D$ זרים ואיחודם הוא D, ולכן $P(D)=0.03+0.04=0.07$.`,
        ],
        finalAnswer: String.raw`$P(D)=0.07$`,
        numericAnswer: 0.07,
      },
      {
        id: '35581-3-2-b',
        label: 'ב',
        statement: String.raw`בחרו באקראי מוצר והתברר שהוא פגום. מה ההסתברות שהוא יוצר בפס A?`,
        hints: [
          String.raw`המידע "המוצר פגום" מצמצם את מרחב המדגם למוצרים הפגומים בלבד – זו נוסחת בייס.`,
          String.raw`$P(A|D)=\frac{P(A\cap D)}{P(D)}$, והערכים כבר חושבו בסעיף א.`,
          String.raw`$P(A|D)=\frac{0.03}{0.07}$ – צמצמו את השבר.`,
        ],
        solutionSteps: [
          String.raw`נדרש $P(A|D)$ – ההסתברות שהמוצר יוצר בפס A בהינתן שהוא פגום.`,
          String.raw`לפי נוסחת ההסתברות המותנית: $P(A|D)=\frac{P(A\cap D)}{P(D)}$.`,
          String.raw`מסעיף א: $P(A\cap D)=0.03$, $P(D)=0.07$, ולכן $P(A|D)=\frac{0.03}{0.07}=\frac{3}{7}$.`,
          String.raw`שימו לב: אף שפס A מייצר 60% מהמוצרים, רק $\frac{3}{7}\approx 43\%$ מהמוצרים הפגומים מגיעים ממנו, כי אחוז הפגומים בו נמוך יותר.`,
        ],
        finalAnswer: String.raw`$P(A|D)=\frac{3}{7}\approx 0.4286$`,
        numericAnswer: 0.4285714286,
      },
      {
        id: '35581-3-2-c',
        label: 'ג',
        statement: String.raw`האם המאורעות "המוצר יוצר בפס A" ו"המוצר פגום" הם מאורעות בלתי תלויים? נמקו.`,
        hints: [
          String.raw`שני מאורעות A ו-D בלתי תלויים אם ורק אם $P(A\cap D)=P(A)\cdot P(D)$.`,
          String.raw`חשבו את המכפלה $P(A)\cdot P(D)$ בעזרת סעיף א והשוו ל-$P(A\cap D)=0.03$.`,
          String.raw`דרך שקולה: השוו את $P(D|A)=0.05$ ל-$P(D)=0.07$.`,
        ],
        solutionSteps: [
          String.raw`המאורעות A ו-D בלתי תלויים אם ורק אם $P(A\cap D)=P(A)\cdot P(D)$.`,
          String.raw`מסעיף א: $P(A)\cdot P(D)=0.6\cdot 0.07=0.042$.`,
          String.raw`לעומת זאת $P(A\cap D)=0.03$, ולכן $P(A\cap D)\ne P(A)\cdot P(D)$.`,
          String.raw`בדיקה שקולה: $P(D|A)=0.05\ne 0.07=P(D)$ – הידיעה שהמוצר יוצר בפס A מקטינה את ההסתברות שהוא פגום.`,
          String.raw`מסקנה: המאורעות תלויים.`,
        ],
        finalAnswer: String.raw`המאורעות תלויים, כי $P(A\cap D)=0.03\ne 0.042=P(A)\cdot P(D)$.`,
      },
      {
        id: '35581-3-2-d',
        label: 'ד',
        statement: String.raw`בוחרים באקראי 5 מוצרים מתוצרת המפעל. מה ההסתברות שלפחות שניים מהם פגומים?`,
        hints: [
          String.raw`התפלגות בינומית עם $n=5$ ו-$p=0.07$ (ההסתברות שמוצר פגום, סעיף א).`,
          String.raw`"לפחות שניים" נוח לחשב דרך המאורע המשלים: $P(X\ge 2)=1-P(X=0)-P(X=1)$.`,
          String.raw`$P(X=0)=0.93^{5}$, $P(X=1)=\binom{5}{1}\cdot 0.07\cdot 0.93^{4}$.`,
        ],
        solutionSteps: [
          String.raw`נסמן ב-X את מספר המוצרים הפגומים מבין החמישה. הבחירות בלתי תלויות ובכל אחת ההסתברות לפגום היא $p=0.07$, ולכן X מתפלג בינומית עם $n=5$.`,
          String.raw`נחשב דרך המאורע המשלים: $P(X\ge 2)=1-P(X=0)-P(X=1)$.`,
          String.raw`$P(X=0)=0.93^{5}\approx 0.69569$.`,
          String.raw`$P(X=1)=\binom{5}{1}\cdot 0.07\cdot 0.93^{4}=5\cdot 0.07\cdot 0.74805\approx 0.26182$.`,
          String.raw`$P(X\ge 2)=1-0.69569-0.26182\approx 0.0425$.`,
        ],
        finalAnswer: String.raw`$P(X\ge 2)\approx 0.0425$`,
        numericAnswer: 0.0424934272,
      },
    ],
  },
  {
    id: '35581-3-3',
    questionnaire: '35581',
    slot: 3,
    title: 'חוגי שחייה וריצה במועדון ספורט',
    topicId: 'probability',
    subtopicIds: ['probability-basics', 'probability-conditional', 'probability-trees', 'probability-binomial'],
    difficulty: 3,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-3-3-a',
        label: 'א',
        statement: String.raw`במועדון ספורט, 40% מהחברים משתתפים בחוג שחייה, 30% מהחברים משתתפים גם בחוג שחייה וגם בחוג ריצה, ו-35% מהחברים אינם משתתפים באף אחד משני החוגים.

בוחרים באקראי חבר מועדון. מה ההסתברות שהוא משתתף בחוג ריצה?`,
        hints: [
          String.raw`סמנו S – משתתף בשחייה, R – משתתף בריצה, ובנו טבלה דו-ממדית (שחייה כן/לא מול ריצה כן/לא). מלאו תחילה את התאים הנתונים: $P(S\cap R)=0.3$, $P(\bar{S}\cap\bar{R})=0.35$.`,
          String.raw`מ-$P(S)=0.4$ ו-$P(S\cap R)=0.3$ השלימו את התא $P(S\cap\bar{R})$; סכום ארבעת התאים הוא 1.`,
          String.raw`$P(R)=P(S\cap R)+P(\bar{S}\cap R)$.`,
        ],
        solutionSteps: [
          String.raw`נסמן: S – החבר משתתף בחוג שחייה, R – החבר משתתף בחוג ריצה. נתון: $P(S)=0.4$, $P(S\cap R)=0.3$, $P(\bar{S}\cap\bar{R})=0.35$.`,
          String.raw`משתתף בשחייה בלבד: $P(S\cap\bar{R})=P(S)-P(S\cap R)=0.4-0.3=0.1$.`,
          String.raw`סכום ארבעת התאים בטבלה הוא 1, ולכן משתתף בריצה בלבד: $P(\bar{S}\cap R)=1-0.3-0.1-0.35=0.25$.`,
          String.raw`ההסתברות שחבר משתתף בחוג ריצה: $P(R)=P(S\cap R)+P(\bar{S}\cap R)=0.3+0.25=0.55$.`,
          String.raw`בדיקה בעזרת נוסחת האיחוד: $P(S\cup R)=1-0.35=0.65$ ואכן $0.4+0.55-0.3=0.65$.`,
        ],
        finalAnswer: String.raw`$P(R)=0.55$`,
        numericAnswer: 0.55,
      },
      {
        id: '35581-3-3-b',
        label: 'ב',
        statement: String.raw`בחרו באקראי חבר מועדון והתברר שהוא משתתף בחוג ריצה. מה ההסתברות שהוא משתתף גם בחוג שחייה?`,
        hints: [
          String.raw`הסתברות מותנית: המרחב מצטמצם לשורת (או עמודת) "משתתף בריצה" בטבלה.`,
          String.raw`$P(S|R)=\frac{P(S\cap R)}{P(R)}$.`,
          String.raw`$P(S|R)=\frac{0.3}{0.55}$ – צמצמו לשבר פשוט.`,
        ],
        solutionSteps: [
          String.raw`נדרש $P(S|R)$ – ההסתברות שהחבר משתתף בשחייה בהינתן שהוא משתתף בריצה.`,
          String.raw`לפי הגדרת ההסתברות המותנית: $P(S|R)=\frac{P(S\cap R)}{P(R)}$.`,
          String.raw`הצבת הערכים מסעיף א: $P(S|R)=\frac{0.3}{0.55}=\frac{30}{55}=\frac{6}{11}$.`,
        ],
        finalAnswer: String.raw`$P(S|R)=\frac{6}{11}\approx 0.5455$`,
        numericAnswer: 0.5454545455,
      },
      {
        id: '35581-3-3-c',
        label: 'ג',
        statement: String.raw`האם המאורעות "החבר משתתף בחוג שחייה" ו"החבר משתתף בחוג ריצה" הם מאורעות בלתי תלויים? נמקו.`,
        hints: [
          String.raw`S ו-R בלתי תלויים אם ורק אם $P(S\cap R)=P(S)\cdot P(R)$, או באופן שקול $P(S|R)=P(S)$.`,
          String.raw`השתמשו ב-$P(S|R)$ שחישבתם בסעיף ב והשוו ל-$P(S)=0.4$.`,
        ],
        solutionSteps: [
          String.raw`המאורעות בלתי תלויים אם ורק אם $P(S\cap R)=P(S)\cdot P(R)$.`,
          String.raw`לפי סעיף א: $P(S)\cdot P(R)=0.4\cdot 0.55=0.22$.`,
          String.raw`אבל $P(S\cap R)=0.3\ne 0.22$, ולכן התנאי אינו מתקיים.`,
          String.raw`בדיקה שקולה: $P(S|R)=\frac{6}{11}\approx 0.545$ (סעיף ב), ואילו $P(S)=0.4$; כלומר, בקרב משתתפי חוג הריצה שיעור השחיינים גבוה יותר.`,
          String.raw`מסקנה: המאורעות תלויים.`,
        ],
        finalAnswer: String.raw`המאורעות תלויים, כי $P(S\cap R)=0.3\ne 0.22=P(S)\cdot P(R)$.`,
      },
      {
        id: '35581-3-3-d',
        label: 'ד',
        statement: String.raw`בוחרים באקראי 4 חברי מועדון (באופן בלתי תלוי). ידוע שלפחות אחד מהם משתתף בחוג שחייה. מה ההסתברות שבדיוק שניים מהם משתתפים בחוג שחייה?`,
        hints: [
          String.raw`מספר השחיינים X מבין הארבעה מתפלג בינומית עם $n=4$ ו-$p=0.4$. השאלה היא הסתברות מותנית: $P(X=2\mid X\ge 1)$.`,
          String.raw`המאורע $X=2$ מוכל במאורע $X\ge 1$, ולכן $P(X=2\mid X\ge 1)=\frac{P(X=2)}{P(X\ge 1)}$.`,
          String.raw`$P(X=2)=\binom{4}{2}\cdot 0.4^{2}\cdot 0.6^{2}$, $P(X\ge 1)=1-0.6^{4}$.`,
        ],
        solutionSteps: [
          String.raw`נסמן ב-X את מספר החברים המשתתפים בשחייה מבין הארבעה. הבחירות בלתי תלויות ובכל אחת ההסתברות היא $p=0.4$, ולכן X מתפלג בינומית עם $n=4$.`,
          String.raw`$P(X=2)=\binom{4}{2}\cdot 0.4^{2}\cdot 0.6^{2}=6\cdot 0.16\cdot 0.36=0.3456$.`,
          String.raw`$P(X\ge 1)=1-P(X=0)=1-0.6^{4}=1-0.1296=0.8704$.`,
          String.raw`המאורע $X=2$ מוכל במאורע $X\ge 1$, ולכן $P(X=2\mid X\ge 1)=\frac{P(X=2)}{P(X\ge 1)}=\frac{0.3456}{0.8704}$.`,
          String.raw`צמצום: $\frac{0.3456}{0.8704}=\frac{3456}{8704}=\frac{27}{68}\approx 0.397$.`,
        ],
        finalAnswer: String.raw`$P(X=2\mid X\ge 1)=\frac{27}{68}\approx 0.397$`,
        numericAnswer: 0.3970588235,
      },
    ],
  },
];
