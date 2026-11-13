import { useId } from "react";
import elements from "../data/elements.json";
import { useExploration } from "./useExploration";
import { useVisualCopy } from "./copy";
export default function PeriodicExplorer() {
  const v = useVisualCopy();
  const uid = useId();
  const [s, set] = useExploration("periodic", { z: 11, all: false, charge: 0 });
  const z = Math.max(1, Math.min(118, Math.round(s.z)));
  const atom = elements[z - 1];
  const charge = Math.max(-3, Math.min(3, z, Math.round(s.charge)));
  const count = z - charge;
  const choose = (n: number) =>
    set({ z: n, charge: 0, ...(n > 20 ? { all: true } : {}) });
  const list = s.all ? elements : elements.slice(0, 20);
  return (
    <section
      className="visual-lab periodic-lab"
      aria-labelledby={`${uid}-title`}
    >
      <div className="lab-heading">
        <h2 id={`${uid}-title`}>{v("periodicTitle")}</h2>
        <p>{v("periodicHelp")}</p>
      </div>
      <div className="lab-toolbar">
        <label className="field">
          {v("element")}
          <select value={z} onChange={(e) => choose(Number(e.target.value))}>
            {elements.map((e) => (
              <option key={e.z} value={e.z}>
                {e.z} · {e.symbol} · {e.tr}
              </option>
            ))}
          </select>
        </label>
        <div className="segmented">
          <button
            className={!s.all ? "active" : ""}
            aria-pressed={!s.all}
            onClick={() => {
              set({ all: false });
              if (z > 20) choose(11);
            }}
          >
            {v("first20")}
          </button>
          <button
            className={s.all ? "active" : ""}
            aria-pressed={s.all}
            onClick={() => set({ all: true })}
          >
            {v("all118")}
          </button>
        </div>
      </div>
      <div
        className={s.all ? "periodic-scroll" : "periodic-compact"}
        tabIndex={s.all ? 0 : undefined}
        role="group"
        aria-label={s.all ? v("all118") : v("first20")}
      >
        <div className={s.all ? "periodic-table" : "element-grid"}>
          {s.all && (
            <>
              {Array.from({ length: 18 }, (_, i) => (
                <span
                  className="table-group"
                  key={i}
                  style={{ gridColumn: i + 1, gridRow: 1 }}
                >
                  {i + 1}
                </span>
              ))}
              <span
                className="fblock-placeholder"
                style={{ gridColumn: 3, gridRow: 7 }}
              >
                57–71
              </span>
              <span
                className="fblock-placeholder"
                style={{ gridColumn: 3, gridRow: 8 }}
              >
                89–103
              </span>
              <span
                className="fblock-label"
                style={{ gridColumn: "1 / 3", gridRow: 10 }}
              >
                6. {v("period")}
              </span>
              <span
                className="fblock-label"
                style={{ gridColumn: "1 / 3", gridRow: 11 }}
              >
                7. {v("period")}
              </span>
            </>
          )}
          {list.map((e) => {
            const f = e.group === null;
            return (
              <button
                key={e.z}
                data-z={e.z}
                className={`element-tile ${e.z === z ? "selected" : ""} ${["Alkali metal", "Alkaline earth metal", "Transition metal", "Post-transition metal"].includes(e.family) ? "metal" : e.family === "Noble gas" ? "noble" : e.family === "Metalloid" ? "metalloid" : "nonmetal"}`}
                style={
                  s.all
                    ? {
                        gridColumn: f ? e.z - (e.z < 89 ? 54 : 86) : e.group!,
                        gridRow: f ? (e.z < 89 ? 10 : 11) : e.period + 1,
                      }
                    : undefined
                }
                aria-label={`${e.z} ${e.symbol} ${e.tr}`}
                aria-pressed={e.z === z}
                onClick={() => choose(e.z)}
              >
                <small>{e.z}</small> <strong>{e.symbol}</strong>{" "}
                {!s.all && <span>{e.tr}</span>}
              </button>
            );
          })}
        </div>
      </div>
      {s.all && <p className="lab-caption">{v("tableScroll")}</p>}
      <div className="atom-inspector">
        <div className="element-detail" aria-live="polite">
          <span className="element-symbol">{atom.symbol}</span>
          <h3>{atom.tr}</h3>
          <dl>
            <div>
              <dt>{v("atomicNumber")}</dt>
              <dd>{z}</dd>
            </div>
            <div>
              <dt>{v("group")}</dt>
              <dd>{atom.group ?? v("fblock")}</dd>
            </div>
            <div>
              <dt>{v("period")}</dt>
              <dd>{atom.period}</dd>
            </div>
          </dl>
          <label className="lab-slider">
            {v("charge")}: {charge > 0 ? "+" : ""}
            {charge}
            <input
              type="range"
              min={-3}
              max={Math.min(3, z)}
              step={1}
              value={charge}
              onChange={(e) => set({ charge: Number(e.target.value) })}
            />
          </label>
          <p className="particle-count">
            {v("electrons")}: <strong>{count}</strong> ·{" "}
            {v(charge === 0 ? "neutral" : charge > 0 ? "cation" : "anion")}
          </p>
          <p>{v("ionNote")}</p>
        </div>
        <div className="atom-diagram">
          {atom.shells ? (
            <>
              <h3>{v("shellTitle")}</h3>
              <svg
                viewBox="0 0 340 300"
                role="img"
                aria-label={`${atom.symbol}: ${atom.shells.join(", ")}; ${v("shellTitle")}`}
              >
                <circle
                  cx="170"
                  cy="150"
                  r="28"
                  fill="#d89b83"
                  stroke="#aa6c56"
                  strokeWidth="2"
                />
                <text
                  x="170"
                  y="156"
                  textAnchor="middle"
                  fill="#26211e"
                  fontSize="17"
                >
                  {z} p⁺
                </text>
                {atom.shells.map((n, i) => {
                  const r = 46 + i * 25;
                  return (
                    <g key={i}>
                      <circle
                        cx="170"
                        cy="150"
                        r={r}
                        fill="none"
                        stroke="#9aa6b6"
                        strokeWidth="1.5"
                      />
                      {Array.from({ length: n }, (_, j) => {
                        const a = (2 * Math.PI * j) / n - Math.PI / 2;
                        return (
                          <circle
                            key={j}
                            cx={170 + r * Math.cos(a)}
                            cy={150 + r * Math.sin(a)}
                            r="5.5"
                            fill="#739bbf"
                            stroke="#334e68"
                          />
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
              <p className="shell-distribution">{atom.shells.join(" · ")}</p>
              <p className="lab-caption">{v("shellNote")}</p>
            </>
          ) : (
            <p className="muted">{v("shellMissing")}</p>
          )}
        </div>
      </div>
      <p className="lab-caption">{v("visualNote")}</p>
    </section>
  );
}
