import { useId, useState, type ReactNode } from "react";
import {
  angleBisectors042,
  sharedTriangleSide042,
  type BisectorMode,
} from "./geometryConditions042Model";
import {
  geometry031Bounds,
  type Geometry031Point as Point,
} from "./geometryFoundation031Model";
import { useExploration } from "./useExploration";

const format = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 });
const pair = ({ x, y }: Point) => `${x},${y}`;
const boundedInteger = (value: number, min: number, max: number) =>
  Math.round(geometry031Bounds(value, min, max));

function plotWithinFrame(points: Point[]) {
  const minX = Math.min(...points.map((p) => p.x));
  const maxX = Math.max(...points.map((p) => p.x));
  const minY = Math.min(...points.map((p) => p.y));
  const maxY = Math.max(...points.map((p) => p.y));
  const scale = Math.min(270 / (maxX - minX), 180 / (maxY - minY));
  return (p: Point) => ({
    x: 180 + (p.x - (minX + maxX) / 2) * scale,
    y: 126 - (p.y - (minY + maxY) / 2) * scale,
  });
}

function Control({
  label,
  value,
  min,
  max,
  change,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  change: (n: number) => void;
}) {
  return (
    <label className="g031-range">
      <span>
        {label} <strong>{value}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(event) => change(event.currentTarget.valueAsNumber)}
      />
    </label>
  );
}

function Drawing({ title, children }: { title: string; children: ReactNode }) {
  const id = useId();
  return (
    <svg viewBox="0 0 360 252" width="100%" role="img" aria-labelledby={id}>
      <title id={id}>{title}</title>
      <g aria-hidden="true">{children}</g>
    </svg>
  );
}

function Vertex({
  point,
  label,
  offsetX = 0,
  offsetY = -11,
}: {
  point: Point;
  label: string;
  offsetX?: number;
  offsetY?: number;
}) {
  return (
    <g fill="var(--text)">
      <circle cx={point.x} cy={point.y} r={3.5} />
      <text
        x={point.x + offsetX}
        y={point.y + offsetY}
        fontSize={22}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

function arcAt(vertex: Point, first: Point, last: Point) {
  const u = { x: first.x - vertex.x, y: first.y - vertex.y };
  const v = { x: last.x - vertex.x, y: last.y - vertex.y };
  const uLength = Math.hypot(u.x, u.y);
  const vLength = Math.hypot(v.x, v.y);
  const r = Math.min(29, uLength * 0.55, vLength * 0.55);
  const start = {
    x: vertex.x + (u.x * r) / uLength,
    y: vertex.y + (u.y * r) / uLength,
  };
  const end = {
    x: vertex.x + (v.x * r) / vLength,
    y: vertex.y + (v.y * r) / vLength,
  };
  const sweep = u.x * v.y - u.y * v.x > 0 ? 1 : 0;
  return `M ${pair(start)} A ${r},${r} 0 0 ${sweep} ${pair(end)}`;
}

const bisectorOptions: Record<BisectorMode, { label: string; rule: string }> = {
  internal: { label: "B ve C iç açıortayları", rule: "90° + A/2" },
  mixed: { label: "B iç, C dış açıortayı", rule: "A/2" },
  external: { label: "B ve C dış açıortayları", rule: "90° − A/2" },
};

function Bisectors() {
  const [state, set] = useExploration("geometry-angles-source-002", {
    a: 58,
    b: 63,
    mode: "internal" as BisectorMode,
  });
  const a = boundedInteger(state.a, 24, 140);
  const b = boundedInteger(state.b, 10, 170 - a);
  const mode =
    state.mode === "mixed" || state.mode === "external"
      ? state.mode
      : "internal";
  const m = angleBisectors042(a, b, mode);
  const plot = plotWithinFrame([m.A, m.B, m.C, m.intersection]);
  const [A, B, C, X] = [m.A, m.B, m.C, m.intersection].map(plot);
  const vertex = mode === "internal" ? "I" : "X";
  const angle = format.format(m.angle);
  const formula = bisectorOptions[mode].rule;
  return (
    <>
      <div className="g031-controls">
        <Control
          label="A açısı (°)"
          value={a}
          min={24}
          max={140}
          change={(a) => set({ a, b: Math.min(b, 170 - a) })}
        />
        <Control
          label="B açısı (°)"
          value={b}
          min={10}
          max={170 - a}
          change={(b) => set({ b })}
        />
        <label className="g031-range">
          <span>Açıortay seçimi</span>
          <select
            value={mode}
            onChange={(e) =>
              set({ mode: e.currentTarget.value as BisectorMode })
            }
          >
            {Object.entries(bisectorOptions).map(([value, option]) => (
              <option key={value} value={value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p role="status" className="g031-insight">
        A {a}°, B {b}°, C {m.c}°. ∠B{vertex}C = {formula} ={" "}
        <strong>{angle}°</strong>.
      </p>
      <Drawing
        title={`ABC üçgeninde ${bisectorOptions[mode].label}. Kesişim ${vertex}, işaretli açı ${angle}°.`}
      >
        <polygon
          points={[A, B, C].map(pair).join(" ")}
          fill="none"
          stroke="var(--text)"
          strokeWidth={2}
        />
        <path
          d={`M${pair(B)} L${pair(X)} L${pair(C)}`}
          fill="none"
          stroke="var(--text)"
          strokeWidth={2.5}
          strokeDasharray="6 4"
        />
        <path
          d={arcAt(X, B, C)}
          fill="none"
          stroke="var(--text)"
          strokeWidth={3}
        />
        <Vertex point={A} label="A" />
        <Vertex point={B} label="B" offsetX={-13} offsetY={17} />
        <Vertex point={C} label="C" offsetX={13} offsetY={17} />
        <Vertex
          point={X}
          label={vertex}
          offsetX={12}
          offsetY={m.intersection.y > 0 ? -10 : 19}
        />
      </Drawing>
      <p>
        Kesikli parçalar seçilen açıortayların üzerinde. Yay, kesişimden B ve
        C’ye giden kollar arasındaki açıyı gösterir.
      </p>
    </>
  );
}

function SharedSide() {
  const [state, set] = useExploration("geometry-shared-side-source-003", {
    d: 6,
    e: 8,
    x: 9,
  });
  const d = boundedInteger(state.d, 1, 17);
  const e = boundedInteger(state.e, 1, 17);
  const x = boundedInteger(state.x, 1, 25);
  const m = sharedTriangleSide042(4, 9, d, e, x);
  const base: Point[] = [
    { x: 0, y: 0 },
    { x, y: 0 },
  ];
  const top = m.upper.shape.triangle?.C;
  const bottomPoint = m.lower.shape.triangle?.C;
  const bottom = bottomPoint && { x: bottomPoint.x, y: -bottomPoint.y };
  const plot = plotWithinFrame([
    ...base,
    ...(top ? [top] : []),
    ...(bottom ? [bottom] : []),
  ]);
  const [P, Q] = base.map(plot);
  return (
    <>
      <p>
        Üst tarafta 4 ve 9 birim sabit. Alt taraftaki iki kenarı ve ortak kenar
        x’i değiştir.
      </p>
      <div className="g031-controls">
        <Control
          label="Alt soldaki kenar"
          value={d}
          min={1}
          max={17}
          change={(d) => set({ d })}
        />
        <Control
          label="Alt sağdaki kenar"
          value={e}
          min={1}
          max={17}
          change={(e) => set({ e })}
        />
        <Control
          label="Ortak kenar x"
          value={x}
          min={1}
          max={25}
          change={(x) => set({ x })}
        />
      </div>
      <ul>
        <li>
          Üst üçgen {m.upper.min} &lt; x &lt; {m.upper.max}
        </li>
        <li>
          Alt üçgen {m.lower.min} &lt; x &lt; {m.lower.max}
        </li>
      </ul>
      <p role="status" className="g031-insight">
        {m.min < m.max ? (
          <>
            Ortak aralık {m.min} &lt; x &lt; {m.max}. {m.integerCount} tam sayı.
          </>
        ) : (
          "Ortak açık aralık yok."
        )}{" "}
        {m.both
          ? "İki üçgen de kurulabilir."
          : `x = ${x} ile iki üçgen birlikte kurulamaz.`}
      </p>
      <Drawing
        title={`Ortak taban ${x} birim. Üst üçgen ${top ? "var" : "yok"}. Alt üçgen ${bottom ? "var" : "yok"}.`}
      >
        <path
          d={`M${pair(P)} L${pair(Q)}`}
          stroke="var(--text)"
          strokeWidth={3}
        />
        {[top, bottom].map(
          (tip, index) =>
            tip && (
              <polygon
                key={index}
                points={[P, Q, plot(tip)].map(pair).join(" ")}
                fill="none"
                stroke="var(--text)"
                strokeWidth={2}
                strokeDasharray={index === 1 ? "8 4" : undefined}
              />
            ),
        )}
        <Vertex point={P} label="P" offsetX={-14} offsetY={-11} />
        <Vertex point={Q} label="Q" offsetX={14} offsetY={-11} />
      </Drawing>
      <p>
        Aralığın uçları dahil değil. Sınırda alan sıfır olur ve çizimde o üçgen
        kapanmaz.
      </p>
    </>
  );
}

export function GeometryConditions042Lab({
  kind,
}: {
  kind: "bisectors" | "shared-side";
}) {
  const [open, setOpen] = useState(false);
  const bisectors = kind === "bisectors";
  return (
    <details
      data-model={kind}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>
        {bisectors
          ? "İç ve dış açıortayları karşılaştır"
          : "İki üçgenin ortak kenarını seç"}
      </summary>
      {open && (bisectors ? <Bisectors /> : <SharedSide />)}
    </details>
  );
}
