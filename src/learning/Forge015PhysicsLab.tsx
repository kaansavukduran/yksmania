import { useId, type ReactNode } from "react";
import { ModelNumber } from "./ModelNumber";
import { useExploration } from "./useExploration";
import {
  vectorModel,
  relativeModel,
  riverChoices,
  riverModel,
  type Vector2,
  type VectorOperation,
} from "./forge015Physics";
import "./forge015Physics.css";
const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(n) < 1e-9 ? 0 : n,
  );
const pair = (v: Vector2) => `(${fmt(v.x)}; ${fmt(v.y)})`;
const num = (n: number, min: number, max: number, fallback = 0) =>
  Number.isFinite(n) ? Math.max(min, Math.min(max, Math.round(n))) : fallback;
const key = (id: string) => `forge015-physics-${id}`;
type PredictionValue = { guess: string; reason: string; checked: boolean };
function Comparison({
  uid,
  question,
  choices,
  expected,
  values,
  onChange,
  children,
}: {
  uid: string;
  question: string;
  choices: string[];
  expected: string;
  values: PredictionValue;
  onChange: (v: Partial<PredictionValue>) => void;
  children: ReactNode;
}) {
  return (
    <fieldset className="physics015-comparison">
      <legend>{question}</legend>
      <div className="physics015-guesses">
        {choices.map((choice) => (
          <label key={choice}>
            <input
              type="radio"
              name={`${uid}-guess`}
              checked={values.guess === choice}
              value={choice}
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
        placeholder="Hangi büyüklüğü sabit tuttun, hangisini değiştirdin?"
      />
      <button
        type="button"
        className="secondary"
        disabled={!choices.includes(values.guess) || !values.reason.trim()}
        onClick={() => onChange({ checked: true })}
      >
        Tahminimi kanıtla karşılaştır
      </button>
      {values.checked && choices.includes(values.guess) && (
        <div className="physics015-feedback" role="status">
          <strong>
            {values.guess === expected
              ? "Tahminin verilen koşullarla uyumlu."
              : "Tahminini modelin koşullarıyla yeniden karşılaştır."}
          </strong>
          {children}
          <p>Gerekçen: {values.reason}</p>
          <p className="small muted">
            Gerekçen otomatik puanlanmaz; açıklamayla karşılaştırarak denetle.
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
    <section data-forge015={id} className="physics015-lab">
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="small muted">
        Bu görsel keşif ayrı kaydedilir; bağımsız doğru cevap, XP veya konu
        tamamlanması sayılmaz.
      </p>
    </section>
  );
}
type PlotScale = {
  x: (n: number) => number;
  y: (n: number) => number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};
function plotScale(points: Vector2[]): PlotScale {
  const xMin = Math.min(-2, ...points.map((p) => p.x)),
    xMax = Math.max(2, ...points.map((p) => p.x)),
    yMin = Math.min(-2, ...points.map((p) => p.y)),
    yMax = Math.max(2, ...points.map((p) => p.y));
  const scale = Math.min(520 / (xMax - xMin), 250 / (yMax - yMin));
  const left = 90 + (520 - (xMax - xMin) * scale) / 2,
    bottom = 325 - (250 - (yMax - yMin) * scale) / 2;
  return {
    x: (n) => left + (n - xMin) * scale,
    y: (n) => bottom - (n - yMin) * scale,
    xMin,
    xMax,
    yMin,
    yMax,
  };
}
function Plot({
  title,
  unit,
  points,
  children,
  kind,
}: {
  title: string;
  unit: string;
  points: Vector2[];
  children: (p: PlotScale, uid: string) => ReactNode;
  kind: string;
}) {
  const uid = useId(),
    p = plotScale(points),
    step = Math.max(
      1,
      Math.ceil(Math.max(p.xMax - p.xMin, p.yMax - p.yMin) / 6),
    );
  const ticks = (lo: number, hi: number) =>
    Array.from(
      { length: Math.max(0, Math.floor(hi / step) - Math.ceil(lo / step) + 1) },
      (_, i) => (Math.ceil(lo / step) + i) * step,
    );
  return (
    <svg
      viewBox="0 0 700 400"
      role="img"
      aria-labelledby={`${uid}-title`}
      data-plot={kind}
    >
      <title id={`${uid}-title`}>
        {title}. Her iki eksen {unit}; yatay ve düşey ölçekler eşittir.
      </title>
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
      {ticks(p.xMin, p.xMax).map((v) => (
        <g key={`x${v}`}>
          <path className="physics015-grid-line" d={`M${p.x(v)} 65V340`} />
          <text x={p.x(v)} y="365" textAnchor="middle">
            {fmt(v)}
          </text>
        </g>
      ))}
      {ticks(p.yMin, p.yMax).map((v) => (
        <g key={`y${v}`}>
          <path className="physics015-grid-line" d={`M65 ${p.y(v)}H635`} />
          <text x="48" y={p.y(v) + 5} textAnchor="end">
            {fmt(v)}
          </text>
        </g>
      ))}
      <path
        className="physics015-axis"
        d={`M65 ${p.y(0)}H635M${p.x(0)} 340V60`}
      />
      <text x="625" y="35" textAnchor="end">
        x ({unit})
      </text>
      <text x="80" y="35">
        y ({unit})
      </text>
      {children(p, uid)}
    </svg>
  );
}
function Arrow({
  p,
  uid,
  from,
  to,
  name,
  kind = "a",
}: {
  p: PlotScale;
  uid: string;
  from: Vector2;
  to: Vector2;
  name: string;
  kind?: string;
}) {
  const zero = from.x === to.x && from.y === to.y;
  return zero ? (
    <circle
      data-vector-zero={name}
      cx={p.x(to.x)}
      cy={p.y(to.y)}
      r="5"
      className={`physics015-dot physics015-${kind}`}
    />
  ) : (
    <path
      data-vector={name}
      data-from-x={from.x}
      data-from-y={from.y}
      data-to-x={to.x}
      data-to-y={to.y}
      d={`M${p.x(from.x)} ${p.y(from.y)}L${p.x(to.x)} ${p.y(to.y)}`}
      className={`physics015-arrow physics015-${kind}`}
      markerEnd={`url(#${uid}-head)`}
    />
  );
}
const origin = { x: 0, y: 0 };
function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (v: string) => void;
}) {
  const uid = useId();
  return (
    <div className="physics015-select">
      <label htmlFor={uid}>{label}</label>
      <select id={uid} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </select>
      <p className="small muted">
        Seçili: {options.find((x) => x[0] === value)?.[1]}
      </p>
    </div>
  );
}
function Vectors() {
  const id = "vektorler",
    uid = useId();
  const [s, set] = useExploration(key(id), {
    ax: 3,
    ay: 4,
    bx: -1,
    by: 2,
    scalar: -2,
    operation: "sum",
    guess: "",
    reason: "",
    checked: false,
  });
  const ax = num(s.ax, -10, 10, 3),
    ay = num(s.ay, -10, 10, 4),
    bx = num(s.bx, -10, 10, -1),
    by = num(s.by, -10, 10, 2),
    scalar = num(s.scalar, -5, 5, -2);
  const operation: VectorOperation = ["sum", "difference", "scale"].includes(
    s.operation,
  )
    ? (s.operation as VectorOperation)
    : "sum";
  const a = { x: ax, y: ay },
    b = { x: bx, y: by },
    m = vectorModel(a, b, scalar, operation);
  const change = (v: Partial<typeof s>) => set({ ...v, checked: false }),
    expected =
      m.magnitude === 0
        ? "Sıfır"
        : m.result.x > 0
          ? "Sağ yarı düzlem"
          : m.result.x < 0
            ? "Sol yarı düzlem"
            : "Düşey eksen";
  return (
    <Frame
      id={id}
      title="Okları bileşenlerle kur"
      intro="İki kuvvet vektörünü Newton cinsinden seç. Uç uca çizim ile gerçek bileşen toplamını aynı modelde karşılaştır."
    >
      <Select
        label="Vektör işlemi"
        value={operation}
        options={[
          ["sum", "A + B"],
          ["difference", "A − B"],
          ["scale", "c A"],
        ]}
        onChange={(operation) => change({ operation })}
      />
      <div className="physics015-controls">
        <ModelNumber
          label="A x bileşeni (N)"
          value={ax}
          min={-10}
          max={10}
          onChange={(ax) => change({ ax })}
        />
        <ModelNumber
          label="A y bileşeni (N)"
          value={ay}
          min={-10}
          max={10}
          onChange={(ay) => change({ ay })}
        />
        {operation !== "scale" ? (
          <>
            <ModelNumber
              label="B x bileşeni (N)"
              value={bx}
              min={-10}
              max={10}
              onChange={(bx) => change({ bx })}
            />
            <ModelNumber
              label="B y bileşeni (N)"
              value={by}
              min={-10}
              max={10}
              onChange={(by) => change({ by })}
            />
          </>
        ) : (
          <ModelNumber
            label="Çarpan c"
            value={scalar}
            min={-5}
            max={5}
            onChange={(scalar) => change({ scalar })}
          />
        )}
      </div>
      <div className="physics015-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => change({ operation: "sum", bx: -ax, by: -ay })}
        >
          Dengele
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => change({ operation: "scale", scalar: -1 })}
        >
          Tersini al
        </button>
      </div>
      <Plot
        title={`Sonuç ${pair(m.result)} N; norm ${fmt(m.magnitude)} N`}
        unit="N"
        kind="vectors"
        points={[origin, a, b, m.first, m.result]}
      >
        {(p, mark) => (
          <>
            {operation === "scale" ? (
              <Arrow
                p={p}
                uid={mark}
                from={origin}
                to={a}
                name="original-a"
                kind="guide"
              />
            ) : (
              <>
                <Arrow p={p} uid={mark} from={origin} to={a} name="a" />
                <Arrow
                  p={p}
                  uid={mark}
                  from={a}
                  to={m.result}
                  name="second"
                  kind="b"
                />
              </>
            )}
            <Arrow
              p={p}
              uid={mark}
              from={origin}
              to={m.result}
              name="result"
              kind="result"
            />
          </>
        )}
      </Plot>
      <p className="physics015-legend">
        A: birinci ok; B veya −B: A’nın ucundan eklenen ok; sonuç: başlangıçtan
        son uca bileşke. c A modunda kesik ok eski A’yı, sürekli ok sonucu
        gösterir.
      </p>
      <div data-model-result className="physics015-result">
        <strong>Sonuç: {pair(m.result)} N</strong>
        <p>
          Norm: {fmt(m.magnitude)} N.{" "}
          {m.angle === null
            ? "Sıfır vektör; yön tanımsız."
            : `Yön: +x’ten saat yönünün tersine ${fmt(m.angle)}°.`}
        </p>
        <p>
          A = {pair(a)} N; B = {pair(b)} N; c = {scalar}. İşlem:{" "}
          {operation === "sum"
            ? "A + B"
            : operation === "difference"
              ? "A − B"
              : "c A"}
          .
        </p>
        <p>
          Dengeleyici: {pair(m.balance)} N. Net kuvvet sıfır olması tek başına
          cismin durduğu anlamına gelmez.
        </p>
      </div>
      <Comparison
        uid={uid}
        question="Sonuç hangi bölgede?"
        choices={["Sıfır", "Sağ yarı düzlem", "Sol yarı düzlem", "Düşey eksen"]}
        expected={expected}
        values={s}
        onChange={(v) => set(v)}
      >
        <p>
          x bileşeni {fmt(m.result.x)}, norm {fmt(m.magnitude)} N. Yönü normdan
          veya eski okun başlangıç yerinden çıkarma.
        </p>
      </Comparison>
    </Frame>
  );
}
function Relative() {
  const id = "bagil-hareket",
    uid = useId();
  const [s, set] = useExploration(key(id), {
    ax: 30,
    ay: 40,
    bx: 0,
    by: 0,
    vax: -3,
    vay: -4,
    vbx: 0,
    vby: 0,
    time: 0,
    frame: "world",
    smooth: false,
    guess: "",
    reason: "",
    checked: false,
  });
  const a0 = { x: num(s.ax, -50, 50, 30), y: num(s.ay, -50, 50, 40) },
    b0 = { x: num(s.bx, -50, 50), y: num(s.by, -50, 50) },
    va = { x: num(s.vax, -10, 10, -3), y: num(s.vay, -10, 10, -4) },
    vb = { x: num(s.vbx, -10, 10), y: num(s.vby, -10, 10) },
    time = num(s.time, 0, 12),
    observer = s.frame === "observer",
    m = relativeModel(a0, b0, va, vb, time),
    end = relativeModel(a0, b0, va, vb, 12);
  const pa = observer ? m.position : m.a,
    pb = observer ? origin : m.b,
    sa = observer ? m.initial : a0,
    sb = observer ? origin : b0,
    ea = observer ? end.position : end.a,
    eb = observer ? origin : end.b;
  const change = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const expected =
    m.distance < 1e-8
      ? "Aynı konum"
      : m.radial !== null && m.radial < -1e-8
        ? "Yaklaşıyor"
        : m.radial !== null && m.radial > 1e-8
          ? "Uzaklaşıyor"
          : "İlk anda değişmiyor";
  const boostAllowed = va.x <= 8 && vb.x <= 8 && va.y <= 9 && vb.y <= 9;
  return (
    <Frame
      id={id}
      title="Aynı anı iki referansta incele"
      intro="+x doğu, +y kuzey. Sabit hızları ve başlangıç konumlarını seç; zaman sürgüsü her iki referansı aynı fiziksel anda tutar."
    >
      <Select
        label="Konum referansı"
        value={observer ? "observer" : "world"}
        options={[
          ["world", "Dünya"],
          ["observer", "B gözlemcisi"],
        ]}
        onChange={(frame) => change({ frame })}
      />
      <div className="physics015-controls">
        <ModelNumber
          label="A Dünya hızı x (m/s)"
          value={va.x}
          min={-10}
          max={10}
          onChange={(vax) => change({ vax })}
        />
        <ModelNumber
          label="A Dünya hızı y (m/s)"
          value={va.y}
          min={-10}
          max={10}
          onChange={(vay) => change({ vay })}
        />
        <ModelNumber
          label="B Dünya hızı x (m/s)"
          value={vb.x}
          min={-10}
          max={10}
          onChange={(vbx) => change({ vbx })}
        />
        <ModelNumber
          label="B Dünya hızı y (m/s)"
          value={vb.y}
          min={-10}
          max={10}
          onChange={(vby) => change({ vby })}
        />
      </div>
      <details>
        <summary>Başlangıç konumları (m)</summary>
        <div className="physics015-controls">
          <ModelNumber
            label="A ilk x (m)"
            value={a0.x}
            min={-50}
            max={50}
            onChange={(ax) => change({ ax })}
          />
          <ModelNumber
            label="A ilk y (m)"
            value={a0.y}
            min={-50}
            max={50}
            onChange={(ay) => change({ ay })}
          />
          <ModelNumber
            label="B ilk x (m)"
            value={b0.x}
            min={-50}
            max={50}
            onChange={(bx) => change({ bx })}
          />
          <ModelNumber
            label="B ilk y (m)"
            value={b0.y}
            min={-50}
            max={50}
            onChange={(by) => change({ by })}
          />
        </div>
      </details>
      <div className="physics015-controls">
        <ModelNumber
          label="Geçen zaman (s)"
          value={time}
          min={0}
          max={12}
          onChange={(time) => change({ time })}
        />
      </div>
      <div className="physics015-actions">
        <button
          type="button"
          className="secondary"
          disabled={time === 0}
          onClick={() => change({ time: time - 1 })}
        >
          Bir saniye geri
        </button>
        <button
          type="button"
          className="secondary"
          disabled={time === 12}
          onClick={() => change({ time: time + 1 })}
        >
          Bir saniye ilerle
        </button>
        <button
          type="button"
          className="secondary"
          disabled={!boostAllowed}
          onClick={() =>
            change({
              vax: va.x + 2,
              vay: va.y + 1,
              vbx: vb.x + 2,
              vby: vb.y + 1,
            })
          }
        >
          Ortak hız ekle
        </button>
      </div>
      <p>
        Ortak katkı iki Dünya hızına da (2, 1) m/s ekler. Zamanı adımladığında
        eksen ölçeği 0–12 saniyelik yollar için sabit kalır. Konum ve hız
        çizimleri farklı birimlerde, ayrı panellerdedir.
      </p>
      <label className="physics015-check">
        <input
          type="checkbox"
          checked={s.smooth}
          onChange={(e) => set({ smooth: e.target.checked })}
        />
        Konum geçişlerini yumuşat
      </label>
      <div data-smooth={s.smooth ? "true" : "false"}>
        <Plot
          title={`${observer ? "B gözlemcisine" : "Dünya’ya"} göre ${time} saniyede A ${pair(pa)}, B ${pair(pb)} metre`}
          unit="m"
          kind="relative-positions"
          points={[sa, sb, ea, eb]}
        >
          {(p) => (
            <>
              <path
                className="physics015-path-guide"
                d={`M${p.x(sa.x)} ${p.y(sa.y)}L${p.x(ea.x)} ${p.y(ea.y)}M${p.x(sb.x)} ${p.y(sb.y)}L${p.x(eb.x)} ${p.y(eb.y)}`}
              />
              <circle
                data-moving="a"
                data-world-x={pa.x}
                data-world-y={pa.y}
                cx={p.x(pa.x)}
                cy={p.y(pa.y)}
                r="7"
                className="physics015-dot physics015-a"
              />
              <circle
                data-moving="b"
                data-world-x={pb.x}
                data-world-y={pb.y}
                cx={p.x(pb.x)}
                cy={p.y(pb.y)}
                r="5"
                className="physics015-dot physics015-b"
              />
              {m.distance < 1e-8 ? (
                <text x={p.x(pa.x)} y={p.y(pa.y) - 15} textAnchor="middle">
                  A = B
                </text>
              ) : (
                <>
                  <text x={p.x(pa.x)} y={p.y(pa.y) - 15} textAnchor="middle">
                    A
                  </text>
                  <text x={p.x(pb.x)} y={p.y(pb.y) + 25} textAnchor="middle">
                    B
                  </text>
                </>
              )}
            </>
          )}
        </Plot>
      </div>
      <Plot
        title={`Dünya hızlarından fark: A/B ${pair(m.velocity)} metre bölü saniye`}
        unit="m/s"
        kind="relative-velocities"
        points={[origin, va, vb, m.velocity]}
      >
        {(p, mark) => (
          <>
            <Arrow p={p} uid={mark} from={origin} to={va} name="world-a" />
            <Arrow
              p={p}
              uid={mark}
              from={origin}
              to={vb}
              name="world-b"
              kind="b"
            />
            <Arrow
              p={p}
              uid={mark}
              from={vb}
              to={va}
              name="relative"
              kind="result"
            />
          </>
        )}
      </Plot>
      <p className="physics015-legend">
        Hız paneli Dünya hızlarını ortak başlangıçtan gösterir. B okunun ucundan
        A okunun ucuna giden sonuç oku, A’nın B’ye göre hızıdır.
      </p>
      <div data-model-result className="physics015-result">
        <strong>A/B hızı: {pair(m.velocity)} m/s</strong>
        <p>
          Bağıl sürat: {fmt(m.speed)} m/s; bağıl konum: {pair(m.position)} m;
          uzaklık: {fmt(m.distance)} m.
        </p>
        <p>
          t = {time} s. Dünya konumları: A {pair(m.a)} m; B {pair(m.b)} m.{" "}
          {observer
            ? "B referansında B = (0, 0) m; A konumu bağıl konumdur."
            : "Konum paneli Dünya referansındadır."}
        </p>
        <p>
          Anlık uzaklık değişimi:{" "}
          {m.radial === null
            ? "Aynı konumda bu yönlü oran tanımsız."
            : `${fmt(m.radial)} m/s; ${expected.toLocaleLowerCase("tr-TR")}.`}
        </p>
        <p>
          {m.meetingKind === "coincident"
            ? "Sabit model boyunca çakışıklar; tek bir karşılaşma anı seçilmez."
            : m.meetingKind === "future"
              ? `Başlangıçtan ${fmt(m.meetingTime!)} s sonra aynı konuma gelirler.`
              : m.meetingKind === "past"
                ? `Yolların karşılaşması başlangıçtan önce: t = ${fmt(m.meetingTime!)} s.`
                : "Bu sabit hızlarla gelecekte karşılaşma yok."}
        </p>
      </div>
      <Comparison
        uid={uid}
        question="Bu anda aralarındaki uzaklık nasıl değişiyor?"
        choices={[
          "Yaklaşıyor",
          "Uzaklaşıyor",
          "İlk anda değişmiyor",
          "Aynı konum",
        ]}
        expected={expected}
        values={s}
        onChange={(v) => set(v)}
      >
        <p>
          Konum farkı ile bağıl hızın birlikte yönüne bak. Bağıl sürat{" "}
          {fmt(m.speed)} m/s iken uzaklığın değişimi{" "}
          {m.radial === null
            ? "bu birleşme anında yönlü oranla tanımlanmaz"
            : `${fmt(m.radial)} m/s olabilir`}
          .
        </p>
      </Comparison>
    </Frame>
  );
}
function River() {
  const id = "nehir-problemleri",
    uid = useId();
  const [s, set] = useExploration(key(id), {
    width: 120,
    speed: 5,
    current: 3,
    angle: 0,
    mode: "manual",
    progress: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const width = num(s.width, 20, 120, 120),
    speed = num(s.speed, 1, 10, 5),
    current = num(s.current, 0, 10, 3),
    angle = num(s.angle, -75, 75),
    progress = num(s.progress, 0, 100),
    mode = ["manual", "quick", "direct"].includes(s.mode) ? s.mode : "manual",
    targets = riverChoices(width, speed, current),
    theta =
      mode === "direct" ? targets.directAngle : mode === "quick" ? 0 : angle;
  const base =
      theta === null ? null : riverModel(width, speed, current, theta, 0),
    m =
      theta === null || base === null
        ? null
        : riverModel(
            width,
            speed,
            current,
            theta,
            (progress / 100) * (base.crossingTime ?? 20),
          );
  const change = (v: Partial<typeof s>) => set({ ...v, checked: false }),
    landing =
      m?.drift === null || m?.drift === undefined
        ? null
        : { x: m.drift, y: width },
    expected =
      m === null || m.crossingTime === null
        ? "Sonlu varış yok"
        : Math.abs(m.drift!) < 1e-8
          ? "Tam karşı"
          : m.drift! > 0
            ? "Aşağı akış"
            : "Yukarı akış";
  return (
    <Frame
      id={id}
      title="Yönü seç, varış yerini hesapla"
      intro="Sabit düzgün akıntı ve suya göre sabit sürat varsayılır. +x aşağı akışa, +y karşı kıyıya yönelir; θ kıyıya dik +y’den ölçülür."
    >
      <div className="physics015-controls">
        <ModelNumber
          label="Nehir genişliği (m)"
          value={width}
          min={20}
          max={120}
          onChange={(width) => change({ width })}
        />
        <ModelNumber
          label="Suya göre sürat (m/s)"
          value={speed}
          min={1}
          max={10}
          onChange={(speed) => change({ speed })}
        />
        <ModelNumber
          label="Akıntı sürati (m/s)"
          value={current}
          min={0}
          max={10}
          onChange={(current) => change({ current })}
        />
      </div>
      <div className="physics015-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => change({ mode: "quick" })}
        >
          En kısa süre
        </button>
        <button
          type="button"
          className="secondary"
          disabled={!targets.directPossible}
          onClick={() => change({ mode: "direct" })}
        >
          Tam karşıya var
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => change({ mode: "manual" })}
        >
          Yönü kendim seçeyim
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => change({ current: speed })}
        >
          Akıntıyı eşitle
        </button>
      </div>
      {mode === "manual" && (
        <div className="physics015-controls">
          <ModelNumber
            label="Dik yönden açı θ (°)"
            value={angle}
            min={-75}
            max={75}
            onChange={(angle) => change({ angle })}
          />
        </div>
      )}
      <p>
        Seçili yol:{" "}
        {mode === "direct"
          ? "tam karşı hedef"
          : mode === "quick"
            ? "en kısa süre"
            : "elle seçilen yön"}
        .{" "}
        {theta === null
          ? "Bu sürat ve akıntıyla tam karşı hedef için sonlu geçiş açısı yok."
          : `Kullanılan θ = ${fmt(theta)}°. Negatif açı yukarı akışa yönelmedir.`}
      </p>
      {!targets.directPossible && (
        <p className="physics015-notice">
          Tam karşı hedef için su sürati akıntıdan büyük olmalı. Dik yönelip
          sürüklenerek karşı kıyıda başka bir noktaya varabilirsin.
        </p>
      )}
      {m !== null ? (
        <div className="physics015-controls">
          <ModelNumber
            label="Geçiş ilerlemesi (%)"
            value={progress}
            min={0}
            max={100}
            onChange={(progress) => change({ progress })}
          />
        </div>
      ) : (
        <p>Zamanı adımlamak için en kısa süreyi veya geçerli bir yönü seç.</p>
      )}
      <Plot
        title={
          m === null
            ? "Tam karşıya sonlu yön yok; hayalî rota çizilmez"
            : `Nehirde ${fmt(m.elapsed)} saniye: konum ${pair(m.position)} metre`
        }
        unit="m"
        kind="river-path"
        points={[
          origin,
          { x: 0, y: width },
          ...(landing ? [landing] : []),
          ...(m ? [m.position] : []),
        ]}
      >
        {(p) => (
          <g
            data-crossing={
              m === null ? "unavailable" : m.atBank ? "arrived" : "crossing"
            }
          >
            <path
              className="physics015-bank"
              d={`M65 ${p.y(0)}H635M65 ${p.y(width)}H635`}
            />
            <text x="90" y={p.y(width) - 14}>
              Karşı kıyı
            </text>
            {landing && (
              <>
                <path
                  className="physics015-path-guide"
                  d={`M${p.x(0)} ${p.y(0)}L${p.x(landing.x)} ${p.y(landing.y)}`}
                />
                <circle
                  data-landing
                  data-world-x={landing.x}
                  data-world-y={landing.y}
                  cx={p.x(landing.x)}
                  cy={p.y(landing.y)}
                  r="5"
                  className="physics015-dot physics015-b"
                />
              </>
            )}
            {m && (
              <>
                <path
                  data-travelled
                  className="physics015-result-path"
                  d={`M${p.x(0)} ${p.y(0)}L${p.x(m.position.x)} ${p.y(m.position.y)}`}
                />
                <circle
                  data-boat
                  data-world-x={m.position.x}
                  data-world-y={m.position.y}
                  cx={p.x(m.position.x)}
                  cy={p.y(m.position.y)}
                  r="8"
                  className="physics015-dot physics015-result"
                />
              </>
            )}
          </g>
        )}
      </Plot>
      {m && (
        <Plot
          title={`Su ve akıntı hızlarının bileşkesi ${pair(m.bank)} metre bölü saniye`}
          unit="m/s"
          kind="river-velocities"
          points={[origin, m.water, m.bank]}
        >
          {(p, mark) => (
            <>
              <Arrow p={p} uid={mark} from={origin} to={m.water} name="water" />
              <Arrow
                p={p}
                uid={mark}
                from={m.water}
                to={m.bank}
                name="flow"
                kind="b"
              />
              <Arrow
                p={p}
                uid={mark}
                from={origin}
                to={m.bank}
                name="bank"
                kind="result"
              />
            </>
          )}
        </Plot>
      )}
      <p className="physics015-legend">
        Yol panelinde kesik çizgi hedef yolu, sürekli çizgi seçilen süreye kadar
        gidilen yolu gösterir. Hız panelinde su oku ile onun ucuna eklenen
        akıntı oku kıyı bileşkesini oluşturur; eksenler m/s cinsindedir.
      </p>
      <div data-model-result className="physics015-result">
        {m ? (
          <>
            <strong>
              Geçiş süresi:{" "}
              {m.crossingTime === null
                ? "sonlu varış yok"
                : `${fmt(m.crossingTime)} s`}
            </strong>
            <p>
              Su hızı: {pair(m.water)} m/s; akıntı: {pair(m.flow)} m/s; kıyı
              hızı: {pair(m.bank)} m/s.
            </p>
            <p>
              Seçilen an: {fmt(m.elapsed)} s, konum {pair(m.position)} m. Varış
              farkı:{" "}
              {m.drift === null
                ? "tanımsız"
                : `${fmt(m.drift)} m; ${expected.toLocaleLowerCase("tr-TR")}`}
              .
            </p>
            <p>
              Kıyıya göre yol:{" "}
              {m.bankPath === null ? "tanımsız" : `${fmt(m.bankPath)} m`}; suya
              göre yol:{" "}
              {m.waterPath === null ? "tanımsız" : `${fmt(m.waterPath)} m`}.
            </p>
          </>
        ) : (
          <>
            <strong>Tam karşıya sonlu varış yok</strong>
            <p>
              Su sürati {speed} m/s, akıntı {current} m/s. Yatay akıntıyı iptal
              ederken pozitif karşı kıyı bileşeni bırakan bir açı bulunmuyor.
            </p>
          </>
        )}
        <p>
          En kısa süre: {fmt(targets.quickestTime)} s. Tam karşı süre:{" "}
          {targets.directTime === null
            ? "bu koşulda sonlu değil"
            : `${fmt(targets.directTime)} s`}
          . Yol hedefiyle süre hedefini ayır.
        </p>
      </div>
      <Comparison
        uid={uid}
        question="Varış tam karşı noktaya göre nerede?"
        choices={["Aşağı akış", "Yukarı akış", "Tam karşı", "Sonlu varış yok"]}
        expected={expected}
        values={s}
        onChange={(v) => set(v)}
      >
        <p>
          Önce kıyıya göre yatay bileşeni, sonra geçiş süresini denetle.
          Referansları karıştırmadan x = vx t işlemi varış farkını verir.
        </p>
      </Comparison>
    </Frame>
  );
}
export default function Forge015PhysicsLab({ lessonId }: { lessonId: string }) {
  if (lessonId === "vektorler") return <Vectors />;
  if (lessonId === "bagil-hareket") return <Relative />;
  if (lessonId === "nehir-problemleri") return <River />;
  return null;
}
