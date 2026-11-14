import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  arithmeticResult,
  clampInt,
  factorial,
  numberExamples,
  numberKind,
  numberSets,
  primeCandidates,
  primeEvidence,
  primeFactors,
  sequence,
  type Arithmetic,
} from "./mathModels";
const f = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 }).format(n);

function NumberSets() {
  const [s, set] = useExploration("math-sets", {
    choice: 0,
    selected: "",
    checked: false,
  });
  const choice = clampInt(s.choice, 0, numberExamples.length - 1);
  const example = numberExamples[choice];
  const selected = s.selected
    .split(",")
    .filter((v) => numberSets.some((a) => a.id === v));
  const correct =
    selected.length === example.sets.length &&
    example.sets.every((v) => selected.includes(v));
  return (
    <>
      <p>
        Bir sayıyı seç. Ait olduğu bütün kümeleri işaretle, sonra gerekçeyi aç.
      </p>
      <div className="math-number-choices" aria-label="İncelenecek sayı">
        {numberExamples.map((v, i) => (
          <button
            className="secondary"
            key={v.label}
            aria-pressed={choice === i}
            onClick={() => set({ choice: i, selected: "", checked: false })}
          >
            {v.label}
          </button>
        ))}
      </div>
      <fieldset className="math-membership">
        <legend>{example.label} hangi kümelerde?</legend>
        {numberSets.map((v) => (
          <label key={v.id}>
            <input
              type="checkbox"
              checked={selected.includes(v.id)}
              onChange={() =>
                set({
                  selected: (selected.includes(v.id)
                    ? selected.filter((a) => a !== v.id)
                    : [...selected, v.id]
                  ).join(","),
                  checked: false,
                })
              }
            />
            <span>
              {v.symbol} · {v.name}
            </span>
          </label>
        ))}
      </fieldset>
      <button className="secondary" onClick={() => set({ checked: true })}>
        Kümeleri kontrol et
      </button>
      <svg
        viewBox="0 0 560 255"
        role="img"
        aria-label="Doğal sayılar tam sayıların, tam sayılar rasyonellerin, rasyoneller gerçeklerin içindedir."
      >
        {[...numberSets].reverse().map((v, i) => (
          <g key={v.id}>
            <rect
              x={15 + i * 62}
              y={15 + i * 35}
              width={530 - i * 115}
              height={225 - i * 63}
              rx="12"
              fill="var(--surface)"
              stroke={
                s.checked && example.sets.includes(v.id)
                  ? "var(--mint)"
                  : "var(--muted)"
              }
              strokeWidth="2"
            />
            <text x={30 + i * 62} y={40 + i * 35} className="plot-label">
              {v.symbol} {v.name}
            </text>
          </g>
        ))}
      </svg>
      {s.checked && (
        <div className="model-results set-result" role="status">
          <strong>
            {correct
              ? "Kümeler doğru eşleşti."
              : "Seçimlerini şu değerle karşılaştır:"}
          </strong>
          <p>
            {example.label} = {example.value}. Ait olduğu kümeler:{" "}
            {example.sets
              .map((id) => numberSets.find((v) => v.id === id)!.symbol)
              .join(", ")}
            .
          </p>
          <p>
            {choice === 4
              ? "√5 irrasyoneldir; ℚ içinde bulunmaz, ℝ içindedir."
              : "Daha küçük kümeye ait olmak, onu içeren kümelere de ait olmak demektir."}
          </p>
        </div>
      )}
      <p className="lab-caption">
        Bu anlatımda ℕ, 0 ile başlar. Şema küme ilişkisini gösterir; kutu
        alanları eleman sayısıyla orantılı değildir.
      </p>
    </>
  );
}

function ParitySigns() {
  const [s, set] = useExploration("math-parity", {
    a: -5,
    b: 2,
    operation: "sum",
  });
  const a = clampInt(s.a, -6, 6),
    b = clampInt(s.b, -6, 6);
  const operation: Arithmetic = ["sum", "product", "division"].includes(
    s.operation,
  )
    ? (s.operation as Arithmetic)
    : "sum";
  const result = arithmeticResult(a, b, operation),
    kind = numberKind(result);
  return (
    <>
      <p>
        İşaret ile tek–çift bilgisini ayrı izle. Bölmede önce sonucun tanımlı ve
        tam sayı olup olmadığına bak.
      </p>
      <div className="ayt-controls">
        {(["a", "b"] as const).map((key) => (
          <label className="lab-slider" key={key}>
            {key.toUpperCase()} sayısı: {key === "a" ? a : b}
            <input
              type="range"
              aria-label={`${key.toUpperCase()} sayısı`}
              min={-6}
              max={6}
              value={key === "a" ? a : b}
              onChange={(e) => set({ [key]: Number(e.target.value) })}
            />
          </label>
        ))}
        <label className="field">
          İşlem
          <select
            aria-label="İşlem"
            value={operation}
            onChange={(e) => set({ operation: e.target.value })}
          >
            <option value="sum">Toplama</option>
            <option value="product">Çarpma</option>
            <option value="division">Bölme</option>
          </select>
        </label>
      </div>
      <svg
        viewBox="0 0 560 185"
        role="img"
        aria-label={`A ${a}, B ${b}. Noktalar sayıların mutlak değerlerini ikişerli eşler.`}
      >
        {[a, b].map((value, row) => (
          <g key={row}>
            <text x="20" y={45 + row * 90} className="plot-label">
              {row ? "B" : "A"}: {value}
            </text>
            {Array.from({ length: Math.abs(value) }, (_, i) => (
              <g key={i}>
                <circle
                  cx={145 + Math.floor(i / 2) * 125 + (i % 2) * 36}
                  cy={40 + row * 90}
                  r="13"
                  fill={
                    i === Math.abs(value) - 1 && Math.abs(value) % 2
                      ? "var(--accent)"
                      : "var(--mint)"
                  }
                />
                {i % 2 === 1 && (
                  <path
                    d={`M${145 + Math.floor(i / 2) * 125} ${62 + row * 90}h36`}
                    className="lab-axis"
                  />
                )}
              </g>
            ))}
            <text x="20" y={80 + row * 90} className="plot-label">
              {Math.floor(Math.abs(value) / 2)} çift · {Math.abs(value) % 2}{" "}
              artan
            </text>
          </g>
        ))}
      </svg>
      <p className="lab-caption">
        Noktalar |A| ve |B| adet gösterir; negatif nesne sayısı değildir.
      </p>
      <div className="model-results parity-result" aria-live="polite">
        <strong>
          ({a}){" "}
          {operation === "sum" ? "+" : operation === "product" ? "×" : "÷"} ({b}
          ) = {result === null ? "tanımsız" : f(result)}
        </strong>
        <p>
          İşaret: {kind.sign}. Tek–çift: {kind.parity}.
        </p>
        {operation === "division" && b === 0 && (
          <p>Sıfıra bölme tanımlı değildir; 0/0 da tanımsızdır.</p>
        )}
        {operation === "division" &&
          b !== 0 &&
          result !== null &&
          !Number.isInteger(result) && (
            <p>
              Kesrin işareti vardır, fakat tam sayı olmadığı için tek veya çift
              denmez. Ondalık sonuç gerektiğinde üç basamağa yuvarlanır.
            </p>
          )}
      </div>
      <p className="lab-caption">
        Sıfır çifttir; ne pozitif ne negatiftir. Toplam ve çarpımdaki tek–çift
        kuralları tam sayılar içindir.
      </p>
    </>
  );
}

function Consecutive() {
  const [s, set] = useExploration("math-sequence", {
    start: 2,
    count: 6,
    step: 1,
    paired: false,
  });
  const start = clampInt(s.start, -6, 6),
    count = clampInt(s.count, 1, 8),
    step = clampInt(s.step, 1, 3);
  const model = sequence(start, count, step);
  return (
    <>
      <p>
        İlk terimi, terim sayısını ve artışı değiştir. İleri ve geri yazılan
        toplamı eşleyerek formülün nereden geldiğini gör.
      </p>
      <div className="ayt-controls">
        <label className="lab-slider">
          İlk terim: {start}
          <input
            type="range"
            aria-label="İlk terim"
            min={-6}
            max={6}
            value={start}
            onChange={(e) => set({ start: Number(e.target.value) })}
          />
        </label>
        <label className="lab-slider">
          Terim sayısı: {count}
          <input
            type="range"
            aria-label="Terim sayısı"
            min={1}
            max={8}
            value={count}
            onChange={(e) => set({ count: Number(e.target.value) })}
          />
        </label>
        <label className="field">
          Artış
          <select
            aria-label="Artış"
            value={step}
            onChange={(e) => set({ step: Number(e.target.value) })}
          >
            <option value={1}>1 · ardışık tam sayılar</option>
            <option value={2}>2 · ardışık tek veya çift sayılar</option>
            <option value={3}>3 · eşit aralıklı dizi</option>
          </select>
        </label>
      </div>
      <p className="sequence-terms">
        {model.terms.join(" + ")} = {model.sum}
      </p>
      <button
        className="secondary"
        aria-pressed={s.paired}
        onClick={() => set({ paired: !s.paired })}
      >
        {s.paired ? "Tek toplamı göster" : "Eşleyerek topla"}
      </button>
      <svg
        viewBox={`0 0 560 ${s.paired ? 220 : 95}`}
        role="img"
        aria-label={
          s.paired
            ? `${count} eş çiftin her biri ${start + model.last}; iki toplam ${2 * model.sum}.`
            : `${count} terim arasında ${count - 1} adım vardır.`
        }
      >
        {model.terms.map((value, i) => {
          const x = 38 + i * (count === 1 ? 0 : 484 / (count - 1));
          return (
            <g key={i}>
              {i > 0 && (
                <path
                  d={`M${38 + ((i - 1) * 484) / (count - 1) + 20} 46H${x - 20}`}
                  className="lab-axis"
                />
              )}
              <circle
                cx={x}
                cy="46"
                r="20"
                fill="var(--surface)"
                stroke="var(--mint)"
                strokeWidth="2"
              />
              <text x={x} y="51" textAnchor="middle" className="plot-label">
                {value}
              </text>
              {s.paired && (
                <>
                  <path d={`M${x} 68V112`} className="lab-axis" />
                  <circle
                    cx={x}
                    cy="137"
                    r="20"
                    fill="var(--surface)"
                    stroke="var(--accent)"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y="142"
                    textAnchor="middle"
                    className="plot-label"
                  >
                    {model.terms[count - 1 - i]}
                  </text>
                  <text
                    x={x}
                    y="192"
                    textAnchor="middle"
                    className="plot-label"
                  >
                    {start + model.last}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
      <div className="model-results sequence-result" aria-live="polite">
        <strong>
          {step === 1
            ? "Ardışık tam sayılar"
            : step === 2
              ? start % 2 === 0
                ? "Ardışık çift sayılar"
                : "Ardışık tek sayılar"
              : "3 artan eşit aralıklı dizi"}
        </strong>
        <p>
          Son terim = {start} + ({count} − 1) × {step} = {model.last}.
        </p>
        <p>
          {s.paired
            ? `2S = ${count} × (${start} + ${model.last}) = ${2 * model.sum}. İki toplam kullandık, bu yüzden 2’ye böl: S = ${model.sum}.`
            : `Terim sayısı ${model.last - start} ÷ ${step} + 1 = ${count}. Uçlar da sayılır.`}
        </p>
        <p>
          Ortalama = {f(model.mean)}.
          {count % 2 === 0
            ? " Terim adedi çift; ortalama bir terim olmak zorunda değil."
            : " Terim adedi tek; ortadaki terim ortalamadır."}
        </p>
      </div>
    </>
  );
}

function Primes() {
  const [s, set] = useExploration("math-primes", {
    n: 49,
    tested: "",
    last: 0,
    factors: false,
  });
  const n = clampInt(s.n, 1, 100),
    required = primeCandidates(n);
  const tested = [
    ...new Set(
      s.tested
        .split(",")
        .filter(Boolean)
        .map(Number)
        .filter((v) => required.includes(v)),
    ),
  ];
  const evidence = primeEvidence(n, tested),
    last = required.includes(s.last) && tested.includes(s.last) ? s.last : 0;
  const quotient = last ? Math.floor(n / last) : 0,
    remainder = last ? n % last : 0;
  return (
    <>
      <p>
        Bir bölen bileşikliği kanıtlar. Asal demek için gerekli asal adaylarının
        tamamını elemek gerekir; √n sınırı dahildir.
      </p>
      <label className="lab-slider">
        İncelenen tam sayı: {n}
        <input
          type="range"
          aria-label="İncelenen tam sayı"
          min={1}
          max={100}
          value={n}
          onChange={(e) =>
            set({
              n: Number(e.target.value),
              tested: "",
              last: 0,
              factors: false,
            })
          }
        />
      </label>
      <div className="math-trials" aria-label="Asal bölen denemeleri">
        {required.map((p) => (
          <button
            className="secondary"
            key={p}
            disabled={tested.includes(p)}
            onClick={() => set({ tested: [...tested, p].join(","), last: p })}
          >
            {p} ile bölmeyi dene
          </button>
        ))}
        <button
          className="text-button"
          onClick={() => set({ tested: "", last: 0, factors: false })}
        >
          Denemeleri sıfırla
        </button>
      </div>
      {last > 0 && (
        <>
          <svg
            viewBox={`0 0 560 ${Math.max(75, Math.ceil((quotient + (remainder ? 1 : 0)) / 10) * 45 + 20)}`}
            role="img"
            aria-label={`${n}, ${last} birimlik ${quotient} tam grup ve ${remainder} artan içerir.`}
          >
            {Array.from({ length: quotient + (remainder ? 1 : 0) }, (_, i) => (
              <g key={i}>
                <circle
                  cx={35 + (i % 10) * 54}
                  cy={28 + Math.floor(i / 10) * 45}
                  r="17"
                  fill={i < quotient ? "var(--mint)" : "var(--accent)"}
                />
                <text
                  x={35 + (i % 10) * 54}
                  y={33 + Math.floor(i / 10) * 45}
                  textAnchor="middle"
                  className="atom-label"
                >
                  {i < quotient ? last : remainder}
                </text>
              </g>
            ))}
          </svg>
          <p className="lab-caption">
            Her daire içindeki sayı kadar birim gösterir. Tam gruplar {last}{" "}
            birimliktir; artan varsa mercan rengiyle gösterilir.
          </p>
        </>
      )}
      <div className="model-results prime-result" aria-live="polite">
        <strong>
          {evidence === "asal"
            ? `${n} asal.`
            : evidence === "bilesik"
              ? `${n} bileşik.`
              : evidence === "bekliyor"
                ? "Henüz asallık kararı verilmedi."
                : "1 ne asal ne bileşik."}
        </strong>
        {last > 0 && (
          <p>
            {n} = {last} × {quotient} + {remainder}.{" "}
            {remainder === 0
              ? `${last}, 1 ile ${n} dışında bir pozitif bölendir.`
              : `${last}, ${n}’yi tam bölmez.`}
          </p>
        )}
        <p>
          {n === 1
            ? "Asal tanımı 1’den büyük tam sayıları kapsar."
            : required.length
              ? `Gerekli adaylar: ${required.join(", ")}. Denenen: ${tested.length ? tested.join(", ") : "yok"}.`
              : "2 ve 3 için karesi sayıyı aşmayan asal bölen adayı yoktur; yalnız 1 ve kendileri böler."}
        </p>
      </div>
      <button
        className="secondary"
        aria-pressed={s.factors}
        onClick={() => set({ factors: !s.factors })}
      >
        Asal çarpanlarını {s.factors ? "gizle" : "göster"}
      </button>
      {s.factors && (
        <p className="prime-factorization">
          {n === 1
            ? "1’in asal çarpanı yoktur."
            : `${n} = ${primeFactors(n).join(" × ")}`}
        </p>
      )}
    </>
  );
}

function Factorials() {
  const [s, set] = useExploration("math-factorial", { n: 4, m: 2, placed: "" });
  const n = clampInt(s.n, 0, 7),
    m = clampInt(s.m, 0, n),
    letters = "ABCDEFG".slice(0, n).split("");
  const placed = [
    ...new Set(s.placed.split("").filter((v) => letters.includes(v))),
  ];
  return (
    <>
      <p>
        Farklı kitapları numaralı raflara yerleştir. Her seçimde kalan seçenek
        sayısı azalır. Bu etkinlikte bir düzen kurarsın; n! bütün olası
        düzenlerin sayısıdır.
      </p>
      <label className="lab-slider">
        Farklı kitap sayısı n: {n}
        <input
          type="range"
          aria-label="Farklı kitap sayısı"
          min={0}
          max={7}
          value={n}
          onChange={(e) =>
            set({
              n: Number(e.target.value),
              m: Math.min(m, Number(e.target.value)),
              placed: "",
            })
          }
        />
      </label>
      <div className="math-book-choices">
        {letters.map((letter) => (
          <button
            className="secondary"
            key={letter}
            aria-label={`Kitap ${letter}`}
            disabled={placed.includes(letter)}
            onClick={() => set({ placed: [...placed, letter].join("") })}
          >
            {letter}
          </button>
        ))}
        <button
          className="text-button"
          disabled={!placed.length}
          onClick={() => set({ placed: "" })}
        >
          Rafları boşalt
        </button>
      </div>
      {n > 0 && (
        <svg
          viewBox="0 0 560 135"
          role="img"
          aria-label={`${n} numaralı raf; yerleştirilen kitaplar: ${placed.join(", ") || "yok"}`}
        >
          {letters.map((letter, i) => (
            <g key={letter}>
              <rect
                x={18 + i * 76}
                y="25"
                width="63"
                height="68"
                rx="5"
                fill={placed[i] ? "var(--mint)" : "var(--surface)"}
                stroke="var(--muted)"
                strokeWidth="2"
              />
              <text
                x={49 + i * 76}
                y="68"
                textAnchor="middle"
                className={placed[i] ? "atom-label" : "plot-label"}
              >
                {placed[i] || "?"}
              </text>
              <text
                x={49 + i * 76}
                y="119"
                textAnchor="middle"
                className="plot-label"
              >
                {i + 1}. raf
              </text>
            </g>
          ))}
        </svg>
      )}
      <div className="model-results factorial-result" aria-live="polite">
        <strong>
          {n}! ={" "}
          {n
            ? `${Array.from({ length: n }, (_, i) => n - i).join(" × ")} = `
            : ""}
          {f(factorial(n))}
        </strong>
        <p>
          {n === 0
            ? "Boş raf dizisini oluşturmanın tek yolu vardır: hiçbir kitap yerleştirmemek. 0! = 1."
            : placed.length === n
              ? `Bir düzen kurdun: ${placed.join("–")}. Toplam ${factorial(n)} düzen vardır; yalnız birini gördün.`
              : `${placed.length + 1}. raf için ${n - placed.length} kitap seçeneği kaldı.`}
        </p>
      </div>
      <label className="lab-slider">
        Ortak çarpım m!: {m}!
        <input
          type="range"
          aria-label="Ortak çarpım m"
          min={0}
          max={n}
          value={m}
          disabled={n === 0}
          onChange={(e) => set({ m: Number(e.target.value) })}
        />
      </label>
      <div
        className="factorial-cancellation"
        aria-label="Paydaki ortak çarpanlar"
      >
        {Array.from({ length: n }, (_, i) => n - i).map((v, i) => (
          <span key={v}>
            {i > 0 && " × "}
            {v <= m ? <s>{v}</s> : <strong>{v}</strong>}
          </span>
        ))}
        {n === 0 && <span>1</span>}
      </div>
      <p className="factorial-ratio">
        {n}! / {m}! = {f(factorial(n) / factorial(m))}. Paydadaki {m}! ={" "}
        {f(factorial(m))} ortak çarpımı sadeleşir.
      </p>
      <p className="lab-caption">
        Bu modelde kitaplar farklı, raflar sıralı ve ek kısıt yoktur. Faktöriyel
        negatif olmayan tam sayılar için kullanılır.
      </p>
    </>
  );
}

const models = {
  "temel-kavramlar": {
    title: "Görünüşten değere, değerden kümeye",
    Component: NumberSets,
  },
  "tek-cift-isaret": {
    title: "İşareti ve tek–çifti ayrı izle",
    Component: ParitySigns,
  },
  "ardisik-sayilar": { title: "İki toplamı eşleştir", Component: Consecutive },
  "asal-sayilar": { title: "Asallığı bölenlerle sına", Component: Primes },
  faktoriyel: { title: "Seçenekler neden çarpılıyor?", Component: Factorials },
};
export default function MathFoundations({ id }: { id: string }) {
  const uid = useId();
  const model = models[id as keyof typeof models];
  if (!model) return null;
  const Component = model.Component;
  return (
    <section
      className="visual-lab math-foundation-lab"
      aria-labelledby={`${uid}-title`}
    >
      <h2 id={`${uid}-title`}>{model.title}</h2>
      <Component />
      <p className="lab-caption">
        Bu keşif seçimleri cihazda saklanır. Modeli kullanmak XP veya doğru
        cevap kazandırmaz; bağımsız sorular ayrı bölümde kaydedilir.
      </p>
    </section>
  );
}
