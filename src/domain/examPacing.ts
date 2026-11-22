import type { ExamDraft, ExamSession } from "./examModel";

/*
 * Soru süresi referans bitiş anına kadarki soru geçişlerini ölçer. Süre
 * yalnız soru değişiminde ve bitişte mutlak zaman damgalarından hesaplanır.
 * Ekrandaki canlı değer kaydedilmez. Hiçbiri XP, kupa veya öğrenme kanıtı üretmez.
 */

type Timing = Pick<ExamDraft, "items" | "startedAt" | "deadline" | "itemMs" | "viewedAt">;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Açık sorudan ayrılırken geçen süreyi o soruya ekler ve yeni görüntüleme
 * başlangıcını `now` yapar. Eski taslakta (viewedAt yok) geçmiş süre
 * bilinmediği için hiçbir soruya süre yazılmaz; ölçüm bu andan başlar.
 */
export function recordView<T extends Timing>(draft: T, index: number, now: number): T {
  const at = Math.round(clamp(now, draft.startedAt, draft.deadline));
  const itemMs = draft.items.map((_, i) => draft.itemMs?.[i] ?? 0);
  if (draft.viewedAt !== undefined && index >= 0 && index < itemMs.length)
    itemMs[index] = Math.min(86_400_000, itemMs[index] + Math.max(0, at - draft.viewedAt));
  return { ...draft, itemMs, viewedAt: at };
}

/** Bu soruda şu ana kadar geçen toplam süre (kayıtlı + açık görüntüleme); ölçüm yoksa null. */
export function currentItemMs(draft: Timing & { index: number }, now: number): number | null {
  if (draft.viewedAt === undefined) return null;
  const live = Math.max(0, Math.min(now, draft.deadline) - draft.viewedAt);
  return (draft.itemMs?.[draft.index] ?? 0) + live;
}

/** Sınavın soru başı ortalama süresi (ms). */
export const averageItemMs = (draft: Pick<ExamDraft, "durationSeconds" | "items">) =>
  (draft.durationSeconds * 1000) / Math.max(1, draft.items.length);

/** Uyarı eşiği: soru başı ortalamanın 1,5 katı. */
export const PULSE_LIMIT = 1.5;

export type Pulse = { spentMs: number; averageMs: number; ratio: number; over: boolean };

export function timePulse(draft: Timing & Pick<ExamDraft, "durationSeconds" | "index">, now: number): Pulse | null {
  const spentMs = currentItemMs(draft, now);
  if (spentMs === null) return null;
  const averageMs = averageItemMs(draft),
    ratio = averageMs > 0 ? spentMs / averageMs : 0;
  return { spentMs, averageMs, ratio, over: ratio > PULSE_LIMIT };
}

export type SlowItem = {
  index: number;
  ms: number;
  subject: string;
  status: "correct" | "wrong" | "blank";
};

/** En çok zaman alan sorular (süresi sıfır olanlar hariç); süre kaydı yoksa null. */
export function slowestItems(
  session: Pick<ExamSession, "items" | "answers" | "itemMs">,
  limit = 5,
): SlowItem[] | null {
  if (!session.itemMs) return null;
  return session.items
    .map((item, index) => {
      const answer = session.answers[index];
      return {
        index,
        ms: session.itemMs?.[index] ?? 0,
        subject: item.subjectName,
        status: (answer === null ? "blank" : answer === item.answer ? "correct" : "wrong") as SlowItem["status"],
      };
    })
    .filter((row) => row.ms > 0)
    .sort((a, b) => b.ms - a.ms || a.index - b.index)
    .slice(0, limit);
}

/** "2 dk 5 sn" biçimi; bir dakikanın altında yalnız saniye. */
export function spokenDuration(ms: number) {
  const total = Math.max(0, Math.round(ms / 1000)),
    minutes = Math.floor(total / 60),
    seconds = total % 60;
  if (!minutes) return `${seconds} sn`;
  return seconds ? `${minutes} dk ${seconds} sn` : `${minutes} dk`;
}

/** 2. tur: işaretli ya da boş soruların sıralı listesi. */
export function secondRoundIndices(draft: Pick<ExamDraft, "answers" | "flagged">): number[] {
  return draft.answers.flatMap((answer, index) =>
    answer === null || draft.flagged.includes(index) ? [index] : [],
  );
}

export function secondRoundSummary(draft: Pick<ExamDraft, "answers" | "flagged">, remainingMs: number) {
  return {
    flagged: new Set(draft.flagged).size,
    blank: draft.answers.filter((a) => a === null).length,
    minutes: Math.ceil(Math.max(0, remainingMs) / 60_000),
  };
}

/**
 * 2. turda bir sonraki (+1) ya da önceki (-1) soru. Açık soru listedeyse
 * listedeki komşusu, değilse o yöndeki en yakın liste sorusu; yoksa null.
 */
export function secondRoundStep(round: readonly number[], current: number, direction: -1 | 1): number | null {
  const at = round.indexOf(current);
  if (at >= 0) return round[at + direction] ?? null;
  const candidates = direction === 1 ? round.filter((i) => i > current) : round.filter((i) => i < current);
  if (!candidates.length) return null;
  return direction === 1 ? Math.min(...candidates) : Math.max(...candidates);
}
