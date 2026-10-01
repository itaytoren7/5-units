import type { Problem } from '../types';

/**
 * שאלון 35581 – שאלה 5 (טריגונומטריה במישור).
 * כל שאלה בנויה על מודל קואורדינטות קונקרטי שמקיים את כל הנתונים (משמש גם לשרטוט וגם לבדיקות).
 * 35581-5-1: A(0,0), B(−a·sinα, −a·cosα), C(a·sinα, −a·cosα), a = 8, sinα = (√3−1)/2; D רגל הגובה מ-A, E רגל הגובה מ-B על AC.
 * 35581-5-2: O(0,0), R = 6, α = 35°: A(−R·sinα, −R·cosα), B(R·sinα, −R·cosα), C(0,R), M(0, −R·cosα).
 * 35581-5-3: D(0,0), C(12,0), A(6·cos55°, 6·sin55°), B(12 − h/tan65°, h) כאשר h = 6·sin55°.
 * 35581-5-4: A(0,0), B(10,0), C(6·cos80°, 6·sin80°); D חיתוך חוצה הזווית מ-A עם BC.
 * 35581-5-5: B(0,0), A(6,0), C(4·cosβ, 4·sinβ) עם cosβ = 3/13; D מעבר ל-AC עם DA = 3, DC = 5.
 * 35581-5-6: A(0,0), B(5,0), D(5·cos2α, 5·sin2α), C = B + D, tanα = 1/2.
 * 35581-5-7: C(0,0), A(8,0), B(0,6), O(2,2); c = 10, tanα = 3/4, r = 2.
 * 35581-5-8: O(0,0), R = 6, הקודקודים בזוויות 90° + 72°·k.
 * 35581-5-9: D(0,0), A(0,6), B(−6/tan40°, 0), C(6/tan65°, 0).
 * 35581-5-10: O(0,0), R = 6, A ו-B סימטריות סביב ציר y, בזווית θ/2 מהציר.
 */
export const slot5Problems: Problem[] = [
  {
    id: '35581-5-1',
    questionnaire: '35581',
    slot: 5,
    title: 'משולש שווה-שוקיים עם זווית ראש 2α ושני גבהים',
    topicId: 'trigonometry',
    subtopicIds: ['trig-triangle-solutions', 'trig-identities', 'trig-equations', 'trig-geometry-problems'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160.0,34.0 92.3,206.0 227.7,206.0" />
  <line x1="160.0" y1="34.0" x2="160.0" y2="206.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="92.3" y1="206.0" x2="209.5" y2="159.9" stroke-width="1.5" />
  <polyline points="160.0,197.0 169.0,197.0 169.0,206.0" stroke-width="1" />
  <polyline points="201.1,163.2 204.4,171.6 212.8,168.3" stroke-width="1" />
  <path d="M 151.2,56.3 A 24 24 0 0 0 160.0,58.0" stroke-width="1.2" />
  <path d="M 160.0,58.0 A 24 24 0 0 0 168.8,56.3" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="155.0" y="26.0">A</text>
    <text x="74.3" y="222.0">B</text>
    <text x="233.7" y="222.0">C</text>
    <text x="154.0" y="226.0">D</text>
    <text x="217.5" y="161.9">E</text>
    <text x="147.2" y="80.3" font-size="13" font-style="italic">α</text>
    <text x="162.8" y="80.3" font-size="13" font-style="italic">α</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-5-1-a',
        label: 'א',
        statement: String.raw`במשולש שווה-השוקיים $ABC$ ($AB=AC=a$) זווית הראש היא $\angle BAC=2\alpha$ ($\alpha<45^\circ$). $AD$ הוא הגובה לבסיס $BC$, ו-$BE$ הוא הגובה לשוק $AC$ (ראו שרטוט).

הביעו באמצעות $a$ ו-$\alpha$ את אורך הבסיס $BC$, את אורך הגובה $AD$ ואת שטח המשולש $ABC$.`,
        hints: [
          String.raw`במשולש שווה-שוקיים הגובה לבסיס הוא גם חוצה זווית הראש וגם תיכון, ולכן $\angle BAD=\alpha$ ו-$BD=DC$.`,
          String.raw`במשולש ישר הזווית $ABD$ היתר הוא $a$: $BD=a\sin\alpha$, $AD=a\cos\alpha$.`,
          String.raw`לשטח אפשר להשתמש ב-$S=\frac12\cdot BC\cdot AD$ או ב-$S=\frac12a^2\sin2\alpha$ – ולראות ששתי הדרכים מתלכדות בעזרת זהות הזווית הכפולה.`,
        ],
        solutionSteps: [
          String.raw`במשולש שווה-שוקיים הגובה לבסיס $AD$ הוא גם חוצה זווית הראש וגם תיכון, ולכן $\angle BAD=\angle DAC=\alpha$ ו-$BD=DC$.`,
          String.raw`במשולש ישר הזווית $ABD$ ($\angle ADB=90^\circ$) היתר הוא $AB=a$: $BD=a\sin\alpha$ ו-$AD=a\cos\alpha$.`,
          String.raw`$BC=2BD=2a\sin\alpha$.`,
          String.raw`$S_{ABC}=\frac12\cdot BC\cdot AD=\frac12\cdot2a\sin\alpha\cdot a\cos\alpha=a^2\sin\alpha\cos\alpha$.`,
          String.raw`לפי זהות הזווית הכפולה $\sin2\alpha=2\sin\alpha\cos\alpha$, ולכן $S_{ABC}=\frac12a^2\sin2\alpha$ – בהתאמה לנוסחה $S=\frac12\cdot AB\cdot AC\cdot\sin\angle A$.`,
        ],
        finalAnswer: String.raw`$BC=2a\sin\alpha$, $AD=a\cos\alpha$, $S_{ABC}=\frac12a^2\sin2\alpha$.`,
      },
      {
        id: '35581-5-1-b',
        label: 'ב',
        statement: String.raw`הביעו באמצעות $a$ ו-$\alpha$ את אורכי הקטעים $BE$ ו-$EC$, והוכיחו כי $AE=a\cos2\alpha$.`,
        hints: [
          String.raw`במשולש ישר הזווית $ABE$ היתר הוא $AB=a$ והזווית שליד $A$ היא $2\alpha$.`,
          String.raw`זוויות הבסיס של המשולש שוות ל-$90^\circ-\alpha$; השתמשו בהן במשולש ישר הזווית $BEC$, שבו היתר הוא $BC$.`,
          String.raw`$AE=AC-EC$; השתמשו בזהות $\cos2\alpha=1-2\sin^2\alpha$.`,
        ],
        solutionSteps: [
          String.raw`במשולש ישר הזווית $ABE$ ($\angle AEB=90^\circ$): $BE=AB\sin\angle BAE=a\sin2\alpha$.`,
          String.raw`סכום הזוויות במשולש $ABC$ הוא $180^\circ$ וזוויות הבסיס שוות, ולכן $\angle ACB=\frac{180^\circ-2\alpha}{2}=90^\circ-\alpha$.`,
          String.raw`במשולש ישר הזווית $BEC$ ($\angle BEC=90^\circ$) היתר הוא $BC=2a\sin\alpha$: $EC=BC\cos\angle C=2a\sin\alpha\cos(90^\circ-\alpha)$.`,
          String.raw`לפי הקשר בין זוויות משלימות ל-$90^\circ$: $\cos(90^\circ-\alpha)=\sin\alpha$, ולכן $EC=2a\sin^2\alpha$.`,
          String.raw`$AE=AC-EC=a-2a\sin^2\alpha=a(1-2\sin^2\alpha)$.`,
          String.raw`לפי זהות הזווית הכפולה $\cos2\alpha=1-2\sin^2\alpha$, ולכן $AE=a\cos2\alpha$ (אפשר לקבל זאת גם ישירות מהמשולש $ABE$: $AE=AB\cos2\alpha$).`,
        ],
        finalAnswer: String.raw`$BE=a\sin2\alpha$, $EC=2a\sin^2\alpha$, $AE=a\cos2\alpha$.`,
      },
      {
        id: '35581-5-1-c',
        label: 'ג',
        statement: String.raw`נתון כי $AE=BC$. מצאו את $\alpha$.`,
        hints: [
          String.raw`השוו את הביטויים: $a\cos2\alpha=2a\sin\alpha$.`,
          String.raw`הציבו $\cos2\alpha=1-2\sin^2\alpha$ וקבלו משוואה ריבועית ב-$\sin\alpha$.`,
          String.raw`פסלו פתרון שאינו בתחום $[-1,1]$ או שאינו מתאים לזווית חדה.`,
        ],
        solutionSteps: [
          String.raw`לפי סעיפים א ו-ב: $AE=a\cos2\alpha$ ו-$BC=2a\sin\alpha$, ולכן התנאי $AE=BC$ הוא $a\cos2\alpha=2a\sin\alpha$, כלומר $\cos2\alpha=2\sin\alpha$.`,
          String.raw`מציבים $\cos2\alpha=1-2\sin^2\alpha$: $1-2\sin^2\alpha=2\sin\alpha$, ומכאן $2\sin^2\alpha+2\sin\alpha-1=0$.`,
          String.raw`נסמן $t=\sin\alpha$: $2t^2+2t-1=0$, ולכן $t=\frac{-2\pm\sqrt{4+8}}{4}=\frac{-1\pm\sqrt3}{2}$.`,
          String.raw`הפתרון $t=\frac{-1-\sqrt3}{2}\approx-1.366$ נפסל כי $|t|>1$ (וגם כי $\alpha$ זווית חדה ולכן $\sin\alpha>0$). נשאר $\sin\alpha=\frac{\sqrt3-1}{2}\approx0.366$.`,
          String.raw`$\alpha=\arcsin\frac{\sqrt3-1}{2}\approx21.47^\circ$; הזווית אכן קטנה מ-$45^\circ$, בהתאם לנתון.`,
          String.raw`בדיקה: $\cos2\alpha=1-2\cdot0.366^2\approx0.732$ ו-$2\sin\alpha\approx0.732$ – שוויון.`,
        ],
        finalAnswer: String.raw`$\sin\alpha=\frac{\sqrt3-1}{2}$, $\alpha\approx21.47^\circ$`,
        numericAnswer: 21.470701432439952,
      },
      {
        id: '35581-5-1-d',
        label: 'ד',
        statement: String.raw`נתון גם $a=8$. חשבו את שטח המשולש $BEC$.`,
        hints: [
          String.raw`המשולש $BEC$ ישר-זווית ב-$E$, ולכן $S_{BEC}=\frac12\cdot BE\cdot EC$.`,
          String.raw`השתמשו בביטויים מסעיף ב עם $\sin\alpha=\frac{\sqrt3-1}{2}$ ו-$2\alpha\approx42.94^\circ$.`,
        ],
        solutionSteps: [
          String.raw`מסעיף ג: $\alpha\approx21.47^\circ$, ולכן $2\alpha\approx42.94^\circ$ ו-$\sin2\alpha\approx0.6813$.`,
          String.raw`$BE=a\sin2\alpha\approx8\cdot0.6813\approx5.45$.`,
          String.raw`$EC=2a\sin^2\alpha=16\cdot\left(\frac{\sqrt3-1}{2}\right)^2=4(\sqrt3-1)^2=4(4-2\sqrt3)\approx2.144$.`,
          String.raw`המשולש $BEC$ ישר-זווית ב-$E$: $S_{BEC}=\frac12\cdot BE\cdot EC\approx\frac12\cdot5.45\cdot2.144\approx5.84$.`,
          String.raw`בדיקה בדרך אחרת: $\frac{S_{BEC}}{S_{ABC}}=\frac{EC}{AC}=2\sin^2\alpha\approx0.268$ (גובה משותף מ-$B$), $S_{ABC}=\frac12\cdot64\cdot0.6813\approx21.80$, ולכן $S_{BEC}\approx0.268\cdot21.80\approx5.84$.`,
        ],
        finalAnswer: String.raw`$S_{BEC}\approx5.84$`,
        numericAnswer: 5.8412927262541015,
      },
    ],
  },
  {
    id: '35581-5-2',
    questionnaire: '35581',
    slot: 5,
    title: 'מיתר, זווית היקפית ואמצע הקשת',
    topicId: 'trigonometry',
    subtopicIds: ['trig-triangle-solutions', 'trig-circle-measure', 'trig-geometry-problems'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="98.0" stroke-width="1.5" />
  <polygon points="103.8,200.3 216.2,200.3 160.0,22.0" />
  <line x1="160.0" y1="120.0" x2="103.8" y2="200.3" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="160.0" y1="120.0" x2="216.2" y2="200.3" stroke-width="1.5" stroke-dasharray="5 3" />
  <circle cx="160.0" cy="120.0" r="2.5" fill="currentColor" />
  <path d="M 153.4,43.0 A 22 22 0 0 0 166.6,43.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="167.0" y="116.0">O</text>
    <text x="85.8" y="214.3">A</text>
    <text x="224.2" y="214.3">B</text>
    <text x="155.0" y="16.0">C</text>
    <text x="164.0" y="216.3">M</text>
    <text x="155.0" y="60.0" font-size="13" font-style="italic">α</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-5-2-a',
        label: 'א',
        statement: String.raw`במעגל שמרכזו $O$ ורדיוסו $R$ נתון המיתר $AB$. הנקודה $C$ נמצאת על הקשת הגדולה $AB$, ו-$\angle ACB=\alpha$ ($\alpha<90^\circ$). $M$ היא אמצע המיתר $AB$ (ראו שרטוט).

הוכיחו כי $AB=2R\sin\alpha$, והביעו באמצעות $R$ ו-$\alpha$ את שטח המשולש $AOB$.`,
        hints: [
          String.raw`הזווית המרכזית $\angle AOB$ נשענת על אותה קשת כמו הזווית ההיקפית $\angle ACB$.`,
          String.raw`במשולש שווה-השוקיים $AOB$ הקטע $OM$ הוא גובה וחוצה זווית; עבדו במשולש ישר הזווית $OMA$.`,
          String.raw`דרך שנייה: משפט הסינוסים במשולש $ABC$ – $\frac{AB}{\sin\angle C}=2R$.`,
        ],
        solutionSteps: [
          String.raw`זווית מרכזית שווה לפעמיים הזווית ההיקפית הנשענת על אותה קשת, ולכן $\angle AOB=2\alpha$.`,
          String.raw`המשולש $AOB$ שווה-שוקיים ($OA=OB=R$), ולכן הגובה $OM$ לבסיס $AB$ הוא גם חוצה זווית: $\angle AOM=\alpha$, $\angle OMA=90^\circ$.`,
          String.raw`במשולש ישר הזווית $OMA$: $AM=OA\sin\alpha=R\sin\alpha$, ולכן $AB=2AM=2R\sin\alpha$.`,
          String.raw`דרך שנייה: לפי משפט הסינוסים במשולש $ABC$, $\frac{AB}{\sin\alpha}=2R$, ומכאן $AB=2R\sin\alpha$.`,
          String.raw`שטח המשולש $AOB$ לפי שתי צלעות והזווית שביניהן: $S_{AOB}=\frac12\cdot OA\cdot OB\cdot\sin\angle AOB=\frac12R^2\sin2\alpha$.`,
        ],
        finalAnswer: String.raw`$AB=2R\sin\alpha$, $S_{AOB}=\frac12R^2\sin2\alpha$.`,
      },
      {
        id: '35581-5-2-b',
        label: 'ב',
        statement: String.raw`נתון כי $C$ היא אמצע הקשת הגדולה $AB$ (כלומר $CA=CB$). הוכיחו כי שטח המשולש $ABC$ הוא $S_{ABC}=R^2\sin\alpha\,(1+\cos\alpha)$.`,
        hints: [
          String.raw`$C$ נמצאת במרחקים שווים מ-$A$ ומ-$B$, ולכן היא על האנך האמצעי של $AB$ – וגם $O$ נמצא עליו.`,
          String.raw`$CM$ הוא גובה במשולש $ABC$, ו-$CM=CO+OM$.`,
          String.raw`$OM=R\cos\alpha$ מהמשולש ישר הזווית $OMA$.`,
        ],
        solutionSteps: [
          String.raw`$CA=CB$ ו-$OA=OB$, ולכן גם $C$ וגם $O$ נמצאים על האנך האמצעי של המיתר $AB$; האנך האמצעי עובר דרך $M$, ולכן $C$, $O$ ו-$M$ על ישר אחד ו-$CM\perp AB$.`,
          String.raw`במשולש ישר הזווית $OMA$: $OM=OA\cos\angle AOM=R\cos\alpha$.`,
          String.raw`הנקודה $O$ נמצאת בין $C$ ל-$M$ (המרכז נמצא בצד של הקשת הגדולה), ולכן $CM=CO+OM=R+R\cos\alpha=R(1+\cos\alpha)$.`,
          String.raw`$S_{ABC}=\frac12\cdot AB\cdot CM=\frac12\cdot2R\sin\alpha\cdot R(1+\cos\alpha)=R^2\sin\alpha\,(1+\cos\alpha)$ – מ.ש.ל.`,
        ],
        finalAnswer: String.raw`$S_{ABC}=R^2\sin\alpha\,(1+\cos\alpha)$.`,
      },
      {
        id: '35581-5-2-c',
        label: 'ג',
        statement: String.raw`נתון: $R=6$, $\alpha=35^\circ$. חשבו את שטח המשולש $ABC$.`,
        hints: [
          String.raw`הציבו בנוסחה מסעיף ב.`,
          String.raw`ודאו שהמחשבון במצב מעלות.`,
        ],
        solutionSteps: [
          String.raw`$\sin35^\circ\approx0.5736$, $\cos35^\circ\approx0.8192$.`,
          String.raw`$S_{ABC}=R^2\sin\alpha\,(1+\cos\alpha)=36\cdot0.5736\cdot1.8192\approx37.56$.`,
          String.raw`בדיקה: $AB=2\cdot6\sin35^\circ\approx6.883$, $CM=6(1+\cos35^\circ)\approx10.915$, ו-$\frac12\cdot6.883\cdot10.915\approx37.56$.`,
        ],
        finalAnswer: String.raw`$S_{ABC}\approx37.56$`,
        numericAnswer: 37.56321888278401,
      },
      {
        id: '35581-5-2-d',
        label: 'ד',
        statement: String.raw`חשבו את אורך הקשת הקטנה $AB$ (עבור אותם נתונים).`,
        hints: [
          String.raw`אורך קשת: $l=R\theta$ כאשר $\theta$ היא הזווית המרכזית ברדיאנים.`,
          String.raw`הזווית המרכזית הנשענת על הקשת הקטנה $AB$ היא $2\alpha=70^\circ$; המירו לרדיאנים: $70^\circ=\frac{70\pi}{180}$.`,
        ],
        solutionSteps: [
          String.raw`הזווית המרכזית הנשענת על הקשת הקטנה $AB$ היא $\angle AOB=2\alpha=70^\circ$.`,
          String.raw`ממירים לרדיאנים: $\theta=\frac{70\pi}{180}=\frac{7\pi}{18}\approx1.2217$.`,
          String.raw`אורך הקשת: $l=R\theta=6\cdot\frac{7\pi}{18}=\frac{7\pi}{3}\approx7.33$.`,
          String.raw`בדיקה: הקשת היא $\frac{70}{360}$ מהיקף המעגל: $\frac{70}{360}\cdot2\pi\cdot6=\frac{7\pi}{3}$.`,
        ],
        finalAnswer: String.raw`$l=\frac{7\pi}{3}\approx7.33$`,
        numericAnswer: 7.3303828583761845,
      },
    ],
  },
  {
    id: '35581-5-3',
    questionnaire: '35581',
    slot: 5,
    title: 'טרפז המתפרק למשולשים ישרי זווית',
    topicId: 'trigonometry',
    subtopicIds: ['trig-triangle-solutions', 'trig-geometry-problems'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="106.3,68.4 237.9,68.4 286.0,171.6 34.0,171.6" />
  <line x1="106.3" y1="68.4" x2="106.3" y2="171.6" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="237.9" y1="68.4" x2="237.9" y2="171.6" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="237.9" y1="68.4" x2="34.0" y2="171.6" stroke-width="1.5" />
  <polyline points="97.3,171.6 97.3,162.6 106.3,162.6" stroke-width="1" />
  <polyline points="246.9,171.6 246.9,162.6 237.9,162.6" stroke-width="1" />
  <path d="M 56.0,171.6 A 22 22 0 0 0 46.6,153.6" stroke-width="1.2" />
  <path d="M 276.7,151.7 A 22 22 0 0 0 264.0,171.6" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="90.3" y="62.4">A</text>
    <text x="243.9" y="62.4">B</text>
    <text x="292.0" y="187.6">C</text>
    <text x="16.0" y="187.6">D</text>
    <text x="100.3" y="189.6">E</text>
    <text x="235.9" y="189.6">F</text>
    <text x="57.3" y="161.9" font-size="13" font-style="italic">α</text>
    <text x="254.1" y="159.5" font-size="13" font-style="italic">β</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-5-3-a',
        label: 'א',
        statement: String.raw`בטרפז $ABCD$ ($AB\parallel DC$) נתון: $DC=a$, $AD=d$, $\angle ADC=\alpha$, $\angle BCD=\beta$ (שתי הזוויות חדות). $AE$ ו-$BF$ הם הגבהים לבסיס $DC$ (ראו שרטוט).

הביעו באמצעות $a$, $d$, $\alpha$ ו-$\beta$ את גובה הטרפז $h$, את אורך הבסיס $AB$ ואת שטח הטרפז.`,
        hints: [
          String.raw`במשולש ישר הזווית $AED$: $h=d\sin\alpha$, $DE=d\cos\alpha$.`,
          String.raw`במשולש ישר הזווית $BFC$ נתון הניצב $BF=h$ והזווית $\beta$: $CF=\frac{h}{\tan\beta}$.`,
          String.raw`$AB=EF=DC-DE-CF$ (כי $ABFE$ מלבן).`,
        ],
        solutionSteps: [
          String.raw`במשולש ישר הזווית $AED$ ($\angle AED=90^\circ$) היתר הוא $AD=d$: $h=AE=d\sin\alpha$ ו-$DE=d\cos\alpha$.`,
          String.raw`במשולש ישר הזווית $BFC$: $\tan\beta=\frac{BF}{CF}=\frac{h}{CF}$, ולכן $CF=\frac{h}{\tan\beta}=\frac{d\sin\alpha}{\tan\beta}$.`,
          String.raw`$ABFE$ הוא מלבן (שתי צלעות מקבילות ושני גבהים), ולכן $AB=EF=DC-DE-CF=a-d\cos\alpha-\frac{d\sin\alpha}{\tan\beta}$.`,
          String.raw`שטח הטרפז: $S=\frac{(AB+DC)\cdot h}{2}=\frac{d\sin\alpha}{2}\left(2a-d\cos\alpha-\frac{d\sin\alpha}{\tan\beta}\right)$.`,
        ],
        finalAnswer: String.raw`$h=d\sin\alpha$, $AB=a-d\cos\alpha-\frac{d\sin\alpha}{\tan\beta}$, $S=\frac{d\sin\alpha}{2}\left(2a-d\cos\alpha-\frac{d\sin\alpha}{\tan\beta}\right)$.`,
      },
      {
        id: '35581-5-3-b',
        label: 'ב',
        statement: String.raw`נתון: $a=12$, $d=6$, $\alpha=55^\circ$, $\beta=65^\circ$. חשבו את שטח הטרפז.`,
        hints: [
          String.raw`חשבו תחילה את $h$, $DE$ ו-$CF$ בנפרד, ורק אחר כך את $AB$.`,
          String.raw`שמרו על דיוק של ארבע ספרות לפחות בחישובי הביניים.`,
        ],
        solutionSteps: [
          String.raw`$h=6\sin55^\circ\approx6\cdot0.8192\approx4.915$.`,
          String.raw`$DE=6\cos55^\circ\approx6\cdot0.5736\approx3.441$.`,
          String.raw`$CF=\frac{h}{\tan65^\circ}\approx\frac{4.915}{2.1445}\approx2.292$.`,
          String.raw`$AB=12-3.441-2.292\approx6.267$.`,
          String.raw`$S=\frac{(6.267+12)\cdot4.915}{2}\approx44.89$.`,
        ],
        finalAnswer: String.raw`$S\approx44.89$`,
        numericAnswer: 44.88956516965498,
      },
      {
        id: '35581-5-3-c',
        label: 'ג',
        statement: String.raw`חשבו את אורך האלכסון $BD$.`,
        hints: [
          String.raw`במשולש ישר הזווית $BFD$ הניצבים הם $BF=h$ ו-$DF=DC-CF$.`,
          String.raw`דרך שנייה: חשבו את $BC$ מהמשולש $BFC$ והשתמשו במשפט הקוסינוסים במשולש $BCD$ עם הזווית $\beta$.`,
        ],
        solutionSteps: [
          String.raw`$DF=DC-CF\approx12-2.292\approx9.708$ ו-$BF=h\approx4.915$.`,
          String.raw`במשולש ישר הזווית $BFD$ לפי משפט פיתגורס: $BD=\sqrt{9.708^2+4.915^2}\approx\sqrt{94.25+24.16}\approx10.88$.`,
          String.raw`בדיקה במשפט הקוסינוסים: $BC=\frac{h}{\sin65^\circ}\approx5.423$, ואז $BD^2=BC^2+DC^2-2\cdot BC\cdot DC\cos65^\circ\approx29.41+144-55.00\approx118.41$, כלומר $BD\approx10.88$.`,
        ],
        finalAnswer: String.raw`$BD\approx10.88$`,
        numericAnswer: 10.881374958305143,
      },
      {
        id: '35581-5-3-d',
        label: 'ד',
        statement: String.raw`חשבו את הזווית $\angle ADB$ שבין האלכסון $BD$ לשוק $AD$.`,
        hints: [
          String.raw`מצאו תחילה את $\angle BDC$ מהמשולש ישר הזווית $BFD$: $\tan\angle BDC=\frac{BF}{DF}$.`,
          String.raw`$\angle ADB=\angle ADC-\angle BDC$.`,
        ],
        solutionSteps: [
          String.raw`במשולש ישר הזווית $BFD$: $\tan\angle BDC=\frac{BF}{DF}\approx\frac{4.915}{9.708}\approx0.5063$, ולכן $\angle BDC\approx26.85^\circ$.`,
          String.raw`האלכסון $BD$ נמצא בתוך הזווית $\angle ADC$, ולכן $\angle ADB=\angle ADC-\angle BDC\approx55^\circ-26.85^\circ\approx28.15^\circ$.`,
          String.raw`בדיקה במשפט הסינוסים במשולש $ABD$: $\angle ABD=\angle BDC\approx26.85^\circ$ (זוויות מתחלפות בין $AB\parallel DC$), ואז $\frac{AB}{\sin\angle ADB}\approx\frac{6.267}{\sin28.15^\circ}\approx13.28$ ו-$\frac{AD}{\sin\angle ABD}\approx\frac{6}{\sin26.85^\circ}\approx13.28$ – בהתאמה.`,
        ],
        finalAnswer: String.raw`$\angle ADB\approx28.15^\circ$`,
        numericAnswer: 28.148402114377628,
      },
    ],
  },
  {
    id: '35581-5-4',
    questionnaire: '35581',
    slot: 5,
    title: 'חוצה זווית, משפט הקוסינוסים ומעגל חוסם',
    topicId: 'trigonometry',
    subtopicIds: ['trig-triangle-solutions', 'trig-identities', 'trig-geometry-problems'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="34.0,194.5 286.0,194.5 60.3,45.5" />
  <line x1="34.0" y1="194.5" x2="144.9" y2="101.4" stroke-width="1.5" />
  <path d="M 58.0,194.5 A 24 24 0 0 0 52.4,179.0" stroke-width="1.2" />
  <path d="M 52.4,179.0 A 24 24 0 0 0 38.2,170.8" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="16.0" y="200.5">A</text>
    <text x="292.0" y="200.5">B</text>
    <text x="56.3" y="37.5">C</text>
    <text x="150.9" y="99.4">D</text>
    <text x="62.8" y="187.1" font-size="13" font-style="italic">α</text>
    <text x="47.0" y="168.3" font-size="13" font-style="italic">α</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-5-4-a',
        label: 'א',
        statement: String.raw`במשולש $ABC$ נתון $AB=c$, $AC=b$ ו-$\angle BAC=2\alpha$. הקטע $AD$ חוצה את הזווית $\angle BAC$ ($D$ על $BC$) (ראו שרטוט).

הוכיחו כי $AD=\frac{2bc\cos\alpha}{b+c}$.`,
        hints: [
          String.raw`$S_{ABD}+S_{ADC}=S_{ABC}$; הביעו כל שטח בעזרת הנוסחה $S=\frac12xy\sin\gamma$.`,
          String.raw`בכל אחד מהמשולשים $ABD$ ו-$ADC$ הזווית שליד $A$ היא $\alpha$, ובמשולש $ABC$ היא $2\alpha$.`,
          String.raw`השתמשו בזהות $\sin2\alpha=2\sin\alpha\cos\alpha$ וצמצמו ב-$\sin\alpha$.`,
        ],
        solutionSteps: [
          String.raw`$AD$ חוצה זווית, ולכן $\angle BAD=\angle DAC=\alpha$.`,
          String.raw`$S_{ABD}=\frac12\cdot AB\cdot AD\sin\alpha=\frac12c\cdot AD\sin\alpha$ ו-$S_{ADC}=\frac12\cdot AC\cdot AD\sin\alpha=\frac12b\cdot AD\sin\alpha$.`,
          String.raw`$S_{ABC}=\frac12\cdot AB\cdot AC\sin2\alpha=\frac12bc\sin2\alpha$.`,
          String.raw`$D$ על $BC$, ולכן $S_{ABD}+S_{ADC}=S_{ABC}$: $\frac12AD\sin\alpha\,(b+c)=\frac12bc\sin2\alpha$.`,
          String.raw`לפי זהות הזווית הכפולה $\sin2\alpha=2\sin\alpha\cos\alpha$; מחלקים ב-$\frac12\sin\alpha\ne0$ ומקבלים $AD\,(b+c)=2bc\cos\alpha$.`,
          String.raw`מכאן $AD=\frac{2bc\cos\alpha}{b+c}$ – מ.ש.ל.`,
        ],
        finalAnswer: String.raw`$AD=\frac{2bc\cos\alpha}{b+c}$.`,
      },
      {
        id: '35581-5-4-b',
        label: 'ב',
        statement: String.raw`נתון: $AB=10$, $AC=6$, $\angle BAC=80^\circ$. חשבו את אורך הצלע $BC$.`,
        hints: [
          String.raw`נתונות שתי צלעות והזווית הכלואה ביניהן – משפט הקוסינוסים.`,
          String.raw`$BC^2=AB^2+AC^2-2\cdot AB\cdot AC\cos\angle BAC$.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט הקוסינוסים: $BC^2=AB^2+AC^2-2\cdot AB\cdot AC\cos\angle BAC$.`,
          String.raw`$BC^2=100+36-120\cos80^\circ\approx136-120\cdot0.17365\approx115.16$.`,
          String.raw`$BC\approx\sqrt{115.16}\approx10.73$.`,
        ],
        finalAnswer: String.raw`$BC\approx10.73$`,
        numericAnswer: 10.731366114338302,
      },
      {
        id: '35581-5-4-c',
        label: 'ג',
        statement: String.raw`חשבו את אורך חוצה הזווית $AD$.`,
        hints: [
          String.raw`הציבו $b=6$, $c=10$, $\alpha=40^\circ$ בנוסחה מסעיף א.`,
          String.raw`בדיקה אפשרית: לפי משפט חוצה הזווית $\frac{BD}{DC}=\frac{AB}{AC}$, ואז משפט הקוסינוסים במשולש $ABD$.`,
        ],
        solutionSteps: [
          String.raw`$\alpha=\frac{80^\circ}{2}=40^\circ$, $\cos40^\circ\approx0.7660$.`,
          String.raw`$AD=\frac{2\cdot6\cdot10\cos40^\circ}{6+10}=\frac{120\cdot0.7660}{16}\approx5.745$.`,
          String.raw`בדיקה: לפי משפט חוצה הזווית $\frac{BD}{DC}=\frac{10}{6}$, ולכן $BD=\frac{10}{16}\cdot10.731\approx6.707$; $\cos\angle ABD=\frac{AB^2+BC^2-AC^2}{2\cdot AB\cdot BC}\approx\frac{100+115.16-36}{214.63}\approx0.8348$.`,
          String.raw`במשולש $ABD$: $AD^2=AB^2+BD^2-2\cdot AB\cdot BD\cos\angle ABD\approx100+44.98-111.98\approx33.0$, ולכן $AD\approx5.75$ – בהתאמה.`,
        ],
        finalAnswer: String.raw`$AD\approx5.75$`,
        numericAnswer: 5.7453333233923365,
      },
      {
        id: '35581-5-4-d',
        label: 'ד',
        statement: String.raw`חשבו את רדיוס המעגל החוסם את המשולש $ABD$.`,
        hints: [
          String.raw`לפי משפט הסינוסים, $\frac{BD}{\sin\angle BAD}=2R$.`,
          String.raw`$BD$ מתקבל ממשפט חוצה הזווית: $\frac{BD}{DC}=\frac{AB}{AC}$, $BD+DC=BC$.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט חוצה הזווית $\frac{BD}{DC}=\frac{AB}{AC}=\frac{10}{6}=\frac53$, ולכן $BD=\frac58BC\approx\frac58\cdot10.731\approx6.707$.`,
          String.raw`במשולש $ABD$ הצלע $BD$ נמצאת מול הזווית $\angle BAD=40^\circ$. לפי משפט הסינוסים: $\frac{BD}{\sin40^\circ}=2R$.`,
          String.raw`$R=\frac{BD}{2\sin40^\circ}\approx\frac{6.707}{2\cdot0.6428}\approx5.22$.`,
          String.raw`בדיקה: $\sin\angle ABD=\frac{AC\sin80^\circ}{BC}\approx\frac{6\cdot0.9848}{10.731}\approx0.5506$, ולכן $\angle ABD\approx33.41^\circ$ (חדה, כי $AC$ אינה הצלע הגדולה), $\angle ADB\approx106.59^\circ$, ו-$\frac{AB}{2\sin\angle ADB}\approx\frac{10}{2\cdot0.9584}\approx5.22$.`,
        ],
        finalAnswer: String.raw`$R\approx5.22$`,
        numericAnswer: 5.217200612137043,
      },
    ],
  },
  {
    id: '35581-5-5',
    questionnaire: '35581',
    slot: 5,
    title: 'מרובע חסום במעגל – אלכסון משותף לשני משולשים',
    topicId: 'trigonometry',
    subtopicIds: ['trig-triangle-solutions', 'trig-identities-angle', 'trig-geometry-problems'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="98.0" stroke-width="1.5" />
  <polygon points="249.4,160.1 70.6,160.1 98.1,44.0 244.7,70.8" />
  <line x1="249.4" y1="160.1" x2="98.1" y2="44.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <path d="M 90.6,160.1 A 20 20 0 0 0 75.2,140.6" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="255.4" y="174.1">A</text>
    <text x="52.6" y="170.1">B</text>
    <text x="92.1" y="36.0">C</text>
    <text x="252.7" y="70.8">D</text>
    <text x="89.1" y="146.5" font-size="13" font-style="italic">β</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-5-5-a',
        label: 'א',
        statement: String.raw`המרובע $ABCD$ חסום במעגל. נתון: $AB=6$, $BC=4$, $CD=5$, $DA=3$, ו-$\angle ABC=\beta$ (ראו שרטוט).

הביעו את $AC^2$ בשתי דרכים (מהמשולש $ABC$ ומהמשולש $ADC$), הוכיחו כי $\cos\beta=\frac{3}{13}$ ומצאו את $\beta$.`,
        hints: [
          String.raw`במרובע חסום במעגל סכום זוויות נגדיות הוא $180^\circ$, ולכן $\angle ADC=180^\circ-\beta$.`,
          String.raw`$\cos(180^\circ-\beta)=-\cos\beta$.`,
          String.raw`כתבו משפט קוסינוסים לאלכסון $AC$ בכל אחד משני המשולשים והשוו.`,
        ],
        solutionSteps: [
          String.raw`במרובע חסום במעגל סכום הזוויות הנגדיות הוא $180^\circ$: $\angle ADC=180^\circ-\beta$.`,
          String.raw`במשולש $ABC$ לפי משפט הקוסינוסים: $AC^2=AB^2+BC^2-2\cdot AB\cdot BC\cos\beta=36+16-48\cos\beta=52-48\cos\beta$.`,
          String.raw`במשולש $ADC$: $AC^2=AD^2+DC^2-2\cdot AD\cdot DC\cos(180^\circ-\beta)=9+25+30\cos\beta=34+30\cos\beta$, כי $\cos(180^\circ-\beta)=-\cos\beta$.`,
          String.raw`משווים: $52-48\cos\beta=34+30\cos\beta$, ולכן $78\cos\beta=18$ ו-$\cos\beta=\frac{18}{78}=\frac{3}{13}$.`,
          String.raw`$\beta=\arccos\frac{3}{13}\approx76.66^\circ$ (זווית במרובע קמור, בין $0^\circ$ ל-$180^\circ$, ולכן הפתרון יחיד).`,
        ],
        finalAnswer: String.raw`$\cos\beta=\frac{3}{13}$, $\beta\approx76.66^\circ$`,
        numericAnswer: 76.65763620291176,
      },
      {
        id: '35581-5-5-b',
        label: 'ב',
        statement: String.raw`חשבו את אורך האלכסון $AC$.`,
        hints: [
          String.raw`הציבו $\cos\beta=\frac{3}{13}$ באחד משני הביטויים ל-$AC^2$ מסעיף א.`,
          String.raw`כדאי לבדוק שגם הביטוי השני נותן אותו ערך.`,
        ],
        solutionSteps: [
          String.raw`$AC^2=52-48\cos\beta=52-48\cdot\frac{3}{13}=52-\frac{144}{13}=\frac{532}{13}\approx40.92$.`,
          String.raw`$AC=\sqrt{\frac{532}{13}}\approx6.40$.`,
          String.raw`בדיקה בביטוי השני: $34+30\cdot\frac{3}{13}=34+\frac{90}{13}=\frac{532}{13}$ – אותו ערך.`,
        ],
        finalAnswer: String.raw`$AC=\sqrt{\frac{532}{13}}\approx6.40$`,
        numericAnswer: 6.397114734243628,
      },
      {
        id: '35581-5-5-c',
        label: 'ג',
        statement: String.raw`חשבו את שטח המרובע $ABCD$.`,
        hints: [
          String.raw`האלכסון $AC$ מחלק את המרובע לשני משולשים; בכל אחד מהם ידועות שתי צלעות והזווית שביניהן.`,
          String.raw`$\sin(180^\circ-\beta)=\sin\beta$, ו-$\sin\beta=\sqrt{1-\cos^2\beta}$.`,
        ],
        solutionSteps: [
          String.raw`$\sin\beta=\sqrt{1-\left(\frac{3}{13}\right)^2}=\sqrt{\frac{160}{169}}=\frac{\sqrt{160}}{13}\approx0.9730$ (חיובי, כי $0^\circ<\beta<180^\circ$).`,
          String.raw`$S_{ABC}=\frac12\cdot AB\cdot BC\sin\beta=\frac12\cdot6\cdot4\sin\beta=12\sin\beta$.`,
          String.raw`$S_{ADC}=\frac12\cdot AD\cdot DC\sin(180^\circ-\beta)=\frac12\cdot3\cdot5\sin\beta=7.5\sin\beta$.`,
          String.raw`$S_{ABCD}=S_{ABC}+S_{ADC}=19.5\sin\beta\approx19.5\cdot0.9730\approx18.97$.`,
        ],
        finalAnswer: String.raw`$S_{ABCD}=19.5\sin\beta\approx18.97$`,
        numericAnswer: 18.973665961010276,
      },
      {
        id: '35581-5-5-d',
        label: 'ד',
        statement: String.raw`חשבו את רדיוס המעגל.`,
        hints: [
          String.raw`המעגל חוסם גם את המשולש $ABC$; השתמשו במשפט הסינוסים $\frac{AC}{\sin\beta}=2R$.`,
          String.raw`אפשר להשתמש גם במשולש $ADC$ – מתקבל אותו ערך כי $\sin(180^\circ-\beta)=\sin\beta$.`,
        ],
        solutionSteps: [
          String.raw`המעגל החוסם את המרובע חוסם גם את המשולש $ABC$, שבו הצלע $AC$ נמצאת מול הזווית $\beta$.`,
          String.raw`לפי משפט הסינוסים: $\frac{AC}{\sin\beta}=2R$, ולכן $R=\frac{AC}{2\sin\beta}\approx\frac{6.397}{2\cdot0.9730}\approx3.29$.`,
          String.raw`בדיקה מהמשולש $ADC$: $\frac{AC}{\sin(180^\circ-\beta)}=\frac{AC}{\sin\beta}$ – אותו ערך של $2R$, כנדרש.`,
        ],
        finalAnswer: String.raw`$R\approx3.29$`,
        numericAnswer: 3.287286114715298,
      },
    ],
  },
  {
    id: '35581-5-6',
    questionnaire: '35581',
    slot: 5,
    title: 'אלכסוני מעוין וזווית כפולה',
    topicId: 'trigonometry',
    subtopicIds: ['trig-triangle-solutions', 'trig-identities', 'trig-equations', 'trig-geometry-problems'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="34.0,183.0 191.5,183.0 286.0,57.0 128.5,57.0" />
  <line x1="34.0" y1="183.0" x2="286.0" y2="57.0" stroke-width="1.5" />
  <line x1="191.5" y1="183.0" x2="128.5" y2="57.0" stroke-width="1.5" />
  <path d="M 60.0,183.0 A 26 26 0 0 0 57.3,171.4" stroke-width="1.2" />
  <path d="M 57.3,171.4 A 26 26 0 0 0 49.6,162.2" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="16.0" y="189.0">A</text>
    <text x="197.5" y="189.0">B</text>
    <text x="292.0" y="53.0">C</text>
    <text x="112.5" y="53.0">D</text>
    <text x="67.0" y="179.0" font-size="13" font-style="italic">α</text>
    <text x="58.9" y="163.0" font-size="13" font-style="italic">α</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-5-6-a',
        label: 'א',
        statement: String.raw`במעוין $ABCD$ אורך הצלע הוא $a$ ו-$\angle BAD=2\alpha$ ($\alpha<45^\circ$). האלכסונים נחתכים בנקודה $O$ (ראו שרטוט).

הביעו באמצעות $a$ ו-$\alpha$ את אורכי האלכסונים $AC$ ו-$BD$, והוכיחו כי שטח המעוין הוא $S=a^2\sin2\alpha$.`,
        hints: [
          String.raw`אלכסוני המעוין חוצים את הזוויות ומאונכים זה לזה, ולכן $\angle BAO=\alpha$ ו-$\angle AOB=90^\circ$.`,
          String.raw`במשולש ישר הזווית $AOB$ היתר הוא $AB=a$.`,
          String.raw`שטח מעוין: $S=\frac12d_1d_2$ או $S=a^2\sin\angle A$.`,
        ],
        solutionSteps: [
          String.raw`אלכסוני המעוין חוצים את זוויותיו, מאונכים זה לזה וחוצים זה את זה, ולכן $\angle BAO=\alpha$, $\angle AOB=90^\circ$, $AC=2AO$ ו-$BD=2BO$.`,
          String.raw`במשולש ישר הזווית $AOB$ היתר הוא $AB=a$: $AO=a\cos\alpha$ ו-$BO=a\sin\alpha$.`,
          String.raw`$AC=2a\cos\alpha$, $BD=2a\sin\alpha$.`,
          String.raw`שטח המעוין הוא מחצית מכפלת האלכסונים: $S=\frac12\cdot AC\cdot BD=\frac12\cdot2a\cos\alpha\cdot2a\sin\alpha=2a^2\sin\alpha\cos\alpha$.`,
          String.raw`לפי זהות הזווית הכפולה $2\sin\alpha\cos\alpha=\sin2\alpha$, ולכן $S=a^2\sin2\alpha$ – בהתאמה לנוסחת שטח המקבילית $S=AB\cdot AD\sin\angle BAD$.`,
        ],
        finalAnswer: String.raw`$AC=2a\cos\alpha$, $BD=2a\sin\alpha$, $S=a^2\sin2\alpha$.`,
      },
      {
        id: '35581-5-6-b',
        label: 'ב',
        statement: String.raw`הוכיחו כי $AC^2-BD^2=4a^2\cos2\alpha$.`,
        hints: [
          String.raw`העלו בריבוע את הביטויים מסעיף א והוציאו גורם משותף.`,
          String.raw`$\cos2\alpha=\cos^2\alpha-\sin^2\alpha$.`,
        ],
        solutionSteps: [
          String.raw`$AC^2=4a^2\cos^2\alpha$ ו-$BD^2=4a^2\sin^2\alpha$.`,
          String.raw`$AC^2-BD^2=4a^2(\cos^2\alpha-\sin^2\alpha)$.`,
          String.raw`לפי זהות הזווית הכפולה $\cos^2\alpha-\sin^2\alpha=\cos2\alpha$, ולכן $AC^2-BD^2=4a^2\cos2\alpha$ – מ.ש.ל.`,
          String.raw`בדיקה: $AC^2+BD^2=4a^2(\cos^2\alpha+\sin^2\alpha)=4a^2$ – סכום ריבועי האלכסונים שווה לסכום ריבועי ארבע הצלעות.`,
        ],
        finalAnswer: String.raw`$AC^2-BD^2=4a^2(\cos^2\alpha-\sin^2\alpha)=4a^2\cos2\alpha$.`,
      },
      {
        id: '35581-5-6-c',
        label: 'ג',
        statement: String.raw`נתון כי שטח המעוין שווה לשטח ריבוע שצלעו $BD$. מצאו את $\alpha$.`,
        hints: [
          String.raw`כתבו: $a^2\sin2\alpha=BD^2=4a^2\sin^2\alpha$.`,
          String.raw`פתחו את $\sin2\alpha$, העבירו הכול לאגף אחד והוציאו גורם משותף $\sin\alpha$.`,
          String.raw`$\sin\alpha\ne0$ (זווית חדה), ולכן נשארת משוואה מהצורה $\cos\alpha=2\sin\alpha$ – חלקו ב-$\cos\alpha$.`,
        ],
        solutionSteps: [
          String.raw`שטח הריבוע שצלעו $BD$ הוא $BD^2=4a^2\sin^2\alpha$, ולכן התנאי הוא $a^2\sin2\alpha=4a^2\sin^2\alpha$.`,
          String.raw`מציבים $\sin2\alpha=2\sin\alpha\cos\alpha$ ומחלקים ב-$a^2$: $2\sin\alpha\cos\alpha-4\sin^2\alpha=0$, כלומר $2\sin\alpha\,(\cos\alpha-2\sin\alpha)=0$.`,
          String.raw`$\sin\alpha=0$ נפסל כי $0^\circ<\alpha<45^\circ$; נשאר $\cos\alpha=2\sin\alpha$.`,
          String.raw`$\cos\alpha\ne0$ לזווית חדה, ולכן מחלקים ב-$\cos\alpha$: $\tan\alpha=\frac12$.`,
          String.raw`$\alpha=\arctan\frac12\approx26.57^\circ$ (הפתרון היחיד בתחום $0^\circ<\alpha<45^\circ$).`,
        ],
        finalAnswer: String.raw`$\tan\alpha=\frac12$, $\alpha\approx26.57^\circ$`,
        numericAnswer: 26.56505117707799,
      },
      {
        id: '35581-5-6-d',
        label: 'ד',
        statement: String.raw`נתון גם $a=5$. חשבו את המרחק בין הצלעות $AB$ ו-$DC$.`,
        hints: [
          String.raw`המרחק בין הצלעות הנגדיות הוא גובה המקבילית: $h=AD\sin\angle BAD=a\sin2\alpha$.`,
          String.raw`אפשר לחשב $\sin2\alpha$ ישירות מהמחשבון ($2\alpha\approx53.13^\circ$) או מתוך $\tan\alpha=\frac12$ בעזרת $\sin\alpha=\frac{1}{\sqrt5}$, $\cos\alpha=\frac{2}{\sqrt5}$.`,
        ],
        solutionSteps: [
          String.raw`המרחק בין $AB$ ל-$DC$ הוא גובה המעוין $h$, והשטח הוא $S=AB\cdot h$, ולכן $h=\frac{S}{a}=\frac{a^2\sin2\alpha}{a}=a\sin2\alpha$.`,
          String.raw`מ-$\tan\alpha=\frac12$ במשולש ישר זווית עם ניצבים $1$ ו-$2$ ויתר $\sqrt5$: $\sin\alpha=\frac{1}{\sqrt5}$, $\cos\alpha=\frac{2}{\sqrt5}$, ולכן $\sin2\alpha=2\cdot\frac{1}{\sqrt5}\cdot\frac{2}{\sqrt5}=\frac45$.`,
          String.raw`$h=5\cdot\frac45=4$.`,
          String.raw`בדיקה: $AC=2\cdot5\cdot\frac{2}{\sqrt5}=4\sqrt5\approx8.94$, $BD=2\sqrt5\approx4.47$, $S=\frac12\cdot AC\cdot BD=20$, ו-$h=\frac{20}{5}=4$.`,
        ],
        finalAnswer: String.raw`$h=4$`,
        numericAnswer: 4,
      },
    ],
  },
  {
    id: '35581-5-7',
    questionnaire: '35581',
    slot: 5,
    title: 'מעגל חסום במשולש ישר-זווית',
    topicId: 'trigonometry',
    subtopicIds: ['trig-triangle-solutions', 'trig-identities', 'trig-equations', 'trig-circle-measure'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="274.7,206.0 45.3,34.0 45.3,206.0" />
  <circle cx="102.7" cy="148.7" r="57.3" stroke-width="1.5" />
  <circle cx="102.7" cy="148.7" r="2.5" fill="currentColor" />
  <line x1="274.7" y1="206.0" x2="102.7" y2="148.7" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="54.3,206.0 54.3,197.0 45.3,197.0" stroke-width="1" />
  <path d="M 253.9,190.4 A 26 26 0 0 0 248.7,206.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="280.7" y="222.0">A</text>
    <text x="29.3" y="32.0">B</text>
    <text x="27.3" y="222.0">C</text>
    <text x="108.7" y="142.7">O</text>
    <text x="232.7" y="198.7" font-size="13" font-style="italic">α</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-5-7-a',
        label: 'א',
        statement: String.raw`במשולש ישר-הזווית $ABC$ ($\angle ACB=90^\circ$) היתר הוא $AB=c$ ו-$\angle BAC=\alpha$. במשולש חסום מעגל שמרכזו $O$ ורדיוסו $r$ (ראו שרטוט).

הביעו באמצעות $c$ ו-$\alpha$ את הניצבים $BC$ ו-$AC$, והוכיחו כי $r=\frac{c\,(\sin\alpha+\cos\alpha-1)}{2}$.`,
        hints: [
          String.raw`$BC$ הוא הניצב שמול $\alpha$ ו-$AC$ הניצב שליד $\alpha$.`,
          String.raw`סמנו את נקודות ההשקה. שני המשיקים היוצאים מנקודה אחת שווים, והמרובע שקודקודיו $C$, שתי נקודות ההשקה על הניצבים ו-$O$ הוא ריבוע שצלעו $r$.`,
          String.raw`הביעו את היתר כסכום שני קטעי משיק: $c=(AC-r)+(BC-r)$.`,
        ],
        solutionSteps: [
          String.raw`במשולש ישר הזווית: $BC=c\sin\alpha$ (ניצב מול $\alpha$) ו-$AC=c\cos\alpha$ (ניצב ליד $\alpha$).`,
          String.raw`נסמן ב-$P$, $Q$ ו-$T$ את נקודות ההשקה של המעגל עם $AC$, $BC$ ו-$AB$ בהתאמה. $OP\perp AC$, $OQ\perp BC$, $OP=OQ=r$ ו-$\angle C=90^\circ$, ולכן $OPCQ$ ריבוע ו-$CP=CQ=r$.`,
          String.raw`שני משיקים היוצאים מאותה נקודה שווים: $AT=AP=AC-r$ ו-$BT=BQ=BC-r$.`,
          String.raw`$c=AB=AT+BT=(AC-r)+(BC-r)=AC+BC-2r$.`,
          String.raw`מכאן $r=\frac{AC+BC-c}{2}=\frac{c\cos\alpha+c\sin\alpha-c}{2}=\frac{c\,(\sin\alpha+\cos\alpha-1)}{2}$ – מ.ש.ל.`,
        ],
        finalAnswer: String.raw`$BC=c\sin\alpha$, $AC=c\cos\alpha$, $r=\frac{c(\sin\alpha+\cos\alpha-1)}{2}$.`,
      },
      {
        id: '35581-5-7-b',
        label: 'ב',
        statement: String.raw`נתון כי $r=\frac{c}{5}$ וכי $\alpha<45^\circ$. הוכיחו כי $\sin2\alpha=\frac{24}{25}$ ומצאו את $\alpha$.`,
        hints: [
          String.raw`מהנתון: $\sin\alpha+\cos\alpha=\frac75$. העלו בריבוע את שני האגפים.`,
          String.raw`$\sin^2\alpha+\cos^2\alpha=1$ ו-$2\sin\alpha\cos\alpha=\sin2\alpha$.`,
          String.raw`למשוואה $\sin2\alpha=\frac{24}{25}$ יש שני פתרונות ב-$0^\circ<2\alpha<180^\circ$; בחרו לפי $\alpha<45^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$\frac{c(\sin\alpha+\cos\alpha-1)}{2}=\frac{c}{5}$, ולכן $\sin\alpha+\cos\alpha-1=\frac25$, כלומר $\sin\alpha+\cos\alpha=\frac75$.`,
          String.raw`מעלים בריבוע (מותר – שני האגפים חיוביים לזווית חדה): $\sin^2\alpha+2\sin\alpha\cos\alpha+\cos^2\alpha=\frac{49}{25}$.`,
          String.raw`לפי הזהות $\sin^2\alpha+\cos^2\alpha=1$ ולפי $2\sin\alpha\cos\alpha=\sin2\alpha$: $1+\sin2\alpha=\frac{49}{25}$, ולכן $\sin2\alpha=\frac{24}{25}$ – מ.ש.ל.`,
          String.raw`$0^\circ<2\alpha<180^\circ$, ולכן $2\alpha=\arcsin\frac{24}{25}\approx73.74^\circ$ או $2\alpha=180^\circ-73.74^\circ=106.26^\circ$.`,
          String.raw`$\alpha<45^\circ$ פירושו $2\alpha<90^\circ$, ולכן $2\alpha\approx73.74^\circ$ ו-$\alpha\approx36.87^\circ$.`,
          String.raw`בדיקה: $\sin36.87^\circ+\cos36.87^\circ=0.6+0.8=1.4=\frac75$ (זהו המשולש $3$-$4$-$5$).`,
        ],
        finalAnswer: String.raw`$\sin2\alpha=\frac{24}{25}$, $\alpha\approx36.87^\circ$`,
        numericAnswer: 36.86989764584402,
      },
      {
        id: '35581-5-7-c',
        label: 'ג',
        statement: String.raw`נתון: $c=10$. חשבו את שטח החלק של המשולש שמחוץ למעגל.`,
        hints: [
          String.raw`חשבו את הניצבים ואת $r$ מסעיפים א ו-ב.`,
          String.raw`השטח המבוקש הוא שטח המשולש פחות שטח העיגול $\pi r^2$.`,
        ],
        solutionSteps: [
          String.raw`$BC=10\sin36.87^\circ=10\cdot0.6=6$, $AC=10\cos36.87^\circ=10\cdot0.8=8$.`,
          String.raw`$r=\frac{c}{5}=2$ (ואכן $\frac{6+8-10}{2}=2$).`,
          String.raw`$S_{ABC}=\frac12\cdot6\cdot8=24$; שטח העיגול $\pi r^2=4\pi\approx12.57$.`,
          String.raw`השטח המבוקש: $24-4\pi\approx11.43$.`,
        ],
        finalAnswer: String.raw`$24-4\pi\approx11.43$`,
        numericAnswer: 11.433629385640828,
      },
      {
        id: '35581-5-7-d',
        label: 'ד',
        statement: String.raw`חשבו את המרחק $AO$ ממרכז המעגל לקודקוד $A$.`,
        hints: [
          String.raw`$O$ נמצא על חוצה הזווית $\angle BAC$, ולכן $\angle OAP=\frac{\alpha}{2}$ כאשר $P$ נקודת ההשקה על $AC$.`,
          String.raw`במשולש ישר הזווית $OPA$: $OP=r$ ו-$AP=AC-r$.`,
        ],
        solutionSteps: [
          String.raw`מרכז המעגל החסום נמצא על חוצי הזוויות, ולכן $\angle OAP=\frac{\alpha}{2}\approx18.43^\circ$.`,
          String.raw`במשולש ישר הזווית $OPA$ ($OP\perp AC$): $AP=AC-r=8-2=6$ ו-$OP=r=2$.`,
          String.raw`לפי משפט פיתגורס: $AO=\sqrt{AP^2+OP^2}=\sqrt{36+4}=\sqrt{40}=2\sqrt{10}\approx6.32$.`,
          String.raw`בדיקה טריגונומטרית: $AO=\frac{r}{\sin\frac{\alpha}{2}}\approx\frac{2}{\sin18.43^\circ}\approx\frac{2}{0.3162}\approx6.32$.`,
        ],
        finalAnswer: String.raw`$AO=2\sqrt{10}\approx6.32$`,
        numericAnswer: 6.324555320336759,
      },
    ],
  },
  {
    id: '35581-5-8',
    questionnaire: '35581',
    slot: 5,
    title: 'מחומש משוכלל החסום במעגל',
    topicId: 'trigonometry',
    subtopicIds: ['trig-triangle-solutions', 'trig-identities', 'trig-circle-measure', 'trig-geometry-problems'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="98.0" stroke-width="1.5" />
  <polygon points="160.0,22.0 66.8,89.7 102.4,199.3 217.6,199.3 253.2,89.7" />
  <line x1="160.0" y1="120.0" x2="160.0" y2="22.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="160.0" y1="120.0" x2="66.8" y2="89.7" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="160.0" y1="22.0" x2="102.4" y2="199.3" stroke-width="1.5" />
  <circle cx="160.0" cy="120.0" r="2.5" fill="currentColor" />
  <path d="M 160.0,102.0 A 18 18 0 0 0 142.9,114.4" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="155.0" y="16.0">A</text>
    <text x="48.8" y="91.7">B</text>
    <text x="88.4" y="215.3">C</text>
    <text x="221.6" y="215.3">D</text>
    <text x="260.2" y="91.7">E</text>
    <text x="166.0" y="134.0">O</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-5-8-a',
        label: 'א',
        statement: String.raw`המחומש המשוכלל $ABCDE$ חסום במעגל שמרכזו $O$ ורדיוסו $R$ (ראו שרטוט).

הביעו באמצעות $R$ את אורך הצלע $AB$ ואת אורך האלכסון $AC$.`,
        hints: [
          String.raw`במחומש משוכלל חמש הצלעות שוות, ולכן הזווית המרכזית הנשענת על צלע היא $\frac{360^\circ}{5}=72^\circ$.`,
          String.raw`במשולש שווה-השוקיים $AOB$ הגובה מ-$O$ חוצה את הזווית: $AB=2R\sin36^\circ$.`,
          String.raw`האלכסון $AC$ נשען על קשת של שתי צלעות, כלומר על זווית מרכזית $144^\circ$.`,
        ],
        solutionSteps: [
          String.raw`חמש הצלעות שוות, ולכן הקשתות שוות והזווית המרכזית הנשענת על כל צלע היא $\angle AOB=\frac{360^\circ}{5}=72^\circ$.`,
          String.raw`במשולש שווה-השוקיים $AOB$ ($OA=OB=R$) הגובה מ-$O$ חוצה את הזווית ואת הבסיס, ולכן $AB=2R\sin\frac{72^\circ}{2}=2R\sin36^\circ$.`,
          String.raw`האלכסון $AC$ נשען על זווית מרכזית $\angle AOC=2\cdot72^\circ=144^\circ$, ובאותו אופן $AC=2R\sin72^\circ$.`,
          String.raw`דרך שנייה: במשולש $ABC$ לפי משפט הסינוסים $AC=2R\sin\angle ABC$, כאשר $\angle ABC=108^\circ$ ו-$\sin108^\circ=\sin72^\circ$.`,
        ],
        finalAnswer: String.raw`$AB=2R\sin36^\circ$, $AC=2R\sin72^\circ$.`,
      },
      {
        id: '35581-5-8-b',
        label: 'ב',
        statement: String.raw`הוכיחו כי $\frac{AC}{AB}=2\cos36^\circ$.`,
        hints: [
          String.raw`$72^\circ=2\cdot36^\circ$; השתמשו בזהות הזווית הכפולה.`,
          String.raw`$\sin72^\circ=2\sin36^\circ\cos36^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$\frac{AC}{AB}=\frac{2R\sin72^\circ}{2R\sin36^\circ}=\frac{\sin72^\circ}{\sin36^\circ}$.`,
          String.raw`לפי זהות הזווית הכפולה: $\sin72^\circ=\sin(2\cdot36^\circ)=2\sin36^\circ\cos36^\circ$.`,
          String.raw`$\frac{AC}{AB}=\frac{2\sin36^\circ\cos36^\circ}{\sin36^\circ}=2\cos36^\circ\approx1.618$ – מ.ש.ל. (זהו יחס הזהב.)`,
        ],
        finalAnswer: String.raw`$\frac{AC}{AB}=2\cos36^\circ$.`,
      },
      {
        id: '35581-5-8-c',
        label: 'ג',
        statement: String.raw`נתון: $R=6$. חשבו את שטח המחומש.`,
        hints: [
          String.raw`המחומש מתפרק לחמישה משולשים שווי-שוקיים חופפים שקודקודם $O$.`,
          String.raw`$S_{AOB}=\frac12R^2\sin72^\circ$.`,
        ],
        solutionSteps: [
          String.raw`הרדיוסים לקודקודים מחלקים את המחומש לחמישה משולשים חופפים כמו $AOB$, שבכל אחד מהם שתי צלעות $R$ וביניהן זווית $72^\circ$.`,
          String.raw`$S_{AOB}=\frac12\cdot R\cdot R\sin72^\circ=\frac12\cdot36\cdot0.9511\approx17.12$.`,
          String.raw`$S=5\cdot S_{AOB}=\frac52\cdot36\sin72^\circ=90\sin72^\circ\approx85.60$.`,
          String.raw`לשם השוואה, שטח המעגל הוא $36\pi\approx113.10$, והמחומש מכסה כ-$75.7\%$ ממנו.`,
        ],
        finalAnswer: String.raw`$S=90\sin72^\circ\approx85.60$`,
        numericAnswer: 85.59508646656381,
      },
      {
        id: '35581-5-8-d',
        label: 'ד',
        statement: String.raw`מעגל נוסף חסום במחומש (משיק לכל חמש צלעותיו). חשבו את היחס בין שטח המעגל החסום לשטח המעגל החוסם.`,
        hints: [
          String.raw`רדיוס המעגל החסום הוא המרחק מ-$O$ לצלע – הגובה $OM$ במשולש $AOB$.`,
          String.raw`$OM=R\cos36^\circ$.`,
          String.raw`יחס שטחי עיגולים שווה לריבוע יחס הרדיוסים.`,
        ],
        solutionSteps: [
          String.raw`בגלל הסימטריה, מרכז המעגל החסום הוא $O$, ורדיוסו $r$ הוא המרחק מ-$O$ לצלע, כלומר הגובה $OM$ במשולש $AOB$ ($M$ אמצע $AB$).`,
          String.raw`במשולש ישר הזווית $OMA$: $\angle AOM=36^\circ$, ולכן $r=OM=R\cos36^\circ$.`,
          String.raw`$\frac{\pi r^2}{\pi R^2}=\frac{R^2\cos^236^\circ}{R^2}=\cos^236^\circ\approx0.8090^2\approx0.6545$.`,
          String.raw`עבור $R=6$: $r\approx4.854$, שטח המעגל החסום $\approx74.02$ לעומת $\approx113.10$ – היחס כ-$65.45\%$.`,
        ],
        finalAnswer: String.raw`$\cos^236^\circ\approx0.65$ (כ-$65.45\%$)`,
        numericAnswer: 0.6545084971874735,
      },
    ],
  },
  {
    id: '35581-5-9',
    questionnaire: '35581',
    slot: 5,
    title: 'גובה במשולש וזהות הסינוס של סכום זוויות',
    topicId: 'trigonometry',
    subtopicIds: ['trig-triangle-solutions', 'trig-identities', 'trig-identities-angle', 'trig-geometry-problems'],
    difficulty: 3,
    estimatedMinutes: 30,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="215.1,44.0 34.0,196.0 286.0,196.0" />
  <line x1="215.1" y1="44.0" x2="215.1" y2="196.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="215.1,187.0 224.1,187.0 224.1,196.0" stroke-width="1" />
  <path d="M 56.0,196.0 A 22 22 0 0 0 50.9,181.9" stroke-width="1.2" />
  <path d="M 276.7,176.1 A 22 22 0 0 0 264.0,196.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="210.1" y="36.0">A</text>
    <text x="16.0" y="212.0">B</text>
    <text x="292.0" y="212.0">C</text>
    <text x="209.1" y="216.0">D</text>
    <text x="60.0" y="189.7" font-size="13" font-style="italic">α</text>
    <text x="253.2" y="183.3" font-size="13" font-style="italic">β</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-5-9-a',
        label: 'א',
        statement: String.raw`במשולש חד-הזוויות $ABC$ נתון $\angle ABC=\alpha$, $\angle ACB=\beta$, והגובה $AD$ לצלע $BC$ שווה ל-$h$ (ראו שרטוט).

הביעו באמצעות $h$, $\alpha$ ו-$\beta$ את $BD$ ואת $DC$, והוכיחו כי $BC=\frac{h\sin(\alpha+\beta)}{\sin\alpha\sin\beta}$.`,
        hints: [
          String.raw`במשולש ישר הזווית $ABD$: $\tan\alpha=\frac{AD}{BD}$.`,
          String.raw`$BC=BD+DC=\frac{h}{\tan\alpha}+\frac{h}{\tan\beta}$; כתבו $\tan$ כמנה של $\sin$ ו-$\cos$ ומצאו מכנה משותף.`,
          String.raw`$\sin\alpha\cos\beta+\cos\alpha\sin\beta=\sin(\alpha+\beta)$.`,
        ],
        solutionSteps: [
          String.raw`המשולש חד-זווית, ולכן $D$ בין $B$ ל-$C$ ו-$BC=BD+DC$.`,
          String.raw`במשולש ישר הזווית $ABD$: $\tan\alpha=\frac{AD}{BD}=\frac{h}{BD}$, ולכן $BD=\frac{h}{\tan\alpha}=\frac{h\cos\alpha}{\sin\alpha}$. באופן דומה $DC=\frac{h\cos\beta}{\sin\beta}$.`,
          String.raw`$BC=\frac{h\cos\alpha}{\sin\alpha}+\frac{h\cos\beta}{\sin\beta}=\frac{h(\cos\alpha\sin\beta+\sin\alpha\cos\beta)}{\sin\alpha\sin\beta}$.`,
          String.raw`לפי זהות הסינוס של סכום: $\sin\alpha\cos\beta+\cos\alpha\sin\beta=\sin(\alpha+\beta)$, ולכן $BC=\frac{h\sin(\alpha+\beta)}{\sin\alpha\sin\beta}$ – מ.ש.ל.`,
        ],
        finalAnswer: String.raw`$BD=\frac{h\cos\alpha}{\sin\alpha}$, $DC=\frac{h\cos\beta}{\sin\beta}$, $BC=\frac{h\sin(\alpha+\beta)}{\sin\alpha\sin\beta}$.`,
      },
      {
        id: '35581-5-9-b',
        label: 'ב',
        statement: String.raw`הוכיחו כי $AB\cdot AC\cdot\sin(\alpha+\beta)=h\cdot BC$.`,
        hints: [
          String.raw`חשבו את שטח המשולש $ABC$ בשתי דרכים: בעזרת הגובה $h$ ובעזרת שתי צלעות והזווית שביניהן.`,
          String.raw`$\angle BAC=180^\circ-(\alpha+\beta)$ ו-$\sin(180^\circ-x)=\sin x$.`,
        ],
        solutionSteps: [
          String.raw`סכום הזוויות במשולש: $\angle BAC=180^\circ-\alpha-\beta=180^\circ-(\alpha+\beta)$.`,
          String.raw`לפי הקשר בין זוויות משלימות ל-$180^\circ$: $\sin\angle BAC=\sin(180^\circ-(\alpha+\beta))=\sin(\alpha+\beta)$.`,
          String.raw`שטח המשולש בשתי דרכים: $S=\frac12\cdot BC\cdot h$ וגם $S=\frac12\cdot AB\cdot AC\sin\angle BAC=\frac12\cdot AB\cdot AC\sin(\alpha+\beta)$.`,
          String.raw`משווים ומכפילים ב-$2$: $AB\cdot AC\cdot\sin(\alpha+\beta)=h\cdot BC$ – מ.ש.ל.`,
          String.raw`בדיקה: $AB=\frac{h}{\sin\alpha}$, $AC=\frac{h}{\sin\beta}$, ולכן אגף שמאל הוא $\frac{h^2\sin(\alpha+\beta)}{\sin\alpha\sin\beta}=h\cdot BC$ לפי סעיף א.`,
        ],
        finalAnswer: String.raw`$AB\cdot AC\sin(\alpha+\beta)=h\cdot BC$ (שטח בשתי דרכים).`,
      },
      {
        id: '35581-5-9-c',
        label: 'ג',
        statement: String.raw`נתון: $h=6$, $\alpha=40^\circ$, $\beta=65^\circ$. חשבו את אורך הצלע $BC$.`,
        hints: [
          String.raw`הציבו בנוסחה מסעיף א, או חשבו $BD$ ו-$DC$ בנפרד וחברו.`,
          String.raw`$\sin105^\circ=\sin75^\circ$.`,
        ],
        solutionSteps: [
          String.raw`$\alpha+\beta=105^\circ$, $\sin105^\circ=\sin75^\circ\approx0.9659$.`,
          String.raw`$\sin40^\circ\approx0.6428$, $\sin65^\circ\approx0.9063$.`,
          String.raw`$BC=\frac{6\cdot0.9659}{0.6428\cdot0.9063}\approx\frac{5.796}{0.5826}\approx9.95$.`,
          String.raw`בדיקה: $BD=\frac{6}{\tan40^\circ}\approx7.151$, $DC=\frac{6}{\tan65^\circ}\approx2.798$, וסכומם $\approx9.95$.`,
        ],
        finalAnswer: String.raw`$BC\approx9.95$`,
        numericAnswer: 9.948367504495252,
      },
      {
        id: '35581-5-9-d',
        label: 'ד',
        statement: String.raw`חשבו את רדיוס המעגל החוסם את המשולש $ABC$.`,
        hints: [
          String.raw`משפט הסינוסים: $\frac{BC}{\sin\angle BAC}=2R$.`,
          String.raw`$\sin\angle BAC=\sin(\alpha+\beta)$ (סעיף ב).`,
        ],
        solutionSteps: [
          String.raw`$\angle BAC=180^\circ-40^\circ-65^\circ=75^\circ$.`,
          String.raw`לפי משפט הסינוסים: $2R=\frac{BC}{\sin75^\circ}\approx\frac{9.948}{0.9659}\approx10.30$.`,
          String.raw`$R\approx5.15$.`,
          String.raw`באופן כללי: $2R=\frac{BC}{\sin(\alpha+\beta)}=\frac{h}{\sin\alpha\sin\beta}$, ואכן $\frac{6}{0.6428\cdot0.9063}\approx10.30$.`,
        ],
        finalAnswer: String.raw`$R\approx5.15$`,
        numericAnswer: 5.149653955684816,
      },
    ],
  },
  {
    id: '35581-5-10',
    questionnaire: '35581',
    slot: 5,
    title: 'גזרה, מיתר וקטע מעגל ברדיאנים',
    topicId: 'trigonometry',
    subtopicIds: ['trig-circle-measure', 'trig-equations', 'trig-triangle-solutions', 'trig-geometry-problems'],
    difficulty: 2,
    estimatedMinutes: 25,
    verified: false,
    source: 'ai-generated',
    figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="98.0" stroke-width="1" stroke-dasharray="3 4" />
  <path d="M 160.0,120.0 L 84.9,57.0 A 98.0 98.0 0 0 1 235.1,57.0 Z" />
  <line x1="84.9" y1="57.0" x2="235.1" y2="57.0" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="160.0" y2="57.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <circle cx="160.0" cy="120.0" r="2.5" fill="currentColor" />
  <path d="M 176.9,105.9 A 22 22 0 0 0 143.1,105.9" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="154.0" y="138.0">O</text>
    <text x="66.9" y="57.0">A</text>
    <text x="243.1" y="57.0">B</text>
    <text x="155.0" y="49.0">M</text>
    <text x="168.0" y="96.0" font-size="13" font-style="italic">θ</text>
  </g>
</svg>`,
    sections: [
      {
        id: '35581-5-10-a',
        label: 'א',
        statement: String.raw`במעגל שמרכזו $O$ ורדיוסו $R$ נתונה הגזרה $OAB$ שזוויתה המרכזית היא $\angle AOB=\theta$ רדיאנים ($0<\theta<\pi$). $M$ היא אמצע המיתר $AB$ (ראו שרטוט).

הביעו באמצעות $R$ ו-$\theta$ את אורך המיתר $AB$, את שטח הגזרה $OAB$ ואת שטח קטע המעגל הכלוא בין המיתר $AB$ לקשת $AB$.`,
        hints: [
          String.raw`במשולש שווה-השוקיים $AOB$ הקטע $OM$ הוא גובה וחוצה זווית, ולכן $\angle AOM=\frac{\theta}{2}$.`,
          String.raw`שטח גזרה: $\frac12R^2\theta$ ($\theta$ ברדיאנים); שטח המשולש $AOB$: $\frac12R^2\sin\theta$.`,
          String.raw`שטח קטע המעגל = שטח הגזרה פחות שטח המשולש $AOB$.`,
        ],
        solutionSteps: [
          String.raw`$OA=OB=R$, ולכן המשולש $AOB$ שווה-שוקיים והתיכון $OM$ הוא גם גובה וחוצה זווית: $\angle AOM=\frac{\theta}{2}$, $\angle OMA=\frac{\pi}{2}$.`,
          String.raw`במשולש ישר הזווית $OMA$: $AM=R\sin\frac{\theta}{2}$, ולכן $AB=2R\sin\frac{\theta}{2}$.`,
          String.raw`שטח הגזרה שזוויתה $\theta$ רדיאנים הוא $\frac12R^2\theta$.`,
          String.raw`שטח המשולש $AOB$ לפי שתי צלעות והזווית שביניהן: $S_{AOB}=\frac12R^2\sin\theta$.`,
          String.raw`שטח קטע המעגל הוא ההפרש: $\frac12R^2\theta-\frac12R^2\sin\theta=\frac12R^2(\theta-\sin\theta)$.`,
        ],
        finalAnswer: String.raw`$AB=2R\sin\frac{\theta}{2}$; שטח הגזרה $\frac12R^2\theta$; שטח קטע המעגל $\frac12R^2(\theta-\sin\theta)$.`,
      },
      {
        id: '35581-5-10-b',
        label: 'ב',
        statement: String.raw`נתון: $R=6$ ו-$\theta=\frac{2\pi}{3}$. חשבו את היקף קטע המעגל (סכום אורך הקשת $AB$ ואורך המיתר $AB$).`,
        hints: [
          String.raw`אורך קשת: $l=R\theta$ ($\theta$ ברדיאנים).`,
          String.raw`$\sin\frac{\pi}{3}=\frac{\sqrt3}{2}$.`,
        ],
        solutionSteps: [
          String.raw`אורך הקשת: $l=R\theta=6\cdot\frac{2\pi}{3}=4\pi\approx12.57$.`,
          String.raw`אורך המיתר: $AB=2R\sin\frac{\theta}{2}=12\sin\frac{\pi}{3}=12\cdot\frac{\sqrt3}{2}=6\sqrt3\approx10.39$.`,
          String.raw`ההיקף: $4\pi+6\sqrt3\approx12.57+10.39\approx22.96$.`,
        ],
        finalAnswer: String.raw`$4\pi+6\sqrt3\approx22.96$`,
        numericAnswer: 22.958675459772437,
      },
      {
        id: '35581-5-10-c',
        label: 'ג',
        statement: String.raw`נתון כי שטח המשולש $AOB$ שווה ל-$\frac{R^2}{4}$. מצאו את כל הערכים האפשריים של $\theta$ ($0<\theta<\pi$).`,
        hints: [
          String.raw`$\frac12R^2\sin\theta=\frac{R^2}{4}$.`,
          String.raw`למשוואה $\sin\theta=\frac12$ יש שני פתרונות בתחום $(0,\pi)$.`,
        ],
        solutionSteps: [
          String.raw`$S_{AOB}=\frac12R^2\sin\theta=\frac{R^2}{4}$, ולכן $\sin\theta=\frac12$.`,
          String.raw`הפתרון הכללי: $\theta=\frac{\pi}{6}+2\pi k$ או $\theta=\pi-\frac{\pi}{6}+2\pi k=\frac{5\pi}{6}+2\pi k$.`,
          String.raw`בתחום $0<\theta<\pi$ (עם $k=0$): $\theta=\frac{\pi}{6}$ או $\theta=\frac{5\pi}{6}$.`,
          String.raw`שני הערכים אפשריים: לזווית חדה ולזווית הקהה המשלימה אותה ל-$\pi$ יש אותו סינוס, ולכן למשולשים $AOB$ המתאימים אותו שטח – אך קטעי המעגל שונים מאוד.`,
        ],
        finalAnswer: String.raw`$\theta=\frac{\pi}{6}$ או $\theta=\frac{5\pi}{6}$.`,
      },
      {
        id: '35581-5-10-d',
        label: 'ד',
        statement: String.raw`עבור הערך הגדול מבין השניים שמצאתם בסעיף ג ועבור $R=6$, חשבו את שטח קטע המעגל הכלוא בין המיתר $AB$ לקשת $AB$.`,
        hints: [
          String.raw`הציבו $\theta=\frac{5\pi}{6}$ בנוסחה מסעיף א.`,
          String.raw`$\sin\frac{5\pi}{6}=\frac12$.`,
        ],
        solutionSteps: [
          String.raw`$\theta=\frac{5\pi}{6}\approx2.618$ רדיאנים, $\sin\frac{5\pi}{6}=\frac12$.`,
          String.raw`שטח הגזרה: $\frac12\cdot36\cdot\frac{5\pi}{6}=15\pi\approx47.12$; שטח המשולש $AOB$: $\frac12\cdot36\cdot\frac12=9$ (וזהו אכן $\frac{R^2}{4}$).`,
          String.raw`שטח קטע המעגל: $15\pi-9\approx38.12$.`,
          String.raw`לשם השוואה, עבור $\theta=\frac{\pi}{6}$: $\frac12\cdot36\left(\frac{\pi}{6}-\frac12\right)=3\pi-9\approx0.42$ בלבד.`,
        ],
        finalAnswer: String.raw`$15\pi-9\approx38.12$`,
        numericAnswer: 38.123889803846886,
      },
    ],
  },
];
