import type { Session } from "./model";
import type { ExamSession } from "./examModel";

/*
 * Repair status of one mistake, derived only from saved answers:
 *   acik     – no independent correct answer to this question after it
 *   onarildi – a later study set answered it correctly without help
 *   kalici   – such an answer came at least three calendar days after the
 *              mistake (the day-3 spacing of the review policy)
 * A finished exam counts too, but only for items answered correctly with no
 * help panel opened on that item (helpLevels[i] === 0).
 * Closed-book retries on the Mistakes page and tags are notes, not evidence,
 * so they never change the status.
 */
export type MistakeStatus = "acik" | "onarildi" | "kalici";

const DAY = 86400000;
const dayOf = (date: string) => Date.parse(`${date}T00:00:00Z`);

// Local calendar day, matching how study sessions store their date.
const isoDay = (ms: number) => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function mistakeStatus(
  sessions: readonly Session[],
  mistake: Session,
  questionId: string,
  exams: readonly Pick<ExamSession, "items" | "answers" | "helpLevels" | "finishedAt">[] = [],
): MistakeStatus {
  const later: string[] = [];
  for (const s of sessions) {
    if (s.finishedAt <= mistake.finishedAt) continue;
    if (s.responses.some((r) => r.questionId === questionId && r.correct && !r.assisted)) later.push(s.date);
  }
  const after = Date.parse(mistake.finishedAt);
  for (const e of exams) {
    if (!(e.finishedAt > after)) continue;
    const i = e.items.findIndex((q) => q.id === questionId);
    if (i >= 0 && e.answers[i] === e.items[i].answer && (e.helpLevels?.[i] ?? 0) === 0) later.push(isoDay(e.finishedAt));
  }
  if (!later.length) return "acik";
  return later.some((d) => dayOf(d) - dayOf(mistake.date) >= 3 * DAY) ? "kalici" : "onarildi";
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
