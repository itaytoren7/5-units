# Exercise sets with explanations and read-aloud

## Goal
Add a "סטים לתרגול" section to the existing bagrut site (questionnaires 35581/35582).

What it does:
- Graded exercise sets that climb from easy to bagrut level.
- Progressive hints.
- Answer checking after every section.
- A short explanation with a "הרחב" button for the full solution steps.
- A diagram for every exercise.
- Hebrew read-aloud.

This file is the spec. Later requests may come in a fresh chat with a short command (see Stage C). Rely on this file and the code, not on chat history.

## Token rules (follow strictly)
- **Read narrowly.** Read only what you need: syllabus types and ids, routing, storage helpers, and any existing practice or mistakes code. Don't open data files you won't change. Never re-read a file you just wrote.
- **Keep chat short.** Never paste file contents or generated exercises into chat. Replies are in Hebrew, at most 8 lines: files changed and the test result.
- **Build once, then only add data.** Build the shared machinery a single time: schema, renderer, checker, TTS and one generic test. After that, a new set is exactly one new data file plus one test run. No per-set components, tests or hand-written SVG.
- **One set per run** unless I ask for more.
- **Don't wander into other fixes.** Fix only bugs in files you touch. Note any other bug you see as one line in `BUGS.md` instead of fixing it now.

## Don't break anything
- **Existing code stays as it is.** Don't change existing data files, routes, `localStorage` keys, the shape of stored data, or existing tests.
- **Keep new things separate.** New features go in new files. Anything they store uses its own key, `bagrut:v1:sets`. Touching an existing file (a nav link, a route) must be minimal.
- **Use a branch.** Work on branch `exercise-sets` and commit after each stage and each set.
- **No redesign now.** A separate design pass comes later. Build with the existing shared components and styles, so that pass restyles these pages too.

## Content rules
- **Stay inside the exam.** Every exercise links to a `topicId` and `subtopicIds` from the existing syllabus data. Use only subtopics with status `in`; check this in the data. The מיקוד removed many items (for example arithmetic sequences, work-rate problems, most extremum problems, and exp/log in bases other than e), so never write exercises on `out-*` subtopics.
- **Original only.** Don't copy from past exams or books.
- **12 exercises per set, graded:**
  - 1–4: basic, one step.
  - 5–8: two or three sections.
  - 9–12: full bagrut-style multi-section questions.
- **Language.** Hebrew, with correct bagrut terminology. Math in KaTeX (`$…$`).
- **Accuracy before speed.** Every numeric answer must pass the verification test. If a check fails, fix the exercise, never the test.

## Data: `src/data/sets/`
One file per set (`<setId>.ts`), registered in `index.ts`. Also keep `catalog.ts`, the planned list of sets (id, title, questionnaire, topic, status `planned`/`done`), so "the next set" is cheap to find.

```ts
type Check =
  | { kind: "numeric"; answer: number; tol?: number; verify: string } // user may type 3/4, sqrt(2), pi/6; verify = independent mathjs recomputation from the givens
  | { kind: "choice"; options: string[]; correct: number }
  | { kind: "self" }; // proofs, sketches, open answers: reveal, then self-mark

interface Section {
  label: string;      // "א", "ב", ...
  prompt: string;     // Markdown + KaTeX
  hints: string[];    // 1–3, from gentle to strong
  check: Check;
  short: string;      // one line: key idea + final answer
  full: string[];     // numbered steps, shown on "הרחב"
}
interface Exercise {
  id: string; level: 1 | 2 | 3; topicId: string; subtopicIds: string[];
  intro: string; diagram: DiagramSpec; solutionDiagram?: DiagramSpec; sections: Section[];
}
interface ExerciseSet {
  id: string; questionnaire: "35581" | "35582"; title: string; topicIds: string[]; exercises: Exercise[];
}
```

**Diagrams are declarative.** Each one is a `DiagramSpec` rendered by a single `<Diagram>` component. The kinds:
- `geo`: points, segments, polygons, circles, angle marks, right-angle marks, labels.
- `plot`: functions, shaded areas (under a curve or between curves), marked points, asymptotes.
- `unitCircle`: angles with their sin/cos projections.
- `tree`: a probability tree.
- `solid`: a box, prism or pyramid in oblique projection, with labeled vertices and highlighted segments and angles.
- `complex`: points and vectors in the Gauss plane.
- `seq`: sequence terms as dots or bars.
- `motion`: route line, movers, speeds.

The question-view diagram must not reveal the answer. `solutionDiagram` can add elements next to the explanation.

## Set player
- **Sets page.** Sets grouped by questionnaire and topic, with progress per set.
- **One exercise at a time.** A progress bar from 1 to 12, and the sections of each exercise in order.
- **Per section:**
  - An input that matches the check kind, then "בדוק" for a right/wrong verdict.
  - "רמז" reveals one hint at a time.
  - After checking, or on "הצג פתרון", show `short`, with "הרחב" for `full`.
  - `solutionDiagram`, if there is one.
- **Numeric answers.** Parse with mathjs. Default tolerance is relative 1e-3.
- **Wrong answers.** A wrong answer (or self-marking "טעיתי") adds the section to the mistakes log and the spaced-review queue. Use the existing modules if they exist. Otherwise create minimal ones in their own files with their own key.
- **End of set.** Show the score per exercise, plus "תרגל שוב את מה שטעיתי".
- **Saving.** Progress lives in `bagrut:v1:sets`. Add it to Export/Import as an optional field, so old backups still import.

## Read-aloud (Web Speech API: free, no server)
- **Buttons:** "הקרא שאלה" and "הקרא הסבר ותשובה", with play/pause/stop. Speed options are 0.75 / 1 / 1.25 / 1.5, and the choice is remembered.
- **Voice.** Use `lang = "he-IL"` and prefer a Hebrew voice (on macOS, e.g. Carmit). If no Hebrew voice exists, show a one-line note on installing one in the system settings.
- **What it reads.** Derive the spoken text at runtime from the same Markdown. Strip LaTeX and skip formulas entirely: no spoken math and no extra data fields.
- **Highlighting.** Speak one sentence at a time and highlight the current sentence on screen.

## Verification: one generic test
`src/data/sets/sets.test.ts` loops over every set and checks:
- **Ids and syllabus links.** Ids are unique. Every `topicId` and `subtopicId` exists in the syllabus, and every subtopic has status `in`.
- **Set structure.** Each set has 12 exercises, and levels never go down.
- **Numeric answers.** `evaluate(verify)` ≈ `answer` for every numeric check. Provide helpers in scope:
  - `integrate(expr, a, b)` (Simpson's rule).
  - `deriv` (mathjs `derivative`).
  - `root(expr, a, b)` (bisection).
  - `nCr`.
- **Other checks.** For a choice check, `correct` is in range. Every section has at least one hint, a `short`, and at least one `full` step.

`verify` must recompute the answer from the givens, never restate the number.

## Stages
- **A. Engine and a pilot set.**
  - Build the schema, `<Diagram>` with all kinds, the player, the checker, read-aloud, storage, the generic test, and a route plus nav link.
  - Add one pilot set: "טריגונומטריה במשולש ישר זווית" (35581).
  - Stop for my review.
- **B. Catalogue.** Fill `catalog.ts` with the full planned list (titles, topic and one line each, no content), covering:
  - Trigonometry.
  - Calculus (investigation and areas).
  - Probability, sequences and word problems.
  - The 582 topics: vectors, complex numbers, analytic geometry, exp/log.

  Order it so each topic goes from basic to bagrut level. Wait for my approval.
- **C. Sets.** Generate exactly one set when I say "סט הבא" (the next `planned` entry in the catalogue) or "סט: <title>". Mark it `done` in `catalog.ts`.

After every stage or set: run `npm test` and `npm run build`, commit, and reply briefly.

Start with Stage A.
