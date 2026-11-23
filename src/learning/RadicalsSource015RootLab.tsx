import { useId } from "react";
import {
  nthRoot015,
  root015Bounds,
  type Root015Point,
} from "./radicalsSource015RootModel";
import { useExploration } from "./useExploration";

const defaults = { degree: 4, radicand: 16 };
const approx = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 });
const signed = (value: number | string) => String(value).replace("-", "−");

function RootRange({
  label,
  value,
  bounds,
  change,
}: {
  label: string;
  value: number;
  bounds: readonly [number, number];
  change: (value: number) => void;
}) {
  return (
    <label className="field">
      <span>
        {label} <strong aria-hidden="true">{signed(value)}</strong>
      </span>
      <input
        aria-label={label}
        type="range"
        min={bounds[0]}
        max={bounds[1]}
        step={1}
        value={value}
        onChange={(event) => change(event.currentTarget.valueAsNumber)}
      />
    </label>
  );
}

function RootLines({ result }: { result: ReturnType<typeof nthRoot015> }) {
  const id = useId();
  const peak = Math.abs(result.principal?.coordinate ?? 0);
  const limit = Math.max(2, Math.ceil(peak));
  const ticks = Array.from(
    { length: 2 * limit + 1 },
    (_, index) => index - limit,
  ).filter((tick) => limit <= 5 || tick % 2 === 0);
  const X = (value: number) => 250 + (204 * value) / limit;
  const rows = [
    {
      label: "Kök simgesi",
      values: result.principal ? [result.principal] : [],
      y: 43,
    },
    { label: "Denklem", values: result.solutions, y: 108 },
  ];
  return (
    <svg
      className="math093-svg"
      viewBox="0 0 500 152"
      role="img"
      aria-labelledby={id}
    >
      <title id={id}>
        Kök simgesi ve denklem çözümleri aynı ölçekte.
        {result.principal
          ? ` Üst sırada ${result.principal.label}, alt sırada ${result.solutions.map((root) => root.label).join(" ve ")}.`
          : " İki sayı doğrusunda da gerçek kök noktası yok."}
      </title>
      <g aria-hidden="true">
        <path d="M250 41V109" className="m093-guide" />
        {rows.map(({ label, values, y }, index) => (
          <g key={label} data-root-row={index === 0 ? "principal" : "equation"}>
            <text x="17" y={y - 16}>
              {label}
            </text>
            <path d={`M24 ${y}H478m-6 -4 6 4 -6 4`} className="m093-axis" />
            {ticks.map((tick) => (
              <path
                key={tick}
                d={`M${X(tick)} ${y - 4}v8`}
                className="m093-axis"
              />
            ))}
            {values.map(({ label, coordinate }) => (
              <circle
                key={label}
                cx={X(coordinate)}
                cy={y}
                r="7"
                className="m093-point"
                data-root-value={label}
              />
            ))}
            {values.length === 0 && (
              <text x="462" y={y - 16} textAnchor="end">
                Gerçek kök yok
              </text>
            )}
          </g>
        ))}
        {ticks.map((tick) => (
          <text key={tick} x={X(tick)} y="135" textAnchor="middle">
            {signed(tick)}
          </text>
        ))}
      </g>
    </svg>
  );
}

const readout = ({ label, coordinate, bracket }: Root015Point) =>
  bracket
    ? `${signed(bracket[0])} < ${label} < ${signed(bracket[1])} ve ${label} ≈ ${signed(approx.format(coordinate))}`
    : label;

export function RadicalsSource015RootLab() {
  const [saved, set] = useExploration("radicals-nth-root-source-015", defaults);
  const valid = (
    value: number,
    [min, max]: readonly [number, number],
    fallback: number,
  ) =>
    Number.isInteger(value) && value >= min && value <= max ? value : fallback;
  const degree = valid(saved.degree, root015Bounds.degree, defaults.degree);
  const radicand = valid(
    saved.radicand,
    root015Bounds.radicand,
    defaults.radicand,
  );
  const result = nthRoot015(degree, radicand);
  return (
    <details data-model="source015-nth-root">
      <summary>Kök simgesi ve denklem çözümleri</summary>
      <div className="math093-controls">
        <RootRange
          label="Kök derecesi n"
          value={degree}
          bounds={root015Bounds.degree}
          change={(degree) => set({ degree })}
        />
        <RootRange
          label="Kök içi a"
          value={radicand}
          bounds={root015Bounds.radicand}
          change={(radicand) => set({ radicand })}
        />
      </div>
      <div className="math093-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => set(defaults)}
        >
          ∜16
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set({ degree: 3, radicand: -27 })}
        >
          ∛(−27)
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set({ degree: 2, radicand: 2 })}
        >
          √2
        </button>
      </div>
      <RootLines result={result} />
      <div className="math093-result" role="status" data-nth-root-result>
        <p>
          <strong>Kök simgesi</strong>{" "}
          {result.principal === null
            ? `${result.radical} gerçek sayılarda tanımsız.`
            : result.principal.bracket
              ? `${readout(result.principal)}.`
              : `${result.radical} = ${result.principal.label}.`}
        </p>
        <p>
          <strong>{result.equation} denkleminin gerçek çözüm kümesi</strong>{" "}
          {result.solutions.length > 0
            ? `{${result.solutions.map((root) => root.label).join(", ")}}`
            : "∅"}
          .
        </p>
        {result.kind === "irrational" && result.solutions.length === 2 && (
          <p>{readout(result.solutions[0])}.</p>
        )}
        <p>
          {result.kind === "not-real"
            ? "Bir gerçek sayının çift kuvveti negatif olamaz."
            : radicand === 0
              ? "Sıfırın kökü 0. Denklemin tek çözümü x = 0."
              : degree % 2 === 0
                ? "Çift dereceli kök simgesi negatif olmayan değeri seçer. Bu değerin negatifi de aynı çift kuvveti verir."
                : "Tek derecede kök, kök içinin işaretini taşır. Denklemde bir gerçek çözüm vardır."}
        </p>
      </div>
    </details>
  );
}
