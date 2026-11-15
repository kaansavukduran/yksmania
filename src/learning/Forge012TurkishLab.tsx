import { useId } from "react";
import { ArrowRight } from "lucide-react";
import { useExploration } from "./useExploration";
import { grammarCasesFor } from "./forge012Turkish";
import "./forge012Turkish.css";

export default function Forge012TurkishLab({ id }: { id: string }) {
  const uid = useId(),
    cases = grammarCasesFor(id);
  const [s, set] = useExploration(`forge012-turkish:${id}`, {
    family: cases[0].id,
    altered: false,
    show: false,
    guess: "",
    reason: "",
    checked: false,
  });
  const selected = cases.find((c) => c.id === s.family) ?? cases[0];
  const scene = selected.frames[s.altered ? 1 : 0];
  const kinds = [...new Set(cases.flatMap((c) => c.frames.map((f) => f.kind)))];
  const guessed = kinds.includes(s.guess);
  return (
    <section className="grammar012-lab" data-forge012={id}>
      <h3>Cümleyi değiştir, kanıtı karşılaştır</h3>
      <p>
        Bir örnek çifti seç. Dönüşümden sonra yalnız son eke bakma; sözcüğün
        görevini ve cümledeki ilişkileri birlikte incele.
      </p>
      <label htmlFor={`${uid}-family`}>İncelenen örnek çifti</label>
      <select
        id={`${uid}-family`}
        value={selected.id}
        onChange={(e) =>
          set({
            family: e.target.value,
            altered: false,
            show: false,
            guess: "",
            checked: false,
          })
        }
      >
        {cases.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>
      <div className="grammar012-actions">
        <button
          className="secondary"
          aria-pressed={s.altered}
          onClick={() =>
            set({ altered: !s.altered, show: false, guess: "", checked: false })
          }
        >
          Cümleyi dönüştür
        </button>
        <button
          className="secondary"
          aria-pressed={s.show}
          onClick={() => set({ show: !s.show })}
        >
          Kanıtı {s.show ? "gizle" : "göster"}
        </button>
      </div>
      <div
        className="grammar012-model"
        aria-label="Değişen cümle, parçalar ve ilişkiler"
      >
        <p className="grammar012-sentence">{scene.sentence}</p>
        <div className="grammar012-parts">
          {scene.parts.map((p, i) => (
            <div key={`${selected.id}-${s.altered}-${i}`} data-model-part>
              <strong>{p.form}</strong>
              <span>{p.role}</span>
            </div>
          ))}
        </div>
        <svg
          viewBox="0 0 640 130"
          role="img"
          aria-labelledby={`${uid}-diagram-title ${uid}-diagram-desc`}
        >
          <title id={`${uid}-diagram-title`}>{scene.sentence}</title>
          <desc id={`${uid}-diagram-desc`}>
            {scene.parts.map((p) => p.form + ": " + p.role).join("; ")}.
            Noktalar yukarıdaki parçaların sırasını temsil eder; gerçek dil
            bilgisel ilişkiler açıklamada verilir.
          </desc>
          {scene.parts.map((p, i) => {
            const x = 50 + (i * 540) / Math.max(1, scene.parts.length - 1);
            return (
              <g key={i} data-part-index={i}>
                {i < scene.parts.length - 1 && (
                  <path
                    d={`M${x + 18} 45 H${50 + ((i + 1) * 540) / Math.max(1, scene.parts.length - 1) - 18}`}
                    stroke="var(--border)"
                    strokeWidth="3"
                  />
                )}
                <circle
                  cx={x}
                  cy="45"
                  r={s.show ? 16 : 12}
                  fill={i === 1 ? "var(--accent)" : "var(--surface)"}
                  stroke={s.show ? "var(--mint)" : "var(--border)"}
                  strokeWidth="3"
                />
                <text
                  x={x}
                  y="95"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="20"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
        {scene.time !== undefined && (
          <div
            className="grammar012-timeline"
            aria-label="Bağlamın gösterdiği zaman"
          >
            {(
              [
                [-1, "Önce"],
                [0, "Konuşma anı"],
                [1, "Sonra"],
              ] as const
            ).map(([at, label]) => (
              <span key={at} data-time={at} data-active={at === scene.time}>
                {label}
                {at === scene.time && <strong>Seçili bağlam</strong>}
              </span>
            ))}
          </div>
        )}
        {s.show && (
          <ul className="grammar012-evidence">
            {scene.links.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="grammar012-result" data-model-result>
        <strong>{scene.kind}</strong>
        <p>{scene.reason}</p>
      </div>
      <fieldset>
        <legend>Kararını cümleden kanıtla</legend>
        <label htmlFor={`${uid}-guess`}>Görev tahminin</label>
        <select
          id={`${uid}-guess`}
          value={guessed ? s.guess : ""}
          onChange={(e) => set({ guess: e.target.value, checked: false })}
        >
          <option value="">Bir görev seç</option>
          {kinds.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <label htmlFor={`${uid}-reason`}>Cümleden gerekçen</label>
        <textarea
          id={`${uid}-reason`}
          rows={3}
          maxLength={120}
          value={s.reason.slice(0, 120)}
          onChange={(e) => set({ reason: e.target.value, checked: false })}
          placeholder="Hangi kelime, ek veya özne ilişkisi kararını destekliyor?"
        />
        <button
          className="secondary"
          disabled={!guessed || !s.reason.trim()}
          onClick={() => set({ checked: true })}
        >
          Tahminimi karşılaştır <ArrowRight aria-hidden="true" size={18} />
        </button>
        {s.checked && guessed && (
          <div role="status" className="grammar012-feedback">
            <strong>
              {s.guess === scene.kind
                ? "Seçimin bu bağlamla uyumlu."
                : "Seçimini cümlenin ilişkileriyle yeniden karşılaştır."}
            </strong>
            <p>{scene.reason}</p>
            <p>Senin gerekçen: {s.reason}</p>
            <p className="small muted">
              Serbest gerekçen otomatik dil çözümlemesiyle puanlanmaz; kendi
              açıklamanı modelin kanıtıyla karşılaştır.
            </p>
          </div>
        )}
      </fieldset>
      <p className="small muted">
        Bu keşif açık bağlamlı örnek çiftleriyle öğretir; bütün cümleleri
        otomatik çözümleyen bir dil motoru değildir. Seçimler bu cihazda
        saklanır. Keşif, konu tamamlanması, soru doğrusu veya XP oluşturmaz.
      </p>
    </section>
  );
}
