import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ModelNumber } from "./ModelNumber";
import { useExploration } from "./useExploration";
import { useApp } from "../store";
import {
  cosmicScale024,
  quarkLedger024,
  decayLedger024,
  halfLife024,
  relativity024,
  eventTransform024,
  blackbody024,
  photoelectric024,
  compton024,
  electronWave024,
  attenuation024,
  echoDistance024,
  bandgap024,
  type Quark024,
  type Decay024,
} from "./forge024Physics";
import "./forge024Physics.css";
const fmt = (n: number, digits = 3) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(n) < 0.5 * 10 ** -digits ? 0 : n,
  );
const sci = (n: number) =>
  new Intl.NumberFormat("tr-TR", {
    notation: "scientific",
    maximumFractionDigits: 3,
  }).format(n);
const bounded = (x: number, min: number, max: number, fallback: number) =>
  Math.round(Number.isFinite(x) && x >= min && x <= max ? x : fallback);
type Guess = {
  guess: string;
  reason: string;
  checked: boolean;
  rawValid?: boolean;
};
const defaults = { guess: "", reason: "", checked: false };
function Compare({
  question,
  values,
  onChange,
  expected,
  children,
}: {
  question: string;
  values: Guess;
  onChange: (p: Partial<Guess>) => void;
  expected: string;
  children: ReactNode;
}) {
  const uid = useId();
  return (
    <fieldset className="physics024-compare">
      <legend>{question}</legend>
      <div className="physics024-guesses">
        {["Artar", "Azalır", "Aynı"].map((x) => (
          <label key={x}>
            <input
              type="radio"
              name={uid}
              value={x}
              checked={values.guess === x}
              onChange={() => onChange({ guess: x, checked: false })}
            />
            {x}
          </label>
        ))}
      </div>
      <label htmlFor={uid + "-reason"}>Modelden gerekçen</label>
      <textarea
        id={uid + "-reason"}
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
        disabled={
          values.rawValid === false ||
          !["Artar", "Azalır", "Aynı"].includes(values.guess) ||
          !values.reason.trim()
        }
        onClick={() => onChange({ checked: true })}
      >
        Kanıtla kıyasla
      </button>
      {values.rawValid !== false &&
        values.checked &&
        values.reason.trim() &&
        ["Artar", "Azalır", "Aynı"].includes(values.guess) && (
          <div className="physics024-feedback" role="status">
            <strong>
              {values.guess === expected
                ? "Tahminin koşullarla uyumlu."
                : "Tahminini kanıtla yeniden karşılaştır."}
            </strong>
            {children}
            <p>Gerekçen: {values.reason.slice(0, 120)}</p>
            <p className="small muted">
              Bu kıyas puan veya doğru cevap kaydı eklemez.
            </p>
          </div>
        )}
    </fieldset>
  );
}
function Choice({
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
    <div className="physics024-choice">
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
    <section className="physics024-lab" data-forge024={id}>
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="small muted">
        Keşif bu cihazda ayrı saklanır; konu, soru, XP veya ustalık kaydı
        eklemez.
      </p>
    </section>
  );
}
function Plot({
  title,
  height = 340,
  kind,
  children,
}: {
  title: string;
  height?: number;
  kind: string;
  children: (w: number, marker: string) => ReactNode;
}) {
  const uid = useId(),
    ref = useRef<SVGSVGElement>(null),
    [width, setWidth] = useState(320);
  useLayoutEffect(() => {
    const e = ref.current;
    if (!e) return;
    const measure = () => {
      const s = getComputedStyle(e),
        w =
          e.getBoundingClientRect().width -
          parseFloat(s.borderLeftWidth) -
          parseFloat(s.borderRightWidth);
      if (w > 0) setWidth((old) => (Math.abs(old - w) < 0.25 ? old : w));
    };
    measure();
    const o = new ResizeObserver(measure);
    o.observe(e);
    return () => o.disconnect();
  }, []);
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      style={{ height: height + 2 }}
      role="img"
      aria-labelledby={uid}
      data-physics024-plot={kind}
    >
      <title id={uid}>{title}</title>
      <defs>
        <marker
          id={uid + "-head"}
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
      {children(width, uid + "-head")}
    </svg>
  );
}
function usePhysicsExploration024<
  T extends Record<string, string | number | boolean>,
>(id: string, initial: T) {
  const [values, set] = useExploration(id, initial),
    raw = useApp().state.explorations[id];
  const valid =
    !raw ||
    Object.entries(initial).every(
      ([key, value]) =>
        !Object.hasOwn(raw, key) || typeof raw[key] === typeof value,
    );
  const safe = {
    ...values,
    reason: String(values.reason).slice(0, 120),
    checked: valid && values.checked === true,
    rawValid: valid,
  };
  const commit = (patch: Partial<typeof values>) =>
    set({ ...values, reason: safe.reason, ...patch });
  return [safe, commit] as const;
}
function Cosmic() {
  const id = "buyuk-patlama-atomalti",
    [s, set] = usePhysicsExploration024("forge024-physics-" + id, {
      ...defaults,
      emit: 100,
      receive: 150,
      observer: 2,
      hadron: "proton",
    });
  const emit = bounded(s.emit, 25, 200, 100),
    receive = Math.max(emit, bounded(s.receive, 100, 400, 150)),
    observer = bounded(s.observer, 0, 4, 2);
  const presets: Record<string, { name: string; parts: Quark024[] }> = {
    proton: { name: "Proton", parts: ["u", "u", "d"] },
    neutron: { name: "Nötron", parts: ["u", "d", "d"] },
    pion: { name: "Pozitif pion", parts: ["u", "antiD"] },
    anti: { name: "Antinötron", parts: ["antiU", "antiD", "antiD"] },
  };
  const key = Object.hasOwn(presets, s.hadron) ? s.hadron : "proton",
    q = quarkLedger024(presets[key].parts),
    m = cosmicScale024(emit / 100, receive / 100, observer),
    change = (p: Partial<typeof s>) => set({ ...p, checked: false });
  return (
    <Frame
      id={id}
      title="Ölçek ve parçacık defteri"
      intro="Eş hareketli beş noktanın aralığını büyüt; gözlemciyi değiştir. Bu düzlem evrenin haritası değil, yerel hareketi olmayan bir ölçek modelidir."
    >
      <div className="physics024-controls">
        <ModelNumber
          label="Yayım ölçeği ×100"
          value={emit}
          min={25}
          max={200}
          onChange={(v) => change({ emit: v, receive: Math.max(v, receive) })}
        />
        <ModelNumber
          label="Alım ölçeği ×100"
          value={receive}
          min={Math.max(100, emit)}
          max={400}
          onChange={(v) => change({ receive: v })}
        />
      </div>
      <div
        className="physics024-presets"
        role="group"
        aria-label="Gözlemci seç"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            type="button"
            key={i}
            aria-pressed={observer === i}
            onClick={() => change({ observer: i })}
          >
            G{i + 1} gözlemci
          </button>
        ))}
      </div>
      <Plot
        kind="cosmic-scale"
        title="Aynı göreli koordinatların iki kozmik ölçekte uzaklıkları"
        height={240}
      >
        {(w) => {
          const x = (d: number) => w / 2 + (d * (w - 48)) / 32;
          return (
            <>
              {[70, 165].map((y, i) => (
                <g key={y}>
                  <line
                    x1={20}
                    y1={y}
                    x2={w - 20}
                    y2={y}
                    className="physics024-axis"
                  />
                  <text x={16} y={y - 27}>
                    {i === 0 ? "Yayım" : "Alım"}
                  </text>
                  {m.galaxies.map((g) => (
                    <g
                      key={g.i}
                      data-galaxy={g.i}
                      data-before={g.before}
                      data-after={g.after}
                    >
                      <circle
                        cx={x(i ? g.after : g.before)}
                        cy={y}
                        r={g.i === observer ? 8 : 5}
                        fill={
                          g.i === observer
                            ? "var(--accent)"
                            : "var(--plot-blue)"
                        }
                      />
                    </g>
                  ))}
                </g>
              ))}
            </>
          );
        }}
      </Plot>
      <div
        className="physics024-result"
        data-model-result
        data-redshift={m.redshift}
        data-observer={observer}
      >
        <p>
          Ölçek oranı: {fmt(m.wavelengthRatio)}. Kırmızıya kayma z:{" "}
          {fmt(m.redshift)}.
        </p>
        <p>
          G{observer + 1} noktasına göre seçili uzaklıklar:{" "}
          {m.galaxies
            .map(
              (g) =>
                `G${g.i + 1}: ${fmt(Math.abs(g.before))} → ${fmt(Math.abs(g.after))}`,
            )
            .join("; ")}{" "}
          birim.
        </p>
        <p>
          1 + z = a<sub>alım</sub> / a<sub>yayım</sub>. Kozmolojik kayma her
          uzaklıkta salt SR Doppler etkisi değildir. Bağlı sistemler ve yerel
          hareketler bu sade ağın dışında.
        </p>
      </div>
      <Choice
        label="Valans bileşiği"
        value={key}
        options={Object.entries(presets).map(([k, p]) => [k, p.name])}
        onChange={(v) => change({ hadron: v })}
      />
      <Plot
        kind="quark-ledger"
        title={presets[key].name + " için valans kuark yük toplamı"}
        height={150}
      >
        {(w) => (
          <>
            {q.parts.map((part, i) => (
              <g key={i}>
                <circle
                  cx={(w * (i + 1)) / (q.parts.length + 1)}
                  cy={58}
                  r={23}
                  fill="var(--surface)"
                  stroke="var(--accent)"
                />
                <text
                  x={(w * (i + 1)) / (q.parts.length + 1)}
                  y={64}
                  textAnchor="middle"
                >
                  {part.startsWith("anti")
                    ? part.slice(4).toLowerCase() + "̄"
                    : part}
                </text>
              </g>
            ))}
            <text x={16} y={124}>
              Yük: {fmt(q.charge)} e; B: {fmt(q.baryonNumber)}
            </text>
          </>
        )}
      </Plot>
      <p>
        Seçilen sade bileşik:{" "}
        {q.family === "baryon"
          ? "Baryon"
          : q.family === "antibaryon"
            ? "Antibaryon"
            : "Mezon"}
        . Kuark başına B = 1/3, antikuark başına −1/3. Bu defter spin ve
        kararlılık vermez; hadron tayfının tümünü de üretmez.
      </p>
      <Compare
        question="Yayım ölçeği sabitken alım ölçeği büyürse gözlenen dalga boyu nasıl değişir?"
        values={s}
        onChange={set}
        expected="Artar"
      >
        <p>
          1 + z = a<sub>alım</sub> / a<sub>yayım</sub> büyür; aynı yayılan
          çizginin alınan dalga boyu artar. Gözlemci seçimi aralıkların ölçek
          oranını değiştirmez.
        </p>
      </Compare>
    </Frame>
  );
}
const radioPresets: Record<
  string,
  { label: string; A: number; Z: number; mode: Decay024 }
> = {
  u: { label: "U-238: alfa", A: 238, Z: 92, mode: "alpha" },
  c: { label: "C-14: beta eksi", A: 14, Z: 6, mode: "betaMinus" },
  n: { label: "N-13: beta artı", A: 13, Z: 7, mode: "betaPlus" },
  be: { label: "Be-7: elektron yakalama", A: 7, Z: 4, mode: "capture" },
  tc: { label: "Tc-99m: gama geçişi", A: 99, Z: 43, mode: "gamma" },
};
function Radioactivity() {
  const id = "radyoaktivite",
    [s, set] = usePhysicsExploration024("forge024-physics-" + id, {
      ...defaults,
      isotope: "u",
      initial: 8000,
      half: 4,
      time: 8,
    }),
    key = Object.hasOwn(radioPresets, s.isotope) ? s.isotope : "u",
    v = radioPresets[key],
    d = decayLedger024(v.A, v.Z, v.mode),
    initial = bounded(s.initial, 1000, 16000, 8000),
    half = bounded(s.half, 1, 12, 4),
    time = bounded(s.time, 0, 36, 8),
    m = halfLife024(initial, half, time),
    change = (p: Partial<typeof s>) => set({ ...p, checked: false });
  return (
    <Frame
      id={id}
      title="Çekirdek sayımı ve yarı ömür"
      intro="Gerçek bir bozunma örneğinde A, Z, N değişimini izle. Ardından ayrı bir temsili topluluğun yarı ömrünü değiştir; buradaki saat birimi seçilmiş izotopun gerçek yarı ömrü değildir."
    >
      <Choice
        label="Verilen bozunma"
        value={key}
        options={Object.entries(radioPresets).map(([k, v]) => [k, v.label])}
        onChange={(v) => change({ isotope: v })}
      />
      <Plot
        kind="decay-ledger"
        title={v.label + " için proton ve nötron sayılarının öncesi ve sonrası"}
        height={255}
      >
        {(w) => {
          const span = w - 48,
            bar = (n: number) => (n / 260) * span;
          return (
            <>
              {[
                [v.Z, v.A - v.Z],
                [d.daughterZ, d.daughterN],
              ].map(([z, n], i) => (
                <g key={i}>
                  <text x={16} y={35 + i * 115}>
                    {i ? "Ürün" : "Ana"}: A={i ? d.daughterA : v.A}
                  </text>
                  <rect
                    x={24}
                    y={50 + i * 115}
                    width={bar(z)}
                    height={22}
                    fill="var(--accent)"
                  />
                  <rect
                    x={24 + bar(z)}
                    y={50 + i * 115}
                    width={bar(n)}
                    height={22}
                    fill="var(--plot-blue)"
                  />
                  <text x={16} y={99 + i * 115}>
                    Z={z}; N={n}
                  </text>
                </g>
              ))}
            </>
          );
        }}
      </Plot>
      <div
        className="physics024-result"
        data-model-result
        data-daughter-a={d.daughterA}
        data-daughter-z={d.daughterZ}
        data-remaining={m.remaining}
      >
        <p>
          Ürün: A = {d.daughterA}, Z = {d.daughterZ}, N = {d.daughterN}.{" "}
          {v.mode === "betaMinus"
            ? "elektron + antinötrino (elektron türü, ν̄ₑ)"
            : d.lepton}
          .
        </p>
        <p>
          Alfa/beta ürünü mutlaka kararlı değildir. Gama A ve Z’yi korurken
          enerji ve gerçek kütle azalabilir. Q değeri bu hesabın dışında.
        </p>
      </div>
      <div className="physics024-controls">
        <ModelNumber
          label="Temsili ilk çekirdek sayısı"
          value={initial}
          min={1000}
          max={16000}
          onChange={(v) => change({ initial: v })}
        />
        <ModelNumber
          label="Temsili yarı ömür (saat)"
          value={half}
          min={1}
          max={12}
          onChange={(v) => change({ half: v })}
        />
        <ModelNumber
          label="Geçen süre (saat)"
          value={time}
          min={0}
          max={36}
          onChange={(v) => change({ time: v })}
        />
      </div>
      <Plot
        kind="half-life"
        title="Temsili toplulukta beklenen kalan payın zamana göre üstel azalması"
        height={260}
      >
        {(w) => {
          const x = (t: number) => 42 + (t / 36) * (w - 65),
            y = (f: number) => 215 - f * 160,
            path = Array.from({ length: 145 }, (_, i) => {
              const t = i / 4;
              return `${i ? "L" : "M"}${x(t)},${y(halfLife024(1, half, t).fraction)}`;
            }).join(" ");
          return (
            <>
              <path d={`M42 30V215H${w - 20}`} className="physics024-axis" />
              <path d={path} className="physics024-primary" />
              <circle
                cx={x(time)}
                cy={y(m.fraction)}
                r={5}
                className="physics024-probe-dot"
              />
              <text x={16} y={24}>
                Kalan pay
              </text>
              <text x={w - 65} y={244}>
                Saat
              </text>
            </>
          );
        }}
      </Plot>
      <p>
        Beklenen kalan: {fmt(m.remaining, 2)}; bozunan: {fmt(m.decayed, 2)}.
        Kalan pay: %{fmt(m.fraction * 100, 2)}. Bunlar topluluk için ortalama
        değerlerdir. Tek çekirdeğin kesin zamanı verilmez.
      </p>
      <Compare
        question="İlk sayı ve geçen pozitif süre aynıyken yarı ömür artarsa beklenen kalan sayı ne olur?"
        values={s}
        onChange={set}
        expected="Artar"
      >
        <p>
          N = N₀ · 2<sup>−t/T</sup>. T büyüyünce aynı sürede daha az yarı ömür
          geçer; daha çok çekirdek kalır.
        </p>
      </Compare>
    </Frame>
  );
}
function Relativity() {
  const id = "ozel-gorelilik",
    [s, set] = usePhysicsExploration024("forge024-physics-" + id, {
      ...defaults,
      beta: 60,
      proper: 8,
      length: 10,
      rest: 4,
      separation: 10,
    }),
    beta = bounded(s.beta, 0, 99, 60),
    proper = bounded(s.proper, 1, 20, 8),
    length = bounded(s.length, 1, 20, 10),
    rest = bounded(s.rest, 1, 10, 4),
    separation = bounded(s.separation, 0, 20, 10),
    m = relativity024(beta / 100, proper, length, rest),
    event = eventTransform024(beta / 100, 0, separation),
    change = (p: Partial<typeof s>) => set({ ...p, checked: false });
  return (
    <Frame
      id={id}
      title="Saat, çubuk ve olay çifti"
      intro="Kütleçekimi ihmal edilen eylemsiz laboratuvar S. Tek saatin iki tiki öz zamanı verir. S içinde çubuk boyu için iki uç aynı anda ölçülür."
    >
      <div className="physics024-controls">
        <ModelNumber
          label="Hız β ×100"
          value={beta}
          min={0}
          max={99}
          onChange={(v) => change({ beta: v })}
        />
        <ModelNumber
          label="Öz süre (s)"
          value={proper}
          min={1}
          max={20}
          onChange={(v) => change({ proper: v })}
        />
        <ModelNumber
          label="Öz boy (m)"
          value={length}
          min={1}
          max={20}
          onChange={(v) => change({ length: v })}
        />
        <ModelNumber
          label="Durgun enerji (MeV)"
          value={rest}
          min={1}
          max={10}
          onChange={(v) => change({ rest: v })}
        />
        <ModelNumber
          label="S de eşzamanlı olay ayrılığı (ışık-saniyesi)"
          value={separation}
          min={0}
          max={20}
          onChange={(v) => change({ separation: v })}
        />
      </div>
      <Plot
        kind="relativity"
        title="Çubuğun öz uzunluğu ve laboratuvarda paralel ölçülen boyu"
        height={240}
      >
        {(w) => {
          const scale = (w - 60) / 20;
          return (
            <>
              {[
                [length, "Öz boy"],
                [m.labLength, "Lab boyu"],
              ].map(([value, label], i) => (
                <g key={i}>
                  <text x={16} y={35 + i * 110}>
                    {label}
                  </text>
                  <line
                    x1={30}
                    y1={65 + i * 110}
                    x2={30 + Number(value) * scale}
                    y2={65 + i * 110}
                    className="physics024-primary"
                  />
                  <circle
                    cx={30}
                    cy={65 + i * 110}
                    r={4}
                    className="physics024-probe-dot"
                  />
                  <circle
                    cx={30 + Number(value) * scale}
                    cy={65 + i * 110}
                    r={4}
                    className="physics024-probe-dot"
                  />
                  <text x={16} y={99 + i * 110}>
                    {fmt(Number(value))} m
                  </text>
                </g>
              ))}
            </>
          );
        }}
      </Plot>
      <div
        className="physics024-result"
        data-model-result
        data-gamma={m.gamma}
        data-lab-time={m.labTime}
        data-lab-length={m.labLength}
      >
        <p>
          γ = {fmt(m.gamma, 6)}. S süresi: {fmt(m.labTime)} s; öz süre: {proper}{" "}
          s. S içinde paralel çubuk boyu: {fmt(m.labLength)} m.
        </p>
        <p>
          E₀ = {rest} MeV; toplam E = {fmt(m.totalMeV)} MeV; K ={" "}
          {fmt(m.kineticMeV)} MeV; p = {fmt(m.momentumMeVC)} MeV/c.
        </p>
        <p>
          S içinde Δct = 0, Δx = {separation} ışık-saniyesi. S′ +βc ile giderken
          Δct′ = {fmt(event.ctPrime)} ışık-saniyesi, Δx′ = {fmt(event.xPrime)}{" "}
          ışık-saniyesi. Uzak olaylar her iki sistemde de eşzamanlı olmak
          zorunda değildir.
        </p>
      </div>
      <Compare
        question="Öz süre sabitken β artarsa S süresi nasıl değişir?"
        values={s}
        onChange={set}
        expected="Artar"
      >
        <p>
          Δt = γΔτ ve γ = 1/√(1−β²). 0 ≤ β &lt; 1 iken hız arttıkça γ artar.
          Aynı olay çifti için öz süre ve S süresi kıyaslanır.
        </p>
      </Compare>
    </Frame>
  );
}
function Blackbody() {
  const id = "siyah-cisim-foton",
    [s, set] = usePhysicsExploration024("forge024-physics-" + id, {
      ...defaults,
      temperature: 4000,
      reference: 3000,
      area: 100,
      wavelength: 500,
    }),
    temperature = bounded(s.temperature, 500, 12000, 4000),
    reference = bounded(s.reference, 500, 12000, 3000),
    area = bounded(s.area, 1, 1000, 100),
    wavelength = bounded(s.wavelength, 200, 2000, 500),
    m = blackbody024(temperature, area / 100),
    other = blackbody024(reference, area / 100),
    photon = photoelectric024(1239.8419843320026 / wavelength, 1, 0, 0, 0),
    change = (p: Partial<typeof s>) => set({ ...p, checked: false });
  return (
    <Frame
      id={id}
      title="Ortak eksende iki termal tayf"
      intro="Planck Bλ radyansı: W·sr⁻¹·m⁻³. Dalga boyu ekseni logaritmik, bütün seriler ortak düşey ölçekte. Çizgi renkleri serileri ayırır; cismin görünür rengini simüle etmez."
    >
      <div className="physics024-controls">
        <ModelNumber
          label="Seçili sıcaklık (K)"
          value={temperature}
          min={500}
          max={12000}
          onChange={(v) => change({ temperature: v })}
        />
        <ModelNumber
          label="Kıyas sıcaklığı (K)"
          value={reference}
          min={500}
          max={12000}
          onChange={(v) => change({ reference: v })}
        />
        <ModelNumber
          label="Yüzey alanı ×100 (m²)"
          value={area}
          min={1}
          max={1000}
          onChange={(v) => change({ area: v })}
        />
        <ModelNumber
          label="Tek foton dalga boyu (nm)"
          value={wavelength}
          min={200}
          max={2000}
          onChange={(v) => change({ wavelength: v })}
        />
      </div>
      <Plot
        kind="planck"
        title="Seçili ve karşılaştırma sıcaklıklarının Planck spektrumları"
        height={320}
      >
        {(w) => {
          const max = Math.max(
              ...m.spectrum.map((p) => p.radiance),
              ...other.spectrum.map((p) => p.radiance),
            ),
            x = (l: number) =>
              38 + (Math.log(l / 50) / Math.log(1000)) * (w - 62),
            y = (v: number) => 265 - (v / max) * 210,
            path = (points: typeof m.spectrum) =>
              points
                .map(
                  (p, i) =>
                    `${i ? "L" : "M"}${x(p.wavelengthNm)},${y(p.radiance)}`,
                )
                .join(" ");
          return (
            <>
              <path d={`M38 35V265H${w - 20}`} className="physics024-axis" />
              <path d={path(m.spectrum)} className="physics024-primary" />
              <path d={path(other.spectrum)} className="physics024-secondary" />
              <text x={16} y={24}>
                Bλ
              </text>
              <text x={38} y={292}>
                50
              </text>
              <text x={x(1000)} y={292} textAnchor="middle">
                1000
              </text>
              <text x={w - 18} y={292} textAnchor="end">
                50000 nm
              </text>
            </>
          );
        }}
      </Plot>
      <div
        className="physics024-result"
        data-model-result
        data-peak-nm={m.peakNm}
        data-power-w={m.power}
      >
        <p>
          Düz çizgi: {temperature} K; kesikli çizgi: {reference} K. Seçili Bλ
          tepesi: {fmt(m.peakNm)} nm; kıyas tepesi: {fmt(other.peakNm)} nm.
        </p>
        <p>
          Seçili birim alan toplam yayımı: {fmt(m.exitance, 2)} W/m².{" "}
          {fmt(m.area)} m² yüzeyin toplam gücü: {fmt(m.power, 2)} W. Alan
          değişimi Bλ eğrisini veya tepeyi değiştirmez; toplam gücü değiştirir.
        </p>
        <p>
          {wavelength} nm tek foton: {fmt(photon.photonEV, 4)} eV; f =
          {sci(photon.frequencyHz)} Hz. Bu tek foton verisi termal tayfın tamamı
          değildir.
        </p>
      </div>
      <Compare
        question="Alan aynıyken sıcaklık iki kat olursa Bλ tepe dalga boyu nasıl değişir?"
        values={s}
        onChange={set}
        expected="Azalır"
      >
        <p>
          λtepe = b/T ile tepe yarıya iner. Alan başına toplam yayım ise T⁴
          nedeniyle 16 kat olur; iki sonuç farklı nicelikleri anlatır.
        </p>
      </Compare>
    </Frame>
  );
}
function Photoelectric() {
  const id = "fotoelektrik-olay",
    [s, set] = usePhysicsExploration024("forge024-physics-" + id, {
      ...defaults,
      energy: 40,
      work: 20,
      flux: 5,
      yield: 80,
      bias: 0,
    }),
    energy = bounded(s.energy, 1, 100, 40),
    work = bounded(s.work, 1, 60, 20),
    flux = bounded(s.flux, 0, 20, 5),
    yieldPercent = bounded(s.yield, 0, 100, 80),
    bias = bounded(s.bias, -60, 60, 0),
    m = photoelectric024(
      energy / 10,
      work / 10,
      flux * 1e13,
      yieldPercent / 100,
      bias / 10,
    ),
    change = (p: Partial<typeof s>) => set({ ...p, checked: false });
  return (
    <Frame
      id={id}
      title="Bir fotonun enerjisi ve elektron sayacı"
      intro="Düşük şiddetli tek foton dış fotoetki modeli. İş fonksiyonu seçilen yüzeyin değeri; η verilmiş verimdir. İdeal doyma üst sınırı gösterilir, ölçülmüş bir I-V eğrisi üretilmez."
    >
      <div className="physics024-controls">
        <ModelNumber
          label="Foton enerjisi ×10 (eV)"
          value={energy}
          min={1}
          max={100}
          onChange={(v) => change({ energy: v })}
        />
        <ModelNumber
          label="İş fonksiyonu ×10 (eV)"
          value={work}
          min={1}
          max={60}
          onChange={(v) => change({ work: v })}
        />
        <ModelNumber
          label="Foton akısı ×10¹³ (s⁻¹)"
          value={flux}
          min={0}
          max={20}
          onChange={(v) => change({ flux: v })}
        />
        <ModelNumber
          label="Kuantum verimi (%)"
          value={yieldPercent}
          min={0}
          max={100}
          onChange={(v) => change({ yield: v })}
        />
        <ModelNumber
          label="Anot gerilimi ×10 (V)"
          value={bias}
          min={-60}
          max={60}
          onChange={(v) => change({ bias: v })}
        />
      </div>
      <Plot
        kind="photoelectric-energy"
        title="Maksimum çıkış kinetik enerjisinin frekansla doğrusal ilişkisi"
        height={300}
      >
        {(w) => {
          const x = (e: number) => 40 + (e / 10) * (w - 65),
            y = (k: number) => 245 - (k / 10) * 190,
            points = Array.from({ length: 101 }, (_, i) => i / 10)
              .filter((e) => e >= work / 10)
              .map((e) => ({ e, k: e - work / 10 })),
            path = points
              .map((p, i) => `${i ? "L" : "M"}${x(p.e)},${y(p.k)}`)
              .join(" ");
          return (
            <>
              <path d={`M40 30V245H${w - 20}`} className="physics024-axis" />
              <path d={path} className="physics024-primary" />
              {m.allowed && (
                <circle
                  cx={x(m.photonEV)}
                  cy={y(m.maxKineticEV!)}
                  r={5}
                  className="physics024-probe-dot"
                />
              )}
              <line
                x1={x(work / 10)}
                y1={40}
                x2={x(work / 10)}
                y2={245}
                className="physics024-probe"
              />
              <text x={16} y={23}>
                Kmax (eV)
              </text>
              <text x={40} y={278}>
                0
              </text>
              <text x={w - 18} y={278} textAnchor="end">
                24,18 ×10¹⁴ Hz
              </text>
            </>
          );
        }}
      </Plot>
      <div
        className="physics024-result"
        data-model-result
        data-emission={String(m.allowed)}
        data-max-ev={m.maxKineticEV === null ? "none" : m.maxKineticEV}
        data-stopping-v={m.stoppingV === null ? "none" : m.stoppingV}
        data-current-a={m.saturationUpperA}
      >
        <p>
          Foton: {fmt(m.photonEV)} eV; f = {sci(m.frequencyHz)} Hz; λ =
          {fmt(m.wavelengthNm)} nm. Eşik: {fmt(m.thresholdNm)} nm.
        </p>
        <p>
          {m.allowed
            ? `Kmax=${fmt(m.maxKineticEV!)} eV; kesme büyüklüğü = ${fmt(m.stoppingV!)} V.`
            : "Eşik altında: kopan elektron yok. Kmax ve kesme değeri bu durumda tanımlı değil."}
        </p>
        <p>
          Optik güç: {sci(m.opticalPowerW)} W. Verilen η ile ideal doyma üst
          sınırı: {fmt(m.saturationUpperA * 1e6)} μA.
        </p>
        <p>
          {m.arrivalEV === null
            ? "Kopan elektron olmadığı için anoda varış enerjisi yok."
            : m.canArrive
              ? `En hızlı elektron için anoda varış enerji bütçesi ${fmt(m.arrivalEV)} eV; ulaşması enerji bakımından mümkün.`
              : m.arrivalEV === 0
                ? "Üst enerji anotta 0 sınırında; bu ideal kesme / toplama sınırıdır."
                : "Ters alan en hızlı elektronu bile durdurur; anoda varış yok."}
        </p>
        <p>
          Kmax bir üst sınırdır; her çıkan elektron bu enerjide değildir. V =
          Vanot − Vkatot. Eşikte kopma enerji koşulu ile toplanan akım ayrı
          koşullardır.
        </p>
      </div>
      <Compare
        question="Frekans, yüzey ve η aynı, eşik üstünde foton/s iki kat olursa ideal doyma akımı nasıl değişir?"
        values={s}
        onChange={set}
        expected="Artar"
      >
        <p>
          Iüst = eηΦ iki kat olur; Kmax = hf − W ve kesme gerilimi aynı kalır.
          Eşik altına bu sonuç elektron üretimi diye taşınmaz.
        </p>
      </Compare>
    </Frame>
  );
}
function Compton() {
  const id = "compton-debroglie",
    [s, set] = usePhysicsExploration024("forge024-physics-" + id, {
      ...defaults,
      wavelength: 10,
      angle: 90,
      voltage: 100,
    }),
    wavelength = bounded(s.wavelength, 1, 100, 10),
    angle = bounded(s.angle, 0, 180, 90),
    voltage = bounded(s.voltage, 10, 100000, 100),
    m = compton024(wavelength, angle),
    wave = electronWave024(voltage),
    change = (p: Partial<typeof s>) => set({ ...p, checked: false });
  return (
    <Frame
      id={id}
      title="Saçılma üçgeni ve madde dalgası"
      intro="Serbest, durgun elektron; gelen foton +x yönünde. Ok boyu momentum ile orantılıdır. Elektronun açısı foton saçılma açısı değildir."
    >
      <div className="physics024-controls">
        <ModelNumber
          label="Gelen dalga boyu (pm)"
          value={wavelength}
          min={1}
          max={100}
          onChange={(v) => change({ wavelength: v })}
        />
        <ModelNumber
          label="Foton saçılma açısı (°)"
          value={angle}
          min={0}
          max={180}
          onChange={(v) => change({ angle: v })}
        />
        <ModelNumber
          label="Elektron hızlandırma gerilimi (V)"
          value={voltage}
          min={10}
          max={100000}
          onChange={(v) => change({ voltage: v })}
        />
      </div>
      <Plot
        kind="compton-momentum"
        title="Foton ve geri tepen elektronun ölçekli momentum vektörleri"
        height={330}
      >
        {(w, head) => {
          const origin = { x: w / 2, y: 155 },
            scale = Math.min((w - 50) / 2, 115) / (2 * m.initialKeV),
            x = (p: number) => origin.x + p * scale,
            y = (p: number) => origin.y - p * scale;
          return (
            <>
              <line
                x1={20}
                y1={155}
                x2={w - 20}
                y2={155}
                className="physics024-axis"
              />
              <line
                x1={origin.x}
                y1={40}
                x2={origin.x}
                y2={285}
                className="physics024-axis"
              />
              <line
                x1={origin.x}
                y1={origin.y}
                x2={x(m.initialKeV)}
                y2={155}
                className="physics024-probe"
                markerEnd={`url(#${head})`}
                data-momentum="initial"
              />
              <line
                x1={origin.x}
                y1={155}
                x2={x(m.photonX)}
                y2={y(m.photonY)}
                className="physics024-primary"
                markerEnd={`url(#${head})`}
                data-momentum="photon"
              />
              <line
                x1={origin.x}
                y1={155}
                x2={x(m.recoilX)}
                y2={y(m.recoilY)}
                className="physics024-secondary"
                markerEnd={`url(#${head})`}
                data-momentum="electron"
              />
              <text x={16} y={25}>
                +y
              </text>
              <text x={w - 38} y={142}>
                +x
              </text>
              <text x={16} y={310}>
                p (keV/c)
              </text>
            </>
          );
        }}
      </Plot>
      <div
        className="physics024-result"
        data-model-result
        data-shift-pm={m.shiftPm}
        data-electron-kev={m.kineticKeV}
        data-electron-wave-pm={wave.wavelengthPm}
      >
        <p>
          Δλ={fmt(m.shiftPm, 6)} pm; λ′ = {fmt(m.scatteredPm, 6)} pm. Eilk=
          {fmt(m.initialKeV, 6)} keV; Eson = {fmt(m.scatteredKeV, 6)} keV; Ke =
          {fmt(m.kineticKeV, 6)} keV.
        </p>
        <p>
          Elektron momentum bileşenleri: ({fmt(m.recoilX)}, {fmt(m.recoilY)})
          keV/c. Son foton: ({fmt(m.photonX)}, {fmt(m.photonY)}) keV/c. Y
          bileşenleri birbirini götürür.
        </p>
        <p>
          Ayrı deney: İlk hızı 0 olan elektron {voltage} V ile hızlanır. Göreli
          de Broglie λ={fmt(wave.wavelengthPm, 6)} pm; düşük enerji yaklaşımı =
          {fmt(wave.nonrelPm, 6)} pm. K/mc²={fmt(wave.kineticToRest, 6)}. Gerçek
          λ = h/p; bu elektron foton değildir.
        </p>
      </div>
      <Compare
        question="Aynı elektron ve gelen dalga boyunda θ, 0° ile 180° arasında artarken dalga boyu kayması nasıl değişir?"
        values={s}
        onChange={set}
        expected="Artar"
      >
        <p>
          Δλ = λC (1 − cosθ), 0 ile 2λC arasında artar. Fotonun boşluk hızı
          değişmez; enerji farkı elektrona gider.
        </p>
      </Compare>
    </Frame>
  );
}
const mapMaterials = [
  { name: "Düşük", mu: 0.1 },
  { name: "Orta", mu: 0.5 },
  { name: "Yüksek", mu: 1.2 },
];
function Technology() {
  const id = "modern-fizik-teknoloji",
    [s, set] = usePhysicsExploration024("forge024-physics-" + id, {
      ...defaults,
      map: "000010000",
      beam: 1,
      cell: 10,
      gap: 20,
      wavelength: 500,
      echoMode: "ultrasound",
      echoTime: 80,
    }),
    map = /^[012]{9}$/.test(s.map) ? s.map : "000010000",
    cells = [...map].map((c) => Number(c)),
    beam = bounded(s.beam, 0, 5, 1),
    cell = bounded(s.cell, 1, 30, 10),
    gap = bounded(s.gap, 5, 50, 20),
    wavelength = bounded(s.wavelength, 300, 2000, 500),
    echoTime = bounded(s.echoTime, 1, 2000, 80),
    echoMode = ["ultrasound", "sonar", "radar"].includes(s.echoMode)
      ? s.echoMode
      : "ultrasound",
    speed =
      echoMode === "radar" ? 299792458 : echoMode === "sonar" ? 1500 : 1540,
    m = attenuation024(
      cells.map((c) => mapMaterials[c].mu),
      cell / 10,
      1000,
    ),
    band = bandgap024(gap / 10, wavelength),
    distance = echoDistance024(speed, echoTime * 1e-6),
    transmissions = [...m.rows, ...m.columns],
    change = (p: Partial<typeof s>) => set({ ...p, checked: false });
  return (
    <Frame
      id={id}
      title="İz düşüm, bant eşiği ve yankı"
      intro="Üç bağımsız öğretim modeli. Zayıflama: tek enerjili, birincil ışın, saçılma yok. Harita klinik görüntü değildir; tam BT görüntüsü de kurmaz. Her hücre seçilen enerjideki μ değeridir."
    >
      <p>
        Bir hücreye basarak düşük → orta → yüksek μ arasında değiştir. Düşük
        0,1; orta 0,5; yüksek 1,2 cm⁻¹. Kesikli sınır orta, kalın sınır yüksek
        değeri de ayırır.
      </p>
      <div
        className="physics024-map"
        role="group"
        aria-label="Zayıflama haritası"
      >
        {cells.map((c, i) => (
          <button
            type="button"
            key={i}
            data-material={c}
            aria-pressed={
              beam < 3 ? Math.floor(i / 3) === beam : i % 3 === beam - 3
            }
            aria-label={`Satır ${Math.floor(i / 3) + 1}, sütun ${(i % 3) + 1} ${mapMaterials[c].name}, μ değerini değiştir`}
            onClick={() => {
              const values = [...cells];
              values[i] = (c + 1) % 3;
              change({ map: values.join("") });
            }}
          >
            <span>
              Satır {Math.floor(i / 3) + 1}, sütun {(i % 3) + 1}
            </span>{" "}
            <strong>{mapMaterials[c].name}</strong>
          </button>
        ))}
      </div>
      <div className="physics024-controls">
        <ModelNumber
          label="Hücre yolu ×10 (cm)"
          value={cell}
          min={1}
          max={30}
          onChange={(v) => change({ cell: v })}
        />
        <Choice
          label="Seçili ışın yolu"
          value={String(beam)}
          options={[0, 1, 2, 3, 4, 5].map((i) => [
            String(i),
            i < 3 ? `Yatay satır ${i + 1}` : `Dikey sütun ${i - 2}`,
          ])}
          onChange={(v) => change({ beam: Number(v) })}
        />
      </div>
      <Plot
        kind="projection"
        title="Üç yatay ve üç dikey ışının hesaplanan birincil iletimi"
        height={300}
      >
        {(w) => (
          <>
            {transmissions.map((v, i) => (
              <g key={i}>
                <text x={12} y={37 + i * 43}>
                  {i < 3 ? "Y" : "D"}
                  {(i % 3) + 1}
                </text>
                <rect
                  x={50}
                  y={18 + i * 43}
                  width={(v / 1000) * (w - 76)}
                  height={24}
                  fill={i === beam ? "var(--accent)" : "var(--plot-blue)"}
                  data-projection={i}
                  data-intensity={v}
                />
              </g>
            ))}
            <text x={12} y={290}>
              Y:yatay;D:dikey
            </text>
          </>
        )}
      </Plot>
      <div
        className="physics024-result"
        data-model-result
        data-selected-intensity={transmissions[beam]}
        data-band-allowed={String(band.allowed)}
        data-echo-m={distance}
      >
        <p>
          Başlangıç I₀ = 1000 birim. Seçili yolun iletimi:{" "}
          {fmt(transmissions[beam], 4)}. I/I₀=
          {fmt(transmissions[beam] / 1000, 6)}.
        </p>
        <p>
          Yatay iletimler: {m.rows.map((v) => fmt(v, 4)).join("; ")}. Dikey
          iletimler: {m.columns.map((v) => fmt(v, 4)).join("; ")}.
        </p>
        <p>
          I = I₀ exp(−ΣμL). Aynı yol toplamını veren farklı iç haritalar tek
          projeksiyon ile ayırt edilemez. İki yönün verisi tam klinik BT için
          yeterli sayılmaz.
        </p>
      </div>
      <h4>Yarı iletkende tek foton enerji koşulu</h4>
      <div className="physics024-controls">
        <ModelNumber
          label="Bant aralığı ×10 (eV)"
          value={gap}
          min={5}
          max={50}
          onChange={(v) => change({ gap: v })}
        />
        <ModelNumber
          label="Gelen ışık dalga boyu (nm)"
          value={wavelength}
          min={300}
          max={2000}
          onChange={(v) => change({ wavelength: v })}
        />
      </div>
      <Plot
        kind="bandgap"
        title="Valans ve iletim bandı arasında verilen Eg aralığı"
        height={270}
      >
        {(w, head) => {
          const bottom = 215,
            top = 215 - (gap / 10) * 32;
          return (
            <>
              <line
                x1={35}
                y1={bottom}
                x2={w - 25}
                y2={bottom}
                className="physics024-secondary"
              />
              <line
                x1={35}
                y1={top}
                x2={w - 25}
                y2={top}
                className="physics024-primary"
              />
              <text x={16} y={245}>
                Valans bandı
              </text>
              <text x={16} y={top - 15}>
                İletim bandı
              </text>
              <line
                x1={w / 2}
                y1={bottom - 10}
                x2={w / 2}
                y2={band.allowed ? top + 10 : bottom - 32}
                className="physics024-probe"
                markerEnd={`url(#${head})`}
              />
              <circle
                cx={w / 2}
                cy={band.allowed ? top : bottom}
                r={6}
                className="physics024-probe-dot"
              />
            </>
          );
        }}
      </Plot>
      <p>
        Eg={fmt(band.gapEV)} eV, Eγ = {fmt(band.photonEV, 4)} eV.{" "}
        {band.allowed
          ? `Enerji eşiği geçildi; fazla ${fmt(band.excessEV!, 4)} eV.`
          : "Tek foton bant geçişi için enerji yetersiz."}{" "}
        Eşik dalga boyu: {fmt(band.cutoffNm)} nm. Enerji koşulu gerçek toplama
        verimini tek başına vermez.
      </p>
      <p>
        PN eklemi taşıyıcıları ayırabilir: eklemin iç alanında elektron alanın
        tersine, delik alan yönüne sürüklenir. Delik pozitron değildir. LED’de
        birleşme ışık üretir. Fotovoltaik olayda soğurma ile oluşan taşıyıcılar
        elektrik akımı verebilir.
      </p>
      <h4>Yankı süresinden uzaklık</h4>
      <div className="physics024-controls">
        <Choice
          label="Yankı dalgası"
          value={echoMode}
          options={[
            ["ultrasound", "Dokuda ultrason: 1540 m/s"],
            ["sonar", "Suda sonar: 1500 m/s"],
            ["radar", "Boşlukta radar: c"],
          ]}
          onChange={(v) => change({ echoMode: v })}
        />
        <ModelNumber
          label="Gidiş dönüş süresi (μs)"
          value={echoTime}
          min={1}
          max={2000}
          onChange={(v) => change({ echoTime: v })}
        />
      </div>
      <p>
        d=vt/2={fmt(distance, 6)} m. Hız verilen ortam için sabittir; tek
        yansıma ve düz yol varsayıldı. Radar EM dalga kullanır: elektrik ve
        manyetik alan dalgası. Sonar ve ultrason mekanik dalga kullanır.
      </p>
      <Compare
        question="Aynı μ ve kaynakta seçili ışın yolunun kalınlığı artarsa birincil iletim nasıl değişir?"
        values={s}
        onChange={set}
        expected="Azalır"
      >
        <p>
          ΣμL artar, e<sup>−ΣμL</sup> küçülür. Kaybolan birincil akı, bu sade
          modelde algılayıcıya aynı doğrultuda ulaşmayan paydır.
        </p>
      </Compare>
    </Frame>
  );
}
export default function Forge024PhysicsLab({ lessonId }: { lessonId: string }) {
  return lessonId === "buyuk-patlama-atomalti" ? (
    <Cosmic />
  ) : lessonId === "radyoaktivite" ? (
    <Radioactivity />
  ) : lessonId === "ozel-gorelilik" ? (
    <Relativity />
  ) : lessonId === "siyah-cisim-foton" ? (
    <Blackbody />
  ) : lessonId === "fotoelektrik-olay" ? (
    <Photoelectric />
  ) : lessonId === "compton-debroglie" ? (
    <Compton />
  ) : lessonId === "modern-fizik-teknoloji" ? (
    <Technology />
  ) : null;
}
