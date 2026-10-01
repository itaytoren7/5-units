import type { Problem } from '../types';

/**
 * שאלון 35582 – שאלה 3 (מספרים מרוכבים).
 * משוואה עם z ו-z̄, הצגה קוטבית ודה-מואבר, שורשים כמצולע משוכלל, סדרה הנדסית של חזקות וזהויות טריגונומטריות.
 * הזוויות במעלות; ללא הצגה מעריכית.
 */
export const slot3Problems: Problem[] = [
  {
    id: '35582-3-1',
    questionnaire: '35582',
    slot: 3,
    title: 'משוואה עם מספר צמוד וחזקות של z',
    topicId: 'complex-numbers',
    subtopicIds: ['complex-arithmetic', 'complex-gauss-demoivre', 'complex-geometry'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35582-3-1-a',
        label: 'א',
        statement: String.raw`נתונה המשוואה $3z+i\bar{z}=-4+4i$, כאשר $\bar{z}$ הוא המספר הצמוד ל-$z$.

מצאו את $z$ בהצגה אלגברית $z=x+iy$.`,
        hints: [
          String.raw`הציבו $z=x+iy$ ו-$\bar{z}=x-iy$, וזכרו ש-$i\cdot(-iy)=y$.`,
          String.raw`שני מספרים מרוכבים שווים אם ורק אם החלקים הממשיים שווים והחלקים המדומים שווים – תקבלו מערכת של שתי משוואות ליניאריות.`,
        ],
        solutionSteps: [
          String.raw`נציב $z=x+iy$ ($x,y$ ממשיים): $3z=3x+3yi$, ו-$i\bar{z}=i(x-iy)=xi+y$.`,
          String.raw`לכן אגף שמאל הוא $(3x+y)+(x+3y)i$.`,
          String.raw`משוויון מספרים מרוכבים: $3x+y=-4$ ו-$x+3y=4$.`,
          String.raw`מהמשוואה הראשונה $y=-4-3x$. נציב בשנייה: $x-12-9x=4$, כלומר $-8x=16$, ולכן $x=-2$.`,
          String.raw`מכאן $y=-4+6=2$, ולכן $z=-2+2i$. בדיקה: $3(-2+2i)+i(-2-2i)=-6+6i-2i+2=-4+4i$ ✓.`,
        ],
        finalAnswer: String.raw`$z=-2+2i$`,
      },
      {
        id: '35582-3-1-b',
        label: 'ב',
        statement: String.raw`רשמו את $z$ בהצגה קוטבית (טריגונומטרית): מצאו את $|z|$ ואת הארגומנט של $z$ במעלות ($0^\circ\le\theta<360^\circ$).`,
        hints: [
          String.raw`$|z|=\sqrt{x^2+y^2}$.`,
          String.raw`$z$ נמצא ברביע השני (חלק ממשי שלילי, חלק מדומה חיובי), ו-$\tan\theta=\frac{y}{x}=-1$.`,
        ],
        solutionSteps: [
          String.raw`$|z|=\sqrt{(-2)^2+2^2}=\sqrt{8}=2\sqrt{2}$.`,
          String.raw`$\tan\theta=\frac{2}{-2}=-1$, והנקודה $(-2,2)$ נמצאת ברביע השני, לכן $\theta=180^\circ-45^\circ=135^\circ$.`,
          String.raw`לכן $z=2\sqrt{2}\,(\cos 135^\circ+i\sin 135^\circ)$.`,
        ],
        finalAnswer: String.raw`$|z|=2\sqrt{2}$, $\theta=135^\circ$, כלומר $z=2\sqrt{2}\,\mathrm{cis}\,135^\circ$`,
      },
      {
        id: '35582-3-1-c',
        label: 'ג',
        statement: String.raw`מצאו את המספר הטבעי הקטן ביותר $n$ שעבורו $z^n$ הוא מספר ממשי חיובי, וחשבו את $z^n$ עבור $n$ זה.`,
        hints: [
          String.raw`לפי משפט דה-מואבר: $z^n=(2\sqrt{2})^n\left(\cos(135n)^\circ+i\sin(135n)^\circ\right)$.`,
          String.raw`$z^n$ ממשי חיובי אם ורק אם הארגומנט $135n$ הוא כפולה של $360^\circ$.`,
          String.raw`$135n=360k$ שקול ל-$3n=8k$; מכיוון ש-3 ו-8 זרים, $n$ חייב להתחלק ב-8.`,
        ],
        solutionSteps: [
          String.raw`לפי דה-מואבר: $z^n=(2\sqrt{2})^n\,\mathrm{cis}(135n)^\circ$, והגודל $(2\sqrt2)^n$ חיובי תמיד.`,
          String.raw`$z^n$ ממשי חיובי $\iff \sin(135n)^\circ=0$ וגם $\cos(135n)^\circ=1$ $\iff 135n=360k$ עבור $k$ שלם.`,
          String.raw`נחלק ב-45: $3n=8k$. מאחר ש-$\gcd(3,8)=1$, $n$ חייב להיות כפולה של 8, והקטן ביותר הוא $n=8$ (עם $k=3$).`,
          String.raw`$z^8=(2\sqrt{2})^8\,\mathrm{cis}\,1080^\circ=(\sqrt{8})^8\cdot 1=8^4=4096$.`,
          String.raw`בדיקה מהירה: $z^2=(-2+2i)^2=4-8i-4=-8i$, $z^4=(-8i)^2=-64$, $z^8=(-64)^2=4096$ ✓.`,
        ],
        finalAnswer: String.raw`$n=8$, ו-$z^8=4096$`,
        numericAnswer: 8,
      },
      {
        id: '35582-3-1-d',
        label: 'ד',
        statement: String.raw`במישור גאוס, הנקודה $A$ מייצגת את $z$, הנקודה $B$ מייצגת את $\bar{z}$ והנקודה $C$ מייצגת את $z^2$. חשבו את שטח המשולש $ABC$.`,
        hints: [
          String.raw`רשמו שיעורים: $A(-2,2)$, $B(-2,-2)$, ומסעיף ג $z^2=-8i$ ולכן $C(0,-8)$.`,
          String.raw`הצלע $AB$ אנכית (על הישר $x=-2$). הגובה אליה הוא המרחק האופקי של $C$ מהישר $x=-2$.`,
        ],
        solutionSteps: [
          String.raw`$z=-2+2i \Rightarrow A(-2,2)$; $\bar{z}=-2-2i \Rightarrow B(-2,-2)$.`,
          String.raw`$z^2=(-2+2i)^2=4-8i+4i^2=-8i \Rightarrow C(0,-8)$.`,
          String.raw`הצלע $AB$ מונחת על הישר $x=-2$ ואורכה $AB=2-(-2)=4$.`,
          String.raw`הגובה מ-$C$ לישר $x=-2$ הוא $|0-(-2)|=2$.`,
          String.raw`$S_{ABC}=\frac{1}{2}\cdot 4\cdot 2=4$.`,
        ],
        finalAnswer: String.raw`$S_{ABC}=4$`,
        numericAnswer: 4,
      },
    ],
  },
  {
    id: '35582-3-2',
    questionnaire: '35582',
    slot: 3,
    title: 'שורשים מסדר שישי ומשושה משוכלל',
    topicId: 'complex-numbers',
    subtopicIds: ['complex-gauss-demoivre', 'complex-geometry', 'complex-arithmetic'],
    difficulty: 2,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35582-3-2-a',
        label: 'א',
        statement: String.raw`נתון $w=(\sqrt{3}+i)^6$. רשמו את $\sqrt{3}+i$ בהצגה קוטבית, ובעזרת משפט דה-מואבר חשבו את $w$.`,
        hints: [
          String.raw`$|\sqrt3+i|=\sqrt{3+1}$, והמספר נמצא ברביע הראשון עם $\tan\theta=\frac{1}{\sqrt3}$.`,
          String.raw`$(r\,\mathrm{cis}\,\theta)^6=r^6\,\mathrm{cis}(6\theta)$.`,
        ],
        solutionSteps: [
          String.raw`$|\sqrt{3}+i|=\sqrt{3+1}=2$, ו-$\tan\theta=\frac{1}{\sqrt{3}}$ ברביע הראשון, לכן $\theta=30^\circ$.`,
          String.raw`$\sqrt{3}+i=2\,\mathrm{cis}\,30^\circ$.`,
          String.raw`לפי דה-מואבר: $w=2^6\,\mathrm{cis}(6\cdot 30^\circ)=64\,\mathrm{cis}\,180^\circ$.`,
          String.raw`$\cos180^\circ=-1$, $\sin180^\circ=0$, ולכן $w=-64$.`,
        ],
        finalAnswer: String.raw`$w=-64$`,
        numericAnswer: -64,
      },
      {
        id: '35582-3-2-b',
        label: 'ב',
        statement: String.raw`פתרו את המשוואה $z^6=w$. רשמו את כל הפתרונות בהצגה קוטבית, ואת הפתרונות שנמצאים על הצירים גם בהצגה אלגברית.`,
        hints: [
          String.raw`$-64=64\,\mathrm{cis}\,180^\circ$. אם $z=r\,\mathrm{cis}\,\theta$ אז $r^6=64$ ו-$6\theta=180^\circ+360^\circ k$.`,
          String.raw`$r=2$ ו-$\theta=30^\circ+60^\circ k$ עבור $k=0,1,\dots,5$.`,
        ],
        solutionSteps: [
          String.raw`נרשום $z=r\,\mathrm{cis}\,\theta$, ולפי דה-מואבר $z^6=r^6\,\mathrm{cis}(6\theta)$. משוויון להצגה $64\,\mathrm{cis}\,180^\circ$:`,
          String.raw`$r^6=64 \Rightarrow r=2$ (כי $r>0$).`,
          String.raw`$6\theta=180^\circ+360^\circ k \Rightarrow \theta=30^\circ+60^\circ k$, ועבור $k=0,\dots,5$ מתקבלים שישה פתרונות שונים.`,
          String.raw`$z_k=2\,\mathrm{cis}(30^\circ+60^\circ k)$: הארגומנטים $30^\circ,90^\circ,150^\circ,210^\circ,270^\circ,330^\circ$.`,
          String.raw`על הצירים: $z_1=2\,\mathrm{cis}\,90^\circ=2i$ ו-$z_4=2\,\mathrm{cis}\,270^\circ=-2i$. (השאר: $\pm\sqrt{3}\pm i$.)`,
        ],
        finalAnswer: String.raw`$z_k=2\,\mathrm{cis}(30^\circ+60^\circ k)$, $k=0,\dots,5$; כלומר $\pm\sqrt3\pm i$ ו-$\pm 2i$`,
      },
      {
        id: '35582-3-2-c',
        label: 'ג',
        statement: String.raw`הנקודות המייצגות את פתרונות המשוואה במישור גאוס הן קודקודים של מצולע. הסבירו מדוע זהו משושה משוכלל, ומצאו את שטחו.`,
        hints: [
          String.raw`לכל הפתרונות אותו ערך מוחלט, ולכן הם על מעגל אחד שמרכזו בראשית. מה ההפרש בין ארגומנטים של שורשים סמוכים?`,
          String.raw`המשושה מתחלק לשישה משולשים שווי-צלעות שקודקודם בראשית וצלעם שווה לרדיוס.`,
        ],
        solutionSteps: [
          String.raw`$|z_k|=2$ לכל $k$, ולכן כל הנקודות על מעגל שמרכזו $O$ ורדיוסו 2.`,
          String.raw`בין כל שני שורשים סמוכים הזווית המרכזית היא $60^\circ$, ולכן המיתרים בין שורשים סמוכים שווים זה לזה – המצולע משוכלל.`,
          String.raw`כל משולש מרכזי $Oz_kz_{k+1}$ הוא שווה-שוקיים עם שוקיים 2 וזווית ראש $60^\circ$, ולכן שווה-צלעות עם צלע 2.`,
          String.raw`שטח משולש כזה: $\frac{1}{2}\cdot2\cdot2\cdot\sin60^\circ=\sqrt{3}$.`,
          String.raw`שטח המשושה: $6\sqrt{3}\approx 10.39$.`,
        ],
        finalAnswer: String.raw`$S=6\sqrt{3}\approx 10.39$`,
        numericAnswer: 10.392304845413264,
      },
      {
        id: '35582-3-2-d',
        label: 'ד',
        statement: String.raw`הראו כי בדיוק שלושה מפתרונות המשוואה $z^6=w$ מקיימים $z^3=8i$, וחשבו את שטח המשולש שקודקודיו הם הנקודות המייצגות שלושה פתרונות אלה.`,
        hints: [
          String.raw`עבור $z_k=2\,\mathrm{cis}\,\theta_k$ מתקיים $z_k^3=8\,\mathrm{cis}(3\theta_k)$, ו-$8i=8\,\mathrm{cis}\,90^\circ$.`,
          String.raw`בדקו לאילו מהארגומנטים $30^\circ,90^\circ,\dots,330^\circ$ מתקיים $3\theta\equiv 90^\circ \pmod{360^\circ}$.`,
          String.raw`שלוש הנקודות מרוחקות זו מזו $120^\circ$ על מעגל ברדיוס 2 – משולש שווה-צלעות.`,
        ],
        solutionSteps: [
          String.raw`$z^6=(z^3)^2=-64$ שקול ל-$z^3=8i$ או $z^3=-8i$, ולכן כל פתרון מקיים בדיוק אחת מהשתיים.`,
          String.raw`$z_k^3=8\,\mathrm{cis}(3\theta_k)$. עבור $\theta=30^\circ,150^\circ,270^\circ$: $3\theta=90^\circ,450^\circ,810^\circ$ – כולם שקולים ל-$90^\circ$, ולכן $z^3=8i$.`,
          String.raw`עבור $\theta=90^\circ,210^\circ,330^\circ$: $3\theta=270^\circ,630^\circ,990^\circ$ – שקולים ל-$270^\circ$, כלומר $z^3=-8i$. לכן בדיוק שלושה פתרונות מקיימים $z^3=8i$: $\sqrt3+i$, $-\sqrt3+i$, $-2i$.`,
          String.raw`הנקודות על מעגל ברדיוס 2 והזוויות המרכזיות ביניהן $120^\circ$, ולכן המשולש שווה-צלעות.`,
          String.raw`הצלע: המרחק בין $(\sqrt3,1)$ ל-$(-\sqrt3,1)$ הוא $2\sqrt{3}$.`,
          String.raw`$S=\frac{\sqrt{3}}{4}\cdot(2\sqrt{3})^2=\frac{\sqrt3}{4}\cdot12=3\sqrt{3}\approx5.196$ – בדיוק מחצית משטח המשושה.`,
        ],
        finalAnswer: String.raw`הפתרונות $\sqrt3+i,\,-\sqrt3+i,\,-2i$; $S=3\sqrt{3}\approx 5.196$`,
        numericAnswer: 5.196152422706632,
      },
    ],
  },
  {
    id: '35582-3-3',
    questionnaire: '35582',
    slot: 3,
    title: 'סדרה הנדסית של חזקות וזהויות טריגונומטריות',
    topicId: 'complex-numbers',
    subtopicIds: ['complex-gauss-demoivre', 'complex-arithmetic', 'complex-geometry'],
    difficulty: 3,
    estimatedMinutes: 35,
    verified: false,
    source: 'ai-generated',
    sections: [
      {
        id: '35582-3-3-a',
        label: 'א',
        statement: String.raw`נתון $z=\cos40^\circ+i\sin40^\circ$.

הראו כי $z^9=1$, וכי סכום הסדרה ההנדסית $S=1+z+z^2+\dots+z^8$ שווה ל-0.`,
        hints: [
          String.raw`לפי דה-מואבר $z^9=\cos360^\circ+i\sin360^\circ$.`,
          String.raw`סכום סדרה הנדסית עם 9 איברים, איבר ראשון 1 ומנה $z\ne1$: $S=\frac{z^9-1}{z-1}$.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט דה-מואבר: $z^9=\cos(9\cdot40^\circ)+i\sin(9\cdot40^\circ)=\cos360^\circ+i\sin360^\circ=1$.`,
          String.raw`$S$ הוא סכום סדרה הנדסית עם איבר ראשון $a_1=1$, מנה $q=z$ ו-9 איברים.`,
          String.raw`$z\ne1$ (כי $\sin40^\circ\ne0$), לכן מותר להשתמש בנוסחה: $S=\frac{z^9-1}{z-1}$.`,
          String.raw`$z^9-1=0$, ולכן $S=\frac{0}{z-1}=0$.`,
        ],
        finalAnswer: String.raw`$z^9=1$ ו-$S=0$`,
      },
      {
        id: '35582-3-3-b',
        label: 'ב',
        statement: String.raw`היעזרו בסעיף א והוכיחו כי $\cos40^\circ+\cos80^\circ+\cos120^\circ+\cos160^\circ=-\frac{1}{2}$.`,
        hints: [
          String.raw`החלק הממשי של $S$ הוא $1+\cos40^\circ+\cos80^\circ+\dots+\cos320^\circ$.`,
          String.raw`השתמשו בזהות $\cos(360^\circ-\alpha)=\cos\alpha$ כדי לזווג: $\cos320^\circ=\cos40^\circ$, $\cos280^\circ=\cos80^\circ$ וכן הלאה.`,
        ],
        solutionSteps: [
          String.raw`לפי דה-מואבר $z^k=\cos(40k)^\circ+i\sin(40k)^\circ$, ולכן $\mathrm{Re}(S)=1+\sum_{k=1}^{8}\cos(40k)^\circ$.`,
          String.raw`מסעיף א $S=0$, ולכן $\mathrm{Re}(S)=0$.`,
          String.raw`לפי $\cos(360^\circ-\alpha)=\cos\alpha$: $\cos320^\circ=\cos40^\circ$, $\cos280^\circ=\cos80^\circ$, $\cos240^\circ=\cos120^\circ$, $\cos200^\circ=\cos160^\circ$.`,
          String.raw`לכן $1+2(\cos40^\circ+\cos80^\circ+\cos120^\circ+\cos160^\circ)=0$.`,
          String.raw`ומכאן $\cos40^\circ+\cos80^\circ+\cos120^\circ+\cos160^\circ=-\frac{1}{2}$.`,
        ],
        finalAnswer: String.raw`$\cos40^\circ+\cos80^\circ+\cos120^\circ+\cos160^\circ=-\frac12$`,
        numericAnswer: -0.5,
      },
      {
        id: '35582-3-3-c',
        label: 'ג',
        statement: String.raw`הראו כי $1+z=2\cos20^\circ\,(\cos20^\circ+i\sin20^\circ)$, ומצאו את המספר הטבעי הקטן ביותר $n$ שעבורו $(1+z)^n$ הוא מספר ממשי שלילי.`,
        hints: [
          String.raw`השתמשו בזהויות לזווית כפולה: $1+\cos40^\circ=2\cos^2 20^\circ$ ו-$\sin40^\circ=2\sin20^\circ\cos20^\circ$.`,
          String.raw`$2\cos20^\circ>0$, ולכן זו הצגה קוטבית: $|1+z|=2\cos20^\circ$ והארגומנט $20^\circ$.`,
          String.raw`$(1+z)^n$ ממשי שלילי אם ורק אם $20n=180+360k$.`,
        ],
        solutionSteps: [
          String.raw`$1+z=(1+\cos40^\circ)+i\sin40^\circ$.`,
          String.raw`לפי $\cos2\alpha=2\cos^2\alpha-1$: $1+\cos40^\circ=2\cos^2 20^\circ$; לפי $\sin2\alpha=2\sin\alpha\cos\alpha$: $\sin40^\circ=2\sin20^\circ\cos20^\circ$.`,
          String.raw`לכן $1+z=2\cos^220^\circ+2i\sin20^\circ\cos20^\circ=2\cos20^\circ(\cos20^\circ+i\sin20^\circ)$, וזו הצגה קוטבית כי $2\cos20^\circ>0$.`,
          String.raw`לפי דה-מואבר: $(1+z)^n=(2\cos20^\circ)^n\,\mathrm{cis}(20n)^\circ$.`,
          String.raw`ממשי שלילי $\iff 20n=180+360k \iff n=9+18k$. הקטן ביותר הטבעי: $n=9$.`,
          String.raw`אכן $(1+z)^9=-(2\cos20^\circ)^9$.`,
        ],
        finalAnswer: String.raw`$n=9$`,
        numericAnswer: 9,
      },
      {
        id: '35582-3-3-d',
        label: 'ד',
        statement: String.raw`הנקודות המייצגות במישור גאוס את איברי הסדרה $1,z,z^2,\dots,z^8$ הן קודקודים של מצולע משוכלל. חשבו את שטחו (דיוק של שלוש ספרות אחרי הנקודה).`,
        hints: [
          String.raw`$|z^k|=1$ והארגומנטים $0^\circ,40^\circ,\dots,320^\circ$ – תשע נקודות במרווחים שווים על מעגל היחידה.`,
          String.raw`חלקו את המצולע לתשעה משולשים מרכזיים חופפים עם שוקיים 1 וזווית ראש $40^\circ$.`,
        ],
        solutionSteps: [
          String.raw`לפי דה-מואבר $z^k=\mathrm{cis}(40k)^\circ$, $|z^k|=1$: כל הנקודות על מעגל היחידה, והזווית המרכזית בין נקודות סמוכות $40^\circ$.`,
          String.raw`מסעיף א $z^9=1$, ולכן לאחר $z^8$ חוזרים ל-$1$ – יש בדיוק 9 נקודות שונות, והמצולע הוא מצולע משוכלל בעל 9 צלעות.`,
          String.raw`שטח כל משולש מרכזי: $\frac12\cdot1\cdot1\cdot\sin40^\circ$.`,
          String.raw`שטח המצולע: $S=9\cdot\frac12\sin40^\circ=4.5\sin40^\circ\approx 2.893$.`,
        ],
        finalAnswer: String.raw`$S=\frac{9}{2}\sin40^\circ\approx 2.893$`,
        numericAnswer: 2.892544243589427,
      },
    ],
  },
];
