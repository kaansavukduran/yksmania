import { useId, useState, type ReactNode, type CSSProperties } from "react";
import { useExploration } from "./useExploration";
import {
  worldPlaces018,
  worldDistribution018,
  pyramidAges018,
  pyramidProfiles018,
  pyramid018,
  turkeyContexts018,
  turkeyPopulation018,
  migrationStories018,
  migration018,
  economicChains018,
  economy018,
} from "./forge018Geography";
import "./forge018Geography.css";
import { WorldBase, equirect } from "./geo/WorldBase";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number, d = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: d }).format(n);
const clamp = (n: number, a: number, b: number) =>
  Number.isFinite(n) ? Math.min(b, Math.max(a, n)) : a;
const readable = (s: string) => {
  const pairs: readonly (readonly [string, string])[] = [
    ["Araştırmacı başka", "Uzman başka"],
    ["Çatışmadan kaçan", "Çatışma yüzünden kaçan"],
    ["Himalayalar", "Himalaya Dağları"],
    ["Yoğunlaşma örneği", "Nüfus odağı örneği"],
    ["Yerel yoğunlaşma", "Yerel nüfus odağı"],
    ["kesinleştirilemez", "kesin bilinmez"],
    [
      "Ders tipinde doğumlar yüksek kalırken ölüm koşullarının iyileşmesiyle daha çok kuşak ileri yaşlara ulaşır.",
      "Ders tipinde doğumlar yüksek kalır. Ölüm koşulları daha iyi oldukça daha çok kuşak ileri yaşlara ulaşır.",
    ],
    [
      "Geçmiş doğurganlık düşüşü bir yorumdur;",
      "Kadın başına doğum sayısı düşmüş olabilir;",
    ],
    [
      "En yeni kuşakların önceki çocuk kuşaklarından genişlemesi görülür; doğumun yeniden artması ders senaryosudur.",
      "En yeni çocuk grubu önceki çocuk grubundan daha geniştir; yeniden artan doğum ders örneğidir.",
    ],
    ["kesimlerinde", "alanlarında"],
    ["kısıtlayıcıdır", "kısıt getirir"],
    ["beyin göçü kapsamında incelenebilir", "beyin göçü olarak ele alınır"],
    [
      "Ziyaretçiler ayrı geçici kalabalıktır, adres nüfusuna otomatik eklenmez.",
      "Ziyaretçi sayısı geçici kalışı verir; adres nüfusuna otomatik eklenmez.",
    ],
  ];
  let out = s
    .replace(/(?<=\p{L})–(?=\p{L})/gu, " – ")
    .replace(/(?<=\p{L})\/(?=\d)/gu, " / ");
  for (const [from, to] of pairs) out = out.replaceAll(from, to);
  return out;
};
const choices = (o: Record<string, { name: string }>) =>
  Object.entries(o).map(([k, v]) => [k, v.name] as const);
function Diagram({
  title,
  description,
  children,
  height = 300,
  width = 440,
}: {
  title: string;
  description: string;
  children: ReactNode;
  height?: number;
  width?: number;
}) {
  const id = useId();
  return (
    <svg
      className="g018-diagram"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      style={{ "--g018-arrow": `url(#${id}-arrow)` } as CSSProperties}
    >
      <defs>
        <marker
          id={`${id}-arrow`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path className="g018-arrow-head" d="M1 1L9 5L1 9Z" />
        </marker>
      </defs>
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{description}</desc>
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
    <div className="g018-control">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([k, t]) => (
          <option key={k} value={k}>
            {readable(t)}
          </option>
        ))}
      </ChoiceSelect>
      <output className="g018-selected" htmlFor={id}>
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
    <div className="g018-control">
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
    <label className="g018-check">
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
    [s, set] = useExploration(`forge018-geo-predict-${id}`, {
      answer: "",
      reason: "",
      checkedFor: "",
    });
  const valid = options.some(([v]) => v === s.answer),
    checked =
      s.checkedFor === signature && valid && s.reason.trim().length >= 8;
  return (
    <div className="g018-prediction">
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
      <p className="g018-help">
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
        <div className="g018-feedback" data-prediction-feedback role="status">
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
    <dl className="g018-facts">
      {items.map(([t, v]) => (
        <div key={t}>
          <dt>{t}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
function World() {
  const [s, set] = useExploration("forge018-geo-dunya-nufus-dagilisi", {
    place: "nile",
    clustered: false,
    total: 10000,
    area: 100,
  });
  const m = worldDistribution018(
    s.place,
    s.clustered,
    clamp(s.total, 100, 1000000),
    clamp(s.area, 4, 100000),
  );
  const box = { x: 35, y: 30, w: 370, h: 200 };
  const xy = equirect(box, [-180, 180], [-60, 80]);
  return (
    <>
      <h3>Dağılışı keşfet</h3>
      <p>
        Gerçek yerin koşulunu seç. Sonra ayrı sayı örneğinde aynı toplamın dört
        eş alanda nasıl dağıldığını gör.
      </p>
      <Choice
        label="Dünya örneği"
        value={s.place}
        options={choices(worldPlaces018)}
        onChange={(place) => set({ place })}
      />
      <figure>
        <Diagram
          title="Dünya örneklerinin kabaca konumu"
          description="Boylam ve enlem ızgarasında sekiz örnek nokta. Harflerin tam adı ve koşulları şeklin altında; gerçek ülke sınırı veya nüfus ölçümü yok."
          height={280}
        >
          <WorldBase box={box} xy={xy} graticule={0} />
          {[-120, -60, 0, 60, 120].map((lon) => {
            const [x] = xy(lon, 0);
            return (
              <g key={lon}>
                <path className="g018-gridline" d={`M${x} 30V230`} />
                <text x={x} y={255}>
                  {lon}°
                </text>
              </g>
            );
          })}
          {[-40, 0, 40, 80].map((lat) => {
            const [, y] = xy(0, lat);
            return (
              <g key={lat}>
                <path className="g018-gridline" d={`M35 ${y}H405`} />
                <text x={20} y={y + 5}>
                  {lat}°
                </text>
              </g>
            );
          })}
          {Object.entries(worldPlaces018).map(([k, p], i) => {
            const [x, y] = xy(p.lon, p.lat);
            return (
              <g key={k}>
                <circle
                  cx={x}
                  cy={y}
                  r={k === s.place ? 13 : 10}
                  className={k === s.place ? "g018-active-node" : "g018-node"}
                />
                <text x={x} y={y + 4} className="g018-node-letter">
                  {String.fromCharCode(65 + i)}
                </text>
              </g>
            );
          })}
          <text x={220} y={272}>
            Boylam (°); dikey yön enlem (°)
          </text>
        </Diagram>
        <figcaption>
          Kıyılar gerçek haritadan (Natural Earth) çizildi. Izgara düz olduğu
          için alan oranları bozulur. Yukarı kuzeydir. Noktalar bölge sınırı
          çizmez.
        </figcaption>
      </figure>
      <Facts
        items={Object.values(worldPlaces018).map(
          (p, i) => [String.fromCharCode(65 + i), readable(p.name)] as const,
        )}
      />
      <div className="g018-result" data-model-result>
        <strong>
          {readable(m.name)} · {readable(m.kind)}
        </strong>
        <p>{readable(m.proof)}</p>
        <p>
          Ayrı dört hücre örneği: {fmt(m.total)} kişi / {fmt(m.area)} km² ={" "}
          {fmt(m.density)} kişi/km².{" "}
          {m.clustered ? "Yerel küme var." : "Eşit dağılım var."}
        </p>
      </div>
      <Check
        label="Bir hücrede küme"
        checked={s.clustered}
        onChange={(clustered) => set({ clustered })}
      />
      <div className="g018-controls">
        <Range
          label="Toplam kişi"
          value={m.total}
          min={100}
          max={1000000}
          step={100}
          onChange={(total) => set({ total })}
        />
        <Range
          label="Toplam alan (km²)"
          value={m.area}
          min={4}
          max={100000}
          onChange={(area) => set({ area })}
        />
      </div>
      <figure>
        <Diagram
          title="Dört eş alanlı nüfus hücresi"
          description={m.counts
            .map(
              (n, i) =>
                `${i + 1}. hücre ${fmt(n)} kişi, ${fmt(m.localDensities[i])} kişi/km²`,
            )
            .join("; ")}
          height={300}
        >
          {m.shares.map((v, i) => {
            const x = 50 + (i % 2) * 185,
              y = 30 + Math.floor(i / 2) * 130;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={155}
                  height={105}
                  className="g018-cell"
                />
                <circle
                  cx={x + 77.5}
                  cy={y + 52}
                  r={Math.sqrt(v / Math.PI) * 6}
                  className="g018-pop-dot"
                />
                <text className="g018-outline-text" x={x + 77.5} y={y + 59}>
                  {i + 1}: %{v}
                </text>
              </g>
            );
          })}
          <text x={220} y={294}>
            Her hücre {fmt(m.area / 4)} km²
          </text>
        </Diagram>
        <figcaption>
          Daire alanı hücrenin nüfus payıyla orantılıdır; karelerin alanları
          eşittir.
        </figcaption>
      </figure>
      <Facts
        items={m.counts.map(
          (n, i) =>
            [
              `${i + 1}. hücre`,
              `${fmt(n)} kişi; ${fmt(m.area / 4)} km²; ${fmt(m.localDensities[i])} kişi/km²`,
            ] as const,
        )}
      />
      <p className="g018-help">{readable(m.limit)}</p>
      <Prediction
        id="dunya-nufus-dagilisi"
        signature={`${s.place}/${s.clustered}/${m.total}/${m.area}`}
        expected="same"
        options={[
          ["same", "Ortalama aynı"],
          ["more", "Ortalama artar"],
          ["less", "Ortalama azalır"],
        ]}
        explanation="Küme düğmesi yerel dağılımı değiştirir. Toplam kişi ve alan aynıysa bölge ortalaması aynı kalır."
      />
    </>
  );
}
function Pyramid() {
  const [s, set] = useExploration("forge018-geo-nufus-piramitleri", {
    profile: "triangle",
    total: 100000,
    departure: false,
    age: 0,
    count: false,
  });
  const m = pyramid018(
      s.profile,
      Math.round(clamp(s.total, 10000, 10000000)),
      s.departure,
    ),
    age = Math.round(clamp(s.age, 0, 15));
  const values = [...m.male, ...m.female],
    max = Math.max(...values),
    scale = s.count ? max : (max / m.total) * 100,
    tick = s.count ? fmt(scale, 0) : fmt(scale, 2);
  return (
    <>
      <h3>Kuşakları incele</h3>
      <p>
        Beş ders tipini kıyasla. Çıkış deneyi yalnız bir yaş ve cinsiyet grubunu
        azaltır; grafik bu açık koşula göre yeniden kurulur.
      </p>
      <Choice
        label="Piramit tipi"
        value={s.profile}
        options={choices(pyramidProfiles018)}
        onChange={(profile) => set({ profile })}
      />
      <Range
        label="Başlangıç kişi"
        value={m.initial}
        min={10000}
        max={10000000}
        step={10000}
        onChange={(total) => set({ total })}
      />
      <Check
        label="20–24 erkek çıkışı"
        checked={s.departure}
        onChange={(departure) => set({ departure })}
      />
      <Check
        label="Eksende kişi sayısı"
        checked={s.count}
        onChange={(count) => set({ count })}
      />
      <Choice
        label="Yaş grubu"
        value={String(age)}
        options={pyramidAges018.map((n, i) => [String(i), n] as const)}
        onChange={(age) => set({ age: Number(age) })}
      />
      <figure>
        <Diagram
          title="16 yaş grubunda iki cinsiyetli nüfus piramidi"
          description={`Sol erkek, sağ kadın; ${s.count ? "kişi sayısı" : "toplam nüfusun yüzdesi"}. En yaşlı grup 75+ açık uçludur. Bütün değerler alttaki listede.`}
          height={550}
          width={500}
        >
          <text x={130} y={24}>
            Erkek
          </text>
          <text x={370} y={24}>
            Kadın
          </text>
          {m.groups.map((_, i) => {
            const y = 48 + (15 - i) * 27,
              w1 = (m.male[i] / max) * 180,
              w2 = (m.female[i] / max) * 180;
            return (
              <g key={i}>
                <rect
                  x={225 - w1}
                  y={y}
                  width={w1}
                  height={19}
                  className={i === age ? "g018-selected-bar" : "g018-male-bar"}
                />
                <rect
                  x={275}
                  y={y}
                  width={w2}
                  height={19}
                  className={
                    i === age ? "g018-selected-bar" : "g018-female-bar"
                  }
                />
                <text x={250} y={y + 15}>
                  {pyramidAges018[i]}
                </text>
              </g>
            );
          })}
          <path className="g018-axis" d="M45 480H225V40 M275 40V480H455" />
          {[0, 0.5, 1].map((n) => (
            <g key={n}>
              <path
                className="g018-tick-line"
                d={`M${225 - n * 180} 480v7 M${275 + n * 180} 480v7`}
              />
              <text x={225 - n * 180} y={510}>
                {s.count
                  ? fmt(max * n, 0)
                  : fmt(((max * n) / m.total) * 100, 2)}
              </text>
              <text x={275 + n * 180} y={510}>
                {s.count
                  ? fmt(max * n, 0)
                  : fmt(((max * n) / m.total) * 100, 2)}
              </text>
            </g>
          ))}
          <text x={250} y={544}>
            {s.count ? "Kişi sayısı" : "Toplam nüfusta pay (%)"}
          </text>
        </Diagram>
        <figcaption>
          İki tarafta aynı ölçek: 0–{tick} {s.count ? "kişi" : "%"}. Son grup
          75+ beş yıllık değildir. Vurgu seçilen yaş grubunu gösterir.
        </figcaption>
      </figure>
      <div className="g018-result" data-model-result>
        <strong>
          {readable(m.name)} · {fmt(m.total, 0)} kişi
        </strong>
        <p>{readable(m.proof)}</p>
        <p>
          {pyramidAges018[age]} yaş: {fmt(m.groups[age], 0)} kişi; toplamda %
          {fmt(m.shares[age])}. Erkek {fmt(m.male[age], 0)}, kadın{" "}
          {fmt(m.female[age], 0)} kişi.
        </p>
        <p>
          Açık çıkış: {fmt(m.removed, 0)} kişi. Diğer çubukların kişi sayıları
          sabittir; toplam paydası değişebilir.
        </p>
      </div>
      <Facts
        items={[
          [
            "0–14 yaş",
            `${fmt(m.young, 0)} kişi; %${fmt((m.young / m.total) * 100)}`,
          ],
          [
            "15–64 yaş",
            `${fmt(m.working, 0)} kişi; %${fmt((m.working / m.total) * 100)}`,
          ],
          [
            "65+ yaş",
            `${fmt(m.old, 0)} kişi; %${fmt((m.old / m.total) * 100)}`,
          ],
          [
            "Yaş oranı",
            `(0–14 + 65+) / 15–64 ×100 = %${fmt(m.dependency)}; gerçek çalışan sayısı verilmedi.`,
          ],
        ]}
      />
      <details>
        <summary>Tüm yaş ve cinsiyet sayıları</summary>
        <Facts
          items={pyramidAges018.map(
            (n, i) =>
              [
                `${n} yaş`,
                `Erkek ${fmt(m.male[i], 0)}; kadın ${fmt(m.female[i], 0)}; toplam ${fmt(m.groups[i], 0)} kişi; pay %${fmt(m.shares[i])}`,
              ] as const,
          )}
        />
      </details>
      <p className="g018-help">{readable(m.limit)}</p>
      <Prediction
        id="nufus-piramitleri"
        signature={`${s.profile}/${m.initial}/${s.departure}`}
        expected="need"
        options={[
          ["need", "Neden için ek veri"],
          ["certain", "Çentik kesin göç"],
          ["jobs", "Yaş iş sayısını verir"],
        ]}
        explanation="Bu deneyde çıkış koşulu açıkça verildiği için nedeni biliyoruz. Gerçek bir tek piramitte çentiğin nedeni için ek kayıt gerekir; yaş payı gerçek iş sayısı değildir."
      />
    </>
  );
}
function Turkey() {
  const [s, set] = useExploration("forge018-geo-turkiye-nufusu", {
    context: "marmara",
    expanded: false,
    visitors: 100000,
  });
  const m = turkeyPopulation018(
    s.context,
    s.expanded,
    Math.round(clamp(s.visitors, 0, 500000)),
  );
  return (
    <>
      <h3>Kayıt sınırını dene</h3>
      <p>
        Gerçek bölgenin koşullarını oku. Ayrı A–D deneyinde kimse göç etmeden
        idari kent payını değiştir; ziyaretçiyi adres kaydından ayrı tut.
      </p>
      <Choice
        label="Türkiye örneği"
        value={s.context}
        options={choices(turkeyContexts018)}
        onChange={(context) => set({ context })}
      />
      <Check
        label="B ve C kent sayılsın"
        checked={s.expanded}
        onChange={(expanded) => set({ expanded })}
      />
      <Range
        label="Geçici ziyaretçi"
        value={m.visitors}
        min={0}
        max={500000}
        step={1000}
        onChange={(visitors) => set({ visitors })}
      />
      <figure>
        <Diagram
          title="Dört yerel birimde kayıtlı nüfus yoğunluğu"
          description="A 400 kişi/km²; B 100; C 100; D 25. Alan ve sakinler sabitken idari kent etiketleri değişebilir. Tam değerler alttaki listede."
          height={340}
        >
          {[0, 100, 200, 300, 400].map((v) => {
            const y = 265 - (v / 400) * 200;
            return (
              <g key={v}>
                <path className="g018-gridline" d={`M65 ${y}H415`} />
                <text x={32} y={y + 5}>
                  {v}
                </text>
              </g>
            );
          })}
          <path className="g018-axis" d="M65 55V265H415" />
          {m.units.map((u, i) => {
            const x = 90 + i * 85,
              h = (u.density / 400) * 200;
            return (
              <g key={u.id}>
                <rect
                  x={x}
                  y={265 - h}
                  width={42}
                  height={h}
                  className={u.urban ? "g018-selected-bar" : "g018-male-bar"}
                />
                <text x={x + 21} y={292}>
                  {u.id}
                </text>
              </g>
            );
          })}
          <text x={240} y={328}>
            Yoğunluk (kişi/km²); yatayda birimler
          </text>
        </Diagram>
        <figcaption>
          Vurgulu çubuk kent sınıfındadır. Etiket değişince çubuk yüksekliği
          değişmez; yoğunluk kişi ve alana bağlıdır.
        </figcaption>
      </figure>
      <div className="g018-result" data-model-result>
        <strong>
          Yerleşik {fmt(m.resident, 0)} kişi · idari kent %{fmt(m.urbanShare)}
        </strong>
        <p>
          {readable(m.name)}: {readable(m.proof)}
        </p>
        <p>
          Yerleşik toplam / alan: {fmt(m.resident, 0)} / {fmt(m.area)} ={" "}
          {fmt(m.density)} kişi/km². İdari kent sayısı {fmt(m.urban, 0)}{" "}
          kişidir.
        </p>
        <p>
          Geçici ziyaretçi {fmt(m.visitors, 0)} kişi; bu ayrı örnekte o anda
          bulunan toplam {fmt(m.present, 0)} kişidir. Adres nüfusu sabit.
        </p>
      </div>
      <Facts
        items={m.units.map(
          (u) =>
            [
              `${u.id} birimi`,
              `${fmt(u.residents, 0)} yerleşik kişi; ${fmt(u.area)} km²; ${fmt(u.density)} kişi/km²; ${u.urban ? "kent" : "kır"} etiketi`,
            ] as const,
        )}
      />
      <details>
        <summary>Tarihli kaynak örnekleri</summary>
        <p>
          Bu deney gerçek Türkiye sayımı değildir. MEBİ'nin tarihli dersinde
          1927 yaklaşık 13,6 milyon, 2023 ise 85.372.377 kişi örneği yer alır;
          2007'den itibaren adres kaydı kullanılır.
        </p>
        <p>
          2023 yaş payları %21,4; %68,3; %10,2 olarak verilir. Yuvarlama toplamı
          %99,9 yapabilir. Bunlar güncel 2026 ölçümü değildir; her yaş grubu ve
          yıl kendi kapsamıyla okunur.
        </p>
        <p>
          Artış hızı pozitifken düşse bile toplam kişi artabilir. Kır-kent
          etiketi, fiziksel yerleşme ve gerçek iş durumu farklı verilerdir.
        </p>
      </details>
      <p className="g018-help">{readable(m.limit)}</p>
      <Prediction
        id="turkiye-nufusu"
        signature={`${s.context}/${s.expanded}/${m.visitors}`}
        expected="same"
        options={[
          ["same", "Yerleşik sayı aynı"],
          ["more", "Etiket kişi ekler"],
          ["gone", "Kırdaki herkes gider"],
        ]}
        explanation="B ve C’nin idari sınıfı değişir; sakinleri taşınmaz. Geçici ziyaretçi de ayrı sayılır. Bu deneyde adres nüfusu bir milyon kişide sabittir."
      />
    </>
  );
}
function Migration() {
  const [s, set] = useExploration("forge018-geo-dunya-turkiye-gocler", {
    story: "work",
    internal: 2000,
    incoming: 1000,
    outgoing: 500,
    reverse: false,
  });
  const m = migration018(
    s.story,
    Math.round(clamp(s.internal, 0, 5000)),
    Math.round(clamp(s.incoming, 0, 5000)),
    Math.round(clamp(s.outgoing, 0, 5000)),
    s.reverse,
  );
  return (
    <>
      <h3>Akışın yönünü izle</h3>
      <p>
        Önce bir olay kartını üç ölçütte ayır. Sonra ayrı sayısal ağda iç
        hareket, sınır dışı giriş ve çıkışı değiştir.
      </p>
      <Choice
        label="Göç olayı"
        value={s.story}
        options={choices(migrationStories018)}
        onChange={(story) => set({ story })}
      />
      <Facts
        items={[
          ["Sınır", m.scope],
          ["Süre", m.duration],
          ["İrade", m.will],
        ]}
      />
      <p>{readable(m.proof)}</p>
      <div className="g018-controls">
        <Range
          label="İç hareket"
          value={m.internal}
          min={0}
          max={5000}
          step={100}
          onChange={(internal) => set({ internal })}
        />
        <Range
          label="Dışarıdan gelen"
          value={m.incoming}
          min={0}
          max={5000}
          step={100}
          onChange={(incoming) => set({ incoming })}
        />
        <Range
          label="Dışarıya giden"
          value={m.outgoing}
          min={0}
          max={5000}
          step={100}
          onChange={(outgoing) => set({ outgoing })}
        />
      </div>
      <Check
        label="İç yön Y’den X’e"
        checked={s.reverse}
        onChange={(reverse) => set({ reverse })}
      />
      <figure>
        <Diagram
          title="Aynı ülkede iki yer ve dış dünya arasında nüfus akışları"
          description={`X ve Y aynı ülke. İç hareket ${m.reverse ? "Y’den X’e" : "X’ten Y’ye"} ${fmt(m.internal)} kişi. Z’den Y’ye ${fmt(m.incoming)}, X’ten Z’ye ${fmt(m.outgoing)} kişi. Tam stok ve bilanço aşağıda.`}
          height={400}
        >
          <rect
            x={35}
            y={35}
            width={160}
            height={330}
            rx={18}
            className="g018-country"
          />
          <text x={115} y={24}>
            A ülkesi
          </text>
          <path
            className="g018-flow"
            d={m.reverse ? "M115 270V130" : "M115 130V270"}
          />
          <path className="g018-flow" d="M320 210C270 250 250 300 145 300" />
          <path className="g018-flow" d="M145 100C250 100 275 150 320 190" />
          <text x={139} y={204}>
            İç
          </text>
          <text x={290} y={315}>
            Giriş
          </text>
          <text x={258} y={82}>
            Çıkış
          </text>
          {[
            [115, 100, "X", m.x],
            [115, 300, "Y", m.y],
            [350, 200, "Z", m.z],
          ].map(([x, y, t, n]) => (
            <g key={String(t)}>
              <circle
                cx={Number(x)}
                cy={Number(y)}
                r={31}
                className="g018-node"
              />
              <text x={Number(x)} y={Number(y) - 40}>
                {String(t)}
              </text>
              <text x={Number(x)} y={Number(y) + 5}>
                {fmt(Number(n), 0)}
              </text>
            </g>
          ))}
          <text x={350} y={262}>
            Ülke dışı
          </text>
          <text x={220} y={392}>
            Oklar kişi akışı; düğümler son kişi sayısı
          </text>
        </Diagram>
        <figcaption>
          İç ok A ülkesi içinde kalır. Sınır aşan iki okun yönleri ayrıdır. Ok
          kalınlığı miktar ölçeği değildir.
        </figcaption>
      </figure>
      <div className="g018-result" data-model-result>
        <strong>
          Ülke sonu {fmt(m.country, 0)} kişi · fark {m.change >= 0 ? "+" : ""}
          {fmt(m.change, 0)}
        </strong>
        <p>
          Doğal fark +{fmt(m.natural, 0)}; dış net {m.net >= 0 ? "+" : ""}
          {fmt(m.net, 0)} kişi. İç hareket ülke toplamında dengelenir.
        </p>
        <p>
          X {fmt(m.x, 0)}, Y {fmt(m.y, 0)}, Z {fmt(m.z, 0)} kişi. Üç düğüm
          toplamı {fmt(m.world, 0)} kişidir; başlangıç 100.000’e yalnız +300
          doğal fark eklenir.
        </p>
      </div>
      <Facts
        items={[
          ["Başlangıç stokları", "X: 30.000; Y: 20.000; Z: 50.000 kişi"],
          [
            "Dış akışın yönü",
            "Giriş Z → Y; çıkış X → Z. Ok kalınlığı miktar vermez.",
          ],
          ["X doğal farkı", "200 doğum − 100 ölüm = +100 kişi"],
          ["Y doğal farkı", "400 doğum − 200 ölüm = +200 kişi"],
          [
            "İç hareket",
            `${m.reverse ? "Y → X" : "X → Y"}: ${fmt(m.internal, 0)} kişi; ülke neti 0`,
          ],
          [
            "Dış net",
            `${fmt(m.incoming, 0)} gelen − ${fmt(m.outgoing, 0)} giden = ${fmt(m.net, 0)} kişi`,
          ],
        ]}
      />
      <p className="g018-help">{readable(m.limit)}</p>
      <Prediction
        id="dunya-turkiye-gocler"
        signature={`${s.story}/${m.internal}/${m.incoming}/${m.outgoing}/${s.reverse}`}
        expected="inside"
        options={[
          ["inside", "İç hareket dengede"],
          ["add", "İç hareket eklenir"],
          ["birth", "Net göç doğumdur"],
        ]}
        explanation="X ve Y aynı ülke içinde birbirine kişi aktarır. Ülke toplamı için dış giriş-çıkış ve doğal fark kullanılır; iç akış yeni kişi üretmez."
      />
    </>
  );
}
const sectorNames = ["Birincil", "İkincil", "Üçüncül", "Dördüncül", "Beşincil"];
function StageIcon({ stage, x, y }: { stage: number; x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} className="g018-stage-icon">
      {stage === 0 ? (
        <>
          <path d="M0 18V-16M0 0Q-26-20-22-4Q-12 9 0 5M0-6Q24-27 23-10Q12 1 0 0" />
          <circle cx={0} cy={-18} r={5} />
        </>
      ) : stage === 1 ? (
        <>
          <path d="M-25 20V-6L-8-17V-6L8-17V20Z M11 20V-23H22V20Z M-18 5H-11V12H-18Z M-3 5H4V12H-3Z" />
        </>
      ) : stage === 2 ? (
        <>
          <path d="M-26 12V-14H7V12Z M7-8H18L27 2V12H7" />
          <circle cx={-14} cy={16} r={6} />
          <circle cx={16} cy={16} r={6} />
        </>
      ) : stage === 3 ? (
        <>
          <rect x={-25} y={-19} width={50} height={34} rx={3} />
          <path d="M-10-8L-18-2L-10 4M10-8L18-2L10 4M3-11L-3 8M-12 22H12M0 15V22" />
        </>
      ) : (
        <>
          <path d="M0-22V-8M0 8V24M-24 0H-8M8 0H24M-8 8L8-8" />
          <circle r={10} />
        </>
      )}
    </g>
  );
}
function Economy() {
  const [s, set] = useExploration("forge018-geo-ekonomik-faaliyetler", {
    chain: "cotton",
    stage: 0,
    five: true,
    machine: false,
  });
  const m = economy018(
    s.chain,
    Math.round(clamp(s.stage, 0, 4)),
    s.five,
    s.machine,
  );
  return (
    <>
      <h3>İşin çıktısını bul</h3>
      <p>
        Aynı ürünün beş aşamasını seç. Hangi iş yapılıyor? Sonra sınıf sayısını
        ve ilk aşamanın makine koşulunu değiştir.
      </p>
      <Choice
        label="Üretim zinciri"
        value={s.chain}
        options={choices(economicChains018)}
        onChange={(chain) => set({ chain })}
      />
      <Choice
        label="İncelenen iş"
        value={String(m.stage)}
        options={m.tasks.map((t, i) => [String(i), t] as const)}
        onChange={(stage) => set({ stage: Number(stage) })}
      />
      <Check
        label="Beşli ders ayrımı"
        checked={s.five}
        onChange={(five) => set({ five })}
      />
      <Check
        label="İlk aşamada makine"
        checked={s.machine}
        onChange={(machine) => set({ machine })}
      />
      <figure>
        <Diagram
          title="Üretim zincirinde beş farklı işlev"
          description={m.tasks
            .map((t, i) => `${i + 1}: ${t}, beşli ayrımda ${sectorNames[i]}`)
            .join("; ")}
          height={440}
        >
          {m.tasks.map((_, i) => {
            const y = 48 + i * 83;
            return (
              <g key={i}>
                {i < 4 && (
                  <path className="g018-flow" d={`M70 ${y + 31}V${y + 50}`} />
                )}
                <circle
                  cx={70}
                  cy={y}
                  r={31}
                  className={i === m.stage ? "g018-active-node" : "g018-node"}
                />
                <StageIcon stage={i} x={70} y={y} />
                <text x={215} y={y - 2}>
                  {i + 1}. iş · {sectorNames[i]}
                </text>
                <text x={215} y={y + 23}>
                  {fmt(m.workers[i], 0)} çalışan
                </text>
              </g>
            );
          })}
          <text x={220} y={432}>
            Oklar iş sırası; miktar veya kişi göçü değil
          </text>
        </Diagram>
        <figcaption>
          Bu beş aşama ders zinciridir. Her üretimde tüm işlerin aynı sıra ve
          kurumda olması gerekmez.
        </figcaption>
      </figure>
      <div className="g018-result" data-model-result>
        <strong>
          {readable(m.name)} · {sectorNames[m.sector - 1]}
        </strong>
        <p>
          İş: {m.task}. {m.five ? "Beşli" : "Üçlü"} ayrım açık; son üç iş üçlü
          ayrımda hizmet içinde toplanır.
        </p>
        <p>
          Toplam {fmt(m.total, 0)} çalışan; seçilen iş{" "}
          {fmt(m.workers[m.stage], 0)} kişi, pay %{fmt(m.employment)}. Değer
          payı %{fmt(m.valueShare)}; bu iki payın paydası farklıdır.
        </p>
      </div>
      <Facts
        items={m.tasks.map(
          (t, i) =>
            [
              `${i + 1}. iş`,
              `${t}: ${fmt(m.workers[i], 0)} çalışan; ${fmt(m.value[i], 0)} özgün değer birimi`,
            ] as const,
        )}
      />
      <figure>
        <Diagram
          title="Seçilen işin çalışan payı ve değer payı"
          description={`Çalışan payı ${fmt(m.employment)}%; katma değer payı ${fmt(m.valueShare)}%. Yatay ortak yüzde ölçeği, paydalar farklı.`}
          height={230}
        >
          <text x={220} y={24}>
            Aynı yüzde ölçeği, ayrı paydalar
          </text>
          <text x={80} y={58}>
            Çalışan
          </text>
          <rect
            x={70}
            y={72}
            width={m.employment * 3}
            height={30}
            className="g018-selected-bar"
          />
          <text x={80} y={135}>
            Değer
          </text>
          <rect
            x={70}
            y={148}
            width={m.valueShare * 3}
            height={30}
            className="g018-female-bar"
          />
          <path className="g018-axis" d="M70 195H370" />
          {[0, 50, 100].map((n) => (
            <g key={n}>
              <path className="g018-tick-line" d={`M${70 + n * 3} 195v6`} />
              <text x={70 + n * 3} y={223}>
                {n}%
              </text>
            </g>
          ))}
        </Diagram>
        <figcaption>
          Çalışan paydası {fmt(m.total, 0)} kişi, değer paydası{" "}
          {fmt(m.totalValue)} özgün birimdir. Çubukların aynı olması gerekmez.
        </figcaption>
      </figure>
      <Facts
        items={m.groups.map(
          (n, i) =>
            [
              `${i + 1}. ana grup`,
              `${fmt(n, 0)} çalışan; %${fmt(m.shares[i])}`,
            ] as const,
        )}
      />
      <p className="g018-help">{readable(m.limit)}</p>
      <Prediction
        id="ekonomik-faaliyetler"
        signature={`${s.chain}/${m.stage}/${s.five}/${s.machine}`}
        expected="different"
        options={[
          ["different", "Paydalar farklı"],
          ["equal", "İki pay zorunlu eşit"],
          ["wage", "Ücret buradan belli"],
        ]}
        explanation="Çalışan payı kişi sayısını, değer payı katkı birimlerini oranlar. Bir işin çalışan yüzdesi aynı gelir payını veya kişisel ücreti zorunlu kılmaz."
      />
    </>
  );
}
export default function Forge018GeographyLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const content =
    lessonId === "dunya-nufus-dagilisi" ? (
      <World />
    ) : lessonId === "nufus-piramitleri" ? (
      <Pyramid />
    ) : lessonId === "turkiye-nufusu" ? (
      <Turkey />
    ) : lessonId === "dunya-turkiye-gocler" ? (
      <Migration />
    ) : lessonId === "ekonomik-faaliyetler" ? (
      <Economy />
    ) : null;
  if (!content) return null;
  return (
    <section className="forge018-geography-lab" data-forge018={lessonId}>
      {content}
      <p className="g018-help">
        Bu keşif öğrenme puanı veya soru doğrusu kaydetmez. Bağımsız çözüm için
        Sorular’a geç.
      </p>
    </section>
  );
}
