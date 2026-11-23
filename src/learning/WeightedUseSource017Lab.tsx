import { useId } from "react";
import { r035Text, type R035 } from "./rationalSource035Model";
import { useExploration } from "./useExploration";
import {
  weightedUse017,
  weightedUse017Contradiction,
  weightedUse017Example,
  type WeightedUse017Input,
} from "./weightedUseSource017Model";

const controls = {
  total: { label: "Başlangıçtaki öğe sayısı", min: 12, max: 60 },
  firstDenominator: {
    label: "Başlangıçtan seçilen kesir",
    min: 2,
    max: 6,
    fraction: true,
  },
  secondDenominator: {
    label: "Kalandan seçilen kesir",
    min: 2,
    max: 6,
    fraction: true,
  },
  distinct: { label: "Kayıttaki farklı öğe sayısı", min: 1, max: 60 },
  reportedUses: { label: "Kayıttaki toplam kullanım", min: 1, max: 180 },
} as const;

type InputKey = keyof WeightedUse017Input;
type Model = ReturnType<typeof weightedUse017>;
type Counts = NonNullable<Model["counts"]>;
const text = (q: R035) => r035Text(q).replace("-", "−");
const numeric = (q: R035) => Number(q.n) / Number(q.d);

function UseRange({
  field,
  value,
  change,
}: {
  field: InputKey;
  value: number;
  change: (value: number) => void;
}) {
  const constraint = controls[field];
  const valueText = "fraction" in constraint ? `1/${value}` : String(value);
  return (
    <label className="field">
      <span>
        {constraint.label} <strong aria-hidden="true">{valueText}</strong>
      </span>
      <input
        aria-label={constraint.label}
        aria-valuetext={valueText}
        type="range"
        min={constraint.min}
        max={constraint.max}
        step={1}
        value={value}
        onChange={(event) => change(event.currentTarget.valueAsNumber)}
      />
    </label>
  );
}

function UseChart({ counts, reported }: { counts: Counts; reported: number }) {
  const id = useId();
  const distinct = numeric(counts.totalItems);
  const usage = numeric(counts.weightedTotal);
  const scale = 410 / Math.max(distinct, usage, reported);
  const start = 22;
  const row = (key: "items" | "contribution", label: string, y: number) => {
    let cursor = start;
    return (
      <g data-count-row={key}>
        <text x={start} y={y - 12} fill="var(--text)" fontSize="18">
          {label}
        </text>
        {counts.rows.map((group, index) => {
          const width = numeric(group[key]) * scale;
          const x = cursor;
          cursor += width;
          return (
            <rect
              key={group.weight}
              data-group={group.weight}
              x={x}
              y={y}
              width={width}
              height="17"
              className={`f011m-bar f011m-bar-${index}`}
              style={index === 2 ? { strokeDasharray: "none" } : undefined}
            />
          );
        })}
      </g>
    );
  };
  const targetX = start + reported * scale;
  return (
    <figure style={{ marginInline: 0 }}>
      <svg
        className="f011m-diagram"
        viewBox="0 0 454 130"
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>
          Farklı öğe sayısı {distinct}, hesaplanan kullanım {usage}. Kayıttaki
          kullanım {reported}.
        </title>
        <g aria-hidden="true">
          {row("items", "Farklı öğeler", 36)}
          {row("contribution", "Hesaplanan kullanım", 96)}
          <path
            data-reported
            d={`M${targetX} 88V121`}
            className="f011m-guide"
            style={{ stroke: "var(--text)", strokeWidth: 2, opacity: 1 }}
          />
        </g>
      </svg>
      <figcaption id={`${id}-caption`} className="f011m-limit">
        Çubuklar aynı ölçekle çizilir. Parçalar bir, iki ve üç kez kullanılan
        grupları soldan sağa gösterir. Kesikli çizgi kayıttaki toplam kullanımı
        gösterir.
      </figcaption>
    </figure>
  );
}

function UseTable({ counts }: { counts: Counts }) {
  const cell = {
    padding: "0.25em 0.18em",
    textAlign: "start",
    overflowWrap: "anywhere",
  } as const;
  return (
    <table
      style={{
        width: "100%",
        tableLayout: "fixed",
        borderCollapse: "collapse",
      }}
    >
      <caption>Grup başına iki sayım</caption>
      <colgroup>
        <col style={{ width: "34%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "46%" }} />
      </colgroup>
      <thead>
        <tr>
          <th scope="col" style={cell}>
            Grup
          </th>
          <th scope="col" style={cell}>
            Adet
          </th>
          <th scope="col" style={cell}>
            Kullanım
          </th>
        </tr>
      </thead>
      <tbody>
        {counts.rows.map(({ weight, items, contribution }) => (
          <tr key={weight}>
            <th scope="row" style={cell}>
              {weight} kez
            </th>
            <td style={cell}>{text(items)}</td>
            <td style={cell}>
              {weight} × {text(items)} = {text(contribution)}
            </td>
          </tr>
        ))}
        <tr style={{ borderTop: "1px solid var(--border)" }}>
          <th scope="row" style={cell}>
            Toplam
          </th>
          <td style={cell}>{text(counts.totalItems)}</td>
          <td style={cell}>{text(counts.weightedTotal)}</td>
        </tr>
      </tbody>
    </table>
  );
}

export function WeightedUseSource017Lab() {
  const [saved, set] = useExploration(
    "weighted-use-source-017",
    weightedUse017Example,
  );
  const value = (key: InputKey) => {
    const { min, max } = controls[key];
    return Number.isInteger(saved[key]) &&
      saved[key] >= min &&
      saved[key] <= max
      ? saved[key]
      : weightedUse017Example[key];
  };
  const input = {
    total: value("total"),
    firstDenominator: value("firstDenominator"),
    secondDenominator: value("secondDenominator"),
    distinct: value("distinct"),
    reportedUses: value("reportedUses"),
  };
  const model = weightedUse017(input);
  const control = (field: InputKey) => (
    <UseRange
      field={field}
      value={input[field]}
      change={(next) => set({ [field]: next })}
    />
  );

  return (
    <details data-model="source017-weighted-use">
      <summary>Farklı öğe ile toplam kullanımı karşılaştır</summary>
      <p>
        Bir etkinliğin öğeleri birer, ikişer veya üçer kez kullanılmış. Üç
        grubun da en az bir öğesi var. Kayıttaki iki sayının aynı gruplardan
        çıkıp çıkmadığını denetle.
      </p>
      <div className="f011m-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => set(weightedUse017Example)}
        >
          Tutarlı örneği aç
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set(weightedUse017Contradiction)}
        >
          55 kullanım kaydını dene
        </button>
      </div>
      <div className="f011m-controls">
        {control("distinct")}
        {control("reportedUses")}
      </div>
      <div className="f011m-result" role="status" data-weighted-use-result>
        {model.kind === "valid" ? (
          <p>
            <strong>İki kayıt tutarlı.</strong> Hiç kullanılmayan {model.unused}{" "}
            öğe var.
          </p>
        ) : model.kind === "mismatch" ? (
          <p>
            <strong>Veriler çelişiyor.</strong> {input.distinct} farklı öğe için
            hesaplanan toplam {text(model.counts.weightedTotal)}, kayıtta{" "}
            {input.reportedUses}. İki kaydı birlikte sağlayan çözüm yok.
          </p>
        ) : model.kind === "noninteger" ? (
          <p>
            <strong>Tam sayı çözümü yok.</strong>{" "}
            {model.fractionStage === "first"
              ? `İlk kurala göre grup ${text(model.firstUsed)} öğe çıkıyor.`
              : `İkinci kurala göre grup ${text(model.secondUsed)} öğe çıkıyor.`}
          </p>
        ) : (
          <p>
            <strong>Grup oluşturulamıyor.</strong>{" "}
            {model.thirdUsed.n <= 0n
              ? "Üçüncü gruba pozitif sayıda öğe kalması gerekir."
              : `Üçüncü gruba gereken ${text(model.thirdUsed)} öğe, eldeki ${text(model.remaining)} öğeyi aşıyor.`}
          </p>
        )}
      </div>
      <details>
        <summary>Başlangıç adedini ve kesirleri değiştir</summary>
        <div className="f011m-controls">
          {control("total")}
          {control("firstDenominator")}
          {control("secondDenominator")}
        </div>
      </details>
      <ol>
        <li>
          Birer kez kullanılanlar başlangıcın 1/{input.firstDenominator}’i, yani{" "}
          {input.total}/{input.firstDenominator} = {text(model.firstUsed)}. İlk
          gruptan sonra {text(model.afterFirst)} kalır.
        </li>
        {model.firstUsed.d === 1n && (
          <li>
            İkişer kez kullanılanlar kalanın 1/{input.secondDenominator}’i, yani{" "}
            {text(model.afterFirst)}/{input.secondDenominator} ={" "}
            {text(model.secondUsed)}.
          </li>
        )}
        {model.kind !== "noninteger" && (
          <li>
            Farklı öğe kaydından üçüncü grup x = {input.distinct} −{" "}
            {text(model.firstUsed)} − {text(model.secondUsed)} ={" "}
            {text(model.thirdUsed)}.
          </li>
        )}
      </ol>
      {model.counts && (
        <>
          <UseTable counts={model.counts} />
          <UseChart counts={model.counts} reported={input.reportedUses} />
        </>
      )}
    </details>
  );
}
