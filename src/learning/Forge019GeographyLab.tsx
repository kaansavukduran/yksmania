import { useId, useState, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  region019,
  regionCriteria019,
  waterways019,
  transport019,
  environment019,
  disaster019,
  disasterActions019,
} from "./forge019Geography";
import "./forge019Geography.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number, d = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: d }).format(n);
const clamp = (n: number, a: number, b: number) =>
  Number.isFinite(n) ? Math.min(b, Math.max(a, n)) : a;
const readable = (s: string) => {
  const pairs: readonly (readonly [string, string])[] = [
    ["arama-kurtarma", "arama ve kurtarma"],
    ["bağlantısındadır", "bağında yer alır"],
    ["Yunanistan’daki", "Yunanistan içinde olan"],
    ["Karşılaştırmada", "Kıyas yaparken"],
    ["koridorundadır", "hattında yer alır"],
    ["taşımacılığında", "taşıma işinde"],
    ["değerlendirilir", "ele alınır"],
    ["kullanıldığında", "kullanılırsa"],
    ["Babülmendep", "Bab el Mendep"],
    ["hesaplanmaz", "hesabı yapılmaz"],
    [
      "fiziksel onarım tek başına bütün süreci tamamlamaz.",
      "fiziksel onarım bütün süreci tek başına bitirmez.",
    ],
    ["iyileştirmedir", "iyileştirme işidir"],
    ["müdahaledir", "müdahale işidir"],
    ["güzergâhının", "rotasının"],
    ["başlangıçtan", "ilk kaynaktan"],
    ["olanaklarının", "imkânının"],
    ["Marmara’ya", "Marmara yönüne"],
    ["kurulmasıyla", "kurulması ile"],
    ["varsayılmaz", "kabul edilmez"],
    ["değiştirmez", "aynı bırakır"],
    ["denetimiyle", "denetimi ile"],
    ["bağlantıdır;", "bir bağdır;"],
    ["aşamasıdır.", "evresidir."],
    ["tanımlanan", "tanımlı"],
    ["hazırlanmış", "özgün"],
    ["Kızıldeniz’in güney çıkışıdır.", "Bu denizin güney çıkışıdır."],
    [
      "İstanbul Boğazı Karadeniz’i Marmara yönüne, Çanakkale Boğazı Marmara’yı Ege’ye bağlar.",
      "İstanbul Boğazı, Karadeniz ile Marmara arasında bağ kurar. Çanakkale Boğazı, Marmara ile Ege arasında bağ kurar.",
    ],
    ["yalnız kuş uçuşu çizgi kullanılmaz.", "kuş uçuşu çizgi tek ölçü olamaz."],
  ];
  let out = s.replace(/(?<=\p{L})–(?=\p{L})/gu, " – ");
  for (const [from, to] of pairs) out = out.replaceAll(from, to);
  return out;
};
const safeKey = (m: object, k: string, fallback: string) =>
  Object.hasOwn(m, k) ? k : fallback;
const choices = (m: Record<string, { name: string }>) =>
  Object.entries(m).map(([k, v]) => [k, v.name] as const);
function Diagram({
  title,
  description,
  children,
  height = 300,
}: {
  title: string;
  description: string;
  children: ReactNode;
  height?: number;
}) {
  const id = useId();
  return (
    <svg
      className="g019-diagram"
      viewBox={`0 0 300 ${height}`}
      role="img"
      aria-labelledby={`${id}-t ${id}-d`}
    >
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{description}</desc>
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
    <div className="g019-control">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([k, t]) => (
          <option key={k} value={k}>
            {readable(t)}
          </option>
        ))}
      </ChoiceSelect>
      <output className="g019-selected" htmlFor={id}>
        Seçili: {readable(options.find(([k]) => k === value)?.[1] ?? "")}
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
  onChange: (v: number) => void;
}) {
  const id = useId(),
    [draft, setDraft] = useState(String(value)),
    [editing, setEditing] = useState(false);
  const commit = () => {
    setEditing(false);
    if (draft.trim() === "" || !Number.isFinite(Number(draft))) return;
    const n =
      min + Math.round((clamp(Number(draft), min, max) - min) / step) * step;
    onChange(clamp(n, min, max));
  };
  return (
    <div className="g019-control">
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
function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="g019-check">
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
  const uid = useId(),
    [s, set] = useExploration(`forge019-geo-predict-${id}`, {
      answer: "",
      reason: "",
      checkedFor: "",
    });
  const valid = options.some(([v]) => v === s.answer),
    checked =
      s.checkedFor === signature && valid && s.reason.trim().length >= 8;
  return (
    <div className="g019-prediction">
      <h4>Önce tahmin et</h4>
      <Choice
        label="Sonuç tahminin"
        value={s.answer}
        options={[["", "Bir sonuç seç"], ...options]}
        onChange={(answer) => set({ answer, checkedFor: "" })}
      />
      <label htmlFor={`${uid}-reason`}>Gerekçen</label>
      <textarea
        id={`${uid}-reason`}
        value={s.reason}
        maxLength={120}
        rows={3}
        onChange={(e) =>
          set({ reason: e.target.value.slice(0, 120), checkedFor: "" })
        }
      />
      <p className="g019-help">
        Veriden en az bir neden yaz. En az 8, en çok 120 işaret.
      </p>
      <button
        type="button"
        className="button secondary"
        disabled={!valid || s.reason.trim().length < 8}
        onClick={() => set({ checkedFor: signature })}
      >
        Tahmini dene
      </button>
      {checked && (
        <div className="g019-feedback" data-prediction-feedback role="status">
          <strong>
            {s.answer === expected
              ? "Seçimin kanıtla uyumlu."
              : "Seçimini kanıtla yeniden düşün."}
          </strong>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}
function Facts({
  items,
}: {
  items: readonly (readonly [string, ReactNode])[];
}) {
  return (
    <dl className="g019-facts">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
function Region() {
  const [s, set] = useExploration("forge019-geo-region", {
      criterion: "rain",
      threshold: 600,
      clinic: "A",
      changed: false,
      selected: 0,
    }),
    criterion = safeKey(regionCriteria019, s.criterion, "rain"),
    m = region019(
      criterion,
      clamp(s.threshold, 200, 1200),
      ["A", "B"].includes(s.clinic) ? s.clinic : "A",
      s.changed,
      Math.round(clamp(s.selected, 0, 11)),
    ),
    formal = m.formal.includes(m.target.id),
    service = m.service.includes(m.target.id),
    expected = formal
      ? service
        ? "both"
        : "formal"
      : service
        ? "service"
        : "neither";
  return (
    <>
      <h3>Bir alan, iki farklı ölçüt</h3>
      <p>
        On iki eş alan hücresi var. Ortak özellik ve sağlık merkezi bağı ayrı
        katmanlar. Önce bir hücre seç; sonra yalnız bir ayarı değiştir.
      </p>
      <div className="g019-controls">
        <Choice
          label="Şekilsel ölçüt"
          value={criterion}
          options={choices(regionCriteria019)}
          onChange={(criterion) => set({ criterion })}
        />
        <Choice
          label="Hizmet merkezi"
          value={m.clinic}
          options={[
            ["A", "A merkezi"],
            ["B", "B merkezi"],
          ]}
          onChange={(clinic) => set({ clinic })}
        />
        <Choice
          label="İncelenen hücre"
          value={String(m.selected)}
          options={m.cells.map(
            (c, i) => [String(i), `${c.id}. hücre`] as const,
          )}
          onChange={(selected) => set({ selected: Number(selected) })}
        />
      </div>
      {criterion === "rain" && (
        <Range
          label="Yağış eşiği (mm)"
          value={m.threshold}
          min={200}
          max={1200}
          step={50}
          onChange={(threshold) => set({ threshold })}
        />
      )}
      <Check
        label="3. hücrenin hizmetini B’ye al"
        checked={s.changed}
        onChange={(changed) => set({ changed })}
      />
      <figure>
        <Diagram
          height={400}
          title="Şekilsel üyelik ve hizmet bağı"
          description="Üç sütun, dört satırda hücre numarası ve A/B hizmet merkezi. Kalın çerçeve ortak özellik; kesik iç çerçeve seçili hizmet; noktalı dış çizgi incelenen hücre."
        >
          {m.cells.map((c, i) => {
            const x = 15 + (i % 3) * 95,
              y = 15 + Math.floor(i / 3) * 95;
            return (
              <g key={c.id}>
                <rect
                  className={c.formal ? "g019-formal" : "g019-cell"}
                  x={x}
                  y={y}
                  width={80}
                  height={80}
                  rx={7}
                />
                {m.service.includes(c.id) && (
                  <rect
                    className="g019-service"
                    x={x + 8}
                    y={y + 8}
                    width={64}
                    height={64}
                    rx={3}
                  />
                )}
                <text x={x + 40} y={y + 33}>
                  {c.id}
                </text>
                <text x={x + 40} y={y + 62}>
                  {c.clinic}
                </text>
                {i === m.selected && (
                  <rect
                    className="g019-focus"
                    x={x - 4}
                    y={y - 4}
                    width={88}
                    height={88}
                    rx={9}
                  />
                )}
              </g>
            );
          })}
        </Diagram>
        <figcaption>
          Üst sayı hücre, alt harf hizmet merkezi. Kalın dış çizgi şekilsel
          üyeliği; kesik iç çizgi seçili hizmeti gösterir. Noktalı çerçeve
          seçtiğin hücredir.
        </figcaption>
      </figure>
      <div className="g019-result" data-model-result>
        <strong>{m.name}</strong>
        <Facts
          items={[
            ["Bölge türü", m.kind],
            ["Şekilsel üyeler", m.formal.length ? m.formal.join(", ") : "Yok"],
            [`${m.clinic} hizmet üyeleri`, m.service.join(", ")],
            [
              "İki kümenin ortak üyeleri",
              m.overlap.length ? m.overlap.join(", ") : "Yok",
            ],
            [
              "Seçilen hücre",
              `${m.target.id}. hücre; ${m.target.rain} mm; merkez ${m.target.clinic}`,
            ],
            [
              "Ortak özellik / hizmet",
              `${formal ? "Var" : "Yok"} / ${service ? "Var" : "Yok"}`,
            ],
          ]}
        />
        <p>{readable(m.proof)}</p>
      </div>
      <details>
        <summary>12 hücrenin bütün verileri</summary>
        <ul className="g019-data-list">
          {m.cells.map((c) => (
            <li key={c.id}>
              <strong>{c.id}. hücre</strong>
              <p>
                Yağış {c.rain} mm. Buğday: {c.wheat ? "var" : "yok"}. Düz alan:{" "}
                {c.flat ? "evet" : "hayır"}. Hizmet: {c.clinic} merkezi.
                Şekilsel üye: {c.formal ? "evet" : "hayır"}.
              </p>
            </li>
          ))}
        </ul>
      </details>
      <p className="g019-help">
        Bu hücreler özgün ders verisi; gerçek il, iklim normali veya hastane ağı
        değildir. Yağış eşiği yalnız seçim kuralıdır. Kurum kararı sadece 3.
        hücrenin hizmet bağını değiştirir; yağışı ve ürünü değişmez.
      </p>
      <Prediction
        id="region"
        signature={JSON.stringify([
          criterion,
          m.threshold,
          m.clinic,
          s.changed,
          m.selected,
        ])}
        expected={expected}
        options={[
          ["both", "İki kümeye de girer"],
          ["formal", "Yalnız ortak özellik"],
          ["service", "Yalnız hizmet"],
          ["neither", "İkisine de girmez"],
        ]}
        explanation={`${m.target.id}. hücre ${m.target.rain} mm yağış alır. Ortak özellik koşulu: ${formal ? "sağlanır" : "sağlanmaz"}. ${m.clinic} hizmet bağı: ${service ? "var" : "yok"}. Veri ile üyelik kuralı ayrı okunur.`}
      />
    </>
  );
}
function Transport() {
  const [s, set] = useExploration("forge019-geo-transport", {
      waterway: "suez",
      speed: 20,
      wait: 5,
      open: true,
    }),
    waterway = safeKey(waterways019, s.waterway, "suez"),
    m = transport019(
      waterway,
      clamp(s.speed, 10, 100),
      clamp(s.wait, 0, 40),
      s.open,
    ),
    expected =
      m.best === "Süreler eşit"
        ? "equal"
        : m.best === "Kanal rotası"
          ? "canal"
          : "around",
    three = waterway === "turkish";
  return (
    <>
      <h3>Su yolunu tanı, süreyi ayrı hesapla</h3>
      <p>
        Önce gerçek geçişin türünü ve deniz bağını incele. Alt deneydeki X–Y
        limanları ile 1000 ve 700 km ise özgün örnektir; seçilen su yolunun
        gerçek mesafesi değildir.
      </p>
      <Choice
        label="Su yolu"
        value={waterway}
        options={choices(waterways019)}
        onChange={(waterway) => set({ waterway })}
      />
      <figure>
        <Diagram
          height={180}
          title={`${m.name} bağlantısı`}
          description={`${m.seas.join(" → ")}. Şema konumu ölçeklemez; deniz adları hemen altında tam yazılıdır.`}
        >
          <path
            className="g019-sea"
            d="M10 30Q40 15 70 30V140Q40 155 10 140Z"
          />
          <path
            className="g019-sea"
            d="M230 30Q260 15 290 30V140Q260 155 230 140Z"
          />
          {three ? (
            <>
              <path className="g019-link" d="M70 85H120M180 85H230" />
              <ellipse className="g019-sea" cx={150} cy={85} rx={30} ry={48} />
              <text x={150} y={93}>
                B
              </text>
            </>
          ) : (
            <>
              <path
                className={
                  m.kind.includes("Yapay") ? "g019-canal" : "g019-natural"
                }
                d={
                  m.kind.includes("Yapay")
                    ? "M70 72H230V98H70Z"
                    : "M70 65Q115 110 150 70T230 65V110Q185 75 150 108T70 110Z"
                }
              />
            </>
          )}
          <text x={40} y={93}>
            A
          </text>
          <text x={260} y={93}>
            {three ? "C" : "B"}
          </text>
        </Diagram>
        <figcaption>
          {m.kind}. Bağ şemasıdır; harita ve gerçek genişlik ölçüsü değildir.
        </figcaption>
      </figure>
      <Facts
        items={[
          ["Gerçek geçiş", readable(m.name)],
          ["Konum", readable(m.location)],
          ...m.seas.map(
            (sea, i) => [String.fromCharCode(65 + i), readable(sea)] as const,
          ),
        ]}
      />
      <p>{readable(m.proof)}</p>
      <div className="g019-controls">
        <Range
          label="Ortak hız (km/saat)"
          value={m.speed}
          min={10}
          max={100}
          step={5}
          onChange={(speed) => set({ speed })}
        />
        <Range
          label="Kanal beklemesi (saat)"
          value={m.wait}
          min={0}
          max={40}
          onChange={(wait) => set({ wait })}
        />
      </div>
      <Check
        label="Örnek kanal açık"
        checked={s.open}
        onChange={(open) => set({ open })}
      />
      <figure>
        <Diagram
          height={235}
          title="Özgün X–Y rota deneyi"
          description="Kıvrımlı dolaşma 1000 km, düz kanal 700 km. Kapalı kanalda çarpı vardır. Şekil gerçek harita değildir."
        >
          <path className="g019-route" d="M30 140C30 20 270 20 270 140" />
          <path
            className={s.open ? "g019-route-short" : "g019-closed"}
            d="M30 140H270"
          />
          <circle className="g019-node" cx={30} cy={140} r={23} />
          <circle className="g019-node" cx={270} cy={140} r={23} />
          <text x={30} y={148}>
            X
          </text>
          <text x={270} y={148}>
            Y
          </text>
          <text x={150} y={35}>
            1000 km
          </text>
          <text x={150} y={125}>
            700 km
          </text>
          {!s.open && (
            <path className="g019-cross" d="M140 130L160 150M160 130L140 150" />
          )}
          <text x={150} y={195}>
            {s.open ? `${fmt(m.wait)} sa bekleme` : "Kanal kapalı"}
          </text>
        </Diagram>
        <figcaption>
          İki yolda aynı sabit hız; ek süre yalnız kanalda. Çizgi uzunluğu
          coğrafi ölçek değildir.
        </figcaption>
      </figure>
      <div className="g019-result" data-model-result>
        <strong>{m.best}</strong>
        <Facts
          items={[
            ["Dolaşma toplamı", `${fmt(m.around)} saat`],
            [
              "Kanal toplamı",
              m.shortcut === null ? "Kullanılamaz" : `${fmt(m.shortcut)} saat`,
            ],
            ["Mesafe kazancı", s.open ? "300 km" : "Kanal kapalı"],
            ["Eşitlik beklemesi", `${fmt(m.thresholdWait)} saat`],
          ]}
        />
        <p>
          Hareket süresi = mesafe / hız. Kanal toplamı = 700 / {fmt(m.speed)} +{" "}
          {fmt(m.wait)}. Dolaşma = 1000 / {fmt(m.speed)}.
        </p>
      </div>
      <p className="g019-help">
        Ücret, akıntı, hava ve gemi boyutu verilmedi. En kısa toplam süre yalnız
        bu deney içindir; gerçek ticari en uygun rota veya geçiş hakkı bu
        sayılardan çıkmaz.
      </p>
      <Prediction
        id="transport"
        signature={JSON.stringify([m.speed, m.wait, m.open])}
        expected={expected}
        options={[
          ["canal", "Kanal daha kısa sürer"],
          ["around", "Dolaşma daha kısa sürer"],
          ["equal", "Süreler eşit"],
        ]}
        explanation={`Dolaşma ${fmt(m.around)} saat. Kanal ${m.shortcut === null ? "kapalıdır" : `${fmt(m.shortcut)} saat`}. Mesafe farkının bu hızdaki kazancı ${fmt(m.thresholdWait)} saattir; bekleme bununla kıyaslanır.`}
      />
    </>
  );
}
function Environment() {
  const [s, set] = useExploration("forge019-geo-environment", {
      load: 1000,
      flow: 1000,
      prevention: 20,
      capture: 40,
    }),
    m = environment019(
      clamp(s.load, 0, 5000),
      clamp(s.flow, 1000, 10000),
      clamp(s.prevention, 0, 100),
      clamp(s.capture, 0, 100),
    ),
    parts = [
      { key: "A", name: "Kaynakta önlenen", n: m.avoided },
      { key: "B", name: "Tesiste tutulan", n: m.retained },
      { key: "C", name: "Dışarı çıkan", n: m.emitted },
    ],
    expected = m.emitted === 0 ? "zero" : "positive";
  return (
    <>
      <h3>Madde nereye gidiyor?</h3>
      <p>
        Bir günlük X maddesini izle. Önce oluşumu azalt; sonra tesise gelenin
        bir kısmını tut. Son olarak çıkan yükü su akışına böl. Aynı yüzdeyi iki
        farklı tabana uygulama.
      </p>
      <div className="g019-controls">
        <Range
          label="Başlangıç yükü (mg/gün)"
          value={m.load}
          min={0}
          max={5000}
          step={50}
          onChange={(load) => set({ load })}
        />
        <Range
          label="Su akışı (L/gün)"
          value={m.flow}
          min={1000}
          max={10000}
          step={500}
          onChange={(flow) => set({ flow })}
        />
        <Range
          label="Kaynakta önleme (%)"
          value={m.prevention}
          min={0}
          max={100}
          step={10}
          onChange={(prevention) => set({ prevention })}
        />
        <Range
          label="Girişten tutulan (%)"
          value={m.capture}
          min={0}
          max={100}
          step={10}
          onChange={(capture) => set({ capture })}
        />
      </div>
      <figure>
        <Diagram
          height={350}
          title="Bir günlük kütle bilançosu"
          description="A kaynakta önlenen, B tesiste tutulan, C dışarı çıkan madde. Üç çubuk aynı mg/gün ölçeğinde. Her sayının tam değeri aşağıda yer alır."
        >
          {[0, 2500, 5000].map((n) => (
            <g key={n}>
              <path
                className="g019-grid"
                d={`M75 ${285 - (n / 5000) * 210}H290`}
              />
              <text
                className="g019-axis-text"
                x={68}
                y={293 - (n / 5000) * 210}
              >
                {fmt(n, 0)}
              </text>
            </g>
          ))}
          <text x={160} y={35}>
            mg/gün
          </text>
          {parts.map((p, i) => {
            const h = (p.n / 5000) * 210,
              x = 95 + i * 70;
            return (
              <g key={p.key}>
                <rect
                  className={`g019-mass g019-mass-${p.key}`}
                  x={x}
                  y={285 - h}
                  width={45}
                  height={h}
                />
                <text x={x + 22.5} y={322}>
                  {p.key}
                </text>
              </g>
            );
          })}
          <path className="g019-axis" d="M75 65V285H290" />
        </Diagram>
        <figcaption>
          A: kaynakta önlenen. B: tesiste tutulan. C: dışarı çıkan. Çubuklar
          aynı ölçekli; tutulan atık yok olmaz.
        </figcaption>
      </figure>
      <div className="g019-result" data-model-result>
        <strong>Dışarı çıkan derişim: {fmt(m.after, 4)} mg/L</strong>
        <Facts
          items={[
            ["A — Önlenen", `${fmt(m.avoided)} mg/gün`],
            ["Tesise giren", `${fmt(m.entered)} mg/gün`],
            ["B — Tutulan", `${fmt(m.retained)} mg/gün`],
            ["C — Çıkan", `${fmt(m.emitted)} mg/gün`],
            ["Üç payın toplamı", `${fmt(m.balance)} mg/gün`],
            ["Tesise giriş derişimi", `${fmt(m.before, 4)} mg/L`],
          ]}
        />
        <p>
          Önlenen = {fmt(m.load)} × {fmt(m.prevention)} / 100. Tutulan ={" "}
          {fmt(m.entered)} × {fmt(m.capture)} / 100. Çıkan = {fmt(m.entered)} −{" "}
          {fmt(m.retained)}. Derişim = {fmt(m.emitted)} / {fmt(m.flow)}.
        </p>
      </div>
      <p className="g019-help">
        Sabit bir günlük akış ve tam karışım var; hacim kaybı ve kimyasal
        tepkime yok. Veriler özgün deney içindir. Sağlık sınırı veya gerçek
        tesis verimi verilmedi. Tutulan madde ayrı atık olarak yönetilir.
      </p>
      <p>
        Karşılaştır: yalnız akışı artırınca derişim düşer ama C yükü sabit
        kalır. Kaynakta önleme ise ilk kaynaktan tesise giden maddeyi azaltır.
        Bu iki yol aynı fiziksel etki değildir.
      </p>
      <Prediction
        id="environment"
        signature={JSON.stringify([m.load, m.flow, m.prevention, m.capture])}
        expected={expected}
        options={[
          ["zero", "Çıkan X yükü sıfır"],
          ["positive", "Çıkan X yükü pozitif"],
        ]}
        explanation={`Başlangıç ${fmt(m.load)}, önlenen ${fmt(m.avoided)}, tutulan ${fmt(m.retained)}, çıkan ${fmt(m.emitted)} mg/gün. Üç ayrı payın toplamı başlangıçtır. Sıfır X bile tek başına suyun içilebilir olduğunu göstermez.`}
      />
    </>
  );
}
function Disaster() {
  const [s, set] = useExploration("forge019-geo-disaster", {
      level: 6,
      moved: false,
      strong: false,
      action: "drill",
    }),
    action = safeKey(disasterActions019, s.action, "drill"),
    m = disaster019(clamp(s.level, 0, 10), s.moved, s.strong, action),
    waterY = 300 - m.level * 14,
    ground = m.sites
      .map(
        (v, i) =>
          `${32 + i * 19},${300 - v.height * 14} ${48 + i * 19},${300 - v.height * 14}`,
      )
      .join(" "),
    expected = m.exposed === 0 ? "none" : m.exposed === 10 ? "all" : "some";
  return (
    <>
      <h3>Su aynı, maruziyet farklı olabilir</h3>
      <p>
        On ev ve on üç sabit yer var. Su seviyesini değiştir; ardından ilk üç
        evi başka yerlere taşı. Yapı iyileştirme ise konumu değil kırılganlık
        koşulunu değiştirir.
      </p>
      <Range
        label="Verilen su seviyesi (m)"
        value={m.level}
        min={0}
        max={10}
        step={1}
        onChange={(level) => set({ level })}
      />
      <Check
        label="İlk üç evi 12–14 m yerlere taşı"
        checked={m.moved}
        onChange={(moved) => set({ moved })}
      />
      <Check
        label="Yapıları uzman denetimi ile iyileştir"
        checked={m.strong}
        onChange={(strong) => set({ strong })}
      />
      <figure>
        <Diagram
          height={355}
          title="Sabit arazi ve taşınabilen evler"
          description={`Su ${fmt(m.level)} metre. ${m.exposed} evin kat kotuna ulaşır. Arazi 13 sabit yerden oluşur; taşınan ilk üç ev 12, 13 ve 14 metreye gider. Yatay ölçek verilmez.`}
        >
          <rect
            className="g019-water"
            x={35}
            y={waterY}
            width={255}
            height={Math.max(0, 300 - waterY)}
          />
          {[0, 5, 10, 15].map((n) => (
            <g key={n}>
              <path className="g019-grid" d={`M35 ${300 - n * 14}H290`} />
              <text className="g019-axis-text" x={29} y={308 - n * 14}>
                {n}
              </text>
            </g>
          ))}
          <path className="g019-water-line" d={`M35 ${waterY}H290`} />
          <polygon
            className="g019-ground"
            points={`35,300 ${ground} 290,104 290,325 35,325`}
          />
          <polyline className="g019-land-line" points={ground} />
          {m.homes.map((h) => {
            const x = 40 + h.site * 19,
              y = 300 - h.height * 14;
            return (
              <g
                key={h.id}
                className={h.exposed ? "g019-house-exposed" : "g019-house"}
                data-home={h.id}
                data-site={h.site + 1}
                data-height={h.height}
                data-ground-y={y}
              >
                <path
                  d={`M${x - 7} ${y}V${y - 13}L${x} ${y - 21}L${x + 7} ${y - 13}V${y}Z`}
                />
                {m.strong && (
                  <path
                    className="g019-brace"
                    d={`M${x - 5} ${y - 2}L${x + 5} ${y - 12}M${x + 5} ${y - 2}L${x - 5} ${y - 12}`}
                  />
                )}
              </g>
            );
          })}
          <path className="g019-axis" d="M35 75V325H290" />
          <text x={155} y={45}>
            Kot (m)
          </text>
        </Diagram>
        <figcaption>
          Düz yatay çizgi su seviyesi; renkli evler maruz. Ev tabanı kendi yer
          kotuna oturur. Yatay mesafe ölçeği yok; bu bir gerçek taşkın haritası
          değildir.
        </figcaption>
      </figure>
      <div className="g019-result" data-model-result>
        <strong>
          {m.exposed} / {m.total} ev maruz
        </strong>
        <Facts
          items={[
            ["Su seviyesi", `${fmt(m.level)} m`],
            [
              "Kırılganlık koşulu",
              m.strong
                ? "Daha düşük örnek kırılganlık"
                : "Daha yüksek örnek kırılganlık",
            ],
            ["Taşınma", m.moved ? "İlk üç ev yeni yerde" : "Evler ilk yerinde"],
          ]}
        />
        <p>
          Kat kotu suya eşit veya daha alçaksa ev maruz sayılır. Yapı
          iyileştirme suyu ve yeri aynı bırakır; hasar yüzdesi bulunmaz.
        </p>
      </div>
      <details>
        <summary>Her evin kotunu ve sonucunu gör</summary>
        <ul className="g019-data-list">
          {m.homes.map((h) => (
            <li key={h.id}>
              {h.id}. ev — {h.site + 1}. yer — kot {h.height} m —{" "}
              {h.exposed ? "maruz" : "bu seviyede maruz değil"}.
            </li>
          ))}
        </ul>
        <p>
          13 sabit yerin kotları: {m.sites.map((v) => v.height).join(", ")} m.
          Evler taşınınca bu arazi değerleri değişmez.
        </p>
      </details>
      <Choice
        label="Afet döngüsü işi"
        value={action}
        options={choices(disasterActions019)}
        onChange={(action) => set({ action })}
      />
      <div className="g019-action">
        <h4>{m.phase}</h4>
        <p>{readable(m.proof)}</p>
      </div>
      <p className="g019-help">
        Bu özgün kesit verilen su seviyesini kullanır; yağıştan taşkın tahmini
        yapmaz. Gerçek hasar, can kaybı, yapı uygunluğu veya güvenli yer kararı
        verilmez. Yerel ve yetkili bilgi gerekir.
      </p>
      <Prediction
        id="disaster"
        signature={JSON.stringify([m.level, m.moved, m.strong])}
        expected={expected}
        options={[
          ["none", "Hiçbir ev maruz değil"],
          ["some", "Bazı evler maruz"],
          ["all", "Bütün evler maruz"],
        ]}
        explanation={`Verilen su ${fmt(m.level)} m; koşulu sağlayan ${m.exposed} ev var. Taşınma ${m.moved ? "açık" : "kapalı"}. Yapı iyileştirme konumu aynı bıraktığı için maruziyet sayısını ayrıca düşürmez.`}
      />
    </>
  );
}
export default function Forge019GeographyLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const models: Record<string, () => ReactNode> = {
      "bolge-turleri": Region,
      "ulasim-aglari": Transport,
      "cevre-toplum": Environment,
      "afetler-risk": Disaster,
    },
    Model = Object.hasOwn(models, lessonId) ? models[lessonId] : null;
  return Model ? (
    <section className="forge019-geography-lab" data-forge019={lessonId}>
      <Model />
      <p className="g019-help">
        Bu deney puan veya ustalık kaydı üretmez. Bağımsız çözümünü Sorular
        bölümünde kaydet.
      </p>
    </section>
  ) : null;
}
