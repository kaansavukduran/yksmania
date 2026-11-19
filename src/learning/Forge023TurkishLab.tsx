import { useId } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  answerContexts023,
  answerScene023,
  interviewContexts023,
  interviewScene023,
  turkishDefaults023,
  forge023TurkishTopics,
} from "./forge023Turkish";
import "./forge023Turkish.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

export default function Forge023TurkishLab({ lessonId }: { lessonId: string }) {
  const uid = useId();
  if (!Object.hasOwn(forge023TurkishTopics, lessonId))
    throw new RangeError("Bu konu için atölye yok.");
  const isAnswer = lessonId === "paragrafta-soru-cevap",
    contexts = isAnswer ? answerContexts023() : interviewContexts023();
  const storageKey = `forge023-turkish:${lessonId}`;
  const { state } = useApp();
  const raw = state.explorations[storageKey] ?? {};
  const [saved, save] = useExploration(storageKey, {
    ...turkishDefaults023,
    caseId: contexts[0].id,
  });
  const caseId = contexts.some((c) => c.id === saved.caseId)
    ? saved.caseId
    : contexts[0].id;
  const choice =
    Number.isInteger(saved.choice) &&
    saved.choice >= 0 &&
    saved.choice < (isAnswer ? 5 : 3)
      ? saved.choice
      : 0;
  const selected =
    Number.isInteger(saved.selected) &&
    saved.selected >= 0 &&
    saved.selected < 5
      ? saved.selected
      : 0;
  const turn =
    Number.isInteger(saved.turn) && saved.turn >= 0 && saved.turn <= 2
      ? saved.turn
      : 0;
  const answer = isAnswer ? answerScene023(caseId, choice, selected) : null;
  const interview = !isAnswer ? interviewScene023(caseId, choice, turn) : null;
  const scene = answer ?? interview!;
  const rawFields: readonly (keyof typeof turkishDefaults023)[] = isAnswer
    ? ["caseId", "choice", "selected"]
    : ["caseId", "choice", "turn"];
  const selectionValid =
    rawFields.every(
      (key) =>
        !Object.hasOwn(raw, key) ||
        typeof raw[key] === typeof turkishDefaults023[key],
    ) &&
    saved.caseId === caseId &&
    saved.choice === choice &&
    (isAnswer ? saved.selected === selected : saved.turn === turn);
  const guess = scene.options.includes(saved.guess) ? saved.guess : "",
    reason = selectionValid ? saved.reason.slice(0, 120) : "";
  const canRead = isAnswer || turn >= 1,
    compared =
      canRead &&
      selectionValid &&
      saved.compared === true &&
      Boolean(guess && reason.trim()),
    revealed = canRead && selectionValid && (saved.show === true || compared);
  const set = (patch: Parameters<typeof save>[0]) =>
    save({
      caseId,
      choice,
      selected,
      turn,
      guess,
      compared: selectionValid && saved.compared === true,
      show: selectionValid && saved.show === true,
      ...patch,
      reason:
        typeof patch.reason === "string" ? patch.reason.slice(0, 120) : reason,
    });
  const change = (patch: Parameters<typeof set>[0]) =>
    set({
      ...patch,
      selected: 0,
      turn: 0,
      guess: "",
      reason: "",
      compared: false,
      show: false,
    });
  const advance = (next: number) =>
    set({ turn: next, guess: "", reason: "", compared: false, show: false });
  return (
    <section className="turkish023-lab" data-forge023={lessonId}>
      <h3>{isAnswer ? "Soruyu kanıtına bağla" : "İki sesi izle"}</h3>
      <p>
        {isAnswer
          ? "Tam metni oku. Soruyu ve kanıt cümlesini değiştir; hangi bilgi var, hangi alan boş?"
          : "İlk yanıtı oku. Takip sorusunu seç ve yeni yanıtı aç. Soru hangi boşluğu doldurdu?"}
      </p>
      <label htmlFor={`${uid}-context`}>
        {isAnswer ? "İncelenen metin" : "İncelenen görüşme"}
      </label>
      <ChoiceSelect
        id={`${uid}-context`}
        value={caseId}
        onChange={(e) => change({ caseId: e.target.value, choice: 0 })}
      >
        {contexts.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </ChoiceSelect>
      <p>
        Seçili örnek: <strong>{scene.label}</strong>
      </p>
      {answer && (
        <div className="turkish023-model">
          <p>{answer.context}</p>
          <h4>Tam metin</h4>
          <p className="turkish023-passage">{answer.sentences.join(" ")}</p>
          <label htmlFor={`${uid}-question`}>İncelenen soru</label>
          <ChoiceSelect
            id={`${uid}-question`}
            value={choice}
            onChange={(e) => change({ choice: Number(e.target.value) })}
          >
            {answer.questionLabels.map((q, i) => (
              <option key={q} value={i}>
                {q}
              </option>
            ))}
          </ChoiceSelect>
          <p className="turkish023-question">
            <strong>Soru:</strong> {answer.ask.text}
          </p>
          <fieldset>
            <legend>Kanıt cümlesini seç</legend>
            <div className="turkish023-sentences">
              {answer.sentences.map((s, i) => (
                <button
                  className="secondary"
                  aria-pressed={selected === i}
                  key={s}
                  onClick={() => set({ selected: i })}
                >
                  <span>{i + 1}. cümle</span>
                  <span>{s}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <svg
            viewBox="0 0 320 240"
            role="img"
            aria-labelledby={`${uid}-diagram-title ${uid}-diagram-desc`}
            data-answer-graph
            data-question={choice}
            data-evidence={
              revealed ? answer.ask.references.join(",") : "hidden"
            }
          >
            <title id={`${uid}-diagram-title`}>
              Metinden soruya kanıt bağı
            </title>
            <desc id={`${uid}-diagram-desc`}>
              {revealed
                ? answer.evidence.length
                  ? `Soruya ${answer.evidence.map((e) => `${e.index + 1}. cümle`).join(" ve ")} kanıt olur.`
                  : "Bu soru için metinde yeterli bilgi yok."
                : "Numaralar tam metindeki cümleleri gösterir. Kanıtı açınca uygun bağlar görünür."}
            </desc>
            <text x="160" y="21" textAnchor="middle">
              Metin
            </text>
            {answer.sentences.map((s, i) => {
              const x = 32 + i * 64,
                active = revealed && answer.ask.references.includes(i);
              return (
                <g key={s} data-sentence={i} data-support={active}>
                  <path
                    d={`M${x} 70 L160 165`}
                    fill="none"
                    stroke={active ? "var(--accent)" : "var(--muted)"}
                    strokeWidth={active ? 4 : 1.5}
                    strokeDasharray={active ? undefined : "4 5"}
                    opacity={revealed && !active ? 0.4 : 1}
                  />
                  <circle
                    cx={x}
                    cy="52"
                    r="17"
                    fill="var(--surface)"
                    stroke={selected === i ? "var(--accent)" : "var(--text)"}
                    strokeWidth={selected === i ? 4 : 1.5}
                  />
                  <text x={x} y="59" textAnchor="middle">
                    {i + 1}
                  </text>
                </g>
              );
            })}
            <circle
              cx="160"
              cy="182"
              r="23"
              fill="var(--surface)"
              stroke="var(--text)"
              strokeWidth="2"
            />
            <text x="160" y="189" textAnchor="middle">
              ?
            </text>
            <text x="160" y="231" textAnchor="middle">
              Soru
            </text>
          </svg>
          <p>
            Seçili cümle: <strong>{selected + 1}</strong>.{" "}
            {answer.sentences[selected]}
          </p>
        </div>
      )}
      {interview && (
        <div className="turkish023-model">
          <p className="turkish023-goal">
            <strong>Hedef:</strong> {interview.goal}.
          </p>
          <p>Özgün görüşme örneği; gerçek bir kişinin konuşması değildir.</p>
          <div
            className="turkish023-dialogue"
            data-dialogue-model
            data-branch={choice}
            data-turn={turn}
          >
            {interview.dialogue.map((line, i) => (
              <div key={`${choice}-${i}`} data-speaker={line.speaker}>
                <strong>{line.speaker}</strong>
                <p>{line.text}</p>
              </div>
            ))}
          </div>
          <label htmlFor={`${uid}-followup`}>Takip sorusu</label>
          <ChoiceSelect
            id={`${uid}-followup`}
            value={choice}
            onChange={(e) => change({ choice: Number(e.target.value) })}
          >
            {interview.questionLabels.map((q, i) => (
              <option value={i} key={q}>
                {q}
              </option>
            ))}
          </ChoiceSelect>
          <p className="turkish023-question">
            <strong>Seçilen soru:</strong> {interview.questionLabels[choice]}
          </p>
          <div className="turkish023-turns">
            <button
              className="secondary"
              disabled={turn === 0}
              onClick={() => advance(turn - 1)}
            >
              Önceki yanıt
            </button>
            <button
              className="secondary"
              disabled={turn === 2}
              onClick={() => advance(turn + 1)}
            >
              {turn === 0 ? "Yanıtı dinle" : "Ayrıntıyı aç"}
            </button>
          </div>
          <svg
            viewBox="0 0 320 155"
            role="img"
            aria-labelledby={`${uid}-dialogue-title ${uid}-dialogue-desc`}
            data-interview-graph
            data-turn={turn}
          >
            <title id={`${uid}-dialogue-title`}>Üç bilgi adımı</title>
            <desc
              id={`${uid}-dialogue-desc`}
            >{`Görünen konuşma adımı ${turn + 1}. İlk yanıt, takip ve ek açıklama aynı seçili sorunun yolunu izler.`}</desc>
            {interview.relations.map((link, i) => (
              <path
                key={i}
                d={`M${60 + i * 100} 56 H${140 + i * 100}`}
                fill="none"
                stroke={link.active ? "var(--accent)" : "var(--muted)"}
                strokeWidth={link.active ? 4 : 2}
                strokeDasharray={link.valid ? undefined : "5 4"}
                opacity={link.active ? 1 : 0.4}
                data-relation={i}
                data-active={link.active}
                data-valid={link.valid}
              />
            ))}
            {interview.nodes.map((node, i) => (
              <g key={node.label} data-node={i} data-active={node.active}>
                <circle
                  cx={50 + i * 100}
                  cy="56"
                  r="22"
                  fill="var(--surface)"
                  stroke={node.active ? "var(--accent)" : "var(--muted)"}
                  strokeWidth={node.active ? 4 : 2}
                />
                <text x={50 + i * 100} y="63" textAnchor="middle">
                  {i + 1}
                </text>
                <text x={50 + i * 100} y="112" textAnchor="middle">
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
          <p>
            Görünen tur: <strong>{turn + 1} / 3</strong>. Yeni soru seçince
            görüşme ilk yanıta döner.
          </p>
        </div>
      )}
      <label htmlFor={`${uid}-guess`}>Karar tahminin</label>
      <ChoiceSelect
        id={`${uid}-guess`}
        value={guess}
        onChange={(e) => set({ guess: e.target.value, compared: false })}
      >
        <option value="">Bir karar seç</option>
        {scene.options.map((o) => (
          <option value={o} key={o}>
            {o}
          </option>
        ))}
      </ChoiceSelect>
      <label htmlFor={`${uid}-reason`}>Metinden gerekçen</label>
      <textarea
        id={`${uid}-reason`}
        value={reason}
        rows={3}
        maxLength={120}
        onChange={(e) => set({ reason: e.target.value, compared: false })}
      />
      <div className="turkish023-actions">
        <button
          className="secondary"
          disabled={!canRead || !guess || !reason.trim()}
          onClick={() => set({ compared: true })}
        >
          Tahminimi karşılaştır
        </button>
        <button
          className="text-button"
          disabled={!canRead}
          onClick={() => set({ show: !revealed, compared: false })}
        >
          {revealed ? "Kanıtı gizle" : "Kanıtı göster"}
        </button>
      </div>
      {!canRead && <p>Önce seçili takip sorusunun yeni yanıtını aç.</p>}
      <div className="turkish023-result" data-model-result aria-live="polite">
        {revealed ? (
          <>
            <strong>{scene.decision}</strong>
            <p>{scene.reason}</p>
            {answer && (
              <>
                <p>
                  <strong>Yanıt:</strong> {answer.ask.answer}
                </p>
                <p>
                  Seçili {selected + 1}. cümle:{" "}
                  {answer.selectedSupports
                    ? "Bu soruya kanıt olur."
                    : "Bu sorunun aradığı bilgiyi vermez."}
                </p>
                {answer.evidence.map((e) => (
                  <p key={e.index}>
                    <strong>{e.index + 1}. cümle:</strong> {e.text}
                  </p>
                ))}
              </>
            )}
            {interview && (
              <p>
                <strong>Yeni söz:</strong> {interview.evidence}
              </p>
            )}
          </>
        ) : (
          <p>Önce kendi kararını kur; sonra kanıtla karşılaştır.</p>
        )}
      </div>
      {compared && (
        <div className="turkish023-feedback" role="status">
          <strong>
            {guess === scene.decision
              ? "Tahminin kanıtla aynı yönde."
              : "Tahminini yeniden incele."}
          </strong>
          <p>Senin gerekçen: {reason}</p>
          <p>
            Bu alan metne bağlı bir örnektir; serbest gerekçene otomatik
            doğruluk puanı vermez.
          </p>
        </div>
      )}
      <p className="small muted">
        Seçimler bu cihazda ayrı keşif kaydıdır. Puan, ustalık, soru cevabı veya
        konu bitirme kaydı oluşmaz.
      </p>
    </section>
  );
}
