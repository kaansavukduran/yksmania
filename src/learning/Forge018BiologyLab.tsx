import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  intestine018,
  intestinalCargo018,
  enzymeNetwork018,
  digestiveSignals018,
  liver018,
  biliaryBlocks018,
  pancreas018,
  heart018,
  heartPhases018,
  vessels018,
  blood018,
  hemostasisSteps018,
  lymph018,
  lymphRegions018,
  immunity018,
  immuneAntigens018,
  type IntestinalCargo018,
  type DigestiveSignal018,
  type BiliaryBlock018,
  type HeartPhase018,
  type HemostasisStep018,
  type LymphRegion018,
  type ImmuneAntigen018,
} from "./forge018Biology";
import "./forge018Biology.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const n = (x: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(x);
const evidence018 = (text: string) =>
  text.replaceAll("gösterilmez", "yer almaz");
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
      className="bio018-drawing"
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
      className={active ? "bio018-arrow" : "bio018-arrow bio018-muted"}
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
    <div className="bio018-field">
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
    <div className="bio018-field">
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
    <label className="bio018-check" htmlFor={uid}>
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
    <div className="bio018-result" data-model-result aria-live="polite">
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
  const [s, set] = useExploration("forge018-bio-prediction-" + id, {
    answer: "",
    reason: "",
    context: "",
    checked: false,
  });
  const selected = options.find(([k]) => k === s.answer);
  return (
    <div className="bio018-prediction">
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
        <div className="bio018-feedback" role="status">
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

const entries = (o: Record<string, string>): [string, string][] =>
  Object.entries(o);
const safe = <M extends Record<string, string>>(
  value: string,
  map: M,
  fallback: keyof M & string,
): keyof M & string =>
  Object.hasOwn(map, value) ? (value as keyof M & string) : fallback;
function Node({
  x,
  y,
  width = 130,
  lines,
  active = false,
}: {
  x: number;
  y: number;
  width?: number;
  lines: string[];
  active?: boolean;
}) {
  return (
    <g className={active ? "bio018-node bio018-active" : "bio018-node"}>
      <rect x={x} y={y} width={width} height={lines.length * 30 + 20} rx="10" />
      {lines.map((t, i) => (
        <text
          key={i}
          x={x + width / 2}
          y={y + 32 + i * 30}
          textAnchor="middle"
          className="bio018-small"
        >
          {t}
        </text>
      ))}
    </g>
  );
}
function IntestineLab() {
  const id = "sindirim-bagirsaklar";
  const [s, set] = useExploration("forge018-bio-" + id, {
    cargo: "glucose",
    sodium: true,
    lacteal: true,
    ileum: true,
  });
  const cargo = safe(s.cargo, intestinalCargo018, "glucose"),
    m = intestine018(cargo, s.sodium, s.lacteal, s.ileum);
  return (
    <section className="bio018" data-forge018={id}>
      <h3>Bir ürünün iki zar geçişini izle</h3>
      <p>
        Şema tek bir emici epitel hücresinin kesitidir. Üst lümen, alt iç
        ortamdır; bir villusun tamamı değildir. Seçilen yolun diğer koşulları
        sağlam kabul edilir; sayısal emilim hızı hesabı yapılmaz. Na düğmesi
        yalnız glikoz kartındaki özel koşulu değiştirir; tüm aminoasit
        taşıyıcılarını temsil etmez.
      </p>
      <div className="bio018-controls">
        <Choice
          label="İzlenecek ürün"
          value={cargo}
          options={entries(intestinalCargo018)}
          onChange={(cargo) => set({ cargo })}
        />
        <Check
          label="Na gradyanı var"
          checked={s.sodium}
          onChange={(sodium) => set({ sodium })}
        />
        <Check
          label="Lakteal çıkışı açık"
          checked={s.lacteal}
          onChange={(lacteal) => set({ lacteal })}
        />
        <Check
          label="Terminal ileum yolu açık"
          checked={s.ileum}
          onChange={(ileum) => set({ ileum })}
        />
      </div>
      <Drawing
        title="Lümenden emici hücreye, oradan kan veya lenf çıkışına seçili ürün yolu"
        height={400}
      >
        <text x="180" y="32" textAnchor="middle">
          Lümen
        </text>
        <rect
          x="30"
          y="95"
          width="300"
          height="135"
          rx="16"
          className="bio018-cell"
        />
        {Array.from({ length: 15 }, (_, i) => (
          <path key={i} d={`M${45 + i * 19} 94v-17`} className="bio018-micro" />
        ))}
        <text x="180" y="187" textAnchor="middle">
          Emici hücre
        </text>
        <Arrow
          x1={95}
          y1={48}
          x2={95}
          y2={143}
          active={m.apical}
          kind="apical"
        />
        <g data-intestinal-exit="blood" data-active={m.exit && !m.lymph}>
          <path
            d="M85 270V330"
            className={m.exit && !m.lymph ? "bio018-flow" : "bio018-faded"}
          />
        </g>
        <g data-intestinal-exit="lymph" data-active={m.exit && m.lymph}>
          <path
            d="M275 270V330"
            className={m.exit && m.lymph ? "bio018-flow" : "bio018-faded"}
          />
        </g>
        <Arrow
          x1={85}
          y1={230}
          x2={85}
          y2={295}
          active={m.exit && !m.lymph}
          kind="blood"
        />
        <Arrow
          x1={275}
          y1={230}
          x2={275}
          y2={295}
          active={m.exit && m.lymph}
          kind="lymph"
        />
        <text x="85" y="365" textAnchor="middle">
          Kan
        </text>
        <text x="275" y="365" textAnchor="middle">
          Lenf
        </text>
      </Drawing>
      <p>
        Üstteki kısa çizgiler mikrovillus denen çıkıntıları temsil eder. Alt sol
        ok kılcal kan/portal yolu; alt sağ ok şilomikron paketinin lakteal
        yolunu gösterir. Kesik ok, bu kartta engelli basamaktır.
      </p>
      <Result>
        <strong>İlk çıkış: {m.exit ? m.route : "Bu yol engelli"}</strong>
        <p>
          {intestinalCargo018[cargo]}: {evidence018(m.evidence)}
        </p>
      </Result>
      <Prediction
        id={id}
        context={JSON.stringify([cargo, s.sodium, s.lacteal, s.ileum])}
        options={[
          ["blood", "Portal kan"],
          ["lymph", "Lenf"],
          ["blocked", "Bu yol engelli"],
        ]}
        expected={!m.exit ? "blocked" : m.lymph ? "lymph" : "blood"}
        explanation={evidence018(m.evidence)}
      />
    </section>
  );
}

function EnzymesLab() {
  const id = "sindirim-enzimler-hormonlar";
  const [s, set] = useExploration("forge018-bio-" + id, {
    signal: "acid",
    starter: true,
    precursor: true,
    chain: 11,
    cuts: 4,
  });
  const signal = safe(s.signal, digestiveSignals018, "acid"),
    chain = Math.round(bound(s.chain, 2, 16)),
    cuts = Math.round(bound(s.cuts, 0, chain - 1));
  const m = enzymeNetwork018(signal, s.starter, s.precursor, chain, cuts);
  return (
    <section className="bio018" data-forge018={id}>
      <h3>Haber yolunu ve etkinleşme ağını ayır</h3>
      <p>
        Üst ağ başlıca sinyali, alt ağ seçici proteaz başlangıcını gösterir.
        Diğer enzim koşulları sağlamdır. Kesim sayısı ayrı verilen hidroliz
        verisidir; hormon seçiminden otomatik hız çıkarılmaz.
      </p>
      <div className="bio018-controls">
        <Choice
          label="Bağırsak girdisi"
          value={signal}
          options={entries(digestiveSignals018)}
          onChange={(signal) => set({ signal })}
        />
        <Check
          label="Başlatıcı enzim var"
          checked={s.starter}
          onChange={(starter) => set({ starter })}
        />
        <Check
          label="Tripsinojen var"
          checked={s.precursor}
          onChange={(precursor) => set({ precursor })}
        />
        <Range
          label="Zincirdeki birim"
          value={chain}
          min={2}
          max={16}
          onChange={(chain) => set({ chain, cuts: Math.min(cuts, chain - 1) })}
        />
        <Range
          label="Verilen kesim"
          value={cuts}
          min={0}
          max={chain - 1}
          onChange={(cuts) => set({ cuts })}
        />
      </div>
      <Drawing
        title="Seçilen sindirim sinyali ile ayrı proteaz başlangıç ağının kaynak-hedef şeması"
        height={430}
      >
        <Node
          x={20}
          y={20}
          width={145}
          lines={[
            signal === "acid"
              ? "Asit"
              : signal === "nutrient"
                ? "Besin"
                : "Sinir",
            "girdisi",
          ]}
        />
        <Node
          x={195}
          y={20}
          width={145}
          lines={[
            m.hormone === "Sinirsel haber" ? "Sinirsel" : m.hormone,
            "haber",
          ]}
          active
        />
        <Arrow x1={166} y1={65} x2={194} y2={65} kind="signal" />
        <text x="180" y="157" textAnchor="middle">
          Etkinleşme ağı
        </text>
        <Node x={20} y={180} width={145} lines={["Öncül +", "başlatıcı"]} />
        <Node
          x={195}
          y={180}
          width={145}
          lines={["Tripsin", m.trypsin ? "oluşur" : "oluşmaz"]}
          active={m.trypsin}
        />
        <Arrow
          x1={166}
          y1={224}
          x2={194}
          y2={224}
          active={m.trypsin}
          kind="trypsin"
        />
        <g data-protease-active={m.trypsin}>
          <Arrow
            x1={268}
            y1={263}
            x2={268}
            y2={310}
            active={m.downstream}
            kind="downstream"
          />
        </g>
        <text x="180" y="354" textAnchor="middle">
          Diğer proteazlar
        </text>
        <text x="180" y="400" textAnchor="middle" className="bio018-small">
          Amilaz yolu ayrı ve sağlam
        </text>
      </Drawing>
      <Result>
        <strong>
          {m.hormone}: <span className="bio018-target">{m.target}</span>
        </strong>
        <p>
          Tripsin: {m.trypsin ? "Bu başlangıç açık" : "Bu başlangıç engelli"}.
          Amilaz yolu bu seçici deneyde korunur.
        </p>
        <p>
          Verilen kesim hesabı: {m.fragments} parça; {m.bonds} kalan bağ;{" "}
          {m.water} su kullanımı.
        </p>
      </Result>
      <Prediction
        id={id}
        context={JSON.stringify([signal, s.starter, s.precursor, chain, cuts])}
        options={[
          ["active", "Proteaz başlangıcı açık"],
          ["blocked", "Proteaz başlangıcı engelli"],
        ]}
        expected={m.trypsin ? "active" : "blocked"}
        explanation="Bağırsak başlatıcı enzimi ve tripsinojen bu modelde birlikte gerekir. Bu özel ağın engeli amilazın da yokluğunu göstermez; kesim sayısı ayrıca verilmiş bağımsız veridir."
      />
    </section>
  );
}

function LiverLab() {
  const id = "sindirim-karaciger-safra";
  const [s, set] = useExploration("forge018-bio-" + id, {
    block: "none",
    gallbladder: true,
    divisions: 2,
    recycled: 80,
  });
  const block = safe(s.block, biliaryBlocks018, "none"),
    divisions = Math.round(bound(s.divisions, 1, 4)),
    recycled = bound(s.recycled, 0, 100),
    m = liver018(block, s.gallbladder, divisions, recycled);
  return (
    <section className="bio018" data-forge018={id}>
      <h3>Bir kanalı kapat, diğer ağı izle</h3>
      <p>
        Öğretim şeması karaciğer kaynaklı ortak yola doğrudan bağlantı varsayar.
        Kan damarları bu seçici kanal deneyinde sağlamdır. Kese yokluğu ile
        safra üretiminin yokluğu aynı koşul değildir.
      </p>
      <div className="bio018-controls">
        <Choice
          label="Safra yolu"
          value={block}
          options={entries(biliaryBlocks018)}
          onChange={(block) => set({ block })}
        />
        <Check
          label="Safra kesesi var"
          checked={s.gallbladder}
          onChange={(gallbladder) => set({ gallbladder })}
        />
        <Range
          label="Damlacık bölünme katsayısı"
          value={divisions}
          min={1}
          max={4}
          onChange={(divisions) => set({ divisions })}
        />
        <Range
          label="Geri dönen birim"
          value={recycled}
          min={0}
          max={100}
          step={10}
          onChange={(recycled) => set({ recycled })}
        />
      </div>
      <Drawing
        title="Karaciğerden doğrudan safra ve keseden safra yolları; ayrı portal kan girişi"
        height={430}
      >
        <Node
          x={20}
          y={70}
          width={140}
          lines={["Karaciğer", "üretir"]}
          active
        />
        <Node
          x={205}
          y={70}
          width={135}
          lines={["Kese", s.gallbladder ? "depolar" : "yok"]}
          active={s.gallbladder}
        />
        <text x="92" y="34" textAnchor="middle" className="bio018-small">
          Portal kan ↓
        </text>
        <path d="M90 41V69" className="bio018-blood" />
        <g data-bile-path="cystic" data-active={m.storedRoute}>
          <Arrow
            x1={160}
            y1={115}
            x2={204}
            y2={115}
            active={m.storedRoute}
            kind="cystic"
          />
        </g>
        <path d="M90 153V245H180" className="bio018-guide" />
        <path
          d="M272 153V245"
          className={m.storedRoute ? "bio018-flow" : "bio018-faded"}
        />
        <Arrow
          x1={272}
          y1={245}
          x2={182}
          y2={245}
          active={m.storedRoute}
          kind="stored-bile"
        />
        <Arrow
          x1={180}
          y1={246}
          x2={180}
          y2={315}
          active={m.direct}
          kind="common"
        />
        <g data-bile-path="common" data-active={m.direct}>
          <circle
            cx="180"
            cy="276"
            r="9"
            className={m.direct ? "bio018-dot" : "bio018-stop"}
          />
        </g>
        <text x="220" y="294" className="bio018-small">
          Koledok
        </text>
        <Node
          x={90}
          y={332}
          width={180}
          lines={["Duodenum"]}
          active={m.direct}
        />
      </Drawing>
      <Result>
        <strong>
          Üretim sürer. Bağırsağa doğrudan yol: {m.direct ? "Açık" : "Engelli"}.
        </strong>
        <p>
          Kesenin kullanılan yolu:{" "}
          {m.storedRoute ? "Açık" : "Bu koşulda kapalı"}. Portal kan bu deneyde
          korunur.
        </p>
        <p>
          Hacim 1 kat kalırken {m.droplets} eş damlacığın toplam yüzeyi{" "}
          {m.relativeSurface} kattır; ester hidrolizi sayılmaz.
        </p>
        <p>
          100 birim havuz: {n(m.recycled)} geri dönüş, {n(m.loss)} kayıp, aynı
          havuz için {n(m.replacement)} yeni sentez.
        </p>
      </Result>
      <Prediction
        id={id}
        context={JSON.stringify([block, s.gallbladder, divisions, recycled])}
        options={[
          ["open", "Doğrudan yol açık"],
          ["blocked", "Doğrudan yol engelli"],
        ]}
        expected={m.direct ? "open" : "blocked"}
        explanation="Sistik yol keseye aittir. Bu şemada karaciğer organının doğrudan çıkışını ortak safra yolu engeli keser; kese yokluğu üretimi tek başına durdurmaz."
      />
    </section>
  );
}

function PancreasLab() {
  const id = "sindirim-pankreas";
  const [s, set] = useExploration("forge018-bio-" + id, {
    duct: true,
    acid: true,
    nutrient: true,
    acidUnits: 8,
    base: 6,
  });
  const acidUnits = bound(s.acidUnits, 0, 12),
    base = bound(s.base, 0, 12),
    m = pancreas018(s.duct, s.acid, s.nutrient, acidUnits, base);
  return (
    <section className="bio018" data-forge018={id}>
      <h3>Kanal, haber ve teslim edilen miktar</h3>
      <p>
        Asit ve besin düğmeleri temel hormon yollarını gösterir. Sayısal deneyde
        ayrıca verilen baz miktarı üretilmiş kabul edilir; yalnız açık kanal bu
        miktarı teslim eder. Adacık kan yolu sağlamdır. Bire bir eşdeğer
        tepkimesi pH hesabı değildir.
      </p>
      <div className="bio018-controls">
        <Check
          label="Ekzokrin kanal açık"
          checked={s.duct}
          onChange={(duct) => set({ duct })}
        />
        <Check
          label="Asit uyarısı var"
          checked={s.acid}
          onChange={(acid) => set({ acid })}
        />
        <Check
          label="Besin uyarısı var"
          checked={s.nutrient}
          onChange={(nutrient) => set({ nutrient })}
        />
        <Range
          label="Asit eşdeğeri"
          value={acidUnits}
          min={0}
          max={12}
          onChange={(acidUnits) => set({ acidUnits })}
        />
        <Range
          label="Üretilmiş baz eşdeğeri"
          value={base}
          min={0}
          max={12}
          onChange={(base) => set({ base })}
        />
      </div>
      <Drawing
        title="Pankreasın asiner-kanal yolu duodenuma; adacık yolu ayrı olarak kana gider"
        height={430}
      >
        <Node
          x={15}
          y={25}
          width={140}
          lines={["Asiner", "enzim"]}
          active={m.cck}
        />
        <Node
          x={205}
          y={25}
          width={140}
          lines={["Kanal", "bikarbonat"]}
          active={m.secretin}
        />
        <path d="M85 107V155H275V107M180 155V213" className="bio018-guide" />
        <Arrow
          x1={180}
          y1={155}
          x2={180}
          y2={213}
          active={m.duct}
          kind="pancreatic-duct"
        />
        <Node x={90} y={225} width={180} lines={["Duodenum"]} active={m.duct} />
        <g data-pancreas-duct={m.duct}>
          <text x="180" y="326" textAnchor="middle" className="bio018-small">
            Kanal: {m.duct ? "açık" : "kapalı"}
          </text>
        </g>
        <Node x={15} y={350} width={145} lines={["Adacık"]} />
        <Arrow x1={162} y1={375} x2={220} y2={375} kind="endocrine" />
        <text x="238" y="384">
          Kan
        </text>
      </Drawing>
      <Result>
        <strong>
          Asit kaldı: {n(m.acidLeft)} eşdeğer. Baz kaldı: {n(m.baseLeft)}{" "}
          eşdeğer.
        </strong>
        <p>
          Teslim edilen baz {n(m.delivered)}, nötralize edilen miktar{" "}
          {n(m.neutralized)} eşdeğerdir. Bu sayılar pH değildir.
        </p>
        <p>
          Sekretin yolu: {m.secretin ? "Uyarı var" : "Bu uyarı yok"}; CCK yolu:{" "}
          {m.cck ? "Uyarı var" : "Bu uyarı yok"}. Sağlam adacık-kan yolu kanal
          engelinden ayrı kalır.
        </p>
      </Result>
      <Prediction
        id={id}
        context={JSON.stringify([s.duct, s.acid, s.nutrient, acidUnits, base])}
        options={[
          ["acid", "Asit artığı var"],
          ["base", "Baz artığı var"],
          ["equal", "Artık yok"],
        ]}
        expected={m.acidLeft > 0 ? "acid" : m.baseLeft > 0 ? "base" : "equal"}
        explanation={`Teslim ${n(m.delivered)}, asit ${n(m.acidUnits)}: küçük miktar kadar bire bir asit ve baz tepkimesi. Üretilmiş olup ulaşmayan baz lümen hesabına girmez; pH bulunmaz.`}
      />
    </section>
  );
}

function HeartLab() {
  const id = "dolasim-kalp";
  const [s, set] = useExploration("forge018-bio-" + id, {
    phase: "fill",
    edv: 120,
    esv: 50,
    rate: 75,
  });
  const phase = safe(s.phase, heartPhases018, "fill"),
    edv = bound(s.edv, 100, 180),
    esv = bound(s.esv, 20, 80),
    rate = bound(s.rate, 40, 140),
    m = heart018(phase, edv, esv, rate);
  return (
    <section className="bio018" data-forge018={id}>
      <h3>Kalp çevrimini elinle ilerlet</h3>
      <p>
        Karşıdan bakışta bedenin sağı şeklin solundadır. Bu dört odacıklı akış
        şeması anatomik ölçekli kesit değildir. Daireler kapakları, düz ok açık
        geçişi, kesik ok kapalı geçişi gösterir; duvar ve çıkış yönünün gerçek
        biçimi sade çizilir.
      </p>
      <div className="bio018-controls">
        <Choice
          label="Çevrim evresi"
          value={phase}
          options={entries(heartPhases018)}
          onChange={(phase) => set({ phase })}
        />
        <Range
          label="Dolum sonu hacmi (mL)"
          value={edv}
          min={100}
          max={180}
          step={10}
          onChange={(edv) => set({ edv })}
        />
        <Range
          label="Kasılma sonu hacmi (mL)"
          value={esv}
          min={20}
          max={80}
          step={10}
          onChange={(esv) => set({ esv })}
        />
        <Range
          label="Dakikadaki atım"
          value={rate}
          min={40}
          max={140}
          step={5}
          onChange={(rate) => set({ rate })}
        />
      </div>
      <Drawing
        title="Anatomik sağ ve sol atriyum-ventrikül ile dört kapağın seçilen evredeki durumu"
        height={450}
      >
        <text x="90" y="30" textAnchor="middle" className="bio018-small">
          Vena kava ↓
        </text>
        <text x="270" y="30" textAnchor="middle" className="bio018-small">
          Akciğerden ↓
        </text>
        <Node x={20} y={50} width={140} lines={["Sağ", "atriyum"]} />
        <Node x={200} y={50} width={140} lines={["Sol", "atriyum"]} />
        <Node
          x={20}
          y={225}
          width={140}
          lines={["Sağ", "ventrikül"]}
          active={m.ventricularContracting}
        />
        <Node
          x={200}
          y={225}
          width={140}
          lines={["Sol", "ventrikül"]}
          active={m.ventricularContracting}
        />
        <Arrow
          x1={90}
          y1={131}
          x2={90}
          y2={223}
          active={m.av}
          kind="right-av"
        />
        <Arrow
          x1={270}
          y1={131}
          x2={270}
          y2={223}
          active={m.av}
          kind="left-av"
        />
        <g data-valve="tricuspid" data-open={m.tricuspid}>
          <circle
            cx="90"
            cy="177"
            r="13"
            className={m.tricuspid ? "bio018-dot" : "bio018-stop"}
          />
        </g>
        <g data-valve="mitral" data-open={m.mitral}>
          <circle
            cx="270"
            cy="177"
            r="13"
            className={m.mitral ? "bio018-dot" : "bio018-stop"}
          />
        </g>
        <Arrow
          x1={90}
          y1={306}
          x2={90}
          y2={387}
          active={m.semilunar}
          kind="pulmonary"
        />
        <Arrow
          x1={270}
          y1={306}
          x2={270}
          y2={387}
          active={m.semilunar}
          kind="aortic"
        />
        <g data-valve="pulmonary" data-open={m.pulmonary}>
          <circle
            cx="90"
            cy="350"
            r="13"
            className={m.pulmonary ? "bio018-dot" : "bio018-stop"}
          />
        </g>
        <g data-valve="aortic" data-open={m.aortic}>
          <circle
            cx="270"
            cy="350"
            r="13"
            className={m.aortic ? "bio018-dot" : "bio018-stop"}
          />
        </g>
        <text x="90" y="424" textAnchor="middle" className="bio018-small">
          Akciğere
        </text>
        <text x="270" y="424" textAnchor="middle" className="bio018-small">
          Vücuda
        </text>
      </Drawing>
      <p>
        Üst sol geçiş triküspit, üst sağ mitral; alt sol çıkış pulmoner, alt sağ
        aort kapağıdır. Dolu mint daire açık, çizgili mercan daire kapalıdır;
        durum metinde de bulunur.
      </p>
      <Result>
        <strong>{heartPhases018[phase]}</strong>
        <p>
          AV kapaklar: {m.av ? "Açık" : "Kapalı"}. Yarımay kapaklar:{" "}
          {m.semilunar ? "Açık" : "Kapalı"}.
        </p>
        <p>
          Atım hacmi {n(m.stroke)} mL; debi {n(m.output)} L/dakika; çevrim{" "}
          {n(m.period)} saniye.
        </p>
        <p>
          {phase === "atrial"
            ? "Atriyum kasılırken ventrikül dolum/gevşeme dönemindedir."
            : phase === "isoContract" || phase === "isoRelax"
              ? "Bütün kapaklar kapalı; bu kısa evrede ventrikül hacmi yaklaşık sabittir."
              : phase === "eject"
                ? "Ventrikül basıncı çıkış arterini aşar, fırlatma yolu açılır."
                : "Karıncık içi basınç kulakçık içi basınçtan düşük; dolum yolu açık."}
        </p>
      </Result>
      <Prediction
        id={id}
        context={JSON.stringify([phase, edv, esv, rate])}
        options={[
          ["av", "AV kapak açık"],
          ["semi", "Yarımay kapak açık"],
          ["closed", "Tümü kapalı"],
        ]}
        expected={m.av ? "av" : m.semilunar ? "semi" : "closed"}
        explanation="Kapaklar basınç farkıyla açılır. Hacim sabit kasılma ve gevşeme evresinde iki kapak grubu da kapalıdır; kasılma her an dışa akış demek değildir."
      />
    </section>
  );
}

function VesselsLab() {
  const id = "dolasim-damarlar-starling";
  const [s, set] = useExploration("forge018-bio-" + id, {
    flow: 100,
    area: 20,
    hydro: 40,
    oncotic: 25,
    filtered: 20,
    returned: 17,
    capacity: 3,
  });
  const flow = bound(s.flow, 20, 200),
    area = bound(s.area, 10, 200),
    hydro = bound(s.hydro, 10, 40),
    oncotic = bound(s.oncotic, 15, 35),
    filtered = bound(s.filtered, 0, 30),
    returned = bound(s.returned, 0, filtered),
    capacity = bound(s.capacity, 0, 15),
    m = vessels018(flow, area, hydro, oncotic, filtered, returned, capacity);
  return (
    <section className="bio018" data-forge018={id}>
      <h3>Üç ayrı hesabı yan yana sınayalım</h3>
      <p>
        Hız hesabı toplam paralel alanı kullanır. Basınç şeması klasik
        azaltılmış Pc−π modelidir; diğer basınç terimleri sıfırdır. Son sıvı
        bütçesi ayrıca verilmiştir, basınç sayısından hacim üretilmez.
      </p>
      <div className="bio018-controls">
        <Range
          label="Akış Q (cm³/s)"
          value={flow}
          min={20}
          max={200}
          step={10}
          onChange={(flow) => set({ flow })}
        />
        <Range
          label="Toplam alan (cm²)"
          value={area}
          min={10}
          max={200}
          step={10}
          onChange={(area) => set({ area })}
        />
        <Range
          label="Hidrostatik Pc (mmHg)"
          value={hydro}
          min={10}
          max={40}
          onChange={(hydro) => set({ hydro })}
        />
        <Range
          label="Onkotik karşı etki (mmHg)"
          value={oncotic}
          min={15}
          max={35}
          onChange={(oncotic) => set({ oncotic })}
        />
        <Range
          label="Dışa geçen hacim"
          value={filtered}
          min={0}
          max={30}
          onChange={(filtered) =>
            set({ filtered, returned: Math.min(returned, filtered) })
          }
        />
        <Range
          label="Doğrudan dönen hacim"
          value={returned}
          min={0}
          max={filtered}
          onChange={(returned) => set({ returned })}
        />
        <Range
          label="Lenf kapasitesi"
          value={capacity}
          min={0}
          max={15}
          onChange={(capacity) => set({ capacity })}
        />
      </div>
      <Drawing
        title="Kılcal ve doku arasında basınç yönü; ayrı şematik toplam alan ve ortalama hız göstergesi"
        height={430}
      >
        <text x="180" y="32" textAnchor="middle">
          Kan kılcalı
        </text>
        <rect
          x="25"
          y="55"
          width="310"
          height="76"
          rx="15"
          className="bio018-cell"
        />
        <text x="180" y="103" textAnchor="middle">
          Pc: {n(m.hydrostatic)}
        </text>
        <g data-starling-direction={m.direction}>
          <Arrow
            x1={100}
            y1={m.netPressure < 0 ? 246 : 140}
            x2={100}
            y2={m.netPressure < 0 ? 140 : 246}
            active={m.netPressure !== 0}
            kind="starling"
          />
        </g>
        <text x="204" y="191" className="bio018-small">
          π: {n(m.oncotic)}
        </text>
        <text x="180" y="280" textAnchor="middle">
          Doku sıvısı
        </text>
        <text x="25" y="325" className="bio018-small">
          Alan
        </text>
        <rect
          data-total-area
          x="110"
          y="307"
          width={m.area}
          height="28"
          className="bio018-bar"
        />
        <text x="25" y="376" className="bio018-small">
          Hız
        </text>
        <rect
          data-velocity
          x="110"
          y="358"
          width={m.velocity * 10}
          height="28"
          className="bio018-bar"
        />
        <text x="180" y="418" textAnchor="middle" className="bio018-small">
          Çubuklar ayrı ölçeklidir
        </text>
      </Drawing>
      <p>
        Üst basınç değerleri mmHg’dir. Alan çubuğu 1 çizim birimi/cm², hız
        çubuğu 10 çizim birimi/(cm/s) kullanır; iki çubuğun boyu farklı
        nicelikleri temsil eder.
      </p>
      <Result>
        <strong>
          Hız: {n(m.velocity)} cm/s. Net fark: {n(m.netPressure)} mmHg (
          {m.direction}).
        </strong>
        <p>
          Verilen hacim bütçesinde artık {n(m.excess)}, gerçek lenf {n(m.lymph)}
          , birikim {n(m.accumulation)} hacim birimidir.
        </p>
        <p>
          Hacim penceresi bütün giriş-çıkışları ayrı tanımlar; basınç farkı
          doğrudan mL/s değildir.
        </p>
      </Result>
      <Prediction
        id={id}
        context={JSON.stringify([
          flow,
          area,
          hydro,
          oncotic,
          filtered,
          returned,
          capacity,
        ])}
        options={[
          ["out", "Dışa eğilim"],
          ["in", "İçe eğilim"],
          ["zero", "Net fark sıfır"],
        ]}
        expected={m.netPressure > 0 ? "out" : m.netPressure < 0 ? "in" : "zero"}
        explanation={`${n(m.hydrostatic)}−${n(m.oncotic)}=${n(m.netPressure)} mmHg. Dışa pozitif tanım kullanılır; hacimsel akış için ek katsayı gerekir.`}
      />
    </section>
  );
}

function BloodLab() {
  const id = "dolasim-kan-doku";
  const [s, set] = useExploration("forge018-bio-" + id, {
    total: 10,
    packed: 4.5,
    step: "fibrin",
    platelets: true,
    factors: true,
  });
  const total = bound(s.total, 5, 20),
    packed = bound(s.packed, 0, total),
    step = safe(s.step, hemostasisSteps018, "fibrin"),
    m = blood018(total, packed, step, s.platelets, s.factors);
  const stackBottom = 242,
    redHeight = (m.hematocrit / 100) * 160;
  return (
    <section className="bio018" data-forge018={id}>
      <h3>Hacim payını ve pıhtı ağını ayrı incele</h3>
      <p>
        Sol tüp pıhtı önleyici ekli kanın ayrılmış hacim modelidir; ince
        akyuvar-trombosit katı burada ölçekli çizilmez. Sağ çizim seçici
        hemostaz kartıdır; iki deney aynı anda santrifüj tüpünde pıhtı
        oluştuğunu söylemez.
      </p>
      <div className="bio018-controls">
        <Range
          label="Toplam örnek (mL)"
          value={total}
          min={5}
          max={20}
          onChange={(total) => set({ total, packed: Math.min(packed, total) })}
        />
        <Range
          label="Eritrosit tabakası (mL)"
          value={packed}
          min={0}
          max={total}
          step={0.5}
          onChange={(packed) => set({ packed })}
        />
        <Choice
          label="Hemostaz basamağı"
          value={step}
          options={entries(hemostasisSteps018)}
          onChange={(step) => set({ step })}
        />
        <Check
          label="Trombosit yolu sağlam"
          checked={s.platelets}
          onChange={(platelets) => set({ platelets })}
        />
        <Check
          label="Faktör yolu sağlam"
          checked={s.factors}
          onChange={(factors) => set({ factors })}
        />
      </div>
      <Drawing
        title="Paketlenmiş eritrosit hacim yüzdesi ve ayrı seçici trombosit-fibrin hemostaz kartı"
        height={400}
      >
        <text x="90" y="35" textAnchor="middle" className="bio018-small">
          Hacim tüpü
        </text>
        <rect
          x="45"
          y="80"
          width="90"
          height="164"
          rx="8"
          className="bio018-cell"
        />
        <rect
          data-packed-cells
          x="47"
          y={stackBottom - redHeight}
          width="86"
          height={redHeight}
          className="bio018-red"
        />
        <text x="90" y="292" textAnchor="middle">
          %{n(m.hematocrit)}
        </text>
        <text x="265" y="35" textAnchor="middle" className="bio018-small">
          Hasar alanı
        </text>
        <path d="M190 95H230M282 95H340M190 225H340" className="bio018-guide" />
        <g data-platelet-plug={m.plug}>
          {m.plug &&
            [0, 1, 2].map((i) => (
              <circle
                key={i}
                cx={238 + i * 17}
                cy={99 + (i % 2) * 10}
                r="9"
                className="bio018-dot"
              />
            ))}
        </g>
        <g data-fibrin-net={m.fibrin}>
          {m.fibrin &&
            [0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M${222 + i * 24} 115L${282 - i * 16} 190M215 ${132 + i * 24}H305`}
                className="bio018-fibrin"
              />
            ))}
        </g>
        <text x="265" y="281" textAnchor="middle" className="bio018-small">
          Tıkaç + ağ
        </text>
        <text x="180" y="352" textAnchor="middle" className="bio018-small">
          Hücre sayısı ≠ hacim payı
        </text>
      </Drawing>
      <Result>
        <strong>Hct: %{n(m.hematocrit)}.</strong>
        <p>Hct, alyuvar hacminin toplam kan hacmine oranıdır.</p>
        <p>
          {n(m.packed)}/{n(m.total)} ×100. Diğer hacim {n(m.rest)} mL; bu oran
          eritrosit sayısını tek başına vermez.
        </p>
        <p>
          Seçili basamak: {hemostasisSteps018[step]} —{" "}
          {m.active ? "Verilen koşul açık" : "Verilen koşul engelli"}. Trombosit
          tıkacı {m.plug ? "var" : "yok"}, fibrin yolu{" "}
          {m.fibrin ? "sağlam" : "engelli"}. İki destek birlikte{" "}
          {m.stablePlug ? "sağlam" : "tamam değil"}.
        </p>
      </Result>
      <Prediction
        id={id}
        context={JSON.stringify([total, packed, step, s.platelets, s.factors])}
        options={[
          ["both", "Tıkaç ve ağ birlikte"],
          ["platelet", "Yalnız tıkaç desteği"],
          ["fibrin", "Yalnız fibrin yolu"],
          ["none", "İki destek de eksik"],
        ]}
        expected={
          m.plug && m.fibrin
            ? "both"
            : m.plug
              ? "platelet"
              : m.fibrin
                ? "fibrin"
                : "none"
        }
        explanation="Bu seçici deneyde trombosit tıkacı ve faktörlerin fibrin yolu ayrı değişir. Gerçek hemostaz bir bütündür; bu yollar birlikte işler; ABO’da alyuvarın bir araya gelmesi bu protein ağıyla aynı yol değildir."
      />
    </section>
  );
}

function LymphLab() {
  const id = "lenf-sistemi";
  const [s, set] = useExploration("forge018-bio-" + id, {
    region: "rightArm",
    blocked: false,
    initial: 10,
    filtration: 5,
    capacity: 3,
  });
  const region = safe(s.region, lymphRegions018, "rightArm"),
    initial = bound(s.initial, 0, 20),
    filtration = bound(s.filtration, 0, 10),
    capacity = bound(s.capacity, 0, 10),
    m = lymph018(region, s.blocked, initial, filtration, capacity);
  const point: Record<LymphRegion018, [number, number]> = {
    rightArm: [82, 195],
    rightHead: [167, 66],
    rightChest: [144, 162],
    leftArm: [278, 195],
    legs: [150, 320],
    intestine: [180, 225],
  };
  const [px, py] = point[region],
    targetX = m.right ? 145 : 215;
  return (
    <section className="bio018" data-forge018={id}>
      <h3>İki eşit yarı yerine iki farklı havza</h3>
      <p>
        Önden bakış: bedenin sağı şeklin soludur. Seçilen bölgenin büyük kanalı
        gösterilir; ince dalların anatomik biçimi sade çizilir. Sıvı hesabında
        verilen giriş, doğrudan kan dönüşü düşülmüş net doku girişidir.
      </p>
      <div className="bio018-controls">
        <Choice
          label="Başlangıç bölgesi"
          value={region}
          options={entries(lymphRegions018)}
          onChange={(region) => set({ region })}
        />
        <Check
          label="Seçili lenf yolu kapalı"
          checked={s.blocked}
          onChange={(blocked) => set({ blocked })}
        />
        <Range
          label="İlk doku sıvısı (mL)"
          value={initial}
          min={0}
          max={20}
          onChange={(initial) => set({ initial })}
        />
        <Range
          label="Net doku girişi (mL)"
          value={filtration}
          min={0}
          max={10}
          onChange={(filtration) => set({ filtration })}
        />
        <Range
          label="Lenf kapasitesi (mL)"
          value={capacity}
          min={0}
          max={10}
          onChange={(capacity) => set({ capacity })}
        />
      </div>
      <Drawing
        title="Anatomik sağ üst bölgenin sağ kanalı ve diğer seçili bölgelerin göğüs kanalıyla sol venöz köşeye dönüşü"
        height={420}
      >
        <text x="55" y="32" textAnchor="middle">
          Sağ
        </text>
        <text x="305" y="32" textAnchor="middle">
          Sol
        </text>
        <circle cx="180" cy="65" r="36" className="bio018-organ" />
        <path
          data-lymph-body
          d="M148 100L110 125L48 220L70 236L117 171V267L130 377H160L180 281L200 377H230L243 267V171L290 236L312 220L250 125L212 100Z"
          className="bio018-organ"
        />
        <path d="M180 340V185Q180 155 215 130" className="bio018-faded" />
        <circle cx="145" cy="125" r="9" className="bio018-dot" />
        <circle cx="215" cy="125" r="9" className="bio018-dot" />
        <g
          data-lymph-route={m.right ? "right" : "thoracic"}
          data-open={!m.blocked}
        >
          <path
            d={
              region === "rightHead"
                ? `M${px} ${py}L175 100L145 125`
                : m.right
                  ? `M${px} ${py}Q90 135 ${targetX} 125`
                  : `M${px} ${py}L180 240V180Q180 150 ${targetX} 125`
            }
            className={m.blocked ? "bio018-faded" : "bio018-flow"}
          />
          <circle
            data-lymph-origin
            cx={px}
            cy={py}
            r="12"
            className="bio018-dot"
          />
        </g>
        <path d="M145 125H37M215 125H323" className="bio018-leader" />
        <text x="30" y="108" className="bio018-small">
          Sağ köşe
        </text>
        <text x="235" y="108" className="bio018-small">
          Sol köşe
        </text>
        <text x="180" y="411" textAnchor="middle" className="bio018-small">
          Alt bölgeler → sol köşe
        </text>
      </Drawing>
      <Result>
        <strong>
          {lymphRegions018[region]} → {m.route} → {m.venousAngle}.
        </strong>
        <p>
          Gerçek çıkış {n(m.actual)} mL; son doku sıvısı {n(m.final)} mL.
          Değişim {m.change > 0 ? "+" : ""}
          {n(m.change)} mL.
        </p>
        <p>
          {m.blocked
            ? "Seçili yol kapalı: bu modelde çıkış sıfır. Kan dolaşımı otomatik kapanmaz."
            : "Çıkış kapasite ile sınırlı; mevcut sıvıdan fazlası taşınmaz."}
        </p>
      </Result>
      <Prediction
        id={id}
        context={JSON.stringify([
          region,
          s.blocked,
          initial,
          filtration,
          capacity,
        ])}
        options={[
          ["right", "Sağ kanal / sağ köşe"],
          ["thoracic", "Göğüs kanalı / sol köşe"],
        ]}
        expected={m.right ? "right" : "thoracic"}
        explanation="Sağ üst bölgenin seçili örnekleri sağ kanala gider. Sağ bacak da dahil alt bölgeler ve sol üst bölüm göğüs kanalına katılır; tüm sağ beden tek kanala katılmaz."
      />
    </section>
  );
}

function ImmuneLab() {
  const id = "bagisiklik-sistemi";
  const [s, set] = useExploration("forge018-bio-" + id, {
    antigen: "a",
    memoryA: true,
    passiveA: false,
    days: 0,
    presented: true,
  });
  const antigen = safe(s.antigen, immuneAntigens018, "a"),
    days = bound(s.days, 0, 12),
    m = immunity018(antigen, s.memoryA, s.passiveA, days, s.presented);
  return (
    <section className="bio018" data-forge018={id}>
      <h3>Hedefe eşleşme, bellek ve hazır antikor</h3>
      <p>
        A ve B antijenleri bu modelde çapraz tanımaz. Bellek ve hazır antikor
        yalnız A’ya aittir. Hazır antikor için 32 birim başlangıç ve 4 günlük
        yapay yarı ömür verilir; bu gerçek herkesin süresi değildir. T tanıması
        düğmesi uygun peptit–MHC sunumunu varsayar.
      </p>
      <div className="bio018-controls">
        <Choice
          label="Karşılaşılan antijen"
          value={antigen}
          options={entries(immuneAntigens018)}
          onChange={(antigen) => set({ antigen })}
        />
        <Check
          label="A için bellek var"
          checked={s.memoryA}
          onChange={(memoryA) => set({ memoryA })}
        />
        <Check
          label="Hazır A antikoru var"
          checked={s.passiveA}
          onChange={(passiveA) => set({ passiveA })}
        />
        <Check
          label="T için uygun sunum var"
          checked={s.presented}
          onChange={(presented) => set({ presented })}
        />
        <Range
          label="Geçen gün"
          value={days}
          min={0}
          max={12}
          onChange={(days) => set({ days })}
        />
      </div>
      <Drawing
        title="A veya B şekline özgü tanıma, ayrı A belleği ve hazır A antikoru; T hücresine uygun yüzey sunumu"
        height={440}
      >
        <text x="180" y="31" textAnchor="middle">
          Seçili antijen {antigen.toUpperCase()}
        </text>
        <g data-antigen-shape={antigen}>
          {antigen === "a" ? (
            <path d="M158 98L180 60L202 98Z" className="bio018-antigen" />
          ) : (
            <rect
              x="160"
              y="60"
              width="40"
              height="40"
              className="bio018-antigen"
            />
          )}
        </g>
        <Node
          x={15}
          y={146}
          width={145}
          lines={["A belleği", m.matchingMemory ? "eşleşir" : "eşleşmez"]}
          active={m.matchingMemory}
        />
        <Node
          x={200}
          y={146}
          width={145}
          lines={["Hazır anti-A", m.matchingPassive ? "eşleşir" : "eşleşmez"]}
          active={m.matchingPassive}
        />
        <Arrow
          x1={165}
          y1={108}
          x2={90}
          y2={143}
          active={m.matchingMemory}
          kind="memory"
        />
        <Arrow
          x1={195}
          y1={108}
          x2={270}
          y2={143}
          active={m.matchingPassive}
          kind="passive"
        />
        <g
          data-memory-match={m.matchingMemory}
          data-passive-match={m.matchingPassive}
        >
          <circle
            cx="180"
            cy="256"
            r="12"
            className={
              m.matchingMemory || m.matchingPassive
                ? "bio018-dot"
                : "bio018-stop"
            }
          />
        </g>
        <Node
          x={15}
          y={295}
          width={145}
          lines={["Peptit–MHC", m.presented ? "sunulur" : "yok"]}
        />
        <Node
          x={220}
          y={295}
          width={125}
          lines={["T hücresi"]}
          active={m.tRecognition}
        />
        <Arrow
          x1={162}
          y1={325}
          x2={218}
          y2={325}
          active={m.tRecognition}
          kind="presentation"
        />
        <text x="180" y="419" textAnchor="middle" className="bio018-small">
          A belleği ≠ her hedef belleği
        </text>
      </Drawing>
      <Result>
        <strong>{m.response}.</strong>
        <p>
          Hazır anti-A miktarı {n(m.passiveAmount)} birim. Seçili hedefe
          eşleşme: {m.matchingPassive ? "Var" : "Yok"}; miktar ile hedef uyumu
          ayrıdır.
        </p>
        <p>
          T tanıması için verilen sunum:{" "}
          {m.tRecognition ? "Uygun" : "Bu kartta yok"}. Hazır antikor alıcının
          belleğini otomatik üretmez.
        </p>
      </Result>
      <Prediction
        id={id}
        context={JSON.stringify([
          antigen,
          s.memoryA,
          s.passiveA,
          days,
          s.presented,
        ])}
        options={[
          ["memory", "Bu hedefe bellek var"],
          ["primary", "Bu hedef için bellek yok"],
        ]}
        expected={m.matchingMemory ? "memory" : "primary"}
        explanation="Özgül bellek için hedef eşleşmesi gerekir. Hazır anti-A bir miktar taşısa bile alıcının kendi bellek hücresinin yerine geçmez; A belleği B’ye otomatik yayılmaz."
      />
    </section>
  );
}

export default function Forge018BiologyLab({ lessonId }: { lessonId: string }) {
  switch (lessonId) {
    case "sindirim-bagirsaklar":
      return <IntestineLab />;
    case "sindirim-enzimler-hormonlar":
      return <EnzymesLab />;
    case "sindirim-karaciger-safra":
      return <LiverLab />;
    case "sindirim-pankreas":
      return <PancreasLab />;
    case "dolasim-kalp":
      return <HeartLab />;
    case "dolasim-damarlar-starling":
      return <VesselsLab />;
    case "dolasim-kan-doku":
      return <BloodLab />;
    case "lenf-sistemi":
      return <LymphLab />;
    case "bagisiklik-sistemi":
      return <ImmuneLab />;
    default:
      return null;
  }
}
