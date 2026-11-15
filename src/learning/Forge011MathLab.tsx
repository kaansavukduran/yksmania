import { useId } from "react";
import {
  ageShift,
  breakEvenModel,
  fractionSpending,
  priceLifecycle,
  seatingBalance,
  successivePercent,
} from "./forge011Math";
import { useExploration } from "./useExploration";
import "./forge011Math.css";

const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 4 }).format(
    Object.is(n, -0) ? 0 : n,
  );
const bound = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(n) ? Math.round(n) : min));
type Guess = { guess: string; reason: string; checked: boolean };
function Prediction({
  state,
  set,
  expected,
  explanation,
  options,
}: {
  state: Guess;
  set: (s: Partial<Guess>) => void;
  expected: string;
  explanation: string;
  options: [string, string][];
}) {
  const uid = useId(),
    valid = options.some(([key]) => key === state.guess);
  return (
    <div className="f011m-prediction">
      <label htmlFor={`${uid}-guess`}>Sonuç tahminin</label>
      <select
        id={`${uid}-guess`}
        value={valid ? state.guess : ""}
        onChange={(e) => set({ guess: e.target.value, checked: false })}
      >
        <option value="">Bir sonuç seç</option>
        {options.map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <label htmlFor={`${uid}-reason`}>Modelden gerekçen</label>
      <textarea
        id={`${uid}-reason`}
        rows={3}
        maxLength={120}
        value={state.reason.slice(0, 120)}
        onChange={(e) =>
          set({ reason: e.target.value.slice(0, 120), checked: false })
        }
        placeholder="Hangi tabanı veya değişmeyen ilişkiyi kullandın?"
      />
      <button
        className="secondary"
        disabled={!valid || !state.reason.trim()}
        onClick={() => set({ checked: true })}
      >
        Tahminimi karşılaştır
      </button>
      {state.checked && valid && (
        <div className="f011m-feedback" role="status">
          <strong>
            {state.guess === expected
              ? "Tahminin bu koşullarla uyumlu."
              : "Tahminini verilen koşullarla yeniden karşılaştır."}
          </strong>
          <p>{explanation}</p>
          <p>Senin gerekçen: {state.reason.slice(0, 120)}</p>
          <p className="small muted">
            Seçim model sonucu ile karşılaştırılır; yazdığın gerekçe otomatik
            olarak puanlanmaz.
          </p>
        </div>
      )}
    </div>
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
    <label className="field" htmlFor={uid}>
      {label}: <output>{fmt(value)}</output>
      <input
        id={uid}
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={fmt(value)}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
function Bars({
  values,
  labels,
  title,
}: {
  values: number[];
  labels: string[];
  title: string;
}) {
  const uid = useId(),
    max = Math.max(1, ...values),
    w = 430;
  return (
    <>
      <svg
        className="f011m-diagram"
        viewBox="0 0 500 200"
        role="img"
        aria-labelledby={`${uid}-title`}
      >
        <title id={`${uid}-title`}>
          {title}. {labels.map((l, i) => `${l}: ${fmt(values[i])}`).join("; ")}.
          Bütün çubuklar aynı ölçekle çizilir.
        </title>
        <path d="M35 15V185H475" className="f011m-axis" />
        {values.map((v, i) => (
          <g key={labels[i]} data-bar={i}>
            <rect
              x="36"
              y={24 + i * 53}
              width={(w * Math.max(0, v)) / max}
              height="30"
              rx="3"
              className={`f011m-bar f011m-bar-${i}`}
            />
            <path d={`M35 ${60 + i * 53}H475`} className="f011m-guide" />
          </g>
        ))}
      </svg>
      <dl className="f011m-legend">
        {labels.map((l, i) => (
          <div key={l}>
            <dt>
              <span
                className={`f011m-swatch f011m-bar-${i}`}
                aria-hidden="true"
              />
              {l}
            </dt>
            <dd>{fmt(values[i])}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function Seating() {
  const [s, set] = useExploration("forge011-math-seating", {
    seats: 8,
    standing: 2,
    empty: 2,
    guess: "",
    reason: "",
    checked: false,
  });
  const seats = bound(s.seats, 4, 20),
    standing = bound(s.standing, 0, 6),
    empty = bound(s.empty, 0, Math.min(6, seats));
  const r = seatingBalance(seats, standing, empty);
  const expected =
    r.difference === 0 ? "same" : r.difference > 0 ? "second" : "first";
  return (
    <>
      <h2>Aynı sınıfı iki düzende say</h2>
      <p>
        İlk düzende bütün sıralar ikişer dolu, ayrıca ayakta kalanlar var.
        İkinci düzende seçtiğin kadar sıra tamamen boş; diğerleri üçer dolu. İki
        düzenin aynı sınıfı anlatması için iki öğrenci toplamı eşit olmalı.
      </p>
      <div className="f011m-controls">
        <Range
          label="Toplam sıra sayısı"
          value={seats}
          min={4}
          max={20}
          onChange={(seats) => set({ seats, checked: false })}
        />
        <Range
          label="İlk düzende ayakta kalan"
          value={standing}
          min={0}
          max={6}
          onChange={(standing) => set({ standing, checked: false })}
        />
        <Range
          label="İkinci düzende boş sıra"
          value={empty}
          min={0}
          max={Math.min(6, seats)}
          onChange={(empty) => set({ empty, checked: false })}
        />
      </div>
      <Bars
        values={[r.first, r.second]}
        labels={[
          "İkişerli düzenin saydığı öğrenci",
          "Üçerli düzenin saydığı öğrenci",
        ]}
        title="İki oturma düzeninin öğrenci toplamları"
      />
      <div className="f011m-result" data-model-result>
        <p>
          İlk düzen: 2 × {seats} + {standing} ={" "}
          <strong>{r.first} öğrenci</strong>.
        </p>
        <p>
          İkinci düzen: 3 × ({seats} − {empty}) ={" "}
          <strong>{r.second} öğrenci</strong>.
        </p>
        <p>
          {r.difference === 0
            ? "İki toplam eşit: bu sıra değeri aynı sınıfı açıklıyor."
            : `Toplamlar farklı: ikinci düzen ${fmt(Math.abs(r.difference))} ${r.difference > 0 ? "fazla" : "eksik"} kişi sayıyor. Bu sıra değeri aynı sınıfı henüz açıklamıyor.`}
        </p>
        <p>
          Bu ayakta kalan ve boş sıra koşullarında denge için sıra sayısı{" "}
          {r.requiredSeats} olmalı: 2s + {standing} = 3(s − {empty}).
        </p>
      </div>
      <Prediction
        state={s}
        set={set}
        expected={expected}
        explanation={`İlk toplam ${r.first}, ikinci toplam ${r.second}. Eşitlemek, sıraları değil aynı kişileri iki biçimde saymaktır.`}
        options={[
          ["same", "İki düzen aynı sayıda öğrenci sayıyor."],
          ["first", "İkişerli düzen daha çok öğrenci sayıyor."],
          ["second", "Üçerli düzen daha çok öğrenci sayıyor."],
        ]}
      />
      <button
        className="secondary"
        onClick={() =>
          set({
            seats: 8,
            standing: 2,
            empty: 2,
            guess: "",
            reason: "",
            checked: false,
          })
        }
      >
        Dengeli örneğe dön
      </button>
      <p className="small muted">
        Çubuk uzunlukları hesaplanan insan sayılarını karşılaştırır; gerçek
        sınıfın mimarisi çizilmez. Boş sıra ve ayakta kalan koşulları değişirse
        denklem de değişir.
      </p>
    </>
  );
}
function Fraction() {
  const [s, set] = useExploration("forge011-math-fractions", {
    total: 120,
    first: 1,
    second: 2,
    reference: "remaining",
    guess: "",
    reason: "",
    checked: false,
  });
  const total = bound(s.total, 60, 240),
    first = bound(s.first, 0, 4),
    second = bound(s.second, 0, 3),
    reference = s.reference === "initial" ? "initial" : "remaining";
  const r = fractionSpending(total, first / 4, second / 3, reference),
    uid = useId();
  return (
    <>
      <h2>İkinci kesrin bütünü değişirse ne olur?</h2>
      <p>
        Önce başlangıcın {first}/4'ü kullanılıyor. İkinci kullanım {second}/3:
        bunu kalanın mı, başlangıcın mı kesri yapacağını seç. Kesir aynı
        kalırken referansı değiştirmenin etkisini karşılaştır.
      </p>
      <div className="f011m-controls">
        <Range
          label="Başlangıç miktarı"
          value={total}
          min={60}
          max={240}
          step={1}
          onChange={(total) => set({ total, checked: false })}
        />
        <Range
          label="İlk kullanımın payı (payda 4)"
          value={first}
          min={0}
          max={4}
          onChange={(first) => set({ first, checked: false })}
        />
        <Range
          label="İkinci kullanımın payı (payda 3)"
          value={second}
          min={0}
          max={3}
          onChange={(second) => set({ second, checked: false })}
        />
        <label className="field" htmlFor={`${uid}-reference`}>
          İkinci kesrin referansı
          <select
            id={`${uid}-reference`}
            value={reference}
            onChange={(e) => set({ reference: e.target.value, checked: false })}
          >
            <option value="remaining">Kalan miktar</option>
            <option value="initial">Başlangıç miktarı</option>
          </select>
        </label>
      </div>
      <svg
        className="f011m-diagram"
        viewBox="0 0 500 190"
        role="img"
        aria-labelledby={`${uid}-title`}
      >
        <title id={`${uid}-title`}>
          Başlangıç, ilk kalan ve son kalan çubukları.{" "}
          {r.valid
            ? `Son kalan ${fmt(r.remainder)} birim.`
            : "İstenen harcamalar bütünü aşıyor; uygulanabilir son kalan yok."}
        </title>
        <rect x="30" y="18" width="440" height="34" className="f011m-whole" />
        <rect x="30" y="72" width="440" height="34" className="f011m-empty" />
        <rect
          x={30 + (440 * first) / 4}
          y="72"
          width={440 * (1 - first / 4)}
          height="34"
          className="f011m-bar f011m-bar-1"
        />
        <rect x="30" y="126" width="440" height="34" className="f011m-empty" />
        {r.valid ? (
          <>
            <rect
              x="30"
              y="126"
              width={(440 * first) / 4}
              height="34"
              className="f011m-bar f011m-bar-0"
            />
            <rect
              x={30 + (440 * first) / 4}
              y="126"
              width={(440 * r.secondSpent) / total}
              height="34"
              className="f011m-bar f011m-bar-2"
            />
            <rect
              x={30 + (440 * (r.firstSpent + r.secondSpent)) / total}
              y="126"
              width={Math.max(0, (440 * r.remainder) / total)}
              height="34"
              className="f011m-bar f011m-bar-1"
            />
          </>
        ) : (
          <path d="M30 126L470 160M30 160L470 126" className="f011m-invalid" />
        )}
      </svg>
      <div className="f011m-result" data-model-result>
        <p>
          Üst çubuk: başlangıç <strong>{total} birim</strong>. Orta çubuk: ilk
          kullanımdan sonra <strong>{fmt(r.afterFirst)} birim</strong> kalır.
        </p>
        <p>
          İlk kullanım {fmt(r.firstSpent)}, ikinci kullanım {fmt(r.secondSpent)}{" "}
          birimdir. İkinci kesir{" "}
          {reference === "remaining" ? "ara kalan" : "başlangıç"} miktarına
          uygulanır.
        </p>
        <p>
          {r.valid ? (
            <>
              Son kalan: <strong>{fmt(r.remainder)} birim</strong>; başlangıcın{" "}
              {fmt(100 * r.finalFraction)}%'i.
            </>
          ) : (
            <>
              İstenen iki harcama bütünü aşıyor. {fmt(-r.remainder)} birim
              eksik; ek kaynak olmadan bu plan uygulanamaz. Alt çubuk bu yüzden
              bölümlere ayrılmadı.
            </>
          )}
        </p>
        <p>
          Alt çubukta ilk kullanım, ikinci kullanım ve kalan yan yana
          gösterilir. Parçalar mümkünse toplamı {total} olmalıdır.
        </p>
      </div>
      <Prediction
        state={s}
        set={set}
        expected={r.valid ? "possible" : "impossible"}
        explanation={
          r.valid
            ? `${fmt(r.firstSpent)} + ${fmt(r.secondSpent)} + ${fmt(r.remainder)} = ${total}; üç parça başlangıcı korur.`
            : `${fmt(r.firstSpent)} + ${fmt(r.secondSpent)} > ${total}; negatif kalan bir uygulanabilir stok değildir.`
        }
        options={[
          ["possible", "Ek kaynak olmadan uygulanabilir."],
          ["impossible", "Harcamalar başlangıcı aşıyor."],
        ]}
      />
      <button
        className="secondary"
        onClick={() =>
          set({
            total: 120,
            first: 1,
            second: 2,
            reference: "remaining",
            guess: "",
            reason: "",
            checked: false,
          })
        }
      >
        Kesir örneğini sıfırla
      </button>
    </>
  );
}
function Ages() {
  const [s, set] = useExploration("forge011-math-ages", {
    a: 30,
    b: 18,
    time: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const a = bound(s.a, 20, 60),
    b = bound(s.b, 0, Math.min(30, a)),
    time = bound(s.time, -30, 30),
    r = ageShift(a, b, time),
    uid = useId();
  const minTime = -30,
    maxTime = 30,
    maxAge = 100,
    posX = (t: number) => 40 + (t + 30) * 7,
    posY = (age: number) => 200 - age * 1.8;
  return (
    <>
      <h2>İki yaş aynı zaman çizgisinde</h2>
      <p>
        A ve B'nin bugünkü yaşlarını seç. Bu karşılaştırmada A, B'den küçük
        seçilmez. Zamanı ikisi için birlikte kaydır: farkı, oranı ve doğum
        sınırını ayrı denetle. Yaşlar tam geçen yıl modeliyle verilmiştir;
        belirli bir takvim günündeki tamamlanmış yaş hesaplanmaz.
      </p>
      <div className="f011m-controls">
        <Range
          label="A'nın bugünkü yaşı"
          value={a}
          min={20}
          max={60}
          onChange={(a) => set({ a, b: Math.min(b, a), checked: false })}
        />
        <Range
          label="B'nin bugünkü yaşı"
          value={b}
          min={0}
          max={Math.min(30, a)}
          onChange={(b) => set({ b, checked: false })}
        />
        <Range
          label="Bugüne göre zaman (yıl)"
          value={time}
          min={-30}
          max={30}
          onChange={(time) => set({ time, checked: false })}
        />
      </div>
      <div className="f011m-actions">
        <button
          className="secondary"
          onClick={() => set({ time: -(a - b), checked: false })}
          disabled={Math.abs(a - b) > 30}
        >
          A, B'nin bugünkü yaşındayken
        </button>
        <button
          className="secondary"
          onClick={() => set({ time: a - b, checked: false })}
          disabled={Math.abs(a - b) > 30}
        >
          B, A'nın bugünkü yaşına geldiğinde
        </button>
        <button
          className="secondary"
          onClick={() => set({ time: 0, checked: false })}
        >
          Bugüne dön
        </button>
      </div>
      <svg
        className="f011m-diagram"
        viewBox="0 0 500 240"
        role="img"
        aria-labelledby={`${uid}-title`}
      >
        <title id={`${uid}-title`}>
          Yatay eksen bugüne göre −30 ile 30 yıl; dikey eksen 0 ile {maxAge}{" "}
          yaş. A ve B'nin yaş doğruları aynı eğimde. Seçilen zaman {time} yıl.
        </title>
        <path d="M40 20V200H465" className="f011m-axis" />
        <path
          d={`M${posX(Math.max(minTime, -a))} ${posY(Math.max(0, a + minTime))}L${posX(maxTime)} ${posY(a + maxTime)}`}
          className="f011m-line-a"
        />
        <path
          d={`M${posX(Math.max(minTime, -b))} ${posY(Math.max(0, b + minTime))}L${posX(maxTime)} ${posY(b + maxTime)}`}
          className="f011m-line-b"
        />
        <path d={`M${posX(time)} 20V200`} className="f011m-guide" />
        {r.first >= 0 && (
          <circle
            cx={posX(time)}
            cy={posY(r.first)}
            r="5"
            className="f011m-point-a"
          />
        )}
        {r.second >= 0 && (
          <rect
            x={posX(time) - 5}
            y={posY(r.second) - 5}
            width="10"
            height="10"
            className="f011m-point-b"
          />
        )}
      </svg>
      <p className="small muted">
        Yuvarlak nokta A, kare B. İki çizginin ölçeği aynıdır. Doğumdan önceki
        kesimler çizilmez; dikey kesikli çizgi seçilen ortak zamanı gösterir.
      </p>
      <div className="f011m-result" data-model-result>
        <p>
          {time === 0
            ? "Bugün"
            : time < 0
              ? `${-time} yıl önce`
              : `${time} yıl sonra`}
          : {r.first >= 0 ? `A ${fmt(r.first)} yaşında.` : "A henüz doğmamış."}{" "}
          {r.second >= 0 ? `B ${fmt(r.second)} yaşında.` : "B henüz doğmamış."}
        </p>
        <p>
          {r.valid ? (
            <>
              Yaş farkı A − B: <strong>{fmt(r.difference)} yıl</strong>; bugün
              de {fmt(a - b)}. A/B oranı:{" "}
              {r.ratio === null
                ? "B'nin yaşı sıfır olduğu için tanımsız."
                : fmt(r.ratio)}
              .
            </>
          ) : (
            "İki kişiyi doğumdan sonraki aynı yaş grubuna bu tarihte katamayız; negatif cebirsel değer yaş kabul edilmez."
          )}
        </p>
        <p>
          Bugünkü yaşlar {a} ve {b}; ortak zaman kayması {time}. Farkta aynı iki
          zaman terimi birbirini götürür, bölümde götürmez.
        </p>
      </div>
      <Prediction
        state={s}
        set={set}
        expected={r.valid ? "difference" : "unborn"}
        explanation={
          r.valid
            ? `(${a}+${time})−(${b}+${time})=${a - b}; fark korunur. Oran için iki yeni yaş ayrı bölünür.`
            : "En az bir kişi bu tarihte henüz doğmamış; iki kişinin ortak doğum sonrası yaş modeli bu noktada uygulanmaz."
        }
        options={[
          ["difference", "İkisi de doğmuş; yaş farkı korunur."],
          ["unborn", "En az biri henüz doğmamış."],
        ]}
      />
      <button
        className="secondary"
        onClick={() =>
          set({ a: 30, b: 18, time: 0, guess: "", reason: "", checked: false })
        }
      >
        Yaş örneğini sıfırla
      </button>
    </>
  );
}
function Percentages() {
  const [s, set] = useExploration("forge011-math-percent", {
    base: 200,
    first: 20,
    second: -20,
    guess: "",
    reason: "",
    checked: false,
  });
  const base = bound(s.base, 50, 500),
    first = bound(s.first, -100, 100),
    second = bound(s.second, -100, 100),
    r = successivePercent(base, first, second);
  const expected = Math.abs(r.net) < 1e-8 ? "same" : r.net > 0 ? "up" : "down";
  return (
    <>
      <h2>İki yüzde, iki farklı taban</h2>
      <p>
        Her değişim bir önceki miktara uygulanır. Artı yüzde artışı, eksi yüzde
        azalışı seçer. İlk ara değeri ve son değeri aynı ölçekli çubuklarla
        karşılaştır; net değişimin paydası başlangıçtır.
      </p>
      <div className="f011m-controls">
        <Range
          label="Başlangıç değeri"
          value={base}
          min={50}
          max={500}
          step={1}
          onChange={(base) => set({ base, checked: false })}
        />
        <Range
          label="İlk değişim (%)"
          value={first}
          min={-100}
          max={100}
          onChange={(first) => set({ first, checked: false })}
        />
        <Range
          label="İkinci değişim (%)"
          value={second}
          min={-100}
          max={100}
          onChange={(second) => set({ second, checked: false })}
        />
      </div>
      <Bars
        values={[base, r.middle, r.final]}
        labels={["Başlangıç", "İlk değişim sonrası", "İkinci değişim sonrası"]}
        title="Ardışık yüzde değişimlerinin miktarları"
      />
      <div className="f011m-result" data-model-result>
        <p>
          {base} × (1 + {first}/100) = <strong>{fmt(r.middle)}</strong>. İkinci
          yüzde bu ara değere uygulanır.
        </p>
        <p>
          {fmt(r.middle)} × (1 + {second}/100) = <strong>{fmt(r.final)}</strong>
          .
        </p>
        <p>
          Başlangıca göre net değişim: <strong>{fmt(r.net)}%</strong>.{" "}
          {expected === "same"
            ? "Başlangıca dönüldü."
            : expected === "up"
              ? "Son değer başlangıçtan büyük."
              : "Son değer başlangıçtan küçük."}
        </p>
        <p>
          Değişim tutarları {fmt(r.middle - base)} ve {fmt(r.final - r.middle)}.
          Eşit yüzde sayıları, tabanlar farklıyken eşit tutar demek değildir.
        </p>
      </div>
      <Prediction
        state={s}
        set={set}
        expected={expected}
        explanation={`${fmt(1 + first / 100)} × ${fmt(1 + second / 100)} = ${fmt(r.final / base)}. Bu çarpanı 1 ile karşılaştır; net farkı başlangıç ${base}'e böl.`}
        options={[
          ["up", "Başlangıca göre artış var."],
          ["same", "Başlangıç değeri korunuyor."],
          ["down", "Başlangıca göre azalış var."],
        ]}
      />
      <button
        className="secondary"
        onClick={() =>
          set({
            base: 200,
            first: 20,
            second: -20,
            guess: "",
            reason: "",
            checked: false,
          })
        }
      >
        %20 artış ve azalışı dene
      </button>
      <p className="small muted">
        Bu modelde araya sabit ücret veya yuvarlama girmez. Başlangıç
        pozitiftir; %100 azalış sıfıra indirir. Miktarı sıfıra indiren bir adım
        ters bölmeyle geri alınamaz.
      </p>
    </>
  );
}
function Profit() {
  const [s, set] = useExploration("forge011-math-profit", {
    cost: 200,
    markup: 50,
    discount: 20,
    count: 40,
    mode: "price",
    guess: "",
    reason: "",
    checked: false,
  });
  const cost = bound(s.cost, 50, 500),
    markup = bound(s.markup, 0, 100),
    discount = bound(s.discount, 0, 100),
    count = bound(s.count, 0, 80),
    mode = s.mode === "break" ? "break" : "price";
  const r = priceLifecycle(cost, markup, discount),
    be = breakEvenModel(600, 20, 35, count),
    gain = mode === "price" ? r.gain : be.gain;
  const expected = Math.abs(gain) < 1e-8 ? "equal" : gain > 0 ? "gain" : "loss",
    uid = useId();
  return (
    <>
      <h2>Etiket başka, gerçek kâr başka</h2>
      <p>
        Maliyet ve satış aynı kapsamda karşılaştırılır. Fiyat yolunda maliyet →
        etiket → indirimli satış adımlarını izle. Başabaş yolunda sabit gideri
        karşılayan ürün sayısını bul; eşitlik ile kesin kârı ayır.
      </p>
      <label className="field" htmlFor={`${uid}-mode`}>
        İncelenecek ilişki
        <select
          id={`${uid}-mode`}
          value={mode}
          onChange={(e) =>
            set({ mode: e.target.value, guess: "", checked: false })
          }
        >
          <option value="price">Etiket ve indirim</option>
          <option value="break">Sabit gider ve başabaş</option>
        </select>
      </label>
      {mode === "price" ? (
        <>
          <div className="f011m-controls">
            <Range
              label="Maliyet (TL)"
              value={cost}
              min={50}
              max={500}
              onChange={(cost) => set({ cost, checked: false })}
            />
            <Range
              label="Etiket için hedef kâr (%)"
              value={markup}
              min={0}
              max={100}
              onChange={(markup) => set({ markup, checked: false })}
            />
            <Range
              label="Etikete indirim (%)"
              value={discount}
              min={0}
              max={100}
              onChange={(discount) => set({ discount, checked: false })}
            />
          </div>
          <Bars
            values={[cost, r.label, r.sale]}
            labels={["Maliyet (TL)", "Etiket (TL)", "Gerçek satış (TL)"]}
            title="Maliyet, etiket ve indirimli satış karşılaştırması"
          />
          <div className="f011m-result" data-model-result>
            <p>
              Maliyet <strong>{cost} TL</strong> → etiket{" "}
              <strong>{fmt(r.label)} TL</strong> → gerçek satış{" "}
              <strong>{fmt(r.sale)} TL</strong>.
            </p>
            <p>
              {expected === "equal"
                ? "Başabaş: gelir maliyete eşit."
                : expected === "gain"
                  ? `Kâr: ${fmt(r.gain)} TL; maliyete göre ${fmt(r.rate)}%.`
                  : `Zarar: ${fmt(-r.gain)} TL; maliyete göre ${fmt(-r.rate)}%.`}
            </p>
            <p>
              Zarar etmeden etiket indiriminin üst sınırı {fmt(r.maxDiscount)}%.
              Satışa göre marj{" "}
              {r.margin === null
                ? "satış sıfır olduğu için tanımsızdır."
                : `${fmt(r.margin)}%; maliyet tabanlı kâr yüzdesinden farklıdır.`}
            </p>
          </div>
        </>
      ) : (
        <>
          <p>
            Sabit gider 600 TL; birim üretim maliyeti 20 TL, birim satış 35 TL.
            Bütün ürünler üretilip satılır. Her ürün sabit gidere 15 TL katkı
            verir.
          </p>
          <Range
            label="Üretilip satılan adet"
            value={count}
            min={0}
            max={80}
            onChange={(count) => set({ count, checked: false })}
          />
          <svg
            className="f011m-diagram"
            viewBox="0 0 500 250"
            role="img"
            aria-labelledby={`${uid}-title`}
          >
            <title id={`${uid}-title`}>
              Yatay eksen 0 ile 80 adet, dikey eksen 0 ile 2800 TL. Gelir 35n
              ile maliyet 600+20n, 40 adette 1400 TL'de kesişir.
            </title>
            <path d="M35 15V220H475" className="f011m-axis" />
            <path d="M35 220L475 20" className="f011m-line-a" />
            <path
              d={`M35 ${220 - 600 / 14}L475 ${220 - 2200 / 14}`}
              className="f011m-line-b"
            />
            <path d={`M${35 + count * 5.5} 15V220`} className="f011m-guide" />
            <circle
              cx={35 + count * 5.5}
              cy={220 - be.revenue / 14}
              r="5"
              className="f011m-point-a"
            />
            <rect
              x={35 + count * 5.5 - 5}
              y={220 - be.cost / 14 - 5}
              width="10"
              height="10"
              className="f011m-point-b"
            />
          </svg>
          <p className="small muted">
            Daire ve düz çizgi gelir; kare ve kesikli çizgi maliyet. Aynı adet
            ve tutar ölçeği kullanılır. İlk pozitif kâr 41 adette; 40 adette iki
            tutar eşittir.
          </p>
          <div className="f011m-result" data-model-result>
            <p>
              {count} adet: gelir <strong>{fmt(be.revenue)} TL</strong>, toplam
              maliyet <strong>{fmt(be.cost)} TL</strong>.
            </p>
            <p>
              {expected === "equal"
                ? "Başabaş: kâr 0 TL."
                : expected === "gain"
                  ? `Kâr: ${fmt(be.gain)} TL.`
                  : `Zarar: ${fmt(-be.gain)} TL.`}
            </p>
            <p>
              35n = 600 + 20n ⇒ n = {be.exact}. Kesin kâr için n &gt; 40; ilk
              tam adet {be.firstProfit}.
            </p>
          </div>
        </>
      )}
      <Prediction
        state={s}
        set={set}
        expected={expected}
        explanation={
          mode === "price"
            ? `Gerçek sonuç ${fmt(r.sale)} − ${cost} = ${fmt(r.gain)} TL. Yüzde, etiket veya satışa değil maliyete bölünür.`
            : `35 × ${count} − (600 + 20 × ${count}) = ${fmt(be.gain)} TL. Başabaşta fark sıfırdır, kesin kâr değildir.`
        }
        options={[
          ["gain", "Kâr var."],
          ["equal", "Başabaş."],
          ["loss", "Zarar var."],
        ]}
      />
      <button
        className="secondary"
        onClick={() =>
          set({
            cost: 200,
            markup: 50,
            discount: 20,
            count: 40,
            mode: "price",
            guess: "",
            reason: "",
            checked: false,
          })
        }
      >
        Fiyat örneğini sıfırla
      </button>
    </>
  );
}
export default function Forge011MathLab({ id }: { id: string }) {
  return (
    <section className="forge011-math-lab" data-forge011={id}>
      {id === "sayi-problemleri" ? (
        <Seating />
      ) : id === "kesir-problemleri" ? (
        <Fraction />
      ) : id === "yas-problemleri" ? (
        <Ages />
      ) : id === "yuzde-problemleri" ? (
        <Percentages />
      ) : (
        <Profit />
      )}
      <p className="f011m-limit">
        Seçimlerin ve gerekçen bu cihazda keşif kaydı olarak saklanır. Modelleri
        kullanmak veya tahmini kontrol etmek soru puanı, ustalık ya da konu
        tamamlanması oluşturmaz.
      </p>
    </section>
  );
}
