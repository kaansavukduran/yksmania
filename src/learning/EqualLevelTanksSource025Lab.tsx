import { useId } from "react";
import {
  r035,
  r035Compare,
  r035DecimalInfo,
  r035Div,
  r035Text,
  type R035,
} from "./rationalSource035Model";
import { useExploration } from "./useExploration";
import {
  equalLevelTanks025,
  equalLevelTanks025Example,
  type EqualLevelTanks025Input,
} from "./equalLevelTanksSource025Model";

const fields = {
  areaA: { label: "A kabının taban alanı", min: 2, max: 24, unit: "dm²" },
  areaB: { label: "B kabının taban alanı", min: 2, max: 24, unit: "dm²" },
  flowA: { label: "A musluğunun debisi", min: 2, max: 24, unit: "L/dk" },
  flowB: { label: "B musluğunun debisi", min: 2, max: 24, unit: "L/dk" },
  delay: { label: "B açılmadan önce geçen süre", min: 1, max: 12, unit: "dk" },
  rim: { label: "Kapların yüksekliği", min: 2, max: 25, unit: "dm" },
} as const;

type InputKey = keyof EqualLevelTanks025Input;
type Model = ReturnType<typeof equalLevelTanks025>;
const numeric = (q: R035) => Number(q.n) / Number(q.d);
function text(q: R035) {
  const decimal = r035DecimalInfo(q, 3);
  return decimal.terminated && !decimal.truncated
    ? decimal.display
    : r035Text(q);
}

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
  return (
    <label className="field" style={{ marginBlock: 0 }}>
      <span>
        {label}{" "}
        <strong aria-hidden="true">
          {value} {unit}
        </strong>
      </span>
      <input
        type="range"
        aria-label={label}
        aria-valuetext={`${value} ${unit}`}
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => change(event.currentTarget.valueAsNumber)}
      />
    </label>
  );
}

function TanksTimeline({ model }: { model: Model }) {
  const id = useId();
  const left = 65,
    right = 409,
    top = 69,
    bottom = 216;
  const X = (time: R035) =>
    left + (right - left) * numeric(r035Div(time, model.firstRim));
  const Y = (height: R035) =>
    bottom - (bottom - top) * numeric(r035Div(height, model.rim));
  const upperTicks = [model.rim, r035Div(model.rim, r035(2))];
  const bOpened = r035Compare(model.delay, model.firstRim) < 0;
  const description = `Açılıştan sonraki süre ve su yüksekliği. Grafik, kap dolumuna ulaşılan ${text(model.firstRim)}. dakikada biter.`;
  const meeting =
    model.kind === "meeting"
      ? ` Seviyeler ${text(model.elapsed)}. dakikada ${text(model.height)} dm'de eşitlenir.`
      : " Bu sürede seviyeler yeniden eşitlenmez.";

  return (
    <figure style={{ marginInline: 0 }}>
      <svg
        className="f012m-diagram"
        viewBox="0 0 456 306"
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>
          {description}
          {meeting}
        </title>
        <g aria-hidden="true">
          <text x="26" y="42" fill="var(--text)" fontSize="18">
            Su yüksekliği (dm)
          </text>
          <path
            d={`M${left} ${top}V${bottom}H${right}`}
            className="f012m-axis"
          />
          {upperTicks.map((tick) => (
            <g key={r035Text(tick)}>
              <path
                d={`M${left} ${Y(tick)}H${right}`}
                className="f012m-guide"
              />
              <text
                x="53"
                y={Y(tick) + 5}
                fill="var(--text)"
                fontSize="16"
                textAnchor="end"
              >
                {text(tick)}
              </text>
            </g>
          ))}
          <text
            x={left}
            y="241"
            fill="var(--text)"
            fontSize="16"
            textAnchor="middle"
          >
            0
          </text>
          <text
            x={right}
            y="241"
            fill="var(--text)"
            fontSize="16"
            textAnchor="end"
          >
            {text(model.firstRim)}
          </text>
          <text
            x="242"
            y="278"
            fill="var(--text)"
            fontSize="16"
            textAnchor="middle"
          >
            A açıldıktan sonra (dk)
          </text>
          {bOpened && (
            <line
              data-tank-opening="b"
              x1={X(model.delay)}
              x2={X(model.delay)}
              y1={top}
              y2={bottom}
              stroke="var(--muted)"
              strokeDasharray="2 5"
            />
          )}
          <line
            data-level="a"
            x1={left}
            y1={bottom}
            x2={right}
            y2={Y(model.stopHeightA)}
            className="f012m-line-a"
          />
          {bOpened && (
            <line
              data-level="b"
              x1={X(model.delay)}
              y1={bottom}
              x2={right}
              y2={Y(model.stopHeightB)}
              className="f012m-line-b"
            />
          )}
          {model.kind === "meeting" && (
            <circle
              data-level-equality
              cx={X(model.elapsed)}
              cy={Y(model.height)}
              r="5"
              fill="var(--text)"
              stroke="var(--surface)"
              strokeWidth="1.5"
            />
          )}
        </g>
      </svg>
      <figcaption id={`${id}-caption`} className="f012m-limit">
        A düz, B kesik çizgi.{" "}
        {bOpened
          ? "Dikey noktalı çizgi B’nin açıldığı an."
          : "İlk kap dolana kadar B su vermeye başlamaz."}{" "}
        {model.kind === "meeting" && "Yuvarlak işaret eşit seviyeyi gösterir."}
      </figcaption>
    </figure>
  );
}

export function EqualLevelTanksSource025Lab() {
  const defaults = equalLevelTanks025Example;
  const [saved, set] = useExploration("equal-level-tanks-source-025", defaults);
  const value = (field: InputKey) => {
    const { min, max } = fields[field];
    return Number.isInteger(saved[field]) &&
      saved[field] >= min &&
      saved[field] <= max
      ? saved[field]
      : defaults[field];
  };
  const input = {
    areaA: value("areaA"),
    areaB: value("areaB"),
    flowA: value("flowA"),
    flowB: value("flowB"),
    delay: value("delay"),
    rim: value("rim"),
  };
  const model = equalLevelTanks025(input);
  const control = (field: InputKey) => (
    <TankRange
      field={field}
      value={input[field]}
      change={(next) => set({ [field]: next })}
    />
  );
  const stopTank =
    model.firstTank === "both" ? "İki kap" : `${model.firstTank} kabı`;

  return (
    <details data-model="source025-equal-level">
      <summary>İki su seviyesi ne zaman eşitlenir?</summary>
      <p>
        İki kap boş ve taban alanları sabit. Önce A açılır. Bir kap dolduğunda
        ölçüm sona erer.
      </p>
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
          onClick={() => set({ ...defaults, areaB: defaults.areaA })}
        >
          Eşit yükselme örneği
        </button>
      </div>
      <div className="f012m-controls" style={{ marginBlock: "1rem" }}>
        {control("areaA")}
        {control("areaB")}
      </div>
      <details>
        <summary>Debileri, gecikmeyi ve kap yüksekliğini değiştir</summary>
        <div className="f012m-controls" style={{ marginBlockStart: "1rem" }}>
          {control("flowA")}
          {control("flowB")}
          {control("delay")}
          {control("rim")}
        </div>
      </details>
      <div className="f012m-result" role="status" data-equal-level-result>
        <p>
          1 L = 1 dm³. Yükseklik artışı, debinin taban alanına bölümüdür. A için{" "}
          {input.flowA}/{input.areaA} ={" "}
          <strong>{text(model.riseA)} dm/dk</strong>. B için {input.flowB}/
          {input.areaB} = <strong>{text(model.riseB)} dm/dk</strong>.
        </p>
        {model.kind === "before-b" ? (
          <p>
            <strong>A, B su vermeye başlamadan dolar.</strong> B’nin gecikmesi{" "}
            {input.delay} dk. A {text(model.firstRim)} dk’da kap ağzına ulaşır.
          </p>
        ) : (
          <>
            <p>
              B açıldığında A’daki seviye {text(model.headStart)} dm, B’de 0 dm.
            </p>
            {model.kind === "no-meeting" ? (
              <p>
                <strong>Seviyeler dolmadan yeniden eşitlenmez.</strong>{" "}
                {model.riseOrder === 0
                  ? "İki seviye aynı hızla yükselir ve aradaki fark korunur."
                  : "B’nin seviyesi daha yavaş yükseldiği için fark büyür."}
              </p>
            ) : model.kind === "after-rim" ? (
              <p>
                <strong>Kaplar dolmadan eşitlenemez.</strong> Denklem{" "}
                {text(model.height)} dm eşitlik yüksekliği verir. Kapların
                yüksekliği {input.rim} dm.
              </p>
            ) : (
              <>
                <p>
                  <strong>
                    B açıldıktan {text(model.afterB)} dk sonra seviyeler{" "}
                    {text(model.height)} dm’de eşitlenir.
                  </strong>{" "}
                  A açıldığından beri {text(model.elapsed)} dk geçmiştir.
                </p>
                <p>
                  Kontrol A’da {text(model.volumeA)} L ÷ {input.areaA} dm², B’de{" "}
                  {text(model.volumeB)} L ÷ {input.areaB} dm². İkisi de{" "}
                  {text(model.height)} dm verir.
                </p>
              </>
            )}
          </>
        )}
        {model.kind !== "before-b" && (
          <p>
            {stopTank} A açıldıktan {text(model.firstRim)} dk sonra ağzına kadar
            dolar.
          </p>
        )}
      </div>
      <TanksTimeline model={model} />
    </details>
  );
}
