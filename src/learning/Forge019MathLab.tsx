import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  axes019,
  clip019,
  line019,
  pair019,
  plane019,
  pointSlope019,
  project019,
  through019,
  type Coeff019,
  type Point019,
} from "./forge019Math";
import "./forge019Math.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 }).format(n);
const coord = (p: Point019) => `(${fmt(p.x)}; ${fmt(p.y)})`;
const clamp = (n: number, min: number, max: number, step = 1) =>
  Number.isFinite(n)
    ? Math.max(min, Math.min(max, Math.round(n / step) * step))
    : min;
type Option019 = readonly [string, string];
function Choice019({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly Option019[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="m019-field">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </ChoiceSelect>
    </div>
  );
}
function Range019({
  label,
  value,
  min = -6,
  max = 6,
  step = 1,
  unit = "birim",
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="m019-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <output htmlFor={id}>
        {fmt(value)} {unit}
      </output>
    </div>
  );
}
type Named019 = Point019 & {
  name: string;
  kind: "a" | "b" | "c" | "result" | "helper";
  mark?: boolean;
};
function segment019(
  a: Point019,
  b: Point019,
  scale: ReturnType<typeof plane019>,
  className: string,
  data?: string,
) {
  return (
    <line
      className={className}
      x1={scale.x(a.x)}
      y1={scale.y(a.y)}
      x2={scale.x(b.x)}
      y2={scale.y(b.y)}
      data-geometry-line={data}
    />
  );
}
function PointLabels019({
  points,
  scale,
  font,
}: {
  points: Named019[];
  scale: ReturnType<typeof plane019>;
  font: number;
}) {
  const grouped: { point: Named019; names: string[] }[] = [];
  for (const point of points) {
    const match = grouped.find(
      (g) => g.point.x === point.x && g.point.y === point.y,
    );
    if (match) match.names.push(point.name);
    else grouped.push({ point, names: [point.name] });
  }
  const occupied: { x: number; y: number; w: number; h: number }[] = [
    { x: 360 - font * 1.4, y: 320 + font * 0.15, w: font, h: font * 1.25 },
  ];
  return (
    <>
      {grouped.map(({ point, names }) => {
        const px = scale.x(point.x),
          py = scale.y(point.y),
          name = names.join("/"),
          w = Math.max(font, name.length * font * 0.65 + 12),
          h = font * 1.35,
          gap = Math.max(12, font * 0.3);
        const candidates = [
          { x: px + gap, y: py - h - gap },
          { x: px + gap, y: py + gap },
          { x: px - w - gap, y: py - h - gap },
          { x: px - w - gap, y: py + gap },
          { x: px - w / 2, y: py - h - gap * 2 },
          { x: px - w / 2, y: py + gap * 2 },
        ].map((r) => ({
          x: Math.max(78, Math.min(642 - w, r.x)),
          y: Math.max(36, Math.min(590 - h, r.y)),
          w,
          h,
        }));
        const score = (r: (typeof occupied)[number]) =>
          occupied.reduce(
            (v, o) =>
              v +
              (r.x < o.x + o.w &&
              r.x + r.w > o.x &&
              r.y < o.y + o.h &&
              r.y + r.h > o.y
                ? 100
                : 0),
            0,
          ) +
          grouped.reduce(
            (v, o) =>
              v +
              (scale.x(o.point.x) > r.x - 6 &&
              scale.x(o.point.x) < r.x + r.w + 6 &&
              scale.y(o.point.y) > r.y - 6 &&
              scale.y(o.point.y) < r.y + r.h + 6
                ? 40
                : 0),
            0,
          ) +
          (r.y < 347 && r.y + r.h > 320 ? 4 : 0);
        const box = candidates.reduce((best, r) =>
          score(r) < score(best) ? r : best,
        );
        occupied.push(box);
        return (
          <g key={name}>
            {point.mark !== false && (
              <circle
                className={`m019-point m019-${point.kind}`}
                cx={px}
                cy={py}
                r={Math.max(6, font * 0.24)}
                data-geometry-point={name}
                data-names={names.join(" ")}
                data-x={point.x}
                data-y={point.y}
              />
            )}
            <rect
              className="m019-label-bg"
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              rx="3"
            />
            <text
              x={box.x + box.w / 2}
              y={box.y + font * 1.03}
              textAnchor="middle"
              data-point-label={name}
            >
              {name}
            </text>
          </g>
        );
      })}
    </>
  );
}

type Scale019 = ReturnType<typeof plane019> & { font: number };
type DrawLine019 = { name: string; coeff: Coeff019 };
function Plot019({
  points,
  lines,
  title,
  children,
}: {
  points: Named019[];
  lines: DrawLine019[];
  title: string;
  children?: (scale: Scale019) => ReactNode;
}) {
  const titleId = useId(),
    descId = useId(),
    ref = useRef<SVGSVGElement>(null),
    [width, setWidth] = useState(720);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const measure = () => {
      const w = svg.getBoundingClientRect().width;
      if (w > 0) setWidth(w);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);
  const font = Math.max(22, (17 * 720) / width),
    important: Point019[] = [...points];
  for (const l of lines) {
    const state = line019(l.coeff);
    if (state.kind === "line") {
      if (state.xIntercept) important.push(state.xIntercept);
      if (state.yIntercept) important.push(state.yIntercept);
    }
  }
  const scale = { ...plane019(important), font };
  const clips = lines.map((l) => ({
    ...l,
    ends: clip019(l.coeff, scale.limit),
  }));
  const labels: Named019[] = clips.flatMap((l, i) =>
    l.ends.length === 2
      ? [
          {
            x: l.ends[0].x + (l.ends[1].x - l.ends[0].x) * (i ? 0.27 : 0.73),
            y: l.ends[0].y + (l.ends[1].y - l.ends[0].y) * (i ? 0.27 : 0.73),
            name: l.name,
            kind: "helper" as const,
            mark: false,
          },
        ]
      : [],
  );
  const positives = scale.ticks.filter((v) => v > 0 && v < scale.limit),
    inner = positives[Math.floor(positives.length / 2)] ?? scale.step,
    ticks =
      width < 480
        ? [-inner, inner]
        : scale.ticks.filter((v) => v !== 0 && Math.abs(v) < scale.limit);
  return (
    <figure className="m019-figure">
      <svg
        ref={ref}
        className="m019-diagram"
        viewBox="0 0 720 650"
        style={{ fontSize: font }}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        data-equal-axis-scale={scale.pixelsPerUnit}
        data-axis-limit={scale.limit}
      >
        <title id={titleId}>{title}</title>
        <desc id={descId}>
          Dik koordinat sistemi; iki eksende bir birim aynı fiziksel uzunlukta.
          Çizgi harfleri d ve e ile adlandırılır. Koordinatlar, denklem ve bütün
          sonuçlar normal metin olarak da verilir.
        </desc>
        <rect className="m019-plot" x="100" y="60" width="520" height="520" />
        {scale.ticks
          .filter((v) => v !== 0)
          .map((v) => (
            <g key={v}>
              <line
                className="m019-grid"
                x1={scale.x(v)}
                y1="60"
                x2={scale.x(v)}
                y2="580"
              />
              <line
                className="m019-grid"
                x1="100"
                y1={scale.y(v)}
                x2="620"
                y2={scale.y(v)}
              />
            </g>
          ))}
        {ticks.map((v) => (
          <g key={v}>
            <text
              x={scale.x(v)}
              y={580 + font}
              textAnchor="middle"
              data-axis-label="tick-x"
            >
              {fmt(v)}
            </text>
            <text
              x="87"
              y={scale.y(v) + font * 0.32}
              textAnchor="end"
              data-axis-label="tick-y"
            >
              {fmt(v)}
            </text>
          </g>
        ))}
        <line className="m019-axis" x1="100" y1="320" x2="640" y2="320" />
        <path className="m019-axis" d="M632 313 L640 320 L632 327" />
        <line className="m019-axis" x1="360" y1="580" x2="360" y2="42" />
        <path className="m019-axis" d="M353 50 L360 42 L367 50" />
        <text x="650" y="327" data-axis-label="x">
          x
        </text>
        <text x="380" y="56" data-axis-label="y">
          y
        </text>
        {clips.map((l, i) =>
          l.ends.length === 2 ? (
            <line
              key={l.name}
              className={i ? "m019-second-line" : "m019-main-line"}
              data-math-line={l.name}
              data-a={l.coeff.a}
              data-b={l.coeff.b}
              data-c={l.coeff.c}
              x1={scale.x(l.ends[0].x)}
              y1={scale.y(l.ends[0].y)}
              x2={scale.x(l.ends[1].x)}
              y2={scale.y(l.ends[1].y)}
            />
          ) : null,
        )}
        {children?.(scale)}
        <g data-origin-label-layer>
          <rect
            className="m019-label-bg"
            data-origin-label-bg
            x={360 - font * 1.5}
            y={320 + font * 0.08}
            width={font * 1.3}
            height={font * 1.4}
            rx="3"
          />
          <text
            data-axis-label="origin"
            x={360 - font * 0.45}
            y={320 + font * 1.1}
            textAnchor="end"
          >
            O
          </text>
        </g>
        <PointLabels019
          points={[...points, ...labels]}
          scale={scale}
          font={font}
        />
      </svg>
      <figcaption>
        Her iki eksen −{fmt(scale.limit)} ile +{fmt(scale.limit)} birim; ızgara
        aralığı {fmt(scale.step)} birim.{" "}
        {width < 480
          ? `Dar görünümde yalnız ±${fmt(inner)} sayı etiketleri gösterilir. `
          : ""}
        d ve e harfleri çizgilerin kimliğidir; renk tek başına kullanılmaz.
        Çizilen parça, sonsuz doğrunun bu pencere içindeki bölümüdür.
      </figcaption>
    </figure>
  );
}
function rightAngle019(
  h: Point019,
  u: Point019,
  v: Point019,
  scale: Scale019,
  available = Infinity,
) {
  const target = Math.max(12, scale.font * 0.45) / scale.pixelsPerUnit,
    boundX =
      (scale.limit - Math.abs(h.x)) / (Math.abs(u.x) + Math.abs(v.x) || 1),
    boundY =
      (scale.limit - Math.abs(h.y)) / (Math.abs(u.y) + Math.abs(v.y) || 1),
    size = Math.min(target, available / 3, boundX * 0.8, boundY * 0.8);
  if (size * scale.pixelsPerUnit < 6) return null;
  const a = { x: h.x + u.x * size, y: h.y + u.y * size },
    b = { x: a.x + v.x * size, y: a.y + v.y * size },
    c = { x: h.x + v.x * size, y: h.y + v.y * size };
  return (
    <path
      className="m019-right-angle"
      data-right-angle
      d={`M${scale.x(a.x)} ${scale.y(a.y)} L${scale.x(b.x)} ${scale.y(b.y)} L${scale.x(c.x)} ${scale.y(c.y)}`}
    />
  );
}
const equation019 = (l: Coeff019) =>
  `${fmt(l.a)}x ${l.b < 0 ? "−" : "+"} ${fmt(Math.abs(l.b))}y ${l.c < 0 ? "−" : "+"} ${fmt(Math.abs(l.c))}=0`;
const kindText019 = (l: ReturnType<typeof line019>) =>
  l.kind === "plane"
    ? "a=b=c=0: çözüm kümesi tüm düzlem; tek doğru yok."
    : l.kind === "empty"
      ? "a=b=0, c≠0: çözüm kümesi boş; doğru yok."
      : l.slope === null
        ? `Dikey doğru; eğim tanımsız, eğim açısı ${fmt(l.angle!)}°.`
        : `Eğim ${fmt(l.slope)}, eğim açısı ${fmt(l.angle!)}°.`;
const pairText019 = (p: ReturnType<typeof pair019>) =>
  p.kind === "invalid"
    ? "İki geçerli doğru verilmedi; doğru ilişkisi hesaplanamaz."
    : p.kind === "same"
      ? "Çakışık: sonsuz ortak nokta, aynı doğru."
      : p.kind === "parallel"
        ? `Farklı paralel doğrular; ortak nokta yok, dik uzaklık ${fmt(p.distance)} birim.`
        : `Tek kesişim S${coord(p.point!)}. ${p.perpendicular ? "Doğrular diktir." : "Doğrular dik değildir."}`;
const defaults019 = {
  family: "build",
  method: "points",
  areaMode: "axes",
  ax: -2,
  ay: 3,
  bx: 4,
  by: -1,
  px: 3,
  py: 4,
  m: 2,
  vertical: false,
  a: 3,
  b: 4,
  c: -5,
  a2: -6,
  b2: -8,
  c2: 30,
  prediction: "",
  reason: "",
  checked: false,
};
export default function Forge019MathLab({ lessonId }: { lessonId: string }) {
  const [saved, set] = useExploration(`forge019-math:${lessonId}`, defaults019),
    reasonId = useId();
  const family = ["build", "pair", "distance", "area"].includes(saved.family)
      ? saved.family
      : "build",
    method = ["points", "point", "general"].includes(saved.method)
      ? saved.method
      : "points",
    areaMode = saved.areaMode === "parallel" ? "parallel" : "axes",
    reason = saved.reason.slice(0, 120);
  const A = { x: clamp(saved.ax, -6, 6), y: clamp(saved.ay, -6, 6) },
    B = { x: clamp(saved.bx, -6, 6), y: clamp(saved.by, -6, 6) },
    P = { x: clamp(saved.px, -6, 6), y: clamp(saved.py, -6, 6) },
    m = clamp(saved.m, -3, 3, 0.5),
    d = {
      a: clamp(saved.a, -8, 8),
      b: clamp(saved.b, -8, 8),
      c: clamp(saved.c, -30, 30),
    },
    e = {
      a: clamp(saved.a2, -8, 8),
      b: clamp(saved.b2, -8, 8),
      c: clamp(saved.c2, -30, 30),
    };
  const chosen =
      method === "points"
        ? through019(A, B)
        : method === "point"
          ? pointSlope019(A, saved.vertical ? null : m)
          : d,
    build = chosen ? line019(chosen) : null,
    one = line019(d),
    two = line019(e),
    pair = pair019(d, e),
    projection = project019(d, P),
    area = axes019(d);
  const change = (patch: Partial<typeof saved>) =>
    set({ ...patch, checked: false });
  if (lessonId !== "dogrunun-analitigi") return null;
  const lines: DrawLine019[] = [],
    points: Named019[] = [];
  let expected = "",
    prompt = "",
    evidence = "",
    title = "",
    options: readonly Option019[] = [];
  if (family === "build") {
    title = "Veriden doğruyu kur";
    if (chosen) lines.push({ name: "d", coeff: chosen });
    if (method !== "general") points.push({ ...A, name: "A", kind: "a" });
    if (method === "points") points.push({ ...B, name: "B", kind: "b" });
    expected = !build
      ? "insufficient"
      : build.kind === "line"
        ? "unique"
        : build.kind;
    options = [
      ["unique", "Tek"],
      ["insufficient", "Veri az"],
      ["plane", "Düzlem"],
      ["empty", "Boş"],
    ];
    prompt =
      "Bu veriler tek bir doğruyu mu belirler, yoksa başka bir çözüm durumu mu oluşur? Çakışık noktayı sıfır eğimle karıştırma.";
    evidence = !build
      ? "A=B; tek nokta verildiği için tek bir doğru seçilemez."
      : build.kind === "line"
        ? `Tek doğru d: ${equation019(chosen!)}. ${kindText019(build)}`
        : kindText019(build);
  } else if (family === "pair") {
    title = "İki doğrunun ortak noktalarını incele";
    lines.push({ name: "d", coeff: d }, { name: "e", coeff: e });
    if (pair.point) points.push({ ...pair.point, name: "S", kind: "result" });
    expected = pair.kind;
    options = [
      ["intersect", "Kesişir"],
      ["parallel", "Paralel"],
      ["same", "Çakışık"],
      ["invalid", "Yok"],
    ];
    prompt =
      "İki denklem tek noktada kesişen, farklı paralel veya çakışık doğrular mı verir? Önce ikisinin de gerçekten doğru olup olmadığını düşün.";
    evidence = pairText019(pair);
  } else if (family === "distance") {
    title = "En kısa yolu ve gerçek dik ayağı bul";
    lines.push({ name: "d", coeff: d });
    points.push({ ...P, name: "P", kind: "a" });
    if (projection.foot)
      points.push({ ...projection.foot, name: "H", kind: "result" });
    expected =
      projection.distance === null
        ? "invalid"
        : projection.distance === 0
          ? "on"
          : "off";
    options = [
      ["on", "Üstünde"],
      ["off", "Dışında"],
      ["invalid", "Yok"],
    ];
    prompt =
      "P doğru üzerinde mi, dışında mı; yoksa denklem tek doğru vermediği için bu işlem tanımsız mı?";
    evidence =
      projection.distance === null
        ? "Denklem tek bir doğru tanımlamıyor; doğruya dik uzaklık hesabı yapılamaz."
        : `Dik uzaklık ${fmt(projection.distance)} birim; H${coord(projection.foot!)}. İmzalı değer δ=${fmt(projection.signed!)}.`;
  } else if (areaMode === "parallel") {
    title = "Önce normal yönlerini uyumlu yap";
    lines.push({ name: "d", coeff: d }, { name: "e", coeff: e });
    if (
      one.kind === "line" &&
      two.kind === "line" &&
      pair.kind !== "intersect"
    ) {
      const K = project019(d, { x: 0, y: 0 }).foot!,
        H = project019(e, K).foot!;
      points.push(
        { ...K, name: "K", kind: "a" },
        { ...H, name: "H", kind: "result" },
      );
    }
    expected = pair.kind;
    options = [
      ["parallel", "Paralel"],
      ["same", "Çakışık"],
      ["intersect", "Kesişir"],
      ["invalid", "Yok"],
    ];
    prompt =
      "Sabit terimlerin farkını kullanmadan önce iki doğrunun durumunu tahmin et. Katsayılar aynı ölçekte mi?";
    evidence = pairText019(pair);
  } else {
    title = "Eksenler ve doğru kapalı üçgen oluşturur mu?";
    lines.push({ name: "d", coeff: d });
    if (area.x) points.push({ ...area.x, name: "U", kind: "a" });
    if (area.y) points.push({ ...area.y, name: "V", kind: "b" });
    expected = area.kind;
    options = [
      ["triangle", "Var"],
      ["unbounded", "Yok"],
      ["degenerate", "Sıfır"],
      ["invalid", "Yok"],
    ];
    prompt =
      "İki eksen ve d, sıfır olmayan alanlı kapalı bir üçgen oluşturuyor mu? Orijindeki iki kesişim ve tek eksene paralel doğruyu ayır.";
    evidence =
      area.kind === "triangle"
        ? `OUV alanı ${fmt(area.area)} birim kare.`
        : area.kind === "degenerate"
          ? "İki kesişim O'da aynı; sıfır olmayan üçgen oluşmaz, alan 0."
          : area.kind === "unbounded"
            ? "Doğru eksenlerden birine paralel; bu üç sınır kapalı üçgen oluşturmuyor."
            : "Denklem tek doğru vermiyor; üçgen alanı tanımlanamaz.";
  }
  const coords = (
    name: string,
    p: Point019,
    xkey: "ax" | "bx" | "px",
    ykey: "ay" | "by" | "py",
  ) => (
    <>
      <Range019
        label={`${name} apsisi x`}
        value={p.x}
        onChange={(v) => change({ [xkey]: v })}
      />
      <Range019
        label={`${name} ordinatı y`}
        value={p.y}
        onChange={(v) => change({ [ykey]: v })}
      />
    </>
  );
  const coeffs = (name: "d" | "e", l: Coeff019) => (
    <>
      {(["a", "b", "c"] as const).map((key) => (
        <Range019
          key={key}
          label={`${name} için ${key}`}
          value={l[key]}
          min={key === "c" ? -30 : -8}
          max={key === "c" ? 30 : 8}
          unit=""
          onChange={(v) => change({ [name === "d" ? key : `${key}2`]: v })}
        />
      ))}
    </>
  );
  const preset = (kind: string) => {
    const sets: Record<string, Partial<typeof saved>> = {
      cross: { a: 1, b: 1, c: -4, a2: 1, b2: -1, c2: -2 },
      parallel: { a: 3, b: 4, c: -5, a2: -6, b2: -8, c2: 30 },
      same: { a: 1, b: 2, c: -3, a2: -2, b2: -4, c2: 6 },
      axis: { a: 1, b: 0, c: -2, a2: 0, b2: 1, c2: -3 },
    };
    change({ ...sets[kind], prediction: "" });
  };
  const parallelFoot =
    family === "area" && areaMode === "parallel" && points.length === 2
      ? { a: points[0], b: points[1] }
      : null;
  return (
    <section className="m019-lab" data-forge019={lessonId} data-family={family}>
      <h3>Doğruyu hareket ettir, koşulunu açıkla</h3>
      <p>
        Nokta ve katsayı seç. Şekil ile denklem aynı ilişkiyi mi veriyor?
        Bunu dene; tüm uzunluklar aynı birimdedir.
      </p>
      <Choice019
        label="İncelenen ilişki"
        value={family}
        options={[
          ["build", "Doğru"],
          ["pair", "Çift"],
          ["distance", "Uzaklık"],
          ["area", "Alan"],
        ]}
        onChange={(value) => change({ family: value, prediction: "" })}
      />
      <h4>{title}</h4>
      {family === "build" && (
        <Choice019
          label="Veri biçimi"
          value={method}
          options={[
            ["points", "A, B"],
            ["point", "A, m"],
            ["general", "a, b, c"],
          ]}
          onChange={(value) => change({ method: value, prediction: "" })}
        />
      )}
      {family === "area" && (
        <Choice019
          label="Alan veya uzaklık"
          value={areaMode}
          options={[
            ["axes", "Eksenler"],
            ["parallel", "Paralel"],
          ]}
          onChange={(value) => change({ areaMode: value, prediction: "" })}
        />
      )}
      {(family === "pair" ||
        (family === "area" && areaMode === "parallel")) && (
        <div className="m019-presets" aria-label="Doğru çiftleri">
          <button type="button" onClick={() => preset("cross")}>
            Tek nokta
          </button>
          <button type="button" onClick={() => preset("parallel")}>
            Paralel
          </button>
          <button type="button" onClick={() => preset("same")}>
            Çakışık
          </button>
          <button type="button" onClick={() => preset("axis")}>
            Yatay-dik
          </button>
        </div>
      )}
      <div className="m019-controls">
        {family === "build" &&
          method !== "general" &&
          coords("A", A, "ax", "ay")}
        {family === "build" &&
          method === "points" &&
          coords("B", B, "bx", "by")}
        {family === "build" && method === "point" && (
          <>
            <Choice019
              label="Yön türü"
              value={saved.vertical ? "vertical" : "finite"}
              options={[
                ["finite", "Sonlu"],
                ["vertical", "Dikey"],
              ]}
              onChange={(value) => change({ vertical: value === "vertical" })}
            />
            {!saved.vertical && (
              <Range019
                label="Eğim m"
                value={m}
                min={-3}
                max={3}
                step={0.5}
                unit=""
                onChange={(v) => change({ m: v })}
              />
            )}
          </>
        )}
        {(family !== "build" || method === "general") && coeffs("d", d)}
        {(family === "pair" ||
          (family === "area" && areaMode === "parallel")) &&
          coeffs("e", e)}
        {family === "distance" && coords("P", P, "px", "py")}
      </div>
      <div className="m019-prediction">
        <h4>Önce tahminini oluştur</h4>
        <p>{prompt}</p>
        <Choice019
          label="Sonuç tahminin"
          value={saved.prediction}
          options={[["", "Seç"], ...options]}
          onChange={(value) => change({ prediction: value })}
        />
        <label htmlFor={reasonId}>Modelden gerekçen</label>
        <textarea
          id={reasonId}
          value={reason}
          maxLength={120}
          rows={3}
          onChange={(ev) => change({ reason: ev.target.value.slice(0, 120) })}
        />
        <p className="m019-caption">
          {reason.length}/120 karakter. Kıyas, kısa gerekçene otomatik
          doğruluk notu vermez.
        </p>
        <button
          type="button"
          className="m019-compare"
          disabled={
            !options.some(([v]) => v === saved.prediction) || !reason.trim()
          }
          onClick={() => set({ reason, checked: true })}
        >
          Kanıtı gör
        </button>
        {saved.checked && (
          <div className="m019-feedback" role="status">
            <p>
              {saved.prediction === expected
                ? "Tahminin bu koşullarla uyumlu."
                : "Tahminini yeni kanıtla yeniden düşün."}
            </p>
            <p>{evidence}</p>
            <p>Gerekçen: {reason}</p>
          </div>
        )}
      </div>
      <Plot019 points={points} lines={lines} title={title}>
        {(scale) => (
          <>
            {family === "build" &&
              method === "points" &&
              A.x !== B.x &&
              A.y !== B.y && (
                <>
                  {segment019(
                    A,
                    { x: B.x, y: A.y },
                    scale,
                    "m019-helper-line",
                    "delta-x",
                  )}
                  {segment019(
                    { x: B.x, y: A.y },
                    B,
                    scale,
                    "m019-helper-line",
                    "delta-y",
                  )}
                </>
              )}
            {family === "pair" &&
              pair.kind === "intersect" &&
              pair.perpendicular &&
              one.normal &&
              two.normal &&
              rightAngle019(
                pair.point,
                { x: -one.normal.y, y: one.normal.x },
                { x: -two.normal.y, y: two.normal.x },
                scale,
              )}
            {family === "distance" && projection.foot && projection.normal && (
              <>
                {segment019(
                  P,
                  projection.foot,
                  scale,
                  "m019-helper-line",
                  "perpendicular",
                )}
                {projection.distance! > 0 &&
                  rightAngle019(
                    projection.foot,
                    { x: -projection.normal.y, y: projection.normal.x },
                    {
                      x: projection.normal.x * Math.sign(projection.signed!),
                      y: projection.normal.y * Math.sign(projection.signed!),
                    },
                    scale,
                    projection.distance!,
                  )}
              </>
            )}
            {parallelFoot &&
              segment019(
                parallelFoot.a,
                parallelFoot.b,
                scale,
                "m019-helper-line",
                "parallel-distance",
              )}
            {family === "area" &&
              areaMode === "axes" &&
              area.kind === "triangle" && (
                <path
                  className="m019-triangle"
                  data-axis-triangle
                  d={`M360 320 L${scale.x(area.x!.x)} 320 L360 ${scale.y(area.y!.y)} Z`}
                />
              )}
          </>
        )}
      </Plot019>
      <div className="m019-result" data-model-result>
        <h4>Şeklin sayısal kanıtı</h4>
        <p data-main-outcome>{evidence}</p>
        {(family === "build" ? chosen !== null : true) && (
          <p data-equation-d>
            <strong>d:</strong> {equation019(family === "build" ? chosen! : d)}
          </p>
        )}
        {(family === "pair" ||
          (family === "area" && areaMode === "parallel")) && (
          <p data-equation-e>
            <strong>e:</strong> {equation019(e)}
          </p>
        )}
        {family === "build" && (
          <>
            <p data-build-detail>
              {!build
                ? "Yetersiz veri: A=B. Aynı noktadan farklı doğrular geçer."
                : kindText019(build)}
            </p>
            {method !== "general" && (
              <p>
                A{coord(A)}{" "}
                {method === "points"
                  ? `ve B${coord(B)} verildi.`
                  : saved.vertical
                    ? "noktasından düşey doğru seçildi."
                    : `ve m=${fmt(m)} verildi.`}
              </p>
            )}
          </>
        )}
        {family === "pair" && (
          <>
            <p data-pair-detail>{pairText019(pair)}</p>
            <p>
              {pair.determinant === null
                ? "Önce iki geçerli doğru gerekir."
                : `D=a₁b₂−a₂b₁=${fmt(pair.determinant)}. ${pair.kind === "intersect" ? "İki denklemin tek ortak çözümü bulunur." : "Çakışıklık için diğer iki katsayı minörü de kontrol edilir."}`}
            </p>
          </>
        )}
        {family === "distance" && (
          <>
            <p data-projection-detail>
              {projection.foot
                ? `P${coord(P)}, H${coord(projection.foot)}; |PH|=${fmt(projection.distance!)} birim.`
                : "Denklem doğru tanımlamadığı için dik ayak gösterilmez."}
            </p>
            {projection.foot && (
              <p>
                H için a·x+b·y+c=
                {fmt(
                  d.a * projection.foot.x + d.b * projection.foot.y + d.c,
                )}.{" "}
                {projection.distance === 0
                  ? "P=H; sıfır uzunlukta açı işareti çizilmez."
                  : "PH, (a; b) normal yönünde; H doğru üzerindedir."}
              </p>
            )}
          </>
        )}
        {family === "area" && areaMode === "axes" && (
          <p data-area-detail>
            {area.kind === "triangle"
              ? `U${coord(area.x!)}, V${coord(area.y!)}; alan |${fmt(area.x!.x)}×${fmt(area.y!.y)}|/2=${fmt(area.area!)} birim kare.`
              : evidence}
          </p>
        )}
        {family === "area" && areaMode === "parallel" && (
          <>
            <p data-parallel-detail>
              {pair.kind === "parallel"
                ? `Paralel uzaklık ${fmt(pair.distance)} birim. Normal yönleri ve katsayı ölçekleri uyumlu karşılaştırıldı.`
                : pair.kind === "same"
                  ? "Aynı doğru: uzaklık 0; tek kesim noktası seçilmez."
                  : pair.kind === "intersect"
                    ? "Kesişen doğruların minimum uzaklığı 0; paralel sabit farkı kısa yolu uygulanmaz."
                    : "Geçerli iki doğru yok; paralel uzaklık formülü kullanılamaz."}
            </p>
            {parallelFoot && (
              <p>
                K{coord(parallelFoot.a)} ve H{coord(parallelFoot.b)} arasındaki
                doğru parçası iki doğruya da diktir.
              </p>
            )}
          </>
        )}
        {points.length > 0 && (
          <ul className="m019-point-list">
            {points.map((p) => (
              <li key={p.name}>
                <strong>{p.name}:</strong> {coord(p)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="m019-caption">
        Keşif seçimin bu cihazda saklanır. Bu kontrolü açmak veya tahmini
        sınamak XP, doğru soru ya da konu tamamlama kaydı oluşturmaz.
      </p>
    </section>
  );
}
