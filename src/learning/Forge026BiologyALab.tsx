import { useId, type ReactNode } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  atpBudget026,
  biologyADefaults026,
  biologyAId026,
  cellEvidence026,
  cellSamples026,
  controlledPair026,
  experimentGroups026,
  ionMixture026,
  measurement026,
  mineralCapacity026,
  normalizeBiologyA026,
  pHRelation026,
  thermalWater026,
} from "./forge026BiologyA";
import "./forge026BiologyA.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number, digits = 5) =>
  n.toLocaleString("tr-TR", { maximumFractionDigits: digits });
const sci = (n: number) => n.toExponential(4).replace(".", ",");
type Values = ReturnType<typeof normalizeBiologyA026>["values"];
type Patch = Partial<Values>;
function Menu({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | number;
  options: Record<string, string>;
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="b026-field">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {Object.entries(options).map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </ChoiceSelect>
      <span className="b026-selected">Seçili: {options[String(value)]}</span>
    </div>
  );
}
function Slider({
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
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="b026-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt(value)}</output>
      <input
        id={id}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
function Facts({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="b026-facts">
      {rows.map(([key, value]) => (
        <div key={key}>
          <dt>{key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
function Figure({
  title,
  children,
  height = 240,
}: {
  title: string;
  children: ReactNode;
  height?: number;
}) {
  return (
    <figure className="b026-figure">
      <figcaption>{title}</figcaption>
      <svg viewBox={`0 0 260 ${height}`} role="img" aria-label={title}>
        {children}
      </svg>
    </figure>
  );
}
// Model prose is short enough for the large mobile text setting; the guide keeps full terms.
const modelText = (s: string) =>
  s
    .replace(
      "Okuma=gerçek×ölçek çarpanı+sabit kayma+verilen küçük sapma.",
      "Okuma = gerçek × ölçek çarpanı + sabit kayma + verilen küçük sapma.",
    )
    .replace("Q=m_buhar·L", "Q = m_buhar · L")
    .replace("canlılık tartışmasını", "canlı sayma kararını")
    .replace(
      "Olgun memeli alyuvarının çekirdeksizliği organizmanın prokaryot olduğu anlamına gelmez; bu hücre glikolizle ATP sağlayabilir fakat kendi ribozomuyla yeni protein sentezleyemez.",
      "Olgun memeli alyuvarı çekirdek taşımaz; ait olduğu canlı bu yüzden prokaryot sayılmaz. Bu hücre glikolizle ATP üretir. Ribozomu yoktur, yeni protein yapamaz.",
    )
    .replace("bütün organellerin dökümü", "tüm organel listesi")
    .replace("özgün varsayımsal verilerdir", "özgün örnek verilerdir")
    .replace(
      "Tekrar ortalamayı değiştirebilir; ölçek ve sıfır hatasını kendiliğinden düzeltmez.",
      "Tekrarla ortalama değişebilir; ölçek ve sıfır hatası otomatik düzelmez.",
    )
    .replace(
      "mg kullanılabilen element varsayılır",
      "mg alıma uygun element varsayılır",
    )
    .replace(
      "evrensel mineral gereksinimi değildir",
      "her bitki için ortak mineral ihtiyacı değildir",
    )
    .replace("Başlangıç20°C", "Başlangıç 20 °C")
    .replace("yuvarlatılmış c=4", "yaklaşık c=4")
    .replace("bu varsayımda suyu20–50°C", "bu koşullarda suyu 20–50 °C")
    .replace("pH düzenlemesi değildir", "pH denetimi değildir")
    .replace(
      "suyun kendi iyonlaşması da hesaba katılır",
      "suyun kendi iyon dengesi de hesaba katılır",
    );
const yesNo = { yes: "Evet", no: "Hayır" };
const factorNames = {
  light: "Işık süresi",
  water: "Su hacmi",
  salt: "Tuz derişimi",
};
const groupNames = Object.fromEntries(
  experimentGroups026.map((g, i) => [i, `Grup ${g.id}`]),
);
function WaterMolecule({
  x,
  y,
  scale = 1,
  opacity = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      opacity={opacity}
      data-water-molecule="true"
    >
      <path d="M-12 10 L0 0 L12 10" className="b026-bond" />
      <circle r="8" className="b026-oxygen" />
      <circle cx="-12" cy="10" r="5" className="b026-hydrogen" />
      <circle cx="12" cy="10" r="5" className="b026-hydrogen" />
    </g>
  );
}
export function Forge026BiologyALab({ lessonId }: { lessonId: string }) {
  const canonical = biologyAId026(lessonId),
    key = `forge026:biology-a:${canonical}`;
  const { state } = useApp();
  const [, save] = useExploration(key, biologyADefaults026);
  const normalized = normalizeBiologyA026(canonical, state.explorations[key]),
    v = normalized.values;
  const commit = (patch: Patch) =>
    save(normalizeBiologyA026(canonical, { ...v, ...patch }).values);
  const change = (patch: Patch) =>
    commit({ ...patch, guess: "", reason: "", checked: false, show: false });
  const number = (
    label: string,
    field: keyof Values,
    min: number,
    max: number,
    step = 1,
  ) => (
    <Slider
      key={field}
      label={label}
      value={v[field] as number}
      min={min}
      max={max}
      step={step}
      onChange={(value) => change({ [field]: value })}
    />
  );
  let content: ReactNode,
    expected: string,
    options: Record<string, string>,
    task: string,
    proof: ReactNode;
  if (canonical === "canli-ozellikleri") {
    if (v.livingView === "budget") {
      const r = atpBudget026(
          v.initial,
          v.production,
          v.maintenance,
          v.synthesis,
          v.steps,
        ),
        max = Math.max(1, ...r.rows.map((row) => row.stock));
      expected = r.maintenanceMet ? "yes" : "no";
      options = yesNo;
      task = "Bütün adımlarda bakım talebi tam karşılandı mı?";
      proof = (
        <p>
          Sağlanan {fmt(r.supplied)} birim = kullanılan bakım{" "}
          {fmt(r.totalMaintenance)} + sentez {fmt(r.totalSynthesis)} + son stok{" "}
          {fmt(r.stock)}. Eksik kalan bakım talebi {fmt(r.unmet)} birimdir.
          Bakım önce ödenir; kalan kaynak senteze ayrılır.
        </p>
      );
      content = (
        <>
          <div className="b026-controls">
            {number("Başlangıç ATP birimi", "initial", 0, 100)}
            {number("Adım başına üretim", "production", 0, 20)}
            {number("Adım başına bakım talebi", "maintenance", 0, 20)}
            {number("Adım başına sentez talebi", "synthesis", 0, 20)}
            {number("Adım sayısı", "steps", 0, 10)}
          </div>
          <Figure title="ATP stokları. Sütun yüksekliği aynı doğrusal ölçekte kalan birimi gösterir; altta adım numarası vardır.">
            {r.rows.map((row, i) => {
              const width = 220 / r.rows.length;
              return (
                <g key={row.step}>
                  <rect
                    x={20 + i * width}
                    y={190 - (150 * row.stock) / max}
                    width={width * 0.7}
                    height={(150 * row.stock) / max}
                    className="b026-fill"
                    data-atp-step={row.step}
                    data-stock={row.stock}
                  />
                  <text x={20 + i * width} y="220">
                    {row.step}
                  </text>
                </g>
              );
            })}
            <path d="M15 30 V190 H248" className="b026-axis" />
            <text x="16" y="22">
              Üst sınır: {max}
            </text>
          </Figure>
          <div
            data-model-result="budget"
            data-stock={r.stock}
            data-unmet={r.unmet}
          >
            {r.rows.map((row) => (
              <Facts
                key={row.step}
                rows={[
                  [
                    `Adım ${row.step}`,
                    row.step === 0
                      ? `Başlangıç stok ${row.stock}`
                      : `Önce ${row.before}; üretim ${row.produced}; bakım ${row.maintenance}; sentez ${row.synthesis}; açık ${row.unmet}; kalan ${row.stock}`,
                  ],
                ]}
              />
            ))}
          </div>
          <p>{modelText(r.scope)}</p>
        </>
      );
    } else {
      const r = cellEvidence026(v.sample);
      expected = r.cell ? "cell" : "acellular";
      options = { cell: "Hücresel yapı", acellular: "Hücresel yapı yok" };
      task = "Seçilen örneğin yapı düzeyi nedir?";
      proof = (
        <p>
          {r.name}: {r.cell ? "Hücresel bir örnektir." : "Hücre değildir."}{" "}
          Çekirdek, hücre sayısı ve birey sınırı ayrı ölçütlerdir.{" "}
          {modelText(r.scope)}
        </p>
      );
      content = (
        <>
          <Menu
            label="İncelenen örnek"
            value={v.sample}
            options={Object.fromEntries(
              Object.entries(cellSamples026).map(([k, x]) => [k, x.name]),
            )}
            onChange={(sample) => change({ sample })}
          />
          <Figure
            title={`${r.name}. Yapı işaretleri temsili; organel sayısı ve gerçek boyut çizilmez.`}
          >
            <g data-cellular={String(r.cell)}>
              {r.cell ? (
                <ellipse
                  cx="130"
                  cy="125"
                  rx="105"
                  ry="80"
                  className="b026-outline"
                  data-cell-membrane="true"
                />
              ) : (
                <path
                  d="M130 35 L218 80 L218 170 L130 215 L42 170 L42 80 Z"
                  className="b026-outline"
                  data-capsid="true"
                />
              )}
              {r.nucleus && (
                <ellipse
                  cx="130"
                  cy="122"
                  rx="32"
                  ry="28"
                  className="b026-nucleus"
                  data-nucleus="true"
                />
              )}
              {r.ribosome &&
                [
                  [60, 75],
                  [103, 62],
                  [150, 62],
                  [192, 75],
                  [45, 120],
                  [215, 120],
                  [60, 165],
                  [103, 185],
                  [150, 185],
                  [192, 165],
                ].map(([cx, cy], i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="3"
                    className="b026-dot"
                    data-ribosome-sign="true"
                  />
                ))}
              {r.membraneOrganelles && (
                <path
                  d="M75 155 Q100 135 109 155 Q93 177 75 155 M156 76 Q177 56 188 78 Q170 98 156 76"
                  className="b026-organelle"
                />
              )}
              {r.dna && !r.nucleus && (
                <path
                  d="M93 119 Q110 85 151 111 Q175 148 125 151 Q95 145 93 119"
                  className="b026-bond"
                />
              )}
              {v.sample === "virus" && (
                <path
                  d="M90 125 Q110 80 130 125 T170 125"
                  className="b026-bond"
                />
              )}
              {v.sample === "redCell" && (
                <ellipse
                  cx="130"
                  cy="125"
                  rx="49"
                  ry="30"
                  className="b026-outline"
                />
              )}
            </g>
          </Figure>
          <div
            data-model-result="cell"
            data-sample={v.sample}
            data-nucleus={String(r.nucleus)}
            data-ribosome={String(r.ribosome)}
          >
            <Facts
              rows={[
                ["Plan", r.plan],
                ["Hücre sayısı", r.count],
                [
                  "Örnek sınırı",
                  r.whole
                    ? "Tek hücreli bireyin tümü"
                    : r.cell
                      ? "Çok hücreli bireyin bir hücresi"
                      : "Konak dışı virüs parçacığı",
                ],
                ["Çekirdek", r.nucleus ? "Var" : "Yok"],
                ["Ribozom", r.ribosome ? "Var" : "Yok"],
                ["Zarlı organeller", r.membraneOrganelles ? "Var" : "Yok"],
                [
                  "Kalıtsal madde",
                  r.dna === null
                    ? "Virüs türüne göre DNA veya RNA"
                    : r.dna
                      ? "DNA var"
                      : "Olgun alyuvarda DNA yok",
                ],
              ]}
            />
          </div>
          <p>{modelText(r.scope)}</p>
        </>
      );
    }
    content = (
      <>
        <Menu
          label="Canlılık modeli"
          value={v.livingView}
          options={{ budget: "ATP hesabı", cell: "Yapı ve birey" }}
          onChange={(livingView) => change({ livingView })}
        />
        {content}
      </>
    );
  } else if (canonical === "bilimsel-yontem") {
    if (v.methodView === "pair") {
      const r = controlledPair026(v.first, v.second, v.factor);
      expected = r.valid ? "valid" : "invalid";
      options = { valid: "Yalnız hedef değişir", invalid: "Uygun çift değil" };
      task =
        "Seçili çift, yalnız hedef etkenin etkisini sınamak için uygun mu?";
      proof = (
        <p>
          Değişen etkenler:{" "}
          {r.changed.length
            ? r.changed.map((k) => factorNames[k]).join(", ")
            : "Hiçbiri"}
          . Hedef {factorNames[v.factor as keyof typeof factorNames]}. B−A
          ortalama farkı {fmt(r.difference)} cm; tek etken yorumu için yalnız
          hedef farklı olmalıdır.
        </p>
      );
      content = (
        <>
          <div className="b026-controls">
            <Menu
              label="İlk grup"
              value={v.first}
              options={groupNames}
              onChange={(first) => change({ first: Number(first) })}
            />
            <Menu
              label="İkinci grup"
              value={v.second}
              options={groupNames}
              onChange={(second) => change({ second: Number(second) })}
            />
            <Menu
              label="Hedef etken"
              value={v.factor}
              options={factorNames}
              onChange={(factor) => change({ factor })}
            />
          </div>
          <Figure title="Seçilen iki grubun ortalama boy artışı (cm). Ortak eksende 0–12 cm.">
            <path d="M35 20 V195 H240" className="b026-axis" />
            {[r.meanA, r.meanB].map((x, i) => (
              <g key={i}>
                <rect
                  x={65 + i * 95}
                  y={195 - x * 14}
                  width="50"
                  height={x * 14}
                  className="b026-fill"
                  data-group-mean={i === 0 ? r.a.id : r.b.id}
                />
                <text x={65 + i * 95} y="224">
                  {i === 0 ? r.a.id : r.b.id}: {fmt(x)}
                </text>
              </g>
            ))}
            <text x="2" y="28">
              12
            </text>
            <text x="8" y="197">
              0
            </text>
          </Figure>
          <div
            data-model-result="pair"
            data-valid={String(r.valid)}
            data-difference={r.difference}
          >
            <p>
              Her satır ayrı bir deney grubudur. Üç okuma, üç bağımsız kaptan
              gelir.
            </p>
            {experimentGroups026.map((g) => (
              <Facts
                key={g.id}
                rows={[
                  [
                    `Grup ${g.id}`,
                    `Işık ${g.light} saat; su ${g.water} mL; tuz ${g.salt} g/L; boy artışları ${g.readings.join(", ")} cm`,
                  ],
                ]}
              />
            ))}
          </div>
          <p>{modelText(r.scope)}</p>
        </>
      );
    } else {
      const r = measurement026(v.actual, v.gainPercent, v.bias, v.repeats);
      expected = r.error > 0 ? "above" : r.error < 0 ? "below" : "equal";
      options = {
        above: "Referansın üstünde",
        below: "Referansın altında",
        equal: "Referansa eşit",
      };
      task = "Okuma ortalaması gerçek referansa göre nerede?";
      const x = (n: number) => 20 + ((n + 12) / 180) * 220;
      proof = (
        <p>
          Ortalama {fmt(r.mean)} mm, referans {r.actual} mm; fark {fmt(r.error)}{" "}
          mm. Tekrar sayısı sıfır ve ölçek kaymasını otomatik kaldırmaz.
        </p>
      );
      content = (
        <>
          <div className="b026-controls">
            {number("Gerçek referans (mm)", "actual", 10, 100)}
            {number("Ölçek çarpanı (%)", "gainPercent", 50, 150)}
            {number("Sabit kayma (mm)", "bias", -10, 10)}
            {number("Okuma sayısı", "repeats", 1, 9)}
          </div>
          <Figure
            title="Referans çizgisi ve tek tek okumalar. Yatay konum aynı uzunluk ekseninde; düşey sıra zaman veya hata büyüklüğü değildir."
            height={300}
          >
            <path d="M20 265 H240" className="b026-axis" />
            <path
              d={`M${x(r.actual)} 20 V265`}
              className="b026-reference"
              data-reference={r.actual}
            />
            {r.readings.map((n, i) => (
              <circle
                key={i}
                cx={x(n)}
                cy={35 + i * 24}
                r="6"
                className="b026-dot"
                data-reading={n}
              />
            ))}
            <text x="12" y="290">
              −12 mm
            </text>
            <text x="167" y="290">
              168 mm
            </text>
          </Figure>
          <div
            data-model-result="measurement"
            data-mean={r.mean}
            data-error={r.error}
          >
            <Facts
              rows={[
                ["Okumalar (mm)", r.readings.map((n) => fmt(n)).join("; ")],
                ["Ortalama (mm)", fmt(r.mean)],
                ["Referansa göre fark (mm)", fmt(r.error)],
              ]}
            />
          </div>
          <p>{modelText(r.scope)}</p>
        </>
      );
    }
    content = (
      <>
        <Menu
          label="Deney modeli"
          value={v.methodView}
          options={{ pair: "Kontrollü çift", measurement: "Ölçüm ve tekrar" }}
          onChange={(methodView) => change({ methodView })}
        />
        {content}
      </>
    );
  } else if (canonical === "mineraller") {
    const r = mineralCapacity026(v.nStock, v.pStock, v.mgStock),
      max = Math.max(1, ...r.rows.map((row) => row.capacity));
    expected = r.predicted;
    options = {
      N: "Azot",
      P: "Fosfor",
      Mg: "Mg",
      tie: "Birden çok etken",
    };
    task = "En düşük stok / ihtiyaç oranı hangi mineralde?";
    proof = (
      <p>
        Kapasite, stok / ihtiyaç oranıdır. En düşük: {r.limiting.join(", ")}.
        Tam büyüme birimi {r.units}; bir tam birim için N 6, P 2, Mg 3 mg
        gerekir. Eş en düşükler birlikte sınırlar.
      </p>
    );
    content = (
      <>
        <div className="b026-controls">
          {number("Alıma uygun N (mg)", "nStock", 0, 120)}
          {number("Alıma uygun P (mg)", "pStock", 0, 120)}
          {number("Alıma uygun Mg (mg)", "mgStock", 0, 120)}
        </div>
        <Figure title="Mineral kapasitesi. Sütun yüksekliği aynı doğrusal eksende stok / gereksinim oranıdır; ham mg değildir.">
          <path d="M30 35 V195 H245" className="b026-axis" />
          {r.rows.map((row, i) => (
            <g key={row.id}>
              <rect
                x={52 + i * 65}
                y={195 - (row.capacity / max) * 150}
                width="40"
                height={(row.capacity / max) * 150}
                className={
                  r.limiting.includes(row.id) ? "b026-limit" : "b026-fill"
                }
                data-mineral={row.id}
                data-capacity={row.capacity}
              />
              <text x={52 + i * 65} y="225">
                {row.id}
              </text>
            </g>
          ))}
          <text x="32" y="25">
            Üst sınır: {fmt(max)} birim
          </text>
        </Figure>
        <div
          data-model-result="minerals"
          data-units={r.units}
          data-limiting={r.predicted}
        >
          {r.rows.map((row) => (
            <Facts
              key={row.id}
              rows={[
                [
                  row.id === "Mg" ? "Mg" : row.name,
                  `Stok ${row.stock} mg; gereksinim ${row.need} mg/birim; kapasite ${fmt(row.capacity)}; kullanılan ${row.used} mg; kalan ${row.remaining} mg`,
                ],
              ]}
            />
          ))}
        </div>
        <p>{modelText(r.scope)}</p>
      </>
    );
  } else {
    if (v.waterView === "thermal") {
      const r = thermalWater026(v.thermalMode, v.mass, v.energy, v.stage),
        height = (130 * r.remaining) / r.mass;
      expected = r.losesLiquid ? "yes" : "no";
      options = yesNo;
      task = "Verilen enerjiyle sıvı kütlesi azaldı mı?";
      proof = (
        <p>
          {v.thermalMode === "warming"
            ? `Q/(m·c)=${fmt(r.applied)}/(${r.mass}×4)=${fmt(r.deltaT)} °C. Sıvı kütlesi bu fazsız modelde değişmez.`
            : `Buhara geçen kütle Q/L=${fmt(r.applied)}/2400=${fmt(r.evaporated)} g. H₂O içindeki O−H bağları bu faz olayında kopmaz.`}
        </p>
      );
      content = (
        <>
          <Menu
            label="Enerji yolu"
            value={v.thermalMode}
            options={{ warming: "Isınma", evaporating: "Buhara geçiş" }}
            onChange={(thermalMode) =>
              change({
                thermalMode,
                energy: Math.min(
                  v.energy,
                  thermalMode === "warming" ? 1200 : 12000,
                ),
              })
            }
          />
          <div className="b026-controls">
            {number("Başlangıç suyu (g)", "mass", 10, 200)}
            {number(
              "Toplam enerji (J)",
              "energy",
              0,
              v.thermalMode === "warming" ? 1200 : 12000,
            )}
            {number("Uygulama adımı (0–4)", "stage", 0, 4)}
          </div>
          <Figure title="Sıvı düzeyi kalan kütle oranıdır. H₂O işaretleri temsili; molekül sayımı değildir. Buhardaki işaret de aynı O−H yapısını korur.">
            <path d="M30 55 V205 H175 V55" className="b026-axis" />
            <rect
              x="33"
              y={202 - height}
              width="139"
              height={height}
              className="b026-water"
              data-liquid-fraction={r.remaining / r.mass}
            />
            <WaterMolecule x={85} y={175} />
            <WaterMolecule x={135} y={145} />
            {r.evaporated > 0 && (
              <g data-vapor-mass={r.evaporated}>
                <WaterMolecule
                  x={100}
                  y={50 - r.evaporated * 5}
                  opacity={0.4 + (0.6 * r.evaporated) / 5}
                />
                <path
                  d="M151 75 L159 55 M153 57 L159 55 L161 62"
                  className="b026-bond"
                />
              </g>
            )}
            <rect
              x="208"
              y="45"
              width="14"
              height="155"
              rx="7"
              className="b026-outline"
            />
            <rect
              x="212"
              y={195 - (r.temperature - 20) * 4}
              width="6"
              height={5 + (r.temperature - 20) * 4}
              className="b026-limit"
              data-temperature={r.temperature}
            />
            <text x="248" y="226" textAnchor="end">
              {fmt(r.temperature)} °C
            </text>
          </Figure>
          <div
            data-model-result="thermal"
            data-mode={r.mode}
            data-temperature={r.temperature}
            data-remaining={r.remaining}
          >
            <Facts
              rows={[
                ["Aktarılan enerji (J)", fmt(r.applied)],
                ["Sıcaklık (°C)", fmt(r.temperature)],
                ["Buhara geçen (g)", fmt(r.evaporated)],
                ["Kalan sıvı (g)", fmt(r.remaining)],
              ]}
            />
          </div>
          <p>{modelText(r.scope)}</p>
        </>
      );
    } else if (v.waterView === "mixture") {
      const r = ionMixture026(v.acid, v.acidVolume, v.base, v.baseVolume),
        max = Math.max(1, r.hydrogen, r.hydroxide);
      expected = r.category;
      options = { acid: "Asidik", base: "Bazik", neutral: "Nötr" };
      task = "Karışımın son durumu nedir?";
      proof = (
        <p>
          H⁺ girdisi {fmt(r.hydrogen)} µmol, OH⁻ girdisi {fmt(r.hydroxide)}{" "}
          µmol. {fmt(r.paired)} µmol çift eşleşir. H⁺−OH⁻ farkı {fmt(r.excess)}{" "}
          µmol, toplam hacim {r.volume} mL; su dengesiyle pH {fmt(r.pH)}.
        </p>
      );
      content = (
        <>
          <div className="b026-controls">
            {number("HCl derişimi (mM)", "acid", 0, 100)}
            {number("HCl hacmi (mL)", "acidVolume", 0, 100)}
            {number("NaOH derişimi (mM)", "base", 0, 100)}
            {number("NaOH hacmi (mL)", "baseVolume", 0, 100)}
          </div>
          <Figure title="H⁺ ve OH⁻ girdileri. Ortak doğrusal ölçekte koyu bölüm eşleşen miktar; açık bölüm artandır. İki hacmin toplamı sıfır olamaz.">
            <text x="20" y="40">
              H (+)
            </text>
            <text x="20" y="130">
              OH (−)
            </text>
            {[r.hydrogen, r.hydroxide].map((n, i) => (
              <g key={i}>
                <rect
                  x="20"
                  y={55 + i * 90}
                  width={(220 * n) / max}
                  height="30"
                  className="b026-water"
                  data-ion-input={i === 0 ? "H" : "OH"}
                />
                <rect
                  x="20"
                  y={55 + i * 90}
                  width={(220 * r.paired) / max}
                  height="30"
                  className="b026-fill"
                  data-ion-paired={i}
                />
                <text x="20" y={108 + i * 90}>
                  {fmt(n)} µmol
                </text>
              </g>
            ))}
          </Figure>
          <div
            data-model-result="mixture"
            data-category={r.category}
            data-ph={r.pH}
            data-excess={r.excess}
          >
            <Facts
              rows={[
                ["Eşleşen çift (µmol)", fmt(r.paired)],
                ["H⁺−OH⁻ fazlası (µmol)", fmt(r.excess)],
                ["Toplam hacim (mL)", fmt(r.volume)],
                ["Son [H⁺] (mol/L)", sci(r.h)],
                ["Son [OH⁻] (mol/L)", sci(r.oh)],
                ["Son pH", fmt(r.pH)],
              ]}
            />
          </div>
          <p>{modelText(r.scope)}</p>
        </>
      );
    } else {
      const r = pHRelation026(v.pHA, v.pHB, v.volumeA, v.volumeB);
      expected = v.pHA < v.pHB ? "A" : v.pHA > v.pHB ? "B" : "equal";
      options = {
        A: "A daha derişik",
        B: "B daha derişik",
        equal: "Derişimler eşit",
      };
      task =
        "H⁺ derişimi hangi kapta daha büyük? Hacimle toplam miktarı ayrıca izle.";
      proof = (
        <p>
          [H⁺]A/[H⁺]B = 10^(pHB−pHA) = {sci(r.concentrationRatio)}. Bu oran
          VA/VB ile çarpılınca mol oranı {sci(r.amountRatio)} olur. Burada pH
          seçimi sabitken hacim değişse de derişim aynı kalır; iki ayrı kap
          vardır.
        </p>
      );
      content = (
        <>
          <div className="b026-controls">
            {number("A kabı pH", "pHA", 0, 14, 0.1)}
            {number("B kabı pH", "pHB", 0, 14, 0.1)}
            {number("A hacmi (mL)", "volumeA", 1, 1000)}
            {number("B hacmi (mL)", "volumeB", 1, 1000)}
          </div>
          <Figure title="Logaritmik derişim cetveli: konum pH değeridir, sütun boyu değildir. Solda daha yüksek H⁺ derişimi; 1 pH adımı 10 kat orandır.">
            <path d="M20 100 H240" className="b026-axis" />
            {[0, 7, 14].map((n) => (
              <g key={n}>
                <path
                  d={`M${20 + (n / 14) * 220} 92 V108`}
                  className="b026-axis"
                />
                <text x={n === 14 ? 218 : 16 + (n / 14) * 220} y="140">
                  {n}
                </text>
              </g>
            ))}
            <circle
              cx={20 + (v.pHA / 14) * 220}
              cy="75"
              r="8"
              className="b026-dot"
              data-ph-point="A"
            />
            <text x={Math.min(225, 12 + (v.pHA / 14) * 220)} y="52">
              A
            </text>
            <circle
              cx={20 + (v.pHB / 14) * 220}
              cy="170"
              r="8"
              className="b026-limit"
              data-ph-point="B"
            />
            <text x={Math.min(225, 12 + (v.pHB / 14) * 220)} y="207">
              B
            </text>
          </Figure>
          <div
            data-model-result="relation"
            data-concentration-ratio={r.concentrationRatio}
            data-amount-ratio={r.amountRatio}
          >
            <Facts
              rows={[
                ["A [H⁺] (mol/L)", sci(r.concentrationA)],
                ["B [H⁺] (mol/L)", sci(r.concentrationB)],
                ["A H⁺ miktarı (mol)", sci(r.amountA)],
                ["B H⁺ miktarı (mol)", sci(r.amountB)],
                ["A/B derişim oranı", sci(r.concentrationRatio)],
                ["A/B miktar oranı", sci(r.amountRatio)],
              ]}
            />
          </div>
          <p>
            25 °C için pH=−log₁₀[H⁺] ideal sulu çözelti yaklaşımı kullanılır.
            İki kap ayrı kalır. Hacim, derişim ile mol miktarını bağlar; çizim
            kan pH’sı veya tampon kapasitesi modeli değildir.
          </p>
        </>
      );
    }
    content = (
      <>
        <Menu
          label="Su ve iyon modeli"
          value={v.waterView}
          options={{
            thermal: "Su ve enerji",
            mixture: "Asit–baz karışımı",
            relation: "pH ve hacim",
          }}
          onChange={(waterView) => change({ waterView })}
        />
        {content}
      </>
    );
  }
  const reasonReady = v.reason.trim().length > 0,
    validGuess = Object.hasOwn(options, v.guess),
    canCompare = normalized.validSelection && reasonReady && validGuess;
  const reasonId = useId();
  return (
    <section
      className="b026-lab"
      data-forge026={lessonId}
      data-exploration-key={key}
    >
      <p>
        Keşif seçimleri ayrı kaydolur; bu alan puan, XP veya ustalık üretmez.
        Sayılar öğretim için verilen model koşullarıdır.
      </p>
      {content}
      <div className="b026-compare">
        <p>{task}</p>
        <Menu
          label="Tahminin"
          value={v.guess}
          options={{ "": "Bir sonuç seç", ...options }}
          onChange={(guess) => commit({ guess, checked: false })}
        />
        <label htmlFor={reasonId}>Gerekçen</label>
        <textarea
          id={reasonId}
          maxLength={120}
          value={v.reason}
          onChange={(e) =>
            commit({ reason: e.target.value.slice(0, 120), checked: false })
          }
        />
        <p>
          En çok 120 karakter; boş olmayan kısa ifadeler de geçerlidir. Gerekçe
          içerikçe otomatik not almaz.
        </p>
        <button
          type="button"
          disabled={!canCompare}
          onClick={() => commit({ checked: true })}
        >
          Kıyasla
        </button>
        {v.checked && canCompare && (
          <p className="b026-feedback" role="status">
            {v.guess === expected
              ? "Modelle uyumlu."
              : "Tahminini model verileriyle yeniden incele."}{" "}
            Bu kıyas yalnız seçilen sonucu denetler.
          </p>
        )}
        <button
          type="button"
          aria-expanded={v.show}
          onClick={() => commit({ show: !v.show })}
        >
          {v.show ? "Kanıtı kapat" : "Kanıtı aç"}
        </button>
        {v.show && <div className="b026-proof">{proof}</div>}
      </div>
    </section>
  );
}

export default Forge026BiologyALab;
