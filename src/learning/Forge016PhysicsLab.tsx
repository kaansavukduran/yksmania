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
  inclineModel016,
  fixedPulleyModel016,
  constantMotion016,
  twoStageModel016,
  type SlidingState016,
  type StageSegment016,
} from "./forge016Physics";
import "./forge016Physics.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Object.is(n, -0) ? 0 : n,
  );
const integer = (n: number, lo: number, hi: number, fallback: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(n) ? n : fallback)));
const exploration = (id: string) => `forge016-physics-${id}`;
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
    <fieldset className="physics016-compare">
      <legend>{question}</legend>
      <div className="physics016-guesses">
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
        <div className="physics016-feedback" role="status">
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
    <section data-forge016={id} className="physics016-lab">
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
    <div className="physics016-select">
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
      data-physics016-plot={kind}
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
function Force({
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
  const dx = x === 0 ? 0 : x,
    dy = y === 0 ? 0 : y;
  return dx === 0 && dy === 0 ? (
    <circle data-force-zero={name} cx={cx} cy={cy} r="3" className={kind} />
  ) : (
    <path
      data-force={name}
      data-x={dx}
      data-y={dy}
      data-scale={scale}
      d={`M${cx} ${cy}L${cx + dx * scale} ${cy - dy * scale}`}
      markerEnd={`url(#${marker})`}
      className={`physics016-force ${kind}`}
    />
  );
}
function Newton() {
  const id = "ayt-newton-hareket-yasalari";
  const [s, set] = useExploration(exploration(id), {
    mode: "incline",
    mass: 4,
    gravity: 10,
    angle: 30,
    force: 0,
    muStatic: 50,
    muKinetic: 25,
    motion: "rest",
    tableMass: 3,
    hangingMass: 2,
    guess: "",
    reason: "",
    checked: false,
  });
  const mass = integer(s.mass, 1, 20, 4),
    gravity = integer(s.gravity, 1, 20, 10),
    angle = integer(s.angle, 0, 70, 30),
    force = integer(s.force, -100, 100, 0),
    muStatic = integer(s.muStatic, 0, 100, 50),
    muKinetic = integer(s.muKinetic, 0, muStatic, 25),
    tableMass = integer(s.tableMass, 1, 20, 3),
    hangingMass = integer(s.hangingMass, 1, 20, 2),
    mode = s.mode === "pulley" ? "pulley" : "incline",
    motion: SlidingState016 = ["rest", "up", "down"].includes(s.motion)
      ? (s.motion as SlidingState016)
      : "rest";
  const m = inclineModel016({
      mass,
      gravity,
      angle,
      force,
      muStatic: muStatic / 100,
      muKinetic: muKinetic / 100,
      motion,
    }),
    p = fixedPulleyModel016(
      tableMass,
      hangingMass,
      gravity,
      muStatic / 100,
      muKinetic / 100,
    ),
    a = mode === "incline" ? m.acceleration : p.acceleration;
  const change = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const theta = (angle * Math.PI) / 180,
    t = { x: Math.cos(theta), y: Math.sin(theta) },
    n = { x: -Math.sin(theta), y: Math.cos(theta) };
  return (
    <Frame
      id={id}
      title="Kuvvetleri seç, rejimi kanıtla"
      intro="Önce cismi ve artı yönü seç. Duran yüzey ile kayan yüzeyde aynı kuvvetin neden başka ivme ürettiğini karşılaştır."
    >
      <Select
        label="Newton modeli"
        value={mode}
        onChange={(mode) => change({ mode })}
        options={[
          ["incline", "Eğik düzlem ve sürtünme"],
          ["pulley", "İdeal sabit makara"],
        ]}
      />
      <div className="physics016-controls">
        {mode === "incline" ? (
          <>
            <ModelNumber
              label="Blok kütlesi (kg)"
              value={mass}
              min={1}
              max={20}
              onChange={(mass) => change({ mass })}
            />
            <ModelNumber
              label="Eğim açısı (°)"
              value={angle}
              min={0}
              max={70}
              onChange={(angle) => change({ angle })}
            />
            <ModelNumber
              label="Paralel dış kuvvet (N)"
              value={force}
              min={-100}
              max={100}
              onChange={(force) => change({ force })}
            />
          </>
        ) : (
          <>
            <ModelNumber
              label="Masa kütlesi (kg)"
              value={tableMass}
              min={1}
              max={20}
              onChange={(tableMass) => change({ tableMass })}
            />
            <ModelNumber
              label="Asılı kütle (kg)"
              value={hangingMass}
              min={1}
              max={20}
              onChange={(hangingMass) => change({ hangingMass })}
            />
          </>
        )}
        <ModelNumber
          label="Yer çekimi ivmesi (m/s²)"
          value={gravity}
          min={1}
          max={20}
          onChange={(gravity) => change({ gravity })}
        />
        <ModelNumber
          label="Statik katsayı ×100"
          value={muStatic}
          min={0}
          max={100}
          onChange={(muStatic) =>
            change({ muStatic, muKinetic: Math.min(muKinetic, muStatic) })
          }
        />
        <ModelNumber
          label="Kinetik katsayı ×100"
          value={muKinetic}
          min={0}
          max={muStatic}
          onChange={(muKinetic) => change({ muKinetic })}
        />
      </div>
      <p>
        μs = {fmt(muStatic / 100)}, μk = {fmt(muKinetic / 100)}. Katsayılar
        boyutsuzdur; kaydırıcı değeri 100’e bölünür.
      </p>
      {mode === "incline" ? (
        <>
          <Select
            label="Anlık kayma durumu"
            value={motion}
            onChange={(motion) => change({ motion })}
            options={[
              ["rest", "Duruyor: statik sınırı denetle"],
              ["up", "Yukarı kayıyor"],
              ["down", "Aşağı kayıyor"],
            ]}
          />
          <div className="physics016-actions">
            <button
              type="button"
              className="secondary"
              onClick={() =>
                change({
                  mode: "incline",
                  mass: 4,
                  gravity: 10,
                  angle: 0,
                  force: 12,
                  muStatic: 50,
                  muKinetic: 25,
                  motion: "rest",
                })
              }
            >
              Durgun dengeyi kur
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() =>
                change({ motion: motion === "up" ? "down" : "up" })
              }
            >
              Kayma yönünü değiştir
            </button>
          </div>
          <ScienceSvg
            kind="incline"
            height={370}
            title={`Eğim ${angle} derece. Gerçek kuvvetler N cinsinden; +x eğimde yukarı, +y yüzeyden dışarı. ${m.regime === "static" ? "Statik denge" : "Kinetik sürtünme"}.`}
          >
            {(w, marker) => {
              const cx = w / 2,
                cy = 218,
                scale =
                  Math.min((w - 82) / 2, 112) /
                  Math.max(
                    m.weight,
                    Math.abs(force),
                    m.normal,
                    Math.abs(m.friction),
                    1,
                  ),
                length = Math.min(190, w - 56),
                surface = { x: cx - n.x * 18, y: cy + n.y * 18 };
              return (
                <>
                  <text x="14" y="30">
                    Kuvvetler (N)
                  </text>
                  <path
                    className="physics016-surface"
                    d={`M${surface.x - (t.x * length) / 2} ${surface.y + (t.y * length) / 2}L${surface.x + (t.x * length) / 2} ${surface.y - (t.y * length) / 2}`}
                  />
                  <rect
                    x={cx - 17}
                    y={cy - 17}
                    width="34"
                    height="34"
                    transform={`rotate(${-angle} ${cx} ${cy})`}
                    className="physics016-block"
                  />
                  <path
                    className="physics016-axis-guide"
                    d={`M${cx - t.x * 106} ${cy + t.y * 106}L${cx + t.x * 106} ${cy - t.y * 106}M${cx + n.x * 106} ${cy - n.y * 106}L${cx} ${cy}`}
                  />
                  <text x={cx + t.x * 106 + 6} y={cy - t.y * 106 - 12}>
                    +x
                  </text>
                  <text x={cx + n.x * 106 - 14} y={cy - n.y * 106 - 12}>
                    +y
                  </text>
                  <Force
                    name="weight"
                    x={0}
                    y={-m.weight}
                    cx={cx}
                    cy={cy}
                    scale={scale}
                    marker={marker}
                    kind="physics016-weight"
                  />
                  <Force
                    name="normal"
                    x={n.x * m.normal}
                    y={n.y * m.normal}
                    cx={cx}
                    cy={cy}
                    scale={scale}
                    marker={marker}
                    kind="physics016-normal"
                  />
                  <Force
                    name="external"
                    x={t.x * force}
                    y={t.y * force}
                    cx={cx}
                    cy={cy}
                    scale={scale}
                    marker={marker}
                    kind="physics016-external"
                  />
                  <Force
                    name="friction"
                    x={t.x * m.friction}
                    y={t.y * m.friction}
                    cx={cx}
                    cy={cy}
                    scale={scale}
                    marker={marker}
                    kind="physics016-friction"
                  />
                </>
              );
            }}
          </ScienceSvg>
          <ul className="physics016-legend">
            <li>
              <span className="physics016-swatch physics016-weight" />
              Ağırlık: {fmt(m.weight)} N, düşey aşağı.
            </li>
            <li>
              <span className="physics016-swatch physics016-normal" />
              Normal: {fmt(m.normal)} N, yüzeyden dışarı.
            </li>
            <li>
              <span className="physics016-swatch physics016-external" />
              Dış kuvvet: {fmt(force)} N, işareti +x’e göre.
            </li>
            <li>
              <span className="physics016-swatch physics016-friction" />
              Sürtünme: {fmt(m.friction)} N, işareti +x’e göre.
            </li>
          </ul>
          <p>
            Blok ve yüzey sabittir; bu çizim bir anın kuvvet diyagramıdır.
            Kesikli x–y çizgileri eksendir, ek kuvvet değildir. Dış kuvvet eğime
            paralel; yüzeye dik ivme sıfırdır.
          </p>
        </>
      ) : (
        <>
          <ScienceSvg
            kind="pulley"
            height={360}
            title={`İdeal sabit makara. Masa bloğu için sağ, asılı blok için aşağı artı. İp gergin ve uzamaz; gerilme ${fmt(p.tension)} N.`}
          >
            {(w, marker) => {
              const right = w - 55,
                bx = 65,
                by = 140,
                hy = 255,
                scale =
                  Math.min(66, (w - 90) / 2) /
                  Math.max(p.normal, p.hangingWeight, p.tension, p.friction, 1);
              return (
                <>
                  <text x="14" y="30">
                    Kuvvetler (N)
                  </text>
                  <path
                    className="physics016-surface"
                    d={`M20 159H${right}V325`}
                  />
                  <rect
                    x={bx - 17}
                    y={by - 17}
                    width="34"
                    height="34"
                    className="physics016-block"
                  />
                  <circle
                    cx={right}
                    cy={by}
                    r="14"
                    className="physics016-pulley"
                  />
                  <path
                    className="physics016-rope"
                    d={`M${bx + 17} ${by - 14}H${right}A14 14 0 0 1 ${right + 14} ${by}V${hy - 17}`}
                  />
                  <rect
                    x={right - 3}
                    y={hy - 17}
                    width="34"
                    height="34"
                    className="physics016-block"
                  />
                  <Force
                    name="table-tension"
                    x={p.tension}
                    y={0}
                    cx={bx}
                    cy={by}
                    scale={scale}
                    marker={marker}
                    kind="physics016-external"
                  />
                  <Force
                    name="table-friction"
                    x={-p.friction}
                    y={0}
                    cx={bx}
                    cy={by}
                    scale={scale}
                    marker={marker}
                    kind="physics016-friction"
                  />
                  <Force
                    name="table-normal"
                    x={0}
                    y={p.normal}
                    cx={bx}
                    cy={by}
                    scale={scale}
                    marker={marker}
                    kind="physics016-normal"
                  />
                  <Force
                    name="table-weight"
                    x={0}
                    y={-p.normal}
                    cx={bx}
                    cy={by}
                    scale={scale}
                    marker={marker}
                    kind="physics016-weight"
                  />
                  <Force
                    name="hanging-tension"
                    x={0}
                    y={p.tension}
                    cx={right + 14}
                    cy={hy}
                    scale={scale}
                    marker={marker}
                    kind="physics016-external"
                  />
                  <Force
                    name="hanging-weight"
                    x={0}
                    y={-p.hangingWeight}
                    cx={right + 14}
                    cy={hy}
                    scale={scale}
                    marker={marker}
                    kind="physics016-weight"
                  />
                  <text x="20" y="225">
                    Masa: sağ +
                  </text>
                  <text x="20" y="320">
                    Asılı: aşağı +
                  </text>
                </>
              );
            }}
          </ScienceSvg>
          <p>
            Başlangıçta iki blok duruyor. İp ve makara kütlesiz; makara sabit ve
            sürtünmesizdir. Renkler ağırlık, normal, gerilme ve sürtünmeyi
            ayırır. Bu düzen hareketli makaranın aL = 2aK kısıtı değildir.
          </p>
        </>
      )}
      <div data-model-result className="physics016-result">
        {mode === "incline" ? (
          <>
            <strong>İvme: {fmt(m.acceleration)} m/s²</strong>
            <p>
              Rejim:{" "}
              {m.regime === "static" ? "Statik denge" : "Kinetik sürtünme"}.
              Normal: {fmt(m.normal)} N. Statik sınır: {fmt(m.staticLimit)} N.
            </p>
            <p>
              +x eğimde yukarı. Sürtünme dışındaki bileşke D = {fmt(m.driving)}{" "}
              N; sürtünme = {fmt(m.friction)} N; net = {fmt(m.net)} N.
            </p>
          </>
        ) : (
          <>
            <strong>
              İvme: {fmt(p.acceleration)} m/s²; gerilme: {fmt(p.tension)} N
            </strong>
            <p>
              Rejim:{" "}
              {p.regime === "static" ? "Statik denge" : "Asılı aşağı kayar"}.
              Asılı ağırlık: {fmt(p.hangingWeight)} N; masa statik sınırı:{" "}
              {fmt(p.staticLimit)} N; sürtünme büyüklüğü: {fmt(p.friction)} N.
            </p>
            <p>
              Masa bloğunun ağırlığı ve normali ayrı ayrı {fmt(p.normal)} N’dır.
            </p>
            <p>
              Masa: T − f = {fmt(tableMass * p.acceleration)} N. Asılı: mg − T ={" "}
              {fmt(hangingMass * p.acceleration)} N.
            </p>
          </>
        )}
      </div>
      <Compare
        question="Seçili artı eksene göre ivmenin işareti?"
        choices={["Pozitif ivme", "İvme sıfır", "Negatif ivme"]}
        expected={
          a === 0 ? "İvme sıfır" : a > 0 ? "Pozitif ivme" : "Negatif ivme"
        }
        values={s}
        onChange={set}
      >
        <p>
          {mode === "incline"
            ? `D = ${fmt(m.driving)} N. ${m.regime === "static" ? "Statik sürtünme gereken karşı kuvveti sınırı içinde sağlar." : "Kinetik sürtünmenin yönü seçilen göreli kaymaya karşıdır."}`
            : `Asılı ağırlık ${fmt(p.hangingWeight)} N ve statik üst sınır ${fmt(p.staticLimit)} N; ${p.regime === "static" ? "denge mümkündür." : "kayma sonrası iki alt cismin denklemleri aynı ivmeyi verir."}`}
        </p>
      </Compare>
    </Frame>
  );
}
function Motion() {
  const id = "bir-boyutta-sabit-ivmeli-hareket";
  const [s, set] = useExploration(exploration(id), {
    x0: 10,
    v0: 12,
    a: -3,
    duration: 6,
    time: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const x0 = integer(s.x0, -50, 50, 10),
    v0 = integer(s.v0, -20, 20, 12),
    a = integer(s.a, -6, 6, -3),
    duration = integer(s.duration, 1, 12, 6),
    time = integer(s.time, 0, duration, 0),
    m = constantMotion016({ x0, v0, acceleration: a, duration, time });
  const change = (v: Partial<typeof s>) => set({ ...v, checked: false }),
    turnInside =
      m.turningTime !== null && m.turningTime > 0 && m.turningTime < time,
    expected = turnInside ? "Yol daha büyük" : "Eşit";
  const move = (time: number) =>
    change({ time: Math.max(0, Math.min(duration, time)) });
  return (
    <Frame
      id={id}
      title="Dönüşü gör, yolu parçalara ayır"
      intro="Zamanı kaydır veya adımla. Aynı hareketin konumunu, hız yönünü ve biriktirdiği yolu karşılaştır; bütün [0, T] yörüngesinin konum ölçeği zaman boyunca sabittir."
    >
      <div className="physics016-controls">
        <ModelNumber
          label="İlk konum (m)"
          value={x0}
          min={-50}
          max={50}
          onChange={(x0) => change({ x0 })}
        />
        <ModelNumber
          label="İlk hız (m/s)"
          value={v0}
          min={-20}
          max={20}
          onChange={(v0) => change({ v0 })}
        />
        <ModelNumber
          label="Sabit ivme (m/s²)"
          value={a}
          min={-6}
          max={6}
          onChange={(a) => change({ a })}
        />
        <ModelNumber
          label="Toplam süre T (s)"
          value={duration}
          min={1}
          max={12}
          onChange={(duration) =>
            change({ duration, time: Math.min(time, duration) })
          }
        />
        <ModelNumber
          label="Seçili zaman (s)"
          value={time}
          min={0}
          max={duration}
          onChange={(time) => change({ time })}
        />
      </div>
      <div className="physics016-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => move(time - 1)}
          disabled={time === 0}
        >
          1 s geri
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => move(time + 1)}
          disabled={time === duration}
        >
          1 s ilerle
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() =>
            change({ x0: 10, v0: 12, a: -3, duration: 6, time: 6 })
          }
        >
          Dönüşten sonrasını gör
        </button>
      </div>
      <ScienceSvg
        kind="motion-position"
        height={220}
        title={`Pozitif yön sağ. ${time} saniyede x ${fmt(m.position)} metre. Başlangıç ${x0} metre; konum ölçeği bütün ${duration} saniyelik yörüngeye göre sabittir.`}
      >
        {(w, marker) => {
          const span = Math.max(4, m.maximumPosition - m.minimumPosition),
            lo = m.minimumPosition - span * 0.15,
            hi = m.maximumPosition + span * 0.15,
            x = (value: number) => 48 + ((value - lo) / (hi - lo)) * (w - 78),
            turn =
              m.turningTime !== null &&
              m.turningTime > 0 &&
              m.turningTime < time
                ? constantMotion016({
                    x0,
                    v0,
                    acceleration: a,
                    duration,
                    time: m.turningTime,
                  }).position
                : null;
          return (
            <>
              <text x="14" y="30">
                Konum (m)
              </text>
              <path
                className="physics016-axis"
                d={`M30 120H${w - 18}`}
                markerEnd={`url(#${marker})`}
              />
              <path
                className="physics016-axis-guide"
                d={`M${x(m.minimumPosition)} 90H${x(m.maximumPosition)}`}
              />
              <path
                data-motion-path
                data-distance={m.distance}
                className="physics016-travelled"
                d={`M${x(x0)} 90${turn === null ? "" : `H${x(turn)}`}H${x(m.position)}`}
              />
              {[
                m.minimumPosition,
                (m.minimumPosition + m.maximumPosition) / 2,
                m.maximumPosition,
              ]
                .filter((value, i, values) => values.indexOf(value) === i)
                .map((value) => (
                  <g key={value}>
                    <path
                      className="physics016-axis"
                      d={`M${x(value)} 114V128`}
                    />
                    <text x={x(value)} y="165" textAnchor="middle">
                      {fmt(value)}
                    </text>
                  </g>
                ))}
              <circle cx={x(x0)} cy="90" r="4" className="physics016-initial" />
              <circle
                data-position-point
                data-time={time}
                data-world-x={m.position}
                cx={x(m.position)}
                cy="120"
                r="7"
                className="physics016-selected"
              />
              <text x={w - 18} y="198" textAnchor="end">
                +x sağ
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <ScienceSvg
        kind="motion-vectors"
        height={260}
        title={`Seçili anın yönlü hızı ${fmt(m.velocity)} metre bölü saniye ve ivmesi ${a} metre bölü saniye kare. İki satır farklı birim ve ayrı ölçek taşır.`}
      >
        {(w, marker) => {
          const cx = w / 2,
            limit = (w - 70) / 2,
            vs = limit / Math.max(1, Math.abs(v0), Math.abs(m.finalVelocity)),
            as = limit / Math.max(1, Math.abs(a));
          return (
            <>
              <text x="14" y="28">
                Hız (m/s)
              </text>
              <path className="physics016-axis-guide" d={`M25 82H${w - 20}`} />
              <Force
                name="velocity"
                x={m.velocity}
                y={0}
                cx={cx}
                cy={82}
                scale={vs}
                marker={marker}
                kind="physics016-external"
              />
              <text x="14" y="156">
                İvme (m/s²)
              </text>
              <path className="physics016-axis-guide" d={`M25 210H${w - 20}`} />
              <Force
                name="acceleration"
                x={a}
                y={0}
                cx={cx}
                cy={210}
                scale={as}
                marker={marker}
                kind="physics016-normal"
              />
              <text x={w - 18} y="242" textAnchor="end">
                + sağ
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <p>
        Kesikli konum yolu bütün aralığı, renkli yol seçili ana kadar izlenen
        rotayı gösterir. Hız ve ivme satırlarının ölçekleri ayrıdır; iki farklı
        birimin ok uzunluğu karşılaştırılmaz. Hareket elle adımlanır.
      </p>
      <div data-model-result className="physics016-result">
        <strong>
          t = {time} s: konum {fmt(m.position)} m; hız {fmt(m.velocity)} m/s
        </strong>
        <p>
          Sürat: {fmt(m.speed)} m/s. Yer değiştirme: {fmt(m.displacement)} m.
          Alınan yol: {fmt(m.distance)} m.
        </p>
        <p>
          Ortalama hız:{" "}
          {m.averageVelocity === null
            ? "Süre sıfır: tanımsız"
            : `${fmt(m.averageVelocity)} m/s`}
          ; ortalama sürat:{" "}
          {m.averageSpeed === null
            ? "Süre sıfır: tanımsız"
            : `${fmt(m.averageSpeed)} m/s`}
          .
        </p>
        <p>
          {m.turningTime === null
            ? "Seçili toplam sürede hız sıfırı yok."
            : `Hız sıfırı: ${fmt(m.turningTime)} s. Aralık ucundaki sıfır, aralığın içinde dönüş demek değildir.`}
        </p>
      </div>
      <Compare
        question="Seçili ana kadar yol ile |yer değiştirme| ilişkisi?"
        choices={["Yol daha büyük", "Eşit"]}
        expected={expected}
        values={s}
        onChange={set}
      >
        <p>
          {turnInside
            ? `Hız sıfırı ${fmt(m.turningTime!)} s anında aralığın içindedir; gidiş ve dönüş yolu toplanır.`
            : "Bu ana kadar aralığın içinde yön değişimi yoktur; yol yer değiştirmenin mutlak değeridir."}{" "}
          Yer değiştirme {fmt(m.displacement)} m, yol {fmt(m.distance)} m.
        </p>
      </Compare>
    </Frame>
  );
}
function Graphs() {
  const id = "sabit-ivmeli-hareket-grafikleri";
  const [s, set] = useExploration(exploration(id), {
    x0: 10,
    v0: -1,
    a1: 2,
    a2: -1,
    switchTime: 2,
    duration: 5,
    time: 0,
    from: 0,
    to: 5,
    guess: "",
    reason: "",
    checked: false,
  });
  const x0 = integer(s.x0, -50, 50, 10),
    v0 = integer(s.v0, -15, 15, -1),
    a1 = integer(s.a1, -5, 5, 2),
    a2 = integer(s.a2, -5, 5, -1),
    duration = integer(s.duration, 1, 12, 5),
    switchTime = integer(s.switchTime, 0, duration, 2),
    time = integer(s.time, 0, duration, 0),
    from = integer(s.from, 0, duration, 0),
    to = integer(s.to, from, duration, duration),
    input = { x0, v0, a1, a2, duration, switchTime, time, from, to },
    m = twoStageModel016(input),
    change = (v: Partial<typeof s>) => set({ ...v, checked: false }),
    expected =
      m.interval.positiveArea > 0 && m.interval.negativeArea < 0
        ? "Yol daha büyük"
        : "Eşit";
  return (
    <Frame
      id={id}
      title="Aynı anı üç grafikte takip et"
      intro="İki ayrı sabit ivmeli evreyi birleştir. Ortak zaman imlecini ve alan aralığını değiştir; x–t teğeti, v–t alanı ve a–t alanı aynı hareketi doğrulasın."
    >
      <div className="physics016-controls">
        <ModelNumber
          label="İlk konum (m)"
          value={x0}
          min={-50}
          max={50}
          onChange={(x0) => change({ x0 })}
        />
        <ModelNumber
          label="İlk hız (m/s)"
          value={v0}
          min={-15}
          max={15}
          onChange={(v0) => change({ v0 })}
        />
        <ModelNumber
          label="Birinci ivme (m/s²)"
          value={a1}
          min={-5}
          max={5}
          onChange={(a1) => change({ a1 })}
        />
        <ModelNumber
          label="İkinci ivme (m/s²)"
          value={a2}
          min={-5}
          max={5}
          onChange={(a2) => change({ a2 })}
        />
        <ModelNumber
          label="Toplam süre T (s)"
          value={duration}
          min={1}
          max={12}
          onChange={(duration) =>
            change({
              duration,
              switchTime: Math.min(switchTime, duration),
              time: Math.min(time, duration),
              from: Math.min(from, duration),
              to: Math.min(to, duration),
            })
          }
        />
        <ModelNumber
          label="Evre geçişi (s)"
          value={switchTime}
          min={0}
          max={duration}
          onChange={(switchTime) => change({ switchTime })}
        />
        <ModelNumber
          label="Ortak zaman (s)"
          value={time}
          min={0}
          max={duration}
          onChange={(time) => change({ time })}
        />
        <ModelNumber
          label="Alan başlangıcı (s)"
          value={from}
          min={0}
          max={duration}
          onChange={(from) => change({ from, to: Math.max(from, to) })}
        />
        <ModelNumber
          label="Alan sonu (s)"
          value={to}
          min={from}
          max={duration}
          onChange={(to) => change({ to })}
        />
      </div>
      <div className="physics016-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => change({ time: Math.min(duration, time + 1) })}
          disabled={time === duration}
        >
          1 s ilerle
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => change({ time: 0 })}
          disabled={time === 0}
        >
          Başa dön
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => change({ x0: x0 + 10 })}
          disabled={x0 > 40}
        >
          İlk konumu +10 m kaydır
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() =>
            change({
              x0: 10,
              v0: -1,
              a1: 2,
              a2: -1,
              switchTime: 2,
              duration: 5,
              time: 5,
              from: 0,
              to: 5,
            })
          }
        >
          İki evre örneğini kur
        </button>
      </div>
      {(["position", "velocity", "acceleration"] as const).map((kind) => (
        <figure key={kind} className="physics016-figure">
          <figcaption>
            {kind === "position"
              ? "Konum–zaman: teğet hızdır"
              : kind === "velocity"
                ? "Hız–zaman: işaretli alan yer değiştirmedir"
                : "İvme–zaman: işaretli alan hız değişimidir"}
          </figcaption>
          <ScienceSvg
            kind={`graph-${kind}`}
            height={300}
            title={`${kind === "position" ? "Konum metre" : kind === "velocity" ? "Hız metre bölü saniye" : "İvme metre bölü saniye kare"}; yatay eksen zaman saniye. Seçili an ${time} saniye; alan aralığı ${from} ile ${to} saniye.`}
          >
            {(w, marker) => {
              const values =
                  kind === "position"
                    ? [m.minimumPosition, m.maximumPosition]
                    : kind === "velocity"
                      ? [v0, m.boundary.velocity, m.end.velocity]
                      : [a1, a2],
                low = Math.min(0, ...values),
                high = Math.max(0, ...values),
                span = Math.max(2, high - low),
                min = low - span * 0.15,
                max = high + span * 0.15,
                tx = (t: number) => 64 + (t / duration) * (w - 88),
                y = (v: number) => 225 - ((v - min) / (max - min)) * 145,
                cur =
                  kind === "position"
                    ? m.current.position
                    : kind === "velocity"
                      ? m.current.velocity
                      : m.current.acceleration;
              const path = (seg: StageSegment016) => {
                const dt = seg.end - seg.start;
                if (dt <= 0) return "";
                const endX =
                    seg.position +
                    seg.velocity * dt +
                    (seg.acceleration * dt * dt) / 2,
                  endV = seg.velocity + seg.acceleration * dt;
                return kind === "position"
                  ? `M${tx(seg.start)} ${y(seg.position)}Q${tx((seg.start + seg.end) / 2)} ${y(seg.position + (seg.velocity * dt) / 2)} ${tx(seg.end)} ${y(endX)}`
                  : kind === "velocity"
                    ? `M${tx(seg.start)} ${y(seg.velocity)}L${tx(seg.end)} ${y(endV)}`
                    : `M${tx(seg.start)} ${y(seg.acceleration)}H${tx(seg.end)}`;
              };
              const yTicks = [low, (low + high) / 2, high].filter(
                  (v, i, list) => list.indexOf(v) === i,
                ),
                unit =
                  kind === "position"
                    ? "x (m)"
                    : kind === "velocity"
                      ? "v (m/s)"
                      : "a (m/s²)",
                tangentDt = Math.max(
                  0,
                  Math.min(
                    duration * 0.12,
                    time,
                    duration - time,
                    ...(m.current.velocity === 0
                      ? []
                      : [
                          (m.current.position - min) /
                            Math.abs(m.current.velocity),
                          (max - m.current.position) /
                            Math.abs(m.current.velocity),
                        ]),
                  ),
                ),
                tangentStart = time - tangentDt,
                tangentEnd = time + tangentDt;
              return (
                <>
                  <defs>
                    <pattern
                      id={`${marker}-negative-area`}
                      width="7"
                      height="7"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M-1 1L1 -1M0 7L7 0M6 8L8 6"
                        stroke="var(--accent)"
                        strokeWidth="2"
                        fill="none"
                      />
                    </pattern>
                  </defs>
                  <text x="12" y="30">
                    {unit}
                  </text>
                  <text x={w - 16} y="30" textAnchor="end">
                    t (s)
                  </text>
                  {yTicks.map((v) => (
                    <g key={v}>
                      <path
                        className="physics016-grid"
                        d={`M64 ${y(v)}H${w - 24}`}
                      />
                      <text
                        x="55"
                        y={y(v)}
                        dominantBaseline="middle"
                        textAnchor="end"
                      >
                        {fmt(v)}
                      </text>
                    </g>
                  ))}
                  {[0, duration / 2, duration].map((t) => (
                    <g key={t}>
                      <path
                        className="physics016-grid"
                        d={`M${tx(t)} 80V225`}
                      />
                      <text x={tx(t)} y="264" textAnchor="middle">
                        {fmt(t)}
                      </text>
                    </g>
                  ))}
                  <path
                    className="physics016-axis"
                    d={`M64 230V70M60 ${y(0)}H${w - 18}`}
                    markerEnd={`url(#${marker})`}
                  />
                  {kind === "velocity" &&
                    m.areaPieces.map((part, i) => (
                      <path
                        key={i}
                        data-velocity-area
                        data-start={part.start}
                        data-end={part.end}
                        data-area={part.area}
                        style={
                          part.area < 0
                            ? { fill: `url(#${marker}-negative-area)` }
                            : undefined
                        }
                        d={`M${tx(part.start)} ${y(0)}L${tx(part.start)} ${y(part.vStart)}L${tx(part.end)} ${y(part.vEnd)}L${tx(part.end)} ${y(0)}Z`}
                        className={
                          part.area < 0
                            ? "physics016-area-negative"
                            : "physics016-area-positive"
                        }
                      />
                    ))}
                  {m.segments.map((seg, i) => (
                    <path
                      key={i}
                      data-graph-segment={i}
                      data-start={seg.start}
                      data-end={seg.end}
                      d={path(seg)}
                      className="physics016-curve"
                    />
                  ))}
                  {kind === "position" && tangentDt > 0 && (
                    <path
                      data-tangent
                      className="physics016-tangent"
                      d={`M${tx(tangentStart)} ${y(m.current.position - m.current.velocity * tangentDt)}L${tx(tangentEnd)} ${y(m.current.position + m.current.velocity * tangentDt)}`}
                    />
                  )}
                  <path className="physics016-time" d={`M${tx(time)} 70V230`} />
                  <circle
                    data-graph-point={kind}
                    data-time={time}
                    data-value={cur}
                    cx={tx(time)}
                    cy={y(cur)}
                    r="5"
                    className="physics016-selected"
                  />
                </>
              );
            }}
          </ScienceSvg>
        </figure>
      ))}
      <p>
        Alan renkleri: pozitif katkı yeşil, negatif katkı taralı kızıl alandır.
        Birimler her panelde ayrıdır; görünür çizim açısı yerine gerçek
        koordinat farklarını kullan. İç geçişte seçili ivme ikinci evreye
        aittir; sıfır süreli son evre yeni alan üretmez.
      </p>
      <div data-model-result className="physics016-result">
        <strong>
          t = {time} s: x = {fmt(m.current.position)} m; v ={" "}
          {fmt(m.current.velocity)} m/s; a = {fmt(m.current.acceleration)} m/s²
        </strong>
        <p>
          [{from}; {to}] s aralığı: pozitif hız alanı{" "}
          {fmt(m.interval.positiveArea)} m; negatif hız alanı{" "}
          {fmt(m.interval.negativeArea)} m.
        </p>
        <p>
          Yer değiştirme: {fmt(m.interval.displacement)} m; yol:{" "}
          {fmt(m.interval.distance)} m; hız değişimi:{" "}
          {fmt(m.interval.deltaVelocity)} m/s.
        </p>
        <p>
          Ortalama hız:{" "}
          {m.interval.averageVelocity === null
            ? "Süre sıfır: tanımsız"
            : `${fmt(m.interval.averageVelocity)} m/s`}
          ; ortalama sürat:{" "}
          {m.interval.averageSpeed === null
            ? "Süre sıfır: tanımsız"
            : `${fmt(m.interval.averageSpeed)} m/s`}
          .
        </p>
        <p>
          Geçişte konum {fmt(m.boundary.position)} m ve hız{" "}
          {fmt(m.boundary.velocity)} m/s; ikinci parça bu değerlerden başlar.
        </p>
      </div>
      <Compare
        question="Seçili aralıkta yol ile |yer değiştirme| ilişkisi?"
        choices={["Yol daha büyük", "Eşit"]}
        expected={expected}
        values={s}
        onChange={set}
      >
        <p>
          {m.interval.positiveArea > 0 && m.interval.negativeArea < 0
            ? "Aralık hem pozitif hem negatif hız alanı içeriyor; yön değişiminin iki tarafı yol hesabında toplanır."
            : "Bu aralıkta zıt işaretli hız alanları birlikte yoktur; yol işaretli toplamın mutlak değeridir."}{" "}
          a–t alanı yalnız Δv verir; son hız için ilk hız gerekir.
        </p>
      </Compare>
    </Frame>
  );
}
export default function Forge016PhysicsLab({ lessonId }: { lessonId: string }) {
  return lessonId === "ayt-newton-hareket-yasalari" ? (
    <Newton />
  ) : lessonId === "bir-boyutta-sabit-ivmeli-hareket" ? (
    <Motion />
  ) : lessonId === "sabit-ivmeli-hareket-grafikleri" ? (
    <Graphs />
  ) : null;
}
