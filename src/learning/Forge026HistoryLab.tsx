import { useId } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  forge026HistoryLegacyIds,
  foundationBudget026,
  historyInterval026,
  militaryMatch026,
  politicsEvidence026,
  stratigraphy026,
  type HistoryEra026,
  type MilitaryFormation026,
  type MilitaryIncome026,
  type MilitaryTask026,
} from "./forge026History";
import "./forge026History.css";

export const historyDefaults026 = {
  file: 0,
  claim: 0,
  otherCause: false,
  pay: 0,
  formation: 0,
  task: 0,
  profile: 0,
  income: 12,
  deed: false,
  fromYear: 1,
  fromEra: 0,
  toYear: 1,
  toEra: 1,
  layer: 1,
  disturbed: false,
  layerClaim: 0,
  guess: "",
  reason: "",
  reveal: false,
};
type ChoiceKey = Exclude<
  keyof typeof historyDefaults026,
  "reason" | "reveal" | "guess"
>;
const bounds: Record<
  Exclude<ChoiceKey, "otherCause" | "deed" | "disturbed">,
  readonly [number, number]
> = {
  file: [0, 2],
  claim: [0, 2],
  pay: [0, 2],
  formation: [0, 2],
  task: [0, 5],
  profile: [0, 2],
  income: [0, 24],
  fromYear: [1, 4000],
  fromEra: [0, 1],
  toYear: [1, 4000],
  toEra: [0, 1],
  layer: [0, 2],
  layerClaim: [0, 2],
};
const activeFields: readonly ChoiceKey[][] = [
  ["file", "claim", "otherCause"],
  ["pay", "formation", "task"],
  ["profile", "income", "deed"],
  ["fromYear", "fromEra", "toYear", "toEra"],
  ["layer", "disturbed", "layerClaim"],
];
const payNames: readonly MilitaryIncome026[] = [
  "bilinmiyor",
  "ulufe",
  "dirlik",
];
const formationNames: readonly MilitaryFormation026[] = [
  "bilinmiyor",
  "piyade",
  "süvari",
];
const taskNames: readonly MilitaryTask026[] = [
  "bilinmiyor",
  "çarpışma",
  "silah bakımı",
  "top atışı",
  "ağır top taşıma",
  "cebelü",
];
const eras: readonly HistoryEra026[] = ["MÖ", "MS"];
function lines(text: string) {
  const result: string[] = [];
  for (const word of text.split(" ")) {
    if (!result.length || result.at(-1)!.length + word.length + 1 > 17)
      result.push(word);
    else result[result.length - 1] += " " + word;
  }
  return result;
}
function Diagram({
  nodes,
  uid,
  title,
}: {
  nodes: string[];
  uid: string;
  title: string;
}) {
  let cursor = 16;
  const boxes = nodes.map((text) => {
    const rows = lines(text),
      height = Math.max(82, rows.length * 27 + 24),
      top = cursor;
    cursor += height + 42;
    return { text, rows, height, top };
  });
  return (
    <svg
      viewBox={`0 0 270 ${cursor - 26}`}
      className="history026-diagram"
      role="img"
      aria-labelledby={`${uid}-title ${uid}-desc`}
    >
      <title id={`${uid}-title`}>{title}</title>
      <desc id={`${uid}-desc`}>
        Kartlar yukarıdan aşağıya okunur. Çizgi, açıklamanın okuma sırasını
        gösterir; tek neden bağı veya eşit zaman aralığı anlamına gelmez. Tam
        veri metinde de vardır.
      </desc>
      {boxes.map((box, i) => (
        <g key={box.text + i}>
          {i > 0 && <path d={`M135 ${box.top - 42} V${box.top}`} />}
          <rect x="18" y={box.top} width="234" height={box.height} rx="10" />
          <text textAnchor="middle">
            {box.rows.map((row, j) => (
              <tspan key={j} x="135" y={box.top + 29 + j * 27}>
                {row}
              </tspan>
            ))}
          </text>
        </g>
      ))}
    </svg>
  );
}

function LayerDiagram({
  layer,
  disturbed,
  uid,
}: {
  layer: number;
  disturbed: boolean;
  uid: string;
}) {
  const selectedY = 16 + (2 - layer) * 124;
  return (
    <svg
      viewBox="0 0 270 436"
      className="history026-diagram"
      role="img"
      aria-labelledby={`${uid}-layer-title ${uid}-layer-desc`}
      data-layer-selection={layer}
      data-layer-disturbed={disturbed}
    >
      <title id={`${uid}-layer-title`}>Seçili buluntunun tabaka bağlamı</title>
      <desc id={`${uid}-layer-desc`}>
        Üstte C, ortada B, altta A var. Nokta seçili nesneyi gösterir.
        {disturbed
          ? " Kesik çizgi, tabakaları kesen sonradan açılmış çukurun sınırıdır; nesne bu çukurdadır."
          : " Seçili nesne için bozulmamış birikim varsayılır."}
        Katman kalınlığı yıl veya eşit süre değildir. Tam veri metinde de
        vardır.
      </desc>
      {[2, 1, 0].map((index, row) => (
        <g key={index} data-layer={index} data-selected={index === layer}>
          <rect
            x="18"
            y={16 + row * 124}
            width="234"
            height="82"
            rx="10"
            style={{ strokeWidth: index === layer ? 4 : 2 }}
          />
          <text textAnchor="middle">
            <tspan x="120" y={45 + row * 124}>
              {["A: alt", "B: orta", "C: üst"][index]}
            </tspan>
            {index === layer && (
              <tspan x="120" y={73 + row * 124}>
                Seçili nesne
              </tspan>
            )}
          </text>
        </g>
      ))}
      {disturbed && (
        <path
          d="M192 6 V358 H228 V6"
          strokeDasharray="6 5"
          data-later-pit="true"
        />
      )}
      <circle
        cx={disturbed ? 210 : 232}
        cy={selectedY + 52}
        r="7"
        fill="currentColor"
        data-selected-object="true"
      />
      <text textAnchor="middle">
        <tspan x="135" y="395">
          {disturbed ? "Sonradan açılan" : "Bağlam sağlam"}
        </tspan>
        <tspan x="135" y="423">
          {disturbed ? "çukur" : "varsayımı"}
        </tspan>
      </text>
    </svg>
  );
}

export default function Forge026HistoryLab({ lessonId }: { lessonId: string }) {
  const uid = useId();
  const id = lessonId.replace(/-ileri$/, "");
  const kind = forge026HistoryLegacyIds.indexOf(id);
  if (kind < 0) throw new RangeError("HISTORY026_LESSON");
  const key = `forge026:history:${id}`;
  const { state } = useApp();
  const raw = state.explorations[key] ?? {};
  const [saved, save] = useExploration(key, historyDefaults026);
  const canonical = { ...historyDefaults026 };
  for (const field of Object.keys(bounds) as (keyof typeof bounds)[]) {
    const value = saved[field],
      [min, max] = bounds[field];
    canonical[field] =
      Number.isInteger(value) && value >= min && value <= max
        ? value
        : historyDefaults026[field];
  }
  canonical.otherCause = saved.otherCause === true;
  canonical.deed = saved.deed === true;
  canonical.disturbed = saved.disturbed === true;
  const valid = activeFields[kind].every(
    (field) =>
      (!Object.hasOwn(raw, field) ||
        typeof raw[field] === typeof historyDefaults026[field]) &&
      saved[field] === canonical[field],
  );
  const reason = valid ? saved.reason.slice(0, 120) : "";
  let expected: string,
    title: string,
    context: string[],
    nodes: string[],
    details: string[],
    limit: string;
  let guesses: readonly string[];
  if (kind === 0) {
    const result = politicsEvidence026(
      canonical.file,
      canonical.claim,
      canonical.otherCause,
    );
    expected = result.state;
    guesses = ["destekli", "çelişkili", "kararsız"];
    title = "Sıra ile neden arasındaki kanıt";
    context = [...result.records, `İddia: ${result.claim}`];
    nodes = [
      `A: ${result.events[0].year}`,
      `B: ${result.events[1].year}`,
      canonical.otherCause ? "C için ek belge var" : "C için belge yok",
    ];
    details = [`Kanıt durumu: ${result.state}.`, result.explanation];
    limit = result.limit;
  } else if (kind === 1) {
    const result = militaryMatch026(
      payNames[canonical.pay],
      formationNames[canonical.formation],
      taskNames[canonical.task],
    );
    expected =
      result.candidates.length === 0
        ? "Aday yok"
        : result.candidates.length === 1
          ? "Tek aday"
          : "Birden çok aday";
    guesses = ["Aday yok", "Tek aday", "Birden çok aday"];
    title = "Birliği bağımsız ipuçlarıyla daralt";
    context = [
      `Gelir: ${result.income}.`,
      `Tür: ${result.formation}.`,
      `İş: ${result.task}.`,
      "Altı adayın profili, bu etkinliğin sınırlı tablosudur.",
    ];
    // The full candidate table stays visible so the task is answerable before reveal.
    nodes = [
      `Gelir: ${result.income}`,
      `Tür: ${result.formation}`,
      `İş: ${result.task}`,
    ];
    details = [
      result.result,
      ...result.candidates.map(
        (r) => `${r.name}: ${r.income}, ${r.formation}; ${r.tasks.join(", ")}.`,
      ),
    ];
    limit = result.limit;
  } else if (kind === 2) {
    const result = foundationBudget026(
      canonical.profile,
      canonical.income,
      canonical.deed,
    );
    expected =
      result.balance < 0
        ? "Açık"
        : result.balance === 0
          ? "Denge"
          : "Artan pay";
    guesses = ["Açık", "Denge", "Artan pay"];
    title = "Vakıfta hesap ve tahsis belgesi";
    context = [
      `Profil: ${result.name}.`,
      `Gelir: ${result.income} hesap birimi.`,
      ...result.costs.map((r) => `${r.name}: ${r.amount} birim.`),
      canonical.deed
        ? "Vakfiye: Bu üç hizmet için belirtilen tahsis izinli."
        : "Bu üç tahsise ilişkin vakfiye belgesi verilmedi.",
    ];
    nodes = [
      `Gelir: ${result.income}`,
      `Gider: ${result.total}`,
      canonical.deed ? "Tahsis belgesi var" : "Tahsis belgesi yok",
    ];
    details = [
      `${result.finance}. Bakiye: ${result.income} − ${result.total} = ${result.balance}.`,
      result.allocation,
    ];
    limit = result.limit;
  } else if (kind === 3) {
    const result = historyInterval026(
      canonical.fromYear,
      eras[canonical.fromEra],
      canonical.toYear,
      eras[canonical.toEra],
    );
    expected = String(result.intervals);
    guesses = [];
    title = "Yıl 0 olmadan aralıkları say";
    context = [
      `İlk uç: ${result.from.label}.`,
      `İkinci uç: ${result.to.label}.`,
      "Yanıt, iki yıl başlangıcı arasındaki aralık sayısıdır; iki uç dahil yıl etiketi adedi sorulmuyor.",
    ];
    nodes = [result.from.label, "Yıl 0 yok", result.to.label];
    details = [
      `Aralık sayısı: ${result.intervals}. Yön: ${result.direction}.`,
      `İki uç dahil etiket sayısı: ${result.inclusiveYearLabels}.`,
      `İlk uç: ${result.from.century}. yüzyıl, ${result.from.half}. yarı, ${result.from.quarter}. çeyrek.`,
      `İkinci uç: ${result.to.century}. yüzyıl, ${result.to.half}. yarı, ${result.to.quarter}. çeyrek.`,
    ];
    limit = result.assumption;
  } else {
    const result = stratigraphy026(
      canonical.layer,
      canonical.disturbed,
      canonical.layerClaim,
    );
    expected = result.state;
    guesses = ["destekli", "çelişkili", "kararsız"];
    title = "Tabaka sırası ve bağlam";
    context = [
      "Kesitte üstte C, ortada B, altta A var. Bunlar art arda birikmiş katmanlar; eşit süreyi göstermez.",
      `Seçili buluntu: ${result.layer}.`,
      canonical.disturbed
        ? "Seçili nesne, tabakaları kesen sonradan açılmış çukur içinde; nesnenin ilk yerine ait olduğu bilinmiyor."
        : "Seçili nesne için bozulmamış birikim varsayımı geçerli.",
      `İddia: ${result.claim}`,
    ];
    nodes = ["C: üst", "B: orta", "A: alt"];
    details = [`Kanıt durumu: ${result.state}.`, result.explanation];
    limit = result.limit;
  }
  const guess =
    valid &&
    (kind === 3 ? /^\d{1,4}$/.test(saved.guess) : guesses.includes(saved.guess))
      ? saved.guess
      : "";
  const canCompare = reason.trim().length > 0 && guess.length > 0;
  const reveal = valid && saved.reveal === true && canCompare;
  const set = (patch: Partial<typeof historyDefaults026>) =>
    save({ ...canonical, reason, guess, reveal, ...patch });
  const change = (patch: Partial<typeof historyDefaults026>) =>
    set({ ...patch, reason: "", guess: "", reveal: false });
  const select = (
    label: string,
    field: keyof typeof bounds,
    values: readonly string[],
  ) => (
    <label htmlFor={`${uid}-${field}`}>
      {label}
      <select
        id={`${uid}-${field}`}
        value={canonical[field]}
        onChange={(e) => change({ [field]: Number(e.target.value) })}
      >
        {values.map((value, i) => (
          <option key={value} value={i}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
  const check = (label: string, field: "otherCause" | "deed" | "disturbed") => (
    <label className="history026-check">
      <input
        type="checkbox"
        checked={canonical[field]}
        onChange={(e) => change({ [field]: e.target.checked })}
      />
      {label}
    </label>
  );
  const numeric = (label: string, field: "income" | "fromYear" | "toYear") => (
    <label htmlFor={`${uid}-${field}`}>
      {label}
      <input
        id={`${uid}-${field}`}
        type="number"
        min={bounds[field][0]}
        max={bounds[field][1]}
        step="1"
        value={canonical[field]}
        onChange={(e) => {
          const value = Number(e.target.value),
            [min, max] = bounds[field];
          if (Number.isInteger(value) && value >= min && value <= max)
            change({ [field]: value });
        }}
      />
    </label>
  );
  return (
    <section
      className="history026-lab"
      data-forge026={lessonId}
      data-model-kind={kind}
      aria-labelledby={`${uid}-heading`}
    >
      <h3 id={`${uid}-heading`}>{title}</h3>
      <div className="history026-controls">
        {kind === 0 && (
          <>
            {select("Kanıt dosyası", "file", [
              "Yalnız sıra",
              "Sıra ve ikmal",
              "Ters sıra",
            ])}
            {select("Sınanan iddia", "claim", [
              "A önce oldu",
              "A ikmale katkı sağladı",
              "A tek nedendi",
            ])}
            {check("C'nin katkısı için ek belge", "otherCause")}
          </>
        )}
        {kind === 1 && (
          <>
            {select("Gelir ipucu", "pay", payNames)}
            {select("Birlik türü", "formation", formationNames)}
            {select("İş ipucu", "task", taskNames)}
          </>
        )}
        {kind === 2 && (
          <>
            {select("Hizmet profili", "profile", [
              "Çeşme ve eğitim",
              "İmaret ve eğitim",
              "Küçük hizmet ağı",
            ])}
            {numeric("Gelir birimi", "income")}
            {check("Bu tahsis için vakfiye belgesi", "deed")}
          </>
        )}
        {kind === 3 && (
          <>
            {numeric("İlk yıl", "fromYear")}
            {select("İlk yılın dönemi", "fromEra", eras)}
            {numeric("İkinci yıl", "toYear")}
            {select("İkinci yılın dönemi", "toEra", eras)}
          </>
        )}
        {kind === 4 && (
          <>
            {select("Buluntunun tabakası", "layer", [
              "A: alt",
              "B: orta",
              "C: üst",
            ])}
            {select("Tabaka iddiası", "layerClaim", [
              "Alttakine göre sonra",
              "Kesin takvim yılı",
              "Derinlik yıl sayısıdır",
            ])}
            {check("Seçili nesnenin bağlamı bozulmuş", "disturbed")}
          </>
        )}
      </div>
      <div className="history026-context">
        <ul>
          {context.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      </div>
      {kind === 1 && (
        <details>
          <summary>Altı adayın tablosu</summary>
          <ul>
            {militaryMatch026(
              "bilinmiyor",
              "bilinmiyor",
              "bilinmiyor",
            ).candidates.map((r) => (
              <li key={r.name}>
                {r.name}: {r.income}, {r.formation}; {r.tasks.join(", ")}.
              </li>
            ))}
          </ul>
        </details>
      )}
      {kind === 4 ? (
        <LayerDiagram
          layer={canonical.layer}
          disturbed={canonical.disturbed}
          uid={uid}
        />
      ) : (
        <Diagram
          nodes={
            kind === 1
              ? [
                  ...nodes,
                  reveal
                    ? militaryMatch026(
                        payNames[canonical.pay],
                        formationNames[canonical.formation],
                        taskNames[canonical.task],
                      )
                        .candidates.map((candidate) => candidate.name)
                        .join(" / ") || "Aday yok"
                    : "Profil tablosuyla eşleştir",
                ]
              : nodes
          }
          uid={uid}
          title={title}
        />
      )}
      <p className="history026-limit">{limit}</p>
      <label htmlFor={`${uid}-guess`}>
        {kind === 3 ? "Aralık tahminin" : "Kanıt tahminin"}
        {kind === 3 ? (
          <input
            id={`${uid}-guess`}
            inputMode="numeric"
            value={guess}
            maxLength={4}
            onChange={(e) =>
              set({
                guess: e.target.value.replace(/\D/g, "").slice(0, 4),
                reveal: false,
              })
            }
          />
        ) : (
          <select
            id={`${uid}-guess`}
            value={guess}
            onChange={(e) => set({ guess: e.target.value, reveal: false })}
          >
            <option value="">Bir sonuç seç</option>
            {guesses.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        )}
      </label>
      <label htmlFor={`${uid}-reason`}>
        Gerekçen
        <textarea
          id={`${uid}-reason`}
          rows={3}
          maxLength={120}
          value={reason}
          onChange={(e) =>
            set({ reason: e.target.value.slice(0, 120), reveal: false })
          }
        />
      </label>
      <button
        type="button"
        disabled={!canCompare}
        onClick={() => set({ reveal: true })}
      >
        Kanıtla karşılaştır
      </button>
      {reveal && (
        <div
          className="history026-feedback"
          data-model-result
          role="status"
          data-compatible={guess === expected}
        >
          <p>
            {guess === expected
              ? "Tahminin bu dosyayla uyumlu."
              : "Tahminini kanıtla yeniden denetle."}
          </p>
          <ul>
            {details.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
          <p>
            Gerekçene otomatik puan verilmez. Verilen bilgilerle kendi gerekçeni
            karşılaştır.
          </p>
        </div>
      )}
    </section>
  );
}
