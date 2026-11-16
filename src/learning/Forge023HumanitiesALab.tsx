import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  allocation023A,
  art023A,
  arts023A,
  beliefGroup023A,
  beliefTerms023A,
  concept023A,
  conceptCases023A,
  forge023HumanitiesATopics,
  heritage023A,
  heritagePlaces023A,
  humanitiesADefaults023,
  water023A,
  worship023A,
  worshipActions023A,
  youth023A,
} from "./forge023HumanitiesA";
import "./forge023HumanitiesA.css";
type Pair = [string, string];
const display = (s: string) => s.replaceAll("Farzıkifaye", "Farz-ı kifaye");
const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 }).format(n);
const shortLabels: Record<string, string> = {
  "Beş vakit namaz": "Namaz",
  "Ramazan orucu": "Oruç",
  "Cenaze namazı": "Cenaze",
  "Vitir namazı": "Vitir",
  "Kuşluk namazı": "Kuşluk",
  "Komşuya yardım": "Yardım",
  "Uygun dinlenme": "Dinlen",
  "Allah’a iman": "Allah",
  "Meleklere iman": "Melek",
  "Kitaplara iman": "Kitap",
  "Elçilere iman": "Elçi",
  "Ahirete iman": "Ahiret",
  "Kadere iman": "Kader",
  "Verilen amaçla kulluk bağı kurulur": "Var",
  "Gösteriş amacı var": "Gösteriş",
  "Niyet için veri eksik": "Belirsiz",
  "İki ihtiyaç da karşılanır": "Tam",
  "Açık ihtiyaç kalır": "Açık var",
  "İhtiyaç sıfır": "Sıfır",
  "Bu olayda görev bitti": "Yapıldı",
  "Bu olayda görev aksadı": "Aksadı",
  "Görev için veri yok": "Veri yok",
  "Durak listesinde var": "Listede",
  "Durak listesinde yok": "Dışarıda",
  "Önlenebilir kayıp yok": "Yok",
  "Kayıp geri alınmıyor": "Alınmadı",
  "Kaybın bir bölümü geri alınıyor": "Bir kısmı",
  "Kaybın tamamı geri alınıyor": "Tamamı",
  Farzıkifaye: "Kifaye",
  "Vacip (Hanefî)": "Vacip",
  "Nafile / mendup": "Nafile",
  Semerkant: "Semerk.",
  Kayrevan: "Kayrev.",
};
const short = (s: string) => shortLabels[s] || s;
const entries = (o: Record<string, { label: string }>): Pair[] =>
  Object.entries(o).map(([id, v]) => [id, short(v.label)]);
function ArtDrawing({
  kind,
  stage,
  uid,
}: {
  kind: string;
  stage: number;
  uid: string;
}) {
  return (
    <svg
      viewBox="0 0 340 220"
      role="img"
      aria-labelledby={`${uid}-art-title`}
      data-art-kind={kind}
      data-art-stage={stage}
    >
      <title id={`${uid}-art-title`}>
        Sanatın malzeme ve yapım ilişkisini gösteren özgün şema
      </title>
      <rect
        x="15"
        y="15"
        width="310"
        height="190"
        rx="5"
        fill="var(--bg)"
        stroke="var(--muted)"
      />
      {kind === "architecture" && (
        <g fill="none" stroke="var(--accent)" strokeWidth="4">
          <path d="M70 185V90 Q170 -10 270 90 V185" />
          {stage >= 1 && <path d="M95 185V100 Q170 25 245 100V185" />}
          {stage >= 2 && (
            <>
              <path d="M40 185H300" />
              <path
                d="M170 64V185"
                strokeDasharray="6 7"
                stroke="var(--muted)"
              />
            </>
          )}
        </g>
      )}
      {kind === "literature" && (
        <g fill="none" strokeWidth="4" stroke="var(--accent)">
          {Array.from({ length: (stage + 1) * 2 }, (_, i) => (
            <path key={i} d={`M50 ${52 + i * 25}H${i % 2 ? 245 : 290}`} />
          ))}
        </g>
      )}
      {kind === "music" && (
        <g fill="none" stroke="var(--accent)" strokeWidth="4">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M45 ${65 + i * 23}H295`}
              stroke="var(--muted)"
              strokeWidth="1.3"
            />
          ))}
          {Array.from({ length: stage + 2 }, (_, i) => (
            <g key={i}>
              <ellipse
                cx={75 + i * 55}
                cy={150 - (i % 2) * 34}
                rx="11"
                ry="7"
                fill="var(--accent)"
              />
              <path d={`M${85 + i * 55} ${148 - (i % 2) * 34}v-65`} />
            </g>
          ))}
        </g>
      )}
      {kind === "calligraphy" && (
        <g fill="none" stroke="var(--accent)" strokeLinecap="round">
          <path d="M60 165 Q95 35 140 65" strokeWidth="7" />
          {stage >= 1 && <path d="M140 65Q115 175 210 150" strokeWidth="12" />}
          {stage >= 2 && <path d="M190 125 Q250 35 280 90" strokeWidth="5" />}
        </g>
      )}
      {kind === "illumination" && (
        <g stroke="var(--accent)" fill="none" strokeWidth="2.5">
          <rect x="50" y="45" width="240" height="130" />
          {Array.from({ length: stage + 2 }, (_, i) => (
            <g key={i}>
              <path
                d={`M${80 + i * 60} 45q-18 -25 0 -25q18 0 0 25q-18 25 0 25q18 0 0 -25`}
              />
              <path
                d={`M${80 + i * 60} 175q-18 -25 0 -25q18 0 0 25q-18 25 0 25q18 0 0 -25`}
              />
            </g>
          ))}
        </g>
      )}
      {kind === "marbling" && (
        <g fill="none" stroke="var(--accent)" strokeWidth="4">
          {Array.from({ length: stage + 2 }, (_, i) => (
            <path
              key={i}
              d={`M45 ${60 + i * 40} C100 ${15 + i * 35} 130 ${125 + i * 12} 190 ${65 + i * 30} S260 ${30 + i * 35} 295 ${70 + i * 40}`}
            />
          ))}
          {stage === 2 && (
            <rect
              x="38"
              y="32"
              width="266"
              height="158"
              strokeDasharray="8 5"
              stroke="var(--muted)"
              strokeWidth="2"
            />
          )}
        </g>
      )}
      {kind === "miniature" && (
        <g stroke="var(--accent)" fill="var(--surface-2)" strokeWidth="2.5">
          <path d="M42 180H298" />
          <rect x="60" y="110" width="75" height="70" />
          <path d="M53 110L98 70L142 110Z" />
          {stage >= 1 && (
            <>
              <path d="M240 180V60" />
              <ellipse cx="240" cy="75" rx="25" ry="38" />
            </>
          )}
          {stage >= 2 && (
            <>
              <rect x="77" y="140" width="22" height="40" />
              <path d="M150 180Q170 125 190 180" fill="none" />
            </>
          )}
        </g>
      )}
    </svg>
  );
}
export default function Forge023HumanitiesALab({
  lessonId,
}: {
  lessonId: string;
}) {
  const uid = useId(),
    [saved, set] = useExploration(
      `forge023-humanities-a:${lessonId}`,
      humanitiesADefaults023,
    );
  const pick = (
    key: keyof typeof saved,
    allowed: string[],
    fallback: string,
  ) => (allowed.includes(String(saved[key])) ? String(saved[key]) : fallback);
  const num = (
    key: keyof typeof saved,
    min: number,
    max: number,
    fallback: number,
  ) =>
    Number.isSafeInteger(saved[key]) &&
    Number(saved[key]) >= min &&
    Number(saved[key]) <= max
      ? Number(saved[key])
      : fallback;
  const concept = concept023A(
      pick("concept", Object.keys(conceptCases023A), "fitra"),
    ),
    term = beliefGroup023A(
      pick("term", Object.keys(beliefTerms023A), "destiny"),
    );
  const worship = worship023A(
    pick("action", Object.keys(worshipActions023A), "prayer"),
    pick("intent", ["devotion", "unknown", "display"], "unknown"),
    saved.conditions,
    saved.done,
  );
  const allocation = allocation023A(
    num("needA", 0, 12, 2),
    num("needB", 0, 12, 6),
    num("resource", 0, 24, 8),
    pick("method", ["need", "equal"], "equal"),
  );
  const youth = youth023A(
    pick("talk", ["quiet", "social"], "quiet"),
    pick("task", ["kept", "missed", "unknown"], "kept"),
  );
  const place = heritage023A(
    pick("place", Object.keys(heritagePlaces023A), "medina"),
    pick("route", ["east", "west", "mixed"], "mixed"),
  );
  const art = art023A(
      pick("art", Object.keys(arts023A), "illumination"),
      num("stage", 0, 2, 0),
    ),
    water = water023A(
      num("needed", 0, 60, 40),
      num("waste", 0, 40, 20),
      num("recovery", 0, 100, 0),
    );
  if (!Object.hasOwn(forge023HumanitiesATopics, lessonId))
    throw new RangeError("HUMANITIES023A_LESSON");
  const mode =
    lessonId === "din-ve-islam"
      ? "concept"
      : lessonId === "islam-ve-ibadet"
        ? "worship"
        : lessonId === "ahlaki-tutum-ve-davranislar"
          ? "allocation"
          : lessonId === "genclik-ve-degerler"
            ? "youth"
            : lessonId === "gonul-cografyamiz"
              ? "heritage"
              : "life";
  const change = (patch: Parameters<typeof set>[0]) =>
    set({ ...patch, guess: "", reason: "", show: false, compared: false });
  const select = (key: keyof typeof saved, label: string, options: Pair[]) => (
    <div key={key}>
      <label htmlFor={`${uid}-${key}`}>{label}</label>
      <select
        id={`${uid}-${key}`}
        value={
          key === "stage"
            ? art.stage
            : pick(
                key,
                options.map((o) => o[0]),
                String(humanitiesADefaults023[key]),
              )
        }
        onChange={(e) =>
          change({
            [key]: key === "stage" ? Number(e.target.value) : e.target.value,
          })
        }
      >
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {short(text)}
          </option>
        ))}
      </select>
      <p className="humanities023a-selected">
        Seçili:{" "}
        <strong>
          {
            options.find(
              ([value]) =>
                value ===
                String(
                  key === "stage"
                    ? art.stage
                    : pick(
                        key,
                        options.map((o) => o[0]),
                        String(humanitiesADefaults023[key]),
                      ),
                ),
            )?.[1]
          }
        </strong>
      </p>
    </div>
  );
  const range = (
    key: keyof typeof saved,
    label: string,
    min: number,
    max: number,
    value: number,
    unit: string,
  ) => (
    <div key={key}>
      <label htmlFor={`${uid}-${key}`}>
        {label}:{" "}
        <strong>
          {fmt(value)} {unit}
        </strong>
      </label>
      <input
        id={`${uid}-${key}`}
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step="1"
        value={value}
        onChange={(e) => change({ [key]: Number(e.target.value) })}
      />
    </div>
  );
  const flag = (key: "conditions" | "done", label: string) => (
    <label className="humanities023a-flag" key={key}>
      <input
        type="checkbox"
        checked={saved[key]}
        onChange={(e) => change({ [key]: e.target.checked })}
      />
      {label}
    </label>
  );
  const title = {
    concept: "Kavramın kanıtını bul",
    worship: "Aynı eylem, farklı veri",
    allocation: "İhtiyacı ve payı karşılaştır",
    youth: "Mizaç ile davranışı ayır",
    heritage: "Eseri doğru şehre bağla",
    life: "Sanatın tekniğini ve kaynağın yolunu izle",
  }[mode];
  const decision =
    mode === "concept"
      ? concept.label
      : mode === "worship"
        ? worship.decision
        : mode === "allocation"
          ? allocation.decision
          : mode === "youth"
            ? youth.decision
            : mode === "heritage"
              ? place.decision
              : water.decision;
  const options =
    mode === "concept"
      ? entries(conceptCases023A).map((v) => v[1])
      : mode === "worship"
        ? worship.scope === "Özel kapsam"
          ? ["Farzıayn", "Farzıkifaye", "Vacip (Hanefî)", "Nafile / mendup"]
          : [
              "Verilen amaçla kulluk bağı kurulur",
              "Gösteriş amacı var",
              "Niyet için veri eksik",
            ]
        : mode === "allocation"
          ? ["İki ihtiyaç da karşılanır", "Açık ihtiyaç kalır", "İhtiyaç sıfır"]
          : mode === "youth"
            ? [
                "Bu olayda görev bitti",
                "Bu olayda görev aksadı",
                "Görev için veri yok",
              ]
            : mode === "heritage"
              ? ["Durak listesinde var", "Durak listesinde yok"]
              : [
                  "Önlenebilir kayıp yok",
                  "Kayıp geri alınmıyor",
                  "Kaybın bir bölümü geri alınıyor",
                  "Kaybın tamamı geri alınıyor",
                ];
  const guess = options.includes(saved.guess) ? saved.guess : "",
    reason = saved.reason.slice(0, 120),
    compared = saved.compared && Boolean(guess && reason.trim()),
    revealed = saved.show || compared;
  const scale = Math.max(
      1,
      allocation.resource,
      allocation.needA,
      allocation.needB,
      allocation.a,
      allocation.b,
    ),
    bar = (n: number) => (240 * n) / scale;
  return (
    <section className="humanities023a-lab" data-forge023={lessonId}>
      <h3>{title}</h3>
      <p>
        Bir koşulu değiştir, sonucu izle ve karara hangi verinin etki ettiğini
        kendi sözlerinle açıkla.
      </p>
      <div className="humanities023a-controls">
        {mode === "concept" && (
          <>
            {select("concept", "Örnek odağı", entries(conceptCases023A))}
            {select("term", "Listeden bir öğe", entries(beliefTerms023A))}
          </>
        )}
        {mode === "worship" && (
          <>
            {select("action", "Örnek eylem", entries(worshipActions023A))}
            {select("intent", "Verilen amaç", [
              ["unknown", "Veri yok"],
              ["devotion", "Allah için"],
              ["display", "Gösteriş"],
            ])}
            {worship.conditional &&
              flag("conditions", "Örnekte ilgili şartlar var")}
            {worship.action === "funeral" &&
              flag("done", "Gerekli görev yeterince yapılmış")}
          </>
        )}
        {mode === "allocation" && (
          <>
            {range("needA", "A’nın ihtiyacı", 0, 12, allocation.needA, "saat")}
            {range("needB", "B’nin ihtiyacı", 0, 12, allocation.needB, "saat")}
            {range(
              "resource",
              "Ayrılan kaynak",
              0,
              24,
              allocation.resource,
              "saat",
            )}
            {select("method", "Dağıtım yöntemi", [
              ["equal", "Eşit pay"],
              ["need", "Oran"],
            ])}
          </>
        )}
        {mode === "youth" && (
          <>
            {select("talk", "Konuşma biçimi", [
              ["quiet", "Sessiz"],
              ["social", "Çok söz"],
            ])}
            {select("task", "Göreve ilişkin veri", [
              ["kept", "Yapıldı"],
              ["missed", "Yapmadı"],
              ["unknown", "Veri yok"],
            ])}
          </>
        )}
        {mode === "heritage" && (
          <>
            {select("place", "Şehir", entries(heritagePlaces023A))}
            {select("route", "Gezi listesi", [
              ["east", "Doğu"],
              ["west", "Batı"],
              ["mixed", "Karma"],
            ])}
          </>
        )}
        {mode === "life" && (
          <>
            {select("art", "Sanat alanı", entries(arts023A))}
            {select("stage", "Şema aşaması", [
              ["0", "İlk adım"],
              ["1", "İki adım"],
              ["2", "Üç adım"],
            ])}
          </>
        )}
      </div>
      <div className="humanities023a-model">
        {mode === "concept" && (
          <>
            <p data-full-context>{concept.context}</p>
            <svg
              viewBox="0 0 340 250"
              role="img"
              aria-labelledby={`${uid}-concept-title`}
            >
              <title id={`${uid}-concept-title`}>
                Verilen örnekte kavram ilişkisi ve seçili sınıflama
              </title>
              {concept.nodes.map((n, i) => (
                <g key={n}>
                  <rect
                    x="45"
                    y={15 + i * 64}
                    width="250"
                    height="46"
                    rx="8"
                    fill="var(--bg)"
                    stroke="var(--accent)"
                    strokeWidth="2"
                  />
                  <text
                    x="170"
                    y={44 + i * 64}
                    textAnchor="middle"
                    fontSize="21"
                    fill="var(--text)"
                  >
                    {n}
                  </text>
                  {i < 2 && (
                    <path
                      d={`M170 ${61 + i * 64}v18m-6 -6 6 6 6 -6`}
                      fill="none"
                      stroke="var(--muted)"
                      strokeWidth="2"
                    />
                  )}
                </g>
              ))}
              <text
                x="170"
                y="237"
                textAnchor="middle"
                fontSize="21"
                fill="var(--text)"
              >
                {term.group}
              </text>
            </svg>
            <p data-selected-term>
              <strong>{term.label}</strong> → {term.group}.
            </p>
            <p>
              <strong>Örnekteki dayanak:</strong> {concept.evidence}.
            </p>
          </>
        )}
        {mode === "worship" && (
          <>
            <p data-full-context>
              {worship.label} için özgün öğretim örneği. {worship.intention}{" "}
              {worship.condition}
            </p>
            <svg
              viewBox="0 0 340 270"
              role="img"
              aria-labelledby={`${uid}-worship-title`}
            >
              <title id={`${uid}-worship-title`}>
                Eylem, niyet ve şart için ayrı veriler
              </title>
              {[
                { label: "Eylem", value: worship.label, known: true },
                {
                  label: "Niyet",
                  value:
                    worship.intent === "devotion"
                      ? "Rıza amacı"
                      : worship.intent === "display"
                        ? "Gösteriş amacı"
                        : "Belirtilmedi",
                  known: worship.intent !== "unknown",
                },
                {
                  label: "Şart",
                  value: worship.conditional
                    ? worship.conditions
                      ? "Şartlar var"
                      : "Şartlar yok"
                    : worship.action === "funeral"
                      ? worship.done
                        ? "Ortak iş tamam"
                        : "Ortak iş eksik"
                      : "Ayrı incelenir",
                  known: worship.conditional || worship.action === "funeral",
                },
              ].map((node, i) => (
                <g key={node.label} data-worship-node={i}>
                  <rect
                    x="45"
                    y={15 + i * 80}
                    width="250"
                    height="68"
                    rx="8"
                    fill="var(--bg)"
                    stroke={node.known ? "var(--accent)" : "var(--muted)"}
                    strokeWidth="2"
                    strokeDasharray={node.known ? undefined : "7 5"}
                  />
                  <text
                    x="170"
                    y={40 + i * 80}
                    textAnchor="middle"
                    fontSize="22"
                    fill="var(--text)"
                  >
                    {node.label}
                  </text>
                  <text
                    data-worship-evidence={i}
                    x="170"
                    y={67 + i * 80}
                    textAnchor="middle"
                    fontSize="22"
                    fill="var(--text)"
                  >
                    {node.value}
                  </text>
                </g>
              ))}
            </svg>
            <p>
              Üç ayrı veri satırı: görünen eylemden gizli niyet çıkmaz. Kesik
              sınır, bu örnekte ayrıca incelenecek bilgiyi gösterir.
            </p>
            <p>
              <strong>Kapsam:</strong> {worship.scope}.{" "}
              <strong>Hüküm başlığı:</strong> {display(worship.category)}.
            </p>
            <p>{worship.note}</p>
          </>
        )}
        {mode === "allocation" && (
          <>
            <p data-full-context>{allocation.limit}</p>
            <svg
              viewBox="0 0 340 235"
              role="img"
              aria-labelledby={`${uid}-allocation-title`}
              data-allocation-method={allocation.method}
            >
              <title id={`${uid}-allocation-title`}>
                İhtiyaç çizgisi ile ayrılan destek aynı saat ölçeğinde
              </title>
              {[
                ["A", allocation.needA, allocation.a],
                ["B", allocation.needB, allocation.b],
              ].map(([name, need, share], i) => (
                <g key={name}>
                  <text x="22" y={61 + i * 90} fontSize="22" fill="var(--text)">
                    {name}
                  </text>
                  <rect
                    x="60"
                    y={30 + i * 90}
                    width={bar(Number(need))}
                    height="48"
                    fill="none"
                    stroke="var(--text)"
                    strokeDasharray="6 4"
                    strokeWidth="2"
                    data-need-hours={need}
                  />
                  <rect
                    x="60"
                    y={43 + i * 90}
                    width={bar(Number(share))}
                    height="22"
                    fill="var(--accent)"
                    data-share-hours={share}
                  />
                  <text
                    x="60"
                    y={106 + i * 90}
                    fontSize="20"
                    fill="var(--text)"
                  >
                    {fmt(Number(share))} / {fmt(Number(need))} saat
                  </text>
                </g>
              ))}
            </svg>
            <p>
              Kesik sınır ihtiyaç; dolu çubuk ayrılan paydır. İkisi aynı saat
              ölçeğine uyar.
            </p>
            <dl>
              <div>
                <dt>A’nın payı</dt>
                <dd>{fmt(allocation.a)} saat</dd>
              </div>
              <div>
                <dt>B’nin payı</dt>
                <dd>{fmt(allocation.b)} saat</dd>
              </div>
              <div>
                <dt>Kalan ihtiyaç A / B</dt>
                <dd>
                  {fmt(allocation.unmetA)} / {fmt(allocation.unmetB)} saat
                </dd>
              </div>
              <div>
                <dt>İhtiyaç üstü pay A / B</dt>
                <dd>
                  {fmt(allocation.overA)} / {fmt(allocation.overB)} saat
                </dd>
              </div>
              <div>
                <dt>Kalan kaynak</dt>
                <dd>{fmt(allocation.unused)} saat</dd>
              </div>
            </dl>
          </>
        )}
        {mode === "youth" && (
          <>
            <p data-full-context>{youth.context}</p>
            <svg
              viewBox="0 0 340 235"
              role="img"
              aria-labelledby={`${uid}-youth-title`}
              data-talk={youth.talk}
              data-task={youth.task}
            >
              <title id={`${uid}-youth-title`}>
                İletişim biçimi ile göreve ilişkin kanıt iki ayrı eksen
              </title>
              <path
                d="M55 30V180H300M55 105H300M177 30V180"
                fill="none"
                stroke="var(--muted)"
                strokeWidth="1.6"
              />
              <text x="78" y="210" fontSize="20" fill="var(--text)">
                Az söz
              </text>
              <text x="215" y="210" fontSize="20" fill="var(--text)">
                Çok söz
              </text>
              <circle
                cx={youth.talk === "quiet" ? 110 : 240}
                cy={
                  youth.task === "kept"
                    ? 65
                    : youth.task === "missed"
                      ? 145
                      : 105
                }
                r="12"
                fill="var(--accent)"
                data-youth-point
              />
              <text
                x="170"
                y="24"
                textAnchor="middle"
                fontSize="20"
                fill="var(--text)"
              >
                Görev kanıtı
              </text>
            </svg>
            <p>{youth.temperament}</p>
            <p>
              <strong>{youth.evidence}</strong>
            </p>
            <p>
              Üst sıra yapılmış işi, alt sıra bu olayda eksik işi, orta çizgi
              görev için veri yokluğunu gösterir. Bu bir kişilik puanı değildir.
            </p>
          </>
        )}
        {mode === "heritage" && (
          <>
            <p data-full-context>{place.limit}</p>
            <svg
              viewBox="0 0 340 240"
              role="img"
              aria-labelledby={`${uid}-heritage-title`}
            >
              <title id={`${uid}-heritage-title`}>
                Yaklaşık şehir konumlarının enlem ve boylam ızgarası
              </title>
              {[-10, 20, 50, 80].map((lon) => (
                <g key={lon}>
                  <path
                    d={`M${20 + (lon + 20) * 2.9} 20V210`}
                    stroke="var(--border)"
                  />
                  <text
                    x={20 + (lon + 20) * 2.9}
                    y="232"
                    textAnchor="middle"
                    fontSize="20"
                    fill="var(--text)"
                  >
                    {lon}°
                  </text>
                </g>
              ))}
              {[20, 30, 40, 50].map((lat) => (
                <path
                  key={lat}
                  d={`M20 ${20 + (55 - lat) * 4.5}H325`}
                  stroke="var(--border)"
                />
              ))}
              {Object.entries(heritagePlaces023A).map(([key, p]) => (
                <circle
                  key={key}
                  cx={20 + (p.lon + 20) * 2.9}
                  cy={20 + (55 - p.lat) * 4.5}
                  r={key === place.place ? 8 : 3}
                  fill={key === place.place ? "var(--accent)" : "var(--muted)"}
                  stroke={key === place.place ? "var(--text)" : undefined}
                  strokeWidth="2"
                  data-place={key}
                  data-current={key === place.place}
                />
              ))}
              <text x="25" y="22" fontSize="20" fill="var(--text)">
                K
              </text>
            </svg>
            <p>
              <strong>{place.label}</strong> — {place.region}. Yaklaşık{" "}
              {fmt(place.lat)}° kuzey, {fmt(place.lon)}° doğu.
            </p>
            <p>
              <strong>İz:</strong> {place.trace}. <strong>İşlev:</strong>{" "}
              {place.role}.
            </p>
            <p>{place.note}</p>
            <p>
              <strong>Seçili gezi:</strong>{" "}
              {place.stops
                .map(
                  (id) =>
                    heritagePlaces023A[id as keyof typeof heritagePlaces023A]
                      .label,
                )
                .join(", ")}
            </p>
          </>
        )}
        {mode === "life" && (
          <>
            <p data-full-context>
              Seçili sanatın aracını ve yapım ilişkisini izle. Sonra gerekli su
              ile önlenebilir kaybı ayrı değiştir; tasarrufun ihtiyacı bırakmak
              olmadığını açıkla.
            </p>
            <ArtDrawing kind={art.kind} stage={art.stage} uid={uid} />
            <p>
              <strong>{art.label}</strong> — {art.material}. {art.clue}.
            </p>
            <ol>
              {art.visible.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p>{art.note}</p>
            <div className="humanities023a-controls">
              {range("needed", "Gerekli su", 0, 60, water.needed, "L")}
              {range("waste", "Önlenebilir kayıp", 0, 40, water.waste, "L")}
              {range("recovery", "Geri kazanım", 0, 100, water.recovery, "%")}
            </div>
            <svg
              viewBox="0 0 340 235"
              role="img"
              aria-labelledby={`${uid}-water-title`}
              data-water-fresh={water.fresh}
            >
              <title id={`${uid}-water-title`}>
                100 litre kapasite içinde dış su ve yeniden kullanılan su
                dengesi
              </title>
              <rect
                x="40"
                y="40"
                width="260"
                height="46"
                fill="none"
                stroke="var(--text)"
                strokeWidth="2"
              />
              <rect
                x="40"
                y="40"
                width={water.fresh * 2.6}
                height="46"
                fill="var(--accent)"
              />
              <rect
                x={40 + water.fresh * 2.6}
                y="40"
                width={water.reused * 2.6}
                height="46"
                fill="var(--mint)"
                stroke="var(--text)"
                strokeWidth="1"
              />
              <path
                d="M40 120H300M40 115V125M300 115V125"
                fill="none"
                stroke="var(--muted)"
                strokeWidth="2"
              />
              <text x="40" y="151" fontSize="20" fill="var(--text)">
                0
              </text>
              <text
                x="300"
                y="151"
                textAnchor="end"
                fontSize="20"
                fill="var(--text)"
              >
                100 L
              </text>
              <text
                x="170"
                y="197"
                textAnchor="middle"
                fontSize="21"
                fill="var(--text)"
              >
                {fmt(water.fresh)} + {fmt(water.reused)} = {fmt(water.gross)} L
              </text>
            </svg>
            <p>
              Dolu ilk alan dış su, ikinci alan geri kazanılan sudur; ayrı kenar
              çizgisi ve aşağıdaki sayılarla da ayırt edilir.
            </p>
            <dl>
              <div>
                <dt>Brüt kullanım</dt>
                <dd>{fmt(water.gross)} L</dd>
              </div>
              <div>
                <dt>Geri kazanılan</dt>
                <dd>{fmt(water.reused)} L</dd>
              </div>
              <div>
                <dt>Dışarıdan gereken</dt>
                <dd>{fmt(water.fresh)} L</dd>
              </div>
            </dl>
            <p>{water.limit}</p>
          </>
        )}
      </div>
      <fieldset>
        <legend>
          {mode === "concept"
            ? "Örneğin kavramını seç"
            : mode === "worship" && worship.scope === "Özel kapsam"
              ? "Hüküm başlığını seç"
              : mode === "worship"
                ? "Niyet verisini yorumla"
                : mode === "allocation"
                  ? "İhtiyaç karşılandı mı?"
                  : mode === "youth"
                    ? "Görev için ne biliyoruz?"
                    : mode === "heritage"
                      ? "Seçili şehir duraklar içinde mi?"
                      : "Kayıp için ne değişti?"}
        </legend>
        <label htmlFor={`${uid}-guess`}>Tahminin</label>
        <select
          id={`${uid}-guess`}
          value={guess}
          onChange={(e) => set({ guess: e.target.value, compared: false })}
        >
          <option value="">Seç</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {short(o)}
            </option>
          ))}
        </select>
        <p className="humanities023a-selected">
          Tahminin: <strong>{guess || "Henüz seçilmedi"}</strong>
        </p>
        <label htmlFor={`${uid}-reason`}>Gerekçen</label>
        <textarea
          id={`${uid}-reason`}
          rows={3}
          maxLength={120}
          value={reason}
          onChange={(e) =>
            set({ reason: e.target.value.slice(0, 120), compared: false })
          }
        />
        <button
          className="secondary humanities023a-compare"
          type="button"
          disabled={!guess || !reason.trim()}
          onClick={() => set({ compared: true })}
        >
          Tahminimi karşılaştır
        </button>
        {compared && (
          <div className="humanities023a-feedback" role="status">
            <p>
              <strong>
                {guess === decision
                  ? "Seçimin bu veriyle uyumlu."
                  : "Seçimini kanıtla yeniden denetle."}
              </strong>
            </p>
            <p>
              Gerekçene otomatik not verilmez; kendi açıklamanı verilen kanıtla
              karşılaştır.
            </p>
          </div>
        )}
      </fieldset>
      <button
        className="secondary"
        type="button"
        aria-expanded={revealed}
        aria-controls={`${uid}-result`}
        onClick={() => set({ show: !revealed, compared: false })}
      >
        Kanıtı {revealed ? "gizle" : "göster"}
      </button>
      <div
        id={`${uid}-result`}
        className="humanities023a-result"
        data-model-result
        aria-live="polite"
      >
        {revealed ? (
          <>
            <p>
              <strong>{display(decision)}</strong>
            </p>
            {mode === "concept" ? (
              <>
                <p>{concept.detail}</p>
                <p>
                  {term.label}: {term.group}.
                </p>
              </>
            ) : mode === "worship" ? (
              <p>{display(worship.details)}</p>
            ) : mode === "allocation" ? (
              <>
                <p>
                  A: {fmt(allocation.a)} saat, B: {fmt(allocation.b)} saat.
                  Kalan ihtiyaç: {fmt(allocation.unmetA)} ve{" "}
                  {fmt(allocation.unmetB)} saat.
                </p>
                <p>
                  İhtiyaç ölçütü ile eşit miktar aynı koşul değildir; verilen
                  örneğin ölçütünü koru.
                </p>
              </>
            ) : mode === "youth" ? (
              <p>{youth.explanation}</p>
            ) : mode === "heritage" ? (
              <>
                <p>
                  {place.trace} → {place.label} → {place.region}.
                </p>
                <p>
                  Gezi listesiyle konum bağı ayrı denetlenir. Ortak medeniyet
                  bağı, aynı kentte bulunma anlamına gelmez.
                </p>
              </>
            ) : (
              <p>
                Dış su {fmt(water.fresh)} L; yeniden kullanım{" "}
                {fmt(water.reused)} L; brüt ihtiyaç {fmt(water.gross)} L.
                Gerekli kullanımı kesmekle önlenebilir kaybı azaltmak farklıdır.
              </p>
            )}
          </>
        ) : (
          <p>Önce tahminini düşün; sonra kanıtını yaz veya kanıtı aç.</p>
        )}
      </div>
      <p>
        Bu keşif öğrenme puanı, doğru cevap veya konuyu bitirme kaydı vermez.
        Yeni bir örneği bağımsız çözmek ayrı çalışmadır.
      </p>
    </section>
  );
}
