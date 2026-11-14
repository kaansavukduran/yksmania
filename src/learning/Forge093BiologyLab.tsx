import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  classificationInference,
  classificationRanks,
  membraneTransport,
  namedOrganisms,
  narrowestSharedRank,
  osmosisModel,
  teachingSequences,
  type FlowDirection,
  type MembraneSolute,
} from "./forge093Biology";
import "./forge093Biology.css";

const fmt = (value: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(value);
const bounded = (value: number, min: number, max: number) =>
  Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : min;
const flowWords: Record<FlowDirection, string> = {
  in: "Hücreye doğru",
  out: "Hücreden dışarı",
  none: "Net geçiş yok",
};

function AmountControl({
  label,
  value,
  max = 10,
  step = 0.5,
  onChange,
}: {
  label: string;
  value: number;
  max?: number;
  step?: number | "any";
  onChange: (value: number) => void;
}) {
  return (
    <label className="f093-bio-range">
      {label}: <output>{fmt(value)}</output>
      <input
        type="range"
        min="0"
        max={max}
        step={step}
        value={value}
        aria-label={label}
        aria-valuetext={fmt(value)}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function Prediction({
  uid,
  value,
  reason,
  checked,
  expected,
  explanation,
  options,
  onValue,
  onReason,
  onCheck,
}: {
  uid: string;
  value: string;
  reason: string;
  checked: boolean;
  expected: string;
  explanation: string;
  options: [string, string][];
  onValue: (value: string) => void;
  onReason: (value: string) => void;
  onCheck: () => void;
}) {
  const valid = options.some(([option]) => option === value);
  return (
    <div className="f093-bio-prediction">
      <label htmlFor={`${uid}-prediction`}>Sonuç tahminin</label>
      <select
        id={`${uid}-prediction`}
        value={valid ? value : ""}
        onChange={(event) => onValue(event.target.value)}
      >
        <option value="">Bir sonuç seç</option>
        {options.map(([option, label]) => (
          <option key={option} value={option}>
            {label}
          </option>
        ))}
      </select>
      <label htmlFor={`${uid}-reason`}>Tahmininin gerekçesi</label>
      <textarea
        id={`${uid}-reason`}
        rows={3}
        maxLength={120}
        value={reason.slice(0, 120)}
        onChange={(event) => onReason(event.target.value)}
        placeholder="Hangi veri ve koşulu kullandığını yaz…"
      />
      <button
        className="secondary"
        disabled={!valid || !reason.trim()}
        onClick={onCheck}
      >
        Tahminimi kanıtla karşılaştır
      </button>
      {checked && valid && (
        <div className="f093-bio-feedback" role="status">
          <strong>
            {value === expected
              ? "Sonuç seçimin bu koşullarla uyumlu."
              : "Sonucunu verilen koşullarla yeniden karşılaştır."}
          </strong>
          <p>{explanation}</p>
          <p>Gerekçen: {reason}</p>
          <p className="small muted">
            Seçilen sonuç karşılaştırılır; yazdığın gerekçeye otomatik doğruluk
            puanı verilmez.
          </p>
        </div>
      )}
    </div>
  );
}

function SoluteDrawing({
  uid,
  solute,
  direction,
  protein,
  active,
}: {
  uid: string;
  solute: MembraneSolute;
  direction: FlowDirection;
  protein: boolean;
  active: boolean;
}) {
  return (
    <svg
      className="f093-bio-drawing"
      viewBox="0 0 540 260"
      role="img"
      aria-label={`${solute === "oxygen" ? "Oksijen" : solute === "glucose" ? "Glikoz" : solute === "sodium" ? "Sodyum iyonu" : "Büyük protein"}; ${flowWords[direction]}. İki bölmeyi fosfolipit çift tabaka ayırır; gösterilen tanecikler sayısal derişimin ölçekli resmi değildir.`}
    >
      <defs>
        <marker
          id={`${uid}-arrow`}
          markerWidth="9"
          markerHeight="9"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0 0L8 4L0 8Z" fill="currentColor" />
        </marker>
      </defs>
      <text x="120" y="25" textAnchor="middle">
        Hücre dışı
      </text>
      <text x="415" y="25" textAnchor="middle">
        Sitoplazma
      </text>
      <rect
        x="20"
        y="40"
        width="205"
        height="195"
        rx="18"
        className="f093-bio-compartment"
      />
      <rect
        x="315"
        y="40"
        width="205"
        height="195"
        rx="18"
        className="f093-bio-compartment"
      />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <circle cx="250" cy={48 + i * 25} r="6" className="f093-bio-lipid" />
          <path
            d={`M256 ${44 + i * 25}h10m-10 8h10`}
            className="f093-bio-line"
          />
          <circle cx="290" cy={48 + i * 25} r="6" className="f093-bio-lipid" />
          <path
            d={`M284 ${44 + i * 25}h-10m10 8h-10`}
            className="f093-bio-line"
          />
        </g>
      ))}
      {protein && (
        <g>
          <rect
            x="239"
            y="94"
            width="62"
            height="72"
            rx="13"
            className="f093-bio-channel"
          />
          <path d="M249 130h42" className="f093-bio-line" />
        </g>
      )}
      {direction !== "none" && (
        <path
          d={direction === "in" ? "M115 130H420" : "M425 130H120"}
          className="f093-bio-net-arrow"
          markerEnd={`url(#${uid}-arrow)`}
        />
      )}
      <g
        className={
          direction === "none"
            ? "f093-bio-particle"
            : `f093-bio-particle f093-bio-travel ${direction}`
        }
      >
        {solute === "glucose" ? (
          <polygon
            points="135,110 155,120 155,142 135,152 115,142 115,120"
            className="f093-bio-solute"
          />
        ) : (
          <circle
            cx="135"
            cy="131"
            r={solute === "protein" ? 25 : 17}
            className="f093-bio-solute"
          />
        )}
        <text
          x="135"
          y="136"
          textAnchor="middle"
          className="f093-bio-solute-label"
        >
          {solute === "oxygen"
            ? "O₂"
            : solute === "glucose"
              ? "G"
              : solute === "sodium"
                ? "Na⁺"
                : "P"}
        </text>
      </g>
      {active && (
        <text x="270" y="198" textAnchor="middle">
          ATP kullanan pompa
        </text>
      )}
      <path d="M165 219h35m-35 6h-12" className="f093-bio-micro-arrow" />
      <text x="120" y="254" textAnchor="middle">
        Isıl hareket sürer
      </text>
    </svg>
  );
}

function MembraneLab() {
  const uid = useId();
  const [saved, set] = useExploration("forge093-membrane", {
    mode: "solute",
    solute: "glucose",
    active: false,
    carrier: false,
    atp: true,
    permeability: 3,
    outside: 8,
    inside: 2,
    cell: "animal",
    outerSolute: 1,
    innerSolute: 3,
    pressure: 0,
    waterOpen: true,
    prediction: "",
    reason: "",
    checked: false,
    steps: 0,
  });
  const solute: MembraneSolute = [
    "oxygen",
    "glucose",
    "sodium",
    "protein",
  ].includes(saved.solute)
    ? (saved.solute as MembraneSolute)
    : "glucose";
  const outside = bounded(saved.outside, 0, 1_000_000),
    inside = bounded(saved.inside, 0, 1_000_000),
    permeability = bounded(saved.permeability, 0, 3);
  // A pump can concentrate above the original slider range; retain that value instead of discarding matter.
  const concentrationScale = Math.max(
    10,
    Math.ceil(outside),
    Math.ceil(inside),
  );
  const flow = membraneTransport({
    solute,
    active: saved.active,
    carrier: saved.carrier,
    atp: saved.atp,
    permeability,
    outside,
    inside,
  });
  const plant = saved.cell === "plant",
    pressure = plant ? bounded(saved.pressure, 0, 6) : 0;
  const innerSolute = bounded(saved.innerSolute, 0, 6),
    outerSolute = bounded(saved.outerSolute, 0, 6);
  const water = osmosisModel(
    innerSolute,
    outerSolute,
    pressure,
    saved.waterOpen,
  );
  const waterMode = saved.mode === "water";
  const change = (patch: Partial<typeof saved>) =>
    set({ ...patch, checked: false });
  const direction = waterMode ? water.direction : flow.direction;
  const explanation = waterMode
    ? !saved.waterOpen
      ? "Su yolu kapalıysa çözünen ve basınç farkı olsa da bu modelde net su geçişi yoktur."
      : `${fmt(innerSolute)}−${fmt(outerSolute)}−${fmt(pressure)}=${fmt(water.drive)}. Pozitif değer hücreye, negatif değer dışarı eğilimdir; sıfır net dengedir.`
    : flow.blocked ||
      (flow.amount === 0
        ? "Bu başlangıçta net geçiş sıfırdır; açık pasif yolda iki yöndeki ısıl hareket yine sürebilir."
        : saved.active
          ? "Seçilmiş ATP kullanan Na⁺ pompası içten dışa taşır. Uygun protein, enerji ve taşınacak iyon birlikte gereklidir; gerçek pompanın tüm stoikiyometrisi modellenmiyor."
          : `${flow.mechanism}: uygun açık yolda net yön ${fmt(outside)} ve ${fmt(inside)} derişimlerinin farkıyla belirlenir. ATP bu pasif yolun doğrudan enerji kaynağı değildir.`);
  const cellOutcome = !saved.waterOpen
    ? "Su geçiş yolu kapalı; yalnız bu deneyden suyla şişme veya büzülme öngörülmez."
    : water.direction === "in"
      ? plant
        ? "Bitki hücresinde su alımı turgoru destekler; sağlam çeper karşı basınç oluşturur."
        : "Hayvan hücresinde su alımı ve şişme eğilimi; aşırı alımda lizis riski. Alyuvarda özel adı hemolizdir."
      : water.direction === "out"
        ? plant
          ? "Bitki protoplastı su kaybeder; zar çeperden uzaklaşabilir: plazmoliz. Çeperin dış sınırı küçülmez."
          : "Hayvan hücresi su kaybedip büzülme eğilimindedir; bitki plazmoliziyle aynı yapısal adlandırma yapılmaz."
        : "Bu koşulda net su akışı dengede; su moleküllerinin iki yönlü hareketi tamamen durmuş sayılmaz.";
  const cellSize =
    water.direction === "in" ? 144 : water.direction === "out" ? 108 : 130;
  return (
    <section
      className="f093-biology-lab f093-membrane"
      data-forge093="hucre-zarinda-madde-alisverisleri"
      aria-labelledby={`${uid}-title`}
    >
      <h3 id={`${uid}-title`}>Zarı bir koşul değiştirerek sına</h3>
      <p>
        Önce geçecek maddeyi ve yolu seç. Derişim, geçirgenlik ve enerji aynı
        soru değildir.
      </p>
      <div className="f093-bio-tabs" role="group" aria-label="Zar modeli">
        <button
          className="secondary"
          aria-pressed={!waterMode}
          onClick={() => change({ mode: "solute", prediction: "" })}
        >
          Küçük madde geçişi
        </button>
        <button
          className="secondary"
          aria-pressed={waterMode}
          onClick={() => change({ mode: "water", prediction: "" })}
        >
          Su ve hücre
        </button>
      </div>
      {!waterMode ? (
        <>
          <div className="f093-bio-controls">
            <label>
              İzlenen madde
              <select
                value={solute}
                onChange={(e) => change({ solute: e.target.value })}
              >
                <option value="oxygen">Oksijen · küçük apolar</option>
                <option value="glucose">Glikoz · küçük polar</option>
                <option value="sodium">Na⁺ · küçük yüklü iyon</option>
                <option value="protein">Büyük protein</option>
              </select>
            </label>
            <label>
              Taşıma düzeni
              <select
                value={saved.active ? "active" : "passive"}
                onChange={(e) =>
                  change({ active: e.target.value === "active" })
                }
              >
                <option value="passive">Pasif yol · gradyan boyunca</option>
                <option value="active">ATP kullanan Na⁺ çıkış pompası</option>
              </select>
            </label>
          </div>
          <div className="f093-bio-controls">
            <AmountControl
              label="Dış derişim (model birimi)"
              value={outside}
              max={concentrationScale}
              step="any"
              onChange={(n) => change({ outside: n })}
            />
            <AmountControl
              label="İç derişim (model birimi)"
              value={inside}
              max={concentrationScale}
              step="any"
              onChange={(n) => change({ inside: n })}
            />
            <AmountControl
              label="Uygun yolun geçirgenliği"
              value={permeability}
              max={3}
              step={1}
              onChange={(n) => change({ permeability: n })}
            />
          </div>
          <div className="f093-bio-checks">
            <label>
              <input
                type="checkbox"
                checked={saved.carrier}
                onChange={(e) => change({ carrier: e.target.checked })}
              />
              Uygun taşıma proteini mevcut
            </label>
            <label>
              <input
                type="checkbox"
                checked={saved.atp}
                onChange={(e) => change({ atp: e.target.checked })}
              />
              ATP kaynağı açık
            </label>
          </div>
          <p className="small muted">
            Eşit ve sabit hacimli iki bölme, üretim/tüketim yok. Na⁺ için
            elektriksel potansiyel farkı 0 kabul edilir; gerçek iyon yönünde
            elektrokimyasal gradyan önemlidir. Geçirgenlik öğretim katsayısıdır;
            adım gerçek saniye değildir.
          </p>
          <SoluteDrawing
            uid={uid}
            solute={solute}
            direction={flow.direction}
            protein={saved.carrier && (saved.active || solute !== "oxygen")}
            active={saved.active && saved.carrier}
          />
          <div className="f093-bio-result" data-model-result role="status">
            <strong>
              {flowWords[flow.direction]} ·{" "}
              {flow.blocked
                ? "Seçili yolun koşulları sağlanmıyor"
                : flow.mechanism}
            </strong>
            <p>{explanation}</p>
            <dl>
              <div>
                <dt>Dış derişim</dt>
                <dd>{fmt(outside)}</dd>
              </div>
              <div>
                <dt>İç derişim</dt>
                <dd>{fmt(inside)}</dd>
              </div>
              <div>
                <dt>Sonraki adımda net aktarılacak</dt>
                <dd>{fmt(flow.amount)} model birimi</dd>
              </div>
            </dl>
          </div>
          <button
            className="secondary"
            disabled={flow.amount === 0}
            onClick={() =>
              change({
                outside: flow.outsideAfter,
                inside: flow.insideAfter,
                steps: Math.min(1000, saved.steps + 1),
              })
            }
          >
            Bir model adımı ilerlet
          </button>
          <p className="small muted">
            İlerletme iki bölmenin sayılarını birlikte günceller; toplam madde
            korunur. Çizimdeki tanecik sayısı derişimin tam sayımı değildir. Net
            0, bütün ısıl hareketin bitmesi değildir.
          </p>
        </>
      ) : (
        <>
          <label>
            İncelenen hücre
            <select
              value={plant ? "plant" : "animal"}
              onChange={(e) => change({ cell: e.target.value })}
            >
              <option value="animal">Hayvan hücresi · çeper yok</option>
              <option value="plant">Bitki hücresi · sağlam çeper</option>
            </select>
          </label>
          <div className="f093-bio-controls">
            <AmountControl
              label="İçte geçemeyen çözünen"
              value={innerSolute}
              max={6}
              onChange={(n) => change({ innerSolute: n })}
            />
            <AmountControl
              label="Dışta geçemeyen çözünen"
              value={outerSolute}
              max={6}
              onChange={(n) => change({ outerSolute: n })}
            />
            {plant && (
              <AmountControl
                label="İç karşı basınç farkı"
                value={pressure}
                max={6}
                onChange={(n) => change({ pressure: n })}
              />
            )}
          </div>
          <label className="f093-bio-check">
            <input
              type="checkbox"
              checked={saved.waterOpen}
              onChange={(e) => change({ waterOpen: e.target.checked })}
            />
            Zar suya geçirgen
          </label>
          <p className="small muted">
            Tek tür geçemeyen çözünen, ideal seyreltik ortam ve sabit sıcaklık.
            Hayvan için başlangıç basınç farkı0; bitkide seçilen karşı basınç
            hesaba katılır. Değerler aynı normalize ölçektedir. Şekil başlangıç
            eğilimini gösterir; kesin hacim veya geçen süre hesabı değildir.
          </p>
          <svg
            className="f093-bio-drawing"
            viewBox="0 0 540 270"
            role="img"
            aria-label={`${plant ? "Bitki" : "Hayvan"} hücresi. ${flowWords[water.direction]}. ${cellOutcome}`}
          >
            <defs>
              <marker
                id={`${uid}-water-arrow`}
                markerWidth="9"
                markerHeight="9"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path d="M0 0L8 4L0 8Z" fill="currentColor" />
              </marker>
            </defs>
            {plant && (
              <rect
                x="190"
                y="45"
                width="160"
                height="160"
                rx="12"
                className="f093-bio-wall"
              />
            )}
            {plant ? (
              <rect
                x={270 - cellSize / 2}
                y={125 - cellSize / 2}
                width={cellSize}
                height={cellSize}
                rx="20"
                className="f093-bio-cell"
              />
            ) : (
              <ellipse
                cx="270"
                cy="125"
                rx={cellSize / 2}
                ry={(cellSize / 2) * 0.85}
                className="f093-bio-cell"
              />
            )}
            <ellipse
              cx="270"
              cy="125"
              rx="27"
              ry="22"
              className="f093-bio-nucleus"
            />
            {water.direction !== "none" && (
              <>
                <path
                  d={water.direction === "in" ? "M80 125H175" : "M175 125H80"}
                  markerEnd={`url(#${uid}-water-arrow)`}
                  className="f093-bio-net-arrow"
                />
                <path
                  d={water.direction === "in" ? "M460 125H365" : "M365 125H460"}
                  markerEnd={`url(#${uid}-water-arrow)`}
                  className="f093-bio-net-arrow"
                />
              </>
            )}
            <text x="270" y="238" textAnchor="middle">
              {plant
                ? "Çeper sabit; zarın konumuna bak"
                : "Çeperi olmayan hücre"}
            </text>
          </svg>
          <div className="f093-bio-result" data-model-result role="status">
            <strong>{flowWords[water.direction]} · başlangıç su eğilimi</strong>
            <p>
              Geçemeyen çözünenler açısından dış ortam:{" "}
              {water.environment.toLocaleLowerCase("tr-TR")}.
            </p>
            <p>{explanation}</p>
            <p>{cellOutcome}</p>
          </div>
        </>
      )}
      <Prediction
        uid={uid}
        value={saved.prediction}
        reason={saved.reason}
        checked={saved.checked}
        expected={direction}
        explanation={explanation}
        options={[
          ["in", "Hücreye net geçiş"],
          ["out", "Hücreden dışarı net geçiş"],
          ["none", "Net geçiş yok"],
        ]}
        onValue={(v) => change({ prediction: v })}
        onReason={(v) => change({ reason: v })}
        onCheck={() => set({ checked: true })}
      />
      <p className="small muted">
        Keşif, tahmin ve gerekçen bu cihazda saklanır; XP, bağımsız soru doğrusu
        veya konu tamamlama kaydı oluşturmaz.
      </p>
    </section>
  );
}

function TreeDrawing({ evidence }: { evidence: string }) {
  const structural = evidence !== "cell",
    resolved = evidence === "dna";
  const paths = structural
    ? [
        "M250 35L45 355",
        "M250 35L300 115",
        "M300 115L145 355",
        "M300 115L350 205",
        "M350 205L245 355",
        ...(resolved
          ? ["M350 205L405 275", "M405 275L350 355", "M405 275L455 355"]
          : ["M350 205L350 355", "M350 205L455 355"]),
      ]
    : [45, 145, 245, 350, 455].map((x) => `M250 35L${x} 355`);
  return (
    <svg
      className="f093-bio-drawing"
      viewBox="0 0 500 415"
      role="img"
      aria-label={
        structural
          ? resolved
            ? "Öğretim ağacında amniyotlar içinde kertenkele ve güvercin ek ortak düğümle gösterilir; kedi daha önce ayrılan daldadır. Dal uzunlukları zaman değildir."
            : "Yapısal paket amniyot grubunu ayırır, kedi-kertenkele-güvercin iç sırası çözülmemiştir."
          : "Yalnız ortak hücre özelliğiyle beş örneğin iç dallanması çözülmemiştir."
      }
    >
      <g className="f093-bio-tree-lines">
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <circle cx="250" cy="35" r="9" className="f093-bio-tree-node" />
      {structural && (
        <>
          <circle cx="300" cy="115" r="9" className="f093-bio-tree-node" />
          <circle cx="350" cy="205" r="9" className="f093-bio-tree-node" />
          <text x="330" y="193" textAnchor="end" className="f093-bio-svg-note">
            Amniyotlar
          </text>
        </>
      )}
      {resolved && (
        <circle cx="405" cy="275" r="9" className="f093-bio-tree-node" />
      )}
      {teachingSequences.map((taxon, i) => (
        <g key={taxon.name}>
          <circle
            cx={[45, 145, 245, 350, 455][i]}
            cy="355"
            r="13"
            className="f093-bio-tree-leaf"
          />
          <text x={[45, 145, 245, 350, 455][i]} y="391" textAnchor="middle">
            {taxon.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

function OriginDrawing({ pair }: { pair: string }) {
  const analogous = pair === "bird-insect";
  return (
    <svg
      className="f093-bio-drawing"
      viewBox="0 0 500 220"
      role="img"
      aria-label={
        analogous
          ? "Kuş kanadında omurgalı ön üye iskeleti, böcek kanadında farklı kökenli zarsı yüzey gösterilir; iki uçuş yapısı aynı atasal kanadın dönüşümü değildir."
          : "İki omurgalı ön üyesinde bir üst kol, iki ön kol ve uç kemik planı karşılaştırılır; çizim gerçek anatominin ölçekli resmi değildir."
      }
    >
      {[0, 1].map((side) => (
        <g key={side} transform={`translate(${side * 250},0)`}>
          {side === 1 && analogous ? (
            <>
              <path
                d="M55 105Q100 5 200 55Q175 165 55 105Z"
                className="f093-bio-insect-wing"
              />
              <path
                d="M55 105L170 55m-100 40 50-60m-30 70 75-15"
                className="f093-bio-line"
              />
            </>
          ) : (
            <>
              <path d="M55 40L90 95" className="f093-bio-bone upper" />
              <path
                d="M90 95L130 150m-35-57 50 43"
                className="f093-bio-bone lower"
              />
              {[0, 1, 2, 3].map((n) => (
                <path
                  key={n}
                  d={`M130 150L${130 + n * 18} ${185 - n * 9}`}
                  className="f093-bio-bone tip"
                />
              ))}
            </>
          )}
        </g>
      ))}
      <text x="125" y="210" textAnchor="middle">
        {pair === "forelimbs" ? "İnsan ön üyesi" : "Kuş ön üyesi"}
      </text>
      <text x="375" y="210" textAnchor="middle">
        {analogous ? "Böcek kanadı" : "Yarasa ön üyesi"}
      </text>
    </svg>
  );
}

function ClassificationLab() {
  const uid = useId();
  const [saved, set] = useExploration("forge093-classification", {
    mode: "tree",
    evidence: "cell",
    first: "lion",
    second: "tiger",
    organPair: "forelimbs",
    criterion: "origin",
    prediction: "",
    reason: "",
    checked: false,
  });
  const mode = ["tree", "names", "organs"].includes(saved.mode)
    ? saved.mode
    : "tree";
  const evidence = ["cell", "structure", "dna"].includes(saved.evidence)
    ? saved.evidence
    : "cell";
  const inference = classificationInference(evidence);
  const first =
      namedOrganisms.find((o) => o.id === saved.first) ?? namedOrganisms[0],
    second =
      namedOrganisms.find((o) => o.id === saved.second) ?? namedOrganisms[1];
  const common = narrowestSharedRank(first.id, second.id);
  const pair = ["forelimbs", "bird-insect", "bird-bat"].includes(
    saved.organPair,
  )
    ? saved.organPair
    : "forelimbs";
  const origin = saved.criterion !== "function";
  const organExpected = !origin
    ? "insufficient"
    : pair === "bird-insect"
      ? "analog"
      : "homolog";
  const organConclusion = !origin
    ? "Yalnız işlev bilgisi ortak kökeni belirlemeye yetmez."
    : pair === "bird-insect"
      ? "Kuş–böcek uçuş yapıları bu karşılaştırmada analogdur."
      : "Omurgalı ön üye temel planı bakımından homologdur.";
  const organExplanation = !origin
    ? "Aynı görev bağımsız gelişebilir; farklı görev de ortak kökeni dışlamaz. İç yapı ve gelişim kanıtını ekle."
    : pair === "bird-insect"
      ? "Kuşun kemikli ön üyesi ile böceğin zarsı kanadı aynı atasal kanadın dönüşümü değildir; ortak uçuş işlevi analoji örneğidir."
      : pair === "bird-bat"
        ? "Kuş ve yarasa ön üyelerinin temel kemik planı homologdur. Uçuşa özelleşmiş kanat özellikleri ise bağımsız kazanımları içerebilir; özellik düzeyini belirt."
        : "İnsan kolu ile yarasanın ön üyesi aynı atasal kemik planının dönüşümleridir. İşlev farkı bu köken benzerliğini ortadan kaldırmaz.";
  const change = (patch: Partial<typeof saved>) =>
    set({ ...patch, checked: false });
  const expected =
    mode === "tree"
      ? inference.expected
      : mode === "names"
        ? common.rank
        : organExpected;
  const explanation =
    mode === "tree"
      ? inference.detail
      : mode === "names"
        ? `En dar ortak kategori ${common.rank.toLocaleLowerCase("tr-TR")}; ortak takson ${common.taxon}. Üst taksonları da paylaşırlar. Bu kapsama bilgisi kromozom sayısının veya bütün DNA'nın aynı olduğunu söylemez.`
        : organExplanation;
  const options: [string, string][] =
    mode === "tree"
      ? [
          ["insufficient", "Bu paket iç sırayı çözmez"],
          ["sister", "Kertenkele–güvercin daha yakın çiftini destekler"],
          ["same-species", "Hepsi aynı türdür"],
        ]
      : mode === "names"
        ? classificationRanks.map((rank) => [rank, rank])
        : [
            ["homolog", "Verilen yapı düzeyinde homolog"],
            ["analog", "Verilen uçuş yapıları analog"],
            ["insufficient", "Yalnız bu ölçüt kökeni belirlemez"],
          ];
  return (
    <section
      className="f093-biology-lab f093-classification"
      data-forge093="canlilarin-siniflandirilmasi"
      aria-labelledby={`${uid}-title`}
    >
      <h3 id={`${uid}-title`}>Aynı görünen ile aynı kökeni ayır</h3>
      <p>
        Kanıt değişince hangi çıkarımın mümkün olduğunu izle. Ağaç bir ilerleme
        merdiveni değildir.
      </p>
      <div
        className="f093-bio-tabs"
        role="group"
        aria-label="Sınıflandırma modeli"
      >
        {[
          ["tree", "Akrabalık ağacı"],
          ["names", "Tür adları ve basamaklar"],
          ["organs", "Organların kökeni"],
        ].map(([value, label]) => (
          <button
            key={value}
            className="secondary"
            aria-pressed={mode === value}
            onClick={() => change({ mode: value, prediction: "" })}
          >
            {label}
          </button>
        ))}
      </div>
      {mode === "tree" ? (
        <>
          <label>
            Ağaç için kanıt paketi
            <select
              value={evidence}
              onChange={(e) => change({ evidence: e.target.value })}
            >
              <option value="cell">Yalnız ökaryot hücre bilgisi</option>
              <option value="structure">
                Yapısal / embriyolojik karakterler
              </option>
              <option value="dna">
                Yapısal paket + oluşturulmuş dizi karakterleri
              </option>
            </select>
          </label>
          <p>
            Karşılaştırılan örnekler: sazan, kurbağa, kedi, kertenkele ve
            güvercin. Şekildeki bu uçlar güncel örnekleri temsil eder; biri
            diğerinin doğrudan atası diye çizilmez.
          </p>
          <TreeDrawing evidence={evidence} />
          <p className="small muted">
            Dalların uzunluğu zaman değildir; uçların soldan sağa dizilişi
            gelişmişlik sırası değildir. Çözülmemiş çizim veri sınırını
            gösterir, eşit gerçek akrabalık iddiası değildir.
          </p>
          {evidence !== "cell" && (
            <ul className="f093-bio-traits">
              <li>Beş örnekte omurga; tek başına iç sıralamayı çözmez.</li>
              <li>
                Kurbağa ve amniyotlarda atasal dört üyeli plan; kuşta ön üye
                kanada dönüşmüştür.
              </li>
              <li>
                Kedi, kertenkele ve güvercinde amniyon; grubun içini tek başına
                çözmez.
              </li>
              <li>
                Tüy ve süt bezleri farklı soyları tanır; yalnız bu ikisi
                kertenkele–kuş yakınlığını kurmaya yetmez.
              </li>
            </ul>
          )}
          {evidence === "dna" && (
            <>
              <p>
                <strong>Oluşturulmuş öğretim dizileri:</strong> altı
                karşılaştırılabilir konum; gerçek hayvanlardan ölçülmüş bir gen
                değildir.
              </p>
              <dl className="f093-bio-sequences">
                {teachingSequences.map((taxon) => (
                  <div key={taxon.name}>
                    <dt>{taxon.name}</dt>
                    <dd>{taxon.sequence}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
          <div className="f093-bio-result" data-model-result role="status">
            <strong>{inference.conclusion}</strong>
            <p>{inference.detail}</p>
          </div>
        </>
      ) : mode === "names" ? (
        <>
          <div className="f093-bio-controls">
            <label>
              Birinci canlı
              <select
                value={first.id}
                onChange={(e) => change({ first: e.target.value })}
              >
                {namedOrganisms.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.common} · {o.genus} {o.epithet}
                  </option>
                ))}
              </select>
            </label>
            <label>
              İkinci canlı
              <select
                value={second.id}
                onChange={(e) => change({ second: e.target.value })}
              >
                {namedOrganisms.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.common} · {o.genus} {o.epithet}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="f093-bio-names">
            <p>
              <strong>{first.common}:</strong>{" "}
              <i>
                {first.genus} {first.epithet}
              </i>
            </p>
            <p>
              <strong>{second.common}:</strong>{" "}
              <i>
                {second.genus} {second.epithet}
              </i>
            </p>
          </div>
          <ol className="f093-bio-ranks">
            {classificationRanks.map((rank, i) => (
              <li key={rank} className={i <= common.index ? "shared" : ""}>
                <strong>{rank}</strong>
                <span>{first.lineage[i]}</span>
                <span>{second.lineage[i]}</span>
              </li>
            ))}
          </ol>
          <div className="f093-bio-result" data-model-result role="status">
            <strong>
              En dar ortak basamak: {common.rank.toLocaleLowerCase("tr-TR")} ·{" "}
              {common.taxon}
            </strong>
            <p>{explanation}</p>
            <p>
              İlk sözcük cins, ikinci tamamlayıcı addır; iki sözcük birlikte
              bilimsel tür adını kurar.{" "}
              {first.epithet === second.epithet && first.genus !== second.genus
                ? "Burada ikinci sözcük aynı fakat cinsler ve türler farklıdır."
                : "Yakınlığı tek başına ikinci sözcüğün benzerliğiyle çıkarma."}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="f093-bio-controls">
            <label>
              Karşılaştırılan yapılar
              <select
                value={pair}
                onChange={(e) => change({ organPair: e.target.value })}
              >
                <option value="forelimbs">İnsan kolu / yarasa ön üyesi</option>
                <option value="bird-insect">Kuş kanadı / böcek kanadı</option>
                <option value="bird-bat">Kuş / yarasa ön üye planı</option>
              </select>
            </label>
            <label>
              Karşılaştırma ölçütü
              <select
                value={origin ? "origin" : "function"}
                onChange={(e) => change({ criterion: e.target.value })}
              >
                <option value="origin">Köken ve temel yapı kanıtı</option>
                <option value="function">Yalnız görev bilgisi</option>
              </select>
            </label>
          </div>
          <OriginDrawing pair={pair} />
          <div className="f093-bio-result" data-model-result role="status">
            <strong>{organConclusion}</strong>
            <p>{organExplanation}</p>
          </div>
        </>
      )}
      <Prediction
        uid={uid}
        value={saved.prediction}
        reason={saved.reason}
        checked={saved.checked}
        expected={expected}
        explanation={explanation}
        options={options}
        onValue={(value) => change({ prediction: value })}
        onReason={(value) => change({ reason: value })}
        onCheck={() => set({ checked: true })}
      />
      <p className="small muted">
        Bu çizimler ve seçimler öğretim içindir. Keşif, tahmin ve gerekçe
        saklanır; XP, soru doğrusu veya konu tamamlanması üretilmez.
      </p>
    </section>
  );
}

export default function Forge093BiologyLab({ id }: { id: string }) {
  if (id === "hucre-zarinda-madde-alisverisleri") return <MembraneLab />;
  if (id === "canlilarin-siniflandirilmasi") return <ClassificationLab />;
  return null;
}
