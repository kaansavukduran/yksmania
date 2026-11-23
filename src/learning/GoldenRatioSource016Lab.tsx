import { useId } from "react";
import {
  goldenSplit016,
  goldenSplit016Controls,
  goldenSplit016Reference,
} from "./goldenRatioSource016Model";
import { r035Text, type R035 } from "./rationalSource035Model";
import { useExploration } from "./useExploration";

const { minimum, maximum, initial, near } = goldenSplit016Controls;
const defaults = { longTicks: initial, referenceVisible: false };
const decimal = new Intl.NumberFormat("tr-TR", {
  maximumFractionDigits: 3,
  useGrouping: false,
});
const numeric = (value: R035) => Number(value.n) / Number(value.d);

function formatRatio(value: R035) {
  const text = r035Text(value);
  if (value.d === 1n) return text;
  const decimalsExact = 1000n % value.d === 0n;
  return `${text} ${decimalsExact ? "=" : "≈"} ${decimal.format(numeric(value))}`;
}

function SplitPicture({
  split,
  referenceVisible,
}: {
  split: ReturnType<typeof goldenSplit016>;
  referenceVisible: boolean;
}) {
  const id = useId();
  const left = 21,
    right = 449,
    width = right - left;
  const rows = [
    { title: "Senin bölmen", share: split.longShare, y: 0 },
    ...(referenceVisible
      ? [
          {
            title: "Tam altın bölme",
            share: goldenSplit016Reference.longShare,
            y: 84,
          },
        ]
      : []),
  ];
  return (
    <figure style={{ marginInline: 0 }}>
      <svg
        className="math093-svg"
        viewBox={`0 -10 470 ${referenceVisible ? 175 : 92}`}
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>
          Sol parça a, sağ parça b. Uzun parça {decimal.format(split.long)}{" "}
          birim, kısa parça {decimal.format(split.short)} birim.
          {referenceVisible
            ? " Alt satırda uzun parça φ birim, kısa parça 1 birim."
            : ""}
        </title>
        <g aria-hidden="true">
          {rows.map(({ title, share, y }) => {
            const edge = left + width * share;
            return (
              <g
                key={title}
                data-split-row={y === 0 ? "selected" : "reference"}
              >
                <text x={left} y={y + 19}>
                  {title}
                </text>
                <text x={(left + edge) / 2} y={y + 45} textAnchor="middle">
                  a
                </text>
                <text x={(edge + right) / 2} y={y + 45} textAnchor="middle">
                  b
                </text>
                <rect
                  data-part="a"
                  x={left}
                  y={y + 52}
                  width={edge - left}
                  height="14"
                  fill="var(--mint)"
                />
                <rect
                  data-part="b"
                  x={edge}
                  y={y + 52}
                  width={right - edge}
                  height="14"
                  fill="var(--accent)"
                />
                <line
                  x1={edge}
                  x2={edge}
                  y1={y + 49}
                  y2={y + 70}
                  className="m093-axis"
                />
              </g>
            );
          })}
        </g>
      </svg>
      <figcaption id={`${id}-caption`} className="math093-limit">
        Her satır kendi bütününe göre ölçeklenir. Bölme işareti uzun ve kısa
        parçayı ayırır.
      </figcaption>
    </figure>
  );
}

export function GoldenRatioSource016Lab() {
  const [saved, set] = useExploration("golden-ratio-source-016", defaults);
  const longTicks =
    Number.isInteger(saved.longTicks) &&
    saved.longTicks >= minimum &&
    saved.longTicks <= maximum
      ? saved.longTicks
      : initial;
  const split = goldenSplit016(longTicks);
  const sign = ["<", "=", ">"][split.comparison + 1];
  const longDisplay = decimal.format(split.long);
  const shortDisplay = decimal.format(split.short);
  const longRounded = decimal.format(numeric(split.longOverShort));
  const sameRounded =
    longRounded === decimal.format(numeric(split.wholeOverLong));
  const reference = goldenSplit016Reference;
  return (
    <details data-model="source016-golden-ratio">
      <summary>Altın bölmeyi karşılaştır</summary>
      <p>
        3 birimlik bir uzunluğu a ve b olarak böl. a uzun, b kısa parça. Altın
        bölmede iki oran tam olarak eşittir.
      </p>
      <label className="field">
        <span>
          Uzun parça a <strong aria-hidden="true">{longDisplay} birim</strong>
        </span>
        <input
          aria-label="Uzun parça a"
          aria-valuetext={`${longDisplay} birim`}
          type="range"
          min={minimum}
          max={maximum}
          step={1}
          value={longTicks}
          onChange={(event) =>
            set({ longTicks: event.currentTarget.valueAsNumber })
          }
        />
      </label>
      <div className="math093-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => set({ longTicks: initial })}
        >
          a = 2, b = 1
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set({ longTicks: near })}
        >
          Altın orana yakın bölme
        </button>
      </div>
      <label
        className="math093-checkbox"
        style={{ alignItems: "center", marginBlockStart: "0.5rem" }}
      >
        <input
          type="checkbox"
          checked={saved.referenceVisible}
          onChange={(event) =>
            set({ referenceVisible: event.currentTarget.checked })
          }
        />
        Tam altın bölme referansını göster
      </label>
      <SplitPicture split={split} referenceVisible={saved.referenceVisible} />
      <div className="math093-result" role="status" data-golden-split-result>
        <p>
          a = {longDisplay} birim ve b = {shortDisplay} birim.
        </p>
        <p>
          Uzun / kısa <strong>a/b = {formatRatio(split.longOverShort)}</strong>.
        </p>
        <p>
          Bütün / uzun{" "}
          <strong>(a + b)/a = {formatRatio(split.wholeOverLong)}</strong>.
        </p>
        <p>
          <strong>a/b {sign} (a + b)/a</strong>.{" "}
          {sameRounded &&
            split.comparison !== 0 &&
            `İki oran ${longRounded} olarak yuvarlanır. Kesirlerin tam değerleri farklıdır.`}
        </p>
      </div>
      {saved.referenceVisible && (
        <div className="math093-samples" data-golden-split-reference>
          <p>
            a = {reference.longLabel} birim, b = {reference.shortLabel} birim ve
            bütün = {reference.wholeLabel} birim.
          </p>
          <p>
            <strong>a/b = (a + b)/a = {reference.ratioLabel}</strong>. Ortak
            oran birimsizdir ve {reference.ratioLabel} ≈{" "}
            {decimal.format(reference.ratioApprox)}.
          </p>
        </div>
      )}
    </details>
  );
}
