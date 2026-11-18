import { useId } from "react";
import { useExploration } from "./useExploration";
import { HistoryEventChoices } from "./HistoryEventChoices";
import { history012Events, history012State } from "./forge012History";
import "./forge012History.css";

function EvidenceMark({ stage, lesson }: { stage: number; lesson: string }) {
  if (stage === 0)
    return (
      <g className="h012-symbol">
        <path d="M-20 18V-18h30l10 10v26z M10-18v10h10 M-11-3H9 M-11 5H9 M-11 13H3" />
      </g>
    );
  if (stage === 1 && lesson === "kuresel-savaslar-arasinda-turkiye-dunya")
    return (
      <g className="h012-symbol">
        <path d="M-25 18H25 M-20 12V-2h10v14 M-5 12v-30H5v30 M10 12V-9h10v21" />
      </g>
    );
  if (stage === 1)
    return (
      <g className="h012-symbol">
        <path d="M-25-9L0-24 25-9z M-19-3v23 M-6-3v23 M7-3v23 M20-3v23 M-25 23h50" />
      </g>
    );
  return (
    <g className="h012-symbol">
      <path d="M-22 0l15 17 30-34" />
    </g>
  );
}

export default function Forge012HistoryLab({ id }: { id: string }) {
  const uid = useId().replaceAll(":", "");
  const [saved, set] = useExploration(`forge012-history:${id}`, {
    event: 0,
    step: 0,
    choice: -1,
    reason: "",
    checked: false,
  });
  const state = history012State(id, saved.event, saved.step);
  if (!state) return null;
  const { event, index, step } = state;
  const rows = history012Events[id];
  const choice =
    Number.isInteger(saved.choice) &&
    saved.choice >= 0 &&
    saved.choice < event.choices.length
      ? saved.choice
      : -1;
  const reason = saved.reason.slice(0, 120);
  const selectEvent = (next: number) =>
    set({ event: next, step: 0, choice: -1, reason: "", checked: false });
  const selectStep = (next: number) => set({ step: next, checked: false });
  const xFor = (at: number) => 65 + at * (630 / Math.max(1, rows.length - 1));
  const nodeX = [140, 380, 620];
  return (
    <section className="forge012-history-lab" data-forge012={id}>
      <h3>Belgeden sonuca git</h3>
      <p>
        Bir olay seç; koşulu, alınan kararı ve desteklenen sonucu sırayla aç.
        Sonra kanıtın hangi yoruma izin verdiğini kendi gerekçenle karşılaştır.
      </p>
      <HistoryEventChoices
        items={rows}
        selected={index}
        onSelect={selectEvent}
      />
      <div className="h012-evidence">
        <p className="h012-meta">
          {event.date} · {event.kind}
        </p>
        <h4>{event.name}</h4>
        <p>{event.evidence}</p>
        <p>
          <strong>Aktör:</strong> {event.actor}
        </p>
      </div>
      <figure className="h012-figure">
        <svg
          viewBox="0 0 760 360"
          role="img"
          aria-labelledby={`${uid}-title ${uid}-desc`}
        >
          <title id={`${uid}-title`}>
            {event.name}: {state.revealed.join(" → ")}
          </title>
          <desc id={`${uid}-desc`}>
            Üstte tarih sırası ve seçilen olay işareti. Altta yalnız açılan
            aşamaların bağlantıları çizilir. Bütün açıklamalar şeklin altında
            metin olarak da bulunur.
          </desc>
          <path className="h012-track" d="M65 65H695" />
          {rows.map((r, i) => (
            <g key={r.name} transform={`translate(${xFor(i)},65)`}>
              <circle className="h012-date-node" r="8" />
              <text className="h012-year" y="40" textAnchor="middle">
                {r.year}
              </text>
            </g>
          ))}
          <circle
            className="h012-current"
            data-history012-selected={event.name}
            cx={xFor(index)}
            cy="65"
            r="16"
          />
          <g data-history012-event={event.name}>
            {nodeX.map((x, i) => (
              <g key={i} transform={`translate(${x},235)`}>
                <rect
                  className="h012-card"
                  x="-85"
                  y="-65"
                  width="170"
                  height="130"
                  rx="18"
                />
                {i <= step ? (
                  <g data-history012-stage={i}>
                    <circle className="h012-revealed" r="45" />
                    <EvidenceMark stage={i} lesson={id} />
                  </g>
                ) : (
                  <circle className="h012-unopened" r="20" />
                )}
                <text className="h012-stage-label" y="100" textAnchor="middle">
                  {["Koşul", "Karar / araç", "Sonuç"][i]}
                </text>
              </g>
            ))}
            {step >= 1 && (
              <path
                className="h012-link"
                data-history012-link="1"
                d="M230 235H285 M275 226l10 9-10 9"
              />
            )}
            {step >= 2 && (
              <path
                className="h012-link"
                data-history012-link="2"
                d="M450 235H505 M495 226l10 9-10 9"
              />
            )}
          </g>
        </svg>
        <figcaption>
          Tarih sırası şematiktir; yatay aralıklar yıl farkını göstermez. Asıl
          kanıt aşağıdaki metindedir.
        </figcaption>
      </figure>
      <ol className="h012-chain" aria-label="Açılan kanıt bağlantıları">
        {event.chain.slice(0, step + 1).map((label, i) => (
          <li key={label}>
            <h4>{label}</h4>
            <p>{event.details[i]}</p>
          </li>
        ))}
      </ol>
      <div className="h012-actions">
        <button
          type="button"
          className="button secondary"
          disabled={step === 0}
          onClick={() => selectStep(step - 1)}
        >
          Önceki kanıt
        </button>
        <button
          type="button"
          className="button secondary"
          disabled={step === 2}
          onClick={() => selectStep(step + 1)}
        >
          Sonraki kanıt
        </button>
      </div>
      <div
        className="h012-result"
        data-model-result
        role="status"
        aria-live="polite"
      >
        <strong>
          {event.name} · {event.date}
        </strong>
        <p>
          {event.chain[step]}: {event.details[step]}
        </p>
        {step === 2 && (
          <p>
            <strong>Çıkarım sınırı:</strong> {event.limit}
          </p>
        )}
      </div>
      <fieldset className="h012-prediction">
        <legend>Bu kanıt neyi destekliyor?</legend>
        {event.choices.map((label, i) => (
          <label key={label}>
            <input
              type="radio"
              name={`${uid}-prediction`}
              checked={choice === i}
              onChange={() => set({ choice: i, checked: false })}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>
      <label className="h012-reason" htmlFor={`${uid}-reason`}>
        Kanıttan gerekçen
        <textarea
          id={`${uid}-reason`}
          value={reason}
          maxLength={120}
          rows={3}
          onChange={(e) =>
            set({ reason: e.target.value.slice(0, 120), checked: false })
          }
          placeholder="Hangi tarih, kurum veya sözcük yorumunu destekliyor?"
        />
      </label>
      <div className="h012-actions">
        <button
          type="button"
          className="button secondary"
          disabled={choice < 0}
          onClick={() => set({ checked: true })}
        >
          Yorumumu kanıtla karşılaştır
        </button>
      </div>
      {saved.checked && choice >= 0 && (
        <div className="h012-feedback" role="status">
          <strong>
            {choice === event.answer
              ? "Yorumun verilen kanıtla uyumlu."
              : "Tarih, kurum ve çıkarım sınırını yeniden karşılaştır."}
          </strong>
          <p>
            Desteklenen yorum: {event.choices[event.answer]}. {event.limit}
          </p>
          <p>
            Yazdığın gerekçe otomatik puanlanmaz; kanıtla karşılaştırman için
            saklanır.
          </p>
        </div>
      )}
    </section>
  );
}
