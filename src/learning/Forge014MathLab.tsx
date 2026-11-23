import { useId, type ReactNode } from "react";
import {
  chartSummary,
  lineSample,
  vennModel,
  cartesianModel,
  evaluateConnective,
  conditionalVariants,
  truthRows,
  quantifiedModel,
  type Connective,
  type SetOperation,
  type Predicate,
} from "./forge014Math";
import { useExploration } from "./useExploration";
import { ThreeSetCountSource029Lab } from "./ThreeSetCountSource029Lab";
import { PiecewiseRateSource027Lab } from "./PiecewiseRateSource027Lab";
import "./forge014Math.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 4 }).format(
    Object.is(n, -0) ? 0 : n,
  );
const bounded = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, Number.isFinite(n) ? n : min));
const list = (xs: number[]) =>
  xs.length ? `{${xs.map(fmt).join(", ")}}` : "∅";
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
    valid = options.some(([k]) => k === state.guess);
  return (
    <div className="f014m-prediction">
      <label htmlFor={`${uid}-guess`}>Sonuç tahminin</label>
      <ChoiceSelect
        id={`${uid}-guess`}
        value={valid ? state.guess : ""}
        onChange={(e) => set({ guess: e.target.value, checked: false })}
      >
        <option value="">Bir sonuç seç</option>
        {options.map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </ChoiceSelect>
      {valid && (
        <p className="f014m-selection">
          Seçili: {options.find(([key]) => key === state.guess)![1]}
        </p>
      )}
      <label htmlFor={`${uid}-reason`}>Modelden gerekçen</label>
      <textarea
        id={`${uid}-reason`}
        rows={3}
        maxLength={120}
        value={state.reason.slice(0, 120)}
        onChange={(e) =>
          set({ reason: e.target.value.slice(0, 120), checked: false })
        }
        placeholder="Hangi sayı, koşul veya karşı örnek kararını destekliyor?"
      />
      <button
        type="button"
        className="secondary"
        disabled={!valid || !state.reason.trim()}
        onClick={() => set({ checked: true })}
      >
        Tahminimi karşılaştır
      </button>
      {state.checked && valid && (
        <div className="f014m-feedback" role="status">
          <strong>
            {state.guess === expected
              ? "Tahminin bu koşullarla uyumlu."
              : "Tahminini verilen kanıtla yeniden karşılaştır."}
          </strong>
          <p>{explanation}</p>
          <p>Senin gerekçen: {state.reason.slice(0, 120)}</p>
          <p>
            Yazdığın gerekçe otomatik puanlanmaz; sonuç seçimin hesapla
            karşılaştırılır.
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
  const id = useId();
  return (
    <div className="f014m-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt(value)}</output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
  options: [string, string][];
}) {
  const id = useId();
  return (
    <div className="f014m-field">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </ChoiceSelect>
      <p className="f014m-selection">
        Seçili: {options.find(([key]) => key === value)?.[1]}
      </p>
    </div>
  );
}
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="f014m-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
function Diagram({
  title,
  children,
  viewBox = "0 0 600 320",
}: {
  title: string;
  children: ReactNode;
  viewBox?: string;
}) {
  const id = useId();
  return (
    <svg
      className="f014m-diagram"
      role="img"
      aria-labelledby={id}
      viewBox={viewBox}
    >
      <title id={id}>{title}</title>
      {children}
    </svg>
  );
}
function sectorPath(start: number, angle: number) {
  const point = (a: number) => [
      300 + 110 * Math.cos(((a - 90) * Math.PI) / 180),
      155 + 110 * Math.sin(((a - 90) * Math.PI) / 180),
    ],
    a = point(start),
    b = point(start + angle);
  return `M300 155 L${a[0]} ${a[1]} A110 110 0 ${angle > 180 ? 1 : 0} 1 ${b[0]} ${b[1]} Z`;
}
function Charts() {
  const [s, set] = useExploration("forge014-math-graphs", {
    a: 20,
    b: 30,
    c: 50,
    mode: "bar",
    cut: false,
    time: 0.5,
    linear: false,
    guess: "",
    reason: "",
    checked: false,
  });
  const update = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const values = [s.a, s.b, s.c].map((v) => bounded(Math.round(v), 0, 60)),
    m = chartSummary(values),
    mode = ["bar", "pie", "line", "hist"].includes(s.mode) ? s.mode : "bar",
    time = bounded(s.time, 0, 2),
    sample = lineSample(values, time, s.linear),
    isLine = mode === "line",
    isHist = mode === "hist";
  const names = isLine
    ? ["0. saat", "1. saat", "2. saat"]
    : isHist
      ? ["[0,10)", "[10,20)", "[20,30]"]
      : ["A", "B", "C"];
  const base =
      mode === "bar" && s.cut ? Math.max(0, Math.min(...values) - 5) : 0,
    max = Math.max(10, Math.ceil(Math.max(...values) / 10) * 10),
    height = (v: number) => (200 * (v - base)) / (max - base),
    ys = [base, (base + max) / 2, max];
  const labels = isLine
    ? ["0. saat hacmi (L)", "1. saat hacmi (L)", "2. saat hacmi (L)"]
    : isHist
      ? [
          "1. aralık kişi sayısı",
          "2. aralık kişi sayısı",
          "3. aralık kişi sayısı",
        ]
      : ["A kişi sayısı", "B kişi sayısı", "C kişi sayısı"];
  const expected = isLine
    ? values[2] > values[0]
      ? "up"
      : values[2] < values[0]
        ? "down"
        : "same"
    : m.total === 0
      ? "empty"
      : values[2] * 2 > m.total
        ? "more"
        : values[2] * 2 < m.total
          ? "less"
          : "half";
  let angle = 0;
  return (
    <>
      <h3>Değeri ve temsilini birlikte oku</h3>
      <p>
        {isLine
          ? "Kapta 0, 1 ve 2. saatlerde ölçülen hacimler gösteriliyor. Ara zamanda hacmi bilmek için ayrıca doğrusal değişim varsayımı gerekir."
          : isHist
            ? "Eş genişlikli üç puan aralığındaki kişi sayıları. Son sınıf 30’u içerir; 10 ve 20 yalnız sonraki sınıfa girer."
            : "A, B, C birbirinden ayrık kulüplerdeki kişi sayılarıdır; bu üç kulüp gösterilen bütün grubu oluşturur."}
      </p>
      <div className="f014m-controls">
        <Select
          label="Grafik türü"
          value={mode}
          onChange={(v) => update({ mode: v })}
          options={[
            ["bar", "Sütun"],
            ["pie", "Daire"],
            ["line", "Çizgi: zaman ve hacim"],
            ["hist", "Histogram: eş aralıklar"],
          ]}
        />
        {values.map((v, i) => (
          <Range
            key={i}
            label={labels[i]}
            value={v}
            min={0}
            max={60}
            onChange={(n) => update({ [(["a", "b", "c"] as const)[i]]: n })}
          />
        ))}
      </div>
      {mode === "bar" && (
        <Toggle
          label="Düşey ekseni en küçük değerin yakınına daralt"
          checked={s.cut}
          onChange={(v) => update({ cut: v })}
        />
      )}{" "}
      {isLine && (
        <div className="f014m-controls">
          <Toggle
            label="Ölçümler arasında doğrusal değişim varsay"
            checked={s.linear}
            onChange={(v) => update({ linear: v })}
          />
          <Range
            label="Okunacak zaman (saat)"
            value={time}
            min={0}
            max={2}
            step={0.5}
            onChange={(v) => update({ time: v })}
          />
        </div>
      )}
      {mode !== "pie" && (
        <div className="f014m-key" data-chart-axis>
          <p>
            <strong>Yatay eksen:</strong>{" "}
            {isLine
              ? "zaman (saat); soldan sağa 0 · 1 · 2"
              : isHist
                ? "puan aralıkları; [0,10) · [10,20) · [20,30]"
                : "kulüp; soldan sağa A · B · C"}
            .
          </p>
          <p>
            <strong>Düşey eksen:</strong> {isLine ? "hacim (L)" : "kişi sayısı"}
            ; alttan üste {ys.map(fmt).join(" · ")}.
          </p>
          {base > 0 && (
            <p>
              Kesilmiş eksen {fmt(base)}’den başlıyor. Görünen sütun yüksekliği
              kişi sayısının kendisi değildir.
            </p>
          )}
        </div>
      )}
      <Diagram
        title={
          mode === "pie"
            ? `Kulüp dilimleri; toplam ${m.total} kişi.`
            : `${isLine ? "Saat ve litre ölçümleri" : isHist ? "Eş genişlikli frekans histogramı" : "Kulüp kişi sayıları"}; değerler ${values.join(", ")}.`
        }
      >
        {mode === "pie" ? (
          m.total === 0 ? (
            <circle
              cx={300}
              cy={155}
              r={110}
              className="f014m-outline"
              data-chart-empty
            />
          ) : (
            m.angles.map((a, i) => {
              const start = angle;
              angle += a!;
              return a === 360 ? (
                <circle
                  key={i}
                  cx={300}
                  cy={155}
                  r={110}
                  className={`f014m-series-${i}`}
                  data-chart-sector={i}
                />
              ) : a! > 0 ? (
                <path
                  key={i}
                  d={sectorPath(start, a!)}
                  className={`f014m-series-${i}`}
                  data-chart-sector={i}
                />
              ) : null;
            })
          )
        ) : (
          <>
            <path d="M70 50V260H525" className="f014m-axis" />
            {ys.map((v, i) => (
              <g key={i} data-chart-tick>
                <path d={`M65 ${260 - height(v)}H525`} className="f014m-grid" />
              </g>
            ))}
            {isLine ? (
              <>
                {s.linear && (
                  <polyline
                    data-chart-line
                    points={values
                      .map((v, i) => `${80 + i * 210},${260 - height(v)}`)
                      .join(" ")}
                    className="f014m-curve"
                  />
                )}
                {values.map((v, i) => (
                  <circle
                    key={i}
                    data-chart-sample={i}
                    cx={80 + i * 210}
                    cy={260 - height(v)}
                    r={7}
                    className="f014m-point"
                  />
                ))}
                {sample !== null && (
                  <circle
                    data-chart-reading
                    cx={80 + time * 210}
                    cy={260 - height(sample)}
                    r={11}
                    className="f014m-halo"
                  />
                )}
              </>
            ) : (
              values.map((v, i) => (
                <rect
                  key={i}
                  data-chart-bar={i}
                  x={isHist ? 80 + 140 * i : 100 + 150 * i}
                  y={260 - height(v)}
                  width={isHist ? 140 : 80}
                  height={height(v)}
                  className={`f014m-series-${i}`}
                />
              ))
            )}
            {base > 0 && (
              <path d="M65 253l10-5-10-5 10-5" className="f014m-axis" />
            )}
          </>
        )}
      </Diagram>
      <div className="f014m-result" data-model-result>
        <strong>
          {isLine
            ? `Son−ilk hacim farkı: ${fmt(values[2] - values[0])} L`
            : `Toplam: ${fmt(m.total)} kişi`}
        </strong>
        <ul>
          {values.map((v, i) => (
            <li key={i}>
              {!isLine && (
                <span
                  aria-hidden="true"
                  className={`f014m-swatch f014m-series-${i}`}
                />
              )}
              {names[i]}: {fmt(v)}{" "}
              {isLine
                ? "L"
                : `kişi${m.total > 0 ? `; pay %${fmt(m.shares[i]! * 100)}, açı ${fmt(m.angles[i]!)}°` : "; toplam sıfırken yüzde ve açı tanımsız"}`}
            </li>
          ))}
        </ul>
        {isLine && (
          <p data-chart-interpolation>
            {fmt(time)}. saatte hacim:{" "}
            {sample === null
              ? "Ara değer belirlenemez; doğrusal değişim varsayımı seçili değil."
              : `${fmt(sample)} L${Number.isInteger(time) ? "; ölçülen nokta." : "; seçilen doğrusal varsayıma göre."}`}
          </p>
        )}
      </div>
      {isHist ? (
        <p>
          Frekanslar sınıf içindeki tek tek puanları söylemez; bu tablodan kesin
          puan ortalaması veya puan medyanı çıkarılmaz.
        </p>
      ) : (
        <p>
          Üç {isLine ? "hacim ölçümünün" : "kulüp sayısının"} ortalaması{" "}
          {fmt(m.mean)}, ortancası {fmt(m.median)}, açıklığı {fmt(m.range)},
          örneklem sapması {fmt(m.sampleSD!)} {isLine ? "L" : "kişi"}.{" "}
          {m.modes.length
            ? `Tekrarlanan tepe değer: ${m.modes.map(fmt).join(", ")}.`
            : "Üç değerde tekrar yok."}{" "}
          Bu özet, bütün kişilerin başka bir özelliğinin ortalaması değildir.
        </p>
      )}
      <Prediction
        state={s}
        set={set}
        expected={expected}
        options={
          isLine
            ? [
                ["up", "Son hacim ilkinden büyük"],
                ["down", "Son hacim ilkinden küçük"],
                ["same", "Son ve ilk hacim eşit"],
              ]
            : [
                ["less", "Son grubun payı yarımdan az"],
                ["half", "Son grubun payı tam yarım"],
                ["more", "Son grubun payı yarımdan fazla"],
                ["empty", "Toplam sıfır; pay tanımsız"],
              ]
        }
        explanation={
          isLine
            ? `İlk ölçüm ${values[0]} L, son ölçüm ${values[2]} L; fark ${fmt(values[2] - values[0])} L. Bu karşılaştırma ara ölçüm varsayımından bağımsızdır.`
            : m.total > 0
              ? `Son grup ${values[2]}/${m.total} paya sahiptir; yüzde ${fmt(m.shares[2]! * 100)}. Yarım karşılaştırmasında payda güncel toplamdır.`
              : "Üç frekans da sıfır; payda sıfır olduğundan bir yüzde üretilmez."
        }
      />
    </>
  );
}
const operations: [SetOperation, string][] = [
  ["union", "A∪B · en az birinde"],
  ["intersection", "A∩B · ikisinde"],
  ["difference", "A∖B · yalnız A"],
  ["complement", "A′ · A’da olmayan"],
  ["symmetric", "Yalnız birinde"],
  ["neither", "İkisinde de olmayan"],
];
function Sets() {
  const [s, set] = useExploration("forge014-math-sets", {
    aMask: 15,
    bMask: 28,
    ninth: false,
    element: 5,
    operation: "union",
    guess: "",
    reason: "",
    checked: false,
  });
  const update = (v: Partial<typeof s>) => set({ ...v, checked: false }),
    op = operations.some(([k]) => k === s.operation)
      ? (s.operation as SetOperation)
      : "union",
    m = vennModel(
      s.ninth ? 9 : 8,
      Math.round(bounded(s.aMask, 0, 511)),
      Math.round(bounded(s.bMask, 0, 511)),
      op,
    ),
    selected = Math.round(bounded(s.element, 1, s.ninth ? 9 : 8)),
    inA = m.A.includes(selected),
    inB = m.B.includes(selected),
    uid = useId();
  const excludeA = `${uid}-exA`,
    excludeB = `${uid}-exB`,
    excludeBoth = `${uid}-exBoth`,
    clipB = `${uid}-clipB`;
  const position = (x: number) => {
    const groups = [m.onlyA, m.both, m.onlyB, m.neither],
      g = groups.findIndex((v) => v.includes(x)),
      i = groups[g].indexOf(x),
      row = Math.floor(i / 3),
      columns = Math.min(3, groups[g].length - row * 3),
      rows = Math.ceil(groups[g].length / 3),
      center = g === 0 ? 160 : g === 1 ? 290 : g === 2 ? 420 : 520;
    return {
      x: center + ((i % 3) - (columns - 1) / 2) * (g === 1 ? 24 : 30),
      y: (g === 3 ? 225 : 150) + (row - (rows - 1) / 2) * (g === 1 ? 28 : 30),
    };
  };
  return (
    <>
      <h3>Elemanları seç, bölgeyi denetle</h3>
      <p>
        E={list(m.E)}. Her nokta bir elemandır; çember alanları eleman sayısıyla
        orantılı değildir. Elemanları aşağıdaki denetimlerle değiştirebilirsin.
      </p>
      <div className="f014m-controls">
        <Select
          label="Küme işlemi"
          value={op}
          onChange={(v) => update({ operation: v })}
          options={operations}
        />
        <Select
          label="Düzenlenecek eleman"
          value={String(selected)}
          onChange={(v) => update({ element: Number(v) })}
          options={m.E.map((x) => [String(x), String(x)])}
        />
        <Toggle
          label="9’u evrensel kümeye ekle"
          checked={s.ninth}
          onChange={(v) => update({ ninth: v })}
        />
        <Toggle
          label="Seçili eleman A kümesinde"
          checked={inA}
          onChange={(v) =>
            update({
              aMask: v
                ? s.aMask | (1 << (selected - 1))
                : s.aMask & ~(1 << (selected - 1)),
            })
          }
        />
        <Toggle
          label="Seçili eleman B kümesinde"
          checked={inB}
          onChange={(v) =>
            update({
              bMask: v
                ? s.bMask | (1 << (selected - 1))
                : s.bMask & ~(1 << (selected - 1)),
            })
          }
        />
      </div>
      <div className="f014m-key">
        <p>
          A={list(m.A)}; B={list(m.B)}.
        </p>
        <p>
          Soldaki çember A; sağdaki B. Soldan sağa yalnız A / ortak / yalnız B;
          çemberlerin dışı hiçbirinde olmayanlardır.
        </p>
      </div>
      <Diagram
        title={`${operations.find(([k]) => k === op)![1]}; seçilen ${m.result.length} eleman: ${m.result.join(", ") || "yok"}.`}
      >
        <defs>
          <mask id={excludeA}>
            <rect width={600} height={320} fill="white" />
            <circle cx={220} cy={150} r={110} fill="black" />
          </mask>
          <mask id={excludeB}>
            <rect width={600} height={320} fill="white" />
            <circle cx={360} cy={150} r={110} fill="black" />
          </mask>
          <mask id={excludeBoth}>
            <rect width={600} height={320} fill="white" />
            <circle cx={220} cy={150} r={110} fill="black" />
            <circle cx={360} cy={150} r={110} fill="black" />
          </mask>
          <clipPath id={clipB}>
            <circle cx={360} cy={150} r={110} />
          </clipPath>
        </defs>
        <rect
          x={20}
          y={20}
          width={560}
          height={280}
          className="f014m-universe"
        />
        <g className="f014m-shading">
          {op === "union" ? (
            <>
              <circle cx={220} cy={150} r={110} />
              <circle cx={360} cy={150} r={110} />
            </>
          ) : op === "intersection" ? (
            <circle cx={220} cy={150} r={110} clipPath={`url(#${clipB})`} />
          ) : op === "difference" ? (
            <circle cx={220} cy={150} r={110} mask={`url(#${excludeB})`} />
          ) : op === "complement" ? (
            <rect
              x={20}
              y={20}
              width={560}
              height={280}
              mask={`url(#${excludeA})`}
            />
          ) : op === "symmetric" ? (
            <>
              <circle cx={220} cy={150} r={110} mask={`url(#${excludeB})`} />
              <circle cx={360} cy={150} r={110} mask={`url(#${excludeA})`} />
            </>
          ) : (
            <rect
              x={20}
              y={20}
              width={560}
              height={280}
              mask={`url(#${excludeBoth})`}
            />
          )}
        </g>
        <circle cx={220} cy={150} r={110} className="f014m-outline" />
        <circle cx={360} cy={150} r={110} className="f014m-outline" />
        {m.E.map((x) => {
          const p = position(x),
            chosen = m.result.includes(x);
          return (
            <g
              key={x}
              data-set-element={x}
              data-selected={String(chosen)}
              className={chosen ? "f014m-element selected" : "f014m-element"}
            >
              <circle cx={p.x} cy={p.y} r={10} />
              <text x={p.x} y={p.y + 6} textAnchor="middle">
                {x}
              </text>
            </g>
          );
        })}
      </Diagram>
      <div className="f014m-result" data-model-result>
        <strong>
          {operations.find(([k]) => k === op)![1]}: {list(m.result)}
        </strong>
        <p>Seçilen eleman sayısı: {m.result.length}.</p>
        <p>
          Yalnız A: {m.onlyA.length}; ortak: {m.both.length}; yalnız B:{" "}
          {m.onlyB.length}; hiçbiri: {m.neither.length}. Toplam {m.E.length}.
        </p>
        <p>
          A’nın alt küme sayısı {m.subsetsA}; öz alt küme sayısı {m.properA}.
          A′={list(m.E.filter((x) => !m.A.includes(x)))}.
        </p>
      </div>
      <Prediction
        state={s}
        set={set}
        expected={
          m.result.length === 0
            ? "zero"
            : m.result.length === m.E.length
              ? "all"
              : "part"
        }
        options={[
          ["zero", "İşlem sonucu boş küme"],
          ["all", "İşlem sonucu evrenin tamamı"],
          ["part", "İşlem sonucu boş olmayan bir öz alt küme"],
        ]}
        explanation={`Sonuçta ${m.result.length}, evrende ${m.E.length} eleman var. Aynı eleman hem ortak hem yalnız bölgede sayılmaz; dört ayrık bölgenin toplamı evreni verir.`}
      />
    </>
  );
}
function Product() {
  const [s, set] = useExploration("forge014-math-product", {
    aCount: 2,
    bCount: 3,
    same: false,
    swap: false,
    selected: "",
    guess: "",
    reason: "",
    checked: false,
  });
  const update = (v: Partial<typeof s>) =>
      set({ ...v, checked: false, selected: "" }),
    a = [1, 2, 3].slice(0, Math.round(bounded(s.aCount, 0, 3))),
    b = s.same ? a : [3, 4, 5, 6].slice(0, Math.round(bounded(s.bCount, 0, 4))),
    m = cartesianModel(a, b, s.swap),
    selected = m.pairs.find(([x, y]) => `${x},${y}` === s.selected);
  return (
    <>
      <h3>Her iki konumu da doldur</h3>
      <p>
        A={list(a)}, B={list(b)}. Noktalar yalnız listelenen elemanlardan
        oluşur; aradaki bütün düzlem ürüne ait değildir.
      </p>
      <div className="f014m-controls">
        <Range
          label="A eleman sayısı"
          value={a.length}
          min={0}
          max={3}
          onChange={(n) => update({ aCount: n })}
        />
        {!s.same && (
          <Range
            label="B eleman sayısı"
            value={b.length}
            min={0}
            max={4}
            onChange={(n) => update({ bCount: n })}
          />
        )}
        <Toggle
          label="B, A ile aynı elemanları taşısın"
          checked={s.same}
          onChange={(v) => update({ same: v })}
        />
        <Toggle
          label="Kaynakların sırasını değiştir: B×A"
          checked={s.swap}
          onChange={(v) => update({ swap: v })}
        />
      </div>
      <div className="f014m-key" data-product-axis>
        <p>
          <strong>Yatay eksen:</strong> {s.swap ? "B" : "A"} ilk bileşeni;
          sayısal değerler 0 · 1 · 2 · 3 · 4 · 5 · 6.
        </p>
        <p>
          <strong>Düşey eksen:</strong> {s.swap ? "A" : "B"} ikinci bileşeni;
          alttan üste aynı 0–6 ölçeği. Sayılar bir fiziksel birim değil küme
          elemanıdır.
        </p>
      </div>
      <Diagram
        title={`${s.swap ? "B×A" : "A×B"}; ${m.size} ayrık nokta.`}
        viewBox="0 0 600 360"
      >
        <path d="M70 35V300H525" className="f014m-axis" />
        {[0, 1, 2, 3, 4, 5, 6].map((v) => (
          <g key={v} data-product-tick>
            <path
              d={`M${70 + v * 70} 295V305 M65 ${300 - v * 40}H75`}
              className="f014m-axis"
            />
          </g>
        ))}
        {m.pairs.map(([x, y]) => (
          <g key={`${x},${y}`}>
            <path
              d={`M${70 + x * 70} 300V${300 - y * 40}H70`}
              className="f014m-grid"
            />
            <circle
              data-cartesian-point={`${x},${y}`}
              cx={70 + x * 70}
              cy={300 - y * 40}
              r={7}
              className="f014m-point"
            />
          </g>
        ))}
        {selected && (
          <circle
            data-cartesian-selected
            cx={70 + selected[0] * 70}
            cy={300 - selected[1] * 40}
            r={12}
            className="f014m-halo"
          />
        )}
      </Diagram>
      <div className="f014m-result" data-model-result>
        <strong>
          {s.swap ? "B×A" : "A×B"}: {m.size} sıralı ikili
        </strong>
        <p>
          {m.first.length}·{m.second.length}={m.size}.{" "}
          {m.empty
            ? "Bir kaynak boş; tam bir çift kurulamaz. İki sıradaki ürün de ∅’dir."
            : m.reverseEqual
              ? "Kaynaklar aynı elemanlı; sırayı değiştirmek ürün kümesini değiştirmez."
              : "İki kaynak da boş değil ve farklı; ters sıradaki ürün farklıdır."}
        </p>
        <p>
          Ürün:{" "}
          {m.empty
            ? "∅"
            : `{${m.pairs.map(([x, y]) => `(${x}, ${y})`).join(", ")}}`}
          .
        </p>
        {selected && (
          <p data-product-chosen>
            Seçilen nokta: ({selected[0]}, {selected[1]}). İlk bileşen{" "}
            {s.swap ? "B" : "A"}, ikinci {s.swap ? "A" : "B"} kaynağından.
          </p>
        )}
      </div>
      {m.pairs.length > 0 && (
        <div
          className="f014m-pairs"
          aria-label="Bir ikiliyi şekil üzerinde seç"
        >
          {m.pairs.map(([x, y]) => (
            <button
              type="button"
              className="secondary"
              key={`${x},${y}`}
              aria-pressed={s.selected === `${x},${y}`}
              onClick={() => set({ selected: `${x},${y}` })}
            >
              ({x}, {y})
            </button>
          ))}
        </div>
      )}
      <Prediction
        state={s}
        set={set}
        expected={m.empty ? "empty" : m.reverseEqual ? "same" : "different"}
        options={[
          ["empty", "İki sıradaki çarpım da boş"],
          ["same", "Boş değiller ve iki ürün eşit"],
          ["different", "İki ürün birbirinden farklı"],
        ]}
        explanation={
          m.empty
            ? "Bir kaynağın boş olması iki sırada da tam çift kurulmasını engeller; kaynaklar farklı olsa bile ürünler eşit olabilir."
            : m.reverseEqual
              ? "Bütün ilk ve ikinci bileşen kümeleri aynı olduğu için çiftlerin gerçek listesi değişmez."
              : "Örneğin çiftlerin yerleri değişince ilk bileşenin hangi kümeye ait olduğu değişir; iki boş olmayan farklı kaynak için ürünler eşit değildir."
        }
      />
    </>
  );
}
const connectiveOptions: [Connective, string][] = [
  ["and", "Ve · p∧q"],
  ["or", "Veya · p∨q"],
  ["xor", "Ya da · p⊻q"],
  ["implies", "İse · p⇒q"],
  ["iff", "Ancak ve ancak · p⇔q"],
];
const variantOptions: [keyof ReturnType<typeof conditionalVariants>, string][] =
  [
    ["original", "Başlangıç · p⇒q"],
    ["converse", "Karşıtı · q⇒p"],
    ["inverse", "Tersi · p′⇒q′"],
    ["contrapositive", "Karşıt tersi · q′⇒p′"],
    ["negation", "Değili · p∧q′"],
  ];
const predicateOptions: [Predicate, string][] = [
  ["squarePositive", "x²>0"],
  ["positive", "x>0"],
  ["even", "x çift tam sayıdır"],
];
function Logic() {
  const [s, set] = useExploration("forge014-math-logic", {
    mode: "connective",
    p: true,
    q: false,
    op: "implies",
    variant: "original",
    universe: "mixed",
    predicate: "squarePositive",
    quantifier: "all",
    evidence: "",
    guess: "",
    reason: "",
    checked: false,
  });
  const update = (v: Partial<typeof s>) =>
      set({ ...v, checked: false, evidence: "" }),
    mode = ["connective", "conditional", "quantifier"].includes(s.mode)
      ? s.mode
      : "connective",
    op = connectiveOptions.some(([k]) => k === s.op)
      ? (s.op as Connective)
      : "implies",
    variant = variantOptions.some(([k]) => k === s.variant)
      ? (s.variant as keyof ReturnType<typeof conditionalVariants>)
      : "original",
    predicate = predicateOptions.some(([k]) => k === s.predicate)
      ? (s.predicate as Predicate)
      : "squarePositive",
    quantifier = s.quantifier === "some" ? "some" : "all",
    domain =
      s.universe === "empty"
        ? []
        : s.universe === "positive"
          ? [1, 2, 3]
          : [-1, 0, 1],
    m = quantifiedModel(domain, predicate, quantifier),
    variants = conditionalVariants(s.p, s.q),
    value =
      mode === "quantifier"
        ? m.value
        : mode === "conditional"
          ? variants[variant]
          : evaluateConnective(s.p, s.q, op),
    predicateText = predicateOptions.find(([k]) => k === predicate)![1],
    proof = domain.find((x) => String(x) === s.evidence),
    validEvidence =
      proof !== undefined &&
      (m.proofKind === "counterexample"
        ? m.falseElements.includes(proof)
        : m.proofKind === "witness"
          ? m.trueElements.includes(proof)
          : false);
  const expression =
    mode === "conditional"
      ? variantOptions.find(([k]) => k === variant)![1]
      : connectiveOptions.find(([k]) => k === op)![1];
  return (
    <>
      <h3>Bir satırdan kanıtın kapsamına</h3>
      <Select
        label="İncelenen yapı"
        value={mode}
        onChange={(v) => update({ mode: v })}
        options={[
          ["connective", "Bağlaçlar"],
          ["conditional", "Koşul dönüşümleri"],
          ["quantifier", "Niceleyici ve karşı örnek"],
        ]}
      />
      {mode !== "quantifier" ? (
        <div className="f014m-controls">
          <Toggle
            label="p doğru"
            checked={s.p}
            onChange={(v) => update({ p: v })}
          />
          <Toggle
            label="q doğru"
            checked={s.q}
            onChange={(v) => update({ q: v })}
          />
          {mode === "connective" ? (
            <Select
              label="Mantık bağlacı"
              value={op}
              onChange={(v) => update({ op: v })}
              options={connectiveOptions}
            />
          ) : (
            <Select
              label="Koşulun dönüşümü"
              value={variant}
              onChange={(v) => update({ variant: v })}
              options={variantOptions}
            />
          )}
        </div>
      ) : (
        <div className="f014m-controls">
          <Select
            label="İncelenen evren"
            value={s.universe}
            onChange={(v) => update({ universe: v })}
            options={[
              ["mixed", "E={−1,0,1}"],
              ["positive", "E={1,2,3}"],
              ["empty", "E=∅"],
            ]}
          />
          <Select
            label="Açık önerme"
            value={predicate}
            onChange={(v) => update({ predicate: v })}
            options={predicateOptions}
          />
          <Select
            label="Niceleyici"
            value={quantifier}
            onChange={(v) => update({ quantifier: v })}
            options={[
              ["all", "Her · ∀"],
              ["some", "En az bir · ∃"],
            ]}
          />
        </div>
      )}
      <Diagram
        title={
          mode === "quantifier"
            ? `E=${list(domain)}; ${quantifier === "all" ? "her" : "bazı"} eleman için ${predicateText}; sonuç ${Number(value)}.`
            : `p=${Number(s.p)},q=${Number(s.q)}; ${expression}; sonuç ${Number(value)}.`
        }
      >
        {mode === "quantifier" ? (
          <>
            {domain.map((x, i) => {
              const good = m.trueElements.includes(x),
                chosen = String(x) === s.evidence;
              return (
                <g
                  key={x}
                  data-logic-element={x}
                  data-predicate-value={String(good)}
                  className={good ? "f014m-element selected" : "f014m-element"}
                >
                  <circle cx={130 + i * 170} cy={145} r={35} />
                  <text x={130 + i * 170} y={153} textAnchor="middle">
                    {x}
                  </text>
                  {chosen && (
                    <circle
                      data-logic-evidence={x}
                      cx={130 + i * 170}
                      cy={145}
                      r={46}
                      className="f014m-halo"
                    />
                  )}
                </g>
              );
            })}
            {!domain.length && (
              <rect
                x={140}
                y={70}
                width={320}
                height={160}
                className="f014m-outline"
                data-logic-empty
              />
            )}
          </>
        ) : (
          <>
            <path
              d="M150 95L285 155M150 215L285 155H450"
              className="f014m-axis"
            />
            {[
              [150, 95, s.p],
              [150, 215, s.q],
              [450, 155, value],
            ].map(([x, y, v], i) => (
              <g
                key={i}
                className={v ? "f014m-element selected" : "f014m-element"}
              >
                <circle cx={x as number} cy={y as number} r={32} />
                <text x={x as number} y={(y as number) + 8} textAnchor="middle">
                  {Number(v)}
                </text>
              </g>
            ))}
          </>
        )}
      </Diagram>
      <div className="f014m-result" data-model-result>
        <strong>
          {mode === "quantifier"
            ? `${quantifier === "all" ? "Her" : "En az bir"} x∈E için ${predicateText}`
            : expression}
          : {value ? "Doğru (1)" : "Yanlış (0)"}
        </strong>
        {mode === "quantifier" ? (
          <>
            <p>
              E={list(domain)}; doğruluk kümesi {list(m.trueElements)}; koşulu
              sağlamayanlar {list(m.falseElements)}.
            </p>
            <p>
              {m.proofKind === "counterexample"
                ? `Karşı örnek adayları: ${m.falseElements.map(fmt).join(", ")}.`
                : m.proofKind === "witness"
                  ? `Tanık adayları: ${m.trueElements.map(fmt).join(", ")}.`
                  : domain.length
                    ? "Sonlu alandaki bütün elemanlar kontrol edildi; tek bir başarılı/başarısız denemeden genelleme yapılmadı."
                    : "Boş alanda tanık ve karşı örnek yoktur: her yargısı doğru, bazı yargısı yanlıştır."}
            </p>
            <p>
              Değili: {quantifier === "all" ? "En az bir" : "Her"} x∈E için{" "}
              {predicate === "squarePositive"
                ? "x²≤0"
                : predicate === "positive"
                  ? "x≤0"
                  : "x çift tam sayı değildir"}
              ; sonuç {m.negatedValue ? "doğru" : "yanlış"}.
            </p>
          </>
        ) : (
          <>
            <p>
              p={Number(s.p)}, q={Number(s.q)}.{" "}
              {mode === "conditional"
                ? "Karşıt ters bütün satırlarda başlangıca denktir; tersi ile değili ayrı işlemlerdir."
                : "Aktif satır tek bir doğruluk atamasıdır; genel denklik için dört satır birlikte incelenir."}
            </p>
            {mode === "conditional" && (
              <ul>
                {variantOptions.map(([k, v]) => (
                  <li key={k}>
                    {v}: {Number(variants[k])}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
      {mode === "connective" && (
        <ol className="f014m-truth" aria-label="Bütün doğruluk satırları">
          {truthRows(op).map((r, i) => (
            <li
              key={i}
              data-truth-row
              data-active={String(r.p === s.p && r.q === s.q)}
            >
              <strong>
                p={Number(r.p)}, q={Number(r.q)}
              </strong>
              <span>
                Sonuç: {Number(r.value)}
                {r.p === s.p && r.q === s.q ? " · seçili satır" : ""}
              </span>
            </li>
          ))}
        </ol>
      )}
      {mode === "conditional" && (
        <p>
          Öncülün yanlış olması koşulu biçimsel olarak doğru yapabilir; bu bir
          nedensellik kanıtı değildir. Genel eşdeğerliği görmek için p ve q’nun
          dört durumunu değiştir.
        </p>
      )}
      {mode === "quantifier" && domain.length > 0 && (
        <div className="f014m-evidence">
          <p>
            {m.proofKind === "counterexample"
              ? "Bir karşı örneği kanıt olarak seç."
              : m.proofKind === "witness"
                ? "Bir tanığı kanıt olarak seç."
                : "Bir elemanı inceleyebilirsin; bu sonuç bütün sonlu alanın taranmasına dayanır."}
          </p>
          <div className="f014m-pairs">
            {domain.map((x) => (
              <button
                key={x}
                type="button"
                className="secondary"
                aria-pressed={s.evidence === String(x)}
                onClick={() => set({ evidence: String(x), checked: false })}
              >
                {x}’ı kanıt olarak seç
              </button>
            ))}
          </div>
          {proof !== undefined && (
            <p
              data-logic-counterexample={
                validEvidence && m.proofKind === "counterexample"
                  ? String(proof)
                  : undefined
              }
              data-logic-witness={
                validEvidence && m.proofKind === "witness"
                  ? String(proof)
                  : undefined
              }
            >
              {validEvidence
                ? `Seçtiğin ${proof}, geçerli bir ${m.proofKind === "counterexample" ? "karşı örnek" : "tanık"}.`
                : `Seçtiğin ${proof} için koşul ${m.trueElements.includes(proof) ? "doğru" : "yanlış"}; bu eleman tek başına gereken genel kanıtı sağlamaz.`}
            </p>
          )}
        </div>
      )}
      <Prediction
        state={s}
        set={set}
        expected={value ? "true" : "false"}
        options={[
          ["true", "Yargı doğru"],
          ["false", "Yargı yanlış"],
        ]}
        explanation={
          mode === "quantifier"
            ? `Alan ${list(domain)}. Doğru yapanlar ${list(m.trueElements)}, yanlış yapanlar ${list(m.falseElements)}. ${quantifier === "all" ? "Her için tek bir başarısız eleman karşı örnektir." : "Bazı için en az bir başarılı eleman tanıktır."}`
            : `p=${Number(s.p)},q=${Number(s.q)} seçimiyle ${expression} sonucu ${Number(value)}. Koşullu önerme yalnız doğru öncül ve yanlış sonuçta yanlıştır; bağlaç değişince aynı girdilerin sonucu değişebilir.`
        }
      />
    </>
  );
}
export default function Forge014MathLab({ lessonId }: { lessonId: string }) {
  const known = [
    "grafik-problemleri",
    "kumeler",
    "kartezyen-carpim",
    "mantik-onerme",
  ].includes(lessonId);
  if (!known) return null;
  return (
    <section className="forge014-math-lab" data-forge014={lessonId}>
      {lessonId === "grafik-problemleri" ? (
        <>
          <Charts />
          <PiecewiseRateSource027Lab />
        </>
      ) : lessonId === "kumeler" ? (
        <>
          <Sets />
          <ThreeSetCountSource029Lab />
        </>
      ) : lessonId === "kartezyen-carpim" ? (
        <Product />
      ) : (
        <Logic />
      )}
      <p className="f014m-footnote">
        Model seçimleri, tahminin ve gerekçen bu cihazda saklanır. Keşif, XP
        veya konu tamamlaması oluşturmaz; bağımsız alıştırmalar Sorular
        bölümündedir.
      </p>
    </section>
  );
}
