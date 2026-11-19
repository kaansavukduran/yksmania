import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  quadratic022,
  complex022,
  signChart022,
  parabola022,
  trig022,
  wave022,
  triangle022,
  trigRoots022,
  type Point022,
  type ComplexOperation022,
  type Relation022,
  type TrigFunction022,
  type Interval022,
} from "./forge022Math";
import { useExploration } from "./useExploration";
import "./forge022Math.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const numberFormat022 = new Intl.NumberFormat("tr-TR", {
  maximumFractionDigits: 4,
});
const fmt = (n: number) => numberFormat022.format(Object.is(n, -0) ? 0 : n);
const bounded = (n: number, lo: number, hi: number, step = 1) =>
  Math.max(
    lo,
    Math.min(hi, Math.round((Number.isFinite(n) ? n : lo) / step) * step),
  );
const choice = <T extends string>(
  v: string,
  choices: readonly T[],
  fallback: T,
) => (choices.includes(v as T) ? (v as T) : fallback);
const point = (p: Point022) => `(${fmt(p.x)}; ${fmt(p.y)})`;
const complex = (p: Point022) =>
  `${fmt(p.x)} ${p.y < 0 ? "−" : "+"} ${fmt(Math.abs(p.y))}i`;
const interval = (s: Interval022) =>
  s.lo === s.hi
    ? `{${fmt(s.lo)}}`
    : `${s.leftClosed ? "[" : "("}${s.lo === -Infinity ? "−∞" : fmt(s.lo)}; ${s.hi === Infinity ? "∞" : fmt(s.hi)}${s.rightClosed ? "]" : ")"}`;
type Guess = { guess: string; reason: string; checked: boolean };
function Prediction({
  state,
  set,
  expected,
  options,
  evidence,
}: {
  state: Guess;
  set: (v: Partial<Guess>) => void;
  expected: string;
  options: [string, string][];
  evidence: string;
}) {
  const id = useId(),
    selected = options.some((x) => x[0] === state.guess) ? state.guess : "",
    reason = state.reason.slice(0, 120);
  return (
    <div className="m022-guess">
      <label htmlFor={id + "-g"}>Sonuç tahminin</label>
      <ChoiceSelect
        id={id + "-g"}
        value={selected}
        onChange={(e) => set({ guess: e.target.value, checked: false })}
      >
        <option value="">Bir sonuç seç</option>
        {options.map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </ChoiceSelect>
      <p>
        Seçili:{" "}
        {options.find((x) => x[0] === selected)?.[1] ?? "Henüz seçim yok."}
      </p>
      <label htmlFor={id + "-r"}>Kısa gerekçen</label>
      <textarea
        id={id + "-r"}
        value={reason}
        maxLength={120}
        rows={3}
        placeholder="Bir sayı veya kural yaz."
        onChange={(e) =>
          set({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        type="button"
        className="secondary"
        disabled={!selected || !reason.trim()}
        onClick={() => set({ checked: true })}
      >
        Tahmini dene
      </button>
      {state.checked && selected && (
        <div className="m022-feedback" role="status">
          <strong>
            {selected === expected
              ? "Tahminin bu veriyle uyumlu."
              : "Sonuca bir daha bak."}
          </strong>
          <p>{evidence}</p>
          <p>Senin gerekçen: {reason}</p>
          <p>
            Gerekçe metni otomatik puan almaz. Seçimin sayı ve koşulla
            kıyaslanır.
          </p>
        </div>
      )}
    </div>
  );
}
function Range({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (n: number) => void;
}) {
  const id = useId();
  return (
    <div className="m022-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt(value)}</output>
      <input
        id={id}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (s: string) => void;
}) {
  const id = useId();
  return (
    <div className="m022-field">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </ChoiceSelect>
      <p>Seçili: {options.find((x) => x[0] === value)?.[1]}</p>
    </div>
  );
}
function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = useId();
  return (
    <label className="m022-toggle" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
function Frame({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section data-forge022={id} className="forge022-math-lab">
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="m022-note">
        Bu modelin kullanımı konu bitirme veya XP sayılmaz. Sayısal değerler
        ekranda yuvarlak gösterilir.
      </p>
    </section>
  );
}
type PlotContext = {
  x: (n: number) => number;
  y: (n: number) => number;
  font: number;
  unit: number;
};
function Plot({
  label,
  limit,
  children,
  points = [],
  horizontal = "x",
  vertical = "y",
}: {
  label: string;
  limit: number;
  children: (p: PlotContext) => ReactNode;
  points?: { at: Point022; label: string; className?: string; tag?: string }[];
  horizontal?: string;
  vertical?: string;
}) {
  const id = useId(),
    ref = useRef<SVGSVGElement>(null),
    [width, setWidth] = useState(600);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w > 0) setWidth(w);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const font = (17 * 600) / width,
    unit = 220 / limit,
    x = (n: number) => 300 + n * unit,
    y = (n: number) => 300 - n * unit;
  const visible = points.filter(
    (p) =>
      Number.isFinite(p.at.x) &&
      Number.isFinite(p.at.y) &&
      Math.abs(p.at.x) <= limit &&
      Math.abs(p.at.y) <= limit,
  );
  const clusters: { members: typeof visible; at: Point022 }[] = [];
  for (const p of visible) {
    const cluster = clusters.find(
      (c) =>
        Math.hypot(x(c.at.x) - x(p.at.x), y(c.at.y) - y(p.at.y)) < font * 1.6,
    );
    if (cluster) cluster.members.push(p);
    else clusters.push({ members: [p], at: p.at });
  }
  const tick = (n: number) =>
    Math.abs(n) >= 10000 ? n.toExponential(0) : fmt(n);
  return (
    <figure className="m022-figure">
      <svg
        ref={ref}
        viewBox="0 0 600 600"
        role="img"
        aria-labelledby={id + "-title"}
      >
        <title id={id + "-title"}>{label}</title>
        <defs>
          <clipPath id={id + "-clip"}>
            <rect x="80" y="80" width="440" height="440" />
          </clipPath>
        </defs>
        <g className="m022-grid">
          {[-1, -0.5, 0, 0.5, 1].map((f) => (
            <g key={f}>
              <path d={`M${300 + 220 * f} 80V520`} />
              <path d={`M80 ${300 + 220 * f}H520`} />
            </g>
          ))}
        </g>
        <path className="m022-axis" d="M72 300H532M300 532V68" />
        <g fontSize={font} className="m022-text">
          <text x="562" y="305" textAnchor="middle">
            {horizontal}
          </text>
          <text x="300" y="43" textAnchor="middle">
            {vertical}
          </text>
          <text x="80" y={300 + font * 1.2} textAnchor="start">
            {tick(-limit)}
          </text>
          <text x="520" y={300 + font * 1.2} textAnchor="end">
            {tick(limit)}
          </text>
          <text x={300 + font * 0.35} y="82" textAnchor="start">
            {tick(limit)}
          </text>
          <text x={300 + font * 0.35} y="520" textAnchor="start">
            {tick(-limit)}
          </text>
        </g>
        <g clipPath={`url(#${id}-clip)`}>{children({ x, y, font, unit })}</g>
        {visible.map((p, i) => (
          <circle
            key={i}
            data-m022-point={p.tag ?? p.label}
            cx={x(p.at.x)}
            cy={y(p.at.y)}
            r="6"
            className={p.className ?? "m022-point"}
          >
            <title>{`${p.label}: ${point(p.at)}`}</title>
          </circle>
        ))}
        <g className="m022-text" fontSize={font}>
          {clusters.map((c, i) => (
            <text
              key={i}
              x={Math.max(
                90 + font,
                Math.min(510 - font, x(c.at.x) + font * 0.65),
              )}
              y={Math.max(
                100 + font,
                Math.min(500 - font, y(c.at.y) - font * 0.5),
              )}
              textAnchor="middle"
            >
              {c.members.map((p) => p.label).join("/")}
            </text>
          ))}
        </g>
      </svg>
      <figcaption>
        Her iki eksende birim uzunluk eşit. Görünen aralık: {fmt(-limit)} ile{" "}
        {fmt(limit)}. Nokta bilgileri aşağıda da yazılı.
      </figcaption>
    </figure>
  );
}
function curvePath(
  fn: (x: number) => number | null,
  x: (n: number) => number,
  y: (n: number) => number,
  limit: number,
) {
  let path = "",
    open = false;
  for (let i = 0; i <= 320; i++) {
    const xx = -limit + (2 * limit * i) / 320,
      yy = fn(xx);
    if (yy === null || !Number.isFinite(yy) || Math.abs(yy) > limit * 4) {
      open = false;
      continue;
    }
    path += `${open ? "L" : "M"}${x(xx)} ${y(yy)} `;
    open = true;
  }
  return path;
}
function Quadratic() {
  const [s, set] = useExploration(
    "forge022-math:ayt-ikinci-dereceden-denklemler",
    { a: 1, b: -4, c: 3, guess: "", reason: "", checked: false },
  );
  const a = bounded(s.a, -5, 5),
    b = bounded(s.b, -8, 8),
    c = bounded(s.c, -8, 8),
    m = quadratic022(a, b, c),
    change = (v: Partial<typeof s>) => set({ ...v, checked: false }),
    n = m.roots.length;
  const expected =
      m.kind === "all"
        ? "all"
        : m.kind === "none"
          ? "none"
          : m.kind === "linear"
            ? "linear"
            : String(n),
    evidence =
      m.kind === "quadratic"
        ? `Δ=${fmt(m.delta!)}; gerçek kök sayısı ${n}.`
        : m.kind === "linear"
          ? `a=0, b=${fmt(b)}; tek doğrusal kök ${fmt(m.roots[0])}.`
          : m.kind === "all"
            ? "0=0 bütün gerçek x için doğru."
            : "Sıfır olmayan sabit 0’a eşit olamaz.";
  return (
    <Frame
      id="ayt-ikinci-dereceden-denklemler"
      title="Kökleri ve dereceyi keşfet"
      intro="a, b, c değerini değiştir. Grafik y=ax²+bx+c; Gerçek kök grafiğin x eksenini kestiği x değeridir. Önce gerçek kök sayısını tahmin et."
    >
      <div className="m022-controls">
        <Range
          label="a katsayısı"
          value={a}
          min={-5}
          max={5}
          onChange={(a) => change({ a })}
        />
        <Range
          label="b katsayısı"
          value={b}
          min={-8}
          max={8}
          onChange={(b) => change({ b })}
        />
        <Range
          label="c katsayısı"
          value={c}
          min={-8}
          max={8}
          onChange={(c) => change({ c })}
        />
      </div>
      <div className="m022-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => change({ a: 1, b: -4, c: 4 })}
        >
          Tek kök
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => change({ a: 1, b: 2, c: 5 })}
        >
          Karmaşık kök
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => change({ a: 0, b: 0, c: 0 })}
        >
          Özdeşlik
        </button>
      </div>
      <Plot
        label="İkinci derece ifade ve gerçek kök noktaları"
        limit={6}
        points={[
          ...m.roots.map((r, i) => ({
            at: { x: r, y: 0 },
            label: String(i + 1),
            tag: "root",
          })),
          ...(m.vertex
            ? [
                {
                  at: m.vertex,
                  label: "T",
                  className: "m022-point-alt",
                  tag: "vertex",
                },
              ]
            : []),
        ]}
      >
        {({ x, y }) => (
          <path
            data-polynomial-curve
            className="m022-curve"
            d={curvePath((t) => (a * t + b) * t + c, x, y, 6)}
          />
        )}
      </Plot>
      <div data-model-result>
        <p>
          İfade: {fmt(a)}x² + ({fmt(b)})x + ({fmt(c)}).
        </p>
        <p>{evidence}</p>
        {m.roots.length > 0 && (
          <p>Gerçek kökler: {m.roots.map(fmt).join("; ")}.</p>
        )}
        {m.complex.length > 0 && (
          <p>
            Karmaşık kökler: {m.complex.map(complex).join("; ")}. Gerçek eksende
            kesim yok.
          </p>
        )}
        {m.vertex && (
          <p>
            T noktası: {point(m.vertex)}. Kökler toplamı {fmt(m.sum!)}; çarpımı{" "}
            {fmt(m.product!)}.
          </p>
        )}
      </div>
      <Prediction
        state={s}
        set={set}
        expected={expected}
        evidence={evidence}
        options={[
          ["2", "İki gerçek kök"],
          ["1", "Bir gerçek değer"],
          ["0", "Gerçek kök yok"],
          ["linear", "Doğrusal tek kök"],
          ["all", "Bütün gerçekler"],
          ["none", "Hiç çözüm yok"],
        ]}
      />
    </Frame>
  );
}
function Complex() {
  const [s, set] = useExploration("forge022-math:ayt-karmasik-sayilar", {
      a: 1,
      b: 2,
      c: 3,
      d: -1,
      operation: "multiply",
      exponent: 2,
      guess: "",
      reason: "",
      checked: false,
    }),
    a = bounded(s.a, -4, 4),
    b = bounded(s.b, -4, 4),
    c = bounded(s.c, -4, 4),
    d = bounded(s.d, -4, 4),
    exponent = bounded(s.exponent, -4, 4),
    operation = choice<ComplexOperation022>(
      s.operation,
      ["add", "subtract", "multiply", "divide", "conjugate", "power"],
      "multiply",
    ),
    z = { x: a, y: b },
    w = { x: c, y: d },
    m = complex022(z, w, operation, exponent),
    change = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const usesOther = ["add", "subtract", "multiply", "divide"].includes(
      operation,
    ),
    result = m.result,
    limit = Math.max(
      4,
      Math.ceil(
        Math.max(
          Math.abs(a),
          Math.abs(b),
          ...(usesOther ? [Math.abs(c), Math.abs(d)] : []),
          ...(result ? [Math.abs(result.x), Math.abs(result.y)] : []),
        ) * 1.3,
      ),
    ),
    expected = !result
      ? "none"
      : result.y === 0
        ? "real"
        : result.x === 0
          ? "imaginary"
          : "both",
    evidence = result
      ? `Sonuç ${complex(result)}; gerçek kısım ${fmt(result.x)}, sanal kısım ${fmt(result.y)}.`
      : "Sıfıra bölme veya 0⁰ için bu model bir sayı atamaz.";
  const markers = [
    { at: z, label: "z", tag: "complex-z" },
    ...(usesOther
      ? [{ at: w, label: "w", className: "m022-point-alt", tag: "complex-w" }]
      : []),
    ...(result
      ? [
          {
            at: result,
            label: "s",
            className: "m022-point-result",
            tag: "complex-result",
          },
        ]
      : []),
  ];
  return (
    <Frame
      id="ayt-karmasik-sayilar"
      title="İşlemi düzlemde gör"
      intro="Yatay eksen gerçek, düşey eksen sanal katsayıdır. z ve w sayılarını değiştir; sonuç s noktasında gösterilir. İki eksen aynı ölçektedir."
    >
      <Select
        label="İşlem türü"
        value={operation}
        options={[
          ["add", "z+w"],
          ["subtract", "z−w"],
          ["multiply", "z·w"],
          ["divide", "z/w"],
          ["conjugate", "z eşleniği"],
          ["power", "z kuvveti"],
        ]}
        onChange={(operation) => change({ operation })}
      />
      <div className="m022-controls">
        <Range
          label="z gerçek kısmı"
          value={a}
          min={-4}
          max={4}
          onChange={(a) => change({ a })}
        />
        <Range
          label="z sanal kısmı"
          value={b}
          min={-4}
          max={4}
          onChange={(b) => change({ b })}
        />
        {usesOther && (
          <>
            <Range
              label="w gerçek kısmı"
              value={c}
              min={-4}
              max={4}
              onChange={(c) => change({ c })}
            />
            <Range
              label="w sanal kısmı"
              value={d}
              min={-4}
              max={4}
              onChange={(d) => change({ d })}
            />
          </>
        )}
        {operation === "power" && (
          <Range
            label="Tam sayı üs"
            value={exponent}
            min={-4}
            max={4}
            onChange={(exponent) => change({ exponent })}
          />
        )}
      </div>
      <Plot
        label="Karmaşık düzlemde z, w ve işlem sonucu"
        limit={limit}
        points={markers}
        horizontal="Re"
        vertical="Im"
      >
        {({ x, y }) => (
          <>
            <path className="m022-vector" d={`M300 300L${x(a)} ${y(b)}`} />
            {usesOther && (
              <path
                className="m022-vector-alt"
                d={`M300 300L${x(c)} ${y(d)}`}
              />
            )}{" "}
            {operation === "add" && result && (
              <path
                data-addition-path
                className="m022-dashed"
                d={`M${x(a)} ${y(b)}L${x(result.x)} ${y(result.y)}L${x(c)} ${y(d)}`}
              />
            )}{" "}
            {result && (
              <path
                data-complex-result-ray
                className="m022-curve"
                d={`M300 300L${x(result.x)} ${y(result.y)}`}
              />
            )}
          </>
        )}
      </Plot>
      <div data-model-result>
        <p>
          z={complex(z)}
          {usesOther ? `; w=${complex(w)}` : ""}.
        </p>
        <p>{evidence}</p>
        <p>
          |z|={fmt(m.modulus)}
          {m.resultModulus !== null
            ? `; |s|=${fmt(m.resultModulus)}`
            : ""}.{" "}
          {m.argument === null
            ? "z=0 için yön açısı yok."
            : `z yönü ${fmt((m.argument * 180) / Math.PI)}°.`}
        </p>
        <p>
          Grafikte z başlangıç, w ikinci sayı, s sonuçtur. Yakın noktaların
          adları bir arada yazılır.
        </p>
      </div>
      <Prediction
        state={s}
        set={set}
        expected={expected}
        evidence={evidence}
        options={[
          ["real", "Gerçek sayı"],
          ["imaginary", "Salt sanal sayı"],
          ["both", "İki kısım da var"],
          ["none", "İşlem tanımsız"],
        ]}
      />
    </Frame>
  );
}
function Inequality() {
  const [s, set] = useExploration("forge022-math:ayt-esitsizlikler", {
      first: -2,
      second: 3,
      pole: 1,
      double: false,
      mode: "quotient",
      relation: "ge",
      negative: false,
      lower: 0,
      upper: 4,
      guess: "",
      reason: "",
      checked: false,
    }),
    first = bounded(s.first, -5, 5),
    second = bounded(s.second, -5, 5),
    pole = bounded(s.pole, -5, 5),
    lower = bounded(s.lower, -6, 6),
    upper = bounded(s.upper, -6, 6),
    mode = choice(
      s.mode,
      ["product", "quotient", "system"] as const,
      "quotient",
    ),
    relation = choice<Relation022>(s.relation, ["gt", "ge", "lt", "le"], "ge"),
    leading = s.negative ? -1 : 1;
  const factors = [
      { root: first, multiplicity: s.double ? 2 : 1 },
      { root: second, multiplicity: 1 },
      ...(mode === "quotient"
        ? [{ root: pole, multiplicity: 1, denominator: true }]
        : []),
    ],
    m = signChart022(
      factors,
      leading,
      relation,
      mode === "system" ? lower : null,
      mode === "system" ? upper : null,
    ),
    change = (v: Partial<typeof s>) => set({ ...v, checked: false }),
    solution = m.solution.length ? m.solution.map(interval).join(" ∪ ") : "∅",
    selected = m.points.find(
      (p) => p.x === (mode === "quotient" ? pole : first),
    )!,
    expected = selected.denominator ? "hole" : selected.included ? "in" : "out",
    evidence = selected.denominator
      ? `x=${fmt(selected.x)} payda kökü; ifade tanımsız, nokta açık.`
      : `x=${fmt(selected.x)} için işaret ${selected.sign}; bu nokta ${selected.included ? "dahil" : "hariç"}.`;
  const ref = useRef<SVGSVGElement>(null),
    [width, setWidth] = useState(600),
    id = useId();
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setWidth(entry.contentRect.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const font = (17 * 600) / width,
    x = (n: number) => 300 + n * 32;
  return (
    <Frame
      id="ayt-esitsizlikler"
      title="İşaret ve uçları keşfet"
      intro="Kökleri ve çokluğu değiştir. Her aralıkta işaret sabit kalır; payda kökü her zaman açıktır. Bir sistemde kapalı alt ve üst sınır da uygulanır."
    >
      <Select
        label="Model türü"
        value={mode}
        options={[
          ["product", "Çarpım"],
          ["quotient", "Bölüm"],
          ["system", "Aralıkla sistem"],
        ]}
        onChange={(mode) => change({ mode })}
      />
      <Select
        label="İstenen işaret"
        value={relation}
        options={[
          ["gt", "> 0"],
          ["ge", "≥ 0"],
          ["lt", "< 0"],
          ["le", "≤ 0"],
        ]}
        onChange={(relation) => change({ relation })}
      />
      <div className="m022-controls">
        <Range
          label="Birinci kök"
          value={first}
          min={-5}
          max={5}
          onChange={(first) => change({ first })}
        />
        <Range
          label="İkinci kök"
          value={second}
          min={-5}
          max={5}
          onChange={(second) => change({ second })}
        />
        {mode === "quotient" && (
          <Range
            label="Payda kökü"
            value={pole}
            min={-5}
            max={5}
            onChange={(pole) => change({ pole })}
          />
        )}{" "}
        {mode === "system" && (
          <>
            <Range
              label="Alt sınır"
              value={lower}
              min={-6}
              max={6}
              onChange={(lower) => change({ lower })}
            />
            <Range
              label="Üst sınır"
              value={upper}
              min={-6}
              max={6}
              onChange={(upper) => change({ upper })}
            />
          </>
        )}
      </div>
      <Toggle
        label="İlk kök çift katlı"
        value={s.double}
        onChange={(double) => change({ double })}
      />
      <Toggle
        label="Baş katsayı negatif"
        value={s.negative}
        onChange={(negative) => change({ negative })}
      />
      <figure className="m022-figure">
        <svg
          ref={ref}
          viewBox="0 0 600 360"
          role="img"
          aria-labelledby={id + "-title"}
        >
          <title id={id + "-title"}>
            Gerçek işaret çizelgesi ve açık kapalı uçlar
          </title>
          <path className="m022-axis" d="M45 210H555" />
          {m.regions.map((r, i) => {
            const lo = Number.isFinite(r.lo) ? r.lo : -7,
              hi = Number.isFinite(r.hi) ? r.hi : 7;
            return (
              <g key={i}>
                {r.included && (
                  <path
                    data-solution-region
                    className="m022-solution"
                    d={`M${x(lo)} 210H${x(hi)}`}
                  />
                )}
                <text
                  className="m022-text"
                  fontSize={font}
                  x={x((lo + hi) / 2)}
                  y="120"
                  textAnchor="middle"
                >
                  {r.sign === 1 ? "+" : "−"}
                </text>
              </g>
            );
          })}
          {m.points.map((p, i) => (
            <g key={p.x}>
              <circle
                data-sign-point
                data-included={p.included}
                data-denominator={p.denominator > 0}
                className={p.included ? "m022-point-result" : "m022-open"}
                cx={x(p.x)}
                cy="210"
                r="7"
              />
              <text
                className="m022-text"
                fontSize={font}
                x={x(p.x)}
                y={i % 2 ? 210 + font * 2.3 : 210 + font * 1.3}
                textAnchor="middle"
              >
                {fmt(p.x)}
              </text>
            </g>
          ))}
          <g className="m022-text" fontSize={font}>
            <text x="45" y="205" textAnchor="middle">
              −∞
            </text>
            <text x="555" y="205" textAnchor="middle">
              ∞
            </text>
          </g>
        </svg>
        <figcaption>
          Yatay eksen x değeridir; her aralıkta + ve − ifadenin işareti. Kalın
          parça çözüm, dolu nokta dahil, boş nokta hariçtir.
        </figcaption>
      </figure>
      <div data-model-result>
        <p>
          İfade: {leading < 0 ? "−" : ""}(x−({fmt(first)})){s.double ? "²" : ""}
          (x−({fmt(second)}))
          {mode === "quotient" ? ` / (x−(${fmt(pole)}))` : ""}{" "}
          {{ gt: ">", ge: "≥", lt: "<", le: "≤" }[relation]} 0.
        </p>
        {mode === "system" && (
          <p>
            Ek koşul: {fmt(lower)} ≤ x ≤ {fmt(upper)}.{" "}
            {lower > upper ? "Alt sınır üstten büyük; ortak bölge yok." : ""}
          </p>
        )}
        <p>Çözüm kümesi: {solution}.</p>
        <p>{evidence}</p>
        {m.points.map((p) => (
          <p key={p.x}>
            x={fmt(p.x)}:{" "}
            {p.denominator
              ? "Payda sıfır; tanımsız."
              : `Değerin işareti ${p.sign}; ${p.included ? "çözüme dahil" : "çözüm dışı"}.`}
          </p>
        ))}
      </div>
      <Prediction
        state={s}
        set={set}
        expected={expected}
        evidence={evidence}
        options={[
          ["in", "İşaretli nokta dahil"],
          ["out", "İşaretli nokta hariç"],
          ["hole", "İşaretli nokta delik"],
        ]}
      />
    </Frame>
  );
}
function Parabola() {
  const [s, set] = useExploration("forge022-math:ayt-parabol", {
      a: 1,
      b: -4,
      c: 1,
      slope: 1,
      intercept: 2,
      left: -1,
      right: 4,
      guess: "",
      reason: "",
      checked: false,
    }),
    rawA = bounded(s.a, -4, 4),
    a = rawA || 1,
    b = bounded(s.b, -8, 8),
    c = bounded(s.c, -8, 8),
    slope = bounded(s.slope, -4, 4),
    intercept = bounded(s.intercept, -8, 8),
    left = bounded(s.left, -6, 6),
    right = bounded(s.right, -6, 6),
    lo = Math.min(left, right),
    hi = Math.max(left, right),
    m = parabola022(a, b, c, slope, intercept, lo, hi),
    change = (v: Partial<typeof s>) => set({ ...v, checked: false }),
    expected = String(m.intersections.length),
    evidence = `Doğru ile ortak çözümün Δ değeri ${fmt(m.intersectionDelta!)}; ${m.intersections.length} farklı ortak nokta.`;
  const p = m.tangent,
    normal = slope * p.x - p.y + intercept,
    H = {
      x: p.x - (normal * slope) / (slope * slope + 1),
      y: p.y + normal / (slope * slope + 1),
    };
  return (
    <Frame
      id="ayt-parabol"
      title="Parabolü doğruyla incele"
      intro="Parabolün a katsayısı sıfır olamaz. Doğru y=mx+n olur. Kapalı çalışma aralığında iki uç ve aradaysa tepe en büyük/en küçük değer için adaydır."
    >
      <div className="m022-controls">
        <Select
          label="a katsayısı"
          value={String(a)}
          options={[-4, -3, -2, -1, 1, 2, 3, 4].map((v) => [
            String(v),
            String(v),
          ])}
          onChange={(a) => change({ a: Number(a) })}
        />
        <Range
          label="b katsayısı"
          value={b}
          min={-8}
          max={8}
          onChange={(b) => change({ b })}
        />
        <Range
          label="c katsayısı"
          value={c}
          min={-8}
          max={8}
          onChange={(c) => change({ c })}
        />
        <Range
          label="Doğru eğimi m"
          value={slope}
          min={-4}
          max={4}
          onChange={(slope) => change({ slope })}
        />
        <Range
          label="Doğru kesimi n"
          value={intercept}
          min={-8}
          max={8}
          onChange={(intercept) => change({ intercept })}
        />
        <Range
          label="Aralık ucu A"
          value={left}
          min={-6}
          max={6}
          onChange={(left) => change({ left })}
        />
        <Range
          label="Aralık ucu B"
          value={right}
          min={-6}
          max={6}
          onChange={(right) => change({ right })}
        />
      </div>
      <div className="m022-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => change({ a: 1, b: 0, c: 0, slope: 2, intercept: -3 })}
        >
          Dış doğru
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => change({ a: 1, b: 0, c: 0, slope: 2, intercept: -1 })}
        >
          Teğet doğru
        </button>
      </div>
      <Plot
        label="Parabol, doğru ve gerçek ortak noktalar"
        limit={8}
        points={[
          {
            at: m.vertex,
            label: "T",
            tag: "parabola-vertex",
            className: "m022-point-alt",
          },
          ...m.intersections.map((at, i) => ({
            at,
            label: String(i + 1),
            tag: "intersection",
          })),
          ...(m.intersections.length === 0
            ? [
                { at: p, label: "P", tag: "closest" },
                {
                  at: H,
                  label: "H",
                  tag: "line-foot",
                  className: "m022-point-result",
                },
              ]
            : []),
        ]}
      >
        {({ x, y }) => (
          <>
            <path
              data-parabola-curve
              className="m022-curve"
              d={curvePath((t) => (a * t + b) * t + c, x, y, 8)}
            />
            <path
              data-secant-line
              className="m022-line"
              d={`M${x(-8)} ${y(-8 * slope + intercept)}L${x(8)} ${y(8 * slope + intercept)}`}
            />
            <path className="m022-dashed" d={`M${x(m.axis)} 80V520`} />
            {m.intersections.length === 0 && (
              <path
                data-shortest-segment
                className="m022-vector-alt"
                d={`M${x(p.x)} ${y(p.y)}L${x(H.x)} ${y(H.y)}`}
              />
            )}
          </>
        )}
      </Plot>
      <div data-model-result>
        <p>
          f(x)={fmt(a)}x²+({fmt(b)})x+({fmt(c)}). Doğru: y=({fmt(slope)})x+(
          {fmt(intercept)}).
        </p>
        <p>
          Tepe T: {point(m.vertex)}; simetri x={fmt(m.axis)}.
        </p>
        <p>
          {evidence} {m.intersections.map(point).join("; ")}
        </p>
        <p>
          Kapalı aralık: [{fmt(lo)}; {fmt(hi)}]. En küçük {fmt(m.minimum.y)}, x=
          {fmt(m.minimum.x)}. En büyük {fmt(m.maximum.y)}, x={fmt(m.maximum.x)}.
        </p>
        <p>
          Tüm gerçek x değerleri için görüntü:{" "}
          {a > 0 ? `[${fmt(m.vertex.y)}; ∞)` : `(−∞; ${fmt(m.vertex.y)}]`}.
        </p>
        <p>
          Doğruya en kısa uzaklık: {fmt(m.distance)} birim.{" "}
          {m.intersections.length === 0
            ? `En yakın parabol noktası P=${point(p)}; doğru ayağı H=${point(H)}.`
            : "Ortak noktada uzaklık 0 olur."}
        </p>
        <p>
          Grafikte mercan eğri parabol, mavi doğru ikinci denklem, T tepedir.
          Çizim dışında kalan bir nokta varsa tam koordinatı bu metinde kalır.
        </p>
      </div>
      <Prediction
        state={s}
        set={set}
        expected={expected}
        evidence={evidence}
        options={[
          ["2", "İki ortak nokta"],
          ["1", "Tek temas noktası"],
          ["0", "Ortak nokta yok"],
        ]}
      />
    </Frame>
  );
}
function Trigonometry() {
  const [s, set] = useExploration("forge022-math:ayt-trigonometri", {
      mode: "circle",
      angle: 30,
      kind: "sin",
      amplitude: 2,
      frequency: 1,
      phase: 0,
      offset: 0,
      sideB: 5,
      sideC: 7,
      triangleAngle: 60,
      target: 0.5,
      guess: "",
      reason: "",
      checked: false,
    }),
    mode = choice(
      s.mode,
      ["circle", "wave", "triangle", "roots"] as const,
      "circle",
    ),
    angle = bounded(s.angle, -720, 720, 15),
    kind = choice<TrigFunction022>(s.kind, ["sin", "cos", "tan", "cot"], "sin"),
    amplitude = bounded(s.amplitude, 1, 3),
    frequency = bounded(s.frequency, -3, 3),
    phase = bounded(s.phase, -180, 180, 15),
    offset = bounded(s.offset, -3, 3),
    sideB = bounded(s.sideB, 1, 8),
    sideC = bounded(s.sideC, 1, 8),
    triangleAngle = bounded(s.triangleAngle, 15, 165, 15),
    target = bounded(s.target, -2, 2, 0.5),
    m = trig022(angle),
    wave = wave022(kind, amplitude, frequency, phase, offset, angle),
    triangle = triangle022(sideB, sideC, triangleAngle),
    roots = trigRoots022(kind, target),
    change = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const circleExpected = m.x === 0 ? "zero" : m.x > 0 ? "positive" : "negative",
    expected =
      mode === "circle"
        ? circleExpected
        : mode === "wave"
          ? wave.value === null
            ? "undefined"
            : frequency === 0
              ? "constant"
              : "periodic"
          : mode === "triangle"
            ? triangleAngle < 90
              ? "acute"
              : triangleAngle === 90
                ? "right"
                : "obtuse"
            : String(roots.length);
  const evidence =
    mode === "circle"
      ? `cos=${fmt(m.x)}, sin=${fmt(m.y)}. P=${point({ x: m.x, y: m.y })}.`
      : mode === "wave"
        ? wave.value === null
          ? "Seçili açıda payda 0; değer yok."
          : `Değer ${fmt(wave.value)}; ${wave.period === null ? "sabit durumda en küçük pozitif dönem yok" : `temel dönem ${fmt(wave.period)}°`}.`
        : mode === "triangle"
          ? `A=${fmt(triangleAngle)}°; a²=${fmt(triangle.a ** 2)}, b²+c²=${fmt(sideB ** 2 + sideC ** 2)}.`
          : `[0°; 360°) içinde ${roots.length} kök: ${roots.map(fmt).join("; ") || "yok"}.`;
  const waveLines = useMemo(() => {
    const lines: { x: number; y: number }[][] = [];
    if (mode !== "wave") return lines;
    let lastBranch: number | null = null;
    for (let i = 0; i <= 480; i++) {
      const xx = -360 + (720 * i) / 480,
        v = wave022(kind, amplitude, frequency, phase, offset, xx);
      if (v.value === null || Math.abs(v.value) > 16) {
        lastBranch = null;
        continue;
      }
      if (lastBranch !== v.branch) {
        lines.push([]);
        lastBranch = v.branch;
      }
      lines.at(-1)!.push({ x: xx / 60, y: v.value });
    }
    return lines;
  }, [mode, kind, amplitude, frequency, phase, offset]);
  const options: [string, string][] =
    mode === "circle"
      ? [
          ["positive", "cos pozitif"],
          ["negative", "cos negatif"],
          ["zero", "cos sıfır"],
        ]
      : mode === "wave"
        ? [
            ["periodic", "Değer var; dalga"],
            ["constant", "Sabit değer"],
            ["undefined", "Bu açıda değer yok"],
          ]
        : mode === "triangle"
          ? [
              ["acute", "A açısı dar"],
              ["right", "A açısı dik"],
              ["obtuse", "A açısı geniş"],
            ]
          : [
              ["0", "Kök yok"],
              ["1", "Bir kök"],
              ["2", "İki kök"],
            ];
  return (
    <Frame
      id="ayt-trigonometri"
      title="Çemberden denkleme geç"
      intro="Dört görünüm aynı trig kuralları ile farklı işler yapar. Bu modelin açı ve dalga eksen birimi derecedir; tam tur 360° veya 2π radyandır."
    >
      <Select
        label="Keşif türü"
        value={mode}
        options={[
          ["circle", "Birim çember"],
          ["wave", "Dalga grafiği"],
          ["triangle", "Üçgen"],
          ["roots", "Denklem kökleri"],
        ]}
        onChange={(mode) => change({ mode })}
      />
      {(mode === "circle" || mode === "wave") && (
        <Range
          label="Açı (derece)"
          value={angle}
          min={-720}
          max={720}
          step={15}
          onChange={(angle) => change({ angle })}
        />
      )}{" "}
      {(mode === "wave" || mode === "roots") && (
        <Select
          label="Fonksiyon türü"
          value={kind}
          options={[
            ["sin", "sin"],
            ["cos", "cos"],
            ["tan", "tan"],
            ["cot", "cot"],
          ]}
          onChange={(kind) => change({ kind })}
        />
      )}{" "}
      {mode === "wave" && (
        <div className="m022-controls">
          <Range
            label="Genlik A"
            value={amplitude}
            min={1}
            max={3}
            onChange={(amplitude) => change({ amplitude })}
          />
          <Range
            label="İç çarpan b"
            value={frequency}
            min={-3}
            max={3}
            onChange={(frequency) => change({ frequency })}
          />
          <Range
            label="Faz (derece)"
            value={phase}
            min={-180}
            max={180}
            step={15}
            onChange={(phase) => change({ phase })}
          />
          <Range
            label="Dikey kayma"
            value={offset}
            min={-3}
            max={3}
            onChange={(offset) => change({ offset })}
          />
        </div>
      )}{" "}
      {mode === "triangle" && (
        <div className="m022-controls">
          <Range
            label="b kenarı"
            value={sideB}
            min={1}
            max={8}
            onChange={(sideB) => change({ sideB })}
          />
          <Range
            label="c kenarı"
            value={sideC}
            min={1}
            max={8}
            onChange={(sideC) => change({ sideC })}
          />
          <Range
            label="Aradaki A (derece)"
            value={triangleAngle}
            min={15}
            max={165}
            step={15}
            onChange={(triangleAngle) => change({ triangleAngle })}
          />
        </div>
      )}{" "}
      {mode === "roots" && (
        <Range
          label="Hedef değer"
          value={target}
          min={-2}
          max={2}
          step={0.5}
          onChange={(target) => change({ target })}
        />
      )}
      {mode === "circle" && (
        <Plot
          label="Birim çemberde işaretli sinüs ve kosinüs"
          limit={1.5}
          points={[{ at: { x: m.x, y: m.y }, label: "P", tag: "unit-circle" }]}
        >
          {({ x, y, unit }) => (
            <>
              <circle className="m022-line" cx="300" cy="300" r={unit} />
              <path
                data-unit-ray
                className="m022-curve"
                d={`M300 300L${x(m.x)} ${y(m.y)}`}
              />
              <path
                className="m022-dashed"
                d={`M300 ${y(m.y)}H${x(m.x)}V300`}
              />
            </>
          )}
        </Plot>
      )}
      {mode === "wave" && (
        <>
          <Plot
            label="Gerçek trig dalgası ve ayrı tanım dalları"
            limit={8}
            horizontal="u"
            vertical="f"
            points={
              Math.abs(angle) <= 480 && wave.value !== null
                ? [
                    {
                      at: { x: angle / 60, y: wave.value },
                      label: "P",
                      tag: "wave-value",
                    },
                  ]
                : []
            }
          >
            {({ x, y }) => (
              <>
                {waveLines.map((line, i) => (
                  <path
                    key={i}
                    data-trig-branch
                    className="m022-curve"
                    d={line
                      .map((p, j) => `${j ? "L" : "M"}${x(p.x)} ${y(p.y)}`)
                      .join(" ")}
                  />
                ))}
              </>
            )}
          </Plot>
          <p>
            Yatay eksende u=x/60°; u=1 adımı 60° eder. x verisi −360° ile 360°
            arasında çizilir. Düşey eksen f(x), kesim sınırı −8 ile 8.
          </p>
        </>
      )}
      {mode === "triangle" && (
        <Plot
          label="İki kenar ve aradaki açıdan gerçek üçgen"
          limit={10}
          points={triangle.points.map((at, i) => ({
            at,
            label: ["A", "B", "C"][i],
            tag: "triangle-vertex",
          }))}
        >
          {({ x, y }) => (
            <path
              data-triangle
              className="m022-triangle"
              d={
                triangle.points
                  .map((p, i) => `${i ? "L" : "M"}${x(p.x)} ${y(p.y)}`)
                  .join(" ") + "Z"
              }
            />
          )}
        </Plot>
      )}
      {mode === "roots" && (
        <Plot
          label="Bir tam turdaki gerçek denklem kökleri"
          limit={1.5}
          points={roots.map((r, i) => {
            const p = trig022(r);
            return {
              at: { x: p.x, y: p.y },
              label: String(i + 1),
              tag: "trig-root",
            };
          })}
        >
          {({ unit, x, y }) => (
            <>
              <circle className="m022-line" cx="300" cy="300" r={unit} />
              {roots.map((r, i) => {
                const p = trig022(r);
                return (
                  <path
                    key={i}
                    data-root-ray
                    className="m022-curve"
                    d={`M300 300L${x(p.x)} ${y(p.y)}`}
                  />
                );
              })}
            </>
          )}
        </Plot>
      )}
      <div data-model-result>
        {mode === "circle" && (
          <>
            <p>
              Asıl açı {fmt(angle)}° = {fmt(angle / 180)}π radyan. Esas ölçü{" "}
              {fmt(m.degrees)}°.
            </p>
            <p>
              P={point({ x: m.x, y: m.y })}; cos={fmt(m.x)}, sin={fmt(m.y)}.
            </p>
            <p>
              tan={m.tan === null ? "tanımsız" : fmt(m.tan)}; cot=
              {m.cot === null ? "tanımsız" : fmt(m.cot)}.
            </p>
            <p>
              sec={m.sec === null ? "tanımsız" : fmt(m.sec)}; csc=
              {m.csc === null ? "tanımsız" : fmt(m.csc)}.
            </p>
          </>
        )}
        {mode === "wave" && (
          <>
            <p>
              f(x)={fmt(amplitude)}·{kind}(({fmt(frequency)})x+({fmt(phase)}
              °))+({fmt(offset)}).
            </p>
            <p>
              x={fmt(angle)}° için {evidence}
            </p>
            {wave.range && <p>Görüntü: [{wave.range.map(fmt).join("; ")}].</p>}
            <p>
              Kutupların iki yanı tek çizgiyle birleşmez. Genlik bu modelde 0
              değildir; b=0 seçimi sabit özel durumu gösterir.
            </p>
          </>
        )}
        {mode === "triangle" && (
          <>
            <p>
              A={fmt(triangleAngle)}°, b={fmt(sideB)}, c={fmt(sideC)} birim.
            </p>
            <p>
              a={fmt(triangle.a)} birim; alan={fmt(triangle.area)} birim².
            </p>
            <p>
              B={fmt((triangle.B * 180) / Math.PI)}°, C=
              {fmt((triangle.C * 180) / Math.PI)}°. Çevrel yarıçap R=
              {fmt(triangle.circumradius)} birim.
            </p>
            <p>
              A={point(triangle.points[0])}; B={point(triangle.points[1])}; C=
              {point(triangle.points[2])}. a kenarı A’nın karşısında.
            </p>
          </>
        )}
        {mode === "roots" && (
          <>
            <p>
              {kind}(x)={fmt(target)}; aralık [0°; 360°).
            </p>
            <p>{evidence}</p>
            <p>
              Bütün gerçek çözümler için{" "}
              {kind === "sin" || kind === "cos" ? "360°" : "180°"} katlı
              tekrarlar gerekir. 360° bu yarı açık aralığa dahil değil.
            </p>
          </>
        )}
      </div>
      <Prediction
        state={s}
        set={set}
        expected={expected}
        evidence={evidence}
        options={options}
      />
    </Frame>
  );
}
export default function Forge022MathLab({ lessonId }: { lessonId: string }) {
  switch (lessonId) {
    case "ayt-ikinci-dereceden-denklemler":
      return <Quadratic />;
    case "ayt-karmasik-sayilar":
      return <Complex />;
    case "ayt-esitsizlikler":
      return <Inequality />;
    case "ayt-parabol":
      return <Parabola />;
    case "ayt-trigonometri":
      return <Trigonometry />;
    default:
      return null;
  }
}
