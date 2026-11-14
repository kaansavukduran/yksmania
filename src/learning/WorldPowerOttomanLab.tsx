import { worldPowerTurningPoints } from "./worldPowerOttoman";
import { useExploration } from "./useExploration";
import { clampInt } from "./mathModels";
import "./WorldPowerOttomanLab.css";

export default function WorldPowerOttomanLab() {
  const [saved, set] = useExploration("world-power-ottoman", {
    event: 0,
    choice: -1,
    checked: false,
  });
  const index = clampInt(saved.event, 0, worldPowerTurningPoints.length - 1);
  const point = worldPowerTurningPoints[index];
  const choice = clampInt(saved.choice, -1, point.choices.length - 1);
  const correct = choice === point.answer;

  return (
    <div className="world-power-lab concept-model">
      <div className="world-power-intro">
        <h3>Dönüm noktalarının izini sür</h3>
        <p>
          Bir olayı seç. Hedefle elde edilen sonucu karşılaştır; ardından
          kanıtın desteklediği yorumu dene. Çizelge seçilmiş olayların sırasını
          gösterir; aralarındaki her bağlantı bir neden–sonuç ilişkisi değildir.
        </p>
      </div>
      <div className="world-power-workbench">
        <div
          className="world-power-timeline"
          role="group"
          aria-label="Dönüm noktasını seç"
        >
          {worldPowerTurningPoints.map((event, i) => (
            <button
              type="button"
              key={`${event.year}-${event.label}`}
              className={`world-power-event ${i === index ? "is-selected" : ""}`}
              aria-pressed={i === index}
              onClick={() => set({ event: i, choice: -1, checked: false })}
            >
              <span className="world-power-dot" aria-hidden="true" />
              <span className="world-power-event-name">
                {event.year} · {event.label}
              </span>
              <span className="world-power-area">{event.area}</span>
            </button>
          ))}
        </div>
        <section
          className="world-power-detail"
          aria-label="Seçili olayın kanıtı"
        >
          <h4>{point.title}</h4>
          <p className="world-power-actor">{point.actor}</p>
          <dl className="world-power-facts">
            <div>
              <dt>Hedef</dt>
              <dd>{point.goal}</dd>
            </div>
            <div>
              <dt>Elde edilen sonuç</dt>
              <dd>{point.outcome}</dd>
            </div>
          </dl>
          <p className="world-power-boundary">
            <strong>Çıkarımın sınırı:</strong> {point.limit}
          </p>
          <blockquote className="world-power-evidence">
            <strong>İncelenecek kanıt</strong>
            <p>{point.evidence}</p>
          </blockquote>
          <fieldset className="world-power-choices">
            <legend>Bu kanıt hangi yorumu destekler?</legend>
            {point.choices.map((label, i) => (
              <label
                key={`${index}-${i}`}
                className={choice === i ? "is-selected" : ""}
              >
                <input
                  type="radio"
                  name="world-power-interpretation"
                  checked={choice === i}
                  onChange={() => set({ choice: i, checked: false })}
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          <button
            type="button"
            className="button secondary"
            disabled={choice < 0}
            onClick={() => set({ checked: true })}
          >
            Yorumu kontrol et
          </button>
          {saved.checked && choice >= 0 && (
            <div className="world-power-feedback" role="status">
              <strong>
                {correct
                  ? "Yorumun kanıtla uyumlu."
                  : "Yorumu kanıtla yeniden karşılaştır."}
              </strong>
              <p>{point.explanation}</p>
              {!correct && (
                <p>Desteklenen yorum: {point.choices[point.answer]}</p>
              )}
            </div>
          )}
        </section>
      </div>
      <p className="world-power-credit">
        Seçimlerin bu cihazda saklanır. Bu keşif XP, ustalık veya konu tamamlama
        kaydı oluşturmaz; bağımsız sorular Sorular bölümündedir.
      </p>
    </div>
  );
}
