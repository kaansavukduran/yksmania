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
  harmonic022,
  diffraction022,
  interference022,
  type SpringConnection022,
} from "./forge022Physics";
type Point022 = { x: number; y: number };
import "./forge022Physics.css";
const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(n) < 0.5 * 10 ** -digits ? 0 : n,
  );
const integer = (n: number, lo: number, hi: number, fallback: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(n) ? n : fallback)));
const exploration = (id: string) => `forge022-physics-${id}`;
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
    <fieldset className="physics022-compare">
      <legend>{question}</legend>
      <div className="physics022-guesses">
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
        <div className="physics022-feedback" role="status">
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
    <section data-forge022={id} className="physics022-lab">
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
    <div className="physics022-select">
      <label htmlFor={uid}>{label}</label>
      <select id={uid} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([value, name]) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
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
      data-physics022-plot={kind}
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
  kind = "physics022-external",
}: {
  name: string;
  vector: Point022;
  origin: Point022;
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
      className={`physics022-force ${kind}`}
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
    <div data-model-result className="physics022-result">
      {children}
    </div>
  );
}

function HarmonicLab() {
  const id = "basit-harmonik-hareket";
  const [v, set] = useExploration(exploration(id), {
    mass: 2,
    firstK: 50,
    secondK: 50,
    connection: "single",
    amplitude: 20,
    time: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const change = (next: Partial<typeof v>) => set({ ...next, checked: false });
  const connection: SpringConnection022 =
    v.connection === "series" || v.connection === "parallel"
      ? v.connection
      : "single";
  const mass = integer(v.mass, 1, 10, 2),
    firstK = integer(v.firstK, 10, 200, 50),
    secondK = integer(v.secondK, 10, 200, 50),
    amplitude = integer(v.amplitude, 0, 40, 20),
    time = integer(v.time, 0, 200, 0);
  const m = harmonic022(
    mass,
    firstK,
    secondK,
    connection,
    amplitude / 100,
    time / 100,
  );
  const expected = !m.oscillating
    ? "Durur"
    : m.velocity < 0
      ? "Sola"
      : m.velocity > 0
        ? "Sağa"
        : "Sıfır";
  return (
    <Frame
      id={id}
      title="Yayı adım adım izle"
      intro="İdeal yay, kütlesiz bağ ve sürtünmesiz yatay ray. +x sağa. Başlangıç +A ucunda durgun. Zamanı sen ilerletirsin; bağlantı çizimi eşdeğer tek yayı gösterir."
    >
      <Select
        label="Yay bağı"
        value={connection}
        onChange={(connection) => change({ connection })}
        options={[
          ["single", "Tek yay"],
          ["series", "Seri"],
          ["parallel", "Paralel"],
        ]}
      />
      <div className="physics022-controls">
        <Num
          label="Kütle (kg)"
          value={mass}
          min={1}
          max={10}
          change={(mass) => change({ mass })}
        />
        <Num
          label="k₁ (N/m)"
          value={firstK}
          min={10}
          max={200}
          change={(firstK) => change({ firstK })}
        />
        {connection !== "single" && (
          <Num
            label="k₂ (N/m)"
            value={secondK}
            min={10}
            max={200}
            change={(secondK) => change({ secondK })}
          />
        )}
        <Num
          label="Genlik (cm)"
          value={amplitude}
          min={0}
          max={40}
          change={(amplitude) => change({ amplitude })}
        />
        <Num
          label="Zaman (% T)"
          value={time}
          min={0}
          max={200}
          change={(time) => change({ time })}
        />
      </div>
      <div className="physics022-actions">
        <button
          className="secondary"
          onClick={() => change({ time: time + 25 > 200 ? 0 : time + 25 })}
        >
          T/4 ilerle
        </button>
        <button className="secondary" onClick={() => change({ time: 0 })}>
          Başa dön
        </button>
      </div>
      <figure className="physics022-figure">
        <figcaption>Gerçek x: yay ve ray</figcaption>
        <ScienceSvg
          kind="spring"
          height={210}
          title={`Yayda x ${fmt(m.position * 100)} cm; denge sıfır.`}
        >
          {(width) => {
            const scale = (width - 100) / 0.8,
              centre = width / 2,
              cx = centre + m.position * scale,
              left = cx - 14;
            const spring = Array.from(
              { length: 13 },
              (_, i) =>
                `${20 + ((left - 20) * i) / 12},${i === 0 || i === 12 ? 96 : i % 2 ? 91 : 101}`,
            ).join(" ");
            return (
              <>
                <text x={15} y={27}>
                  x (cm) · sağ +
                </text>
                <path
                  className="physics022-axis"
                  d={`M20 60V110H${width - 20}`}
                />
                <line
                  className="physics022-ghost"
                  x1={centre}
                  x2={centre}
                  y1={47}
                  y2={122}
                />
                <polyline className="physics022-curve" points={spring} />
                <rect
                  data-spring-body
                  data-x={m.position}
                  data-scale={scale}
                  data-origin={centre}
                  x={left}
                  y={82}
                  width={28}
                  height={28}
                  className="physics022-body"
                />
                <text x={cx} y={102} textAnchor="middle">
                  m
                </text>
                <path className="physics022-axis" d={`M50 150H${width - 50}`} />
                {[-0.4, 0, 0.4].map((x) => (
                  <g key={x}>
                    <path
                      className="physics022-axis"
                      d={`M${centre + x * scale} 144v12`}
                    />
                    <text x={centre + x * scale} y={183} textAnchor="middle">
                      {fmt(x * 100)}
                    </text>
                  </g>
                ))}
              </>
            );
          }}
        </ScienceSvg>
      </figure>
      <figure className="physics022-figure">
        <figcaption>Hız ve kuvvet: ayrı ölçek</figcaption>
        <ScienceSvg
          kind="harmonic-vectors"
          height={200}
          title={`Hız ${fmt(m.velocity)} m/s; kuvvet ${fmt(m.force)} N.`}
        >
          {(width, marker) => {
            const centre = width / 2,
              span = (width - 100) / 2;
            return (
              <>
                <text x={15} y={27}>
                  v (m/s)
                </text>
                <path className="physics022-axis" d={`M35 65H${width - 35}`} />
                <Arrow
                  name="velocity"
                  vector={{ x: m.velocity, y: 0 }}
                  origin={{ x: centre, y: 65 }}
                  scale={span / Math.max(m.maximumSpeed, 1)}
                  marker={marker}
                  kind="physics022-normal"
                />
                <text x={15} y={120}>
                  F (N)
                </text>
                <path className="physics022-axis" d={`M35 157H${width - 35}`} />
                <Arrow
                  name="restoring"
                  vector={{ x: m.force, y: 0 }}
                  origin={{ x: centre, y: 157 }}
                  scale={span / Math.max(m.stiffness * m.amplitude, 1)}
                  marker={marker}
                />
              </>
            );
          }}
        </ScienceSvg>
      </figure>
      <figure className="physics022-figure">
        <figcaption>Konumun iki tam çevrimi</figcaption>
        <ScienceSvg
          kind="harmonic-time"
          height={270}
          title="x–t grafiği; yatay eksen t/T, düşey eksen santimetre."
        >
          {(width) => {
            const x = (t: number) => 48 + ((width - 78) * t) / 2,
              y = (p: number) => 125 - (p / 0.4) * 65;
            const points = Array.from({ length: 129 }, (_, i) => {
              const t = (2 * i) / 128;
              return `${x(t)},${y(m.amplitude * Math.cos(TAU * t))}`;
            }).join(" ");
            return (
              <>
                <text x={15} y={26}>
                  x (cm)
                </text>
                <path
                  className="physics022-axis"
                  d={`M48 50V205H${width - 25}M48 125H${width - 25}`}
                />
                {[-40, 0, 40].map((p) => (
                  <text key={p} x={36} y={y(p / 100) + 5} textAnchor="end">
                    {p}
                  </text>
                ))}
                {[0, 1, 2].map((t) => (
                  <text key={t} x={x(t)} y={231} textAnchor="middle">
                    {t}
                  </text>
                ))}
                <text x={width - 18} y={258} textAnchor="end">
                  t/T
                </text>
                <polyline className="physics022-curve" points={points} />
                <circle
                  data-time-point
                  data-cycles={m.cycles}
                  data-position={m.position}
                  cx={x(m.cycles)}
                  cy={y(m.position)}
                  r={5}
                  className="physics022-selected"
                />
              </>
            );
          }}
        </ScienceSvg>
      </figure>
      <Result>
        <p>
          k_eş = {fmt(m.stiffness)} N/m; ω = {fmt(m.omega, 4)} rad/s.
        </p>
        <p>
          T = {fmt(m.period, 4)} s; f = {fmt(m.frequency, 4)} Hz; t ={" "}
          {fmt(m.time, 4)} s.
        </p>
        <p>
          x = {fmt(m.position * 100)} cm; v = {fmt(m.velocity, 4)} m/s; a ={" "}
          {fmt(m.acceleration, 4)} m/s²; F = {fmt(m.force, 4)} N.
        </p>
        <p>
          K = {fmt(m.kinetic, 4)} J; U = {fmt(m.potential, 4)} J; E ={" "}
          {fmt(m.energy, 4)} J.
        </p>
        <p>
          {m.oscillating
            ? "K + U = E. T doğal periyottur; genlik bunu bu ideal yayda değiştirmez."
            : "A = 0: cisim durur. Doğal T vardır ama bir salınım oluşmaz."}
        </p>
        <p>Oklar ayrı ölçeklidir; uzunlukları birbirine oranlanmaz.</p>
      </Result>
      <Compare
        question="Şu anda hızın yönü?"
        choices={["Sola", "Sağa", "Sıfır", "Durur"]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          v = {fmt(m.velocity, 4)} m/s.{" "}
          {m.oscillating
            ? "Uçlarda anlık hız sıfır; denge geçişinde sürat en büyüktür."
            : "Sıfır genlikte cisim denge konumunda kalır."}
        </p>
      </Compare>
    </Frame>
  );
}
const TAU = 2 * Math.PI;
function DiffractionLab() {
  const id = "su-dalgalarinda-kirinim";
  const [v, set] = useExploration(exploration(id), {
    wavelength: 2,
    width: 4,
    angle: 0,
    frequency: 3,
    guess: "",
    reason: "",
    checked: false,
  });
  const change = (next: Partial<typeof v>) => set({ ...next, checked: false });
  const wavelength = integer(v.wavelength, 1, 10, 2),
    width = integer(v.width, 1, 20, 4),
    angle = integer(v.angle, -85, 85, 0),
    frequency = integer(v.frequency, 1, 10, 3);
  const m = diffraction022(wavelength, width, angle, frequency);
  return (
    <Frame
      id={id}
      title="Açıklığı ve dalgayı seç"
      intro="Tek frekans, aynı ortam. Ek keşif: düzgün açıklığın skaler uzak alan zarfı; kayıp, eğiklik çarpanı ve dağılım yok. Yakın alanın tam çözümü değil. Genlik merkez değerine bölünür; mutlak güç gösterilmez."
    >
      <div className="physics022-controls">
        <Num
          label="λ (cm)"
          value={wavelength}
          min={1}
          max={10}
          change={(wavelength) => change({ wavelength })}
        />
        <Num
          label="Açıklık w (cm)"
          value={width}
          min={1}
          max={20}
          change={(width) => change({ width })}
        />
        <Num
          label="Açı θ (°)"
          value={angle}
          min={-85}
          max={85}
          change={(angle) => change({ angle })}
        />
        <Num
          label="f (Hz)"
          value={frequency}
          min={1}
          max={10}
          change={(frequency) => change({ frequency })}
        />
      </div>
      <figure className="physics022-figure">
        <figcaption>Açı, açıklığa dik yönden ölçülür</figcaption>
        <ScienceSvg
          kind="aperture"
          height={330}
          title={`Açıklık ${width} cm, dalga boyu ${wavelength} cm; yön ${angle} derece.`}
        >
          {(w, marker) => {
            const unit = 7,
              ox = 70,
              oy = 160,
              half = (width * unit) / 2,
              len = Math.min(110, w - ox - 35),
              theta = (angle * Math.PI) / 180;
            return (
              <>
                <text x={15} y={27}>
                  Engel ve açıklık
                </text>
                <path
                  data-aperture
                  data-width={width}
                  data-scale={unit}
                  data-gap={width * unit}
                  className="physics022-wall"
                  d={`M${ox} 55V${oy - half}M${ox} ${oy + half}V270`}
                />
                {Array.from(
                  { length: 8 },
                  (_, i) => ox - (i + 1) * wavelength * unit,
                )
                  .filter((x) => x > 10)
                  .map((x) => (
                    <path
                      key={x}
                      className="physics022-curve"
                      d={`M${x} 70V250`}
                    />
                  ))}
                <path
                  className="physics022-ghost"
                  d={`M${ox} ${oy}H${w - 15}`}
                />
                <path
                  data-direction
                  data-angle={angle}
                  data-length={len}
                  d={`M${ox} ${oy}L${ox + len * Math.cos(theta)} ${oy - len * Math.sin(theta)}`}
                  markerEnd={`url(#${marker})`}
                  className="physics022-force physics022-external"
                />
                <text x={w - 16} y={302} textAnchor="end">
                  Normal: sağa
                </text>
                <text x={15} y={325}>
                  Dalga soldan gelir
                </text>
              </>
            );
          }}
        </ScienceSvg>
      </figure>
      <figure className="physics022-figure">
        <figcaption>Normalize genlik: açıya bağlı zarf</figcaption>
        <ScienceSvg
          kind="diffraction-envelope"
          height={290}
          title={`Seçili ${angle} derecede normalize genlik ${fmt(m.relativeAmplitude, 4)}.`}
        >
          {(w) => {
            const px = (angle: number) => 42 + ((w - 70) * (angle + 90)) / 180,
              py = (a: number) => 208 - 145 * a;
            return (
              <>
                <text x={15} y={26}>
                  Genlik / merkez
                </text>
                <path className="physics022-axis" d={`M42 52V208H${w - 22}`} />
                <text x={29} y={68} textAnchor="end">
                  1
                </text>
                <text x={29} y={213} textAnchor="end">
                  0
                </text>
                {[-90, 0, 90].map((a) => (
                  <text key={a} x={px(a)} y={242} textAnchor="middle">
                    {a}
                  </text>
                ))}
                <text x={w - 16} y={276} textAnchor="end">
                  θ (°)
                </text>
                <polyline
                  className="physics022-curve"
                  points={m.envelope
                    .map((p) => `${px(p.angle)},${py(p.relativeAmplitude)}`)
                    .join(" ")}
                />
                <circle
                  data-envelope-point
                  data-angle={angle}
                  data-amplitude={m.relativeAmplitude}
                  cx={px(angle)}
                  cy={py(m.relativeAmplitude)}
                  r={5}
                  className="physics022-selected"
                />
              </>
            );
          }}
        </ScienceSvg>
      </figure>
      <Result>
        <p>
          λ / w = {fmt(m.ratio, 4)}; v = λf = {fmt(m.speed)} cm/s.
        </p>
        <p>
          β = {fmt(m.beta, 4)} rad; |sin β / β| = {fmt(m.relativeAmplitude, 4)}.
        </p>
        <p>Göreli enerji = {fmt(m.relativeEnergy, 4)}.</p>
        <p>
          {m.firstMinimum === null
            ? "İlk sıfır ileri yarı düzlemde yok; ana lob çok geniş."
            : `İlk sıfır: θ₁ = ${fmt(m.firstMinimum, 4)}°. İleri yarı düzlem sınırı 90°.`}
        </p>
        <p>
          λ/w artınca yana yayılma belirginleşir. w &gt; λ olması fiziksel
          etkinin tam yokluğu değildir.
        </p>
      </Result>
      <Compare
        question="Bu zarfın ilk sıfırı ileri yarı düzlemde var mı?"
        choices={["Var", "Yok"]}
        expected={m.firstMinimum === null ? "Yok" : "Var"}
        values={v}
        onChange={set}
      >
        <p>
          w sin θ = λ.{" "}
          {m.firstMinimum === null
            ? "λ/w > 1 olduğu için bu denklem gerçek bir θ vermez."
            : `λ/w ≤ 1; θ₁ = ${fmt(m.firstMinimum, 4)}°.`}{" "}
          Bu, kırınımın varlık koşulu değil zarfın sıfır koşuludur.
        </p>
      </Compare>
    </Frame>
  );
}
function InterferenceLab() {
  const id = "su-dalgalarinda-girisim";
  const [v, set] = useExploration(exploration(id), {
    wavelength: 4,
    separation: 6,
    firstAmplitude: 2,
    secondAmplitude: 2,
    phase: 0,
    x: 0,
    y: 4,
    time: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const change = (next: Partial<typeof v>) => set({ ...next, checked: false });
  const wavelength = integer(v.wavelength, 1, 10, 4),
    separation = integer(v.separation, 2, 20, 6),
    firstAmplitude = integer(v.firstAmplitude, 0, 4, 2),
    secondAmplitude = integer(v.secondAmplitude, 0, 4, 2),
    phase = integer(v.phase, 0, 360, 0),
    x = integer(v.x, -12, 12, 0),
    y = integer(v.y, 1, 25, 4),
    time = integer(v.time, 0, 100, 0);
  const m = interference022(
    wavelength,
    separation,
    firstAmplitude,
    secondAmplitude,
    phase,
    x,
    y,
    time / 100,
  );
  const kind = {
    node: "Tam düğüm",
    minimum: "Sıfır olmayan minimum",
    antinode: "Katar",
    partial: "Ara faz",
    single: "Tek katkı",
    quiet: "Titreşim yok",
  }[m.kind];
  return (
    <Frame
      id={id}
      title="İki kaynağın izini sür"
      intro="A solda, B sağda; +x sağa, +y yukarı. Aynı frekans ve sabit faz farkı. A₁ ve A₂, P’deki yerel genliklerdir (mm); yayılma kaybı yok. Noktanın gerçek uzaklığı ve fazı hesaplanır; zaman elle seçilir."
    >
      <div className="physics022-controls">
        <Num
          label="λ (cm)"
          value={wavelength}
          min={1}
          max={10}
          change={(wavelength) => change({ wavelength })}
        />
        <Num
          label="Kaynak arası d (cm)"
          value={separation}
          min={2}
          max={20}
          change={(separation) => change({ separation })}
        />
        <Num
          label="A₁ (mm)"
          value={firstAmplitude}
          min={0}
          max={4}
          change={(firstAmplitude) => change({ firstAmplitude })}
        />
        <Num
          label="A₂ (mm)"
          value={secondAmplitude}
          min={0}
          max={4}
          change={(secondAmplitude) => change({ secondAmplitude })}
        />
        <Num
          label="B’nin fazı (°)"
          value={phase}
          min={0}
          max={360}
          change={(phase) => change({ phase })}
        />
        <Num
          label="P: x (cm)"
          value={x}
          min={-12}
          max={12}
          change={(x) => change({ x })}
        />
        <Num
          label="P: y (cm)"
          value={y}
          min={1}
          max={25}
          change={(y) => change({ y })}
        />
        <Num
          label="Zaman (% T)"
          value={time}
          min={0}
          max={100}
          change={(time) => change({ time })}
        />
      </div>
      <div className="physics022-actions">
        <button
          className="secondary"
          onClick={() => change({ time: (time + 25) % 125 })}
        >
          T/4 ilerle
        </button>
        <button className="secondary" onClick={() => change({ x: 0 })}>
          Orta doğru
        </button>
      </div>
      <figure className="physics022-figure">
        <figcaption>Gerçek yol farkı: iki boyut</figcaption>
        <ScienceSvg
          kind="interference-map"
          height={410}
          title={`P ${fmt(m.firstDistance)} ve ${fmt(m.secondDistance)} cm uzaklıkta; ${kind}.`}
        >
          {(w, marker) => {
            const bound = Math.max(12, Math.abs(x) + 2),
              scale = Math.min((w - 80) / (2 * bound), 8),
              ox = w / 2,
              oy = 310,
              px = (x: number) => ox + x * scale,
              py = (y: number) => oy - y * scale,
              clip = `${marker}-map`;
            return (
              <>
                <defs>
                  <clipPath id={clip}>
                    <rect x={40} y={45} width={w - 80} height={265} />
                  </clipPath>
                </defs>
                <text x={15} y={25}>
                  y (cm)
                </text>
                <path className="physics022-axis" d={`M40 45V310H${w - 32}`} />
                <path className="physics022-ghost" d={`M${ox} 45V310`} />
                {[10, 20, 30].map((y) => (
                  <text key={y} x={32} y={py(y) + 5} textAnchor="end">
                    {y}
                  </text>
                ))}
                <g clipPath={`url(#${clip})`}>
                  {(firstAmplitude > 0 && secondAmplitude > 0
                    ? m.curves
                    : []
                  ).map((c, i) => (
                    <polyline
                      key={i}
                      data-phase-curve={c.kind}
                      data-path-difference={c.pathDifference}
                      data-points={JSON.stringify(c.points)}
                      className={
                        c.kind === "node"
                          ? "physics022-node"
                          : "physics022-antinode"
                      }
                      points={c.points
                        .map((p) => `${px(p.x)},${py(p.y)}`)
                        .join(" ")}
                    />
                  ))}
                  <path
                    data-probe-paths
                    className="physics022-paths"
                    d={`M${px(m.first.x)} ${oy}L${px(x)} ${py(y)}L${px(m.second.x)} ${oy}`}
                  />
                  <circle
                    data-probe
                    data-x={x}
                    data-y={y}
                    data-scale={scale}
                    data-origin-x={ox}
                    data-origin-y={oy}
                    cx={px(x)}
                    cy={py(y)}
                    r={5}
                    className="physics022-selected"
                  />
                </g>
                <text
                  data-probe-label
                  x={Math.max(53, Math.min(w - 53, px(x)))}
                  y={py(y) - 16}
                  textAnchor="middle"
                >
                  P
                </text>
                {[m.first, m.second].map((p, i) => (
                  <g key={i}>
                    <circle
                      data-source={i}
                      cx={px(p.x)}
                      cy={oy}
                      r={5}
                      className="physics022-source"
                    />
                    <text x={px(p.x)} y={339} textAnchor="middle">
                      {i === 0 ? "A" : "B"}
                    </text>
                  </g>
                ))}
                {[-10, 0, 10].map((x) => (
                  <text key={x} x={px(x)} y={367} textAnchor="middle">
                    {x}
                  </text>
                ))}
                <text x={w - 16} y={402} textAnchor="end">
                  x (cm)
                </text>
              </>
            );
          }}
        </ScienceSvg>
      </figure>
      <p>
        Düz çizgi: en büyük faz. Kesik çizgi: en küçük faz. Tam düğüm için eşit
        ve sıfırdan büyük genlik gerekir.
      </p>
      <p>
        Şekil |Δr| &lt; d dallarını gösterir; eşitlikteki dış ışınlar çizilmez.
        İnce gri çizgiler P’ye gerçek yolları gösterir.
      </p>
      <figure className="physics022-figure">
        <figcaption>P’nin bir çevrimdeki yüksekliği</figcaption>
        <ScienceSvg
          kind="interference-time"
          height={280}
          title="P’de A ve B katkıları ile toplam yükseklik; yatay eksen t/T, düşey mm."
        >
          {(w) => {
            const px = (t: number) => 48 + (w - 78) * t,
              py = (h: number) => 136 - h * 10;
            const at = (t: number, which: number) => {
              const a =
                  firstAmplitude *
                  Math.cos(TAU * (t - m.firstDistance / wavelength)),
                b =
                  secondAmplitude *
                  Math.cos(
                    TAU * (t - m.secondDistance / wavelength) +
                      (phase * Math.PI) / 180,
                  );
              return which === 0 ? a : which === 1 ? b : a + b;
            };
            return (
              <>
                <text x={15} y={26}>
                  η (mm)
                </text>
                <path
                  className="physics022-axis"
                  d={`M48 48V216H${w - 23}M48 136H${w - 23}`}
                />
                {[-8, 0, 8].map((h) => (
                  <text key={h} x={35} y={py(h) + 5} textAnchor="end">
                    {h}
                  </text>
                ))}
                {[0, 0.5, 1].map((t) => (
                  <text key={t} x={px(t)} y={242} textAnchor="middle">
                    {fmt(t)}
                  </text>
                ))}
                {[0, 1, 2].map((which) => (
                  <polyline
                    data-height-curve={which}
                    key={which}
                    className={`physics022-height-${which}`}
                    points={Array.from(
                      { length: 129 },
                      (_, i) => `${px(i / 128)},${py(at(i / 128, which))}`,
                    ).join(" ")}
                  />
                ))}
                <circle
                  data-height-point
                  data-height={m.height}
                  cx={px(time / 100)}
                  cy={py(m.height)}
                  r={5}
                  className="physics022-selected"
                />
                <text x={w - 16} y={273} textAnchor="end">
                  t/T
                </text>
              </>
            );
          }}
        </ScienceSvg>
      </figure>
      <p>Mavi: A katkısı. Yeşil kesik: B katkısı. Kalın vurgu: toplam.</p>
      <Result>
        <p>
          r₁ = {fmt(m.firstDistance, 4)} cm; r₂ = {fmt(m.secondDistance, 4)} cm.
        </p>
        <p>
          Δr = r₂ − r₁ = {fmt(m.pathDifference, 4)} cm; δ ={" "}
          {fmt(m.phaseDifference / Math.PI, 4)} π rad.
        </p>
        <p>
          η₁ = {fmt(m.firstHeight, 4)} mm; η₂ = {fmt(m.secondHeight, 4)} mm;
          toplam η = {fmt(m.height, 4)} mm.
        </p>
        <p>
          Toplam genlik = {fmt(m.amplitude, 4)} mm; alt sınır ={" "}
          {fmt(m.minimumAmplitude)} mm; üst sınır = {fmt(m.maximumAmplitude)}{" "}
          mm.
        </p>
        <p>
          Durum: <strong>{kind}</strong>.
        </p>
        <p>
          Anlık yükseklik sıfır olabilir; bu, tek başına düğüm kanıtı değildir.
        </p>
      </Result>
      <Compare
        question="P tam düğüm mü?"
        choices={["Evet", "Hayır"]}
        expected={m.kind === "node" ? "Evet" : "Hayır"}
        values={v}
        onChange={set}
      >
        <p>
          Faz farkı {fmt(m.phaseDifference / Math.PI, 4)} π; yerel genlikler{" "}
          {firstAmplitude} ve {secondAmplitude} mm.{" "}
          {m.kind === "node"
            ? "Eşit genlik ve ters faz: P her an dengede kalır."
            : "Tam düğüm için sıfırdan büyük eşit katkılar ve ters faz birlikte gerekir."}
        </p>
      </Compare>
    </Frame>
  );
}
export default function Forge022PhysicsLab({ lessonId }: { lessonId: string }) {
  return lessonId === "basit-harmonik-hareket" ? (
    <HarmonicLab />
  ) : lessonId === "su-dalgalarinda-kirinim" ? (
    <DiffractionLab />
  ) : lessonId === "su-dalgalarinda-girisim" ? (
    <InterferenceLab />
  ) : null;
}
