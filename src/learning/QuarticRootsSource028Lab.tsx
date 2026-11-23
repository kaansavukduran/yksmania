import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  quarticExample,
  quarticInputRange,
  quarticRoots028,
  type QuarticRoot,
} from "./quarticRootsSource028Model";

const defaults = { ...quarticExample, zoom: false };

const integerText = (value: number) => String(value).replace("-", "−");

function rootText({ x, sign, radicand }: QuarticRoot) {
  if (Number.isInteger(x)) return integerText(x);
  return `${sign < 0 ? "−" : ""}√${radicand}`;
}

function factor(variable: string, root: number) {
  if (root === 0) return variable;
  return `(${variable} ${root > 0 ? "−" : "+"} ${Math.abs(root)})`;
}

function term(coefficient: number, variable = "") {
  if (coefficient === 0) return "";
  const magnitude = Math.abs(coefficient);
  return ` ${coefficient < 0 ? "−" : "+"} ${magnitude === 1 && variable ? "" : magnitude}${variable}`;
}

export function QuarticRootsSource028Lab() {
  const id = useId();
  const [saved, set] = useExploration("quartic-roots-source-028", defaults);
  const { min, max } = quarticInputRange;
  const value = (key: keyof typeof quarticExample) =>
    Number.isInteger(saved[key]) && saved[key] >= min && saved[key] <= max
      ? saved[key]
      : quarticExample[key];
  const first = value("first");
  const second = value("second");
  const model = quarticRoots028(first, second);
  const { width } = model.range;
  const closeView = saved.zoom && model.roots.length > 0;
  const bottom = closeView ? -model.axisZoom : model.range.bottom;
  const top = closeView ? model.axisZoom : model.range.top;
  const x = (coordinate: number) =>
    56 + (coordinate + width) * (448 / (2 * width));
  const y = (height: number) =>
    228 - (height - bottom) * (190 / (top - bottom));
  const axis = Array.from(
    { length: 2 * width + 1 },
    (_, index) => index - width,
  );
  const samples = [
    ...Array.from({ length: 161 }, (_, index) => -width + (index * width) / 80),
    ...model.roots.map((root) => root.x),
    ...model.criticalPositions,
  ].sort((a, b) => a - b);
  const points = samples
    .map(
      (sample) =>
        `${x(sample).toFixed(2)},${y(model.valueAt(sample)).toFixed(2)}`,
    )
    .join(" ");
  const rootList = model.roots.map(rootText).join(", ");

  return (
    <details data-model="source028-quartic-roots">
      <summary>Dördüncü dereceden denklemde gerçek kökler</summary>
      <p>
        f(x) = 0 denkleminde u = x² yaz. Her çarpanı sıfıra eşitle ve bulduğun u
        değerlerini x² eşitliğinde denetle. Kökün çokluğu, ilgili doğrusal
        çarpanın kaç kez yer aldığını gösterir.
      </p>
      <div className="lab-controls">
        {(["first", "second"] as const).map((key, index) => (
          <label className="field" key={key}>
            {index === 0 ? "İlk u kökü" : "İkinci u kökü"}
            <strong aria-hidden="true">{integerText(value(key))}</strong>
            <input
              type="range"
              min={min}
              max={max}
              step={1}
              value={value(key)}
              aria-label={index === 0 ? "İlk u kökü" : "İkinci u kökü"}
              aria-valuetext={integerText(value(key))}
              onChange={(event) =>
                set({ [key]: Number(event.currentTarget.value) })
              }
            />
          </label>
        ))}
      </div>
      <div className="lab-choice-buttons">
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
          aria-pressed={closeView}
          disabled={model.roots.length === 0}
          onClick={() => set({ zoom: !closeView })}
        >
          Eksen çevresine yaklaş
        </button>
      </div>
      <div className="model-results" role="status">
        <p className="math-expression">
          u²{term(-model.sum, "u")}
          {term(model.product)} = {factor("u", first)} · {factor("u", second)}
        </p>
        <p className="math-expression">
          x⁴{term(-model.sum, "x²")}
          {term(model.product)} = {factor("x²", first)} · {factor("x²", second)}
        </p>
        {model.cancelled.length > 0 && (
          <p>
            {model.cancelled.map((n) => `u = ${integerText(n)}`).join(", ")}{" "}
            için x² negatif olur. O eşitliklerden gerçek x çıkmaz.
          </p>
        )}
        <p>{rootList ? <>Gerçek kökler {rootList}.</> : "Gerçek kök yok."}</p>
        {model.roots.length > 0 && (
          <ul>
            {model.roots.map((root) => (
              <li key={root.x}>
                x = {rootText(root)}. Çokluk {root.multiplicity}.{" "}
                {root.multiplicity % 2
                  ? "Grafik x eksenini keser."
                  : "Grafik x eksenine değer."}
              </li>
            ))}
          </ul>
        )}
      </div>
      <figure>
        <svg
          viewBox="0 0 560 270"
          style={{ width: "100%", height: "auto" }}
          role="img"
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-description`}
        >
          <title id={`${id}-title`}>Dördüncü dereceden denklemin grafiği</title>
          <desc id={`${id}-description`}>
            {rootList
              ? `Yatay eksende gösterilen gerçek kökler ${rootList}.`
              : "Eğri yatay eksene ulaşmıyor."}
          </desc>
          <defs>
            <clipPath id={`${id}-plot`}>
              <rect x={56} y={38} width={448} height={190} />
            </clipPath>
          </defs>
          <g aria-hidden="true">
            {axis.map((tick) => (
              <g key={tick}>
                <line
                  x1={x(tick)}
                  y1={38}
                  x2={x(tick)}
                  y2={228}
                  stroke="var(--border)"
                />
                <text
                  x={x(tick)}
                  y={250}
                  textAnchor="middle"
                  fill="var(--muted)"
                  fontSize={17}
                >
                  {integerText(tick)}
                </text>
              </g>
            ))}
            <path
              d={`M 56 ${y(0)} H 504 M ${x(0)} 38 V 228`}
              stroke="var(--text)"
              strokeWidth={1.5}
              fill="none"
            />
            <polyline
              points={points}
              stroke="var(--plot-blue)"
              strokeWidth={closeView ? 2 : 3}
              fill="none"
              clipPath={`url(#${id}-plot)`}
            />
            {model.roots.map((root, index, roots) => {
              const nearest = Math.min(
                index > 0 ? x(root.x) - x(roots[index - 1].x) : Infinity,
                index + 1 < roots.length
                  ? x(roots[index + 1].x) - x(root.x)
                  : Infinity,
              );
              return (
                <circle
                  key={root.x}
                  cx={x(root.x)}
                  cy={y(0)}
                  r={Math.min(6, nearest / 2 - 1.75)}
                  fill={
                    root.multiplicity % 2 ? "var(--accent)" : "var(--panel)"
                  }
                  stroke="var(--accent)"
                  strokeWidth={2}
                />
              );
            })}
            <text x={532} y={250} fill="var(--muted)" fontSize={17}>
              x
            </text>
            <text x={18} y={25} fill="var(--muted)" fontSize={17}>
              f(x)
            </text>
          </g>
        </svg>
        <figcaption>
          Dolu işaret eksende kesişmeyi, içi boş işaret değip geri dönmeyi
          gösterir.
          {closeView &&
            ` Yakın görünüm ${integerText(bottom)} ile ${top} arasındaki f(x) değerlerini gösterir.`}
        </figcaption>
      </figure>
    </details>
  );
}
