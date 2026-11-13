import { useId } from "react";
import { useExploration } from "./useExploration";
import { pointField, numberTR as f } from "./aytModels";
export default function ElectricFieldExplorer() {
  const uid = useId();
  const [s, set] = useExploration("electric-field", {
    source: 1,
    distance: 1,
    negative: false,
    neutral: false,
  });
  const source = Math.max(-4, Math.min(4, Math.round(s.source))),
    distance = Math.max(0.5, Math.min(3, Math.round(s.distance * 2) / 2));
  const q = s.neutral ? 0 : s.negative ? -1 : 1,
    m = pointField(source, distance, q),
    px = 130 + distance * 100;
  const dir = (v: number) => (v === 0 ? "sıfır" : v > 0 ? "sağa" : "sola");
  function arrow(value: number, cy: number, color: string, label: string) {
    return (
      <g>
        {value !== 0 && (
          <line
            data-vector={label}
            x1={px}
            y1={cy}
            x2={px + 75 * Math.sign(value)}
            y2={cy}
            stroke={color}
            strokeWidth="4"
            markerEnd={`url(#${uid}-${label})`}
          />
        )}
        <text x={px} y={cy - 18} textAnchor="middle" className="plot-label">
          {label}: {dir(value)}
        </text>
      </g>
    );
  }
  return (
    <section className="visual-lab field-lab" aria-labelledby={`${uid}-title`}>
      <div className="lab-heading">
        <h2 id={`${uid}-title`}>Alan başka, test yüküne kuvvet başka</h2>
        <p>
          Kaynak yükü ve uzaklığı değiştir. Sonra test yükünün işaretini
          değiştirerek hangi okun yön değiştirdiğini incele.
        </p>
      </div>
      <div className="ayt-controls">
        <label className="lab-slider">
          Kaynak yük Q: {f(source)} µC
          <input
            aria-label="Kaynak yük Q"
            type="range"
            min={-4}
            max={4}
            step={1}
            value={source}
            onChange={(e) => set({ source: Number(e.target.value) })}
          />
        </label>
        <label className="lab-slider">
          Uzaklık r: {f(distance)} m
          <input
            aria-label="Uzaklık r"
            type="range"
            min={0.5}
            max={3}
            step={0.5}
            value={distance}
            onChange={(e) => set({ distance: Number(e.target.value) })}
          />
        </label>
      </div>
      <fieldset className="lab-choices">
        <legend>İncelenen taneciğin yükü q</legend>
        <div className="segmented">
          {[
            { v: 1, label: "+1 µC" },
            { v: -1, label: "−1 µC" },
            { v: 0, label: "Yüksüz tanecik" },
          ].map((o) => (
            <button
              key={o.v}
              aria-pressed={q === o.v}
              className={q === o.v ? "active" : ""}
              onClick={() => set({ neutral: o.v === 0, negative: o.v < 0 })}
            >
              {o.label}
            </button>
          ))}
        </div>
      </fieldset>
      <svg
        viewBox="0 0 620 310"
        role="img"
        aria-label={`Kaynağın sağındaki noktada elektrik alan ${dir(m.field)}, taneciğe elektriksel kuvvet ${dir(m.force)}.`}
      >
        <defs>
          {["E", "F"].map((v, i) => (
            <marker
              key={v}
              id={`${uid}-${v}`}
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path
                d="M0 0 L8 4 L0 8 Z"
                fill={i ? "var(--accent)" : "var(--plot-blue)"}
              />
            </marker>
          ))}
        </defs>
        <line
          className="lab-axis"
          x1="70"
          y1="165"
          x2="560"
          y2="165"
          strokeDasharray="5 5"
        />
        <circle
          cx="130"
          cy="165"
          r="27"
          fill="var(--surface)"
          stroke="var(--text)"
          strokeWidth="2"
        />
        <text x="130" y="171" textAnchor="middle" className="plot-label">
          {source > 0 ? "+" : source < 0 ? "−" : "0"}Q
        </text>
        <text x="130" y="215" textAnchor="middle" className="plot-label">
          Kaynak sabit
        </text>
        <circle cx={px} cy="165" r="12" fill="var(--accent)" />
        <text x={px + 20} y="171" className="plot-label">
          q = {q}
        </text>
        {arrow(m.field, 95, "var(--plot-blue)", "E")}
        {arrow(m.force, 250, "var(--accent)", "F")}
        <line x1="130" y1="35" x2={px} y2="35" className="lab-axis" />
        <text
          x={(130 + px) / 2}
          y="22"
          textAnchor="middle"
          className="plot-label"
        >
          r = {f(distance)} m
        </text>
      </svg>
      <div className="model-results" aria-live="polite">
        <output className="field-result">
          |E| = k|Q| / r² = <strong>{f(Math.abs(m.field))} N/C</strong> · yön:{" "}
          {dir(m.field)}
        </output>
        <output className="force-result">
          |F| = |q||E| = <strong>{f(Math.abs(m.force), 5)} N</strong> · yön:{" "}
          {dir(m.force)}
        </output>
      </div>
      <p className="lab-caption">
        Boşlukta k = 9 × 10⁹ N·m²/C² alınır. Yalnız sabit kaynağın alanı
        hesaplanır; taneciğin kaynağa etkisi ihmal edilir. Oklar yön içindir;
        büyüklükleri sonuçlarda oku. Tanecik yüksüzken kaynak alanı kaybolmaz.
      </p>
    </section>
  );
}
