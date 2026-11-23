import type { Exercise, ExerciseSet } from './types';

/**
 * סט: גדילה ודעיכה (שאלון 35582, פרק ב — עשוי להופיע במקום אחת משאלות החדו"א).
 * 1–4 צעד אחד · 5–8 שלושה סעיפים · 9–12 שאלות בסגנון בגרות.
 */

const T = 'growth-decay';
const G = ['growth-all'];
const GL = ['growth-all', 'log-functions'];
const GEL = ['growth-all', 'exp-functions', 'log-functions'];

const e1: Exercise = {
  id: 'grd-1',
  level: 1,
  topicId: T,
  subtopicIds: G,
  intro: String.raw`בעיירה מתגוררים היום $20{,}000$ תושבים, ומספר התושבים בה גדל ב-$3\%$ בכל שנה. הגרף מתאר את מספר התושבים (באלפים) בחמש השנים הקרובות.`,
  diagram: { kind: 'plot', xRange: [-0.5, 5], yRange: [0, 28], functions: [{ expr: '20*1.03^x', domain: [0, 5] }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`כמה תושבים יהיו בעיירה בעוד $10$ שנים? עגלו למספר שלם.`,
      hints: [
        String.raw`גידול באחוז קבוע פירושו שבכל שנה מספר התושבים מוכפל באותו מספר $q$ (מקדם הגדילה). מהו $q$ כשהגידול הוא $3\%$?`,
        String.raw`$q=1+\dfrac{3}{100}=1.03$, והמודל הוא $M_t=M_0\cdot q^t$.`,
        String.raw`הציבו $M_0=20{,}000$, $q=1.03$ ו-$t=10$.`,
      ],
      check: { kind: 'numeric', answer: 26878.32759, tol: 1, verify: '20000*(1+3/100)^10' },
      short: String.raw`$q=1.03$, ולכן $M_{10}=20{,}000\cdot1.03^{10}\approx26{,}878$ תושבים.`,
      full: [
        String.raw`גידול של $3\%$ בשנה: בכל שנה מספר התושבים הוא $103\%$ ממספרם בשנה הקודמת, כלומר מקדם הגדילה הוא $q=1+\dfrac{3}{100}=1.03$.`,
        String.raw`המודל: $M_t=M_0\cdot q^t=20{,}000\cdot1.03^t$, כאשר $t$ בשנים.`,
        String.raw`$M_{10}=20{,}000\cdot1.03^{10}\approx20{,}000\cdot1.34392\approx26{,}878.3$, כלומר כ-$26{,}878$ תושבים.`,
        String.raw`שימו לב: זה יותר מ-$20{,}000+10\cdot600=26{,}000$, כי בכל שנה ה-$3\%$ מחושבים מכמות גדולה יותר.`,
      ],
    },
  ],
};

const e2: Exercise = {
  id: 'grd-2',
  level: 1,
  topicId: T,
  subtopicIds: G,
  intro: String.raw`לחולה ניתנה תרופה, וכמות התרופה בדמו קטנה בכל שעה באחוז קבוע. כמות התרופה בדם (במ"ג) נמדדה ארבע פעמים, במרווחים של שעה בין מדידה למדידה: $200$, $170$, $144.5$, $122.825$ (ראו שרטוט).`,
  diagram: { kind: 'seq', terms: [200, 170, 144.5, 122.825], style: 'bars' },
  sections: [
    {
      label: 'א',
      prompt: String.raw`בכמה אחוזים קטנה כמות התרופה בדם בכל שעה?`,
      hints: [
        String.raw`בדעיכה מעריכית המנה בין שתי מדידות עוקבות קבועה. חשבו אותה.`,
        String.raw`$q=\dfrac{170}{200}=0.85$. איזה אחוז מהכמות נשאר בכל שעה, ואיזה אחוז נעלם?`,
      ],
      check: { kind: 'numeric', answer: 15, verify: '(1-170/200)*100' },
      short: String.raw`$q=\dfrac{170}{200}=0.85$, כלומר בכל שעה נשארים $85\%$ מהכמות והיא קטנה ב-$15\%$.`,
      full: [
        String.raw`מקדם הדעיכה הוא המנה בין מדידות עוקבות: $q=\dfrac{170}{200}=0.85$.`,
        String.raw`בדיקה במדידות האחרות: $\dfrac{144.5}{170}=0.85$ ו-$\dfrac{122.825}{144.5}=0.85$. המנה אכן קבועה.`,
        String.raw`$q=1-\dfrac{p}{100}$, ולכן $\dfrac{p}{100}=1-0.85=0.15$: הכמות קטנה ב-$15\%$ בכל שעה.`,
        String.raw`שימו לב: ההפרשים אינם קבועים ($30$, $25.5$, $21.675$); מה שקבוע הוא היחס.`,
      ],
    },
  ],
};

const e3: Exercise = {
  id: 'grd-3',
  level: 1,
  topicId: T,
  subtopicIds: GL,
  intro: String.raw`ערכה של מכונית (באלפי שקלים), $t$ שנים אחרי שנקנתה, מתואר על ידי $V(t)=160\cdot0.88^t$. הגרף מתאר את ערך המכונית בשלוש השנים הראשונות.`,
  diagram: { kind: 'plot', xRange: [-0.3, 3], yRange: [0, 180], functions: [{ expr: '160*0.88^x', domain: [0, 3], label: 'V(t)' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`כעבור כמה שנים מיום הקנייה ירד ערך המכונית ל-$100$ אלף שקלים? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`כתבו משוואה, $160\cdot0.88^t=100$, ובודדו את $0.88^t$.`,
        String.raw`$0.88^t=0.625$. הנעלם נמצא במעריך, ולכן מחלצים אותו בעזרת לוגריתם: $t=\dfrac{\ln0.625}{\ln0.88}$.`,
      ],
      check: { kind: 'numeric', answer: 3.676689613, tol: 0.01, verify: 'log(100/160)/log(0.88)' },
      short: String.raw`$0.88^t=\dfrac{100}{160}=0.625$, ולכן $t=\dfrac{\ln0.625}{\ln0.88}\approx3.68$ שנים.`,
      full: [
        String.raw`דורשים $V(t)=100$: $160\cdot0.88^t=100$.`,
        String.raw`מחלקים ב-$160$: $0.88^t=\dfrac{100}{160}=0.625$.`,
        String.raw`מוציאים $\ln$ משני האגפים: $t\cdot\ln0.88=\ln0.625$, ולכן $t=\dfrac{\ln0.625}{\ln0.88}\approx\dfrac{-0.4700}{-0.1278}\approx3.68$ שנים.`,
        String.raw`בדיקה: $160\cdot0.88^{3.68}\approx99.96\approx100$.`,
      ],
    },
  ],
};

const e4: Exercise = {
  id: 'grd-4',
  level: 1,
  topicId: T,
  subtopicIds: GL,
  intro: String.raw`סכום כסף הופקד בתוכנית חיסכון, והוא גדל בה ב-$6\%$ בכל שנה. הגרף מתאר פי כמה גדול הסכום שבתוכנית מהסכום שהופקד, ב-$8$ השנים הראשונות; הקו המקווקו מסמן סכום כפול מהסכום שהופקד.`,
  diagram: { kind: 'plot', xRange: [-0.8, 14], yRange: [0, 2.5], functions: [{ expr: '1.06^x', domain: [0, 8] }, { expr: '2', domain: [0, 14], dashed: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`כעבור כמה שנים יוכפל הסכום שבתוכנית? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`הסכום שהופקד אינו נתון, ואין בו צורך: סמנו אותו ב-$M_0$, דרשו $M_0\cdot q^t=2M_0$ וצמצמו ב-$M_0$.`,
        String.raw`$1.06^t=2$, ולכן $t=\dfrac{\ln2}{\ln1.06}$.`,
      ],
      check: { kind: 'numeric', answer: 11.89566105, tol: 0.01, verify: 'log(2)/log(1+6/100)' },
      short: String.raw`$1.06^t=2\ \Rightarrow\ t=\dfrac{\ln2}{\ln1.06}\approx11.90$ שנים (זמן ההכפלה אינו תלוי בסכום שהופקד).`,
      full: [
        String.raw`מקדם הגדילה השנתי: $q=1+\dfrac{6}{100}=1.06$. אם הופקד סכום $M_0$, כעבור $t$ שנים יש בתוכנית $M_0\cdot1.06^t$.`,
        String.raw`הכפלה: $M_0\cdot1.06^t=2M_0$. מחלקים ב-$M_0$: $1.06^t=2$.`,
        String.raw`$t=\dfrac{\ln2}{\ln1.06}\approx\dfrac{0.69315}{0.05827}\approx11.90$ שנים.`,
        String.raw`זמן ההכפלה תלוי רק במקדם הגדילה $q$, ולא בסכום שהופקד.`,
      ],
    },
  ],
};

const e5: Exercise = {
  id: 'grd-5',
  level: 2,
  topicId: T,
  subtopicIds: GL,
  intro: String.raw`מספר החיידקים בתרבית גדל בקצב מעריכי. בתחילת המדידה היו בתרבית $1{,}000$ חיידקים, וכעבור $3$ שעות היו בה $1{,}728$ חיידקים (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-0.6, 4.5], yRange: [0, 2200], functions: [], points: [{ x: 0, y: 1000, label: '(0, 1000)' }, { x: 3, y: 1728, label: '(3, 1728)' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`בכמה אחוזים גדל מספר החיידקים בכל שעה?`,
      hints: [
        String.raw`סמנו את מקדם הגדילה לשעה ב-$q$. פי כמה גדל מספר החיידקים ב-$3$ שעות?`,
        String.raw`$1000\cdot q^3=1728$, ולכן $q=\sqrt[3]{1.728}$.`,
      ],
      check: { kind: 'numeric', answer: 20, verify: '((1728/1000)^(1/3)-1)*100' },
      short: String.raw`$q^3=1.728\ \Rightarrow\ q=1.2$, כלומר גידול של $20\%$ בכל שעה.`,
      full: [
        String.raw`המודל: $M_t=1000\cdot q^t$, כאשר $t$ בשעות ו-$q$ מקדם הגדילה לשעה.`,
        String.raw`$M_3=1728$: $1000\cdot q^3=1728$, ולכן $q^3=1.728$ ו-$q=\sqrt[3]{1.728}=1.2$.`,
        String.raw`$q=1+\dfrac{p}{100}=1.2$, ולכן $p=20$: מספר החיידקים גדל ב-$20\%$ בכל שעה.`,
        String.raw`טעות נפוצה: לחלק את הגידול הכולל ($72.8\%$) ב-$3$. גידול מעריכי אינו מתחלק שווה בשווה בין השעות.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`כמה חיידקים יהיו בתרבית $8$ שעות אחרי תחילת המדידה? עגלו למספר שלם.`,
      hints: [String.raw`עכשיו המודל ידוע במלואו: $M_t=1000\cdot1.2^t$.`, String.raw`הציבו $t=8$.`],
      check: { kind: 'numeric', answer: 4299.81696, tol: 1, verify: '1000*((1728/1000)^(1/3))^8' },
      short: String.raw`$M_8=1000\cdot1.2^8\approx4{,}300$ חיידקים.`,
      full: [String.raw`$M_t=1000\cdot1.2^t$.`, String.raw`$M_8=1000\cdot1.2^8\approx1000\cdot4.29982\approx4{,}299.8$, כלומר כ-$4{,}300$ חיידקים.`],
    },
    {
      label: 'ג',
      prompt: String.raw`כעבור כמה שעות מתחילת המדידה יהיה מספר החיידקים גדול פי $10$ ממספרם ההתחלתי? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`"פי $10$ מהמספר ההתחלתי" פירושו $M_t=10\cdot1000$.`, String.raw`$1.2^t=10$, ולכן $t=\dfrac{\ln10}{\ln1.2}$.`],
      check: { kind: 'numeric', answer: 12.62925314, tol: 0.01, verify: 'log(10)/log((1728/1000)^(1/3))' },
      short: String.raw`$1.2^t=10\ \Rightarrow\ t=\dfrac{\ln10}{\ln1.2}\approx12.63$ שעות.`,
      full: [
        String.raw`דורשים $1000\cdot1.2^t=10\cdot1000$, כלומר $1.2^t=10$.`,
        String.raw`$t=\dfrac{\ln10}{\ln1.2}\approx\dfrac{2.30259}{0.18232}\approx12.63$ שעות.`,
        String.raw`בדיקה: $1000\cdot1.2^{12.63}\approx10{,}001$.`,
      ],
    },
  ],
};

const e6: Exercise = {
  id: 'grd-6',
  level: 2,
  topicId: T,
  subtopicIds: GL,
  intro: String.raw`זמן מחצית החיים של חומר רדיואקטיבי הוא $8$ ימים. במעבדה יש $120$ גרם מהחומר. הגרף מתאר את כמות החומר (בגרמים) ב-$16$ הימים הראשונים.`,
  diagram: { kind: 'plot', xRange: [-1, 18], yRange: [0, 135], functions: [{ expr: '120*0.5^(x/8)', domain: [0, 16] }], points: [{ x: 0, y: 120, label: '120' }, { x: 8, y: 60, label: '60' }, { x: 16, y: 30, label: '30' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`כמה גרם מהחומר יישארו כעבור $24$ ימים?`,
      hints: [String.raw`כמה פעמים עובר "זמן מחצית חיים" ב-$24$ ימים?`, String.raw`בכל $8$ ימים הכמות קטנה פי $2$ (ולא ב-$60$ גרם).`],
      check: { kind: 'choice', options: [String.raw`$0$ גרם`, String.raw`$40$ גרם`, String.raw`$15$ גרם`, String.raw`$20$ גרם`], correct: 2 },
      short: String.raw`$24$ ימים הם $3$ זמני מחצית חיים: $120\cdot\left(\dfrac12\right)^3=15$ גרם.`,
      full: [
        String.raw`$24:8=3$, כלומר עוברים $3$ זמני מחצית חיים.`,
        String.raw`בכל זמן מחצית חיים הכמות קטנה פי $2$: $120\to60\to30\to15$.`,
        String.raw`בנוסחה: $120\cdot\left(\dfrac12\right)^3=\dfrac{120}{8}=15$ גרם.`,
        String.raw`טעות נפוצה: "ב-$8$ ימים נעלמו $60$ גרם, ולכן אחרי $16$ ימים לא יישאר דבר". הדעיכה מעריכית: בכל פעם נעלמת מחצית ממה שנותר.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`כמה גרם מהחומר יישארו כעבור $20$ ימים? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`$20$ ימים אינם מספר שלם של זמני מחצית חיים, ולכן צריך נוסחה לכל $t$: כמה זמני מחצית חיים עוברים ב-$t$ ימים?`,
        String.raw`ב-$t$ ימים עוברים $\dfrac t8$ זמני מחצית חיים, ולכן $M(t)=120\cdot0.5^{\frac t8}$.`,
      ],
      check: { kind: 'numeric', answer: 21.21320344, tol: 0.01, verify: '120*0.5^(20/8)' },
      short: String.raw`$M(20)=120\cdot0.5^{\frac{20}{8}}=120\cdot0.5^{2.5}\approx21.21$ גרם.`,
      full: [
        String.raw`המודל: $M(t)=120\cdot0.5^{\frac t8}$, כאשר $t$ בימים. (דרך שקולה: $q^8=0.5$, ולכן המקדם היומי הוא $q=0.5^{\frac18}\approx0.9170$ ו-$M(t)=120\cdot q^t$.)`,
        String.raw`$M(20)=120\cdot0.5^{2.5}\approx120\cdot0.17678\approx21.21$ גרם.`,
        String.raw`בדיקת סבירות: התוצאה נמצאת בין הכמות אחרי $16$ ימים ($30$ גרם) לכמות אחרי $24$ ימים ($15$ גרם).`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`כעבור כמה ימים יישארו מהחומר $5$ גרם בלבד? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`פתרו $120\cdot0.5^{\frac t8}=5$: בודדו את החזקה.`, String.raw`$0.5^{\frac t8}=\dfrac{1}{24}$, ולכן $\dfrac t8=\dfrac{\ln\frac{1}{24}}{\ln0.5}$.`],
      check: { kind: 'numeric', answer: 36.67970001, tol: 0.01, verify: '8*log(5/120)/log(0.5)' },
      short: String.raw`$0.5^{\frac t8}=\dfrac{5}{120}\ \Rightarrow\ t=8\cdot\dfrac{\ln\frac{1}{24}}{\ln0.5}\approx36.68$ ימים.`,
      full: [
        String.raw`$120\cdot0.5^{\frac t8}=5$, ולכן $0.5^{\frac t8}=\dfrac{5}{120}=\dfrac{1}{24}$.`,
        String.raw`$\dfrac t8=\dfrac{\ln\frac{1}{24}}{\ln0.5}\approx\dfrac{-3.17805}{-0.69315}\approx4.585$.`,
        String.raw`$t\approx8\cdot4.585=36.68$ ימים.`,
        String.raw`בדיקת סבירות: אחרי $4$ זמני מחצית חיים ($32$ ימים) נותרו $7.5$ גרם, ואחרי $5$ ($40$ ימים) נותרו $3.75$ גרם; $5$ גרם אכן ביניהם.`,
      ],
    },
  ],
};

const e7: Exercise = {
  id: 'grd-7',
  level: 2,
  topicId: T,
  subtopicIds: GEL,
  intro: String.raw`מספר הצבאים בשמורת טבע, $t$ שנים אחרי תחילת המעקב, מתואר על ידי $N(t)=400e^{0.05t}$. הגרף מתאר את מספר הצבאים ב-$10$ השנים הראשונות.`,
  diagram: { kind: 'plot', xRange: [-0.6, 10], yRange: [0, 760], functions: [{ expr: '400*exp(0.05*x)', domain: [0, 10], label: 'N(t)' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`בכמה אחוזים גדל מספר הצבאים בכל שנה? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`כתבו את הפונקציה בצורה $N(t)=400\cdot q^t$. מהו $q$?`,
        String.raw`$e^{0.05t}=\left(e^{0.05}\right)^t$, ולכן $q=e^{0.05}$. אחוז הגידול הוא $(q-1)\cdot100$.`,
      ],
      check: { kind: 'numeric', answer: 5.127109638, tol: 0.01, verify: '(exp(0.05)-1)*100' },
      short: String.raw`$q=e^{0.05}\approx1.0513$, כלומר גידול של כ-$5.13\%$ בשנה.`,
      full: [
        String.raw`לפי חוקי חזקות: $N(t)=400e^{0.05t}=400\cdot\left(e^{0.05}\right)^t$. זו הצורה $M_0\cdot q^t$ עם $q=e^{k}$, וכאן $k=0.05$.`,
        String.raw`$q=e^{0.05}\approx1.05127$.`,
        String.raw`$q=1+\dfrac{p}{100}$, ולכן $p=(q-1)\cdot100\approx5.13$.`,
        String.raw`שימו לב: אחוז הגידול אינו $5\%$ בדיוק. המעריך $k=0.05$ הוא $\ln q$, ולא $\dfrac{p}{100}$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`כעבור כמה שנים יוכפל מספר הצבאים? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`דרשו $N(t)=2\cdot400$ וצמצמו ב-$400$.`, String.raw`$e^{0.05t}=2$. הוציאו $\ln$ משני האגפים.`],
      check: { kind: 'numeric', answer: 13.86294361, tol: 0.01, verify: 'log(2)/0.05' },
      short: String.raw`$e^{0.05t}=2\ \Rightarrow\ t=\dfrac{\ln2}{0.05}\approx13.86$ שנים.`,
      full: [
        String.raw`$400e^{0.05t}=800$, ולכן $e^{0.05t}=2$.`,
        String.raw`$0.05t=\ln2$, ולכן $t=\dfrac{\ln2}{0.05}\approx\dfrac{0.69315}{0.05}\approx13.86$ שנים.`,
        String.raw`בצורה $M_0e^{kt}$ זמן ההכפלה הוא תמיד $\dfrac{\ln2}{k}$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`כעבור כמה שנים מתחילת המעקב יהיו בשמורה $1{,}000$ צבאים? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`פתרו $400e^{0.05t}=1000$.`, String.raw`$e^{0.05t}=2.5$, ולכן $t=\dfrac{\ln2.5}{0.05}$.`],
      check: { kind: 'numeric', answer: 18.32581464, tol: 0.01, verify: 'log(1000/400)/0.05' },
      short: String.raw`$e^{0.05t}=2.5\ \Rightarrow\ t=\dfrac{\ln2.5}{0.05}\approx18.33$ שנים.`,
      full: [
        String.raw`$400e^{0.05t}=1000$, ולכן $e^{0.05t}=\dfrac{1000}{400}=2.5$.`,
        String.raw`$0.05t=\ln2.5\approx0.91629$, ולכן $t\approx\dfrac{0.91629}{0.05}\approx18.33$ שנים.`,
        String.raw`בדיקת סבירות: זה יותר מזמן הכפלה אחד ($13.86$ שנים, $800$ צבאים) ופחות משניים ($27.73$ שנים, $1{,}600$ צבאים).`,
      ],
    },
  ],
};

const e8: Exercise = {
  id: 'grd-8',
  level: 2,
  topicId: T,
  subtopicIds: GL,
  intro: String.raw`דנה הפקידה $50{,}000$ שקלים בתוכנית חיסכון. הסכום שבתוכנית גדל בקצב מעריכי, ב-$6\%$ בכל שנה. הגרף מתאר את הסכום (באלפי שקלים) בשנתיים הראשונות.`,
  diagram: { kind: 'plot', xRange: [-0.15, 2.1], yRange: [0, 65], functions: [{ expr: '50*1.06^x', domain: [0, 2] }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`כמה כסף יהיה בתוכנית כעבור $30$ חודשים? עגלו לשקל שלם.`,
      hints: [String.raw`יחידת הזמן של המודל היא שנה. כמה שנים הם $30$ חודשים?`, String.raw`$30$ חודשים הם $2.5$ שנים: $M=50{,}000\cdot1.06^{2.5}$.`],
      check: { kind: 'numeric', answer: 57840.85013, tol: 5, verify: '50000*(1+6/100)^(30/12)' },
      short: String.raw`$30$ חודשים $=2.5$ שנים, ולכן $M=50{,}000\cdot1.06^{2.5}\approx57{,}841$ שקלים.`,
      full: [
        String.raw`המודל: $M(t)=50{,}000\cdot1.06^t$, כאשר $t$ בשנים.`,
        String.raw`$30$ חודשים הם $\dfrac{30}{12}=2.5$ שנים. המודל המעריכי תקף גם ל-$t$ שאינו שלם.`,
        String.raw`$M(2.5)=50{,}000\cdot1.06^{2.5}\approx50{,}000\cdot1.156817\approx57{,}841$ שקלים.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`בכמה אחוזים גדל הסכום שבתוכנית בכל חודש? עגלו לשלוש ספרות אחרי הנקודה.`,
      hints: [
        String.raw`סמנו את מקדם הגדילה החודשי ב-$q_1$. פי כמה גדל הסכום ב-$12$ חודשים, לפי $q_1$? ולפי הנתון?`,
        String.raw`$q_1^{12}=1.06$, ולכן $q_1=1.06^{\frac{1}{12}}$. (זה לא $6\%:12$.)`,
      ],
      check: { kind: 'numeric', answer: 0.4867550565, tol: 0.001, verify: '((1+6/100)^(1/12)-1)*100' },
      short: String.raw`$q_1=1.06^{\frac{1}{12}}\approx1.004868$, כלומר גידול של כ-$0.487\%$ בחודש.`,
      full: [
        String.raw`אם המקדם החודשי הוא $q_1$, אחרי $12$ חודשים הסכום מוכפל ב-$q_1^{12}$. זה חייב להיות המקדם השנתי: $q_1^{12}=1.06$.`,
        String.raw`$q_1=1.06^{\frac{1}{12}}\approx1.004868$.`,
        String.raw`אחוז הגידול החודשי: $(q_1-1)\cdot100\approx0.487\%$.`,
        String.raw`שימו לב: $6\%:12=0.5\%$ אינה התשובה, כי $1.005^{12}\approx1.0617$ ולא $1.06$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`כעבור כמה חודשים שלמים יהיה בתוכנית, לראשונה, סכום של $60{,}000$ שקלים לפחות?`,
      hints: [
        String.raw`פתרו $50{,}000\cdot1.06^t=60{,}000$ כאשר $t$ בשנים, ורק אז המירו לחודשים.`,
        String.raw`$t=\dfrac{\ln1.2}{\ln1.06}\approx3.129$ שנים. כפלו ב-$12$ ועגלו כלפי מעלה למספר שלם של חודשים.`,
      ],
      check: { kind: 'numeric', answer: 38, verify: 'ceil(12*log(60000/50000)/log(1+6/100))' },
      short: String.raw`$t=\dfrac{\ln1.2}{\ln1.06}\approx3.129$ שנים, שהן כ-$37.55$ חודשים; לכן לראשונה כעבור $38$ חודשים.`,
      full: [
        String.raw`$50{,}000\cdot1.06^t=60{,}000$, ולכן $1.06^t=1.2$.`,
        String.raw`$t=\dfrac{\ln1.2}{\ln1.06}\approx\dfrac{0.18232}{0.05827}\approx3.129$ שנים.`,
        String.raw`בחודשים: $3.129\cdot12\approx37.55$.`,
        String.raw`כעבור $37$ חודשים עדיין אין בתוכנית $60{,}000$ שקלים (יש כ-$59{,}841$), וכעבור $38$ חודשים יש כ-$60{,}132$. התשובה: $38$ חודשים.`,
      ],
    },
  ],
};

const e9: Exercise = {
  id: 'grd-9',
  level: 3,
  topicId: T,
  subtopicIds: GL,
  intro: String.raw`שתי מכוניות נקנו באותו יום. מכונית א נקנתה ב-$200{,}000$ שקלים, וערכה יורד ב-$15\%$ בכל שנה. מכונית ב נקנתה ב-$140{,}000$ שקלים, וערכה יורד ב-$8\%$ בכל שנה. הגרף מתאר את ערכי שתי המכוניות (באלפי שקלים) בשנתיים הראשונות.`,
  diagram: { kind: 'plot', xRange: [-0.3, 2.2], yRange: [0, 220], functions: [{ expr: '200*0.85^x', domain: [0, 2], label: 'א' }, { expr: '140*0.92^x', domain: [0, 2], label: 'ב' }] },
  solutionDiagram: { kind: 'plot', xRange: [-1, 11], yRange: [0, 220], functions: [{ expr: '200*0.85^x', domain: [0, 11], label: 'א' }, { expr: '140*0.92^x', domain: [0, 11], label: 'ב' }], points: [{ x: 4.507, y: 96.14, label: '(4.51, 96.1)' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מה יהיה ערכה של מכונית א כעבור $3$ שנים? ענו בשקלים.`,
      hints: [String.raw`ירידה של $15\%$ בשנה: איזה חלק מהערך נשאר בכל שנה?`, String.raw`$q=1-\dfrac{15}{100}=0.85$, ולכן הערך כעבור $t$ שנים הוא $200{,}000\cdot0.85^t$.`],
      check: { kind: 'numeric', answer: 122825, tol: 1, verify: '200000*(1-15/100)^3' },
      short: String.raw`$q=0.85$, ולכן $200{,}000\cdot0.85^3=122{,}825$ שקלים.`,
      full: [
        String.raw`מקדם הדעיכה של מכונית א: $q_1=1-\dfrac{15}{100}=0.85$, ולכן ערכה כעבור $t$ שנים הוא $V_1(t)=200{,}000\cdot0.85^t$.`,
        String.raw`$V_1(3)=200{,}000\cdot0.85^3=200{,}000\cdot0.614125=122{,}825$ שקלים.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`כעבור כמה שנים מיום הקנייה יהיו ערכי שתי המכוניות שווים? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`כתבו גם את הפונקציה של מכונית ב, $V_2(t)=140{,}000\cdot0.92^t$, והשוו בין שתי הפונקציות.`,
        String.raw`אספו את החזקות באגף אחד: $\left(\dfrac{0.92}{0.85}\right)^t=\dfrac{200{,}000}{140{,}000}$.`,
        String.raw`$t=\dfrac{\ln\frac{10}{7}}{\ln\frac{0.92}{0.85}}$.`,
      ],
      check: { kind: 'numeric', answer: 4.507038417, tol: 0.01, verify: 'log(200000/140000)/log((1-8/100)/(1-15/100))' },
      short: String.raw`$\left(\dfrac{0.92}{0.85}\right)^t=\dfrac{10}{7}\ \Rightarrow\ t=\dfrac{\ln\frac{10}{7}}{\ln\frac{0.92}{0.85}}\approx4.51$ שנים.`,
      full: [
        String.raw`מקדם הדעיכה של מכונית ב: $q_2=1-\dfrac{8}{100}=0.92$, ולכן $V_2(t)=140{,}000\cdot0.92^t$.`,
        String.raw`$V_1(t)=V_2(t)$: $200{,}000\cdot0.85^t=140{,}000\cdot0.92^t$.`,
        String.raw`מחלקים ב-$140{,}000$ וב-$0.85^t$: $\dfrac{200{,}000}{140{,}000}=\dfrac{0.92^t}{0.85^t}$, כלומר $\left(\dfrac{0.92}{0.85}\right)^t=\dfrac{10}{7}$.`,
        String.raw`$t=\dfrac{\ln\frac{10}{7}}{\ln\frac{0.92}{0.85}}\approx\dfrac{0.35667}{0.07914}\approx4.51$ שנים.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מה יהיה ערכה של כל אחת מהמכוניות באותו רגע? ענו באלפי שקלים ועגלו למספר שלם.`,
      hints: [String.raw`הציבו את הזמן שמצאתם באחת משתי הפונקציות (עם כמה שיותר ספרות אחרי הנקודה), ובדקו בשנייה.`],
      check: { kind: 'numeric', answer: 96.14315781, tol: 0.5, verify: '200*0.85^(log(200/140)/log(0.92/0.85))' },
      short: String.raw`$V_1(4.507)=200{,}000\cdot0.85^{4.507}\approx96{,}140$ שקלים, כלומר כ-$96$ אלף שקלים.`,
      full: [
        String.raw`מציבים $t\approx4.507$ בפונקציה של מכונית א: $200{,}000\cdot0.85^{4.507}\approx96{,}140$ שקלים.`,
        String.raw`בדיקה בפונקציה של מכונית ב: $140{,}000\cdot0.92^{4.507}\approx96{,}140$ שקלים. שני הערכים אכן שווים.`,
        String.raw`באלפי שקלים, מעוגל למספר שלם: $96$.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`כעבור כמה שנים מיום הקנייה יהיה ערכה של מכונית ב גדול פי $1.5$ מערכה של מכונית א? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`תרגמו את הדרישה למשוואה: $V_2(t)=1.5\cdot V_1(t)$. שימו לב איזו מכונית מוכפלת ב-$1.5$.`,
        String.raw`$140{,}000\cdot0.92^t=1.5\cdot200{,}000\cdot0.85^t$, ולכן $\left(\dfrac{0.92}{0.85}\right)^t=\dfrac{300{,}000}{140{,}000}$.`,
      ],
      check: { kind: 'numeric', answer: 9.630602182, tol: 0.01, verify: 'log(1.5*200000/140000)/log((1-8/100)/(1-15/100))' },
      short: String.raw`$\left(\dfrac{0.92}{0.85}\right)^t=\dfrac{15}{7}\ \Rightarrow\ t=\dfrac{\ln\frac{15}{7}}{\ln\frac{0.92}{0.85}}\approx9.63$ שנים.`,
      full: [
        String.raw`דורשים $V_2(t)=1.5\cdot V_1(t)$: $140{,}000\cdot0.92^t=1.5\cdot200{,}000\cdot0.85^t$.`,
        String.raw`$\left(\dfrac{0.92}{0.85}\right)^t=\dfrac{300{,}000}{140{,}000}=\dfrac{15}{7}$.`,
        String.raw`$t=\dfrac{\ln\frac{15}{7}}{\ln\frac{0.92}{0.85}}\approx\dfrac{0.76214}{0.07914}\approx9.63$ שנים.`,
        String.raw`בדיקה: $V_1(9.63)\approx41{,}815$ ו-$V_2(9.63)\approx62{,}720$, ואכן $62{,}720:41{,}815\approx1.5$.`,
      ],
    },
  ],
};

const e10: Exercise = {
  id: 'grd-10',
  level: 3,
  topicId: T,
  subtopicIds: GL,
  intro: String.raw`בתחילת ניסוי היו בתרבית $5{,}000$ חיידקים. במשך $6$ השעות הראשונות גדל מספר החיידקים ב-$30\%$ בכל שעה. בתום $6$ השעות הוסיפו לתרבית חומר אנטיביוטי, ומאותו רגע קטן מספר החיידקים ב-$40\%$ בכל שעה. בשרטוט: מספר החיידקים (באלפים) בשעתיים הראשונות; הקו המקווקו מסמן את רגע הוספת החומר.`,
  diagram: { kind: 'plot', xRange: [-0.8, 12], yRange: [0, 30], functions: [{ expr: '5*1.3^x', domain: [0, 2] }], points: [{ x: 0, y: 5, label: '5,000' }], asymptotes: [{ x: 6 }], labels: [{ at: [3, 27], text: 'גדילה: 30% בשעה' }, { at: [9.2, 27], text: 'דעיכה: 40% בשעה' }] },
  solutionDiagram: { kind: 'plot', xRange: [-1.2, 18], yRange: [0, 28], functions: [{ expr: '5*1.3^x', domain: [0, 6] }, { expr: '5*1.3^6*0.6^(x-6)', domain: [6, 18] }], points: [{ x: 0, y: 5, label: '5,000' }, { x: 6, y: 24.134, label: '24,134' }, { x: 9, y: 5.213, label: '5,213' }], asymptotes: [{ x: 6 }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`כמה חיידקים היו בתרבית ברגע הוספת החומר האנטיביוטי? עגלו למספר שלם.`,
      hints: [String.raw`בשלב הראשון: מהו מקדם הגדילה לשעה, וכמה שעות נמשך השלב?`, String.raw`$q_1=1.3$, והשלב נמשך $6$ שעות: $5000\cdot1.3^6$.`],
      check: { kind: 'numeric', answer: 24134.045, tol: 1, verify: '5000*(1+30/100)^6' },
      short: String.raw`$5000\cdot1.3^6\approx24{,}134$ חיידקים.`,
      full: [
        String.raw`בשלב הראשון מקדם הגדילה לשעה הוא $q_1=1+\dfrac{30}{100}=1.3$, ומספר החיידקים כעבור $t$ שעות הוא $5000\cdot1.3^t$ (עבור $0\le t\le6$).`,
        String.raw`ברגע הוספת החומר, $t=6$: $5000\cdot1.3^6\approx5000\cdot4.826809\approx24{,}134$ חיידקים.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`כמה חיידקים היו בתרבית $9$ שעות אחרי תחילת הניסוי? עגלו למספר שלם.`,
      hints: [
        String.raw`$9$ שעות אחרי תחילת הניסוי: כמה שעות עברו מאז הוספת החומר? ומהי "הכמות ההתחלתית" של השלב השני?`,
        String.raw`בשלב השני $q_2=0.6$, הכמות ההתחלתית היא התוצאה של סעיף א, והזמן הוא $9-6=3$ שעות.`,
      ],
      check: { kind: 'numeric', answer: 5212.95372, tol: 1, verify: '5000*(1+30/100)^6*(1-40/100)^(9-6)' },
      short: String.raw`$3$ שעות בשלב הדעיכה: $24{,}134\cdot0.6^3\approx5{,}213$ חיידקים.`,
      full: [
        String.raw`בשלב השני מקדם הדעיכה לשעה הוא $q_2=1-\dfrac{40}{100}=0.6$.`,
        String.raw`הכמות ההתחלתית של השלב השני היא הכמות שבסוף השלב הראשון, $24{,}134$, והזמן נמדד מרגע הוספת החומר: $9-6=3$ שעות.`,
        String.raw`$24{,}134\cdot0.6^3=24{,}134\cdot0.216\approx5{,}213$ חיידקים.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`כמה שעות אחרי הוספת החומר חזר מספר החיידקים להיות $5{,}000$? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`סמנו ב-$s$ את מספר השעות שעברו מאז הוספת החומר, וכתבו את מספר החיידקים בשלב השני כפונקציה של $s$.`,
        String.raw`$5000\cdot1.3^6\cdot0.6^s=5000$, ולכן $0.6^s=\dfrac{1}{1.3^6}$.`,
      ],
      check: { kind: 'numeric', answer: 3.081649615, tol: 0.01, verify: 'log(5000/(5000*1.3^6))/log(0.6)' },
      short: String.raw`$0.6^s=\dfrac{1}{1.3^6}\ \Rightarrow\ s=\dfrac{\ln\left(1.3^{-6}\right)}{\ln0.6}\approx3.08$ שעות.`,
      full: [
        String.raw`$s$ שעות אחרי הוספת החומר מספר החיידקים הוא $5000\cdot1.3^6\cdot0.6^s$.`,
        String.raw`דורשים $5000\cdot1.3^6\cdot0.6^s=5000$, ולכן $0.6^s=\dfrac{1}{1.3^6}\approx0.20718$.`,
        String.raw`$s=\dfrac{\ln0.20718}{\ln0.6}\approx\dfrac{-1.5742}{-0.5108}\approx3.08$ שעות.`,
        String.raw`הדעיכה ($40\%$ בשעה) מהירה מהגדילה ($30\%$ בשעה), ולכן מספיקות כ-$3$ שעות כדי לבטל $6$ שעות של גדילה. זה מתיישב עם סעיף ב: אחרי $3$ שעות נותרו $5{,}213$, מעט יותר מ-$5{,}000$.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`כמה שעות אחרי תחילת הניסוי ירד מספר החיידקים ל-$100$? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [
        String.raw`מצאו קודם כמה שעות אחרי הוספת החומר זה קורה, ורק אז חשבו את הזמן מתחילת הניסוי.`,
        String.raw`$24{,}134\cdot0.6^s=100$, ולכן $s=\dfrac{\ln\frac{100}{24{,}134}}{\ln0.6}$. הזמן מתחילת הניסוי הוא $6+s$.`,
      ],
      check: { kind: 'numeric', answer: 16.73988527, tol: 0.01, verify: '6+log(100/(5000*1.3^6))/log(0.6)' },
      short: String.raw`$0.6^s=\dfrac{100}{24{,}134}\ \Rightarrow\ s\approx10.74$, ולכן הזמן מתחילת הניסוי הוא $6+10.74=16.74$ שעות.`,
      full: [
        String.raw`מספר החיידקים יורד ל-$100$ רק בשלב השני (בשלב הראשון הוא רק גדל): $24{,}134\cdot0.6^s=100$.`,
        String.raw`$0.6^s=\dfrac{100}{24{,}134}\approx0.0041435$, ולכן $s=\dfrac{\ln0.0041435}{\ln0.6}\approx\dfrac{-5.4862}{-0.5108}\approx10.74$ שעות.`,
        String.raw`$s$ נמדד מרגע הוספת החומר. מתחילת הניסוי עברו $6+10.74=16.74$ שעות.`,
      ],
    },
  ],
};

const e11: Exercise = {
  id: 'grd-11',
  level: 3,
  topicId: T,
  subtopicIds: GL,
  intro: String.raw`חומר רדיואקטיבי מתפרק בקצב מעריכי. $3$ שנים אחרי תחילת המדידה נותרו $320$ גרם מהחומר, ו-$6$ שנים אחרי תחילת המדידה נותרו ממנו $163.84$ גרם (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-0.6, 8], yRange: [0, 400], functions: [], points: [{ x: 3, y: 320, label: '(3, 320)' }, { x: 6, y: 163.84, label: '(6, 163.84)' }] },
  solutionDiagram: { kind: 'plot', xRange: [-0.8, 9], yRange: [0, 700], functions: [{ expr: '625*0.8^x', domain: [0, 9] }], points: [{ x: 0, y: 625, label: '625' }, { x: 3, y: 320, label: '320' }, { x: 6, y: 163.84, label: '163.84' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את מקדם הדעיכה השנתי $q$.`,
      hints: [String.raw`כמה שנים עברו בין שתי המדידות? פי כמה הוכפלה הכמות בזמן הזה, לפי $q$?`, String.raw`$320\cdot q^3=163.84$, כלומר $q^3=0.512$.`],
      check: { kind: 'numeric', answer: 0.8, verify: '(163.84/320)^(1/(6-3))' },
      short: String.raw`$q^3=\dfrac{163.84}{320}=0.512\ \Rightarrow\ q=0.8$.`,
      full: [
        String.raw`המודל: $M_t=M_0\cdot q^t$. הנתונים: $M_0q^3=320$ ו-$M_0q^6=163.84$.`,
        String.raw`מחלקים את המשוואה השנייה בראשונה ($M_0$ מצטמצם): $q^3=\dfrac{163.84}{320}=0.512$.`,
        String.raw`$q=\sqrt[3]{0.512}=0.8$. (כלומר הכמות קטנה ב-$20\%$ בכל שנה.)`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את כמות החומר בתחילת המדידה (בגרמים).`,
      hints: [String.raw`הציבו את $q$ שמצאתם באחד הנתונים, למשל $M_0\cdot q^3=320$.`, String.raw`$M_0=\dfrac{320}{0.8^3}$.`],
      check: { kind: 'numeric', answer: 625, verify: '320/(163.84/320)' },
      short: String.raw`$M_0\cdot0.8^3=320\ \Rightarrow\ M_0=\dfrac{320}{0.512}=625$ גרם.`,
      full: [
        String.raw`$M_0\cdot q^3=320$ ו-$q^3=0.512$.`,
        String.raw`$M_0=\dfrac{320}{0.512}=625$ גרם.`,
        String.raw`בדיקה בנתון השני: $625\cdot0.8^6=625\cdot0.262144=163.84$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את זמן מחצית החיים של החומר. עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`זמן מחצית החיים הוא הזמן שבו הכמות קטנה פי $2$: $M_0\cdot q^t=\dfrac12M_0$.`, String.raw`$0.8^t=0.5$, ולכן $t=\dfrac{\ln0.5}{\ln0.8}$.`],
      check: { kind: 'numeric', answer: 3.10628372, tol: 0.01, verify: 'log(0.5)/log((163.84/320)^(1/3))' },
      short: String.raw`$0.8^t=0.5\ \Rightarrow\ t=\dfrac{\ln0.5}{\ln0.8}\approx3.11$ שנים.`,
      full: [
        String.raw`$625\cdot0.8^t=\dfrac12\cdot625$, ולכן $0.8^t=0.5$ (הכמות ההתחלתית מצטמצמת).`,
        String.raw`$t=\dfrac{\ln0.5}{\ln0.8}\approx\dfrac{-0.69315}{-0.22314}\approx3.11$ שנים.`,
        String.raw`בדיקת סבירות: בתוך $3$ שנים הכמות הוכפלה ב-$0.512$, מעט יותר מחצי, ולכן זמן מחצית החיים מעט ארוך מ-$3$ שנים.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`כעבור כמה שנים מתחילת המדידה יישאר מהחומר $1\%$ בלבד מהכמות ההתחלתית? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`$1\%$ מהכמות ההתחלתית הוא $0.01M_0$. כתבו משוואה וצמצמו ב-$M_0$.`, String.raw`$0.8^t=0.01$, ולכן $t=\dfrac{\ln0.01}{\ln0.8}$.`],
      check: { kind: 'numeric', answer: 20.63770232, tol: 0.01, verify: 'log(1/100)/log((163.84/320)^(1/3))' },
      short: String.raw`$0.8^t=0.01\ \Rightarrow\ t=\dfrac{\ln0.01}{\ln0.8}\approx20.64$ שנים.`,
      full: [
        String.raw`$M_0\cdot0.8^t=0.01M_0$, ולכן $0.8^t=0.01$.`,
        String.raw`$t=\dfrac{\ln0.01}{\ln0.8}\approx\dfrac{-4.60517}{-0.22314}\approx20.64$ שנים.`,
        String.raw`בדיקה: $625\cdot0.8^{20.64}\approx6.25$ גרם, שהם $1\%$ מ-$625$.`,
      ],
    },
  ],
};

const e12: Exercise = {
  id: 'grd-12',
  level: 3,
  topicId: T,
  subtopicIds: GEL,
  intro: String.raw`כמות התרופה בדמו של חולה (במ"ג), $t$ שעות אחרי שנטל אותה, מתוארת על ידי $M(t)=M_0e^{kt}$. $5$ שעות אחרי הנטילה נותרו בדם $60\%$ מהכמות ההתחלתית, ו-$10$ שעות אחרי הנטילה נותרו בדם $54$ מ"ג. הגרף מתאר איזה אחוז מהכמות ההתחלתית נותר בדם ב-$5$ השעות הראשונות.`,
  diagram: { kind: 'plot', xRange: [-0.5, 6.5], yRange: [0, 118], functions: [{ expr: '100*0.6^(x/5)', domain: [0, 5] }], points: [{ x: 0, y: 100, label: '100%' }, { x: 5, y: 60, label: '60%' }] },
  solutionDiagram: { kind: 'plot', xRange: [-1.2, 18], yRange: [0, 165], functions: [{ expr: '150*0.6^(x/5)', domain: [0, 18] }, { expr: '30', domain: [0, 18], dashed: true }], points: [{ x: 0, y: 150, label: '150' }, { x: 5, y: 90, label: '90' }, { x: 10, y: 54, label: '54' }, { x: 15.753, y: 30, label: '30' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את $M_0$ (במ"ג).`,
      hints: [
        String.raw`ב-$5$ השעות הראשונות הכמות הוכפלה ב-$0.6$. מה קורה ב-$5$ השעות שאחריהן?`,
        String.raw`בדעיכה מעריכית, בכל $5$ שעות הכמות מוכפלת ב-$0.6$. לכן אחרי $10$ שעות נותר $0.6^2=0.36$ מהכמות ההתחלתית.`,
        String.raw`$0.36M_0=54$.`,
      ],
      check: { kind: 'numeric', answer: 150, verify: '54/0.6^(10/5)' },
      short: String.raw`אחרי $10$ שעות נותר $0.6^2=0.36$ מהכמות ההתחלתית: $0.36M_0=54\ \Rightarrow\ M_0=150$ מ"ג.`,
      full: [
        String.raw`הנתון הראשון: $M(5)=0.6M_0$, כלומר $M_0e^{5k}=0.6M_0$ ולכן $e^{5k}=0.6$.`,
        String.raw`$M(10)=M_0e^{10k}=M_0\left(e^{5k}\right)^2=M_0\cdot0.6^2=0.36M_0$.`,
        String.raw`הנתון השני: $0.36M_0=54$, ולכן $M_0=\dfrac{54}{0.36}=150$ מ"ג.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $k$. עגלו לארבע ספרות אחרי הנקודה.`,
      hints: [String.raw`השתמשו בנתון הראשון: $M(5)=0.6M_0$. הציבו בפונקציה וצמצמו ב-$M_0$.`, String.raw`$e^{5k}=0.6$, ולכן $5k=\ln0.6$.`],
      check: { kind: 'numeric', answer: -0.1021651248, tol: 0.0001, verify: 'log(60/100)/5' },
      short: String.raw`$e^{5k}=0.6\ \Rightarrow\ k=\dfrac{\ln0.6}{5}\approx-0.1022$.`,
      full: [
        String.raw`$M_0e^{5k}=0.6M_0$, ולכן $e^{5k}=0.6$.`,
        String.raw`מוציאים $\ln$: $5k=\ln0.6\approx-0.51083$.`,
        String.raw`$k\approx-0.1022$. הסימן השלילי מתאים לדעיכה.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`בכמה אחוזים קטנה כמות התרופה בדם בכל שעה? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`כתבו $M_0e^{kt}=M_0\cdot\left(e^k\right)^t$. מהו מקדם הדעיכה לשעה?`, String.raw`$q=e^k=0.6^{\frac15}\approx0.9029$, ואחוז הירידה הוא $(1-q)\cdot100$.`],
      check: { kind: 'numeric', answer: 9.711954855, tol: 0.01, verify: '(1-exp(log(60/100)/5))*100' },
      short: String.raw`$q=e^k=0.6^{\frac15}\approx0.9029$, כלומר ירידה של כ-$9.71\%$ בכל שעה.`,
      full: [
        String.raw`$M(t)=M_0e^{kt}=M_0\cdot\left(e^k\right)^t$, ולכן מקדם הדעיכה לשעה הוא $q=e^k$.`,
        String.raw`$e^{5k}=0.6$, ולכן $q=e^k=0.6^{\frac15}\approx0.90288$.`,
        String.raw`$q=1-\dfrac{p}{100}$, ולכן $p=(1-q)\cdot100\approx9.71$: הכמות קטנה בכ-$9.71\%$ בכל שעה.`,
        String.raw`שימו לב: זה לא $40\%:5=8\%$. ירידה מעריכית אינה מתחלקת שווה בשווה בין השעות.`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`התרופה יעילה כל עוד כמותה בדם היא לפחות $30$ מ"ג. כמה שעות אחרי הנטילה התרופה מפסיקה להיות יעילה? עגלו לשתי ספרות אחרי הנקודה.`,
      hints: [String.raw`פתרו $M(t)=30$, עם $M_0$ ו-$k$ שמצאתם.`, String.raw`$150e^{kt}=30$, ולכן $e^{kt}=0.2$ ו-$t=\dfrac{\ln0.2}{k}$.`],
      check: { kind: 'numeric', answer: 15.75330052, tol: 0.01, verify: 'log(30/(54/0.6^2))/(log(0.6)/5)' },
      short: String.raw`$150e^{kt}=30\ \Rightarrow\ t=\dfrac{\ln0.2}{k}=\dfrac{5\ln0.2}{\ln0.6}\approx15.75$ שעות.`,
      full: [
        String.raw`$150e^{kt}=30$, ולכן $e^{kt}=\dfrac{30}{150}=0.2$.`,
        String.raw`$kt=\ln0.2$, ולכן $t=\dfrac{\ln0.2}{k}=\dfrac{5\ln0.2}{\ln0.6}\approx\dfrac{5\cdot(-1.60944)}{-0.51083}\approx15.75$ שעות.`,
        String.raw`בדיקת סבירות: אחרי $15$ שעות נותרו $150\cdot0.6^3=32.4$ מ"ג, מעט יותר מ-$30$, ולכן התשובה מעט יותר מ-$15$ שעות.`,
      ],
    },
  ],
};

export const growthDecay: ExerciseSet = {
  id: 'growth-decay',
  questionnaire: '35582',
  title: 'גדילה ודעיכה',
  topicIds: ['growth-decay'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
