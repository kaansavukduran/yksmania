import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  hypothalamusRoute,
  pituitaryResponse,
  pituitaryHormones,
  thyroidAxis,
  thyroidConditions,
  calciumBalance,
  adrenalRoute,
  adrenalProducts,
  pancreasTransfer,
  tissueLabels,
  pinealWindow,
  type HypoHormone,
  type HypoBlock,
  type PituitaryHormone,
  type PituitaryTarget,
  type ThyroidCondition,
  type AdrenalProduct,
  type AdrenalSignal,
  type PancreaticTissue,
} from "./forge016BiologyA";
import "./forge016BiologyA.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const n = (x: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(x);
const bound = (x: number, a: number, b: number) =>
  Number.isFinite(x) ? Math.max(a, Math.min(b, x)) : a;
const has = <T extends object>(x: T, k: string): k is keyof T & string =>
  Object.hasOwn(x, k);
function Drawing({
  title,
  children,
  height = 380,
}: {
  title: string;
  children: ReactNode;
  height?: number;
}) {
  const uid = useId();
  return (
    <svg
      className="bio016a-drawing"
      role="img"
      aria-labelledby={uid}
      viewBox={`0 0 360 ${height}`}
    >
      <title id={uid}>{title}</title>
      {children}
    </svg>
  );
}
function Arrow({
  x1,
  y1,
  x2,
  y2,
  active = true,
  kind = "flow",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
  kind?: string;
}) {
  const uid = useId();
  return (
    <g
      className={active ? "bio016a-path" : "bio016a-inactive"}
      data-flow={kind}
      data-active={active}
    >
      <defs>
        <marker
          id={uid}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0L10,5L0,10Z" fill="currentColor" />
        </marker>
      </defs>
      <path d={`M${x1},${y1}L${x2},${y2}`} markerEnd={`url(#${uid})`} />
    </g>
  );
}
function Choice({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (s: string) => void;
}) {
  const uid = useId();
  return (
    <div className="bio016a-field">
      <label htmlFor={uid}>{label}</label>
      <ChoiceSelect id={uid} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([k, t]) => (
          <option key={k} value={k}>
            {t}
          </option>
        ))}
      </ChoiceSelect>
      <output htmlFor={uid}>
        Seçili: {options.find(([k]) => k === value)?.[1]}
      </output>
    </div>
  );
}
function Range({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const uid = useId();
  return (
    <div className="bio016a-field">
      <label htmlFor={uid}>{label}</label>
      <input
        id={uid}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
      />
      <output htmlFor={uid}>{n(value)}</output>
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
  onChange: (s: boolean) => void;
}) {
  return (
    <label className="bio016a-check">
      <input
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
    <div className="bio016a-result" data-model-result aria-live="polite">
      {children}
    </div>
  );
}
function Prediction({
  id,
  context,
  expected,
  options,
  explanation,
}: {
  id: string;
  context: string;
  expected: string;
  options: [string, string][];
  explanation: string;
}) {
  const uid = useId();
  const [s, set] = useExploration(`forge016-bioa-prediction-${id}`, {
    answer: "",
    reason: "",
    checked: false,
    context: "",
  });
  const selected = options.find(([k]) => k === s.answer);
  return (
    <div className="bio016a-prediction">
      <label htmlFor={uid + "-answer"}>Sonuç tahminin</label>
      <ChoiceSelect
        id={uid + "-answer"}
        value={selected ? s.answer : ""}
        onChange={(e) => set({ answer: e.target.value, checked: false })}
      >
        <option value="">Bir sonuç seç</option>
        {options.map(([k, t]) => (
          <option key={k} value={k}>
            {t}
          </option>
        ))}
      </ChoiceSelect>
      <output data-selected-prediction htmlFor={uid + "-answer"}>
        {selected
          ? `Seçili tahmin: ${selected[1]}`
          : "Henüz bir tahmin seçilmedi."}
      </output>
      <label htmlFor={uid + "-reason"}>Gerekçen</label>
      <textarea
        id={uid + "-reason"}
        rows={3}
        maxLength={120}
        value={s.reason.slice(0, 120)}
        onChange={(e) =>
          set({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        className="secondary"
        disabled={!selected || !s.reason.trim()}
        onClick={() => set({ checked: true, context: context.slice(0, 120) })}
      >
        Tahminimi karşılaştır
      </button>
      {s.checked && s.context === context && selected && (
        <div className="bio016a-feedback" role="status">
          <strong>
            {s.answer === expected
              ? "Seçimin bu modeldeki kanıtla uyumlu."
              : "Seçimini kanıtla yeniden karşılaştır."}
          </strong>
          <p>{explanation}</p>
          <p>
            Gerekçene puan verilmez. Bu keşif soru puanı, XP ya da konu bitiş kaydı eklemez.
          </p>
        </div>
      )}
    </div>
  );
}
function HypothalamusLab() {
  const id = "endokrin-hipotalamus";
  const [s, set] = useExploration("forge016-bioa-" + id, {
    hormone: "adh",
    block: "none",
  });
  const hormone: HypoHormone = ["trh", "adh", "oxy"].includes(s.hormone)
      ? (s.hormone as HypoHormone)
      : "adh",
    block: HypoBlock = ["none", "portal", "axon", "release"].includes(s.block)
      ? (s.block as HypoBlock)
      : "none";
  const m = hypothalamusRoute(hormone, block);
  return (
    <>
      <h3>Bir haberi üretimden salıma kadar izle</h3>
      <p>
        Bu seçici kesinti deneyi yalnız yeni gönderilen haberin yolunu izler.
        Hipotalamik sentez sağlam kabul edilir; önceden depolanmış hormon ve
        gerçek kan derişimi hesaplanmaz. TRH örneğinde son basamak TRH’ye bağlı
        TSH salım katkısıdır.
      </p>
      <div className="bio016a-controls">
        <Choice
          label="İzlenen haber"
          value={hormone}
          options={[
            ["trh", "TRH; ön lob düzenleyicisi"],
            ["adh", "ADH; arka loba taşınan hormon"],
            ["oxy", "Oksitosin; arka loba taşınan hormon"],
          ]}
          onChange={(hormone) => set({ hormone })}
        />
        <Choice
          label="Seçici kesinti"
          value={block}
          options={[
            ["none", "Kesinti yok"],
            ["portal", "Portal yol engelli"],
            ["axon", "Arka loba giden akson yolu engelli"],
            ["release", "Seçili lobun kana salım basamağı engelli"],
          ]}
          onChange={(block) => set({ block })}
        />
      </div>
      <Drawing
        title={`${m.name}: hipotalamus, ${m.route}, ${m.destination} ve kana salım`}
        height={425}
      >
        <rect
          className="bio016a-organ"
          x={40}
          y={28}
          width={280}
          height={62}
          rx={24}
        />
        <text x={180} y={68} textAnchor="middle">
          Hipotalamus
        </text>
        <Arrow
          x1={180}
          y1={95}
          x2={180}
          y2={134}
          active={m.arrival}
          kind="arrival"
        />
        <rect
          className="bio016a-cell"
          x={60}
          y={145}
          width={240}
          height={55}
          rx={12}
        />
        <text data-route-label x={180} y={181} textAnchor="middle">
          {m.route}
        </text>
        <Arrow
          x1={180}
          y1={205}
          x2={180}
          y2={244}
          active={m.arrival}
          kind="transport"
        />
        <rect
          data-destination={m.posterior ? "posterior" : "anterior"}
          className="bio016a-organ"
          x={60}
          y={255}
          width={240}
          height={58}
          rx={18}
        />
        <text x={180} y={293} textAnchor="middle">
          {m.posterior ? "Arka lob" : "Ön lob"}
        </text>
        <Arrow
          x1={180}
          y1={319}
          x2={180}
          y2={358}
          active={m.release}
          kind="release"
        />
        <text x={180} y={399} textAnchor="middle">
          {m.posterior ? m.name : "TSH katkısı"}
        </text>
      </Drawing>
      <Result>
        <strong>
          {m.name}: {m.route} → {m.destination}
        </strong>
        <p>
          Hipotalamik sentez: sağlam. Yeni haberin ulaşması:{" "}
          {m.arrival ? "var" : "engelli"}. Seçili salım katkısı:{" "}
          {m.release ? "mümkün" : "engelli"}.
        </p>
        <p>{m.evidence}</p>
      </Result>
      <Prediction
        id={id}
        context={hormone + ":" + block}
        expected={
          m.release
            ? "release"
            : m.arrival
              ? "blockedRelease"
              : "blockedArrival"
        }
        options={[
          ["release", "Yeni haber ulaşır; seçili salım katkısı mümkündür"],
          ["blockedRelease", "Haber ulaşır; seçili salım basamağı engellidir"],
          ["blockedArrival", "Yeni haberin seçili loba ulaşması engellidir"],
        ]}
        explanation={m.evidence}
      />
    </>
  );
}
function PituitaryLab() {
  const id = "endokrin-hipofiz";
  const [s, set] = useExploration("forge016-bioa-" + id, {
    hormone: "prl",
    target: "milk",
    receptor: true,
    plates: true,
  });
  const hormone: PituitaryHormone = has(pituitaryHormones, s.hormone)
      ? s.hormone
      : "prl",
    target: PituitaryTarget = Object.values(pituitaryHormones).some(
      (h) => h.target === s.target,
    )
      ? (s.target as PituitaryTarget)
      : "milk";
  const m = pituitaryResponse(hormone, target, s.receptor, s.plates);
  const effectLabel =
    hormone === "prl"
      ? "Süt sentezi"
      : hormone === "oxy"
        ? "Süt atımı"
        : hormone === "gh"
          ? "Büyüme"
          : hormone === "adh"
            ? "Su korunması"
            : hormone === "fsh"
              ? "Sertoli"
              : hormone === "lh"
                ? "Leydig"
                : hormone === "tsh"
                  ? "T3/T4 yolu"
                  : "Kortizol yolu";
  return (
    <>
      <h3>Hormon ile doğru hedefi buluştur</h3>
      <p>
        Bu görev temel hedef eşleştirmesidir; eşleşmeyen kart başka hiçbir
        biyolojik etki yok anlamına gelmez. FSH/LH kartları erkek gonadı
        örneğidir. Reseptör engeli yalnız verilen hedef yanıtını keser; GH için
        büyüme plağı koşulu ayrıca görünür.
      </p>
      <div className="bio016a-controls">
        <Choice
          label="Hipofiz bağlantılı hormon"
          value={hormone}
          options={Object.entries(pituitaryHormones).map(([k, h]) => [
            k,
            h.name,
          ])}
          onChange={(hormone) => set({ hormone })}
        />
        <Choice
          label="Verilen hedef kartı"
          value={target}
          options={Object.values(pituitaryHormones).map((h) => [
            h.target,
            h.targetLabel,
          ])}
          onChange={(target) => set({ target })}
        />
        <Check
          label="Uygun reseptör yanıtı sağlam"
          checked={s.receptor}
          onChange={(receptor) => set({ receptor })}
        />
        {hormone === "gh" && (
          <Check
            label="Uzun kemik büyüme plakları açık"
            checked={s.plates}
            onChange={(plates) => set({ plates })}
          />
        )}
      </div>
      <Drawing
        title={`${m.name}: kaynak bölümü ve ${m.targetLabel} hedef eşleştirmesi`}
        height={350}
      >
        <text x={95} y={40} textAnchor="middle">
          Ön lob
        </text>
        <text x={267} y={40} textAnchor="middle">
          Arka lob
        </text>
        <ellipse
          data-lobe="anterior"
          className={!m.posterior ? "bio016a-selected" : "bio016a-cell"}
          cx={95}
          cy={110}
          rx={65}
          ry={53}
        />
        <ellipse
          data-lobe="posterior"
          className={m.posterior ? "bio016a-selected" : "bio016a-cell"}
          cx={267}
          cy={110}
          rx={48}
          ry={45}
        />
        <text x={m.posterior ? 267 : 95} y={120} textAnchor="middle">
          {hormone === "oxy"
            ? "Oksi."
            : m.name === "Prolaktin"
              ? "PRL"
              : m.name}
        </text>
        <Arrow
          x1={m.posterior ? 267 : 95}
          y1={170}
          x2={180}
          y2={235}
          active={m.response}
          kind="target-response"
        />
        <rect
          data-target-match={m.matches}
          className="bio016a-organ"
          x={35}
          y={246}
          width={290}
          height={68}
          rx={16}
        />
        <text x={180} y={289} textAnchor="middle">
          {m.response ? effectLabel : "Yanıt gösterilmedi"}
        </text>
      </Drawing>
      <Result>
        <strong>
          {m.name} → {m.targetLabel}
        </strong>
        <p>
          Kaynak: {m.source}. Seçili hedef eşleşmesi:{" "}
          {m.matches ? "uygun" : "uygun değil"}. Normal doğrudan yanıt:{" "}
          {m.response ? "gösterildi" : "gösterilmedi"}.
        </p>
        <p>{m.evidence}</p>
      </Result>
      <Prediction
        id={id}
        context={[hormone, target, s.receptor, s.plates].join(":")}
        expected={m.response ? "yes" : "no"}
        options={[
          ["yes", "Verilen hedefte koşula uygun yanıt gösterilir"],
          [
            "no",
            "Verilen eşleştirme veya reseptör koşulunda normal yanıt gösterilmez",
          ],
        ]}
        explanation={m.evidence}
      />
    </>
  );
}
function ThyroidLab() {
  const id = "endokrin-tiroit";
  const [s, set] = useExploration("forge016-bioa-" + id, {
    condition: "intact",
    t4: 2,
    t3: 3,
  });
  const condition: ThyroidCondition = has(thyroidConditions, s.condition)
    ? s.condition
    : "intact";
  const m = thyroidAxis(
    condition,
    Math.round(bound(s.t4, 0, 6)),
    Math.round(bound(s.t3, 0, 6)),
  );
  const down = condition === "iodineLow" || condition === "primaryLow";
  return (
    <>
      <h3>Uyarı artışı her zaman ürün artışı mıdır?</h3>
      <p>
        Koşul kartlarında üst merkezler ve negatif geri dönüş sağlamdır; yalnız
        yazılan başlangıç nedeni değiştirilir. Oklar nitel yönleri gösterir,
        gerçek hormon miktarlarını hesaplamaz. İyot sayma sürgüleri ise eksenden
        bağımsız, verilen molekül örneğinin atom hesabıdır.
      </p>
      <div className="bio016a-controls">
        <Choice
          label="Eksen koşulu"
          value={condition}
          options={Object.entries(thyroidConditions)}
          onChange={(condition) => set({ condition })}
        />
        <Range
          label="Verilen T4 molekülü sayısı"
          value={m.t4}
          min={0}
          max={6}
          onChange={(t4) => set({ t4 })}
        />
        <Range
          label="Verilen T3 molekülü sayısı"
          value={m.t3}
          min={0}
          max={6}
          onChange={(t3) => set({ t3 })}
        />
      </div>
      <Drawing
        title="TRH, TSH, T3/T4 ileri uyarıları ve iki baskılayıcı geri dönüş"
        height={435}
      >
        {[35, 170, 305].map((y, i) => (
          <rect
            key={y}
            className="bio016a-organ"
            x={85}
            y={y}
            width={230}
            height={65}
            rx={15}
          />
        ))}
        <text x={200} y={77} textAnchor="middle">
          TRH
        </text>
        <text data-tsh-direction x={200} y={212} textAnchor="middle">
          TSH {condition === "intact" ? "" : down ? "↑" : "↓"}
        </text>
        <text data-product-direction x={200} y={347} textAnchor="middle">
          T3/T4 {condition === "intact" ? "" : down ? "↓" : "↑"}
        </text>
        <Arrow x1={200} y1={106} x2={200} y2={157} kind="forward-trh" />
        <text x={230} y={144}>
          +
        </text>
        <Arrow x1={200} y1={241} x2={200} y2={292} kind="forward-tsh" />
        <text x={230} y={279}>
          +
        </text>
        <path
          data-feedback="hypothalamus"
          className="bio016a-feedback-line"
          d="M85,338H25V67H75M75,53V81"
        />
        <path
          data-feedback="pituitary"
          className="bio016a-feedback-line"
          d="M85,353H53V202H75M75,188V216"
        />
        <text x={10} y={165}>
          −
        </text>
        <text x={37} y={285}>
          −
        </text>
        <text x={180} y={412} textAnchor="middle">
          Geri dönüş: baskı
        </text>
      </Drawing>
      <Result>
        <strong>{m.feedback}</strong>
        <p>
          T3/T4: {m.product}. TSH: {m.tsh}.
        </p>
        <p>{m.evidence}</p>
        <p data-iodine-result>
          Verilen moleküllerin iyot atomları: {m.t4}×4 + {m.t3}×3 ={" "}
          {m.iodineAtoms}. Bu sayı hormon derişimi veya iyot dozu değildir.
        </p>
      </Result>
      <Prediction
        id={id}
        context={[condition, m.t4, m.t3].join(":")}
        expected={condition === "intact" ? "base" : down ? "up" : "down"}
        options={[
          ["base", "Temel eksen örneği; yeni bir sapma verilmedi"],
          ["up", "Ürün azalırken TSH uyarısı artma yönünde olabilir"],
          ["down", "Ürün artarken TSH baskılanma yönünde olabilir"],
        ]}
        explanation={m.evidence}
      />
    </>
  );
}
function ParathyroidLab() {
  const id = "endokrin-paratiroit";
  const [s, set] = useExploration("forge016-bioa-" + id, {
    pth: true,
    activeD: true,
    bone: 3,
    gut: 2,
    loss: 4,
  });
  const m = calciumBalance(
    s.pth,
    s.activeD,
    bound(s.bone, 0, 5),
    bound(s.gut, 0, 5),
    bound(s.loss, 0, 8),
  );
  return (
    <>
      <h3>Bir hormona iki mineral için aynı oku verme</h3>
      <p>
        Üstteki yön şeması PTH yollarını açıklar. Alttaki miktar deneyi ayrı
        varsayımdır: başlangıçta 10 kalsiyum birimi bulunan havuza giriş ve
        çıkışları sen verirsin. Bu sayılar seçilen PTH’nin zorunlu oluşturduğu
        katsayılar, gerçek mg/dL veya klinik doz değildir.
      </p>
      <div className="bio016a-controls">
        <Check
          label="Artmış PTH etkisini izle"
          checked={s.pth}
          onChange={(pth) => set({ pth })}
        />
        <Check
          label="Böbrekte aktif D oluşum basamağı sağlam"
          checked={s.activeD}
          onChange={(activeD) => set({ activeD })}
        />
        <Range
          label="Verilen kemik girişi; kalsiyum birimi"
          value={m.bone}
          min={0}
          max={5}
          onChange={(bone) => set({ bone })}
        />
        <Range
          label="Verilen bağırsak girişi; kalsiyum birimi"
          value={m.gut}
          min={0}
          max={5}
          onChange={(gut) => set({ gut })}
        />
        <Range
          label="Verilen çıkış; kalsiyum birimi"
          value={m.loss}
          min={0}
          max={8}
          onChange={(loss) => set({ loss })}
        />
      </div>
      <Drawing
        title="PTH: kemik ve böbrek yolları, aktif D üzerinden dolaylı bağırsak katkısı"
        height={400}
      >
        <rect
          className="bio016a-organ"
          x={10}
          y={20}
          width={145}
          height={65}
          rx={15}
        />
        <text x={82} y={61} textAnchor="middle">
          Kemik
        </text>
        <rect
          className="bio016a-organ"
          x={205}
          y={20}
          width={145}
          height={95}
          rx={15}
        />
        <text x={277} y={59} textAnchor="middle">
          Böbrek
        </text>
        <text
          className="bio016a-small"
          data-mineral-directions
          x={277}
          y={94}
          textAnchor="middle"
        >
          Ca↑ P atımı↑
        </text>
        <rect
          className="bio016a-cell"
          x={105}
          y={170}
          width={150}
          height={65}
          rx={20}
        />
        <text x={180} y={211} textAnchor="middle">
          Kan Ca
        </text>
        <Arrow
          x1={85}
          y1={95}
          x2={145}
          y2={159}
          active={m.pth}
          kind="bone-calcium"
        />
        <Arrow
          x1={260}
          y1={125}
          x2={220}
          y2={159}
          active={m.pth}
          kind="renal-calcium"
        />
        <rect
          className="bio016a-organ"
          x={205}
          y={310}
          width={145}
          height={60}
          rx={14}
        />
        <text x={277} y={349} textAnchor="middle">
          Aktif D
        </text>
        <rect
          className="bio016a-organ"
          x={10}
          y={310}
          width={145}
          height={60}
          rx={14}
        />
        <text x={82} y={349} textAnchor="middle">
          Bağırsak
        </text>
        <Arrow
          x1={300}
          y1={125}
          x2={300}
          y2={298}
          active={m.indirectGut}
          kind="renal-activeD"
        />
        <Arrow
          x1={195}
          y1={340}
          x2={165}
          y2={340}
          active={m.indirectGut}
          kind="activeD-gut"
        />
        <Arrow
          x1={82}
          y1={300}
          x2={140}
          y2={247}
          active={m.indirectGut}
          kind="gut-calcium"
        />
      </Drawing>
      <Result>
        <strong>Kalsiyum havuzu: {n(m.final)} miktar birimi</strong>
        <p>
          10 + {n(m.bone)} + {n(m.gut)} − {n(m.loss)} = {n(m.final)}. Verilen
          giriş-çıkışlar, hormon yön düğmelerinden bağımsız deney miktarlarıdır.
        </p>
        <p>{m.evidence}</p>
        <p>
          Fosfat atımı ve Ca geri emilimi ayrı yönlerdir. Böbrek → aktif D →
          bağırsak yolu {m.indirectGut ? "gösteriliyor" : "tamamlanmıyor"}.
        </p>
      </Result>
      <Prediction
        id={id}
        context={[s.pth, s.activeD, m.bone, m.gut, m.loss].join(":")}
        expected={m.indirectGut ? "complete" : "incomplete"}
        options={[
          ["complete", "Seçili PTH–aktif D–bağırsak katkı yolu tamamlanır"],
          [
            "incomplete",
            "Seçili PTH–aktif D–bağırsak katkı yolu bu koşulda bitmez",
          ],
        ]}
        explanation={m.evidence}
      />
    </>
  );
}
function AdrenalLab() {
  const id = "endokrin-bobrek-ustu";
  const [s, set] = useExploration("forge016-bioa-" + id, {
    product: "cortisol",
    signal: "acth",
  });
  const product: AdrenalProduct = has(adrenalProducts, s.product)
      ? s.product
      : "cortisol",
    signal: AdrenalSignal = ["acth", "raas", "sympathetic"].includes(s.signal)
      ? (s.signal as AdrenalSignal)
      : "acth";
  const m = adrenalRoute(product, signal);
  return (
    <>
      <h3>Dış kabuk ve iç öz aynı girişle çalışmaz</h3>
      <p>
        Kesit, bezin yapısal konumlarını şematik gösterir; boyutları ölçekli
        değildir. Görev yalnız gösterilen başlıca kontrol hattını eşleştirir.
        Eşleşmeyen giriş, biyolojide bütün ikincil etkilerin mutlak yokluğu
        anlamına gelmez.
      </p>
      <div className="bio016a-controls">
        <Choice
          label="İzlenen adrenal ürün"
          value={product}
          options={Object.entries(adrenalProducts).map(([k, d]) => [k, d.name])}
          onChange={(product) => set({ product })}
        />
        <Choice
          label="Verilen temel kontrol girişi"
          value={signal}
          options={[
            ["acth", "CRH–ACTH ekseni"],
            ["raas", "RAAS / kan potasyumu"],
            ["sympathetic", "Sempatik sinirsel giriş"],
          ]}
          onChange={(signal) => set({ signal })}
        />
      </div>
      <Drawing
        title={`${m.name}: ${m.region} ve temel kontrol girişi`}
        height={405}
      >
        <text x={180} y={41} textAnchor="middle">
          Korteks
        </text>
        <ellipse
          data-region="cortex"
          className={
            m.region === "Korteks" ? "bio016a-selected" : "bio016a-cell"
          }
          cx={180}
          cy={185}
          rx={115}
          ry={130}
        />
        <ellipse
          data-region="medulla"
          className={
            m.region === "Medulla" ? "bio016a-selected" : "bio016a-organ"
          }
          cx={180}
          cy={185}
          rx={73}
          ry={79}
        />
        <text x={180} y={193} textAnchor="middle">
          Medulla
        </text>
        <Arrow
          x1={180}
          y1={358}
          x2={180}
          y2={m.region === "Medulla" ? 273 : 326}
          active={m.matched}
          kind="adrenal-control"
        />
        <text x={180} y={397} textAnchor="middle">
          {signal === "acth"
            ? "ACTH"
            : signal === "raas"
              ? "RAAS / K⁺"
              : "Sempatik"}
        </text>
      </Drawing>
      <Result>
        <strong>
          {m.name}: {m.region}
        </strong>
        <p>
          Başlıca kontrol: {m.control}. Seçilen giriş:{" "}
          {m.matched ? "eşleşiyor" : "eşleşmiyor"}.
        </p>
        <p>{m.evidence}</p>
        {m.feedback && (
          <p>
            Kortizol, hipotalamus ve ön hipofize negatif geri etkiyle kendi
            üretim uyarısını sınırlar.
          </p>
        )}
      </Result>
      <Prediction
        id={id}
        context={product + ":" + signal}
        expected={m.matched ? "matched" : "unmatched"}
        options={[
          ["matched", "Gösterilen başlıca kontrol ve doku yolu eşleşiyor"],
          ["unmatched", "Gösterilen başlıca kontrol yolu bu ürünle eşleşmiyor"],
        ]}
        explanation={m.evidence}
      />
    </>
  );
}
function PancreasLab() {
  const id = "endokrin-pankreas";
  const [s, set] = useExploration("forge016-bioa-" + id, {
    hormone: "glucagon",
    reserve: 50,
    requested: 5,
    responsive: true,
    tissue: "liver",
  });
  const hormone = s.hormone === "insulin" ? "insulin" : "glucagon",
    tissue: PancreaticTissue = has(tissueLabels, s.tissue) ? s.tissue : "liver";
  const m = pancreasTransfer(
    hormone,
    bound(s.reserve, 0, 50),
    bound(s.requested, 0, 10),
    s.responsive,
    tissue,
  );
  return (
    <>
      <h3>Glikozu yok etme; hangi havuza geçtiğini izle</h3>
      <p>
        Tek aktarım modelinde başlangıç kan havuzu 20, karaciğer deposu sürgüde
        verilen miktardır. Birimler glikoz eşdeğeri miktardır; gerçek kan
        derişimi veya hormon dozu değildir. Başka emilim, tüketim veya
        glukoneogenez yolu dahil edilmedi. Doku kartı yalnız taşıma
        mekanizmasını karşılaştırır, sayısal karaciğer havuzunu değiştirmez.
      </p>
      <div className="bio016a-controls">
        <Choice
          label="Aktarım yönüyle ilişkili hormon"
          value={hormone}
          options={[
            ["insulin", "İnsülin; kandan depoya yön"],
            ["glucagon", "Glukagon; depodan kana yön"],
          ]}
          onChange={(hormone) => set({ hormone })}
        />
        <Range
          label="Başlangıç karaciğer deposu; glikoz eşdeğeri"
          value={m.reserve}
          min={0}
          max={50}
          onChange={(reserve) => set({ reserve })}
        />
        <Range
          label="İstenen aktarım; glikoz eşdeğeri"
          value={m.requested}
          min={0}
          max={10}
          onChange={(requested) => set({ requested })}
        />
        <Check
          label="Verilen karaciğer aktarım yanıtı sağlam"
          checked={s.responsive}
          onChange={(responsive) => set({ responsive })}
        />
        <Choice
          label="Ayrı karşılaştırma: glikoz giriş dokusu"
          value={tissue}
          options={Object.entries(tissueLabels)}
          onChange={(tissue) => set({ tissue })}
        />
      </div>
      <Drawing
        title={`Glikoz eşdeğeri havuzları: kan ${m.blood}, karaciğer deposu ${m.liver}; toplam ${m.total}`}
        height={385}
      >
        <text x={111} y={38} textAnchor="middle">
          Kan
        </text>
        <text x={272} y={38} textAnchor="middle">
          Depo
        </text>
        {[0, 20, 40, 60].map((v) => (
          <g key={v}>
            <path className="bio016a-gridline" d={`M51,${280 - 3 * v}H336`} />
            <text className="bio016a-small" x={3} y={288 - 3 * v}>
              {v}
            </text>
          </g>
        ))}
        <rect
          data-pool="blood"
          data-value={m.blood}
          className="bio016a-bar"
          x={67}
          y={280 - 3 * m.blood}
          width={88}
          height={3 * m.blood}
        />
        <rect
          data-pool="liver"
          data-value={m.liver}
          className="bio016a-bar"
          x={227}
          y={280 - 3 * m.liver}
          width={88}
          height={3 * m.liver}
        />
        <text x={111} y={270 - 3 * m.blood} textAnchor="middle">
          {n(m.blood)}
        </text>
        <text x={271} y={270 - 3 * m.liver} textAnchor="middle">
          {n(m.liver)}
        </text>
        <Arrow
          x1={hormone === "insulin" ? 96 : 270}
          y1={328}
          x2={hormone === "insulin" ? 270 : 96}
          y2={328}
          active={m.actual > 0}
          kind="glucose-transfer"
        />
        <text x={180} y={373} textAnchor="middle">
          {n(m.actual)} birim aktarım
        </text>
      </Drawing>
      <Result>
        <strong>
          Kan {n(m.blood)}; depo {n(m.liver)}; toplam {n(m.total)}
        </strong>
        <p>
          {m.direction}: istenen {n(m.requested)}, gerçekleşen {n(m.actual)}{" "}
          birim.
        </p>
        <p>{m.evidence}</p>
        <p>{m.tissueEvidence}</p>
      </Result>
      <Prediction
        id={id}
        context={[hormone, m.reserve, m.requested, s.responsive, tissue].join(
          ":",
        )}
        expected={
          m.actual === 0 ? "zero" : hormone === "insulin" ? "store" : "release"
        }
        options={[
          ["zero", "Verilen deneyde gerçekleşen aktarım sıfırdır"],
          ["store", "Kan azalır, depo aynı miktarda artar"],
          ["release", "Kan artar, depo aynı miktarda azalır"],
        ]}
        explanation={m.evidence}
      />
    </>
  );
}
function PinealLab() {
  const id = "endokrin-epifiz";
  const [s, set] = useExploration("forge016-bioa-" + id, {
    start: 22,
    end: 6,
    shift: 0,
    hour: 23,
    nightLight: false,
  });
  const m = pinealWindow(
    Math.round(bound(s.start, 0, 23)),
    Math.round(bound(s.end, 0, 23)),
    Math.round(bound(s.shift, -6, 6)),
    Math.round(bound(s.hour, 0, 23)),
    s.nightLight,
  );
  const point = (h: number, r = 108) => {
    const a = ((h * 15 - 90) * Math.PI) / 180;
    return [180 + r * Math.cos(a), 168 + r * Math.sin(a)];
  };
  const [a, b] = [point(m.from), point(m.from + m.duration)],
    hand = point(m.hour, 77);
  const arc = `M${a[0]},${a[1]}A108,108 0 ${m.duration > 12 ? 1 : 0},1 ${b[0]},${b[1]}`;
  return (
    <>
      <h3>Geceyi uzatmak ile saati kaydırmak farklıdır</h3>
      <p>
        Saat çizimi 24 saatlik tanımlı pencereyi gösterir; üst 0 gece yarısı,
        sağ 6, alt 12, sol 18’dir. Koyu işaretli yayın uzunluğu karanlık
        süresidir; kol seçilen saati gösterir. Gerçek melatonin derişimi veya iç
        saatin anlık uyumu simüle edilmez. İki uç eşitse bu modelde pencere
        süresi 0’dır; tam 24 saat değildir.
      </p>
      <div className="bio016a-controls">
        <Range
          label="Karanlık başlangıcı; saat"
          value={Math.round(bound(s.start, 0, 23))}
          min={0}
          max={23}
          onChange={(start) => set({ start })}
        />
        <Range
          label="Karanlık bitişi; saat"
          value={Math.round(bound(s.end, 0, 23))}
          min={0}
          max={23}
          onChange={(end) => set({ end })}
        />
        <Range
          label="İki ucu birlikte kaydır; saat"
          value={Math.round(bound(s.shift, -6, 6))}
          min={-6}
          max={6}
          onChange={(shift) => set({ shift })}
        />
        <Range
          label="İncelenen an; saat"
          value={m.hour}
          min={0}
          max={23}
          onChange={(hour) => set({ hour })}
        />
        <Check
          label="Pencere içinde gece ışığı baskısı koşulunu göster"
          checked={s.nightLight}
          onChange={(nightLight) => set({ nightLight })}
        />
      </div>
      <Drawing
        title={`24 saatlik saat: karanlık ${m.from}–${m.to}, süre ${m.duration} saat; seçili saat ${m.hour}`}
        height={340}
      >
        <circle className="bio016a-cell" cx={180} cy={168} r={108} />
        {m.duration > 0 && (
          <path
            data-dark-arc
            data-duration={m.duration}
            className="bio016a-night"
            d={arc}
          />
        )}
        <text x={180} y={34} textAnchor="middle">
          0
        </text>
        <text x={323} y={177} textAnchor="middle">
          6
        </text>
        <text x={180} y={320} textAnchor="middle">
          12
        </text>
        <text x={28} y={177} textAnchor="middle">
          18
        </text>
        <Arrow x1={180} y1={168} x2={hand[0]} y2={hand[1]} kind="hour-hand" />
        <circle className="bio016a-dot" cx={180} cy={168} r={7} />
      </Drawing>
      <Result>
        <strong>
          Karanlık {m.from.toString().padStart(2, "0")}.00–
          {m.to.toString().padStart(2, "0")}.00; {m.duration} saat
        </strong>
        <p>
          İncelenen saat {m.hour}.00:{" "}
          {m.inside ? "pencere içinde" : "pencere dışında"}. {m.evidence.replace("penceresinde", "süre içinde")}
        </p>
        <p>
          Yalnız ayrı kurgusal sabit 2 birim/saat varsayımında: {m.duration}×2 ={" "}
          {m.toyArea} sinyal birimi. Bu gerçek melatonin miktarı değildir; gece
          ışığı düğmesinden gerçek nicel baskı hesaplanmaz.
        </p>
      </Result>
      <Prediction
        id={id}
        context={[m.from, m.to, m.hour, s.nightLight].join(":")}
        expected={!m.inside ? "outside" : s.nightLight ? "light" : "dark"}
        options={[
          ["outside", "Seçilen saat karanlık süre dışında"],
          ["light", "Saat pencere içinde; ışık baskısı koşulu açık"],
          ["dark", "Saat karanlık süre içinde; ışık baskısı koşulu kapalı"],
        ]}
        explanation={m.evidence.replace("penceresinde", "süre içinde")}
      />
    </>
  );
}
export default function Forge016BiologyALab({
  lessonId,
}: {
  lessonId: string;
}) {
  const labs: Record<string, () => ReactNode> = {
    "endokrin-hipotalamus": HypothalamusLab,
    "endokrin-hipofiz": PituitaryLab,
    "endokrin-tiroit": ThyroidLab,
    "endokrin-paratiroit": ParathyroidLab,
    "endokrin-bobrek-ustu": AdrenalLab,
    "endokrin-pankreas": PancreasLab,
    "endokrin-epifiz": PinealLab,
  };
  const Lab = labs[lessonId];
  return Lab ? (
    <section className="bio016a" data-forge016={lessonId}>
      <Lab />
    </section>
  ) : null;
}
