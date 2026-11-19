import type { Session } from "./model";

/*
 * Repair status of one mistake, derived only from saved answers:
 *   acik     – no independent correct answer to this question after it
 *   onarildi – a later study set answered it correctly without help
 *   kalici   – such an answer came at least three calendar days after the
 *              mistake (the day-3 spacing of the review policy)
 * Closed-book retries on the Mistakes page and tags are notes, not evidence,
 * so they never change the status.
 */
export type MistakeStatus = "acik" | "onarildi" | "kalici";

const DAY = 86400000;
const dayOf = (date: string) => Date.parse(`${date}T00:00:00Z`);

export function mistakeStatus(sessions: readonly Session[], mistake: Session, questionId: string): MistakeStatus {
  let status: MistakeStatus = "acik";
  for (const s of sessions) {
    if (s.finishedAt <= mistake.finishedAt) continue;
    const solved = s.responses.some((r) => r.questionId === questionId && r.correct && !r.assisted);
    if (!solved) continue;
    if (dayOf(s.date) - dayOf(mistake.date) >= 3 * DAY) return "kalici";
    status = "onarildi";
  }
  return status;
}

export const STATUS_LABEL: Record<MistakeStatus, string> = {
  acik: "Açık",
  onarildi: "Onarıldı",
  kalici: "Kalıcı onarım",
};

export type RankedMistake = {
  status: MistakeStatus;
  confident: boolean; // answered with "Eminim" and was wrong
  assistedOnly: boolean; // correct only with help
  stars: number;
  finishedAt: string;
};

/**
 * Open mistakes first; among them confident-wrong answers (the most dangerous
 * misconceptions), then wrong before help-only, then lower stars first (the
 * quickest nets), newest first on ties. Repaired ones follow, permanent last.
 */
export function compareMistakes(a: RankedMistake, b: RankedMistake) {
  const order: Record<MistakeStatus, number> = { acik: 0, onarildi: 1, kalici: 2 };
  return (
    order[a.status] - order[b.status] ||
    Number(b.confident) - Number(a.confident) ||
    Number(a.assistedOnly) - Number(b.assistedOnly) ||
    (a.stars || 11) - (b.stars || 11) ||
    (a.finishedAt < b.finishedAt ? 1 : a.finishedAt > b.finishedAt ? -1 : 0)
  );
}
