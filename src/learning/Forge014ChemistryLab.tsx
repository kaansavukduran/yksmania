import { useId, type ReactNode } from "react";
import {
  carbonateBalance,
  formulaCount,
  formulaSamples,
  ironSulfur,
  massAmount,
  multiplePairs,
  multipleRatio,
  waterBudget,
} from "./forge014Chemistry";
import { useExploration } from "./useExploration";
import "./forge014Chemistry.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number, digits = 3) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(n);
const bound = (n: number, min: number, max: number) =>
  Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;
function Drawing({ title, children }: { title: string; children: ReactNode }) {
  const uid = useId();
  return (
    <svg
      className="c014-drawing"
      role="img"
      aria-labelledby={`${uid}-title`}
      viewBox="0 0 620 280"
    >
      <title id={`${uid}-title`}>{title}</title>
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
  const uid = useId();
  return (
    <div className="c014-control">
      <label htmlFor={uid}>{label}</label>
      <span className="c014-current">{fmt(value)}</span>
      <input
        id={uid}
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
function Choice({
  label,
  value,
  choices,
  onChange,
}: {
  label: string;
  value: string;
  choices: readonly (readonly [string, string])[];
  onChange: (v: string) => void;
}) {
  const uid = useId();
  return (
    <div className="c014-control">
      <label htmlFor={uid}>{label}</label>
      <ChoiceSelect id={uid} value={value} onChange={(e) => onChange(e.target.value)}>
        {choices.map(([v, t]) => (
          <option value={v} key={v}>
            {t}
          </option>
        ))}
      </ChoiceSelect>
      <div className="c014-current">
        Seçili: {choices.find(([v]) => v === value)?.[1]}
      </div>
    </div>
  );
}
function Result({ children }: { children: ReactNode }) {
  return (
    <div data-model-result className="c014-result" aria-live="polite">
      {children}
    </div>
  );
}
const ids = [
  "su-hayat-cevre",
  "kutle-korunumu-sabit-oran",
  "sinirlayici-artan-madde",
  "katli-oranlar",
  "mol-tanecik-iliskisi",
  "mol-kutle-iliskisi",
];
export default function Forge014ChemistryLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const uid = useId();
  const [s, set] = useExploration(`forge014:chemistry:${lessonId}`, {
    flow: 12,
    minutes: 5,
    repeats: 1,
    leak: 0,
    quality: "rain",
    progress: 100,
    open: false,
    fe: 14,
    sulfur: 12,
    pair: "co",
    fixed: "x",
    target: 12,
    sample: "calcium",
    moles: 0.25,
    mode: "atoms",
    mass: 37,
    guess: "",
    reason: "",
    checked: false,
  });
  const update = (changes: Partial<typeof s>) =>
    set({ ...changes, checked: false });
  const flow = bound(s.flow, 2, 16),
    minutes = bound(s.minutes, 1, 10),
    repeats = bound(s.repeats, 1, 5),
    leak = bound(s.leak, 0, 100),
    progress = bound(s.progress, 0, 100),
    fe = bound(s.fe, 0, 35),
    sulfur = bound(s.sulfur, 0, 20),
    target = bound(s.target, 1, 48),
    moles = bound(s.moles, 0, 2),
    mass = bound(s.mass, 0, 148);
  const sample = formulaSamples.some((x) => x.id === s.sample)
    ? s.sample
    : "calcium";
  let title = "",
    lead = "",
    model: ReactNode = null,
    controls: ReactNode = null,
    result: ReactNode = null,
    expected = "",
    wrong: string[] = [];
  if (lessonId === "su-hayat-cevre") {
    title = "Bir işi koru, su bütçesini değiştir";
    lead =
      "Kurmaca karşılaştırma: eski kullanım 12 L/dk × 5 dk. Aynı iş ve aynı günlük tekrar sayısı korunur. Kaçak iki düzende de değişmeden sürer. Hacim hesabı kalite veya içilebilirlik onayı vermez.";
    const w = waterBudget(flow, minutes, repeats, leak),
      max = Math.max(w.old, w.total, 1),
      h1 = (160 * w.old) / max,
      h2 = (160 * w.total) / max,
      quality =
        s.quality === "soft"
          ? "Yalnız düşük sertlik ölçüldü; mikrobiyolojik ve diğer kimyasal ölçütler bilinmiyor."
          : "Yağmur suyu çatıdan depoya toplandı; gerekli kalite analizleri verilmedi.";
    expected =
      w.saving > 0
        ? "Toplam tüketim azalır; kalite için ek veri gerekir."
        : w.saving < 0
          ? "Toplam tüketim artar; kalite için ek veri gerekir."
          : "Toplam tüketim aynı kalır; kalite için ek veri gerekir.";
    wrong = [
      "Litre değeri tek başına içilebilirliği kanıtlar.",
      "Kaçak iki düzende de aynıysa su kalitesi zorunlu aynı olur.",
    ];
    controls = (
      <>
        <Range
          label="Yeni debi (L/dk)"
          value={flow}
          min={2}
          max={16}
          onChange={(v) => update({ flow: v })}
        />
        <Range
          label="Yeni kullanım süresi (dk)"
          value={minutes}
          min={1}
          max={10}
          onChange={(v) => update({ minutes: v })}
        />
        <Range
          label="Günlük tekrar sayısı"
          value={repeats}
          min={1}
          max={5}
          onChange={(v) => update({ repeats: v })}
        />
        <Range
          label="Değişmeyen günlük kaçak (L)"
          value={leak}
          min={0}
          max={100}
          onChange={(v) => update({ leak: v })}
        />
        <Choice
          label="Kalite kanıtı örneği"
          value={s.quality === "soft" ? "soft" : "rain"}
          choices={[
            ["rain", "Depoda toplanan yağmur suyu"],
            ["soft", "Düşük sertlik ölçülen su"],
          ]}
          onChange={(v) => update({ quality: v })}
        />
      </>
    );
    model = (
      <Drawing
        title={`Günlük toplam: eski ${fmt(w.old)} L, yeni ${fmt(w.total)} L. Kaçak ${fmt(w.loss)} L her ikisine dahil.`}
      >
        <path d="M80 235H530" />
        <rect
          data-water="old"
          x="130"
          y={235 - h1}
          width="110"
          height={h1}
          className="c014-old"
        />
        <rect
          data-water="new"
          x="380"
          y={235 - h2}
          width="110"
          height={h2}
          className="c014-new"
        />
        <text x="185" y="265" textAnchor="middle">
          Eski: {fmt(w.old)} L
        </text>
        <text x="435" y="265" textAnchor="middle">
          Yeni: {fmt(w.total)} L
        </text>
        <text x="310" y="30" textAnchor="middle">
          Aynı iş, günlük toplam
        </text>
      </Drawing>
    );
    result = (
      <>
        <p>
          Eski kullanım: {fmt(w.oldUse)} L + kaçak {fmt(w.loss)} L ={" "}
          <strong>{fmt(w.old)} L/gün</strong>.
        </p>
        <p>
          Yeni kullanım: {fmt(w.used)} L + kaçak {fmt(w.loss)} L ={" "}
          <strong>{fmt(w.total)} L/gün</strong>.
        </p>
        <p>
          Eski − yeni: <strong>{fmt(w.saving)} L/gün</strong>; eski toplamın %
          {fmt(w.percent, 2)} kadarı. Negatif değer artış demektir.
        </p>
        <p>{quality} Bu veriler içme amacı için yeterli değildir.</p>
      </>
    );
  } else if (lessonId === "kutle-korunumu-sabit-oran") {
    title = "Kabın sınırını değiştir, maddeyi kaybetme";
    lead =
      "100 g saf CaCO₃ → 56 g CaO + 44 g CO₂ tam ayrışma ölçeği. Ca = 40, C = 12, O = 16. İlerleme gerçek zaman veya hız değildir. Açık modelde oluşan CO₂ bütünüyle kaptan çıkar; diğer maddeler kapta kalır.";
    const c = carbonateBalance(progress, s.open);
    expected =
      s.open && progress > 0
        ? "Kapta tartılan azalır; kap ve çıkan gaz toplamı 100 g kalır."
        : "Birlikte tartılan toplam 100 g kalır.";
    wrong = [
      "Açılan kap atomları yok eder.",
      "CaO ürünü tek başına her ilerlemede 100 g olur.",
    ];
    controls = (
      <>
        <Range
          label="Ayrışma ilerlemesi (%)"
          value={progress}
          min={0}
          max={100}
          step={10}
          onChange={(v) => update({ progress: v })}
        />
        <Choice
          label="Tartım sınırı"
          value={s.open ? "open" : "closed"}
          choices={[
            ["closed", "Kapalı: gaz dahil bütün düzenek"],
            ["open", "Açık: yalnız kapta kalanlar"],
          ]}
          onChange={(v) => update({ open: v === "open" })}
        />
      </>
    );
    model = (
      <Drawing
        title={`${s.open ? "Açık" : "Kapalı"} kap: CaCO₃ ${fmt(c.unreacted)} g, CaO ${fmt(c.solid)} g, CO₂ ${fmt(c.gas)} g. Tartılan ${fmt(c.measured)} g.`}
      >
        <rect
          x="60"
          y="55"
          width="350"
          height="180"
          rx="15"
          className="c014-boundary"
        />
        <text x="235" y="40" textAnchor="middle">
          {s.open ? "Kapta kalanlar" : "Gaz dahil kapalı sınır"}
        </text>
        <rect
          data-mass="carbonate"
          x="80"
          y="125"
          width={3 * c.unreacted}
          height="25"
          className="c014-old"
        />
        <rect
          data-mass="oxide"
          x="80"
          y="190"
          width={3 * c.solid}
          height="25"
          className="c014-new"
        />
        <text data-mass-label="carbonate" x="80" y="115">
          CaCO₃: {fmt(c.unreacted)} g
        </text>
        <text data-mass-label="oxide" x="80" y="180">
          CaO: {fmt(c.solid)} g
        </text>
        <circle
          cx={s.open ? 510 : 330}
          cy="90"
          r={18 + 0.3 * c.gas}
          className="c014-gas"
        />
        <text
          x={s.open ? 510 : 330}
          y="95"
          textAnchor="middle"
          className="c014-onfill"
        >
          {fmt(c.gas)} g
        </text>
        <text x="510" y="160" textAnchor="middle">
          CO₂ {s.open ? "dışarıda" : "içeride"}
        </text>
        <text x="310" y="255" textAnchor="middle">
          Toplam: {fmt(c.closedTotal)} g
        </text>
      </Drawing>
    );
    result = (
      <>
        <p>
          Kalan CaCO₃: <strong>{fmt(c.unreacted)} g</strong>; oluşan CaO:{" "}
          <strong>{fmt(c.solid)} g</strong>; oluşan CO₂:{" "}
          <strong>{fmt(c.gas)} g</strong>.
        </p>
        <p>
          Bu sınırda tartılan: <strong>{fmt(c.measured)} g</strong>. Bütün
          maddelerin toplamı: <strong>{fmt(c.closedTotal)} g</strong>.
        </p>
        <p>
          Başlangıçtaki saf CaCO₃ içinde 40 g Ca, 12 g C ve 48 g O vardır.
          Ayrışma bunları yok etmez; ürünlere ve varsa kalan girene dağıtır.
        </p>
      </>
    );
  } else if (lessonId === "sinirlayici-artan-madde") {
    title = "İki gireni bir tarifle eşleştir";
    lead =
      "Verilen kütle tarifi: 7 g Fe + 4 g S → 11 g FeS. Saf girenler, tek ürün ve tamamlanabilen tepkime varsayılır. İlerleme ekseni zaman değildir; kütlelerin nasıl paylaşıldığını gösterir.";
    const r = ironSulfur(fe, sulfur, progress),
      lim =
        r.limiter === "none"
          ? "Başlangıçta giren yok; ürün oluşmaz."
          : r.limiter === "both"
            ? "Tam oranlı; iki giren birlikte tükenir."
            : r.limiter === "iron"
              ? "Fe sınırlayıcıdır."
              : "S sınırlayıcıdır.";
    expected = lim;
    wrong =
      r.limiter === "both"
        ? ["Yalnız Fe artar.", "Yalnız S artar."]
        : r.limiter === "iron"
          ? ["S sınırlayıcıdır.", "Her başlangıç kütlesi ürüne dönüşür."]
          : ["Fe sınırlayıcıdır.", "Her başlangıç kütlesi ürüne dönüşür."];
    controls = (
      <>
        <Range
          label="Başlangıç Fe (g)"
          value={fe}
          min={0}
          max={35}
          step={0.5}
          onChange={(v) => update({ fe: v })}
        />
        <Range
          label="Başlangıç S (g)"
          value={sulfur}
          min={0}
          max={20}
          step={0.5}
          onChange={(v) => update({ sulfur: v })}
        />
        <Range
          label="Tepkime ilerlemesi (%)"
          value={progress}
          min={0}
          max={100}
          step={10}
          onChange={(v) => update({ progress: v })}
        />
      </>
    );
    model = (
      <Drawing
        title={`Kalan Fe ${fmt(r.leftFe)} g, kalan S ${fmt(r.leftS)} g, FeS ${fmt(r.product)} g. Toplam ${fmt(r.total)} g.`}
      >
        {[
          { label: "Fe", value: r.leftFe, y: 55, kind: "c014-old", max: 35 },
          { label: "S", value: r.leftS, y: 125, kind: "c014-gas", max: 35 },
          { label: "FeS", value: r.product, y: 195, kind: "c014-new", max: 55 },
        ].map((b) => (
          <g key={b.label}>
            <text x="25" y={b.y + 26}>
              {b.label}
            </text>
            <rect
              data-reagent={b.label}
              x="110"
              y={b.y}
              height="35"
              width={7 * b.value}
              className={b.kind}
            />
            <text x="535" y={b.y + 26}>
              {fmt(b.value)} g
            </text>
          </g>
        ))}
      </Drawing>
    );
    result = (
      <>
        <p>
          Tam tepkime kapasitesi: Fe için {fmt(fe / 7)}, S için{" "}
          {fmt(sulfur / 4)} tarif. <strong>{lim}</strong>
        </p>
        <p>
          Bu ilerlemede tüketilen: {fmt(r.consumedFe)} g Fe ve{" "}
          {fmt(r.consumedS)} g S.
        </p>
        <p>
          FeS: <strong>{fmt(r.product)} g</strong>; kalan Fe:{" "}
          <strong>{fmt(r.leftFe)} g</strong>; kalan S:{" "}
          <strong>{fmt(r.leftS)} g</strong>.
        </p>
        <p>
          Son toplam: {fmt(r.product + r.leftFe + r.leftS)} g = başlangıç{" "}
          {fmt(r.total)} g. Sınırlayıcı etiketi tam tepkime sonucuna ilişkindir;
          ara aşamada iki giren de bulunabilir.
        </p>
      </>
    );
  } else if (lessonId === "katli-oranlar") {
    title = "Bir elementi eşitle, diğerini karşılaştır";
    lead =
      "Birinci bileşik bölü ikinci bileşik sırasını koru. Verilen atom kütleleri C = 12, N = 14, O = 16. Referans kütlesini büyütmek oranı değiştirmez. Aynı basit bileşimdeki çift ayrıca işaretlenir.";
    const r = multipleRatio(s.pair, s.fixed === "y" ? "y" : "x", target);
    expected = `Eşit ${r.fixed} için ${r.other}(I)/${r.other}(II) = ${fmt(r.ratio)}.`;
    wrong = [
      "Karşılaştırılan diğer elementin kütleleri her çiftte eşittir.",
      "Referans miktarı iki katına çıkarsa son oran da iki katına çıkar.",
    ];
    controls = (
      <>
        <Choice
          label="Bileşik çifti (I / II)"
          value={r.pair.id}
          choices={multiplePairs.map(
            (p) => [p.id, p.names.join(" / ")] as const,
          )}
          onChange={(v) => update({ pair: v })}
        />
        <Choice
          label="Eşitlenen element"
          value={s.fixed === "y" ? "y" : "x"}
          choices={[
            ["x", r.pair.x],
            ["y", r.pair.y],
          ]}
          onChange={(v) => update({ fixed: v })}
        />
        <Range
          label="Referans element kütlesi (g)"
          value={target}
          min={1}
          max={48}
          onChange={(v) => update({ target: v })}
        />
      </>
    );
    const scale = 350 / Math.max(r.first, r.second, 1);
    model = (
      <Drawing
        title={`${r.pair.names.join(" / ")}: eşit ${fmt(target)} g ${r.fixed} için ${r.other} ${fmt(r.first)} ve ${fmt(r.second)} g; oran ${fmt(r.ratio)}.`}
      >
        <text x="310" y="35" textAnchor="middle">
          Eşit {r.fixed}: {fmt(target)} g
        </text>
        {[r.first, r.second].map((v, i) => (
          <g key={i}>
            <text x="25" y={100 + 95 * i}>
              {r.pair.names[i]}
            </text>
            <rect
              data-comparison={i === 0 ? "first" : "second"}
              x="150"
              y={70 + 95 * i}
              width={v * scale}
              height="40"
              className={i === 0 ? "c014-old" : "c014-new"}
            />
            <text x="155" y={140 + 95 * i}>
              {r.other}: {fmt(v)} g
            </text>
          </g>
        ))}
      </Drawing>
    );
    result = (
      <>
        <p>
          I = {r.pair.names[0]}; II = {r.pair.names[1]}. Eşit{" "}
          <strong>
            {fmt(target)} g {r.fixed}
          </strong>
          .
        </p>
        <p>
          {r.other}(I): <strong>{fmt(r.first)} g</strong>; {r.other}(II):{" "}
          <strong>{fmt(r.second)} g</strong>.
        </p>
        <p>
          I/II oranı: <strong>{fmt(r.ratio)}</strong>.{" "}
          {r.valid
            ? "Farklı basit bileşim koşulu sağlanır."
            : "Basit bileşimler aynı; bu çift farklı basit bileşimli katlı oran örneği değildir."}
        </p>
      </>
    );
  } else if (lessonId === "mol-tanecik-iliskisi") {
    title = "Formülü aç, hangi varlığı saydığını seç";
    lead =
      "Çizimde bir formülün atom bileşimi gösterilir; bu bir iyonik örgünün tamamı veya örneğin bütün tanecikleri değildir. n mol belirtilmiş varlık n Nₐ tanedir. İyon görünümü yalnız belirtilen tuzun bütünüyle çözünüp tam ayrıştığı varsayımı içindir.";
    const c = formulaCount(sample, moles),
      ion = s.mode === "ions" && c.sample.ionTotal > 0,
      mode = ion ? "ions" : "atoms";
    expected = ion
      ? `Tam ayrışma varsayımıyla toplam ${fmt(c.ionMoles)} mol iyon.`
      : `Toplam ${fmt(c.atomMoles)} mol atom.`;
    wrong = ion
      ? [
          "OH⁻ ve SO₄²⁻ içindeki her atom ayrı iyon sayılır.",
          "Net yük sıfır olduğundan iyon sayısı sıfırdır.",
        ]
      : [
          "Atom miktarı her formülde örnek molüne eşittir.",
          "Parantez dışındaki çarpan yalnız son atoma uygulanır.",
        ];
    controls = (
      <>
        <Choice
          label="Sayılacak örnek"
          value={sample}
          choices={formulaSamples.map((x) => [x.id, x.formula] as const)}
          onChange={(v) => update({ sample: v, mode: "atoms" })}
        />
        <Range
          label="Örnek miktarı (mol)"
          value={moles}
          min={0}
          max={2}
          step={0.25}
          onChange={(v) => update({ moles: v })}
        />
        <Choice
          label="Sayım türü"
          value={mode}
          choices={
            c.sample.ionTotal
              ? [
                  ["atoms", "Formüldeki atom bileşimi"],
                  ["ions", "Tam çözünme ve tam ayrışma varsayımıyla iyon"],
                ]
              : [["atoms", "Formüldeki atom bileşimi"]]
          }
          onChange={(v) => update({ mode: v })}
        />
      </>
    );
    const nodes = ion
      ? c.ions.map((i) => ({ label: i.name, count: i.count, mol: i.moles }))
      : c.atoms.map((i) => ({ label: i.symbol, count: i.count, mol: i.moles }));
    model = (
      <Drawing
        title={`${c.sample.formula}, ${fmt(moles)} mol: ${nodes.map((n) => `${n.label} ${fmt(n.mol)} mol`).join("; ")}`}
      >
        <text x="310" y="35" textAnchor="middle">
          {c.sample.formula}: {fmt(moles)} mol{" "}
          {c.sample.kind === "molecule" ? "molekül" : "formül birimi"}
        </text>
        {nodes.map((n, i) => {
          const x = (620 * (i + 1)) / (nodes.length + 1);
          return (
            <g key={n.label}>
              <circle
                cx={x}
                cy="135"
                r={35 + Math.min(n.count, 12) * 2}
                className={i % 2 ? "c014-old" : "c014-new"}
              />
              <text
                data-entity={n.label}
                x={x}
                y="141"
                textAnchor="middle"
                className="c014-onfill"
              >
                {n.label} × {n.count}
              </text>
              <text x={x} y="230" textAnchor="middle">
                {fmt(n.mol)} mol
              </text>
            </g>
          );
        })}
      </Drawing>
    );
    result = (
      <>
        <p>
          Örnek:{" "}
          <strong>
            {fmt(moles)} mol {c.sample.formula}{" "}
            {c.sample.kind === "molecule" ? "molekülü" : "formül birimi"}
          </strong>
          ; sayısı {fmt(moles)} Nₐ.
        </p>
        {nodes.map((n) => (
          <p key={n.label}>
            {n.label}: <strong>{fmt(n.mol)} mol</strong>, yani {fmt(n.mol)} Nₐ{" "}
            {ion ? "iyon" : "atom"}.
          </p>
        ))}
        <p>
          Toplam:{" "}
          <strong>
            {fmt(ion ? c.ionMoles : c.atomMoles)} mol {ion ? "iyon" : "atom"}
          </strong>
          .
        </p>
        {ion ? (
          <p>
            Yük bilançosu: {fmt(c.netCharge)}. Çok atomlu iyon tek iyon sayılır;
            atomları ayrıca vardır. Çözünürlük ve tam ayrışma varsayımı gerçek
            her derişime otomatik uygulanmaz.
          </p>
        ) : (
          <p>
            Atomları bileşimde saymak, örnekte hepsinin serbest nötr atom
            hâlinde bulunduğu anlamına gelmez.
          </p>
        )}
      </>
    );
  } else if (lessonId === "mol-kutle-iliskisi") {
    title = "Gramdan mole ve atom miktarına git";
    lead =
      "Verilen atom kütleleri H = 1, C = 12, O = 16, Ca = 40, Al = 27, S = 32. Örnek saf kabul edilir. Molar kütle g/mol, örnek kütlesi g birimindedir. Nₐ ≈ 6,02 × 10²³ mol⁻¹; hiçbir gaz hacmi koşulsuz varsayılmaz.";
    const m = massAmount(sample, mass);
    expected = `n = ${fmt(m.moles, 5)} mol; toplam atom ${fmt(m.atomMoles, 5)} mol.`;
    wrong = [
      "Eşit gramda bütün maddeler eşit sayıda varlık içerir.",
      "Örnek büyüdükçe mol kütlesi de aynı oranda büyür.",
    ];
    controls = (
      <>
        <Choice
          label="Saf madde"
          value={sample}
          choices={formulaSamples.map((x) => [x.id, x.formula] as const)}
          onChange={(v) => update({ sample: v })}
        />
        <Range
          label="Örnek kütlesi (g)"
          value={mass}
          min={0}
          max={148}
          step={1}
          onChange={(v) => update({ mass: v })}
        />
      </>
    );
    const atomEntries = Object.entries(m.sample.atoms).filter(
      (x): x is [string, number] => typeof x[1] === "number",
    );
    model = (
      <Drawing
        title={`${fmt(m.mass)} g ${m.sample.formula} / ${m.sample.mass} g/mol = ${fmt(m.moles, 5)} mol; toplam atom ${fmt(m.atomMoles, 5)} mol.`}
      >
        <rect
          x="25"
          y="65"
          width="170"
          height="110"
          rx="12"
          className="c014-old"
        />
        <text x="110" y="105" textAnchor="middle" className="c014-onfill">
          {fmt(m.mass)} g
        </text>
        <text x="110" y="145" textAnchor="middle" className="c014-onfill">
          {m.sample.formula}
        </text>
        <path d="M205 120H300M285 110L300 120L285 130" />
        <text x="250" y="65" textAnchor="middle">
          ÷ {m.sample.mass}
        </text>
        <rect
          x="315"
          y="65"
          width="270"
          height="110"
          rx="12"
          className="c014-new"
        />
        <text
          data-moles
          x="450"
          y="125"
          textAnchor="middle"
          className="c014-onfill"
        >
          {fmt(m.moles, 5)} mol
        </text>
        <text x="310" y="240" textAnchor="middle">
          Toplam atom: {fmt(m.atomMoles, 5)} mol
        </text>
      </Drawing>
    );
    result = (
      <>
        <p>
          Mol kütlesi: <strong>{m.sample.mass} g/mol</strong>. n = {fmt(m.mass)}{" "}
          g / {m.sample.mass} g/mol = <strong>{fmt(m.moles, 5)} mol</strong>.
        </p>
        <p>
          Belirtilmiş{" "}
          {m.sample.kind === "molecule" ? "molekül" : "formül birimi"} sayısı:{" "}
          <strong>{fmt(m.moles, 5)} Nₐ</strong>. Toplam atom miktarı:{" "}
          <strong>{fmt(m.atomMoles, 5)} mol</strong>.
        </p>
        {atomEntries.map(([symbol, count]) => (
          <p key={symbol}>
            {symbol} atomu: {count} × {fmt(m.moles, 5)} ={" "}
            {fmt(count * m.moles, 5)} mol.
          </p>
        ))}
        <p>
          Bir {m.sample.kind === "molecule" ? "molekül" : "formül birimi"}{" "}
          kütlesi: {m.sample.mass}/Nₐ g ≈ {fmt(m.oneMass * 1e23, 3)} × 10⁻²³ g.
          Çizimdeki dönüşüm gram → mol içindir; bir molün kütlesiyle tek
          varlığın kütlesi farklıdır.
        </p>
      </>
    );
  }
  if (!ids.includes(lessonId)) return null;
  const options = [expected, ...wrong];
  return (
    <section className="forge014-chemistry" data-forge014={lessonId}>
      <h3>{title}</h3>
      <p>{lead}</p>
      <div className="c014-controls">{controls}</div>
      {model}
      <Result>{result}</Result>
      <div className="c014-prediction">
        <h4>Önce öngör, sonra kanıtla karşılaştır</h4>
        <label htmlFor={`${uid}-guess`}>Sonuç tahminin</label>
        <ChoiceSelect
          id={`${uid}-guess`}
          value={options.includes(s.guess) ? s.guess : ""}
          onChange={(e) => update({ guess: e.target.value })}
        >
          <option value="">Bir sonuç seç</option>
          {options.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </ChoiceSelect>
        <div className="c014-current" data-selected-prediction>
          {options.includes(s.guess)
            ? `Seçili tahmin: ${s.guess}`
            : "Henüz bir tahmin seçilmedi."}
        </div>
        <label htmlFor={`${uid}-reason`}>
          Modelden gerekçen (en fazla 120 karakter)
        </label>
        <textarea
          id={`${uid}-reason`}
          rows={3}
          maxLength={120}
          value={s.reason.slice(0, 120)}
          onChange={(e) => update({ reason: e.target.value.slice(0, 120) })}
        />
        <button
          className="secondary"
          disabled={!options.includes(s.guess) || !s.reason.trim()}
          onClick={() => set({ checked: true })}
        >
          Tahminimi karşılaştır
        </button>
        {s.checked && (
          <div role="status" className="c014-feedback">
            <strong>
              {s.guess === expected
                ? "Sonuç seçimin modelle uyumlu."
                : "Seçimini modelin verileriyle yeniden karşılaştır."}
            </strong>
            <p>Modelin kanıtı: {expected}</p>
            <p>Gerekçen: {s.reason.slice(0, 120)}</p>
            <p>Gerekçe otomatik puanlanmaz.</p>
          </div>
        )}
      </div>
      <p className="small muted">
        Bu keşif kaydedilir; XP, ustalık, doğru cevap veya konu tamamlama kaydı
        oluşturmaz. Öğrendiklerini bağımsız sorularla dene.
      </p>
    </section>
  );
}
