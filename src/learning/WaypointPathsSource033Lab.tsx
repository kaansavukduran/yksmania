import "./forge014Math.css";
import { useId } from "react";
import { useExploration } from "./useExploration";
import { waypointPaths033 } from "./waypointPathsSource033Model";

const defaults = { width: 4, height: 3, waypointX: 2, waypointY: 1, mode: "via" };
const number = new Intl.NumberFormat("tr-TR");

export function WaypointPathsSource033Lab() {
  const id = useId();
  const [values, set] = useExploration("waypoint-paths-source-033", defaults);
  const read = (key: "width" | "height" | "waypointX" | "waypointY", min: number, max: number) =>
    Math.min(max, Math.max(min, Number.isInteger(values[key]) ? values[key] : defaults[key]));
  const width = read("width", 1, 8);
  const height = read("height", 1, 8);
  const waypointX = read("waypointX", 0, width);
  const waypointY = read("waypointY", 0, height);
  const model = waypointPaths033({ x: width, y: height }, { x: waypointX, y: waypointY });
  const mode = values.mode === "avoiding" ? "avoiding" : "via";
  const sample = model.sampleRoute(mode);
  const xAt = (x: number) => 40 + 360 * x / width;
  const yAt = (y: number) => 304 - 264 * y / height;
  const field = (key: "width" | "height" | "waypointX" | "waypointY", value: number, min: number, max: number, title: string) => (
    <label className="field">
      {title}
      <input type="range" value={value} min={min} max={max}
        onChange={(event) => set({ [key]: Number(event.currentTarget.value) })} />
      <span aria-hidden="true">{value}</span>
    </label>
  );

  return (
    <details data-model="source033-waypoint-paths">
      <summary>Duraktan geçen ve kaçınan yolları karşılaştır</summary>
      <p>Başlangıç (0,0). Engelsiz kafeste her adım bir birim sağa veya yukarı gider.</p>
      <div className="f014m-controls">
        {field("width", width, 1, 8, "Hedefin yatay koordinatı")}
        {field("height", height, 1, 8, "Hedefin düşey koordinatı")}
        {field("waypointX", waypointX, 0, width, "Durağın yatay koordinatı")}
        {field("waypointY", waypointY, 0, height, "Durağın düşey koordinatı")}
      </div>
      <div className="f014m-result" role="status">
        <p><strong>{number.format(model.target.total)} yol.</strong> P=({waypointX},{waypointY}) durağından geçen {number.format(model.target.via)}, uğramayan {number.format(model.target.avoiding)}.</p>
        <p>Durağa {number.format(model.waypoint.total)} farklı yolla ulaşılır. Her tam yol {width} sağ, {height} yukarı adım içerir.</p>
      </div>
      <div className="lab-choice-buttons" role="group" aria-label="Örnek rota">
        <button type="button" className="secondary" aria-pressed={mode === "via"} onClick={() => set({ mode: "via" })}>Duraktan geç</button>
        <button type="button" className="secondary" aria-pressed={mode === "avoiding"} onClick={() => set({ mode: "avoiding" })}>Durağa uğrama</button>
      </div>
      <figure>
        <svg viewBox="0 0 440 350" width="100%" role="img" aria-labelledby={`${id}-route`}>
          <title id={`${id}-route`}>Başlangıç, seçili durak ve hedef arasındaki kafes</title>
          <g aria-hidden="true">
            <text x={40} y={337} fontSize={20} fill="var(--text)">Başlangıç (0,0)</text>
            <text x={400} y={28} fontSize={20} textAnchor="end" fill="var(--text)">Hedef ({width},{height})</text>
            {model.rows.map((nodes) => (
              <line key={nodes[0].y} x1={xAt(0)} x2={xAt(width)} y1={yAt(nodes[0].y)} y2={yAt(nodes[0].y)} stroke="var(--border)" strokeWidth={2} />
            ))}
            {model.rows[0].map(({ x }) => (
              <line key={x} x1={xAt(x)} x2={xAt(x)} y1={yAt(0)} y2={yAt(height)} stroke="var(--border)" strokeWidth={2} />
            ))}
            {sample && <polyline points={sample.map(({ x, y }) => `${xAt(x)},${yAt(y)}`).join(" ")}
              stroke="var(--accent)" strokeWidth={6} fill="none" />}
            <circle cx={xAt(0)} cy={yAt(0)} r={8} stroke="var(--text)" strokeWidth={2} fill="var(--panel)" />
            <circle cx={xAt(width)} cy={yAt(height)} r={8} stroke="var(--text)" strokeWidth={2} fill="var(--text)" />
            <rect x={xAt(waypointX) - 11} y={yAt(waypointY) - 11} width={22} height={22} stroke="var(--text)" strokeWidth={3} fill="none" />
          </g>
        </svg>
        <figcaption>
          Kare P durağı, dolu nokta hedeftir. {sample
            ? `Bu örnek rota ${sample.map(({ x, y }) => `(${x},${y})`).join(" → ")}.`
            : "Bu durak bütün yolların üzerindedir."}
        </figcaption>
      </figure>
    </details>
  );
}
