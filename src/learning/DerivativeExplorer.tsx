import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  curveValue,
  slopeSample,
  numberTR as f,
  type Curve,
} from "./aytModels";
import { ChoiceSelect } from "../components/ChoiceSelect";
export default function DerivativeExplorer() {
  const uid = useId();
  const [s, set] = useExploration("derivative", {
    a: 1,
    gap: 0.5,
    left: false,
    absolute: false,
    tangent: false,
  });
  const a = Math.max(-2, Math.min(2, Math.round(s.a * 2) / 2));
  const gap = [1, 0.5, 0.1, 0.01].includes(s.gap) ? s.gap : 0.5;
  const h = gap * (s.left ? -1 : 1),
    curve: Curve = s.absolute ? "absolute" : "square";
  const m = slopeSample(curve, a, h);
  const yMin = s.absolute ? -1 : -4,
    yMax = s.absolute ? 4 : 12;
  const x = (n: number) => 55 + ((n + 3.5) / 7) * 510,
    y = (n: number) => 290 - ((n - yMin) / (yMax - yMin)) * 260;
  const path = Array.from({ length: 141 }, (_, i) => {
    const t = -3.5 + i * 0.05;
    return `${i ? "L" : "M"}${x(t)},${y(curveValue(curve, t))}`;
  }).join(" ");
  const line = (slope: number) =>
    `M${x(-3.5)},${y(m.fa + slope * (-3.5 - a))} L${x(3.5)},${y(m.fa + slope * (3.5 - a))}`;
  return (
    <section
      className="visual-lab derivative-lab"
      aria-labelledby={`${uid}-title`}
    >
      <div className="lab-heading">
        <h2 id={`${uid}-title`}>Kiriş teğete yaklaşırken</h2>
        <p>
          A noktasını seç. B’yi iki yönden yaklaştır; ortalama değişim oranının
          neye yaklaştığını incele.
        </p>
      </div>
      <div className="ayt-controls">
        <label className="field">
          Fonksiyon
          <ChoiceSelect
            aria-label="Fonksiyon"
            value={curve}
            onChange={(e) =>
              set({ absolute: e.target.value === "absolute", tangent: false })
            }
          >
            <option value="square">f(x) = x²</option>
            <option value="absolute">f(x) = |x|</option>
          </ChoiceSelect>
        </label>
        <label className="lab-slider">
          A noktasının x değeri: {f(a)}
          <input
            aria-label="A noktasının x değeri"
            type="range"
            min={-2}
            max={2}
            step={0.5}
            value={a}
            onChange={(e) => set({ a: Number(e.target.value) })}
          />
        </label>
      </div>
      <fieldset className="lab-choices">
        <legend>Yaklaşma aralığı |h|</legend>
        <div className="segmented">
          {[1, 0.5, 0.1, 0.01].map((v) => (
            <button
              key={v}
              className={gap === v ? "active" : ""}
              aria-pressed={gap === v}
              onClick={() => set({ gap: v })}
            >
              {f(v)}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="lab-actions">
        <button
          className="secondary"
          aria-pressed={s.left}
          onClick={() => set({ left: !s.left })}
        >
          {s.left
            ? "Soldan yaklaşılıyor (h < 0)"
            : "Sağdan yaklaşılıyor (h > 0)"}
        </button>
        <button
          className="secondary"
          aria-pressed={s.tangent}
          onClick={() => set({ tangent: !s.tangent })}
        >
          {s.tangent ? "Teğet kontrolünü gizle" : "Teğeti kontrol et"}
        </button>
      </div>
      <svg
        viewBox="0 0 620 340"
        role="img"
        aria-label={`Fonksiyon, A ve B noktaları ile kiriş. Kiriş eğimi ${f(m.secant)}.`}
      >
        <defs>
          <clipPath id={`${uid}-clip`}>
            <rect x="55" y="30" width="510" height="260" />
          </clipPath>
        </defs>
        <line className="lab-axis" x1="55" y1={y(0)} x2="580" y2={y(0)} />
        <line className="lab-axis" x1={x(0)} y1="20" x2={x(0)} y2="300" />
        {[-3, -2, -1, 1, 2, 3].map((v) => (
          <text
            key={v}
            x={x(v)}
            y={y(0) + 20}
            textAnchor="middle"
            className="plot-label"
          >
            {v}
          </text>
        ))}
        {(s.absolute ? [1, 2, 3, 4] : [-4, 4, 8, 12]).map((v) => (
          <text
            key={v}
            x={x(0) - 10}
            y={y(v) + 5}
            textAnchor="end"
            className="plot-label"
          >
            {v}
          </text>
        ))}
        <text x="584" y={y(0) + 5} className="plot-label">
          x
        </text>
        <text x={x(0) + 10} y="20" className="plot-label">
          y
        </text>
        <g clipPath={`url(#${uid}-clip)`}>
          <path d={path} fill="none" stroke="var(--mint)" strokeWidth="4" />
          <path
            data-line="secant"
            d={line(m.secant)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          {s.tangent && m.tangent !== null && (
            <path
              data-line="tangent"
              d={line(m.tangent)}
              fill="none"
              stroke="var(--plot-blue)"
              strokeWidth="3"
              strokeDasharray="8 5"
            />
          )}
        </g>
        <circle cx={x(a)} cy={y(m.fa)} r="6" fill="var(--text)" />
        <circle cx={x(a + h)} cy={y(m.fb)} r="5" fill="var(--accent)" />
        <text x={x(a) - 12} y={y(m.fa) - 14} className="plot-label">
          A
        </text>
        <text x={x(a + h) + 10} y={y(m.fb) - 10} className="plot-label">
          B
        </text>
      </svg>
      <div className="model-results" aria-live="polite">
        <p>
          A = ({f(a)}; {f(m.fa)}) · B = ({f(a + h)}; {f(m.fb)})
        </p>
        <output className="secant-result">
          Kiriş eğimi = Δy / Δx = {f(m.fb - m.fa)} / {f(h)} ={" "}
          <strong>{f(m.secant)}</strong>
        </output>
        {s.tangent &&
          (m.tangent === null ? (
            <p className="tangent-result">
              Bu noktada türev yok: soldan eğim −1, sağdan eğim +1. Süreklilik
              tek başına yeterli değil.
            </p>
          ) : (
            <p className="tangent-result">
              Teğet eğimi f′({f(a)}) = <strong>{f(m.tangent)}</strong>. Mavi
              kesikli çizgi bu teğeti gösterir.
            </p>
          ))}
      </div>
      <p className="lab-caption">
        Kiriş mercan, eğri yeşil, teğet mavi kesikli çizgidir. h sıfır değildir;
        türev, h → 0 limitidir. Keşif adımları öğrenme puanı oluşturmaz.
      </p>
    </section>
  );
}
