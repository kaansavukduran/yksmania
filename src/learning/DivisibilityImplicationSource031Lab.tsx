import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  divisibilityImplication031,
  type ConditionalForm031,
} from "./divisibilityImplicationSource031Model";

const forms = [
  { id: "original", label: "İlk önerme", formula: "p → q" },
  { id: "converse", label: "Karşıt", formula: "q → p" },
  { id: "inverse", label: "Ters", formula: "p′ → q′" },
  { id: "contrapositive", label: "Karşıt ters", formula: "q′ → p′" },
] as const satisfies readonly {
  id: ConditionalForm031;
  label: string;
  formula: string;
}[];

const defaults = { a: 4, b: 2, form: "original" };
const values = Array.from({ length: 13 }, (_, index) => index - 4);

const isDivisor = (n: number) => Number.isInteger(n) && n >= 2 && n <= 8;
const shownValue = (n: number) => String(n).replace("-", "−");

export function DivisibilityImplicationSource031Lab() {
  const id = useId();
  const [saved, set] = useExploration(
    "divisibility-implication-source-031",
    defaults,
  );
  const a = isDivisor(saved.a) ? saved.a : defaults.a;
  const b = isDivisor(saved.b) ? saved.b : defaults.b;
  const current = forms.find((item) => item.id === saved.form) ?? forms[0];
  const model = divisibilityImplication031(a, b, current.id);
  const shownRows = values.map((n) => ({ n, ...model.truthAt(n) }));
  const witness = model.witness;
  const witnessText =
    witness === null ? "" : `Bir karşı örnek olarak n=${witness} alınabilir.`;

  const field = (key: "a" | "b", value: number, label: string) => (
    <label className="field">
      {label}
      <strong aria-hidden="true">{value}</strong>
      <input
        type="range"
        min={2}
        max={8}
        step={1}
        value={value}
        aria-label={label}
        onChange={(event) => set({ [key]: Number(event.currentTarget.value) })}
      />
    </label>
  );

  return (
    <details data-model="source031-divisibility-implication">
      <summary>Koşulu değiştir, ispatı veya karşı örneği gör</summary>
      <p>
        n bir tam sayı. p, “n {a} ile bölünür”, q ise “n {b} ile bölünür”
        önermesi. Bir koşullu önerme yalnız öncül 1 ve sonuç 0 iken yanlıştır.
      </p>
      <div className="f014m-controls">
        {field("a", a, "p önermesindeki bölen")}
        {field("b", b, "q önermesindeki bölen")}
      </div>
      <div className="lab-choice-buttons" aria-label="Koşulun biçimi">
        {forms.map((item) => (
          <button
            key={item.id}
            type="button"
            className="secondary"
            aria-pressed={item.id === current.id}
            onClick={() => set({ form: item.id })}
          >
            {item.label} · {item.formula}
          </button>
        ))}
      </div>
      <div className="f014m-result" role="status">
        <p>
          <strong>{current.formula}.</strong>{" "}
          {model.validForIntegers
            ? "Bütün tam sayılarda doğru."
            : `Bütün tam sayılarda doğru değil. ${witnessText} Bu sayı öncülü doğru, sonucu yanlış yapar.`}
        </p>
        {model.validForIntegers && (
          <p>
            {model.proofDivisor} = {model.requiredDivisor}·{model.factor}. n,{" "}
            {model.proofDivisor}·k biçimindeyse aynı n, {model.requiredDivisor}
            ·({model.factor}·k) biçiminde yazılır. k ve {model.factor}·k tam
            sayıdır.
            {model.negate &&
              " Seçilen önerme, bu bölünebilme ilişkisinin karşıt tersidir."}
          </p>
        )}
        <p>
          Sayı doğrusunda yalnız −4 ile 8 arasındaki 13 değer gösteriliyor.
          Genel sonuç bölünebilme hesabından gelir.
        </p>
      </div>
      <figure>
        <svg
          viewBox="0 0 440 158"
          style={{ width: "100%", height: "auto" }}
          role="img"
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-description`}
        >
          <title id={`${id}-title`}>Koşullu önermenin sayı doğrusu</title>
          <desc id={`${id}-description`}>
            {shownRows.filter((row) => !row.valid).length > 0
              ? `Önermeyi yanlış yapan gösterilmiş değerler: ${shownRows
                  .filter((row) => !row.valid)
                  .map(({ n }) => shownValue(n))
                  .join(", ")}.`
              : "Gösterilen değerlerin hiçbirinde öncül doğru ve sonuç yanlış olmadı."}
          </desc>
          <g aria-hidden="true">
            <line
              x1={23}
              y1={79}
              x2={417}
              y2={79}
              stroke="var(--border)"
              strokeWidth={2}
            />
            {shownRows.map(({ n, left, valid }, index) => {
              const x = 34 + 31 * index;
              return (
                <g key={n} data-value={n} data-valid={valid}>
                  {valid ? (
                    <circle
                      cx={x}
                      cy={79}
                      r={6}
                      fill={left ? "var(--accent)" : "var(--panel)"}
                      stroke="var(--text)"
                      strokeWidth={2}
                    />
                  ) : (
                    <path
                      d={`M${x - 6} 73L${x + 6} 85 M${x - 6} 85L${x + 6} 73`}
                      stroke="var(--text)"
                      strokeWidth={2.5}
                    />
                  )}
                  <text
                    x={x}
                    y={109}
                    textAnchor="middle"
                    fill="var(--text)"
                    fontSize={18}
                  >
                    {shownValue(n)}
                  </text>
                  {n === witness && (
                    <circle
                      cx={x}
                      cy={79}
                      r={11}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth={2}
                    />
                  )}
                </g>
              );
            })}
          </g>
        </svg>
        <figcaption>
          Dolu dairede öncül ve sonuç doğru. Boş dairede öncül yanlış ve koşullu
          önerme doğru. Çarpı, öncülün doğru ve sonucun yanlış olduğu değerleri
          gösterir.
        </figcaption>
      </figure>
    </details>
  );
}
