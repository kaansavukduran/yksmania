import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  authorityNetwork026B,
  steppeSource026B,
  steppeCases026B,
  islamTimeline026B,
  conversionEvidence026B,
  seljukServices026B,
  historyBDefaults026,
  normalizeHistoryB026,
  historyBActive026,
  historyBIds026,
  type HistoryBId026,
  type HistoryBState026,
} from "./forge026HistoryB";
import "./forge026HistoryB.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

type Change026B = (patch: Partial<HistoryBState026>) => void;
type Option026B = readonly [string, string];
const supportChoices026B: Option026B[] = [
  ["destek", "Kanıt destekler"],
  ["yetersiz", "Kanıt yetmez"],
];
const ownerChoices026B: Option026B[] = [
  ["central", "Merkez"],
  ["local", "Yerel"],
];
const authorityChoices026B: Option026B[] = [
  ["dogrudan", "İki yetki doğrudan merkezde"],
  ["yetki-devri", "Yerel uygulama, merkezî görev denetimi"],
  ["yerel", "İki alanda yerel yetki"],
  ["karma", "Yetkiler farklı ellerde"],
];
// Display paraphrases apply only to fixed model copy, never to user reasons.
const displayPairs026B: readonly (readonly [string, string])[] = [
  ["Sulama sözleşmesi", "Sulama anlaşması"],
  ["Uyuşmazlık kaydı", "Dava kaydı"],
  [
    "Bir görevli, seçilmiş iki uyuşmazlıkta töreye başvurulduğunu yazıyor.",
    "Bir görevli iki seçili davada töreye başvuru kaydı verir.",
  ],
  [
    "Bir sürü için alıcı, satıcı ve ödeme koşulları kaydediliyor.",
    "Bir sürünün alıcı, satıcı ve ödeme koşulları kayıtlı.",
  ],
  [
    "Başka bir inanca mensup tüccarın yerel alışverişi kaydediliyor.",
    "Başka inançtan bir tüccar için yerel alışveriş kaydı var.",
  ],
  [
    "Bir şehir betimlemesi birden fazla inancın ibadet yerini anıyor.",
    "Bir şehir notu, birden fazla inancın ibadet yerini anar.",
  ],
  [
    "Belirli uygulamaların kaydı; bütün davaların eksiksiz listesi değil.",
    "Belirli uygulama kaydı; bütün dava listesi değil.",
  ],
  ["Hayvancılık ile alışveriş ilişkisi.", "Sürü ile alışveriş bağı."],
  [
    "Yönetim söylemiyle belirtilen kural uygulaması birlikte karşılaştırılabilir.",
    "Yönetim dili ile kural kullanımı birlikte kıyas edilir.",
  ],
  [
    "Bu yerel işlemde su kullanımının düzenlendiği kaydedilmiştir.",
    "Bu yerel işlemde su için kural kaydı vardır.",
  ],
  [
    "Belirtilen şehirde farklı ibadet yerleri anlatılmıştır.",
    "Adı verilen şehirde farklı ibadet yerleri anlatılır.",
  ],
  [
    "Yönetici temsiliyle şehirdeki inanç çeşitliliği farklı kapsamlarla birlikte incelenebilir.",
    "Yönetici temsili ile kentteki inanç çeşitliliği ayrı kapsamda ele alınır.",
  ],
  [
    "Bu üç yerel kayıt seçilse de iddianın bütün topluluklar veya bütün haklar kapsamı gösterilmez.",
    "Üç yerel kayıt, bütün halk veya bütün haklar için kanıt vermez.",
  ],
  ["Şam Emevi yönetiminin başlangıcı", "Şam Emevi yönetimi başlar"],
  ["İber yarımadasına geçiş", "İberya’ya geçiş"],
  ["Endülüs Emevi halifeliğinin sonu", "Endülüs Emevi halifeliği biter"],
  [
    "Kurmaca hükümdar yeni inancı benimsediğini açıklıyor.",
    "Kurmaca hükümdar, yeni inancı kabul ettiğini söylüyor.",
  ],
  [
    "Kurmaca kayıt, adı belirtilen iki köyün bazı hanelerinde uygulamaları anlatıyor.",
    "Kurmaca kayıt, adı verilen iki köydeki bazı hanelerin uygulama örneklerini anlatıyor.",
  ],
  [
    "Belirtilen hükümdarın tercihi kayıtlıdır.",
    "Verilen hükümdar için tercih kaydı vardır.",
  ],
  [
    "Belirtilen köylerin kayıtlı hanelerinde yerel uygulama anlatılır.",
    "Belirtilen köylerde kayıtlı bazı haneler için yerel uygulama anlatılır.",
  ],
  [
    "Bütün nüfus aynı gün aynı inancı benimsemiştir.",
    "Bütün nüfus aynı gün aynı inancı kabul etmiştir.",
  ],
  [
    "Seçilen iddia kendi kişi, karar veya belirtilen yerel kapsamıyla destekleniyor; sonuç bütün nüfusa genişletilmez.",
    "İddia, ilgili kişi, karar veya yerel kapsamda destek bulur; bütün nüfus için hüküm vermez.",
  ],
  [
    "Seçilen iddia için uygun kapsamda kayıt yok. Üç kayıt da seçilse bütün nüfusun aynı günkü tercihi kanıtlanmış olmaz.",
    "Seçilen iddia için uygun kapsamda kayıt yok. Üç kayıt da herkesin aynı günkü tercihini kesin göstermez.",
  ],
  [
    "Ticaret-yol hizmeti için gelir bağı da gösterilmiştir.",
    "Ticaret ve yol hizmetine gelir bağı da gösterilir.",
  ],
  [
    "Öğretim hizmeti için gelir bağı da gösterilmiştir.",
    "Öğretim hizmetine gelir bağı da gösterilir.",
  ],
  [
    "Sağlık hizmeti için gelir bağı da gösterilmiştir.",
    "Sağlık hizmetine gelir bağı da gösterilir.",
  ],
  [
    "Hizmet kaydı var; gelir bağına ilişkin koşul seçili değil. Bu, hizmetin hiç gerçekleşmediği demek değildir.",
    "Hizmet kaydı var; gelir bağına ilişkin koşul seçili değil. Bu, hizmet hiç olmadı demek değildir.",
  ],
];
const copy026B = (text: string) =>
  displayPairs026B.reduce(
    (out, [old, replacement]) => out.replaceAll(old, replacement),
    text,
  );
function Readable026B({ text }: { text: string }) {
  return (
    <>
      {text.split(/(Kervansaray|Hükümdar|hükümdar)/).map((part, i) =>
        part === "Kervansaray" ? (
          <span key={i}>
            Kervan
            <wbr />
            saray
          </span>
        ) : part === "Hükümdar" ? (
          <span key={i}>
            Hüküm
            <wbr />
            dar
          </span>
        ) : part === "hükümdar" ? (
          <span key={i}>
            hüküm
            <wbr />
            dar
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
function Choice026B({
  label,
  value,
  options,
  change,
}: {
  label: string;
  value: string | number;
  options: readonly Option026B[];
  change: (value: string) => void;
}) {
  const uid = useId();
  return (
    <div className="historyb026-choice">
      <label htmlFor={uid}>{label}</label>
      <ChoiceSelect id={uid} value={value} onChange={(e) => change(e.target.value)}>
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {copy026B(text)}
          </option>
        ))}
      </ChoiceSelect>
      <p className="historyb026-selected">
        Seçili:{" "}
        <Readable026B
          text={copy026B(
            options.find(([key]) => key === String(value))?.[1] ??
              "Bir sonuç seç",
          )}
        />
      </p>
    </div>
  );
}
function Check026B({
  label,
  value,
  change,
}: {
  label: string;
  value: boolean;
  change: (value: boolean) => void;
}) {
  return (
    <label className="historyb026-check">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => change(e.target.checked)}
      />{" "}
      <Readable026B text={label} />
    </label>
  );
}
function Year026B({
  label,
  value,
  minimum,
  change,
}: {
  label: string;
  value: number;
  minimum: number;
  change: (value: number) => void;
}) {
  const uid = useId();
  return (
    <div className="historyb026-year">
      <label htmlFor={uid}>{label}</label>
      <input
        id={uid}
        type="number"
        min={minimum}
        max={1300}
        step={1}
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (
            e.target.value.trim() &&
            Number.isSafeInteger(n) &&
            n >= minimum &&
            n <= 1300
          )
            change(n);
        }}
      />
    </div>
  );
}
function Plot026B({
  title,
  height,
  kind,
  children,
}: {
  title: string;
  height: number;
  kind: string;
  children: (width: number, marker: string) => ReactNode;
}) {
  const uid = useId(),
    ref = useRef<SVGSVGElement>(null),
    [width, setWidth] = useState(270);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => {
      const rect = element.getBoundingClientRect(),
        style = getComputedStyle(element);
      const next =
        rect.width -
        parseFloat(style.borderLeftWidth) -
        parseFloat(style.borderRightWidth);
      if (next > 0)
        setWidth((old) => (Math.abs(next - old) < 0.25 ? old : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <svg
      ref={ref}
      role="img"
      aria-labelledby={uid}
      data-historyb026-plot={kind}
      viewBox={`0 0 ${width} ${height}`}
      style={{ height: height + 2 }}
    >
      <title id={uid}>{title}</title>
      <defs>
        <marker
          id={uid + "-arrow"}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 Z" className="historyb026-arrow" />
        </marker>
      </defs>
      {children(width, uid + "-arrow")}
    </svg>
  );
}
function Result026B({
  children,
  ...attrs
}: {
  children: ReactNode;
  [key: string]: unknown;
}) {
  return (
    <div className="historyb026-result" data-model-result {...attrs}>
      {children}
    </div>
  );
}
type Scene026B = {
  title: string;
  question: string;
  controls: ReactNode;
  result: ReactNode;
  diagram: ReactNode;
  expected: string;
  choices: readonly Option026B[];
  proof: ReactNode;
  scope: ReactNode;
};
function authorityScene026B(
  v: HistoryBState026,
  change: Change026B,
): Scene026B {
  const r = authorityNetwork026B(v.tax, v.revocable, v.command),
    names: Record<string, string> = {
      merkez: "Merkez",
      yerel: "Yerel",
      toplum: "Toplum",
    };
  return {
    title: "Üç aktörde yetki",
    question: "Bu iki yetki nasıl dağılmış?",
    expected: r.code,
    choices: authorityChoices026B,
    controls: (
      <>
        <Choice026B
          label="Vergiyi kim toplar?"
          value={v.tax}
          options={ownerChoices026B}
          change={(tax) => change({ tax: tax as HistoryBState026["tax"] })}
        />
        <Choice026B
          label="Sefer emri kimden?"
          value={v.command}
          options={ownerChoices026B}
          change={(command) =>
            change({ command: command as HistoryBState026["command"] })
          }
        />
        {r.localPresent ? (
          <Check026B
            label="Merkez görevden alabilir"
            value={v.revocable}
            change={(revocable) => change({ revocable })}
          />
        ) : (
          <p>
            Bu iki görevde yerel aktör seçilmediği için görevden alma koşulu bu
            kıyasta yer almaz.
          </p>
        )}
      </>
    ),
    result: (
      <Result026B data-authority-result={r.code} data-code={r.code}>
        <h4>Seçilen ilişkiler</h4>
        <ul>
          {r.observations.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
        <dl>
          {r.edges.map((edge) => (
            <div key={edge.kind}>
              <dt>{edge.label}</dt>
              <dd>
                {names[edge.from]} → {names[edge.to]}
                {edge.kind === "sinir" ? ": bu yetki verilmedi." : "."}
              </dd>
            </div>
          ))}
        </dl>
      </Result026B>
    ),
    diagram: (
      <>
        <Plot026B
          title="Vergi, sefer emri ve görev denetiminin yönleri"
          kind="authority"
          height={310}
        >
          {(w, marker) => {
            const centers: Record<string, { x: number; y: number }> = {
              merkez: { x: w / 2, y: 57 },
              yerel: { x: 54, y: 231 },
              toplum: { x: w - 54, y: 231 },
            };
            return (
              <>
                {r.edges.map((edge) => {
                  const a = centers[edge.from],
                    b = centers[edge.to],
                    dx = b.x - a.x,
                    dy = b.y - a.y,
                    distance = Math.hypot(dx, dy),
                    ux = dx / distance,
                    uy = dy / distance,
                    sx = a.x + 43 * ux,
                    sy = a.y + 43 * uy,
                    ex = b.x - 43 * ux,
                    ey = b.y - 43 * uy,
                    cx = (sx + ex) / 2 - 20 * uy,
                    cy = (sy + ey) / 2 + 20 * ux;
                  return (
                    <g key={edge.kind}>
                      <path
                        data-authority-edge={edge.kind}
                        data-from={edge.from}
                        data-to={edge.to}
                        d={`M${sx} ${sy} Q${cx} ${cy} ${ex} ${ey}`}
                        className={
                          edge.kind === "sinir"
                            ? "historyb026-missing"
                            : edge.kind === "emir"
                              ? "historyb026-secondary"
                              : "historyb026-primary"
                        }
                        markerEnd={
                          edge.kind === "sinir" ? undefined : `url(#${marker})`
                        }
                      />
                      {edge.kind === "sinir" && (
                        <path
                          d={`M${cx - 5} ${cy - 5} l10 10 m-10 0 l10 -10`}
                          className="historyb026-missing"
                        />
                      )}
                    </g>
                  );
                })}
                {Object.entries(centers).map(([key, p]) => (
                  <g key={key} data-authority-node={key}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={39}
                      className="historyb026-node"
                    />
                    <text x={p.x} y={p.y + 6} textAnchor="middle">
                      {names[key]}
                    </text>
                  </g>
                ))}
              </>
            );
          }}
        </Plot026B>
        <p>
          Ok yönü seçili ilişkiyi gösterir. Kesik çizgi ve çarpı, görevden alma
          yetkisi yok demektir. Her okun adı ve yönü metinde de açık.
        </p>
      </>
    ),
    proof: (
      <p>
        Model özeti: {r.label}. Vergi ile sefer emri farklı ellerdeyse karma
        dağılım vardır. İkisi de yereldeyse merkezî görev denetimi ayrıca ayırt
        edilir.
      </p>
    ),
    scope: (
      <p>
        Bu üç aktör kurmaca bir sayım düzenidir. Vergi, sefer emri ve görevden
        alma ayrı verilerdir. Bir güç yüzdesi, modern demokrasi ölçüsü veya
        bütün Orta Çağ için tek düzen çıkarılmaz.
      </p>
    ),
  };
}
function steppeScene026B(v: HistoryBState026, change: Change026B): Scene026B {
  const r = steppeSource026B(v.bundle, v.mask, v.claim),
    rule = steppeCases026B[v.bundle].claims[v.claim];
  return {
    title: "Kaynak ve iddia",
    question: "Seçili kayıtlar bu iddiaya yeter mi?",
    expected: r.expected,
    choices: supportChoices026B,
    controls: (
      <>
        <Choice026B
          label="Kaynak paketi"
          value={v.bundle}
          options={[
            ["yonetim", "Yönetim"],
            ["uretim", "Üretim"],
            ["inanc", "İnanç"],
          ]}
          change={(bundle) =>
            change({ bundle: bundle as HistoryBState026["bundle"] })
          }
        />
        <Choice026B
          label="İddia"
          value={v.claim}
          options={steppeCases026B[v.bundle].claims.map((c, i) => [
            String(i),
            c.text,
          ])}
          change={(claim) => change({ claim: Number(claim) })}
        />
        {r.records.map((record) => (
          <Check026B
            key={record.index}
            label={`${record.index + 1}. kaydı seç`}
            value={record.selected}
            change={(selected) =>
              change({
                mask: selected
                  ? v.mask | (1 << record.index)
                  : v.mask & ~(1 << record.index),
              })
            }
          />
        ))}
      </>
    ),
    result: (
      <Result026B
        data-source-count={r.selectedCount}
        data-supporting-count={r.supportingCount}
        data-supported={r.supported}
      >
        <h4>{r.title}</h4>
        <p>İddia: {copy026B(r.claimText)}</p>
        <p>
          Seçili kayıt sayısı: {r.selectedCount}. İddiayla ilgili seçili kayıt:{" "}
          {r.supportingCount}.
        </p>
        <ol className="historyb026-records">
          {r.records.map((record) => (
            <li key={record.index}>
              <strong>
                {record.index + 1}. kayıt:{" "}
                <Readable026B text={copy026B(record.title)} />
              </strong>
              <p>{copy026B(record.text)}</p>
              <p>Kapsam: {copy026B(record.voice)}</p>
              <p>
                {record.selected
                  ? "Bu kayıt seçili."
                  : "Bu kayıt bu kıyasa katılmıyor."}
              </p>
            </li>
          ))}
        </ol>
      </Result026B>
    ),
    diagram: (
      <>
        <Plot026B
          title="Üç kaydın seçimi ve iddiayla ilişkisi"
          kind="sources"
          height={255}
        >
          {(w) => (
            <>
              <text x={14} y={27}>
                Kayıt
              </text>
              <text x={w - 92} y={27} textAnchor="middle">
                Seçili
              </text>
              <text x={w - 33} y={27} textAnchor="middle">
                İlgili
              </text>
              {r.records.map((record, i) => {
                const y = 74 + i * 58,
                  relevant = !rule.never && rule.requires.includes(i);
                return (
                  <g
                    key={i}
                    data-source={i}
                    data-selected={String(record.selected)}
                    data-relevant={String(relevant)}
                  >
                    <text x={14} y={y + 6}>
                      {i + 1}. kayıt
                    </text>
                    <circle
                      cx={w - 92}
                      cy={y}
                      r={14}
                      className={
                        record.selected
                          ? "historyb026-selected-dot"
                          : "historyb026-open-dot"
                      }
                    />
                    <rect
                      x={w - 46}
                      y={y - 13}
                      width={26}
                      height={26}
                      className={
                        relevant
                          ? "historyb026-selected-box"
                          : "historyb026-open-box"
                      }
                    />
                  </g>
                );
              })}
            </>
          )}
        </Plot026B>
        <p>
          Dolu daire seçili kayıttır. Dolu kare, iddianın aradığı türde veriyi
          belirtir. Tek bir kayıt her iddiayı karşılamaz; gereken tür ve en az
          sayı ayrıca kıyaslanır.
        </p>
      </>
    ),
    proof: <p>{copy026B(r.explanation)}</p>,
    scope: (
      <p>
        Bu kayıtlar özgün, kurmaca öğretim özetleridir; yazıt veya arşiv belgesi
        alıntısı değildir. Kayıt sayısı nüfus, güven yüzdesi veya bütün halkın
        aynı davranışı anlamına gelmez. Eksik kayıt olayın kesin yokluğu
        sayılmaz.
      </p>
    ),
  };
}
function timelineScene026B(v: HistoryBState026, change: Change026B): Scene026B {
  const r = islamTimeline026B(v.from, v.to, v.showIberia),
    short: Record<string, string> = {
      "dort-halife": "Dört Halife",
      "sam-emevi": "Şam Emevi",
      abbasi: "Abbasi",
      endulus: "Endülüs",
    },
    eventStart = 83 + r.periods.length * 56,
    height = eventStart + Math.max(1, r.events.length) * 34 + 37;
  return {
    title: "Aynı eksende siyasi dönemler",
    question: "Bu seçili listede kaç olay var?",
    expected: String(r.eventCount),
    choices: Array.from({ length: 20 }, (_, i) => [String(i), `${i} olay`]),
    controls: (
      <>
        <Year026B
          label="İlk yıl"
          value={v.from}
          minimum={600}
          change={(from) => change({ from })}
        />
        <Year026B
          label="Son yıl"
          value={v.to}
          minimum={v.from}
          change={(to) => change({ to })}
        />
        <Check026B
          label="Endülüs de göster"
          value={v.showIberia}
          change={(showIberia) => change({ showIberia })}
        />
      </>
    ),
    result: (
      <Result026B
        data-history-count={r.eventCount}
        data-year-difference={r.yearDifference}
        data-from={r.from}
        data-to={r.to}
      >
        <p>
          Seçili aralık: MS {r.from} – {r.to}. Yıl farkı: {r.yearDifference}.
          Sınır yılları dahil.
        </p>
        <h4>Seçili olaylar: {r.eventCount}</h4>
        {r.events.length ? (
          <ul>
            {r.events.map((e) => (
              <li key={e.year}>
                {e.year}: {copy026B(e.label)}.
              </li>
            ))}
          </ul>
        ) : (
          <p>
            Bu seçili olay listesinde bu aralık için kayıt yok. Bu, tarihte hiç
            olay olmadı demek değildir.
          </p>
        )}
        <h4>Aralığa değen siyasi dönemler</h4>
        {r.periods.length ? (
          <ul>
            {r.periods.map((p) => (
              <li key={p.id}>
                {p.label}: {p.from} – {p.to}. Seçili eksende {p.clippedFrom} –
                {p.clippedTo}.
              </li>
            ))}
          </ul>
        ) : (
          <p>Bu listeden seçili aralığa değen siyasi dönem yok.</p>
        )}
      </Result026B>
    ),
    diagram: (
      <>
        <Plot026B
          title="Yıllarla orantılı konumlar ve paralel siyasi dönem satırları"
          kind="timeline"
          height={height}
        >
          {(w) => {
            const left = 53,
              right = w - 18,
              x = (year: number) =>
                r.yearDifference === 0
                  ? (left + right) / 2
                  : left +
                    ((right - left) * (year - r.from)) / r.yearDifference;
            return (
              <>
                <path
                  d={`M${left} 40 H${right}`}
                  className="historyb026-axis"
                />
                {r.yearDifference === 0 ? (
                  <text x={(left + right) / 2} y={26} textAnchor="middle">
                    {r.from}
                  </text>
                ) : (
                  <>
                    <text x={left} y={26}>
                      {r.from}
                    </text>
                    <text x={right} y={26} textAnchor="end">
                      {r.to}
                    </text>
                  </>
                )}
                {r.periods.map((p, i) => {
                  const y = 83 + i * 56,
                    zero = p.clippedFrom === p.clippedTo;
                  return (
                    <g
                      key={p.id}
                      data-history-period={p.id}
                      data-from={p.clippedFrom}
                      data-to={p.clippedTo}
                    >
                      <text x={left} y={y - 14}>
                        {short[p.id]}
                      </text>
                      {zero ? (
                        <circle
                          cx={x(p.clippedFrom)}
                          cy={y}
                          r={5}
                          className="historyb026-period-point"
                          data-period-endpoint={p.clippedFrom}
                        />
                      ) : (
                        <rect
                          x={x(p.clippedFrom)}
                          y={y - 5}
                          width={x(p.clippedTo) - x(p.clippedFrom)}
                          height={10}
                          className="historyb026-period"
                        />
                      )}
                    </g>
                  );
                })}
                {r.events.map((e, i) => {
                  const y = eventStart + 23 + i * 34;
                  return (
                    <g key={e.year}>
                      <text x={8} y={y + 6}>
                        {e.year}
                      </text>
                      <path
                        d={`M${left} ${y} H${right}`}
                        className="historyb026-guide"
                      />
                      <circle
                        data-history-event={e.year}
                        cx={x(e.year)}
                        cy={y}
                        r={5}
                        className="historyb026-event"
                      />
                    </g>
                  );
                })}
                {!r.events.length && (
                  <text x={left} y={eventStart + 27}>
                    Kayıt yok
                  </text>
                )}
              </>
            );
          }}
        </Plot026B>
        <p>
          Her satır aynı yıl ölçeğini kullanır. Çubuk kesişen dönem aralığıdır;
          tek sınır yılı noktayla korunur. Olay adları tam metinde verilir. Tek
          yıl seçilirse noktalar eksenin ortasına konur. Okla bir neden zinciri
          kurulmaz.
        </p>
      </>
    ),
    proof: (
      <p>
        Bu aralıkta seçili listeden {r.eventCount} olay vardır. Endülüs seçimi
        yalnız ilgili olay ve dönemleri ekler. Yıl farkı {r.yearDifference},
        olay sayısından farklı bir ölçüdür.
      </p>
    ),
    scope: (
      <p>
        Yalnız verilen MS olayları ve siyasi dönemler izlenir. Aynı yıl birden
        çok siyasi geçiş olabilir; satırlar eşzamanlı ilişkiyi gösterir. Sıra,
        tek kesin neden veya siyasi birlik kanıtı değildir. Abbasi iktidarının
        başlangıcı Bağdat kentinin kuruluşu sayılmaz.
      </p>
    ),
  };
}
function conversionScene026B(
  v: HistoryBState026,
  change: Change026B,
): Scene026B {
  const r = conversionEvidence026B(
      v.royal,
      v.official,
      v.community,
      v.scopeClaim,
    ),
    labels: Option026B[] = [
      ["yonetici", "Hükümdar tercihi"],
      ["kurum", "Resmî karar"],
      ["yerel", "Belirli hanelerde uygulama"],
      ["herkes", "Bütün nüfus, aynı gün"],
    ],
    short: Record<string, string> = {
      yonetici: "Kişi",
      kurum: "Karar",
      yerel: "Yerel",
    };
  return {
    title: "Kayıt ile kapsamı ayrı tut",
    question: "Kayıtlar seçilen iddiayı destekler mi?",
    expected: r.expected,
    choices: supportChoices026B,
    controls: (
      <>
        <Choice026B
          label="İddia"
          value={v.scopeClaim}
          options={labels}
          change={(scopeClaim) =>
            change({ scopeClaim: scopeClaim as HistoryBState026["scopeClaim"] })
          }
        />
        <Check026B
          label="Hükümdar kaydı"
          value={v.royal}
          change={(royal) => change({ royal })}
        />
        <Check026B
          label="Resmî karar"
          value={v.official}
          change={(official) => change({ official })}
        />
        <Check026B
          label="Yerel uygulama"
          value={v.community}
          change={(community) => change({ community })}
        />
      </>
    ),
    result: (
      <Result026B
        data-conversion-supported={r.supported}
        data-conversion-count={r.selectedCount}
      >
        <p>İddia: {copy026B(r.claimText)}</p>
        <ul className="historyb026-records">
          {r.records.map((record) => (
            <li key={record.id}>
              <strong>
                <Readable026B text={copy026B(record.title)} />
              </strong>
              <p>{copy026B(record.text)}</p>
              <p>
                {record.selected ? "Kayıt seçili." : "Bu kayıt seçili değil."}
              </p>
            </li>
          ))}
        </ul>
        <p>
          Seçili kayıt: {r.selectedCount}. Kayıt sayısı nüfus oranı değildir.
        </p>
      </Result026B>
    ),
    diagram: (
      <>
        <Plot026B
          title="Kişi, resmî karar ve yerel kayıtlar ayrı kapsamlardır"
          kind="conversion"
          height={306}
        >
          {(w) => (
            <>
              <text x={15} y={28}>
                Kapsam
              </text>
              <text x={w - 84} y={28} textAnchor="middle">
                Kayıt
              </text>
              <text x={w - 30} y={28} textAnchor="middle">
                Hedef
              </text>
              {r.records.map((record, i) => {
                const y = 73 + i * 57;
                return (
                  <g
                    key={record.id}
                    data-conversion-record={record.id}
                    data-selected={String(record.selected)}
                  >
                    <text x={15} y={y + 6}>
                      {short[record.id]}
                    </text>
                    <circle
                      cx={w - 84}
                      cy={y}
                      r={13}
                      className={
                        record.selected
                          ? "historyb026-selected-dot"
                          : "historyb026-open-dot"
                      }
                    />
                    <rect
                      x={w - 42}
                      y={y - 12}
                      width={24}
                      height={24}
                      className={
                        v.scopeClaim === record.id
                          ? "historyb026-selected-box"
                          : "historyb026-open-box"
                      }
                    />
                  </g>
                );
              })}
              <path d={`M15 226 H${w - 15}`} className="historyb026-guide" />
              <text x={15} y={259}>
                Tam nüfus?
              </text>
              <rect
                x={w - 96}
                y={242}
                width={25}
                height={25}
                className="historyb026-open-box"
                data-population-measured="false"
              />
              {v.scopeClaim === "herkes" && (
                <rect
                  x={w - 42}
                  y={242}
                  width={24}
                  height={24}
                  className="historyb026-selected-box"
                />
              )}
            </>
          )}
        </Plot026B>
        <p>
          Dolu daire kayıt seçimini, dolu kare hedef iddiayı gösterir. Tam nüfus
          için ölçüm yoktur. Üç kayıt, zorunlu bir kabul sırası olarak birbirine
          bağlı değildir.
        </p>
      </>
    ),
    proof: <p>{copy026B(r.explanation)}</p>,
    scope: (
      <p>
        Bunlar kurmaca kayıt özetleridir. Bir kişi, resmî karar ve adı verilen
        yerel haneler ayrı kapsamda ele alınır. Üçü de seçilse herkesin aynı gün
        aynı tercihi yaptığı kesin değildir. Seçili olmayan kayıt, “Olay hiç
        olmadı.” demek için kanıt değildir.
      </p>
    ),
  };
}
function servicesScene026B(v: HistoryBState026, change: Change026B): Scene026B {
  const r = seljukServices026B(v.serviceMask, v.serviceClaim, v.funded);
  return {
    title: "Hizmet ile gelir bağını izle",
    question: "Bu iddia için kanıt yeter mi?",
    expected: r.expected,
    choices: supportChoices026B,
    controls: (
      <>
        <Choice026B
          label="İddia"
          value={v.serviceClaim}
          options={[
            ["ticaret", "Ticaret ve gelir bağı"],
            ["egitim", "Öğretim ve gelir bağı"],
            ["saglik", "Sağlık ve gelir bağı"],
            ["tum-nufus", "Bütün nüfusun aynı yaşamı"],
          ]}
          change={(serviceClaim) =>
            change({
              serviceClaim: serviceClaim as HistoryBState026["serviceClaim"],
            })
          }
        />
        {r.services.map((service) => (
          <Check026B
            key={service.id}
            label={service.title}
            value={service.selected}
            change={(selected) =>
              change({
                serviceMask: selected
                  ? v.serviceMask | (1 << service.index)
                  : v.serviceMask & ~(1 << service.index),
              })
            }
          />
        ))}
        <Check026B
          label="Gelir bağı kaydı var"
          value={v.funded}
          change={(funded) => change({ funded })}
        />
      </>
    ),
    result: (
      <Result026B
        data-service-count={r.selectedCount}
        data-income-link-count={r.incomeLinkCount}
        data-service-supported={r.supported}
      >
        <p>İddia: {copy026B(r.claimText)}</p>
        <p>
          Seçili kurum: {r.selectedCount}. Gösterilen gelir bağı:{" "}
          {r.incomeLinkCount}.
        </p>
        <ul className="historyb026-records">
          {r.services.map((service) => (
            <li key={service.id}>
              <strong>
                <Readable026B text={service.title} />
              </strong>
              <p>{service.text}</p>
              <p>
                {service.selected
                  ? "Kurum kaydı seçili."
                  : "Kurum kaydı seçili değil."}{" "}
                {service.incomeLinked
                  ? "Bu hizmete gelir bağı gösterildi."
                  : "Bu hizmet için gelir bağına dair kayıt yok."}
              </p>
            </li>
          ))}
        </ul>
      </Result026B>
    ),
    diagram: (
      <>
        <Plot026B
          title="Seçili kurumlar ve onlara bağlanan gelir kaydı"
          kind="services"
          height={386}
        >
          {(w, marker) => (
            <>
              {r.services
                .filter((s) => s.incomeLinked)
                .map((s, i) => {
                  const y = 123 + s.index * 102;
                  return (
                    <path
                      key={s.id}
                      data-income-link={s.id}
                      d={`M40 68 V${y} H88`}
                      className={
                        i % 2 ? "historyb026-secondary" : "historyb026-primary"
                      }
                      markerEnd={`url(#${marker})`}
                    />
                  );
                })}
              <rect
                x={9}
                y={18}
                width={64}
                height={50}
                rx={9}
                className={
                  v.funded ? "historyb026-node" : "historyb026-open-box"
                }
              />
              <text x={41} y={49} textAnchor="middle">
                Gelir
              </text>
              {r.services.map((s) => {
                const y = 91 + s.index * 102;
                return (
                  <g
                    key={s.id}
                    data-service={s.id}
                    data-selected={String(s.selected)}
                  >
                    <rect
                      x={92}
                      y={y}
                      width={w - 107}
                      height={64}
                      rx={8}
                      className={
                        s.selected ? "historyb026-node" : "historyb026-open-box"
                      }
                    />
                    <text x={(w + 77) / 2} y={y + 27} textAnchor="middle">
                      {s.title}
                    </text>
                    <text x={(w + 77) / 2} y={y + 51} textAnchor="middle">
                      {s.selected ? "Seçili" : "Seçili değil"}
                    </text>
                  </g>
                );
              })}
            </>
          )}
        </Plot026B>
        <p>
          Ok yalnız seçili hizmet için gelir bağını gösterir. Kurum kaydı,
          finansman ve bütün nüfusun durumu ayrı sorulardır. Okun eksik olması
          hizmetin hiç var olmadığı anlamına gelmez.
        </p>
      </>
    ),
    proof: <p>{copy026B(r.explanation)}</p>,
    scope: (
      <p>
        Bu bir kurum ve gelir bağı modelidir; gerçek vakfiye alıntısı değildir.
        Kayıtlar, bir hizmete kaynak ayrıldığını belirtebilir. Her kurumun her
        yerde sonsuza dek kaldığı veya bütün nüfusun aynı işi yaptığı sonucu
        çıkmaz.
      </p>
    ),
  };
}
function HistoryBExplorer026({
  lessonId,
  base,
}: {
  lessonId: string;
  base: HistoryBId026;
}) {
  const key = "forge026-history-b:" + lessonId,
    [saved, save] = useExploration(key, historyBDefaults026),
    raw = useApp().state.explorations[key],
    v = normalizeHistoryB026(saved),
    fields = historyBActive026(base, v),
    validSelection = fields.every(
      (field) =>
        saved[field] === v[field] &&
        (!raw ||
          !Object.hasOwn(raw, field) ||
          typeof raw[field] === typeof historyBDefaults026[field]),
    ),
    commit: Change026B = (patch) =>
      save(normalizeHistoryB026({ ...v, ...patch })),
    change: Change026B = (patch) =>
      commit({ ...patch, guess: "", reason: "", checked: false }),
    scene =
      base === "ortacag-dunya"
        ? authorityScene026B(v, change)
        : base === "ilk-turk-dunyasi"
          ? steppeScene026B(v, change)
          : base === "islam-medeniyetinin-dogusu"
            ? timelineScene026B(v, change)
            : base === "turklerin-islamiyeti-kabulu"
              ? conversionScene026B(v, change)
              : servicesScene026B(v, change),
    validGuess = scene.choices.some(([guess]) => guess === v.guess),
    ready = validSelection && validGuess && v.reason.trim().length > 0,
    uid = useId();
  return (
    <section
      className="historyb026-lab"
      data-forge026={lessonId}
      data-historyb026-kind={base}
    >
      <h3>{scene.title}</h3>
      <p>
        Koşulu seç, veriyi izle, tahminini yaz ve kanıtla kıyasla. Sayılar ile
        kaynak özetleri bu deneyin açık verileridir.
      </p>
      <div className="historyb026-controls">{scene.controls}</div>
      {scene.diagram}
      {scene.result}
      <div className="historyb026-scope">{scene.scope}</div>
      <fieldset className="historyb026-compare">
        <legend>{scene.question}</legend>
        <Choice026B
          label="Sonuç tahminin"
          value={validGuess ? v.guess : ""}
          options={[["", "Bir sonuç seç"], ...scene.choices]}
          change={(guess) => commit({ guess, checked: false })}
        />
        <label htmlFor={uid}>Modelden gerekçen</label>
        <textarea
          id={uid}
          rows={3}
          value={v.reason}
          maxLength={120}
          onChange={(e) =>
            commit({ reason: e.target.value.slice(0, 120), checked: false })
          }
        />
        <button
          type="button"
          disabled={!ready}
          onClick={() => commit({ checked: true })}
        >
          Kanıtı karşılaştır
        </button>
        {v.checked && ready && (
          <div role="status" className="historyb026-feedback">
            <strong>
              {v.guess === scene.expected
                ? "Tahminin model sonucuyla uyumlu."
                : "Veriyi ve iddiayı yeniden kıyasla."}
            </strong>
            <p>
              Sonuç:{" "}
              {scene.choices.find(([key]) => key === scene.expected)?.[1]}.
            </p>
            {scene.proof}
            <p>Gerekçen: {v.reason}</p>
            <p>
              Bu kıyas yalnız seçilen iddiayı denetler; gerekçene otomatik not
              verilmez.
            </p>
          </div>
        )}
      </fieldset>
      <p className="small muted">
        Keşif bu cihazda ayrı saklanır. Puan, XP, ustalık, tekrar veya konu
        bitirme kaydı eklemez. Boş olmayan kısa gerekçeler de geçerlidir.
      </p>
    </section>
  );
}
export default function Forge026HistoryBLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const base = lessonId.endsWith("-ileri") ? lessonId.slice(0, -6) : lessonId;
  return historyBIds026.includes(base as HistoryBId026) ? (
    <HistoryBExplorer026 lessonId={lessonId} base={base as HistoryBId026} />
  ) : null;
}
