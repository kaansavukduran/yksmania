import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  buildTurkishScene015,
  turkishAxes015,
  turkishCases015,
  turkishExplorationDefaults015,
  type TurkishAxis015,
} from "./forge015Turkish";
import "./forge015Turkish.css";

export default function Forge015TurkishLab({ lessonId }: { lessonId: string }) {
  const uid = useId();
  const cases = turkishCases015(lessonId);
  const [saved, set] = useExploration(`forge015-turkish:${lessonId}`, {
    ...turkishExplorationDefaults015,
    pair: cases[0].id,
  });
  const pair = cases.find((c) => c.id === saved.pair) ?? cases[0];
  const frame = pair.frames[saved.changed ? 1 : 0];
  const selected =
    Number.isInteger(saved.selected) &&
    saved.selected >= 0 &&
    saved.selected < frame.tokens.length
      ? saved.selected
      : frame.focus;
  const axis: TurkishAxis015 =
    turkishAxes015.find((a) => a.id === saved.axis)?.id ?? "structure";
  const scene = buildTurkishScene015(
    lessonId,
    pair.id,
    saved.changed,
    selected,
    axis,
  );
  const sentenceKinds = lessonId === "cumle-turleri";
  const guess = scene.options.includes(saved.guess) ? saved.guess : "";
  const reason = saved.reason.slice(0, 120);
  const compared = saved.compared && Boolean(guess && reason.trim());
  const revealed = saved.show || compared;
  const alter = (values: Parameters<typeof set>[0]) =>
    set({ ...values, guess: "", reason: "", show: false, compared: false });
  const height = scene.tokens.length * 92 + 30;
  return (
    <section className="turkish015-lab" data-forge015={lessonId}>
      <h3>Cümleyi dönüştür, ilişkiyi açıkla</h3>
      <p>
        Bir örnek çifti seç ve iki cümleyi karşılaştır. Bu model, hazırlanmış
        örneklerdeki ilişkileri gösterir; serbest yazılmış her Türkçe cümleyi
        çözümleyen bir araç değildir.
      </p>
      <label htmlFor={`${uid}-pair`}>İncelenen cümle çifti</label>
      <select
        id={`${uid}-pair`}
        value={pair.id}
        onChange={(e) =>
          alter({ pair: e.target.value, changed: false, selected: -1 })
        }
      >
        {cases.map((c) => (
          <option value={c.id} key={c.id}>
            {c.label}
          </option>
        ))}
      </select>
      <p className="turkish015-selected-label">
        Seçili çift: <strong>{pair.label}</strong>
      </p>
      <button
        type="button"
        className="secondary"
        aria-pressed={saved.changed}
        onClick={() => alter({ changed: !saved.changed, selected: -1 })}
      >
        Cümleyi dönüştür
      </button>
      <div
        className="turkish015-model"
        data-variant={saved.changed ? "changed" : "original"}
      >
        <p>{scene.context}</p>
        <p className="turkish015-sentence">{scene.sentence}</p>
        <p>
          İncelemek istediğin parçayı seç. Şemadaki çizgiler aşağıda sözle
          açıklanan ilişkileri gösterir.
        </p>
        <div
          className="turkish015-tokens"
          role="group"
          aria-label="Cümlenin parçaları"
        >
          {scene.tokens.map((token, index) => (
            <button
              type="button"
              className="secondary"
              key={`${pair.id}-${saved.changed}-${index}`}
              data-token-index={index}
              aria-pressed={selected === index}
              onClick={() => alter({ selected: index })}
            >
              {token.text}
            </button>
          ))}
        </div>
        <svg
          viewBox={`0 0 640 ${height}`}
          role="img"
          aria-labelledby={`${uid}-svg-title ${uid}-svg-desc`}
        >
          <title id={`${uid}-svg-title`}>
            Cümle parçalarının ilişki şeması
          </title>
          <desc id={`${uid}-svg-desc`}>
            {scene.sentence}{" "}
            {scene.relations
              .map(
                (r) =>
                  `${scene.tokens[r.from].text} → ${scene.tokens[r.to].text}: ${r.label}`,
              )
              .join("; ")}
            . Seçili parça: {scene.target}. Aynı ilişkiler aşağıda metinle
            verilir.
          </desc>
          <defs>
            <marker
              id={`${uid}-arrow`}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="currentColor" />
            </marker>
          </defs>
          {scene.relations.map((r, i) => {
            const y1 = r.from * 92 + 48,
              y2 = r.to * 92 + 48;
            const x = 28 + i * 14;
            return (
              <path
                key={`${r.from}-${r.to}`}
                data-relation={`${r.from}-${r.to}`}
                d={`M 120 ${y1} H ${x} V ${y2} H 112`}
                fill="none"
                stroke="currentColor"
                strokeWidth={r.from === selected || r.to === selected ? 3 : 1.8}
                markerEnd={`url(#${uid}-arrow)`}
              />
            );
          })}
          {scene.tokens.map((token, index) => (
            <g
              key={index}
              data-selected={selected === index}
              data-svg-token={index}
            >
              <rect
                x="120"
                y={index * 92 + 15}
                width="500"
                height="66"
                rx="12"
                fill="var(--surface)"
                stroke={selected === index ? "var(--accent)" : "var(--text)"}
                strokeWidth={selected === index ? 4 : 1.5}
              />
              <text
                x="140"
                y={index * 92 + 57}
                fill="var(--text)"
                fontSize="23"
              >
                {token.text}
              </text>
            </g>
          ))}
        </svg>
        <ul
          className="turkish015-links"
          aria-label="Şemadaki bağların metin karşılığı"
        >
          {scene.relations.map((r) => (
            <li key={`${r.from}-${r.to}`}>
              <strong>{scene.tokens[r.from].text}</strong> →{" "}
              <strong>{scene.tokens[r.to].text}</strong> ({r.label})
            </li>
          ))}
        </ul>
      </div>
      {sentenceKinds && (
        <>
          <label htmlFor={`${uid}-axis`}>İnceleme ölçütü</label>
          <select
            id={`${uid}-axis`}
            value={axis}
            onChange={(e) => alter({ axis: e.target.value })}
          >
            {turkishAxes015.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
          <p className="turkish015-selected-label">
            Seçili ölçüt:{" "}
            <strong>{turkishAxes015.find((a) => a.id === axis)!.label}</strong>
          </p>
        </>
      )}
      <fieldset>
        <legend>
          {sentenceKinds
            ? "Seçili ölçüte göre bu cümle nasıl sınıflanır?"
            : "Seçili parçanın bu modeldeki görevi nedir?"}
        </legend>
        {!sentenceKinds && (
          <p>
            Seçili parça: <strong>{scene.target}</strong>
          </p>
        )}
        <label htmlFor={`${uid}-guess`}>Görev tahminin</label>
        <select
          id={`${uid}-guess`}
          value={guess}
          onChange={(e) => set({ guess: e.target.value, compared: false })}
        >
          <option value="">Bir açıklama seç</option>
          {scene.options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <p className="turkish015-selected-label">
          Tahminin: <strong>{guess || "Henüz seçilmedi"}</strong>
        </p>
        <label htmlFor={`${uid}-reason`}>Cümleden gerekçen</label>
        <textarea
          id={`${uid}-reason`}
          rows={3}
          maxLength={120}
          value={reason}
          onChange={(e) =>
            set({ reason: e.target.value.slice(0, 120), compared: false })
          }
        />
        <button
          type="button"
          className="secondary turkish015-compare"
          disabled={!guess || !reason.trim()}
          onClick={() => set({ compared: true })}
        >
          Tahminimi karşılaştır
        </button>
        {compared && (
          <div className="turkish015-feedback" role="status">
            <strong>
              {guess === scene.kind
                ? "Seçimin bu bağlamla uyumlu."
                : "Seçimini cümlenin kanıtıyla yeniden karşılaştır."}
            </strong>
            <p>
              Gerekçen otomatik puanlanmaz. Yazdığın açıklamayı aşağıdaki
              ilişkilerle kendin denetle.
            </p>
          </div>
        )}
      </fieldset>
      <button
        type="button"
        className="secondary"
        aria-expanded={revealed}
        aria-controls={`${uid}-evidence`}
        onClick={() => set({ show: !revealed, compared: false })}
      >
        Kanıtı {revealed ? "gizle" : "göster"}
      </button>
      <div
        id={`${uid}-evidence`}
        className="turkish015-result"
        data-model-result
        aria-live="polite"
      >
        {revealed ? (
          <>
            <p>
              <strong>{scene.kind}</strong>
            </p>
            <p>{scene.reason}</p>
            <ul>
              {scene.evidence.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
            {sentenceKinds && (
              <dl className="turkish015-axes">
                {turkishAxes015.map((a) => (
                  <div key={a.id}>
                    <dt>{a.label}</dt>
                    <dd>{scene.classifications[a.id]}</dd>
                  </div>
                ))}
              </dl>
            )}
          </>
        ) : (
          <p>
            Cümle hazır. Önce tahminini ve gerekçeni yaz; ardından kanıtı
            karşılaştır.
          </p>
        )}
      </div>
      <p>
        Bu keşif XP veya konu tamamlama kaydı oluşturmaz. Bağımsız sorulara
        geçmeden önce cümleyi değiştirip ilişkiyi kendi sözlerinle yeniden
        açıkla.
      </p>
    </section>
  );
}
