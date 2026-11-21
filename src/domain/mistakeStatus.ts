import type { Session } from "./model";
import type { ExamSession } from "./examModel";

/*
 * Three-stage repair of one mistake, derived only from saved answers (study
 * sets and finished exams with their dates); nothing new is stored:
 *   1. Yeniden dene  – a later set answers the same question correctly
 *                      without help.
 *   2. İkiz soru     – the twin (see twinQuestion.ts) is answered correctly
 *                      without help after the mistake. When the set has no
 *                      twin the stage is not passed; it is marked "ikizsiz"
 *                      and the repair moves on to stage 3.
 *   3. Gecikmeli kontrol – after stages 1 and 2, a further answer to the same
 *                      question or its twin, correct and without help, on a
 *                      day at least three calendar days after the mistake (the
 *                      day-3 spacing of the review policy).
 * Status: acik before stage 1, onarildi during stages 2 and 3, kalici once
 * stage 3 is passed. A finished exam counts only for items answered with no
 * help panel opened on that item (helpLevels[i] === 0). Closed-book retries
 * on the Mistakes page and tags are notes, not evidence, so they never change
 * the stage.
 */
export type MistakeStatus = "acik" | "onarildi" | "kalici";

const DAY = 86400000;
const dayOf = (date: string) => Date.parse(`${date}T00:00:00Z`);

// Local calendar day, matching how study sessions store their date.
const isoDay = (ms: number) => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

type ExamRecord = Pick<ExamSession, "items" | "answers" | "helpLevels" | "finishedAt">;

/** One saved correct answer given without help. */
export type RepairEvidence = { questionId: string; day: string; at: number };

export type RepairProgress = {
  /** Current stage; 4 means all three are passed (kalıcı onarım). */
  stage: 1 | 2 | 3 | 4;
  twinId?: string;
  /** The set had no suitable twin: stage 2 was not passed, only skipped. */
  noTwin: boolean;
  retry?: RepairEvidence;
  twin?: RepairEvidence;
  final?: RepairEvidence;
  /** First calendar day on which the delayed check can count. */
  checkDay: string;
};

/** Mistake day + 3 calendar days, as YYYY-MM-DD. */
export function repairCheckDay(mistakeDate: string) {
  return new Date(dayOf(mistakeDate) + 3 * DAY).toISOString().slice(0, 10);
}

function evidence(
  sessions: readonly Session[],
  exams: readonly ExamRecord[],
  mistake: Session,
  ids: readonly string[],
): RepairEvidence[] {
  const rows: RepairEvidence[] = [];
  for (const s of sessions) {
    if (s.finishedAt <= mistake.finishedAt) continue;
    const at = Date.parse(s.finishedAt);
    for (const r of s.responses)
      if (ids.includes(r.questionId) && r.correct && !r.assisted) rows.push({ questionId: r.questionId, day: s.date, at });
  }
  const after = Date.parse(mistake.finishedAt);
  for (const e of exams) {
    if (!(e.finishedAt > after)) continue;
    e.items.forEach((item, i) => {
      if (ids.includes(item.id) && e.answers[i] === item.answer && (e.helpLevels?.[i] ?? 0) === 0)
        rows.push({ questionId: item.id, day: isoDay(e.finishedAt), at: e.finishedAt });
    });
  }
  return rows.sort((a, b) => a.at - b.at || a.questionId.localeCompare(b.questionId));
}

/**
 * Stage of one mistake. `twinId` comes from twinForMistake; leave it out
 * when the set has no twin.
 */
export function repairProgress(
  sessions: readonly Session[],
  mistake: Session,
  questionId: string,
  exams: readonly ExamRecord[] = [],
  twinId?: string,
): RepairProgress {
  const twinUsable = twinId && twinId !== questionId ? twinId : undefined;
  const rows = evidence(sessions, exams, mistake, twinUsable ? [questionId, twinUsable] : [questionId]);
  const checkDay = repairCheckDay(mistake.date);
  const base = { twinId: twinUsable, noTwin: !twinUsable, checkDay };
  const retry = rows.find((r) => r.questionId === questionId);
  if (!retry) return { ...base, stage: 1 };
  const twin = twinUsable ? rows.find((r) => r.questionId === twinUsable) : undefined;
  if (twinUsable && !twin) return { ...base, stage: 2, retry };
  const after = Math.max(retry.at, twin?.at ?? 0);
  const final = rows.find((r) => r !== retry && r !== twin && r.at > after && dayOf(r.day) >= dayOf(checkDay));
  return final ? { ...base, stage: 4, retry, twin, final } : { ...base, stage: 3, retry, twin };
}

export function statusOfStage(stage: RepairProgress["stage"]): MistakeStatus {
  return stage === 1 ? "acik" : stage === 4 ? "kalici" : "onarildi";
}

export function mistakeStatus(
  sessions: readonly Session[],
  mistake: Session,
  questionId: string,
  exams: readonly ExamRecord[] = [],
  twinId?: string,
): MistakeStatus {
  return statusOfStage(repairProgress(sessions, mistake, questionId, exams, twinId).stage);
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
