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
  rolling021,
  angular021,
  gravity021,
  kepler021,
  type Body021,
} from "./forge021Physics";
type Point021 = { x: number; y: number };
import "./forge021Physics.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(n) < 0.5 * 10 ** -digits ? 0 : n,
  );
const integer = (n: number, lo: number, hi: number, fallback: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(n) ? n : fallback)));
const exploration = (id: string) => `forge021-physics-${id}`;
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
    <fieldset className="physics021-compare">
      <legend>{question}</legend>
      <div className="physics021-guesses">
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
        <div className="physics021-feedback" role="status">
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
    <section data-forge021={id} className="physics021-lab">
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
    <div className="physics021-select">
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
      data-physics021-plot={kind}
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
  kind = "physics021-external",
}: {
  name: string;
  vector: Point021;
  origin: Point021;
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
      className={`physics021-force ${kind}`}
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
    <div data-model-result className="physics021-result">
      {children}
    </div>
  );
}

function RollingLab() {
  const id = "donerek-oteleme-hareketi";
  const [v, set] = useExploration(exploration(id), {
    mass: 2,
    radius: 40,
    velocity: 2,
    omega: -5,
    mode: "noslip",
    body: "disk",
    initial: 90,
    time: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const change = (next: Partial<typeof v>) => set({ ...next, checked: false });
  const mass = integer(v.mass, 1, 10, 2),
    radius = integer(v.radius, 10, 100, 40) / 100,
    velocity = integer(v.velocity, -5, 5, 2),
    mode = v.mode === "free" ? "free" : "noslip",
    body: Body021 = v.body === "hoop" || v.body === "sphere" ? v.body : "disk";
  const omega =
      mode === "noslip" ? -velocity / radius : integer(v.omega, -20, 20, -5),
    time = integer(v.time, 0, 100, 0) / 10,
    initial = integer(v.initial, 0, 360, 90);
  const m = rolling021(mass, radius, velocity, omega, body, time, initial),
    expected = m.noSlip ? "Yok" : m.contactSpeed > 0 ? "Sağa" : "Sola";
  return (
    <Frame
      id={id}
      title="Tekerin hızlarını ayır"
      intro="Duran düz zemin; +x sağa, +y yukarı, pozitif ω saat yönünün tersi. Sabit v ve ω seçilir. Kayma seçimi bir kuvvet çözümü değildir; sonraki sürtünmeli hareketi öngörmez."
    >
      <Select
        label="Temas modeli"
        value={mode}
        onChange={(mode) => change({ mode })}
        options={[
          ["noslip", "Kayma yok"],
          ["free", "v ve ω ayrı"],
        ]}
      />
      <Select
        label="Cisim"
        value={body}
        onChange={(body) => change({ body })}
        options={[
          ["disk", "Dolu disk"],
          ["hoop", "İnce halka"],
          ["sphere", "Dolu küre"],
        ]}
      />
      <div className="physics021-controls">
        <Num
          label="Kütle (kg)"
          value={mass}
          min={1}
          max={10}
          change={(mass) => change({ mass })}
        />
        <Num
          label="Yarıçap (cm)"
          value={Math.round(radius * 100)}
          min={10}
          max={100}
          change={(radius) => change({ radius })}
        />
        <Num
          label="Merkez vx (m/s)"
          value={velocity}
          min={-5}
          max={5}
          change={(velocity) => change({ velocity })}
        />
        {mode === "free" && (
          <Num
            label="ω (rad/s)"
            value={omega}
            min={-20}
            max={20}
            change={(omega) => change({ omega })}
          />
        )}
        <Num
          label="İlk açı (°)"
          value={initial}
          min={0}
          max={360}
          change={(initial) => change({ initial })}
        />
        <Num
          label="Zaman (0,1 s)"
          value={Math.round(time * 10)}
          min={0}
          max={100}
          change={(time) => change({ time })}
        />
      </div>
      <figure className="physics021-figure">
        <figcaption>
          Gerçek P noktası; kadraj merkezle birlikte gider
        </figcaption>
        <ScienceSvg
          title={`P yere göre x ${fmt(m.point.x)} metre, y ${fmt(m.point.y)} metre; temas hızı ${fmt(m.contactSpeed)} metre bölü saniye.`}
          kind="rolling-wheel"
          height={260}
        >
          {(width) => {
            const scale = Math.min(72, (width - 64) / 2) / radius,
              cx = width / 2,
              cy = 124,
              r = radius * scale,
              px = cx + m.relative.x * scale,
              py = cy - m.relative.y * scale;
            return (
              <>
                <line
                  x1={20}
                  y1={cy + r}
                  x2={width - 20}
                  y2={cy + r}
                  className="physics021-axis"
                />
                <circle cx={cx} cy={cy} r={r} className="physics021-body" />
                <line
                  x1={cx}
                  y1={cy}
                  x2={px}
                  y2={py}
                  className="physics021-axis"
                />
                <circle cx={cx} cy={cy} r={4} className="physics021-selected" />
                <circle
                  data-material-point
                  data-x={m.point.x}
                  data-y={m.point.y}
                  data-radius={radius}
                  data-scale={scale}
                  cx={px}
                  cy={py}
                  r={7}
                  className="physics021-selected"
                />
                <text x={cx - 20} y={cy + 24}>
                  O
                </text>
                <text
                  x={px + (18 * m.relative.x) / radius}
                  y={py - (18 * m.relative.y) / radius + 6}
                  textAnchor={
                    m.relative.x > 1e-8
                      ? "start"
                      : m.relative.x < -1e-8
                        ? "end"
                        : "middle"
                  }
                >
                  P
                </text>
                <text x={20} y={236}>
                  +x →
                </text>
                <text x={width - 20} y={236} textAnchor="end">
                  Zemin
                </text>
              </>
            );
          }}
        </ScienceSvg>
        <p className="small muted">
          O merkezdir. P boya izidir. Bu çizimde uzunluk ölçeği R’ye göre
          seçilir; hız okları aşağıda ayrı ölçekte verilir.
        </p>
      </figure>
      <figure className="physics021-figure">
        <figcaption>Aynı noktada üç hız; ortak ok ölçeği</figcaption>
        <ScienceSvg
          title={`Öteleme ${fmt(velocity)}, sıfır y; dönme ${fmt(m.spin.x)}, ${fmt(m.spin.y)}; toplam ${fmt(m.ground.x)}, ${fmt(m.ground.y)} metre bölü saniye.`}
          kind="rolling-velocity"
          height={320}
        >
          {(width, marker) => {
            const max = Math.max(
                1,
                Math.abs(velocity),
                Math.hypot(m.spin.x, m.spin.y),
                m.speed,
              ),
              scale = Math.min(75, (width - 64) / 2) / max;
            return [
              {
                name: "translation",
                label: "Öteleme",
                vector: { x: velocity, y: 0 },
                kind: "physics021-external",
              },
              {
                name: "spin",
                label: "Dönme",
                vector: m.spin,
                kind: "physics021-normal",
              },
              {
                name: "ground",
                label: "Yere göre",
                vector: m.ground,
                kind: "physics021-friction",
              },
            ].map((a, i) => (
              <g key={a.name}>
                <text x={16} y={26 + i * 100}>
                  {a.label}
                </text>
                <Arrow
                  name={a.name}
                  vector={a.vector}
                  origin={{ x: width / 2, y: 62 + i * 100 }}
                  scale={scale}
                  marker={marker}
                  kind={a.kind}
                />
              </g>
            ));
          }}
        </ScienceSvg>
      </figure>
      <Result>
        <p>
          t = {fmt(time)} s; ω = {fmt(omega)} rad/s.
        </p>
        <p>
          Merkez: ({fmt(m.centre.x)}; {fmt(m.centre.y)}) m. P: ({fmt(m.point.x)}
          ; {fmt(m.point.y)}) m.
        </p>
        <p>
          Dönme hızı: ({fmt(m.spin.x)}; {fmt(m.spin.y)}) m/s.
        </p>
        <p>
          Yere göre hız:{" "}
          <strong>
            ({fmt(m.ground.x)}; {fmt(m.ground.y)}) m/s
          </strong>
          ; sürat {fmt(m.speed)} m/s.
        </p>
        <p>
          Temas vx = v + ωR = <strong>{fmt(m.contactSpeed)} m/s</strong>.{" "}
          {m.noSlip ? "Anlık kayma yok." : "Temas kayıyor."}
        </p>
        <p>
          I = {fmt(m.inertia, 4)} kg·m². K_ö = {fmt(m.translationEnergy)} J; K_d
          = {fmt(m.rotationEnergy)} J; toplam K ={" "}
          <strong>{fmt(m.energy)} J</strong>.
        </p>
      </Result>
      <Compare
        question="Alt temasın yere göre kayma yönü?"
        choices={["Yok", "Sağa", "Sola"]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          v + ωR = {fmt(m.contactSpeed)} m/s. Yalnız bu fark sıfırsa duran
          zeminde kayma yoktur.
        </p>
      </Compare>
    </Frame>
  );
}

function AngularLab() {
  const id = "acisal-momentum";
  const [v, set] = useExploration(exploration(id), {
    core: 1,
    mass: 1,
    first: 200,
    last: 100,
    omega: 2,
    impulse: 0,
    phase: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const change = (next: Partial<typeof v>) => set({ ...next, checked: false });
  const core = integer(v.core, 1, 10, 1),
    mass = integer(v.mass, 1, 5, 1),
    first = integer(v.first, 10, 300, 200),
    last = integer(v.last, 10, 300, 100),
    omega = integer(v.omega, -10, 10, 2),
    impulse = integer(v.impulse, -20, 20, 0),
    phase = integer(v.phase, 0, 360, 0);
  const m = angular021(
      core,
      mass,
      first / 100,
      last / 100,
      omega,
      impulse,
      phase,
    ),
    expected = impulse > 0 ? "Pozitif" : impulse < 0 ? "Negatif" : "Sıfır";
  return (
    <Frame
      id={id}
      title="Kütleyi içeri al, L’yi izle"
      intro="Sabit simetri ekseni; iki eş noktasal kütle ve I değeri sabit merkez gövde. İlk ve son hâli gör. Her iki hâlde ortak ω vardır; radyal hız sıfırdır. Dış açısal itme J = ∫τ dt. Açı seçimi geçişin süresi değildir."
    >
      <div className="physics021-controls">
        <Num
          label="Gövde I (kg·m²)"
          value={core}
          min={1}
          max={10}
          change={(core) => change({ core })}
        />
        <Num
          label="Bir kütle (kg)"
          value={mass}
          min={1}
          max={5}
          change={(mass) => change({ mass })}
        />
        <Num
          label="İlk r (cm)"
          value={first}
          min={10}
          max={300}
          change={(first) => change({ first })}
        />
        <Num
          label="Son r (cm)"
          value={last}
          min={10}
          max={300}
          change={(last) => change({ last })}
        />
        <Num
          label="İlk ω (rad/s)"
          value={omega}
          min={-10}
          max={10}
          change={(omega) => change({ omega })}
        />
        <Num
          label="Dış J (N·m·s)"
          value={impulse}
          min={-20}
          max={20}
          change={(impulse) => change({ impulse })}
        />
        <Num
          label="Son açı (°)"
          value={phase}
          min={0}
          max={360}
          change={(phase) => change({ phase })}
        />
      </div>
      <figure className="physics021-figure">
        <figcaption>Son kütle dağılımı; kesik halka ilk yarıçaptır</figcaption>
        <ScienceSvg
          title={`İlk I ${fmt(m.initialInertia)}, son I ${fmt(m.finalInertia)} kilogram metre kare; son Lz ${fmt(m.finalL)}, son omega ${fmt(m.finalOmega)} radyan bölü saniye.`}
          kind="angular-distribution"
          height={330}
        >
          {(width, marker) => {
            const centre = { x: width / 2, y: 158 },
              scale =
                Math.min(94, (width - 70) / 2) /
                Math.max(m.initialRadius, m.finalRadius),
              speed = Math.max(
                1,
                ...m.velocities.map((a) => Math.hypot(a.x, a.y)),
              ),
              arrowScale = 30 / speed;
            return (
              <>
                <text x={16} y={27}>
                  {m.finalL > 0 ? "+z ⊙" : m.finalL < 0 ? "−z ⊗" : "Lz = 0"}
                </text>
                <circle
                  cx={centre.x}
                  cy={centre.y}
                  r={m.initialRadius * scale}
                  className="physics021-ghost"
                />
                <circle
                  cx={centre.x}
                  cy={centre.y}
                  r={20}
                  className="physics021-body"
                />
                <text x={centre.x} y={centre.y + 6} textAnchor="middle">
                  O
                </text>
                {m.points.map((a, i) => {
                  const p = {
                    x: centre.x + a.x * scale,
                    y: centre.y - a.y * scale,
                  };
                  return (
                    <g key={i}>
                      <line
                        x1={centre.x}
                        y1={centre.y}
                        x2={p.x}
                        y2={p.y}
                        className="physics021-axis"
                      />
                      <Arrow
                        name={`mass-${i}-velocity`}
                        vector={m.velocities[i]}
                        origin={p}
                        scale={arrowScale}
                        marker={marker}
                      />
                      <circle
                        data-angular-mass={i}
                        data-x={a.x}
                        data-y={a.y}
                        data-scale={scale}
                        data-origin-x={centre.x}
                        data-origin-y={centre.y}
                        cx={p.x}
                        cy={p.y}
                        r={8}
                        className="physics021-selected"
                      />
                      <text
                        x={p.x + (20 * a.x) / m.finalRadius}
                        y={p.y - (20 * a.y) / m.finalRadius + 6}
                        textAnchor={
                          a.x > 1e-8 ? "start" : a.x < -1e-8 ? "end" : "middle"
                        }
                      >
                        {i === 0 ? "A" : "B"}
                      </text>
                    </g>
                  );
                })}
                <text x={16} y={316}>
                  +x → ; +y ↑
                </text>
              </>
            );
          }}
        </ScienceSvg>
        <p className="small muted">
          Nokta: dışarı (+z). Çarpı: içeri (−z). Oklar son teğet hızdır. Kütle
          konumu ile hızın ölçeği ayrıdır.
        </p>
      </figure>
      <Result>
        <p>
          I_ilk = {fmt(m.initialInertia)}; I_son ={" "}
          <strong>{fmt(m.finalInertia)} kg·m²</strong>.
        </p>
        <p>
          L_ilk = {fmt(m.initialL)}; L_son ={" "}
          <strong>{fmt(m.finalL)} kg·m²/s</strong>. ΔL = J = {fmt(impulse)}{" "}
          N·m·s.
        </p>
        <p>
          ω_son = L_son / I_son = <strong>{fmt(m.finalOmega, 4)} rad/s</strong>.
        </p>
        <p>
          K_ilk = {fmt(m.initialEnergy)}; K_son ={" "}
          <strong>{fmt(m.finalEnergy)} J</strong>.
        </p>
        <p>
          Net enerji aktarımı ΔK = <strong>{fmt(m.netWork)} J</strong>. Bu fark
          iç ve dış süreçlerin toplam işidir; tek başına J’den dış iş ayrılmaz.
        </p>
      </Result>
      <Compare
        question="Lz son − Lz ilk farkının işareti?"
        choices={["Pozitif", "Negatif", "Sıfır"]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          Toplam L farkı {fmt(impulse)} N·m·s. J = 0 ise toplam L sabit; I
          değişse de bu sonuç değişmez.
        </p>
      </Compare>
    </Frame>
  );
}

function GravityLab() {
  const id = "newton-genel-cekim-yasasi";
  const [v, set] = useExploration(exploration(id), {
    planet: 6,
    radius: 6,
    distance: 100,
    mass: 2,
    guess: "",
    reason: "",
    checked: false,
  });
  const change = (next: Partial<typeof v>) => set({ ...next, checked: false });
  const planet = integer(v.planet, 1, 10, 6),
    radius = integer(v.radius, 1, 10, 6),
    ratio = integer(v.distance, 0, 300, 100) / 100,
    mass = integer(v.mass, 1, 10, 2);
  const m = gravity021(planet * 1e24, radius * 1e6, ratio * radius * 1e6, mass),
    normalized = ratio < 1 ? ratio : 1 / (ratio * ratio),
    expected = ratio === 1 ? "Eşit" : "Daha az";
  return (
    <Frame
      id={id}
      title="Kürenin içinden uzaya"
      intro="Dönmeyen, homojen küre; deney kütlesi alanı değiştirmez. G = 6,67×10⁻¹¹ N·m²/kg². Küre gerçek Dünya’nın katmanlı iç yapısı değildir. r merkezden, R yüzeyden değil yarıçap olarak ölçülür."
    >
      <div className="physics021-controls">
        <Num
          label="M (10²⁴ kg)"
          value={planet}
          min={1}
          max={10}
          change={(planet) => change({ planet })}
        />
        <Num
          label="R (10⁶ m)"
          value={radius}
          min={1}
          max={10}
          change={(radius) => change({ radius })}
        />
        <Num
          label="r (% R)"
          value={Math.round(ratio * 100)}
          min={0}
          max={300}
          change={(distance) => change({ distance })}
        />
        <Num
          label="Deney m (kg)"
          value={mass}
          min={1}
          max={10}
          change={(mass) => change({ mass })}
        />
      </div>
      <figure className="physics021-figure">
        <figcaption>O küre merkezi; P deney kütlesi</figcaption>
        <ScienceSvg
          title={`P merkezden ${fmt(ratio)} R uzakta; iç kütle oranı ${fmt(m.enclosedMass / m.planetMass, 3)}; alan merkez yönlü.`}
          kind="gravity-sphere"
          height={225}
        >
          {(width) => {
            const R = Math.min(65, (width - 70) / 4),
              cx = R + 22,
              cy = 105,
              px = cx + ratio * R;
            return (
              <>
                <circle
                  data-planet-r={R}
                  cx={cx}
                  cy={cy}
                  r={R}
                  className="physics021-body"
                />
                {ratio > 0 && ratio < 1 && (
                  <circle
                    data-enclosed-r={ratio * R}
                    cx={cx}
                    cy={cy}
                    r={ratio * R}
                    className="physics021-ghost"
                  />
                )}
                <line
                  x1={cx}
                  y1={cy}
                  x2={width - 20}
                  y2={cy}
                  className="physics021-axis"
                />
                <circle cx={cx} cy={cy} r={3} className="physics021-selected" />
                <circle
                  data-probe
                  data-ratio={ratio}
                  data-origin={cx}
                  data-unit={R}
                  cx={px}
                  cy={cy}
                  r={7}
                  className="physics021-selected"
                />
                <text x={cx} y={cy + 27} textAnchor="middle">
                  O
                </text>
                <text x={px} y={cy - 20} textAnchor="middle">
                  P
                </text>
                <text x={16} y={204}>
                  r/R = {fmt(ratio)}
                </text>
                <text x={width - 16} y={204} textAnchor="end">
                  +x →
                </text>
              </>
            );
          }}
        </ScienceSvg>
      </figure>
      <figure className="physics021-figure">
        <figcaption>Alan büyüklüğü / yüzey alanı</figcaption>
        <ScienceSvg
          title={`g bölü yüzey g, r bölü R grafiği. Seçili ${fmt(ratio)} R noktasında oran ${fmt(normalized, 4)}.`}
          kind="gravity-field"
          height={290}
        >
          {(width) => {
            const left = 43,
              right = width - 24,
              top = 45,
              bottom = 232,
              X = (x: number) => left + ((right - left) * x) / 3,
              Y = (g: number) => bottom - (bottom - top) * g;
            const points = Array.from({ length: 181 }, (_, i) => {
              const x = i / 60,
                g = x < 1 ? x : 1 / (x * x);
              return `${X(x)},${Y(g)}`;
            }).join(" ");
            return (
              <>
                <text x={14} y={25}>
                  g/g₀
                </text>
                <polyline
                  data-field-curve
                  points={points}
                  className="physics021-curve physics021-normal"
                />
                <line
                  x1={left}
                  y1={bottom}
                  x2={right}
                  y2={bottom}
                  className="physics021-axis"
                />
                <line
                  x1={left}
                  y1={bottom}
                  x2={left}
                  y2={top}
                  className="physics021-axis"
                />
                {[0, 1, 2, 3].map((x) => (
                  <g key={x}>
                    <line
                      x1={X(x)}
                      y1={bottom}
                      x2={X(x)}
                      y2={bottom + 5}
                      className="physics021-axis"
                    />
                    <text x={X(x)} y={bottom + 25} textAnchor="middle">
                      {x}
                    </text>
                  </g>
                ))}
                <text x={left - 11} y={top + 6} textAnchor="end">
                  1
                </text>
                <text x={right} y={282} textAnchor="end">
                  r/R
                </text>
                <circle
                  data-field-point
                  data-ratio={ratio}
                  data-g={normalized}
                  data-x-min={left}
                  data-x-max={right}
                  data-y-top={top}
                  data-y-bottom={bottom}
                  cx={X(ratio)}
                  cy={Y(normalized)}
                  r={6}
                  className="physics021-selected"
                />
              </>
            );
          }}
        </ScienceSvg>
      </figure>
      <Result>
        <p>
          r = {fmt(m.distance / 1e6)} ×10⁶ m;{" "}
          {ratio < 1 ? "kürenin içi" : ratio === 1 ? "yüzey" : "kürenin dışı"}.
        </p>
        <p>
          İç kütle / M = {fmt(m.enclosedMass / m.planetMass, 4)}. Yüzey g₀ ={" "}
          {fmt(m.surfaceGravity)} N/kg.
        </p>
        <p>
          g_x = <strong>{fmt(m.field, 4)} N/kg</strong>; |g| / g₀ ={" "}
          <strong>{fmt(normalized, 4)}</strong>.
        </p>
        <p>
          Deney kütlesine F_x = <strong>{fmt(m.force, 4)} N</strong>; küreye
          tepki = {fmt(m.reaction, 4)} N. Kuvvetler ayrı cisimlere etki eder.
        </p>
        <p>
          φ = {fmt(m.potential / 1e6, 4)} ×10⁶ J/kg; U ={" "}
          {fmt(m.potentialEnergy / 1e6, 4)} ×10⁶ J. Sonsuzda sıfır seçilir.
        </p>
        {m.circularSpeed !== null ? (
          <p>
            Aynı dış r’de ideal dairesel hız {fmt(m.circularSpeed)} m/s; T ={" "}
            {fmt(m.period!)} s. Kaçış sürati {fmt(m.escapeSpeed!)} m/s. P
            noktası bu çizimde yörüngede hareket ettirilmez.
          </p>
        ) : (
          <p>
            İç nokta için dış uydu formülü geçmez. Homojen iç alan doğrusal
            değişir.
          </p>
        )}
      </Result>
      <Compare
        question="|g|, yüzeydeki g₀’a göre?"
        choices={["Eşit", "Daha az"]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          |g|/g₀ = {fmt(normalized, 4)}. İçte oran r/R, dışta (R/r)². Yüzeyde
          ikisi de 1 olur.
        </p>
      </Compare>
    </Frame>
  );
}

function KeplerLab() {
  const id = "kepler-yasalari";
  const [v, set] = useExploration(exploration(id), {
    axis: 4,
    eccentric: 50,
    mu: 4,
    phase: 0,
    window: 10,
    guess: "",
    reason: "",
    checked: false,
  });
  const change = (next: Partial<typeof v>) => set({ ...next, checked: false });
  const axis = integer(v.axis, 1, 10, 4),
    eccentric = integer(v.eccentric, 0, 85, 50),
    mu = integer(v.mu, 1, 20, 4),
    phase = integer(v.phase, 0, 100, 0),
    window = integer(v.window, 1, 25, 10),
    m = kepler021(
      axis * 1e7,
      eccentric / 100,
      mu * 1e14,
      phase / 100,
      window / 100,
    ),
    expected = eccentric === 0 ? "Eşit" : "Fazla";
  return (
    <Frame
      id={id}
      title="Elipste eşit zaman, eşit alan"
      intro="Baskın sabit merkezî kütle, küçük yörünge cismi; yalnız ters kare çekim. μ = GM. Verilen sayılar örnek yörünge içindir, güncel bir gezegen konumu değildir. Zamanı sürgüyle adımla."
    >
      <div className="physics021-controls">
        <Num
          label="a (10⁷ m)"
          value={axis}
          min={1}
          max={10}
          change={(axis) => change({ axis })}
        />
        <Num
          label="e (% 1)"
          value={eccentric}
          min={0}
          max={85}
          change={(eccentric) => change({ eccentric })}
        />
        <Num
          label="μ (10¹⁴ m³/s²)"
          value={mu}
          min={1}
          max={20}
          change={(mu) => change({ mu })}
        />
        <Num
          label="Zaman (% T)"
          value={phase}
          min={0}
          max={100}
          change={(phase) => change({ phase })}
        />
        <Num
          label="Aralık (% T)"
          value={window}
          min={1}
          max={25}
          change={(window) => change({ window })}
        />
      </div>
      <figure className="physics021-figure">
        <figcaption>
          S yıldız odağı; P gezegen. İki sektörün süresi eşit
        </figcaption>
        <ScienceSvg
          title={`Elips e ${fmt(m.eccentricity)}. İki eşit ${fmt(m.windowTime)} saniye aralığı, aynı ${fmt(m.sweptArea / 1e14, 4)} çarpı on üzeri on dört metre kare alan tarar.`}
          kind="kepler-ellipse"
          height={340}
        >
          {(width, marker) => {
            const scale = Math.min((width - 64) / (2 * m.semimajor), 102 / m.b),
              origin = {
                x: width / 2 + m.semimajor * m.eccentricity * scale,
                y: 170,
              },
              X = (p: Point021) => origin.x + p.x * scale,
              Y = (p: Point021) => origin.y - p.y * scale,
              vertex = (p: Point021) => `${X(p)},${Y(p)}`,
              pp = { x: X(m.position), y: Y(m.position) };
            const vmax = Math.sqrt(
                ((m.mu / m.semimajor) * (1 + m.eccentricity)) /
                  (1 - m.eccentricity),
              ),
              amax = m.mu / m.periapsis ** 2;
            return (
              <>
                <polygon
                  data-sector="A"
                  data-window={m.windowTime}
                  data-area={m.sweptArea}
                  points={`${origin.x},${origin.y} ${m.sectorA.map(vertex).join(" ")}`}
                  className="physics021-sector-a"
                />
                <polygon
                  data-sector="B"
                  data-window={m.windowTime}
                  data-area={m.sweptArea}
                  points={`${origin.x},${origin.y} ${m.sectorB.map(vertex).join(" ")}`}
                  className="physics021-sector-b"
                />
                <polyline
                  data-orbit
                  data-scale={scale}
                  data-origin-x={origin.x}
                  data-origin-y={origin.y}
                  points={m.orbit.map(vertex).join(" ")}
                  className="physics021-curve physics021-normal"
                />
                <line
                  x1={origin.x}
                  y1={origin.y}
                  x2={pp.x}
                  y2={pp.y}
                  className="physics021-axis"
                />
                <circle
                  data-star
                  cx={origin.x}
                  cy={origin.y}
                  r={7}
                  className="physics021-star"
                />
                <text x={origin.x} y={origin.y + 27} textAnchor="middle">
                  S
                </text>
                <Arrow
                  name="orbit-velocity"
                  vector={m.velocity}
                  origin={pp}
                  scale={38 / vmax}
                  marker={marker}
                />
                <Arrow
                  name="orbit-acceleration"
                  vector={m.acceleration}
                  origin={pp}
                  scale={32 / amax}
                  marker={marker}
                  kind="physics021-friction"
                />
                <circle
                  data-orbit-body
                  data-x={m.position.x}
                  data-y={m.position.y}
                  data-scale={scale}
                  data-origin-x={origin.x}
                  data-origin-y={origin.y}
                  cx={pp.x}
                  cy={pp.y}
                  r={6}
                  className="physics021-selected"
                />
                <text
                  x={pp.x + (16 * m.position.x) / m.radius}
                  y={pp.y - (18 * m.position.y) / m.radius + 6}
                  textAnchor={
                    m.position.x > 1e-8
                      ? "start"
                      : m.position.x < -1e-8
                        ? "end"
                        : "middle"
                  }
                >
                  P
                </text>
                <text x={16} y={28}>
                  +x → ; +y ↑
                </text>
                <text x={16} y={315}>
                  A = B
                </text>
              </>
            );
          }}
        </ScienceSvg>
        <p className="small muted">
          Mavi ok: hız (m/s). Yeşil ok: çekim ivmesi (m/s²). Ok ölçekleri
          ayrıdır; her biri kendi en büyük değerine göre çizilir. Sektör yayları
          48 parçayla çizilir; alan aşağıda tam bağıntıyla verilir.
        </p>
      </figure>
      <Result>
        <p>
          a = {fmt(m.semimajor / 1e7)} ×10⁷ m; e = {fmt(m.eccentricity)}. Yakın
          r = {fmt(m.periapsis / 1e7)}; uzak r = {fmt(m.apoapsis / 1e7)} ×10⁷ m.
        </p>
        <p>
          T = <strong>{fmt(m.period)} s</strong>; t = {fmt(m.time)} s. E − e sin
          E = M = {fmt(m.mean, 4)} rad.
        </p>
        <p>
          P konumu:{" "}
          <strong>
            ({fmt(m.position.x / 1e7, 4)}; {fmt(m.position.y / 1e7, 4)}) ×10⁷ m
          </strong>
          ; r = {fmt(m.radius / 1e7, 4)} ×10⁷ m.
        </p>
        <p>
          Hız: ({fmt(m.velocity.x)}; {fmt(m.velocity.y)}) m/s; sürat{" "}
          <strong>{fmt(m.speed)} m/s</strong>.
        </p>
        <p>
          İvme: ({fmt(m.acceleration.x, 4)}; {fmt(m.acceleration.y, 4)}) m/s².
        </p>
        <p>
          Her sektör süresi Δt = {fmt(m.windowTime)} s. A = B ={" "}
          <strong>{fmt(m.sweptArea / 1e14, 4)} ×10¹⁴ m²</strong>.
        </p>
        <p>
          Alan hızı = {fmt(m.areaRate / 1e10, 4)} ×10¹⁰ m²/s. Özgül E ={" "}
          <strong>{fmt(m.specificEnergy / 1e6, 4)} ×10⁶ J/kg</strong>.
        </p>
      </Result>
      <Compare
        question="Yakın uç sürati, uzak uçtan?"
        choices={["Fazla", "Eşit"]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          e = {fmt(m.eccentricity)}.{" "}
          {eccentric === 0
            ? "Çemberde r ve sürat sabittir."
            : `Uçlarda v_yakın / v_uzak = (1+e)/(1−e) = ${fmt((1 + m.eccentricity) / (1 - m.eccentricity), 4)}.`}
        </p>
      </Compare>
    </Frame>
  );
}

export default function Forge021PhysicsLab({ lessonId }: { lessonId: string }) {
  switch (lessonId) {
    case "donerek-oteleme-hareketi":
      return <RollingLab />;
    case "acisal-momentum":
      return <AngularLab />;
    case "newton-genel-cekim-yasasi":
      return <GravityLab />;
    case "kepler-yasalari":
      return <KeplerLab />;
    default:
      return null;
  }
}
