import { useId } from "react";
import { useExploration } from "./useExploration";
import { HistoryEventChoices } from "./HistoryEventChoices";
import {
  history011Cases,
  history011State,
  historyDocumentProfiles,
} from "./forge011History";
import "./forge011History.css";

const introductions: Record<string, [string, string]> = {
  "degisim-caginda-avrupa-osmanli": [
    "Dönüşümün izini sür",
    "Bir gelişme seç. Önce koşulu, sonra onu sonuca bağlayan mekanizmayı aç. Kültür, din ve maliye kanıtlarını birbirine karıştırmadan karşılaştır.",
  ],
  "devrimler-caginda-devlet-toplum": [
    "Belgeyi aç, yetkiyi karşılaştır",
    "Ferman, uzlaşma ve anayasa aynı belge değildir. Bir belge seç; güvence ile temsil mekanizmasını ayrı izle. İstersen ikinci belgeyi yanına aç.",
  ],
  "denge-stratejisi": [
    "Değişen ortaklar masası",
    "Dönemi değiştirerek kimin tehdit, kimin o olayda destekçi olduğunu gör. Geçmişteki bir ortaklık, bütün zamanlar için dostluk garantisi midir?",
  ],
  "degisen-sosyoekonomik-hayat": [
    "Üretimden günlük hayata",
    "Ticaret, borç veya üretim desteği seç. Para ve yetkinin hangi yoldan hareket ettiğini adım adım kur; farklı kurumların aynı işi yapmadığını gör.",
  ],
  "yirminci-yuzyil-baslarinda-osmanli": [
    "Olaydan sonraki adıma",
    "Yıllar arasında ilerle. Uzun dönem koşulu, yakın tetikleyiciyi ve sonucu ayrı izle; aynı yıldaki iki gelişmenin farklı taraflara nasıl etki ettiğini karşılaştır.",
  ],
};
const clampIndex = (n: number, max: number) =>
  Number.isFinite(n) ? Math.min(max, Math.max(0, Math.trunc(n))) : 0;

function ChainSymbol({ index, kind }: { index: number; kind: string }) {
  if (kind === "devrimler-caginda-devlet-toplum")
    return (
      <g className="h011-symbol">
        <path d="M-13-18h19l8 8v28h-27z M6-18v9h8 M-7-2H7 M-7 5H7 M-7 12H3" />
      </g>
    );
  if (kind === "degisen-sosyoekonomik-hayat")
    return (
      <g className="h011-symbol">
        <path
          d={
            index === 1
              ? "M-18 16v-26l12 8v-8l12 8v-16h9v34z M-11 7h3 M0 7h3 M10 7h3"
              : "M-18 14h36 M-14 14v-20h28v20 M-19-6l19-12 19 12z M-6-3v13 M6-3v13"
          }
        />
      </g>
    );
  if (kind === "yirminci-yuzyil-baslarinda-osmanli")
    return (
      <g className="h011-symbol">
        <path
          d={
            index === 1
              ? "M-16 16v-33 M-15-16h29l-6 9 6 9h-29"
              : index === 2
                ? "M-17-15h34v30h-34z M-17-5h34 M-8-20v10 M8-20v10 M-7 5h3 M4 5h3"
                : "M-17 14v-22l17-10 17 10v22z M-7 14v-15h14v15"
          }
        />
      </g>
    );
  return (
    <g className="h011-symbol">
      <path
        d={
          index === 0
            ? "M-16 17v-26h11v-9h10v9h11v26z M-7 17V3H7v14"
            : index === 1
              ? "M-16-14h32v28h-32z M-9-6H9 M-9 1H9 M-9 8H3"
              : "M-18 5l11 11 25-29"
        }
      />
    </g>
  );
}

export default function Forge011HistoryLab({ id }: { id: string }) {
  const uid = useId().replaceAll(":", "");
  const [saved, set] = useExploration(`forge011-history:${id}`, {
    case: 0,
    step: 0,
    choice: -1,
    reason: "",
    checked: false,
    compare: false,
    comparison: 3,
  });
  const rows = history011Cases[id];
  if (!rows) return null;
  const view = history011State(id, saved.case, saved.step);
  const current = view.event;
  const choice =
    saved.choice >= 0 &&
    saved.choice < current.choices.length &&
    Number.isInteger(saved.choice)
      ? saved.choice
      : -1;
  const reason = saved.reason.slice(0, 120);
  const [title, introduction] = introductions[id];
  const diplomacy = id === "denge-stratejisi";
  const documents = id === "devrimler-caginda-devlet-toplum";
  const compareIndex = clampIndex(
    saved.comparison,
    historyDocumentProfiles.length - 1,
  );
  const profile = historyDocumentProfiles[view.index];
  const comparison = historyDocumentProfiles[compareIndex];
  const chooseCase = (index: number) =>
    set({ case: index, step: 0, choice: -1, checked: false, reason: "" });
  const name = `${current.name} · ${current.date}`;
  const diagramTitle = `${name}: ${current.chain.slice(0, view.step + 1).join(" → ")}`;
  return (
    <section className="forge011-history-lab" data-forge011={id}>
      <h3>{title}</h3>
      <p>{introduction}</p>
      <HistoryEventChoices
        items={rows}
        selected={view.index}
        onSelect={chooseCase}
      />
      {documents && (
        <div className="h011-controls">
          <div className="h011-compare-control">
            <label className="h011-check">
              <input
                type="checkbox"
                checked={saved.compare}
                onChange={(e) => set({ compare: e.target.checked })}
              />{" "}
              İkinci belgeyle karşılaştır
            </label>
            {saved.compare && (
              <HistoryEventChoices
                label="Karşılaştırılan belge"
                items={historyDocumentProfiles.map((p) => ({
                  date: String(p.year),
                  name: p.name,
                }))}
                selected={compareIndex}
                onSelect={(index) => set({ comparison: index })}
              />
            )}
          </div>
        </div>
      )}
      <p className="h011-evidence">
        <strong>Verilen kanıt</strong>
        <span>{current.evidence}</span>
      </p>
      <div className="h011-diagram">
        <svg
          viewBox={diplomacy ? "0 0 360 270" : "0 0 360 150"}
          role="img"
          aria-labelledby={`${uid}-diagram-title`}
          data-history-diagram
          data-event={view.index}
          data-step={view.step}
        >
          <title id={`${uid}-diagram-title`}>{diagramTitle}</title>
          <defs>
            <marker
              id={`${uid}-arrow`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M1 1L9 5L1 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </marker>
          </defs>
          {diplomacy ? (
            <>
              <path
                className="h011-threat"
                d="M85 110Q110 150 151 185"
                markerEnd={`url(#${uid}-arrow)`}
              />
              <path
                className={`h011-support ${view.step >= 1 ? "is-revealed" : ""}`}
                d="M275 110Q250 150 209 185"
                markerEnd={`url(#${uid}-arrow)`}
              />
              <circle
                className="h011-role h011-role-threat"
                cx="75"
                cy="74"
                r="34"
              />
              <text x="75" y="80" textAnchor="middle">
                Tehdit
              </text>
              <circle
                className={`h011-role ${view.step >= 1 ? "is-revealed" : ""}`}
                cx="285"
                cy="74"
                r="34"
              />
              <text x="285" y="80" textAnchor="middle">
                Destek
              </text>
              <circle
                className={`h011-role ${view.step >= 2 ? "is-revealed" : ""}`}
                cx="180"
                cy="210"
                r="43"
              />
              <text x="180" y="215" textAnchor="middle">
                Osmanlı
              </text>
              <text x="180" y="30" textAnchor="middle">
                {current.year}
              </text>
              <g className="h011-symbol" transform="translate(180 115)">
                <path d="M-25-12h50 M0-28v56 M-18 28h36 M-20-12l-10 23h20z M20-12l-10 23h20z" />
              </g>
            </>
          ) : (
            <>
              {[0, 1].map((i) => (
                <path
                  key={i}
                  className={`h011-link ${view.step > i ? "is-revealed" : ""}`}
                  d={`M${89 + 120 * i} 66H${144 + 120 * i}`}
                  markerEnd={`url(#${uid}-arrow)`}
                />
              ))}
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${60 + 120 * i} 66)`}>
                  <circle
                    className={`h011-role ${view.step >= i ? "is-revealed" : ""}`}
                    r="29"
                  />
                  <ChainSymbol index={i} kind={id} />
                </g>
              ))}
              {["Koşul", "Mekanizma", "Sonuç"].map((label, i) => (
                <text key={label} x={60 + 120 * i} y="121" textAnchor="middle">
                  {label}
                </text>
              ))}
              <text x="180" y="19" textAnchor="middle">
                {current.date}
              </text>
            </>
          )}
        </svg>
        {diplomacy && (
          <dl className="h011-actors">
            <div>
              <dt>Bu olayda tehdit</dt>
              <dd>{current.threat}</dd>
            </div>
            <div>
              <dt>Bu olayda destek veya denge arayışı</dt>
              <dd>
                {view.step >= 1
                  ? current.support
                  : "Destek bağlantısını açarak karşılaştır."}
              </dd>
            </div>
          </dl>
        )}
        <ol className="h011-chain">
          {current.chain.map((label, i) => (
            <li key={label} className={view.step >= i ? "is-revealed" : ""}>
              <strong>{label}</strong>
              <p>
                {view.step >= i
                  ? current.details[i]
                  : "Sonraki bağlantıyı açarak bu halkanın gerekçesini gör."}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <div className="h011-actions">
        <button
          className="secondary"
          type="button"
          disabled={view.step === 0}
          onClick={() => set({ step: view.step - 1, checked: false })}
        >
          Önceki bağlantı
        </button>
        <button
          className="secondary"
          type="button"
          disabled={view.step === 2}
          onClick={() => set({ step: view.step + 1, checked: false })}
        >
          Sonraki bağlantı
        </button>
        <button
          className="text-button"
          type="button"
          onClick={() =>
            set({ step: 0, choice: -1, reason: "", checked: false })
          }
        >
          Bağlantıları yeniden kur
        </button>
      </div>
      {documents && saved.compare && (
        <div className="h011-documents" aria-label="Belgelerin karşılaştırması">
          {[profile, comparison].map((p, i) => (
            <article key={i}>
              <h4>
                {p.year} · {p.name}
              </h4>
              <svg
                viewBox="0 0 240 105"
                role="img"
                aria-label={`${p.name}: ${p.type}; ${p.elected ? "seçimli Mebusan ve atanmış Ayan" : "bu belgeyle seçimli Mebusan kurulmaz"}`}
                data-document-representation={
                  p.elected ? "two-chambers" : "no-chamber"
                }
              >
                <rect
                  className="h011-role is-revealed"
                  x="87"
                  y="8"
                  width="66"
                  height="42"
                  rx="5"
                />
                <path
                  className="h011-symbol"
                  d="M101 20h38 M101 29h38 M101 38h25"
                />
                {p.elected ? (
                  <>
                    <path
                      className="h011-link is-revealed"
                      d="M120 50V65M60 65H180M60 65V79M180 65V79"
                    />
                    <circle
                      className="h011-role is-revealed"
                      cx="60"
                      cy="87"
                      r="11"
                    />
                    <circle
                      className="h011-role is-revealed"
                      cx="180"
                      cy="87"
                      r="11"
                    />
                  </>
                ) : (
                  <path className="h011-link" d="M120 50V92M107 79l26-17" />
                )}
              </svg>
              <dl>
                <div>
                  <dt>Belge türü</dt>
                  <dd>{p.type}</dd>
                </div>
                <div>
                  <dt>Güvence veya konu</dt>
                  <dd>{p.rights}</dd>
                </div>
                <div>
                  <dt>Temsil</dt>
                  <dd>
                    {p.elected
                      ? "Dolaylı seçimli Mebusan ve padişahın atadığı Ayan"
                      : "Bu belgeyle seçimli Mebusan kurulmaz"}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
      <fieldset className="h011-choices">
        <legend>Kanıta en uygun yorum hangisi?</legend>
        {current.choices.map((label, i) => (
          <label key={label}>
            <input
              type="radio"
              name={`${uid}-choice`}
              checked={choice === i}
              onChange={() => set({ choice: i, checked: false })}
            />{" "}
            <span>{label}</span>
          </label>
        ))}
      </fieldset>
      <label className="h011-reason" htmlFor={`${uid}-reason`}>
        Gerekçen
        <textarea
          id={`${uid}-reason`}
          maxLength={120}
          rows={3}
          value={reason}
          placeholder="Kanıttaki hangi bilgi yorumunu destekliyor?"
          onChange={(e) =>
            set({ reason: e.target.value.slice(0, 120), checked: false })
          }
        />
      </label>
      <button
        className="secondary h011-compare"
        type="button"
        disabled={choice < 0 || !reason.trim()}
        onClick={() => set({ checked: true })}
      >
        Yorumumu kanıtla karşılaştır
      </button>
      <div className="h011-result" data-model-result aria-live="polite">
        <strong>{name}</strong>
        <p>
          {view.step === 2
            ? current.conclusion
            : `${view.step + 1}/3 bağlantı açık. ${current.chain[view.step]}: ${current.details[view.step]}`}
        </p>
      </div>
      {saved.checked && choice >= 0 && (
        <div className="h011-feedback" role="status">
          <strong>
            {choice === current.answer
              ? "Yorumun verilen kanıtla uyumlu."
              : "Yorumunu kanıtın sınırıyla yeniden karşılaştır."}
          </strong>
          <p>{current.conclusion}</p>
          <p>{current.limit}</p>
          <p>Gerekçen: {reason}</p>
          <p className="small muted">
            Karşılaştırma seçtiğin yoruma ilişkindir; yazdığın gerekçe otomatik
            olarak puanlanmaz.
          </p>
        </div>
      )}
      <p className="small muted">
        Şemalar ilişkiyi açıklar; ölçekli harita veya değişmez bir başarı
        sıralaması değildir. Keşifler puan ya da konu tamamlanması oluşturmaz.
      </p>
    </section>
  );
}
