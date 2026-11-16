import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import { useApp } from "../store";
import {
  derivativeRules024,
  rationalPower024,
  tangentGeometry024,
  type Rule024,
  type Quad024,
  type Cubic024,
} from "./forge024Math";
import "./forge024Math.css";

const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 6,
    signDisplay: "negative",
  }).format(n === 0 ? 0 : n);
const bounded = (n: number, lo: number, hi: number, step = 1) =>
  Number.isFinite(n)
    ? Math.max(lo, Math.min(hi, Math.round(n / step) * step))
    : lo;
const operations: [Rule024, string][] = [
  ["sum", "u+v"],
  ["difference", "u−v"],
  ["product", "u·v"],
  ["quotient", "u/v"],
  ["composition", "u∘v"],
];
const powers = [
  [1, 2],
  [1, 3],
  [2, 3],
  [3, 2],
  [4, 3],
  [-1, 2],
  [-2, 3],
  [2, 2],
] as const;
const defaults = {
  mode: "rules",
  operation: "product",
  ua: 1,
  ub: 0,
  uc: 1,
  va: 0,
  vb: 2,
  vc: -1,
  x: 1,
  power: "2/3",
  px: -1,
  ca: 1,
  cb: 0,
  cc: -2,
  cd: 0,
  at: 1,
  stepIndex: 2,
  guess: "",
  reason: "",
  checked: false,
};
const steps = [-1, -0.5, -0.1, -0.01, 0.01, 0.1, 0.5, 1];
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
  return (
    <label className="math024-range">
      <span>
        {label}: <strong>{fmt(value)}</strong>
      </span>
      <input
        type="range"
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
      />
    </label>
  );
}
function RuleFlow({
  operation,
  defined,
}: {
  operation: Rule024;
  defined: boolean;
}) {
  const composition = operation === "composition",
    symbol = operations.find((o) => o[0] === operation)![1];
  return (
    <svg
      className="math024-flow"
      viewBox="0 0 270 400"
      role="img"
      aria-label={
        composition
          ? "Bileşkede x önce v, sonra u kutusundan geçer. Dış türev v(x) girdisinde hesaplanır."
          : `x iki ayrı fonksiyon koluna girer. ${symbol} işleminin türevi iki katkıdan kurulur.`
      }
      data-rule-flow={operation}
    >
      <path
        className="math024-link"
        d={
          composition
            ? "M135 45V95 M135 145V205 M135 255V315"
            : "M135 45V65H65V95 M135 65H205V95 M65 145V185 M205 145V185 M65 235V275H135V315 M205 235V275H135"
        }
      />
      <circle className="math024-node" cx="135" cy="25" r="21" />
      <text x="135" y="33" textAnchor="middle">
        x
      </text>
      {composition ? (
        <>
          <rect
            className="math024-node"
            x="40"
            y="95"
            width="190"
            height="50"
            rx="8"
          />
          <text x="135" y="126" textAnchor="middle">
            v(x), v′(x)
          </text>
          <rect
            className="math024-node"
            x="40"
            y="205"
            width="190"
            height="50"
            rx="8"
          />
          <text x="135" y="236" textAnchor="middle">
            u(v(x)), u′(v(x))
          </text>
        </>
      ) : (
        <>
          {[65, 205].map((x, i) => (
            <g key={x}>
              <rect
                className="math024-node"
                x={x - 55}
                y="95"
                width="110"
                height="50"
                rx="8"
              />
              <text x={x} y="126" textAnchor="middle">
                {i ? "v, v′" : "u, u′"}
              </text>
              <rect
                className="math024-node math024-contribution"
                x={x - 55}
                y="185"
                width="110"
                height="50"
                rx="8"
              />
              <text x={x} y="216" textAnchor="middle">
                {operation === "product"
                  ? i
                    ? "uv′"
                    : "u′v"
                  : operation === "quotient"
                    ? i
                      ? "−uv′/v²"
                      : "u′/v"
                    : i
                      ? operation === "difference"
                        ? "−v′"
                        : "v′"
                      : "u′"}
              </text>
            </g>
          ))}
        </>
      )}
      <rect
        className="math024-node math024-final"
        x="30"
        y="315"
        width="210"
        height="55"
        rx="8"
      />
      <text x="135" y="349" textAnchor="middle">
        {!defined
          ? "v(x)=0: tanımsız"
          : composition
            ? "u′(v(x)) · v′(x)"
            : "İki katkıyı topla"}
      </text>
    </svg>
  );
}
function PowerGraph({ p, q, x }: { p: number; q: number; x: number }) {
  const clip = useId(),
    domain = rationalPower024(x, p, q),
    map = (a: number, b: number) => ({ x: 135 + 44 * a, y: 145 - 44 * b });
  let path = "",
    open = true;
  for (let i = 0; i <= 240; i++) {
    const a = -2.5 + i / 48,
      m = rationalPower024(a, p, q),
      y = m.value;
    if (
      y === null ||
      !Number.isFinite(y) ||
      Math.abs(y) > 5 ||
      (p < 0 && Math.abs(a) < 0.03)
    ) {
      open = true;
      continue;
    }
    const at = map(a, y);
    path += `${open ? "M" : "L"}${at.x},${at.y} `;
    open = false;
  }
  const dot = domain.value === null ? null : map(x, domain.value);
  return (
    <svg
      className="math024-power"
      viewBox="0 0 270 290"
      role="img"
      aria-label={`x üzeri ${p}/${q} gerçek grafiği. ${fmt(x)} noktasının tanım ve türev durumu aşağıda metinle verilir.`}
    >
      <defs>
        <clipPath id={clip}>
          <rect x="20" y="30" width="230" height="230" />
        </clipPath>
      </defs>
      <path className="math024-axis" d="M25 145H245 M135 35V255" />
      <text x="240" y="172">
        x
      </text>
      <text x="145" y="44">
        y
      </text>
      <text x="25" y="283">
        −2,5
      </text>
      <text x="245" y="283" textAnchor="end">
        2,5
      </text>
      <g clipPath={`url(#${clip})`}>
        <path className="math024-curve" d={path} />
        {dot && (
          <circle
            className="math024-point"
            data-power-point
            cx={dot.x}
            cy={dot.y}
            r="5"
          />
        )}
      </g>
    </svg>
  );
}
function TangentGraph({
  coefficients,
  at,
  step,
}: {
  coefficients: Cubic024;
  at: number;
  step: number;
}) {
  const clip = useId(),
    m = tangentGeometry024(coefficients, at, step),
    span = 2.25,
    scale = 108 / span;
  const map = (x: number, y: number) => ({
    x: 135 + (x - at) * scale,
    y: 140 - (y - m.point.y) * scale,
  });
  const fn = (x: number) =>
    ((coefficients[0] * x + coefficients[1]) * x + coefficients[2]) * x +
    coefficients[3];
  const curve = Array.from({ length: 241 }, (_, i) => {
    const x = at - span + (2 * span * i) / 240,
      p = map(x, fn(x));
    return `${i ? "L" : "M"}${p.x},${p.y}`;
  }).join(" ");
  const line = (ux: number, uy: number) =>
    `M${135 - 400 * ux},${140 + 400 * uy}L${135 + 400 * ux},${140 - 400 * uy}`;
  const unit = Math.hypot(1, m.secantSlope),
    end = map(m.secantPoint.x, m.secantPoint.y),
    pred = map(m.secantPoint.x, m.predicted),
    other =
      m.otherIntersection && map(m.otherIntersection.x, m.otherIntersection.y);
  return (
    <svg
      className="math024-tangent"
      viewBox="0 0 270 300"
      role="img"
      aria-label="Eşit birimli yerel koordinat penceresi: eğri sürekli, teğet uzun kesikli, normal noktalı, kiriş kısa kesikli çizilidir. Sayısal noktalar ve denklemler aşağıdadır."
      data-tangent-graph
      data-unit-scale={scale}
    >
      <defs>
        <clipPath id={clip}>
          <rect x="27" y="32" width="216" height="216" />
        </clipPath>
      </defs>
      <rect className="math024-window" x="27" y="32" width="216" height="216" />
      <path className="math024-axis" d="M27 140H243 M135 32V248" />
      <text x="27" y="278" textAnchor="start">
        {fmt(at - span)}
      </text>
      <text x="243" y="278" textAnchor="end">
        {fmt(at + span)}
      </text>
      <text x="135" y="24" textAnchor="middle">
        y = {fmt(m.point.y + span)}
      </text>
      <g clipPath={`url(#${clip})`}>
        <path className="math024-curve" d={curve} />
        <path
          className="math024-secant"
          d={line(1 / unit, m.secantSlope / unit)}
        />
        <path
          className="math024-tangent-line"
          d={line(m.tangentUnit.x, m.tangentUnit.y)}
        />
        <path
          className="math024-normal"
          d={line(m.normalUnit.x, m.normalUnit.y)}
        />
        <path
          className="math024-error"
          d={`M${pred.x},${pred.y}L${end.x},${end.y}`}
        />
        <circle
          className="math024-point"
          data-contact-point
          cx="135"
          cy="140"
          r="5"
        />
        <circle
          className="math024-sample"
          data-secant-point
          cx={end.x}
          cy={end.y}
          r="5"
        />
        {other && (
          <circle
            className="math024-open"
            data-other-intersection
            cx={other.x}
            cy={other.y}
            r="6"
          />
        )}
      </g>
    </svg>
  );
}

export default function Forge024MathLab({ lessonId }: { lessonId: string }) {
  const explorationId = `forge024-math:${lessonId}`,
    [saved, set] = useExploration(explorationId, defaults),
    raw = useApp().state.explorations[explorationId];
  if (
    !["ayt-turev-alma-kurallari", "turev-teget", "turev-teget-ileri"].includes(
      lessonId,
    )
  )
    return null;
  const s = {
    ...saved,
    mode: saved.mode === "power" ? "power" : "rules",
    operation:
      operations.find(([op]) => op === saved.operation)?.[0] ?? "product",
    power: powers.some(([p, q]) => `${p}/${q}` === saved.power)
      ? saved.power
      : "2/3",
    ua: bounded(saved.ua, -3, 3),
    ub: bounded(saved.ub, -3, 3),
    uc: bounded(saved.uc, -3, 3),
    va: bounded(saved.va, -3, 3),
    vb: bounded(saved.vb, -3, 3),
    vc: bounded(saved.vc, -3, 3),
    x: bounded(saved.x, -3, 3, 0.25),
    px: bounded(saved.px, -2, 2, 0.25),
    ca: bounded(saved.ca, -2, 2),
    cb: bounded(saved.cb, -2, 2),
    cc: bounded(saved.cc, -3, 3),
    cd: bounded(saved.cd, -3, 3),
    at: bounded(saved.at, -2, 2, 0.25),
    stepIndex: bounded(saved.stepIndex, 0, steps.length - 1),
    reason: saved.reason.slice(0, 240),
  };
  const persist = (delta: Partial<typeof saved>) => set({ ...s, ...delta });
  const change = (delta: Partial<typeof saved>) =>
    persist({ ...delta, checked: false });
  const rules = lessonId === "ayt-turev-alma-kurallari",
    powerMode = rules && s.mode === "power";
  const active: (keyof typeof defaults)[] = rules
    ? powerMode
      ? ["mode", "power", "px"]
      : ["mode", "operation", "ua", "ub", "uc", "va", "vb", "vc", "x"]
    : ["ca", "cb", "cc", "cd", "at", "stepIndex"];
  const validSelection = active.every(
    (key) =>
      saved[key] === s[key] &&
      (!raw ||
        !Object.hasOwn(raw, key) ||
        typeof raw[key] === typeof defaults[key]),
  );
  let title: string,
    intro: string,
    controls: ReactNode,
    diagram: ReactNode,
    result: ReactNode,
    expected: string,
    choices: [string, string][];
  if (powerMode) {
    title = "Gerçek kuvvetin alanını ve sıfırını incele";
    intro =
      "Üs kesrini önce en sade hâle getir. İşaretli gerçek kök kullanılır. İki yanlı sonlu türev için iç nokta koşulu da aranır.";
    const selected =
        powers.find(([p, q]) => `${p}/${q}` === s.power) ?? powers[2],
      [p, q] = selected,
      m = rationalPower024(s.px, p, q);
    controls = (
      <>
        <label>
          Rasyonel üs
          <select
            aria-label="Rasyonel üs"
            value={`${p}/${q}`}
            onChange={(e) => change({ power: e.currentTarget.value })}
          >
            {powers.map(([a, b]) => (
              <option key={`${a}/${b}`} value={`${a}/${b}`}>
                {a}/{b}
              </option>
            ))}
          </select>
        </label>
        <Range
          label="Kuvvetin girdisi"
          value={s.px}
          min={-2}
          max={2}
          step={0.25}
          onChange={(px) => change({ px })}
        />
      </>
    );
    diagram = <PowerGraph p={p} q={q} x={s.px} />;
    const labels = {
      "gercel-tanim-yok": "Gerçek fonksiyon değeri yok.",
      "sinir-noktasi":
        "Tanım kümesinin sınırı; iki yanlı iç nokta türevi verilmez.",
      "sonlu-turev-yok": "Fonksiyon tanımlı; bu iç noktada sonlu türev yok.",
      "ic-noktada-turev": "İç noktada sonlu türev var.",
    };
    result = (
      <>
        <p>
          Sade üs: {m.p}/{m.q}. Seçili x: {fmt(s.px)}.
        </p>
        <p data-power-result>{labels[m.kind]}</p>
        <p>
          Fonksiyon değeri: {m.value === null ? "Tanımsız" : fmt(m.value)}.
          Türev:{" "}
          {m.derivative === null
            ? "Sonlu iki yanlı değer verilmez"
            : fmt(m.derivative)}
          .
        </p>
        <p>
          Tek kök negatif girdiye izin verebilir. Çift kökün sıfırı sınır
          noktasıdır; negatif üs sıfır girdisini dışlar. Kesir 2/2 ise önce 1’e
          iner, fonksiyon x olur.
        </p>
        <p>
          Grafikte yatay ve düşey birim aynıdır. Pencere dışında kalan seçili
          yükseklik de metinde tam sayısal sonuçla verilir.
        </p>
      </>
    );
    expected = m.kind;
    choices = Object.entries(labels).map(([value, label]) => [value, label]);
  } else if (rules) {
    title = "Türevde hangi katkılar birleşir?";
    intro =
      "u(x) = Ax² + Bx + C ve v(x) = Dx² + Ex + F için katsayı seç. Önce değeri, sonra türev katkılarını hesapla. En dış işlem kuralı belirler.";
    const operation =
        operations.find(([op]) => op === s.operation)?.[0] ?? "product",
      u: Quad024 = [s.ua, s.ub, s.uc],
      v: Quad024 = [s.va, s.vb, s.vc],
      m = derivativeRules024(u, v, s.x, operation);
    controls = (
      <>
        <label>
          İşlem
          <select
            aria-label="İşlem"
            value={operation}
            onChange={(e) => change({ operation: e.currentTarget.value })}
          >
            {operations.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <Range
          label="Seçili x"
          value={s.x}
          min={-3}
          max={3}
          step={0.25}
          onChange={(x) => change({ x })}
        />
        {(
          [
            ["ua", "u: x² katsayısı"],
            ["ub", "u: x katsayısı"],
            ["uc", "u: sabit"],
            ["va", "v: x² katsayısı"],
            ["vb", "v: x katsayısı"],
            ["vc", "v: sabit"],
          ] as const
        ).map(([key, label]) => (
          <Range
            key={key}
            label={label}
            value={s[key]}
            min={-3}
            max={3}
            onChange={(n) => change({ [key]: n })}
          />
        ))}
      </>
    );
    diagram = <RuleFlow operation={operation} defined={m.defined} />;
    result = (
      <>
        <p>
          u(x) = {fmt(s.ua)}x² + ({fmt(s.ub)})x + ({fmt(s.uc)}); v(x) ={" "}
          {fmt(s.va)}x² + ({fmt(s.vb)})x + ({fmt(s.vc)}).
        </p>
        <p>
          x={fmt(s.x)} için u={fmt(m.left.value)}, u′={fmt(m.left.derivative)};
          v={fmt(m.right.value)}, v′={fmt(m.right.derivative)}.
        </p>
        {m.defined ? (
          <>
            <p data-rule-result>
              İşlem değeri: {fmt(m.value)}. Türev: {fmt(m.derivative)}.
            </p>
            <p>
              {operation === "composition"
                ? `Dış türev u′(v(x))=${fmt(m.outer!.derivative)}, iç türev v′(x)=${fmt(m.right.derivative)}. Çarpım: ${fmt(m.contributions[0])} · ${fmt(m.contributions[1])}.`
                : `Birinci katkı ${fmt(m.contributions[0])}; ikinci katkı ${fmt(m.contributions[1])}. Katkıların toplamı ${fmt(m.derivative)}.`}
            </p>
          </>
        ) : (
          <p data-rule-result>
            Payda v(x)=0. Bölüm ve bölümün bu noktadaki türevi tanımsızdır.
          </p>
        )}
        <p>
          {operation === "composition"
            ? "Şemada önce v kutusu çalışır. u′ için girdi, v’nin çıktısıdır."
            : operation === "quotient"
              ? "İki katkı u′/v ve −uv′/v²’dir. Yalnız v ≠ 0 iken toplanır. Sade biçim, başta yasak olan noktaya yeni değer vermez."
              : operation === "product"
                ? "İlk kol u′v, ikinci kol uv′ üretir. u′v′ çarpımı bu iki katkının yerini tutmaz."
                : "İlk kol u′ katkısıdır. Farkta ikinci katkı −v′, toplamda v′ olur."}
        </p>
      </>
    );
    expected = !m.defined
      ? "undefined"
      : m.derivative === 0
        ? "zero"
        : m.derivative > 0
          ? "positive"
          : "negative";
    choices = [
      ["positive", "Türev pozitif"],
      ["negative", "Türev negatif"],
      ["zero", "Türev sıfır"],
      ["undefined", "Bölüm bu noktada tanımsız"],
    ];
  } else {
    title = "Teğet, normal ve kirişin ortak noktasını izle";
    intro =
      "f(x) = Ax³ + Bx² + Cx + D. Temas apsisi a ve sıfır dışı h seç. Eğri ile teğet farkını çizimde ve hesapta incele.";
    const c: Cubic024 = [s.ca, s.cb, s.cc, s.cd],
      h = steps[s.stepIndex],
      m = tangentGeometry024(c, s.at, h);
    controls = (
      <>
        {(
          [
            ["ca", "A: x³ katsayısı", -2, 2],
            ["cb", "B: x² katsayısı", -2, 2],
            ["cc", "C: x katsayısı", -3, 3],
            ["cd", "D: sabit", -3, 3],
          ] as const
        ).map(([key, label, min, max]) => (
          <Range
            key={key}
            label={label}
            value={s[key]}
            min={min}
            max={max}
            onChange={(n) => change({ [key]: n })}
          />
        ))}
        <Range
          label="Temas apsisi a"
          value={s.at}
          min={-2}
          max={2}
          step={0.25}
          onChange={(at) => change({ at })}
        />
        <label>
          Kiriş adımı h
          <select
            aria-label="Kiriş adımı h"
            value={s.stepIndex}
            onChange={(e) =>
              change({ stepIndex: Number(e.currentTarget.value) })
            }
          >
            {steps.map((value, i) => (
              <option key={value} value={i}>
                {fmt(value)}
              </option>
            ))}
          </select>
        </label>
      </>
    );
    diagram = <TangentGraph coefficients={c} at={s.at} step={h} />;
    result = (
      <>
        <p>
          f(x) = {fmt(s.ca)}x³ + ({fmt(s.cb)})x² + ({fmt(s.cc)})x + ({fmt(s.cd)}
          ).
        </p>
        <p data-contact-result>
          Temas T=({fmt(m.point.x)}; {fmt(m.point.y)}), teğet eğimi{" "}
          {fmt(m.slope)}.
        </p>
        <p>
          Teğet: y={fmt(m.slope)}x + ({fmt(m.intercept)}). Normal:{" "}
          {m.normal.kind === "dusey"
            ? `x=${fmt(m.normal.x)}`
            : `y=${fmt(m.normal.slope)}x + (${fmt(m.normal.intercept)})`}
          .
        </p>
        <p>
          Eğim açısı: {fmt((m.angleRad * 180) / Math.PI)}°; pozitif x ekseninden
          saat yönünün tersine 0° ≤ θ &lt; 180° aralığında.
        </p>
        <p data-secant-result>
          İkinci nokta B=({fmt(m.secantPoint.x)}; {fmt(m.secantPoint.y)}). Kiriş
          eğimi {fmt(m.secantSlope)}; kiriş − teğet{" "}
          {fmt(m.secantSlope - m.slope)}.
        </p>
        <p data-linear-result>
          Doğrusal tahmin {fmt(m.predicted)}; gerçek değer{" "}
          {fmt(m.secantPoint.y)}; gerçek − tahmin {fmt(m.error)}.
        </p>
        <p>
          Temas türü:{" "}
          {m.contact === "ucuncu-derece-temas"
            ? "Üçüncü derece; eğri teğetin iki tarafına geçer."
            : m.contact === "dogru-cakisik"
              ? "Doğrusal fonksiyon ve teğeti çakışır."
              : "İkinci derece; teğete göre fark yerelde aynı işarettedir."}
        </p>
        <p data-extra-intersection>
          {m.otherIntersection
            ? `Diğer kesişim: (${fmt(m.otherIntersection.x)}; ${fmt(m.otherIntersection.y)}).`
            : m.contact === "dogru-cakisik"
              ? "Çakışan doğruların her noktası ortaktır."
              : "Temas dışında başka kesişim yok."}
        </p>
        <p>
          Eksenler T merkezli yerel alanı gösterir. Yatay ve düşey birim
          eşittir. Teğet uzun kesikli, normal noktalı, kiriş kısa kesikli, eğri
          düz çizgidir. İçi boş daire diğer kesişimi belirtir. Ekran dışında
          kalan noktalar için x ve y değerleri de yukarıda yer alır. h ≠ 0 iken
          kiriş vardır. Doğrusal tahmin her zaman kesin değer vermez.
        </p>
      </>
    );
    expected =
      m.normal.kind === "dusey"
        ? "vertical"
        : m.slope > 0
          ? "negative"
          : "positive";
    choices = [
      ["negative", "Normalin eğimi negatif"],
      ["positive", "Normalin eğimi pozitif"],
      ["vertical", "Normal düşey; sonlu eğimi yok"],
    ];
  }
  const validGuess = choices.some(([value]) => value === s.guess),
    validReason = s.reason.trim().length > 0;
  return (
    <section
      className="math024-lab"
      data-forge024={lessonId}
      aria-label={title}
    >
      <h3>{title}</h3>
      <p>{intro}</p>
      {rules && (
        <label className="math024-mode">
          İnceleme
          <select
            aria-label="İnceleme"
            value={powerMode ? "power" : "rules"}
            onChange={(e) => change({ mode: e.currentTarget.value, guess: "" })}
          >
            <option value="rules">Polinom türevleri</option>
            <option value="power">Rasyonel üs ve tanım alanı</option>
          </select>
        </label>
      )}
      <div className="math024-controls">{controls}</div>
      {diagram}
      <div className="math024-result" data-model-result>
        {result}
      </div>
      <div className="math024-prediction">
        <label>
          Sonuç tahminin
          <select
            aria-label="Sonuç tahminin"
            value={validGuess ? s.guess : ""}
            onChange={(e) => change({ guess: e.currentTarget.value })}
          >
            <option value="">Bir sonuç seç</option>
            {choices.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Modelden gerekçen
          <textarea
            aria-label="Modelden gerekçen"
            maxLength={240}
            value={s.reason}
            onChange={(e) =>
              change({ reason: e.currentTarget.value.slice(0, 240) })
            }
          />
        </label>
        <button
          className="secondary"
          disabled={!validGuess || !validReason || !validSelection}
          onClick={() => persist({ checked: true })}
        >
          Kanıtı gör
        </button>
        {s.checked && validGuess && validReason && validSelection && (
          <p className="math024-feedback" role="status">
            {s.guess === expected
              ? "Tahminin bu koşullarla uyumlu."
              : "Tahminini hesap ve tanım alanı ile yeniden karşılaştır."}
          </p>
        )}
      </div>
      <p className="small muted">
        Ondalık sayılar yuvarlanır. Çok küçük ama sıfır dışı değerler ekranda 0
        gibi görünebilir. Keşif, gerekçe ve kanıtı açma puan veya konu bitirme
        kaydı oluşturmaz.
      </p>
    </section>
  );
}
