import "./forge014Math.css";
import { useId } from "react";
import { useExploration } from "./useExploration";
import { signedBinomial035 } from "./signedBinomialSource035Model";

const defaults = { n: 5, r: 0, a: 2, b: -1, p: 1, q: 0 };
const format = new Intl.NumberFormat("tr-TR");
const absolute = (value: bigint) => (value < 0n ? -value : value);

export function SignedBinomialSource035Lab() {
  const id = useId();
  const [settings, set] = useExploration(
    "signed-binomial-source-035",
    defaults,
  );
  const read = (key: keyof typeof defaults, min: number, max: number) =>
    Math.min(
      max,
      Math.max(
        min,
        Number.isInteger(settings[key]) ? settings[key] : defaults[key],
      ),
    );
  const n = read("n", 0, 8);
  const a = read("a", -4, 4);
  const b = read("b", -4, 4);
  const p = read("p", -3, 3);
  const q = read("q", -3, 3);
  const r = read("r", 0, n);
  const expansion = signedBinomial035(
    n,
    { multiplier: a, exponent: p },
    { multiplier: b, exponent: q },
  );
  const chosen = expansion.terms[r];
  const rowTotal = expansion.rows[n].reduce((sum, value) => sum + value, 0n);
  const maximum = expansion.coefficients.reduce(
    (max, { coefficient }) =>
      absolute(coefficient) > max ? absolute(coefficient) : max,
    1n,
  );
  const field = (
    key: keyof typeof defaults,
    label: string,
    value: number,
    min: number,
    max: number,
  ) => (
    <label className="field">
      {label}
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        aria-valuetext={String(value)}
        onChange={(event) => set({ [key]: Number(event.currentTarget.value) })}
      />
      <span aria-hidden="true">{value}</span>
    </label>
  );

  return (
    <details data-model="source035-signed-binomial">
      <summary>Pascal ve işaretli katsayılar</summary>
      <p>
        (a·xᵖ + b·xᵠ)ⁿ. İlk terim a={a}, p={p}. İkinci terim b={b}, q={q}.
      </p>
      <div className="f014m-controls">
        {field("n", "Parantezin üssü", n, 0, 8)}
        {field("r", "İkinci terim kaç kez seçilsin?", r, 0, n)}
      </div>
      <details>
        <summary>Parantezin içini değiştir</summary>
        <div className="f014m-controls">
          {field("a", "İlk katsayı", a, -4, 4)}
          {field("b", "İkinci katsayı", b, -4, 4)}
          {field("p", "İlk değişken üssü", p, -3, 3)}
          {field("q", "İkinci değişken üssü", q, -3, 3)}
        </div>
      </details>
      <div className="f014m-result" role="status">
        <p>
          Pascal {n}. satır:{" "}
          {expansion.rows[n].map((v) => format.format(v)).join(", ")}. Satır
          toplamı {format.format(rowTotal)}.
        </p>
        <p>
          r={r} için C({n},{r})={format.format(chosen.choose)}. Değişken üssü{" "}
          {chosen.exponent}, katsayı {format.format(chosen.coefficient)}.
        </p>
        <p>
          {expansion.terms.length} seçim satırından{" "}
          {expansion.coefficients.length} farklı, sıfır dışı terim kalır.
        </p>
        <p>
          Çift dereceli toplam {format.format(expansion.evenSum)}. Tek dereceli
          toplam {format.format(expansion.oddSum)}. Sabit katsayı{" "}
          {format.format(expansion.constant)}.
        </p>
        <p>
          x=1 verilince{" "}
          {expansion.numericValueAtOneDefined
            ? format.format(expansion.coefficientTotal)
            : "özgün ifade tanımsız"}
          . x=−1 verilince{" "}
          {expansion.numericValueAtMinusOneDefined
            ? format.format(expansion.alternatingTotal)
            : "özgün ifade tanımsız"}
          .
        </p>
        {expansion.negativeExponentExcludesZero && <p>Özgün ifade için x≠0.</p>}
        {n === 0 && (
          <p>
            Boş çarpımın biçimsel katsayısı 1. Tabanı sıfır yapan noktalarda 0⁰
            değerlendirmesi yapılmaz.
          </p>
        )}
      </div>
      {expansion.coefficients.length > 0 && (
        <figure className="f040-plot">
          <svg
            viewBox="0 0 440 320"
            width="100%"
            role="img"
            aria-labelledby={`${id}-chart`}
          >
            <title id={`${id}-chart`}>
              Değişken üssüne göre işaretli katsayı çubukları
            </title>
            <g aria-hidden="true">
              <line
                x1={17}
                x2={423}
                y1={151}
                y2={151}
                stroke="var(--text)"
                strokeWidth={2}
              />
              {expansion.coefficients.map(
                ({ exponent, coefficient }, index, items) => {
                  const step = 400 / items.length;
                  const x = 20 + step * (index + 0.5);
                  const height =
                    (111 * Number(absolute(coefficient))) / Number(maximum);
                  const positive = coefficient > 0n;
                  return (
                    <g key={exponent}>
                      <rect
                        x={x - step * 0.26}
                        y={positive ? 151 - height : 151}
                        width={step * 0.52}
                        height={height}
                        fill={positive ? "var(--accent)" : "var(--text)"}
                      />
                      <text
                        x={x}
                        y={285}
                        textAnchor="middle"
                        fontSize={22}
                        fill="var(--text)"
                      >
                        {exponent}
                      </text>
                    </g>
                  );
                },
              )}
              <text
                x={220}
                y={313}
                textAnchor="middle"
                fontSize={22}
                fill="var(--text)"
              >
                Üs
              </text>
            </g>
          </svg>
          <figcaption>
            Pozitif çubuklar üstte, negatif çubuklar altta. Büyük mutlak değer
            daha uzun çubukla gösterilir.
          </figcaption>
          <ul>
            {expansion.coefficients.map(({ exponent, coefficient }) => (
              <li key={exponent}>
                Üs {exponent}, katsayı {format.format(coefficient)}.
              </li>
            ))}
          </ul>
        </figure>
      )}
      {expansion.coefficients.length === 0 && (
        <p>Birleşen bütün katsayılar sıfır.</p>
      )}
    </details>
  );
}
