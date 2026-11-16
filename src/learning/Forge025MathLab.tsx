import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import { useApp } from "../store";
import {
  primitiveFamily025,
  definiteIntegral025,
  riemannArea025,
  type Polynomial025,
  type Quadratic025,
  type RiemannMethod025,
} from "./forge025Math";
import "./forge025Math.css";
const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 6,
    signDisplay: "negative",
  }).format(n === 0 ? 0 : n);
const bounded = (n: number, lo: number, hi: number, step = 1) =>
  Number.isFinite(n)
    ? Math.max(lo, Math.min(hi, Math.round(n / step) * step))
    : lo;
const defaults = {
  a: 0,
  b: 1,
  c: 0,
  d: -1,
  x: 1,
  constant: 1,
  initialX: 0,
  initialY: 3,
  lower: -2,
  upper: 2,
  probe: 0,
  fa: 1,
  fb: 0,
  fc: -1,
  ga: 0,
  gb: 0,
  gc: 0,
  areaLower: -2,
  areaUpper: 2,
  count: 4,
  method: "midpoint",
  guess: "",
  reason: "",
  checked: false,
};
const methods: [RiemannMethod025, string][] = [
  ["left", "Sol uç"],
  ["right", "Sağ uç"],
  ["midpoint", "Orta nokta"],
  ["lower", "Gerçek alt toplam"],
  ["upper", "Gerçek üst toplam"],
];
const polynomial = (c: readonly number[], x: number) =>
  c.reduce((a, b) => a * x + b, 0);
const expression = (c: readonly number[]) =>
  c
    .map(
      (n, i) =>
        `(${fmt(n)})${c.length - 1 - i === 0 ? "" : c.length - 1 - i === 1 ? "x" : `x^${c.length - 1 - i}`}`,
    )
    .join("+");
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
  return (
    <label className="math025-range">
      <span>
        {label}: <strong>{fmt(value)}</strong>
      </span>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
      />
    </label>
  );
}
type MapPoint = (x: number, y: number) => { x: number; y: number };
function Plot({
  label,
  min,
  max,
  series,
  extras,
  filled,
}: {
  label: string;
  min: number;
  max: number;
  series: { fn: (x: number) => number; className: string }[];
  extras?: (p: MapPoint) => ReactNode;
  filled?: { from: number; to: number; fn: (x: number) => number }[];
}) {
  const clip = useId();
  const all = series.flatMap(({ fn }) =>
      Array.from({ length: 121 }, (_, i) => fn(min + ((max - min) * i) / 120)),
    ),
    bottom = Math.min(0, ...all),
    top = Math.max(0, ...all),
    padding = Math.max(1, (top - bottom) * 0.15),
    ymin = bottom - padding,
    ymax = top + padding;
  const p: MapPoint = (x, y) => ({
      x: 35 + (200 * (x - min)) / (max - min),
      y: 252 - (200 * (y - ymin)) / (ymax - ymin),
    }),
    origin = p(Math.max(min, Math.min(max, 0)), 0);
  const path = (fn: (x: number) => number, from = min, to = max) =>
    Array.from({ length: 161 }, (_, i) => {
      const x = from + ((to - from) * i) / 160,
        q = p(x, fn(x));
      return `${i ? "L" : "M"}${q.x},${q.y}`;
    }).join(" ");
  return (
    <svg
      className="math025-plot"
      viewBox="0 0 270 320"
      role="img"
      aria-label={label}
      data-poly-plot
      data-ymin={ymin}
      data-ymax={ymax}
    >
      <defs>
        <clipPath id={clip}>
          <rect x="34" y="50" width="202" height="204" />
        </clipPath>
      </defs>
      <rect className="math025-window" x="35" y="52" width="200" height="200" />
      <path
        className="math025-axis"
        d={`M35 ${origin.y}H235 M${origin.x} 52V252`}
      />
      <text x="35" y="283">
        {fmt(min)}
      </text>
      <text x="235" y="283" textAnchor="end">
        {fmt(max)}
      </text>
      <text x="135" y="24" textAnchor="middle">
        y: {fmt(ymin)} … {fmt(ymax)}
      </text>
      <text x="235" y="310" textAnchor="end">
        x
      </text>
      <g clipPath={`url(#${clip})`}>
        {filled?.map(({ from, to, fn }, i) => {
          const a = p(from, 0),
            b = p(to, 0);
          return (
            <path
              key={i}
              className="math025-area"
              d={`M${a.x},${a.y} ${path(fn, from, to).replace(/^M/, "L")} L${b.x},${b.y}Z`}
            />
          );
        })}
        {extras?.(p)}
        {series.map(({ fn, className }, i) => (
          <path key={i} className={className} d={path(fn)} />
        ))}
      </g>
    </svg>
  );
}
export default function Forge025MathLab({ lessonId }: { lessonId: string }) {
  const explorationId = `forge025-math:${lessonId}`,
    [saved, set] = useExploration(explorationId, defaults),
    raw = useApp().state.explorations[explorationId];
  if (
    ![
      "ayt-belirsiz-integral",
      "ayt-belirli-integral",
      "ayt-alan-riemann",
    ].includes(lessonId)
  )
    return null;
  const s = {
    ...saved,
    method:
      methods.find(([method]) => method === saved.method)?.[0] ?? "midpoint",
    a: bounded(saved.a, -2, 2),
    b: bounded(saved.b, -3, 3),
    c: bounded(saved.c, -3, 3),
    d: bounded(saved.d, -3, 3),
    x: bounded(saved.x, -2, 2, 0.25),
    constant: bounded(saved.constant, -6, 6),
    initialX: bounded(saved.initialX, -2, 2, 0.5),
    initialY: bounded(saved.initialY, -6, 6),
    lower: bounded(saved.lower, -3, 3, 0.5),
    upper: bounded(saved.upper, -3, 3, 0.5),
    probe: bounded(saved.probe, -3, 3, 0.5),
    fa: bounded(saved.fa, -2, 2),
    fb: bounded(saved.fb, -3, 3),
    fc: bounded(saved.fc, -3, 3),
    ga: bounded(saved.ga, -2, 2),
    gb: bounded(saved.gb, -3, 3),
    gc: bounded(saved.gc, -3, 3),
    areaLower: bounded(saved.areaLower, -3, 2, 0.5),
    areaUpper: bounded(saved.areaUpper, -2.5, 3, 0.5),
    count: bounded(saved.count, 2, 16),
    reason: saved.reason.slice(0, 240),
  };
  s.areaUpper = Math.max(s.areaLower + 0.5, s.areaUpper);
  s.probe = Math.max(
    Math.min(s.lower, s.upper),
    Math.min(Math.max(s.lower, s.upper), s.probe),
  );
  const persist = (delta: Partial<typeof saved>) => set({ ...s, ...delta });
  const change = (delta: Partial<typeof saved>) =>
    persist({ ...delta, checked: false });
  const active: (keyof typeof defaults)[] =
    lessonId === "ayt-belirsiz-integral"
      ? ["a", "b", "c", "d", "x", "constant", "initialX", "initialY"]
      : lessonId === "ayt-belirli-integral"
        ? ["a", "b", "c", "d", "lower", "upper", "probe"]
        : [
            "fa",
            "fb",
            "fc",
            "ga",
            "gb",
            "gc",
            "areaLower",
            "areaUpper",
            "count",
            "method",
          ];
  const validSelection = active.every(
    (key) =>
      saved[key] === s[key] &&
      (!raw ||
        !Object.hasOwn(raw, key) ||
        typeof raw[key] === typeof defaults[key]),
  );
  const c: Polynomial025 = [s.a, s.b, s.c, s.d];
  let title: string,
    intro: string,
    controls: ReactNode,
    diagram: ReactNode,
    result: ReactNode,
    expected: string,
    choices: [string, string][];
  const coefficientControls = (
    <>
      {(
        [
          ["a", "x³ katsayısı", -2, 2],
          ["b", "x² katsayısı", -3, 3],
          ["c", "x katsayısı", -3, 3],
          ["d", "Sabit terim", -3, 3],
        ] as const
      ).map(([key, label, min, max]) => (
        <Range
          key={key}
          label={label}
          value={s[key]}
          min={min}
          max={max}
          onChange={(n) => change({ [key]: n })}
        />
      ))}
    </>
  );
  if (lessonId === "ayt-belirsiz-integral") {
    title = "Sabit değişirken türev aynı kalır";
    intro =
      "Verilen f(x) polinomu için ters türev ailesini kur. Serbest K’yı değiştir; başlangıç koşulunun seçtiği başka eğriyi kesikli çizgiyle karşılaştır.";
    const m = primitiveFamily025(c, s.x, s.constant, s.initialX, s.initialY),
      fn = (x: number) =>
        primitiveFamily025(c, x, s.constant, s.initialX, s.initialY).value,
      condition = (x: number) =>
        primitiveFamily025(c, x, s.constant, s.initialX, s.initialY)
          .conditionValue;
    controls = (
      <>
        {coefficientControls}
        <Range
          label="Serbest sabit K"
          value={s.constant}
          min={-6}
          max={6}
          onChange={(constant) => change({ constant })}
        />
        <Range
          label="Seçili x"
          value={s.x}
          min={-2}
          max={2}
          step={0.25}
          onChange={(x) => change({ x })}
        />
        <Range
          label="Başlangıç apsisi"
          value={s.initialX}
          min={-2}
          max={2}
          step={0.5}
          onChange={(initialX) => change({ initialX })}
        />
        <Range
          label="Başlangıç yüksekliği"
          value={s.initialY}
          min={-6}
          max={6}
          onChange={(initialY) => change({ initialY })}
        />
      </>
    );
    diagram = (
      <Plot
        label="Ters türev ailesi: düz çizgi serbest K eğrisi, kesikli çizgi verilen başlangıç noktasını sağlayan eğridir. Sayısal değerler aşağıda."
        min={-2.25}
        max={2.25}
        series={[
          { fn, className: "math025-curve" },
          { fn: condition, className: "math025-condition" },
        ]}
        extras={(p) => (
          <>
            <circle
              className="math025-point"
              data-family-point
              cx={p(s.x, m.value).x}
              cy={p(s.x, m.value).y}
              r="5"
            />
            <circle
              className="math025-open"
              data-initial-point
              cx={p(s.initialX, s.initialY).x}
              cy={p(s.initialX, s.initialY).y}
              r="6"
            />
          </>
        )}
      />
    );
    result = (
      <>
        <p>f(x)={expression(c)}.</p>
        <p>
          Bir ters türev: {fmt(c[0] / 4)}x⁴+({fmt(c[1] / 3)})x³+({fmt(c[2] / 2)}
          )x²+({fmt(c[3])})x+K.
        </p>
        <p data-family-result>
          x={fmt(s.x)}, K={fmt(s.constant)} için F(x)={fmt(m.value)};
          F′(x)=f(x)={fmt(m.derivative)}.
        </p>
        <p data-constant-result>
          F({fmt(s.initialX)})={fmt(s.initialY)} koşulunu sağlayan K=
          {fmt(m.conditionConstant)}. Bu eğride seçili x’in değeri{" "}
          {fmt(m.conditionValue)}.
        </p>
        <p>
          K yalnız düşey yüksekliği değiştirir. Her K için aynı x noktasında
          türev f(x) olarak kalır. Başlangıç koşulu verildiğinde K
          serbestçe seçilmez; hesaplanan değer kullanılır. İç içe bileşke veya
          kök içermeyen bu model polinom ailesini gösterir.
        </p>
      </>
    );
    expected = m.conditionConstant === s.constant ? "matches" : "different";
    choices = [
      ["matches", "Başlangıç koşulu sağlanır"],
      ["different", "Farklı bir K gerekir"],
    ];
  } else if (lessonId === "ayt-belirli-integral") {
    title = "Uç farkı ve ara birikimi birlikte izle";
    intro =
      "Aynı polinomda alt ve üst sınırı seç. Ters sınırlar yönü değiştirir; eşit sınırda integral sıfırdır. Ara nokta sınırların arasında tutulur.";
    const m = definiteIntegral025(c, s.lower, s.upper, s.probe),
      lo = Math.min(s.lower, s.upper),
      hi = Math.max(s.lower, s.upper),
      min = lo === hi ? lo - 1 : lo - 0.25,
      max = lo === hi ? hi + 1 : hi + 0.25,
      fn = (x: number) => polynomial(c, x);
    controls = (
      <>
        {coefficientControls}
        <Range
          label="Alt sınır"
          value={s.lower}
          min={-3}
          max={3}
          step={0.5}
          onChange={(lower) => change({ lower })}
        />
        <Range
          label="Üst sınır"
          value={s.upper}
          min={-3}
          max={3}
          step={0.5}
          onChange={(upper) => change({ upper })}
        />
        <Range
          label="Ara nokta"
          value={m.point}
          min={lo}
          max={hi}
          step={0.5}
          onChange={(probe) => change({ probe })}
        />
      </>
    );
    diagram = (
      <Plot
        label="Polinom integrandı ve sınırlar arasındaki işaretli bölge. Düşey kesikli çizgi ara noktayı gösterir; birikim değerleri metindedir."
        min={min}
        max={max}
        series={[{ fn, className: "math025-curve" }]}
        filled={lo === hi ? [] : [{ from: lo, to: hi, fn }]}
        extras={(p) => (
          <path
            className="math025-probe"
            data-probe-line
            d={`M${p(m.point, 0).x},52V252`}
          />
        )}
      />
    );
    result = (
      <>
        <p>f(x)={expression(c)}.</p>
        <p data-definite-result>
          ∫ alt {fmt(s.lower)}, üst {fmt(s.upper)}: {fmt(m.signed)}. Yön:{" "}
          {m.orientation === 0
            ? "sıfır genişlik"
            : m.orientation === 1
              ? "artan sınırlar"
              : "ters sınırlar"}
          .
        </p>
        <p>
          Ters türevin sabitsiz üst değeri {fmt(m.baseAtUpper)}, alt değeri{" "}
          {fmt(m.baseAtLower)}; üst−alt {fmt(m.signed)}.
        </p>
        <p data-accumulation-result>
          Ara x={fmt(m.point)}: ilk birikim {fmt(m.accumulation)}, kalan{" "}
          {fmt(m.remaining)}; toplam {fmt(m.signed)}.
        </p>
        <p>
          Ara noktada integrand f({fmt(m.point)})={fmt(m.integrandAtPoint)}. Bu
          yükseklik, sürekli polinom için birikim eğrisinin o noktadaki
          türevidir.
        </p>
        <p>
          Ortalama yükseklik:{" "}
          {m.mean === null ? "Sıfır genişlikte tanımlanmaz" : fmt(m.mean)}.
          Yönlü integral geometrik alanla aynı olmak zorunda değildir; eksen
          altındaki katkılar negatiftir. Taralı bölge fiziksel bir alanı
          gösterse de metindeki sayı sınırların yönünü de içerir.
        </p>
      </>
    );
    expected = m.signed === 0 ? "zero" : m.signed > 0 ? "positive" : "negative";
    choices = [
      ["positive", "Net integral pozitif"],
      ["negative", "Net integral negatif"],
      ["zero", "Net integral sıfır"],
    ];
  } else {
    title = "Dikdörtgen toplamı ile gerçek alanı karşılaştır";
    intro =
      "İki karesel eğrinin farkı h=f−g çizilir. Bu farkın x eksenine uzaklığı, ilk iki eğri arasındaki düşey uzaklığa eşittir. Her dikdörtgen işaretli katkı verir; toplam net integrale yaklaşır. Geometrik alan için her parçada mutlak değer kullanılır.";
    const f: Quadratic025 = [s.fa, s.fb, s.fc],
      g: Quadratic025 = [s.ga, s.gb, s.gc],
      lower = s.areaLower,
      upper = Math.max(lower + 0.5, s.areaUpper),
      method = methods.find(([key]) => key === s.method)?.[0] ?? "midpoint",
      m = riemannArea025(f, g, lower, upper, s.count, method),
      fn = (x: number) => polynomial(m.difference, x);
    controls = (
      <>
        {(
          [
            ["fa", "f: x² katsayısı", -2, 2],
            ["fb", "f: x katsayısı", -3, 3],
            ["fc", "f: sabit", -3, 3],
            ["ga", "g: x² katsayısı", -2, 2],
            ["gb", "g: x katsayısı", -3, 3],
            ["gc", "g: sabit", -3, 3],
          ] as const
        ).map(([key, label, min, max]) => (
          <Range
            key={key}
            label={label}
            value={s[key]}
            min={min}
            max={max}
            onChange={(n) => change({ [key]: n })}
          />
        ))}
        <Range
          label="Alan sol sınırı"
          value={lower}
          min={-3}
          max={2}
          step={0.5}
          onChange={(areaLower) => change({ areaLower })}
        />
        <Range
          label="Alan sağ sınırı"
          value={upper}
          min={lower + 0.5}
          max={3}
          step={0.5}
          onChange={(areaUpper) => change({ areaUpper })}
        />
        <Range
          label="Dikdörtgen sayısı"
          value={s.count}
          min={2}
          max={16}
          onChange={(count) => change({ count })}
        />
        <label>
          Örnek seçimi
          <select
            aria-label="Örnek seçimi"
            value={method}
            onChange={(e) => change({ method: e.currentTarget.value })}
          >
            {methods.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </>
    );
    diagram = (
      <Plot
        label="Çizilen eğri h=f−g. Dikdörtgenler sıfır ekseninden h’nin seçilen yüksekliğine uzanır; içi boş daireler farkın kökleridir. Çizim net toplamın yaklaşımını gösterir."
        min={lower - 0.25}
        max={upper + 0.25}
        series={[{ fn, className: "math025-curve" }]}
        extras={(p) => (
          <>
            {m.rectangles.map((r, i) => {
              const a = p(r.from, 0),
                b = p(r.to, r.height);
              return (
                <rect
                  key={i}
                  className={
                    r.height < 0
                      ? "math025-rectangle math025-negative"
                      : "math025-rectangle"
                  }
                  data-riemann-rectangle
                  data-height={r.height}
                  x={a.x}
                  y={Math.min(a.y, b.y)}
                  width={b.x - a.x}
                  height={Math.abs(b.y - a.y)}
                />
              );
            })}
            {m.roots.map((root) => (
              <circle
                key={root}
                className="math025-open"
                data-area-root={root}
                cx={p(root, 0).x}
                cy={p(root, 0).y}
                r="5"
              />
            ))}
          </>
        )}
      />
    );
    const comparison =
      m.pieces.some((p) => p.sign > 0) && m.pieces.some((p) => p.sign < 0)
        ? "greater"
        : "equal";
    result = (
      <>
        <p>
          f(x)={expression(f)}; g(x)={expression(g)}. Çizilen h(x)=
          {expression(m.difference)}.
        </p>
        <p>
          Kullanılan sınırlar: {fmt(lower)} ile {fmt(upper)}. Sağ sınır soldan
          en az 0,5 büyük tutulur.
        </p>
        <p data-area-result>
          Net integral {fmt(m.signed)}; geometrik alan {fmt(m.geometricArea)}.
        </p>
        <p data-riemann-result>
          {s.count} dikdörtgen, genişlik {fmt(m.width)}. Seçili toplam{" "}
          {fmt(m.estimate)}; toplam − gerçek integral {fmt(m.error)}.
        </p>
        <p data-bounds-result>
          Gerçek alt toplam {fmt(m.lowerSum)} ≤ integral {fmt(m.signed)} ≤
          gerçek üst toplam {fmt(m.upperSum)}.
        </p>
        <p>
          Kesişim apsisleri:{" "}
          {m.coincident
            ? "İki fonksiyon her noktada aynı"
            : m.roots.length
              ? m.roots.map(fmt).join("; ")
              : "Bu aralıkta yok"}
          .
        </p>
        <ul className="math025-pieces">
          {m.pieces.map((piece, i) => (
            <li key={i}>
              [{fmt(piece.from)}; {fmt(piece.to)}]: işaretli katkı{" "}
              {fmt(piece.signed)}, alan {fmt(piece.area)};{" "}
              {piece.sign > 0 ? "f üstte" : piece.sign < 0 ? "g üstte" : "f=g"}.
            </li>
          ))}
        </ul>
        <details className="math025-details">
          <summary>Dikdörtgen verilerini aç</summary>
          <ol>
            {m.rectangles.map((r, i) => (
              <li key={i}>
                [{fmt(r.from)}; {fmt(r.to)}], örnek {fmt(r.sample)}, yükseklik{" "}
                {fmt(r.height)}, katkı {fmt(r.contribution)}.
              </li>
            ))}
          </ol>
        </details>
        <p>
          Grafikte her eksen kendi sayısal ölçeğiyle okunur; piksel alanı
          doğrudan birimkare değildir. Kesikli kenarlı her dikdörtgen negatif
          işaretli katkı verir. Alan için aralığı her kesişimde böl; her parçada mutlak farkı
          integre et. Sonlu toplamın hatası her n artışında mutlaka
          azalmak zorunda değildir.
        </p>
      </>
    );
    expected = comparison;
    choices = [
      ["greater", "Alan > |net integral|"],
      ["equal", "Alan = |net integral|"],
    ];
  }
  const validGuess = choices.some(([key]) => key === s.guess),
    validReason = s.reason.trim().length > 0;
  return (
    <section
      className="math025-lab"
      data-forge025={lessonId}
      aria-label={title}
    >
      <h3>{title}</h3>
      <p>{intro}</p>
      <div className="math025-controls">{controls}</div>
      {diagram}
      <div className="math025-result" data-model-result>
        {result}
      </div>
      <div className="math025-prediction">
        <label>
          Sonuç tahminin
          <select
            aria-label="Sonuç tahminin"
            value={validGuess ? s.guess : ""}
            onChange={(e) => change({ guess: e.currentTarget.value })}
          >
            <option value="">Bir sonuç seç</option>
            {choices.map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Modelden gerekçen
          <textarea
            aria-label="Modelden gerekçen"
            maxLength={240}
            value={s.reason}
            onChange={(e) =>
              change({ reason: e.currentTarget.value.slice(0, 240) })
            }
          />
        </label>
        <button
          className="secondary"
          disabled={!validGuess || !validReason || !validSelection}
          onClick={() => persist({ checked: true })}
        >
          Kanıtı gör
        </button>
        {s.checked && validGuess && validReason && validSelection && (
          <p className="math025-feedback" role="status">
            {s.guess === expected
              ? "Tahminin bu koşullarla uyumlu."
              : "Tahminini görünen hesap ve işaret koşullarıyla yeniden karşılaştır."}
          </p>
        )}
      </div>
      <p className="small muted">
        Ondalık değerler yaklaşık gösterilir. Bu keşfin seçimleri ve gerekçesi
        kaydedilir; süre veya kanıtı açma puan, ustalık veya konu bitirme kaydı
        oluşturmaz.
      </p>
    </section>
  );
}
