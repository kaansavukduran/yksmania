import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  buildTurkishScene018,
  turkishCases018,
  turkishExplorationDefaults018,
} from "./forge018Turkish";
import "./forge018Turkish.css";

const displayDecision018 = (value: string) =>
  value === "Neden-sonuç" ? "Neden ve sonuç" : value;

export default function Forge018TurkishLab({ lessonId }: { lessonId: string }) {
  const uid = useId();
  const cases = turkishCases018(lessonId);
  const [saved, set] = useExploration(`forge018-turkish:${lessonId}`, {
    ...turkishExplorationDefaults018,
    pair: cases[0].id,
  });
  const pair = cases.find((item) => item.id === saved.pair) ?? cases[0];
  const frame = pair.frames[saved.changed ? 1 : 0];
  const selected =
    Number.isInteger(saved.selected) &&
    saved.selected >= 0 &&
    saved.selected < frame.nodes.length
      ? saved.selected
      : frame.focus;
  const scene = buildTurkishScene018(
    lessonId,
    pair.id,
    saved.changed,
    selected,
  );
  const guess = scene.options.includes(saved.guess) ? saved.guess : "";
  const reason = saved.reason.slice(0, 120);
  const compared = saved.compared && Boolean(guess && reason.trim());
  const revealed = saved.show || compared;
  const paragraph = lessonId === "paragrafa-giris";
  const idiom = lessonId === "deyimler-ve-atasozleri";
  const change = (values: Parameters<typeof set>[0]) =>
    set({
      ...values,
      selected: -1,
      guess: "",
      reason: "",
      show: false,
      compared: false,
    });
  return (
    <section className="turkish018-lab" data-forge018={lessonId}>
      <h3>
        {paragraph
          ? "Metnin bağlarını sıraya koy"
          : idiom
            ? "Sözü olaya bağla"
            : "Yargıların yönünü izle"}
      </h3>
      <p>
        {paragraph
          ? "Tam metni oku. Sırayı değiştir; öncül ve gönderme bağının nerede koptuğunu gör."
          : idiom
            ? "Olayı ve sözün ne anlattığını birlikte oku. Yeni bağlamda hangi sonuç değişiyor?"
            : "İki yargıyı ayrı oku. Oku izleyip neden, hedef, şart veya çıkarımı kendi sözlerinle açıkla."}
      </p>
      <label htmlFor={`${uid}-pair`}>İncelenen örnek</label>
      <select
        id={`${uid}-pair`}
        value={pair.id}
        onChange={(event) =>
          change({ pair: event.target.value, changed: false })
        }
      >
        {cases.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      <p className="turkish018-selected-label">
        Seçili örnek: <strong>{pair.label}</strong>
      </p>
      <button
        type="button"
        className="secondary"
        aria-pressed={saved.changed}
        onClick={() => change({ changed: !saved.changed })}
      >
        {paragraph ? "Sırayı değiştir" : "Bağlamı değiştir"}
      </button>
      <div
        className="turkish018-model"
        data-variant={saved.changed ? "changed" : "original"}
      >
        <p>{scene.context}</p>
        <p className="turkish018-sentence">{scene.sentence}</p>
        <div
          className="turkish018-nodes"
          aria-label={
            paragraph ? "Tam cümleler ve sıraları" : "Anlam parçaları"
          }
        >
          {scene.nodes.map((node, index) => (
            <div
              key={index}
              data-node-index={index}
              data-selected={scene.selected === index}
            >
              <p>
                <strong>{node.label}</strong>
              </p>
              <p>{node.text}</p>
            </div>
          ))}
        </div>
        <p>Şemada vurgulamak istediğin parçayı seç.</p>
        <div
          className="turkish018-select-nodes"
          role="group"
          aria-label="Şemada vurgulanacak parçalar"
        >
          {scene.nodes.map((node, index) => (
            <button
              key={index}
              type="button"
              className="secondary"
              data-node-button={index}
              aria-pressed={scene.selected === index}
              onClick={() => set({ selected: index })}
            >
              {node.label}
            </button>
          ))}
        </div>
        <p>
          Vurgulanan: <strong>{scene.target.label}</strong>
        </p>
        <p>{scene.target.text}</p>
        <svg
          viewBox={`0 0 640 ${scene.nodes.length * 88 + 28}`}
          role="img"
          aria-labelledby={`${uid}-title ${uid}-desc`}
        >
          <title id={`${uid}-title`}>
            {paragraph
              ? "Cümleler arasında öncül ve gönderme"
              : "Olay ve yargıların anlam bağları"}
          </title>
          <desc id={`${uid}-desc`}>
            {scene.sentence}{" "}
            {scene.relations
              .map(
                (link) =>
                  `${scene.nodes[link.source].label} → ${scene.nodes[link.target].label}: ${link.label}${link.valid ? "" : ", bu sırada bağ kopuk"}`,
              )
              .join("; ")}
            . Tam parçalar ve bağların metni şeklin yanında da verilir.
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
              <path d="M0 0 L8 4 L0 8Z" fill="currentColor" />
            </marker>
          </defs>
          {scene.relations.map((link, index) => {
            const from = link.source * 88 + 45,
              to = link.target * 88 + 45,
              bend = 20 + index * 16;
            return (
              <path
                key={index}
                data-relation={`${link.source}-${link.target}`}
                data-valid={link.valid}
                d={`M164 ${from} H${bend} V${to} H162`}
                fill="none"
                stroke="currentColor"
                strokeDasharray={link.valid ? undefined : "7 5"}
                strokeWidth={
                  link.source === scene.selected ||
                  link.target === scene.selected
                    ? 3.5
                    : 1.8
                }
                markerEnd={`url(#${uid}-arrow)`}
              />
            );
          })}
          {scene.nodes.map((node, index) => (
            <g
              key={index}
              transform={`translate(0 ${index * 88})`}
              data-svg-node={index}
              data-svg-token={index}
              data-selected={scene.selected === index}
            >
              <rect
                x="164"
                y="15"
                width="450"
                height="60"
                rx="10"
                fill="var(--surface)"
                stroke={
                  scene.selected === index ? "var(--accent)" : "var(--text)"
                }
                strokeWidth={scene.selected === index ? 4 : 1.5}
              />
              <text
                x="182"
                y="45"
                dominantBaseline="central"
                fontSize="40"
                fill="var(--text)"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
        <ul className="turkish018-links" aria-label="Şema bağlarının tam metni">
          {scene.relations.map((link, index) => (
            <li key={index}>
              {scene.nodes[link.source].label} →{" "}
              {scene.nodes[link.target].label}: {link.label}
              {!link.valid && " — bu sırada öncül veya gereken kanıt eksik"}.
            </li>
          ))}
        </ul>
        <p>Kesik ok, bu hazır örnekte gereken bağın eksik olduğunu gösterir.</p>
      </div>
      <fieldset>
        <legend>Bu bağlamda hangi karar geçerli?</legend>
        <label htmlFor={`${uid}-guess`}>Karar tahminin</label>
        <select
          id={`${uid}-guess`}
          value={guess}
          onChange={(event) =>
            set({ guess: event.target.value, compared: false })
          }
        >
          <option value="">Bir açıklama seç</option>
          {scene.options.map((option) => (
            <option key={option} value={option}>
              {displayDecision018(option)}
            </option>
          ))}
        </select>
        <p className="turkish018-selected-label">
          Tahminin: <strong>{displayDecision018(guess) || "Henüz seçilmedi"}</strong>
        </p>
        <label htmlFor={`${uid}-reason`}>Bağlamdan gerekçen</label>
        <textarea
          id={`${uid}-reason`}
          rows={3}
          maxLength={120}
          value={reason}
          onChange={(event) =>
            set({ reason: event.target.value.slice(0, 120), compared: false })
          }
        />
        <button
          type="button"
          className="secondary turkish018-compare"
          disabled={!guess || !reason.trim()}
          onClick={() => set({ compared: true })}
        >
          Tahminimi karşılaştır
        </button>
        {compared && (
          <div className="turkish018-feedback" role="status">
            <strong>
              {guess === scene.decision
                ? "Seçimin bu bağlamla uyumlu."
                : "Seçimini kanıtla yeniden denetle."}
            </strong>
            <p>
              Gerekçene otomatik puan verilmez. Kendi açıklamanı kanıtla
              karşılaştır.
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
        className="turkish018-result"
        data-model-result
        aria-live="polite"
      >
        {revealed ? (
          <>
            <p>
              <strong>{displayDecision018(scene.decision)}</strong>
            </p>
            <p>{scene.reason}</p>
            <ul>
              {scene.evidence.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>Önce tahminini ve gerekçeni yaz. Sonra kanıtla karşılaştır.</p>
        )}
      </div>
      <p>
        Bu keşif puan veya konu tamamlama kaydı oluşturmaz. Yeni bir örnekte
        aynı bağı kendi sözlerinle kur.
      </p>
    </section>
  );
}
