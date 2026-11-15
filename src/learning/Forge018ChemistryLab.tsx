import { useId, type ReactNode } from "react";
import {
  kinetic018,
  wetGas018,
  realGas018,
  phase018,
  phaseStates018,
  solvation018,
  molarity018,
  ionMixture018,
} from "./forge018Chemistry";
import { useExploration } from "./useExploration";
import "./forge018Chemistry.css";
const fmt = (n: number, digits = 3) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(n);
const safe = (value: number, min: number, max: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;
const key = (id: string) => `forge018:chemistry:${id}`;
function Range({
  label,
  value,
  min,
  max,
  step = 1,
  change,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  change: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="c018-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt(value, 5)}</output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={safe(value, min, max)}
        onChange={(e) => change(Number(e.target.value))}
      />
    </div>
  );
}
function Choice({
  label,
  value,
  choices,
  change,
}: {
  label: string;
  value: string;
  choices: readonly (readonly [string, string])[];
  change: (value: string) => void;
}) {
  const id = useId();
  return (
    <fieldset className="c018-choice">
      <legend id={id}>{label}</legend>
      <div role="group" aria-labelledby={id}>
        {choices.map(([id, name]) => (
          <button
            type="button"
            key={id}
            aria-pressed={value === id}
            onClick={() => change(id)}
          >
            {name}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
function Drawing({
  title,
  height,
  children,
  kind,
}: {
  title: string;
  height: number;
  children: ReactNode;
  kind?: string;
}) {
  const id = useId();
  return (
    <svg
      className="c018-svg"
      data-diagram={kind}
      viewBox={`0 0 300 ${height}`}
      role="img"
      aria-labelledby={id}
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
    <section className="forge018-chemistry" data-forge018={id}>
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="c018-note">
        Keşif seçimi ve tahmin puan vermez. Bağımsız sorular ayrı kaydedilir.
      </p>
    </section>
  );
}
type PredictionState = { prediction: string; reason: string; checked: boolean };
function Prediction({
  state,
  change,
  choices,
  expected,
  proof,
}: {
  state: PredictionState;
  change: (patch: Partial<PredictionState>) => void;
  choices: readonly (readonly [string, string])[];
  expected: string;
  proof: string;
}) {
  const id = useId(),
    valid = choices.some(([value]) => value === state.prediction);
  return (
    <div className="c018-prediction">
      <Choice
        label="Sonuç tahminin"
        value={valid ? state.prediction : ""}
        choices={choices}
        change={(prediction) => change({ prediction, checked: false })}
      />
      <label htmlFor={id}>Gerekçen (en çok 120 karakter)</label>
      <textarea
        id={id}
        rows={3}
        maxLength={120}
        value={state.reason.slice(0, 120)}
        onChange={(e) =>
          change({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        type="button"
        disabled={!valid || !state.reason.trim()}
        onClick={() => change({ checked: true })}
      >
        Tahminimi karşılaştır
      </button>
      {state.checked && valid && state.reason.trim() && (
        <p className="c018-feedback" role="status">
          {state.prediction === expected
            ? "Seçimin modelle uyumlu."
            : "Koşulu ve sonucu yeniden karşılaştır."}{" "}
          {proof}
        </p>
      )}
    </div>
  );
}
function KineticLab() {
  const id = "ayt-kinetik-yogunluk",
    [state, set] = useExploration(key(id), {
      temperature: 300,
      mass: 32,
      pressure: 1,
      prediction: "",
      reason: "",
      checked: false,
    });
  const t = safe(state.temperature, 100, 800),
    mass = safe(state.mass, 2, 100),
    pressure = safe(state.pressure, 0.1, 5),
    m = kinetic018(t, mass, pressure),
    reference = kinetic018(t, 32, pressure);
  const answer = mass < 32 ? "fast" : mass > 32 ? "slow" : "same";
  const update = (values: Partial<typeof state>) =>
    set({ ...values, checked: false });
  const width = (v: number) => (v / 3500) * 220;
  return (
    <Frame
      id={id}
      title="Hız ve yoğunluk"
      intro="İdeal gaz modeli. R hız için 8,314 J/(mol·K), yoğunluk için 0,082 L·atm/(mol·K). Aynı T’de referans gazın mol kütlesi 32 g/mol."
    >
      <div className="c018-controls">
        <Range
          label="T (K)"
          value={t}
          min={100}
          max={800}
          step={50}
          change={(temperature) => update({ temperature })}
        />
        <Range
          label="Mol kütlesi (g/mol)"
          value={mass}
          min={2}
          max={100}
          step={2}
          change={(mass) => update({ mass })}
        />
        <Range
          label="Basınç (atm)"
          value={pressure}
          min={0.1}
          max={5}
          step={0.1}
          change={(pressure) => update({ pressure })}
        />
      </div>
      <figure>
        <Drawing
          title="Seçilen gaz ve aynı sıcaklıktaki 32 g/mol referansın karesel ortalama hızları"
          height={375}
        >
          <text x={25} y={35}>
            Seçilen gaz
          </text>
          <text x={275} y={65} textAnchor="end">
            {fmt(m.rms, 1)} m/s
          </text>
          <path
            className="c018-line"
            d={`M40 105 H${40 + width(m.rms)}`}
            data-rms={m.rms}
          />
          <path
            className="c018-arrow"
            d={`M${32 + width(m.rms)} 99 L${40 + width(m.rms)} 105 L${32 + width(m.rms)} 111`}
          />
          <text x={25} y={160}>
            32 g/mol
          </text>
          <text x={275} y={190} textAnchor="end">
            {fmt(reference.rms, 1)} m/s
          </text>
          <path
            className="c018-reference"
            d={`M40 230 H${40 + width(reference.rms)}`}
          />
          <path
            className="c018-line"
            d="M40 280 H260 M40 274 V286 M260 274 V286"
          />
          <text x={40} y={312}>
            0
          </text>
          <text x={260} y={312} textAnchor="end">
            3500
          </text>
          <text x={150} y={342} textAnchor="middle">
            v_rms (m/s)
          </text>
        </Drawing>
        <figcaption>
          Ok boyu gerçek v_rms hesabına bağlı; toplu akış yönü değil, sürat
          ölçeği. Bu şema tek bir gaz taneciği için anlık hız veya enerji
          dağılımı vermez.
        </figcaption>
      </figure>
      <div className="c018-result" data-model-result>
        <p>
          v_rms: <strong>{fmt(m.rms, 1)} m/s</strong>. Referans:{" "}
          {fmt(reference.rms, 1)} m/s.
        </p>
        <p>
          Yoğunluk:{" "}
          <strong data-density={m.density}>{fmt(m.density)} g/L</strong>.
        </p>
        <p>
          Bir molün öteleme enerjisi: {fmt(m.translationPerMol)} J. Aynı T’de
          referansla aynı; tüm iç enerji değil.
        </p>
      </div>
      <Prediction
        state={state}
        change={set}
        choices={[
          ["fast", "Referansa göre hızlı"],
          ["same", "Aynı hız"],
          ["slow", "Referansa göre yavaş"],
        ]}
        expected={answer}
        proof={`Seçilen M ${fmt(mass)} g/mol; referans 32 g/mol. Aynı T’de hız √(1/M) ile değişir.`}
      />
    </Frame>
  );
}
function WetLab() {
  const id = "ayt-kismi-basinci-suustu",
    [state, set] = useExploration(key(id), {
      volume: 2,
      dry: 0.1,
      water: 0.01,
      prediction: "",
      reason: "",
      checked: false,
    });
  const volume = safe(state.volume, 1, 4),
    dry = safe(state.dry, 0, 0.2),
    water = safe(state.water, 0, 0.02),
    m = wetGas018(volume, dry, water);
  const update = (values: Partial<typeof state>) =>
    set({ ...values, checked: false });
  const names = {
    liquid: "Sıvı ve doygun buhar",
    saturated: "Yalnız doygun buhar",
    unsaturated: "Su buharı P_sat altında",
  };
  const values = [
    ["X", m.dryPressure],
    ["Su", m.waterPressure],
    ["Toplam", m.totalPressure],
  ] as const;
  return (
    <Frame
      id={id}
      title="Su üstünde gaz"
      intro="300 K’de verilen yaklaşık su P_sat değeri 0,035 atm; R=0,082 L·atm/(mol·K). Gaz hacmi ayarlanıyor; X suda çözünmüyor ve tepkime vermiyor. Dengeye yeter süre var."
    >
      <div className="c018-controls">
        <Range
          label="Gaz hacmi (L)"
          value={volume}
          min={1}
          max={4}
          step={0.5}
          change={(volume) => update({ volume })}
        />
        <Range
          label="Kuru gaz (mol)"
          value={dry}
          min={0}
          max={0.2}
          step={0.01}
          change={(dry) => update({ dry })}
        />
        <Range
          label="Toplam su (mol)"
          value={water}
          min={0}
          max={0.02}
          step={0.001}
          change={(water) => update({ water })}
        />
      </div>
      <figure>
        <Drawing
          title="Kuru gaz, su buharı ve toplam basıncın ortak atmosfer ölçeğinde karşılaştırılması"
          height={410}
        >
          {values.map(([name, value], i) => (
            <g key={name}>
              <text x={66 + i * 82} y={35} textAnchor="middle">
                {name}
              </text>
              <path
                className="c018-line"
                d={`M${39 + i * 82} 70 V300 H${93 + i * 82}`}
              />
              <rect
                className={i === 1 ? "c018-mint" : "c018-coral"}
                x={41 + i * 82}
                y={300 - (value / 5) * 220}
                width={50}
                height={(value / 5) * 220}
                data-pressure={name}
                data-pressure-value={value}
              />
              <text x={66 + i * 82} y={336} textAnchor="middle">
                {fmt(value)}
              </text>
            </g>
          ))}
          <text x={150} y={378} textAnchor="middle">
            0–5 atm · ortak ölçek
          </text>
        </Drawing>
        <figcaption>
          Sütunlar basıncı gösterir; suyun çizilen yüksekliği sıvı hacmi
          değildir. Su basıncı, stok yetmezse P_sat değerinin altında kalır.
        </figcaption>
      </figure>
      <div className="c018-result" data-model-result>
        <p>
          Toplam basınç: <strong>{fmt(m.totalPressure, 5)} atm</strong>.
        </p>
        <p>
          X: {fmt(m.dryPressure, 5)} atm. Su: {fmt(m.waterPressure, 5)} atm.
        </p>
        <p data-water-regime={m.regime}>
          {water === 0 ? "Bu kapta su yok" : names[m.regime]}.
        </p>
        <p>
          Buhar suyu:{" "}
          <span data-water-vapour={m.vapour}>{fmt(m.vapour, 5)} mol</span>.
          Sıvı: <span data-water-liquid={m.liquid}>{fmt(m.liquid, 5)} mol</span>
          .
        </p>
        <p>
          Tam doygunluk eşiği: {fmt(m.requiredWater, 6)} mol. Sıvı sıfır iken de
          tam sınırda doygun buhar olabilir.
        </p>
        {dry === 0 && water === 0 && <p>Bu örnekte gaz ve su stoku yok.</p>}
      </div>
      <Prediction
        state={state}
        change={set}
        choices={[
          ["liquid", "Sıvı da kalır"],
          ["saturated", "Tam sınır, sıvı yok"],
          ["unsaturated", "Su P_sat altında"],
        ]}
        expected={m.regime}
        proof={`Su basıncı ${fmt(m.waterPressure, 5)} atm; buhar ve sıvı toplamı ${fmt(m.totalWater, 5)} mol. Denge ile envanter birlikte denetlenir.`}
      />
    </Frame>
  );
}
function RealLab() {
  const id = "ayt-gercek-gaz-faz",
    [state, set] = useExploration(key(id), {
      mode: "z",
      pressure: 1,
      phase: "solid",
      prediction: "",
      reason: "",
      checked: false,
    });
  const mode = state.mode === "phase" ? "phase" : "z",
    m = realGas018(safe(state.pressure, 0.8, 1.6)),
    chosen = phaseStates018.some((x) => x.id === state.phase)
      ? state.phase
      : "solid",
    phase = phase018(chosen);
  const update = (values: Partial<typeof state>) =>
    set({ ...values, checked: false, prediction: "" });
  const px = (t: number) => 70 + ((t + 100) / 180) * 210,
    py = (p: number) => 300 - ((Math.log10(p) + 1) / 3) * 230;
  const expectedZ =
    Math.abs(m.z - 1) <= 32 * Number.EPSILON
      ? "equal"
      : m.z < 1
        ? "under"
        : "over";
  const shownPhaseProof = phase.proof.replace(
    "sıvı bölgesindedir.",
    "sıvı alandadır.",
  );
  const expectedPhase =
    chosen === "super"
      ? "super"
      : chosen === "liquid"
        ? "liquid"
        : chosen === "solid"
          ? "solid"
          : chosen === "coexist"
            ? "two"
            : "gas";
  return (
    <Frame
      id={id}
      title="Gaz ve faz yolu"
      intro="İki ayrı örnek var: Z için verilmiş varsayımsal tek faz verisi; faz için CO₂ durumları. Bunlar aynı deneyin keyfî değişen basınçları değildir."
    >
      <Choice
        label="Görünüm"
        value={mode}
        choices={[
          ["z", "Z hesabı"],
          ["phase", "Faz yolu"],
        ]}
        change={(mode) => update({ mode })}
      />
      {mode === "z" ? (
        <>
          <p>
            Verilen temel: n=1 mol, V=20 L, T=300 K, R=0,082. Farklı varsayımsal
            örneğin P verisini seç.
          </p>
          <Range
            label="Verilen P (atm)"
            value={m.measuredPressure}
            min={0.8}
            max={1.6}
            step={0.01}
            change={(pressure) => update({ pressure })}
          />
          <figure>
            <Drawing
              title="Verilmiş basınç ile aynı n,V,T ideal basıncının karşılaştırılması"
              height={340}
            >
              <text x={25} y={38}>
                İdeal
              </text>
              <rect
                className="c018-mint"
                x={30}
                y={65}
                width={(m.idealPressure / 1.6) * 235}
                height={34}
              />
              <text x={270} y={130} textAnchor="end">
                {fmt(m.idealPressure)} atm
              </text>
              <text x={25} y={177}>
                Verilen
              </text>
              <rect
                className="c018-coral"
                x={30}
                y={205}
                width={(m.measuredPressure / 1.6) * 235}
                height={34}
                data-real-pressure={m.measuredPressure}
              />
              <text x={270} y={270} textAnchor="end">
                {fmt(m.measuredPressure)} atm
              </text>
              <text x={150} y={320} textAnchor="middle">
                0–1,6 atm · ortak ölçek
              </text>
            </Drawing>
            <figcaption>
              Özgün hesap verisi; belirli bir gazın ölçülmüş gerçek durum
              denklemi değildir.
            </figcaption>
          </figure>
        </>
      ) : (
        <>
          <Choice
            label="CO₂ durumu"
            value={chosen}
            choices={phaseStates018.map((x) => [x.id, x.label] as const)}
            change={(phase) => update({ phase })}
          />
          <figure>
            <Drawing
              title="CO₂ için verilen durum noktasının temsili faz eğrileri üzerindeki T ve P konumu"
              height={420}
            >
              <path className="c018-line" d="M70 55 V300 H285" />
              {[0.1, 1, 10, 100].map((p) => (
                <g key={p}>
                  <path className="c018-line" d={`M65 ${py(p)} H70`} />
                  <text x={60} y={py(p) + 7} textAnchor="end">
                    {fmt(p)}
                  </text>
                </g>
              ))}
              {[-100, 0, 80].map((t) => (
                <g key={t}>
                  <path className="c018-line" d={`M${px(t)} 300 V306`} />
                  <text
                    x={px(t)}
                    y={335}
                    textAnchor={
                      t === -100 ? "start" : t === 80 ? "end" : "middle"
                    }
                  >
                    {t}
                  </text>
                </g>
              ))}
              <text x={70} y={25}>
                P (atm) · log
              </text>
              <text x={155} y={375} textAnchor="middle">
                T (°C)
              </text>
              <path
                className="c018-reference"
                d={`M${px(-95)} ${py(0.15)} L${px(-78.5)} ${py(1)} L${px(-56.4)} ${py(5.11)} L${px(20)} ${py(57)} L${px(31.2)} ${py(73)}`}
              />
              <path
                className="c018-reference"
                d={`M${px(-56.4)} ${py(5.11)} L${px(-52)} ${py(100)}`}
              />
              <circle
                className="c018-marker"
                cx={px(phase.temperature)}
                cy={py(phase.pressure)}
                r={6}
                data-phase={phase.phase}
                data-phase-temperature={phase.temperature}
                data-phase-pressure={phase.pressure}
              />
              <circle className="c018-point" cx={px(31.2)} cy={py(73)} r={3} />
              <text x={190} y={64} textAnchor="middle">
                K
              </text>
              <path
                className="c018-line"
                d={`M199 67 L${px(31.2) - 4} ${py(73) - 3}`}
              />
              <circle
                className="c018-point"
                cx={px(-56.4)}
                cy={py(5.11)}
                r={3}
              />
              <text x={112} y={208}>
                Ü
              </text>
            </Drawing>
            <figcaption>
              K kritik, Ü üçlü nokta. Dikey P ekseni log ölçeklidir. Çizgiler
              temsildir; aradaki her pikselden kesin faz hesabı yapılmaz. Dolu
              işaret seçilen durumdur.
            </figcaption>
          </figure>
        </>
      )}
      <div className="c018-result" data-model-result>
        {mode === "z" ? (
          <>
            <p>
              Z: <strong data-real-z={m.z}>{fmt(m.z, 5)}</strong>. İdeal P:{" "}
              {fmt(m.idealPressure)} atm.
            </p>
            <p>
              Verilen P: {fmt(m.measuredPressure)} atm. Fark:{" "}
              {fmt(m.difference)} atm.
            </p>
            <p>
              Z=PV/(nRT) boyutsuzdur. Tek nokta bütün koşullardaki idealliği
              kanıtlamaz.
            </p>
          </>
        ) : (
          <>
            <p>
              Seçilen durum: <strong>{phase.phase}</strong>.
            </p>
            <p>
              {phase.label}. {shownPhaseProof}
            </p>
            <p>
              Tc yaklaşık 31,2 °C; Pc yaklaşık 73 atm. Üçlü nokta yaklaşık −56,4
              °C ve 5,11 atm.
            </p>
          </>
        )}
      </div>
      <Prediction
        state={state}
        change={set}
        choices={
          mode === "z"
            ? [
                ["under", "Z, 1 altında"],
                ["equal", "Z, 1 ile aynı"],
                ["over", "Z, 1 üstünde"],
              ]
            : [
                ["solid", "Katı"],
                ["two", "Katı ve buhar"],
                ["liquid", "Sıvı"],
                ["gas", "Gaz veya buhar"],
                ["super", "Kritiküstü akışkan"],
              ]
        }
        expected={mode === "z" ? expectedZ : expectedPhase}
        proof={
          mode === "z"
            ? `Verilen basınç ideal ${fmt(m.idealPressure)} atm ile kıyaslanır; Z=${fmt(m.z, 5)}.`
            : phase.proof
        }
      />
    </Frame>
  );
}
function SolvationLab() {
  const id = "ayt-cozucu-cozunen",
    [state, set] = useExploration(key(id), {
      solvent: 12,
      solute: 28,
      hydration: -46,
      ion: "na",
      prediction: "",
      reason: "",
      checked: false,
    });
  const m = solvation018(
    safe(state.solvent, 10, 40),
    safe(state.solute, 10, 40),
    safe(state.hydration, -80, -20),
    state.ion === "cl" ? "cl" : "na",
  );
  const update = (values: Partial<typeof state>) =>
    set({ ...values, checked: false });
  const ys = (energy: number) => 275 - ((energy + 60) / 140) * 220;
  const xs = [32, 108, 184, 268];
  return (
    <Frame
      id={id}
      title="Su çevresi ve enerji"
      intro="Enerji katkıları aynı mol temeli için verilmiş temsili veridir; ölçülmüş bir tuz tablosu değil. Su çevresi iyon–dipol yönünü gösterir; çizilen su sayısı kesin kabuk sayısı değildir."
    >
      <Choice
        label="Ortadaki iyon"
        value={m.ion}
        choices={[
          ["na", "Na⁺"],
          ["cl", "Cl⁻"],
        ]}
        change={(ion) => update({ ion })}
      />
      <figure>
        <Drawing
          title="Su moleküllerinin seçilen iyon çevresindeki koşullu yönelimi"
          height={300}
        >
          <circle className="c018-cell" cx={150} cy={150} r={26} />
          <text x={150} y={158} textAnchor="middle">
            {m.ion === "na" ? "Na⁺" : "Cl⁻"}
          </text>
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((a, i) => {
            const radial = (r: number, side = 0) => ({
              x: 150 + r * Math.cos(a) - side * Math.sin(a),
              y: 150 + r * Math.sin(a) + side * Math.cos(a),
            });
            const o = radial(m.ion === "na" ? 70 : 95),
              h1 = radial(m.ion === "na" ? 95 : 70, 10),
              h2 = radial(m.ion === "na" ? 95 : 70, -10);
            return (
              <g key={i} data-water-facing={m.facing}>
                <path
                  className="c018-line"
                  d={`M${h1.x} ${h1.y} L${o.x} ${o.y} L${h2.x} ${h2.y}`}
                />
                <circle className="c018-oxygen" cx={o.x} cy={o.y} r={8} />
                <circle className="c018-hydrogen" cx={h1.x} cy={h1.y} r={5} />
                <circle className="c018-hydrogen" cx={h2.x} cy={h2.y} r={5} />
              </g>
            );
          })}
        </Drawing>
        <figcaption>
          Büyük daire Oδ⁻, iki küçük daire Hδ⁺. İyona bakan uç:{" "}
          <strong data-ion-facing={m.facing}>{m.facing}</strong>. Su molekülü
          tek bir O²⁻ iyonu değildir.
        </figcaption>
      </figure>
      <div className="c018-controls">
        <Range
          label="Su ayırma (kJ/mol)"
          value={m.solvent}
          min={10}
          max={40}
          step={2}
          change={(solvent) => update({ solvent })}
        />
        <Range
          label="Katı ayırma (kJ/mol)"
          value={m.solute}
          min={10}
          max={40}
          step={2}
          change={(solute) => update({ solute })}
        />
        <Range
          label="Yeni bağlar (kJ/mol)"
          value={m.hydration}
          min={-80}
          max={-20}
          step={2}
          change={(hydration) => update({ hydration })}
        />
      </div>
      <figure>
        <Drawing
          title="Üç verilmiş enerji katkısından hesaplanan dört aşamalı entalpi yolu"
          height={420}
          kind="energy"
        >
          <path className="c018-reference" d={`M20 ${ys(0)} H280`} />
          <path
            className="c018-line"
            d={m.levels
              .map((e, i) => `${i ? "L" : "M"}${xs[i]} ${ys(e)}`)
              .join(" ")}
          />
          {m.levels.map((energy, i) => (
            <g key={i}>
              <circle
                className="c018-marker"
                cx={xs[i]}
                cy={ys(energy)}
                r={5}
                data-energy-stage={i}
                data-energy-value={energy}
              />
              <text x={xs[i]} y={325} textAnchor="middle">
                {fmt(energy)}
              </text>
            </g>
          ))}
          <text x={150} y={370} textAnchor="middle">
            Enerji · kJ/mol
          </text>
          <text x={150} y={405} textAnchor="middle">
            Baş → 1 → 2 → Son
          </text>
        </Drawing>
        <figcaption>
          İki ayırma katkısı pozitif, yeni etkileşim katkısı negatif. Kesik
          çizgi başlangıç enerjisidir; çizginin boyu süre veya tepkime yolu
          uzunluğu değildir.
        </figcaption>
      </figure>
      <div className="c018-result" data-model-result>
        <p>
          ΔH:{" "}
          <strong data-solvation-enthalpy={m.enthalpy}>
            {fmt(m.enthalpy)} kJ/mol
          </strong>
          . {m.process}.
        </p>
        <p>
          {fmt(m.solvent)} + {fmt(m.solute)} + ({fmt(m.hydration)}) ={" "}
          {fmt(m.enthalpy)} kJ/mol.
        </p>
        <p>
          İyona bakan uç {m.facing}. Kaç gram madde çözünür sorusu bu toplamdan
          tek başına yanıt bulmaz; denge ve diğer koşullar da gerekir.
        </p>
      </div>
      <Prediction
        state={state}
        change={set}
        choices={[
          ["exo", "Ekzotermik"],
          ["zero", "Toplam sıfır"],
          ["endo", "Endotermik"],
        ]}
        expected={m.enthalpy < 0 ? "exo" : m.enthalpy > 0 ? "endo" : "zero"}
        proof={`Toplam ${fmt(m.enthalpy)} kJ/mol; son enerji başlangıca göre bu işaretle değişir. Çözünürlük miktarı ayrı veridir.`}
      />
    </Frame>
  );
}
function MolarityLab() {
  const id = "ayt-molarite",
    [state, set] = useExploration(key(id), {
      stock: 0.4,
      stockMl: 250,
      finalMl: 250,
      prediction: "",
      reason: "",
      checked: false,
    });
  const stock = safe(state.stock, 0, 1),
    stockMl = safe(state.stockMl, 50, 250),
    finalMl = safe(state.finalMl, 250, 1000),
    m = molarity018(stock, stockMl, finalMl);
  const update = (values: Partial<typeof state>) =>
    set({ ...values, checked: false });
  const y = (v: number) => 320 - (v / 1000) * 240;
  const answer =
    stock === 0
      ? "none"
      : Math.abs(m.molarity - stock) < 32 * Number.EPSILON
        ? "same"
        : "lower";
  return (
    <Frame
      id={id}
      title="Son hacim ve mol"
      intro="Tam çözünmüş NaCl stoku. Uçuculuk, kayıp, tepkime ve çökelme yok; son çözelti hacmi ölçülmüş. Çizimde çok çizgili bir ölçü kabı var."
    >
      <div className="c018-controls">
        <Range
          label="Stok M (mol/L)"
          value={stock}
          min={0}
          max={1}
          step={0.1}
          change={(stock) => update({ stock })}
        />
        <Range
          label="Örnek hacmi (mL)"
          value={stockMl}
          min={50}
          max={250}
          step={50}
          change={(stockMl) => update({ stockMl })}
        />
        <Range
          label="Son hacim (mL)"
          value={finalMl}
          min={250}
          max={1000}
          step={50}
          change={(finalMl) => update({ finalMl })}
        />
      </div>
      <figure>
        <Drawing
          title="Ölçülmüş son çözelti hacmi; çözünen molü ayrı saklanan stoktur"
          height={430}
        >
          <text x={150} y={38} textAnchor="middle">
            Son çözelti
          </text>
          <rect
            className="c018-mint"
            x={82}
            y={y(finalMl)}
            width={96}
            height={320 - y(finalMl)}
            data-final-volume={finalMl}
          />
          <path className="c018-line" d="M80 65 V320 H180 V65" />
          {[250, 500, 750, 1000].map((v) => (
            <g key={v}>
              <path className="c018-line" d={`M180 ${y(v)} H192`} />
              <text x={205} y={y(v) + 7}>
                {v}
              </text>
            </g>
          ))}
          <text x={230} y={365} textAnchor="middle">
            mL
          </text>
          <text x={150} y={410} textAnchor="middle">
            {fmt(m.moles, 4)} mol NaCl
          </text>
        </Drawing>
        <figcaption>
          Renkli alan tüm çözelti hacmini gösterir; tuzun öz hacmi değil. Mol
          hesabında M_A(NaCl)=58,5 g/mol.
        </figcaption>
      </figure>
      <div className="c018-result" data-model-result>
        <p>
          Korunan NaCl: <strong>{fmt(m.moles, 4)} mol</strong> ({fmt(m.mass, 4)}{" "}
          g).
        </p>
        <p>
          Son molarite:{" "}
          <strong data-final-molarity={m.molarity}>
            {fmt(m.molarity, 4)} mol/L
          </strong>
          .
        </p>
        <p>
          Son hacim: {fmt(m.finalMl)} mL = {fmt(m.finalMl / 1000)} L. Hacim
          oranı: {fmt(m.dilutionFactor)}.
        </p>
        {stock === 0 && (
          <p>Stok 0 M; bu modelde yalnız su var, NaCl stoku yok.</p>
        )}
        <p>
          Eklenen su hacmi ile ölçülen son çözelti hacmi aynı veri değildir.
        </p>
      </div>
      <Prediction
        state={state}
        change={set}
        choices={[
          ["lower", "Stoktan daha seyreltik"],
          ["same", "Stokla aynı M"],
          ["none", "NaCl stoku yok"],
        ]}
        expected={answer}
        proof={`${fmt(m.moles, 4)} mol / ${fmt(m.finalMl / 1000)} L = ${fmt(m.molarity, 4)} mol/L. Mol korunur; payda son çözeltidir.`}
      />
    </Frame>
  );
}
function IonsLab() {
  const id = "ayt-iyon-derisimi",
    [state, set] = useExploration(key(id), {
      calciumM: 0.2,
      calciumMl: 200,
      sodiumM: 0.1,
      sodiumMl: 200,
      prediction: "",
      reason: "",
      checked: false,
    });
  const m = ionMixture018(
    safe(state.calciumM, 0, 0.5),
    safe(state.calciumMl, 100, 400),
    safe(state.sodiumM, 0, 0.5),
    safe(state.sodiumMl, 100, 400),
  );
  const update = (values: Partial<typeof state>) =>
    set({ ...values, checked: false });
  const ions = [
    ["calcium", "Ca²⁺", m.calcium],
    ["sodium", "Na⁺", m.sodium],
    ["chloride", "Cl⁻", m.chloride],
  ] as const;
  const empty = m.calciumMol + m.sodiumMol === 0;
  return (
    <Frame
      id={id}
      title="İyon stoklarını birleştir"
      intro="CaCl₂ ve NaCl tam çözünüp ayrışıyor. Yan tepkime, hidroliz ve kayıp ihmal; son hacim iki verilen hacmin toplamı kabul ediliyor. Sütunlar molariteyi gösterir, iyon adedini değil."
    >
      <div className="c018-controls">
        <Range
          label="CaCl₂ (mol/L)"
          value={m.calciumM}
          min={0}
          max={0.5}
          step={0.05}
          change={(calciumM) => update({ calciumM })}
        />
        <Range
          label="CaCl₂ (mL)"
          value={m.calciumMl}
          min={100}
          max={400}
          step={50}
          change={(calciumMl) => update({ calciumMl })}
        />
        <Range
          label="NaCl (mol/L)"
          value={m.sodiumM}
          min={0}
          max={0.5}
          step={0.05}
          change={(sodiumM) => update({ sodiumM })}
        />
        <Range
          label="NaCl (mL)"
          value={m.sodiumMl}
          min={100}
          max={400}
          step={50}
          change={(sodiumMl) => update({ sodiumMl })}
        />
      </div>
      <figure>
        <Drawing
          title="Karışımdaki üç iyonun ortak mol iyon/litre ölçeğinde derişimleri"
          height={440}
        >
          {ions.map(([id, label, concentration], i) => (
            <g key={id}>
              <text x={22} y={35 + 96 * i}>
                {label}
              </text>
              <text x={278} y={35 + 96 * i} textAnchor="end">
                {fmt(concentration)} M
              </text>
              <rect
                className={i === 2 ? "c018-coral" : "c018-mint"}
                x={22}
                y={55 + 96 * i}
                width={240 * concentration}
                height={28}
                data-ion={id}
                data-ion-value={concentration}
              />
            </g>
          ))}
          <path
            className="c018-line"
            d="M22 335 H262 M22 329 V341 M262 329 V341"
          />
          <text x={22} y={375}>
            0
          </text>
          <text x={262} y={375} textAnchor="end">
            1
          </text>
          <text x={150} y={420} textAnchor="middle">
            mol iyon/L
          </text>
        </Drawing>
        <figcaption>
          Ca²⁺ bir iyon, iki pozitif yük birimi taşır. Tuzun formel M değeriyle
          toplam iyon derişimi aynı sayı değildir.
        </figcaption>
      </figure>
      <div className="c018-result" data-model-result>
        <p>
          Son hacim: {fmt(m.volume)} L. Ca²⁺:{" "}
          <strong>{fmt(m.calcium)} M</strong>; Na⁺:{" "}
          <strong>{fmt(m.sodium)} M</strong>; Cl⁻:{" "}
          <strong>{fmt(m.chloride)} M</strong>.
        </p>
        <p>
          Cl⁻ molü: 2 × {fmt(m.calciumMol)} + {fmt(m.sodiumMol)} ={" "}
          {fmt(m.chlorideMol)} mol.
        </p>
        <p
          data-charge-positive={m.positiveCharge}
          data-charge-negative={m.negativeCharge}
        >
          Yük denkliği: 2 × {fmt(m.calcium)} + {fmt(m.sodium)} ={" "}
          {fmt(m.positiveCharge)}; Cl⁻ katkısı {fmt(m.negativeCharge)} mol
          yük/L.
        </p>
        <p>Toplam iyon derişimi: {fmt(m.totalIonM)} mol iyon/L.</p>
        {empty && (
          <p>
            Bu iki kaynaktan gelen tuz yok; yalnız su katkısı var. Suyun öz
            iyonlaşması bu tuz stok hesabının çıktısı değildir.
          </p>
        )}
      </div>
      <Prediction
        state={state}
        change={set}
        choices={[
          ["greater", "Cl⁻, Na⁺ değerinden büyük"],
          ["equal", "Cl⁻ ve Na⁺ aynı"],
          ["lower", "Cl⁻ daha küçük"],
        ]}
        expected={m.calciumMol > 0 ? "greater" : "equal"}
        proof={`Cl⁻ = 2[Ca²⁺] + [Na⁺]. Bu stoklar için değerler ${fmt(m.calcium)}, ${fmt(m.sodium)} ve ${fmt(m.chloride)} M.`}
      />
    </Frame>
  );
}
export default function Forge018ChemistryLab({
  lessonId,
}: {
  lessonId: string;
}) {
  switch (lessonId) {
    case "ayt-kinetik-yogunluk":
      return <KineticLab />;
    case "ayt-kismi-basinci-suustu":
      return <WetLab />;
    case "ayt-gercek-gaz-faz":
      return <RealLab />;
    case "ayt-cozucu-cozunen":
      return <SolvationLab />;
    case "ayt-molarite":
      return <MolarityLab />;
    case "ayt-iyon-derisimi":
      return <IonsLab />;
    default:
      return null;
  }
}
