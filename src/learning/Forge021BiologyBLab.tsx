import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  photoFactors021,
  photoConditions021,
  nitrification021,
  aerobicRespiration021,
  aerobicStages021,
  anaerobicCapacity021,
  anaerobicAcceptors021,
} from "./forge021BiologyB";
import "./forge021BiologyB.css";

const fmt = (value: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(value);
const bound = (value: number, max: number) =>
  Number.isFinite(value) ? Math.round(Math.max(0, Math.min(max, value))) : 0;
const choice = <T extends object>(map: T, value: string, fallback: keyof T) =>
  Object.hasOwn(map, value) ? (value as keyof T) : fallback;
function Figure({
  title,
  description,
  height = 340,
  children,
}: {
  title: string;
  description: string;
  height?: number;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <svg
      className="bio021b-figure"
      viewBox={`0 0 360 ${height}`}
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{description}</desc>
      {children}
    </svg>
  );
}
function Range({
  label,
  value,
  max,
  min = 0,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  min?: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="bio021b-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt(value)}</output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
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
  options: readonly (readonly [string, string])[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="bio021b-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
      <output htmlFor={id}>
        Seçili: {options.find(([key]) => key === value)?.[1] ?? ""}
      </output>
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
  onChange: (value: boolean) => void;
}) {
  const id = useId();
  return (
    <label className="bio021b-check" htmlFor={id}>
      <input
        id={id}
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
    <div className="bio021b-result" data-model-result>
      {children}
    </div>
  );
}
function Prediction({
  id,
  context,
  prompt,
  options,
  expected,
  explanation,
}: {
  id: string;
  context: string;
  prompt: string;
  options: readonly (readonly [string, string])[];
  expected: string;
  explanation: string;
}) {
  const [s, set] = useExploration(`forge021-bio-b-predict-${id}`, {
    prediction: "",
    reason: "",
    context: "",
    checked: false,
  });
  const inputId = useId();
  const valid = options.some(([key]) => key === s.prediction);
  const current = s.checked && s.context === context;
  return (
    <div className="bio021b-prediction">
      <h4>Tahmin et ve dene</h4>
      <p>{prompt}</p>
      <Choice
        label="Tahminin"
        value={valid ? s.prediction : ""}
        options={[["", "Bir yanıt seç"], ...options]}
        onChange={(prediction) => set({ prediction, checked: false })}
      />
      <label htmlFor={inputId}>Gerekçen</label>
      <textarea
        id={inputId}
        rows={3}
        maxLength={120}
        value={s.reason}
        onChange={(e) =>
          set({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        type="button"
        disabled={!valid || !s.reason.trim()}
        onClick={() => set({ checked: true, context: context.slice(0, 120) })}
      >
        Kanıtla kıyasla
      </button>
      {current && (
        <div className="bio021b-feedback" role="status">
          <strong>
            {s.prediction === expected
              ? "Seçimin kanıtla uyumlu."
              : "Bu kanıtla yeniden düşün."}
          </strong>
          <p>{explanation}</p>
        </div>
      )}
      <p>Modeli denemek konu bitişi, doğru yanıt veya XP kaydı oluşturmaz.</p>
    </div>
  );
}

function PhotoLab() {
  const [s, set] = useExploration("forge021-bio-b-photo", {
    light: 30,
    carbon: 80,
    condition: "suitable",
    respiration: 10,
  });
  const light = bound(s.light, 100),
    carbon = bound(s.carbon, 100),
    condition = choice(photoConditions021, s.condition, "suitable"),
    respiration = bound(s.respiration, 30);
  const m = photoFactors021(light, carbon, condition, respiration);
  const names: Record<string, string> = {
    light: "Işık",
    carbon: "CO₂",
    heat: "Isı koşulu",
  };
  const rows = [
    ["light", "Işık", m.light],
    ["carbon", "CO₂", m.carbon],
    ["heat", "Isı", m.heat],
  ] as const;
  const expected = m.net > 0 ? "out" : m.net < 0 ? "in" : "equal";
  return (
    <>
      <h3>Darboğazı bul, net gazı ölç</h3>
      <p>
        Aynı göreli hız birimindeki üç kapasiteyi karşılaştır. Brüt hız en küçük
        kapasitedir. Bu kurmaca deneyde gerçek tür için kesin sıcaklık sınırı
        verilmez.
      </p>
      <div className="bio021b-controls">
        <Range
          label="Işık kapasitesi"
          value={light}
          max={100}
          onChange={(light) => set({ light })}
        />
        <Range
          label="CO₂ kapasitesi"
          value={carbon}
          max={100}
          onChange={(carbon) => set({ carbon })}
        />
        <Choice
          label="Isı koşulu"
          value={condition}
          options={Object.entries(photoConditions021).map(([k, v]) => [
            k,
            v.label,
          ])}
          onChange={(condition) => set({ condition })}
        />
        <Range
          label="Solunum hızı"
          value={respiration}
          max={30}
          onChange={(respiration) => set({ respiration })}
        />
      </div>
      <Figure
        title="Üç aynı birimli üretim kapasitesi"
        description="Işık, CO₂ ve ısı kapasitelerinin yatay çubukları. Çerçevesi belirgin satır en düşük kapasiteyi gösterir. Hız göreli birim bölü dakikadır."
        height={350}
      >
        <text x={180} y={35} textAnchor="middle">
          Kapasite / dakika
        </text>
        {rows.map(([key, label, value], i) => {
          const y = 80 + i * 75;
          return (
            <g key={key}>
              <text x={16} y={y + 23}>
                {label}
              </text>
              <rect
                x={100}
                y={y}
                width={180}
                height={32}
                className="bio021b-empty"
              />
              <rect
                data-bio021-capacity={key}
                x={100}
                y={y}
                width={1.8 * value}
                height={32}
                className="bio021b-mint-fill"
              />
              <rect
                data-bio021-limiting={key}
                x={96}
                y={y - 4}
                width={188}
                height={40}
                fill="none"
                stroke={m.limiting.includes(key) ? "var(--accent)" : "none"}
                strokeWidth={4}
              />
              <text x={338} y={y + 25} textAnchor="end">
                {fmt(value)}
              </text>
            </g>
          );
        })}
        <text x={100} y={330}>
          0
        </text>
        <text x={280} y={330} textAnchor="end">
          100
        </text>
      </Figure>
      <Figure
        title="Brüt üretim ve net O₂ yönü"
        description={`Brüt ${fmt(m.gross)}, solunum ${fmt(m.respiration)} ve net ${fmt(m.net)} göreli hız. Net sıfır çizgisinin solu O₂ alımını, sağı O₂ çıkışını gösterir.`}
        height={230}
      >
        <text x={180} y={38} textAnchor="middle">
          Net O₂ / dakika
        </text>
        <path d="M30 130H330 M120 65V160" className="bio021b-axis" />
        <text x={120} y={193} textAnchor="middle">
          0
        </text>
        <text x={30} y={193} textAnchor="start">
          −30
        </text>
        <text x={330} y={193} textAnchor="end">
          +100
        </text>
        <rect
          data-bio021-net
          x={m.net < 0 ? 120 + 3 * m.net : 120}
          y={100}
          width={Math.abs(m.net) * (m.net < 0 ? 3 : 2.1)}
          height={30}
          className="bio021b-accent-fill"
        />
        <circle
          data-bio021-net-point
          cx={m.net < 0 ? 120 + 3 * m.net : 120 + 2.1 * m.net}
          cy={115}
          r={6}
          className="bio021b-dot"
        />
      </Figure>
      <Result>
        <p>
          Brüt hız: <strong>{fmt(m.gross)}</strong> birim / dakika.
        </p>
        <p>
          Solunum: {fmt(m.respiration)}; net O₂: <strong>{fmt(m.net)}</strong>{" "}
          birim / dakika.
        </p>
        <p>Sınır: {m.limiting.map((k) => names[k]).join(" ve ")}.</p>
        <p>
          {m.balanced
            ? "Net sıfır; üretim ve tüketim eşit."
            : m.net > 0
              ? "Dışarı net O₂ çıkıyor."
              : "İçeri net O₂ alınıyor."}
        </p>
        <p>
          Yalnız bu iki gaz süreci ve aynı ölçekte kapasiteler kullanılıyor.
          Gerçek ölçümde diğer gaz etkileri ayrıca kontrol edilir.
        </p>
      </Result>
      <Prediction
        id="photo"
        context={`${light}|${carbon}|${condition}|${respiration}`}
        prompt="Bu ayarlarda net O₂ hangi yönde?"
        options={[
          ["out", "Dışarı O₂ çıkar"],
          ["in", "İçeri O₂ alınır"],
          ["equal", "Net fark sıfır"],
        ]}
        expected={expected}
        explanation={`${fmt(m.gross)} − ${fmt(m.respiration)} = ${fmt(m.net)}. Net işaret üretimin yokluğu ile aynı şey değildir.`}
      />
    </>
  );
}

function NitrificationLab() {
  const [s, set] = useExploration("forge021-bio-b-nitrification", {
    initial: 5,
    first: 3,
    second: 2,
  });
  const initial = bound(s.initial, 10),
    first = Math.min(initial, bound(s.first, 10)),
    second = Math.min(first, bound(s.second, 10));
  const m = nitrification021(initial, first, second);
  const nodes = [
    ["ammonium", "NH₄⁺", m.ammonium],
    ["nitrite", "NO₂⁻", m.nitrite],
    ["nitrate", "NO₃⁻", m.nitrate],
  ] as const;
  const expected = m.first > 0 || m.second > 0 ? "uses" : "none";
  return (
    <>
      <h3>Azotu iki adımda izle</h3>
      <p>
        Depolar mol N ile sayılır. İlk adım: amonyum → nitrit. İkinci adım:
        nitrit → nitrat. Bu aerobik model O₂ tüketir; N₂ bağlama yolu
        yoktur.
      </p>
      <div className="bio021b-controls">
        <Range
          label="İlk azot / mol N"
          value={initial}
          max={10}
          onChange={(initial) =>
            set({
              initial,
              first: Math.min(first, initial),
              second: Math.min(second, initial),
            })
          }
        />
        <Range
          label="Birinci adım / mol N"
          value={first}
          max={initial}
          onChange={(first) => set({ first, second: Math.min(second, first) })}
        />
        <Range
          label="İkinci adım / mol N"
          value={second}
          max={first}
          onChange={(second) => set({ second })}
        />
      </div>
      <Figure
        title="Üç azot deposu ve aerobik işleme"
        description={`Amonyum ${fmt(m.ammonium)}, nitrit ${fmt(m.nitrite)}, nitrat ${fmt(m.nitrate)} mol N. Toplam ${fmt(initial)} mol N korunur. O₂ gereksinimi ${fmt(m.oxygen)} moldür.`}
        height={390}
      >
        {nodes.map(([key, label, value], i) => (
          <g key={key}>
            <text x={60 + 120 * i} y={42} textAnchor="middle">
              {label}
            </text>
            <circle
              cx={60 + 120 * i}
              cy={104}
              r={35}
              className="bio021b-empty"
            />
            <rect
              data-bio021-n-stock={key}
              x={38 + 120 * i}
              y={124 - 4 * value}
              width={44}
              height={4 * value}
              className="bio021b-mint-fill"
            />
            <text x={60 + 120 * i} y={175} textAnchor="middle">
              {fmt(value)}
            </text>
          </g>
        ))}
        <path
          data-bio021-n-first
          d="M101 104H139 L131 97 M139 104L131 111"
          className={first > 0 ? "bio021b-flow" : "bio021b-idle"}
        />
        <path
          data-bio021-n-second
          d="M221 104H259 L251 97 M259 104L251 111"
          className={second > 0 ? "bio021b-flow" : "bio021b-idle"}
        />
        <text x={180} y={217} textAnchor="middle">
          Depolar: mol N
        </text>
        <text x={18} y={267}>
          O₂ alımı
        </text>
        <rect
          data-bio021-o2-demand
          x={155}
          y={243}
          width={m.oxygen * 7}
          height={29}
          className="bio021b-accent-fill"
        />
        <text x={180} y={320} textAnchor="middle">
          CO₂ → organik C
        </text>
        <text x={180} y={365} textAnchor="middle">
          Enerjiyle özümleme
        </text>
      </Figure>
      <Result>
        <p>
          Amonyum: {fmt(m.ammonium)}; nitrit: {fmt(m.nitrite)}; nitrat:{" "}
          {fmt(m.nitrate)} mol N.
        </p>
        <p>
          Toplam azot: <strong>{fmt(m.nitrogenTotal)} mol N</strong>.
        </p>
        <p>
          O₂ gereksinimi: <strong>{fmt(m.oxygen)} mol</strong> ={" "}
          {fmt(m.oxygenFirst)} + {fmt(m.oxygenSecond)}.
        </p>
        <p>
          Birinci adımda mol N başına 1,5; ikinci adımda 0,5 mol O₂ kullanılır.
          Bu sayı O₂ üretimi değildir.
        </p>
        <p>
          Enerji ve indirgeme gücü, CO₂’nin organik yapıya katılmasını destekler. ATP veya şeker
          verimi için bu model sabit bir sayı vermez. Başka azot girişi, çıkışı
          ve büyümeye azot aktarımı yok sayılmıştır.
        </p>
      </Result>
      <Prediction
        id="nitrification"
        context={`${initial}|${first}|${second}`}
        prompt="Bu adımlarda O₂ için ne bekliyorsun?"
        options={[
          ["uses", "O₂ tüketilir"],
          ["makes", "O₂ üretilir"],
          ["none", "İşlem yok; O₂ değişmez"],
        ]}
        expected={expected}
        explanation={
          expected === "none"
            ? "İşlenen azot sıfır; bu deneyde O₂ gereksinimi de sıfır."
            : `${fmt(first)}×1,5 + ${fmt(second)}×0,5 = ${fmt(m.oxygen)} mol O₂ gerekir. Karbon özümlemesi O₂ üretimi sayılmaz.`
        }
      />
    </>
  );
}

function AerobicLab() {
  const [s, set] = useExploration("forge021-bio-b-aerobic", {
    glucose: 1,
    stage: "glycolysis",
    shuttle: "malate",
    oxygen: true,
  });
  const glucose = Math.round(bound(s.glucose, 5)),
    stage = choice(aerobicStages021, s.stage, "glycolysis"),
    shuttle = s.shuttle === "glycerol" ? "glycerol" : "malate";
  const m = aerobicRespiration021(glucose, stage, shuttle, s.oxygen);
  const stepLabel =
    stage === "link"
      ? "Piruvat → asetil"
      : stage === "ets"
        ? "ETS ve ATP sentaz"
        : aerobicStages021[stage];
  const expected = !s.oxygen ? "no" : shuttle === "malate" ? "32" : "30";
  return (
    <>
      <h3>Yolun yerini ve net hesabı seç</h3>
      <p>
        Serbest glikoz için kanonik tam oksidasyon defteri. Sayılar
        evreye kadar üretilen toplamları gösterir; hücrede kalan serbest havuz
        değildir.
      </p>
      <div className="bio021b-controls">
        <Range
          label="Glikoz miktarı / mol"
          value={glucose}
          max={5}
          onChange={(glucose) => set({ glucose })}
        />
        <Choice
          label="Evre"
          value={stage}
          options={Object.entries(aerobicStages021).map(([key, label]) => [
            key,
            key === "link" ? "Piruvat → asetil" : label,
          ])}
          onChange={(stage) => set({ stage })}
        />
        <Choice
          label="Elektron mekiği"
          value={shuttle}
          options={[
            ["malate", "Malat yolu: sitozolik pay 2,5"],
            ["glycerol", "Gliserol fosfat yolu: pay 1,5"],
          ]}
          onChange={(shuttle) => set({ shuttle })}
        />
        <Check
          label="Aerobik son alıcı O₂ var"
          checked={s.oxygen}
          onChange={(oxygen) => set({ oxygen })}
        />
      </div>
      <Figure
        title="Evrelerin gerçek hücresel yeri"
        description={`${stepLabel}. Glikoliz sitozolde; piruvat oksidasyonu ve Krebs matrikste; ETS iç zardadır. ETS protonları matriksten zarlar arası boşluğa taşır; ATP sentaz dönüşü matrikse yönelir.`}
        height={430}
      >
        <text x={18} y={35}>
          Sitozol
        </text>
        <rect
          data-bio021-site="glycolysis"
          x={80}
          y={55}
          width={208}
          height={45}
          className={
            stage === "glycolysis" ? "bio021b-selected" : "bio021b-empty"
          }
        />
        <text x={184} y={86} textAnchor="middle">
          Glikoz → piruvat
        </text>
        <ellipse
          cx={180}
          cy={235}
          rx={155}
          ry={105}
          className="bio021b-empty"
        />
        <path
          data-bio021-inner-membrane
          d="M54 206 Q64 160 104 170 L120 208 L140 170 L160 208 L180 170 L200 208 L220 170 Q289 164 304 205 Q321 259 282 292 L250 266 L225 300 L200 265 L175 300 L150 265 L125 298 Q55 296 54 206 Z"
          className={stage === "ets" ? "bio021b-highlight" : "bio021b-membrane"}
        />
        <text x={180} y={253} textAnchor="middle">
          Matriks
        </text>
        <circle
          data-bio021-active-site
          cx={stage === "glycolysis" ? 184 : stage === "ets" ? 302 : 180}
          cy={stage === "glycolysis" ? 78 : stage === "ets" ? 220 : 220}
          r={stage === "glycolysis" ? 0 : 8}
          className="bio021b-dot"
        />
        <path d="M74 346L125 298 M250 346V328.683" className="bio021b-axis" />
        <text x={18} y={385}>
          İç zar
        </text>
        <text x={190} y={385}>
          Dış zar
        </text>
      </Figure>
      {stage === "ets" && (
        <Figure
          title="Proton farkı ve ATP sentaz"
          description="Matriks altta, zarlar arası boşluk üstte. ETS pompası H⁺ iyonlarını yukarı taşır. ATP sentazın dönüş oku aşağı matrikse yönelir; O₂ yoksa sürdürülebilir aerobik akış gösterilmez."
          height={340}
        >
          <text x={180} y={35} textAnchor="middle">
            Zarlar arası boşluk
          </text>
          <rect
            x={22}
            y={135}
            width={316}
            height={36}
            className="bio021b-empty"
          />
          <rect
            x={68}
            y={117}
            width={62}
            height={70}
            className="bio021b-mint-fill"
          />
          <text x={99} y={157} textAnchor="middle">
            ETS
          </text>
          <rect
            x={226}
            y={117}
            width={55}
            height={70}
            className="bio021b-accent-fill"
          />
          <path
            data-bio021-proton-out
            d="M99 230V172 M99 132V74 L90 87 M99 74L108 87"
            className={m.sustained ? "bio021b-flow" : "bio021b-idle"}
          />
          <path
            data-bio021-proton-return
            d="M253 74V230 L244 217 M253 230L262 217"
            className={m.sustained ? "bio021b-flow" : "bio021b-idle"}
          />
          <text x={18} y={85}>
            H⁺
          </text>
          <text x={279} y={90}>
            H⁺
          </text>
          <text x={180} y={282} textAnchor="middle">
            Matriks
          </text>
          <text x={180} y={324} textAnchor="middle">
            ADP + Pi → ATP
          </text>
        </Figure>
      )}
      <Figure
        title="Evreye kadar referans ürün miktarları"
        description={`CO₂ ${fmt(m.carbonDioxide)}, NADH ${fmt(m.nadhProduced)}, net substrat ATP eşdeğeri ${fmt(m.substrate)} mol. Bunlar seçili glikoz için başvuru bilançosudur; O₂ kesintisinde sürekli gerçek üretim iddiası yoktur.`}
        height={290}
      >
        <text x={180} y={35} textAnchor="middle">
          Referans toplam / mol
        </text>
        {(
          [
            ["co2", "CO₂", m.carbonDioxide],
            ["nadh", "NADH", m.nadhProduced],
            ["substrate", "ATP", m.substrate],
          ] as const
        ).map(([key, label, value], i) => (
          <g key={key}>
            <text x={18} y={91 + 68 * i}>
              {label}
            </text>
            <rect
              x={140}
              y={68 + 68 * i}
              width={150}
              height={28}
              className="bio021b-empty"
            />
            <rect
              data-bio021-ledger={key}
              x={140}
              y={68 + 68 * i}
              width={3 * value}
              height={28}
              className="bio021b-mint-fill"
            />
            <text x={338} y={91 + 68 * i} textAnchor="end">
              {fmt(value)}
            </text>
          </g>
        ))}
      </Figure>
      <Result>
        <p>
          Evre: <strong>{stepLabel}</strong>. Yer: {m.location}.
        </p>
        <p>
          Referans toplamları: {fmt(m.carbonDioxide)} mol CO₂;{" "}
          {fmt(m.nadhProduced)} mol NADH; {fmt(m.fadh2Produced)} mol FADH₂.
        </p>
        <p>
          Net substrat ATP eşdeğeri: <strong>{fmt(m.substrate)} mol</strong>.
        </p>
        <p>
          Glikoliz defteri: {fmt(m.glycolysisProduced)} mol brüt ATP −{" "}
          {fmt(m.investment)} mol yatırım = {fmt(m.glycolysisNet)} mol net.
        </p>
        {stage === "ets" && (
          <>
            <p>
              Oksidatif kazanç:{" "}
              <strong>{fmt(m.oxidative)} mol ATP eşdeğeri</strong>.
            </p>
            <p>
              {m.canClaimComplete
                ? `Bu kabullerle tam yol: ${fmt(m.theoreticalTotal)} mol ATP eşdeğeri; ${fmt(m.oxygenForCompleteOxidation)} mol O₂ kullanımı.`
                : "O₂ yok: sürekli aerobik tam yol sonucu ilan edilmez. Yukarıdaki evre sayıları yalnız O₂ bulunan referans defteridir."}
            </p>
          </>
        )}
        <p>
          Sitozolik elektron eşdeğerleri mekikle aktarılır; NADH’ın kendisi iç
          zarı doğrudan geçmez. P/O kabulleri 2,5 ve 1,5; sızıntı, biyokütleye
          sapma ve ek taşıma kayıpları bu hesaba katılmadı.
        </p>
      </Result>
      <Prediction
        id="aerobic"
        context={`${glucose}|${stage}|${shuttle}|${s.oxygen}`}
        prompt="Seçili O₂ ve mekik koşulunda tam yol için glikoz başına hangi sonuç uygun?"
        options={[
          ["32", "Yaklaşık 32 ATP eşdeğeri"],
          ["30", "Yaklaşık 30 ATP eşdeğeri"],
          ["no", "Sürekli aerobik tam yol kurulmaz"],
        ]}
        expected={expected}
        explanation={
          !s.oxygen
            ? "O₂ son alıcıdır. Kesintide aerobik ETS’nin sürekli dönüşü varsayılamaz; başka yol bu modelde yok."
            : shuttle === "malate"
              ? "Oksidatif 28 + net substrat 4 = 32. Bu yaklaşık ve açık koşullu referanstır."
              : "Oksidatif 26 + net substrat 4 = 30. Değişen pay sitozolik iki NADH eşdeğeridir."
        }
      />
    </>
  );
}

function AnaerobicLab() {
  const [s, set] = useExploration("forge021-bio-b-anaerobic", {
    electrons: 10,
    acceptor: 3,
    kind: "nitrate",
  });
  const electrons = bound(s.electrons, 40),
    acceptor = bound(s.acceptor, 10),
    kind = choice(anaerobicAcceptors021, s.kind, "nitrate"),
    m = anaerobicCapacity021(electrons, acceptor, kind),
    d = anaerobicAcceptors021[kind];
  const empty = electrons === 0 && acceptor === 0;
  const expected = empty ? "empty" : m.limitedBy;
  return (
    <>
      <h3>Son alıcıya kaç elektron yeter?</h3>
      <p>
        Bu hesap, tanımlı bir indirgenme yarı tepkimesi içindir.
        Elektron havuzu ve alıcı mol ile sayılır. Tam hücre, pH veya ATP verimi
        simüle edilmez.
      </p>
      <div className="bio021b-controls">
        <Range
          label="Elektron / mol e⁻"
          value={electrons}
          max={40}
          onChange={(electrons) => set({ electrons })}
        />
        <Range
          label="Alıcı / mol"
          value={acceptor}
          max={10}
          onChange={(acceptor) => set({ acceptor })}
        />
        <Choice
          label="Alıcı ve ürün"
          value={kind}
          options={Object.entries(anaerobicAcceptors021).map(([k, v]) => [
            k,
            v.label,
          ])}
          onChange={(kind) => set({ kind })}
        />
      </div>
      <Figure
        title="Elektron yolu, son alıcı ve ürün"
        description={`${fmt(m.electronsUsed)} mol elektron kullanılarak ${fmt(m.processed)} mol ${d.symbol} işlenir. ${fmt(m.product)} mol ${d.product} oluşur. Kesik yol sıfır işleme gösterir; proton ve su bütünü bu kapasite şemasında sayılmaz.`}
        height={375}
      >
        <text x={54} y={42} textAnchor="middle">
          e⁻
        </text>
        <text x={302} y={42} textAnchor="middle">
          {d.symbol}
        </text>
        <circle cx={54} cy={98} r={30} className="bio021b-empty" />
        <text x={54} y={107} textAnchor="middle">
          {fmt(electrons)}
        </text>
        <rect
          x={135}
          y={70}
          width={86}
          height={56}
          className="bio021b-mint-fill"
        />
        <text x={178} y={107} textAnchor="middle">
          ETS
        </text>
        <circle cx={302} cy={98} r={30} className="bio021b-empty" />
        <text x={302} y={107} textAnchor="middle">
          {fmt(acceptor)}
        </text>
        <path
          data-bio021-electron-route
          d="M90 98H126 L117 90 M126 98L117 106 M229 98H264 L255 90 M264 98L255 106 M302 135V180 L294 170 M302 180L310 170"
          className={m.processed > 0 ? "bio021b-flow" : "bio021b-idle"}
        />
        <text x={180} y={225} textAnchor="middle">
          {d.product}
        </text>
        <rect
          x={65}
          y={250}
          width={230}
          height={34}
          className="bio021b-empty"
        />
        <rect
          data-bio021-product-bar
          x={65}
          y={250}
          width={23 * m.product}
          height={34}
          className="bio021b-accent-fill"
        />
        <text x={180} y={330} textAnchor="middle">
          {fmt(m.product)} mol ürün
        </text>
        <text x={180} y={367} textAnchor="middle">
          Katsayı: {d.electrons} e⁻ / alıcı
        </text>
      </Figure>
      <Result>
        <p>
          Alıcı başına <strong>{d.electrons} mol e⁻</strong> gerekir.
        </p>
        <p>
          İşlenen alıcı: <strong>{fmt(m.processed)} mol</strong>. Kalan alıcı:{" "}
          {fmt(m.acceptorLeft)} mol.
        </p>
        <p>
          Kullanılan elektron: {fmt(m.electronsUsed)}; kalan elektron:{" "}
          <strong>{fmt(m.electronsLeft)} mol e⁻</strong>.
        </p>
        <p>
          Ürün:{" "}
          <strong>
            {fmt(m.product)} mol {d.product}
          </strong>
          .
        </p>
        <p>
          {empty
            ? "Başlangıç stokları sıfır; ürün yok."
            : m.limitedBy === "electrons"
              ? "Elektron stoğu sınırdır."
              : m.limitedBy === "acceptor"
                ? "Alıcı stoğu sınırdır."
                : "İki stok tam eşleşir."}
        </p>
        <p>
          {kind === "nitrate"
            ? "Yalnız tanımlı tam N₂ yolu: 2 mol nitrat 1 mol N₂ verir. Her nitrat kullanımı mutlaka bu ürüne gitmez."
            : kind === "sulfate"
              ? "Sülfürlü ürünün H₂S / HS⁻ payı pH ile değişir. Model S atomu ve elektron miktarını sayar."
              : kind === "carbon"
                ? "CO₂ → CH₄ referansı karbon indirgenmesidir. Her metanojen aynı enerji yolunu kullanıyor denmez."
                : "Fe³⁺ elektron alarak Fe²⁺ olur. Fe²⁺ oksidasyonunun yönü bunun tersidir."}
        </p>
        <p>
          ETS yolu nitel gösterildi. Elektron katsayısı ATP sayısı değildir; her
          canlı için ortak ATP verimi çıkarılmaz.
        </p>
      </Result>
      <Prediction
        id="anaerobic"
        context={`${electrons}|${acceptor}|${kind}`}
        prompt="Bu iki stokta kapasiteyi hangisi sınırlar?"
        options={[
          ["electrons", "Elektron stoğu"],
          ["acceptor", "Alıcı stoğu"],
          ["both", "İki stok tam eşleşir"],
          ["empty", "Başlangıç stokları yok"],
        ]}
        expected={expected}
        explanation={`${fmt(electrons)} / ${d.electrons} = ${fmt(electrons / d.electrons)} mol alıcı kapasitesi; mevcut alıcı ${fmt(acceptor)} mol. İşlenen miktar ${fmt(m.processed)} mol.`}
      />
    </>
  );
}

const labs: Record<string, () => ReactNode> = {
  "fotosentez-hiz-faktorleri": PhotoLab,
  "kemosentez-enerji-karbon": NitrificationLab,
  "solunum-oksijenli-bilanco": AerobicLab,
  "solunum-oksijensiz-alicilar": AnaerobicLab,
};
export default function Forge021BiologyBLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const Lab = labs[lessonId];
  return Lab ? (
    <section className="bio021b-lab" data-forge021={lessonId}>
      <Lab />
    </section>
  ) : null;
}
