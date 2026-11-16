import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  alkene023,
  alkeneChoices023,
  alkeneReactions023,
  alkyne023,
  alkyneChoices023,
  alkyneReactions023,
  arene023,
  areneChoices023,
  compareIsomers023,
  functional023,
  functionalChoices023,
  isomerChoices023,
  polymer023,
  structure023,
  type Structure023,
} from "./forge023Chemistry";
import "./forge023Chemistry.css";

type Options = Readonly<Record<string, string>>;
const common = { prediction: "", reason: "", checked: false };
const clamp = (value: number, min: number, max: number) =>
  Number.isFinite(value)
    ? Math.min(max, Math.max(min, Math.trunc(value)))
    : min;
const choice = (options: Options, saved: string, fallback: string) =>
  Object.hasOwn(options, saved) ? saved : fallback;
const sub = (n: number) =>
  String(n).replace(/\d/g, (c) => "₀₁₂₃₄₅₆₇₈₉"[Number(c)]);
const entries = (o: Options) => Object.entries(o);
const shortRings: Options = {
  cyclopropane: "Üçlü halka",
  propene: "Propen",
  cyclobutane: "Dörtlü halka",
  but1: "1-Büten",
  but2: "2-Büten",
  methylpropene: "Dallı büten",
  methylcyclopropane: "Metil halka",
  cyclopentane: "Beşli halka",
  pent1: "1-Penten",
  cyclohexane: "Altılı halka",
  hex1: "1-Heksen",
};
const displayNames: Record<string, string> = {
  Siklopropan: "Üç C’li halka",
  Siklopentan: "Beş C’li halka",
  Siklohekzan: "Altı C’li halka",
  "Metil siklopropan": "Metil bağlı üçlü halka",
  "2-Metilpropen": "İzobüten",
  "2-Metilpropan": "İzobütan",
  "2-Kloropropan": "Propan: C2’de Cl",
  "2-Klorobütan": "Bütan: C2’de Cl",
  "1,2-Dibromoetan": "Etilen dibromür",
  "1,2-Dibromopropan": "Propan: C1 ve C2’de Br",
  "2,3-Dibromobütan": "Bütan: C2 ve C3’te Br",
  "1,2-Dibromo-2-metilpropan": "Dallı propan: C1 ve C2’de Br",
  "2-Kloro-2-metilpropan": "tert-Bütil klorür",
  "2-Metil-2-propanol": "tert-Bütil alkol",
  "tert-Bütanol": "tert-Bütil alkol",
  Dibromoalken: "Çift bağlı ürün: iki Br",
  Tetrabromoalkan: "Doymuş ürün: dört Br",
  Nitrometan: "CH₃NO₂",
  Asetonitril: "CH₃CN (nitril)",
  "Zincir–halka": "Zincir / halka",
};
const display = (text: string) => displayNames[text] ?? text;
const shortArenes: Options = {
  ...areneChoices023,
  cyclohexane: "Doymuş halka",
};
const shortFunctions: Options = {
  ...functionalChoices023,
  tert: "tert-Alkol",
  nitro: "CH₃NO₂",
  nitrile: "CH₃CN",
};
const shortAlkenes: Options = {
  ...alkeneChoices023,
  methylpropene: "Dallı büten",
};
function Select({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  options: Options;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className="c023-field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        {entries(options).map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
      <p className="small muted">Seçili: {options[value]}</p>
    </div>
  );
}
function Steps({
  value,
  onChange,
  labels = ["Başlangıç", "Ara adım", "Ürün"],
}: {
  value: number;
  onChange: (v: number) => void;
  labels?: string[];
}) {
  return (
    <fieldset className="c023-choices">
      <legend>Görünüm adımı</legend>
      <div>
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-pressed={value === i}
            onClick={() => onChange(i)}
          >
            {label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
function Drawing({
  title,
  children,
  height = 335,
}: {
  title: string;
  children: ReactNode;
  height?: number;
}) {
  const id = useId();
  return (
    <svg
      className="c023-svg"
      role="img"
      aria-labelledby={id}
      viewBox={`0 0 320 ${height}`}
    >
      <title id={id}>{title}</title>
      {children}
    </svg>
  );
}
function Structure({
  structure,
  title,
  focus = 0,
  highlights = [],
  depiction = "hybrid",
}: {
  structure: Structure023;
  title: string;
  focus?: number;
  highlights?: number[];
  depiction?: "hybrid" | "a" | "b";
}) {
  const data = structure023(structure),
    aromatic = data.atoms.flatMap((a, i) => (a.aromatic ? [i] : [])),
    cx =
      aromatic.reduce((v, i) => v + data.atoms[i].x, 0) /
      (aromatic.length || 1),
    cy =
      aromatic.reduce((v, i) => v + data.atoms[i].y, 0) /
      (aromatic.length || 1);
  return (
    <Drawing title={title}>
      <g>
        {data.bonds.map((b, i) => {
          const a = data.atoms[b.a],
            c = data.atoms[b.b],
            dx = c.x - a.x,
            dy = c.y - a.y,
            len = Math.hypot(dx, dy),
            nx = -dy / len,
            ny = dx / len;
          const order = b.aromatic
            ? depiction === "hybrid"
              ? 1
              : i % 2 === (depiction === "a" ? 0 : 1)
                ? 2
                : 1
            : b.order;
          const offsets =
            order === 3 ? [-6, 0, 6] : order === 2 ? [-4, 4] : [0];
          return (
            <g
              key={i}
              data-bond={`${b.a}-${b.b}`}
              data-order={b.order}
              className={
                highlights.includes(b.a) && highlights.includes(b.b)
                  ? "c023-bond c023-marked"
                  : "c023-bond"
              }
            >
              {offsets.map((offset) => (
                <line
                  key={offset}
                  x1={a.x + nx * offset}
                  y1={a.y + ny * offset}
                  x2={c.x + nx * offset}
                  y2={c.y + ny * offset}
                />
              ))}
            </g>
          );
        })}
        {aromatic.length === 6 && depiction === "hybrid" && (
          <circle className="c023-delocalized" cx={cx} cy={cy} r="39" />
        )}
        {data.atoms.map((a, i) => {
          const h = data.hydrogens[i],
            label =
              a.element +
              (h ? "H" + (h > 1 ? sub(h) : "") : "") +
              (a.charge === 1 ? "⁺" : a.charge === -1 ? "⁻" : "");
          return (
            <g
              key={i}
              data-atom={i}
              data-element={a.element}
              data-hydrogens={h}
              className={`c023-atom${i === focus ? " c023-focus" : ""}${highlights.includes(i) ? " c023-marked" : ""}`}
            >
              <circle cx={a.x} cy={a.y} r="24" />
              <text
                x={a.x}
                y={a.y}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {label}
              </text>
            </g>
          );
        })}
      </g>
    </Drawing>
  );
}
function AtomPicker({
  structure,
  focus,
  onChange,
}: {
  structure: Structure023;
  focus: number;
  onChange: (v: number) => void;
}) {
  return (
    <Select
      label="Atomu seç"
      value={String(focus)}
      options={Object.fromEntries(
        structure.atoms.map((a, i) => [String(i), `${i + 1}. ${a.element}`]),
      )}
      onChange={(v) => onChange(Number(v))}
    />
  );
}
function AtomEvidence({
  data,
  focus,
}: {
  data: ReturnType<typeof structure023>;
  focus: number;
}) {
  const a = data.atoms[focus],
    linked = data.adjacency[focus];
  return (
    <div className="c023-atom-evidence">
      <p>
        <strong>Seçili atom:</strong> {focus + 1}. {a.element}
      </p>
      <p>
        Komşu atom: {linked.length}; bağlı H: {data.hydrogens[focus]}.
      </p>
      <p>
        Bağları:{" "}
        {linked
          .map(
            (n) =>
              `${n.atom + 1}. ${data.atoms[n.atom].element} (${n.order === 1.5 ? "aromatik" : n.order})`,
          )
          .join("; ") || "Yok"}
        .
      </p>
    </div>
  );
}
function Feedback({
  state,
  set,
  expected,
  question,
  options,
  evidence,
}: {
  state: typeof common;
  set: (v: Partial<typeof common>) => void;
  expected: string;
  question: string;
  options: Options;
  evidence: string;
}) {
  const id = useId();
  return (
    <div className="c023-thinking">
      <Select
        label={question}
        value={state.prediction}
        options={{ "": "Tahmin seç", ...options }}
        onChange={(prediction) => set({ prediction, checked: false })}
      />
      <label className="c023-field" htmlFor={id}>
        <span>Gerekçen</span>
        <textarea
          id={id}
          rows={3}
          value={state.reason}
          maxLength={120}
          onChange={(e) => set({ reason: e.target.value, checked: false })}
        />
      </label>
      <button
        className="secondary"
        disabled={
          !Object.hasOwn(options, state.prediction) || !state.reason.trim()
        }
        onClick={() => set({ checked: true })}
      >
        Kıyasla
      </button>
      {state.checked &&
        Object.hasOwn(options, state.prediction) &&
        state.reason.trim() && (
          <div className="c023-feedback" role="status">
            <p>
              <strong>
                {state.prediction === expected
                  ? "Kanıtla uyumlu."
                  : "Kanıtı yeniden incele."}
              </strong>{" "}
              {evidence}
            </p>
            <p>
              Bu kıyas yalnız keşif kaydıdır; soru doğrusu veya ustalık puanı
              değildir.
            </p>
          </div>
        )}
    </div>
  );
}
function Panel({
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
  const label = useId();
  return (
    <section
      className="forge023-chemistry"
      data-forge023={id}
      role="region"
      aria-labelledby={label}
    >
      <h3 id={label}>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="c023-scope">
        Çizimler bağlanma şemasıdır; ölçülmüş bağ uzunluğu, hız veya deney
        videosu değildir. Keşif tek başına öğrenme puanı vermez.
      </p>
    </section>
  );
}
function IsomerLab() {
  const [saved, set] = useExploration("forge023:chemistry:ayt-sikloalkanlar", {
    ...common,
    first: "cyclobutane",
    second: "but1",
    focus: 0,
  });
  const first = choice(isomerChoices023, saved.first, "cyclobutane"),
    second = choice(isomerChoices023, saved.second, "but1"),
    data = compareIsomers023(first, second),
    focus = clamp(saved.focus, 0, data.first.atoms.length - 1);
  const change = (v: Partial<typeof saved>) => set({ ...v, checked: false }),
    expected = data.same
      ? "same"
      : data.formulaMatches
        ? "isomer"
        : "different";
  return (
    <Panel
      id="ayt-sikloalkanlar"
      title="Bağları kıyasla"
      intro="Halka ile açık zinciri aynı karbon sayısında karşılaştır. Eksik H sayısını bir atom seçip bağlarla denetle."
    >
      <div className="c023-controls">
        <Select
          label="İlk yapı"
          value={first}
          options={shortRings}
          onChange={(first) => change({ first, focus: 0 })}
        />
        <Select
          label="İkinci yapı"
          value={second}
          options={shortRings}
          onChange={(second) => change({ second })}
        />
        <AtomPicker
          structure={data.first}
          focus={focus}
          onChange={(focus) => set({ focus })}
        />
      </div>
      <div className="c023-model-pair">
        <figure>
          <Structure
            structure={data.first}
            focus={focus}
            title={data.first.label + " bağlanması"}
          />
          <figcaption>{display(data.first.label)}</figcaption>
        </figure>
        <figure>
          <Structure
            structure={data.second}
            focus={-1}
            title={data.second.label + " bağlanması"}
          />
          <figcaption>{display(data.second.label)}</figcaption>
        </figure>
      </div>
      <div
        data-model-result
        data-relationship={data.relationship}
        data-first-formula={data.first.formula}
        data-second-formula={data.second.formula}
      >
        <p>
          <strong>{display(data.relationship)}</strong>
        </p>
        <p>
          İlk formül: {data.first.formula}. Sigma: {data.first.sigma}; pi:{" "}
          {data.first.pi}; halka: {data.first.rings}.
        </p>
        <p>
          İkinci formül: {data.second.formula}. Sigma: {data.second.sigma}; pi:{" "}
          {data.second.pi}; halka: {data.second.rings}.
        </p>
        <p>
          İlk yapı{" "}
          {data.first.saturated
            ? "yalnız tek bağlı ve doymuş"
            : "pi bağlı ve doymamış"}
          . Formül eşliği: {data.formulaMatches ? "var" : "yok"}.
        </p>
      </div>
      <AtomEvidence data={data.first} focus={focus} />
      <Feedback
        state={saved}
        set={set}
        expected={expected}
        question="Bu iki yapı nasıl ilişkili?"
        options={{
          same: "Aynı yapı",
          isomer: "İzomer",
          different: "Formül farklı",
        }}
        evidence={
          display(data.relationship) +
          ". İlk ve ikinci formüller: " +
          data.first.formula +
          " / " +
          data.second.formula +
          "."
        }
      />
    </Panel>
  );
}
function Polymer({
  saved,
  set,
}: {
  saved: { polymer: string; units: number };
  set: (v: Partial<{ polymer: string; units: number }>) => void;
}) {
  const kind = choice(
      { ethene: "", vinyl: "", teflon: "" },
      saved.polymer,
      "ethene",
    ) as "ethene" | "vinyl" | "teflon",
    units = clamp(saved.units, 1, 4),
    data = polymer023(kind, units),
    n = units * 2;
  return (
    <>
      <div className="c023-controls">
        <Select
          label="Monomer"
          value={kind}
          options={{
            ethene: "Eten",
            vinyl: "Vinil klorür",
            teflon: "F’li eten",
          }}
          onChange={(polymer) => set({ polymer })}
        />
        <Select
          label="Tekrar sayısı"
          value={String(units)}
          options={{ 1: "1 birim", 2: "2 birim", 3: "3 birim", 4: "4 birim" }}
          onChange={(v) => set({ units: Number(v) })}
        />
      </div>
      <Drawing height={210} title={data.name + " zincir içi tekrar bölümü"}>
        <g className="c023-bond">
          <line x1="5" y1="90" x2="30" y2="90" strokeDasharray="4 4" />
          <line x1="290" y1="90" x2="315" y2="90" strokeDasharray="4 4" />
          {Array.from({ length: n - 1 }, (_, i) => (
            <line
              key={i}
              x1={30 + (i * 260) / (n - 1)}
              y1="90"
              x2={30 + ((i + 1) * 260) / (n - 1)}
              y2="90"
            />
          ))}
        </g>
        {Array.from({ length: n }, (_, i) => (
          <g key={i} className="c023-atom">
            <circle cx={30 + (i * 260) / (n - 1)} cy="90" r="14" />
            <text
              x={30 + (i * 260) / (n - 1)}
              y="90"
              textAnchor="middle"
              dominantBaseline="central"
            >
              C
            </text>
            {kind === "vinyl" && i % 2 === 1 && (
              <>
                <line
                  className="c023-side-bond"
                  x1={30 + (i * 260) / (n - 1)}
                  y1="104"
                  x2={30 + (i * 260) / (n - 1)}
                  y2="130"
                />
                <text x={30 + (i * 260) / (n - 1)} y="155" textAnchor="middle">
                  Cl
                </text>
              </>
            )}
            {kind === "teflon" && (
              <>
                <line
                  className="c023-side-bond"
                  x1={30 + (i * 260) / (n - 1)}
                  y1="76"
                  x2={30 + (i * 260) / (n - 1)}
                  y2="45"
                />
                <line
                  className="c023-side-bond"
                  x1={30 + (i * 260) / (n - 1)}
                  y1="104"
                  x2={30 + (i * 260) / (n - 1)}
                  y2="135"
                />
                <text x={30 + (i * 260) / (n - 1)} y="30" textAnchor="middle">
                  F
                </text>
                <text x={30 + (i * 260) / (n - 1)} y="160" textAnchor="middle">
                  F
                </text>
              </>
            )}
          </g>
        ))}
      </Drawing>
      <div data-polymer-result>
        <p>
          <strong>{display(data.name)}</strong>:{" "}
          {data.repeat.split("–").join(" – ")}
        </p>
        <p>
          Monomer: {data.monomer}; seçili bölüm: {data.units} tekrar birimi.
        </p>
        <p>
          İç bölüm atomları: C {data.counts.C}; H {data.counts.H}; Cl{" "}
          {data.counts.Cl}; F {data.counts.F}.
        </p>
        <p>
          Birimler arası yeni bağ: {data.newLinks}. Noktalı uçlar zincirin
          devamıdır; ayrı bir sonlu molekülün uç H’leri sayılmaz. Bağlı H’ler
          çizimde gizli, atom hesabında dahildir.
        </p>
      </div>
    </>
  );
}
function AlkeneLab() {
  const [saved, set] = useExploration("forge023:chemistry:ayt-alkenler", {
    ...common,
    kind: "propene",
    reaction: "none",
    stage: 0,
    trans: false,
    focus: 0,
    view: "reaction",
    polymer: "ethene",
    units: 3,
  });
  const kind = choice(alkeneChoices023, saved.kind, "propene"),
    rx = choice(alkeneReactions023, saved.reaction, "none"),
    stage = clamp(saved.stage, 0, 2),
    data = alkene023(kind, rx, stage, saved.trans),
    focus = clamp(saved.focus, 0, data.atoms.length - 1),
    change = (v: Partial<typeof saved>) => set({ ...v, checked: false });
  return (
    <Panel
      id="ayt-alkenler"
      title="Çift bağı dönüştür"
      intro="Reaktifi ve adımı seç. İlk adımda bir pi bağı varken katılma sonrasında ek atomların hangi karbonlara gittiğini gör."
    >
      <fieldset className="c023-choices">
        <legend>Ne çalışalım?</legend>
        <div>
          <button
            aria-pressed={saved.view !== "polymer"}
            onClick={() => change({ view: "reaction" })}
          >
            Katılma
          </button>
          <button
            aria-pressed={saved.view === "polymer"}
            onClick={() => change({ view: "polymer" })}
          >
            Zincir kur
          </button>
        </div>
      </fieldset>
      {saved.view === "polymer" ? (
        <Polymer saved={saved} set={change} />
      ) : (
        <>
          <div className="c023-controls">
            <Select
              label="Alken"
              value={kind}
              options={shortAlkenes}
              onChange={(kind) => change({ kind, focus: 0 })}
            />
            <Select
              label="Reaktif"
              value={rx}
              options={alkeneReactions023}
              onChange={(reaction) => change({ reaction, stage: 0, focus: 0 })}
            />
            {data.geometric && (
              <Select
                label="CH₃ yönü"
                value={saved.trans ? "trans" : "cis"}
                options={{ cis: "Aynı taraf", trans: "Karşı taraf" }}
                onChange={(v) => change({ trans: v === "trans" })}
              />
            )}
            <AtomPicker
              structure={data}
              focus={focus}
              onChange={(focus) => set({ focus })}
            />
          </div>
          <Steps
            value={stage}
            onChange={(stage) => change({ stage, focus: 0 })}
            labels={["Başlangıç", "Pi bağını izle", "Ürün"]}
          />
          <Structure
            structure={data}
            focus={focus}
            highlights={stage === 1 ? [data.left, data.right] : []}
            title={data.name + " molekülünde seçili katılma adımı"}
          />
          <div data-model-result data-formula={data.formula} data-pi={data.pi}>
            <p>
              <strong>{display(data.name)}</strong>; formül: {data.formula}.
            </p>
            <p>
              Sigma: {data.sigma}; pi: {data.pi}. Başlangıç:{" "}
              {data.before.formula}.
            </p>
            <p>
              {data.geometric
                ? `Başlangıç yönü: ${data.configuration}. Katılma ürünü için bu ilk cis/trans etiketi verilmez.`
                : "Bu başlangıç alkende cis–trans çifti yok."}
            </p>
            <p>
              {data.added
                ? "Yeni bağlar kuruldu; başlangıç C–C sigma bağlantısı korundu."
                : rx === "none"
                  ? "Yalnız yapı gösterimi seçildi; ürün dönüşümü yapılmadı."
                  : stage === 1
                    ? "İşaretli pi bölgesini izle; bu ara vurguda henüz ürün atomları eklenmedi."
                    : "Henüz reaktif katılmadı."}
            </p>
            <p>
              HCl ve su için olağan iyonik yönelim; radikal koşul ve iskelet
              değişimi bu örneklerde yoktur.
            </p>
          </div>
          <AtomEvidence data={data} focus={focus} />
          <Feedback
            state={saved}
            set={set}
            expected={data.pi ? "yes" : "no"}
            question="Son yapıda pi kaldı mı?"
            options={{ yes: "Pi var", no: "Pi yok" }}
            evidence={`Seçili yapıda pi sayısı ${data.pi}. Formül ${data.formula}; eklenen atomları başlangıç ${data.before.formula} ile karşılaştır.`}
          />
        </>
      )}
    </Panel>
  );
}
function AlkyneLab() {
  const [saved, set] = useExploration("forge023:chemistry:ayt-alkinler", {
    ...common,
    kind: "ethyne",
    reaction: "hydrogen",
    stage: 0,
    focus: 0,
  });
  const kind = choice(alkyneChoices023, saved.kind, "ethyne"),
    rx = choice(alkyneReactions023, saved.reaction, "hydrogen"),
    stage = clamp(saved.stage, 0, 2),
    data = alkyne023(kind, rx, stage),
    focus = clamp(saved.focus, 0, data.atoms.length - 1),
    change = (v: Partial<typeof saved>) => set({ ...v, checked: false });
  return (
    <Panel
      id="ayt-alkinler"
      title="İki pi bağını izle"
      intro="Birinci ve ikinci basamak aynı ürün değildir. Su yolunda ikinci görünüm ek su almadan enolden karbonile geçiştir."
    >
      <div className="c023-controls">
        <Select
          label="Alkin"
          value={kind}
          options={alkyneChoices023}
          onChange={(kind) => change({ kind, focus: 0 })}
        />
        <Select
          label="Katılan tür"
          value={rx}
          options={alkyneReactions023}
          onChange={(reaction) => change({ reaction, stage: 0, focus: 0 })}
        />
        <AtomPicker
          structure={data}
          focus={focus}
          onChange={(focus) => set({ focus })}
        />
      </div>
      <Steps
        value={stage}
        onChange={(stage) => change({ stage, focus: 0 })}
        labels={
          rx === "water"
            ? ["Başlangıç", "Enol", "Karbonil"]
            : ["Başlangıç", "İlk katılma", "Tam katılma"]
        }
      />
      <Structure
        structure={data}
        focus={focus}
        title={data.name + " bağlanması"}
      />
      <div
        data-model-result
        data-formula={data.formula}
        data-pi={data.pi}
        data-terminal={String(data.terminal)}
      >
        <p>
          <strong>{display(data.name)}</strong>; formül: {data.formula}.
        </p>
        <p>
          Toplam sigma: {data.sigma}; toplam pi: {data.pi}. Başlangıç:{" "}
          {data.before.formula}.
        </p>
        <p>Bir mol başlangıç başına katılan reaktif: {data.reagentMol} mol.</p>
        <p>
          Başlangıç üçlü bağında doğrudan H taşıyan C:{" "}
          {data.replaceableHydrogens}. Tür:{" "}
          {data.terminal ? "uç alkin" : "iç alkin"}.
        </p>
        <p>
          {rx === "water"
            ? "Klasik asit/Hg²⁺ yolu gösterilir. Son karbonil C=O’su bir pi bağı içerir; tüm molekülde pi sıfır olmak zorunda değildir."
            : rx === "hydrogen"
              ? "İlk aşamada durma uygun seçici katalizör ve koşul ile sağlanmış kabul edilir; yalnız reaktif miktarı gerçek seçiciliğin tümünü açıklamaz."
              : "Her Br₂ katılması çoklu bağın iki C’sine birer Br bağlar; başlangıç H’leri korunur."}
        </p>
      </div>
      <AtomEvidence data={data} focus={focus} />
      <Feedback
        state={saved}
        set={set}
        expected={data.terminal ? "yes" : "no"}
        question="İlk tür uç alkin mi?"
        options={{ yes: "Var", no: "Yok" }}
        evidence={`İlk üçlü bağda ${data.replaceableHydrogens} C üzerinde doğrudan H bulunur. CH₃ üzerindeki H bu testin terminal H’si değildir.`}
      />
    </Panel>
  );
}
function AreneLab() {
  const [saved, set] = useExploration("forge023:chemistry:ayt-arenler", {
    ...common,
    kind: "benzene",
    depiction: "hybrid",
    position: 1,
    focus: 0,
  });
  const kind = choice(areneChoices023, saved.kind, "benzene"),
    depiction = choice(
      { hybrid: "", a: "", b: "" },
      saved.depiction,
      "hybrid",
    ) as "hybrid" | "a" | "b",
    position = clamp(saved.position, 1, 3),
    data = arene023(kind, depiction, position),
    focus = clamp(saved.focus, 0, data.atoms.length - 1),
    change = (v: Partial<typeof saved>) => set({ ...v, checked: false });
  return (
    <Panel
      id="ayt-arenler"
      title="Temsil ile yapıyı ayır"
      intro="Katkı çizimi değişse de aynı molekül kalır. Sonra bağlı grubu değiştir; aromatik yapıyı ve C/H içeriğini ayrı incele."
    >
      <div className="c023-controls">
        <Select
          label="Bileşik"
          value={kind}
          options={shortArenes}
          onChange={(kind) => change({ kind, focus: 0 })}
        />
        <Select
          label="Gösterim"
          value={depiction}
          options={{ hybrid: "Çember", a: "Katkı A", b: "Katkı B" }}
          disabled={!data.aromatic}
          onChange={(depiction) => change({ depiction })}
        />
        {kind === "xylene" && (
          <Select
            label="İkinci metil"
            value={String(position)}
            options={{ 1: "Orto (1,2)", 2: "Meta (1,3)", 3: "Para (1,4)" }}
            onChange={(v) => change({ position: Number(v) })}
          />
        )}
        <AtomPicker
          structure={data}
          focus={focus}
          onChange={(focus) => set({ focus })}
        />
      </div>
      <Structure
        structure={data}
        focus={focus}
        depiction={depiction}
        title={data.label + " için seçili bağ gösterimi"}
      />
      <div
        data-model-result
        data-formula={data.formula}
        data-aromatic={String(data.aromatic)}
        data-hydrocarbon={String(data.hydrocarbon)}
      >
        <p>
          <strong>{display(data.label)}</strong>; formül: {data.formula}.
        </p>
        <p>
          Aromatik: {data.aromatic ? "evet" : "hayır"}. Yalnız C/H:{" "}
          {data.hydrocarbon ? "evet" : "hayır"}.
        </p>
        <p>
          Halka sigma kenarı: {data.sigmaRing}; toplam sigma: {data.sigma}; pi
          elektronu: {data.piElectrons}.
        </p>
        <p>
          {data.aromatic
            ? "Altı halka bağı eş yapıdadır. A/B iki elektron katkı çizimidir; gerçek molekül bunlar arasında sırayla gidip gelmez."
            : "Altı C’li tek bağlı halka doymuş bir türdür; halka bulunması aromatik olmayı zorunlu kılmaz."}
        </p>
        {kind === "xylene" && (
          <p>
            Konum: {data.positionName}. Her üç ksilen türünde formül C8H10
            kalır.
          </p>
        )}
      </div>
      <AtomEvidence data={data} focus={focus} />
      <Feedback
        state={saved}
        set={set}
        expected={data.hydrocarbon ? "yes" : "no"}
        question="Yalnız C ve H mi?"
        options={{ yes: "Evet", no: "Hayır" }}
        evidence={
          data.hydrocarbon
            ? "Yapıda yalnız C ve H var. Aromatik olmak ayrı bir özelliktir; doymuş altı C’li halka da yalnız C/H içerir."
            : "Bu yapıda C/H dışında O veya N bulunur. Aromatik bir türev olabilir; yalnız C/H türü değildir."
        }
      />
    </Panel>
  );
}
function FunctionalLab() {
  const [saved, set] = useExploration("forge023:chemistry:ayt-alkoller", {
    ...common,
    kind: "ethanol",
    group: 0,
    focus: 0,
  });
  const kind = choice(functionalChoices023, saved.kind, "ethanol"),
    data = functional023(kind),
    group = clamp(saved.group, 0, data.groups.length - 1),
    selected = data.groups[group],
    focus = clamp(saved.focus, 0, data.atoms.length - 1),
    change = (v: Partial<typeof saved>) => set({ ...v, checked: false });
  return (
    <Panel
      id="ayt-alkoller"
      title="Grubu yerinde bul"
      intro="O veya N harfini görmek yeterli değil; hangi atomlara ve hangi bağlarla bağlı olduğunu incele. Laktik asitte alkol OH’si ile asit OH’sini ayır."
    >
      <div className="c023-controls">
        <Select
          label="Yapı"
          value={kind}
          options={shortFunctions}
          onChange={(kind) => change({ kind, group: 0, focus: 0 })}
        />
        <AtomPicker
          structure={data}
          focus={focus}
          onChange={(focus) => set({ focus })}
        />
      </div>
      <fieldset className="c023-choices">
        <legend>Gruba dokun</legend>
        <div>
          {data.groups.map((g, i) => (
            <button
              key={`${g.kind}-${i}`}
              aria-pressed={i === group}
              onClick={() => set({ group: i, focus: g.atoms[0] })}
            >
              {i + 1}. {g.name}
            </button>
          ))}
        </div>
      </fieldset>
      <Structure
        structure={data}
        focus={focus}
        highlights={selected?.atoms}
        title={data.label + " üzerinde seçili fonksiyonel grup"}
      />
      <div
        data-model-result
        data-formula={data.formula}
        data-alcohol-count={data.alcoholCount}
      >
        <p>
          <strong>{display(data.label)}</strong>; formül: {data.formula}.
        </p>
        <p>
          Alkol grubu: {data.alcoholCount}. Toplam O–H: {data.hydroxyCount}.
          Gösterilen işlev: {data.groups.map((g) => g.name).join("; ")}.
        </p>
        {selected && (
          <p>
            Seçili grup: {selected.name}. İşaretli atomlar:{" "}
            {selected.atoms.map((i) => i + 1).join(", ")}.
          </p>
        )}
        {selected?.kind === "alcohol" && (
          <p>
            Alfa C komşusu: {selected.degree}; alfa H: {selected.hydrogens}.{" "}
            {selected.degree === 0
              ? "Metanol en küçük özel örnektir; alfa C’ye karbon bağlı değildir."
              : "Derece, yalnız OH’nin bağlı olduğu C’nin doğrudan bağlı C sayısıyla belirlenir."}
          </p>
        )}
        <p>
          {kind === "acid"
            ? "Asit OH’si karbonile bağlıdır; ayrı alkol OH’si sayılmaz."
            : kind === "lactic"
              ? "Bir sp³ alkol OH’si ve ayrı bir karboksil işlevi bulunur. İki O–H bağı iki alkol demek değildir."
              : kind === "phenol"
                ? "OH doğrudan aromatik C’ye bağlıdır; fenolik OH alkol grubundan ayrılır."
                : kind === "benzyl"
                  ? "Aradaki CH₂ sp³’tür; bu OH alkol grubudur. Halka uzakta bulunsa da sınıfı OH’nin doğrudan C çevresi belirler."
                  : "Bağ çevrelerini gerçek C/O/N bağlarıyla karşılaştır; formülün aynı olması işlevin aynı olduğunu göstermez."}
        </p>
      </div>
      <AtomEvidence data={data} focus={focus} />
      <Feedback
        state={saved}
        set={set}
        expected={data.alcoholCount > 0 ? "yes" : "no"}
        question="Alkol grubu bulunuyor mu?"
        options={{ yes: "Evet", no: "Hayır" }}
        evidence={`Alkol grubu sayısı ${data.alcoholCount}. Bir O–H’nin karbonil veya aromatik C’ye bağlı olması ayrı ele alınır.`}
      />
    </Panel>
  );
}
export default function Forge023ChemistryLab({
  lessonId,
}: {
  lessonId: string;
}) {
  return lessonId === "ayt-sikloalkanlar" ? (
    <IsomerLab />
  ) : lessonId === "ayt-alkenler" ? (
    <AlkeneLab />
  ) : lessonId === "ayt-alkinler" ? (
    <AlkyneLab />
  ) : lessonId === "ayt-arenler" ? (
    <AreneLab />
  ) : lessonId === "ayt-alkoller" ? (
    <FunctionalLab />
  ) : null;
}
