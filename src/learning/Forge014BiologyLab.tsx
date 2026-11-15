import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  cycleLabels,
  cycleProcesses,
  cycleTransfer,
  foodLabels,
  foodNodes,
  foodWebSnapshot,
  lakeSnapshot,
  pondSelection,
  pyramidSnapshot,
  reservoirLabels,
  resourceBudget,
  type CycleKind,
  type FoodNode,
  type LakeIntervention,
  type PyramidKind,
} from "./forge014Biology";
import "./forge014Biology.css";

const bounded = (value: number, min: number, max: number) =>
  Number.isFinite(value)
    ? Math.max(min, Math.min(max, Math.round(value)))
    : min;
const number = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(n);
function Drawing({
  title,
  children,
  height = 360,
  maxWidth,
}: {
  title: string;
  children: ReactNode;
  height?: number;
  maxWidth?: number;
}) {
  const id = useId();
  return (
    <svg
      className="bio014-drawing"
      viewBox={`0 0 360 ${height}`}
      role="img"
      aria-labelledby={id}
      style={maxWidth ? { maxWidth, marginInline: "auto" } : undefined}
    >
      <title id={id}>{title}</title>
      {children}
    </svg>
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
  const id = useId();
  return (
    <div className="bio014-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
      />
      <output htmlFor={id}>{number(value)}</output>
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
  const id = useId();
  return (
    <div className="bio014-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
      <output htmlFor={id} className="bio014-current-choice">
        Seçili: {options.find(([key]) => key === value)?.[1]}
      </output>
    </div>
  );
}
function Prediction({
  id,
  context,
  expected,
  options,
  explanation,
}: {
  id: string;
  context: string;
  expected: string;
  options: [string, string][];
  explanation: string;
}) {
  const uid = useId();
  const [s, set] = useExploration(`forge014-bio-prediction-${id}`, {
    answer: "",
    reason: "",
    checked: false,
    context: "",
  });
  const selected = options.find(([key]) => key === s.answer);
  return (
    <div className="bio014-prediction">
      <label htmlFor={uid + "-answer"}>Sonuç tahminin</label>
      <select
        id={uid + "-answer"}
        value={selected ? s.answer : ""}
        onChange={(e) => set({ answer: e.target.value, checked: false })}
      >
        <option value="">Bir sonuç seç</option>
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
      <output
        htmlFor={uid + "-answer"}
        className="bio014-current-choice"
        data-selected-prediction
      >
        {selected
          ? `Seçili tahmin: ${selected[1]}`
          : "Henüz bir tahmin seçilmedi."}
      </output>
      <label htmlFor={uid + "-reason"}>Gerekçen</label>
      <textarea
        id={uid + "-reason"}
        maxLength={120}
        rows={3}
        value={s.reason.slice(0, 120)}
        onChange={(e) =>
          set({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        className="secondary"
        disabled={!selected || !s.reason.trim()}
        onClick={() => set({ checked: true, context })}
      >
        Tahminimi karşılaştır
      </button>
      {s.checked && s.context === context && selected && (
        <div className="bio014-feedback" role="status">
          <strong>
            {s.answer === expected
              ? "Seçimin bu modeldeki kanıtla uyumlu."
              : "Seçimini kanıtla yeniden karşılaştır."}
          </strong>
          <p>{explanation}</p>
          <p>
            Bu keşif doğru soru, XP veya konu tamamlama kaydı oluşturmaz.
            Gerekçen otomatik puanlanmaz.
          </p>
        </div>
      )}
    </div>
  );
}
function Pond() {
  const uid = useId();
  const [s, set] = useExploration("forge014-bio-ekoloji-giris", {
    count: 1,
    otherSpecies: false,
    abiotic: false,
  });
  const count = bounded(s.count, 1, 20),
    m = pondSelection(count, s.otherSpecies, s.abiotic);
  return (
    <>
      <h3>Gölete hangi ölçekte bakıyorsun?</h3>
      <p>
        Yeşil halkalar aynı türün kurbağalarıdır. Alg ve bakteri gruplarını,
        sonra etkileşen cansız çevreyi ekle. Çizim seçilen bileşenlerin
        kesitidir; göletin eksiksiz sayımı değildir.
      </p>
      <div className="bio014-controls">
        <Range
          label="Aynı türden kurbağa sayısı"
          min={1}
          max={20}
          value={count}
          onChange={(count) => set({ count })}
        />
        <label className="bio014-check" htmlFor={uid + "-species"}>
          <input
            id={uid + "-species"}
            type="checkbox"
            checked={s.otherSpecies}
            onChange={(e) => set({ otherSpecies: e.target.checked })}
          />
          <span>Alg ve bakteri popülasyonlarını ekle</span>
        </label>
        <label className="bio014-check" htmlFor={uid + "-abiotic"}>
          <input
            id={uid + "-abiotic"}
            type="checkbox"
            checked={s.abiotic}
            onChange={(e) => set({ abiotic: e.target.checked })}
          />
          <span>Su, ışık ve pH etkileşimlerini ekle</span>
        </label>
      </div>
      <Drawing
        title={`${m.level}: ${count} kurbağa; ${s.otherSpecies ? "alg ve bakteri grupları var" : "başka tür grubu seçilmedi"}; ${s.abiotic ? "su, ışık ve pH katmanı var" : "cansız katman kapalı"}`}
      >
        {s.abiotic && (
          <g data-abiotic-layer>
            <path
              d="M12 160Q60 145 100 160T190 160T280 160T348 160V345H12Z"
              className="bio014-water"
            />
            <circle cx="300" cy="50" r="25" className="bio014-sun" />
            <path d="M300 88L275 135M268 65L230 85" className="bio014-line" />
          </g>
        )}
        <path d="M20 330Q180 280 340 330" className="bio014-line" />
        {Array.from({ length: count }, (_, i) => (
          <g
            key={i}
            data-pond-frog
            transform={`translate(${44 + (i % 5) * 64} ${130 + Math.floor(i / 5) * 48})`}
          >
            <circle r="15" className="bio014-live" />
            <circle cx="-7" cy="-12" r="5" className="bio014-organism" />
            <circle cx="7" cy="-12" r="5" className="bio014-organism" />
          </g>
        ))}
        {s.otherSpecies && (
          <g data-other-populations>
            <path
              d="M34 315Q20 280 35 260M35 292L18 280M35 300L55 277M300 320Q280 286 301 260M302 288L322 270"
              className="bio014-plant"
            />
            <ellipse
              cx="180"
              cy="320"
              rx="20"
              ry="9"
              className="bio014-organism"
            />
            <ellipse
              cx="225"
              cy="317"
              rx="15"
              ry="8"
              className="bio014-organism"
            />
          </g>
        )}
      </Drawing>
      <div className="bio014-result" data-model-result>
        <strong>İncelenen kapsam: {m.level}</strong>
        <p>
          Canlı bileşenlerin düzeyi: {m.biological}. Seçilen aynı tür bireyleri:{" "}
          {count}. Temsil edilen tür grubu: {m.species}.
        </p>
        <p>
          {s.abiotic
            ? "Cansız çevre etkileşimleri de seçildi: bu, ekosistemden bir kesittir. Tek kurbağa seçmek göletin bütün canlılarını saymış olmak değildir."
            : s.otherSpecies
              ? "Farklı türlerin popülasyonları birlikte seçildi; canlı topluluğu komünitedir."
              : count === 1
                ? "Tek birey organizmadır; tür kavramıyla aynı şey değildir."
                : "Aynı tür, yer ve zaman koşulu bu seçkide sağlandığı için popülasyon inceleniyor."}
        </p>
      </div>
      <Prediction
        id="ekoloji-giris"
        context={`${count}-${s.otherSpecies}-${s.abiotic}`}
        expected={
          s.abiotic
            ? "ecosystem"
            : s.otherSpecies
              ? "community"
              : count === 1
                ? "organism"
                : "population"
        }
        options={[
          ["organism", "Tek organizma"],
          ["population", "Aynı türün popülasyonu"],
          ["community", "Yalnız canlı komünitesi"],
          ["ecosystem", "Abiyotik etkileşimleri de içeren ekosistem kesiti"],
        ]}
        explanation="Birey sayısı, türlerin farklılığı ve cansız çevrenin araştırma kapsamına katılması ayrı eşiklerdir. Tür adı tek birey anlamına gelmez."
      />
    </>
  );
}
function Pyramid() {
  const [s, set] = useExploration("forge014-bio-besin-piramidi", {
    kind: "energy",
    efficiency: 10,
  });
  const kind: PyramidKind = ["energy", "number", "biomass"].includes(s.kind)
    ? (s.kind as PyramidKind)
    : "energy";
  const efficiency = bounded(s.efficiency, 5, 30),
    m = pyramidSnapshot(kind, efficiency),
    max = Math.max(...m.values);
  const labels =
    kind === "number"
      ? ["Meşe", "Tırtıl", "Kuş"]
      : kind === "biomass"
        ? ["Fitoplankton", "Otçul plankton", "Etçil plankton"]
        : ["Üretici", "Birincil tüketici", "İkincil tüketici"];
  return (
    <>
      <h3>Aynı şekil, üç farklı ölçüm</h3>
      <p>
        Genişlik seçilen nicelikle orantılıdır. Enerji için aynı alan ve yıl,
        biyokütle için tek an, sayı için birey sayımı kullanılıyor. Küçük
        değerler dar görünebilir; tam değerler metinde korunur.
      </p>
      <div className="bio014-controls">
        <Choice
          label="Piramit türü"
          value={kind}
          options={[
            ["energy", "Enerji üretimi"],
            ["number", "Birey sayısı"],
            ["biomass", "Anlık kuru biyokütle"],
          ]}
          onChange={(kind) => set({ kind })}
        />
        {kind === "energy" && (
          <Range
            label="Her aktarımda verim yüzdesi"
            min={5}
            max={30}
            value={efficiency}
            onChange={(efficiency) => set({ efficiency })}
          />
        )}
      </div>
      <Drawing
        title={`${kind === "energy" ? "Enerji" : kind === "number" ? "Sayı" : "Anlık biyokütle"} grafiği; alt düzeyden üste değerler ${m.values.map(number).join(", ")} ${m.unit}`}
        height={300}
      >
        {m.values.map((v, i) => (
          <rect
            key={i}
            data-pyramid-level={i + 1}
            data-value={v}
            x={180 - (300 * v) / max / 2}
            y={205 - i * 85}
            width={(300 * v) / max}
            height="60"
            className={
              i === 0
                ? "bio014-live"
                : i === 1
                  ? "bio014-organism"
                  : "bio014-sun"
            }
          />
        ))}
      </Drawing>
      <div className="bio014-result" data-model-result>
        <strong>Birim: {m.unit}</strong>
        <ol>
          {m.values.map((v, i) => (
            <li key={labels[i]}>
              {labels[i]}: {number(v)} {m.unit}
            </li>
          ))}
        </ol>
        <p>
          {kind === "energy"
            ? `Her geçişin verimi %${efficiency}; iki geçişte başlangıç üretiminin %${number((efficiency / 100) ** 2 * 100)} kadarı aktarılır. Aynı temelde enerji piramidi ters değildir.`
            : kind === "number"
              ? "1 meşe, 100 tırtıl ve 10 kuş: sayı grafiği ilk iki düzey arasında terstir. Bu veri enerji miktarını vermez."
              : "Üretici anlık stoğu tüketiciden düşük olabilir. Hızlı yenilenme ile desteklenen bu örnek, enerji piramidinin ters olduğunu göstermez."}
        </p>
      </div>
      <Prediction
        id="besin-piramidi"
        context={`${kind}-${efficiency}`}
        expected={m.inverted ? "inverted" : "upright"}
        options={[
          ["upright", "Bu nicelikte taban üstündeki ilk düzeyden büyük"],
          ["inverted", "Bu nicelikte ilk iki düzey arasında terslik var"],
        ]}
        explanation="Terslik ölçülen niceliğe aittir. Sayı veya anlık biyokütle grafiğinin biçimini enerji akışına taşımadan birim ve zamanı denetle."
      />
    </>
  );
}
const positions: Record<FoodNode, [number, number]> = {
  grass: [55, 180],
  grasshopper: [160, 70],
  frog: [285, 70],
  mouse: [190, 285],
  hawk: [305, 205],
};
function FoodWeb() {
  const uid = useId();
  const [s, set] = useExploration("forge014-bio-besin-zinciri-agi", {
    selected: "hawk",
    removeFrog: false,
  });
  const selected: FoodNode = foodNodes.includes(s.selected as FoodNode)
      ? (s.selected as FoodNode)
      : "hawk",
    m = foodWebSnapshot(selected, s.removeFrog);
  return (
    <>
      <h3>Şahine giden yolları keşfet</h3>
      <p>
        Oklar besinden tüketiciye gider. Dairelerin numaraları metin anahtarıyla
        eşleşir. Kurbağayı modelden kaldırmak bağlantıları değiştirir; gerçek
        nüfusların ne kadar değişeceğini hesaplamaz.
      </p>
      <div className="bio014-controls">
        <Choice
          label="İncelenen canlı"
          value={selected}
          options={foodNodes.map((key) => [key, foodLabels[key]])}
          onChange={(selected) => set({ selected })}
        />
        <label className="bio014-check" htmlFor={uid + "-remove"}>
          <input
            id={uid + "-remove"}
            type="checkbox"
            checked={s.removeFrog}
            onChange={(e) => set({ removeFrog: e.target.checked })}
          />
          <span>Kurbağayı bu ağdan kaldır</span>
        </label>
      </div>
      <Drawing
        title={`Besin ağı; seçili ${foodLabels[selected]}; ${m.edges.length} etkin bağlantı`}
      >
        <defs>
          <marker
            id={uid + "-arrow"}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0L10 5L0 10Z" className="bio014-arrow" />
          </marker>
        </defs>
        {m.edges.map(([a, b]) => {
          const [x1, y1] = positions[a],
            [x2, y2] = positions[b],
            dx = x2 - x1,
            dy = y2 - y1,
            length = Math.hypot(dx, dy);
          return (
            <line
              key={a + b}
              data-food-edge={`${a}-${b}`}
              x1={x1 + (dx / length) * 27}
              y1={y1 + (dy / length) * 27}
              x2={x2 - (dx / length) * 32}
              y2={y2 - (dy / length) * 32}
              className="bio014-line"
              markerEnd={`url(${"#" + uid + "-arrow"})`}
            />
          );
        })}
        {foodNodes
          .filter((key) => !s.removeFrog || key !== "frog")
          .map((key) => {
            const [x, y] = positions[key];
            return (
              <g key={key} data-food-node={key}>
                <circle
                  cx={x}
                  cy={y}
                  r="27"
                  className={
                    key === selected
                      ? "bio014-selected-node"
                      : "bio014-organism"
                  }
                />
                <text x={x} y={y + 10} textAnchor="middle">
                  {foodNodes.indexOf(key) + 1}
                </text>
              </g>
            );
          })}
      </Drawing>
      <ul className="bio014-key">
        {foodNodes.map((key, i) => (
          <li key={key}>
            {i + 1}. {foodLabels[key]}
            {s.removeFrog && key === "frog" ? " — modelden çıkarıldı" : ""}
          </li>
        ))}
      </ul>
      <div className="bio014-result" data-model-result>
        <strong>
          {foodLabels[selected]}:{" "}
          {m.removed
            ? "bu modelde çıkarılmış canlı"
            : `${m.levels.join(" ve ")}. trofik düzey${m.levels.length > 1 ? "ler" : ""}`}
        </strong>
        <p>
          Doğrudan besinleri:{" "}
          {m.food.length
            ? m.food.map((k) => foodLabels[k]).join(", ")
            : selected === "grass"
              ? "Üretici; bu ağda organik besin oku gelmiyor"
              : "Etkin besin bağlantısı yok"}
          .
        </p>
        <p>
          Onu tüketenler:{" "}
          {m.predators.length
            ? m.predators.map((k) => foodLabels[k]).join(", ")
            : "Bu sınırlı ağda gösterilmiyor"}
          .
        </p>
        <p>Etkin bağlantılar:</p>
        <ul>
          {m.edges.map(([a, b]) => (
            <li key={a + b}>
              {foodLabels[a]} → {foodLabels[b]}
            </li>
          ))}
        </ul>
        <p>
          Bağlantı kaybı kesindir; nüfusun artma/azalma miktarı, yok oluş veya
          değişmeme sonucu bu çizimden tek başına çıkmaz.
        </p>
      </div>
      <Prediction
        id="besin-zinciri-agi"
        context={`${selected}-${s.removeFrog}`}
        expected={s.removeFrog ? "one" : "two"}
        options={[
          ["one", "Şahine ulaşan bir üretici yolu kalır"],
          ["two", "Şahine ulaşan iki üretici yolu vardır"],
          ["none", "Şahin mutlaka yok olmuştur"],
        ]}
        explanation={
          s.removeFrog
            ? "Kurbağa yolu çıkarılmıştır; çayır→fare→şahin yolu kalır. Kalan bağlantı gerçek nüfusun hiç etkilenmediğini de kanıtlamaz."
            : "Çayır→fare→şahin ve çayır→çekirge→kurbağa→şahin iki farklı üretici yoludur; şahine üçüncü ve dördüncü düzey konumları verir."
        }
      />
    </>
  );
}
function Cycles() {
  const [s, set] = useExploration("forge014-bio-madde-donguleri", {
    cycle: "nitrogen",
    process: "nitrify1",
    amount: 10,
  });
  const cycle: CycleKind = ["water", "carbon", "nitrogen"].includes(s.cycle)
    ? (s.cycle as CycleKind)
    : "nitrogen";
  const process = cycleProcesses[cycle].some((p) => p.id === s.process)
    ? s.process
    : cycleProcesses[cycle][0].id;
  const amount = bounded(s.amount, 0, 20),
    m = cycleTransfer(cycle, process, amount),
    keys = Object.keys(m.after);
  const shortLabels: Record<string, string> = {
    surface: "Yüzey",
    air: "Hava",
    ground: "Toprak",
    co2: "CO₂",
    organic: cycle === "nitrogen" ? "Org. N" : "Org. C",
    fossil: "Fosil C",
    n2: "N₂",
    nh4: "NH₄⁺",
    no2: "NO₂⁻",
    no3: "NO₃⁻",
  };
  return (
    <>
      <h3>Bir depodan diğerine taşı</h3>
      <p>
        Her seçim başlangıç stoklarından tek bir aktarımı yeniden hesaplar;
        düğmeyi tekrar kullanmak zaman ilerletmez. Birimler molekül adedi değil,
        aynı tanımlı temsili su veya element miktarıdır.
      </p>
      <div className="bio014-controls">
        <Choice
          label="İncelenen döngü"
          value={cycle}
          options={Object.entries(cycleLabels)}
          onChange={(cycle) =>
            set({ cycle, process: cycleProcesses[cycle as CycleKind][0].id })
          }
        />
        <Choice
          label="İzlenen dönüşüm"
          value={process}
          options={cycleProcesses[cycle].map((p) => [p.id, p.label])}
          onChange={(process) => set({ process })}
        />
        <Range
          label="Aktarılması istenen temsili birim"
          min={0}
          max={20}
          value={amount}
          onChange={(amount) => set({ amount })}
        />
      </div>
      <Drawing
        title={`${cycleLabels[cycle]} depoları: ${reservoirLabels[m.step.from]} deposundan ${reservoirLabels[m.step.to]} deposuna ${m.moved} birim aktarım`}
        height={keys.length * 60 + 60}
        maxWidth={600}
      >
        {keys.map((key, i) => (
          <g key={key} data-reservoir={key} data-amount={m.after[key]}>
            <text x="12" y={44 + i * 60} data-reservoir-label={key}>
              {shortLabels[key]}
            </text>
            <rect
              x="128"
              y={12 + i * 60}
              width="160"
              height="44"
              rx="8"
              className="bio014-outline"
            />
            <rect
              x="128"
              y={12 + i * 60}
              width={(160 * m.after[key]) / 100}
              height="44"
              rx="8"
              className={key === m.step.to ? "bio014-live" : "bio014-organism"}
            />
            <text x="330" y={44 + i * 60} textAnchor="end">
              {number(m.after[key])}
            </text>
          </g>
        ))}
        <text x="180" y={keys.length * 60 + 36} textAnchor="middle">
          Temsili birim
        </text>
      </Drawing>
      <div className="bio014-result" data-model-result>
        <strong>Toplam: {m.total} temsili birim</strong>
        <p>
          {reservoirLabels[m.step.from]} → {reservoirLabels[m.step.to]}:{" "}
          {m.moved} birim taşındı.
          {m.limited ? " Kaynakta bulunandan fazlası taşınmadı." : ""}
        </p>
        <ul>
          {keys.map((key) => (
            <li key={key} data-reservoir-legend={key}>
              {shortLabels[key]} — {reservoirLabels[key]}: {m.before[key]} →{" "}
              {m.after[key]} birim
            </li>
          ))}
        </ul>
        <p>
          {cycle === "nitrogen"
            ? "NH₄⁺→NO₂⁻→NO₃⁻ nitrifikasyondur. Bu oklar atmosfer N₂’sini doğrudan kullanmaz. N₂→NH₃/NH₄⁺ fiksasyon; nitrat→N₂ denitrifikasyondur."
            : cycle === "carbon"
              ? "Üreticiler karbon bağlayabilir ve solunum da yapar. Bir depo artarken toplam karbon miktarı sabit kalabilir."
              : "Buharlaşma, yağış, sızma ve bitki terlemesi farklı yollardır. Hacim korunumu, her suyun güvenli içilebilir olduğu anlamına gelmez."}
        </p>
      </div>
      <Prediction
        id="madde-donguleri"
        context={`${cycle}-${process}-${amount}`}
        expected="conserved"
        options={[
          ["conserved", "Bu kapalı aktarımda toplam temsili miktar korunur"],
          ["created", "Aktarım kendi başına yeni madde yaratır"],
          ["lost", "Kaynak azaldığı için toplam miktar zorunlu azalır"],
        ]}
        explanation="Kaynak ne kadar azalıyorsa hedef aynı miktarda artar; toplam 100’de kalır. Depo miktarı ile toplamı ve madde miktarı ile molekül adedini ayrı düşün."
      />
    </>
  );
}
function Lake() {
  const [s, set] = useExploration("forge014-bio-guncel-cevre-sorunlari", {
    stage: 2,
    intervention: "none",
  });
  const stage = bounded(s.stage, 0, 4),
    intervention: LakeIntervention = ["none", "litter", "nutrient"].includes(
      s.intervention,
    )
      ? (s.intervention as LakeIntervention)
      : "none",
    m = lakeSnapshot(stage, intervention);
  return (
    <>
      <h3>Gölde neden-sonuç zinciri</h3>
      <p>
        Bu nitel model süreç basamaklarını inceler; gerçek gün, nüfus veya mg/L
        tahmini yapmaz. Oklar olası mekanizmayı gösterir. Besleyici kaynağını
        azaltmak eski organik yükü anında silmez.
      </p>
      <div className="bio014-controls">
        <Choice
          label="İzlenen süreç basamağı"
          value={String(stage)}
          options={[
            ["0", "Besleyici girişi"],
            ["1", "Alg üretiminde artış"],
            ["2", "Ölü organik yükte artış"],
            ["3", "Ayrıştırıcı solunumunda artış"],
            ["4", "Oksijen azalma baskısı"],
          ]}
          onChange={(stage) => set({ stage: +stage })}
        />
        <Choice
          label="Müdahale"
          value={intervention}
          options={[
            ["none", "Ek önlem yok"],
            ["litter", "Yalnız iri katı çöpleri tut"],
            ["nutrient", "Besleyici kaynağını azalt"],
          ]}
          onChange={(intervention) => set({ intervention })}
        />
      </div>
      <Drawing
        title={`${m.label}; besleyici girişi ${m.incoming ? "sürüyor" : "azaltıldı"}; mevcut organik yük ${m.legacy ? "etkisini sürdürebilir" : "henüz bu basamakta izlenmiyor"}`}
      >
        <path
          d="M15 125Q80 100 140 125T260 125T345 125V340H15Z"
          className="bio014-water"
        />
        <path
          d="M40 40L95 95"
          className={m.incoming ? "bio014-pollution" : "bio014-disabled"}
          data-nutrient-inflow={m.incoming ? "active" : "reduced"}
        />
        {Array.from({ length: m.algae }, (_, i) => (
          <ellipse
            key={i}
            data-lake-alga
            cx={45 + (i % 6) * 50}
            cy={150 + Math.floor(i / 6) * 28}
            rx="18"
            ry="8"
            className="bio014-live"
          />
        ))}
        {m.legacy && (
          <g data-lake-detritus>
            <path
              d="M40 315L70 295L95 318L135 298L170 317L205 300L255 320L295 299L325 318"
              className="bio014-detritus"
            />
          </g>
        )}
        {stage >= 3 && (
          <g data-lake-respiration>
            {[80, 180, 280].map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy={245 - i * 17}
                r="12"
                className="bio014-organism"
              />
            ))}
          </g>
        )}
        <rect
          x="25"
          y="32"
          width="200"
          height="24"
          className="bio014-outline"
        />
        <rect
          x="25"
          y="32"
          width={m.oxygenIndex * 40}
          height="24"
          className="bio014-organism"
          data-oxygen-indicator={m.oxygenIndex}
        />
      </Drawing>
      <div className="bio014-result" data-model-result>
        <strong>İzlenen basamak: {m.label}</strong>
        <p>
          {m.incoming
            ? "Besleyici girişi bu seçili müdahaleyle hedeflenmedi."
            : "Besleyici girişi azaltıldı; bu model tam sıfır salım veya anında iyileşme garantisi vermez."}
        </p>
        <p>
          {m.legacy
            ? "Mevcut organik yükün etkisi hemen bitmez; ayrışma ve oksijen koşulları izlenmelidir."
            : "İleri basamaklar için üretim, birikme ve ayrışma süreçleri gerekir; aynı anın zorunlu sonucu diye okunmaz."}
        </p>
        <p>
          {stage >= 3
            ? "Aerobik ayrıştırıcı solunumu çözünmüş oksijeni tüketir. Üstteki şerit yalnız nitel azalma baskısını simgeler; oksijen ölçümü değildir."
            : "Alg fotosentezi, canlıların solunumu ve suyun karışması gerçek oksijen değerini birlikte etkiler."}
        </p>
      </div>
      <Prediction
        id="guncel-cevre-sorunlari"
        context={`${stage}-${intervention}`}
        expected={intervention === "nutrient" ? "targeted" : "notTargeted"}
        options={[
          ["targeted", "Seçili müdahale besleyici kaynağını hedefliyor"],
          [
            "notTargeted",
            "Seçili müdahale çözünmüş besleyici kaynağını hedeflemiyor",
          ],
          ["instant", "Göl anında bütünüyle eski hâline döner"],
        ]}
        explanation="Katı çöp ızgarası çözünmüş besleyiciyi aynı biçimde gidermez. Kaynak kontrolü önemli olsa da birikmiş yük ve toparlanma süreci izlenir."
      />
    </>
  );
}
function Resources() {
  const [s, set] = useExploration(
    "forge014-bio-dogal-kaynaklar-surdurulebilirlik",
    { renewal: 20, use: 30, years: 5 },
  );
  const renewal = bounded(s.renewal, 0, 40),
    use = bounded(s.use, 0, 60),
    years = bounded(s.years, 1, 5),
    m = resourceBudget(renewal, use, years);
  return (
    <>
      <h3>Yenilenme kullanıma yetişiyor mu?</h3>
      <p>
        Başlangıç stok 100, üst kapasite 100 temsili birimdir. Sabit yenilenme
        ve kullanım her yıl birlikte hesaba katılır. Bu bütçe gerçek ekosistemde
        güvenli çekim veya hasat izni belirlemez.
      </p>
      <div className="bio014-controls">
        <Range
          label="Yıllık yenilenme birimi"
          min={0}
          max={40}
          value={renewal}
          onChange={(renewal) => set({ renewal })}
        />
        <Range
          label="Yıllık kullanım birimi"
          min={0}
          max={60}
          value={use}
          onChange={(use) => set({ use })}
        />
        <Range
          label="İzlenen yıl"
          min={1}
          max={5}
          value={years}
          onChange={(years) => set({ years })}
        />
      </div>
      <Drawing
        title={`Yıllara göre stok: ${m.stocks.join(", ")} temsili birim`}
        height={300}
      >
        <path d="M24 20V260H342" className="bio014-line" />
        {m.stocks.map((stock, i) => (
          <rect
            key={i}
            data-stock-year={i}
            data-stock={stock}
            x={38 + i * (280 / m.stocks.length)}
            y={260 - stock * 2.2}
            width={220 / m.stocks.length}
            height={stock * 2.2}
            className={i === years ? "bio014-live" : "bio014-organism"}
          />
        ))}
      </Drawing>
      <div className="bio014-result" data-model-result>
        <strong>
          {years}. yıl sonu stok: {m.final} temsili birim
        </strong>
        <p>
          Yıllık yenilenme−kullanım: {renewal}−{use}={m.net} birim. Kapasite
          üstü birikim 100’de sınırlanır; stok sıfırın altına indirilmez.
        </p>
        <ol start={0}>
          {m.stocks.map((stock, i) => (
            <li key={i}>
              {i === 0 ? "Başlangıç" : `${i}. yıl`}: {stock} birim
            </li>
          ))}
        </ol>
        {m.unmet > 0 && (
          <p>
            Talebin karşılanamayan kısmı: {m.unmet} birim. Negatif stok uydurmak
            yerine bu açık ayrı tutulur.
          </p>
        )}
        <p>
          Kalite, habitat gereksinimleri, değişen yenilenme, mevsimsellik ve
          belirsizlik bu basit bütçede yoktur. Sayısal denge tek başına bütün
          sürdürülebilirlik koşullarını kanıtlamaz.
        </p>
        <p>
          Bu örnekte kullanım dışındaki çıkışlar sıfır varsayılır. Gerçek bir
          akiferde doğal boşalım, bir balık popülasyonunda göç ve ölüm gibi
          akışları da aynı dönem için bütçeye katmak gerekir.
        </p>
      </div>
      <Prediction
        id="dogal-kaynaklar-surdurulebilirlik"
        context={`${renewal}-${use}-${years}`}
        expected={m.final < 100 ? "lower" : "same"}
        options={[
          ["lower", "Seçili dönemin son stoğu başlangıçtan düşük"],
          ["same", "Son stok kapasite sınırında başlangıç kadar"],
          ["safe", "Bu hesap gerçek habitatın bütün risklerini sıfırlar"],
        ]}
        explanation="Başlangıç, yenilenme ve kullanımı aynı birimle karşılaştır. Model stoğu dengede kalsa bile gerçek sürdürülebilirlik için kalite ve canlı gereksinimleri ayrıca değerlendirilir."
      />
    </>
  );
}

const labs: Record<string, () => ReactNode> = {
  "ekoloji-giris": Pond,
  "besin-piramidi": Pyramid,
  "besin-zinciri-agi": FoodWeb,
  "madde-donguleri": Cycles,
  "guncel-cevre-sorunlari": Lake,
  "dogal-kaynaklar-surdurulebilirlik": Resources,
};
export function Forge014BiologyLab({ lessonId }: { lessonId: string }) {
  const Lab = labs[lessonId];
  return Lab ? (
    <section
      className="bio014"
      data-forge014={lessonId}
      aria-label="Etkileşimli ekoloji laboratuvarı"
    >
      <Lab />
    </section>
  ) : null;
}
export default Forge014BiologyLab;
