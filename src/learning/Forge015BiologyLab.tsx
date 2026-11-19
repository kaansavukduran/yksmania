import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  variationEvents,
  variationSnapshot,
  gliaSnapshot,
  potentialPoints,
  potentialSnapshot,
  secondImpulse,
  forebrainSnapshot,
  hindbrainSnapshot,
  spinalSnapshot,
  peripheralSnapshot,
  evidenceLabels,
  type VariationEvent,
  type CellLine,
  type GliaTask,
  type ForebrainTask,
  type HindTask,
  type ReflexCut,
  type PeripheralTarget,
  type DiseaseEvidence,
} from "./forge015Biology";
import "./forge015Biology.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const n = (value: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(value);
const bounded = (value: number, min: number, max: number) =>
  Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : min;
function Drawing({
  title,
  children,
  height = 320,
}: {
  title: string;
  children: ReactNode;
  height?: number;
}) {
  const uid = useId();
  return (
    <svg
      className="bio015-drawing"
      role="img"
      aria-labelledby={uid}
      viewBox={`0 0 360 ${height}`}
    >
      <title id={uid}>{title}</title>
      {children}
    </svg>
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
    <div className="bio015-field">
      <label htmlFor={uid}>{label}</label>
      <ChoiceSelect id={uid} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </ChoiceSelect>
      <output htmlFor={uid} className="bio015-current-choice">
        Seçili: {options.find(([key]) => key === value)?.[1]}
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
  onChange: (s: number) => void;
}) {
  const uid = useId();
  return (
    <div className="bio015-field">
      <label htmlFor={uid}>{label}</label>
      <input
        id={uid}
        type="range"
        min={min}
        max={max}
        step={step}
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
    <label className="bio015-check">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
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
  const [s, set] = useExploration(`forge015-bio-prediction-${id}`, {
    answer: "",
    reason: "",
    checked: false,
    context: "",
  });
  const selected = options.find(([key]) => key === s.answer);
  return (
    <div className="bio015-prediction">
      <label htmlFor={uid + "-answer"}>Sonuç tahminin</label>
      <ChoiceSelect
        id={uid + "-answer"}
        value={selected ? s.answer : ""}
        onChange={(e) => set({ answer: e.target.value, checked: false })}
      >
        <option value="">Bir sonuç seç</option>
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
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
        onClick={() => set({ checked: true, context })}
      >
        Tahminimi karşılaştır
      </button>
      {s.checked && s.context === context && selected && (
        <div className="bio015-feedback" role="status">
          <strong>
            {s.answer === expected
              ? "Seçimin bu modeldeki kanıtla uyumlu."
              : "Seçimini kanıtla yeniden karşılaştır."}
          </strong>
          <p>{explanation}</p>
          <p>
            Gerekçen otomatik puanlanmaz. Bu keşif doğru soru, XP veya konu
            tamamlama kaydı oluşturmaz.
          </p>
        </div>
      )}
    </div>
  );
}
function Arrow({
  x1,
  y1,
  x2,
  y2,
  active = true,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
}) {
  const uid = useId();
  return (
    <g className={active ? "bio015-path" : "bio015-inactive"}>
      <defs>
        <marker
          id={uid}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      <path d={`M${x1},${y1} L${x2},${y2}`} markerEnd={`url(#${uid})`} />
    </g>
  );
}
const eventOptions: [string, string][] = [
  ["crossing", "Krossing over: mevcut alellerin yeni birlikteliği"],
  ["assortment", "Bağımsız dağılım: kromozom birliktelikleri"],
  ["fertilization", "Döllenme: seçili iki gametin birleşmesi"],
  ["mutation", "Dizisi ölçülmüş mutasyon"],
  ["transfer", "Bakteriye mevcut bir plazmitin aktarılması"],
  ["environment", "Aynı DNA, farklı çevrede farklı görünüm"],
];
function Variation() {
  const [s, set] = useExploration("forge015-bio-genetik-cesitlilik", {
    event: "crossing",
    line: "skin",
    selectedGamete: false,
  });
  const event = variationEvents.includes(s.event as VariationEvent)
      ? (s.event as VariationEvent)
      : "crossing",
    line: CellLine = s.line === "germline" ? "germline" : "skin";
  const m = variationSnapshot(event, line, s.selectedGamete),
    expected = m.newVariant
      ? "variant"
      : m.reshuffled
        ? "combination"
        : m.transferred
          ? "transfer"
          : "environment";
  return (
    <>
      <h3>Değişim hangi düzeyde?</h3>
      <p>
        Olay kartı bir kanıt verir. Yeni alel oluşumu, mevcut alellerin yeniden
        birleşmesi, aktarım ve çevresel etkiyi ayrı tut. Şema yalnız seçili
        örneği gösterir; bir popülasyonun bütün genetik çeşitliliğini saymaz.
        Çerçeveler önce ve sonra verilerinin karşılaştırma alanıdır; hücre
        zarlarını veya bütün gametleri temsil etmez.
      </p>
      <div className="bio015-controls">
        <Choice
          label="Genetik olay kartı"
          value={event}
          options={eventOptions}
          onChange={(v) => set({ event: v })}
        />
        {event === "mutation" && (
          <>
            <Choice
              label="Değişimin izlendiği hücre soyu"
              value={line}
              options={[
                ["skin", "Yalnız deri hücresi; verilen insan örneği"],
                ["germline", "Gamet soyunda oluşmuş ve gamette ölçülmüş"],
              ]}
              onChange={(v) => set({ line: v })}
            />
            <Check
              label="Varyantı taşıyan gamet bu seçili döllenmede kullanılıyor"
              checked={s.selectedGamete}
              onChange={(v) => set({ selectedGamete: v })}
            />
          </>
        )}
      </div>
      <Drawing
        title="Seçili olayın önce ve sonra DNA veya alel birlikteliği"
        height={330}
      >
        <text x="16" y="34">
          Önce
        </text>
        <text x="16" y="199">
          Sonra
        </text>
        <rect
          x="16"
          y="48"
          width="328"
          height="75"
          rx="8"
          className="bio015-cell"
        />
        {m.before.map((v, i) => (
          <text
            key={i}
            x={m.before.length === 1 ? 180 : 96 + i * 168}
            y="96"
            textAnchor="middle"
            data-before-dna
          >
            {v}
          </text>
        ))}
        <Arrow x1={180} y1={133} x2={180} y2={166} />
        <rect
          x="16"
          y="215"
          width="328"
          height="86"
          rx="8"
          className="bio015-cell"
          data-new-variant={String(m.newVariant)}
          data-selected-zygote={String(m.selectedZygoteHasVariant)}
        />
        {m.after.map((v, i) => (
          <text
            key={i}
            x={m.after.length === 1 ? 180 : 96 + i * 168}
            y="268"
            textAnchor="middle"
            data-after-dna
          >
            {v}
          </text>
        ))}
      </Drawing>
      <div className="bio015-result" data-model-result>
        <strong>
          {m.newVariant
            ? "Ölçülen dizide yeni varyant var."
            : m.reshuffled
              ? "Yeni birliktelik var; bu kanıt yeni alel demek değildir."
              : m.transferred
                ? "Mevcut DNA alıcıya aktarıldı."
                : "Görünüm değişimi tek başına genetik değişim kanıtı değildir."}
        </strong>
        <p>{m.inheritance}</p>
        {event === "environment" && (
          <p>
            Kartta DNA dizisi iki durumda da ATGC. Çevre görünümü etkiliyor; bu
            gözlemden mutasyon veya çocuğa aktarım çıkarılmaz.
          </p>
        )}
        {event === "transfer" && (
          <p>
            Plazmit vericide zaten vardır; aktarım alıcının genetik içeriğini
            değiştirebilir. Yeni alelin sıfırdan oluştuğu ayrıca
            gösterilmemiştir.
          </p>
        )}
        {m.reshuffled && (
          <p>
            Şemadaki harfler mevcut alellerdir. Örnek birliktelik bütün
            gametlerin dağılımı veya garantili çocuk sayısı değildir.
          </p>
        )}
      </div>
      <Prediction
        id="genetik-cesitlilik"
        context={JSON.stringify([event, line, s.selectedGamete])}
        expected={expected}
        options={[
          ["variant", "Kart ölçülmüş bir dizi değişimi gösteriyor"],
          [
            "combination",
            "Kart mevcut alellerin yeni birlikteliğini gösteriyor",
          ],
          ["transfer", "Kart mevcut DNA’nın alıcıya aktarımını gösteriyor"],
          ["environment", "Kart tek başına genetik değişimi kanıtlamıyor"],
        ]}
        explanation={`${m.newVariant ? "ATGC → ATAC doğrudan ölçülmüş dizi farkıdır." : m.reshuffled ? "Mevcut A/a/B/b alelleri yeni bir birlikteliktedir." : m.transferred ? "Aktarılan plazmit vericide zaten vardır." : "DNA aynı tutulduğu için görünümden mutasyon sonucu çıkarılmaz."} ${m.inheritance}`}
      />
    </>
  );
}
function Neuron() {
  const [s, set] = useExploration(
    "forge015-bio-sinir-sistemi-noron-ve-glialar",
    { region: "central", task: "myelin", myelin: true, part: "axon" },
  );
  const region = s.region === "peripheral" ? "peripheral" : "central",
    task: GliaTask = ["myelin", "defence", "support", "fluid"].includes(s.task)
      ? (s.task as GliaTask)
      : "myelin";
  const parts: [string, string][] = [
    ["dendrite", "Dendrit"],
    ["soma", "Hücre gövdesi"],
    ["axon", "Akson"],
    ["node", "Ranvier boğumu"],
    ["terminal", "Kimyasal sinaps ucu"],
  ];
  const part = parts.some(([v]) => v === s.part) ? s.part : "axon",
    m = gliaSnapshot(region, task, s.myelin);
  const descriptions: Record<string, string> = {
    dendrite:
      "Dendritler tipik şemada girdilerin alınmasına katılır. Bütün nöronların geometrisi aynı değildir.",
    soma: "Hücre gövdesinde çekirdek ve protein senteziyle ilişkili yapılar vardır. Akson içinde granüllü ER/Nissl cisimcikleri gösterilmez.",
    axon: "Akson sinyali hedef bağlantılara taşır. Tipik tek nöron şeması bütün nöron türlerinin dallanma ayrıntılarını tüketmez.",
    node: s.myelin
      ? "Ranvier boğumu, komşu miyelin aralıkları arasındaki açık zar bölgesidir. Aksiyon potansiyeli uygun boğumlarda yeniden oluşur."
      : "Miyelin kaldırılmış kesitte ayrı miyelin-boğum düzeni çizilmez; akson zarı kalır.",
    terminal:
      "Kimyasal sinaps ucuna gelen aksiyon potansiyeli Ca²⁺ girişini ve vezikül salımını tetikleyebilir. Hedefteki etki her zaman yeni aksiyon potansiyeli değildir.",
  };
  return (
    <>
      <h3>Nöronun parçasını ve destek hücresini ayır</h3>
      <p>
        Parça düğmeleri şemada seçili bölgeyi vurgular. Miyelini kaldırarak
        yalıtım ile akson zarının ayrı yapılar olduğunu izle. Renkli çizgiler
        fiziksel bir maddenin boğumlar arasında zıplaması anlamına gelmez.
      </p>
      <div className="bio015-part-buttons">
        {parts.map(([key, label]) => (
          <button
            className="secondary"
            aria-pressed={part === key}
            key={key}
            onClick={() => set({ part: key })}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="bio015-controls">
        <Choice
          label="Sinir dokusunun bölgesi"
          value={region}
          options={[
            ["central", "Merkezî sinir sistemi"],
            ["peripheral", "Çevresel sinir sistemi"],
          ]}
          onChange={(v) => set({ region: v })}
        />
        <Choice
          label="Glianın verilen görevi"
          value={task}
          options={[
            ["myelin", "Miyelin oluşturma"],
            ["defence", "Hücresel artıkların fagositozu"],
            ["support", "Merkezî çevrenin metabolik ve yapısal desteği"],
            ["fluid", "BOS boşluklarını döşeyen hücreler"],
          ]}
          onChange={(v) => set({ task: v })}
        />
        <Check
          label="Aksonda miyelin aralıklarını göster"
          checked={s.myelin}
          onChange={(v) => set({ myelin: v })}
        />
      </div>
      <Drawing
        title="Nöron: dendrit, gövde, akson, miyelin aralıkları ve boğumlar"
        height={365}
      >
        <path
          d="M70 106L30 60M70 106L28 123M70 106L35 172"
          className={
            part === "dendrite" ? "bio015-selected-line" : "bio015-line"
          }
        />
        <ellipse
          cx="94"
          cy="116"
          rx="35"
          ry="42"
          className={part === "soma" ? "bio015-selected-cell" : "bio015-cell"}
        />
        <circle cx="94" cy="116" r="13" className="bio015-outline" />
        <path
          d="M130 116H318L337 92M318 116L337 141"
          className={
            part === "axon" || part === "terminal"
              ? "bio015-selected-line"
              : "bio015-line"
          }
        />
        {s.myelin &&
          [135, 185, 235, 285].map((x, i) => (
            <rect
              key={x}
              x={x}
              y="96"
              width="30"
              height="40"
              rx="12"
              className="bio015-myelin"
              data-myelin-segment={i + 1}
            />
          ))}
        {s.myelin &&
          [175, 225, 275].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy="116"
              r={part === "node" ? 7 : 4}
              className={
                part === "node" ? "bio015-node-selected" : "bio015-node"
              }
              data-ranvier-node={i + 1}
            />
          ))}
        <text x="12" y="36">
          Dendrit
        </text>
        <text x="38" y="228">
          Gövde
        </text>
        <text x="190" y="36">
          Akson
        </text>
        <text x="160" y="78">
          {s.myelin ? "Miyelin" : "Çıplak zar"}
        </text>
        {s.myelin && (
          <>
            <path
              d="M225 125V269H160"
              className="bio015-line"
              data-node-leader
            />
            <text x="16" y="303">
              Boğum
            </text>
          </>
        )}
        <g data-axon-direction>
          <Arrow x1={150} y1={290} x2={314} y2={290} />
        </g>
        <text x="175" y="347" data-axon-direction-label>
          Uca doğru
        </text>
      </Drawing>
      <div className="bio015-result" data-model-result>
        <strong>{parts.find(([v]) => v === part)?.[1]}</strong>
        <p>{descriptions[part]}</p>
        <p>
          Görev kartının sonucu: <strong>{m.glia}</strong>.
        </p>
        <p>{m.mode}</p>
        <p>
          Gösterilen miyelin segmenti: {s.myelin ? 4 : 0}; gösterilen açık
          boğum: {m.nodes}. Bu sayılar örnek çizime aittir; bütün nöronların
          sayısı veya hızı değildir.
        </p>
      </div>
      <Prediction
        id="sinir-sistemi-noron-ve-glialar"
        context={JSON.stringify([region, task, s.myelin])}
        expected={
          task === "myelin"
            ? region === "central"
              ? "oligo"
              : "schwann"
            : "scope"
        }
        options={[
          ["oligo", "Bu miyelin kartında oligodendrosit"],
          ["schwann", "Bu miyelin kartında Schwann hücresi"],
          [
            "scope",
            "Miyelin dışındaki görev veya kartın kanıt sınırı ayrıca değerlendirilmeli",
          ],
        ]}
        explanation={`Seçili bölge ve görev birlikte okunur: ${m.glia}. Merkezî miyelin oligodendrositle, çevresel miyelin Schwann hücresiyle ilişkilidir. Bütün gliayı tek göreve veya evrensel bir hücre sayısı oranına indirgemeyiz.`}
      />
    </>
  );
}
function Potential() {
  const [s, set] = useExploration(
    "forge015-bio-sinir-sistemi-aksiyon-potansiyeli",
    { time: 0, secondVoltage: -60, recovery: "ready" },
  );
  const { state } = useApp();
  const [systemReduced, setSystemReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setSystemReduced(q.matches);
    q.addEventListener("change", onChange);
    return () => q.removeEventListener("change", onChange);
  }, []);
  const motion = state.settings.motion && !systemReduced,
    [playing, setPlaying] = useState(false),
    [frame, setFrame] = useState(0);
  const frameRef = useRef(0),
    commit = useRef(set);
  commit.current = set;
  useEffect(() => {
    if (!playing) return;
    if (!motion) {
      commit.current({ time: Math.round(frameRef.current * 10) / 10 });
      setPlaying(false);
      return;
    }
    let request = 0;
    const start = performance.now() - frameRef.current * 1500;
    const tick = (now: number) => {
      const t = Math.min(4, (now - start) / 1500);
      frameRef.current = t;
      setFrame(t);
      if (t >= 4) {
        commit.current({ time: 4 });
        setPlaying(false);
      } else request = requestAnimationFrame(tick);
    };
    request = requestAnimationFrame(tick);
    const stopHidden = () => {
      if (document.hidden) {
        commit.current({ time: Math.round(frameRef.current * 10) / 10 });
        setPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", stopHidden);
    return () => {
      cancelAnimationFrame(request);
      document.removeEventListener("visibilitychange", stopHidden);
    };
  }, [playing, motion]);
  const time = playing ? frame : bounded(s.time, 0, 4),
    m = potentialSnapshot(time),
    recovery = s.recovery === "absolute" ? "absolute" : "ready",
    voltage = bounded(s.secondVoltage, -80, -40),
    response = secondImpulse(voltage, recovery);
  const px = (t: number) => 65 + t * 66,
    py = (v: number) => 48 + (40 - v) * 1.7;
  const start = () => {
    frameRef.current = 0;
    setFrame(0);
    setPlaying(true);
  };
  const stop = () => {
    set({ time: Math.round(frameRef.current * 10) / 10 });
    setPlaying(false);
  };
  return (
    <>
      <h3>Potansiyeli bir zaman kesitinde incele</h3>
      <p>
        Bu ölçülmüş evrensel bir eğri değil, verilen sayılarla kurulmuş örnek
        aksiyon potansiyelidir. Zamanı kendin seçebilir veya isteğe bağlı akışı
        bir kez oynatabilirsin. İyon gradyanlarını koruyan pompa, depolarizasyon
        ve repolarizasyonun hızlı kanal geçişleriyle aynı mekanizma değildir.
      </p>
      <div className="bio015-controls">
        <Range
          label="İlk örneğin zamanı (ms)"
          min={0}
          max={4}
          step={0.1}
          value={time}
          onChange={(v) => {
            setPlaying(false);
            set({ time: v });
          }}
        />
        <div className="bio015-actions">
          <button
            className="secondary"
            disabled={!motion || playing}
            onClick={start}
          >
            Akışı bir kez oynat
          </button>
          <button className="secondary" disabled={!playing} onClick={stop}>
            Akışı durdur
          </button>
        </div>
      </div>
      {!motion && (
        <p>
          Hareket azaltma tercihi etkin. Zaman sürgüsüyle bütün evrelere
          erişebilirsin.
        </p>
      )}
      <Drawing
        title="Zar potansiyeli zaman grafiği; hücre içi eksi dışı; örnek eşik eksi 55 milivolt"
        height={490}
      >
        <text x="10" y="30">
          mV
        </text>
        <path d="M65 48V276H337" className="bio015-line" />
        <text x="6" y={py(30) + 10}>
          +30
        </text>
        <text x="6" y={py(-70) + 10}>
          −70
        </text>
        <path d={`M65 ${py(-55)}H330`} className="bio015-threshold" />
        <text x="154" y="30">
          −55 eşik
        </text>
        <path
          d={potentialPoints
            .map(([t, v], i) => `${i ? "L" : "M"}${px(t)},${py(v)}`)
            .join(" ")}
          className="bio015-selected-line"
        />
        <circle
          cx={px(time)}
          cy={py(m.voltage)}
          r="8"
          className="bio015-node-selected"
          data-potential-marker
          data-time={n(time)}
          data-voltage={n(m.voltage)}
        />
        {[0, 2, 4].map((t) => (
          <text key={t} x={px(t)} y="310" textAnchor="middle">
            {t}
          </text>
        ))}
        <text x="278" y="350">
          ms
        </text>
        <text x="13" y="350">
          İç − dış
        </text>
        <text x="28" y="390">
          Dış
        </text>
        <text x="260" y="390">
          İç
        </text>
        <rect x="168" y="400" width="18" height="40" className="bio015-cell" />
        {m.sodiumIn && (
          <g data-fast-ion="sodium-in">
            <Arrow x1={90} y1={420} x2={262} y2={420} />
          </g>
        )}
        {m.potassiumOut && (
          <g data-fast-ion="potassium-out">
            <Arrow x1={262} y1={420} x2={90} y2={420} />
          </g>
        )}
        <text x="180" y="474" textAnchor="middle">
          {m.sodiumIn
            ? "Na⁺ içeri"
            : m.potassiumOut
              ? "K⁺ dışarı"
              : "Faz oku yok"}
        </text>
      </Drawing>
      <div
        className="bio015-result"
        data-model-result
        aria-live={playing ? "off" : "polite"}
      >
        <strong>{m.phase}</strong>
        <p>
          Zaman: {n(time)} ms. Zar potansiyeli: {n(m.voltage)} mV.
        </p>
        <p>Baskın açıklama: {m.ion}. Örnek eşik −55 mV; dinlenme −70 mV.</p>
        <p>
          Na⁺/K⁺ pompası ATP kullanarak gradyanların sürdürülmesine katkı verir.
          Her hızlı yükselişi veya düşüşü anlık olarak tek başına yapan pompa
          değildir.
        </p>
        <h4>Ayrı düşünce deneyi: ikinci uyarı</h4>
        <p>
          Bu ikinci kontrol üstteki örnek eğriyi yeniden çizmez; hazır olma ve
          eşik koşulunu karşılaştırır.
        </p>
        <div className="bio015-controls">
          <Range
            label="İkinci uyarının ulaştırdığı potansiyel (mV)"
            min={-80}
            max={-40}
            value={voltage}
            onChange={(v) => set({ secondVoltage: v })}
          />
          <Choice
            label="İkinci uyarıda zarın durumu"
            value={recovery}
            options={[
              ["ready", "Zar hazır; mutlak refrakter dönem bitmiş"],
              ["absolute", "Mutlak refrakter dönem"],
            ]}
            onChange={(v) => set({ recovery: v })}
          />
        </div>
        <strong data-second-response>
          {response.fires
            ? "İkinci aksiyon potansiyeli başlayabilir."
            : "Bu koşulda ikinci aksiyon potansiyeli başlamaz."}
        </strong>
        <p>{response.reason}</p>
      </div>
      <Prediction
        id="sinir-sistemi-aksiyon-potansiyeli"
        context={JSON.stringify([voltage, recovery])}
        expected={response.fires ? "yes" : "no"}
        options={[
          ["yes", "Verilen ikinci uyarı koşulunda başlayabilir"],
          ["no", "Verilen ikinci uyarı koşulunda başlamaz"],
        ]}
        explanation={response.reason}
      />
    </>
  );
}
const brainParts: [string, string][] = [
  ["occipital", "Oksipital lob"],
  ["parietal", "Pariyetal lob"],
  ["hypothalamus", "Hipotalamus"],
  ["pineal", "Epifiz"],
];
function Forebrain() {
  const [s, set] = useExploration("forge015-bio-sinir-sistemi-on-beyin", {
    task: "vision",
    temperature: 37,
    selected: "occipital",
  });
  const task: ForebrainTask = [
      "vision",
      "touch",
      "temperature",
      "rhythm",
    ].includes(s.task)
      ? (s.task as ForebrainTask)
      : "vision",
    temperature = bounded(s.temperature, 36, 38),
    m = forebrainSnapshot(task, temperature),
    selected = brainParts.some(([v]) => v === s.selected)
      ? s.selected
      : "occipital";
  return (
    <>
      <h3>Bilginin görevini bölgeyle ilişkilendir</h3>
      <p>
        Şema yandan görünümün basitleştirilmiş bir kesitidir; sol tarafta ön,
        sağ tarafta arka yön var. Renkli sınırlar anatomik atlas ölçüsü
        değildir. Hipotalamus ve epifiz gibi derin yapılar kesitte temsil
        ediliyor. Bir görevin vurgulanması diğer ağları gereksiz yapmaz.
      </p>
      <div className="bio015-controls">
        <Choice
          label="Ön beyinde görev kartı"
          value={task}
          options={[
            ["vision", "Retinadan gelen bilginin görsel işlenmesi"],
            ["touch", "Dokunma bilgisinin kortikal işlenmesi"],
            ["temperature", "37 °C hedefli basit ısı düzenleme modeli"],
            ["rhythm", "Işık-karanlık ve melatonin ritmi"],
          ]}
          onChange={(v) => set({ task: v })}
        />
        {task === "temperature" && (
          <Range
            label="Modelde ölçülen sıcaklık (°C)"
            min={36}
            max={38}
            step={0.5}
            value={temperature}
            onChange={(v) => set({ temperature: v })}
          />
        )}
      </div>
      <p>Önce bir bölgeyi seçip görev kartıyla karşılaştır:</p>
      <div className="bio015-part-buttons">
        {brainParts.map(([key, label]) => (
          <button
            className="secondary"
            key={key}
            aria-pressed={selected === key}
            onClick={() => set({ selected: key })}
          >
            {label}
          </button>
        ))}
      </div>
      <Drawing
        title="Ön beyin kesiti: ön solda, arka sağda; seçilen bölge ve görevle ilişkili hedef"
        height={450}
      >
        <text x="16" y="34">
          Ön
        </text>
        <text x="264" y="34">
          Arka
        </text>
        <path
          d="M28 169C14 81 91 48 157 63C227 31 319 72 332 155C350 211 298 242 246 234L220 268L168 250C112 258 25 239 28 169Z"
          className="bio015-cell"
        />
        <path
          d="M165 64C135 117 141 156 185 181M267 79C238 109 247 147 305 169"
          className="bio015-outline"
        />
        {[
          { id: "parietal", x: 200, y: 107 },
          { id: "occipital", x: 285, y: 188 },
          { id: "hypothalamus", x: 173, y: 221 },
          { id: "pineal", x: 231, y: 191 },
        ].map((p) => (
          <g
            key={p.id}
            data-brain-region={p.id}
            data-task-target={String(m.target === p.id)}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={22}
              className={
                selected === p.id ? "bio015-selected-cell" : "bio015-cell"
              }
            />
            {m.target === p.id && (
              <circle cx={p.x} cy={p.y} r={30} className="bio015-target-ring" />
            )}
          </g>
        ))}
        <text x="200" y="117" textAnchor="middle">
          P
        </text>
        <text x="285" y="198" textAnchor="middle">
          O
        </text>
        <text x="173" y="231" textAnchor="middle">
          H
        </text>
        <text x="231" y="201" textAnchor="middle">
          E
        </text>
        <text x="14" y="307">
          P: Pariyetal
        </text>
        <text x="14" y="347">
          O: Oksipital
        </text>
        <text x="14" y="387">
          H: Hipotalamus
        </text>
        <text x="14" y="427">
          E: Epifiz
        </text>
      </Drawing>
      <ul className="bio015-key">
        <li>P: pariyetal lob; O: oksipital lob.</li>
        <li>
          H: hipotalamus; E: epifiz. Kesintisiz vurgu seçtiğin bölgeyi, dış
          halka görev kartının hedefini gösterir.
        </li>
      </ul>
      <div className="bio015-result" data-model-result>
        <strong>Görev kartıyla ilişkili vurgu: {m.label}.</strong>
        <p>
          Seçtiğin bölge: {brainParts.find(([v]) => v === selected)?.[1]}.{" "}
          {selected === m.target
            ? "Görev kartının vurgusuyla eşleşiyor."
            : "Görev kartının vurgusu başka bölgede; ağı ve açıklamayı karşılaştır."}
        </p>
        <p>{m.network}.</p>
        {task === "temperature" && (
          <p>
            Ölçülen − hedef = {n(temperature)} − 37 = {n(m.error)} °C.{" "}
            {m.regulation}. Bu sayısal model gerçek bir kişiye klinik eşik veya
            tanı vermez.
          </p>
        )}
        <p>
          Talamus birçok duyu yolunda önemli bir aktarma ve işleme durağıdır.
          Koku yolunun ilk kortikal aktarımı bu genel çizginin önemli
          istisnasıdır; bu, koku bilgisinin hiçbir talamik bağlantısı olmadığı
          anlamına gelmez.
        </p>
      </div>
      <Prediction
        id="sinir-sistemi-on-beyin"
        context={JSON.stringify([task, temperature])}
        expected={m.target}
        options={brainParts}
        explanation={`Kartın vurgusu ${m.label}. ${m.network}. Bir bölgeye katkı atamak, bütün davranışın tek bir noktadan veya kişiliğin yalnız sağ/sol yarımküreden yönetildiği anlamına gelmez.`}
      />
    </>
  );
}
function Hindbrain() {
  const [s, set] = useExploration(
    "forge015-bio-sinir-sistemi-orta-arka-beyin",
    { task: "orientation", selected: "midbrain" },
  );
  const task: HindTask = [
      "orientation",
      "coordination",
      "respiration",
      "relay",
    ].includes(s.task)
      ? (s.task as HindTask)
      : "orientation",
    m = hindbrainSnapshot(task);
  const options: [string, string][] = [
      ["midbrain", "Orta beyin"],
      ["pons", "Pons"],
      ["medulla", "Omurilik soğanı"],
      ["cerebellum", "Beyincik"],
    ],
    selected = options.some(([v]) => v === s.selected)
      ? s.selected
      : "midbrain";
  return (
    <>
      <h3>Beyin sapı ile arka beynin sınırları aynı mı?</h3>
      <p>
        Şema yandan ve ölçeksiz bir yerleşimdir. Görev seçince katkı veren
        bölgenin çevresi halkalanır. Bir bölgenin adına dokunarak hangi iki
        anatomik grupta yer aldığını karşılaştırabilirsin. Bu bir hastalık veya
        lezyon sonucunu kesin hesaplayan araç değildir.
      </p>
      <div className="bio015-controls">
        <Choice
          label="Orta ve arka beyinde görev"
          value={task}
          options={[
            ["orientation", "Görsel-işitsel uyarana seçili yönelme refleksi"],
            ["coordination", "Hareket zamanlaması ve hata düzeltme"],
            ["respiration", "Hayati solunum düzenlemesine katkı"],
            ["relay", "Bağlantılar ve solunum ağlarına pons katkısı"],
          ]}
          onChange={(v) => set({ task: v })}
        />
      </div>
      <div className="bio015-part-buttons">
        {options.map(([key, label]) => (
          <button
            className="secondary"
            key={key}
            aria-pressed={selected === key}
            onClick={() => set({ selected: key })}
          >
            {label}
          </button>
        ))}
      </div>
      <Drawing
        title="Orta beyin, pons, omurilik soğanı ve beyinciğin ayrı yerleşimi"
        height={475}
      >
        <path
          d="M114 72L157 58L183 95L180 160L197 205L182 301L148 339L124 296L133 225L112 169Z"
          className="bio015-cell"
        />
        <ellipse
          cx="267"
          cy="217"
          rx="60"
          ry="73"
          className={
            selected === "cerebellum" ? "bio015-selected-cell" : "bio015-cell"
          }
        />
        {[
          { id: "midbrain", x: 147, y: 106 },
          { id: "pons", x: 151, y: 181 },
          { id: "medulla", x: 152, y: 264 },
          { id: "cerebellum", x: 267, y: 217 },
        ].map((p) => (
          <g
            key={p.id}
            data-hind-region={p.id}
            data-task-target={String(m.target === p.id)}
          >
            {p.id !== "cerebellum" && (
              <ellipse
                cx={p.x}
                cy={p.y}
                rx="30"
                ry="27"
                className={
                  selected === p.id ? "bio015-selected-cell" : "bio015-cell"
                }
              />
            )}
            <text x={p.x} y={p.y + 10} textAnchor="middle">
              {p.id === "midbrain"
                ? "O"
                : p.id === "pons"
                  ? "P"
                  : p.id === "medulla"
                    ? "S"
                    : "B"}
            </text>
            {m.target === p.id && (
              <ellipse
                cx={p.x}
                cy={p.y}
                rx={p.id === "cerebellum" ? 68 : 38}
                ry={p.id === "cerebellum" ? 81 : 35}
                className="bio015-target-ring"
              />
            )}
          </g>
        ))}
        <text x="12" y="35">
          O: Orta beyin
        </text>
        <text x="12" y="375">
          P: Pons
        </text>
        <text x="12" y="415">
          B: Beyincik
        </text>
        <text x="12" y="455">
          S: Omurilik soğanı
        </text>
      </Drawing>
      <ul className="bio015-key">
        <li>O: orta beyin; P: pons; S: omurilik soğanı; B: beyincik.</li>
        <li>Beyin sapı = orta beyin + pons + omurilik soğanı.</li>
        <li>Arka beyin = pons + omurilik soğanı + beyincik.</li>
      </ul>
      <div className="bio015-result" data-model-result>
        <strong>Görev vurgusu: {m.label}.</strong>
        <p>{m.scope}</p>
        <p>
          Vurgulanan bölge beyin sapında: {m.brainstem ? "evet" : "hayır"}. Arka
          beyinde: {m.hindbrain ? "evet" : "hayır"}.
        </p>
        <p>
          Seçtiğin anatomi düğmesi: {options.find(([v]) => v === selected)?.[1]}
          .{" "}
          {selected === "midbrain"
            ? "Beyin sapında, arka beyinde değil."
            : selected === "cerebellum"
              ? "Arka beyinde, beyin sapında değil."
              : "Hem beyin sapında hem arka beyinde."}
        </p>
        <p>
          Bütün sinir yolları omurilik soğanında aynı biçimde çapraz yapmaz.
          Seçili yol ve yön belirtilmeden evrensel sağ-sol sonucu çıkarılmaz.
        </p>
      </div>
      <Prediction
        id="sinir-sistemi-orta-arka-beyin"
        context={task}
        expected={m.target}
        options={options}
        explanation={m.scope}
      />
    </>
  );
}
function Spinal() {
  const [s, set] = useExploration("forge015-bio-sinir-sistemi-omurilik", {
      interneuron: false,
      cut: "none",
    }),
    cut: ReflexCut = ["none", "dorsal", "ventral", "ascending"].includes(s.cut)
      ? (s.cut as ReflexCut)
      : "none",
    m = spinalSnapshot(s.interneuron, cut);
  return (
    <>
      <h3>Refleksin hangi yolu kesildi?</h3>
      <p>
        Kesit üstte arka, altta ön yöndedir; anatomik sağ-sol taraf göstermiyor.
        İçteki kelebek biçimli alan boz, çevresi ak maddedir. Kökler omurilik
        dışına uzanan yollardır; boynuzlar boz maddenin bölgeleridir. Şema
        seçili, izole devreyi gösterir; gerçek hasarın bütün klinik sonuçlarını
        hesaplamaz.
      </p>
      <div className="bio015-controls">
        <Check
          label="Seçili yayda bir ara nöron olsun"
          checked={s.interneuron}
          onChange={(v) => set({ interneuron: v })}
        />
        <Choice
          label="Düşünce deneyinde kesilen yol"
          value={cut}
          options={[
            ["none", "Kesik yok"],
            ["dorsal", "Yalnız arka kök duyu girişi kesik"],
            ["ventral", "Yalnız ön kök motor çıkışı kesik"],
            ["ascending", "Yalnız beyne yükselen yol kesik"],
          ]}
          onChange={(v) => set({ cut: v })}
        />
      </div>
      <Drawing
        title="Omurilik kesiti: arka kökten duyu, merkezî bağlantı, ön kökten motor ve ayrıca yükselen bilgi"
        height={410}
      >
        <text x="129" y="32">
          Arka
        </text>
        <ellipse cx="180" cy="190" rx="110" ry="119" className="bio015-cell" />
        <path
          d="M116 112Q180 188 244 112Q229 171 217 193Q259 239 246 269Q205 249 180 213Q153 249 114 269Q101 238 143 193Q125 168 116 112Z"
          className="bio015-gray"
        />
        <Arrow x1={20} y1={137} x2={143} y2={137} active={m.sensoryInput} />
        <circle
          cx="51"
          cy="137"
          r="14"
          className="bio015-cell"
          data-dorsal-ganglion
        />
        <circle
          cx="51"
          cy="137"
          r="7"
          className="bio015-neuron"
          data-neuron-body="sensory"
        />
        <path
          d="M136 134L150 144L136 154Z"
          className="bio015-neuron"
          data-afferent-terminal
        />
        {s.interneuron ? (
          <>
            <Arrow
              x1={152}
              y1={154}
              x2={181}
              y2={185}
              active={m.sensoryInput}
            />
            <circle
              cx="186"
              cy="191"
              r="10"
              className="bio015-neuron"
              data-neuron-body="interneuron"
            />
            <Arrow
              x1={192}
              y1={202}
              x2={213}
              y2={231}
              active={m.sensoryInput}
            />
          </>
        ) : (
          <Arrow x1={153} y1={154} x2={213} y2={230} active={m.sensoryInput} />
        )}
        <circle
          cx="219"
          cy="242"
          r="12"
          className="bio015-neuron"
          data-neuron-body="motor"
        />
        <Arrow x1={232} y1={250} x2={336} y2={283} active={m.localResponse} />
        <g className={m.sensoryInput ? "bio015-path" : "bio015-inactive"}>
          <path d="M145 144L181 121" />
        </g>
        <Arrow x1={181} y1={121} x2={181} y2={58} active={m.ascending} />
        {cut !== "none" && (
          <g className="bio015-cut" data-cut-path={cut}>
            <path
              d={
                cut === "dorsal"
                  ? "M85 119L103 153M103 119L85 153"
                  : cut === "ventral"
                    ? "M274 247L293 280M293 247L274 280"
                    : "M165 75L197 99M197 75L165 99"
              }
            />
          </g>
        )}
        <text x="11" y="104">
          Duyu
        </text>
        <text x="245" y="328">
          Motor
        </text>
        <text x="133" y="373">
          Ön
        </text>
        <text x="209" y="62">
          Beyne
        </text>
        <g
          data-reflex-response={String(m.localResponse)}
          data-ascending-response={String(m.ascending)}
          data-central-neurons={m.neurons}
        />
      </Drawing>
      <ul className="bio015-key">
        <li>
          Arka kök: getirici duyu yolu; küçük dış halka arka kök gangliyonudur.
        </li>
        <li>
          Ön kök: götürücü motor yolu. Üstteki ayrı ok beyne yükselen yolu
          temsil eder.
        </li>
        <li>
          Üçgen, gelen duyu aksonunun uç bölgesidir; ayrı bir hücre gövdesi
          değildir. Dolu daireler motor ve varsa ara nöron gövdelerini temsil
          eder. Kırmızı çarpı yalnız seçili kesik yeridir; yolların başka bütün
          bağlantıları çizilmedi.
        </li>
      </ul>
      <div className="bio015-result" data-model-result>
        <p>
          Duyu girişi: <strong>{m.sensoryInput ? "var" : "yok"}</strong>. Yerel
          motor refleks yanıtı:{" "}
          <strong>{m.localResponse ? "oluşabilir" : "oluşmaz"}</strong>.
          Yükselen bilgi:{" "}
          <strong>
            {m.ascending
              ? "seçili yoldan iletilebilir"
              : "seçili yoldan iletilemez"}
          </strong>
          .
        </p>
        <p>
          Seçili tam yay: {m.neurons} nöron, {m.centralSynapses} merkezî
          kimyasal sinaps. Kas bir nöron değildir.
        </p>
        <p>
          Kas çıkışına kadar hesaplanan süre:{" "}
          {m.latency === null
            ? "Devre kesik; bu yoldan tamamlanmış yanıt süresi verilmez."
            : `${n(m.latency)} ms.`}
        </p>
        <p>{m.limits}</p>
        <p>
          Yükselen yol kesikken yerel yay korunabilir. Bu, bütün reflekslerin
          beyinden tamamen bağımsız olduğu veya bilinçli ağların refleksi
          düzenleyemeyeceği anlamına gelmez.
        </p>
      </div>
      <Prediction
        id="sinir-sistemi-omurilik"
        context={JSON.stringify([s.interneuron, cut])}
        expected={m.localResponse ? "yes" : "no"}
        options={[
          ["yes", "Seçili yerel motor refleks yanıtı oluşabilir"],
          ["no", "Seçili yayda yerel motor refleks yanıtı oluşmaz"],
        ]}
        explanation={`Duyu girişi ${m.sensoryInput ? "korunuyor" : "kesik"}; motor çıkış ${cut === "ventral" ? "kesik" : "korunuyor"}. ${cut === "ascending" ? "Yalnız yükselen bilgi yolunun kesilmesi bu modelde yerel yayı kesmez." : ""} Verilen tam yayda ${m.neurons} nöron ve ${m.centralSynapses} merkezî sinaps var.`}
      />
    </>
  );
}
function Peripheral() {
  const [s, set] = useExploration(
      "forge015-bio-sinir-sistemi-css-hastaliklar",
      { target: "skeletal", evidence: "symptom" },
    ),
    target: PeripheralTarget = [
      "skeletal",
      "smooth",
      "cardiac",
      "gland",
    ].includes(s.target)
      ? (s.target as PeripheralTarget)
      : "skeletal",
    evidence: DiseaseEvidence = Object.hasOwn(evidenceLabels, s.evidence)
      ? (s.evidence as DiseaseEvidence)
      : "symptom",
    m = peripheralSnapshot(target, evidence);
  const targets: [string, string][] = [
    ["skeletal", "İskelet kası"],
    ["smooth", "Düz kas"],
    ["cardiac", "Kalp kası"],
    ["gland", "Bez"],
  ];
  return (
    <>
      <h3>Hedef değişince motor yolun düzeni nasıl değişir?</h3>
      <p>
        Bu şema motor çıkışı sayar; duyu girdilerinin veya bütün merkezî
        devrenin toplam nöron sayısını vermez. Somatik hedefteki refleksin
        bilinçsiz başlaması, iskelet kasını düz kasa dönüştürmez. Otonom şema
        temel iki nöronlu yolu gösterir; bütün istisnaları tüketmez.
      </p>
      <div className="bio015-controls">
        <Choice
          label="Motor yolun hedefi"
          value={target}
          options={targets}
          onChange={(v) => set({ target: v })}
        />
        <Choice
          label="Hastalık değil mekanizma kanıt kartı"
          value={evidence}
          options={Object.entries(evidenceLabels)}
          onChange={(v) => set({ evidence: v })}
        />
      </div>
      <Drawing
        title="Motor yol: merkezî sinir sistemi sınırı, çevresel gövde ve hedef"
        height={395}
      >
        <rect
          x="16"
          y="55"
          width="117"
          height="276"
          rx="20"
          className="bio015-cell"
        />
        <path d="M140 58V330" className="bio015-threshold" />
        <text x="31" y="38">
          MSS
        </text>
        <text x="181" y="38">
          ÇSS
        </text>
        <circle cx="74" cy="143" r="23" className="bio015-neuron" />
        <text x="66" y="153" className="bio015-inverted-text">
          1
        </text>
        {m.autonomic ? (
          <>
            <Arrow x1={99} y1={143} x2={193} y2={143} />
            <rect
              x="203"
              y="108"
              width="86"
              height="92"
              rx="30"
              className="bio015-cell"
              data-peripheral-ganglion
            />
            <circle cx="245" cy="145" r="22" className="bio015-neuron" />
            <text x="237" y="155" className="bio015-inverted-text">
              2
            </text>
            <Arrow x1={246} y1={175} x2={246} y2={252} />
            <text x="172" y="90">
              Gangliyon
            </text>
          </>
        ) : (
          <Arrow x1={100} y1={150} x2={233} y2={259} />
        )}
        <rect
          x="192"
          y="269"
          width="139"
          height="55"
          rx="10"
          className="bio015-cell"
        />
        <text x="206" y="307">
          Hedef
        </text>
        <text x="18" y="375">
          {m.autonomic ? "İki motor hücre" : "Bir motor hücre"}
        </text>
        <g
          data-motor-neurons={m.motorNeurons}
          data-peripheral-somas={m.peripheralSomas}
        />
      </Drawing>
      <div className="bio015-result" data-model-result>
        <strong>
          {m.autonomic ? "Temel otonom motor yol" : "Somatik motor çıkış"}
        </strong>
        <p>
          Hedef: {targets.find(([v]) => v === target)?.[1]}. Motor nöron sayısı:{" "}
          {m.motorNeurons}. ÇSS’de gösterilen motor gövde: {m.peripheralSomas}.
        </p>
        <p>{m.route}.</p>
        <p>
          1: MSS’deki motor gövde.{" "}
          {m.autonomic
            ? "2: periferik gangliyondaki postgangliyonik gövde. Bütün motor gövdeler MSS’de değildir."
            : "Çizimde tek motor hücresi var; önceki duyu ve ağ bağlantıları bu sayımın dışında."}
        </p>
        <h4>Seçili kanıt ne söyler?</h4>
        <p>{m.relation}</p>
        <p>
          Bu bir öğretim eşleştirmesidir; kişisel tanı veya tedavi seçmez. ÇSS
          sınıflamasıyla seçili hastalık mekanizmasının anatomik yerini aynı şey
          sanma: örneğin bu karttaki MS mekanizması merkezî miyelindir.
        </p>
      </div>
      <Prediction
        id="sinir-sistemi-css-hastaliklar"
        context={target}
        expected={m.autonomic ? "two" : "one"}
        options={[
          [
            "one",
            "Seçili motor çıkışta bir hücre; çevresel motor gövde gösterilmiyor",
          ],
          [
            "two",
            "Seçili temel yolda iki motor hücre; ikinci gövde çevresel gangliyonda",
          ],
        ]}
        explanation={`${m.route}. Bu modelde motor çıkış sayılır; duyu nöronları ve bütün merkezî ağ sayılmaz. ${m.autonomic ? "Postgangliyonik gövde ÇSS’de bulunur." : "Somatik yanıt refleks de olabilir; somatik her zaman bilinçli demek değildir."}`}
      />
    </>
  );
}
const labs: Record<string, () => ReactNode> = {
  "genetik-cesitlilik": Variation,
  "sinir-sistemi-noron-ve-glialar": Neuron,
  "sinir-sistemi-aksiyon-potansiyeli": Potential,
  "sinir-sistemi-on-beyin": Forebrain,
  "sinir-sistemi-orta-arka-beyin": Hindbrain,
  "sinir-sistemi-omurilik": Spinal,
  "sinir-sistemi-css-hastaliklar": Peripheral,
};
export default function Forge015BiologyLab({ lessonId }: { lessonId: string }) {
  const Lab = labs[lessonId];
  return Lab ? (
    <section className="bio015" data-forge015={lessonId}>
      <Lab />
    </section>
  ) : null;
}
