import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  asexualScenario,
  asexualScenarios,
  crossoverProducts,
  divisionSnapshot,
  filterInvertebrates,
  independentProducts,
  invertebrateEvidence,
  invertebrateSamples,
  meiosisStages,
  mitosisStages,
  synchronousGrowth,
  vertebrateSample,
  vertebrateSamples,
} from "./forge011BiologyB";
import "./forge011BiologyB.css";

const clampInt = (value: number, min: number, max: number) =>
  Number.isFinite(value)
    ? Math.max(min, Math.min(max, Math.round(value)))
    : min;
function Prediction({
  value,
  reason,
  checked,
  expected,
  options,
  explanation,
  onChange,
}: {
  value: string;
  reason: string;
  checked: boolean;
  expected: string;
  options: [string, string][];
  explanation: string;
  onChange: (change: {
    answer?: string;
    reason?: string;
    checked?: boolean;
  }) => void;
}) {
  const uid = useId();
  const valid = options.some(([id]) => id === value);
  return (
    <div className="bio011b-prediction">
      <label htmlFor={`${uid}-guess`}>Sonuç tahminin</label>
      <select
        id={`${uid}-guess`}
        value={valid ? value : ""}
        onChange={(e) => onChange({ answer: e.target.value, checked: false })}
      >
        <option value="">Bir sonuç seç</option>
        {options.map(([id, label]) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
      <label htmlFor={`${uid}-reason`}>Gerekçen</label>
      <textarea
        id={`${uid}-reason`}
        rows={3}
        maxLength={120}
        value={reason.slice(0, 120)}
        onChange={(e) =>
          onChange({ reason: e.target.value.slice(0, 120), checked: false })
        }
        placeholder="Kullandığın yapıyı, sayımı veya koşulu yaz…"
      />
      <button
        className="secondary"
        disabled={!valid || !reason.trim()}
        onClick={() => onChange({ checked: true })}
      >
        Tahminimi karşılaştır
      </button>
      {checked && valid && (
        <div className="bio011b-feedback" role="status">
          <strong>
            {value === expected
              ? "Seçimin bu modeldeki kanıtla uyumlu."
              : "Seçimini kanıtla yeniden karşılaştır."}
          </strong>
          <p>{explanation}</p>
          <p>Gerekçen: {reason.slice(0, 120)}</p>
          <p className="small muted">
            Yazdığın gerekçe otomatik puanlanmaz. Bu keşif bağımsız soru sonucu
            veya konu tamamlanması oluşturmaz.
          </p>
        </div>
      )}
    </div>
  );
}
function InvertebrateShape({ id }: { id: string }) {
  if (id === "sponge")
    return (
      <g>
        <path
          d="M-20 26 Q-34-30-10-26 Q4-36 18-18 Q31 0 22 26Z"
          className="bio011b-fill"
        />
        {[-12, 0, 12].map((x) => (
          <g key={x}>
            <circle cx={x} cy={-8} r="2.5" />
            <circle cx={x + 3} cy={12} r="2.5" />
          </g>
        ))}
      </g>
    );
  if (id === "hydra")
    return (
      <g>
        <path
          d="M-8 25 Q-15 0-6-13 L6-13 Q15 0 8 25Z"
          className="bio011b-fill"
        />
        {[-24, -12, 0, 12, 24].map((x) => (
          <path key={x} d={`M0-12 Q${x / 2}-26 ${x}-29`} fill="none" />
        ))}
      </g>
    );
  if (["flatworm", "roundworm", "earthworm", "centipede"].includes(id))
    return (
      <g>
        <path
          d="M-30 13 Q-15-22 0 0 Q17 24 29-14"
          strokeWidth={id === "roundworm" ? 5 : 13}
          fill="none"
          strokeLinecap="round"
        />
        {["earthworm", "centipede"].includes(id) &&
          [-22, -10, 4, 18].map((x) => (
            <path
              key={x}
              d={`M${x}-12 l-4 24 ${id === "centipede" ? "m-4-18 l-9-8 m11 15 l9 9" : ""}`}
              className="bio011b-detail"
            />
          ))}
      </g>
    );
  if (id === "mussel")
    return (
      <g>
        <path
          d="M-30 15 Q-27-35 3-27 Q36-22 30 15 Q0 34-30 15Z"
          className="bio011b-fill"
        />
        {[-15, 0, 15].map((x) => (
          <path key={x} d={`M0 20 Q${x * 2}-10 ${x}-23`} fill="none" />
        ))}
      </g>
    );
  if (id === "octopus")
    return (
      <g>
        <ellipse cx="0" cy="-8" rx="17" ry="21" className="bio011b-fill" />
        {[-35, -25, -15, -5, 5, 15, 25, 35].map((x) => (
          <path
            key={x}
            data-octopus-arm
            d={`M${x / 3} 8 Q${x} ${30 + Math.abs(x) / 8} ${x + (x < 0 ? -5 : 5)} 18`}
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}
      </g>
    );
  if (id === "starfish")
    return (
      <path
        d="M0-31 9-10 31-10 14 5 21 28 0 15-21 28-14 5-31-10-9-10Z"
        className="bio011b-fill"
      />
    );
  const legs = id === "spider" ? 4 : id === "crab" ? 5 : 3;
  return (
    <g>
      <ellipse
        rx={id === "crab" ? 22 : 12}
        ry={id === "crab" ? 15 : 23}
        className="bio011b-fill"
      />
      {Array.from({ length: legs }, (_, i) => {
        const y = -15 + i * (30 / (legs - 1));
        return (
          <g key={i}>
            <path d={`M-9 ${y} l-13-6-10 12 M9 ${y} l13-6 10 12`} fill="none" />
          </g>
        );
      })}
      {id !== "spider" && <path d="M-5-19 l-10-13 M5-19 l10-13" fill="none" />}
    </g>
  );
}
function Invertebrates() {
  const uid = useId();
  const [s, set] = useExploration("forge011-bio-b-omurgasizlar", {
    first: "all",
    second: "all",
    answer: "",
    reason: "",
    checked: false,
  });
  const first = invertebrateEvidence.some((e) => e.id === s.first)
    ? s.first
    : "all";
  const second = invertebrateEvidence.some((e) => e.id === s.second)
    ? s.second
    : "all";
  const matches = filterInvertebrates(first, second);
  const active = new Set(matches.map((m) => m.id));
  const expected =
    matches.length === 0 ? "none" : matches.length === 1 ? "one" : "several";
  return (
    <>
      <h3>Kanıt süzgeci: ortak özellik ne kadar ayırır?</h3>
      <p>
        İki gözlem seç. Şemadaki örneklerden hangilerinin iki koşulu birlikte
        sağlayabildiğini incele. Bu çizimler sınırlı okul örnekleridir;
        filogenetik ağaç veya bütün türlerin listesi değildir.
      </p>
      <div className="bio011b-controls">
        {(["first", "second"] as const).map((key, i) => (
          <label key={key} htmlFor={`${uid}-${key}`}>
            {i + 1}. yapısal kanıt
            <select
              id={`${uid}-${key}`}
              value={key === "first" ? first : second}
              onChange={(e) => set({ [key]: e.target.value, checked: false })}
            >
              {invertebrateEvidence.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <svg
        className="bio011b-drawing"
        viewBox="0 0 600 340"
        role="img"
        aria-labelledby={`${uid}-title ${uid}-desc`}
      >
        <title id={`${uid}-title`}>Omurgasız kanıt eşleştirmesi</title>
        <desc id={`${uid}-desc`}>
          {matches.length} örnek iki koşula uyuyor. Adlar ve sonuçlar şeklin
          altında aynı sırayla bulunur.
        </desc>
        {invertebrateSamples.map((sample, i) => (
          <g
            key={sample.id}
            data-specimen={sample.id}
            data-matches={active.has(sample.id)}
            transform={`translate(${75 + (i % 4) * 150} ${57 + Math.floor(i / 4) * 110})`}
            className={active.has(sample.id) ? "bio011b-match" : "bio011b-dim"}
          >
            <rect
              x="-60"
              y="-47"
              width="120"
              height="92"
              rx="18"
              className="bio011b-card"
            />
            <InvertebrateShape id={sample.id} />
          </g>
        ))}
      </svg>
      <div className="bio011b-result" data-model-result>
        <strong>{matches.length} uyumlu örnek</strong>
        <p>
          {matches.length
            ? matches.map((m) => `${m.name} (${m.group})`).join("; ")
            : "Bu örnek paketinde iki kanıtı birlikte sağlayan canlı yok. Bu sonuç bütün doğada yokluk kanıtı değildir."}
        </p>
        <p>{invertebrateEvidence.find((e) => e.id === first)!.reason}</p>
        {second !== "all" && (
          <p>{invertebrateEvidence.find((e) => e.id === second)!.reason}</p>
        )}
      </div>
      <ol className="bio011b-sample-list">
        {invertebrateSamples.map((sample) => (
          <li key={sample.id}>
            {sample.name}:{" "}
            {active.has(sample.id)
              ? "iki koşula uyuyor"
              : "bu iki koşula birlikte uymuyor"}
          </li>
        ))}
      </ol>
      <Prediction
        value={s.answer}
        reason={s.reason}
        checked={s.checked}
        expected={expected}
        options={[
          ["none", "Bu pakette aday kalmaz"],
          ["one", "Tek örnek kalır"],
          ["several", "Birden çok örnek kalır"],
        ]}
        explanation={`${matches.length} örnek kaldı. Yalnız geniş ortaklıklar çoğu zaman alt grubu seçtirmez; daha özgül ikinci kanıt gerekir.`}
        onChange={set}
      />
    </>
  );
}
function Vertebrates() {
  const uid = useId();
  const [s, set] = useExploration("forge011-bio-b-omurgalilar", {
    sample: "carp",
    system: "heart",
    answer: "",
    reason: "",
    checked: false,
  });
  const sample = vertebrateSample(
    vertebrateSamples.some((v) => v.id === s.sample) ? s.sample : "carp",
  );
  const system = ["heart", "respiration", "cover", "reproduction"].includes(
    s.system,
  )
    ? s.system
    : "heart";
  const systems = {
    heart: "Dolaşım",
    respiration: "Solunum",
    cover: "Vücut örtüsü",
    reproduction: "Üreme ve gelişme",
  };
  const detail =
    system === "heart"
      ? `${sample.heart} ana kalp odacığı; ${sample.thermal}`
      : system === "respiration"
        ? sample.respiration
        : system === "cover"
          ? sample.cover
          : sample.reproduction;
  return (
    <>
      <h3>Habitatı değil, sistemi karşılaştır</h3>
      <p>
        Örneği ve incelenecek sistemi değiştir. Renkli organ şeması seçtiğin
        özelliği vurgular; gerçek organ ölçeğini veya bütün damarları göstermez.
      </p>
      <div className="bio011b-controls">
        <label htmlFor={`${uid}-sample`}>
          İncelenen omurgalı
          <select
            id={`${uid}-sample`}
            value={sample.id}
            onChange={(e) => set({ sample: e.target.value, checked: false })}
          >
            {vertebrateSamples.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={`${uid}-system`}>
          Gösterilen sistem
          <select
            id={`${uid}-system`}
            value={system}
            onChange={(e) => set({ system: e.target.value, checked: false })}
          >
            {Object.entries(systems).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <svg
        className="bio011b-drawing"
        viewBox="0 0 600 260"
        role="img"
        aria-labelledby={`${uid}-title`}
        data-vertebrate={sample.id}
        data-system={system}
      >
        <title id={`${uid}-title`}>
          {sample.name}: {detail}
        </title>
        <path
          d={
            sample.id === "carp" || sample.id === "dolphin"
              ? "M60 130 Q140 40 320 90 L420 40 400 130 420 220 320 170 Q140 220 60 130Z"
              : sample.id === "penguin"
                ? "M140 206 Q88 130 137 60 Q176 15 221 65 Q270 145 228 206Z"
                : ["lizard", "crocodile"].includes(sample.id)
                  ? "M55 132 Q135 65 300 110 L440 88 395 133 440 155 300 160 Q180 205 55 132Z"
                  : "M75 175 Q70 75 155 80 Q190 22 230 68 L258 121 390 155 346 205 270 193 190 205 130 198Z"
          }
          className="bio011b-body"
        />
        <circle
          cx={sample.id === "carp" || sample.id === "dolphin" ? 90 : 202}
          cy={sample.id === "penguin" ? 76 : 108}
          r="5"
          fill="currentColor"
        />
        {system === "heart" && (
          <g transform="translate(235 135)">
            {Array.from({ length: sample.heart }, (_, i) => (
              <rect
                key={i}
                data-heart-chamber
                x={(i % 2) * 35 - 35}
                y={Math.floor(i / 2) * 35 - 35}
                width="30"
                height="30"
                rx="9"
                className="bio011b-organ"
              />
            ))}
          </g>
        )}
        {system === "respiration" &&
          (sample.id === "carp" ? (
            <g>
              {[115, 130, 145].map((x) => (
                <path
                  key={x}
                  d={`M${x} 95 Q${x + 22} 130 ${x} 165`}
                  className="bio011b-organ-line"
                />
              ))}
            </g>
          ) : (
            <g>
              <path
                d="M220 84 V115 M220 106 Q170 100 176 160 Q198 189 215 155 M220 106 Q268 100 266 160 Q245 189 225 155"
                className="bio011b-organ-line"
              />
              {sample.id === "penguin" && (
                <g>
                  <ellipse
                    cx="160"
                    cy="167"
                    rx="19"
                    ry="26"
                    className="bio011b-air"
                  />
                  <ellipse
                    cx="283"
                    cy="167"
                    rx="19"
                    ry="26"
                    className="bio011b-air"
                  />
                </g>
              )}
            </g>
          ))}
        {system === "cover" && (
          <g>
            {Array.from({ length: 7 }, (_, i) => (
              <path
                key={i}
                d={`M${120 + i * 25} 150 l-9-15 m9 15 l9-15`}
                className="bio011b-organ-line"
              />
            ))}
          </g>
        )}
        {system === "reproduction" && (
          <g>
            <ellipse
              cx="220"
              cy="145"
              rx="24"
              ry="31"
              className="bio011b-organ"
            />
            <circle cx="220" cy="145" r="10" className="bio011b-air" />
            {["bat", "dolphin", "platypus"].includes(sample.id) && (
              <path
                d="M290 185 q10-15 20 0 m5 0 q10-15 20 0"
                className="bio011b-organ-line"
              />
            )}
          </g>
        )}
      </svg>
      <div className="bio011b-result" data-model-result>
        <strong>
          {sample.name} · {sample.group}
        </strong>
        <p>
          {systems[system as keyof typeof systems]}: {detail}.
        </p>
        <p>{sample.clue}</p>
        <p className="small muted">
          Semboller: renkli bölmeler kalp odacıklarını, kavisli çizgiler gaz
          alışverişi organını, yumurta biçimi gelişme konusunu temsil eder. Örtü
          panelindeki işaretler gerçek pul/tüy/kıl mikroyapısı değildir; kesin
          yapı adı yukarıdadır.
        </p>
      </div>
      <Prediction
        value={s.answer}
        reason={s.reason}
        checked={s.checked}
        expected={sample.group}
        options={[
          "Balıklar",
          "İki yaşamlılar",
          "Sürüngenler",
          "Kuşlar",
          "Memeliler",
        ].map((name) => [name, name])}
        explanation={`${sample.name}: ${sample.group}. ${sample.clue}`}
        onChange={set}
      />
    </>
  );
}

function Chromosome({
  x,
  y,
  duplicated,
  color,
  size = 12,
}: {
  x: number;
  y: number;
  duplicated: boolean;
  color: string;
  size?: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      data-chromosome
      data-duplicated={duplicated}
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
    >
      <path
        d={
          duplicated
            ? `M-7 ${-size} L7 ${size} M7 ${-size} L-7 ${size}`
            : `M0 ${-size} L0 ${size}`
        }
      />
      <circle r="3" stroke="none" fill="var(--text)" />
    </g>
  );
}
function DivisionDrawing({
  kind,
  stage,
  diploid,
  plant,
  uid,
}: {
  kind: "mitosis" | "meiosis";
  stage: number;
  diploid: number;
  plant: boolean;
  uid: string;
}) {
  const snapshot = divisionSnapshot(kind, stage, diploid);
  const separated =
    kind === "mitosis" ? stage >= 4 && stage < 6 : stage === 4 || stage === 7;
  const duplicated =
    stage > 0 && !(kind === "mitosis" ? stage >= 4 : stage >= 7);
  const oneCellWidth = snapshot.cells === 1 ? 520 : 250;
  const oneCellHeight = snapshot.cells === 4 ? 135 : 230;
  const totalHeight = snapshot.cells === 4 ? 330 : 280;
  const perPole = snapshot.poleChromosomes ?? snapshot.chromosomes;
  const stages = kind === "mitosis" ? mitosisStages : meiosisStages;
  return (
    <svg
      className="bio011b-drawing"
      viewBox={`0 0 600 ${totalHeight}`}
      role="img"
      aria-labelledby={`${uid}-drawing-title ${uid}-drawing-desc`}
      data-division-stage={stage}
      data-cell-type={plant ? "plant" : "animal"}
    >
      <title id={`${uid}-drawing-title`}>
        {stages[stage]}: {snapshot.cells} hücre
      </title>
      <desc id={`${uid}-drawing-desc`}>
        X biçimi iki kardeşli tek kromozomdur; çubuk bir DNA’lı kromozomdur.
        Renk homolog kökenini temsil eder. Sayısal sonuçlar aşağıda hücre ve
        kutup alanıyla yazılıdır.
      </desc>
      {Array.from({ length: snapshot.cells }, (_, cell) => {
        const cx = snapshot.cells === 1 ? 300 : (cell % 2) * 285 + 157;
        const cy = snapshot.cells === 4 ? Math.floor(cell / 2) * 155 + 85 : 140;
        const start = 2;
        const meta =
          kind === "mitosis"
            ? stage === 3
            : stage === 2 || stage === 3 || stage === 6;
        return (
          <g key={cell} transform={`translate(${cx} ${cy})`} data-cell>
            <rect
              x={-oneCellWidth / 2}
              y={-oneCellHeight / 2}
              width={oneCellWidth}
              height={oneCellHeight}
              rx={plant ? 12 : oneCellHeight / 2}
              className="bio011b-cell"
            />
            {stage === 0 && (
              <ellipse
                rx={oneCellWidth * 0.3}
                ry={oneCellHeight * 0.38}
                className="bio011b-nuclear"
              />
            )}
            {((kind === "mitosis" && stage >= start && stage <= 4) ||
              (kind === "meiosis" &&
                stage >= start &&
                stage <= 7 &&
                stage !== 5)) && (
              <g className="bio011b-spindle">
                <path
                  d={`M${-oneCellWidth * 0.42} 0 L0 ${-oneCellHeight * 0.34} L${oneCellWidth * 0.42} 0 L0 ${oneCellHeight * 0.34}Z`}
                />
                <path
                  d={`M${-oneCellWidth * 0.42} 0 H${oneCellWidth * 0.42}`}
                />
              </g>
            )}
            {kind === "mitosis" && stage === 5 && (
              <g>
                <ellipse
                  cx={-oneCellWidth * 0.25}
                  rx={oneCellWidth * 0.19}
                  ry={oneCellHeight * 0.36}
                  className="bio011b-nuclear"
                />
                <ellipse
                  cx={oneCellWidth * 0.25}
                  rx={oneCellWidth * 0.19}
                  ry={oneCellHeight * 0.36}
                  className="bio011b-nuclear"
                />
                {plant ? (
                  <path d="M0-48 V48" className="bio011b-plate" />
                ) : (
                  <path
                    d={`M0 ${-oneCellHeight / 2} Q-36-54 0-25 M0 ${oneCellHeight / 2} Q36 54 0 25`}
                    className="bio011b-cleavage"
                  />
                )}
              </g>
            )}
            {Array.from({ length: separated ? 2 : 1 }, (_, side) => {
              const count = separated ? perPole : snapshot.chromosomes;
              return Array.from({ length: count }, (_, index) => {
                const n = diploid / 2;
                const family =
                  kind === "meiosis" && stage >= 4
                    ? index
                    : Math.floor(index / 2);
                const parent =
                  kind === "meiosis" && stage >= 5
                    ? (stage === 8 ? Math.floor(cell / 2) : cell) % 2
                    : index % 2;
                const color = parent === 0 ? "var(--accent)" : "var(--mint)";
                let x =
                  ((index % 4) - (Math.min(count, 4) - 1) / 2) *
                  (oneCellWidth / 7);
                let y =
                  (Math.floor(index / 4) - (Math.ceil(count / 4) - 1) / 2) * 52;
                if (meta) {
                  x =
                    kind === "meiosis" && (stage === 2 || stage === 3)
                      ? index % 2
                        ? 18
                        : -18
                      : 0;
                  y =
                    (Math.floor(
                      index /
                        (kind === "meiosis" && (stage === 2 || stage === 3)
                          ? 2
                          : 1),
                    ) -
                      ((kind === "meiosis" && (stage === 2 || stage === 3)
                        ? n
                        : count) -
                        1) /
                        2) *
                    (oneCellHeight /
                      (kind === "meiosis" && (stage === 2 || stage === 3)
                        ? n + 1
                        : count + 1));
                }
                if (separated) {
                  x = (side === 0 ? -1 : 1) * oneCellWidth * 0.27;
                  y = (index - (count - 1) / 2) * (oneCellHeight / (count + 1));
                }
                const displayColor =
                  kind === "meiosis" && stage === 4
                    ? side === 0
                      ? "var(--accent)"
                      : "var(--mint)"
                    : color;
                return (
                  <Chromosome
                    key={`${side}-${index}`}
                    x={x}
                    y={y}
                    duplicated={duplicated}
                    color={displayColor}
                    size={count > 6 ? 8 - family * 0.7 : 13 - family * 2}
                  />
                );
              });
            })}
          </g>
        );
      })}
    </svg>
  );
}
function Division({ meiosis }: { meiosis: boolean }) {
  const uid = useId();
  const id = meiosis ? "mayoz" : "mitoz";
  const [s, set] = useExploration(`forge011-bio-b-${id}`, {
    stage: 0,
    diploid: 4,
    plant: false,
    geneticMode: "assortment",
    geneticSwitch: false,
    answer: "",
    reason: "",
    checked: false,
  });
  const stages = meiosis ? meiosisStages : mitosisStages;
  const stage = clampInt(s.stage, 0, stages.length - 1);
  const diploid = [2, 4, 6, 8].includes(s.diploid) ? s.diploid : 4;
  const kind = meiosis ? "meiosis" : "mitosis";
  const snapshot = divisionSnapshot(kind, stage, diploid);
  const products =
    s.geneticMode === "crossover"
      ? crossoverProducts(s.geneticSwitch)
      : independentProducts(s.geneticSwitch);
  const expected =
    snapshot.dnaC === 4 ? "4C" : snapshot.dnaC === 2 ? "2C" : "C";
  return (
    <>
      <h3>
        {meiosis
          ? "Bir eşlenmeden iki bölünmeye"
          : "Kromozomu kopyasıyla karıştırmadan izle"}
      </h3>
      <p>
        Evrenin adını, X veya çubuk biçimini ve sayım alanını birlikte izle. Her
        kare normal dengeli ayrılmayı gösterir. C, eşlenmemiş haploit takımın
        DNA miktarıdır; kromozom adedi değildir.
      </p>
      <div className="bio011b-controls">
        <label htmlFor={`${uid}-diploid`}>
          Başlangıç kromozom sayısı (2n)
          <select
            id={`${uid}-diploid`}
            value={diploid}
            onChange={(e) =>
              set({ diploid: Number(e.target.value), checked: false })
            }
          >
            {[2, 4, 6, 8].map((v) => (
              <option key={v} value={v}>
                2n = {v}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={`${uid}-stage`}>
          İncelenen evre
          <select
            id={`${uid}-stage`}
            value={stage}
            onChange={(e) =>
              set({ stage: Number(e.target.value), checked: false })
            }
          >
            {stages.map((name, i) => (
              <option key={name} value={i}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="bio011b-check">
        <input
          type="checkbox"
          checked={s.plant}
          onChange={(e) => set({ plant: e.target.checked })}
        />
        Bitki hücresi bölme biçimini göster
      </label>
      <div className="bio011b-actions">
        <button
          className="secondary"
          disabled={stage === 0}
          onClick={() => set({ stage: stage - 1, checked: false })}
        >
          Önceki evre
        </button>
        <button
          className="secondary"
          disabled={stage === stages.length - 1}
          onClick={() => set({ stage: stage + 1, checked: false })}
        >
          Sonraki evre
        </button>
      </div>
      <DivisionDrawing
        kind={kind}
        stage={stage}
        diploid={diploid}
        plant={s.plant}
        uid={uid}
      />
      <div className="bio011b-result" data-model-result>
        <strong>
          {stages[stage]} · {snapshot.cells} ayrı hücre
        </strong>
        <p>
          İzlenen tek hücre: {snapshot.chromosomes} kromozom,{" "}
          {snapshot.dnaMolecules} çekirdek DNA molekülü ve{" "}
          {snapshot.dnaC === 1 ? "C" : `${snapshot.dnaC}C`} DNA miktarı.
        </p>
        {snapshot.poleChromosomes !== undefined && (
          <p>
            Tek kutup/çekirdek bölgesi: {snapshot.poleChromosomes} kromozom ve{" "}
            {snapshot.poleDnaMolecules} DNA molekülü.
          </p>
        )}
        <p>
          Bütün izlenen hücrelerde toplam: {snapshot.totalDnaMolecules} çekirdek
          DNA molekülü.
        </p>
        <p>{snapshot.statement}</p>
        <p className="small muted">
          Şekiller ölçekli değildir. Çeper/zar ve kromozom renkleri öğretim
          işaretleridir; yeni mutasyon, ayrılmama veya organel DNA’sı
          modellenmez.
        </p>
      </div>
      {meiosis && (
        <div className="bio011b-genetics">
          <h4>Çeşitliliğin iki kaynağını ayrı dene</h4>
          <label htmlFor={`${uid}-genetics`}>
            İşaretlerin modeli
            <select
              id={`${uid}-genetics`}
              value={s.geneticMode === "crossover" ? "crossover" : "assortment"}
              onChange={(e) =>
                set({ geneticMode: e.target.value, geneticSwitch: false })
              }
            >
              <option value="assortment">
                Ayrı çiftlerde bağımsız dağılım
              </option>
              <option value="crossover">
                Aynı homolog çiftte parça değişimi
              </option>
            </select>
          </label>
          <label className="bio011b-check">
            <input
              type="checkbox"
              checked={s.geneticSwitch}
              onChange={(e) => set({ geneticSwitch: e.target.checked })}
            />
            {s.geneticMode === "crossover"
              ? "A ile B arasında tek karşılıklı değişim yap"
              : "İkinci homolog çiftin yönünü ters çevir"}
          </label>
          <svg
            className="bio011b-drawing"
            viewBox="0 0 600 150"
            role="img"
            aria-labelledby={`${uid}-genes-title`}
          >
            <title id={`${uid}-genes-title`}>
              Bu modelin dört ürünündeki işaretler: {products.join(", ")}
            </title>
            {products.map((product, i) => (
              <g key={i} transform={`translate(${75 + i * 150} 75)`}>
                <rect
                  x="-40"
                  y="-55"
                  width="80"
                  height="110"
                  rx="25"
                  className="bio011b-cell"
                />
                {[0, 1].map((gene) => (
                  <g key={gene}>
                    <path
                      d={
                        s.geneticMode === "crossover"
                          ? `M0 ${gene === 0 ? -30 : 0} v30`
                          : `M${gene === 0 ? -14 : 14} ${gene === 0 ? -18 : -30} v${gene === 0 ? 36 : 60}`
                      }
                      stroke={
                        product[gene] === product[gene].toUpperCase()
                          ? "var(--accent)"
                          : "var(--mint)"
                      }
                      strokeWidth="10"
                    />
                    <circle
                      cx={
                        s.geneticMode === "crossover"
                          ? 0
                          : gene === 0
                            ? -14
                            : 14
                      }
                      cy={
                        s.geneticMode === "crossover"
                          ? gene === 0
                            ? -17
                            : 17
                          : 0
                      }
                      r="4"
                      fill="var(--text)"
                    />
                  </g>
                ))}
              </g>
            ))}
          </svg>
          <p className="bio011b-products">
            Dört ürünün işaretleri: <strong>{products.join(" · ")}</strong>.
          </p>
          <p>
            {s.geneticMode === "crossover"
              ? "Burada A ve B aynı kromozom üzerindeki iki işarettir. Tek tetratın AB,AB ve ab,ab kardeşlerinden yalnız ikisi A-B arasındaki karşılıklı değişime katılır; diğer ikisi korunur. Her hücredeki tek sürekli çubuğun üst ve alt renkli bölgeleri A ve B işaretlerini gösterir; bunlar iki ayrı kromozom değildir."
              : "Burada A/a ve B/b iki ayrı kromozom çiftinin işaretleridir; parça değişimi yoktur. Tek olayda iki bileşim ikişer kez çıkabilir. Bütün yönelimlerde olası küme AB, Ab, aB, ab olsa da tek mayozun dört farklı ürün vermesi zorunlu değildir."}
          </p>
        </div>
      )}
      <Prediction
        value={s.answer}
        reason={s.reason}
        checked={s.checked}
        expected={expected}
        options={[
          ["C", "İzlenen tek hücrede C"],
          ["2C", "İzlenen tek hücrede 2C"],
          ["4C", "İzlenen tek hücrede 4C"],
        ]}
        explanation={`Bu evrede izlenen tek hücre ${expected} taşır. ${snapshot.statement}`}
        onChange={set}
      />
    </>
  );
}
function Asexual() {
  const uid = useId();
  const [s, set] = useExploration("forge011-bio-b-eseysiz-ureme", {
    sample: "bud",
    step: 0,
    initial: 3,
    rounds: 2,
    answer: "",
    reason: "",
    checked: false,
  });
  const sample = asexualScenario(
    asexualScenarios.some((v) => v.id === s.sample) ? s.sample : "bud",
  );
  const step = clampInt(s.step, 0, 3);
  const initial = clampInt(s.initial, 1, 6),
    rounds = clampInt(s.rounds, 0, 4);
  const growth = synchronousGrowth(initial, rounds, 0, 0);
  const expected = !sample.newIndividual
    ? "not"
    : sample.fertilization
      ? "sexual"
      : "asexual";
  return (
    <>
      <h3>Yeni birey mi, aynı bireyin onarımı mı?</h3>
      <p>
        Bir olay seç ve üç adımda sonucu izle. Sonra döllenme ile birey artışını
        iki ayrı kanıt olarak değerlendir. Tohum örneği karşılaştırma içindir;
        eşeysiz listesine eklenmez.
      </p>
      <label htmlFor={`${uid}-sample`}>
        İzlenecek çoğalma veya onarım olayı
        <select
          id={`${uid}-sample`}
          value={sample.id}
          onChange={(e) =>
            set({ sample: e.target.value, step: 0, checked: false })
          }
        >
          {asexualScenarios.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </label>
      <div className="bio011b-actions">
        <button
          className="secondary"
          disabled={step === 0}
          onClick={() => set({ step: step - 1, checked: false })}
        >
          Önceki adım
        </button>
        <button
          className="secondary"
          disabled={step === 3}
          onClick={() => set({ step: step + 1, checked: false })}
        >
          Sonraki adım
        </button>
      </div>
      <svg
        className="bio011b-drawing"
        viewBox="0 0 600 270"
        role="img"
        aria-labelledby={`${uid}-title`}
        data-scenario={sample.id}
        data-scenario-step={step}
      >
        <title id={`${uid}-title`}>
          {sample.name}:{" "}
          {step === 3 ? sample.mechanism : `İnceleme adımı ${step + 1}`}
        </title>
        {sample.id === "bud" ? (
          <g transform="translate(210 140)">
            <InvertebrateShape id="hydra" />
            {step > 0 && step < 3 && (
              <path
                d={`M8 3 Q18-8 ${step === 1 ? 27 : 35} -9`}
                data-bud-connection
                className="bio011b-organ-line"
              />
            )}
            {step > 0 && (
              <g
                transform={`translate(${step === 3 ? 180 : step === 1 ? 27 : 35} ${step === 3 ? 0 : -10}) scale(${step === 1 ? 0.45 : 0.8})`}
              >
                <InvertebrateShape id="hydra" />
              </g>
            )}
          </g>
        ) : sample.id === "fragment" ? (
          <g>
            <path
              d={
                step === 0
                  ? "M155 135 Q300 40 445 135 Q300 225 155 135Z"
                  : "M90 135 Q170 40 250 135 Q170 225 90 135Z"
              }
              className="bio011b-fill"
            />
            {step > 0 && (
              <path
                d={
                  step === 1
                    ? "M350 135 Q400 90 450 135 Q400 175 350 135Z"
                    : "M350 135 Q430 40 510 135 Q430 225 350 135Z"
                }
                className="bio011b-fill"
              />
            )}
          </g>
        ) : sample.id === "repair" ? (
          <g>
            <path
              d="M100 145 Q145 80 250 140 Q180 205 100 145Z"
              className="bio011b-fill"
            />
            <path
              d={
                step === 1
                  ? "M245 140 L286 148"
                  : step === 2
                    ? "M245 140 L350 150"
                    : "M245 140 L440 160"
              }
              className="bio011b-organ-line"
            />
            <path
              d="M155 120 l-30-45 m32 92 l-25 42 m45-95 l38-42 m-20 100 l35 30"
              className="bio011b-organ-line"
            />
          </g>
        ) : sample.id === "endospore" ? (
          <g>
            <rect
              x="200"
              y="75"
              width="200"
              height="120"
              rx="60"
              className={
                step === 1 || step === 2 ? "bio011b-air" : "bio011b-fill"
              }
            />
            {step > 0 && step < 3 && (
              <ellipse
                cx="300"
                cy="135"
                rx={step === 1 ? 28 : 43}
                ry="42"
                className="bio011b-organ"
              />
            )}
          </g>
        ) : (
          <g>
            <path
              d="M190 228 V75 m0 45 q-70-70-80-10 q35 45 80 20 m0 20 q70-70 80-10 q-35 45-80 20"
              className="bio011b-organ-line"
            />
            <path d="M100 230 H490" className="bio011b-ground" />
            {step > 0 &&
              (sample.id === "cutting" ? (
                <g>
                  <path
                    d={`M420 230 V${step === 1 ? 170 : 90}`}
                    className="bio011b-organ-line"
                  />
                  <path
                    d="M420 173 q-40-40-48-10 q20 30 48 17"
                    className="bio011b-organ-line"
                  />
                  {step > 1 && (
                    <path
                      d="M420 230 l-24 20 m24-20 l24 20"
                      className="bio011b-organ-line"
                    />
                  )}
                </g>
              ) : (
                <g>
                  <ellipse
                    cx="420"
                    cy="219"
                    rx="16"
                    ry="10"
                    className="bio011b-organ"
                  />
                  {step > 1 && (
                    <path
                      d={`M420 215 V${step === 2 ? 175 : 100} m0 40 q-45-50-55-10 q25 30 55 10`}
                      className="bio011b-organ-line"
                    />
                  )}
                </g>
              ))}
          </g>
        )}
      </svg>
      <div className="bio011b-result" data-model-result>
        <strong>
          {sample.name} · {step + 1}. inceleme karesi
        </strong>
        <p>
          {step === 3
            ? sample.mechanism
            : "Oluşumu adım adım izle; son karede bağımsız birey ve döllenmeyi karşılaştır."}
        </p>
        <p>{sample.detail}</p>
        <p>
          Sonuçta izlenen bağımsız birey sayısı: {sample.finalCount}. Döllenme:{" "}
          {sample.fertilization
            ? "bu embriyonun oluşumunda daha önce var"
            : "bu olayda yok"}
          . Yeni birey: {sample.newIndividual ? "var" : "yok"}.
        </p>
        <p className="small muted">
          Şemalar ölçekli değildir; tomurcuk ve sürgün büyümesi çizimde
          kısaltılmıştır. Parça uygunluğu ve tek yavru sayımı her örneğin
          açıklamasındaki koşullardır.
        </p>
      </div>
      <Prediction
        value={s.answer}
        reason={s.reason}
        checked={s.checked}
        expected={expected}
        options={[
          ["asexual", "Döllenmesiz yeni birey: eşeysiz üreme"],
          ["sexual", "Döllenme geçmişi var: eşeyli üreme"],
          ["not", "Yeni birey artışı yok: bu olay üreme değil"],
        ]}
        explanation={sample.detail}
        onChange={set}
      />
      <details className="bio011b-growth">
        <summary>Tam tur bölünmede sayıyı dene</summary>
        <p>
          Bütün hücreler her tur bir kez bölünüyor; kayıp yok. Bakteri örneğinde
          işlem ikiye bölünmedir, mitoz evreleri değildir.
        </p>
        <label htmlFor={`${uid}-initial`}>
          Başlangıç hücresi: {initial}
          <input
            id={`${uid}-initial`}
            type="range"
            min="1"
            max="6"
            value={initial}
            onChange={(e) => set({ initial: Number(e.target.value) })}
          />
        </label>
        <label htmlFor={`${uid}-rounds`}>
          Tam tur sayısı: {rounds}
          <input
            id={`${uid}-rounds`}
            type="range"
            min="0"
            max="4"
            value={rounds}
            onChange={(e) => set({ rounds: Number(e.target.value) })}
          />
        </label>
        <p>
          <strong>
            {initial} × 2^{rounds} = {growth.result} hücre.
          </strong>{" "}
          Yalnız seçili hücreler bölünürse bu üstel formül yerine her bölünme
          net bir hücre ekler.
        </p>
      </details>
    </>
  );
}
export default function Forge011BiologyBLab({ id }: { id: string }) {
  return (
    <section className="bio011b-lab" data-forge011={id}>
      {id === "omurgasizlar" ? (
        <Invertebrates />
      ) : id === "omurgalilar" ? (
        <Vertebrates />
      ) : id === "mitoz" ? (
        <Division meiosis={false} />
      ) : id === "mayoz" ? (
        <Division meiosis />
      ) : (
        <Asexual />
      )}
    </section>
  );
}
