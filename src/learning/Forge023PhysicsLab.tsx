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
  optics023,
  soundDoppler023,
  lightDoppler023,
  electromagnetic023,
  bohr023,
  atomTransition023,
  excitation023,
} from "./forge023Physics";
import "./forge023Physics.css";
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
    <fieldset className="physics023-compare">
      <legend>{question}</legend>
      <div className="physics023-guesses">
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
          <div className="physics023-feedback" role="status">
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
    <div className="physics023-choice">
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
    <section className="physics023-lab" data-forge023={id}>
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
      data-physics023-plot={kind}
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
const numericRule023 = (min: number, max: number) => (value: unknown) =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value >= min &&
  value <= max;
const enumRule023 = (choices: readonly string[]) => (value: unknown) =>
  typeof value === "string" && choices.includes(value);
const restoredRules023: Record<string, (value: unknown) => boolean> = {
  guess: enumRule023(["", "Artar", "Azalır", "Aynı"]),
  mode: enumRule023(["double", "single"]),
  lambda: numericRule023(350, 750),
  index: numericRule023(100, 200),
  distance: numericRule023(10, 30),
  aperture: numericRule023(100, 1000),
  delay: numericRule023(0, 1200),
  probe: numericRule023(-120, 120),
  kind: enumRule023(["sound", "light"]),
  frequency: numericRule023(200, 1000),
  source: numericRule023(-200, 200),
  receiver: numericRule023(-200, 200),
  beta: numericRule023(-80, 80),
  wavelength: numericRule023(400, 700),
  band: enumRule023([
    "radio",
    "micro",
    "infrared",
    "visible",
    "uv",
    "xray",
    "gamma",
  ]),
  amplitude: numericRule023(10, 200),
  phase: numericRule023(0, 360),
  angle: numericRule023(0, 180),
  direction: enumRule023(["1", "-1"]),
  tab: enumRule023(["levels", "excite", "history"]),
  z: numericRule023(1, 3),
  initial: numericRule023(1, 6),
  final: numericRule023(1, 6),
  particle: enumRule023(["photon", "electron"]),
  incident: numericRule023(0, 600),
  model: enumRule023(["dalton", "thomson", "rutherford", "bohr", "modern"]),
};
function usePhysicsExploration023<
  T extends Record<string, string | number | boolean>,
>(id: string, initial: T) {
  const [values, set] = useExploration(id, initial),
    raw = useApp().state.explorations[id];
  const accepts = (key: string, value: unknown) =>
    typeof value === typeof initial[key] &&
    (!Object.hasOwn(restoredRules023, key) || restoredRules023[key](value));
  const canonical = {
    ...(Object.fromEntries(
      Object.entries(values).map(([key, value]) => [
        key,
        accepts(key, value) ? value : initial[key],
      ]),
    ) as typeof values),
    reason: String(values.reason).slice(0, 120),
  };
  const inactive = id.endsWith("isik-teorileri")
    ? canonical.mode === "single"
      ? ["delay"]
      : []
    : id.endsWith("doppler-etkisi")
      ? canonical.kind === "light"
        ? ["frequency", "source", "receiver"]
        : ["beta", "wavelength"]
      : id.endsWith("atom-modelleri-fizik")
        ? canonical.tab === "history"
          ? ["z", "initial", "final", "particle", "incident"]
          : canonical.tab === "excite"
            ? ["initial", "final", "model"]
            : ["particle", "incident", "model"]
        : [];
  const valid =
    !raw ||
    Object.keys(initial).every(
      (key) =>
        inactive.includes(key) ||
        !Object.hasOwn(raw, key) ||
        accepts(key, raw[key]),
    );
  const safe = {
    ...canonical,
    checked: valid && canonical.checked === true,
    rawValid: valid,
  };
  const commit = (patch: Partial<typeof values>) =>
    set({
      ...canonical,
      checked: safe.checked,
      ...patch,
      reason: String(patch.reason ?? canonical.reason).slice(0, 120),
    });
  return [safe, commit] as const;
}
function Optics() {
  const id = "isik-teorileri",
    [s, set] = usePhysicsExploration023("forge023-physics-" + id, {
      ...defaults,
      mode: "double",
      lambda: 600,
      index: 100,
      distance: 20,
      aperture: 300,
      delay: 0,
      probe: 0,
    });
  const mode = s.mode === "single" ? "single" : "double",
    lambda = bounded(s.lambda, 350, 750, 600),
    index = bounded(s.index, 100, 200, 100),
    distance = bounded(s.distance, 10, 30, 20),
    aperture = bounded(s.aperture, 100, 1000, 300),
    delay = mode === "single" ? 0 : bounded(s.delay, 0, 1200, 0),
    probe = bounded(s.probe, -120, 120, 0);
  const change = (p: Partial<typeof s>) => set({ ...p, checked: false });
  const m = optics023(
    mode,
    lambda,
    index / 100,
    distance / 10,
    aperture / 1000,
    delay,
    probe / 10,
  );
  return (
    <Frame
      id={id}
      title="Perdeyi değiştir, nedeni bul"
      intro="Tek bir değişken seç. Aralık, merkezin yeri ve parlaklığı ayrı ayrı oku; sonra çift ve tek yarığı karşılaştır."
    >
      <div className="physics023-controls">
        <Choice
          label="Deney"
          value={mode}
          options={[
            ["double", "Çift yarık"],
            ["single", "Tek yarık"],
          ]}
          onChange={(mode) => change({ mode, delay: 0 })}
        />
        <ModelNumber
          label="Boşluk dalga boyu (nm)"
          value={lambda}
          min={350}
          max={750}
          onChange={(lambda) => change({ lambda })}
        />
        <ModelNumber
          label="Ortam indisi ×100"
          value={index}
          min={100}
          max={200}
          onChange={(index) => change({ index })}
        />
        <ModelNumber
          label="Perde uzaklığı (dm)"
          value={distance}
          min={10}
          max={30}
          onChange={(distance) => change({ distance })}
        />
        <ModelNumber
          label="Açıklık (μm)"
          value={aperture}
          min={100}
          max={1000}
          onChange={(aperture) => change({ aperture })}
        />
        {mode === "double" && (
          <ModelNumber
            label="Üst kol ek yolu (nm)"
            value={delay}
            min={0}
            max={1200}
            onChange={(delay) => change({ delay })}
          />
        )}
        <ModelNumber
          label="Seçili y ×10 (mm)"
          value={probe}
          min={-120}
          max={120}
          onChange={(probe) => change({ probe })}
        />
      </div>
      <Plot
        kind="optics"
        title="Sabit perde konum ekseninde hesaplanan bağıl ışık şiddeti"
      >
        {(w) => {
          const x = (y: number) => 45 + ((y + 15) / 30) * (w - 65),
            y = (i: number) => 265 - 190 * i;
          return (
            <>
              <path className="physics023-axis" d={`M45 50V265H${w - 20}`} />
              {[-10, 0, 10].map((t) => (
                <g key={t}>
                  <path className="physics023-axis" d={`M${x(t)} 265v6`} />
                  <text x={x(t)} y={295} textAnchor="middle">
                    {t}
                  </text>
                </g>
              ))}
              <text x={13} y={77}>
                1
              </text>
              <text x={13} y={270}>
                0
              </text>
              <text x={w / 2} y={325} textAnchor="middle">
                y (mm)
              </text>
              <text x={45} y={25}>
                I / Imax
              </text>
              <path
                data-intensity-profile={mode}
                className="physics023-primary"
                d={m.profile
                  .map(
                    (p, i) => `${i ? "L" : "M"}${x(p.yMm)} ${y(p.intensity)}`,
                  )
                  .join(" ")}
              />
              <path
                className="physics023-probe"
                d={`M${x(m.probe.yMm)} 55V265`}
              />
              <circle
                className="physics023-probe-dot"
                cx={x(m.probe.yMm)}
                cy={y(m.probe.intensity)}
                r={5}
              />
            </>
          );
        }}
      </Plot>
      <div
        className="physics023-result"
        data-model-result
        data-spacing-mm={m.spacingMm}
        data-center-mm={m.centerMm}
        data-intensity={m.probe.intensity}
      >
        <strong>
          {mode === "single" ? "İlk minimum adımı" : "Saçak aralığı"}:{" "}
          {fmt(m.spacingMm)} mm.
        </strong>
        <p>
          Merkez genişliği: {fmt(m.centralWidthMm)} mm. İzlenen merkez çizgisi:
          y={fmt(m.centerMm)} mm.
        </p>
        <p>
          Ortam dalga boyu: {fmt(m.lambdaMediumNm)} nm. L={fmt(m.distance)} m;
          açıklık={aperture} μm; n={fmt(m.refractiveIndex)}.
        </p>
        <p>
          Seçili y={fmt(m.probe.yMm)} mm için bağıl şiddet: %
          {fmt(100 * m.probe.intensity, 2)}.
        </p>
      </div>
      <p className="small muted">
        Üst yarık +y tarafında. Çift yarık eş genlikli ideal kaynak; tek yarık
        düzgün açıklık ve uzak alan modelidir. Grafikteki eksen sabit; dar
        tepeler örnek aralığı nedeniyle sınırlı görünür. Faz gecikmesi, çift
        yarığın izlenen m=0 çizgisini kaydırır.
      </p>
      <Compare
        question="Aynı λ₀, n ve açıklıkla L iki kat olsaydı merkez genişliği ne olurdu?"
        values={s}
        onChange={set}
        expected="Artar"
      >
        <p>
          Genişlik L ile doğru orantılıdır; {fmt(m.centralWidthMm)} mm yerine{" "}
          {fmt(2 * m.centralWidthMm)} mm olurdu. Parlaklık bu oranı belirlemez.
        </p>
      </Compare>
    </Frame>
  );
}
function Doppler() {
  const id = "doppler-etkisi",
    [s, set] = usePhysicsExploration023("forge023-physics-" + id, {
      ...defaults,
      kind: "sound",
      frequency: 500,
      source: 0,
      receiver: 0,
      beta: 0,
      wavelength: 600,
    });
  const change = (p: Partial<typeof s>) => set({ ...p, checked: false });
  const kind = s.kind === "light" ? "light" : "sound",
    frequency = bounded(s.frequency, 200, 1000, 500),
    source = bounded(s.source, -200, 200, 0),
    receiver = bounded(s.receiver, -200, 200, 0),
    beta = bounded(s.beta, -80, 80, 0),
    wavelength = bounded(s.wavelength, 400, 700, 600);
  const sound = soundDoppler023(frequency, 340, source, receiver),
    light = lightDoppler023(wavelength, beta / 100);
  return (
    <Frame
      id={id}
      title="Dalga tepelerini izle"
      intro="Seste +x sağ yön; kaynak solda, alıcı sağda ve hava durgun. Işıkta β>0, kaynak ile alıcı arası artar; hareket aynı doğru boyunca olur."
    >
      <Choice
        label="Dalga"
        value={kind}
        options={[
          ["sound", "Ses"],
          ["light", "Işık"],
        ]}
        onChange={(kind) => change({ kind })}
      />
      {kind === "sound" ? (
        <>
          <div className="physics023-controls">
            <ModelNumber
              label="Kaynak frekansı (Hz)"
              value={frequency}
              min={200}
              max={1000}
              onChange={(frequency) => change({ frequency })}
            />
            <ModelNumber
              label="Kaynak hızı (m/s)"
              value={source}
              min={-200}
              max={200}
              onChange={(source) => change({ source })}
            />
            <ModelNumber
              label="Alıcı hızı (m/s)"
              value={receiver}
              min={-200}
              max={200}
              onChange={(receiver) => change({ receiver })}
            />
          </div>
          <Plot
            title="Yedi kaynak çevriminda üretilmiş örnek ses dalga cepheleri"
            kind="sound-fronts"
          >
            {(w) => {
              const scale = (w - 40) / 28,
                x = (v: number) => 20 + (v + 9) * scale,
                cy = 135;
              return (
                <>
                  <path className="physics023-axis" d={`M20 ${cy}H${w - 20}`} />
                  {sound.fronts.map((f) => (
                    <circle
                      key={f.emittedCycle}
                      data-front-cycle={f.emittedCycle}
                      data-center-x={f.centerX}
                      data-radius={f.radius}
                      className="physics023-front"
                      cx={x(f.centerX)}
                      cy={cy}
                      r={scale * f.radius}
                    />
                  ))}
                  <circle
                    data-source-position={sound.sourcePosition}
                    className="physics023-probe-dot"
                    cx={x(sound.sourcePosition)}
                    cy={cy}
                    r={5}
                  />
                  <path
                    className="physics023-primary"
                    d={`M${x(sound.sourcePosition)} ${cy + 8}V245`}
                  />
                  <path
                    data-receiver-position={sound.receiverPosition}
                    className="physics023-secondary"
                    d={`M${x(sound.receiverPosition) - 4} ${cy - 5}h8v10h-8Z M${x(sound.receiverPosition)} ${cy + 8}V280`}
                  />
                  <text
                    x={Math.max(20, Math.min(w - 20, x(sound.sourcePosition)))}
                    y={269}
                    textAnchor="middle"
                  >
                    K
                  </text>
                  <text
                    x={Math.max(
                      20,
                      Math.min(w - 20, x(sound.receiverPosition)),
                    )}
                    y={307}
                    textAnchor="middle"
                  >
                    G
                  </text>
                  <text x={20} y={30}>
                    +x →
                  </text>
                </>
              );
            }}
          </Plot>
          <div
            className="physics023-result"
            data-model-result
            data-frequency-hz={sound.receivedFrequency}
            data-forward-m={sound.forwardWavelength}
            data-backward-m={sound.backwardWavelength}
          >
            <strong>
              Alınan frekans: {fmt(sound.receivedFrequency, 2)} Hz.
            </strong>
            <p>
              Ön dalga boyu: {fmt(sound.forwardWavelength, 4)} m. Arka dalga
              boyu: {fmt(sound.backwardWavelength, 4)} m.
            </p>
            <p>
              Sesin havaya göre hızı: 340 m/s. Alıcının tepe alma hızı:{" "}
              {fmt(sound.relativeCrestSpeed)} m/s.
            </p>
            <p>
              Kaynak {frequency} Hz üretir; K kaynak, G alıcıdır. Çember ölçeği
              λ₀=340/f₀ ve zaman yedi kaynak çevrimidir.
            </p>
          </div>
          <p className="small muted">
            Bunlar son yedi çevrimin dalga izleridir; önceki dalgalar ve gerçek
            ses kaydı çizilmez. Sabit, aynı eksenli, ses altı hızlar kullanılır.
          </p>
          <Compare
            question="Alıcı dururken kaynak ona doğru hareket ederse alınan frekans f₀'ya göre ne olur?"
            values={s}
            onChange={set}
            expected="Artar"
          >
            <p>
              Yaklaşan kaynak öndeki tepe aralığını küçültür. Kaynağın kendi
              frekansı ve havanın ses hızı aynı kalabilir.
            </p>
          </Compare>
        </>
      ) : (
        <>
          <div className="physics023-controls">
            <ModelNumber
              label="Kaynak çizgisi (nm)"
              value={wavelength}
              min={400}
              max={700}
              onChange={(wavelength) => change({ wavelength })}
            />
            <ModelNumber
              label="Işık hızı oranı β ×100"
              value={beta}
              min={-80}
              max={80}
              onChange={(beta) => change({ beta })}
            />
          </div>
          <Plot
            title="Aynı spektrum çizgisinin radyal Doppler ile yer değişimi"
            kind="light-shift"
          >
            {(w) => {
              const x = (lambda: number) =>
                35 + (Math.log(lambda / 100) / Math.log(30)) * (w - 60);
              return (
                <>
                  <path className="physics023-axis" d={`M35 225H${w - 25}`} />
                  {[100, 500, 1500, 3000].map((n, i) => (
                    <g key={n}>
                      <path className="physics023-axis" d={`M${x(n)} 225v6`} />
                      <text
                        x={x(n)}
                        y={i % 2 ? 280 : 255}
                        textAnchor={
                          i === 0 ? "start" : i === 3 ? "end" : "middle"
                        }
                      >
                        {n}
                      </text>
                    </g>
                  ))}
                  <path
                    className="physics023-secondary"
                    data-source-line={wavelength}
                    d={`M${x(wavelength)} 65V225`}
                  />
                  <path
                    className="physics023-primary"
                    data-observed-line={light.observedWavelengthNm}
                    d={`M${x(light.observedWavelengthNm)} 95V225`}
                  />
                  <text x={35} y={30}>
                    λ (nm), log ölçek
                  </text>
                </>
              );
            }}
          </Plot>
          <div
            className="physics023-result"
            data-model-result
            data-wavelength-nm={light.observedWavelengthNm}
            data-frequency-ratio={light.frequencyRatio}
          >
            <strong>
              {light.shift === "red"
                ? "Kırmızıya kayma"
                : light.shift === "blue"
                  ? "Maviye kayma"
                  : "Kayma yok"}
              .
            </strong>
            <p>
              Kaynak çizgisi: {wavelength} nm. Gözlenen:{" "}
              {fmt(light.observedWavelengthNm, 2)} nm.
            </p>
            <p>
              Dalga boyu oranı: {fmt(light.wavelengthRatio, 4)}. Frekans oranı:{" "}
              {fmt(light.frequencyRatio, 4)}.
            </p>
            <p>
              Boşluk hızı: {sci(light.vacuumSpeed)} m/s; iki gözlemci için de
              aynı c.
            </p>
          </div>
          <p className="small muted">
            Kesikli çizgi kaynak, düz çizgi gözlemdir. Bu, saf radyal özel
            görelilik modelidir; evren ölçeği ya da kütle çekim kayması
            değildir.
          </p>
          <Compare
            question="Kaynak aynı doğru boyunca G’den uzağa giderse dalga boyu ne olur?"
            values={s}
            onChange={set}
            expected="Artar"
          >
            <p>
              β&gt;0 için √((1+β)/(1−β))&gt;1 olur; λ büyürken f küçülür. Işığın
              boşluk hızı değişmez.
            </p>
          </Compare>
        </>
      )}
    </Frame>
  );
}
const spectrum: [string, string, number][] = [
  ["radio", "Radyo", 1e9],
  ["micro", "Mikro", 3e7],
  ["infrared", "Kızılötesi", 10000],
  ["visible", "Görünür", 600],
  ["uv", "Morötesi", 100],
  ["xray", "X ışını", 0.1],
  ["gamma", "Gama", 0.001],
];
function Electromagnetic() {
  const id = "elektromanyetik-dalgalar",
    [s, set] = usePhysicsExploration023("forge023-physics-" + id, {
      ...defaults,
      band: "visible",
      amplitude: 120,
      phase: 0,
      angle: 0,
      direction: "1",
    });
  const change = (p: Partial<typeof s>) => set({ ...p, checked: false });
  const band = spectrum.find((x) => x[0] === s.band) ?? spectrum[3],
    amplitude = bounded(s.amplitude, 10, 200, 120),
    phase = bounded(s.phase, 0, 360, 0),
    angle = bounded(s.angle, 0, 180, 0),
    direction = s.direction === "-1" ? -1 : 1;
  const m = electromagnetic023(band[2], amplitude, phase, angle, direction);
  return (
    <Frame
      id={id}
      title="Alanları birlikte döndür"
      intro="Bir dalga örneği seç; E ve B yönünü, fazını ve E×B yönünü birlikte izle. E/E₀ ve B/B₀ ayrı ölçekle çizilir."
    >
      <Choice
        label="Tayf örneği"
        value={band[0]}
        options={spectrum.map((x) => [x[0], x[1]])}
        onChange={(band) => change({ band })}
      />
      <div className="physics023-controls">
        <ModelNumber
          label="E genliği (V/m)"
          value={amplitude}
          min={10}
          max={200}
          onChange={(amplitude) => change({ amplitude })}
        />
        <ModelNumber
          label="Seçili faz (°)"
          value={phase}
          min={0}
          max={360}
          onChange={(phase) => change({ phase })}
        />
        <ModelNumber
          label="E açısı (°)"
          value={angle}
          min={0}
          max={180}
          onChange={(angle) => change({ angle })}
        />
        <Choice
          label="İlerleme yönü"
          value={String(direction)}
          options={[
            ["1", "+x"],
            ["-1", "−x"],
          ]}
          onChange={(direction) => change({ direction })}
        />
      </div>
      <Plot
        title="Üç boyutlu alan yönlerinin şematik düzlem izdüşümü"
        kind="em-vectors"
      >
        {(w, marker) => {
          const o = { x: w * 0.56, y: 170 },
            length = Math.min(85, (w - 60) / 2),
            proj = (y: number, z: number) => ({
              x: o.x - length * 0.55 * z,
              y: o.y - length * y + length * 0.5 * z,
            });
          const e = proj(
              m.electricVector.y / m.electricAmplitude,
              m.electricVector.z / m.electricAmplitude,
            ),
            b = proj(
              m.magneticVector.y / m.magneticAmplitude,
              m.magneticVector.z / m.magneticAmplitude,
            );
          return (
            <>
              <path
                className="physics023-axis"
                d={`M${o.x - 30} ${o.y}H${w - 20} M${o.x} 280V55 M${o.x + 25} ${o.y - 25}L30 ${o.y + 85}`}
              />
              <text x={w - 25} y={o.y - 14}>
                x
              </text>
              <text x={o.x + 12} y={55}>
                y
              </text>
              <text x={20} y={o.y + 105}>
                z
              </text>
              {m.normalizedElectric !== 0 ? (
                <>
                  <path
                    className="physics023-primary"
                    data-em-vector="E"
                    data-y={m.electricVector.y}
                    data-z={m.electricVector.z}
                    markerEnd={`url(#${marker})`}
                    d={`M${o.x} ${o.y}L${e.x} ${e.y}`}
                  />
                  <path
                    className="physics023-secondary"
                    data-em-vector="B"
                    data-y={m.magneticVector.y}
                    data-z={m.magneticVector.z}
                    markerEnd={`url(#${marker})`}
                    d={`M${o.x} ${o.y}L${b.x} ${b.y}`}
                  />
                </>
              ) : (
                <circle
                  className="physics023-zero"
                  data-fields-zero
                  cx={o.x}
                  cy={o.y}
                  r={5}
                />
              )}
              <text x={20} y={320}>
                E düz · B kesikli
              </text>
            </>
          );
        }}
      </Plot>
      <div
        className="physics023-result"
        data-model-result
        data-frequency={m.frequency}
        data-photon-ev={m.photonEnergyEV}
        data-flow-x={m.normalizedEnergyFlowX}
      >
        <strong>
          İlerleme: {direction === 1 ? "+x" : "−x"}. Seçili fazda akış oranı:{" "}
          {fmt(m.normalizedEnergyFlowX)}.
        </strong>
        <p>
          E/E₀={fmt(m.normalizedElectric)}; B/B₀ yönlü katsayı=
          {fmt(m.normalizedMagnetic)}.
        </p>
        <p>
          E bileşenleri (V/m): y={fmt(m.electricVector.y)}, z=
          {fmt(m.electricVector.z)}.
        </p>
        <p>
          B bileşenleri (T): y={sci(m.magneticVector.y)}, z=
          {sci(m.magneticVector.z)}.
        </p>
        <p>
          B genliği: {sci(m.magneticAmplitude)} T. λ₀={sci(m.wavelengthNm)} nm.
        </p>
        <p>
          Frekans: {sci(m.frequency)} Hz. Tek foton enerjisi:{" "}
          {sci(m.photonEnergyEV)} eV.
        </p>
      </div>
      <p className="small muted">
        Bu tek örnek dalga boyu bölgenin bütün aralığı değildir. E ve B ayrı
        genlik ile ölçeklenir; iki birim aynı sayılmaz. Çizim 3B yönlerin
        temsili 2B izidir; yalnızca boşluk düzlem dalgası bulunur.
      </p>
      <Compare
        question="Aynı toplam güçte frekans iki kat olsaydı bir saniyede gelen foton sayısı ne olurdu?"
        values={s}
        onChange={set}
        expected="Azalır"
      >
        <p>
          Her fotonun hf enerjisi iki katına çıkar. P=N·hf aynı kalacaksa N
          yarıya iner; boşluk hızı yine c olur.
        </p>
      </Compare>
    </Frame>
  );
}
const history = [
  {
    id: "dalton",
    name: "Dalton",
    evidence:
      "Kimyasal birleşme oranlarını atomların tam sayılı düzeniyle açıklar.",
    limit:
      "İç yapısız ve bölünmez küre, elektron ve izotop verisini açıklamaz.",
  },
  {
    id: "thomson",
    name: "Thomson",
    evidence:
      "Katot ışınlarının sapması ve e/m ölçümü, atomda negatif elektron varlığına kanıt sağlar.",
    limit:
      "Yaygın pozitif yük resmi, az sayıdaki büyük alfa sapmasını açıklamaz.",
  },
  {
    id: "rutherford",
    name: "Rutherford",
    evidence:
      "Çoğu alfa geçer, çok azı güçlü sapar: küçük yoğun pozitif çekirdek.",
    limit:
      "Klasik yüklü çemberde sürekli ışıma ve atomun kararlılığı sorunu kalır.",
  },
  {
    id: "bohr",
    name: "Bohr",
    evidence:
      "Kesikli bağlı düzeyler ve geçiş enerjileri, tek elektronlu atom tayfını yaklaşık açıklar.",
    limit:
      "Çok elektronlu yapı, çizgi ayrıntıları ve modern orbital yapısı bu basit yörünge modelini aşar.",
  },
  {
    id: "modern",
    name: "Modern",
    evidence:
      "Kuantum durumu ve orbital olasılıkları, elektron için dalga niteliği içerir.",
    limit:
      "Bulut resmi, kesin yörünge veya elektrona ait klasik top dönüşü değildir; burada dalga denklemi çözülmez.",
  },
];
function Atom() {
  const id = "atom-modelleri-fizik",
    [s, set] = usePhysicsExploration023("forge023-physics-" + id, {
      ...defaults,
      tab: "levels",
      z: 1,
      initial: 3,
      final: 2,
      particle: "photon",
      incident: 110,
      model: "bohr",
    });
  const change = (p: Partial<typeof s>) => set({ ...p, checked: false });
  const tab = ["levels", "excite", "history"].includes(s.tab)
      ? s.tab
      : "levels",
    z = bounded(s.z, 1, 3, 1),
    initial = bounded(s.initial, 1, 6, 3),
    final = bounded(s.final, 1, 6, 2),
    particle = s.particle === "electron" ? "electron" : "photon",
    incident = bounded(s.incident, 0, 600, 110),
    selected = history.find((x) => x.id === s.model) ?? history[3];
  const m = atomTransition023(z, initial, final),
    interaction = excitation023(z, 1, particle, incident / 10);
  return (
    <Frame
      id={id}
      title="Kanıttan enerji hesabına"
      intro="Önce tarihsel modelin kanıtını incele; sonra tek elektronlu H, He⁺ veya Li²⁺ için gerçek enerji farkından geçişi kur."
    >
      <Choice
        label="İnceleme"
        value={tab}
        options={[
          ["levels", "Düzeyler"],
          ["excite", "Uyarılma"],
          ["history", "Kanıtlar"],
        ]}
        onChange={(tab) => change({ tab })}
      />
      {tab !== "history" && (
        <Choice
          label="Tek elektronlu sistem"
          value={String(z)}
          options={[
            ["1", "H"],
            ["2", "He⁺"],
            ["3", "Li²⁺"],
          ]}
          onChange={(v) => change({ z: Number(v) })}
        />
      )}
      <div className="physics023-controls">
        {tab === "levels" ? (
          <>
            <ModelNumber
              label="İlk düzey n"
              value={initial}
              min={1}
              max={6}
              onChange={(initial) => change({ initial })}
            />
            <ModelNumber
              label="Son düzey n"
              value={final}
              min={1}
              max={6}
              onChange={(final) => change({ final })}
            />
          </>
        ) : tab === "excite" ? (
          <>
            <Choice
              label="Gelen parçacık"
              value={particle}
              options={[
                ["photon", "Foton"],
                ["electron", "Elektron"],
              ]}
              onChange={(particle) => change({ particle })}
            />
            <ModelNumber
              label="Enerji ×10 (eV)"
              value={incident}
              min={0}
              max={600}
              onChange={(incident) => change({ incident })}
            />
            <button
              type="button"
              className="secondary"
              onClick={() => change({ z: 1, incident: 102 })}
            >
              H için 10,2 eV seç
            </button>
          </>
        ) : (
          <Choice
            label="Atom modeli"
            value={selected.id}
            options={history.map((h) => [h.id, h.name])}
            onChange={(model) => change({ model })}
          />
        )}
      </div>
      {tab === "history" ? (
        <>
          <Plot
            kind="atom-history"
            title={selected.name + " modelinin yalnız temsilî atom çizimi"}
          >
            {(w) => {
              const cx = w / 2,
                cy = 160,
                r = Math.min(85, w / 2 - 24);
              return (
                <>
                  {selected.id === "dalton" ? (
                    <circle
                      className="physics023-atom-solid"
                      cx={cx}
                      cy={cy}
                      r={r}
                    />
                  ) : selected.id === "thomson" ? (
                    <>
                      <circle
                        className="physics023-atom-positive"
                        cx={cx}
                        cy={cy}
                        r={r}
                      />
                      {[0, 60, 120, 180, 240, 300].map((a) => (
                        <circle
                          key={a}
                          className="physics023-electron"
                          cx={cx + r * 0.6 * Math.cos((a * Math.PI) / 180)}
                          cy={cy + r * 0.6 * Math.sin((a * Math.PI) / 180)}
                          r={5}
                        />
                      ))}
                    </>
                  ) : selected.id === "modern" ? (
                    <>
                      {Array.from({ length: 90 }, (_, i) => {
                        const a = i * 2.399963,
                          rho = r * Math.sqrt((i + 0.5) / 90);
                        return (
                          <circle
                            className="physics023-probability"
                            key={i}
                            cx={cx + rho * Math.cos(a)}
                            cy={cy + rho * Math.sin(a)}
                            r={2.6}
                          />
                        );
                      })}
                      <circle
                        className="physics023-nucleus"
                        cx={cx}
                        cy={cy}
                        r={5}
                      />
                    </>
                  ) : (
                    <>
                      <circle
                        className="physics023-nucleus"
                        cx={cx}
                        cy={cy}
                        r={6}
                      />
                      {(selected.id === "bohr" ? [0.25, 0.55, 1] : [0.85]).map(
                        (k, i) => (
                          <circle
                            className="physics023-orbit"
                            key={i}
                            cx={cx}
                            cy={cy}
                            r={r * k}
                          />
                        ),
                      )}
                      <circle
                        className="physics023-electron"
                        cx={cx + r * (selected.id === "bohr" ? 0.55 : 0.85)}
                        cy={cy}
                        r={5}
                      />
                    </>
                  )}
                  <text x={w / 2} y={310} textAnchor="middle">
                    Temsilî model
                  </text>
                </>
              );
            }}
          </Plot>
          <div className="physics023-result" data-model-result>
            <strong>{selected.name}: kanıt ve kapsam</strong>
            <p>{selected.evidence}</p>
            <p>{selected.limit}</p>
            <p>
              Çizim ölçeksiz bir öğretim temsilidir; deney verisi veya çözülmüş
              orbital verisi değildir.
            </p>
          </div>
        </>
      ) : (
        <>
          <Plot
            kind="atom-levels"
            title="Tek elektronlu sistemde Bohr enerji düzeylerin gerçek enerji aralıkları"
            height={385}
          >
            {(w, marker) => {
              const y = (n: number) => 40 + 300 / n ** 2;
              return (
                <>
                  <path
                    className="physics023-axis"
                    d={`M40 30V350 M40 40H${w - 20}`}
                  />
                  <text x={12} y={25}>
                    E
                  </text>
                  <text x={12} y={45}>
                    0
                  </text>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <path
                      key={n}
                      data-bohr-level={n}
                      data-energy-ev={bohr023(z, n).energyEV}
                      className="physics023-level"
                      d={`M48 ${y(n)}H${w - 20}`}
                    />
                  ))}
                  {tab === "levels" && initial !== final && (
                    <path
                      className="physics023-primary"
                      data-transition-start={m.first.energyEV}
                      data-transition-end={m.last.energyEV}
                      markerEnd={`url(#${marker})`}
                      d={`M${w * 0.65} ${y(initial)}V${y(final)}`}
                    />
                  )}
                  <text x={48} y={365}>
                    n=1
                  </text>
                  <text x={w - 20} y={365} textAnchor="end">
                    Üstte n artar
                  </text>
                </>
              );
            }}
          </Plot>
          {tab === "levels" ? (
            <div
              className="physics023-result"
              data-model-result
              data-initial-ev={m.first.energyEV}
              data-final-ev={m.last.energyEV}
              data-photon-ev={m.photonEnergyEV}
              data-wavelength-nm={m.wavelengthNm ?? "none"}
            >
              <strong>
                {m.kind === "emission"
                  ? "Foton yayımı"
                  : m.kind === "absorption"
                    ? "Enerji soğurma"
                    : "Düzey değişmiyor"}
                .
              </strong>
              <p>
                İlk: n={initial}; E={fmt(m.first.energyEV, 4)} eV. Son: n=
                {final}; E={fmt(m.last.energyEV, 4)} eV.
              </p>
              <p>
                Atomun enerji farkı: {fmt(m.differenceEV, 4)} eV. Foton
                enerjisi: {fmt(m.photonEnergyEV, 4)} eV.
              </p>
              <p>
                {m.wavelengthNm === null
                  ? "Aynı düzey için geçiş fotonu yok."
                  : `Geçiş fotonunun boşluk dalga boyu: ${fmt(m.wavelengthNm, 2)} nm.`}
              </p>
              <p>
                İlk düzey yarıçapı: {fmt(m.first.radiusNm, 4)} nm; L: {initial}{" "}
                ħ.
              </p>
              <p>
                İlk düzeyde K={fmt(m.first.kineticEV, 4)} eV; U=
                {fmt(m.first.potentialEV, 4)} eV. İyon eşiği:{" "}
                {fmt(m.first.ionizationEV, 4)} eV.
              </p>
            </div>
          ) : (
            <div
              className="physics023-result"
              data-model-result
              data-incident-ev={interaction.incidentEV}
              data-ionization={String(interaction.ionizationPossible)}
              data-channels={interaction.channels.map((x) => x.n).join(",")}
            >
              <strong>
                Temel hâlden gelen enerji: {fmt(interaction.incidentEV)} eV.
              </strong>
              <p>
                İyon eşiği: {fmt(interaction.ionizationThresholdEV)} eV.{" "}
                {interaction.ionizationPossible
                  ? `Enerjice iyonlaşma mümkün; eşik üstü bütçe ${fmt(interaction.ionizationExcessEV!)} eV.`
                  : "Bu enerji iyonlaşma eşiğinin altında."}
              </p>
              <p>
                Modelde n≤8 için bağlı uyarılma kanalları:{" "}
                {interaction.channels.length
                  ? interaction.channels
                      .map(
                        (c) => `n=${c.n} (kalan ${fmt(c.remainingEV, 4)} eV)`,
                      )
                      .join("; ")
                  : "eşleşen kanal yok"}
                .
              </p>
              <p>
                {particle === "photon"
                  ? "Foton bağlı geçişte farkla eşleşerek bütün olarak soğurulur."
                  : "Elektron farkı aktarırsa kalan kinetik enerjiyle ayrılabilir; bu zorunlu tek sonuç değildir."}
              </p>
              <p>
                Bu panel temel n=1 ile başlar; yanda bütün bağlı düzeyler değil
                ilk altısının enerji çizgileri görünür.
              </p>
            </div>
          )}
          <details className="physics023-level-table">
            <summary>Altı düzeyin enerjisini oku</summary>
            <dl>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n}>
                  <dt>n={n}</dt>
                  <dd>{fmt(bohr023(z, n).energyEV, 4)} eV</dd>
                </div>
              ))}
            </dl>
          </details>
          <p className="small muted">
            Enerji çizgilerin arası −13,6 Z²/n² eV ile bulunur; üst düzeyler
            birbirine yaklaşır. Işın dalga boyunda kesin SI h,c,e; atomda 13,6
            eV ve a₀=0,0529 nm yaklaşımı kullanılır.
          </p>
        </>
      )}
      <Compare
        question="Aynı Z için başlangıç n artarsa iyonlaşma için gereken enerji ne olur?"
        values={s}
        onChange={set}
        expected="Azalır"
      >
        <p>
          Eşik 13,6 Z²/n² eV'dir. n arttıkça toplam enerji sıfıra yaklaşır;
          bağlı elektronu ayırmak için daha az ek enerji gerekir.
        </p>
      </Compare>
    </Frame>
  );
}
export default function Forge023PhysicsLab({ lessonId }: { lessonId: string }) {
  return lessonId === "isik-teorileri" ? (
    <Optics />
  ) : lessonId === "doppler-etkisi" ? (
    <Doppler />
  ) : lessonId === "elektromanyetik-dalgalar" ? (
    <Electromagnetic />
  ) : lessonId === "atom-modelleri-fizik" ? (
    <Atom />
  ) : null;
}
