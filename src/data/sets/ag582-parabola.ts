import type { DiagramSpec, Exercise, ExerciseSet } from './types';

/**
 * סט: פרבולה (שאלון 35582, שאלה 1 – גאומטריה אנליטית).
 * 1–4 צעד אחד · 5–8 שניים-שלושה סעיפים · 9–12 שאלות בסגנון בגרות.
 */

const T = 'analytic-geometry';
const PAR = 'analytic-parabola';

/** The two branches of y² = c·x on [0, to]. */
function branches(c: number, to: number) {
  return [
    { expr: `sqrt(${c}*x)`, domain: [0, to] as [number, number] },
    { expr: `-sqrt(${c}*x)`, domain: [0, to] as [number, number] },
  ];
}

const e1: Exercise = {
  id: 'par-1',
  level: 1,
  topicId: T,
  subtopicIds: [PAR, 'analytic-loci'],
  intro: String.raw`נתונים הנקודה $F(7,0)$ והישר $x=-7$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-11, 12], yRange: [-8, 8], functions: [], points: [{ x: 7, y: 0, label: 'F(7, 0)' }], asymptotes: [{ x: -7 }], labels: [{ at: [-9.2, 7], text: 'x = −7' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`המקום הגאומטרי של כל הנקודות שמרחקן מהנקודה $F$ שווה למרחקן מהישר $x=-7$ הוא פרבולה. מהי משוואתה?`,
      hints: [
        String.raw`לפי ההגדרה, $F$ היא מוקד הפרבולה והישר הוא המדריך שלה. בפרבולה $y^2=2px$ המוקד הוא $\left(\dfrac p2,0\right)$ והמדריך הוא $x=-\dfrac p2$.`,
        String.raw`כאן $\dfrac p2=7$. מצאו את $p$ והציבו ב-$y^2=2px$.`,
      ],
      check: { kind: 'choice', options: [String.raw`$y^2=14x$`, String.raw`$y^2=28x$`, String.raw`$y^2=7x$`, String.raw`$x^2=28y$`], correct: 1 },
      short: String.raw`$\dfrac p2=7$, ולכן $p=14$ והמשוואה היא $y^2=2\cdot 14x=28x$.`,
      full: [
        String.raw`פרבולה היא המקום הגאומטרי של הנקודות שמרחקן מנקודה קבועה (המוקד) שווה למרחקן מישר קבוע (המדריך).`,
        String.raw`נסמן נקודה כללית $P(x,y)$. מרחקה מ-$F(7,0)$ הוא $\sqrt{(x-7)^2+y^2}$, ומרחקה מהישר $x=-7$ הוא $|x+7|$.`,
        String.raw`משווים ומעלים בריבוע: $(x-7)^2+y^2=(x+7)^2$, כלומר $x^2-14x+49+y^2=x^2+14x+49$.`,
        String.raw`מקבלים $y^2=28x$. זו הפרבולה $y^2=2px$ עם $p=14$: מוקד $\left(\dfrac p2,0\right)=(7,0)$ ומדריך $x=-7$.`,
      ],
    },
  ],
};

const e2: Exercise = {
  id: 'par-2',
  level: 1,
  topicId: T,
  subtopicIds: [PAR],
  intro: String.raw`הפרבולה $y^2=2px$ עוברת דרך הנקודה $A(9,6)$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-3, 12], functions: branches(4, 12), points: [{ x: 9, y: 6, label: 'A(9, 6)' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את $p$.`,
      hints: [String.raw`נקודה שנמצאת על הפרבולה מקיימת את משוואת הפרבולה.`, String.raw`הציבו $x=9$ ו-$y=6$ במשוואה $y^2=2px$ ופתרו עבור $p$.`],
      check: { kind: 'numeric', answer: 2, verify: '6^2/(2*9)' },
      short: String.raw`$6^2=2p\cdot 9$, ולכן $p=\dfrac{36}{18}=2$ (הפרבולה היא $y^2=4x$).`,
      full: [
        String.raw`הנקודה $A(9,6)$ על הפרבולה, ולכן שיעוריה מקיימים את המשוואה $y^2=2px$.`,
        String.raw`$6^2=2p\cdot 9\ \Rightarrow\ 36=18p\ \Rightarrow\ p=2$.`,
        String.raw`משוואת הפרבולה: $y^2=4x$. בדיקה: $4\cdot 9=36=6^2$.`,
      ],
    },
  ],
};

const e3: Exercise = {
  id: 'par-3',
  level: 1,
  topicId: T,
  subtopicIds: [PAR],
  intro: String.raw`נתונה הפרבולה $y^2=16x$. הנקודה $A$ נמצאת על הפרבולה ברביע הראשון, ושיעור ה-$x$ שלה הוא $5$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-6, 8], functions: branches(16, 8), points: [{ x: 5, y: 8.944, label: 'A' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`חשבו את מרחק הנקודה $A$ ממוקד הפרבולה.`,
      hints: [
        String.raw`מצאו קודם את $p$ מתוך $2p=16$, ואת המדריך $x=-\dfrac p2$.`,
        String.raw`מרחק נקודה שעל הפרבולה מהמוקד שווה למרחקה מהמדריך, כלומר ל-$x_0+\dfrac p2$.`,
      ],
      check: { kind: 'numeric', answer: 9, verify: 'sqrt((5-16/4)^2+16*5)' },
      short: String.raw`$p=8$, ולכן המרחק מהמוקד הוא $x_A+\dfrac p2=5+4=9$.`,
      full: [
        String.raw`$y^2=16x$ היא פרבולה $y^2=2px$ עם $2p=16$, כלומר $p=8$. המוקד: $F(4,0)$, המדריך: $x=-4$.`,
        String.raw`לפי הגדרת הפרבולה, מרחק $A$ מהמוקד שווה למרחקה מהמדריך: $AF=x_A-(-4)=5+4=9$.`,
        String.raw`בדיקה ישירה: $y_A^2=16\cdot 5=80$, ולכן $AF=\sqrt{(5-4)^2+80}=\sqrt{81}=9$.`,
      ],
    },
  ],
};

const e4: Exercise = {
  id: 'par-4',
  level: 1,
  topicId: T,
  subtopicIds: [PAR],
  intro: String.raw`נתונה הפרבולה $y^2=6x$ והנקודה $A(6,6)$ שעליה (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-4, 10], functions: branches(6, 10), points: [{ x: 6, y: 6, label: 'A(6, 6)' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את שיפוע המשיק לפרבולה בנקודה $A$.`,
      hints: [
        String.raw`משוואת המשיק לפרבולה $y^2=2px$ בנקודה $(x_0,y_0)$ שעליה היא $y\,y_0=p(x+x_0)$.`,
        String.raw`כאן $p=3$ ו-$(x_0,y_0)=(6,6)$. הציבו ובודדו את $y$ כדי לקרוא את השיפוע.`,
      ],
      check: { kind: 'numeric', answer: 0.5, verify: 'deriv("sqrt(6*x)", 6)' },
      short: String.raw`המשיק: $6y=3(x+6)$, כלומר $y=\dfrac12x+3$. השיפוע הוא $\dfrac12$.`,
      full: [
        String.raw`$2p=6$, ולכן $p=3$. הנקודה $A$ אכן על הפרבולה: $6^2=36=6\cdot 6$.`,
        String.raw`משוואת המשיק בנקודה שעל הפרבולה: $y\,y_0=p(x+x_0)$, כלומר $y\cdot 6=3(x+6)$.`,
        String.raw`$6y=3x+18\ \Rightarrow\ y=\dfrac12x+3$.`,
        String.raw`שיפוע המשיק הוא $\dfrac12$ (באופן כללי השיפוע הוא $\dfrac{p}{y_0}=\dfrac36$).`,
      ],
    },
  ],
};

const e5: Exercise = {
  id: 'par-5',
  level: 2,
  topicId: T,
  subtopicIds: [PAR],
  intro: String.raw`המדריך של הפרבולה $y^2=2px$ הוא הישר $x=-2.5$ (הקו המקווקו בשרטוט). הנקודה $B$ נמצאת על הפרבולה ברביע הראשון, ומרחקה ממוקד הפרבולה הוא $12.5$.`,
  diagram: { kind: 'plot', xRange: [-7, 13], functions: branches(10, 13), asymptotes: [{ x: -2.5 }], labels: [{ at: [-5, 10.5], text: 'x = −2.5' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את $p$.`,
      hints: [String.raw`המדריך של הפרבולה $y^2=2px$ הוא הישר $x=-\dfrac p2$.`, String.raw`השוו: $-\dfrac p2=-2.5$.`],
      check: { kind: 'numeric', answer: 5, verify: '2*2.5' },
      short: String.raw`$\dfrac p2=2.5$, ולכן $p=5$ (הפרבולה $y^2=10x$).`,
      full: [String.raw`המדריך של $y^2=2px$ הוא $x=-\dfrac p2$. נתון שהמדריך הוא $x=-2.5$.`, String.raw`$\dfrac p2=2.5\ \Rightarrow\ p=5$.`, String.raw`משוואת הפרבולה: $y^2=10x$, והמוקד הוא $F(2.5,0)$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את שיעור ה-$x$ של הנקודה $B$.`,
      hints: [String.raw`מרחק נקודה שעל הפרבולה מהמוקד שווה למרחקה מהמדריך.`, String.raw`מרחק $B$ מהמדריך $x=-2.5$ הוא $x_B+2.5$.`],
      check: { kind: 'numeric', answer: 10, verify: '12.5-2.5' },
      short: String.raw`$x_B+2.5=12.5$, ולכן $x_B=10$.`,
      full: [String.raw`לפי הגדרת הפרבולה, $BF$ שווה למרחק $B$ מהמדריך.`, String.raw`מרחק $B$ מהישר $x=-2.5$ הוא $x_B-(-2.5)=x_B+2.5$.`, String.raw`$x_B+2.5=12.5\ \Rightarrow\ x_B=10$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את שיעור ה-$y$ של הנקודה $B$.`,
      hints: [String.raw`הנקודה $B$ נמצאת על הפרבולה $y^2=10x$. הציבו את $x_B$.`, String.raw`ברביע הראשון $y>0$.`],
      check: { kind: 'numeric', answer: 10, verify: 'sqrt(2*5*(12.5-2.5))' },
      short: String.raw`$y_B^2=10\cdot 10=100$, וברביע הראשון $y_B=10$.`,
      full: [String.raw`$y_B^2=10x_B=10\cdot 10=100$, ולכן $y_B=\pm 10$.`, String.raw`$B$ ברביע הראשון, ולכן $y_B=10$, כלומר $B(10,10)$.`, String.raw`בדיקה: $BF=\sqrt{(10-2.5)^2+10^2}=\sqrt{56.25+100}=\sqrt{156.25}=12.5$.`],
    },
  ],
};

const e6: Exercise = {
  id: 'par-6',
  level: 2,
  topicId: T,
  subtopicIds: [PAR, 'analytic-lines'],
  intro: String.raw`נתונה הפרבולה $y^2=18x$ שמוקדה $F$, והנקודה $A(2,6)$ שעליה (ראו שרטוט). המשיק לפרבולה בנקודה $A$ חותך את ציר ה-$x$ בנקודה $B$.`,
  diagram: { kind: 'plot', xRange: [-4, 6], functions: branches(18, 6), points: [{ x: 2, y: 6, label: 'A(2, 6)' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מהי משוואת המשיק לפרבולה בנקודה $A$?`,
      hints: [String.raw`מצאו את $p$. משוואת המשיק בנקודה $(x_0,y_0)$ שעל הפרבולה: $y\,y_0=p(x+x_0)$.`, String.raw`$p=9$, ולכן $6y=9(x+2)$. בודדו את $y$.`],
      check: { kind: 'choice', options: [String.raw`$y=3x$`, String.raw`$y=\dfrac23x+\dfrac{14}{3}$`, String.raw`$y=\dfrac32x+3$`, String.raw`$y=\dfrac32x-3$`], correct: 2 },
      short: String.raw`$p=9$: $6y=9(x+2)$, כלומר $y=\dfrac32x+3$.`,
      full: [
        String.raw`$2p=18$, ולכן $p=9$. הנקודה $A$ על הפרבולה: $6^2=36=18\cdot 2$.`,
        String.raw`משוואת המשיק: $y\,y_0=p(x+x_0)$, כלומר $6y=9(x+2)$.`,
        String.raw`$6y=9x+18\ \Rightarrow\ y=\dfrac32x+3$.`,
        String.raw`שימו לב: גם $y=3x$ וגם $y=\dfrac23x+\dfrac{14}{3}$ עוברים דרך $A$, אבל שיפוע המשיק הוא $\dfrac{p}{y_0}=\dfrac96=\dfrac32$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את שיעור ה-$x$ של הנקודה $B$.`,
      hints: [String.raw`בנקודת חיתוך עם ציר ה-$x$ מתקיים $y=0$.`, String.raw`הציבו $y=0$ במשוואת המשיק $y=\dfrac32x+3$.`],
      check: { kind: 'numeric', answer: -2, verify: '2-6/deriv("sqrt(18*x)", 2)' },
      short: String.raw`$0=\dfrac32x+3$, ולכן $x_B=-2$.`,
      full: [String.raw`מציבים $y=0$ במשוואת המשיק: $0=\dfrac32x+3$.`, String.raw`$x=-2$, כלומר $B(-2,0)$.`, String.raw`תכונה כללית: המשיק בנקודה $(x_0,y_0)$ חותך את ציר ה-$x$ בנקודה $(-x_0,0)$, כי $0=p(x+x_0)$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`חשבו את אורך הקטע $FB$, והשוו אותו לאורך הקטע $FA$.`,
      hints: [String.raw`מצאו את המוקד $F\left(\dfrac p2,0\right)$. הנקודות $F$ ו-$B$ נמצאות שתיהן על ציר ה-$x$.`, String.raw`$F(4.5,0)$ ו-$B(-2,0)$. את $FA$ אפשר לחשב כמרחק של $A$ מהמדריך: $x_A+\dfrac p2$.`],
      check: { kind: 'numeric', answer: 6.5, verify: '18/4-(2-6/deriv("sqrt(18*x)", 2))' },
      short: String.raw`$F(4.5,0)$, $B(-2,0)$: $FB=6.5$. גם $FA=x_A+\dfrac p2=2+4.5=6.5$, ולכן $FA=FB$.`,
      full: [
        String.raw`המוקד: $F\left(\dfrac p2,0\right)=(4.5,0)$.`,
        String.raw`$FB=4.5-(-2)=6.5$.`,
        String.raw`$FA$ שווה למרחק $A$ מהמדריך $x=-4.5$: $FA=2+4.5=6.5$.`,
        String.raw`לכן $FA=FB$, והמשולש $ABF$ שווה שוקיים. זו תכונה כללית של משיק לפרבולה.`,
      ],
    },
  ],
};

const e7: Exercise = {
  id: 'par-7',
  level: 2,
  topicId: T,
  subtopicIds: [PAR, 'analytic-lines'],
  intro: String.raw`נתונים הפרבולה $y^2=8x$ (ראו שרטוט) והישר $y=x+k$, כאשר $k$ פרמטר.`,
  diagram: { kind: 'plot', xRange: [-3, 8], functions: branches(8, 8) },
  sections: [
    {
      label: 'א',
      prompt: String.raw`עבור $k=1$: מהו המצב ההדדי של הישר והפרבולה?`,
      hints: [String.raw`הציבו $y=x+1$ במשוואת הפרבולה וקבלו משוואה ריבועית ב-$x$.`, String.raw`מספר הפתרונות נקבע לפי סימן הדיסקרימיננטה $\Delta=b^2-4ac$.`],
      check: { kind: 'choice', options: ['הישר חותך את הפרבולה בשתי נקודות', 'הישר משיק לפרבולה', 'לישר ולפרבולה אין נקודות משותפות'], correct: 0 },
      short: String.raw`$(x+1)^2=8x\ \Rightarrow\ x^2-6x+1=0$, $\Delta=32>0$: שתי נקודות חיתוך.`,
      full: [
        String.raw`מציבים $y=x+1$ ב-$y^2=8x$: $(x+1)^2=8x$.`,
        String.raw`$x^2+2x+1-8x=0\ \Rightarrow\ x^2-6x+1=0$.`,
        String.raw`$\Delta=(-6)^2-4\cdot 1\cdot 1=32>0$, ולכן יש שני פתרונות שונים: הישר חותך את הפרבולה בשתי נקודות.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את ערך $k$ שעבורו הישר משיק לפרבולה.`,
      hints: [String.raw`הציבו $y=x+k$ בפרבולה. ישר כזה משיק לפרבולה כאשר למשוואה הריבועית פתרון יחיד.`, String.raw`$x^2+(2k-8)x+k^2=0$; דרשו $\Delta=0$.`],
      check: { kind: 'numeric', answer: 2, verify: 'root("(2*x-8)^2-4*x^2", 0, 5)' },
      short: String.raw`$\Delta=(2k-8)^2-4k^2=64-32k=0$, ולכן $k=2$.`,
      full: [
        String.raw`$(x+k)^2=8x\ \Rightarrow\ x^2+(2k-8)x+k^2=0$.`,
        String.raw`$\Delta=(2k-8)^2-4k^2=4k^2-32k+64-4k^2=64-32k$.`,
        String.raw`השקה: $\Delta=0\ \Rightarrow\ k=2$. המשיק הוא $y=x+2$.`,
        String.raw`בדיקה: עבור $k=2$ מתקבל $x^2-4x+4=0$, כלומר $x=2$, $y=4$. המשיק בנקודה $(2,4)$ לפי הנוסחה: $4y=4(x+2)$, כלומר $y=x+2$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`עבור אילו ערכי $k$ אין לישר ולפרבולה נקודות משותפות?`,
      hints: [String.raw`אין נקודות משותפות כאשר למשוואה הריבועית אין פתרונות.`, String.raw`דרשו $\Delta=64-32k<0$.`],
      check: { kind: 'choice', options: [String.raw`$k<2$`, String.raw`$k>2$`, String.raw`$k>-2$`, String.raw`$k<-2$`], correct: 1 },
      short: String.raw`$64-32k<0\iff k>2$.`,
      full: [String.raw`אין נקודות משותפות כאשר $\Delta<0$.`, String.raw`$64-32k<0\ \Rightarrow\ 32k>64\ \Rightarrow\ k>2$.`, String.raw`סיכום: $k<2$ – שתי נקודות חיתוך; $k=2$ – השקה; $k>2$ – אין נקודות משותפות.`],
    },
  ],
};

const e8: Exercise = {
  id: 'par-8',
  level: 2,
  topicId: T,
  subtopicIds: [PAR, 'analytic-loci', 'analytic-distance-division'],
  intro: String.raw`הנקודה $A$ נעה על הפרבולה $y^2=40x$. $O$ ראשית הצירים, ו-$M$ אמצע הקטע $OA$ (בשרטוט מוצג מצב אחד של $A$).`,
  diagram: { kind: 'plot', xRange: [-3, 12], functions: [...branches(40, 12), { expr: '2*x', domain: [0, 10], dashed: true }], points: [{ x: 0, y: 0, label: 'O' }, { x: 10, y: 20, label: 'A' }, { x: 5, y: 10, label: 'M' }] },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מהו המקום הגאומטרי של הנקודות $M$?`,
      hints: [String.raw`סמנו $M(x,y)$ והביעו את שיעורי $A$ באמצעות $x$ ו-$y$ (נוסחת אמצע קטע).`, String.raw`$A(2x,2y)$ נמצאת על הפרבולה: הציבו את שיעוריה ב-$y^2=40x$.`],
      check: { kind: 'choice', options: [String.raw`$y^2=80x$`, String.raw`$y^2=10x$`, String.raw`$y^2=20x$`, String.raw`$y^2=40x$`], correct: 2 },
      short: String.raw`$A(2x,2y)$ על הפרבולה: $(2y)^2=40\cdot 2x$, ולכן $y^2=20x$.`,
      full: [
        String.raw`נסמן $M(x,y)$. $M$ אמצע $OA$ ו-$O(0,0)$, ולכן $x=\dfrac{x_A}{2}$, $y=\dfrac{y_A}{2}$, כלומר $A(2x,2y)$.`,
        String.raw`$A$ על הפרבולה $y^2=40x$: $(2y)^2=40\cdot 2x$.`,
        String.raw`$4y^2=80x\ \Rightarrow\ y^2=20x$.`,
        String.raw`המקום הגאומטרי הוא הפרבולה $y^2=20x$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את שיעור ה-$x$ של מוקד המקום הגאומטרי.`,
      hints: [String.raw`המקום הגאומטרי הוא פרבולה מהצורה $y^2=2px$. מהו $p$ שלה?`, String.raw`$2p=20$, והמוקד הוא $\left(\dfrac p2,0\right)$.`],
      check: { kind: 'numeric', answer: 5, verify: '(40/2)/4' },
      short: String.raw`$2p=20\ \Rightarrow\ p=10$, והמוקד הוא $(5,0)$.`,
      full: [String.raw`$y^2=20x$ היא פרבולה $y^2=2px$ עם $2p=20$, כלומר $p=10$.`, String.raw`המוקד: $\left(\dfrac p2,0\right)=(5,0)$.`, String.raw`(מוקד הפרבולה המקורית הוא $(10,0)$, והמוקד החדש הוא אמצע הקטע שבינו לבין $O$.)`],
    },
    {
      label: 'ג',
      prompt: String.raw`מיתר של המקום הגאומטרי עובר דרך המוקד שלו ומאונך לציר ה-$x$. חשבו את אורך המיתר.`,
      hints: [String.raw`המיתר נמצא על הישר $x=5$. מצאו את נקודות החיתוך של ישר זה עם $y^2=20x$.`, String.raw`$y^2=100$, כלומר $y=\pm 10$.`],
      check: { kind: 'numeric', answer: 20, verify: '2*sqrt((40/2)*((40/2)/4))' },
      short: String.raw`$x=5$: $y^2=100$, $y=\pm10$, ואורך המיתר $20$ (שווה ל-$2p$).`,
      full: [String.raw`המיתר מאונך לציר ה-$x$ ועובר דרך $(5,0)$, ולכן הוא על הישר $x=5$.`, String.raw`מציבים: $y^2=20\cdot 5=100$, כלומר $y=\pm 10$.`, String.raw`קצות המיתר: $(5,10)$ ו-$(5,-10)$, ואורכו $20$. באופן כללי אורך מיתר כזה הוא $2p$.`],
    },
  ],
};

const d9sol: DiagramSpec = {
  kind: 'plot',
  xRange: [-12, 12],
  functions: [...branches(36, 12), { expr: '1.5*x+6', domain: [-11, 9], dashed: true }],
  asymptotes: [{ x: -9 }],
  points: [{ x: 9, y: 0, label: 'F' }, { x: 4, y: 12, label: 'A' }, { x: -9, y: -7.5, label: 'C' }],
};

const e9: Exercise = {
  id: 'par-9',
  level: 3,
  topicId: T,
  subtopicIds: [PAR, 'analytic-lines', 'analytic-distance-division'],
  intro: String.raw`נתונה הפרבולה $y^2=2px$ ($p>0$) שמוקדה $F$. הנקודה $A$ נמצאת על הפרבולה ברביע הראשון: שיעור ה-$x$ שלה הוא $4$, ומרחקה מהמוקד הוא $13$ (ראו שרטוט). המשיק לפרבולה בנקודה $A$ חותך את מדריך הפרבולה בנקודה $C$.`,
  diagram: { kind: 'plot', xRange: [-12, 12], functions: branches(36, 12), points: [{ x: 4, y: 12, label: 'A' }] },
  solutionDiagram: d9sol,
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את $p$.`,
      hints: [String.raw`מרחק נקודה שעל הפרבולה מהמוקד שווה למרחקה מהמדריך $x=-\dfrac p2$.`, String.raw`$x_A+\dfrac p2=13$.`],
      check: { kind: 'numeric', answer: 18, verify: '2*(13-4)' },
      short: String.raw`$4+\dfrac p2=13$, ולכן $p=18$ (הפרבולה $y^2=36x$).`,
      full: [String.raw`מרחק $A$ מהמוקד שווה למרחקה מהמדריך $x=-\dfrac p2$, כלומר ל-$x_A+\dfrac p2$.`, String.raw`$4+\dfrac p2=13\ \Rightarrow\ \dfrac p2=9\ \Rightarrow\ p=18$.`, String.raw`הפרבולה: $y^2=36x$. המוקד $F(9,0)$, המדריך $x=-9$.`],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את משוואת המשיק לפרבולה בנקודה $A$. מהו שיפוע המשיק?`,
      hints: [String.raw`מצאו את שיעור ה-$y$ של $A$ מתוך משוואת הפרבולה (רביע ראשון).`, String.raw`$A(4,12)$. משוואת המשיק: $y\,y_0=p(x+x_0)$.`],
      check: { kind: 'numeric', answer: 1.5, verify: 'deriv("sqrt(2*2*(13-4)*x)", 4)' },
      short: String.raw`$A(4,12)$; המשיק: $12y=18(x+4)$, כלומר $y=1.5x+6$. השיפוע $1.5$.`,
      full: [String.raw`$y_A^2=36\cdot 4=144$, וברביע הראשון $y_A=12$: $A(4,12)$.`, String.raw`משוואת המשיק: $y\cdot 12=18(x+4)$.`, String.raw`$12y=18x+72\ \Rightarrow\ y=1.5x+6$. שיפוע המשיק הוא $1.5$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`מצאו את שיעור ה-$y$ של הנקודה $C$.`,
      hints: [String.raw`מהי משוואת המדריך של הפרבולה?`, String.raw`המדריך הוא $x=-9$. הציבו במשוואת המשיק $y=1.5x+6$.`],
      check: { kind: 'numeric', answer: -7.5, verify: '12+deriv("sqrt(36*x)", 4)*(-9-4)' },
      short: String.raw`$y_C=1.5\cdot(-9)+6=-7.5$, כלומר $C(-9,-7.5)$.`,
      full: [String.raw`המדריך: $x=-\dfrac p2=-9$.`, String.raw`מציבים $x=-9$ במשוואת המשיק: $y=1.5\cdot(-9)+6=-13.5+6=-7.5$.`, String.raw`$C(-9,-7.5)$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`הראו ש-$FA\perp FC$, וחשבו את שטח המשולש $AFC$.`,
      hints: [String.raw`חשבו את שיפועי הישרים $FA$ ו-$FC$, כאשר $F(9,0)$. מה מכפלתם?`, String.raw`במשולש ישר זווית השטח הוא חצי מכפלת הניצבים: $\dfrac12\cdot FA\cdot FC$.`, String.raw`$FA=13$ (נתון), ו-$FC=\sqrt{18^2+7.5^2}$.`],
      check: { kind: 'numeric', answer: 126.75, verify: '0.5*abs((4-9)*(-7.5-0)-(12-0)*(-9-9))' },
      short: String.raw`$m_{FA}\cdot m_{FC}=-\dfrac{12}{5}\cdot\dfrac{5}{12}=-1$, ולכן $FA\perp FC$; $S=\dfrac12\cdot 13\cdot 19.5=126.75$.`,
      full: [
        String.raw`$m_{FA}=\dfrac{12-0}{4-9}=-\dfrac{12}{5}$, $m_{FC}=\dfrac{-7.5-0}{-9-9}=\dfrac{7.5}{18}=\dfrac{5}{12}$.`,
        String.raw`$m_{FA}\cdot m_{FC}=-1$, ולכן $FA\perp FC$ והמשולש $AFC$ ישר זווית ב-$F$.`,
        String.raw`$FA=13$ (נתון). $FC=\sqrt{(-9-9)^2+(-7.5)^2}=\sqrt{324+56.25}=\sqrt{380.25}=19.5$.`,
        String.raw`$S_{AFC}=\dfrac12\cdot FA\cdot FC=\dfrac12\cdot 13\cdot 19.5=126.75$.`,
      ],
    },
  ],
};

const e10: Exercise = {
  id: 'par-10',
  level: 3,
  topicId: T,
  subtopicIds: [PAR, 'analytic-lines', 'analytic-circle', 'analytic-distance-division'],
  intro: String.raw`נתונה הפרבולה $y^2=4x$ שמוקדה $F$. ישר ששיפועו $2$ עובר דרך $F$ וחותך את הפרבולה בנקודות $A$ ו-$B$ (ראו שרטוט). $M$ אמצע המיתר $AB$.`,
  diagram: { kind: 'plot', xRange: [-2, 4], functions: [...branches(4, 4), { expr: '2*(x-1)', domain: [0.1, 3.1] }], points: [{ x: 1, y: 0, label: 'F' }, { x: 2.618, y: 3.236, label: 'A' }, { x: 0.382, y: -1.236, label: 'B' }] },
  solutionDiagram: {
    kind: 'geo',
    points: { A: [2.618, 3.236], B: [0.382, -1.236], M: [1.5, 1], F: [1, 0], T: [-1, 1], P: [-1, -2], Q: [-1, 4] },
    circles: [{ center: 'M', radius: 2.5 }],
    segments: [['A', 'B'], ['P', 'Q'], { from: 'M', to: 'T', dashed: true, label: '2.5' }],
    hideNames: ['P', 'Q', 'T'],
    dots: ['M', 'F', 'T'],
    labels: [{ at: 'Q', text: 'x = −1', dx: -26, dy: 6 }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את שיעור ה-$x$ של הנקודה $M$.`,
      hints: [String.raw`מצאו את המוקד $F$ ואת משוואת הישר (שיפוע $2$ דרך $F$), והציבו אותה במשוואת הפרבולה.`, String.raw`מתקבל $x^2-3x+1=0$. שיעור ה-$x$ של $M$ הוא ממוצע שני הפתרונות, וסכום הפתרונות הוא $-\dfrac ba$.`],
      check: { kind: 'numeric', answer: 1.5, verify: 'root("(2*(x-1))^2-4*x", 0, 1)/2+root("(2*(x-1))^2-4*x", 1, 4)/2' },
      short: String.raw`$F(1,0)$, הישר $y=2x-2$; $(2x-2)^2=4x\ \Rightarrow\ x^2-3x+1=0$, ולכן $x_M=\dfrac{x_A+x_B}{2}=\dfrac32$.`,
      full: [
        String.raw`$2p=4$, $p=2$, ולכן $F(1,0)$. הישר: $y=2(x-1)=2x-2$.`,
        String.raw`הצבה בפרבולה: $(2x-2)^2=4x\ \Rightarrow\ 4x^2-12x+4=0\ \Rightarrow\ x^2-3x+1=0$.`,
        String.raw`הפתרונות: $x_{A,B}=\dfrac{3\pm\sqrt5}{2}$, וסכומם $3$ (נוסחאות וייטה).`,
        String.raw`$x_M=\dfrac{x_A+x_B}{2}=\dfrac32$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`חשבו את אורך המיתר $AB$.`,
      hints: [String.raw`המיתר עובר דרך המוקד, ולכן $AB=AF+FB$.`, String.raw`מרחק נקודה שעל הפרבולה מהמוקד הוא $x_0+\dfrac p2=x_0+1$.`],
      check: { kind: 'numeric', answer: 5, verify: 'sqrt(1+2^2)*(root("(2*(x-1))^2-4*x", 1, 4)-root("(2*(x-1))^2-4*x", 0, 1))' },
      short: String.raw`$AB=(x_A+1)+(x_B+1)=3+2=5$.`,
      full: [
        String.raw`$F$ נמצאת על המיתר בין $A$ ל-$B$, ולכן $AB=AF+FB$.`,
        String.raw`מרחק נקודה שעל הפרבולה מהמוקד שווה למרחקה מהמדריך $x=-1$: $AF=x_A+1$, $BF=x_B+1$.`,
        String.raw`$AB=x_A+x_B+2=3+2=5$.`,
        String.raw`בדיקה בנוסחת מרחק: $x_A-x_B=\sqrt5$, $y_A-y_B=2\sqrt5$, ולכן $AB=\sqrt{5+20}=5$.`,
      ],
    },
    {
      label: 'ג',
      prompt: String.raw`מהי משוואת המעגל שקוטרו $AB$?`,
      hints: [String.raw`מרכז המעגל הוא אמצע הקוטר, כלומר $M$, ורדיוסו חצי מאורך $AB$.`, String.raw`$y_M=2\cdot 1.5-2=1$, $R=2.5$.`],
      check: { kind: 'choice', options: [String.raw`$(x-1.5)^2+(y-1)^2=25$`, String.raw`$(x-1.5)^2+(y-1)^2=6.25$`, String.raw`$(x-1)^2+y^2=6.25$`, String.raw`$(x-1.5)^2+(y+1)^2=6.25$`], correct: 1 },
      short: String.raw`מרכז $M(1.5,1)$, רדיוס $\dfrac{AB}{2}=2.5$: $(x-1.5)^2+(y-1)^2=6.25$.`,
      full: [String.raw`$M$ על הישר $y=2x-2$: $y_M=2\cdot 1.5-2=1$, כלומר $M(1.5,1)$.`, String.raw`$R=\dfrac{AB}{2}=2.5$, $R^2=6.25$.`, String.raw`משוואת המעגל: $(x-1.5)^2+(y-1)^2=6.25$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`מהו המצב ההדדי של המעגל ושל מדריך הפרבולה?`,
      hints: [String.raw`השוו את מרחק מרכז המעגל מהמדריך לרדיוס המעגל.`, String.raw`המדריך הוא $x=-1$, ומרחק $M(1.5,1)$ ממנו הוא $1.5+1$.`],
      check: { kind: 'choice', options: ['המדריך משיק למעגל', 'המדריך חותך את המעגל בשתי נקודות', 'למדריך ולמעגל אין נקודות משותפות'], correct: 0 },
      short: String.raw`מרחק $M$ מהמדריך $x=-1$ הוא $2.5=R$, ולכן המדריך משיק למעגל.`,
      full: [
        String.raw`המדריך: $x=-\dfrac p2=-1$.`,
        String.raw`מרחק המרכז $M(1.5,1)$ מהישר $x=-1$: $1.5-(-1)=2.5$.`,
        String.raw`המרחק שווה לרדיוס, ולכן המדריך משיק למעגל (בנקודה $(-1,1)$).`,
        String.raw`הסבר כללי: $R=\dfrac{AB}{2}=\dfrac{(x_A+1)+(x_B+1)}{2}=x_M+1$, וזה בדיוק מרחק $M$ מהמדריך.`,
      ],
    },
  ],
};

const e11: Exercise = {
  id: 'par-11',
  level: 3,
  topicId: T,
  subtopicIds: [PAR, 'analytic-lines'],
  intro: String.raw`הישר $y=2x+3$ משיק לפרבולה $y^2=2px$ ($p>0$) בנקודה $T$ (ראו שרטוט).`,
  diagram: { kind: 'plot', xRange: [-8, 26], functions: [...branches(24, 26), { expr: '2*x+3', domain: [-7, 10] }] },
  solutionDiagram: {
    kind: 'plot',
    xRange: [-10, 28],
    functions: [...branches(24, 28), { expr: '2*x+3', domain: [-9, 10] }, { expr: '-0.5*x-12', domain: [-10, 28] }],
    asymptotes: [{ x: -6 }],
    points: [{ x: 1.5, y: 6, label: 'T' }, { x: 24, y: -24 }, { x: -6, y: -9 }],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מצאו את $p$.`,
      hints: [String.raw`הציבו $y=2x+3$ במשוואת הפרבולה. לישר המשיק יש נקודה משותפת אחת עם הפרבולה.`, String.raw`$4x^2+(12-2p)x+9=0$; דרשו $\Delta=0$ וזכרו ש-$p>0$.`],
      check: { kind: 'numeric', answer: 12, verify: 'root("(2*2*3-2*x)^2-4*2^2*3^2", 1, 30)' },
      short: String.raw`$\Delta=(12-2p)^2-144=0\ \Rightarrow\ p=12$ (הפתרון $p=0$ נפסל). הפרבולה: $y^2=24x$.`,
      full: [
        String.raw`$(2x+3)^2=2px\ \Rightarrow\ 4x^2+12x+9-2px=0\ \Rightarrow\ 4x^2+(12-2p)x+9=0$.`,
        String.raw`השקה: $\Delta=(12-2p)^2-4\cdot 4\cdot 9=0$, כלומר $(12-2p)^2=144$.`,
        String.raw`$12-2p=12$ נותן $p=0$ (נפסל), ו-$12-2p=-12$ נותן $p=12$.`,
        String.raw`הפרבולה: $y^2=24x$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מצאו את שיעור ה-$x$ של נקודת ההשקה $T$.`,
      hints: [String.raw`הציבו את $p$ שמצאתם במשוואה הריבועית מסעיף א ופתרו אותה.`, String.raw`$4x^2-12x+9=(2x-3)^2=0$.`],
      check: { kind: 'numeric', answer: 1.5, verify: '(12/2)^2/(2*12)' },
      short: String.raw`$4x^2-12x+9=0\ \Rightarrow\ (2x-3)^2=0$, ולכן $x_T=1.5$ (ו-$y_T=6$).`,
      full: [String.raw`עבור $p=12$: $4x^2-12x+9=0$.`, String.raw`$(2x-3)^2=0\ \Rightarrow\ x=1.5$.`, String.raw`$y=2\cdot 1.5+3=6$, כלומר $T(1.5,6)$. בדיקה: $6^2=36=24\cdot 1.5$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`ישר נוסף, $y=-\dfrac12x+n$, משיק גם הוא לפרבולה. מצאו את $n$.`,
      hints: [String.raw`הציבו $y=-\dfrac12x+n$ בפרבולה $y^2=24x$ ודרשו $\Delta=0$.`, String.raw`אחרי כפל ב-$4$ מתקבל $x^2-4(n+24)x+4n^2=0$.`],
      check: { kind: 'numeric', answer: -12, verify: 'root("(x+24)^2-x^2", -30, 0)' },
      short: String.raw`$\Delta=16(n+24)^2-16n^2=0\ \Rightarrow\ 48n+576=0\ \Rightarrow\ n=-12$.`,
      full: [
        String.raw`$\left(-\dfrac12x+n\right)^2=24x\ \Rightarrow\ \dfrac14x^2-nx+n^2-24x=0$.`,
        String.raw`כופלים ב-$4$: $x^2-4(n+24)x+4n^2=0$.`,
        String.raw`$\Delta=16(n+24)^2-16n^2=0\ \Rightarrow\ (n+24)^2=n^2\ \Rightarrow\ 48n+576=0$.`,
        String.raw`$n=-12$. המשיק: $y=-\dfrac12x-12$ (נקודת ההשקה שלו $(24,-24)$).`,
      ],
    },
    {
      label: 'ד',
      prompt: String.raw`מצאו את שיעור ה-$x$ של נקודת החיתוך של שני המשיקים, והראו שהנקודה נמצאת על מדריך הפרבולה.`,
      hints: [String.raw`השוו בין שתי משוואות המשיקים.`, String.raw`$2x+3=-\dfrac12x-12$. השוו את התוצאה למשוואת המדריך $x=-\dfrac p2$.`],
      check: { kind: 'numeric', answer: -6, verify: '(-12-3)/(2+1/2)' },
      short: String.raw`$2x+3=-\dfrac12x-12\ \Rightarrow\ x=-6$, וזו משוואת המדריך $x=-\dfrac p2=-6$.`,
      full: [
        String.raw`$2x+3=-\dfrac12x-12\ \Rightarrow\ 2.5x=-15\ \Rightarrow\ x=-6$ (ו-$y=-9$).`,
        String.raw`המדריך של $y^2=24x$ הוא $x=-\dfrac{12}{2}=-6$, ולכן נקודת החיתוך $(-6,-9)$ נמצאת עליו.`,
        String.raw`שימו לב: מכפלת השיפועים $2\cdot\left(-\dfrac12\right)=-1$, כלומר שני המשיקים מאונכים זה לזה.`,
      ],
    },
  ],
};

const e12: Exercise = {
  id: 'par-12',
  level: 3,
  topicId: T,
  subtopicIds: [PAR, 'analytic-loci', 'analytic-circle', 'analytic-lines'],
  intro: String.raw`נתונים הנקודה $F(3,0)$ והישר $x=-3$. מתבוננים בכל המעגלים שעוברים דרך $F$ ומשיקים לישר $x=-3$ (בשרטוט מוצג אחד מהם; $M$ מרכזו).`,
  diagram: {
    kind: 'geo',
    points: { F: [3, 0], M: [0.75, 3], K: [-3, 3], P: [-3, -2], Q: [-3, 8] },
    circles: [{ center: 'M', radius: 3.75 }],
    segments: [['P', 'Q'], { from: 'M', to: 'F', dashed: true }, { from: 'M', to: 'K', dashed: true }],
    hideNames: ['P', 'Q', 'K'],
    dots: ['F', 'M', 'K'],
    labels: [{ at: 'Q', text: 'x = −3', dx: 30, dy: 4 }],
  },
  solutionDiagram: {
    kind: 'geo',
    points: { M: [12, 12], F: [3, 0], D: [-3, 12], G: [21, 0], E: [0, 6], U: [-3, -4], V: [-3, 28], S: [-8, 2], W: [20, 16] },
    circles: [{ center: 'M', radius: 15 }],
    segments: [['U', 'V'], { from: 'S', to: 'W', accent: true }, { from: 'F', to: 'D', dashed: true }, ['M', 'F'], ['M', 'D'], ['F', 'G']],
    hideNames: ['U', 'V', 'S', 'W'],
    dots: ['M', 'F', 'D', 'G', 'E'],
  },
  sections: [
    {
      label: 'א',
      prompt: String.raw`מהו המקום הגאומטרי של מרכזי המעגלים?`,
      hints: [String.raw`מרכז מעגל נמצא במרחק רדיוס מכל נקודה שעל המעגל, וגם במרחק רדיוס מישר שמשיק למעגל.`, String.raw`לכן מרחק המרכז מ-$F$ שווה למרחקו מהישר $x=-3$: זו הגדרת הפרבולה שמוקדה $F$ ומדריכה $x=-3$.`],
      check: { kind: 'choice', options: [String.raw`$x^2+y^2=9$`, String.raw`$y^2=6x$`, String.raw`$y^2=3x$`, String.raw`$y^2=12x$`], correct: 3 },
      short: String.raw`$MF=R=$ מרחק $M$ מהישר $x=-3$: פרבולה עם $\dfrac p2=3$, כלומר $y^2=12x$.`,
      full: [
        String.raw`נסמן את המרכז $M(x,y)$. המעגל עובר דרך $F$, ולכן $MF=R$. המעגל משיק לישר $x=-3$, ולכן מרחק $M$ מהישר שווה ל-$R$.`,
        String.raw`$\sqrt{(x-3)^2+y^2}=|x+3|$.`,
        String.raw`מעלים בריבוע: $x^2-6x+9+y^2=x^2+6x+9\ \Rightarrow\ y^2=12x$.`,
        String.raw`המקום הגאומטרי הוא הפרבולה $y^2=12x$ ($p=6$), שמוקדה $F(3,0)$ ומדריכה $x=-3$.`,
      ],
    },
    {
      label: 'ב',
      prompt: String.raw`מרכזו $M$ של אחד המעגלים נמצא ברביע הראשון, ושיעור ה-$x$ שלו הוא $12$. מצאו את רדיוס המעגל.`,
      hints: [String.raw`הרדיוס שווה למרחק המרכז מהישר המשיק $x=-3$.`, String.raw`$R=x_M+3$.`],
      check: { kind: 'numeric', answer: 15, verify: 'sqrt((12-3)^2+12*12)' },
      short: String.raw`$R=x_M+3=12+3=15$.`,
      full: [String.raw`המרכז על הפרבולה $y^2=12x$: $y^2=144$, וברביע הראשון $M(12,12)$.`, String.raw`הרדיוס שווה למרחק $M$ מהישר $x=-3$: $R=12+3=15$.`, String.raw`בדיקה: $MF=\sqrt{(12-3)^2+12^2}=\sqrt{81+144}=15$.`],
    },
    {
      label: 'ג',
      prompt: String.raw`המעגל מסעיף ב חותך את ציר ה-$x$ בנקודה $F$ ובנקודה נוספת $G$. מצאו את שיעור ה-$x$ של $G$.`,
      hints: [String.raw`כתבו את משוואת המעגל (מרכז $(12,12)$, רדיוס $15$) והציבו $y=0$.`, String.raw`$(x-12)^2+144=225$.`],
      check: { kind: 'numeric', answer: 21, verify: '12+sqrt((12+3)^2-12*12)' },
      short: String.raw`$(x-12)^2=81\ \Rightarrow\ x=3$ או $x=21$, ולכן $G(21,0)$.`,
      full: [String.raw`משוואת המעגל: $(x-12)^2+(y-12)^2=225$.`, String.raw`מציבים $y=0$: $(x-12)^2=225-144=81$, כלומר $x-12=\pm 9$.`, String.raw`$x=3$ היא הנקודה $F$, ו-$x=21$ היא הנקודה $G(21,0)$.`],
    },
    {
      label: 'ד',
      prompt: String.raw`המעגל מסעיף ב משיק לישר $x=-3$ בנקודה $D$. הוכיחו שהמשיק לפרבולה (המקום הגאומטרי מסעיף א) בנקודה $M$ הוא האנך האמצעי לקטע $FD$.`,
      hints: [String.raw`מצאו את $D$ (היא נמצאת על הישר $x=-3$, באותו גובה כמו המרכז) ואת משוואת המשיק לפרבולה בנקודה $M$.`, String.raw`אנך אמצעי לקטע עובר דרך אמצע הקטע ומאונך לו. בדקו את שני התנאים.`],
      check: { kind: 'self' },
      short: String.raw`המשיק ב-$M(12,12)$ הוא $y=\dfrac12x+6$; הוא עובר דרך אמצע $FD$, $(0,6)$, ומאונך ל-$FD$ ששיפועו $-2$.`,
      full: [
        String.raw`הרדיוס לנקודת ההשקה מאונך לישר $x=-3$, ולכן $D(-3,12)$.`,
        String.raw`המשיק לפרבולה $y^2=12x$ ($p=6$) בנקודה $M(12,12)$: $12y=6(x+12)$, כלומר $y=\dfrac12x+6$.`,
        String.raw`אמצע הקטע $FD$: $\left(\dfrac{3+(-3)}{2},\dfrac{0+12}{2}\right)=(0,6)$. הצבה במשיק: $\dfrac12\cdot 0+6=6$ – הנקודה על המשיק.`,
        String.raw`שיפוע $FD$: $\dfrac{12-0}{-3-3}=-2$. מכפלת השיפועים: $-2\cdot\dfrac12=-1$, ולכן המשיק מאונך ל-$FD$.`,
        String.raw`המשיק עובר דרך אמצע $FD$ ומאונך לו, ולכן הוא האנך האמצעי לקטע $FD$.`,
      ],
    },
  ],
};

export const ag582Parabola: ExerciseSet = {
  id: 'ag582-parabola',
  questionnaire: '35582',
  title: 'פרבולה',
  topicIds: ['analytic-geometry'],
  exercises: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12],
};
