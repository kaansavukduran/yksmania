import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  buildEkFiilScene,
  copulaKinds,
  type CopulaForm,
  type CopulaMode,
  type CopulaPerson,
} from "./forge014Turkish";
import "./forge014Turkish.css";

export default function Forge014TurkishLab({ lessonId }: { lessonId: string }) {
  const uid = useId();
  const [saved, set] = useExploration("forge014-turkish:" + lessonId, {
    mode: "nominal",
    form: "past",
    person: "o",
    negative: false,
    show: false,
    prediction: "",
    reason: "",
    compared: false,
  });
  if (lessonId !== "ek-fiil") return null;
  const mode: CopulaMode = saved.mode === "verbal" ? "verbal" : "nominal";
  const form: CopulaForm = (
    ["present", "past", "reported", "conditional"] as string[]
  ).includes(saved.form)
    ? (saved.form as CopulaForm)
    : "past";
  const person: CopulaPerson =
    saved.person === "ben" || saved.person === "sen" ? saved.person : "o";
  const scene = buildEkFiilScene(mode, form, person, saved.negative);
  function change(value: Partial<typeof saved>) {
    set({ ...value, prediction: "", reason: "", compared: false });
  }
  const prediction = copulaKinds.includes(
    saved.prediction as (typeof copulaKinds)[number],
  )
    ? saved.prediction
    : "";
  return (
    <section
      className="grammar014-lab"
      data-forge014={lessonId}
      aria-labelledby={`${uid}-title`}
    >
      <h3 id={`${uid}-title`}>Cümlenin çekim katmanlarını kur</h3>
      <p>
        Tabanı, çekimi ve kişiyi değiştir. Önce tam cümleyi okuyup kararını
        gerekçelendir; sonra parçaları açarak denetle. Ek fiil bir fiil türetme
        eki değildir.
      </p>
      <div className="grammar014-controls">
        <label htmlFor={`${uid}-base`}>Hedef sözün tabanı</label>
        <select
          id={`${uid}-base`}
          value={mode}
          onChange={(e) => change({ mode: e.target.value })}
        >
          <option value="nominal">Ad soylu: hazır</option>
          <option value="verbal">Fiil: gel-</option>
        </select>
        <label htmlFor={`${uid}-form`}>Çekim katmanı</label>
        <select
          id={`${uid}-form`}
          value={form}
          onChange={(e) => change({ form: e.target.value })}
        >
          <option value="present">Güncel yargı</option>
          <option value="past">İdi: geçmiş / hikâye</option>
          <option value="reported">İmiş: dolaylı aktarım / rivayet</option>
          <option value="conditional">İse: koşul / şart</option>
        </select>
        <label htmlFor={`${uid}-person`}>Kişi</label>
        <select
          id={`${uid}-person`}
          value={person}
          onChange={(e) => change({ person: e.target.value })}
        >
          <option value="ben">Ben</option>
          <option value="sen">Sen</option>
          <option value="o">O</option>
        </select>
        <label className="grammar014-check" htmlFor={`${uid}-negative`}>
          <input
            id={`${uid}-negative`}
            type="checkbox"
            checked={saved.negative}
            onChange={(e) => change({ negative: e.target.checked })}
          />
          Olumsuz yargı kur
        </label>
      </div>
      <div className="grammar014-sentence" aria-label="Kurulan cümle">
        <p>{scene.sentence}</p>
        <p>
          Hedef söz: <strong>{scene.target}</strong>
        </p>
      </div>
      <fieldset>
        <legend>Önce sen çözümle</legend>
        <label htmlFor={`${uid}-prediction`}>Yapı tahminin</label>
        <select
          id={`${uid}-prediction`}
          value={prediction}
          onChange={(e) => set({ prediction: e.target.value, compared: false })}
        >
          <option value="">Bir açıklama seç</option>
          {copulaKinds.map((kind) => (
            <option key={kind} value={kind}>
              {kind}
            </option>
          ))}
        </select>
        <p data-selected-prediction>
          Seçili tahmin: {prediction || "Henüz seçilmedi"}
        </p>
        <label htmlFor={`${uid}-reason`}>Cümleden gerekçen</label>
        <textarea
          id={`${uid}-reason`}
          rows={3}
          maxLength={120}
          value={saved.reason}
          onChange={(e) =>
            set({ reason: e.target.value.slice(0, 120), compared: false })
          }
        />
        <button
          className="primary"
          disabled={!prediction || !saved.reason.trim()}
          onClick={() => set({ compared: true, show: true })}
        >
          Tahminimi karşılaştır
        </button>
        {saved.compared && (
          <div className="grammar014-feedback" role="status" data-feedback>
            <strong>
              {prediction === scene.kind
                ? "Seçimin bu cümleyle uyumlu."
                : "Seçimini yeniden incele."}
            </strong>
            <p>{scene.reason}</p>
            <p>
              Gerekçeni bu parçalarla kendin karşılaştır. Bir etiketi seçmek
              açıklamanın doğruluğunu otomatik ölçmez.
            </p>
          </div>
        )}
      </fieldset>
      <button
        className="secondary"
        aria-pressed={saved.show}
        onClick={() => set({ show: !saved.show })}
      >
        Parçaları {saved.show ? "gizle" : "göster"}
      </button>
      <div
        className="grammar014-model"
        aria-label="Tabandan kişiye çekim sırası"
      >
        <svg
          viewBox={`0 0 640 ${scene.parts.length * 72 + 16}`}
          role="img"
          aria-labelledby={`${uid}-diagram-title ${uid}-diagram-desc`}
        >
          <title id={`${uid}-diagram-title`}>
            {scene.target}: katman sırası
          </title>
          <desc id={`${uid}-diagram-desc`}>
            {scene.parts.map((p) => `${p.form}: ${p.role}`).join("; ")}. Oklar
            parçaların sözcükteki eklenme sırasını gösterir; genişlikler zaman
            veya önem ölçüsü değildir.
          </desc>
          {scene.parts.map((part, i) => (
            <g key={i} data-copula-layer={part.kind} data-form={part.form}>
              {i > 0 && (
                <path
                  d={`M320 ${i * 72 - 13} V${i * 72 + 6} m-6 -6 6 6 6 -6`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              )}
              <rect
                x={48}
                y={i * 72 + 10}
                width={544}
                height={46}
                rx={8}
                fill="var(--surface)"
                stroke={
                  part.kind === "copula"
                    ? "var(--accent)"
                    : part.kind === "first"
                      ? "var(--mint)"
                      : "var(--text)"
                }
                strokeWidth={part.kind === "copula" ? 4 : 2}
              />
              <text
                x={320}
                y={i * 72 + 41}
                textAnchor="middle"
                fill="currentColor"
                fontSize="27"
              >
                {saved.show ? part.form : `${i + 1}. katman`}
              </text>
            </g>
          ))}
        </svg>
        {saved.show && (
          <>
            <ol className="grammar014-parts">
              {scene.parts.map((part, i) => (
                <li key={i} data-model-part={part.kind}>
                  <strong>{part.form}</strong>
                  <span>{part.role}</span>
                </li>
              ))}
            </ol>
            <div className="grammar014-result" data-model-result>
              <h4>{scene.kind}</h4>
              <p>
                Çekim: <strong>{scene.tense}</strong>
              </p>
              <p>Hedef söz: {scene.target}</p>
              <ul>
                {scene.evidence.map((evidence) => (
                  <li key={evidence}>{evidence}</li>
                ))}
              </ul>
            </div>
          </>
        )}
        {!saved.show && (
          <p data-model-result>
            Çözümleme kapalı. Cümleyi incele; karşılaştırdığında veya parçaları
            açtığında kanıtı görebilirsin.
          </p>
        )}
      </div>
      <details className="grammar014-boundary">
        <summary>Bir de -dır ile karşılaştır</summary>
        <p>
          “Arayanın aktardığına göre Deniz geliyormuş.”: gel-iyor-muş, şimdiki
          zamanın rivayeti. “Deniz geliyordur; yalnız tahmin ediyorum.”:
          gel-iyor-dur, bu bağlamda tahmin bildirir; -dır tek başına birleşik
          çekim yapmaz.
        </p>
        <p>
          Bu model hazır ve gel- tabanlarıyla 48 çekim kurar. Bütün düzensiz ses
          değişimlerini veya her sözcüğü otomatik çözümleyen bir dil motoru
          değildir. İmiş biçiminin anlamını ve zamanı her yeni cümlede kendi
          bağlamıyla denetle.
        </p>
      </details>
      <p>
        Keşif seçimleri bu cihazda saklanır. Bu etkileşim doğru cevap, XP veya
        konuyu tamamladın kaydı oluşturmaz.
      </p>
    </section>
  );
}
