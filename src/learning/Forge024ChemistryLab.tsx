import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import { useApp } from "../store";
import {
  analyse024,
  alcoholReaction024,
  alcoholRoutes024,
  ether024,
  carbonyl024,
  carbonylChoices024,
  carbonylReagents024,
  acid024,
  acidChoices024,
  ester024,
  triglyceride024,
  fattyChoices024,
  chemistryDefaults024,
  normalizeChemistry024,
  type Molecule024,
  type Term024,
} from "./forge024Chemistry";
import "./forge024Chemistry.css";
const uiText024 = (text: string) => {
  const copies: Record<string, string> = {
    Yükseltgenme: "Alkol + [O]",
    "Alkolik fermantasyon": "Etanol ve CO₂",
    "Karboksilik asit oluşur": "COOH grubu oluşur",
    "Karboksilat ve alkol oluşur": "RCOO⁻ ve alkol oluşur",
    "Karboksiller tam nötrleşti": "Tüm COOH’ler nötrleşti",
    "Karboksil H’leri korunuyor": "COOH: H korunur",
    "Olağan koşulda yükseltgenme yok": "Hafif [O] ile ürün yok",
    "Primer alkol uygun kontrollü koşulda aldehide, ileri yükseltgenmeyle aside; sekonder alkol ketona yönelir. Ürünü sadece alkol kelimesi değil OH karbonunun komşuları ve verilen koşul belirler.":
      "Primer alkol uygun kontrollü koşulda aldehide, ileri [O] adımında aside; sekonder alkol ketona yönelir. Ürün, OH karbonunun komşuları ve verilen koşula bağlıdır.",
    "OH taşıyan karbonda H yoktur. Olağan hafif yükseltgenmeyle aynı iskeletli karbonil ürünü beklenmez; sert koşulda iskelet kırılması ayrı süreçtir.":
      "OH taşıyan karbonda H yoktur. Olağan hafif [O] koşulunda aynı iskeletli karbonil ürünü beklenmez; sert koşulda iskelet kırılması ayrı süreçtir.",
    "Ayıraç indirgenirken aldehit yükseltgenir. Ortam bazik olduğu için doğrudan organik ürün karboksilattır. Burada yalnız bir aldehit grubunun ilk yükseltgenme basamağı sayılır; formaldehit/formiatın ileri yükseltgenmesi bu miktarın dışındadır.":
      "Ayıraç indirgenir, aldehit [O] alır. Ortam bazik olduğu için doğrudan organik ürün RCOO⁻ türüdür. Yalnız bir aldehit grubunun ilk [O] adımı sayılır; metanal ve formiat için sonraki [O] adımları bu miktara dahil değil.",
    "Her seçili karboksil grubu bir OH⁻ ile bir H₂O oluşturur. Görüntü bir formal rezonans katkısıdır; gerçek karboksilatın yükü iki O arasında dağılır. Seçilen grup sayısı atom hesabıdır; gerçek pH, pKa veya karışım dağılımı hesaplanmaz. Glisinin amino grubunun ve ek hidroksillerin ayrıntılı asit-baz dengesi ayrı tutulur.":
      "Her seçili COOH grubu bir OH⁻ ile bir H₂O oluşturur. Çizim tek formal rezonans katkısıdır; gerçek RCOO⁻ yükü iki O arasında dağılır. Seçilen grup sayısı atom hesabıdır; gerçek pH, pKa veya karışım dağılımı için hesap yoktur. Glisinin amino grubu ile ek alkol OH grupları için ayrıntılı asit-baz dengesi ayrı tutulur.",
    "Miktarlar mol cinsinden seçilmiş stokiyometrik bir ilerlemedir; gerçek denge verimi veya hız tahmini değildir. Standart Fischer esterleşmesinin basit atom takibinde alkol O’su ester köprüsünde kalır, asit OH’sinin O’su suya gider. Bu etiketleme uzun süreli izotop değişimini modellemez. Bazik hidrolizde doğrudan serbest asit değil karboksilat tuzu elde edilir.":
      "Mol miktarları denklem oranına göre seçilen ilerlemeyi gösterir; gerçek denge verimi veya hız hesabı değil. Standart Fischer yolunda alkol O’su ester köprüsünde kalır, asit OH’sinin O’su suya gider. Bu atom takibi uzun süreli izotop değişimini içermez. Bazik hidrolizde sonuç: Karboksilat ve alkol oluşur; doğrudan serbest asit çıkmaz.",
    "Basit ketonlar olağan hafif yükseltgenmeyle aynı karbon sayılı aside dönüşmez. Çok sert koşullarda C–C kırılması ayrı kimyadır.":
      "Basit ketonlar olağan hafif [O] koşulunda aynı karbon sayılı aside dönüşmez. Çok sert koşullarda C–C kırılması ayrı kimyadır.",
  };
  return Object.hasOwn(copies, text) ? copies[text] : text;
};
const moleculeName024 = (name: string) => {
  const match =
    /^(?:1-)?(metoksi|etoksi|propoksi|bütoksi)(metan|etan|propan|bütan)$/.exec(
      name,
    );
  if (!match) return name;
  const alkyl: Record<string, string> = {
      metoksi: "metil",
      etoksi: "etil",
      propoksi: "propil",
      bütoksi: "bütil",
      metan: "metil",
      etan: "etil",
      propan: "propil",
      bütan: "bütil",
    },
    left = alkyl[match[1]],
    right = alkyl[match[2]];
  return left === right ? `di${left} eter` : `${left} ${right} eter`;
};
type Options024 = Record<string, string>;
const numbers024 = (max: number, min = 1): Options024 =>
  Object.fromEntries(
    Array.from({ length: max - min + 1 }, (_, i) => [
      String(i + min),
      String(i + min),
    ]),
  );
const plain024 = (s: string) =>
  s.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => String("₀₁₂₃₄₅₆₇₈₉".indexOf(c)));
function Select024({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | number;
  options: Options024;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <label className="c024-field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {Object.entries(options).map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
function Equation024({
  left,
  right,
  reversible = false,
}: {
  left: Term024[];
  right: Term024[];
  reversible?: boolean;
}) {
  const line = (terms: Term024[]) =>
    terms
      .filter((t) => t.coefficient > 0)
      .map(
        (t) =>
          `${t.coefficient === 1 ? "" : t.coefficient + " "}${t.label}${t.charge && !/[⁺⁻]/.test(t.label) ? (Math.abs(t.charge) === 1 ? "" : Math.abs(t.charge)) + (t.charge > 0 ? "⁺" : "⁻") : ""}`,
      )
      .join(" + ");
  return (
    <p className="c024-equation">
      <span>{line(left)}</span>
      <b aria-label={reversible ? "denge oku" : "tepkime oku"}>
        {reversible ? " ⇌ " : " → "}
      </b>
      <span>{line(right)}</span>
    </p>
  );
}
function Molecule024View({
  molecule,
  selected,
  onSelect,
  title,
}: {
  molecule: Molecule024;
  selected: string;
  onSelect: (id: string) => void;
  title: string;
}) {
  const info = analyse024(molecule),
    xs = molecule.atoms.map((a) => a.x),
    ys = molecule.atoms.map((a) => a.y),
    minX = Math.min(...xs),
    minY = Math.min(...ys),
    width = Math.max(250, (Math.max(...xs) - minX) * 0.7 + 64),
    height = Math.max(160, (Math.max(...ys) - minY) * 0.7 + 64),
    pos = (id: string) => {
      const a = molecule.atoms.find((a) => a.id === id)!;
      return { x: (a.x - minX) * 0.7 + 32, y: (a.y - minY) * 0.7 + 32 };
    };
  const atomLabel = (id: string) => {
    const a = molecule.atoms.find((a) => a.id === id)!;
    return `${a.element}${a.charge === -1 ? "⁻" : a.charge === 1 ? "⁺" : ""}`;
  };
  return (
    <figure className="c024-molecule">
      <figcaption>
        {title}: {moleculeName024(molecule.name)} · {info.formula}
      </figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${molecule.name}: ${info.formula}, sigma ${info.sigma}, pi ${info.pi}. H atomları seçili atom açıklamasında sayılır.`}
      >
        {molecule.bonds.map((b) => {
          const a = pos(b.a),
            c = pos(b.b),
            length = Math.hypot(c.x - a.x, c.y - a.y),
            dx = (-(c.y - a.y) / length) * 3,
            dy = ((c.x - a.x) / length) * 3;
          return (
            <g
              key={b.a + "-" + b.b}
              data-bond={`${b.a}-${b.b}`}
              data-order={b.order}
            >
              {Array.from({ length: b.order }, (_, i) => {
                const offset = i - (b.order - 1) / 2;
                return (
                  <line
                    key={i}
                    x1={a.x + offset * dx}
                    y1={a.y + offset * dy}
                    x2={c.x + offset * dx}
                    y2={c.y + offset * dy}
                  />
                );
              })}
            </g>
          );
        })}
        {molecule.atoms.map((a) => {
          const p = pos(a.id);
          return (
            <g
              key={a.id}
              data-atom={a.id}
              data-element={a.element}
              data-charge={a.charge ?? 0}
              className={selected === a.id ? "c024-selected" : ""}
              onClick={() => onSelect(a.id)}
            >
              <circle cx={p.x} cy={p.y} r="14" />
              <text x={p.x} y={p.y + 7} textAnchor="middle">
                {atomLabel(a.id)}
              </text>
            </g>
          );
        })}
      </svg>
      <p>
        Gizli H’ler değerlikten tamamlanır; çizim iki boyutlu bağlantı
        şemasıdır.
      </p>
    </figure>
  );
}
function Fat024View() {
  return (
    <figure className="c024-molecule">
      <figcaption>
        Yağdaki üç ester bağı; R, seçili yağ asidi kuyruğu.
      </figcaption>
      <svg
        viewBox="0 0 300 300"
        role="img"
        aria-label="Gliserolün üç karbonu O üzerinden üç karbonil karbonuna bağlanır; her dal CH–O–C(=O)–R bağlantısı taşır."
        data-triglyceride="true"
      >
        <line x1="28" y1="64" x2="28" y2="144" />
        <line x1="28" y1="156" x2="28" y2="236" />
        {[60, 150, 240].map((y, i) => (
          <g key={y} data-ester-link={i + 1}>
            <line x1="46" y1={y} x2="85" y2={y} />
            <line x1="107" y1={y} x2="155" y2={y} />
            <line x1="178" y1={y} x2="232" y2={y} />
            <line x1="162" y1={y - 15} x2="162" y2={y - 36} />
            <line x1="169" y1={y - 15} x2="169" y2={y - 36} />
            <text x="5" y={y + 7}>
              {i === 1 ? "CH" : "CH₂"}
            </text>
            <text x="88" y={y + 7}>
              O
            </text>
            <text x="157" y={y + 7}>
              C
            </text>
            <text x="157" y={y - 42}>
              O
            </text>
            <text x="240" y={y + 7}>
              R
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
export default function Forge024ChemistryLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const storageKey = "forge024:chemistry:" + lessonId,
    explorations = useApp().state.explorations,
    raw = Object.hasOwn(explorations, storageKey)
      ? explorations[storageKey]
      : undefined;
  const [saved, set] = useExploration(storageKey, chemistryDefaults024),
    normalized = normalizeChemistry024(saved),
    active: (keyof typeof chemistryDefaults024)[] =
      lessonId === "ayt-alkol-eldesi-tepkimeleri"
        ? ["route", "stage", "amount"]
        : lessonId === "ayt-eterler"
          ? ["left", "right"]
          : lessonId === "ayt-aldehit-keton"
            ? ["carbonyl", "reagent", "amount"]
            : lessonId === "ayt-karboksilik-asitler"
              ? ["acid", "amount", "neutralized", "base"]
              : normalized.esterView === "fat"
                ? ["esterView", "fatty", "fatAmount", "fatExtent", "base"]
                : [
                    "esterView",
                    "acidCarbons",
                    "alcoholCarbons",
                    "esterMode",
                    "first",
                    "second",
                    "extent",
                  ],
    invalidRawType =
      raw !== undefined &&
      active.some(
        (k) =>
          Object.hasOwn(raw, k) &&
          typeof raw[k] !== typeof chemistryDefaults024[k],
      ),
    v = invalidRawType
      ? { ...normalized, guess: "", reason: "", checked: false, show: false }
      : normalized,
    persist = (patch: Partial<typeof v>) => set({ ...v, ...patch }),
    change = (patch: Partial<typeof v>) =>
      persist({
        ...patch,
        guess: "",
        reason: "",
        checked: false,
        show: false,
        atom: "",
      });
  let controls: ReactNode,
    result: ReactNode,
    molecule: Molecule024,
    comparison: Molecule024 | undefined,
    comparisonTitle = "Aynı formüllü alkol eşi",
    description: string,
    predictionLabel: string,
    expected: string,
    options: Options024;
  if (lessonId === "ayt-alkol-eldesi-tepkimeleri") {
    const r = alcoholReaction024(v.route, v.stage, v.amount);
    molecule = r.visible;
    description = uiText024(r.explanation);
    expected = r.product.formula;
    predictionLabel = "Organik ürünün formülü";
    options = Object.fromEntries(
      [
        ...new Set([
          "C₂H₆O",
          "C₃H₈O",
          "C₃H₆O",
          "C₃H₆O₂",
          "C₄H₁₀O",
          "C₂H₅O",
          "C₂H₄",
          "CO₂",
          expected,
        ]),
      ].map((x) => [x, x]),
    );
    controls = (
      <>
        <Select024
          label="Üretim veya tepkime yolu"
          value={v.route}
          options={alcoholRoutes024}
          onChange={(route) => change({ route })}
        />
        <Select024
          label="Denklem katı"
          value={v.amount}
          options={numbers024(4)}
          onChange={(x) => change({ amount: Number(x) })}
        />
        <div className="c024-stages" aria-label="Bağ değişimi aşaması">
          {["Başlangıç", "Bağı düşün", "Ürün"].map((name, stage) => (
            <button
              key={name}
              type="button"
              aria-pressed={v.stage === stage}
              onClick={() => change({ stage })}
            >
              {name}
            </button>
          ))}
        </div>
      </>
    );
    result = (
      <div
        data-model-result
        data-formula={plain024(r.visible.formula)}
        data-product-formula={plain024(r.product.formula)}
        data-balanced={r.balance.balanced}
      >
        <h4>{uiText024(r.decision)}</h4>
        <p>{r.stageNote}</p>
        <p>
          Başlangıç {r.start.formula}; organik ürün {r.product.formula}. Denklem
          katı {v.amount}; katsayılar mol oranıdır.
        </p>
        <Equation024 left={r.left} right={r.right} />
      </div>
    );
  } else if (lessonId === "ayt-eterler") {
    const r = ether024(v.left, v.right);
    molecule = r.structure;
    comparison = r.comparison;
    description = uiText024(r.explanation);
    expected = r.symmetric ? "symmetric" : "asymmetric";
    predictionLabel = "Eter simetrisi";
    options = { symmetric: "Simetrik", asymmetric: "Asimetrik" };
    controls = (
      <>
        <Select024
          label="Sol düz alkil C sayısı"
          value={v.left}
          options={numbers024(4)}
          onChange={(x) => change({ left: Number(x) })}
        />
        <Select024
          label="Sağ düz alkil C sayısı"
          value={v.right}
          options={numbers024(4)}
          onChange={(x) => change({ right: Number(x) })}
        />
      </>
    );
    result = (
      <div
        data-model-result
        data-formula={plain024(r.structure.formula)}
        data-comparison-formula={plain024(r.comparison.formula)}
        data-symmetric={r.symmetric}
      >
        <h4>{uiText024(r.decision)}</h4>
        <p>
          {moleculeName024(r.structure.name)}; formülü {r.structure.formula}.
          Alkol eşi {r.comparison.formula}; formül eşliği{" "}
          {r.sameFormula ? "var" : "yok"}.
        </p>
        <p>
          Eter: H bağı alıcısı var; tek işlevli yapıda O–H vericisi yok. Alkol
          eşinde O–H vardır.
        </p>
      </div>
    );
  } else if (lessonId === "ayt-aldehit-keton") {
    const r = carbonyl024(v.carbonyl, v.reagent, v.amount);
    molecule = r.product;
    description = uiText024(r.explanation);
    expected = r.aldehyde ? "aldehyde" : "ketone";
    predictionLabel = "Başlangıç karbonilinin sınıfı";
    options = { aldehyde: "Aldehit", ketone: "Keton" };
    controls = (
      <>
        <Select024
          label="Karbonil bileşiği"
          value={v.carbonyl}
          options={carbonylChoices024}
          onChange={(carbonyl) => change({ carbonyl })}
        />
        <Select024
          label="Ayıraç veya işlem"
          value={v.reagent}
          options={carbonylReagents024}
          onChange={(reagent) => change({ reagent })}
        />
        <Select024
          label="Başlangıç miktarı (mol)"
          value={v.amount}
          options={numbers024(4)}
          onChange={(x) => change({ amount: Number(x) })}
        />
      </>
    );
    result = (
      <div
        data-model-result
        data-formula={plain024(r.product.formula)}
        data-charge={r.product.charge}
        data-aldehyde={r.aldehyde}
        data-balanced={r.balance.balanced}
        data-metal={r.metal}
      >
        <h4>{uiText024(r.decision)}</h4>
        <p>
          Organik ürün {r.product.formula}; iyon yükü {r.product.charge}.{" "}
          {v.reagent === "tollens"
            ? `Ag: ${r.metal} mol.`
            : v.reagent === "fehling"
              ? `Cu₂O: ${r.metal} mol.`
              : ""}
        </p>
        <Equation024 left={r.left} right={r.right} />
      </div>
    );
  } else if (lessonId === "ayt-karboksilik-asitler") {
    const r = acid024(v.acid, v.amount, v.neutralized, v.base);
    molecule = r.product;
    description = uiText024(r.explanation);
    expected = String(r.start.acids.length);
    predictionLabel = "Molekül başına COOH sayısı";
    options = numbers024(3);
    controls = (
      <>
        <Select024
          label="Karboksilik asit"
          value={v.acid}
          options={acidChoices024}
          onChange={(acid) => change({ acid, neutralized: 0 })}
        />
        <Select024
          label="Asit miktarı (mol)"
          value={v.amount}
          options={numbers024(4)}
          onChange={(x) => change({ amount: Number(x) })}
        />
        <Select024
          label="Molekül başına nötrleşen COOH"
          value={v.neutralized}
          options={numbers024(r.start.acids.length, 0)}
          onChange={(x) => change({ neutralized: Number(x) })}
        />
        <Select024
          label="Baz"
          value={v.base}
          options={{ Na: "NaOH", K: "KOH" }}
          onChange={(base) => change({ base })}
        />
      </>
    );
    result = (
      <div
        data-model-result
        data-formula={plain024(r.product.formula)}
        data-charge={r.product.charge}
        data-acid-groups={r.start.acids.length}
        data-equivalents={r.equivalents}
        data-balanced={r.balance.balanced}
      >
        <h4>{uiText024(r.decision)}</h4>
        <p>
          Molekül başına COOH: {r.start.acids.length}; ek alkol OH:{" "}
          {r.start.alcohols.length}. Baz tüketimi: {r.equivalents} mol; su:{" "}
          {r.equivalents} mol.
        </p>
        <p>
          Organik iyon yükü: {r.product.charge}; karşı iyon {r.equivalents} mol{" "}
          {v.base}⁺.
        </p>
        <Equation024 left={r.left} right={r.right} />
      </div>
    );
  } else {
    const r = ester024(
        v.acidCarbons,
        v.alcoholCarbons,
        v.esterMode,
        v.first,
        v.second,
        v.extent,
      ),
      fat = triglyceride024(v.fatty, v.fatAmount, v.fatExtent, v.base),
      isFat = v.esterView === "fat";
    molecule =
      v.esterMode === "formation"
        ? r.ester
        : v.esterMode === "base"
          ? r.salt
          : r.acid;
    comparison = v.esterMode === "formation" ? undefined : r.alcohol;
    comparisonTitle = "Alkol ürünü türü";
    description = uiText024(isFat ? fat.explanation : r.explanation);
    expected = isFat
      ? String(fat.soap)
      : v.esterMode === "formation"
        ? "water"
        : v.esterMode === "base"
          ? "salt"
          : "acid";
    predictionLabel = isFat
      ? "Oluşan sabun miktarı (mol)"
      : v.esterMode === "formation"
        ? "Esterleşmede ayrılan küçük molekül"
        : "Hidrolizde karboksilik ürün";
    options = isFat
      ? numbers024(12, 0)
      : v.esterMode === "formation"
        ? { water: "H₂O", hydrogen: "H₂", carbon: "CO₂" }
        : {
            acid: "Asit (asidik hidroliz)",
            salt: "RCOO⁻ tuzu (bazik hidroliz)",
          };
    controls = (
      <>
        <Select024
          label="Ester modeli"
          value={v.esterView}
          options={{
            simple: "Tek ester bağı",
            fat: "Trigliserit ve sabunlaşma",
          }}
          onChange={(esterView) => change({ esterView })}
        />
        {isFat ? (
          <>
            <Select024
              label="Yağ asidi kuyruğu"
              value={v.fatty}
              options={Object.fromEntries(
                Object.entries(fattyChoices024).map(([k, x]) => [k, x.name]),
              )}
              onChange={(fatty) => change({ fatty })}
            />
            <Select024
              label="Başlangıç yağ (mol)"
              value={v.fatAmount}
              options={numbers024(4)}
              onChange={(x) => change({ fatAmount: Number(x), fatExtent: 0 })}
            />
            <Select024
              label="Tam hidroliz edilen yağ (mol)"
              value={v.fatExtent}
              options={numbers024(v.fatAmount, 0)}
              onChange={(x) => change({ fatExtent: Number(x) })}
            />
            <Select024
              label="Sabunlaşma bazı"
              value={v.base}
              options={{ Na: "NaOH", K: "KOH" }}
              onChange={(base) => change({ base })}
            />
          </>
        ) : (
          <>
            <Select024
              label="Asit tarafı C sayısı"
              value={v.acidCarbons}
              options={numbers024(4)}
              onChange={(x) => change({ acidCarbons: Number(x) })}
            />
            <Select024
              label="Alkol tarafı C sayısı"
              value={v.alcoholCarbons}
              options={numbers024(4)}
              onChange={(x) => change({ alcoholCarbons: Number(x) })}
            />
            <Select024
              label="Ester işlemi"
              value={v.esterMode}
              options={{
                formation: "Esterleşme: asit + alkol",
                hydrolysis: "Asidik hidroliz: ester + su",
                base: "Bazik hidroliz: ester + NaOH",
              }}
              onChange={(esterMode) => change({ esterMode, extent: 0 })}
            />
            <Select024
              label="Birinci reaktan (mol)"
              value={v.first}
              options={numbers024(4)}
              onChange={(x) => change({ first: Number(x), extent: 0 })}
            />
            <Select024
              label="İkinci reaktan (mol)"
              value={v.second}
              options={numbers024(4)}
              onChange={(x) => change({ second: Number(x), extent: 0 })}
            />
            <Select024
              label="Tepkime ilerlemesi (mol)"
              value={v.extent}
              options={numbers024(r.maximum, 0)}
              onChange={(x) => change({ extent: Number(x) })}
            />
          </>
        )}
      </>
    );
    result = isFat ? (
      <div
        data-model-result
        data-fat="true"
        data-balanced={fat.balance.balanced}
        data-soap={fat.soap}
        data-glycerol={fat.glycerol}
      >
        <h4>{uiText024(fat.decision)}</h4>
        <p>
          Yağ formülü: {fat.left[0].label}. Baz tüketimi: {fat.baseUsed} mol.
          Sabun karboksilat tuzudur.
        </p>
        <Equation024 left={fat.left} right={fat.right} />
        <Fat024View />
      </div>
    ) : (
      <div
        data-model-result
        data-formula={plain024(r.ester.formula)}
        data-balanced={r.balance.balanced}
        data-extent={r.extent}
        data-maximum={r.maximum}
      >
        <h4>{uiText024(r.decision)}</h4>
        <p>
          {r.ester.name}; ester {r.ester.formula}. Asit {r.acid.formula}, alkol{" "}
          {r.alcohol.formula}. Mol üst sınırı {r.maximum} mol; seçili ilerleme{" "}
          {r.extent} mol.
        </p>
        <Equation024
          left={r.left}
          right={r.right}
          reversible={v.esterMode !== "base"}
        />
        <p>
          Köprü O: alkol kökenli; karbonil O: asit kökenli. Suya geçen asit
          OH’si bu basit standart yolun atom takibidir.
        </p>
      </div>
    );
  }
  const info = analyse024(molecule),
    atom = info.atoms.find((a) => a.id === v.atom) ?? info.atoms[0],
    guess = Object.hasOwn(options, v.guess) ? v.guess : "",
    canCompare = guess !== "" && v.reason.trim().length > 0,
    checked = v.checked && canCompare;
  return (
    <section
      className="c024-lab"
      data-forge024={lessonId}
      aria-label="Organik oksijenli bileşikler keşfi"
    >
      <h3>Bağı değiştir, atomları koru</h3>
      <p>
        Bir koşul seç, yapıyı incele ve gerekçeni yaz. Bu keşif puan vermez;
        konu bitişi sayılmaz.
      </p>
      <div className="c024-controls">{controls}</div>
      {result}
      <p className="c024-scope">{description}</p>
      {!(lessonId === "ayt-esterler" && v.esterView === "fat") && (
        <>
          <Molecule024View
            molecule={molecule}
            selected={atom.id}
            onSelect={(id) => persist({ atom: id })}
            title="Seçili yapı"
          />
          {comparison && (
            <Molecule024View
              molecule={comparison}
              selected=""
              onSelect={() => {}}
              title={comparisonTitle}
            />
          )}
          <Select024
            label="Atomu seç"
            value={atom.id}
            options={Object.fromEntries(
              info.atoms.map((a, i) => [
                a.id,
                `${i + 1}. ${a.element} (${a.id})`,
              ]),
            )}
            onChange={(id) => persist({ atom: id })}
          />
          <p className="c024-atom-evidence" data-selected-atom={atom.id}>
            {atom.element} atomu {atom.id}: gizli H {info.hydrogens[atom.id]};
            formal yük {atom.charge ?? 0}. Toplam sigma: {info.sigma}; pi:{" "}
            {info.pi}.{" "}
            {atom.origin
              ? `O kökeni: ${atom.origin === "alcohol" ? "alkol" : "asit"}.`
              : ""}
          </p>
        </>
      )}
      <div className="c024-prediction">
        <Select024
          label={predictionLabel}
          value={guess}
          options={{ "": "Bir sonuç seç", ...options }}
          onChange={(guess) => persist({ guess, checked: false })}
        />
        <label className="c024-field">
          <span>Gerekçen</span>
          <input
            value={v.reason}
            maxLength={128}
            onChange={(e) =>
              persist({ reason: e.target.value, checked: false })
            }
            placeholder="Bağ, grup veya mol oranına dayandır."
          />
        </label>
        <button
          type="button"
          disabled={!canCompare}
          onClick={() => persist({ checked: true })}
        >
          Kıyasla
        </button>
        <button type="button" onClick={() => persist({ show: !v.show })}>
          {v.show ? "Kanıtı kapat" : "Kanıtı göster"}
        </button>
        {checked && (
          <p className="c024-feedback" role="status">
            {guess === expected
              ? "Kanıtla uyumlu."
              : "Yapı veya denklemle yeniden karşılaştır."}{" "}
            Sonuç: {options[expected] ?? expected}. Yazılı gerekçe için otomatik
            not yoktur.
          </p>
        )}
        {v.show && (
          <p className="c024-proof">
            Kanıt: {options[expected] ?? expected}. {description}
          </p>
        )}
      </div>
    </section>
  );
}
