import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
} from "react";
import { useExploration } from "./useExploration";
import {
  geometry031Angles,
  geometry031Bounds,
  geometry031Centers,
  geometry031FromSides,
  geometry031Right,
  geometry031Similarity,
  geometry031Triangle,
  type Geometry031Point,
} from "./geometryFoundation031Model";
import "./geometryFoundation031.css";

export const geometryFoundation031Ids = [
  "tyt-geo-temel-acilar-031",
  "tyt-geo-ucgende-acilar-031",
  "tyt-geo-ucgen-esitsizligi-031",
  "tyt-geo-dik-ucgen-031",
  "tyt-geo-eslik-benzerlik-031",
  "tyt-geo-ucgen-merkezleri-031",
] as const;
const fmt = (n: number, digits = 1) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(n) < 1e-10 ? 0 : n,
  );
const points = (ps: Geometry031Point[]) =>
  ps.map((p) => `${p.x},${p.y}`).join(" ");
type Plot = (p: Geometry031Point) => Geometry031Point;
const trianglePlot: Plot = (p) => ({ x: 150 + p.x * 30, y: 370 - p.y * 30 });
function Line({
  a,
  b,
  kind = "",
  ...rest
}: {
  a: Geometry031Point;
  b: Geometry031Point;
  kind?: string;
  "data-testid"?: string;
}) {
  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      className={`g031-line ${kind}`}
      {...rest}
    />
  );
}
function Dot({
  p,
  name,
  dx = 0,
  dy = -22,
  kind = "",
}: {
  p: Geometry031Point;
  name: string;
  dx?: number;
  dy?: number;
  kind?: string;
}) {
  return (
    <g className={`g031-dot ${kind}`}>
      <circle cx={p.x} cy={p.y} r={5} />
      <text x={p.x + dx} y={p.y + dy} textAnchor="middle">
        {name}
      </text>
    </g>
  );
}
function RightMark({
  vertex,
  along,
  to,
}: {
  vertex: Geometry031Point;
  along: Geometry031Point;
  to: Geometry031Point;
}) {
  const length = (p: Geometry031Point) =>
    Math.hypot(p.x - vertex.x, p.y - vertex.y);
  const a = length(along),
    b = length(to);
  if (a < 1e-9 || b < 1e-9) return null;
  const size = 13;
  const u = {
    x: ((along.x - vertex.x) / a) * size,
    y: ((along.y - vertex.y) / a) * size,
  };
  const v = {
    x: ((to.x - vertex.x) / b) * size,
    y: ((to.y - vertex.y) / b) * size,
  };
  return (
    <polyline
      points={points([
        { x: vertex.x + u.x, y: vertex.y + u.y },
        { x: vertex.x + u.x + v.x, y: vertex.y + u.y + v.y },
        { x: vertex.x + v.x, y: vertex.y + v.y },
      ])}
      className="g031-right-mark"
    />
  );
}
function Figure({
  label,
  children,
  height = 430,
  svgRef,
}: {
  label: string;
  children: ReactNode;
  height?: number;
  svgRef?: React.RefObject<SVGSVGElement | null>;
}) {
  const localRef = useRef<SVGSVGElement>(null);
  const ref = svgRef ?? localRef;
  const [width, setWidth] = useState(640);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const read = () => setWidth(node.getBoundingClientRect().width || 640);
    read();
    const observer = new ResizeObserver(read);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  const font = Math.min(64, Math.max(21, (15 * 640) / Math.max(150, width)));
  return (
    <svg
      ref={ref}
      viewBox={`0 0 640 ${height}`}
      className="g031-figure"
      role="img"
      aria-label={label}
      style={
        {
          "--g031-svg-font": `${font}px`,
          "--g031-hit-radius": `${Math.max(25, (22 * 640) / Math.max(1, width))}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </svg>
  );
}
function Range({
  label,
  value,
  min,
  max,
  change,
  step = 1,
  unit = "birim",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  change: (v: number) => void;
  step?: number;
  unit?: string;
}) {
  const id = useId();
  return (
    <label className="g031-range" htmlFor={id}>
      <span>
        {label}{" "}
        <output htmlFor={id}>
          {fmt(value, 2)}
          {unit === "°" ? "°" : ` ${unit}`}
        </output>
      </span>
      <input
        id={id}
        type="range"
        aria-label={label}
        aria-valuetext={`${fmt(value, 2)} ${unit === "°" ? "derece" : unit}`}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => change(Number(e.target.value))}
      />
    </label>
  );
}
function Steps({
  step,
  labels,
  change,
}: {
  step: number;
  labels: string[];
  change: (n: number) => void;
}) {
  return (
    <div className="g031-steps">
      <p role="status">
        {step + 1}/{labels.length} · {labels[step]}
      </p>
      <div>
        <button
          type="button"
          className="secondary"
          disabled={step === 0}
          onClick={() => change(step - 1)}
        >
          Önceki adım
        </button>
        <button
          type="button"
          className="secondary"
          disabled={step === labels.length - 1}
          onClick={() => change(step + 1)}
        >
          Sonraki adım
        </button>
      </div>
    </div>
  );
}
function Evidence({ items }: { items: [string, string][] }) {
  return (
    <dl className="g031-evidence">
      {items.map(([term, value]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
function Lab({
  title,
  children,
  help,
}: {
  title: string;
  children: ReactNode;
  help: string;
}) {
  const id = useId();
  return (
    <section className="visual-lab g031-lab" aria-labelledby={`${id}-title`}>
      <div className="lab-heading">
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{help}</p>
      </div>
      {children}
      <p className="g031-footnote">
        Şekli değiştirmek öğrenme puanı veya tamamlanma kaydı oluşturmaz.
        Seçimlerin bu cihazda saklanır.
      </p>
    </section>
  );
}
function arc(
  center: Geometry031Point,
  radius: number,
  start: number,
  end: number,
) {
  const p = (degree: number) => ({
    x: center.x + radius * Math.cos((degree * Math.PI) / 180),
    y: center.y - radius * Math.sin((degree * Math.PI) / 180),
  });
  const a = p(start),
    b = p(end);
  return `M${center.x} ${center.y} L${a.x} ${a.y} A${radius} ${radius} 0 ${end - start > 180 ? 1 : 0} 0 ${b.x} ${b.y} Z`;
}
function vertexSector(
  center: Geometry031Point,
  p: Geometry031Point,
  q: Geometry031Point,
  radius: number,
) {
  let start = Math.atan2(p.y - center.y, p.x - center.x);
  const finish = Math.atan2(q.y - center.y, q.x - center.x);
  let delta = (finish - start + Math.PI * 2) % (Math.PI * 2);
  if (delta > Math.PI) {
    start = finish;
    delta = Math.PI * 2 - delta;
  }
  const a = {
    x: center.x + radius * Math.cos(start),
    y: center.y + radius * Math.sin(start),
  };
  const b = {
    x: center.x + radius * Math.cos(start + delta),
    y: center.y + radius * Math.sin(start + delta),
  };
  return `M${center.x} ${center.y} L${a.x} ${a.y} A${radius} ${radius} 0 0 1 ${b.x} ${b.y} Z`;
}
function Angles() {
  const [s, set] = useExploration("g031:angles", {
    theta: 55,
    parallel: false,
  });
  const m = geometry031Angles(s.theta);
  const t = (m.theta * Math.PI) / 180;
  const center = { x: 320, y: s.parallel ? 145 : 215 };
  const direction = { x: Math.cos(t), y: -Math.sin(t) };
  // The transversal remains in the figure even near its 20°/160° limits.
  // When parallel lines are selected, use a fitted slope and a wider vertical gap only when room allows.
  const gap = s.parallel ? Math.min(120, 115 * Math.abs(Math.tan(t))) : 0;
  const lower = { x: center.x - gap / Math.tan(t), y: center.y + gap };
  // Exact endpoints on the same line, including obtuse angles.
  const upperLength = s.parallel ? 100 : 165;
  const e1 = {
    x: center.x + upperLength * direction.x,
    y: center.y + upperLength * direction.y,
  };
  const e2 = { x: lower.x - 125 * direction.x, y: lower.y - 125 * direction.y };
  return (
    <Lab
      title="Açıların ilişkisini gör"
      help="Açıyı değiştir. Ters açılar eşit kalır; komşu bütünler açılar her zaman 180° eder. Paralel doğruları açınca yöndeş açıları karşılaştır."
    >
      <div className="g031-controls">
        <Range
          label="Turuncu açı"
          value={m.theta}
          min={20}
          max={160}
          unit="°"
          change={(theta) => set({ theta })}
        />
        <label className="g031-check">
          <input
            type="checkbox"
            checked={s.parallel}
            onChange={(e) => set({ parallel: e.target.checked })}
          />
          Paralel doğruları göster
        </label>
      </div>
      <Figure
        label={`Kesişen doğrularda turuncu açı ${fmt(m.theta)} derece, komşu açı ${fmt(m.adjacent)} derece. ${s.parallel ? "Yöndeş açı aynı ölçüde." : "Karşılıklı ters açı aynı ölçüde."}`}
      >
        <Line a={{ x: 65, y: center.y }} b={{ x: 575, y: center.y }} />
        {s.parallel && (
          <Line a={{ x: 65, y: lower.y }} b={{ x: 575, y: lower.y }} />
        )}
        <Line a={e1} b={e2} />
        <path
          d={arc(center, 50, 0, m.theta)}
          className="g031-sector g031-first"
        />
        <path
          d={arc(center, 42, m.theta, 180)}
          className="g031-sector g031-second"
        />
        {!s.parallel && (
          <path
            d={arc(center, 50, 180, 180 + m.theta)}
            className="g031-sector g031-first"
          />
        )}
        {s.parallel && (
          <path
            d={arc(lower, 40, 0, m.theta)}
            className="g031-sector g031-first"
          />
        )}
        <text x="555" y={center.y - 21}>
          d
        </text>
        {s.parallel && (
          <text x="555" y={lower.y + 37}>
            e
          </text>
        )}
        <text x="320" y="390" textAnchor="middle">
          {s.parallel ? "d ∥ e" : "İki doğru, dört açı"}
        </text>
      </Figure>
      <Evidence
        items={[
          [
            "Turuncu açı ve ters açısı",
            `${fmt(m.theta)}° = ${fmt(m.vertical)}°`,
          ],
          [
            "Komşu bütünler açı",
            `${fmt(m.theta)}° + ${fmt(m.adjacent)}° = 180°`,
          ],
          ...(s.parallel
            ? [
                [
                  "Yöndeş açı",
                  `${fmt(m.corresponding)}° · d ∥ e koşuluyla`,
                ] as [string, string],
              ]
            : []),
        ]}
      />
      <p className="g031-insight">
        {s.parallel
          ? "Aynı turuncu bölgeyi iki kesişimde aynı yönde bul. Bu eşitlik için d ve e doğruları paralel olmalı; yalnız şekle bakarak paralellik varsayma."
          : "Turuncu iki bölge karşı karşıyadır. Yeşil bölgeyle yan yana gelince bir doğru açı oluşturur; eşitlik ve 180° toplamı farklı ilişkilerdir."}
      </p>
    </Lab>
  );
}
function TriangleAngles() {
  const [s, set] = useExploration("g031:triangle-angles", {
    x: 3.5,
    y: 6,
    step: 0,
  });
  const saved = {
    x: geometry031Bounds(s.x, -2, 12),
    y: geometry031Bounds(s.y, 2, 9),
  };
  const [moving, setMoving] = useState(saved);
  const dragging = useRef<number | null>(null);
  const pointRef = useRef(moving);
  const svg = useRef<SVGSVGElement>(null);
  const step = Math.round(geometry031Bounds(s.step, 0, 2));
  useEffect(() => {
    if (dragging.current === null) {
      const next = {
        x: geometry031Bounds(s.x, -2, 12),
        y: geometry031Bounds(s.y, 2, 9),
      };
      pointRef.current = next;
      setMoving(next);
    }
  }, [s.x, s.y]);
  const change = (p: Geometry031Point, persist: boolean) => {
    const next = {
      x: Math.round(geometry031Bounds(p.x, -2, 12) * 10) / 10,
      y: Math.round(geometry031Bounds(p.y, 2, 9) * 10) / 10,
    };
    pointRef.current = next;
    setMoving(next);
    if (persist) set(next);
  };
  const pointerPosition = (e: PointerEvent<SVGCircleElement>) => {
    const element = svg.current,
      matrix = element?.getScreenCTM();
    if (!element || !matrix) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(
      matrix.inverse(),
    );
    change({ x: (p.x - 150) / 30, y: (370 - p.y) / 30 }, false);
  };
  const finish = (e: PointerEvent<SVGCircleElement>, cancel = false) => {
    if (dragging.current !== e.pointerId) return;
    dragging.current = null;
    if (cancel) change(saved, false);
    else set(pointRef.current);
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
  };
  const m = geometry031Triangle({ x: 0, y: 0 }, { x: 10, y: 0 }, moving);
  const a = m.angles!;
  const angleRadius = Math.min(38, Math.min(m.a, m.b, m.c) * 30 * 0.35);
  const A = trianglePlot(m.A),
    B = trianglePlot(m.B),
    C = trianglePlot(m.C);
  return (
    <Lab
      title="Üçgeni değiştir, açı toplamını keşfet"
      help="C köşesindeki halkayı parmağınla veya fareyle sürükle. Klavye için alttaki iki sürgüyü kullan. Şekil değişir; iç açıların toplamı değişmez."
    >
      <div className="g031-controls">
        <Range
          label="C köşesinin yatay konumu"
          value={moving.x}
          min={-2}
          max={12}
          step={0.1}
          change={(x) => change({ ...moving, x }, true)}
        />
        <Range
          label="C köşesinin yüksekliği"
          value={moving.y}
          min={2}
          max={9}
          step={0.1}
          change={(y) => change({ ...moving, y }, true)}
        />
      </div>
      <Figure
        svgRef={svg}
        height={570}
        label={`ABC üçgeni. A açısı ${fmt(a.A)} derece, B açısı ${fmt(a.B)} derece, C açısı ${fmt(a.C)} derece; toplam 180 derece.`}
      >
        <polygon points={points([A, B, C])} className="g031-triangle" />
        <path
          d={vertexSector(A, B, C, angleRadius)}
          className="g031-sector g031-first"
        />
        <path
          d={vertexSector(B, C, A, angleRadius)}
          className="g031-sector g031-second"
        />
        <path
          d={vertexSector(C, A, B, angleRadius)}
          className="g031-sector g031-third"
        />
        {step === 1 && (
          <Line
            a={{ x: 55, y: C.y }}
            b={{ x: 585, y: C.y }}
            kind="g031-helper"
          />
        )}
        <Dot p={A} name="A" dy={60} kind="g031-angle-a" />
        <Dot p={B} name="B" dy={60} kind="g031-angle-b" />
        <Dot p={C} name="C" dy={-24} kind="g031-angle-c" />
        <circle
          cx={C.x}
          cy={C.y}
          r={22}
          className="g031-drag-ring"
          aria-hidden="true"
        />
        <circle
          cx={C.x}
          cy={C.y}
          r={25}
          className="g031-drag-handle"
          data-testid="g031-drag-vertex"
          aria-hidden="true"
          onPointerDown={(e) => {
            if (!e.isPrimary || (e.pointerType === "mouse" && e.button !== 0))
              return;
            dragging.current = e.pointerId;
            e.currentTarget.setPointerCapture(e.pointerId);
            e.preventDefault();
          }}
          onPointerMove={(e) => {
            if (dragging.current === e.pointerId) pointerPosition(e);
          }}
          onPointerUp={(e) => finish(e)}
          onPointerCancel={(e) => finish(e, true)}
          onLostPointerCapture={(e) => {
            if (dragging.current === e.pointerId) finish(e);
          }}
        />
        {step === 2 && (
          <g className="g031-reveal">
            <Line a={{ x: 190, y: 520 }} b={{ x: 450, y: 520 }} />
            <path
              d={arc({ x: 320, y: 520 }, 70, 0, a.A)}
              className="g031-sector g031-first"
            />
            <path
              d={arc({ x: 320, y: 520 }, 70, a.A, a.A + a.B)}
              className="g031-sector g031-second"
            />
            <path
              d={arc({ x: 320, y: 520 }, 70, a.A + a.B, 180)}
              className="g031-sector g031-third"
            />
          </g>
        )}
      </Figure>
      <Evidence
        items={[
          ["A açısı", `${fmt(a.A)}°`],
          ["B açısı", `${fmt(a.B)}°`],
          ["C açısı", `${fmt(a.C)}°`],
          ["İç açılar toplamı", "180° · Yuvarlanmamış değerlerle"],
        ]}
      />
      <Steps
        step={step}
        labels={[
          "Köşeyi taşı, üç farklı açıyı gözle.",
          "C'den AB'ye paralel doğru geçer; iç ters açılarla A ve B'yi C'ye taşıyabilirsin.",
          "Açı ölçülerini yönlerini değiştirerek yan yana taşı: birlikte doğru açı oluştururlar.",
        ]}
        change={(step) => set({ step })}
      />
      <p className="g031-insight">
        C tabanın dışına taşındığında geniş açılı üçgen de oluşabilir.
        Yuvarlanan açı etiketlerinin toplamı bazen 179,9° veya 180,1°
        görünebilir; model toplamı tam olarak 180°'dir.
      </p>
    </Lab>
  );
}
function Inequality() {
  const [s, set] = useExploration("g031:inequality", { a: 5, b: 7, c: 9 });
  const a = Math.round(geometry031Bounds(s.a, 1, 12)),
    b = Math.round(geometry031Bounds(s.b, 1, 12)),
    c = Math.round(geometry031Bounds(s.c, 1, 20));
  const m = geometry031FromSides(a, b, c);
  // Fits all permitted side lengths without claiming a constructed C when impossible.
  const finiteTriangle = m.kind === "valid" ? m.triangle : null;
  const armA = { x: b * 0.65, y: b * Math.sqrt(1 - 0.65 ** 2) };
  const armB = { x: c - a * 0.65, y: a * Math.sqrt(1 - 0.65 ** 2) };
  const extent = [
    { x: 0, y: 0 },
    { x: c, y: 0 },
    ...(finiteTriangle
      ? [finiteTriangle.C]
      : m.kind === "degenerate"
        ? [m.collinear!]
        : [armA, armB]),
  ];
  const minX = Math.min(...extent.map((p) => p.x)),
    maxX = Math.max(...extent.map((p) => p.x));
  const maxY = Math.max(1, ...extent.map((p) => p.y));
  const scale = Math.min(440 / (maxX - minX), 240 / maxY, 40);
  const baseX = (640 - (maxX - minX) * scale) / 2 - minX * scale,
    baseY = 300;
  const plot: Plot = (p) => ({
    x: baseX + p.x * scale,
    y: baseY - p.y * scale,
  });
  const A = plot({ x: 0, y: 0 }),
    B = plot({ x: c, y: 0 });
  const C = finiteTriangle ? plot(finiteTriangle.C) : null;
  return (
    <Lab
      title="Üç kenar gerçekten üçgen yapar mı?"
      help="a = BC, b = CA ve c = AB uzunluklarını değiştir. Eşitlikte üç nokta aynı doğruya gelir; eşitsizlik sağlanmazsa üçgen çizilmez."
    >
      <div className="g031-controls">
        <Range
          label="a = BC"
          value={a}
          min={1}
          max={12}
          change={(a) => set({ a })}
        />
        <Range
          label="b = CA"
          value={b}
          min={1}
          max={12}
          change={(b) => set({ b })}
        />
        <Range
          label="c = AB"
          value={c}
          min={1}
          max={20}
          change={(c) => set({ c })}
        />
      </div>
      <Figure
        label={`a ${a}, b ${b}, c ${c} birim. ${m.kind === "valid" ? "Üçgen çizilebilir." : m.kind === "degenerate" ? "Noktalar doğrusal; üçgen oluşmaz." : "Kenarlar bir üçgen oluşturamaz."}`}
      >
        <Line a={A} b={B} />
        {C && (
          <>
            <polygon points={points([A, B, C])} className="g031-triangle" />
            <Dot p={C} name="C" />
          </>
        )}
        {m.kind === "degenerate" && (
          <>
            <Line a={A} b={plot(m.collinear!)} kind="g031-first-line" />
            <Line a={B} b={plot(m.collinear!)} kind="g031-second-line" />
            <Dot p={plot(m.collinear!)} name="C" />
          </>
        )}
        {m.kind === "impossible" && (
          <g>
            <Line a={A} b={plot(armA)} kind="g031-first-line" />
            <Line a={B} b={plot(armB)} kind="g031-second-line" />
          </g>
        )}
        <Dot p={A} name="A" dy={60} />
        <Dot p={B} name="B" dy={60} />
      </Figure>
      <p
        className={`g031-insight ${m.kind !== "valid" ? "g031-caution" : ""}`}
        role="status"
      >
        {Math.abs(a - b)} &lt; {c} &lt; {a + b} koşulu{" "}
        {m.kind === "valid" ? "sağlanır." : "sağlanmaz."}{" "}
        {m.kind === "valid"
          ? "Pozitif üç kenar için bu sıkı eşitsizlik yeterlidir."
          : m.kind === "degenerate"
            ? "Bir kenar diğer ikisinin toplamına eşit; alan sıfır olur ve gerçek üçgen oluşmaz."
            : "Renkli parçalar yalnız verilen uzunlukları temsil eder; bir C köşesi veya hayalî üçgen üretilmez."}
      </p>
      <Evidence
        items={[
          ["Alt sınır |a − b|", `${Math.abs(a - b)} birim`],
          ["Seçili c", `${c} birim`],
          ["Üst sınır a + b", `${a + b} birim`],
          [
            "Alan",
            finiteTriangle ? `${fmt(finiteTriangle.area)} birim²` : "Üçgen yok",
          ],
        ]}
      />
      <div className="g031-presets">
        <button
          type="button"
          className="secondary"
          onClick={() => set({ a: 3, b: 4, c: 5 })}
        >
          3–4–5: çizilir
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set({ a: 3, b: 4, c: 7 })}
        >
          3–4–7: sınır
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set({ a: 3, b: 4, c: 8 })}
        >
          3–4–8: çizilmez
        </button>
      </div>
    </Lab>
  );
}
function RightTriangle() {
  const [s, set] = useExploration("g031:right", { ab: 6, ac: 8, step: 0 });
  const ab = Math.round(geometry031Bounds(s.ab, 2, 12)),
    ac = Math.round(geometry031Bounds(s.ac, 2, 12));
  const step = Math.round(geometry031Bounds(s.step, 0, 3));
  const m = geometry031Right(ab, ac);
  const legBVertices = [m.A, m.B, { x: ab, y: -ab }, { x: 0, y: -ab }];
  const legCVertices = [m.A, m.C, { x: -ac, y: ac }, { x: -ac, y: 0 }];
  const hypVertices = [m.B, m.C, { x: ac, y: ac + ab }, { x: ab + ac, y: ab }];
  // Frame only the pieces shown in this step. A single scale keeps lengths,
  // square areas and perpendicularity faithful; the margins reserve room for
  // the responsive vertex labels. The shared SVG camera stays unchanged.
  const visible = [
    m.A,
    m.B,
    m.C,
    ...(step >= 1 && step <= 2 ? [...legBVertices, ...legCVertices] : []),
    ...(step === 2 ? hypVertices : []),
  ];
  const minX = Math.min(...visible.map((p) => p.x)),
    maxX = Math.max(...visible.map((p) => p.x)),
    minY = Math.min(...visible.map((p) => p.y)),
    maxY = Math.max(...visible.map((p) => p.y));
  const scale = Math.min(440 / (maxX - minX), 340 / (maxY - minY));
  const plot: Plot = (p) => ({
    x: 320 + (p.x - (minX + maxX) / 2) * scale,
    y: 265 - (p.y - (minY + maxY) / 2) * scale,
  });
  const A = plot(m.A),
    B = plot(m.B),
    C = plot(m.C),
    H = plot(m.H);
  const legBSquare = legBVertices.map(plot);
  const legCSquare = legCVertices.map(plot);
  const hypSquare = hypVertices.map(plot);
  return (
    <Lab
      title="Pisagor'dan Öklid'e: aynı üçgen, iki bakış"
      help="A açısı her zaman 90°. Dik kenarları değiştir; karelerin alanları ve hipotenüse inen yüksekliğin parçaları aynı koordinatlardan hesaplansın."
    >
      <div className="g031-controls">
        <Range
          label="AB dik kenarı"
          value={ab}
          min={2}
          max={12}
          change={(ab) => set({ ab })}
        />
        <Range
          label="AC dik kenarı"
          value={ac}
          min={2}
          max={12}
          change={(ac) => set({ ac })}
        />
      </div>
      <Figure
        height={530}
        label={`A açısı dik, AB ${ab}, AC ${ac}, BC ${fmt(m.hypotenuse)} birim. ${step === 3 ? `AH yüksekliği ${fmt(m.height)}, BH ${fmt(m.p)}, HC ${fmt(m.q)} birim.` : "Karelerin alanları Pisagor ilişkisini gösterir."}`}
      >
        {step >= 1 && step <= 2 && (
          <g className="g031-reveal">
            <polygon
              points={points(legBSquare)}
              className="g031-square g031-first"
            />
            <polygon
              points={points(legCSquare)}
              className="g031-square g031-second"
            />
          </g>
        )}
        {step === 2 && (
          <polygon
            points={points(hypSquare)}
            className="g031-square g031-third g031-reveal"
          />
        )}
        <polygon points={points([A, B, C])} className="g031-triangle" />
        <path d={`M${A.x + 17} ${A.y} v-17 h-17`} className="g031-right-mark" />
        {step === 3 && (
          <g className="g031-reveal">
            <Line a={A} b={H} kind="g031-helper" />
            <RightMark vertex={H} along={B} to={A} />
            <Dot p={H} name="H" dx={30} dy={-12} />
          </g>
        )}
        <Dot p={A} name="A" dx={-27} dy={30} />
        <Dot p={B} name="B" dx={30} dy={26} />
        <Dot p={C} name="C" dx={-20} dy={-22} />
      </Figure>
      <Steps
        step={step}
        labels={[
          "Dik açı A'da; karşısındaki BC hipotenüstür.",
          "İki dik kenarın üzerine dışa doğru birer kare kur.",
          "Hipotenüsteki karenin alanı, diğer iki karenin alanları toplamına eşittir.",
          "A'dan hipotenüse dik indir: AH yüksekliği, BH=p ve HC=q parçalarını oluşturur.",
        ]}
        change={(step) => set({ step })}
      />
      <Evidence
        items={
          step < 3
            ? [
                [
                  "AB² + AC²",
                  `${m.abSquare} + ${m.acSquare} = ${m.hypotenuseSquare} birim²`,
                ],
                [
                  "BC",
                  `√${m.hypotenuseSquare} = ${fmt(m.hypotenuse, 3)} birim`,
                ],
              ]
            : [
                ["BH = p", `${fmt(m.p, 3)} birim`],
                ["HC = q", `${fmt(m.q, 3)} birim`],
                ["AH² = p · q", `${fmt(m.height ** 2, 3)} birim²`],
                [
                  "AB² = p · BC",
                  `${fmt(m.p * m.hypotenuse, 3)} = ${m.abSquare}`,
                ],
                [
                  "AC² = q · BC",
                  `${fmt(m.q * m.hypotenuse, 3)} = ${m.acSquare}`,
                ],
              ]
        }
      />
      <p className="g031-insight">
        Öklid bağıntılarında p, AB kenarının hipotenüsteki izdüşümü BH'dir.
        Harfleri ezberlemek yerine hangi kenarın hangi parçaya karşılık
        geldiğini şekilden izle.
      </p>
    </Lab>
  );
}
function Similarity() {
  const [s, set] = useExploration("g031:similarity", { percent: 60 });
  const percent = Math.round(geometry031Bounds(s.percent, 20, 100));
  const m = geometry031Similarity(percent / 100);
  const plot: Plot = (p) => ({ x: 150 + p.x * 30, y: 330 - p.y * 30 });
  const A = plot(m.A),
    B = plot(m.B),
    C = plot(m.C),
    D = plot(m.D),
    E = plot(m.E);
  return (
    <Lab
      title="Benzerlik: uzunluk k, alan k²"
      help={`${percent === 100 ? "D, B ile; E, C ile çakışır. DE ve BC artık aynı doğru parçasıdır." : "DE doğrusu BC'ye paraleldir."} Küçük ADE üçgenini A köşesinden büyüt; köşe eşleşmesi A↔A, D↔B, E↔C olarak korunur.`}
    >
      <Range
        label="Küçük / büyük uzunluk oranı"
        value={percent}
        min={20}
        max={100}
        unit="%"
        change={(percent) => set({ percent })}
      />
      <Figure
        label={`ADE ve ABC ${percent === 100 ? "eş üçgenleri; D ve B, E ve C çakışır. DE ve BC aynı doğru parçası." : "benzer üçgenleri. DE, BC'ye paralel."} Küçük bölü büyük kenar oranı ${fmt(m.t, 2)}, alan oranı ${fmt(m.areaFactor, 2)}.`}
      >
        <polygon
          points={points([A, B, C])}
          className="g031-triangle g031-faint"
        />
        <polygon points={points([A, D, E])} className="g031-similar-piece" />
        <Line a={D} b={E} kind="g031-first-line" />
        <Dot p={A} name="A" dy={-27} />
        <Dot p={B} name={percent === 100 ? "B = D" : "B"} dy={60} />
        <Dot p={C} name={percent === 100 ? "C = E" : "C"} dy={60} />
        {percent < 100 && (
          <>
            <Dot p={D} name="D" dx={-36} dy={5} />
            <Dot p={E} name="E" dx={35} dy={5} />
          </>
        )}
      </Figure>
      <Evidence
        items={[
          ["Kenar oranı k", `${fmt(m.t, 2)} = AD/AB = AE/AC = DE/BC`],
          ["DE / BC", `${fmt(m.small.a)} / 10 = ${fmt(m.t, 2)}`],
          [
            "Küçük / büyük alan",
            `${fmt(m.small.area, 2)} / 40 = ${fmt(m.areaFactor, 2)}`,
          ],
          ["Alan oranı", `k² = ${fmt(m.t, 2)}² = ${fmt(m.areaFactor, 2)}`],
        ]}
      />
      <p className="g031-insight">
        {percent === 100
          ? "k = 1 olduğunda karşılıklı uzunluklar da eşittir: benzerlik artık eşlik olur."
          : `Küçük üçgenin uzunlukları büyük üçgenin %${percent}'i; alanı %${fmt(m.areaFactor * 100, 1)}'idir. Alanı da aynı yüzdeyle küçültmek doğru olmaz.`}{" "}
        {percent < 100 &&
          "Bu çizimde açı eşitlikleri DE ∥ BC koşulundan gelir."}
      </p>
    </Lab>
  );
}
function Centers() {
  const [s, set] = useExploration("g031:centers", {
    x: 3,
    height: 7,
    mode: "median",
  });
  const x = geometry031Bounds(s.x, -1, 11),
    height = geometry031Bounds(s.height, 3, 9);
  const mode = [
    "median",
    "bisector",
    "incircle",
    "altitude",
    "circumcircle",
  ].includes(s.mode)
    ? s.mode
    : "median";
  const m = geometry031Centers(
    { x, y: height },
    { x: 0, y: 0 },
    { x: 10, y: 0 },
  )!;
  // Use one uniform scale for angles, circles and distances: anisotropic plots would turn an incircle into a false circle.
  const otherCenters = mode === "altitude" || mode === "circumcircle";
  const circleEdges =
    mode === "circumcircle"
      ? [
          {
            x: m.circumcenter.x - m.circumradius,
            y: m.circumcenter.y - m.circumradius,
          },
          {
            x: m.circumcenter.x + m.circumradius,
            y: m.circumcenter.y + m.circumradius,
          },
        ]
      : [];
  const extent = [
    m.A,
    m.B,
    m.C,
    ...(mode === "altitude"
      ? [m.orthocenter, m.altitudeFootA, m.altitudeFootB]
      : []),
    ...circleEdges,
  ];
  const minX = Math.min(...extent.map((p) => p.x)),
    maxX = Math.max(...extent.map((p) => p.x));
  const minY = Math.min(...extent.map((p) => p.y)),
    maxY = Math.max(...extent.map((p) => p.y));
  const scale = otherCenters
    ? Math.min(440 / (maxX - minX), 280 / (maxY - minY))
    : 30;
  const originX = otherCenters
    ? (640 - (maxX - minX) * scale) / 2 - minX * scale
    : 140;
  const originY = otherCenters ? 360 + minY * scale : 350;
  const uniform: Plot = (p) => ({
    x: originX + p.x * scale,
    y: originY - p.y * scale,
  });
  const A = uniform(m.A),
    B = uniform(m.B),
    C = uniform(m.C),
    M = uniform(m.midpoint),
    D = uniform(m.bisectorFoot),
    G = uniform(m.centroid),
    I = uniform(m.incenter),
    H = uniform(m.orthocenter),
    O = uniform(m.circumcenter);
  const center =
    mode === "median"
      ? G
      : mode === "altitude"
        ? H
        : mode === "circumcircle"
          ? O
          : I;
  const centerName =
    mode === "median"
      ? "G"
      : mode === "altitude"
        ? "H"
        : mode === "circumcircle"
          ? "O"
          : "I";
  const leaderDirection = center.x > 490 ? -1 : 1;
  const angleType =
    Math.max(...Object.values(m.angles!)) > 90.00001
      ? "Geniş açılı"
      : Object.values(m.angles!).some((a) => Math.abs(a - 90) < 0.00001)
        ? "Dik açılı"
        : "Dar açılı";
  return (
    <Lab
      title="Üçgenin dört merkezini keşfet"
      help="Üçgenin tepe noktasını değiştir. Kenarortay, açıortay, yükseklik ve kenar orta dikmeleri farklı merkezler verir. Geniş açılı bir üçgende bazı merkezler dışarıda olabilir."
    >
      <div className="g031-controls">
        <Range
          label="A köşesinin yatay konumu"
          value={x}
          min={-1}
          max={11}
          step={0.1}
          change={(x) => set({ x })}
        />
        <Range
          label="Üçgenin yüksekliği"
          value={height}
          min={3}
          max={9}
          step={0.1}
          change={(height) => set({ height })}
        />
      </div>
      <div className="g031-modes" role="group" aria-label="Üçgen çizimi">
        <button
          type="button"
          className="secondary"
          aria-pressed={mode === "median"}
          onClick={() => set({ mode: "median" })}
        >
          Kenarortay
        </button>
        <button
          type="button"
          className="secondary"
          aria-pressed={mode === "bisector"}
          onClick={() => set({ mode: "bisector" })}
        >
          Açıortay
        </button>
        <button
          type="button"
          className="secondary"
          aria-pressed={mode === "incircle"}
          onClick={() => set({ mode: "incircle" })}
        >
          İç teğet çember
        </button>
        <button
          type="button"
          className="secondary"
          aria-pressed={mode === "altitude"}
          onClick={() => set({ mode: "altitude" })}
        >
          Diklik merkezi
        </button>
        <button
          type="button"
          className="secondary"
          aria-pressed={mode === "circumcircle"}
          onClick={() => set({ mode: "circumcircle" })}
        >
          Çevrel merkez
        </button>
      </div>
      <div className="g031-presets" role="group" aria-label="Üçgen türü">
        <button
          type="button"
          className="secondary"
          onClick={() => set({ x: 3, height: 7 })}
        >
          Dar açılı örnek
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set({ x: 0, height: 6 })}
        >
          Dik açılı örnek
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set({ x: 5, height: 3 })}
        >
          Geniş açılı örnek
        </button>
      </div>
      <Figure
        height={470}
        label={`${angleType} ABC üçgeninde ${mode === "median" ? "AM kenarortayı ve ağırlık merkezi G" : mode === "bisector" ? "AD açıortayı ve iç merkez I" : mode === "altitude" ? "Yüksekliklerin kesişimi diklik merkezi H" : mode === "circumcircle" ? "Üç köşeden geçen çemberin merkezi O" : "Üç kenara teğet, I merkezli iç çember"}. ${mode === "median" ? "BM ve MC beşer birim; AG bölü GM iki." : mode === "altitude" ? "Yükseklikler karşı kenara veya uzantısına diktir." : mode === "circumcircle" ? `OA, OB ve OC ${fmt(m.circumradius, 3)} birim.` : `BD bölü DC oranı ${fmt(m.bd / m.dc, 3)}, AB bölü AC oranına eşit.`}`}
      >
        {mode === "circumcircle" && (
          <g className="g031-reveal">
            <circle
              cx={O.x}
              cy={O.y}
              r={m.circumradius * scale}
              className="g031-circumcircle"
            />
            <Line a={O} b={A} kind="g031-helper" />
            <Line a={O} b={B} kind="g031-helper" />
            <Line a={O} b={C} kind="g031-helper" />
            <Line a={M} b={O} kind="g031-first-line" />
          </g>
        )}
        <polygon points={points([A, B, C])} className="g031-triangle" />
        {mode === "median" && (
          <g className="g031-reveal">
            <Line a={A} b={M} kind="g031-first-line" />
            <Line
              a={B}
              b={uniform({ x: (m.A.x + m.C.x) / 2, y: m.A.y / 2 })}
              kind="g031-helper"
            />
            <Line
              a={C}
              b={uniform({ x: m.A.x / 2, y: m.A.y / 2 })}
              kind="g031-helper"
            />
            <Dot p={M} name="M" dy={60} />
          </g>
        )}
        {(mode === "bisector" || mode === "incircle") && (
          <g className="g031-reveal">
            <Line a={A} b={D} kind="g031-first-line" />
            <Line a={B} b={I} kind="g031-helper" />
            <Line a={C} b={I} kind="g031-helper" />
            <Dot p={D} name="D" dy={60} />
          </g>
        )}
        {mode === "incircle" && (
          <g className="g031-reveal">
            <circle
              cx={I.x}
              cy={I.y}
              r={m.inradius * scale}
              className="g031-incircle"
            />
            <Line
              a={I}
              b={uniform({ x: m.incenter.x, y: 0 })}
              kind="g031-helper"
            />
            <text
              x={I.x - 24}
              y={(I.y + uniform({ x: m.incenter.x, y: 0 }).y) / 2}
            >
              r
            </text>
          </g>
        )}
        {mode === "altitude" && (
          <g className="g031-reveal">
            <Line a={A} b={uniform(m.altitudeFootA)} kind="g031-first-line" />
            <Line a={A} b={H} kind="g031-first-line" />
            <Line a={B} b={uniform(m.altitudeFootB)} kind="g031-helper" />
            <Line a={B} b={H} kind="g031-helper" />
            <Line a={B} b={uniform(m.altitudeFootA)} kind="g031-helper" />
            <Line a={A} b={uniform(m.altitudeFootB)} kind="g031-helper" />
            <RightMark vertex={uniform(m.altitudeFootA)} along={C} to={A} />
            <RightMark vertex={uniform(m.altitudeFootB)} along={A} to={B} />
          </g>
        )}
        <Dot p={A} name="A" dy={-29} />
        <Dot p={B} name="B" dx={-18} dy={60} />
        <Dot p={C} name="C" dx={18} dy={60} />
        <circle cx={center.x} cy={center.y} r="6" className="g031-center" />
        <Line
          a={center}
          b={{ x: center.x + 55 * leaderDirection, y: center.y - 30 }}
          kind="g031-label-line"
        />
        <text x={center.x + 67 * leaderDirection} y={center.y - 29}>
          {centerName}
        </text>
      </Figure>
      <Evidence
        items={
          mode === "altitude"
            ? [
                ["Üçgen türü", angleType],
                [
                  "H koordinatı",
                  `(${fmt(m.orthocenter.x, 3)}; ${fmt(m.orthocenter.y, 3)})`,
                ],
                ["Yükseklik", "Karşı kenara veya uzantısına diktir"],
              ]
            : mode === "circumcircle"
              ? [
                  ["Üçgen türü", angleType],
                  ["OA = OB = OC", `${fmt(m.circumradius, 3)} birim`],
                  [
                    "O koordinatı",
                    `(${fmt(m.circumcenter.x, 3)}; ${fmt(m.circumcenter.y, 3)})`,
                  ],
                ]
              : mode === "median"
                ? [
                    ["BM ve MC", "5 birim = 5 birim"],
                    [
                      "AG / GM",
                      `${fmt(m.medianAG, 3)} / ${fmt(m.medianGM, 3)} = 2`,
                    ],
                    ["G noktası", "Üç kenarortayın ortak noktası"],
                  ]
                : [
                    [
                      "BD / DC",
                      `${fmt(m.bd, 3)} / ${fmt(m.dc, 3)} = ${fmt(m.bd / m.dc, 3)}`,
                    ],
                    [
                      "AB / AC",
                      `${fmt(m.c, 3)} / ${fmt(m.b, 3)} = ${fmt(m.c / m.b, 3)}`,
                    ],
                    [
                      mode === "incircle" ? "İç çember yarıçapı" : "I noktası",
                      mode === "incircle"
                        ? `r = ${fmt(m.inradius, 3)} birim`
                        : "İç açıortayların ortak noktası",
                    ],
                  ]
        }
      />
      <p className="g031-insight">
        {mode === "altitude"
          ? "Dar açılı üçgende H içeridedir; dik açılı üçgende dik açılı köşededir; geniş açılı üçgende dışarıdadır. Yüksekliği gerektiğinde karşı kenarın uzantısına indir; merkezi şeklin içinde tutmak için yerini değiştirme."
          : mode === "circumcircle"
            ? "Çevrel merkez O, köşelere eşit uzaklıktadır. Dar açılı üçgende içeride, dik üçgende hipotenüsün orta noktasında, geniş açılı üçgende dışarıdadır. Bu çember kenarlara teğet olmak zorunda değildir; üç köşeden geçer."
            : mode === "median"
              ? "G, kenarortayı köşeden başlayarak 2:1 oranında böler. Bu, BM ile MC'nin 2:1 olduğu anlamına gelmez: M orta noktadır."
              : "Açıortay karşı kenarı ancak komşu iki kenar eşitse eşit böler. Simetrik görünmek tek başına yeterli değildir; BD/DC = AB/AC oranını kontrol et."}{" "}
        G ve I her zaman içeridedir; H ve O'nun konumu üçgenin türüne bağlıdır.
      </p>
    </Lab>
  );
}
export default function GeometryFoundation031Lab({ id }: { id: string }) {
  switch (id) {
    case "tyt-geo-temel-acilar-031":
      return <Angles />;
    case "tyt-geo-ucgende-acilar-031":
      return <TriangleAngles />;
    case "tyt-geo-ucgen-esitsizligi-031":
      return <Inequality />;
    case "tyt-geo-dik-ucgen-031":
      return <RightTriangle />;
    case "tyt-geo-eslik-benzerlik-031":
      return <Similarity />;
    case "tyt-geo-ucgen-merkezleri-031":
      return <Centers />;
    default:
      return null;
  }
}
