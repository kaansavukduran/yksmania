import { useId, useState, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  femaleRoute020,
  femaleSites020,
  gametogenesis020,
  gameteModes020,
  gameteStages020,
  menstrual020,
  embryo020,
  embryoStages020,
  embryoLayers020,
  community020,
  population020,
  nucleic020,
  nucleicKinds020,
  discovery020,
  discoveryExperiments020,
  discoveryConditions020,
} from "./forge020Biology";
import "./forge020Biology.css";
const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(n);
const clamp = (n: number, a: number, b: number) =>
  Number.isFinite(n) ? Math.min(b, Math.max(a, n)) : a;
const integer = (n: number, a: number, b: number) => Math.round(clamp(n, a, b));
const key = <T extends object>(map: T, value: string, fallback: keyof T) =>
  Object.hasOwn(map, value) ? (value as keyof T) : fallback;
const options = (map: Record<string, string>) => Object.entries(map);
// Display aliases preserve the full scientific names in the guides and model data.
const readable = (text: string) => {
  const pairs: readonly (readonly [string, string])[] = [
    [
      "Endometriyumda tutunma ve gelişim ortamı",
      "Rahim iç yüzeyinde tutunma ve gelişim ortamı",
    ],
    ["Segmentasyon", "Erken bölünmeler"],
    ["Progesteron ile baskı", "P hormonu ile baskı"],
    ["Progesteron üretir", "P hormonu üretir"],
    ["Kommensalizm ile uyumlu", "Bir yarar; ötekinde net fark yok"],
    ["Amensalizm ile uyumlu", "Bir zarar; ötekinde net fark yok"],
    [
      "Aktarılabilir kalıtsal değişim; maddenin kimliği bu deneyde belirlenmez.",
      "Özellik aktarımı var; etkenin kimliği bu deneyde henüz belli değil.",
    ],
    [
      "Sinir sistemi ve deri epidermisi",
      "Sinir sistemi ve derinin dış epitel katmanı",
    ],
  ];
  return pairs.reduce((value, [from, to]) => value.replaceAll(from, to), text);
};
function Figure({
  title,
  description,
  height = 330,
  children,
}: {
  title: string;
  description: string;
  height?: number;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <svg
      className="bio020-figure"
      viewBox={`0 0 360 ${height}`}
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{description}</desc>
      {children}
    </svg>
  );
}
function Choice({
  label,
  value,
  choices,
  onChange,
}: {
  label: string;
  value: string;
  choices: readonly (readonly [string, string])[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="bio020-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {choices.map(([v, text]) => (
          <option key={v} value={v}>
            {readable(text)}
          </option>
        ))}
      </select>
      <output htmlFor={id}>
        Seçili: {readable(choices.find(([v]) => v === value)?.[1] ?? "")}
      </output>
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
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="bio020-field">
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
function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <label className="bio020-check" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
function Result({ children }: { children: ReactNode }) {
  return (
    <div className="bio020-result" data-model-result>
      {children}
    </div>
  );
}
function Prediction({
  id,
  context,
  prompt,
  choices,
  expected,
  explanation,
}: {
  id: string;
  context: string;
  prompt: string;
  choices: readonly (readonly [string, string])[];
  expected: string;
  explanation: string;
}) {
  const [state, set] = useExploration(`forge020-bio-predict-${id}`, {
    prediction: "",
    reason: "",
    context: "",
    checked: false,
  });
  const inputId = useId();
  const valid = choices.some(([v]) => v === state.prediction),
    current = state.checked && state.context === context;
  return (
    <div className="bio020-prediction">
      <h4>Tahmin et, nedenini yaz, sonra dene</h4>
      <p>{prompt}</p>
      <Choice
        label="Tahminin"
        value={valid ? state.prediction : ""}
        choices={[["", "Bir yanıt seç"], ...choices]}
        onChange={(prediction) => set({ prediction, checked: false })}
      />
      <label htmlFor={inputId}>Gerekçen</label>
      <textarea
        id={inputId}
        maxLength={120}
        rows={3}
        value={state.reason}
        onChange={(e) =>
          set({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        type="button"
        disabled={!valid || !state.reason.trim()}
        onClick={() => set({ context: context.slice(0, 120), checked: true })}
      >
        Tahminimi karşılaştır
      </button>
      {current && (
        <div className="bio020-feedback" role="status">
          <strong>
            {state.prediction === expected
              ? "Seçimin bu kanıtla uyumlu."
              : "Seçimini bu kanıtla yeniden düşün."}
          </strong>
          <p>{explanation}</p>
        </div>
      )}
      <p className="bio020-help">
        Bu deney konu bitişi, doğru yanıt veya XP kaydı oluşturmaz.
      </p>
    </div>
  );
}
function FemaleLab() {
  const [s, set] = useExploration("forge020-bio-female", {
    site: "tube",
    open: true,
    step: 2,
  });
  const m = femaleRoute020(
    key(femaleSites020, s.site, "tube"),
    s.open,
    integer(s.step, 0, 4),
  );
  const points = [
      [48, 89],
      [65, 74],
      [145, 95],
      [180, 168],
      [164, 184],
    ],
    p = points[m.arrived];
  const position = m.arrived === 4 ? "Rahim iç yüzeyi" : m.position;
  return (
    <>
      <h3>Yolu ve görev yerini birlikte izle</h3>
      <p>
        Bir yapıyı seç, hücrenin yolunda ilerle. Yalnız şemanın solundaki tüpün
        geçişi denenir. Önden görünümde sayfanın solu kişinin sağıdır. Şema
        sıralı yol modelidir; zaman, gebelik veya tanı hesabı değildir.
      </p>
      <div className="bio020-controls">
        <Choice
          label="Yapı"
          value={m.site}
          choices={options(femaleSites020)}
          onChange={(site) => set({ site })}
        />
        <Range
          label="Yol adımı"
          value={m.step}
          min={0}
          max={4}
          onChange={(step) => set({ step })}
        />
      </div>
      <Check
        label="Şemanın solundaki tüp açık"
        checked={s.open}
        onChange={(open) => set({ open })}
      />
      <Figure
        title="Kadın üreme organları ve tek hücre yolu"
        description={`Şemanın solunda görülen yumurtalıktan tüp boyunca rahme giden yol. Hücre konumu ${position}. Seçilen yapı ${m.selected}. Üretra ayrı yoldur.`}
        height={350}
      >
        <path
          data-female-organ="uterus"
          className={`bio020-organ ${m.site === "uterus" ? "bio020-selected" : ""}`}
          d="M150 111Q180 140 210 111L220 167Q215 207 195 223V251H165V223Q145 207 140 167Z"
        />
        <path
          data-female-organ="tube"
          className={`bio020-organ ${m.site === "tube" ? "bio020-selected" : ""}`}
          d="M150 123Q142 58 94 55Q65 55 61 79M210 123Q218 58 266 55Q295 55 299 79"
        />
        <ellipse
          data-female-organ="ovary"
          className={`bio020-organ ${m.site === "ovary" ? "bio020-selected" : ""}`}
          cx="46"
          cy="91"
          rx="25"
          ry="19"
        />
        <ellipse className="bio020-organ" cx="314" cy="91" rx="25" ry="19" />
        <path
          data-female-organ="vagina"
          className={`bio020-organ ${m.site === "vagina" ? "bio020-selected" : ""}`}
          d="M165 251V300Q180 315 195 300V251"
        />
        <path
          className="bio020-mint"
          d="M154 149Q180 170 206 149L201 187Q198 204 189 215H171Q162 204 159 187Z"
        />
        {!m.tubeOpen && (
          <path data-tube-stop className="bio020-stop" d="M116 58l18 22" />
        )}
        <circle
          data-route-step={m.arrived}
          className="bio020-cell"
          cx={p[0]}
          cy={p[1]}
          r="8"
        />
        <text x="18" y="38">
          Ovaryum
        </text>
        <text x="230" y="38">
          Tüp
        </text>
        <text x="232" y="177">
          Rahim
        </text>
        <text x="217" y="251">
          Serviks
        </text>
        <text x="217" y="301">
          Vajina
        </text>
        {m.site === "cervix" && (
          <path
            data-female-organ="cervix"
            className="bio020-selected bio020-guide"
            d="M165 234H195V251H165Z"
          />
        )}
        <text x="18" y="337">
          İdrar yolu ayrıdır.
        </text>
      </Figure>
      <Result>
        <p>
          <strong>Seçili yapı: {m.selected}.</strong> {readable(m.function)}.
        </p>
        <p>
          Hücre: {position}.{" "}
          {m.blocked
            ? "Geçiş engel üstünde durur."
            : "Seçilen yol adımı görünür."}
        </p>
        <p>
          Hormon kanla taşınır; tüp engeli tek başına hormonun yokluğu demek
          değildir.
        </p>
      </Result>
      <Prediction
        id="female"
        context={`${m.site}|${m.tubeOpen}|${m.step}`}
        prompt="Bu seçili adımda hücre yolunun sonucu hangisidir?"
        choices={[
          ["blocked", "Engel üstünde kalır"],
          ["arrived", "Rahim iç yüzeyine ulaşır"],
          ["route", "Yolun önceki adımında"],
        ]}
        expected={m.blocked ? "blocked" : m.arrived === 4 ? "arrived" : "route"}
        explanation={`Geçiş ${m.tubeOpen ? "açık" : "kapalı"}; adım ${m.step}. Son konum ${position}. Normal yerleşme yeri rahim iç yüzeyidir; döllenme için tipik yer tüptür.`}
      />
    </>
  );
}
function GameteLab() {
  const [s, set] = useExploration("forge020-bio-gametes", {
    mode: "oocyte",
    stage: "secondary",
    signal: false,
    n: 23,
  });
  const m = gametogenesis020(
    key(gameteModes020, s.mode, "oocyte"),
    key(gameteStages020, s.stage, "secondary"),
    s.signal,
    integer(s.n, 1, 23),
  );
  const name =
    m.mode === "oocyte"
      ? m.complete
        ? "Ovum; çekirdek birliği öncesi"
        : m.stage === "primary"
          ? "Birincil oosit; profaz I"
          : "İkincil oosit; metafaz II"
      : m.stage === "primary"
        ? "Birincil sperm ana hücresi"
        : m.complete
          ? "Olgun sperm"
          : "Mayoz I sonrası iki hücre";
  return (
    <>
      <h3>Ana hücre ve küçük kutup hücreleri</h3>
      <p>
        Başlangıç bir ana hücredir; DNA eşlenmiştir. Son sperm seçeneği mayoz
        sonrası gelişimi de içerir. Oositte ilk kutup hücresi bu modelde
        bölünmez; ovum iki çekirdek birleşmeden önce gösterilir.
      </p>
      <div className="bio020-controls">
        <Choice
          label="Gamet yolu"
          value={m.mode}
          choices={options(gameteModes020)}
          onChange={(mode) => set({ mode })}
        />
        <Choice
          label="Evre"
          value={m.stage}
          choices={options(gameteStages020)}
          onChange={(stage) => set({ stage })}
        />
        <Range
          label="Haploit n sayısı"
          value={m.n}
          min={1}
          max={23}
          onChange={(n) => set({ n })}
        />
      </div>
      <Check
        label="Döllenme sinyali var"
        checked={s.signal}
        onChange={(signal) => set({ signal })}
      />
      <Figure
        title="Ana ürünler ve kutup hücreleri"
        description={`${m.mainCells} ana hücre, ${m.polarBodies} kutup hücresi. Her ana hücrede ${m.chromosomesPerMainCell} kromozom ve ${m.chromatidsPerMainCell} kromatit.`}
        height={325}
      >
        <text x="20" y="33">
          Ana ürün: {m.mainCells}
        </text>
        {Array.from({ length: m.mainCells }, (_, i) => {
          const x = m.mainCells === 1 ? 160 : 55 + i * 80,
            y = 122;
          return (
            <g key={i} data-main-cell={i}>
              <circle
                className="bio020-organ"
                cx={x}
                cy={y}
                r={m.mode === "oocyte" ? 54 : 29}
              />
              <circle className="bio020-cell" cx={x} cy={y} r="14" />
              {m.mode === "sperm" && m.complete && (
                <path
                  className="bio020-mint"
                  d={`M${x} 151q-13 15 0 30t0 30`}
                />
              )}
            </g>
          );
        })}
        {Array.from({ length: m.polarBodies }, (_, i) => (
          <circle
            key={i}
            data-polar-cell={i}
            className="bio020-organ"
            cx={259 + i * 55}
            cy="180"
            r="16"
          />
        ))}
        <text x="20" y="247">
          Kutup hücresi: {m.polarBodies}
        </text>
        <text x="20" y="286">
          Ana hücre DNA: {m.dnaC}C
        </text>
      </Figure>
      <Result>
        <p>
          <strong>{name}.</strong>
        </p>
        <p>
          Ana hücre başına {m.chromosomesPerMainCell} kromozom;{" "}
          {m.chromatidsPerMainCell} kromatit; {m.dnaC}C DNA.
        </p>
        <p>
          İşlevsel son gamet: {m.functionalGametes}. C, tek haploit genomun
          eşlenme öncesi DNA miktarıdır. Kutup hücreleri ana ürün sayısına
          eklenmez.
        </p>
      </Result>
      <Prediction
        id="gametes"
        context={`${m.mode}|${m.stage}|${m.fertilizationSignal}|${m.n}`}
        prompt="Seçilen evrede modelin işlevsel son gameti var mı?"
        choices={[
          ["ready", "Var"],
          ["notyet", "Henüz yok"],
        ]}
        expected={m.complete ? "ready" : "notyet"}
        explanation={`${name}. Bu koşulda son gamet sayısı ${m.functionalGametes}. Haploit olmak, hücrenin olgun hâle geldiğini tek başına göstermez.`}
      />
    </>
  );
}
function MenstrualLab() {
  const [s, set] = useExploration("forge020-bio-cycle", {
    day: 14,
    hcg: false,
  });
  const m = menstrual020(integer(s.day, 1, 28), s.hcg);
  const values = [m.estrogen, m.progesterone, m.lh, m.fsh],
    labels = ["E", "P", "LH", "FSH"];
  return (
    <>
      <h3>Bir günde iki paralel süreç</h3>
      <p>
        <abbr title="Progesteron" aria-label="Progesteron">
          P
        </abbr>
        : luteal evrede artan eşey hormonu.
      </p>
      <p>
        Bu sabit 28 günlük örnekte her eğri ayrı 0–100 göreli ölçektedir; gerçek
        kan düzeyi değildir. Takvimle gebelik veya korunma kararı verilmez. E:
        östrojen.
      </p>
      <Range
        label="Döngü günü"
        value={m.day}
        min={1}
        max={28}
        onChange={(day) => set({ day })}
      />
      <Check
        label="Erken hCG desteği modeli açık"
        checked={s.hcg}
        onChange={(hcg) => set({ hcg })}
      />
      <Figure
        title="Aynı gündeki dört göreli hormon sinyali"
        description={`Gün ${m.day}. E=${fmt(m.estrogen)}, P=${fmt(m.progesterone)}, LH=${fmt(m.lh)}, FSH=${fmt(m.fsh)}; her birinin ölçeği ayrı göreli birimdir.`}
        height={315}
      >
        <path className="bio020-axis" d="M44 48V250H338" />
        <text x="5" y="37">
          100
        </text>
        <text x="14" y="252">
          0
        </text>
        {values.map((v, i) => (
          <g key={labels[i]}>
            <rect
              data-hormone={labels[i]}
              className={i % 2 ? "bio020-mint-fill" : "bio020-accent-fill"}
              x={73 + 66 * i}
              y={250 - v * 1.8}
              width="35"
              height={v * 1.8}
            />
            <text x={72 + 66 * i} y="286">
              {labels[i]}
            </text>
          </g>
        ))}
        <text x="80" y="31">
          Ayrı göreli ölçekler
        </text>
      </Figure>
      <Result>
        <p>
          <strong>
            Gün {m.day}: {m.ovarian}; rahim: {m.uterine}.
          </strong>
        </p>
        <p>
          E {fmt(m.estrogen)}, P {fmt(m.progesterone)}, LH {fmt(m.lh)}, FSH{" "}
          {fmt(m.fsh)}. Birimler farklı eğriler arasında gerçek miktar kıyası
          vermez.
        </p>
        <p>
          Korpus luteum: {readable(m.corpus)}. {readable(m.feedback)}.
        </p>
        <p>
          hCG desteği bu örnekte 20. günden sonra etkindir; erken gün seçimi
          hormonun kişide yok olduğunu kesin göstermez.
        </p>
      </Result>
      <Prediction
        id="cycle"
        context={`${m.day}|${m.hcg}`}
        prompt="Bu örnekte seçili günde yumurtalık hangi evrededir?"
        choices={[
          ["follicle", "Folikül evresi"],
          ["ovulate", "Ovulasyon"],
          ["luteal", "Luteal evre"],
        ]}
        expected={m.day < 14 ? "follicle" : m.day === 14 ? "ovulate" : "luteal"}
        explanation={`Bu sabit takvimde gün ${m.day}, ${m.ovarian.toLocaleLowerCase("tr-TR")}. Rahim evresi ${m.uterine.toLocaleLowerCase("tr-TR")}; iki olay aynı sınıflama değildir.`}
      />
    </>
  );
}
function EmbryoLab() {
  const [s, set] = useExploration("forge020-bio-embryo", {
    stage: "cleavage",
    divisions: 3,
    layer: "ecto",
  });
  const m = embryo020(
    key(embryoStages020, s.stage, "cleavage"),
    integer(s.divisions, 0, 5),
    key(embryoLayers020, s.layer, "ecto"),
  );
  const radius = m.cellCount ? 65 / Math.sqrt(m.cellCount) : 0;
  const layerLabels = { ecto: "Dış", meso: "Orta", endo: "İç" };
  const predictionChoices: readonly (readonly [string, string])[] =
    m.stage === "layers"
      ? options(embryoLayers020)
      : m.stage === "blastocyst"
        ? [
            ["implant", "Rahim iç yüzeyine yerleşme"],
            ["tube", "İlk gamet buluşması"],
          ]
        : [
            ["same", "Toplam hacim aynı"],
            ["double", "Toplam hacim her tur iki kat"],
          ];
  return (
    <>
      <h3>Hücre sayısı, hacim ve doku kökeni</h3>
      <p>
        Önce evreyi seç. Erken sayım yalnız eş zamanlı, kayıpsız bölünme ve
        sabit 128 hacim birimi kabulüdür. Diğer evrelere keyfî kesin hücre
        sayısı atanmaz; çizimler fiziksel hücre boyutu ölçmez, ortalama hacim
        sayıyla verilir.
      </p>
      <div className="bio020-controls">
        <Choice
          label="Gelişim evresi"
          value={m.stage}
          choices={options(embryoStages020)}
          onChange={(stage) => set({ stage })}
        />
        {m.stage === "cleavage" ? (
          <Range
            label="Bölünme turu"
            value={m.divisions}
            min={0}
            max={5}
            onChange={(divisions) => set({ divisions })}
          />
        ) : m.stage === "layers" ? (
          <Choice
            label="Embriyonik tabaka"
            value={m.layer}
            choices={options(embryoLayers020)}
            onChange={(layer) => set({ layer })}
          />
        ) : null}
      </div>
      <Figure
        title="Gelişim evresinde sayı veya tabaka"
        description={
          m.cellCount !== null
            ? `${m.cellCount} hücre, toplam 128 hacim birimi. Ortalama ${fmt(m.volumePerCell!)} birim / hücre.`
            : m.stage === "blastocyst"
              ? "Dış hücre tabakası, iç hücre kitlesi ve boşluk ayrı gösterilir."
              : `Seçili ${m.selectedLayer}: ${readable(m.target)}. Organların farklı dokuları farklı tabakalardan katkı alabilir.`
        }
        height={330}
      >
        {m.stage === "cleavage" ? (
          <>
            <circle className="bio020-guide" cx="180" cy="160" r="115" />
            {Array.from({ length: m.cellCount! }, (_, i) => {
              const count = m.cellCount!,
                cols = Math.ceil(Math.sqrt(count)),
                rows = Math.ceil(count / cols),
                x = 180 + (((i % cols) - (cols - 1) / 2) * 175) / cols,
                y =
                  160 + ((Math.floor(i / cols) - (rows - 1) / 2) * 175) / rows;
              return (
                <circle
                  key={i}
                  data-blastomere={i}
                  className="bio020-cell"
                  cx={x}
                  cy={y}
                  r={radius}
                />
              );
            })}
            <text x="28" y="312">
              {m.cellCount} hücre; toplam 128
            </text>
          </>
        ) : m.stage === "blastocyst" ? (
          <>
            <circle className="bio020-organ" cx="180" cy="155" r="98" />
            <circle className="bio020-guide" cx="180" cy="155" r="79" />
            {Array.from({ length: 5 }, (_, i) => (
              <circle
                key={i}
                className="bio020-cell"
                cx={129 + (i % 2) * 24}
                cy={127 + Math.floor(i / 2) * 23}
                r="16"
              />
            ))}
            <text x="20" y="34">
              Dış tabaka
            </text>
            <path className="bio020-guide" d="M170 30V58" />
            <text x="220" y="164">
              Boşluk
            </text>
            <text x="20" y="302">
              İç hücre kitlesi
            </text>
            <path className="bio020-guide" d="M145 278V208" />
          </>
        ) : (
          <>
            {(["ecto", "meso", "endo"] as const).map((layer, i) => (
              <g key={layer}>
                <rect
                  data-embryonic-layer={layer}
                  data-selected={layer === m.layer}
                  className={
                    layer === m.layer ? "bio020-accent-fill" : "bio020-organ"
                  }
                  x="34"
                  y={55 + i * 75}
                  width="118"
                  height="48"
                />
                <text
                  className={layer === m.layer ? "bio020-on-accent" : ""}
                  x="52"
                  y={87 + i * 75}
                >
                  {layerLabels[layer]}
                </text>
              </g>
            ))}
            <path
              className="bio020-guide"
              d={`M165 ${79 + (["ecto", "meso", "endo"] as const).indexOf(m.layer) * 75}H316`}
            />
            <text x="187" y="307">
              2n korunur
            </text>
          </>
        )}
      </Figure>
      <Result>
        {m.cellCount !== null ? (
          <>
            <p>
              <strong>
                {m.cellCount} hücre; ortalama {fmt(m.volumePerCell!)} birim /
                hücre.
              </strong>
            </p>
            <p>
              2^{m.divisions} = {m.cellCount}; {m.cellCount} ×{" "}
              {fmt(m.volumePerCell!)} = 128. Her normal hücre 2n.
            </p>
          </>
        ) : m.stage === "blastocyst" ? (
          <p>
            <strong>Blastosist: dış tabaka, iç hücre kitlesi ve boşluk.</strong>{" "}
            Normal yerleşme rahim iç yüzeyinde olur; sabit hücre sayısı bu
            şekilden okunmaz.
          </p>
        ) : (
          <p>
            <strong>
              {m.selectedLayer}: {readable(m.target)}.
            </strong>{" "}
            Bu bir doku katkısı eşlemidir; bütün organın tek tabakadan
            oluştuğunu göstermez.
          </p>
        )}
      </Result>
      <Prediction
        id="embryo"
        context={`${m.stage}|${m.divisions}|${m.layer}`}
        prompt={
          m.stage === "layers"
            ? `Şu doku katkısını hangi tabakaya bağlarsın: ${readable(m.target)}?`
            : m.stage === "blastocyst"
              ? "Bu evre hangi olaya hazırlanır?"
              : "Bu erken sayım modelinde toplam hacim nasıl değişir?"
        }
        choices={predictionChoices}
        expected={
          m.stage === "layers"
            ? m.layer
            : m.stage === "blastocyst"
              ? "implant"
              : "same"
        }
        explanation={
          m.cellCount !== null
            ? `Sabit toplam 128 birim ${m.cellCount} hücreye bölünür. Ortalama ${fmt(m.volumePerCell!)}; kromozom takımı hücre başına 2n kalır.`
            : m.stage === "blastocyst"
              ? "Blastosist rahim iç yüzeyine yerleşmeye hazırlanır. Döllenme ondan önce tipik olarak tüpte gerçekleşir."
              : `${m.selectedLayer}, bu örnekte ${m.target.toLocaleLowerCase("tr-TR")} için kaynak tabakadır; komşu dokuların katkısı ayrı olabilir.`
        }
      />
    </>
  );
}
function CommunityLab() {
  const [s, set] = useExploration("forge020-bio-community", {
    aloneA: 20,
    aloneB: 12,
    togetherA: 26,
    togetherB: 18,
  });
  const m = community020(
    integer(s.aloneA, 1, 30),
    integer(s.aloneB, 1, 30),
    integer(s.togetherA, 0, 30),
    integer(s.togetherB, 0, 30),
  );
  const effect = m.pair.join("");
  const cells = [
    [m.aloneA, 72, "A yalnız"],
    [m.togetherA, 140, "A bir arada"],
    [m.aloneB, 220, "B yalnız"],
    [m.togetherB, 288, "B bir arada"],
  ] as const;
  return (
    <>
      <h3>Kontrole göre değişimi gör</h3>
      <p>
        Aynı türün yalnız ve bir arada sayılarını kıyasla. Başlangıç, süre ve
        diğer koşullar eşit tutulur. Bu sayım, etkinin nasıl oluştuğunu tek
        başına göstermez; her tür kendi kontrolüyle kıyaslanır.
      </p>
      <div className="bio020-controls">
        <Range
          label="A yalnız"
          value={m.aloneA}
          min={1}
          max={30}
          onChange={(aloneA) => set({ aloneA })}
        />
        <Range
          label="A bir arada"
          value={m.togetherA}
          min={0}
          max={30}
          onChange={(togetherA) => set({ togetherA })}
        />
        <Range
          label="B yalnız"
          value={m.aloneB}
          min={1}
          max={30}
          onChange={(aloneB) => set({ aloneB })}
        />
        <Range
          label="B bir arada"
          value={m.togetherB}
          min={0}
          max={30}
          onChange={(togetherB) => set({ togetherB })}
        />
      </div>
      <Figure
        title="A ve B için kontrol ve birlikte sayım"
        description={`A yalnız ${m.aloneA}, birlikte ${m.togetherA}. B yalnız ${m.aloneB}, birlikte ${m.togetherB}. Sayı ekseni 0–30 birey; tek türün aynı renkte iki çubuğu karşılaştırılır.`}
        height={330}
      >
        <path className="bio020-axis" d="M48 65V245H339" />
        <text x="4" y="73">
          30
        </text>
        <text x="9" y="249">
          0
        </text>
        {cells.map(([v, x, label], i) => (
          <g key={label}>
            <rect
              data-community-bar={i}
              className={i < 2 ? "bio020-accent-fill" : "bio020-mint-fill"}
              x={x - 15}
              y={245 - v * 6}
              width="30"
              height={v * 6}
            />
            <text x={x} y="279" textAnchor="middle">
              {["A₀", "A₁", "B₀", "B₁"][i]}
            </text>
          </g>
        ))}
      </Figure>
      <p>₀: yalnız kontrolü; ₁: bir arada. Çubuklar birey sayısıdır.</p>
      <Result>
        <p>
          <strong>
            A: {m.deltaA > 0 ? "+" : ""}
            {m.deltaA}; B: {m.deltaB > 0 ? "+" : ""}
            {m.deltaB} birey.
          </strong>
        </p>
        <p>
          İşaretler A sonra B: {m.pair[0]} / {m.pair[1]}.{" "}
          <abbr title={m.interpretation} aria-label={m.interpretation}>
            {readable(m.interpretation)}
          </abbr>
          .
        </p>
        <p>
          0, bu süre ve ölçütte net fark yok demektir. Artı/eksi, avcılık ile
          parazitliği tek başına ayırmaz.
        </p>
      </Result>
      <Prediction
        id="community"
        context={`${m.aloneA}|${m.aloneB}|${m.togetherA}|${m.togetherB}`}
        prompt="A ve B için kontrolüne göre net işaret çifti nedir? İlk işaret A’ya aittir."
        choices={[
          ["++", "+ / +"],
          ["+−", "+ / −"],
          ["+0", "+ / 0"],
          ["−+", "− / +"],
          ["−−", "− / −"],
          ["−0", "− / 0"],
          ["0+", "0 / +"],
          ["0−", "0 / −"],
          ["00", "0 / 0"],
        ]}
        expected={effect}
        explanation={`A: ${m.togetherA}−${m.aloneA}=${m.deltaA}; B: ${m.togetherB}−${m.aloneB}=${m.deltaB}. Aynı türün iki koşulu kıyaslanır; sonuç ${m.pair[0]} / ${m.pair[1]}.`}
      />
    </>
  );
}
function PopulationLab() {
  const [s, set] = useExploration("forge020-bio-population", {
    initial: 100,
    births: 20,
    deaths: 8,
    incoming: 5,
    outgoing: 7,
    area: 5,
    capacity: 150,
    r: 0.2,
  });
  const initial = integer(s.initial, 0, 200),
    births = integer(s.births, 0, 50),
    incoming = integer(s.incoming, 0, 50),
    deaths = integer(s.deaths, 0, Math.min(50, initial + births + incoming)),
    outgoing = integer(
      s.outgoing,
      0,
      Math.min(50, initial + births + incoming - deaths),
    );
  const m = population020(
    initial,
    births,
    deaths,
    incoming,
    outgoing,
    clamp(s.area, 1, 20),
    clamp(s.capacity, 20, 200),
    clamp(s.r, 0, 0.5),
  );
  const max = Math.max(20, m.initial, m.final, m.capacity),
    h = (n: number) => (n / max) * 170;
  const maxN = Math.max(m.initial, m.capacity * 1.5),
    scale =
      m.r === 0
        ? 1
        : Math.max(
            (m.r * m.capacity) / 4,
            Math.abs(m.r * maxN * (1 - maxN / m.capacity)),
          ),
    y = (slope: number) => 140 - (75 * slope) / scale,
    x = (n: number) => 48 + (n / maxN) * 255;
  const curve = Array.from({ length: 61 }, (_, i) => {
    const n = (maxN * i) / 60;
    return `${i ? "L" : "M"}${x(n)} ${y(m.r * n * (1 - n / m.capacity))}`;
  }).join(" ");
  return (
    <>
      <h3>Bilanço ve anlık hız ayrı hesaplanır</h3>
      <p>
        İlk beş sayı aynı döneme ait birey miktarıdır. Son sayı = ilk + doğum +
        içe göç − ölüm − dışa göç. Çıkışlar mevcut bireyleri aşamaz; azaltma
        olursa ilgili çıkış denetimi de sınırına iner.
      </p>
      <div className="bio020-controls">
        <Range
          label="İlk birey sayısı"
          value={m.initial}
          min={0}
          max={200}
          onChange={(initial) => set({ initial })}
        />
        <Range
          label="Doğum"
          value={m.births}
          min={0}
          max={50}
          onChange={(births) => set({ births })}
        />
        <Range
          label="Ölüm"
          value={m.deaths}
          min={0}
          max={Math.min(50, initial + births + incoming)}
          onChange={(deaths) => set({ deaths })}
        />
        <Range
          label="İçe göç"
          value={m.incoming}
          min={0}
          max={50}
          onChange={(incoming) => set({ incoming })}
        />
        <Range
          label="Dışa göç"
          value={m.outgoing}
          min={0}
          max={Math.min(50, initial + births + incoming - deaths)}
          onChange={(outgoing) => set({ outgoing })}
        />
        <Range
          label="Alan (km²)"
          value={m.area}
          min={1}
          max={20}
          onChange={(area) => set({ area })}
        />
        <Range
          label="K: kapasite"
          value={m.capacity}
          min={20}
          max={200}
          onChange={(capacity) => set({ capacity })}
        />
        <Range
          label="r (yıl⁻¹)"
          value={m.r}
          min={0}
          max={0.5}
          step={0.05}
          onChange={(r) => set({ r })}
        />
      </div>
      <Figure
        title="İlk ve son sayı ile koşullu kapasite"
        description={`Sayı ekseninde 0–${max} birey. İlk ${m.initial}, son ${m.final}, K ${m.capacity}. K bu modelde çevrenin uzun dönem destek parametresidir; anlık katı tavan değildir.`}
        height={295}
      >
        <path className="bio020-axis" d="M45 45V230H334" />
        <text x="6" y="32">
          {max}
        </text>
        <text x="13" y="234">
          0
        </text>
        {[
          [m.initial, "İlk"],
          [m.final, "Son"],
          [m.capacity, "K"],
        ].map(([n, name], i) => (
          <g key={name}>
            <rect
              data-population-bar={String(name)}
              className={i === 1 ? "bio020-accent-fill" : "bio020-mint-fill"}
              x={87 + i * 82}
              y={230 - h(Number(n))}
              width="36"
              height={h(Number(n))}
            />
            <text x={104 + i * 82} y="268" textAnchor="middle">
              {name}
            </text>
          </g>
        ))}
      </Figure>
      <Figure
        title="Lojistik anlık eğim, gelecek birey sayısı değil"
        description={`Yatay eksen mevcut N: 0–${fmt(maxN)} birey. Düşey hız: ${fmt(-scale)} ile +${fmt(scale)} birey/yıl. İşaretli nokta ilk N=${m.initial}, hız=${fmt(m.growthSlope)}. Bu ayrı sürekli modeldir, üstteki dönem bilançosunun sonunu tahmin etmez.`}
        height={300}
      >
        <path className="bio020-axis" d="M48 42V225M48 140H323" />
        <text x="15" y="42">
          +
        </text>
        <text x="17" y="148">
          0
        </text>
        <text x="15" y="225">
          −
        </text>
        <path data-logistic-curve className="bio020-mint" d={curve} />
        <circle
          data-logistic-point
          className="bio020-cell"
          cx={x(m.initial)}
          cy={y(m.growthSlope)}
          r="7"
        />
        <text x="49" y="259">
          N: 0 → {fmt(maxN)}
        </text>
        <text x="49" y="293">
          Hız: birey / yıl
        </text>
      </Figure>
      <Result>
        <p>
          <strong>
            Son sayı: {m.final}; fark: {m.change > 0 ? "+" : ""}
            {m.change} birey.
          </strong>
        </p>
        <p>
          Yoğunluk {fmt(m.density)} birey/km²; ilk sayıya göre değişim{" "}
          {m.percentage === null
            ? "tanımsız; ilk sayı sıfır"
            : `%${fmt(m.percentage)}`}
          .
        </p>
        <p>
          Ayrı lojistik anlık hız: {fmt(m.growthSlope)} birey/yıl. dN/dt =
          rN(1−N/K); N için ilk sayı kullanılır. Bu değer bir sonraki yılın
          sayısı değildir.
        </p>
        <p>
          Hız ekseni tam aralığı: −{fmt(scale)} ile +{fmt(scale)} birey/yıl.
          Aynı K ve r’de mutlak anlık artış K/2’de en büyüktür.
        </p>
      </Result>
      <Prediction
        id="population"
        context={`${m.initial}|${m.births}|${m.deaths}|${m.incoming}|${m.outgoing}|${m.area}|${m.capacity}|${m.r}`}
        prompt="Dönem hesabında son birey sayısı ilk sayıya göre nasıl değişti? Lojistik hız başka ölçüdür."
        choices={[
          ["up", "Arttı"],
          ["same", "Aynı kaldı"],
          ["down", "Azaldı"],
        ]}
        expected={m.change > 0 ? "up" : m.change < 0 ? "down" : "same"}
        explanation={`${m.initial}+${m.births}+${m.incoming}−${m.deaths}−${m.outgoing}=${m.final}. Net fark ${m.change}; yoğunluk ve anlık hız ayrı işlemlerdir.`}
      />
    </>
  );
}
function SequenceControl({
  sequence,
  kind,
  onApply,
}: {
  sequence: string;
  kind: "dna" | "rna";
  onApply: (sequence: string) => void;
}) {
  const [draft, setDraft] = useState(sequence),
    [error, setError] = useState(false),
    id = useId();
  const valid = (kind === "dna" ? /^[ACGT]{1,12}$/ : /^[ACGU]{1,12}$/).test(
    draft,
  );
  return (
    <div className="bio020-field">
      <label htmlFor={id}>Dizi (5′ → 3′)</label>
      <input
        id={id}
        type="text"
        maxLength={12}
        value={draft}
        autoCapitalize="characters"
        spellCheck={false}
        onChange={(e) => {
          setDraft(e.target.value.toUpperCase().slice(0, 12));
          setError(false);
        }}
      />
      <p>
        1–12 baz. {kind === "dna" ? "A, C, G, T" : "A, C, G, U"} kullan. Önce
        yaz, sonra uygula. Taslak tek başına sonucu değiştirmez.
      </p>
      <button
        type="button"
        onClick={() => {
          if (valid) onApply(draft);
          else setError(true);
        }}
      >
        Diziyi uygula
      </button>
      {error && (
        <p role="alert">
          Boş olmayan, geçerli bazlarla bir dizi yaz. Son geçerli sonuç korunur.
        </p>
      )}
    </div>
  );
}
function NucleicLab() {
  const [s, set] = useExploration("forge020-bio-nucleic", {
    kind: "dna",
    sequence: "AGTC",
    circular: false,
  });
  const kind = key(nucleicKinds020, s.kind, "dna"),
    sequence = (kind === "dna" ? /^[ACGT]{1,12}$/ : /^[ACGU]{1,12}$/).test(
      s.sequence,
    )
      ? s.sequence
      : kind === "dna"
        ? "AGTC"
        : "AGUC",
    m = nucleic020(kind, sequence, s.circular);
  return (
    <>
      <h3>Yönü, bazı ve bağı birlikte say</h3>
      <p>
        DNA için üst zincir 5′→3′ verilir; alt zincir ters yönlüdür. RNA’da
        burada katlanma seçilmediği için H bağı sayısı bu veriden çıkmaz. Halka
        seçimi soyut bağ sayımıdır; çok kısa gerçek halka kararlılığı iddiası
        değildir.
      </p>
      <Choice
        label="Molekül"
        value={m.kind}
        choices={options(nucleicKinds020)}
        onChange={(kind) =>
          set({
            kind,
            sequence:
              kind === "dna"
                ? m.sequence.replaceAll("U", "T")
                : m.sequence.replaceAll("T", "U"),
          })
        }
      />
      <SequenceControl
        key={`${kind}|${sequence}`}
        sequence={m.sequence}
        kind={m.kind}
        onApply={(sequence) => set({ sequence })}
      />
      <Check
        label="Omurga halkasal ve kesintisiz"
        checked={m.circular}
        onChange={(circular) => set({ circular })}
      />
      <Figure
        title="Antiparalel baz eşleri ve omurga uçları"
        description={`Üst dizi 5′-${m.sequence}-3′. ${m.complement ? `Alt dizi aynı doğrultuda 3′-${m.complement}-5′.` : "Tek RNA zinciri; katlanma belirtilmedi."} ${m.circular ? "Uçları bağlayan yaylar halka kapanışını simgeler." : "Doğrusal uçlar açık."}`}
        height={255}
      >
        {!m.circular && (
          <>
            <text x="9" y="83">
              5′
            </text>
            <text x="325" y="83">
              3′
            </text>
          </>
        )}
        <path
          className="bio020-guide"
          d={`M50 55H${54 + 22 * (m.length - 1)}`}
        />
        {m.circular && (
          <path
            data-circular-backbone="upper"
            className="bio020-mint"
            d={`M54 55C35 10 ${75 + 22 * (m.length - 1)} 10 ${54 + 22 * (m.length - 1)} 55`}
          />
        )}
        {[...m.sequence].map((b, i) => (
          <g key={i}>
            <text data-base-top={i} x={54 + 22 * i} y="84" textAnchor="middle">
              {b}
            </text>
            {m.complement &&
              Array.from({ length: b === "A" || b === "T" ? 2 : 3 }, (_, j) => (
                <path
                  key={j}
                  className="bio020-bond"
                  d={`M${54 + 22 * i - 4 + j * 4} 96V114`}
                />
              ))}
          </g>
        ))}
        {m.complement && (
          <>
            {!m.circular && (
              <>
                <text x="9" y="150">
                  3′
                </text>
                <text x="325" y="150">
                  5′
                </text>
              </>
            )}
            <path
              className="bio020-guide"
              d={`M50 176H${54 + 22 * (m.length - 1)}`}
            />
            {[...m.complement].map((b, i) => (
              <text
                data-base-bottom={i}
                key={i}
                x={54 + 22 * i}
                y="150"
                textAnchor="middle"
              >
                {b}
              </text>
            ))}
            {m.circular && (
              <path
                data-circular-backbone="lower"
                className="bio020-mint"
                d={`M54 176C35 215 ${75 + 22 * (m.length - 1)} 215 ${54 + 22 * (m.length - 1)} 176`}
              />
            )}
          </>
        )}
        <text x="18" y="244">
          Her harf bir nükleotittir.
        </text>
      </Figure>
      <Result>
        <p>
          <strong>
            {m.nucleotides} nükleotit; omurgada {m.phosphodiester} bağ.
          </strong>
        </p>
        <p>
          Hidrojen bağı:{" "}
          {m.hydrogen === null ? "bu RNA verisi tek sonuç vermez" : m.hydrogen}.
          Şeker:{" "}
          <abbr title={m.sugar} aria-label={m.sugar}>
            {m.kind === "dna" ? "DNA şekeri" : "Riboz"}
          </abbr>
          .
        </p>
        {m.complement && (
          <>
            <p>
              Karşı zincir soldan sağa: 3′ — {m.complement.split("").join(" ")}{" "}
              — 5′.
            </p>
            <p>
              Karşı zincir kendi yönünde: 5′ —{" "}
              {m.reverseComplement!.split("").join(" ")} — 3′.
            </p>
          </>
        )}
        <p>
          Toplam bazlar: A {m.totals.A}, T {m.totals.T}, G {m.totals.G}, C{" "}
          {m.totals.C}, U {m.totals.U}. Çift DNA bütünü ile tek verilen zincir
          ayrı sayılır.
        </p>
      </Result>
      <Prediction
        id="nucleic"
        context={`${m.kind}|${m.sequence}|${m.circular}`}
        prompt="Bu molekülde seçilen omurga için bağ sayımı hangi kurala uyar? N toplam nükleotit sayısıdır."
        choices={[
          ["two", "N − 2; iki doğrusal zincir"],
          ["one", "N − 1; tek doğrusal zincir"],
          ["ring", "N; kesintisiz halka zincirler"],
        ]}
        expected={m.circular ? "ring" : m.strands === 2 ? "two" : "one"}
        explanation={`${m.nucleotides} nükleotit, ${m.strands} zincir. ${m.circular ? "Uçlar kapanır: bağ sayısı toplam nükleotit kadardır." : "Her doğrusal zincirde bir komşuluk bağlantısı eksiktir."} Sonuç ${m.phosphodiester} omurga bağı; H bağı ayrı ölçüdür.`}
      />
    </>
  );
}
function DiscoveryLab() {
  const [s, set] = useExploration("forge020-bio-discovery", {
    experiment: "griffith",
    condition: "mix",
  });
  const experiment = key(discoveryExperiments020, s.experiment, "griffith"),
    conditions = discoveryConditions020[experiment],
    fallback = Object.keys(conditions)[0],
    condition = Object.hasOwn(conditions, s.condition) ? s.condition : fallback,
    m = discovery020(experiment, condition);
  const expected =
    experiment === "griffith"
      ? m.mouseSurvives
        ? "live"
        : "die"
      : experiment === "avery"
        ? m.transformed
          ? "yes"
          : "no"
        : condition === "P32"
          ? "pellet"
          : "top";
  const choices: readonly (readonly [string, string])[] =
    experiment === "griffith"
      ? [
          ["live", "Fare yaşar"],
          ["die", "Fare ölür"],
        ]
      : experiment === "avery"
        ? [
            ["yes", "R → S dönüşümü var"],
            ["no", "Dönüşüm yok"],
          ]
        : [
            ["pellet", "Çoğu işaret çökeltide"],
            ["top", "Çoğu işaret üst sıvıda"],
          ];
  return (
    <>
      <h3>Kontrol grubunu değiştiren kanıt</h3>
      <p>
        Bir deneyi ve yalnız o deneyin geçerli grubunu seç. Fareler tarihsel
        deneyin sonucunu gösterir; canlı deney yapılmaz. Enzimler seçicidir,
        alıcı canlılığı korunur. T2’de sinyalin çoğunluğu izlenir; bütün
        virüslere tek sonuç taşınmaz.
      </p>
      <div className="bio020-controls">
        <Choice
          label="Deney"
          value={experiment}
          choices={options(discoveryExperiments020)}
          onChange={(experiment) =>
            set({
              experiment,
              condition: Object.keys(
                discoveryConditions020[
                  key(discoveryExperiments020, experiment, "griffith")
                ],
              )[0],
            })
          }
        />
        <Choice
          label="Deney grubu"
          value={condition}
          choices={options(conditions)}
          onChange={(condition) => set({ condition })}
        />
      </div>
      <Figure
        title="Seçili deneyde madde veya özellik yolu"
        description={
          experiment === "phage"
            ? `T2 işareti ${condition}. Bakteriler çökeltide, ayrılmış kılıflar üst sıvıda. ${m.signal}.`
            : experiment === "avery"
              ? `Özüte ${condition} işlemi. Canlı alıcılar korunur. R’den S’ye dönüşüm ${m.transformed ? "var" : "yok"}.`
              : `${condition} grubu; fare ${m.mouseSurvives ? "yaşar" : "ölür"}. Canlı S ${m.livingS ? "bulunur" : "bulunmaz"}.`
        }
        height={335}
      >
        {experiment === "phage" ? (
          <>
            <rect
              className="bio020-organ"
              x="22"
              y="65"
              width="100"
              height="150"
              rx="45"
            />
            <text x="22" y="48">
              Bakteri
            </text>
            <path className="bio020-mint" d="M42 145q20-45 40 0t20 0" />
            <path
              className="bio020-organ"
              d="M168 60l27-16 27 16v32l-27 16-27-16Z"
            />
            <path
              className="bio020-guide"
              d="M195 108V150M180 150H210M195 150l-18 24m18-24 18 24"
            />
            <text x="164" y="33">
              T2
            </text>
            <path className="bio020-axis" d="M252 72V250Q285 288 319 250V72" />
            <path className="bio020-guide" d="M254 210H317" />
            <rect
              data-isotope-compartment={condition === "P32" ? "pellet" : "top"}
              className="bio020-accent-fill"
              x="260"
              y={condition === "P32" ? 218 : 108}
              width="52"
              height={condition === "P32" ? 27 : 66}
            />
            <text x="250" y="62">
              Tüp
            </text>
            <text x="261" y="101">
              Üst
            </text>
            <text x="258" y="303">
              Dip
            </text>
            <text x="22" y="298">
              {condition === "P32" ? "³²P: DNA" : "³⁵S: kılıf"}
            </text>
          </>
        ) : (
          <>
            <rect
              className="bio020-organ"
              x="26"
              y="80"
              width="105"
              height="64"
              rx="28"
            />
            <text x="62" y="125">
              {experiment === "griffith" &&
              (condition === "S" || condition === "deadS")
                ? "S"
                : "R"}
            </text>
            {experiment === "griffith" && condition === "deadS" && (
              <path className="bio020-stop" d="M55 92l40 40m0-40-40 40" />
            )}
            <path
              className={m.transformed ? "bio020-mint" : "bio020-guide"}
              d="M148 111H215l-12-8m12 8-12 8"
            />
            <rect
              data-transformed={String(m.transformed)}
              className={
                m.livingS || m.transformed
                  ? "bio020-accent-fill"
                  : "bio020-organ"
              }
              x="232"
              y="80"
              width="100"
              height="64"
              rx="28"
            />
            <text
              className={m.livingS || m.transformed ? "bio020-on-accent" : ""}
              x="248"
              y="125"
            >
              {m.livingS || m.transformed
                ? "S"
                : experiment === "griffith" && condition === "deadS"
                  ? "Yok"
                  : "R"}
            </text>
            {experiment === "avery" ? (
              <>
                <text x="24" y="38">
                  Seçici özüt işlemi
                </text>
                <path
                  data-dna-intact={String(condition !== "dnase")}
                  className="bio020-mint"
                  d={
                    condition === "dnase"
                      ? "M48 205h45M117 205h34M183 205h38M251 205h45"
                      : "M48 205H300"
                  }
                />
                <text x="24" y="284">
                  Dönüşüm: {m.transformed ? "var" : "yok"}
                </text>
              </>
            ) : (
              <>
                <text x="24" y="38">
                  Grup:{" "}
                  {condition === "mix"
                    ? "R + ölü S"
                    : condition === "deadS"
                      ? "Ölü S"
                      : condition}
                </text>
                <text x="24" y="214">
                  Fare: {m.mouseSurvives ? "yaşar" : "ölür"}
                </text>
                <text x="24" y="274">
                  Canlı S: {m.livingS ? "var" : "yok"}
                </text>
              </>
            )}
          </>
        )}
      </Figure>
      <Result>
        <p>
          <strong>
            {discoveryExperiments020[experiment]} —{" "}
            {conditions[condition as keyof typeof conditions]}.
          </strong>
        </p>
        <p>
          {experiment === "phage"
            ? `${m.signal}. Karıştırma kılıfları ayırır; bakteri çökeltide bulunur.`
            : experiment === "avery"
              ? `R → S dönüşümü ${m.transformed ? "var" : "yok"}. DNaz DNA’yı, RNaz RNA’yı, proteaz proteini hedefler.`
              : `Fare ${m.mouseSurvives ? "yaşar" : "ölür"}; canlı S ${m.livingS ? "var" : "yok"}. Karışım özelliği aktarır; tek başına kimyasal kimliği vermez.`}
        </p>
        <p>{readable(m.conclusion)}</p>
      </Result>
      <Prediction
        id="discovery"
        context={`${experiment}|${condition}`}
        prompt={
          experiment === "phage"
            ? "İşaretin çoğu hangi bölmede beklenir?"
            : experiment === "avery"
              ? "Canlılık ve seçicilik korunursa dönüşüm beklenir mi?"
              : "Verilen tarihsel deney grubunda farenin sonucu nedir?"
        }
        choices={choices}
        expected={expected}
        explanation={
          experiment === "phage"
            ? `${m.signal}. DNA’nın ve kılıfın yolu farklı bölmelerle izlenir; sonuç bu T2 sistemi içindir.`
            : experiment === "avery"
              ? `Bu grupta dönüşüm ${m.transformed ? "var" : "yok"}; seçici DNaz DNA gereğini sınar.`
              : `Bu grupta fare ${m.mouseSurvives ? "yaşar" : "ölür"}. Canlı S’nin geri elde edilmesi de ayrıca izlenir.`
        }
      />
    </>
  );
}
const labs: Record<string, () => ReactNode> = {
  "ureme-kadin-organlar": FemaleLab,
  "ureme-gametogenez": GameteLab,
  "ureme-menstrual-dongu": MenstrualLab,
  "ureme-embriyonik-gelisim": EmbryoLab,
  "ekoloji-komunite": CommunityLab,
  "ekoloji-populasyon": PopulationLab,
  "nukleik-asitler-yapi": NucleicLab,
  "kalitim-molekulu-kesfi": DiscoveryLab,
};
export default function Forge020BiologyLab({ lessonId }: { lessonId: string }) {
  const Lab = labs[lessonId];
  return Lab ? (
    <section className="bio020-lab" data-forge020={lessonId}>
      <Lab />
    </section>
  ) : null;
}
