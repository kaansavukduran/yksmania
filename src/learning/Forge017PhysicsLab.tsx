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
  fallModel017,
  verticalModel017,
  horizontalModel017,
  obliqueModel017,
  energyModel017,
} from "./forge017Physics";
import "./forge017Physics.css";
const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Object.is(n, -0) ? 0 : n,
  );
const integer = (n: number, lo: number, hi: number, fallback: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(n) ? n : fallback)));
const exploration = (id: string) => `forge017-physics-${id}`;
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
    <fieldset className="physics017-compare">
      <legend>{question}</legend>
      <div className="physics017-guesses">
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
        <div className="physics017-feedback" role="status">
          <strong>
            {values.guess === expected
              ? "Tahminin verilen koşullarla uyumlu."
              : "Tahminini modelin koşullarıyla yeniden karşılaştır."}
          </strong>
          {children}
          <p>Gerekçen: {values.reason}</p>
          <p className="small muted">
            Gerekçe otomatik puanlanmaz; modeli ve açıklamayı karşılaştır.
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
    <section data-forge017={id} className="physics017-lab">
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="small muted">
        Görsel keşif ayrı kaydedilir; bağımsız doğru cevap, XP veya konu
        tamamlanması oluşturmaz.
      </p>
    </section>
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
      data-physics017-plot={kind}
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
function Vector({
  name,
  x,
  y,
  cx,
  cy,
  scale,
  marker,
  kind,
}: {
  name: string;
  x: number;
  y: number;
  cx: number;
  cy: number;
  scale: number;
  marker: string;
  kind: string;
}) {
  return x === 0 && y === 0 ? (
    <circle data-vector-zero={name} cx={cx} cy={cy} r="3" className={kind} />
  ) : (
    <path
      data-vector={name}
      data-x={x}
      data-y={y}
      d={`M${cx} ${cy}L${cx + x * scale} ${cy - y * scale}`}
      markerEnd={`url(#${marker})`}
      className={`physics017-force ${kind}`}
    />
  );
}
function TimeControls({
  progress,
  change,
  back,
  forward,
  children,
  position = false,
}: {
  position?: boolean;
  progress: number;
  change: (p: number) => void;
  back: () => void;
  forward: () => void;
  children?: ReactNode;
}) {
  return (
    <>
      <div className="physics017-controls">
        <ModelNumber
          label="İlerleme (%)"
          value={progress}
          min={0}
          max={100}
          onChange={change}
        />
      </div>
      <div className="physics017-actions">
        <button className="secondary" onClick={back}>
          Bir adım geri
        </button>
        <button className="secondary" onClick={forward}>
          Bir adım ileri
        </button>
        {children}
      </div>
      <p className="small muted">
        {position
          ? "Konum elle seçilir; otomatik hareket veya zaman hesabı üretilmez."
          : "Zaman elle seçilir; hareket otomatik başlamaz. Olay düğmesi seçiliyse sürgüye dokunmak elle zaman seçimine döner."}
      </p>
    </>
  );
}
function DropScene({
  height,
  current,
  initialHeight = height,
  turningHeight,
  weight,
  drag,
  title,
}: {
  height: number;
  current: number;
  initialHeight?: number;
  turningHeight?: number;
  weight?: number;
  drag?: number;
  title: string;
}) {
  return (
    <ScienceSvg kind="height" title={title} height={370}>
      {(w, marker) => {
        const top = 80,
          floor = 300,
          k = (floor - top) / Math.max(height, 1),
          upper = floor - height * k,
          initialY = floor - initialHeight * k,
          cx = w / 2,
          cy = floor - current * k - 6,
          forceScale = 42 / Math.max(weight ?? 0, drag ?? 0, 1);
        return (
          <>
            <text x="14" y="28">
              y (m)
            </text>
            <text x={w - 14} y="28" textAnchor="end">
              +y yukarı
            </text>
            <path
              d={`M${cx - 35} ${floor}H${cx + 35}`}
              className="physics017-surface"
            />
            <path
              d={`M${cx - 35} ${floor}V${upper - 10}`}
              className="physics017-axis"
            />
            <text x={cx - 46} y={floor + 6} textAnchor="end">
              0
            </text>
            {height > 0 && height * k > 40 && (
              <text x={cx - 46} y={upper + 6} textAnchor="end">
                {fmt(height)}
              </text>
            )}
            <path
              d={`M${cx - 32} ${upper}H${cx + 32}`}
              className="physics017-axis-guide"
            />
            <circle
              cx={cx}
              cy={initialY - 6}
              r="6"
              className="physics017-initial"
            />
            <path
              data-drop-path="height"
              d={`M${cx} ${initialY}${turningHeight === undefined ? "" : `V${floor - turningHeight * k}`}V${floor - current * k}`}
              className="physics017-travelled"
            />
            <circle
              data-body="drop"
              data-world-y={current}
              cx={cx}
              cy={cy}
              r="6"
              className="physics017-selected"
            />
            {weight !== undefined && (
              <Vector
                name="weight"
                x={0}
                y={-weight}
                cx={cx}
                cy={cy}
                scale={forceScale}
                marker={marker}
                kind="physics017-weight"
              />
            )}
            {drag !== undefined && (
              <Vector
                name="drag"
                x={0}
                y={drag}
                cx={cx}
                cy={cy}
                scale={forceScale}
                marker={marker}
                kind="physics017-normal"
              />
            )}
            <text x="14" y="345">
              Zemin: y = 0 m
            </text>
          </>
        );
      }}
    </ScienceSvg>
  );
}
function Fall() {
  const id = "serbest-dusme-limit-hiz",
    [s, set] = useExploration(exploration(id), {
      mass: 2,
      gravity: 10,
      height: 80,
      density: 100,
      cd: 100,
      area: 40,
      progress: 25,
      guess: "",
      reason: "",
      checked: false,
    });
  const mass = integer(s.mass, 1, 10, 2),
    gravity = integer(s.gravity, 1, 20, 10),
    height = integer(s.height, 1, 100, 80),
    density = integer(s.density, 0, 200, 100),
    cd = integer(s.cd, 0, 200, 100),
    area = integer(s.area, 0, 200, 40),
    progress = integer(s.progress, 0, 100, 25),
    base = {
      mass,
      gravity,
      height,
      density: density / 100,
      dragCoefficient: cd / 100,
      area: area / 100,
    },
    end = fallModel017({ ...base, time: 0 }),
    m = fallModel017({
      ...base,
      time: progress === 100 ? end.duration : end.duration * (progress / 100),
    }),
    expected = m.coefficient > 0 && m.time > 0 ? "İvme azalır" : "İvme aynı",
    change = (p: Partial<typeof s>) =>
      set({ ...p, checked: p.checked ?? false });
  return (
    <Frame
      id={id}
      title="Düşüşü yavaşlatan dengeyi kur"
      intro="Önce ideal düşüşü, sonra aynı cismin durgun havadaki karesel direncini karşılaştır. Tam limit ile yüzde 99 yakınlığını ayır."
    >
      <div className="physics017-controls">
        <ModelNumber
          label="Kütle (kg)"
          value={mass}
          min={1}
          max={10}
          onChange={(mass) => change({ mass })}
        />
        <ModelNumber
          label="Yükseklik (m)"
          value={height}
          min={1}
          max={100}
          onChange={(height) => change({ height })}
        />
        <ModelNumber
          label="Yer çekimi (m/s²)"
          value={gravity}
          min={1}
          max={20}
          onChange={(gravity) => change({ gravity })}
        />
        <ModelNumber
          label="Yoğunluk ×100"
          value={density}
          min={0}
          max={200}
          onChange={(density) => change({ density })}
        />
        <ModelNumber
          label="Cd ×100"
          value={cd}
          min={0}
          max={200}
          onChange={(cd) => change({ cd })}
        />
        <ModelNumber
          label="Alan ×100"
          value={area}
          min={0}
          max={200}
          onChange={(area) => change({ area })}
        />
      </div>
      <p>
        ρ = {fmt(density / 100)} kg/m³; Cd = {fmt(cd / 100)}; A ={" "}
        {fmt(area / 100)} m². Alan, akışa dik izdüşümdür. Hava durgun, kaldırma
        ihmal; ρ, Cd ve A sabit. Gerçek hava verisi değildir.
      </p>
      <TimeControls
        progress={progress}
        change={(progress) => change({ progress })}
        back={() => change({ progress: Math.max(0, progress - 10) })}
        forward={() => change({ progress: Math.min(100, progress + 10) })}
      >
        <button className="secondary" onClick={() => change({ area: 0 })}>
          Direnci kapat
        </button>
        <button
          className="secondary"
          onClick={() =>
            change({
              mass: 2,
              gravity: 10,
              height: 80,
              density: 100,
              cd: 100,
              area: 40,
              progress: 25,
            })
          }
        >
          Dirençli örneği kur
        </button>
      </TimeControls>
      <DropScene
        height={height}
        current={m.height}
        weight={m.weight}
        drag={m.drag}
        title={`t = ${fmt(m.time)} s; yükseklik ${fmt(m.height)} m. Ağırlık aşağı, direnç yukarı.`}
      />
      <ul className="physics017-legend">
        <li>
          <span className="physics017-swatch physics017-weight" />
          Ağırlık aşağı {fmt(m.weight)} N.
        </li>
        <li>
          <span className="physics017-swatch physics017-normal" />
          Direnç yukarı {fmt(m.drag)} N.
        </li>
      </ul>
      <p>
        Yükseklik, ölçekli olmayan top işaretçisinin alt temas noktasına
        göredir. Ağırlık ve direnç aynı kuvvet ölçeğindedir; ayrı hız grafiği
        başka birimi gösterir.
      </p>
      <ScienceSvg
        kind="fall-speed"
        title="Düşüş sürati ve zaman. Limit bu grafiğin sürat aralığındaysa kesikli çizgiyle gösterilir; sonlu zamanda tam erişilmez."
        height={310}
      >
        {(w) => {
          const left = 60,
            right = w - 22,
            top = 65,
            bottom = 235,
            maxV = Math.max(gravity * Math.sqrt((2 * height) / gravity), 1),
            X = (t: number) => left + ((right - left) * t) / end.duration,
            Y = (v: number) => bottom - ((bottom - top) * v) / maxV;
          const points = Array.from({ length: 61 }, (_, i) => {
            const v = fallModel017({
              ...base,
              time: i === 60 ? end.duration : end.duration * (i / 60),
            });
            return `${i ? "L" : "M"}${X(v.time)} ${Y(v.speed)}`;
          }).join("");
          return (
            <>
              <text x="12" y="28">
                v (m/s)
              </text>
              <text x={w - 14} y="28" textAnchor="end">
                t (s)
              </text>
              <path
                d={`M${left} ${top}V${bottom}H${right}`}
                className="physics017-axis"
              />
              <text x={left - 10} y={bottom + 6} textAnchor="end">
                0
              </text>
              <text x={left - 10} y={top + 6} textAnchor="end">
                {fmt(maxV)}
              </text>
              <text x={left} y={bottom + 29} textAnchor="middle">
                0
              </text>
              <text x={right} y={bottom + 29} textAnchor="end">
                {fmt(end.duration)}
              </text>
              {m.terminalSpeed !== null && m.terminalSpeed <= maxV && (
                <path
                  data-limit-line="terminal"
                  d={`M${left} ${Y(m.terminalSpeed)}H${right}`}
                  className="physics017-axis-guide"
                />
              )}
              <path
                data-fall-curve="speed"
                d={points}
                className="physics017-curve"
              />
              <circle
                data-fall-point="speed"
                data-time={m.time}
                data-speed={m.speed}
                cx={X(m.time)}
                cy={Y(m.speed)}
                r="5"
                className="physics017-selected"
              />
            </>
          );
        }}
      </ScienceSvg>
      <div className="physics017-result" data-model-result>
        <strong>
          t = {fmt(m.time)} s: sürat {fmt(m.speed)} m/s; aşağı ivme{" "}
          {fmt(m.acceleration)} m/s².
        </strong>
        <p>
          Yükseklik {fmt(m.height)} m; düşüş {fmt(m.distance)} m. İlk yer zamanı{" "}
          {fmt(m.duration)} s; dirençsiz karşılığı{" "}
          {fmt(Math.sqrt((2 * height) / gravity))} s.
        </p>
        <p>
          c = ρCdA/2 = {fmt(m.coefficient, 3)} kg/m.{" "}
          {m.terminalSpeed === null
            ? "Direnç yok: sonlu limit hız tanımlı değil."
            : `Limit sürat ${fmt(m.terminalSpeed)} m/s. Yüzde 99 zamanı ${fmt(m.nearLimitTime!)} s; ${m.nearLimitBeforeGround ? "bu eşiğe yere varmadan ulaşılabilir." : "ilk yer temasından önce bu eşiğe ulaşılmaz."}`}
        </p>
        <p>
          Değerler yuvarlanır; ivmenin ekranda 0 görünmesi sonlu zamanda tam
          limite erişildiği anlamına gelmez.
        </p>
        <p>
          Kinetik {fmt(m.kinetic)} J; potansiyel kaybı {fmt(m.lostPotential)} J;
          hava/cisim tarafına aktarım {fmt(m.heat)} J. Toplam enerji yok olmaz.
          Sıfır kaldırma ve sabit karesel katsayı koşulu geçerlidir.
        </p>
      </div>
      <Compare
        question="İlk ana göre, seçili andaki aşağı ivme?"
        choices={["İvme azalır", "İvme artar", "İvme aynı"]}
        expected={expected}
        values={s}
        onChange={change}
      >
        <p>
          Başlangıçta direnç sıfır ve a = g. Şimdi a = g − Fd/m ={" "}
          {fmt(m.acceleration)} m/s². İvme azalırken aşağı sürat artabilir.
        </p>
      </Compare>
    </Frame>
  );
}
function chosenTime(
  progress: number,
  phase: string,
  duration: number,
  apex: number | null,
) {
  return phase === "ground"
    ? duration
    : phase === "apex" && apex !== null
      ? apex
      : progress === 100
        ? duration
        : duration * (progress / 100);
}
function Vertical() {
  const id = "dusey-atis",
    [s, set] = useExploration(exploration(id), {
      height: 20,
      v0: 15,
      gravity: 10,
      progress: 50,
      phase: "manual",
      guess: "",
      reason: "",
      checked: false,
    }),
    height = integer(s.height, 0, 100, 20),
    v0 = integer(s.v0, -40, 40, 15),
    gravity = integer(s.gravity, 1, 20, 10),
    progress = integer(s.progress, 0, 100, 50),
    base = { height, initialVelocity: v0, gravity },
    end = verticalModel017({ ...base, time: 0 }),
    time = chosenTime(progress, s.phase, end.duration, end.apexTime),
    m = verticalModel017({ ...base, time }),
    shown = end.duration === 0 ? 0 : Math.round((time / end.duration) * 100),
    change = (p: Partial<typeof s>) =>
      set({ ...p, checked: p.checked ?? false }),
    manual = (progress: number) => change({ progress, phase: "manual" }),
    expected =
      m.path > Math.abs(m.displacement) + 1e-8 ? "Yol daha büyük" : "Yol eşit";
  return (
    <Frame
      id={id}
      title="Tepeyi ve yere varışı ayrı seç"
      intro="Yukarı artı eksen değişmez; ilk hızın işaretiyle aynı denklemi yukarı ve aşağı atışta kullan. İlk yer temasından sonra model durur."
    >
      <div className="physics017-controls">
        <ModelNumber
          label="İlk yükseklik (m)"
          value={height}
          min={0}
          max={100}
          onChange={(height) => change({ height })}
        />
        <ModelNumber
          label="İlk hız (m/s)"
          value={v0}
          min={-40}
          max={40}
          onChange={(v0) => change({ v0 })}
        />
        <ModelNumber
          label="Yer çekimi (m/s²)"
          value={gravity}
          min={1}
          max={20}
          onChange={(gravity) => change({ gravity })}
        />
      </div>
      <TimeControls
        progress={shown}
        change={manual}
        back={() => manual(Math.max(0, shown - 10))}
        forward={() => manual(Math.min(100, shown + 10))}
      >
        <button
          className="secondary"
          disabled={m.apexTime === null}
          onClick={() => change({ phase: "apex" })}
        >
          Tepeye git
        </button>
        <button
          className="secondary"
          onClick={() => change({ phase: "ground", progress: 100 })}
        >
          İlk yere git
        </button>
        <button
          className="secondary"
          onClick={() =>
            change({
              height: 20,
              v0: 15,
              gravity: 10,
              progress: 100,
              phase: "ground",
            })
          }
        >
          Balkon örneğini kur
        </button>
      </TimeControls>
      <p>
        Seçim:{" "}
        {s.phase === "apex" && m.apexTime !== null
          ? "Tepe olayı"
          : s.phase === "ground"
            ? "İlk yer teması"
            : "Elle zaman"}
        . Hava direnci yok, g sabit. İlk yükseklik zemine göre; hızın pozitif
        yönü yukarı.
      </p>
      <DropScene
        height={m.maxHeight}
        current={m.height}
        initialHeight={height}
        turningHeight={
          m.apexTime !== null && m.time > m.apexTime ? m.maxHeight : undefined
        }
        title={`Yükseklik ${fmt(m.height)} m. Gösterilen üst seviye bütün uçuşun maksimum yüksekliği.`}
      />
      <p>
        Üst kesikli seviye maksimum yükseklik, boş işaret başlangıç, dolu işaret
        seçili konumdur. Yeşil rota yalnız seçili ana kadar geçilen yolu izler;
        dönüşte aynı çizgiden yeniden geçilebilir. Alt temas noktası y
        yüksekliğidir; top simgesi ölçekli değildir.
      </p>
      <ScienceSvg
        kind="vertical-velocity"
        title={`Yukarı artı; hız ${fmt(m.velocity)} m/s, ivme ${fmt(-gravity)} m/s². İki satırın birimleri ve ölçekleri ayrıdır.`}
        height={255}
      >
        {(w, marker) => {
          const cx = w / 2,
            room = Math.min(65, (w - 70) / 2),
            scale =
              room /
              Math.max(Math.abs(v0 - gravity * m.duration), Math.abs(v0), 1);
          return (
            <>
              <text x="14" y="28">
                v (m/s), + yukarı
              </text>
              <path
                d={`M${cx - 30} 140H${cx + 30}`}
                className="physics017-axis-guide"
              />
              <Vector
                name="vertical-velocity"
                x={0}
                y={m.velocity}
                cx={cx}
                cy={140}
                scale={scale}
                marker={marker}
                kind="physics017-normal"
              />
              <text x="14" y="238">
                a = −{fmt(gravity)} m/s²
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <div className="physics017-result" data-model-result>
        <strong>
          t = {fmt(m.time)} s; y = {fmt(m.height)} m; hız {fmt(m.velocity)} m/s.
        </strong>
        <p>
          İvme −{fmt(gravity)} m/s²; sürat {fmt(m.speed)} m/s. İlk yer{" "}
          {fmt(m.duration)} s.{" "}
          {m.apexTime === null
            ? "Gelecekte yükselme tepesi yok."
            : `Tepe ${fmt(m.apexTime)} s ve ${fmt(m.maxHeight)} m.`}
        </p>
        <p>
          Yer değiştirme {fmt(m.displacement)} m; yol {fmt(m.path)} m.{" "}
          {m.averageVelocity === null
            ? "İlk anda ortalama hız ve sürat tanımsızdır."
            : `Ortalama hız ${fmt(m.averageVelocity)} m/s; ortalama sürat ${fmt(m.averageSpeed!)} m/s.`}
        </p>
        <p>
          v = v0 − gt; y = y0 + v0t − gt²/2. Tepe anında hız sıfır olabilir; g
          ve ağırlık sıfır olmaz. Başlangıç/varış seviyesi farklıysa süreler
          simetrik olmak zorunda değildir.
        </p>
      </div>
      <Compare
        question="Seçili ana kadar yol ile |yer değiştirme| ilişkisi?"
        choices={["Yol daha büyük", "Yol eşit"]}
        expected={expected}
        values={s}
        onChange={change}
      >
        <p>
          Yol {fmt(m.path)} m, |Δy| {fmt(Math.abs(m.displacement))} m. Tepe
          geçildiyse yükselme ve iniş yolu toplanır.
        </p>
      </Compare>
    </Frame>
  );
}
type Flight = ReturnType<typeof horizontalModel017>;
function FlightScene({
  m,
  initialHeight,
  initialVy,
  gravity,
}: {
  m: Flight;
  initialHeight: number;
  initialVy: number;
  gravity: number;
}) {
  return (
    <ScienceSvg
      kind="trajectory"
      height={400}
      title={`Gerçek eşit metre ölçekli x–y yörüngesi; x ${fmt(m.x)} m, y ${fmt(m.y)} m, hız (${fmt(m.vx)}, ${fmt(m.vy)}) m/s.`}
    >
      {(w, marker) => {
        const left = 65,
          right = w - 65,
          top = 80,
          floor = 275,
          k = Math.min(
            (right - left) / Math.max(m.maxX - m.minX, 1),
            (floor - top) / Math.max(m.maxHeight, 1),
          ),
          X = (x: number) => left + (x - m.minX) * k,
          Y = (y: number) => floor - y * k,
          arrow = 40 / Math.max(m.impactSpeed, Math.hypot(m.vx, initialVy), 1),
          cx = X(m.x),
          cy = Y(m.y) - 6;
        const curve = `M${X(0)} ${Y(initialHeight)}Q${X(m.range / 2)} ${Y(initialHeight + (initialVy * m.duration) / 2)} ${X(m.range)} ${Y(0)}`;
        const ghosts = Array.from({ length: 5 }, (_, i) => {
          const t = (m.duration * i) / 4;
          return {
            x: m.vx * t,
            y:
              i === 4
                ? 0
                : initialHeight + initialVy * t - (gravity * t * t) / 2,
          };
        });
        return (
          <>
            <text x="14" y="28">
              y (m)
            </text>
            <text x={w - 14} y="28" textAnchor="end">
              x (m)
            </text>
            <path
              d={`M${left} ${Y(m.maxHeight) - 10}V${floor}H${Math.max(right, X(m.range)) + 12}`}
              className="physics017-axis"
            />
            <path
              d={`M${left - 12} ${floor + 1}H${w - 14}`}
              className="physics017-surface"
            />
            <text x={left - 10} y={floor + 6} textAnchor="end">
              0
            </text>
            {m.maxHeight * k > 40 && (
              <text x={left - 10} y={Y(m.maxHeight) + 6} textAnchor="end">
                {fmt(m.maxHeight)}
              </text>
            )}
            <text x={left} y={floor + 70} textAnchor="middle">
              0
            </text>
            {m.range > 0 && X(m.range) - X(0) > 75 && (
              <text x={X(m.range)} y={floor + 70} textAnchor="middle">
                {fmt(m.range)}
              </text>
            )}
            <path
              data-trajectory="parabola"
              d={curve}
              className="physics017-curve"
            />
            {ghosts.map((p, i) => (
              <circle
                key={i}
                data-time-sample={i}
                data-world-x={p.x}
                data-world-y={p.y}
                cx={X(p.x)}
                cy={Y(p.y)}
                r="2.5"
                className="physics017-initial"
              />
            ))}
            <circle
              data-body="projectile"
              data-world-x={m.x}
              data-world-y={m.y}
              cx={cx}
              cy={cy}
              r="6"
              className="physics017-selected"
            />
            <Vector
              name="vx"
              x={m.vx}
              y={0}
              cx={cx}
              cy={cy}
              scale={arrow}
              marker={marker}
              kind="physics017-friction"
            />
            <Vector
              name="vy"
              x={0}
              y={m.vy}
              cx={cx}
              cy={cy}
              scale={arrow}
              marker={marker}
              kind="physics017-external"
            />
            <Vector
              name="velocity"
              x={m.vx}
              y={m.vy}
              cx={cx}
              cy={cy}
              scale={arrow}
              marker={marker}
              kind="physics017-normal"
            />
            <text x="14" y="377">
              Eşit x–y metre ölçeği
            </text>
          </>
        );
      }}
    </ScienceSvg>
  );
}
function FlightLegend({ m }: { m: Flight }) {
  return (
    <>
      <ul className="physics017-legend">
        <li>
          <span className="physics017-swatch physics017-friction" />
          Yatay vx = {fmt(m.vx)} m/s.
        </li>
        <li>
          <span className="physics017-swatch physics017-external" />
          Düşey vy = {fmt(m.vy)} m/s.
        </li>
        <li>
          <span className="physics017-swatch physics017-normal" />
          Bileşke hız, sürat {fmt(m.speed)} m/s.
        </li>
      </ul>
      <p>
        İnce noktalar eşit zaman aralıklarıdır, otomatik animasyon değildir.
        Konum alt temas işaretinden okunur; top simgesi ölçekli değildir. Hız
        okları ortak ayrı bir hız ölçeğindedir ve gerçek teğet doğrultusundadır.
        İvme (0, −g); yatay kuvvet yoktur.
      </p>
    </>
  );
}
function Horizontal() {
  const id = "yatay-atis",
    [s, set] = useExploration(exploration(id), {
      height: 45,
      u: 20,
      gravity: 10,
      progress: 50,
      guess: "",
      reason: "",
      checked: false,
    }),
    height = integer(s.height, 1, 100, 45),
    u = integer(s.u, 0, 50, 20),
    gravity = integer(s.gravity, 1, 20, 10),
    progress = integer(s.progress, 0, 100, 50),
    base = { height, horizontalVelocity: u, gravity },
    end = horizontalModel017({ ...base, time: 0 }),
    time = progress === 100 ? end.duration : end.duration * (progress / 100),
    m = horizontalModel017({ ...base, time }),
    change = (p: Partial<typeof s>) =>
      set({ ...p, checked: p.checked ?? false });
  return (
    <Frame
      id={id}
      title="Yatayı değiştir, düşeyi koru"
      intro="Aynı h ve g ile yatay ilk hızı değiştir; aynı anda y konumunun ve ilk yer zamanının neden değişmediğini karşılaştır."
    >
      <div className="physics017-controls">
        <ModelNumber
          label="Yükseklik (m)"
          value={height}
          min={1}
          max={100}
          onChange={(height) => change({ height })}
        />
        <ModelNumber
          label="Yatay ilk hız (m/s)"
          value={u}
          min={0}
          max={50}
          onChange={(u) => change({ u })}
        />
        <ModelNumber
          label="Yer çekimi (m/s²)"
          value={gravity}
          min={1}
          max={20}
          onChange={(gravity) => change({ gravity })}
        />
      </div>
      <TimeControls
        progress={progress}
        change={(progress) => change({ progress })}
        back={() => change({ progress: Math.max(0, progress - 10) })}
        forward={() => change({ progress: Math.min(100, progress + 10) })}
      >
        <button
          className="secondary"
          onClick={() =>
            change({ height: 45, u: 20, gravity: 10, progress: 100 })
          }
        >
          Üç saniyelik örnek
        </button>
        <button
          className="secondary"
          onClick={() => change({ u: Math.min(50, u + 10) })}
        >
          Yatay hızı artır
        </button>
      </TimeControls>
      <FlightScene
        m={m}
        initialHeight={height}
        initialVy={0}
        gravity={gravity}
      />
      <FlightLegend m={m} />
      <div className="physics017-result" data-model-result>
        <strong>
          t = {fmt(m.time)} s: konum ({fmt(m.x)}, {fmt(m.y)}) m.
        </strong>
        <p>
          Hız ({fmt(m.vx)}, {fmt(m.vy)}) m/s; sürat {fmt(m.speed)} m/s. İlk yer
          zamanı {fmt(m.duration)} s, menzil {fmt(m.range)} m. Son sürat{" "}
          {fmt(m.impactSpeed)} m/s.
        </p>
        <p>
          x = ut; y = h − gt²/2; vy = −gt. T = √(2h/g), bu ideal koşulda yatay
          ilk hızdan bağımsızdır. u = 0 seçilirse serbest düşme özel durumu
          görünür.
        </p>
        <p>
          Hava yok, sabit g ve yatay zemin; aynı anda seçilen bileşenlerin
          zamanları ortaktır. Menzil yatay yer değiştirmedir, eğri boyunca
          toplam yol değildir.
        </p>
      </div>
      <Compare
        question="Yalnız yatay ilk hız değişirse ilk yer zamanı?"
        choices={["Aynı kalır", "Artar", "Azalır"]}
        expected="Aynı kalır"
        values={s}
        onChange={change}
      >
        <p>
          Düşey ilk hız sıfırdır. T = √(2 · {height}/{gravity}) ={" "}
          {fmt(m.duration)} s; u bu ifadede yoktur. Menzil uT değişir.
        </p>
      </Compare>
    </Frame>
  );
}
function Oblique() {
  const id = "egik-atis",
    [s, set] = useExploration(exploration(id), {
      height: 0,
      u: 20,
      angle: 45,
      gravity: 10,
      progress: 50,
      phase: "manual",
      guess: "",
      reason: "",
      checked: false,
    }),
    height = integer(s.height, 0, 100, 0),
    u = integer(s.u, 0, 50, 20),
    angle = integer(s.angle, -90, 90, 45),
    gravity = integer(s.gravity, 1, 20, 10),
    progress = integer(s.progress, 0, 100, 50),
    base = { height, speed: u, angle, gravity },
    end = obliqueModel017({ ...base, time: 0 }),
    time = chosenTime(progress, s.phase, end.duration, end.apexTime),
    m = obliqueModel017({ ...base, time }),
    shown = end.duration === 0 ? 0 : Math.round((time / end.duration) * 100),
    initialVy =
      angle === 90
        ? u
        : angle === -90
          ? -u
          : u * Math.sin((angle * Math.PI) / 180),
    change = (p: Partial<typeof s>) =>
      set({ ...p, checked: p.checked ?? false }),
    manual = (progress: number) => change({ progress, phase: "manual" }),
    expected = m.sameLevelFormulaApplies
      ? "Koşul sağlanır"
      : "Genel kök gerekir";
  return (
    <Frame
      id={id}
      title="Tepeyi iki bileşenle keşfet"
      intro="Açı yataydan ölçülür; negatif açı aşağı pike atıştır. Yükseklik farkı varken aynı seviye menzil formülünü bırakıp ilk yer kökünü çöz."
    >
      <div className="physics017-controls">
        <ModelNumber
          label="İlk yükseklik (m)"
          value={height}
          min={0}
          max={100}
          onChange={(height) => change({ height })}
        />
        <ModelNumber
          label="İlk sürat (m/s)"
          value={u}
          min={0}
          max={50}
          onChange={(u) => change({ u })}
        />
        <ModelNumber
          label="Atış açısı (°)"
          value={angle}
          min={-90}
          max={90}
          onChange={(angle) => change({ angle })}
        />
        <ModelNumber
          label="Yer çekimi (m/s²)"
          value={gravity}
          min={1}
          max={20}
          onChange={(gravity) => change({ gravity })}
        />
      </div>
      <TimeControls
        progress={shown}
        change={manual}
        back={() => manual(Math.max(0, shown - 10))}
        forward={() => manual(Math.min(100, shown + 10))}
      >
        <button
          className="secondary"
          disabled={m.apexTime === null}
          onClick={() => change({ phase: "apex" })}
        >
          Tepeye git
        </button>
        <button
          className="secondary"
          onClick={() => change({ phase: "ground", progress: 100 })}
        >
          İlk yere git
        </button>
        <button
          className="secondary"
          onClick={() =>
            change({
              height: 0,
              u: 20,
              angle: 45,
              gravity: 10,
              phase: "apex",
              progress: 50,
            })
          }
        >
          Yerden örneği kur
        </button>
        <button
          className="secondary"
          onClick={() =>
            change({
              height: 40,
              u: 25,
              angle: -37,
              gravity: 10,
              phase: "ground",
              progress: 100,
            })
          }
        >
          Pike örneğini kur
        </button>
      </TimeControls>
      <p>
        Seçim:{" "}
        {s.phase === "apex" && m.apexTime !== null
          ? "Tepe olayı"
          : s.phase === "ground"
            ? "İlk yer teması"
            : "Elle zaman"}
        . Hava yok, g sabit. 37° için keşif gerçek trigonometrik değeri
        kullanır; 0,6/0,8 yaklaşımı kendiliğinden eklenmez.
      </p>
      <FlightScene
        m={m}
        initialHeight={height}
        initialVy={initialVy}
        gravity={gravity}
      />
      <FlightLegend m={m} />
      <div className="physics017-result" data-model-result>
        <strong>
          t = {fmt(m.time)} s: konum ({fmt(m.x)}, {fmt(m.y)}) m.
        </strong>
        <p>
          Hız ({fmt(m.vx)}, {fmt(m.vy)}) m/s; sürat {fmt(m.speed)} m/s. İlk yer{" "}
          {fmt(m.duration)} s; menzil {fmt(m.range)} m; son sürat{" "}
          {fmt(m.impactSpeed)} m/s.
        </p>
        <p>
          {m.apexTime === null
            ? "Gelecekte yükselme tepesi yok."
            : `Tepe ${fmt(m.apexTime)} s ve ${fmt(m.maxHeight)} m; tepe sürati ${fmt(Math.abs(m.vx))} m/s.`}{" "}
          İvme her uçuş anında (0, −{fmt(gravity)}) m/s².
        </p>
        <p>
          {m.sameLevelFormulaApplies
            ? "Aynı seviye ve yukarı atış: R = u² sin2θ/g geçerlidir; bu koşullarda en büyük menzil 45°."
            : "Aynı seviye yukarı atış koşulu sağlanmıyor. İlk yer genel y = h + vy0t − gt²/2 köküyle bulunur; 45°/tamamlayıcı açı kuralı koşulsuz kullanılmaz."}
        </p>
      </div>
      <Compare
        question="R = u² sin2θ/g aynı seviye yukarı atış kuralı bu seçime uygulanır mı?"
        choices={["Koşul sağlanır", "Genel kök gerekir"]}
        expected={expected}
        values={s}
        onChange={change}
      >
        <p>
          Başlangıç yüksekliği {height} m, açı {angle}°. Önce seviyeyi ve yukarı
          başlangıcı kontrol et; genel denklemler bütün izinli dalları çözer.
        </p>
      </Compare>
    </Frame>
  );
}
function Energy() {
  const id = "ayt-enerji-hareket",
    [s, set] = useExploration(exploration(id), {
      mass: 2,
      v0: 10,
      gravity: 10,
      mu: 20,
      k: 100,
      contact: 4,
      progress: 50,
      guess: "",
      reason: "",
      checked: false,
    }),
    mass = integer(s.mass, 1, 10, 2),
    v0 = integer(s.v0, 0, 30, 10),
    gravity = integer(s.gravity, 1, 20, 10),
    mu = integer(s.mu, 0, 100, 20),
    k = integer(s.k, 10, 300, 100),
    contact = integer(s.contact, 0, 20, 4),
    progress = integer(s.progress, 0, 100, 50),
    m = energyModel017({
      mass,
      initialSpeed: v0,
      gravity,
      mu: mu / 100,
      stiffness: k,
      contact,
      progress: progress / 100,
    }),
    change = (p: Partial<typeof s>) =>
      set({ ...p, checked: p.checked ?? false }),
    expected = m.heat > 0 ? "Mekanik azalır" : "Mekanik aynı";
  return (
    <Frame
      id={id}
      title="İlk duruşu enerjiyle bul, alanla doğrula"
      intro="Blok sabit yatay yüzeyde ileri kayar, varsa doğal yayına temas eder. Model ilk duruşta biter; geri salınım veya statik sürtünme dalı kendiliğinden eklenmez."
    >
      <div className="physics017-controls">
        <ModelNumber
          label="Kütle (kg)"
          value={mass}
          min={1}
          max={10}
          onChange={(mass) => change({ mass })}
        />
        <ModelNumber
          label="İlk sürat (m/s)"
          value={v0}
          min={0}
          max={30}
          onChange={(v0) => change({ v0 })}
        />
        <ModelNumber
          label="Yer çekimi (m/s²)"
          value={gravity}
          min={1}
          max={20}
          onChange={(gravity) => change({ gravity })}
        />
        <ModelNumber
          label="μk ×100"
          value={mu}
          min={0}
          max={100}
          onChange={(mu) => change({ mu })}
        />
        <ModelNumber
          label="Yay k (N/m)"
          value={k}
          min={10}
          max={300}
          onChange={(k) => change({ k })}
        />
        <ModelNumber
          label="Yaya uzaklık (m)"
          value={contact}
          min={0}
          max={20}
          onChange={(contact) => change({ contact })}
        />
      </div>
      <p>
        μk = {fmt(mu / 100)}. Yüzey durgun ve yatay; f = μkmg ={" "}
        {fmt(m.friction)} N. Yay ideal ve doğal boydan ölçülür. Konum sürgüsü
        zaman değildir: ilk durma yolunun yüzdesidir.
      </p>
      <TimeControls
        position
        progress={progress}
        change={(progress) => change({ progress })}
        back={() => change({ progress: Math.max(0, progress - 10) })}
        forward={() => change({ progress: Math.min(100, progress + 10) })}
      >
        <button className="secondary" onClick={() => change({ progress: 100 })}>
          İlk duruşa git
        </button>
        <button className="secondary" onClick={() => change({ mu: 0 })}>
          Sürtünmeyi kaldır
        </button>
        <button
          className="secondary"
          onClick={() =>
            change({
              mass: 2,
              v0: 4,
              gravity: 10,
              mu: 20,
              contact: 10,
              k: 100,
              progress: 100,
            })
          }
        >
          Yaya varmadan dur
        </button>
      </TimeControls>
      <ScienceSvg
        kind="block-spring"
        title={`Blok x ${fmt(m.x)} m; ilk duruş ${fmt(m.stop)} m. Sıkışma ${fmt(m.compression)} m; bütün cisimler sabit yüzeye temas eder.`}
        height={320}
      >
        {(w) => {
          const naturalLength = m.maximumCompression + Math.max(1, m.stop / 10),
            wall = contact + naturalLength,
            maxX = Math.max(wall, m.stop, 1),
            X = (x: number) => 60 + ((w - 95) * x) / maxX,
            front = Math.max(contact, m.x),
            sx = X(front),
            ex = X(wall),
            y = 235,
            points = Array.from(
              { length: 13 },
              (_, i) =>
                `${sx + ((ex - sx) * i) / 12},${i === 0 || i === 12 ? y : i % 2 ? y - 8 : y + 8}`,
            ).join(" ");
          return (
            <>
              <text x="14" y="28">
                x (m), + sağa
              </text>
              <path
                d={`M20 250H${w - 14}M${ex} 205V250`}
                className="physics017-surface"
              />
              <path
                d={`M${X(0)} 268H${X(m.stop)}`}
                className="physics017-axis-guide"
              />
              <text x={X(0)} y="298" textAnchor="middle">
                0
              </text>
              {m.stop > 0 && X(m.stop) - X(0) > 75 && (
                <text x={X(m.stop)} y="298" textAnchor="middle">
                  {fmt(m.stop)}
                </text>
              )}
              <polyline
                data-spring="coil"
                points={points}
                className="physics017-tangent"
              />
              <path
                data-spring-contact="natural"
                d={`M${X(contact)} 195V260`}
                className="physics017-axis-guide"
              />
              <rect
                data-body="energy-block"
                data-world-x={m.x}
                x={X(m.x) - 20}
                y="220"
                width="20"
                height="30"
                className="physics017-block"
              />
              <circle
                data-contact-point="block"
                cx={X(m.x)}
                cy="235"
                r="2"
                className="physics017-selected"
              />
            </>
          );
        }}
      </ScienceSvg>
      <p>
        Kesikli dik çizgi doğal yay temasını, yatay çizgi ilk duruş yolunu
        gösterir. Blok altı yüzeye, yay ucu sabit duvara bağlıdır. Yayın
        çizimdeki sarımları ideal model simgesidir; doğal uzunluk ilk sıkışma
        boyunca pozitif kalır.
      </p>
      <ScienceSvg
        kind="energy-bars"
        title={`Enerji bilançosu: kinetik ${fmt(m.kinetic)}, yay ${fmt(m.spring)}, iç enerji aktarımı ${fmt(m.heat)} joule.`}
        height={270}
      >
        {(w) => {
          const left = 55,
            width = w - 80,
            total = Math.max(m.initialK, 1);
          return (
            <>
              <text x="14" y="28">
                Enerji (J)
              </text>
              {[
                { name: "K", value: m.kinetic, kind: "normal" },
                { name: "Us", value: m.spring, kind: "friction" },
                { name: "Q", value: m.heat, kind: "external" },
              ].map((r, i) => (
                <g key={r.name}>
                  <text x="14" y={85 + i * 65}>
                    {r.name}
                  </text>
                  <path
                    d={`M${left} ${80 + i * 65}H${w - 20}`}
                    className="physics017-axis-guide"
                  />
                  <rect
                    data-energy={r.name}
                    data-joules={r.value}
                    x={left}
                    y={65 + i * 65}
                    width={(width * r.value) / total}
                    height="25"
                    className={`physics017-bar physics017-${r.kind}`}
                  />
                </g>
              ))}
            </>
          );
        }}
      </ScienceSvg>
      <ScienceSvg
        kind="energy-force"
        title="Net kuvvet–konum grafiği. Eksen altı alan negatif iştir; kinetik enerji değişimini verir."
        height={350}
      >
        {(w) => {
          const left = 110,
            right = w - 25,
            top = 80,
            bottom = 270,
            maxX = Math.max(m.stop, 1),
            maxF = Math.max(m.friction + k * m.maximumCompression, 1),
            X = (x: number) => left + ((right - left) * x) / maxX,
            Y = (f: number) => top - ((bottom - top) * f) / maxF,
            turn = Math.min(contact, m.stop),
            selectedTurn = Math.min(contact, m.x),
            full = `M${X(0)} ${Y(m.frictionForce)}L${X(turn)} ${Y(m.frictionForce)}L${X(m.stop)} ${Y(m.frictionForce - k * m.maximumCompression)}`,
            area = `M${X(0)} ${Y(0)}L${X(0)} ${Y(m.frictionForce)}L${X(selectedTurn)} ${Y(m.frictionForce)}L${X(m.x)} ${Y(m.netForce)}L${X(m.x)} ${Y(0)}Z`;
          return (
            <>
              <text x="14" y="28">
                Fnet (N)
              </text>
              <text x={w - 14} y="28" textAnchor="end">
                x (m)
              </text>
              <path
                d={`M${left} ${top}H${right}M${left} ${top}V${bottom}`}
                className="physics017-axis"
              />
              <text x={left - 10} y={top + 6} textAnchor="end">
                0
              </text>
              <text x={left - 10} y={bottom + 6} textAnchor="end">
                −{fmt(maxF)}
              </text>
              <text x={left} y={top - 12} textAnchor="middle">
                0
              </text>
              {m.stop > 0 && (
                <text x={X(m.stop)} y={top - 12} textAnchor="middle">
                  {fmt(m.stop)}
                </text>
              )}
              <path
                data-work-area="negative"
                d={area}
                className="physics017-area-negative"
              />
              <path
                data-force-curve="net"
                d={full}
                className="physics017-curve"
              />
              <circle
                data-force-point="selected"
                data-world-x={m.x}
                data-force={m.netForce}
                cx={X(m.x)}
                cy={Y(m.netForce)}
                r="5"
                className="physics017-selected"
              />
              <text x="14" y="326">
                Alan = negatif net iş
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <div className="physics017-result" data-model-result>
        <strong>
          x = {fmt(m.x)} m; sürat {fmt(m.speed)} m/s; ilk duruş {fmt(m.stop)} m.
        </strong>
        <p>
          Sıkışma {fmt(m.compression)} m; ilk en büyük sıkışma{" "}
          {fmt(m.maximumCompression)} m.{" "}
          {m.reachesSpring
            ? "Blok yayı sıkıştırabilir."
            : m.reachesContact
              ? "Blok yalnız doğal temas noktasına ulaşır; sıkışmaz."
              : "Blok yaya varmadan durur."}
        </p>
        <p>
          K = {fmt(m.kinetic)} J; Us = {fmt(m.spring)} J; Q = {fmt(m.heat)} J. K
          + Us + Q = {fmt(m.initialK)} J; mekanik K + Us = {fmt(m.mechanical)}{" "}
          J.
        </p>
        <p>
          Net iş {fmt(m.netWork)} J = K − K0. İlk ileri dalın kuvveti{" "}
          {fmt(m.netForce)} N; anlık net güç {fmt(m.power)} W. İlk duruş
          ucundaki kuvvet kaymanın önceki sınırıdır; bundan sonra yeni rejim
          gerekir.
        </p>
      </div>
      <Compare
        question="Başlangıca göre mekanik K + Us nasıl?"
        choices={["Mekanik azalır", "Mekanik aynı"]}
        expected={expected}
        values={s}
        onChange={change}
      >
        <p>
          Q = {fmt(m.heat)} J; bu aktarım sıfırsa mekanik aynı, pozitifse
          mekanik azalır. Üçlü toplam yine başlangıç {fmt(m.initialK)} J’dür.
        </p>
      </Compare>
    </Frame>
  );
}
export default function Forge017PhysicsLab({ lessonId }: { lessonId: string }) {
  switch (lessonId) {
    case "serbest-dusme-limit-hiz":
      return <Fall />;
    case "dusey-atis":
      return <Vertical />;
    case "yatay-atis":
      return <Horizontal />;
    case "egik-atis":
      return <Oblique />;
    case "ayt-enerji-hareket":
      return <Energy />;
    default:
      return null;
  }
}
