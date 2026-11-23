import type { Problem } from '../types';

/**
 * שאלון 35581 (571) – שאלה 1 במתכונת החדשה: ״שאלות קצרות״.
 * כל שאלה היא סט של ארבעה סעיפים קצרים ובלתי תלויים, כל אחד מנושא אחר של השאלון;
 * בבחינה עונים על שניים מתוך הארבעה. topicId הוא הנושא של סעיף א, ו-subtopicIds מכסה את כל ארבעת הסעיפים.
 * השרטוט (אם יש) שייך לסעיף אחד בלבד, והסעיף רשום בתוך השרטוט.
 * התרגילים מקוריים ונשארים בתוך המיקוד: בלי סדרה חשבונית, בלי אינטגרל של שורש, בלי נפח גוף סיבוב, בלי e^x ו-ln.
 */
export const shortProblems: Problem[] = [
  {
    id: '35581-1-201',
    questionnaire: '35581',
    slot: 1,
    format: 'short-questions',
    title: 'שאלות קצרות – סט 1: הסתברות מותנית, סדרה אינסופית, תיכון במשולש, משיק',
    topicId: 'probability',
    subtopicIds: ['probability-conditional', 'probability-trees', 'seq-geometric', 'trig-triangle-solutions', 'diff-tangent-on-graph'],
    difficulty: 2,
    estimatedMinutes: 28,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <title>שרטוט לסעיף ג</title>
  <polygon points="90.0,190.0 210.0,190.0 186.0,23.7" />
  <line x1="90.0" y1="190.0" x2="198.0" y2="106.9" stroke-width="1.5" />
  <path d="M 112.0,190.0 A 22 22 0 0 0 101.0,170.9" stroke-width="1.2" />
  <line x1="199.3" y1="151.1" x2="209.2" y2="149.7" stroke-width="1.2" />
  <line x1="198.8" y1="147.2" x2="208.7" y2="145.7" stroke-width="1.2" />
  <line x1="187.3" y1="68.0" x2="197.2" y2="66.6" stroke-width="1.2" />
  <line x1="186.8" y1="64.0" x2="196.7" y2="62.6" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="74.0" y="196.0">A</text>
    <text x="216.0" y="196.0">B</text>
    <text x="182.0" y="15.7">C</text>
    <text x="206.0" y="110.9">D</text>
    <text x="111.2" y="177.0" font-size="13">60°</text>
    <text x="146.0" y="207.0" font-size="13">5</text>
    <text x="120.0" y="102.9" font-size="13">8</text>
    <text x="160.0" y="234.0" font-size="12" text-anchor="middle">שרטוט לסעיף ג</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-1-201-a',
        label: 'א',
        statement: String.raw`בכד הראשון יש $3$ כדורים אדומים ו-$2$ כדורים כחולים, ובכד השני יש $2$ כדורים אדומים ו-$4$ כדורים כחולים. מטילים קובייה הוגנת: אם התקבל $1$ או $2$, מוציאים באקראי כדור אחד מהכד הראשון; אחרת מוציאים באקראי כדור אחד מהכד השני.

חשבו את ההסתברות שהכדור שהוצא אדום. ידוע שהכדור שהוצא אדום – חשבו את ההסתברות שהוא הוצא מהכד הראשון.`,
        hints: [
          String.raw`בנו עץ הסתברות דו-שלבי: בשלב הראשון נקבע הכד (לפי תוצאת הקובייה), ובשלב השני – צבע הכדור.`,
          String.raw`סמנו $A$ – נבחר הכד הראשון, $R$ – הוצא כדור אדום. $P(A)=\frac26=\frac13$, ו-$P(R)$ הוא סכום ההסתברויות של שני המסלולים בעץ שמסתיימים בכדור אדום.`,
          String.raw`הסתברות מותנית: $P(A\mid R)=\frac{P(A\cap R)}{P(R)}$.`,
        ],
        solutionSteps: [
          String.raw`נסמן: $A$ – נבחר הכד הראשון, $R$ – הוצא כדור אדום. $P(A)=\frac26=\frac13$, ולכן $P(\bar A)=\frac23$.`,
          String.raw`בכד הראשון $5$ כדורים ש-$3$ מהם אדומים: $P(R\mid A)=\frac35$. בכד השני $6$ כדורים ש-$2$ מהם אדומים: $P(R\mid\bar A)=\frac26=\frac13$.`,
          String.raw`$P(A\cap R)=\frac13\cdot\frac35=\frac15$, ו-$P(\bar A\cap R)=\frac23\cdot\frac13=\frac29$.`,
          String.raw`$P(R)=\frac15+\frac29=\frac{9}{45}+\frac{10}{45}=\frac{19}{45}$.`,
          String.raw`$P(A\mid R)=\frac{P(A\cap R)}{P(R)}=\frac{\frac15}{\frac{19}{45}}=\frac{9}{19}\approx0.474$.`,
        ],
        finalAnswer: String.raw`$P(R)=\frac{19}{45}$; $P(A\mid R)=\frac{9}{19}\approx0.474$.`,
        numericAnswer: 9 / 19,
      },
      {
        id: '35581-1-201-b',
        label: 'ב',
        statement: String.raw`בסדרה הנדסית אינסופית מתכנסת סכום כל האיברים הוא $24$, וסכום כל האיברים שבמקומות הזוגיים ($a_2,a_4,a_6,\dots$) הוא $6$.

מצאו את מנת הסדרה, וחשבו את האיבר הראשון שלה.`,
        hints: [
          String.raw`האיברים שבמקומות הזוגיים יוצרים בעצמם סדרה הנדסית אינסופית: האיבר הראשון שלה $a_1q$ והמנה שלה $q^2$.`,
          String.raw`כתבו שתי משוואות: $\frac{a_1}{1-q}=24$ ו-$\frac{a_1q}{1-q^2}=6$, וחלקו את השנייה בראשונה.`,
          String.raw`$1-q^2=(1-q)(1+q)$, ולכן אחרי החילוק נשאר $\frac{q}{1+q}=\frac14$.`,
        ],
        solutionSteps: [
          String.raw`נסמן ב-$a_1$ את האיבר הראשון וב-$q$ את המנה ($|q|<1$). סכום הסדרה: $\frac{a_1}{1-q}=24$.`,
          String.raw`האיברים במקומות הזוגיים, $a_1q,\ a_1q^3,\ a_1q^5,\dots$, הם סדרה הנדסית שאיברה הראשון $a_1q$ ומנתה $q^2$ ($q^2<1$), ולכן $\frac{a_1q}{1-q^2}=6$.`,
          String.raw`נחלק את המשוואה השנייה בראשונה: $\frac{a_1q}{(1-q)(1+q)}\cdot\frac{1-q}{a_1}=\frac{6}{24}$, כלומר $\frac{q}{1+q}=\frac14$.`,
          String.raw`$4q=1+q\Rightarrow q=\frac13$ (מתאים לתנאי $|q|<1$).`,
          String.raw`$a_1=24(1-q)=24\cdot\frac23=16$. בדיקה: $\frac{16\cdot\frac13}{1-\frac19}=\frac{16}{3}\cdot\frac98=6$.`,
        ],
        finalAnswer: String.raw`$q=\frac13$, $a_1=16$.`,
        numericAnswer: 16,
      },
      {
        id: '35581-1-201-c',
        label: 'ג',
        statement: String.raw`במשולש $ABC$ נתון: $AB=5$ ס״מ, $AC=8$ ס״מ, $\angle BAC=60^\circ$. הנקודה $D$ היא אמצע הצלע $BC$ (ראו שרטוט).

חשבו את אורך הצלע $BC$ ואת אורך התיכון $AD$.`,
        hints: [
          String.raw`במשולש $ABC$ ידועות שתי צלעות והזווית שביניהן – משפט הקוסינוסים נותן את $BC$.`,
          String.raw`כדי למצוא את $AD$ עברו למשולש $ABD$: ידועות בו $AB$ ו-$BD=\frac{BC}{2}$, וחסר $\cos\angle ABC$.`,
          String.raw`את $\cos\angle ABC$ מוצאים ממשפט הקוסינוסים במשולש $ABC$ (כל שלוש הצלעות כבר ידועות).`,
        ],
        solutionSteps: [
          String.raw`משפט הקוסינוסים במשולש $ABC$: $BC^2=AB^2+AC^2-2\cdot AB\cdot AC\cdot\cos60^\circ=25+64-2\cdot5\cdot8\cdot\frac12=49$, ולכן $BC=7$ ס״מ.`,
          String.raw`$D$ אמצע $BC$, לכן $BD=3.5$ ס״מ.`,
          String.raw`נמצא את $\cos\angle ABC$ ממשפט הקוסינוסים במשולש $ABC$: $AC^2=AB^2+BC^2-2\cdot AB\cdot BC\cdot\cos\angle ABC$, כלומר $64=25+49-70\cos\angle ABC$, ולכן $\cos\angle ABC=\frac{10}{70}=\frac17$.`,
          String.raw`משפט הקוסינוסים במשולש $ABD$: $AD^2=AB^2+BD^2-2\cdot AB\cdot BD\cdot\cos\angle ABC=25+12.25-2\cdot5\cdot3.5\cdot\frac17=32.25$.`,
          String.raw`$AD=\sqrt{32.25}=\frac{\sqrt{129}}{2}\approx5.68$ ס״מ.`,
        ],
        finalAnswer: String.raw`$BC=7$ ס״מ; $AD=\frac{\sqrt{129}}{2}\approx5.68$ ס״מ.`,
        numericAnswer: Math.sqrt(129) / 2,
      },
      {
        id: '35581-1-201-d',
        label: 'ד',
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-3x^2+4$. מעבירים משיק לגרף הפונקציה בנקודה שבה $x=3$.

מצאו את משוואת המשיק. המשיק חותך את גרף הפונקציה בנקודה נוספת – מצאו את שיעור ה-$x$ של נקודה זו.`,
        hints: [
          String.raw`שיפוע המשיק הוא $f'(3)$, והמשיק עובר בנקודה $(3,f(3))$.`,
          String.raw`כדי למצוא נקודות משותפות למשיק ולגרף, השוו: $x^3-3x^2+4=9x-23$ והעבירו אגפים.`,
          String.raw`$x=3$ הוא פתרון של המשוואה $x^3-3x^2-9x+27=0$ (זו נקודת ההשקה), לכן אפשר לחלק את הפולינום ב-$(x-3)$ או לפרק בקבוצות.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=3x^2-6x$, ולכן שיפוע המשיק: $f'(3)=27-18=9$. נקודת ההשקה: $f(3)=27-27+4=4$, כלומר $(3,4)$.`,
          String.raw`משוואת המשיק: $y-4=9(x-3)$, כלומר $y=9x-23$.`,
          String.raw`נקודות משותפות למשיק ולגרף: $x^3-3x^2+4=9x-23$, כלומר $x^3-3x^2-9x+27=0$.`,
          String.raw`פירוק בקבוצות: $x^2(x-3)-9(x-3)=(x-3)(x^2-9)=(x-3)^2(x+3)=0$.`,
          String.raw`הפתרונות: $x=3$ (נקודת ההשקה) ו-$x=-3$. בדיקה: $f(-3)=-27-27+4=-50$, ועל המשיק $9\cdot(-3)-23=-50$.`,
        ],
        finalAnswer: String.raw`המשיק: $y=9x-23$; הנקודה הנוספת היא $(-3,-50)$, כלומר $x=-3$.`,
        numericAnswer: -3,
      },
    ],
  },
  {
    id: '35581-1-202',
    questionnaire: '35581',
    slot: 1,
    format: 'short-questions',
    title: 'שאלות קצרות – סט 2: תנועה, אינדוקציה, מיתרים במעגל, שטח',
    topicId: 'word-problems',
    subtopicIds: ['word-motion', 'induction-sums', 'geo-circle-angles', 'geo-circle-proportions', 'int-polynomial-rational', 'int-definite-areas'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <title>שרטוט לסעיף ג</title>
  <circle cx="160.0" cy="112.0" r="87.8" stroke-width="1.5" />
  <polygon points="72.3,112.0 126.3,31.0 247.8,112.0 126.3,193.0" stroke-width="1.5" />
  <line x1="72.3" y1="112.0" x2="247.8" y2="112.0" stroke-width="1.5" />
  <line x1="126.3" y1="31.0" x2="126.3" y2="193.0" stroke-width="1.5" />
  <circle cx="160.0" cy="112.0" r="2.5" fill="currentColor" />
  <line x1="131.3" y1="69.5" x2="121.3" y2="69.5" stroke-width="1.2" />
  <line x1="131.3" y1="73.5" x2="121.3" y2="73.5" stroke-width="1.2" />
  <line x1="131.3" y1="150.5" x2="121.3" y2="150.5" stroke-width="1.2" />
  <line x1="131.3" y1="154.5" x2="121.3" y2="154.5" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="55.3" y="117.0">A</text>
    <text x="253.8" y="117.0">B</text>
    <text x="120.3" y="24.0">C</text>
    <text x="120.3" y="210.0">D</text>
    <text x="132.3" y="129.0">E</text>
    <text x="155.0" y="130.0">O</text>
    <text x="95.3" y="106.0" font-size="13">4</text>
    <text x="201.0" y="106.0" font-size="13">9</text>
    <text x="160.0" y="234.0" font-size="12" text-anchor="middle">שרטוט לסעיף ג</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-1-202-a',
        label: 'א',
        statement: String.raw`רכבת נוסעת מעיר A לעיר B, מרחק של $240$ ק״מ, ואמורה לנסוע את כל הדרך במהירות קבועה. לאחר שעברה מחצית מהדרך במהירות המתוכננת, נעצרה הרכבת למשך $20$ דקות. כדי להגיע ל-B בדיוק בזמן המתוכנן, נסעה הרכבת את מחצית הדרך השנייה במהירות הגדולה ב-$18$ קמ״ש מהמהירות המתוכננת.

מצאו את המהירות המתוכננת של הרכבת.`,
        hints: [
          String.raw`את מחצית הדרך הראשונה נסעה הרכבת כמתוכנן, לכן מספיק להשוות זמנים במחצית השנייה ($120$ ק״מ): הזמן המתוכנן שווה לזמן העצירה ועוד זמן הנסיעה בפועל.`,
          String.raw`סמנו ב-$v$ את המהירות המתוכננת: $\frac{120}{v}=\frac13+\frac{120}{v+18}$ ($20$ דקות הן $\frac13$ שעה).`,
          String.raw`כפלו ב-$3v(v+18)$ וסדרו למשוואה ריבועית; $\sqrt{26244}=162$.`,
        ],
        solutionSteps: [
          String.raw`נסמן ב-$v$ את המהירות המתוכננת (בקמ״ש), $v>0$. במחצית הדרך הראשונה אין הבדל בין התכנון לביצוע, לכן נשווה את הזמנים במחצית השנייה, שאורכה $120$ ק״מ.`,
          String.raw`הזמן המתוכנן למחצית השנייה: $\frac{120}{v}$ שעות. בפועל: עצירה של $20$ דקות, שהן $\frac13$ שעה, ונסיעה במהירות $v+18$ במשך $\frac{120}{v+18}$ שעות.`,
          String.raw`הרכבת הגיעה בדיוק בזמן, לכן $\frac{120}{v}=\frac13+\frac{120}{v+18}$.`,
          String.raw`כפל ב-$3v(v+18)$: $360(v+18)=v(v+18)+360v$, כלומר $v^2+18v-6480=0$.`,
          String.raw`$v=\frac{-18\pm\sqrt{18^2+4\cdot6480}}{2}=\frac{-18\pm\sqrt{26244}}{2}=\frac{-18\pm162}{2}$, ולכן $v=72$ או $v=-90$.`,
          String.raw`המהירות חיובית, לכן $v=72$ קמ״ש. בדיקה: $\frac{120}{72}=\frac53$ שעה, שהן $100$ דקות; בפועל $20$ דקות עצירה ועוד $\frac{120}{90}=\frac43$ שעה, שהן $80$ דקות – יחד $100$ דקות.`,
        ],
        finalAnswer: String.raw`$72$ קמ״ש.`,
        numericAnswer: 72,
      },
      {
        id: '35581-1-202-b',
        label: 'ב',
        statement: String.raw`הוכיחו באינדוקציה מתמטית כי לכל $n$ טבעי מתקיים:

$$
\frac{1}{1\cdot4}+\frac{1}{4\cdot7}+\frac{1}{7\cdot10}+\dots+\frac{1}{(3n-2)(3n+1)}=\frac{n}{3n+1}
$$`,
        hints: [
          String.raw`בדקו את הטענה עבור $n=1$: באגף שמאל יש מחובר אחד בלבד, $\frac{1}{1\cdot4}$.`,
          String.raw`בצעד האינדוקציה: המחובר שמתווסף לסכום כשעוברים מ-$n=k$ ל-$n=k+1$ הוא $\frac{1}{(3k+1)(3k+4)}$, וצריך להגיע ל-$\frac{k+1}{3k+4}$.`,
          String.raw`אחרי מכנה משותף מתקבל במונה $3k^2+4k+1=(3k+1)(k+1)$ – צמצמו ב-$(3k+1)$.`,
        ],
        solutionSteps: [
          String.raw`בדיקה עבור $n=1$: אגף שמאל $\frac{1}{1\cdot4}=\frac14$, אגף ימין $\frac{1}{3\cdot1+1}=\frac14$. הטענה נכונה עבור $n=1$.`,
          String.raw`הנחת האינדוקציה: נניח שהטענה נכונה עבור $n=k$ ($k$ טבעי), כלומר $\frac{1}{1\cdot4}+\frac{1}{4\cdot7}+\dots+\frac{1}{(3k-2)(3k+1)}=\frac{k}{3k+1}$.`,
          String.raw`צריך להוכיח שהיא נכונה עבור $n=k+1$: $\frac{1}{1\cdot4}+\dots+\frac{1}{(3k-2)(3k+1)}+\frac{1}{(3k+1)(3k+4)}=\frac{k+1}{3(k+1)+1}=\frac{k+1}{3k+4}$.`,
          String.raw`לפי הנחת האינדוקציה, אגף שמאל שווה ל-$\frac{k}{3k+1}+\frac{1}{(3k+1)(3k+4)}=\frac{k(3k+4)+1}{(3k+1)(3k+4)}=\frac{3k^2+4k+1}{(3k+1)(3k+4)}$.`,
          String.raw`פירוק הטרינום: $3k^2+4k+1=(3k+1)(k+1)$, ולכן אגף שמאל שווה ל-$\frac{(3k+1)(k+1)}{(3k+1)(3k+4)}=\frac{k+1}{3k+4}$ – וזה אגף ימין עבור $n=k+1$.`,
          String.raw`הטענה נכונה עבור $n=1$, ומנכונותה עבור $n=k$ נובעת נכונותה עבור $n=k+1$; לכן, לפי עקרון האינדוקציה המתמטית, היא נכונה לכל $n$ טבעי.`,
        ],
        finalAnswer: String.raw`הטענה הוכחה באינדוקציה; לב הצעד: $\frac{k}{3k+1}+\frac{1}{(3k+1)(3k+4)}=\frac{(3k+1)(k+1)}{(3k+1)(3k+4)}=\frac{k+1}{3k+4}$.`,
      },
      {
        id: '35581-1-202-c',
        label: 'ג',
        statement: String.raw`$AB$ הוא קוטר במעגל שמרכזו $O$. המיתר $CD$ חותך את הקוטר $AB$ בנקודה $E$, שהיא אמצע המיתר $CD$ (ראו שרטוט). נתון: $AE=4$ ס״מ, $EB=9$ ס״מ.

חשבו את אורך המיתר $CD$ ואת שטח המרובע $ACBD$. נמקו.`,
        hints: [
          String.raw`כאשר שני מיתרים נחתכים בתוך מעגל, מכפלת קטעי המיתר האחד שווה למכפלת קטעי המיתר האחר: $CE\cdot ED=AE\cdot EB$.`,
          String.raw`$E$ היא אמצע המיתר $CD$ והיא נמצאת על הקוטר. מה ידוע על קטע ממרכז המעגל שחוצה מיתר?`,
          String.raw`האלכסונים $AB$ ו-$CD$ של המרובע $ACBD$ מאונכים זה לזה, לכן שטחו הוא מחצית מכפלת האלכסונים (או סכום שטחי המשולשים $ACD$ ו-$BCD$).`,
        ],
        solutionSteps: [
          String.raw`$AB$ ו-$CD$ הם מיתרים הנחתכים בנקודה $E$ שבתוך המעגל, ולכן $CE\cdot ED=AE\cdot EB=4\cdot9=36$.`,
          String.raw`$E$ אמצע $CD$, כלומר $CE=ED$, ולכן $CE^2=36$: $CE=ED=6$ ס״מ ו-$CD=12$ ס״מ.`,
          String.raw`$AB=4+9=13$ ס״מ, לכן הרדיוס $6.5$ ס״מ ו-$OE=6.5-4=2.5$ ס״מ, כלומר $E$ אינה מרכז המעגל ו-$CD$ אינו קוטר. קטע ממרכז המעגל החוצה מיתר מאונך למיתר, ולכן $OE\perp CD$, כלומר $AB\perp CD$.`,
          String.raw`במרובע $ACBD$ האלכסונים $AB$ ו-$CD$ מאונכים זה לזה, לכן שטחו שווה למחצית מכפלת האלכסונים: $S=\frac{AB\cdot CD}{2}=\frac{13\cdot12}{2}=78$ סמ״ר.`,
          String.raw`בדיקה בדרך אחרת: $AE$ ו-$EB$ הם הגבהים ל-$CD$ במשולשים $ACD$ ו-$BCD$, ולכן $S=\frac{12\cdot4}{2}+\frac{12\cdot9}{2}=24+54=78$.`,
        ],
        finalAnswer: String.raw`$CD=12$ ס״מ; $S_{ACBD}=78$ סמ״ר.`,
        numericAnswer: 78,
      },
      {
        id: '35581-1-202-d',
        label: 'ד',
        statement: String.raw`נתונה הפונקציה $f(x)=x^3-3x^2+2x$.

מצאו את נקודות החיתוך של גרף הפונקציה עם ציר ה-$x$, וחשבו את השטח הכולל המוגבל בין גרף הפונקציה לציר ה-$x$.`,
        hints: [
          String.raw`פרקו לגורמים: $x^3-3x^2+2x=x(x^2-3x+2)$.`,
          String.raw`בין $x=0$ ל-$x=1$ הפונקציה חיובית, ובין $x=1$ ל-$x=2$ היא שלילית – חשבו כל חלק בנפרד.`,
          String.raw`שטח הוא גודל חיובי: בתחום שבו הפונקציה שלילית השטח הוא $-\int f(x)\,dx$. אינטגרל אחד מ-$0$ עד $2$ ייתן $0$, לא את השטח.`,
        ],
        solutionSteps: [
          String.raw`$f(x)=x(x^2-3x+2)=x(x-1)(x-2)$, ולכן נקודות החיתוך עם ציר ה-$x$ הן $(0,0)$, $(1,0)$, $(2,0)$.`,
          String.raw`סימן הפונקציה: בתחום $0<x<1$ היא חיובית (למשל $f(0.5)=0.375$), ובתחום $1<x<2$ היא שלילית (למשל $f(1.5)=-0.375$). השטח המוגבל מורכב משני חלקים.`,
          String.raw`פונקציה קדומה: $F(x)=\frac{x^4}{4}-x^3+x^2$.`,
          String.raw`$S_1=\int_0^1 f(x)\,dx=F(1)-F(0)=\frac14-1+1=\frac14$.`,
          String.raw`$\int_1^2 f(x)\,dx=F(2)-F(1)=(4-8+4)-\frac14=-\frac14$, ולכן $S_2=\frac14$.`,
          String.raw`השטח הכולל: $S=S_1+S_2=\frac14+\frac14=\frac12$.`,
        ],
        finalAnswer: String.raw`נקודות החיתוך: $(0,0)$, $(1,0)$, $(2,0)$; השטח הכולל $\frac12$.`,
        numericAnswer: 0.5,
      },
    ],
  },
  {
    id: '35581-1-203',
    questionnaire: '35581',
    slot: 1,
    format: 'short-questions',
    title: 'שאלות קצרות – סט 3: ערך מוחלט, התפלגות בינומית, משפט הסינוסים, קיצון',
    topicId: 'algebra',
    subtopicIds: ['alg-absolute-equations', 'alg-parameter-note', 'probability-binomial', 'trig-triangle-solutions', 'diff-rules', 'diff-investigation'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <title>שרטוט לסעיף ג</title>
  <polygon points="64.2,24.2 110.0,195.0 235.0,195.0" />
  <path d="M 72.0,53.2 A 30 30 0 0 0 85.5,45.5" stroke-width="1.2" />
  <path d="M 218.0,178.0 A 24 24 0 0 0 211.0,195.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="58.2" y="16.2">A</text>
    <text x="94.0" y="203.0">B</text>
    <text x="241.0" y="203.0">C</text>
    <text x="77.2" y="68.1" font-size="13">30°</text>
    <text x="186.0" y="183.7" font-size="13">45°</text>
    <text x="164.5" y="212.0" font-size="13">10</text>
    <text x="160.0" y="234.0" font-size="12" text-anchor="middle">שרטוט לסעיף ג</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-1-203-a',
        label: 'א',
        statement: String.raw`פתרו את המשוואה $|x^2-6x+4|=4$.

מצאו את ערך הפרמטר $k$ שעבורו למשוואה $|x^2-6x+4|=k$ יש בדיוק שלושה פתרונות.`,
        hints: [
          String.raw`$|A|=4$ פירושו $A=4$ או $A=-4$ – פתרו שתי משוואות ריבועיות.`,
          String.raw`עבור $k>0$ המשוואה $|x^2-6x+4|=k$ מתפרקת ל-$x^2-6x+4-k=0$ או $x^2-6x+4+k=0$. לראשונה יש תמיד שני פתרונות שונים (הדיסקרימיננטה שלה $20+4k>0$).`,
          String.raw`יהיו בדיוק שלושה פתרונות כאשר למשוואה השנייה יש פתרון יחיד, כלומר כאשר הדיסקרימיננטה שלה מתאפסת.`,
        ],
        solutionSteps: [
          String.raw`$|x^2-6x+4|=4$ מתקיים כאשר $x^2-6x+4=4$ או $x^2-6x+4=-4$.`,
          String.raw`$x^2-6x=0\Rightarrow x(x-6)=0\Rightarrow x=0$ או $x=6$.`,
          String.raw`$x^2-6x+8=0\Rightarrow(x-2)(x-4)=0\Rightarrow x=2$ או $x=4$. לכן למשוואה הראשונה ארבעה פתרונות: $0,2,4,6$.`,
          String.raw`עבור $k<0$ אין פתרון (ערך מוחלט אינו שלילי), ועבור $k=0$ מתקבלת המשוואה $x^2-6x+4=0$, שיש לה שני פתרונות בלבד. לכן $k>0$, והמשוואה שקולה ל-$x^2-6x+(4-k)=0$ או $x^2-6x+(4+k)=0$.`,
          String.raw`הדיסקרימיננטה של הראשונה: $36-4(4-k)=20+4k>0$ – תמיד שני פתרונות שונים. הדיסקרימיננטה של השנייה: $36-4(4+k)=20-4k$.`,
          String.raw`לשתי המשוואות אין פתרון משותף (חיסור ביניהן נותן $2k=0$, ו-$k>0$). לכן יש בדיוק שלושה פתרונות רק כאשר למשוואה השנייה יש פתרון יחיד: $20-4k=0\Rightarrow k=5$.`,
          String.raw`בדיקה עבור $k=5$: $x^2-6x+9=0\Rightarrow x=3$, ו-$x^2-6x-1=0\Rightarrow x=3\pm\sqrt{10}$ – שלושה פתרונות שונים.`,
        ],
        finalAnswer: String.raw`פתרונות המשוואה הראשונה: $x=0,2,4,6$; בדיוק שלושה פתרונות מתקבלים עבור $k=5$.`,
        numericAnswer: 5,
      },
      {
        id: '35581-1-203-b',
        label: 'ב',
        statement: String.raw`שחקן כדורסל זורק זריקות עונשין. ההסתברות שיקלע בזריקה היא $p$; היא קבועה ואינה תלויה בזריקות האחרות. ההסתברות שהשחקן יחטיא בשתי זריקות רצופות היא $0.16$.

מצאו את $p$, וחשבו את ההסתברות שמתוך $5$ זריקות יקלע השחקן לפחות $4$ פעמים.`,
        hints: [
          String.raw`ההסתברות להחטיא בזריקה אחת היא $1-p$, והזריקות בלתי תלויות: $(1-p)^2=0.16$.`,
          String.raw`מספר הקליעות ב-$5$ זריקות מתפלג בינומית: $P(X=k)=\binom5k p^k(1-p)^{5-k}$.`,
          String.raw`״לפחות $4$״ פירושו $4$ או $5$: $P(X\ge4)=P(X=4)+P(X=5)$.`,
        ],
        solutionSteps: [
          String.raw`ההסתברות להחטיא בזריקה היא $1-p$. הזריקות בלתי תלויות, לכן $(1-p)^2=0.16$.`,
          String.raw`$1-p=0.4$ (הסתברות אינה שלילית), ולכן $p=0.6$.`,
          String.raw`נסמן ב-$X$ את מספר הקליעות ב-$5$ זריקות; $X$ מתפלג בינומית עם $n=5$, $p=0.6$.`,
          String.raw`$P(X=4)=\binom54\cdot0.6^4\cdot0.4=5\cdot0.1296\cdot0.4=0.2592$.`,
          String.raw`$P(X=5)=0.6^5=0.07776$.`,
          String.raw`$P(X\ge4)=0.2592+0.07776=0.33696\approx0.337$.`,
        ],
        finalAnswer: String.raw`$p=0.6$; $P(X\ge4)=0.33696\approx0.337$.`,
        numericAnswer: 0.33696,
      },
      {
        id: '35581-1-203-c',
        label: 'ג',
        statement: String.raw`במשולש $ABC$ נתון: $BC=10$ ס״מ, $\angle BAC=30^\circ$, $\angle ACB=45^\circ$ (ראו שרטוט).

חשבו את רדיוס המעגל החוסם את המשולש ואת שטח המשולש.`,
        hints: [
          String.raw`משפט הסינוסים: $\frac{BC}{\sin\angle BAC}=2R$.`,
          String.raw`מצאו את הזווית השלישית ואת אחת הצלעות האחרות בעזרת משפט הסינוסים, למשל $AB=2R\sin\angle ACB$.`,
          String.raw`שטח המשולש: $S=\frac12\cdot AB\cdot BC\cdot\sin\angle ABC$, כאשר $\angle ABC=105^\circ$.`,
        ],
        solutionSteps: [
          String.raw`משפט הסינוסים: $2R=\frac{BC}{\sin\angle BAC}=\frac{10}{\sin30^\circ}=20$, ולכן $R=10$ ס״מ.`,
          String.raw`$\angle ABC=180^\circ-30^\circ-45^\circ=105^\circ$.`,
          String.raw`$AB=2R\sin\angle ACB=20\sin45^\circ=10\sqrt2\approx14.14$ ס״מ.`,
          String.raw`$S=\frac12\cdot AB\cdot BC\cdot\sin\angle ABC=\frac12\cdot10\sqrt2\cdot10\cdot\sin105^\circ=50\sqrt2\,\sin105^\circ$.`,
          String.raw`$\sin105^\circ\approx0.9659$, ולכן $S\approx68.3$ סמ״ר. (ערך מדויק: $\sin105^\circ=\frac{\sqrt6+\sqrt2}{4}$, ולכן $S=25(\sqrt3+1)$.)`,
        ],
        finalAnswer: String.raw`$R=10$ ס״מ; $S=25(\sqrt3+1)\approx68.3$ סמ״ר.`,
        numericAnswer: 25 * (Math.sqrt(3) + 1),
      },
      {
        id: '35581-1-203-d',
        label: 'ד',
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{x^2+a}{x-1}$ ($a$ פרמטר). ידוע שלפונקציה יש נקודת קיצון שבה $x=3$.

מצאו את $a$, קבעו את סוג הקיצון, ומצאו את שיעור ה-$y$ של נקודת הקיצון.`,
        hints: [
          String.raw`בנקודת קיצון פנימית הנגזרת מתאפסת: $f'(3)=0$. גזרו לפי כלל המנה.`,
          String.raw`$f'(x)=\frac{2x(x-1)-(x^2+a)}{(x-1)^2}=\frac{x^2-2x-a}{(x-1)^2}$.`,
          String.raw`את סוג הקיצון קובעים לפי סימן הנגזרת משני צדי $x=3$; המכנה $(x-1)^2$ חיובי, לכן מספיק לבדוק את סימן המונה.`,
        ],
        solutionSteps: [
          String.raw`תחום ההגדרה: $x\ne1$. נגזרת לפי כלל המנה: $f'(x)=\frac{2x(x-1)-(x^2+a)\cdot1}{(x-1)^2}=\frac{x^2-2x-a}{(x-1)^2}$.`,
          String.raw`בנקודת הקיצון $f'(3)=0$: $9-6-a=0$, ולכן $a=3$.`,
          String.raw`עבור $a=3$: $f'(x)=\frac{x^2-2x-3}{(x-1)^2}=\frac{(x-3)(x+1)}{(x-1)^2}$.`,
          String.raw`המכנה חיובי לכל $x\ne1$. עבור $1<x<3$ המונה שלילי ($f'(2)=-3<0$) – הפונקציה יורדת; עבור $x>3$ המונה חיובי ($f'(4)=\frac59>0$) – הפונקציה עולה. לכן ב-$x=3$ יש מינימום.`,
          String.raw`$f(3)=\frac{9+3}{3-1}=6$, כלומר נקודת המינימום היא $(3,6)$.`,
        ],
        finalAnswer: String.raw`$a=3$; נקודת מינימום $(3,6)$, כלומר $y=6$.`,
        numericAnswer: 6,
      },
    ],
  },
  {
    id: '35581-1-204',
    questionnaire: '35581',
    slot: 1,
    format: 'short-questions',
    title: 'שאלות קצרות – סט 4: כלל נסיגה, דמיון משולשים, משיק לפונקציית שורש, אחוזים',
    topicId: 'sequences',
    subtopicIds: ['seq-general', 'seq-geometric', 'geo-bisector-similarity', 'geo-similar-altitudes-areas', 'diff-rules', 'diff-tangent-on-graph', 'word-percentages'],
    difficulty: 2,
    estimatedMinutes: 28,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <title>שרטוט לסעיף ב</title>
  <polygon points="130.0,26.0 40.0,200.0 285.0,200.0" />
  <line x1="76.0" y1="130.4" x2="223.0" y2="130.4" stroke-width="1.5" />
  <line x1="40.0" y1="200.0" x2="223.0" y2="130.4" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="125.0" y="18.0">A</text>
    <text x="23.0" y="208.0">B</text>
    <text x="291.0" y="208.0">C</text>
    <text x="58.0" y="134.4">D</text>
    <text x="231.0" y="134.4">E</text>
    <text x="87.0" y="80.2" font-size="13">6</text>
    <text x="42.0" y="169.2" font-size="13">4</text>
    <text x="160.0" y="234.0" font-size="12" text-anchor="middle">שרטוט לסעיף ב</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-1-204-a',
        label: 'א',
        statement: String.raw`הסדרה $a_n$ מוגדרת על ידי כלל הנסיגה $a_{n+1}=2a_n-3$, $a_1=5$. מגדירים סדרה חדשה: $b_n=a_n-3$.

הוכיחו שהסדרה $b_n$ היא סדרה הנדסית, וחשבו את סכום $8$ האיברים הראשונים של הסדרה $a_n$.`,
        hints: [
          String.raw`כדי להוכיח שסדרה היא הנדסית, הראו שהמנה $\frac{b_{n+1}}{b_n}$ קבועה: הציבו $b_{n+1}=a_{n+1}-3$ והשתמשו בכלל הנסיגה.`,
          String.raw`$b_1=a_1-3=2$ והמנה $2$, לכן $b_n=2^n$ ו-$a_n=2^n+3$.`,
          String.raw`$a_1+\dots+a_8=(b_1+\dots+b_8)+8\cdot3$.`,
        ],
        solutionSteps: [
          String.raw`$b_{n+1}=a_{n+1}-3=(2a_n-3)-3=2a_n-6=2(a_n-3)=2b_n$.`,
          String.raw`$b_1=a_1-3=2\ne0$, ולכן כל איברי $b_n$ שונים מאפס ו-$\frac{b_{n+1}}{b_n}=2$ לכל $n$: הסדרה $b_n$ הנדסית, איברה הראשון $2$ ומנתה $2$.`,
          String.raw`$b_n=2\cdot2^{n-1}=2^n$, ולכן $a_n=b_n+3=2^n+3$.`,
          String.raw`סכום $8$ האיברים הראשונים של $b_n$: $\frac{2(2^8-1)}{2-1}=510$.`,
          String.raw`$a_1+a_2+\dots+a_8=(b_1+\dots+b_8)+8\cdot3=510+24=534$.`,
        ],
        finalAnswer: String.raw`$b_n$ הנדסית עם מנה $2$ ($b_n=2^n$, $a_n=2^n+3$); $a_1+\dots+a_8=534$.`,
        numericAnswer: 534,
      },
      {
        id: '35581-1-204-b',
        label: 'ב',
        statement: String.raw`במשולש $ABC$ הנקודה $D$ נמצאת על הצלע $AB$ והנקודה $E$ נמצאת על הצלע $AC$, כך ש-$DE\parallel BC$ (ראו שרטוט). נתון: $AD=6$ ס״מ, $DB=4$ ס״מ, ושטח המשולש $ADE$ הוא $27$ סמ״ר.

חשבו את שטח המשולש $ABC$ ואת שטח המשולש $BEC$. נמקו.`,
        hints: [
          String.raw`$DE\parallel BC$, לכן $\triangle ADE\sim\triangle ABC$. מהו יחס הדמיון?`,
          String.raw`יחס השטחים של משולשים דומים שווה לריבוע יחס הדמיון: $\frac{S_{ADE}}{S_{ABC}}=\left(\frac{AD}{AB}\right)^2$.`,
          String.raw`למשולשים $ADE$ ו-$ABE$ גובה משותף מהקודקוד $E$ לישר $AB$, ולכן יחס שטחיהם שווה ליחס הבסיסים $AD:AB$. לבסוף $S_{BEC}=S_{ABC}-S_{ABE}$.`,
        ],
        solutionSteps: [
          String.raw`$DE\parallel BC$, לכן $\angle ADE=\angle ABC$ (זוויות מתאימות בין ישרים מקבילים), והזווית $A$ משותפת. מכאן $\triangle ADE\sim\triangle ABC$ (ז.ז.).`,
          String.raw`יחס הדמיון: $\frac{AD}{AB}=\frac{6}{6+4}=\frac35$.`,
          String.raw`יחס השטחים של משולשים דומים שווה לריבוע יחס הדמיון: $\frac{S_{ADE}}{S_{ABC}}=\left(\frac35\right)^2=\frac{9}{25}$, ולכן $S_{ABC}=27\cdot\frac{25}{9}=75$ סמ״ר.`,
          String.raw`למשולשים $ADE$ ו-$ABE$ אותו גובה מהקודקוד $E$ לישר $AB$, ולכן $\frac{S_{ADE}}{S_{ABE}}=\frac{AD}{AB}=\frac35$, כלומר $S_{ABE}=27\cdot\frac53=45$ סמ״ר.`,
          String.raw`$S_{BEC}=S_{ABC}-S_{ABE}=75-45=30$ סמ״ר.`,
        ],
        finalAnswer: String.raw`$S_{ABC}=75$ סמ״ר; $S_{BEC}=30$ סמ״ר.`,
        numericAnswer: 30,
      },
      {
        id: '35581-1-204-c',
        label: 'ג',
        statement: String.raw`נתונה הפונקציה $f(x)=\sqrt{x^2+9}$. המשיק לגרף הפונקציה בנקודה $A$ הוא בעל שיפוע $0.8$.

מצאו את שיעורי הנקודה $A$ ואת משוואת המשיק, וחשבו את שטח המשולש שהמשיק יוצר עם הצירים.`,
        hints: [
          String.raw`גזרו לפי כלל ההרכבה: $f'(x)=\frac{2x}{2\sqrt{x^2+9}}=\frac{x}{\sqrt{x^2+9}}$.`,
          String.raw`פתרו $\frac{x}{\sqrt{x^2+9}}=0.8$: שימו לב ש-$x$ חייב להיות חיובי, ואז העלו את שני האגפים בריבוע.`,
          String.raw`מצאו את נקודות החיתוך של המשיק עם שני הצירים; שטח המשולש ישר-הזווית הוא מחצית מכפלת הניצבים (אורכים חיוביים).`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=\frac{1}{2\sqrt{x^2+9}}\cdot2x=\frac{x}{\sqrt{x^2+9}}$ (הפונקציה מוגדרת וגזירה לכל $x$).`,
          String.raw`שיפוע המשיק $0.8$: $\frac{x}{\sqrt{x^2+9}}=0.8$. אגף ימין חיובי והמכנה חיובי, לכן $x>0$.`,
          String.raw`$x=0.8\sqrt{x^2+9}$; העלאה בריבוע: $x^2=0.64(x^2+9)\Rightarrow0.36x^2=5.76\Rightarrow x^2=16$, ומכיוון ש-$x>0$: $x=4$.`,
          String.raw`$f(4)=\sqrt{16+9}=5$, כלומר $A(4,5)$. משוואת המשיק: $y-5=0.8(x-4)$, כלומר $y=0.8x+1.8$.`,
          String.raw`חיתוך עם ציר ה-$y$: $(0,1.8)$. חיתוך עם ציר ה-$x$: $0.8x+1.8=0\Rightarrow x=-2.25$, כלומר $(-2.25,0)$.`,
          String.raw`שטח המשולש שקודקודיו $(0,0)$, $(-2.25,0)$, $(0,1.8)$: $S=\frac{2.25\cdot1.8}{2}=2.025$.`,
        ],
        finalAnswer: String.raw`$A(4,5)$; המשיק $y=0.8x+1.8$; שטח המשולש $2.025$.`,
        numericAnswer: 2.025,
      },
      {
        id: '35581-1-204-d',
        label: 'ד',
        statement: String.raw`ביישוב גרו $5000$ תושבים. בשנה הראשונה גדל מספר התושבים ב-$p\%$, ובשנה השנייה הוא גדל ב-$(p+10)\%$ (ביחס למספר התושבים בסוף השנה הראשונה). בסוף השנה השנייה גרו ביישוב $6600$ תושבים.

מצאו את $p$.`,
        hints: [
          String.raw`גידול ב-$p\%$ הוא כפל ב-$1+\frac{p}{100}$. סמנו $t=\frac{p}{100}$ כדי לפשט.`,
          String.raw`$5000(1+t)(1.1+t)=6600$, כלומר $(1+t)(1.1+t)=1.32$.`,
          String.raw`פתחו סוגריים: $t^2+2.1t-0.22=0$; $\sqrt{5.29}=2.3$.`,
        ],
        solutionSteps: [
          String.raw`נסמן $t=\frac{p}{100}$. בסוף השנה הראשונה גרו ביישוב $5000(1+t)$ תושבים. בשנה השנייה הגידול הוא ב-$(p+10)\%$, כלומר כפל ב-$1+t+0.1=1.1+t$.`,
          String.raw`$5000(1+t)(1.1+t)=6600$, ולכן $(1+t)(1.1+t)=1.32$.`,
          String.raw`פתיחת סוגריים: $t^2+2.1t+1.1=1.32$, כלומר $t^2+2.1t-0.22=0$.`,
          String.raw`$t=\frac{-2.1\pm\sqrt{2.1^2+4\cdot0.22}}{2}=\frac{-2.1\pm\sqrt{5.29}}{2}=\frac{-2.1\pm2.3}{2}$, ולכן $t=0.1$ או $t=-2.2$.`,
          String.raw`מספר התושבים גדל, לכן $t>0$: $t=0.1$, כלומר $p=10$. בדיקה: $5000\cdot1.1=5500$, $5500\cdot1.2=6600$.`,
        ],
        finalAnswer: String.raw`$p=10$ (גידול של $10\%$ בשנה הראשונה ושל $20\%$ בשנה השנייה).`,
        numericAnswer: 10,
      },
    ],
  },
  {
    id: '35581-1-205',
    questionnaire: '35581',
    slot: 1,
    format: 'short-questions',
    title: 'שאלות קצרות – סט 5: הסתברות מותנית, אינדוקציה בכלל נסיגה, שטח בין גרפים טריגונומטריים, חוצה זווית',
    topicId: 'probability',
    subtopicIds: ['probability-basics', 'probability-conditional', 'induction-recursive', 'int-trig', 'int-definite-areas', 'geo-triangles-quadrilaterals', 'geo-bisector-similarity'],
    difficulty: 2,
    estimatedMinutes: 28,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <title>שרטוט לסעיף ד</title>
  <polygon points="60.0,45.0 60.0,195.0 260.0,195.0" />
  <line x1="60.0" y1="45.0" x2="135.0" y2="195.0" stroke-width="1.5" />
  <polyline points="60.0,186.0 69.0,186.0 69.0,195.0" stroke-width="1" />
  <path d="M 60.0,71.0 A 26 26 0 0 0 71.6,68.3" stroke-width="1.2" />
  <path d="M 73.9,72.7 A 31 31 0 0 0 84.8,63.6" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="54.0" y="37.0">A</text>
    <text x="266.0" y="201.0">B</text>
    <text x="43.0" y="201.0">C</text>
    <text x="130.0" y="213.0">D</text>
    <text x="44.0" y="124.0" font-size="13">6</text>
    <text x="160.0" y="234.0" font-size="12" text-anchor="middle">שרטוט לסעיף ד</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-1-205-a',
        label: 'א',
        statement: String.raw`בסקר שנערך בעיר נמצא: $40\%$ מהתושבים קוראים עיתון יומי. מבין קוראי העיתון, $75\%$ צופים במהדורת החדשות בטלוויזיה. מבין הצופים במהדורת החדשות, $60\%$ קוראים עיתון יומי. בוחרים באקראי תושב של העיר.

חשבו את ההסתברות שהתושב צופה במהדורת החדשות, ואת ההסתברות שהוא אינו קורא עיתון יומי וגם אינו צופה במהדורת החדשות.`,
        hints: [
          String.raw`סמנו $A$ – קורא עיתון, $B$ – צופה בחדשות. הנתונים: $P(A)=0.4$, $P(B\mid A)=0.75$, $P(A\mid B)=0.6$.`,
          String.raw`$P(A\cap B)=P(A)\cdot P(B\mid A)$, ומצד שני $P(A\cap B)=P(B)\cdot P(A\mid B)$.`,
          String.raw`מלאו טבלה דו-ממדית, או השתמשו ב-$P(\bar A\cap\bar B)=1-P(A\cup B)$.`,
        ],
        solutionSteps: [
          String.raw`נסמן: $A$ – התושב קורא עיתון יומי, $B$ – התושב צופה במהדורת החדשות. נתון: $P(A)=0.4$, $P(B\mid A)=0.75$, $P(A\mid B)=0.6$.`,
          String.raw`$P(A\cap B)=P(A)\cdot P(B\mid A)=0.4\cdot0.75=0.3$.`,
          String.raw`$P(A\mid B)=\frac{P(A\cap B)}{P(B)}$, ולכן $P(B)=\frac{0.3}{0.6}=0.5$.`,
          String.raw`$P(A\cup B)=P(A)+P(B)-P(A\cap B)=0.4+0.5-0.3=0.6$.`,
          String.raw`$P(\bar A\cap\bar B)=1-P(A\cup B)=1-0.6=0.4$.`,
        ],
        finalAnswer: String.raw`$P(B)=0.5$; $P(\bar A\cap\bar B)=0.4$.`,
        numericAnswer: 0.4,
      },
      {
        id: '35581-1-205-b',
        label: 'ב',
        statement: String.raw`הסדרה $a_n$ מוגדרת על ידי כלל הנסיגה $a_{n+1}=\frac{a_n}{1+3a_n}$, $a_1=2$.

הוכיחו באינדוקציה מתמטית כי לכל $n$ טבעי $a_n=\frac{2}{6n-5}$, ומצאו את מקומו בסדרה של האיבר השווה ל-$\frac{2}{55}$.`,
        hints: [
          String.raw`בדקו עבור $n=1$, ואז הניחו ש-$a_k=\frac{2}{6k-5}$ והציבו בכלל הנסיגה כדי לחשב את $a_{k+1}$.`,
          String.raw`$1+3\cdot\frac{2}{6k-5}=\frac{6k-5+6}{6k-5}=\frac{6k+1}{6k-5}$; צריך להגיע ל-$\frac{2}{6(k+1)-5}=\frac{2}{6k+1}$.`,
          String.raw`לחלק השני: פתרו $\frac{2}{6n-5}=\frac{2}{55}$.`,
        ],
        solutionSteps: [
          String.raw`בדיקה עבור $n=1$: $\frac{2}{6\cdot1-5}=2=a_1$. הטענה נכונה עבור $n=1$.`,
          String.raw`הנחת האינדוקציה: נניח שעבור $n=k$ ($k$ טבעי) מתקיים $a_k=\frac{2}{6k-5}$. צריך להוכיח: $a_{k+1}=\frac{2}{6(k+1)-5}=\frac{2}{6k+1}$.`,
          String.raw`לפי כלל הנסיגה והנחת האינדוקציה: $a_{k+1}=\frac{a_k}{1+3a_k}=\frac{\frac{2}{6k-5}}{1+\frac{6}{6k-5}}$.`,
          String.raw`$1+\frac{6}{6k-5}=\frac{6k+1}{6k-5}$, ולכן $a_{k+1}=\frac{2}{6k-5}\cdot\frac{6k-5}{6k+1}=\frac{2}{6k+1}$ (עבור $k$ טבעי $6k-5>0$, כך שכל המכנים שונים מאפס).`,
          String.raw`הטענה נכונה עבור $n=1$, ומנכונותה עבור $n=k$ נובעת נכונותה עבור $n=k+1$; לכן, לפי עקרון האינדוקציה המתמטית, $a_n=\frac{2}{6n-5}$ לכל $n$ טבעי.`,
          String.raw`$\frac{2}{6n-5}=\frac{2}{55}\Rightarrow6n-5=55\Rightarrow n=10$. האיבר $\frac{2}{55}$ הוא האיבר העשירי בסדרה.`,
        ],
        finalAnswer: String.raw`הנוסחה הוכחה באינדוקציה ($a_{k+1}=\frac{2}{6k-5}\cdot\frac{6k-5}{6k+1}=\frac{2}{6k+1}$); האיבר $\frac{2}{55}$ נמצא במקום $n=10$.`,
        numericAnswer: 10,
      },
      {
        id: '35581-1-205-c',
        label: 'ג',
        statement: String.raw`נתונות הפונקציות $f(x)=\sin2x$ ו-$g(x)=\sin x$ בתחום $0\le x\le\frac{\pi}{2}$.

מצאו את שיעורי ה-$x$ של נקודות החיתוך של שני הגרפים בתחום הנתון, וחשבו את השטח המוגבל בין שני הגרפים (בין שתי נקודות החיתוך).`,
        hints: [
          String.raw`פתרו $\sin2x=\sin x$ בעזרת הזהות $\sin2x=2\sin x\cos x$ והוצאת גורם משותף.`,
          String.raw`נקודות החיתוך בתחום: $x=0$ ו-$x=\frac{\pi}{3}$. בדקו איזה גרף נמצא למעלה ביניהן (למשל ב-$x=\frac{\pi}{6}$).`,
          String.raw`$\int\sin2x\,dx=-\frac12\cos2x+C$, $\int\sin x\,dx=-\cos x+C$.`,
        ],
        solutionSteps: [
          String.raw`$\sin2x=\sin x\Rightarrow2\sin x\cos x-\sin x=0\Rightarrow\sin x(2\cos x-1)=0$.`,
          String.raw`בתחום $0\le x\le\frac{\pi}{2}$: $\sin x=0$ נותן $x=0$, ו-$\cos x=\frac12$ נותן $x=\frac{\pi}{3}$. אלה נקודות החיתוך.`,
          String.raw`בין $0$ ל-$\frac{\pi}{3}$ הגרף של $f$ נמצא מעל הגרף של $g$: למשל $f\left(\frac{\pi}{6}\right)=\frac{\sqrt3}{2}>g\left(\frac{\pi}{6}\right)=\frac12$.`,
          String.raw`$S=\int_0^{\pi/3}(\sin2x-\sin x)\,dx=\left[-\frac12\cos2x+\cos x\right]_0^{\pi/3}$.`,
          String.raw`ב-$x=\frac{\pi}{3}$: $-\frac12\cos\frac{2\pi}{3}+\cos\frac{\pi}{3}=\frac14+\frac12=\frac34$. ב-$x=0$: $-\frac12+1=\frac12$.`,
          String.raw`$S=\frac34-\frac12=\frac14$.`,
        ],
        finalAnswer: String.raw`נקודות החיתוך: $x=0$ ו-$x=\frac{\pi}{3}$; השטח $\frac14$.`,
        numericAnswer: 0.25,
      },
      {
        id: '35581-1-205-d',
        label: 'ד',
        statement: String.raw`במשולש ישר-זווית $ABC$ ($\angle ACB=90^\circ$) נתון: $AC=6$ ס״מ, $BC=8$ ס״מ. $AD$ הוא חוצה הזווית $BAC$, והנקודה $D$ נמצאת על הצלע $BC$ (ראו שרטוט).

חשבו את אורך הקטע $CD$ ואת אורך חוצה הזווית $AD$. נמקו.`,
        hints: [
          String.raw`מצאו תחילה את היתר $AB$ בעזרת משפט פיתגורס.`,
          String.raw`משפט חוצה הזווית: חוצה זווית במשולש מחלק את הצלע שמול הזווית ביחס הצלעות הכולאות את הזווית: $\frac{CD}{DB}=\frac{AC}{AB}$.`,
          String.raw`המשולש $ACD$ ישר-זווית ($\angle ACD=90^\circ$) – משפט פיתגורס נותן את $AD$.`,
        ],
        solutionSteps: [
          String.raw`משפט פיתגורס במשולש $ABC$: $AB=\sqrt{AC^2+BC^2}=\sqrt{36+64}=10$ ס״מ.`,
          String.raw`$AD$ חוצה את הזווית $BAC$, ולכן לפי משפט חוצה הזווית $\frac{CD}{DB}=\frac{AC}{AB}=\frac{6}{10}=\frac35$.`,
          String.raw`נסמן $CD=3t$, $DB=5t$. $CD+DB=BC$, כלומר $8t=8$ ו-$t=1$; לכן $CD=3$ ס״מ ו-$DB=5$ ס״מ.`,
          String.raw`משפט פיתגורס במשולש ישר-הזווית $ACD$: $AD=\sqrt{AC^2+CD^2}=\sqrt{36+9}=\sqrt{45}=3\sqrt5\approx6.71$ ס״מ.`,
        ],
        finalAnswer: String.raw`$CD=3$ ס״מ; $AD=3\sqrt5\approx6.71$ ס״מ.`,
        numericAnswer: 3 * Math.sqrt(5),
      },
    ],
  },
  {
    id: '35581-1-206',
    questionnaire: '35581',
    slot: 1,
    format: 'short-questions',
    title: 'שאלות קצרות – סט 6: הספק, סדרה הנדסית, שטח מרובע, קיצון של פונקציה טריגונומטרית',
    topicId: 'word-problems',
    subtopicIds: ['word-work-rate', 'seq-geometric', 'trig-triangle-solutions', 'trig-equations', 'diff-rules', 'diff-investigation'],
    difficulty: 2,
    estimatedMinutes: 28,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <title>שרטוט לסעיף ג</title>
  <polygon points="135.0,193.0 210.0,193.0 235.0,19.8 72.5,84.7" />
  <line x1="210.0" y1="193.0" x2="72.5" y2="84.7" stroke-width="1.5" stroke-dasharray="5 3" />
  <path d="M 153.0,193.0 A 18 18 0 0 0 126.0,177.4" stroke-width="1.2" />
  <path d="M 212.7,28.7 A 24 24 0 0 0 231.6,43.5" stroke-width="1.2" />
  <line x1="217.3" y1="107.7" x2="227.2" y2="109.1" stroke-width="1.2" />
  <line x1="217.8" y1="103.7" x2="227.7" y2="105.1" stroke-width="1.2" />
  <line x1="157.5" y1="56.2" x2="153.8" y2="46.9" stroke-width="1.2" />
  <line x1="153.7" y1="57.7" x2="150.0" y2="48.4" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="127.0" y="211.0">A</text>
    <text x="216.0" y="205.0">B</text>
    <text x="239.0" y="13.8">C</text>
    <text x="54.5" y="86.7">D</text>
    <text x="139.0" y="169.3" font-size="13">120°</text>
    <text x="198.3" y="55.2" font-size="13">60°</text>
    <text x="168.5" y="210.0" font-size="13">6</text>
    <text x="81.8" y="146.9" font-size="13">10</text>
    <text x="160.0" y="234.0" font-size="12" text-anchor="middle">שרטוט לסעיף ג</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-1-206-a',
        label: 'א',
        statement: String.raw`שני צינורות ממלאים בריכה. הצינור הראשון לבדו ממלא את הבריכה הריקה בזמן הקצר ב-$5$ שעות מהזמן שנדרש לצינור השני לבדו. פתחו את שני הצינורות יחד כשהבריכה ריקה; כעבור $4$ שעות סגרו את הצינור הראשון, והצינור השני השלים לבדו את מילוי הבריכה ב-$5$ שעות נוספות.

בכמה שעות ממלא הצינור הראשון לבדו את הבריכה?`,
        hints: [
          String.raw`סמנו ב-$x$ את מספר השעות שבהן הצינור הראשון ממלא לבדו את הבריכה; ההספק שלו $\frac1x$ בריכה בשעה, וההספק של הצינור השני $\frac{1}{x+5}$.`,
          String.raw`הצינור הראשון פעל $4$ שעות והצינור השני פעל $4+5=9$ שעות, ויחד מילאו בריכה אחת שלמה: $\frac4x+\frac{9}{x+5}=1$.`,
          String.raw`כפלו ב-$x(x+5)$: מתקבל $x^2-8x-20=0$.`,
        ],
        solutionSteps: [
          String.raw`נסמן ב-$x$ את הזמן (בשעות) שבו הצינור הראשון ממלא לבדו את הבריכה, $x>0$. הצינור השני ממלא אותה לבדו ב-$x+5$ שעות. ההספקים: $\frac1x$ ו-$\frac{1}{x+5}$ בריכה בשעה.`,
          String.raw`הצינור הראשון פעל $4$ שעות ומילא $\frac4x$ מהבריכה; הצינור השני פעל $4+5=9$ שעות ומילא $\frac{9}{x+5}$ מהבריכה.`,
          String.raw`יחד מילאו בריכה שלמה: $\frac4x+\frac{9}{x+5}=1$.`,
          String.raw`כפל ב-$x(x+5)$: $4(x+5)+9x=x^2+5x$, כלומר $x^2-8x-20=0$.`,
          String.raw`$(x-10)(x+2)=0$, ולכן $x=10$ או $x=-2$. הזמן חיובי, לכן $x=10$.`,
          String.raw`בדיקה: הצינור השני ממלא את הבריכה ב-$15$ שעות, ואכן $\frac{4}{10}+\frac{9}{15}=0.4+0.6=1$.`,
        ],
        finalAnswer: String.raw`הצינור הראשון ממלא את הבריכה לבדו ב-$10$ שעות (והשני ב-$15$ שעות).`,
        numericAnswer: 10,
      },
      {
        id: '35581-1-206-b',
        label: 'ב',
        statement: String.raw`בסדרה הנדסית שכל איבריה חיוביים, סכום שני האיברים הראשונים הוא $20$, וסכום האיבר השלישי והאיבר הרביעי הוא $45$.

מצאו את מנת הסדרה ואת האיבר הראשון, וחשבו את סכום ששת האיברים הראשונים של הסדרה.`,
        hints: [
          String.raw`$a_3+a_4=a_1q^2+a_2q^2=q^2(a_1+a_2)$.`,
          String.raw`$q^2=\frac{45}{20}=\frac94$; כל האיברים חיוביים, לכן $q>0$.`,
          String.raw`$S_6=\frac{a_1(q^6-1)}{q-1}$, או: $S_6=(a_1+a_2)+(a_3+a_4)+(a_5+a_6)$, כשכל זוג גדול פי $q^2$ מקודמו.`,
        ],
        solutionSteps: [
          String.raw`$a_3+a_4=a_1q^2+a_1q^3=q^2(a_1+a_1q)=q^2(a_1+a_2)$, ולכן $45=20q^2$, כלומר $q^2=\frac94$.`,
          String.raw`כל האיברים חיוביים, לכן $q>0$: $q=\frac32$.`,
          String.raw`$a_1+a_1q=20\Rightarrow a_1\cdot\frac52=20\Rightarrow a_1=8$.`,
          String.raw`$S_6=\frac{a_1(q^6-1)}{q-1}=\frac{8\left(\left(\frac32\right)^6-1\right)}{\frac12}=16\left(\frac{729}{64}-1\right)=16\cdot\frac{665}{64}=\frac{665}{4}=166.25$.`,
          String.raw`בדיקה: $a_5+a_6=45\cdot\frac94=101.25$, ואכן $20+45+101.25=166.25$.`,
        ],
        finalAnswer: String.raw`$q=\frac32$, $a_1=8$; $S_6=166.25$.`,
        numericAnswer: 166.25,
      },
      {
        id: '35581-1-206-c',
        label: 'ג',
        statement: String.raw`במרובע הקמור $ABCD$ נתון: $AB=6$ ס״מ, $AD=10$ ס״מ, $\angle BAD=120^\circ$, $BC=CD$ ו-$\angle BCD=60^\circ$ (ראו שרטוט).

חשבו את אורך האלכסון $BD$ ואת שטח המרובע $ABCD$.`,
        hints: [
          String.raw`האלכסון $BD$ מחלק את המרובע לשני משולשים. במשולש $ABD$ ידועות שתי צלעות והזווית שביניהן – משפט הקוסינוסים.`,
          String.raw`במשולש $BCD$: $BC=CD$ וזווית הראש $60^\circ$. מה אפשר לומר על המשולש?`,
          String.raw`שטח כל משולש: $S=\frac12ab\sin\gamma$; $\sin120^\circ=\sin60^\circ=\frac{\sqrt3}{2}$.`,
        ],
        solutionSteps: [
          String.raw`משפט הקוסינוסים במשולש $ABD$: $BD^2=AB^2+AD^2-2\cdot AB\cdot AD\cdot\cos120^\circ=36+100-2\cdot6\cdot10\cdot\left(-\frac12\right)=196$, ולכן $BD=14$ ס״מ.`,
          String.raw`במשולש $BCD$: $BC=CD$, לכן זוויות הבסיס שוות: $\angle CBD=\angle CDB=\frac{180^\circ-60^\circ}{2}=60^\circ$. המשולש שווה-צלעות, ולכן $BC=CD=BD=14$ ס״מ.`,
          String.raw`$S_{ABD}=\frac12\cdot AB\cdot AD\cdot\sin120^\circ=\frac12\cdot6\cdot10\cdot\frac{\sqrt3}{2}=15\sqrt3$ סמ״ר.`,
          String.raw`$S_{BCD}=\frac12\cdot BC\cdot CD\cdot\sin60^\circ=\frac12\cdot14\cdot14\cdot\frac{\sqrt3}{2}=49\sqrt3$ סמ״ר.`,
          String.raw`$S_{ABCD}=S_{ABD}+S_{BCD}=15\sqrt3+49\sqrt3=64\sqrt3\approx110.85$ סמ״ר.`,
        ],
        finalAnswer: String.raw`$BD=14$ ס״מ; $S_{ABCD}=64\sqrt3\approx110.85$ סמ״ר.`,
        numericAnswer: 64 * Math.sqrt(3),
      },
      {
        id: '35581-1-206-d',
        label: 'ד',
        statement: String.raw`נתונה הפונקציה $f(x)=2\sin x+\sin2x$ בתחום $0\le x\le\pi$.

מצאו את שיעור ה-$x$ של נקודת המקסימום של הפונקציה בתחום, וחשבו את הערך הגדול ביותר שהפונקציה מקבלת בתחום.`,
        hints: [
          String.raw`$f'(x)=2\cos x+2\cos2x$. השתמשו בזהות $\cos2x=2\cos^2x-1$ כדי לקבל משוואה ריבועית ב-$\cos x$.`,
          String.raw`$2\cos^2x+\cos x-1=0$ מתפרקת ל-$(2\cos x-1)(\cos x+1)=0$.`,
          String.raw`השוו את ערך הפונקציה בנקודה שמצאתם לערכיה בקצות התחום, $f(0)$ ו-$f(\pi)$.`,
        ],
        solutionSteps: [
          String.raw`$f'(x)=2\cos x+2\cos2x$.`,
          String.raw`$f'(x)=0\Rightarrow\cos x+\cos2x=0\Rightarrow\cos x+2\cos^2x-1=0\Rightarrow(2\cos x-1)(\cos x+1)=0$.`,
          String.raw`בתחום $0\le x\le\pi$: $\cos x=\frac12$ נותן $x=\frac{\pi}{3}$, ו-$\cos x=-1$ נותן $x=\pi$ (קצה התחום).`,
          String.raw`סימן הנגזרת: $f'(x)=2(2\cos x-1)(\cos x+1)$, והגורם $\cos x+1$ אינו שלילי. עבור $0\le x<\frac{\pi}{3}$ מתקיים $\cos x>\frac12$ ולכן $f'(x)>0$ (עלייה); עבור $\frac{\pi}{3}<x<\pi$ מתקיים $\cos x<\frac12$ ולכן $f'(x)<0$ (ירידה). לכן ב-$x=\frac{\pi}{3}$ יש מקסימום.`,
          String.raw`$f\left(\frac{\pi}{3}\right)=2\sin\frac{\pi}{3}+\sin\frac{2\pi}{3}=\sqrt3+\frac{\sqrt3}{2}=\frac{3\sqrt3}{2}\approx2.598$.`,
          String.raw`בקצוות: $f(0)=0$, $f(\pi)=0$. לכן הערך הגדול ביותר בתחום הוא $\frac{3\sqrt3}{2}$.`,
        ],
        finalAnswer: String.raw`מקסימום ב-$x=\frac{\pi}{3}$; הערך הגדול ביותר $\frac{3\sqrt3}{2}\approx2.598$.`,
        numericAnswer: 1.5 * Math.sqrt(3),
      },
    ],
  },
  {
    id: '35581-1-207',
    questionnaire: '35581',
    slot: 1,
    format: 'short-questions',
    title: 'שאלות קצרות – סט 7: מערכת עם פרמטר, התפלגות בינומית, משיק וחותך, אינטגרל של פונקציה רציונלית',
    topicId: 'algebra',
    subtopicIds: ['alg-parameters', 'probability-binomial', 'geo-circle-angles', 'geo-circle-tangents', 'geo-cyclic-quadrilaterals', 'geo-circle-proportions', 'int-polynomial-rational', 'int-definite-areas'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <title>שרטוט לסעיף ג</title>
  <circle cx="222.0" cy="135.0" r="65.0" stroke-width="1.5" />
  <line x1="53.0" y1="135.0" x2="287.0" y2="135.0" />
  <line x1="53.0" y1="135.0" x2="240.2" y2="57.0" />
  <line x1="197.0" y1="75.0" x2="157.0" y2="135.0" stroke-width="1.5" />
  <line x1="197.0" y1="75.0" x2="287.0" y2="135.0" stroke-width="1.5" />
  <circle cx="222.0" cy="135.0" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="37.0" y="141.0">P</text>
    <text x="141.0" y="153.0">A</text>
    <text x="293.0" y="141.0">B</text>
    <text x="217.0" y="153.0">O</text>
    <text x="185.0" y="66.0">T</text>
    <text x="101.0" y="152.0" font-size="13">4</text>
    <text x="160.0" y="234.0" font-size="12" text-anchor="middle">שרטוט לסעיף ג</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-1-207-a',
        label: 'א',
        statement: String.raw`נתונה מערכת המשוואות ($m$ פרמטר):

$$
\begin{cases}mx+4y=m+2\\x+my=2\end{cases}
$$

מצאו עבור אילו ערכי $m$ יש למערכת פתרון יחיד, ומצאו את ערך $m$ שעבורו אין למערכת אף פתרון.`,
        hints: [
          String.raw`בטאו את $x$ מהמשוואה השנייה, $x=2-my$, והציבו בראשונה – מתקבלת משוואה ממעלה ראשונה ב-$y$ עם פרמטר.`,
          String.raw`מתקבל $(4-m^2)y=2-m$. למשוואה $ay=b$ יש פתרון יחיד כאשר $a\ne0$.`,
          String.raw`כאשר $a=0$: אם גם $b=0$ יש אינסוף פתרונות, ואם $b\ne0$ אין פתרון. בדקו בנפרד את $m=2$ ואת $m=-2$.`,
        ],
        solutionSteps: [
          String.raw`מהמשוואה השנייה: $x=2-my$. נציב בראשונה: $m(2-my)+4y=m+2$, כלומר $2m-m^2y+4y=m+2$.`,
          String.raw`$(4-m^2)y=2-m$, כלומר $(2-m)(2+m)y=2-m$.`,
          String.raw`אם $4-m^2\ne0$, כלומר $m\ne2$ וגם $m\ne-2$, אז $y=\frac{1}{2+m}$ ו-$x=2-\frac{m}{2+m}=\frac{m+4}{m+2}$ – פתרון יחיד.`,
          String.raw`עבור $m=2$ מתקבל $0\cdot y=0$ – נכון לכל $y$. שתי המשוואות הן $2x+4y=4$ ו-$x+2y=2$, כלומר אותו ישר: אינסוף פתרונות.`,
          String.raw`עבור $m=-2$ מתקבל $0\cdot y=4$ – אין פתרון. שתי המשוואות הן $-2x+4y=0$ ו-$x-2y=2$, כלומר שני ישרים מקבילים שונים.`,
        ],
        finalAnswer: String.raw`פתרון יחיד עבור $m\ne\pm2$; אין פתרון עבור $m=-2$ (ועבור $m=2$ יש אינסוף פתרונות).`,
        numericAnswer: -2,
      },
      {
        id: '35581-1-207-b',
        label: 'ב',
        statement: String.raw`במפעל מייצרים נורות. ההסתברות שנורה פגומה היא $0.2$, ללא תלות בנורות האחרות. הנורות נארזות בזוגות, ואריזה נקראת ״תקינה״ אם שתי הנורות שבה אינן פגומות.

חשבו את ההסתברות שאריזה שנבחרה באקראי היא תקינה, ואת ההסתברות שמתוך $4$ אריזות שנבחרו באקראי בדיוק $3$ תקינות.`,
        hints: [
          String.raw`נורה אינה פגומה בהסתברות $0.8$, והנורות בלתי תלויות: ההסתברות לאריזה תקינה היא $0.8^2$.`,
          String.raw`מספר האריזות התקינות מתוך $4$ מתפלג בינומית עם $n=4$ ו-$p=0.64$.`,
          String.raw`$P(X=3)=\binom43\cdot0.64^3\cdot0.36$.`,
        ],
        solutionSteps: [
          String.raw`ההסתברות שנורה אינה פגומה: $1-0.2=0.8$. הנורות בלתי תלויות, לכן ההסתברות ששתי הנורות באריזה אינן פגומות היא $0.8^2=0.64$.`,
          String.raw`נסמן ב-$X$ את מספר האריזות התקינות מתוך $4$. האריזות בלתי תלויות, ולכן $X$ מתפלג בינומית עם $n=4$, $p=0.64$.`,
          String.raw`$P(X=3)=\binom43\cdot0.64^3\cdot(1-0.64)=4\cdot0.262144\cdot0.36$.`,
          String.raw`$P(X=3)=0.37748736\approx0.377$.`,
        ],
        finalAnswer: String.raw`אריזה תקינה: $0.64$; בדיוק $3$ אריזות תקינות מתוך $4$: $\approx0.377$.`,
        numericAnswer: 0.37748736,
      },
      {
        id: '35581-1-207-c',
        label: 'ג',
        statement: String.raw`מנקודה $P$ שמחוץ למעגל שמרכזו $O$ יוצאים משיק למעגל, המשיק לו בנקודה $T$, וישר העובר דרך $O$ וחותך את המעגל בנקודות $A$ ו-$B$ ($A$ בין $P$ ל-$O$; ראו שרטוט). נתון: $PA=4$ ס״מ, ורדיוס המעגל $2.5$ ס״מ.

חשבו את אורך המשיק $PT$ ואת אורך המיתר $TA$. נמקו.`,
        hints: [
          String.raw`אם מנקודה מחוץ למעגל יוצאים משיק וחותך, ריבוע המשיק שווה למכפלת החותך בחלקו החיצוני: $PT^2=PA\cdot PB$.`,
          String.raw`הזווית בין המשיק $PT$ למיתר $TA$ שווה לזווית ההיקפית $\angle TBA$ הנשענת על המיתר – מכאן $\triangle PTA\sim\triangle PBT$, ולכן $\frac{TA}{BT}=\frac{PT}{PB}$.`,
          String.raw`$AB$ קוטר, לכן $\angle ATB=90^\circ$: סמנו $TA=2t$, $TB=3t$ והשתמשו במשפט פיתגורס במשולש $ATB$.`,
        ],
        solutionSteps: [
          String.raw`$AB$ קוטר: $AB=2\cdot2.5=5$ ס״מ, ולכן $PB=PA+AB=9$ ס״מ. לפי משפט המשיק והחותך: $PT^2=PA\cdot PB=4\cdot9=36$, כלומר $PT=6$ ס״מ.`,
          String.raw`$\angle PTA=\angle TBA$ (זווית בין משיק למיתר שווה לזווית ההיקפית הנשענת על המיתר), והזווית $P$ משותפת למשולשים $PTA$ ו-$PBT$. לכן $\triangle PTA\sim\triangle PBT$ (ז.ז.).`,
          String.raw`מהדמיון: $\frac{TA}{BT}=\frac{PT}{PB}=\frac69=\frac23$. נסמן $TA=2t$, $TB=3t$.`,
          String.raw`$AB$ קוטר, לכן הזווית ההיקפית הנשענת עליו ישרה: $\angle ATB=90^\circ$.`,
          String.raw`משפט פיתגורס במשולש $ATB$: $(2t)^2+(3t)^2=5^2\Rightarrow13t^2=25\Rightarrow t=\frac{5}{\sqrt{13}}$.`,
          String.raw`$TA=2t=\frac{10}{\sqrt{13}}=\frac{10\sqrt{13}}{13}\approx2.77$ ס״מ.`,
        ],
        finalAnswer: String.raw`$PT=6$ ס״מ; $TA=\frac{10\sqrt{13}}{13}\approx2.77$ ס״מ.`,
        numericAnswer: 10 / Math.sqrt(13),
      },
      {
        id: '35581-1-207-d',
        label: 'ד',
        statement: String.raw`נתונה הפונקציה $f(x)=\frac{4x}{(x^2+1)^2}$. השטח המוגבל על ידי גרף הפונקציה, ציר ה-$x$ והישר $x=a$ ($a>0$) שווה ל-$1.6$.

מצאו את $a$.`,
        hints: [
          String.raw`הפונקציה מתאפסת רק ב-$x=0$ וחיובית עבור $x>0$, לכן השטח הוא $\int_0^a f(x)\,dx$.`,
          String.raw`המונה $4x$ הוא פי $2$ מהנגזרת של $x^2+1$: האינטגרל מהצורה $\int\frac{c\cdot u'}{u^2}\,dx=-\frac{c}{u}+C$.`,
          String.raw`$\int\frac{4x}{(x^2+1)^2}\,dx=-\frac{2}{x^2+1}+C$. הציבו גבולות והשוו ל-$1.6$.`,
        ],
        solutionSteps: [
          String.raw`$f(x)=0$ רק כאשר $x=0$, ועבור $x>0$ הפונקציה חיובית (מונה חיובי ומכנה חיובי). לכן השטח הוא $S=\int_0^a\frac{4x}{(x^2+1)^2}\,dx$.`,
          String.raw`נסמן $u=x^2+1$, $u'=2x$: $\frac{4x}{(x^2+1)^2}=\frac{2u'}{u^2}$, ולכן פונקציה קדומה היא $F(x)=-\frac{2}{x^2+1}$. (בדיקה בגזירה: $F'(x)=\frac{2\cdot2x}{(x^2+1)^2}$.)`,
          String.raw`$S=F(a)-F(0)=-\frac{2}{a^2+1}+2$.`,
          String.raw`$2-\frac{2}{a^2+1}=1.6\Rightarrow\frac{2}{a^2+1}=0.4\Rightarrow a^2+1=5\Rightarrow a^2=4$.`,
          String.raw`$a>0$, לכן $a=2$.`,
        ],
        finalAnswer: String.raw`$a=2$.`,
        numericAnswer: 2,
      },
    ],
  },
  {
    id: '35581-1-208',
    questionnaire: '35581',
    slot: 1,
    format: 'short-questions',
    title: 'שאלות קצרות – סט 8: בעיית קיצון, סדרה אינסופית, משולש עם זווית כפולה, מאורעות בלתי תלויים',
    topicId: 'differential-calculus',
    subtopicIds: ['diff-graphical-extrema', 'seq-geometric', 'trig-identities', 'trig-triangle-solutions', 'probability-basics', 'probability-conditional'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <title>שרטוט לסעיף ג</title>
  <polygon points="75.3,34.3 55.0,195.0 257.5,195.0" />
  <path d="M 75.0,195.0 A 20 20 0 0 0 57.5,175.2" stroke-width="1.2" />
  <path d="M 235.0,175.2 A 30 30 0 0 0 227.5,195.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="70.3" y="26.3">A</text>
    <text x="38.0" y="203.0">B</text>
    <text x="263.5" y="203.0">C</text>
    <text x="72.5" y="177.5" font-size="13" font-style="italic">2γ</text>
    <text x="212.3" y="183.4" font-size="13" font-style="italic">γ</text>
    <text x="49.1" y="118.6" font-size="13">6</text>
    <text x="174.4" y="110.6" font-size="13">9</text>
    <text x="160.0" y="234.0" font-size="12" text-anchor="middle">שרטוט לסעיף ג</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-1-208-a',
        label: 'א',
        statement: String.raw`נתונה הפרבולה $f(x)=12-x^2$. $A$ ו-$B$ הן שתי נקודות על הפרבולה, מעל ציר ה-$x$, בעלות אותו שיעור $y$ ($A$ ברביע הראשון, $B$ ברביע השני). $O$ היא ראשית הצירים.

מצאו את השטח הגדול ביותר האפשרי של המשולש $AOB$.`,
        hints: [
          String.raw`סמנו $A(t,12-t^2)$ עם $0<t<\sqrt{12}$; מהסימטריה של הפרבולה $B(-t,12-t^2)$.`,
          String.raw`במשולש $AOB$ הצלע $AB$ מקבילה לציר ה-$x$ ואורכה $2t$, והגובה אליה מ-$O$ הוא $12-t^2$: $S(t)=t(12-t^2)$.`,
          String.raw`גזרו את $S(t)=12t-t^3$, השוו לאפס וודאו שמדובר במקסימום.`,
        ],
        solutionSteps: [
          String.raw`נסמן $A(t,12-t^2)$, $t>0$. הנקודה מעל ציר ה-$x$, לכן $12-t^2>0$, כלומר $0<t<\sqrt{12}$. הפרבולה סימטרית ביחס לציר ה-$y$, ולכן $B(-t,12-t^2)$.`,
          String.raw`$AB$ מקביל לציר ה-$x$ ואורכו $2t$; הגובה מ-$O$ לישר $AB$ הוא $12-t^2$. לכן $S(t)=\frac{2t(12-t^2)}{2}=12t-t^3$.`,
          String.raw`$S'(t)=12-3t^2$; $S'(t)=0\Rightarrow t^2=4\Rightarrow t=2$ (בתחום $0<t<\sqrt{12}$).`,
          String.raw`$S''(t)=-6t$, $S''(2)=-12<0$ – מקסימום. זו נקודת הקיצון היחידה בתחום, ולכן זהו המקסימום המוחלט.`,
          String.raw`$S(2)=12\cdot2-2^3=16$; הנקודות הן $A(2,8)$, $B(-2,8)$.`,
        ],
        finalAnswer: String.raw`השטח המקסימלי הוא $16$ (מתקבל עבור $A(2,8)$, $B(-2,8)$).`,
        numericAnswer: 16,
      },
      {
        id: '35581-1-208-b',
        label: 'ב',
        statement: String.raw`$a_n$ היא סדרה הנדסית אינסופית מתכנסת שאיברה הראשון $6$ וסכומה $12$. מגדירים סדרה חדשה: $b_n=a_n\cdot a_{n+1}$.

מצאו את מנת הסדרה $a_n$, הוכיחו שהסדרה $b_n$ הנדסית, וחשבו את סכום כל איברי הסדרה $b_n$.`,
        hints: [
          String.raw`$\frac{a_1}{1-q}=12$ עם $a_1=6$ נותן את $q$.`,
          String.raw`$\frac{b_{n+1}}{b_n}=\frac{a_{n+1}\cdot a_{n+2}}{a_n\cdot a_{n+1}}=\frac{a_{n+2}}{a_n}$.`,
          String.raw`$b_1=a_1\cdot a_2$ ומנת הסדרה $b_n$ היא $q^2$; השתמשו בנוסחת הסכום של סדרה הנדסית אינסופית.`,
        ],
        solutionSteps: [
          String.raw`$\frac{a_1}{1-q}=12\Rightarrow\frac{6}{1-q}=12\Rightarrow1-q=\frac12\Rightarrow q=\frac12$.`,
          String.raw`$\frac{b_{n+1}}{b_n}=\frac{a_{n+1}\cdot a_{n+2}}{a_n\cdot a_{n+1}}=\frac{a_{n+2}}{a_n}=q^2=\frac14$ לכל $n$ (איברי $a_n$ שונים מאפס). המנה קבועה, ולכן $b_n$ סדרה הנדסית שמנתה $\frac14$.`,
          String.raw`$b_1=a_1\cdot a_2=6\cdot3=18$.`,
          String.raw`$\frac14<1$, לכן הסדרה $b_n$ מתכנסת וסכומה $\frac{b_1}{1-\frac14}=\frac{18}{\frac34}=24$.`,
        ],
        finalAnswer: String.raw`$q=\frac12$; $b_n$ הנדסית עם מנה $\frac14$ ו-$b_1=18$; סכומה $24$.`,
        numericAnswer: 24,
      },
      {
        id: '35581-1-208-c',
        label: 'ג',
        statement: String.raw`במשולש $ABC$ נתון: $AB=6$ ס״מ, $AC=9$ ס״מ, ו-$\angle ABC=2\angle ACB$ (ראו שרטוט). נסמן $\angle ACB=\gamma$.

מצאו את $\cos\gamma$, וחשבו את אורך הצלע $BC$.`,
        hints: [
          String.raw`משפט הסינוסים: $\frac{AC}{\sin\angle ABC}=\frac{AB}{\sin\angle ACB}$, כלומר $\frac{9}{\sin2\gamma}=\frac{6}{\sin\gamma}$.`,
          String.raw`השתמשו בזהות $\sin2\gamma=2\sin\gamma\cos\gamma$ וצמצמו ב-$\sin\gamma\ne0$.`,
          String.raw`את $BC$ אפשר למצוא ממשפט הקוסינוסים לזווית $\gamma$: $AB^2=AC^2+BC^2-2\cdot AC\cdot BC\cdot\cos\gamma$. מתקבלים שני פתרונות – בדקו איזה מהם מתאים לנתון $\angle ABC=2\gamma$.`,
        ],
        solutionSteps: [
          String.raw`משפט הסינוסים במשולש $ABC$: $\frac{AC}{\sin\angle ABC}=\frac{AB}{\sin\angle ACB}$, כלומר $\frac{9}{\sin2\gamma}=\frac{6}{\sin\gamma}$.`,
          String.raw`$9\sin\gamma=6\sin2\gamma=12\sin\gamma\cos\gamma$. $\sin\gamma\ne0$ (זווית במשולש), ולכן $\cos\gamma=\frac{9}{12}=\frac34$.`,
          String.raw`נסמן $BC=x$. משפט הקוסינוסים לזווית $\gamma$: $AB^2=AC^2+BC^2-2\cdot AC\cdot BC\cdot\cos\gamma$, כלומר $36=81+x^2-2\cdot9\cdot x\cdot\frac34$.`,
          String.raw`$x^2-13.5x+45=0\Rightarrow x=\frac{13.5\pm\sqrt{182.25-180}}{2}=\frac{13.5\pm1.5}{2}$, ולכן $x=7.5$ או $x=6$.`,
          String.raw`נבדוק איזה פתרון מקיים $\angle ABC=2\gamma$. לפי הזהות $\cos2\gamma=2\cos^2\gamma-1=2\cdot\frac{9}{16}-1=\frac18$, ולפי משפט הקוסינוסים $\cos\angle ABC=\frac{AB^2+BC^2-AC^2}{2\cdot AB\cdot BC}$.`,
          String.raw`עבור $x=7.5$: $\cos\angle ABC=\frac{36+56.25-81}{2\cdot6\cdot7.5}=\frac{11.25}{90}=\frac18$ – מתאים. עבור $x=6$: $\cos\angle ABC=\frac{36+36-81}{72}=-\frac18$ – לא מתאים. לכן $BC=7.5$ ס״מ.`,
        ],
        finalAnswer: String.raw`$\cos\gamma=\frac34$; $BC=7.5$ ס״מ.`,
        numericAnswer: 7.5,
      },
      {
        id: '35581-1-208-d',
        label: 'ד',
        statement: String.raw`במערכת אזעקה שני חיישנים הפועלים באופן בלתי תלוי זה בזה. כאשר יש פריצה, החיישן הראשון מזהה אותה בהסתברות $0.7$, וההסתברות שלפחות אחד משני החיישנים מזהה אותה היא $0.94$.

מצאו את ההסתברות שהחיישן השני מזהה פריצה. ידוע שבפריצה מסוימת בדיוק אחד מהחיישנים זיהה אותה – חשבו את ההסתברות שזה היה החיישן הראשון.`,
        hints: [
          String.raw`״לפחות אחד מזהה״ הוא המאורע המשלים ל״אף אחד אינו מזהה״. החיישנים בלתי תלויים, לכן ההסתברות שאף אחד אינו מזהה היא $0.3\cdot(1-p)$, כאשר $p$ ההסתברות שהחיישן השני מזהה.`,
          String.raw`״בדיוק אחד מזהה״: הראשון מזהה והשני לא, או השני מזהה והראשון לא.`,
          String.raw`הסתברות מותנית: ההסתברות ש״הראשון מזהה והשני לא״ חלקי ההסתברות ש״בדיוק אחד מזהה״.`,
        ],
        solutionSteps: [
          String.raw`נסמן: $A$ – החיישן הראשון מזהה, $B$ – החיישן השני מזהה, $P(B)=p$. המאורעות בלתי תלויים, לכן ההסתברות שאף חיישן אינו מזהה היא $P(\bar A\cap\bar B)=0.3(1-p)$.`,
          String.raw`$P(A\cup B)=1-P(\bar A\cap\bar B)$: $0.94=1-0.3(1-p)\Rightarrow0.3(1-p)=0.06\Rightarrow1-p=0.2\Rightarrow p=0.8$.`,
          String.raw`ההסתברות שרק החיישן הראשון מזהה: $P(A\cap\bar B)=0.7\cdot0.2=0.14$. ההסתברות שרק החיישן השני מזהה: $P(\bar A\cap B)=0.3\cdot0.8=0.24$.`,
          String.raw`ההסתברות שבדיוק חיישן אחד מזהה: $0.14+0.24=0.38$.`,
          String.raw`ההסתברות המותנית שזה היה החיישן הראשון: $\frac{0.14}{0.38}=\frac{7}{19}\approx0.368$.`,
        ],
        finalAnswer: String.raw`$P(B)=0.8$; ההסתברות המבוקשת $\frac{7}{19}\approx0.368$.`,
        numericAnswer: 7 / 19,
      },
    ],
  },
];
