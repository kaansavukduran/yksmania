import { useId, type ReactNode } from "react";
import {
  pressure020,
  pressureModes020,
  water020,
  buffer020,
  hydrolysis020,
  salts020,
  neutralization020,
  titration020,
  solubilityEquilibrium020,
  solids020,
} from "./forge020Chemistry";
import { useExploration } from "./useExploration";
import "./forge020Chemistry.css";
const fmt = (n: number, digits = 3) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(n);
const safe = (value: number, min: number, max: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;
const key = (id: string) => `forge020:chemistry:${id}`;
function Range({
  label,
  value,
  min,
  max,
  step = 1,
  change,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  change: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="c020-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt(value, 5)}</output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={safe(value, min, max)}
        onChange={(e) => change(Number(e.target.value))}
      />
    </div>
  );
}
function Choice({
  label,
  value,
  choices,
  change,
}: {
  label: string;
  value: string;
  choices: readonly (readonly [string, string])[];
  change: (value: string) => void;
}) {
  const id = useId();
  return (
    <fieldset className="c020-choice">
      <legend id={id}>{label}</legend>
      <div role="group" aria-labelledby={id}>
        {choices.map(([id, name]) => (
          <button
            type="button"
            key={id}
            aria-pressed={value === id}
            onClick={() => change(id)}
          >
            {name}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
function Drawing({
  title,
  height,
  children,
  kind,
}: {
  title: string;
  height: number;
  children: ReactNode;
  kind?: string;
}) {
  const id = useId();
  return (
    <svg
      className="c020-svg"
      data-diagram={kind}
      viewBox={`0 0 300 ${height}`}
      role="img"
      aria-labelledby={id}
    >
      <title id={id}>{title}</title>
      {children}
    </svg>
  );
}
function Frame({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section className="forge020-chemistry" data-forge020={id}>
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="c020-note">
        Keşif seçimi ve tahmin puan vermez. Bağımsız sorular ayrı kaydedilir.
      </p>
    </section>
  );
}
type PredictionState = { prediction: string; reason: string; checked: boolean };
function Prediction({
  state,
  change,
  choices,
  expected,
  proof,
}: {
  state: PredictionState;
  change: (patch: Partial<PredictionState>) => void;
  choices: readonly (readonly [string, string])[];
  expected: string;
  proof: string;
}) {
  const id = useId(),
    valid = choices.some(([value]) => value === state.prediction);
  return (
    <div className="c020-prediction">
      <Choice
        label="Sonuç tahminin"
        value={valid ? state.prediction : ""}
        choices={choices}
        change={(prediction) => change({ prediction, checked: false })}
      />
      <label htmlFor={id}>Gerekçen (en çok 120 karakter)</label>
      <textarea
        id={id}
        rows={3}
        maxLength={120}
        value={state.reason.slice(0, 120)}
        onChange={(e) =>
          change({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        type="button"
        disabled={!valid || !state.reason.trim()}
        onClick={() => change({ checked: true })}
      >
        Tahminimi karşılaştır
      </button>
      {state.checked && valid && state.reason.trim() && (
        <p className="c020-feedback" role="status">
          {state.prediction === expected
            ? "Seçimin modelle uyumlu."
            : "Koşulu ve sonucu yeniden karşılaştır."}{" "}
          {proof}
        </p>
      )}
    </div>
  );
}
const sci = (n: number) => {
  if (n === 0) return "0";
  const [mantissa, exponent] = n.toExponential(3).split("e");
  const superscript: Record<string, string> = {
    "-": "⁻",
    "+": "",
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
  };
  return `${mantissa.replace(".", ",")} × 10${[...exponent].map((c) => superscript[c]).join("")}`;
};
const invalid = (value: string, choices: object, fallback: string) =>
  Object.hasOwn(choices, value) ? value : fallback;
function Result({ children }: { children: ReactNode }) {
  return (
    <div className="c020-result" data-model-result aria-live="polite">
      {children}
    </div>
  );
}
function PressureLab() {
  const id = "ayt-denge-basinc-hacim",
    [s, set] = useExploration(key(id), {
      mode: "volume",
      inert: 0,
      ratio: 1,
      prediction: "",
      reason: "",
      checked: false,
    });
  const mode = invalid(
    s.mode,
    pressureModes020,
    "volume",
  ) as keyof typeof pressureModes020;
  const m = pressure020(mode, safe(s.inert, 0, 3), safe(s.ratio, 0.5, 2));
  const update = (p: Partial<typeof s>) => set({ ...p, checked: false });
  const answer =
    m.direction === "Net değişim yok"
      ? "same"
      : m.extent > 0
        ? "forward"
        : "back";
  const groups = [[1, 1, 1], m.instant, m.partial],
    max = Math.max(3, ...groups.flat());
  return (
    <Frame
      id={id}
      title="Gaz dengesi"
      intro="İdeal AB(g) ⇌ A(g) + B(g). İlk denge: her gaz 1 mol; 300 K, R = 0,082 L·atm/(mol·K), V = 24,6 L, Kp = 1 atm. Her seçim bu aynı ilk dengeye uygulanır."
    >
      <Choice
        label="İşlem"
        value={mode}
        choices={Object.entries(pressureModes020)}
        change={(mode) => update({ mode })}
      />
      <div className="c020-controls">
        {mode === "volume" ? (
          <Range
            label="V / ilk V"
            value={m.volume / 24.6}
            min={0.5}
            max={2}
            step={0.1}
            change={(ratio) => update({ ratio })}
          />
        ) : (
          <Range
            label="İnert gaz (mol)"
            value={m.inertMol}
            min={0}
            max={3}
            step={0.5}
            change={(inert) => update({ inert })}
          />
        )}
      </div>
      <figure>
        <Drawing
          title="İlk, ani ve son kısmi basınçların karşılaştırması; eksen atm"
          height={355}
        >
          {["AB", "A", "B"].map((name, i) => (
            <g key={name}>
              <text x={4} y={52 + i * 90}>
                {name}
              </text>
              {groups.map((g, j) => (
                <rect
                  key={j}
                  x={65}
                  y={22 + i * 90 + j * 19}
                  width={(210 * g[i]) / max}
                  height={12}
                  className={
                    j === 0 ? "c020-soft" : j === 1 ? "c020-mint" : "c020-coral"
                  }
                  data-pressure-kind={name}
                  data-stage={j}
                  data-pressure={g[i]}
                />
              ))}
              <line
                x1={65}
                y1={86 + i * 90}
                x2={275}
                y2={86 + i * 90}
                className="c020-line"
              />
            </g>
          ))}
          <text x={65} y={320}>
            0
          </text>
          <text x={275} y={320} textAnchor="end">
            {fmt(max, 1)}
          </text>
          <text x={165} y={352} textAnchor="middle">
            p (atm)
          </text>
        </Drawing>
        <figcaption>
          Her satırda üst çubuk ilk, orta çubuk ani, alt çubuk son durumdur.
          İnert gaz bu üç tepkime türünün dışında kalır; toplam basınca katkısı
          aşağıda ayrıdır.
        </figcaption>
      </figure>
      <Result>
        <p>
          Net yön: {m.direction}. Ani Qp = {fmt(m.instantQ, 3)} atm; son Qp ={" "}
          {fmt(m.quotient, 3)} atm.
        </p>
        <p>
          Son V = {fmt(m.volume, 3)} L; toplam P = {fmt(m.totalPressure, 3)}{" "}
          atm. İnert katkı = {fmt(m.inertPressure, 3)} atm.
        </p>
        <p>
          AB: {fmt(m.ab, 6)} mol; A ve B: {fmt(m.a, 6)} mol. Son pAB ={" "}
          {fmt(m.partial[0], 6)} atm; pA = pB = {fmt(m.partial[1], 6)} atm.
        </p>
        <p>
          A ve B atom stokları ayrı ayrı 2 mol birim kalır. Sabit T nedeniyle Kp
          değişmez.
        </p>
      </Result>
      <Prediction
        state={s}
        change={set}
        choices={[
          ["back", "Girenlere"],
          ["forward", "Ürünlere"],
          ["same", "Net yön yok"],
        ]}
        expected={answer}
        proof={`Ani Qp ${fmt(m.instantQ, 3)} atm, Kp 1 atm. Net yön ${m.direction.toLocaleLowerCase("tr-TR")}; son denge kesri yeniden 1 atm.`}
      />
    </Frame>
  );
}
function WaterLab() {
  const id = "ayt-sulu-asit-baz-denge",
    [s, set] = useExploration(key(id), {
      kind: "water",
      exponent: 7,
      temperature: 25,
      prediction: "",
      reason: "",
      checked: false,
    });
  const kind = ["water", "acid", "base"].includes(s.kind)
    ? (s.kind as "water" | "acid" | "base")
    : "water";
  const exponent = safe(s.exponent, 1, 10),
    t = [25, 50, 80].includes(s.temperature) ? s.temperature : 25,
    m = water020(kind, 10 ** -exponent, t),
    update = (p: Partial<typeof s>) => set({ ...p, checked: false });
  const x = (ph: number) => 30 + (240 * ph) / 14;
  return (
    <Frame
      id={id}
      title="Su ve pH"
      intro="İdeal derişim modeli. Asit HCl, baz NaOH: tam ayrışma; başka asit, baz veya tampon yok. Su katkısı ihmal edilmez. Verilen Kw: 25 °C'de 10⁻¹⁴, 50 °C'de 5,473×10⁻¹⁴, 80 °C'de 9×10⁻¹⁴."
    >
      <Choice
        label="Çözelti"
        value={kind}
        choices={[
          ["water", "Yalnız su"],
          ["acid", "HCl"],
          ["base", "NaOH"],
        ]}
        change={(kind) => update({ kind })}
      />
      <Choice
        label="T (°C)"
        value={String(t)}
        choices={[
          ["25", "25"],
          ["50", "50"],
          ["80", "80"],
        ]}
        change={(v) => update({ temperature: Number(v) })}
      />
      {kind !== "water" && (
        <Range
          label="c = 10⁻ˣ M; x"
          value={exponent}
          min={1}
          max={10}
          step={1}
          change={(exponent) => update({ exponent })}
        />
      )}
      <figure>
        <Drawing
          title="pH cetveli; dolu işaret çözeltinin pH'ı, açık işaret seçili sıcaklıkta nötr pH"
          height={245}
        >
          <line x1={30} y1={100} x2={270} y2={100} className="c020-line" />
          {[0, 7, 14].map((n) => (
            <g key={n}>
              <line
                x1={x(n)}
                y1={92}
                x2={x(n)}
                y2={112}
                className="c020-line"
              />
              <text x={x(n)} y={145} textAnchor="middle">
                {n}
              </text>
            </g>
          ))}
          <circle
            cx={x(m.neutralPh)}
            cy={100}
            r={15}
            className="c020-curve-marker"
            data-neutral-ph={m.neutralPh}
          />
          <path
            d={`M${x(m.ph) - 8},70 L${x(m.ph) + 8},70 L${x(m.ph)},90 Z`}
            className="c020-coral"
            data-solution-ph={m.ph}
          />
          <text x={150} y={30} textAnchor="middle">
            pH
          </text>
          <text x={150} y={195} textAnchor="middle">
            Nötr: {fmt(m.neutralPh, 3)}
          </text>
          <text x={150} y={235} textAnchor="middle">
            Son: {fmt(m.ph, 3)}
          </text>
        </Drawing>
        <figcaption>
          Nötr işaret, H₃O⁺ ve OH⁻ eşitliğini gösterir. Ölçek bu seçili aralıkta
          pH 0–14'tür; pH için evrensel sınır olduğu iddia edilmez.
        </figcaption>
      </figure>
      <Result>
        <p>
          {m.className}. pH = {fmt(m.ph, 6)}; pOH = {fmt(m.poh, 6)}. Nötr pH ={" "}
          {fmt(m.neutralPh, 6)}.
        </p>
        <p>
          [H₃O⁺] = {sci(m.h)} M; [OH⁻] = {sci(m.oh)} M. Çarpım = {sci(m.kw)}.
        </p>
        <p>
          Eklenen güçlü türün analitik c değeri: {sci(m.analytical)} M. H₃O⁺ −
          OH⁻ farkı asitte c, bazda −c olur; yalnız suda 0'dır.
        </p>
      </Result>
      <Prediction
        state={s}
        change={set}
        choices={[
          ["acid", "Asidik"],
          ["neutral", "Nötr"],
          ["base", "Bazik"],
        ]}
        expected={m.className === "Nötr" ? "neutral" : kind}
        proof={`H₃O⁺ ${m.h === m.oh ? "=" : m.h > m.oh ? ">" : "<"} OH⁻. Seçili T için nötr pH ${fmt(m.neutralPh, 3)}; yalnız pH 7 ezberi yeterli değil.`}
      />
    </Frame>
  );
}
function BufferLab() {
  const id = "ayt-zayif-asit-baz-tampon",
    [s, set] = useExploration(key(id), {
      ha: 0.1,
      anion: 0.1,
      dose: 0,
      volume: 1,
      prediction: "",
      reason: "",
      checked: false,
    });
  const ha = safe(s.ha, 0.01, 0.2),
    anion = safe(s.anion, 0, 0.2),
    dose = safe(s.dose, -0.1, 0.1),
    volume = safe(s.volume, 0.5, 2),
    m = buffer020(ha, anion, dose, volume),
    update = (p: Partial<typeof s>) => set({ ...p, checked: false }),
    total = ha + anion;
  const widths = [
    (m.actualHAMol / total) * 240,
    (m.actualAnionMol / total) * 240,
  ];
  return (
    <Frame
      id={id}
      title="Tampon stoğu"
      intro="HA ve NaA; 25 °C, Ka = 10⁻⁵, Kw = 10⁻¹⁴. Pozitif doz NaOH, negatif doz HCl molüdür. Son hacim ayrı verilir; başka asit-baz ailesi yok. Son türler tam aile ve yük dengesiyle bulunur."
    >
      <div className="c020-controls">
        <Range
          label="İlk HA (mol)"
          value={ha}
          min={0.01}
          max={0.2}
          step={0.01}
          change={(ha) => update({ ha })}
        />
        <Range
          label="İlk NaA (mol)"
          value={anion}
          min={0}
          max={0.2}
          step={0.01}
          change={(anion) => update({ anion })}
        />
        <Range
          label="Doz (mol)"
          value={dose}
          min={-0.1}
          max={0.1}
          step={0.01}
          change={(dose) => update({ dose })}
        />
        <Range
          label="Son hacim (L)"
          value={volume}
          min={0.5}
          max={2}
          step={0.5}
          change={(volume) => update({ volume })}
        />
      </div>
      <figure>
        <Drawing
          title="Toplam asit ailesinin ilk ve son HA ile A dağılımı; çubuk uzunluğu mol payıdır"
          height={285}
        >
          <text x={30} y={30}>
            İlk
          </text>
          <rect
            x={30}
            y={48}
            width={(240 * ha) / total}
            height={35}
            className="c020-mint"
          />
          <rect
            x={30 + (240 * ha) / total}
            y={48}
            width={(240 * anion) / total}
            height={35}
            className="c020-coral"
          />
          <text x={30} y={140}>
            Son
          </text>
          <rect
            x={30}
            y={158}
            width={widths[0]}
            height={35}
            className="c020-mint"
            data-buffer-ha={m.actualHAMol}
          />
          <rect
            x={30 + widths[0]}
            y={158}
            width={widths[1]}
            height={35}
            className="c020-coral"
            data-buffer-a={m.actualAnionMol}
          />
          <text x={30} y={240}>
            HA
          </text>
          <text x={270} y={240} textAnchor="end">
            A⁻
          </text>
          <text x={150} y={280} textAnchor="middle">
            pH {fmt(m.ph, 3)}
          </text>
        </Drawing>
        <figcaption>
          Yeşil HA, mercan A⁻ payıdır. Her satır aynı toplam aile molünü temsil
          eder; son satır ara mol tablosunu değil denge kökünü gösterir.
        </figcaption>
      </figure>
      <Result>
        <p>
          Son pH = {fmt(m.ph, 6)}. HA = {fmt(m.actualHAMol, 6)} mol; A⁻ ={" "}
          {fmt(m.actualAnionMol, 6)} mol.
        </p>
        <p>
          Tüketim ara tablosu: HA {fmt(m.afterHAMol, 4)} mol, A⁻{" "}
          {fmt(m.afterAnionMol, 4)} mol.{" "}
          {m.hh === null
            ? "İki bileşen kalmadı; mol oranı ile tampon kestirimi uygun değil."
            : `Tampon kestirimi pH ≈ ${fmt(m.hh, 6)}; bu sonucun yaklaşım olduğu unutulmaz.`}
        </p>
        <p>
          Güçlü asit fazlası {fmt(m.strongAcidExcess, 4)} mol; güçlü baz fazlası{" "}
          {fmt(m.strongBaseExcess, 4)} mol. Toplam aile {fmt(total, 4)} mol
          korunur.
        </p>
      </Result>
      <Prediction
        state={s}
        change={set}
        choices={[
          ["pair", "İki bileşen kalır"],
          ["end", "Bir bileşen biter"],
        ]}
        expected={m.bufferPairRemains ? "pair" : "end"}
        proof={`Güçlü tür tüketimi sonrası HA ${fmt(m.afterHAMol, 4)} mol, A⁻ ${fmt(m.afterAnionMol, 4)} mol. Bu ara tablo, son denge türlerinden ayrı tutulur.`}
      />
    </Frame>
  );
}
function HydrolysisLab() {
  const id = "ayt-hidroliz",
    [s, set] = useExploration(key(id), {
      salt: "nacl",
      concentration: 0.1,
      prediction: "",
      reason: "",
      checked: false,
    }),
    salt = invalid(s.salt, salts020, "nacl") as keyof typeof salts020;
  const m = hydrolysis020(salt, safe(s.concentration, 0, 0.2)),
    update = (p: Partial<typeof s>) => set({ ...p, checked: false });
  const families = [
    { name: "Ac", charged: m.acetate, neutral: m.acid },
    { name: "N", charged: m.ammonium, neutral: m.ammonia },
  ];
  const saltNames = {
    ...salts020,
    acetate: "Sodyum asetat",
    both: "Amonyum asetat",
  };
  return (
    <Frame
      id={id}
      title="Tuz ve su"
      intro="25 °C, ideal derişimler; başka denge yok. Ka(asetik asit) = Kb(NH₃) = 1,8×10⁻⁵; Kw = 10⁻¹⁴. Eş mol aileler kullanılır. Ac asetat ailesini, N amonyum ailesini gösterir."
    >
      <Choice
        label="Tuz"
        value={salt}
        choices={Object.entries(saltNames)}
        change={(salt) => update({ salt })}
      />
      <p>
        Sodyum asetat: <span className="c020-ion">Na⁺</span> ve{" "}
        <span className="c020-ion">CH₃COO⁻</span>. Amonyum asetat:{" "}
        <span className="c020-ion">NH₄⁺</span> ve{" "}
        <span className="c020-ion">CH₃COO⁻</span>.
      </p>
      <Range
        label="Tuz (M)"
        value={m.concentration}
        min={0}
        max={0.2}
        step={0.01}
        change={(concentration) => update({ concentration })}
      />
      <figure>
        <Drawing
          title="Asetat ve amonyum ailesinin proton aktarımı sonrası yüklü ve yüksüz payları; tüm çubuklar analitik molarite ile ölçeklenir"
          height={325}
        >
          {families.map((f, i) => (
            <g key={f.name}>
              <text x={30} y={38 + i * 130}>
                {f.name}
              </text>
              <rect
                x={30}
                y={54 + i * 130}
                width={
                  240 * (m.concentration ? f.charged / m.concentration : 0)
                }
                height={32}
                className="c020-coral"
              />
              <rect
                x={
                  30 + 240 * (m.concentration ? f.charged / m.concentration : 0)
                }
                y={54 + i * 130}
                width={
                  240 * (m.concentration ? f.neutral / m.concentration : 0)
                }
                height={32}
                className="c020-mint"
                data-hydro-family={f.name}
                data-neutral-species={f.neutral}
              />
              <line
                x1={30}
                y1={100 + i * 130}
                x2={270}
                y2={100 + i * 130}
                className="c020-line"
              />
            </g>
          ))}
          <text x={150} y={305} textAnchor="middle">
            pH {fmt(m.ph, 3)}
          </text>
        </Drawing>
        <figcaption>
          Mercan yüklü, yeşil yüksüz aile türüdür; paylar atom boyutu veya
          parçacık adedi değildir. NaCl seçilirse bu iki aile yoktur; boş çizgi
          bunu gösterir. Çok küçük hidroliz payı çizimde ince kalabilir, sayısı
          aşağıda verilir.
        </figcaption>
      </figure>
      <Result>
        <p>
          {m.concentration === 0
            ? "Bu kapta tuz yok; yalnız su var."
            : `${saltNames[salt]}: ${m.className}.`}{" "}
          pH = {fmt(m.ph, 6)}.
        </p>
        <p>
          Asetat = {sci(m.acetate)} M; asetik asit = {sci(m.acid)} M. NH₄⁺ ={" "}
          {sci(m.ammonium)} M; NH₃ = {sci(m.ammonia)} M.
        </p>
        <p>
          [H₃O⁺] = {sci(m.h)} M; [OH⁻] = {sci(m.oh)} M. Na⁺ = {fmt(m.sodium, 4)}{" "}
          M; Cl⁻ = {fmt(m.chloride, 4)} M.
        </p>
        <p>
          {salt === "both" && m.concentration > 0
            ? "Nötr pH, iki iyonun da proton aktarımı yapmadığı anlamına gelmez; karşı etkiler bu verilen sabitlerle dengelenir."
            : "Seyirci iyonlar net tepkimede sadeleşir, yük bütçesinde kalır."}
        </p>
      </Result>
      <Prediction
        state={s}
        change={set}
        choices={[
          ["Asidik", "Asidik"],
          ["Nötr", "Nötr"],
          ["Bazik", "Bazik"],
        ]}
        expected={m.className}
        proof={`H₃O⁺ ${fmt(m.h / m.oh, 4)} kat OH⁻ içerir. Aile toplamları ve seyirci yükler aynı anda korunur.`}
      />
    </Frame>
  );
}
function NeutralizationLab() {
  const id = "ayt-notrallesme",
    [s, set] = useExploration(key(id), {
      acidM: 0.1,
      acidML: 100,
      baseM: 0.1,
      baseML: 50,
      prediction: "",
      reason: "",
      checked: false,
    });
  const m = neutralization020(
      safe(s.acidM, 0, 0.2),
      safe(s.acidML, 10, 200),
      safe(s.baseM, 0, 0.1),
      safe(s.baseML, 0, 200),
    ),
    update = (p: Partial<typeof s>) => set({ ...p, checked: false });
  const scale = Math.max(0.01, m.hInput, m.ohInput),
    bar = (n: number) => (220 * n) / scale;
  return (
    <Frame
      id={id}
      title="Eşdeğer bütçesi"
      intro="Tam çözünmüş HCl ve Ba(OH)₂, 25 °C; hacimler toplanır. Başka asit, baz, çökelme veya CO₂ yok. Su dengesi korunur. Verilen net molar ısı −57,3 kJ/mol su; sabit P, yalnız PV işi ve başka ısıl katkı yok."
    >
      <div className="c020-controls">
        <Range
          label="HCl (M)"
          value={m.acidM}
          min={0}
          max={0.2}
          step={0.01}
          change={(acidM) => update({ acidM })}
        />
        <Range
          label="HCl (mL)"
          value={m.acidML}
          min={10}
          max={200}
          step={10}
          change={(acidML) => update({ acidML })}
        />
        <Range
          label="Ba(OH)₂ (M)"
          value={m.baseM}
          min={0}
          max={0.1}
          step={0.01}
          change={(baseM) => update({ baseM })}
        />
        <Range
          label="Ba(OH)₂ (mL)"
          value={m.baseML}
          min={0}
          max={200}
          step={10}
          change={(baseML) => update({ baseML })}
        />
      </div>
      <figure>
        <Drawing
          title="H ve OH eşdeğer stokları ile tüketilen ortak mol miktarı; yatay çubuk uzunluğu mol ile orantılı"
          height={335}
        >
          <text x={30} y={32}>
            H⁺
          </text>
          <rect
            x={30}
            y={45}
            width={bar(m.hInput)}
            height={32}
            className="c020-coral"
          />
          <text x={30} y={132}>
            OH⁻
          </text>
          <rect
            x={30}
            y={145}
            width={bar(m.ohInput)}
            height={32}
            className="c020-mint"
          />
          <text x={30} y={232}>
            Su
          </text>
          <rect
            x={30}
            y={245}
            width={bar(m.waterMol)}
            height={32}
            className="c020-soft"
            data-water-mol={m.waterMol}
          />
          <text x={30} y={325}>
            0
          </text>
          <text x={270} y={325} textAnchor="end">
            {fmt(scale, 3)} mol
          </text>
        </Drawing>
        <figcaption>
          Üst iki çubuk ilk H⁺ ve OH⁻ eşdeğerleri; alt çubuk tüketilen çift
          kadar net oluşan sudur. Kısa H⁺ yazımı ile H⁺ + OH⁻ → H₂O kullanılır;
          çözücü suyun toplamı çizilmez.
        </figcaption>
      </figure>
      <Result>
        <p>
          {m.className}. pH = {fmt(m.ph, 6)}; son hacim {fmt(m.volumeL, 3)} L.
        </p>
        <p>
          H⁺ ilk stok {fmt(m.hInput, 5)} mol; OH⁻ ilk stok {fmt(m.ohInput, 5)}{" "}
          mol. Artan asit {fmt(m.acidExcess, 5)} mol; artan baz{" "}
          {fmt(m.baseExcess, 5)} mol.
        </p>
        <p>
          Net su {fmt(m.waterMol, 5)} mol; tepkime ısısı qP ={" "}
          {fmt(m.reactionHeatKJ, 6)} kJ.
        </p>
        <p>
          Ba²⁺ = {fmt(m.barium, 6)} M; Cl⁻ = {fmt(m.chloride, 6)} M. H₃O⁺ +
          2Ba²⁺ = OH⁻ + Cl⁻ yük denkliği sağlanır; asidik veya bazik olmak net
          elektrik yükü değildir.
        </p>
      </Result>
      <Prediction
        state={s}
        change={set}
        choices={[
          ["acid", "Asit artar"],
          ["equal", "Eşdeğer"],
          ["base", "Baz artar"],
        ]}
        expected={m.netMol === 0 ? "equal" : m.netMol > 0 ? "acid" : "base"}
        proof={`H⁺ ${fmt(m.hInput, 5)} mol, OH⁻ ${fmt(m.ohInput, 5)} mol. Her Ba(OH)₂ iki OH⁻ verir; tüketilen çift ${fmt(m.consumed, 5)} moldür.`}
      />
    </Frame>
  );
}
function TitrationLab() {
  const id = "ayt-titrasyon",
    [s, set] = useExploration(key(id), {
      kind: "weak",
      added: 0,
      prediction: "",
      reason: "",
      checked: false,
    });
  const kind = s.kind === "strong" ? "strong" : "weak",
    m = titration020(kind, safe(s.added, 0, 200)),
    update = (p: Partial<typeof s>) => set({ ...p, checked: false });
  const px = (v: number) => 35 + v * 1.1,
    py = (ph: number) => 300 - ph * 18;
  const points = Array.from({ length: 201 }, (_, i) => titration020(kind, i));
  const path = points
    .map((v, i) => `${i ? "L" : "M"}${px(v.addedML)},${py(v.ph)}`)
    .join(" ");
  return (
    <Frame
      id={id}
      title="Titrasyon eğrisi"
      intro="100 mL, 0,100 M tek protonlu asit; 0,100 M NaOH eklenir. 25 °C, Kw = 10⁻¹⁴, ideal derişimler ve toplamsal hacim. HA için Ka = 10⁻⁵. Başka tür yok; eğri her noktada tam yük hesabıyla çizilir."
    >
      <Choice
        label="Asit"
        value={kind}
        choices={[
          ["strong", "HCl"],
          ["weak", "Zayıf HA"],
        ]}
        change={(kind) => update({ kind })}
      />
      <Range
        label="Ek NaOH (mL)"
        value={m.addedML}
        min={0}
        max={200}
        step={5}
        change={(added) => update({ added })}
      />
      <Choice
        label="Nokta seç"
        value={String(m.addedML)}
        choices={[
          ["0", "Başlangıç"],
          ["50", "Yarı hacim"],
          ["100", "Eşdeğerlik"],
          ["120", "Fazla baz"],
        ]}
        change={(v) => update({ added: Number(v) })}
      />
      <figure>
        <Drawing
          title="pH ile eklenen NaOH hacmi eğrisi; kesikli çizgi 100 mL stokiyometrik eşdeğerlik, işaret seçilen nokta"
          height={395}
        >
          <line x1={35} y1={300} x2={270} y2={300} className="c020-line" />
          <line x1={35} y1={35} x2={35} y2={300} className="c020-line" />
          {[0, 7, 14].map((v) => (
            <text key={v} x={27} y={py(v) + 6} textAnchor="end">
              {v}
            </text>
          ))}
          <line
            x1={px(100)}
            y1={40}
            x2={px(100)}
            y2={300}
            className="c020-faint-line"
          />
          <path
            d={path}
            className="c020-accent-path"
            data-titration-curve={kind}
          />
          <circle
            cx={px(m.addedML)}
            cy={py(m.ph)}
            r={7}
            className="c020-curve-marker"
            data-titration-ph={m.ph}
            data-titration-volume={m.addedML}
          />
          {[0, 100, 200].map((v) => (
            <text key={v} x={px(v)} y={335} textAnchor="middle">
              {v}
            </text>
          ))}
          <text x={150} y={380} textAnchor="middle">
            V (mL)
          </text>
          <text x={35} y={25}>
            pH
          </text>
        </Drawing>
        <figcaption>
          Yatay eksen ek baz hacmi, düşey eksen pH'tır. Eğri 1 mL aralıklarla
          bulunan verilerden çizilir; süre veya deneysel renk ölçümü değildir.
          Eşdeğerlik 100 mL; indikatör ile renk son noktası ayrı bir ölçüttür.
        </figcaption>
      </figure>
      <Result>
        <p>
          {m.stage}. Ek baz {fmt(m.addedML, 1)} mL; son hacim{" "}
          {fmt(m.volumeL, 3)} L; pH = {fmt(m.ph, 6)}.
        </p>
        <p>
          Asit ailesi {fmt(m.acidMol, 4)} mol; ek OH⁻ eşdeğeri{" "}
          {fmt(m.baseMol, 4)} mol. Eşdeğerlik hacmi 100 mL.
        </p>
        {kind === "weak" ? (
          <p>
            Denge HA = {sci(m.ha)} M; A⁻ = {sci(m.anion)} M.{" "}
            {m.halfEquivalence
              ? "Yarı noktada pH ≈ pKa = 5 kestirimi; tam hesap küçük bir fark verir."
              : "Tam eşdeğerde A⁻ hidrolizi vardır; pH'ın 7 olması beklenmez."}
          </p>
        ) : (
          <p>
            Güçlü asitte tam noktaya yakın su katkısı korunur; pH için log 0
            alınmaz.
          </p>
        )}
      </Result>
      <Prediction
        state={s}
        change={set}
        choices={[
          ["before", "Öncesi"],
          ["at", "Tam eşdeğer"],
          ["after", "Sonrası"],
        ]}
        expected={
          m.addedML < 100 ? "before" : m.addedML === 100 ? "at" : "after"
        }
        proof={`${fmt(m.baseMol, 4)} mol baz eşdeğeri, 0,0100 mol asitle kıyaslanır. Eşdeğerlik pH'a göre değil bu mol şartına göre tanımlanır.`}
      />
    </Frame>
  );
}
function SolubilityLab() {
  const id = "ayt-cozunurluk-dengesi",
    [s, set] = useExploration(key(id), {
      solid: "agcl",
      stock: 100,
      common: 0,
      volume: 1,
      prediction: "",
      reason: "",
      checked: false,
    });
  const kind = invalid(s.solid, solids020, "agcl") as keyof typeof solids020,
    m = solubilityEquilibrium020(
      kind,
      safe(s.stock, 0, 500),
      safe(s.common, 0, 10),
      safe(s.volume, 0.5, 2),
    ),
    update = (p: Partial<typeof s>) => set({ ...p, checked: false });
  const fraction = m.stockMol ? m.solidMol / m.stockMol : 0,
    solidHeight = 100 * fraction,
    dissolvedFraction = m.stockMol ? m.dissolvedMol / m.stockMol : 0;
  return (
    <Frame
      id={id}
      title="Katı ve doygunluk"
      intro="Sabit T'de verilen Kç: AgCl için 1,6×10⁻¹⁰; CaF₂ için 4×10⁻¹¹. İdeal derişim, başka tepkime yok. Ortak iyon Cl⁻ veya F⁻, NaCl ya da NaF ile sağlanır; karşı Na⁺ yükü korunur. Son hacim ayrı verilir."
    >
      <Choice
        label="Katı"
        value={kind}
        choices={Object.entries(solids020)}
        change={(solid) => update({ solid })}
      />
      <div className="c020-controls">
        <Range
          label="Katı stoku (µmol)"
          value={m.stockMol * 1e6}
          min={0}
          max={500}
          step={10}
          change={(stock) => update({ stock })}
        />
        <Range
          label="Ortak iyon (mM)"
          value={m.common * 1000}
          min={0}
          max={10}
          step={1}
          change={(common) => update({ common })}
        />
        <Range
          label="Son V (L)"
          value={m.volumeL}
          min={0.5}
          max={2}
          step={0.5}
          change={(volume) => update({ volume })}
        />
      </div>
      <figure>
        <Drawing
          title="Sonlu katı stoğunun çözünmüş ve tabanda kalan payı; çizilen boylar aynı ilk stokun paylarını gösterir"
          height={390}
        >
          <path d="M45 35 V280 H255 V35" className="c020-line" />
          <rect x={47} y={65} width={206} height={215} className="c020-soft" />
          {m.solidMol > 0 && (
            <rect
              x={47}
              y={280 - solidHeight}
              width={206}
              height={solidHeight}
              className="c020-coral"
              data-solid-mol={m.solidMol}
            />
          )}
          <text x={150} y={105} textAnchor="middle">
            Çözünmüş
          </text>
          <text x={150} y={145} textAnchor="middle">
            {fmt(m.dissolvedMol * 1e6, 3)} µmol
          </text>
          <line x1={45} y1={280} x2={255} y2={280} className="c020-line" />
          <text x={150} y={325} textAnchor="middle">
            Katı {fmt(m.solidMol * 1e6, 3)} µmol
          </text>
          <rect
            x={45}
            y={350}
            width={210 * dissolvedFraction}
            height={14}
            className="c020-mint"
            data-dissolved-mol={m.dissolvedMol}
          />
          <rect
            x={45 + 210 * dissolvedFraction}
            y={350}
            width={210 * fraction}
            height={14}
            className="c020-coral"
          />
        </Drawing>
        <figcaption>
          Mercan katı tabana oturur; yeşil alt çubuk çözünmüş paydır. Bu stok
          şeması gerçek kristal, iyon boyutu veya sıvı seviyesi ölçüsü değildir.
          Stok sıfırsa tuzdan gelen tür çizilmez; ortak iyon ayrı kalabilir.
        </figcaption>
      </figure>
      <Result>
        <p>
          {m.solidMol > 0
            ? "Doygun; katı da kalır."
            : m.saturated
              ? "Doygun sınır; katı kalmaz."
              : "Doymamış; katı kalmaz."}{" "}
          Çözünen {fmt(m.dissolvedMol * 1e6, 6)} µmol; kalan katı{" "}
          {fmt(m.solidMol * 1e6, 6)} µmol.
        </p>
        <p>
          Doygunluk s = {sci(m.saturation)} M. Gerçek katyon = {sci(m.cation)}{" "}
          M; anyon = {sci(m.anion)} M.
        </p>
        <p>
          Q = {sci(m.q)}; Kç = {sci(m.ksp)}. Oran Q/Kç = {fmt(m.q / m.ksp, 6)}.
          Karşı Na⁺ = {fmt(m.addedCounterion, 6)} M.
        </p>
        <p>
          {kind === "agcl"
            ? "Ag⁺ = s, Cl⁻ = c + s; doygun hâlde s(c+s)=Kç."
            : "Ca²⁺ = s, F⁻ = c + 2s; doygun hâlde s(c+2s)²=Kç."}{" "}
          Bu satırdaki s, doygun kökün kurulduğu miktardır; stok azsa gerçek
          çözünen daha küçüktür.
        </p>
      </Result>
      <Prediction
        state={s}
        change={set}
        choices={[
          ["solid", "Katı kalır"],
          ["none", "Katı kalmaz"],
        ]}
        expected={m.solidMol > 0 ? "solid" : "none"}
        proof={`Doygunluk kapasitesi ${fmt(m.saturation * m.volumeL * 1e6, 4)} µmol, stok ${fmt(m.stockMol * 1e6, 4)} µmol. Sınırda katı olmadan Q=Kç mümkün.`}
      />
    </Frame>
  );
}
export default function Forge020ChemistryLab({
  lessonId,
}: {
  lessonId: string;
}) {
  switch (lessonId) {
    case "ayt-denge-basinc-hacim":
      return <PressureLab />;
    case "ayt-sulu-asit-baz-denge":
      return <WaterLab />;
    case "ayt-zayif-asit-baz-tampon":
      return <BufferLab />;
    case "ayt-hidroliz":
      return <HydrolysisLab />;
    case "ayt-notrallesme":
      return <NeutralizationLab />;
    case "ayt-titrasyon":
      return <TitrationLab />;
    case "ayt-cozunurluk-dengesi":
      return <SolubilityLab />;
    default:
      return null;
  }
}
