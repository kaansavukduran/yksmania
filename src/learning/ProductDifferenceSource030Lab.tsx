import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  productExample030,
  productRegions030,
  type ProductOperation030,
} from "./productDifferenceSource030Model";

const domain = [1, 2, 3, 4];
const bit = (value: number) => 1 << (value - 1);
const mask = (values: readonly number[]) =>
  values.reduce((combined, value) => combined | bit(value), 0);

const defaults = {
  operation: "difference",
  maskC: mask(productExample030.compareFirst),
  maskD: mask(productExample030.compareSecond),
};

const formatSet = (values: readonly number[]) =>
  values.length > 0 ? `{${values.join(", ")}}` : "∅";

export function ProductDifferenceSource030Lab() {
  const id = useId();
  const [saved, set] = useExploration(
    "product-difference-source-030",
    defaults,
  );
  const operation: ProductOperation030 =
    saved.operation === "intersection" ? "intersection" : "difference";
  const C = domain.filter((item) => (saved.maskC & bit(item)) !== 0);
  const D = domain.filter((item) => (saved.maskD & bit(item)) !== 0);
  const model = productRegions030(
    { ...productExample030, compareFirst: C, compareSecond: D },
    operation,
  );
  const difference = operation === "difference";
  const title = difference ? "(A×B)∖(C×D)" : "(A×B)∩(C×D)";
  const pairList = model.selected.map(({ x, y }) => `(${x}, ${y})`).join(", ");
  const atX = (value: number) => 77 + 68 * value;
  const atY = (value: number) => 287 - 56 * value;

  const selector = (key: "maskC" | "maskD", name: "C" | "D") => (
    <fieldset className="lab-choices">
      <legend>{name} kümesindeki sayılar</legend>
      <div className="f014m-set-members">
        {domain.map((item) => (
          <label className="f014m-toggle" key={item}>
            <input
              type="checkbox"
              aria-label={`${name} kümesinde ${item}`}
              checked={(saved[key] & bit(item)) !== 0}
              onChange={() => set({ [key]: saved[key] ^ bit(item) })}
            />
            {item}
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <details data-model="source030-product-difference">
      <summary>İki çarpımın ortak ve farklı noktaları</summary>
      <p>
        A={formatSet(productExample030.first)}, B=
        {formatSet(productExample030.second)}. Grafik A×B’nin noktalarını
        gösterir. C ve D’deki sayıları değiştir. C×D’ye ait olmak için ilk
        bileşen C’de, ikinci bileşen D’de olmalı.
      </p>
      <div className="f014m-pairs" aria-label="Çarpım kümelerinde işlem">
        <button
          type="button"
          className="secondary"
          aria-pressed={difference}
          onClick={() => set({ operation: "difference" })}
        >
          Çarpımların farkı
        </button>
        <button
          type="button"
          className="secondary"
          aria-pressed={!difference}
          onClick={() => set({ operation: "intersection" })}
        >
          Çarpımların kesişimi
        </button>
      </div>
      {selector("maskC", "C")}
      {selector("maskD", "D")}
      <button
        type="button"
        className="text-button"
        onClick={() => set(defaults)}
      >
        Örneğe dön
      </button>
      <div className="f014m-result" role="status">
        <p>
          <strong>
            {title} içinde {model.selected.length} ikili.
          </strong>{" "}
          {difference
            ? "C veya D koşullarından en az birini sağlayamayan ikililer kalır."
            : "C ve D koşullarını birlikte sağlayan ikililer kalır."}
        </p>
        <p>
          {difference
            ? `${model.cells.length} başlangıç ikilisinden ${model.firstOverlap * model.secondOverlap} ortak ikili çıkarıldı. Kalan ikililerin ${model.bothOutside} tanesinde ilk bileşen C’nin, ikinci bileşen de D’nin dışında.`
            : `İlk bileşen için ${model.firstOverlap}, ikinci bileşen için ${model.secondOverlap} ortak değer var. Çarpımları ${model.selected.length}.`}
        </p>
        <p>{pairList ? `Sonuç {${pairList}}.` : "Sonuç ∅."}</p>
      </div>
      <figure>
        <svg
          viewBox="0 0 390 353"
          style={{ width: "100%", height: "auto" }}
          role="img"
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-description`}
        >
          <title id={`${id}-title`}>Çarpım kümesindeki sıralı ikililer</title>
          <desc id={`${id}-description`}>
            {pairList
              ? `Dolu işaretler sonuçtaki ikilileri gösteriyor. ${pairList}.`
              : "Sonuçta ikili yok. Tüm başlangıç noktaları çarpıyla işaretli."}
          </desc>
          <g aria-hidden="true">
            <path
              d="M77 46V287H341"
              stroke="var(--text)"
              strokeWidth={2}
              fill="none"
            />
            <text x={16} y={29} fill="var(--text)" fontSize={19}>
              İkinci bileşen
            </text>
            <text
              x={341}
              y={337}
              textAnchor="end"
              fill="var(--text)"
              fontSize={19}
            >
              Birinci bileşen
            </text>
            {domain.map((value) => (
              <g key={value}>
                {value <= 3 && (
                  <>
                    <path d={`M${atX(value)} 52V287`} stroke="var(--border)" />
                    <text
                      x={atX(value)}
                      y={307}
                      textAnchor="middle"
                      fill="var(--text)"
                      fontSize={19}
                    >
                      {value}
                    </text>
                  </>
                )}
                <path d={`M77 ${atY(value)}H341`} stroke="var(--border)" />
                <text
                  x={62}
                  y={atY(value) + 6}
                  textAnchor="end"
                  fill="var(--text)"
                  fontSize={19}
                >
                  {value}
                </text>
              </g>
            ))}
            {model.cells.map(({ x, y, selected }) => (
              <g
                key={`${x},${y}`}
                data-product-comparison-point={`${x},${y}`}
                data-selected={selected}
                transform={`translate(${atX(x)} ${atY(y)})`}
              >
                {selected ? (
                  <circle
                    r={8}
                    fill="var(--accent)"
                    stroke="var(--text)"
                    strokeWidth={1.5}
                  />
                ) : (
                  <path
                    d="M-7 -7L7 7M-7 7L7-7"
                    stroke="var(--text)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                  />
                )}
              </g>
            ))}
          </g>
        </svg>
        <figcaption>
          Dolu noktalar sonuçta kalır. Çarpılar seçilen işlemin dışında kalır.
        </figcaption>
      </figure>
    </details>
  );
}
