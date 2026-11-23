import "./forge014Math.css";
import { useId } from "react";
import { fractionLabel } from "./algebraModels";
import { courseHistogram037 } from "./courseHistogramSource037Model";
import { describeData, transformData } from "./forge015Math";
import { useExploration } from "./useExploration";

const defaults = {
  mode: "distribution",
  lastValue: 6,
  multiplier: 1,
  shift: 0,
  groups: 3,
  highest: 11,
  population: false,
};
const histogramSample = [2, 3, 3, 5, 6, 7, 8, 8, 10];
const number = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });
const displayDeviation = (value: number) =>
  Number.isInteger(value)
    ? number.format(value)
    : `yaklaşık ${number.format(value)}`;

function stackedPoints(
  values: readonly number[],
  scale: (value: number) => number,
) {
  const points: { x: number; lane: number }[] = [];
  for (const value of values) {
    const x = scale(value);
    let lane = 0;
    while (
      points.some((point) => point.lane === lane && Math.abs(point.x - x) < 17)
    )
      lane += 1;
    points.push({ x, lane });
  }
  return points;
}

export function StatisticsSource037Lab() {
  const id = useId();
  const [saved, set] = useExploration("statistics-source-037", defaults);
  const histogram = saved.mode === "histogram";
  const read = (
    key: "lastValue" | "multiplier" | "shift" | "groups" | "highest",
    min: number,
    max: number,
  ) =>
    Number.isInteger(saved[key])
      ? Math.max(min, Math.min(max, saved[key]))
      : defaults[key];
  const lastValue = read("lastValue", 6, 18);
  const multiplier = read("multiplier", -3, 3);
  const shift = read("shift", -8, 8);
  const groups = read("groups", 2, 6);
  const highest = read("highest", 10, 22);
  const sample = describeData(
    transformData([2, 4, lastValue], multiplier, shift),
  );
  const reference = describeData([3, 4, 5]);
  const deviation = (saved.population ? sample.populationSD : sample.sampleSD)!;
  const referenceDeviation = (
    saved.population ? reference.populationSD : reference.sampleSD
  )!;
  const raw = [...histogramSample, highest];
  const classes = courseHistogram037(raw, groups);
  const limit = classes.bins[1].low;
  const above = classes.bins.slice(1).reduce((sum, bin) => sum + bin.count, 0);
  const minimum = Math.min(sample.sorted[0], reference.sorted[0]);
  const maximum = Math.max(sample.sorted.at(-1)!, reference.sorted.at(-1)!);
  const scale = (value: number) =>
    54 + (286 * (value - minimum)) / (maximum - minimum);
  const samplePoints = stackedPoints(sample.sorted, scale);
  const referencePoints = stackedPoints(reference.sorted, scale);
  const field = (
    key: "lastValue" | "multiplier" | "shift" | "groups" | "highest",
    label: string,
    value: number,
    min: number,
    max: number,
  ) => (
    <label className="field">
      {label}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        aria-valuetext={String(value)}
        onChange={(event) => set({ [key]: Number(event.currentTarget.value) })}
      />
      <span aria-hidden="true">{value}</span>
    </label>
  );

  return (
    <details data-model="source037-statistics">
      <summary>Yayılımı ve histogramı incele</summary>
      <div
        className="lab-choice-buttons"
        role="group"
        aria-label="Veri görünümü"
      >
        <button
          type="button"
          className="secondary"
          aria-pressed={!histogram}
          onClick={() => set({ mode: "distribution" })}
        >
          Nokta dağılımı
        </button>
        <button
          type="button"
          className="secondary"
          aria-pressed={histogram}
          onClick={() => set({ mode: "histogram" })}
        >
          Histogram
        </button>
      </div>
      {histogram ? (
        <>
          <div className="f014m-controls">
            {field("groups", "Sınıf sayısı", groups, 2, 6)}
            {field("highest", "En büyük ölçüm", highest, 10, 22)}
          </div>
          <div className="f014m-result" role="status">
            <p>
              Veriler {raw.join(", ")}. Toplam {classes.n} gözlem.
            </p>
            <p>
              Sınıf genişliği {classes.width}. En az {limit} olan {above}/
              {classes.n} gözlem.
            </p>
          </div>
          <figure className="f040-plot">
            <svg
              viewBox="0 0 400 298"
              width="100%"
              role="img"
              aria-labelledby={`${id}-histogram`}
            >
              <title id={`${id}-histogram`}>
                Eş genişlikte bitişik histogram sütunları ve frekanslar
              </title>
              <g aria-hidden="true">
                <path
                  d="M42 35V232H367"
                  fill="none"
                  stroke="var(--text)"
                  strokeWidth={2}
                />
                <text x={42} y={25} fontSize={20} fill="var(--text)">
                  Frekans (adet)
                </text>
                {[0, classes.n / 2, classes.n].map((count) => {
                  const y = 232 - (165 * count) / classes.n;
                  return (
                    <g key={count}>
                      <path d={`M37 ${y}H42`} stroke="var(--text)" />
                      <text
                        x={33}
                        y={y + 6}
                        textAnchor="end"
                        fontSize={18}
                        fill="var(--text)"
                      >
                        {count}
                      </text>
                    </g>
                  );
                })}
                {classes.bins.map(({ low, high, count }, index) => {
                  const width = 324 / classes.bins.length;
                  const x = 42 + index * width;
                  const height = (165 * count) / classes.n;
                  return (
                    <g key={low}>
                      <rect
                        x={x}
                        y={232 - height}
                        width={width}
                        height={height}
                        fill="var(--accent)"
                        fillOpacity={0.32}
                        stroke="var(--text)"
                      />
                      <text
                        x={x + width / 2}
                        y={221 - height}
                        textAnchor="middle"
                        fontSize={20}
                        fill="var(--text)"
                      >
                        {count}
                      </text>
                      <text
                        x={x}
                        y={258}
                        textAnchor="middle"
                        fontSize={18}
                        fill="var(--text)"
                      >
                        {low}
                      </text>
                      {index === classes.bins.length - 1 && (
                        <text
                          x={x + width}
                          y={258}
                          textAnchor="middle"
                          fontSize={18}
                          fill="var(--text)"
                        >
                          {high}
                        </text>
                      )}
                    </g>
                  );
                })}
                <text
                  x={200}
                  y={285}
                  textAnchor="middle"
                  fontSize={20}
                  fill="var(--text)"
                >
                  Ölçüm
                </text>
              </g>
            </svg>
            <figcaption>
              Sınıfın sol sınırı dahil, sağ sınırı dışarıda.
            </figcaption>
            <ul>
              {classes.bins.map(({ low, high, count }) => (
                <li key={low}>
                  [{low}, {high}) aralığı, {count} gözlem.
                </li>
              ))}
            </ul>
          </figure>
        </>
      ) : (
        <>
          <div className="f014m-controls">
            {field("lastValue", "A’nın son ölçümü", lastValue, 6, 18)}
            {field("multiplier", "A için çarpan", multiplier, -3, 3)}
            {field("shift", "A’ya eklenen", shift, -8, 8)}
          </div>
          <label className="f014m-toggle">
            <input
              type="checkbox"
              checked={saved.population}
              onChange={(event) =>
                set({ population: event.currentTarget.checked })
              }
            />
            Anakütle tanımında n ile böl
          </label>
          <div className="f014m-result" role="status">
            <p>
              A verileri {sample.sorted.join(", ")}. B verileri{" "}
              {reference.sorted.join(", ")}.
            </p>
            <p>
              A ortalama {fractionLabel(sample.sum, sample.n)}, ortanca{" "}
              {number.format(sample.median!)}, açıklık {sample.range}.
            </p>
            <p>
              Sapma A için {displayDeviation(deviation)}, B için{" "}
              {displayDeviation(referenceDeviation)}. Farkların kare toplamı{" "}
              {saved.population ? "n" : "n−1"} ile bölündü.
            </p>
          </div>
          <figure className="f040-plot">
            <svg
              viewBox="0 0 393 247"
              width="100%"
              role="img"
              aria-labelledby={`${id}-points`}
            >
              <title id={`${id}-points`}>
                A ve B verileri aynı sayı ölçeğinde. A daire, B üçgen.
              </title>
              <g aria-hidden="true">
                <line x1={48} x2={347} y1={92} y2={92} stroke="var(--border)" />
                <line
                  x1={48}
                  x2={347}
                  y1={171}
                  y2={171}
                  stroke="var(--border)"
                />
                <text
                  x={22}
                  y={99}
                  textAnchor="middle"
                  fill="var(--text)"
                  fontSize={20}
                >
                  A
                </text>
                <text
                  x={22}
                  y={178}
                  textAnchor="middle"
                  fill="var(--text)"
                  fontSize={20}
                >
                  B
                </text>
                {samplePoints.map(({ x, lane }, index) => (
                  <g key={index}>
                    {lane > 0 && (
                      <line
                        x1={x}
                        x2={x}
                        y1={92}
                        y2={92 - lane * 19}
                        stroke="var(--border)"
                      />
                    )}
                    <circle
                      cx={x}
                      cy={92 - lane * 19}
                      r={7}
                      fill="var(--accent)"
                    />
                  </g>
                ))}
                {referencePoints.map(({ x, lane }, index) => (
                  <g key={index}>
                    {lane > 0 && (
                      <line
                        x1={x}
                        x2={x}
                        y1={171}
                        y2={171 - lane * 19}
                        stroke="var(--border)"
                      />
                    )}
                    <path
                      d={`M${x} ${163 - lane * 19}l-8 15h16z`}
                      fill="var(--text)"
                    />
                  </g>
                ))}
                <text
                  x={54}
                  y={213}
                  textAnchor="middle"
                  fill="var(--text)"
                  fontSize={21}
                >
                  {minimum}
                </text>
                <text
                  x={340}
                  y={213}
                  textAnchor="middle"
                  fill="var(--text)"
                  fontSize={21}
                >
                  {maximum}
                </text>
              </g>
            </svg>
            <figcaption>
              A daireyle, B üçgenle gösterilir. Yakın işaretler üst üste
              dizilir. Sayıyı yatay konum verir.
            </figcaption>
          </figure>
        </>
      )}
    </details>
  );
}
