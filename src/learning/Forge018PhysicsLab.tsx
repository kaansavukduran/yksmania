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
  impulse018,
  collision018,
  concurrent018,
  torque018,
  centre018,
  pulley018,
  ramp018,
  coulomb018,
  type Vector018,
} from "./forge018Physics";
import "./forge018Physics.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(n) < 0.5 * 10 ** -digits ? 0 : n,
  );
const integer = (n: number, lo: number, hi: number, fallback: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(n) ? n : fallback)));
const exploration = (id: string) => `forge018-physics-${id}`;
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
    <fieldset className="physics018-compare">
      <legend>{question}</legend>
      <div className="physics018-guesses">
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
        <div className="physics018-feedback" role="status">
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
    <section data-forge018={id} className="physics018-lab">
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
    <div className="physics018-select">
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
      data-physics018-plot={kind}
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
  kind = "physics018-external",
}: {
  name: string;
  vector: Vector018;
  origin: Vector018;
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
      className={`physics018-force ${kind}`}
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
    <div data-model-result className="physics018-result">
      {children}
    </div>
  );
}
function ForceChart({
  forceA,
  forceB,
  durationA,
  durationB,
  time,
}: {
  forceA: number;
  forceB: number;
  durationA: number;
  durationB: number;
  time: number;
}) {
  const total = durationA + durationB,
    max = Math.max(1, Math.abs(forceA), Math.abs(forceB));
  return (
    <figure className="physics018-figure">
      <figcaption>Net kuvvet–zaman: seçili ana kadar işaretli alan</figcaption>
      <ScienceSvg
        title={`Net kuvvet: ilk ${durationA} saniye ${forceA} newton; sonraki ${durationB} saniye ${forceB} newton.`}
        kind="force-time"
        height={270}
      >
        {(w) => {
          const left = 76,
            right = w - 24,
            top = 35,
            bottom = 218,
            mid = (top + bottom) / 2,
            s = (bottom - top) / 2 / max,
            x = (t: number) => left + (t / total) * (right - left),
            y = (f: number) => mid - f * s;
          return (
            <>
              <path
                className="physics018-axis"
                d={`M${left} ${top}V${bottom}M${left} ${mid}H${right}`}
              />
              {[-max, 0, max].map((f) => (
                <text key={f} x={left - 9} y={y(f) + 5} textAnchor="end">
                  {fmt(f)}
                </text>
              ))}
              <text x={left} y={20}>
                F (N)
              </text>
              <text x={right} y={255} textAnchor="end">
                t (s)
              </text>
              {[0, durationA, total].map((t) => (
                <text key={t} x={x(t)} y={bottom + 21} textAnchor="middle">
                  {fmt(t)}
                </text>
              ))}
              {[
                [0, Math.min(time, durationA), forceA],
                [durationA, Math.max(0, time - durationA), forceB],
              ].map(([start, dur, f], i) =>
                dur > 0 && f !== 0 ? (
                  <rect
                    key={i}
                    data-area={`force-${i + 1}`}
                    data-impulse={dur * f}
                    x={x(start)}
                    y={Math.min(mid, y(f))}
                    width={x(start + dur) - x(start)}
                    height={Math.abs(y(f) - mid)}
                    className={
                      f > 0
                        ? "physics018-area-positive"
                        : "physics018-area-negative"
                    }
                  />
                ) : null,
              )}
              <path
                data-force-steps
                d={`M${x(0)} ${y(forceA)}H${x(durationA)}V${y(forceB)}H${x(total)}`}
                className="physics018-curve"
              />
              <path
                data-selected-time={time}
                className="physics018-time"
                d={`M${x(time)} ${top}V${bottom}`}
              />
            </>
          );
        }}
      </ScienceSvg>
    </figure>
  );
}
function MomentumChart({
  mass,
  initialVelocity,
  forceA,
  forceB,
  durationA,
  durationB,
  time,
}: {
  mass: number;
  initialVelocity: number;
  forceA: number;
  forceB: number;
  durationA: number;
  durationB: number;
  time: number;
}) {
  const total = durationA + durationB,
    p0 = mass * initialVelocity,
    p1 = p0 + forceA * durationA,
    p2 = p1 + forceB * durationB,
    max = Math.max(1, Math.abs(p0), Math.abs(p1), Math.abs(p2));
  return (
    <figure className="physics018-figure">
      <figcaption>Momentum–zaman: eğim net kuvveti verir</figcaption>
      <ScienceSvg
        title={`İlk momentum ${fmt(p0)}, kuvvet değişiminde ${fmt(p1)}, sonda ${fmt(p2)} kilogram metre bölü saniye.`}
        kind="momentum-time"
        height={270}
      >
        {(w) => {
          const l = 94,
            r = w - 24,
            top = 35,
            b = 218,
            mid = (top + b) / 2,
            x = (t: number) => l + (t / total) * (r - l),
            y = (p: number) => mid - ((p / max) * (b - top)) / 2;
          return (
            <>
              <path
                className="physics018-axis"
                d={`M${l} ${top}V${b}M${l} ${mid}H${r}`}
              />
              {[-max, 0, max].map((p) => (
                <text key={p} x={l - 8} y={y(p) + 5} textAnchor="end">
                  {fmt(p)}
                </text>
              ))}
              <text x={l} y={20}>
                p (kg·m/s)
              </text>
              <text x={r} y={255} textAnchor="end">
                t (s)
              </text>
              {[0, durationA, total].map((t) => (
                <text key={t} x={x(t)} y={b + 21} textAnchor="middle">
                  {fmt(t)}
                </text>
              ))}
              <path
                data-momentum-line
                d={`M${x(0)} ${y(p0)}L${x(durationA)} ${y(p1)}L${x(total)} ${y(p2)}`}
                className="physics018-curve"
              />
              <path className="physics018-time" d={`M${x(time)} ${top}V${b}`} />
            </>
          );
        }}
      </ScienceSvg>
    </figure>
  );
}
function CollisionScene({
  after,
  model,
}: {
  after: boolean;
  model: ReturnType<typeof collision018>;
}) {
  const va = after ? model.afterA : model.velocityA,
    vb = after ? model.afterB : model.velocityB;
  return (
    <figure className="physics018-figure">
      <figcaption>
        {after ? "Çarpışmadan hemen sonra" : "Çarpışmadan hemen önce"}: hız
        vektörleri
      </figcaption>
      <ScienceSvg
        title={`A hızı ${fmt(va)}, B hızı ${fmt(vb)} metre bölü saniye; anlık karşılaştırma, konum animasyonu değildir.`}
        kind="collision"
        height={240}
      >
        {(w, marker) => {
          const a = w * 0.3,
            b = w * 0.7,
            scale = (w * 0.24) / Math.max(1, Math.abs(va), Math.abs(vb));
          return (
            <>
              <path className="physics018-surface" d={`M20 172H${w - 20}`} />
              <Arrow
                name="velocity-A"
                vector={{ x: va, y: 0 }}
                origin={{ x: a, y: 74 }}
                scale={scale}
                marker={marker}
              />
              <Arrow
                name="velocity-B"
                vector={{ x: vb, y: 0 }}
                origin={{ x: b, y: 115 }}
                scale={scale}
                marker={marker}
                kind="physics018-normal"
              />
              <rect
                className="physics018-block"
                data-body="A"
                x={a - 21}
                y={130}
                width={42}
                height={42}
              />
              <rect
                className="physics018-block"
                data-body="B"
                x={b - 21}
                y={130}
                width={42}
                height={42}
              />
              <text x={a} y={158} textAnchor="middle">
                A
              </text>
              <text x={b} y={158} textAnchor="middle">
                B
              </text>
              <text x={w / 2} y={214} textAnchor="middle">
                +x sağa; hız ölçeği ortak
              </text>
            </>
          );
        }}
      </ScienceSvg>
    </figure>
  );
}
function ImpulseLab() {
  const id = "itme-momentum",
    [v, set] = useExploration(exploration(id), {
      mode: "impulse",
      mass: 2,
      initial: 3,
      forceA: 4,
      forceB: -6,
      durationA: 2,
      durationB: 1,
      progress: 100,
      massA: 1,
      massB: 2,
      velocityA: 6,
      velocityB: 0,
      restitution: 100,
      after: false,
      guess: "",
      reason: "",
      checked: false,
    });
  const change = (p: Partial<typeof v>) =>
    set({ ...p, checked: p.checked ?? false });
  const m = integer(v.mass, 1, 10, 2),
    u = integer(v.initial, -10, 10, 3),
    fa = integer(v.forceA, -20, 20, 4),
    fb = integer(v.forceB, -20, 20, -6),
    da = integer(v.durationA, 1, 5, 2),
    db = integer(v.durationB, 1, 5, 1),
    progress = integer(v.progress, 0, 100, 100),
    t = ((da + db) * progress) / 100;
  const mode = v.mode === "collision" ? "collision" : "impulse",
    a = impulse018(m, u, fa, da, fb, db, t),
    c = collision018(
      integer(v.massA, 1, 10, 1),
      integer(v.massB, 1, 10, 2),
      integer(v.velocityA, 0, 10, 6),
      integer(v.velocityB, -5, 0, 0),
      integer(v.restitution, 0, 100, 100) / 100,
    );
  const expected =
    mode === "impulse"
      ? a.impulse > 0
        ? "Pozitif"
        : a.impulse < 0
          ? "Negatif"
          : "Sıfır"
      : c.loss > 1e-10
        ? "Azalır"
        : "Aynı kalır";
  return (
    <Frame
      id={id}
      title="İtme ve çarpışma"
      intro="Kuvvetler net kuvvettir; kütle sabit, gözlemci eylemsizdir. İkinci görünüm aynı doğru üzerinde yaklaşan iki cismin anlık çarpışma hesabıdır."
    >
      <Select
        label="İnceleme"
        value={mode}
        onChange={(mode) => change({ mode, guess: "" })}
        options={[
          ["impulse", "İtme ve grafik"],
          ["collision", "Çarpışma"],
        ]}
      />
      {mode === "impulse" ? (
        <>
          <div className="physics018-controls">
            <Num
              label="Kütle (kg)"
              value={m}
              min={1}
              max={10}
              change={(mass) => change({ mass })}
            />
            <Num
              label="İlk hız (m/s)"
              value={u}
              min={-10}
              max={10}
              change={(initial) => change({ initial })}
            />
            <Num
              label="İlk net kuvvet (N)"
              value={fa}
              min={-20}
              max={20}
              change={(forceA) => change({ forceA })}
            />
            <Num
              label="İlk süre (s)"
              value={da}
              min={1}
              max={5}
              change={(durationA) => change({ durationA })}
            />
            <Num
              label="İkinci net kuvvet (N)"
              value={fb}
              min={-20}
              max={20}
              change={(forceB) => change({ forceB })}
            />
            <Num
              label="İkinci süre (s)"
              value={db}
              min={1}
              max={5}
              change={(durationB) => change({ durationB })}
            />
            <Num
              label="Zaman (%)"
              value={progress}
              min={0}
              max={100}
              change={(progress) => change({ progress })}
            />
          </div>
          <p>
            İmleç: {fmt(t)} s / {fmt(a.totalDuration)} s. Grafiklerde aynı zaman
            aralığı var. Pozitif yön sağdır.
          </p>
          <ForceChart
            forceA={fa}
            forceB={fb}
            durationA={da}
            durationB={db}
            time={t}
          />
          <MomentumChart
            mass={m}
            initialVelocity={u}
            forceA={fa}
            forceB={fb}
            durationA={da}
            durationB={db}
            time={t}
          />
          <Result>
            <p>
              İlk alan: <strong>{fmt(a.impulseA)} N·s</strong>; ikinci alan:{" "}
              <strong>{fmt(a.impulseB)} N·s</strong>.
            </p>
            <p>
              Net itme: <strong>{fmt(a.impulse)} N·s</strong>. İlk momentum{" "}
              {fmt(a.initialMomentum)}, seçili momentum{" "}
              <strong>{fmt(a.momentum)} kg·m/s</strong>.
            </p>
            <p>
              Hız: <strong>{fmt(a.velocity)} m/s</strong>; yer değiştirme:{" "}
              <strong>{fmt(a.displacement)} m</strong>.
            </p>
            <p>
              Kanıt: p − p0 = {fmt(a.momentum)} − ({fmt(a.initialMomentum)}) ={" "}
              {fmt(a.impulse)} N·s.
            </p>
            <p className="small muted">
              Kuvvet atlama anında sağdaki aralık değeri kullanılır; son anda
              uygulama bitmiş kabul edilir. Tek bir an ek alan üretmez.
            </p>
          </Result>
        </>
      ) : (
        <>
          <div className="physics018-controls">
            <Num
              label="A kütlesi (kg)"
              value={c.massA}
              min={1}
              max={10}
              change={(massA) => change({ massA })}
            />
            <Num
              label="B kütlesi (kg)"
              value={c.massB}
              min={1}
              max={10}
              change={(massB) => change({ massB })}
            />
            <Num
              label="A ilk hızı (m/s)"
              value={c.velocityA}
              min={0}
              max={10}
              change={(velocityA) => change({ velocityA })}
            />
            <Num
              label="B ilk hızı (m/s)"
              value={c.velocityB}
              min={-5}
              max={0}
              change={(velocityB) => change({ velocityB })}
            />
            <Num
              label="Geri sıçrama (%)"
              value={integer(v.restitution, 0, 100, 100)}
              min={0}
              max={100}
              change={(restitution) => change({ restitution })}
            />
          </div>
          <p>
            A solda, B sağda; dış itme ihmal. e = {fmt(c.restitution)}.{" "}
            {c.approaching
              ? "Cisimler yaklaşır."
              : "Bağıl yaklaşma yok; çarpışma olayı üretilmez."}
          </p>
          <div className="physics018-actions">
            <button
              className="secondary"
              aria-pressed={v.after}
              onClick={() => change({ after: !v.after })}
            >
              {v.after ? "Önceyi göster" : "Sonrayı göster"}
            </button>
          </div>
          <CollisionScene after={v.after} model={c} />
          <Result>
            <p>
              Son hızlar: A <strong>{fmt(c.afterA)} m/s</strong>, B{" "}
              <strong>{fmt(c.afterB)} m/s</strong>.
            </p>
            <p>
              Toplam momentum: {fmt(c.initialMomentum)} →{" "}
              <strong>{fmt(c.finalMomentum)} kg·m/s</strong>.
            </p>
            <p>
              Kinetik enerji: {fmt(c.initialKinetic)} →{" "}
              <strong>{fmt(c.finalKinetic)} J</strong>; iç enerjiye aktarılan:{" "}
              <strong>{fmt(c.loss)} J</strong>.
            </p>
            <p>
              Karşılıklı itmeler: A {fmt(c.impulseA)}, B {fmt(c.impulseB)} N·s.
              e=0 ortak hızlı, e=1 esnek sınırdır.
            </p>
          </Result>
        </>
      )}
      <Compare
        question={
          mode === "impulse"
            ? "Seçili ana kadar net itmenin işareti?"
            : "Çarpışmada toplam kinetik enerji?"
        }
        choices={
          mode === "impulse"
            ? ["Pozitif", "Sıfır", "Negatif"]
            : ["Azalır", "Aynı kalır"]
        }
        expected={expected}
        values={{ ...v, reason: v.reason.slice(0, 120) }}
        onChange={change}
      >
        <p>
          {mode === "impulse"
            ? `İşaretli alanların toplamı ${fmt(a.impulse)} N·s.`
            : `Kinetik farkı ${fmt(c.loss)} J; toplam momentum korunur.`}
        </p>
      </Compare>
    </Frame>
  );
}
function ConcurrentScene({
  model,
}: {
  model: ReturnType<typeof concurrent018>;
}) {
  const a = model;
  return (
    <figure className="physics018-figure">
      <figcaption>Düğümdeki üç kuvvet; +x sağa, +y yukarı</figcaption>
      <ScienceSvg
        title={`Yataydan sol açı ${a.leftAngle}, sağ açı ${a.rightAngle} derece. Sol gerilme ${fmt(a.left)}, sağ gerilme ${fmt(a.right)} newton.`}
        kind="concurrent"
        height={430}
      >
        {(w, marker) => {
          const o = { x: w / 2, y: 240 },
            maxX = Math.max(
              Math.abs(a.leftVector.x),
              Math.abs(a.rightVector.x),
              1,
            ),
            maxY = Math.max(a.leftVector.y, a.rightVector.y, 1),
            scale = Math.min((w / 2 - 30) / maxX, 170 / maxY, 130 / a.weight),
            angleA = (a.leftAngle * Math.PI) / 180,
            angleB = (a.rightAngle * Math.PI) / 180,
            ropeLength = Math.min(
              (w / 2 - 24) / Math.max(Math.cos(angleA), Math.cos(angleB)),
              185 / Math.max(Math.sin(angleA), Math.sin(angleB)),
            );
          const la = {
              x: o.x - ropeLength * Math.cos(angleA),
              y: o.y - ropeLength * Math.sin(angleA),
            },
            ra = {
              x: o.x + ropeLength * Math.cos(angleB),
              y: o.y - ropeLength * Math.sin(angleB),
            };
          return (
            <>
              <path
                className="physics018-axis-guide"
                d={`M20 ${o.y}H${w - 20}`}
              />
              <path
                className="physics018-rope"
                data-rope="left"
                d={`M${la.x} ${la.y}L${o.x} ${o.y}L${ra.x} ${ra.y}`}
              />
              <path
                className="physics018-rope"
                d={`M${o.x} ${o.y}V${o.y + 45}`}
              />
              <path
                className="physics018-surface"
                d={`M${la.x - 9} ${la.y}h18M${ra.x - 9} ${ra.y}h18`}
              />
              <Arrow
                name="left-tension"
                vector={a.leftVector}
                origin={o}
                scale={scale}
                marker={marker}
                kind="physics018-normal"
              />
              <Arrow
                name="right-tension"
                vector={a.rightVector}
                origin={o}
                scale={scale}
                marker={marker}
              />
              <Arrow
                name="load"
                vector={{ x: 0, y: -a.weight }}
                origin={o}
                scale={scale}
                marker={marker}
                kind="physics018-weight"
              />
              <circle className="physics018-initial" cx={o.x} cy={o.y} r={6} />
              <text x={la.x} y={la.y - 13} textAnchor="middle">
                L
              </text>
              <text x={ra.x} y={ra.y - 13} textAnchor="middle">
                R
              </text>
              <text x={w / 2} y={405} textAnchor="middle">
                TL + TR + W = 0
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <figcaption className="small muted">
        İpler ince, kuvvet okları kalındır. Geometrik ip boyu gerilme büyüklüğü
        değildir. Açılar yatay kesik çizgiye göredir.
      </figcaption>
    </figure>
  );
}
function ConcurrentLab() {
  const id = "kesisen-kuvvetler-dengesi",
    [v, set] = useExploration(exploration(id), {
      weight: 100,
      left: 30,
      right: 30,
      guess: "",
      reason: "",
      checked: false,
    });
  const change = (p: Partial<typeof v>) =>
    set({ ...p, checked: p.checked ?? false });
  const a = concurrent018(
    integer(v.weight, 10, 200, 100),
    integer(v.left, 10, 80, 30),
    integer(v.right, 10, 80, 30),
  );
  const expected =
    Math.abs(a.left - a.right) < 1e-10
      ? "Eşit"
      : a.left > a.right
        ? "Sol ip"
        : "Sağ ip";
  return (
    <Frame
      id={id}
      title="Düğümü üç kuvvetle dengele"
      intro="Kütlesiz düğüm, gergin ideal iki ip ve aşağı doğru W yükü var. İki açı da yataydan ölçülür; bu model statik dengeyi çözer."
    >
      <div className="physics018-controls">
        <Num
          label="Yük (N)"
          value={a.weight}
          min={10}
          max={200}
          change={(weight) => change({ weight })}
        />
        <Num
          label="Sol açı (°)"
          value={a.leftAngle}
          min={10}
          max={80}
          change={(left) => change({ left })}
        />
        <Num
          label="Sağ açı (°)"
          value={a.rightAngle}
          min={10}
          max={80}
          change={(right) => change({ right })}
        />
      </div>
      <ConcurrentScene model={a} />
      <Result>
        <p>
          Sol gerilme: <strong>{fmt(a.left)} N</strong>; sağ gerilme:{" "}
          <strong>{fmt(a.right)} N</strong>.
        </p>
        <p>
          Sol kuvvet: ({fmt(a.leftVector.x)}; {fmt(a.leftVector.y)}) N.
        </p>
        <p>
          Sağ kuvvet: ({fmt(a.rightVector.x)}; {fmt(a.rightVector.y)}) N.
        </p>
        <p>
          ΣFx = {fmt(a.leftVector.x)} + {fmt(a.rightVector.x)} ={" "}
          <strong>{fmt(a.sumX, 8)} N</strong>.
        </p>
        <p>
          ΣFy = {fmt(a.leftVector.y)} + {fmt(a.rightVector.y)} − {fmt(a.weight)}{" "}
          = <strong>{fmt(a.sumY, 8)} N</strong>.
        </p>
        <p>
          İpler arası üst açı: {fmt(a.includedAngle)}°. Yatay açılar sıfıra
          yaklaşırsa gerekli gerilme sınırsız büyüyebilir; model bu tekil ucu
          seçtirmez.
        </p>
      </Result>
      <Compare
        question="Hangi gerilme daha büyük?"
        choices={["Sol ip", "Eşit", "Sağ ip"]}
        expected={expected}
        values={{ ...v, reason: v.reason.slice(0, 120) }}
        onChange={change}
      >
        <p>
          TL/TR = cos β / cos α. Sonuç: {expected.toLocaleLowerCase("tr-TR")}.
        </p>
      </Compare>
    </Frame>
  );
}
function TorqueScene({
  model,
  couple,
}: {
  model: ReturnType<typeof torque018>;
  couple: boolean;
}) {
  const a = model;
  return (
    <figure className="physics018-figure">
      <figcaption>Gerçek etkime doğrusu ve O’dan dik kol</figcaption>
      <ScienceSvg
        title={`O noktasına göre moment ${fmt(a.moment)} newton metre; kuvvet ${fmt(a.force.x)}, ${fmt(a.force.y)} newton.`}
        kind="torque"
        height={430}
      >
        {(w, marker) => {
          const s = Math.min((w - 64) / 16, 20),
            origin = { x: w / 2, y: 214 },
            screen = (p: Vector018) => ({
              x: origin.x + p.x * s,
              y: origin.y - p.y * s,
            }),
            point = screen(a.point),
            foot = a.foot ? screen(a.foot) : null,
            fs = s * 0.25;
          const direction =
            a.magnitude === 0
              ? { x: 0, y: 0 }
              : { x: a.force.x / a.magnitude, y: a.force.y / a.magnitude };
          let low = -Infinity,
            high = Infinity;
          for (const [position, component] of [
            [a.point.x, direction.x],
            [a.point.y, direction.y],
          ]) {
            if (component !== 0) {
              const ends = [
                (-7 - position) / component,
                (7 - position) / component,
              ].sort((a, b) => a - b);
              low = Math.max(low, ends[0]);
              high = Math.min(high, ends[1]);
            }
          }
          if (a.magnitude === 0) {
            low = 0;
            high = 0;
          }
          const l1 = screen({
              x: a.point.x + direction.x * low,
              y: a.point.y + direction.y * low,
            }),
            l2 = screen({
              x: a.point.x + direction.x * high,
              y: a.point.y + direction.y * high,
            });
          return (
            <>
              <path
                className="physics018-axis"
                d={`M25 ${origin.y}H${w - 25}M${origin.x} 35V382`}
              />
              <text x={w - 30} y={origin.y + 22} textAnchor="end">
                x (m)
              </text>
              <text x={origin.x + 8} y={28}>
                y (m)
              </text>
              <text x={origin.x - 8} y={origin.y + 20} textAnchor="end">
                O
              </text>
              {a.magnitude > 0 && (
                <path
                  data-force-line
                  className="physics018-axis-guide"
                  d={`M${l1.x} ${l1.y}L${l2.x} ${l2.y}`}
                />
              )}
              <path
                data-position-vector
                className="physics018-rope"
                d={`M${origin.x} ${origin.y}L${point.x} ${point.y}`}
              />
              {foot && (
                <>
                  <path
                    data-moment-arm
                    data-arm={a.arm}
                    data-foot-x={a.foot!.x}
                    data-foot-y={a.foot!.y}
                    className="physics018-travelled"
                    d={`M${origin.x} ${origin.y}L${foot.x} ${foot.y}`}
                  />
                  <circle
                    cx={foot.x}
                    cy={foot.y}
                    r={3}
                    className="physics018-selected"
                  />
                </>
              )}
              <Arrow
                name="applied-force"
                vector={a.force}
                origin={point}
                scale={fs}
                marker={marker}
              />
              {couple && (
                <Arrow
                  name="opposite-force"
                  vector={{ x: -a.force.x, y: -a.force.y }}
                  origin={origin}
                  scale={fs}
                  marker={marker}
                  kind="physics018-normal"
                />
              )}
              <circle
                cx={point.x}
                cy={point.y}
                r={5}
                className="physics018-initial"
              />
              <text x={w / 2} y={408} textAnchor="middle">
                τz = rx Fy − ry Fx
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <figcaption className="small muted">
        Kalın yeşil çizgi O’dan kuvvet doğrusuna diktir; ince çizgi r konumudur.
        Sıfır kuvvette etki doğrusu ve dik kol gösterilmez.
      </figcaption>
    </figure>
  );
}
function TorqueLab() {
  const id = "tork-denge",
    [v, set] = useExploration(exploration(id), {
      x: 2,
      y: 1,
      fx: 3,
      fy: 4,
      couple: false,
      guess: "",
      reason: "",
      checked: false,
    });
  const change = (p: Partial<typeof v>) =>
    set({ ...p, checked: p.checked ?? false });
  const a = torque018(
    { x: integer(v.x, -4, 4, 2), y: integer(v.y, -4, 4, 1) },
    { x: integer(v.fx, -10, 10, 3), y: integer(v.fy, -10, 10, 4) },
  );
  return (
    <Frame
      id={id}
      title="Moment kolunu çizerek bul"
      intro="O=(0;0) m. Kuvvet A noktasına uygulanır; +x sağa, +y yukarı. Karşı kuvvet eklenirse −F, O’ya uygulanır ve bir kuvvet çifti sınanır."
    >
      <div className="physics018-controls">
        <Num
          label="A x (m)"
          value={a.point.x}
          min={-4}
          max={4}
          change={(x) => change({ x })}
        />
        <Num
          label="A y (m)"
          value={a.point.y}
          min={-4}
          max={4}
          change={(y) => change({ y })}
        />
        <Num
          label="F x (N)"
          value={a.force.x}
          min={-10}
          max={10}
          change={(fx) => change({ fx })}
        />
        <Num
          label="F y (N)"
          value={a.force.y}
          min={-10}
          max={10}
          change={(fy) => change({ fy })}
        />
      </div>
      <div className="physics018-actions">
        <button
          className="secondary"
          aria-pressed={v.couple}
          onClick={() => change({ couple: !v.couple })}
        >
          {v.couple ? "Tek kuvvete dön" : "Karşı kuvvet ekle"}
        </button>
      </div>
      <TorqueScene model={a} couple={v.couple} />
      <Result>
        <p>
          r = ({fmt(a.rx)}; {fmt(a.ry)}) m; F = ({fmt(a.force.x)};{" "}
          {fmt(a.force.y)}) N.
        </p>
        <p>
          τz = {fmt(a.rx)} · {fmt(a.force.y)} − {fmt(a.ry)} · {fmt(a.force.x)} ={" "}
          <strong>{fmt(a.moment)} N·m</strong>.
        </p>
        <p>
          Yön: <strong>{a.sense}</strong>. Dik kol:{" "}
          <strong>
            {a.arm === null ? "Kuvvet sıfır; tanımlanmaz" : `${fmt(a.arm)} m`}
          </strong>
          .
        </p>
        <p>
          {a.arm === null
            ? "Sıfır kuvvetin momenti sıfırdır."
            : `İkinci kanıt: |F| d = ${fmt(a.magnitude)} · ${fmt(a.arm)} = ${fmt(Math.abs(a.moment))} N·m.`}
        </p>
        <p>
          Net kuvvet:{" "}
          <strong>
            ({fmt(v.couple ? 0 : a.force.x)}; {fmt(v.couple ? 0 : a.force.y)}) N
          </strong>
          .{" "}
          {v.couple
            ? "O’daki karşı kuvvetin O’ya göre momenti sıfır; çiftin toplam momenti yine aynı. Bileşke sıfır, moment sıfır olmak zorunda değil."
            : "Tek kuvvetin momenti yalnız O noktasına göre hesaplanır."}
        </p>
      </Result>
      <Compare
        question="O’ya göre momentin yönü?"
        choices={["Saatin tersi", "Sıfır", "Saat yönü"]}
        expected={a.sense}
        values={{ ...v, reason: v.reason.slice(0, 120) }}
        onChange={change}
      >
        <p>
          İşaretli çapraz çarpım {fmt(a.moment)} N·m. Pozitif yön sayfadan
          dışarıdır.
        </p>
      </Compare>
    </Frame>
  );
}
const tilePoints = (mask: string) =>
  Array.from({ length: 16 }, (_, i) => ({
    x: (i % 4) + 0.5,
    y: 3.5 - Math.floor(i / 4),
    mass: mask[i] === "1" ? 1 : 0,
  }));
function CentreScene({ mask }: { mask: string }) {
  const a = centre018(tilePoints(mask));
  return (
    <figure className="physics018-figure">
      <figcaption>Her dolu hücre 1 kg; kare kenarı 1 m</figcaption>
      <ScienceSvg
        title={`Kalan kütle ${a.mass} kilogram; ${a.centre ? `merkez ${fmt(a.centre.x)}, ${fmt(a.centre.y)} metre` : "merkez tanımlı değil"}.`}
        kind="centre"
        height={390}
      >
        {(w) => {
          const s = Math.min((w - 68) / 4, 65),
            left = (w - 4 * s) / 2,
            top = 45,
            x = (n: number) => left + n * s,
            y = (n: number) => top + (4 - n) * s;
          return (
            <>
              {tilePoints(mask).map((p, i) => (
                <g key={i}>
                  <rect
                    data-cell={i + 1}
                    data-present={p.mass > 0}
                    x={x(i % 4)}
                    y={top + Math.floor(i / 4) * s}
                    width={s}
                    height={s}
                    className={p.mass ? "physics018-cell" : "physics018-hole"}
                  />
                  <text
                    x={x((i % 4) + 0.5)}
                    y={top + (Math.floor(i / 4) + 0.5) * s + 5}
                    textAnchor="middle"
                  >
                    {i + 1}
                  </text>
                </g>
              ))}
              <path
                className="physics018-axis"
                d={`M${left - 10} ${y(0)}H${x(4) + 12}M${left} ${y(0) + 10}V${top - 10}`}
              />
              <text x={left - 8} y={y(0) + 22} textAnchor="end">
                0
              </text>
              <text x={x(4)} y={y(0) + 22} textAnchor="middle">
                4 m
              </text>
              <text x={left - 5} y={top - 14} textAnchor="end">
                4
              </text>
              {a.centre && (
                <g data-centre-x={a.centre.x} data-centre-y={a.centre.y}>
                  <circle
                    data-centre
                    cx={x(a.centre.x)}
                    cy={y(a.centre.y)}
                    r={9}
                    className="physics018-centre"
                  />
                  <path
                    d={`M${x(a.centre.x) - 13} ${y(a.centre.y)}h26M${x(a.centre.x)} ${y(a.centre.y) - 13}v26`}
                    className="physics018-centre-cross"
                  />
                </g>
              )}
              <text x={w / 2} y={365} textAnchor="middle">
                Çarpı: KM
              </text>
            </>
          );
        }}
      </ScienceSvg>
    </figure>
  );
}
function CentreLab() {
  const id = "kutle-agirlik-merkezi",
    [v, set] = useExploration(exploration(id), {
      mask: "1111111111111111",
      guess: "",
      reason: "",
      checked: false,
    });
  const change = (p: Partial<typeof v>) =>
      set({ ...p, checked: p.checked ?? false }),
    mask = /^[01]{16}$/.test(v.mask) ? v.mask : "1111111111111111",
    a = centre018(tilePoints(mask));
  const expected = !a.centre
    ? "Tanımlı değil"
    : Math.abs(a.centre.x - 2) < 1e-10
      ? "Tam ortada"
      : a.centre.x < 2
        ? "Solda"
        : "Sağda";
  return (
    <Frame
      id={id}
      title="Parçayı çıkar, merkezi tahmin et"
      intro="16 eş kare hücre aynı malzeme ve kalınlıktadır; her biri 1 kg. Koordinat başlangıcı sol-alt köşe. Hücreler çıkarılabilir; negatif kütle yoktur."
    >
      <p>
        Bir numaraya dokunarak hücreyi çıkar veya ekle. Basılı düğme: hücre var.
      </p>
      <div className="physics018-tiles">
        {Array.from({ length: 16 }, (_, i) => (
          <button
            className="secondary"
            key={i}
            aria-label={`${i + 1} numaralı hücre`}
            aria-pressed={mask[i] === "1"}
            onClick={() =>
              change({
                mask:
                  mask.slice(0, i) +
                  (mask[i] === "1" ? "0" : "1") +
                  mask.slice(i + 1),
              })
            }
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="physics018-actions">
        <button
          className="secondary"
          onClick={() => change({ mask: "1110111011101110" })}
        >
          Sağ sütunu çıkar
        </button>
        <button
          className="secondary"
          onClick={() => change({ mask: "0000000000000000" })}
        >
          Hepsini çıkar
        </button>
        <button
          className="secondary"
          onClick={() => change({ mask: "1111111111111111" })}
        >
          Hepsini ekle
        </button>
      </div>
      <CentreScene mask={mask} />
      <Result>
        <p>
          Kalan kütle: <strong>{fmt(a.mass)} kg</strong>.
        </p>
        <p>
          x momenti: {fmt(a.momentX)} kg·m; y momenti: {fmt(a.momentY)} kg·m.
        </p>
        {a.centre ? (
          <>
            <p>
              Merkez:{" "}
              <strong>
                ({fmt(a.centre.x)}; {fmt(a.centre.y)}) m
              </strong>
              .
            </p>
            <p>
              Kanıt: x = {fmt(a.momentX)} / {fmt(a.mass)}, y = {fmt(a.momentY)}{" "}
              / {fmt(a.mass)}.
            </p>
          </>
        ) : (
          <p>
            <strong>Kütle kalmadı; merkez tanımlı değil.</strong> Sıfıra bölme
            veya son merkez işareti üretilmez.
          </p>
        )}
        <p>
          Düzgün çekim alanında ağırlık merkezi de aynı noktadadır. Hücre
          numarası kütle büyüklüğü değildir.
        </p>
      </Result>
      <Compare
        question="İlk merkezin x = 2 m doğrusuna göre yeni merkez?"
        choices={["Solda", "Tam ortada", "Sağda", "Tanımlı değil"]}
        expected={expected}
        values={{ ...v, reason: v.reason.slice(0, 120) }}
        onChange={change}
      >
        <p>
          {a.centre
            ? `Kalan x merkezi ${fmt(a.centre.x)} m; her hücre 1 kg alındı.`
            : "Toplam kütle sıfır; merkez oranı tanımlanamaz."}
        </p>
      </Compare>
    </Frame>
  );
}
function PulleyScene({ a }: { a: ReturnType<typeof pulley018> }) {
  return (
    <figure className="physics018-figure">
      <figcaption>
        {a.strands === 1 ? "Sabit" : "Tek hareketli"} makara; yük ve makara
        birlikte izlenir
      </figcaption>
      <ScienceSvg
        title={`Yük ${a.height} metre yükselirken ip ${a.pull} metre çekilir; kuvvet ${fmt(a.effort)} newton.`}
        kind="pulley"
        height={450}
      >
        {(w, marker) => {
          const cx = w / 2 - 10,
            cy = 205 - a.height * 25,
            end = 130 + a.pull * 25,
            scale = 48 / Math.max(a.load, a.effort),
            loadX = a.strands === 1 ? cx - 22 : cx,
            loadTop = a.strands === 1 ? 260 - a.height * 25 : cy + 58;
          return (
            <>
              <path className="physics018-surface" d={`M24 35H${w - 24}`} />
              {a.strands === 1 ? (
                <>
                  <path className="physics018-rope" d={`M${cx} 35V65`} />
                  <circle
                    className="physics018-pulley"
                    data-pulley="fixed"
                    cx={cx}
                    cy={65}
                    r={22}
                  />
                  <path
                    data-continuous-rope
                    className="physics018-rope"
                    d={`M${cx - 22} ${loadTop}V65A22 22 0 0 1 ${cx + 22} 65V${end}`}
                  />
                  <Arrow
                    name="effort"
                    vector={{ x: 0, y: -a.effort }}
                    origin={{ x: cx + 22, y: end }}
                    scale={scale}
                    marker={marker}
                  />
                </>
              ) : (
                <>
                  <path className="physics018-rope" d={`M${cx + 42} 35V65`} />
                  <circle
                    className="physics018-pulley"
                    data-pulley="fixed"
                    cx={cx + 42}
                    cy={65}
                    r={20}
                  />
                  <circle
                    className="physics018-pulley"
                    data-pulley="moving"
                    data-rise={a.height}
                    cx={cx}
                    cy={cy}
                    r={22}
                  />
                  <path
                    data-continuous-rope
                    className="physics018-rope"
                    d={`M${cx - 22} 35V${cy}A22 22 0 0 0 ${cx + 22} ${cy}V65A20 20 0 0 1 ${cx + 62} 65V${end}`}
                  />
                  <path
                    className="physics018-rope"
                    d={`M${cx} ${cy + 22}V${loadTop}`}
                  />
                  <Arrow
                    name="effort"
                    vector={{ x: 0, y: -a.effort }}
                    origin={{ x: cx + 62, y: end }}
                    scale={scale}
                    marker={marker}
                  />
                </>
              )}
              <rect
                data-load
                data-rise={a.height}
                className="physics018-block"
                x={loadX - 25}
                y={loadTop}
                width={50}
                height={48}
              />
              <text x={loadX} y={loadTop + 30} textAnchor="middle">
                G
              </text>
              <Arrow
                name="load-weight"
                vector={{ x: 0, y: -a.load }}
                origin={{ x: loadX, y: loadTop + 48 }}
                scale={scale}
                marker={marker}
                kind="physics018-weight"
              />
              <text x={w / 2} y={420} textAnchor="middle">
                F s = G h + Gm h
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <figcaption className="small muted">
        Oklar aşağı yük ağırlığı ve elin ipi çektiği kuvvettir; kuvvet ölçeği
        ortak. Merkezlerin yükselmesi ve serbest uç yolu ip uzunluğu kısıtıyla
        çizilir.
      </figcaption>
    </figure>
  );
}
function RampScene({ a }: { a: ReturnType<typeof ramp018> }) {
  return (
    <figure className="physics018-figure">
      <figcaption>Yukarı sabit hızlı kayma; kuvvetler denge halinde</figcaption>
      <ScienceSvg
        title={`Rampa uzunluğu ${a.length}, yüksekliği ${a.height} metre; çekiş ${fmt(a.effort)} newton, sürtünme ${fmt(a.friction)} newton.`}
        kind="ramp"
        height={400}
      >
        {(w, marker) => {
          const geomScale = Math.min(
              (w - 62) / a.length,
              230 / Math.max(1, a.height),
            ),
            dx = a.length * a.cos * geomScale,
            dy = a.height * geomScale,
            left = (w - dx) / 2,
            base = 300,
            angle = (Math.atan2(a.sin, a.cos) * 180) / Math.PI,
            c = {
              x: left + dx * 0.5 - a.sin * 13,
              y: base - dy * 0.5 - a.cos * 13,
            },
            forceScale = 55 / Math.max(a.weight, a.effort, a.normal, 1);
          return (
            <>
              <path
                data-ramp
                data-sin={a.sin}
                data-cos={a.cos}
                className="physics018-surface"
                d={`M${left} ${base}L${left + dx} ${base - dy}`}
              />
              <path
                className="physics018-axis-guide"
                d={`M${left} ${base}H${left + dx}V${base - dy}`}
              />
              <rect
                className="physics018-block"
                data-ramp-load
                x={c.x - 22}
                y={c.y - 13}
                width={44}
                height={26}
                transform={`rotate(${-angle} ${c.x} ${c.y})`}
              />
              <Arrow
                name="weight"
                vector={{ x: 0, y: -a.weight }}
                origin={c}
                scale={forceScale}
                marker={marker}
                kind="physics018-weight"
              />
              <Arrow
                name="normal"
                vector={{ x: -a.normal * a.sin, y: a.normal * a.cos }}
                origin={c}
                scale={forceScale}
                marker={marker}
                kind="physics018-normal"
              />
              <Arrow
                name="effort"
                vector={{ x: a.effort * a.cos, y: a.effort * a.sin }}
                origin={c}
                scale={forceScale}
                marker={marker}
              />
              <Arrow
                name="friction"
                vector={{ x: -a.friction * a.cos, y: -a.friction * a.sin }}
                origin={c}
                scale={forceScale}
                marker={marker}
                kind="physics018-friction"
              />
              <text x={w / 2} y={366} textAnchor="middle">
                F = G sin θ + μ N
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <figcaption className="small muted">
        Geometrinin iki ekseninde metre ölçeği aynı; kuvvet okları kendi ortak N
        ölçeğinde. Sürtünme, rampada aşağı yöndedir.
      </figcaption>
    </figure>
  );
}
function MachineLab() {
  const id = "basit-makineler-ayt",
    [v, set] = useExploration(exploration(id), {
      mode: "pulley",
      load: 80,
      moving: 20,
      strands: "2",
      rise: 10,
      length: 5,
      height: 3,
      mu: 25,
      guess: "",
      reason: "",
      checked: false,
    });
  const change = (p: Partial<typeof v>) =>
    set({ ...p, checked: p.checked ?? false });
  const mode = v.mode === "ramp" ? "ramp" : "pulley",
    strands = v.strands === "1" ? 1 : 2,
    load = integer(v.load, 20, 200, 80),
    rise = integer(v.rise, 0, 20, 10),
    length = integer(v.length, 1, 10, 5),
    height = integer(v.height, 0, length, Math.min(3, length)),
    mu = integer(v.mu, 0, 100, 25),
    a = pulley018(
      load,
      strands === 1 ? 0 : integer(v.moving, 0, 50, 20),
      strands,
      rise / 10,
    ),
    r = ramp018(load, length, height, mu / 100);
  const expected =
    mode === "pulley"
      ? "Isı kaybı yok"
      : r.heat > 1e-10
        ? "Isıya aktarılır"
        : "Isı kaybı yok";
  return (
    <Frame
      id={id}
      title="Kuvveti yol ve enerjiyle sınayalım"
      intro="Makara ideal ve işlem yavaş/sabit hızlıdır. Rampada yük yukarı sabit hızla kayar, çekiş düzleme paraleldir; μ kinetik sürtünme katsayısıdır."
    >
      <Select
        label="Makine"
        value={mode}
        onChange={(mode) => change({ mode, guess: "" })}
        options={[
          ["pulley", "Makara"],
          ["ramp", "Eğik düzlem"],
        ]}
      />
      <div className="physics018-controls">
        <Num
          label="Yük (N)"
          value={load}
          min={20}
          max={200}
          change={(load) => change({ load })}
        />
        {mode === "pulley" ? (
          <>
            <Num
              label="Yükselme (dm)"
              value={rise}
              min={0}
              max={20}
              change={(rise) => change({ rise })}
            />
            {strands === 2 && (
              <Num
                label="Hareketli makara ağırlığı (N)"
                value={a.movingWeight}
                min={0}
                max={50}
                change={(moving) => change({ moving })}
              />
            )}
          </>
        ) : (
          <>
            <Num
              label="Rampa boyu (m)"
              value={length}
              min={1}
              max={10}
              change={(length) =>
                change({ length, height: Math.min(height, length) })
              }
            />
            <Num
              label="Rampa yüksekliği (m)"
              value={height}
              min={0}
              max={length}
              change={(height) => change({ height })}
            />
            <Num
              label="Sürtünme (%)"
              value={mu}
              min={0}
              max={100}
              change={(mu) => change({ mu })}
            />
          </>
        )}
      </div>
      {mode === "pulley" ? (
        <>
          <Select
            label="Makara türü"
            value={String(strands)}
            onChange={(strands) => change({ strands })}
            options={[
              ["1", "Sabit: tek taşıyıcı kol"],
              ["2", "Hareketli: iki taşıyıcı kol"],
            ]}
          />
          <p>
            Yükselme h = {fmt(a.height)} m; 10 dm = 1 m.{" "}
            {strands === 2
              ? "İki taşıyıcı kol düşey ve paraleldir."
              : "Makara merkezi yer değiştirmez; onun ağırlığı kaldırılan işe girmez."}
          </p>
          <PulleyScene a={a} />
          <Result>
            <p>
              El kuvveti: <strong>{fmt(a.effort)} N</strong>; çekilen ip:{" "}
              <strong>{fmt(a.pull)} m</strong>.
            </p>
            <p>
              Kanıt: {a.strands} · {fmt(a.effort)} = {fmt(a.totalWeight)} N.
            </p>
            <p>
              Giriş işi: <strong>{fmt(a.inputWork)} J</strong>. Yük potansiyeli:{" "}
              <strong>{fmt(a.usefulWork)} J</strong>; hareketli makara
              potansiyeli: <strong>{fmt(a.accessoryWork)} J</strong>.
            </p>
            <p>
              Enerji farkı: {fmt(a.inputWork)} − {fmt(a.usefulWork)} −{" "}
              {fmt(a.accessoryWork)} = <strong>{fmt(a.loss)} J</strong>. İdeal
              modelde ısı kaybı yok.
            </p>
            <p>
              Yük için kuvvet kazancı: {fmt(a.gain)}. Hareketli parçayı
              kaldırmak ısı kaybı değildir.
            </p>
          </Result>
        </>
      ) : (
        <>
          <p>
            μ = {fmt(r.mu)}; sin θ = {fmt(r.sin)}, cos θ = {fmt(r.cos)}. Tam
            yatay uçta “yukarı” yön seçilen ilerleme yönüdür; h = 0.
          </p>
          <RampScene a={r} />
          <ul className="physics018-legend">
            <li>G: aşağı ağırlık; N: düzleme dik tepki.</li>
            <li>F: yukarı paralel çekiş; sürtünme: aşağı paralel.</li>
          </ul>
          <Result>
            <p>
              Normal: <strong>{fmt(r.normal)} N</strong>; sürtünme:{" "}
              <strong>{fmt(r.friction)} N</strong>; el kuvveti:{" "}
              <strong>{fmt(r.effort)} N</strong>.
            </p>
            <p>
              Giriş: <strong>{fmt(r.inputWork)} J</strong>; yararlı potansiyel:{" "}
              <strong>{fmt(r.usefulWork)} J</strong>; ısı:{" "}
              <strong>{fmt(r.heat)} J</strong>.
            </p>
            <p>
              Kanıt: {fmt(r.usefulWork)} + {fmt(r.heat)} = {fmt(r.inputWork)} J.
            </p>
            <p>
              Verim:{" "}
              <strong>
                {r.efficiency === null
                  ? "Giriş işi sıfır; oran tanımlı değil"
                  : `%${fmt(100 * r.efficiency)}`}
              </strong>
              . Kuvvet kazancı:{" "}
              {r.gain === null ? "Sıfır kuvvete bölünmez" : fmt(r.gain)}.
            </p>
          </Result>
        </>
      )}
      <Compare
        question="Bu modelde giriş işinin bir kısmı ısıya gider mi?"
        choices={["Isıya aktarılır", "Isı kaybı yok"]}
        expected={expected}
        values={{ ...v, reason: v.reason.slice(0, 120) }}
        onChange={change}
      >
        <p>
          {mode === "pulley"
            ? "İdeal makarada yük ve hareketli parçanın potansiyeli giriş işini paylaşır; bu paylaşım ısı değildir."
            : `Sürtünme işi ${fmt(r.friction)} · ${fmt(r.length)} = ${fmt(r.heat)} J ısıya aktarılır.`}
        </p>
      </Compare>
    </Frame>
  );
}
function CoulombScene({ a }: { a: ReturnType<typeof coulomb018> }) {
  return (
    <figure className="physics018-figure">
      <figcaption>A ve B sabit kaynak; C hedef yük</figcaption>
      <ScienceSvg
        title={`C hedefinde net kuvvet ${fmt(a.force.x, 5)}, ${fmt(a.force.y, 5)} newton. Noktasal yük ve homojen ortam modeli.`}
        kind="coulomb"
        height={410}
      >
        {(w, marker) => {
          const r = Math.abs(a.sources[0].x),
            h = a.target.y,
            gs = Math.min((w - 84) / (2 * r), 180 / Math.max(h, 1)),
            o = { x: w / 2, y: 285 },
            screen = (p: Vector018) => ({
              x: o.x + p.x * gs,
              y: o.y - p.y * gs,
            }),
            target = screen(a.target),
            max = Math.max(
              a.forceMagnitude,
              ...a.contributions.map((c) => Math.hypot(c.force.x, c.force.y)),
            ),
            fs = max === 0 ? 0 : 64 / max;
          return (
            <>
              <path
                className="physics018-axis-guide"
                d={`M24 ${o.y}H${w - 24}M${o.x} 28V326`}
              />
              <text x={w - 28} y={o.y + 47} textAnchor="end">
                x (m)
              </text>
              <text x={o.x + 9} y={30}>
                +y
              </text>
              {a.contributions.map((c, i) => {
                const source = screen(c.source);
                return (
                  <g key={i}>
                    <path
                      className="physics018-rope"
                      d={`M${source.x} ${source.y}L${target.x} ${target.y}`}
                    />
                    <Arrow
                      name={`source-${i + 1}`}
                      vector={c.force}
                      origin={target}
                      scale={fs}
                      marker={marker}
                      kind={
                        i === 0 ? "physics018-normal" : "physics018-external"
                      }
                    />
                  </g>
                );
              })}
              <Arrow
                name="net-force"
                vector={a.force}
                origin={target}
                scale={fs}
                marker={marker}
                kind="physics018-friction"
              />
              {a.sources.map((q, i) => {
                const p = screen(q);
                return (
                  <g key={i}>
                    <circle
                      data-charge={i === 0 ? "A" : "B"}
                      data-world-x={q.x}
                      data-world-y={q.y}
                      data-q={q.microCoulomb}
                      cx={p.x}
                      cy={p.y}
                      r={16}
                      className="physics018-charge"
                    />
                    <text x={p.x} y={p.y + 5} textAnchor="middle">
                      {i === 0 ? "A" : "B"}
                    </text>
                  </g>
                );
              })}
              <circle
                data-charge="C"
                data-world-x={a.target.x}
                data-world-y={a.target.y}
                data-q={a.target.microCoulomb}
                cx={target.x}
                cy={target.y}
                r={16}
                className="physics018-charge"
              />
              <text x={target.x} y={target.y + 5} textAnchor="middle">
                C
              </text>
              <text x={w / 2} y={380} textAnchor="middle">
                F = FA + FB
              </text>
            </>
          );
        }}
      </ScienceSvg>
      <figcaption className="small muted">
        Metre eksenlerinin ölçeği eşit; kuvvetler için ayrı ortak N ölçeği var.
        Mavi ok A’dan, turuncu ok B’den gelen kuvvet; yeşil ok toplamdır. İnce
        çizgiler yükler arasındaki doğrulardır, elektrik alan çizgisi değildir.
      </figcaption>
    </figure>
  );
}
function CoulombLab() {
  const id = "elektriksel-kuvvet-ayt",
    [v, set] = useExploration(exploration(id), {
      left: 2,
      right: 2,
      target: 1,
      distance: 1,
      height: 1,
      epsilon: 1,
      guess: "",
      reason: "",
      checked: false,
    });
  const change = (p: Partial<typeof v>) =>
    set({ ...p, checked: p.checked ?? false });
  const l = integer(v.left, -4, 4, 2),
    r = integer(v.right, -4, 4, 2),
    q = integer(v.target, -4, 4, 1),
    d = integer(v.distance, 1, 3, 1),
    h = integer(v.height, 0, 3, 1),
    e = integer(v.epsilon, 1, 5, 1),
    a = coulomb018(
      [
        { x: -d, y: 0, microCoulomb: l },
        { x: d, y: 0, microCoulomb: r },
      ],
      { x: 0, y: h, microCoulomb: q },
      e,
    ),
    expected =
      Math.abs(a.force.x) < 1e-12 ? "Sıfır" : a.force.x > 0 ? "Sağa" : "Sola";
  return (
    <Frame
      id={id}
      title="Hedefteki kuvvetleri vektörlerle topla"
      intro="İki kaynak sabittir; hareket modeli değildir. Noktasal yükler, durgun elektrik hâli ve homojen doğrusal dielektrik kabul edilir. +x sağa, +y yukarı."
    >
      <div className="physics018-controls">
        <Num
          label="A yükü (μC)"
          value={l}
          min={-4}
          max={4}
          change={(left) => change({ left })}
        />
        <Num
          label="B yükü (μC)"
          value={r}
          min={-4}
          max={4}
          change={(right) => change({ right })}
        />
        <Num
          label="C yükü (μC)"
          value={q}
          min={-4}
          max={4}
          change={(target) => change({ target })}
        />
        <Num
          label="Yatay yarı aralık (m)"
          value={d}
          min={1}
          max={3}
          change={(distance) => change({ distance })}
        />
        <Num
          label="C yüksekliği (m)"
          value={h}
          min={0}
          max={3}
          change={(height) => change({ height })}
        />
        <Num
          label="Bağıl permitivite"
          value={e}
          min={1}
          max={5}
          change={(epsilon) => change({ epsilon })}
        />
      </div>
      <p>
        A = (−{d}; 0) m, B = ({d}; 0) m, C = (0; {h}) m. Yükler A {l}, B {r}, C{" "}
        {q} μC. Her 1 μC = 10⁻⁶ C.
      </p>
      <CoulombScene a={a} />
      <Result>
        {a.contributions.map((c, i) => (
          <p key={i}>
            {i === 0 ? "A" : "B"} kaynağı: uzaklık {fmt(c.distance)} m; C’ye
            kuvvet{" "}
            <strong>
              ({fmt(c.force.x, 6)}; {fmt(c.force.y, 6)}) N
            </strong>
            .
          </p>
        ))}
        <p>
          Net kuvvet:{" "}
          <strong>
            ({fmt(a.force.x, 6)}; {fmt(a.force.y, 6)}) N
          </strong>
          ; büyüklük <strong>{fmt(a.forceMagnitude, 6)} N</strong>.
        </p>
        <p>
          Kaynakların alanı:{" "}
          <strong>
            ({fmt(a.field.x)}; {fmt(a.field.y)}) N/C
          </strong>
          .
        </p>
        <p>
          Kanıt: F = qC E; {q} · 10⁻⁶ C ile alan çarpılır. k = 9 × 10⁹ / {e}{" "}
          N·m²/C².
        </p>
        {q === 0 && (
          <p>
            C’nin net noktasal yükü sıfır, kuvvet sıfır. Alanın da sıfır olması
            gerekmez; sonlu nötr cismin kutuplanması bu modelin dışındadır.
          </p>
        )}
        <p>
          Etki ve tepki ayrı cisimlere etkir; burada yalnız C üzerindeki
          iki katkı toplanır.
        </p>
      </Result>
      <Compare
        question="C’de net kuvvetin yatay bileşeni?"
        choices={["Sola", "Sıfır", "Sağa"]}
        expected={expected}
        values={{ ...v, reason: v.reason.slice(0, 120) }}
        onChange={change}
      >
        <p>
          Fx = {fmt(a.contributions[0].force.x, 6)} +{" "}
          {fmt(a.contributions[1].force.x, 6)} = {fmt(a.force.x, 6)} N.
        </p>
      </Compare>
    </Frame>
  );
}
export default function Forge018PhysicsLab({ lessonId }: { lessonId: string }) {
  switch (lessonId) {
    case "itme-momentum":
      return <ImpulseLab />;
    case "kesisen-kuvvetler-dengesi":
      return <ConcurrentLab />;
    case "tork-denge":
      return <TorqueLab />;
    case "kutle-agirlik-merkezi":
      return <CentreLab />;
    case "basit-makineler-ayt":
      return <MachineLab />;
    case "elektriksel-kuvvet-ayt":
      return <CoulombLab />;
    default:
      return null;
  }
}
