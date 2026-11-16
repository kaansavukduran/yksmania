import { useId } from "react";
import { useExploration } from "./useExploration";
import { clampInt } from "./mathModels";

const examples = [
  { symbol: "Na", z: 11, charge: 1, group: 1 },
  { symbol: "Mg", z: 12, charge: 2, group: 2 },
  { symbol: "Al", z: 13, charge: 3, group: 13 },
  { symbol: "O", z: 8, charge: -2, group: 16 },
  { symbol: "Cl", z: 17, charge: -1, group: 17 },
  { symbol: "Ca", z: 20, charge: 2, group: 2 },
];
export function electronShells(count: number) {
  if (!Number.isInteger(count) || count < 0 || count > 20)
    throw Error("SHELL_SCOPE");
  const distribution: number[] = [];
  for (const capacity of [2, 8, 8, 2]) {
    if (!count) break;
    const take = Math.min(count, capacity);
    distribution.push(take);
    count -= take;
  }
  return distribution;
}
export default function ElectronShellExplorer() {
  const id = useId();
  const [s, set] = useExploration("electron-shells", { choice: 0, ion: false });
  const choice = clampInt(s.choice, 0, examples.length - 1),
    atom = examples[choice];
  const charge = s.ion ? atom.charge : 0;
  const count = atom.z - charge,
    shells = electronShells(count),
    neutral = electronShells(atom.z);
  return (
    <section className="visual-lab shell-lab" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>Elektronu değiştir, çekirdeği koru</h2>
      <p>
        Bir örnek seç; nötr atomla yaygın basit iyonunu karşılaştır. Proton
        sayısı ve elementin tablo adresi korunurken elektron sayısını ve dolu
        katmanları izle.
      </p>
      <div className="lab-choice-buttons">
        {examples.map((example, index) => (
          <button
            className="secondary"
            key={example.symbol}
            aria-pressed={index === choice}
            onClick={() => set({ choice: index, ion: false })}
          >
            {example.symbol}
          </button>
        ))}
      </div>
      <div className="segmented">
        <button
          aria-pressed={!s.ion}
          className={!s.ion ? "active" : ""}
          onClick={() => set({ ion: false })}
        >
          Nötr atom
        </button>
        <button
          aria-pressed={s.ion}
          className={s.ion ? "active" : ""}
          onClick={() => set({ ion: true })}
        >
          {atom.symbol}
          {atom.charge > 0
            ? `${atom.charge === 1 ? "" : atom.charge}+`
            : `${atom.charge === -1 ? "" : Math.abs(atom.charge)}−`}{" "}
          iyonu
        </button>
      </div>
      <svg
        viewBox="0 0 360 330"
        role="img"
        aria-label={`${atom.symbol}, ${atom.z} proton, ${count} elektron; katmanlar ${shells.join(", ")}`}
      >
        <circle cx="180" cy="160" r="29" fill="var(--accent)" />
        <text
          x="180"
          y="166"
          textAnchor="middle"
          fill="var(--accent-text)"
          fontSize="17"
        >
          {atom.z} p⁺
        </text>
        {shells.map((number, index) => {
          const radius = 49 + index * 28;
          return (
            <g key={index}>
              <circle
                cx="180"
                cy="160"
                r={radius}
                fill="none"
                stroke="var(--muted)"
                strokeWidth="1.4"
              />
              {Array.from({ length: number }, (_, i) => {
                const angle = (2 * Math.PI * i) / number - Math.PI / 2;
                return (
                  <circle
                    className="shell-electron"
                    key={i}
                    cx={180 + radius * Math.cos(angle)}
                    cy={160 + radius * Math.sin(angle)}
                    r="5"
                    fill="var(--plot-blue)"
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
      <div className="model-results shell-result" role="status">
        <strong>
          {atom.z} proton · {count} elektron · yük {charge > 0 ? "+" : ""}
          {charge}
        </strong>
        <p>
          Katman dağılımı: {shells.join(" · ")}. Toplam:{" "}
          {shells.reduce((sum, n) => sum + n, 0)} elektron.
        </p>
        <p>
          Nötr atom {neutral.length}. periyot, {atom.group}. grup.{" "}
          {s.ion
            ? "İyonun elektron içeren katman sayısı elementin periyodunu değiştirmez."
            : "Periyot nötr temel hâlde elektron içeren katman sayısından okunur."}
        </p>
      </div>
      <p className="lab-caption">
        Bu model ilk 20 nötr atom ve seçili basit iyon örnekleriyle sınırlıdır.
        Noktalar sayım şemasıdır; elektronların kesin konumlarını veya gerçek
        yörüngelerini göstermez. Keşif puan veya tamamlanma oluşturmaz.
      </p>
    </section>
  );
}
