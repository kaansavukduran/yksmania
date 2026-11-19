import { useState } from "react";
import { useApp } from "../store";

/*
 * Mistake autopsy: tag why an answer went wrong and retry it closed-book.
 * Tags and retries are the learner's own notes. They live in `explorations`,
 * are never learning evidence, and award no XP or mastery.
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

export function MistakeRepair({
  sessionId,
  questionId,
  options,
  answer,
}: {
  sessionId: string;
  questionId: string;
  options: string[];
  answer: number;
}) {
  const { state, update } = useApp();
  const key = mistakeKey(sessionId, questionId);
  const saved = state.explorations[key] ?? {};
  const reason = typeof saved.reason === "string" ? (saved.reason as MistakeReason) : undefined;
  const [retrying, setRetrying] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  function save(changes: Record<string, string | number | boolean>) {
    void update((s) => ({
      ...s,
      explorations: { ...s.explorations, [key]: { ...(s.explorations[key] ?? {}), ...changes } },
    })).catch(() => {});
  }
  const info = mistakeReasons.find((r) => r.id === reason);

  return (
    <div className="mistake-repair">
      <fieldset className="mistake-reasons">
        <legend>Hata nedeni</legend>
        <div className="reason-chips">
          {mistakeReasons.map((r) => (
            <button
              key={r.id}
              type="button"
              aria-pressed={reason === r.id}
              className={reason === r.id ? "active" : ""}
              onClick={() => save({ reason: r.id })}
            >
              {r.label}
            </button>
          ))}
        </div>
        {info && <p className="small reason-advice">Onarım: {info.repair}</p>}
      </fieldset>
      {!retrying ? (
        <button type="button" className="secondary" onClick={() => setRetrying(true)}>
          Kapatıp yeniden çöz
        </button>
      ) : (
        <div className="mistake-retry" role="group" aria-label="Yeniden çöz">
          <p className="small muted">Açıklamaya bakmadan seç. Bu deneme kaydedilmez ve puan vermez.</p>
          {options.map((option, i) => (
            <button
              key={i}
              type="button"
              className={`retry-option ${picked === i ? (i === answer ? "retry-correct" : "retry-wrong") : ""}`}
              aria-pressed={picked === i}
              disabled={picked !== null && picked === answer}
              onClick={() => {
                setPicked(i);
                save({ retry: i === answer ? "dogru" : "yanlis" });
              }}
            >
              <span className="answer-letter">{String.fromCharCode(65 + i)}</span>
              <span>{option}</span>
            </button>
          ))}
          {picked !== null && (
            <p role="status" className={picked === answer ? "retry-msg ok" : "retry-msg"}>
              {picked === answer
                ? "Doğru. Sıradaki adım: aynı konudan benzer bir soru çöz (Onar), sonra 3/7/21. gün tekrarında yeniden dene."
                : "Henüz değil. Açıklamayı oku, hata nedenini seç ve tekrar dene."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/** Counts of tagged reasons for the mistake map. */
export function mistakeMap(explorations: Record<string, Record<string, unknown>>, keys: string[]) {
  const counts = new Map<string, number>();
  let untagged = 0;
  for (const k of keys) {
    const r = explorations[k]?.reason;
    if (typeof r === "string") counts.set(r, (counts.get(r) ?? 0) + 1);
    else untagged++;
  }
  return { counts, untagged };
}
