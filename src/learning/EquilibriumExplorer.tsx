import { useId } from "react";
import { useExploration } from "./useExploration";
import { equilibriumAt, numberTR as f } from "./aytModels";
export default function EquilibriumExplorer() {
  const uid = useId();
  const [s, set] = useExploration("dynamic-equilibrium", {
    time: 0,
    initialB: 0,
    catalyst: false,
  });
  const time = Math.max(0, Math.min(8, Math.round(s.time * 2) / 2)),
    initialB = [0, 2, 3].includes(s.initialB) ? s.initialB : 0;
  const m = equilibriumAt(time, initialB, s.catalyst);
  const samples = Array.from({ length: 81 }, (_, i) => ({
    t: i / 10,
    ...equilibriumAt(i / 10, initialB, s.catalyst),
  }));
  const x = (t: number) => 60 + (t / 8) * 420;
  const y = (n: number, max: number) => 240 - (n / max) * 200;
  function chart(rate: boolean) {
    const max = rate ? 6 : 3,
      title = rate ? "İleri ve geri tepkime hızı" : "A ve B derişimleri";
    const first = rate ? m.forward : m.a,
      second = rate ? m.reverse : m.b;
    const path = (key: "a" | "b" | "forward" | "reverse") =>
      samples
        .map((p, i) => `${i ? "L" : "M"}${x(p.t)},${y(p[key], max)}`)
        .join(" ");
    return (
      <figure className="ayt-chart">
        <figcaption>
          {title} · {rate ? "mol/(L·s)" : "mol/L"}
        </figcaption>
        <svg
          viewBox="0 0 520 290"
          role="img"
          aria-label={`${title}. ${rate ? "İleri hız" : "A"} ${f(first)}, ${rate ? "geri hız" : "B"} ${f(second)}.`}
        >
          <line x1="60" y1="240" x2="490" y2="240" className="lab-axis" />
          <line x1="60" y1="30" x2="60" y2="240" className="lab-axis" />
          {(rate ? [0, 2, 4, 6] : [0, 1, 2, 3]).map((v) => (
            <g key={v}>
              <line
                x1="60"
                y1={y(v, max)}
                x2="480"
                y2={y(v, max)}
                className="plot-grid"
              />
              <text
                x="48"
                y={y(v, max) + 5}
                textAnchor="end"
                className="plot-label"
              >
                {v}
              </text>
            </g>
          ))}
          {[0, 2, 4, 6, 8].map((v) => (
            <text
              key={v}
              x={x(v)}
              y="262"
              textAnchor="middle"
              className="plot-label"
            >
              {v}
            </text>
          ))}
          <text x="470" y="283" textAnchor="end" className="plot-label">
            Zaman (s)
          </text>
          <path
            d={path(rate ? "forward" : "a")}
            fill="none"
            stroke="var(--mint)"
            strokeWidth="4"
          />
          <path
            d={path(rate ? "reverse" : "b")}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="8 5"
          />
          <line
            x1={x(time)}
            y1="35"
            x2={x(time)}
            y2="240"
            stroke="var(--muted)"
            strokeWidth="1.5"
            strokeDasharray="3 4"
          />
          <circle cx={x(time)} cy={y(first, max)} r="6" fill="var(--mint)" />
          <circle cx={x(time)} cy={y(second, max)} r="5" fill="var(--accent)" />
        </svg>
        <p className="lab-caption">
          {rate
            ? "Yeşil düz: ileri hız · Mercan kesikli: geri hız"
            : "Yeşil düz: A · Mercan kesikli: B"}
        </p>
      </figure>
    );
  }
  const bCount = Math.round(m.b * 10);
  return (
    <section
      className="visual-lab equilibrium-lab"
      aria-labelledby={`${uid}-title`}
    >
      <div className="lab-heading">
        <h2 id={`${uid}-title`}>Denge, durmak değildir</h2>
        <p>
          Kapalı kaptaki A ⇌ B dönüşümünü izle. Derişimlerin sabit kalmasıyla
          tepkimelerin durmasını birbirinden ayır.
        </p>
      </div>
      <div className="ayt-controls">
        <label className="field">
          Başlangıç karışımı
          <select
            aria-label="Başlangıç karışımı"
            value={initialB}
            onChange={(e) => set({ initialB: Number(e.target.value), time: 0 })}
          >
            <option value={0}>Yalnız A: [A] = 3, [B] = 0</option>
            <option value={3}>Yalnız B: [A] = 0, [B] = 3</option>
            <option value={2}>Denge karışımı: [A] = 1, [B] = 2</option>
          </select>
        </label>
        <label className="lab-slider">
          Geçen süre: {f(time)} s
          <input
            aria-label="Geçen süre"
            type="range"
            min={0}
            max={8}
            step={0.5}
            value={time}
            onChange={(e) => set({ time: Number(e.target.value) })}
          />
        </label>
      </div>
      <div className="lab-actions">
        <button
          className="secondary"
          disabled={time === 8}
          onClick={() => set({ time: Math.min(8, time + 1) })}
        >
          1 saniye ilerlet
        </button>
        <button
          className="secondary"
          aria-pressed={s.catalyst}
          onClick={() => set({ catalyst: !s.catalyst, time: 0 })}
        >
          {s.catalyst
            ? "Katalizörlü başlangıç: iki hız da ×3"
            : "Başlangıçta katalizör kullan"}
        </button>
        <button
          className="text-button"
          onClick={() => set({ time: 0, catalyst: false, initialB: 0 })}
        >
          Başa dön
        </button>
      </div>
      <div className="equilibrium-vessel">
        <svg
          viewBox="0 0 360 180"
          role="img"
          aria-label="A ve B tanecikleri aynı kapta; toplam tanecik gösterimi sabit."
        >
          <rect
            x="20"
            y="15"
            width="320"
            height="150"
            rx="15"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="3"
          />
          {Array.from({ length: 30 }, (_, i) => (
            <circle
              key={i}
              cx={48 + (i % 10) * 29}
              cy={47 + Math.floor(i / 10) * 43}
              r="8"
              fill={i < bCount ? "var(--accent)" : "var(--mint)"}
            />
          ))}
        </svg>
        <p>
          A ve B aynı kapta · Toplam derişim: 3 mol/L. Tanecik çizimi
          şematiktir; sayısal değerler aşağıda.
        </p>
      </div>
      <div className="model-results" aria-live="polite">
        <output className="concentration-result">
          Şimdi: [A] = <strong>{f(m.a)} mol/L</strong> · [B] ={" "}
          <strong>{f(m.b)} mol/L</strong>
        </output>
        <output className="rate-result">
          İleri hız = {f(m.forward)} · Geri hız = {f(m.reverse)} mol/(L·s)
        </output>
      </div>
      <div className="ayt-chart-grid">
        {chart(false)}
        {chart(true)}
      </div>
      <div className="model-results equilibrium-limit">
        <h3>Denge sınırında</h3>
        <p>
          [A] = 1 mol/L, [B] = 2 mol/L; derişimler eşit değil. İleri hız = geri
          hız = <strong>{f(m.equilibriumRate)} mol/(L·s)</strong>.
        </p>
        <p>
          Kc = [B] / [A] = <strong>2</strong>. Katalizör bu oranı değiştirmez;
          aynı dengeye daha hızlı yaklaştırır.
        </p>
      </div>
      <p className="lab-caption">
        Sabit sıcaklık ve hacimde, tek basamaklı A ⇌ B modeli: k(ileri) = 0,6
        s⁻¹, k(geri) = 0,3 s⁻¹. Katalizör iki sabiti de üç katına çıkarır. Sonlu
        zamanda dengeye yaklaşım ve yuvarlanmış değerler gösterilir; denge
        sınırı ayrı verilmiştir. Katalizör seçimi zamanı başa alır; iki ayrı
        başlangıç koşulu karşılaştırılır.
      </p>
    </section>
  );
}
