import { useId, type ReactNode } from "react";
import {
  calorimetry019,
  colligative019,
  concentration019,
  hess019,
  ice019,
  rate019,
  solubility019,
  temperatureEquilibrium019,
} from "./forge019Chemistry";
import { useExploration } from "./useExploration";
import "./forge019Chemistry.css";

const fmt = (n: number, digits = 4) =>
  Number.isFinite(n)
    ? new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
        Object.is(n, -0) ? 0 : n,
      )
    : "∞";
const bound = (n: number, low: number, high: number) =>
  Number.isFinite(n) ? Math.min(high, Math.max(low, n)) : low;
const key = (id: string) => "forge019:chemistry:" + id;
const initial = { prediction: "", reason: "", checked: false };
type PredictionState = typeof initial;
type Option = readonly [string, string];

function Range({
  label,
  value,
  min = 0,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max: number;
  step?: number;
  onChange: (n: number) => void;
}) {
  const id = useId();
  return (
    <div className="c019-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt(value)}</output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
function Choices({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly Option[];
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <fieldset className="c019-choices">
      <legend id={id}>{label}</legend>
      <div role="group" aria-labelledby={id}>
        {options.map(([v, text]) => (
          <button
            type="button"
            key={v}
            aria-pressed={v === value}
            onClick={() => onChange(v)}
          >
            {text}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
function Drawing({
  title,
  height = 310,
  children,
}: {
  title: string;
  height?: number;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <svg
      role="img"
      aria-labelledby={id}
      className="c019-svg"
      viewBox={"0 0 300 " + height}
    >
      <title id={id}>{title}</title>
      {children}
    </svg>
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
    <section className="forge019-chemistry" data-forge019={id}>
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="c019-note">
        Bu keşif puan vermez. Seçimin ve kısa gerekçen bu cihazda saklanır;
        sorular ayrı kaydedilir.
      </p>
    </section>
  );
}
function Prediction({
  question,
  options,
  expected,
  proof,
  state,
  change,
}: {
  question: string;
  options: readonly Option[];
  expected: string;
  proof: string;
  state: PredictionState;
  change: (v: Partial<PredictionState>) => void;
}) {
  const id = useId(),
    selected = options.some(([v]) => v === state.prediction)
      ? state.prediction
      : "";
  return (
    <div className="c019-prediction">
      <Choices
        label={question}
        options={options}
        value={selected}
        onChange={(prediction) => change({ prediction, checked: false })}
      />
      <label htmlFor={id}>Gerekçen (120 karakter)</label>
      <textarea
        id={id}
        maxLength={120}
        rows={3}
        value={state.reason.slice(0, 120)}
        onChange={(e) =>
          change({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        type="button"
        disabled={!selected || !state.reason.trim()}
        onClick={() => change({ checked: true })}
      >
        Kıyasla
      </button>
      {state.checked && selected && (
        <p role="status" className="c019-feedback">
          {selected === expected
            ? "Seçimin modelle uyumlu."
            : "Model farklı sonuç verdi."}{" "}
          {proof} Bu bir puan kaydı değil.
        </p>
      )}
    </div>
  );
}

function Colligative() {
  const id = "ayt-molalite-koligatif";
  const [s, set] = useExploration(key(id), {
    ...initial,
    n: 0.05,
    kg: 1,
    i: 1,
    volume: 1,
  });
  const r = colligative019(
    bound(s.n, 0, 0.1),
    bound(s.kg, 0.5, 2),
    Math.round(bound(s.i, 1, 3)),
    bound(s.volume, 0.5, 2),
  );
  const change = (v: Partial<typeof s>) => set({ ...v, checked: false });
  return (
    <Frame
      id={id}
      title="Aynı çözelti, iki payda"
      intro="Seyreltik ideal su çözeltisi: çözünen uçucu değil, i verili. Kaynama ve donma 1 atm içindir. Ozmoz hesabında T = 300 K ve son çözelti hacmi ayrı verilir."
    >
      <div className="c019-controls">
        <Range
          label="Çözünen (mol)"
          value={r.moles}
          max={0.1}
          step={0.01}
          onChange={(n) => change({ n })}
        />
        <Range
          label="Su (kg)"
          value={r.solventKg}
          min={0.5}
          max={2}
          step={0.5}
          onChange={(kg) => change({ kg })}
        />
        <Range
          label="Tanecik çarpanı i"
          value={r.particles}
          min={1}
          max={3}
          onChange={(i) => change({ i })}
        />
        <Range
          label="Son hacim (L)"
          value={r.volumeL}
          min={0.5}
          max={2}
          step={0.5}
          onChange={(volume) => change({ volume })}
        />
      </div>
      <figure>
        <Drawing
          title="Saf suya göre kaynama ve donma farkları. Sıfır çizgisinin üstü artış, altı düşüş."
          height={340}
        >
          <path className="c019-axis" d="M38 45V285 M38 145H282" />
          {[
            [-1, 245],
            [0, 145],
            [1, 45],
          ].map(([v, y]) => (
            <g key={v}>
              <path className="c019-grid" d={"M38 " + y + "H282"} />
              <text x={8} y={y + 8}>
                {v}
              </text>
            </g>
          ))}
          <text x={52} y={28}>
            ΔT (°C)
          </text>
          <rect
            className="c019-accent"
            x={88}
            y={145 - r.boilingRise * 100}
            width={45}
            height={r.boilingRise * 100}
            data-boiling-rise={r.boilingRise}
          />
          <rect
            className="c019-mint"
            x={210}
            y={145}
            width={45}
            height={r.freezingDrop * 100}
            data-freezing-drop={r.freezingDrop}
          />
          <text x={110} y={314} textAnchor="middle">
            ΔTb
          </text>
          <text x={232} y={314} textAnchor="middle">
            ΔTf
          </text>
        </Drawing>
        <figcaption>
          Kb = 0,52; Kf = 1,86 °C·kg/mol. Düşüşün büyüklüğü ΔTf pozitif, saf
          suya göre sıcaklık farkı negatiftir. Bu bir ideal hesap; gerçek
          derişik çözelti verisi değil.
        </figcaption>
      </figure>
      <div data-model-result className="c019-result">
        <p>
          Molalite: {fmt(r.molality)} mol/kg. Molarite: {fmt(r.molarity)} mol/L.
        </p>
        <p>
          Kaynama artışı: {fmt(r.boilingRise)} °C. Kaynama: {fmt(r.boiling)} °C.
        </p>
        <p>
          Donma düşüşü: {fmt(r.freezingDrop)} °C. Donma: {fmt(r.freezing)} °C.
        </p>
        <p>Ozmotik basınç: {fmt(r.osmotic)} atm. R = 0,08206 L·atm/(mol·K).</p>
        <p>
          Son hacim tek başına değişirse molalite aynı kalır; molarite ve
          ozmotik basınç değişir. Su kütlesi ile çözelti hacmi aynı payda değil.
        </p>
      </div>
      <Prediction
        question="Saf suya göre donma nasıl?"
        options={[
          ["lower", "Daha düşük"],
          ["same", "Aynı"],
        ]}
        expected={r.moles > 0 ? "lower" : "same"}
        proof={
          "i·m = " +
          fmt(r.particles * r.molality) +
          "; ΔTf = " +
          fmt(r.freezingDrop) +
          " °C."
        }
        state={s}
        change={set}
      />
    </Frame>
  );
}

function Solubility() {
  const id = "ayt-cozunurluk";
  const [s, set] = useExploration(key(id), {
    ...initial,
    water: 150,
    solute: 60,
    temperature: 80,
    kind: "increasing",
  });
  const kind = s.kind === "decreasing" ? "decreasing" : "increasing";
  const r = solubility019(
    bound(s.water, 50, 300),
    bound(s.solute, 0, 100),
    bound(s.temperature, 20, 80),
    kind,
  );
  const change = (v: Partial<typeof s>) => set({ ...v, checked: false });
  return (
    <Frame
      id={id}
      title="Ne kadarı çözünür?"
      intro="Verilen X katısı için kütle hesabı: su kütlesi sabit, dengeye varılır, tepkime yok. Sayılar kurgusal; gerçek bir tuzun ölçüm eğrisi değil."
    >
      <Choices
        label="Verilen eğri"
        value={kind}
        options={[
          ["increasing", "Isınınca artar"],
          ["decreasing", "Isınınca azalır"],
        ]}
        onChange={(kind) => change({ kind })}
      />
      <div className="c019-controls">
        <Range
          label="Su (g)"
          value={r.waterG}
          min={50}
          max={300}
          step={50}
          onChange={(water) => change({ water })}
        />
        <Range
          label="Eklenen X (g)"
          value={r.soluteG}
          max={100}
          step={10}
          onChange={(solute) => change({ solute })}
        />
        <Range
          label="Sıcaklık (°C)"
          value={r.temperature}
          min={20}
          max={80}
          step={10}
          onChange={(temperature) => change({ temperature })}
        />
      </div>
      <p>
        100 g su başına sınır: {fmt(r.per100)} g X.{" "}
        {kind === "increasing"
          ? "20 °C: 20 g; 80 °C: 40 g."
          : "20 °C: 40 g; 80 °C: 20 g."}{" "}
        Arası bu modelde doğrusal.
      </p>
      <figure>
        <Drawing title="Çözünmüş ve ayrı katı X kütleleri. İki sütunun toplamı eklenen X kütlesidir.">
          <path className="c019-axis" d="M55 28V230H285" />
          {[0, 50, 100].map((v) => (
            <g key={v}>
              <path
                className="c019-grid"
                d={"M55 " + (230 - v * 1.8) + "H285"}
              />
              <text x={45} y={238 - v * 1.8} textAnchor="end">
                {v}
              </text>
            </g>
          ))}
          <text x={65} y={25}>
            g X
          </text>
          <rect
            className="c019-accent"
            x={85}
            y={230 - r.dissolved * 1.8}
            width={50}
            height={r.dissolved * 1.8}
            data-dissolved-g={r.dissolved}
          />
          <rect
            className="c019-mint"
            x={210}
            y={230 - r.solid * 1.8}
            width={50}
            height={r.solid * 1.8}
            data-solid-g={r.solid}
          />
          <text x={110} y={275} textAnchor="middle">
            Çözünen
          </text>
          <text x={235} y={275} textAnchor="middle">
            Katı
          </text>
        </Drawing>
        <figcaption>
          Sütunlar kütle ölçeğidir; kap hacmini veya tanecik sayısını çizmez.
          Soğutma katı bırakabilir; madde yok olmaz.
        </figcaption>
      </figure>
      <div data-model-result className="c019-result">
        <p>
          Kapasite: {fmt(r.capacity)} g. Çözünen: {fmt(r.dissolved)} g. Ayrı
          katı: {fmt(r.solid)} g.
        </p>
        <p>
          Çözelti kütlesi: {fmt(r.solutionMass)} g. Tüm sistem:{" "}
          {fmt(r.totalMass)} g.
        </p>
        <p>
          {r.soluteG === 0
            ? "Yalnız çözücü var."
            : r.saturated
              ? "Sıvı faz doygun."
              : "Sıvı faz doymamış."}{" "}
          Katı tam sınırda sıfır olsa da sıvı doygun olabilir. Ayrı katı,
          çözelti kütlesine katılmaz.
        </p>
      </div>
      <Prediction
        question="Son durumda ayrı katı var mı?"
        options={[
          ["solid", "Katı kalır"],
          ["none", "Katı yok"],
        ]}
        expected={r.solid > 0 ? "solid" : "none"}
        proof={
          "Eklenen " +
          fmt(r.soluteG) +
          " g; çözünen en çok " +
          fmt(r.capacity) +
          " g."
        }
        state={s}
        change={set}
      />
    </Frame>
  );
}

function Energy() {
  const id = "ayt-tepkimelerde-enerji";
  const [s, set] = useExploration(key(id), {
    ...initial,
    mass: 100,
    c: 4.18,
    delta: -2,
    cup: 20,
    extent: 0.05,
  });
  const r = calorimetry019(
    bound(s.mass, 50, 200),
    bound(s.c, 0.5, 5),
    bound(s.delta, -5, 5),
    bound(s.cup, 0, 100),
    bound(s.extent, 0.05, 0.2),
  );
  const change = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const surroundings = -r.reactionHeat;
  const heatBar = (q: number, x: number, name: string) => (
    <rect
      className={q < 0 ? "c019-mint" : "c019-accent"}
      x={x}
      y={q >= 0 ? 175 - q * 0.02 : 175}
      width={52}
      height={Math.abs(q) * 0.02}
      data-heat={name}
      data-heat-j={q}
    />
  );
  return (
    <Frame
      id={id}
      title="Kabın ısısı, net ısı"
      intro="Sabit dış basınçta yalnız PV işi var. Isı kaçağı ve sıvı kaybı yok. Çözelti ile kap aynı ΔT değerini alır; tepkime dışındaki iki ısı ayrı toplanır."
    >
      <div className="c019-controls">
        <Range
          label="Çözelti (g)"
          value={r.massG}
          min={50}
          max={200}
          step={50}
          onChange={(mass) => change({ mass })}
        />
        <Range
          label="c (J/g·°C)"
          value={r.specificHeat}
          min={0.5}
          max={5}
          step={0.01}
          onChange={(c) => change({ c })}
        />
        <Range
          label="ΔT (°C)"
          value={r.deltaT}
          min={-5}
          max={5}
          onChange={(delta) => change({ delta })}
        />
        <Range
          label="Kap C (J/°C)"
          value={r.calorimeter}
          max={100}
          step={10}
          onChange={(cup) => change({ cup })}
        />
        <Range
          label="İlerleme (mol)"
          value={r.extentMol}
          min={0.05}
          max={0.2}
          step={0.05}
          onChange={(extent) => change({ extent })}
        />
      </div>
      <figure>
        <Drawing
          title="Tepkime ve çevresinin eşit büyüklükte zıt işaretli ısıları."
          height={340}
        >
          <path className="c019-axis" d="M42 45V295 M42 175H285" />
          {[-5000, 0, 5000].map((v) => (
            <g key={v}>
              <path
                className="c019-grid"
                d={"M42 " + (175 - v * 0.02) + "H285"}
              />
              <text x={10} y={183 - v * 0.02}>
                {v / 1000}
              </text>
            </g>
          ))}
          <text x={52} y={30}>
            Isı (kJ)
          </text>
          {heatBar(r.reactionHeat, 85, "reaction")}
          {heatBar(surroundings, 210, "surroundings")}
          <text x={110} y={325} textAnchor="middle">
            Tepkime
          </text>
          <text x={236} y={325} textAnchor="middle">
            Çevre
          </text>
        </Drawing>
        <figcaption>
          Çevre burada çözelti ve kabın toplamıdır. Ölçek kJ, ham veriler J
          biriminde. Yukarı pozitif ısı alımı; aşağı negatif ısı verimi.
        </figcaption>
      </figure>
      <div data-model-result className="c019-result">
        <p>
          Çözelti ısısı: {fmt(r.solutionHeat)} J. Kap ısısı: {fmt(r.cupHeat)} J.
        </p>
        <p>
          Tepkime ısısı: {fmt(r.reactionHeat)} J. Mol başına ΔH:{" "}
          {fmt(r.molarEnthalpy)} kJ/mol.
        </p>
        <p>
          {r.reactionHeat < 0
            ? "Isı veren süreç"
            : r.reactionHeat > 0
              ? "Isı alan süreç"
              : "Net ısı sıfır"}
          . Çözelti ısı alırsa tepkime ısı verir. q = −(m·c + C)·ΔT; mol başına
          değer için verilen ilerlemeye bölünür.
        </p>
      </div>
      <Prediction
        question="Tepkime ısı ile ne yapar?"
        options={[
          ["give", "Isı verir"],
          ["take", "Isı alır"],
          ["zero", "Net ısı yok"],
        ]}
        expected={
          r.reactionHeat < 0 ? "give" : r.reactionHeat > 0 ? "take" : "zero"
        }
        proof={
          "Çözelti ve kap toplamı " +
          fmt(surroundings) +
          " J; tepkime bunun ters işaretlisi."
        }
        state={s}
        change={set}
      />
    </Frame>
  );
}

function Hess() {
  const id = "ayt-entalpi-bag-hess";
  const [s, set] = useExploration(key(id), { ...initial, first: 1, second: 0 });
  const r = hess019(
    Math.round(bound(s.first, -2, 2)),
    Math.round(bound(s.second, -2, 2)),
  );
  const change = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const species = [
    ["C", r.net.C],
    ["O₂", r.net.O2],
    ["CO", r.net.CO],
    ["CO₂", r.net.CO2],
  ] as const;
  return (
    <Frame
      id={id}
      title="İki adımı topla, CO’yu ele"
      intro="Aynı sıcaklık ve hâller: C grafit; O₂, CO, CO₂ gaz. Negatif katsayı denklemi ters çevirir. Sıfır katsayı o denklemi almaz."
    >
      <div className="c019-equation">
        <p>
          1) C + ½ O₂ → CO
          <br />
          ΔH₁ = −110,5 kJ
        </p>
        <p>
          2) CO + ½ O₂ → CO₂
          <br />
          ΔH₂ = −283 kJ
        </p>
      </div>
      <div className="c019-controls">
        <Range
          label="Katsayı 1"
          value={r.first}
          min={-2}
          max={2}
          onChange={(first) => change({ first })}
        />
        <Range
          label="Katsayı 2"
          value={r.second}
          min={-2}
          max={2}
          onChange={(second) => change({ second })}
        />
      </div>
      <figure>
        <Drawing
          title="Toplam denklemde net madde miktarları; soldaki eksi tüketim, sağdaki artı oluşum."
          height={335}
        >
          <text x={100} y={28} textAnchor="middle">
            −
          </text>
          <text x={210} y={28} textAnchor="middle">
            +
          </text>
          <path className="c019-axis" d="M150 40V310" />
          {species.map(([name, n], i) => (
            <g key={name}>
              <text x={8} y={80 + i * 70}>
                {name}
              </text>
              <rect
                className={n < 0 ? "c019-accent" : "c019-mint"}
                x={n < 0 ? 150 + n * 40 : 150}
                y={55 + i * 70}
                width={Math.abs(n) * 40}
                height={35}
                data-net-species={name}
                data-net-mol={n}
              />
              <text x={265} y={80 + i * 70} textAnchor="end">
                {fmt(n)}
              </text>
            </g>
          ))}
        </Drawing>
        <figcaption>
          Çubuk boyu mol sayısı ile orantılı. Sayılar net mol oranıdır; atom
          sayısı korunur. Ters çevrilen adımda ΔH işareti de döner.
        </figcaption>
      </figure>
      <div data-model-result className="c019-result">
        <p>ΔH toplamı: {fmt(r.heat)} kJ.</p>
        <p>
          Net C: {fmt(r.net.C)}; O₂: {fmt(r.net.O2)}; CO: {fmt(r.net.CO)}; CO₂:{" "}
          {fmt(r.net.CO2)} mol.
        </p>
        <p>
          Karbon farkı: {fmt(r.carbonResidual)}; oksijen farkı:{" "}
          {fmt(r.oxygenResidual)} mol atom.
        </p>
        <p>
          {r.target
            ? "Hedef tam: C + O₂ → CO₂."
            : "Seçilen toplam hedefin tamamı değil."}{" "}
          CO’nun tek başına silinmesi yeterli değil; bütün katsayıları ve yönü
          denetle.
        </p>
      </div>
      <Prediction
        question="Bir mol CO₂ için tam hedef mi?"
        options={[
          ["yes", "Tam hedef"],
          ["no", "Farklı"],
        ]}
        expected={r.target ? "yes" : "no"}
        proof={"CO net " + fmt(r.net.CO) + " mol; ΔH = " + fmt(r.heat) + " kJ."}
        state={s}
        change={set}
      />
    </Frame>
  );
}

function Rate() {
  const id = "ayt-tepkime-hizi";
  const [s, set] = useExploration(key(id), { ...initial, a: 0.1, b: 0.1 });
  const r = rate019(bound(s.a, 0, 0.3), bound(s.b, 0, 0.3));
  const change = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const curve = Array.from({ length: 31 }, (_, i) => {
    const a = i / 100;
    return (
      (i ? "L" : "M") +
      (42 + (a / 0.3) * 230) +
      " " +
      (220 - (rate019(a, r.b).rate / 0.06) * 170)
    );
  }).join(" ");
  return (
    <Frame
      id={id}
      title="İlk hız verisini oku"
      intro="Sabit sıcaklıkta deney sonucu r = 2[A]²[B] verilmiştir. Üsler net eşitlikten tahmin edilmez. r birimi mol/(L·s), k birimi L²/(mol²·s)."
    >
      <p>
        Referans: [A] = [B] = 0,10 mol/L için r = 0,002 mol/(L·s). Aynı B ile A
        iki kat olursa hız dört kat olur.
      </p>
      <div className="c019-controls">
        <Range
          label="A (mol/L)"
          value={r.a}
          max={0.3}
          step={0.05}
          onChange={(a) => change({ a })}
        />
        <Range
          label="B (mol/L)"
          value={r.b}
          max={0.3}
          step={0.05}
          onChange={(b) => change({ b })}
        />
      </div>
      <figure>
        <Drawing
          title="B sabitken A derişimine karşı ilk hız eğrisi. Seçili A ve hız bir noktayla işaretlenir."
          height={315}
        >
          <path className="c019-axis" d="M42 35V220H280" />
          {[0, 0.03, 0.06].map((v) => (
            <g key={v}>
              <path
                className="c019-grid"
                d={"M42 " + (220 - (v / 0.06) * 170) + "H275"}
              />
              <text x={2} y={228 - (v / 0.06) * 170}>
                {v * 1000}
              </text>
            </g>
          ))}
          <path d={curve} className="c019-curve" />
          <circle
            cx={42 + (r.a / 0.3) * 230}
            cy={220 - (r.rate / 0.06) * 170}
            r={7}
            className="c019-dot"
            data-rate={r.rate}
          />
          <text x={42} y={252}>
            0
          </text>
          <text x={272} y={252} textAnchor="end">
            0,3
          </text>
          <text x={156} y={290} textAnchor="middle">
            A (mol/L)
          </text>
          <text x={60} y={25}>
            r × 10³
          </text>
        </Drawing>
        <figcaption>
          Düşey sayılar r × 10³: 30 değeri 0,030 mol/(L·s) demek. Eğri yalnız
          seçilen B ve sabit k içindir. B sıfırsa bu verilen yasada hız sıfır
          olur.
        </figcaption>
      </figure>
      <div data-model-result className="c019-result">
        <p>
          İlk hız: {fmt(r.rate, 6)} mol/(L·s). Referansa oran: {fmt(r.relative)}{" "}
          kat.
        </p>
        <p>
          A derecesi 2; B derecesi 1; toplam derece 3. k = 2 sabittir; derişim
          artsa da k aynı kalır.
        </p>
      </div>
      <Prediction
        question="Referans hıza göre?"
        options={[
          ["more", "Daha çok"],
          ["same", "Aynı"],
          ["less", "Daha az"],
        ]}
        expected={
          Math.abs(r.rate - 0.002) < 1e-12
            ? "same"
            : r.rate > 0.002
              ? "more"
              : "less"
        }
        proof={"2·[A]²·[B] = " + fmt(r.rate, 6) + " mol/(L·s)."}
        state={s}
        change={set}
      />
    </Frame>
  );
}

function Ice() {
  const id = "ayt-denge-hesaplari";
  const [s, set] = useExploration(key(id), {
    ...initial,
    dimer: 1,
    monomer: 0,
    volume: 1,
    kc: 1,
  });
  const r = ice019(
    bound(s.dimer, 0.5, 2),
    bound(s.monomer, 0, 2),
    bound(s.volume, 0.5, 2),
    bound(s.kc, 0.5, 2),
  );
  const change = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const values = [r.dimerMol, r.monomerMol, r.dimer, r.monomer];
  return (
    <Frame
      id={id}
      title="İlk, değişim, son"
      intro="İdeal gaz modeli: X₂ ⇌ 2X. Sabit sıcaklık ve kap hacmi; Kc bir ders sabiti olarak verilir. Başlangıç ve denge aynı an değil."
    >
      <div className="c019-controls">
        <Range
          label="İlk X₂ (mol)"
          value={r.dimerMol}
          min={0.5}
          max={2}
          step={0.5}
          onChange={(dimer) => change({ dimer })}
        />
        <Range
          label="İlk X (mol)"
          value={r.monomerMol}
          max={2}
          step={0.5}
          onChange={(monomer) => change({ monomer })}
        />
        <Range
          label="Hacim (L)"
          value={r.volumeL}
          min={0.5}
          max={2}
          step={0.5}
          onChange={(volume) => change({ volume })}
        />
        <Range
          label="Verilen Kc"
          value={r.kc}
          min={0.5}
          max={2}
          step={0.5}
          onChange={(kc) => change({ kc })}
        />
      </div>
      <figure>
        <Drawing
          title="İlk ve son X₂ ve X miktarları. X atomu miktarı korunurken molekül sayısı değişebilir."
          height={315}
        >
          <path className="c019-axis" d="M25 35V220H290" />
          {[0, 3, 6].map((v) => (
            <g key={v}>
              <path
                className="c019-grid"
                d={"M25 " + (220 - v * 28) + "H290"}
              />
              <text x={3} y={228 - v * 28}>
                {v}
              </text>
            </g>
          ))}
          <text x={35} y={28}>
            mol
          </text>
          {values.map((v, i) => (
            <g key={i}>
              <rect
                className={i < 2 ? "c019-muted-bar" : "c019-accent"}
                x={34 + i * 67}
                y={220 - v * 28}
                width={35}
                height={v * 28}
                data-equilibrium-bar={i}
                data-amount-mol={v}
              />
              <text x={51 + i * 67} y={258} textAnchor="middle">
                {i < 2 ? "İlk" : "Son"}
              </text>
              <text x={51 + i * 67} y={290} textAnchor="middle">
                {i % 2 ? "X" : "X₂"}
              </text>
            </g>
          ))}
        </Drawing>
        <figcaption>
          Değişim X₂ için −x, X için +2x. Sütunlar mol miktarı; bir daire bir
          tam molekül demek değil. Denge için miktarları son hacme böl.
        </figcaption>
      </figure>
      <div
        data-model-result
        className="c019-result"
        data-final-dimer={r.dimer}
        data-final-monomer={r.monomer}
      >
        <p>
          İlk Qc: {fmt(r.initialQ)}. Verilen Kc: {fmt(r.kc)}. İlerleme x:{" "}
          {fmt(r.extent)} mol.
        </p>
        <p>
          Son X₂: {fmt(r.dimer)} mol. Son X: {fmt(r.monomer)} mol.
        </p>
        <p>
          [X₂]: {fmt(r.dimerM)} M; [X]: {fmt(r.monomerM)} M. Son Qc:{" "}
          {fmt(r.quotient)}.
        </p>
        <p>
          İlk X atomu: {fmt(r.initialAtomMol)} mol atom. Son X atomu:{" "}
          {fmt(r.atomMol)} mol atom.
        </p>
      </div>
      <Prediction
        question="İlk durumdan net yön?"
        options={[
          ["forward", "İleri"],
          ["back", "Geri"],
          ["same", "Dengede"],
        ]}
        expected={
          Math.abs(r.extent) < 1e-12
            ? "same"
            : r.extent > 0
              ? "forward"
              : "back"
        }
        proof={
          "Qc ile Kc kıyası son x = " +
          fmt(r.extent) +
          " mol verir; atom miktarı korunur."
        }
        state={s}
        change={set}
      />
    </Frame>
  );
}

function Concentration() {
  const id = "ayt-denge-derisim";
  const [s, set] = useExploration(key(id), {
    ...initial,
    addX: 0,
    addXY: 0,
    volume: 1,
  });
  const r = concentration019(
    bound(s.addX, 0, 1),
    bound(s.addXY, 0, 1),
    bound(s.volume, 0.5, 2),
  );
  const change = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const names = ["X", "Y", "XY"];
  return (
    <Frame
      id={id}
      title="Ani etki, sonra yeni denge"
      intro="X + Y ⇌ XY; ilk denge 1 L kapta her birinden 1 mol, Kc = 1. Sıcaklık sabit. Önce madde ekle veya hacmi değiştir; sonra aynı Kc ile yeni dengeyi bul."
    >
      <div className="c019-controls">
        <Range
          label="Ek X (mol)"
          value={r.addX}
          max={1}
          step={0.5}
          onChange={(addX) => change({ addX })}
        />
        <Range
          label="Ek XY (mol)"
          value={r.addXY}
          max={1}
          step={0.5}
          onChange={(addXY) => change({ addXY })}
        />
        <Range
          label="Hacim oranı"
          value={r.volume}
          min={0.5}
          max={2}
          step={0.5}
          onChange={(volume) => change({ volume })}
        />
      </div>
      <figure>
        <Drawing
          title="Önce, ani değişim sonrası ve yeni dengede X, Y ve XY derişimleri. Basamaklar süre ölçeği değildir."
          height={330}
        >
          <path className="c019-axis" d="M35 28V250H280" />
          {[0, 2, 4].map((v) => (
            <g key={v}>
              <path
                className="c019-grid"
                d={"M35 " + (250 - v * 52) + "H280"}
              />
              <text x={8} y={258 - v * 52}>
                {v}
              </text>
            </g>
          ))}
          <text x={45} y={24}>
            M
          </text>
          {names.map((name, i) => (
            <g key={name}>
              <path
                className={"c019-series c019-series-" + i}
                d={
                  "M50 198L150 " +
                  (250 - r.instant[i] * 52) +
                  "L250 " +
                  (250 - r.final[i] * 52)
                }
                data-series={name}
                data-instant={r.instant[i]}
                data-final={r.final[i]}
              />
              <circle
                className={"c019-series-point c019-series-" + i}
                cx={250}
                cy={250 - r.final[i] * 52}
                r={5 + i * 2}
              />
            </g>
          ))}
          <text x={50} y={288} textAnchor="middle">
            Önce
          </text>
          <text x={150} y={288} textAnchor="middle">
            Anlık
          </text>
          <text x={250} y={288} textAnchor="middle">
            Son
          </text>
        </Drawing>
        <figcaption>
          X düz, Y kesik, XY noktalı çizgi. İlk noktada üçü de 1 M; izler
          örtüşebilir. Bu şema aşama sırası, zaman veya gerçek hız grafiği
          değil.
        </figcaption>
      </figure>
      <div data-model-result className="c019-result">
        <p>
          Anlık X: {fmt(r.instant[0])} M; Y: {fmt(r.instant[1])} M; XY:{" "}
          {fmt(r.instant[2])} M.
        </p>
        <p>
          İlk Qc: {fmt(r.initialQ)}. Net yön: {r.direction}.
        </p>
        <p>
          Son X: {fmt(r.final[0])} M; Y: {fmt(r.final[1])} M; XY:{" "}
          {fmt(r.final[2])} M.
        </p>
        <p>
          Son Qc: {fmt(r.quotient)}; Kc hep 1. Toplam X birimi:{" "}
          {fmt(r.xInventory)} mol; toplam Y birimi: {fmt(r.yInventory)} mol.
        </p>
        <p>
          Hacim bir anda yarıya inerse bütün gazların derişimi bir anda iki kat
          olur. Sonra net tepkime bu ilk ani etkiden ayrı ilerler.
        </p>
      </div>
      <Prediction
        question="Anlık Qc’ye göre net yön?"
        options={[
          ["forward", "Ürünlere"],
          ["back", "Girenlere"],
          ["same", "Dengede"],
        ]}
        expected={
          r.direction === "Ürünlere"
            ? "forward"
            : r.direction === "Girenlere"
              ? "back"
              : "same"
        }
        proof={
          "Qc = " +
          fmt(r.initialQ) +
          "; Kc = 1. Son oran " +
          fmt(r.quotient) +
          "."
        }
        state={s}
        change={set}
      />
    </Frame>
  );
}

function Temperature() {
  const id = "ayt-denge-sicaklik-kesir";
  const [s, set] = useExploration(key(id), {
    ...initial,
    temperature: 325,
    kind: "endo",
  });
  const temperature = [300, 325, 350].includes(s.temperature)
    ? s.temperature
    : 325;
  const kind = s.kind === "exo" ? "exo" : "endo";
  const r = temperatureEquilibrium019(temperature, kind);
  const change = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const values = kind === "endo" ? [1, 2, 4] : [4, 2, 1];
  return (
    <Frame
      id={id}
      title="Isı yönü ve denge sabiti"
      intro="İdeal X ⇌ Y gazları, Δn = 0. İlk denge 325 K: X = 1, Y = 2 mol. Sıcaklık aniden değişince miktarlar henüz değişmez: Qc = 2. Sonra verilen Kc tablosuna uyulur."
    >
      <Choices
        label="İleri yön"
        value={kind}
        options={[
          ["endo", "Isı alır"],
          ["exo", "Isı verir"],
        ]}
        onChange={(kind) => change({ kind })}
      />
      <Choices
        label="Son sıcaklık"
        value={String(r.temperature)}
        options={[
          ["300", "300 K"],
          ["325", "325 K"],
          ["350", "350 K"],
        ]}
        onChange={(t) => change({ temperature: Number(t) })}
      />
      <p>
        Verilen Kc: 300 K’de {values[0]}; 325 K’de {values[1]}; 350 K’de{" "}
        {values[2]}. Bunlar kurgusal ders sayıları, bir gerçek gazın ölçüm
        verisi değil.
      </p>
      <figure>
        <Drawing
          title="Verilen sıcaklık-denge sabiti noktaları ve yeni dengedeki üç molün X/Y payları."
          height={355}
        >
          <path className="c019-axis" d="M40 20V175H280" />
          {[0, 2, 4].map((v) => (
            <g key={v}>
              <path
                className="c019-grid"
                d={"M40 " + (175 - v * 35) + "H280"}
              />
              <text x={8} y={183 - v * 35}>
                {v}
              </text>
            </g>
          ))}
          <text x={150} y={25} textAnchor="middle">
            Kc
          </text>
          <path
            className="c019-curve"
            d={values
              .map(
                (v, i) =>
                  (i ? "L" : "M") + (50 + i * 105) + " " + (175 - v * 35),
              )
              .join(" ")}
          />
          <circle
            className="c019-dot"
            cx={50 + ((r.temperature - 300) / 25) * 105}
            cy={175 - r.kc * 35}
            r={7}
            data-equilibrium-k={r.kc}
          />
          {[300, 325, 350].map((t, i) => (
            <text key={t} x={50 + i * 105} y={210} textAnchor="middle">
              {t}
            </text>
          ))}
          <text x={150} y={242} textAnchor="middle">
            T (K)
          </text>
          <rect
            className="c019-accent"
            x={30}
            y={278}
            width={r.a * 80}
            height={35}
            data-x-mol={r.a}
          />
          <rect
            className="c019-mint"
            x={30 + r.a * 80}
            y={278}
            width={r.b * 80}
            height={35}
            data-y-mol={r.b}
          />
          <text x={30 + r.a * 40} y={342} textAnchor="middle">
            X
          </text>
          <text x={30 + r.a * 80 + r.b * 40} y={342} textAnchor="middle">
            Y
          </text>
        </Drawing>
        <figcaption>
          Alt çubuk toplam 3 mol. Sıcaklık Kc’yi değiştirir. Bu ideal örnekte Δn
          = 0; yalnız hacim değişirse Y/X oranı aynı kalır.
        </figcaption>
      </figure>
      <div data-model-result className="c019-result">
        <p>
          Son sıcaklık: {r.temperature} K. Kc: {fmt(r.kc)}. Anlık Qc: 2. Net
          yön: {r.direction}.
        </p>
        <p>
          Yeni denge X: {fmt(r.a)} mol; Y: {fmt(r.b)} mol. Son oran Y/X:{" "}
          {fmt(r.quotient)}.
        </p>
        <p>
          Y payı: %{fmt((r.b / 3) * 100, 2)}. Toplam {fmt(r.a + r.b)} mol; X ve
          Y’ye ait denklem korunur.
        </p>
      </div>
      <Prediction
        question="Yeni Kc’ye göre net yön?"
        options={[
          ["forward", "Ürünlere"],
          ["back", "Girenlere"],
          ["same", "Dengede"],
        ]}
        expected={
          r.direction === "Ürünlere"
            ? "forward"
            : r.direction === "Girenlere"
              ? "back"
              : "same"
        }
        proof={
          "Anlık Qc = 2; yeni Kc = " + fmt(r.kc) + ". Son Y/X bu değere varır."
        }
        state={s}
        change={set}
      />
    </Frame>
  );
}

export default function Forge019ChemistryLab({
  lessonId,
}: {
  lessonId: string;
}) {
  switch (lessonId) {
    case "ayt-molalite-koligatif":
      return <Colligative />;
    case "ayt-cozunurluk":
      return <Solubility />;
    case "ayt-tepkimelerde-enerji":
      return <Energy />;
    case "ayt-entalpi-bag-hess":
      return <Hess />;
    case "ayt-tepkime-hizi":
      return <Rate />;
    case "ayt-denge-hesaplari":
      return <Ice />;
    case "ayt-denge-derisim":
      return <Concentration />;
    case "ayt-denge-sicaklik-kesir":
      return <Temperature />;
    default:
      return null;
  }
}
