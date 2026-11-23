import { useId } from "react";
import {
  absoluteMembership,
  integerPower,
  normalizeScientific,
  proportionValue,
  simplifySquareRoot,
} from "./forge093Math";
import { useExploration } from "./useExploration";
import { GoldenRatioSource016Lab } from "./GoldenRatioSource016Lab";
import { RadicalsSource015RootLab } from "./RadicalsSource015RootLab";
import "./forge093MathLab.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

const number = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 8 }).format(
    Object.is(n, -0) ? 0 : n,
  );
const bounded = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, Number.isFinite(n) ? Math.round(n) : min));
type PredictionProps = {
  options: [string, string][];
  guess: string;
  checked: boolean;
  expected: string;
  reason: string;
  choose: (guess: string) => void;
  check: () => void;
};
function Prediction({
  options,
  guess,
  checked,
  expected,
  reason,
  choose,
  check,
}: PredictionProps) {
  return (
    <div className="math093-prediction">
      <div className="math093-prediction-controls">
        <label className="field">
          Tahminin
          <ChoiceSelect value={guess} onChange={(e) => choose(e.target.value)}>
            <option value="">Bir tahmin seç</option>
            {options.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </ChoiceSelect>
        </label>
        <button
          className="button secondary"
          disabled={!options.some(([v]) => v === guess)}
          onClick={check}
        >
          Gerekçeyi denetle
        </button>
      </div>
      {checked && (
        <p className="math093-feedback" role="status">
          <strong>
            {guess === expected
              ? "Tahminin bu modelde doğru."
              : "Tahminini şu koşulla yeniden düşün."}
          </strong>{" "}
          {reason}
        </p>
      )}
    </div>
  );
}
function Range({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="field">
      {label}: {number(value)}
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function AbsoluteLab() {
  const [s, set] = useExploration("forge093-math-absolute", {
    x: -2,
    center: 2,
    radius: 4,
    mode: "closed",
    guess: "",
    checked: false,
  });
  const x = bounded(s.x, -8, 8),
    a = bounded(s.center, -4, 4),
    r = bounded(s.radius, 0, 4);
  const mode = ["closed", "inside", "outside", "equal"].includes(s.mode)
    ? s.mode
    : "closed";
  const result = absoluteMembership(x, a, r, mode);
  const sign =
    mode === "closed"
      ? "≤"
      : mode === "inside"
        ? "<"
        : mode === "outside"
          ? ">"
          : "=";
  const pos = (n: number) => 30 + (n + 8) * 27.5;
  const allowed = Array.from({ length: 17 }, (_, i) => i - 8);
  return (
    <>
      <p>
        Merkez ile noktanın uzaklığını değiştir; sonra seçtiğin eşitsizliğe
        üyeliğini denetle. Renkli çizgi gerçek çözüm aralığıdır; küçük işaretler
        seçilebilir tam sayı örneklerini gösterir.
      </p>
      <div className="math093-controls">
        <Range
          label="Merkez a"
          value={a}
          min={-4}
          max={4}
          onChange={(center) => set({ center, checked: false })}
        />
        <Range
          label="Seçilen nokta x"
          value={x}
          min={-8}
          max={8}
          onChange={(x) => set({ x, checked: false })}
        />
        <Range
          label="Uzaklık sınırı r"
          value={r}
          min={0}
          max={4}
          onChange={(radius) => set({ radius, checked: false })}
        />
        <label className="field">
          Uzaklık koşulu
          <ChoiceSelect
            value={mode}
            onChange={(e) => set({ mode: e.target.value, checked: false })}
          >
            <option value="closed">|x−a| ≤ r</option>
            <option value="inside">|x−a| &lt; r</option>
            <option value="outside">|x−a| &gt; r</option>
            <option value="equal">|x−a| = r</option>
          </ChoiceSelect>
        </label>
      </div>
      <svg
        className="math093-svg"
        viewBox="0 0 500 200"
        role="img"
        aria-label={`Sayı doğrusu; merkez ${a}, nokta ${x}, sınır ${r}, uzaklık ${result.distance}`}
      >
        <line x1="25" y1="110" x2="475" y2="110" className="m093-axis" />
        {mode === "closed" || mode === "inside" ? (
          r > 0 && (
            <line
              x1={pos(a - r)}
              y1="110"
              x2={pos(a + r)}
              y2="110"
              className="m093-region"
            />
          )
        ) : mode === "outside" ? (
          <>
            <line
              x1="25"
              y1="110"
              x2={pos(a - r)}
              y2="110"
              className="m093-region"
            />
            <line
              x1={pos(a + r)}
              y1="110"
              x2="475"
              y2="110"
              className="m093-region"
            />
          </>
        ) : null}
        {allowed.map((n) => (
          <g key={n}>
            <line
              x1={pos(n)}
              x2={pos(n)}
              y1="105"
              y2="115"
              className="m093-axis"
            />
            {n % 2 === 0 && (
              <text x={pos(n)} y="143" textAnchor="middle">
                {n}
              </text>
            )}
          </g>
        ))}
        {[...new Set([a - r, a + r])].map((edge) => (
          <circle
            key={edge}
            cx={pos(edge)}
            cy="110"
            r="6"
            className={
              mode === "closed" || mode === "equal"
                ? "m093-edge filled"
                : "m093-edge"
            }
          />
        ))}
        <path
          d={`M ${pos(a)} 85 V 55 H ${pos(x)} V 85`}
          className="m093-distance"
        />
        <path d={`M ${pos(a)} 154 V 123`} className="m093-guide" />
        <circle cx={pos(a)} cy="164" r="5" className="m093-center" />
        <text x={pos(a)} y="190" textAnchor="middle">
          merkez
        </text>
        <circle cx={pos(x)} cy="85" r="8" className="m093-point" />
        <text x={(pos(a) + pos(x)) / 2} y="40" textAnchor="middle">
          {result.distance} birim
        </text>
      </svg>
      <div className="math093-result" data-model-result>
        <p>
          <strong>
            |{x} − ({a})| = {result.distance} birim.
          </strong>
        </p>
        <p>
          Koşul: |x−({a})| {sign} {r}.{" "}
          <strong>
            {result.member
              ? "Seçilen nokta koşulu sağlar."
              : "Seçilen nokta koşulu sağlamaz."}
          </strong>
        </p>
        <p>
          Uçlar: {a - r} ve {a + r}.{" "}
          {mode === "closed"
            ? "Uçlar dâhil, iç bölge seçilir."
            : mode === "inside"
              ? r === 0
                ? "Sıfırdan küçük uzaklık olamaz; çözüm yok."
                : "Uçlar hariç, iç bölge seçilir."
              : mode === "outside"
                ? "Uçlar hariç, iki dış bölge seçilir."
                : r === 0
                  ? "İki uç aynı merkez noktasına birleşir."
                  : "Yalnız iki sınır noktası seçilir."}
        </p>
      </div>
      <Prediction
        options={[
          ["yes", "Koşulu sağlar"],
          ["no", "Koşulu sağlamaz"],
        ]}
        guess={s.guess}
        checked={s.checked}
        expected={result.member ? "yes" : "no"}
        reason={`Yönlü fark ${x - a}, uzaklık ${result.distance}. ${result.distance} ${sign} ${r} karşılaştırması ${result.member ? "doğrudur" : "yanlıştır"}; ${mode === "closed" || mode === "equal" ? "eşitlik sınırları dâhil eder" : "sıkı eşitsizlik sınırları dışarıda bırakır"}.`}
        choose={(guess) => set({ guess, checked: false })}
        check={() => set({ checked: true })}
      />
    </>
  );
}

function ExponentLab() {
  const [s, set] = useExploration("forge093-math-exponents", {
    base: -2,
    exponent: 4,
    grouped: true,
    guess: "",
    checked: false,
  });
  const base = bounded(s.base, -3, 3),
    exponent = bounded(s.exponent, -3, 5);
  const result = integerPower(base, exponent, s.grouped);
  const expected =
    result === null
      ? "undefined"
      : result === 0
        ? "zero"
        : result > 0
          ? "positive"
          : "negative";
  const expression = s.grouped
    ? `(${base})^(${exponent})`
    : base < 0
      ? `−${Math.abs(base)}^(${exponent})`
      : `${base}^(${exponent})`;
  const factors = Math.abs(exponent);
  const factor = s.grouped ? `(${base})` : String(Math.abs(base));
  return (
    <>
      <p>
        Parantezin kapsamını, tam sayı üssünü ve sıfır tabanını birlikte
        değiştir. Çarpan kutuları pozitif üste çarpımı, negatif üste paydadaki
        çarpımı gösterir.
      </p>
      <div className="math093-controls">
        <Range
          label="Taban"
          value={base}
          min={-3}
          max={3}
          onChange={(base) => set({ base, checked: false })}
        />
        <Range
          label="Tam sayı üs"
          value={exponent}
          min={-3}
          max={5}
          onChange={(exponent) => set({ exponent, checked: false })}
        />
        <label className="math093-checkbox">
          <input
            type="checkbox"
            checked={s.grouped}
            onChange={(e) => set({ grouped: e.target.checked, checked: false })}
          />
          Eksi işaretini tabanın parantezine al
        </label>
      </div>
      <svg
        className="math093-svg"
        viewBox="0 0 500 200"
        role="img"
        aria-label={`${expression}; ${result === null ? "tanımsız" : number(result)}. ${exponent < 0 ? "Ters alma" : "Tekrarlanan çarpım"} modeli.`}
      >
        {result === null ? (
          <>
            <path
              d="M 185 40 L 315 160 M 315 40 L 185 160"
              className="m093-invalid"
            />
            <text x="250" y="190" textAnchor="middle">
              Tanımsız
            </text>
          </>
        ) : exponent === 0 ? (
          <>
            <circle cx="250" cy="95" r="53" className="m093-box" />
            <text x="250" y="105" textAnchor="middle">
              {number(result)}
            </text>
          </>
        ) : (
          <>
            {exponent < 0 && (
              <>
                <text x="250" y="42" textAnchor="middle">
                  {!s.grouped && base < 0 ? "−1" : "1"}
                </text>
                <line x1="28" x2="472" y1="58" y2="58" className="m093-axis" />
              </>
            )}
            {Array.from({ length: factors }, (_, i) => (
              <g key={i}>
                <rect
                  x={35 + (i * 440) / factors}
                  y="80"
                  width={360 / factors}
                  height="55"
                  rx="8"
                  className="m093-box"
                />
                <text
                  x={35 + (i * 440) / factors + 180 / factors}
                  y="114"
                  textAnchor="middle"
                >
                  {factor}
                </text>
                {i < factors - 1 && (
                  <text
                    x={35 + (i * 440) / factors + 400 / factors}
                    y="114"
                    textAnchor="middle"
                  >
                    ×
                  </text>
                )}
              </g>
            ))}
            <text x="250" y="175" textAnchor="middle">
              {exponent < 0
                ? "Paydadaki çarpımın tersi"
                : !s.grouped && base < 0
                  ? "Önce kuvvet, sonra baştaki eksi"
                  : "Aynı tabanın çarpanları"}
            </text>
          </>
        )}
      </svg>
      <div className="math093-result" data-model-result>
        <p>
          <strong>
            {expression} = {result === null ? "tanımsız" : number(result)}.
          </strong>
        </p>
        <p>
          {result === null
            ? "Sıfırın negatif kuvveti bölmeyi sıfır paydada bırakır; 0⁰ da bu dersin temel sayı hesabında tanımlanmaz."
            : exponent === 0
              ? base < 0 && !s.grouped
                ? "Önce pozitif büyüklüğün sıfırıncı kuvveti 1 bulunur; dıştaki eksi korunur ve sonuç −1 olur."
                : "Taban sıfırdan farklı; sıfırıncı kuvvet 1'dir."
              : exponent < 0
                ? `Negatif üs, çarpımın tersini aldırır: ${!s.grouped && base < 0 ? "−" : ""}1 / (${Array.from({ length: factors }, () => factor).join(" · ")}).`
                : `${!s.grouped && base < 0 ? "−(" : ""}${Array.from({ length: factors }, () => factor).join(" · ")}${!s.grouped && base < 0 ? ")" : ""}.`}
        </p>
      </div>
      <Prediction
        options={[
          ["positive", "Pozitif"],
          ["negative", "Negatif"],
          ["zero", "Sıfır"],
          ["undefined", "Tanımsız"],
        ]}
        guess={s.guess}
        checked={s.checked}
        expected={expected}
        reason={
          result === null
            ? "Önce tanım koşulu gelir; sıfır tabanda negatif veya sıfır üs bu örnekte sayı üretmez."
            : base < 0 && !s.grouped
              ? "Parantez kaldırılınca üs yalnız pozitif büyüklüğe uygulanır; baştaki eksi en son gelir."
              : `Üs ${exponent}; ${exponent === 0 ? "sıfırdan farklı tabanda sonuç 1" : base < 0 ? "negatif tabanda tam üssün tek–çiftliği işareti belirler; negatif üs yalnız ters alır" : base === 0 ? "pozitif tam kuvvette sıfır sonuç verir" : "pozitif tabanın tanımlı kuvveti pozitiftir"}.`
        }
        choose={(guess) => set({ guess, checked: false })}
        check={() => set({ checked: true })}
      />
    </>
  );
}

const scienceExamples = [
  {
    id: "large",
    title: "Büyük katsayı · 84×10⁻⁵",
    coefficient: 84,
    exponent: -5,
  },
  {
    id: "small",
    title: "Küçük katsayı · 0,072×10⁶",
    coefficient: 0.072,
    exponent: 6,
  },
  {
    id: "negative",
    title: "Negatif sayı · −32×10⁻³",
    coefficient: -32,
    exponent: -3,
  },
  { id: "zero", title: "Sıfır sınırı · 0×10³", coefficient: 0, exponent: 3 },
];
function ScientificLab() {
  const [s, set] = useExploration("forge093-math-scientific", {
    example: "large",
    shift: 0,
    guess: "",
    checked: false,
  });
  const example =
    scienceExamples.find((e) => e.id === s.example) ?? scienceExamples[0];
  const shift = bounded(s.shift, -4, 4);
  const coefficient = example.coefficient / 10 ** shift,
    exponent = example.exponent + shift;
  const normalized = normalizeScientific(example.coefficient, example.exponent);
  const standard = Math.abs(coefficient) >= 1 && Math.abs(coefficient) < 10;
  const expected =
    normalized === null ? "zero" : standard ? "standard" : "nonstandard";
  const logPosition = (n: number) => 250 + n * 21;
  return (
    <>
      <p>
        Katsayıyı değiştirirken üssü ters yönde değiştir ve sayıyı koru. İki
        satırdaki noktalar katsayının10 tabanındaki büyüklüğünü ve üssü ayrı
        gösterir; eşit aralıklar on katlık değişimdir.
      </p>
      <label className="field">
        Sayı örneği
        <ChoiceSelect
          value={example.id}
          onChange={(e) =>
            set({
              example: e.target.value,
              shift: 0,
              checked: false,
              guess: "",
            })
          }
        >
          {scienceExamples.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title}
            </option>
          ))}
        </ChoiceSelect>
      </label>
      <div className="math093-actions">
        <button
          className="button secondary"
          disabled={shift >= 4}
          onClick={() => set({ shift: shift + 1, checked: false })}
        >
          Katsayıyı 10'a böl
        </button>
        <button
          className="button secondary"
          disabled={shift <= -4}
          onClick={() => set({ shift: shift - 1, checked: false })}
        >
          Katsayıyı 10 ile çarp
        </button>
      </div>
      <svg
        className="math093-svg"
        viewBox="0 0 500 230"
        role="img"
        aria-label={`Değeri koruyan ölçek dönüşümü: katsayı ${number(coefficient)}, üs ${exponent}`}
      >
        {[75, 170].map((y, row) => (
          <g key={y}>
            <text x="25" y={y - 28}>
              {row === 0 ? "Katsayının mutlak büyüklüğü" : "10'un üssü"}
            </text>
            <line x1="35" y1={y} x2="465" y2={y} className="m093-axis" />
            {[-10, -5, 0, 5, 10].map((n) => (
              <g key={n}>
                <line
                  x1={logPosition(n)}
                  x2={logPosition(n)}
                  y1={y - 5}
                  y2={y + 5}
                  className="m093-axis"
                />
                <text x={logPosition(n)} y={y + 27} textAnchor="middle">
                  {row === 0 ? `10^${n}` : n}
                </text>
              </g>
            ))}
          </g>
        ))}
        {coefficient !== 0 && (
          <circle
            cx={logPosition(Math.log10(Math.abs(coefficient)))}
            cy="75"
            r="8"
            className="m093-point"
          />
        )}
        <circle
          cx={logPosition(exponent)}
          cy="170"
          r="8"
          className="m093-center"
        />
        {coefficient === 0 && (
          <text x="250" y="75" textAnchor="middle">
            0 için logaritmik nokta yok
          </text>
        )}
      </svg>
      <div className="math093-result" data-model-result>
        <p>
          <strong>
            {number(coefficient)} × 10^{exponent} ={" "}
            {normalized === null ? "0" : number(normalized.value)}.
          </strong>
        </p>
        <p>
          {normalized === null
            ? "Sıfır, bu standart bilimsel gösterimin sıfırdan farklı sayı tanımının dışındadır."
            : standard
              ? "Katsayı koşulu sağlanıyor:1≤|a|<10. Standart bilimsel gösterime ulaştın."
              : "Aynı sayı korunuyor; katsayı hâlâ standart aralığın dışında."}
        </p>
        <p>
          Değişim adımı: {shift}. Bir adımda katsayı÷10 ve ölçek×10 dengelenir.
        </p>
      </div>
      <Prediction
        options={[
          ["standard", "Standart bilimsel gösterim"],
          ["nonstandard", "Değer doğru, katsayı standart değil"],
          ["zero", "Sıfır, standart tanımın dışında"],
        ]}
        guess={s.guess}
        checked={s.checked}
        expected={expected}
        reason={
          normalized
            ? `Doğru standart biçim ${number(normalized.coefficient)}×10^${normalized.exponent}. İşaret korunur; katsayı değişimi üsle dengelenir ve olağan değer ${number(normalized.value)} kalır.`
            : "Katsayı 0 iken 1≤|a|<10 sağlanamaz; üssü değiştirmek sıfıra standart katsayı kazandırmaz."
        }
        choose={(guess) => set({ guess, checked: false })}
        check={() => set({ checked: true })}
      />
    </>
  );
}

function RootsLab() {
  const [s, set] = useExploration("forge093-math-roots", {
    mode: "area",
    n: 72,
    x: -6,
    guess: "",
    checked: false,
  });
  const mode = ["area", "square", "domain"].includes(s.mode) ? s.mode : "area";
  const x = bounded(s.x, -10, 10),
    n = mode === "square" ? x * x : bounded(s.n, -16, 100);
  const result = simplifySquareRoot(n);
  const side = result ? result.value * 21 : 0;
  const exact = result
    ? result.inside === 1
      ? String(result.outside)
      : `${result.outside === 1 ? "" : result.outside}√${result.inside}`
    : "gerçek sayılarda tanımsız";
  return (
    <>
      <p>
        Alanı kenara dönüştür; sonra negatif işaretli bir sayının karesinden
        neden mutlak değer döndüğünü incele. Tanım denetiminde negatif kök içi
        seçerek modelin gerçek sayı sınırını gör.
      </p>
      <div className="math093-controls">
        <label className="field">
          Kök modeli
          <ChoiceSelect
            value={mode}
            onChange={(e) => set({ mode: e.target.value, checked: false })}
          >
            <option value="area">Alan → kenar</option>
            <option value="square">√(x²) → |x|</option>
            <option value="domain">Gerçek kök tanımı</option>
          </ChoiceSelect>
        </label>
        {mode === "square" ? (
          <Range
            label="İşaretli x"
            value={x}
            min={-10}
            max={10}
            onChange={(x) => set({ x, checked: false })}
          />
        ) : (
          <Range
            label="Kök içi / alan"
            value={n}
            min={-16}
            max={100}
            onChange={(n) => set({ n, checked: false })}
          />
        )}
      </div>
      <svg
        className="math093-svg"
        viewBox="0 0 500 300"
        role="img"
        aria-label={
          result
            ? `Alan ${n}, negatif olmayan kenar ${exact}. Kare görüntüsü alanın kareköküne göre ölçeklenir.`
            : "Negatif kök içi gerçek bir kare kenarı veya alan modeli üretmez."
        }
      >
        {result ? (
          <>
            <rect
              x={250 - side / 2}
              y={140 - side / 2}
              width={side}
              height={side}
              className="m093-area"
            />
            {side > 0 && (
              <>
                <line
                  x1={250 - side / 2}
                  x2={250 + side / 2}
                  y1={155 + side / 2}
                  y2={155 + side / 2}
                  className="m093-distance"
                />
                <text x="250" y={182 + side / 2} textAnchor="middle">
                  {exact} birim
                </text>
              </>
            )}
            <text x="250" y="145" textAnchor="middle">
              {n} birim²
            </text>
          </>
        ) : (
          <>
            <path
              d="M 190 65 L 310 190 M 310 65 L 190 190"
              className="m093-invalid"
            />
            <text x="250" y="245" textAnchor="middle">
              Gerçek kare modeli yok
            </text>
          </>
        )}
      </svg>
      <div className="math093-result" data-model-result>
        <p>
          <strong>
            {mode === "square"
              ? `√((${x})²)=√${n}=${exact}=|${x}|`
              : `√${n} = ${exact}`}
            .
          </strong>
        </p>
        <p>
          {result
            ? `Esas değer ${number(result.value)}; negatif değil. ${result.outside}² × ${result.inside} = ${n}.`
            : "Çift dereceli gerçek kök için iç ≥0 gerekir; negatif alanlı gerçek bir kare çizilmez."}
        </p>
        <p>
          {mode === "square"
            ? `${x < 0 ? "İşaretli x negatiftir ama geometrik kenar pozitiftir; karekök x'i değil |x|'i verir." : "x≥0 olduğu için |x|=x."}`
            : result
              ? "x²=alan denkleminin negatif kökü, geometrik kenar uzunluğu olarak seçilmez."
              : "Bu durum karmaşık sayı öğretimi değildir; çalışma alanımız gerçek sayılardır."}
        </p>
      </div>
      <Prediction
        options={[
          ["valid", "Negatif olmayan gerçek esas kök var"],
          ["invalid", "Gerçek karekök yok"],
        ]}
        guess={s.guess}
        checked={s.checked}
        expected={result ? "valid" : "invalid"}
        reason={
          result
            ? `Kök içi ${n}≥0. Sonucun karesi${n}'dir; esas kök eksi veya± işareti almaz. ${mode === "square" ? "İşaret geri gelmez; sonuç |x| olur." : "Alan dört kat olursa kenar iki kat olur."}`
            : `${n}<0; gerçek bir sayının karesi negatif olamaz. Tek dereceli köklerdeki negatif iç kuralını kareköke taşıma.`
        }
        choose={(guess) => set({ guess, checked: false })}
        check={() => set({ checked: true })}
      />
      <RadicalsSource015RootLab />
    </>
  );
}

function RatioLab() {
  const [s, set] = useExploration("forge093-math-ratio", {
    mode: "direct",
    x: 3,
    k: 6,
    fee: 6,
    guess: "",
    checked: false,
  });
  const mode = ["direct", "inverse", "affine"].includes(s.mode)
    ? s.mode
    : "direct";
  const x = bounded(s.x, 1, 12),
    k = bounded(s.k, 1, 12),
    fee = bounded(s.fee, 1, 12);
  const y = proportionValue(mode, x, k, fee)!;
  const maximum =
    mode === "inverse" ? k : k * 12 + (mode === "affine" ? fee : 0);
  const px = (x: number) => 45 + x * 34,
    py = (y: number) => 245 - (y / maximum) * 200;
  const samples = Array.from({ length: 121 }, (_, i) => {
    const xx = mode === "inverse" ? 1 + (i * 11) / 120 : i / 10;
    return [xx, proportionValue(mode, xx, k, fee)!];
  });
  const expected =
    mode === "direct" ? "quotient" : mode === "inverse" ? "product" : "neither";
  return (
    <>
      <GoldenRatioSource016Lab />
      <p>
        Üç ilişkiyi aynı soruyla dene: x değişirken hangi ifade sabit kalıyor?
        Doğru orantıda bölüm, ters orantıda çarpım; sabit eklenen modelde ikisi
        de genel olarak değişir. x ve y burada pozitif, birimsiz çokluklardır.
      </p>
      <div className="math093-controls">
        <label className="field">
          Orantı modeli
          <ChoiceSelect
            value={mode}
            onChange={(e) => set({ mode: e.target.value, checked: false })}
          >
            <option value="direct">Doğru · y=kx</option>
            <option value="inverse">Ters · y=k/x</option>
            <option value="affine">Sabit eklenen · y=kx+b</option>
          </ChoiceSelect>
        </label>
        <Range
          label="Seçilen x"
          value={x}
          min={1}
          max={12}
          onChange={(x) => set({ x, checked: false })}
        />
        <Range
          label="k sabiti"
          value={k}
          min={1}
          max={12}
          onChange={(k) => set({ k, checked: false })}
        />
        {mode === "affine" && (
          <Range
            label="Sabit eklenen b"
            value={fee}
            min={1}
            max={12}
            onChange={(fee) => set({ fee, checked: false })}
          />
        )}
      </div>
      <svg
        className="math093-svg"
        viewBox="0 0 500 290"
        role="img"
        aria-label={`${mode === "direct" ? "Orijinden geçen doğru" : mode === "inverse" ? "Pozitif eksenlerde ters orantı eğrisi, x sıfırda tanımsız" : "Orijinden geçmeyen doğru"}; seçilen nokta (${x},${number(y)})`}
      >
        <path d="M 45 25 V 245 H 470" className="m093-axis" />
        <text x="473" y="267">
          x
        </text>
        <text x="20" y="26">
          y
        </text>
        <text x="31" y="264">
          0
        </text>
        <text x="453" y="267" textAnchor="end">
          12
        </text>
        <text x="22" y="47">
          {maximum}
        </text>
        <polyline
          points={samples.map(([xx, yy]) => `${px(xx)},${py(yy)}`).join(" ")}
          className="m093-curve"
        />
        <path d={`M ${px(x)} 245 V ${py(y)} H 45`} className="m093-guide" />
        <circle cx={px(x)} cy={py(y)} r="8" className="m093-point" />
      </svg>
      <div className="math093-result" data-model-result>
        <p>
          <strong>
            x={x}, y={number(y)}.
          </strong>{" "}
          {mode === "direct"
            ? `y=${k}x`
            : mode === "inverse"
              ? `y=${k}/x; x≠0`
              : `y=${k}x+${fee}`}
        </p>
        <p>
          y/x = <strong>{number(y / x)}</strong>; x·y ={" "}
          <strong>{number(x * y)}</strong>.
        </p>
        <p>
          {mode === "direct"
            ? `Sabit bölüm y/x=${k}.`
            : mode === "inverse"
              ? `Sabit çarpım x·y=${k}.`
              : `Sabit fark y−${k}x=${fee}; y/x ve x·y sabit değil.`}
        </p>
      </div>
      <div
        className="math093-samples"
        aria-label="İki durumda sabitlik denetimi"
      >
        {[2, 4].map((xx) => {
          const yy = proportionValue(mode, xx, k, fee)!;
          return (
            <p key={xx}>
              x={xx}: y={number(yy)}, y/x={number(yy / xx)}, x·y=
              {number(xx * yy)}
            </p>
          );
        })}
      </div>
      <Prediction
        options={[
          ["quotient", "y/x bölümü sabit"],
          ["product", "x·y çarpımı sabit"],
          ["neither", "Bu ikisinden hiçbiri sabit değil"],
        ]}
        guess={s.guess}
        checked={s.checked}
        expected={expected}
        reason={
          mode === "direct"
            ? `x iki katına çıkınca y de iki katına çıkar; y/x=${k} korunur. Bu modelde sabit ek ücret yoktur.`
            : mode === "inverse"
              ? `x iki katına çıkınca y yarıya iner; x·y=${k} korunur. x=0 modelin dışında kalır.`
              : `Artan bir doğru görmek doğru orantı kanıtı değildir. y/x=${k}+${fee}/x değişir; grafik başlangıçta${fee} verir ve orijinden geçmez.`
        }
        choose={(guess) => set({ guess, checked: false })}
        check={() => set({ checked: true })}
      />
    </>
  );
}

const titles: Record<string, string> = {
  "mutlak-deger": "Uzaklık ve çözüm aralığı",
  "uslu-sayilar": "Üs ve parantez atölyesi",
  "bilimsel-gosterim-katsayi": "Değeri koruyan ölçek atölyesi",
  "koklu-sayilar": "Kare alanından esas köke",
  "oran-oranti": "Sabit bölüm mü, sabit çarpım mı?",
};
export default function Forge093MathLab({ id }: { id: string }) {
  const uid = useId();
  if (!titles[id]) return null;
  return (
    <section
      className="visual-lab forge093-math-lab"
      data-forge093={id}
      aria-labelledby={`${uid}-title`}
    >
      <div className="lab-heading">
        <h2 id={`${uid}-title`}>{titles[id]}</h2>
      </div>
      {id === "mutlak-deger" ? (
        <AbsoluteLab />
      ) : id === "uslu-sayilar" ? (
        <ExponentLab />
      ) : id === "bilimsel-gosterim-katsayi" ? (
        <ScientificLab />
      ) : id === "koklu-sayilar" ? (
        <RootsLab />
      ) : (
        <RatioLab />
      )}
      <p className="math093-limit">
        Bu keşifte seçimler bu cihazda saklanır. Tahmin ve model kullanımı soru
        puanı, ustalık veya konu tamamlanma kaydı oluşturmaz. Görseldeki temel
        sayımlar normal metinde de açıklanır.
      </p>
    </section>
  );
}
