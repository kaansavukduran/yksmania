import { useId, useState, type ReactNode, type CSSProperties } from "react";
import { useExploration } from "./useExploration";
import {
  rocks016Actions,
  rock016State,
  turkeyInner016Cases,
  turkeyInner016State,
  river016Modes,
  river016State,
  karst016Forms,
  karst016State,
  windIce016Cases,
  windIce016State,
  coast016Forms,
  coast016State,
  turkeyExternal016Sites,
  turkeyExternal016State,
  relief016Profiles,
  relief016State,
  water016Springs,
  water016State,
} from "./forge016Geography";
import "./forge016Geography.css";
const clamp = (n: number, a: number, b: number) =>
  Number.isFinite(n) ? Math.min(b, Math.max(a, n)) : a;
const fmt = (n: number, d = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: d }).format(n);
function Diagram({
  title,
  description,
  children,
  height = 280,
  width = 400,
}: {
  title: string;
  description: string;
  children: ReactNode;
  height?: number;
  width?: number;
}) {
  const uid = useId();
  return (
    <svg
      className="g016-diagram"
      style={{ "--g016-arrow": `url(#${uid}-arrow)` } as CSSProperties}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby={`${uid}-title ${uid}-desc`}
    >
      <defs>
        <marker
          id={`${uid}-arrow`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path className="g016-flow-head" d="M1 1L9 5L1 9Z" />
        </marker>
      </defs>
      <title id={`${uid}-title`}>{title}</title>
      <desc id={`${uid}-desc`}>{description}</desc>
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
  options: readonly (readonly [string, string])[];
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <div className="g016-control">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
      <output className="g016-selected" htmlFor={id}>
        Seçili: {options.find(([v]) => v === value)?.[1]}
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
  onChange: (n: number) => void;
}) {
  const id = useId();
  const [draft, setDraft] = useState(String(value));
  const [editing, setEditing] = useState(false);
  const commit = () => {
    setEditing(false);
    if (draft.trim() === "" || !Number.isFinite(Number(draft))) return;
    const normalized =
      min + Math.round((clamp(Number(draft), min, max) - min) / step) * step;
    onChange(clamp(normalized, min, max));
  };
  return (
    <div className="g016-control">
      <label htmlFor={id}>
        {label}: <strong>{fmt(value)}</strong>
      </label>
      <input
        id={id}
        type="range"
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <input
        type="number"
        aria-label={`${label}, sayıyla`}
        value={editing ? draft : value}
        min={min}
        max={max}
        step={step}
        onFocus={() => {
          setDraft(String(value));
          setEditing(true);
        }}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
      />
    </div>
  );
}
function Prediction({
  id,
  signature,
  expected,
  options,
  explanation,
}: {
  id: string;
  signature: string;
  expected: string;
  options: readonly (readonly [string, string])[];
  explanation: string;
}) {
  const uid = useId();
  const [s, set] = useExploration(`forge016-geo-prediction-${id}`, {
    answer: "",
    reason: "",
    checkedFor: "",
  });
  const valid = options.some(([v]) => v === s.answer),
    checked =
      s.checkedFor === signature && valid && s.reason.trim().length >= 8;
  return (
    <div className="g016-prediction">
      <h4>Önce tahmin et</h4>
      <Choice
        label="Sonuç tahminin"
        value={valid ? s.answer : ""}
        options={[["", "Bir sonuç seç"], ...options]}
        onChange={(answer) => set({ answer, checkedFor: "" })}
      />
      <label htmlFor={uid}>Gerekçen</label>
      <textarea
        id={uid}
        value={s.reason.slice(0, 120)}
        maxLength={120}
        rows={3}
        onChange={(e) => set({ reason: e.target.value, checkedFor: "" })}
      />
      <p className="g016-help">
        En az 8 karakterle hangi veriyi kullandığını açıkla. Sonra tahminini
        kanıtla karşılaştır. Yazdığın gerekçe otomatik doğru sayılmaz.
      </p>
      <button
        type="button"
        className="button"
        disabled={!valid || s.reason.trim().length < 8}
        onClick={() => set({ checkedFor: signature })}
      >
        Tahmini dene
      </button>
      {checked && (
        <div className="g016-feedback" role="status" data-prediction-feedback>
          <strong>
            {s.answer === expected
              ? "Seçimin kanıtla uyumlu."
              : "Kanıtı yeniden izle."}
          </strong>
          <p>{prose(explanation)}</p>
        </div>
      )}
    </div>
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
    <section className="forge016-geography-lab" data-forge016={id}>
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="g016-help">
        Bu keşif ve tahminler ayrı kayıtlıdır; XP ve ustalık vermez, konuyu
        bitmiş saymaz. Kendi başına çözülen sorular Sorular bölümünde yer alır.
      </p>
    </section>
  );
}
// The stored model payload stays stable; these exact phrases keep the same
// meaning while fitting the large-text reading layout without splitting words.
const displayPhrases: readonly (readonly [string, string])[] = [
  [
    "kırıntılı malzemenin birikimine kadar",
    "kırıntılı tortunun birikimine dek",
  ],
  ["lav ve püskürme malzemeleri", "lav ve kül gibi ürünler"],
  ["aynı mendereste iki işlem", "bir kıvrımda iki işlem"],
  ["aşındırma ve koparmayla", "aşındırma ve koparma ile"],
  ["ada–kara", "ada ile kara"],
  ["malzemeyle", "malzeme ile"],
  ["bağlamıştır", "bağlar"],
];
function prose(value: string) {
  return displayPhrases.reduce(
    (text, [from, to]) => text.replaceAll(from, to),
    value,
  );
}
const optionsOf = (v: readonly { id: string; label: string }[]) =>
  v.map((x) => [x.id, x.label] as const);
const safe = (v: string, list: readonly { id: string }[], fallback: string) =>
  list.some((x) => x.id === v) ? v : fallback;
function Result({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="g016-result" data-model-result aria-live="polite">
      <strong>{title}</strong>
      {children}
    </div>
  );
}
const outcomeOptions = [
  ["erosion", "Aşındırma"],
  ["deposit", "Birikim"],
  ["mass", "Kütle hareketi"],
] as const;
function Flow({ d }: { d: string }) {
  return (
    <g aria-hidden="true">
      {(d.match(/M[^M]+/g) || []).map((part, i) => (
        <path key={i} className="g016-flow" d={part} />
      ))}
    </g>
  );
}
function Rock() {
  const id = "cografya-kayaclar",
    [v, set] = useExploration(`forge016-geo-${id}`, { action: "cool-deep" }),
    action = safe(v.action, rocks016Actions, "cool-deep"),
    m = rock016State(action),
    nodes = [
      [action === "cool-fast" ? "Lav" : "Magma", 70, 38],
      ["Granit", 280, 38],
      ["Cam", 280, 110],
      ["Tortu", 70, 110],
      ["Kum taşı", 70, 190],
      ["Kalker", 280, 190],
      ["Mermer", 280, 270],
      ["Kuvarsit", 70, 270],
    ] as const;
  return (
    <Frame
      id={id}
      title="Bir oku seç, kayacın yolunu izle"
      intro="Her ok gerçek bir süreç türünü adlandırır. Seçili yol yalnız bir öğretim örneği; bütün kayaçlar aynı sırayla bütün kutuları gezmez."
    >
      <Choice
        label="Kayaç yolu"
        value={action}
        options={optionsOf(rocks016Actions)}
        onChange={(action) => set({ action })}
      />
      <figure>
        <Diagram
          title="Seçili kayaç dönüşümü"
          description={`${m.from} → ${m.process} → ${m.to}. ${m.proof} ${m.limit}`}
          height={315}
          width={360}
        >
          {nodes.map(([label, x, y], i) => (
            <g key={label}>
              <rect
                x={x - 57}
                y={y - 22}
                width={114}
                height={44}
                rx={8}
                className={
                  m.path.includes(i as never)
                    ? "g016-node-selected"
                    : "g016-node"
                }
              />
              <text
                className={
                  m.path.includes(i as never)
                    ? "g016-tick g016-on-accent"
                    : "g016-tick"
                }
                x={x}
                y={y + 6}
                textAnchor="middle"
              >
                {label}
              </text>
            </g>
          ))}
          <Flow
            d={(() => {
              const a = nodes[m.path[0]],
                b = nodes[m.path[1]];
              if (a[1] === b[1]) {
                const direction = a[2] < b[2] ? 1 : -1;
                return `M${a[1]} ${a[2] + 24 * direction}V${b[2] - 24 * direction}`;
              }
              const direction = a[1] < b[1] ? 1 : -1;
              return `M${a[1] + 59 * direction} ${a[2]}C180 ${a[2]} 180 ${b[2]} ${b[1] - 59 * direction} ${b[2]}`;
            })()}
          />
        </Diagram>
        <figcaption>
          Vurgulanan iki kutu başlangıç ve üründür. Okun tam açıklaması aşağıda;
          kalınlık ve süre ölçeği yok.
        </figcaption>
      </figure>
      <Result title={`${m.from} → ${m.to}`}>
        <p>
          <b>{m.process}</b> · <span>{m.family}</span>
        </p>
        <p>{prose(m.proof)}</p>
        <p>{prose(m.limit)}</p>
      </Result>
      <Prediction
        id={id}
        signature={action}
        expected={m.family}
        options={[
          ["Magmatik", "Magmatik"],
          ["Kırıntılı tortul", "Tortul"],
          ["Başkalaşım", "Başkalaşım"],
          ["Erimiş malzeme", "Erimiş malzeme"],
          ["Gevşek malzeme", "Gevşek malzeme"],
        ]}
        explanation={`Son durum: ${m.family} · ${m.proof}`}
      />
    </Frame>
  );
}
function InnerDiagram({
  kind,
  reverse = false,
}: {
  kind: string;
  reverse?: boolean;
}) {
  return (
    <Diagram
      title="Verilen tektonik hareketin şeması"
      description="Bloklar ve oklar yalnız seçilen hareket bileşenini gösterir. Şema ölçülü fay haritası veya deprem zaman kestirimi değildir."
      height={270}
      width={400}
    >
      {kind === "normal" ? (
        <>
          <path
            className="g016-land"
            d="M20 90H125L150 145H250L275 90H380V240H20Z"
          />
          <path className="g016-line" d="M125 90L165 240M275 90L235 240" />
          <Flow d="M95 48H25M305 48H375M200 85V125" />
          <text className="g016-tick" x={200} y={180} textAnchor="middle">
            Graben
          </text>
          <text className="g016-tick" x={70} y={122} textAnchor="middle">
            Horst
          </text>
        </>
      ) : kind === "strike" ? (
        <>
          <path className="g016-land" d="M20 40H380V230H20Z" />
          <path className="g016-dashed" d="M200 40V230" />
          <Flow
            d={reverse ? "M150 70V200M250 200V70" : "M150 200V70M250 70V200"}
          />
          <path
            className="g016-water"
            d={reverse ? "M30 150H200M200 110H370" : "M30 110H200M200 150H370"}
          />
          <text className="g016-tick" x={200} y={260} textAnchor="middle">
            Üstten · {reverse ? "sol" : "sağ"} yanal
          </text>
        </>
      ) : kind === "fold" ? (
        <>
          {[0, 25, 50].map((n) => (
            <path
              key={n}
              className="g016-line"
              d={`M30 ${150 + n}Q75 ${30 + n} 125 ${150 + n}T220 ${150 + n}T315 ${150 + n}T380 ${150 + n}`}
            />
          ))}
          <Flow d="M20 50H75M380 50H325" />
          <text className="g016-tick" x={200} y={252} textAnchor="middle">
            Kesit · tabakalar bükülür
          </text>
        </>
      ) : (
        <>
          <path
            className="g016-land"
            d="M20 230L120 180L180 65H220L280 180L380 230Z"
          />
          <path className="g016-magma" d="M190 235V85H210V235Z" />
          <Flow d="M200 150V45M180 55L140 30M220 55L260 30" />
          <text className="g016-tick" x={200} y={260} textAnchor="middle">
            Kesit · lav ve kül
          </text>
        </>
      )}
    </Diagram>
  );
}
function TurkeyInner() {
  const id = "turkiye-ic-kuvvetler",
    [v, set] = useExploration(`forge016-geo-${id}`, { place: "west" }),
    place = safe(v.place, turkeyInner016Cases, "west"),
    m = turkeyInner016State(place);
  return (
    <Frame
      id={id}
      title="Bölgeyi seç, hareket kanıtını kıyasla"
      intro="Batı’daki düşey fay bloklarını kuzey ve doğudaki yanal hareketle karıştırma. Bunlar yer seçimi içindir; gerçek fay koordinatı veya risk haritası değildir."
    >
      <Choice
        label="Bölgesel kanıt"
        value={place}
        options={optionsOf(turkeyInner016Cases)}
        onChange={(place) => set({ place })}
      />
      <figure>
        <InnerDiagram kind={m.kind} reverse={place === "east"} />
        <figcaption>
          {m.kind === "strike"
            ? place === "east"
              ? "Üstten / sol yanal örnek: oklar fay boyunca."
              : "Üstten / sağ yanal örnek: oklar fay boyunca."
            : "Kesit görünüş; blok ve tabaka geometrisi büyük çizildi."}{" "}
          Ölçülü yükselti ve zaman ekseni yok.
        </figcaption>
      </figure>
      <Result title={`${m.region} · ${m.title}`}>
        <p>{prose(m.proof)}</p>
        <p>{prose(m.limit)}</p>
      </Result>
      <Prediction
        id={id}
        signature={place}
        expected={m.kind}
        options={[
          ["normal", "Fay blokları"],
          ["strike", "Yanal kayma"],
          ["fold", "Kıvrım"],
          ["volcano", "Volkanik yapı"],
        ]}
        explanation={m.proof}
      />
    </Frame>
  );
}
function River() {
  const id = "dis-kuvvetler-akarsular",
    [v, set] = useExploration(`forge016-geo-${id}`, {
      mode: "cross",
      width: 8,
      depth: 2,
      speed: 1.5,
      drop: 120,
      distance: 6,
      input: 120,
      removed: 90,
    }),
    mode = safe(v.mode, river016Modes, "cross"),
    m = river016State(
      mode,
      clamp(v.width, 2, 20),
      clamp(v.depth, 1, 5),
      clamp(v.speed, 0.5, 3),
      clamp(v.drop, 0, 300),
      clamp(v.distance, 1, 20),
      clamp(v.input, 0, 200),
      clamp(v.removed, 0, 200),
    );
  return (
    <Frame
      id={id}
      title="Bir akarsuda üç farklı kanıtı incele"
      intro="Kesit ortalama hızı verilidir; eğimden hız türetilmez. Bütün sayılar özgün ideal öğretim örneğidir."
    >
      <Choice
        label="Akarsu görünümü"
        value={mode}
        options={optionsOf(river016Modes)}
        onChange={(mode) => set({ mode })}
      />
      {mode === "cross" ? (
        <>
          <div className="g016-grid">
            <Range
              label="Kesit genişliği (m)"
              min={2}
              max={20}
              value={m.width}
              onChange={(width) => set({ width })}
            />
            <Range
              label="Ortalama derinlik (m)"
              min={1}
              max={5}
              value={m.depth}
              onChange={(depth) => set({ depth })}
            />
            <Range
              label="Ortalama hız (m/s)"
              min={0.5}
              max={3}
              step={0.5}
              value={m.speed}
              onChange={(speed) => set({ speed })}
            />
            <Range
              label="Düşey fark (m)"
              min={0}
              max={300}
              step={10}
              value={m.drop}
              onChange={(drop) => set({ drop })}
            />
            <Range
              label="Yatay uzaklık (km)"
              min={1}
              max={20}
              value={m.distance}
              onChange={(distance) => set({ distance })}
            />
          </div>
          <figure>
            <Diagram
              title="İdeal dikdörtgen akarsu kesiti"
              description={`Genişlik ${m.width} m, ortalama derinlik ${m.depth} m, kesit alanı ${m.area} m²; verilen hız ${m.speed} m/s.`}
              height={285}
            >
              <path
                className="g016-line"
                d={`M30 50H${70 + m.width * 12}V${80 + m.depth * 25}H70V50`}
              />
              <rect
                className="g016-water-fill"
                x={70}
                y={80}
                width={m.width * 12}
                height={m.depth * 25}
              />
              <text className="g016-tick" x={200} y={30} textAnchor="middle">
                Genişlik: {fmt(m.width)} m
              </text>
              <text className="g016-tick" x={200} y={232} textAnchor="middle">
                Derinlik: {fmt(m.depth)} m
              </text>
              <text className="g016-tick" x={200} y={258} textAnchor="middle">
                Alan: {fmt(m.area)} m²
              </text>
            </Diagram>
            <figcaption>
              Boyutlar verilen değerlerle değişir; hız kesit düzlemine diktir ve
              şeklin üzerinde gerçek bir yörünge olarak çizilmez.
            </figcaption>
          </figure>
        </>
      ) : mode === "meander" ? (
        <figure>
          <Diagram
            title="Mendereste iç ve dış kıyı"
            description="Akış kıvrılırken dış bankta aşınma, iç bankta birikim alanları gösteriliyor. Akış yönü yukarıdan aşağıdır."
            height={300}
          >
            <path
              className="g016-river"
              d="M220 20C70 30 90 100 220 100S350 175 210 175S65 240 220 280"
            />
            <circle className="g016-dot" cx={103} cy={65} r={10} />
            <circle className="g016-dot" cx={130} cy={68} r={10} />
            <path className="g016-line" d="M103 65L40 100M130 68L320 45" />
            <text className="g016-tick" x={25} y={125}>
              Dış: oyulma
            </text>
            <text className="g016-tick" x={280} y={25}>
              İç: kum
            </text>
            <Flow d="M220 255V290" />
          </Diagram>
          <figcaption>
            Üstten, ölçeksiz şema. Aynı sistemde dış kıyı aşınması ve iç kıyı
            birikimi birlikte bulunabilir.
          </figcaption>
        </figure>
      ) : (
        <>
          <div className="g016-grid">
            <Range
              label="Gelen tortu (birim)"
              min={0}
              max={200}
              step={10}
              value={m.input}
              onChange={(input) => set({ input })}
            />
            <Range
              label="Ayrılan tortu (birim)"
              min={0}
              max={200}
              step={10}
              value={m.removed}
              onChange={(removed) => set({ removed })}
            />
          </div>
          <figure>
            <Diagram
              title="İdeal ağız tortu bütçesi"
              description={`Giriş ${m.input}, çıkış ${m.removed}, net ${m.retained} birim. Pozitif sonuç tutulma, negatif sonuç net kayıp demektir.`}
              height={260}
            >
              {[m.input, m.removed, Math.abs(m.retained)].map((n, i) => (
                <g key={i}>
                  <rect
                    className={i === 2 ? "g016-node-selected" : "g016-bar"}
                    x={45 + i * 120}
                    y={210 - n * 0.7}
                    width={65}
                    height={n * 0.7}
                  />
                  <text
                    className="g016-tick"
                    x={77 + i * 120}
                    y={238}
                    textAnchor="middle"
                  >
                    {["Giriş", "Çıkış", "Net | |"][i]}
                  </text>
                  <text
                    className="g016-tick"
                    x={77 + i * 120}
                    y={195 - n * 0.7}
                    textAnchor="middle"
                  >
                    {fmt(i === 2 ? m.retained : n)}
                  </text>
                </g>
              ))}
            </Diagram>
            <figcaption>
              Sütun yüksekliği mutlak miktarı gösterir; netin işareti yazılıdır.
              Birim genel tortu birimidir; ton / yıl gibi birim yok.
            </figcaption>
          </figure>
        </>
      )}
      <Result
        title={
          mode === "cross"
            ? `Q = ${fmt(m.area)} × ${fmt(m.speed)} = ${fmt(m.discharge)} m³/s`
            : mode === "delta"
              ? `Net tortu: ${fmt(m.retained)} birim`
              : "Dışta aşınım · içte birikim"
        }
      >
        <p>{prose(m.proof)}</p>
        {mode === "cross" && (
          <p>
            Eğim: {fmt(m.drop)} / {fmt(m.distance * 1000)} × 100 = %
            {fmt(m.slope)}. Bu yüzde, derece veya gerçek hız değildir.
          </p>
        )}
        {mode === "delta" && (
          <p>
            {m.retained > 0
              ? "Pozitif net: tortu tutuluyor."
              : m.retained < 0
                ? "Negatif net: bu ideal dönemde depodan net kayıp var."
                : "Giriş ve çıkış eşit; net değişim yok."}
          </p>
        )}
      </Result>
      <Prediction
        id={id}
        signature={[
          mode,
          m.width,
          m.depth,
          m.speed,
          m.drop,
          m.distance,
          m.input,
          m.removed,
        ].join("|")}
        expected={
          mode === "cross"
            ? "volume"
            : mode === "meander"
              ? "both"
              : m.retained > 0
                ? "gain"
                : m.retained < 0
                  ? "loss"
                  : "same"
        }
        options={
          mode === "cross"
            ? [
                ["volume", "Hacim / zaman"],
                ["speed", "Yalnız hız"],
                ["degree", "Eğim derecesi"],
              ]
            : mode === "meander"
              ? [
                  ["both", "İki süreç bir arada"],
                  ["only", "Yalnız biriktirme"],
                  ["none", "Hiç taşıma yok"],
                ]
              : [
                  ["gain", "Net birikim"],
                  ["loss", "Net kayıp"],
                  ["same", "Net değişim yok"],
                ]
        }
        explanation={
          mode === "cross"
            ? `Hesaplanan ${fmt(m.discharge)} m³/s debidir. ${m.proof}`
            : m.proof
        }
      />
    </Frame>
  );
}
function KarstDrawing({
  form,
  compatible,
}: {
  form: string;
  compatible: boolean;
}) {
  const deposit = ["stalactite", "stalagmite", "column"].includes(form);
  if (form === "travertine")
    return (
      <Diagram
        title="Kaynak yamacında traverten"
        description="Karbonatlı su açık yamaç yüzeyinden akar; yeni mineral basamak yüzeyine eklenir. Bu çizim mağaranın içini değil, dış yamaç kesitini gösterir; gerçek metre ve süre ölçeği yoktur."
        height={280}
      >
        <path
          className="g016-land"
          d="M25 80H95V115H165V150H235V185H310V245H25Z"
        />
        <path
          className={compatible ? "g016-highlight" : "g016-line"}
          d="M25 80H95V115H165V150H235V185H310"
        />
        <Flow d="M30 66H107V102H177V137H247V172H325" />
        <text className="g016-tick" x={200} y={30} textAnchor="middle">
          Yüzeye mineral eklenir
        </text>
        <text className="g016-tick" x={200} y={272} textAnchor="middle">
          Dış yamaç · su yolu büyük çizildi
        </text>
      </Diagram>
    );

  return (
    <Diagram
      title="Karstik yer şeklinin kesiti"
      description="Kaya üst yüzeyi, yer altı boşluğu ve seçilen şeklin yeri gösteriliyor. Şekillerin boyları gerçek ölçek değildir; karbonat birikimi ile çözünme farklıdır."
      height={280}
    >
      <path
        className="g016-land"
        d={
          form === "dolin"
            ? "M20 80H30Q70 150 110 85Q165 165 220 85Q280 145 370 85H380V255H20Z"
            : "M20 90Q80 70 140 90T260 90T380 90V255H20Z"
        }
      />
      {["duden", "cave", "stalactite", "stalagmite", "column"].includes(
        form,
      ) && (
        <path
          className="g016-cave"
          d="M95 210Q100 128 150 128H250Q305 128 310 210Z"
        />
      )}
      <path className="g016-dashed" d="M25 105H375" />
      {form === "lapya" ? (
        <>
          {[45, 80, 115, 150].map((x, i) => (
            <path
              key={x}
              className="g016-flow"
              d={`M${x} 35V${95 + (i % 2) * 5}l8 15`}
            />
          ))}
          <text className="g016-tick" x={200} y={30} textAnchor="middle">
            Oluklar yüzeyde
          </text>
        </>
      ) : form === "dolin" ? (
        <>
          <path
            className="g016-highlight"
            d="M30 80Q70 150 110 85Q165 165 220 85Q280 145 370 85"
          />
          <text className="g016-tick" x={200} y={35} textAnchor="middle">
            Çözünme çanakları
          </text>
        </>
      ) : form === "duden" ? (
        <>
          <path className="g016-water" d="M20 65H145V150H270" />
          <Flow d="M145 68V145H260" />
          <text className="g016-tick" x={200} y={30} textAnchor="middle">
            Su yer altına girer
          </text>
        </>
      ) : form === "cave" ? (
        <>
          <path className="g016-highlight" d="M165 90L145 155H235L215 90" />
          <Flow d="M190 35V140" />
          <text className="g016-tick" x={285} y={150} textAnchor="middle">
            Çökme
          </text>
        </>
      ) : (
        <>
          {["stalactite", "column"].includes(form) && (
            <path
              className={compatible ? "g016-magma" : "g016-node"}
              d="M165 128H205L185 190Z"
            />
          )}
          {["stalagmite", "column"].includes(form) && (
            <path
              className={compatible ? "g016-magma" : "g016-node"}
              d={`M163 210Q172 ${form === "column" ? 145 : 175} 185 ${form === "column" ? 170 : 178}Q200 178 207 210Z`}
            />
          )}
          <Flow d="M245 150V200" />
          <text className="g016-tick" x={200} y={30} textAnchor="middle">
            {deposit ? "Mağara içi birikim" : "Yer altı"}
          </text>
        </>
      )}
    </Diagram>
  );
}
function Karst() {
  const id = "karstik-sekiller",
    [v, set] = useExploration(`forge016-geo-${id}`, {
      form: "lapya",
      rock: "limestone",
    }),
    form = safe(v.form, karst016Forms, "lapya"),
    rock = ["limestone", "gypsum", "granite"].includes(v.rock)
      ? v.rock
      : "limestone",
    m = karst016State(form, rock);
  return (
    <Frame
      id={id}
      title="Şeklin yerini ve malzeme koşulunu sınayarak seç"
      intro="Aynı sistemde çözünme boşluk açabilir, başka yerde karbonat çökelip yüzeye eklenebilir. Bu kesit bir şemadır; büyüme hızı veya risk tahmini değildir."
    >
      <div className="g016-grid">
        <Choice
          label="Karstik şekil"
          value={form}
          options={optionsOf(karst016Forms)}
          onChange={(form) => set({ form })}
        />
        <Choice
          label="Kayaç koşulu"
          value={rock}
          options={[
            ["limestone", "Kalker + karbonatlı su"],
            ["gypsum", "Jips örneği"],
            ["granite", "Granit örneği"],
          ]}
          onChange={(rock) => set({ rock })}
        />
      </div>
      <figure>
        <KarstDrawing form={form} compatible={m.compatible} />
        <figcaption>
          Şekil yeri seçili örneği anlatır. Malzeme koşulu uygun değilse, çizim
          bu şeklin o kayaçta zorunlu oluştuğu iddiası taşımaz; sonuçtaki koşul
          uyarısını oku.
        </figcaption>
      </figure>
      <Result title={m.form.title}>
        <p>
          <b>
            {m.form.kind === "dissolve"
              ? "Çözünme / aşınım bağlamı"
              : "Mineral birikimi"}
          </b>
        </p>
        <p>{prose(m.form.proof)}</p>
        <p>{prose(m.proof)}</p>
      </Result>
      <Prediction
        id={id}
        signature={`${form}|${rock}`}
        expected={m.compatible ? "yes" : "no"}
        options={[
          ["yes", "Bu malzeme uygun"],
          ["no", "Bu kanıt yeterli değil"],
        ]}
        explanation={m.proof}
      />
    </Frame>
  );
}
function WindIceDrawing({ kind }: { kind: string }) {
  return (
    <Diagram
      title="Seçili taşıyıcının biçim ve tane kanıtı"
      description="Rüzgâr, buzul veya erime suyu seçimine göre farklı şekil gösterilir. Taneler gerçek çapta, vadi gerçek metre ölçeğinde değildir."
      height={300}
    >
      {kind === "wind" ? (
        <>
          <path
            className="g016-land"
            d="M20 240Q90 205 130 95L195 240Q260 195 300 130L360 240Z"
          />
          <Flow d="M30 45H300" />
          <text className="g016-tick" x={200} y={275} textAnchor="middle">
            Kum birikimi · yandan şema
          </text>
        </>
      ) : kind === "loess" ? (
        <>
          <path className="g016-land" d="M20 195H380V245H20Z" />
          {Array.from({ length: 35 }, (_, i) => (
            <circle
              key={i}
              cx={35 + (i % 12) * 29}
              cy={205 + Math.floor(i / 12) * 13}
              r={2}
              className="g016-grain"
            />
          ))}
          <Flow d="M30 85H330" />
          <text className="g016-tick" x={200} y={270} textAnchor="middle">
            Silt ağırlıklı örtü
          </text>
        </>
      ) : kind === "abrasion" ? (
        <>
          <path
            className="g016-land"
            d="M100 70Q200 10 300 70L265 115H230V210H170V115H135Z"
          />
          <Flow d="M20 160H150M20 195H150" />
          <text className="g016-tick" x={200} y={260} textAnchor="middle">
            Alt bölümün aşınması
          </text>
        </>
      ) : kind === "ice" ? (
        <>
          <path className="g016-dashed" d="M30 50L200 240L370 50" />
          <path className="g016-water-fill" d="M30 50Q70 250 200 250T370 50Z" />
          <path className="g016-line" d="M30 50Q70 250 200 250T370 50" />
          <text className="g016-tick" x={200} y={30} textAnchor="middle">
            Kesikli V · dolu U
          </text>
        </>
      ) : kind === "till" ? (
        <>
          <path className="g016-land" d="M20 240Q140 85 250 160L380 240Z" />
          {Array.from({ length: 26 }, (_, i) => (
            <circle
              key={i}
              cx={75 + (i % 7) * 38}
              cy={190 + Math.floor(i / 7) * 12}
              r={[2, 8, 4, 11][i % 4]}
              className="g016-grain"
            />
          ))}
          <text className="g016-tick" x={200} y={35} textAnchor="middle">
            Karışık boylar · moren
          </text>
        </>
      ) : (
        <>
          <path className="g016-water" d="M25 50Q70 125 120 50T220 50T330 50" />
          {[0, 1, 2].map((row) => (
            <g key={row}>
              <path className="g016-line" d={`M20 ${135 + row * 42}H380`} />
              {Array.from({ length: 12 }, (_, i) => (
                <circle
                  key={i}
                  cx={36 + i * 29}
                  cy={150 + row * 42}
                  r={8 - row * 3}
                  className="g016-grain"
                />
              ))}
            </g>
          ))}
          <text className="g016-tick" x={200} y={100} textAnchor="middle">
            Akarsu ile boylanma
          </text>
        </>
      )}
    </Diagram>
  );
}
function WindIce() {
  const id = "ruzgar-ve-buzul",
    [v, set] = useExploration(`forge016-geo-${id}`, { case: "wind-dune" }),
    choice = safe(v.case, windIce016Cases, "wind-dune"),
    m = windIce016State(choice);
  return (
    <Frame
      id={id}
      title="Taşıyıcıyı değiştir, izleri kıyasla"
      intro="Sıcak veya soğuk demeden önce taşıyıcı ve tane düzenine bak. Şekiller ve taneler özgün, büyütülmüş öğretim çizimleridir."
    >
      <Choice
        label="Taşıyıcı ve örnek"
        value={choice}
        options={optionsOf(windIce016Cases)}
        onChange={(choice) => set({ case: choice })}
      />
      <figure>
        <WindIceDrawing kind={m.kind} />
        <figcaption>{m.sort}</figcaption>
      </figure>
      <Result title={`${m.title} · ${m.process}`}>
        <p>{prose(m.proof)}</p>
        <p>{m.sort}</p>
        <p>
          Karşılaştır: doğrudan buzul karışık malzeme bırakabilir; erime suyu
          boylanmış tabakalar yapabilir. Eski şekil güncel buzul varlığı veya
          kesin yaş vermez.
        </p>
      </Result>
      <Prediction
        id={id}
        signature={choice}
        expected={m.process === "Aşındırma" ? "erosion" : "deposit"}
        options={outcomeOptions}
        explanation={`${m.process}: ${m.proof}`}
      />
    </Frame>
  );
}
function CoastDrawing({ form, after }: { form: string; after: boolean }) {
  const sea = 120;
  return (
    <Diagram
      title="Kıyının önce ve sonra durumu"
      description="Seçilen kıyı için kavramsal önce / sonra gösterilir. Üstten veya kesit bilgisi HTML açıklamada vardır. Düzey çizgileri gerçek metre veya geçen yıl değildir."
      height={305}
    >
      {form === "cliff" ? (
        <>
          <path
            className="g016-land"
            d={
              after
                ? "M20 55H205V180H375V250H20Z"
                : "M20 55H285V180H375V250H20Z"
            }
          />
          <path
            className="g016-water"
            d={after ? "M215 180H380" : "M290 180H380"}
          />
          {after && <path className="g016-dashed" d="M285 55V180" />}
          <text className="g016-tick" x={200} y={275} textAnchor="middle">
            {after ? "Duvar geriler · platform açılır" : "İlk dik kıyı"}
          </text>
        </>
      ) : form === "fjord" ? (
        <>
          <path
            className="g016-land"
            d="M20 35Q85 245 200 245T380 35V260H20Z"
          />
          <path
            className={after ? "g016-water" : "g016-dashed"}
            d={after ? `M52 ${sea}H348` : "M20 35Q85 245 200 245T380 35"}
          />
          <text className="g016-tick" x={200} y={35} textAnchor="middle">
            {after ? "Deniz U vadiye dolar" : "Önce buzul vadisi"}
          </text>
        </>
      ) : form === "ria" ? (
        <>
          <path className="g016-land" d="M20 20H380V260H20Z" />
          <path
            className={after ? "g016-river" : "g016-water"}
            d="M200 260V130L100 60M200 160L300 90M200 130L240 30"
          />
          {after && (
            <path className="g016-water-fill" d="M20 230H380V260H20Z" />
          )}
          <text className="g016-tick" x={200} y={280} textAnchor="middle">
            {after ? "Deniz dallı vadiyi örter" : "Önce akarsu ağı"}
          </text>
        </>
      ) : form === "dalmatian" ? (
        <>
          <path className="g016-water-fill" d="M20 20H380V250H20Z" />
          {[60, 150, 240].map((x, i) => (
            <rect
              key={x}
              className="g016-land"
              x={x}
              y={after ? 40 + i * 15 : 20}
              width={after ? 35 : 80}
              height={after ? 140 : 230}
              rx={after ? 18 : 0}
            />
          ))}
          <text className="g016-tick" x={200} y={280} textAnchor="middle">
            {after ? "Paralel sırtlar ada kalır" : "Paralel sırt–vadi düzeni"}
          </text>
        </>
      ) : form === "skerry" ? (
        <>
          <rect
            className="g016-water-fill"
            x={20}
            y={20}
            width={360}
            height={230}
          />
          {Array.from({ length: 12 }, (_, i) => (
            <ellipse
              key={i}
              className="g016-land"
              cx={55 + (i % 4) * 95}
              cy={55 + Math.floor(i / 4) * 75}
              rx={after ? 12 + (i % 3) * 4 : 35}
              ry={after ? 8 : 27}
            />
          ))}
          <text className="g016-tick" x={200} y={280} textAnchor="middle">
            {after ? "Küçük kayalık adalar" : "Alçak buzul yüzeyi"}
          </text>
        </>
      ) : (
        <>
          <rect
            className="g016-water-fill"
            x={20}
            y={20}
            width={360}
            height={230}
          />
          <path className="g016-land" d="M20 20H110V250H20Z" />
          {form === "lagoon" ? (
            <>
              <path
                className="g016-land"
                d="M105 40Q320 30 325 135T105 235L110 215Q280 215 280 135T110 60Z"
              />
              {after && <path className="g016-deposit" d="M110 60V215" />}
              <text className="g016-tick" x={200} y={145} textAnchor="middle">
                {after ? "Lagün" : "Açık koy"}
              </text>
            </>
          ) : (
            <>
              <ellipse
                className="g016-land"
                cx={300}
                cy={130}
                rx={45}
                ry={55}
              />
              {after && <path className="g016-deposit" d="M110 130H255" />}
              <text className="g016-tick" x={200} y={240} textAnchor="middle">
                {after ? "Ada–kara kum boynu" : "Henüz ayrı ada"}
              </text>
            </>
          )}
        </>
      )}
    </Diagram>
  );
}
function Coast() {
  const id = "dalga-akinti-kiyi-tipleri",
    [v, set] = useExploration(`forge016-geo-${id}`, {
      form: "cliff",
      phase: "before",
    }),
    form = safe(v.form, coast016Forms, "cliff"),
    phase = v.phase === "after" ? "after" : "before",
    m = coast016State(form, phase);
  return (
    <Frame
      id={id}
      title="Önceki yüzeyi seç, kıyının nasıl değiştiğini gör"
      intro="Benzer kıyı girintileri farklı geçmişten gelebilir. Önce / sonra bir süre sayacı veya deniz yükselmesi hesabı değildir."
    >
      <div className="g016-grid">
        <Choice
          label="Kıyı örneği"
          value={form}
          options={optionsOf(coast016Forms)}
          onChange={(form) => set({ form })}
        />
        <Choice
          label="Süreç aşaması"
          value={phase}
          options={[
            ["before", "Önce"],
            ["after", "Sonra"],
          ]}
          onChange={(phase) => set({ phase })}
        />
      </div>
      <figure>
        <CoastDrawing form={form} after={m.water} />
        <figcaption>
          {m.form.view} görünüş. {m.limit}
        </figcaption>
      </figure>
      <Result
        title={`${m.form.label} · ${phase === "before" ? "Önce" : "Sonra"}`}
      >
        <p>
          <b>{m.form.type}</b>
        </p>
        <p>{prose(m.form.proof)}</p>
        <p>{prose(m.limit)}</p>
      </Result>
      <Prediction
        id={id}
        signature={`${form}|${phase}`}
        expected={
          ["cliff"].includes(form)
            ? "erosion"
            : ["lagoon", "tombolo"].includes(form)
              ? "deposit"
              : "flood"
        }
        options={[
          ["erosion", "Kıyı aşınması"],
          ["deposit", "Tortu birikimi"],
          ["flood", "Eski yüzey suyla örtülür"],
        ]}
        explanation={`${m.form.type}. ${m.form.proof}`}
      />
    </Frame>
  );
}
function SiteDrawing({ kind }: { kind: string }) {
  return (
    <Diagram
      title="Yer kartındaki sürecin kesiti"
      description="Yer adı gerçek örnektir; çizim arazi ölçüsü değil, verilen işlem ve malzemenin özgün öğretim şemasıdır."
      height={305}
    >
      {kind === "pillar" ? (
        <>
          <path className="g016-land" d="M20 250H380V270H20Z" />
          <path className="g016-land" d="M135 250L170 90H220L255 250Z" />
          <path className="g016-node-selected" d="M155 70H240L230 105H165Z" />
          <Flow d="M85 60L55 225M310 60L340 225" />
          <text className="g016-tick" x={200} y={35} textAnchor="middle">
            Dirençli başlık · tüf
          </text>
        </>
      ) : kind === "delta" ? (
        <>
          <rect
            className="g016-water-fill"
            x={20}
            y={180}
            width={360}
            height={75}
          />
          <path className="g016-land" d="M180 160L70 245H340L220 160Z" />
          <path
            className="g016-water"
            d="M200 20V160L155 230M200 160L250 230M200 160V235"
          />
          <text className="g016-tick" x={200} y={280} textAnchor="middle">
            Ağızda tortu tutulur
          </text>
        </>
      ) : kind === "travertine" ? (
        <>
          <path
            className="g016-land"
            d="M25 90H95V125H165V160H235V195H315V245H25Z"
          />
          <path className="g016-water" d="M25 75H105V110H175V145H245V180H330" />
          <text className="g016-tick" x={200} y={35} textAnchor="middle">
            Karbonat çökelir
          </text>
        </>
      ) : kind === "dune" ? (
        <>
          <path
            className="g016-land"
            d="M20 245Q120 210 175 100L225 245Q300 200 330 145L380 245Z"
          />
          <Flow d="M20 50H330" />
          <text className="g016-tick" x={200} y={280} textAnchor="middle">
            Kum taşınır ve birikir
          </text>
        </>
      ) : kind === "cirque" ? (
        <>
          <path
            className="g016-land"
            d="M20 245L110 40Q150 190 225 180L300 45L380 245Z"
          />
          <path className="g016-water" d="M125 125Q165 190 240 150" />
          <text className="g016-tick" x={200} y={280} textAnchor="middle">
            Dağ başında sirk çanağı
          </text>
        </>
      ) : kind === "tombolo" ? (
        <>
          <rect
            className="g016-water-fill"
            x={20}
            y={20}
            width={360}
            height={235}
          />
          <path className="g016-land" d="M20 20H100V255H20Z" />
          <ellipse className="g016-land" cx={305} cy={135} rx={50} ry={65} />
          <path className="g016-deposit" d="M100 135H255" />
          <text className="g016-tick" x={200} y={280} textAnchor="middle">
            Ada–kara bağlantısı
          </text>
        </>
      ) : kind === "slide" ? (
        <>
          <path className="g016-land" d="M20 50L360 245H20Z" />
          <path className="g016-magma" d="M95 70L160 95L260 210L200 190Z" />
          <Flow d="M180 60L300 175" />
          <path className="g016-water" d="M280 230H375" />
          <text className="g016-tick" x={200} y={280} textAnchor="middle">
            Kütle vadiyi setleyebilir
          </text>
        </>
      ) : kind === "karst" ? (
        <>
          <path className="g016-land" d="M20 60H380V250H20Z" />
          <path className="g016-cave" d="M95 210Q110 100 210 150T310 210Z" />
          <path className="g016-water" d="M30 40H110V160H235" />
          <text className="g016-tick" x={200} y={280} textAnchor="middle">
            Çözünme ve yer altı akışı
          </text>
        </>
      ) : (
        <>
          <path className="g016-land" d="M20 40H210V180H380V250H20Z" />
          <path className="g016-water" d="M215 180H380" />
          <Flow d="M300 100H225" />
          <text className="g016-tick" x={200} y={280} textAnchor="middle">
            Dik kıyı aşınır
          </text>
        </>
      )}
    </Diagram>
  );
}
function TurkeyExternal() {
  const id = "turkiye-dis-kuvvetler",
    [v, set] = useExploration(`forge016-geo-${id}`, { site: "bafra" }),
    site = safe(v.site, turkeyExternal016Sites, "bafra"),
    m = turkeyExternal016State(site);
  return (
    <Frame
      id={id}
      title="Yer kartını süreç kanıtıyla eşleştir"
      intro="Yer adları gerçek örneklerdir; şekiller ölçülü arazi değildir. Aynı yerin çevresinde başka süreçler de etkili olabilir."
    >
      <Choice
        label="Türkiye yer kartı"
        value={site}
        options={optionsOf(turkeyExternal016Sites)}
        onChange={(site) => set({ site })}
      />
      <figure>
        <SiteDrawing kind={m.kind} />
        <figcaption>
          Taşıyıcı / etken: {m.agent}. Seçilen işlem: {m.process}. Şema metre,
          hız veya oluşum tarihi vermez.
        </figcaption>
      </figure>
      <Result title={`${m.label} · ${m.process}`}>
        <p>{prose(m.proof)}</p>
        <p>
          <b>Kanıt zinciri:</b> {m.agent} → {m.process} → verilen yer şekli.
          Malzeme kökeni ile son biçimlenme aynı olmak zorunda değildir.
        </p>
      </Result>
      <Prediction
        id={id}
        signature={site}
        expected={
          m.process === "Birikim"
            ? "deposit"
            : m.process === "Kütle hareketi"
              ? "mass"
              : "erosion"
        }
        options={outcomeOptions}
        explanation={`${m.process}: ${m.proof}`}
      />
    </Frame>
  );
}
function Relief() {
  const id = "turkiye-yer-sekilleri",
    [v, set] = useExploration(`forge016-geo-${id}`, {
      profile: "plain",
      offset: 0,
      route: "A",
    }),
    profile = safe(v.profile, relief016Profiles, "plain"),
    route = ["A", "B", "C"].includes(v.route) ? v.route : "A",
    m = relief016State(profile, clamp(v.offset, 0, 1800), route),
    x = (i: number) => 85 + i * 45,
    y = (n: number) => 260 - n * 0.05;
  return (
    <Frame
      id={id}
      title="Yüzeyi yükselt, göreli biçimi kıyasla"
      intro="Düzlüğün denizden yüksekliği ile çevresine göre konumu farklıdır. Bu kesit ve üç rota, gerçek yol ölçümü olmayan özgün ideal verilerdir."
    >
      <div className="g016-grid">
        <Choice
          label="Arazi kesiti"
          value={profile}
          options={optionsOf(relief016Profiles)}
          onChange={(profile) => set({ profile })}
        />
        <Range
          label="Ek yükselti (m)"
          min={0}
          max={1800}
          step={100}
          value={m.offset}
          onChange={(offset) => set({ offset })}
        />
        <Choice
          label="Verilen rota"
          value={route}
          options={[
            ["A", "A eşiği"],
            ["B", "B eşiği"],
            ["C", "C eşiği"],
          ]}
          onChange={(route) => set({ route })}
        />
      </div>
      <figure>
        <Diagram
          title="İdeal arazi yükselti kesiti"
          description={`Yedi eş yatay aralıklı nokta; yükseltiler metre olarak ${m.points.join(", ")}. ${m.profile.proof}`}
          height={330}
          width={400}
        >
          <path className="g016-line" d="M75 45V260H380" />
          {[0, 1000, 2000, 3000, 4000].map((n) => (
            <g key={n}>
              <path className="g016-gridline" d={`M75 ${y(n)}H380`} />
              <text className="g016-tick" x={68} y={y(n) + 6} textAnchor="end">
                {fmt(n)}
              </text>
            </g>
          ))}
          <polyline
            className="g016-highlight"
            points={m.points.map((n, i) => `${x(i)},${y(n)}`).join(" ")}
          />
          {m.points.map((n, i) => (
            <g key={i}>
              <circle className="g016-dot" cx={x(i)} cy={y(n)} r={4} />
              <text className="g016-tick" x={x(i)} y={287} textAnchor="middle">
                {i + 1}
              </text>
            </g>
          ))}
          <text className="g016-tick" x={15} y={28}>
            m
          </text>
          <text className="g016-tick" x={200} y={320} textAnchor="middle">
            Nokta sırası · eş aralık
          </text>
        </Diagram>
        <figcaption>{m.limit}</figcaption>
      </figure>
      <details>
        <summary>Yedi noktanın verisi</summary>
        <dl className="g016-data">
          {m.points.map((n, i) => (
            <div key={i}>
              <dt>{i + 1}. nokta</dt>
              <dd>{fmt(n)} m</dd>
            </div>
          ))}
        </dl>
      </details>
      <Result title={m.profile.title}>
        <p>{prose(m.profile.proof)}</p>
        <p>
          Yüzeyin her noktasına {fmt(m.offset)} m eklendi. Noktalar arası
          yükselti farkı aynı kaldı; şekle sırf rakıma göre yeni ad verme.
        </p>
        <p>
          Bağımsız verilen rota eşikleri: A {fmt(m.passes.A)} m · B{" "}
          {fmt(m.passes.B)} m · C {fmt(m.passes.C)} m. Seçilen {m.route}:{" "}
          {fmt(m.selectedPass)} m.
        </p>
        <p>
          Bu üç seçenek içinde en düşük aşma yüksekliği B’dedir; en kısa veya en
          güvenli gerçek yol olduğu sonucu çıkmaz.
        </p>
      </Result>
      <Prediction
        id={id}
        signature={`${profile}|${m.offset}|${route}`}
        expected="same"
        options={[
          ["same", "Göreli farklar aynı"],
          ["more", "Bütün farklar artar"],
          ["flat", "Bütün vadiler dolar"],
        ]}
        explanation="Her noktaya aynı metre eklenince noktalar arası fark aynı kalır. Mutlak yükselti değişir; göreli kesit biçimi korunur."
      />
    </Frame>
  );
}
function SpringDiagram({ spring }: { spring: string }) {
  return (
    <Diagram
      title="Yer altı suyunun seçilen çıkış yolu"
      description="Geçirgen su taşıyan tabaka, az geçirgen sınırlar ve seçili akış yolu şematiktir. Gerçek sıcaklık, debi veya sağlık ölçümü değildir."
      height={270}
    >
      <path className="g016-land" d="M20 75L130 45L380 120V240H20Z" />
      <path
        className="g016-water-fill"
        d="M20 140Q160 230 380 145V175Q160 255 20 170Z"
      />
      <path
        className="g016-line"
        d="M20 140Q160 230 380 145M20 170Q160 255 380 175"
      />
      {spring === "artesian" ? (
        <>
          <path className="g016-line" d="M200 75V215" />
          <path className="g016-water" d="M200 210V100" />
          <path className="g016-dashed" d="M150 100H250" />
          <text className="g016-tick" x={200} y={30} textAnchor="middle">
            Basınç düzeyi yüzey altında
          </text>
        </>
      ) : spring === "fault" ? (
        <>
          <path className="g016-line" d="M230 235L300 95" />
          <Flow d="M238 222L295 105" />
          <text className="g016-tick" x={200} y={30} textAnchor="middle">
            Çatlak boyunca çıkış
          </text>
        </>
      ) : spring === "geyser" ? (
        <>
          <path className="g016-magma" d="M90 235Q200 190 310 235Z" />
          <path
            className="g016-water"
            d="M200 215V80Q155 15 125 70M200 80Q245 15 280 70"
          />
          <text className="g016-tick" x={200} y={262} textAnchor="middle">
            Isı + su + uygun kanal
          </text>
        </>
      ) : spring === "karst" ? (
        <>
          <path className="g016-cave" d="M80 170Q110 90 220 140T330 175Z" />
          <Flow d="M130 162H335" />
          <text className="g016-tick" x={200} y={30} textAnchor="middle">
            Boşluklardan gelen su
          </text>
        </>
      ) : (
        <>
          <Flow d="M120 180L330 125H375" />
          <text className="g016-tick" x={200} y={30} textAnchor="middle">
            Su taşıyan birim yüzeyi keser
          </text>
        </>
      )}
    </Diagram>
  );
}
function Water() {
  const id = "dunyada-sular",
    [v, set] = useExploration(`forge016-geo-${id}`, {
      initial: 100,
      rain: 10,
      inflow: 30,
      evaporation: 15,
      outflow: 20,
      spring: "slope",
    }),
    spring = safe(v.spring, water016Springs, "slope"),
    m = water016State(
      clamp(v.initial, 0, 200),
      clamp(v.rain, 0, 100),
      clamp(v.inflow, 0, 100),
      clamp(v.evaporation, 0, 200),
      clamp(v.outflow, 0, 200),
      spring,
    ),
    values = [m.initial, m.rain + m.inflow, m.demand, m.final, m.unmet];
  return (
    <Frame
      id={id}
      title="Önce bütçeyi kur, sonra kaynağın yolunu seç"
      intro="Hacimler tek ideal döneme aittir, hm³ ile verilir. Dışarıda bırakılan başka akış yok varsayılır; bu sayılar gerçek bir gölün ölçümleri değildir."
    >
      <div className="g016-grid">
        <Range
          label="Başlangıç suyu (hm³)"
          min={0}
          max={200}
          step={5}
          value={m.initial}
          onChange={(initial) => set({ initial })}
        />
        <Range
          label="Yağış girişi (hm³)"
          min={0}
          max={100}
          step={5}
          value={m.rain}
          onChange={(rain) => set({ rain })}
        />
        <Range
          label="Nehir girişi (hm³)"
          min={0}
          max={100}
          step={5}
          value={m.inflow}
          onChange={(inflow) => set({ inflow })}
        />
        <Range
          label="Buharlaşma talebi (hm³)"
          min={0}
          max={200}
          step={5}
          value={m.evaporation}
          onChange={(evaporation) => set({ evaporation })}
        />
        <Range
          label="Dış akış talebi (hm³)"
          min={0}
          max={200}
          step={5}
          value={m.outflow}
          onChange={(outflow) => set({ outflow })}
        />
      </div>
      <figure>
        <Diagram
          title="Tek dönemli ideal su bütçesi"
          description={`Başlangıç ${m.initial}, toplam giriş ${m.rain + m.inflow}, istenen çıkış ${m.demand}, son stok ${m.final}, eksik kalan çıkış ${m.unmet} hm³.`}
          height={315}
          width={440}
        >
          <path className="g016-line" d="M65 35V245H430" />
          {[0, 200, 400].map((n) => (
            <g key={n}>
              <path className="g016-gridline" d={`M65 ${245 - n * 0.5}H430`} />
              <text
                className="g016-tick"
                x={58}
                y={250 - n * 0.5}
                textAnchor="end"
              >
                {n}
              </text>
            </g>
          ))}
          {values.map((n, i) => (
            <g key={i}>
              <rect
                className={i > 2 ? "g016-node-selected" : "g016-bar"}
                x={80 + i * 70}
                y={245 - n * 0.5}
                width={45}
                height={n * 0.5}
              />
              <text
                className="g016-tick"
                x={102 + i * 70}
                y={271}
                textAnchor="middle"
              >
                {i + 1}
              </text>
            </g>
          ))}
          <text className="g016-tick" x={15} y={25}>
            hm³
          </text>
          <text className="g016-tick" x={250} y={307} textAnchor="middle">
            Kalem sırası: 1–5
          </text>
        </Diagram>
        <figcaption>
          1 başlangıç · 2 giriş · 3 talep · 4 son stok · 5 eksik kalan çıkış.
          Aynı değerler aşağıda tam yazılıdır; son stok negatif yapılmaz.
        </figcaption>
      </figure>
      <Choice
        label="Yer altı çıkış yolu"
        value={spring}
        options={optionsOf(water016Springs)}
        onChange={(spring) => set({ spring })}
      />
      <figure>
        <SpringDiagram spring={spring} />
        <figcaption>
          Kaynak kesiti, bütçeden ayrı bir kavramı anlatır. Bu seçim göle ek
          hacim katmaz.
        </figcaption>
      </figure>
      <Result title={`Son stok: ${fmt(m.final)} hm³`}>
        <p>
          {fmt(m.initial)} + {fmt(m.rain)} + {fmt(m.inflow)} −{" "}
          {fmt(m.evaporation)} − {fmt(m.outflow)} ={" "}
          {fmt(m.available - m.demand)} hm³ cebirsel sonuç.
        </p>
        <p>
          Mevcut: {fmt(m.available)} hm³ · talep: {fmt(m.demand)} hm³ · eksik
          kalan çıkış: {fmt(m.unmet)} hm³.
        </p>
        <p>{prose(m.proof)}</p>
        <p>
          <b>{m.source.label}:</b> {m.source.proof}
        </p>
      </Result>
      <Prediction
        id={id}
        signature={[
          m.initial,
          m.rain,
          m.inflow,
          m.evaporation,
          m.outflow,
          spring,
        ].join("|")}
        expected={
          m.unmet > 0
            ? "short"
            : m.change > 0
              ? "gain"
              : m.change < 0
                ? "loss"
                : "same"
        }
        options={[
          ["short", "Talebin bir kısmı açıkta"],
          ["gain", "Stok artar"],
          ["loss", "Stok azalır"],
          ["same", "Stok aynı kalır"],
        ]}
        explanation={
          m.unmet > 0
            ? `Mevcut ${fmt(m.available)} hm³; talep ${fmt(m.demand)} hm³, açık ${fmt(m.unmet)} hm³. Hangi çıkışa öncelik verileceği bu modelde yok.`
            : `Son stok ${fmt(m.final)} hm³; başlangıca göre değişim ${fmt(m.change)} hm³.`
        }
      />
    </Frame>
  );
}
export default function Forge016GeographyLab({
  lessonId,
}: {
  lessonId: string;
}) {
  switch (lessonId) {
    case "cografya-kayaclar":
      return <Rock />;
    case "turkiye-ic-kuvvetler":
      return <TurkeyInner />;
    case "dis-kuvvetler-akarsular":
      return <River />;
    case "karstik-sekiller":
      return <Karst />;
    case "ruzgar-ve-buzul":
      return <WindIce />;
    case "dalga-akinti-kiyi-tipleri":
      return <Coast />;
    case "turkiye-dis-kuvvetler":
      return <TurkeyExternal />;
    case "turkiye-yer-sekilleri":
      return <Relief />;
    case "dunyada-sular":
      return <Water />;
    default:
      return null;
  }
}
