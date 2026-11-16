import { useId, type ReactNode } from "react";
import {
  codonA021,
  translationA021,
  sequencesA021,
  aminoNamesA021,
  pcrA021,
  photosynthesisA021,
  calvinA021,
} from "./forge021BiologyA";
import { useExploration } from "./useExploration";
import "./forge021BiologyA.css";
const fmt = (n: number, digits = 3) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(n);
const safe = (value: number, min: number, max: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;
const key = (id: string) => `forge021:biology-a:${id}`;
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
    <div className="ba021-field">
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
    <fieldset className="ba021-choice">
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
      className="ba021-svg"
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
    <section className="forge021-biology-a" data-forge021={id}>
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="ba021-note">
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
    <div className="ba021-prediction">
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
        <p className="ba021-feedback" role="status">
          {state.prediction === expected
            ? "Seçimin modelle uyumlu."
            : "Koşulu ve sonucu yeniden karşılaştır."}{" "}
          {proof}
        </p>
      )}
    </div>
  );
}
function Result({ children }: { children: ReactNode }) {
  return (
    <div className="ba021-result" data-model-result aria-live="polite">
      {children}
    </div>
  );
}
function Arrow({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1),
    d = 9;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="ba021-line" />
      <path
        d={`M${x2 - d * Math.cos(angle - 0.45)},${y2 - d * Math.sin(angle - 0.45)} L${x2},${y2} L${x2 - d * Math.cos(angle + 0.45)},${y2 - d * Math.sin(angle + 0.45)}`}
        className="ba021-line"
      />
    </g>
  );
}
function Node({
  x,
  y,
  width = 110,
  label,
  value,
  marked = false,
}: {
  x: number;
  y: number;
  width?: number;
  label: string;
  value: string;
  marked?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={84}
        rx={10}
        className={marked ? "ba021-mark" : "ba021-base"}
      />
      <text x={x + width / 2} y={y + 32} textAnchor="middle">
        {label}
      </text>
      <text x={x + width / 2} y={y + 65} textAnchor="middle">
        {value}
      </text>
    </g>
  );
}
function CodonLab() {
  const id = "ayt-kodon-antikodon",
    [s, set] = useExploration(key(id), {
      first: "A",
      second: "U",
      third: "G",
      prediction: "",
      reason: "",
      checked: false,
    }),
    valid = (b: string) => (/^[ACGU]$/.test(b) ? b : "A");
  const codon = valid(s.first) + valid(s.second) + valid(s.third),
    m = codonA021(codon),
    update = (p: Partial<typeof s>) => set({ ...p, checked: false }),
    bases = ["A", "U", "G", "C"].map((b) => [b, b] as const);
  return (
    <Frame
      id={id}
      title="Kodon eşlemi"
      intro="Standart genetik kod; mRNA 5′ → 3′. Şemada yalnız katı A–U ve G–C eşleşmesi var; wobble ve değişmiş bazlar dışarıda. Duruşta normal amino asit taşıyan tRNA çizilmez."
    >
      <Choice
        label="İlk baz"
        value={valid(s.first)}
        choices={bases}
        change={(first) => update({ first })}
      />
      <Choice
        label="İkinci baz"
        value={valid(s.second)}
        choices={bases}
        change={(second) => update({ second })}
      />
      <Choice
        label="Üçüncü baz"
        value={valid(s.third)}
        choices={bases}
        change={(third) => update({ third })}
      />
      <figure>
        <Drawing
          title="mRNA ve karşılıklı antikodonun ters yönlü baz eşlemesi"
          height={355}
        >
          <text x={150} y={30} textAnchor="middle">
            mRNA
          </text>
          <text x={18} y={100}>
            5′
          </text>
          <text x={280} y={100} textAnchor="end">
            3′
          </text>
          {[...m.codon].map((b, i) => (
            <g key={i}>
              <rect
                x={65 + 60 * i}
                y={65}
                width={50}
                height={55}
                rx={7}
                className="ba021-base"
              />
              <text x={90 + 60 * i} y={100} textAnchor="middle">
                {b}
              </text>
            </g>
          ))}
          {!m.stop ? (
            <>
              <text x={18} y={235}>
                3′
              </text>
              <text x={280} y={235} textAnchor="end">
                5′
              </text>
              {[...m.anticodonAligned!].map((b, i) => (
                <g key={i}>
                  {Array.from(
                    {
                      length: m.codon[i] === "G" || m.codon[i] === "C" ? 3 : 2,
                    },
                    (_, j) => (
                      <line
                        key={j}
                        x1={86 + 60 * i + j * 5}
                        y1={130}
                        x2={86 + 60 * i + j * 5}
                        y2={185}
                        className="ba021-reference"
                      />
                    ),
                  )}
                  <rect
                    x={65 + 60 * i}
                    y={200}
                    width={50}
                    height={55}
                    rx={7}
                    className="ba021-base"
                  />
                  <text x={90 + 60 * i} y={235} textAnchor="middle">
                    {b}
                  </text>
                </g>
              ))}
              <text x={150} y={305} textAnchor="middle">
                Antikodon
              </text>
            </>
          ) : (
            <>
              <Arrow x1={150} y1={135} x2={150} y2={200} />
              <text x={150} y={240} textAnchor="middle">
                Salım
              </text>
              <text x={150} y={280} textAnchor="middle">
                tRNA yok
              </text>
            </>
          )}
          <text
            x={150}
            y={350}
            textAnchor="middle"
            data-codon={m.codon}
            data-anticodon={m.anticodonAligned ?? "none"}
          >
            {m.amino ?? "Duruş"}
          </text>
        </Drawing>
        <figcaption>
          Karşılıklı zincirler zıt yönlüdür. Kesikli çizgiler yalnız seçili üç
          model baz çiftini gösterir; tRNA'nın tüm iç bağlarını saymaz.
        </figcaption>
      </figure>
      <Result>
        <p>
          Kodon: 5′ {m.codon} 3′. Anlam: {m.aminoName}
          {m.amino ? ` (${m.amino})` : ""}.
        </p>
        <p>
          Kodlayan DNA: 5′ {m.codingDNA} 3′; kalıp DNA: 3′ {m.templateDNA} 5′.
        </p>
        <p>
          {m.stop
            ? "Standart duruşta normal yüklü tRNA yok; salım faktörü görev yapar."
            : `Hizalı antikodon: 3′ ${m.anticodonAligned} 5′. Aynı dizinin diğer yazımı: 5′ ${m.anticodon5} 3′. Bu üç katı çiftte ${m.pairBonds} H bağı.`}
        </p>
      </Result>
      <Prediction
        state={s}
        change={set}
        choices={[
          ["amino", "Amino asit"],
          ["stop", "Duruş"],
        ]}
        expected={m.stop ? "stop" : "amino"}
        proof={`${m.codon}, standart tabloda ${m.aminoName.toLocaleLowerCase("tr-TR")} anlamına gelir. Duruş bir amino asit değildir.`}
      />
    </Frame>
  );
}
function TranslationLab() {
  const id = "ayt-protein-sentezi",
    [s, set] = useExploration(key(id), {
      sequence: "original",
      read: 0,
      prediction: "",
      reason: "",
      checked: false,
    }),
    sequence = (
      Object.hasOwn(sequencesA021, s.sequence) ? s.sequence : "original"
    ) as keyof typeof sequencesA021,
    m = translationA021(sequence, Math.round(safe(s.read, 0, 6))),
    update = (p: Partial<typeof s>) => set({ ...p, checked: false });
  const centre = Math.min(260, 38 + 56 * Math.min(m.read, m.stopIndex));
  return (
    <Frame
      id={id}
      title="Ribozom yolu"
      intro="Olgun RNA, 5′ → 3′; ilk AUG açık başlangıç, ilk çerçeve içi duruş bitiştir. Özel yeniden kodlama veya son protein işleme yok. Adım, okunan kodon sayısıdır; süre değildir."
    >
      <Choice
        label="Dizi"
        value={sequence}
        choices={Object.entries(sequencesA021).map(
          ([id, v]) => [id, v.label] as const,
        )}
        change={(sequence) => update({ sequence, read: 0 })}
      />
      <Range
        label="Okuma adımı"
        value={Math.min(m.read, m.stopIndex + 1)}
        min={0}
        max={m.stopIndex + 1}
        step={1}
        change={(read) => update({ read })}
      />
      <figure>
        <Drawing
          title="mRNA kodonları, seçili okuma yeri ve ayrı büyüyen amino asit zinciri"
          height={365}
        >
          <text x={12} y={30}>
            5′
          </text>
          <text x={288} y={30} textAnchor="end">
            3′
          </text>
          {m.codons.map((c, i) => (
            <g key={i}>
              <rect
                x={12 + i * 56}
                y={55}
                width={52}
                height={52}
                className={
                  i === Math.min(m.read, m.stopIndex)
                    ? "ba021-mark"
                    : "ba021-base"
                }
              />
              <text x={38 + i * 56} y={89} textAnchor="middle">
                {c}
              </text>
            </g>
          ))}
          <path
            d={`M${centre - 34},125 Q${centre},110 ${centre + 34},125 L${centre + 34},165 Q${centre},180 ${centre - 34},165 Z`}
            className="ba021-soft"
          />
          <text x={150} y={215} textAnchor="middle">
            N → C
          </text>
          {m.residues.length === 0 ? (
            <text x={150} y={275} textAnchor="middle">
              Ürün yok
            </text>
          ) : (
            m.residues.map((a, i) => (
              <g key={i}>
                {i > 0 && (
                  <line
                    x1={50 + 65 * (i - 1) + 14}
                    y1={260}
                    x2={50 + 65 * i - 14}
                    y2={260}
                    className="ba021-chain"
                  />
                )}
                <circle
                  cx={50 + i * 65}
                  cy={260}
                  r={14}
                  className="ba021-base"
                />
                <text x={50 + i * 65} y={306} textAnchor="middle">
                  {a}
                </text>
              </g>
            ))
          )}
          <text
            x={150}
            y={355}
            textAnchor="middle"
            data-peptide-length={m.aminoCount}
            data-released={String(m.terminated)}
          >
            {m.aminoCount} AA · {m.peptideBonds} bağ
          </text>
        </Drawing>
        <figcaption>
          RNA harfleri şablondur; daireler ayrı ürünün birimlerini temsil eder.
          Duruştan sonraki RNA üçlüleri bu ilk ürüne eklenmez. Şema büyük alt
          birimin bütün A/P/E yolunu tam ölçekle çizmez; adımlar anlatımda adım
          adım açıklanır.
        </figcaption>
      </figure>
      <Result>
        <p>
          Okunan kodon: {m.read}. Kalıntı: {m.aminoCount}; peptit bağı:{" "}
          {m.peptideBonds}; teslim olayı: {m.deliveryEvents}.
        </p>
        <p>
          Ürün:{" "}
          {m.residues.length
            ? m.residues.map((a) => aminoNamesA021[a]).join(" → ")
            : "Henüz yok"}
          .{" "}
          {m.terminated
            ? "Zincir serbest kaldı."
            : m.aminoCount
              ? "Zincir, ribozomda tRNA'ya bağlı."
              : "Daha amino asit okunmadı."}
        </p>
        <p>
          İlk duruş dahil belirtilen kodlama bölgesi {m.codingNucleotides}{" "}
          bazdır; amino asit belirten kısmı {m.translatedNucleotides} bazdır. Bu
          sayı bütün olgun RNA'nın uzunluğu değildir.
        </p>
      </Result>
      <Prediction
        state={s}
        change={set}
        choices={[
          ["none", "Henüz yok"],
          ["bound", "Taşıyıcıya bağlı"],
          ["free", "Zincir serbest"],
        ]}
        expected={m.terminated ? "free" : m.aminoCount ? "bound" : "none"}
        proof={`${m.aminoCount} kalıntı, ${m.peptideBonds} peptit bağı. ${m.terminated ? "İlk duruş okundu; salım olur." : "Henüz duruş okunmadı."} Teslim olayı, farklı tRNA sayısı demek değildir.`}
      />
    </Frame>
  );
}
function PcrLab() {
  const id = "ayt-biyoteknoloji",
    [s, set] = useExploration(key(id), {
      initial: 2,
      cycles: 3,
      match: true,
      enzyme: true,
      contamination: 0,
      prediction: "",
      reason: "",
      checked: false,
    }),
    m = pcrA021(
      Math.round(safe(s.initial, 0, 4)),
      Math.round(safe(s.cycles, 0, 8)),
      s.match,
      s.enzyme,
      Math.round(safe(s.contamination, 0, 2)),
    ),
    update = (p: Partial<typeof s>) => set({ ...p, checked: false });
  const values = Array.from(
      { length: m.cycles + 1 },
      (_, c) =>
        m.targetInitial * (m.primersMatch && m.polymeraseWorks ? 2 ** c : 1),
    ),
    top = Math.max(1, m.targetFinal),
    x = (i: number) => 40 + i * 26,
    y = (n: number) => 290 - (230 * n) / top;
  return (
    <Frame
      id={id}
      title="Hedef DNA"
      intro="Kavramsal PCR sayımı. Başlangıç DNA'ları iki ucu tanımlı tam hedef çiftlerdir. Uygun primer ve çalışan enzimde her döngü %100 iki kat artış; kayıp ve doygunluk yok. Bu, deney reçetesi, tanı veya gerçek verim tahmini değildir."
    >
      <div className="ba021-controls">
        <Range
          label="İlk hedef"
          value={m.initial}
          min={0}
          max={4}
          change={(initial) => update({ initial })}
        />
        <Range
          label="Döngü"
          value={m.cycles}
          min={0}
          max={8}
          change={(cycles) => update({ cycles })}
        />
        <Range
          label="Dış hedef"
          value={m.contamination}
          min={0}
          max={2}
          change={(contamination) => update({ contamination })}
        />
      </div>
      <Choice
        label="Primerler"
        value={m.primersMatch ? "yes" : "no"}
        choices={[
          ["yes", "Uygun"],
          ["no", "Uyumsuz"],
        ]}
        change={(v) => update({ match: v === "yes" })}
      />
      <Choice
        label="Enzim"
        value={m.polymeraseWorks ? "yes" : "no"}
        choices={[
          ["yes", "Çalışır"],
          ["no", "Çalışmaz"],
        ]}
        change={(v) => update({ enzyme: v === "yes" })}
      />
      <figure>
        <Drawing
          title="Tam hedef çift DNA sayısının döngüye göre ideal değişimi; doğrusal sayım ekseni"
          height={390}
        >
          <line x1={40} y1={290} x2={265} y2={290} className="ba021-line" />
          <line x1={40} y1={40} x2={40} y2={290} className="ba021-line" />
          <text x={30} y={295} textAnchor="end">
            0
          </text>
          <text x={40} y={30}>
            {top} DNA
          </text>
          <path
            d={values
              .map((n, i) => `${i ? "L" : "M"}${x(i)},${y(n)}`)
              .join(" ")}
            className="ba021-accent-path"
          />
          {values.map((n, i) => (
            <circle
              key={i}
              cx={x(i)}
              cy={y(n)}
              r={5}
              className="ba021-curve-marker"
            />
          ))}
          {[0, 4, 8].map((n) => (
            <text key={n} x={x(n)} y={325} textAnchor="middle">
              {n}
            </text>
          ))}
          <text
            x={150}
            y={375}
            textAnchor="middle"
            data-pcr-target={m.targetFinal}
            data-pcr-new={m.newCopies}
          >
            Döngü
          </text>
        </Drawing>
        <figcaption>
          Düşey eksen tam hedef çift DNA sayısıdır; üst sınır seçime göre
          yeniden ölçeklenir. Çizgi bir jel bandı veya cihaz sinyali değildir.
          Primer uyumsuzsa veya enzim etkin değilse yeni hedef kopyası oluşmaz;
          eski DNA silinmez.
        </figcaption>
      </figure>
      <Result>
        <p>
          Gerçek ilk hedef: {m.targetInitial}; son hedef: {m.targetFinal}; yeni
          kopya: {m.newCopies}. Çarpan: {m.multiplier}.
        </p>
        <p>
          {m.initial === 0
            ? m.contamination > 0
              ? "Başta hedefsiz kontrol dış hedefle kirlenmiş."
              : "Başta hedefsiz temiz kontrol; bu ideal modelde hedef yok."
            : "Asıl örnek seçili; kontrol koşulunu da dene."}
        </p>
        <p>
          {m.amplifies
            ? "Verilen ideal koşullarda hedef çoğalır."
            : "Bu seçimde yeni hedef kopyası yok."}{" "}
          Hedefin varlığı, gen ifadesi, kişi kimliği veya hastalık için tek
          başına kesin hüküm değildir.
        </p>
      </Result>
      <Prediction
        state={s}
        change={set}
        choices={[
          ["grow", "Yeni hedef artar"],
          ["same", "Yeni hedef yok"],
        ]}
        expected={m.newCopies > 0 ? "grow" : "same"}
        proof={`Gerçek başlangıç ${m.targetInitial}, çarpan ${m.multiplier}; son ${m.targetFinal}. İlk DNA ile son toplam ve yeni kopya ayrı sayılır.`}
      />
    </Frame>
  );
}
function PhotoGeneralLab() {
  const id = "ayt-fotosentez-genel",
    [s, set] = useExploration(key(id), {
      hexose: 1,
      label: "none",
      prediction: "",
      reason: "",
      checked: false,
    }),
    label = ["none", "waterO", "carbonC"].includes(s.label)
      ? (s.label as "none" | "waterO" | "carbonC")
      : "none",
    m = photosynthesisA021(Math.round(safe(s.hexose, 0, 4)), label),
    update = (p: Partial<typeof s>) => set({ ...p, checked: false });
  return (
    <Frame
      id={id}
      title="Maddeyi izle"
      intro="Oksijenli bitki modeli; verilen brüt toplam: 6 CO₂ + 12 H₂O → 1 heksoz eşdeğeri + 6 O₂ + 6 H₂O. Bu tek basamak değildir. Ek izotop değişimi ve solunum yok; gaz O₂'nin O atomları sudan gelir."
    >
      <Range
        label="Heksoz (mol eşdeğer)"
        value={m.hexose}
        min={0}
        max={4}
        change={(hexose) => update({ hexose })}
      />
      <Choice
        label="Atom etiketi"
        value={label}
        choices={[
          ["none", "İşaret yok"],
          ["waterO", "Su oksijeni"],
          ["carbonC", "CO₂ karbonu"],
        ]}
        change={(label) => update({ label })}
      />
      <figure>
        <Drawing
          title="Brüt fotosentezde girdiler ve çıktılar; seçili atom kaynağı ile ilgili ürün yolu işaretlidir"
          height={510}
        >
          <Node
            x={10}
            y={30}
            label="CO₂"
            value={`${m.co2} mol`}
            marked={label === "carbonC"}
          />
          <Node
            x={180}
            y={30}
            label="H₂O"
            value={`${m.waterIn} mol`}
            marked={label === "waterO"}
          />
          <Arrow x1={65} y1={114} x2={125} y2={180} />
          <Arrow x1={235} y1={114} x2={175} y2={180} />
          <Node
            x={70}
            y={180}
            width={160}
            label="Işık + düzen"
            value="Brüt bütçe"
          />
          <Arrow x1={150} y1={264} x2={65} y2={340} />
          <Arrow x1={150} y1={264} x2={235} y2={340} />
          <Node
            x={10}
            y={340}
            label="O₂"
            value={`${m.oxygen} mol`}
            marked={label === "waterO" && m.hexose > 0}
          />
          <Node
            x={180}
            y={340}
            label="Şeker"
            value={`${m.hexose} eşd.`}
            marked={label === "carbonC" && m.hexose > 0}
          />
          <text
            x={150}
            y={475}
            textAnchor="middle"
            data-photo-o2={m.oxygen}
            data-labeled-o={m.labeledGasOAtoms}
            data-labeled-c={m.labeledOrganicC}
          >
            Su çıkışı: {m.waterOut} mol
          </text>
        </Drawing>
        <figcaption>
          Çerçeve, seçili atomun kaynak–ürün bağını vurgular. Alt satır brüt
          ürün suyudur; net su tüketimi ayrı hesaplanır. Şeker, sonraki
          yollardaki heksoz eşdeğerini özetler; Calvin yolunun doğrudan tek
          ürünü diye çizilmez.
        </figcaption>
      </figure>
      <Result>
        <p>
          CO₂ girdisi {m.co2} mol; brüt su girdisi {m.waterIn} mol; su çıktısı{" "}
          {m.waterOut} mol. Net su tüketimi {m.waterNet} mol.
        </p>
        <p>
          O₂ çıktısı {m.oxygen} mol; heksoz eşdeğeri {m.hexose} mol. Gazda
          işaretli O atomu {m.labeledGasOAtoms} mol; organik üründe işaretli C
          atomu {m.labeledOrganicC} mol.
        </p>
        <p>
          C: {m.carbonIn} → {m.carbonOut} mol atom; H: {m.hydrogenIn} →{" "}
          {m.hydrogenOut}; O: {m.oxygenAtomsIn} → {m.oxygenAtomsOut}. Atomlar
          korunur; ışık atom yaratmaz.
        </p>
        <p>
          {label === "waterO"
            ? "Suyun O atomu ¹⁸O ile işaretli; belirtilen kısa modelde çıkan gaz O₂ işareti taşır."
            : label === "carbonC"
              ? "CO₂'nin C atomu ¹³C ile işaretli; organik karbon iskeletine geçer, bu işaret gaz O₂ değildir."
              : "İzotop etiketi seçili değil; kaynak ilişkisi yine aynı yola dayanır."}
        </p>
      </Result>
      <Prediction
        state={s}
        change={set}
        choices={[
          ["marked", "Gaz O₂ işaretli"],
          ["plain", "Gaz O₂ işaretsiz"],
          ["zero", "O₂ yok"],
        ]}
        expected={
          m.oxygen === 0 ? "zero" : m.labeledGasOAtoms > 0 ? "marked" : "plain"
        }
        proof={`${m.oxygen} mol O₂ içinde ${m.labeledGasOAtoms} mol işaretli O atomu var. Kaynak koşulu sudur; bir O₂ iki O atomu taşır.`}
      />
    </Frame>
  );
}
function CalvinLab() {
  const id = "ayt-fotosentez-tepkimeler",
    [s, set] = useExploration(key(id), {
      packets: 2,
      atp: 18,
      nadph: 12,
      prediction: "",
      reason: "",
      checked: false,
    }),
    m = calvinA021(
      Math.round(safe(s.packets, 0, 4)),
      Math.round(safe(s.atp, 0, 36)),
      Math.round(safe(s.nadph, 0, 24)),
    ),
    update = (p: Partial<typeof s>) => set({ ...p, checked: false }),
    activeRuBP = 3 * m.completed;
  return (
    <Frame
      id={id}
      title="Calvin bütçesi"
      intro="ATP ve NADPH kullanıma hazır stoktur; her tam net paket 3 CO₂, 9 ATP ve 6 NADPH ile 1 net PGAL üretir, RuBP'yi yeniler. Başka süreç veya taşıyıcı yenileme yok. Yalnız tam paket sayılır; kısmi ara ürünler ve zaman hızı bu modelde yok."
    >
      <div className="ba021-controls">
        <Range
          label="CO₂ paketi (3 mol)"
          value={m.co2Packets}
          min={0}
          max={4}
          change={(packets) => update({ packets })}
        />
        <Range
          label="ATP (mol)"
          value={m.atp}
          min={0}
          max={36}
          change={(atp) => update({ atp })}
        />
        <Range
          label="NADPH (mol)"
          value={m.nadph}
          min={0}
          max={24}
          change={(nadph) => update({ nadph })}
        />
      </div>
      <figure>
        <Drawing
          title="Tamamlanan paketlerde karbon bağlama, altı ara trioz, net çıkış ve alıcı yenileme; sayılar mol"
          height={665}
        >
          <Node x={10} y={20} label="RuBP" value={`${activeRuBP} × 5 C`} />
          <Node x={180} y={20} label="CO₂" value={`${m.co2Used} × 1 C`} />
          <Arrow x1={65} y1={104} x2={125} y2={160} />
          <Arrow x1={235} y1={104} x2={175} y2={160} />
          <Node
            x={85}
            y={160}
            width={130}
            label="PGA"
            value={`${m.trioseGross} × 3 C`}
          />
          <Arrow x1={150} y1={244} x2={150} y2={300} />
          <Node
            x={85}
            y={300}
            width={130}
            label="PGAL"
            value={`${m.trioseGross} × 3 C`}
          />
          <Arrow x1={150} y1={384} x2={65} y2={445} />
          <Arrow x1={150} y1={384} x2={235} y2={445} />
          <Node
            x={10}
            y={445}
            label="Net"
            value={`${m.netTriose} × 3 C`}
            marked={m.netTriose > 0}
          />
          <Node
            x={180}
            y={445}
            label="Geri"
            value={`${m.trioseRegenerated} × 3 C`}
          />
          <Arrow x1={235} y1={529} x2={235} y2={570} />
          <text
            x={235}
            y={605}
            textAnchor="middle"
            data-calvin-net={m.netTriose}
            data-calvin-atp={m.atpUsed}
          >
            {activeRuBP} RuBP
          </text>
          <text x={150} y={655} textAnchor="middle">
            Sayılar mol
          </text>
        </Drawing>
        <figcaption>
          Şema yalnız biten paketlerin karbon yoludur: bir net PGAL için beş
          PGAL, üç RuBP'yi geri kurar. Başta boşta kalan RuBP stoğu ayrıca
          kalır; sıfır paket, gerçek hücrede bütün ilk ara adımlar imkânsız
          demek değildir.
        </figcaption>
      </figure>
      <Result>
        <p>
          Biten paket {m.completed}; net PGAL {m.netTriose} mol; heksoz
          eşdeğeri {fmt(m.hexoseEquivalent, 1)} mol.
        </p>
        <p>
          Kullanılan: CO₂ {m.co2Used} mol, ATP {m.atpUsed} mol, NADPH{" "}
          {m.nadphUsed} mol. Kalan: CO₂ {m.co2Left} mol, ATP {m.atpLeft} mol,
          NADPH {m.nadphLeft} mol.
        </p>
        <p>
          Başlangıç RuBP {m.rubpInitial} mol; toplam son RuBP {m.rubpFinal} mol.
          Karbon hesabı: {m.carbonIn} → {m.carbonOut} mol C; bu toplam başlangıç
          alıcısını ve kullanılan yeni CO₂'yi içerir.
        </p>
        <p>
          ATP enerjiyi, NADPH indirgeme gücünü sağlar. Hazır stok verisi, ışığın
          yeni stok üretiyor olmasıyla aynı bilgi değildir.
        </p>
      </Result>
      <Prediction
        state={s}
        change={set}
        choices={[
          ["zero", "Tam paket yok"],
          ["one", "Bir tam paket"],
          ["many", "Birden çok paket"],
        ]}
        expected={
          m.completed === 0 ? "zero" : m.completed === 1 ? "one" : "many"
        }
        proof={`CO₂ en çok ${m.co2Packets}, ATP ${Math.floor(m.atp / 9)}, NADPH ${Math.floor(m.nadph / 6)} tam paket sağlar. En küçük kapasite ${m.completed}; artan stoklar korunur.`}
      />
    </Frame>
  );
}
export default function Forge021BiologyALab({
  lessonId,
}: {
  lessonId: string;
}) {
  switch (lessonId) {
    case "ayt-kodon-antikodon":
      return <CodonLab />;
    case "ayt-protein-sentezi":
      return <TranslationLab />;
    case "ayt-biyoteknoloji":
      return <PcrLab />;
    case "ayt-fotosentez-genel":
      return <PhotoGeneralLab />;
    case "ayt-fotosentez-tepkimeler":
      return <CalvinLab />;
    default:
      return null;
  }
}
