import { useId } from "react";
import {
  piecewiseRate027,
  piecewiseRate027Example,
} from "./piecewiseRateSource027Model";
import { r035, r035Text, type R035 } from "./rationalSource035Model";
import { useExploration } from "./useExploration";

type Model = ReturnType<typeof piecewiseRate027>;
type Field = keyof typeof piecewiseRate027Example;
const fields = {
  start: { label: "Başlangıç hacmi", unit: "L", min: 0, max: 40 },
  middle: { label: "İlk parça sonundaki hacim", unit: "L", min: 0, max: 40 },
  end: { label: "Son hacim", unit: "L", min: 0, max: 40 },
  firstHours: { label: "İlk parçanın süresi", unit: "sa", min: 1, max: 8 },
  secondHours: { label: "İkinci parçanın süresi", unit: "sa", min: 1, max: 8 },
} as const;
const text = (value: R035) => r035Text(value).replace("-", "−");
const changeText = (value: number) => text(r035(value));

function validValue(field: Field, value: number) {
  const { min, max } = fields[field];
  return Number.isSafeInteger(value)
    ? Math.max(min, Math.min(max, value))
    : piecewiseRate027Example[field];
}

function RateRange({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  const { label, unit, min, max } = fields[field];
  return (
    <label className="f014m-field" htmlFor={id}>
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

function RateGraph({ model }: { model: Model }) {
  const id = useId();
  const left = 74;
  const right = 406;
  const bottom = 217;
  const volumeMax = fields.start.max;
  const x = (hours: number) =>
    left + ((right - left) * hours) / model.totalHours;
  const y = (liters: number) => bottom - (156 * liters) / volumeMax;
  const [first, middle, last] = model.points;
  const position = ({ hours, liters }: (typeof model.points)[number]) =>
    `${x(hours)},${y(liters)}`;

  return (
    <figure style={{ marginInline: 0 }}>
      <svg
        className="f014m-diagram"
        viewBox="0 0 456 310"
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>İki parçalı hacim ve zaman grafiği</title>
        <g aria-hidden="true" fill="var(--text)" fontSize="17">
          <text x={left} y="39" fontSize="18">
            Hacim (L)
          </text>
          <path
            d={`M${left} ${y(volumeMax)}V${bottom}H${right}`}
            className="f014m-axis"
          />
          {[0, volumeMax / 2, volumeMax].map((liters) => (
            <g key={liters}>
              {liters > 0 && (
                <path
                  d={`M${left} ${y(liters)}H${right}`}
                  className="f014m-grid"
                />
              )}
              <text x="60" y={y(liters) + 5} textAnchor="end">
                {liters}
              </text>
            </g>
          ))}
          {model.points.map(({ hours, liters }, index) => (
            <g key={index}>
              <path d={`M${x(hours)} ${bottom}v6`} className="f014m-axis" />
              <text x={x(hours)} y="246" textAnchor="middle">
                {hours}
              </text>
              {index === 1 && liters > 0 && (
                <path
                  d={`M${x(hours)} ${bottom}V${y(liters)}`}
                  className="f014m-grid"
                />
              )}
            </g>
          ))}
          {!model.equalRates && (
            <polyline
              data-whole-rate-line
              points={`${position(first)} ${position(last)}`}
              className="f014m-halo"
            />
          )}
          <polyline
            data-segment-rate-line
            points={model.points.map(position).join(" ")}
            className="f014m-curve"
          />
          {model.points.map(({ hours, liters }, index) => (
            <circle
              data-rate-point={index}
              key={index}
              cx={x(hours)}
              cy={y(liters)}
              r="5.5"
              className="f014m-point"
            />
          ))}
          <text x="240" y="276" textAnchor="middle" fontSize="18">
            Zaman (sa)
          </text>
        </g>
      </svg>
      <figcaption id={`${id}-caption`} className="small muted">
        Başlangıçta {first.liters} L, {middle.hours}. saatte {middle.liters} L
        ve {last.hours}. saatte {last.liters} L.{" "}
        {model.equalRates
          ? "İki parçanın eğimi eşit, üç ölçüm aynı doğru üzerinde."
          : "Kesik çizgi yalnız başlangıç ve bitişi birleştirir. Eğimi bütün sürenin ortalama hızıdır."}
      </figcaption>
    </figure>
  );
}

export function PiecewiseRateSource027Lab() {
  const [saved, set] = useExploration(
    "piecewise-rate-source-027",
    piecewiseRate027Example,
  );
  const start = validValue("start", saved.start);
  const middle = validValue("middle", saved.middle);
  const end = validValue("end", saved.end);
  const firstHours = validValue("firstHours", saved.firstHours);
  const secondHours = validValue("secondHours", saved.secondHours);
  const model = piecewiseRate027({
    start,
    middle,
    end,
    firstHours,
    secondHours,
  });
  const durationMessage = model.equalDurations
    ? "Süreler eşit, iki hızın basit ortalaması aynı sonucu verir."
    : model.equalRates
      ? "İki hız zaten eşit, süreler farklı olsa da basit ortalama aynı sonucu verir."
      : "Süreler farklı, iki hızın basit ortalaması bütün aralığın hızını vermez.";
  const fieldsFor = (keys: Field[]) =>
    keys.map((field) => (
      <RateRange
        key={field}
        field={field}
        value={validValue(field, saved[field])}
        onChange={(value) => set({ [field]: value })}
      />
    ));

  return (
    <details data-model="source027-piecewise-rate">
      <summary>İki parçanın ortalama değişim hızı</summary>
      <p>
        Ölçümler arasında hacim düz çizgiyle değişiyor. Bir parçanın eğimi,
        hacim farkının o parçanın süresine bölümüdür.
      </p>
      <div className="f014m-controls">
        {fieldsFor(["firstHours", "secondHours"])}
      </div>
      <details>
        <summary>Hacim ölçümlerini değiştir</summary>
        <div className="f014m-controls">
          {fieldsFor(["start", "middle", "end"])}
        </div>
      </details>
      <p>
        <button
          className="secondary"
          type="button"
          onClick={() => set(piecewiseRate027Example)}
        >
          Örneğe dön
        </button>
      </p>
      <div className="f014m-result" data-piecewise-rate-result role="status">
        <p>
          İlk {firstHours} saatte {middle} − {start} ={" "}
          {changeText(model.firstChange)} L.{" "}
          <strong>{text(model.firstRate)} L/sa.</strong>
        </p>
        <p>
          Sonraki {secondHours} saatte {end} − {middle} ={" "}
          {changeText(model.secondChange)} L.{" "}
          <strong>{text(model.secondRate)} L/sa.</strong>
        </p>
        <p>
          Net değişim {end} − {start} = {changeText(model.totalChange)} L.{" "}
          <strong>
            {model.totalHours} saatin ortalama hızı {text(model.overallRate)}{" "}
            L/sa.
          </strong>
        </p>
        <p>
          Her hızı kendi süresiyle ağırlıklandırınca aynı sonuç çıkar. [
          {text(model.firstRate)} × {firstHours} + ({text(model.secondRate)}) ×{" "}
          {secondHours}] ÷ {model.totalHours} = {text(model.overallRate)} L/sa.
        </p>
        <p>
          İki hızın basit ortalaması {text(model.simpleMean)} L/sa.{" "}
          {durationMessage}
        </p>
      </div>
      <RateGraph model={model} />
    </details>
  );
}
