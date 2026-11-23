import "./forge014Math.css";
import { useId } from "react";
import { useExploration } from "./useExploration";
import { pointChoices034 } from "./pointChoicesSource034Model";

const points = [
  { id: "A", x: 0, y: 0 },
  { id: "B", x: 2, y: 0 },
  { id: "C", x: 4, y: 0 },
  { id: "D", x: 6, y: 0 },
  { id: "E", x: 1, y: 2 },
  { id: "F", x: 3, y: 5 },
  { id: "G", x: 5, y: 3 },
  { id: "H", x: 7, y: 6 },
];
const defaults = { mask: 255, view: "triangle" };
const xAt = (x: number) => 49 + x * 43;
const yAt = (y: number) => 304 - y * 43;

export function PointChoicesSource034Lab() {
  const id = useId();
  const [saved, set] = useExploration("point-choices-source-034", defaults);
  const active = points.filter((_, index) => (saved.mask & (1 << index)) !== 0);
  const result = pointChoices034(active);
  const showLine = saved.view === "line";
  const firstTriangle = result.triangles[0];
  const example = showLine ? result.collinear[0] : firstTriangle?.ids;
  const shown = active.filter(({ id }) => example?.includes(id));
  const polygon = shown.map(({ x, y }) => `${xAt(x)},${yAt(y)}`).join(" ");

  return (
    <details data-model="source034-point-choices">
      <summary>Üçgen ve doğru say</summary>
      <fieldset className="lab-choices">
        <legend>Sayılacak noktalar</legend>
        <div className="f014m-set-members">
          {points.map(({ id }, index) => (
            <label key={id} className="f014m-toggle">
              <input
                type="checkbox"
                checked={(saved.mask & (1 << index)) !== 0}
                aria-label={`${id} noktasını seç`}
                onChange={() => set({ mask: saved.mask ^ (1 << index) })}
              />
              {id}
            </label>
          ))}
        </div>
      </fieldset>
      <div
        className="lab-choice-buttons"
        role="group"
        aria-label="Vurgulanan örnek"
      >
        <button
          type="button"
          className="secondary"
          aria-pressed={!showLine}
          onClick={() => set({ view: "triangle" })}
        >
          Üçgen örneği
        </button>
        <button
          type="button"
          className="secondary"
          aria-pressed={showLine}
          onClick={() => set({ view: "line" })}
        >
          Doğrusal üçlü
        </button>
      </div>
      <div className="f014m-result" role="status">
        <p>
          {active.length} nokta. {result.totalTriples} üçlüden{" "}
          {result.triangles.length} üçgen. {result.lines.length} ayrı doğru.
        </p>
        <p>Doğrusal üçlü sayısı {result.collinear.length}.</p>
      </div>
      <figure className="f040-plot">
        <div className="f014m-point-key">
          {active.map(({ id, x, y }) => (
            <span key={id}>
              {id} ({x}, {y})
            </span>
          ))}
        </div>
        <svg
          viewBox="0 0 390 354"
          width="100%"
          role="img"
          aria-labelledby={`${id}-figure`}
        >
          <title id={`${id}-figure`}>
            Seçilmiş noktaların koordinatları ve vurgulanan örnek
          </title>
          <g aria-hidden="true">
            <path
              d={`M${xAt(0)} ${yAt(6)}V${yAt(0)}H${xAt(7)}`}
              stroke="var(--border)"
              strokeWidth={2}
              fill="none"
            />
            {example &&
              (showLine ? (
                <polyline
                  points={polygon}
                  stroke="var(--accent)"
                  strokeWidth={4}
                  fill="none"
                />
              ) : (
                <polygon
                  points={polygon}
                  stroke="var(--accent)"
                  strokeWidth={3}
                  fill="var(--accent-10, transparent)"
                />
              ))}
            {active.map(({ id, x, y }) => (
              <g key={id}>
                <circle cx={xAt(x)} cy={yAt(y)} r={6} fill="var(--text)" />
                <text
                  x={xAt(x)}
                  y={y === 0 ? yAt(y) + 24 : yAt(y) - 15}
                  fill="var(--text)"
                  textAnchor="middle"
                  fontSize={22}
                >
                  {id}
                </text>
              </g>
            ))}
          </g>
        </svg>
        <figcaption>
          {example
            ? `${shown.map(({ id }) => id).join(", ")} ${showLine ? "aynı doğru üzerinde ve alan sıfır." : `üçgeninin alanı ${firstTriangle.areaTwice / 2} birimkare.`}`
            : showLine
              ? "Seçimde doğrusal üçlü yok."
              : "Seçimde üçgen yok."}
        </figcaption>
      </figure>
    </details>
  );
}
