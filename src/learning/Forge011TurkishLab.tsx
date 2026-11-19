import { useId } from "react";
import { ArrowRight, CornerDownRight } from "lucide-react";
import { useExploration } from "./useExploration";
import {
  adverbFamilies,
  adverbKinds,
  buildAdverbScene,
  type AdverbFamily,
} from "./forge011Turkish";
import "./forge011Turkish.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

export default function Forge011TurkishLab({ id }: { id: string }) {
  const uid = useId();
  const [state, set] = useExploration("forge011-turkish-adverbs", {
    family: "manner",
    altered: false,
    show: false,
    guess: "",
    reason: "",
    checked: false,
  });
  const family = adverbFamilies.some((f) => f.id === state.family)
    ? (state.family as AdverbFamily)
    : "manner";
  const scene = buildAdverbScene(family, state.altered);
  const hasGuess = adverbKinds.some((k) => k === state.guess);
  return (
    <section className="adverb011-lab" data-forge011={id}>
      <h3>Sözcüğün bağını değiştir</h3>
      <p>
        Sözcükleri bir kez dönüştür. Aynı yazılışın neden farklı göreve
        geçtiğini, doğrudan bağlandığı sözcük üzerinden gör.
      </p>
      <label htmlFor={`${uid}-family`}>İncelenecek bağlantı</label>
      <ChoiceSelect
        id={`${uid}-family`}
        value={family}
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
        {adverbFamilies.map((f) => (
          <option key={f.id} value={f.id}>
            {f.label}
          </option>
        ))}
      </ChoiceSelect>
      <div className="adverb011-actions">
        <button
          className="secondary"
          aria-pressed={state.altered}
          onClick={() =>
            set({
              altered: !state.altered,
              show: false,
              guess: "",
              checked: false,
            })
          }
        >
          Cümleyi dönüştür
        </button>
        <button
          className="secondary"
          aria-pressed={state.show}
          onClick={() => set({ show: !state.show })}
        >
          Bağlantıyı {state.show ? "gizle" : "göster"}
        </button>
      </div>
      <div
        className="adverb011-diagram"
        aria-label="Değişen cümle ve anlam bağlantısı"
      >
        <div className="adverb011-sentence">
          {scene.words.map((word, index) => (
            <span
              key={`${family}-${state.altered}-${index}`}
              className={
                index === scene.target
                  ? "adverb011-target"
                  : state.show && index === scene.head
                    ? "adverb011-head"
                    : ""
              }
            >
              {word}
              {state.show && index === scene.target && (
                <small>İncelenen sözcük</small>
              )}
              {state.show && index === scene.head && (
                <small>Doğrudan hedef</small>
              )}
            </span>
          ))}
        </div>
        {state.show && (
          <div className="adverb011-link">
            <CornerDownRight aria-hidden="true" />
            <span>{scene.link}</span>
          </div>
        )}
        <svg
          viewBox="0 0 360 74"
          role="img"
          aria-label={`İncelenen sözcük ${scene.words[scene.target]}, doğrudan hedef ${scene.words[scene.head]}`}
        >
          <title>Değişen sözcük bağlantısı</title>
          {scene.words.map((_, i) => {
            const x = 30 + (i * 300) / Math.max(1, scene.words.length - 1);
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy="38"
                  r={i === scene.target ? 12 : 8}
                  fill={i === scene.target ? "var(--accent)" : "var(--surface)"}
                  stroke={i === scene.head ? "var(--accent)" : "var(--border)"}
                  strokeWidth="3"
                />
                <text
                  x={x}
                  y="68"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="14"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
          {state.show && (
            <path
              d={`M ${30 + (scene.target * 300) / Math.max(1, scene.words.length - 1)} 22 Q 180 -12 ${30 + (scene.head * 300) / Math.max(1, scene.words.length - 1)} 22`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
            />
          )}
        </svg>
        <p className="small muted">
          Noktalar cümledeki sözcük sırasını gösterir; renkli nokta incelenen
          sözcüktür. Gerçek sözcükler büyütülebilir metin olarak yukarıdadır.
        </p>
      </div>
      <div data-model-result className="adverb011-result">
        <strong>{scene.kind}</strong>
        <p>{scene.reason}</p>
      </div>
      <fieldset>
        <legend>Görevi kendi kanıtınla açıkla</legend>
        <label htmlFor={`${uid}-guess`}>Tür tahminin</label>
        <ChoiceSelect
          id={`${uid}-guess`}
          value={hasGuess ? state.guess : ""}
          onChange={(e) => set({ guess: e.target.value, checked: false })}
        >
          <option value="">Bir tür seç</option>
          {adverbKinds.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </ChoiceSelect>
        <label htmlFor={`${uid}-reason`}>Cümleden kanıtın</label>
        <textarea
          id={`${uid}-reason`}
          rows={3}
          maxLength={120}
          value={state.reason.slice(0, 120)}
          onChange={(e) => set({ reason: e.target.value, checked: false })}
          placeholder="Hangi sözcüğe bağlandığını ve hangi bilgiyi verdiğini yaz…"
        />
        <button
          className="secondary"
          disabled={!hasGuess || !state.reason.trim()}
          onClick={() => set({ checked: true })}
        >
          Tahminimi karşılaştır <ArrowRight aria-hidden="true" size={18} />
        </button>
        {state.checked && hasGuess && (
          <div role="status" className="adverb011-feedback">
            <strong>
              {state.guess === scene.kind
                ? "Tür seçimin bu kullanımla uyumlu."
                : "Tür seçimini bağlantıyla yeniden karşılaştır."}
            </strong>
            <p>
              {scene.link}. {scene.reason}
            </p>
            <p>Senin kanıtın: {state.reason}</p>
            <p className="small muted">
              Yazdığın gerekçeyi açıklamayla kendin karşılaştır; serbest metin
              otomatik puanlanmaz.
            </p>
          </div>
        )}
      </fieldset>
      <p className="small muted">
        Bu bir keşif çalışmasıdır. Seçimler ve açıklaman bu cihazda korunur;
        puanlı sonuç Sorular bölümündeki bağımsız çözümden gelir.
      </p>
    </section>
  );
}
