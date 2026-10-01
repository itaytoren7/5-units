import type { Problem } from '../types';

/**
 * שאלון 35581 – שאלה 2 (סדרות).
 * לפי מיקוד 2026 נותרה בחומר רק הסדרה ההנדסית (סופית ואינסופית): איבר כללי, סכום, ומעבר בין נוסחת
 * איבר כללי לכלל נסיגה ולהיפך. כל השאלות כאן עוסקות בסדרות הנדסיות בלבד (ללא סדרה חשבונית וללא כללי נסיגה כלליים).
 */
export const slot2Problems: Problem[] = [
  {
    id: '35581-2-1',
    questionnaire: '35581',
    slot: 2,
    title: 'סדרה הנדסית – הפרשי איברים, סכום ומספר איברים',
    topicId: 'sequences',
    subtopicIds: ['seq-geometric'],
    difficulty: 2,
    estimatedMinutes: 20,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-2-1-a',
        label: 'א',
        statement: String.raw`בסדרה הנדסית $(a_n)$ מתקיים: $a_4-a_2=48$ וגם $a_3-a_1=16$.

מצאו את האיבר הראשון $a_1$ ואת המנה $q$ של הסדרה.`,
        hints: [
          String.raw`הביעו את ארבעת האיברים באמצעות $a_1$ ו-$q$ לפי נוסחת האיבר הכללי $a_n=a_1q^{n-1}$.`,
          String.raw`בשתי המשוואות מופיע הגורם המשותף $a_1(q^2-1)$. חלקו משוואה במשוואה כדי לבטל אותו ולקבל משוואה ב-$q$ בלבד.`,
          String.raw`מהחילוק מתקבל $q=3$; הציבו במשוואה $a_1(q^2-1)=16$ כדי למצוא את $a_1$.`,
        ],
        solutionSteps: [
          String.raw`לפי נוסחת האיבר הכללי $a_n=a_1q^{n-1}$ מתקיים $a_2=a_1q$, $a_3=a_1q^2$, $a_4=a_1q^3$.`,
          String.raw`המשוואה הראשונה: $a_1q^3-a_1q=48$, כלומר $a_1q(q^2-1)=48$.`,
          String.raw`המשוואה השנייה: $a_1q^2-a_1=16$, כלומר $a_1(q^2-1)=16$.`,
          String.raw`מכיוון ש-$a_1(q^2-1)=16\ne0$, מותר לחלק את המשוואה הראשונה בשנייה: $\frac{a_1q(q^2-1)}{a_1(q^2-1)}=\frac{48}{16}$, ומכאן $q=3$.`,
          String.raw`הצבה במשוואה השנייה: $a_1(9-1)=16$, לכן $8a_1=16$ ו-$a_1=2$.`,
          String.raw`בדיקה: הסדרה היא $2,6,18,54,\dots$ ואכן $54-6=48$ ו-$18-2=16$.`,
        ],
        finalAnswer: String.raw`$a_1=2$, $q=3$`,
      },
      {
        id: '35581-2-1-b',
        label: 'ב',
        statement: String.raw`חשבו את סכום שמונת האיברים הראשונים של הסדרה.`,
        hints: [
          String.raw`השתמשו בנוסחת סכום $n$ האיברים הראשונים של סדרה הנדסית: $S_n=\frac{a_1(q^n-1)}{q-1}$.`,
          String.raw`$3^8=(3^4)^2=81^2$.`,
        ],
        solutionSteps: [
          String.raw`נוסחת סכום $n$ האיברים הראשונים של סדרה הנדסית (עבור $q\ne1$): $S_n=\frac{a_1(q^n-1)}{q-1}$.`,
          String.raw`הצבת $a_1=2$ ו-$q=3$: $S_8=\frac{2(3^8-1)}{3-1}=3^8-1$.`,
          String.raw`$3^8=(3^4)^2=81^2=6561$, ולכן $S_8=6561-1=6560$.`,
        ],
        finalAnswer: String.raw`$S_8=6560$`,
        numericAnswer: 6560,
      },
      {
        id: '35581-2-1-c',
        label: 'ג',
        statement: String.raw`מצאו את המקום $n$ של האיבר הראשון בסדרה שגדול מ-$10000$. נמקו מדוע זהו האיבר הראשון כזה.`,
        hints: [
          String.raw`רשמו את האי-שוויון $2\cdot3^{n-1}>10000$ ובדקו חזקות עוקבות של $3$.`,
          String.raw`מכיוון ש-$a_1>0$ ו-$q>1$ הסדרה עולה, ולכן מספיק למצוא את ה-$n$ הראשון שמקיים את האי-שוויון.`,
          String.raw`$3^7=2187$ ו-$3^8=6561$.`,
        ],
        solutionSteps: [
          String.raw`האיבר הכללי הוא $a_n=2\cdot3^{n-1}$. מכיוון ש-$a_1=2>0$ ו-$q=3>1$, הסדרה עולה: כל איבר גדול מקודמו.`,
          String.raw`נדרש $2\cdot3^{n-1}>10000$, כלומר $3^{n-1}>5000$.`,
          String.raw`חזקות של $3$: $3^7=2187<5000$ ואילו $3^8=6561>5000$. לכן האי-שוויון מתקיים לראשונה כאשר $n-1=8$, כלומר $n=9$.`,
          String.raw`בדיקה: $a_8=2\cdot3^7=4374<10000$ ו-$a_9=2\cdot3^8=13122>10000$. מכיוון שהסדרה עולה, כל האיברים שאחרי $a_9$ גדולים אף הם מ-$10000$, ולכן $a_9$ הוא האיבר הראשון כזה.`,
        ],
        finalAnswer: String.raw`$n=9$ (האיבר $a_9=13122$)`,
        numericAnswer: 9,
      },
      {
        id: '35581-2-1-d',
        label: 'ד',
        statement: String.raw`כמה איברים ראשונים של הסדרה יש לסכם כדי שהסכום יהיה $59048$?`,
        hints: [
          String.raw`הציבו בנוסחת הסכום מסעיף ב: $S_n=3^n-1$, ופתרו $3^n-1=59048$.`,
          String.raw`$3^5=243$ ו-$243^2=59049$.`,
        ],
        solutionSteps: [
          String.raw`מסעיף ב, לכל $n$: $S_n=\frac{2(3^n-1)}{3-1}=3^n-1$.`,
          String.raw`דרוש $3^n-1=59048$, כלומר $3^n=59049$.`,
          String.raw`$3^5=243$ ו-$243^2=59049$, לכן $59049=3^{10}$ ומכאן $n=10$.`,
          String.raw`הפתרון יחיד, כי $3^n$ עולה עם $n$ ולכן מקבל כל ערך לכל היותר פעם אחת.`,
        ],
        finalAnswer: String.raw`$n=10$`,
        numericAnswer: 10,
      },
    ],
  },
  {
    id: '35581-2-2',
    questionnaire: '35581',
    slot: 2,
    title: 'סדרה הנדסית אינסופית וסדרת הריבועים',
    topicId: 'sequences',
    subtopicIds: ['seq-geometric'],
    difficulty: 3,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-2-2-a',
        label: 'א',
        statement: String.raw`סכום סדרה הנדסית אינסופית יורדת $(a_n)$ הוא $12$, וסכום הסדרה האינסופית של ריבועי איבריה, $a_1^2+a_2^2+a_3^2+\dots$, הוא $72$.

מצאו את האיבר הראשון $a_1$ ואת המנה $q$ של הסדרה.`,
        hints: [
          String.raw`הראו תחילה שסדרת הריבועים $(a_n^2)$ היא סדרה הנדסית שאיברה הראשון $a_1^2$ ומנתה $q^2$.`,
          String.raw`רשמו שתי משוואות: $\frac{a_1}{1-q}=12$ ו-$\frac{a_1^2}{1-q^2}=72$. בודדו את $a_1$ מהראשונה והציבו בשנייה.`,
          String.raw`פרקו $1-q^2=(1-q)(1+q)$ וצמצמו ב-$(1-q)$ – תתקבל משוואה ממעלה ראשונה ב-$q$.`,
        ],
        solutionSteps: [
          String.raw`סדרת הריבועים: $\frac{a_{n+1}^2}{a_n^2}=\left(\frac{a_{n+1}}{a_n}\right)^2=q^2$ – המנה קבועה, לכן $(a_n^2)$ סדרה הנדסית שאיברה הראשון $a_1^2$ ומנתה $q^2$. מכיוון ש-$|q|<1$ גם $q^2<1$, ולכן סכומה האינסופי קיים.`,
          String.raw`סכום הסדרה: $\frac{a_1}{1-q}=12$, וסכום הריבועים: $\frac{a_1^2}{1-q^2}=72$.`,
          String.raw`מהמשוואה הראשונה $a_1=12(1-q)$. הצבה בשנייה: $\frac{144(1-q)^2}{(1-q)(1+q)}=72$, ולאחר צמצום ב-$(1-q)\ne0$: $\frac{144(1-q)}{1+q}=72$.`,
          String.raw`$144(1-q)=72(1+q)$, כלומר $2(1-q)=1+q$, $2-2q=1+q$, $3q=1$, ולכן $q=\frac13$.`,
          String.raw`$a_1=12\left(1-\frac13\right)=8$. אכן $|q|<1$, כנדרש בסדרה הנדסית אינסופית יורדת.`,
          String.raw`בדיקה: $\frac{8}{1-\frac13}=12$ וגם $\frac{64}{1-\frac19}=\frac{64\cdot9}{8}=72$.`,
        ],
        finalAnswer: String.raw`$a_1=8$, $q=\frac13$`,
      },
      {
        id: '35581-2-2-b',
        label: 'ב',
        statement: String.raw`חשבו את סכום האיברים הנמצאים במקומות האי-זוגיים בסדרה: $a_1+a_3+a_5+\dots$`,
        hints: [
          String.raw`האיברים במקומות האי-זוגיים מהווים סדרה הנדסית בפני עצמה – מצאו את איברה הראשון ואת מנתה.`,
          String.raw`$a_3=a_1q^2$, $a_5=a_3q^2$, ולכן המנה של הסדרה החדשה היא $q^2=\frac19$.`,
        ],
        solutionSteps: [
          String.raw`לכל $n$ מתקיים $\frac{a_{n+2}}{a_n}=q^2$, ולכן $a_1,a_3,a_5,\dots$ היא סדרה הנדסית שאיברה הראשון $8$ ומנתה $q^2=\frac19$.`,
          String.raw`$\frac19<1$ ולכן הסכום האינסופי קיים: $\frac{8}{1-\frac19}=\frac{8}{\frac89}=9$.`,
          String.raw`בדיקה: סכום האיברים במקומות הזוגיים הוא $12-9=3$, ואכן $\frac{a_2}{1-q^2}=\frac{\frac83}{\frac89}=3$.`,
        ],
        finalAnswer: String.raw`$a_1+a_3+a_5+\dots=9$`,
        numericAnswer: 9,
      },
      {
        id: '35581-2-2-c',
        label: 'ג',
        statement: String.raw`חשבו את סכום הסדרה האינסופית $a_1-a_2+a_3-a_4+\dots$`,
        hints: [
          String.raw`הסדרה $a_1,\,-a_2,\,a_3,\,-a_4,\dots$ היא סדרה הנדסית – מצאו את מנתה.`,
          String.raw`המנה היא $-q=-\frac13$, ובערכה המוחלט היא קטנה מ-$1$.`,
        ],
        solutionSteps: [
          String.raw`נגדיר $b_n=(-1)^{n-1}a_n$. אז $\frac{b_{n+1}}{b_n}=-\frac{a_{n+1}}{a_n}=-q=-\frac13$ – מנה קבועה, ולכן $(b_n)$ סדרה הנדסית שאיברה הראשון $b_1=a_1=8$ ומנתה $-\frac13$.`,
          String.raw`$\left|-\frac13\right|<1$, ולכן הסכום האינסופי קיים: $\frac{8}{1-\left(-\frac13\right)}=\frac{8}{\frac43}=6$.`,
          String.raw`דרך נוספת: הסכום שווה לסכום האיברים במקומות האי-זוגיים פחות סכום האיברים במקומות הזוגיים, $9-3=6$.`,
        ],
        finalAnswer: String.raw`$a_1-a_2+a_3-a_4+\dots=6$`,
        numericAnswer: 6,
      },
      {
        id: '35581-2-2-d',
        label: 'ד',
        statement: String.raw`מגדירים סדרה חדשה $(c_n)$ על ידי $c_n=a_n-a_{n+1}$.

הוכיחו שהסדרה $(c_n)$ היא סדרה הנדסית, ומצאו את סכום כל איבריה.`,
        hints: [
          String.raw`הביעו את $c_n$ באמצעות $a_n$ בלבד: $a_{n+1}=q\cdot a_n$.`,
          String.raw`$c_n=(1-q)a_n$, ולכן המנה של $(c_n)$ שווה למנה של $(a_n)$. מצאו את $c_1$.`,
          String.raw`לבדיקה: הסכום $c_1+c_2+\dots+c_n$ ״מצטמצם״ (סכום טלסקופי) ל-$a_1-a_{n+1}$.`,
        ],
        solutionSteps: [
          String.raw`$c_n=a_n-a_{n+1}=a_n-qa_n=(1-q)a_n$, ולכן $\frac{c_{n+1}}{c_n}=\frac{(1-q)a_{n+1}}{(1-q)a_n}=q$ – מנה קבועה שאינה תלויה ב-$n$. לכן $(c_n)$ סדרה הנדסית שמנתה $q=\frac13$.`,
          String.raw`האיבר הראשון: $c_1=a_1-a_2=8-\frac83=\frac{16}{3}$.`,
          String.raw`$|q|<1$ ולכן יש סכום אינסופי: $\frac{\frac{16}{3}}{1-\frac13}=\frac{16}{3}\cdot\frac32=8$.`,
          String.raw`הסבר נוסף: $c_1+c_2+\dots+c_n=(a_1-a_2)+(a_2-a_3)+\dots+(a_n-a_{n+1})=a_1-a_{n+1}$, וכאשר $n$ גדל $a_{n+1}=8\left(\frac13\right)^n$ שואף לאפס, כך שהסכום שואף ל-$a_1=8$.`,
        ],
        finalAnswer: String.raw`$(c_n)$ הנדסית עם מנה $\frac13$; סכום כל איבריה $8$`,
        numericAnswer: 8,
      },
    ],
  },
  {
    id: '35581-2-3',
    questionnaire: '35581',
    slot: 2,
    title: 'כלל נסיגה וסדרה הנגזרת ממנו',
    topicId: 'sequences',
    subtopicIds: ['seq-geometric'],
    difficulty: 2,
    estimatedMinutes: 20,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-2-3-a',
        label: 'א',
        statement: String.raw`סדרה $(a_n)$ מוגדרת על ידי כלל הנסיגה $a_{n+1}=\frac32a_n$ והאיבר הראשון $a_1=16$.

הוכיחו שהסדרה הנדסית, רשמו את נוסחת האיבר הכללי שלה וחשבו את $a_5$.`,
        hints: [
          String.raw`סדרה היא הנדסית אם המנה $\frac{a_{n+1}}{a_n}$ קבועה (אינה תלויה ב-$n$) – קראו אותה ישירות מכלל הנסיגה.`,
          String.raw`נוסחת האיבר הכללי: $a_n=a_1q^{n-1}$ עם $a_1=16$ ו-$q=\frac32$.`,
        ],
        solutionSteps: [
          String.raw`מכלל הנסיגה, $\frac{a_{n+1}}{a_n}=\frac32$ לכל $n$ – המנה בין כל שני איברים עוקבים קבועה, ולכן על פי ההגדרה הסדרה הנדסית שמנתה $q=\frac32$.`,
          String.raw`נוסחת האיבר הכללי: $a_n=a_1q^{n-1}=16\left(\frac32\right)^{n-1}$.`,
          String.raw`$a_5=16\left(\frac32\right)^4=16\cdot\frac{81}{16}=81$.`,
          String.raw`בדיקה בעזרת כלל הנסיגה: $16,\,24,\,36,\,54,\,81$.`,
        ],
        finalAnswer: String.raw`$a_n=16\left(\frac32\right)^{n-1}$; $a_5=81$`,
        numericAnswer: 81,
      },
      {
        id: '35581-2-3-b',
        label: 'ב',
        statement: String.raw`מגדירים סדרה $(b_n)$ על ידי $b_n=a_n+a_{n+1}$.

הוכיחו שהסדרה $(b_n)$ הנדסית, ורשמו כלל נסיגה (איבר ראשון וקשר בין $b_{n+1}$ ל-$b_n$) לסדרה זו.`,
        hints: [
          String.raw`הביעו את $b_n$ באמצעות $a_n$ בלבד בעזרת $a_{n+1}=\frac32a_n$.`,
          String.raw`$b_n=\frac52a_n$, ולכן יחס שני איברים עוקבים ב-$(b_n)$ שווה ליחס המתאים ב-$(a_n)$.`,
          String.raw`כלל נסיגה מורכב מהאיבר הראשון $b_1=a_1+a_2$ ומהקשר $b_{n+1}=q\cdot b_n$.`,
        ],
        solutionSteps: [
          String.raw`$b_n=a_n+a_{n+1}=a_n+\frac32a_n=\frac52a_n$.`,
          String.raw`$\frac{b_{n+1}}{b_n}=\frac{\frac52a_{n+1}}{\frac52a_n}=\frac{a_{n+1}}{a_n}=\frac32$ – מנה קבועה, ולכן $(b_n)$ סדרה הנדסית שמנתה $\frac32$.`,
          String.raw`האיבר הראשון: $b_1=a_1+a_2=16+24=40$.`,
          String.raw`כלל הנסיגה: $b_1=40$, $b_{n+1}=\frac32b_n$. נוסחת האיבר הכללי המתאימה: $b_n=40\left(\frac32\right)^{n-1}$.`,
        ],
        finalAnswer: String.raw`$b_1=40$, $b_{n+1}=\frac32b_n$`,
      },
      {
        id: '35581-2-3-c',
        label: 'ג',
        statement: String.raw`מצאו את $n$ שעבורו $b_n=303.75$.`,
        hints: [
          String.raw`פתרו $40\left(\frac32\right)^{n-1}=303.75$. חלקו ב-$40$ וכתבו את התוצאה כשבר.`,
          String.raw`$7.59375=\frac{243}{32}=\frac{3^5}{2^5}$.`,
        ],
        solutionSteps: [
          String.raw`$40\left(\frac32\right)^{n-1}=303.75$, ולכן $\left(\frac32\right)^{n-1}=\frac{303.75}{40}=7.59375$.`,
          String.raw`$7.59375=\frac{243}{32}=\frac{3^5}{2^5}=\left(\frac32\right)^5$.`,
          String.raw`מכאן $n-1=5$, כלומר $n=6$. הפתרון יחיד, כי $\left(\frac32\right)^{n-1}$ עולה עם $n$.`,
          String.raw`בדיקה: $b_1,\dots,b_6=40,\,60,\,90,\,135,\,202.5,\,303.75$.`,
        ],
        finalAnswer: String.raw`$n=6$`,
        numericAnswer: 6,
      },
      {
        id: '35581-2-3-d',
        label: 'ד',
        statement: String.raw`נסמן ב-$S_n$ את סכום $n$ האיברים הראשונים של $(a_n)$ וב-$T_n$ את סכום $n$ האיברים הראשונים של $(b_n)$.

הוכיחו שלכל $n$ מתקיים $T_n=\frac52S_n$, וחשבו את $T_6$.`,
        hints: [
          String.raw`השתמשו בקשר $b_k=\frac52a_k$ שהוכח בסעיף ב, לכל אחד מהמחוברים.`,
          String.raw`חשבו תחילה $S_6=\frac{16\left(\left(\frac32\right)^6-1\right)}{\frac32-1}$ ואז הכפילו ב-$\frac52$.`,
        ],
        solutionSteps: [
          String.raw`$T_n=b_1+b_2+\dots+b_n=\frac52a_1+\frac52a_2+\dots+\frac52a_n=\frac52(a_1+a_2+\dots+a_n)=\frac52S_n$.`,
          String.raw`$S_6=\frac{16\left(\left(\frac32\right)^6-1\right)}{\frac32-1}=32\left(\frac{729}{64}-1\right)=32\cdot\frac{665}{64}=332.5$.`,
          String.raw`$T_6=\frac52\cdot332.5=831.25$.`,
          String.raw`בדיקה ישירה: $40+60+90+135+202.5+303.75=831.25$.`,
        ],
        finalAnswer: String.raw`$T_6=831.25$`,
        numericAnswer: 831.25,
      },
    ],
  },
  {
    id: '35581-2-4',
    questionnaire: '35581',
    slot: 2,
    title: 'הכנסת איברים וסדרת המכפלות',
    topicId: 'sequences',
    subtopicIds: ['seq-geometric'],
    difficulty: 3,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-2-4-a',
        label: 'א',
        statement: String.raw`בין המספרים $3$ ו-$48$ הכניסו שלושה מספרים, כך שחמשת המספרים (בסדר זה) מהווים סדרה הנדסית.

מצאו את שלושת המספרים שהוכנסו. מצאו את כל האפשרויות.`,
        hints: [
          String.raw`חמשת המספרים הם $a_1,\dots,a_5$ של סדרה הנדסית שבה $a_1=3$ ו-$a_5=48$. הביעו את $a_5$ באמצעות $a_1$ ו-$q$.`,
          String.raw`מתקבל $q^4=16$ – שימו לב שלמשוואה זו שני פתרונות ממשיים.`,
          String.raw`$q^4-16=(q^2-4)(q^2+4)$, והגורם $q^2+4$ אינו מתאפס.`,
        ],
        solutionSteps: [
          String.raw`נסמן את חמשת המספרים $a_1,a_2,a_3,a_4,a_5$. זו סדרה הנדסית שבה $a_1=3$ ו-$a_5=48$.`,
          String.raw`לפי נוסחת האיבר הכללי $a_5=a_1q^4$, ולכן $3q^4=48$, כלומר $q^4=16$.`,
          String.raw`$q^4-16=(q^2-4)(q^2+4)=0$. הגורם $q^2+4$ חיובי לכל $q$, ולכן $q^2=4$, ומכאן $q=2$ או $q=-2$.`,
          String.raw`עבור $q=2$ המספרים שהוכנסו הם $6,12,24$ (הסדרה $3,6,12,24,48$).`,
          String.raw`עבור $q=-2$ המספרים שהוכנסו הם $-6,12,-24$ (הסדרה $3,-6,12,-24,48$).`,
          String.raw`שתי האפשרויות תקפות: בשתיהן מנת כל שני איברים עוקבים קבועה ואין איבר השווה לאפס.`,
        ],
        finalAnswer: String.raw`$6,12,24$ (כאשר $q=2$) או $-6,12,-24$ (כאשר $q=-2$)`,
      },
      {
        id: '35581-2-4-b',
        label: 'ב',
        statement: String.raw`ידוע כעת שכל המספרים שהוכנסו חיוביים, והסדרה ממשיכה לאינסוף לפי אותה מנה.

מגדירים סדרה $(c_n)$ על ידי $c_n=a_n\cdot a_{n+1}$. הוכיחו שהסדרה $(c_n)$ הנדסית ומצאו את מנתה.`,
        hints: [
          String.raw`מכיוון שהאיברים חיוביים, $q=2$ ו-$a_n=3\cdot2^{n-1}$. חשבו את המנה $\frac{c_{n+1}}{c_n}=\frac{a_{n+1}\cdot a_{n+2}}{a_n\cdot a_{n+1}}$.`,
          String.raw`לאחר צמצום $a_{n+1}$ נשאר $\frac{a_{n+2}}{a_n}$ – הביעו אותו באמצעות $q$.`,
        ],
        solutionSteps: [
          String.raw`מכיוון שהמספרים שהוכנסו חיוביים, $q=2$ ולכן $a_n=3\cdot2^{n-1}$.`,
          String.raw`$\frac{c_{n+1}}{c_n}=\frac{a_{n+1}\cdot a_{n+2}}{a_n\cdot a_{n+1}}=\frac{a_{n+2}}{a_n}=\frac{a_1q^{n+1}}{a_1q^{n-1}}=q^2$ – מנה קבועה שאינה תלויה ב-$n$, ולכן $(c_n)$ סדרה הנדסית.`,
          String.raw`מנת הסדרה היא $q^2=4$, ואיברה הראשון $c_1=a_1\cdot a_2=3\cdot6=18$.`,
          String.raw`בדיקה: $c_1=18$, $c_2=6\cdot12=72$, $c_3=12\cdot24=288$, ואכן $\frac{72}{18}=\frac{288}{72}=4$.`,
        ],
        finalAnswer: String.raw`$(c_n)$ הנדסית שמנתה $4$ (ואיברה הראשון $c_1=18$)`,
        numericAnswer: 4,
      },
      {
        id: '35581-2-4-c',
        label: 'ג',
        statement: String.raw`חשבו את סכום חמשת האיברים הראשונים של הסדרה $(c_n)$.`,
        hints: [
          String.raw`השתמשו בנוסחת הסכום עם $c_1=18$ ומנה $4$: $S_5=\frac{c_1(4^5-1)}{4-1}$.`,
          String.raw`$4^5=1024$.`,
        ],
        solutionSteps: [
          String.raw`סכום $n$ האיברים הראשונים של סדרה הנדסית: $S_n=\frac{c_1(q^n-1)}{q-1}$.`,
          String.raw`הצבה: $S_5=\frac{18(4^5-1)}{4-1}=6(1024-1)=6\cdot1023$.`,
          String.raw`$S_5=6138$.`,
          String.raw`בדיקה: $18+72+288+1152+4608=6138$.`,
        ],
        finalAnswer: String.raw`$S_5=6138$`,
        numericAnswer: 6138,
      },
      {
        id: '35581-2-4-d',
        label: 'ד',
        statement: String.raw`מגדירים סדרה $(d_n)$ על ידי $d_n=\frac{1}{c_n}$.

הסבירו מדוע לסדרה האינסופית $(d_n)$ יש סכום, וחשבו אותו.`,
        hints: [
          String.raw`חשבו את $\frac{d_{n+1}}{d_n}=\frac{c_n}{c_{n+1}}$ – המנה של $(d_n)$ היא ההופכית למנה של $(c_n)$.`,
          String.raw`לסדרה הנדסית אינסופית יש סכום רק כאשר $|q|<1$; הסכום הוא $\frac{d_1}{1-q}$.`,
        ],
        solutionSteps: [
          String.raw`$\frac{d_{n+1}}{d_n}=\frac{1/c_{n+1}}{1/c_n}=\frac{c_n}{c_{n+1}}=\frac14$ – מנה קבועה, ולכן $(d_n)$ סדרה הנדסית שמנתה $\frac14$ ואיברה הראשון $d_1=\frac{1}{18}$.`,
          String.raw`מכיוון ש-$\left|\frac14\right|<1$, הסדרה ההנדסית האינסופית יורדת וסכומה קיים.`,
          String.raw`$S=\frac{d_1}{1-q}=\frac{\frac{1}{18}}{1-\frac14}=\frac{1}{18}\cdot\frac43=\frac{4}{54}=\frac{2}{27}$.`,
        ],
        finalAnswer: String.raw`$\frac{2}{27}$`,
        numericAnswer: 2 / 27,
      },
    ],
  },
  {
    id: '35581-2-5',
    questionnaire: '35581',
    slot: 2,
    title: 'שלושה איברים עוקבים עם פרמטר',
    topicId: 'sequences',
    subtopicIds: ['seq-geometric'],
    difficulty: 3,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-2-5-a',
        label: 'א',
        statement: String.raw`שלושת המספרים $3x-1$, $8-4x$, $11-3x$ (בסדר זה) הם שלושה איברים עוקבים בסדרה הנדסית.

מצאו את כל הערכים האפשריים של $x$.`,
        hints: [
          String.raw`שלושה מספרים $a,b,c$ השונים מאפס הם איברים עוקבים בסדרה הנדסית אם ורק אם $\frac{b}{a}=\frac{c}{b}$, כלומר $b^2=ac$.`,
          String.raw`פתחו: $(8-4x)^2=(3x-1)(11-3x)$ – תתקבל משוואה ריבועית.`,
          String.raw`לאחר כינוס איברים: $25x^2-100x+75=0$. חלקו ב-$25$ ופרקו לגורמים.`,
        ],
        solutionSteps: [
          String.raw`בסדרה הנדסית מנת כל שני איברים עוקבים קבועה: $\frac{8-4x}{3x-1}=\frac{11-3x}{8-4x}$, ולכן $(8-4x)^2=(3x-1)(11-3x)$.`,
          String.raw`אגף שמאל: $64-64x+16x^2$. אגף ימין: $33x-9x^2-11+3x=-9x^2+36x-11$.`,
          String.raw`$16x^2-64x+64=-9x^2+36x-11$, ומכאן $25x^2-100x+75=0$, כלומר $x^2-4x+3=0$.`,
          String.raw`$(x-1)(x-3)=0$, ולכן $x=1$ או $x=3$.`,
          String.raw`בדיקה שאף איבר אינו אפס: עבור $x=1$ האיברים הם $2,4,8$; עבור $x=3$ האיברים הם $8,-4,2$. בשני המקרים כל האיברים שונים מאפס, ולכן שני הערכים מתאימים.`,
        ],
        finalAnswer: String.raw`$x=1$ או $x=3$`,
      },
      {
        id: '35581-2-5-b',
        label: 'ב',
        statement: String.raw`עבור כל אחד מהערכים של $x$ מצאו את מנת הסדרה. ממשיכים כל אחת מהסדרות לאינסוף לפי אותה מנה.

עבור איזה מהערכים של $x$ קיים סכום לסדרה האינסופית? חשבו סכום זה.`,
        hints: [
          String.raw`חשבו $q=\frac{a_2}{a_1}$ לכל אחת משתי הסדרות.`,
          String.raw`לסדרה הנדסית אינסופית יש סכום רק כאשר $|q|<1$.`,
          String.raw`$S=\frac{a_1}{1-q}$ עם $a_1=8$ ו-$q=-\frac12$.`,
        ],
        solutionSteps: [
          String.raw`עבור $x=1$ הסדרה היא $2,4,8,\dots$ ומנתה $q=\frac{4}{2}=2$.`,
          String.raw`עבור $x=3$ הסדרה היא $8,-4,2,\dots$ ומנתה $q=\frac{-4}{8}=-\frac12$.`,
          String.raw`לסדרה הנדסית אינסופית קיים סכום רק כאשר $|q|<1$. עבור $x=1$ מתקיים $q=2>1$ – האיברים גדלים ללא גבול והסכום אינו קיים. עבור $x=3$ מתקיים $\left|-\frac12\right|<1$ והסכום קיים.`,
          String.raw`$S=\frac{a_1}{1-q}=\frac{8}{1-\left(-\frac12\right)}=\frac{8}{\frac32}=\frac{16}{3}$.`,
        ],
        finalAnswer: String.raw`$x=1$: $q=2$ (אין סכום); $x=3$: $q=-\frac12$ והסכום הוא $\frac{16}{3}$`,
        numericAnswer: 16 / 3,
      },
      {
        id: '35581-2-5-c',
        label: 'ג',
        statement: String.raw`עבור הסדרה המתאימה ל-$x=1$, חשבו את סכום עשרת האיברים הראשונים.`,
        hints: [
          String.raw`$S_{10}=\frac{a_1(q^{10}-1)}{q-1}$ עם $a_1=2$ ו-$q=2$.`,
          String.raw`$2^{10}=1024$.`,
        ],
        solutionSteps: [
          String.raw`$a_1=2$, $q=2$, ולכן $S_{10}=\frac{2(2^{10}-1)}{2-1}=2(1024-1)$.`,
          String.raw`$S_{10}=2\cdot1023=2046$.`,
          String.raw`בדיקה: $2+4+8+16+32+64+128+256+512+1024=2046$.`,
        ],
        finalAnswer: String.raw`$S_{10}=2046$`,
        numericAnswer: 2046,
      },
      {
        id: '35581-2-5-d',
        label: 'ד',
        statement: String.raw`עבור הסדרה המתאימה ל-$x=3$ נסמן ב-$S$ את סכום הסדרה האינסופית וב-$S_n$ את סכום $n$ האיברים הראשונים.

מצאו את ה-$n$ הקטן ביותר שעבורו $|S-S_n|<0.01$.`,
        hints: [
          String.raw`הראו תחילה ש-$S-S_n=\frac{a_1q^n}{1-q}$ על ידי השוואת הנוסחאות $S_n=\frac{a_1(1-q^n)}{1-q}$ ו-$S=\frac{a_1}{1-q}$.`,
          String.raw`$|S-S_n|=\frac{16}{3\cdot2^n}$; דרוש $2^n>\frac{1600}{3}$.`,
          String.raw`$2^9=512$ ו-$2^{10}=1024$.`,
        ],
        solutionSteps: [
          String.raw`$S_n=\frac{a_1(1-q^n)}{1-q}=\frac{a_1}{1-q}-\frac{a_1q^n}{1-q}=S-\frac{a_1q^n}{1-q}$, ולכן $S-S_n=\frac{a_1q^n}{1-q}$.`,
          String.raw`הצבת $a_1=8$, $q=-\frac12$: $S-S_n=\frac{8\left(-\frac12\right)^n}{\frac32}=\frac{16}{3}\left(-\frac12\right)^n$, ולכן $|S-S_n|=\frac{16}{3\cdot2^n}$.`,
          String.raw`דרוש $\frac{16}{3\cdot2^n}<0.01$, כלומר $3\cdot2^n>1600$, $2^n>533.33\dots$`,
          String.raw`$2^9=512<533.33$ ואילו $2^{10}=1024>533.33$. מכיוון ש-$2^n$ עולה עם $n$, ה-$n$ הקטן ביותר הוא $n=10$.`,
          String.raw`בדיקה: עבור $n=9$, $\frac{16}{3\cdot512}\approx0.0104>0.01$; עבור $n=10$, $\frac{16}{3\cdot1024}\approx0.0052<0.01$.`,
        ],
        finalAnswer: String.raw`$n=10$`,
        numericAnswer: 10,
      },
    ],
  },
  {
    id: '35581-2-6',
    questionnaire: '35581',
    slot: 2,
    title: 'כדור קופץ – אחוזים וסכום אינסופי',
    topicId: 'sequences',
    subtopicIds: ['seq-geometric'],
    difficulty: 2,
    estimatedMinutes: 20,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-2-6-a',
        label: 'א',
        statement: String.raw`כדור נופל מגובה של $10$ מטרים. בכל פעם שהכדור פוגע בקרקע הוא קופץ חזרה לגובה השווה ל-$60\%$ מהגובה שממנו נפל לפני כן.

נסמן ב-$h_n$ את הגובה (במטרים) שאליו מגיע הכדור לאחר הפגיעה ה-$n$ בקרקע. הוכיחו שהסדרה $(h_n)$ הנדסית, רשמו את איברה הכללי וחשבו את $h_3$.`,
        hints: [
          String.raw`$60\%$ מגובה פירושו כפל הגובה ב-$0.6$.`,
          String.raw`$h_1=10\cdot0.6=6$, ולכל $n$ מתקיים $h_{n+1}=0.6\cdot h_n$.`,
        ],
        solutionSteps: [
          String.raw`לאחר הפגיעה הראשונה הכדור עולה לגובה $h_1=10\cdot0.6=6$ מטרים.`,
          String.raw`בכל פגיעה הגובה החדש הוא $60\%$ מהגובה הקודם: $h_{n+1}=0.6\cdot h_n$, כלומר $\frac{h_{n+1}}{h_n}=0.6$ קבוע – הסדרה הנדסית עם $h_1=6$ ו-$q=0.6$.`,
          String.raw`האיבר הכללי: $h_n=6\cdot0.6^{n-1}$ (באופן שקול $h_n=10\cdot0.6^n$).`,
          String.raw`$h_3=6\cdot0.6^2=6\cdot0.36=2.16$ מטרים.`,
        ],
        finalAnswer: String.raw`$h_n=6\cdot0.6^{n-1}$; $h_3=2.16$ מטרים`,
        numericAnswer: 2.16,
      },
      {
        id: '35581-2-6-b',
        label: 'ב',
        statement: String.raw`חשבו את המרחק הכולל (ירידות ועליות) שעובר הכדור עד שהוא נעצר.`,
        hints: [
          String.raw`הכדור יורד תחילה $10$ מטרים; לאחר מכן כל גובה $h_n$ נספר פעמיים – פעם בעלייה ופעם בירידה.`,
          String.raw`סכום סדרה הנדסית אינסופית: $\frac{h_1}{1-q}$, והוא קיים כי $q=0.6<1$.`,
        ],
        solutionSteps: [
          String.raw`המרחק הכולל מורכב מהנפילה הראשונה ($10$ מטרים) ומשני מעברים (עלייה וירידה) על כל גובה $h_n$: $D=10+2(h_1+h_2+h_3+\dots)$.`,
          String.raw`$(h_n)$ הנדסית עם $h_1=6$ ו-$q=0.6$. מכיוון ש-$|q|<1$ הסכום האינסופי קיים: $h_1+h_2+\dots=\frac{6}{1-0.6}=\frac{6}{0.4}=15$.`,
          String.raw`$D=10+2\cdot15=40$ מטרים.`,
        ],
        finalAnswer: String.raw`$40$ מטרים`,
        numericAnswer: 40,
      },
      {
        id: '35581-2-6-c',
        label: 'ג',
        statement: String.raw`לאחר איזו פגיעה בקרקע יגיע הכדור לראשונה לגובה הקטן מ-$1$ מטר?`,
        hints: [
          String.raw`פתרו את האי-שוויון $10\cdot0.6^n<1$ על ידי בדיקת חזקות עוקבות של $0.6$.`,
          String.raw`$0.6^3=0.216$, $0.6^4=0.1296$, $0.6^5=0.07776$.`,
        ],
        solutionSteps: [
          String.raw`דרוש $h_n<1$, כלומר $10\cdot0.6^n<1$, או $0.6^n<0.1$.`,
          String.raw`חזקות של $0.6$: $0.6^2=0.36$, $0.6^3=0.216$, $0.6^4=0.1296>0.1$, $0.6^5=0.07776<0.1$.`,
          String.raw`הסדרה יורדת ($0<q<1$ ו-$h_1>0$), ולכן הפגיעה הראשונה שאחריה הגובה קטן מ-$1$ מטר היא הפגיעה החמישית: $h_4=1.296$ ואילו $h_5=0.7776$.`,
        ],
        finalAnswer: String.raw`לאחר הפגיעה החמישית ($h_5=0.7776$ מטרים)`,
        numericAnswer: 5,
      },
      {
        id: '35581-2-6-d',
        label: 'ד',
        statement: String.raw`כדור שני נופל אף הוא מגובה $10$ מטרים, ובכל פגיעה בקרקע הוא קופץ חזרה לגובה השווה ל-$p\%$ מהגובה הקודם. המרחק הכולל שעובר הכדור השני עד שהוא נעצר הוא $30$ מטרים.

מצאו את $p$.`,
        hints: [
          String.raw`סמנו $r=\frac{p}{100}$ וחזרו על החישוב של סעיף ב: הגבהים הם $10r,10r^2,10r^3,\dots$`,
          String.raw`המשוואה: $10+2\cdot\frac{10r}{1-r}=30$.`,
        ],
        solutionSteps: [
          String.raw`נסמן $r=\frac{p}{100}$ ($0<r<1$). גבהי הכדור השני: $10r,\,10r^2,\,10r^3,\dots$ – סדרה הנדסית שאיברה הראשון $10r$ ומנתה $r$.`,
          String.raw`המרחק הכולל: $10+2\cdot\frac{10r}{1-r}=30$, ולכן $\frac{20r}{1-r}=20$.`,
          String.raw`$r=1-r$, כלומר $2r=1$ ו-$r=\frac12$.`,
          String.raw`$p=100r=50$. בדיקה: $10+2\cdot\frac{5}{1-0.5}=10+20=30$.`,
        ],
        finalAnswer: String.raw`$p=50$`,
        numericAnswer: 50,
      },
    ],
  },
  {
    id: '35581-2-7',
    questionnaire: '35581',
    slot: 2,
    title: 'יחסים בין סכומים חלקיים',
    topicId: 'sequences',
    subtopicIds: ['seq-geometric'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35581-2-7-a',
        label: 'א',
        statement: String.raw`בסדרה הנדסית שמנתה $q\ne1$ נסמן ב-$S_n$ את סכום $n$ האיברים הראשונים.

הוכיחו שלכל $n$ מתקיים $S_{2n}=S_n\left(1+q^n\right)$.`,
        hints: [
          String.raw`חלקו את $2n$ האיברים לשתי קבוצות: $n$ הראשונים ו-$n$ הבאים.`,
          String.raw`כל איבר בקבוצה השנייה מתקבל מהאיבר המתאים בקבוצה הראשונה בכפל ב-$q^n$: $a_{n+k}=a_kq^n$.`,
          String.raw`דרך אלגברית: $S_{2n}=\frac{a_1(q^{2n}-1)}{q-1}$ ו-$q^{2n}-1=(q^n-1)(q^n+1)$.`,
        ],
        solutionSteps: [
          String.raw`$S_{2n}=(a_1+a_2+\dots+a_n)+(a_{n+1}+a_{n+2}+\dots+a_{2n})$.`,
          String.raw`לכל $1\le k\le n$ מתקיים $a_{n+k}=a_1q^{n+k-1}=q^n\cdot a_1q^{k-1}=q^n a_k$.`,
          String.raw`לכן $a_{n+1}+\dots+a_{2n}=q^n(a_1+\dots+a_n)=q^nS_n$.`,
          String.raw`מכאן $S_{2n}=S_n+q^nS_n=S_n\left(1+q^n\right)$.`,
          String.raw`בדיקה בדרך אלגברית: $S_{2n}=\frac{a_1(q^{2n}-1)}{q-1}=\frac{a_1(q^n-1)}{q-1}\cdot(q^n+1)=S_n(1+q^n)$.`,
        ],
        finalAnswer: String.raw`הוכח: $S_{2n}=S_n\left(1+q^n\right)$`,
      },
      {
        id: '35581-2-7-b',
        label: 'ב',
        statement: String.raw`בסדרה הנדסית מסוימת סכום שני האיברים הראשונים הוא $8$, וסכום ארבעת האיברים הראשונים גדול פי $10$ מסכום שני האיברים הראשונים.

מצאו את כל האפשרויות ל-$a_1$ ול-$q$.`,
        hints: [
          String.raw`השתמשו בסעיף א עם $n=2$: $S_4=S_2(1+q^2)$.`,
          String.raw`$1+q^2=10$, ולכן $q^2=9$ – אל תשכחו את הפתרון השלילי.`,
          String.raw`את $a_1$ מוצאים מ-$S_2=a_1(1+q)=8$ לכל ערך של $q$.`,
        ],
        solutionSteps: [
          String.raw`הנתון: $S_4=10S_2$. אם $q=1$ אז $S_4=2S_2\ne10S_2$, ולכן $q\ne1$ ואפשר להשתמש בסעיף א.`,
          String.raw`לפי סעיף א עם $n=2$: $S_4=S_2(1+q^2)$, ולכן $S_2(1+q^2)=10S_2$. מכיוון ש-$S_2=8\ne0$: $1+q^2=10$, $q^2=9$.`,
          String.raw`$q=3$ או $q=-3$.`,
          String.raw`עבור $q=3$: $a_1(1+3)=8$, ולכן $a_1=2$ (הסדרה $2,6,18,54,\dots$).`,
          String.raw`עבור $q=-3$: $a_1(1-3)=8$, ולכן $a_1=-4$ (הסדרה $-4,12,-36,108,\dots$).`,
          String.raw`בדיקה: $2+6+18+54=80$ וגם $-4+12-36+108=80$, ואכן $80=10\cdot8$. שתי האפשרויות תקפות.`,
        ],
        finalAnswer: String.raw`$a_1=2,\ q=3$ או $a_1=-4,\ q=-3$`,
      },
      {
        id: '35581-2-7-c',
        label: 'ג',
        statement: String.raw`הוכיחו שבכל סדרה הנדסית שמנתה $q\ne1$ מתקיים לכל $n$:
$$\left(S_{2n}-S_n\right)^2=S_n\left(S_{3n}-S_{2n}\right)$$`,
        hints: [
          String.raw`כמו בסעיף א: $S_{2n}-S_n$ הוא סכום האיברים $a_{n+1},\dots,a_{2n}$, ו-$S_{3n}-S_{2n}$ הוא סכום האיברים $a_{2n+1},\dots,a_{3n}$.`,
          String.raw`הראו ש-$S_{2n}-S_n=q^nS_n$ וש-$S_{3n}-S_{2n}=q^{2n}S_n$.`,
          String.raw`כלומר שלושת ה״בלוקים״ $S_n,\ S_{2n}-S_n,\ S_{3n}-S_{2n}$ הם שלושה איברים עוקבים בסדרה הנדסית שמנתה $q^n$.`,
        ],
        solutionSteps: [
          String.raw`$S_{2n}-S_n=a_{n+1}+\dots+a_{2n}$, ולפי סעיף א סכום זה שווה ל-$q^nS_n$.`,
          String.raw`באותו אופן, לכל $1\le k\le n$ מתקיים $a_{2n+k}=q^{2n}a_k$, ולכן $S_{3n}-S_{2n}=a_{2n+1}+\dots+a_{3n}=q^{2n}S_n$.`,
          String.raw`אגף שמאל: $\left(S_{2n}-S_n\right)^2=\left(q^nS_n\right)^2=q^{2n}S_n^2$.`,
          String.raw`אגף ימין: $S_n\left(S_{3n}-S_{2n}\right)=S_n\cdot q^{2n}S_n=q^{2n}S_n^2$.`,
          String.raw`שני האגפים שווים, ולכן הזהות מתקיימת. (משמעותה: $S_n,\ S_{2n}-S_n,\ S_{3n}-S_{2n}$ הם שלושה איברים עוקבים בסדרה הנדסית שמנתה $q^n$.)`,
        ],
        finalAnswer: String.raw`הוכח: שני האגפים שווים ל-$q^{2n}S_n^2$`,
      },
      {
        id: '35581-2-7-d',
        label: 'ד',
        statement: String.raw`עבור הסדרה מסעיף ב חשבו את $S_6$ בעזרת הזהות מסעיף ג, בלי להשתמש בערכים של $a_1$ ושל $q$. הראו שהתוצאה זהה בשתי האפשרויות שמצאתם בסעיף ב.`,
        hints: [
          String.raw`הציבו בזהות $n=2$: $\left(S_4-S_2\right)^2=S_2\left(S_6-S_4\right)$ עם $S_2=8$ ו-$S_4=80$.`,
          String.raw`$(80-8)^2=72^2=5184$.`,
        ],
        solutionSteps: [
          String.raw`לפי סעיף ג עם $n=2$: $\left(S_4-S_2\right)^2=S_2\left(S_6-S_4\right)$.`,
          String.raw`הצבה: $(80-8)^2=8\left(S_6-80\right)$, כלומר $5184=8\left(S_6-80\right)$.`,
          String.raw`$S_6-80=648$, ולכן $S_6=728$.`,
          String.raw`הזהות נכונה לכל סדרה הנדסית עם $q\ne1$, ו-$S_2,S_4$ זהים בשתי האפשרויות – לכן $S_6$ זהה בשתיהן.`,
          String.raw`בדיקה: $2+6+18+54+162+486=728$ וגם $-4+12-36+108-324+972=728$.`,
        ],
        finalAnswer: String.raw`$S_6=728$ בשתי האפשרויות`,
        numericAnswer: 728,
      },
    ],
  },
  {
    id: '35581-2-8',
    questionnaire: '35581',
    slot: 2,
    title: 'ריבועים חסומים זה בזה',
    topicId: 'sequences',
    subtopicIds: ['seq-geometric'],
    difficulty: 3,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="60,20 260,20 260,220 60,220" />
  <polygon points="160,20 260,120 160,220 60,120" />
  <polygon points="210,70 210,170 110,170 110,70" />
  <polygon points="210,120 160,170 110,120 160,70" />
  <text x="160" y="236" text-anchor="middle" font-size="14" fill="currentColor" stroke="none">8</text>
  <text x="70" y="38" font-size="13" fill="currentColor" stroke="none">1</text>
  <text x="196" y="58" font-size="13" fill="currentColor" stroke="none">2</text>
  <text x="196" y="88" font-size="13" fill="currentColor" stroke="none">3</text>
  <text x="155" y="125" font-size="13" fill="currentColor" stroke="none">4</text>
</svg>`,
    sections: [
      {
        id: '35581-2-8-a',
        label: 'א',
        statement: String.raw`נתון ריבוע שאורך צלעו $8$ ס״מ (ריבוע מספר $1$). מחברים את אמצעי צלעותיו ומקבלים ריבוע חדש (ריבוע מספר $2$); מחברים את אמצעי צלעות הריבוע החדש ומקבלים ריבוע מספר $3$, וכך הלאה ללא סוף (ראו שרטוט).

נסמן ב-$A_n$ את שטח הריבוע ה-$n$. הוכיחו ש-$(A_n)$ סדרה הנדסית, ומצאו את $A_6$.`,
        hints: [
          String.raw`אם צלע ריבוע היא $s$, אז צלע הריבוע הבא היא היתר במשולש ישר זווית שניצביו $\frac s2$ ו-$\frac s2$ (משפט פיתגורס).`,
          String.raw`צלע הריבוע הבא היא $\frac{s}{\sqrt2}$, ולכן השטח קטן פי $2$.`,
          String.raw`$A_n=64\left(\frac12\right)^{n-1}$.`,
        ],
        solutionSteps: [
          String.raw`נסמן ב-$s_n$ את צלע הריבוע ה-$n$. כל צלע של הריבוע ה-$(n+1)$ מחברת אמצעי שתי צלעות סמוכות של הריבוע ה-$n$, ולכן היא יתר במשולש ישר זווית (הזווית בקודקוד הריבוע) שניצביו $\frac{s_n}{2}$ ו-$\frac{s_n}{2}$.`,
          String.raw`לפי משפט פיתגורס: $s_{n+1}^2=\left(\frac{s_n}{2}\right)^2+\left(\frac{s_n}{2}\right)^2=\frac{s_n^2}{2}$.`,
          String.raw`כלומר $A_{n+1}=\frac12A_n$ לכל $n$: המנה $\frac{A_{n+1}}{A_n}=\frac12$ קבועה, ולכן $(A_n)$ סדרה הנדסית עם $A_1=8^2=64$ ו-$q=\frac12$.`,
          String.raw`$A_n=64\left(\frac12\right)^{n-1}$, ולכן $A_6=64\cdot\frac1{32}=2$ סמ״ר.`,
        ],
        finalAnswer: String.raw`$A_n=64\left(\frac12\right)^{n-1}$; $A_6=2$ סמ״ר`,
        numericAnswer: 2,
      },
      {
        id: '35581-2-8-b',
        label: 'ב',
        statement: String.raw`חשבו את סכום השטחים של כל הריבועים.`,
        hints: [
          String.raw`זהו סכום של סדרה הנדסית אינסופית; בדקו שהוא קיים.`,
          String.raw`$\frac{A_1}{1-q}$ עם $A_1=64$ ו-$q=\frac12$.`,
        ],
        solutionSteps: [
          String.raw`$(A_n)$ סדרה הנדסית אינסופית עם $q=\frac12$, ומכיוון ש-$|q|<1$ קיים לה סכום.`,
          String.raw`$A_1+A_2+\dots=\frac{64}{1-\frac12}=128$.`,
          String.raw`כלומר סכום שטחי כל הריבועים הוא פעמיים שטח הריבוע הראשון: $128$ סמ״ר.`,
        ],
        finalAnswer: String.raw`$128$ סמ״ר`,
        numericAnswer: 128,
      },
      {
        id: '35581-2-8-c',
        label: 'ג',
        statement: String.raw`חשבו את סכום ההיקפים של כל הריבועים. כתבו את התשובה בצורה $a+b\sqrt2$ עם $a,b$ שלמים.`,
        hints: [
          String.raw`מסעיף א, $s_{n+1}=\frac{s_n}{\sqrt2}$, ולכן גם ההיקפים $P_n=4s_n$ מהווים סדרה הנדסית שמנתה $\frac1{\sqrt2}$.`,
          String.raw`$\frac{32}{1-\frac{1}{\sqrt2}}=\frac{32\sqrt2}{\sqrt2-1}$; כפלו את המונה ואת המכנה ב-$\sqrt2+1$.`,
        ],
        solutionSteps: [
          String.raw`$P_n=4s_n$ ו-$s_{n+1}=\frac{s_n}{\sqrt2}$, לכן $\frac{P_{n+1}}{P_n}=\frac1{\sqrt2}$ – סדרה הנדסית עם $P_1=32$ ומנה $\frac{1}{\sqrt2}$.`,
          String.raw`$0<\frac1{\sqrt2}<1$, ולכן הסכום קיים: $\frac{32}{1-\frac1{\sqrt2}}=\frac{32\sqrt2}{\sqrt2-1}$.`,
          String.raw`ביטול השורש במכנה: $\frac{32\sqrt2(\sqrt2+1)}{(\sqrt2-1)(\sqrt2+1)}=\frac{64+32\sqrt2}{2-1}=64+32\sqrt2$.`,
          String.raw`בקירוב: $64+32\sqrt2\approx109.25$ ס״מ.`,
        ],
        finalAnswer: String.raw`$64+32\sqrt2\approx109.25$ ס״מ`,
        numericAnswer: 64 + 32 * Math.SQRT2,
      },
      {
        id: '35581-2-8-d',
        label: 'ד',
        statement: String.raw`צובעים את ה״טבעת״ שבין ריבוע $1$ לריבוע $2$, את הטבעת שבין ריבוע $3$ לריבוע $4$, את הטבעת שבין ריבוע $5$ לריבוע $6$, וכך הלאה (טבעת אחת כן ואחת לא).

חשבו את השטח הצבוע הכולל.`,
        hints: [
          String.raw`שטח הטבעת שבין ריבוע $k$ לריבוע $k+1$ הוא $A_k-A_{k+1}=\frac12A_k$.`,
          String.raw`הטבעות הצבועות מתאימות ל-$k=1,3,5,\dots$; שטחיהן $32,8,2,\dots$ – סדרה הנדסית שמנתה $\frac14$.`,
        ],
        solutionSteps: [
          String.raw`שטח הטבעת שבין ריבוע $k$ לריבוע $k+1$: $R_k=A_k-A_{k+1}=A_k-\frac12A_k=\frac12A_k=32\left(\frac12\right)^{k-1}$.`,
          String.raw`הטבעות הצבועות הן $R_1,R_3,R_5,\dots$, ולכל $k$: $\frac{R_{k+2}}{R_k}=\left(\frac12\right)^2=\frac14$. לכן שטחיהן $32,8,2,\dots$ הם סדרה הנדסית עם איבר ראשון $32$ ומנה $\frac14$.`,
          String.raw`$\frac14<1$, לכן הסכום קיים: $\frac{32}{1-\frac14}=\frac{32}{\frac34}=\frac{128}{3}$.`,
          String.raw`בדיקה: השטח הלא צבוע (טבעות $R_2,R_4,\dots$) הוא $\frac{16}{1-\frac14}=\frac{64}{3}$, וסכום שניהם $\frac{192}{3}=64=A_1$ – כל שטח הריבוע הראשון.`,
        ],
        finalAnswer: String.raw`$\frac{128}{3}\approx42.67$ סמ״ר`,
        numericAnswer: 128 / 3,
      },
    ],
  },
];
