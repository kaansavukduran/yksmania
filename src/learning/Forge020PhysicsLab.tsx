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
  magneticMotion020,
  inductionRod020,
  seriesRlc020,
  transformer020,
  circular020,
} from "./forge020Physics";
type Point020 = { x: number; y: number };
import "./forge020Physics.css";
const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(n) < 0.5 * 10 ** -digits ? 0 : n,
  );
const integer = (n: number, lo: number, hi: number, fallback: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(n) ? n : fallback)));
const exploration = (id: string) => `forge020-physics-${id}`;
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
    <fieldset className="physics020-compare">
      <legend>{question}</legend>
      <div className="physics020-guesses">
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
        <div className="physics020-feedback" role="status">
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
    <section data-forge020={id} className="physics020-lab">
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
    <div className="physics020-select">
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
      data-physics020-plot={kind}
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
  kind = "physics020-external",
}: {
  name: string;
  vector: Point020;
  origin: Point020;
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
      className={`physics020-force ${kind}`}
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
    <div data-model-result className="physics020-result">
      {children}
    </div>
  );
}
function MagneticLab() {
  const id = "manyetik-kuvvet",
    [v, set] = useExploration(exploration(id), {
      mass: 1,
      micro: 2,
      field: 5,
      vx: 4,
      vy: 0,
      time: 10,
      guess: "",
      reason: "",
      checked: false,
    });
  const mass = integer(v.mass, 1, 20, 1) * 1e-6,
    micro = integer(v.micro, -5, 5, 2),
    field = integer(v.field, -10, 10, 5) / 10,
    vx = integer(v.vx, -10, 10, 4),
    vy = integer(v.vy, -10, 10, 0),
    time = integer(v.time, 0, 100, 10) / 10,
    m = magneticMotion020(mass, micro, field, vx, vy, time),
    initial = magneticMotion020(mass, micro, field, vx, vy, 0);
  const fx = initial.force.x,
    fy = initial.force.y,
    expected =
      fx === 0 && fy === 0
        ? "Sapma yok"
        : fx !== 0 && fy !== 0
          ? "İki eksenli"
          : fy > 0
            ? "Yukarı"
            : fy < 0
              ? "Aşağı"
              : fx > 0
                ? "Sağa"
                : "Sola";
  const samples = Array.from({ length: 121 }, (_, i) =>
    magneticMotion020(mass, micro, field, vx, vy, (time * i) / 120),
  );
  return (
    <Frame
      id={id}
      title="Yükü ters çevir, sapmayı izle"
      intro="Örnek noktasal tanecik, sabit düzgün Bz alanı ve yalnız manyetik kuvvet. Başlangıç (0; 0), v_z = 0. Verilen mg/μC sayıları gerçek elektron değeri değildir."
    >
      <div className="physics020-controls">
        <Num
          label="Kütle (mg)"
          value={Math.round(mass * 1e6)}
          min={1}
          max={20}
          change={(mass) => set({ mass, checked: false })}
        />
        <Num
          label="Yük (μC)"
          value={micro}
          min={-5}
          max={5}
          change={(micro) => set({ micro, checked: false })}
        />
        <Num
          label="Bz (0,1 T)"
          value={Math.round(field * 10)}
          min={-10}
          max={10}
          change={(field) => set({ field, checked: false })}
        />
        <Num
          label="İlk vx (m/s)"
          value={vx}
          min={-10}
          max={10}
          change={(vx) => set({ vx, checked: false })}
        />
        <Num
          label="İlk vy (m/s)"
          value={vy}
          min={-10}
          max={10}
          change={(vy) => set({ vy, checked: false })}
        />
        <Num
          label="Zaman (0,1 s)"
          value={Math.round(time * 10)}
          min={0}
          max={100}
          change={(time) => set({ time, checked: false })}
        />
      </div>
      <div className="physics020-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => set({ time: 0, checked: false })}
        >
          Başa dön
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() =>
            set({
              time: Math.min(100, Math.round(time * 10) + 5),
              checked: false,
            })
          }
        >
          0,5 s ilerle
        </button>
      </div>
      <ScienceSvg
        title={`Konum ${fmt(m.x, 4)} ve ${fmt(m.y, 4)} metre. Saf manyetik kuvvet, sürat ${fmt(m.speed, 4)} metre bölü saniye.`}
        kind="magnetic-motion"
        height={385}
      >
        {(w, marker) => {
          const minX = Math.min(-0.5, ...samples.map((s) => s.x)),
            maxX = Math.max(0.5, ...samples.map((s) => s.x)),
            minY = Math.min(-0.5, ...samples.map((s) => s.y)),
            maxY = Math.max(0.5, ...samples.map((s) => s.y)),
            scale = Math.min((w - 110) / (maxX - minX), 190 / (maxY - minY)),
            px = (x: number) => w / 2 + (x - (minX + maxX) / 2) * scale,
            py = (y: number) => 190 - (y - (minY + maxY) / 2) * scale,
            p = { x: px(m.x), y: py(m.y) },
            fs = Math.hypot(m.force.x, m.force.y);
          return (
            <>
              <path
                className="physics020-axis"
                d={`M25 ${py(0)}H${w - 25}M${px(0)} 60V320`}
              />
              <text x={25} y={30}>
                y (m)
              </text>
              <text x={w - 25} y={365} textAnchor="end">
                x (m)
              </text>
              <polyline
                data-charge-path
                data-time={time}
                data-scale={scale}
                points={samples.map((s) => `${px(s.x)},${py(s.y)}`).join(" ")}
                className="physics020-travelled"
              />
              <circle
                data-charge-start
                cx={px(0)}
                cy={py(0)}
                r={7}
                className="physics020-initial"
              />
              <circle
                data-charge-position
                data-x={m.x}
                data-y={m.y}
                cx={p.x}
                cy={p.y}
                r={4}
                className="physics020-selected"
              />
              <Arrow
                name="velocity"
                vector={m.velocity}
                origin={p}
                scale={m.speed > 0 ? 35 / m.speed : 0}
                marker={marker}
                kind="physics020-normal"
              />
              <Arrow
                name="magnetic-force"
                vector={m.force}
                origin={p}
                scale={fs > 0 ? 35 / fs : 0}
                marker={marker}
              />
            </>
          );
        }}
      </ScienceSvg>
      <p className="small muted">
        Halka başlangıç, dolu nokta seçili an. Mavi ok hız, sıcak renkli ok
        kuvvet. Konumda x ve y aynı ölçekte; hız ve kuvvet oklarının kendi
        ölçekleri sayıyla verilir. Otomatik hareket yok.
      </p>
      <Result>
        <p>
          Bz = {fmt(field)} T; q = {micro} μC; m = {fmt(mass * 1e6)} mg.
        </p>
        <p>
          t = {fmt(time)} s; konum ({fmt(m.x, 4)}; {fmt(m.y, 4)}) m.
        </p>
        <p>
          Hız ({fmt(m.velocity.x, 4)}; {fmt(m.velocity.y, 4)}) m/s; sürat{" "}
          {fmt(m.speed, 4)} m/s.
        </p>
        <p>
          F = ({fmt(m.force.x * 1e6, 4)}; {fmt(m.force.y * 1e6, 4)}) μN. K ={" "}
          {fmt(m.kinetic * 1e6, 4)} μJ; saf manyetik güç 0 W.
        </p>
        <p>
          {m.radius === null
            ? "qB = 0: doğru hareket veya durgunluk; daire yarıçapı ve tur süresi yok."
            : `Yarıçap ${fmt(m.radius, 4)} m; ${m.period === null ? "durgun noktada dolanma yok." : `tam tur ${fmt(m.period, 4)} s.`}`}
        </p>
        <p>
          Boyutsuz çizgi eğrisi yerine konum doğrudan analitik çözümden gelir;
          çizim seçili yola göre aynı x–y ölçeğiyle sığar.
        </p>
      </Result>
      <Compare
        question="İlk anda kuvvet hangi yöndedir?"
        choices={[
          "Yukarı",
          "Aşağı",
          "Sağa",
          "Sola",
          "İki eksenli",
          "Sapma yok",
        ]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          İlk F = ({fmt(fx * 1e6, 3)}; {fmt(fy * 1e6, 3)}) μN. q(v × B)
          işaretini kullan; kuvvet sonraki anlarda hızla birlikte döner.
        </p>
      </Compare>
    </Frame>
  );
}
function InductionLab() {
  const id = "elektromanyetik-induksiyon",
    [v, set] = useExploration(exploration(id), {
      field: 5,
      length: 40,
      position: 80,
      speed: 3,
      resistance: 2,
      closed: true,
      guess: "",
      reason: "",
      checked: false,
    });
  const field = integer(v.field, -10, 10, 5) / 10,
    length = integer(v.length, 40, 100, 40) / 100,
    position = integer(v.position, 10, 200, 80) / 100,
    speed = integer(v.speed, -5, 5, 3),
    resistance = integer(v.resistance, 1, 20, 2),
    m = inductionRod020(field, length, position, speed, resistance, v.closed),
    expected =
      m.current > 0 ? "Saatin tersi" : m.current < 0 ? "Saat yönü" : "Akım yok";
  return (
    <Frame
      id={id}
      title="Akı değeri ile değişim hızını ayır"
      intro="x–y raylarında dik çubuk. Normal +z, bu yüzden pozitif dolanım saatin tersi. R yük direnci; çubuk ve raylarda ohmik düşüm ile öz-indüktans ihmal. Dış düzenek seçili sürati sabit tutuyor."
    >
      <div className="physics020-controls">
        <Num
          label="Bz (0,1 T)"
          value={Math.round(field * 10)}
          min={-10}
          max={10}
          change={(field) => set({ field, checked: false })}
        />
        <Num
          label="Çubuk boyu (cm)"
          value={Math.round(length * 100)}
          min={40}
          max={100}
          change={(length) => set({ length, checked: false })}
        />
        <Num
          label="Çubuk konumu x (cm)"
          value={Math.round(position * 100)}
          min={10}
          max={200}
          change={(position) => set({ position, checked: false })}
        />
        <Num
          label="Yatay hız (m/s)"
          value={speed}
          min={-5}
          max={5}
          change={(speed) => set({ speed, checked: false })}
        />
        <Num
          label="Toplam direnç (Ω)"
          value={resistance}
          min={1}
          max={20}
          change={(resistance) => set({ resistance, checked: false })}
        />
      </div>
      <div className="physics020-actions">
        <button
          type="button"
          className="secondary"
          aria-pressed={v.closed}
          onClick={() => set({ closed: !v.closed, checked: false })}
        >
          {v.closed ? "Devreyi aç" : "Devreyi kapat"}
        </button>
      </div>
      <ScienceSvg
        title={`Üst eksi alt ${fmt(m.topMinusBottom, 4)} volt. ${v.closed ? "Devre kapalı." : "Devre açık."} Akım ${fmt(m.current, 4)} amper.`}
        kind="induction-rod"
        height={385}
      >
        {(w, marker) => {
          const scale = (w - 110) / 2,
            left = 55,
            right = left + 2 * scale,
            rod = left + position * scale,
            cy = 210,
            top = cy - (length * scale) / 2,
            bottom = cy + (length * scale) / 2,
            gap = Math.min(10, length * scale * 0.2);
          return (
            <>
              <text x={25} y={30}>
                +z: dışarı (•)
              </text>
              <text x={25} y={57}>
                −z: içeri (×)
              </text>
              <rect
                data-rod-area
                data-flux={m.flux}
                x={left}
                y={top}
                width={position * scale}
                height={length * scale}
                className="physics020-area-positive"
              />
              <path
                className="physics020-surface"
                d={`M${left} ${top}H${right}M${left} ${bottom}H${right}`}
              />
              <path
                data-return-connection
                data-closed={v.closed}
                className="physics020-rope"
                d={
                  v.closed
                    ? `M${left} ${top}V${bottom}`
                    : `M${left} ${top}V${cy - gap}M${left} ${cy + gap}V${bottom}`
                }
              />
              <path
                data-moving-rod
                data-world-x={position}
                data-world-length={length}
                data-scale={scale}
                className="physics020-surface physics020-external"
                d={`M${rod} ${bottom}V${top}`}
              />
              <Arrow
                name="rod-velocity"
                vector={{ x: speed, y: 0 }}
                origin={{ x: rod, y: top - 35 }}
                scale={speed === 0 ? 0 : 35 / Math.abs(speed)}
                marker={marker}
                kind="physics020-normal"
              />
              <Arrow
                name="rod-drag"
                vector={{ x: m.magneticForce, y: 0 }}
                origin={{ x: rod, y: bottom + 35 }}
                scale={
                  m.magneticForce === 0 ? 0 : 35 / Math.abs(m.magneticForce)
                }
                marker={marker}
              />
              {m.current !== 0 && (
                <Arrow
                  name="rod-current"
                  vector={{ x: 0, y: Math.sign(m.current) }}
                  origin={{ x: rod, y: cy + Math.sign(m.current) * 10 }}
                  scale={20}
                  marker={marker}
                  kind="physics020-friction"
                />
              )}
              <text x={25} y={345}>
                {v.closed ? "Kapalı yol" : "Açık yol"}
              </text>
              <text x={right} y={374} textAnchor="end">
                x (m)
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <p className="small muted">
        Üst ve alt ray arası L; soldan çubuğa uzaklık x. Her iki eksen aynı
        ölçekte. Mavi ok hız, sıcak renkli ok çubuk kuvveti; kısa yeşil ok
        yalnız akım yönü.
      </p>
      <Result>
        <p>
          Bz = {fmt(field)} T; L = {fmt(length)} m; x = {fmt(position)} m; v_x ={" "}
          {fmt(speed)} m/s.
        </p>
        <p>
          Φ = B L x = {fmt(m.flux, 4)} Wb; dΦ/dt = {fmt(m.fluxRate, 4)} Wb/s.
        </p>
        <p>
          ε = −dΦ/dt = {fmt(m.emf, 4)} V. Üst eksi alt ={" "}
          {fmt(m.topMinusBottom, 4)} V.
        </p>
        <p>
          İşaretli akım I = {fmt(m.current, 4)} A.{" "}
          {v.closed
            ? "Pozitif akım çubuk üzerinde yukarıdır."
            : "Açık uçlarda gerilim olabilir; kalıcı devre akımı yoktur."}
        </p>
        <p>
          Çubuk Fx = {fmt(m.magneticForce, 4)} N; dış Fx ={" "}
          {fmt(m.externalForce, 4)} N.
        </p>
        <p>
          Dış güç = {fmt(m.externalPower, 4)} W; direnç ısıl gücü ={" "}
          {fmt(m.heatPower, 4)} W. Anlık x seçimi zamanla otomatik oynatılmaz;
          hız yerel akı eğimini verir.
        </p>
      </Result>
      <Compare
        question="+z yüzünden bakınca akımın yönü?"
        choices={["Saat yönü", "Saatin tersi", "Akım yok"]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          ε = −B L v işaretini ve yolun açık/kapalı oluşunu birlikte kullan. Akı
          büyük olsa da eğimi sıfırsa emk sıfırdır.
        </p>
      </Compare>
    </Frame>
  );
}
function AcLab() {
  const id = "alternatif-akim",
    [v, set] = useExploration(exploration(id), {
      voltage: 60,
      resistance: 30,
      omega: 100,
      inductance: 400,
      capacitance: 250,
      capacitor: true,
      phase: 90,
      guess: "",
      reason: "",
      checked: false,
    });
  const voltage = integer(v.voltage, 0, 200, 60),
    resistance = integer(v.resistance, 10, 100, 30),
    omega = integer(v.omega, 10, 400, 100),
    inductance = integer(v.inductance, 0, 1000, 400) / 1000,
    capacitance = integer(v.capacitance, 10, 1000, 250) * 1e-6,
    phase = integer(v.phase, 0, 360, 90),
    m = seriesRlc020(
      voltage,
      resistance,
      omega,
      inductance,
      v.capacitor ? capacitance : null,
      phase,
    ),
    expected =
      voltage === 0
        ? "Akım yok"
        : Math.abs(m.phase) < 1e-10
          ? "Aynı fazda"
          : m.phase > 0
            ? "Geride"
            : "Önde";
  return (
    <Frame
      id={id}
      title="Aynı devrede dalga ile fazörü eşleştir"
      intro="Sinüzoidal kararlı seri devre. R sonlu ve pozitif; L ideal, C seçilirse ideal. Kaynak etkin değeri sabit. Her hesap bu tek seri bağlantı içindir; paralel rezonans modeli değildir."
    >
      <div className="physics020-controls">
        <Num
          label="Kaynak etkin gerilimi (V)"
          value={voltage}
          min={0}
          max={200}
          change={(voltage) => set({ voltage, checked: false })}
        />
        <Num
          label="Direnç (Ω)"
          value={resistance}
          min={10}
          max={100}
          change={(resistance) => set({ resistance, checked: false })}
        />
        <Num
          label="Açısal frekans (rad/s)"
          value={omega}
          min={10}
          max={400}
          change={(omega) => set({ omega, checked: false })}
        />
        <Num
          label="İndüktans (mH)"
          value={Math.round(inductance * 1000)}
          min={0}
          max={1000}
          change={(inductance) => set({ inductance, checked: false })}
        />
        <Num
          label="Sığa (μF)"
          value={Math.round(capacitance * 1e6)}
          min={10}
          max={1000}
          change={(capacitance) => set({ capacitance, checked: false })}
        />
        <Num
          label="Kaynak fazı (°)"
          value={phase}
          min={0}
          max={360}
          change={(phase) => set({ phase, checked: false })}
        />
      </div>
      <div className="physics020-actions">
        <button
          type="button"
          className="secondary"
          aria-pressed={v.capacitor}
          onClick={() => set({ capacitor: !v.capacitor, checked: false })}
        >
          {v.capacitor ? "Sığacı devreden çıkar" : "Sığacı devreye ekle"}
        </button>
      </div>
      <ScienceSvg
        title={`Kaynak fazı ${phase} derece. Anlık gerilim ${fmt(m.voltage, 4)} volt, akım ${fmt(m.current, 4)} amper. Akımın gerilime göre gecikme açısı ${fmt((m.phase * 180) / Math.PI, 4)} derece.`}
        kind="ac-waves"
        height={380}
      >
        {(w) => {
          const l = 45,
            r = w - 25,
            x = (d: number) => l + (d / 360) * (r - l),
            vscale = voltage === 0 ? 0 : 50,
            iscale = m.rmsCurrent === 0 ? 0 : 50;
          return (
            <>
              <text x={25} y={30}>
                v (V)
              </text>
              <text x={25} y={178}>
                i (A)
              </text>
              <path
                className="physics020-axis"
                d={`M${l} 110H${r}M${l} 245H${r}`}
              />
              <polyline
                data-source-wave
                points={Array.from({ length: 121 }, (_, i) => {
                  const a = (3 * i * Math.PI) / 180;
                  return `${x(3 * i)},${110 - vscale * Math.sin(a)}`;
                }).join(" ")}
                className="physics020-curve"
              />
              <polyline
                data-current-wave
                points={Array.from({ length: 121 }, (_, i) => {
                  const a = (3 * i * Math.PI) / 180;
                  return `${x(3 * i)},${245 - iscale * Math.sin(a - m.phase)}`;
                }).join(" ")}
                className="physics020-travelled"
              />
              <path
                data-ac-phase
                data-degrees={phase}
                className="physics020-time"
                d={`M${x(phase)} 55V300`}
              />
              <circle
                data-ac-voltage
                data-value={m.voltage}
                cx={x(phase)}
                cy={
                  110 -
                  (voltage === 0 ? 0 : 50 * Math.sin((phase * Math.PI) / 180))
                }
                r={4}
                className="physics020-selected"
              />
              <circle
                data-ac-current
                data-value={m.current}
                cx={x(phase)}
                cy={
                  245 -
                  (m.rmsCurrent === 0
                    ? 0
                    : 50 * Math.sin((phase * Math.PI) / 180 - m.phase))
                }
                r={4}
                className="physics020-selected"
              />
              {[0, 180, 360].map((a) => (
                <text
                  key={a}
                  x={x(a)}
                  y={335}
                  textAnchor={a === 0 ? "start" : a === 360 ? "end" : "middle"}
                >
                  {a}
                </text>
              ))}
              <text x={r} y={369} textAnchor="end">
                Faz (°)
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <p className="small muted">
        İki dalganın düşey ölçekleri ayrıdır: üstte V, altta A. Her birinin tepe
        değeri kendi 50 px ölçeğine sığar; sayısal tepe değerleri aşağıda. Yatay
        eksen aynı kaynak fazıdır; süre t = faz/ω ile bağlanır.
      </p>
      <ScienceSvg
        title={`Akım temel alınarak direnç gerilimi ${fmt(m.vr, 3)} volt; net reaktif gerilim ${fmt(m.vl - m.vc, 3)} volt. Vektör bileşkesi ${fmt(voltage)} volt.`}
        kind="ac-phasor"
        height={345}
      >
        {(w, marker) => {
          const net = m.vl - m.vc,
            s = Math.min(
              (w - 110) / Math.max(1, m.vr),
              90 / Math.max(1, Math.abs(net)),
            ),
            p = { x: 45, y: 180 };
          return (
            <>
              <text x={25} y={30}>
                Etkin gerilim (V)
              </text>
              <path
                className="physics020-axis"
                d={`M25 180H${w - 25}M45 65V285`}
              />
              <Arrow
                name="VR"
                vector={{ x: m.vr, y: 0 }}
                origin={p}
                scale={s}
                marker={marker}
                kind="physics020-friction"
              />
              <Arrow
                name="VL-VC"
                vector={{ x: 0, y: net }}
                origin={{ x: p.x + m.vr * s, y: p.y }}
                scale={s}
                marker={marker}
              />
              <Arrow
                name="source-phasor"
                vector={{ x: m.vr, y: net }}
                origin={p}
                scale={s}
                marker={marker}
                kind="physics020-normal"
              />
              <text x={25} y={325}>
                Akım referansı: →
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <Result>
        <p>
          f = {fmt(m.frequency, 4)} Hz; T = {fmt(m.period, 5)} s. X_L ={" "}
          {fmt(m.xl, 4)} Ω; X_C = {fmt(m.xc, 4)} Ω
          {v.capacitor ? "." : " (sığaç yok)."}
        </p>
        <p>
          Z = {fmt(m.impedance, 4)} Ω; I_etkin = {fmt(m.rmsCurrent, 4)} A.
        </p>
        <p>
          φ = {fmt((m.phase * 180) / Math.PI, 4)}°. Pozitif φ, akımın kaynak
          geriliminin gerisinde olduğunu söyler.
        </p>
        <p>
          V_R = {fmt(m.vr, 4)} V; V_L = {fmt(m.vl, 4)} V; V_C = {fmt(m.vc, 4)}{" "}
          V. İki reaktif fazör zıt yöndedir.
        </p>
        <p>
          Anlık v = {fmt(m.voltage, 4)} V; i = {fmt(m.current, 4)} A; p ={" "}
          {fmt(m.instantPower, 4)} W.
        </p>
        <p>
          Ortalama gerçek güç = {fmt(m.realPower, 4)} W; güç faktörü ={" "}
          {fmt(m.powerFactor, 4)}.
        </p>
        <p>
          Tepe gerilim = {fmt(Math.SQRT2 * voltage, 4)} V; tepe akım ={" "}
          {fmt(Math.SQRT2 * m.rmsCurrent, 4)} A.{" "}
          {m.resonantOmega === null
            ? "İki reaktif eleman birlikte yok; bu seçimde seri LC rezonans koşulu kurulmaz."
            : `LC eşitlik açısal frekansı ${fmt(m.resonantOmega, 4)} rad/s.`}
        </p>
      </Result>
      <Compare
        question="Akım kaynak gerilimine göre hangi fazdadır?"
        choices={["Önde", "Geride", "Aynı fazda", "Akım yok"]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          X_L − X_C = {fmt(m.reactance, 4)} Ω. İşaretin faz ilişkisine etkisini
          ve gerilimin sıfır özel hâlini karşılaştır.
        </p>
      </Compare>
    </Frame>
  );
}
function TransformerLab() {
  const id = "transformatorler",
    [v, set] = useExploration(exploration(id), {
      voltage: 120,
      primary: 400,
      secondary: 100,
      load: 30,
      ac: true,
      guess: "",
      reason: "",
      checked: false,
    });
  const voltage = integer(v.voltage, 10, 240, 120),
    primary = integer(v.primary, 100, 1000, 400),
    secondary = integer(v.secondary, 100, 1000, 100),
    load = integer(v.load, 10, 200, 30),
    m = transformer020(voltage, primary, secondary, load, v.ac),
    expected = !v.ac
      ? "AC modeli kapalı"
      : secondary > primary
        ? "Yükseltir"
        : secondary < primary
          ? "Alçaltır"
          : "Aynı gerilim";
  return (
    <Frame
      id={id}
      title="Yükle birlikte iki sargının gücünü izle"
      intro="İdeal ayrı sargılı trafo, ortak değişen akı ve saf direnç yükü. Kayıp ve boşta mıknatıs akımı ihmal. Gerilim ve akım AC etkin değerle verilir. Sabit DC son hâli için bu AC modelinde hesap yok."
    >
      <div className="physics020-controls">
        <Num
          label="Giriş etkin gerilimi (V)"
          value={voltage}
          min={10}
          max={240}
          change={(voltage) => set({ voltage, checked: false })}
        />
        <Num
          label="Primer sarım sayısı"
          value={primary}
          min={100}
          max={1000}
          change={(primary) => set({ primary, checked: false })}
        />
        <Num
          label="Sekonder sarım sayısı"
          value={secondary}
          min={100}
          max={1000}
          change={(secondary) => set({ secondary, checked: false })}
        />
        <Num
          label="Yük direnci (Ω)"
          value={load}
          min={10}
          max={200}
          change={(load) => set({ load, checked: false })}
        />
      </div>
      <Select
        label="Kaynak rejimi"
        value={v.ac ? "ac" : "dc"}
        onChange={(mode) => set({ ac: mode === "ac", checked: false })}
        options={[
          ["ac", "Sinüzoidal AC"],
          ["dc", "Sabit DC son durumu"],
        ]}
      />
      <ScienceSvg
        title={
          v.ac
            ? `İdeal oran ${fmt(m.ratio, 3)}. Çıkış ${fmt(m.secondaryVoltage!, 3)} volt; güç ${fmt(m.outputPower!, 3)} watt.`
            : "Sabit DC son hâlinde ortak akı değişimi yok; ideal AC güç hesabı kapalı."
        }
        kind="transformer"
        height={370}
      >
        {(w) => {
          const cx = w / 2,
            primaryX = cx - 40,
            secondaryX = cx + 40,
            top = 110,
            bottom = 250;
          const coil = (x: number, side: number) =>
            Array.from({ length: 7 }, (_, i) => {
              const y = top + i * 20;
              return `M${x} ${y}C${x + side * 15} ${y} ${x + side * 15} ${y + 20} ${x} ${y + 20}`;
            }).join(" ");
          return (
            <>
              <text x={25} y={30}>
                Primer
              </text>
              <text x={w - 25} y={58} textAnchor="end">
                Sekonder
              </text>
              <path
                className="physics020-block"
                d={`M${cx - 28} 85H${cx + 28}V275H${cx - 28}ZM${cx - 15} 100H${cx + 15}V260H${cx - 15}Z`}
                fillRule="evenodd"
              />
              <path
                data-primary-circuit
                className="physics020-rope"
                d={`M25 160V${top}H${primaryX}M${primaryX} ${bottom}H25V200`}
              />
              <path
                data-primary-winding
                data-turns={primary}
                className="physics020-curve"
                d={coil(primaryX, 1)}
              />
              <circle
                data-transformer-source
                cx={25}
                cy={180}
                r={20}
                className="physics020-charge"
              />
              <text x={25} y={186} textAnchor="middle">
                {v.ac ? "~" : "="}
              </text>
              <path
                data-secondary-circuit
                className="physics020-rope"
                d={`M${secondaryX} ${top}H${w - 25}V160M${w - 25} 200V${bottom}H${secondaryX}`}
              />
              <path
                data-secondary-winding
                data-turns={secondary}
                className="physics020-travelled"
                d={coil(secondaryX, -1)}
              />
              <path
                data-transformer-load
                data-resistance={load}
                className="physics020-surface"
                d={`M${w - 25} 160l-5 5l10 5l-10 5l10 5l-10 5l10 5l-5 5V200`}
              />
              <text x={25} y={323}>
                {v.ac ? "Değişen ortak akı" : "Sabit akı son durumu"}
              </text>
              <text x={25} y={352}>
                Ayrı tel devreleri
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <p className="small muted">
        İki tel devresi birbirine değmez. Ortadaki çekirdek bağı elektriksel tel
        değildir. Her yandaki 7 yay gerçek sarım sayısını şematik temsil eder;
        gerçek N değerleri aşağıda.
      </p>
      <Result>
        <p>
          N_P = {primary}; N_S = {secondary}; oran N_S/N_P = {fmt(m.ratio, 4)}.
        </p>
        {v.ac ? (
          <>
            <p>
              V_S = {fmt(m.secondaryVoltage!, 4)} V; I_S ={" "}
              {fmt(m.secondaryCurrent!, 4)} A.
            </p>
            <p>
              I_P = {fmt(m.primaryCurrent!, 4)} A; P_giriş ={" "}
              {fmt(m.inputPower!, 4)} W; P_çıkış = {fmt(m.outputPower!, 4)} W.
            </p>
            <p>
              İdeal verim %100. Giriş kaynağı yüke gereken gücü sağlar; sarım
              sayısı enerji yaratmaz.
            </p>
          </>
        ) : (
          <p>
            AC modeli kapalı. Sabit ortak akıdan sürekli sekonder emk’si
            oluşmaz. Açma/kapama geçicisi ile primerin gerçek DC akımı için ayrı
            model ve sargı verileri gerekir.
          </p>
        )}
      </Result>
      <Compare
        question="Seçili kaynakta gerilim oranı nasıl yorumlanır?"
        choices={["Yükseltir", "Alçaltır", "Aynı gerilim", "AC modeli kapalı"]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          {v.ac
            ? `V_S/V_P = N_S/N_P = ${fmt(m.ratio, 4)}. İki akım ayrıca yük ve güçle bulunur.`
            : "Sabit DC son durumuna AC sarım oranıyla güç hesabı kurulmaz."}
        </p>
      </Compare>
    </Frame>
  );
}
function CircularLab() {
  const id = "cembersel-hareket",
    [v, set] = useExploration(exploration(id), {
      radius: 5,
      mass: 2,
      speed: 5,
      mu: 50,
      gravity: 10,
      angle: 0,
      direction: 1,
      show: "acceleration",
      guess: "",
      reason: "",
      checked: false,
    });
  const radius = integer(v.radius, 1, 10, 5),
    mass = integer(v.mass, 1, 10, 2),
    speed = integer(v.speed, 0, 15, 5),
    mu = integer(v.mu, 0, 100, 50) / 100,
    gravity = integer(v.gravity, 1, 15, 10),
    angle = integer(v.angle, 0, 360, 0),
    direction: vDirection = v.direction === -1 ? -1 : 1,
    show = v.show === "force" ? "force" : "acceleration",
    m = circular020(radius, mass, speed, mu, gravity, angle, direction),
    expected = m.feasible ? "Yeterli" : "Yetersiz";
  return (
    <Frame
      id={id}
      title="Teğeti gör, sürtünme sınırını sına"
      intro="Yatay düzlemde düşey N = mg dengesi var. Tek yatay gerçek kuvvet statik sürtünme. x–y üstten bakışla seçili çember için sürtünme yeterli mi diye bakılır. Kayma sonrası hareket bu modelde hesap dışı."
    >
      <div className="physics020-controls">
        <Num
          label="Yarıçap (m)"
          value={radius}
          min={1}
          max={10}
          change={(radius) => set({ radius, checked: false })}
        />
        <Num
          label="Kütle (kg)"
          value={mass}
          min={1}
          max={10}
          change={(mass) => set({ mass, checked: false })}
        />
        <Num
          label="Sürat (m/s)"
          value={speed}
          min={0}
          max={15}
          change={(speed) => set({ speed, checked: false })}
        />
        <Num
          label="Statik katsayı (0,01)"
          value={Math.round(mu * 100)}
          min={0}
          max={100}
          change={(mu) => set({ mu, checked: false })}
        />
        <Num
          label="Yer çekimi (m/s²)"
          value={gravity}
          min={1}
          max={15}
          change={(gravity) => set({ gravity, checked: false })}
        />
        <Num
          label="Konum açısı (°)"
          value={angle}
          min={0}
          max={360}
          change={(angle) => set({ angle, checked: false })}
        />
      </div>
      <Select
        label="Dönüş yönü"
        value={direction === 1 ? "ccw" : "cw"}
        onChange={(d) =>
          set({ direction: d === "ccw" ? 1 : -1, checked: false })
        }
        options={[
          ["ccw", "Saatin tersi"],
          ["cw", "Saat yönü"],
        ]}
      />
      <Select
        label="Hızın yanında göster"
        value={show}
        onChange={(show) => set({ show, checked: false })}
        options={[
          ["acceleration", "İvme oku"],
          ["force", "Kuvvet oku"],
        ]}
      />
      <ScienceSvg
        title={`${m.feasible ? "Sürtünme yeterli." : "Seçili çember için sürtünme yetersiz."} Gereken içe kuvvet ${fmt(m.required, 3)} newton; sınır ${fmt(m.maximumFriction, 3)} newton.`}
        kind="circular-path"
        height={390}
      >
        {(w, marker) => {
          const cx = w / 2,
            cy = 200,
            R = Math.min((w - 120) / 2, 85),
            scale = R / radius,
            p = { x: cx + m.position.x * scale, y: cy - m.position.y * scale };
          return (
            <>
              <text x={25} y={30}>
                y (m)
              </text>
              <path
                className="physics020-axis"
                d={`M25 ${cy}H${w - 25}M${cx} 65V335`}
              />
              <circle
                data-candidate-circle
                data-feasible={m.feasible}
                data-radius={radius}
                data-scale={scale}
                cx={cx}
                cy={cy}
                r={R}
                className={
                  m.feasible ? "physics020-curve" : "physics020-axis-guide"
                }
              />
              <path
                data-position-radius
                className="physics020-axis-guide"
                d={`M${cx} ${cy}L${p.x} ${p.y}`}
              />
              <circle
                data-circular-position
                data-world-x={m.position.x}
                data-world-y={m.position.y}
                cx={p.x}
                cy={p.y}
                r={4}
                className="physics020-selected"
              />
              <Arrow
                name="circular-velocity"
                vector={m.velocity}
                origin={p}
                scale={speed > 0 ? 35 / speed : 0}
                marker={marker}
                kind="physics020-normal"
              />
              {show === "acceleration" ? (
                <Arrow
                  name="circular-acceleration"
                  vector={m.accelerationVector}
                  origin={p}
                  scale={m.acceleration > 0 ? 35 / m.acceleration : 0}
                  marker={marker}
                  kind={
                    m.feasible ? "physics020-external" : "physics020-required"
                  }
                />
              ) : (
                <Arrow
                  name={m.feasible ? "actual-friction" : "required-friction"}
                  vector={m.requiredForce}
                  origin={p}
                  scale={m.required > 0 ? 35 / m.required : 0}
                  marker={marker}
                  kind={
                    m.feasible ? "physics020-friction" : "physics020-required"
                  }
                />
              )}
              <text x={w - 25} y={371} textAnchor="end">
                x (m)
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <p className="small muted">
        Mavi ok teğet hız. İkinci ok seçili ivme ya da içe kuvvet. Her ok kendi
        sayısal ölçeğine göre çizilir; konum x–y ölçeği ortaktır. Kesikli daire
        ve ok gerçek yol değil, gereken koşuldur.
      </p>
      <Result>
        <p>
          Konum = ({fmt(m.position.x, 4)}; {fmt(m.position.y, 4)}) m. Hız = (
          {fmt(m.velocity.x, 4)}; {fmt(m.velocity.y, 4)}) m/s.
        </p>
        <p>
          Gereken a = {fmt(m.acceleration, 4)} m/s²; F_radyal ={" "}
          {fmt(m.required, 4)} N.
        </p>
        <p>
          N = mg = {fmt(mass * gravity, 4)} N; en büyük statik sürtünme ={" "}
          {fmt(m.maximumFriction, 4)} N.
        </p>
        <p>
          {m.feasible
            ? `Gereken ${fmt(m.required, 4)} N sınırı aşmıyor; statik sürtünme bu değeri sağlar.`
            : "Yetersiz: bu yarıçap ve süratle daire süremez. Kesikli çizgi gerçek kayma yörüngesi değildir."}
        </p>
        <p>
          Bu modelde sınır sürat = {fmt(m.maximumSpeed, 4)} m/s; K ={" "}
          {fmt(m.kinetic, 4)} J.
        </p>
        <p>
          {m.period === null
            ? "Bu seçim için gerçek tur süresi verilmez: sürat sıfır veya gereken kuvvet yetmiyor."
            : `Tam tur ${fmt(m.period, 4)} s; seçili açıya ulaşma süresi ${fmt(m.selectedTime!, 4)} s.`}
        </p>
      </Result>
      <Compare
        question="Statik sürtünme bu çember için yeterli mi?"
        choices={["Yeterli", "Yetersiz"]}
        expected={expected}
        values={v}
        onChange={set}
      >
        <p>
          m v²/r = {fmt(m.required, 4)} N ile μs mg ={" "}
          {fmt(m.maximumFriction, 4)} N değerini kıyasla. Statik sürtünme her
          anda en büyük değerinde olmak zorunda değildir.
        </p>
      </Compare>
    </Frame>
  );
}
type vDirection = 1 | -1;
export default function Forge020PhysicsLab({ lessonId }: { lessonId: string }) {
  switch (lessonId) {
    case "manyetik-kuvvet":
      return <MagneticLab />;
    case "elektromanyetik-induksiyon":
      return <InductionLab />;
    case "alternatif-akim":
      return <AcLab />;
    case "transformatorler":
      return <TransformerLab />;
    case "cembersel-hareket":
      return <CircularLab />;
    default:
      return null;
  }
}
