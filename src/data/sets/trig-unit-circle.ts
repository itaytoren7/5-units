import type { Exercise, ExerciseSet } from './types';

/**
 * סט: מעגל היחידה, רדיאנים וזוויות מיוחדות (שאלון 35581, שאלה 5 ובסיס לשאלה 7).
 * 1–4 צעד אחד · 5–8 שניים-שלושה סעיפים · 9–12 שאלות בסגנון בגרות.
 */

const T = 'trigonometry';
const UC = ['trig-unit-circle', 'trig-identities-angle'];
const CM = ['trig-circle-measure'];

const e1: Exercise = {
  id: 'tuc-1',
  level: 1,
  topicId: T,
  subtopicIds: CM,
  intro: String.raw`על מעגל היחידה מסומנת זווית של $150^\circ$ (ראו שרטוט).`,
  diagram: { kind: 'unitCircle', angles: [{ deg: 150, label: '150°' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`הביעו את הזווית ברדיאנים.`,
      hints: [String.raw`$180^\circ=\pi$ רדיאנים.`, String.raw`כפלו את מספר המעלות ב-$\dfrac{\pi}{180}$.`],
      check: { kind: 'numeric', answer: 2.617993878, verify: '150*pi/180' },
      short: String.raw`$150^\circ=150\cdot\dfrac{\pi}{180}=\dfrac{5\pi}{6}\approx 2.62$.`,
      full: [String.raw`זווית שלמה היא $360^\circ=2\pi$, ולכן $1^\circ=\dfrac{\pi}{180}$ רדיאנים.`, String.raw`$150^\circ=150\cdot\dfrac{\pi}{180}=\dfrac{150\pi}{180}=\dfrac{5\pi}{6}$.`, String.raw`בקירוב: $\dfrac{5\pi}{6}\approx 2.62$ רדיאנים.`],
    },
  ],
};

const e2: Exercise = {
  id: 'tuc-2',
  level: 1,
  topicId: T,
  subtopicIds: UC,
  intro: String.raw`הנקודה $P$ נמצאת על מעגל היחידה בזווית של $150^\circ$ מהכיוון החיובי של ציר $x$ (ראו שרטוט).`,
  diagram: { kind: 'unitCircle', angles: [{ deg: 150, label: '150°', showSin: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את $\sin 150^\circ$ (ערך מדויק).`,
      hints: [String.raw`שיעור ה-$y$ של נקודה על מעגל היחידה הוא הסינוס של הזווית.`, String.raw`$\sin(180^\circ-\alpha)=\sin\alpha$, ו-$150^\circ=180^\circ-30^\circ$.`],
      check: { kind: 'numeric', answer: 0.5, verify: 'sin(150*pi/180)' },
      short: String.raw`$\sin 150^\circ=\sin 30^\circ=\dfrac12$.`,
      full: [String.raw`$150^\circ=180^\circ-30^\circ$, ולפי הקשר בין זוויות משלימות ל-$180^\circ$: $\sin(180^\circ-\alpha)=\sin\alpha$.`, String.raw`$\sin 150^\circ=\sin 30^\circ=\dfrac12$.`, String.raw`אימות בשרטוט: הנקודה נמצאת ברביע השני, מעל ציר $x$, ולכן הסינוס חיובי.`],
    },
  ],
};

const e3: Exercise = {
  id: 'tuc-3',
  level: 1,
  topicId: T,
  subtopicIds: UC,
  intro: String.raw`הנקודה $P$ נמצאת על מעגל היחידה בזווית של $240^\circ$ (ראו שרטוט).`,
  diagram: { kind: 'unitCircle', angles: [{ deg: 240, label: '240°', showCos: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את $\cos 240^\circ$ (ערך מדויק).`,
      hints: [String.raw`שיעור ה-$x$ של הנקודה הוא הקוסינוס. באיזה רביע הנקודה, ומה סימן ה-$x$ שם?`, String.raw`$240^\circ=180^\circ+60^\circ$, ו-$\cos(180^\circ+\alpha)=-\cos\alpha$.`],
      check: { kind: 'numeric', answer: -0.5, verify: 'cos(240*pi/180)' },
      short: String.raw`ברביע השלישי הקוסינוס שלילי: $\cos 240^\circ=-\cos 60^\circ=-\dfrac12$.`,
      full: [String.raw`$240^\circ=180^\circ+60^\circ$; זווית ההיחוס היא $60^\circ$.`, String.raw`ברביע השלישי שיעור ה-$x$ שלילי, ולכן $\cos 240^\circ=-\cos 60^\circ$.`, String.raw`$\cos 60^\circ=\dfrac12$, ולכן $\cos 240^\circ=-\dfrac12$.`],
    },
  ],
};

const e4: Exercise = {
  id: 'tuc-4',
  level: 1,
  topicId: T,
  subtopicIds: CM,
  intro: String.raw`במעגל שמרכזו $O$ ורדיוסו 6 נתונה גזרה $AOB$ שזוויתה המרכזית $\dfrac{2\pi}{3}$ רדיאנים (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { O: [0, 0], A: [6, 0], B: [-3, 5.1962] }, circles: [{ center: 'O', radius: 6, dashed: true }], segments: [{ from: 'O', to: 'A', label: '6' }, ['O', 'B']], angles: [{ at: 'O', from: 'A', to: 'B', label: '2π/3' }], dots: ['O'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הקשת $AB$.`,
      hints: [String.raw`כשהזווית ברדיאנים, אורך הקשת הוא מכפלת הרדיוס בזווית.`, String.raw`$L=R\theta$.`],
      check: { kind: 'numeric', answer: 12.5663706144, verify: '6*2*pi/3' },
      short: String.raw`$L=R\theta=6\cdot\dfrac{2\pi}{3}=4\pi\approx 12.57$.`,
      full: [String.raw`אורך קשת לזווית מרכזית $\theta$ ברדיאנים: $L=R\theta$.`, String.raw`$L=6\cdot\dfrac{2\pi}{3}=4\pi\approx 12.57$.`, String.raw`בדיקה: $\dfrac{2\pi}{3}$ הוא שליש מהמעגל, ושליש מההיקף $12\pi$ הוא $4\pi$.`],
    },
  ],
};

const e5: Exercise = {
  id: 'tuc-5',
  level: 2,
  topicId: T,
  subtopicIds: UC,
  intro: String.raw`$\alpha$ זווית חדה ונתון $\sin\alpha=\dfrac35$. הנקודה $P$ המתאימה לזווית נמצאת על מעגל היחידה (ראו שרטוט).`,
  diagram: { kind: 'unitCircle', angles: [{ deg: 36.87, label: 'α', showSin: true, showCos: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את $\cos\alpha$.`,
      hints: [String.raw`על מעגל היחידה $x^2+y^2=1$, כלומר $\sin^2\alpha+\cos^2\alpha=1$.`, String.raw`$\cos\alpha=\sqrt{1-\sin^2\alpha}$, והסימן חיובי כי $\alpha$ חדה.`],
      check: { kind: 'numeric', answer: 0.8, verify: 'sqrt(1-(3/5)^2)' },
      short: String.raw`$\cos\alpha=\sqrt{1-\left(\frac35\right)^2}=\dfrac45$.`,
      full: [String.raw`$\sin^2\alpha+\cos^2\alpha=1$, ולכן $\cos^2\alpha=1-\dfrac{9}{25}=\dfrac{16}{25}$.`, String.raw`$\alpha$ ברביע הראשון, ולכן $\cos\alpha>0$: $\cos\alpha=\dfrac45$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $\tan\alpha$.`,
      hints: [String.raw`$\tan\alpha=\dfrac{\sin\alpha}{\cos\alpha}$.`],
      check: { kind: 'numeric', answer: 0.75, verify: '(3/5)/sqrt(1-(3/5)^2)' },
      short: String.raw`$\tan\alpha=\dfrac{3/5}{4/5}=\dfrac34$.`,
      full: [String.raw`$\tan\alpha=\dfrac{\sin\alpha}{\cos\alpha}=\dfrac{3/5}{4/5}=\dfrac34$.`, String.raw`בשרטוט: $\tan\alpha$ הוא שיפוע הישר $OP$, כלומר $\dfrac{y}{x}=\dfrac{0.6}{0.8}$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את הערך של $\sin(180^\circ-\alpha)\cdot\cos(90^\circ-\alpha)$.`,
      hints: [String.raw`$\sin(180^\circ-\alpha)=\sin\alpha$ ו-$\cos(90^\circ-\alpha)=\sin\alpha$.`],
      check: { kind: 'numeric', answer: 0.36, verify: '(3/5)^2' },
      short: String.raw`הביטוי שווה ל-$\sin^2\alpha=\dfrac{9}{25}=0.36$.`,
      full: [String.raw`זוויות משלימות ל-$180^\circ$: $\sin(180^\circ-\alpha)=\sin\alpha$.`, String.raw`זוויות משלימות ל-$90^\circ$: $\cos(90^\circ-\alpha)=\sin\alpha$.`, String.raw`המכפלה: $\sin\alpha\cdot\sin\alpha=\left(\dfrac35\right)^2=\dfrac{9}{25}=0.36$.`],
    },
  ],
};

const e6: Exercise = {
  id: 'tuc-6',
  level: 2,
  topicId: T,
  subtopicIds: UC,
  intro: String.raw`הנקודה $P$ נמצאת על מעגל היחידה ברביע השני, ושיעור ה-$y$ שלה הוא $0.8$. $\alpha$ היא הזווית בין הכיוון החיובי של ציר $x$ לרדיוס $OP$ (ראו שרטוט).`,
  diagram: { kind: 'unitCircle', angles: [{ deg: 126.87, label: 'α', showSin: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את $\cos\alpha$.`,
      hints: [String.raw`$x^2+y^2=1$ על מעגל היחידה.`, String.raw`ברביע השני שיעור ה-$x$ שלילי.`],
      check: { kind: 'numeric', answer: -0.6, verify: '-sqrt(1-0.8^2)' },
      short: String.raw`$x^2=1-0.64=0.36$, וברביע השני $\cos\alpha=x=-0.6$.`,
      full: [String.raw`$\cos\alpha$ הוא שיעור ה-$x$ של $P$: $x^2+0.8^2=1$, ולכן $x^2=0.36$.`, String.raw`ברביע השני $x<0$, ולכן $\cos\alpha=-0.6$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $\alpha$ במעלות.`,
      hints: [String.raw`מצאו קודם את זווית ההיחוס החדה $\beta$ שעבורה $\sin\beta=0.8$.`, String.raw`ברביע השני $\alpha=180^\circ-\beta$.`],
      check: { kind: 'numeric', answer: 126.8698976458, verify: '180-asin(0.8)*180/pi' },
      short: String.raw`$\beta=\sin^{-1}(0.8)\approx 53.13^\circ$, ולכן $\alpha=180^\circ-53.13^\circ\approx 126.87^\circ$.`,
      full: [String.raw`זווית ההיחוס: $\sin\beta=0.8$, $\beta\approx 53.13^\circ$.`, String.raw`$\sin\alpha=0.8>0$ ו-$\cos\alpha<0$, ולכן $\alpha$ ברביע השני: $\alpha=180^\circ-\beta\approx 126.87^\circ$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את $\tan\alpha$.`,
      hints: [String.raw`$\tan\alpha=\dfrac{\sin\alpha}{\cos\alpha}$; שימו לב לסימן.`],
      check: { kind: 'numeric', answer: -1.3333333333, tol: 0.01, verify: '0.8/(-sqrt(1-0.8^2))' },
      short: String.raw`$\tan\alpha=\dfrac{0.8}{-0.6}=-\dfrac43\approx -1.33$.`,
      full: [String.raw`$\tan\alpha=\dfrac{\sin\alpha}{\cos\alpha}=\dfrac{0.8}{-0.6}=-\dfrac43$.`, String.raw`ברביע השני הטנגנס שלילי, ואכן קיבלנו ערך שלילי.`],
    },
  ],
};

const e7: Exercise = {
  id: 'tuc-7',
  level: 2,
  topicId: T,
  subtopicIds: CM,
  intro: String.raw`במעגל שמרכזו $O$ ורדיוסו 9 נתונה גזרה $AOB$ שזוויתה המרכזית $40^\circ$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { O: [0, 0], A: [9, 0], B: [6.8944, 5.7851] }, circles: [{ center: 'O', radius: 9, dashed: true }], segments: [{ from: 'O', to: 'A', label: '9' }, ['O', 'B']], angles: [{ at: 'O', from: 'A', to: 'B', label: '40°' }], dots: ['O'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את אורך הקשת $AB$.`,
      hints: [String.raw`המירו את הזווית לרדיאנים, או השתמשו ב-$L=\dfrac{\alpha}{360^\circ}\cdot 2\pi R$.`],
      check: { kind: 'numeric', answer: 6.2831853072, verify: '9*40*pi/180' },
      short: String.raw`$L=9\cdot\dfrac{40\pi}{180}=2\pi\approx 6.28$.`,
      full: [String.raw`$40^\circ=\dfrac{40\pi}{180}=\dfrac{2\pi}{9}$ רדיאנים.`, String.raw`$L=R\theta=9\cdot\dfrac{2\pi}{9}=2\pi\approx 6.28$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את שטח הגזרה $AOB$.`,
      hints: [String.raw`$S=\dfrac12R^2\theta$ כשהזווית ברדיאנים.`],
      check: { kind: 'numeric', answer: 28.2743338823, verify: '0.5*9^2*40*pi/180' },
      short: String.raw`$S=\dfrac12\cdot 81\cdot\dfrac{2\pi}{9}=9\pi\approx 28.27$.`,
      full: [String.raw`$S=\dfrac12R^2\theta=\dfrac12\cdot 81\cdot\dfrac{2\pi}{9}=9\pi$.`, String.raw`$S\approx 28.27$. (בדיקה: $\dfrac{40}{360}\cdot\pi\cdot 81=9\pi$.)`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את היקף הגזרה.`,
      hints: [String.raw`היקף הגזרה מורכב משני רדיוסים ומהקשת.`],
      check: { kind: 'numeric', answer: 24.2831853072, verify: '2*9+9*40*pi/180' },
      short: String.raw`$P=2R+L=18+2\pi\approx 24.28$.`,
      full: [String.raw`$P=OA+OB+\overset{\frown}{AB}=9+9+2\pi$.`, String.raw`$P=18+2\pi\approx 24.28$.`],
    },
  ],
};

const e8: Exercise = {
  id: 'tuc-8',
  level: 2,
  topicId: T,
  subtopicIds: UC,
  intro: String.raw`על מעגל היחידה מסומנות הזוויות $25^\circ$ ו-$155^\circ$ (ראו שרטוט). בשאלה זו משתמשים בקשרים בין זוויות משלימות ל-$90^\circ$ ול-$180^\circ$.`,
  diagram: { kind: 'unitCircle', angles: [{ deg: 25, label: '25°', showSin: true }, { deg: 155, label: '155°', showSin: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`$\sin 65^\circ$ שווה ל:`,
      hints: [String.raw`$65^\circ=90^\circ-25^\circ$.`, String.raw`$\sin(90^\circ-\alpha)=\cos\alpha$.`],
      check: { kind: 'choice', options: [String.raw`$\cos 25^\circ$`, String.raw`$\sin 25^\circ$`, String.raw`$-\cos 25^\circ$`, String.raw`$\cos 65^\circ$`], correct: 0 },
      short: String.raw`$\sin 65^\circ=\sin(90^\circ-25^\circ)=\cos 25^\circ$.`,
      full: [String.raw`זוויות משלימות ל-$90^\circ$: $\sin(90^\circ-\alpha)=\cos\alpha$.`, String.raw`עם $\alpha=25^\circ$: $\sin 65^\circ=\cos 25^\circ$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו: $\cos 155^\circ+\cos 25^\circ$.`,
      hints: [String.raw`$155^\circ=180^\circ-25^\circ$.`, String.raw`$\cos(180^\circ-\alpha)=-\cos\alpha$.`],
      check: { kind: 'numeric', answer: 0, verify: 'cos(155*pi/180)+cos(25*pi/180)' },
      short: String.raw`$\cos 155^\circ=-\cos 25^\circ$, ולכן הסכום הוא $0$.`,
      full: [String.raw`$\cos(180^\circ-\alpha)=-\cos\alpha$, ולכן $\cos 155^\circ=-\cos 25^\circ$.`, String.raw`$\cos 155^\circ+\cos 25^\circ=-\cos 25^\circ+\cos 25^\circ=0$.`, String.raw`בשרטוט: שתי הנקודות סימטריות ביחס לציר $y$, ולכן שיעורי ה-$x$ נגדיים.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו: $\tan 65^\circ\cdot\tan 25^\circ$.`,
      hints: [String.raw`כתבו את $\tan 65^\circ$ באמצעות $\sin 25^\circ$ ו-$\cos 25^\circ$.`, String.raw`$\tan(90^\circ-\alpha)=\dfrac{\cos\alpha}{\sin\alpha}$.`],
      check: { kind: 'numeric', answer: 1, verify: 'tan(65*pi/180)*tan(25*pi/180)' },
      short: String.raw`$\tan 65^\circ=\dfrac{\cos 25^\circ}{\sin 25^\circ}$, ולכן המכפלה היא $1$.`,
      full: [String.raw`$\tan 65^\circ=\dfrac{\sin 65^\circ}{\cos 65^\circ}=\dfrac{\cos 25^\circ}{\sin 25^\circ}$ (זוויות משלימות ל-$90^\circ$).`, String.raw`$\tan 65^\circ\cdot\tan 25^\circ=\dfrac{\cos 25^\circ}{\sin 25^\circ}\cdot\dfrac{\sin 25^\circ}{\cos 25^\circ}=1$.`],
    },
  ],
};

const e9: Exercise = {
  id: 'tuc-9',
  level: 3,
  topicId: T,
  subtopicIds: UC,
  intro: String.raw`הנקודה $P$ נמצאת על מעגל היחידה ברביע הראשון, בזווית $\alpha$ מהכיוון החיובי של ציר $x$. נתון: שיפוע הישר $OP$ הוא $2.4$ (ראו שרטוט).`,
  diagram: { kind: 'unitCircle', angles: [{ deg: 67.38, label: 'α', showSin: true, showCos: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את $\cos\alpha$.`,
      hints: [String.raw`שיפוע $OP$ הוא $\tan\alpha=\dfrac{y}{x}$, ולכן $y=2.4x$.`, String.raw`הציבו במשוואת המעגל $x^2+y^2=1$.`],
      check: { kind: 'numeric', answer: 0.3846153846, tol: 0.005, verify: '1/sqrt(1+2.4^2)' },
      short: String.raw`$x^2(1+2.4^2)=1$, ולכן $\cos\alpha=x=\dfrac{1}{\sqrt{6.76}}=\dfrac{5}{13}\approx 0.38$.`,
      full: [String.raw`$\tan\alpha=2.4$, כלומר $y=2.4x$.`, String.raw`$x^2+(2.4x)^2=1\ \Rightarrow\ 6.76x^2=1\ \Rightarrow\ x=\dfrac{1}{2.6}=\dfrac{5}{13}$ (חיובי ברביע הראשון).`, String.raw`$\cos\alpha=\dfrac{5}{13}\approx 0.38$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $\sin\alpha$.`,
      hints: [String.raw`$\sin\alpha=y=2.4x$.`],
      check: { kind: 'numeric', answer: 0.9230769231, tol: 0.005, verify: '2.4/sqrt(1+2.4^2)' },
      short: String.raw`$\sin\alpha=2.4\cdot\dfrac{5}{13}=\dfrac{12}{13}\approx 0.92$.`,
      full: [String.raw`$\sin\alpha=y=2.4x=2.4\cdot\dfrac{5}{13}=\dfrac{12}{13}$.`, String.raw`בדיקה: $\left(\dfrac{5}{13}\right)^2+\left(\dfrac{12}{13}\right)^2=\dfrac{25+144}{169}=1$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את $\alpha$ במעלות.`,
      hints: [String.raw`$\alpha=\tan^{-1}(2.4)$.`],
      check: { kind: 'numeric', answer: 67.380135052, verify: 'atan(2.4)*180/pi' },
      short: String.raw`$\alpha=\tan^{-1}(2.4)\approx 67.38^\circ$.`,
      full: [String.raw`$\tan\alpha=2.4$ ו-$\alpha$ חדה, ולכן $\alpha=\tan^{-1}(2.4)\approx 67.38^\circ$.`, String.raw`בדיקה: $\cos 67.38^\circ\approx 0.385$, כמו בסעיף א.`],
    },
    {
      label: 'ד',
      prompt: String.raw`הנקודה $Q$ היא השיקוף של $P$ ביחס לציר $y$. מצאו את הזווית של $Q$ (במעלות) ואת $\tan$ של זווית זו.`,
      hints: [String.raw`שיקוף ביחס לציר $y$ הופך את סימן ה-$x$ ומשאיר את ה-$y$.`, String.raw`הזווית של $Q$ היא $180^\circ-\alpha$, ו-$\tan(180^\circ-\alpha)=-\tan\alpha$.`],
      check: { kind: 'numeric', answer: 112.619864948, verify: '180-atan(2.4)*180/pi' },
      short: String.raw`הזווית של $Q$: $180^\circ-\alpha\approx 112.62^\circ$, והטנגנס שלה $-2.4$.`,
      full: [String.raw`$Q=(-x,\,y)$, ולכן $\cos$ הזווית שלה הוא $-\cos\alpha$ ו-$\sin$ שלה הוא $\sin\alpha$: הזווית היא $180^\circ-\alpha$.`, String.raw`$180^\circ-67.38^\circ\approx 112.62^\circ$.`, String.raw`$\tan(180^\circ-\alpha)=\dfrac{\sin\alpha}{-\cos\alpha}=-\tan\alpha=-2.4$.`],
    },
  ],
};

const e10: Exercise = {
  id: 'tuc-10',
  level: 3,
  topicId: T,
  subtopicIds: ['trig-circle-measure', 'trig-triangle-solutions'],
  intro: String.raw`בגזרה $AOB$ של מעגל שמרכזו $O$ ורדיוסו $R$, הזווית המרכזית היא $\theta$ רדיאנים. נתון: שטח הגזרה הוא $24$ ואורך הקשת $AB$ הוא $8$ (ראו שרטוט).`,
  diagram: { kind: 'geo', points: { O: [0, 0], A: [6, 0], B: [1.4114, 5.8316] }, circles: [{ center: 'O', radius: 6, dashed: true }], segments: [{ from: 'O', to: 'A', label: 'R' }, ['O', 'B']], angles: [{ at: 'O', from: 'A', to: 'B', label: 'θ' }], dots: ['O'] },
  solutionDiagram: { kind: 'geo', points: { O: [0, 0], A: [6, 0], B: [1.4114, 5.8316] }, circles: [{ center: 'O', radius: 6, dashed: true }], segments: [{ from: 'O', to: 'A', label: '6' }, ['O', 'B'], { from: 'A', to: 'B', dashed: true, accent: true }], angles: [{ at: 'O', from: 'A', to: 'B', label: '4/3' }], dots: ['O'] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את הרדיוס $R$.`,
      hints: [String.raw`כתבו את שתי הנוסחאות: $S=\dfrac12R^2\theta$ ו-$L=R\theta$.`, String.raw`חלקו את משוואת השטח במשוואת הקשת.`],
      check: { kind: 'numeric', answer: 6, verify: '2*24/8' },
      short: String.raw`$\dfrac{S}{L}=\dfrac{\frac12R^2\theta}{R\theta}=\dfrac R2$, ולכן $R=\dfrac{2\cdot 24}{8}=6$.`,
      full: [String.raw`$S=\dfrac12R^2\theta=24$ ו-$L=R\theta=8$.`, String.raw`חלוקה: $\dfrac{S}{L}=\dfrac{R}{2}$, ולכן $\dfrac{24}{8}=\dfrac R2$.`, String.raw`$R=6$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את $\theta$ (ברדיאנים).`,
      hints: [String.raw`$\theta=\dfrac{L}{R}$.`],
      check: { kind: 'numeric', answer: 1.3333333333, tol: 0.01, verify: '8/(2*24/8)' },
      short: String.raw`$\theta=\dfrac{8}{6}=\dfrac43\approx 1.33$ רדיאנים.`,
      full: [String.raw`$L=R\theta$, ולכן $\theta=\dfrac{8}{6}=\dfrac43$.`, String.raw`בדיקה: $\dfrac12\cdot 36\cdot\dfrac43=24$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`הביעו את $\theta$ במעלות.`,
      hints: [String.raw`כפלו ב-$\dfrac{180^\circ}{\pi}$.`],
      check: { kind: 'numeric', answer: 76.3943726841, verify: '(4/3)*180/pi' },
      short: String.raw`$\theta=\dfrac43\cdot\dfrac{180^\circ}{\pi}\approx 76.39^\circ$.`,
      full: [String.raw`רדיאן אחד הוא $\dfrac{180^\circ}{\pi}\approx 57.3^\circ$.`, String.raw`$\theta=\dfrac43\cdot\dfrac{180^\circ}{\pi}\approx 76.39^\circ$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את שטח המשולש $AOB$.`,
      hints: [String.raw`$S_{\triangle}=\dfrac12R^2\sin\theta$, עם $\theta$ ברדיאנים (או בערכו במעלות).`],
      check: { kind: 'numeric', answer: 17.4948822245, verify: '0.5*6^2*sin(4/3)' },
      short: String.raw`$S_{\triangle}=\dfrac12\cdot 36\cdot\sin\dfrac43\approx 17.49$.`,
      full: [String.raw`$OA=OB=6$ והזווית ביניהם $\theta$, ולכן $S_{\triangle}=\dfrac12\cdot 6\cdot 6\cdot\sin\theta$.`, String.raw`$\sin\dfrac43\approx\sin 76.39^\circ\approx 0.9719$, ולכן $S_{\triangle}\approx 17.49$.`, String.raw`(שטח הקטע שבין המיתר לקשת הוא $24-17.49\approx 6.51$.)`],
    },
  ],
};

const e11: Exercise = {
  id: 'tuc-11',
  level: 3,
  topicId: T,
  subtopicIds: UC,
  intro: String.raw`על מעגל היחידה מסומנות הזוויות $200^\circ$, $300^\circ$ ו-$340^\circ$ (ראו שרטוט).`,
  diagram: { kind: 'unitCircle', angles: [{ deg: 200, label: '200°' }, { deg: 300, label: '300°' }, { deg: 340, label: '340°' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`איזה מהערכים הבאים שלילי?`,
      hints: [String.raw`קבעו באיזה רביע כל זווית, וזכרו: סינוס הוא שיעור ה-$y$, קוסינוס הוא שיעור ה-$x$.`],
      check: { kind: 'choice', options: [String.raw`$\sin 200^\circ$`, String.raw`$\cos 300^\circ$`, String.raw`$\tan 200^\circ$`, String.raw`$\cos 60^\circ$`], correct: 0 },
      short: String.raw`$200^\circ$ ברביע השלישי, ושם הסינוס שלילי. השאר חיוביים.`,
      full: [String.raw`$200^\circ$ ברביע השלישי: $\sin<0$, $\cos<0$, ולכן $\tan>0$.`, String.raw`$300^\circ$ ברביע הרביעי: $\cos>0$. $\cos 60^\circ=\dfrac12>0$.`, String.raw`הערך השלילי היחיד הוא $\sin 200^\circ$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו: $\sin 200^\circ+\sin 340^\circ$.`,
      hints: [String.raw`$200^\circ=180^\circ+20^\circ$ ו-$340^\circ=360^\circ-20^\circ$.`, String.raw`$\sin(180^\circ+\alpha)=-\sin\alpha$, $\sin(360^\circ-\alpha)=-\sin\alpha$.`],
      check: { kind: 'numeric', answer: -0.6840402867, tol: 0.005, verify: 'sin(200*pi/180)+sin(340*pi/180)' },
      short: String.raw`הסכום הוא $-2\sin 20^\circ\approx -0.68$.`,
      full: [String.raw`$\sin 200^\circ=-\sin 20^\circ$ ו-$\sin 340^\circ=-\sin 20^\circ$.`, String.raw`$\sin 200^\circ+\sin 340^\circ=-2\sin 20^\circ\approx -2\cdot 0.342=-0.68$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את $\cos 300^\circ$ (ערך מדויק).`,
      hints: [String.raw`$300^\circ=360^\circ-60^\circ$, ו-$\cos(360^\circ-\alpha)=\cos\alpha$.`],
      check: { kind: 'numeric', answer: 0.5, verify: 'cos(300*pi/180)' },
      short: String.raw`$\cos 300^\circ=\cos 60^\circ=\dfrac12$.`,
      full: [String.raw`ברביע הרביעי הקוסינוס חיובי, וזווית ההיחוס היא $60^\circ$.`, String.raw`$\cos 300^\circ=\cos 60^\circ=\dfrac12$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`הביעו את $\tan 200^\circ$ באמצעות זווית חדה, וחשבו את ערכו.`,
      hints: [String.raw`$\tan(180^\circ+\alpha)=\dfrac{-\sin\alpha}{-\cos\alpha}$.`],
      check: { kind: 'numeric', answer: 0.3639702343, tol: 0.005, verify: 'tan(200*pi/180)' },
      short: String.raw`$\tan 200^\circ=\tan 20^\circ\approx 0.36$.`,
      full: [String.raw`$\tan(180^\circ+\alpha)=\dfrac{\sin(180^\circ+\alpha)}{\cos(180^\circ+\alpha)}=\dfrac{-\sin\alpha}{-\cos\alpha}=\tan\alpha$.`, String.raw`$\tan 200^\circ=\tan 20^\circ\approx 0.36$.`],
    },
  ],
};

const e12: Exercise = {
  id: 'tuc-12',
  level: 3,
  topicId: T,
  subtopicIds: ['trig-unit-circle', 'trig-identities-angle', 'trig-circle-measure'],
  intro: String.raw`נתונה הפונקציה $f(x)=2\sin x+\cos 2x$, כאשר $x$ ברדיאנים. בשרטוט מסומנות על מעגל היחידה הזוויות $\dfrac{\pi}{6}$ ו-$\dfrac{5\pi}{6}$.`,
  diagram: { kind: 'unitCircle', angles: [{ deg: 30, label: 'π/6', showSin: true }, { deg: 150, label: '5π/6', showSin: true }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את $f\!\left(\dfrac{\pi}{6}\right)$.`,
      hints: [String.raw`$\dfrac{\pi}{6}=30^\circ$ ו-$2\cdot\dfrac{\pi}{6}=\dfrac{\pi}{3}=60^\circ$.`, String.raw`$\sin 30^\circ=\dfrac12$, $\cos 60^\circ=\dfrac12$.`],
      check: { kind: 'numeric', answer: 1.5, verify: '2*sin(pi/6)+cos(pi/3)' },
      short: String.raw`$f\!\left(\dfrac{\pi}{6}\right)=2\cdot\dfrac12+\dfrac12=1.5$.`,
      full: [String.raw`$\sin\dfrac{\pi}{6}=\sin 30^\circ=\dfrac12$.`, String.raw`$\cos\left(2\cdot\dfrac{\pi}{6}\right)=\cos\dfrac{\pi}{3}=\cos 60^\circ=\dfrac12$.`, String.raw`$f\!\left(\dfrac{\pi}{6}\right)=2\cdot\dfrac12+\dfrac12=\dfrac32$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את $f\!\left(\dfrac{5\pi}{6}\right)$.`,
      hints: [String.raw`$\dfrac{5\pi}{6}=150^\circ$ ו-$\dfrac{5\pi}{3}=300^\circ$.`, String.raw`$\sin 150^\circ=\sin 30^\circ$, $\cos 300^\circ=\cos 60^\circ$.`],
      check: { kind: 'numeric', answer: 1.5, verify: '2*sin(5*pi/6)+cos(5*pi/3)' },
      short: String.raw`$f\!\left(\dfrac{5\pi}{6}\right)=2\cdot\dfrac12+\dfrac12=1.5$.`,
      full: [String.raw`$\sin\dfrac{5\pi}{6}=\sin\left(\pi-\dfrac{\pi}{6}\right)=\sin\dfrac{\pi}{6}=\dfrac12$.`, String.raw`$\cos\dfrac{5\pi}{3}=\cos\left(2\pi-\dfrac{\pi}{3}\right)=\cos\dfrac{\pi}{3}=\dfrac12$.`, String.raw`$f\!\left(\dfrac{5\pi}{6}\right)=1+\dfrac12=\dfrac32$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`הוכיחו שלכל $x$ מתקיים $f(\pi-x)=f(x)$.`,
      hints: [String.raw`$\sin(\pi-x)=\sin x$.`, String.raw`$\cos\big(2(\pi-x)\big)=\cos(2\pi-2x)=\cos 2x$.`],
      check: { kind: 'self' },
      short: String.raw`$\sin(\pi-x)=\sin x$ ו-$\cos(2\pi-2x)=\cos 2x$, ולכן $f(\pi-x)=f(x)$.`,
      full: [String.raw`$f(\pi-x)=2\sin(\pi-x)+\cos\big(2(\pi-x)\big)=2\sin(\pi-x)+\cos(2\pi-2x)$.`, String.raw`זוויות משלימות ל-$\pi$: $\sin(\pi-x)=\sin x$.`, String.raw`מחזוריות וזוגיות הקוסינוס: $\cos(2\pi-2x)=\cos(-2x)=\cos 2x$.`, String.raw`לכן $f(\pi-x)=2\sin x+\cos 2x=f(x)$. (סעיפים א ו-ב מדגימים זאת: $\dfrac{5\pi}{6}=\pi-\dfrac{\pi}{6}$.)`],
    },
    {
      label: 'ד',
      prompt: String.raw`חשבו את $f\!\left(\dfrac{3\pi}{2}\right)$.`,
      hints: [String.raw`$\dfrac{3\pi}{2}=270^\circ$: הנקודה $(0,-1)$ על מעגל היחידה.`, String.raw`$\cos 3\pi=\cos\pi$.`],
      check: { kind: 'numeric', answer: -3, verify: '2*sin(3*pi/2)+cos(3*pi)' },
      short: String.raw`$f\!\left(\dfrac{3\pi}{2}\right)=2\cdot(-1)+(-1)=-3$.`,
      full: [String.raw`$\sin\dfrac{3\pi}{2}=-1$ (הנקודה $(0,-1)$).`, String.raw`$\cos 3\pi=\cos(2\pi+\pi)=\cos\pi=-1$.`, String.raw`$f\!\left(\dfrac{3\pi}{2}\right)=-2-1=-3$.`],
    },
  ],
};

export const trigUnitCircle: ExerciseSet = {
  id: 'trig-unit-circle',
  questionnaire: '35581',
  title: 'מעגל היחידה, רדיאנים וזוויות מיוחדות',
  topicIds: ['trigonometry'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
