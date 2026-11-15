import { useId, type ReactNode } from "react";
import { ModelNumber } from "./ModelNumber";
import { useExploration } from "./useExploration";
import {
  buoyancyState,
  pressureState,
  hydraulicState,
  pulseProfile,
  stringState,
  waveState,
  type StringBoundary,
} from "./forge011Physics";
import "./forge011Physics.css";

const fmt = (v: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(v) < 1e-8 ? 0 : v,
  );
const bound = (v: number, min: number, max: number, fallback: number) =>
  Number.isFinite(v) ? Math.max(min, Math.min(max, Math.round(v))) : fallback;
const key = (id: string) => `forge011-physics-${id}`;
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
    <fieldset className="physics011-comparison">
      <legend>{question}</legend>
      <div className="physics011-guesses">
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
        <div className="physics011-feedback" role="status">
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
    <section data-forge011={id} className="physics011-lab">
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
function Arrow({
  x,
  y,
  length,
  up,
  label,
  color = "var(--accent)",
}: {
  x: number;
  y: number;
  length: number;
  up: boolean;
  label: string;
  color?: string;
}) {
  const end = y + (up ? -length : length),
    head = up ? 7 : -7;
  return (
    <g aria-hidden="true" stroke={color} fill={color}>
      <line x1={x} y1={y} x2={x} y2={end} strokeWidth="3" />
      <path
        d={`M${x - 6},${end + head} L${x},${end} L${x + 6},${end + head}`}
        fill="none"
        strokeWidth="3"
      />
      <text x={x + 10} y={end + (up ? -7 : 17)} stroke="none" fontSize="15">
        {label}
      </text>
    </g>
  );
}
function Pressure() {
  const id = "basinc",
    uid = useId();
  const [saved, set] = useExploration(key(id), {
    mode: "solid",
    force: 60,
    area: 20,
    depth: 40,
    density: 1000,
    surface: 100,
    gasHigher: false,
    a1: 4,
    a2: 20,
    travel: 10,
    guess: "",
    reason: "",
    checked: false,
  });
  const mode = ["solid", "liquid", "manometer", "hydraulic"].includes(
    saved.mode,
  )
    ? saved.mode
    : "solid";
  const force = bound(saved.force, 0, 300, 60),
    area = bound(saved.area, 5, 100, 20),
    depth = bound(saved.depth, 0, 100, 40),
    density = bound(saved.density, 500, 1500, 1000),
    surface = bound(saved.surface, 50, 120, 100),
    a1 = bound(saved.a1, 2, 10, 4),
    a2 = bound(saved.a2, 10, 50, 20),
    travel = bound(saved.travel, 0, 20, 10);
  const state = pressureState(
      force,
      area,
      depth,
      density,
      surface,
      saved.gasHigher,
    ),
    hydraulic = hydraulicState(force, a1, a2, travel);
  const change = (v: Partial<typeof saved>) => set({ ...v, checked: false });
  const width = 100 * Math.sqrt(area / 20),
    column = depth * 1.5;
  return (
    <Frame
      id={id}
      title="Kuvveti, alanı ve sıvı sütununu ayrı değiştir"
      intro="Dört ideal düzeneği karşılaştır. g=10 m/s²; sıvı durgun ve sıkıştırılamazdır. Değerler sonucu belirler; çizim öğretim ölçeğindedir."
    >
      <label htmlFor={`${uid}-mode`}>İncelenen düzenek</label>
      <select
        id={`${uid}-mode`}
        value={mode}
        onChange={(e) => change({ mode: e.target.value })}
      >
        <option value="solid">Katı ve temas alanı</option>
        <option value="liquid">Sıvıda derinlik</option>
        <option value="manometer">Açık uçlu manometre</option>
        <option value="hydraulic">İdeal hidrolik pistonlar</option>
      </select>
      <div className="physics011-controls">
        {(mode === "solid" || mode === "hydraulic") && (
          <ModelNumber
            label="Dik kuvvet (N)"
            min={0}
            max={300}
            value={force}
            onChange={(force) => change({ force })}
          />
        )}{" "}
        {mode === "solid" ? (
          <ModelNumber
            label="Temas alanı (cm²)"
            min={5}
            max={100}
            value={area}
            onChange={(area) => change({ area })}
          />
        ) : mode === "hydraulic" ? (
          <>
            <ModelNumber
              label="Küçük alan (cm²)"
              min={2}
              max={10}
              value={a1}
              onChange={(a1) => change({ a1 })}
            />
            <ModelNumber
              label="Büyük alan (cm²)"
              min={10}
              max={50}
              value={a2}
              onChange={(a2) => change({ a2 })}
            />
            <ModelNumber
              label="Giriş yolu (cm)"
              min={0}
              max={20}
              value={travel}
              onChange={(travel) => change({ travel })}
            />
          </>
        ) : (
          <>
            <ModelNumber
              label={
                mode === "liquid" ? "Düşey derinlik (cm)" : "Yüzey farkı (cm)"
              }
              min={0}
              max={100}
              value={depth}
              onChange={(depth) => change({ depth })}
            />
            <ModelNumber
              label="Sıvı yoğunluğu (kg/m³)"
              min={500}
              max={1500}
              value={density}
              onChange={(density) => change({ density })}
            />
            <ModelNumber
              label="Yüzey basıncı (kPa)"
              min={50}
              max={120}
              value={surface}
              onChange={(surface) => change({ surface })}
            />
          </>
        )}
      </div>
      {mode === "manometer" && (
        <label className="physics011-check">
          <input
            type="checkbox"
            checked={saved.gasHigher}
            onChange={(e) => change({ gasHigher: e.target.checked })}
          />
          Gaz kolundaki sıvı yüzeyi daha yüksek
        </label>
      )}
      <svg
        viewBox="0 0 600 330"
        role="img"
        aria-labelledby={`${uid}-title ${uid}-desc`}
      >
        <title id={`${uid}-title`}>Seçilen basınç düzeneği</title>
        <desc id={`${uid}-desc`}>
          Dik kuvvet ve alan, sıvıdaki düşey sütun, iki manometre yüzeyi veya
          hidrolik pistonun yer değiştirmesi seçime göre çizilir. Aynı sonuçlar
          şeklin altında metinle verilir.
        </desc>
        {mode === "solid" ? (
          <>
            <rect
              x={300 - width / 2}
              y="150"
              width={width}
              height="85"
              rx="7"
              className="physics011-object"
            />
            <line
              x1="65"
              y1="235"
              x2="535"
              y2="235"
              className="physics011-ground"
            />
            <Arrow
              x={300}
              y={75}
              length={60 + force / 10}
              up={false}
              label={`${fmt(force)} N`}
            />
            <line
              x1={300 - width / 2}
              y1="259"
              x2={300 + width / 2}
              y2="259"
              className="physics011-dimension"
            />
            <text x="300" y="289" textAnchor="middle">
              Temas: {fmt(area)} cm²
            </text>
          </>
        ) : mode === "liquid" ? (
          <>
            <path d="M130 55V270H450V55" className="physics011-vessel" />
            <rect
              x="132"
              y="95"
              width="316"
              height="173"
              className="physics011-water"
            />
            <line
              x1="132"
              y1="95"
              x2="448"
              y2="95"
              className="physics011-surface"
            />
            <circle
              cx="290"
              cy={95 + column}
              r="8"
              className="physics011-marker"
            />
            <line
              x1="380"
              y1="95"
              x2="380"
              y2={95 + column}
              className="physics011-dimension"
            />
            <text x="400" y={120 + column / 2}>
              h={depth} cm
            </text>
            <text x="290" y="72" textAnchor="middle">
              P₀={surface} kPa
            </text>
            <text x="290" y="303" textAnchor="middle">
              Sıvı: {density} kg/m³
            </text>
          </>
        ) : mode === "manometer" ? (
          <>
            {(() => {
              const dy = depth * 0.65,
                ly = saved.gasHigher ? 145 - dy : 145 + dy,
                ry = saved.gasHigher ? 145 + dy : 145 - dy;
              return (
                <>
                  <path
                    d="M170 55V265Q300 315 430 265V55"
                    className="physics011-vessel"
                  />
                  <path
                    d={`M190 ${ly}V250Q300 290 410 250V${ry}`}
                    className="physics011-u-water"
                  />
                  <line
                    x1="165"
                    x2="220"
                    y1={ly}
                    y2={ly}
                    className="physics011-surface"
                  />
                  <line
                    x1="380"
                    x2="435"
                    y1={ry}
                    y2={ry}
                    className="physics011-surface"
                  />
                  <line
                    x1="300"
                    x2="300"
                    y1={ly}
                    y2={ry}
                    className="physics011-dimension"
                  />
                  <text x="170" y="35" textAnchor="middle">
                    Gaz kolu
                  </text>
                  <text x="430" y="35" textAnchor="middle">
                    Açık kol
                  </text>
                  <text x="320" y="170">
                    Δh={depth} cm
                  </text>
                </>
              );
            })()}
          </>
        ) : (
          <>
            {(() => {
              const y1 = 130 + travel * 2,
                y2 = 150 - hydraulic.travelCm * 2;
              return (
                <>
                  <path d="M90 75V260H510V75" className="physics011-vessel" />
                  <rect
                    x="92"
                    y={y1}
                    width="98"
                    height={260 - y1}
                    className="physics011-water"
                  />
                  <rect
                    x="310"
                    y={y2}
                    width="198"
                    height={260 - y2}
                    className="physics011-water"
                  />
                  <rect
                    x="190"
                    y="230"
                    width="120"
                    height="30"
                    className="physics011-water"
                  />
                  <line
                    x1="90"
                    x2="190"
                    y1={y1}
                    y2={y1}
                    className="physics011-piston"
                  />
                  <line
                    x1="310"
                    x2="510"
                    y1={y2}
                    y2={y2}
                    className="physics011-piston"
                  />
                  <Arrow
                    x={140}
                    y={y1 - 80}
                    length={60}
                    up={false}
                    label="F₁"
                  />
                  <Arrow x={410} y={y2 - 5} length={65} up={true} label="F₂" />
                  <text x="140" y="300" textAnchor="middle">
                    A₁={a1} cm²
                  </text>
                  <text x="410" y="300" textAnchor="middle">
                    A₂={a2} cm²
                  </text>
                </>
              );
            })()}
          </>
        )}
      </svg>
      <div data-model-result className="physics011-result" aria-live="polite">
        {mode === "solid" ? (
          <>
            <strong>Basınç: {fmt(state.solidPa)} Pa</strong>
            <p>
              {fmt(force)} N ÷ {fmt(state.areaM2, 4)} m². Kuvvet değişmeden alan
              büyürse ortalama basınç azalır.
            </p>
          </>
        ) : mode === "liquid" ? (
          <>
            <strong>Sıvı katkısı: {fmt(state.headPa)} Pa</strong>
            <p>
              Mutlak basınç: {fmt(state.totalPa)} Pa = {surface} kPa +{" "}
              {fmt(state.headPa / 1000)} kPa. h düşey derinliktir.
            </p>
          </>
        ) : mode === "manometer" ? (
          <>
            <strong>Gaz basıncı: {fmt(state.gasPa)} Pa</strong>
            <p>
              Pgaz=P₀ {saved.gasHigher ? "−" : "+"} ρgΔh. Gaz kolu{" "}
              {saved.gasHigher
                ? "yüksek: gaz daha düşük basınçlıdır"
                : "alçak: gaz daha yüksek basınçlıdır"}
              .
            </p>
          </>
        ) : (
          <>
            <strong>Çıkış kuvveti: {fmt(hydraulic.forceN)} N</strong>
            <p>
              Çıkış yolu: {fmt(hydraulic.travelCm)} cm. İdeal giriş işi{" "}
              {fmt(hydraulic.inputJ)} J = çıkış işi {fmt(hydraulic.outputJ)} J.
            </p>
            <p className="small muted">
              Sıvının ağırlığı, piston ağırlıkları ve sürtünme ihmal edilir.
              Şemadaki yükseklik farkından ek hidrostatik kuvvet hesaplanmaz.
            </p>
          </>
        )}
      </div>
      <Comparison
        uid={uid}
        question="Aynı durgun sıvıda yüzey basıncı ve yoğunluk aynıyken yalnız derinliği artırırsan?"
        choices={["Basınç artar", "Basınç azalır", "Basınç değişmez"]}
        expected="Basınç artar"
        values={saved}
        onChange={set}
      >
        <p>
          ΔP=ρgh: ρ ve g sabitken h artışı sıvı katkısını artırır. Kap şekli bu
          tek nokta ilişkisini değiştirmez. Mutlak basınçta P₀ da korunmuştur.
        </p>
      </Comparison>
    </Frame>
  );
}
function Buoyancy() {
  const id = "sivilarin-kaldirma-kuvveti",
    uid = useId();
  const [saved, set] = useExploration(key(id), {
    massG: 600,
    volumeMl: 1000,
    density: 1000,
    held: false,
    guess: "",
    reason: "",
    checked: false,
  });
  const massG = bound(saved.massG, 100, 3000, 600),
    volumeMl = bound(saved.volumeMl, 200, 3000, 1000),
    density = bound(saved.density, 500, 1500, 1000);
  const state = buoyancyState(
      massG / 1000,
      volumeMl / 1000,
      density,
      saved.held,
    ),
    change = (v: Partial<typeof saved>) => set({ ...v, checked: false });
  const sunk = !saved.held && state.bodyDensity > density,
    top = saved.held ? 200 : sunk ? 250 : 165 - 120 * (1 - state.fraction),
    height = 120;
  const scale =
    80 / Math.max(state.weightN, state.forceN, state.holdN, state.supportN, 1);
  return (
    <Frame
      id={id}
      title="Ağırlığı ve batan hacmi karşılaştır"
      intro="Kap geniş kabul edilir, sıvı homojen; g=10 m/s². Blok rijittir; tabana ulaşırsa sıvı altına da erişir. Serbest seçenek son dengeyi, tam batık seçenek dışarıdan tutmayı gösterir."
    >
      <div className="physics011-controls">
        <ModelNumber
          label="Cisim kütlesi (g)"
          min={100}
          max={3000}
          value={massG}
          onChange={(massG) => change({ massG })}
        />
        <ModelNumber
          label="Toplam hacim (mL)"
          min={200}
          max={3000}
          value={volumeMl}
          onChange={(volumeMl) => change({ volumeMl })}
        />
        <ModelNumber
          label="Sıvı yoğunluğu (kg/m³)"
          min={500}
          max={1500}
          value={density}
          onChange={(density) => change({ density })}
        />
      </div>
      <label className="physics011-check">
        <input
          type="checkbox"
          checked={saved.held}
          onChange={(e) => change({ held: e.target.checked })}
        />
        Dış kuvvetle tamamen batık tut
      </label>
      <svg
        viewBox="0 0 600 420"
        role="img"
        aria-labelledby={`${uid}-title ${uid}-desc`}
      >
        <title id={`${uid}-title`}>Sıvı içindeki blok ve kuvvetleri</title>
        <desc id={`${uid}-desc`}>
          Blokta su altında kalan kesim ve yukarı kaldırma ile aşağı ağırlık
          okları gösterilir. Dış kuvvet veya taban desteği gerektiğinde ayrıca
          belirtilir. Kesit şematiktir.
        </desc>
        <path d="M75 70V375H525V70" className="physics011-vessel" />
        <rect
          x="77"
          y="165"
          width="446"
          height="208"
          className="physics011-water"
        />
        <rect
          x="235"
          y={top}
          width="125"
          height={height}
          rx="5"
          className="physics011-object"
        />
        <rect
          x="235"
          y={Math.max(top, 165)}
          width="125"
          height={Math.max(0, top + height - Math.max(top, 165))}
          className="physics011-wet"
        />
        <line
          x1="77"
          y1="165"
          x2="523"
          y2="165"
          className="physics011-surface"
        />
        <Arrow
          x={205}
          y={top + height / 2}
          length={state.forceN * scale}
          up={true}
          label="Fk"
          color="var(--mint)"
        />
        <Arrow
          x={390}
          y={top + height / 2}
          length={state.weightN * scale}
          up={false}
          label="G"
        />
        {saved.held && state.holdN > 1e-8 && (
          <Arrow
            x={455}
            y={top + height / 2}
            length={state.holdN * scale}
            up={state.holdDirection === "yukarı"}
            label="Dış kuvvet"
            color="var(--text)"
          />
        )}
        {sunk && (
          <Arrow
            x={150}
            y={370}
            length={state.supportN * scale}
            up
            label="N"
            color="var(--text)"
          />
        )}
        <text x="300" y="403" textAnchor="middle">
          Su çizgisi: batık pay %{fmt(state.fraction * 100)}
        </text>
      </svg>
      <div data-model-result className="physics011-result" aria-live="polite">
        <strong>{state.condition}</strong>
        <p>
          Kaldırma: {fmt(state.forceN)} N · Ağırlık: {fmt(state.weightN)} N ·
          Batık hacim: {fmt(state.displacedL)} L / {fmt(volumeMl / 1000)} L
        </p>
        <p>
          Ortalama cisim yoğunluğu: {fmt(state.bodyDensity)} kg/m³.{" "}
          {saved.held
            ? `Tutma kuvveti: ${fmt(state.holdN)} N ${state.holdDirection}. Tam batık olmak Fk=G zorunluluğu doğurmaz.`
            : state.supportN > 1e-8
              ? `Son dengede taban desteği: ${fmt(state.supportN)} N; Fk+N=G.`
              : "Serbest dengede Fk=G; sıvı yoğunluğu değişince gereken batık hacim değişebilir."}
        </p>
      </div>
      <Comparison
        uid={uid}
        question="Aynı cisim iki farklı yoğunluktaki sıvıda ayrı ayrı serbest yüzüyorsa hangi nicelik aynı kalır?"
        choices={[
          "Denge kaldırma kuvveti",
          "Batık hacim mutlaka",
          "Sıvı yoğunluğu",
        ]}
        expected="Denge kaldırma kuvveti"
        values={saved}
        onChange={set}
      >
        <p>
          Her iki serbest dengede Fk=mg. Aynı kütle ve g için kaldırma aynı;
          Vb=m/ρs nedeniyle batık hacim değişebilir. Dış kuvvetle tam batırılan
          seçeneğe bu serbest yüzme çıkarımı uygulanmaz.
        </p>
      </Comparison>
    </Frame>
  );
}
function Waves() {
  const id = "dalgalara-giris",
    uid = useId();
  const [saved, set] = useExploration(key(id), {
    speed: 8,
    frequency: 2,
    amplitude: 3,
    step: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const speed = bound(saved.speed, 2, 12, 8),
    frequency = bound(saved.frequency, 1, 4, 2),
    amplitude = bound(saved.amplitude, 1, 4, 3),
    step = bound(saved.step, 0, 3, 0),
    state = waveState(speed, frequency, amplitude, step),
    change = (v: Partial<typeof saved>) => set({ ...v, checked: false });
  const d = Array.from({ length: 401 }, (_, i) => {
      const x = (8 * i) / 400,
        y =
          140 -
          amplitude *
            15 *
            Math.sin((2 * Math.PI * x) / state.wavelength - state.phase);
      return `${i ? "L" : "M"}${(45 + x * 62.5).toFixed(2)},${y.toFixed(2)}`;
    }).join(" "),
    beadY = 140 - state.beadCm * 15;
  return (
    <Frame
      id={id}
      title="Kaynak ritmiyle ortam hızını ayır"
      intro="İdeal, doğrusal ve dağılımsız ip modeli. Şekil 8 m’lik bir pencereyi gösterir. Turuncu boncuğun yatay konumu x=2 m’de kalır; yalnız düşey titreşir."
    >
      <div className="physics011-controls">
        <ModelNumber
          label="Ortam sürati (m/s)"
          min={2}
          max={12}
          value={speed}
          onChange={(speed) => change({ speed })}
        />
        <ModelNumber
          label="Kaynak frekansı (Hz)"
          min={1}
          max={4}
          value={frequency}
          onChange={(frequency) => change({ frequency })}
        />
        <ModelNumber
          label="Genlik (cm)"
          min={1}
          max={4}
          value={amplitude}
          onChange={(amplitude) => change({ amplitude })}
        />
      </div>
      <div className="physics011-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => change({ step: (step + 1) % 4 })}
        >
          Bir çeyrek periyot ilerlet
        </button>
        <button
          type="button"
          className="text-button"
          onClick={() => change({ step: 0 })}
        >
          İlk ana dön
        </button>
      </div>
      <svg
        viewBox="0 0 600 300"
        role="img"
        aria-labelledby={`${uid}-title ${uid}-desc`}
      >
        <title id={`${uid}-title`}>
          Periyodik ip dalgası ve sabit yatay konumlu boncuk
        </title>
        <desc id={`${uid}-desc`}>
          Dalga sağa ilerleyen sinüs biçimindedir. Frekans ve sürat değiştikçe
          tepeler arasındaki mesafe değişir; çeyrek periyot adımı deseni
          kaydırır. Boncuk x=2 metrede düşey hareket eder.
        </desc>
        <line x1="45" y1="140" x2="545" y2="140" className="physics011-axis" />
        {[0, 2, 4, 6, 8].map((x) => (
          <g key={x}>
            <line
              x1={45 + x * 62.5}
              x2={45 + x * 62.5}
              y1="218"
              y2="228"
              className="physics011-axis"
            />
            <text x={45 + x * 62.5} y="251" textAnchor="middle">
              {x} m
            </text>
          </g>
        ))}
        <line
          x1="170"
          x2="170"
          y1="65"
          y2="210"
          className="physics011-dimension"
        />
        <path d={d} className="physics011-wave" data-wave-shape="periodic" />
        <circle
          cx="170"
          cy={beadY}
          r="8"
          className="physics011-marker"
          data-wave-bead="fixed-x"
        />
        <text x="300" y="35" textAnchor="middle">
          Dalga sağa →
        </text>
        <text x="300" y="285" textAnchor="middle">
          Boncuk yalnız düşey titreşir; x=2 m
        </text>
      </svg>
      <div data-model-result className="physics011-result" aria-live="polite">
        <strong>
          Dalga boyu: {fmt(state.wavelength)} m · Periyot:{" "}
          {fmt(state.period, 3)} s
        </strong>
        <p>
          v=λf: {fmt(speed)} m/s = {fmt(state.wavelength)} m × {fmt(frequency)}{" "}
          Hz. Zaman: {step}/4 periyot; boncuk uzanımı {fmt(state.beadCm)} cm.
        </p>
        <p>
          Aynı ortamda frekansı artır: sürat korunur, dalga boyu küçülür. Genlik
          farklı bir değişkendir; bu modelde sürati değiştirmez.
        </p>
      </div>
      <Comparison
        uid={uid}
        question="Ortam özellikleri aynıyken kaynağın frekansı iki kat olursa dalga boyu?"
        choices={["Yarıya iner", "İki katına çıkar", "Değişmez"]}
        expected="Yarıya iner"
        values={saved}
        onChange={set}
      >
        <p>
          İdeal aynı ortamda v sabit; λ=v/f olduğundan f iki katken λ yarıdır.
          Dalga tepeleri sıklaşır, boncuğun ortam boyunca sürüklenmesi gerekmez.
        </p>
      </Comparison>
    </Frame>
  );
}
function Strings() {
  const id = "yay-dalgalari",
    uid = useId();
  const [saved, set] = useExploration(key(id), {
    boundary: "fixed",
    tension: 16,
    muHundred: 25,
    reflected: false,
    guess: "",
    reason: "",
    checked: false,
  });
  const boundary: StringBoundary = ["fixed", "free", "heavy", "light"].includes(
      saved.boundary,
    )
      ? (saved.boundary as StringBoundary)
      : "fixed",
    tension = bound(saved.tension, 4, 36, 16),
    muHundred = bound(saved.muHundred, 10, 100, 25),
    state = stringState(tension, muHundred / 100, boundary),
    change = (v: Partial<typeof saved>) => set({ ...v, checked: false });
  const shape = (
    center: number,
    width: number,
    amp: number,
    start: number,
    end: number,
  ) =>
    Array.from({ length: 201 }, (_, i) => {
      const x = start + ((end - start) * i) / 200,
        y = 140 - pulseProfile(x, center, width, amp);
      return `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(" ");
  const boundaryName = {
      fixed: "Sabit uç",
      free: "Serbest uç",
      heavy: "Daha ağır ikinci ip",
      light: "Daha hafif ikinci ip",
    }[boundary],
    reflectedName = state.reflection < 0 ? "çukur" : "tepe";
  return (
    <Frame
      id={id}
      title="Sınır değişirse yansıma nasıl değişir?"
      intro="Kayıpsız, doğrusal ve eş gerilimli ideal ipler. Önce gelen atmayı gör; ardından yansımayı aç. Yatay yön ile tepe/çukur işaretini ayrı karşılaştır."
    >
      <label htmlFor={`${uid}-boundary`}>Sınır türü</label>
      <select
        id={`${uid}-boundary`}
        value={boundary}
        onChange={(e) => change({ boundary: e.target.value, reflected: false })}
      >
        <option value="fixed">Sabit uç</option>
        <option value="free">Serbest uç</option>
        <option value="heavy">Aynı gerilimde 4 kat boyca kütle</option>
        <option value="light">Aynı gerilimde dörtte bir boyca kütle</option>
      </select>
      <div className="physics011-controls">
        <ModelNumber
          label="Gerilim (N)"
          min={4}
          max={36}
          value={tension}
          onChange={(tension) => change({ tension })}
        />
        <ModelNumber
          label="Boyca kütle (yüzde bir kg/m)"
          min={10}
          max={100}
          value={muHundred}
          onChange={(muHundred) => change({ muHundred })}
        />
      </div>
      <div className="physics011-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => change({ reflected: !saved.reflected })}
        >
          {saved.reflected ? "Gelen atmaya dön" : "Yansımayı göster"}
        </button>
      </div>
      <svg
        viewBox="0 0 620 310"
        role="img"
        aria-labelledby={`${uid}-title ${uid}-desc`}
      >
        <title id={`${uid}-title`}>
          {boundaryName}: {saved.reflected ? "yansıma sonrası" : "gelen atma"}
        </title>
        <desc id={`${uid}-desc`}>
          Başlangıçta bir tepe sağa gider. Yansıma sonrasında seçili sınıra göre
          sola giden tepe veya çukur, iki ip varsa sağa iletilen tepe çizilir.
          Gösterilen iki kare sınırdan uzaktaki ayrılmış atmalardır; geçiş
          anının zaman simülasyonu değildir.
        </desc>
        <line x1="35" y1="140" x2="360" y2="140" className="physics011-axis" />
        <line
          x1="360"
          y1="140"
          x2="590"
          y2="140"
          className={
            boundary === "heavy" ? "physics011-heavy" : "physics011-axis"
          }
        />
        <line
          x1="360"
          y1="40"
          x2="360"
          y2="240"
          className={
            boundary === "fixed" ? "physics011-wall" : "physics011-dimension"
          }
        />
        {boundary === "free" && (
          <circle cx="360" cy="140" r="10" className="physics011-free-end" />
        )}
        {saved.reflected ? (
          <>
            <path
              d={shape(185, 110, 50 * state.reflection, 35, 360)}
              className="physics011-wave"
              data-pulse="reflected"
            />
            <text x="185" y="45" textAnchor="middle">
              ← Yansıyan: {reflectedName}
            </text>
            {state.hasTransmission && (
              <>
                <path
                  d={shape(
                    475,
                    (110 * state.speed2) / state.speed1,
                    50 * state.transmission,
                    360,
                    590,
                  )}
                  className="physics011-transmitted"
                  data-pulse="transmitted"
                />
                <text x="475" y="45" textAnchor="middle">
                  İletilen tepe →
                </text>
              </>
            )}
          </>
        ) : (
          <>
            <path
              d={shape(185, 110, 50, 35, 360)}
              className="physics011-wave"
              data-pulse="incident"
            />
            <text x="185" y="45" textAnchor="middle">
              Gelen tepe →
            </text>
          </>
        )}
        <text x="185" y="275" textAnchor="middle">
          İlk ip: {fmt(state.speed1)} m/s
        </text>
        <text x="475" y="275" textAnchor="middle">
          {state.hasTransmission
            ? `İkinci ip: ${fmt(state.speed2)} m/s`
            : boundaryName}
        </text>
      </svg>
      <div data-model-result className="physics011-result" aria-live="polite">
        <strong>
          {boundaryName} · İlk ortam sürati: {fmt(state.speed1)} m/s
        </strong>
        <p>
          μ₁={fmt(muHundred / 100)} kg/m; v₁=√(F/μ₁).{" "}
          {saved.reflected
            ? `Yansıyan: ${reflectedName}; sola. ${state.hasTransmission ? `İletilen: tepe; sağa, ${fmt(state.speed2)} m/s.` : "İdeal uçta iletim yok."}`
            : "Gelen: tepe; sağa. Sonucu açmadan yansımanın işaretini tahmin et."}
        </p>
        {saved.reflected && (
          <p>
            İşaretli uzanım oranları: yansıyan {fmt(state.reflection, 3)},
            iletilen {fmt(state.transmission, 3)}. Enerji payları: %
            {fmt(state.reflectedEnergy * 100)} + %
            {fmt(state.transmittedEnergy * 100)} = %100.
          </p>
        )}
        <p className="small muted">
          İki kare ayrılmış biçimleri karşılaştırır; uçtaki geçici üst üste
          binme çizilmez. Sayısal oranlar ideal eş gerilimli bağlantının
          açıklama modelidir.
        </p>
      </div>
      <Comparison
        uid={uid}
        question="İdeal sabit uca gelen bir tepe tamamen yansıyınca hangi biçimde geri döner?"
        choices={[
          "Çukur ve ters yönde",
          "Tepe ve aynı yönde",
          "Enerjisi sıfır olarak",
        ]}
        expected="Çukur ve ters yönde"
        values={saved}
        onChange={set}
      >
        <p>
          Sabit uçta toplam uzanım sıfır tutulur; gelen tepeye ters işaretli
          yansıyan gerekir. Geri dönen çukur aynı ipte aynı sürat büyüklüğüne
          sahiptir. Serbest uçta işaretin korunması başka bir sınır koşuludur.
        </p>
      </Comparison>
    </Frame>
  );
}
export default function Forge011PhysicsLab({ id }: { id: string }) {
  if (id === "basinc") return <Pressure />;
  if (id === "sivilarin-kaldirma-kuvveti") return <Buoyancy />;
  if (id === "dalgalara-giris") return <Waves />;
  if (id === "yay-dalgalari") return <Strings />;
  return null;
}
