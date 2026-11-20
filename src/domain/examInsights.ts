import type { ExamDraft } from "./examModel";
import { examScore } from "./exams";

/*
 * Deneme sonrası iki özgün analiz. Ne puan ne sıralama tahminidir; yalnız
 * kaydedilmiş cevaplardan hesaplanır ve hiçbir kanıt ya da XP üretmez.
 */

export type Quarter = { label: string; from: number; to: number; correct: number; wrong: number; blank: number; accuracy: number };

/** Soru sırasına göre dört çeyrekte doğru oranı (yanlış ve boş ayrı). En az 12 soru ister. */
export function fatigueCurve(session: Pick<ExamDraft, "items" | "answers">): Quarter[] | null {
  const n = session.items.length;
  if (n < 12) return null;
  const quarters: Quarter[] = [];
  for (let k = 0; k < 4; k++) {
    const from = Math.floor((k * n) / 4), to = Math.floor(((k + 1) * n) / 4);
    let correct = 0, wrong = 0, blank = 0;
    for (let i = from; i < to; i++) {
      const a = session.answers[i];
      if (a === null) blank++;
      else if (a === session.items[i].answer) correct++;
      else wrong++;
    }
    quarters.push({ label: `${k + 1}. çeyrek`, from: from + 1, to, correct, wrong, blank, accuracy: correct / Math.max(1, to - from) });
  }
  return quarters;
}

export type CompassStep = { subject: string; wrongToFix: number; blankToFix: number; gain: number };

/**
 * Hedef nete en az soruyla ulaşma yolu. Yanlışı doğruya çevirmek 1,25 net,
 * boşu doğruya çevirmek 1 net kazandırır; önce yanlışlar (soru başına daha çok
 * net), sonra boşlar, her adımda en çok kazancı olan ders seçilir.
 */
export function netCompass(session: Pick<ExamDraft, "items" | "answers">, target = 5) {
  const rows = examScore(session).subjects.map((r) => ({ subject: r.subject, wrong: r.wrong, blank: r.blank }));
  const steps = new Map<string, CompassStep>();
  let gain = 0, questions = 0;
  const take = (kind: "wrong" | "blank") => {
    for (;;) {
      if (gain >= target - 1e-9) return;
      const row = [...rows].filter((r) => r[kind] > 0).sort((a, b) => b[kind] - a[kind])[0];
      if (!row) return;
      row[kind]--;
      const step = steps.get(row.subject) ?? { subject: row.subject, wrongToFix: 0, blankToFix: 0, gain: 0 };
      if (kind === "wrong") step.wrongToFix++;
      else step.blankToFix++;
      step.gain += kind === "wrong" ? 1.25 : 1;
      gain += kind === "wrong" ? 1.25 : 1;
      questions++;
      steps.set(row.subject, step);
    }
  };
  take("wrong");
  take("blank");
  return { target, reached: gain >= target - 1e-9, gain, questions, steps: [...steps.values()].sort((a, b) => b.gain - a.gain) };
}

/* ---------------------------------------------------------------------------
 * 055: hedef seçimi, kayıp net otopsisi, işaretli sorular arası dolaşma ve hız
 * göstergesi. Hepsi saf ve yalnız görünüm içindir; hiçbir şey kaydedilmez.
 * ------------------------------------------------------------------------- */

/** Pusulada tek dokunuşla seçilebilen hedef netler; varsayılan +5. */
export const COMPASS_TARGETS = [3, 5, 10] as const;
export type CompassTarget = (typeof COMPASS_TARGETS)[number];
export const DEFAULT_COMPASS_TARGET: CompassTarget = 5;

/** Geçersiz ya da listede olmayan bir değer varsayılan hedefe döner. */
export function compassTarget(value: unknown): CompassTarget {
  return (COMPASS_TARGETS as readonly unknown[]).includes(value) ? (value as CompassTarget) : DEFAULT_COMPASS_TARGET;
}

export type LostNetRow = { subject: string; wrong: number; blank: number; lost: number };

/**
 * Ders ders kayıp net: yanlış × 1,25 + boş × 1. En çok kaybettiren ders en
 * üstte; eşitlikte ders adı (Türkçe sıralama). Kaybı olmayan dersler dışarıda.
 */
export function lostNetTable(session: Pick<ExamDraft, "items" | "answers">) {
  const rows: LostNetRow[] = examScore(session)
    .subjects.map((r) => ({ subject: r.subject, wrong: r.wrong, blank: r.blank, lost: r.wrong * 1.25 + r.blank }))
    .filter((r) => r.lost > 0)
    .sort((a, b) => b.lost - a.lost || a.subject.localeCompare(b.subject, "tr"));
  const total = rows.reduce(
    (sum, r) => ({ wrong: sum.wrong + r.wrong, blank: sum.blank + r.blank, lost: sum.lost + r.lost }),
    { wrong: 0, blank: 0, lost: 0 },
  );
  return { rows, total };
}

/**
 * Bulunulan sorudan sonraki ilk işaretli soru; sona gelince başa sarar.
 * İşaretli soru yoksa ya da tek işaretli soru zaten açıksa null.
 */
export function nextFlagged(flagged: readonly number[], current: number, total: number): number | null {
  const sorted = [...new Set(flagged)].filter((i) => Number.isInteger(i) && i >= 0 && i < total).sort((a, b) => a - b);
  const next = sorted.find((i) => i > current) ?? sorted[0];
  return next === undefined || next === current ? null : next;
}

export type ExamPace = {
  elapsedMs: number;
  /** Bu hızla süre bitiminde yaklaşık yanıtlanmış soru sayısı (toplamla sınırlı). */
  projected: number;
  /** Eşit hızla gidilseydi şu ana kadar yanıtlanmış olması beklenen soru sayısı. */
  expected: number;
  /** answered − expected, tam sayıya yuvarlanmış: artı ileride, eksi geride. */
  delta: number;
};

/** Hız ölçümü için gereken en kısa geçen süre; ilk dakikada tahmin yapılmaz. */
export const PACE_MIN_ELAPSED_MS = 60_000;

/**
 * Mutlak başlangıç ve bitiş zamanlarından türetilen hız. Kayda yazılmaz;
 * her ekran yenilemesinde yeniden hesaplanır. Ölçüm için çok erkense null.
 */
export function examPace(
  { answered, total, startedAt, deadline }: { answered: number; total: number; startedAt: number; deadline: number },
  now: number,
): ExamPace | null {
  const duration = deadline - startedAt;
  const elapsedMs = Math.min(duration, Math.max(0, now - startedAt));
  if (duration <= 0 || total <= 0 || elapsedMs < PACE_MIN_ELAPSED_MS) return null;
  const projected = Math.min(total, Math.round((answered / elapsedMs) * duration));
  const expected = Math.round((total * elapsedMs) / duration);
  return { elapsedMs, projected, expected, delta: answered - expected };
}

/** 30. dakika hız kontrol noktası. */
export const PACE_CHECKPOINT_MS = 30 * 60_000;

/** Yalnız 30 dakikayı aşan denemelerde, 30. dakikadan bitişe kadar gösterilir. */
export function paceCheckpointDue({ startedAt, deadline }: { startedAt: number; deadline: number }, now: number) {
  return deadline - startedAt > PACE_CHECKPOINT_MS && now - startedAt >= PACE_CHECKPOINT_MS && now < deadline;
}
