import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  centroid018,
  distance018,
  endpoint018,
  midpoint018,
  plane018,
  reflect018,
  region018,
  section018,
  translate018,
  type Point018,
  type Reflection018,
} from "./forge018Math";
import "./forge018Math.css";

const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 }).format(n);
const coord = (p: Point018) => `(${fmt(p.x)}; ${fmt(p.y)})`;
const clamp = (n: number, min = -6, max = 6) =>
  Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : min;
type Mode018 =
  | "distance"
  | "reflection"
  | "section"
  | "centroid"
  | "midpoint"
  | "translation";
type Option018 = readonly [string, string];
const modes018: readonly Option018[] = [
  ["distance", "Uzaklık"],
  ["reflection", "Yansıma"],
  ["section", "Bölme"],
  ["centroid", "Merkez"],
  ["midpoint", "Orta nokta"],
  ["translation", "Öteleme"],
];
const reflectionOptions018: readonly Option018[] = [
  ["x", "x ekseni"],
  ["y", "y ekseni"],
  ["origin", "Orijin"],
  ["diagonal", "y=x"],
  ["anti", "y=−x"],
  ["center", "S noktası"],
];
const regions018: readonly Option018[] = [
  ["I", "I"],
  ["II", "II"],
  ["III", "III"],
  ["IV", "IV"],
  ["x", "x ekseni"],
  ["y", "y ekseni"],
  ["O", "Orijin"],
];
const regionName = (p: Point018) => {
  const r = region018(p);
  return r === "O"
    ? "orijinde"
    : r === "x" || r === "y"
      ? `${r} ekseninde`
      : `${r}. bölgede`;
};
function Choice018({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly Option018[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="m018-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}
function Range018({
  label,
  value,
  min = -6,
  max = 6,
  unit = "birim",
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="m018-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <output htmlFor={id}>
        {fmt(value)} {unit}
      </output>
    </div>
  );
}
type Named018 = Point018 & {
  name: string;
  kind: "a" | "b" | "c" | "result" | "helper";
};
function segment018(
  a: Point018,
  b: Point018,
  scale: ReturnType<typeof plane018>,
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
function PointLabels018({
  points,
  scale,
  font,
}: {
  points: Named018[];
  scale: ReturnType<typeof plane018>;
  font: number;
}) {
  const grouped: { point: Named018; names: string[] }[] = [];
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
            <circle
              className={`m018-point m018-${point.kind}`}
              cx={px}
              cy={py}
              r={Math.max(6, font * 0.24)}
              data-geometry-point={name}
              data-names={names.join(",")}
              data-x={point.x}
              data-y={point.y}
            />
            <rect
              className="m018-label-bg"
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
function Plane018({
  points,
  title,
  children,
}: {
  points: Named018[];
  title: string;
  children: (scale: ReturnType<typeof plane018>) => ReactNode;
}) {
  const titleId = useId(),
    descId = useId(),
    scale = plane018(points);
  const ref = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(720);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const measure = () => {
      const value = svg.getBoundingClientRect().width;
      if (value > 0) setWidth(value);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);
  const font = Math.max(22, (17 * 720) / width);
  const positiveTicks = scale.ticks.filter((v) => v > 0 && v < scale.limit);
  const narrowTick =
    positiveTicks[Math.floor(positiveTicks.length / 2)] ?? scale.step;
  const ticks =
    width < 480
      ? [-narrowTick, narrowTick]
      : scale.ticks.filter((v) => v !== 0 && Math.abs(v) < scale.limit);
  return (
    <figure className="m018-figure">
      <svg
        className="m018-diagram"
        ref={ref}
        style={{ fontSize: font }}
        viewBox="0 0 720 650"
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        data-equal-axis-scale={scale.pixelsPerUnit}
        data-axis-limit={scale.limit}
      >
        <title id={titleId}>{title}</title>
        <desc id={descId}>
          Dik koordinat sistemi. İki eksende bir birimin çizim uzunluğu eşittir.
          Noktaların koordinatları ve bütün sayısal sonuçlar şeklin altında
          metin olarak da verilir.
        </desc>
        <rect x="100" y="60" width="520" height="520" className="m018-plot" />
        {scale.ticks
          .filter((v) => v !== 0)
          .map((v) => (
            <g key={v}>
              <line
                className="m018-grid"
                x1={scale.x(v)}
                y1="60"
                x2={scale.x(v)}
                y2="580"
              />
              <line
                className="m018-grid"
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
              className="m018-tick"
              x={scale.x(v)}
              y={580 + font}
              textAnchor="middle"
            >
              {fmt(v)}
            </text>
            <text
              className="m018-tick"
              x="87"
              y={scale.y(v) + font * 0.32}
              textAnchor="end"
            >
              {fmt(v)}
            </text>
          </g>
        ))}
        <line className="m018-axis" x1="100" y1="320" x2="640" y2="320" />
        <path className="m018-axis" d="M632 313 L640 320 L632 327" />
        <line className="m018-axis" x1="360" y1="580" x2="360" y2="42" />
        <path className="m018-axis" d="M353 50 L360 42 L367 50" />
        <text x="650" y="327">
          x
        </text>
        <text x="380" y="56">
          y
        </text>
        {children(scale)}
        <g data-origin-label-layer>
          <rect
            className="m018-label-bg"
            data-origin-label-bg
            x={360 - font * 1.35}
            y={320 + font * 0.08}
            width={font * 1.05}
            height={font * 1.25}
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
        <PointLabels018 points={points} scale={scale} font={font} />
      </svg>
      <figcaption>
        Her iki eksen: −{fmt(scale.limit)} ile +{fmt(scale.limit)} birim. Izgara
        aralığı {fmt(scale.step)} birim.{" "}
        {width < 480
          ? `Dar görünümde yalnız ±${fmt(narrowTick)} sayı etiketleri gösterilir. `
          : ""}
        Görünüm iki eksende birlikte değişir; şekli yatay veya düşey germeyiz.
      </figcaption>
    </figure>
  );
}

const defaults018 = {
  mode: "distance",
  ax: -3,
  ay: 2,
  bx: 5,
  by: 6,
  cx: 2,
  cy: -5,
  sx: 1,
  sy: 2,
  h: -2,
  k: 3,
  m: 2,
  n: 3,
  external: false,
  reflection: "x",
  prediction: "",
  reason: "",
  checked: false,
};
export default function Forge018MathLab({ lessonId }: { lessonId: string }) {
  const [saved, set] = useExploration(`forge018-math:${lessonId}`, defaults018);
  const mode: Mode018 = modes018.some(([v]) => v === saved.mode)
    ? (saved.mode as Mode018)
    : "distance";
  const reflection: Reflection018 = reflectionOptions018.some(
    ([v]) => v === saved.reflection,
  )
    ? (saved.reflection as Reflection018)
    : "x";
  const state = {
    ...saved,
    reason: saved.reason.slice(0, 120),
    mode,
    reflection,
  };
  const change = (patch: Partial<typeof saved>) =>
    set({ ...patch, checked: false });
  const a = { x: clamp(saved.ax), y: clamp(saved.ay) },
    b = { x: clamp(saved.bx), y: clamp(saved.by) },
    c = { x: clamp(saved.cx), y: clamp(saved.cy) },
    s = { x: clamp(saved.sx), y: clamp(saved.sy) };
  const m = clamp(saved.m, 1, 6),
    n = clamp(saved.n, 1, 6),
    h = clamp(saved.h),
    k = clamp(saved.k);
  const d = distance018(a, b),
    reflected = reflect018(a, reflection, s),
    section = section018(a, b, m, n, saved.external),
    center = centroid018(a, b, c),
    missing = endpoint018(a, s),
    translated = translate018(a, h, k);
  const reasonId = useId();
  if (lessonId !== "noktanin-analitigi") return null;
  const names: Named018[] = [{ ...a, name: "A", kind: "a" }];
  let expected = "",
    prompt = "",
    evidence = "",
    options: readonly Option018[] = [],
    title = "";
  if (mode === "distance") {
    names.push({ ...b, name: "B", kind: "b" });
    expected = d.equalAxisPath ? "equal" : "shorter";
    options = [
      ["shorter", "Daha kısa"],
      ["equal", "Eşit"],
    ];
    prompt =
      "A ile B arasındaki doğru uzaklığı, eksenler boyunca yapılan köşeli yolla karşılaştır. Hangisini bekliyorsun?";
    evidence = `Doğru uzaklığı ${fmt(d.distance)}, köşeli yol ${fmt(d.axisPath)} birim. ${d.equalAxisPath ? "En az bir fark sıfır; yollar eşit." : "İki fark da sıfırdan farklı; doğru parçası daha kısa."}`;
    title = "İki koordinat farkından gerçek uzaklığa";
  } else if (mode === "reflection") {
    names.push({ ...reflected, name: "A′", kind: "result" });
    if (reflection === "center")
      names.push({ ...s, name: "S", kind: "helper" });
    expected = region018(reflected);
    options = regions018;
    prompt =
      "Seçtiğin aynaya veya merkeze göre A′ görüntüsü hangi bölgede ya da eksende kalacak?";
    evidence = `A′${coord(reflected)} ${regionName(reflected)}. ${reflection === "center" ? `A ve A′ orta noktası S${coord(midpoint018(a, reflected))}.` : "Yansıma kuralı her iki koordinata birlikte uygulandı."}`;
    title = "Aynayı değiştir, sabit kalanı bul";
  } else if (mode === "section") {
    names.push({ ...b, name: "B", kind: "b" });
    if (section.point && section.ratioDefined)
      names.push({ ...section.point, name: "P", kind: "result" });
    expected =
      section.position === "collapsed"
        ? "collapsed"
        : section.position === "none"
          ? "none"
          : section.position === "inside"
            ? "inside"
            : "outside";
    options = [
      ["inside", "İçte"],
      ["outside", "Dışta"],
      ["collapsed", "Çakışık"],
      ["none", "Yok"],
    ];
    prompt = `|AP|:|PB|=${m}:${n}. Seçilen iç/dış bölme koşulunda nasıl bir sonuç bekliyorsun? Uçlar aynıysa tanımlı uzaklık oranı varsayma.`;
    evidence =
      section.position === "collapsed"
        ? `A=B; uçtaki 0/0 uzaklık oranı tanımsız. ${saved.external ? (m === n ? "Uç dışındaki her nokta 1:1 oranını sağlar; tek bir dış nokta seçilemez." : "Uç dışında oran hep 1; seçilen eşit olmayan oranı sağlayan P yoktur.") : `Cebirsel ortalama ${coord(a)} olsa da [AB] tek noktadır; tanımlı bir iç uzaklık oranı oluşmaz.`}`
        : section.position === "none"
          ? "Farklı uçlarda 1:1 oranlı sonlu dış bölme noktası yoktur."
          : `P${coord(section.point!)} ${section.position === "inside" ? "[AB] içinde" : section.position === "beyond-b" ? "B’nin ötesinde" : "A’nın gerisinde"}; A, B, P doğrusaldır.`;
    title = "Oran, doğru ve yer koşulunu birleştir";
  } else if (mode === "centroid") {
    names.push(
      { ...b, name: "B", kind: "b" },
      { ...c, name: "C", kind: "c" },
      { ...center.oppositeA, name: "M", kind: "helper" },
      { ...center.centroid, name: "G", kind: "result" },
    );
    expected = center.triangle ? "yes" : "no";
    options = [
      ["yes", "Var"],
      ["no", "Yok"],
    ];
    prompt =
      "Bu üç nokta alanı sıfırdan büyük bir üçgen kurar mı? Üç noktanın ortasını bulmak tek başına üçgeni kanıtlar mı?";
    evidence = `Alan ${fmt(center.area)} birim kare. ${center.triangle ? `G${coord(center.centroid)} üçgenin ağırlık merkezi; AG:GM=2:1.` : `Noktalar doğrusal veya çakışık; G${coord(center.centroid)} yalnız koordinat ortalaması, iç üçgen merkezi değil.`}`;
    title = "Üç ortalama, üç kenarortay, bir koşul";
  } else if (mode === "midpoint") {
    names.push(
      { ...s, name: "M", kind: "helper" },
      { ...missing, name: "B", kind: "result" },
    );
    expected = region018(missing);
    options = regions018;
    prompt =
      "A ve orta nokta M biliniyor. Eksik B ucu hangi bölgeye veya eksene düşecek?";
    evidence = `B=2M−A=${coord(missing)}; A ve B’nin ortalaması ${coord(midpoint018(a, missing))}, yani M.`;
    title = "Orta noktadan eksik uca ilerle";
  } else {
    names.push({ ...translated, name: "A′", kind: "result" });
    expected = region018(translated);
    options = regions018;
    prompt = `A’yı (${fmt(h)}; ${fmt(k)}) vektörü kadar ötele. Yeni nokta hangi bölge veya eksende olur?`;
    evidence = `A′=A+(${fmt(h)}; ${fmt(k)})=${coord(translated)}; değişim (${fmt(translated.x - a.x)}; ${fmt(translated.y - a.y)}).`;
    title = "Ötelemede yön ve işareti birlikte oku";
  }
  const coordinateRanges = (
    name: string,
    p: Point018,
    keys: readonly ["ax" | "bx" | "cx" | "sx", "ay" | "by" | "cy" | "sy"],
  ) => (
    <>
      <Range018
        label={`${name} apsisi x`}
        value={p.x}
        onChange={(v) => change({ [keys[0]]: v })}
      />
      <Range018
        label={`${name} ordinatı y`}
        value={p.y}
        onChange={(v) => change({ [keys[1]]: v })}
      />
    </>
  );
  const stepResult =
    section.point && section.ratioDefined
      ? {
          ap: distance018(a, section.point).distance,
          pb: distance018(section.point, b).distance,
        }
      : null;
  return (
    <section
      className="m018-lab"
      data-forge018={lessonId}
      data-current-mode={mode}
    >
      <h3>Noktayı yerleştir, ilişkisini keşfet</h3>
      <p>
        Noktanın yerini değiştir; önce ne olacağını düşün, sonra aynı ölçekli
        şekil ve hesapla denetle. Bütün uzunluklar aynı birimdedir.
      </p>
      <Choice018
        label="İncelenen ilişki"
        value={mode}
        options={modes018}
        onChange={(value) => change({ mode: value, prediction: "" })}
      />
      <h4>{title}</h4>
      <div className="m018-controls">
        {coordinateRanges("A", a, ["ax", "ay"])}
        {["distance", "section", "centroid"].includes(mode) &&
          coordinateRanges("B", b, ["bx", "by"])}
        {mode === "centroid" && coordinateRanges("C", c, ["cx", "cy"])}
        {mode === "reflection" && (
          <Choice018
            label="Ayna veya merkez"
            value={reflection}
            options={reflectionOptions018}
            onChange={(value) => change({ reflection: value })}
          />
        )}
        {((mode === "reflection" && reflection === "center") ||
          mode === "midpoint") &&
          coordinateRanges(mode === "midpoint" ? "M" : "S", s, ["sx", "sy"])}
        {mode === "section" && (
          <>
            <Choice018
              label="Bölme türü"
              value={saved.external ? "external" : "internal"}
              options={[
                ["internal", "İçten"],
                ["external", "Dıştan"],
              ]}
              onChange={(value) => change({ external: value === "external" })}
            />
            <Range018
              label="AP oranı m"
              value={m}
              min={1}
              max={6}
              unit=""
              onChange={(v) => change({ m: v })}
            />
            <Range018
              label="PB oranı n"
              value={n}
              min={1}
              max={6}
              unit=""
              onChange={(v) => change({ n: v })}
            />
          </>
        )}
        {mode === "translation" && (
          <>
            <Range018
              label="Yatay öteleme h"
              value={h}
              onChange={(v) => change({ h: v })}
            />
            <Range018
              label="Düşey öteleme k"
              value={k}
              onChange={(v) => change({ k: v })}
            />
          </>
        )}
      </div>
      <div className="m018-prediction">
        <h4>Önce tahminini oluştur</h4>
        <p>{prompt}</p>
        <Choice018
          label="Sonuç tahminin"
          value={state.prediction}
          options={[["", "Seç"], ...options]}
          onChange={(value) => change({ prediction: value })}
        />
        <label htmlFor={reasonId}>Modelden gerekçen</label>
        <textarea
          id={reasonId}
          value={state.reason}
          maxLength={120}
          rows={3}
          onChange={(e) => change({ reason: e.target.value.slice(0, 120) })}
        />
        <p className="m018-caption">
          {state.reason.length}/120 karakter. Kısa gerekçeni yaz; kıyas
          sonucu gerekçenin otomatik doğruluk notu değildir.
        </p>
        <button
          type="button"
          className="m018-compare"
          disabled={
            !options.some(([v]) => v === state.prediction) ||
            !state.reason.trim()
          }
          onClick={() => set({ reason: state.reason, checked: true })}
        >
          Kanıtı gör
        </button>
        {state.checked && (
          <div className="m018-feedback" role="status">
            <p>
              {state.prediction === expected
                ? "Tahminin bu koşullarla uyumlu."
                : "Tahminini yeni kanıtla yeniden düşün."}
            </p>
            <p>{evidence}</p>
            <p>Gerekçen: {state.reason}</p>
          </div>
        )}
      </div>
      <Plane018 points={names} title={title}>
        {(scale) => (
          <>
            {mode === "distance" && (
              <>
                {segment018(a, b, scale, "m018-main-line", "distance")}
                {segment018(
                  a,
                  { x: b.x, y: a.y },
                  scale,
                  "m018-helper-line",
                  "horizontal-change",
                )}
                {segment018(
                  { x: b.x, y: a.y },
                  b,
                  scale,
                  "m018-helper-line",
                  "vertical-change",
                )}
                {Math.abs(scale.x(a.x) - scale.x(b.x)) >= 20 &&
                  Math.abs(scale.y(a.y) - scale.y(b.y)) >= 20 && (
                    <path
                      className="m018-right-angle"
                      d={`M${scale.x(b.x) + Math.sign(a.x - b.x) * 12} ${scale.y(a.y)} v${Math.sign(a.y - b.y) * 12} h${-Math.sign(a.x - b.x) * 12}`}
                    />
                  )}
              </>
            )}
            {mode === "reflection" && (
              <>
                {reflection !== "center" &&
                  reflection !== "origin" &&
                  (reflection === "x"
                    ? segment018(
                        { x: -scale.limit, y: 0 },
                        { x: scale.limit, y: 0 },
                        scale,
                        "m018-mirror",
                        "mirror",
                      )
                    : reflection === "y"
                      ? segment018(
                          { x: 0, y: -scale.limit },
                          { x: 0, y: scale.limit },
                          scale,
                          "m018-mirror",
                          "mirror",
                        )
                      : reflection === "diagonal"
                        ? segment018(
                            { x: -scale.limit, y: -scale.limit },
                            { x: scale.limit, y: scale.limit },
                            scale,
                            "m018-mirror",
                            "mirror",
                          )
                        : segment018(
                            { x: -scale.limit, y: scale.limit },
                            { x: scale.limit, y: -scale.limit },
                            scale,
                            "m018-mirror",
                            "mirror",
                          ))}
                {segment018(
                  a,
                  reflected,
                  scale,
                  "m018-main-line",
                  "reflection",
                )}
                {reflection === "origin" && (
                  <circle
                    cx="360"
                    cy="320"
                    r="8"
                    className="m018-center-mark"
                  />
                )}
              </>
            )}
            {mode === "section" && (
              <>
                {segment018(a, b, scale, "m018-main-line", "original-segment")}
                {section.point && section.ratioDefined && (
                  <>
                    {segment018(
                      a,
                      section.point,
                      scale,
                      "m018-helper-line",
                      "ratio-ap",
                    )}
                    {segment018(
                      section.point,
                      b,
                      scale,
                      "m018-ratio-line",
                      "ratio-pb",
                    )}
                  </>
                )}
              </>
            )}
            {mode === "centroid" && (
              <>
                <path
                  className={
                    center.triangle ? "m018-triangle" : "m018-helper-line"
                  }
                  d={`M${scale.x(a.x)} ${scale.y(a.y)} L${scale.x(b.x)} ${scale.y(b.y)} L${scale.x(c.x)} ${scale.y(c.y)} Z`}
                  data-real-triangle={String(center.triangle)}
                />
                {segment018(
                  a,
                  center.oppositeA,
                  scale,
                  "m018-main-line",
                  "median-a",
                )}
                {segment018(
                  b,
                  center.oppositeB,
                  scale,
                  "m018-helper-line",
                  "median-b",
                )}
                {segment018(
                  c,
                  center.oppositeC,
                  scale,
                  "m018-helper-line",
                  "median-c",
                )}
              </>
            )}
            {mode === "midpoint" && (
              <>
                {segment018(
                  a,
                  missing,
                  scale,
                  "m018-main-line",
                  "missing-endpoint",
                )}
                {segment018(a, s, scale, "m018-helper-line", "am")}
              </>
            )}
            {mode === "translation" && (
              <>
                {segment018(
                  a,
                  translated,
                  scale,
                  "m018-main-line",
                  "translation",
                )}
                {segment018(
                  a,
                  { x: translated.x, y: a.y },
                  scale,
                  "m018-helper-line",
                  "translate-h",
                )}
                {segment018(
                  { x: translated.x, y: a.y },
                  translated,
                  scale,
                  "m018-helper-line",
                  "translate-k",
                )}
              </>
            )}
          </>
        )}
      </Plane018>
      <div className="m018-result" data-model-result>
        <h4>Şeklin sayısal kanıtı</h4>
        <ul className="m018-point-list">
          {names.map((p) => (
            <li key={p.name}>
              <strong>{p.name}</strong> {coord(p)} — {regionName(p)}
            </li>
          ))}
        </ul>
        {mode === "distance" && (
          <>
            <p data-distance-result>
              Δx={fmt(d.dx)}, Δy={fmt(d.dy)}. |AB|={fmt(d.distance)} birim;
              köşeli yol={fmt(d.axisPath)} birim.
            </p>
            <p>
              A’nın x eksenine uzaklığı {fmt(d.aToXAxis)}, y eksenine uzaklığı{" "}
              {fmt(d.aToYAxis)} birim.
            </p>
            <p>
              {d.same
                ? "A=B; uzaklık sıfır, bu iki harf tek bir konumda."
                : d.equalAxisPath
                  ? "Noktalar aynı yatay veya düşey doğru üzerinde; bir koordinat farkı sıfır."
                  : "Yardımcı dik kenarlar |Δx| ve |Δy|; doğrudan yol Pisagor bağıntısıyla hesaplanır."}
            </p>
          </>
        )}
        {mode === "reflection" && (
          <>
            <p data-reflection-result>{evidence}</p>
            <p>
              {reflection === "x"
                ? "Kural: (x; y)→(x; −y)."
                : reflection === "y"
                  ? "Kural: (x; y)→(−x; y)."
                  : reflection === "origin"
                    ? "Kural: (x; y)→(−x; −y). Orijin, iki ucun orta noktasıdır."
                    : reflection === "diagonal"
                      ? "Kural: (x; y)→(y; x). Kesikli ayna y=x doğrusudur."
                      : reflection === "anti"
                        ? "Kural: (x; y)→(−y; −x). Kesikli ayna y=−x doğrusudur."
                        : "Kural: A′=2S−A. S bir nokta merkezidir; ayna doğrusu değildir."}
            </p>
          </>
        )}
        {mode === "section" && (
          <>
            <p data-section-result>{evidence}</p>
            <p>
              |AP|:|PB|={m}:{n}; tür: {saved.external ? "dıştan" : "içten"}.
            </p>
            {stepResult && (
              <p>
                |AP|={fmt(stepResult.ap)}, |PB|={fmt(stepResult.pb)} birim; oran{" "}
                {fmt(stepResult.ap / stepResult.pb)}.
              </p>
            )}
            <p>
              {saved.external
                ? "Formül: P=(mB−nA)/(m−n); farklı uçlar ve m≠n koşullarıyla."
                : "Formül: P=(nA+mB)/(m+n); tanımlı uzaklık oranı için uçlar farklı olmalıdır."}
            </p>
          </>
        )}
        {mode === "centroid" && (
          <>
            <p data-centroid-result>{evidence}</p>
            <p>M, BC’nin orta noktası: {coord(center.oppositeA)}.</p>
            <p>
              {center.triangle
                ? `|AG|=${fmt(distance018(a, center.centroid).distance)}, |GM|=${fmt(distance018(center.centroid, center.oppositeA).distance)} birim. Üç çizgi de birer kenarortay.`
                : "Alan sıfır; çizgiler gerçek bir üçgenin kenarortay ağı olarak yorumlanmaz."}
            </p>
          </>
        )}
        {mode === "midpoint" && (
          <>
            <p data-midpoint-result>{evidence}</p>
            <p>
              |AM|={fmt(distance018(a, s).distance)}, |MB|=
              {fmt(distance018(s, missing).distance)} birim.{" "}
              {a.x === s.x && a.y === s.y
                ? "A=M=B; her iki uzunluk sıfır."
                : "M iki farklı ucun arasında ve iki parçanın uzunluğu eşit."}
            </p>
          </>
        )}
        {mode === "translation" && (
          <>
            <p data-translation-result>{evidence}</p>
            <p>
              |AA′|={fmt(distance018(a, translated).distance)} birim. Bütün
              şekle aynı öteleme uygulanırsa noktalar arası farklar korunur.
            </p>
          </>
        )}
      </div>
      <p className="m018-caption">
        Keşif seçimleri bu cihazda saklanır. Şekli açmak, süre geçirmek veya
        tahmin sınamak XP, doğru soru ya da konu tamamlama kaydı
        oluşturmaz.
      </p>
    </section>
  );
}
