import { useId } from "react";
import {
  chemicalSpeciesExamples,
  speciesBudget,
  speciesBudgetFeedback,
  speciesCounts,
  type SpeciesExample,
} from "./chemicalSpecies";
import { useExploration } from "./useExploration";
import "./chemicalSpeciesLab.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

type Dot = { x: number; y: number };
// The dots are a counting diagram, not orbital positions or a scale geometry.
function dotsFor(example: SpeciesExample, index: number, count: number): Dot[] {
  const a = example.atoms[index];
  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];
  const occupied = new Set(
    example.links.flatMap(([left, right]) => {
      const other = left === index ? right : right === index ? left : -1;
      if (other < 0) return [];
      const b = example.atoms[other];
      return [
        Math.abs(b.x - a.x) >= Math.abs(b.y - a.y)
          ? b.x > a.x
            ? 1
            : 3
          : b.y > a.y
            ? 2
            : 0,
      ];
    }),
  );
  const free = directions.map((_, i) => i).filter((i) => !occupied.has(i));
  const slots = free.length ? free : [0, 1, 2, 3];
  const singleAtom = example.atoms.length === 1;
  const counts = [0, 0, 0, 0];
  if (singleAtom && example.charge === 0 && a.symbol !== "He") {
    for (let i = 0; i < count; i++) counts[i % 4]++;
  } else {
    for (let i = 0; i < count; i++)
      counts[slots[Math.floor(i / 2) % slots.length]]++;
  }
  return counts.flatMap((n, i) => {
    const [dx, dy] = directions[i];
    return Array.from({ length: n }, (_, j) => ({
      x: a.x + dx * 43 + (dy ? (n === 1 ? 0 : j * 12 - 6) : 0),
      y: a.y + dy * 43 + (dx ? (n === 1 ? 0 : j * 12 - 6) : 0),
    }));
  });
}

function LewisDiagram({
  example,
  step,
  labelId,
  selected,
}: {
  example: SpeciesExample;
  step: number;
  labelId: string;
  selected: number;
}) {
  const { current } = speciesCounts(example, step);
  const charge =
    example.charge === 0
      ? ""
      : `${Math.abs(example.charge) === 1 ? "" : Math.abs(example.charge)}${example.charge > 0 ? "+" : "−"}`;
  return (
    <svg
      viewBox="0 0 480 310"
      className="species-drawing"
      role="img"
      aria-labelledby={`${labelId}-svg-title ${labelId}-svg-desc`}
    >
      <title id={`${labelId}-svg-title`}>
        {example.formula} · {current.title}
      </title>
      <desc id={`${labelId}-svg-desc`}>
        {current.explanation} Çizgiler ortak elektron çiftlerini, noktalar bağ
        dışı elektronları temsil eder. Atomlara ilişkin sayılar şeklin altında
        da verilmiştir.
      </desc>
      {example.links.map(([left, right], i) => {
        const a = example.atoms[left];
        const b = example.atoms[right];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const length = Math.hypot(dx, dy);
        const order = current.orders[i];
        return Array.from({ length: order }, (_, j) => {
          const offset = (j - (order - 1) / 2) * 10;
          return (
            <line
              key={`${i}-${j}`}
              x1={a.x + (dx / length) * 32 - (dy / length) * offset}
              y1={a.y + (dy / length) * 32 + (dx / length) * offset}
              x2={b.x - (dx / length) * 32 - (dy / length) * offset}
              y2={b.y - (dy / length) * 32 + (dx / length) * offset}
              className="species-bond"
            />
          );
        });
      })}
      {example.atoms.map((a, i) => (
        <g key={`${i}-${a.symbol}`}>
          <circle
            cx={a.x}
            cy={a.y}
            r="27"
            className={
              i === selected ? "species-atom selected" : "species-atom"
            }
          />
          <text
            x={a.x}
            y={a.y + 8}
            textAnchor="middle"
            className="species-symbol"
          >
            {a.symbol}
          </text>
          {dotsFor(example, i, current.nonbonding[i]).map((dot, j) => (
            <circle
              key={j}
              cx={dot.x}
              cy={dot.y}
              r="4.2"
              className="species-dot"
            />
          ))}
        </g>
      ))}
      {charge && (
        <g className="species-bracket">
          <path d="M 65 20 H 50 V 290 H 65 M 415 20 H 430 V 290 H 415" />
          <text x="439" y="32">
            {charge}
          </text>
        </g>
      )}
    </svg>
  );
}

export default function ChemicalSpeciesLab() {
  const uid = useId();
  const [s, set] = useExploration("chemical-species", {
    choice: "h2o",
    step: 0,
    selected: 0,
    prediction: "",
    checked: false,
  });
  const example =
    chemicalSpeciesExamples.find((e) => e.id === s.choice) ??
    chemicalSpeciesExamples[0];
  const counts = speciesCounts(example, s.step);
  const budget = speciesBudget(example);
  const selected = Math.max(
    0,
    Math.min(
      example.atoms.length - 1,
      Number.isFinite(s.selected) ? Math.round(s.selected) : 0,
    ),
  );
  const atEnd = counts.index === example.stages.length - 1;
  const predictionValid =
    s.prediction !== "" && Number.isFinite(Number(s.prediction));
  const isCationSymbol = example.atoms.length === 1 && example.charge > 0;
  const valences = example.atoms
    .map((a) => `${a.symbol}: ${a.valence}`)
    .join("; ");
  const chargeTerm =
    example.charge === 0
      ? "yük düzeltmesi yok"
      : example.charge > 0
        ? `${example.charge} elektron çıkar`
        : `${-example.charge} elektron ekle`;
  const currentAtom = example.atoms[selected];
  return (
    <section
      className="visual-lab chemical-species-lab"
      aria-labelledby={`${uid}-title`}
    >
      <div className="lab-heading">
        <h2 id={`${uid}-title`}>
          Lewis atölyesi: elektronları kaybetmeden yerleştir
        </h2>
        <p>
          Bir tür seç; bütçeyi tahmin et, yerleşimi adım adım kur. Sonra toplam
          sayımla atom çevresindeki sayımı karşılaştır.
        </p>
      </div>
      <label className="field">
        Tür örneği
        <ChoiceSelect
          value={example.id}
          onChange={(event) =>
            set({
              choice: event.target.value,
              step: 0,
              selected: 0,
              prediction: "",
              checked: false,
            })
          }
        >
          {chemicalSpeciesExamples.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title}
            </option>
          ))}
        </ChoiceSelect>
      </label>
      <p className="species-kind">
        <strong>{example.formula}</strong> · {example.kind} · Toplam yük:{" "}
        {example.charge > 0
          ? `+${example.charge}`
          : example.charge < 0
            ? `−${-example.charge}`
            : "0"}
      </p>
      <div className="species-prediction">
        <p>
          Verilen nötr değerlik elektronları: {valences}. Bu tür için{" "}
          {chargeTerm}.
        </p>
        {isCationSymbol && (
          <p>
            Bu örnekte katyonun okul Lewis sembolündeki noktaları sayıyoruz.
            Gerçek dolu dış katmanın elektronları bu noktasız katyon sembolünde
            çizilmez.
          </p>
        )}
        <div className="species-prediction-controls">
          <label className="field">
            {isCationSymbol
              ? "Lewis sembolündeki nokta sayısı tahminin"
              : "Toplam değerlik elektronu tahminin"}
            <ChoiceSelect
              value={s.prediction}
              onChange={(event) =>
                set({ prediction: event.target.value, checked: false })
              }
            >
              <option value="">Bir sayı seç</option>
              {[0, 1, 2, 4, 6, 7, 8, 10, 11, 12, 16, 18].map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </ChoiceSelect>
          </label>
          <button
            className="button secondary"
            disabled={!predictionValid}
            onClick={() => set({ checked: true })}
          >
            Sayımı kontrol et
          </button>
        </div>
        {s.checked && (
          <p className="species-feedback" role="status">
            {speciesBudgetFeedback(example, Number(s.prediction))}{" "}
            {example.atoms.map((a) => a.valence).join(" + ")}
            {example.charge
              ? example.charge > 0
                ? ` − ${example.charge}`
                : ` + ${-example.charge}`
              : ""}{" "}
            = {budget}.{" "}
            {example.charge > 0
              ? "Pozitif yükte elektron çıkarılır."
              : example.charge < 0
                ? "Negatif yükte elektron eklenir."
                : "Nötr türde yük düzeltmesi yapılmaz."}
          </p>
        )}
      </div>
      <div className="species-step-heading" aria-live="polite">
        <p>
          Yerleşim adımı {counts.index + 1} / {example.stages.length}
        </p>
        <h3>{counts.current.title}</h3>
        <p>{counts.current.explanation}</p>
      </div>
      <LewisDiagram
        example={example}
        step={counts.index}
        labelId={uid}
        selected={selected}
      />
      <div className="species-navigation">
        <button
          className="button secondary"
          disabled={counts.index === 0}
          onClick={() => set({ step: counts.index - 1 })}
        >
          Önceki yerleşim adımı
        </button>
        <button
          className="button primary"
          disabled={atEnd}
          onClick={() => set({ step: counts.index + 1 })}
        >
          Sonraki yerleşim adımı
        </button>
        <button
          className="text-button"
          onClick={() =>
            set({ step: 0, selected: 0, prediction: "", checked: false })
          }
        >
          Baştan kur
        </button>
      </div>
      <dl className="species-counts">
        <div className="species-budget">
          <dt>
            {isCationSymbol
              ? "Lewis sembolündeki nokta bütçesi"
              : "Toplam değerlik bütçesi"}
          </dt>
          <dd>{budget} elektron</dd>
        </div>
        <div>
          <dt>Ortak bağ elektronları</dt>
          <dd>{counts.shared}</dd>
        </div>
        <div>
          <dt>Bağ dışı elektronlar</dt>
          <dd>{counts.nonshared}</dd>
        </div>
        <div>
          <dt>Yerleşen / yerleşmeyen</dt>
          <dd>
            {counts.allocated} / {counts.remaining}
          </dd>
        </div>
      </dl>
      <div className="species-inspector">
        <h3>Bir atomun çevresini incele</h3>
        <p>
          Bir atom seç. Ortak çiftler iki komşunun da çevresinde sayılır; bütün
          türün bütçesine bir kez girer.
        </p>
        <div
          className="species-atom-controls"
          role="group"
          aria-label="İncelenecek atom"
        >
          {example.atoms.map((a, i) => (
            <button
              key={i}
              className={selected === i ? "active" : ""}
              aria-pressed={selected === i}
              onClick={() => set({ selected: i })}
            >
              {a.symbol}
              {example.atoms.filter((b) => b.symbol === a.symbol).length > 1
                ? ` (${i + 1})`
                : ""}
            </button>
          ))}
        </div>
        <p className="species-central" aria-live="polite">
          <strong>
            {currentAtom.symbol} çevresinde: {counts.local[selected]} elektron.
          </strong>{" "}
          {example.actualElectrons !== undefined && (
            <span>
              Bu türün bütün katmanlarındaki toplam elektron sayısı:{" "}
              {example.actualElectrons}.{" "}
            </span>
          )}
          {example.id === "na-plus"
            ? "Katyonun dolu iç katmanı noktalarda gösterilmez; yerel Lewis sayımı sıfır görünür."
            : atEnd
              ? example.radical && selected === 0
                ? "Bu radikal örneğinde 7 elektron bulunması oktet istisnasıdır; elektron ekleyerek yükü değiştirme."
                : currentAtom.symbol === "H" || currentAtom.symbol === "He"
                  ? "İki elektron duet denetimini sağlar."
                  : example.links.length === 0 && example.charge === 0
                    ? "Bu nötr atomun değerlik noktalarıdır; serbest atom çizimini zorla oktete tamamlama."
                    : "Sekiz elektron bu basit yapıda oktet denetimini sağlar."
              : "Bu yerleşim henüz tamamlanmadı; son adımla karşılaştır."}
        </p>
      </div>
      <p className="species-limit">
        Çizim elektron hesabını gösterir; gerçek bağ açısı, bağ uzunluğu veya
        orbital resmi değildir. Keşif seçimleri bu cihazda saklanır; bu atölye
        soru puanı, ustalık veya konu tamamlama kaydı oluşturmaz.
      </p>
    </section>
  );
}
