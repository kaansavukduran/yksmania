import { ModelNumber } from "./ModelNumber";
import { clampInt } from "./mathModels";
import { fallEnergy } from "./narrativeCalculations";
import { useExploration } from "./useExploration";
const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 }).format(n);
export function EnergyModel() {
  const [saved, set] = useExploration("fall-energy", {
    mass: 2,
    height: 10,
    transfer: 0,
  });
  const mass = clampInt(saved.mass, 1, 5),
    height = clampInt(saved.height, 0, 10),
    transfer = clampInt(saved.transfer, 0, 100),
    model = fallEnergy(mass, 10, height, transfer / 100);
  return (
    <section className="concept-model" aria-label="Enerji dönüşümü keşfi">
      <h3>Enerji nereye gidiyor?</h3>
      <p>
        Başlangıç yüksekliği 10 m, ilk sürat sıfır, g=10 m/s². Anlık yüksekliği
        ve aktarılan payı seç.
      </p>
      <ModelNumber
        label="Kütle (kg)"
        min={1}
        max={5}
        value={mass}
        onChange={(n) => set({ mass: n })}
      />
      <ModelNumber
        label="Anlık yükseklik (m)"
        min={0}
        max={10}
        value={height}
        onChange={(n) => set({ height: n })}
      />
      <ModelNumber
        label="Azalan potansiyelin iç enerjiye aktarılan yüzdesi"
        min={0}
        max={100}
        value={transfer}
        onChange={(n) => set({ transfer: n })}
      />
      <svg
        viewBox="0 0 560 270"
        role="img"
        aria-label={`${height} metre yükseklikte potansiyel ${model.potential} joule, kinetik ${model.kinetic} joule, iç enerjiye aktarılan ${model.transferred} joule; toplam ${model.initial} joule`}
      >
        <path d="M35 30V230H170" fill="none" stroke="var(--muted)" />
        <path d="M35 30H170" stroke="var(--muted)" strokeDasharray="4 4" />
        <text x="40" y="20" fill="var(--muted)" fontSize="13">
          10 m başlangıç
        </text>
        <rect
          className="energy-height-marker"
          x="92"
          y={210 - height * 20}
          width="30"
          height="20"
          rx="3"
          fill="var(--mint)"
        />
        <text x="40" y="256" fill="var(--muted)" fontSize="13">
          0 m referans
        </text>
        {[
          { label: "Potansiyel", v: model.potential, color: "var(--mint)" },
          { label: "Kinetik", v: model.kinetic, color: "var(--accent)" },
          { label: "İç enerjiye", v: model.transferred, color: "var(--muted)" },
        ].map((item, i) => (
          <g key={item.label}>
            <rect
              className="energy-bar"
              x={205 + i * 113}
              y={230 - (item.v / model.initial) * 190}
              width="80"
              height={(item.v / model.initial) * 190}
              fill={item.color}
            />
            <text
              x={245 + i * 113}
              y="256"
              textAnchor="middle"
              fontSize="13"
              fill="var(--text)"
            >
              {item.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="model-result">
        <strong>
          {fmt(model.initial)} J = {fmt(model.potential)} J potansiyel +{" "}
          {fmt(model.kinetic)} J kinetik + {fmt(model.transferred)} J aktarım
        </strong>
      </p>
      <p>
        {transfer === 0
          ? "Aktarım yok: mekanik enerji potansiyel ve kinetik arasında paylaşılır."
          : "Mekanik enerjinin bir bölümü iç enerjiye aktarılır; üç payın toplamı başlangıç enerjisiyle aynıdır."}
      </p>
      <p className="small muted">
        Konum seçimi zaman animasyonu değildir. Aktarım payı özgün, varsayımsal
        hesap modelidir; ölçülmüş sürtünme katsayısı değildir. Çubuklar aynı
        başlangıç toplamına göre ölçeklenir, cisim zemine tabanından oturur.
      </p>
    </section>
  );
}
