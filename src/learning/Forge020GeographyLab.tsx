import { useId, useState, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  earth020,
  seasons020,
  position020,
  positionContexts020,
  map020,
  mapScales020,
  mapZooms020,
  contourIntervals020,
} from "./forge020Geography";
import "./forge020Geography.css";
const fmt = (n: number, d = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: d }).format(n);
const clamp = (n: number, a: number, b: number) =>
  Number.isFinite(n) ? Math.min(b, Math.max(a, n)) : a;
const safeKey = (m: object, k: string, fallback: string) =>
  Object.hasOwn(m, k) ? k : fallback;
const readable = (s: string) => {
  const pairs: readonly (readonly [string, string])[] = [
    ["Haziran gündönümü", "Haziran dönüm günü"],
    ["Aralık gündönümü", "Aralık dönüm günü"],
    ["deklinasyon", "dik ışın enlemi"],
    ["beklenebilir", "olabilir"],
    ["Ekvator’daki", "Ekvator için"],
  ];
  let out = s.replace(/(?<=\p{L})–(?=\p{L})/gu, " – ");
  for (const [a, b] of pairs) out = out.replaceAll(a, b);
  return out;
};
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
      className="g020-diagram"
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
    <div className="g020-control">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([k, t]) => (
          <option key={k} value={k}>
            {readable(t)}
          </option>
        ))}
      </select>
      <output className="g020-selected" htmlFor={id}>
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
    onChange(clamp(Number(n.toFixed(8)), min, max));
  };
  return (
    <div className="g020-control">
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
    <label className="g020-check">
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
    [s, set] = useExploration(`forge020-geo-predict-${id}`, {
      answer: "",
      reason: "",
      checkedFor: "",
    });
  const valid = options.some(([v]) => v === s.answer),
    checked =
      s.checkedFor === signature && valid && s.reason.trim().length >= 8;
  return (
    <div className="g020-prediction">
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
      <p className="g020-help">
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
        <div className="g020-feedback" data-prediction-feedback role="status">
          <strong>
            {s.answer === expected
              ? "Seçimin kanıtla uyumlu."
              : "Seçimini kanıtla yeniden düşün."}
          </strong>
          <p>{readable(explanation)}</p>
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
    <dl className="g020-facts">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
function Earth() {
  const [s, set] = useExploration("forge020-geo-earth", {
      latitude: 40,
      season: "june",
      tilted: true,
      rod: 2,
    }),
    season = safeKey(seasons020, s.season, "june"),
    m = earth020(
      clamp(s.latitude, -80, 80),
      season,
      s.tilted,
      clamp(s.rod, 0.5, 3),
    ),
    scale = Math.min(
      60,
      150 / m.rod,
      m.shadow === null || m.shadow === 0 ? 60 : 115 / m.shadow,
    ),
    rodPixels = m.rod * scale,
    sign = m.sunDirection === "Güney" ? 1 : -1,
    shadowPixels = (m.shadow ?? 0) * scale,
    tipY = 230 - rodPixels,
    alpha = (m.altitude * Math.PI) / 180,
    sunX = 150 - sign * Math.cos(alpha) * 65,
    sunY = tipY - Math.sin(alpha) * 65,
    expected =
      m.daylight === 0
        ? "night"
        : m.daylight === 24
          ? "day"
          : m.daylight > 12.001
            ? "long"
            : m.daylight < 11.999
              ? "short"
              : "equal";
  return (
    <>
      <h3>Aynı yerde farklı mevsim</h3>
      <p>
        Enlemi ve yılın dönemini seç. Sonra eğikliği kapatıp karşılaştır. Öğle
        açısı, gündüz süresi ve gölge farklı ölçülerdir; sıcaklık sayısı bu
        modelden çıkmaz.
      </p>
      <div className="g020-controls">
        <Choice
          label="Yılın dönemi"
          value={season}
          options={choices(seasons020)}
          onChange={(season) => set({ season })}
        />
        <Range
          label="Enlem (°)"
          value={m.latitude}
          min={-80}
          max={80}
          step={0.5}
          onChange={(latitude) => set({ latitude })}
        />
        <Range
          label="Çubuk boyu (m)"
          value={m.rod}
          min={0.5}
          max={3}
          step={0.1}
          onChange={(rod) => set({ rod })}
        />
      </div>
      <Check
        label="23,5° eksen eğikliği açık"
        checked={s.tilted}
        onChange={(tilted) => set({ tilted })}
      />
      <figure>
        <Diagram
          height={295}
          title="İdeal öğle ışını ve dik çubuk"
          description={`Enlem ${fmt(m.latitude)} derece, dik ışın enlemi ${fmt(m.declination)} derece. Öğle yüksekliği ${fmt(m.altitude)} derece. Gölge ${m.shadow === null ? "tanımsız" : fmt(m.shadow) + " metre"}. Güney solda, kuzey sağda; bütün metreler aynı çizim oranını kullanır.`}
        >
          <path className="g020-ground" d="M 20 230 H 280 V 250 H 20 Z" />
          <path className="g020-rod" d={`M150 230V${tipY}`} />
          {m.shadow !== null ? (
            <>
              <path
                className="g020-shadow"
                d={`M150 230H${150 + sign * shadowPixels}`}
              />
              <circle className="g020-sun" cx={sunX} cy={sunY} r={10} />
              <path
                className="g020-ray"
                d={`M${sunX} ${sunY}L150 ${tipY}L${150 + sign * shadowPixels} 230`}
              />
            </>
          ) : (
            <text x={150} y={65}>
              Güneş ufuk altında
            </text>
          )}
          <text x={30} y={280}>
            G
          </text>
          <text x={270} y={280}>
            K
          </text>
        </Diagram>
        <figcaption>
          G: güney; K: kuzey. Yatay zemin ve dik çubuk. Uzun gölgeyi sığdırmak
          için bütün metreler birlikte küçülür; şekil gerçek ufuk ölçümü
          değildir.
        </figcaption>
      </figure>
      <figure>
        <Diagram
          height={145}
          title="24 saatin gündüz ve gece payı"
          description={`${fmt(m.daylight)} saat gündüz, ${fmt(m.night)} saat gece.0–24saat ekseni aynı uzunlukta kalır.`}
        >
          <rect className="g020-night" x={30} y={25} width={240} height={40} />
          <rect
            className="g020-day"
            x={30}
            y={25}
            width={(240 * m.daylight) / 24}
            height={40}
          />
          {[0, 12, 24].map((h) => (
            <g key={h}>
              <path className="g020-axis" d={`M${30 + h * 10} 70V80`} />
              <text x={30 + h * 10} y={106}>
                {h}
              </text>
            </g>
          ))}
          <text x={150} y={140}>
            Saat
          </text>
        </Diagram>
        <figcaption>
          Renkli pay gündüz; boş pay gece. İdeal ufuk ve noktasal Güneş
          kullanılır.
        </figcaption>
      </figure>
      <div className="g020-result" data-model-result>
        <strong>Gündüz {fmt(m.daylight)} saat</strong>
        <Facts
          items={[
            ["Gece", `${fmt(m.night)} saat`],
            ["Öğle yüksekliği", `${fmt(m.altitude)}°`],
            ["Güneş’in dik geldiği enlem", `${fmt(m.declination)}°`],
            ["Öğle yönü", m.sunDirection],
            [
              "Gölge",
              m.shadow === null
                ? "Ufuk üstü Güneş yok"
                : `${fmt(m.shadow, 3)} m`,
            ],
          ]}
        />
        <p>
          90° − |{fmt(m.latitude)}° − ({fmt(m.declination)}°)| ={" "}
          {fmt(m.altitude)}°.{" "}
          {m.shadow === null
            ? "Görünür Güneş gölgesi yok."
            : m.shadow === 0
              ? "Güneş başucunda; ideal gölge sıfır."
              : `Gölge = ${fmt(m.rod)} / tan(${fmt(m.altitude)}°).`}
        </p>
      </div>
      <p>
        {s.tilted
          ? readable(m.period)
          : "Eğiklik kapalı: dik ışın enlemi yılın bütün dönemlerinde 0°. Günlük dönüş sürer."}
      </p>
      <p className="g020-help">
        Kırılma, Güneş diskinin genişliği ve ufuk engeli yok. Dört dik ışın
        enlemi yaklaşık ders değeridir; gerçek yılın kesin ölçümü değildir.
        Enlemde kuzey artı, güney eksi; açı derece, süre saat, boy metre.
      </p>
      <Prediction
        id="earth"
        signature={JSON.stringify([m.latitude, season, m.tilted, m.rod])}
        expected={expected}
        options={[
          ["night", "24 saat gece"],
          ["short", "Gündüz 12 saatten kısa"],
          ["equal", "Gündüz ve gece eşit"],
          ["long", "Gündüz 12 saatten uzun"],
          ["day", "24 saat gündüz"],
        ]}
        explanation={`Enlem ${fmt(m.latitude)}°, dik ışın enlemi ${fmt(m.declination)}°. Gündüz ${fmt(m.daylight)} saat, gece ${fmt(m.night)} saat. Gün içi dönüş ile yıllık yönelim farklı etkileri açıklar.`}
      />
    </>
  );
}
function Position() {
  const [s, set] = useExploration("forge020-geo-position", {
      latitude: 40,
      longitude: 30,
      context: "coast",
      anti: false,
    }),
    context = safeKey(positionContexts020, s.context, "coast"),
    m = position020(
      clamp(s.latitude, -80, 80),
      clamp(s.longitude, -180, 180),
      context,
    ),
    x = 45 + ((m.longitude + 180) / 360) * 210,
    y = 45 + ((80 - m.latitude) / 160) * 200,
    ax = 45 + ((m.antimeridian + 180) / 360) * 210,
    expected =
      m.zenithPasses === 0 ? "none" : m.zenithPasses === 1 ? "one" : "two";
  return (
    <>
      <h3>Koordinat sabit, çevre koşulu ayrı</h3>
      <p>
        X bir gerçek şehir ölçümü değil. Önce enlem ve boylamı değiştir; sonra
        aynı koordinatı koruyup alternatif çevre sahnesini seç. Harita
        geometrisi tek başına gerçek iklim tipini vermez.
      </p>
      <div className="g020-controls">
        <Range
          label="Enlem (°)"
          value={m.latitude}
          min={-80}
          max={80}
          step={0.5}
          onChange={(latitude) => set({ latitude })}
        />
        <Range
          label="Boylam (°)"
          value={m.longitude}
          min={-180}
          max={180}
          step={5}
          onChange={(longitude) => set({ longitude })}
        />
        <Choice
          label="Çevre sahnesi"
          value={context}
          options={choices(positionContexts020)}
          onChange={(context) => set({ context })}
        />
      </div>
      <Check
        label="Karşı meridyeni göster"
        checked={s.anti}
        onChange={(anti) => set({ anti })}
      />
      <figure>
        <Diagram
          height={295}
          title="Enlem-boylam ızgarası"
          description={`X noktası enlem ${fmt(m.latitude)},boylam ${fmt(m.longitude)}. Ekvator yatay, Greenwich düşey. Karşı meridyen ${fmt(m.antimeridian)} derece. Izgara gerçek alan koruyan dünya haritası değildir.`}
        >
          <rect className="g020-cell" x={45} y={45} width={210} height={200} />
          {[-60, -30, 0, 30, 60].map((lat) => (
            <path
              key={lat}
              className={lat === 0 ? "g020-equator" : "g020-grid"}
              d={`M45 ${45 + ((80 - lat) / 160) * 200}H255`}
            />
          ))}
          {[-180, -120, -60, 0, 60, 120, 180].map((lon) => (
            <path
              key={lon}
              className={lon === 0 ? "g020-prime" : "g020-grid"}
              d={`M${45 + ((lon + 180) / 360) * 210} 45V245`}
            />
          ))}
          <path className="g020-selected-line" d={`M45 ${y}H255M${x} 45V245`} />
          {s.anti && (
            <>
              <path className="g020-anti" d={`M${ax} 45V245`} />
              <circle className="g020-anti-node" cx={ax} cy={y} r={13} />
              <text x={ax} y={y + 7}>
                Q
              </text>
            </>
          )}
          <circle className="g020-node" cx={x} cy={y} r={13} />
          <text x={x} y={y + 7}>
            X
          </text>
          <text x={150} y={25}>
            K
          </text>
          <text x={150} y={282}>
            G
          </text>
          <text x={20} y={152}>
            B
          </text>
          <text x={280} y={152}>
            D
          </text>
        </Diagram>
        <figcaption>
          K/G kuzey ve güney; B/D batı ve doğu. Orta yatay çizgi Ekvator, kesik
          düşey Greenwich. Q seçilirse karşı yarım meridyenin aynı enlemdeki
          örnek noktasıdır; aynı yer değildir.
        </figcaption>
      </figure>
      <div className="g020-result" data-model-result>
        <strong>{m.zone}</strong>
        <Facts
          items={[
            ["Enlem", `${fmt(m.latitude)}° — ${m.latitudeSide}`],
            ["Boylam", `${fmt(m.longitude)}° — ${m.longitudeSide}`],
            ["Karşı meridyen", `${fmt(m.antimeridian)}°`],
            ["Bir yılda dik öğle ışını", `${m.zenithPasses} geçiş`],
            ["Ekvator’a meridyen yayı", `${fmt(m.meridianKm)} km`],
            ["Bu paralelde 1° boylam", `${fmt(m.parallelKmPerDegree)} km`],
            ["Ekinoks öğle açısı", `${fmt(m.equinoxNoon)}°`],
            ["Çizgisel dönüş hızı", `${fmt(m.rotationSpeed)} km/saat`],
          ]}
        />
        <p>
          111 × cos({fmt(m.latitude)}°) = {fmt(m.parallelKmPerDegree)} km.
          Ekvator yayı ≈ 111 × |{fmt(m.latitude)}|. 1670 × cos(enlem) dönüş için
          yaklaşık km/saat verir.
        </p>
      </div>
      <figure>
        <Diagram
          height={285}
          title={`${m.name}: alternatif çevre kesiti`}
          description={`${m.nearSea ? "Deniz yakın" : "İç alan"},${m.barrier ? "dağ engeli var" : "verilmiş dağ engeli yok"},yükseklik ${m.height} metre. Arazi şeması coğrafi koordinat haritası değildir.`}
        >
          {m.nearSea && (
            <rect className="g020-sea" x={20} y={220} width={70} height={45} />
          )}
          <path
            className="g020-ground"
            d={
              context === "plateau"
                ? "M 20 135 H 280 V 265 H 20 Z"
                : m.barrier
                  ? "M 90 220 L 155 90 L 210 220 H 280 V 265 H 90 Z"
                  : "M 90 220 H 280 V 265 H 90 Z"
            }
          />
          {m.nearSea && (
            <path
              className="g020-air"
              d={m.barrier ? "M 30 175 H 120" : "M 30 175 H 245"}
            />
          )}
          <path
            className="g020-post"
            d={`M260 ${context === "plateau" ? 135 : 220}v-30`}
          />
          <text x={260} y={context === "plateau" ? 90 : 175}>
            X
          </text>
          <text x={65} y={context === "plateau" ? 235 : 252}>
            {m.nearSea ? "Deniz" : "İç alan"}
          </text>
        </Diagram>
        <figcaption>
          Alternatif ders sahnesi. Çizimdeki yükseklik ölçekli değildir; verilen
          yükselti {fmt(m.height)} m. Rüzgâr çizgisi yalnız denizden içeri hava
          bağını örnekler, gerçek rüzgâr ölçümü değildir.
        </figcaption>
      </figure>
      <h4>{readable(m.name)}</h4>
      <p>{readable(m.proof)}</p>
      <p className="g020-help">
        Bu model yaklaşık 111 km/° ve Ekvator için 1670 km/saat kullanır. X’in
        gerçek sıcaklık, yağış veya ürün verisi yok. Bağlam değişince koordinat
        geometriyi aynı bırakır; yalnız belirtilen çevre varsayımı değişir.
      </p>
      <Prediction
        id="position"
        signature={JSON.stringify([m.latitude, m.longitude, context, s.anti])}
        expected={expected}
        options={[
          ["none", "Dik öğle ışını ulaşmaz"],
          ["one", "Yılda 1 geçiş"],
          ["two", "Yılda 2 geçiş"],
        ]}
        explanation={`Mutlak enlem ${fmt(Math.abs(m.latitude))}°. Yaklaşık23,5° sınırıyla geometrik kural kullanılır; çevre sahnesi bu açısal sınırı değiştirmez. Geçiş sayısı ${m.zenithPasses}.`}
      />
    </>
  );
}
function MapLab() {
  const [s, set] = useExploration("forge020-geo-map", {
      denominator: 100000,
      zoom: 1,
      paperCm: 4,
      rise: 120,
      interval: 20,
    }),
    denominator = (mapScales020 as readonly number[]).includes(s.denominator)
      ? s.denominator
      : 100000,
    zoom = (mapZooms020 as readonly number[]).includes(s.zoom) ? s.zoom : 1,
    interval = (contourIntervals020 as readonly number[]).includes(s.interval)
      ? s.interval
      : 20,
    m = map020(
      denominator,
      zoom,
      clamp(s.paperCm, 1, 8),
      clamp(s.rise, 20, 400),
      interval,
    ),
    width = 110 * m.zoom,
    left = 150 - width / 2,
    expected = m.zoom < 1 ? "larger" : m.zoom > 1 ? "smaller" : "same";
  return (
    <>
      <h3>Aynı arazi, farklı kâğıt boyutu</h3>
      <p>
        Özgün kare alanın yamaç kotu solda 100 m’den sağa doğru doğrusal
        yükselir. Boyutu seç, aynı arazinin yeni ölçeğini gör; sonra kot
        çizgilerini profille karşılaştır.
      </p>
      <div className="g020-controls">
        <Choice
          label="Başlangıç ölçeği"
          value={String(m.denominator)}
          options={mapScales020.map(
            (n) => [String(n), `1 : ${fmt(n, 0)}`] as const,
          )}
          onChange={(denominator) => set({ denominator: Number(denominator) })}
        />
        <Choice
          label="Boyut çarpanı"
          value={String(m.zoom)}
          options={mapZooms020.map(
            (q) => [String(q), `${fmt(q)} kat`] as const,
          )}
          onChange={(zoom) => set({ zoom: Number(zoom) })}
        />
        <Range
          label="İlk kâğıt kenarı (cm)"
          value={m.paperCm}
          min={1}
          max={8}
          step={0.1}
          onChange={(paperCm) => set({ paperCm })}
        />
        <Range
          label="Kot farkı (m)"
          value={m.rise}
          min={20}
          max={400}
          step={20}
          onChange={(rise) => set({ rise })}
        />
        <Choice
          label="Eş kot aralığı (m)"
          value={String(m.interval)}
          options={contourIntervals020.map(
            (n) => [String(n), `${n} m`] as const,
          )}
          onChange={(interval) => set({ interval: Number(interval) })}
        />
      </div>
      <figure>
        <Diagram
          height={330}
          title="Boyutla birlikte değişen kare harita ve çizgi ölçek"
          description={`İlk kenar ${fmt(m.paperCm)} cm, yeni ${fmt(m.shownCm)} cm. Çizgi ölçek haritayla aynı çarpanla büyür. Konturlar aynı sabit arazi kotlarıdır; bu ekranda cetvel ölçümü yapılmaz.`}
        >
          <rect
            className="g020-original-paper"
            x={95}
            y={95}
            width={110}
            height={110}
          />
          <rect
            className="g020-paper"
            x={left}
            y={150 - width / 2}
            width={width}
            height={width}
          />
          {m.contours.map((c) => (
            <path
              key={c.height}
              className="g020-contour"
              d={`M${left + c.fraction * width} ${150 - width / 2}v${width}`}
            />
          ))}
          <path
            className="g020-section-line"
            d={`M${left} 150H${left + width}`}
          />
          <text x={left - 12} y={158}>
            A
          </text>
          <text x={left + width + 12} y={158}>
            B
          </text>
          <path
            className="g020-scale-line"
            d={`M${left} 285H${left + width}M${left} 278V292M${left + width} 278V292`}
          />
          <text x={150} y={320}>
            {fmt(m.groundKm)} km
          </text>
        </Diagram>
        <figcaption>
          Kesik kare ilk boyut, düz kare seçili boyut. A–B boyunca eş kotlar;
          çizgi ölçek aynı boyut çarpanını izler. Kâğıt cm değeri sayısaldır,
          ekran cetveli değildir.
        </figcaption>
      </figure>
      <figure>
        <Diagram
          height={345}
          title="A–B doğrusal yamaç profili"
          description={`A${m.base}m,B${m.top}m; yatay${fmt(m.groundKm)} km. Eş kot kesişimleri planla aynı kesirli yerlerdedir. Eksen ölçekleri farklıdır.`}
        >
          {[100, 300, 500].map((h) => (
            <g key={h}>
              <path
                className="g020-grid"
                d={`M55 ${250 - (h - 100) * 0.4}H275`}
              />
              <text className="g020-axis-text" x={49} y={258 - (h - 100) * 0.4}>
                {h}
              </text>
            </g>
          ))}
          <path
            className="g020-profile"
            d={`M55 250L275 ${250 - m.rise * 0.4}`}
          />
          {m.contours.map((c) => (
            <circle
              className="g020-contour-point"
              key={c.height}
              cx={55 + c.fraction * 220}
              cy={250 - (c.height - 100) * 0.4}
              r={3}
            />
          ))}
          <path className="g020-axis" d="M 55 70 V 260 H 275" />
          <text x={150} y={35}>
            Kot (m)
          </text>
          {[0, 0.5, 1].map((f) => (
            <g key={f}>
              <path className="g020-axis" d={`M${55 + f * 220} 260V268`} />
              <text x={55 + f * 220} y={293}>
                {fmt(f * m.groundKm)}
              </text>
            </g>
          ))}
          <text x={150} y={330}>
            Yatay km
          </text>
        </Diagram>
        <figcaption>
          Yatay ve düşey çizim ölçeği aynı değil. Düşey / yatay oranı{" "}
          {fmt(m.verticalRatio)}; görünür açı gerçek yamaç açısı diye okunmaz.
        </figcaption>
      </figure>
      <div className="g020-result" data-model-result>
        <strong>Yeni ölçek 1 : {fmt(m.effectiveDenominator, 2)}</strong>
        <Facts
          items={[
            ["Gerçek yatay kenar", `${fmt(m.groundKm)} km`],
            ["Yeni kâğıt kenarı", `${fmt(m.shownCm)} cm`],
            ["Yeni kâğıt alanı", `${fmt(m.shownArea)} cm²`],
            ["İz düşüm gerçek alan", `${fmt(m.groundArea)} km²`],
            [
              "Ortalama eğim",
              `%${fmt(m.slopePercent)}; ${fmt(m.slopePerMille)}‰`,
            ],
            ["A ve B kotları", `${m.base} m; ${m.top} m`],
          ]}
        />
        <p>
          Yeni payda = {fmt(m.denominator)} / {fmt(m.zoom)}. Yatay mesafe ={" "}
          {fmt(m.paperCm)} × {fmt(m.denominator)} /100.000 km. Eğim ={" "}
          {fmt(m.rise)} / {fmt(m.groundMetres)} ×100.
        </p>
      </div>
      <details>
        <summary>Eş kotların bütün kesişimleri</summary>
        <ul className="g020-data-list">
          {m.contours.map((c) => (
            <li key={c.height}>
              Kot {c.height} m — A’dan yatay {fmt(c.xMetres)} m.
            </li>
          ))}
        </ul>
        <p>
          A–B arası doğrusal yükseliş açık bir kabuldür; gerçek arazi eğrileri
          ölçülmüş değildir.
        </p>
      </details>
      <p className="g020-help">
        Eş oranlı büyütme yeni veri üretmez. Boyut değişince arazinin kotu ve
        gerçek alanı sabit kalır. Kontur aralığı değişirse farklı çizgiler
        seçilir, yamaç değişmez. Çizim, kâğıt cetveli değildir.
      </p>
      <Prediction
        id="map"
        signature={JSON.stringify([
          m.denominator,
          m.zoom,
          m.paperCm,
          m.rise,
          m.interval,
        ])}
        expected={expected}
        options={[
          ["larger", "Yeni payda daha büyük"],
          ["same", "Payda aynı"],
          ["smaller", "Yeni payda daha küçük"],
        ]}
        explanation={`Boyut çarpanı ${fmt(m.zoom)}; yeni N = ${fmt(m.denominator)}/${fmt(m.zoom)}=${fmt(m.effectiveDenominator)}. Gerçek kenar ${fmt(m.groundKm)} km ve kot farkı ${m.rise} m boyut değişimiyle aynı kalır.`}
      />
    </>
  );
}
export default function Forge020GeographyLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const models: Record<string, () => ReactNode> = {
      "dunya-sekli-hareket": Earth,
      "cografi-konum": Position,
      "harita-bilgisi": MapLab,
    },
    Model = Object.hasOwn(models, lessonId) ? models[lessonId] : null;
  return Model ? (
    <section className="forge020-geography-lab" data-forge020={lessonId}>
      <Model />
      <p className="g020-help">
        Keşif puan veya ustalık kaydı üretmez. Bağımsız çözümünü Sorular
        bölümünde kaydet.
      </p>
    </section>
  ) : null;
}
