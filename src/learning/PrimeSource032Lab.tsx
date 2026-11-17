import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  prime032Factors,
  prime032Sieve,
  prime032SieveBases,
} from "./primeSource032Model";
import "./primeSource032.css";
const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(n);
export default function PrimeSource032Lab({
  id: lessonId,
}: { id?: string } = {}) {
  const id = useId();
  const [s, set] = useExploration("p032:sieve", {
    stage: 0,
    selected: 2,
    pair: 0,
  });
  const m = prime032Sieve(s.stage),
    f = prime032Factors(s.selected),
    pairIndex = Number.isFinite(s.pair)
      ? Math.max(0, Math.min(f.pairs.length - 1, Math.round(s.pair)))
      : 0,
    pair = f.pairs[pairIndex];
  const next = prime032SieveBases[m.stage];
  const nextName = next === 3 ? "3’ün" : next === 5 ? "5’in" : `${next}’nin`;
  const grid = f.n <= 25 ? { cols: pair[1], rows: pair[0] } : null;
  return (
    <section
      className="visual-lab p032-lab"
      aria-labelledby={id}
      data-lesson-id={lessonId ?? "tyt-mat-asal-kaynak-032"}
    >
      <div className="lab-heading">
        <h2 id={id}>Asalları elekle keşfet</h2>
        <p>
          1’den 50’ye kadar sayıları adım adım incele. Her adımda seçilen asalın
          kendisini koruyup ondan büyük katlarını ele. Bir sayıya dokunarak
          bölenlerini ve çarpan çiftlerini görebilirsin.
        </p>
      </div>
      <div className="p032-steps" role="group" aria-label="Elek adımları">
        {next ? (
          <button
            type="button"
            className="primary"
            onClick={() => set({ stage: m.stage + 1 })}
          >
            {nextName} katlarını ele
          </button>
        ) : (
          <p role="status">Elek tamamlandı: 15 asal sayı bulundu.</p>
        )}
        <button
          type="button"
          className="secondary"
          disabled={m.stage === 0}
          onClick={() => set({ stage: m.stage - 1 })}
        >
          Önceki elek adımı
        </button>
        <button
          type="button"
          className="secondary"
          disabled={m.stage === 0}
          onClick={() => set({ stage: 0 })}
        >
          Eleği başa al
        </button>
      </div>
      <p className="p032-progress" role="status">
        {m.stage}/4 adım · {m.eliminated} bileşik sayı elendi.
        {m.stage > 0
          ? ` ${m.bases.join(", ")} ile kontrol edildi.`
          : " Henüz katlar elenmedi."}
      </p>
      <p className="p032-key">
        ×: Bileşik olduğu kanıtlandı. ✓: Elek sonunda asal olduğu kanıtlandı.
        İşaretsiz: Bu elek adımında henüz işaretlenmedi. 1 her aşamada ayrı
        tutulur.
      </p>
      <div
        className="p032-grid"
        role="group"
        aria-label="1 ile 50 arasındaki sayı eleği"
      >
        {m.cells.map((c) => {
          const status =
            c.n === 1
              ? "ne asal ne bileşik"
              : c.eliminatedBy
                ? `${c.eliminatedBy} ile elendi, bileşik`
                : c.primeProven
                  ? "asal olduğu kanıtlandı"
                  : "henüz elenmedi";
          return (
            <button
              type="button"
              key={c.n}
              className={`secondary p032-number ${c.eliminatedBy ? "p032-composite" : ""} ${c.primeProven ? "p032-prime" : ""}`}
              aria-label={`${c.n}: ${status}`}
              aria-pressed={f.n === c.n}
              onClick={() => set({ selected: c.n, pair: 0 })}
              data-number={c.n}
              data-eliminated-by={c.eliminatedBy ?? ""}
              data-prime-proven={c.primeProven ? "true" : "false"}
            >
              <span>{c.n}</span>
              <span className="p032-mark" aria-hidden="true">
                {c.n === 1
                  ? "—"
                  : c.eliminatedBy
                    ? "×"
                    : c.primeProven
                      ? "✓"
                      : ""}
              </span>
            </button>
          );
        })}
      </div>
      <p className="p032-insight">
        {m.stage === 0
          ? "Önce 1’i ayır. 1’in yalnız bir pozitif böleni vardır; asal sayı ise iki farklı pozitif bölen ister."
          : m.stage === 1
            ? "2 korunur. 2’nin kendisi asal olduğu için 2’yi değil, 4, 6, 8… gibi daha büyük katlarını eledik."
            : m.stage === 2
              ? "3 korunur. 6 gibi bazı sayılar zaten elenmiştir; aynı sayıyı yeniden saymayız. 9, 15, 21… gibi yeni bileşikleri de buluruz."
              : m.stage === 3
                ? "5 korunur. 5’in katlarından 10 ve 15 zaten elenmişti; 25 ve 35 gibi sayılar da bu adımda elenir."
                : "7 korunur, 49 da elenir. √50 yaklaşık 7,07 olduğundan, 50’yi geçmeyen bileşik bir sayının mutlaka 7’yi geçmeyen bir asal böleni vardır. Bu yüzden 2, 3, 5 ve 7 yeterlidir; kalan 15 sayı asaldır."}
      </p>
      <section className="p032-detail" aria-labelledby={`${id}-number`}>
        <h3 id={`${id}-number`}>{f.n} sayısını incele</h3>
        <p className="p032-verdict">
          {f.prime
            ? `${f.n} asaldır: tam olarak iki pozitif böleni vardır.`
            : f.composite
              ? `${f.n} bileşiktir. 1 ve ${f.n} dışında da böleni vardır.`
              : "1 ne asaldır ne bileşiktir; yalnız bir pozitif böleni vardır."}
        </p>
        <dl className="p032-facts">
          <div>
            <dt>Pozitif bölenler</dt>
            <dd>{f.divisors.join(", ")}</dd>
          </div>
          <div>
            <dt>Farklı pozitif bölen sayısı</dt>
            <dd>{f.divisors.length}</dd>
          </div>
          <div>
            <dt>Seçilen çarpan çifti</dt>
            <dd>
              {pair[0]} × {pair[1]} = {f.n}
            </dd>
          </div>
        </dl>
        <div
          className="p032-pairs"
          role="group"
          aria-label={`${f.n} sayısının çarpan çiftleri`}
        >
          {f.pairs.map(([a, b], i) => (
            <button
              type="button"
              className="secondary"
              key={a}
              aria-pressed={pairIndex === i}
              onClick={() => set({ pair: i })}
            >
              {a} × {b}
            </button>
          ))}
        </div>
        {grid ? (
          <svg
            role="img"
            aria-label={`${grid.rows} satır ve ${grid.cols} sütunda toplam ${f.n} eş kare; ${pair[0]} çarpı ${pair[1]}.`}
            className="p032-array"
            viewBox={`0 0 ${Math.max(grid.cols, 5) * 28 + 16} ${grid.rows * 28 + 16}`}
          >
            <g transform="translate(8 8)">
              {Array.from({ length: f.n }, (_, i) => (
                <rect
                  key={i}
                  x={(i % grid.cols) * 28}
                  y={Math.floor(i / grid.cols) * 28}
                  width={26}
                  height={26}
                />
              ))}
            </g>
          </svg>
        ) : (
          <p className="p032-factor-equation">
            {pair[0]} × {pair[1]} = {f.n}
          </p>
        )}
        <p>
          {f.prime
            ? "Asal sayının yalnız 1×kendisi çarpan çifti vardır. Daha küçük iki pozitif tam sayıyla yeni bir dikdörtgen oluşturamazsın."
            : f.composite
              ? "Çarpan çiftlerini değiştir. Bir sayının birden fazla çarpan çifti olması, asal olmadığını gösterir; ekrandaki dikdörtgenler aynı toplam kare sayısını korur."
              : "1×1 yalnız bir kare verir. Burada iki çarpan yazmak iki farklı bölen bulunduğu anlamına gelmez."}{" "}
          Bir bölen çifti a·b=n ise en az biri √n’yi geçmez; ikisi de √n’den
          büyük olsaydı çarpımları n’den büyük olurdu.
        </p>
        <p>
          Bu sayıda √{f.n} ≈{fmt(Math.sqrt(f.n))}. Asallık ararken bu sınıra
          kadar asal bölenleri denemek yeterlidir; bütün sayıları bölmeye gerek
          yoktur.
        </p>
      </section>
      <p className="p032-footnote">
        Elek ve çarpan modeli bir keşif aracıdır. Düğmelere basmak doğru cevap,
        ustalık ya da XP oluşturmaz. Seçimlerin bu cihazda saklanır.
      </p>
    </section>
  );
}
