import { useId, type ReactNode } from "react";
import {
  interestModel,
  mixtureModel,
  workerStages,
  poolFlow,
  relativeMotion,
} from "./forge012Math";
import { useExploration } from "./useExploration";
import "./forge012Math.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
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
    <div className="f012m-prediction">
      <label htmlFor={`${uid}-guess`}>Sonuç tahminin</label>
      <ChoiceSelect
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
      </ChoiceSelect>
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
        <div className="f012m-feedback" role="status">
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
function Drawing({ title, children }: { title: string; children: ReactNode }) {
  const uid = useId();
  return (
    <svg
      className="f012m-diagram"
      viewBox="0 0 500 230"
      role="img"
      aria-labelledby={`${uid}-title`}
    >
      <title id={`${uid}-title`}>{title}</title>
      {children}
    </svg>
  );
}
function Interest() {
  const uid = useId();
  const [s, set] = useExploration("forge012-math-interest", {
    principal: 5000,
    rate: 10,
    months: 24,
    compound: false,
    guess: "",
    reason: "",
    checked: false,
  });
  const principal = bound(s.principal, 1000, 10000),
    rate = bound(s.rate, 0, 30),
    months = bound(s.months, 0, 60),
    m = interestModel(principal, rate, months, s.compound),
    max = interestModel(principal, rate, 60, true).total;
  const y = (amount: number) => 200 - (170 * amount) / Math.max(1, max),
    x = (month: number) => 35 + (430 * month) / 60;
  const curve = (compound: boolean) =>
    Array.from(
      { length: 61 },
      (_, i) =>
        `${i ? "L" : "M"}${x(i)},${y(interestModel(principal, rate, i, compound).total)}`,
    ).join(" ");
  const update = (v: Partial<typeof s>) => set({ ...v, checked: false });
  return (
    <>
      <h3>Faizin tabanını değiştir</h3>
      <p>
        Başlangıç parasını, yıllık oranı ve süreyi değiştir. Basit modelde her
        dönem ilk anaparayı, bileşik modelde her tam yılın sonunda büyüyen
        bakiyeyi kullanır.
      </p>
      <div className="f012m-controls">
        <Range
          label="Anapara (TL)"
          value={principal}
          min={1000}
          max={10000}
          step={500}
          onChange={(n) => update({ principal: n })}
        />
        <Range
          label="Yıllık faiz (%)"
          value={rate}
          min={0}
          max={30}
          onChange={(n) => update({ rate: n })}
        />
        <Range
          label="Bekleme süresi (ay)"
          value={months}
          min={0}
          max={60}
          onChange={(n) => update({ months: n })}
        />
        <label className="field" htmlFor={`${uid}-mode`}>
          Faiz kuralı
          <ChoiceSelect
            id={`${uid}-mode`}
            value={s.compound ? "compound" : "simple"}
            onChange={(e) =>
              update({ compound: e.target.value === "compound" })
            }
          >
            <option value="simple">Basit: ilk anapara sabit</option>
            <option value="compound">Bileşik: yıl sonu yeniden yatır</option>
          </ChoiceSelect>
        </label>
      </div>
      <div className="f012m-diagram-key" data-interest-axes>
        <p>
          <strong>Yatay eksen: zaman (ay)</strong> · Soldan sağa işaretler: 0 ·
          12 · 24 · 36 · 48 · 60.
        </p>
        <p>
          <strong>Düşey eksen: son tutar (TL)</strong> · Alttan üste işaretler:
          0 · {fmt(max / 2)} · {fmt(max)}.
        </p>
        <p>
          Seçili nokta:{" "}
          <strong>
            {fmt(months)} ay, {fmt(m.total)} TL
          </strong>
          . Başlangıç tutarı {fmt(principal)} TL.
        </p>
      </div>
      <Drawing
        title={`Son tutar-zaman. Yatay 0–60 ay; iki eğri aynı ölçekle. Seçilen sonuç ${fmt(m.total)} TL.`}
      >
        <path d="M35 20V200H470" className="f012m-axis" />
        {[0, 12, 24, 36, 48, 60].map((month) => (
          <path
            key={month}
            data-interest-time-tick={month}
            d={`M${x(month)} 196V204`}
            className="f012m-axis"
          />
        ))}
        {[0, max / 2, max].map((value) => (
          <path
            key={value}
            data-interest-money-tick={value}
            d={`M31 ${y(value)}H39`}
            className="f012m-axis"
          />
        ))}
        <path data-curve="simple" d={curve(false)} className="f012m-line-a" />
        <path data-curve="compound" d={curve(true)} className="f012m-line-b" />
        <path d={`M${x(months)} 200V${y(m.total)}`} className="f012m-guide" />
        <circle
          data-interest-point
          cx={x(months)}
          cy={y(m.total)}
          r="6"
          className={s.compound ? "f012m-point-b" : "f012m-point-a"}
        />
      </Drawing>
      <div className="f012m-result" data-model-result>
        <strong>{s.compound ? "Yıllık bileşik" : "Basit"} faiz</strong>
        <p>
          {fmt(months)} ay; faiz {fmt(m.interest)} TL; son tutar {fmt(m.total)}{" "}
          TL.
        </p>
        <p>
          Anapara {fmt(principal)} TL + getiri {fmt(m.interest)} TL ={" "}
          {fmt(m.total)} TL.
        </p>
      </div>
      <p className="small muted">
        Koral düz çizgi basit, mint kesikli çizgi yıllık bileşik tutardır. Ara
        aylar, son tamamlanmış yılın bakiyesine orantılı basit faiz uygular; bu
        açık model koşuludur. Vergi/komisyon yoktur; gerçek ürün önerisi
        değildir.
      </p>
      <Prediction
        state={s}
        set={set}
        expected={s.compound && months > 12 && rate > 0 ? "greater" : "same"}
        explanation="İlk tam yıl ve önceki sürelerde taban aynıdır. Pozitif oranda ilk yıl faizi sonraki dönemde yeniden faizlendiğinde bileşik tutar büyür. Sıfır oran veya sıfır sürede artış yoktur."
        options={[
          ["same", "Bu seçim basit faizle aynı sonucu verir"],
          ["greater", "Bu seçim basit faizden büyük sonuç verir"],
        ]}
      />
    </>
  );
}
function Mixture() {
  const uid = useId();
  const [s, set] = useExploration("forge012-math-mixture", {
    percent: 20,
    amount: 50,
    operation: "water",
    guess: "",
    reason: "",
    checked: false,
  });
  const percent = bound(s.percent, 20, 50),
    amount = bound(s.amount, 0, 100),
    operation = ["water", "solute", "evaporate", "replace"].includes(
      s.operation,
    )
      ? (s.operation as "water" | "solute" | "evaporate" | "replace")
      : "water",
    m = mixtureModel(200, percent, amount, operation),
    max = Math.max(200, m.mass),
    scale = 420 / max;
  const update = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const expected =
    m.percent! > percent + 1e-8
      ? "up"
      : m.percent! < percent - 1e-8
        ? "down"
        : "same";
  return (
    <>
      <h3>Karışımın iki hesabını birlikte tut</h3>
      <p>
        Başlangıç 200 gram homojen tuzlu sudur. İşlem seçimi tuz ve toplam
        kütlenin hangisinin değiştiğini belirler. Koral bölüm tuz, kesikli mint
        bölüm sudur; iki çubuk aynı kütle ölçeğindedir.
      </p>
      <div className="f012m-controls">
        <Range
          label="Başlangıç tuzu (%)"
          value={percent}
          min={20}
          max={50}
          onChange={(n) => update({ percent: n })}
        />
        <Range
          label="İşlem miktarı (g)"
          value={amount}
          min={0}
          max={100}
          onChange={(n) => update({ amount: n })}
        />
        <label className="field" htmlFor={`${uid}-operation`}>
          Yapılan işlem
          <ChoiceSelect
            id={`${uid}-operation`}
            value={operation}
            onChange={(e) => update({ operation: e.target.value })}
          >
            <option value="water">Saf su ekle</option>
            <option value="solute">Saf tuz ekle</option>
            <option value="evaporate">Yalnız su buharlaştır</option>
            <option value="replace">
              Homojen karışım al, yerine aynı kütle su koy
            </option>
          </ChoiceSelect>
        </label>
      </div>
      <Drawing
        title={`Önce 200 g,%${percent}. Sonra ${fmt(m.mass)} g,%${fmt(m.percent!)}. Tuz ${fmt(m.solute)} g.`}
      >
        {[
          { solute: m.initialSolute, mass: 200 },
          { solute: m.solute, mass: m.mass },
        ].map((r, i) => (
          <g key={i} data-mixture-stage={i}>
            <rect
              x="35"
              y={40 + i * 85}
              width={r.mass * scale}
              height="45"
              className="f012m-empty"
            />
            <rect
              data-solute
              x="35"
              y={40 + i * 85}
              width={r.solute * scale}
              height="45"
              className="f012m-bar-0"
            />
            <rect
              x={35 + r.solute * scale}
              y={40 + i * 85}
              width={(r.mass - r.solute) * scale}
              height="45"
              className="f012m-water"
            />
          </g>
        ))}
      </Drawing>
      <dl className="f012m-stage-key" data-mixture-key>
        <div>
          <dt>Başlangıç · üst çubuk</dt>
          <dd>
            200 g: {fmt(m.initialSolute)} g tuz + {fmt(200 - m.initialSolute)} g
            su.
          </dd>
        </div>
        <div>
          <dt>İşlem sonrası · alt çubuk</dt>
          <dd>
            {fmt(m.mass)} g: {fmt(m.solute)} g tuz + {fmt(m.water)} g su.
          </dd>
        </div>
      </dl>
      <div className="f012m-result" data-model-result>
        <strong>Son tuz yüzdesi: %{fmt(m.percent!)}</strong>
        <p>
          Tuz {fmt(m.solute)} g; su {fmt(m.water)} g; toplam {fmt(m.mass)} g.
        </p>
        <p>
          Başlangıç tuzu {fmt(m.initialSolute)} g idi. İşlem miktarı{" "}
          {fmt(amount)} g.
        </p>
      </div>
      <p className="small muted">
        Dökülen kısım homojendir. Buharlaşmada yalnız su uçar. Tuz tamamen
        çözünür; çökelme veya başka madde kaybı modellenmez.
      </p>
      <Prediction
        state={s}
        set={set}
        expected={expected}
        explanation="Saf su yalnız toplamı büyütür; saf tuz hem tuzu hem toplamı artırır. Yalnız su uçunca tuz sabit kalır. Homojen alıp yerine su koymada önce tuz da çıkar, sonra yalnız su geri gelir."
        options={[
          ["up", "Tuz yüzdesi artar"],
          ["down", "Tuz yüzdesi azalır"],
          ["same", "Tuz yüzdesi aynı kalır"],
        ]}
      />
    </>
  );
}
function Workers() {
  const uid = useId();
  const [s, set] = useExploration("forge012-math-workers", {
    a: 12,
    b: 18,
    first: 2,
    second: "b",
    guess: "",
    reason: "",
    checked: false,
  });
  const a = bound(s.a, 6, 24),
    b = bound(s.b, 6, 24),
    first = bound(s.first, 0, 6),
    second = ["a", "b", "both"].includes(s.second)
      ? (s.second as "a" | "b" | "both")
      : "b",
    m = workerStages(a, b, first, second),
    secondA =
      m.remaining *
      (second === "a" ? 1 : second === "b" ? 0 : 1 / a / (1 / a + 1 / b)),
    secondB = m.remaining - secondA;
  const update = (v: Partial<typeof s>) => set({ ...v, checked: false });
  return (
    <>
      <h3>Kim hangi evrede çalışıyor?</h3>
      <p>
        İlk evrede iki çalışan birlikte. Belirlediğin anda A, B veya ikisi devam
        eder. Aynı iş, sabit bağımsız hız; hedef bitince çalışma durur.
      </p>
      <div className="f012m-controls">
        <Range
          label="A tek başına süre (saat)"
          value={a}
          min={6}
          max={24}
          onChange={(n) => update({ a: n })}
        />
        <Range
          label="B tek başına süre (saat)"
          value={b}
          min={6}
          max={24}
          onChange={(n) => update({ b: n })}
        />
        <Range
          label="Birlikte ilk evre (saat)"
          value={first}
          min={0}
          max={6}
          onChange={(n) => update({ first: n })}
        />
        <label className="field" htmlFor={`${uid}-second`}>
          İkinci evrede çalışan
          <ChoiceSelect
            id={`${uid}-second`}
            value={second}
            onChange={(e) => update({ second: e.target.value })}
          >
            <option value="a">Yalnız A</option>
            <option value="b">Yalnız B</option>
            <option value="both">A ve B birlikte</option>
          </ChoiceSelect>
        </label>
      </div>
      <Drawing
        title={`İlk evre ve tamamlanan iş. Koral A,mint B; ilk pay${fmt(m.firstA + m.firstB)},ek süre${fmt(m.extra)} saat.`}
      >
        <rect x="35" y="40" width="430" height="45" className="f012m-empty" />
        <rect
          x="35"
          y="40"
          width={430 * m.firstA}
          height="45"
          className="f012m-bar-0"
        />
        <rect
          x={35 + 430 * m.firstA}
          y="40"
          width={430 * m.firstB}
          height="45"
          className="f012m-water"
        />
        <rect
          x="35"
          y="135"
          width={430 * (m.firstA + secondA)}
          height="45"
          className="f012m-bar-0"
        />
        <rect
          data-worker-final-b
          x={35 + 430 * (m.firstA + secondA)}
          y="135"
          width={430 * (m.firstB + secondB)}
          height="45"
          className="f012m-water"
        />
      </Drawing>
      <div className="f012m-diagram-key" data-worker-key>
        <p className="f012m-color-key">
          <span>
            <i aria-hidden="true" className="f012m-key-a" />A çalışanı: koral
            bölüm
          </span>
          <span>
            <i aria-hidden="true" className="f012m-key-b" />B çalışanı: kesikli
            mint bölüm
          </span>
        </p>
        <p>
          Üst çubuk ilk evrede yapılan işi, alt çubuk tamamlanmış işin
          paylaşımını gösterir.
        </p>
        <p>
          İlk evre: A %{fmt(m.firstA * 100)}, B %{fmt(m.firstB * 100)}. Tam
          bitişte: A %{fmt((m.firstA + secondA) * 100)}, B %
          {fmt((m.firstB + secondB) * 100)}.
        </p>
      </div>
      <div className="f012m-result" data-model-result>
        <strong>Toplam süre: {fmt(m.total)} saat</strong>
        <p>
          İlk evre: {fmt(m.actualFirst)} saat; yapılan iş %
          {fmt(100 * (m.firstA + m.firstB))}. Kalan %{fmt(100 * m.remaining)}.
        </p>
        <p>
          İkinci evre: {fmt(m.extra)} saat.{" "}
          {m.finishedBeforeChange
            ? "İş, seçilen değişim anından önce veya tam o anda bitti; sonraki evre gerekmez."
            : "Kalan iş yalnız seçilen aktif çalışanlarla tamamlandı."}
        </p>
      </div>
      <p className="small muted">
        Üst çubuk ilk evreyi, alt çubuk tam bitişte A ve B’nin toplam
        katkılarını gösterir. Ondalık saatler dakika değildir: 0,5 saat 30
        dakikadır.
      </p>
      <Prediction
        state={s}
        set={set}
        expected={m.finishedBeforeChange ? "done" : "more"}
        explanation="İlk evre süresi toplam hızla çarpılır. İş 1’e ulaşırsa sonraki evre gerçekleşmez; ulaşmadıysa kalan 1−yapılan pay yeni etkin hıza bölünür."
        options={[
          ["done", "İlk evre işi bitirmeye yetti"],
          ["more", "İlk evreden sonra kalan iş var"],
        ]}
      />
    </>
  );
}
function Pool() {
  const [s, set] = useExploration("forge012-math-pool", {
    start: 200,
    input: 20,
    output: 5,
    minutes: 20,
    guess: "",
    reason: "",
    checked: false,
  });
  const start = bound(s.start, 0, 800),
    input = bound(s.input, 0, 40),
    output = bound(s.output, 0, 40),
    minutes = bound(s.minutes, 0, 120),
    m = poolFlow(800, start, input, output, minutes);
  const update = (v: Partial<typeof s>) => set({ ...v, checked: false });
  return (
    <>
      <h3>Havuzdaki suyu negatif yapmadan izle</h3>
      <p>
        Kapasite 800 litre. Başlangıç suyunu, giriş ve çıkış debisini değiştir;
        süre çubuğu tank içindeki gerçek hacmi gösterir. Çıkış yalnız
        bulabildiği suyu akıtabilir.
      </p>
      <div className="f012m-controls">
        <Range
          label="Başlangıç suyu (L)"
          value={start}
          min={0}
          max={800}
          step={100}
          onChange={(n) => update({ start: n })}
        />
        <Range
          label="Giriş debisi (L/dk)"
          value={input}
          min={0}
          max={40}
          onChange={(n) => update({ input: n })}
        />
        <Range
          label="Çıkış debisi (L/dk)"
          value={output}
          min={0}
          max={40}
          onChange={(n) => update({ output: n })}
        />
        <Range
          label="Geçen süre (dakika)"
          value={minutes}
          min={0}
          max={120}
          step={5}
          onChange={(n) => update({ minutes: n })}
        />
      </div>
      <Drawing
        title={`Tank${fmt(m.volume)} litre,%${fmt(m.fraction * 100)} dolu; net${fmt(m.net)} L/dk.`}
      >
        <path d="M100 25V205H350V25" className="f012m-axis" />
        <rect
          data-water-level
          x="102"
          y={203 - 176 * m.fraction}
          width="246"
          height={176 * m.fraction}
          className="f012m-water"
        />
        <path d="M60 20H140V50m-8-10 8 10 8-10" className="f012m-line-a" />
        <path d="M350 180H405v25m-8-10 8 10 8-10" className="f012m-line-b" />
        <path
          d={`M96 ${203 - (176 * start) / 800}H354`}
          className="f012m-guide"
        />
      </Drawing>
      <div className="f012m-result" data-model-result>
        <strong>
          {fmt(minutes)}. dakika: {fmt(m.volume)} L · %{fmt(100 * m.fraction)}
        </strong>
        <p>
          Net debi {fmt(m.net)} L/dk.{" "}
          {m.fillTime === null
            ? "Bu sabit koşullarda tam dolma yok."
            : `Tam dolma: başlangıçtan ${fmt(m.fillTime)} dakika.`}
        </p>
        {m.overflow > 0 && <p>Tankta kalamayan taşma: {fmt(m.overflow)} L.</p>}
        {m.unmetOutflow > 0 && (
          <p>
            Su bulunmadığı için gerçekleşemeyen nominal çıkış:{" "}
            {fmt(m.unmetOutflow)} L. Eksi su yoktur.
          </p>
        )}
      </div>
      <p className="small muted">
        Kesit sabit, debiler nominal olarak sabittir. Net negatifse su sıfırda,
        net pozitifse tank hacmi 800 litrede sınırlanır. Kesikli yatay çizgi
        başlangıç seviyesidir.
      </p>
      <Prediction
        state={s}
        set={set}
        expected={m.fillTime !== null ? "fills" : "never"}
        explanation="Başlangıç zaten dolu değilse tam dolma yalnız pozitif net debiyle olur. Net sıfırda seviye sabit, negatifte mevcut su azalan yöndedir; negatif dolma zamanı üretilmez."
        options={[
          ["fills", "Bu koşullarda tank tam doluya ulaşır veya zaten doludur"],
          ["never", "Bu koşullarda tank tam doluya ulaşmaz"],
        ]}
      />
    </>
  );
}
function Motion() {
  const uid = useId();
  const [s, set] = useExploration("forge012-math-motion", {
    gap: 120,
    front: 40,
    rear: 60,
    hours: 1,
    opposite: false,
    guess: "",
    reason: "",
    checked: false,
  });
  const gap = bound(s.gap, 40, 200),
    front = bound(s.front, 20, 80),
    rear = bound(s.rear, 20, 100),
    hours = bound(s.hours, 0, 6),
    m = relativeMotion(gap, front, rear, hours, s.opposite),
    min = Math.min(0, m.first, m.second),
    max = Math.max(gap, m.first, m.second, min + 1),
    x = (v: number) => 35 + (430 * (v - min)) / (max - min);
  const update = (v: Partial<typeof s>) => set({ ...v, checked: false });
  return (
    <>
      <h3>Aralık gerçekten kapanıyor mu?</h3>
      <p>
        Arkadaki A başlangıçta 0 km, B belirtilen aralık kadar sağdadır. Sağı
        pozitif seçtik. Yön seçimi yalnız B’nin hareket yönünü değiştirir;
        konumlar iki ayrı rayda aynı ölçekle gösterilir.
      </p>
      <div className="f012m-controls">
        <Range
          label="Başlangıç aralığı (km)"
          value={gap}
          min={40}
          max={200}
          step={20}
          onChange={(n) => update({ gap: n })}
        />
        <Range
          label="B sürati (km/sa)"
          value={front}
          min={20}
          max={80}
          step={10}
          onChange={(n) => update({ front: n })}
        />
        <Range
          label="A sürati (km/sa)"
          value={rear}
          min={20}
          max={100}
          step={10}
          onChange={(n) => update({ rear: n })}
        />
        <Range
          label="Geçen süre (saat)"
          value={hours}
          min={0}
          max={6}
          onChange={(n) => update({ hours: n })}
        />
        <label className="field" htmlFor={`${uid}-direction`}>
          B’nin yönü
          <ChoiceSelect
            id={`${uid}-direction`}
            value={s.opposite ? "toward" : "same"}
            onChange={(e) => update({ opposite: e.target.value === "toward" })}
          >
            <option value="same">A ile aynı yöne</option>
            <option value="toward">A’ya doğru</option>
          </ChoiceSelect>
        </label>
      </div>
      <div className="f012m-diagram-key" data-motion-axis>
        <p>
          <strong>Yatay eksen: konum (km)</strong> · Her iki rayda soldan sağa
          işaretler: {fmt(min)} · {fmt((min + max) / 2)} · {fmt(max)}.
        </p>
        <p className="f012m-color-key">
          <span>
            <i aria-hidden="true" className="f012m-key-a f012m-key-round" />
            A: koral daire · {fmt(m.first)} km
          </span>
          <span>
            <i aria-hidden="true" className="f012m-key-b" />
            B: mint kare · {fmt(m.second)} km
          </span>
        </p>
        <p>
          Seçili an: başlangıçtan {fmt(hours)} saat sonra. İki ray aynı konum
          ölçeğindedir.
        </p>
      </div>
      <Drawing
        title={`A ${fmt(m.first)}, B ${fmt(m.second)} km. Seçilen süre ${hours} saat; konum ölçeği iki rayda aynıdır.`}
      >
        <path d="M35 80H465M35 160H465" className="f012m-axis" />
        {[min, (min + max) / 2, max].map((value) => (
          <g key={value} data-motion-tick={value}>
            <path
              d={`M${x(value)} 76V84M${x(value)} 156V164`}
              className="f012m-axis"
            />
          </g>
        ))}
        <path d={`M${x(0)} 60V180`} className="f012m-guide" />
        <path
          d={`M${x(m.first)} 80V160H${x(m.second)}`}
          className="f012m-guide"
        />
        <circle
          data-motion-a
          cx={x(m.first)}
          cy="80"
          r="10"
          className="f012m-point-a"
        />
        <rect
          data-motion-b
          x={x(m.second) - 9}
          y="151"
          width="18"
          height="18"
          className="f012m-point-b"
        />
      </Drawing>
      <div className="f012m-result" data-model-result>
        <strong>
          {m.meeting === null
            ? "Gelecekte yetişme yok."
            : `Karşılaşma/yetişme: ${fmt(m.meeting)} saat sonra.`}
        </strong>
        <p>
          A konumu {fmt(m.first)} km; B konumu {fmt(m.second)} km. İşaretli
          aralık B−A = {fmt(m.gap)} km.
        </p>
        <p>
          Kapanma hızı {fmt(m.closing)} km/sa.{" "}
          {m.gap < 0
            ? "Seçilen anda A, B’nin sağındadır; karşılaşma geride kaldı."
            : "Seçilen anda B, A’nın sağında veya aynı konumda."}
        </p>
      </div>
      <p className="small muted">
        Koral daire A, mint kare B’dir. Başlangıç aralığı ve hızlar sabit; mola
        veya yön değişimi eklenmez. Yatay ölçek konumları sığdırmak için
        güncellenir; sayısal konumlar metinde verilir.
      </p>
      <Prediction
        state={s}
        set={set}
        expected={m.meeting === null ? "never" : "meet"}
        explanation="Aynı yönde kapanma A−B süratidir; arkadaki daha hızlı değilse gelecek yetişme yoktur. B, A’ya geliyorsa iki pozitif sürat aralığı birlikte kapatır."
        options={[
          ["meet", "Gelecekte aynı konuma gelirler"],
          ["never", "Bu sabit koşullarda gelecekte aynı konuma gelemezler"],
        ]}
      />
    </>
  );
}
export default function Forge012MathLab({ id }: { id: string }) {
  return (
    <section className="forge012-math-lab" data-forge012={id}>
      {id === "faiz-problemleri" ? (
        <Interest />
      ) : id === "karisim-problemleri" ? (
        <Mixture />
      ) : id === "isci-problemleri" ? (
        <Workers />
      ) : id === "havuz-problemleri" ? (
        <Pool />
      ) : (
        <Motion />
      )}
      <p className="small muted">
        Model seçimleri ve gerekçen bu cihazda saklanır. Keşif süre, soru
        doğrusu, XP veya konu tamamlanması oluşturmaz; bağımsız alıştırmalar
        Sorular bölümündedir.
      </p>
    </section>
  );
}
