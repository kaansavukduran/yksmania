import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  translate021,
  transform021,
  reflectLine021,
  reflectCenter021,
  circleGeneral021,
  circleLine021,
  circlePair021,
  finiteMap021,
  rational021,
  compose021,
  polynomial021,
  dividePolynomial021,
  plane021,
  type Point021,
  type Line021,
  type Inner021,
} from "./forge021Geometry";
import "./forge021Geometry.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 }).format(
    Object.is(n, -0) ? 0 : n,
  );
const coord = (p: Point021) => `(${fmt(p.x)}; ${fmt(p.y)})`;
const bounded = (v: number, min = -6, max = 6) =>
  Number.isFinite(v) ? Math.max(min, Math.min(max, Math.round(v))) : min;
type Options = readonly (readonly [string, string])[];
function Select({
  label,
  value,
  options,
  change,
}: {
  label: string;
  value: string;
  options: Options;
  change: (v: string) => void;
}) {
  const id = useId();
  return (
    <div className="g021-field">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => change(e.target.value)}>
        {options.map(([v, t]) => (
          <option value={v} key={v}>
            {t}
          </option>
        ))}
      </ChoiceSelect>
    </div>
  );
}
function Range({
  label,
  value,
  min = -6,
  max = 6,
  change,
  unit = "birim",
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  change: (n: number) => void;
  unit?: string;
}) {
  const id = useId();
  return (
    <div className="g021-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => change(Number(e.target.value))}
      />
      <output htmlFor={id}>
        {fmt(value)} {unit}
      </output>
    </div>
  );
}
function Evidence({
  prediction,
  reason,
  checked,
  expected,
  options,
  change,
}: {
  prediction: string;
  reason: string;
  checked: boolean;
  expected: string;
  options: Options;
  change: (v: {
    prediction?: string;
    reason?: string;
    checked?: boolean;
  }) => void;
}) {
  const id = useId(),
    allowed = options.some(([key]) => key === prediction);
  return (
    <div className="g021-evidence">
      <Select
        label="Tahminin"
        value={allowed ? prediction : ""}
        options={[["", "Seç"], ...options]}
        change={(prediction) => change({ prediction, checked: false })}
      />
      <label htmlFor={id}>Gerekçen</label>
      <textarea
        id={id}
        maxLength={120}
        rows={3}
        value={reason.slice(0, 120)}
        onChange={(e) =>
          change({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <p>
        {reason.slice(0, 120).length}/120 · İlişkiyi kendi sözlerinle açıkla.
      </p>
      <button
        type="button"
        className="g021-compare"
        disabled={!allowed || !reason.trim()}
        onClick={() => change({ checked: true })}
      >
        Kanıtla dene
      </button>
      {checked && allowed && (
        <p className="g021-feedback" role="status">
          {prediction === expected
            ? "Tahminin model kanıtıyla uyumlu."
            : "Tahminin kanıtla uyuşmadı; sonucu ve koşulu yeniden incele."}{" "}
          Gerekçen otomatik puanlanmaz.
        </p>
      )}
      <p className="g021-caption">
        Keşif bu cihazda saklanır. Soru doğrusu, XP veya konu tamamlandı kaydı
        üretmez.
      </p>
    </div>
  );
}
type Named = Point021 & { name: string; kind?: string };
function useFont() {
  const ref = useRef<SVGSVGElement>(null),
    [width, setWidth] = useState(720);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.getBoundingClientRect().width || 720);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, font: Math.max(21, (17 * 720) / Math.max(80, width)) };
}
function ends(line: Line021, limit: number): Point021[] {
  const out: Point021[] = [];
  if (line.a === 0 && line.b === 0) return out;
  const push = (x: number, y: number) => {
    if (
      Math.abs(x) <= limit + 1e-9 &&
      Math.abs(y) <= limit + 1e-9 &&
      !out.some((p) => Math.hypot(p.x - x, p.y - y) < 1e-8)
    )
      out.push({ x, y });
  };
  if (line.b !== 0) {
    push(-limit, (-line.c + line.a * limit) / line.b);
    push(limit, (-line.c - line.a * limit) / line.b);
  }
  if (line.a !== 0) {
    push((-line.c + line.b * limit) / line.a, -limit);
    push((-line.c - line.b * limit) / line.a, limit);
  }
  return out.slice(0, 2);
}
type Scale = ReturnType<typeof plane021>;
function lineMark(
  a: Point021,
  b: Point021,
  s: Scale,
  kind = "helper",
  data?: string,
) {
  return (
    <line
      x1={s.x(a.x)}
      y1={s.y(a.y)}
      x2={s.x(b.x)}
      y2={s.y(b.y)}
      className={`g021-${kind}`}
      data-geometry-segment={data}
    />
  );
}
function Straight({
  line,
  scale,
  kind = "mirror",
}: {
  line: Line021;
  scale: Scale;
  kind?: string;
}) {
  const p = ends(line, scale.limit);
  return p.length === 2 ? lineMark(p[0], p[1], scale, kind) : null;
}
function Labels({
  points,
  scale,
  font,
}: {
  points: Named[];
  scale: Scale;
  font: number;
}) {
  const grouped: { point: Named; names: string[] }[] = [];
  for (const p of points) {
    const g = grouped.find(
      (g) => Math.hypot(g.point.x - p.x, g.point.y - p.y) < 1e-9,
    );
    if (g) g.names.push(p.name);
    else grouped.push({ point: p, names: [p.name] });
  }
  const occupied = [
    {
      x: 360 - font * 1.1,
      y: 320 + Math.max(9, font * 0.2),
      w: font * 1.1,
      h: font * 1.2,
    },
    { x: 674, y: 315 - font, w: font, h: font * 1.4 },
    { x: 367, y: 3, w: font, h: font * 1.4 },
  ];
  return (
    <>
      {grouped.map(({ point, names }) => {
        const name = names.join("/"),
          px = scale.x(point.x),
          py = scale.y(point.y),
          w = Math.max(font, name.length * font * 0.65 + 14),
          h = font * 1.35,
          gap = Math.max(12, font * 0.3);
        const candidates = [
          { x: px + gap, y: py - h - gap },
          { x: px + gap, y: py + gap },
          { x: px - w - gap, y: py - h - gap },
          { x: px - w - gap, y: py + gap },
          { x: px - w / 2, y: py - h - gap * 2 },
          { x: px - w / 2, y: py + gap * 2 },
          { x: 82, y: 42 },
          { x: 640 - w, y: 570 - h },
        ].map((p) => ({
          ...p,
          x: Math.max(42, Math.min(678 - w, p.x)),
          y: Math.max(38, Math.min(594 - h, p.y)),
          w,
          h,
        }));
        const overlap = (r: (typeof occupied)[number]) =>
          occupied.reduce(
            (sum, o) =>
              sum +
              (r.x < o.x + o.w &&
              r.x + r.w > o.x &&
              r.y < o.y + o.h &&
              r.y + r.h > o.y
                ? 100
                : 0),
            0,
          ) +
          grouped.reduce(
            (sum, g) =>
              sum +
              (scale.x(g.point.x) > r.x - 8 &&
              scale.x(g.point.x) < r.x + r.w + 8 &&
              scale.y(g.point.y) > r.y - 8 &&
              scale.y(g.point.y) < r.y + r.h + 8
                ? 50
                : 0),
            0,
          );
        const box = candidates.reduce((a, b) =>
          overlap(b) < overlap(a) ? b : a,
        );
        occupied.push(box);
        return (
          <g key={name} data-named-point={name}>
            <circle
              cx={px}
              cy={py}
              r={6}
              className={`g021-point g021-${point.kind || "a"}`}
            />
            <g data-point-label={name}>
              <rect
                className="g021-label-bg"
                x={box.x}
                y={box.y}
                width={w}
                height={h}
                rx={4}
              />
              <text x={box.x + w / 2} y={box.y + h * 0.76} textAnchor="middle">
                {name}
              </text>
            </g>
          </g>
        );
      })}
    </>
  );
}
function Plane({
  title,
  points,
  bounds = [],
  children,
}: {
  title: string;
  points: Named[];
  bounds?: Point021[];
  children?: (s: Scale) => ReactNode;
}) {
  const { ref, font } = useFont(),
    titleId = useId(),
    s = plane021([...points, ...bounds]),
    outer = s.ticks.filter(
      (t) => t !== 0 && Math.abs(t) === Math.max(...s.ticks.map(Math.abs)),
    );
  return (
    <figure className="g021-figure">
      <svg
        ref={ref}
        role="img"
        aria-labelledby={titleId}
        className="g021-diagram"
        viewBox="0 0 720 640"
        style={{ fontSize: font }}
      >
        <title id={titleId}>{title}</title>
        <rect x={100} y={60} width={520} height={520} className="g021-plot" />
        {s.ticks.map((t) => (
          <g key={t}>
            <line
              x1={s.x(t)}
              x2={s.x(t)}
              y1={60}
              y2={580}
              className="g021-grid"
            />
            <line
              y1={s.y(t)}
              y2={s.y(t)}
              x1={100}
              x2={620}
              className="g021-grid"
            />
          </g>
        ))}
        <path d="M80 320H658M360 602V30" className="g021-axis" />
        {children?.(s)}
        <Labels points={points} scale={s} font={font} />
        {outer.map((t) => (
          <g key={t}>
            <rect
              className="g021-label-bg"
              x={s.x(t) - font}
              y={615 - font * 0.75}
              width={2 * font}
              height={font}
            />
            <text x={s.x(t)} y={615} textAnchor="middle" data-axis-tick="x">
              {fmt(t)}
            </text>
            <rect
              className="g021-label-bg"
              x={4}
              y={s.y(t) - font * 0.8}
              width={font * 1.8}
              height={font}
            />
            <text x={font * 1.7} y={s.y(t)} textAnchor="end" data-axis-tick="y">
              {fmt(t)}
            </text>
          </g>
        ))}
        <g data-origin-label>
          <rect
            className="g021-label-bg"
            x={360 - font * 1.05}
            y={320 + Math.max(9, font * 0.2)}
            width={font}
            height={font * 1.2}
          />
          <text
            x={360 - font * 0.55}
            y={320 + Math.max(9, font * 0.2) + font * 0.9}
            textAnchor="middle"
          >
            O
          </text>
        </g>
        <text x={690} y={315} textAnchor="middle" data-axis-end="x">
          x
        </text>
        <text x={370} y={font * 1.05} data-axis-end="y">
          y
        </text>
      </svg>
      <figcaption>
        Her iki eksende 1 birim aynı fiziksel boydadır. Pencere −{fmt(s.limit)}{" "}
        ile +{fmt(s.limit)} birim; görünen uç sayıları iki eksen için de
        geçerlidir. Nokta değerleri aşağıda yazılıdır.
      </figcaption>
    </figure>
  );
}
const polyText = (c: readonly number[]) => {
  const parts: string[] = [];
  for (let i = c.length - 1; i >= 0; i--) {
    if (c[i] === 0) continue;
    const a = Math.abs(c[i]),
      term =
        (i === 0 || a !== 1 ? fmt(a) : "") +
        (i === 0 ? "" : i === 1 ? "x" : `x^${i}`);
    parts.push(
      (parts.length ? (c[i] < 0 ? " − " : " + ") : c[i] < 0 ? "−" : "") + term,
    );
  }
  return parts.join("") || "0";
};
function curve(s: Scale, fn: (x: number) => number | null) {
  let d = "",
    previous: { x: number; y: number } | null = null;
  for (let j = 0; j <= 240; j++) {
    const x = -s.limit + (2 * s.limit * j) / 240,
      y = fn(x);
    if (y === null || !Number.isFinite(y) || Math.abs(y) > s.limit) {
      previous = null;
      continue;
    }
    const connect = previous && Math.abs(y - previous.y) < s.limit / 2;
    d += (connect ? " L" : " M") + s.x(x) + " " + s.y(y);
    previous = { x, y };
  }
  return d;
}
function Transforms() {
  const [v, set] = useExploration("forge021-geometry:donusum-oteleme-donme", {
    px: 1,
    py: 2,
    dx: 3,
    dy: -1,
    cx: 0,
    cy: 0,
    angle: 90,
    order: "translate-rotate",
    shape: "point",
    prediction: "",
    reason: "",
    checked: false,
  });
  const px = bounded(v.px),
    py = bounded(v.py),
    dx = bounded(v.dx),
    dy = bounded(v.dy),
    cx = bounded(v.cx),
    cy = bounded(v.cy),
    angle = bounded(v.angle, -360, 360),
    p = { x: px, y: py },
    vector = { x: dx, y: dy },
    center = { x: cx, y: cy },
    order =
      v.order === "rotate-translate" ? "rotate-translate" : "translate-rotate",
    m = transform021(p, vector, center, angle, order),
    triangle = v.shape === "triangle",
    vertices = triangle ? [p, { x: px + 2, y: py }, { x: px, y: py + 2 }] : [p],
    images = vertices.map(
      (p) => transform021(p, vector, center, angle, order).result,
    ),
    points: Named[] = [
      { ...p, name: "A", kind: "a" },
      { ...m.intermediate, name: "I", kind: "helper" },
      { ...m.result, name: "A′", kind: "result" },
      { ...m.other, name: "J", kind: "b" },
      { ...center, name: "C", kind: "helper" },
    ];
  if (triangle)
    points.push(
      { ...vertices[1], name: "B", kind: "a" },
      { ...vertices[2], name: "D", kind: "a" },
      { ...images[1], name: "B′", kind: "result" },
      { ...images[2], name: "D′", kind: "result" },
    );
  return (
    <>
      <h3>Hareketin sırasını değiştir</h3>
      <p>
        A başlangıç, I ara nokta, A′ seçili sıranın sonucu; J ters sıranın
        sonucudur. Aynı kural üçgenin bütün köşelerine uygulanır.
      </p>
      <div className="g021-controls">
        <Range
          label="A yatay"
          value={px}
          change={(px) => set({ px, checked: false })}
        />
        <Range
          label="A düşey"
          value={py}
          change={(py) => set({ py, checked: false })}
        />
        <Range
          label="Öteleme x"
          value={dx}
          change={(dx) => set({ dx, checked: false })}
        />
        <Range
          label="Öteleme y"
          value={dy}
          change={(dy) => set({ dy, checked: false })}
        />
        <Range
          label="Merkez x"
          value={cx}
          change={(cx) => set({ cx, checked: false })}
        />
        <Range
          label="Merkez y"
          value={cy}
          change={(cy) => set({ cy, checked: false })}
        />
        <Range
          label="Dönme açısı"
          value={angle}
          min={-360}
          max={360}
          unit="derece"
          change={(angle) => set({ angle, checked: false })}
        />
        <Select
          label="İşlem sırası"
          value={order}
          options={[
            ["translate-rotate", "Ötele, sonra dön"],
            ["rotate-translate", "Dön, sonra ötele"],
          ]}
          change={(order) => set({ order, checked: false })}
        />
        <Select
          label="Şekil"
          value={triangle ? "triangle" : "point"}
          options={[
            ["point", "Nokta"],
            ["triangle", "Üçgen"],
          ]}
          change={(shape) => set({ shape, checked: false })}
        />
      </div>
      <Plane title="Öteleme ve dönmede gerçek koordinatlar" points={points}>
        {(s) => (
          <>
            {triangle && (
              <>
                <polygon
                  className="g021-shape"
                  points={vertices
                    .map((p) => `${s.x(p.x)},${s.y(p.y)}`)
                    .join(" ")}
                />
                <polygon
                  data-transformed-triangle
                  className="g021-shape g021-image"
                  points={images
                    .map((p) => `${s.x(p.x)},${s.y(p.y)}`)
                    .join(" ")}
                />
              </>
            )}
            {lineMark(p, m.intermediate, s, "helper")}
            {lineMark(m.intermediate, m.result, s, "main")}
          </>
        )}
      </Plane>
      <div data-model-result className="g021-result">
        <h4>İşlemin kanıtı</h4>
        <p>
          A = {coord(p)}; I = {coord(m.intermediate)}; A′ ={" "}
          <strong data-transform-result>{coord(m.result)}</strong>; J ={" "}
          {coord(m.other)}.
        </p>
        <p>
          {m.sameOrderResult
            ? "İki sıra bu verilerde aynı noktayı verir."
            : "İki sıra bu verilerde farklı noktaları verir."}{" "}
          Dönme{" "}
          {m.identityRotation
            ? "tam turdur; dönme adımı bütün noktaları sabit bırakır."
            : "tam tur değildir; yalnız dönme merkezinin sabit kalması beklenir."}
        </p>
        {triangle && (
          <p>
            AB ve A′B′ uzunlukları{" "}
            {fmt(Math.hypot(vertices[1].x - p.x, vertices[1].y - p.y))} ve{" "}
            {fmt(
              Math.hypot(images[1].x - images[0].x, images[1].y - images[0].y),
            )}{" "}
            birim; alanlar 2 ve 2 birim kare. B′ {coord(images[1])}, D′{" "}
            {coord(images[2])}.
          </p>
        )}
      </div>
      <Evidence
        prediction={v.prediction}
        reason={v.reason}
        checked={v.checked}
        change={set}
        expected={m.sameOrderResult ? "same" : "different"}
        options={[
          ["same", "İki sonuç aynı"],
          ["different", "İki sonuç farklı"],
        ]}
      />
    </>
  );
}
function Reflection() {
  const [v, set] = useExploration("forge021-geometry:donusum-yansima-simetri", {
    px: 3,
    py: 4,
    a: 3,
    b: 4,
    c: -5,
    cx: 1,
    cy: 2,
    mode: "line",
    prediction: "",
    reason: "",
    checked: false,
  });
  const p = { x: bounded(v.px), y: bounded(v.py) },
    a = bounded(v.a),
    b = bounded(v.b),
    c = bounded(v.c, -12, 12),
    center = { x: bounded(v.cx), y: bounded(v.cy) },
    mode = ["line", "center", "twice"].includes(v.mode) ? v.mode : "line",
    line = { a, b, c },
    m = reflectLine021(p, line),
    first = reflectLine021(p, { a: 1, b: 0, c: 0 }).image!,
    image =
      mode === "center"
        ? reflectCenter021(p, center)
        : mode === "twice"
          ? reflectLine021(first, { a: 1, b: 0, c: -2 }).image!
          : m.image,
    foot = mode === "line" ? m.foot : null,
    points: Named[] = [{ ...p, name: "P", kind: "a" }];
  if (image) points.push({ ...image, name: "P′", kind: "result" });
  if (foot) points.push({ ...foot, name: "H", kind: "helper" });
  if (mode === "center") points.push({ ...center, name: "C", kind: "b" });
  if (mode === "twice") points.push({ ...first, name: "I", kind: "b" });
  const expected = !image
    ? "invalid"
    : Math.hypot(image.x - p.x, image.y - p.y) < 1e-9
      ? "fixed"
      : "changed";
  return (
    <>
      <h3>Görüntüyü eş uzaklıkla kur</h3>
      <p>
        Doğru aynasında H gerçek dik ayaktır. Merkez simetrisi ve iki paralel
        ayna ayrı kurallardır. Aynı nokta üzerinde kalan adlar birlikte
        gösterilir.
      </p>
      <div className="g021-controls">
        <Select
          label="Yöntem"
          value={mode}
          options={[
            ["line", "Doğru aynası"],
            ["center", "Merkez simetrisi"],
            ["twice", "İki paralel ayna"],
          ]}
          change={(mode) => set({ mode, checked: false })}
        />
        <Range
          label="P yatay"
          value={p.x}
          change={(px) => set({ px, checked: false })}
        />
        <Range
          label="P düşey"
          value={p.y}
          change={(py) => set({ py, checked: false })}
        />
        {mode === "line" ? (
          <>
            <Range
              label="a katsayısı"
              value={a}
              change={(a) => set({ a, checked: false })}
              unit=""
            />
            <Range
              label="b katsayısı"
              value={b}
              change={(b) => set({ b, checked: false })}
              unit=""
            />
            <Range
              label="c katsayısı"
              value={c}
              min={-12}
              max={12}
              change={(c) => set({ c, checked: false })}
              unit=""
            />
          </>
        ) : mode === "center" ? (
          <>
            <Range
              label="Merkez x"
              value={center.x}
              change={(cx) => set({ cx, checked: false })}
            />
            <Range
              label="Merkez y"
              value={center.y}
              change={(cy) => set({ cy, checked: false })}
            />
          </>
        ) : (
          <p>
            Önce x = 0, sonra x = 2 aynası. Ters sıra farklı bir öteleme üretir.
          </p>
        )}
      </div>
      <Plane
        title="Doğru ve merkez yansımada nokta ile gerçek ayak"
        points={points}
        bounds={mode === "twice" ? [{ x: 2, y: 0 }] : []}
      >
        {(s) => (
          <>
            {mode === "line" && <Straight line={line} scale={s} />}{" "}
            {mode === "twice" && (
              <>
                <Straight line={{ a: 1, b: 0, c: 0 }} scale={s} />
                <Straight line={{ a: 1, b: 0, c: -2 }} scale={s} />
                {lineMark(p, first, s, "helper")}
              </>
            )}
            {image && lineMark(p, image, s, "main", "PP-prime")}
            {foot && (
              <circle
                cx={s.x(foot.x)}
                cy={s.y(foot.y)}
                r={9}
                className="g021-foot"
                data-mirror-foot
              />
            )}
          </>
        )}
      </Plane>
      <div data-model-result className="g021-result">
        <p>
          P = {coord(p)}.{" "}
          {image ? (
            <>
              P′ = <strong data-reflected-point>{coord(image)}</strong>.
            </>
          ) : (
            "a ve b birlikte 0; bu ifade ayna doğrusu değildir. Görüntü hesaplanmaz."
          )}
        </p>
        {mode === "line" && m.foot && m.image && (
          <>
            <p>
              H = {coord(m.foot)}. PH = HP′ = {fmt(m.distance!)} birim. Ayna:{" "}
              {fmt(a)}x + {fmt(b)}y + {fmt(c)} = 0.
            </p>
            <p>
              H'nin denklem değeri {fmt(a * m.foot.x + b * m.foot.y + c)}.
              {m.distance === 0
                ? " P=H=P′; sıfır parçada yön veya dik açı seçilmez."
                : " PP′ normale paralel."}{" "}
              İşaretli uzaklık {fmt(m.signed!)} birim.
            </p>
          </>
        )}
        {mode === "center" && image && (
          <p>(P + P′)/2 = {coord(center)}; C iki noktanın ortasıdır.</p>
        )}
        {mode === "twice" && image && (
          <p>
            İlk görüntü {coord(first)}; son değişim{" "}
            {coord({ x: image.x - p.x, y: image.y - p.y })} = (4; 0) birimdir.
            Ters sıra (−4; 0) ötelemesi verir.
          </p>
        )}
      </div>
      <Evidence
        prediction={v.prediction}
        reason={v.reason}
        checked={v.checked}
        change={set}
        expected={expected}
        options={[
          ["fixed", "P sabit kalır"],
          ["changed", "P başka yere gider"],
          ["invalid", "Ayna verisi geçersiz"],
        ]}
      />
    </>
  );
}
function Circles() {
  const [v, set] = useExploration("forge021-geometry:cemberin-analitigi", {
    mode: "line",
    cx: 2,
    cy: 1,
    r: 5,
    a: 1,
    b: 0,
    c: -5,
    D: -6,
    E: 4,
    F: -12,
    ox: 6,
    oy: 0,
    s: 5,
    prediction: "",
    reason: "",
    checked: false,
  });
  const mode = ["line", "pair", "general"].includes(v.mode) ? v.mode : "line",
    D = bounded(v.D, -8, 8),
    E = bounded(v.E, -8, 8),
    F = bounded(v.F, -16, 16),
    general = circleGeneral021(D, E, F),
    center =
      mode === "general"
        ? general.center
        : { x: bounded(v.cx), y: bounded(v.cy) },
    radius = mode === "general" ? general.radius : bounded(v.r, 0, 6),
    line = { a: bounded(v.a), b: bounded(v.b), c: bounded(v.c, -12, 12) },
    other = { x: bounded(v.ox), y: bounded(v.oy) },
    r2 = bounded(v.s, 0, 6),
    intersection = radius !== null ? circleLine021(center, radius, line) : null,
    pair = radius !== null ? circlePair021(center, radius, other, r2) : null,
    points: Named[] = [{ ...center, name: "M", kind: "a" }];
  if (mode === "line" && intersection) {
    if (intersection.foot)
      points.push({ ...intersection.foot, name: "H", kind: "helper" });
    intersection.points.forEach((p, i) =>
      points.push({ ...p, name: i === 0 ? "A" : "B", kind: "result" }),
    );
  }
  if (mode === "pair" && pair) {
    points.push({ ...other, name: "N", kind: "b" });
    pair.points.forEach((p, i) =>
      points.push({ ...p, name: i === 0 ? "A" : "B", kind: "result" }),
    );
  }
  const bounds: Point021[] =
    radius !== null
      ? [
          { x: center.x - radius, y: center.y - radius },
          { x: center.x + radius, y: center.y + radius },
        ]
      : [];
  if (mode === "pair")
    bounds.push(
      { x: other.x - r2, y: other.y - r2 },
      { x: other.x + r2, y: other.y + r2 },
    );
  const count =
    mode === "general"
      ? general.kind === "empty"
        ? "none"
        : general.kind === "point"
          ? "one"
          : "many"
      : mode === "pair"
        ? pair?.kind === "coincident"
          ? "many"
          : pair?.points.length === 2
            ? "two"
            : pair?.points.length === 1
              ? "one"
              : "none"
        : intersection?.points.length === 2
          ? "two"
          : intersection?.points.length === 1
            ? "one"
            : "none";
  const status: Record<string, string> = {
    outside: "Ayrı; ortak nokta yok",
    inside: "Biri diğerinin içinde, sınırlar ayrı",
    tangent: "Teğet",
    intersect: "İki ortak nokta",
    coincident: "Çakışık çemberler",
    "same-point": "Aynı tek nokta",
    "point-on": "Tek nokta diğer çemberin üzerinde",
    separate: "Tek nokta diğer çemberin üzerinde değil",
  };
  return (
    <>
      <h3>Çemberin koşullarını gör</h3>
      <p>
        Merkez M; doğruyla kesişimde H dik ayak, A ve B ortak noktalardır.
        İkinci çemberin merkezi N'dir. Boş denklemde hayalî yarıçap çizilmez.
      </p>
      <div className="g021-controls">
        <Select
          label="İnceleme"
          value={mode}
          options={[
            ["line", "Doğru ile"],
            ["pair", "İki çember"],
            ["general", "Genel denklem"],
          ]}
          change={(mode) => set({ mode, checked: false })}
        />
        {mode === "general" ? (
          <>
            <Range
              label="D katsayısı"
              value={D}
              min={-8}
              max={8}
              unit=""
              change={(D) => set({ D, checked: false })}
            />
            <Range
              label="E katsayısı"
              value={E}
              min={-8}
              max={8}
              unit=""
              change={(E) => set({ E, checked: false })}
            />
            <Range
              label="F katsayısı"
              value={F}
              min={-16}
              max={16}
              unit=""
              change={(F) => set({ F, checked: false })}
            />
          </>
        ) : (
          <>
            <Range
              label="Merkez x"
              value={center.x}
              change={(cx) => set({ cx, checked: false })}
            />
            <Range
              label="Merkez y"
              value={center.y}
              change={(cy) => set({ cy, checked: false })}
            />
            <Range
              label="Yarıçap"
              value={radius!}
              min={0}
              max={6}
              change={(r) => set({ r, checked: false })}
            />
          </>
        )}
        {mode === "line" ? (
          <>
            <Range
              label="a katsayısı"
              value={line.a}
              unit=""
              change={(a) => set({ a, checked: false })}
            />
            <Range
              label="b katsayısı"
              value={line.b}
              unit=""
              change={(b) => set({ b, checked: false })}
            />
            <Range
              label="c katsayısı"
              value={line.c}
              min={-12}
              max={12}
              unit=""
              change={(c) => set({ c, checked: false })}
            />
          </>
        ) : mode === "pair" ? (
          <>
            <Range
              label="N yatay"
              value={other.x}
              change={(ox) => set({ ox, checked: false })}
            />
            <Range
              label="N düşey"
              value={other.y}
              change={(oy) => set({ oy, checked: false })}
            />
            <Range
              label="İkinci yarıçap"
              value={r2}
              min={0}
              max={6}
              change={(s) => set({ s, checked: false })}
            />
          </>
        ) : null}
      </div>
      <Plane
        title="Çemberin gerçek yarıçapı ve ortak noktaları"
        points={points}
        bounds={bounds}
      >
        {(s) => (
          <>
            {radius !== null && radius > 0 && (
              <circle
                data-primary-circle
                cx={s.x(center.x)}
                cy={s.y(center.y)}
                r={radius * s.pixelsPerUnit}
                className="g021-circle"
              />
            )}
            {mode === "line" && (
              <>
                <Straight line={line} scale={s} kind="main" />
                {intersection?.foot &&
                  lineMark(
                    center,
                    intersection.foot,
                    s,
                    "helper",
                    "centre-to-foot",
                  )}
                {intersection?.points.length === 2 &&
                  lineMark(
                    intersection.points[0],
                    intersection.points[1],
                    s,
                    "chord",
                    "chord",
                  )}
              </>
            )}
            {mode === "pair" && (
              <>
                <circle
                  data-second-circle
                  cx={s.x(other.x)}
                  cy={s.y(other.y)}
                  r={r2 * s.pixelsPerUnit}
                  className="g021-circle g021-second"
                />
                {lineMark(center, other, s, "helper")}
              </>
            )}
          </>
        )}
      </Plane>
      <div data-model-result className="g021-result">
        <p>
          M = {coord(center)};{" "}
          {radius === null ? (
            "Gerçek yarıçap yok."
          ) : (
            <>r = {fmt(radius)} birim.</>
          )}
        </p>
        {mode === "general" ? (
          <>
            <p>
              x² + y² + {fmt(D)}x + {fmt(E)}y + {fmt(F)} = 0; r² ={" "}
              {fmt(general.radiusSquared)}.
            </p>
            <p data-circle-kind>
              {general.kind === "empty"
                ? "Çözüm kümesi boş."
                : general.kind === "point"
                  ? `Yalnız M ${coord(center)} noktası.`
                  : "Pozitif yarıçaplı gerçek çember."}
            </p>
          </>
        ) : mode === "line" && intersection ? (
          <>
            <p data-circle-kind>
              {intersection.kind === "invalid-line"
                ? "a ve b birlikte 0; doğru verisi geçersiz."
                : intersection.kind === "outside"
                  ? "Doğru çemberi kesmez."
                  : intersection.kind === "secant"
                    ? "Doğru iki noktada keser."
                    : "Doğruyla tek ortak nokta var."}
            </p>
            {intersection.distance !== null && (
              <p>
                Merkezin doğruya uzaklığı {fmt(intersection.distance)}; kiriş{" "}
                {fmt(intersection.chord!)} birim.
              </p>
            )}
            {intersection.points.map((p, i) => (
              <p key={i}>
                Ortak nokta {i + 1}: <strong>{coord(p)}</strong>.
              </p>
            ))}
          </>
        ) : (
          pair && (
            <>
              <p data-circle-kind>{status[pair.kind]}</p>
              <p>
                N = {coord(other)}; ikinci yarıçap {fmt(r2)}, merkezler arası{" "}
                {fmt(pair.distance)} birim.
              </p>
              {pair.points.map((p, i) => (
                <p key={i}>
                  Ortak nokta {i + 1}: {coord(p)}.
                </p>
              ))}
            </>
          )
        )}
      </div>
      <Evidence
        prediction={v.prediction}
        reason={v.reason}
        checked={v.checked}
        change={set}
        expected={count}
        options={
          mode === "general"
            ? [
                ["none", "Çözüm yok"],
                ["one", "Tek nokta"],
                ["many", "Çember"],
              ]
            : [
                ["none", "Ortak nokta yok"],
                ["one", "Bir nokta"],
                ["two", "İki nokta"],
                ["many", "Sonsuz nokta"],
              ]
        }
      />
    </>
  );
}
function MappingFigure({
  rows,
  codomain,
}: {
  rows: number[][];
  codomain: number[];
}) {
  const { ref, font } = useFont(),
    id = useId(),
    inputs = [-1, 0, 1],
    y = (i: number) => 150 + i * 150;
  return (
    <figure className="g021-figure">
      <svg
        ref={ref}
        role="img"
        aria-labelledby={id}
        className="g021-diagram"
        viewBox="0 0 720 640"
        style={{ fontSize: font }}
      >
        <title id={id}>Sonlu kümelerde gerçek eşleme okları</title>
        <rect
          x={30}
          y={55}
          width={660}
          height={535}
          rx={35}
          className="g021-plot"
        />
        {rows.flatMap((row, i) =>
          row.map((t) => (
            <g key={i + ":" + t}>
              <line
                x1={190}
                y1={y(i)}
                x2={530}
                y2={y(codomain.indexOf(t))}
                className="g021-main"
                data-map-arrow={`${inputs[i]}:${t}`}
              />
              <path
                d={`M515 ${y(codomain.indexOf(t)) - 8}L530 ${y(codomain.indexOf(t))}L515 ${y(codomain.indexOf(t)) + 8}`}
                className="g021-main"
              />
            </g>
          )),
        )}
        {inputs.map((x, i) => (
          <g key={x}>
            <circle cx={150} cy={y(i)} r={40} className="g021-node" />
            <text x={150} y={y(i) + font * 0.35} textAnchor="middle">
              {x}
            </text>
          </g>
        ))}
        {codomain.map((x, i) => (
          <g key={x}>
            <circle cx={570} cy={y(i)} r={40} className="g021-node" />
            <text x={570} y={y(i) + font * 0.35} textAnchor="middle">
              {x}
            </text>
          </g>
        ))}
        <text x={150} y={40} textAnchor="middle">
          A
        </text>
        <text x={570} y={40} textAnchor="middle">
          B
        </text>
      </svg>
      <figcaption>
        Sol küme A tanım kümesi, sağ B değer kümesidir. Her ok bir gerçek eşleme
        ilişkisi; sayıların çizimdeki yüksekliği büyüklük ölçeği değildir.
      </figcaption>
    </figure>
  );
}
function Functions() {
  const [v, set] = useExploration("forge021-math:ayt-fonksiyonlar", {
    mode: "map",
    codomain: 2,
    row0: "1",
    row1: "0",
    row2: "1",
    a: 2,
    b: 1,
    c: 0,
    d: 1,
    inner: "reciprocal",
    m: 1,
    n: 3,
    x: 2,
    order: "gf",
    prediction: "",
    reason: "",
    checked: false,
  });
  const mode = ["map", "compose", "inverse"].includes(v.mode) ? v.mode : "map",
    codomain = v.codomain === 3 ? [0, 1, 2] : [0, 1],
    row = (value: string) =>
      value === "both"
        ? [0, 1]
        : ["0", "1", "2"].includes(value) && codomain.includes(Number(value))
          ? [Number(value)]
          : [],
    rows = [row(v.row0), row(v.row1), row(v.row2)],
    mapping = finiteMap021([-1, 0, 1], codomain, rows),
    f = {
      a: bounded(v.a, -4, 4),
      b: bounded(v.b, -4, 4),
      c: bounded(v.c, -4, 4),
      d: bounded(v.d, -4, 4),
    },
    x = bounded(v.x, -6, 6),
    inner: Inner021 = {
      kind: ["linear", "square", "reciprocal"].includes(v.inner)
        ? (v.inner as Inner021["kind"])
        : "linear",
      m: bounded(v.m, -4, 4),
      n: bounded(v.n, -4, 4),
    },
    order = v.order === "fg" ? "fg" : "gf",
    composed = compose021(f, inner, x, order),
    rational = rational021(f, x),
    inverseValue = rational.inverse
      ? rational021(rational.inverse, x).value
      : null,
    expected =
      mode === "map"
        ? !mapping.isFunction
          ? "not-function"
          : mapping.injective && mapping.surjective
            ? "bijective"
            : "function"
        : mode === "compose"
          ? composed.valid
            ? "valid"
            : "hole"
          : rational.inverse
            ? "inverse"
            : "no-inverse",
    selectedValue = mode === "inverse" ? inverseValue : composed.result,
    points: Named[] =
      selectedValue !== null && Math.abs(selectedValue) <= 8
        ? [{ x, y: selectedValue, name: "P", kind: "result" }]
        : [];
  const options: Options =
    mode === "map"
      ? [
          ["not-function", "Fonksiyon değil"],
          ["function", "Fonksiyon; ters yok"],
          ["bijective", "Bire bir ve örten"],
        ]
      : mode === "compose"
        ? [
            ["valid", "Sonuç tanımlı"],
            ["hole", "Girdi dışlanır"],
          ]
        : [
            ["inverse", "Ters kuralı var"],
            ["no-inverse", "Ters kuralı yok"],
          ];
  const rowOptions: Options = [
    ["none", "Ok yok"],
    ["0", "0"],
    ["1", "1"],
    ...(codomain.length === 3 ? [["2", "2"] as const] : []),
    ["both", "0 ve 1"],
  ];
  return (
    <>
      <h3>Kuralı ve kümeyi birlikte incele</h3>
      <p>
        Tek değerli eşleme, bileşke ve ters ayrı ele alınır. Bölmede sıfır
        payda, sıfır katsayılı sabit kural ve boş tanım ayrı belirtilir.
      </p>
      <div className="g021-controls">
        <Select
          label="İnceleme"
          value={mode}
          options={[
            ["map", "Küme okları"],
            ["compose", "Bileşke"],
            ["inverse", "Ters kuralı"],
          ]}
          change={(mode) => set({ mode, prediction: "", checked: false })}
        />
        {mode === "map" ? (
          <>
            <Select
              label="B kümesi"
              value={String(codomain.length)}
              options={[
                ["2", "{0, 1}"],
                ["3", "{0, 1, 2}"],
              ]}
              change={(n) => set({ codomain: Number(n), checked: false })}
            />
            {[v.row0, v.row1, v.row2].map((r, i) => (
              <Select
                key={i}
                label={`${[-1, 0, 1][i]} girdisi`}
                value={r === "2" && codomain.length === 2 ? "none" : r}
                options={rowOptions}
                change={(r) => set({ ["row" + i]: r, checked: false })}
              />
            ))}
          </>
        ) : (
          <>
            <Range
              label="f pay x"
              value={f.a}
              min={-4}
              max={4}
              unit=""
              change={(a) => set({ a, checked: false })}
            />
            <Range
              label="f pay sabit"
              value={f.b}
              min={-4}
              max={4}
              unit=""
              change={(b) => set({ b, checked: false })}
            />
            <Range
              label="f payda x"
              value={f.c}
              min={-4}
              max={4}
              unit=""
              change={(c) => set({ c, checked: false })}
            />
            <Range
              label="f payda sabit"
              value={f.d}
              min={-4}
              max={4}
              unit=""
              change={(d) => set({ d, checked: false })}
            />
            <Range
              label="Seçili x"
              value={x}
              change={(x) => set({ x, checked: false })}
            />
            {mode === "compose" && (
              <>
                <Select
                  label="g kuralı"
                  value={inner.kind}
                  options={[
                    ["linear", "m x + n"],
                    ["square", "x² + n"],
                    ["reciprocal", "1 / (x − n)"],
                  ]}
                  change={(inner) => set({ inner, checked: false })}
                />
                {inner.kind === "linear" && (
                  <Range
                    label="g çarpan m"
                    value={inner.m}
                    min={-4}
                    max={4}
                    unit=""
                    change={(m) => set({ m, checked: false })}
                  />
                )}
                <Range
                  label="g sabit n"
                  value={inner.n}
                  min={-4}
                  max={4}
                  unit=""
                  change={(n) => set({ n, checked: false })}
                />
                <Select
                  label="İşlem sırası"
                  value={order}
                  options={[
                    ["gf", "g ∘ f"],
                    ["fg", "f ∘ g"],
                  ]}
                  change={(order) => set({ order, checked: false })}
                />
              </>
            )}
          </>
        )}
      </div>
      {mode === "map" ? (
        <MappingFigure rows={mapping.rows} codomain={codomain} />
      ) : (
        <Plane
          title="Bileşke veya tersin gerçek fonksiyon grafiği"
          points={points}
          bounds={[
            { x: -6, y: -6 },
            { x: 6, y: 6 },
          ]}
        >
          {(s) => (
            <>
              {mode === "inverse" && (
                <Straight
                  line={{ a: 1, b: -1, c: 0 }}
                  scale={s}
                  kind="helper"
                />
              )}
              <path
                className="g021-function"
                data-function-curve
                d={curve(s, (t) =>
                  mode === "inverse"
                    ? rational.inverse
                      ? rational021(rational.inverse, t === 0 ? 0 : t).value
                      : null
                    : compose021(f, inner, t === 0 ? 0 : t, order).result,
                )}
              />
            </>
          )}
        </Plane>
      )}
      <div data-model-result className="g021-result">
        {mode === "map" ? (
          <>
            <p>
              A = {"{−1, 0, 1}"}; B = {`{${codomain.join(", ")}}`}; görüntü ={" "}
              {`{${mapping.image.join(", ")}}`}.
            </p>
            <p data-function-status>
              {!mapping.isFunction
                ? "Bu ilişki fonksiyon değildir."
                : "Her girdinin tek çıktısı var; bu bir fonksiyon."}{" "}
              {mapping.isFunction &&
                `Bire bir: ${mapping.injective ? "evet" : "hayır"}; örten: ${mapping.surjective ? "evet" : "hayır"}.`}
            </p>
            {mapping.missing.length > 0 && (
              <p>Oku olmayan girdiler: {mapping.missing.join(", ")}.</p>
            )}
            {mapping.multiple.length > 0 && (
              <p>
                Birden fazla çıktısı olan girdiler:{" "}
                {mapping.multiple.join(", ")}.
              </p>
            )}
            <p>
              {mapping.inverse
                ? "B’den A’ya ters eşleme tek değerlidir."
                : "B’den A’ya ters fonksiyon bu kümelerle yoktur."}
            </p>
            {mapping.rows.map((r, i) => (
              <p key={i}>
                {[-1, 0, 1][i]} → {r.length ? r.join(" ve ") : "çıktı yok"}
              </p>
            ))}
          </>
        ) : (
          <>
            <p>
              f(x) = ({fmt(f.a)}x + {fmt(f.b)}) / ({fmt(f.c)}x + {fmt(f.d)}).{" "}
              {rational.emptyDomain
                ? "Payda her yerde sıfır; doğal tanım boş."
                : rational.excludedInput !== null
                  ? `f için dışlanan girdi ${fmt(rational.excludedInput)}.`
                  : "f için sıfır paydalı girdi yok."}
            </p>
            {mode === "compose" ? (
              <>
                <p>
                  {inner.kind === "linear"
                    ? `g(x) = ${fmt(inner.m)}x + ${fmt(inner.n)}`
                    : inner.kind === "square"
                      ? `g(x) = x² + ${fmt(inner.n)}`
                      : `g(x) = 1 / (x − ${fmt(inner.n)})`}
                  . İşlem {order === "gf" ? "g ∘ f" : "f ∘ g"}; x = {fmt(x)}.
                </p>
                <p>
                  Ara değer{" "}
                  {composed.first === null ? "tanımsız" : fmt(composed.first)};{" "}
                  <strong data-compose-result>
                    {composed.result === null
                      ? "Sonuç tanımsız."
                      : `Sonuç ${fmt(composed.result)}.`}
                  </strong>
                </p>
                {!composed.valid && (
                  <p>
                    {composed.excludedAt === "inner"
                      ? "İlk işlemde giriş tanıma uymadı."
                      : "Ara değer dış kuralın tanımına uymadı."}{" "}
                    İşleme sahte bir 0 ile devam edilmez.
                  </p>
                )}
              </>
            ) : (
              <>
                <p>
                  ad − bc = {fmt(rational.determinant)}.{" "}
                  {rational.inverse
                    ? "Doğal kümeler arasında ters kuralı vardır."
                    : "Bu biçim bire bir ters kuralı vermez."}
                </p>
                {rational.inverse && (
                  <p>
                    f⁻¹(x) = ({fmt(rational.inverse.a)}x +{" "}
                    {fmt(rational.inverse.b)}) / ({fmt(rational.inverse.c)}x +{" "}
                    {fmt(rational.inverse.d)}); seçili girdide{" "}
                    {inverseValue === null ? "tanımsız" : fmt(inverseValue)}.
                  </p>
                )}
              </>
            )}
            <p>
              Grafik yalnız görünen pencereyi gösterir; dışarı taşan değerler
              yukarıdaki sayıdan okunur. Eğrinin örnek noktaları tek başına bir
              teorem kanıtı değildir.
            </p>
          </>
        )}
      </div>
      <Evidence
        prediction={v.prediction}
        reason={v.reason}
        checked={v.checked}
        change={set}
        expected={expected}
        options={options}
      />
    </>
  );
}
function Polynomials() {
  const [v, set] = useExploration("forge021-math:ayt-polinomlar", {
    c0: 7,
    c1: -5,
    c2: -3,
    c3: 2,
    x: 2,
    divisor: "linear",
    root: 2,
    prediction: "",
    reason: "",
    checked: false,
  });
  const coefficients = [
      bounded(v.c0, -8, 8),
      bounded(v.c1, -8, 8),
      bounded(v.c2, -8, 8),
      bounded(v.c3, -3, 3),
    ],
    x = bounded(v.x, -4, 4),
    root = bounded(v.root, -4, 4),
    divisorKind = ["linear", "quadratic", "constant", "zero"].includes(
      v.divisor,
    )
      ? v.divisor
      : "linear",
    divisor =
      divisorKind === "linear"
        ? [-root, 1]
        : divisorKind === "quadratic"
          ? [-1, 0, 1]
          : divisorKind === "constant"
            ? [2]
            : [0],
    p = polynomial021(coefficients, x),
    division = dividePolynomial021(coefficients, divisor),
    atRoot = polynomial021(coefficients, root).value,
    expected =
      division.kind === "zero-divisor"
        ? "invalid"
        : division.remainder.every((x) => x === 0)
          ? "zero"
          : "nonzero",
    point: Named[] =
      Math.abs(p.value) <= 8
        ? [{ x, y: p.value, name: "P", kind: "result" }]
        : [],
    bounds = [
      { x: -6, y: -6 },
      { x: 6, y: 6 },
    ];
  return (
    <>
      <h3>Bölümü geri çarparak denetle</h3>
      <p>
        Katsayılar sabitten kübiğe sıralıdır. Eksik kuvvetin katsayısını 0
        bırak. Her adım baş terimi yok eder; en sonda gerçek DQ + R ile ilk P
        yeniden kurulur.
      </p>
      <div className="g021-presets">
        <button
          type="button"
          onClick={() =>
            set({
              c0: 7,
              c1: -5,
              c2: -3,
              c3: 2,
              divisor: "linear",
              root: 2,
              x: 2,
              checked: false,
            })
          }
        >
          Doğrusal bölen
        </button>
        <button
          type="button"
          onClick={() =>
            set({
              c0: 4,
              c1: 3,
              c2: 2,
              c3: 1,
              divisor: "quadratic",
              x: 1,
              checked: false,
            })
          }
        >
          Kareli bölen
        </button>
        <button
          type="button"
          onClick={() => set({ c0: 0, c1: 0, c2: 0, c3: 0, checked: false })}
        >
          Sıfır polinomu
        </button>
      </div>
      <div className="g021-controls">
        {coefficients.map((c, i) => (
          <Range
            key={i}
            label={
              ["Sabit katsayı", "x katsayısı", "x² katsayısı", "x³ katsayısı"][
                i
              ]
            }
            value={c}
            min={i === 3 ? -3 : -8}
            max={i === 3 ? 3 : 8}
            unit=""
            change={(c) => set({ ["c" + i]: c, checked: false })}
          />
        ))}
        <Range
          label="Seçili x"
          value={x}
          min={-4}
          max={4}
          change={(x) => set({ x, checked: false })}
        />
        <Select
          label="Bölen D"
          value={divisorKind}
          options={[
            ["linear", "x − r"],
            ["quadratic", "x² − 1"],
            ["constant", "2 sabiti"],
            ["zero", "0 polinomu"],
          ]}
          change={(divisor) => set({ divisor, checked: false })}
        />
        {divisorKind === "linear" && (
          <Range
            label="Kök r"
            value={root}
            min={-4}
            max={4}
            change={(root) => set({ root, checked: false })}
          />
        )}
      </div>
      <Plane
        title="Polinom kuralının gerçek görünen grafiği"
        points={point}
        bounds={bounds}
      >
        {(s) => (
          <path
            className="g021-function"
            data-polynomial-curve
            d={curve(
              s,
              (t) => polynomial021(coefficients, t === 0 ? 0 : t).value,
            )}
          />
        )}
      </Plane>
      <div data-model-result className="g021-result">
        <h4>Kural ve değer</h4>
        <p>
          P(x) = {polyText(coefficients)}. Derece{" "}
          {p.degree === null ? "tanımsız; sıfır polinomu" : p.degree}.
        </p>
        <p>
          P({fmt(x)}) = <strong data-polynomial-value>{fmt(p.value)}</strong>;
          P(0) = {fmt(p.constant)}; P(1) = {fmt(p.sum)}. Çift kuvvetli katsayı
          toplamı {fmt(p.evenSum)}, tek kuvvetli toplam {fmt(p.oddSum)}.
        </p>
        {Math.abs(p.value) > 8 && (
          <p>
            Seçili P = {coord({ x, y: p.value })} görünür pencerenin dışındadır;
            sayı gizlenmez ve sahte pencere kenarı noktası çizilmez.
          </p>
        )}
        <h4>Gerçek bölme</h4>
        <p>D(x) = {polyText(divisor)}.</p>
        {division.kind === "zero-divisor" ? (
          <p data-division-result>
            Sıfır polinomuna bölme tanımsız; bölüm ve kalan üretilmez.
          </p>
        ) : (
          <>
            <p data-division-result>
              Q(x) = <strong>{polyText(division.quotient)}</strong>; R(x) ={" "}
              <strong>{polyText(division.remainder)}</strong>.
            </p>
            <ol className="g021-steps">
              {division.steps.map((step, i) => (
                <li key={i}>
                  Önce {polyText(step.before)}. Baş oran {fmt(step.factor)}
                  {step.shift > 0 ? ` x^${step.shift}` : ""}; bunu D ile çarpıp
                  çıkar: {polyText(step.after)}.
                </li>
              ))}
            </ol>
            {division.steps.length === 0 && (
              <p>P derecesi, D derecesinin altında; Q = 0 ve R = P.</p>
            )}
            <p data-reconstructed>
              DQ + R = {polyText(division.reconstructed)}. İlk P ile katsayıları
              tek tek aynı. Kalan{" "}
              {division.remainderDegree === null
                ? "sıfır polinomu"
                : `derece ${division.remainderDegree}`}
              ; bölen derece {division.divisorDegree}.
            </p>
            {divisorKind === "linear" && (
              <p>
                Kalan teoremi: P({fmt(root)}) = {fmt(atRoot)}; sabit kalan{" "}
                {fmt(division.remainder[0])}. Bölümün kök değerindeki katkısı 0
                olur.
              </p>
            )}
          </>
        )}
      </div>
      <Evidence
        prediction={v.prediction}
        reason={v.reason}
        checked={v.checked}
        change={set}
        expected={expected}
        options={[
          ["zero", "Kalan sıfır"],
          ["nonzero", "Kalan sıfır değil"],
          ["invalid", "Bölme tanımsız"],
        ]}
      />
    </>
  );
}
export default function Forge021GeometryLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const bodies: Record<string, ReactNode> = {
    "donusum-oteleme-donme": <Transforms />,
    "donusum-yansima-simetri": <Reflection />,
    "cemberin-analitigi": <Circles />,
    "ayt-fonksiyonlar": <Functions />,
    "ayt-polinomlar": <Polynomials />,
  };
  if (!Object.hasOwn(bodies, lessonId)) return null;
  return (
    <section className="g021-lab" data-forge021={lessonId}>
      {bodies[lessonId]}
    </section>
  );
}
