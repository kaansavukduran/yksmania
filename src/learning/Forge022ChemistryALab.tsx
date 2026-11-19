import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  galvanicA022,
  nernstA022,
  electrolysisA022,
  faradayA022,
  protectionA022,
  cellChoicesA022,
  electrolyteChoicesA022,
  depositChoicesA022,
  protectorsA022,
} from "./forge022ChemistryA";
import "./forge022ChemistryA.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number, d = 6) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: d }).format(
    Object.is(n, -0) ? 0 : n,
  );
const clamp = (n: number, min: number, max: number, step = 1) =>
  Number.isFinite(n)
    ? Number(
        Math.max(
          min,
          Math.min(max, min + Math.round((n - min) / step) * step),
        ).toFixed(8),
      )
    : min;
const cap = (s: string) => s.slice(0, 120);

const readable = (text: string) => {
  const replacements: readonly (readonly [string, string])[] = [
    ["derişim/elektrot", "derişim / elektrot"],
    ["indirgenmesiyle", "e⁻ alması ile"],
    ["yükseltgenmesi", "e⁻ vermesi"],
    ["indirgenmesi", "e⁻ alması"],
    ["çökelme/pH", "çökelme / pH"],
    ["modellenmez", "hesap edilmez"],
    ["kullanılamaz", "uygun değil"],
    ["sağlanmıştır", "verilmiştir"],
    ["oksidasyon basamakları değişmeyen iyonlaşma", "redoks olmayan iyonlaşma"],
    ["çıkarılamaz", "elde edilemez"],
    ["hareketlidir", "yer değiştirir"],
    ["Eriyik sıcaklığında", "Bu eriyikte"],
    ["kaplanmaz", "birikmez"],
    ["tüketilirken", "azalırken"],
    [
      "metal bir elektrottan ötekine taşınır",
      "metal iki yüzey arasında taşınır",
    ],
  ];
  return replacements.reduce(
    (value, [before, after]) => value.replaceAll(before, after),
    text,
  );
};
type Options = readonly (readonly [string, string])[];
function Select({
  label,
  value,
  options,
  change,
}: {
  label: string;
  value: string;
  options: Options;
  change: (v: string) => void;
}) {
  const id = useId();
  return (
    <div className="ca022-field">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => change(e.target.value)}>
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </ChoiceSelect>
    </div>
  );
}
function Toggle({
  label,
  value,
  change,
}: {
  label: string;
  value: boolean;
  change: (v: boolean) => void;
}) {
  const id = useId();
  return (
    <label className="ca022-toggle" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={(e) => change(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
function Range({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  change,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  change: (n: number) => void;
}) {
  const id = useId(),
    editing = useRef(false),
    [raw, setRaw] = useState(String(value).replace(".", ",")),
    [error, setError] = useState("");
  useEffect(() => {
    if (!editing.current) setRaw(String(value).replace(".", ","));
  }, [value]);
  const commit = () => {
    editing.current = false;
    const text = raw.trim().replace(",", "."),
      n = Number(text);
    if (!text || !Number.isFinite(n)) {
      setRaw(String(value).replace(".", ","));
      setError("Geçerli bir sayı gir.");
      return;
    }
    const next = clamp(n, min, max, step);
    change(next);
    setRaw(String(next).replace(".", ","));
    setError(n < min || n > max ? `Aralık: ${fmt(min)} – ${fmt(max)}.` : "");
  };
  return (
    <div className="ca022-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          change(Number(e.target.value));
          setRaw(e.target.value.replace(".", ","));
          setError("");
        }}
      />
      <output htmlFor={id}>
        {fmt(value)} {unit}
      </output>
      <label htmlFor={`${id}-raw`}>Sayıyla gir</label>
      <input
        id={`${id}-raw`}
        type="text"
        inputMode="decimal"
        aria-label={`${label}, sayıyla`}
        value={raw}
        onFocus={() => {
          editing.current = true;
        }}
        onChange={(e) => {
          editing.current = true;
          setRaw(e.target.value);
          setError("");
        }}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit();
          }
          if (e.key === "Escape") {
            editing.current = false;
            setRaw(String(value).replace(".", ","));
            setError("");
          }
        }}
      />
      {error && <p role="status">{error}</p>}
    </div>
  );
}
function Values({ rows }: { rows: readonly (readonly [string, ReactNode])[] }) {
  return (
    <dl className="ca022-values">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
function Evidence({
  prediction,
  reason,
  checked,
  expected,
  options,
  change,
}: {
  prediction: string;
  reason: string;
  checked: boolean;
  expected: string;
  options: Options;
  change: (patch: {
    prediction?: string;
    reason?: string;
    checked?: boolean;
  }) => void;
}) {
  const id = useId(),
    valid = options.some(([key]) => key === prediction);
  return (
    <div className="ca022-evidence">
      <Select
        label="Tahminin"
        value={valid ? prediction : ""}
        options={[["", "Seç"], ...options]}
        change={(prediction) => change({ prediction, checked: false })}
      />
      <label htmlFor={id}>Gerekçen</label>
      <textarea
        id={id}
        rows={3}
        maxLength={120}
        value={cap(reason)}
        onChange={(e) =>
          change({ reason: cap(e.target.value), checked: false })
        }
      />
      <p>En az 8, en çok 120 işaret.</p>
      <button
        type="button"
        disabled={!valid || reason.trim().length < 8}
        onClick={() => change({ checked: true })}
      >
        Tahmini kıyasla
      </button>
      {checked && valid && (
        <p role="status">
          {prediction === expected
            ? "Tahminin modelle uyumlu."
            : "Sonuç farklı; verilen koşulu yeniden oku."}{" "}
          Gerekçene otomatik puan verilmez.
        </p>
      )}
    </div>
  );
}
function Note() {
  return (
    <p className="ca022-note">
      Bu model doğru soru, XP ya da biten konu kaydı vermez. Seçimlerin ve en
      çok 120 işaretlik gerekçen bu cihazda saklanır.
    </p>
  );
}
function Marker({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        markerWidth="7"
        markerHeight="7"
        refX="5"
        refY="3"
        orient="auto"
      >
        <path d="M0 0L6 3L0 6Z" fill="currentColor" />
      </marker>
    </defs>
  );
}
function CellLab() {
  const [v, set] = useExploration(
    "forge022-chemistry-a-elektrokimyasal-piller",
    {
      extent: 0.01,
      wire: true,
      ions: true,
      prediction: "",
      reason: "",
      checked: false,
    },
  );
  const m = galvanicA022(clamp(v.extent, 0, 0.02, 0.001), v.wire, v.ions),
    change = (patch: Partial<typeof v>) => set({ ...patch, checked: false }),
    arrow = useId().replace(/:/g, "");
  const zincHeight = (100 * m.zincMetal) / 0.03,
    copperHeight = 50 + (80 * (m.copperMetal - 0.01)) / 0.02;
  const status =
    m.status === "open"
      ? "Yol eksik; bu yeni deneyde aktarım yok."
      : m.status === "upper"
        ? "Stok hesabının üst sınırı seçildi."
        : m.status === "start"
          ? "İlk hâl; aktarım miktarı 0."
          : "Seçili miktarda Zn çözünür, Cu birikir.";
  return (
    <section className="ca022" data-forge022="elektrokimyasal-piller">
      <h3>Pili kur ve izle</h3>
      <p>
        Her seçim yeni bir başlangıç deneyidir. Zn metali 0,03; Zn²⁺ 0,01; Cu²⁺
        0,02 ve Cu metali 0,01 mol verilir. Yalnız Zn + Cu²⁺ → Zn²⁺ + Cu
        dönüşümü incelenir.
      </p>
      <div className="ca022-controls">
        <Range
          label="İlerleme ξ"
          value={m.extent}
          min={0}
          max={0.02}
          step={0.001}
          unit="mol"
          change={(extent) => change({ extent })}
        />
        <Toggle
          label="Tel bağlı"
          value={v.wire}
          change={(wire) => change({ wire })}
        />
        <Toggle
          label="İyon yolu bağlı"
          value={v.ions}
          change={(ions) => change({ ions })}
        />
      </div>
      <figure>
        <svg
          viewBox="0 0 340 300"
          role="img"
          aria-label="Zn anot ve Cu katot, dış telde elektron ve köprüde iyon yolu"
        >
          <Marker id={arrow} />
          <path
            className="ca022-wire"
            d={
              v.wire
                ? `M85 ${249 - zincHeight + 10}V52H255V${249 - copperHeight + 10}`
                : `M85 ${249 - zincHeight + 10}V52H146M194 52H255V${249 - copperHeight + 10}`
            }
          />
          {m.connected && m.xi > 0 && (
            <path
              className="ca022-active"
              d="M145 52H195"
              markerEnd={`url(#${arrow})`}
            />
          )}
          <text x="170" y="34" textAnchor="middle">
            e⁻
          </text>
          <path
            className="ca022-ion"
            d={
              v.ions ? "M115 180V95H225V180" : "M115 180V95H145M195 95H225V180"
            }
          />
          <text x="170" y="82" textAnchor="middle">
            KNO₃
          </text>
          {m.connected && m.xi > 0 && (
            <>
              <path
                className="ca022-active"
                d="M115 130V174"
                markerEnd={`url(#${arrow})`}
              />
              <path
                className="ca022-active"
                d="M225 130V174"
                markerEnd={`url(#${arrow})`}
              />
            </>
          )}
          <path
            className="ca022-vessel"
            d="M35 130V250H135V130M205 130V250H305V130"
          />
          <path
            className="ca022-water"
            d="M38 165H132V247H38ZM208 165H302V247H208Z"
          />
          <rect
            className="ca022-metal"
            x="70"
            y={249 - zincHeight}
            width="24"
            height={zincHeight}
          />
          <rect
            className="ca022-product"
            x="243"
            y={249 - copperHeight}
            width="24"
            height={copperHeight}
          />
          <path className="ca022-ground" d="M25 252H145M195 252H315" />
          <text x="85" y="283" textAnchor="middle">
            Zn −
          </text>
          <text x="255" y="283" textAnchor="middle">
            Cu +
          </text>
        </svg>
        <figcaption>
          Çubuk boyları temsilîdir. Zn anot, Cu katottur. NO₃⁻ anot, K⁺ katot
          çözeltisine gider; köprü elektron taşımaz.
        </figcaption>
      </figure>
      <div
        data-model-result
        data-extent={m.xi}
        data-electrons={m.electronMol}
        data-charge={m.charge}
        data-status={m.status}
      >
        <p className="ca022-outcome">{status}</p>
        <Values
          rows={[
            ["Zn metali", `${fmt(m.zincMetal)} mol`],
            ["Zn²⁺", `${fmt(m.zincIon)} mol`],
            ["Cu²⁺", `${fmt(m.copperIon)} mol`],
            ["Cu metali", `${fmt(m.copperMetal)} mol`],
            ["Aktarılan e⁻", `${fmt(m.electronMol)} mol`],
            ["Aktarılan yük", `${fmt(m.charge)} C`],
            ["Zn kaybı", `${fmt(m.zincMassLost)} g`],
            ["Cu artışı", `${fmt(m.copperMassGained)} g`],
          ]}
        />
        <p>
          NO₃⁻ anoda: {fmt(m.nitrateToAnode)} mol; K⁺ katoda:{" "}
          {fmt(m.potassiumToCathode)} mol. İki yük artığı:{" "}
          {fmt(m.anodeChargeResidual)} / {fmt(m.cathodeChargeResidual)} mol
          birim yük.
        </p>
        <p>
          ξ=0,02 mol yalnız stok oranının üst sınırıdır. Gerçek son denge, akım,
          süre ve anlık E hesap edilmez. E°=1,10 V bir standart başvuru
          değeridir. M(Zn)=65, M(Cu)=64 g/mol; F=96500 C/mol e⁻ verilir.
        </p>
      </div>
      <Evidence
        {...v}
        reason={cap(v.reason)}
        expected={m.status}
        options={[
          ["open", "Yol eksik"],
          ["start", "İlk hâl"],
          ["transfer", "Aktarım"],
          ["upper", "Üst sınır"],
        ]}
        change={set}
      />
      <Note />
    </section>
  );
}
function ConcentrationLab() {
  const [v, set] = useExploration(
    "forge022-chemistry-a-pil-gerilimi-derisim-pilleri",
    {
      kind: "copper",
      left: 0.1,
      right: 1,
      leftDilution: 1,
      rightDilution: 1,
      prediction: "",
      reason: "",
      checked: false,
    },
  );
  const kind = Object.hasOwn(cellChoicesA022, v.kind) ? v.kind : "copper",
    m = nernstA022(
      kind,
      clamp(v.left, 0.001, 1, 0.001),
      clamp(v.right, 0.001, 1, 0.001),
      clamp(v.leftDilution, 1, 10),
      clamp(v.rightDilution, 1, 10),
    ),
    change = (patch: Partial<typeof v>) => set({ ...patch, checked: false });
  const low = kind === "copper" ? -0.12 : 0.97,
    high = kind === "copper" ? 0.12 : 1.23,
    y = (e: number) => 230 - ((e - low) / (high - low)) * 170,
    x = (log: number) => 75 + ((log + 4) / 8) * 225,
    arrow = useId().replace(/:/g, "");
  return (
    <section className="ca022" data-forge022="pil-gerilimi-derisim-pilleri">
      <h3>Oranı değiştir, yönü izle</h3>
      <p>
        Seçilen ondalık sayılar esas alınır. Sıcaklık 25°C; ideal etkinlik ≈ c /
        (1 M). Hacimler toplanır, yalnız saf su eklenir. Yan tepkime ve sıvı
        temas farkı yok sayılır.
      </p>
      <div className="ca022-controls">
        <Select
          label="Hücre çifti"
          value={kind}
          options={Object.entries(cellChoicesA022).map(([k, d]) => [
            k,
            d.label,
          ])}
          change={(kind) => change({ kind })}
        />
        <Range
          label="Sol ilk derişim"
          value={m.leftInitial}
          min={0.001}
          max={1}
          step={0.001}
          unit="mol/L"
          change={(left) => change({ left })}
        />
        <Range
          label="Sağ ilk derişim"
          value={m.rightInitial}
          min={0.001}
          max={1}
          step={0.001}
          unit="mol/L"
          change={(right) => change({ right })}
        />
        <Range
          label="Sol son hacim / ilk hacim"
          value={m.leftDilution}
          min={1}
          max={10}
          unit="kat"
          change={(leftDilution) => change({ leftDilution })}
        />
        <Range
          label="Sağ son hacim / ilk hacim"
          value={m.rightDilution}
          min={1}
          max={10}
          unit="kat"
          change={(rightDilution) => change({ rightDilution })}
        />
      </div>
      <figure>
        <svg
          viewBox="0 0 340 310"
          role="img"
          aria-label="Yazılan sol-yükseltgenme yönünde logQ ile pil gerilimi"
        >
          <Marker id={arrow} />
          <path className="ca022-axis" d="M75 50V230H310" />
          {[low, (low + high) / 2, high].map((e) => (
            <g key={e}>
              <path className="ca022-grid" d={`M75 ${y(e)}H305`} />
              <text x="66" y={y(e) + 8} textAnchor="end">
                {fmt(e, 2)}
              </text>
            </g>
          ))}
          {[-4, -2, 0, 2, 4].map((n) => (
            <g key={n}>
              <path className="ca022-axis" d={`M${x(n)} 230V237`} />
              <text x={x(n)} y="267" textAnchor="middle">
                {n < 0 ? `−${-n}` : n}
              </text>
            </g>
          ))}
          <text x="8" y="27">
            E (V)
          </text>
          <text x="188" y="302" textAnchor="middle">
            log₁₀ Q
          </text>
          <path
            className="ca022-curve"
            d={`M${x(-4)} ${y(m.data.standard + 0.1184)}L${x(4)} ${y(m.data.standard - 0.1184)}`}
          />
          <circle
            className="ca022-dot"
            cx={x(m.logQ)}
            cy={y(m.signedVoltage)}
            r="7"
          />
        </svg>
        <figcaption>
          Eğri 25°C için E = E° − 0,0296 log₁₀Q. Nokta seçili oranı gösterir.
          Sıfırın altındaki E, yazılan sol→sağ yönün tersini destekler; hız
          ölçümü değildir.
        </figcaption>
      </figure>
      <div
        data-model-result
        data-voltage={m.signedVoltage}
        data-direction={m.direction}
        data-left={m.left}
        data-right={m.right}
      >
        <p className="ca022-outcome">
          {m.direction === "equal"
            ? "E=0; net yön yok."
            : m.direction === "right"
              ? "Elektron yönü soldan sağa."
              : "Elektron yönü sağdan sola."}
        </p>
        <Values
          rows={[
            [`Sol ${m.data.leftIon}`, `${fmt(m.left)} mol/L`],
            [`Sağ ${m.data.rightIon}`, `${fmt(m.right)} mol/L`],
            ["Q", fmt(m.quotient)],
            ["log₁₀ Q", fmt(m.logQ)],
            ["E°", `${fmt(m.data.standard, 4)} V`],
            ["Yazılan yön E", `${fmt(m.signedVoltage, 6)} V`],
            [
              "Anot",
              m.anode === "left"
                ? "Sol"
                : m.anode === "right"
                  ? "Sağ"
                  : "Net rol yok",
            ],
          ]}
        />
        <p>
          Son derişimler: {fmt(m.leftInitial)} / {m.leftDilution} ={" "}
          {fmt(m.left)} ve {fmt(m.rightInitial)} / {m.rightDilution} ={" "}
          {fmt(m.right)} mol/L. n=2; E°={fmt(m.data.standard)} V.
        </p>
        <p>
          Yazılan yön: solda e⁻ verme, sağda e⁻ alma. Q=sol iyon / sağ iyon.
          Gerçek yük altı kaybı, direnç ve serbest iyonu değiştiren yan süreçler
          hesap edilmez. Sıcaklık etkisi için bu 25°C katsayısı evrensel
          değildir.
        </p>
      </div>
      <Evidence
        {...v}
        reason={cap(v.reason)}
        expected={m.direction}
        options={[
          ["right", "Sağa"],
          ["left", "Sola"],
          ["equal", "Yön yok"],
        ]}
        change={set}
      />
      <Note />
    </section>
  );
}
function ElectrolysisLab() {
  const [v, set] = useExploration("forge022-chemistry-a-elektroliz", {
    kind: "water",
    electrons: 0.02,
    powered: true,
    reversed: false,
    prediction: "",
    reason: "",
    checked: false,
  });
  const kind = Object.hasOwn(electrolyteChoicesA022, v.kind) ? v.kind : "water",
    m = electrolysisA022(
      kind,
      clamp(v.electrons, 0, 0.04, 0.002),
      v.powered,
      v.reversed,
    ),
    change = (patch: Partial<typeof v>) => set({ ...patch, checked: false });
  const cathodeX = m.cathodeSide === "left" ? 70 : 270,
    anodeX = m.anodeSide === "left" ? 70 : 270,
    catGlyph =
      kind === "molten" ? "Na" : kind.startsWith("copper") ? "Cu" : "H₂",
    anGlyph =
      kind === "molten" || kind === "brine"
        ? "Cl₂"
        : kind === "copperActive"
          ? "Cu²⁺"
          : "O₂";
  const expected =
    !m.powered || m.actualElectrons === 0
      ? "none"
      : kind === "molten" || kind.startsWith("copper")
        ? "metal"
        : "gas";
  const opts: Options = [
    ["molten", "Eriyik"],
    ["water", "Su"],
    ["copperInert", "Cu / Pt"],
    ["copperActive", "Cu / Cu"],
    ["brine", "NaCl"],
    ["magnesiumWater", "MgSO₄"],
  ];
  return (
    <section className="ca022" data-forge022="elektroliz">
      <h3>Önce ortamı, sonra ürünü seç</h3>
      <p>
        Altı hazır hücrede verilen baskın yarı tepkimeler kullanılır. Genel bir
        ürün tahmin motoru değildir; yeterli dış gerilim ve iyon stoku
        varsayılır.
      </p>
      <div className="ca022-controls">
        <Select
          label="Hazır hücre"
          value={kind}
          options={opts}
          change={(kind) => change({ kind })}
        />
        <Range
          label="Geçen e⁻ miktarı"
          value={m.electronMol}
          min={0}
          max={0.04}
          step={0.002}
          unit="mol"
          change={(electrons) => change({ electrons })}
        />
        <Toggle
          label="Kaynak enerji veriyor"
          value={m.powered}
          change={(powered) => change({ powered })}
        />
        <Toggle
          label="Kutupları ters bağla"
          value={m.reversed}
          change={(reversed) => change({ reversed })}
        />
      </div>
      <p>{readable(m.data.medium)}</p>
      <figure>
        <svg
          viewBox="0 0 340 310"
          role="img"
          aria-label="Dış kaynağın kutupları, gerçek konumlarında anot/katot ve ürünler"
        >
          <rect
            className="ca022-source"
            x="130"
            y="24"
            width="80"
            height="42"
          />
          <text x="170" y="54" textAnchor="middle">
            DC
          </text>
          <path className="ca022-wire" d="M130 45H70V155M210 45H270V155" />
          <text x="70" y="106" textAnchor="middle">
            {m.leftSign}
          </text>
          <text x="270" y="106" textAnchor="middle">
            {m.rightSign}
          </text>
          <path className="ca022-vessel" d="M30 120V250H310V120" />
          <path className="ca022-water" d="M33 165H307V247H33Z" />
          <rect
            className="ca022-metal"
            x="58"
            y="130"
            width="24"
            height="117"
          />
          <rect
            className="ca022-product"
            x="258"
            y="130"
            width="24"
            height="117"
          />
          <path className="ca022-ground" d="M20 252H320" />
          {m.actualElectrons > 0 && (
            <>
              <circle
                className="ca022-bubble"
                cx={cathodeX + 24}
                cy="190"
                r="8"
              />
              <circle
                className="ca022-bubble"
                cx={anodeX - 24}
                cy="198"
                r="8"
              />
            </>
          )}
          <text x={cathodeX} y="282" textAnchor="middle">
            {catGlyph}
          </text>
          <text x={anodeX} y="282" textAnchor="middle">
            {anGlyph}
          </text>
        </svg>
        <figcaption>
          Şekildeki tanecikler temsilîdir; sayıları mol ölçüsü değildir. Katot{" "}
          {m.cathodeSide === "left" ? "solda" : "sağda"} ve −; anot{" "}
          {m.anodeSide === "left" ? "solda" : "sağda"} ve +. DC dış güç
          kaynağını gösterir.
        </figcaption>
      </figure>
      <div
        data-model-result
        data-cathode-mol={m.cathodeMol}
        data-anode-mol={m.anodeMol}
        data-cathode-side={m.cathodeSide}
        data-kind={kind}
      >
        <p className="ca022-outcome">
          {m.status === "off"
            ? "Kaynak kapalı; ürün aktarımı 0."
            : m.status === "zero"
              ? "Yük 0; ürün miktarı 0."
              : `Katot: ${m.data.cathode}; anot: ${m.data.anode}.`}
        </p>
        <p>Katot: {m.data.cathodeHalf}</p>
        <p>Anot: {m.data.anodeHalf}</p>
        <p>Net: {m.data.net}</p>
        <Values
          rows={[
            ["Katot ürünü", `${fmt(m.cathodeMol)} mol`],
            ["Anot ürünü", `${fmt(m.anodeMol)} mol`],
            ["Geçen yük", `${fmt(m.charge)} C`],
            ["İki tarafta e⁻", `${fmt(m.actualElectrons)} mol`],
          ]}
        />
        <p>{readable(m.data.why)}</p>
        <p>{readable(m.data.excluded)}</p>
        <p>
          İki ürün aynı e⁻ bütçesine dayanır. Su gazlarında hacim 2:1 bağı ancak
          aynı T/P ve uygun kuru gaz toplama koşulunda kurulur. Bu hücreler için
          akım hızı veya gerçek yan ürün miktarı verilmez.
        </p>
      </div>
      <p>Katot ürünü ne olur?</p>
      <Evidence
        {...v}
        reason={cap(v.reason)}
        expected={expected}
        options={[
          ["metal", "Metal"],
          ["gas", "Gaz"],
          ["none", "Ürün yok"],
        ]}
        change={set}
      />
      <Note />
    </section>
  );
}
function FaradayLab() {
  const [v, set] = useExploration("forge022-chemistry-a-faraday-yasalari", {
    kind: "copper",
    current: 2,
    seconds: 965,
    share: 100,
    stock: 0.02,
    prediction: "",
    reason: "",
    checked: false,
  });
  const kind = Object.hasOwn(depositChoicesA022, v.kind) ? v.kind : "copper",
    m = faradayA022(
      kind,
      clamp(v.current, 0, 5, 0.5),
      clamp(v.seconds, 0, 3600),
      clamp(v.share, 0, 100, 10),
      clamp(v.stock, 0, 0.1, 0.005),
    ),
    change = (patch: Partial<typeof v>) => set({ ...patch, checked: false });
  const yMax = Math.max(0.1, m.initialMoles * m.data.mass),
    y = (mass: number) => 230 - (mass / yMax) * 170,
    x = (q: number) => 75 + (q / 18000) * 225;
  const points = Array.from({ length: 37 }, (_, i) => {
    const q = i * 500,
      mass =
        Math.min(
          (q * m.targetShare) / 100 / (m.data.z * 96500),
          m.initialMoles,
        ) * m.data.mass;
    return `${x(q)},${y(mass)}`;
  }).join(" ");
  const expected =
    m.charge === 0 || m.targetShare === 0
      ? "zero"
      : m.stockLimited
        ? "stock"
        : "charge";
  return (
    <section className="ca022" data-forge022="faraday-yasalari">
      <h3>Yükü ve stok tavanını kıyasla</h3>
      <p>
        F=96500 C/mol e⁻ verilir. Akım sabit, anot inerttir. Hedef payı, iyon
        yeterli ise metal için ayrılan yüzde yükü gösterir. İyon stoku biterse
        hedef metal durur; kalan yük başka süreçlere gider.
      </p>
      <div className="ca022-controls">
        <Select
          label="Hedef iyon"
          value={kind}
          options={Object.entries(depositChoicesA022).map(([k, d]) => [
            k,
            d.label,
          ])}
          change={(kind) => change({ kind })}
        />
        <Range
          label="Akım I"
          value={m.current}
          min={0}
          max={5}
          step={0.5}
          unit="A"
          change={(current) => change({ current })}
        />
        <Range
          label="Süre t"
          value={m.seconds}
          min={0}
          max={3600}
          unit="s"
          change={(seconds) => change({ seconds })}
        />
        <Range
          label="Hedef payı"
          value={m.targetShare}
          min={0}
          max={100}
          step={10}
          unit="%"
          change={(share) => change({ share })}
        />
        <Range
          label="İlk iyon stoku"
          value={m.initialMoles}
          min={0}
          max={0.1}
          step={0.005}
          unit="mol"
          change={(stock) => change({ stock })}
        />
      </div>
      <p>
        {readable(m.data.medium)} M={m.data.mass} g/mol; z={m.data.z}.
      </p>
      <figure>
        <svg
          viewBox="0 0 340 310"
          role="img"
          aria-label="Hedef yük payı ve sonlu iyon stokuyla biriken metal kütlesi"
        >
          <path className="ca022-axis" d="M75 50V230H310" />
          {[0, yMax / 2, yMax].map((n) => (
            <g key={n}>
              <path className="ca022-grid" d={`M75 ${y(n)}H305`} />
              <text x="66" y={y(n) + 8} textAnchor="end">
                {fmt(n, 2)}
              </text>
            </g>
          ))}
          {[0, 9000, 18000].map((n) => (
            <text
              key={n}
              x={x(n)}
              y="267"
              textAnchor={n === 18000 ? "end" : "middle"}
            >
              {n === 18000 ? "18 000" : n === 9000 ? "9000" : "0"}
            </text>
          ))}
          <text x="8" y="27">
            m (g)
          </text>
          <text x="187" y="302" textAnchor="middle">
            Q (C)
          </text>
          <polyline className="ca022-curve" points={points} />
          <circle
            className="ca022-dot"
            cx={x(m.charge)}
            cy={y(m.depositedMass)}
            r="7"
          />
        </svg>
        <figcaption>
          Eğri seçili iyon, pay ve stok için m(Q)’yu gösterir. Stok tavanında
          metal artışı durur. Başka bir akım veya süreyle aynı Q geçerse bu
          ideal bütçe aynı olur.
        </figcaption>
      </figure>
      <div
        data-model-result
        data-mass={m.depositedMass}
        data-charge={m.charge}
        data-target-charge={m.targetCharge}
        data-share={m.actualShare ?? "none"}
        data-stock-limited={m.stockLimited}
      >
        <p className="ca022-outcome">
          {expected === "zero"
            ? "Hedefe yük yok; metal artışı 0."
            : m.stockLimited
              ? "Hedef metal, ilk iyon stoku ile sınırlı."
              : "Seçili yük, stok tavanını aşmıyor."}
        </p>
        <Values
          rows={[
            ["Toplam Q", `${fmt(m.charge)} C`],
            ["Toplam e⁻", `${fmt(m.electronMol)} mol`],
            ["Hedef yük", `${fmt(m.targetCharge)} C`],
            ["Diğer süreç yükü", `${fmt(m.otherCharge)} C`],
            ["Biriken metal", `${fmt(m.depositedMass)} g`],
            ["Artan iyon", `${fmt(m.remainingMoles)} mol`],
            [
              "Son hedef payı",
              m.actualShare === null ? "Yük yok" : `%${fmt(m.actualShare, 3)}`,
            ],
          ]}
        />
        <p>
          Q = I · t = {fmt(m.current)} × {fmt(m.seconds)} = {fmt(m.charge)} C.
          Stok tavanı zF · n₀ = {fmt(m.stockCharge)} C. Hedef yük = min({" "}
          {fmt(m.idealTargetCharge)}; {fmt(m.stockCharge)}) C.
        </p>
        <p>
          Biriken mol {fmt(m.depositedMoles)} + artan mol{" "}
          {fmt(m.remainingMoles)} = {fmt(m.initialMoles)}. Hedef ve diğer yük
          toplamı {fmt(m.targetCharge + m.otherCharge)} C. Enerji verimi, yan
          ürün türü veya gerçek banyo hızı tahmini yapılmaz.
        </p>
      </div>
      <Evidence
        {...v}
        reason={cap(v.reason)}
        expected={expected}
        options={[
          ["zero", "Yük yok"],
          ["stock", "Stok"],
          ["charge", "Yük"],
        ]}
        change={set}
      />
      <Note />
    </section>
  );
}
function ProtectionLab() {
  const [v, set] = useExploration(
    "forge022-chemistry-a-korozyon-katodik-koruma",
    {
      partner: "Zn",
      contact: true,
      wet: true,
      barrier: false,
      mass: 0.65,
      demand: 1500,
      prediction: "",
      reason: "",
      checked: false,
    },
  );
  const partner =
      v.partner === "none" || Object.hasOwn(protectorsA022, v.partner)
        ? v.partner
        : "Zn",
    m = protectionA022(
      partner,
      v.contact,
      v.wet,
      v.barrier,
      clamp(v.mass, 0, 20, 0.05),
      clamp(v.demand, 0, 5000, 50),
    ),
    change = (patch: Partial<typeof v>) => set({ ...patch, checked: false }),
    arrow = useId().replace(/:/g, "");
  const active = m.validPath && m.sacrificialCandidate;
  const remainingHeight = active && m.mass > 0 ? 67 * m.remainingMass / m.mass : 67;
  const expected =
    m.status === "barrier"
      ? "barrier"
      : m.status === "dry"
        ? "dry"
        : m.status === "ironAnode"
          ? "iron"
          : active
            ? "sacrifice"
            : "missing";
  const status =
    m.status === "barrier"
      ? "İdeal bariyer: sulu temas yok."
      : m.status === "dry"
        ? "Bu sulu modelde iyon yolu yok."
        : m.status === "separate"
          ? "Kurban desteği için metal veya tel yolu eksik."
          : m.status === "ironAnode"
            ? "Bu kıyasta Fe anodik risk taşır."
            : m.status === "candidate"
              ? "Kurban aday var; örnek yük ihtiyacı0."
              : m.status === "budgetEnough"
                ? "Örnek e⁻ bütçesi için stok yeterli."
                : "Örnek e⁻ bütçesi için stok yetmiyor.";
  return (
    <section className="ca022" data-forge022="korozyon-katodik-koruma">
      <h3>Yüzeyi ve iki yolu denetle</h3>
      <p>
        Fe yapısı ve seçili metalin uygun sulu ortamda kıyasıdır. Girilen yük,
        ayrı bir örnek e⁻ ihtiyacıdır; ölçülmüş korozyon akımı değildir. Stok
        hesabı gerçek koruma tasarımı veya yıl ömrü vermez.
      </p>
      <div className="ca022-controls">
        <Select
          label="Yan metal"
          value={partner}
          options={[
            ["none", "Yok"],
            ...Object.keys(protectorsA022).map((k) => [k, k] as const),
          ]}
          change={(partner) => change({ partner })}
        />
        <Toggle
          label="Metalik tel bağlı"
          value={v.contact}
          change={(contact) => change({ contact })}
        />
        <Toggle
          label="Sulu iyon yolu var"
          value={v.wet}
          change={(wet) => change({ wet })}
        />
        <Toggle
          label="Bariyer kusursuz"
          value={v.barrier}
          change={(barrier) => change({ barrier })}
        />
        <Range
          label="Yan metal stoku"
          value={m.mass}
          min={0}
          max={20}
          step={0.05}
          unit="g"
          change={(mass) => change({ mass })}
        />
        <Range
          label="Örnek yük ihtiyacı"
          value={m.demand}
          min={0}
          max={5000}
          step={50}
          unit="C"
          change={(demand) => change({ demand })}
        />
      </div>
      <figure>
        <svg
          viewBox="0 0 340 310"
          role="img"
          aria-label="Fe yüzeyi, ortam ve yan metalin gerçek temas yolları"
        >
          <Marker id={arrow} />
          {m.wet && <path className="ca022-water" d="M24 155H316V250H24Z" />}
          <path className="ca022-ground" d="M15 252H325" />
          <rect
            className="ca022-metal"
            x="44"
            y="185"
            width="102"
            height="67"
          />
          {m.intactBarrier && (
            <rect
              className="ca022-barrier"
              x="37"
              y="178"
              width="116"
              height="74"
            />
          )}
          {m.hasPartner && (<>
            <rect className="ca022-stock-outline" x="250" y="185" width="35" height="67" fill="none" stroke="currentColor" />
            <rect
              className="ca022-product"
              data-remaining-stock={m.remainingMass}
              x="250"
              y={252 - remainingHeight}
              width="35"
              height={remainingHeight}
            />
          </>)}
          <path
            className="ca022-wire"
            d={
              m.contact ? "M94 185V80H267V185" : "M94 185V80H160M210 80H267V185"
            }
          />
          {active && m.supplied > 0 && (
            <path
              className="ca022-active"
              d="M220 80H145"
              markerEnd={`url(#${arrow})`}
            />
          )}
          <text x="181" y="62" textAnchor="middle">
            e⁻
          </text>
          <text x="95" y="280" textAnchor="middle">
            Fe
          </text>
          <text x="267" y="280" textAnchor="middle">
            {partner === "none" ? "Yok" : partner}
          </text>
          <text x="95" y="150" textAnchor="middle">
            Yapı
          </text>
          <text x="267" y="150" textAnchor="middle">
            Metal
          </text>
        </svg>
        <figcaption>
          Ok, kurban metal için e⁻ aktarım yönünü gösterir; hız ölçüsü değildir.
          Dolgu kalan stok payıdır; boş sınır, kurban metalin tükendiğini gösterir.
          Bu boyut bir kütle payı şemasıdır; elektrodun gerçek şeklini vermez.
          O₂ nötrdür; katodik koruma negatif oksijenin itilmesi değildir.
        </figcaption>
      </figure>
      <div
        data-model-result
        data-status={m.status}
        data-capacity={m.capacity}
        data-supplied={m.supplied}
        data-remaining={m.remainingMass}
      >
        <p className="ca022-outcome">{status}</p>
        <p>
          Fe²⁺/Fe E°=−0,440 V.{" "}
          {m.data
            ? `${partner} çiftinin E° değeri ${fmt(m.data.reduction, 3)} V; verilen mol kütlesi ${m.data.molarMass} g/mol.`
            : "Yan metal yok."}
        </p>
        {active ? (
          <>
            <Values
              rows={[
                ["Stok üst kapasitesi", `${fmt(m.capacity, 3)} C`],
                ["Örnek için ayrılan", `${fmt(m.supplied, 3)} C`],
                ["Bütçe açığı", `${fmt(m.gap, 3)} C`],
                ["Kullanılan metal", `${fmt(m.usedMass, 6)} g`],
                ["Artan metal", `${fmt(m.remainingMass, 6)} g`],
              ]}
            />
            <p>
              Qüst = zF · m / M. Kullanılan {fmt(m.usedMass)} + kalan{" "}
              {fmt(m.remainingMass)} = ilk {fmt(m.mass)} g. Stok tavanı, %100
              ideal anot kullanımı içindir.
            </p>
          </>
        ) : (
          <p>
            Bu seçimde kurban yükü hesabı koruma kanıtı vermez. Bariyer, iyon
            yolu, tel ve metal rolü önce ayrı ayrı denetlenir.
          </p>
        )}
        <p>
          Pasif film, alan, akım dağılımı ve gerçek koruma potansiyeli verilmez.
          Fe kaybı veya yıl ömrü hesap edilmez. Cu gibi soy bir temas, Fe’yi
          kurban anot olmaktan koruyan aktif metal değildir. Harici akım yöntemi
          bu galvanik kurban yolundan farklıdır.
        </p>
      </div>
      <Evidence
        {...v}
        reason={cap(v.reason)}
        expected={expected}
        options={[
          ["barrier", "Bariyer"],
          ["dry", "Kuru"],
          ["iron", "Fe anot"],
          ["sacrifice", "Kurban"],
          ["missing", "Yol eksik"],
        ]}
        change={set}
      />
      <Note />
    </section>
  );
}
export default function Forge022ChemistryALab({
  lessonId,
}: {
  lessonId: string;
}) {
  if (lessonId === "elektrokimyasal-piller") return <CellLab />;
  if (lessonId === "pil-gerilimi-derisim-pilleri") return <ConcentrationLab />;
  if (lessonId === "elektroliz") return <ElectrolysisLab />;
  if (lessonId === "faraday-yasalari") return <FaradayLab />;
  if (lessonId === "korozyon-katodik-koruma") return <ProtectionLab />;
  return null;
}
