import { useId } from "react";
import { r035DecimalInfo, r035Text, type R035 } from "./rationalSource035Model";
import { useExploration } from "./useExploration";
import {
  splitInterest022,
  splitInterest022EqualExample,
  splitInterest022Example,
  type SplitInterest022Input,
} from "./splitInterestSource022Model";

const defaults = {
  ...splitInterest022Example,
  interest: String(splitInterest022Example.interest),
};
const equal = {
  ...splitInterest022EqualExample,
  interest: String(splitInterest022EqualExample.interest),
};

const fields = {
  principal: {
    label: "Toplam anapara",
    min: 1000,
    max: 20000,
    step: 100,
    unit: "TL",
  },
  rateA: {
    label: "A kolunun yıllık faiz oranı",
    min: 0,
    max: 30,
    step: 1,
    unit: "%",
  },
  monthsA: { label: "A kolunun süresi", min: 0, max: 24, step: 1, unit: "ay" },
  rateB: {
    label: "B kolunun yıllık faiz oranı",
    min: 0,
    max: 30,
    step: 1,
    unit: "%",
  },
  monthsB: { label: "B kolunun süresi", min: 0, max: 24, step: 1, unit: "ay" },
} as const;

type RangeKey = Exclude<keyof SplitInterest022Input, "interest">;
type SplitModel = ReturnType<typeof splitInterest022>;

function text(value: R035) {
  const decimal = r035DecimalInfo(value, 4);
  return (
    decimal.terminated && !decimal.truncated ? decimal.display : r035Text(value)
  ).replace("-", "−");
}

function InterestRange({
  field,
  value,
  change,
}: {
  field: RangeKey;
  value: number;
  change: (next: number) => void;
}) {
  const { label, min, max, step, unit } = fields[field];
  const valueText = unit === "%" ? `%${value}` : `${value} ${unit}`;
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
        step={step}
        value={value}
        onChange={(event) => change(event.currentTarget.valueAsNumber)}
      />
    </label>
  );
}

function AllocationPicture({
  model,
}: {
  model: Extract<SplitModel, { kind: "unique" }>;
}) {
  const id = useId();
  const start = 22,
    span = 410;
  const bar = (
    key: "principal" | "interest",
    title: string,
    a: R035,
    b: R035,
    total: R035,
    y: number,
  ) => {
    const leftWidth =
      total.n === 0n
        ? 0
        : (span * Number(a.n * total.d)) / Number(a.d * total.n);
    const rightWidth =
      total.n === 0n
        ? 0
        : (span * Number(b.n * total.d)) / Number(b.d * total.n);
    return (
      <g data-allocation={key}>
        <text x={start} y={y - 12} fill="var(--text)" fontSize="18">
          {title}
        </text>
        <rect
          data-part="a"
          x={start}
          y={y}
          width={leftWidth}
          height="17"
          fill="var(--accent)"
        />
        <rect
          data-part="b"
          x={start + leftWidth}
          y={y}
          width={rightWidth}
          height="17"
          fill="var(--mint)"
        />
        {total.n === 0n && (
          <text x={start} y={y + 14} fill="var(--text)" fontSize="16">
            0 TL
          </text>
        )}
      </g>
    );
  };
  const description = `A anaparası ${text(model.shareA)} TL ve faizi ${text(model.interestA)} TL. B anaparası ${text(model.shareB)} TL ve faizi ${text(model.interestB)} TL.`;

  return (
    <figure style={{ marginInline: 0 }}>
      <svg
        className="f012m-diagram"
        viewBox="0 0 454 127"
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>{description}</title>
        <g aria-hidden="true">
          {bar(
            "principal",
            "Anapara payları",
            model.shareA,
            model.shareB,
            model.total,
            34,
          )}
          {bar(
            "interest",
            "Faiz katkıları",
            model.interestA,
            model.interestB,
            model.check,
            94,
          )}
        </g>
      </svg>
      <figcaption id={`${id}-caption`} className="f012m-limit">
        {description} A solda, B sağda gösterilir. Her çubuk kendi toplamına
        göre ölçeklenir.
      </figcaption>
    </figure>
  );
}

export function SplitInterestSource022Lab() {
  const id = useId();
  const [saved, set] = useExploration(
    "split-simple-interest-source-022",
    defaults,
  );
  const value = (key: RangeKey) => {
    const { min, max } = fields[key];
    return Number.isInteger(saved[key]) &&
      saved[key] >= min &&
      saved[key] <= max
      ? saved[key]
      : defaults[key];
  };
  const interest = /^\d{1,5}$/.test(saved.interest)
    ? Number(saved.interest)
    : null;
  const principal = value("principal");
  const rateA = value("rateA"),
    monthsA = value("monthsA");
  const rateB = value("rateB"),
    monthsB = value("monthsB");
  const model =
    interest === null
      ? null
      : splitInterest022({
          principal,
          interest,
          rateA,
          monthsA,
          rateB,
          monthsB,
        });
  const control = (field: RangeKey) => (
    <InterestRange
      field={field}
      value={value(field)}
      change={(next) => set({ [field]: next })}
    />
  );

  return (
    <details data-model="source022-split-interest">
      <summary>Basit faizden iki anapara payını bul</summary>
      <p>
        Toplam anapara iki kola ayrılıyor. Her kolun faizi kendi anaparasına ve
        süresine göre hesaplanıyor.
      </p>
      <div className="f012m-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => set(defaults)}
        >
          Farklı süreli örneği aç
        </button>
        <button type="button" className="secondary" onClick={() => set(equal)}>
          Faiz çarpanlarını eşitle
        </button>
      </div>
      <div className="f012m-controls">
        {control("principal")}
        <label className="field">
          Verilen toplam faiz (TL)
          <input
            type="text"
            maxLength={5}
            inputMode="numeric"
            aria-invalid={interest === null}
            value={saved.interest}
            aria-describedby={id}
            onChange={(event) => set({ interest: event.currentTarget.value })}
          />
        </label>
      </div>
      <p id={id} className="f012m-limit">
        Toplam faizi tam TL olarak gir. Paylar kesirli olabilir.
      </p>
      <details>
        <summary>Yıllık oranları ve süreleri değiştir</summary>
        <div className="f012m-controls">
          {control("rateA")}
          {control("monthsA")}
          {control("rateB")}
          {control("monthsB")}
        </div>
      </details>
      <div className="f012m-result" role="status" data-split-interest-result>
        {model ? (
          <>
            <p>
              A kolunun faiz çarpanı {rateA}/100 × {monthsA}/12 ={" "}
              <strong>{text(model.coefA)}</strong>. B kolununki {rateB}/100 ×{" "}
              {monthsB}/12 = <strong>{text(model.coefB)}</strong>.
            </p>
            <p>
              A’ya x TL ayrılırsa B’ye {principal} − x TL kalır.{" "}
              <strong>
                {text(model.coefA)}x + {text(model.coefB)}({principal} − x) ={" "}
                {interest}
              </strong>
              .
            </p>
            {model.kind === "underdetermined" ? (
              <p>
                <strong>Her bölüşüm geçerli.</strong> Çarpanlar eşit ve toplam
                faiz her durumda {text(model.allA)} TL.
              </p>
            ) : model.kind === "inconsistent" ? (
              <p>
                <strong>Çözüm yok.</strong> Eşit çarpanlarla her bölüşüm{" "}
                {text(model.allA)} TL verir.
              </p>
            ) : model.kind === "unique" ? (
              <>
                <p>
                  {interest} − {text(model.allB)} farkını {text(model.coefA)} −{" "}
                  {text(model.coefB)} farkına böl.
                  <strong>
                    {" "}
                    A’ya {text(model.shareA)} TL, B’ye {text(model.shareB)} TL
                    ayrılır.
                  </strong>
                </p>
                <p>
                  Faiz kontrolü {text(model.interestA)} TL +{" "}
                  {text(model.interestB)} TL = {text(model.check)} TL.
                </p>
              </>
            ) : (
              <p>
                <strong>Bu bölüşüm uygulanamaz.</strong>{" "}
                {model.kind === "negative-a"
                  ? `A’nın payı ${text(model.shareA)} TL çıkar ve negatiftir.`
                  : `A’nın payı ${text(model.shareA)} TL çıkar ve toplam anaparayı aşar.`}{" "}
                Bu ayarlarla faiz {text(model.minInterest)}–
                {text(model.maxInterest)} TL arasında olabilir.
              </p>
            )}
          </>
        ) : (
          <p>Verilen toplam faiz için sıfır veya pozitif bir tam sayı gir.</p>
        )}
      </div>
      {model?.kind === "unique" && <AllocationPicture model={model} />}
    </details>
  );
}
