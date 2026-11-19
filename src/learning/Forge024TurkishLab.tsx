import { useId } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  forge024TurkishTopics,
  turkishDefaults024,
  multiContexts024,
  multiScene024,
  topicContexts024,
  topicScene024,
  visualContexts024,
  visualScene024,
} from "./forge024Turkish";
import "./forge024Turkish.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
function safe(value: number, max: number) {
  return Number.isInteger(value) && value >= 0 && value < max ? value : 0;
}
const number = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(n);
export default function Forge024TurkishLab({ lessonId }: { lessonId: string }) {
  const uid = useId();
  if (!Object.hasOwn(forge024TurkishTopics, lessonId))
    throw new RangeError("Bu konu için atölye yok.");
  const kind = Object.keys(forge024TurkishTopics).indexOf(lessonId),
    contexts =
      kind === 0
        ? multiContexts024()
        : kind === 1
          ? topicContexts024()
          : visualContexts024();
  const storageKey = `forge024-turkish:${lessonId}`;
  const { state } = useApp();
  const raw = state.explorations[storageKey] ?? {};
  const [saved, save] = useExploration(storageKey, {
    ...turkishDefaults024,
    caseId: contexts[0].id,
  });
  const caseId = contexts.some((c) => c.id === saved.caseId)
      ? saved.caseId
      : contexts[0].id,
    question = safe(saved.question, 3),
    candidate = safe(saved.candidate, 5),
    selected = safe(saved.selected, kind === 0 ? 5 : 4),
    metric = safe(saved.metric, 2),
    period = safe(saved.period, 3),
    claim = safe(saved.claim, 3);
  const multi = kind === 0 ? multiScene024(caseId, question, selected) : null,
    topic = kind === 1 ? topicScene024(caseId, candidate, selected) : null,
    visual = kind === 2 ? visualScene024(caseId, metric, period, claim) : null;
  const guesses = multi
    ? [
        { value: "yes", label: "Kanıt sağlar" },
        { value: "no", label: "Kanıt sağlamaz" },
      ]
    : topic
      ? [
          { value: "uygun", label: "Uygun konu" },
          { value: "geniş", label: "Çok geniş" },
          { value: "dar", label: "Çok dar" },
          { value: "dışarıda", label: "Metin dışı" },
          { value: "yargı", label: "Bir yargı" },
        ]
      : claim === 0
        ? [
            { value: "single", label: "Tek lider" },
            { value: "tie", label: "Eşit liderler" },
          ]
        : claim === 1
          ? [
              { value: "equal", label: "Hepsi eşit" },
              { value: "different", label: "Eşit değil" },
            ]
          : [
              { value: "unknown", label: "Neden verilmedi" },
              { value: "known", label: "Neden kanıtlandı" },
            ];
  const expected = multi
    ? multi.valid
      ? "yes"
      : "no"
    : topic
      ? topic.candidate.kind
      : claim === 0
        ? visual!.leaders.length === 1
          ? "single"
          : "tie"
        : claim === 1
          ? visual!.allEqual
            ? "equal"
            : "different"
          : "unknown";
  const rawFields: readonly (keyof typeof turkishDefaults024)[] =
    kind === 0
      ? ["caseId", "question", "selected"]
      : kind === 1
        ? ["caseId", "candidate", "selected"]
        : ["caseId", "metric", "period", "claim"];
  const rawTypesValid = rawFields.every(
    (key) =>
      !Object.hasOwn(raw, key) ||
      typeof raw[key] === typeof turkishDefaults024[key],
  );
  const guess = guesses.some((g) => g.value === saved.guess) ? saved.guess : "",
    selectionValid =
      rawTypesValid &&
      caseId === saved.caseId &&
      (kind === 0
        ? saved.question === question && saved.selected === selected
        : kind === 1
          ? saved.candidate === candidate && saved.selected === selected
          : saved.metric === metric &&
            saved.period === period &&
            saved.claim === claim),
    reason =
      selectionValid && typeof saved.reason === "string"
        ? saved.reason.slice(0, 120)
        : "",
    show = saved.show === true && selectionValid && !!guess && !!reason.trim();
  const scene = multi ?? topic ?? visual!;
  const set = (patch: Parameters<typeof save>[0]) =>
    save({
      caseId,
      question,
      candidate,
      selected,
      metric,
      period,
      claim,
      guess,
      ...patch,
      reason:
        typeof patch.reason === "string" ? patch.reason.slice(0, 120) : reason,
    });
  const change = (patch: Parameters<typeof set>[0]) =>
    set({ selected: 0, ...patch, guess: "", reason: "", show: false });
  const select = (
    label: string,
    values: string[],
    value: number,
    key: "question" | "candidate" | "metric" | "period" | "claim",
  ) => (
    <label htmlFor={`${uid}-${key}`}>
      {label}
      <ChoiceSelect
        id={`${uid}-${key}`}
        value={value}
        onChange={(e) => change({ [key]: Number(e.target.value) })}
      >
        {values.map((s, i) => (
          <option key={s} value={i}>
            {s}
          </option>
        ))}
      </ChoiceSelect>
    </label>
  );
  const textScene = multi ?? topic;
  return (
    <section className="turkish024-lab" data-forge024={lessonId}>
      <h3>
        {
          [
            "Her soruya ayrı kanıt",
            "Konu adayının kapsamını sına",
            "Miktar ile oranı karşılaştır",
          ][kind]
        }
      </h3>
      <p>
        {kind === 0
          ? "Metni oku, soruyu değiştir ve hangi cümlenin kanıt olduğunu incele. Yeni soruyu önceki yanıtından bağımsız çöz."
          : kind === 1
            ? "Aday konuyu bütün cümlelere uygula. Tek bir cümleye uyması bütün metin için yeterli değildir."
            : "Özgün kayıtların ölçüsünü ve dönemini değiştir. Miktar ile kapasiteye göre oran aynı sıralamayı vermek zorunda değildir."}
      </p>
      <div className="turkish024-controls">
        <label htmlFor={`${uid}-case`}>
          İncelenen örnek
          <ChoiceSelect
            id={`${uid}-case`}
            value={caseId}
            onChange={(e) =>
              change({
                caseId: e.target.value,
                question: 0,
                candidate: 0,
                period: 0,
                metric: 0,
                claim: 0,
              })
            }
          >
            {contexts.map((c) => (
              <option value={c.id} key={c.id}>
                {c.label}
              </option>
            ))}
          </ChoiceSelect>
        </label>
        {multi &&
          select("İncelenen soru", multi.questionLabels, question, "question")}
        {topic &&
          select("Konu adayı", topic.candidates, candidate, "candidate")}
        {visual && (
          <>
            {select("Ölçü", ["Katılım kaydı", "Doluluk (%)"], metric, "metric")}
            {select("Dönem", visual.periods, period, "period")}
            {select(
              "İncelenen iddia",
              [
                "Tek lider var mı?",
                "Üç değer eşit mi?",
                "Kesin neden biliniyor mu?",
              ],
              claim,
              "claim",
            )}
          </>
        )}
      </div>
      {textScene && (
        <>
          <fieldset className="turkish024-text">
            <legend>Tam metin: cümleyi seç</legend>
            <ol>
              {textScene.sentences.map((s, i) => (
                <li key={s}>
                  <button
                    className="secondary"
                    aria-pressed={selected === i}
                    onClick={() => change({ selected: i })}
                  >
                    <strong>{i + 1}.</strong> {s}
                  </button>
                </li>
              ))}
            </ol>
          </fieldset>
          <p className="turkish024-focus">
            <strong>{multi ? "Soru" : "Konu adayı"}: </strong>
            {multi ? multi.ask.text : topic!.candidate.text}
          </p>
          <svg
            viewBox={`0 0 270 ${textScene.sentences.length * 72 + 40}`}
            role="img"
            aria-labelledby={`${uid}-title ${uid}-desc`}
            data-evidence-graph
            data-selected={selected}
            data-revealed={show}
          >
            <title id={`${uid}-title`}>
              {multi
                ? "Soruyla cümleler arasındaki kanıt bağları"
                : "Konu adayı ile cümlelerin kapsam ilişkisi"}
            </title>
            <desc id={`${uid}-desc`}>
              {show
                ? `Uygun bağ kuran cümleler: ${(multi ? multi.ask.references : topic!.candidate.references).map((i) => i + 1).join(", ") || "yok"}. Tam metin yukarıda, ilişki açıklaması aşağıdadır.`
                : "Numaralar tam metindeki cümleleri gösterir. Açıklama açılınca kanıt bağları görünür. Seçili cümle kalın çizgiyle görünür."}
            </desc>
            {textScene.sentences.map((_, i) => {
              const y = 40 + i * 72,
                match =
                  show &&
                  (multi
                    ? multi.ask.references
                    : topic!.candidate.references
                  ).includes(i);
              return (
                <g key={i} data-sentence={i} data-support={match}>
                  <path
                    d={`M87 ${y} L179 ${textScene.sentences.length * 36 + 4}`}
                    fill="none"
                    stroke={match ? "var(--accent)" : "var(--muted)"}
                    strokeWidth={match ? 4 : 1.5}
                    strokeDasharray={match ? undefined : "5 6"}
                  />
                  <circle
                    cx="63"
                    cy={y}
                    r="23"
                    fill="var(--surface)"
                    stroke="var(--text)"
                    strokeWidth={selected === i ? 4 : 1.5}
                  />
                  <text x="63" y={y + 8} textAnchor="middle">
                    {i + 1}
                  </text>
                </g>
              );
            })}
            <rect
              x="179"
              y={textScene.sentences.length * 36 - 21}
              width="48"
              height="50"
              rx="12"
              fill="var(--surface)"
              stroke="var(--text)"
              strokeWidth="2"
            />
            <text
              x="203"
              y={textScene.sentences.length * 36 + 12}
              textAnchor="middle"
            >
              ?
            </text>
          </svg>
          <p>
            Seçili cümle: <strong>{selected + 1}</strong>.{" "}
            {textScene.sentences[selected]}
          </p>
          {show && (
            <div className="turkish024-evidence" data-evidence-text>
              <p>
                {multi
                  ? multi.valid
                    ? "Seçtiğin cümle bu soru için doğrudan kanıt sağlar."
                    : "Seçtiğin cümle bu sorunun doğrudan kanıtı değildir."
                  : `Adayın ilişki kurduğu cümle sayısı: ${topic!.covered}/${topic!.sentences.length}. Kapsama eklenen veya dışlanan alanı da incele.`}
              </p>
              <p>
                Kanıt cümleleri:{" "}
                {(multi ? multi.ask.references : topic!.candidate.references)
                  .map((i) => i + 1)
                  .join(", ") || "yok"}
                .
              </p>
            </div>
          )}
        </>
      )}
      {visual && (
        <>
          <p>{visual.assumptions}</p>
          <div
            className="turkish024-records"
            aria-label="Tam kayıtlar"
            data-records
          >
            {visual.rows.map((r) => (
              <article key={r.code}>
                <h4>
                  {r.code}: {r.label}
                </h4>
                <dl>
                  <div>
                    <dt>Kapasite</dt>
                    <dd>{r.capacity} yer</dd>
                  </div>
                  <div>
                    <dt>Katılım</dt>
                    <dd>{r.attendance} kayıt</dd>
                  </div>
                  <div>
                    <dt>Doluluk</dt>
                    <dd>%{number(100 * r.ratio)}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <p>
            <strong>Gösterilen ölçü:</strong> {visual.metric}. {visual.period}.
            Çizimde ortak başlangıç0, üst sınır{metric === 0 ? visual.max : 100}{" "}
            {visual.unit}.
          </p>
          <svg
            viewBox="0 0 270 350"
            role="img"
            aria-labelledby={`${uid}-title ${uid}-desc`}
            data-record-chart
            data-metric={metric}
            data-period={period}
          >
            <title id={`${uid}-title`}>
              {`${visual.label}: ${visual.metric}`}
            </title>
            <desc id={`${uid}-desc`}>
              {visual.rows
                .map((r) => `${r.code}: ${number(r.value)} ${visual.unit}`)
                .join(". ")}
              . Kesin değerler yukarıdaki yazılı kayıtta da yer alır. Ortak
              ölçek sıfırdan başlar.
            </desc>
            {visual.rows.map((r, i) => (
              <g key={r.code} data-record={r.code} data-value={r.value}>
                <text x="20" y={38 + i * 96}>
                  {r.code}
                </text>
                <text x="250" y={38 + i * 96} textAnchor="end">
                  {number(r.value)}
                  {metric === 1 ? "%" : ""}
                </text>
                <rect
                  x="20"
                  y={52 + i * 96}
                  width="230"
                  height="22"
                  rx="4"
                  fill="var(--surface)"
                  stroke="var(--muted)"
                />
                <rect
                  x="20"
                  y={52 + i * 96}
                  width={(230 * r.value) / (metric === 0 ? visual.max : 100)}
                  height="22"
                  rx="4"
                  fill="var(--accent)"
                />
                <path
                  d={`M20 ${46 + i * 96} V${80 + i * 96}`}
                  stroke="var(--text)"
                />
              </g>
            ))}
            <text x="20" y="334">
              0
            </text>
            <text x="250" y="334" textAnchor="end">
              {number(metric === 0 ? visual.max : 100)}
            </text>
          </svg>
          <p className="turkish024-focus">
            <strong>İddia:</strong> {visual.statement}
          </p>
        </>
      )}
      <div className="turkish024-response">
        <label htmlFor={`${uid}-guess`}>
          Karar tahminin
          <ChoiceSelect
            id={`${uid}-guess`}
            value={guess}
            onChange={(e) => set({ guess: e.target.value, show: false })}
          >
            <option value="">Seç</option>
            {guesses.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </ChoiceSelect>
        </label>
        <label htmlFor={`${uid}-reason`}>
          Kanıtın
          <textarea
            id={`${uid}-reason`}
            rows={3}
            maxLength={120}
            value={reason}
            onChange={(e) => set({ reason: e.target.value, show: false })}
            placeholder="Cümleyi veya hesabı kendi sözlerinle açıkla."
          />
        </label>
        <div className="turkish024-actions">
          <button
            disabled={!guess || !reason.trim()}
            onClick={() => set({ show: true })}
          >
            Tahminimi karşılaştır
          </button>
          <button
            className="secondary"
            onClick={() =>
              set({ ...turkishDefaults024, caseId: contexts[0].id })
            }
          >
            Keşfi sıfırla
          </button>
        </div>
      </div>
      {show && (
        <div className="turkish024-result" data-model-result>
          <p role="status">
            {guess === expected
              ? "Tahminin modelin kararıyla aynı yönde."
              : "Tahmininle modelin kararı farklı; kanıt bağını yeniden incele."}
          </p>
          <p>
            <strong>{scene.result}</strong>
          </p>
          <p>{scene.explanation}</p>
          {multi && (
            <p>
              Yeni soruda önceki cevabı gerekçe yapma; yeni kökü kendi
              kanıtlarıyla ele al.
            </p>
          )}
          {topic && (
            <p>
              Cümle kapsamı tek başına yeterli değildir; adayda metin dışı alan
              veya bir yargı var mı, bunu da denetle.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
