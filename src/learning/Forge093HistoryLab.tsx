import { useId } from "react";
import { history093Cases } from "./forge093History";
import { clampInt } from "./mathModels";
import { useExploration } from "./useExploration";
import "./forge093HistoryLab.css";

export default function Forge093HistoryLab({ id }: { id: string }) {
  const [saved, set] = useExploration(`forge093-history:${id}`, {
    case: 0,
    axis: 0,
    choice: -1,
    checked: false,
  });
  const unique = useId();
  const cases = history093Cases[id];
  if (!cases) return null;
  const index = clampInt(saved.case, 0, cases.length - 1),
    data = cases[index];
  const society = id === "klasik-cag-osmanli-toplum-duzeni";
  const balance = id === "degisen-dunya-dengeleri-osmanli";
  const axis = society ? clampInt(saved.axis, 0, 2) : 0;
  const activeNode = society ? (axis === 0 ? 1 : axis === 1 ? 0 : 2) : -1;
  const choices =
    axis === 1
      ? ["Müslüman", "Gayrimüslim", "Yalnız meslek"]
      : axis === 2
        ? ["Şehirli esnaf", "Hukuk hizmeti", "Hanedan veraseti"]
        : data.choices;
  const answer =
    axis === 1
      ? index === 1
        ? 1
        : 0
      : axis === 2
        ? index === 2
          ? 1
          : 0
        : data.answer;
  const choice = clampInt(saved.choice, -1, choices.length - 1);
  const revealed = saved.checked && choice >= 0;
  const result =
    axis === 1
      ? `Dinî aidiyet: ${index === 1 ? "gayrimüslim" : "Müslüman"}. Görev–vergi ve meslek ayrı eksenlerdir.`
      : axis === 2
        ? `Üretim / hizmet: ${index === 2 ? "hukuk hizmeti" : "şehirli esnaf"}. Dinî aidiyet tek başına bu görevi belirlemez.`
        : data.result;
  const labels = society
    ? ["Dinî aidiyet", "Görev / vergi", "Üretim / hizmet"]
    : balance
      ? ["Savaş / dönem", "Değişim türü", "Yorum sınırı"]
      : ["İşin içeriği", "Görevli / makam", "Görev veya yetki alanı"];
  const outcomes = society
    ? data.nodes
    : [
        data.nodes[0],
        revealed ? choices[answer] : "Tahminini seç",
        balance
          ? "Değişimin sınırını denetle"
          : revealed
            ? (data.domain ?? (index === 2 ? "İlmiye" : "Kalemiye"))
            : "Görev alanını karşılaştır",
      ];
  return (
    <div className="forge093-history-lab concept-model" data-forge093={id}>
      <h3>
        {society
          ? "Aynı kişiye üç ayrı açıdan bak"
          : balance
            ? "Zamanı ve değişen ilişkiyi karşılaştır"
            : "Belgenin içeriğini izle, görevliyi bul"}
      </h3>
      <p className="muted">
        {society
          ? "Kişiyi ve bakış açısını değiştir. Meslek, inanç ve görev statüsünün hangisinin değiştiğini tahmin et."
          : balance
            ? "Bir dönüm noktası seç. Maddede değişenin statü, sınır, toprak veya nüfuz olduğunu kanıtla karşılaştır."
            : "Aynı ‘kayıt’ sözcüğünde işin içeriğini değiştir. Görevliyi tahmin et; sonra belirleyici kanıtı aç."}
      </p>
      <div className="forge093-history-controls">
        <label htmlFor={`${unique}-case`}>
          İncelenecek durum
          <select
            id={`${unique}-case`}
            value={index}
            onChange={(e) =>
              set({ case: Number(e.target.value), choice: -1, checked: false })
            }
          >
            {cases.map((c, i) => (
              <option key={c.name} value={i}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        {society && (
          <label htmlFor={`${unique}-axis`}>
            Karşılaştırma ekseni
            <select
              id={`${unique}-axis`}
              value={axis}
              onChange={(e) =>
                set({
                  axis: Number(e.target.value),
                  choice: -1,
                  checked: false,
                })
              }
            >
              <option value={0}>Görev ve vergi</option>
              <option value={1}>Dinî aidiyet</option>
              <option value={2}>Üretim ve hizmet</option>
            </select>
          </label>
        )}
      </div>
      {balance && (
        <ol
          className="forge093-history-time"
          aria-label="Seçilmiş dönüm noktaları"
        >
          {cases.map((c, i) => (
            <li key={c.name} className={index === i ? "is-selected" : ""}>
              <button
                type="button"
                aria-pressed={index === i}
                onClick={() => set({ case: i, choice: -1, checked: false })}
              >
                {c.year}
                <span className="sr-only"> · {c.name.split(" · ")[1]}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
      <div className="forge093-history-diagram">
        <svg
          viewBox="0 0 520 160"
          role="img"
          aria-labelledby={`${unique}-diagram-title`}
        >
          <title id={`${unique}-diagram-title`}>
            {society
              ? "Bir kişinin üç farklı toplumsal ilişkisinin şeması"
              : "Kanıt, tahmin ve açıklama arasındaki ilişki şeması"}
          </title>
          {society ? (
            <>
              <path
                className="history-connection"
                d="M260 75 L75 115 M260 75 L260 115 M260 75 L445 115"
              />
              <circle className="history-hub" cx="260" cy="47" r="28" />
              {[75, 260, 445].map((x, i) => (
                <rect
                  key={x}
                  className={`history-node ${activeNode === i ? "is-active" : ""}`}
                  x={x - 45}
                  y="108"
                  rx="14"
                  width="90"
                  height="37"
                />
              ))}
            </>
          ) : (
            <>
              <path className="history-connection" d="M100 80 L420 80" />
              {[85, 260, 435].map((x, i) => (
                <g key={x}>
                  <circle
                    className={`history-node ${i === 0 || revealed ? "is-active" : ""}`}
                    cx={x}
                    cy="80"
                    r="34"
                  />
                  <path
                    className="history-mark"
                    d={
                      i === 0
                        ? `M${x - 12} 72h24 M${x - 12} 81h24 M${x - 12} 90h16`
                        : i === 1
                          ? `M${x - 10} 75q10-18 20 0q0 8-10 10v4 M${x} 97v1`
                          : `M${x - 13} 80l9 9 18-20`
                    }
                  />
                </g>
              ))}
            </>
          )}
        </svg>
        <dl className="forge093-history-relations">
          {labels.map((label, i) => (
            <div
              key={`${index}-${i}`}
              className={society && activeNode === i ? "is-active" : ""}
            >
              <dt>{label}</dt>
              <dd>{outcomes[i]}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="forge093-history-evidence">
        <strong>İncelenecek kanıt</strong>
        <span>{data.evidence}</span>
      </p>
      <fieldset className="forge093-history-choices">
        <legend>
          {society
            ? `${["Görev ve vergi", "Dinî aidiyet", "Üretim ve hizmet"][axis]} bakımından tahminini seç`
            : "Tahminini seç"}
        </legend>
        {choices.map((label, i) => (
          <label
            key={`${index}-${axis}-${i}`}
            className={choice === i ? "is-selected" : ""}
          >
            <input
              type="radio"
              name={`${unique}-prediction`}
              checked={choice === i}
              onChange={() => set({ choice: i, checked: false })}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>
      <button
        type="button"
        className="secondary"
        disabled={choice < 0}
        onClick={() => set({ checked: true })}
      >
        Kanıtla karşılaştır
      </button>
      {revealed && (
        <div
          className="forge093-history-result"
          data-model-result
          role="status"
        >
          <strong>
            {choice === answer
              ? "Tahminin kanıtla uyumlu."
              : "Tahminini kanıtla yeniden karşılaştır."}
          </strong>
          <p>{result}</p>
          <p>{data.explanation}</p>
          <p>
            <strong>Sınır:</strong> {data.limit}
          </p>
        </div>
      )}
      <p className="forge093-history-credit muted">
        Şema ilişkiyi gösterir; tarihî harita veya değişmez bir toplumsal
        hiyerarşi değildir. Seçimler bu cihazda saklanır. Keşif XP, ustalık veya
        konu tamamlanması oluşturmaz.
      </p>
    </div>
  );
}
