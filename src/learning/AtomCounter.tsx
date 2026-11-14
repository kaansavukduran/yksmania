import { ModelNumber } from "./ModelNumber";
import { clampInt } from "./mathModels";
import { useExploration } from "./useExploration";
const pairs = [
  {
    name: "İzotop örneği",
    rows: [
      ["¹²₆C", 6, 6, 6],
      ["¹⁴₆C", 6, 8, 6],
    ] as const,
    reason: "Z aynı, nötron sayısı farklı: aynı elementin iki izotopu.",
  },
  {
    name: "İzoton örneği",
    rows: [
      ["¹³₆C", 6, 7, 6],
      ["¹⁴₇N", 7, 7, 7],
    ] as const,
    reason:
      "Nötron sayısı 7, protonlar farklı: izoton. Kütle numaraları eşit değil.",
  },
  {
    name: "İzobar örneği",
    rows: [
      ["¹⁴₆C", 6, 8, 6],
      ["¹⁴₇N", 7, 7, 7],
    ] as const,
    reason: "A=14 aynı, protonlar farklı: izobar. Nötron sayıları eşit değil.",
  },
  {
    name: "İzoelektronik örneği",
    rows: [
      ["²⁰₁₀Ne", 10, 10, 10],
      ["²³₁₁Na⁺", 11, 12, 10],
    ] as const,
    reason:
      "Bu temel hâl örneklerinde 10 elektron ve 2,8 katman düzeni aynı. Protonlar farklı olduğu için aynı element değiller.",
  },
];
export function AtomCounter({ comparison = false }: { comparison?: boolean }) {
  const [saved, set] = useExploration(
    comparison ? "atom-comparison" : "atom-counter",
    { z: 11, n: 12, e: 11, pair: 0 },
  );
  const z = clampInt(saved.z, 1, 20),
    neutrons = clampInt(saved.n, 0, 30),
    electrons = clampInt(saved.e, 0, 25),
    charge = z - electrons,
    pair = pairs[clampInt(saved.pair, 0, pairs.length - 1)];
  return (
    <section className="concept-model" aria-label="Atom tanecik sayacı">
      <h3>Çekirdeği ve yükü ayrı değiştir</h3>
      <ModelNumber
        label="Proton sayısı Z"
        min={1}
        max={20}
        value={z}
        onChange={(n) => set({ z: n })}
      />
      <ModelNumber
        label="Nötron sayısı"
        min={0}
        max={30}
        value={neutrons}
        onChange={(n) => set({ n })}
      />
      <ModelNumber
        label="Elektron sayısı"
        min={0}
        max={25}
        value={electrons}
        onChange={(n) => set({ e: n })}
      />
      <svg
        viewBox="0 0 560 210"
        role="img"
        aria-label={`${z} proton ve ${neutrons} nötron çekirdekte; ${electrons} elektron çekirdek dışında. Kütle numarası ${z + neutrons}, net yük ${charge}.`}
      >
        <ellipse
          cx="280"
          cy="100"
          rx="240"
          ry="80"
          fill="var(--surface-2)"
          stroke="var(--muted)"
          strokeDasharray="6 4"
        />
        <rect
          x="180"
          y="50"
          width="200"
          height="95"
          rx="30"
          fill="var(--surface)"
          stroke="var(--mint)"
          strokeWidth="3"
        />
        <text
          x="280"
          y="80"
          textAnchor="middle"
          fontSize="15"
          fill="var(--text)"
        >
          Çekirdek
        </text>
        <text
          x="280"
          y="106"
          textAnchor="middle"
          fontSize="16"
          fill="var(--text)"
        >
          {z} p⁺ · {neutrons} n⁰
        </text>
        <text
          x="280"
          y="132"
          textAnchor="middle"
          fontSize="14"
          fill="var(--text)"
        >
          A = {z + neutrons}
        </text>
        <text
          x="280"
          y="195"
          textAnchor="middle"
          fontSize="15"
          fill="var(--text)"
        >
          Çekirdek dışında {electrons} elektron
        </text>
      </svg>
      <p className="model-result">
        <strong>
          Z = {z} · A = {z} + {neutrons} = {z + neutrons} · q = {z} −{" "}
          {electrons} = {charge > 0 ? `+${charge}` : charge}
        </strong>
      </p>
      <p>
        {charge === 0
          ? "Yüksüz tanecik: proton ve elektron sayıları eşit."
          : charge > 0
            ? "Pozitif yüklü tanecik: elektron sayısı protondan az."
            : "Negatif yüklü tanecik: elektron sayısı protondan fazla."}{" "}
        Elektronu bir azalt; Z ve A’nın korunduğunu kontrol et. Nötronu
        değiştirince aynı elementin farklı çekirdek türünü sayarsın.
      </p>
      {comparison && (
        <>
          <h3>Hangi sayı aynı?</h3>
          <div className="walk-scenarios">
            {pairs.map((p, i) => (
              <button
                key={p.name}
                className="secondary"
                aria-pressed={p === pair}
                onClick={() => set({ pair: i })}
              >
                {p.name}
              </button>
            ))}
          </div>
          <table className="model-data">
            <caption>{pair.name}: tanecikleri karşılaştır</caption>
            <thead>
              <tr>
                {["Tanecik", "p", "n", "e", "A", "q"].map((c) => (
                  <th scope="col" key={c}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pair.rows.map(([name, p, n, e]) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td>{p}</td>
                  <td>{n}</td>
                  <td>{e}</td>
                  <td>{p + n}</td>
                  <td>{p - e}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p aria-live="polite">{pair.reason}</p>
        </>
      )}
      <p className="small muted">
        Bu bir tanecik sayma modelidir. Her sayı birleşimi doğada kararlı veya
        bağlanmış bir atom/iyon değildir. Alanlar gerçek boyutları, yoğunluğu
        veya elektron yörüngesini göstermez; izoelektroniklik örnekleri seçili
        temel hâl tanecikleridir.
      </p>
    </section>
  );
}
