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
  pairEnergy019,
  potential019,
  plates019,
  capacitor019,
  wireField019,
  loopField019,
  solenoidField019,
  type Point019,
} from "./forge019Physics";
import "./forge019Physics.css";
const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(n) < 0.5 * 10 ** -digits ? 0 : n,
  );
const integer = (n: number, lo: number, hi: number, fallback: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(n) ? n : fallback)));
const exploration = (id: string) => `forge019-physics-${id}`;
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
    <fieldset className="physics019-compare">
      <legend>{question}</legend>
      <div className="physics019-guesses">
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
        <div className="physics019-feedback" role="status">
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
    <section data-forge019={id} className="physics019-lab">
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
    <div className="physics019-select">
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
      data-physics019-plot={kind}
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
  kind = "physics019-external",
}: {
  name: string;
  vector: Point019;
  origin: Point019;
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
      className={`physics019-force ${kind}`}
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
    <div data-model-result className="physics019-result">
      {children}
    </div>
  );
}
function EnergyLab() {
  const id = "elektriksel-potansiyel-enerji";
  const [v, set] = useExploration(exploration(id), {
    source: 2,
    test: 3,
    start: 10,
    radius: 20,
    guess: "",
    reason: "",
    checked: false,
  });
  const source = integer(v.source, -5, 5, 2),
    test = integer(v.test, -5, 5, 3),
    start = integer(v.start, 5, 30, 10) / 10,
    radius = integer(v.radius, 5, 30, 20) / 10;
  const m = pairEnergy019(source, test, start, radius),
    expected =
      m.deltaU > 1e-12 ? "Artar" : m.deltaU < -1e-12 ? "Azalır" : "Aynı kalır";
  return (
    <Frame
      id={id}
      title="Uzaklaştır, işi enerjiyle karşılaştır"
      intro="Vakumda sabit kaynak ve küçük test yükü. Konumu bir dış düzenek yavaşça değiştiriyor; ilk ve son kinetik enerji eşit. Yalnız elektrik ve dış kuvvet işi var."
    >
      <div className="physics019-controls">
        <Num
          label="Kaynak yükü (μC)"
          value={source}
          min={-5}
          max={5}
          change={(n) => set({ source: n, checked: false })}
        />
        <Num
          label="Test yükü (μC)"
          value={test}
          min={-5}
          max={5}
          change={(n) => set({ test: n, checked: false })}
        />
        <Num
          label="İlk uzaklık (dm)"
          value={Math.round(start * 10)}
          min={5}
          max={30}
          change={(n) => set({ start: n, checked: false })}
        />
        <Num
          label="Son uzaklık (dm)"
          value={Math.round(radius * 10)}
          min={5}
          max={30}
          change={(n) => set({ radius: n, checked: false })}
        />
      </div>
      <figure className="physics019-figure">
        <figcaption>Bir çiftin enerjisi: sonsuz ayrımda U = 0</figcaption>
        <ScienceSvg
          title={`İlk uzaklık ${fmt(start)} metre, son uzaklık ${fmt(radius)} metre. Enerji ${fmt(m.currentU, 6)} joule.`}
          kind="pair-energy"
          height={320}
        >
          {(w) => {
            const l = 66,
              r = w - 25,
              mid = 145,
              s =
                92 /
                Math.max(0.001, Math.abs((9e9 * source * test * 1e-12) / 0.5)),
              x = (d: number) => l + ((d - 0.5) / 2.5) * (r - l),
              y = (u: number) => mid - u * s;
            const points = Array.from({ length: 81 }, (_, i) => {
              const d = 0.5 + (2.5 * i) / 80;
              return `${x(d)},${y((9e9 * source * test * 1e-12) / d)}`;
            }).join(" ");
            return (
              <>
                <path
                  className="physics019-axis"
                  d={`M${l} 42V255M${l} ${mid}H${r}`}
                />
                <text x={12} y={23}>
                  U (J)
                </text>
                <text x={r} y={304} textAnchor="end">
                  r (m)
                </text>
                <text x={l - 10} y={mid + 6} textAnchor="end">
                  0
                </text>
                <polyline
                  data-energy-curve
                  points={points}
                  className="physics019-curve"
                />
                {[0.5, 1.75, 3].map((d) => (
                  <g key={d}>
                    <path className="physics019-axis" d={`M${x(d)} 255v6`} />
                    <text x={x(d)} y={282} textAnchor="middle">
                      {fmt(d)}
                    </text>
                  </g>
                ))}
                <circle
                  data-energy-initial
                  data-radius={start}
                  data-u={m.initialU}
                  cx={x(start)}
                  cy={y(m.initialU)}
                  r={7}
                  className="physics019-initial"
                />
                <circle
                  data-energy-selected
                  data-radius={radius}
                  data-u={m.currentU}
                  cx={x(radius)}
                  cy={y(m.currentU)}
                  r={4}
                  className="physics019-selected"
                />
              </>
            );
          }}
        </ScienceSvg>
        <figcaption className="small muted">
          Halka ilk konum, dolu nokta son konum. Eğri ölçülmüş hareket yolu
          değildir; her kontrollü uzaklık için enerji değeridir.
        </figcaption>
      </figure>
      <Result>
        <p>
          İlk U = {fmt(m.initialU, 6)} J; son U = {fmt(m.currentU, 6)} J.
        </p>
        <p>
          ΔU = {fmt(m.deltaU, 6)} J. Elektrik işi = {fmt(m.electricWork, 6)} J;
          yavaş dış iş = {fmt(m.externalQuasistaticWork, 6)} J.
        </p>
        <p>
          Son radyal kuvvet = {fmt(m.radialForce, 6)} N. Pozitif işaret dışarı
          yönü, negatif işaret kaynağa çekimi anlatır.
        </p>
        <p>
          ΔK = 0; iki işin toplamı{" "}
          {fmt(m.electricWork + m.externalQuasistaticWork, 8)} J. Uzaklık sıfır
          seçilemez.
        </p>
      </Result>
      <Compare
        question="İlk konumdan sona geçince U nasıl değişir?"
        choices={["Artar", "Azalır", "Aynı kalır"]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          U = kQq/r; hem yük çarpımının işaretini hem iki uzaklığı kullan. ΔU ={" "}
          {fmt(m.deltaU, 6)} J.
        </p>
      </Compare>
    </Frame>
  );
}
function PotentialLab() {
  const id = "elektriksel-potansiyel";
  const [v, set] = useExploration(exploration(id), {
    mode: "pair",
    right: 1,
    height: 0,
    probe: 1,
    radius: 10,
    angle: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const mode = v.mode === "ring" ? "ring" : "pair",
    right = integer(v.right, -2, 2, 1),
    height = integer(v.height, 0, 20, 0) / 10,
    radius = integer(v.radius, 5, 20, 10) / 10,
    angle = integer(v.angle, 0, 360, 0),
    probe = integer(v.probe, -3, 3, 1);
  const point =
    mode === "pair"
      ? { x: 0, y: height }
      : {
          x: radius * Math.cos((angle * Math.PI) / 180),
          y: radius * Math.sin((angle * Math.PI) / 180),
        };
  const sources =
    mode === "pair"
      ? [
          { x: -1, y: 0, micro: 1 },
          { x: 1, y: 0, micro: right },
        ]
      : [{ x: 0, y: 0, micro: 1 }];
  const m = potential019(sources, point, probe),
    zeroV = Math.abs(m.potential) < 1e-7,
    zeroE = m.fieldMagnitude < 1e-7,
    expected = zeroV
      ? zeroE
        ? "İkisi de sıfır"
        : "V sıfır, alan var"
      : zeroE
        ? "V var, alan sıfır"
        : "İkisi de var";
  return (
    <Frame
      id={id}
      title="Bir sayı, bir vektör: aynı kaynak haritası"
      intro="Sabit noktasal kaynaklar vakumda. V, işaretli skaler katkıların toplamı; E, yönlü katkıların toplamı. Küçük test yükü kaynak konumunu sabit tutuyor."
    >
      <Select
        label="Kaynak düzeni"
        value={mode}
        onChange={(mode) => set({ mode, checked: false })}
        options={[
          ["pair", "İki kaynak"],
          ["ring", "Tek kaynak, eş potansiyel çember"],
        ]}
      />
      <div className="physics019-controls">
        {mode === "pair" ? (
          <>
            <Num
              label="Sağ kaynak (μC)"
              value={right}
              min={-2}
              max={2}
              change={(right) => set({ right, checked: false })}
            />
            <Num
              label="Gözlem yüksekliği (dm)"
              value={Math.round(height * 10)}
              min={0}
              max={20}
              change={(height) => set({ height, checked: false })}
            />
          </>
        ) : (
          <>
            <Num
              label="Çember yarıçapı (dm)"
              value={Math.round(radius * 10)}
              min={5}
              max={20}
              change={(radius) => set({ radius, checked: false })}
            />
            <Num
              label="Konum açısı (°)"
              value={angle}
              min={0}
              max={360}
              change={(angle) => set({ angle, checked: false })}
            />
          </>
        )}
        <Num
          label="Küçük test yükü (μC)"
          value={probe}
          min={-3}
          max={3}
          change={(probe) => set({ probe, checked: false })}
        />
      </div>
      <ScienceSvg
        title={`Potansiyel ${fmt(m.potential)} volt. Alan bileşenleri ${fmt(m.field.x)} ve ${fmt(m.field.y)} newton bölü coulomb.`}
        kind="potential-field"
        height={390}
      >
        {(w, marker) => {
          const cx = w / 2,
            cy = mode === "pair" ? 270 : 198,
            scale =
              mode === "pair"
                ? Math.min((w - 92) / 2, 95)
                : Math.min((w - 140) / 2, 100) / radius,
            screen = (p: Point019) => ({
              x: cx + p.x * scale,
              y: cy - p.y * scale,
            }),
            p = screen(point),
            fieldScale = m.fieldMagnitude === 0 ? 0 : 42 / m.fieldMagnitude;
          return (
            <>
              <path
                className="physics019-axis"
                d={`M25 ${cy}H${w - 25}M${cx} 55V345`}
              />
              <text x={w - 25} y={cy + 24} textAnchor="end">
                x (m)
              </text>
              <text x={cx + 10} y={32}>
                y (m)
              </text>
              {mode === "ring" && (
                <circle
                  data-equipotential
                  cx={cx}
                  cy={cy}
                  r={radius * scale}
                  className="physics019-axis-guide"
                />
              )}
              {sources.map((s, i) => {
                const a = screen(s);
                return (
                  <g key={i}>
                    <circle
                      data-source-charge={s.micro}
                      data-world-x={s.x}
                      cx={a.x}
                      cy={a.y}
                      r={14}
                      className="physics019-charge"
                    />
                    <text x={a.x} y={a.y + 6} textAnchor="middle">
                      {s.micro > 0 ? "+" : s.micro < 0 ? "−" : "0"}
                    </text>
                  </g>
                );
              })}
              <circle
                data-potential-probe
                data-world-x={point.x}
                data-world-y={point.y}
                cx={p.x}
                cy={p.y}
                r={4}
                className="physics019-selected"
              />
              <Arrow
                name="E"
                vector={m.field}
                origin={p}
                scale={fieldScale}
                marker={marker}
              />
              <text x={25} y={373}>
                P: gözlem noktası
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <Result>
        <p>
          P = ({fmt(point.x, 3)}; {fmt(point.y, 3)}) m. V = {fmt(m.potential)}{" "}
          V.
        </p>
        <p>
          E = ({fmt(m.field.x)}; {fmt(m.field.y)}) N/C; büyüklük{" "}
          {fmt(m.fieldMagnitude)} N/C.
        </p>
        <p>
          Testin U = qV değeri {fmt(m.probeEnergy, 6)} J. Test yükü değişse de
          kaynak V ve E değerleri korunur.
        </p>
        {mode === "ring" ? (
          <p>
            Çemberin her noktasında r = {fmt(radius)} m. V sabit, E yönü radyal;
            bu çember boyunca elektrik işi sıfırdır.
          </p>
        ) : (
          <p>
            Soldaki kaynak +1 μC, sağdaki {fmt(right)} μC; konumları (−1; 0) ve
            (1; 0) m. Ok uzunluğu bu çizimde 42 px ile ölçeklenir; büyüklüğü
            sayıdan oku.
          </p>
        )}
      </Result>
      <Compare
        question="Seçili noktada V ile E sıfır mı?"
        choices={[
          "V sıfır, alan var",
          "V var, alan sıfır",
          "İkisi de var",
          "İkisi de sıfır",
        ]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          V için işaretleri topla; E için her kaynağın yönünü de kullan. Birinin
          sıfır olması ötekini zorunlu sıfırlamaz.
        </p>
      </Compare>
    </Frame>
  );
}
function PlateLab() {
  const id = "duzgun-alan-paralel-levhalar";
  const [v, set] = useExploration(exploration(id), {
    gap: 50,
    length: 40,
    voltage: 500,
    mass: 1000,
    micro: 5,
    vx: 2,
    vy: 0,
    gravity: 0,
    progress: 100,
    guess: "",
    reason: "",
    checked: false,
  });
  const gap = integer(v.gap, 10, 100, 50) / 100,
    length = integer(v.length, 10, 100, 40) / 100,
    voltage = integer(v.voltage, -1000, 1000, 500),
    mass = integer(v.mass, 100, 5000, 1000) / 1e6,
    micro = integer(v.micro, -10, 10, 5),
    vx = integer(v.vx, 1, 10, 2),
    vy = integer(v.vy, -3, 3, 0),
    gravity = integer(v.gravity, 0, 10, 0),
    progress = integer(v.progress, 0, 100, 100) / 100;
  const m = plates019({
    gap,
    length,
    voltage,
    mass,
    micro,
    vx,
    vy,
    gravity,
    progress,
  });
  const final = plates019({ ...m, progress: 1 });
  return (
    <Frame
      id={id}
      title="Levhaların arasında ilk olayı bul"
      intro="Kenar etkisi ihmal edilen düzgün alan bölgesi 0 ≤ x ≤ L. Başlangıç orta çizgi: x = y = 0. Üst levha 0 V, alt levha seçili V. Yer çekimi aşağı; hava direnci yok."
    >
      <div className="physics019-controls">
        <Num
          label="Levha aralığı (cm)"
          value={Math.round(gap * 100)}
          min={10}
          max={100}
          change={(gap) => set({ gap, checked: false })}
        />
        <Num
          label="Alan bölgesi uzunluğu (cm)"
          value={Math.round(length * 100)}
          min={10}
          max={100}
          change={(length) => set({ length, checked: false })}
        />
        <Num
          label="Alt levha gerilimi (V)"
          value={voltage}
          min={-1000}
          max={1000}
          change={(voltage) => set({ voltage, checked: false })}
        />
        <Num
          label="Kütle (mg)"
          value={Math.round(mass * 1e6)}
          min={100}
          max={5000}
          change={(mass) => set({ mass, checked: false })}
        />
        <Num
          label="Yük (μC)"
          value={micro}
          min={-10}
          max={10}
          change={(micro) => set({ micro, checked: false })}
        />
        <Num
          label="İlk yatay hız (m/s)"
          value={vx}
          min={1}
          max={10}
          change={(vx) => set({ vx, checked: false })}
        />
        <Num
          label="İlk düşey hız (m/s)"
          value={vy}
          min={-3}
          max={3}
          change={(vy) => set({ vy, checked: false })}
        />
        <Num
          label="Yer çekimi (m/s²)"
          value={gravity}
          min={0}
          max={10}
          change={(gravity) => set({ gravity, checked: false })}
        />
        <Num
          label="İlk olaya kadar ilerleme (%)"
          value={Math.round(progress * 100)}
          min={0}
          max={100}
          change={(progress) => set({ progress, checked: false })}
        />
      </div>
      <div className="physics019-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => set({ progress: 0, checked: false })}
        >
          Başlangıca dön
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() =>
            set({
              progress: Math.min(100, Math.round(progress * 100) + 10),
              checked: false,
            })
          }
        >
          Bir adım ilerle
        </button>
      </div>
      <ScienceSvg
        title={`İlk olay ${final.kind}, süre ${fmt(final.duration, 4)} saniye. Seçili konum ${fmt(m.x, 4)} ve ${fmt(m.y, 4)} metre.`}
        kind="plates-flight"
        height={405}
      >
        {(w, marker) => {
          const left = 42,
            cy = 195,
            scale = Math.min((w - 90) / length, 220 / gap),
            right = left + length * scale,
            top = cy - (gap / 2) * scale,
            bottom = cy + (gap / 2) * scale;
          const points = Array.from({ length: 61 }, (_, i) => {
            const t = (m.time * i) / 60;
            return `${left + vx * t * scale},${cy - (vy * t + 0.5 * m.ay * t * t) * scale}`;
          }).join(" ");
          const endX = left + m.x * scale,
            endY = cy - m.y * scale;
          return (
            <>
              <path
                data-upper-plate
                data-y={gap / 2}
                className="physics019-surface"
                d={`M${left} ${top}H${right}`}
              />
              <path
                data-lower-plate
                data-y={-gap / 2}
                className="physics019-external physics019-surface"
                d={`M${left} ${bottom}H${right}`}
              />
              <text x={left} y={30}>
                Üst: 0 V
              </text>
              <text x={left} y={57}>
                Alt: {fmt(voltage)} V
              </text>
              <path
                className="physics019-axis-guide"
                d={`M${left} ${cy}H${right}M${right} ${top}V${bottom}`}
              />
              <polyline
                data-flight-path
                data-duration={m.duration}
                data-time={m.time}
                data-scale={scale}
                points={points}
                className="physics019-travelled"
              />
              <circle
                data-plate-particle
                data-x={m.x}
                data-y={m.y}
                cx={endX}
                cy={endY}
                r={4}
                className="physics019-selected"
              />
              {m.field !== 0 && (
                <Arrow
                  name="E"
                  vector={{ x: 0, y: Math.sign(m.field) }}
                  origin={{ x: right + 22, y: cy + Math.sign(m.field) * 25 }}
                  scale={50}
                  marker={marker}
                  kind="physics019-normal"
                />
              )}
              <path
                className="physics019-axis"
                d={`M${left} 345H${right}M${left} 340v10M${right} 340v10`}
              />
              <text x={left} y={375} textAnchor="middle">
                0
              </text>
              <text x={right} y={375} textAnchor="end">
                {fmt(length)} m
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <p className="small muted">
        x ve y için aynı geometrik ölçek kullanılır. Düşey ok alan yönüdür;
        çizgi bir tanecik izidir. İlerleme gerçek zamanla otomatik akmaz; adımla
        veya çubukla seçilir.
      </p>
      <Result>
        <p>
          Eᵧ = {fmt(m.field, 3)} N/C. Elektrik kuvveti {fmt(m.electricForce, 6)}{" "}
          N; ağırlık {fmt(m.weight, 6)} N.
        </p>
        <p>
          aᵧ = {fmt(m.ay, 4)} m/s². İlk olay: {final.kind}; t ={" "}
          {fmt(final.duration, 4)} s.
        </p>
        <p>
          Seçili t = {fmt(m.time, 4)} s; (x; y) = ({fmt(m.x, 4)}; {fmt(m.y, 4)})
          m. Hız = ({fmt(vx)}; {fmt(m.velocityY, 4)}) m/s.
        </p>
        <p>
          Elektrik işi = {fmt(m.electricWork, 6)} J; yer çekimi işi ={" "}
          {fmt(m.gravityWork, 6)} J; ΔK = {fmt(m.deltaK, 6)} J.
        </p>
        <p>
          İşlerin toplamı {fmt(m.electricWork + m.gravityWork, 6)} J. Levhaya
          değdikten sonraki çarpışma bu serbest uçuş modelinde yoktur.
        </p>
      </Result>
      <Compare
        question="Önce hangi sınır gerçekleşir?"
        choices={["Çıkış", "Üst levha", "Alt levha", "Üst köşe", "Alt köşe"]}
        expected={final.kind}
        values={v}
        onChange={set}
      >
        <p>
          Çıkış süresini L/vₓ ile, levha sürelerini y(t) = ±d/2 ile karşılaştır.
          En küçük pozitif süre {fmt(final.duration, 4)} s.
        </p>
      </Compare>
    </Frame>
  );
}
function CapacitorLab() {
  const id = "sigaclar-kondansatorler";
  const [v, set] = useExploration(exploration(id), {
    area: 200,
    gap: 1,
    dielectric: 1,
    battery: 100,
    connected: true,
    heldNano: 17.7,
    guess: "",
    reason: "",
    checked: false,
  });
  const area = integer(v.area, 50, 400, 200) / 1e4,
    gap = integer(v.gap, 1, 10, 1) / 1000,
    kappa = integer(v.dielectric, 1, 5, 1),
    battery = integer(v.battery, 0, 300, 100),
    heldNano = Number.isFinite(v.heldNano)
      ? Math.max(0, Math.min(1e4, v.heldNano))
      : 17.7;
  const m = capacitor019(
    area,
    gap,
    kappa,
    v.connected
      ? { kind: "connected", voltage: battery }
      : { kind: "isolated", charge: heldNano * 1e-9 },
  );
  const expected = v.connected ? "Gerilim" : "Yük";
  return (
    <Frame
      id={id}
      title="Bağlı deney ile ayrılmış deneyi karşılaştır"
      intro="İdeal paralel levhalı sığaç: kaçak, kenar etkisi ve delinme ihmal. Doğrusal dielektrik aralığı tamamen dolduruyor. Üreteçten ayırma düğmesi o andaki yükü saklar."
    >
      <div className="physics019-actions">
        <button
          type="button"
          className="secondary"
          disabled={!v.connected}
          onClick={() =>
            set({ connected: false, heldNano: m.charge * 1e9, checked: false })
          }
        >
          Üreteçten ayır
        </button>
        <button
          type="button"
          className="secondary"
          disabled={v.connected}
          onClick={() => set({ connected: true, checked: false })}
        >
          Üretece bağla
        </button>
      </div>
      <div className="physics019-controls">
        <Num
          label="Levha alanı (cm²)"
          value={Math.round(area * 1e4)}
          min={50}
          max={400}
          change={(area) => set({ area, checked: false })}
        />
        <Num
          label="Levha aralığı (mm)"
          value={Math.round(gap * 1000)}
          min={1}
          max={10}
          change={(gap) => set({ gap, checked: false })}
        />
        <Num
          label="Bağıl geçirgenlik"
          value={kappa}
          min={1}
          max={5}
          change={(dielectric) => set({ dielectric, checked: false })}
        />
        <Num
          label="Üreteç gerilimi (V)"
          value={battery}
          min={0}
          max={300}
          change={(battery) => set({ battery, checked: false })}
        />
      </div>
      <p>
        {v.connected
          ? "Üreteç bağlı; V sabit tutulur, yük alışverişi olabilir."
          : "Üreteç ayrılmış; Q korunur. Üretecin ayarı değişse de bu sığacın yükü sabit kalır."}
      </p>
      <ScienceSvg
        title={`Sığa ${fmt(m.capacitance * 1e12)} pikofarad; yük ${fmt(m.charge * 1e9)} nC. ${v.connected ? "Üreteç bağlı." : "Üreteç ayrılmış."}`}
        kind="capacitor"
        height={350}
      >
        {(w) => {
          const cx = w / 2,
            plateWidth = Math.min(w - 80, 150) * Math.sqrt(area / 0.04),
            halfGap = 15 + gap * 5000,
            left = cx - plateWidth / 2,
            right = cx + plateWidth / 2;
          return (
            <>
              <text x={25} y={30}>
                {v.connected ? "Bağlı" : "Ayrılmış"}
              </text>
              <rect
                data-dielectric
                data-relative={kappa}
                x={left}
                y={170 - halfGap}
                width={plateWidth}
                height={2 * halfGap}
                className="physics019-dielectric"
              />
              <path
                data-capacitor-positive
                data-charge={m.charge}
                className="physics019-surface physics019-external"
                d={`M${left} ${170 - halfGap}H${right}`}
              />
              <path
                data-capacitor-negative
                data-charge={-m.charge}
                className="physics019-surface physics019-normal"
                d={`M${left} ${170 + halfGap}H${right}`}
              />
              <text x={cx} y={170 - halfGap - 16} textAnchor="middle">
                +Q
              </text>
              <text x={cx} y={170 + halfGap + 31} textAnchor="middle">
                −Q
              </text>
              <path
                data-capacitor-lead="positive"
                className="physics019-rope"
                d={`M${left} ${170 - halfGap}L25 ${170 - halfGap}L25 285L${cx - 30} 285`}
              />
              <path
                data-capacitor-lead="negative"
                className="physics019-rope"
                d={`M${right} ${170 + halfGap}L${w - 25} ${170 + halfGap}L${w - 25} 315L${cx + 8} 315L${cx + 8} 285`}
              />
              {v.connected ? (
                <path
                  data-switch="closed"
                  className="physics019-surface"
                  d={`M${cx - 30} 285H${cx - 8}`}
                />
              ) : (
                <path
                  data-switch="open"
                  className="physics019-surface"
                  d={`M${cx - 30} 285l18 -18`}
                />
              )}
              <path
                data-source-battery
                className="physics019-surface"
                d={`M${cx - 8} 270V300M${cx + 8} 277V293`}
              />
              <text x={cx} y={340} textAnchor="middle">
                Üreteç ve anahtar
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <p className="small muted">
        Levha alanı ve aralık farklı görsel ölçeklerle çizilir; mm aralığı büyük
        çizilir. Bu bir devre şemasıdır, gerçek boyut fotoğrafı değildir. ±Q
        eşit büyüklüklü levha yükleridir.
      </p>
      <Result>
        <p>
          C = {fmt(m.capacitance * 1e12, 3)} pF; Q = {fmt(m.charge * 1e9, 3)}{" "}
          nC.
        </p>
        <p>
          V = {fmt(m.voltage, 4)} V; E = {fmt(m.field, 3)} V/m. U ={" "}
          {fmt(m.energy * 1e6, 6)} μJ.
        </p>
        <p>
          C = ε₀εᵣA/d; Q = CV.{" "}
          {v.connected
            ? `Sabit üreteç ${fmt(battery)} V değerini koruyor.`
            : `Bağlantı kesilirken saklanan yük ${fmt(heldNano, 3)} nC.`}
        </p>
        <p>
          U = QV/2. Geometri veya ortam değişince enerji farkı yalnız ısı
          sayılmaz; dış mekanik iş ve bağlıysa üreteç de hesaba katılır.
        </p>
      </Result>
      <Compare
        question="Bu bağlantıda hangi nicelik sabit tutulur?"
        choices={["Yük", "Gerilim"]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          {v.connected
            ? "Kaynak V’yi korur; sığa değişince Q = CV de değişebilir."
            : "Kaçaksız ayrılmış sığaçta Q korunur; C değişince V = Q/C değişir."}
        </p>
      </Compare>
    </Frame>
  );
}
function MagneticLab() {
  const id = "manyetik-alan-ayt";
  const [v, set] = useExploration(exploration(id), {
    mode: "wires",
    left: 5,
    right: 5,
    height: 0,
    current: 3,
    radius: 10,
    turns: 1,
    arc: 360,
    solenoidTurns: 500,
    solenoidLength: 50,
    guess: "",
    reason: "",
    checked: false,
  });
  const mode = ["wires", "loop", "solenoid"].includes(v.mode)
      ? v.mode
      : "wires",
    left = integer(v.left, -10, 10, 5),
    right = integer(v.right, -10, 10, 5),
    height = integer(v.height, 0, 20, 0) / 100,
    current = integer(v.current, -10, 10, 3),
    radius = integer(v.radius, 5, 30, 10) / 100,
    turns = integer(v.turns, 1, 5, 1),
    arc = integer(v.arc, 0, 360, 360),
    solenoidTurns = integer(v.solenoidTurns, 100, 1000, 500),
    solenoidLength = integer(v.solenoidLength, 50, 200, 50) / 100;
  const point = { x: 0, y: height },
    wires = [
      { x: -0.1, y: 0, current: left },
      { x: 0.1, y: 0, current: right },
    ],
    wire = wireField019(wires, point),
    loop = loopField019(current, radius, turns, arc),
    coil = solenoidField019(current, solenoidTurns, solenoidLength);
  const signed =
      mode === "wires"
        ? wire.field.y
        : mode === "loop"
          ? loop.fieldZ
          : coil.field,
    expected =
      mode === "wires"
        ? wire.magnitude < 1e-15
          ? "Sıfır"
          : "Düzlem içi"
        : signed > 0
          ? "Pozitif eksen"
          : signed < 0
            ? "Negatif eksen"
            : "Sıfır";
  return (
    <Frame
      id={id}
      title="Akımı çevir, alanın yönünü kur"
      intro="Hava veya vakum modeli ile akımın verdiği alan. Alan çizgileri taneciğin gerçek yolu değildir. Tel, halka ve uzun bobinin formülleri kendi biçimi için kullanılır."
    >
      <Select
        label="Akım geometrisi"
        value={mode}
        onChange={(mode) => set({ mode, checked: false })}
        options={[
          ["wires", "İki uzun tel"],
          ["loop", "Halka veya yay merkezi"],
          ["solenoid", "Uzun hava bobini"],
        ]}
      />
      <div className="physics019-controls">
        {mode === "wires" ? (
          <>
            <Num
              label="Sol tel akımı (A)"
              value={left}
              min={-10}
              max={10}
              change={(left) => set({ left, checked: false })}
            />
            <Num
              label="Sağ tel akımı (A)"
              value={right}
              min={-10}
              max={10}
              change={(right) => set({ right, checked: false })}
            />
            <Num
              label="Gözlem yüksekliği (cm)"
              value={Math.round(height * 100)}
              min={0}
              max={20}
              change={(height) => set({ height, checked: false })}
            />
          </>
        ) : (
          <>
            <Num
              label="Akım (A)"
              value={current}
              min={-10}
              max={10}
              change={(current) => set({ current, checked: false })}
            />
            {mode === "loop" ? (
              <>
                <Num
                  label="Halka yarıçapı (cm)"
                  value={Math.round(radius * 100)}
                  min={5}
                  max={30}
                  change={(radius) => set({ radius, checked: false })}
                />
                <Num
                  label="Yakın eş sarım sayısı"
                  value={turns}
                  min={1}
                  max={5}
                  change={(turns) => set({ turns, checked: false })}
                />
                <Num
                  label="Yay açısı (°)"
                  value={arc}
                  min={0}
                  max={360}
                  change={(arc) => set({ arc, checked: false })}
                />
              </>
            ) : (
              <>
                <Num
                  label="Bobin sarım sayısı"
                  value={solenoidTurns}
                  min={100}
                  max={1000}
                  change={(solenoidTurns) =>
                    set({ solenoidTurns, checked: false })
                  }
                />
                <Num
                  label="Bobin uzunluğu (cm)"
                  value={Math.round(solenoidLength * 100)}
                  min={50}
                  max={200}
                  change={(solenoidLength) =>
                    set({ solenoidLength, checked: false })
                  }
                />
              </>
            )}
          </>
        )}
      </div>
      <ScienceSvg
        title={
          mode === "wires"
            ? `Net alan ${fmt(wire.field.x * 1e6)} ve ${fmt(wire.field.y * 1e6)} mikrotesla.`
            : mode === "loop"
              ? `Merkezde yay katkısı ${fmt(loop.fieldZ * 1e6)} mikrotesla.`
              : `Bobin içinde alan ${fmt(coil.field * 1e3, 4)} militesla.`
        }
        kind={`magnetic-${mode}`}
        height={370}
      >
        {(w, marker) => {
          const cx = w / 2,
            cy = 210;
          if (mode === "wires") {
            const scale = Math.min((w - 85) / 0.2, 580),
              p = { x: cx, y: cy - height * scale },
              arrowScale = wire.magnitude === 0 ? 0 : 48 / wire.magnitude;
            return (
              <>
                <text x={25} y={30}>
                  +z: dışarı (•)
                </text>
                <text x={25} y={58}>
                  −z: içeri (×)
                </text>
                <path
                  className="physics019-axis"
                  d={`M25 ${cy}H${w - 25}M${cx} 90V325`}
                />
                {wires.map((wire, i) => {
                  const x = cx + wire.x * scale;
                  return (
                    <g key={i}>
                      <circle
                        data-wire-current={wire.current}
                        cx={x}
                        cy={cy}
                        r={15}
                        className="physics019-charge"
                      />
                      <text x={x} y={cy + 6} textAnchor="middle">
                        {wire.current > 0 ? "•" : wire.current < 0 ? "×" : "0"}
                      </text>
                    </g>
                  );
                })}
                <circle
                  data-magnetic-probe
                  data-world-y={height}
                  cx={p.x}
                  cy={p.y}
                  r={4}
                  className="physics019-selected"
                />
                <Arrow
                  name="B"
                  vector={wire.field}
                  origin={p}
                  scale={arrowScale}
                  marker={marker}
                  kind="physics019-normal"
                />
                <text x={p.x + 10} y={p.y + 27}>
                  P
                </text>
                <text x={w - 25} y={cy + 45} textAnchor="end">
                  x (m)
                </text>
                <text x={25} y={352}>
                  Teller: x = ±0,10 m
                </text>
              </>
            );
          }
          if (mode === "loop") {
            const scale = Math.min((w - 80) / 0.6, 310),
              R = radius * scale,
              start = { x: cx + R, y: cy },
              end = {
                x: cx + R * Math.cos((arc * Math.PI) / 180),
                y: cy - R * Math.sin((arc * Math.PI) / 180),
              };
            const d =
              arc === 360
                ? `M${cx + R} ${cy}A${R} ${R} 0 1 0 ${cx - R} ${cy}A${R} ${R} 0 1 0 ${cx + R} ${cy}`
                : `M${start.x} ${start.y}A${R} ${R} 0 ${arc > 180 ? 1 : 0} 0 ${end.x} ${end.y}`;
            return (
              <>
                <text x={25} y={30}>
                  +I: saatin tersi
                </text>
                <text x={25} y={58}>
                  Merkez: +z dışarı
                </text>
                {arc > 0 && (
                  <path
                    data-loop-arc
                    data-degrees={arc}
                    data-current={current}
                    data-radius={radius}
                    d={d}
                    className="physics019-curve"
                    markerEnd={current > 0 ? `url(#${marker})` : undefined}
                    markerStart={current < 0 ? `url(#${marker})` : undefined}
                  />
                )}
                <circle
                  data-loop-centre
                  data-field-z={loop.fieldZ}
                  cx={cx}
                  cy={cy}
                  r={13}
                  className="physics019-charge"
                />
                <text x={cx} y={cy + 6} textAnchor="middle">
                  {loop.fieldZ > 0 ? "•" : loop.fieldZ < 0 ? "×" : "0"}
                </text>
                <path
                  className="physics019-axis-guide"
                  d={`M${cx} ${cy}H${cx + R}`}
                />
                <text x={25} y={352}>
                  R = {fmt(radius)} m
                </text>
              </>
            );
          }
          const l = 35,
            r = w - 35,
            top = 135,
            bottom = 260,
            coilPath = Array.from({ length: 8 }, (_, i) => {
              const x = l + ((r - l) * (i + 0.5)) / 8;
              return `M${x} ${top}C${x - 13} ${top} ${x - 13} ${bottom} ${x} ${bottom}C${x + 13} ${bottom} ${x + 13} ${top} ${x} ${top}`;
            }).join(" ");
          return (
            <>
              <text x={25} y={30}>
                Uzun bobin: iç merkez
              </text>
              <text x={25} y={58}>
                +I → +x alan
              </text>
              <path
                data-solenoid
                data-turns={solenoidTurns}
                data-length={solenoidLength}
                d={coilPath}
                className="physics019-curve"
              />
              <Arrow
                name="B-axis"
                vector={{ x: Math.sign(coil.field), y: 0 }}
                origin={{ x: cx - Math.sign(coil.field) * 35, y: 198 }}
                scale={70}
                marker={marker}
              />
              <text x={r} y={302} textAnchor="end">
                +x
              </text>
              <text x={25} y={352}>
                N = {fmt(solenoidTurns)} sarım
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <Result>
        {mode === "wires" ? (
          <>
            <p>
              P = (0; {fmt(height)}) m. B = ({fmt(wire.field.x * 1e6, 4)};{" "}
              {fmt(wire.field.y * 1e6, 4)}) μT.
            </p>
            <p>
              Net büyüklük {fmt(wire.magnitude * 1e6, 4)} μT. Sol katkı (
              {fmt(wire.contributions[0].field.x * 1e6, 3)};{" "}
              {fmt(wire.contributions[0].field.y * 1e6, 3)}), sağ katkı (
              {fmt(wire.contributions[1].field.x * 1e6, 3)};{" "}
              {fmt(wire.contributions[1].field.y * 1e6, 3)}) μT.
            </p>
            <p>
              B = μ₀I/(2πr); pozitif akım sayfadan dışarı. Ok net yönü gösterir,
              çizim uzunluğu 48 px ile ölçeklenir.
            </p>
          </>
        ) : mode === "loop" ? (
          <>
            <p>
              Merkez B_z = {fmt(loop.fieldZ * 1e6, 4)} μT. Pozitif değer
              sayfadan dışarıdır.
            </p>
            <p>
              B_z = μ₀NI/(2R) × α/360.{" "}
              {arc === 360
                ? "Tam halka katkısı gösteriliyor."
                : "Yalnız seçili yay katkısı: radyal tellerin merkez katkısı sıfır, devrenin uzaktaki kısmının alanı ihmal ediliyor."}
            </p>
            <p>
              Bir eğri, {turns} yakın eş sarımı temsil eder; çizgi eni sarım
              sayısını vermez.
            </p>
          </>
        ) : (
          <>
            <p>
              n = N/L = {fmt(coil.density)} m⁻¹. İç B_x ≈{" "}
              {fmt(coil.field * 1e3, 5)} mT.
            </p>
            <p>
              B ≈ μ₀nI. Yarıçap yaklaşık 2 cm; uzunluk {fmt(solenoidLength)} m.
              Uçlardan uzak merkez, sık sarım ve hava çekirdek varsayılır.
            </p>
            <p>
              Çizimde 8 yay, seçili {fmt(solenoidTurns)} sarımı şematik temsil
              eder. Uç alanı veya gerçek bir bobinin ölçülmüş alan haritası
              çizilmez. Pozitif I için sağ el kuralıyla iç alan +x yönündedir.
            </p>
          </>
        )}
      </Result>
      <Compare
        question="Net alanın yönünü hangi tanım karşılar?"
        choices={["Sıfır", "Düzlem içi", "Pozitif eksen", "Negatif eksen"]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          {mode === "wires"
            ? "Her tel için sağ eli ayrı uygula, sonra P için bileşenleri topla."
            : "Akımın dolaşım yönü sağ el kuralıyla alan eksenini belirler; eksi akım alanı ters çevirir."}
        </p>
      </Compare>
    </Frame>
  );
}
export default function Forge019PhysicsLab({ lessonId }: { lessonId: string }) {
  switch (lessonId) {
    case "elektriksel-potansiyel-enerji":
      return <EnergyLab />;
    case "elektriksel-potansiyel":
      return <PotentialLab />;
    case "duzgun-alan-paralel-levhalar":
      return <PlateLab />;
    case "sigaclar-kondansatorler":
      return <CapacitorLab />;
    case "manyetik-alan-ayt":
      return <MagneticLab />;
    default:
      return null;
  }
}
