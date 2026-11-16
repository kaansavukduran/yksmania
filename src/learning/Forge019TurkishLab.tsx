import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  buildTurkishScene019,
  turkishCases019,
  turkishExplorationDefaults019,
} from "./forge019Turkish";
import "./forge019Turkish.css";

export default function Forge019TurkishLab({ lessonId }: { lessonId: string }) {
  const uid = useId(),
    cases = turkishCases019(lessonId);
  const first = buildTurkishScene019(lessonId, cases[0].id);
  const [saved, set] = useExploration(`forge019-turkish:${lessonId}`, {
    ...turkishExplorationDefaults019,
    caseId: cases[0].id,
    choice: first.initialChoice,
  });
  const item = cases.find((c) => c.id === saved.caseId) ?? cases[0];
  const baseline = buildTurkishScene019(lessonId, item.id);
  const validChoice =
    Number.isInteger(saved.choice) &&
    saved.choice >= baseline.choiceOffset &&
    saved.choice < baseline.choiceLabels.length + baseline.choiceOffset;
  const choice = validChoice ? saved.choice : baseline.initialChoice;
  const validSelected =
    Number.isInteger(saved.selected) &&
    saved.selected >= 0 &&
    saved.selected < baseline.nodes.length;
  const scene = buildTurkishScene019(
    lessonId,
    item.id,
    choice,
    validSelected ? saved.selected : 0,
  );
  const guess = scene.options.includes(saved.guess) ? saved.guess : "",
    reason = saved.reason.slice(0, 120);
  const compared = saved.compared && Boolean(guess && reason.trim()),
    revealed = saved.show || compared;
  const change = (values: Parameters<typeof set>[0]) =>
    set({
      ...values,
      selected: 0,
      guess: "",
      reason: "",
      compared: false,
      show: false,
    });
  const evidence = scene.kind === "evidence",
    split = scene.kind === "split";
  return (
    <section className="turkish019-lab" data-forge019={lessonId}>
      <h3>
        {evidence
          ? "İddiayı kanıta bağla"
          : split
            ? "Metni iki odakta düzenle"
            : "Çıkar, geri getir, bağı izle"}
      </h3>
      <p>
        {evidence
          ? "Tam metni oku. İddiayı değiştir; hangi cümle ona kanıt olur, hangisi onu dışlar, hangi bilgi eksik kalır?"
          : split
            ? "Bütün cümleleri koru. Sınırı değiştir; iki paragrafın hangi ayrı yönü anlattığını karşılaştır."
            : "Tam metni oku. Bir cümleyi çıkarıp kalan cümlelerin öncül ve amaç bağlarını yeniden denetle."}
      </p>
      <label htmlFor={`${uid}-case`}>İncelenen örnek</label>
      <select
        id={`${uid}-case`}
        value={item.id}
        onChange={(e) => {
          const next = buildTurkishScene019(lessonId, e.target.value);
          change({ caseId: e.target.value, choice: next.initialChoice });
        }}
      >
        {cases.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>
      <p>
        Seçili örnek: <strong>{item.label}</strong>
      </p>
      <div className="turkish019-model">
        <p>{scene.context}</p>
        <h4>Tam metin</h4>
        <p className="turkish019-passage">{scene.sentence}</p>
        <label htmlFor={`${uid}-choice`}>
          {evidence
            ? "İncelenen iddia"
            : split
              ? "İkinci paragrafın başlangıcı"
              : "Çıkarma deneyi"}
        </label>
        <select
          id={`${uid}-choice`}
          value={choice}
          onChange={(e) => change({ choice: Number(e.target.value) })}
        >
          {scene.choiceLabels.map((label, i) => (
            <option key={i} value={i + scene.choiceOffset}>
              {label}
            </option>
          ))}
        </select>
        <p className="turkish019-choice">
          Seçili işlem:{" "}
          <strong>{scene.choiceLabels[choice - scene.choiceOffset]}</strong>
        </p>
        {evidence ? (
          <div className="turkish019-claim">
            <h4>İddia</h4>
            <p>{scene.claim}</p>
          </div>
        ) : (
          <div
            className="turkish019-blocks"
            data-block-count={scene.blocks.length}
          >
            {scene.blocks.map((block, i) => (
              <div key={i} data-paragraph-block={i}>
                <h4>{split ? `${i + 1}. paragraf` : "Kalan metin"}</h4>
                <p>{block}</p>
              </div>
            ))}
          </div>
        )}
        <div
          className="turkish019-nodes"
          aria-label="Tam cümleler ve işlem durumları"
        >
          {scene.nodes.map((node, i) => (
            <div
              key={i}
              data-node-index={i}
              data-excluded={node.excluded}
              data-selected={i === scene.selected}
            >
              <p>
                <strong>
                  {node.label}
                  {node.excluded ? " · Çıkarıldı" : ""}
                </strong>
              </p>
              <p>{node.text}</p>
            </div>
          ))}
        </div>
        <p>Şemada vurgulamak istediğin parçayı seç.</p>
        <div
          className="turkish019-select-nodes"
          role="group"
          aria-label="Şemada vurgulanacak parçalar"
        >
          {scene.nodes.map((node, i) => (
            <button
              key={i}
              type="button"
              className="secondary"
              aria-pressed={i === scene.selected}
              onClick={() => set({ selected: i })}
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
          <title id={`${uid}-title`}>Cümlelerin kanıt ve anlam bağları</title>
          <desc id={`${uid}-desc`}>
            {scene.sentence}{" "}
            {scene.relations
              .map(
                (link) =>
                  `${scene.nodes[link.source].label} → ${scene.nodes[link.target].label}: ${link.label}${link.valid ? "" : ", seçili işlemde bağ desteklenmiyor"}`,
              )
              .join("; ")}
            . Tam cümleler ve bağların açıklaması şeklin yanında da görünür.
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
          {scene.relations.map((link, i) => {
            const from = link.source * 88 + 45,
              to = link.target * 88 + 45,
              bend = 20 + i * 16;
            return (
              <path
                key={i}
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
          {scene.nodes.map((node, i) => (
            <g
              key={i}
              transform={`translate(0 ${i * 88})`}
              data-svg-token={i}
              data-svg-node={i}
              data-selected={i === scene.selected}
              data-excluded={node.excluded}
            >
              <rect
                x="164"
                y="15"
                width="450"
                height="60"
                rx="10"
                fill="var(--surface)"
                stroke={i === scene.selected ? "var(--accent)" : "var(--text)"}
                strokeDasharray={node.excluded ? "7 5" : undefined}
                strokeWidth={i === scene.selected ? 4 : 1.5}
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
        <ul className="turkish019-links" aria-label="Şema bağlarının tam metni">
          {scene.relations.map((link, i) => (
            <li key={i}>
              {scene.nodes[link.source].label} →{" "}
              {scene.nodes[link.target].label}: {link.label}
              {!link.valid && "; bu işlemde destek bağı yok"}.
            </li>
          ))}
        </ul>
        <p>
          Kesik ok, seçili iddiada kanıtın yetmediğini veya seçili işlemde bir
          bağın geçerli olmadığını gösterir. Ayrıntıyı kanıtta oku.
        </p>
      </div>
      <fieldset>
        <legend>Sonucu önce kendin açıkla</legend>
        <label htmlFor={`${uid}-guess`}>Karar tahminin</label>
        <select
          id={`${uid}-guess`}
          value={guess}
          onChange={(e) => set({ guess: e.target.value, compared: false })}
        >
          <option value="">Bir açıklama seç</option>
          {scene.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <p>
          Tahminin: <strong>{guess || "Henüz seçilmedi"}</strong>
        </p>
        <label htmlFor={`${uid}-reason`}>Bağlamdan gerekçen</label>
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
          className="secondary turkish019-compare"
          disabled={!guess || !reason.trim()}
          onClick={() => set({ compared: true })}
        >
          Tahminimi karşılaştır
        </button>
        {compared && (
          <div className="turkish019-feedback" role="status">
            <strong>
              {guess === scene.decision
                ? "Seçimin bu bağlamla uyumlu."
                : "Seçimini kanıtla yeniden denetle."}
            </strong>
            <p>
              Gerekçene otomatik puan verilmez. Kendi açıklamanı metindeki
              kanıtla karşılaştır.
            </p>
          </div>
        )}
      </fieldset>
      <button
        type="button"
        className="secondary"
        aria-expanded={revealed}
        aria-controls={`${uid}-result`}
        onClick={() => set({ show: !revealed, compared: false })}
      >
        Kanıtı {revealed ? "gizle" : "göster"}
      </button>
      <div
        id={`${uid}-result`}
        className="turkish019-result"
        data-model-result
        aria-live="polite"
      >
        {revealed ? (
          <>
            <p>
              <strong>{scene.decision}</strong>
            </p>
            <p>{scene.reason}</p>
            <ul>
              {scene.evidence.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            Önce tahminini ve gerekçeni yaz; sonra kanıtı karşılaştır veya aç.
          </p>
        )}
      </div>
      <p>
        Bu hazırlanmış metinlerle yapılan keşif puan veya konu tamamlama kaydı
        oluşturmaz. Bağımsız soruları Sorular bölümünde çöz.
      </p>
    </section>
  );
}
