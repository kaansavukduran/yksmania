import { lessons, lessonById } from "./content";
import type { AppState } from "./model";
import { examItemsByIds, questionStars, type ExamSpec } from "./exams";
import { mistakeStatus } from "./mistakeStatus";

/*
 * Akıllı oturum: tek tıkla zamana göre karma pratik. Önce açık hatalar, sonra
 * çalışılmış konulardan dersler arası sırayla (konu etiketi gizli) sorular.
 * “5 dk kurtarma” düşük enerjili günler içindir: çalışılmış konulardan en
 * kolay üç soru. Seçim aynı gün ve aynı kayıtlarla aynıdır (tohumlu sıra).
 * Bir oturum kendisi hiçbir kanıt yazmaz; yalnız verilen yardımsız cevaplar
 * deneme kaydı olarak sayılır (diğer denemelerle aynı kural).
 */
export type SmartMinutes = 5 | 15 | 30 | 60;
export const SMART_QUESTIONS: Record<SmartMinutes, number> = { 5: 3, 15: 8, 30: 16, 60: 32 };
export const MIXED_TITLE = "Karma pratik";

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Açık hatalar: yanlış ya da yardımla çözülmüş ve sonra yardımsız doğru çözülmemiş sorular. */
export function openMistakeIds(state: AppState): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const s of [...state.sessions].reverse())
    for (const r of s.responses)
      if ((!r.correct || r.assisted) && !seen.has(r.questionId) && mistakeStatus(state.sessions, s, r.questionId, state.examSessions) === "acik") {
        seen.add(r.questionId);
        out.push(r.questionId);
      }
  return out;
}

/** Çalışılmış (oturumu olan) derslerin soru setleri; hiç yoksa TYT'nin ilk dersleri. */
function studiedLessonIds(state: AppState): string[] {
  const ids = [...new Set(state.sessions.map((s) => s.lessonId))].filter((id) => (lessonById(id)?.questions.length ?? 0) > 0);
  if (ids.length) return ids;
  return lessons.filter((l) => l.subjectId.startsWith("tyt-") && l.questions.length > 0).slice(0, 12).map((l) => l.id);
}

export function smartSessionSpec(state: AppState, minutes: SmartMinutes, day: string): ExamSpec | undefined {
  const n = SMART_QUESTIONS[minutes];
  const recovery = minutes === 5;
  const answeredWell = new Set(state.sessions.flatMap((s) => s.responses.filter((r) => r.correct && !r.assisted).map((r) => r.questionId)));
  const picked: string[] = [];
  if (!recovery) for (const id of openMistakeIds(state).slice(0, Math.ceil(n / 2))) picked.push(id);
  // Derslere göre kovalar; her kova tohumlu sırayla karışır, kovalar sırayla dolaşılır (interleaving).
  const buckets = studiedLessonIds(state).map((id) => {
    const lesson = lessonById(id)!;
    let qs = lesson.questions.map((q) => q.id).filter((q) => !picked.includes(q) && !answeredWell.has(q));
    if (recovery) qs = qs.filter((q) => (questionStars(q) ?? 5) <= 3);
    return qs.sort((a, b) => hash(`${day}:${minutes}:${a}`) - hash(`${day}:${minutes}:${b}`));
  });
  buckets.sort((a, b) => hash(`${day}:${a[0] ?? ""}`) - hash(`${day}:${b[0] ?? ""}`));
  for (let round = 0; picked.length < n && buckets.some((b) => b.length > round); round++)
    for (const b of buckets) if (picked.length < n && b[round]) picked.push(b[round]);
  const items = examItemsByIds(picked);
  if (!items.length) return undefined;
  const ayt = items.filter((i) => i.subjectId.startsWith("ayt-")).length;
  return {
    id: `smart-${minutes}-${day}-${items.length}`,
    title: recovery ? `5 dk kurtarma · ${items.length} kolay soru` : `Akıllı oturum ${minutes} dk · ${MIXED_TITLE} · ${items.length} soru`,
    exam: ayt > items.length / 2 ? "AYT" : "TYT",
    kind: "branch",
    items,
    durationSeconds: minutes * 60,
    fullLength: false,
    missingSubjects: [],
  };
}

/** Konu etiketi gizli karma pratikte ders adı soru sırasında gösterilmez. */
export const hidesSubject = (title: string) => title.includes(MIXED_TITLE);
