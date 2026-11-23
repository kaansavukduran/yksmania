import { useId } from "react";
import {
  r035DecimalInfo,
  r035Div,
  r035Sub,
  r035Text,
  type R035,
} from "./rationalSource035Model";
import { useExploration } from "./useExploration";
import {
  targetMixture023,
  targetMixture023Example,
  type TargetMixture023Input,
} from "./targetMixtureSource023Model";

const fields = {
  initialMass: { label: "Başlangıç kütlesi", min: 20, max: 300, unit: "g" },
  initialPercent: {
    label: "Başlangıç karışımının yüzdesi",
    min: 0,
    max: 100,
    unit: "%",
  },
  addedPercent: {
    label: "Eklenecek karışımın yüzdesi",
    min: 0,
    max: 100,
    unit: "%",
  },
  targetPercent: { label: "Hedef yüzde", min: 0, max: 100, unit: "%" },
} as const;
type InputKey = keyof TargetMixture023Input;
type Model = ReturnType<typeof targetMixture023>;
type Feasible = Model & { kind: "unique" | "zero" };

const numeric = (value: R035) => Number(value.n) / Number(value.d);

function text(value: R035) {
  const decimal = r035DecimalInfo(value, 4);
  return (
    decimal.terminated && !decimal.truncated ? decimal.display : r035Text(value)
  ).replace("-", "−");
}

function MixRange({
  field,
  value,
  change,
}: {
  field: InputKey;
  value: number;
  change: (n: number) => void;
}) {
  const { label, min, max, unit } = fields[field];
  const readout = unit === "%" ? `%${value}` : `${value} g`;
  return (
    <label className="field" style={{ marginBlock: 0 }}>
      <span>
        {label} <strong aria-hidden="true">{readout}</strong>
      </span>
      <input
        aria-label={label}
        aria-valuetext={readout}
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

function MixturePicture({ model }: { model: Feasible }) {
  const id = useId();
  const start = 28,
    span = 400;
  const width = (value: R035) =>
    span * numeric(r035Div(value, model.finalMass));
  const rows = [
    {
      key: "initial",
      label: "Başlangıç karışımı",
      mass: model.mass,
      solute: model.initialSolute,
      y: 42,
    },
    {
      key: "added",
      label: "Eklenen karışım",
      mass: model.candidate,
      solute: model.addedSolute,
      y: 108,
    },
    {
      key: "final",
      label: "Son karışım",
      mass: model.finalMass,
      solute: model.finalSolute,
      y: 174,
    },
  ];
  const description = `Başlangıç ${text(model.mass)} g. Eklenen ${text(model.candidate)} g. Son karışım ${text(model.finalMass)} g ve çözünmüş madde ${text(model.finalSolute)} g.`;

  return (
    <figure style={{ marginInline: 0 }}>
      <svg
        className="f012m-diagram"
        viewBox="0 0 456 232"
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>{description}</title>
        <g aria-hidden="true">
          {rows.map(({ key, label, mass, solute, y }) => (
            <g key={key} data-target-mixture-stage={key}>
              <text x={start} y={y} fill="var(--text)" fontSize="18">
                {label}
                {mass.n === 0n ? " · 0 g" : ""}
              </text>
              <rect
                data-part="solute"
                x={start}
                y={y + 12}
                width={width(solute)}
                height="20"
                fill="var(--accent)"
              />
              <rect
                data-part="rest"
                x={start + width(solute)}
                y={y + 12}
                width={width(r035Sub(mass, solute))}
                height="20"
                fill="var(--mint)"
              />
            </g>
          ))}
        </g>
      </svg>
      <figcaption id={`${id}-caption`} className="f012m-limit">
        {description} Her çubuk aynı gram ölçeğinde. Çözünen madde solda, kalan
        kütle sağda gösterilir.
      </figcaption>
    </figure>
  );
}

export function TargetMixtureSource023Lab() {
  const defaults = targetMixture023Example;
  const [saved, set] = useExploration("target-mixture-source-023", defaults);
  const value = (field: InputKey) => {
    const { min, max } = fields[field];
    return Number.isInteger(saved[field]) &&
      saved[field] >= min &&
      saved[field] <= max
      ? saved[field]
      : defaults[field];
  };
  const input = {
    initialMass: value("initialMass"),
    initialPercent: value("initialPercent"),
    addedPercent: value("addedPercent"),
    targetPercent: value("targetPercent"),
  };
  const model = targetMixture023(input);
  const control = (field: InputKey) => (
    <MixRange
      field={field}
      value={input[field]}
      change={(next) => set({ [field]: next })}
    />
  );

  return (
    <details data-model="source023-target-mixture">
      <summary>Hedef yüzde için kaç gram eklenir?</summary>
      <p>
        İki homojen karışım birleştiriliyor. Eklenen miktarı, çözünen maddenin
        son kütleye oranı hedef yüzde olacak biçimde bul.
      </p>
      <div className="f012m-controls" style={{ marginBlockStart: "1rem" }}>
        {control("initialMass")}
        {control("initialPercent")}
        {control("addedPercent")}
        {control("targetPercent")}
      </div>
      <div className="f012m-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => set(defaults)}
        >
          Örneğe dön
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set({ targetPercent: input.addedPercent })}
        >
          Hedefi eklenen yüzdeye eşitle
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() =>
            set({
              initialPercent: input.targetPercent,
              addedPercent: input.targetPercent,
            })
          }
        >
          Üç yüzdeyi eşitle
        </button>
      </div>
      <div className="f012m-result" role="status" data-target-mixture-result>
        <p>
          Başlangıçta {text(model.initialSolute)} g çözünmüş madde var. x gram
          eklenirse denklem{" "}
          <strong>
            {text(model.initialSolute)} + {text(model.addedFraction)}x ={" "}
            {text(model.targetFraction)}({input.initialMass} + x)
          </strong>
          .
        </p>
        {model.kind === "all" ? (
          <p>
            <strong>Her ekleme miktarı hedefi verir.</strong> Başlangıç, eklenen
            karışım ve hedef aynı yüzdeye sahip.
          </p>
        ) : model.kind === "limit" ? (
          <p>
            <strong>Sonlu çözüm yok.</strong> Başlangıç karışımı kaldığı için
            oran, eklenen miktar arttıkça %{input.addedPercent} değerine
            yaklaşır.
          </p>
        ) : model.kind === "outside" ? (
          <p>
            <strong>Hedef yüzde mümkün değil.</strong> Denklem{" "}
            {text(model.candidate)} g verir. Eklenecek kütle negatif olamaz. Son
            yüzde iki karışımın yüzdeleri arasında kalır.
          </p>
        ) : (
          <>
            <p>
              {model.kind === "zero" ? (
                <strong>
                  Ekleme gerekmez. Başlangıç zaten hedef yüzdeye sahip.
                </strong>
              ) : (
                <strong>{text(model.candidate)} g karışım eklenir.</strong>
              )}
            </p>
            <p>
              Son karışım {text(model.finalMass)} g ve çözünmüş madde{" "}
              {text(model.finalSolute)} g. Kontrol{" "}
              <strong>
                {text(model.finalSolute)}/{text(model.finalMass)} ={" "}
                {text(model.check)} = %{input.targetPercent}
              </strong>
              .
            </p>
          </>
        )}
      </div>
      {(model.kind === "unique" || model.kind === "zero") && (
        <MixturePicture model={model} />
      )}
    </details>
  );
}
