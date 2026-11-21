import type { Session } from "./model";
import type { ExamSession } from "./examModel";

/*
 * "İkiz soru" for the second repair stage: another question from the same
 * lesson set that the learner had not yet answered correctly on their own
 * when the mistake was made. The choice is a pure function of the lesson's
 * question order and the records saved up to that mistake, so the same
 * mistake always gets the same twin, and solving the twin later never moves
 * it to a different question.
 *
 * Order: questions with the same sub-skill first (when the mistake's skill is
 * set), then the rest; within each group, the questions after the mistaken
 * one in lesson order, wrapping around to the start.
 */
export type TwinCandidate = { id: string; skill?: string };

export function pickTwin(
  questions: readonly TwinCandidate[],
  questionId: string,
  solvedBefore: ReadonlySet<string>,
): string | undefined {
  const at = questions.findIndex((q) => q.id === questionId);
  if (at < 0) return undefined;
  const skill = questions[at].skill?.trim();
  const rotated = [...questions.slice(at + 1), ...questions.slice(0, at)].filter(
    (q) => q.id !== questionId && !solvedBefore.has(q.id),
  );
  const same = skill ? rotated.filter((q) => q.skill?.trim() === skill) : [];
  return (same[0] ?? rotated[0])?.id;
}

type ExamRecord = Pick<ExamSession, "items" | "answers" | "helpLevels" | "finishedAt">;

/**
 * Question ids answered correctly without help in a study set or finished
 * exam saved at or before `finishedAt` (the mistake's own set included).
 */
export function solvedIndependentlyBy(
  sessions: readonly Session[],
  exams: readonly ExamRecord[],
  finishedAt: string,
): Set<string> {
  const solved = new Set<string>();
  for (const s of sessions) {
    if (s.finishedAt > finishedAt) continue;
    for (const r of s.responses) if (r.correct && !r.assisted) solved.add(r.questionId);
  }
  const limit = Date.parse(finishedAt);
  for (const e of exams) {
    if (!(e.finishedAt <= limit)) continue;
    e.items.forEach((item, i) => {
      if (e.answers[i] === item.answer && (e.helpLevels?.[i] ?? 0) === 0) solved.add(item.id);
    });
  }
  return solved;
}

/** The twin for one saved mistake, or undefined when the set has none left. */
export function twinForMistake(
  questions: readonly TwinCandidate[],
  sessions: readonly Session[],
  exams: readonly ExamRecord[],
  mistake: Pick<Session, "finishedAt">,
  questionId: string,
): string | undefined {
  return pickTwin(questions, questionId, solvedIndependentlyBy(sessions, exams, mistake.finishedAt));
}
