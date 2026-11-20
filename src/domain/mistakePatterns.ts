import type { Session } from "./model";
import type { ExamSession } from "./examModel";
import { addDays, localDate } from "./scheduler";

/*
 * Mistake root-cause tags and the weekly "most costly patterns" view.
 * Tags are the learner's own notes in `explorations` (keyed by mistakeKey).
 * A mistake without a learner-chosen tag stays in the untagged pattern; no
 * tag is ever inferred. Everything here is derived; nothing is written.
 */
export const mistakeReasons = [
  { id: "bilgi", label: "Bilgi eksik", repair: "İlgili konu sayfasını yeniden oku; kuralı kopya kâğıdından kendi cümlenle yaz." },
  { id: "kavram", label: "Kavram yanılgısı", repair: "Yanlış fikrini ve doğrusunu yan yana yaz; yanlışın neden yanlış olduğunu tek cümleyle açıkla." },
  { id: "yontem", label: "Yöntem seçimi", repair: "İpucu panelindeki soru tipi yaklaşımını oku; aynı tipten bir soru daha çöz." },
  { id: "islem", label: "İşlem hatası", repair: "Her adımı ayrı satıra yaz; sonucu ters işlemle veya değer vererek denetle." },
  { id: "okuma", label: "Okuma / dikkat", repair: "Soru kökünde isteneni işaretle; “değildir, yalnız, en az” gibi sözcüklerin altını çiz." },
  { id: "birim", label: "Birim / işaret", repair: "Birimleri sayılarla birlikte taşı; işaret değişimini her adımda kontrol et." },
  { id: "sure", label: "Süre baskısı", repair: "Bu tip soruyu ilk turda işaretleyip geç; kolaylar bitince geri dön." },
] as const;
export type MistakeReason = (typeof mistakeReasons)[number]["id"];

/** Short stable key within the 100-character exploration key limit. */
export function mistakeKey(sessionId: string, questionId: string) {
  let h = 2166136261;
  const text = `${sessionId}\u0000${questionId}`;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `mistake:${(h >>> 0).toString(36)}:${text.length.toString(36)}`;
}

/** One wrong answer costs its own point plus a quarter for the penalty. */
export const NET_LOSS_PER_WRONG = 1.25;
export const UNTAGGED = "etiketlenmemis";
export const UNTAGGED_LABEL = "Etiketlenmemiş";

export type WrongAnswer = {
  questionId: string;
  subjectId: string;
  date: string;
  /** Learner-chosen reason id, or UNTAGGED. */
  reason: string;
  /** Sort key: later attempts first. */
  at: number;
};

export type MistakePattern = {
  subjectId: string;
  reason: string;
  reasonLabel: string;
  wrong: number;
  netLoss: number;
  /** Unique question ids, latest attempt first, for the repair sprint. */
  questionIds: string[];
};

const reasonIds = new Set<string>(mistakeReasons.map((r) => r.id));
export const reasonLabel = (id: string) =>
  mistakeReasons.find((r) => r.id === id)?.label ?? UNTAGGED_LABEL;

/**
 * Every saved wrong answer (study sessions and finished exams), with the
 * learner's own tag when one exists. Blank exam answers are not wrong.
 */
export function wrongAnswers(
  sessions: readonly Session[],
  exams: readonly Pick<ExamSession, "items" | "answers" | "finishedAt">[],
  explorations: Record<string, Record<string, unknown>>,
  subjectOf: (lessonId: string) => string | undefined,
): WrongAnswer[] {
  const rows: WrongAnswer[] = [];
  for (const s of sessions) {
    const subjectId = subjectOf(s.lessonId);
    if (!subjectId) continue;
    const at = Date.parse(s.finishedAt) || Date.parse(`${s.date}T12:00:00`);
    for (const r of s.responses) {
      if (r.correct) continue;
      const tag = explorations[mistakeKey(s.id, r.questionId)]?.reason;
      rows.push({
        questionId: r.questionId,
        subjectId,
        date: s.date,
        reason: typeof tag === "string" && reasonIds.has(tag) ? tag : UNTAGGED,
        at,
      });
    }
  }
  for (const e of exams) {
    const date = localDate(new Date(e.finishedAt));
    e.items.forEach((item, i) => {
      const answer = e.answers[i];
      if (answer === null || answer === undefined || answer === item.answer) return;
      // Exam answers have no tagging control, so they stay untagged.
      rows.push({ questionId: item.id, subjectId: item.subjectId, date, reason: UNTAGGED, at: e.finishedAt });
    });
  }
  return rows;
}

/** The last seven calendar days, today included. */
export function lastSevenDays<T extends { date: string }>(rows: readonly T[], today: string): T[] {
  const from = addDays(today, -6);
  return rows.filter((r) => r.date >= from && r.date <= today);
}

/** Subject × reason groups, most net lost first. */
export function mistakePatterns(rows: readonly WrongAnswer[], limit = 3): MistakePattern[] {
  const groups = new Map<string, WrongAnswer[]>();
  for (const r of rows) {
    const key = `${r.subjectId}\u0000${r.reason}`;
    const list = groups.get(key);
    if (list) list.push(r);
    else groups.set(key, [r]);
  }
  return [...groups.values()]
    .map((list) => {
      const { subjectId, reason } = list[0];
      const ordered = [...list].sort((a, b) => b.at - a.at);
      return {
        subjectId,
        reason,
        reasonLabel: reasonLabel(reason),
        wrong: list.length,
        netLoss: list.length * NET_LOSS_PER_WRONG,
        questionIds: [...new Set(ordered.map((r) => r.questionId))],
        latest: ordered[0].at,
      };
    })
    .sort(
      (a, b) =>
        b.wrong - a.wrong ||
        // A learner-named cause is more actionable than an untagged pile.
        Number(a.reason === UNTAGGED) - Number(b.reason === UNTAGGED) ||
        b.latest - a.latest ||
        a.subjectId.localeCompare(b.subjectId) ||
        a.reason.localeCompare(b.reason),
    )
    .slice(0, limit)
    .map(({ latest: _latest, ...pattern }) => pattern);
}
