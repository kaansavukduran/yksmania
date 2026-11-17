import {
  Children,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useExploration } from "./useExploration";
import {
  polygon032,
  quadrilateral032,
  trapezoid032,
  kite032,
  parallelogram032,
  prism032,
  pyramid032,
  type Geometry032Point,
} from "./geometryExpansion032Model";
import "./geometryExpansion032.css";
export const geometryExpansion032Ids = [
  "tyt-geo-cokgenler-032",
  "tyt-geo-dortgen-hiyerarsi-032",
  "tyt-geo-yamuk-deltoid-032",
  "tyt-geo-paralelkenar-ozel-dortgenler-032",
  "tyt-geo-dik-prizmalar-032",
  "tyt-geo-piramitler-032",
] as const;
const fmt = (v: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(v) < 1e-9 ? 0 : v,
  );
// Break only at natural word boundaries; canonical accessible labels stay intact.
const readableWords: Record<string, string> = {
  paralelkenar: "paralel\u00adkenar",
  paralelkenarın: "paralel\u00adkenarın",
  piramidin: "pira\u00admidin",
  piramidi: "pira\u00admidi",
  yüksekliği: "yük\u00adsek\u00adliği",
  yüksekliğini: "yük\u00adsek\u00adliğini",
  çokgenler: "çok\u00adgenler",
  oluşturmaz: "oluş\u00adturmaz",
  uzunlukları: "uzun\u00adlukları",
  koşullarını: "koşul\u00adlarını",
};
function Readable({ children }: { children: ReactNode }) {
  return (
    <>
      {Children.map(children, (child) => {
        if (typeof child !== "string") return child;
        return child.split(/(\d+(?:[.,]\d+)?°|birim[²³])/gu).map((part, i) => {
          if (/^(?:\d+(?:[.,]\d+)?°|birim[²³])$/u.test(part))
            return (
              <span key={i} className="g032-unit">
                {part}
              </span>
            );
          return part.replace(/[\p{L}]+/gu, (word) => {
            const replacement = readableWords[word.toLocaleLowerCase("tr-TR")];
            if (!replacement) return word;
            return word[0] === word[0].toLocaleUpperCase("tr-TR")
              ? replacement[0].toLocaleUpperCase("tr-TR") + replacement.slice(1)
              : replacement;
          });
        });
      })}
    </>
  );
}

const pts = (p: Geometry032Point[]) => p.map((q) => `${q.x},${q.y}`).join(" ");
function fit(
  points: Geometry032Point[],
  width = 440,
  height = 260,
  center = { x: 320, y: 220 },
) {
  const xs = points.map((p) => p.x),
    ys = points.map((p) => p.y),
    loX = Math.min(...xs),
    hiX = Math.max(...xs),
    loY = Math.min(...ys),
    hiY = Math.max(...ys),
    scale = Math.min(width / (hiX - loX || 1), height / (hiY - loY || 1));
  return (p: Geometry032Point) => ({
    x: center.x + (p.x - (loX + hiX) / 2) * scale,
    y: center.y - (p.y - (loY + hiY) / 2) * scale,
  });
}
function Figure({
  label,
  children,
  height = 440,
}: {
  label: string;
  children: ReactNode;
  height?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(640);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const read = () => setWidth(node.getBoundingClientRect().width || 640);
    read();
    const observer = new ResizeObserver(read);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <svg
      ref={ref}
      role="img"
      aria-label={label}
      className="g032-figure"
      viewBox={`0 0 640 ${height}`}
      style={
        {
          "--g032-font": `${Math.max(21, (15 * 640) / Math.max(80, width))}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </svg>
  );
}
function Line({
  a,
  b,
  kind = "",
}: {
  a: Geometry032Point;
  b: Geometry032Point;
  kind?: string;
}) {
  return (
    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={`g032-line ${kind}`} />
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
  change: (n: number) => void;
  step?: number;
  unit?: string;
}) {
  const id = useId();
  return (
    <label className="g032-range" htmlFor={id}>
      <span>
        <Readable>{label}</Readable>
        <output htmlFor={id}>
          {fmt(value)} {unit}
        </output>
      </span>
      <input
        id={id}
        type="range"
        aria-label={label}
        aria-valuetext={`${fmt(value)} ${unit}`}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => change(Number(e.target.value))}
      />
    </label>
  );
}
function Modes({
  name,
  value,
  items,
  change,
}: {
  name: string;
  value: string;
  items: [string, string][];
  change: (v: string) => void;
}) {
  return (
    <div className="g032-modes" role="group" aria-label={name}>
      {items.map(([key, label]) => (
        <button
          className="secondary"
          type="button"
          key={key}
          aria-pressed={value === key}
          aria-label={label}
          onClick={() => change(key)}
        >
          <Readable>{label}</Readable>
        </button>
      ))}
    </div>
  );
}
function Evidence({ items }: { items: [string, string][] }) {
  return (
    <dl className="g032-evidence" aria-live="polite">
      {items.map(([key, value]) => (
        <div key={key}>
          <dt aria-label={key}>
            <Readable>{key}</Readable>
          </dt>
          <dd aria-label={value}>
            <Readable>{value}</Readable>
          </dd>
        </div>
      ))}
    </dl>
  );
}
function Lab({
  title,
  help,
  children,
}: {
  title: string;
  help: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <section className="visual-lab g032-lab" aria-labelledby={id}>
      <div className="lab-heading">
        <h2 id={id}>{title}</h2>
        <p>
          <Readable>{help}</Readable>
        </p>
      </div>
      {children}
      <p className="g032-footnote">
        <Readable>
          Şekli incelemek ve değerleri değiştirmek öğrenme puanı ya da
          tamamlanma kaydı oluşturmaz. Seçimlerin bu cihazda saklanır.
        </Readable>
      </p>
    </section>
  );
}
function Polygon() {
  const [s, set] = useExploration("g032:polygon", { n: 5, mode: "fan" });
  const m = polygon032(s.n),
    p = fit(m.vertices, 390, 280),
    vs = m.vertices.map(p);
  return (
    <Lab
      title="Çokgeni üçgenlere ayır"
      help="Kenar sayısını değiştir. Bir köşeden çizilen köşegenleri, iç açı toplamını ve bir turdaki dış dönüşü birlikte incele."
    >
      <div className="g032-controls">
        <Range
          label="Kenar sayısı"
          value={m.n}
          min={3}
          max={12}
          unit="kenar"
          change={(n) => set({ n })}
        />
      </div>
      <Modes
        name="Çokgen görünümü"
        value={s.mode === "diagonals" ? "diagonals" : "fan"}
        items={[
          ["fan", "Üçgenlere ayır"],
          ["diagonals", "Bütün köşegenler"],
        ]}
        change={(mode) => set({ mode })}
      />
      <Figure
        label={`${m.n} kenarlı düzgün çokgen; ${m.fanTriangles} üçgene ayrılır. ${m.diagonals} köşegeni vardır.`}
      >
        {s.mode !== "diagonals" &&
          Array.from({ length: m.n - 2 }, (_, i) => (
            <polygon
              key={i}
              points={pts([vs[0], vs[i + 1], vs[i + 2]])}
              className={`g032-fill ${i % 2 ? "g032-alternate" : ""}`}
            />
          ))}
        {s.mode === "diagonals" &&
          vs.flatMap((a, i) =>
            vs.map((b, j) =>
              j > i + 1 && !(i === 0 && j === m.n - 1) ? (
                <Line key={`${i}-${j}`} a={a} b={b} kind="g032-helper" />
              ) : null,
            ),
          )}
        <polygon points={pts(vs)} className="g032-outline" />
        {s.mode !== "diagonals" &&
          Array.from({ length: m.n - 3 }, (_, i) => (
            <Line key={i} a={vs[0]} b={vs[i + 2]} kind="g032-accent" />
          ))}
        <circle cx={vs[0].x} cy={vs[0].y} r={6} className="g032-point" />
        <text x={vs[0].x} y={vs[0].y + 48} textAnchor="middle">
          A
        </text>
      </Figure>
      <Evidence
        items={[
          ["Üçgen sayısı", `${m.n} − 2 = ${m.fanTriangles}`],
          ["İç açı toplamı", `${m.fanTriangles} × 180° = ${m.interiorSum}°`],
          ["Toplam köşegen", `${m.n} × (${m.n} − 3) / 2 = ${m.diagonals}`],
          ["Bir iç açı · düzgün çokgen", `${fmt(m.interiorAngle)}°`],
          [
            "Bir dış açı · düzgün çokgen",
            `360° / ${m.n} = ${fmt(m.exteriorAngle)}°`,
          ],
        ]}
      />
      <p className="g032-insight">
        <Readable>
          İç açı toplamı (n−2)·180° bütün basit çokgenler için geçerlidir.
          Buradaki tek köşeden üçgenleme çizimi dışbükey çokgeni kullanır. Bir
          iç açıyı toplamı n’ye bölerek bulabilmek için çokgenin eş açılı olması
          gerekir; düzgün çokgen bu koşulu sağlar. Yıldız biçiminde kendini
          kesen çizgilere bu modeli uygulama.
        </Readable>
      </p>
    </Lab>
  );
}
const quadNames: [string, string][] = [
  ["trapezoid", "Yamuk"],
  ["parallelogram", "Paralelkenar"],
  ["rectangle", "Dikdörtgen"],
  ["rhombus", "Eşkenar dörtgen"],
  ["square", "Kare"],
  ["kite", "Deltoid"],
];
function Hierarchy() {
  const [s, set] = useExploration("g032:hierarchy", { kind: "square" });
  const m = quadrilateral032(s.kind),
    p = fit(m.points),
    vs = m.points.map(p);
  const labels: [string, boolean][] = [
    ["Dörtgen", true],
    ["Yamuk", m.trapezoid],
    ["Paralelkenar", m.parallelogram],
    ["Dikdörtgen", m.rectangle],
    ["Eşkenar dörtgen", m.rhombus],
    ["Kare", m.square],
    ["Deltoid", m.kite],
  ];
  return (
    <Lab
      title="Bir şekil birden fazla aileye aittir"
      help="Bir şekil seç. Vurgulanan aileler o şeklin koşullarını kapsar. Örneğin kare, dikdörtgen ve eşkenar dörtgen özelliklerini birlikte taşır."
    >
      <Modes
        name="İncelenen dörtgen"
        value={m.kind}
        items={quadNames}
        change={(kind) => set({ kind })}
      />
      <Figure
        label={`${quadNames.find(([key]) => key === m.kind)?.[1]}. Dört köşeli çizim; aile ilişkileri altındaki listede açıklanır.`}
      >
        <polygon points={pts(vs)} className="g032-fill" />
        <Line a={vs[0]} b={vs[2]} kind="g032-helper" />
        <Line a={vs[1]} b={vs[3]} kind="g032-helper" />
      </Figure>
      <ul className="g032-families" aria-label="Seçilen şeklin aileleri">
        {labels.map(([label, yes]) => (
          <li key={label} className={yes ? "g032-belongs" : ""}>
            <span aria-hidden="true">{yes ? "✓" : "—"}</span>{" "}
            <Readable>{label}</Readable>
            <span>{yes ? "Bu aileye ait" : "Bu aileye ait değil"}</span>
          </li>
        ))}
      </ul>
      <p className="g032-insight">
        <Readable>
          Bu anlatımda yamuk, en az bir çift karşı kenarı paralel dörtgendir;
          paralelkenar da yamuk ailesindedir. Deltoid, iki çift komşu kenarı
          kendi aralarında eşit dörtgendir; bu kapsayıcı tanımda eşkenar
          dörtgenler de deltoiddir. Ters çıkarım yapma: her yamuk paralelkenar,
          her deltoid eşkenar dörtgen değildir.
        </Readable>
      </p>
    </Lab>
  );
}
function TrapezoidKite() {
  const [s, set] = useExploration("g032:trapezoid-kite", {
    mode: "trapezoid",
    a: 10,
    b: 6,
    h: 5,
    shift: 2,
    p: 8,
    u: 3,
    l: 6,
  });
  const m = trapezoid032(s.a, s.b, s.h, s.shift),
    k = kite032(s.p, s.u, s.l),
    kite = s.mode === "kite",
    shape = kite ? k.points : m.points,
    p = fit(shape),
    vs = shape.map(p);
  return (
    <Lab
      title="Alanı dik uzaklıkla ilişkilendir"
      help="Yamuğun üst tabanını kaydır; alanın niçin değişmediğini gör. Deltoide geçerek hangi köşegenin diğerini ortaladığını ayır."
    >
      <Modes
        name="Alan modeli"
        value={kite ? "kite" : "trapezoid"}
        items={[
          ["trapezoid", "Yamuk"],
          ["kite", "Deltoid"],
        ]}
        change={(mode) => set({ mode })}
      />
      <div className="g032-controls">
        {kite ? (
          <>
            <Range
              label="Yatay köşegen"
              value={k.p}
              min={2}
              max={12}
              change={(p) => set({ p })}
            />
            <Range
              label="Düşey üst parça"
              value={k.upper}
              min={2}
              max={10}
              change={(u) => set({ u })}
            />
            <Range
              label="Düşey alt parça"
              value={k.lower}
              min={2}
              max={10}
              change={(l) => set({ l })}
            />
          </>
        ) : (
          <>
            <Range
              label="Alt taban"
              value={m.a}
              min={3}
              max={14}
              change={(a) => set({ a })}
            />
            <Range
              label="Üst taban"
              value={m.b}
              min={2}
              max={12}
              change={(b) => set({ b })}
            />
            <Range
              label="Yamuğun yüksekliği"
              value={m.h}
              min={2}
              max={10}
              change={(h) => set({ h })}
            />
            <Range
              label="Üst tabanın kayması"
              value={m.offset}
              min={-6}
              max={8}
              change={(shift) => set({ shift })}
            />
          </>
        )}
      </div>
      <Figure
        label={
          kite
            ? "Deltoidde birbirine dik iki köşegen. Yatay köşegen iki eş parçaya ayrılır."
            : "Paralel iki tabanı ve dik yüksekliğiyle yamuk. Üst tabanın yatay kayması alanı değiştirmez."
        }
      >
        <polygon points={pts(vs)} className="g032-fill" />
        {kite ? (
          <>
            <Line a={vs[0]} b={vs[2]} kind="g032-accent" />
            <Line a={vs[1]} b={vs[3]} kind="g032-secondary" />
            <polyline
              className="g032-line"
              points={pts([
                p({ x: 0, y: 0.6 }),
                p({ x: 0.6, y: 0.6 }),
                p({ x: 0.6, y: 0 }),
              ])}
            />
          </>
        ) : (
          <>
            <Line
              a={p({ x: m.offset, y: m.h })}
              b={p({ x: m.offset, y: 0 })}
              kind="g032-helper"
            />
            <Line
              a={p({ x: 0, y: 0 })}
              b={p({ x: m.a, y: 0 })}
              kind="g032-accent"
            />
            <Line
              a={p({ x: m.offset, y: m.h })}
              b={p({ x: m.offset + m.b, y: m.h })}
              kind="g032-accent"
            />
            <Line
              a={p({ x: m.offset / 2, y: m.h / 2 })}
              b={p({ x: (m.a + m.offset + m.b) / 2, y: m.h / 2 })}
              kind="g032-secondary"
            />
          </>
        )}
      </Figure>
      <Evidence
        items={
          kite
            ? [
                [
                  "Alan",
                  `${fmt(k.p)} × ${fmt(k.vertical)} / 2 = ${fmt(k.area)} birim²`,
                ],
                ["Yatay yarım köşegen", `${fmt(k.p / 2)} birim`],
                ["Düşey parçalar", `${fmt(k.upper)} ve ${fmt(k.lower)} birim`],
                [
                  "Üst/alt eş kenar çiftleri",
                  `${fmt(k.upperSide)} / ${fmt(k.lowerSide)} birim`,
                ],
              ]
            : [
                [
                  "Alan",
                  `(${fmt(m.a)} + ${fmt(m.b)}) × ${fmt(m.h)} / 2 = ${fmt(m.area)} birim²`,
                ],
                [
                  "Orta taban",
                  `(${fmt(m.a)} + ${fmt(m.b)}) / 2 = ${fmt(m.midline)} birim`,
                ],
                [
                  "Sol/sağ yan kenarlar",
                  `${fmt(m.leftSide)} / ${fmt(m.rightSide)} birim`,
                ],
              ]
        }
      />
      <p className="g032-insight">
        <Readable>
          {kite
            ? `${k.bothBisect ? "Bu seçimde düşey parçalar da eşit; şekil eşkenar dörtgendir." : "Düşey parçalar eşit değil; her köşegen diğerini ortalamaz."} Alan formülündeki çarpım iki tam köşegenin çarpımıdır. Bir yarım parçayı tam köşegen yerine koyma.`
            : "Yeşil orta taban, iki yan kenarın orta noktalarını birleştirir. Turuncu tabanların arası dik yüksekliktir; eğik yan kenarı h yerine kullanma. Kaydırıcıyı değiştirirken iki taban ve yükseklik sabit kaldığı için alan sabittir."}
        </Readable>
      </p>
    </Lab>
  );
}
function Parallelogram() {
  const [s, set] = useExploration("g032:parallelogram", {
    a: 10,
    h: 6,
    shear: 4,
  });
  const m = parallelogram032(s.a, s.h, s.shear),
    p = fit([...m.points, { x: m.shear, y: 0 }]),
    vs = m.points.map(p);
  return (
    <Lab
      title="Eğik kenar ile yüksekliği ayır"
      help="Üst kenarı kaydır. Eğik kenar ve çevre değişirken aynı tabanla aynı dik yüksekliğin alanı koruduğunu incele."
    >
      <div
        className="g032-presets"
        role="group"
        aria-label="Özel dörtgen örnekleri"
      >
        <button
          className="secondary"
          type="button"
          onClick={() => set({ a: 10, h: 6, shear: 0 })}
        >
          Dikdörtgen örneği
        </button>
        <button
          className="secondary"
          type="button"
          onClick={() => set({ a: 10, h: 8, shear: 6 })}
        >
          Eşkenar dörtgen örneği
        </button>
        <button
          className="secondary"
          type="button"
          onClick={() => set({ a: 8, h: 8, shear: 0 })}
        >
          Kare örneği
        </button>
      </div>
      <div className="g032-controls">
        <Range
          label="Paralelkenar tabanı"
          value={m.a}
          min={3}
          max={14}
          change={(a) => set({ a })}
        />
        <Range
          label="Dik yükseklik"
          value={m.h}
          min={2}
          max={10}
          change={(h) => set({ h })}
        />
        <Range
          label="Yatay kayma"
          value={m.shear}
          min={-8}
          max={8}
          change={(shear) => set({ shear })}
        />
      </div>
      <Figure
        label={`Paralelkenar: taban ${fmt(m.a)}, dik yükseklik ${fmt(m.h)}, alan ${fmt(m.area)} birim kare. Eğik kenar ${fmt(m.side)} birim.`}
      >
        <polygon points={pts(vs)} className="g032-fill" />
        <Line a={vs[0]} b={vs[2]} kind="g032-helper" />
        <Line a={vs[1]} b={vs[3]} kind="g032-helper" />
        <Line
          a={p({ x: m.shear, y: 0 })}
          b={p({ x: m.shear, y: m.h })}
          kind="g032-accent"
        />
        <polyline
          className="g032-line"
          points={pts([
            p({ x: m.shear, y: 0.6 }),
            p({ x: m.shear + 0.6, y: 0.6 }),
            p({ x: m.shear + 0.6, y: 0 }),
          ])}
        />
        <text
          x={p({ x: m.shear, y: m.h / 2 }).x - 20}
          y={p({ x: m.shear, y: m.h / 2 }).y}
          textAnchor="end"
        >
          h
        </text>
        <text x={(vs[0].x + vs[1].x) / 2} y={vs[0].y + 48} textAnchor="middle">
          a
        </text>
      </Figure>
      <Evidence
        items={[
          [
            "Alan · taban × yükseklik",
            `${fmt(m.a)} × ${fmt(m.h)} = ${fmt(m.area)} birim²`,
          ],
          ["Eğik kenar", `${fmt(m.side)} birim`],
          ["Çevre", `${fmt(m.perimeter)} birim`],
          [
            "Köşegen uzunlukları",
            `${fmt(m.diagonal1)} ve ${fmt(m.diagonal2)} birim`,
          ],
          [
            "Özel durum",
            m.square
              ? "Kare"
              : m.rectangle
                ? "Dikdörtgen"
                : m.rhombus
                  ? "Eşkenar dörtgen"
                  : "Genel paralelkenar",
          ],
        ]}
      />
      <p className="g032-insight">
        <Readable>
          Her paralelkenarın köşegenleri birbirini ortalar; uzunluklarının eşit
          olması genel bir kural değildir. Dikdörtgende köşegenler eşittir,
          eşkenar dörtgende birbirine diktir; kare ikisini de sağlar. h, seçilen
          a tabanına diktir. a·eğik kenar hesabı yalnız bu iki kenar birbirine
          dikse alan verir.
        </Readable>
      </p>
    </Lab>
  );
}
function Prism() {
  const [s, set] = useExploration("g032:prism", {
    a: 8,
    b: 5,
    h: 6,
    view: "solid",
  });
  const m = prism032(s.a, s.b, s.h),
    net = s.view === "net";
  const project = (x: number, y: number, z: number) => ({
    x: x + y * 0.55,
    y: z + y * 0.3,
  });
  const raw = [
      project(0, 0, 0),
      project(m.a, 0, 0),
      project(m.a, m.b, 0),
      project(0, m.b, 0),
      project(0, 0, m.h),
      project(m.a, 0, m.h),
      project(m.a, m.b, m.h),
      project(0, m.b, m.h),
    ],
    p = fit(raw, 420, 260),
    v = raw.map(p);
  const scale = Math.min(470 / (2 * (m.a + m.b)), 290 / (m.h + 2 * m.b)),
    left = (640 - 2 * (m.a + m.b) * scale) / 2,
    top = 80 + m.b * scale;
  const faces = [
    [0, 0, m.a, m.h],
    [m.a, 0, m.b, m.h],
    [m.a + m.b, 0, m.a, m.h],
    [2 * m.a + m.b, 0, m.b, m.h],
    [0, -m.b, m.a, m.b],
    [0, m.h, m.a, m.b],
  ];
  return (
    <Lab
      title="Prizmayı aç ve yüzlerini say"
      help="Üç uzunluğu değiştir. Katı görünüm ile aynı uzunluklardan oluşan açınım arasında geçiş yap; yüzey alanını ve hacmi ayrı hesapla."
    >
      <div className="g032-controls">
        <Range
          label="Prizma eni"
          value={m.a}
          min={3}
          max={12}
          change={(a) => set({ a })}
        />
        <Range
          label="Prizma derinliği"
          value={m.b}
          min={2}
          max={10}
          change={(b) => set({ b })}
        />
        <Range
          label="Prizma yüksekliği"
          value={m.h}
          min={3}
          max={12}
          change={(h) => set({ h })}
        />
      </div>
      <Modes
        name="Prizma görünümü"
        value={net ? "net" : "solid"}
        items={[
          ["solid", "Katı görünüm"],
          ["net", "Açınımı göster"],
        ]}
        change={(view) => set({ view })}
      />
      <Figure
        label={
          net
            ? "Dikdörtgenler prizmasının altı dikdörtgen yüzünden oluşan açınımı. İki eş taban farklı renktedir."
            : "Dikdörtgenler prizması. Turuncu uzay köşegeni üç dik uzunluğu birlikte kullanır."
        }
        height={480}
      >
        <g key={net ? "net" : "solid"} className="g032-reveal">
          {net ? (
            faces.map(([x, y, w, h], i) => (
              <rect
                key={i}
                x={left + x * scale}
                y={top + y * scale}
                width={w * scale}
                height={h * scale}
                className={`g032-fill ${i >= 4 ? "g032-alternate" : ""}`}
              />
            ))
          ) : (
            <>
              <polygon
                points={pts([v[0], v[1], v[5], v[4]])}
                className="g032-fill"
              />
              <polygon
                points={pts([v[1], v[2], v[6], v[5]])}
                className="g032-fill g032-alternate"
              />
              <polygon
                points={pts([v[4], v[5], v[6], v[7]])}
                className="g032-fill"
              />
              {[
                [0, 3],
                [3, 2],
                [3, 7],
              ].map(([a, b]) => (
                <Line key={`${a}-${b}`} a={v[a]} b={v[b]} kind="g032-helper" />
              ))}
              <Line a={v[0]} b={v[6]} kind="g032-accent" />
            </>
          )}
        </g>
        {!net && (
          <>
            <text x={(v[0].x + v[1].x) / 2} y={v[0].y + 48} textAnchor="middle">
              a
            </text>
            <text x={(v[1].x + v[2].x) / 2 + 35} y={(v[1].y + v[2].y) / 2 + 30}>
              b
            </text>
            <text x={v[1].x + 35} y={(v[1].y + v[5].y) / 2}>
              h
            </text>
          </>
        )}
      </Figure>
      <Evidence
        items={[
          [
            "Taban alanı",
            `${fmt(m.a)} × ${fmt(m.b)} = ${fmt(m.baseArea)} birim²`,
          ],
          ["Yüzey alanı", `2ab + 2ah + 2bh = ${fmt(m.surface)} birim²`],
          ["Hacim", `a × b × h = ${fmt(m.volume)} birim³`],
          ["Uzay köşegeni", `√(a²+b²+h²) = ${fmt(m.spaceDiagonal)} birim`],
        ]}
      />
      <p className="g032-insight">
        <Readable>
          Açınımdaki altı yüz iki taban ve dört yan yüzden oluşur. Katı görünüm
          perspektif gösterimdir; ekrandan cetvelle uzunluk ölçme. Uzay
          köşegenini önce tabandaki √(a²+b²), sonra bu uzunlukla h’nin
          oluşturduğu dik üçgende bul. Yüzey alanı birim², hacim birim³ ile
          ifade edilir.
        </Readable>
      </p>
    </Lab>
  );
}
function Pyramid() {
  const [s, set] = useExploration("g032:pyramid", {
    a: 8,
    h: 6,
    k: 0.5,
    view: "solid",
  });
  const m = pyramid032(s.a, s.h, s.k),
    net = s.view === "net";
  const project = (x: number, y: number, z: number) => ({
    x: x + y * 0.45,
    y: z + y * 0.28,
  });
  const corners = [
      [-m.a / 2, -m.a / 2],
      [m.a / 2, -m.a / 2],
      [m.a / 2, m.a / 2],
      [-m.a / 2, m.a / 2],
    ],
    raw = corners.map(([x, y]) => project(x, y, 0)),
    apex = project(0, 0, m.h),
    center = project(0, 0, 0),
    faceFoot = project(0, -m.a / 2, 0),
    p = fit([...raw, apex], 420, 260),
    v = raw.map(p),
    top = p(apex),
    section = corners.map(([x, y]) =>
      p(project(x * m.k, y * m.k, m.h * (1 - m.k))),
    );
  const netScale = Math.min(
      430 / (m.a + 2 * m.apothem),
      320 / (m.a + 2 * m.apothem),
    ),
    a = m.a * netScale,
    l = m.apothem * netScale,
    c = { x: 320, y: 240 };
  const square = [
      { x: c.x - a / 2, y: c.y - a / 2 },
      { x: c.x + a / 2, y: c.y - a / 2 },
      { x: c.x + a / 2, y: c.y + a / 2 },
      { x: c.x - a / 2, y: c.y + a / 2 },
    ],
    tips = [
      { x: c.x, y: c.y - a / 2 - l },
      { x: c.x + a / 2 + l, y: c.y },
      { x: c.x, y: c.y + a / 2 + l },
      { x: c.x - a / 2 - l, y: c.y },
    ];
  return (
    <Lab
      title="Piramit yüksekliği hangi doğru parçasıdır?"
      help="Dik kare piramitte yüksekliği, yan yüz yüksekliğini ve yan ayrıtı ayır. Tabanına paralel kesitin tepeye yakınlığını değiştir."
    >
      <div className="g032-controls">
        <Range
          label="Kare taban kenarı"
          value={m.a}
          min={4}
          max={12}
          change={(a) => set({ a })}
        />
        <Range
          label="Piramidin dik yüksekliği"
          value={m.h}
          min={3}
          max={12}
          change={(h) => set({ h })}
        />
        <Range
          label="Tepeden benzerlik oranı"
          value={m.k}
          min={0.2}
          max={0.8}
          step={0.1}
          unit="oran"
          change={(k) => set({ k })}
        />
      </div>
      <Modes
        name="Piramit görünümü"
        value={net ? "net" : "solid"}
        items={[
          ["solid", "Katı ve paralel kesit"],
          ["net", "Yüzey açınımı"],
        ]}
        change={(view) => set({ view })}
      />
      <Figure
        label={
          net
            ? "Kare taban ve dört eş ikizkenar üçgen yan yüzün açınımı. Üçgenin yüksekliği yan yüz yüksekliğidir."
            : `Dik kare piramit. Paralel kesitin kenarı taban kenarının ${fmt(m.k)} katıdır.`
        }
        height={480}
      >
        <g key={net ? "net" : "solid"} className="g032-reveal">
          {net ? (
            <>
              <polygon points={pts(square)} className="g032-fill" />
              {square.map((a, i) => (
                <polygon
                  key={i}
                  points={pts([a, square[(i + 1) % 4], tips[i]])}
                  className="g032-fill g032-alternate"
                />
              ))}
              <Line
                a={tips[0]}
                b={{ x: c.x, y: c.y - a / 2 }}
                kind="g032-secondary"
              />
            </>
          ) : (
            <>
              <polygon points={pts(v)} className="g032-fill" />
              {v.map((a, i) => (
                <Line key={i} a={a} b={top} />
              ))}
              <Line a={top} b={p(center)} kind="g032-accent" />
              <Line a={top} b={p(faceFoot)} kind="g032-secondary" />
              <polygon points={pts(section)} className="g032-section" />
              <circle
                cx={p(center).x}
                cy={p(center).y}
                r={5}
                className="g032-point"
              />
            </>
          )}
        </g>
        {net ? (
          <g className="g032-net-callout">
            <Line
              a={{ x: c.x, y: (tips[0].y + square[0].y) / 2 }}
              b={{ x: 450, y: 92 }}
              kind="g032-label-leader"
            />
            <circle
              cx={c.x}
              cy={(tips[0].y + square[0].y) / 2}
              r={4}
              className="g032-point"
            />
            <text x={470} y={100}>
              ℓ
            </text>
          </g>
        ) : (
          <>
            <g className="g032-solid-callout">
              <Line
                a={{
                  x: (top.x + p(center).x) / 2,
                  y: (top.y + p(center).y) / 2,
                }}
                b={{ x: 140, y: 80 }}
                kind="g032-label-leader"
              />
              <circle
                cx={(top.x + p(center).x) / 2}
                cy={(top.y + p(center).y) / 2}
                r={4}
                className="g032-point"
              />
              <text x={90} y={90} textAnchor="end">
                h
              </text>
            </g>
            <g className="g032-solid-callout">
              <Line
                a={{
                  x: (top.x + p(faceFoot).x) / 2,
                  y: (top.y + p(faceFoot).y) / 2,
                }}
                b={{ x: 480, y: 80 }}
                kind="g032-label-leader"
              />
              <circle
                cx={(top.x + p(faceFoot).x) / 2}
                cy={(top.y + p(faceFoot).y) / 2}
                r={4}
                className="g032-face-point"
              />
              <text x={510} y={90}>
                ℓ
              </text>
            </g>
            <text
              x={(v[0].x + v[1].x) / 2}
              y={(v[0].y + v[1].y) / 2 + 48}
              textAnchor="middle"
            >
              a
            </text>
          </>
        )}
      </Figure>
      <Evidence
        items={[
          ["Dik yükseklik h", `${fmt(m.h)} birim`],
          ["Yan yüz yüksekliği ℓ", `√(h²+(a/2)²) = ${fmt(m.apothem)} birim`],
          ["Yan ayrıt", `√(h²+a²/2) = ${fmt(m.edge)} birim`],
          ["Yüzey alanı", `a² + 2aℓ = ${fmt(m.surface)} birim²`],
          ["Hacim", `a²h / 3 = ${fmt(m.volume)} birim³`],
          ["Paralel kesitin alanı", `k² × a² = ${fmt(m.sectionArea)} birim²`],
          [
            "Üst küçük piramidin hacmi",
            `k³ × V = ${fmt(m.smallVolume)} birim³`,
          ],
        ]}
      />
      <p className="g032-insight">
        <Readable>
          Burada k = tepeden kesite dik uzaklık / piramidin yüksekliği ={" "}
          {fmt(m.k)}. Kesit kenarı {fmt(m.sectionSide)}, tepedeki küçük
          piramidin yüksekliği {fmt(m.smallHeight)} birimdir. k tabandan
          ölçülmez. Katı görünümde turuncu h tabana, yeşil ℓ yan yüzün taban
          kenarına diktir; yan ayrıt üçüncü bir uzunluktur. Formüller bu dik
          kare piramit içindir; her piramidin tepe izdüşümü taban merkezinde
          olmak zorunda değildir.
        </Readable>
      </p>
    </Lab>
  );
}
export default function GeometryExpansion032Lab({ id }: { id: string }) {
  switch (id) {
    case "tyt-geo-cokgenler-032":
      return <Polygon />;
    case "tyt-geo-dortgen-hiyerarsi-032":
      return <Hierarchy />;
    case "tyt-geo-yamuk-deltoid-032":
      return <TrapezoidKite />;
    case "tyt-geo-paralelkenar-ozel-dortgenler-032":
      return <Parallelogram />;
    case "tyt-geo-dik-prizmalar-032":
      return <Prism />;
    case "tyt-geo-piramitler-032":
      return <Pyramid />;
    default:
      return null;
  }
}
