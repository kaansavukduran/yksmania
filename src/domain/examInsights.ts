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
