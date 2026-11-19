import { useId } from "react";
import { useExploration } from "./useExploration";
import { clampInt } from "./mathModels";
import {
  compare,
  solveEquation,
  solveInequality,
  type Relation,
} from "./algebraModels";
import { ChoiceSelect } from "../components/ChoiceSelect";

export default function AlgebraExplorer({
  inequality,
}: {
  inequality: boolean;
}) {
  const uid = useId();
  const [s, set] = useExploration(
    inequality ? "linear-inequality" : "linear-equation",
    {
      a: inequality ? -2 : 3,
      b: inequality ? 1 : 2,
      c: inequality ? 7 : 11,
      relation: "<",
      step: 0,
      probe: 0,
    },
  );
  const a = clampInt(s.a, -5, 5),
    b = clampInt(s.b, -10, 10),
    c = clampInt(s.c, -10, 15);
  const step = clampInt(s.step, 0, 2),
    probe = clampInt(s.probe, -30, 30);
  const relation: Relation = ["<", "≤", ">", "≥"].includes(s.relation)
    ? (s.relation as Relation)
    : "<";
  const equation = solveEquation(a, b, c);
  const solution = solveInequality(a, b, c, relation);
  const original = `${a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)} ${inequality ? relation : "="} ${c}`;
  const left =
    step === 0
      ? `${a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)}`
      : step === 1 || a === 0
        ? `${a}x`
        : "x";
  const right =
    step === 0
      ? String(c)
      : step === 1 || a === 0
        ? String(c - b)
        : equation.kind === "single"
          ? equation.label
          : "";
  const span = Math.max(
    5,
    Math.ceil(Math.abs(solution.kind === "interval" ? solution.boundary : 0)) +
      1,
    Math.abs(probe) + 1,
  );
  const point = (value: number) => 280 + (value / span) * 220;
  const valid = inequality
    ? compare(a * probe + b, relation, c)
    : a * probe + b === c;
  const resultText =
    solution.kind === "all"
      ? "Çözüm kümesi: ℝ; bütün gerçek sayılar sağlar."
      : solution.kind === "none"
        ? "Çözüm kümesi: ∅; hiçbir gerçek sayı sağlamaz."
        : `x ${solution.relation} ${solution.label}; aralık: ${solution.interval}`;
  return (
    <section
      className="visual-lab algebra-lab"
      aria-labelledby={`${uid}-title`}
    >
      <h2 id={`${uid}-title`}>
        {inequality
          ? "Yönü ve çözüm aralığını keşfet"
          : "Eşitliği koruyarak x’i yalnız bırak"}
      </h2>
      <p>
        {inequality
          ? "Katsayının işaretini değiştir; açık/kapalı ucu ve çözüm yönünü karşılaştır."
          : "Katsayıları değiştir; aynı işlemi iki tarafa uygulayarak adımları izle. Bu bir eşitlik şemasıdır, fiziksel ağırlık terazisi değildir."}
      </p>
      <div className="ayt-controls">
        {(
          [
            { key: "a", value: a, min: -5, max: 5 },
            { key: "b", value: b, min: -10, max: 10 },
            { key: "c", value: c, min: -10, max: 15 },
          ] as const
        ).map((field) => (
          <label className="lab-slider" key={field.key}>
            {field.key} katsayısı: {field.value}
            <input
              aria-label={`${field.key} katsayısı`}
              type="range"
              min={field.min}
              max={field.max}
              value={field.value}
              onChange={(event) =>
                set({ [field.key]: Number(event.target.value), step: 0 })
              }
            />
          </label>
        ))}
        {inequality && (
          <label className="field">
            Eşitsizlik işareti
            <ChoiceSelect
              value={relation}
              onChange={(event) => set({ relation: event.target.value })}
            >
              {["<", "≤", ">", "≥"].map((op) => (
                <option key={op}>{op}</option>
              ))}
            </ChoiceSelect>
          </label>
        )}
      </div>
      <p className="math-expression">{original}</p>
      {inequality ? (
        <>
          <svg
            viewBox="0 0 560 160"
            role="img"
            aria-label={`Çözüm sayı doğrusu. ${resultText}`}
          >
            <line
              x1="45"
              y1="68"
              x2="515"
              y2="68"
              stroke="var(--muted)"
              strokeWidth="2"
            />
            {solution.kind === "all" && (
              <line
                x1="45"
                y1="68"
                x2="515"
                y2="68"
                stroke="var(--mint)"
                strokeWidth="7"
              />
            )}
            {solution.kind === "interval" && (
              <g>
                <line
                  x1={solution.left ? 45 : point(solution.boundary)}
                  x2={solution.left ? point(solution.boundary) : 515}
                  y1="68"
                  y2="68"
                  stroke="var(--mint)"
                  strokeWidth="7"
                />
                <path
                  d={
                    solution.left
                      ? "M55 60 L45 68 L55 76"
                      : "M505 60 L515 68 L505 76"
                  }
                  fill="none"
                  stroke="var(--mint)"
                  strokeWidth="3"
                />
                <circle
                  cx={point(solution.boundary)}
                  cy="68"
                  r="8"
                  fill={solution.closed ? "var(--mint)" : "var(--surface)"}
                  stroke="var(--mint)"
                  strokeWidth="3"
                />
                <text
                  x={point(solution.boundary)}
                  y="38"
                  textAnchor="middle"
                  className="plot-label"
                >
                  {solution.label}
                </text>
              </g>
            )}
            {[-span, -span / 2, 0, span / 2, span].map((tick) => (
              <g key={tick}>
                <line
                  x1={point(tick)}
                  x2={point(tick)}
                  y1="82"
                  y2="90"
                  stroke="currentColor"
                />
                <text
                  x={point(tick)}
                  y="112"
                  textAnchor="middle"
                  className="plot-label"
                >
                  {new Intl.NumberFormat("tr-TR").format(tick)}
                </text>
              </g>
            ))}
            <circle
              className="vector-dot"
              cx={point(probe)}
              cy="133"
              r="6"
              fill="var(--accent)"
            />
          </svg>
          <div className="model-results algebra-result" role="status">
            <strong>{resultText}</strong>
            <p>
              {a < 0
                ? "Negatif a’ya bölündüğü için yön ters döndü."
                : a > 0
                  ? "Pozitif a’ya bölündüğü için yön korundu."
                  : "a=0: x kaybolur. Sabitlerin karşılaştırması ya bütün sayılar için doğrudur ya da hiçbirinde doğru değildir."}
            </p>
          </div>
          <p className="lab-caption">
            Yeşil bölüm çözüm kümesidir; açık uç sınırı dışlar, dolu uç dahil
            eder. Alttaki nokta denenen x’tir. Sayı doğrusu sonsuzun yalnız
            görünen bir bölümünü gösterir.
          </p>
        </>
      ) : (
        <>
          <svg
            viewBox="0 0 560 130"
            role="img"
            aria-label={`Adım ${step + 1}: ${left} = ${right}`}
          >
            <rect
              x="25"
              y="25"
              width="220"
              height="70"
              rx="8"
              fill="var(--surface)"
              stroke="var(--mint)"
              strokeWidth="2"
            />
            <rect
              x="315"
              y="25"
              width="220"
              height="70"
              rx="8"
              fill="var(--surface)"
              stroke="var(--mint)"
              strokeWidth="2"
            />
            <text x="135" y="68" textAnchor="middle" className="plot-label">
              {left}
            </text>
            <text x="280" y="68" textAnchor="middle" className="plot-label">
              =
            </text>
            <text x="425" y="68" textAnchor="middle" className="plot-label">
              {right}
            </text>
          </svg>
          <div className="example-actions">
            {step === 0 && (
              <button className="secondary" onClick={() => set({ step: 1 })}>
                Sabit terimi iki taraftan çıkar
              </button>
            )}
            {step === 1 && a !== 0 && (
              <button className="secondary" onClick={() => set({ step: 2 })}>
                İki tarafı a’ya böl
              </button>
            )}
            {step > 0 && (
              <button className="text-button" onClick={() => set({ step: 0 })}>
                Adımları baştan izle
              </button>
            )}
          </div>
          {(step === 2 || a === 0) && (
            <p className="model-results algebra-result" role="status">
              {equation.kind === "all"
                ? "0x=0: Çözüm kümesi ℝ. Bu durumda denklem artık birinci dereceden değildir."
                : equation.kind === "none"
                  ? "0x sıfırdan farklı olamaz: Çözüm kümesi ∅. Sıfıra bölerek çözüm üretilemez."
                  : `Çözüm: x=${equation.label}. İlk eşitlikte yerine koyarak doğrula.`}
            </p>
          )}
        </>
      )}
      <label className="lab-slider">
        Denenecek x: {probe}
        <input
          aria-label="Denenecek x"
          type="range"
          min={-30}
          max={30}
          value={probe}
          onChange={(event) => set({ probe: Number(event.target.value) })}
        />
      </label>
      <p className="algebra-probe" role="status">
        x={probe} için sol taraf {a * probe + b}, sağ taraf {c}.{" "}
        {valid ? "Bu değer koşulu sağlıyor." : "Bu değer koşulu sağlamıyor."}
      </p>
      <p className="lab-caption">
        Model tam sayılı katsayıları ve deneme değerlerini kullanır; çözüm kesir
        olabilir. Bu keşif puan veya tamamlanma kaydı oluşturmaz. Seçimlerin
        cihazda saklanır.
      </p>
    </section>
  );
}
