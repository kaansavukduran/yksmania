import { useId, type ReactNode } from "react";
import {
  carbonate017,
  foodLabel017,
  metal017,
  metal017Cases,
  polymer017,
  polymer017Kinds,
  soap017,
} from "./forge017ChemistryA";
import { useExploration } from "./useExploration";
import "./forge017ChemistryA.css";

const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 }).format(n);
const bound = (n: number, a: number, b: number) =>
  Number.isFinite(n) ? Math.min(b, Math.max(a, n)) : a;
const key = (id: string) => `forge017:chemistry-a:${id}`;
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
    <div className="a017-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt(bound(value, min, max))}</output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={bound(value, min, max)}
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
  onChange: (id: string) => void;
}) {
  const id = useId();
  return (
    <fieldset className="a017-choice">
      <legend id={id}>{label}</legend>
      <div role="group" aria-labelledby={id}>
        {choices.map(([v, text]) => (
          <button
            type="button"
            key={v}
            aria-pressed={value === v}
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
  height,
  children,
}: {
  title: string;
  height: number;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <svg
      className="a017-svg"
      role="img"
      aria-labelledby={id}
      viewBox={`0 0 300 ${height}`}
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
    <section className="forge017-chemistry-a" data-forge017={id}>
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="a017-note">
        Bu modeli açmak veya bir seçim yapmak puan vermez. Sorular ayrı
        kaydedilir.
      </p>
    </section>
  );
}
type PredictionState = { prediction: string; reason: string; checked: boolean };
function Prediction({
  question,
  choices,
  expected,
  proof,
  state,
  change,
}: {
  question: string;
  choices: readonly (readonly [string, string])[];
  expected: string;
  proof: string;
  state: PredictionState;
  change: (v: Partial<PredictionState>) => void;
}) {
  const id = useId(),
    selected = choices.some(([v]) => v === state.prediction)
      ? state.prediction
      : "";
  return (
    <div className="a017-prediction">
      <Choice
        label={question}
        value={selected}
        choices={choices}
        onChange={(prediction) => change({ prediction, checked: false })}
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
        disabled={!selected || !state.reason.trim()}
        onClick={() => change({ checked: true })}
      >
        Tahminimi karşılaştır
      </button>
      {state.checked && selected && (
        <p role="status" className="a017-feedback">
          {selected === expected
            ? "Seçimin modelle uyumlu."
            : "Model farklı bir sonuç veriyor."}{" "}
          {proof} Bu bir puan kaydı değildir.
        </p>
      )}
    </div>
  );
}
const defaults = { prediction: "", reason: "", checked: false };

function Metals() {
  const id = "asit-baz-metaller";
  const [s, set] = useExploration(key(id), {
    ...defaults,
    kind: "mg",
    metal: 0.2,
    reagent: 0.4,
  });
  const m = metal017(s.kind, s.metal, s.reagent),
    expected = m.gas > 0 ? m.chosen.gas : "none";
  const labels: Record<string, string> = {
    metal: "Metal sınırlar.",
    reagent: "Asit veya baz sınırlar.",
    both: "İkisi verilen oranda biter.",
    none: "İlk anda giren yok.",
    "no-reaction": "Bu koşulda H₂ oluşmaz.",
  };
  return (
    <Frame
      id={id}
      title="Metal ve gazın izini sür"
      intro="Tepkiyi seç. Asidin türü değişince gazı ve artan metali yeniden düşün."
    >
      <Choice
        label="Tepki koşulu"
        value={m.chosen.id}
        choices={metal017Cases.map((c) => [c.id, c.name] as const)}
        onChange={(kind) => set({ kind, checked: false })}
      />
      <div className="a017-controls">
        <Range
          label="İlk metal (mol)"
          value={m.metal}
          max={0.4}
          step={0.01}
          onChange={(metal) => set({ metal, checked: false })}
        />
        <Range
          label="İlk asit veya baz (mol)"
          value={m.reagent}
          max={1.2}
          step={0.01}
          onChange={(reagent) => set({ reagent, checked: false })}
        />
      </div>
      <p className="a017-equation">{m.chosen.equation}</p>
      <p>
        {m.chosen.id === "al-base"
          ? "Su fazla. Uygun güçlü bazda Al içeren sulu kompleks oluşur."
          : m.chosen.id === "cu-hcl"
            ? "Sulu HCl dışında bir yükseltgen yok. Burada Cu, H₂ çıkarmaz."
            : m.chosen.id.startsWith("cu-")
              ? "Yalnız seçili nitrik asit koşulu ve yazılı denklem geçerli."
              : "Sulu HCl ve uygun yüzey koşulu. Yalnız bu tepki sonuna dek sürer."}{" "}
        Yüzey hızı ve yan tepkiler bu hesapta yok.
      </p>
      <figure>
        <Drawing
          title={`Artan ${m.chosen.metal} ve oluşan ${m.chosen.gas}; ortak mol ölçeği`}
          height={350}
        >
          <text x="78" y="30" textAnchor="middle">
            Metal
          </text>
          <text x="224" y="30" textAnchor="middle">
            Gaz
          </text>
          <text x="78" y="62" textAnchor="middle">
            {m.chosen.metal}
          </text>
          <text x="224" y="62" textAnchor="middle">
            {m.chosen.gas}
          </text>
          <path
            d="M38 94V274H118V94 M184 94V274H264V94"
            className="a017-line"
          />
          <rect
            className="a017-metal"
            x="39"
            y={274 - (160 * m.metalLeft) / 0.6}
            width="78"
            height={(160 * m.metalLeft) / 0.6}
            data-metal-left={m.metalLeft}
          />
          <rect
            className="a017-gas"
            x="185"
            y={274 - (160 * m.gas) / 0.6}
            width="78"
            height={(160 * m.gas) / 0.6}
            data-gas-mol={m.gas}
          />
          <path
            d="M20 114V274 M14 114H26 M14 194H26 M14 274H26"
            className="a017-line"
          />
          <text x="29" y="102">
            0,6
          </text>
          <text x="29" y="307">
            0
          </text>
          <text x="78" y="307" textAnchor="middle">
            {fmt(m.metalLeft)}
          </text>
          <text x="224" y="307" textAnchor="middle">
            {fmt(m.gas)}
          </text>
          <text x="150" y="340" textAnchor="middle">
            mol · ortak ölçek
          </text>
        </Drawing>
        <figcaption>
          Kutu boyu miktarı gösterir; bir toplama düzeneği veya tanecik adedi
          çizimi değildir. İki sütunda da 0–0,6 mol ölçeği var.
        </figcaption>
      </figure>
      <div className="a017-result" data-model-result>
        <p>
          Oluşan {m.chosen.gas === "Yok" ? "gaz" : m.chosen.gas}:{" "}
          <strong>{fmt(m.gas)} mol</strong>.
        </p>
        <p>
          Artan {m.chosen.metal}: {fmt(m.metalLeft)} mol. Artan{" "}
          {m.chosen.reagent}: {fmt(m.reagentLeft)} mol.
        </p>
        <p>
          Metalden verilen elektron: {fmt(m.electronMol)} mol e⁻.{" "}
          {labels[m.limiter]}
        </p>
      </div>
      <Prediction
        question="Son durumda hangi gaz oluşur?"
        choices={[
          ["H₂", "H₂"],
          ["NO", "NO"],
          ["NO₂", "NO₂"],
          ["none", "Gaz yok"],
        ]}
        expected={expected}
        proof={`Hesap: ${fmt(m.gas)} mol ${m.chosen.gas === "Yok" ? "gaz" : m.chosen.gas}; artan metal ${fmt(m.metalLeft)} mol.`}
        state={s}
        change={set}
      />
    </Frame>
  );
}

function DailyAcids() {
  const id = "hayatimizda-asit-baz";
  const [s, set] = useExploration(key(id), {
    ...defaults,
    stone: 0.1,
    acid: 0.1,
  });
  const m = carbonate017(s.stone, s.acid),
    expected =
      m.dissolved === 0
        ? "none"
        : m.stoneLeft > 0
          ? "stone"
          : m.acidLeft > 0
            ? "acid"
            : "both";
  return (
    <Frame
      id={id}
      title="Asit bütçesi ve kireç"
      intro="pH tek başına taşın ne kadarını çözeceğini vermez. Burada toplam asit bütçesi açıkça veriliyor."
    >
      <div className="a017-controls">
        <Range
          label="İlk CaCO₃ (mol)"
          value={m.stone}
          max={0.2}
          step={0.01}
          onChange={(stone) => set({ stone, checked: false })}
        />
        <Range
          label="Asit bütçesi (mol H⁺)"
          value={m.acid}
          max={0.8}
          step={0.01}
          onChange={(acid) => set({ acid, checked: false })}
        />
      </div>
      <p className="a017-equation">CaCO₃ + 2 H⁺ → Ca²⁺ + CO₂ + H₂O</p>
      <p>
        Yalnız bu tepki tam sürer. Asit bütçesi pH’dan türetilmez. M(CaCO₃) =
        100 g/mol. Süre, akış ve gerçek aşınma hızı bu modelde yok.
      </p>
      <figure>
        <Drawing
          title="Başlangıç katısı, kalan CaCO3 ve oluşan CO2"
          height={345}
        >
          <text x="92" y="30" textAnchor="middle">
            CaCO₃
          </text>
          <text x="230" y="30" textAnchor="middle">
            CO₂
          </text>
          <rect
            x="28"
            y={260 - (m.stone / 0.2) * 145}
            width="126"
            height={(m.stone / 0.2) * 145}
            className="a017-ghost"
          />
          <rect
            x="28"
            y={260 - (m.stoneLeft / 0.2) * 145}
            width="126"
            height={(m.stoneLeft / 0.2) * 145}
            className="a017-stone"
            data-stone-left={m.stoneLeft}
          />
          <path d="M12 260H166 M186 85V260H274V85" className="a017-line" />
          <rect
            x="187"
            y={260 - (m.gas / 0.2) * 145}
            width="86"
            height={(m.gas / 0.2) * 145}
            className="a017-gas"
            data-carbon-dioxide={m.gas}
          />
          <text x="92" y="297" textAnchor="middle">
            {fmt(m.stoneLeft)}
          </text>
          <text x="230" y="297" textAnchor="middle">
            {fmt(m.gas)}
          </text>
          <text x="150" y="335" textAnchor="middle">
            mol · 0 ile 0,2 arası
          </text>
        </Drawing>
        <figcaption>
          Kesik çerçeve ilk katıyı, dolu alan kalan katıyı gösterir. İki dolu
          sütunda aynı mol ölçeği var. Çizim gerçek yüzey alanı hesabı değildir.
        </figcaption>
      </figure>
      <div className="a017-result" data-model-result>
        <p>
          CO₂: <strong>{fmt(m.gas)} mol</strong>. Kalan CaCO₃:{" "}
          {fmt(m.stoneLeft)} mol.
        </p>
        <p>
          Çözünen katı: {fmt(m.lostGram)} g. Kalan katı: {fmt(m.leftGram)} g.
        </p>
        <p>
          Artan H⁺: {fmt(m.acidLeft)} mol. Oluşan Ca²⁺: {fmt(m.calcium)} mol.
        </p>
        {m.dissolved === 0 && (
          <p>İki girdiden en az biri yok; burada yeni CO₂ oluşmaz.</p>
        )}
      </div>
      <Prediction
        question="Verilen tepkinin sonunda ne kalır?"
        choices={[
          ["stone", "Katı kalır"],
          ["acid", "Asit kalır"],
          ["both", "İkisi de biter"],
          ["none", "Tepki olmaz"],
        ]}
        expected={expected}
        proof={`Kalan katı ${fmt(m.stoneLeft)} mol, artan H⁺ ${fmt(m.acidLeft)} mol; yeni CO₂ ${fmt(m.gas)} mol.`}
        state={s}
        change={set}
      />
    </Frame>
  );
}

function Soap() {
  const id = "sabun-deterjan-temizlik";
  const [s, set] = useExploration(key(id), {
    ...defaults,
    soap: 10,
    calcium: 2,
    step: "wet",
  });
  const m = soap017(s.soap, s.calcium),
    stage = ["wet", "wrap", "rinse"].includes(s.step) ? s.step : "wet";
  const expected =
    m.soapLeft > 0 ? "soap" : m.calciumLeft > 0 ? "calcium" : "neither";
  const headCount = m.soapLeft <= 0 ? 0 : stage === "wet" ? 4 : 10;
  return (
    <Frame
      id={id}
      title="Sert su sabunun neresini azaltır?"
      intro="Ca²⁺, sabun anyonunu çökeleğe taşıyabilir. Sonra yağlı damlanın çevresini adım adım incele."
    >
      <div className="a017-controls">
        <Range
          label="İlk sabun anyonu (mmol)"
          value={m.soap}
          max={20}
          onChange={(soap) => set({ soap, checked: false })}
        />
        <Range
          label="İlk Ca²⁺ (mmol)"
          value={m.calcium}
          max={12}
          onChange={(calcium) => set({ calcium, checked: false })}
        />
      </div>
      <p className="a017-equation">2 RCOO⁻ + Ca²⁺ → Ca(RCOO)₂(k)</p>
      <p>
        Yalnız Ca²⁺ var ve bu çökelme tam kabul ediliyor. Serbest kalan sabun,
        kesin misel adedi veya temizlik yüzdesi değildir.
      </p>
      <Choice
        label="Yağlı damlayı incele"
        value={stage}
        choices={[
          ["wet", "Dağılma"],
          ["wrap", "Çevreleme"],
          ["rinse", "Durulama"],
        ]}
        onChange={(step) => set({ step, checked: false })}
      />
      <figure>
        <Drawing
          title={`Yağlı damla, hidrofil başlar ve dipte ${fmt(m.precipitate)} mmol çökelek`}
          height={445}
        >
          <rect
            x="12"
            y="40"
            width="276"
            height="230"
            rx="12"
            className="a017-water"
          />
          <text x="26" y="72">
            Su
          </text>
          <circle cx="150" cy="154" r="45" className="a017-oil" />
          <text x="150" y="162" textAnchor="middle">
            Yağ
          </text>
          {Array.from({ length: headCount }, (_, i) => {
            const angle = (i / headCount) * 2 * Math.PI,
              radius = stage === "wet" ? 99 : 78;
            const hx = 150 + radius * Math.cos(angle),
              hy = 154 + radius * Math.sin(angle);
            const tx = 150 + 49 * Math.cos(angle),
              ty = 154 + 49 * Math.sin(angle);
            return (
              <g key={i}>
                <path d={`M${hx} ${hy}L${tx} ${ty}`} className="a017-tail" />
                <circle
                  cx={hx}
                  cy={hy}
                  r="8"
                  className="a017-head"
                  data-soap-head="true"
                />
              </g>
            );
          })}
          {stage === "rinse" && m.soapLeft > 0 && (
            <path
              d="M222 208Q253 208 261 174 M248 183L261 174L266 190"
              className="a017-line"
            />
          )}
          <text x="150" y="306" textAnchor="middle">
            Çökelek (mmol)
          </text>
          <path d="M26 330V397H274V330" className="a017-line" />
          <rect
            x="27"
            y={397 - (m.precipitate / 10) * 62}
            width="246"
            height={(m.precipitate / 10) * 62}
            className="a017-precipitate"
            data-soap-precipitate={m.precipitate}
          />
          <text x="150" y="434" textAnchor="middle">
            {fmt(m.precipitate)} mmol
          </text>
        </Drawing>
        <figcaption>
          Başlar suya, kuyruklar yağlı iç bölgeye bakar. Üst çizim bir yön
          şemasıdır; simge sayısı mol sayımı değildir. Alt kutu 0–10 mmol
          çökeleği gösterir.
        </figcaption>
      </figure>
      <div className="a017-result" data-model-result>
        <p>
          Çökelek: <strong>{fmt(m.precipitate)} mmol</strong>. Bağlanan sabun
          anyonu: {fmt(m.consumedSoap)} mmol.
        </p>
        <p>
          Serbest sabun: {fmt(m.soapLeft)} mmol. Artan Ca²⁺:{" "}
          {fmt(m.calciumLeft)} mmol.
        </p>
        {m.soapLeft === 0 ? (
          <p>
            Serbest sabun yok; bu çizimde çevreleyen başlar da yok. Yağlı damla
            bu yüzden yok olmuş sayılmaz.
          </p>
        ) : (
          <p>
            {stage === "wet"
              ? "Tanecikler suda dağılıyor; yağlı damla ile temas kurulabilir."
              : stage === "wrap"
                ? "Başlar suya, kuyruklar yağlı damlaya dönük. Bu, gerçek çözelti oluştuğu anlamına gelmez."
                : "Durulama dağılmış kiri taşıyabilir. Bu çizim gerçek kir kaybını veya mikrop sayısını ölçmez."}
          </p>
        )}
      </div>
      <Prediction
        question="Çökme sonrası hangi serbest tür var?"
        choices={[
          ["soap", "Sabun anyonu"],
          ["calcium", "Ca²⁺"],
          ["neither", "İkisi de yok"],
        ]}
        expected={expected}
        proof={`Serbest sabun ${fmt(m.soapLeft)} mmol, Ca²⁺ ${fmt(m.calciumLeft)} mmol. Çökelek başına iki sabun anyonu var.`}
        state={s}
        change={set}
      />
    </Frame>
  );
}

function Polymer() {
  const id = "polimer-kozmetik-ilac";
  const [s, set] = useExploration(key(id), {
    ...defaults,
    kind: "pe",
    count: 3,
  });
  const m = polymer017(s.kind, s.count),
    atoms = Object.entries(m.atoms).filter(([, v]) => v > 0);
  return (
    <Frame
      id={id}
      title="Monomer ile zinciri karşılaştır"
      intro="Polimeri ve gösterilen tekrar sayısını seç. Bağ düzeni değişirken hangi atomların bölümde kaldığını izle."
    >
      <Choice
        label="Polimer türü"
        value={m.chosen.id}
        choices={polymer017Kinds.map(
          (c) => [c.id, c.id.toUpperCase()] as const,
        )}
        onChange={(kind) => set({ kind, checked: false })}
      />
      <div className="a017-controls">
        <Range
          label="Tekrar sayısı"
          value={m.count}
          min={2}
          max={8}
          onChange={(count) => set({ count, checked: false })}
        />
      </div>
      <p>
        C = 12 u, H = 1 u, Cl = 35,5 u, F = 19 u. Yalnız gösterilen tekrar
        bölümü sayılıyor; uç gruplar dışarıda.
      </p>
      <figure>
        <Drawing
          title={`${m.chosen.id.toUpperCase()} monomeri ve ${m.count} tekrar biriminden oluşan zincir bölümü`}
          height={180 + m.count * 82}
        >
          <text x="150" y="30" textAnchor="middle">
            Monomer
          </text>
          <text x="150" y="70" textAnchor="middle">
            {m.chosen.monomer}
          </text>
          <path
            d="M150 90V118 M140 108L150 118L160 108"
            className="a017-line"
          />
          <text x="150" y="151" textAnchor="middle">
            Zincir bölümü
          </text>
          {Array.from({ length: m.count }, (_, i) => (
            <g key={i} data-repeat-index={i + 1}>
              {i > 0 && (
                <path
                  d={`M150 ${160 + (i - 1) * 82 + 62}V${160 + i * 82}`}
                  className="a017-line"
                />
              )}
              <rect
                x="26"
                y={160 + i * 82}
                width="248"
                height="62"
                rx="8"
                className="a017-unit"
              />
              <text x="150" y={200 + i * 82} textAnchor="middle">
                {m.chosen.repeat}
              </text>
            </g>
          ))}
        </Drawing>
        <figcaption>
          Kutular aynı zincirin tekrar birimlerini gösterir; aradaki çizgiler
          bağın şematik yoludur. Bütün ürünün zincir uzunluğu ve son grupları bu
          çizimde yok.
        </figcaption>
      </figure>
      <div className="a017-result" data-model-result>
        <p>
          Gösterilen bölüm: <strong>{m.count} tekrar</strong>.
        </p>
        <p data-atom-totals>
          {atoms.map(([a, n]) => `${a}: ${n}`).join(" · ")}
        </p>
        <p>
          Bir tekrar: {fmt(m.repeatMass)} u. Bu bölümün tekrar kütlesi:{" "}
          <strong>{fmt(m.segmentMass)} u</strong>.
        </p>
        <p>
          Bu sayı bütün polimerin kesin mol kütlesi değildir. Uç gruplar ve
          zincir dağılımı verilmedi.
        </p>
      </div>
      <Prediction
        question="Seçili bölümde hangi atom türleri var?"
        choices={[
          ["pe", "C ve H"],
          ["pvc", "C, H ve Cl"],
          ["ptfe", "C ve F"],
        ]}
        expected={m.chosen.id}
        proof={`${atoms.map(([a, n]) => `${a}: ${n}`).join("; ")}. Tekrar sayısı ${m.count}; su çıkışı bu katılma şemasında yok.`}
        state={s}
        change={set}
      />
    </Frame>
  );
}

function Food() {
  const id = "polimer-gida-ilac-yag";
  const [s, set] = useExploration(key(id), { ...defaults, portion: 35 });
  const m = foodLabel017(s.portion),
    rows = [
      ["Yağ", m.fat, "fat"],
      ["Doymuş", m.saturated, "saturated"],
      ["Karbo.", m.carbohydrate, "carbohydrate"],
      ["Protein", m.protein, "protein"],
    ] as const;
  return (
    <Frame
      id={id}
      title="Etiketi porsiyona çevir"
      intro="Bu özgün etiket 100 g ürün için verilmiştir. Tüketilen ürün gramını değiştir; doymuş yağı toplam yağa ikinci kez ekleme."
    >
      <dl className="a017-label">
        <div>
          <dt>100 g’da toplam yağ</dt>
          <dd>20 g</dd>
        </div>
        <div>
          <dt>100 g’da doymuş yağ</dt>
          <dd>8 g</dd>
        </div>
        <div>
          <dt>100 g’da karbo.</dt>
          <dd>30 g</dd>
        </div>
        <div>
          <dt>100 g’da protein</dt>
          <dd>5 g</dd>
        </div>
      </dl>
      <p>
        Karbo.: şeker ve nişasta gibi öğeleri kapsayan etiket grubu. Doymuş yağ,
        toplam yağın içindedir. Su ve diğer öğeler bu etikette ayrı verilmedi.
      </p>
      <Range
        label="Porsiyon (g ürün)"
        value={m.portion}
        max={100}
        onChange={(portion) => set({ portion, checked: false })}
      />
      <figure>
        <Drawing
          title={`${fmt(m.portion)} gram ürün için verilen dört besin miktarı`}
          height={450}
        >
          {rows.map(([name, value, attr], i) => (
            <g key={attr}>
              <text x="18" y={33 + i * 85}>
                {name}
              </text>
              <text x="282" y={33 + i * 85} textAnchor="end">
                {fmt(value)} g
              </text>
              <rect
                x="18"
                y={46 + i * 85}
                width={(value / 30) * 264}
                height="25"
                className={
                  attr === "saturated" ? "a017-fat-subset" : "a017-food-bar"
                }
                data-food={attr}
                data-food-value={value}
              />
            </g>
          ))}
          <path
            d="M18 365H282 M18 359V372 M150 359V372 M282 359V372"
            className="a017-line"
          />
          <text x="18" y="397">
            0
          </text>
          <text x="150" y="397" textAnchor="middle">
            15
          </text>
          <text x="282" y="397" textAnchor="end">
            30
          </text>
          <text x="150" y="427" textAnchor="middle">
            Ortak eksen: g
          </text>
        </Drawing>
        <figcaption>
          Çubuklar ayrı miktarları gösterir; toplam bulmak için üst üste
          eklenmez. Doymuş yağ, yağın içindeki alt miktardır. Bu bir kalori veya
          sağlık puanı değildir.
        </figcaption>
      </figure>
      <div className="a017-result" data-model-result>
        <p>
          {fmt(m.portion)} g üründe toplam yağ: <strong>{fmt(m.fat)} g</strong>;
          bunun doymuş kısmı {fmt(m.saturated)} g.
        </p>
        <p>
          Karbo.: {fmt(m.carbohydrate)} g. Protein: {fmt(m.protein)} g.
        </p>
        <p>
          Bu etiket kütleye dayalı. mL ile gramı çevirmek için ayrıca yoğunluk
          gerekir.
        </p>
      </div>
      <Prediction
        question="Bu porsiyon için iki yağ miktarı nasıl?"
        choices={[
          ["less", "Doymuş yağ daha az"],
          ["more", "Doymuş yağ daha çok"],
          ["zero", "İkisi de sıfır"],
        ]}
        expected={m.portion === 0 ? "zero" : "less"}
        proof={`Toplam yağ ${fmt(m.fat)} g, doymuş kısmı ${fmt(m.saturated)} g. Aynı porsiyon oranı iki satıra da uygulanır.`}
        state={s}
        change={set}
      />
    </Frame>
  );
}

export default function Forge017ChemistryALab({
  lessonId,
}: {
  lessonId: string;
}) {
  if (lessonId === "asit-baz-metaller") return <Metals />;
  if (lessonId === "hayatimizda-asit-baz") return <DailyAcids />;
  if (lessonId === "sabun-deterjan-temizlik") return <Soap />;
  if (lessonId === "polimer-kozmetik-ilac") return <Polymer />;
  if (lessonId === "polimer-gida-ilac-yag") return <Food />;
  return null;
}
