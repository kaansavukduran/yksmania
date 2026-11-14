import { useId } from "react";
import { CornerDownRight } from "lucide-react";
import {
  buildTurkishPhrase,
  wordContexts,
  wordTaskNames,
  type PhraseMode,
} from "./forge093Turkish";
import { useExploration } from "./useExploration";
import "./forge093-turkish.css";

const families = [
  { id: "point", label: "Bu", open: "point-open", changed: "point-replace" },
  {
    id: "quality",
    label: "Hızlı",
    open: "quality-open",
    changed: "quality-action",
  },
  { id: "old", label: "Yaşlı", open: "old-open", changed: "old-replace" },
  {
    id: "uncertain",
    label: "Bazı",
    open: "uncertain-open",
    changed: "uncertain-replace",
  },
  {
    id: "question",
    label: "Hangi",
    open: "question-open",
    changed: "question-replace",
  },
] as const;
const kiCases = [
  {
    id: "relative",
    label: "Adın yeri",
    sentence: ["Benim defterim çizgili,", "seninki", "kareli."],
    expansion: "seninki → senin defterin",
    answer: "relative",
    evidence:
      "-ki, isim tamlamasındaki defter adının yerini tutar. Açık tamlanan geri getirilebilir; ilgi zamiridir.",
  },
  {
    id: "adjective",
    label: "Adın önü",
    sentence: ["", "Evdeki", "defter çizgili."],
    expansion: "evdeki → evde olan defter",
    answer: "ki-adjective",
    evidence:
      "-ki, yer grubunu açık defter adına bağlar. Tamlanan adı yerine geçmez; sıfat yapan -ki’dir.",
  },
  {
    id: "conjunction",
    label: "İki yargı",
    sentence: ["Biliyorum", "ki", "yarın geleceksin."],
    expansion: "biliyorum + yarın geleceksin → ki ile bağlanan yargılar",
    answer: "conjunction",
    evidence:
      "Ki, yargılar arasında bağlantı kurar ve ayrı yazılır. Bir adın yerini tutmaz veya açık defter adını nitelemez; bağlaçtır.",
  },
] as const;
const phraseChoices = [
  ["indefinite", "Belirtisiz"],
  ["definite", "Belirtili"],
  ["chain", "Zincirleme"],
];
const wordChoices = Object.entries(wordTaskNames);
const kiChoices = [
  ["relative", "İlgi zamiri"],
  ["ki-adjective", "Sıfat yapan -ki"],
  ["conjunction", "Bağlaç"],
];

export default function Forge093TurkishLab({ id }: { id: string }) {
  const uid = useId();
  const isNoun = id === "isimler-isim-tamlamasi";
  const isPronoun = id === "zamirler";
  const [saved, set] = useExploration(`forge093-turkish-${id}`, {
    panel: isNoun ? "phrase" : "word",
    family: isPronoun ? "uncertain" : "point",
    changed: isPronoun,
    genitive: false,
    inner: false,
    adjective: false,
    ki: "relative",
    prediction: "",
    reason: "",
    revealed: false,
    focus: true,
  });
  const panel =
    saved.panel === "phrase"
      ? "phrase"
      : saved.panel === "ki" && isPronoun
        ? "ki"
        : "word";
  const family = families.find((f) => f.id === saved.family) ?? families[0];
  const context = wordContexts.find(
    (c) => c.id === (saved.changed ? family.changed : family.open),
  )!;
  const mode: PhraseMode = saved.inner
    ? "chain"
    : saved.genitive
      ? "definite"
      : "indefinite";
  const phrase = buildTurkishPhrase(mode, saved.adjective);
  const ki = kiCases.find((k) => k.id === saved.ki) ?? kiCases[0];
  const choices =
    panel === "phrase"
      ? phraseChoices
      : panel === "ki"
        ? kiChoices
        : wordChoices;
  const expected =
    panel === "phrase"
      ? phrase.answer
      : panel === "ki"
        ? ki.answer
        : context.answer;
  const label =
    panel === "phrase"
      ? phrase.kind
      : panel === "ki"
        ? kiChoices.find(([v]) => v === ki.answer)![1]
        : wordTaskNames[context.answer];
  const evidence =
    panel === "phrase"
      ? phrase.evidence
      : panel === "ki"
        ? ki.evidence
        : context.evidence;
  const prediction = choices.some(([value]) => value === saved.prediction)
    ? saved.prediction
    : "";
  const reason = saved.reason.slice(0, 500);
  const change = (values: Parameters<typeof set>[0]) =>
    set({ ...values, revealed: false, prediction: "" });
  const options = [
    ...(isNoun ? [["phrase", "Tamlama kur"]] : []),
    ["word", "Cümleyi dönüştür"],
    ...(isPronoun ? [["ki", "Ki’yi değiştir"]] : []),
  ];
  return (
    <section
      className="concept-model forge093-turkish-lab"
      data-forge093={id}
      aria-labelledby={`${uid}-title`}
    >
      <h3 id={`${uid}-title`}>
        {isNoun
          ? "Adları birleştir, ilişkiyi değiştir"
          : isPronoun
            ? "Adın yerini koru, görevi değiştir"
            : "Sözcük aynı, bağlandığı yer farklı"}
      </h3>
      <p>
        Bir ayrıntıyı değiştir. Önce yeni yapıyı tahmin et; ardından cümleden
        bir kanıtla denetle.
      </p>
      <div
        className="turkish-controls"
        role="group"
        aria-label="Türkçe atölyesi görünümü"
      >
        {options.map(([value, text]) => (
          <button
            className="secondary"
            type="button"
            key={value}
            aria-pressed={panel === value}
            onClick={() => change({ panel: value })}
          >
            {text}
          </button>
        ))}
      </div>
      {panel === "phrase" ? (
        <>
          <fieldset className="turkish-transform">
            <legend>Ek ve iç yapı</legend>
            <label>
              <input
                type="checkbox"
                checked={saved.genitive || saved.inner}
                disabled={saved.inner}
                onChange={(e) => change({ genitive: e.target.checked })}
              />
              İlgi ekini ekle
            </label>
            <label>
              <input
                type="checkbox"
                checked={saved.inner}
                onChange={(e) => change({ inner: e.target.checked })}
              />
              İç tamlama kur
            </label>
            <label>
              <input
                type="checkbox"
                checked={saved.adjective}
                onChange={(e) => change({ adjective: e.target.checked })}
              />
              Yeni sıfatını ekle
            </label>
          </fieldset>
          {saved.inner && (
            <p className="small muted">
              İç grup açıkken okulun biçimini kullanıyoruz. İç tamlamayı
              kaldırınca önceki ilgi eki seçimin geri gelir.
            </p>
          )}
          <p className="turkish-live-sentence" aria-label="Kurulan cümle">
            {phrase.sentence}
          </p>
          <div
            className="turkish-structure"
            aria-label="Tamlamanın ek ve unsur yapısı"
          >
            {phrase.parts.map((part, index) => (
              <div className="turkish-piece" key={index}>
                <span>{index === 0 ? "Tamlayan" : "Tamlanan"}</span>
                <strong>{part}</strong>
              </div>
            ))}
          </div>
          <p className="small">
            Köşeli ayraç içteki ad grubunu birlikte taşır. Yeni sıfatının
            eklenmesi, iki ana adın ilişkisinin ayrıca incelenmesini gerektirir.
          </p>
        </>
      ) : panel === "word" ? (
        <>
          <div
            className="turkish-controls"
            role="group"
            aria-label="Dönüştürülecek sözcük"
          >
            {families.map((f) => (
              <button
                className="secondary"
                type="button"
                key={f.id}
                aria-pressed={family.id === f.id}
                onClick={() => change({ family: f.id, focus: true })}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="secondary turkish-transform-action"
            onClick={() => change({ changed: !saved.changed, focus: true })}
          >
            {saved.changed
              ? family.id === "quality"
                ? "Ada bağla"
                : "Açık adı getir"
              : family.id === "quality"
                ? "Fiile bağla"
                : "Adı kaldır"}
          </button>
          <p className="small">
            {family.id === "quality"
              ? "Hızlı sözcüğünü trenin özelliğinden gelme eyleminin biçimine taşı."
              : "Açık ad gösterilirken görevle, o ad söylenmeden yapılan görevi karşılaştır."}
          </p>
          <div
            className="turkish-live-sentence"
            aria-label="Dönüştürülen cümle"
          >
            {context.words.map((word, index) =>
              index === context.target ? (
                <button
                  type="button"
                  className="turkish-target"
                  key={index}
                  aria-pressed={saved.focus}
                  aria-label={`Hedef sözcük: ${word.replace(/[.,?]/g, "")}`}
                  onClick={() => set({ focus: !saved.focus })}
                >
                  {word}
                </button>
              ) : (
                <span key={index}>{word}</span>
              ),
            )}
          </div>
          {saved.focus && (
            <div className="turkish-relation" aria-label="Bağlantıyı incele">
              <span aria-hidden="true">
                <CornerDownRight size="1em" />
              </span>
              <p>{context.relation}</p>
            </div>
          )}
          <p className="small muted">
            Vurgulu sözcüğe dokunarak bağlantı açıklamasını açıp kapatabilirsin.
            Cümleyi değiştirmek, açık adı ve bağlantının yönünü gerçekten
            değiştirir.
          </p>
        </>
      ) : (
        <>
          <div
            className="turkish-controls"
            role="group"
            aria-label="Ki yapısını değiştir"
          >
            {kiCases.map((k) => (
              <button
                className="secondary"
                type="button"
                key={k.id}
                aria-pressed={ki.id === k.id}
                onClick={() => change({ ki: k.id })}
              >
                {k.label}
              </button>
            ))}
          </div>
          <p className="turkish-live-sentence" aria-label="Ki içeren cümle">
            {ki.sentence[0]} <mark>{ki.sentence[1]}</mark> {ki.sentence[2]}
          </p>
          <div className="turkish-relation">
            <span aria-hidden="true">
              <CornerDownRight size="1em" />
            </span>
            <p>{ki.expansion}</p>
          </div>
          <p className="small">
            Biçimi açınca ad geri mi geliyor, açık bir ad mı niteleniyor, iki
            yargı mı bağlanıyor?
          </p>
        </>
      )}
      <fieldset className="turkish-prediction">
        <legend>
          {panel === "phrase"
            ? "Bu tamlamanın türü ne?"
            : panel === "ki"
              ? "Vurgulu ki’nin görevi ne?"
              : "Vurgulu sözcük ne görevde?"}
        </legend>
        <div className="turkish-choices">
          {choices.map(([value, text]) => (
            <label key={value}>
              <input
                type="radio"
                name={`${uid}-prediction`}
                value={value}
                checked={prediction === value}
                onChange={() => set({ prediction: value, revealed: false })}
              />
              {text}
            </label>
          ))}
        </div>
        <label htmlFor={`${uid}-reason`}>Cümleden kanıtın</label>
        <textarea
          id={`${uid}-reason`}
          rows={3}
          maxLength={500}
          value={reason}
          onChange={(e) => set({ reason: e.target.value, revealed: false })}
          placeholder="Hangi ad, hangi ek veya hangi bağlantı kararını destekliyor?"
        />
        <button
          className="secondary"
          type="button"
          disabled={!prediction || !reason.trim()}
          onClick={() => set({ revealed: true })}
        >
          Yanıtı denetle
        </button>
      </fieldset>
      {saved.revealed && prediction && (
        <div className="turkish-result" role="status" data-model-result>
          <strong>{label}</strong>
          <p>
            {prediction === expected
              ? "Seçimin bu çözümle uyuşuyor."
              : "Seçiminle yapı arasında fark var. Bağlantıyı yeniden incele."}
          </p>
          <p>{evidence}</p>
          <p>
            <strong>Gerekçen:</strong> {reason}
          </p>
        </div>
      )}
      <p className="small muted">
        Seçimlerin ve gerekçen bu cihazda saklanır. Bu keşif XP, soru doğrusu,
        ustalık veya konu tamamlanması oluşturmaz.
      </p>
    </section>
  );
}
