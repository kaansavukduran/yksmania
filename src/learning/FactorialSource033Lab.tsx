import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  factorial033Product,
  factorial033Ratio,
  factorial033Budget,
  factorial033ZeroBudget,
  factorial033Arrangement,
  factorial033Sum,
} from "./factorialSource033Model";
import "./factorialSource033.css";
// PRIVATE proposal; root must register, independently review and browser-test.
const bounded = (n: number, fallback: number, min: number, max: number) =>
  Number.isFinite(n) ? Math.max(min, Math.min(max, Math.round(n))) : fallback;
export default function FactorialSource033Lab({
  id: lessonId,
}: { id?: string } = {}) {
  const uid = useId();
  const [s, set] = useExploration("f033:factorial", {
    mode: 0,
    productN: 5,
    step: 0,
    ratioN: 8,
    ratioM: 6,
    budgetN: 10,
    base: 12,
    zeroN: 10,
    removed: 7,
    orderN: 4,
    condition: 0,
    sumN: 4,
    sumSign: 0,
  });
  const mode = bounded(s.mode, 0, 0, 5),
    n = bounded(s.productN, 5, 0, 12),
    p = factorial033Product(n),
    stage = bounded(s.step, 0, 0, n);
  const r = factorial033Ratio(
    bounded(s.ratioN, 8, 0, 12),
    bounded(s.ratioM, 6, 0, 12),
  );
  const b = factorial033Budget(
    bounded(s.budgetN, 10, 0, 100),
    bounded(s.base, 12, 2, 60),
  );
  const z = factorial033ZeroBudget(
    bounded(s.zeroN, 10, 0, 100),
    bounded(s.removed, 7, 0, 30),
  );
  const condition = (["free", "firstFixed", "firstForbidden"] as const)[
    bounded(s.condition, 0, 0, 2)
  ];
  const a = factorial033Arrangement(bounded(s.orderN, 4, 1, 7), condition);
  const sumSign = bounded(s.sumSign, 0, 0, 1) === 0 ? 1 : -1;
  const sum = factorial033Sum(bounded(s.sumN, 4, 0, 11), sumSign);
  const range = (
    key: keyof typeof s,
    label: string,
    value: number,
    min: number,
    max: number,
  ) => {
    const id = uid + "-" + key;
    return (
      <div className="f033-range">
        <div>
          <label htmlFor={id}>{label}</label>
          <output htmlFor={id}>{value}</output>
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step="1"
          value={value}
          onChange={(e) => set({ [key]: Number(e.target.value) })}
        />
      </div>
    );
  };
  return (
    <section
      className="visual-lab f033-lab"
      aria-labelledby={uid}
      data-lesson-id={lessonId ?? "tyt-mat-faktoriyel-kaynak-033"}
    >
      <h2 id={uid}>Çarpımı kur, ortak kısmı gör, asal bütçesini denetle</h2>
      <p>
        Her görünüm farklı bir soruyu cevaplar. Sayıları değiştir; kalan çarpan,
        asal kopyaları ve sonuç aynı hesapla birlikte değişsin. Bu keşif öğrenme
        puanı vermez.
      </p>
      <div
        className="f033-modes"
        role="group"
        aria-label="Faktöriyel keşif görünümü"
      >
        {[
          "Çarpımı kur",
          "Oranı sadeleştir",
          "Asal bütçesi",
          "2–5 eşleşmeleri",
          "Sıralama koşulu",
          "Toplam ve fark",
        ].map((name, i) => (
          <button
            type="button"
            key={name}
            className="secondary"
            aria-pressed={mode === i}
            onClick={() => set({ mode: i })}
          >
            {name}
          </button>
        ))}
      </div>
      {mode === 0 && (
        <div className="f033-panel" data-mode="product">
          <p>
            1’den n’ye çarpanları sırayla ekle. 0! için hiç çarpan yoktur; boş
            çarpımın değeri 1 kalır.
          </p>
          {range("productN", "n değeri", p.n, 0, 12)}
          <div className="f033-chips" aria-label="Sırayla eklenen çarpanlar">
            {p.factors.length ? (
              p.factors.map((factor, i) => (
                <span
                  key={factor}
                  className={i < stage ? "f033-chip active" : "f033-chip"}
                >
                  {i < stage ? "✓ " : ""}
                  {factor}
                </span>
              ))
            ) : (
              <span className="f033-chip active">Boş çarpım · 1</span>
            )}
          </div>
          <p className="f033-result" role="status">
            {stage === 0
              ? "Henüz çarpan eklenmedi: 1"
              : `${p.factors.slice(0, stage).join(" × ")} = ${p.stages[stage].value}`}
          </p>
          <div className="f033-actions">
            <button
              type="button"
              className="primary"
              disabled={stage === p.n}
              onClick={() => set({ step: stage + 1 })}
            >
              {stage < p.n
                ? `${stage + 1}. çarpanı ekle`
                : "Bütün çarpanlar eklendi"}
            </button>
            <button
              type="button"
              className="secondary"
              disabled={stage === 0}
              onClick={() => set({ step: stage - 1 })}
            >
              Son çarpanı geri al
            </button>
            <button
              type="button"
              className="secondary"
              disabled={stage === 0}
              onClick={() => set({ step: 0 })}
            >
              Çarpımı başa al
            </button>
          </div>
          <p>
            Sonuç:{" "}
            <strong>
              {p.n}! = {p.value}
            </strong>
            .{" "}
            {p.n === 0
              ? "0!=1; n!=n(n−1)! bağıntısını n=0 için kullanma."
              : p.even
                ? "Çarpımda 2 var; sonuç çifttir."
                : "1!=1; sonuç tektir."}
          </p>
        </div>
      )}
      {mode === 1 && (
        <div className="f033-panel" data-mode="ratio">
          <p>
            İki faktöriyel aynı başlangıç çarpımını içerir. Yalnız bu bütün
            ortak çarpım bölünür; toplamdan tek bir terim çizilmez.
          </p>
          <div className="f033-controls">
            {range("ratioN", "Paydaki n", r.n, 0, 12)}
            {range("ratioM", "Paydadaki m", r.m, 0, 12)}
          </div>
          <div
            className="f033-fraction"
            aria-label={`${r.n} faktöriyel bölü ${r.m} faktöriyel`}
          >
            <div>
              {r.n}! ={" "}
              {r.numeratorFactors.length
                ? r.numeratorFactors.join(" × ") + " × "
                : ""}
              <span className="f033-common">{r.common}!</span>
            </div>
            <div>
              {r.m}! ={" "}
              {r.denominatorFactors.length
                ? r.denominatorFactors.join(" × ") + " × "
                : ""}
              <span className="f033-common">{r.common}!</span>
            </div>
          </div>
          <p className="f033-result" role="status">
            {r.n}! / {r.m}! = {r.numerator} / {r.denominator} = {r.fraction}
          </p>
          <p>
            Ortak {r.common}! pozitiftir; sıfıra bölme yoktur.{" "}
            {r.same
              ? "Ünlem içleri aynı; iki eşit pozitif sayının oranı 1."
              : r.n < r.m
                ? "Geriye yalnız paydada çarpan kalır. Sonuç tam sayı olmak zorunda değildir."
                : "Geriye yalnız payda olmayan üst çarpanlar kalır."}{" "}
            0!=1! olduğu için farklı iki iç değer bazen yine 1 oranı verebilir.
          </p>
          <p className="f033-caution">
            Karşı örnek: (5!+4!)/4!=5+1=6. Yalnız toplamın ilk teriminden ortak
            kısmı silersen ikinci terimin katkısını kaybedersin.
          </p>
        </div>
      )}
      {mode === 2 && (
        <div className="f033-panel" data-mode="budget">
          <p>
            n! / bᵏ tam sayı olsun. b’yi asallara ayır. Mevcut kopyayı bir b
            için gereken kopya sayısına böl. En küçük sonuç, en büyük k’dir.
          </p>
          <div className="f033-controls">
            {range("budgetN", "n değeri", b.n, 0, 100)}
            {range("base", "Bölen tabanı b", b.base, 2, 60)}
          </div>
          <p>
            {b.base} ={" "}
            {b.rows.map((row) => `${row.prime}^${row.required}`).join(" × ")}
          </p>
          <div className="f033-budget-rows">
            {b.rows.map((row) => (
              <div className="f033-budget-row" key={row.prime}>
                <h3>
                  Asal {row.prime}: {row.available} kopya
                </h3>
                <svg
                  viewBox="0 0 600 40"
                  role="img"
                  aria-label={`${row.prime} için ${row.available} kopya var; bir ${b.base} için ${row.required} kopya gerekir; ${row.possible} kez yeter.`}
                >
                  <rect
                    x="4"
                    y="8"
                    width="592"
                    height="24"
                    rx="6"
                    className="f033-budget-track"
                  />
                  <rect
                    x="4"
                    y="8"
                    width={
                      (592 * row.possible) /
                      Math.max(1, ...b.rows.map((r) => r.possible))
                    }
                    height="24"
                    rx="6"
                    className="f033-budget-fill"
                  />
                </svg>
                <p>
                  Bir {b.base} için {row.required} kopya gerekir. ⌊
                  {row.available}/{row.required}⌋ ={" "}
                  <strong>{row.possible}</strong> kez yeter.{" "}
                  {row.possible === b.maxPower
                    ? "Bu asal önce biter."
                    : "Bu asaldan daha çok grup çıkabilir."}
                </p>
              </div>
            ))}
          </div>
          <p className="f033-result" role="status">
            En büyük k = {b.maxPower}. {b.n}! / {b.base}^{b.maxPower} ={" "}
            {b.quotient} tam sayı.
          </p>
          <p>
            Sonraki k={b.maxPower + 1} için {b.bottlenecks.join(", ")} asalı
            yetmez. Barlar tam b grubu sayısını kıyaslar; n!’ın değerini vermez.
          </p>
        </div>
      )}
      {mode === 3 && (
        <div className="f033-panel" data-mode="zeros">
          <p>
            n! / 2ᵃ üzerinde çalışıyoruz. Önce bölümün tam sayı olup olmadığına,
            sonra kalan 2 ve 5 kopyalarının eşleşmesine bak. Eşleşmeyen 5’ler
            tek başına son sıfır üretmez.
          </p>
          <div className="f033-controls">
            {range("zeroN", "n değeri", z.n, 0, 100)}
            {range(
              "removed",
              "Paydada tüketilen 2 sayısı a",
              z.twosRemoved,
              0,
              30,
            )}
          </div>
          <div className="f033-budget-row">
            <h3>2 bütçesi</h3>
            <p>
              {z.twos.rows.length
                ? z.twos.rows
                    .map((r) => `⌊${z.n}/${r.power}⌋=${r.copies}`)
                    .join(" + ")
                : "Kat yok: 0"}
              ; toplam {z.twos.total}. Payda {z.twosRemoved} kopya istiyor.
            </p>
          </div>
          <div className="f033-budget-row">
            <h3>5 bütçesi</h3>
            <p>
              {z.fives.rows.length
                ? z.fives.rows
                    .map((r) => `⌊${z.n}/${r.power}⌋=${r.copies}`)
                    .join(" + ")
                : "Kat yok: 0"}
              ; toplam {z.fives.total}. Paydada 5 yok; bu kopyalar kalır.
            </p>
          </div>
          {z.integer ? (
            <>
              <div
                className="f033-pair-row"
                aria-label={`${z.trailingZeros} tane 10 çarpanı`}
              >
                {Array.from({ length: z.trailingZeros ?? 0 }, (_, i) => (
                  <span className="f033-ten" key={i}>
                    <span>2</span>
                    <span>×</span>
                    <span>5</span>
                    <strong>10</strong>
                  </span>
                ))}
              </div>
              <p className="f033-result" role="status">
                Kalan 2: {z.remainingTwos}; kalan 5: {z.fives.total}. min(
                {z.remainingTwos}, {z.fives.total}) = {z.trailingZeros} son
                sıfır.
              </p>
              <p className="f033-number">Tam sayı sonucu: {z.value}</p>
            </>
          ) : (
            <p className="f033-caution" role="status">
              Bölüm tam sayı değil: yalnız {z.twos.total} tane 2 var, payda{" "}
              {z.twosRemoved} tane istiyor. Bu nedenle pozitif tam sayının “son
              sıfır sayısı” kuralını bu bölüme uygulamıyoruz.
            </p>
          )}
          <p>
            n=10, a=7 için bir 2 kalır: 1 son sıfır. a=8 yapınca bütün 2’ler
            biter: 0 son sıfır. n=25 ve a=0 için 25’in ek 5’i dahil 6 son sıfır
            vardır.
          </p>
        </div>
      )}
      {mode === 4 && (
        <div className="f033-panel" data-mode="order">
          <p>
            Bütün nesneler farklı, bütün numaralı yerler doğrusal ve her nesne
            bir kez kullanılıyor. Özel A nesnesinin ilk yere ait koşulunu
            değiştir.
          </p>
          {range("orderN", "Farklı nesne sayısı", a.n, 1, 7)}
          <div className="f033-modes" role="group" aria-label="İlk yer koşulu">
            {["Kısıt yok", "A ilk yerde zorunlu", "A ilk yerde yasak"].map(
              (label, i) => (
                <button
                  key={label}
                  type="button"
                  className="secondary"
                  aria-pressed={bounded(s.condition, 0, 0, 2) === i}
                  onClick={() => set({ condition: i })}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <ol className="f033-seats">
            {a.stages.map((choices, i) => (
              <li key={i}>
                <span>{i + 1}. yer</span>
                <strong>{choices} seçenek</strong>
              </li>
            ))}
          </ol>
          <p className="f033-result" role="status">
            {a.stages.join(" × ")} = {a.count} düzen.
          </p>
          {condition === "firstForbidden" && (
            <p>
              Bağımsız kontrol: bütün {a.total} düzenden A’nın ilk olduğu{" "}
              {a.forbidden} düzeni çıkarınca {a.count} kalır.
            </p>
          )}
          <p className="f033-caution">
            Nesneler ayırt edilmiyorsa bu model kullanılmaz. A,A,B için yalnız
            AAB, ABA, BAA olmak üzere 3 görünüm vardır. Çembersel dönme
            eşdeğerliği de ayrı bir sayma modelidir.
          </p>
        </div>
      )}
      {mode === 5 && (
        <div className="f033-panel" data-mode="sum">
          <p>
            Toplamın içinden tek bir terim çizilmez. İki terimin taşıdığı ortak
            n! çarpanını birlikte dışarı al; katsayıların toplamı veya farkı
            kalır.
          </p>
          {range("sumN", "Ortak faktöriyel içi n", sum.n, 0, 11)}
          <div
            className="f033-modes"
            role="group"
            aria-label="Toplama veya çıkarma"
          >
            {["Topla", "Çıkar"].map((label, i) => (
              <button
                type="button"
                className="secondary"
                key={label}
                aria-pressed={bounded(s.sumSign, 0, 0, 1) === i}
                onClick={() => set({ sumSign: i })}
              >
                {label}
              </button>
            ))}
          </div>
          <p>
            ({sum.n}+1)! {sumSign === 1 ? "+" : "−"} {sum.n}! = ({sum.n}+1) ×{" "}
            <span className="f033-common">{sum.n}!</span>{" "}
            {sumSign === 1 ? "+" : "−"} 1 ×{" "}
            <span className="f033-common">{sum.n}!</span>
          </p>
          <p className="f033-result" role="status">
            {sum.n}! × [({sum.n}+1) {sumSign === 1 ? "+" : "−"} 1] = {sum.n}! ×{" "}
            {sum.coefficient} = {sum.value}
          </p>
          <p>
            İlk faktöriyel {sum.n + 1}!’dır; iki terim aynı {sum.n}! çarpanını
            taşır.{" "}
            {sum.n === 0 && sumSign === -1
              ? "Farkın 0 olması mümkündür: 1!−0!=1−1=0. Faktöriyellerin kendileri hâlâ pozitiftir."
              : "Katsayıyı geri dağıtınca başlangıçtaki iki terim bulunur."}
          </p>
        </div>
      )}
      <p className="f033-note">
        Keşif seçimleri bu cihazda saklanır. Şekli değiştirmek doğru cevap, konu
        tamamlanması veya ustalık kaydı oluşturmaz.
      </p>
    </section>
  );
}
