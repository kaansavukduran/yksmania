import { useId } from "react";
import { inverseRemainder018 } from "./inverseRemainderSource018Model";
import { r035, r035Text, type R035 } from "./rationalSource035Model";
import { useExploration } from "./useExploration";

const defaults = {
  observed: 400,
  numerator: 4,
  denominator: 7,
  countOnly: false,
};
const compactExample = { observed: 2, numerator: 3, denominator: 4 };
const zeroExample = { observed: 0, numerator: 0, denominator: 7 };
const bound = (value: number, min: number, max: number, fallback: number) =>
  Number.isInteger(value) ? Math.min(max, Math.max(min, value)) : fallback;
const numeric = (value: R035) => Number(value.n) / Number(value.d);

function InverseRange({
  label,
  value,
  min,
  max,
  change,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  change: (value: number) => void;
}) {
  return (
    <label className="field">
      <span>
        {label} <strong aria-hidden="true">{value}</strong>
      </span>
      <input
        aria-label={label}
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

function InversePicture({
  initial,
  remaining,
  fraction,
  unit,
}: {
  initial: R035;
  remaining: R035;
  fraction: R035;
  unit: string;
}) {
  const id = useId();
  const x = 22,
    wholeWidth = 408;
  const drawnWhole = initial.n === 0n ? 0 : wholeWidth;
  const drawnRemaining = drawnWhole * numeric(fraction);
  const describe = `Başlangıç ${r035Text(initial)} ${unit}, son kalan ${r035Text(remaining)} ${unit}.`;
  return (
    <figure style={{ marginInline: 0 }}>
      <svg
        className="f011m-diagram"
        viewBox="0 0 454 135"
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>{describe}</title>
        <g aria-hidden="true">
          <text x={x} y="20" fill="var(--text)" fontSize="18">
            Başlangıç
          </text>
          <text x={x} y="80" fill="var(--text)" fontSize="18">
            Son kalan
          </text>
          {drawnWhole > 0 ? (
            <>
              <rect
                x={x}
                y="29"
                width={drawnWhole}
                height="21"
                className="f011m-whole"
              />
              <rect
                x={x}
                y="89"
                width={drawnRemaining}
                height="21"
                className="f011m-bar f011m-bar-1"
              />
            </>
          ) : (
            <>
              <path d={`M${x} 29V50 M${x} 89V110`} className="f011m-axis" />
              <text x={x + 12} y="46" fill="var(--text)" fontSize="18">
                0
              </text>
              <text x={x + 12} y="106" fill="var(--text)" fontSize="18">
                0
              </text>
            </>
          )}
        </g>
      </svg>
      <figcaption id={`${id}-caption`} className="f011m-limit">
        {describe}{" "}
        {drawnWhole > 0
          ? "İki uzunluk aynı ölçekle çizilir."
          : "İki miktarın da uzunluğu sıfırdır."}
      </figcaption>
    </figure>
  );
}

export function InverseRemainderSource018Lab() {
  const [saved, set] = useExploration("inverse-remainder-source-018", defaults);
  const denominator = bound(saved.denominator, 1, 12, defaults.denominator);
  const numerator = bound(
    saved.numerator,
    0,
    denominator,
    Math.min(defaults.numerator, denominator),
  );
  const observed = bound(saved.observed, 0, 500, defaults.observed);
  const model = inverseRemainder018(
    r035(observed),
    r035(numerator, denominator),
    saved.countOnly,
  );
  const kept = r035Text(model.fraction);
  const unit = saved.countOnly ? "öğe" : "birim";
  const sourceExample = observed === defaults.observed && kept === "4/7";

  return (
    <details data-model="source018-inverse-remainder">
      <summary>Son kalandan başlangıcı bul</summary>
      <p>
        Son kalan, başlangıcın hangi kesri? İkisini değiştirerek başlangıç
        miktarını bul ve kalanla denetle.
      </p>
      <div className="f011m-actions">
        <button
          type="button"
          className="secondary"
          onClick={() =>
            set({
              observed: defaults.observed,
              numerator: defaults.numerator,
              denominator: defaults.denominator,
            })
          }
        >
          400 kalan, 4/7 pay
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set(compactExample)}
        >
          2 kalan, 3/4 pay
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set(zeroExample)}
        >
          Sıfır kalan payı
        </button>
      </div>
      <div
        className="f011m-controls"
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 10rem), 1fr))",
        }}
      >
        <InverseRange
          label="Son kalan miktar"
          value={observed}
          min={0}
          max={500}
          change={(observed) => set({ observed })}
        />
        <InverseRange
          label="Kalan kesrinin payı"
          value={numerator}
          min={0}
          max={denominator}
          change={(numerator) => set({ numerator })}
        />
        <InverseRange
          label="Kalan kesrinin paydası"
          value={denominator}
          min={Math.max(1, numerator)}
          max={12}
          change={(denominator) => set({ denominator })}
        />
      </div>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.55em",
          minHeight: "44px",
        }}
      >
        <input
          type="checkbox"
          checked={saved.countOnly}
          onChange={(event) => set({ countOnly: event.currentTarget.checked })}
        />
        Öğe adedi olarak say
      </label>
      {sourceExample && (
        <p>
          İlk adımdan sonra 5/7 kalır. Bunun 4/5’i kaldığında son pay (5/7) ×
          (4/5) = 4/7 olur.
        </p>
      )}
      <div className="f011m-result" role="status" data-inverse-remainder-result>
        <p>
          Başlangıç x olsun.{" "}
          <strong>
            {kept} × x = {observed}
          </strong>
          .
        </p>
        {model.kind === "underdetermined" ? (
          <p>
            <strong>Başlangıç tek olarak belirlenemez.</strong>{" "}
            {saved.countOnly
              ? "Negatif olmayan her tam sayı için son kalan sıfır olur."
              : "Negatif olmayan her başlangıç miktarında son kalan sıfır olur."}
          </p>
        ) : model.kind === "inconsistent" ? (
          <p>
            <strong>Çözüm yok.</strong> Başlangıcın sıfır payı pozitif bir kalan
            veremez.
          </p>
        ) : (
          model.candidate && (
            <>
              <p>
                Her iki tarafı kalan kesrine böl.{" "}
                <strong>
                  x = {observed} ÷ ({kept}) = {r035Text(model.candidate)}
                </strong>
                .
              </p>
              {model.kind === "noninteger" ? (
                <p>
                  <strong>Tam sayı çözümü yok.</strong> Kesirli miktar litre
                  gibi ölçümlerde geçerli olabilir. Öğe adedi tam sayı olmalı.
                </p>
              ) : (
                <p>
                  Başlangıç {r035Text(model.candidate)} {unit}. Kontrol {kept} ×{" "}
                  {r035Text(model.candidate)} = {r035Text(model.check)}.
                </p>
              )}
            </>
          )
        )}
      </div>
      {model.initial && (
        <InversePicture
          initial={model.initial}
          remaining={model.remaining}
          fraction={model.fraction}
          unit={unit}
        />
      )}
    </details>
  );
}
