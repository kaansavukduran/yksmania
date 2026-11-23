import "./forge014Math.css";
import { useId } from "react";
import { useExploration } from "./useExploration";
import { separatedPermutations032, type Seating032 } from "./separatedPermutationsSource032Model";

const seatingOptions = [
  ["row", "Doğrusal sıra"],
  ["circle", "Etiketsiz çember"],
  ["labelled-circle", "Numaralı çember"],
] as const;
const defaults = { people: 7, special: 3, seating: "row" };
const number = new Intl.NumberFormat("tr-TR");

export function SeparatedPermutationsSource032Lab() {
  const id = useId();
  const [values, set] = useExploration("separated-permutations-source-032", defaults);
  const people = Number.isInteger(values.people) ? Math.min(8, Math.max(1, values.people)) : defaults.people;
  const special = Number.isInteger(values.special) ? Math.min(people, Math.max(0, values.special)) : defaults.special;
  const seating: Seating032 = seatingOptions.find(([key]) => key === values.seating)?.[0] ?? "row";
  const result = separatedPermutations032(people, special, seating);
  const row = seating === "row";
  const symbols: Array<{ label: string; special: boolean }> = [];
  if (result.singlePerson) {
    symbols.push({ label: "A", special: special === 1 });
  } else if (result.separated > 0) {
    for (let i = 0; i < result.ordinary; i += 1) {
      if (row && i < special) symbols.push({ label: String.fromCharCode(65 + i), special: true });
      symbols.push({ label: String.fromCharCode(65 + special + i), special: false });
      if (!row && i < special) symbols.push({ label: String.fromCharCode(65 + i), special: true });
    }
    if (row && special > result.ordinary) {
      symbols.push({ label: String.fromCharCode(65 + special - 1), special: true });
    }
  }
  const positions = symbols.map((symbol, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / people;
    return {
      ...symbol,
      x: row ? (people === 1 ? 225 : 30 + 390 * i / (people - 1)) : 225 + 116 * Math.cos(angle),
      y: row ? 68 : 154 + 113 * Math.sin(angle),
    };
  });

  return (
    <details data-model="source032-separated-permutations">
      <summary>Özel kişileri ayrı yerlere oturt</summary>
      <p>Herkes farklı. İki özel kişi yan yana oturmasın.</p>
      <div className="f014m-controls">
        <label className="field">
          Kişi sayısı
          <input type="range" min={1} max={8} value={people} aria-valuetext={`${people} kişi`}
            onChange={(event) => set({ people: Number(event.currentTarget.value) })} />
          <span aria-hidden="true">{people} kişi</span>
        </label>
        <label className="field">
          Özel kişi sayısı
          <input type="range" min={0} max={people} value={special} aria-valuetext={`${special} özel kişi`}
            onChange={(event) => set({ special: Number(event.currentTarget.value) })} />
          <span aria-hidden="true">{special} özel kişi</span>
        </label>
      </div>
      <div className="lab-choice-buttons" role="group" aria-label="Oturma biçimi">
        {seatingOptions.map(([mode, label]) => (
          <button key={mode} type="button" className="secondary" aria-pressed={seating === mode}
            onClick={() => set({ seating: mode })}>{label}</button>
        ))}
      </div>
      <div className="f014m-result" role="status">
        <p><strong>{number.format(result.separated)} uygun düzen.</strong> Bütün düzenler {number.format(result.total)}.</p>
        {result.singlePerson ? (
          <p>Tek kişi komşu olamaz. Yalnız bir düzen vardır.</p>
        ) : (
          <p>
            {result.ordinary} sıradan kişi {result.gaps} boşluk bırakır. {special > result.gaps
              ? `${special} özel kişiye yetecek ayrı boşluk yok.`
              : `${number.format(result.ordinaryOrders)} ilk sıra × ${number.format(result.allocations)} boşluk seçimi × ${number.format(result.specialOrders)} özel kişi sırası${result.seatsFactor > 1 ? ` × ${result.seatsFactor} dönük konum` : ""}.`}
          </p>
        )}
      </div>
      {positions.length > 0 && (
        <figure>
          <svg viewBox={row ? "0 0 450 135" : "0 0 450 308"} width="100%" role="img" aria-labelledby={`${id}-seating`}>
            <title id={`${id}-seating`}>Ayrı oturan özel kişiler için bir örnek düzen</title>
            <g aria-hidden="true">
              {!row && <ellipse cx={225} cy={154} rx={116} ry={113} fill="none" stroke="var(--border)" strokeWidth={3} />}
              {positions.map(({ label, special: selected, x, y }, i) => (
                <g key={label}>
                  {selected
                    ? <rect x={x - 17} y={y - 17} width={34} height={34} rx={5} fill="var(--panel)" stroke="var(--accent)" strokeWidth={4} />
                    : <circle cx={x} cy={y} r={17} fill="var(--panel)" stroke="var(--text)" strokeWidth={2} />}
                  <text x={x} y={y + 7} textAnchor="middle" fill="var(--text)" fontSize={21}>{label}</text>
                  {seating === "labelled-circle" && (
                    <text x={225 + (x - 225) * 0.71} y={159 + (y - 154) * 0.71} textAnchor="middle" fill="var(--text)" fontSize={17}>{i + 1}</text>
                  )}
                </g>
              ))}
            </g>
          </svg>
          <figcaption>
            Bir düzen {symbols.map(({ label }, i) => seating === "labelled-circle" ? `${i + 1} numarada ${label}` : label).join(", ")}.
            {special > 0 && ` Köşeli işaretler özel kişileri gösterir: ${symbols.filter((item) => item.special).map((item) => item.label).join(", ")}.`}
          </figcaption>
        </figure>
      )}
    </details>
  );
}
