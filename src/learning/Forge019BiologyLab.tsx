import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  airway019,
  airwayParts019,
  ventilation019,
  breathingPhases019,
  gases019,
  gasLocations019,
  oxygenCurve019,
  affinityStates019,
  urinary019,
  urinaryBlocks019,
  nephron019,
  nephronParts019,
  renalBalance019,
  male019,
  spermStages019,
  maleSignals019,
} from "./forge019Biology";
import "./forge019Biology.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const n = (x: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(x);
const bound = (x: number, a: number, b: number) =>
  Number.isFinite(x) ? Math.max(a, Math.min(b, x)) : a;
function Drawing({
  title,
  height = 360,
  children,
}: {
  title: string;
  height?: number;
  children: ReactNode;
}) {
  const uid = useId();
  return (
    <svg
      className="bio019-drawing"
      role="img"
      aria-labelledby={uid}
      viewBox={`0 0 360 ${height}`}
    >
      <title id={uid}>{title}</title>
      {children}
    </svg>
  );
}
function Arrow({
  x1,
  y1,
  x2,
  y2,
  active = true,
  kind = "flow",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
  kind?: string;
}) {
  const uid = useId();
  return (
    <g
      data-flow={kind}
      data-active={active}
      className={active ? "bio019-arrow" : "bio019-arrow bio019-muted"}
    >
      <defs>
        <marker
          id={uid}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10Z" fill="currentColor" />
        </marker>
      </defs>
      <path d={`M${x1},${y1}L${x2},${y2}`} markerEnd={`url(#${uid})`} />
    </g>
  );
}
function Range({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (n: number) => void;
}) {
  const uid = useId();
  return (
    <div className="bio019-field">
      <label htmlFor={uid}>{label}</label>
      <input
        id={uid}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <output htmlFor={uid}>{n(value)}</output>
    </div>
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
  onChange: (s: string) => void;
}) {
  const uid = useId();
  return (
    <div className="bio019-field">
      <label htmlFor={uid}>{label}</label>
      <ChoiceSelect id={uid} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([k, t]) => (
          <option key={k} value={k}>
            {t}
          </option>
        ))}
      </ChoiceSelect>
      <output htmlFor={uid}>{options.find(([k]) => k === value)?.[1]}</output>
    </div>
  );
}
function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (b: boolean) => void;
}) {
  const uid = useId();
  return (
    <label className="bio019-check" htmlFor={uid}>
      <input
        id={uid}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
function Result({ children }: { children: ReactNode }) {
  return (
    <div className="bio019-result" data-model-result aria-live="polite">
      {children}
    </div>
  );
}
function Prediction({
  id,
  context,
  options,
  expected,
  explanation,
}: {
  id: string;
  context: string;
  options: [string, string][];
  expected: string;
  explanation: string;
}) {
  const uid = useId();
  const [s, set] = useExploration("forge019-bio-prediction-" + id, {
    answer: "",
    reason: "",
    context: "",
    checked: false,
  });
  const selected = options.find(([k]) => k === s.answer);
  return (
    <div className="bio019-prediction">
      <label htmlFor={uid + "-answer"}>Sonuç tahminin</label>
      <ChoiceSelect
        id={uid + "-answer"}
        value={selected ? s.answer : ""}
        onChange={(e) => set({ answer: e.target.value, checked: false })}
      >
        <option value="">Bir sonuç seç</option>
        {options.map(([k, t]) => (
          <option key={k} value={k}>
            {t}
          </option>
        ))}
      </ChoiceSelect>
      <output data-selected-prediction htmlFor={uid + "-answer"}>
        {selected
          ? "Seçili tahmin: " + selected[1]
          : "Henüz bir tahmin seçilmedi."}
      </output>
      <label htmlFor={uid + "-reason"}>Gerekçen</label>
      <textarea
        id={uid + "-reason"}
        rows={3}
        maxLength={120}
        value={s.reason.slice(0, 120)}
        onChange={(e) =>
          set({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        className="secondary"
        disabled={!selected || !s.reason.trim()}
        onClick={() => set({ checked: true, context: context.slice(0, 120) })}
      >
        Tahminimi karşılaştır
      </button>
      {s.checked && s.context === context && selected && (
        <div className="bio019-feedback" role="status">
          <strong>
            {s.answer === expected
              ? "Seçimin bu modeldeki kanıtla uyumlu."
              : "Seçimini kanıtla yeniden karşılaştır."}
          </strong>
          <p>{explanation}</p>
          <p>
            Gerekçene puan verilmez. Bu keşif soru puanı, XP ya da konu bitiş
            kaydı eklemez.
          </p>
        </div>
      )}
    </div>
  );
}

const displayLabels019: Record<string, string> = {
  "Birincil spermatosit": "Mayoz I öncesi birincil hücre",
  "İkincil spermatosit": "Mayoz I sonrası ikincil hücre",
  "Testosteron geri bildirimi": "T hormonu geri bildirimi",
};
const entries = (o: Record<string, string>): [string, string][] =>
  Object.entries(o).map(([key, label]) => [
    key,
    displayLabels019[label] ?? label,
  ]);
const safe = <M extends Record<string, string>>(
  value: string,
  map: M,
  fallback: keyof M & string,
): keyof M & string =>
  Object.hasOwn(map, value) ? (value as keyof M & string) : fallback;
function Key({ children }: { children: ReactNode }) {
  return <div className="bio019-key">{children}</div>;
}
function AirwayLab() {
  const [s, set] = useExploration("forge019-bio-solunum-organlar", {
    part: "alveolus",
    area: 2,
    thickness: 1,
    gradient: 3,
  });
  const part = safe(s.part, airwayParts019, "alveolus"),
    m = airway019(
      part,
      bound(s.area, 1, 8),
      bound(s.thickness, 1, 4),
      bound(s.gradient, -6, 6),
    );
  const line =
    m.flux === null
      ? "Bu seçili bölüm iletim yoludur."
      : `Net akış: ${n(m.flux)} model birimi; ${m.direction.toLocaleLowerCase("tr-TR")}.`;
  return (
    <>
      <p>
        Hava yolunu seç. Duvar desteğini ve gaz değişim sınırını karşılaştır;
        alveolde alanı, kalınlığı ve farkı değiştir.
      </p>
      <div className="bio019-controls">
        <Choice
          label="Seçili yapı"
          value={part}
          options={entries(airwayParts019)}
          onChange={(part) => set({ part })}
        />
        <Range
          label="Etkin alan A"
          value={m.area}
          min={1}
          max={8}
          onChange={(area) => set({ area })}
        />
        <Range
          label="Bariyer kalınlığı T"
          value={m.thickness}
          min={1}
          max={4}
          onChange={(thickness) => set({ thickness })}
        />
        <Range
          label="Fark: alveol eksi kan"
          value={m.gradient}
          min={-6}
          max={6}
          onChange={(gradient) => set({ gradient })}
        />
      </div>
      <Drawing
        title={
          m.gasSurface
            ? "Alveol lümeni ile kılcal kan arasındaki ayrı bariyer"
            : "Seçili hava yolu kesitinde lümen, epitel ve destek"
        }
        height={390}
      >
        {m.gasSurface ? (
          <g data-airway="alveolus">
            <ellipse
              className="bio019-organ"
              cx="108"
              cy="150"
              rx="78"
              ry="102"
            />
            <text x="55" y="143">
              Hava
            </text>
            <rect
              data-barrier-thickness={m.thickness}
              className="bio019-thick"
              x="195"
              y="65"
              width={m.thickness * 8}
              height="175"
              rx="5"
            />
            <rect
              className="bio019-organ"
              x="244"
              y="50"
              width="87"
              height="208"
              rx="35"
            />
            <text x="261" y="142">
              Kan
            </text>
            <circle className="bio019-red" cx="284" cy="195" r="17" />
            <circle className="bio019-dot" cx="99" cy="239" r="14" />
            <path className="bio019-leader" d="M97 255V285H30" />
            <text x="25" y="320">
              Tip II
            </text>
            <path className="bio019-leader" d="M169 83V28H253" />
            <text x="256" y="36">
              Tip I
            </text>
            {m.gradient !== 0 && (
              <Arrow
                kind="gas"
                x1={m.gradient > 0 ? 144 : 280}
                y1={180}
                x2={m.gradient > 0 ? 280 : 144}
                y2={180}
              />
            )}
            <text data-flux-label x="115" y="362">
              J = {n(m.flux ?? 0)}
            </text>
          </g>
        ) : (
          <g data-airway={part}>
            <circle className="bio019-organ" cx="180" cy="165" r="112" />
            <circle className="bio019-cell" cx="180" cy="165" r="71" />
            <text x="140" y="174">
              Hava
            </text>
            {m.cartilage && (
              <path
                data-cartilage
                className="bio019-thick-line"
                d={
                  part === "trachea"
                    ? "M260 91A110 110 0 1 0 260 239"
                    : "M260 91A110 110 0 0 0 123 71M85 104A110 110 0 0 0 83 225M117 257A110 110 0 0 0 260 239"
                }
              />
            )}
            <path
              data-smooth-muscle
              className="bio019-thin"
              d="M246 111A84 84 0 1 0 246 219"
            />
            {Array.from({ length: 10 }, (_, i) => {
              const a = (i * Math.PI) / 5;
              return (
                <path
                  key={i}
                  data-cilium
                  className="bio019-guide"
                  d={`M${180 + 70 * Math.cos(a)} ${165 + 70 * Math.sin(a)}L${180 + 60 * Math.cos(a)} ${165 + 60 * Math.sin(a)}`}
                />
              );
            })}
            <path className="bio019-leader" d="M180 50V25H40" />
            <text x="25" y="32">
              Duvar
            </text>
            <text x="85" y="325">
              {airwayParts019[part]}
            </text>
            <text x="25" y="365">
              Kıkırdak: {m.cartilage ? "var" : "yok"}
            </text>
          </g>
        )}
      </Drawing>
      <Key>
        <p>
          Alveol: tip I ince yüzey; tip II sürfaktan katkısı. Kan lümeni, hava
          lümeni ve bariyer ayrı bölmelerdir.
        </p>
        <p>
          İletim kesiti: içte silli epitel, çevrede düz kas; kıkırdak seçilen
          yapıya göre görünür. Trakede C biçimli, bronşun bu kesitinde parçalı
          kıkırdak destek gösterilir. Geometri ölçekli anatomi değildir.
        </p>
      </Key>
      <Result>
        <strong>{line}</strong>
        <p>
          Kıkırdak: {m.cartilage ? "var" : "yok"}. Sürfaktan katkısı:{" "}
          {m.surfactant ? "var" : "bu bölümün görevi değil"}.
        </p>
        <p>
          Yalnız alveol için J=A×ΔP/T ve k=1. Bu katsayı gerçek ölçüm değildir;
          değişim için bir kıyastır.
        </p>
      </Result>
      <Prediction
        id="solunum-organlar"
        context={`${part}|${m.area}|${m.thickness}|${m.gradient}`}
        options={[
          ["in", "Alveolden kana"],
          ["out", "Kandan alveole"],
          ["zero", "Net fark yok"],
          ["conduct", "İletim yolu"],
        ]}
        expected={
          !m.gasSurface
            ? "conduct"
            : m.gradient > 0
              ? "in"
              : m.gradient < 0
                ? "out"
                : "zero"
        }
        explanation={line}
      />
    </>
  );
}
function VentilationLab() {
  const [s, set] = useExploration("forge019-bio-soluk-alisverisi", {
    phase: "inhale",
    tidal: 500,
    dead: 150,
    rate: 12,
    resistance: 1,
  });
  const phase = safe(s.phase, breathingPhases019, "inhale"),
    tidal = bound(s.tidal, 200, 800),
    m = ventilation019(
      phase,
      tidal,
      bound(s.dead, 0, tidal),
      bound(s.rate, 6, 30),
      bound(s.resistance, 1, 4),
    );
  const y = m.diaphragmLow ? 260 : 220;
  const lungBase = m.diaphragmLow ? y - 10 : y - 65;
  const lungControl = m.diaphragmLow ? y - 5 : y - 60;
  const line = `Net akış: ${n(m.flow)}; alveoler yeni hava: ${n(m.alveolarMinute)} L/dakika.`;
  return (
    <>
      <p>
        Bir soluk evresini elle seç. Verilen anlık basınç örneğiyle yönü; tidal
        hacim ve ölü boşlukla dakika hacimlerini ayrı hesapla.
      </p>
      <div className="bio019-controls">
        <Choice
          label="Soluk evresi"
          value={phase}
          options={entries(breathingPhases019)}
          onChange={(phase) => set({ phase })}
        />
        <Range
          label="Tidal hacim (mL)"
          value={m.tidal}
          min={200}
          max={800}
          step={50}
          onChange={(tidal) => set({ tidal, dead: Math.min(s.dead, tidal) })}
        />
        <Range
          label="Ölü boşluk (mL)"
          value={m.dead}
          min={0}
          max={m.tidal}
          step={10}
          onChange={(dead) => set({ dead })}
        />
        <Range
          label="Dakikada soluk"
          value={m.rate}
          min={6}
          max={30}
          onChange={(rate) => set({ rate })}
        />
        <Range
          label="Model direnç R"
          value={m.resistance}
          min={1}
          max={4}
          onChange={(resistance) => set({ resistance })}
        />
      </div>
      <Drawing
        title="Seçili soluk evresinde göğüs kesiti, diyafram ve akış yönü"
        height={405}
      >
        <path
          className="bio019-organ"
          data-breath-shape="chest"
          d={`M30 88Q180 35 330 88L330 ${y + 15}Q180 ${y + 55} 30 ${y + 15}Z`}
        />
        <path
          className="bio019-organ"
          data-breath-shape="lungs"
          d={`M170 60H190V110Q245 75 282 145Q300 ${lungControl} 205 ${lungBase}L180 135L155 ${lungBase}Q60 ${lungControl} 78 145Q115 75 170 110Z`}
        />
        <path
          data-diaphragm-y={y}
          className="bio019-thick-line"
          data-breath-shape="diaphragm"
          d={`M35 ${y}Q180 ${m.diaphragmLow ? y + 28 : y - 70} 325 ${y}`}
        />
        <text x="16" y="33">
          Palv: {n(m.alveolarPressure)} cmH₂O
        </text>
        {m.flow !== 0 && (
          <Arrow
            kind="air"
            x1={180}
            y1={m.flow > 0 ? 45 : 111}
            x2={180}
            y2={m.flow > 0 ? 111 : 45}
          />
        )}
        <text x="25" y="325">
          Diyafram: {m.diaphragmLow ? "aşağı" : "yukarı"}
        </text>
        <text x="25" y="365">
          Q = {n(m.flow)}
        </text>
      </Drawing>
      <div className="bio019-volume-bars">
        <label>
          Toplam: {n(m.minute)} L/dakika
          <meter min={0} max={24} value={m.minute} />
        </label>
        <label>
          Alveoler: {n(m.alveolarMinute)} L/dakika
          <meter min={0} max={24} value={m.alveolarMinute} />
        </label>
      </div>
      <Key>
        <p>
          Patm=0 göreli referanstır. İçe Q pozitif, dışa negatif;
          Q=(Patm−Palv)/R. Evreler temsilî anlık örneklerdir, sürekli basınç
          değişimini ölçmez.
        </p>
      </Key>
      <Result>
        <strong>{line}</strong>
        <p>
          Toplam: {n(m.minute)} L/dakika. (Vt−Vd)×f/1.000={n(m.alveolarMinute)}{" "}
          L/dakika. Yüksek son hacimde basınç eşitse net akış durabilir.
        </p>
      </Result>
      <Prediction
        id="soluk-alisverisi"
        context={`${phase}|${m.tidal}|${m.dead}|${m.rate}|${m.resistance}`}
        options={[
          ["in", "İçe akış"],
          ["out", "Dışa akış"],
          ["zero", "Net akış yok"],
        ]}
        expected={m.flow > 0 ? "in" : m.flow < 0 ? "out" : "zero"}
        explanation={line}
      />
    </>
  );
}
function GasesLab() {
  const [s, set] = useExploration("forge019-bio-solunum-gaz-tasinmasi", {
    location: "tissue",
    hb: 10,
    saturation: 75,
    co2: 200,
    pressure: 40,
    affinity: "normal",
  });
  const location = safe(s.location, gasLocations019, "tissue"),
    affinity = safe(s.affinity, affinityStates019, "normal"),
    m = gases019(
      location,
      Math.round(bound(s.hb, 1, 12)),
      bound(s.saturation, 0, 100),
      bound(s.co2, 0, 200),
    ),
    curve = oxygenCurve019(bound(s.pressure, 0, 100), affinity);
  const line = `Bağlı O₂: ${n(m.bound)}; kapasite: ${n(m.capacity)} model birimi.`;
  const path = Array.from({ length: 101 }, (_, i) => {
    const p = oxygenCurve019(i, affinity);
    return `${i === 0 ? "M" : "L"}${55 + i * 2.65},${215 - p.saturation * 1.6}`;
  }).join("");
  return (
    <>
      <p>
        Kan proteini{" "}
        <abbr title="Hemoglobin" aria-label="Hemoglobin">
          Hb
        </abbr>{" "}
        için dört O₂ yerini ve ortalama doluluğu izle. Doku veya akciğer seçimi
        HCO₃⁻ ve Cl⁻ yönlerini çevirir; toplam CO₂ payları ayrı hesaplanır.
      </p>
      <div className="bio019-controls">
        <Choice
          label="Kılcal bölgesi"
          value={location}
          options={entries(gasLocations019)}
          onChange={(location) => set({ location })}
        />
        <Range
          label="Hb sayısı N"
          value={m.hb}
          min={1}
          max={12}
          onChange={(hb) => set({ hb })}
        />
        <Range
          label="Ortalama doluluk (%)"
          value={m.saturation}
          min={0}
          max={100}
          step={5}
          onChange={(saturation) => set({ saturation })}
        />
        <Range
          label="Toplam CO₂ birimi"
          value={m.co2}
          min={0}
          max={200}
          step={10}
          onChange={(co2) => set({ co2 })}
        />
      </div>
      <Drawing
        title="Bir hemoglobinde dört O₂ yeri ve eritrosit–plazma iyon yönleri"
        height={400}
      >
        <rect
          className="bio019-cell"
          x="65"
          y="30"
          width="230"
          height="145"
          rx="65"
        />
        {[
          [120, 75],
          [240, 75],
          [120, 130],
          [240, 130],
        ].map(([x, y], i) => (
          <g key={i} data-hb-site={i + 1}>
            <circle className="bio019-organ" cx={x} cy={y} r="23" />
            <circle
              data-occupancy={m.saturation}
              className="bio019-red"
              cx={x}
              cy={y}
              r={18 * Math.sqrt(m.saturation / 100)}
            />
          </g>
        ))}
        <text x="75" y="210">
          4 yer × {m.hb} Hb
        </text>
        <rect
          className="bio019-organ"
          x="14"
          y="235"
          width="140"
          height="150"
          rx="12"
        />
        <text x="30" y="270">
          Eritrosit
        </text>
        <rect
          className="bio019-organ"
          x="212"
          y="235"
          width="134"
          height="150"
          rx="12"
        />
        <text x="224" y="270">
          Plazma
        </text>
        <text className="bio019-small" x="145" y="306">
          HCO₃⁻
        </text>
        <Arrow
          kind="bicarbonate"
          x1={m.bicarbonateOut ? 120 : 237}
          y1={324}
          x2={m.bicarbonateOut ? 237 : 120}
          y2={324}
        />
        <text className="bio019-small" x="164" y="358">
          Cl⁻
        </text>
        <Arrow
          kind="chloride"
          x1={m.chlorideIn ? 237 : 120}
          y1={373}
          x2={m.chlorideIn ? 120 : 237}
          y2={373}
        />
      </Drawing>
      <Key>
        <p>
          Dört küçük yuva tek Hb’nin yerleridir. Dolgu ortalama doluluk oranını
          gösterir; her molekülde aynı yerler dolu olmak zorunda değildir. Kan
          bölmesi alveol lümeniyle aynı boşluk değildir.
        </p>
      </Key>
      <Result>
        <strong>{line}</strong>
        <p>
          CO₂: çözünmüş {n(m.dissolved)}, karbamino {n(m.carbamino)}, bikarbonat{" "}
          {n(m.bicarbonate)}. Toplam {n(m.co2)}.
        </p>
        <p>
          HCO₃⁻: {m.bicarbonateOut ? "alyuvar → plazma" : "plazma → alyuvar"};
          Cl⁻ ters yönde. O₂ net yönü:{" "}
          {m.oxygenToBlood ? "alveolden kana" : "kandan dokuya"}.
        </p>
      </Result>
      <div className="bio019-controls">
        <Range
          label="Eğride O₂ basıncı P"
          value={curve.pressure}
          min={0}
          max={100}
          onChange={(pressure) => set({ pressure })}
        />
        <Choice
          label="Aynı basınçta pH örneği"
          value={affinity}
          options={entries(affinityStates019)}
          onChange={(affinity) => set({ affinity })}
        />
      </div>
      <Drawing
        title="Açık oyuncak Hill eğrisinde O₂ basıncı ve doygunluk"
        height={300}
      >
        <path className="bio019-guide" d="M55 45V215H325" />
        <text className="bio019-small" x="6" y="53">
          100
        </text>
        <text className="bio019-small" x="23" y="222">
          0
        </text>
        <text className="bio019-small" x="296" y="250">
          100
        </text>
        <text className="bio019-small" x="63" y="30">
          Doluluk (%)
        </text>
        <text className="bio019-small" x="65" y="285">
          O₂ basıncı (model)
        </text>
        <path data-oxygen-curve={affinity} className="bio019-micro" d={path} />
        <circle
          data-curve-saturation={curve.saturation}
          className="bio019-red"
          cx={55 + curve.pressure * 2.65}
          cy={215 - curve.saturation * 1.6}
          r="7"
        />
      </Drawing>
      <p>
        Grafik: S=100P³/(P³+P₅₀³), P₅₀={curve.p50}. P={n(curve.pressure)} için
        doluluk %{n(curve.saturation)}. Bu eğri ayrı oyuncak modeldir; üst
        paneldeki elle seçilen doluluğu değiştirmez.
      </p>
      <Prediction
        id="solunum-gaz-tasinmasi"
        context={`${location}|${m.hb}|${m.saturation}|${m.co2}|${curve.pressure}|${affinity}`}
        options={[
          ["out", "Bikarbonat eritrositten çıkar"],
          ["in", "Bikarbonat eritrosite girer"],
        ]}
        expected={m.bicarbonateOut ? "out" : "in"}
        explanation={`Seçili ${gasLocations019[location].toLocaleLowerCase("tr-TR")} için HCO₃⁻ ${m.bicarbonateOut ? "dışarı" : "içeri"}; Cl⁻ ters yöndedir.`}
      />
    </>
  );
}
function UrinaryLab() {
  const [s, set] = useExploration("forge019-bio-uriner-organlar", {
    block: "none",
    left: 1,
    right: 1,
    minutes: 10,
    initial: 50,
    outlet: 0,
  });
  const block = safe(s.block, urinaryBlocks019, "none"),
    m = urinary019(
      block,
      bound(s.left, 0, 3),
      bound(s.right, 0, 3),
      bound(s.minutes, 1, 20),
      bound(s.initial, 0, 200),
      bound(s.outlet, 0, 10),
    );
  const line = `Son mesane: ${n(m.final)} mL; gerçek çıkış: ${n(m.actualOut)} mL.`;
  return (
    <>
      <p>
        İki böbreğin üretimi, iki üreterin teslimi ve üretranın çıkışı ayrı
        yollardır. Kısa modelde üretim sabit; kapalı yolun üstünde kalan sıvı
        ayrıca izlenir. Açık çıkış mevcut sıvıyı süre içindeki kapasite sınırına
        kadar bütünüyle uzaklaştırır.
      </p>
      <div className="bio019-controls">
        <Choice
          label="Seçici engel"
          value={block}
          options={entries(urinaryBlocks019)}
          onChange={(block) => set({ block })}
        />
        <Range
          label="Sol üretim (mL/dakika)"
          value={bound(s.left, 0, 3)}
          min={0}
          max={3}
          step={0.5}
          onChange={(left) => set({ left })}
        />
        <Range
          label="Sağ üretim (mL/dakika)"
          value={bound(s.right, 0, 3)}
          min={0}
          max={3}
          step={0.5}
          onChange={(right) => set({ right })}
        />
        <Range
          label="Süre (dakika)"
          value={bound(s.minutes, 1, 20)}
          min={1}
          max={20}
          onChange={(minutes) => set({ minutes })}
        />
        <Range
          label="Başlangıç mesane (mL)"
          value={bound(s.initial, 0, 200)}
          min={0}
          max={200}
          step={5}
          onChange={(initial) => set({ initial })}
        />
        <Range
          label="Çıkış kapasitesi (mL/dakika)"
          value={bound(s.outlet, 0, 10)}
          min={0}
          max={10}
          onChange={(outlet) => set({ outlet })}
        />
      </div>
      <Drawing
        title="Şematik üriner yolda anatomik sol ve sağ böbrek, iki üreter ve üretra"
        height={420}
      >
        <path
          data-kidney="right"
          className="bio019-organ"
          d="M83 35C20 30 20 145 85 145Q122 136 91 104Q72 90 94 74Q121 45 83 35Z"
        />
        <path
          data-kidney="left"
          className="bio019-organ"
          d="M277 35C340 30 340 145 275 145Q238 136 269 104Q288 90 266 74Q239 45 277 35Z"
        />
        <text x="20" y="182" data-urinary-side="right">
          Sağ
        </text>
        <text x="285" y="182" data-urinary-side="left">
          Sol
        </text>
        <path
          className="bio019-thin"
          d="M91 104V218Q91 241 155 260M269 104V218Q269 241 205 260"
        />
        <Arrow
          kind="right-ureter"
          x1={91}
          y1={182}
          x2={91}
          y2={224}
          active={block !== "right"}
        />
        <Arrow
          kind="left-ureter"
          x1={269}
          y1={182}
          x2={269}
          y2={224}
          active={block !== "left"}
        />
        {(block === "left" || block === "right") && (
          <path
            data-ureter-stop={block}
            className="bio019-gate"
            d={`M${block === "left" ? 250 : 72} 208h38`}
          />
        )}
        <ellipse className="bio019-organ" cx="180" cy="285" rx="64" ry="44" />
        <text x="129" y="293">
          Mesane
        </text>
        <path className="bio019-thin" d="M180 329V386" />
        <Arrow
          kind="urethra"
          x1={180}
          y1={343}
          x2={180}
          y2={382}
          active={block !== "urethra" && m.actualOut > 0}
        />
        {block === "urethra" && (
          <path data-urethra-stop className="bio019-gate" d="M160 355H200" />
        )}
        <text x="211" y="370">
          Üretra
        </text>
      </Drawing>
      <Key>
        <p>
          Önden görünüm: kişinin sağı sayfanın solunda. İnce yeşil yollar
          üreterler; mesanenin altındaki tek çıkış üretradır. Kan damarları,
          idrar kanalları ile aynı yol değildir.
        </p>
      </Key>
      <Result>
        <strong>{line}</strong>
        <p>
          Üretilen: sol {n(m.leftProduced)}, sağ {n(m.rightProduced)} mL.
          Mesaneye ulaşan: sol {n(m.leftDelivered)}, sağ {n(m.rightDelivered)}{" "}
          mL.
        </p>
        <p>
          Engel üstünde kalan: {n(m.upstream)} mL. Son = ilk hacim + teslim −
          gerçek çıkış. Çıkış mevcut sıvıdan fazla olamaz.
        </p>
      </Result>
      <Prediction
        id="uriner-organlar"
        context={`${block}|${s.left}|${s.right}|${s.minutes}|${s.initial}|${s.outlet}`}
        options={[
          ["up", "Engel üstünde sıvı kalır"],
          ["none", "Engel üstünde sıvı kalmaz"],
        ]}
        expected={m.upstream > 0 ? "up" : "none"}
        explanation={`Bu sabit üretim modelinde engel üstünde ${n(m.upstream)} mL kalır. Üretra engeli ise mesane çıkışını kapatır; aynı üst-yol ölçüsü değildir.`}
      />
    </>
  );
}
function NephronLab() {
  const [s, set] = useExploration("forge019-bio-nefron-isleyisi", {
    part: "collecting",
    adh: false,
    concentration: 2,
    gfr: 100,
    capacity: 300,
    filtered: 100,
    secreted: 20,
    reabsorbed: 90,
  });
  const part = safe(s.part, nephronParts019, "collecting"),
    m = nephron019(
      part,
      s.adh,
      bound(s.concentration, 0, 5),
      bound(s.gfr, 50, 150),
      bound(s.capacity, 0, 400),
    );
  const filtered = bound(s.filtered, 0, 200),
    secreted = bound(s.secreted, 0, 50),
    balance = renalBalance019(
      filtered,
      secreted,
      bound(s.reabsorbed, 0, filtered + secreted),
    );
  const segments = [
    ["proximal", "M90 80Q130 20 165 80Q175 110 155 130"],
    ["descending", "M155 130V315"],
    ["ascending", "M155 315Q205 365 255 315V145"],
    ["earlyDistal", "M255 145Q225 100 280 95"],
    ["collecting", "M280 95H315V360"],
  ] as const;
  const location = {
    proximal: [155, 115],
    descending: [155, 215],
    ascending: [255, 215],
    earlyDistal: [260, 120],
    collecting: [315, 250],
  }[part];
  const line = `Glikoz: ${n(m.filtered)} süzülen; ${n(m.reabsorbed)} geri alınan; ${n(m.excreted)} atılan mg / dakika.`;
  return (
    <>
      <p>
        Önce bölge ve ADH ile su yolunu keşfet. Ayrı glikoz panelinde bütün
        basit geri emilim kapasitesini; son panelde F+S−R hesabını dene.
      </p>
      <div className="bio019-controls">
        <Choice
          label="Nefron bölgesi"
          value={part}
          options={entries(nephronParts019)}
          onChange={(part) => set({ part })}
        />
        <Check
          label="ADH etkisi var"
          checked={s.adh}
          onChange={(adh) => set({ adh })}
        />
        <Range
          label="Glikoz (mg/mL)"
          value={m.concentration}
          min={0}
          max={5}
          step={0.5}
          onChange={(concentration) => set({ concentration })}
        />
        <Range
          label="GFR (mL/dakika)"
          value={m.gfr}
          min={50}
          max={150}
          step={10}
          onChange={(gfr) => set({ gfr })}
        />
        <Range
          label="Tm (mg / dakika)"
          value={m.capacity}
          min={0}
          max={400}
          step={50}
          onChange={(capacity) => set({ capacity })}
        />
      </div>
      <Drawing
        title="Nefronun sıralı tüp bölgeleri ve seçili bölgenin su geçirgenliği"
        height={410}
      >
        <circle className="bio019-organ" cx="60" cy="80" r="37" />
        <circle className="bio019-red" cx="60" cy="80" r="21" />
        <text x="18" y="28">
          G / B
        </text>
        {segments.map(([key, d]) => (
          <path
            key={key}
            data-nephron-region={key}
            data-selected={key === part}
            className={key === part ? "bio019-thick-line" : "bio019-faded"}
            d={d}
          />
        ))}
        <text x="111" y="125">
          1
        </text>
        <text x="121" y="224">
          2
        </text>
        <text x="267" y="224">
          3
        </text>
        <text x="267" y="75">
          4
        </text>
        <text x="328" y="190">
          5
        </text>
        <g data-water-permeable={m.waterPermeable}>
          <Arrow
            kind="water"
            x1={location[0]}
            y1={location[1]}
            x2={location[0] - 48}
            y2={location[1]}
            active={m.waterPermeable}
          />
        </g>
        <text x="22" y="385">
          Su yolu: {m.waterPermeable ? "açık" : "düşük"}
        </text>
      </Drawing>
      <Key>
        <p>
          G/B: glomerulus ve Bowman. 1 proksimal; 2 inen Henle; 3 çıkan Henle; 4
          erken distal; 5 geç distal ve toplama yolu. Şema ölçekli değildir,
          toplama yoluna başka nefronlar da katılır.
        </p>
        <p>
          Su oku tüpten dışarı yönelir; yalnız geçirgenlik koşulunu gösterir.
          Gerçek su miktarı için çevre gradyanı da gerekir. ADH seçimi glikoz Tm
          hesabından bağımsızdır.
        </p>
      </Key>
      <Drawing
        title="Glikoz yükünde süzülen, geri alınan ve atılan miktarların ortak ölçeği"
        height={300}
      >
        <text className="bio019-small" x="16" y="30">
          Glikoz (mg / dakika)
        </text>
        {[
          ["F", m.filtered],
          ["R", m.reabsorbed],
          ["E", m.excreted],
        ].map(([key, value], i) => (
          <g key={key}>
            <text className="bio019-small" x="15" y={78 + i * 60}>
              {key} {n(Number(value))}
            </text>
            <rect
              data-glucose-load={key}
              className="bio019-bar"
              x="125"
              y={57 + i * 60}
              width={(Number(value) * 200) / 750}
              height="24"
            />
          </g>
        ))}
        <path className="bio019-guide" d="M125 230H325" />
        <text className="bio019-small" x="120" y="263">
          0
        </text>
        <text className="bio019-small" x="281" y="263">
          750
        </text>
      </Drawing>
      <p>
        Ortak ölçek: F süzülen yük, R geri alınan, E atılan glikoz. Sıfır yükte
        çubuk sıfır genişlik taşır; kapasite üst sınırı gerçek geri alımla aynı
        değildir.
      </p>
      <Result>
        <strong>{line}</strong>
        <p>
          Seçili su yolu: {m.waterPermeable ? "geçirgen" : "düşük geçirgenlik"}.
          ADH’ye yanıt:{" "}
          {m.adhResponsive ? "bu geç bölgede var" : "bu modeldeki hedef değil"}.
        </p>
        <p>
          Süzülen=C×GFR. Geri alınan=min(yük,Tm); salgılama 0. Kapasite aşılırsa
          geri emilim durmaz.
        </p>
      </Result>
      <details>
        <summary>Üç işlem hesabını da dene</summary>
        <div className="bio019-controls">
          <Range
            label="Süzülen F (mg / dakika)"
            value={filtered}
            min={0}
            max={200}
            step={10}
            onChange={(filtered) =>
              set({
                filtered,
                reabsorbed: Math.min(s.reabsorbed, filtered + secreted),
              })
            }
          />
          <Range
            label="Salgılanan S (mg / dakika)"
            value={secreted}
            min={0}
            max={50}
            step={5}
            onChange={(secreted) =>
              set({
                secreted,
                reabsorbed: Math.min(s.reabsorbed, filtered + secreted),
              })
            }
          />
          <Range
            label="Geri alınan R (mg / dakika)"
            value={balance.reabsorbed}
            min={0}
            max={filtered + secreted}
            step={5}
            onChange={(reabsorbed) => set({ reabsorbed })}
          />
        </div>
        <output data-renal-balance>
          Atılan=F+S−R={n(balance.excreted)} mg / dakika. Bu, ayrı bir maddenin
          için giriş ve çıkış hesabıdır; üstteki glikoz panelinin sonucu yerine
          geçmez.
        </output>
      </details>
      <Prediction
        id="nefron-isleyisi"
        context={`${part}|${m.adh}|${m.concentration}|${m.gfr}|${m.capacity}`}
        options={[
          ["excess", "Glikozun bir kısmı atılır"],
          ["none", "Glikoz atılımı sıfır"],
        ]}
        expected={m.excreted > 0 ? "excess" : "none"}
        explanation={line}
      />
    </>
  );
}
function MaleLab() {
  const [s, set] = useExploration("forge019-bio-erkek-ureme-organlari", {
    stage: "primary",
    primaries: 3,
    vasOpen: true,
    signal: "lh",
  });
  const stage = safe(s.stage, spermStages019, "primary"),
    signal = safe(s.signal, maleSignals019, "lh"),
    m = male019(stage, Math.round(bound(s.primaries, 1, 4)), s.vasOpen, signal);
  const line = `${m.cells} hücre; hücre başına ${m.chromosomes} kromozom ve ${m.dna}C DNA.`;
  const rows = Math.ceil(m.cells / 4),
    gap = stage === "sperm" ? 100 : 75,
    height = 100 + rows * gap;
  return (
    <>
      <p>
        Mayoz I öncesi birincil hücreden son ürüne geç. Hücre sayısı, kromozom
        ve DNA’yı ayrı izle; seçici kanal engelini kanla hormon çıkışıyla
        karıştırma.
      </p>
      <p>
        <abbr title="Testosteron" aria-label="Testosteron">
          T
        </abbr>
        : erkek eşey hormonu.
      </p>
      <div className="bio019-controls">
        <Choice
          label="Gelişim evresi"
          value={stage}
          options={entries(spermStages019)}
          onChange={(stage) => set({ stage })}
        />
        <Range
          label="Başlangıç birincil hücre"
          value={m.primaries}
          min={1}
          max={4}
          onChange={(primaries) => set({ primaries })}
        />
        <Check
          label="Vas deferens yolu açık"
          checked={s.vasOpen}
          onChange={(vasOpen) => set({ vasOpen })}
        />
        <Choice
          label="İzlenen hormon kolu"
          value={signal}
          options={entries(maleSignals019)}
          onChange={(signal) => set({ signal })}
        />
      </div>
      <Drawing
        title="Kayıpsız gelişim modelinde gerçek hücre sayısı, DNA ve farklılaşma"
        height={height}
      >
        <text x="20" y="37">
          {m.cells} hücre × {m.dna}C
        </text>
        {Array.from({ length: m.cells }, (_, i) => {
          const x = 50 + (i % 4) * 85,
            y = 90 + Math.floor(i / 4) * gap;
          return (
            <g key={i} data-sperm-cell={stage} data-dna={m.dna}>
              <ellipse
                className="bio019-cell"
                cx={x}
                cy={y}
                rx={stage === "sperm" ? 15 : 27}
                ry={stage === "sperm" ? 20 : 27}
              />
              <circle className="bio019-dot" cx={x} cy={y} r="10" />
              {stage === "sperm" && (
                <path
                  data-flagellum
                  className="bio019-micro"
                  d={`M${x} ${y + 20}q12 12 0 23t0 20`}
                />
              )}
            </g>
          );
        })}
      </Drawing>
      <Key>
        <p>
          Her dış çevre tek hücredir; iç nokta çekirdeği simgeler. Kromozom
          sayısı çizilen nokta sayısı değildir. Birincil 2n/4C; ikincil n/2C;
          spermatit ve sperm n/1C. Son şekil değişimi yeni bölünme değildir.
        </p>
      </Key>
      <Drawing
        title="Sperm taşıma yolu ile hormonun kan yolu ayrı çıkışlardır"
        height={355}
      >
        <rect
          className="bio019-organ"
          x="20"
          y="20"
          width="320"
          height="67"
          rx="12"
        />
        <text x="35" y="62">
          Testis
        </text>
        <text
          data-hormone-cell={
            signal === "lh" || signal === "testosterone" ? "leydig" : "sertoli"
          }
          x="190"
          y="62"
        >
          {signal === "lh" || signal === "testosterone" ? "Leydig" : "Sertoli"}
        </text>
        <g data-hormone-route={signal}>
          <Arrow
            kind="hormone"
            x1={280}
            y1={signal === "lh" || signal === "fsh" ? 143 : 88}
            x2={280}
            y2={signal === "lh" || signal === "fsh" ? 88 : 143}
          />
          <rect
            className="bio019-organ"
            x="235"
            y="148"
            width="110"
            height="65"
            rx="10"
          />
          <text x="260" y="189">
            Kan
          </text>
          <text className="bio019-small" x="263" y="245">
            {signal === "lh"
              ? "LH"
              : signal === "fsh"
                ? "FSH"
                : signal === "inhibin"
                  ? "İnh."
                  : "Test."}
          </text>
        </g>
        <Arrow
          kind="epididymis"
          x1={125}
          y1={87}
          x2={125}
          y2={113}
          active={stage === "sperm"}
        />
        <rect
          className="bio019-organ"
          x="20"
          y="116"
          width="200"
          height="62"
          rx="12"
        />
        <text x="40" y="157">
          Epididimis
        </text>
        <g data-vas-open={m.vasOpen}>
          <Arrow
            kind="vas"
            x1={125}
            y1={178}
            x2={125}
            y2={225}
            active={m.vasOpen && stage === "sperm"}
          />
          {!m.vasOpen && <path className="bio019-gate" d="M103 204H147" />}
        </g>
        <text x="160" y="213">
          Vas
        </text>
        <rect
          className="bio019-organ"
          x="20"
          y="230"
          width="200"
          height="62"
          rx="12"
        />
        <text x="35" y="270">
          Ejakülasyon
        </text>
        <Arrow
          kind="urethra"
          x1={125}
          y1={292}
          x2={125}
          y2={334}
          active={m.transportShown}
        />
        <text x="160" y="332">
          Üretra
        </text>
      </Drawing>
      <Result>
        <strong>{line}</strong>
        <p>
          Toplam DNA: {m.totalDna}C. Bu modelde bütün ilk hücreler kayıpsız
          ilerler, mayozlar arasında yeni eşlenme olmaz.
        </p>
        <p>
          Son sperm teslimi:{" "}
          {stage !== "sperm"
            ? "bu erken evrede yer almaz"
            : m.transportShown
              ? "yol açık"
              : "vas yolunda engelli"}
          . Kanla hormon çıkışı seçici modelde korunur.
        </p>
        <p>
          {signal === "lh"
            ? "LH → Leydig → T hormonu."
            : signal === "fsh"
              ? "FSH → Sertoli → gamet yapımına destek."
              : signal === "inhibin"
                ? "Sertoli → inhibin → ön hipofizde FSH kolu azalır."
                : "T hormonu → hipotalamus ve ön hipofizde negatif geri bildirim."}
        </p>
      </Result>
      <Prediction
        id="erkek-ureme-organlari"
        context={`${stage}|${m.primaries}|${m.vasOpen}|${signal}`}
        options={[
          ["same", "Toplam DNA başlangıçla aynı"],
          ["double", "Toplam DNA iki kat"],
          ["zero", "Toplam DNA sıfır"],
        ]}
        expected="same"
        explanation={`Başlangıç ${m.primaries}×4C=${m.primaries * 4}C; seçili evrede ${m.cells}×${m.dna}C=${m.totalDna}C. Son gelişim yeni DNA eşlenmesi değildir.`}
      />
    </>
  );
}
const labs: Record<string, () => ReactNode> = {
  "solunum-organlar": AirwayLab,
  "soluk-alisverisi": VentilationLab,
  "solunum-gaz-tasinmasi": GasesLab,
  "uriner-organlar": UrinaryLab,
  "nefron-isleyisi": NephronLab,
  "erkek-ureme-organlari": MaleLab,
};
export default function Forge019BiologyLab({ lessonId }: { lessonId: string }) {
  const Lab = labs[lessonId];
  return Lab ? (
    <section className="bio019" data-forge019={lessonId}>
      <h3>Değiştir, öngör, kanıtı incele</h3>
      <Lab />
      <p className="muted">
        Bu keşif XP, doğru cevap ya da konu bitiş kaydı eklemez. Gerekçen ve
        seçimin bu cihazda saklanır.
      </p>
    </section>
  ) : null;
}
