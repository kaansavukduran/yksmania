import { useId, type ReactNode } from "react";
import { useApp } from "../store";
import { useVisualCopy } from "./copy";
import { useExploration } from "./useExploration";
function Frame({
  title,
  help,
  children,
}: {
  title: string;
  help?: string;
  children: ReactNode;
}) {
  const v = useVisualCopy();
  const id = useId();
  return (
    <section className="visual-lab compact-lab" aria-labelledby={id}>
      <div className="lab-heading">
        <h2 id={id}>{title}</h2>
        {help && <p>{help}</p>}
      </div>
      {children}
      <p className="lab-caption">{v("visualNote")}</p>
    </section>
  );
}
function Fractions() {
  const v = useVisualCopy();
  const { state } = useApp();
  const [s, set] = useExploration("fractions", {
    numerator: 1,
    denominator: 4,
    negative: false,
  });
  const d = Math.max(1, Math.min(12, Math.round(s.denominator)));
  const n = Math.max(0, Math.min(d, Math.round(s.numerator)));
  const value = ((s.negative ? -1 : 1) * n) / d;
  return (
    <Frame title={v("fractionsTitle")} help={v("fractionHelp")}>
      <div className="geometry-controls">
        <label className="lab-slider">
          {v("numerator")}: {n}
          <input
            type="range"
            min={0}
            max={d}
            value={n}
            onChange={(e) => set({ numerator: Number(e.target.value) })}
          />
        </label>
        <label className="lab-slider">
          {v("denominator")}: {d}
          <input
            type="range"
            min={1}
            max={12}
            value={d}
            onChange={(e) =>
              set({
                denominator: Number(e.target.value),
                numerator: Math.min(n, Number(e.target.value)),
              })
            }
          />
        </label>
        <label className="lab-check">
          <input
            type="checkbox"
            checked={s.negative}
            onChange={(e) => set({ negative: e.target.checked })}
          />
          {v("negative")}
        </label>
      </div>
      <svg
        viewBox="0 0 560 225"
        role="img"
        aria-label={`${s.negative ? "−" : ""}${n}/${d}`}
      >
        <rect x="60" y="26" width="440" height="65" rx="4" fill="#dae2dd" />
        {Array.from({ length: d }, (_, i) => (
          <rect
            key={i}
            x={60 + (i * 440) / d}
            y="26"
            width={440 / d}
            height="65"
            fill={i < n ? "#a5c7ab" : "transparent"}
            stroke="#597f67"
            strokeWidth="1.5"
          />
        ))}
        <line
          x1="45"
          y1="164"
          x2="515"
          y2="164"
          stroke="currentColor"
          strokeWidth="2"
        />
        {[-1, -0.5, 0, 0.5, 1].map((t) => (
          <g key={t}>
            <line
              x1={280 + t * 220}
              y1="155"
              x2={280 + t * 220}
              y2="173"
              stroke="currentColor"
            />
            <text
              x={280 + t * 220}
              y="196"
              textAnchor="middle"
              fill="currentColor"
              fontSize="17"
            >
              {new Intl.NumberFormat("tr-TR").format(t)}
            </text>
          </g>
        ))}
        <circle
          className="vector-dot"
          cx={280 + value * 220}
          cy="164"
          r="9"
          fill="#d28d73"
          stroke="#7f503e"
          strokeWidth="2"
        />
      </svg>
      <output className="area-result">
        {s.negative ? "−" : ""}
        {n}/{d} ={" "}
        {new Intl.NumberFormat(state.settings.locale, {
          maximumFractionDigits: 3,
        }).format(value)}
      </output>
    </Frame>
  );
}
function Factors() {
  const v = useVisualCopy();
  const [s, set] = useExploration("factors", { x: 4, a: 2, b: 3 });
  const x = Math.max(2, Math.min(8, Math.round(s.x))),
    a = Math.max(1, Math.min(5, Math.round(s.a))),
    b = Math.max(1, Math.min(5, Math.round(s.b)));
  const u = 21;
  const cells = [
    {
      x: 60,
      y: 40,
      w: x * u,
      h: x * u,
      fill: "#a5c7ab",
      label: `x² = ${x * x}`,
    },
    {
      x: 60 + x * u,
      y: 40,
      w: a * u,
      h: x * u,
      fill: "#a8c9dd",
      label: `ax=${a * x}`,
    },
    {
      x: 60,
      y: 40 + x * u,
      w: x * u,
      h: b * u,
      fill: "#e4c090",
      label: `bx=${b * x}`,
    },
    {
      x: 60 + x * u,
      y: 40 + x * u,
      w: a * u,
      h: b * u,
      fill: "#d6b4cd",
      label: `ab=${a * b}`,
    },
  ];
  return (
    <Frame title={v("factorTitle")} help={v("factorHelp")}>
      <div className="geometry-controls">
        {(["x", "a", "b"] as const).map((k) => (
          <label className="lab-slider" key={k}>
            {k} = {{ x, a, b }[k]}
            <input
              type="range"
              min={k === "x" ? 2 : 1}
              max={k === "x" ? 8 : 5}
              value={{ x, a, b }[k]}
              onChange={(e) => set({ [k]: Number(e.target.value) })}
            />
          </label>
        ))}
      </div>
      <svg
        viewBox="0 0 430 355"
        role="img"
        aria-label={`(x+a)(x+b) = x² + ax + bx + ab`}
      >
        {cells.map((c, i) => (
          <g key={i}>
            <rect
              x={c.x}
              y={c.y}
              width={c.w}
              height={c.h}
              fill={c.fill}
              stroke="#61766b"
              strokeWidth="2"
            />
            {c.w > 55 && c.h > 38 && (
              <text
                x={c.x + c.w / 2}
                y={c.y + c.h / 2 + 5}
                textAnchor="middle"
                fontSize="15"
                fill="#25332d"
              >
                {c.label}
              </text>
            )}
          </g>
        ))}
        <text
          x={60 + ((x + a) * u) / 2}
          y={65 + (x + b) * u}
          textAnchor="middle"
          fill="currentColor"
          fontSize="18"
        >
          x + a = {x + a}
        </text>
        <text x="5" y="24" fill="currentColor" fontSize="17">
          x + b = {x + b}
        </text>
      </svg>
      <output className="area-result">
        ({x}+{a}) × ({x}+{b}) = {x * x} + {a * x} + {b * x} + {a * b} ={" "}
        <strong>{(x + a) * (x + b)}</strong>
      </output>
    </Frame>
  );
}
function Forces() {
  const v = useVisualCopy();
  const { state } = useApp();
  const uid = useId();
  const [s, set] = useExploration("forces", { left: 4, right: 12, mass: 2 });
  const left = Math.max(0, Math.min(20, Math.round(s.left))),
    right = Math.max(0, Math.min(20, Math.round(s.right))),
    mass = Math.max(1, Math.min(10, Math.round(s.mass)));
  const net = right - left;
  return (
    <Frame title={v("forceTitle")}>
      <div className="geometry-controls">
        {(
          [
            {
              key: "left",
              label: "leftForce",
              value: left,
              max: 20,
              min: 0,
              unit: "N",
            },
            {
              key: "right",
              label: "rightForce",
              value: right,
              max: 20,
              min: 0,
              unit: "N",
            },
            {
              key: "mass",
              label: "mass",
              value: mass,
              max: 10,
              min: 1,
              unit: "kg",
            },
          ] as const
        ).map((c) => (
          <label className="lab-slider" key={c.key}>
            {v(c.label)}: {c.value} {c.unit}
            <input
              type="range"
              min={c.min}
              max={c.max}
              value={c.value}
              onChange={(e) => set({ [c.key]: Number(e.target.value) })}
            />
          </label>
        ))}
      </div>
      <svg
        viewBox="0 0 560 240"
        role="img"
        aria-label={`${v("netForce")}: ${net} N`}
      >
        <defs>
          <marker
            id={`${uid}-arrow`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0 0L0 6L7 3Z" fill="currentColor" />
          </marker>
        </defs>
        <rect
          x="235"
          y="75"
          width="90"
          height="90"
          rx="8"
          fill="#c3d6ca"
          stroke="#597f67"
          strokeWidth="2"
        />
        <text x="280" y="126" textAnchor="middle" fill="#25332d" fontSize="20">
          {mass} kg
        </text>
        {left > 0 && (
          <line
            className="force-arrow"
            x1="235"
            y1="100"
            x2={225 - left * 8}
            y2="100"
            stroke="#c68f7d"
            strokeWidth="5"
            markerEnd={`url(#${uid}-arrow)`}
          />
        )}{" "}
        {right > 0 && (
          <line
            className="force-arrow"
            x1="325"
            y1="140"
            x2={335 + right * 8}
            y2="140"
            stroke="#7da69b"
            strokeWidth="5"
            markerEnd={`url(#${uid}-arrow)`}
          />
        )}
        <text
          x="170"
          y="70"
          textAnchor="middle"
          fill="currentColor"
          fontSize="19"
        >
          ← {left} N
        </text>
        <text
          x="390"
          y="190"
          textAnchor="middle"
          fill="currentColor"
          fontSize="19"
        >
          {right} N →
        </text>
      </svg>
      <output className="area-result">
        {v("netForce")}: {right} − {left} = {net} N · {v("acceleration")}:{" "}
        {new Intl.NumberFormat(state.settings.locale, {
          maximumFractionDigits: 2,
        }).format(net / mass)}{" "}
        m/s²
      </output>
      <p className="lab-caption">{v("forceNote")}</p>
    </Frame>
  );
}
function Moles() {
  const v = useVisualCopy();
  const { state } = useApp();
  const [s, set] = useExploration("moles", { co2: false, n: 2 });
  const n = Math.max(1, Math.min(10, Math.round(s.n)));
  const m = s.co2 ? 44 : 18;
  return (
    <Frame title={v("moleTitle")}>
      <div className="segmented" aria-label={v("substance")}>
        <button
          className={!s.co2 ? "active" : ""}
          aria-pressed={!s.co2}
          onClick={() => set({ co2: false })}
        >
          H₂O
        </button>
        <button
          className={s.co2 ? "active" : ""}
          aria-pressed={s.co2}
          onClick={() => set({ co2: true })}
        >
          CO₂
        </button>
      </div>
      <label className="lab-slider">
        {v("mass")}: {n * m} g
        <input
          type="range"
          min={m}
          max={10 * m}
          step={m}
          value={n * m}
          onChange={(e) => set({ n: Number(e.target.value) / m })}
        />
      </label>
      <svg viewBox="0 0 500 240" role="img" aria-label={s.co2 ? "CO₂" : "H₂O"}>
        {s.co2 ? (
          <>
            <line
              x1="130"
              y1="120"
              x2="370"
              y2="120"
              stroke="#9aa6b6"
              strokeWidth="8"
            />
            {[
              [130, "O", "#d5a392"],
              [250, "C", "#929da4"],
              [370, "O", "#d5a392"],
            ].map(([x, label, fill]) => (
              <g key={String(x)}>
                <circle
                  cx={Number(x)}
                  cy="120"
                  r="40"
                  fill={String(fill)}
                  stroke="#66756e"
                  strokeWidth="2"
                />
                <text
                  x={Number(x)}
                  y="128"
                  textAnchor="middle"
                  fill="#25332d"
                  fontSize="24"
                >
                  {label}
                </text>
              </g>
            ))}
          </>
        ) : (
          <>
            <path
              d="M170 160L250 85L330 160"
              fill="none"
              stroke="#9aa6b6"
              strokeWidth="8"
            />
            <circle
              cx="250"
              cy="85"
              r="43"
              fill="#d5a392"
              stroke="#a26851"
              strokeWidth="2"
            />
            <text
              x="250"
              y="94"
              textAnchor="middle"
              fill="#25332d"
              fontSize="24"
            >
              O
            </text>
            {[170, 330].map((x) => (
              <g key={x}>
                <circle
                  cx={x}
                  cy="160"
                  r="30"
                  fill="#c4dcce"
                  stroke="#597f67"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y="168"
                  textAnchor="middle"
                  fill="#25332d"
                  fontSize="24"
                >
                  H
                </text>
              </g>
            ))}
          </>
        )}
      </svg>
      <output className="area-result">
        n = {n * m}/{m} = <strong>{n} mol</strong>
        <br />N ≈{" "}
        {new Intl.NumberFormat(state.settings.locale, {
          maximumFractionDigits: 2,
        }).format(n * 6.02)}{" "}
        × 10²³
      </output>
      <p>{v("moleNote")}</p>
    </Frame>
  );
}
function ATP() {
  const v = useVisualCopy();
  const [s, set] = useExploration("atp-cycle", { synthesis: true });
  return (
    <Frame title={v("atpTitle")}>
      <div className="segmented">
        <button
          className={s.synthesis ? "active" : ""}
          aria-pressed={s.synthesis}
          onClick={() => set({ synthesis: true })}
        >
          {v("phosphorylation")}
        </button>
        <button
          className={!s.synthesis ? "active" : ""}
          aria-pressed={!s.synthesis}
          onClick={() => set({ synthesis: false })}
        >
          {v("hydrolysis")}
        </button>
      </div>
      <svg
        viewBox="0 0 540 230"
        role="img"
        aria-label={v(s.synthesis ? "atpSynthesis" : "atpHydrolysis")}
      >
        <rect
          x="35"
          y="80"
          width="160"
          height="70"
          rx="20"
          fill="#b4c6dd"
          stroke="#6c83a0"
          strokeWidth="2"
        />
        <text x="115" y="121" textAnchor="middle" fontSize="18" fill="#25332d">
          {v("adenosine")}
        </text>
        <line
          x1="195"
          y1="115"
          x2="335"
          y2="115"
          stroke="#9aa6b6"
          strokeWidth="6"
        />
        {[230, 290].map((x) => (
          <g key={x}>
            <circle
              cx={x}
              cy="115"
              r="25"
              fill="#d8c098"
              stroke="#9c8054"
              strokeWidth="2"
            />
            <text
              x={x}
              y="122"
              textAnchor="middle"
              fontSize="19"
              fill="#25332d"
            >
              P
            </text>
          </g>
        ))}
        <line
          className="phosphate-bond"
          x1="315"
          y1="115"
          x2="355"
          y2="115"
          stroke="#9c8054"
          strokeWidth="5"
          opacity={s.synthesis ? 1 : 0}
        />
        <g
          className="phosphate"
          style={{ transform: `translate(${s.synthesis ? 0 : 100}px,0px)` }}
        >
          <circle
            cx="355"
            cy="115"
            r="25"
            fill="#d8c098"
            stroke="#9c8054"
            strokeWidth="2"
          />
          <text
            x="355"
            y="122"
            textAnchor="middle"
            fontSize="19"
            fill="#25332d"
          >
            P
          </text>
        </g>
      </svg>
      <p className="route-explanation" aria-live="polite">
        {v(s.synthesis ? "atpSynthesis" : "atpHydrolysis")}
      </p>
      <p className="lab-caption">
        {v("atpNote")} {v("phosphateNote")}
      </p>
    </Frame>
  );
}
function Paragraph() {
  const v = useVisualCopy();
  const [s, set] = useExploration("paragraph-structure", { selected: 2 });
  const selected = Math.max(0, Math.min(2, Math.round(s.selected)));
  return (
    <Frame title={v("paragraphTitle")} help={v("paragraphHelp")}>
      <div className="paragraph-explorer">
        {[0, 1, 2].map((i) => (
          <button
            className={selected === i ? "selected" : ""}
            aria-pressed={selected === i}
            key={i}
            onClick={() => set({ selected: i })}
          >
            {v("sentence" + i)}
          </button>
        ))}
      </div>
      <p className="route-explanation" aria-live="polite">
        {v("sentenceRole" + selected)}
      </p>
    </Frame>
  );
}
const explorers: Record<string, () => ReactNode> = {
  "rasyonel-sayilar": Fractions,
  "carpanlara-ayirma": Factors,
  newton: Forces,
  mol: Moles,
  "atp-metabolizma": ATP,
  paragraf: Paragraph,
};
export default function CompactExplorer({ id }: { id: string }) {
  const Explorer = explorers[id];
  return Explorer ? <Explorer /> : null;
}
