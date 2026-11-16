import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import { useApp } from "../store";
import {
  angleIdentity023,
  waveRoots023,
  logarithm023,
  sequence023,
  piecewiseLimit023,
  removableLimit023,
  type SequenceKind023,
} from "./forge023Math";
import "./forge023Math.css";

const fmt = (x: number) =>
  new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 5,
    signDisplay: "negative",
  }).format(x === 0 ? 0 : x);
const axis = (x: number) =>
  Math.abs(x) >= 1000 ? x.toExponential(0).replace("+", "") : fmt(x);
const ids = [
  "ayt-toplam-fark-yarim-aci",
  "ayt-trigonometrik-denklemler",
  "ayt-logaritma",
  "ayt-diziler",
  "ayt-limit-sureklilik",
];
const bounded = (x: number, low: number, high: number, step = 1) =>
  Number.isFinite(x)
    ? Math.max(low, Math.min(high, Math.round(x / step) * step))
    : low;
type MapPoint = (x: number, y: number) => { x: number; y: number };
function Graph({
  label,
  xmin,
  xmax,
  ymin,
  ymax,
  children,
}: {
  label: string;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  children: (p: MapPoint) => ReactNode;
}) {
  const clip = useId();
  const p: MapPoint = (x, y) => ({
    x: 64 + ((x - xmin) / (xmax - xmin)) * 264,
    y: 312 - ((y - ymin) / (ymax - ymin)) * 264,
  });
  const axisX = p(Math.max(xmin, Math.min(xmax, 0)), 0).x,
    axisY = p(0, Math.max(ymin, Math.min(ymax, 0))).y;
  return (
    <svg
      className="math023-plot"
      viewBox="0 0 360 360"
      role="img"
      aria-label={label}
      data-xmin={xmin}
      data-xmax={xmax}
      data-ymin={ymin}
      data-ymax={ymax}
    >
      <defs>
        <clipPath id={clip}>
          <rect x="56" y="40" width="280" height="280" />
        </clipPath>
      </defs>
      <rect className="math023-grid" x="64" y="48" width="264" height="264" />
      <path className="math023-axis" d={`M64 ${axisY}H328 M${axisX} 48V312`} />
      <text x="64" y="340" textAnchor="start">
        {axis(xmin)}
      </text>
      <text x="328" y="340" textAnchor="end">
        {axis(xmax)}
      </text>
      <text x="60" y="55" textAnchor="end">
        {axis(ymax)}
      </text>
      <text x="60" y="312" textAnchor="end">
        {axis(ymin)}
      </text>
      <g clipPath={`url(#${clip})`}>{children(p)}</g>
    </svg>
  );
}
function curve(
  p: MapPoint,
  fn: (x: number) => number,
  min: number,
  max: number,
) {
  return Array.from({ length: 161 }, (_, i) => {
    const x = min + ((max - min) * i) / 160,
      q = p(x, fn(x));
    return `${i ? "L" : "M"}${q.x},${q.y}`;
  }).join(" ");
}
function Range({
  title,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  title: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="math023-range">
      <span>
        {title}: <strong>{fmt(value)}</strong>
      </span>
      <input
        type="range"
        aria-label={title}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
      />
    </label>
  );
}
const defaults = {
  a: 30,
  b: 45,
  subtract: false,
  A: 1,
  B: 0,
  C: 0.5,
  frequency: 1,
  phase: 0,
  closed: false,
  base: "2",
  x: 4,
  horizontal: 0,
  vertical: 0,
  sequence: "arithmetic",
  first: 2,
  parameter: 3,
  count: 6,
  mode: "piecewise",
  origin: 0,
  left: 2,
  right: 2,
  value: 2,
  leftSlope: 1,
  rightSlope: 1,
  defined: true,
  approach: 1,
  guess: "",
  reason: "",
  checked: false,
};

export default function Forge023MathLab({ lessonId }: { lessonId: string }) {
  const explorationId = `forge023-math:${lessonId}`,
    [saved, set] = useExploration(explorationId, defaults),
    raw = useApp().state.explorations[explorationId];
  if (!ids.includes(lessonId)) return null;
  const s = {
    ...saved,
    base: ["0.5", "2", "3", "10", "e"].includes(saved.base) ? saved.base : "2",
    sequence: ["arithmetic", "geometric", "recurrence", "triangular"].includes(
      saved.sequence,
    )
      ? saved.sequence
      : "arithmetic",
    mode: saved.mode === "hole" ? "hole" : "piecewise",
    a: bounded(saved.a, -180, 180),
    b: bounded(saved.b, -180, 180),
    A: bounded(saved.A, -6, 6, 0.5),
    B: bounded(saved.B, -6, 6, 0.5),
    C: bounded(saved.C, -6, 6, 0.5),
    frequency: bounded(saved.frequency, 1, 4),
    phase: bounded(saved.phase, -180, 180),
    x: bounded(saved.x, 0.25, 12, 0.25),
    horizontal: bounded(saved.horizontal, -3, 3),
    vertical: bounded(saved.vertical, -3, 3),
    first: bounded(saved.first, -5, 5),
    parameter: bounded(saved.parameter, -3, 3, 0.5),
    count: bounded(saved.count, 2, 12),
    origin: bounded(saved.origin, -2, 2),
    left: bounded(saved.left, -5, 5),
    right: bounded(saved.right, -5, 5),
    value: bounded(saved.value, -5, 5),
    leftSlope: bounded(saved.leftSlope, -2, 2),
    rightSlope: bounded(saved.rightSlope, -2, 2),
    approach: bounded(saved.approach, 1, 5),
    reason: saved.reason.slice(0, 120),
  };
  const persist = (delta: Partial<typeof saved>) => set({ ...s, ...delta });
  const change = (delta: Partial<typeof saved>) =>
    persist({ ...delta, checked: false });
  const active: (keyof typeof defaults)[] =
    lessonId === ids[0]
      ? ["a", "b", "subtract"]
      : lessonId === ids[1]
        ? ["A", "B", "C", "frequency", "phase", "closed"]
        : lessonId === ids[2]
          ? ["base", "x", "horizontal", "vertical"]
          : lessonId === ids[3]
            ? [
                "sequence",
                "count",
                ...(s.sequence === "triangular"
                  ? []
                  : (["first", "parameter"] as const)),
              ]
            : [
                "mode",
                "origin",
                "defined",
                "approach",
                ...(s.defined ? (["value"] as const) : []),
                ...(s.mode === "hole"
                  ? []
                  : (["left", "right", "leftSlope", "rightSlope"] as const)),
              ];
  const validSelection = active.every(
    (key) =>
      saved[key] === s[key] &&
      (!raw ||
        !Object.hasOwn(raw, key) ||
        typeof raw[key] === typeof defaults[key]),
  );
  let title = "",
    intro = "",
    controls: ReactNode,
    diagram: ReactNode,
    result: ReactNode,
    expected = "",
    options: [string, string][] = [];
  if (lessonId === ids[0]) {
    title = "Açıyı döndür, katkıları karşılaştır";
    intro =
      "A ve B derece cinsindedir. Toplamı veya farkı seç; yeni yarıçapın iki değerini ve yarım açının işaretini izle.";
    const m = angleIdentity023(s.a, s.b, s.subtract),
      point = (angle: number) => ({
        x: 180 + 112 * Math.cos((angle * Math.PI) / 180),
        y: 180 - 112 * Math.sin((angle * Math.PI) / 180),
      });
    const start = point(s.a),
      end = point(m.theta),
      half = point(m.theta / 2);
    controls = (
      <>
        <Range
          title="A açısı"
          value={s.a}
          min={-180}
          max={180}
          onChange={(a) => change({ a })}
        />
        <Range
          title="B açısı"
          value={s.b}
          min={-180}
          max={180}
          onChange={(b) => change({ b })}
        />
        <label>
          İşlem
          <select
            aria-label="İşlem"
            value={s.subtract ? "minus" : "plus"}
            onChange={(e) => change({ subtract: e.target.value === "minus" })}
          >
            <option value="plus">Toplama</option>
            <option value="minus">Çıkarma</option>
          </select>
        </label>
      </>
    );
    diagram = (
      <svg
        viewBox="0 0 360 360"
        role="img"
        aria-label="Başlangıç, sonuç ve yarım açı yarıçapları"
        className="math023-plot"
        data-angle={m.theta}
      >
        <path className="math023-axis" d="M40 180H320 M180 40V320" />
        <circle className="math023-circle" cx="180" cy="180" r="112" />
        <line
          className="math023-before"
          x1="180"
          y1="180"
          x2={start.x}
          y2={start.y}
        />
        <line
          className="math023-main"
          x1="180"
          y1="180"
          x2={end.x}
          y2={end.y}
        />
        <line
          className="math023-half"
          x1="180"
          y1="180"
          x2={half.x}
          y2={half.y}
        />
        <path className="math023-projection" d={`M${end.x} 180V${end.y}H180`} />
        <circle
          className="math023-dot"
          data-final-angle-point
          cx={end.x}
          cy={end.y}
          r="6"
        />
        <text x="318" y="205" textAnchor="end">
          x
        </text>
        <text x="190" y="45">
          y
        </text>
      </svg>
    );
    result = (
      <>
        <p>
          Son açı: <strong data-angle-result>{fmt(m.theta)}°</strong>; yarısı{" "}
          {fmt(m.theta / 2)}°.
        </p>
        <p>
          Sinüs: {fmt(m.direct.sin)}. Açılım: {fmt(m.expandedSin)}.
        </p>
        <p>
          Kosinüs: {fmt(m.direct.cos)}. Açılım: {fmt(m.expandedCos)}.
        </p>
        <p>
          Tanjant:{" "}
          {m.tangent === null ? "Tanımsız; kosinüs sıfır." : fmt(m.tangent)}.
        </p>
        <p>
          Yarım açı: sinüs {fmt(m.half.sin)}, kosinüs {fmt(m.half.cos)}.
          Kareleri {fmt(m.halfSinSquared)} ve {fmt(m.halfCosSquared)}.
        </p>
        <p className="small muted">
          Kesik çizgi başlangıç, düz çizgi sonuç, noktalı çizgi yarım açıdır.
          Karekökün işareti yarım açının hangi bölgede yer aldığına bağlıdır.
        </p>
      </>
    );
    expected =
      m.direct.sin === 0 ? "zero" : m.direct.sin > 0 ? "positive" : "negative";
    options = [
      ["positive", "Sinüs pozitif"],
      ["zero", "Sinüs sıfır"],
      ["negative", "Sinüs negatif"],
    ];
  } else if (lessonId === ids[1]) {
    title = "Denklem ile yatay seviyeyi kesiştir";
    intro =
      "A·sin(kx+φ)+B·cos(kx+φ)=C. x ve φ derece; aralık soldan kapalıdır. Genlik, kök sayısı ve sağ ucun etkisini ayrı izle.";
    const m = waveRoots023(
        s.A,
        s.B,
        s.C,
        s.frequency,
        s.phase,
        0,
        360,
        s.closed,
      ),
      extent = Math.ceil(Math.max(1, m.amplitude, Math.abs(s.C))) + 1;
    controls = (
      <>
        <Range
          title="Sinüs katsayısı A"
          value={s.A}
          min={-6}
          max={6}
          step={0.5}
          onChange={(A) => change({ A })}
        />
        <Range
          title="Kosinüs katsayısı B"
          value={s.B}
          min={-6}
          max={6}
          step={0.5}
          onChange={(B) => change({ B })}
        />
        <Range
          title="Hedef C"
          value={s.C}
          min={-6}
          max={6}
          step={0.5}
          onChange={(C) => change({ C })}
        />
        <Range
          title="Frekans k"
          value={s.frequency}
          min={1}
          max={4}
          onChange={(frequency) => change({ frequency })}
        />
        <Range
          title="Kayma φ"
          value={s.phase}
          min={-180}
          max={180}
          onChange={(phase) => change({ phase })}
        />
        <label className="math023-check">
          <input
            type="checkbox"
            checked={s.closed}
            onChange={(e) => change({ closed: e.target.checked })}
          />
          360° ucunu dahil et
        </label>
      </>
    );
    diagram = (
      <Graph
        label="Dalga ve C seviyesinin kesişimleri"
        xmin={0}
        xmax={360}
        ymin={-extent}
        ymax={extent}
      >
        {(p) => (
          <>
            <path className="math023-main" d={curve(p, m.valueAt, 0, 360)} />
            <path
              className="math023-level"
              d={`M${p(0, s.C).x} ${p(0, s.C).y}H${p(360, s.C).x}`}
            />
            {m.roots.map((x) => (
              <circle
                key={x}
                data-wave-root={x}
                className="math023-dot"
                cx={p(x, s.C).x}
                cy={p(x, s.C).y}
                r="6"
              />
            ))}
          </>
        )}
      </Graph>
    );
    result = (
      <>
        <p>
          Genlik: {fmt(m.amplitude)}. Aralık: [0°, 360°{s.closed ? "]" : ")"}.
        </p>
        <p data-wave-result>
          {m.kind === "all"
            ? "Aralıktaki her x çözümdür."
            : m.roots.length
              ? `${m.roots.length} farklı kök: ${m.roots.map((x) => fmt(x) + "°").join("; ")}.`
              : "Bu aralıkta kök yok."}
        </p>
        <p>
          İfade aralığı: [{fmt(-m.amplitude)}; {fmt(m.amplitude)}]. Sağ taraf bu
          sınırların dışında ise çözüm çıkmaz.
        </p>
        <p className="small muted">
          Yatay eksen derece, düşey eksen ifade değeridir. Genel kökler ondalık
          yaklaşım olarak gösterilir; çember ve grafik aynı fiziksel birim
          değildir.
        </p>
      </>
    );
    expected =
      m.kind === "all"
        ? "all"
        : m.roots.length > 4
          ? "many"
          : String(m.roots.length);
    options = [
      ["0", "0 kök"],
      ["1", "1 kök"],
      ["2", "2 kök"],
      ["3", "3 kök"],
      ["4", "4 kök"],
      ["many", "4’ten çok"],
      ["all", "Her x"],
    ];
  } else if (lessonId === ids[2]) {
    title = "Logaritma ve tersini gör";
    intro =
      "f(x)=log_a(x−h)+v. Taban, nokta ve kaymaları değiştir; tanım alanı ile ters üstel hesabı birlikte denetle.";
    const base = ["0.5", "2", "3", "10", "e"].includes(s.base) ? s.base : "2",
      a = base === "e" ? Math.E : Number(base),
      m = logarithm023(a, s.x, s.horizontal, s.vertical),
      extent = Math.ceil(
        Math.max(
          5,
          Math.abs(s.x),
          Math.abs(s.horizontal),
          Math.abs(m.value ?? 0),
        ) + 2,
      );
    controls = (
      <>
        <label>
          Taban
          <select
            aria-label="Taban"
            value={base}
            onChange={(e) => change({ base: e.target.value })}
          >
            <option value="0.5">1/2</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="10">10</option>
            <option value="e">e</option>
          </select>
        </label>
        <Range
          title="Seçili x"
          value={s.x}
          min={0.25}
          max={12}
          step={0.25}
          onChange={(x) => change({ x })}
        />
        <Range
          title="Yatay kayma h"
          value={s.horizontal}
          min={-3}
          max={3}
          onChange={(horizontal) => change({ horizontal })}
        />
        <Range
          title="Düşey kayma v"
          value={s.vertical}
          min={-3}
          max={3}
          onChange={(vertical) => change({ vertical })}
        />
      </>
    );
    diagram = (
      <Graph
        label="Logaritma eğrisi, sınır ve seçili nokta"
        xmin={-extent}
        xmax={extent}
        ymin={-extent}
        ymax={extent}
      >
        {(p) => (
          <>
            <path
              className="math023-main"
              d={curve(
                p,
                (x) => Math.log(x - s.horizontal) / Math.log(a) + s.vertical,
                s.horizontal + 0.01,
                extent,
              )}
            />
            <path
              className="math023-level"
              d={`M${p(s.horizontal, -extent).x} 48V312`}
            />
            {m.defined && (
              <circle
                className="math023-dot"
                data-log-point
                cx={p(s.x, m.value).x}
                cy={p(s.x, m.value).y}
                r="6"
              />
            )}
          </>
        )}
      </Graph>
    );
    result = (
      <>
        <p>
          Tanım: x&gt;{fmt(s.horizontal)}. Düşey sınır: x={fmt(s.horizontal)}.
        </p>
        <p>
          Taban {a > 1 ? "artan" : "azalan"} bir logaritma verir. İç x−h=
          {fmt(m.argument)}.
        </p>
        <p data-log-result>
          {m.defined
            ? `f(${fmt(s.x)})≈${fmt(m.value)}. Ters kontrol h+a^(y−v)≈${fmt(m.inverse)}.`
            : "Seçili nokta tanım dışında; logaritma içi pozitif değil."}
        </p>
        <p>
          Dayanak nokta: ({fmt(s.horizontal + 1)}; {fmt(s.vertical)}). Görüntü
          kümesi ℝ’dir.
        </p>
        <p className="small muted">
          İki eksenin birim ölçeği aynıdır. Kesik düşey çizgi grafiğin parçası
          değil, yaklaşım sınırıdır.
        </p>
      </>
    );
    expected = m.defined ? "defined" : "outside";
    options = [
      ["defined", "Tanımlı"],
      ["outside", "Tanım dışı"],
    ];
  } else if (lessonId === ids[3]) {
    title = "Terimleri üret, birikimi ayır";
    intro =
      "Ayrık indisleri seç. Fark, çarpım, iki önceki terim veya üçgensel kural farklı diziler üretir; terim ile toplam aynı değildir.";
    const kind: SequenceKind023 = [
        "arithmetic",
        "geometric",
        "recurrence",
        "triangular",
      ].includes(s.sequence)
        ? (s.sequence as SequenceKind023)
        : "arithmetic",
      m = sequence023(kind, s.first, s.parameter, s.count),
      lower = Math.min(0, ...m.values),
      upper = Math.max(0, ...m.values),
      pad = Math.max(1, (upper - lower) * 0.12),
      axisStep =
        10 **
        Math.floor(
          Math.log10(Math.max(Math.abs(lower - pad), Math.abs(upper + pad))),
        ),
      axisLow = Math.floor((lower - pad) / axisStep) * axisStep,
      axisHigh = Math.ceil((upper + pad) / axisStep) * axisStep;
    controls = (
      <>
        <label>
          Kural
          <select
            aria-label="Kural"
            value={kind}
            onChange={(e) => change({ sequence: e.target.value })}
          >
            <option value="arithmetic">Aritmetik</option>
            <option value="geometric">Çarpım</option>
            <option value="recurrence">İndirgeme</option>
            <option value="triangular">Üçgensel</option>
          </select>
        </label>
        {kind !== "triangular" && (
          <>
            <Range
              title="İlk terim"
              value={s.first}
              min={-5}
              max={5}
              onChange={(first) => change({ first })}
            />
            <Range
              title={
                kind === "arithmetic"
                  ? "Ortak fark"
                  : kind === "geometric"
                    ? "Ortak çarpan"
                    : "İkinci terim"
              }
              value={s.parameter}
              min={-3}
              max={3}
              step={0.5}
              onChange={(parameter) => change({ parameter })}
            />
          </>
        )}
        <Range
          title="Terim sayısı"
          value={s.count}
          min={2}
          max={12}
          onChange={(count) => change({ count })}
        />
      </>
    );
    diagram = (
      <Graph
        label="Ayrık dizi terimlerinin noktaları"
        xmin={0}
        xmax={s.count + 1}
        ymin={axisLow}
        ymax={axisHigh}
      >
        {(p) => (
          <>
            {m.values.map((y, i) => (
              <circle
                key={i}
                className="math023-dot"
                data-sequence-point={i + 1}
                data-value={y}
                cx={p(i + 1, y).x}
                cy={p(i + 1, y).y}
                r="6"
              />
            ))}
          </>
        )}
      </Graph>
    );
    result = (
      <>
        <p data-sequence-result>
          {s.count}. terim: {fmt(m.last)}. İlk {s.count} terim toplamı:{" "}
          {fmt(m.sum)}.
        </p>
        <p>Terimler: {m.values.map(fmt).join("; ")}.</p>
        <p>
          {kind === "arithmetic"
            ? "aₙ=a₁+(n−1)d; her adımda aynı fark."
            : kind === "geometric"
              ? "aₙ=a₁rⁿ⁻¹; her adımda aynı çarpan."
              : kind === "recurrence"
                ? "İlk iki terim seçilir; sonrakiler önceki ikisinin toplamıdır."
                : "aₙ=n(n+1)/2; ardışık farklar 2, 3, 4… şeklinde artar."}
        </p>
        {!m.ratioDefined && (
          <p>
            Bu çarpım kuralında sıfır terim var. Sıfıra bölme yapılamaz; bu adım
            için oran hesabı yok.
          </p>
        )}
        <p className="small muted">
          Yatay eksen pozitif tam sayı indisidir; noktalar arasında dizi terimi
          yoktur. Sınıflama yalnız gösterilen başlangıca aittir. Büyük eksen
          sayılarında e, 10’un kuvvetini gösterir; 1e6=10⁶.
        </p>
      </>
    );
    expected = m.values.every((v) => v === m.values[0])
      ? "constant"
      : m.values.every((v, i) => i === 0 || v > m.values[i - 1])
        ? "up"
        : m.values.every((v, i) => i === 0 || v < m.values[i - 1])
          ? "down"
          : "mixed";
    options = [
      ["up", "Artıyor"],
      ["down", "Azalıyor"],
      ["constant", "Sabit"],
      ["mixed", "Tek yönlü değil"],
    ];
  } else {
    title = "İki yandan yaklaş, noktayı ayrıca koy";
    intro =
      "Sol ve sağ kolları, dolu noktayı ve yaklaşım uzaklığını değiştir. Limit çevreye, süreklilik çevre ile noktanın aynı değeri vermesine bakar.";
    const hole = s.mode === "hole",
      distance = 10 ** -s.approach,
      m = hole
        ? removableLimit023(s.origin, s.value, s.defined, distance)
        : piecewiseLimit023(
            s.origin,
            s.left,
            s.right,
            s.value,
            s.leftSlope,
            s.rightSlope,
            s.defined,
            distance,
          ),
      left = hole ? 2 * s.origin : s.left,
      right = hole ? 2 * s.origin : s.right,
      ls = hole ? 1 : s.leftSlope,
      rs = hole ? 1 : s.rightSlope;
    controls = (
      <>
        <label>
          Model
          <select
            aria-label="Model"
            value={hole ? "hole" : "piecewise"}
            onChange={(e) => change({ mode: e.target.value })}
          >
            <option value="piecewise">İki parça</option>
            <option value="hole">Ortak çarpan</option>
          </select>
        </label>
        <Range
          title="Hedef a"
          value={s.origin}
          min={-2}
          max={2}
          onChange={(origin) => change({ origin })}
        />
        {!hole && (
          <>
            <Range
              title="Sol limit"
              value={s.left}
              min={-5}
              max={5}
              onChange={(left) => change({ left })}
            />
            <Range
              title="Sağ limit"
              value={s.right}
              min={-5}
              max={5}
              onChange={(right) => change({ right })}
            />
            <Range
              title="Sol eğim"
              value={s.leftSlope}
              min={-2}
              max={2}
              onChange={(leftSlope) => change({ leftSlope })}
            />
            <Range
              title="Sağ eğim"
              value={s.rightSlope}
              min={-2}
              max={2}
              onChange={(rightSlope) => change({ rightSlope })}
            />
          </>
        )}
        <label className="math023-check">
          <input
            type="checkbox"
            checked={s.defined}
            onChange={(e) => change({ defined: e.target.checked })}
          />
          Noktada tanımlı
        </label>
        {s.defined && (
          <Range
            title="Nokta değeri"
            value={s.value}
            min={-5}
            max={5}
            onChange={(value) => change({ value })}
          />
        )}
        <Range
          title="Yaklaşım adımı"
          value={s.approach}
          min={1}
          max={5}
          onChange={(approach) => change({ approach })}
        />
      </>
    );
    diagram = (
      <Graph
        label="Sol ve sağ kollar, açık uçlar ve ayrı nokta değeri"
        xmin={-4}
        xmax={4}
        ymin={-7}
        ymax={7}
      >
        {(p) => (
          <>
            <path
              className="math023-before"
              d={curve(p, (x) => left + ls * (x - s.origin), -4, s.origin)}
            />
            <path
              className="math023-main"
              d={curve(p, (x) => right + rs * (x - s.origin), s.origin, 4)}
            />
            {[left, right].map((y, i) => (
              <circle
                key={i}
                className="math023-open"
                data-limit-open={i}
                cx={p(s.origin, y).x}
                cy={p(s.origin, y).y}
                r="7"
              />
            ))}
            {s.defined && (
              <circle
                className="math023-dot"
                data-limit-value={s.value}
                cx={p(s.origin, s.value).x}
                cy={p(s.origin, s.value).y}
                r="4"
              />
            )}
            {[m.sampleLeft, m.sampleRight].map((q, i) => (
              <circle
                key={i}
                className="math023-sample"
                cx={p(q.x, q.y).x}
                cy={p(q.x, q.y).y}
                r="4"
              />
            ))}
          </>
        )}
      </Graph>
    );
    result = (
      <>
        <p>
          {hole
            ? "x≠a için (x²−a²)/(x−a)=x+a. Noktaya eklenen değer ayrı uzatmadır."
            : `Sol kol: ${fmt(s.leftSlope)}·(x−a)+${fmt(s.left)}. Sağ kol: ${fmt(s.rightSlope)}·(x−a)+${fmt(s.right)}.`}
        </p>
        <p>
          Uzaklık: {fmt(distance)}. Sol örnek ({fmt(m.sampleLeft.x)};{" "}
          {fmt(m.sampleLeft.y)}), sağ örnek ({fmt(m.sampleRight.x)};{" "}
          {fmt(m.sampleRight.y)}).
        </p>
        <p>
          Sol limit {fmt(m.left)}, sağ limit {fmt(m.right)}. f(a):{" "}
          {m.value === null ? "Tanımsız" : fmt(m.value)}.
        </p>
        <p data-limit-result>
          {m.limit === null
            ? "İki yanlı sonlu limit yok."
            : `Ortak limit ${fmt(m.limit)}.`}{" "}
          {m.continuous ? "Noktada sürekli." : "Noktada sürekli değil."}
        </p>
        <p>
          Soldan süreklilik: {m.leftContinuous ? "Var" : "Yok"}. Sağdan
          süreklilik: {m.rightContinuous ? "Var" : "Yok"}.
        </p>
        <p className="small muted">
          Daire çerçevesi dalın dışlanan ucunu, içindeki küçük dolu nokta varsa
          f(a)’yı gösterir. Eğimler, eksenlerde verilen sayısal ölçekle
          yorumlanır.
        </p>
      </>
    );
    expected = m.continuous
      ? "continuous"
      : m.limit !== null
        ? "limit"
        : "none";
    options = [
      ["continuous", "Sürekli"],
      ["limit", "Limit var, sürekli değil"],
      ["none", "İki yanlı limit yok"],
    ];
  }
  return (
    <section
      className="math023-lab"
      data-forge023={lessonId}
      aria-label={title}
    >
      <h3>{title}</h3>
      <p>{intro}</p>
      <div className="math023-controls">{controls}</div>
      {diagram}
      <div className="math023-result" data-model-result>
        {result}
      </div>
      <div className="math023-prediction">
        <label>
          Sonuç tahminin
          <select
            aria-label="Sonuç tahminin"
            value={options.some((o) => o[0] === s.guess) ? s.guess : ""}
            onChange={(e) => change({ guess: e.target.value })}
          >
            <option value="">Bir sonuç seç</option>
            {options.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Modelden gerekçen
          <textarea
            aria-label="Modelden gerekçen"
            maxLength={120}
            value={s.reason}
            onChange={(e) => change({ reason: e.target.value.slice(0, 120) })}
          />
        </label>
        <button
          className="secondary"
          disabled={
            !validSelection ||
            !options.some(([value]) => value === s.guess) ||
            !s.reason.trim()
          }
          onClick={() => persist({ checked: true })}
        >
          Kanıtı gör
        </button>
        {s.checked &&
          validSelection &&
          s.reason.trim() &&
          options.some(([value]) => value === s.guess) && (
            <p className="math023-feedback" role="status">
              {s.guess === expected
                ? "Tahminin bu koşullarla uyumlu."
                : "Tahminini görünen hesap ve tanım koşullarıyla yeniden karşılaştır."}
            </p>
          )}
      </div>
      <p className="small muted">
        Ondalık sayılar yaklaşık verilir. Bu model keşif kaydıdır. Süre, seçim
        ve kanıtı açma puan veya konu bitirme kaydı oluşturmaz.
      </p>
    </section>
  );
}
