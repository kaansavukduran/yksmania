import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  solubilityFactors021,
  thermalChoices021,
  thermalTemperatures021,
  redoxLedger021,
  redoxFamilies021,
  redoxSpecies021,
  activity021,
  activityCouples021,
  type ChemicalTerm021,
  type Metal021,
} from "./forge021Chemistry";
import "./forge021Chemistry.css";

const fmt = (value: number, digits = 6) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Object.is(value, -0) ? 0 : value,
  );
const bounded = (value: number, min: number, max: number, step = 1) =>
  Number.isFinite(value)
    ? Number(
        Math.max(
          min,
          Math.min(max, min + Math.round((value - min) / step) * step),
        ).toFixed(8),
      )
    : min;
const short = (value: string) => value.slice(0, 120);
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
  change: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="c021-field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(event) => change(event.target.value)}
      >
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
    </div>
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
  change: (value: number) => void;
}) {
  const id = useId(),
    editing = useRef(false),
    [draft, setDraft] = useState(String(value).replace(".", ",")),
    [message, setMessage] = useState("");
  useEffect(() => {
    if (!editing.current) setDraft(String(value).replace(".", ","));
  }, [value]);
  const commit = () => {
    editing.current = false;
    const raw = draft.trim().replace(",", "."),
      parsed = Number(raw);
    if (!raw || !Number.isFinite(parsed)) {
      setDraft(String(value).replace(".", ","));
      setMessage("Geçerli bir sayı gir.");
      return;
    }
    const next = bounded(parsed, min, max, step);
    change(next);
    setDraft(String(next).replace(".", ","));
    setMessage(
      parsed < min || parsed > max ? `Aralık: ${fmt(min)} – ${fmt(max)}.` : "",
    );
  };
  return (
    <div className="c021-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => {
          change(Number(event.target.value));
          setDraft(event.target.value.replace(".", ","));
          setMessage("");
        }}
      />
      <output htmlFor={id}>
        {fmt(value)} {unit}
      </output>
      <label className="c021-number-label" htmlFor={`${id}-number`}>
        Sayıyla gir
      </label>
      <input
        id={`${id}-number`}
        type="text"
        inputMode="decimal"
        aria-label={`${label}, sayıyla`}
        value={draft}
        onFocus={() => {
          editing.current = true;
        }}
        onChange={(event) => {
          editing.current = true;
          setDraft(event.target.value);
          setMessage("");
        }}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            commit();
          }
          if (event.key === "Escape") {
            editing.current = false;
            setDraft(String(value).replace(".", ","));
            setMessage("");
          }
        }}
      />
      {message && <p role="status">{message}</p>}
    </div>
  );
}
function ResultGrid({
  rows,
}: {
  rows: readonly (readonly [string, ReactNode])[];
}) {
  return (
    <dl className="c021-results">
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
  change: (value: {
    prediction?: string;
    reason?: string;
    checked?: boolean;
  }) => void;
}) {
  const id = useId(),
    valid = options.some(([key]) => key === prediction);
  return (
    <div className="c021-evidence">
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
        value={short(reason)}
        onChange={(event) =>
          change({ reason: short(event.target.value), checked: false })
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
          Bu kayıt puan vermez.
        </p>
      )}
    </div>
  );
}
function EndNote() {
  return (
    <p className="c021-note">
      Bu model doğru soru, XP ya da biten konu kaydı vermez. Seçimlerin ve
      gerekçen bu cihazda saklanır.
    </p>
  );
}

function SolubilityLab() {
  const [v, set] = useExploration("forge021-chemistry-cozunurluk-faktorleri", {
    thermal: "endo",
    temperature: 25,
    common: 0,
    amount: 0.025,
    volume: 1,
    prediction: "",
    reason: "",
    checked: false,
  });
  const thermal = Object.hasOwn(thermalChoices021, v.thermal)
    ? (v.thermal as keyof typeof thermalChoices021)
    : "endo";
  const temperature = thermalTemperatures021.includes(
    v.temperature as 10 | 25 | 40,
  )
    ? v.temperature
    : 25;
  const m = solubilityFactors021(
    thermal,
    temperature,
    bounded(v.common, 0, 0.1, 0.005),
    bounded(v.amount, 0, 0.12, 0.005),
    bounded(v.volume, 0.25, 2, 0.25),
  );
  const change = (patch: Partial<typeof v>) =>
    set({ ...patch, checked: false });
  const phase =
    m.phase === "solid" ? "solid" : m.phase === "limit" ? "limit" : "all";
  const text =
    m.phase === "solid"
      ? "Katı kalır; çözelti doygun."
      : m.phase === "limit"
        ? "Tam sınır: katı yok, çözelti doygun."
        : "Katı bitti; çözelti doymadı.";
  const y = (k: number) => 190 - (k / 0.0009) * 140;
  return (
    <section className="c021" data-forge021="cozunurluk-faktorleri">
      <h3>Tuz ve dengeyi değiştir</h3>
      <p>
        Temsilî MX tuzu için aşağıdaki Kç tablosu verilmiştir. Gerçek bir tuzun
        ölçümü değildir. Seçili sıcaklık, ortak iyon ve stokla hangi fazın
        kaldığını tahmin et.
      </p>
      <div className="c021-controls">
        <Select
          label="Çözünme ısısı"
          value={thermal}
          options={Object.entries(thermalChoices021)}
          change={(thermal) => change({ thermal })}
        />
        <Select
          label="Sıcaklık"
          value={String(temperature)}
          options={thermalTemperatures021.map(
            (t) => [String(t), `${t} °C`] as const,
          )}
          change={(temperature) => change({ temperature: Number(temperature) })}
        />
        <Range
          label="Ortak M⁺ (mol/L)"
          value={m.common}
          min={0}
          max={0.1}
          step={0.005}
          unit="mol/L"
          change={(common) => change({ common })}
        />
        <Range
          label="Tuz stoku (mol)"
          value={m.amount}
          min={0}
          max={0.12}
          step={0.005}
          unit="mol"
          change={(amount) => change({ amount })}
        />
        <Range
          label="Son hacim (L)"
          value={m.volume}
          min={0.25}
          max={2}
          step={0.25}
          unit="L"
          change={(volume) => change({ volume })}
        />
      </div>
      <div className="c021-figures">
        <figure>
          <svg
            viewBox="0 0 340 270"
            role="img"
            aria-label="Çözeltide kalan iyon derişimleri ve tabana oturan MX katısının miktarı"
          >
            <path className="c021-vessel" d="M35 45V210H160V45" />
            <path className="c021-liquid" d="M38 105H157V207H38Z" />
            {m.solid > 0 && (
              <rect
                className="c021-solid"
                x="39"
                y={207 - Math.min(60, (m.solid / 0.12) * 60)}
                width="117"
                height={Math.min(60, (m.solid / 0.12) * 60)}
              />
            )}
            <path className="c021-ground" d="M25 212H170" />
            <text x="96" y="30" textAnchor="middle">
              MX
            </text>
            <text x="96" y="246" textAnchor="middle">
              Katı: {fmt(m.solid, 3)}
            </text>
            <path className="c021-axis" d="M205 70V210H328" />
            <rect
              className="c021-metal-fill"
              x="220"
              y={210 - (m.mIon / 0.13) * 120}
              width="35"
              height={(m.mIon / 0.13) * 120}
            />
            <rect
              className="c021-ion-fill"
              x="279"
              y={210 - (m.xIon / 0.13) * 120}
              width="35"
              height={(m.xIon / 0.13) * 120}
            />
            <text x="238" y="54" textAnchor="middle">
              M⁺
            </text>
            <text x="296" y="54" textAnchor="middle">
              X⁻
            </text>
            <text x="264" y="246" textAnchor="middle">
              mol/L
            </text>
          </svg>
          <figcaption>
            Katı tabanda gösterilir. İyon çubukları için ortak üst ölçek 0,13
            mol/L; çizim gerçek tanecik sayısı değildir. Katı etiketi mol ile
            yazılır.
          </figcaption>
        </figure>
        <figure>
          <svg
            viewBox="0 0 340 270"
            role="img"
            aria-label="Verilen üç sıcaklığın temsilî çözünürlük çarpımı değerleri"
          >
            <path className="c021-axis" d="M100 35V190H319" />
            {[
              [0, "0"],
              [0.0004, "4×10⁻⁴"],
              [0.0009, "9×10⁻⁴"],
            ].map(([n, label]) => (
              <g key={String(n)}>
                <line
                  className="c021-grid"
                  x1="100"
                  y1={y(Number(n))}
                  x2="319"
                  y2={y(Number(n))}
                />
                <text x="91" y={y(Number(n)) + 8} textAnchor="end">
                  {label}
                </text>
              </g>
            ))}
            <text x="14" y="27">
              Kç
            </text>
            <polyline
              className="c021-curve"
              points={m.table
                .map((row, i) => `${110 + i * 95},${y(row.k)}`)
                .join(" ")}
            />
            {m.table.map((row, i) => (
              <g key={row.temperature}>
                <circle
                  className={
                    row.temperature === temperature
                      ? "c021-selected-dot"
                      : "c021-dot"
                  }
                  cx={110 + i * 95}
                  cy={y(row.k)}
                  r={row.temperature === temperature ? 8 : 5}
                />
                <text x={110 + i * 95} y="226" textAnchor="middle">
                  {row.temperature}
                </text>
              </g>
            ))}
            <text x="205" y="260" textAnchor="middle">
              Sıcaklık (°C)
            </text>
          </svg>
          <figcaption>
            Yalnız üç verilen sıcaklık seçilir. Bağlayan çizgi ara sıcaklıklar
            için doğrusal Kç yasası değildir.
          </figcaption>
        </figure>
      </div>
      <div
        data-model-result
        data-saturation={m.saturation}
        data-solid={m.solid}
        data-dissolved={m.dissolved}
        data-quotient={m.quotient}
      >
        <p className="c021-outcome">{text}</p>
        <ResultGrid
          rows={[
            ["Kç", fmt(m.k, 8)],
            ["Sınır s", `${fmt(m.saturation, 6)} mol/L`],
            ["Gerçek M⁺", `${fmt(m.mIon, 6)} mol/L`],
            ["Gerçek X⁻", `${fmt(m.xIon, 6)} mol/L`],
            ["Q", fmt(m.quotient, 8)],
            ["Çözünen", `${fmt(m.dissolved, 6)} mol`],
            ["Kalan katı", `${fmt(m.solid, 6)} mol`],
          ]}
        />
        <p>
          İyon çarpımı: ({fmt(m.common)} + {fmt(m.actual)}) × {fmt(m.actual)} ={" "}
          {fmt(m.quotient, 8)}. Stok: {fmt(m.dissolved)} + {fmt(m.solid)} ={" "}
          {fmt(m.amount)} mol.
        </p>
        <p>
          Son hacim sabit seçilir. M⁺ ile aynı derişimde seyirci Y⁻ vardır. Yan
          asit-baz ya da kompleks tepkimesi yok; derişimler ideal kabul edilir.
          Bütün katı biterse Q, Kç’nin altında kalabilir.
        </p>
        <ul className="c021-values">
          {m.table.map((row) => (
            <li key={row.temperature}>
              {row.temperature} °C: Kç = {fmt(row.k, 8)}
            </li>
          ))}
        </ul>
      </div>
      <Evidence
        prediction={v.prediction}
        reason={v.reason}
        checked={v.checked}
        expected={phase}
        options={[
          ["solid", "Katı kalır"],
          ["all", "Doymadı"],
          ["limit", "Tam sınır"],
        ]}
        change={set}
      />
      <EndNote />
    </section>
  );
}
function Terms({ terms }: { terms: ChemicalTerm021[] }) {
  return (
    <div className="c021-terms">
      {terms.length ? (
        terms.map((term, index) => (
          <span className="c021-term-wrap" key={term.id}>
            {index > 0 && <span aria-hidden="true"> + </span>}
            <span className="c021-term">
              {term.coefficient !== 1 ? `${term.coefficient} ` : ""}
              {redoxSpecies021[term.id].label}
            </span>
          </span>
        ))
      ) : (
        <span>Tür yok</span>
      )}
    </div>
  );
}
function HalfEquation({
  left,
  right,
  electrons,
  receives,
}: {
  left: readonly (readonly [string, number])[];
  right: readonly (readonly [string, number])[];
  electrons: number;
  receives: boolean;
}) {
  return (
    <div className="c021-equation">
      <Terms terms={left.map(([id, coefficient]) => ({ id, coefficient }))} />
      {receives && <span>+ {electrons} e⁻</span>}
      <span aria-label="ürünlere">→</span>
      <Terms terms={right.map(([id, coefficient]) => ({ id, coefficient }))} />
      {!receives && <span>+ {electrons} e⁻</span>}
    </div>
  );
}
function RedoxLab() {
  const [v, set] = useExploration("forge021-chemistry-redoks-denklestirme", {
    family: "mnAcid",
    reduction: 1,
    oxidation: 1,
    prediction: "",
    reason: "",
    checked: false,
  });
  const family = Object.hasOwn(redoxFamilies021, v.family)
    ? (v.family as keyof typeof redoxFamilies021)
    : "mnAcid";
  const m = redoxLedger021(
    family,
    bounded(v.reduction, 0, 12),
    bounded(v.oxidation, 0, 12),
  );
  const change = (patch: Partial<typeof v>) =>
    set({ ...patch, checked: false });
  const max = Math.max(6, Math.ceil(Math.max(m.received, m.given) / 6) * 6),
    width = (n: number) => (n / max) * 200;
  const expected = !m.complete ? "open" : m.minimal ? "minimum" : "multiple";
  return (
    <section className="c021" data-forge021="redoks-denklestirme">
      <h3>e⁻ sayılarını eşleştir</h3>
      <p>
        Verilen her yarı tepkimede her katsayıyı çarp. Alınan ve verilen e⁻ eşit
        olmadan tam bir kimyasal net denklem kurulmaz.
      </p>
      <div className="c021-controls">
        <Select
          label="Yarı tepkime çifti"
          value={family}
          options={Object.entries(redoxFamilies021).map(
            ([key]) =>
              [
                key,
                key === "mnAcid"
                  ? "Mn / Fe"
                  : key === "crAcid"
                    ? "Cr / Fe"
                    : "Mn / S",
              ] as const,
          )}
          change={(family) => change({ family })}
        />
        <Range
          label="Elektron alan yarının çarpanı"
          value={m.reduction}
          min={0}
          max={12}
          unit="kat"
          change={(reduction) => change({ reduction })}
        />
        <Range
          label="Elektron veren yarının çarpanı"
          value={m.oxidation}
          min={0}
          max={12}
          unit="kat"
          change={(oxidation) => change({ oxidation })}
        />
      </div>
      <p>
        {m.data.medium}. {m.data.reductionLabel}; {m.data.oxidationLabel}.
      </p>
      <details className="c021-details">
        <summary>Verilen yarıları gör</summary>
        <p>Elektron alır:</p>
        <HalfEquation
          left={m.data.reduction.left}
          right={m.data.reduction.right}
          electrons={m.data.reduction.electrons}
          receives
        />
        <p>Elektron verir:</p>
        <HalfEquation
          left={m.data.oxidation.left}
          right={m.data.oxidation.right}
          electrons={m.data.oxidation.electrons}
          receives={false}
        />
      </details>
      <figure>
        <svg
          viewBox="0 0 340 260"
          role="img"
          aria-label={`Alınan ${m.received}, verilen ${m.given} elektron için aynı ölçekli miktar çubukları`}
        >
          <text x="8" y="65">
            Alır
          </text>
          <text x="8" y="145">
            Verir
          </text>
          <rect
            className="c021-bar-track"
            x="98"
            y="42"
            width="200"
            height="34"
          />
          <rect
            className="c021-ion-fill"
            x="98"
            y="42"
            width={width(m.received)}
            height="34"
          />
          <text x="198" y="31" textAnchor="middle">
            {m.received} e⁻
          </text>
          <rect
            className="c021-bar-track"
            x="98"
            y="122"
            width="200"
            height="34"
          />
          <rect
            className="c021-metal-fill"
            x="98"
            y="122"
            width={width(m.given)}
            height="34"
          />
          <text x="198" y="111" textAnchor="middle">
            {m.given} e⁻
          </text>
          <path className="c021-axis" d="M98 183H298" />
          {[0, max / 2, max].map((n) => (
            <g key={n}>
              <line
                className="c021-axis"
                x1={98 + width(n)}
                y1="179"
                x2={98 + width(n)}
                y2="190"
              />
              <text x={98 + width(n)} y="218" textAnchor="middle">
                {n}
              </text>
            </g>
          ))}
          <text x="198" y="253" textAnchor="middle">
            e⁻ sayısı
          </text>
        </svg>
        <figcaption>
          Her çubuk aynı e⁻ ölçeğini kullanır. Bunlar yarı tepkime birimleri
          için elektron sayılarıdır; deneyde ölçülmüş akım değildir.
        </figcaption>
      </figure>
      <div
        data-model-result
        data-received={m.received}
        data-given={m.given}
        data-minimal={m.minimal}
      >
        <p className="c021-outcome">
          {!m.complete
            ? "e⁻ bütçesi açık; net denklem hazır değil."
            : m.minimal
              ? "e⁻ eşit; en küçük oran bulundu."
              : "e⁻ eşit; katsayılar ortak sayıya bölünür."}
        </p>
        <ResultGrid
          rows={[
            ["Alınan e⁻", m.received],
            ["Verilen e⁻", m.given],
            ["Sol yük", m.chargeLeft > 0 ? `+${m.chargeLeft}` : m.chargeLeft],
            [
              "Sağ yük",
              m.chargeRight > 0 ? `+${m.chargeRight}` : m.chargeRight,
            ],
          ]}
        />
        <p>e⁻ olmadan, ortak türler çıkarılınca aday denklem:</p>
        <div className="c021-equation">
          <Terms terms={m.left} />
          <span aria-label="ürünlere">→</span>
          <Terms terms={m.right} />
        </div>
        <p>Atom sayıları (sol / sağ):</p>
        <ul className="c021-values">
          {m.atoms.length ? (
            m.atoms.map((atom) => (
              <li key={atom.symbol}>
                {atom.symbol}: {atom.left} / {atom.right}
              </li>
            ))
          ) : (
            <li>İki çarpan da 0; tepkime kurulmadı.</li>
          )}
        </ul>
        <p>
          Atom sayıları eşit kalsa bile e⁻ alımı ve verimi eşit değilse iyon
          yükleri farklı kalır. 0 çarpanı, o yarının hiç yer almadığı anlamına
          gelir; boş işlem tam bir tepkime değildir.
        </p>
      </div>
      <Evidence
        prediction={v.prediction}
        reason={v.reason}
        checked={v.checked}
        expected={expected}
        options={[
          ["open", "e⁻ açık"],
          ["minimum", "En küçük"],
          ["multiple", "Katlı"],
        ]}
        change={set}
      />
      <EndNote />
    </section>
  );
}
function ActivityLab() {
  const [v, set] = useExploration("forge021-chemistry-metalik-aktiflik", {
    donor: "Zn",
    acceptor: "Cu",
    prediction: "",
    reason: "",
    checked: false,
  });
  const donor =
    Object.hasOwn(activityCouples021, v.donor) && v.donor !== "H"
      ? (v.donor as Metal021)
      : "Zn";
  const acceptor = Object.hasOwn(activityCouples021, v.acceptor)
    ? (v.acceptor as keyof typeof activityCouples021)
    : "Cu";
  const m = activity021(donor, acceptor),
    rows = Object.entries(activityCouples021);
  const change = (patch: Partial<typeof v>) =>
    set({ ...patch, checked: false });
  const y = (mv: number) => 155 - (mv / 800) * 100;
  const count = (n: number, label: string) =>
    `${n === 1 ? "" : `${n} `}${label}`;
  return (
    <section className="c021" data-forge021="metalik-aktiflik">
      <h3>Metal ile iyonu karşılaştır</h3>
      <p>
        Elektron veren metali ve alan iyonu seç. Bütün sayılar 25 °C için
        kaynakta verilen standart elektron alma verisidir. Kıyas, bu çiftler ve
        standart koşullarla sınırlıdır.
      </p>
      <div className="c021-controls">
        <Select
          label="Elektron veren metal"
          value={donor}
          options={rows
            .filter(([key]) => key !== "H")
            .map(([key, row]) => [key, row.metal] as const)}
          change={(donor) => change({ donor })}
        />
        <Select
          label="Elektron alan iyon"
          value={acceptor}
          options={rows.map(([key, row]) => [key, row.ion] as const)}
          change={(acceptor) => change({ acceptor })}
        />
      </div>
      <figure>
        <svg
          viewBox="0 0 340 320"
          role="img"
          aria-label="Verilen standart indirgenme potansiyellerinin aynı milivolt ekseninde karşılaştırılması"
        >
          <text x="7" y="25">
            mV
          </text>
          <path className="c021-axis" d="M76 48V260H326" />
          {[-800, 0, 800].map((n) => (
            <g key={n}>
              <line
                className={n === 0 ? "c021-axis" : "c021-grid"}
                x1="76"
                y1={y(n)}
                x2="326"
                y2={y(n)}
              />
              <text x="68" y={y(n) + 8} textAnchor="end">
                {n > 0 ? `+${n}` : n}
              </text>
            </g>
          ))}
          {rows.map(([key, row], index) => (
            <g key={key}>
              <rect
                className={
                  key === donor
                    ? "c021-metal-fill"
                    : key === acceptor
                      ? "c021-ion-fill"
                      : "c021-neutral-fill"
                }
                x={86 + index * 39}
                y={Math.min(y(row.millivolts), y(0))}
                width="24"
                height={Math.abs(y(row.millivolts) - y(0))}
              />
              <text x={98 + index * 39} y="293" textAnchor="middle">
                {key}
              </text>
            </g>
          ))}
        </svg>
        <figcaption>
          Mavi: veren metalin çifti. Yeşil: alan iyonun çifti. H satırı H⁺/H₂
          için temel sıfırdır; metal değildir. Aynı çiftte tek çubuk ikisini
          gösterir. 1 V = 1000 mV.
        </figcaption>
      </figure>
      <div
        data-model-result
        data-potential-mv={m.deltaMillivolts}
        data-electrons={m.electrons}
      >
        <p className="c021-outcome">
          {m.direction === "forward"
            ? "Yazılan yön standart koşulda uygundur."
            : m.direction === "reverse"
              ? "Yazılan yön standart koşulda uygun değil."
              : "Aynı çift: yeni net yer değiştirme yok."}
        </p>
        <ResultGrid
          rows={[
            ["Veren E°", `${fmt(m.a.millivolts / 1000, 3)} V`],
            ["Alan E°", `${fmt(m.b.millivolts / 1000, 3)} V`],
            ["Fark E°", `${m.volts > 0 ? "+" : ""}${fmt(m.volts, 3)} V`],
            ["e⁻ ortak katı", m.electrons],
          ]}
        />
        <p>
          {fmt(m.b.millivolts / 1000, 3)} − ({fmt(m.a.millivolts / 1000, 3)}) ={" "}
          {fmt(m.volts, 3)} V. Katsayılar bu farkı çarpmaz.
        </p>
        <div className="c021-equation">
          <span>{count(m.donorCount, m.a.metal)}</span>
          <span>+</span>
          <span>{count(m.acceptorIonCount, m.b.ion)}</span>
          <span aria-label="ürünlere">→</span>
          <span>{count(m.donorCount, m.a.ion)}</span>
          <span>+</span>
          <span>{count(m.productCount, m.b.metal)}</span>
        </div>
        <p>
          Toplam iyon yükü iki tarafta +{m.chargeLeft}. Aynı çift seçilirse
          yazılan türler net değişim vermez. H⁺ seçilirse verilen ürün H₂’dir.
        </p>
        <p>
          Standart iyon etkinlikleri 1; gaz varsa standart basınç. Başka asit,
          kompleks veya yüzey tabakası yok varsayılır. İşaret hız, gözlenen gaz
          miktarı ya da her gerçek kap için saklama kararı değildir.
        </p>
        <ul className="c021-values">
          {rows.map(([key, row]) => (
            <li key={key}>
              {row.ion} / {row.metal}: {fmt(row.millivolts / 1000, 3)} V
            </li>
          ))}
        </ul>
      </div>
      <Evidence
        prediction={v.prediction}
        reason={v.reason}
        checked={v.checked}
        expected={m.direction}
        options={[
          ["forward", "İleri"],
          ["reverse", "Ters"],
          ["same", "Aynı"],
        ]}
        change={set}
      />
      <EndNote />
    </section>
  );
}
export default function Forge021ChemistryLab({
  lessonId,
}: {
  lessonId: string;
}) {
  if (lessonId === "cozunurluk-faktorleri") return <SolubilityLab />;
  if (lessonId === "redoks-denklestirme") return <RedoxLab />;
  if (lessonId === "metalik-aktiflik") return <ActivityLab />;
  return null;
}
