import { useId } from "react";
import {
  independentIntervals011,
  interval011,
  intervalText011,
  planeIntegerPairs011,
  PLANE_INTEGER_011,
  PLANE_TRIANGLE_011,
  sameVariableIntervals011,
  solvePlane011,
  testPlanePoint011,
  type FiniteInterval011,
  type Interval011,
  type IntervalOperation011,
  type Plane011,
  type PlanePoint011,
} from "./basicInequalitiesSource011Model";
import { r035, r035Text, type R035 } from "./rationalSource035Model";
import { useExploration } from "./useExploration";
import "./basicInequalitiesSource011Lab.css";

const numeric = (q: R035) => Number(q.n) / Number(q.d);
const print = (q: R035) => r035Text(q).replace("-", "−");
const pointText = ({ x, y }: PlanePoint011) => `(${print(x)}, ${print(y)})`;
const zeroPoint = { x: r035(0), y: r035(0) };
const opText = (closed: boolean, greater = false) =>
  greater ? (closed ? "≥" : ">") : closed ? "≤" : "<";
const boundedInteger = (
  value: number,
  min: number,
  max: number,
  fallback: number,
) => (Number.isInteger(value) ? Math.min(max, Math.max(min, value)) : fallback);

function Slider011({
  label,
  min,
  max,
  value,
  change,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  change: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="bi011-slider">
      <label htmlFor={id}>{label}</label>
      <span aria-hidden="true">{value}</span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => change(e.currentTarget.valueAsNumber)}
      />
    </div>
  );
}

function Check011({
  label,
  checked,
  change,
}: {
  label: string;
  checked: boolean;
  change: (value: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="bi011-choice">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => change(e.currentTarget.checked)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function PlanePicture({
  plane,
  point,
  solution,
  pairs,
}: {
  plane: Plane011;
  point: PlanePoint011;
  solution: ReturnType<typeof solvePlane011>;
  pairs: PlanePoint011[];
}) {
  const id = useId();
  const points = [zeroPoint, point, ...solution.vertices];
  const coordinates = [
    numeric(plane.xMin),
    numeric(plane.yMin),
    ...points.flatMap(({ x, y }) => [numeric(x), numeric(y)]),
  ];
  const low = Math.floor(Math.min(0, ...coordinates)) - 1;
  const high = Math.ceil(Math.max(4, ...coordinates)) + 1;
  const extent = 266,
    pad = 36;
  const coordinate = (q: number) => pad + ((q - low) / (high - low)) * extent;
  const X = (q: number) => coordinate(q);
  const Y = (q: number) => extent + 2 * pad - coordinate(q);
  const px = (q: PlanePoint011) => X(numeric(q.x));
  const py = (q: PlanePoint011) => Y(numeric(q.y));
  const yAt = (x: number) =>
    (numeric(plane.cap) - numeric(plane.xCoefficient) * x) /
    numeric(plane.yCoefficient);
  const minorTicks = Array.from(
    { length: high - low + 1 },
    (_, i) => low + i,
  ).filter((t) => t !== 0);
  const majorTicks = minorTicks.filter((t) => high - low <= 10 || t % 2 === 0);
  const xAxisStart =
    !plane.yClosed && numeric(plane.yMin) === 0 ? X(high) : X(low);
  const yAxisStart =
    !plane.xClosed && numeric(plane.xMin) === 0 ? Y(high) : Y(low);
  const accepted = testPlanePoint011(plane, point).accepted;
  const diamond = `M ${px(point)} ${py(point) - 7} l 7 7 -7 7 -7 -7 Z`;
  return (
    <figure className="bi011-figure">
      <svg
        viewBox="0 0 338 338"
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>
          Eşitsizlik sisteminin koordinat düzlemi
        </title>
        <defs>
          <clipPath id={`${id}-plot`}>
            <rect x={pad} y={pad} width={extent} height={extent} />
          </clipPath>
        </defs>
        <g aria-hidden="true">
          <g className="bi011-grid">
            {minorTicks.map((t) => (
              <path
                key={t}
                d={[
                  plane.xClosed || numeric(plane.xMin) !== t
                    ? `M${X(t)} ${Y(low)}V${Y(high)}`
                    : "",
                  plane.yClosed || numeric(plane.yMin) !== t
                    ? `M${X(low)} ${Y(t)}H${X(high)}`
                    : "",
                ].join(" ")}
              />
            ))}
          </g>
          <g className="bi011-axis">
            <path
              d={`M${xAxisStart} ${Y(0)}H${X(high) + 8} M${X(0)} ${yAxisStart}V${Y(high) - 8}`}
            />
            <path
              d={`M${X(high) + 3} ${Y(0) - 4}l5 4 -5 4 M${X(0) - 4} ${Y(high) - 3}l4 -5 4 5`}
            />
          </g>
          <g clipPath={`url(#${id}-plot)`}>
            {solution.shape === "triangle" && (
              <polygon
                className="bi011-fill"
                points={solution.vertices
                  .map((q) => `${px(q)},${py(q)}`)
                  .join(" ")}
              />
            )}
            <line
              className="bi011-boundary"
              data-line="x"
              data-closed={plane.xClosed}
              x1={X(numeric(plane.xMin))}
              x2={X(numeric(plane.xMin))}
              y1={Y(low)}
              y2={Y(high)}
            />
            <line
              className="bi011-boundary"
              data-line="y"
              data-closed={plane.yClosed}
              x1={X(low)}
              x2={X(high)}
              y1={Y(numeric(plane.yMin))}
              y2={Y(numeric(plane.yMin))}
            />
            <line
              className="bi011-boundary"
              data-line="cap"
              data-closed={plane.capClosed}
              x1={X(low)}
              x2={X(high)}
              y1={Y(yAt(low))}
              y2={Y(yAt(high))}
            />
          </g>
          {majorTicks.map((t) => (
            <g key={t} className="bi011-grid-label">
              <text x={X(t)} y={Y(0) + 23} textAnchor="middle">
                {t}
              </text>
              <text x={X(0) - 8} y={Y(t) + 4} textAnchor="end">
                {t}
              </text>
            </g>
          ))}
          <text
            className="bi011-grid-label"
            x={X(0) - 8}
            y={Y(0) + 23}
            textAnchor="end"
          >
            0
          </text>
          <text className="bi011-axis-label" x={X(high) + 15} y={Y(0) + 5}>
            x
          </text>
          <text className="bi011-axis-label" x={X(0) - 4} y={Y(high) - 15}>
            y
          </text>
          {pairs.map((q) => (
            <circle
              className="bi011-pair"
              key={pointText(q)}
              cx={px(q)}
              cy={py(q)}
              r="2.4"
            />
          ))}
          {solution.vertices.map((q) => (
            <circle
              key={pointText(q)}
              className="bi011-vertex"
              data-closed={q.included}
              cx={px(q)}
              cy={py(q)}
              r="5.5"
            />
          ))}
          <path className="bi011-trial" data-accepted={accepted} d={diamond} />
        </g>
      </svg>
      <figcaption id={`${id}-caption`}>
        {solution.shape === "triangle"
          ? "Taralı üçgen üç koşulun ortak bölgesidir. "
          : solution.shape === "point"
            ? "Ortak bölge tek bir noktadır. "
            : "Koşulların ortak bölgesi boş. "}
        Düz çizgi eşitliğe izin verir, kesik çizgi vermez. Baklava işareti
        deneme noktası P{pointText(point)}.
      </figcaption>
    </figure>
  );
}

function capExpression(plane: Plane011) {
  const term = (value: R035, letter: string) =>
    numeric(value) === 1 ? letter : `${print(value)}${letter}`;
  return `${term(plane.xCoefficient, "x")} + ${term(plane.yCoefficient, "y")}`;
}

const planeSliders = {
  xMin: ["x alt sınırı", -2, 3],
  yMin: ["y alt sınırı", -2, 3],
  xCoefficient: ["x katsayısı", 1, 4],
  yCoefficient: ["y katsayısı", 1, 4],
  cap: ["Eğik doğrunun sağ tarafı", -2, 12],
} as const;
type PlaneSlider = keyof typeof planeSliders;
const planeSliderKeys = Object.keys(planeSliders) as PlaneSlider[];

function planeSettings(plane: Plane011, showPairs: boolean) {
  return {
    xMin: numeric(plane.xMin),
    yMin: numeric(plane.yMin),
    xCoefficient: numeric(plane.xCoefficient),
    yCoefficient: numeric(plane.yCoefficient),
    cap: numeric(plane.cap),
    xClosed: plane.xClosed,
    yClosed: plane.yClosed,
    capClosed: plane.capClosed,
    pointX: 2,
    pointY: 1,
    showPairs,
  };
}

const planeDefaults = planeSettings(PLANE_TRIANGLE_011, false);

export function HalfPlaneSource011Lab() {
  const [saved, set] = useExploration("half-plane-source-011", planeDefaults);
  const { showPairs, xClosed, yClosed, capClosed } = saved;
  const fraction = (key: PlaneSlider) => {
    const [, min, max] = planeSliders[key];
    return r035(boundedInteger(saved[key], min, max, planeDefaults[key]));
  };
  const plane: Plane011 = {
    xMin: fraction("xMin"),
    yMin: fraction("yMin"),
    xCoefficient: fraction("xCoefficient"),
    yCoefficient: fraction("yCoefficient"),
    cap: fraction("cap"),
    xClosed,
    yClosed,
    capClosed,
  };
  const point = {
    x: r035(boundedInteger(saved.pointX, -3, 7, planeDefaults.pointX)),
    y: r035(boundedInteger(saved.pointY, -3, 7, planeDefaults.pointY)),
  };
  const solution = solvePlane011(plane);
  const test = testPlanePoint011(plane, point);
  const integers = showPairs ? planeIntegerPairs011(plane) : null;
  const rules = [
    `x ${opText(plane.xClosed, true)} ${print(plane.xMin)}`,
    `y ${opText(plane.yClosed, true)} ${print(plane.yMin)}`,
    `${capExpression(plane)} ${opText(plane.capClosed)} ${print(plane.cap)}`,
  ] as const;
  return (
    <div className="bi011-lab" data-model="source011-half-plane">
      <div className="bi011-buttons">
        <button
          type="button"
          className="secondary"
          onClick={() => set(planeDefaults)}
        >
          Üçgen örneğini aç
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set(planeSettings(PLANE_INTEGER_011, true))}
        >
          Tam sayı örneğini aç
        </button>
      </div>
      <p className="bi011-equation">{rules.join(" ve ")}</p>
      <Check011
        label="Eğik sınırı dahil et"
        checked={plane.capClosed}
        change={(capClosed) => set({ capClosed })}
      />
      <PlanePicture
        plane={plane}
        point={point}
        solution={solution}
        pairs={integers?.pairs ?? []}
      />
      {solution.vertices.length > 0 && (
        <p data-model-vertices>
          Köşeler{" "}
          {solution.vertices
            .map(
              (vertex) =>
                `${pointText(vertex)} ${vertex.included ? "dahil" : "hariç"}`,
            )
            .join(", ")}
          .
        </p>
      )}
      <details>
        <summary>Sınırları ve katsayıları değiştir</summary>
        <div className="bi011-sliders">
          {planeSliderKeys.map((key) => {
            const [label, min, max] = planeSliders[key];
            return (
              <Slider011
                key={key}
                label={label}
                min={min}
                max={max}
                value={numeric(plane[key])}
                change={(value) => set({ [key]: value })}
              />
            );
          })}
        </div>
        <Check011
          label="Dikey sınırı dahil et"
          checked={plane.xClosed}
          change={(xClosed) => set({ xClosed })}
        />
        <Check011
          label="Yatay sınırı dahil et"
          checked={plane.yClosed}
          change={(yClosed) => set({ yClosed })}
        />
      </details>
      <fieldset>
        <legend>Deneme noktası P</legend>
        <div className="bi011-sliders">
          <Slider011
            label="P noktasının x değeri"
            min={-3}
            max={7}
            value={numeric(point.x)}
            change={(pointX) => set({ pointX })}
          />
          <Slider011
            label="P noktasının y değeri"
            min={-3}
            max={7}
            value={numeric(point.y)}
            change={(pointY) => set({ pointY })}
          />
        </div>
        <p role="status" data-model-result>
          P{pointText(point)} ortak bölgeye{" "}
          {test.accepted ? "dahil." : "girmez."}
        </p>
        <ul>
          {test.checks.map((check, index) => (
            <li key={check.boundary}>
              {rules[index]} için {print(check.left)}{" "}
              {opText(check.closed, check.direction === "above")}{" "}
              {print(check.right)} {check.satisfies ? "doğru" : "yanlış"}.
              {check.onBoundary &&
                " P sınır üzerinde olduğu için bu doğruya göre bir taraf seçtirmez."}
            </li>
          ))}
        </ul>
      </fieldset>
      <Check011
        label="Tam sayı sıralı ikililerini göster"
        checked={showPairs}
        change={(showPairs) => set({ showPairs })}
      />
      {integers && (
        <div>
          <p role="status">
            <strong>{String(integers.count)} tam sayı sıralı ikilisi.</strong>{" "}
            {solution.shape === "triangle" &&
              "Ortak bölgede sonsuz sayıda gerçek sayı sıralı ikilisi var."}
          </p>
          {integers.rows.length > 0 && (
            <table>
              <caption>
                Her tam sayı x için izin verilen tam sayı y değerleri
              </caption>
              <thead>
                <tr>
                  <th scope="col">x</th>
                  <th scope="col">y değerleri</th>
                  <th scope="col">İkili sayısı</th>
                </tr>
              </thead>
              <tbody>
                {integers.rows.map(({ x, fromY, toY, count }) => (
                  <tr key={String(x)}>
                    <th scope="row">{String(x)}</th>
                    <td>{fromY === toY ? String(fromY) : `${fromY}…${toY}`}</td>
                    <td>{String(count)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

type Limits = {
  low: number;
  high: number;
  lowClosed: boolean;
  highClosed: boolean;
};
const limits = (
  low: number,
  high: number,
  lowClosed = true,
  highClosed = true,
): Limits => ({ low, high, lowClosed, highClosed });
function intervalSettings(
  a: Limits,
  b: Limits,
  operation: IntervalOperation011,
  same = false,
) {
  return {
    aLow: a.low,
    aHigh: a.high,
    aLowClosed: a.lowClosed,
    aHighClosed: a.highClosed,
    bLow: b.low,
    bHigh: b.high,
    bLowClosed: b.lowClosed,
    bHighClosed: b.highClosed,
    operation,
    same,
  };
}
const presets = {
  positive: intervalSettings(limits(1, 3, false, false), limits(2, 4), "add"),
  mixed: intervalSettings(limits(-2, 3), limits(1, 4), "multiply"),
  transfer: intervalSettings(
    limits(3, 5, false, true),
    limits(1, 2, true, false),
    "divide",
  ),
  zero: intervalSettings(limits(1, 2), limits(-2, 3), "divide"),
  same: intervalSettings(
    limits(-2, 3, false, false),
    limits(-2, 3, false, false),
    "multiply",
    true,
  ),
};
const operations = [
  ["add", "Topla"],
  ["subtract", "Çıkar"],
  ["multiply", "Çarp"],
  ["divide", "Böl"],
] as const;
const expressions: Record<IntervalOperation011, [string, string]> = {
  add: ["a + b", "2a"],
  subtract: ["a − b", "a − a"],
  multiply: ["a · b", "a²"],
  divide: ["a/b", "a/a"],
};

function intervalFrom(l: Limits) {
  try {
    return interval011(r035(l.low), r035(l.high), l.lowClosed, l.highClosed);
  } catch {
    return null;
  }
}

function EditInterval({
  name,
  value,
  change,
}: {
  name: string;
  value: Limits;
  change: <K extends keyof Limits>(
    key: Capitalize<K>,
    value: Limits[K],
  ) => void;
}) {
  return (
    <fieldset>
      <legend>{name} aralığı</legend>
      <div className="bi011-sliders">
        <Slider011
          label={`${name} alt ucu`}
          min={-5}
          max={6}
          value={value.low}
          change={(low) => change("Low", low)}
        />
        <Slider011
          label={`${name} üst ucu`}
          min={-5}
          max={6}
          value={value.high}
          change={(high) => change("High", high)}
        />
      </div>
      <Check011
        label={`${name} alt ucu dahil`}
        checked={value.lowClosed}
        change={(lowClosed) => change("LowClosed", lowClosed)}
      />
      <Check011
        label={`${name} üst ucu dahil`}
        checked={value.highClosed}
        change={(highClosed) => change("HighClosed", highClosed)}
      />
    </fieldset>
  );
}

function IntervalPicture({
  a,
  b,
  out,
}: {
  a: FiniteInterval011;
  b: FiniteInterval011 | null;
  out: Interval011[];
}) {
  const id = useId();
  const rows = b
    ? ([
        ["a", [a]],
        ["b", [b]],
        ["Sonuç", out],
      ] as const)
    : ([
        ["a", [a]],
        ["Sonuç", out],
      ] as const);
  const values = rows.flatMap(([, intervals]) =>
    intervals.flatMap(({ low, high }) =>
      [low.value, high.value].flatMap((q) => (q === null ? [] : [numeric(q)])),
    ),
  );
  const low = Math.floor(Math.min(0, ...values)) - 1;
  const high = Math.ceil(Math.max(0, ...values)) + 1;
  const X = (value: number) => 85 + ((value - low) / (high - low)) * 238;
  const sizeY = 36 + 45 * rows.length;
  return (
    <figure className="bi011-figure">
      <svg
        viewBox={`0 0 338 ${sizeY}`}
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>Aralıkların sayı doğruları</title>
        <g aria-hidden="true">
          <path className="bi011-grid" d={`M${X(0)} 22V${sizeY - 16}`} />
          <text
            x={X(0)}
            y="18"
            className="bi011-grid-label"
            textAnchor="middle"
          >
            0
          </text>
          {rows.map(([name, intervals], row) => {
            const y = 42 + row * 45;
            return (
              <g key={name}>
                <text x="18" y={y + 4} className="bi011-axis-label">
                  {name}
                </text>
                <path className="bi011-axis" d={`M${X(low)} ${y}H${X(high)}`} />
                {intervals.map(({ low: left, high: right }) => {
                  const lo =
                    left.value === null ? X(low) : X(numeric(left.value));
                  const hi =
                    right.value === null ? X(high) : X(numeric(right.value));
                  return (
                    <g key={`${lo},${hi}`} className="bi011-interval">
                      <path d={`M${lo} ${y}H${hi}`} />
                      {left.value === null ? (
                        <path d={`M${lo + 5} ${y - 5}l-5 5 5 5`} />
                      ) : (
                        <circle
                          cx={lo}
                          cy={y}
                          r="5"
                          data-closed={left.closed}
                        />
                      )}
                      {right.value === null ? (
                        <path d={`M${hi - 5} ${y - 5}l5 5 -5 5`} />
                      ) : (
                        <circle
                          cx={hi}
                          cy={y}
                          r="5"
                          data-closed={right.closed}
                        />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </g>
      </svg>
      <figcaption id={`${id}-caption`}>
        {rows
          .map(
            ([name, intervals]) =>
              `${name} ${intervalText011(intervals).replaceAll("-", "−")}`,
          )
          .join(" · ")}
        . Boş işaret uç değerinin alınamadığını, dolu işaret alınabildiğini
        gösterir.
      </figcaption>
    </figure>
  );
}

export function IntervalArithmeticSource011Lab() {
  const id = useId();
  const [state, set] = useExploration(
    "interval-arithmetic-source-011",
    presets.positive,
  );
  const operation =
    operations.find(([key]) => key === state.operation)?.[0] ??
    presets.positive.operation;
  const readLimits = (name: "a" | "b"): Limits => ({
    low: boundedInteger(
      state[`${name}Low`],
      -5,
      6,
      presets.positive[`${name}Low`],
    ),
    high: boundedInteger(
      state[`${name}High`],
      -5,
      6,
      presets.positive[`${name}High`],
    ),
    lowClosed: state[`${name}LowClosed`],
    highClosed: state[`${name}HighClosed`],
  });
  const aLimits = readLimits("a");
  const bLimits = readLimits("b");
  const a = intervalFrom(aLimits);
  const b = intervalFrom(bLimits);
  const result =
    a &&
    (state.same
      ? sameVariableIntervals011(operation, a)
      : b && independentIntervals011(operation, a, b));
  const expression = expressions[operation][Number(state.same)];
  return (
    <div className="bi011-lab" data-model="source011-interval-arithmetic">
      <div className="bi011-buttons">
        <button
          type="button"
          className="secondary"
          onClick={() => set(presets.positive)}
        >
          Pozitif aralıklar
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set(presets.mixed)}
        >
          Karma işaretli çarpım
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set(presets.same)}
        >
          Aynı değişkenin karesi
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set(presets.transfer)}
        >
          Fark ve bölüm örneği
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set(presets.zero)}
        >
          Sıfırı geçen payda
        </button>
      </div>
      <fieldset>
        <legend>İşlem</legend>
        <div className="bi011-options">
          {operations.map(([key, label]) => (
            <div key={key} className="bi011-choice">
              <input
                id={`${id}-${key}`}
                type="radio"
                name={id}
                checked={operation === key}
                onChange={() => set({ operation: key })}
              />
              <label htmlFor={`${id}-${key}`}>{label}</label>
            </div>
          ))}
        </div>
      </fieldset>
      <Check011
        label="İki yerde de aynı a değerini kullan (a = b)"
        checked={state.same}
        change={(same) => set({ same })}
      />
      <p role="status" data-model-result>
        {result ? (
          <strong>
            {expression} için{" "}
            {intervalText011(result.intervals).replaceAll("-", "−")}
          </strong>
        ) : (
          "Alt ucu üst uçtan küçük yap. Uçlar eşitse aralığın tek bir değer içermesi için iki ucu da dahil et."
        )}
      </p>
      {result && a && (
        <IntervalPicture
          a={a}
          b={state.same ? null : b}
          out={result.intervals}
        />
      )}
      <p>
        {state.same
          ? "Bir kez seçilen a, ifadenin iki yerinde de aynı değerdir."
          : "a ve b ayrı ayrı seçilebilir. Her sonuç ucu için gereken değerlerin kendi aralıklarında alınıp alınamadığını kontrol et."}
      </p>
      {operation === "subtract" && !state.same && (
        <p>
          Alt uçta küçük a ile büyük b, üst uçta büyük a ile küçük b kullanılır.
        </p>
      )}
      {operation === "multiply" &&
        (state.same ? (
          <p>a aralığı sıfırı içeriyorsa a² sıfıra ulaşır.</p>
        ) : (
          <p>
            Karma işaretlerde dört uç çarpımını karşılaştır. Çarpanlardan biri 0
            olabiliyorsa çarpım da 0 olabilir.
          </p>
        ))}
      {operation === "divide" && result && (
        <p>
          {result.excludedZero
            ? "Payda 0 olduğunda işlem tanımsızdır. Sıfır bu hesapta alınmaz. "
            : ""}
          {state.same
            ? "a sıfırdan farklı olduğunda a/a = 1."
            : result.approachesZero
              ? "Tersini alırken paydanın negatif ve pozitif kısımlarını ayrı incele."
              : "Sıfırdan uzak ve aynı işaretli payda uçlarının tersleri yer değiştirir."}
        </p>
      )}
      <details>
        <summary>Aralıkların uçlarını değiştir</summary>
        <EditInterval
          name="a"
          value={aLimits}
          change={(key, value) => set({ [`a${key}`]: value })}
        />
        {!state.same && (
          <EditInterval
            name="b"
            value={bLimits}
            change={(key, value) => set({ [`b${key}`]: value })}
          />
        )}
      </details>
    </div>
  );
}
