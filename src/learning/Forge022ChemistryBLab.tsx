import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ModelNumber } from "./ModelNumber";
import { useExploration } from "./useExploration";
import {
  carbonNetwork022B,
  formula022B,
  combustionFormula022B,
  hybrid022B,
  geometry022B,
  alkane022B,
  rotate022B,
  type Point022B,
  type CarbonKind022B,
  type Molecule022B,
  type GeometryKind022B,
} from "./forge022ChemistryB";
import "./forge022ChemistryB.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
type Point2B022 = { x: number; y: number };
const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(n) < 0.5 * 10 ** -digits ? 0 : n,
  );
const integer = (n: number, lo: number, hi: number, fallback: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(n) ? n : fallback)));
const exploration = (id: string) => `forge022-chemistry-b-${id}`;
type Guess = { guess: string; reason: string; checked: boolean };
function Compare({
  question,
  choices,
  expected,
  values,
  onChange,
  children,
}: {
  question: string;
  choices: string[];
  expected: string;
  values: Guess;
  onChange: (changes: Partial<Guess>) => void;
  children: ReactNode;
}) {
  const uid = useId();
  return (
    <fieldset className="chemistry-b022-compare">
      <legend>{question}</legend>
      <div className="chemistry-b022-guesses">
        {choices.map((choice) => (
          <label key={choice}>
            <input
              type="radio"
              name={uid}
              value={choice}
              checked={values.guess === choice}
              onChange={() => onChange({ guess: choice, checked: false })}
            />
            {choice}
          </label>
        ))}
      </div>
      <label htmlFor={`${uid}-reason`}>Modelden gerekçen</label>
      <textarea
        id={`${uid}-reason`}
        rows={3}
        maxLength={120}
        value={values.reason.slice(0, 120)}
        onChange={(e) =>
          onChange({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        className="secondary"
        type="button"
        disabled={!choices.includes(values.guess) || !values.reason.trim()}
        onClick={() => onChange({ checked: true })}
      >
        Tahminimi kanıtla karşılaştır
      </button>
      {values.checked && choices.includes(values.guess) && (
        <div className="chemistry-b022-feedback" role="status">
          <strong>
            {values.guess === expected
              ? "Tahminin verilen koşullarla uyumlu."
              : "Tahminini modelin koşullarıyla yeniden karşılaştır."}
          </strong>
          {children}
          <p>Gerekçen: {values.reason.slice(0, 120)}</p>
          <p className="small muted">
            Gerekçe puan almaz; modeli ve açıklamayı karşılaştır.
          </p>
        </div>
      )}
    </fieldset>
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
    <section data-forge022={id} className="chemistry-b022-lab">
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="small muted">
        Görsel keşif ayrı kaydedilir; doğru cevap, XP ya da bitmiş konu kaydı
        üretmez.
      </p>
    </section>
  );
}
function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  const uid = useId();
  return (
    <div className="chemistry-b022-select">
      <label htmlFor={uid}>{label}</label>
      <ChoiceSelect id={uid} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([value, name]) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </ChoiceSelect>
      <p className="small muted">
        Seçili: {options.find((o) => o[0] === value)?.[1]}
      </p>
    </div>
  );
}
// View coordinates are physical CSS pixels, including on the narrowest phone.
function ScienceSvg({
  title,
  kind,
  height,
  children,
}: {
  title: string;
  kind: string;
  height: number;
  children: (width: number, marker: string) => ReactNode;
}) {
  const uid = useId(),
    ref = useRef<SVGSVGElement>(null),
    [width, setWidth] = useState(320);
  useLayoutEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const measure = () => {
      const style = getComputedStyle(svg),
        next =
          svg.getBoundingClientRect().width -
          parseFloat(style.borderLeftWidth) -
          parseFloat(style.borderRightWidth);
      if (next > 0)
        setWidth((old) => (Math.abs(old - next) < 0.25 ? old : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);
  return (
    <svg
      ref={ref}
      role="img"
      aria-labelledby={`${uid}-title`}
      data-chemistry-b022-plot={kind}
      viewBox={`0 0 ${width} ${height}`}
      style={{ height: height + 2 }}
    >
      <title id={`${uid}-title`}>{title}</title>
      <defs>
        <marker
          id={`${uid}-head`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10Z" fill="context-stroke" />
        </marker>
      </defs>
      {children(width, `${uid}-head`)}
    </svg>
  );
}
function Arrow({
  name,
  vector,
  origin,
  scale,
  marker,
  kind = "chemistry-b022-external",
}: {
  name: string;
  vector: Point2B022;
  origin: Point2B022;
  scale: number;
  marker: string;
  kind?: string;
}) {
  return vector.x === 0 && vector.y === 0 ? (
    <circle
      data-zero-vector={name}
      cx={origin.x}
      cy={origin.y}
      r={3}
      className={kind}
    />
  ) : (
    <path
      data-vector={name}
      data-x={vector.x}
      data-y={vector.y}
      data-scale={scale}
      d={`M${origin.x} ${origin.y}L${origin.x + vector.x * scale} ${origin.y - vector.y * scale}`}
      className={`chemistry-b022-force ${kind}`}
      markerEnd={`url(#${marker})`}
    />
  );
}
function Num({
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
    <ModelNumber
      label={label}
      value={value}
      min={min}
      max={max}
      onChange={change}
    />
  );
}
function Result({ children }: { children: ReactNode }) {
  return (
    <div data-model-result className="chemistry-b022-result">
      {children}
    </div>
  );
}

const carbonNames: [string, string][] = [
  ["diamond", "Elmas"],
  ["graphene", "Grafen"],
  ["graphite", "Grafit"],
  ["fullerene", "C₆₀ kafesi"],
];
const hybridNames: [string, string][] = [
  ["methane", "Metan"],
  ["ethene", "Eten"],
  ["ethyne", "Etin"],
  ["allene", "Allen"],
  ["hcn", "HCN"],
  ["formaldehyde", "H₂C=O"],
  ["methanol", "Metanol"],
];
const shapeNames: [string, string][] = [
  ["ch4", "CH₄"],
  ["nh3", "NH₃"],
  ["h2o", "H₂O"],
  ["bf3", "BF₃"],
  ["co2", "CO₂"],
  ["ch3cl", "CH₃Cl"],
];
const choose = <T extends string>(
  value: string,
  choices: [string, string][],
  fallback: T,
): T => (choices.some(([x]) => x === value) ? (value as T) : fallback);
function Rotation({
  yaw,
  pitch,
  change,
}: {
  yaw: number;
  pitch: number;
  change: (p: { yaw?: number; pitch?: number }) => void;
}) {
  return (
    <div className="chemistry-b022-controls">
      <Num
        label="Yatay dönüş (°)"
        value={yaw}
        min={-180}
        max={180}
        change={(n) => change({ yaw: n })}
      />
      <Num
        label="Düşey dönüş (°)"
        value={pitch}
        min={-70}
        max={70}
        change={(n) => change({ pitch: n })}
      />
    </div>
  );
}
function fit(points: Point022B[], width: number, height: number, padding = 35) {
  const xs = points.map((p) => p.x),
    ys = points.map((p) => p.y),
    minX = Math.min(...xs),
    maxX = Math.max(...xs),
    minY = Math.min(...ys),
    maxY = Math.max(...ys),
    cx = (minX + maxX) / 2,
    cy = (minY + maxY) / 2;
  const scale = Math.min(
    (width - 2 * padding) / Math.max(maxX - minX, 0.8),
    (height - 2 * padding) / Math.max(maxY - minY, 0.8),
  );
  return {
    scale,
    points: points.map((p) => ({
      x: width / 2 + (p.x - cx) * scale,
      y: height / 2 - (p.y - cy) * scale,
      z: p.z,
    })),
  };
}
function MoleculeScene({
  points,
  labels,
  bonds,
  selected,
  lone = [],
  title,
  kind,
  compact = false,
  neighbors = [],
}: {
  points: Point022B[];
  labels: string[];
  bonds: { a: number; b: number; order: number }[];
  selected: number;
  lone?: Point022B[];
  title: string;
  kind: string;
  compact?: boolean;
  neighbors?: number[];
}) {
  return (
    <ScienceSvg title={title} kind={kind} height={330}>
      {(w) => {
        const layout = fit([...points, ...lone], w, 330, compact ? 25 : 35),
          r = compact ? 4.5 : 15;
        const atom = layout.points.slice(0, points.length),
          pairs = layout.points.slice(points.length);
        return (
          <>
            {bonds.map((b, i) => {
              const a = atom[b.a],
                c = atom[b.b],
                dx = c.x - a.x,
                dy = c.y - a.y,
                length = Math.hypot(dx, dy),
                nx = length ? -dy / length : 0,
                ny = length ? dx / length : 0;
              return (
                <g
                  key={i}
                  data-bond={i}
                  data-a={b.a}
                  data-b={b.b}
                  data-order={b.order}
                >
                  {Array.from({ length: b.order }, (_, j) => {
                    const shift = (j - (b.order - 1) / 2) * 5;
                    return (
                      <line
                        key={j}
                        x1={a.x + nx * shift}
                        y1={a.y + ny * shift}
                        x2={c.x + nx * shift}
                        y2={c.y + ny * shift}
                        className={
                          b.a === selected || b.b === selected
                            ? "chemistry-b022-bond-active"
                            : "chemistry-b022-bond"
                        }
                      />
                    );
                  })}
                </g>
              );
            })}
            {pairs.map((p, i) => (
              <g key={i} data-lone-pair={i}>
                <ellipse
                  cx={p.x}
                  cy={p.y}
                  rx={15}
                  ry={10}
                  className="chemistry-b022-pair"
                />
                <circle
                  cx={p.x - 4}
                  cy={p.y}
                  r={2.5}
                  className="chemistry-b022-ink"
                />
                <circle
                  cx={p.x + 4}
                  cy={p.y}
                  r={2.5}
                  className="chemistry-b022-ink"
                />
              </g>
            ))}
            {atom
              .map((p, i) => ({ p, i }))
              .sort((a, b) => a.p.z - b.p.z)
              .map(({ p, i }) => (
                <g
                  key={i}
                  data-atom={i}
                  data-view-x={points[i].x}
                  data-view-y={points[i].y}
                  data-view-z={points[i].z}
                  data-projected-x={p.x}
                  data-projected-y={p.y}
                  data-degree-selected={i === selected ? "yes" : "no"}
                  opacity={
                    compact &&
                    p.z < 0 &&
                    i !== selected &&
                    !neighbors.includes(i)
                      ? 0.55
                      : 1
                  }
                >
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={
                      compact && (i === selected || neighbors.includes(i))
                        ? 7
                        : r
                    }
                    className={
                      i === selected
                        ? "chemistry-b022-atom-selected"
                        : neighbors.includes(i)
                          ? "chemistry-b022-atom-neighbor"
                          : "chemistry-b022-atom"
                    }
                  />
                  {!compact && (
                    <text x={p.x} y={p.y + 5.5} textAnchor="middle">
                      {labels[i]}
                    </text>
                  )}
                </g>
              ))}
          </>
        );
      }}
    </ScienceSvg>
  );
}
function CarbonLab() {
  const id = "karbon-kimyasina-giris",
    [v, set] = useExploration(exploration(id), {
      kind: "diamond",
      atom: 0,
      yaw: 30,
      pitch: 20,
      guess: "",
      reason: "",
      checked: false,
    });
  const change = (n: Partial<typeof v>) => set({ ...n, checked: false }),
    kind = choose<CarbonKind022B>(v.kind, carbonNames, "diamond"),
    yaw = integer(v.yaw, -180, 180, 30),
    pitch = integer(v.pitch, -70, 70, 20),
    base = carbonNetwork022B(kind, yaw, pitch, 0),
    atom = integer(v.atom, 0, base.interior.length - 1, 0),
    selected = base.interior[atom],
    m = carbonNetwork022B(kind, yaw, pitch, selected);
  return (
    <Frame
      id={id}
      title="Karbon ağını döndür ve bağlarını say"
      intro="Elmasın merkez kesitini, grafenin tek tabakasını, grafitin iki tabakasını ve C₆₀’ın kapalı kafesini karşılaştır. Seçim yalnız iç atomlar üzerindedir; kesit sınırında görünmez kalan devamı eksik bağ diye yorumlama."
    >
      <Select
        label="Karbon yapısı"
        value={kind}
        options={carbonNames}
        onChange={(kind) => change({ kind, atom: 0 })}
      />
      <Select
        label="İç atom"
        value={String(atom)}
        options={m.interior.map((n, i) => [String(i), `C${n + 1}`])}
        onChange={(n) => change({ atom: Number(n) })}
      />
      <Rotation yaw={yaw} pitch={pitch} change={change} />
      <figure className="chemistry-b022-figure">
        <figcaption>Vurgulu atom ve kovalent komşuları</figcaption>
        <MoleculeScene
          points={m.projected}
          labels={m.points.map(() => "C")}
          bonds={m.edges.map(([a, b]) => ({ a, b, order: 1 }))}
          selected={selected}
          neighbors={m.neighbors}
          compact
          title={`${carbonNames.find((n) => n[0] === kind)![1]}; seçili C${selected + 1}, ${m.neighbors.length} kovalent C komşusu.`}
          kind="carbon"
        />
        <p className="small muted">
          Her nokta C atomudur. Vurgulu çizgiler seçili atomun gerçek kovalent
          bağlantılarıdır. Grafitte iki tabaka arasında kovalent çizgi yoktur;
          daha zayıf tabaka etkileşimi ayrı bir bağ sayılmaz. İzdüşümde çakışan
          noktaları dönüşle ayır.
        </p>
      </figure>
      <Result>
        <p>
          Seçili atom: <strong>C{selected + 1}</strong>; kovalent C komşusu:{" "}
          <strong>{m.neighbors.length}</strong>.
        </p>
        <p>Komşular: {m.neighbors.map((n) => `C${n + 1}`).join(", ")}.</p>
        <p>
          Çizilen atom: {m.points.length}; çizilen kovalent bağlantı:{" "}
          {m.edges.length}.
        </p>
        {m.faces ? (
          <p>
            Kapalı C₆₀ topolojisi: {m.faces.pentagons} beşgen,{" "}
            {m.faces.hexagons} altıgen; 60×3/2 = 90 bağlantı.
          </p>
        ) : (
          <p>
            Bu bir sonlu kesittir; kenar atomlarının bağları büyük ağda devam
            eder.
          </p>
        )}
        <p>
          Ölçek şematiktir; gerçek bağ uzunluğu, enerji veya iletkenlik hesabı
          değildir.
        </p>
      </Result>
      <Compare
        question="Seçili iç C’nin kaç kovalent C komşusu var?"
        choices={["2", "3", "4"]}
        expected={String(m.neighbors.length)}
        values={v}
        onChange={set}
      >
        <p>
          Seçili C’den çıkan vurgulu çizgileri say: {m.neighbors.length}. Görüş
          açısı bu bağlantıyı değiştirmez.
        </p>
      </Compare>
    </Frame>
  );
}
function FormulaLab() {
  const id = "basit-ve-molekul-formul",
    [v, set] = useExploration(exploration(id), {
      mode: "mass",
      C: 24,
      H: 4,
      O: 32,
      sample: 60,
      co2: 88,
      water: 36,
      M: 60,
      guess: "",
      reason: "",
      checked: false,
    });
  const change = (n: Partial<typeof v>) => set({ ...n, checked: false }),
    mode = v.mode === "burn" ? "burn" : "mass",
    C = integer(v.C, 0, 1000, 24) / 10,
    H = integer(v.H, 0, 1000, 4) / 10,
    O = integer(v.O, 0, 1000, 32) / 10,
    sample = integer(v.sample, 1, 1000, 60) / 10,
    co2 = integer(v.co2, 0, 2000, 88) / 10,
    water = integer(v.water, 0, 2000, 36) / 10,
    M = integer(v.M, 0, 1000, 60),
    burn =
      mode === "burn" ? combustionFormula022B(sample, co2, water, M) : null,
    m =
      mode === "mass"
        ? C + H + O > 0
          ? formula022B({ C, H, O }, M)
          : null
        : (burn?.formula ?? null);
  const expected =
    !m || !m.multiplier
      ? "Henüz yok"
      : m.ordinaryValenceCompatible
        ? "Uyumlu"
        : "Uymuyor";
  return (
    <Frame
      id={id}
      title="Kütleden mol oranına, orandan formüle"
      intro="Yalnız C, H ve O içeren saf bir örneği incele. Atom mol kütleleri C=12, H=1, O=16 g/mol. Kütleleri önce mole böl; basit formül ile molekül çarpanını ayrı denetle."
    >
      <Select
        label="Veri türü"
        value={mode}
        options={[
          ["mass", "Element kütleleri"],
          ["burn", "Tam yanma"],
        ]}
        onChange={(mode) => change({ mode })}
      />
      <div className="chemistry-b022-controls">
        {mode === "mass" ? (
          <>
            <Num
              label="C (0,1 g)"
              value={C * 10}
              min={0}
              max={1000}
              change={(C) => change({ C })}
            />
            <Num
              label="H (0,1 g)"
              value={H * 10}
              min={0}
              max={1000}
              change={(H) => change({ H })}
            />
            <Num
              label="O (0,1 g)"
              value={O * 10}
              min={0}
              max={1000}
              change={(O) => change({ O })}
            />
          </>
        ) : (
          <>
            <Num
              label="Örnek (0,1 g)"
              value={sample * 10}
              min={1}
              max={1000}
              change={(sample) => change({ sample })}
            />
            <Num
              label="CO₂ (0,1 g)"
              value={co2 * 10}
              min={0}
              max={2000}
              change={(co2) => change({ co2 })}
            />
            <Num
              label="H₂O (0,1 g)"
              value={water * 10}
              min={0}
              max={2000}
              change={(water) => change({ water })}
            />
          </>
        )}
        <Num
          label="M (g/mol); 0 = yok"
          value={M}
          min={0}
          max={1000}
          change={(M) => change({ M })}
        />
      </div>
      {mode === "burn" && (
        <p>
          Tam yanma ve eksiksiz ürün toplama varsayılır. C, CO₂’den; H, H₂O’dan
          bulunur. Örneğin O’su örnek kütlesi − C − H ile hesaplanır;
          ürünlerdeki bütün O örneğe ait değildir.
        </p>
      )}
      {m && (
        <figure className="chemistry-b022-figure">
          <figcaption>
            Atom mol miktarları; en büyük çubuk 1 birim yükseklik
          </figcaption>
          <ScienceSvg
            title={`C, H ve O atom mol miktarları ${m.moles.map((n) => fmt(n, 4)).join("; ")} mol.`}
            kind="formula"
            height={280}
          >
            {(w) => {
              const max = Math.max(...m.moles),
                slot = w / 3;
              return (
                <>
                  <path
                    d={`M16 230H${w - 16}`}
                    className="chemistry-b022-axis"
                  />
                  {m.moles.map((n, i) => {
                    const h = (n / max) * 165;
                    return (
                      <g key={i}>
                        <rect
                          data-mole-bar={i}
                          data-moles={n}
                          data-scale={165 / max}
                          x={slot * (i + 0.5) - Math.min(slot * 0.25, 30)}
                          y={230 - h}
                          width={Math.min(slot * 0.5, 60)}
                          height={h}
                          className="chemistry-b022-bar"
                        />
                        <text x={slot * (i + 0.5)} y={258} textAnchor="middle">
                          {["C", "H", "O"][i]}
                        </text>
                      </g>
                    );
                  })}
                </>
              );
            }}
          </ScienceSvg>
        </figure>
      )}
      <Result>
        {burn && !burn.consistent ? (
          <p role="status">
            Veri uyumsuz: ürünlerden bulunan C + H kütlesi örnek kütlesini
            aşıyor. Bu saf C/H/O tam yanma modeliyle formül çıkarılamaz.
          </p>
        ) : !m ? (
          <p role="status">En az bir element için pozitif kütle gir.</p>
        ) : (
          <>
            <p>
              Örnek = {fmt(m.sample)} g. C = {fmt(m.masses.C)} g; H ={" "}
              {fmt(m.masses.H)} g; O = {fmt(m.masses.O)} g.
            </p>
            <p>
              Mol miktarları: C = {fmt(m.moles[0], 4)} mol; H ={" "}
              {fmt(m.moles[1], 4)} mol; O = {fmt(m.moles[2], 4)} mol.
            </p>
            <p>
              En küçük pozitif mole oran:{" "}
              {m.ratios.map((n) => fmt(n, 4)).join(" : ")}.
            </p>
            <p>
              Basit formül:{" "}
              <strong>
                {m.empiricalLabel ?? "Bu aralıkta küçük tam oran bulunamadı"}
              </strong>
              ; basit formül kütlesi: {m.empiricalMass ?? "—"}.
            </p>
            {M === 0 ? (
              <p>M verilmedi; molekül formülü tek başına belirlenmez.</p>
            ) : m.multiplier ? (
              <>
                <p>
                  Çarpan = {m.multiplier}; aday molekül formülü:{" "}
                  <strong>{m.molecularLabel}</strong>.
                </p>
                <p>
                  Olağan nötr, bağlı, kapalı kabuklu C/H/O yapısı için H
                  bütçesi:{" "}
                  <strong>
                    {m.ordinaryValenceCompatible ? "Uyumlu" : "Uymuyor"}
                  </strong>
                  . Doymama derecesi = {m.unsaturation}.
                </p>
                <p>
                  Bu gerekli koşul, tek bir yapı veya gerçek bileşik varlığı
                  kanıtı değildir.
                </p>
              </>
            ) : (
              <p>
                M / basit formül kütlesi pozitif tam sayı değil; verilen M ile
                molekül formülü uyumsuz.
              </p>
            )}
          </>
        )}
      </Result>
      <Compare
        question="Tam sayı çarpanlı adayın olağan H bütçesi ne durumda?"
        choices={["Uyumlu", "Uymuyor", "Henüz yok"]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          {expected === "Henüz yok"
            ? "Önce tutarlı veri, küçük tam oran ve verilmiş M ile pozitif tam çarpan gerekir."
            : `Aday için (2 C + 2 − H)/2 = ${m?.unsaturation}. ${expected === "Uyumlu" ? "Sıfır veya pozitif tam sayı gerekli koşulu sağlanır; tek yapıyı seçmez." : "Olağan bağlı, nötr, kapalı kabuklu C/H/O değerlik koşulu sağlanmaz."}`}
        </p>
      </Compare>
    </Frame>
  );
}
function HybridLab() {
  const id = "hibritlesme",
    [v, set] = useExploration(exploration(id), {
      kind: "ethene",
      focus: 0,
      yaw: 25,
      pitch: 20,
      guess: "",
      reason: "",
      checked: false,
    });
  const change = (n: Partial<typeof v>) => set({ ...n, checked: false }),
    kind = choose<Molecule022B>(v.kind, hybridNames, "ethene"),
    yaw = integer(v.yaw, -180, 180, 25),
    pitch = integer(v.pitch, -70, 70, 20),
    base = hybrid022B(kind, 0, yaw, pitch),
    index = integer(v.focus, 0, base.heavy.length - 1, 0),
    focus = base.heavy[index],
    m = hybrid022B(kind, focus, yaw, pitch);
  return (
    <Frame
      id={id}
      title="Her atomun çevresini ayrı oku"
      intro="Molekülü ve ağır atomu seç. Açık yapıdaki her komşuluk bir σ, çift bağ bir ek π, üçlü bağ iki ek π içerir. Merkezdeki bağ yapmayan çiftler de elektron bölgesine katılır."
    >
      <Select
        label="Açık yapı"
        value={kind}
        options={hybridNames}
        onChange={(kind) => change({ kind, focus: 0 })}
      />
      <Select
        label="İncelenen atom"
        value={String(index)}
        options={m.heavy.map((n, i) => [
          String(i),
          `${m.atoms[n].element}${n + 1}`,
        ])}
        onChange={(n) => change({ focus: Number(n) })}
      />
      <Rotation yaw={yaw} pitch={pitch} change={change} />
      <figure className="chemistry-b022-figure">
        <figcaption>Bağ mertebeleri ve seçili merkez</figcaption>
        <MoleculeScene
          points={m.projected}
          labels={m.atoms.map((a) => a.element)}
          bonds={m.bonds}
          selected={focus}
          title={`${hybridNames.find((n) => n[0] === kind)![1]}; seçili ${m.atoms[focus].element}${focus + 1}. ${m.sigma} sigma, ${m.lonePairs} bağ yapmayan çift, ${m.hybrid}.`}
          kind="hybrid"
        />
        <p className="small muted">
          Bir, iki ve üç çizgi bağ mertebesini gösterir. Koordinatlar yapısal
          şemadır; ölçülmüş bütün bağ uzunlukları değildir. Allenin iki uç CH₂
          düzlemi birbirine diktir. Merkez çift sayısı aşağıda ayrıca verilir.
        </p>
      </figure>
      <Result>
        <p>
          Seçili {m.atoms[focus].element}
          {focus + 1}: {m.sigma} σ komşuluğu + {m.lonePairs} bağ yapmayan çift ={" "}
          <strong>{m.domains} bölge</strong>.
        </p>
        <p>
          Yerel model: <strong>{m.hybrid}</strong>; oluşan hibrit:{" "}
          {m.hybridCount}; kalan saf p: {m.pureP}.
        </p>
        <p>
          Seçili atomun yerel π sayısı: {m.pi}; s katkısı: %
          {fmt(m.sFraction * 100, 2)}.
        </p>
        <p>
          Bütün molekül:{" "}
          <strong>
            {m.sigmaTotal} σ ve {m.piTotal} π
          </strong>
          .
        </p>
        <p>
          Farklı atomlar arası örtüşme ile aynı atomdaki hibritleşme aynı işlem
          değildir. H atomu bu modelde 1s ile bağlanır.
        </p>
      </Result>
      <Compare
        question="Seçili atom için yerel hibrit modeli hangisi?"
        choices={["sp", "sp²", "sp³"]}
        expected={m.hybrid ?? "sp³"}
        values={v}
        onChange={set}
      >
        <p>
          σ komşuluğu {m.sigma} ile çift sayısı {m.lonePairs} toplanır:{" "}
          {m.domains} bölge, {m.hybrid}. π sayısı yeni bir komşu yönü değildir.
        </p>
      </Compare>
    </Frame>
  );
}
function GeometryLab() {
  const id = "molekul-geometrisi",
    [v, set] = useExploration(exploration(id), {
      kind: "nh3",
      yaw: 30,
      pitch: 20,
      showPairs: true,
      guess: "",
      reason: "",
      checked: false,
    });
  const change = (n: Partial<typeof v>) => set({ ...n, checked: false }),
    kind = choose<GeometryKind022B>(v.kind, shapeNames, "nh3"),
    yaw = integer(v.yaw, -180, 180, 30),
    pitch = integer(v.pitch, -70, 70, 20),
    m = geometry022B(kind, yaw, pitch),
    points = [{ x: 0, y: 0, z: 0 }, ...m.projected],
    lone = v.showPairs
      ? m.projectedLone.map((p) => ({
          x: p.x * 1.45,
          y: p.y * 1.45,
          z: p.z * 1.45,
        }))
      : [];
  const net = m.polar ? m.projectedResultant : { x: 0, y: 0, z: 0 },
    norm = Math.hypot(m.resultant.x, m.resultant.y, m.resultant.z);
  return (
    <Frame
      id={id}
      title="Şekli ve yük yönünü birlikte gör"
      intro="Atomlar molekül şeklini, noktalı oval işaretler merkezdeki bağ yapmayan çiftleri temsil eder. Üç boyutlu açıları ve eşdeğer bağların iptalini incele. Elektron çekme okları göreli çizim uzlaşısıdır; gerçek Debye hesabı değildir. Görüş yönünde kalan net vektör, izdüşümde nokta gibi görünebilir; üç boyutlu toplam ayrıca verilir."
    >
      <Select
        label="Molekül"
        value={kind}
        options={shapeNames}
        onChange={(kind) => change({ kind })}
      />
      <Rotation yaw={yaw} pitch={pitch} change={change} />
      <label className="chemistry-b022-toggle">
        <input
          type="checkbox"
          checked={Boolean(v.showPairs)}
          onChange={(e) => change({ showPairs: e.target.checked })}
        />
        Merkez çiftlerini göster
      </label>
      <figure className="chemistry-b022-figure">
        <figcaption>Atom konumları; çift işareti atom değildir</figcaption>
        <MoleculeScene
          points={points}
          labels={[m.central, ...m.labels]}
          bonds={m.vectors.map((_, i) => ({
            a: 0,
            b: i + 1,
            order: kind === "co2" ? 2 : 1,
          }))}
          selected={0}
          lone={lone}
          title={`${shapeNames.find((n) => n[0] === kind)![1]}: ${m.notation}; ${m.shape}; ${m.lonePairs} merkez çifti.`}
          kind="geometry"
        />
      </figure>
      <figure className="chemistry-b022-figure">
        <figcaption>
          Net göreli elektron çekme yönü; aynı görüş açısı
        </figcaption>
        <ScienceSvg
          title={
            m.polar
              ? "Net katkı sıfır değil; göreli elektron çekme yönünün izdüşümü."
              : "Eşdeğer katkıların net toplamı sıfır."
          }
          kind="net"
          height={200}
        >
          {(w, marker) => {
            const scale = Math.min(w - 90, 75) / Math.max(1, norm),
              origin = { x: w / 2, y: 100 };
            return (
              <>
                <path d={`M20 100H${w - 20}`} className="chemistry-b022-axis" />
                <Arrow
                  name="dipole-result"
                  vector={{ x: net.x, y: net.y }}
                  origin={origin}
                  scale={scale}
                  marker={marker}
                />
                <text x={w / 2} y={173} textAnchor="middle">
                  {m.polar ? "Net var" : "Net = 0"}
                </text>
              </>
            );
          }}
        </ScienceSvg>
      </figure>
      <Result>
        <p>
          Gösterim: <strong>{m.notation}</strong>; {m.vectors.length} bağlı atom
          + {m.lonePairs} merkez çifti = {m.domains} bölge.
        </p>
        <p>
          Molekül şekli: <strong>{m.shape}</strong>; gerçek bağ açıları:{" "}
          {Array.from(new Set(m.angles.map((a) => fmt(a, 2)))).join("; ")}°.
        </p>
        <p>
          Kalıcı dipol sınıfı: <strong>{m.polar ? "Polar" : "Apolar"}</strong>.
        </p>
        <p>
          Göreli bağ katkıları (x; y; z):{" "}
          {m.bondVectors
            .map((b) => `(${fmt(b.x, 3)}; ${fmt(b.y, 3)}; ${fmt(b.z, 3)})`)
            .join(", ")}
          .
        </p>
        <p>
          Net (x; y; z) = ({fmt(m.resultant.x, 3)}; {fmt(m.resultant.y, 3)};{" "}
          {fmt(m.resultant.z, 3)}); büyüklük = {fmt(norm, 3)} göreli birim.
        </p>
        <p>
          Bağ katkısı okları kısmi pozitiften elektronca zengin yöne tanımlıdır;
          fiziksel dipol momentin yön uzlaşısı farklıdır. Molekülü döndürmek
          gerçek açı ve polarlığı değiştirmez.
        </p>
      </Result>
      <Compare
        question="Bu molekülün net kalıcı dipolü sıfırlanır mı?"
        choices={["Evet", "Hayır"]}
        expected={m.polar ? "Hayır" : "Evet"}
        values={v}
        onChange={set}
      >
        <p>
          {m.polar
            ? "Yük yönleri bu atom ve şekil düzeninde iptal olmaz; molekül polardır."
            : "Eşdeğer bağ katkıları simetrik yönlerde iptal olur; molekül apolardır. Bu, tek tek bütün bağların apolar olması demek değildir."}
        </p>
      </Compare>
    </Frame>
  );
}
const alkaneNames: [string, string][] = [
  ["straight", "Düz zincir"],
  ["iso", "İzopentan"],
  ["neo", "Neopentan"],
];
function AlkaneLab() {
  const id = "alkanlar",
    [v, set] = useExploration(exploration(id), {
      kind: "straight",
      count: 5,
      atom: 0,
      yaw: 15,
      pitch: 15,
      guess: "",
      reason: "",
      checked: false,
    });
  const change = (n: Partial<typeof v>) => set({ ...n, checked: false }),
    kind = choose<"straight" | "iso" | "neo">(v.kind, alkaneNames, "straight"),
    count = kind === "straight" ? integer(v.count, 1, 10, 5) : 5,
    edges: [number, number][] =
      kind === "neo"
        ? [
            [0, 1],
            [0, 2],
            [0, 3],
            [0, 4],
          ]
        : kind === "iso"
          ? [
              [0, 1],
              [1, 2],
              [2, 3],
              [1, 4],
            ]
          : Array.from({ length: count - 1 }, (_, i) => [i, i + 1]),
    atom = integer(v.atom, 0, count - 1, 0),
    yaw = integer(v.yaw, -180, 180, 15),
    pitch = integer(v.pitch, -70, 70, 15),
    m = alkane022B(count, edges, atom);
  const world: Point022B[] =
    kind === "neo"
      ? [
          { x: 0, y: 0, z: 0 },
          ...[
            { x: 1, y: 1, z: 1 },
            { x: 1, y: -1, z: -1 },
            { x: -1, y: 1, z: -1 },
            { x: -1, y: -1, z: 1 },
          ].map((p) => ({
            x: p.x / Math.sqrt(3),
            y: p.y / Math.sqrt(3),
            z: p.z / Math.sqrt(3),
          })),
        ]
      : kind === "iso"
        ? [
            { x: -1.5, y: 0, z: 0 },
            { x: -0.5, y: 0.7, z: 0 },
            { x: 0.5, y: 0, z: 0 },
            { x: 1.5, y: 0.7, z: 0 },
            { x: -0.5, y: 1.2, z: 0.9 },
          ]
        : Array.from({ length: count }, (_, i) => ({
            x: i - (count - 1) / 2,
            y: (i % 2) * 0.5,
            z: 0,
          }));
  return (
    <Frame
      id={id}
      title="Aynı formülde farklı karbon yolları"
      intro="Düz zinciri uzat veya C₅H₁₂’nin üç iskeletini karşılaştır. Her C’nin H sayısı dört değerlikten hesaplanır. Konum eşliği atom bağlantısına dayanır; çizimi döndürmek yeni izomer yapmaz."
    >
      <Select
        label="Karbon iskeleti"
        value={kind}
        options={alkaneNames}
        onChange={(kind) => change({ kind, atom: 0 })}
      />
      {kind === "straight" && (
        <div className="chemistry-b022-controls">
          <Num
            label="C sayısı"
            value={count}
            min={1}
            max={10}
            change={(count) => change({ count, atom: 0 })}
          />
        </div>
      )}
      <Select
        label="Seçili C"
        value={String(atom)}
        options={world.map((_, i) => [String(i), `C${i + 1}`])}
        onChange={(n) => change({ atom: Number(n) })}
      />
      <Rotation yaw={yaw} pitch={pitch} change={change} />
      <figure className="chemistry-b022-figure">
        <figcaption>
          Yalnız karbon iskeleti; H’ler metinde tamamlanır
        </figcaption>
        <MoleculeScene
          points={world.map((p) => rotate022B(p, yaw, pitch))}
          compact={count > 7}
          labels={world.map(() => "C")}
          bonds={edges.map(([a, b]) => ({ a, b, order: 1 }))}
          selected={atom}
          neighbors={m.equivalent.filter((n) => n !== atom)}
          title={`${m.formula}; seçili C${atom + 1}, ${m.degree[atom]} C komşusu ve ${m.hydrogens[atom]} H.`}
          kind="alkane"
        />
        <p className="small muted">
          Diğer vurgulu C’ler seçili atomla eş konumdadır; vurgulu çizgiler
          seçili atomun bağlarıdır. İskelet çizimi bağ uzunluğu ya da her
          merkezde ölçülmüş açı hesabı değildir.
        </p>
      </figure>
      <Result>
        <p>
          Molekül formülü: <strong>{m.formula}</strong>; M = {m.molarMass} g/mol
          (C=12, H=1).
        </p>
        <p>
          Seçili C{atom + 1}: {m.degree[atom]} C komşusu;{" "}
          <strong>{m.hydrogens[atom]} H</strong>. Eş konumlar:{" "}
          {m.equivalent.map((n) => `C${n + 1}`).join(", ")}.
        </p>
        <p>
          C başına H: {m.hydrogens.map((h, i) => `C${i + 1}: ${h}`).join("; ")}.
        </p>
        <p>
          Primer = {m.primary}; sekonder = {m.secondary}; tersiyer ={" "}
          {m.tertiary}; kuaterner = {m.quaternary}. Metan bu derece sınıflarına
          girmez.
        </p>
        <p>
          En uzun karbon yolu: {m.longest.length} C (
          {m.longest.map((n) => `C${n + 1}`).join(" → ")}).
        </p>
        <p>
          Toplam σ = {m.sigmaTotal}: {m.sigmaCC} C–C + {m.sigmaCH} C–H; π = 0.
        </p>
        <p>
          Tek H → Cl için farklı yapı ürünü:{" "}
          <strong>{m.monochloroProducts}</strong>. Uzay izomerleri ve ürün
          oranları sayılmaz.
        </p>
        <p>
          1 mol yakıtın tam yanması: {fmt(m.oxygen)} mol O₂ → {m.carbonDioxide}{" "}
          mol CO₂ + {m.water} mol H₂O. Yeterli O₂ ve tam yanma varsayılır; ısı
          için suyun hâli ayrıca gerekir.
        </p>
      </Result>
      <Compare
        question="Yalnız farklı bağlantıları sayarsak tek H → Cl kaç yapı ürünü verir?"
        choices={["1", "2", "3", "4", "5"]}
        expected={String(m.monochloroProducts)}
        values={v}
        onChange={set}
      >
        <p>
          H taşıyan eş konum grupları sayılır: {m.monochloroProducts}. Bu sayı
          ürünlerin eşit oranda oluştuğunu veya ayrı uzay izomeri adedini
          söylemez.
        </p>
      </Compare>
    </Frame>
  );
}
export default function Forge022ChemistryBLab({
  lessonId,
}: {
  lessonId: string;
}) {
  if (lessonId === "karbon-kimyasina-giris") return <CarbonLab />;
  if (lessonId === "basit-ve-molekul-formul") return <FormulaLab />;
  if (lessonId === "hibritlesme") return <HybridLab />;
  if (lessonId === "molekul-geometrisi") return <GeometryLab />;
  if (lessonId === "alkanlar") return <AlkaneLab />;
  return null;
}
