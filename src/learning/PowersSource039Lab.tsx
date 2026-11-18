import { useId, type ReactNode } from "react";
import { usePower039State } from "./usePower039State";
import {
  power039Fraction as F,
  power039Format as format,
  power039Scalar as scalar,
  power039Anatomy,
  power039Laws,
  power039SameExponent,
  power039CommonFactor,
  power039PrimeSubstitution,
  power039Equation,
  power039Comparison,
  power039ScientificInput,
  power039ScientificOperation,
  power039LogPoint,
  power039RationalPower,
  power039NestedRational,
  power039Growth,
  power039Multiply,
  type Power039Fraction,
  type Power039Result,
} from "./powersSource039Model";
import "./PowersSource039Lab.css";

const modes = [
  ["anatomy", "Çarpan ve işaret"],
  ["laws", "Aynı taban"],
  ["same", "Aynı üs"],
  ["factor", "Ortak çarpan"],
  ["prime", "Verilen kuvvet"],
  ["equation", "Denklem"],
  ["compare", "Karşılaştırma"],
  ["scientific", "Bilimsel ölçek"],
  ["rational", "Kesirli üs"],
  ["growth", "Adım ve süreç"],
] as const;
type Mode = (typeof modes)[number][0];
const fmt = (value: Power039Fraction) => format(value).replaceAll("-", "−");
const result = (value: Power039Result) =>
  value.ok ? fmt(value.value) : value.reason;
const scientificText = (value: ReturnType<typeof power039ScientificInput>) =>
  !value.ok
    ? value.reason
    : value.normalized.kind === "zero"
      ? value.normalized.reason
      : `${fmt(value.normalized.coefficient)} × 10^(${value.normalized.exponent})`;
const rationalText = (value: {
  kind: string;
  value?: Power039Fraction;
  reason?: string;
}) =>
  value.kind === "exact" && value.value
    ? fmt(value.value)
    : (value.reason ?? "Bu girdide sonuç üretilemedi.");
const nodeValue039 = (value: Power039Fraction) =>
  fmt(value).length <= 5 ? fmt(value) : value.n < 0n ? "<0" : ">0";
const rationalNode039 = (value: { kind: string; value?: Power039Fraction }) =>
  value.kind === "exact" && value.value
    ? nodeValue039(value.value)
    : value.kind === "irrational"
      ? "√"
      : value.kind === "not-real"
        ? "∉ℝ"
        : "!";

function Range({
  label,
  value,
  set,
  min,
  max,
  suffix = "",
  display,
}: {
  label: string;
  value: number;
  set: (value: number) => void;
  min: number;
  max: number;
  suffix?: string;
  display?: string;
}) {
  const id = useId();
  return (
    <label className="f039-control" htmlFor={id}>
      <span>
        {label}{" "}
        <output>
          {display ?? value}
          {suffix}
        </output>
      </span>
      <input
        id={id}
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        aria-valuetext={display ? `${display}${suffix}` : undefined}
        onChange={(event) => set(Number(event.target.value))}
      />
    </label>
  );
}
function Choices({
  label,
  value,
  set,
  choices,
}: {
  label: string;
  value: string;
  set: (value: string) => void;
  choices: readonly (readonly [value: string, label: string])[];
}) {
  return (
    <fieldset className="f039-choices">
      <legend>{label}</legend>
      <div className="f039-choice-buttons">
        {choices.map(([key, text]) => (
          <button
            className="f039-button"
            type="button"
            key={key}
            aria-pressed={value === key}
            onClick={() => set(key)}
          >
            {text}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
function Figure({
  title,
  description,
  children,
  viewBox = "0 0 640 240",
}: {
  title: string;
  description: string;
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <figure className="f039-figure">
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        {children}
      </svg>
      <figcaption>
        <strong>{title}</strong>
        <p>{description}</p>
      </figcaption>
    </figure>
  );
}
function Facts({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="f039-facts">
      {rows.map(([name, value]) => (
        <div key={name}>
          <dt>{name}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
function Note({ children }: { children: ReactNode }) {
  return <p className="f039-note">{children}</p>;
}
function Dots({
  count,
  y,
  negative,
  className = "f039-a",
}: {
  count: number;
  y: number;
  negative?: boolean;
  className?: string;
}) {
  const n = Math.min(12, count),
    width = 544 / Math.max(1, n),
    radius = Math.min(21, width * 0.32);
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <circle
          key={i}
          className={`${negative ? "f039-negative" : className}`}
          cx={48 + width * (i + 0.5)}
          cy={y}
          r={radius}
        />
      ))}
    </>
  );
}
function Magnitudes({ a, b }: { a: Power039Fraction; b: Power039Fraction }) {
  const left = scalar(a),
    right = scalar(b),
    maximum = Math.max(Math.abs(left), Math.abs(right)) || 1;
  const width = (n: number) => (Math.abs(n) / maximum) * 250;
  return (
    <>
      <path className="f039-axis" d="M320 20V220" />
      <rect
        className="f039-a"
        x={left < 0 ? 320 - width(left) : 320}
        y={64}
        width={width(left)}
        height={36}
        rx={7}
      />
      <rect
        className="f039-b"
        x={right < 0 ? 320 - width(right) : 320}
        y={140}
        width={width(right)}
        height={36}
        rx={7}
      />
      <circle className="f039-zero" cx={320} cy={220} r={5} />
    </>
  );
}

function Anatomy() {
  const [base, setBase] = usePower039State("Anatomy.base", -2),
    [exponent, setExponent] = usePower039State("Anatomy.exponent", 4),
    [outside, setOutside] = usePower039State("Anatomy.outside", false);
  const model = power039Anatomy(base, exponent, outside),
    grouped = power039Anatomy(base, exponent, false);
  const factors = model.factors.map((x) => `(${x})`).join(" · ");
  return (
    <>
      <div className="f039-controls">
        <Range label="Taban" value={base} set={setBase} min={-5} max={5} />
        <Range
          label="Tam sayı üs"
          value={exponent}
          set={setExponent}
          min={-6}
          max={8}
        />
        <label className="f039-check">
          <input
            type="checkbox"
            checked={outside}
            onChange={(event) => setOutside(event.target.checked)}
          />
          Kuvvetin dışına eksi ekle
        </label>
      </div>
      <Figure
        title="Çarpanlar ve işlem sınırı"
        description={
          exponent > 0
            ? `${exponent} ayrı çarpan: ${factors}. Her daire seçilen tabanı bir kez temsil eder.`
            : exponent === 0
              ? "Pozitif çarpan sayma gösterimi burada biter; sıfır üs ve sıfır taban koşulu ayrıca denetlenir."
              : `Negatif üs karşılık aldırır: 1 / (${base})^(${Math.abs(exponent)}). Daireler paydadaki çarpanları gösterir.`
        }
      >
        <Dots count={Math.abs(exponent)} y={110} negative={base < 0} />
        {exponent < 0 && <path className="f039-axis" d="M36 58H604" />}
        {outside && <path className="f039-minus" d="M280 194H360" />}
      </Figure>
      <Facts
        rows={[
          ["İfade", model.expression],
          ["Sonuç", result(model.result)],
          ["Dış eksisiz kuvvet", result(grouped.result)],
          ["Üssün çiftliği", `${model.parity}; yalnız tam sayı üs kapsamında`],
        ]}
      />
      <Note>
        −2^4, tabanı +2 ve dış eksiyi seçtiğinde −16 verir. (−2)^4 için tabanı
        −2 seç ve dış eksiyi kapat: +16. 0^0 bu ünitede tanımlı değildir;
        sıfırın negatif kuvveti sıfıra bölme gerektirir.
      </Note>
    </>
  );
}
function Laws() {
  const [base, setBase] = usePower039State("Laws.base", 2),
    [m, setM] = usePower039State("Laws.m", 3),
    [n, setN] = usePower039State("Laws.n", 4);
  const model = power039Laws(F(base), m, n);
  return (
    <>
      <div className="f039-controls">
        <Range
          label="Ortak taban a"
          value={base}
          set={setBase}
          min={-3}
          max={3}
        />
        <Range label="İlk üs m" value={m} set={setM} min={-4} max={5} />
        <Range label="İkinci üs n" value={n} set={setN} min={-4} max={5} />
      </div>
      <Figure
        title="İki ayrı kuvvet"
        description={`Üst sırada |m|=${Math.abs(m)}, alt sırada |n|=${Math.abs(n)} çarpan var. Negatif üs varsa o sıra karşılıkta, yani paydada okunur; sıfır üs bir çarpan sırası değildir.`}
      >
        <Dots count={Math.abs(m)} y={72} negative={base < 0} />
        <Dots
          count={Math.abs(n)}
          y={168}
          className="f039-b"
          negative={base < 0}
        />
        <path className="f039-guide" d="M36 120H604" />
      </Figure>
      <Facts
        rows={[
          [
            `a^m · a^n → a^(${m + n})`,
            `${result(model.product)}; ${model.productLawApplicable ? "iki yol aynı" : "bu girdide yasa uygulanamaz"}`,
          ],
          [
            `a^m / a^n → a^(${m - n})`,
            `${result(model.quotient)}; ${model.quotientLawApplicable ? "iki yol aynı" : "bu girdide yasa uygulanamaz"}`,
          ],
          [
            `(a^m)^n → a^(${m * n})`,
            `${result(model.nested)}; ${model.nestedLawApplicable ? "iki yol aynı" : "bu girdide yasa uygulanamaz"}`,
          ],
          ["a^m + a^n: toplama ayrı hesaplanır", result(model.sum)],
        ]}
      />
      <Note>
        Çarpma, bölme, dış kuvvet ve toplama dört ayrı işlemdir. Toplamın bir
        özel girdide çarpımla aynı çıkması genel yasa kanıtı değildir. Bölümde
        ortak taban sıfır olamaz; gösterilen tam sayı üs kurallarında her iki
        taraf da tanımlı olmalıdır.
      </Note>
    </>
  );
}
function Same() {
  const [a, setA] = usePower039State("Same.a", 2),
    [b, setB] = usePower039State("Same.b", 5),
    [n, setN] = usePower039State("Same.n", 3);
  const model = power039SameExponent(F(a), F(b), n),
    count = Math.abs(n);
  return (
    <>
      <div className="f039-controls">
        <Range label="İlk taban a" value={a} set={setA} min={-5} max={5} />
        <Range label="İkinci taban b" value={b} set={setB} min={-5} max={5} />
        <Range
          label="Ortak tam sayı üs"
          value={n}
          set={setN}
          min={-4}
          max={5}
        />
      </div>
      <Figure
        title="Her grupta bir a ve bir b"
        description={`${count} grup; her gruptaki iki renk sırasıyla a=${a}, b=${b}. Negatif üs seçilirse çarpımın karşılığı alınır. Sıfır üsteki a veya b sıfırsa ifade tanımsızdır.`}
      >
        {Array.from({ length: count }, (_, i) => {
          const x = 48 + i * (544 / Math.max(1, count));
          return (
            <g key={i}>
              <rect
                className="f039-frame"
                x={x}
                y={56}
                width={Math.min(96, 520 / Math.max(1, count))}
                height={126}
                rx={14}
              />
              <circle className="f039-a" cx={x + 24} cy={96} r={15} />
              <circle className="f039-b" cx={x + 24} cy={146} r={15} />
            </g>
          );
        })}
      </Figure>
      <Facts
        rows={[
          ["a^n · b^n", result(model.product)],
          ["(a·b)^n", result(model.productShortcut)],
          [
            "Çarpım eşitliği",
            model.productLawApplicable
              ? String(model.productMatches ? "Sağlanıyor" : "Uyuşmazlık")
              : "Bu girdide tanımlı iki taraf yok",
          ],
          ["a^n / b^n", result(model.quotient)],
          ["(a/b)^n", result(model.quotientShortcut)],
        ]}
      />
      <Note>
        Tabanlar farklıysa üsler ortak olduğunda tabanlar birleştirilebilir.
        Üsler toplanmaz veya çarpılmaz. Bölümde b≠0; negatif üslerde gerekli
        diğer sıfır koşulları da korunur.
      </Note>
    </>
  );
}
function Factor() {
  const [base, setBase] = usePower039State("Factor.base", 5),
    [n, setN] = usePower039State("Factor.n", 2),
    [gap, setGap] = usePower039State("Factor.gap", 1),
    [c, setC] = usePower039State("Factor.c", -2),
    [d, setD] = usePower039State("Factor.d", 1);
  const model = power039CommonFactor(base, n, gap, c, d);
  return (
    <>
      <div className="f039-controls">
        <Range label="Taban a" value={base} set={setBase} min={1} max={5} />
        <Range label="Ortak üs n" value={n} set={setN} min={-2} max={4} />
        <Range
          label="İkinci üssün fazlası"
          value={gap}
          set={setGap}
          min={0}
          max={3}
        />
        <Range label="İlk katsayı c" value={c} set={setC} min={-4} max={5} />
        <Range label="İkinci katsayı d" value={d} set={setD} min={-4} max={5} />
      </div>
      {model.ok ? (
        <>
          <Figure
            title="İki işaretli terim"
            description={`Üst çubuk c·a^n=${fmt(power039Multiply(F(c), model.first))}, alt çubuk d·a^(n+fark)=${fmt(power039Multiply(F(d), model.later))}. Orta dik çizgi sıfır; eksi değer sola, artı değer sağa uzanır. Çubuklar aynı ölçeği kullanır.`}
          >
            <Magnitudes
              a={power039Multiply(F(c), model.first)}
              b={power039Multiply(F(d), model.later)}
            />
          </Figure>
          <Facts
            rows={[
              ["Başlangıç ifadesi", model.expression],
              [
                "Ortaklaştırılmış biçim",
                `(${base})^(${n}) · (${c} + (${d}) · (${base})^(${gap}))`,
              ],
              ["Parantezin katsayısı", fmt(model.coefficient)],
              ["Doğrudan toplam", fmt(model.expanded)],
              ["Ortak çarpandan sonuç", fmt(model.factored)],
            ]}
          />
        </>
      ) : (
        <Note>{model.reason}</Note>
      )}
      <Note>
        Üsleri toplamak yerine a^n’yi dışarı al:
        c·a^n+d·a^(n+fark)=a^n(c+d·a^fark). Burada model tabanı pozitif seçer;
        tanım alanı güvenle korunur. 5^(n+3)−2·5^(n+2) örneği için ortak üs
        n+2’dir.
      </Note>
    </>
  );
}
function Prime() {
  const [k, setK] = usePower039State("Prime.k", 1),
    [p, setP] = usePower039State("Prime.p", -1),
    [q, setQ] = usePower039State("Prime.q", 2),
    [r, setR] = usePower039State("Prime.r", -2);
  const model = power039PrimeSubstitution(k, p, q, r);
  return (
    <>
      <div className="f039-controls">
        <Range label="Ortak üs k" value={k} set={setK} min={-3} max={4} />
        <Range
          label="Tabandaki 2 çarpanının üssü"
          value={p}
          set={setP}
          min={-3}
          max={3}
        />
        <Range
          label="Tabandaki 3 çarpanının üssü"
          value={q}
          set={setQ}
          min={-3}
          max={3}
        />
        <Range
          label="Tabandaki 5 çarpanının üssü"
          value={r}
          set={setR}
          min={-3}
          max={3}
        />
      </div>
      {model.ok ? (
        <>
          <Figure
            title="Asal çarpandan verilen sembole"
            description={`A=2^k, B=3^k, C=5^k. Üstte ortak hedef, altta sırayla 2, 3, 5 dalları var. Her daldaki küçük işaret sayısı ilgili asalın üs büyüklüğüdür; negatif üs paydada okunur.`}
          >
            <circle className="f039-result" cx={320} cy={36} r={23} />
            {model.factors.map((factor, index) => {
              const x = 110 + index * 210;
              return (
                <g key={factor.prime}>
                  <path className="f039-guide" d={`M320 60Q320 96 ${x} 126`} />
                  <circle
                    className={factor.power < 0 ? "f039-negative" : "f039-a"}
                    cx={x}
                    cy={145}
                    r={27}
                  />
                  {Array.from({ length: Math.abs(factor.power) }, (_, i) => (
                    <rect
                      key={i}
                      className="f039-b"
                      x={x - 30 + i * 20}
                      y={200}
                      width={12}
                      height={12}
                      rx={3}
                    />
                  ))}
                </g>
              );
            })}
          </Figure>
          <Facts
            rows={[
              [
                "Verilenler",
                model.factors
                  .map(
                    (factor) =>
                      `${factor.symbol}=${factor.prime}^(${k})=${fmt(factor.given)}`,
                  )
                  .join("; "),
              ],
              [
                "Hedef taban",
                `2^(${p}) · 3^(${q}) · 5^(${r}) = ${fmt(model.targetBase)}`,
              ],
              ["Sembolik sonuç", model.symbolic],
              ["Doğrudan tabanın k kuvveti", fmt(model.direct)],
              ["Yerine koymadan elde edilen", fmt(model.substituted)],
            ]}
          />
        </>
      ) : (
        <Note>{model.reason}</Note>
      )}
      <Note>
        Varsayılan üsler −1,2,−2 ile hedef taban 9/50=0,18 olur; sonuç
        B²/(A·C²). Bütün asal tabanlar pozitif olduğu için ortak üs gerçek
        olduğunda da özdeşlik geçerlidir. Bu deneyde sayısal denetim için k tam
        sayı aralığında seçilir.
      </Note>
    </>
  );
}
function Equation() {
  const [base, setBase] = usePower039State("Equation.base", "2"),
    [a, setA] = usePower039State("Equation.a", 3),
    [b, setB] = usePower039State("Equation.b", -3),
    [c, setC] = usePower039State("Equation.c", 2),
    [d, setD] = usePower039State("Equation.d", 4);
  const taban = base === "half" ? F(1, 2) : F(Number(base));
  const model = power039Equation(taban, a, b, c, d),
    center = model.kind === "one" ? scalar(model.root) : 0;
  const xmin = center - 3,
    xmax = center + 3,
    samples = [xmin, xmax].flatMap((x) => [a * x + b, c * x + d]);
  const ymin = Math.min(...samples, 0) - 1,
    ymax = Math.max(...samples, 0) + 1;
  const x = (v: number) => 44 + ((v - xmin) / (xmax - xmin)) * 552,
    y = (v: number) => 204 - ((v - ymin) / (ymax - ymin)) * 168;
  return (
    <>
      <div className="f039-controls">
        <Choices
          label="Ortak taban"
          value={base}
          set={setBase}
          choices={[["half", "1/2"], ["1", "1"], ["2", "2"], ["3", "3"]]}
        />
        <Range
          label="Sol üste x katsayısı"
          value={a}
          set={setA}
          min={-3}
          max={3}
        />
        <Range label="Sol üstte sabit" value={b} set={setB} min={-4} max={4} />
        <Range
          label="Sağ üste x katsayısı"
          value={c}
          set={setC}
          min={-3}
          max={3}
        />
        <Range label="Sağ üstte sabit" value={d} set={setD} min={-4} max={4} />
      </div>
      <p className="f039-expression">
        ({fmt(taban)})^({a}x + ({b})) = ({fmt(taban)})^({c}x + ({d}))
      </p>
      {base !== "1" && (
        <Figure
          title="Kuvvet değerleri değil, iki üs çiziliyor"
          description={`Yatay aralık x=${xmin}…${xmax}. Dikey aralık üsteki değer için ${ymin}…${ymax}. İlk renk ${a}x+(${b}), ikinci renk ${c}x+(${d}). Uygun tabanda kuvvetler eşitse bu iki üs eşittir.`}
        >
          <path className="f039-axis" d={`M44 ${y(0)}H596`} />
          <path
            className="f039-line-a"
            d={`M${x(xmin)} ${y(a * xmin + b)}L${x(xmax)} ${y(a * xmax + b)}`}
          />
          <path
            className="f039-line-b"
            d={`M${x(xmin)} ${y(c * xmin + d)}L${x(xmax)} ${y(c * xmax + d)}`}
          />
          {model.kind === "one" && (
            <circle
              className="f039-result"
              cx={x(center)}
              cy={y(scalar(model.leftExponent))}
              r={9}
            />
          )}
        </Figure>
      )}
      <Facts
        rows={
          model.kind === "one"
            ? [
                ["Tek çözüm", `x=${fmt(model.root)}`],
                ["Sol üs", fmt(model.leftExponent)],
                ["Sağ üs", fmt(model.rightExponent)],
                [
                  "Özgün kuvvet eşitliği",
                  "Pozitif ve 1’den farklı aynı tabanda üsler eşit; kuvvetler de eşit.",
                ],
              ]
            : [
                [
                  "Çözüm durumu",
                  model.kind === "all"
                    ? "Bütün gerçek sayılar"
                    : model.kind === "none"
                      ? "Gerçek çözüm yok"
                      : "Bu modelde uygulanamaz",
                ],
                ["Gerekçe", model.reason],
              ]
        }
      />
      <Note>
        Üs eşitleme a&gt;0 ve a≠1 gerektirir. Taban 1 seçilince farklı üsler
        bile 1 verir; bu nedenle üslerin kesişimini çözüm koşulu diye
        göstermiyoruz. Negatif tabanlı denklemler ayrıca tanım alanı/çiftlik
        incelemesi ister.
      </Note>
    </>
  );
}
function Compare() {
  const [kind, setKind] = usePower039State("Compare.kind", "half"),
    [m, setM] = usePower039State("Compare.m", 4),
    [n, setN] = usePower039State("Compare.n", 7),
    [other, setOther] = usePower039State("Compare.other", false);
  const a = kind === "half" ? F(1, 2) : F(Number(kind)),
    b = other ? F(3) : a;
  const model = power039Comparison(a, m, b, n);
  return (
    <>
      <div className="f039-controls">
        <Choices
          label="İlk taban"
          value={kind}
          set={setKind}
          choices={[["half", "1/2"], ["1", "1"], ["2", "2"], ["-2", "−2"]]}
        />
        <Range label="İlk üs" value={m} set={setM} min={-4} max={8} />
        <Range label="İkinci üs" value={n} set={setN} min={-4} max={8} />
        <label className="f039-check">
          <input
            type="checkbox"
            checked={other}
            onChange={(event) => setOther(event.target.checked)}
          />
          İkinci tabanı 3 yap
        </label>
      </div>
      {model.ok ? (
        <>
          <Figure
            title="İşaretli değerler aynı ölçekte"
            description={`Üstte (${fmt(a)})^(${m})=${fmt(model.left)}, altta (${fmt(b)})^(${n})=${fmt(model.right)}. Sıfır ortadadır. Negatif çubuk sola, pozitif çubuk sağa uzanır; en büyük mutlak değer görünür yarı genişliği doldurur.`}
          >
            <Magnitudes a={model.left} b={model.right} />
          </Figure>
          <Facts
            rows={[
              [
                "Tam karşılaştırma",
                `${fmt(model.left)} ${model.order < 0 ? "<" : model.order > 0 ? ">" : "="} ${fmt(model.right)}`,
              ],
              ["İlk / ikinci oranı", result(model.quotient)],
              [
                "Pozitif oranla yorum",
                model.ratioRuleApplicable
                  ? "Oran 1’den büyükse ilk değer büyük; küçükse ilk değer küçük."
                  : "İki değer de pozitif değil; pozitiflere ait oran sıralama kuralını kullanma.",
              ],
            ]}
          />
        </>
      ) : (
        <Note>{model.reason}</Note>
      )}
      <Note>
        Aynı pozitif taban 1’den büyükse büyük üs büyük, 0 ile 1 arasındaysa
        büyük üs küçük değer verir. Taban 1’de eşittir. Negatif tabanda bu tek
        yönlü önerme geçerli değildir; değer ve işaret ayrı hesaplanır.
      </Note>
    </>
  );
}
function Scientific() {
  const [coefficient, setCoefficient] = usePower039State("Scientific.coefficient", 81),
    [exponent, setExponent] = usePower039State("Scientific.exponent", 8),
    [second, setSecond] = usePower039State("Scientific.second", 40),
    [otherExponent, setOtherExponent] = usePower039State("Scientific.otherExponent", 6),
    [operation, setOperation] = usePower039State("Scientific.operation", "single");
  const first = power039ScientificInput(F(coefficient, 10), exponent),
    other = power039ScientificInput(F(second, 10), otherExponent);
  const calculation =
    operation === "single"
      ? first
      : power039ScientificOperation(
          F(coefficient, 10),
          exponent,
          F(second, 10),
          otherExponent,
          operation as "add" | "multiply",
        );
  const normalized = calculation.ok ? calculation.normalized : null;
  const point = calculation.ok
    ? power039LogPoint(calculation.value, -8, 12, 640, 44)
    : null;
  return (
    <>
      <div className="f039-controls">
        <Range
          label="İlk katsayı"
          display={(coefficient / 10).toLocaleString("tr-TR")}
          value={coefficient}
          set={setCoefficient}
          min={-99}
          max={99}
        />
        <Range
          label="İlk 10 kuvveti"
          value={exponent}
          set={setExponent}
          min={-6}
          max={9}
        />
        <Choices
          label="İşlem"
          value={operation}
          set={setOperation}
          choices={[
            ["single", "Yalnız ilk sayı"],
            ["add", "İki sayıyı topla"],
            ["multiply", "İki sayıyı çarp"],
          ]}
        />
        {operation !== "single" && (
          <>
            <Range
              label="İkinci katsayı"
              display={(second / 10).toLocaleString("tr-TR")}
              value={second}
              set={setSecond}
              min={-99}
              max={99}
            />
            <Range
              label="İkinci 10 kuvveti"
              value={otherExponent}
              set={setOtherExponent}
              min={-6}
              max={9}
            />
          </>
        )}
      </div>
      <Figure
        title="Logaritmik eksen: her eşit aralık 100 kat"
        description={
          point?.ok
            ? `Görünür uçlar 10^-8 ve 10^12; ara çizgiler iki üs aralıkla ilerler. Sayının yaklaşık 10 tabanındaki logaritma konumu ${point.exponentPositionApprox.toFixed(4)}. ${point.clipped ? "Değer görünür aralığın dışında; işaret sınırda, gerçek konum bu sınır değildir." : "Daire gerçek logaritmik konumdan hesaplanır."}`
            : `Bu eksen yalnız pozitif değerler içindir. ${point && !point.ok ? point.reason : "Geçerli bir sayı seç."}`
        }
      >
        <path className="f039-axis" d="M44 130H596" />
        {Array.from({ length: 11 }, (_, i) => (
          <path
            key={i}
            className="f039-guide"
            d={`M${44 + i * 55.2} 114V146`}
          />
        ))}
        {point?.ok && (
          <circle
            className={point.clipped ? "f039-negative" : "f039-result"}
            cx={point.x}
            cy={130}
            r={12}
          />
        )}
      </Figure>
      <Facts
        rows={[
          ["İlk sayı", `${fmt(F(coefficient, 10))} × 10^(${exponent})`],
          ...(operation !== "single"
            ? [
                [
                  "İkinci sayı",
                  `${fmt(F(second, 10))} × 10^(${otherExponent})`,
                ] as [string, string],
              ]
            : []),
          [
            "Tam sonuç",
            calculation.ok ? fmt(calculation.value) : calculation.reason,
          ],
          [
            "Bilimsel standart",
            normalized?.kind === "normalized"
              ? `${fmt(normalized.coefficient)} × 10^(${normalized.exponent})`
              : normalized?.kind === "zero"
                ? normalized.reason
                : "Tanımlı sonuç yok",
          ],
          ["İlk sayının standart biçimi", scientificText(first)],
          ...(operation !== "single"
            ? [
                ["İkinci sayının standart biçimi", scientificText(other)] as [
                  string,
                  string,
                ],
              ]
            : []),
        ]}
      />
      <Note>
        81/10=8,1’dir. Bilimsel katsayıda 1≤|a|&lt;10 koşulu aranır; sıfır ayrı
        durumdur. Tam değer kesirle korunur. Çizim koordinatı yaklaşık logaritma
        kullanır; negatif ve sıfır değer için sahte bir logaritmik nokta
        çizilmez. 8,1×10^8,10^9 noktasının tam üstünde değildir.
      </Note>
    </>
  );
}
function Rational() {
  const [base, setBase] = usePower039State("Rational.base", -8),
    [m, setM] = usePower039State("Rational.m", 1),
    [n, setN] = usePower039State("Rational.n", 3),
    [inner, setInner] = usePower039State("Rational.inner", 1);
  const direct = power039RationalPower(F(base), m, n),
    nested = power039NestedRational(F(base), inner, m, n);
  return (
    <>
      <div className="f039-controls">
        <Range label="Taban" value={base} set={setBase} min={-16} max={16} />
        <Range label="Rasyonel üs payı" value={m} set={setM} min={-4} max={4} />
        <Range
          label="Rasyonel üs paydası"
          value={n}
          set={setN}
          min={1}
          max={6}
        />
        <Range
          label="İç kuvvetin tam sayı üssü"
          value={inner}
          set={setInner}
          min={-3}
          max={3}
        />
      </div>
      <button
        type="button"
        className="f039-button"
        onClick={() => {
          setBase(-1);
          setInner(2);
          setM(1);
          setN(2);
        }}
      >
        Negatif taban karşı örneğini kur
      </button>
      <Figure
        title="İki işlem yolunu ayrı takip et"
        viewBox="0 0 420 240"
        description={`Soldaki tabandan üst yolda önce (${base})^(${inner}), sonra (${m}/${n}) kuvveti hesaplanır. Alt yol aynı tabana doğrudan (${inner}·${m}/${n}) kuvvetini uygular. Dairelerdeki değerleri karşılaştır. Uzun kesirlerde yalnız işaret gösterilir; tam değerler aşağıdadır. İki farklı yolun sonucu, pozitif taban koşulu olmadan eşit olmak zorunda değildir.`}
      >
        <path className="f039-line-a" d="M52 120Q130 28 210 64T368 64" />
        <path className="f039-line-b" d="M52 120Q165 220 368 190" />
        <circle
          className={base < 0 ? "f039-negative" : "f039-a"}
          cx={52}
          cy={120}
          r={34}
        />
        <circle
          className={
            nested.ok && nested.inner.ok
              ? nested.inner.value.n < 0n
                ? "f039-negative"
                : "f039-a"
              : "f039-invalid"
          }
          cx={210}
          cy={64}
          r={34}
        />
        <circle
          className={
            nested.ok && nested.nested.kind === "exact"
              ? nested.nested.value.n < 0n
                ? "f039-negative"
                : "f039-result"
              : "f039-invalid"
          }
          cx={368}
          cy={64}
          r={34}
        />
        <circle
          className={
            nested.ok && nested.shortcut.kind === "exact"
              ? nested.shortcut.value.n < 0n
                ? "f039-negative"
                : "f039-result"
              : "f039-invalid"
          }
          cx={368}
          cy={190}
          r={34}
        />
        <text className="f039-node-value" x={52} y={120}>
          {base}
        </text>
        <text
          className={`f039-node-value ${nested.ok && nested.inner.ok ? "" : "f039-node-unfilled"}`}
          x={210}
          y={64}
        >
          {nested.ok && nested.inner.ok
            ? nodeValue039(nested.inner.value)
            : "!"}
        </text>
        <text
          className={`f039-node-value ${nested.ok && nested.nested.kind === "exact" ? "" : "f039-node-unfilled"}`}
          x={368}
          y={64}
        >
          {nested.ok ? rationalNode039(nested.nested) : "!"}
        </text>
        <text
          className={`f039-node-value ${nested.ok && nested.shortcut.kind === "exact" ? "" : "f039-node-unfilled"}`}
          x={368}
          y={190}
        >
          {nested.ok ? rationalNode039(nested.shortcut) : "!"}
        </text>
      </Figure>
      <Facts
        rows={[
          [
            "Tek rasyonel kuvvet",
            `(${base})^(${m}/${n}) → ${rationalText(direct)}`,
          ],
          [
            "En sade üs",
            direct.reduced ? fmt(direct.reduced) : "Geçerli kesir değil",
          ],
          ...(nested.ok
            ? ([
                ["Önce iç kuvvet", result(nested.inner)],
                ["Sonra dış rasyonel kuvvet", rationalText(nested.nested)],
                ["Üsleri doğrudan çarpmak", rationalText(nested.shortcut)],
                [
                  "İki yolun durumu",
                  nested.exactComparison
                    ? nested.exactComparison.same
                      ? "Bu girdide eşit; genel koşulu yine koru"
                      : "Farklı sonuç: koşulsuz yasa geçersiz"
                    : "En az bir sonuç tam rasyonel değil veya tanımlı değil",
                ],
              ] as [string, string][])
            : [["Girdi", nested.reason] as [string, string]]),
        ]}
      />
      <Note>
        Üssü önce sadeleştir. Negatif tabanda sade payda tekse gerçek kök
        olabilir, çiftse gerçek değildir. (−8)^(2/6)=(−8)^(1/3)=−2; bunu
        koşulsuz altıncı kök((-8)^2)=+2’ye çevirme. İrrasyonel sonuç köklü
        biçimde tutulur; yaklaşık değer tam eşitlik diye sunulmaz.
      </Note>
    </>
  );
}
function Growth() {
  const [initial, setInitial] = usePower039State("Growth.initial", 200),
    [q, setQ] = usePower039State("Growth.q", "2"),
    [steps, setSteps] = usePower039State("Growth.steps", 6);
  const multiplier = q === "half" ? F(1, 2) : F(Number(q)),
    model = power039Growth(F(initial), multiplier, steps);
  const values = model.ok ? model.values : [],
    maximum = Math.max(1, ...values.map((item) => scalar(item.value)));
  const x = (step: number) => 44 + (step / Math.max(1, steps)) * 552,
    y = (value: Power039Fraction) => 204 - (scalar(value) / maximum) * 168;
  return (
    <>
      <div className="f039-controls">
        <Range
          label="Başlangıç miktarı"
          value={initial}
          set={setInitial}
          min={0}
          max={200}
        />
        <Choices
          label="Her tamamlanan adımın çarpanı"
          value={q}
          set={setQ}
          choices={[
            ["0", "0 (ilk adımdan sonra 0)"],
            ["half", "1/2 (yarılanma)"],
            ["1", "1 (sabit)"],
            ["2", "2 (iki kat)"],
            ["3", "3 (üç kat)"],
          ]}
        />
        <Range
          label="Tamamlanan adım"
          value={steps}
          set={setSteps}
          min={0}
          max={12}
        />
      </div>
      <div className="f039-actions">
        <button
          type="button"
          className="f039-button"
          disabled={steps === 12}
          onClick={() => setSteps(Math.min(12, steps + 1))}
        >
          Bir adım ilerle
        </button>
        <button
          type="button"
          className="f039-button"
          disabled={steps === 0}
          onClick={() => setSteps(0)}
        >
          Başlangıca dön
        </button>
      </div>
      <Figure
        title="Her nokta tamamlanan bir adım"
        description={`Yatay eksen 0…${steps} adım; dikey eksen 0…${maximum}. Başlangıç noktası ilk katlama değildir. Noktalar aşağıdaki tam değerler tablosundan hesaplanır; çizgiler yalnız adımları birbirine bağlar, sürekli zaman iddiası taşımaz.`}
      >
        <path className="f039-axis" d="M44 28V204H604" />
        <polyline
          className="f039-line-a"
          points={values
            .map((item) => `${x(item.step)},${y(item.value)}`)
            .join(" ")}
        />
        {values.map((item) => (
          <circle
            className={item.step === 0 ? "f039-b" : "f039-result"}
            key={item.step}
            cx={x(item.step)}
            cy={y(item.value)}
            r={6}
          />
        ))}
      </Figure>
      {model.ok && (
        <>
          <Facts
            rows={[
              ["Başlangıç (0. adım)", fmt(model.initial)],
              ["Çarpan", fmt(model.multiplier)],
              ["Seçili adımdaki miktar", fmt(model.final)],
              ["Davranış", model.behavior],
            ]}
          />
          <div className="f039-table-wrap">
            <table>
              <caption>Adım adım tam değerler</caption>
              <thead>
                <tr>
                  <th scope="col">Adım</th>
                  <th scope="col">Miktar</th>
                </tr>
              </thead>
              <tbody>
                {values.map((item) => (
                  <tr key={item.step}>
                    <th scope="row">{item.step}</th>
                    <td>{fmt(item.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <Note>
        0. adımda henüz çarpan uygulanmadı. Çarpan 0 ise başlangıç ayrıca
        tanımlıdır; ilk adımdan sonra 0 olur. Bu, 0^0’a değer atamak değildir.
        Çarpan 1/2 azalma, 2 veya 3 büyüme modelidir. Süre ve bu düğmeler
        ustalık veya XP üretmez.
      </Note>
    </>
  );
}
const renderers: Record<Mode, () => ReactNode> = {
  anatomy: Anatomy,
  laws: Laws,
  same: Same,
  factor: Factor,
  prime: Prime,
  equation: Equation,
  compare: Compare,
  scientific: Scientific,
  rational: Rational,
  growth: Growth,
};
export function PowersSource039Lab() {
  const [mode, setMode] = usePower039State<Mode>("PowersSource039Lab.mode", "anatomy"),
    panel = useId();
  return (
    <section className="f039-lab" aria-label="Üslü sayılar etkileşimli keşif">
      <h3>İşlemi değiştir, gerekçeyi gör</h3>
      <p>
        Önce sonucu tahmin et, sonra bir değeri değiştir. İfade, şekil ve hesap
        aynı modelden üretilir.
      </p>
      <div className="f039-modes">
        <Choices
          label="Keşif modeli"
          value={mode}
          set={(value) => setMode(value as Mode)}
          choices={modes}
        />
      </div>
      {modes.map(([key, label]) => {
        const Renderer = renderers[key];
        return (
          <div
            key={key}
            id={`${panel}-${key}`}
            className="f039-panel"
            hidden={mode !== key}
          >
            <h4>{label}</h4>
            <Renderer />
          </div>
        );
      })}
      <p className="f039-disclosure">
        Bu görsel keşif öğrenme kaydı veya puan oluşturmaz. Bağımsız sorular
        Sorular bölümünde çözülür. Tam değerler ve koşullar şekillerin altında
        metinle de yer alır.
      </p>
    </section>
  );
}
