import { useId } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import { useVisualCopy } from "./copy";
export default function GeometryExplorer() {
  const v = useVisualCopy();
  const { state } = useApp();
  const uid = useId();
  const [s, set] = useExploration("geometry", {
    base: 8,
    height: 5,
    step: 0,
    triangle: false,
  });
  const base = Math.max(4, Math.min(14, Math.round(s.base)));
  const h = Math.max(2, Math.min(9, Math.round(s.height)));
  const step = Math.max(0, Math.min(3, Math.round(s.step)));
  const unit = 23;
  const b = base * unit;
  const height = h * unit;
  const x = 60;
  const y = 65;
  const shear = 2 * unit;
  const area = (base * h) / (s.triangle ? 2 : 1);
  const baseX = !s.triangle && step >= 2 ? x + shear : x;
  return (
    <section
      className="visual-lab geometry-lab"
      aria-labelledby={`${uid}-title`}
    >
      <div className="lab-heading">
        <h2 id={`${uid}-title`}>{v("geometryTitle")}</h2>
        <p>{v("geometryHelp")}</p>
      </div>
      <div className="segmented">
        <button
          aria-pressed={!s.triangle}
          className={!s.triangle ? "active" : ""}
          onClick={() => set({ triangle: false, step: 0 })}
        >
          {v("parallelogram")}
        </button>
        <button
          aria-pressed={s.triangle}
          className={s.triangle ? "active" : ""}
          onClick={() => set({ triangle: true, step: 0 })}
        >
          {v("triangle")}
        </button>
      </div>
      <div className="geometry-controls">
        <label className="lab-slider">
          {v("base")}: {base}
          <input
            type="range"
            min={4}
            max={14}
            value={base}
            onChange={(e) => set({ base: Number(e.target.value) })}
          />
        </label>
        <label className="lab-slider">
          {v("height")}: {h}
          <input
            type="range"
            min={2}
            max={9}
            value={h}
            onChange={(e) => set({ height: Number(e.target.value) })}
          />
        </label>
      </div>
      <svg
        viewBox={`0 0 520 ${y + height + 78}`}
        className="geometry-figure"
        role="img"
        aria-label={v("geometryDiagram")}
        data-base={base}
        data-height={h}
        data-step={step}
      >
        {!s.triangle ? (
          <>
            <polygon
              points={`${x + shear},${y} ${x + shear + b},${y} ${x + b},${y + height} ${x + shear},${y + height}`}
              fill="#a8c9b0"
              stroke="#597f67"
              strokeWidth="2"
            />
            <polygon
              className="geometry-piece"
              data-piece="triangle"
              points={`${x + shear},${y} ${x},${y + height} ${x + shear},${y + height}`}
              style={{ transform: `translate(${step >= 2 ? b : 0}px, 0px)` }}
              fill="#e9b196"
              stroke={step >= 1 ? "#a26851" : "#597f67"}
              strokeWidth={step >= 1 ? 3 : 2}
            />
            {step >= 1 && (
              <line
                x1={x + shear}
                y1={y}
                x2={x + shear}
                y2={y + height}
                stroke="#a26851"
                strokeDasharray="5 4"
                strokeWidth="2"
              />
            )}
            {step === 3 && (
              <rect
                x={x + shear}
                y={y}
                width={b}
                height={height}
                fill="none"
                stroke="#395f4f"
                strokeWidth="3"
              />
            )}
          </>
        ) : (
          <>
            <polygon
              points={`${x},${y} ${x},${y + height} ${x + b},${y + height}`}
              fill="#a8c9b0"
              stroke="#597f67"
              strokeWidth="2"
            />
            <polygon
              className="geometry-piece"
              data-piece="triangle"
              points={`${x},${y} ${x + b},${y} ${x + b},${y + height}`}
              style={{
                transform:
                  step === 0
                    ? "translate(65px,-35px)"
                    : step === 1
                      ? "translate(30px,-16px)"
                      : "translate(0px,0px)",
              }}
              fill="#e9b196"
              stroke="#a26851"
              strokeWidth="2"
            />
            {step === 3 && (
              <rect
                x={x}
                y={y}
                width={b}
                height={height}
                fill="none"
                stroke="#395f4f"
                strokeWidth="3"
              />
            )}
          </>
        )}
        <line
          x1={baseX}
          y1={y + height + 24}
          x2={baseX + b}
          y2={y + height + 24}
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <text
          x={baseX + b / 2}
          y={y + height + 47}
          textAnchor="middle"
          fill="currentColor"
          fontSize="18"
        >
          b = {base}
        </text>
        <line
          x1={x + b + shear + 32}
          y1={y}
          x2={x + b + shear + 32}
          y2={y + height}
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <text
          x={x + b + shear + 44}
          y={y + height / 2}
          fill="currentColor"
          fontSize="18"
        >
          h={h}
        </text>
        <path
          d={`M${(s.triangle ? x : x + shear) + 12} ${y + height} v-12 h-12`}
          fill="none"
          stroke="#597f67"
          strokeWidth="2"
        />
      </svg>
      <p className="geometry-explanation" aria-live="polite">
        {step + 1}/4 · {v("geometry" + (s.triangle ? "T" : "P") + step)}
      </p>
      <div className="lab-actions">
        <button
          className="secondary"
          disabled={step === 0}
          onClick={() => set({ step: step - 1 })}
        >
          {v("previousStep")}
        </button>
        <button
          className="primary"
          disabled={step === 3}
          onClick={() => set({ step: step + 1 })}
        >
          {v("nextStep")}
        </button>
        <button
          className="text-button"
          onClick={() => set({ base: 8, height: 5, step: 0, triangle: false })}
        >
          {v("reset")}
        </button>
      </div>
      <output className="area-result">
        {v("area")}: {base} × {h}
        {s.triangle ? " / 2" : ""} ={" "}
        <strong>
          {new Intl.NumberFormat(state.settings.locale, {
            maximumFractionDigits: 2,
          }).format(area)}
        </strong>{" "}
        {v("squareUnits")}
      </output>
      <p className="lab-caption">{v("visualNote")}</p>
    </section>
  );
}
