import { useId } from "react";
import {
  r035,
  r035Compare,
  r035DecimalInfo,
  r035Div,
  r035Sub,
  r035Text,
  type R035,
} from "./rationalSource035Model";
import {
  sharedSpeed026,
  sharedSpeed026Example,
  testSpeedDay026,
} from "./sharedSpeedSource026Model";
import { useExploration } from "./useExploration";

type Model = ReturnType<typeof sharedSpeed026>;

function display(value: R035) {
  const decimal = r035DecimalInfo(value, 2);
  return decimal.terminated && !decimal.truncated
    ? decimal.display
    : r035Text(value);
}

function inequality({ lower, upper }: Model["a"]) {
  return `${display(lower)} < v < ${display(upper)}`;
}

function bounded(value: number, min: number, max: number, fallback: number) {
  return Number.isSafeInteger(value)
    ? Math.max(min, Math.min(max, value))
    : fallback;
}

function SpeedRange({
  label,
  unit,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <label className="field" htmlFor={id} style={{ marginBlock: 0 }}>
      <span>
        {label}{" "}
        <strong aria-hidden="true">
          {value} {unit}
        </strong>
      </span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        aria-valuetext={`${value} ${unit}`}
        onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
      />
    </label>
  );
}

function SpeedIntervals({ model, trial }: { model: Model; trial: R035 }) {
  const id = useId();
  const low =
    r035Compare(model.a.lower, model.b.lower) <= 0
      ? model.a.lower
      : model.b.lower;
  const high =
    r035Compare(model.a.upper, model.b.upper) >= 0
      ? model.a.upper
      : model.b.upper;
  const span = r035Sub(high, low);
  const left = 125;
  const right = 405;
  const axis = 173;
  const position = (value: R035) => {
    const offset = r035Div(r035Sub(value, low), span);
    return left + ((right - left) * Number(offset.n)) / Number(offset.d);
  };
  const trialOnAxis =
    r035Compare(low, trial) <= 0 && r035Compare(trial, high) <= 0;
  const trialX = position(trial);
  const rows = [
    { label: "1. gün", y: 52, interval: model.a, className: "f012m-line-a" },
    { label: "2. gün", y: 98, interval: model.b, className: "f012m-line-b" },
    {
      label: "Ortak",
      y: 144,
      interval: model.kind === "open" ? model : null,
      className: "f012m-whole",
    },
  ];

  return (
    <figure style={{ marginInline: 0 }}>
      <svg
        className="f012m-diagram"
        viewBox="0 0 456 258"
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>İki günün açık sürat aralıkları</title>
        <g aria-hidden="true">
          {rows.map(({ label, y, interval, className }) => {
            const start = interval ? position(interval.lower) : 0;
            const end = interval ? position(interval.upper) : 0;
            const radius = Math.min(6, (end - start) / 3);
            return (
              <g key={label} data-speed-row={label}>
                <text x="23" y={y + 5} fill="var(--text)" fontSize="17">
                  {interval ? label : "Ortak yok"}
                </text>
                {interval && (
                  <>
                    <line
                      data-speed-interval
                      x1={start}
                      x2={end}
                      y1={y}
                      y2={y}
                      className={className}
                    />
                    {[start, end].map((x, index) => (
                      <circle
                        data-open-speed-end={index}
                        key={index}
                        cx={x}
                        cy={y}
                        r={radius}
                        className={className}
                        style={{
                          fill: "var(--surface)",
                          strokeDasharray: "none",
                        }}
                      />
                    ))}
                  </>
                )}
              </g>
            );
          })}
          <path d={`M${left} ${axis}H${right}`} className="f012m-axis" />
          {[
            { value: low, x: left },
            { value: high, x: right },
          ].map(({ value, x }) => (
            <g key={r035Text(value)}>
              <path d={`M${x} ${axis - 4}v8`} className="f012m-axis" />
              <text
                x={x}
                y="199"
                textAnchor="middle"
                fill="var(--text)"
                fontSize="17"
              >
                {display(value)}
              </text>
            </g>
          ))}
          {trialOnAxis && (
            <g data-speed-trial>
              <path d={`M${trialX} 30V${axis}`} className="f012m-guide" />
              <circle cx={trialX} cy={axis} r="4" fill="var(--text)" />
            </g>
          )}
          <text
            x="265"
            y="222"
            textAnchor="middle"
            fill="var(--text)"
            fontSize="18"
          >
            Sürat (km/sa)
          </text>
        </g>
      </svg>
      <figcaption id={`${id}-caption`} className="small muted">
        1. gün {inequality(model.a)} km/sa, 2. gün {inequality(model.b)} km/sa.{" "}
        {model.kind === "open"
          ? `Ortak aralık ${inequality(model)} km/sa.`
          : "Ortak sürat yok."}{" "}
        Boş daireler aralığa dahil olmayan uçlardır.{" "}
        {trialOnAxis
          ? `Dikey çizgi denenen ${display(trial)} km/sa sürati gösterir.`
          : `Denenen ${display(trial)} km/sa sürat eksenin gösterdiği değerlerin dışındadır.`}
      </figcaption>
    </figure>
  );
}

export function SharedSpeedSource026Lab() {
  const [saved, set] = useExploration(
    "shared-speed-source-026",
    sharedSpeed026Example,
  );
  const a = {
    distance: bounded(saved.distanceA, 20, 140, 70),
    minHours: bounded(saved.lowerA, 1, 11, 5),
    maxHours: 7,
  };
  const b = {
    distance: bounded(saved.distanceB, 20, 140, 84),
    minHours: bounded(saved.lowerB, 1, 11, 5),
    maxHours: 7,
  };
  a.maxHours = bounded(
    saved.upperA,
    a.minHours + 1,
    12,
    Math.max(7, a.minHours + 1),
  );
  b.maxHours = bounded(
    saved.upperB,
    b.minHours + 1,
    12,
    Math.max(7, b.minHours + 1),
  );
  const trial = bounded(saved.trial, 1, 140, 13);
  const speed = r035(trial);
  const model = sharedSpeed026(a, b);
  const fitsA = testSpeedDay026(a, speed);
  const fitsB = testSpeedDay026(b, speed);
  const integers = model.integers;

  return (
    <details data-model="source026-shared-speed">
      <summary>İki güne de uyan sürat aralığı</summary>
      <p>
        İki gün aynı sabit süratle yol alınıyor. Her günün sürüş süresi kendi
        iki sınırı arasında kalmalı.
      </p>
      <div className="f012m-controls">
        <SpeedRange
          label="1. günün yolu"
          unit="km"
          min={20}
          max={140}
          value={a.distance}
          onChange={(distanceA) => set({ distanceA })}
        />
        <SpeedRange
          label="2. günün yolu"
          unit="km"
          min={20}
          max={140}
          value={b.distance}
          onChange={(distanceB) => set({ distanceB })}
        />
      </div>
      <details>
        <summary>Günlerin süre sınırlarını değiştir</summary>
        <div className="f012m-controls">
          <SpeedRange
            label="1. gün alt süre sınırı"
            unit="sa"
            min={1}
            max={a.maxHours - 1}
            value={a.minHours}
            onChange={(lowerA) => set({ lowerA })}
          />
          <SpeedRange
            label="1. gün üst süre sınırı"
            unit="sa"
            min={a.minHours + 1}
            max={12}
            value={a.maxHours}
            onChange={(upperA) => set({ upperA })}
          />
          <SpeedRange
            label="2. gün alt süre sınırı"
            unit="sa"
            min={1}
            max={b.maxHours - 1}
            value={b.minHours}
            onChange={(lowerB) => set({ lowerB })}
          />
          <SpeedRange
            label="2. gün üst süre sınırı"
            unit="sa"
            min={b.minHours + 1}
            max={12}
            value={b.maxHours}
            onChange={(upperB) => set({ upperB })}
          />
        </div>
      </details>
      <div className="f012m-actions">
        <button
          className="secondary"
          type="button"
          onClick={() => set(sharedSpeed026Example)}
        >
          Örneğe dön
        </button>
        <button
          className="secondary"
          type="button"
          onClick={() =>
            set({ ...sharedSpeed026Example, distanceB: 98, trial: 14 })
          }
        >
          Uçların değdiği örnek
        </button>
      </div>
      <div className="f012m-result" data-shared-speed-result role="status">
        <p>
          Bir günün yolu sabitken süre uzadıkça sürat düşer. Alt sürat sınırı
          yolu üst süreye, üst sürat sınırı yolu alt süreye bölerek bulunur.
        </p>
        <p>
          1. gün ({a.minHours} &lt; süre &lt; {a.maxHours} sa) {a.distance}/
          {a.maxHours} &lt; v &lt; {a.distance}/{a.minHours} →{" "}
          <strong>{inequality(model.a)} km/sa</strong>
        </p>
        <p>
          2. gün ({b.minHours} &lt; süre &lt; {b.maxHours} sa) {b.distance}/
          {b.maxHours} &lt; v &lt; {b.distance}/{b.minHours} →{" "}
          <strong>{inequality(model.b)} km/sa</strong>
        </p>
        <p>
          {model.kind === "open" ? (
            <>
              <strong>Ortak sürat aralığı {inequality(model)} km/sa.</strong>{" "}
              Büyük alt sınır ve küçük üst sınır alınır. Uçlar dışarıda kalır.
            </>
          ) : (
            <>
              <strong>İki güne uyan sürat yok.</strong>{" "}
              {model.kind === "touch"
                ? `Aralıklar yalnız ${display(model.lower)} km/sa sınırında değiyor. Bu uç ikisine de dahil değil.`
                : "Bir aralığın üst sınırı diğerinin alt sınırından küçük."}
            </>
          )}
        </p>
        {model.kind === "open" && (
          <p>
            {integers === null
              ? "Bu açık aralıkta tam sayı sürat yok."
              : integers.first === integers.last
                ? `Bu açık aralıktaki tek tam sayı sürat ${integers.first} km/sa.`
                : `Bu açık aralıktaki tam sayı süratler ${integers.first} ile ${integers.last} km/sa arasında, bu iki tam sayı dahil.`}
          </p>
        )}
      </div>
      <SpeedRange
        label="Deneceğin sürat"
        unit="km/sa"
        min={1}
        max={140}
        value={trial}
        onChange={(trial) => set({ trial })}
      />
      <p data-shared-speed-trial>
        {trial} km/sa ile 1. gün {display(fitsA.hours)} sa (
        {fitsA.fits ? "uyar" : "uymaz"}), 2. gün {display(fitsB.hours)} sa (
        {fitsB.fits ? "uyar" : "uymaz"}).
      </p>
      <SpeedIntervals model={model} trial={speed} />
    </details>
  );
}
