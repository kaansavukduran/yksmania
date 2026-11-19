import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import { ModelNumber } from "./ModelNumber";
import {
  measurement026,
  dimensions026,
  dimensionProduct026,
  density026,
  mixture026,
  similarity026,
  capillary026,
  motion026,
  rampEnergy026,
  springEnergy026,
  powerLedger026,
  type Dimension026,
} from "./forge026Physics";
import "./forge026Physics.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

const bases026 = [
  "fizik-bilimine-giris",
  "madde-ozkutle",
  "dogrusal-hareket",
  "enerji-ve-hareket",
] as const;
const views026 = {
  "fizik-bilimine-giris": [
    ["measure", "Okumaları düzelt"],
    ["dimensions", "Birim defteri"],
  ],
  "madde-ozkutle": [
    ["density", "Kütle ve hacim"],
    ["mix", "Karışım"],
    ["scale", "Benzerlik"],
    ["capillary", "Kılcal denge"],
  ],
  "dogrusal-hareket": [["motion", "Üç evreli hareket"]],
  "enerji-ve-hareket": [
    ["ramp", "İleri yol bütçesi"],
    ["spring", "Yay işi"],
    ["power", "Güç ve tüketim"],
  ],
} as const;
type Base026 = keyof typeof views026;
export const physicsDefaults026 = {
  view: "measure",
  r1: 104,
  r2: 106,
  r3: 105,
  offset: 2,
  resolution: 1,
  dimA: "mass",
  dimB: "velocity",
  expA: 1,
  expB: 2,
  target: "energy",
  mass: 90,
  tare: 15,
  vStart: 30,
  vEnd: 55,
  immersion: "full",
  rho1: 10,
  rho2: 11,
  vol1: 50,
  vol2: 50,
  finalVol: 95,
  scale: 20,
  radius: 10,
  tension: 50,
  contact: 60,
  fluid: 1000,
  velocity: 6,
  frame: 0,
  origin: 0,
  t1: 4,
  a1: -2,
  t2: 2,
  a2: 0,
  t3: 0,
  a3: 0,
  sample: 50,
  emass: 20,
  speed: 30,
  drive: 50,
  resist: 70,
  slope: 0,
  path: 50,
  stiffness: 200,
  springStart: -10,
  springEnd: 20,
  inputPower: 600,
  seconds: 300,
  eta: 75,
  guess: "",
  reason: "",
  checked: false,
};
export type PhysicsState026 = typeof physicsDefaults026;
type Key026 = keyof PhysicsState026;
const numeric026: Partial<Record<Key026, readonly [number, number]>> = {
  r1: [20, 200],
  r2: [20, 200],
  r3: [20, 200],
  offset: [-10, 10],
  resolution: [1, 10],
  expA: [-3, 3],
  expB: [-3, 3],
  mass: [1, 500],
  tare: [0, 100],
  vStart: [0, 150],
  vEnd: [1, 200],
  rho1: [1, 30],
  rho2: [1, 30],
  vol1: [1, 100],
  vol2: [1, 100],
  finalVol: [1, 250],
  scale: [5, 30],
  radius: [5, 50],
  tension: [10, 100],
  contact: [0, 180],
  fluid: [800, 1500],
  velocity: [-20, 20],
  frame: [-20, 20],
  origin: [-10, 10],
  t1: [0, 20],
  a1: [-5, 5],
  t2: [0, 20],
  a2: [-5, 5],
  t3: [0, 20],
  a3: [-5, 5],
  sample: [0, 100],
  emass: [1, 100],
  speed: [0, 100],
  drive: [0, 200],
  resist: [0, 200],
  slope: [-50, 50],
  path: [0, 100],
  stiffness: [20, 500],
  springStart: [-50, 50],
  springEnd: [-50, 50],
  inputPower: [0, 2000],
  seconds: [0, 3600],
  eta: [0, 100],
};
const active026: Record<string, Key026[]> = {
  measure: ["r1", "r2", "r3", "offset", "resolution"],
  dimensions: ["dimA", "dimB", "expA", "expB", "target"],
  density: ["mass", "tare", "vStart", "vEnd", "immersion"],
  mix: ["rho1", "rho2", "vol1", "vol2", "finalVol"],
  scale: ["scale"],
  capillary: ["radius", "tension", "contact", "fluid"],
  motion: [
    "velocity",
    "frame",
    "origin",
    "t1",
    "a1",
    "t2",
    "a2",
    "t3",
    "a3",
    "sample",
  ],
  ramp: ["emass", "speed", "drive", "resist", "slope", "path"],
  spring: ["stiffness", "springStart", "springEnd"],
  power: ["inputPower", "seconds", "eta"],
};
const guessOptions026: Record<string, string[]> = {
  measure: ["Artar", "Azalır", "Aynı"],
  dimensions: ["Uyumlu", "Uyumsuz"],
  density: ["Kesin değer", "Üst sınır"],
  mix: ["Artar", "Azalır", "Aynı"],
  scale: ["Alan", "Hacim", "Aynı"],
  capillary: ["Üstte", "Altta", "Aynı düzey"],
  motion: ["Eşit", "Yol daha büyük"],
  ramp: ["Erişir", "Durur"],
  spring: ["Artar", "Azalır", "Aynı"],
  power: ["Eşit", "Daha az"],
};
export function normalizePhysics026(
  base: Base026,
  saved: Record<string, unknown>,
  raw?: Record<string, unknown>,
) {
  if (!Object.hasOwn(views026, base)) throw new RangeError("PHYSICS026_BASE");
  const defaults = {
    ...physicsDefaults026,
    view: views026[base][0][0] as string,
  };
  const accepts = (key: Key026, value: unknown) => {
    if (typeof value !== typeof defaults[key]) return false;
    const range = numeric026[key];
    if (range)
      return (
        typeof value === "number" &&
        Number.isInteger(value) &&
        value >= range[0] &&
        value <= range[1]
      );
    if (key === "view") return views026[base].some((x) => x[0] === value);
    if (["dimA", "dimB", "target"].includes(key))
      return typeof value === "string" && Object.hasOwn(dimensions026, value);
    if (key === "immersion") return value === "full" || value === "partial";
    return true;
  };
  const values = Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => [
      key,
      Object.hasOwn(saved, key) && accepts(key as Key026, saved[key])
        ? saved[key]
        : fallback,
    ]),
  ) as PhysicsState026;
  values.reason = String(values.reason).slice(0, 128);
  const relationsBad = new Set<Key026>();
  if (values.mass <= values.tare) {
    values.mass = defaults.mass;
    values.tare = defaults.tare;
    relationsBad.add("mass");
    relationsBad.add("tare");
  }
  if (values.vEnd <= values.vStart) {
    values.vStart = defaults.vStart;
    values.vEnd = defaults.vEnd;
    relationsBad.add("vStart");
    relationsBad.add("vEnd");
  }
  const options = guessOptions026[values.view];
  const validGuess = (v: unknown) =>
    typeof v === "string" && (v === "" || options.includes(v));
  const active: Key026[] = [
    ...active026[values.view],
    "guess",
    "reason",
    "checked",
  ];
  if (views026[base].length > 1) active.unshift("view");
  const valid = active.every(
    (key) =>
      !relationsBad.has(key) &&
      (!Object.hasOwn(saved, key) ||
        (accepts(key, saved[key]) &&
          (key !== "guess" || validGuess(saved[key])))) &&
      (!raw ||
        !Object.hasOwn(raw, key) ||
        (accepts(key, raw[key]) && (key !== "guess" || validGuess(raw[key])))),
  );
  if (!validGuess(values.guess)) values.guess = "";
  values.checked = valid && values.checked === true;
  return { values, valid, active };
}
const fmt = (n: number, digits = 3) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(n) < 0.5 * 10 ** -digits ? 0 : n,
  );
const sign = (x: number) => (x > 0 ? "Artar" : x < 0 ? "Azalır" : "Aynı");
type Commit026 = (patch: Partial<PhysicsState026>) => void;
function Choice({
  label,
  value,
  options,
  change,
}: {
  label: string;
  value: string;
  options: readonly (readonly [string, string])[];
  change: (v: string) => void;
}) {
  const uid = useId();
  return (
    <div className="p026-choice">
      <label htmlFor={uid}>{label}</label>
      <ChoiceSelect id={uid} value={value} onChange={(e) => change(e.target.value)}>
        {options.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </ChoiceSelect>
      <p className="small muted">
        Seçili: {options.find((x) => x[0] === value)?.[1]}
      </p>
    </div>
  );
}
function NumberField({
  field,
  label,
  values,
  commit,
  min,
  max,
}: {
  field: Key026;
  label: string;
  values: PhysicsState026;
  commit: Commit026;
  min?: number;
  max?: number;
}) {
  const range = numeric026[field]!;
  return (
    <ModelNumber
      label={label}
      value={values[field] as number}
      min={min ?? range[0]}
      max={max ?? range[1]}
      onChange={(v) => {
        const patch: Partial<PhysicsState026> = { [field]: v, checked: false };
        if (field === "tare") patch.mass = Math.max(values.mass, v + 1);
        if (field === "vStart") patch.vEnd = Math.max(values.vEnd, v + 1);
        commit(patch);
      }}
    />
  );
}
function Plot({
  kind,
  title,
  height = 290,
  children,
}: {
  kind: string;
  title: string;
  height?: number;
  children: (width: number, marker: string) => ReactNode;
}) {
  const uid = useId(),
    ref = useRef<SVGSVGElement>(null),
    [width, setWidth] = useState(270);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const box = el.getBoundingClientRect(),
        style = getComputedStyle(el),
        w =
          box.width -
          parseFloat(style.borderLeftWidth) -
          parseFloat(style.borderRightWidth);
      if (w > 0) setWidth((old) => (Math.abs(old - w) < 0.25 ? old : w));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      style={{ height: height + 2 }}
      role="img"
      aria-labelledby={uid}
      data-p026-plot={kind}
    >
      <title id={uid}>{title}</title>
      <defs>
        <marker
          id={uid + "-arrow"}
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
      {children(width, uid + "-arrow")}
    </svg>
  );
}
function Result({
  children,
  ...attrs
}: {
  children: ReactNode;
  [key: string]: unknown;
}) {
  return (
    <div className="p026-result" data-model-result {...attrs}>
      {children}
    </div>
  );
}
function Compare({
  question,
  expected,
  proof,
  values,
  valid,
  commit,
}: {
  question: string;
  expected: string;
  proof: ReactNode;
  values: PhysicsState026;
  valid: boolean;
  commit: Commit026;
}) {
  const options = guessOptions026[values.view],
    ready = valid && options.includes(values.guess) && !!values.reason.trim(),
    uid = useId();
  return (
    <fieldset className="p026-compare">
      <legend>{question}</legend>
      <Choice
        label="Tahminin"
        value={values.guess}
        options={[
          ["", "Bir sonuç seç"],
          ...options.map((x) => [x, x] as const),
        ]}
        change={(guess) => commit({ guess, checked: false })}
      />
      <label htmlFor={uid}>Gerekçen</label>
      <textarea
        id={uid}
        rows={3}
        maxLength={128}
        value={values.reason}
        onChange={(e) =>
          commit({ reason: e.target.value.slice(0, 128), checked: false })
        }
      />
      <button
        type="button"
        disabled={!ready}
        onClick={() => commit({ checked: true })}
      >
        Kanıtla kıyasla
      </button>
      {ready && values.checked && (
        <div className="p026-feedback" role="status">
          <strong>
            {values.guess === expected
              ? "Tahminin bu koşulla uyumlu."
              : "Veriyi ve koşulu yeniden kıyasla."}
          </strong>
          {proof}
          <p>Gerekçen: {values.reason}</p>
          <p className="small muted">Bu keşif puan veya soru kaydı eklemez.</p>
        </div>
      )}
    </fieldset>
  );
}
type ViewProps026 = { s: PhysicsState026; commit: Commit026; valid: boolean };
const controls = (
  s: PhysicsState026,
  commit: Commit026,
  fields: readonly (readonly [Key026, string])[],
) => (
  <div className="p026-controls">
    {fields.map(([field, label]) => (
      <NumberField
        key={field}
        field={field}
        label={label}
        values={s}
        commit={commit}
      />
    ))}
  </div>
);
function IntroView({ s, commit, valid }: ViewProps026) {
  if (s.view === "measure") {
    const m = measurement026(
      [s.r1 / 10, s.r2 / 10, s.r3 / 10],
      s.offset / 10,
      s.resolution / 10,
    );
    return (
      <>
        <h4>Bilinen sapmayı ayır</h4>
        <p>
          Aynı uzunluk üç kez okunuyor. Bilinen ek sapma her okumadan çıkarılır.
          Aralık ve gösterge adımı ayrı verilir; toplam doğruluk bu iki sayıdan
          kesin çıkmaz.
        </p>
        {controls(s, commit, [
          ["r1", "1. okuma ×10 (cm)"],
          ["r2", "2. okuma ×10 (cm)"],
          ["r3", "3. okuma ×10 (cm)"],
          ["offset", "Sıfır sapması ×10 (cm)"],
          ["resolution", "Gösterge adımı ×10 (cm)"],
        ])}
        <Plot
          kind="measurement"
          title="Ortak santimetre ekseninde üç ham okuma ve sapma sonrası ortalama"
        >
          {(w) => {
            const y = (v: number) => 245 - (v / 21) * 200;
            return (
              <>
                <path className="p026-axis" d={`M32 30V245H${w - 15}`} />
                <text x="12" y="22">
                  cm
                </text>
                {[0, 10, 20].map((v) => (
                  <g key={v}>
                    <text x="5" y={y(v) + 5}>
                      {v}
                    </text>
                    <path className="p026-grid" d={`M32 ${y(v)}H${w - 15}`} />
                  </g>
                ))}
                {m.readings.map((v, i) => (
                  <g key={i}>
                    <rect
                      x={45 + (i * (w - 65)) / 3}
                      y={y(v)}
                      width={(w - 80) / 6}
                      height={245 - y(v)}
                      className="p026-fill"
                      data-reading-cm={v}
                    />
                    <text x={45 + (i * (w - 65)) / 3} y="274">
                      R{i + 1}
                    </text>
                  </g>
                ))}
                <path
                  className="p026-secondary"
                  d={`M32 ${y(m.mean)}H${w - 15}`}
                  data-corrected-mean={m.mean}
                />
              </>
            );
          }}
        </Plot>
        <p>
          Çubuklar ham okuma; kesikli çizgi, sapma sonrası ortalama. Hepsi aynı
          cm ekseninde.
        </p>
        <Result
          data-mean={m.mean}
          data-spread={m.spread}
          data-half-step={m.halfStep}
        >
          <p>
            Ham ortalama: {fmt(m.indicatedMean)} cm. Sapma sonrası ortalama:{" "}
            {fmt(m.mean)} cm.
          </p>
          <p>
            Tekrar aralığı: {fmt(m.spread)} cm. Yarı aralık: {fmt(m.halfRange)}{" "}
            cm. Yarım gösterge adımı: {fmt(m.halfStep)} cm.
          </p>
          <p>
            Bunlar ayrı özetlerdir. Tekrar aralığı, kendi başına yüzde güven
            sınırı değildir.
          </p>
        </Result>
        <Compare
          question="Okumalar aynıysa bilinen ek sıfır sapması artarsa sapma sonrası ortalama ne olur?"
          expected="Azalır"
          proof={
            <p>
              Her okuma için x = gösterge − sapma. Aynı sapma artışı, ortalama
              değerden da çıkar; tekrar aralığı ise aynı kalır.
            </p>
          }
          values={s}
          valid={valid}
          commit={commit}
        />
      </>
    );
  }
  const a = s.dimA as Dimension026,
    b = s.dimB as Dimension026,
    target = s.target as Dimension026,
    m = dimensionProduct026([
      { quantity: a, power: s.expA },
      { quantity: b, power: s.expB },
    ]),
    same = m.powers.every((v, i) => v === dimensions026[target].powers[i]),
    menu = Object.entries(dimensions026).map(
      ([key, d]) => [key, d.name] as const,
    );
  return (
    <>
      <h4>Temel birim üslerini izle</h4>
      <p>
        İki niceliğin birimlerini seçilen kuvvetlere yükselt. Bu defter yalnız
        birim üslerini toplar; sayı katsayısı veya vektör işlemi için kanıt
        vermez.
      </p>
      <div className="p026-controls">
        <Choice
          label="İlk nicelik"
          value={a}
          options={menu}
          change={(dimA) => commit({ dimA, checked: false })}
        />
        <NumberField
          field="expA"
          label="İlk birimin kuvveti"
          values={s}
          commit={commit}
        />
        <Choice
          label="İkinci nicelik"
          value={b}
          options={menu}
          change={(dimB) => commit({ dimB, checked: false })}
        />
        <NumberField
          field="expB"
          label="İkinci birimin kuvveti"
          values={s}
          commit={commit}
        />
        <Choice
          label="Hedef nicelik"
          value={target}
          options={menu}
          change={(target) => commit({ target, checked: false })}
        />
      </div>
      <Plot
        kind="dimensions"
        title="Yedi SI temel birimi için çarpımın ve hedefin üsleri"
        height={350}
      >
        {(w) => {
          const span = Math.max(
              1,
              ...m.powers.map(Math.abs),
              ...dimensions026[target].powers.map(Math.abs),
            ),
            mid = w / 2 + 20,
            unit = (w - 80) / (2 * span);
          return (
            <>
              <path className="p026-axis" d={`M${mid} 18V328`} />
              {m.units.map((entry, i) => {
                const y = 35 + i * 43,
                  p = entry.power,
                  q = dimensions026[target].powers[i];
                return (
                  <g key={entry.unit}>
                    <text x="8" y={y + 5}>
                      {entry.unit}
                    </text>
                    <line
                      x1={mid}
                      x2={mid + p * unit}
                      y1={y - 5}
                      y2={y - 5}
                      className="p026-primary"
                    />
                    <line
                      x1={mid}
                      x2={mid + q * unit}
                      y1={y + 8}
                      y2={y + 8}
                      className="p026-secondary"
                    />
                    <circle
                      cx={mid + p * unit}
                      cy={y - 5}
                      r="3"
                      className="p026-dot"
                    />
                  </g>
                );
              })}
              <text x={mid - 35} y="345">
                Üs: − / +
              </text>
            </>
          );
        }}
      </Plot>
      <p>
        Düz çizgi seçilen çarpımın, kesikli çizgi hedefin üssü. Sıfırın solu
        negatif, sağı pozitif üs.
      </p>
      <Result data-dimension-match={same} data-unit-powers={m.powers.join(",")}>
        <p>
          {dimensions026[a].name}:{" "}
          {dimensions026[a].base ? "SI temel" : "türetilmiş"},{" "}
          {dimensions026[a].vector ? "vektörel" : "skaler"}; birimi{" "}
          {dimensions026[a].unit}.
        </p>
        <p>
          {dimensions026[b].name}:{" "}
          {dimensions026[b].base ? "SI temel" : "türetilmiş"},{" "}
          {dimensions026[b].vector ? "vektörel" : "skaler"}; birimi{" "}
          {dimensions026[b].unit}.
        </p>
        <dl className="p026-ledger">
          {m.units.map((entry, i) => (
            <div key={entry.unit}>
              <dt>{entry.unit}</dt>
              <dd>
                Çarpım üssü {entry.power}; hedef üssü{" "}
                {dimensions026[target].powers[i]}.
              </dd>
            </div>
          ))}
        </dl>
        <p>
          Aynı üsler yalnız gerekli boyut koşulunu sağlar. Bir fizik yasası ve
          vektör işlemi için ek kanıt gerekir.
        </p>
      </Result>
      <Compare
        question="Seçili çarpım ile hedef nicelik boyutça uyumlu mu?"
        expected={same ? "Uyumlu" : "Uyumsuz"}
        proof={
          <p>
            {same
              ? "Yedi temel birim üssü de aynı. Bu, katsayı veya fizik yasası için tek başına yeterli değildir."
              : "En az bir temel birim üssü farklı. İki taraf bu biçimde aynı boyutu vermez."}
          </p>
        }
        values={s}
        valid={valid}
        commit={commit}
      />
    </>
  );
}
function MatterView({ s, commit, valid }: ViewProps026) {
  if (s.view === "density") {
    const m = density026(
      s.mass,
      s.tare,
      s.vStart,
      s.vEnd,
      s.immersion as "full" | "partial",
    );
    return (
      <>
        <h4>Kütle ve sıvı düzeyi</h4>
        <p>
          Cisim çözünmez, sıvı emmez; taşma ve hava kabarcığı yok. Tam batmada
          dış hacim bulunur. Kısmi batmada yalnız batan hacim verilir; tüm hacim
          için sayı seçilmez.
        </p>
        <div className="p026-controls">
          <NumberField
            field="mass"
            label="Toplam tartım (g)"
            values={s}
            commit={commit}
            min={s.tare + 1}
          />
          <NumberField
            field="tare"
            label="Kap darası (g)"
            values={s}
            commit={commit}
          />
          <NumberField
            field="vStart"
            label="İlk sıvı düzeyi (cm³)"
            values={s}
            commit={commit}
          />
          <NumberField
            field="vEnd"
            label="Son sıvı düzeyi (cm³)"
            values={s}
            commit={commit}
            min={s.vStart + 1}
          />
          <Choice
            label="Batma koşulu"
            value={s.immersion}
            options={[
              ["full", "Tam batmış"],
              ["partial", "Yalnız bir kısmı batmış"],
            ]}
            change={(immersion) => commit({ immersion, checked: false })}
          />
        </div>
        <Plot
          kind="displacement"
          title="Ortak0–200cm³ ekseninde ilk ve son sıvı okumaları"
        >
          {(w) => {
            const y = (v: number) => 250 - v;
            return (
              <>
                <text x="12" y="24">
                  cm³
                </text>
                {[s.vStart, s.vEnd].map((v, i) => {
                  const x = 40 + (i * (w - 80)) / 2;
                  return (
                    <g key={i}>
                      <path
                        className="p026-axis"
                        d={`M${x} 40V250H${x + 50}V40`}
                      />
                      <rect
                        x={x + 2}
                        y={y(v)}
                        width="46"
                        height={v}
                        className="p026-water"
                        data-volume-reading={v}
                      />
                      {[0, 100, 200].map((mark) => (
                        <path
                          key={mark}
                          className="p026-grid"
                          d={`M${x} ${y(mark)}h50`}
                        />
                      ))}
                      <text x={x} y="276">
                        {i ? "Son" : "İlk"}: {v}
                      </text>
                    </g>
                  );
                })}
              </>
            );
          }}
        </Plot>
        <Result
          data-net-mass={m.mass}
          data-displaced-volume={m.displaced}
          data-density={m.density ?? "unknown"}
          data-density-upper={m.upperBound ?? "none"}
        >
          <p>
            Net kütle: {fmt(m.mass)} g. Batan hacim: {fmt(m.displaced)} cm³.
          </p>
          {m.density !== null ? (
            <p>
              Tüm dış hacim için özkütle: {fmt(m.density, 5)} g/cm³ ={" "}
              {fmt(m.densitySI!, 3)} kg/m³.
            </p>
          ) : (
            <p>
              Tüm hacim daha büyük. Özkütle &lt; {fmt(m.upperBound!, 5)} g/cm³;
              tam değer bu veriyle bulunmaz.
            </p>
          )}
          <p>
            Kapalı boşluk dış hacme dahil olabilir. Katı madde hacmi isteniyorsa
            boşluk bilgisi de gerekir.
          </p>
        </Result>
        <Compare
          question="Bu batma verisi tüm dış hacme göre özkütle için ne verir?"
          expected={s.immersion === "full" ? "Kesin değer" : "Üst sınır"}
          proof={
            <p>
              {s.immersion === "full"
                ? "Net kütle tüm dış hacme bölünür. Bu oran her zaman katı madde özkütlesi değildir."
                : "Pay aynı kütle, payda ise yalnız batan hacim. Gerçek dış hacim daha büyük olduğu için gerçek ortalama oran daha küçüktür."}
            </p>
          }
          values={s}
          valid={valid}
          commit={commit}
        />
      </>
    );
  }
  if (s.view === "mix") {
    const m = mixture026(s.rho1 / 10, s.rho2 / 10, s.vol1, s.vol2, s.finalVol),
      change = sign(m.density - m.additiveDensity);
    return (
      <>
        <h4>Kütleyi koru, son hacmi ölç</h4>
        <p>
          Kapalı karışımda madde kaybı ve tepkime yok. Son hacim ayrı bir ölçüm
          girdisidir; ilk hacim toplamına zorla eşit sayılmaz.
        </p>
        {controls(s, commit, [
          ["rho1", "1. özkütle ×10 (g/cm³)"],
          ["rho2", "2. özkütle ×10 (g/cm³)"],
          ["vol1", "1. hacim (cm³)"],
          ["vol2", "2. hacim (cm³)"],
          ["finalVol", "Ölçülen son hacim (cm³)"],
        ])}
        <Plot
          kind="mixture"
          title="Korunan kütle ile ilk ve son hacmi ayrı ölçeklerde kıyasla"
          height={310}
        >
          {(w) => {
            const span = w - 90,
              massScale = span / Math.max(m.mass, 1),
              volumeScale = span / Math.max(m.initialVolume, m.finalVolume, 1);
            return (
              <>
                <text x="12" y="26">
                  Kütle (g)
                </text>
                <rect
                  x="55"
                  y="48"
                  width={m.m1 * massScale}
                  height="24"
                  className="p026-fill"
                  data-mixture-m1={m.m1}
                />
                <rect
                  x={55 + m.m1 * massScale}
                  y="48"
                  width={m.m2 * massScale}
                  height="24"
                  className="p026-water"
                  data-mixture-m2={m.m2}
                />
                <text x="12" y="103">
                  Toplam: {fmt(m.mass)}
                </text>
                <text x="12" y="142">
                  Hacim (cm³)
                </text>
                <text x="12" y="181">
                  İlk
                </text>
                <rect
                  x="55"
                  y="160"
                  width={m.initialVolume * volumeScale}
                  height="26"
                  className="p026-fill"
                />
                <text x="12" y="237">
                  Son
                </text>
                <rect
                  x="55"
                  y="216"
                  width={m.finalVolume * volumeScale}
                  height="26"
                  className="p026-water"
                  data-final-volume={m.finalVolume}
                />
                <text x="12" y="286">
                  Aynı hacim ölçeği
                </text>
              </>
            );
          }}
        </Plot>
        <Result
          data-mixture-density={m.density}
          data-volume-change={m.volumeChange}
        >
          <p>
            Kütleler: {fmt(m.m1)} g ve {fmt(m.m2)} g; toplam {fmt(m.mass)} g.
          </p>
          <p>
            İlk hacim toplamı: {fmt(m.initialVolume)} cm³. Son hacim:{" "}
            {fmt(m.finalVolume)} cm³. Fark: {fmt(m.volumeChange)} cm³.
          </p>
          <p>
            Son özkütle: {fmt(m.density, 5)} g/cm³. Hacim toplamı ile:{" "}
            {fmt(m.additiveDensity, 5)} g/cm³.
          </p>
          <p>
            İki özkütle arasında kalma kuralı için hacim toplama kabulünü de
            denetle.
          </p>
        </Result>
        <Compare
          question="Son hacimle bulunan özkütle, ilk hacim toplamı ile bulunan değere göre ne olur?"
          expected={change}
          proof={
            <p>
              İki hesapta toplam kütle aynı. Payda küçülürse oran artar; payda
              büyürse oran azalır. Eşit payda eşit oran verir.
            </p>
          }
          values={s}
          valid={valid}
          commit={commit}
        />
      </>
    );
  }
  if (s.view === "scale") {
    const m = similarity026(s.scale / 10),
      expected = m.scale === 1 ? "Aynı" : m.scale > 1 ? "Hacim" : "Alan";
    return (
      <>
        <h4>Aynı madde, benzer cisimler</h4>
        <p>
          Tüm uzunluklar aynı s oranında değişir. Malzeme, izinli gerilme ve
          özkütle aynı. Kesitin yük sınırı ve kendi ağırlığına göre pay ayrı
          izlenir.
        </p>
        {controls(s, commit, [["scale", "Uzunluk oranı s ×10"]])}
        <Plot
          kind="similarity"
          title="Benzer küplerin uzunlukları ve ayrı alan/hacim oranları"
          height={340}
        >
          {(w) => {
            const cube = (x: number, side: number, key: string) => {
                const y = 125,
                  d = side / 3;
                return (
                  <g key={key}>
                    <path
                      className="p026-primary"
                      d={`M${x} ${y}h${side}v${-side}h${-side}z M${x} ${y - side}l${d} ${-d}h${side}v${side}l${-d} ${d} M${x + side} ${y - side}l${d} ${-d}`}
                    />
                  </g>
                );
              },
              max = Math.max(
                1,
                m.areaFactor,
                m.volumeFactor,
                m.relativeSupportFactor,
              ),
              values = [m.areaFactor, m.volumeFactor, m.relativeSupportFactor];
            return (
              <>
                {cube(30, 20, "base")}
                {cube(w / 2, 20 * m.scale, "changed")}
                <text x="25" y="156">
                  İlk
                </text>
                <text x={w / 2} y="156">
                  s = {fmt(m.scale)}
                </text>
                {values.map((value, i) => (
                  <g key={i}>
                    <text x="12" y={196 + i * 51}>
                      {["Alan", "Hacim", "A / V"][i]}
                    </text>
                    <rect
                      x="96"
                      y={179 + i * 51}
                      width={(value / max) * (w - 116)}
                      height="22"
                      className={i === 1 ? "p026-water" : "p026-fill"}
                      data-similarity-factor={value}
                    />
                  </g>
                ))}
              </>
            );
          }}
        </Plot>
        <Result
          data-area-factor={m.areaFactor}
          data-volume-factor={m.volumeFactor}
          data-relative-support={m.relativeSupportFactor}
        >
          <dl className="p026-ledger">
            <div>
              <dt>Uzunluk</dt>
              <dd>{fmt(m.scale)} kat.</dd>
            </div>
            <div>
              <dt>Kesit alanı</dt>
              <dd>{fmt(m.areaFactor)} kat.</dd>
            </div>
            <div>
              <dt>Hacim ve ağırlık</dt>
              <dd>{fmt(m.volumeFactor)} kat.</dd>
            </div>
            <div>
              <dt>Kesitin yük sınırı</dt>
              <dd>{fmt(m.absoluteLoadFactor)} kat.</dd>
            </div>
            <div>
              <dt>Kendi ağırlığına göre pay</dt>
              <dd>{fmt(m.relativeSupportFactor)} kat.</dd>
            </div>
          </dl>
          <p>
            Bu sade oran, burkulma veya çatlak hesabı değildir. Gerçek yapı
            güvenliği için yeterli veri sağlamaz.
          </p>
        </Result>
        <Compare
          question="Boyutlar bu oranda değişince alanın mı, hacmin mi çarpanı daha büyük?"
          expected={expected}
          proof={
            <p>
              Alan çarpanı s², hacim çarpanı s³. s &gt; 1 ise hacim daha hızlı
              büyür; 0 &lt; s &lt; 1 ise hacim daha küçük çarpanla kalır. s = 1
              iki oranı da 1 yapar.
            </p>
          }
          values={s}
          valid={valid}
          commit={commit}
        />
      </>
    );
  }
  const m = capillary026(s.radius / 10, s.tension / 1000, s.contact, s.fluid),
    expected = m.heightM > 0 ? "Üstte" : m.heightM < 0 ? "Altta" : "Aynı düzey";
  return (
    <>
      <h4>Temas açısıyla düzeyin işaretini değiştir</h4>
      <p>
        İdeal düşey tüp ve geniş hazne; g = 10 m/s². θ sıvı içinden ölçülür.
        Denge yüksekliği hesaplanır; akış süresi ve kan dolaşımı bu modelde
        yoktur.
      </p>
      {controls(s, commit, [
        ["radius", "Tüp yarıçapı ×10 (mm)"],
        ["tension", "Yüzey gerilimi ×1000 (N/m)"],
        ["contact", "Temas açısı θ (°)"],
        ["fluid", "Sıvı özkütlesi (kg/m³)"],
      ])}
      <Plot
        kind="capillary"
        title="Hazne düzeyine göre pozitif yükselme veya negatif alçalma"
        height={330}
      >
        {(w, marker) => {
          const center = w / 2,
            r = (s.radius / 10) * 5,
            y = 160 - m.heightMm * 2,
            c = m.cosine;
          return (
            <>
              <rect
                x="16"
                y="160"
                width={w - 32}
                height="125"
                className="p026-water-light"
              />
              <path className="p026-axis" d={`M16 70V285H${w - 16}V70`} />
              <path className="p026-secondary" d={`M16 160H${w - 16}`} />
              <path
                className="p026-axis"
                d={`M${center - r} 25V300 M${center + r} 25V300`}
              />
              <path
                className="p026-water"
                d={`M${center - r + 1} ${y - c * 4}Q${center} ${y + c * 4} ${center + r - 1} ${y - c * 4}V285H${center - r + 1}Z`}
                data-capillary-mm={m.heightMm}
              />
              {m.heightM !== 0 ? (
                <line
                  x1={w - 35}
                  x2={w - 35}
                  y1="160"
                  y2={y}
                  className="p026-primary"
                  markerEnd={`url(#${marker})`}
                />
              ) : (
                <circle cx={w - 35} cy="160" r="4" className="p026-dot" />
              )}
              {[-40, 0, 40].map((h) => (
                <text key={h} x="20" y={160 - h * 2 - 5}>
                  {h} mm
                </text>
              ))}
              <text x="12" y="321">
                Hazne: 0 mm
              </text>
            </>
          );
        }}
      </Plot>
      <p>
        Düşey ölçek aynı kalır. Tüp çizimi şematiktir; model menisküs hacmini
        ihmal eder.
      </p>
      <Result
        data-capillary-height-mm={m.heightMm}
        data-contact-cosine={m.cosine}
      >
        <p>
          cosθ = {fmt(m.cosine, 6)}. İşaretli h = {fmt(m.heightMm, 5)} mm.
        </p>
        <p>
          h = 2γ cosθ / (ρgr). θ = 90° iken h = 0; yüzey gerilimi yine pozitif
          olabilir.
        </p>
        <p>
          Hazne ve tüp üstünde aynı gaz basıncı var. Sonlu tüp ve akış etkisi
          hesaba katılmaz.
        </p>
      </Result>
      <Compare
        question="İdeal dengede tüpteki sıvı hazne düzeyinin altında mı, üstünde mi, aynı hizada mı?"
        expected={expected}
        proof={
          <p>
            {m.heightM > 0
              ? "cosθ pozitif; h pozitif yükselme verir."
              : m.heightM < 0
                ? "cosθ negatif; h negatif alçalma verir."
                : "cos90° sıfır; bu açıda düşey yüzey bileşeni sıfırdır."}{" "}
            Yoğunluk ve yarıçap pozitif; işareti cosθ belirler.
          </p>
        }
        values={s}
        valid={valid}
        commit={commit}
      />
    </>
  );
}
function MotionView({ s, commit, valid }: ViewProps026) {
  const pieces = [
      { duration: s.t1, acceleration: s.a1 },
      { duration: s.t2, acceleration: s.a2 },
      { duration: s.t3, acceleration: s.a3 },
    ],
    total = s.t1 + s.t2 + s.t3,
    elapsed = (total * s.sample) / 100,
    m = motion026(s.velocity, pieces, elapsed, s.frame, s.origin),
    moving = m.segments.filter((p) => p.duration > 0),
    directions = new Set(
      moving
        .flatMap((p) => [p.start.v - s.frame, p.end.v - s.frame])
        .filter((v) => v !== 0)
        .map((v) => (v > 0 ? 1 : -1)),
    ),
    expected = directions.size > 1 ? "Yol daha büyük" : "Eşit";
  const position = (part: (typeof m.segments)[number], time: number) => {
    const dt = time - part.start.t;
    return (
      part.start.x +
      part.start.v * dt +
      (part.acceleration * dt * dt) / 2 -
      s.frame * time
    );
  };
  const graphs = [
    {
      kind: "position",
      label: "Konum x′ (m)",
      values: m.samples
        .map((p) => p.x)
        .concat(
          moving.flatMap((p) => {
            const root =
              p.acceleration === 0
                ? -1
                : -(p.start.v - s.frame) / p.acceleration;
            return root > 0 && root < p.duration
              ? [position(p, p.start.t + root)]
              : [];
          }),
        ),
      current: m.current.x,
    },
    {
      kind: "velocity",
      label: "Hız v′ (m/s)",
      values: m.samples.map((p) => p.v),
      current: m.current.v,
    },
    {
      kind: "acceleration",
      label: "İvme a′ (m/s²)",
      values: moving.map((p) => p.acceleration),
      current: m.current.a,
    },
  ];
  return (
    <>
      <h4>Evreleri aynı saate bağla</h4>
      <p>
        Tek doğru, en çok üç sabit ivme evresi. İç sınırda hız ve konum
        süreklidir; ivme için sağ evre seçilir. Gözlemci sabit u hızıyla gider
        ve ilk anda aynı konum sıfırını kullanır.
      </p>
      {controls(s, commit, [
        ["velocity", "İlk dünya hızı (m/s)"],
        ["frame", "Gözlemci hızı u (m/s)"],
        ["origin", "İlk dünya konumu (m)"],
        ["t1", "1. evre süresi (s)"],
        ["a1", "1. evre ivmesi (m/s²)"],
        ["t2", "2. evre süresi (s)"],
        ["a2", "2. evre ivmesi (m/s²)"],
        ["t3", "3. evre süresi (s)"],
        ["a3", "3. evre ivmesi (m/s²)"],
        ["sample", "Toplam sürede seçili pay (%)"],
      ])}
      <p>
        Seçili an: {fmt(elapsed)} s / {fmt(total)} s. Sabit hızlı gözlemci için
        x′ = x − ut, v′ = v − u, a′ = a. Grafiklerin düşey birimleri ayrı.
      </p>
      {graphs.map((graph) => (
        <div key={graph.kind} className="p026-chart">
          <h5>{graph.label}</h5>
          <Plot
            kind={graph.kind}
            title={graph.label + "; aynı seçili anı gösteren tam evre eğrisi"}
            height={275}
          >
            {(w) => {
              const data = graph.values.length ? graph.values : [0],
                min = Math.min(...data),
                max = Math.max(...data),
                pad = Math.max(1, (max - min) * 0.08),
                lo = Math.floor(min - pad),
                hi = Math.ceil(max + pad),
                tx = (t: number) => 88 + (t / Math.max(total, 1)) * (w - 108),
                y = (v: number) => 225 - ((v - lo) / (hi - lo)) * 185;
              let path = "";
              moving.forEach((p, i) => {
                const x0 = tx(p.start.t),
                  x1 = tx(p.end.t);
                if (graph.kind === "position") {
                  const start = position(p, p.start.t),
                    end = position(p, p.end.t),
                    control = start + ((p.start.v - s.frame) * p.duration) / 2;
                  path += `${i ? "L" : "M"}${x0},${y(start)} Q${tx(p.start.t + p.duration / 2)},${y(control)} ${x1},${y(end)} `;
                } else if (graph.kind === "velocity")
                  path += `${i ? "L" : "M"}${x0},${y(p.start.v - s.frame)} L${x1},${y(p.end.v - s.frame)} `;
                else
                  path += `${i ? "L" : "M"}${x0},${y(p.acceleration)} L${x1},${y(p.acceleration)} `;
              });
              const ticks = [lo, ...(lo < 0 && hi > 0 ? [0] : []), hi];
              return (
                <>
                  <path className="p026-axis" d={`M88 25V225H${w - 16}`} />
                  {ticks.map((tick) => (
                    <g key={tick}>
                      <path
                        className="p026-grid"
                        d={`M88 ${y(tick)}H${w - 16}`}
                      />
                      <text x="4" y={y(tick) + 5}>
                        {fmt(tick, 0)}
                      </text>
                    </g>
                  ))}
                  {path && (
                    <path
                      className="p026-primary"
                      d={path}
                      data-motion-curve={graph.kind}
                    />
                  )}
                  <path className="p026-probe" d={`M${tx(elapsed)} 25V225`} />
                  {graph.current !== null && (
                    <circle
                      cx={tx(elapsed)}
                      cy={y(graph.current)}
                      r="5"
                      className="p026-dot"
                      data-motion-point={graph.kind}
                      data-time={elapsed}
                      data-value={graph.current}
                    />
                  )}{" "}
                  {graph.kind === "acceleration" &&
                    moving.map((p, i) => (
                      <g key={i}>
                        <circle
                          cx={tx(p.start.t)}
                          cy={y(p.acceleration)}
                          r="3"
                          className="p026-dot"
                        />
                        <circle
                          cx={tx(p.end.t)}
                          cy={y(p.acceleration)}
                          r="3"
                          className="p026-open-dot"
                        />
                      </g>
                    ))}
                  <text x="88" y="258">
                    0
                  </text>
                  <text x={w - 16} y="258" textAnchor="end">
                    {total === 0 ? "Aralık yok" : fmt(total) + " s"}
                  </text>
                </>
              );
            }}
          </Plot>
        </div>
      ))}
      <Result
        data-displacement={m.displacement}
        data-total-distance={m.distance}
        data-current-x={m.current.x}
        data-current-v={m.current.v}
        data-current-a={m.current.a ?? "not-specified"}
        data-average-speed={m.averageSpeed ?? "not-defined"}
      >
        <p>
          Seçili an: x′ = {fmt(m.current.x)} m; v′ = {fmt(m.current.v)} m/s; a′
          ={" "}
          {m.current.a === null
            ? "sonraki evre verilmedi"
            : fmt(m.current.a) + " m/s²"}
          .
        </p>
        <p>
          Toplam yer değiştirme: {fmt(m.displacement)} m. Toplam yol:{" "}
          {fmt(m.distance)} m.
        </p>
        <p>
          Ortalama hız:{" "}
          {m.averageVelocity === null
            ? "tanımsız (süre 0)"
            : fmt(m.averageVelocity) + " m/s"}
          . Ortalama sürat:{" "}
          {m.averageSpeed === null
            ? "tanımsız (süre 0)"
            : fmt(m.averageSpeed) + " m/s"}
          .
        </p>
        <p>
          Model, son zamandan sonraki hareketi vermez. Konum ve hız son anda
          bilinir; daha sonraki ivme seçilmez.
        </p>
        <dl className="p026-ledger">
          {m.segments.map((p, i) => (
            <div key={i}>
              <dt>
                {i + 1}. evre: {fmt(p.start.t)}–{fmt(p.end.t)} s
              </dt>
              <dd>
                Dünya konumu {fmt(p.start.x)} → {fmt(p.end.x)} m; hızı{" "}
                {fmt(p.start.v)} → {fmt(p.end.v)} m/s. Seçili gözlemcide Δx′ ={" "}
                {fmt(p.frameDisplacement)} m; yol = {fmt(p.distance)} m.
              </dd>
            </div>
          ))}
        </dl>
      </Result>
      <Compare
        question="Bu referans için toplam yol, |Δx′| ile aynı mı?"
        expected={expected}
        proof={
          <p>
            {directions.size > 1
              ? "Pozitif sürelerde iki yönde hareket var. Mutlak alanlar yolda toplanırken işaretli alanlar birbirinden çıkar; yol daha büyük kalır."
              : "Pozitif süreli hareket tek yönde veya durgun. Yol, |Δx′| kadardır."}{" "}
            Bekleme süreyi artırır; yola katkısı sıfırdır.
          </p>
        }
        values={s}
        valid={valid}
        commit={commit}
      />
    </>
  );
}
function EnergyView({ s, commit, valid }: ViewProps026) {
  if (s.view === "ramp") {
    const m = rampEnergy026(
        s.emass / 10,
        s.speed / 10,
        s.drive / 10,
        s.resist / 10,
        s.slope / 100,
        s.path / 10,
      ),
      released = Math.max(0, -m.potentialChange),
      raised = Math.max(0, m.potentialChange),
      incoming = m.initialK + m.driveWork + released,
      outgoing = m.finalK + m.thermalGain + raised;
    return (
      <>
        <h4>Önce ileri hedefe erişimi denetle</h4>
        <p>
          Noktasal cisim, düz yol, g = 10 m/s². İtiş yola paralel; direnç ileri
          kaymaya karşı sabit. h = yol × sinθ. İlk duruştan sonra ileri hesap
          biter; geri kayma ve statik tutunma çözülmez.
        </p>
        {controls(s, commit, [
          ["emass", "Kütle ×10 (kg)"],
          ["speed", "İlk sürat ×10 (m/s)"],
          ["drive", "İtiş ×10 (N)"],
          ["resist", "Kayma direnci ×10 (N)"],
          ["slope", "Eğim sinθ ×100"],
          ["path", "Hedef yol ×10 (m)"],
        ])}
        <Plot
          kind="ramp-budget"
          title="Gerçek erişim noktasına kadar kinetik enerji; hedef ayrıca işaretli"
          height={290}
        >
          {(w) => {
            const x = (d: number) =>
                65 + (d / Math.max(m.requestedDistance, 1)) * (w - 85),
              y = (k: number) =>
                235 - (k / Math.max(m.initialK, m.finalK, 1)) * 185;
            return (
              <>
                <path className="p026-axis" d={`M65 30V235H${w - 16}`} />
                <text x="10" y="23">
                  K (J)
                </text>
                <text x="10" y="54">
                  {fmt(Math.max(m.initialK, m.finalK, 1), 1)}
                </text>
                <text x="35" y="241">
                  0
                </text>
                <path
                  className="p026-primary"
                  d={`M${x(0)} ${y(m.initialK)}L${x(m.distance)} ${y(m.finalK)}`}
                  data-energy-line
                />
                <path
                  className="p026-secondary"
                  d={`M${x(m.requestedDistance)} 35V235`}
                  data-target-distance={m.requestedDistance}
                />
                <circle
                  cx={x(m.distance)}
                  cy={y(m.finalK)}
                  r="5"
                  className="p026-dot"
                  data-reached-distance={m.distance}
                />
                <text x="65" y="273">
                  İleri yol (m)
                </text>
              </>
            );
          }}
        </Plot>
        <p>
          Düz çizgi gerçek ileri bütçe; kesikli çizgi seçilen hedef. Negatif K
          ile hedef tamam sayılmaz.
        </p>
        <Plot
          kind="energy-ledger"
          title="Aynı joule ölçeğinde başlangıç ve girişler ile izlenen son enerji"
          height={220}
        >
          {(w) => {
            const scale = (w - 32) / Math.max(incoming, outgoing, 1),
              rows = [
                [m.initialK, m.driveWork, released],
                [m.finalK, m.thermalGain, raised],
              ];
            return (
              <>
                {rows.map((row, i) => {
                  let x = 16;
                  return (
                    <g key={i}>
                      <text x="16" y={27 + i * 100}>
                        {i ? "Son + dönüşüm" : "İlk + giriş"}:{" "}
                        {fmt(i ? outgoing : incoming, 1)} J
                      </text>
                      {row.map((value, j) => {
                        const left = x;
                        x += value * scale;
                        return (
                          <rect
                            key={j}
                            x={left}
                            y={42 + i * 100}
                            width={value * scale}
                            height="28"
                            className={
                              ["p026-fill", "p026-water", "p026-third-fill"][j]
                            }
                            data-energy-part={value}
                          />
                        );
                      })}
                    </g>
                  );
                })}
              </>
            );
          }}
        </Plot>
        <Result
          data-reached={m.reached}
          data-completed-distance={m.distance}
          data-final-kinetic={m.finalK}
          data-thermal={m.thermalGain}
          data-potential-change={m.potentialChange}
          data-energy-balance-error={incoming - outgoing}
        >
          <p>
            {m.reached
              ? "Hedefe erişildi."
              : "İleri hedefe erişilmedi; ilk duruş veya başlangıç sınırı var."}{" "}
            İstenen yol {fmt(m.requestedDistance)} m; gerçek ileri yol{" "}
            {fmt(m.distance)} m.
          </p>
          <p>
            İlk K = {fmt(m.initialK)} J; son K = {fmt(m.finalK)} J. Son sürat ={" "}
            {fmt(m.finalSpeed)} m/s. Geçen süre = {fmt(m.elapsed)} s.
          </p>
          <dl className="p026-ledger">
            <div>
              <dt>İtiş işi</dt>
              <dd>{fmt(m.driveWork)} J.</dd>
            </div>
            <div>
              <dt>Yerçekimi ΔU</dt>
              <dd>{fmt(m.potentialChange)} J.</dd>
            </div>
            <div>
              <dt>İç enerji artışı</dt>
              <dd>{fmt(m.thermalGain)} J.</dd>
            </div>
            <div>
              <dt>Net iş</dt>
              <dd>{fmt(m.netWork)} J = son K − ilk K.</dd>
            </div>
          </dl>
          <p>
            Üst çubuk: ilk K, itiş işi, varsa potansiyel azalışı. Alt çubuk: son
            K, iç enerji artışı, varsa potansiyel artışı. Her iki toplam{" "}
            {fmt(incoming)} J.
          </p>
        </Result>
        <Compare
          question="Bu ileri program seçili hedefe ulaşır mı?"
          expected={m.reached ? "Erişir" : "Durur"}
          proof={
            <p>
              {m.reached
                ? "İleri bütçe hedefe kadar negatif olmuyor. Hedef ilk duruş noktası ise o konuma 0 hızla varılmış olur."
                : "İleri kinetik bütçe hedefin önünde tükeniyor veya ilk anda ileri enerji / ivme yok. Daha uzak konuma negatif K atanmıyor."}
            </p>
          }
          values={s}
          valid={valid}
          commit={commit}
        />
      </>
    );
  }
  if (s.view === "spring") {
    const m = springEnergy026(
        s.stiffness,
        s.springStart / 100,
        s.springEnd / 100,
      ),
      expected = sign(m.change);
    return (
      <>
        <h4>İlk depoyu da hesaba kat</h4>
        <p>
          İdeal kütlesiz Hooke yayı; verilen tüm aralıkta esneklik sınırı
          aşılmaz. x, doğal boydan işaretli sapma. Dış iş, çok yavaş hareket
          için verilir; kuvvet ve enerji ayrı izlenir.
        </p>
        {controls(s, commit, [
          ["stiffness", "Yay sabiti k (N/m)"],
          ["springStart", "İlk sapma (cm)"],
          ["springEnd", "Son sapma (cm)"],
        ])}
        <Plot
          kind="spring-force"
          title="Doğal boya göre ilk ve son sapma; son geri çağırıcı kuvvet"
          height={280}
        >
          {(w, marker) => {
            const rest = w / 2,
              coil = (x: number, y: number) => {
                const end = rest + x * 100,
                  start = 20,
                  points = Array.from(
                    { length: 13 },
                    (_, i) =>
                      `${start + ((end - start) * i) / 12},${y + (i === 0 || i === 12 ? 0 : i % 2 ? 8 : -8)}`,
                  ).join(" ");
                return <polyline points={points} className="p026-primary" />;
              };
            return (
              <>
                <path className="p026-axis" d={`M20 35V240 M${rest} 30V240`} />
                <text x="28" y="26">
                  Doğal boy
                </text>
                {coil(m.start, 85)}
                {coil(m.end, 180)}
                <text x="25" y="124">
                  İlk x: {fmt(m.start)} m
                </text>
                <text x="25" y="221">
                  Son x: {fmt(m.end)} m
                </text>
                {m.finalForce !== 0 && (
                  <line
                    x1={rest + m.end * 100}
                    x2={rest + m.end * 100 + (m.finalForce / 250) * 80}
                    y1="160"
                    y2="160"
                    className="p026-secondary"
                    markerEnd={`url(#${marker})`}
                    data-spring-force={m.finalForce}
                  />
                )}
                <text x="12" y="267">
                  Ok: geri çağırıcı kuvvet
                </text>
              </>
            );
          }}
        </Plot>
        <Plot
          kind="spring-energy"
          title="Aynı sabit joule ölçeğinde karesel yay enerjisi ve iki sapma"
          height={300}
        >
          {(w) => {
            const x = (v: number) => 40 + (v + 0.5) * (w - 60),
              y = (u: number) => 250 - (u / 65) * 200,
              path = Array.from({ length: 101 }, (_, i) => {
                const value = -0.5 + i / 100;
                return `${i ? "L" : "M"}${x(value)},${y((s.stiffness * value * value) / 2)}`;
              }).join(" ");
            return (
              <>
                <path className="p026-axis" d={`M40 30V250H${w - 16}`} />
                <path className="p026-primary" d={path} />
                <text x="10" y="23">
                  U (J)
                </text>
                <text x="8" y="57">
                  65
                </text>
                <circle
                  cx={x(m.start)}
                  cy={y(m.initialU)}
                  r="5"
                  className="p026-open-dot"
                  data-spring-point="initial"
                />
                <circle
                  cx={x(m.end)}
                  cy={y(m.finalU)}
                  r="5"
                  className="p026-dot"
                  data-spring-point="final"
                />
                <text x="40" y="283">
                  −0,5
                </text>
                <text x={x(0)} y="283" textAnchor="middle">
                  0
                </text>
                <text x={w - 18} y="283" textAnchor="end">
                  +0,5 m
                </text>
              </>
            );
          }}
        </Plot>
        <Result
          data-spring-initial={m.initialU}
          data-spring-final={m.finalU}
          data-spring-work={m.springWork}
          data-external-work={m.externalQuasistaticWork}
        >
          <p>
            İlk U = {fmt(m.initialU)} J; son U = {fmt(m.finalU)} J. ΔU ={" "}
            {fmt(m.change)} J.
          </p>
          <p>
            Yay işi = {fmt(m.springWork)} J. Çok yavaş değişimde net dış iş ={" "}
            {fmt(m.externalQuasistaticWork)} J.
          </p>
          <p>
            İlk yay kuvveti {fmt(m.initialForce)} N; son yay kuvveti{" "}
            {fmt(m.finalForce)} N. Eksi işaret, seçili eksene göredir.
          </p>
          <p>
            Yay sabiti tek başına kalıcı şekil veya kopma sınırını vermez. İlk
            enerji ve geri alınan enerji net işte sayılır.
          </p>
        </Result>
        <Compare
          question="Yayın ilk ve son enerjisi nasıl değişir?"
          expected={expected}
          proof={
            <p>
              U = ½kx². Aynı k için |x| büyürse enerji artar; |x| küçülürse
              azalır. Zıt işaretli eşit sapmalar aynı enerjiyi verir. Yayın
              yaptığı iş ise −ΔU.
            </p>
          }
          values={s}
          valid={valid}
          commit={commit}
        />
      </>
    );
  }
  const m = powerLedger026(s.inputPower, s.seconds, s.eta / 100),
    same = m.usefulEnergy === m.inputEnergy;
  return (
    <>
      <h4>Sabit güçte toplam enerji</h4>
      <p>
        Giriş gücü sabit. Yararlı çıktı açıkça seçilmiş bir pay; diğer enerji
        yok olmaz. Bu basit oran, çevreden ısı taşıyan pompanın COP değeri
        değildir.
      </p>
      {controls(s, commit, [
        ["inputPower", "Giriş gücü (W)"],
        ["seconds", "Çalışma süresi (s)"],
        ["eta", "Yararlı pay (%)"],
      ])}
      <Plot
        kind="power-ledger"
        title="Aynı enerji ölçeğinde giriş, yararlı çıktı ve diğer enerji"
        height={250}
      >
        {(w) => {
          const scale = (w - 32) / Math.max(m.inputEnergy, 1);
          return (
            <>
              <text x="16" y="32">
                Giriş: {fmt(m.inputEnergy / 1000, 1)} kJ
              </text>
              <rect
                x="16"
                y="50"
                width={m.inputEnergy * scale}
                height="35"
                className="p026-fill"
                data-input-energy-j={m.inputEnergy}
              />
              <text x="16" y="135">
                Yararlı / diğer
              </text>
              <rect
                x="16"
                y="153"
                width={m.usefulEnergy * scale}
                height="35"
                className="p026-water"
                data-useful-energy-j={m.usefulEnergy}
              />
              <rect
                x={16 + m.usefulEnergy * scale}
                y="153"
                width={m.otherEnergy * scale}
                height="35"
                className="p026-third-fill"
                data-other-energy-j={m.otherEnergy}
              />
              <text x="16" y="228">
                Toplam enerji korunur
              </text>
            </>
          );
        }}
      </Plot>
      <Result
        data-input-energy={m.inputEnergy}
        data-useful-energy={m.usefulEnergy}
        data-other-energy={m.otherEnergy}
        data-kwh={m.kWh}
        data-measured-efficiency={m.measuredEfficiency ?? "not-defined"}
      >
        <p>
          Giriş: {fmt(m.inputEnergy)} J = {fmt(m.kWh, 6)} kWh.
        </p>
        <p>
          Yararlı çıktı: {fmt(m.usefulEnergy)} J. Diğer enerji:{" "}
          {fmt(m.otherEnergy)} J.
        </p>
        <p>
          Yararlı güç: {fmt(m.usefulPower)} W. Çıktı / giriş oranı:{" "}
          {m.measuredEfficiency === null
            ? "tanımsız; giriş enerjisi 0"
            : fmt(m.measuredEfficiency * 100) + "%"}
          .
        </p>
        <p>
          1 kWh = 3,6 × 10⁶ J. Sıfır girişte bu pay modelde seçilir; deneyden
          ölçülen bir oran değildir.
        </p>
      </Result>
      <Compare
        question="Bu aralıkta yararlı enerji, giriş enerjisine eşit mi?"
        expected={same ? "Eşit" : "Daha az"}
        proof={
          <p>
            {m.inputEnergy === 0
              ? "İki enerji de 0. Bu eşitlik, çıktı / giriş oranına değer vermez; 0 / 0 bir oran vermez."
              : same
                ? "Seçilen yararlı pay %100; bu ideal amaç tanımında bütün giriş yararlı çıktı olarak sayılır."
                : "Yararlı pay %100 altında. Diğer pay başka enerji türüne veya amaca gider; enerji yok olmaz."}
          </p>
        }
        values={s}
        valid={valid}
        commit={commit}
      />
    </>
  );
}
function PhysicsExplorer026({
  base,
  lessonId,
}: {
  base: Base026;
  lessonId: string;
}) {
  const explorationKey = "forge026-physics-" + lessonId,
    defaults = { ...physicsDefaults026, view: views026[base][0][0] as string },
    [cooked, save] = useExploration(explorationKey, defaults),
    raw = useApp().state.explorations[explorationKey],
    normalized = normalizePhysics026(base, cooked, raw),
    s = normalized.values,
    commit: Commit026 = (patch) =>
      save({
        ...s,
        ...patch,
        reason: (patch.reason ?? s.reason).slice(0, 128),
      });
  const titles = {
    "fizik-bilimine-giris": "Ölçüm ve birim deneyi",
    "madde-ozkutle": "Kütle, hacim ve arayüz",
    "dogrusal-hareket": "Evre ve referans seç",
    "enerji-ve-hareket": "İşten enerji bütçesine",
  };
  return (
    <section className="p026-lab" data-forge026={lessonId}>
      <h3>{titles[base]}</h3>
      {views026[base].length > 1 && (
        <Choice
          label="İnceleme"
          value={s.view}
          options={views026[base]}
          change={(view) =>
            commit({ view, guess: "", reason: "", checked: false })
          }
        />
      )}
      {base === "fizik-bilimine-giris" ? (
        <IntroView s={s} valid={normalized.valid} commit={commit} />
      ) : base === "madde-ozkutle" ? (
        <MatterView s={s} valid={normalized.valid} commit={commit} />
      ) : base === "dogrusal-hareket" ? (
        <MotionView s={s} valid={normalized.valid} commit={commit} />
      ) : (
        <EnergyView s={s} valid={normalized.valid} commit={commit} />
      )}
      <p className="small muted">
        Keşif bu cihazda ayrı saklanır. Konu, soru, XP veya ustalık kaydı
        eklemez. Tahminin kısa da olabilir; kanıtla bağını kendin açıkla.
      </p>
    </section>
  );
}
export default function Forge026PhysicsLab({ lessonId }: { lessonId: string }) {
  const base = lessonId.endsWith("-ileri") ? lessonId.slice(0, -6) : lessonId;
  return bases026.includes(base as Base026) ? (
    <PhysicsExplorer026 base={base as Base026} lessonId={lessonId} />
  ) : null;
}
