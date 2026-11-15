import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  buildTurkishScene016,
  turkishCases016,
  turkishExplorationDefaults016,
} from "./forge016Turkish";
import "./forge016Turkish.css";

export default function Forge016TurkishLab({ lessonId }: { lessonId: string }) {
  const uid = useId();
  const cases = turkishCases016(lessonId);
  const [saved, set] = useExploration(`forge016-turkish:${lessonId}`, {
    ...turkishExplorationDefaults016,
    pair: cases[0].id,
  });
  const pair = cases.find((item) => item.id === saved.pair) ?? cases[0];
  const frame = pair.frames[saved.changed ? 1 : 0];
  const selected =
    Number.isInteger(saved.selected) &&
    saved.selected >= 0 &&
    saved.selected < frame.tokens.length
      ? saved.selected
      : frame.focus;
  const scene = buildTurkishScene016(
    lessonId,
    pair.id,
    saved.changed,
    selected,
  );
  const spelling = lessonId === "yazim-kurallari";
  const guess = scene.options.includes(saved.guess) ? saved.guess : "";
  const reason = saved.reason.slice(0, 120);
  const compared = saved.compared && Boolean(guess && reason.trim());
  const revealed = saved.show || compared;
  const change = (values: Parameters<typeof set>[0]) =>
    set({
      ...values,
      selected: -1,
      guess: "",
      reason: "",
      show: false,
      compared: false,
    });
  const height = scene.tokens.length * 88 + 28;
  return (
    <section className="turkish016-lab" data-forge016={lessonId}>
      <h3>
        {spelling
          ? "Anlamı değiştir, söz sınırını gör"
          : "İşareti değiştir, bağı yeniden gör"}
      </h3>
      <p>
        Bir cümle çifti seç. Dönüşümden önce anlamı tahmin et; sonra sözlerin ve
        çizgilerin nasıl değiştiğini incele. Burada yalnız hazır örnekler var;
        bu araç serbest yazılmış her cümleyi çözmez.
      </p>
      <label htmlFor={`${uid}-pair`}>İncelenen cümle çifti</label>
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
      <p className="turkish016-selected-label">
        Seçili çift: <strong>{pair.label}</strong>
      </p>
      <button
        type="button"
        className="secondary"
        aria-pressed={saved.changed}
        onClick={() => change({ changed: !saved.changed })}
      >
        Cümleyi dönüştür
      </button>
      <div
        className="turkish016-model"
        data-variant={saved.changed ? "changed" : "original"}
      >
        <p>{scene.context}</p>
        <p className="turkish016-sentence">{scene.sentence}</p>
        <p>
          {spelling
            ? "Kutular gerçek yazıdaki sözcük veya anlam gruplarını gösterir. Tek sözcükteki parçalar arasında boşluk yoktur."
            : "Kutular aynı öbek veya takım içindeki sözleri bir arada tutar. Bir sınır değişince sözcüklerin bağı da değişebilir."}
        </p>
        <div
          className="turkish016-groups"
          aria-label="Sözcük ve anlam grupları"
        >
          {scene.words.map((group, index) => (
            <div
              key={index}
              data-word-group={index}
              data-members={group.members.join(",")}
              data-joined={group.joined}
            >
              <p>{group.label}</p>
              <p
                className={
                  group.joined ? "turkish016-joined" : "turkish016-phrase"
                }
              >
                {group.members.map((member, position) => (
                  <span key={member} data-piece={member}>
                    {position > 0 && !group.joined ? " " : ""}
                    {scene.tokens[member]}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
        <p>
          Bir parçaya dokun; şemada o parçaya bağlı çizgiler belirgin olsun.
        </p>
        <div
          className="turkish016-tokens"
          role="group"
          aria-label="Şemada vurgulanacak parçalar"
        >
          {scene.tokens.map((token, index) => (
            <button
              key={index}
              type="button"
              className="secondary"
              data-token-index={index}
              aria-pressed={selected === index}
              onClick={() => set({ selected: index })}
            >
              {token}
            </button>
          ))}
        </div>
        <p>
          Vurgulanan parça: <strong>{scene.target}</strong>
        </p>
        <svg
          viewBox={`0 0 640 ${height}`}
          role="img"
          aria-labelledby={`${uid}-title ${uid}-description`}
        >
          <title id={`${uid}-title`}>Söz sınırları ve anlam bağları</title>
          <desc id={`${uid}-description`}>
            {scene.sentence}{" "}
            {scene.groups
              .map(
                (group) =>
                  `${group.label}: ${group.members.map((index) => scene.tokens[index]).join(group.joined ? "" : " ")}`,
              )
              .join("; ")}
            .{" "}
            {scene.relations
              .map(
                (link) =>
                  `${scene.tokens[link.from]} → ${scene.tokens[link.to]}: ${link.label}`,
              )
              .join("; ")}
            . Aynı gruplar ve bağlar tam yazıyla da verilir.
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
          {scene.groups.map((group, index) => {
            const first = Math.min(...group.members),
              last = Math.max(...group.members);
            return (
              <rect
                key={index}
                data-svg-group={index}
                data-members={group.members.join(",")}
                x="112"
                y={first * 88 + 6}
                width="515"
                height={(last - first) * 88 + 78}
                rx="12"
                fill="none"
                stroke="var(--text)"
                strokeWidth="2"
                strokeDasharray={group.joined ? undefined : "7 5"}
              />
            );
          })}
          {scene.relations.map((link, index) => {
            const from = link.from * 88 + 45,
              to = link.to * 88 + 45,
              bend = 20 + index * 13;
            return (
              <path
                key={`${link.from}-${link.to}`}
                data-relation={`${link.from}-${link.to}`}
                d={`M 164 ${from} H ${bend} V ${to} H 162`}
                fill="none"
                stroke="currentColor"
                strokeWidth={
                  link.from === selected || link.to === selected ? 3.5 : 1.8
                }
                markerEnd={`url(#${uid}-arrow)`}
              />
            );
          })}
          {scene.tokens.map((token, index) => (
            <g
              key={index}
              data-svg-token={index}
              data-selected={selected === index}
              transform={`translate(0 ${index * 88})`}
            >
              <rect
                x="164"
                y="15"
                width="450"
                height="60"
                rx="10"
                fill="var(--surface)"
                stroke={selected === index ? "var(--accent)" : "var(--text)"}
                strokeWidth={selected === index ? 4 : 1.5}
              />
              <text x="182" y="54" fontSize="23" fill="var(--text)">
                {token}
              </text>
            </g>
          ))}
        </svg>
        <ul
          className="turkish016-links"
          aria-label="Şemadaki bağların metin karşılığı"
        >
          {scene.relations.map((link) => (
            <li key={`${link.from}-${link.to}`}>
              {scene.tokens[link.from]} → {scene.tokens[link.to]} ({link.label})
            </li>
          ))}
        </ul>
      </div>
      <fieldset>
        <legend>Bu cümlede hangi karar geçerli?</legend>
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
              {option}
            </option>
          ))}
        </select>
        <p className="turkish016-selected-label">
          Tahminin: <strong>{guess || "Henüz seçilmedi"}</strong>
        </p>
        <label htmlFor={`${uid}-reason`}>Cümleden gerekçen</label>
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
          className="secondary turkish016-compare"
          disabled={!guess || !reason.trim()}
          onClick={() => set({ compared: true })}
        >
          Tahminimi karşılaştır
        </button>
        {compared && (
          <div className="turkish016-feedback" role="status">
            <strong>
              {guess === scene.decision
                ? "Seçimin bu bağlamla uyumlu."
                : "Seçimini cümlenin kanıtıyla yeniden karşılaştır."}
            </strong>
            <p>
              Gerekçen otomatik puan almaz. Kendi açıklamanı aşağıdaki kanıtla
              denetle.
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
        className="turkish016-result"
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
              {scene.evidence.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            Cümle hazır. Önce tahminini ve gerekçeni yaz; sonra kanıtı
            karşılaştır.
          </p>
        )}
      </div>
      <p>
        Bu keşif XP veya konu tamamlama kaydı oluşturmaz. Bağımsız sorulara
        geçmeden önce yeni cümledeki bağı kendi sözlerinle açıkla.
      </p>
    </section>
  );
}
