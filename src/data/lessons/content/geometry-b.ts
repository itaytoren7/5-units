import type { LessonContent } from '../types';

/**
 * גאומטריה אוקלידית – חלק ב: שטחים, שטח מעגל, תאלס, חוצה זווית ודמיון משולשים (שאלה 4 בשאלון 806).
 * כל שרטוט צויר בקנה מידה ממודל קואורדינטות קונקרטי; אותם מודלים משמשים לבדיקה ב-geometry-b.test.ts.
 */
export const geometryBContent: Record<string, LessonContent> = {
  'geo-areas-basic': {
    intro: String.raw`בשיעור זה מחשבים שטחים של משולשים ומרובעים: בוחרים צלע כבסיס, מוצאים את הגובה המתאים לה (לרוב בעזרת משפט פיתגורס) ומציבים בנוסחה. רעיון מרכזי: את השטח של אותו מצולע אפשר לכתוב בשתי דרכים – עם בסיס אחר והגובה אליו – וכך מוצאים גובה חסר. בבגרות, בשאלה 4 בשאלון 806, חישוב שטח מופיע לרוב בסעיף האחרון, אחרי סעיפי ההוכחה.`,
    keyFacts: [
      String.raw`**משולש**: $S=\frac{a\cdot h_a}{2}$ – צלע כפול הגובה **אליה**, חלקי 2. במשולש ישר זווית השטח הוא מכפלת הניצבים חלקי 2.`,
      String.raw`**מקבילית**: $S=a\cdot h_a=b\cdot h_b$; במלבן $S=ab$.`,
      String.raw`**טרפז**: $S=\frac{(a+b)\cdot h}{2}$, כאשר $a,b$ הבסיסים ו-$h$ המרחק ביניהם (ובמילים אחרות: קטע האמצעים כפול הגובה).`,
      String.raw`**מעוין, דלתון וכל מרובע שאלכסוניו מאונכים**: $S=\frac{d_1\cdot d_2}{2}$. במעוין האלכסונים גם חוצים זה את זה, ולכן $a^2=\left(\frac{d_1}{2}\right)^2+\left(\frac{d_2}{2}\right)^2$.`,
      String.raw`**שטח בשתי דרכים**: $a\cdot h_a=b\cdot h_b$ – כך מוצאים גובה חסר. במשולש ישר זווית: הגובה ליתר = מכפלת הניצבים חלקי היתר.`,
      String.raw`**גובה חסר**: מורידים גובה, מקבלים משולש ישר זווית ומשתמשים במשפט פיתגורס. בטרפז שווה שוקיים ההיטל של כל שוק על הבסיס הגדול הוא $\frac{a-b}{2}$.`,
    ],
    exercises: [
      {
        id: 'geo-areas-basic-1',
        difficulty: 1,
        statement: String.raw`במעוין $ABCD$ אורכי האלכסונים הם $AC=24$ ו-$BD=10$, והם נפגשים בנקודה $O$ (ראו שרטוט). חשבו את שטח המעוין ואת אורך צלעו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.0,120.0 160.0,64.2 294.0,120.0 160.0,175.8" />
  <line x1="26.0" y1="120.0" x2="294.0" y2="120.0" stroke-width="1.5" />
  <line x1="160.0" y1="64.2" x2="160.0" y2="175.8" stroke-width="1.5" />
  <polyline points="168.0,120.0 168.0,112.0 160.0,112.0" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="7.5" y="126.0">A</text>
    <text x="154.5" y="57.2">B</text>
    <text x="301.5" y="126.0">C</text>
    <text x="154.5" y="194.8">D</text>
    <text x="163.7" y="135.2">O</text>
  </g>
</svg>`,
        hints: [
          'שטח מרובע שאלכסוניו מאונכים הוא מחצית מכפלת האלכסונים.',
          String.raw`במעוין האלכסונים חוצים זה את זה ומאונכים זה לזה, לכן $AO=12$, $BO=5$ ו-$\angle AOB=90^\circ$.`,
        ],
        solutionSteps: [
          String.raw`אלכסוני המעוין מאונכים זה לזה, ולכן $S_{ABCD}=\frac{AC\cdot BD}{2}=\frac{24\cdot10}{2}=120$.`,
          String.raw`במעוין האלכסונים חוצים זה את זה: $AO=\frac{24}{2}=12$, $BO=\frac{10}{2}=5$, ו-$\angle AOB=90^\circ$.`,
          String.raw`לפי משפט פיתגורס במשולש $AOB$: $AB=\sqrt{12^2+5^2}=\sqrt{169}=13$.`,
        ],
        finalAnswer: String.raw`$S_{ABCD}=120$, אורך הצלע $13$.`,
        answers: [
          { label: String.raw`$S_{ABCD}$`, value: 120 },
          { label: String.raw`$AB$`, value: 13 },
        ],
      },
      {
        id: 'geo-areas-basic-2',
        difficulty: 1,
        statement: String.raw`במקבילית $ABCD$ נתון: $AB=12$, $AD=10$. $DE$ הוא הגובה לצלע $AB$ ו-$BF$ הוא הגובה לצלע $AD$ (ראו שרטוט). נתון $DE=8$. חשבו את שטח המקבילית ואת אורך הגובה $BF$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.0,179.6 204.7,179.6 294.0,60.4 115.3,60.4" />
  <line x1="115.3" y1="60.4" x2="115.3" y2="179.6" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="204.7" y1="179.6" x2="90.3" y2="93.8" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="123.3,179.6 123.3,171.6 115.3,171.6" stroke-width="1" />
  <polyline points="85.5,100.2 91.9,105.0 96.7,98.6" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="11.3" y="194.7">A</text>
    <text x="208.4" y="194.7">B</text>
    <text x="297.7" y="57.3">C</text>
    <text x="109.8" y="53.4">D</text>
    <text x="109.8" y="198.6">E</text>
    <text x="75.6" y="90.6">F</text>
  </g>
</svg>`,
        hints: [
          'שטח מקבילית = צלע כפול הגובה אליה.',
          String.raw`כתבו את השטח פעם עם $AB$ ו-$DE$, ופעם עם $AD$ ו-$BF$.`,
        ],
        solutionSteps: [
          String.raw`שטח מקבילית שווה למכפלת צלע בגובה אליה: $S_{ABCD}=AB\cdot DE=12\cdot8=96$.`,
          String.raw`אותו שטח מתקבל גם מהצלע $AD$ והגובה אליה: $S_{ABCD}=AD\cdot BF=10\cdot BF$.`,
          String.raw`לכן $10\cdot BF=96$, כלומר $BF=9.6$.`,
        ],
        finalAnswer: String.raw`$S_{ABCD}=96$, $BF=9.6$.`,
        answers: [
          { label: String.raw`$S_{ABCD}$`, value: 96 },
          { label: String.raw`$BF$`, value: 9.6 },
        ],
      },
      {
        id: 'geo-areas-basic-3',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ הזווית $C$ ישרה, $AC=9$ ו-$AB=15$. $CD$ הוא הגובה ליתר (ראו שרטוט). חשבו את $BC$, את שטח המשולש ואת אורך הגובה $CD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="34.7,26.0 285.3,214.0 34.7,214.0" />
  <line x1="34.7" y1="214.0" x2="124.9" y2="93.7" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="34.7,206.0 42.7,206.0 42.7,214.0" stroke-width="1" />
  <polyline points="131.3,98.5 126.5,104.9 120.1,100.1" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="20.0" y="22.8">A</text>
    <text x="289.0" y="229.2">B</text>
    <text x="20.0" y="229.2">C</text>
    <text x="128.6" y="90.5">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`מצאו את $BC$ בעזרת משפט פיתגורס.`,
          'במשולש ישר זווית כל ניצב הוא הגובה לניצב האחר, ולכן השטח הוא מחצית מכפלת הניצבים.',
          String.raw`כתבו את השטח גם כ-$\frac{AB\cdot CD}{2}$ והשוו.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט פיתגורס: $BC=\sqrt{AB^2-AC^2}=\sqrt{225-81}=\sqrt{144}=12$.`,
          String.raw`הניצבים מאונכים זה לזה, ולכן $AC$ הוא הגובה לצלע $BC$: $S_{ABC}=\frac{AC\cdot BC}{2}=\frac{9\cdot12}{2}=54$.`,
          String.raw`$CD$ הוא הגובה לצלע $AB$, לכן גם $S_{ABC}=\frac{AB\cdot CD}{2}=\frac{15\cdot CD}{2}$.`,
          String.raw`$\frac{15\cdot CD}{2}=54\ \Rightarrow\ CD=\frac{108}{15}=7.2$.`,
        ],
        finalAnswer: String.raw`$BC=12$, $S_{ABC}=54$, $CD=7.2$.`,
        answers: [
          { label: String.raw`$BC$`, value: 12 },
          { label: String.raw`$S_{ABC}$`, value: 54 },
          { label: String.raw`$CD$`, value: 7.2 },
        ],
      },
      {
        id: 'geo-areas-basic-4',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא טרפז שווה שוקיים ($AB\parallel DC$) שבו $AB=20$, $DC=8$ ו-$AD=BC=10$. $DE$ הוא גובה הטרפז (ראו שרטוט). חשבו את גובה הטרפז ואת שטחו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.0,173.6 294.0,173.6 213.6,66.4 106.4,66.4" />
  <line x1="106.4" y1="66.4" x2="106.4" y2="173.6" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="114.4,173.6 114.4,165.6 106.4,165.6" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="11.3" y="188.8">A</text>
    <text x="297.7" y="188.8">B</text>
    <text x="217.3" y="63.2">C</text>
    <text x="91.7" y="63.2">D</text>
    <text x="100.9" y="192.6">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`הורידו גם את הגובה $CF$. בטרפז שווה שוקיים ההיטל של כל שוק על הבסיס הגדול הוא $\frac{AB-DC}{2}$.`,
          String.raw`מצאו את $AE$, ואז את $DE$ בעזרת משפט פיתגורס במשולש $ADE$.`,
        ],
        solutionSteps: [
          String.raw`נוריד גם את הגובה $CF$ לבסיס $AB$. $DEFC$ הוא מלבן (מרובע עם שלוש זוויות ישרות), לכן $EF=DC=8$ ו-$DE=CF$ (צלעות נגדיות במלבן).`,
          String.raw`המשולשים הישרי-זווית $ADE$ ו-$BCF$ חופפים לפי צ.צ.ז ($AD=BC$, $DE=CF$, והזווית הישרה מול היתר – הצלע הגדולה), ולכן $AE=BF=\frac{20-8}{2}=6$.`,
          String.raw`לפי משפט פיתגורס במשולש $ADE$: $DE=\sqrt{10^2-6^2}=8$.`,
          String.raw`$S_{ABCD}=\frac{(AB+DC)\cdot DE}{2}=\frac{(20+8)\cdot8}{2}=112$.`,
        ],
        finalAnswer: String.raw`גובה הטרפז $8$, השטח $112$.`,
        answers: [
          { label: String.raw`$DE$`, value: 8 },
          { label: String.raw`$S_{ABCD}$`, value: 112 },
        ],
      },
      {
        id: 'geo-areas-basic-5',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא דלתון שבו $AB=AD=10$ ו-$CB=CD=17$. אורך האלכסון $BD$ הוא $16$ (ראו שרטוט). חשבו את אורך האלכסון $AC$ ואת שטח הדלתון.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160.0,26.0 88.4,79.7 160.0,214.0 231.6,79.7" />
  <line x1="160.0" y1="26.0" x2="160.0" y2="214.0" stroke-width="1.5" />
  <line x1="88.4" y1="79.7" x2="231.6" y2="79.7" stroke-width="1.5" />
  <polyline points="168.0,79.7 168.0,87.7 160.0,87.7" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="154.5" y="19.0">A</text>
    <text x="69.9" y="85.7">B</text>
    <text x="154.5" y="233.0">C</text>
    <text x="239.1" y="85.7">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`בדלתון האלכסון הראשי $AC$ מאונך לאלכסון $BD$ וחוצה אותו.`,
          String.raw`סמנו ב-$M$ את נקודת מפגש האלכסונים, ומצאו את $AM$ ואת $CM$ בעזרת משפט פיתגורס.`,
          'שטח מרובע שאלכסוניו מאונכים הוא מחצית מכפלת האלכסונים.',
        ],
        solutionSteps: [
          String.raw`בדלתון האלכסון הראשי $AC$ מאונך לאלכסון המשני $BD$ וחוצה אותו. נסמן את נקודת המפגש ב-$M$: $BM=MD=8$ ו-$\angle AMB=90^\circ$.`,
          String.raw`לפי משפט פיתגורס במשולש $ABM$: $AM=\sqrt{10^2-8^2}=6$. במשולש $CBM$: $CM=\sqrt{17^2-8^2}=\sqrt{225}=15$.`,
          String.raw`$M$ נמצאת בין $A$ ל-$C$, לכן $AC=AM+MC=6+15=21$.`,
          String.raw`האלכסונים מאונכים, ולכן $S_{ABCD}=\frac{AC\cdot BD}{2}=\frac{21\cdot16}{2}=168$.`,
        ],
        finalAnswer: String.raw`$AC=21$, $S_{ABCD}=168$.`,
        answers: [
          { label: String.raw`$AC$`, value: 21 },
          { label: String.raw`$S_{ABCD}$`, value: 168 },
        ],
      },
      {
        id: 'geo-areas-basic-6',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא טרפז ישר זווית ($AB\parallel DC$, $\angle A=\angle D=90^\circ$) שבו $AB=14$, $DC=8$ ו-$BC=10$ (ראו שרטוט). חשבו את שטח הטרפז ואת היקפו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.0,196.6 294.0,196.6 179.1,43.4 26.0,43.4" />
  <polyline points="34.0,196.6 34.0,188.6 26.0,188.6" stroke-width="1" />
  <polyline points="26.0,51.4 34.0,51.4 34.0,43.4" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="11.3" y="211.8">A</text>
    <text x="297.7" y="211.8">B</text>
    <text x="182.8" y="40.2">C</text>
    <text x="11.3" y="40.2">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`הורידו גובה מ-$C$ לבסיס $AB$; אורכו שווה ל-$AD$.`,
          String.raw`ההיטל של השוק $BC$ על הבסיס $AB$ הוא $AB-DC=6$.`,
        ],
        solutionSteps: [
          String.raw`נוריד את הגובה $CK$ לבסיס $AB$. $AKCD$ הוא מלבן (שלוש זוויות ישרות), לכן $AK=DC=8$ ו-$CK=AD$.`,
          String.raw`$KB=AB-AK=14-8=6$, ולפי משפט פיתגורס במשולש $CKB$: $CK=\sqrt{10^2-6^2}=8$. לכן גובה הטרפז $AD=8$.`,
          String.raw`$S_{ABCD}=\frac{(14+8)\cdot8}{2}=88$.`,
          String.raw`היקף הטרפז: $AB+BC+CD+DA=14+10+8+8=40$.`,
        ],
        finalAnswer: String.raw`שטח $88$, היקף $40$.`,
        answers: [
          { label: String.raw`$S_{ABCD}$`, value: 88 },
          { label: 'היקף', value: 40 },
        ],
      },
      {
        id: 'geo-areas-basic-7',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ נתון: $AB=13$, $BC=14$, $AC=15$. $AD$ הוא הגובה לצלע $BC$ ו-$BE$ הוא הגובה לצלע $AC$ (ראו שרטוט). חשבו את $AD$, את שטח המשולש ואת $BE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="128.7,26.0 50.3,214.0 269.7,214.0" />
  <line x1="128.7" y1="26.0" x2="128.7" y2="214.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="50.3" y1="214.0" x2="190.7" y2="108.7" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="136.7,214.0 136.7,206.0 128.7,206.0" stroke-width="1" />
  <polyline points="195.5,115.1 189.1,119.9 184.3,113.5" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="123.2" y="19.0">A</text>
    <text x="35.6" y="229.2">B</text>
    <text x="273.4" y="229.2">C</text>
    <text x="123.2" y="233.0">D</text>
    <text x="194.4" y="105.5">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`סמנו $BD=x$, ואז $DC=14-x$.`,
          String.raw`בטאו את $AD^2$ בשתי דרכים (פיתגורס במשולשים $ABD$ ו-$ACD$) והשוו.`,
          String.raw`אחרי שמצאתם את השטח, כתבו אותו גם כ-$\frac{AC\cdot BE}{2}$.`,
        ],
        solutionSteps: [
          String.raw`נסמן $BD=x$, ואז $DC=14-x$. לפי משפט פיתגורס במשולש $ABD$: $AD^2=13^2-x^2$, ובמשולש $ACD$: $AD^2=15^2-(14-x)^2$.`,
          String.raw`נשווה: $169-x^2=225-196+28x-x^2$, כלומר $169=29+28x$, ולכן $x=5$.`,
          String.raw`$AD=\sqrt{169-25}=\sqrt{144}=12$, ולכן $S_{ABC}=\frac{BC\cdot AD}{2}=\frac{14\cdot12}{2}=84$.`,
          String.raw`$BE$ הוא הגובה לצלע $AC$: $\frac{AC\cdot BE}{2}=84\ \Rightarrow\ BE=\frac{168}{15}=11.2$.`,
        ],
        finalAnswer: String.raw`$AD=12$, $S_{ABC}=84$, $BE=11.2$.`,
        answers: [
          { label: String.raw`$AD$`, value: 12 },
          { label: String.raw`$S_{ABC}$`, value: 84 },
          { label: String.raw`$BE$`, value: 11.2 },
        ],
      },
      {
        id: 'geo-areas-basic-8',
        difficulty: 3,
        statement: String.raw`אורך הצלע של המעוין $ABCD$ הוא $10$ ושטחו $96$ (ראו שרטוט). חשבו את אורכי האלכסונים של המעוין ואת גובה המעוין.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="34.7,120.0 160.0,26.0 285.3,120.0 160.0,214.0" />
  <line x1="34.7" y1="120.0" x2="285.3" y2="120.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="160.0" y1="26.0" x2="160.0" y2="214.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="16.2" y="126.0">A</text>
    <text x="154.5" y="19.0">B</text>
    <text x="292.8" y="126.0">C</text>
    <text x="154.5" y="233.0">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`סמנו את האלכסונים $d_1,d_2$. מהשטח: $d_1d_2=192$.`,
          String.raw`האלכסונים חוצים זה את זה ומאונכים, לכן $\left(\frac{d_1}{2}\right)^2+\left(\frac{d_2}{2}\right)^2=100$, כלומר $d_1^2+d_2^2=400$.`,
          String.raw`חשבו את $(d_1+d_2)^2$ ואת $(d_1-d_2)^2$.`,
        ],
        solutionSteps: [
          String.raw`נסמן את אורכי האלכסונים $d_1>d_2$. שטח המעוין: $\frac{d_1d_2}{2}=96$, כלומר $d_1d_2=192$.`,
          String.raw`במעוין האלכסונים מאונכים וחוצים זה את זה, לכן לפי משפט פיתגורס במשולש שצלעותיו חצאי האלכסונים וצלע המעוין: $\frac{d_1^2}{4}+\frac{d_2^2}{4}=10^2$, כלומר $d_1^2+d_2^2=400$.`,
          String.raw`$(d_1+d_2)^2=d_1^2+d_2^2+2d_1d_2=400+384=784$, לכן $d_1+d_2=28$. $(d_1-d_2)^2=400-384=16$, לכן $d_1-d_2=4$.`,
          String.raw`מכאן $d_1=16$ ו-$d_2=12$.`,
          String.raw`מעוין הוא מקבילית, ולכן שטחו צלע כפול הגובה: $10\cdot h=96$, כלומר $h=9.6$.`,
        ],
        finalAnswer: String.raw`האלכסונים $16$ ו-$12$, גובה המעוין $9.6$.`,
        answers: [
          { label: 'האלכסון הארוך', value: 16 },
          { label: 'האלכסון הקצר', value: 12 },
          { label: 'גובה המעוין', value: 9.6 },
        ],
      },
    ],
  },
  'geo-areas-proof': {
    intro: String.raw`בשיעור זה מוכיחים טענות על שוויון שטחים ועל יחס שטחים, בלי לחשב את השטחים עצמם. הכלים העיקריים: משולשים בעלי בסיס שווה וגובה שווה הם שווי שטח; למשולשים בעלי אותו גובה יחס השטחים שווה ליחס הבסיסים; ופירוק או השלמה של צורות – חיבור וחיסור שטחים. בשאלה 4 בשאלון 806 טענות כאלה מופיעות כסעיף הוכחה, ואחריו סעיף חישוב שנשען עליו.`,
    keyFacts: [
      String.raw`**משולשים בעלי אותו בסיס (או בסיסים שווים) ואותו גובה – שווי שטח.** בפרט: משולשים שבסיסם המשותף $AB$ וקודקודם השלישי על ישר המקביל ל-$AB$ הם שווי שטח.`,
      String.raw`**משולשים בעלי אותו גובה**: יחס השטחים שווה ליחס הבסיסים. אם $D$ על $BC$, אז $\frac{S_{ABD}}{S_{ADC}}=\frac{BD}{DC}$.`,
      String.raw`**תיכון** מחלק משולש לשני משולשים שווי שטח (בסיסים שווים וגובה משותף).`,
      String.raw`**אלכסוני מקבילית** מחלקים אותה לארבעה משולשים שווי שטח. משולש שבסיסו צלע של מקבילית וקודקודו השלישי על הצלע הנגדית – שטחו מחצית שטח המקבילית.`,
      String.raw`**טרפז** $ABCD$ ($AB\parallel DC$) שאלכסוניו נפגשים ב-$O$: $S_{ADC}=S_{BDC}$ (אותו בסיס ואותו גובה), ואחרי חיסור $S_{DOC}$ מקבלים $S_{AOD}=S_{BOC}$.`,
      'שיטה: כותבים את השטח המבוקש כסכום או הפרש של שטחים ידועים או שווים, ומנמקים כל שוויון (בסיס משותף, גובה משותף, תיכון, צלעות נגדיות במקבילית, חפיפה).',
    ],
    exercises: [
      {
        id: 'geo-areas-proof-1',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ הנקודה $D$ על הצלע $BC$ כך ש-$BD:DC=2:3$ (ראו שרטוט). שטח המשולש $ABC$ הוא $40$. הוכיחו כי $\frac{S_{ABD}}{S_{ADC}}=\frac{BD}{DC}$, וחשבו את $S_{ABD}$ ואת $S_{ADC}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="113.0,26.0 42.5,214.0 277.5,214.0" />
  <line x1="113.0" y1="26.0" x2="136.5" y2="214.0" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="107.5" y="19.0">A</text>
    <text x="27.8" y="229.2">B</text>
    <text x="281.2" y="229.2">C</text>
    <text x="131.0" y="233.0">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`לשני המשולשים $ABD$ ו-$ADC$ יש אותו גובה – הגובה מ-$A$ לישר $BC$.`,
          String.raw`סמנו $S_{ABD}=2k$, $S_{ADC}=3k$.`,
        ],
        solutionSteps: [
          String.raw`נוריד מ-$A$ את הגובה $AH$ לישר $BC$. זהו הגובה לבסיס $BD$ במשולש $ABD$, וגם הגובה לבסיס $DC$ במשולש $ADC$.`,
          String.raw`לכן $\frac{S_{ABD}}{S_{ADC}}=\frac{\frac12BD\cdot AH}{\frac12DC\cdot AH}=\frac{BD}{DC}=\frac23$.`,
          String.raw`נסמן $S_{ABD}=2k$, $S_{ADC}=3k$. שני המשולשים מרכיבים את המשולש $ABC$: $2k+3k=40$, ולכן $k=8$.`,
          String.raw`$S_{ABD}=16$, $S_{ADC}=24$.`,
        ],
        finalAnswer: String.raw`$S_{ABD}=16$, $S_{ADC}=24$.`,
        answers: [
          { label: String.raw`$S_{ABD}$`, value: 16 },
          { label: String.raw`$S_{ADC}$`, value: 24 },
        ],
      },
      {
        id: 'geo-areas-proof-2',
        difficulty: 1,
        statement: String.raw`האלכסונים של המקבילית $ABCD$ נפגשים בנקודה $O$ (ראו שרטוט). הוכיחו שהאלכסונים מחלקים את המקבילית לארבעה משולשים שווי שטח. נתון $S_{AOB}=7$: חשבו את שטח המקבילית.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.0,179.6 234.4,179.6 294.0,60.4 85.6,60.4" />
  <line x1="26.0" y1="179.6" x2="294.0" y2="60.4" stroke-width="1.5" />
  <line x1="234.4" y1="179.6" x2="85.6" y2="60.4" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="11.3" y="194.7">A</text>
    <text x="238.1" y="194.7">B</text>
    <text x="297.7" y="57.3">C</text>
    <text x="70.9" y="57.3">D</text>
    <text x="154.5" y="140.0">O</text>
  </g>
</svg>`,
        hints: [
          'במקבילית האלכסונים חוצים זה את זה.',
          String.raw`במשולש $ABC$ הקטע $BO$ הוא תיכון.`,
        ],
        solutionSteps: [
          String.raw`במקבילית האלכסונים חוצים זה את זה, לכן $AO=OC$ ו-$BO=OD$.`,
          String.raw`במשולש $ABC$ הקטע $BO$ הוא תיכון, ותיכון מחלק משולש לשני משולשים שווי שטח: $S_{AOB}=S_{BOC}$.`,
          String.raw`באותו אופן: $CO$ תיכון במשולש $BCD$, לכן $S_{BOC}=S_{COD}$; ו-$DO$ תיכון במשולש $CDA$, לכן $S_{COD}=S_{DOA}$.`,
          String.raw`ארבעת המשולשים שווי שטח, ולכן $S_{ABCD}=4\cdot S_{AOB}=4\cdot7=28$.`,
        ],
        finalAnswer: String.raw`$S_{ABCD}=28$.`,
        answers: [{ label: String.raw`$S_{ABCD}$`, value: 28 }],
      },
      {
        id: 'geo-areas-proof-3',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא טרפז ($AB\parallel DC$) שאלכסוניו נפגשים בנקודה $O$ (ראו שרטוט).

א. הוכיחו: $S_{AOD}=S_{BOC}$.

ב. נתון: $S_{ADC}=50$, $S_{DOC}=32$. חשבו את $S_{BOC}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="76.3,67.7 227.0,67.7 294.0,172.3 26.0,172.3" />
  <line x1="76.3" y1="67.7" x2="294.0" y2="172.3" stroke-width="1.5" />
  <line x1="227.0" y1="67.7" x2="26.0" y2="172.3" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="61.6" y="64.5">A</text>
    <text x="230.7" y="64.5">B</text>
    <text x="297.7" y="187.5">C</text>
    <text x="11.3" y="187.5">D</text>
    <text x="149.1" y="126.3">O</text>
  </g>
</svg>`,
        hints: [
          String.raw`השוו את $S_{ADC}$ ל-$S_{BDC}$: לשני המשולשים בסיס משותף $DC$.`,
          String.raw`הגובה של שניהם לבסיס $DC$ הוא המרחק בין הישרים המקבילים $AB$ ו-$DC$.`,
          String.raw`החסירו מכל אחד מהם את $S_{DOC}$.`,
        ],
        solutionSteps: [
          String.raw`א. למשולשים $ADC$ ו-$BDC$ בסיס משותף $DC$. הקודקודים $A$ ו-$B$ נמצאים על הישר $AB$ המקביל ל-$DC$, ולכן הגבהים לבסיס $DC$ שווים (המרחק בין ישרים מקבילים).`,
          String.raw`משולשים בעלי אותו בסיס ואותו גובה שווי שטח: $S_{ADC}=S_{BDC}$.`,
          String.raw`$S_{AOD}=S_{ADC}-S_{DOC}$ ו-$S_{BOC}=S_{BDC}-S_{DOC}$, ולכן $S_{AOD}=S_{BOC}$.`,
          String.raw`ב. $S_{BOC}=S_{AOD}=S_{ADC}-S_{DOC}=50-32=18$.`,
        ],
        finalAnswer: String.raw`$S_{BOC}=18$.`,
        answers: [{ label: String.raw`$S_{BOC}$`, value: 18 }],
      },
      {
        id: 'geo-areas-proof-4',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ הקטע $AD$ הוא תיכון, והנקודה $E$ היא אמצע $AD$ (ראו שרטוט). הוכיחו: $S_{BEC}=\frac12S_{ABC}$. נתון $S_{ABC}=48$: חשבו את $S_{ABE}$ ואת $S_{BEC}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="115.3,30.7 26.0,209.3 294.0,209.3" />
  <line x1="115.3" y1="30.7" x2="160.0" y2="209.3" stroke-width="1.5" />
  <line x1="26.0" y1="209.3" x2="137.7" y2="120.0" stroke-width="1.5" />
  <line x1="294.0" y1="209.3" x2="137.7" y2="120.0" stroke-width="1.5" />
  <line x1="93.0" y1="214.3" x2="93.0" y2="204.3" stroke-width="1.2" />
  <line x1="227.0" y1="214.3" x2="227.0" y2="204.3" stroke-width="1.2" />
  <line x1="121.2" y1="74.6" x2="130.9" y2="72.2" stroke-width="1.2" />
  <line x1="122.1" y1="78.5" x2="131.8" y2="76.1" stroke-width="1.2" />
  <line x1="143.5" y1="163.9" x2="153.2" y2="161.5" stroke-width="1.2" />
  <line x1="144.5" y1="167.8" x2="154.2" y2="165.4" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="109.8" y="23.7">A</text>
    <text x="11.3" y="224.5">B</text>
    <text x="297.7" y="224.5">C</text>
    <text x="154.5" y="228.3">D</text>
    <text x="118.2" y="126.0">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`$AD$ תיכון במשולש $ABC$, ו-$BE$ תיכון במשולש $ABD$.`,
          String.raw`בטאו את $S_{ABE}$ ואת $S_{ACE}$ כחלק מ-$S_{ABC}$.`,
        ],
        solutionSteps: [
          String.raw`$AD$ תיכון במשולש $ABC$, לכן $S_{ABD}=S_{ACD}=\frac12S_{ABC}$.`,
          String.raw`$E$ אמצע $AD$, לכן $BE$ תיכון במשולש $ABD$ ו-$CE$ תיכון במשולש $ACD$: $S_{ABE}=\frac12S_{ABD}=\frac14S_{ABC}$, וגם $S_{ACE}=\frac14S_{ABC}$.`,
          String.raw`המשולש $ABC$ מורכב מהמשולשים $ABE$, $ACE$ ו-$BEC$, לכן $S_{BEC}=S_{ABC}-\frac14S_{ABC}-\frac14S_{ABC}=\frac12S_{ABC}$.`,
          String.raw`עבור $S_{ABC}=48$: $S_{ABE}=12$ ו-$S_{BEC}=24$.`,
        ],
        finalAnswer: String.raw`$S_{ABE}=12$, $S_{BEC}=24$.`,
        answers: [
          { label: String.raw`$S_{ABE}$`, value: 12 },
          { label: String.raw`$S_{BEC}$`, value: 24 },
        ],
      },
      {
        id: 'geo-areas-proof-5',
        difficulty: 2,
        statement: String.raw`$ABCD$ היא מקבילית, והנקודה $E$ נמצאת על הצלע $DC$ (ראו שרטוט).

א. הוכיחו: $S_{ABE}=\frac12S_{ABCD}$, ומכאן $S_{ADE}+S_{BCE}=S_{ABE}$.

ב. נתון: $AB=10$, המרחק בין $AB$ ל-$DC$ הוא $6$, ו-$DE:EC=2:3$. חשבו את $S_{ABE}$ ואת $S_{ADE}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.0,181.8 232.2,181.8 294.0,58.2 87.8,58.2" />
  <line x1="26.0" y1="181.8" x2="170.3" y2="58.2" stroke-width="1.5" />
  <line x1="232.2" y1="181.8" x2="170.3" y2="58.2" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="11.3" y="197.0">A</text>
    <text x="235.8" y="197.0">B</text>
    <text x="297.7" y="55.0">C</text>
    <text x="73.2" y="55.0">D</text>
    <text x="164.8" y="51.2">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`הגובה של המשולש $ABE$ לבסיס $AB$ הוא המרחק בין הישרים המקבילים $AB$ ו-$DC$ – זה גם גובה המקבילית.`,
          String.raw`ב. $DC=AB$ (צלעות נגדיות במקבילית), ולמשולש $ADE$ הגובה לבסיס $DE$ הוא שוב המרחק בין המקבילים.`,
        ],
        solutionSteps: [
          String.raw`א. נסמן ב-$h$ את המרחק בין הישרים המקבילים $AB$ ו-$DC$. $E$ על $DC$, ולכן הגובה מ-$E$ לבסיס $AB$ הוא $h$: $S_{ABE}=\frac{AB\cdot h}{2}$.`,
          String.raw`שטח המקבילית $S_{ABCD}=AB\cdot h$, ולכן $S_{ABE}=\frac12S_{ABCD}$.`,
          String.raw`המקבילית מורכבת מהמשולשים $ADE$, $ABE$ ו-$BCE$, לכן $S_{ADE}+S_{BCE}=S_{ABCD}-S_{ABE}=\frac12S_{ABCD}=S_{ABE}$.`,
          String.raw`ב. $S_{ABE}=\frac{10\cdot6}{2}=30$.`,
          String.raw`$DC=AB=10$ (צלעות נגדיות במקבילית), ולכן $DE=\frac25\cdot10=4$. הגובה של המשולש $ADE$ לבסיס $DE$ הוא $6$, ולכן $S_{ADE}=\frac{4\cdot6}{2}=12$ (ובהתאם $S_{BCE}=30-12=18$).`,
        ],
        finalAnswer: String.raw`$S_{ABE}=30$, $S_{ADE}=12$.`,
        answers: [
          { label: String.raw`$S_{ABE}$`, value: 30 },
          { label: String.raw`$S_{ADE}$`, value: 12 },
        ],
      },
      {
        id: 'geo-areas-proof-6',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ התיכונים $BE$ ו-$CF$ נפגשים בנקודה $G$ (ראו שרטוט).

א. הוכיחו: $S_{BGF}=S_{CGE}$.

ב. נתון: $S_{ABC}=36$ ו-$S_{BGC}=12$. חשבו את $S_{BGF}$ ואת שטח המרובע $AFGE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="115.3,53.0 26.0,187.0 294.0,187.0" />
  <line x1="26.0" y1="187.0" x2="204.7" y2="120.0" stroke-width="1.5" />
  <line x1="294.0" y1="187.0" x2="70.7" y2="120.0" stroke-width="1.5" />
  <line x1="88.8" y1="83.7" x2="97.2" y2="89.3" stroke-width="1.2" />
  <line x1="44.2" y1="150.7" x2="52.5" y2="156.3" stroke-width="1.2" />
  <line x1="155.4" y1="89.3" x2="161.4" y2="81.3" stroke-width="1.2" />
  <line x1="158.6" y1="91.7" x2="164.6" y2="83.7" stroke-width="1.2" />
  <line x1="244.7" y1="156.3" x2="250.7" y2="148.3" stroke-width="1.2" />
  <line x1="247.9" y1="158.7" x2="253.9" y2="150.7" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="109.8" y="46.0">A</text>
    <text x="11.3" y="202.2">B</text>
    <text x="297.7" y="202.2">C</text>
    <text x="208.4" y="116.8">E</text>
    <text x="56.0" y="116.8">F</text>
    <text x="139.6" y="163.3">G</text>
  </g>
</svg>`,
        hints: [
          String.raw`הראו ש-$S_{BCE}=S_{BCF}=\frac12S_{ABC}$.`,
          String.raw`החסירו מכל אחד מהם את $S_{BGC}$.`,
          String.raw`שטח המרובע $AFGE$ הוא $S_{ABE}$ פחות $S_{BGF}$.`,
        ],
        solutionSteps: [
          String.raw`א. $BE$ תיכון, לכן $S_{BCE}=\frac12S_{ABC}$. $CF$ תיכון, לכן $S_{BCF}=\frac12S_{ABC}$. מכאן $S_{BCE}=S_{BCF}$.`,
          String.raw`$S_{CGE}=S_{BCE}-S_{BGC}$ ו-$S_{BGF}=S_{BCF}-S_{BGC}$, ולכן $S_{BGF}=S_{CGE}$.`,
          String.raw`ב. $S_{BCF}=\frac12\cdot36=18$, ולכן $S_{BGF}=18-12=6$.`,
          String.raw`$S_{ABE}=\frac12S_{ABC}=18$ ($BE$ תיכון), והמשולש $ABE$ מורכב מהמרובע $AFGE$ ומהמשולש $BGF$. לכן $S_{AFGE}=18-6=12$.`,
        ],
        finalAnswer: String.raw`$S_{BGF}=6$, $S_{AFGE}=12$.`,
        answers: [
          { label: String.raw`$S_{BGF}$`, value: 6 },
          { label: String.raw`$S_{AFGE}$`, value: 12 },
        ],
      },
      {
        id: 'geo-areas-proof-7',
        difficulty: 3,
        statement: String.raw`$ABCD$ הוא טרפז ($AB\parallel DC$), והנקודה $E$ היא אמצע השוק $BC$ (ראו שרטוט).

א. הוכיחו: $S_{ADE}=\frac12S_{ABCD}$.

ב. נתון: $AB=6$, $DC=10$ וגובה הטרפז $5$. חשבו את $S_{ADE}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="52.8,53.0 213.6,53.0 294.0,187.0 26.0,187.0" />
  <line x1="52.8" y1="53.0" x2="253.8" y2="120.0" stroke-width="1.5" />
  <line x1="26.0" y1="187.0" x2="253.8" y2="120.0" stroke-width="1.5" />
  <line x1="229.4" y1="89.1" x2="238.0" y2="83.9" stroke-width="1.2" />
  <line x1="269.6" y1="156.1" x2="278.2" y2="150.9" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="38.1" y="49.8">A</text>
    <text x="217.3" y="49.8">B</text>
    <text x="297.7" y="202.2">C</text>
    <text x="11.3" y="202.2">D</text>
    <text x="261.3" y="126.0">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`המשיכו את $AE$ עד שיחתוך את המשך הבסיס $DC$ בנקודה $F$.`,
          String.raw`הוכיחו ש-$\triangle ABE\cong\triangle FCE$, ולכן $S_{ABCD}=S_{ADF}$ ו-$AE=EF$.`,
          String.raw`$DE$ הוא תיכון במשולש $ADF$.`,
        ],
        solutionSteps: [
          String.raw`א. נמשיך את $AE$ עד שיחתוך את המשך $DC$ בנקודה $F$. במשולשים $ABE$ ו-$FCE$: $BE=CE$ (נתון), $\angle AEB=\angle FEC$ (זוויות קודקודיות), $\angle ABE=\angle FCE$ (זוויות מתחלפות, $AB\parallel DF$).`,
          String.raw`לכן $\triangle ABE\cong\triangle FCE$ (ז.צ.ז), ומכאן $AE=FE$ ו-$S_{ABE}=S_{FCE}$.`,
          String.raw`$S_{ABCD}=S_{AECD}+S_{ABE}=S_{AECD}+S_{FCE}=S_{ADF}$.`,
          String.raw`$E$ אמצע $AF$, לכן $DE$ תיכון במשולש $ADF$, והוא מחלק אותו לשני משולשים שווי שטח: $S_{ADE}=\frac12S_{ADF}=\frac12S_{ABCD}$.`,
          String.raw`ב. $S_{ABCD}=\frac{(6+10)\cdot5}{2}=40$, ולכן $S_{ADE}=20$.`,
        ],
        finalAnswer: String.raw`$S_{ADE}=20$.`,
        answers: [{ label: String.raw`$S_{ADE}$`, value: 20 }],
      },
      {
        id: 'geo-areas-proof-8',
        difficulty: 3,
        statement: String.raw`$P$ היא נקודה בתוך המקבילית $ABCD$ (ראו שרטוט).

א. הוכיחו: $S_{PAB}+S_{PCD}=\frac12S_{ABCD}$.

ב. נתון: $S_{ABCD}=60$, $S_{PAB}=13$, $S_{PBC}=20$. חשבו את $S_{PCD}$ ואת $S_{PAD}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.0,187.0 249.3,187.0 294.0,53.0 70.7,53.0" />
  <line x1="119.8" y1="128.9" x2="26.0" y2="187.0" stroke-width="1.5" />
  <line x1="119.8" y1="128.9" x2="249.3" y2="187.0" stroke-width="1.5" />
  <line x1="119.8" y1="128.9" x2="294.0" y2="53.0" stroke-width="1.5" />
  <line x1="119.8" y1="128.9" x2="70.7" y2="53.0" stroke-width="1.5" />
  <circle cx="119.8" cy="128.9" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="11.3" y="202.2">A</text>
    <text x="253.0" y="202.2">B</text>
    <text x="297.7" y="49.8">C</text>
    <text x="56.0" y="49.8">D</text>
    <text x="100.3" y="134.9">P</text>
  </g>
</svg>`,
        hints: [
          String.raw`העבירו דרך $P$ ישר המאונך לישרים המקבילים $AB$ ו-$DC$.`,
          String.raw`סכום המרחקים של $P$ מ-$AB$ ומ-$DC$ הוא גובה המקבילית.`,
          String.raw`באותו אופן (עם הצלעות $BC$ ו-$AD$): $S_{PBC}+S_{PAD}=\frac12S_{ABCD}$.`,
        ],
        solutionSteps: [
          String.raw`א. נעביר דרך $P$ ישר המאונך ל-$AB$ ול-$DC$ (הם מקבילים), ונסמן ב-$h_1$ וב-$h_2$ את המרחקים של $P$ מ-$AB$ ומ-$DC$. $P$ נמצאת בין שני הישרים, לכן $h_1+h_2=h$ – גובה המקבילית.`,
          String.raw`$S_{PAB}+S_{PCD}=\frac{AB\cdot h_1}{2}+\frac{DC\cdot h_2}{2}=\frac{AB(h_1+h_2)}{2}=\frac{AB\cdot h}{2}=\frac12S_{ABCD}$, כי $DC=AB$ (צלעות נגדיות במקבילית).`,
          String.raw`ב. $S_{PCD}=\frac12\cdot60-13=17$.`,
          String.raw`באותו אופן, עם הצלעות $BC$ ו-$AD$ והמרחק ביניהן: $S_{PBC}+S_{PAD}=30$, ולכן $S_{PAD}=30-20=10$.`,
        ],
        finalAnswer: String.raw`$S_{PCD}=17$, $S_{PAD}=10$.`,
        answers: [
          { label: String.raw`$S_{PCD}$`, value: 17 },
          { label: String.raw`$S_{PAD}$`, value: 10 },
        ],
      },
    ],
  },
  'geo-circle-area': {
    intro: String.raw`בשיעור זה מחשבים היקף ושטח של מעגל, אורך קשת ושטח גזרה – גם כשהזווית המרכזית נתונה במעלות וגם כשהיא נתונה ברדיאנים. גזרה היא ״חלק״ מהעיגול לפי היחס בין הזווית המרכזית ל-$360^\circ$ (או ל-$2\pi$). את שטח קטע המעגל (השטח שבין מיתר לקשת) מחשבים כשטח גזרה פחות שטח משולש. החומר משמש בשאלה 4 (גאומטריה) ובשאלה 5 (טריגונומטריה במישור) בשאלון 806.`,
    keyFacts: [
      String.raw`מעגל ברדיוס $R$: היקף $P=2\pi R$, שטח $S=\pi R^2$.`,
      String.raw`**רדיאנים**: $\pi$ רדיאנים $=180^\circ$. מעבר ממעלות לרדיאנים: $\theta=\frac{\pi}{180^\circ}\cdot\alpha$; ולהפך: $\alpha=\frac{180^\circ}{\pi}\cdot\theta$.`,
      String.raw`**קשת וגזרה במעלות** (זווית מרכזית $\alpha$): $l=\frac{\alpha}{360^\circ}\cdot2\pi R$, $S=\frac{\alpha}{360^\circ}\cdot\pi R^2$.`,
      String.raw`**קשת וגזרה ברדיאנים** (זווית מרכזית $\theta$): $l=R\theta$, $S=\frac12R^2\theta$.`,
      String.raw`**קטע מעגל** = גזרה פחות המשולש $AOB$; היקף קטע המעגל = אורך הקשת + אורך המיתר. **היקף גזרה** = אורך הקשת + $2R$.`,
      String.raw`**טבעת** בין שני מעגלים בעלי מרכז משותף: $S=\pi R^2-\pi r^2=\pi(R^2-r^2)$.`,
    ],
    exercises: [
      {
        id: 'geo-circle-area-1',
        difficulty: 1,
        statement: String.raw`רדיוס של מעגל הוא $6$. חשבו את היקף המעגל ואת שטחו (בטאו באמצעות $\pi$ ותנו גם ערך מקורב).`,
        hints: [String.raw`$P=2\pi R$, $S=\pi R^2$.`],
        solutionSteps: [
          String.raw`היקף: $P=2\pi R=2\pi\cdot6=12\pi\approx37.70$.`,
          String.raw`שטח: $S=\pi R^2=\pi\cdot6^2=36\pi\approx113.10$.`,
        ],
        finalAnswer: String.raw`$P=12\pi\approx37.70$, $S=36\pi\approx113.10$.`,
        answers: [
          { label: 'היקף המעגל', value: 12 * Math.PI },
          { label: 'שטח המעגל', value: 36 * Math.PI },
        ],
      },
      {
        id: 'geo-circle-area-2',
        difficulty: 1,
        statement: String.raw`א. המירו $150^\circ$ לרדיאנים.

ב. המירו $\frac{3\pi}{5}$ רדיאנים למעלות.`,
        hints: [
          String.raw`$\pi$ רדיאנים שווים ל-$180^\circ$.`,
          String.raw`ממעלות לרדיאנים כופלים ב-$\frac{\pi}{180^\circ}$; בכיוון ההפוך כופלים ב-$\frac{180^\circ}{\pi}$.`,
        ],
        solutionSteps: [
          String.raw`א. $150^\circ\cdot\frac{\pi}{180^\circ}=\frac{5\pi}{6}\approx2.618$ רדיאנים.`,
          String.raw`ב. $\frac{3\pi}{5}\cdot\frac{180^\circ}{\pi}=\frac{3\cdot180^\circ}{5}=108^\circ$.`,
        ],
        finalAnswer: String.raw`א. $\frac{5\pi}{6}\approx2.618$; ב. $108^\circ$.`,
        answers: [
          { label: String.raw`$150^\circ$ ברדיאנים`, value: (5 * Math.PI) / 6 },
          { label: String.raw`$\frac{3\pi}{5}$ במעלות`, value: 108 },
        ],
      },
      {
        id: 'geo-circle-area-3',
        difficulty: 2,
        statement: String.raw`$AOB$ היא גזרה של מעגל שמרכזו $O$ ורדיוסו $9$, והזווית המרכזית היא $\angle AOB=80^\circ$ (ראו שרטוט). חשבו את אורך הקשת $AB$, את שטח הגזרה ואת היקף הגזרה.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <path d="M 280.8,70.0 A 188.0 188.0 0 0 0 39.2,70.0" stroke-width="2" />
  <line x1="160.0" y1="214.0" x2="280.8" y2="70.0" stroke-width="2" />
  <line x1="160.0" y1="214.0" x2="39.2" y2="70.0" stroke-width="2" />
  <path d="M 170.3,201.7 A 16 16 0 0 0 149.7,201.7" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="154.5" y="233.0">O</text>
    <text x="284.5" y="66.8">A</text>
    <text x="24.5" y="66.8">B</text>
  </g>
</svg>`,
        hints: [
          String.raw`הגזרה היא $\frac{80^\circ}{360^\circ}=\frac29$ מהעיגול.`,
          'היקף הגזרה = אורך הקשת + שני רדיוסים.',
        ],
        solutionSteps: [
          String.raw`הזווית המרכזית היא $\frac{80^\circ}{360^\circ}=\frac29$ מזווית שלמה, ולכן אורך הקשת ושטח הגזרה הם $\frac29$ מההיקף ומהשטח של המעגל.`,
          String.raw`אורך הקשת: $l=\frac29\cdot2\pi\cdot9=4\pi\approx12.57$.`,
          String.raw`שטח הגזרה: $S=\frac29\cdot\pi\cdot9^2=18\pi\approx56.55$.`,
          String.raw`היקף הגזרה: $l+2R=4\pi+18\approx30.57$.`,
        ],
        finalAnswer: String.raw`קשת $4\pi\approx12.57$, שטח $18\pi\approx56.55$, היקף $4\pi+18\approx30.57$.`,
        answers: [
          { label: 'אורך הקשת', value: 4 * Math.PI },
          { label: 'שטח הגזרה', value: 18 * Math.PI },
          { label: 'היקף הגזרה', value: 4 * Math.PI + 18 },
        ],
      },
      {
        id: 'geo-circle-area-4',
        difficulty: 2,
        statement: String.raw`במעגל שמרכזו $O$ ורדיוסו $5$, אורך הקשת $AB$ (הקשת הקטנה) הוא $7.5$ (ראו שרטוט). חשבו את הזווית המרכזית $\angle AOB$ ברדיאנים ובמעלות, ואת שטח הגזרה $AOB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <path d="M 288.1,76.4 A 188.0 188.0 0 0 0 31.9,76.4" stroke-width="2" />
  <line x1="160.0" y1="214.0" x2="288.1" y2="76.4" stroke-width="2" />
  <line x1="160.0" y1="214.0" x2="31.9" y2="76.4" stroke-width="2" />
  <path d="M 170.9,202.3 A 16 16 0 0 0 149.1,202.3" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="154.5" y="233.0">O</text>
    <text x="291.8" y="73.3">A</text>
    <text x="17.2" y="73.3">B</text>
  </g>
</svg>`,
        hints: [String.raw`ברדיאנים: $l=R\theta$.`, String.raw`שטח הגזרה: $S=\frac12R^2\theta$.`],
        solutionSteps: [
          String.raw`$l=R\theta\ \Rightarrow\ \theta=\frac{l}{R}=\frac{7.5}{5}=1.5$ רדיאנים.`,
          String.raw`במעלות: $1.5\cdot\frac{180^\circ}{\pi}=\frac{270^\circ}{\pi}\approx85.94^\circ$.`,
          String.raw`שטח הגזרה: $S=\frac12R^2\theta=\frac12\cdot25\cdot1.5=18.75$.`,
        ],
        finalAnswer: String.raw`$\theta=1.5$ רדיאנים $\approx85.94^\circ$, שטח הגזרה $18.75$.`,
        answers: [
          { label: String.raw`$\angle AOB$ ברדיאנים`, value: 1.5 },
          { label: String.raw`$\angle AOB$ במעלות`, value: 270 / Math.PI },
          { label: 'שטח הגזרה', value: 18.75 },
        ],
      },
      {
        id: 'geo-circle-area-5',
        difficulty: 2,
        statement: String.raw`במעגל שמרכזו $O$ ורדיוסו $6$, המיתר $AB$ נשען על זווית מרכזית $\angle AOB=90^\circ$ (ראו שרטוט). חשבו את שטח קטע המעגל הקטן שבין המיתר $AB$ לקשת $AB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="94.0" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="226.5" y2="186.5" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="226.5" y2="53.5" stroke-width="1.5" />
  <line x1="226.5" y1="186.5" x2="226.5" y2="53.5" stroke-width="2" />
  <polyline points="165.7,125.7 171.3,120.0 165.7,114.3" stroke-width="1" />
  <circle cx="160.0" cy="120.0" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="141.5" y="126.0">O</text>
    <text x="230.2" y="201.7">A</text>
    <text x="230.2" y="50.3">B</text>
  </g>
</svg>`,
        hints: [
          'שטח קטע המעגל = שטח הגזרה פחות שטח המשולש.',
          String.raw`המשולש $AOB$ ישר זווית, וניצביו הם רדיוסים.`,
        ],
        solutionSteps: [
          String.raw`שטח הגזרה $AOB$: $\frac{90^\circ}{360^\circ}\cdot\pi\cdot6^2=9\pi$.`,
          String.raw`המשולש $AOB$ ישר זווית ב-$O$, וניצביו $OA=OB=6$: $S_{AOB}=\frac{6\cdot6}{2}=18$.`,
          String.raw`שטח קטע המעגל: $9\pi-18\approx10.27$.`,
        ],
        finalAnswer: String.raw`$9\pi-18\approx10.27$`,
        answers: [{ label: 'שטח קטע המעגל', value: 9 * Math.PI - 18 }],
      },
      {
        id: 'geo-circle-area-6',
        difficulty: 2,
        statement: String.raw`ריבוע $ABCD$ שאורך צלעו $8$ חסום במעגל שמרכזו $O$ (ראו שרטוט). חשבו את רדיוס המעגל ואת השטח שבתוך העיגול ומחוץ לריבוע.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="94.0" stroke-width="1.5" />
  <polygon points="93.5,186.5 226.5,186.5 226.5,53.5 93.5,53.5" />
  <line x1="93.5" y1="186.5" x2="226.5" y2="53.5" stroke-width="1.5" stroke-dasharray="5 3" />
  <circle cx="160.0" cy="120.0" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="78.8" y="201.7">A</text>
    <text x="230.2" y="201.7">B</text>
    <text x="230.2" y="50.3">C</text>
    <text x="78.8" y="50.3">D</text>
    <text x="146.0" y="117.5">O</text>
  </g>
</svg>`,
        hints: [
          String.raw`$\angle ABC=90^\circ$ היא זווית היקפית; על מה נשענת זווית היקפית ישרה?`,
          String.raw`לפי משפט פיתגורס $AC=8\sqrt2$.`,
        ],
        solutionSteps: [
          String.raw`$\angle ABC=90^\circ$ היא זווית היקפית, וזווית היקפית ישרה נשענת על קוטר – לכן $AC$ הוא קוטר במעגל.`,
          String.raw`לפי משפט פיתגורס במשולש $ABC$: $AC=\sqrt{8^2+8^2}=8\sqrt2$, ולכן $R=4\sqrt2\approx5.66$.`,
          String.raw`שטח העיגול: $\pi R^2=32\pi$; שטח הריבוע: $8^2=64$.`,
          String.raw`השטח המבוקש: $32\pi-64\approx36.53$.`,
        ],
        finalAnswer: String.raw`$R=4\sqrt2\approx5.66$; השטח $32\pi-64\approx36.53$.`,
        answers: [
          { label: String.raw`$R$`, value: 4 * Math.SQRT2 },
          { label: 'השטח המבוקש', value: 32 * Math.PI - 64 },
        ],
      },
      {
        id: 'geo-circle-area-7',
        difficulty: 3,
        statement: String.raw`במעגל שמרכזו $O$ ורדיוסו $6$, המיתר $AB$ נשען על זווית מרכזית $\angle AOB=120^\circ$ (ראו שרטוט). חשבו את אורך המיתר $AB$, את שטח קטע המעגל הקטן שבין המיתר לקשת, ואת היקף קטע המעגל.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="94.0" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="78.6" y2="167.0" stroke-width="1.5" />
  <line x1="160.0" y1="120.0" x2="241.4" y2="167.0" stroke-width="1.5" />
  <line x1="78.6" y1="167.0" x2="241.4" y2="167.0" stroke-width="2" />
  <path d="M 147.9,127.0 A 14 14 0 0 0 172.1,127.0" stroke-width="1.2" />
  <circle cx="160.0" cy="120.0" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="154.5" y="113.0">O</text>
    <text x="63.9" y="182.2">A</text>
    <text x="245.1" y="182.2">B</text>
  </g>
</svg>`,
        hints: [
          String.raw`הורידו מ-$O$ אנך $OM$ למיתר. במשולש שווה השוקיים $AOB$ האנך הוא גם חוצה זווית וגם תיכון.`,
          String.raw`במשולש $AOM$: $\angle AOM=60^\circ$, ולכן $\angle OAM=30^\circ$ ו-$OM=\frac12OA$.`,
          'שטח קטע = גזרה פחות משולש; היקף קטע = קשת + מיתר.',
        ],
        solutionSteps: [
          String.raw`$OA=OB$ (רדיוסים), ולכן המשולש $AOB$ שווה שוקיים. נוריד את הגובה $OM$ לבסיס $AB$; במשולש שווה שוקיים הוא גם חוצה את זווית הראש וגם תיכון: $\angle AOM=60^\circ$, $AM=MB$.`,
          String.raw`במשולש ישר הזווית $AOM$: $\angle OAM=30^\circ$, והניצב שמול זווית של $30^\circ$ שווה למחצית היתר: $OM=3$. לפי משפט פיתגורס $AM=\sqrt{36-9}=3\sqrt3$, ולכן $AB=6\sqrt3\approx10.39$.`,
          String.raw`$S_{AOB}=\frac{AB\cdot OM}{2}=\frac{6\sqrt3\cdot3}{2}=9\sqrt3$. שטח הגזרה: $\frac{120^\circ}{360^\circ}\cdot\pi\cdot6^2=12\pi$.`,
          String.raw`שטח קטע המעגל: $12\pi-9\sqrt3\approx22.11$.`,
          String.raw`אורך הקשת: $\frac13\cdot2\pi\cdot6=4\pi$, ולכן היקף קטע המעגל: $4\pi+6\sqrt3\approx22.96$.`,
        ],
        finalAnswer: String.raw`$AB=6\sqrt3\approx10.39$; שטח $12\pi-9\sqrt3\approx22.11$; היקף $4\pi+6\sqrt3\approx22.96$.`,
        answers: [
          { label: String.raw`$AB$`, value: 6 * Math.sqrt(3) },
          { label: 'שטח קטע המעגל', value: 12 * Math.PI - 9 * Math.sqrt(3) },
          { label: 'היקף קטע המעגל', value: 4 * Math.PI + 6 * Math.sqrt(3) },
        ],
      },
      {
        id: 'geo-circle-area-8',
        difficulty: 3,
        statement: String.raw`לשני מעגלים מרכז משותף $O$. המיתר $AB$ של המעגל הגדול משיק למעגל הקטן בנקודה $T$, ואורכו $16$ (ראו שרטוט). חשבו את שטח הטבעת שבין שני המעגלים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="94.0" stroke-width="1.5" />
  <circle cx="160.0" cy="120.0" r="56.4" stroke-width="1.5" />
  <line x1="84.8" y1="176.4" x2="235.2" y2="176.4" stroke-width="2" />
  <circle cx="160.0" cy="120.0" r="2.5" fill="currentColor" />
  <circle cx="160.0" cy="176.4" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="154.5" y="113.0">O</text>
    <text x="70.1" y="191.6">A</text>
    <text x="238.9" y="191.6">B</text>
    <text x="154.5" y="195.4">T</text>
  </g>
</svg>`,
        hints: [
          String.raw`סמנו את הרדיוסים $R$ (גדול) ו-$r$ (קטן). שטח הטבעת הוא $\pi(R^2-r^2)$ – אין צורך למצוא כל רדיוס בנפרד.`,
          String.raw`$OT\perp AB$ (רדיוס לנקודת ההשקה), ולכן $OT$ חוצה את המיתר $AB$.`,
          String.raw`במשולש $OTB$: $R^2-r^2=TB^2$.`,
        ],
        solutionSteps: [
          String.raw`$OT$ הוא רדיוס של המעגל הקטן לנקודת ההשקה, והמשיק מאונך לרדיוס בנקודת ההשקה: $OT\perp AB$.`,
          String.raw`במעגל הגדול, האנך מהמרכז למיתר חוצה את המיתר, לכן $TB=\frac{16}{2}=8$.`,
          String.raw`במשולש ישר הזווית $OTB$ ($OB=R$, $OT=r$), לפי משפט פיתגורס: $R^2-r^2=TB^2=64$.`,
          String.raw`שטח הטבעת: $\pi R^2-\pi r^2=\pi(R^2-r^2)=64\pi\approx201.06$.`,
        ],
        finalAnswer: String.raw`$64\pi\approx201.06$`,
        answers: [{ label: 'שטח הטבעת', value: 64 * Math.PI }],
      },
    ],
  },
  'geo-thales': {
    intro: String.raw`משפט תאלס עוסק בישרים מקבילים החותכים שוקי זווית: הם מקצים על השוקיים קטעים פרופורציוניים. ממנו נובעים משפט תאלס המורחב (ישר המקביל לצלע במשולש), המשפט ההפוך (קטעים פרופורציוניים מוכיחים הקבלה), משפטי קטע האמצעים במשולש ובטרפז, וחלוקת קטע ביחס נתון – פנימית וחיצונית. בבגרות (שאלה 4 בשאלון 806) תאלס משמש לחישוב אורכים ויחסים ולהוכחת הקבלה, ולעתים קרובות הוא שלב ביניים בדרך לדמיון משולשים.`,
    keyFacts: [
      String.raw`**משפט תאלס**: ישרים מקבילים החותכים שוקי זווית מקצים עליהם קטעים פרופורציוניים. במשולש $ABC$ עם $DE\parallel BC$ ($D$ על $AB$, $E$ על $AC$): $\frac{AD}{DB}=\frac{AE}{EC}$.`,
      String.raw`**משפט תאלס המורחב**: אם $DE\parallel BC$, אז $\frac{AD}{AB}=\frac{AE}{AC}=\frac{DE}{BC}$ – היחס שכולל את הצלע המקבילה נמדד תמיד מהקודקוד $A$.`,
      String.raw`**המשפט ההפוך לתאלס**: אם $\frac{AD}{DB}=\frac{AE}{EC}$, אז $DE\parallel BC$.`,
      String.raw`**קטע אמצעים במשולש** מקביל לצלע השלישית ושווה למחציתה; ישר היוצא מאמצע צלע ומקביל לצלע שנייה חוצה את הצלע השלישית. **קטע אמצעים בטרפז** מקביל לבסיסים ושווה למחצית סכומם.`,
      String.raw`**חלוקת קטע ביחס $m:n$**: נקודה $P$ על הקטע $AB$ מחלקת אותו **חלוקה פנימית** אם $\frac{AP}{PB}=\frac mn$; נקודה $Q$ על המשך הקטע מחלקת אותו **חלוקה חיצונית** אם $\frac{AQ}{QB}=\frac mn$.`,
      'בטרפז, כדי לחשב קטע המקביל לבסיסים, מעבירים אלכסון ומשתמשים בתאלס בכל אחד משני המשולשים שנוצרים.',
    ],
    exercises: [
      {
        id: 'geo-thales-1',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ הקטע $DE$ מקביל לצלע $BC$ ($D$ על $AB$, $E$ על $AC$). נתון: $AD=4$, $DB=6$, $AE=5$ (ראו שרטוט). חשבו את $EC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="129.0,51.3 26.0,188.7 294.0,188.7" />
  <line x1="87.8" y1="106.3" x2="195.0" y2="106.3" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="123.5" y="44.3">A</text>
    <text x="11.3" y="203.9">B</text>
    <text x="297.7" y="203.9">C</text>
    <text x="69.3" y="112.3">D</text>
    <text x="202.5" y="112.3">E</text>
  </g>
</svg>`,
        hints: [
          'הישרים המקבילים $DE$ ו-$BC$ חותכים את שוקי הזווית $A$ – אפשר להשתמש במשפט תאלס.',
          String.raw`$\frac{AD}{DB}=\frac{AE}{EC}$.`,
        ],
        solutionSteps: [
          String.raw`$DE\parallel BC$, ולכן לפי משפט תאלס: $\frac{AD}{DB}=\frac{AE}{EC}$.`,
          String.raw`$\frac{4}{6}=\frac{5}{EC}\ \Rightarrow\ EC=\frac{6\cdot5}{4}=7.5$.`,
        ],
        finalAnswer: String.raw`$EC=7.5$`,
        answers: [{ label: String.raw`$EC$`, value: 7.5 }],
      },
      {
        id: 'geo-thales-2',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ נתון: $AB=10$, $AC=12$, $BC=14$. הנקודות $D$ ו-$E$ הן אמצעי הצלעות $AB$ ו-$AC$ (ראו שרטוט). חשבו את $DE$ ואת היקף הטרפז $DBCE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="129.9,39.6 26.0,200.4 294.0,200.4" />
  <line x1="78.0" y1="120.0" x2="212.0" y2="120.0" stroke-width="1.5" />
  <line x1="99.7" y1="77.1" x2="108.1" y2="82.5" stroke-width="1.2" />
  <line x1="47.8" y1="157.5" x2="56.2" y2="162.9" stroke-width="1.2" />
  <line x1="166.0" y1="82.0" x2="173.0" y2="74.8" stroke-width="1.2" />
  <line x1="168.9" y1="84.8" x2="175.9" y2="77.6" stroke-width="1.2" />
  <line x1="248.1" y1="162.4" x2="255.1" y2="155.2" stroke-width="1.2" />
  <line x1="250.9" y1="165.2" x2="257.9" y2="158.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="124.4" y="32.6">A</text>
    <text x="11.3" y="215.6">B</text>
    <text x="297.7" y="215.6">C</text>
    <text x="59.5" y="126.0">D</text>
    <text x="219.5" y="126.0">E</text>
  </g>
</svg>`,
        hints: [
          'קטע אמצעים במשולש מקביל לצלע השלישית ושווה למחציתה.',
          String.raw`$DB=\frac12AB$ ו-$EC=\frac12AC$.`,
        ],
        solutionSteps: [
          String.raw`$DE$ מחבר את אמצעי שתי צלעות, ולכן הוא קטע אמצעים במשולש: $DE\parallel BC$ ו-$DE=\frac12BC=7$.`,
          String.raw`$DB=\frac12AB=5$ ו-$EC=\frac12AC=6$.`,
          String.raw`היקף הטרפז $DBCE$: $DB+BC+CE+ED=5+14+6+7=32$.`,
        ],
        finalAnswer: String.raw`$DE=7$, היקף הטרפז $32$.`,
        answers: [
          { label: String.raw`$DE$`, value: 7 },
          { label: 'היקף הטרפז', value: 32 },
        ],
      },
      {
        id: 'geo-thales-3',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון: $BC=15$, $AC=12$. הקטע $DE$ מקביל ל-$BC$ ($D$ על $AB$, $E$ על $AC$), ו-$AD=6$, $DB=4$ (ראו שרטוט). חשבו את $DE$ ואת $AE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="133.8,48.8 26.0,191.2 294.0,191.2" />
  <line x1="69.1" y1="134.2" x2="229.9" y2="134.2" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="128.3" y="41.8">A</text>
    <text x="11.3" y="206.4">B</text>
    <text x="297.7" y="206.4">C</text>
    <text x="50.6" y="140.2">D</text>
    <text x="237.4" y="140.2">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`$AB=AD+DB=10$.`,
          String.raw`לפי משפט תאלס המורחב: $\frac{AD}{AB}=\frac{AE}{AC}=\frac{DE}{BC}$.`,
        ],
        solutionSteps: [
          String.raw`$AB=AD+DB=10$. $DE\parallel BC$, ולכן לפי משפט תאלס המורחב: $\frac{AD}{AB}=\frac{AE}{AC}=\frac{DE}{BC}$.`,
          String.raw`$\frac{DE}{15}=\frac{6}{10}\ \Rightarrow\ DE=9$.`,
          String.raw`$\frac{AE}{12}=\frac{6}{10}\ \Rightarrow\ AE=7.2$.`,
        ],
        finalAnswer: String.raw`$DE=9$, $AE=7.2$.`,
        answers: [
          { label: String.raw`$DE$`, value: 9 },
          { label: String.raw`$AE$`, value: 7.2 },
        ],
      },
      {
        id: 'geo-thales-4',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ הנקודה $D$ על $AB$ והנקודה $E$ על $AC$. נתון: $AD=4$, $DB=6$, $AE=6$, $EC=9$, $BC=20$ (ראו שרטוט). הוכיחו ש-$DE\parallel BC$, וחשבו את $DE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="118.1,71.3 26.0,168.7 294.0,168.7" />
  <line x1="81.3" y1="110.3" x2="188.5" y2="110.3" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="112.6" y="64.3">A</text>
    <text x="11.3" y="183.8">B</text>
    <text x="297.7" y="183.8">C</text>
    <text x="62.8" y="116.3">D</text>
    <text x="192.2" y="107.1">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`השוו את $\frac{AD}{DB}$ ל-$\frac{AE}{EC}$.`,
          'השתמשו במשפט ההפוך לתאלס, ואחר כך במשפט תאלס המורחב.',
        ],
        solutionSteps: [
          String.raw`$\frac{AD}{DB}=\frac46=\frac23$ ו-$\frac{AE}{EC}=\frac69=\frac23$, כלומר $\frac{AD}{DB}=\frac{AE}{EC}$.`,
          String.raw`לפי המשפט ההפוך למשפט תאלס: $DE\parallel BC$.`,
          String.raw`לפי משפט תאלס המורחב: $\frac{DE}{BC}=\frac{AD}{AB}=\frac{4}{10}$, ולכן $DE=\frac25\cdot20=8$.`,
        ],
        finalAnswer: String.raw`$DE\parallel BC$, $DE=8$.`,
        answers: [{ label: String.raw`$DE$`, value: 8 }],
      },
      {
        id: 'geo-thales-5',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא טרפז ($AB\parallel DC$) שבו $AB=8$ ו-$DC=14$. $EF$ הוא קטע האמצעים של הטרפז ($E$ על $AD$, $F$ על $BC$), והאלכסון $AC$ חותך אותו בנקודה $G$ (ראו שרטוט). חשבו את $EF$, את $EG$ ואת $GF$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="64.3,62.6 217.4,62.6 294.0,177.4 26.0,177.4" />
  <line x1="45.1" y1="120.0" x2="255.7" y2="120.0" stroke-width="1.5" />
  <line x1="64.3" y1="62.6" x2="294.0" y2="177.4" stroke-width="1.5" />
  <line x1="50.0" y1="89.7" x2="59.5" y2="92.9" stroke-width="1.2" />
  <line x1="30.8" y1="147.1" x2="40.3" y2="150.3" stroke-width="1.2" />
  <line x1="231.3" y1="92.4" x2="239.6" y2="86.8" stroke-width="1.2" />
  <line x1="233.5" y1="95.7" x2="241.8" y2="90.2" stroke-width="1.2" />
  <line x1="269.6" y1="149.8" x2="277.9" y2="144.3" stroke-width="1.2" />
  <line x1="271.8" y1="153.2" x2="280.1" y2="147.6" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="49.6" y="59.4">A</text>
    <text x="221.1" y="59.4">B</text>
    <text x="297.7" y="192.6">C</text>
    <text x="11.3" y="192.6">D</text>
    <text x="26.6" y="126.0">E</text>
    <text x="263.2" y="126.0">F</text>
    <text x="173.6" y="112.0">G</text>
  </g>
</svg>`,
        hints: [
          'קטע האמצעים בטרפז שווה למחצית סכום הבסיסים.',
          String.raw`במשולש $ADC$: $E$ אמצע $AD$ ו-$EG\parallel DC$. מה אפשר לומר על הנקודה $G$?`,
        ],
        solutionSteps: [
          String.raw`קטע אמצעים בטרפז מקביל לבסיסים ושווה למחצית סכומם: $EF=\frac{8+14}{2}=11$.`,
          String.raw`במשולש $ADC$: $E$ אמצע $AD$ ו-$EG\parallel DC$, ולכן $G$ אמצע $AC$ (ישר היוצא מאמצע צלע ומקביל לצלע שנייה חוצה את הצלע השלישית). מכאן $EG$ קטע אמצעים במשולש $ADC$: $EG=\frac12DC=7$.`,
          String.raw`במשולש $ABC$: $G$ אמצע $AC$ ו-$F$ אמצע $BC$, לכן $GF$ קטע אמצעים: $GF=\frac12AB=4$ (ואכן $7+4=11$).`,
        ],
        finalAnswer: String.raw`$EF=11$, $EG=7$, $GF=4$.`,
        answers: [
          { label: String.raw`$EF$`, value: 11 },
          { label: String.raw`$EG$`, value: 7 },
          { label: String.raw`$GF$`, value: 4 },
        ],
      },
      {
        id: 'geo-thales-6',
        difficulty: 2,
        statement: String.raw`אורך הקטע $AB$ הוא $10$. הנקודה $P$ מחלקת את $AB$ חלוקה פנימית ביחס $3:2$, והנקודה $Q$ מחלקת את $AB$ חלוקה חיצונית באותו יחס (ראו שרטוט). חשבו את $AP$, את $AQ$ ואת $PQ$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <line x1="26.0" y1="120.0" x2="115.3" y2="120.0" stroke-width="2" />
  <line x1="115.3" y1="120.0" x2="294.0" y2="120.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <circle cx="26.0" cy="120.0" r="2.5" fill="currentColor" />
  <circle cx="79.6" cy="120.0" r="2.5" fill="currentColor" />
  <circle cx="115.3" cy="120.0" r="2.5" fill="currentColor" />
  <circle cx="294.0" cy="120.0" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="20.5" y="113.0">A</text>
    <text x="74.1" y="113.0">P</text>
    <text x="109.8" y="113.0">B</text>
    <text x="288.5" y="113.0">Q</text>
  </g>
</svg>`,
        hints: [
          String.raw`חלוקה פנימית: $AP=3k$, $PB=2k$, ו-$AP+PB=10$.`,
          String.raw`חלוקה חיצונית ביחס $3:2$: $AQ>QB$, ולכן $Q$ נמצאת על המשך הקטע מעבר ל-$B$, ו-$AQ=QB+10$.`,
        ],
        solutionSteps: [
          String.raw`חלוקה פנימית: $\frac{AP}{PB}=\frac32$. נסמן $AP=3k$, $PB=2k$; אז $5k=10$, $k=2$, ולכן $AP=6$ (ו-$PB=4$).`,
          String.raw`חלוקה חיצונית: $\frac{AQ}{QB}=\frac32>1$, כלומר $Q$ קרובה יותר ל-$B$ מאשר ל-$A$ – היא על המשך הקטע מעבר ל-$B$, ו-$AQ=QB+10$.`,
          String.raw`$\frac{QB+10}{QB}=\frac32\ \Rightarrow\ 2QB+20=3QB\ \Rightarrow\ QB=20$, ולכן $AQ=30$.`,
          String.raw`$PQ=AQ-AP=30-6=24$.`,
        ],
        finalAnswer: String.raw`$AP=6$, $AQ=30$, $PQ=24$.`,
        answers: [
          { label: String.raw`$AP$`, value: 6 },
          { label: String.raw`$AQ$`, value: 30 },
          { label: String.raw`$PQ$`, value: 24 },
        ],
      },
      {
        id: 'geo-thales-7',
        difficulty: 3,
        statement: String.raw`$ABCD$ הוא טרפז ($AB\parallel DC$) שבו $AB=6$ ו-$DC=15$. הקטע $EF$ מקביל לבסיסים ($E$ על $AD$, $F$ על $BC$), ו-$AE:ED=1:2$ (ראו שרטוט). חשבו את $EF$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="79.6,66.4 186.8,66.4 294.0,173.6 26.0,173.6" />
  <line x1="61.7" y1="102.1" x2="222.5" y2="102.1" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="64.9" y="63.2">A</text>
    <text x="190.5" y="63.2">B</text>
    <text x="297.7" y="188.8">C</text>
    <text x="11.3" y="188.8">D</text>
    <text x="43.2" y="108.1">E</text>
    <text x="230.0" y="108.1">F</text>
  </g>
</svg>`,
        hints: [
          String.raw`העבירו את האלכסון $AC$, וסמנו את נקודת החיתוך שלו עם $EF$ ב-$G$.`,
          String.raw`במשולש $ADC$: $\frac{EG}{DC}=\frac{AE}{AD}$, ומשפט תאלס נותן גם את $\frac{AG}{GC}$.`,
          String.raw`במשולש $CAB$: $\frac{GF}{AB}=\frac{CG}{CA}$.`,
        ],
        solutionSteps: [
          String.raw`נעביר את האלכסון $AC$ ונסמן ב-$G$ את נקודת החיתוך שלו עם $EF$.`,
          String.raw`במשולש $ADC$: $EG\parallel DC$. לפי משפט תאלס $\frac{AG}{GC}=\frac{AE}{ED}=\frac12$, ולפי משפט תאלס המורחב $\frac{EG}{DC}=\frac{AE}{AD}=\frac13$, ולכן $EG=5$.`,
          String.raw`במשולש $CAB$: $GF\parallel AB$, ולכן לפי משפט תאלס המורחב $\frac{GF}{AB}=\frac{CG}{CA}=\frac23$, כלומר $GF=4$.`,
          String.raw`$EF=EG+GF=5+4=9$.`,
        ],
        finalAnswer: String.raw`$EF=9$`,
        answers: [{ label: String.raw`$EF$`, value: 9 }],
      },
      {
        id: 'geo-thales-8',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ הקטע $AD$ הוא תיכון, $E$ היא אמצע $AD$, והמשך $BE$ חותך את $AC$ בנקודה $F$ (ראו שרטוט). הוכיחו ש-$AF=\frac13AC$, וחשבו את $AF$ ואת $FC$ אם $AC=12$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="116.9,26.0 62.1,214.0 257.9,214.0" />
  <line x1="116.9" y1="26.0" x2="160.0" y2="214.0" stroke-width="1.5" />
  <line x1="62.1" y1="214.0" x2="163.9" y2="88.7" stroke-width="1.5" />
  <line x1="111.0" y1="219.0" x2="111.0" y2="209.0" stroke-width="1.2" />
  <line x1="209.0" y1="219.0" x2="209.0" y2="209.0" stroke-width="1.2" />
  <line x1="122.4" y1="72.2" x2="132.1" y2="69.9" stroke-width="1.2" />
  <line x1="123.3" y1="76.1" x2="133.0" y2="73.8" stroke-width="1.2" />
  <line x1="143.9" y1="166.2" x2="153.7" y2="163.9" stroke-width="1.2" />
  <line x1="144.8" y1="170.1" x2="154.5" y2="167.8" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="111.4" y="19.0">A</text>
    <text x="47.4" y="229.2">B</text>
    <text x="261.6" y="229.2">C</text>
    <text x="154.5" y="233.0">D</text>
    <text x="119.0" y="126.0">E</text>
    <text x="167.6" y="85.5">F</text>
  </g>
</svg>`,
        hints: [
          String.raw`העבירו דרך $D$ ישר המקביל ל-$BF$, החותך את $AC$ בנקודה $K$.`,
          String.raw`במשולש $BCF$: $D$ אמצע $BC$ ו-$DK\parallel BF$, לכן $K$ אמצע $FC$.`,
          String.raw`במשולש $ADK$: $E$ אמצע $AD$ ו-$EF\parallel DK$, לכן $F$ אמצע $AK$.`,
        ],
        solutionSteps: [
          String.raw`נעביר דרך $D$ ישר המקביל ל-$BF$, והוא חותך את $AC$ בנקודה $K$.`,
          String.raw`במשולש $BCF$: $D$ אמצע $BC$ ו-$DK\parallel BF$, ולכן $K$ אמצע $FC$ (ישר היוצא מאמצע צלע ומקביל לצלע שנייה חוצה את הצלע השלישית): $FK=KC$.`,
          String.raw`במשולש $ADK$: $E$ אמצע $AD$ ו-$EF\parallel DK$, ולכן $F$ אמצע $AK$: $AF=FK$.`,
          String.raw`מכאן $AF=FK=KC$, כלומר $AF=\frac13AC$.`,
          String.raw`עבור $AC=12$: $AF=4$ ו-$FC=8$.`,
        ],
        finalAnswer: String.raw`$AF=4$, $FC=8$.`,
        answers: [
          { label: String.raw`$AF$`, value: 4 },
          { label: String.raw`$FC$`, value: 8 },
        ],
      },
    ],
  },
  'geo-angle-bisector': {
    intro: String.raw`משפט חוצה זווית פנימית במשולש קובע שחוצה זווית מחלק את הצלע שמול הזווית ביחס הצלעות הכולאות את הזווית. בעזרתו מוצאים את הקטעים שעל הצלע השלישית, צלע חסרה, ואת יחס השטחים של שני המשולשים שנוצרים. לפי המיקוד רק חוצה הזווית **הפנימית** בתכנית – משפט חוצה הזווית החיצונית אינו בחומר ואין לצטט אותו. בבגרות (שאלה 4 בשאלון 806) המשפט משולב לרוב עם תאלס ועם דמיון משולשים.`,
    keyFacts: [
      String.raw`**משפט חוצה זווית פנימית**: אם $AD$ חוצה את $\angle A$ במשולש $ABC$ ($D$ על $BC$), אז $\frac{BD}{DC}=\frac{AB}{AC}$.`,
      String.raw`בפועל: אם $\frac{AB}{AC}=\frac mn$, מסמנים $BD=mk$, $DC=nk$ ומוצאים את $k$ מ-$BD+DC=BC$.`,
      String.raw`**יחס שטחים**: למשולשים $ABD$ ו-$ADC$ אותו גובה מ-$A$, ולכן $\frac{S_{ABD}}{S_{ADC}}=\frac{BD}{DC}=\frac{AB}{AC}$.`,
      String.raw`חוצי הזוויות של משולש נפגשים בנקודה אחת $I$ (מרכז המעגל החסום). במשולש $ABD$ הקטע $BI$ חוצה זווית, ולכן $\frac{AI}{ID}=\frac{AB}{BD}$.`,
      String.raw`חוצה זווית יחד עם ישר המקביל לאחת משוקי הזווית יוצר משולש שווה שוקיים (זוויות מתחלפות שוות).`,
      'משפט חוצה הזווית החיצונית אינו בתכנית – בבחינה לא משתמשים בו.',
    ],
    exercises: [
      {
        id: 'geo-angle-bisector-1',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ נתון: $AB=8$, $AC=12$, $BC=15$. $AD$ חוצה את הזווית $A$ ($D$ על $BC$, ראו שרטוט). חשבו את $BD$ ואת $DC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="112.4,63.1 26.0,176.9 294.0,176.9" />
  <line x1="112.4" y1="63.1" x2="133.2" y2="176.9" stroke-width="1.5" />
  <path d="M 99.1,80.6 A 22 22 0 0 0 116.3,84.7" stroke-width="1.2" />
  <line x1="108.2" y1="80.6" x2="106.3" y2="88.3" stroke-width="1.2" />
  <path d="M 116.3,84.7 A 22 22 0 0 0 131.0,74.7" stroke-width="1.2" />
  <line x1="122.5" y1="77.9" x2="126.9" y2="84.6" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="106.9" y="56.1">A</text>
    <text x="11.3" y="192.1">B</text>
    <text x="297.7" y="192.1">C</text>
    <text x="127.7" y="195.9">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`לפי משפט חוצה זווית: $\frac{BD}{DC}=\frac{AB}{AC}$.`,
          String.raw`סמנו $BD=2k$, $DC=3k$.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט חוצה זווית פנימית במשולש: $\frac{BD}{DC}=\frac{AB}{AC}=\frac{8}{12}=\frac23$.`,
          String.raw`נסמן $BD=2k$, $DC=3k$. $BD+DC=BC$: $5k=15$, $k=3$.`,
          String.raw`$BD=6$, $DC=9$.`,
        ],
        finalAnswer: String.raw`$BD=6$, $DC=9$.`,
        answers: [
          { label: String.raw`$BD$`, value: 6 },
          { label: String.raw`$DC$`, value: 9 },
        ],
      },
      {
        id: 'geo-angle-bisector-2',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ הקטע $AD$ חוצה את הזווית $A$ ($D$ על $BC$, ראו שרטוט). נתון: $AB=10$, $BD=6$, $DC=9$. חשבו את $AC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="85.6,35.8 26.0,204.2 294.0,204.2" />
  <line x1="85.6" y1="35.8" x2="133.2" y2="204.2" stroke-width="1.5" />
  <path d="M 78.2,56.5 A 22 22 0 0 0 91.5,56.9" stroke-width="1.2" />
  <line x1="85.0" y1="53.8" x2="84.7" y2="61.8" stroke-width="1.2" />
  <path d="M 91.5,56.9 A 22 22 0 0 0 102.7,49.6" stroke-width="1.2" />
  <line x1="95.5" y1="50.8" x2="99.9" y2="57.5" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="80.1" y="28.8">A</text>
    <text x="11.3" y="219.4">B</text>
    <text x="297.7" y="219.4">C</text>
    <text x="127.7" y="223.2">D</text>
  </g>
</svg>`,
        hints: [String.raw`$\frac{AB}{AC}=\frac{BD}{DC}$.`],
        solutionSteps: [
          String.raw`לפי משפט חוצה זווית פנימית במשולש: $\frac{AB}{AC}=\frac{BD}{DC}$.`,
          String.raw`$\frac{10}{AC}=\frac69\ \Rightarrow\ AC=\frac{10\cdot9}{6}=15$.`,
        ],
        finalAnswer: String.raw`$AC=15$`,
        answers: [{ label: String.raw`$AC$`, value: 15 }],
      },
      {
        id: 'geo-angle-bisector-3',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ הזווית $C$ ישרה, $AC=6$ ו-$BC=8$. חוצה הזווית $A$ חותך את $BC$ בנקודה $D$ (ראו שרטוט). חשבו את $CD$, את $DB$ ואת אורך חוצה הזווית $AD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="34.7,26.0 285.3,214.0 34.7,214.0" />
  <line x1="34.7" y1="26.0" x2="128.7" y2="214.0" stroke-width="1.5" />
  <polyline points="34.7,206.0 42.7,206.0 42.7,214.0" stroke-width="1" />
  <path d="M 34.7,52.0 A 26 26 0 0 0 46.3,49.3" stroke-width="1.2" />
  <line x1="39.7" y1="47.4" x2="41.6" y2="55.2" stroke-width="1.2" />
  <path d="M 46.3,49.3 A 26 26 0 0 0 55.5,41.6" stroke-width="1.2" />
  <line x1="48.8" y1="42.9" x2="53.9" y2="49.0" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="20.0" y="22.8">A</text>
    <text x="289.0" y="229.2">B</text>
    <text x="20.0" y="229.2">C</text>
    <text x="123.2" y="233.0">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`חשבו את היתר $AB$ בעזרת משפט פיתגורס.`,
          String.raw`$\frac{CD}{DB}=\frac{AC}{AB}$.`,
          String.raw`את $AD$ מוצאים מהמשולש הישר-זווית $ACD$.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט פיתגורס: $AB=\sqrt{6^2+8^2}=10$.`,
          String.raw`לפי משפט חוצה זווית פנימית: $\frac{CD}{DB}=\frac{AC}{AB}=\frac{6}{10}=\frac35$. נסמן $CD=3k$, $DB=5k$: $8k=8$, $k=1$, ולכן $CD=3$, $DB=5$.`,
          String.raw`במשולש ישר הזווית $ACD$: $AD=\sqrt{AC^2+CD^2}=\sqrt{36+9}=\sqrt{45}=3\sqrt5\approx6.71$.`,
        ],
        finalAnswer: String.raw`$CD=3$, $DB=5$, $AD=3\sqrt5\approx6.71$.`,
        answers: [
          { label: String.raw`$CD$`, value: 3 },
          { label: String.raw`$DB$`, value: 5 },
          { label: String.raw`$AD$`, value: 3 * Math.sqrt(5) },
        ],
      },
      {
        id: 'geo-angle-bisector-4',
        difficulty: 2,
        statement: String.raw`במשולש שווה השוקיים $ABC$ ($AB=AC=12$) הבסיס הוא $BC=8$. חוצה הזווית $B$ חותך את השוק $AC$ בנקודה $E$ (ראו שרטוט). חשבו את $AE$ ואת $EC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="160.0,26.0 93.5,214.0 226.5,214.0" />
  <line x1="93.5" y1="214.0" x2="199.9" y2="138.8" stroke-width="1.5" />
  <path d="M 115.5,214.0 A 22 22 0 0 0 111.5,201.3" stroke-width="1.2" />
  <line x1="110.7" y1="208.5" x2="118.3" y2="206.1" stroke-width="1.2" />
  <path d="M 111.5,201.3 A 22 22 0 0 0 100.9,193.3" stroke-width="1.2" />
  <line x1="104.4" y1="199.6" x2="109.2" y2="193.3" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="154.5" y="19.0">A</text>
    <text x="78.8" y="229.2">B</text>
    <text x="230.2" y="229.2">C</text>
    <text x="207.4" y="144.8">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`חוצה הזווית יוצא מ-$B$, ולכן הצלעות הכולאות את הזווית הן $BA$ ו-$BC$.`,
          String.raw`$\frac{AE}{EC}=\frac{BA}{BC}$.`,
        ],
        solutionSteps: [
          String.raw`$BE$ חוצה את $\angle ABC$, ולכן לפי משפט חוצה זווית פנימית במשולש: $\frac{AE}{EC}=\frac{BA}{BC}=\frac{12}{8}=\frac32$.`,
          String.raw`נסמן $AE=3k$, $EC=2k$. $AE+EC=AC=12$: $5k=12$, $k=2.4$.`,
          String.raw`$AE=7.2$, $EC=4.8$.`,
        ],
        finalAnswer: String.raw`$AE=7.2$, $EC=4.8$.`,
        answers: [
          { label: String.raw`$AE$`, value: 7.2 },
          { label: String.raw`$EC$`, value: 4.8 },
        ],
      },
      {
        id: 'geo-angle-bisector-5',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון: $AB=8$, $AC=12$, ושטח המשולש הוא $40$. $AD$ חוצה את הזווית $A$ ($D$ על $BC$, ראו שרטוט). חשבו את $S_{ABD}$ ואת $S_{ADC}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="66.0,26.0 40.3,214.0 279.7,214.0" />
  <line x1="66.0" y1="26.0" x2="136.1" y2="214.0" stroke-width="1.5" />
  <path d="M 63.0,47.8 A 22 22 0 0 0 73.7,46.6" stroke-width="1.2" />
  <line x1="68.0" y1="43.9" x2="68.9" y2="51.8" stroke-width="1.2" />
  <path d="M 73.7,46.6 A 22 22 0 0 0 82.5,40.5" stroke-width="1.2" />
  <line x1="76.2" y1="40.8" x2="80.7" y2="47.4" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="60.5" y="19.0">A</text>
    <text x="25.6" y="229.2">B</text>
    <text x="283.4" y="229.2">C</text>
    <text x="130.6" y="233.0">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`למשולשים $ABD$ ו-$ADC$ יש גובה משותף מ-$A$, ולכן יחס שטחיהם הוא $\frac{BD}{DC}$.`,
          String.raw`את $\frac{BD}{DC}$ נותן משפט חוצה הזווית.`,
        ],
        solutionSteps: [
          String.raw`לפי משפט חוצה זווית פנימית במשולש: $\frac{BD}{DC}=\frac{AB}{AC}=\frac{8}{12}=\frac23$.`,
          String.raw`למשולשים $ABD$ ו-$ADC$ אותו גובה – הגובה מ-$A$ לישר $BC$ – ולכן $\frac{S_{ABD}}{S_{ADC}}=\frac{BD}{DC}=\frac23$.`,
          String.raw`נסמן $S_{ABD}=2t$, $S_{ADC}=3t$: $5t=40$, $t=8$. לכן $S_{ABD}=16$, $S_{ADC}=24$.`,
        ],
        finalAnswer: String.raw`$S_{ABD}=16$, $S_{ADC}=24$.`,
        answers: [
          { label: String.raw`$S_{ABD}$`, value: 16 },
          { label: String.raw`$S_{ADC}$`, value: 24 },
        ],
      },
      {
        id: 'geo-angle-bisector-6',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון: $AB=10$, $AC=15$, $BC=20$. $AD$ חוצה את הזווית $A$ ($D$ על $BC$). דרך $D$ העבירו ישר המקביל ל-$AC$, החותך את $AB$ בנקודה $E$ (ראו שרטוט).

א. חשבו את $BD$.

ב. הוכיחו שהמשולש $AED$ שווה שוקיים.

ג. חשבו את $DE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="118.1,71.3 26.0,168.7 294.0,168.7" />
  <line x1="118.1" y1="71.3" x2="133.2" y2="168.7" stroke-width="1.5" />
  <line x1="133.2" y1="168.7" x2="62.9" y2="129.7" stroke-width="1.5" />
  <path d="M 103.0,87.3 A 22 22 0 0 0 121.5,93.1" stroke-width="1.2" />
  <line x1="112.8" y1="88.5" x2="110.4" y2="96.2" stroke-width="1.2" />
  <path d="M 121.5,93.1 A 22 22 0 0 0 137.4,82.0" stroke-width="1.2" />
  <line x1="128.4" y1="86.1" x2="133.0" y2="92.7" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="112.6" y="64.3">A</text>
    <text x="11.3" y="183.8">B</text>
    <text x="297.7" y="183.8">C</text>
    <text x="127.7" y="187.7">D</text>
    <text x="44.4" y="135.7">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`א. משפט חוצה זווית: $\frac{BD}{DC}=\frac{AB}{AC}$.`,
          String.raw`ב. $\angle EDA=\angle DAC$ (זוויות מתחלפות) ו-$\angle DAC=\angle EAD$ (חוצה זווית).`,
          String.raw`ג. במשולש $ABC$: $ED\parallel AC$, ולכן לפי משפט תאלס המורחב $\frac{ED}{AC}=\frac{BD}{BC}$.`,
        ],
        solutionSteps: [
          String.raw`א. לפי משפט חוצה זווית פנימית: $\frac{BD}{DC}=\frac{AB}{AC}=\frac{10}{15}=\frac23$. עם $BD+DC=20$: $BD=8$, $DC=12$.`,
          String.raw`ב. $ED\parallel AC$ והישר $AD$ חותך אותם, לכן $\angle EDA=\angle DAC$ (זוויות מתחלפות). $AD$ חוצה את הזווית $A$, לכן $\angle DAC=\angle EAD$.`,
          String.raw`מכאן $\angle EDA=\angle EAD$, ובמשולש מול זוויות שוות מונחות צלעות שוות: $EA=ED$ – המשולש $AED$ שווה שוקיים.`,
          String.raw`ג. במשולש $ABC$: $ED\parallel AC$, ולכן לפי משפט תאלס המורחב $\frac{ED}{AC}=\frac{BD}{BC}=\frac{8}{20}$, כלומר $ED=\frac25\cdot15=6$.`,
          String.raw`בדיקה: לפי תאלס גם $\frac{AE}{AB}=\frac{CD}{CB}=\frac{12}{20}$, ולכן $AE=6=ED$ – בהתאם לסעיף ב.`,
        ],
        finalAnswer: String.raw`$BD=8$, $DE=6$.`,
        answers: [
          { label: String.raw`$BD$`, value: 8 },
          { label: String.raw`$DE$`, value: 6 },
        ],
      },
      {
        id: 'geo-angle-bisector-7',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ הקטע $AD$ חוצה את הזווית $A$ ($D$ על $BC$, ראו שרטוט). נתון: $AB=6$, $BD=x$, $DC=x+2$, $AC=x+5$. מצאו את $x$ ואת אורך הצלע $BC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="99.7,48.5 26.0,191.5 294.0,191.5" />
  <line x1="99.7" y1="48.5" x2="133.2" y2="191.5" stroke-width="1.5" />
  <path d="M 89.6,68.1 A 22 22 0 0 0 104.7,70.0" stroke-width="1.2" />
  <line x1="97.5" y1="66.4" x2="96.5" y2="74.3" stroke-width="1.2" />
  <path d="M 104.7,70.0 A 22 22 0 0 0 117.4,61.6" stroke-width="1.2" />
  <line x1="109.6" y1="63.6" x2="114.0" y2="70.2" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="94.2" y="41.5">A</text>
    <text x="11.3" y="206.7">B</text>
    <text x="297.7" y="206.7">C</text>
    <text x="127.7" y="210.5">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`רשמו את משפט חוצה הזווית: $\frac{BD}{DC}=\frac{AB}{AC}$.`,
          'כפלו בהצלבה וקבלו משוואה ריבועית.',
          'אורך של קטע חייב להיות חיובי.',
        ],
        solutionSteps: [
          String.raw`לפי משפט חוצה זווית פנימית במשולש: $\frac{x}{x+2}=\frac{6}{x+5}$.`,
          String.raw`כפל בהצלבה: $x(x+5)=6(x+2)$, כלומר $x^2+5x=6x+12$, ולכן $x^2-x-12=0$.`,
          String.raw`$(x-4)(x+3)=0$, ולכן $x=4$ או $x=-3$. אורך קטע חיובי, לכן $x=4$.`,
          String.raw`$BD=4$, $DC=6$, ולכן $BC=10$ (וגם $AC=9$; אי-שוויון המשולש מתקיים).`,
        ],
        finalAnswer: String.raw`$x=4$, $BC=10$.`,
        answers: [
          { label: String.raw`$x$`, value: 4 },
          { label: String.raw`$BC$`, value: 10 },
        ],
      },
      {
        id: 'geo-angle-bisector-8',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ נתון: $AB=8$, $AC=12$, $BC=10$. חוצה הזווית $A$ חותך את $BC$ בנקודה $D$, וחוצה הזווית $B$ (הקטע $BE$, $E$ על $AC$) חותך את $AD$ בנקודה $I$ (ראו שרטוט). חשבו את $BD$ ואת היחס $\frac{AI}{ID}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="65.3,26.0 41.6,214.0 278.4,214.0" />
  <line x1="65.3" y1="26.0" x2="136.3" y2="214.0" stroke-width="1.5" />
  <line x1="41.6" y1="214.0" x2="160.0" y2="109.6" stroke-width="1.5" />
  <path d="M 62.5,47.8 A 22 22 0 0 0 73.0,46.6" stroke-width="1.2" />
  <path d="M 74.4,50.3 A 26 26 0 0 0 84.8,43.2" stroke-width="1.2" />
  <path d="M 61.6,214.0 A 20 20 0 0 0 56.6,200.8" stroke-width="1.2" />
  <path d="M 65.6,214.0 A 24 24 0 0 0 59.6,198.1" stroke-width="1.2" />
  <path d="M 56.6,200.8 A 20 20 0 0 0 44.1,194.2" stroke-width="1.2" />
  <path d="M 59.6,198.1 A 24 24 0 0 0 44.6,190.2" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="59.8" y="19.0">A</text>
    <text x="26.9" y="229.2">B</text>
    <text x="282.1" y="229.2">C</text>
    <text x="130.8" y="233.0">D</text>
    <text x="163.7" y="106.4">E</text>
    <text x="112.9" y="144.6">I</text>
  </g>
</svg>`,
        hints: [
          String.raw`מצאו את $BD$ ממשפט חוצה הזווית במשולש $ABC$.`,
          String.raw`במשולש $ABD$ הקטע $BI$ חוצה את הזווית $B$.`,
          String.raw`$\frac{AI}{ID}=\frac{BA}{BD}$.`,
        ],
        solutionSteps: [
          String.raw`במשולש $ABC$, לפי משפט חוצה זווית פנימית: $\frac{BD}{DC}=\frac{AB}{AC}=\frac{8}{12}=\frac23$, ועם $BD+DC=10$: $BD=4$.`,
          String.raw`$BI$ חוצה את $\angle ABC$, שהיא גם הזווית $\angle ABD$ של המשולש $ABD$. לכן במשולש $ABD$, לפי משפט חוצה זווית פנימית: $\frac{AI}{ID}=\frac{BA}{BD}$.`,
          String.raw`$\frac{AI}{ID}=\frac{8}{4}=2$.`,
        ],
        finalAnswer: String.raw`$BD=4$, $\frac{AI}{ID}=2$.`,
        answers: [
          { label: String.raw`$BD$`, value: 4 },
          { label: String.raw`$\frac{AI}{ID}$`, value: 2 },
        ],
      },
    ],
  },
  'geo-similarity': {
    intro: String.raw`שני משולשים דומים אם הזוויות המתאימות שלהם שוות והצלעות המתאימות פרופורציוניות; היחס הקבוע הוא יחס הדמיון $k$. כדי להוכיח דמיון משתמשים באחד משלושת משפטי הדמיון – ז.ז, צ.ז.צ או צ.צ.צ – שבבגרות משמשים בלי הוכחה. אחרי שהוכחנו דמיון, רושמים את יחס הצלעות המתאימות לפי סדר הקודקודים, ומחשבים אורכים או מוכיחים שוויון מכפלות. זהו לב שאלה 4 בשאלון 806: כמעט בכל שאלה יש סעיף ״הוכיחו כי המשולשים דומים״.`,
    keyFacts: [
      String.raw`**ז.ז**: אם שתי זוויות במשולש אחד שוות לשתי זוויות במשולש אחר – המשולשים דומים.`,
      String.raw`**צ.ז.צ**: אם שתי צלעות במשולש אחד פרופורציוניות לשתי צלעות במשולש אחר, והזוויות שביניהן שוות – המשולשים דומים.`,
      String.raw`**צ.צ.צ**: אם שלוש הצלעות של משולש אחד פרופורציוניות לשלוש הצלעות של משולש אחר – המשולשים דומים.`,
      String.raw`בכתיבה $\triangle ABC\sim\triangle DEF$ סדר הקודקודים קובע את ההתאמה: $\frac{AB}{DE}=\frac{BC}{EF}=\frac{AC}{DF}$, ו-$\angle A=\angle D$, $\angle B=\angle E$, $\angle C=\angle F$.`,
      String.raw`מקורות נפוצים לזוויות שוות: זווית משותפת, זוויות קודקודיות, זוויות מתחלפות או מתאימות בין ישרים מקבילים, זוויות ישרות. ישר המקביל לצלע במשולש יוצר משולש הדומה למשולש המקורי.`,
      String.raw`מפרופורציה למכפלה: $\frac{AB}{DE}=\frac{BC}{EF}\ \Leftrightarrow\ AB\cdot EF=DE\cdot BC$.`,
    ],
    exercises: [
      {
        id: 'geo-similarity-1',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ נתון: $AB=4$, $BC=6$, $AC=8$. במשולש $DEF$ נתון: $DE=6$, $EF=9$, $DF=12$ (ראו שרטוט). הוכיחו ש-$\triangle ABC\sim\triangle DEF$, ומצאו את יחס הדמיון $\frac{DE}{AB}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.0,106.3 40.1,161.0 124.7,161.0" />
  <polygon points="145.9,79.0 167.1,161.0 294.0,161.0" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="20.5" y="99.3">A</text>
    <text x="34.6" y="180.0">B</text>
    <text x="119.2" y="180.0">C</text>
    <text x="140.4" y="72.0">D</text>
    <text x="161.6" y="180.0">E</text>
    <text x="288.5" y="180.0">F</text>
  </g>
</svg>`,
        hints: [
          'סדרו את הצלעות של כל משולש מהקטנה לגדולה, וחלקו כל צלע בצלע המתאימה לה.',
          'אם שלושת היחסים שווים – השתמשו במשפט הדמיון צ.צ.צ.',
        ],
        solutionSteps: [
          String.raw`נחשב את יחסי הצלעות המתאימות (קטנה לקטנה, בינונית לבינונית, גדולה לגדולה): $\frac{DE}{AB}=\frac64=1.5$, $\frac{EF}{BC}=\frac96=1.5$, $\frac{DF}{AC}=\frac{12}{8}=1.5$.`,
          String.raw`שלוש הצלעות פרופורציוניות, ולכן לפי משפט הדמיון צ.צ.צ: $\triangle ABC\sim\triangle DEF$, ויחס הדמיון $\frac{DE}{AB}=1.5$.`,
          String.raw`מהדמיון נובע גם שהזוויות המתאימות שוות: $\angle A=\angle D$, $\angle B=\angle E$, $\angle C=\angle F$.`,
        ],
        finalAnswer: String.raw`$\triangle ABC\sim\triangle DEF$ (צ.צ.צ), $\frac{DE}{AB}=1.5$.`,
        answers: [{ label: String.raw`$\frac{DE}{AB}$`, value: 1.5 }],
      },
      {
        id: 'geo-similarity-2',
        difficulty: 1,
        statement: String.raw`במשולשים $ABC$ ו-$DEF$ נתון: $\angle A=\angle D$, $\angle B=\angle E$. כמו כן $AB=6$, $BC=8$, $AC=7$, $DE=9$ (ראו שרטוט). הוכיחו שהמשולשים דומים, וחשבו את $EF$ ואת $DF$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="63.1,105.2 26.0,164.4 119.2,164.4" />
  <polygon points="209.9,75.6 154.2,164.4 294.0,164.4" />
  <path d="M 54.6,118.7 A 16 16 0 0 0 74.1,116.8" stroke-width="1.2" />
  <path d="M 201.4,89.1 A 16 16 0 0 0 220.9,87.2" stroke-width="1.2" />
  <path d="M 40.0,164.4 A 14 14 0 0 0 33.4,152.6" stroke-width="1.2" />
  <path d="M 44.0,164.4 A 18 18 0 0 0 35.6,149.2" stroke-width="1.2" />
  <path d="M 168.2,164.4 A 14 14 0 0 0 161.6,152.6" stroke-width="1.2" />
  <path d="M 172.2,164.4 A 18 18 0 0 0 163.7,149.2" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="57.6" y="98.2">A</text>
    <text x="20.5" y="183.4">B</text>
    <text x="113.7" y="183.4">C</text>
    <text x="204.4" y="68.6">D</text>
    <text x="148.7" y="183.4">E</text>
    <text x="288.5" y="183.4">F</text>
  </g>
</svg>`,
        hints: [
          'שתי זוויות שוות – משפט הדמיון ז.ז.',
          String.raw`יחס הדמיון $k=\frac{DE}{AB}$.`,
        ],
        solutionSteps: [
          String.raw`$\angle A=\angle D$ ו-$\angle B=\angle E$, ולכן לפי משפט הדמיון ז.ז: $\triangle ABC\sim\triangle DEF$ (התאמה $A\leftrightarrow D$, $B\leftrightarrow E$, $C\leftrightarrow F$).`,
          String.raw`יחס הדמיון: $k=\frac{DE}{AB}=\frac96=1.5$.`,
          String.raw`$EF=1.5\cdot BC=12$ ו-$DF=1.5\cdot AC=10.5$.`,
        ],
        finalAnswer: String.raw`$EF=12$, $DF=10.5$.`,
        answers: [
          { label: String.raw`$EF$`, value: 12 },
          { label: String.raw`$DF$`, value: 10.5 },
        ],
      },
      {
        id: 'geo-similarity-3',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון: $AB=12$, $AC=8$, $BC=14$. הנקודה $D$ על $AB$ והנקודה $E$ על $AC$ כך ש-$AD=4$ ו-$AE=6$ (ראו שרטוט). הוכיחו ש-$\triangle ADE\sim\triangle ACB$, וחשבו את $DE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.0,209.2 294.0,209.2 37.2,30.8" />
  <line x1="115.3" y1="209.2" x2="34.4" y2="75.4" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="11.3" y="224.4">A</text>
    <text x="297.7" y="224.4">B</text>
    <text x="31.7" y="23.8">C</text>
    <text x="109.8" y="228.2">D</text>
    <text x="15.9" y="81.4">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`לשני המשולשים הזווית $A$ משותפת.`,
          String.raw`בדקו את היחסים $\frac{AD}{AC}$ ו-$\frac{AE}{AB}$ – שימו לב ש-$D$ מתאים ל-$C$.`,
          'השתמשו במשפט הדמיון צ.ז.צ.',
        ],
        solutionSteps: [
          String.raw`במשולשים $ADE$ ו-$ACB$ הזווית $A$ משותפת.`,
          String.raw`$\frac{AD}{AC}=\frac48=\frac12$ ו-$\frac{AE}{AB}=\frac{6}{12}=\frac12$, כלומר הצלעות הכולאות את הזווית $A$ פרופורציוניות.`,
          String.raw`לכן לפי משפט הדמיון צ.ז.צ: $\triangle ADE\sim\triangle ACB$ (התאמה $A\leftrightarrow A$, $D\leftrightarrow C$, $E\leftrightarrow B$), ביחס דמיון $\frac12$.`,
          String.raw`הצלע $DE$ מתאימה לצלע $CB$: $\frac{DE}{CB}=\frac12$, ולכן $DE=7$.`,
          String.raw`שימו לב: $DE$ אינו מקביל ל-$BC$ – ההתאמה כאן ״הפוכה״ ($D$ מתאים ל-$C$).`,
        ],
        finalAnswer: String.raw`$DE=7$`,
        answers: [{ label: String.raw`$DE$`, value: 7 }],
      },
      {
        id: 'geo-similarity-4',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא טרפז ($AB\parallel DC$) שבו $AB=6$ ו-$DC=15$. האלכסונים נפגשים בנקודה $O$, ואורך האלכסון $AC$ הוא $14$ (ראו שרטוט). הוכיחו ש-$\triangle AOB\sim\triangle COD$, וחשבו את $AO$ ואת $OC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="88.7,48.5 195.9,48.5 294.0,191.5 26.0,191.5" />
  <line x1="88.7" y1="48.5" x2="294.0" y2="191.5" stroke-width="1.5" />
  <line x1="195.9" y1="48.5" x2="26.0" y2="191.5" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="74.0" y="45.3">A</text>
    <text x="199.6" y="45.3">B</text>
    <text x="297.7" y="206.7">C</text>
    <text x="11.3" y="206.7">D</text>
    <text x="141.9" y="110.4">O</text>
  </g>
</svg>`,
        hints: [
          'חפשו זוויות מתחלפות בין הבסיסים המקבילים.',
          String.raw`מהדמיון: $\frac{AO}{CO}=\frac{AB}{CD}$.`,
        ],
        solutionSteps: [
          String.raw`$AB\parallel DC$, ולכן $\angle BAO=\angle DCO$ ו-$\angle ABO=\angle CDO$ (זוויות מתחלפות בין ישרים מקבילים).`,
          String.raw`לפי משפט הדמיון ז.ז: $\triangle AOB\sim\triangle COD$ (התאמה $A\leftrightarrow C$, $B\leftrightarrow D$, $O\leftrightarrow O$).`,
          String.raw`$\frac{AO}{CO}=\frac{AB}{CD}=\frac{6}{15}=\frac25$. נסמן $AO=2k$, $CO=5k$; הנקודה $O$ על $AC$, לכן $7k=14$, $k=2$.`,
          String.raw`$AO=4$, $OC=10$.`,
        ],
        finalAnswer: String.raw`$AO=4$, $OC=10$.`,
        answers: [
          { label: String.raw`$AO$`, value: 4 },
          { label: String.raw`$OC$`, value: 10 },
        ],
      },
      {
        id: 'geo-similarity-5',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$, $BE$ הוא הגובה לצלע $AC$ ו-$CF$ הוא הגובה לצלע $AB$ (ראו שרטוט). נתון: $AB=10$, $AC=8$, $AE=5$. הוכיחו ש-$\triangle ABE\sim\triangle ACF$, וחשבו את $AF$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.0,212.8 294.0,212.8 133.2,27.2" />
  <line x1="294.0" y1="212.8" x2="93.0" y2="96.8" stroke-width="1.5" />
  <line x1="133.2" y1="27.2" x2="133.2" y2="212.8" stroke-width="1.5" />
  <polyline points="89.0,103.7 95.9,107.7 99.9,100.8" stroke-width="1" />
  <polyline points="141.2,212.8 141.2,204.8 133.2,204.8" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="11.3" y="228.0">A</text>
    <text x="297.7" y="228.0">B</text>
    <text x="127.7" y="20.2">C</text>
    <text x="78.3" y="93.6">E</text>
    <text x="127.7" y="231.8">F</text>
  </g>
</svg>`,
        hints: [
          String.raw`לשני המשולשים יש זווית ישרה, והזווית $A$ משותפת.`,
          String.raw`$\frac{AB}{AC}=\frac{AE}{AF}$.`,
        ],
        solutionSteps: [
          String.raw`במשולשים $ABE$ ו-$ACF$: $\angle AEB=\angle AFC=90^\circ$ ($BE$ ו-$CF$ גבהים), והזווית $A$ משותפת.`,
          String.raw`לפי משפט הדמיון ז.ז: $\triangle ABE\sim\triangle ACF$ (התאמה $A\leftrightarrow A$, $B\leftrightarrow C$, $E\leftrightarrow F$).`,
          String.raw`מכאן $\frac{AB}{AC}=\frac{AE}{AF}$, כלומר $\frac{10}{8}=\frac{5}{AF}$, ולכן $AF=4$.`,
        ],
        finalAnswer: String.raw`$AF=4$`,
        answers: [{ label: String.raw`$AF$`, value: 4 }],
      },
      {
        id: 'geo-similarity-6',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון: $AB=6$, $BC=9$, $AC=8$. הנקודה $D$ על $BC$ כך ש-$\angle BAD=\angle C$ (ראו שרטוט). הוכיחו ש-$\triangle BAD\sim\triangle BCA$, וחשבו את $BD$ ואת $AD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="113.7,42.2 26.0,197.8 294.0,197.8" />
  <line x1="113.7" y1="42.2" x2="145.1" y2="197.8" stroke-width="1.5" />
  <path d="M 102.9,61.3 A 22 22 0 0 0 118.0,63.7" stroke-width="1.2" />
  <path d="M 270.0,197.8 A 24 24 0 0 1 275.8,182.2" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="108.2" y="35.2">A</text>
    <text x="11.3" y="213.0">B</text>
    <text x="297.7" y="213.0">C</text>
    <text x="139.6" y="216.8">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`לשני המשולשים הזווית $B$ משותפת.`,
          String.raw`שימו לב להתאמה: $A$ במשולש $BAD$ מתאים ל-$C$ במשולש $BCA$.`,
          String.raw`$\frac{BA}{BC}=\frac{BD}{BA}=\frac{AD}{CA}$.`,
        ],
        solutionSteps: [
          String.raw`במשולשים $BAD$ ו-$BCA$: הזווית $B$ משותפת, ו-$\angle BAD=\angle BCA$ (נתון).`,
          String.raw`לפי משפט הדמיון ז.ז: $\triangle BAD\sim\triangle BCA$ (התאמה $B\leftrightarrow B$, $A\leftrightarrow C$, $D\leftrightarrow A$).`,
          String.raw`מכאן $\frac{BA}{BC}=\frac{BD}{BA}=\frac{AD}{CA}$, כלומר $\frac69=\frac{BD}{6}=\frac{AD}{8}$.`,
          String.raw`$BD=\frac{36}{9}=4$ ו-$AD=\frac{6\cdot8}{9}=\frac{16}{3}\approx5.33$.`,
        ],
        finalAnswer: String.raw`$BD=4$, $AD=\frac{16}{3}$.`,
        answers: [
          { label: String.raw`$BD$`, value: 4 },
          { label: String.raw`$AD$`, value: 16 / 3 },
        ],
      },
      {
        id: 'geo-similarity-7',
        difficulty: 3,
        statement: String.raw`$ABCD$ היא מקבילית. ישר העובר דרך $B$ חותך את האלכסון $AC$ בנקודה $F$, את הצלע $DC$ בנקודה $G$ ואת המשך הצלע $AD$ בנקודה $E$ (ראו שרטוט).

א. הוכיחו: $\triangle AFE\sim\triangle CFB$ וגם $\triangle AFB\sim\triangle CFG$.

ב. הוכיחו: $FB^2=FG\cdot FE$.

ג. נתון: $FG=4$, $FE=9$. חשבו את $FB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="58.2,214.0 214.8,214.0 261.8,88.7 105.2,88.7" />
  <line x1="58.2" y1="214.0" x2="261.8" y2="88.7" stroke-width="1.5" />
  <line x1="214.8" y1="214.0" x2="128.7" y2="26.0" stroke-width="1.5" />
  <line x1="105.2" y1="88.7" x2="128.7" y2="26.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="43.5" y="229.2">A</text>
    <text x="218.5" y="229.2">B</text>
    <text x="269.3" y="94.7">C</text>
    <text x="86.7" y="94.7">D</text>
    <text x="123.2" y="19.0">E</text>
    <text x="160.9" y="144.8">F</text>
    <text x="161.1" y="85.5">G</text>
  </g>
</svg>`,
        hints: [
          String.raw`$AE\parallel BC$ ו-$AB\parallel GC$ – חפשו זוויות מתחלפות, וזוויות קודקודיות ב-$F$.`,
          String.raw`משני הדמיונות: $\frac{FE}{FB}=\frac{AF}{CF}$ ו-$\frac{FB}{FG}=\frac{AF}{CF}$.`,
          'השוו את שני היחסים.',
        ],
        solutionSteps: [
          String.raw`א. $AE\parallel BC$ (הישר $AD$ מקביל ל-$BC$), לכן $\angle FAE=\angle FCB$ (זוויות מתחלפות), ו-$\angle AFE=\angle CFB$ (זוויות קודקודיות). לפי ז.ז: $\triangle AFE\sim\triangle CFB$.`,
          String.raw`$AB\parallel DC$, לכן $\angle FAB=\angle FCG$ (זוויות מתחלפות), ו-$\angle AFB=\angle CFG$ (זוויות קודקודיות). לפי ז.ז: $\triangle AFB\sim\triangle CFG$.`,
          String.raw`ב. מהדמיון הראשון ($A\leftrightarrow C$, $F\leftrightarrow F$, $E\leftrightarrow B$): $\frac{FE}{FB}=\frac{AF}{CF}$. מהדמיון השני ($A\leftrightarrow C$, $F\leftrightarrow F$, $B\leftrightarrow G$): $\frac{FB}{FG}=\frac{AF}{CF}$.`,
          String.raw`לכן $\frac{FE}{FB}=\frac{FB}{FG}$, ובכפל בהצלבה $FB^2=FG\cdot FE$.`,
          String.raw`ג. $FB^2=4\cdot9=36$, ולכן $FB=6$.`,
        ],
        finalAnswer: String.raw`$FB=6$`,
        answers: [{ label: String.raw`$FB$`, value: 6 }],
      },
      {
        id: 'geo-similarity-8',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ נתון $BC=12$, והגובה לצלע $BC$ הוא $AH=8$. הריבוע $DEFG$ חסום במשולש כך ש-$D$ ו-$E$ על $BC$, $F$ על $AC$ ו-$G$ על $AB$ (ראו שרטוט). חשבו את אורך צלע הריבוע.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="115.3,30.7 26.0,209.3 294.0,209.3" />
  <polygon points="79.6,209.3 186.8,209.3 186.8,102.1 79.6,102.1" />
  <line x1="115.3" y1="30.7" x2="115.3" y2="209.3" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="123.3,209.3 123.3,201.3 115.3,201.3" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="109.8" y="23.7">A</text>
    <text x="11.3" y="224.5">B</text>
    <text x="297.7" y="224.5">C</text>
    <text x="109.8" y="228.3">H</text>
    <text x="74.1" y="228.3">D</text>
    <text x="181.3" y="228.3">E</text>
    <text x="190.5" y="98.9">F</text>
    <text x="64.9" y="98.9">G</text>
  </g>
</svg>`,
        hints: [
          String.raw`סמנו את צלע הריבוע $x$. $GF\parallel BC$, ולכן $\triangle AGF\sim\triangle ABC$ ו-$\frac{AG}{AB}=\frac{x}{12}$.`,
          String.raw`$GD\parallel AH$ (שניהם מאונכים ל-$BC$), ולכן $\triangle BGD\sim\triangle BAH$ ו-$\frac{BG}{BA}=\frac{x}{8}$.`,
          String.raw`$AG+GB=AB$, ולכן סכום שני היחסים הוא $1$.`,
        ],
        solutionSteps: [
          String.raw`נסמן את צלע הריבוע ב-$x$. $GF\parallel BC$ (צלעות נגדיות בריבוע), לכן $\angle AGF=\angle ABC$ ו-$\angle AFG=\angle ACB$ (זוויות מתאימות), ו-$\triangle AGF\sim\triangle ABC$ (ז.ז). מכאן $\frac{AG}{AB}=\frac{GF}{BC}=\frac{x}{12}$.`,
          String.raw`$GD\perp BC$ ו-$AH\perp BC$, לכן במשולשים $BGD$ ו-$BAH$: $\angle BDG=\angle BHA=90^\circ$ והזווית $B$ משותפת, כלומר $\triangle BGD\sim\triangle BAH$ (ז.ז). מכאן $\frac{BG}{BA}=\frac{GD}{AH}=\frac{x}{8}$.`,
          String.raw`$G$ על $AB$, לכן $\frac{AG}{AB}+\frac{BG}{AB}=1$: $\frac{x}{12}+\frac{x}{8}=1$.`,
          String.raw`נכפול ב-$24$: $2x+3x=24$, ולכן $x=4.8$.`,
        ],
        finalAnswer: String.raw`צלע הריבוע $4.8$.`,
        answers: [{ label: 'צלע הריבוע', value: 4.8 }],
      },
    ],
  },
  'geo-similar-ratios': {
    intro: String.raw`במשולשים דומים לא רק הצלעות המתאימות פרופורציוניות – גם הגבהים המתאימים מקיימים את אותו יחס: היחס בין גבהים לצלעות מתאימות שווה ליחס הדמיון $k$. כך עוברים ממרחקים (גבהים) לאורכי צלעות ולהפך – למשל במשולשים שיוצרים אלכסוני טרפז, או ישר המקביל לצלע במשולש. לפי המיקוד, בבחינה נדרשים רק יחס הצלעות ויחס הגבהים; יחס ההיקפים, התיכונים, חוצי הזווית והרדיוסים במשולשים דומים ירד, ואין להשתמש בו. הנושא מופיע בשאלה 4 בשאלון 806.`,
    keyFacts: [
      String.raw`אם $\triangle ABC\sim\triangle DEF$ ביחס $k$, אז כל זוג צלעות מתאימות מקיים $\frac{AB}{DE}=\frac{BC}{EF}=\frac{AC}{DF}=k$.`,
      String.raw`**יחס הגבהים**: הגבהים לצלעות מתאימות מקיימים $\frac{h_1}{h_2}=k$ (ההוכחה: הגבהים יוצרים משולשים ישרי זווית הדומים לפי ז.ז).`,
      String.raw`ישר $DE\parallel BC$ במשולש $ABC$: $\triangle ADE\sim\triangle ABC$, והגובה מ-$A$ ל-$DE$ מתייחס לגובה מ-$A$ ל-$BC$ כמו $\frac{DE}{BC}$.`,
      String.raw`**טרפז**: אלכסוני הטרפז $ABCD$ ($AB\parallel DC$) יוצרים $\triangle AOB\sim\triangle COD$ ביחס $\frac{AB}{DC}$; המרחקים של $O$ מהבסיסים נמצאים באותו יחס, וסכומם הוא גובה הטרפז.`,
      String.raw`**ריבוע או מלבן החסום במשולש** (צלע על $BC$, גובה $h$ לצלע $BC$): אם הצלע המקבילה ל-$BC$ היא $a$ והצלע הניצבת היא $b$, אז $\frac{a}{BC}=\frac{h-b}{h}$.`,
      'במיקוד 2026: אין להשתמש ביחס היקפים, תיכונים, חוצי זווית או רדיוסים במשולשים דומים.',
    ],
    exercises: [
      {
        id: 'geo-similar-ratios-1',
        difficulty: 1,
        statement: String.raw`$\triangle ABC\sim\triangle DEF$, כאשר $AB=6$ ו-$DE=4$ הן צלעות מתאימות. הגובה $CH$ לצלע $AB$ הוא $6$ (ראו שרטוט). חשבו את הגובה $FK$ לצלע $DE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.0,181.8 149.7,181.8 67.2,58.2" />
  <polygon points="211.5,181.8 294.0,181.8 239.0,99.4" />
  <line x1="67.2" y1="58.2" x2="67.2" y2="181.8" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="239.0" y1="99.4" x2="239.0" y2="181.8" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="75.2,181.8 75.2,173.8 67.2,173.8" stroke-width="1" />
  <polyline points="247.0,181.8 247.0,173.8 239.0,173.8" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="20.5" y="200.8">A</text>
    <text x="144.2" y="200.8">B</text>
    <text x="61.7" y="51.2">C</text>
    <text x="61.7" y="200.8">H</text>
    <text x="206.0" y="200.8">D</text>
    <text x="288.5" y="200.8">E</text>
    <text x="233.5" y="92.4">F</text>
    <text x="233.5" y="200.8">K</text>
  </g>
</svg>`,
        hints: [
          String.raw`$CH$ ו-$FK$ הם גבהים לצלעות המתאימות $AB$ ו-$DE$.`,
          'היחס בין גבהים מתאימים שווה ליחס הדמיון.',
        ],
        solutionSteps: [
          String.raw`יחס הדמיון: $k=\frac{DE}{AB}=\frac46=\frac23$.`,
          String.raw`$FK$ ו-$CH$ הם גבהים לצלעות המתאימות $DE$ ו-$AB$, והיחס בין גבהים מתאימים במשולשים דומים שווה ליחס הדמיון: $\frac{FK}{CH}=\frac23$.`,
          String.raw`$FK=\frac23\cdot6=4$.`,
        ],
        finalAnswer: String.raw`$FK=4$`,
        answers: [{ label: String.raw`$FK$`, value: 4 }],
      },
      {
        id: 'geo-similar-ratios-2',
        difficulty: 1,
        statement: String.raw`במשולש $ABC$ הקטע $DE$ מקביל ל-$BC$ ($D$ על $AB$, $E$ על $AC$), ו-$AD:DB=2:1$. הגובה $AH$ לצלע $BC$ חותך את $DE$ בנקודה $K$, ו-$AH=12$ (ראו שרטוט). חשבו את $AK$ ואת המרחק בין $DE$ ל-$BC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="120.8,26.0 42.5,214.0 277.5,214.0" />
  <line x1="68.6" y1="151.3" x2="225.3" y2="151.3" stroke-width="1.5" />
  <line x1="120.8" y1="26.0" x2="120.8" y2="214.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="128.8,214.0 128.8,206.0 120.8,206.0" stroke-width="1" />
  <polyline points="128.8,151.3 128.8,143.3 120.8,143.3" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="115.3" y="19.0">A</text>
    <text x="27.8" y="229.2">B</text>
    <text x="281.2" y="229.2">C</text>
    <text x="50.1" y="157.3">D</text>
    <text x="232.8" y="157.3">E</text>
    <text x="115.3" y="233.0">H</text>
    <text x="105.4" y="167.2">K</text>
  </g>
</svg>`,
        hints: [
          String.raw`$\triangle ADE\sim\triangle ABC$ ביחס $\frac{AD}{AB}=\frac23$.`,
          String.raw`$AK$ הוא הגובה של $\triangle ADE$ לצלע $DE$ (כי $AH\perp BC$ ו-$DE\parallel BC$).`,
        ],
        solutionSteps: [
          String.raw`$DE\parallel BC$, לכן $\angle ADE=\angle ABC$ ו-$\angle AED=\angle ACB$ (זוויות מתאימות), ו-$\triangle ADE\sim\triangle ABC$ (ז.ז) ביחס $k=\frac{AD}{AB}=\frac{2}{3}$.`,
          String.raw`$AH\perp BC$ ו-$DE\parallel BC$, לכן $AK\perp DE$: $AK$ הוא הגובה של $\triangle ADE$ לצלע $DE$, והוא מתאים לגובה $AH$ של $\triangle ABC$.`,
          String.raw`היחס בין הגבהים שווה ליחס הדמיון: $AK=\frac23\cdot12=8$.`,
          String.raw`המרחק בין $DE$ ל-$BC$: $KH=AH-AK=12-8=4$.`,
        ],
        finalAnswer: String.raw`$AK=8$, המרחק $4$.`,
        answers: [
          { label: String.raw`$AK$`, value: 8 },
          { label: String.raw`המרחק בין $DE$ ל-$BC$`, value: 4 },
        ],
      },
      {
        id: 'geo-similar-ratios-3',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא טרפז ($AB\parallel DC$) שבו $AB=4$, $DC=12$ וגובהו $10$. האלכסונים נפגשים בנקודה $O$, והקטע $MN$ עובר דרך $O$ ומאונך לבסיסים ($M$ על $AB$, $N$ על $DC$; ראו שרטוט). חשבו את המרחק של $O$ מכל אחד מהבסיסים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="103.6,26.0 178.8,26.0 272.8,214.0 47.2,214.0" />
  <line x1="103.6" y1="26.0" x2="272.8" y2="214.0" stroke-width="1.5" />
  <line x1="178.8" y1="26.0" x2="47.2" y2="214.0" stroke-width="1.5" />
  <line x1="145.9" y1="26.0" x2="145.9" y2="214.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="153.9,214.0 153.9,206.0 145.9,206.0" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="88.9" y="22.8">A</text>
    <text x="182.5" y="22.8">B</text>
    <text x="276.5" y="229.2">C</text>
    <text x="32.5" y="229.2">D</text>
    <text x="154.4" y="79.0">O</text>
    <text x="140.4" y="19.0">M</text>
    <text x="140.4" y="233.0">N</text>
  </g>
</svg>`,
        hints: [
          String.raw`$\triangle AOB\sim\triangle COD$ (ז.ז – זוויות מתחלפות).`,
          String.raw`$OM$ ו-$ON$ הם גבהים מתאימים בשני המשולשים הדומים.`,
          String.raw`$OM+ON=10$.`,
        ],
        solutionSteps: [
          String.raw`$AB\parallel DC$, לכן $\angle OAB=\angle OCD$ ו-$\angle OBA=\angle ODC$ (זוויות מתחלפות), ו-$\triangle AOB\sim\triangle COD$ (ז.ז) ביחס $\frac{AB}{CD}=\frac{4}{12}=\frac13$.`,
          String.raw`$OM$ הוא הגובה לצלע $AB$ במשולש $AOB$, ו-$ON$ הוא הגובה לצלע המתאימה $CD$ במשולש $COD$. היחס בין גבהים מתאימים שווה ליחס הדמיון: $\frac{OM}{ON}=\frac13$.`,
          String.raw`$MN$ מאונך לשני הבסיסים, לכן $OM+ON=MN=10$. נסמן $OM=t$, $ON=3t$: $4t=10$.`,
          String.raw`$OM=2.5$ (המרחק מ-$AB$) ו-$ON=7.5$ (המרחק מ-$DC$).`,
        ],
        finalAnswer: String.raw`המרחק מ-$AB$ הוא $2.5$, והמרחק מ-$DC$ הוא $7.5$.`,
        answers: [
          { label: String.raw`$OM$`, value: 2.5 },
          { label: String.raw`$ON$`, value: 7.5 },
        ],
      },
      {
        id: 'geo-similar-ratios-4',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $BC=15$, והגובה לצלע $BC$ הוא $AH=10$. הריבוע $DEFG$ חסום במשולש כך ש-$D$ ו-$E$ על $BC$, $F$ על $AC$ ו-$G$ על $AB$ (ראו שרטוט). חשבו את אורך צלע הריבוע בעזרת יחס הגבהים.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="115.3,30.7 26.0,209.3 294.0,209.3" />
  <polygon points="79.6,209.3 186.8,209.3 186.8,102.1 79.6,102.1" />
  <line x1="115.3" y1="30.7" x2="115.3" y2="209.3" stroke-width="1.5" stroke-dasharray="5 3" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="109.8" y="23.7">A</text>
    <text x="11.3" y="224.5">B</text>
    <text x="297.7" y="224.5">C</text>
    <text x="109.8" y="228.3">H</text>
    <text x="74.1" y="228.3">D</text>
    <text x="181.3" y="228.3">E</text>
    <text x="190.5" y="98.9">F</text>
    <text x="64.9" y="98.9">G</text>
  </g>
</svg>`,
        hints: [
          String.raw`$GF\parallel BC$, ולכן $\triangle AGF\sim\triangle ABC$.`,
          String.raw`אם $x$ צלע הריבוע, הגובה של $\triangle AGF$ לצלע $GF$ הוא $10-x$.`,
          String.raw`$\frac{GF}{BC}=\frac{10-x}{10}$.`,
        ],
        solutionSteps: [
          String.raw`נסמן את צלע הריבוע ב-$x$. $GF\parallel BC$, לכן $\triangle AGF\sim\triangle ABC$ (ז.ז – זוויות מתאימות) ביחס $\frac{GF}{BC}=\frac{x}{15}$.`,
          String.raw`הגובה $AH$ חותך את $GF$; החלק שלו שמעל $GF$ הוא הגובה של $\triangle AGF$, ואורכו $10-x$ (המרחק בין $GF$ ל-$BC$ הוא צלע הריבוע).`,
          String.raw`היחס בין גבהים מתאימים שווה ליחס הדמיון: $\frac{x}{15}=\frac{10-x}{10}$.`,
          String.raw`$10x=150-15x\ \Rightarrow\ 25x=150\ \Rightarrow\ x=6$.`,
        ],
        finalAnswer: String.raw`צלע הריבוע $6$.`,
        answers: [{ label: 'צלע הריבוע', value: 6 }],
      },
      {
        id: 'geo-similar-ratios-5',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא טרפז ($AB\parallel DC$) שאלכסוניו נפגשים בנקודה $O$. נתון: $AB=6$, המרחק של $O$ מ-$AB$ הוא $OM=2$ והמרחק של $O$ מ-$DC$ הוא $ON=5$ (ראו שרטוט). חשבו את $DC$ ואת שטח הטרפז.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="97.5,57.5 204.7,57.5 294.0,182.5 26.0,182.5" />
  <line x1="97.5" y1="57.5" x2="294.0" y2="182.5" stroke-width="1.5" />
  <line x1="204.7" y1="57.5" x2="26.0" y2="182.5" stroke-width="1.5" />
  <line x1="153.6" y1="57.5" x2="153.6" y2="182.5" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="161.6,182.5 161.6,174.5 153.6,174.5" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="82.8" y="54.3">A</text>
    <text x="208.4" y="54.3">B</text>
    <text x="297.7" y="197.7">C</text>
    <text x="11.3" y="197.7">D</text>
    <text x="162.1" y="99.2">O</text>
    <text x="148.1" y="50.5">M</text>
    <text x="148.1" y="201.5">N</text>
  </g>
</svg>`,
        hints: [
          String.raw`$\triangle AOB\sim\triangle COD$, ו-$OM$, $ON$ הם גבהים מתאימים.`,
          'יחס הדמיון שווה ליחס הגבהים.',
        ],
        solutionSteps: [
          String.raw`$AB\parallel DC$, לכן $\triangle AOB\sim\triangle COD$ (ז.ז – זוויות מתחלפות), והצלע $AB$ מתאימה לצלע $CD$.`,
          String.raw`$OM$ ו-$ON$ הם הגבהים לצלעות המתאימות $AB$ ו-$CD$, ולכן יחס הדמיון: $\frac{AB}{CD}=\frac{OM}{ON}=\frac25$.`,
          String.raw`$CD=\frac{5}{2}\cdot6=15$.`,
          String.raw`גובה הטרפז $MN=OM+ON=7$, ולכן $S_{ABCD}=\frac{(6+15)\cdot7}{2}=73.5$.`,
        ],
        finalAnswer: String.raw`$DC=15$, $S_{ABCD}=73.5$.`,
        answers: [
          { label: String.raw`$DC$`, value: 15 },
          { label: String.raw`$S_{ABCD}$`, value: 73.5 },
        ],
      },
      {
        id: 'geo-similar-ratios-6',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $BC=12$ והגובה $AH=9$. ישר המקביל ל-$BC$ במרחק $3$ ממנו חותך את $AB$ בנקודה $D$ ואת $AC$ בנקודה $E$ (ראו שרטוט). חשבו את $DE$ ואת שטח הטרפז $DBCE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="118.2,26.0 34.7,214.0 285.3,214.0" />
  <line x1="62.5" y1="151.3" x2="229.6" y2="151.3" stroke-width="1.5" />
  <line x1="118.2" y1="26.0" x2="118.2" y2="214.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <polyline points="126.2,214.0 126.2,206.0 118.2,206.0" stroke-width="1" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="112.7" y="19.0">A</text>
    <text x="20.0" y="229.2">B</text>
    <text x="289.0" y="229.2">C</text>
    <text x="44.0" y="157.3">D</text>
    <text x="237.1" y="157.3">E</text>
    <text x="112.7" y="233.0">H</text>
  </g>
</svg>`,
        hints: [
          String.raw`הגובה של $\triangle ADE$ מ-$A$ הוא $9-3=6$.`,
          String.raw`$\triangle ADE\sim\triangle ABC$, ויחס הגבהים שווה ליחס הדמיון.`,
        ],
        solutionSteps: [
          String.raw`$DE\parallel BC$, לכן $\triangle ADE\sim\triangle ABC$ (ז.ז – זוויות מתאימות).`,
          String.raw`הגובה מ-$A$ ל-$DE$ הוא $9-3=6$, והוא מתאים לגובה $AH=9$. לכן יחס הדמיון $k=\frac69=\frac23$.`,
          String.raw`$DE=\frac23\cdot BC=\frac23\cdot12=8$.`,
          String.raw`$DBCE$ הוא טרפז שגובהו $3$: $S_{DBCE}=\frac{(8+12)\cdot3}{2}=30$.`,
        ],
        finalAnswer: String.raw`$DE=8$, $S_{DBCE}=30$.`,
        answers: [
          { label: String.raw`$DE$`, value: 8 },
          { label: String.raw`$S_{DBCE}$`, value: 30 },
        ],
      },
      {
        id: 'geo-similar-ratios-7',
        difficulty: 3,
        statement: String.raw`$ABCD$ הוא טרפז ($AB\parallel DC$) שבו $AB=6$ ו-$DC=12$. האלכסונים נפגשים בנקודה $O$, ודרך $O$ העבירו ישר המקביל לבסיסים, החותך את $AD$ בנקודה $E$ ואת $BC$ בנקודה $F$ (ראו שרטוט). הוכיחו ש-$EO=OF$, וחשבו את $EF$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="70.7,53.0 204.7,53.0 294.0,187.0 26.0,187.0" />
  <line x1="70.7" y1="53.0" x2="294.0" y2="187.0" stroke-width="1.5" />
  <line x1="204.7" y1="53.0" x2="26.0" y2="187.0" stroke-width="1.5" />
  <line x1="55.8" y1="97.7" x2="234.4" y2="97.7" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="56.0" y="49.8">A</text>
    <text x="208.4" y="49.8">B</text>
    <text x="297.7" y="202.2">C</text>
    <text x="11.3" y="202.2">D</text>
    <text x="139.6" y="118.7">O</text>
    <text x="37.3" y="103.7">E</text>
    <text x="241.9" y="103.7">F</text>
  </g>
</svg>`,
        hints: [
          String.raw`$\triangle AOB\sim\triangle COD$, ולכן $\frac{AO}{OC}=\frac{BO}{OD}=\frac{AB}{CD}=\frac12$.`,
          String.raw`במשולש $ADC$: $EO\parallel DC$, ולכן $\frac{EO}{DC}=\frac{AO}{AC}$. במשולש $BDC$: $\frac{OF}{DC}=\frac{BO}{BD}$.`,
        ],
        solutionSteps: [
          String.raw`$AB\parallel DC$, לכן $\triangle AOB\sim\triangle COD$ (ז.ז – זוויות מתחלפות), ומכאן $\frac{AO}{OC}=\frac{BO}{OD}=\frac{AB}{CD}=\frac{6}{12}=\frac12$.`,
          String.raw`לכן $\frac{AO}{AC}=\frac{1}{1+2}=\frac13$ וגם $\frac{BO}{BD}=\frac13$.`,
          String.raw`במשולש $ADC$: $EO\parallel DC$, ולפי משפט תאלס המורחב $\frac{EO}{DC}=\frac{AO}{AC}=\frac13$, כלומר $EO=4$.`,
          String.raw`במשולש $BDC$: $OF\parallel DC$, ולפי משפט תאלס המורחב $\frac{OF}{DC}=\frac{BO}{BD}=\frac13$, כלומר $OF=4$.`,
          String.raw`מכאן $EO=OF$, ו-$EF=8$.`,
        ],
        finalAnswer: String.raw`$EO=OF=4$, $EF=8$.`,
        answers: [{ label: String.raw`$EF$`, value: 8 }],
      },
      {
        id: 'geo-similar-ratios-8',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ נתון $BC=16$ והגובה $AH=12$. המלבן $DEFG$ חסום במשולש כך ש-$D$ על $AB$, $E$ על $AC$, ו-$F$, $G$ על $BC$ (ראו שרטוט). שטח המלבן הוא $45$. מצאו את האורכים האפשריים של $DE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="128.7,26.0 34.7,214.0 285.3,214.0" />
  <polygon points="69.9,143.5 226.6,143.5 226.6,214.0 69.9,214.0" />
  <line x1="128.7" y1="26.0" x2="128.7" y2="214.0" stroke-width="1.5" stroke-dasharray="5 3" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="123.2" y="19.0">A</text>
    <text x="20.0" y="229.2">B</text>
    <text x="289.0" y="229.2">C</text>
    <text x="123.2" y="233.0">H</text>
    <text x="55.2" y="140.3">D</text>
    <text x="230.3" y="140.3">E</text>
    <text x="221.1" y="233.0">F</text>
    <text x="64.4" y="233.0">G</text>
  </g>
</svg>`,
        hints: [
          String.raw`סמנו $DE=x$. $\triangle ADE\sim\triangle ABC$, ולכן הגובה שלו מ-$A$ הוא $\frac{12}{16}x=\frac34x$.`,
          String.raw`הצלע הניצבת של המלבן ($DG$) היא $12-\frac34x$.`,
          String.raw`פתרו את המשוואה $x\left(12-\frac34x\right)=45$.`,
        ],
        solutionSteps: [
          String.raw`נסמן $DE=x$. $DE\parallel BC$ (צלעות נגדיות במלבן), לכן $\triangle ADE\sim\triangle ABC$ (ז.ז) ביחס $\frac{x}{16}$.`,
          String.raw`היחס בין גבהים מתאימים שווה ליחס הדמיון, ולכן הגובה של $\triangle ADE$ מ-$A$ הוא $\frac{x}{16}\cdot12=\frac34x$. הצלע $DG$ של המלבן היא המרחק בין $DE$ ל-$BC$: $DG=12-\frac34x$.`,
          String.raw`שטח המלבן: $x\left(12-\frac34x\right)=45$, כלומר $\frac34x^2-12x+45=0$, ואחרי כפל ב-$\frac43$: $x^2-16x+60=0$.`,
          String.raw`$(x-6)(x-10)=0$, ולכן $x=6$ או $x=10$. שני הפתרונות אפשריים ($0<x<16$): עבור $x=6$ הצלע $DG=7.5$, ועבור $x=10$ הצלע $DG=4.5$.`,
        ],
        finalAnswer: String.raw`$DE=6$ או $DE=10$.`,
        answers: [
          { label: String.raw`$DE$ (הקטן)`, value: 6 },
          { label: String.raw`$DE$ (הגדול)`, value: 10 },
        ],
      },
    ],
  },
  'geo-similar-areas': {
    intro: String.raw`יחס השטחים של שני משולשים דומים שווה לריבוע יחס הדמיון: אם הצלעות ביחס $k$, השטחים ביחס $k^2$ – כי גם הבסיס וגם הגובה מוכפלים ב-$k$. הנושא נשאר במפורש במיקוד 2026, ובשאלה 4 בשאלון 806 הוא מופיע לרוב בסעיף החישוב האחרון – לעתים יחד עם משולשים בעלי גובה משותף, שבהם יחס השטחים הוא יחס הבסיסים (ולא $k^2$).`,
    keyFacts: [
      String.raw`אם $\triangle ABC\sim\triangle DEF$ ביחס דמיון $k=\frac{AB}{DE}$, אז $\frac{S_{ABC}}{S_{DEF}}=k^2$.`,
      String.raw`ולהפך: אם יחס השטחים של משולשים דומים הוא $q$, יחס הדמיון הוא $\sqrt q$.`,
      String.raw`ישר $DE\parallel BC$ במשולש: $\frac{S_{ADE}}{S_{ABC}}=\left(\frac{AD}{AB}\right)^2$ – שימו לב: היחס $\frac{AD}{AB}$, ולא $\frac{AD}{DB}$.`,
      String.raw`**שני כלים שונים**: משולשים בעלי גובה משותף – יחס השטחים = יחס הבסיסים; משולשים דומים – יחס השטחים = $k^2$.`,
      String.raw`**טרפז** שאלכסוניו נפגשים ב-$O$, עם $\frac{AB}{DC}=k$: $\frac{S_{AOB}}{S_{COD}}=k^2$, ו-$S_{AOD}=S_{BOC}=k\cdot S_{COD}$.`,
    ],
    exercises: [
      {
        id: 'geo-similar-areas-1',
        difficulty: 1,
        statement: String.raw`$\triangle ABC\sim\triangle DEF$, כאשר $AB=4$ ו-$DE=6$ הן צלעות מתאימות. שטח המשולש $ABC$ הוא $20$. חשבו את שטח המשולש $DEF$.`,
        hints: [String.raw`יחס הדמיון $k=\frac{DE}{AB}$.`, String.raw`יחס השטחים הוא $k^2$.`],
        solutionSteps: [
          String.raw`יחס הדמיון: $k=\frac{DE}{AB}=\frac64=\frac32$.`,
          String.raw`יחס השטחים במשולשים דומים שווה לריבוע יחס הדמיון: $\frac{S_{DEF}}{S_{ABC}}=\left(\frac32\right)^2=\frac94$.`,
          String.raw`$S_{DEF}=\frac94\cdot20=45$.`,
        ],
        finalAnswer: String.raw`$S_{DEF}=45$`,
        answers: [{ label: String.raw`$S_{DEF}$`, value: 45 }],
      },
      {
        id: 'geo-similar-areas-2',
        difficulty: 1,
        statement: String.raw`שטחיהם של שני משולשים דומים $ABC$ ו-$DEF$ הם $18$ ו-$50$ בהתאמה. אורך הצלע $BC$ הוא $9$. חשבו את אורך הצלע המתאימה $EF$.`,
        hints: [String.raw`$k^2=\frac{50}{18}$.`, 'הוציאו שורש כדי לקבל את יחס הדמיון.'],
        solutionSteps: [
          String.raw`יחס השטחים שווה לריבוע יחס הדמיון: $k^2=\frac{S_{DEF}}{S_{ABC}}=\frac{50}{18}=\frac{25}{9}$.`,
          String.raw`יחס הדמיון חיובי, לכן $k=\frac53$.`,
          String.raw`$EF=\frac53\cdot BC=\frac53\cdot9=15$.`,
        ],
        finalAnswer: String.raw`$EF=15$`,
        answers: [{ label: String.raw`$EF$`, value: 15 }],
      },
      {
        id: 'geo-similar-areas-3',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ הקטע $DE$ מקביל ל-$BC$ ($D$ על $AB$, $E$ על $AC$), ו-$AD:DB=3:2$. שטח המשולש $ABC$ הוא $100$ (ראו שרטוט). חשבו את שטח המשולש $ADE$ ואת שטח הטרפז $DBCE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="106.4,53.0 26.0,187.0 294.0,187.0" />
  <line x1="58.2" y1="133.4" x2="219.0" y2="133.4" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="100.9" y="46.0">A</text>
    <text x="11.3" y="202.2">B</text>
    <text x="297.7" y="202.2">C</text>
    <text x="39.7" y="139.4">D</text>
    <text x="222.7" y="130.2">E</text>
  </g>
</svg>`,
        hints: [String.raw`יחס הדמיון הוא $\frac{AD}{AB}$ – לא $\frac{AD}{DB}$.`, String.raw`$\frac{AD}{AB}=\frac35$.`],
        solutionSteps: [
          String.raw`$DE\parallel BC$, לכן $\angle ADE=\angle ABC$ ו-$\angle AED=\angle ACB$ (זוויות מתאימות), ו-$\triangle ADE\sim\triangle ABC$ (ז.ז).`,
          String.raw`יחס הדמיון: $k=\frac{AD}{AB}=\frac{3}{3+2}=\frac35$.`,
          String.raw`יחס השטחים: $\frac{S_{ADE}}{S_{ABC}}=k^2=\frac{9}{25}$, ולכן $S_{ADE}=\frac{9}{25}\cdot100=36$.`,
          String.raw`$S_{DBCE}=100-36=64$.`,
        ],
        finalAnswer: String.raw`$S_{ADE}=36$, $S_{DBCE}=64$.`,
        answers: [
          { label: String.raw`$S_{ADE}$`, value: 36 },
          { label: String.raw`$S_{DBCE}$`, value: 64 },
        ],
      },
      {
        id: 'geo-similar-areas-4',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא טרפז ($AB\parallel DC$) שבו $AB=8$ ו-$DC=12$. האלכסונים נפגשים בנקודה $O$, ו-$S_{AOB}=16$ (ראו שרטוט). חשבו את $S_{COD}$, את $S_{AOD}$ ואת שטח הטרפז.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="66.0,26.0 216.4,26.0 272.8,214.0 47.2,214.0" />
  <line x1="66.0" y1="26.0" x2="272.8" y2="214.0" stroke-width="1.5" />
  <line x1="216.4" y1="26.0" x2="47.2" y2="214.0" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="51.3" y="22.8">A</text>
    <text x="220.1" y="22.8">B</text>
    <text x="276.5" y="229.2">C</text>
    <text x="32.5" y="229.2">D</text>
    <text x="157.2" y="107.2">O</text>
  </g>
</svg>`,
        hints: [
          String.raw`$\triangle AOB\sim\triangle COD$ ביחס $\frac{8}{12}=\frac23$.`,
          String.raw`למשולשים $AOB$ ו-$AOD$ גובה משותף מ-$A$, ויחס שטחיהם הוא $\frac{OB}{OD}$.`,
          String.raw`$S_{BOC}=S_{AOD}$.`,
        ],
        solutionSteps: [
          String.raw`$AB\parallel DC$, לכן $\triangle AOB\sim\triangle COD$ (ז.ז – זוויות מתחלפות) ביחס $k=\frac{AB}{CD}=\frac23$.`,
          String.raw`יחס השטחים: $\frac{S_{AOB}}{S_{COD}}=k^2=\frac49$, ולכן $S_{COD}=\frac94\cdot16=36$.`,
          String.raw`מהדמיון $\frac{OB}{OD}=\frac23$. למשולשים $AOB$ ו-$AOD$ אותו גובה – מ-$A$ לישר $BD$ – ולכן $\frac{S_{AOB}}{S_{AOD}}=\frac{OB}{OD}=\frac23$, כלומר $S_{AOD}=24$.`,
          String.raw`$S_{ADC}=S_{BDC}$ (בסיס משותף $DC$ וגובה שווה), ואחרי חיסור $S_{COD}$: $S_{BOC}=S_{AOD}=24$.`,
          String.raw`$S_{ABCD}=16+24+36+24=100$.`,
        ],
        finalAnswer: String.raw`$S_{COD}=36$, $S_{AOD}=24$, $S_{ABCD}=100$.`,
        answers: [
          { label: String.raw`$S_{COD}$`, value: 36 },
          { label: String.raw`$S_{AOD}$`, value: 24 },
          { label: String.raw`$S_{ABCD}$`, value: 100 },
        ],
      },
      {
        id: 'geo-similar-areas-5',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון $AB=10$. ישר המקביל ל-$BC$ חותך את $AB$ בנקודה $D$ ואת $AC$ בנקודה $E$, ומחלק את המשולש לשני חלקים שווי שטח (ראו שרטוט). חשבו את $AD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="140.9,43.4 26.0,196.6 294.0,196.6" />
  <line x1="59.6" y1="151.7" x2="249.1" y2="151.7" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="135.4" y="36.4">A</text>
    <text x="11.3" y="211.8">B</text>
    <text x="297.7" y="211.8">C</text>
    <text x="41.1" y="157.7">D</text>
    <text x="256.6" y="157.7">E</text>
  </g>
</svg>`,
        hints: [String.raw`שטח המשולש $ADE$ הוא מחצית שטח המשולש $ABC$.`, String.raw`$k^2=\frac12$.`],
        solutionSteps: [
          String.raw`$DE\parallel BC$, לכן $\triangle ADE\sim\triangle ABC$ (ז.ז – זוויות מתאימות).`,
          String.raw`הישר מחלק את המשולש לשני חלקים שווי שטח, לכן $S_{ADE}=\frac12S_{ABC}$, כלומר $k^2=\frac12$.`,
          String.raw`$k=\frac{AD}{AB}=\frac{1}{\sqrt2}$, ולכן $AD=\frac{10}{\sqrt2}=5\sqrt2\approx7.07$.`,
        ],
        finalAnswer: String.raw`$AD=5\sqrt2\approx7.07$`,
        answers: [{ label: String.raw`$AD$`, value: 5 * Math.SQRT2 }],
      },
      {
        id: 'geo-similar-areas-6',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון: $AB=6$, $AC=9$, ושטח המשולש $18$. הנקודה $D$ על $AC$ כך ש-$\angle ABD=\angle C$ (ראו שרטוט). הוכיחו ש-$\triangle ABD\sim\triangle ACB$, וחשבו את $S_{ABD}$ ואת $S_{BDC}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.0,179.6 159.2,60.4 294.0,179.6" />
  <line x1="159.2" y1="60.4" x2="145.1" y2="179.6" stroke-width="1.5" />
  <path d="M 144.3,73.8 A 20 20 0 0 0 156.8,80.3" stroke-width="1.2" />
  <path d="M 274.5,162.3 A 26 26 0 0 0 268.0,179.6" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="11.3" y="194.7">A</text>
    <text x="153.7" y="53.4">B</text>
    <text x="297.7" y="194.7">C</text>
    <text x="139.6" y="198.6">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`הזווית $A$ משותפת לשני המשולשים.`,
          String.raw`ההתאמה: $B$ במשולש $ABD$ מתאים ל-$C$ במשולש $ACB$, ולכן $AB$ מתאימה ל-$AC$.`,
          String.raw`$k=\frac{AB}{AC}$, ויחס השטחים הוא $k^2$.`,
        ],
        solutionSteps: [
          String.raw`במשולשים $ABD$ ו-$ACB$: הזווית $A$ משותפת, ו-$\angle ABD=\angle ACB$ (נתון). לפי ז.ז: $\triangle ABD\sim\triangle ACB$ (התאמה $A\leftrightarrow A$, $B\leftrightarrow C$, $D\leftrightarrow B$).`,
          String.raw`יחס הדמיון: $k=\frac{AB}{AC}=\frac69=\frac23$.`,
          String.raw`יחס השטחים: $\frac{S_{ABD}}{S_{ACB}}=k^2=\frac49$, ולכן $S_{ABD}=\frac49\cdot18=8$.`,
          String.raw`$D$ על $AC$, לכן $S_{BDC}=S_{ABC}-S_{ABD}=18-8=10$.`,
        ],
        finalAnswer: String.raw`$S_{ABD}=8$, $S_{BDC}=10$.`,
        answers: [
          { label: String.raw`$S_{ABD}$`, value: 8 },
          { label: String.raw`$S_{BDC}$`, value: 10 },
        ],
      },
      {
        id: 'geo-similar-areas-7',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ הקטע $DE$ מקביל ל-$BC$ ($D$ על $AB$, $E$ על $AC$). נתון: $S_{ADE}=4$, $S_{DBE}=6$ (ראו שרטוט). חשבו את שטח המשולש $ABC$ ואת $S_{EBC}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="106.4,53.0 26.0,187.0 294.0,187.0" />
  <line x1="74.2" y1="106.6" x2="181.4" y2="106.6" stroke-width="1.5" />
  <line x1="26.0" y1="187.0" x2="181.4" y2="106.6" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="100.9" y="46.0">A</text>
    <text x="11.3" y="202.2">B</text>
    <text x="297.7" y="202.2">C</text>
    <text x="55.7" y="112.6">D</text>
    <text x="185.1" y="103.4">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`למשולשים $ADE$ ו-$DBE$ גובה משותף – מ-$E$ לישר $AB$.`,
          String.raw`מכאן $\frac{AD}{DB}=\frac46$, ולכן $\frac{AD}{AB}=\frac25$.`,
          String.raw`$\triangle ADE\sim\triangle ABC$ ביחס $\frac25$.`,
        ],
        solutionSteps: [
          String.raw`למשולשים $ADE$ ו-$DBE$ אותו גובה – הגובה מ-$E$ לישר $AB$ – ולכן $\frac{AD}{DB}=\frac{S_{ADE}}{S_{DBE}}=\frac46=\frac23$.`,
          String.raw`מכאן $\frac{AD}{AB}=\frac{2}{2+3}=\frac25$.`,
          String.raw`$DE\parallel BC$, לכן $\triangle ADE\sim\triangle ABC$ (ז.ז – זוויות מתאימות) ביחס $k=\frac25$, ו-$\frac{S_{ADE}}{S_{ABC}}=k^2=\frac{4}{25}$.`,
          String.raw`$S_{ABC}=\frac{25}{4}\cdot4=25$.`,
          String.raw`$S_{EBC}=S_{ABC}-S_{ADE}-S_{DBE}=25-4-6=15$.`,
        ],
        finalAnswer: String.raw`$S_{ABC}=25$, $S_{EBC}=15$.`,
        answers: [
          { label: String.raw`$S_{ABC}$`, value: 25 },
          { label: String.raw`$S_{EBC}$`, value: 15 },
        ],
      },
      {
        id: 'geo-similar-areas-8',
        difficulty: 3,
        statement: String.raw`$P$ היא נקודה בתוך המשולש $ABC$. דרך $P$ העבירו שלושה ישרים, כל אחד מקביל לאחת מצלעות המשולש. הישרים יוצרים שלושה משולשים קטנים שקודקודם המשותף $P$, ושטחיהם $4$, $9$ ו-$16$ (ראו שרטוט). חשבו את שטח המשולש $ABC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="26.0,187.0 294.0,187.0 115.3,53.0" />
  <line x1="234.4" y1="187.0" x2="95.5" y2="82.8" stroke-width="1.5" />
  <line x1="115.3" y1="187.0" x2="174.9" y2="97.7" stroke-width="1.5" />
  <line x1="65.7" y1="127.4" x2="214.6" y2="127.4" stroke-width="1.5" />
  <circle cx="155.0" cy="127.4" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="11.3" y="202.2">A</text>
    <text x="297.7" y="202.2">B</text>
    <text x="109.8" y="46.0">C</text>
    <text x="152.3" y="119.7">P</text>
  </g>
</svg>`,
        hints: [
          String.raw`כל אחד מהמשולשים הקטנים דומה ל-$\triangle ABC$ (צלעותיו מקבילות לצלעות $ABC$). סמנו את יחסי הדמיון $k_1,k_2,k_3$.`,
          String.raw`הראו שהצלעות המקבילות ל-$AB$ בשלושת המשולשים הקטנים מרכיבות יחד את $AB$ (בעזרת המקביליות שנוצרו), ולכן $k_1+k_2+k_3=1$.`,
          String.raw`$k_i=\sqrt{\frac{S_i}{S}}$.`,
        ],
        solutionSteps: [
          String.raw`צלעות כל משולש קטן מקבילות לצלעות $\triangle ABC$, ולכן זוויותיו שוות לזוויות $ABC$ (זוויות מתאימות), וכל משולש קטן דומה ל-$\triangle ABC$ (ז.ז). נסמן ב-$S$ את שטח $ABC$; יחס השטחים הוא ריבוע יחס הדמיון, ולכן יחסי הדמיון הם $k_1=\sqrt{\frac4S}$, $k_2=\sqrt{\frac9S}$, $k_3=\sqrt{\frac{16}S}$.`,
          String.raw`שלושת הישרים יוצרים גם שלוש מקביליות שאחד מקודקודיהן $P$. הצלע $AB$ מתחלקת לשלושה קטעים: האמצעי הוא צלע של המשולש הקטן הנשען על $AB$, ושני האחרים שווים (כצלעות נגדיות במקביליות) לצלעות המקבילות ל-$AB$ של שני המשולשים הקטנים האחרים.`,
          String.raw`כל אחת משלוש הצלעות האלה מתאימה ל-$AB$ במשולש שלה, ולכן $AB=k_1AB+k_2AB+k_3AB$, כלומר $k_1+k_2+k_3=1$.`,
          String.raw`$\frac{2}{\sqrt S}+\frac{3}{\sqrt S}+\frac{4}{\sqrt S}=1$, ולכן $\sqrt S=9$ ו-$S=81$.`,
        ],
        finalAnswer: String.raw`$S_{ABC}=81$`,
        answers: [{ label: String.raw`$S_{ABC}$`, value: 81 }],
      },
    ],
  },
  'geo-similarity-circles': {
    intro: String.raw`במעגל קל במיוחד למצוא זוויות שוות: זוויות היקפיות הנשענות על אותה קשת שוות, זווית היקפית הנשענת על קוטר ישרה, והזווית בין משיק למיתר שווה לזווית ההיקפית הנשענת על הקשת שביניהם. לכן משולשים שקודקודיהם על המעגל דומים לעתים קרובות לפי ז.ז, ומהדמיון מקבלים פרופורציה או שוויון מכפלות של קטעים. לפי המיקוד, משפטי הקטעים הפרופורציוניים במעגל (מיתרים נחתכים, חותך ומשיק) **אינם בחומר** – בכל פעם מוכיחים את הדמיון, ורק ממנו מסיקים את היחס. זהו דפוס מרכזי בשאלה 4 בשאלון 806.`,
    keyFacts: [
      'זוויות היקפיות הנשענות על אותה קשת (או על קשתות שוות) שוות זו לזו; למיתרים שווים מתאימות קשתות שוות.',
      'זווית היקפית הנשענת על קוטר היא זווית ישרה.',
      'הזווית בין משיק למיתר שווה לזווית ההיקפית הנשענת על הקשת שבין המיתר למשיק (הקודקוד שלה בצד השני של המיתר).',
      String.raw`במרובע חסום במעגל סכום זוויות נגדיות $180^\circ$, וזווית חיצונית שלו שווה לזווית הפנימית שמולה.`,
      String.raw`**שיטה**: מסמנים שתי זוויות שוות (היקפיות, קודקודיות, משותפת, משיק ומיתר) ← דמיון לפי ז.ז ← רושמים את יחס הצלעות לפי סדר הקודקודים ← כופלים בהצלבה ומקבלים שוויון מכפלות.`,
      'במיקוד 2026: אין לצטט את משפטי הקטעים הפרופורציוניים במעגל – מגיעים לכל מכפלה דרך דמיון משולשים.',
    ],
    exercises: [
      {
        id: 'geo-similarity-circles-1',
        difficulty: 1,
        statement: String.raw`המרובע $ABCD$ חסום במעגל, ואלכסוניו נפגשים בנקודה $E$ (ראו שרטוט). נתון: $AB=6$, $DC=9$, $BE=4$. הוכיחו ש-$\triangle ABE\sim\triangle DCE$, חשבו את $CE$ ומצאו את היחס $\frac{S_{ABE}}{S_{DCE}}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="94.0" stroke-width="1.5" />
  <polygon points="113.0,38.6 207.0,38.6 247.4,154.6 114.7,202.4" />
  <line x1="113.0" y1="38.6" x2="247.4" y2="154.6" stroke-width="1.5" />
  <line x1="207.0" y1="38.6" x2="114.7" y2="202.4" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="98.3" y="35.4">A</text>
    <text x="210.7" y="35.4">B</text>
    <text x="251.1" y="169.8">C</text>
    <text x="100.0" y="217.6">D</text>
    <text x="170.7" y="85.2">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`$\angle BAC$ ו-$\angle BDC$ הן זוויות היקפיות הנשענות על הקשת $BC$.`,
          String.raw`ההתאמה: $A\leftrightarrow D$, $B\leftrightarrow C$, $E\leftrightarrow E$.`,
          String.raw`יחס השטחים במשולשים דומים הוא $k^2$.`,
        ],
        solutionSteps: [
          String.raw`$\angle BAE=\angle CDE$ – זוויות היקפיות הנשענות על אותה קשת $BC$. $\angle AEB=\angle DEC$ – זוויות קודקודיות.`,
          String.raw`לפי משפט הדמיון ז.ז: $\triangle ABE\sim\triangle DCE$ (התאמה $A\leftrightarrow D$, $B\leftrightarrow C$, $E\leftrightarrow E$), ביחס $k=\frac{AB}{DC}=\frac69=\frac23$.`,
          String.raw`הצלע $BE$ מתאימה לצלע $CE$: $\frac{BE}{CE}=\frac23$, ולכן $CE=\frac32\cdot4=6$.`,
          String.raw`יחס השטחים: $\frac{S_{ABE}}{S_{DCE}}=k^2=\frac49$.`,
        ],
        finalAnswer: String.raw`$CE=6$, $\frac{S_{ABE}}{S_{DCE}}=\frac49$.`,
        answers: [
          { label: String.raw`$CE$`, value: 6 },
          { label: String.raw`$\frac{S_{ABE}}{S_{DCE}}$`, value: 4 / 9 },
        ],
      },
      {
        id: 'geo-similarity-circles-2',
        difficulty: 1,
        statement: String.raw`המיתרים $AB$ ו-$CD$ במעגל נחתכים בנקודה $E$ (ראו שרטוט). נתון: $AE=4$, $EB=6$, $CE=3$. הוכיחו ש-$\triangle AEC\sim\triangle DEB$, והסיקו ש-$AE\cdot EB=CE\cdot ED$. חשבו את $ED$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="94.0" stroke-width="1.5" />
  <line x1="79.6" y1="71.3" x2="240.4" y2="71.3" stroke-width="1.5" />
  <line x1="160.4" y1="26.0" x2="99.9" y2="192.3" stroke-width="1.5" />
  <line x1="79.6" y1="71.3" x2="160.4" y2="26.0" stroke-width="1.5" />
  <line x1="99.9" y1="192.3" x2="240.4" y2="71.3" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="61.1" y="77.3">A</text>
    <text x="247.9" y="77.3">B</text>
    <text x="154.9" y="19.0">C</text>
    <text x="94.4" y="211.3">D</text>
    <text x="149.9" y="69.4">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`$\angle CAB$ ו-$\angle CDB$ הן זוויות היקפיות הנשענות על הקשת $CB$.`,
          String.raw`מהדמיון: $\frac{AE}{DE}=\frac{CE}{BE}$.`,
        ],
        solutionSteps: [
          String.raw`$\angle CAE=\angle BDE$ – זוויות היקפיות הנשענות על אותה קשת $CB$. $\angle AEC=\angle DEB$ – זוויות קודקודיות.`,
          String.raw`לפי ז.ז: $\triangle AEC\sim\triangle DEB$ (התאמה $A\leftrightarrow D$, $E\leftrightarrow E$, $C\leftrightarrow B$).`,
          String.raw`מכאן $\frac{AE}{DE}=\frac{CE}{BE}$, ובכפל בהצלבה: $AE\cdot EB=CE\cdot ED$.`,
          String.raw`$4\cdot6=3\cdot ED$, ולכן $ED=8$.`,
        ],
        finalAnswer: String.raw`$ED=8$`,
        answers: [{ label: String.raw`$ED$`, value: 8 }],
      },
      {
        id: 'geo-similarity-circles-3',
        difficulty: 2,
        statement: String.raw`מהנקודה $P$ שמחוץ למעגל העבירו משיק $PA$ ($A$ נקודת ההשקה) וחותך $PBC$ ($B$ ו-$C$ על המעגל, $B$ בין $P$ ל-$C$; ראו שרטוט). נתון: $PB=4$, $BC=5$. הוכיחו ש-$\triangle PAB\sim\triangle PCA$, וחשבו את $PA$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="191.2" cy="120.0" r="94.0" stroke-width="1.5" />
  <line x1="34.8" y1="192.2" x2="251.4" y2="192.2" stroke-width="1.5" />
  <line x1="34.8" y1="192.2" x2="111.7" y2="70.0" stroke-width="1.5" />
  <line x1="111.7" y1="70.0" x2="131.1" y2="192.2" stroke-width="1.5" />
  <line x1="111.7" y1="70.0" x2="251.4" y2="192.2" stroke-width="1.5" />
  <circle cx="191.2" cy="120.0" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="16.3" y="198.2">P</text>
    <text x="106.2" y="63.0">A</text>
    <text x="116.4" y="207.4">B</text>
    <text x="255.1" y="207.4">C</text>
    <text x="198.7" y="126.0">O</text>
  </g>
</svg>`,
        hints: [
          String.raw`הזווית $P$ משותפת לשני המשולשים.`,
          String.raw`$\angle PAB$ היא זווית בין המשיק $PA$ למיתר $AB$. לאיזו זווית היקפית היא שווה?`,
          String.raw`$\frac{PA}{PC}=\frac{PB}{PA}$.`,
        ],
        solutionSteps: [
          String.raw`הזווית בין משיק למיתר שווה לזווית ההיקפית הנשענת על הקשת שביניהם: $\angle PAB=\angle ACB$, כלומר $\angle PAB=\angle PCA$.`,
          String.raw`הזווית $P$ משותפת למשולשים $PAB$ ו-$PCA$, ולכן לפי ז.ז: $\triangle PAB\sim\triangle PCA$ (התאמה $P\leftrightarrow P$, $A\leftrightarrow C$, $B\leftrightarrow A$).`,
          String.raw`מכאן $\frac{PA}{PC}=\frac{PB}{PA}$, כלומר $PA^2=PB\cdot PC$.`,
          String.raw`$PC=PB+BC=9$, ולכן $PA^2=4\cdot9=36$ ו-$PA=6$.`,
        ],
        finalAnswer: String.raw`$PA=6$`,
        answers: [{ label: String.raw`$PA$`, value: 6 }],
      },
      {
        id: 'geo-similarity-circles-4',
        difficulty: 2,
        statement: String.raw`המשולש $ABC$ חסום במעגל. חוצה הזווית $A$ חותך את $BC$ בנקודה $D$ ואת המעגל בנקודה $E$ (ראו שרטוט). נתון: $AB=6$, $AC=8$, $AD=4$. הוכיחו ש-$\triangle ABE\sim\triangle ADC$, וחשבו את $AE$ ואת $DE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="94.0" stroke-width="1.5" />
  <polygon points="140.9,28.0 70.9,90.0 249.1,90.0" />
  <line x1="140.9" y1="28.0" x2="160.0" y2="214.0" stroke-width="1.5" />
  <line x1="70.9" y1="90.0" x2="160.0" y2="214.0" stroke-width="1.5" />
  <path d="M 124.4,42.5 A 22 22 0 0 0 143.2,49.8" stroke-width="1.2" />
  <line x1="134.4" y1="44.7" x2="131.5" y2="52.2" stroke-width="1.2" />
  <path d="M 143.2,49.8 A 22 22 0 0 0 160.0,38.9" stroke-width="1.2" />
  <line x1="150.7" y1="43.1" x2="155.1" y2="49.8" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="135.4" y="21.0">A</text>
    <text x="52.4" y="96.0">B</text>
    <text x="256.6" y="96.0">C</text>
    <text x="153.1" y="84.7">D</text>
    <text x="154.5" y="233.0">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`$\angle BAE=\angle DAC$ – חוצה זווית.`,
          String.raw`$\angle AEB$ ו-$\angle ACB$ הן זוויות היקפיות הנשענות על הקשת $AB$.`,
          String.raw`$\frac{AB}{AD}=\frac{AE}{AC}$.`,
        ],
        solutionSteps: [
          String.raw`$AE$ חוצה את הזווית $A$, לכן $\angle BAE=\angle DAC$.`,
          String.raw`$\angle AEB=\angle ACB$ – זוויות היקפיות הנשענות על אותה קשת $AB$; כלומר $\angle AEB=\angle ACD$.`,
          String.raw`לפי ז.ז: $\triangle ABE\sim\triangle ADC$ (התאמה $A\leftrightarrow A$, $B\leftrightarrow D$, $E\leftrightarrow C$), ולכן $\frac{AB}{AD}=\frac{AE}{AC}$.`,
          String.raw`$\frac64=\frac{AE}{8}$, ולכן $AE=12$, ו-$DE=AE-AD=12-4=8$.`,
        ],
        finalAnswer: String.raw`$AE=12$, $DE=8$.`,
        answers: [
          { label: String.raw`$AE$`, value: 12 },
          { label: String.raw`$DE$`, value: 8 },
        ],
      },
      {
        id: 'geo-similarity-circles-5',
        difficulty: 2,
        statement: String.raw`המשולש $ABC$ חסום במעגל שמרכזו $O$. $AD$ הוא הגובה לצלע $BC$, ו-$AE$ הוא קוטר במעגל (ראו שרטוט). נתון: $AB=13$, $AC=15$, $AD=12$.

א. הוכיחו ש-$\triangle ABD\sim\triangle AEC$.

ב. חשבו את קוטר המעגל ואת רדיוסו.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="94.0" stroke-width="1.5" />
  <polygon points="136.9,28.9 79.0,167.7 241.0,167.7" />
  <line x1="136.9" y1="28.9" x2="136.9" y2="167.7" stroke-width="1.5" stroke-dasharray="5 3" />
  <line x1="136.9" y1="28.9" x2="183.1" y2="211.1" stroke-width="1.5" />
  <line x1="183.1" y1="211.1" x2="241.0" y2="167.7" stroke-width="1.5" />
  <polyline points="144.9,167.7 144.9,159.7 136.9,159.7" stroke-width="1" />
  <circle cx="160.0" cy="120.0" r="2.5" fill="currentColor" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="131.4" y="21.9">A</text>
    <text x="60.5" y="173.7">B</text>
    <text x="248.5" y="173.7">C</text>
    <text x="122.2" y="182.9">D</text>
    <text x="177.6" y="230.1">E</text>
    <text x="166.5" y="126.0">O</text>
  </g>
</svg>`,
        hints: [
          String.raw`$\angle ACE$ היא זווית היקפית הנשענת על הקוטר $AE$.`,
          String.raw`$\angle ABC$ ו-$\angle AEC$ הן זוויות היקפיות הנשענות על הקשת $AC$.`,
          String.raw`$\frac{AB}{AE}=\frac{AD}{AC}$.`,
        ],
        solutionSteps: [
          String.raw`א. $\angle ADB=90^\circ$ ($AD$ גובה), ו-$\angle ACE=90^\circ$ (זווית היקפית הנשענת על הקוטר $AE$).`,
          String.raw`$\angle ABD=\angle AEC$ – זוויות היקפיות הנשענות על אותה קשת $AC$.`,
          String.raw`לפי ז.ז: $\triangle ABD\sim\triangle AEC$ (התאמה $A\leftrightarrow A$, $B\leftrightarrow E$, $D\leftrightarrow C$).`,
          String.raw`ב. מהדמיון: $\frac{AB}{AE}=\frac{AD}{AC}$, כלומר $AE=\frac{AB\cdot AC}{AD}=\frac{13\cdot15}{12}=16.25$.`,
          String.raw`הקוטר הוא $16.25$, ולכן הרדיוס $8.125$.`,
        ],
        finalAnswer: String.raw`קוטר $16.25$, רדיוס $8.125$.`,
        answers: [
          { label: String.raw`$AE$`, value: 16.25 },
          { label: String.raw`$R$`, value: 8.125 },
        ],
      },
      {
        id: 'geo-similarity-circles-6',
        difficulty: 2,
        statement: String.raw`מהנקודה $P$ שמחוץ למעגל העבירו שני חותכים, $PAB$ ו-$PCD$ ($A,B,C,D$ על המעגל; $A$ בין $P$ ל-$B$, ו-$C$ בין $P$ ל-$D$; ראו שרטוט). נתון: $PA=4$, $AB=5$, $PC=3$. הוכיחו ש-$\triangle PAD\sim\triangle PCB$, וחשבו את $PD$ ואת $CD$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="180.3" cy="120.0" r="94.0" stroke-width="1.5" />
  <line x1="45.7" y1="198.5" x2="232.0" y2="198.5" stroke-width="1.5" />
  <line x1="45.7" y1="198.5" x2="249.2" y2="56.1" stroke-width="1.5" />
  <line x1="128.5" y1="198.5" x2="249.2" y2="56.1" stroke-width="1.5" />
  <line x1="96.6" y1="162.9" x2="232.0" y2="198.5" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="27.2" y="204.5">P</text>
    <text x="123.0" y="217.5">A</text>
    <text x="235.7" y="213.7">B</text>
    <text x="81.9" y="159.7">C</text>
    <text x="252.8" y="52.9">D</text>
  </g>
</svg>`,
        hints: [
          String.raw`הזווית $P$ משותפת לשני המשולשים.`,
          String.raw`$\angle ADC$ ו-$\angle ABC$ הן זוויות היקפיות הנשענות על הקשת $AC$.`,
          String.raw`$\frac{PA}{PC}=\frac{PD}{PB}$.`,
        ],
        solutionSteps: [
          String.raw`הזווית $P$ משותפת למשולשים $PAD$ ו-$PCB$.`,
          String.raw`$\angle ADC=\angle ABC$ – זוויות היקפיות הנשענות על אותה קשת $AC$; כלומר $\angle PDA=\angle PBC$.`,
          String.raw`לפי ז.ז: $\triangle PAD\sim\triangle PCB$ (התאמה $P\leftrightarrow P$, $A\leftrightarrow C$, $D\leftrightarrow B$), ולכן $\frac{PA}{PC}=\frac{PD}{PB}$.`,
          String.raw`$PB=PA+AB=9$: $\frac43=\frac{PD}{9}$, ולכן $PD=12$ ו-$CD=PD-PC=9$.`,
        ],
        finalAnswer: String.raw`$PD=12$, $CD=9$.`,
        answers: [
          { label: String.raw`$PD$`, value: 12 },
          { label: String.raw`$CD$`, value: 9 },
        ],
      },
      {
        id: 'geo-similarity-circles-7',
        difficulty: 3,
        statement: String.raw`המרובע $ABCD$ חסום במעגל, ו-$AB=AD$. האלכסונים $AC$ ו-$BD$ נפגשים בנקודה $E$ (ראו שרטוט).

א. הוכיחו ש-$\triangle ABE\sim\triangle ACB$.

ב. הוכיחו: $AB^2=AE\cdot AC$.

ג. נתון: $AE=4$, $EC=5$. חשבו את $AB$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="94.0" stroke-width="1.5" />
  <polygon points="160.0,26.0 69.8,93.7 86.2,178.3 250.2,93.7" />
  <line x1="160.0" y1="26.0" x2="86.2" y2="178.3" stroke-width="1.5" />
  <line x1="69.8" y1="93.7" x2="250.2" y2="93.7" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="154.5" y="19.0">A</text>
    <text x="51.3" y="99.7">B</text>
    <text x="71.6" y="193.5">C</text>
    <text x="257.7" y="99.7">D</text>
    <text x="131.6" y="109.6">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`למיתרים שווים מתאימות קשתות שוות: הקשת $AB$ שווה לקשת $AD$.`,
          String.raw`$\angle ABD$ נשענת על הקשת $AD$, ו-$\angle ACB$ נשענת על הקשת $AB$.`,
          String.raw`הזווית $A$ משותפת למשולשים $ABE$ ו-$ACB$.`,
        ],
        solutionSteps: [
          String.raw`א. $AB=AD$, ולמיתרים שווים במעגל מתאימות קשתות שוות: הקשת $AB$ שווה לקשת $AD$.`,
          String.raw`$\angle ABE=\angle ABD$ היא זווית היקפית הנשענת על הקשת $AD$, ו-$\angle ACB$ היא זווית היקפית הנשענת על הקשת $AB$. זוויות היקפיות הנשענות על קשתות שוות שוות, ולכן $\angle ABE=\angle ACB$.`,
          String.raw`הזווית $\angle BAE=\angle CAB$ משותפת, ולכן לפי ז.ז: $\triangle ABE\sim\triangle ACB$ (התאמה $A\leftrightarrow A$, $B\leftrightarrow C$, $E\leftrightarrow B$).`,
          String.raw`ב. מהדמיון: $\frac{AB}{AC}=\frac{AE}{AB}$, ובכפל בהצלבה $AB^2=AE\cdot AC$.`,
          String.raw`ג. $AC=AE+EC=9$, ולכן $AB^2=4\cdot9=36$ ו-$AB=6$.`,
        ],
        finalAnswer: String.raw`$AB=6$`,
        answers: [{ label: String.raw`$AB$`, value: 6 }],
      },
      {
        id: 'geo-similarity-circles-8',
        difficulty: 3,
        statement: String.raw`המשולש $ABC$ חסום במעגל. דרך $A$ העבירו משיק למעגל, והנקודות $D$ על $AB$ ו-$E$ על $AC$ נבחרו כך ש-$DE$ מקביל למשיק (ראו שרטוט).

א. הוכיחו ש-$\triangle ADE\sim\triangle ACB$.

ב. נתון: $AB=10$, $AC=8$, $AD=4$. חשבו את $AE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="157.9" cy="127.5" r="86.5" stroke-width="1.5" />
  <polygon points="179.3,43.7 72.1,138.3 243.7,138.3" />
  <line x1="110.1" y1="26.0" x2="248.6" y2="61.5" stroke-width="1.5" />
  <line x1="136.4" y1="81.6" x2="219.6" y2="102.9" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="173.8" y="36.7">A</text>
    <text x="57.4" y="153.5">B</text>
    <text x="247.4" y="153.5">C</text>
    <text x="117.9" y="87.6">D</text>
    <text x="227.1" y="108.9">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`סמנו נקודה $T$ על המשיק, בצד של $B$. הזווית בין המשיק $AT$ למיתר $AB$ שווה ל-$\angle ACB$.`,
          String.raw`$DE\parallel AT$, ולכן $\angle ADE=\angle TAB$ (זוויות מתחלפות).`,
          String.raw`$\frac{AD}{AC}=\frac{AE}{AB}$.`,
        ],
        solutionSteps: [
          String.raw`א. נסמן ב-$T$ נקודה על המשיק כך ש-$T$ ו-$C$ בצדדים שונים של הישר $AB$. הזווית בין משיק למיתר שווה לזווית ההיקפית הנשענת על הקשת שביניהם: $\angle TAB=\angle ACB$.`,
          String.raw`$DE\parallel AT$ והישר $AB$ חותך אותם, לכן $\angle ADE=\angle TAD=\angle TAB$ (זוויות מתחלפות). מכאן $\angle ADE=\angle ACB$.`,
          String.raw`הזווית $A$ משותפת, ולכן לפי ז.ז: $\triangle ADE\sim\triangle ACB$ (התאמה $A\leftrightarrow A$, $D\leftrightarrow C$, $E\leftrightarrow B$).`,
          String.raw`ב. מהדמיון: $\frac{AD}{AC}=\frac{AE}{AB}$, כלומר $\frac48=\frac{AE}{10}$, ולכן $AE=5$.`,
        ],
        finalAnswer: String.raw`$AE=5$`,
        answers: [{ label: String.raw`$AE$`, value: 5 }],
      },
    ],
  },
  'geo-similarity-review': {
    intro: String.raw`תרגילים מסכמים לפרק פרופורציה ודמיון: משפט תאלס וקטעי אמצעים, משפט חוצה זווית פנימית, שלושת משפטי הדמיון, יחס הגבהים ויחס השטחים במשולשים דומים, ודמיון משולשים במעגל. כל תרגיל בנוי כמו שאלה 4 בשאלון 806 – סעיף הוכחה ואחריו סעיפי חישוב שנשענים עליו. זכרו: לפי המיקוד אין להשתמש ביחס היקפים, תיכונים או רדיוסים במשולשים דומים, במשפטי הקטעים הפרופורציוניים או במשפט חוצה הזווית החיצונית.`,
    keyFacts: [
      'מתחילים בסימון כל הנתונים בשרטוט, ובחיפוש ישרים מקבילים (תאלס, זוויות מתחלפות ומתאימות) וזוויות שוות במעגל (זוויות היקפיות, משיק ומיתר).',
      String.raw`במשולשים דומים: יחס הצלעות ויחס הגבהים $=k$, יחס השטחים $=k^2$. במשולשים בעלי גובה משותף: יחס השטחים = יחס הבסיסים.`,
      String.raw`משפט חוצה זווית פנימית: $\frac{BD}{DC}=\frac{AB}{AC}$.`,
      String.raw`תאלס המורחב: $DE\parallel BC\ \Rightarrow\ \frac{AD}{AB}=\frac{AE}{AC}=\frac{DE}{BC}$.`,
      'בכל סעיף משתמשים בתוצאות הסעיפים הקודמים – גם אם לא הצלחתם להוכיח סעיף, מותר להשתמש בטענה שלו בהמשך.',
    ],
    exercises: [
      {
        id: 'geo-similarity-review-1',
        difficulty: 2,
        statement: String.raw`במשולש $ABC$ נתון: $AB=12$, $AC=8$, $BC=15$. $AD$ חוצה את הזווית $A$ ($D$ על $BC$), ודרך $D$ העבירו ישר המקביל ל-$AB$, החותך את $AC$ בנקודה $E$ (ראו שרטוט).

א. חשבו את $BD$ ואת $DC$.

ב. חשבו את $DE$.

ג. מצאו את היחס בין שטח המשולש $CDE$ לשטח המרובע $ABDE$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="207.6,63.1 26.0,176.9 294.0,176.9" />
  <line x1="207.6" y1="63.1" x2="186.8" y2="176.9" stroke-width="1.5" />
  <line x1="186.8" y1="176.9" x2="259.5" y2="131.4" stroke-width="1.5" />
  <path d="M 189.0,74.7 A 22 22 0 0 0 203.7,84.7" stroke-width="1.2" />
  <line x1="197.5" y1="77.9" x2="193.1" y2="84.6" stroke-width="1.2" />
  <path d="M 203.7,84.7 A 22 22 0 0 0 220.9,80.6" stroke-width="1.2" />
  <line x1="211.8" y1="80.6" x2="213.7" y2="88.3" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="202.1" y="56.1">A</text>
    <text x="11.3" y="192.1">B</text>
    <text x="297.7" y="192.1">C</text>
    <text x="181.3" y="195.9">D</text>
    <text x="263.2" y="128.2">E</text>
  </g>
</svg>`,
        hints: [
          'א. משפט חוצה זווית פנימית.',
          String.raw`ב. $\triangle CDE\sim\triangle CBA$, ויחס הדמיון הוא $\frac{CD}{CB}$.`,
          String.raw`ג. מצאו קודם את $\frac{S_{CDE}}{S_{CBA}}$, ואז החסירו.`,
        ],
        solutionSteps: [
          String.raw`א. לפי משפט חוצה זווית פנימית: $\frac{BD}{DC}=\frac{AB}{AC}=\frac{12}{8}=\frac32$. עם $BD+DC=15$: $BD=9$, $DC=6$.`,
          String.raw`ב. $DE\parallel BA$, לכן $\angle CDE=\angle CBA$ (זוויות מתאימות), והזווית $C$ משותפת: $\triangle CDE\sim\triangle CBA$ (ז.ז) ביחס $k=\frac{CD}{CB}=\frac{6}{15}=\frac25$.`,
          String.raw`$DE=\frac25\cdot AB=\frac25\cdot12=4.8$.`,
          String.raw`ג. יחס השטחים: $\frac{S_{CDE}}{S_{CBA}}=k^2=\frac{4}{25}$. נסמן $S_{CBA}=25t$; אז $S_{CDE}=4t$ ו-$S_{ABDE}=25t-4t=21t$.`,
          String.raw`$\frac{S_{CDE}}{S_{ABDE}}=\frac{4}{21}\approx0.19$.`,
        ],
        finalAnswer: String.raw`$BD=9$, $DC=6$, $DE=4.8$, היחס $\frac{4}{21}$.`,
        answers: [
          { label: String.raw`$BD$`, value: 9 },
          { label: String.raw`$DE$`, value: 4.8 },
          { label: String.raw`$\frac{S_{CDE}}{S_{ABDE}}$`, value: 4 / 21 },
        ],
      },
      {
        id: 'geo-similarity-review-2',
        difficulty: 2,
        statement: String.raw`$ABCD$ הוא טרפז ($AB\parallel DC$) שבו $AB=9$, $DC=15$ וגובהו $8$. האלכסונים נפגשים בנקודה $O$ (ראו שרטוט).

א. הוכיחו ש-$\triangle AOB\sim\triangle COD$.

ב. חשבו את המרחק של $O$ מהבסיס $AB$.

ג. חשבו את $S_{AOD}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="61.7,48.5 222.5,48.5 294.0,191.5 26.0,191.5" />
  <line x1="61.7" y1="48.5" x2="294.0" y2="191.5" stroke-width="1.5" />
  <line x1="222.5" y1="48.5" x2="26.0" y2="191.5" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="47.0" y="45.3">A</text>
    <text x="226.2" y="45.3">B</text>
    <text x="297.7" y="206.7">C</text>
    <text x="11.3" y="206.7">D</text>
    <text x="157.3" y="108.1">O</text>
  </g>
</svg>`,
        hints: [
          'א. זוויות מתחלפות בין הבסיסים המקבילים.',
          String.raw`ב. המרחקים של $O$ מהבסיסים הם גבהים מתאימים, והיחס ביניהם שווה ליחס הדמיון $\frac{9}{15}$.`,
          String.raw`ג. $S_{AOD}=S_{ABD}-S_{AOB}$.`,
        ],
        solutionSteps: [
          String.raw`א. $AB\parallel DC$, לכן $\angle OAB=\angle OCD$ ו-$\angle OBA=\angle ODC$ (זוויות מתחלפות). לפי ז.ז: $\triangle AOB\sim\triangle COD$, ביחס $k=\frac{AB}{CD}=\frac{9}{15}=\frac35$.`,
          String.raw`ב. נסמן ב-$h_1$, $h_2$ את המרחקים של $O$ מ-$AB$ ומ-$DC$ – אלה הגבהים לצלעות המתאימות $AB$ ו-$CD$, ולכן $\frac{h_1}{h_2}=\frac35$. הבסיסים מקבילים, לכן $h_1+h_2=8$, ומכאן $h_1=3$ (ו-$h_2=5$).`,
          String.raw`ג. $S_{ABD}=\frac{AB\cdot8}{2}=36$ (הגובה לבסיס $AB$ הוא גובה הטרפז), ו-$S_{AOB}=\frac{9\cdot3}{2}=13.5$.`,
          String.raw`$O$ על $BD$, לכן $S_{AOD}=S_{ABD}-S_{AOB}=36-13.5=22.5$.`,
        ],
        finalAnswer: String.raw`המרחק $3$, $S_{AOD}=22.5$.`,
        answers: [
          { label: String.raw`המרחק של $O$ מ-$AB$`, value: 3 },
          { label: String.raw`$S_{AOD}$`, value: 22.5 },
        ],
      },
      {
        id: 'geo-similarity-review-3',
        difficulty: 2,
        statement: String.raw`המיתרים $AB$ ו-$CD$ במעגל נחתכים בנקודה $E$ (ראו שרטוט). נתון: $AE=6$, $EB=5$, $ED=10$.

א. הוכיחו ש-$\triangle AEC\sim\triangle DEB$.

ב. חשבו את $CE$.

ג. מצאו את היחס $\frac{S_{AEC}}{S_{DEB}}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <circle cx="160.0" cy="120.0" r="94.0" stroke-width="1.5" />
  <line x1="81.5" y1="68.2" x2="238.5" y2="68.2" stroke-width="1.5" />
  <line x1="185.2" y1="29.4" x2="106.8" y2="197.5" stroke-width="1.5" />
  <line x1="81.5" y1="68.2" x2="185.2" y2="29.4" stroke-width="1.5" />
  <line x1="106.8" y1="197.5" x2="238.5" y2="68.2" stroke-width="1.5" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="63.0" y="74.2">A</text>
    <text x="246.0" y="74.2">B</text>
    <text x="179.7" y="22.4">C</text>
    <text x="101.3" y="216.5">D</text>
    <text x="170.8" y="83.4">E</text>
  </g>
</svg>`,
        hints: [
          String.raw`א. $\angle CAB$ ו-$\angle CDB$ נשענות על אותה קשת $CB$.`,
          String.raw`ב. $\frac{AE}{DE}=\frac{CE}{BE}$.`,
          String.raw`ג. יחס הדמיון הוא $\frac{AE}{DE}$, ויחס השטחים הוא ריבועו.`,
        ],
        solutionSteps: [
          String.raw`א. $\angle CAE=\angle BDE$ – זוויות היקפיות הנשענות על אותה קשת $CB$; $\angle AEC=\angle DEB$ – זוויות קודקודיות. לפי ז.ז: $\triangle AEC\sim\triangle DEB$ (התאמה $A\leftrightarrow D$, $E\leftrightarrow E$, $C\leftrightarrow B$).`,
          String.raw`ב. מהדמיון: $\frac{AE}{DE}=\frac{CE}{BE}$, כלומר $\frac{6}{10}=\frac{CE}{5}$, ולכן $CE=3$.`,
          String.raw`ג. יחס הדמיון $k=\frac{AE}{DE}=\frac35$, ויחס השטחים במשולשים דומים שווה ל-$k^2$: $\frac{S_{AEC}}{S_{DEB}}=\frac{9}{25}=0.36$.`,
        ],
        finalAnswer: String.raw`$CE=3$, $\frac{S_{AEC}}{S_{DEB}}=\frac{9}{25}$.`,
        answers: [
          { label: String.raw`$CE$`, value: 3 },
          { label: String.raw`$\frac{S_{AEC}}{S_{DEB}}$`, value: 9 / 25 },
        ],
      },
      {
        id: 'geo-similarity-review-4',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ התיכונים $BE$ ו-$CF$ נפגשים בנקודה $G$ (ראו שרטוט). נתון: $BE=12$ ו-$S_{ABC}=48$.

א. הוכיחו ש-$FE\parallel BC$ ו-$FE=\frac12BC$.

ב. הוכיחו ש-$\triangle GFE\sim\triangle GCB$, וחשבו את $GE$.

ג. חשבו את $S_{GFE}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="263.3,30.7 26.0,209.3 294.0,209.3" />
  <line x1="26.0" y1="209.3" x2="278.7" y2="120.0" stroke-width="1.5" />
  <line x1="294.0" y1="209.3" x2="144.7" y2="120.0" stroke-width="1.5" />
  <line x1="144.7" y1="120.0" x2="278.7" y2="120.0" stroke-width="1.5" />
  <line x1="201.0" y1="71.3" x2="207.0" y2="79.3" stroke-width="1.2" />
  <line x1="82.3" y1="160.7" x2="88.3" y2="168.7" stroke-width="1.2" />
  <line x1="265.7" y1="74.2" x2="275.6" y2="72.5" stroke-width="1.2" />
  <line x1="266.4" y1="78.2" x2="276.3" y2="76.5" stroke-width="1.2" />
  <line x1="281.1" y1="163.5" x2="290.9" y2="161.8" stroke-width="1.2" />
  <line x1="281.7" y1="167.5" x2="291.6" y2="165.8" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="257.8" y="23.7">A</text>
    <text x="11.3" y="224.5">B</text>
    <text x="297.7" y="224.5">C</text>
    <text x="286.2" y="126.0">E</text>
    <text x="130.0" y="116.8">F</text>
    <text x="188.9" y="170.8">G</text>
  </g>
</svg>`,
        hints: [
          String.raw`א. $FE$ הוא קטע אמצעים במשולש $ABC$.`,
          String.raw`ב. זוויות מתחלפות בין $FE$ ל-$BC$; יחס הדמיון $\frac{FE}{CB}=\frac12$, ולכן $\frac{GE}{GB}=\frac12$.`,
          String.raw`ג. מצאו את $S_{GBC}$ כחלק מ-$S_{EBC}$ (גובה משותף מ-$C$), ואז השתמשו ביחס השטחים $k^2=\frac14$.`,
        ],
        solutionSteps: [
          String.raw`א. $F$ ו-$E$ הם אמצעי $AB$ ו-$AC$, לכן $FE$ קטע אמצעים במשולש $ABC$: $FE\parallel BC$ ו-$FE=\frac12BC$.`,
          String.raw`ב. $FE\parallel BC$, לכן $\angle GFE=\angle GCB$ ו-$\angle GEF=\angle GBC$ (זוויות מתחלפות). לפי ז.ז: $\triangle GFE\sim\triangle GCB$ (התאמה $F\leftrightarrow C$, $E\leftrightarrow B$, $G\leftrightarrow G$) ביחס $\frac{FE}{CB}=\frac12$.`,
          String.raw`מכאן $\frac{GE}{GB}=\frac12$, ו-$GE+GB=BE=12$, ולכן $GE=4$ (ו-$GB=8$).`,
          String.raw`ג. $BE$ תיכון, לכן $S_{EBC}=\frac12\cdot48=24$. למשולשים $GBC$ ו-$EBC$ גובה משותף מ-$C$ לישר $BE$, ולכן $\frac{S_{GBC}}{S_{EBC}}=\frac{GB}{EB}=\frac{8}{12}$, כלומר $S_{GBC}=16$.`,
          String.raw`יחס השטחים במשולשים הדומים $GFE$ ו-$GCB$ הוא $\left(\frac12\right)^2=\frac14$, ולכן $S_{GFE}=\frac14\cdot16=4$.`,
        ],
        finalAnswer: String.raw`$GE=4$, $S_{GFE}=4$.`,
        answers: [
          { label: String.raw`$GE$`, value: 4 },
          { label: String.raw`$S_{GFE}$`, value: 4 },
        ],
      },
      {
        id: 'geo-similarity-review-5',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ נתון $BC=21$, והגובה לצלע $BC$ הוא $AH=14$. המלבן $DEFG$ חסום במשולש כך ש-$D$ ו-$E$ על $BC$, $F$ על $AC$ ו-$G$ על $AB$, והצלע $GF$ ארוכה פי $2$ מהצלע $GD$ (ראו שרטוט).

א. הוכיחו ש-$\triangle AGF\sim\triangle ABC$.

ב. חשבו את צלעות המלבן.

ג. מצאו את היחס $\frac{S_{AGF}}{S_{ABC}}$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="115.3,30.7 26.0,209.3 294.0,209.3" />
  <polygon points="64.3,209.3 217.4,209.3 217.4,132.8 64.3,132.8" />
  <line x1="115.3" y1="30.7" x2="115.3" y2="209.3" stroke-width="1.5" stroke-dasharray="5 3" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="109.8" y="23.7">A</text>
    <text x="11.3" y="224.5">B</text>
    <text x="297.7" y="224.5">C</text>
    <text x="109.8" y="228.3">H</text>
    <text x="58.8" y="228.3">D</text>
    <text x="211.9" y="228.3">E</text>
    <text x="221.1" y="129.6">F</text>
    <text x="49.6" y="129.6">G</text>
  </g>
</svg>`,
        hints: [
          String.raw`א. $GF\parallel BC$.`,
          String.raw`ב. סמנו $GD=x$, $GF=2x$. הגובה של $\triangle AGF$ הוא $14-x$, ויחס הגבהים שווה ליחס הדמיון: $\frac{2x}{21}=\frac{14-x}{14}$.`,
          String.raw`ג. $k=\frac{GF}{BC}$, ויחס השטחים הוא $k^2$.`,
        ],
        solutionSteps: [
          String.raw`א. $GF\parallel BC$ (צלעות נגדיות במלבן), לכן $\angle AGF=\angle ABC$ ו-$\angle AFG=\angle ACB$ (זוויות מתאימות). לפי ז.ז: $\triangle AGF\sim\triangle ABC$.`,
          String.raw`ב. נסמן $GD=x$, $GF=2x$. הגובה של $\triangle AGF$ מ-$A$ הוא $AH$ פחות המרחק בין $GF$ ל-$BC$: $14-x$.`,
          String.raw`היחס בין גבהים מתאימים שווה ליחס הדמיון: $\frac{2x}{21}=\frac{14-x}{14}$, כלומר $28x=294-21x$, ולכן $x=6$.`,
          String.raw`צלעות המלבן: $GD=6$, $GF=12$.`,
          String.raw`ג. $k=\frac{GF}{BC}=\frac{12}{21}=\frac47$, ולכן $\frac{S_{AGF}}{S_{ABC}}=\frac{16}{49}\approx0.327$.`,
        ],
        finalAnswer: String.raw`$GD=6$, $GF=12$, היחס $\frac{16}{49}$.`,
        answers: [
          { label: String.raw`$GD$`, value: 6 },
          { label: String.raw`$GF$`, value: 12 },
          { label: String.raw`$\frac{S_{AGF}}{S_{ABC}}$`, value: 16 / 49 },
        ],
      },
      {
        id: 'geo-similarity-review-6',
        difficulty: 3,
        statement: String.raw`במשולש $ABC$ נתון: $AB=6$, $AC=12$. $AD$ חוצה את הזווית $A$ ($D$ על $BC$). דרך $D$ העבירו ישר המקביל ל-$AB$, החותך את $AC$ בנקודה $E$, וישר המקביל ל-$AC$, החותך את $AB$ בנקודה $F$ (ראו שרטוט).

א. הוכיחו שהמרובע $AFDE$ הוא מעוין.

ב. חשבו את אורך צלע המעוין.

ג. מצאו את היחס בין שטח המעוין לשטח המשולש $ABC$.`,
        figureSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" stroke="currentColor" fill="none" stroke-width="2">
  <polygon points="86.2,71.1 26.0,168.9 294.0,168.9" />
  <line x1="86.2" y1="71.1" x2="115.3" y2="168.9" stroke-width="1.5" />
  <line x1="115.3" y1="168.9" x2="155.4" y2="103.7" stroke-width="1.5" />
  <line x1="115.3" y1="168.9" x2="46.1" y2="136.3" stroke-width="1.5" />
  <path d="M 75.7,88.1 A 20 20 0 0 0 91.9,90.2" stroke-width="1.2" />
  <line x1="84.1" y1="86.9" x2="83.0" y2="94.9" stroke-width="1.2" />
  <path d="M 91.9,90.2 A 20 20 0 0 0 104.3,79.6" stroke-width="1.2" />
  <line x1="96.6" y1="83.2" x2="101.8" y2="89.3" stroke-width="1.2" />
  <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif">
    <text x="80.7" y="64.1">A</text>
    <text x="11.3" y="184.1">B</text>
    <text x="297.7" y="184.1">C</text>
    <text x="109.8" y="187.9">D</text>
    <text x="159.1" y="100.5">E</text>
    <text x="31.4" y="133.1">F</text>
  </g>
</svg>`,
        hints: [
          'א. מקבילית שאלכסון שלה חוצה זווית היא מעוין.',
          String.raw`ב. לפי חוצה זווית $\frac{CD}{CB}=\frac{AC}{AB+AC}$, ו-$\triangle CDE\sim\triangle CBA$.`,
          String.raw`ג. חשבו את $\frac{S_{CDE}}{S_{CBA}}$ ואת $\frac{S_{BDF}}{S_{BCA}}$, והחסירו מ-$1$.`,
        ],
        solutionSteps: [
          String.raw`א. $DE\parallel AF$ ו-$DF\parallel AE$, לכן $AFDE$ מקבילית. האלכסון $AD$ שלה חוצה את הזווית $A$, ומקבילית שאלכסון בה חוצה זווית היא מעוין.`,
          String.raw`ב. לפי משפט חוצה זווית פנימית: $\frac{BD}{DC}=\frac{AB}{AC}=\frac{6}{12}=\frac12$, ולכן $\frac{CD}{CB}=\frac23$ ו-$\frac{BD}{BC}=\frac13$.`,
          String.raw`$DE\parallel BA$, לכן $\triangle CDE\sim\triangle CBA$ (ז.ז – זווית $C$ משותפת וזוויות מתאימות) ביחס $\frac{CD}{CB}=\frac23$: $DE=\frac23\cdot6=4$. צלע המעוין היא $4$.`,
          String.raw`ג. $\frac{S_{CDE}}{S_{CBA}}=\left(\frac23\right)^2=\frac49$. באופן דומה $DF\parallel CA$, לכן $\triangle BDF\sim\triangle BCA$ ביחס $\frac13$, ו-$\frac{S_{BDF}}{S_{BCA}}=\frac19$.`,
          String.raw`המשולש $ABC$ מורכב מהמעוין ומשני המשולשים, לכן $\frac{S_{AFDE}}{S_{ABC}}=1-\frac49-\frac19=\frac49$.`,
        ],
        finalAnswer: String.raw`צלע המעוין $4$, היחס $\frac49$.`,
        answers: [
          { label: 'צלע המעוין', value: 4 },
          { label: String.raw`$\frac{S_{AFDE}}{S_{ABC}}$`, value: 4 / 9 },
        ],
      },
    ],
  },
};
