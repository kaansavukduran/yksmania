import { useId } from "react";
import {
  equalRemainders020,
  equalRemainders020Example,
  type EqualRemainders020Input,
} from "./equalRemaindersSource020Model";
import {
  r035,
  r035DecimalInfo,
  r035Mul,
  r035Text,
  type R035,
} from "./rationalSource035Model";
import { useExploration } from "./useExploration";

const fields = {
  capacityA: { label: "A kabının kapasitesi", min: 20, max: 120, unit: "L" },
  capacityB: { label: "B kabının kapasitesi", min: 20, max: 120, unit: "L" },
  fillA: { label: "A kabının başlangıç doluluğu", min: 0, max: 100, unit: "%" },
  useA: {
    label: "A kabının içeriğinden tüketilen",
    min: 0,
    max: 100,
    unit: "%",
  },
  useB: {
    label: "B kabının içeriğinden tüketilen",
    min: 0,
    max: 100,
    unit: "%",
  },
} as const;

const numeric = (value: R035) => Number(value.n) / Number(value.d);
function text(value: R035) {
  const decimal = r035DecimalInfo(value, 4);
  return decimal.terminated && !decimal.truncated
    ? decimal.display
    : r035Text(value);
}

function percentage(fraction: R035) {
  const display = text(r035Mul(fraction, r035(100)));
  return display.includes("/") ? `%(${display})` : `%${display}`;
}

type InputKey = keyof EqualRemainders020Input;
type EqualModel = ReturnType<typeof equalRemainders020>;

function TankRange({
  field,
  value,
  change,
}: {
  field: InputKey;
  value: number;
  change: (n: number) => void;
}) {
  const { label, min, max, unit } = fields[field];
  const valueText = unit === "%" ? `%${value}` : `${value} L`;
  return (
    <label className="field">
      <span>
        {label} <strong aria-hidden="true">{valueText}</strong>
      </span>
      <input
        aria-label={label}
        aria-valuetext={valueText}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => change(event.currentTarget.valueAsNumber)}
      />
    </label>
  );
}

function TanksPicture({ model }: { model: EqualModel }) {
  const id = useId();
  const tooMuch = model.kind === "over-capacity";
  const capA = numeric(model.capacityA);
  const capB = numeric(model.capacityB);
  const maximum = Math.max(
    capA,
    capB,
    model.requiredB ? numeric(model.requiredB) : 0,
  );
  const baseX = 22,
    spans = 410 / maximum;
  const bars = [
    {
      name: "A",
      capacity: capA,
      beginning: numeric(model.initialA),
      remaining: numeric(model.remainingA),
      y: 3,
    },
    {
      name: "B",
      capacity: capB,
      beginning: model.requiredB ? numeric(model.requiredB) : null,
      remaining:
        !tooMuch && model.remainingB ? numeric(model.remainingB) : null,
      y: 72,
    },
  ];
  const description = `A kabı ${text(model.capacityA)} L alır. Başlangıç ${text(model.initialA)} L, kalan ${text(model.remainingA)} L. B kabı ${text(model.capacityB)} L alır.`;
  const bDescription = model.requiredB
    ? tooMuch
      ? ` B kabında gereken ${text(model.requiredB)} L kapasiteyi aşıyor.`
      : ` B kabının başlangıcı ${text(model.requiredB)} L, kalanı ${text(model.remainingB!)} L.`
    : model.kind === "inconsistent"
      ? " B tamamen tüketilirse A ile aynı miktarda boya kalamaz."
      : " B kabının başlangıcı için tek bir değer yok.";

  return (
    <figure style={{ marginInline: 0 }}>
      <svg
        className="f011m-diagram"
        viewBox="0 -10 454 155"
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>
          {description}
          {bDescription}
        </title>
        <g aria-hidden="true">
          {bars.map(({ name, capacity, beginning, remaining, y }) => (
            <g key={name} data-tank={name}>
              <text x={baseX} y={y + 16} fill="var(--text)" fontSize="18">
                {name} kabı
              </text>
              <rect
                data-stage="capacity"
                x={baseX}
                y={y + 23}
                width={capacity * spans}
                height="34"
                className="f011m-whole"
              />
              {beginning !== null && (
                <rect
                  data-stage="initial"
                  x={baseX}
                  y={y + 27}
                  width={Math.min(beginning, capacity) * spans}
                  height="10"
                  fill="var(--accent)"
                />
              )}
              {remaining !== null && (
                <rect
                  data-stage="remaining"
                  x={baseX}
                  y={y + 42}
                  width={remaining * spans}
                  height="10"
                  fill="var(--mint)"
                />
              )}
              {tooMuch && name === "B" && beginning !== null && (
                <rect
                  data-stage="overflow"
                  x={baseX + capacity * spans}
                  y={y + 27}
                  width={(beginning - capacity) * spans}
                  height="10"
                  fill="none"
                  stroke="var(--text)"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
              )}
            </g>
          ))}
        </g>
      </svg>
      <figcaption id={`${id}-caption`} className="f011m-limit">
        Çerçeve kapasiteyi, üst bant başlangıç içeriğini, alt bant kalanı
        gösterir. İki kap aynı litre ölçeğindedir.{" "}
        {tooMuch && "Kesikli uzantı, B kabına sığmayan miktarı gösterir."}
      </figcaption>
    </figure>
  );
}

export function EqualRemaindersSource020Lab() {
  const defaults = equalRemainders020Example;
  const [saved, set] = useExploration("equal-remainders-source-020", defaults);
  const value = (key: InputKey) => {
    const { min, max } = fields[key];
    return Number.isInteger(saved[key]) &&
      saved[key] >= min &&
      saved[key] <= max
      ? saved[key]
      : defaults[key];
  };
  const input = {
    capacityA: value("capacityA"),
    capacityB: value("capacityB"),
    fillA: value("fillA"),
    useA: value("useA"),
    useB: value("useB"),
  };
  const model = equalRemainders020(input);
  const control = (field: InputKey) => (
    <TankRange
      field={field}
      value={input[field]}
      change={(next) => set({ [field]: next })}
    />
  );

  return (
    <details data-model="source020-equal-remainders">
      <summary>İki kapta kalanı eşitle</summary>
      <p>
        Atölyedeki iki boya kabında tüketimden sonra eşit miktarda boya kalsın.
        B kabının başlangıç doluluğunu bul.
      </p>
      <div className="f011m-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => set(defaults)}
        >
          Eşit kaplar
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set({ ...defaults, capacityB: 40 })}
        >
          Küçük B kabı
        </button>
      </div>
      <div className="f011m-controls">
        {control("useA")}
        {control("useB")}
      </div>
      <details>
        <summary>Kapasiteleri ve A kabının doluluğunu değiştir</summary>
        <div className="f011m-controls">
          {control("capacityA")}
          {control("capacityB")}
          {control("fillA")}
        </div>
      </details>
      <div className="f011m-result" role="status" data-equal-remainders-result>
        <p>
          A kabında başlangıç{" "}
          <strong>
            {input.capacityA} L × {input.fillA}/100 = {text(model.initialA)} L
          </strong>
          . Bu içerikten %{input.useA} tüketilir, yani {text(model.initialA)} L
          × {input.useA}/100 = {text(model.consumedA)} L.{" "}
          <strong>{text(model.remainingA)} L kalır</strong>.
        </p>
        <p>
          {model.equalCapacity
            ? "Kapasiteler eşit. İki kalan ifadesinde aynı pozitif kapasite çarpanı sadeleşebilir."
            : "Kapasiteler farklı. Eşitliği kalan litreler üzerinden kur."}
        </p>
        {model.kind === "underdetermined" ? (
          <p>
            <strong>B’nin başlangıç doluluğu tek olarak belirlenemez.</strong> B
            içeriğinin tamamı tüketilince her dolulukta 0 L kalır. A’da da 0 L
            kalır.
          </p>
        ) : model.kind === "inconsistent" ? (
          <p>
            <strong>Eşit kalan mümkün değil.</strong> B içeriğinin tamamı
            tüketilince 0 L kalır. A’da {text(model.remainingA)} L var.
          </p>
        ) : (
          model.requiredB &&
          model.fillB && (
            <>
              <p>
                B kabında gereken başlangıç içeriği{" "}
                <strong>
                  {text(model.remainingA)} L ÷ ({100 - input.useB}/100) ={" "}
                  {text(model.requiredB)} L
                </strong>
                . Kapasite {input.capacityB} L olduğundan gereken doluluk{" "}
                <strong>{percentage(model.fillB)}</strong>.
              </p>
              {model.kind === "over-capacity" ? (
                <p>
                  <strong>Bu doluluk %100’ü aşıyor.</strong> B kabı{" "}
                  {text(model.requiredB)} L alamaz.
                </p>
              ) : (
                <p>
                  B’de {text(model.consumedB!)} L tüketilir ve{" "}
                  {text(model.remainingB!)} L kalır. Kalan miktarlar eşit.
                </p>
              )}
            </>
          )
        )}
      </div>
      <TanksPicture model={model} />
    </details>
  );
}
