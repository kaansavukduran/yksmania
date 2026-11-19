import { useId, useState, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  climate015Profiles,
  climate015State,
  geography015Months,
  turkey015Stations,
  turkey015State,
  tectonic015Layers,
  tectonic015Boundaries,
  tectonic015State,
  internal015Modes,
  internal015State,
} from "./forge015Geography";
import "./forge015Geography.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

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
      className="g015-diagram"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby={`${uid}-title ${uid}-desc`}
    >
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
    <div className="g015-control">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </ChoiceSelect>
      <output className="g015-selected" htmlFor={id}>
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
    <div className="g015-control">
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
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="g015-check">
      <input
        type="checkbox"
        checked={value}
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
  const uid = useId();
  const [s, set] = useExploration(`forge015-geo-prediction-${id}`, {
    answer: "",
    reason: "",
    checkedFor: "",
  });
  const valid = options.some(([v]) => v === s.answer),
    checked =
      s.checkedFor === signature && valid && s.reason.trim().length >= 8;
  return (
    <div className="g015-prediction">
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
      <p className="g015-help">
        En az 8 karakterle hangi veriyi kullandığını açıkla. Sonra tahminini
        kanıtla karşılaştır.
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
        <div className="g015-feedback" role="status" data-prediction-feedback>
          <strong>
            {s.answer === expected
              ? "Seçimin kanıtla uyumlu."
              : "Kanıtı yeniden izle."}
          </strong>
          <p>{explanation}</p>
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
    <section className="forge015-geography-lab" data-forge015={id}>
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="g015-help">
        Bu keşifler ve tahminler ayrı kaydedilir; XP, ustalık veya konu
        tamamlanması oluşturmaz. Bağımsız çözümler Sorular bölümündedir.
      </p>
    </section>
  );
}
function Months({
  temperatures,
  rain,
}: {
  temperatures: readonly number[];
  rain: readonly number[];
}) {
  return (
    <dl
      className="g015-months"
      aria-label="On iki aylık temsili sıcaklık ve yağış verileri"
    >
      {geography015Months.map((m, i) => (
        <div key={m}>
          <dt>{m}</dt>
          <dd>
            {fmt(temperatures[i])} °C · {fmt(rain[i])} mm
          </dd>
        </div>
      ))}
    </dl>
  );
}
function ClimateGraph({
  temperatures,
  rain,
  month,
}: {
  temperatures: readonly number[];
  rain: readonly number[];
  month: number;
}) {
  const x = (i: number) => 55 + 26 * i,
    t = (v: number) => 240 - (v + 40) * 2.5,
    p = (v: number) => 240 - v * 0.4;
  return (
    <Diagram
      title="On iki aylık klimograf"
      description="Sütunlar aylık toplam yağışı mm, çizgi aylık ortalama sıcaklığı °C gösterir. Ayların adları ve tüm değerler şeklin altındaki HTML listesinde bulunur. İki düşey ölçek birbirinden bağımsızdır."
      height={300}
      width={420}
    >
      <path className="g015-line" d="M42 40V240H364V40" />
      {[-40, -20, 0, 20, 40].map((v) => (
        <g key={v}>
          <path className="g015-gridline" d={`M42 ${t(v)}H364`} />
          <text className="g015-tick" x={34} y={t(v) + 6} textAnchor="end">
            {v}
          </text>
        </g>
      ))}
      {[0, 100, 200, 300, 400, 500].map((v) => (
        <text className="g015-tick" key={v} x={372} y={p(v) + 6}>
          {v}
        </text>
      ))}
      <text className="g015-tick" x={7} y={23}>
        °C
      </text>
      <text className="g015-tick" x={369} y={23}>
        mm
      </text>
      {rain.map((v, i) => (
        <g key={i}>
          <rect
            data-rain-month={i}
            className={i === month ? "g015-bar g015-bar-selected" : "g015-bar"}
            x={x(i) - 7}
            y={p(v)}
            width={14}
            height={v * 0.4}
          />
          <text className="g015-tick" x={x(i)} y={267} textAnchor="middle">
            {i + 1}
          </text>
        </g>
      ))}
      <polyline
        className="g015-accent-line"
        points={temperatures.map((v, i) => `${x(i)},${t(v)}`).join(" ")}
      />
      {temperatures.map((v, i) => (
        <circle
          key={i}
          cx={x(i)}
          cy={t(v)}
          r={i === month ? 5 : 2}
          className="g015-dot"
        />
      ))}
      <text className="g015-tick" x={203} y={294} textAnchor="middle">
        Ay sırası: 1–12
      </text>
    </Diagram>
  );
}
function RegionMap({
  latitude,
  longitude,
  region,
}: {
  latitude: number;
  longitude: number;
  region: string;
}) {
  const x = 200 + longitude,
    y = 112 - latitude;
  return (
    <figure>
      <Diagram
        title="Temsili bölgenin yaklaşık dünya konumu"
        description={`${region}: yaklaşık ${Math.abs(latitude)} derece ${latitude >= 0 ? "kuzey" : "güney"}. Nokta iklimin tamamının dağılış sınırını değil, bir genel bölgeyi işaretler.`}
        height={220}
      >
        <rect
          className="g015-land"
          x={20}
          y={22}
          width={360}
          height={180}
          rx={35}
        />
        {[-60, -30, 0, 30, 60].map((v) => (
          <g key={v}>
            <path className="g015-gridline" d={`M20 ${112 - v}H380`} />
            <text className="g015-tick" x={26} y={106 - v}>
              {v === 0 ? "0°" : `${Math.abs(v)}°${v > 0 ? "K" : "G"}`}
            </text>
          </g>
        ))}
        <path
          className="g015-continent"
          d="M64 51L108 35L151 61L130 99L108 112L108 143L135 172L112 194L90 155L88 103L54 86ZM173 60L196 40L238 37L254 60L299 43L345 67L328 97L279 102L259 134L225 113L215 159L193 173L177 132L188 98L167 85ZM305 157L332 146L350 169L339 185L311 181Z"
        />
        <circle className="g015-map-ring" cx={x} cy={y} r={12} />
        <circle className="g015-dot" cx={x} cy={y} r={5} />
      </Diagram>
      <figcaption>
        {region}. Dünya çizimi şematiktir; nokta genel bağlamı gösterir, kesin
        iklim dağılış haritası değildir. İklim yalnız enlemden belirlenmez.
      </figcaption>
    </figure>
  );
}
function ClimateLab() {
  const id = "buyuk-iklim-tipleri";
  const [s, set] = useExploration(`forge015-geo-${id}`, {
    profile: "mediterranean",
    hemisphere: "north",
    month: 6,
  });
  const profile = climate015Profiles.some((x) => x.id === s.profile)
      ? s.profile
      : "mediterranean",
    hemisphere = s.hemisphere === "south" ? "south" : "north",
    month = Math.round(clamp(s.month, 0, 11)),
    r = climate015State(profile, hemisphere, month);
  const expected =
      r.summerRain === r.winterRain
        ? "equal"
        : r.summerRain > r.winterRain
          ? "summer"
          : "winter",
    signature = `${profile}:${hemisphere}`;
  return (
    <Frame
      id={id}
      title="Ayları çevir, iklim izini gör"
      intro="Özgün temsili diziyi seç; sıcaklık ve yağışı ayrı eksenlerden oku. Bir ayı işaretle, yıllık toplam ile mevsimlik dağılımı karşılaştır. Bunlar gerçek şehir normali değildir."
    >
      <div className="g015-grid">
        <Choice
          label="İklim örneği"
          value={profile}
          options={climate015Profiles.map((x) => [x.id, x.label])}
          onChange={(profile) => set({ profile })}
        />
        <Choice
          label="Mevsim takvimi"
          value={hemisphere}
          options={[
            ["north", "Kuzey yazı: haziran, temmuz, ağustos"],
            ["south", "Güney yazı: aralık, ocak, şubat"],
          ]}
          onChange={(hemisphere) => set({ hemisphere })}
        />
      </div>
      <p className="g015-help">
        Güney takvimi seçimi aynı öğretim dizisini altı ay kaydırır; aşağıdaki
        coğrafi örnek noktasını Güney Yarım Küre'ye taşımaz ve o bölgenin gerçek
        ölçümüne dönüşmez.
      </p>
      <Choice
        label="Ayı incele"
        value={String(month)}
        options={geography015Months.map((m, i) => [String(i), m])}
        onChange={(v) => set({ month: Number(v) })}
      />
      <figure>
        <ClimateGraph
          temperatures={r.temperatures}
          rain={r.rain}
          month={month}
        />
        <figcaption>
          Çizgi: aylık ortalama sıcaklık (°C). Sütun: aylık toplam yağış (mm).
          Sol sıcaklık ölçeği −40–40 °C, sağ yağış ölçeği 0–500 mm; çizgi ve
          sütun yükseklikleri aynı nicelik değildir.
        </figcaption>
      </figure>
      <div className="g015-result" data-model-result aria-live="polite">
        <strong>
          {r.profile.label} · {geography015Months[month]}
        </strong>
        <p>
          {fmt(r.monthTemperature)} °C · {fmt(r.monthRain)} mm
        </p>
        <p>
          Yıllık yağış: <strong>{fmt(r.annualRain)} mm</strong>. Yıllık sıcaklık
          farkı: {fmt(r.maxTemperature)} − ({fmt(r.minTemperature)}) ={" "}
          <strong>{fmt(r.range)} °C</strong>.
        </p>
        <p>
          Yaz toplamı: {fmt(r.summerRain)} mm. Kış toplamı: {fmt(r.winterRain)}{" "}
          mm.
        </p>
        <p>{r.profile.evidence}</p>
        <p>
          Tipik bitki ilişkisi: {r.profile.vegetation}. Tek başına bitki adı
          kesin teşhis değildir.
        </p>
        <details>
          <summary>Veriyi aç</summary>
          <Months temperatures={r.temperatures} rain={r.rain} />
        </details>
      </div>
      <RegionMap
        latitude={r.profile.latitude}
        longitude={r.profile.longitude}
        region={r.profile.region}
      />
      <p>{r.profile.context}</p>
      <Prediction
        id={id}
        signature={signature}
        expected={expected}
        options={[
          ["summer", "Yaz toplamı daha çok"],
          ["winter", "Kış toplamı daha çok"],
          ["equal", "İki toplam eşit"],
        ]}
        explanation={`Seçilen mevsim takvimine göre üç aylık yaz ${fmt(r.summerRain)} mm, kış ${fmt(r.winterRain)} mm. Yıllık toplam tek başına bu dağılımı söylemez.`}
      />
    </Frame>
  );
}
function TurkeyLab() {
  const id = "turkiye-iklimi";
  const [s, set] = useExploration(`forge015-geo-${id}`, {
    station: "mediterranean",
    elevation: 1000,
    aspect: "south",
    corridor: "parallel",
  });
  const station = turkey015Stations.some((x) => x.id === s.station)
      ? s.station
      : "mediterranean",
    elevation = clamp(s.elevation, 0, 3000),
    aspect = s.aspect === "north" ? "north" : "south",
    corridor = s.corridor === "corridor" ? "corridor" : "parallel",
    r = turkey015State(station, elevation, aspect, corridor),
    stationY = 210 - elevation * 0.05;
  return (
    <Frame
      id={id}
      title="Kıyı, dağ ve iç havzayı karşılaştır"
      intro="Önce temsili aylık istasyonu seç. Ardından ayrı ideal kesitte yükseltiyi, bakıyı ve denize açılan koridoru değiştir. Yükselti ayarı aylık tabloyu gerçek hava tahminine dönüştürmez."
    >
      <Choice
        label="Bölge örneği"
        value={station}
        options={turkey015Stations.map((x) => [x.id, x.label])}
        onChange={(station) => set({ station })}
      />
      <div className="g015-grid">
        <Choice
          label="Dağ düzeni"
          value={corridor}
          options={[
            ["parallel", "Kıyıya paralel engel"],
            ["corridor", "Kıyıya açılan koridor"],
          ]}
          onChange={(corridor) => set({ corridor })}
        />
        <Choice
          label="Yamaç bakısı"
          value={aspect}
          options={[
            ["south", "Güney"],
            ["north", "Kuzey"],
          ]}
          onChange={(aspect) => set({ aspect })}
        />
      </div>
      <Range
        label="İdeal yükseklik (m)"
        value={elevation}
        min={0}
        max={3000}
        step={200}
        onChange={(elevation) => set({ elevation })}
      />
      <figure>
        <Diagram
          title="Denizden iç havzaya şematik kesit"
          description={`Nemli hava soldaki denizden geliyor. ${r.access} Seçili bakı ${aspect === "south" ? "güney" : "kuzey"}; ayrı düşey sütun modelinin istasyonu ${fmt(elevation)} metre yüksekte.`}
          height={285}
        >
          <path className="g015-water" d="M15 210H95" />
          <path
            className="g015-land"
            d={
              corridor === "parallel"
                ? "M95 210L197 60L290 190L385 190V250H95Z"
                : "M95 210L160 175L220 185L280 165L385 190V250H95Z"
            }
          />
          <path
            className="g015-accent-line"
            d={
              corridor === "parallel"
                ? "M25 170Q96 157 161 91M149 93L161 91L158 105"
                : "M25 170Q140 133 324 154M314 145L324 154L311 160"
            }
          />
          <circle
            className="g015-sun"
            cx={aspect === "south" ? 310 : 95}
            cy={35}
            r={17}
          />
          <path className="g015-dashed" d={`M345 210V${stationY}`} />
          <circle className="g015-dot" cx={345} cy={stationY} r={6} />
          <path className="g015-line" d="M357 60V210" />
          {[0, 1500, 3000].map((v) => (
            <g key={v}>
              <path className="g015-line" d={`M353 ${210 - v * 0.05}H361`} />
              <text
                className="g015-tick"
                x={399}
                y={216 - v * 0.05}
                textAnchor="end"
              >
                {v}
              </text>
            </g>
          ))}
          <text className="g015-tick" x={20} y={238}>
            Deniz
          </text>
          <text className="g015-tick" x={258} y={238}>
            İç havza
          </text>
          <text className="g015-tick" x={200} y={278} textAnchor="middle">
            Şema · yükselti (m)
          </text>
        </Diagram>
        <figcaption>
          Rüzgâr oku denizden içeri nemli akımı temsil eder. Bakı güney/kuzey
          yönlenmesidir; bu kesitin sağı ve solu bir pusula haritası değildir.
          Düşey nokta ayrı ideal sütun yüksekliğini gösterir.
        </figcaption>
      </figure>
      <div className="g015-result" data-model-result aria-live="polite">
        <strong>{r.station.label}</strong>
        <p>{r.station.setting}</p>
        <p>{r.station.evidence}</p>
        <p>
          Temsili yıllık yağış: {fmt(r.annualRain)} mm. Temsili yıllık sıcaklık
          farkı: {fmt(r.range)} °C.
        </p>
        <p>{r.access}</p>
        <p>{r.sunlight}</p>
        <p>
          <strong>Ayrı ideal sıcaklık sütunu:</strong> Deniz seviyesinde 20 °C
          ve her 200 m'de 1 °C azalma varsayımıyla {fmt(elevation)} m'de 20 −{" "}
          {fmt(r.cooling)} = <strong>{fmt(r.modelTemperature)} °C</strong>.
        </p>
        <p>
          Bu hesap istasyon tablosunu değiştirmez; karasallık ve bakı için
          ölçülmemiş derece katkısı eklemez. Yağış türü aylık ortalamadan kesin
          bilinmez.
        </p>
        <details>
          <summary>Aylık veriyi aç</summary>
          <Months temperatures={r.station.temperatures} rain={r.station.rain} />
        </details>
      </div>
      <Prediction
        id={id}
        signature={`${elevation}`}
        expected={elevation === 0 ? "same" : "cooler"}
        options={[
          ["cooler", "İdeal nokta daha soğuk"],
          ["same", "Deniz seviyesiyle eşit"],
          ["warmer", "İdeal nokta daha sıcak"],
        ]}
        explanation={`Aynı ideal sütunda yükseklik farkı ${fmt(elevation)} m, sıcaklık azalması ${fmt(r.cooling)} °C. Model sonucu ${fmt(r.modelTemperature)} °C; başka yerlerin gerçek iklimi için ek ölçümler gerekir.`}
      />
    </Frame>
  );
}
function BoundaryDiagram({ boundary }: { boundary: string }) {
  if (boundary === "transform")
    return (
      <Diagram
        title="Üstten yanal sınır"
        description="İki levha sınır boyunca zıt yönde yatay kayar. Bu üstten görünüşte düşey hareket veya yeni kabuk üretimi gösterilmiyor."
        height={230}
      >
        <path
          className="g015-land"
          d="M30 25H196V205H30ZM204 25H370V205H204Z"
        />
        <path className="g015-dashed" d="M200 15V215" />
        <path
          className="g015-accent-line"
          d="M125 175V60M113 74L125 60L137 74M275 60V175M263 161L275 175L287 161"
        />
        <text className="g015-tick" x={70} y={45}>
          A
        </text>
        <text className="g015-tick" x={325} y={200}>
          B
        </text>
      </Diagram>
    );
  return (
    <Diagram
      title="Levha sınırının kesit modeli"
      description={
        tectonic015Boundaries.find((x) => x.id === boundary)?.evidence ?? ""
      }
      height={235}
    >
      <path className="g015-gridline" d="M15 185H385" />
      {boundary === "divergent" ? (
        <>
          <path
            className="g015-land"
            d="M20 140H150L190 110L190 165H20ZM210 110L250 140H380V165H210Z"
          />
          <path
            className="g015-accent-line"
            d="M200 210V130M190 141L200 130L210 141M150 70H65M77 60L65 70L77 80M250 70H335M323 60L335 70L323 80"
          />
          <text className="g015-tick" x={200} y={35} textAnchor="middle">
            Sırt
          </text>
        </>
      ) : boundary === "subduction" ? (
        <>
          <path
            className="g015-land"
            d="M15 115H178L300 215L284 228L166 145H15Z"
          />
          <path
            className="g015-land"
            d="M192 104L235 100L263 56L291 101H385V150H229Z"
          />
          <path
            className="g015-accent-line"
            d="M45 64H145M133 54L145 64L133 74M350 64H315M327 54L315 64L327 74M263 130V75"
          />
          <text className="g015-tick" x={178} y={87} textAnchor="middle">
            Hendek
          </text>
          <text className="g015-tick" x={310} y={35} textAnchor="middle">
            Volkan yayı
          </text>
        </>
      ) : (
        <>
          <path
            className="g015-land"
            d="M15 118H137L170 74L200 45L230 76L265 118H385V158H255L224 205H176L145 158H15Z"
          />
          <path
            className="g015-accent-line"
            d="M35 65H125M113 55L125 65L113 75M365 65H275M287 55L275 65L287 75"
          />
          <text className="g015-tick" x={200} y={30} textAnchor="middle">
            Dağ kuşağı
          </text>
          <text className="g015-tick" x={200} y={231} textAnchor="middle">
            Kalınlaşan kabuk
          </text>
        </>
      )}
    </Diagram>
  );
}
function TectonicLab() {
  const id = "dunyanin-tektonik-olusumu";
  const [s, set] = useExploration(`forge015-geo-${id}`, {
    boundary: "divergent",
    layer: 1,
    distance: 120,
    halfRate: 2,
  });
  const boundary = tectonic015Boundaries.some((x) => x.id === s.boundary)
      ? s.boundary
      : "divergent",
    layer = Math.round(clamp(s.layer, 0, 4)),
    distance = clamp(s.distance, 0, 400),
    halfRate = clamp(s.halfRate, 1, 10),
    r = tectonic015State(boundary, distance, halfRate, layer);
  return (
    <Frame
      id={id}
      title="Katmanı seç, sınırın izini sınayarak oku"
      intro="Katman tanımını ve levha hareketini ayrı denetle. Sırt yaşını hesaplarken uzaklığın tek yana, hızın yarı yayılmaya ait olduğunu koru. Kesitler gerçek kalınlık ölçeğinde değildir."
    >
      <Choice
        label="Katmanı incele"
        value={String(layer)}
        options={tectonic015Layers.map((x, i) => [String(i), x.label])}
        onChange={(v) => set({ layer: Number(v) })}
      />
      <figure>
        <Diagram
          title="Bileşim katmanları ile litosferin örtüşmesi"
          description={`Solda kabuk, manto, dış ve iç çekirdek; sağda kabuğu ve en dış sert üst manto bölümünü kapsayan litosfer bağlantısı. Bu büyütülmüş şema gerçek kalınlık ölçeğinde değildir. ${r.layer.detail}`}
          height={260}
        >
          <text className="g015-tick" x={117.5} y={20} textAnchor="middle">
            Bileşim
          </text>
          <text className="g015-tick" x={310} y={20} textAnchor="middle">
            Davranış
          </text>
          {[
            [25, 30, 185, 30],
            [245, 30, 130, 70],
            [25, 60, 185, 100],
            [25, 160, 185, 40],
            [25, 200, 185, 40],
          ].map(([x, y, width, height], v) => (
            <g key={v} data-layer-concept={v}>
              <rect
                className={
                  v === layer ? "g015-layer g015-layer-selected" : "g015-layer"
                }
                x={x}
                y={y}
                width={width}
                height={height}
              />
              <text
                className={
                  v === layer ? "g015-tick g015-on-accent" : "g015-tick"
                }
                x={x + width / 2}
                y={v === 2 ? 135 : y + height / 2 + 6}
                textAnchor="middle"
              >
                {tectonic015Layers[v].label}
              </text>
            </g>
          ))}
          <path
            className={layer === 1 ? "g015-accent-line" : "g015-line"}
            d="M212 30H230V100H212M230 65H245"
          />
          <path
            className="g015-dashed"
            style={{
              stroke: layer === 2 ? "var(--accent-text)" : "var(--muted)",
            }}
            d="M25 100H210"
          />
        </Diagram>
        <figcaption>
          Soldaki kutular bileşime göre katmanları ayırır. Sağdaki litosfer,
          kabuk ve en dış sert üst manto bölümünü birlikte kapsar; kabuğun
          altına eklenen ayrı bir bileşim katmanı değildir. Kalınlıklar ölçekli
          değildir. Bütün metin açıklaması sonuç alanında yer alır.
        </figcaption>
      </figure>
      <Choice
        label="Levha hareketi"
        value={boundary}
        options={tectonic015Boundaries.map((x) => [x.id, x.label])}
        onChange={(boundary) => set({ boundary })}
      />
      <figure>
        <BoundaryDiagram boundary={boundary} />
        <figcaption>
          {boundary === "transform"
            ? "Üstten görünüş: oklar sınır boyunca yatay hareketi gösterir."
            : "Kesit görünüş: oklar göreli hareketi, büyütülmüş çizim süreç ilişkisini gösterir. Şekil boyutları ölçekli değildir."}
        </figcaption>
      </figure>
      <div className="g015-grid">
        <Range
          label="Sırta uzaklık (km)"
          value={distance}
          min={0}
          max={400}
          step={20}
          onChange={(distance) => set({ distance })}
        />
        <Range
          label="Yarı hız (cm/yıl)"
          value={halfRate}
          min={1}
          max={10}
          onChange={(halfRate) => set({ halfRate })}
        />
      </div>
      <figure>
        <Diagram
          title="Sırta uzaklık ve tabanın yaşı"
          description={`Sabit yarı hız ${fmt(halfRate)} cm/yıl. Sırtın iki yanındaki eşit uzaklık ${fmt(distance)} km için model yaşı eşit: ${fmt(r.ageMa)} milyon yıl. Bu yaş hesabı seçili diğer sınırın değil, ayrı uzaklaşan sırt modelinin sonucudur.`}
          height={200}
        >
          {[0, 1, 2, 3].map((v) => (
            <g key={v} data-age-band={v}>
              <rect
                className={
                  v % 2 ? "g015-stripe g015-stripe-alt" : "g015-stripe"
                }
                x={200 + v * 40}
                y={70}
                width={40}
                height={50}
              />
              <rect
                className={
                  v % 2 ? "g015-stripe g015-stripe-alt" : "g015-stripe"
                }
                x={160 - v * 40}
                y={70}
                width={40}
                height={50}
              />
            </g>
          ))}
          <path
            className="g015-line"
            d="M40 145H360M40 137V153M200 134V156M360 137V153"
          />
          <text className="g015-tick" x={200} y={40} textAnchor="middle">
            Sırt · yaş 0
          </text>
          <text className="g015-tick" x={200} y={181} textAnchor="middle">
            Uzaklık (km): −400 · 0 · +400
          </text>
          <path
            className="g015-dashed"
            d={`M${200 - distance * 0.4} 60V132M${200 + distance * 0.4} 60V132`}
          />
          <circle
            className="g015-dot"
            cx={200 - distance * 0.4}
            cy={95}
            r={6}
          />
          <circle
            className="g015-dot"
            cx={200 + distance * 0.4}
            cy={95}
            r={6}
          />
        </Diagram>
        <figcaption>
          Negatif/pozitif işaret sırttan sol/sağ yönü belirtir; uzaklık
          büyüklükleri eşittir. Sabit ve simetrik yayılma varsayılmıştır; gerçek
          taban yaşı ölçümü değildir.
        </figcaption>
      </figure>
      <div className="g015-result" data-model-result aria-live="polite">
        <strong>{r.layer.label}</strong>
        <p>{r.layer.detail}</p>
        <h4>{r.boundary.label}</h4>
        <p>{r.boundary.evidence}</p>
        <p>{r.boundary.limit}</p>
        <p>
          <strong>Ayrı sırt yaşı modeli:</strong> {fmt(distance)} km ÷{" "}
          {fmt(10 * halfRate)} km/milyon yıl ={" "}
          <strong>{fmt(r.ageMa)} milyon yıl</strong>. Toplam ayrılma hızı{" "}
          {fmt(r.totalRate)} cm/yıl; hesapta tek yana ait yarı hız kullanılır.
        </p>
        <p>
          Yarı hız sabit kabul edilir; aynı uzaklıktaki iki yan eşit yaştadır.
          Seçili sınır yanal veya yakınlaşan olsa bile bu ayrı sırt hesabı o
          sınıra yeni kabuk üretimi atfetmez.
        </p>
      </div>
      <Prediction
        id={id}
        signature={boundary}
        expected={boundary === "divergent" ? "new" : "not-required"}
        options={[
          ["new", "Seçili sınırda yeni taban"],
          ["not-required", "Yeni taban zorunlu değil"],
        ]}
        explanation={r.boundary.evidence + " " + r.boundary.limit}
      />
    </Frame>
  );
}
function ForceDiagram({
  mode,
  amount,
  deflection,
  depth,
  intrusion,
  underwater,
  vertical,
}: {
  mode: string;
  amount: number;
  deflection: number;
  depth: number;
  intrusion: boolean;
  underwater: boolean;
  vertical: boolean;
}) {
  if (mode === "fold")
    return (
      <Diagram
        title="Basit tabaka kıvrımı"
        description="Yatay sıkışma ile tabaka geometrisi değişir. Sol kemer antiklinal, sağ oluk senklinalin basit normal modelidir; gerçek yüzey şekliyle zorunlu aynı değildir."
        height={245}
      >
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            className="g015-stratum"
            d={`M30 ${120 + i * 25}C80 ${120 + i * 25 - amount * 1.2} 100 ${120 + i * 25 - amount * 1.2} 150 ${120 + i * 25}S240 ${120 + i * 25 + amount * 1.2} 285 ${120 + i * 25}S340 ${120 + i * 25 - amount * 0.4} 370 ${120 + i * 25}`}
          />
        ))}
        <path
          className="g015-accent-line"
          d="M25 45H110M98 35L110 45L98 55M375 45H290M302 35L290 45L302 55"
        />
        <text className="g015-tick" x={90} y={222} textAnchor="middle">
          Kemer
        </text>
        <text className="g015-tick" x={232} y={222} textAnchor="middle">
          Oluk
        </text>
      </Diagram>
    );
  if (mode === "block")
    return (
      <Diagram
        title="Normal faylarla sınırlı göreli alçak blok"
        description="Bu şemada iki normal fay orta bloğu aşağı sınırlar: graben. Yan bloklar göreli yüksek horst bağlamındadır. Hareket değeri ölçekli gerçek metre değildir."
        height={280}
      >
        <path
          className="g015-land"
          d={`M20 70H130L170 240H20ZM${130 + (amount * 40) / 170} ${70 + amount}H${270 - (amount * 40) / 170}L230 240H170ZM270 70H380V240H230Z`}
        />
        {[0, 1, 2].map((i) => {
          const sy = 110 + i * 25,
            cy = sy + amount;
          return (
            <path
              key={i}
              className="g015-stratum"
              d={`M25 ${sy}H${130 + ((sy - 70) * 40) / 170}M${130 + ((cy - 70) * 40) / 170} ${cy}H${270 - ((cy - 70) * 40) / 170}M${270 - ((sy - 70) * 40) / 170} ${sy}H375`}
            />
          );
        })}
        <path
          className="g015-accent-line"
          d={`M200 85V${95 + amount}M190 ${85 + amount}L200 ${95 + amount}L210 ${85 + amount}`}
        />
        <text className="g015-tick" x={200} y={270} textAnchor="middle">
          Göreli alçak orta blok
        </text>
      </Diagram>
    );
  if (mode === "isostasy") {
    const shift = deflection * 0.12;
    return (
      <Diagram
        title="Buz yüküyle yerel denge sapması"
        description={`Buz yoğunluğu 0,9 ve destek ortamı 3,3 g/cm³. Ek yükle modelde ${fmt(deflection)} metre aşağı sapma; destek ortamı tümüyle sıvı kabul edilmez. Şema düşey ölçekli kesit değildir.`}
        height={285}
      >
        <path className="g015-dashed" d="M25 110H375" />
        <path
          className="g015-land"
          d={`M70 ${110 + shift}H330V${195 + shift}H70Z`}
        />
        <path
          className="g015-ice"
          d={`M90 ${110 + shift}V${110 + shift - (deflection > 0 ? 45 : 0)}H310V${110 + shift}Z`}
        />
        <path className="g015-water" d="M20 110H65M335 110H380" />
        {deflection > 0 && (
          <path
            className="g015-accent-line"
            d={`M350 115V${116 + shift}M342 ${108 + shift}L350 ${116 + shift}L358 ${108 + shift}`}
          />
        )}
        <text className="g015-tick" x={200} y={30} textAnchor="middle">
          Sabit deniz · referans 0 m
        </text>
        <text className="g015-tick" x={200} y={275} textAnchor="middle">
          Sapma: {fmt(deflection)} m aşağı
        </text>
      </Diagram>
    );
  }
  if (mode === "volcano")
    return (
      <Diagram
        title={intrusion ? "İç volkanik sokulmalar" : "Dış volkanizma"}
        description={
          intrusion
            ? "Magma yüzeye çıkmadan tabakaları kesen dayk ve tabakalara paralel sill biçiminde sokuluyor."
            : "Magma yüzeye ulaşıyor; lav ve piroklastik malzeme birikimi volkan konisini oluşturabiliyor."
        }
        height={275}
      >
        <path
          className="g015-land"
          d={
            intrusion
              ? "M20 100H380V250H20Z"
              : "M20 160H125L185 70L200 85L215 70L275 160H380V250H20Z"
          }
        />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            className="g015-stratum"
            d={`M25 ${165 + i * 25}H375`}
          />
        ))}
        <ellipse className="g015-magma" cx={200} cy={230} rx={45} ry={17} />
        <path
          className="g015-magma"
          d={
            intrusion
              ? "M192 225V135H207V185H285V198H207V225Z"
              : "M192 230V95L185 82L190 75L200 85L210 75L215 82L207 95V230Z"
          }
        />
        {!intrusion && (
          <>
            <path
              className="g015-accent-line"
              d="M194 65Q165 37 175 23M206 65Q235 37 225 23"
            />
            <circle className="g015-dot" cx={200} cy={35} r={5} />
          </>
        )}
        <text className="g015-tick" x={315} y={128} textAnchor="middle">
          {intrusion ? "İç sokulma" : "Koni"}
        </text>
      </Diagram>
    );
  const fy = 70 + depth * 4;
  return (
    <Diagram
      title="Odak ve dış merkez kesiti"
      description={`Odak ${fmt(depth)} km derinde, dış merkez onun yüzeydeki dik izdüşümüdür. ${underwater ? "Deniz altında" : "Karada"}; ${vertical ? "düşey hareket koşulu verilmiş" : "baskın kayma yatay, önemli düşey taban hareketi verilmemiş"}.`}
      height={270}
    >
      <path className="g015-land" d="M25 70H335V230H25Z" />
      {underwater && (
        <path
          className="g015-water"
          d="M25 49Q65 35 105 49T185 49T265 49T335 49"
        />
      )}
      <path className="g015-stratum" d="M90 70L250 230" />
      <path className="g015-dashed" d={`M${90 + (fy - 70)} 70V${fy}`} />
      <circle className="g015-dot" cx={90 + fy - 70} cy={70} r={6} />
      <circle className="g015-magma" cx={90 + fy - 70} cy={fy} r={8} />
      <text className="g015-tick" x={40} y={25}>
        Yüzey: dış merkez
      </text>
      <path className="g015-line" d="M355 70V210" />
      {[0, 10, 20, 30, 35].map((v) => (
        <g key={v}>
          <path className="g015-line" d={`M350 ${70 + v * 4}H360`} />
          <text className="g015-tick" x={367} y={76 + v * 4}>
            {v}
          </text>
        </g>
      ))}
      <text className="g015-tick" x={200} y={261} textAnchor="middle">
        Odak derinliği (km)
      </text>
    </Diagram>
  );
}
function InternalLab() {
  const id = "ic-kuvvetler";
  const [s, set] = useExploration(`forge015-geo-${id}`, {
    mode: "fold",
    amount: 35,
    ice: 1100,
    depth: 15,
    intrusion: false,
    underwater: false,
    vertical: false,
  });
  const mode = internal015Modes.some((x) => x[0] === s.mode) ? s.mode : "fold",
    amount = clamp(s.amount, 0, 60),
    ice = clamp(s.ice, 0, 2000),
    depth = clamp(s.depth, 5, 35),
    r = internal015State(
      mode,
      amount,
      ice,
      depth,
      s.intrusion,
      s.underwater,
      s.vertical,
    );
  const expected =
      mode === "fold" || mode === "block"
        ? "deform"
        : mode === "isostasy"
          ? "load"
          : mode === "volcano"
            ? "magma"
            : "focus",
    explanation =
      mode === "fold"
        ? "Tabakaların kemer ve oluk biçiminde değişimi kıvrımlanma göstergesidir; yüzeydeki her tepe zorunlu antiklinal değildir."
        : mode === "block"
          ? "Normal faylarla sınırlı bu modelde orta blok göreli alçaktır: graben. Göreli blok konumu ve fay türü birlikte kullanılır."
          : mode === "isostasy"
            ? `Buz yükü ${fmt(ice)} m. Verilen yoğunluklarla denge sapması ${fmt(r.deflection)} m aşağı; yük kaldırıldığında uzun dönemde ters tepki desteklenir.`
            : mode === "volcano"
              ? r.volcanoConclusion
              : `Odak yer içinde ${fmt(depth)} km derindedir; dış merkez yüzeydeki dik izdüşümdür. ${r.quakeConclusion}`;
  return (
    <Frame
      id={id}
      title="Hareketin biçiminden süreci çıkar"
      intro="Kıvrımı, fay bloğunu, yük değişimini, magmayı veya deprem kaynağını seç. Şemadaki kanıtı adlandır; farklı süreçleri yalnız dağ ya da çukur görünüşüyle eşitleme."
    >
      <Choice
        label="Süreci seç"
        value={mode}
        options={internal015Modes}
        onChange={(mode) => set({ mode })}
      />
      {(mode === "fold" || mode === "block") && (
        <Range
          label="Şekil değişimi (göreli)"
          value={amount}
          min={0}
          max={60}
          onChange={(amount) => set({ amount })}
        />
      )}{" "}
      {mode === "isostasy" && (
        <Range
          label="Buz kalınlığı (m)"
          value={ice}
          min={0}
          max={2000}
          step={100}
          onChange={(ice) => set({ ice })}
        />
      )}{" "}
      {mode === "volcano" && (
        <Check
          label="Magma yüzeye çıkmadan sokulsun"
          value={s.intrusion}
          onChange={(intrusion) => set({ intrusion })}
        />
      )}{" "}
      {mode === "earthquake" && (
        <>
          <Range
            label="Odak derinliği (km)"
            value={depth}
            min={5}
            max={35}
            onChange={(depth) => set({ depth })}
          />
          <Check
            label="Deprem deniz altında"
            value={s.underwater}
            onChange={(underwater) => set({ underwater })}
          />
          <Check
            label="Önemli düşey taban hareketi verilmiş"
            value={s.vertical}
            onChange={(vertical) => set({ vertical })}
          />
        </>
      )}
      <figure>
        <ForceDiagram
          mode={mode}
          amount={amount}
          deflection={r.deflection}
          depth={depth}
          intrusion={s.intrusion}
          underwater={s.underwater}
          vertical={s.vertical}
        />
        <figcaption>
          {mode === "earthquake"
            ? "Kesitte sağ eksen km derinliktir. Yüzeydeki işaret dış merkez, içteki işaret odaktır. Düşey izdüşüm çizgisi bir kayma yönü değildir."
            : mode === "isostasy"
              ? "Yoğunluklar ve denge varsayımı verilmiştir; şeklin düşey boyutları büyütülmüştür, yük ile sapmanın metre değerleri HTML sonucunda hesaplanır."
              : "Şekil öğretim için büyütülmüş, ölçekli olmayan bir modeldir; hareket ayarı gerçek gerilim, deprem büyüklüğü veya yer değiştirme ölçümü değildir."}
        </figcaption>
      </figure>
      <div className="g015-result" data-model-result aria-live="polite">
        <strong>{internal015Modes.find((x) => x[0] === mode)?.[1]}</strong>
        <p>{explanation}</p>
        {mode === "isostasy" && (
          <>
            <p>
              Hesap: {fmt(ice)} × 0,9 / 3,3 ={" "}
              <strong>{fmt(r.deflection)} m aşağı</strong>.
            </p>
            <p>
              Deniz düzeyi sabit ve kara bu kadar alçalırsa göreli deniz
              seviyesi {fmt(r.relativeSea)} m artar; uygun kıyıda transgresyon
              eğilimi. Bu model olayın süresini vermez; başka tektonik veya
              deniz seviyesi değişimlerini içermez.
            </p>
          </>
        )}
        {mode === "earthquake" && (
          <p>
            Ortam: {s.underwater ? "Deniz altı" : "Kara"}. Hareket koşulu:{" "}
            {s.vertical
              ? "Önemli düşey yer değiştirmesi verilmiş"
              : "Baskın yatay kayma; önemli düşey hareket verilmemiş"}
            . Şema sarsıntı şiddeti veya dalga yüksekliği tahmini değildir.
          </p>
        )}
        {mode === "fold" && (
          <p>
            Göreli kıvrım ayarı: {fmt(amount)}. Sıfır ayarında başlangıç
            tabakaları yataydır. Antiklinal/senklinal adları tabaka geometrisine
            aittir, arazi tepesinin adına değil.
          </p>
        )}
        {mode === "block" && (
          <p>
            Göreli blok ayarı: {fmt(amount)}. Sıfırda tabaka hizaları eşittir;
            arttıkça orta bloğun tabaka izi aşağı ötelenir. Çizgi düşey metre
            ölçeği taşımaz.
          </p>
        )}
      </div>
      <Prediction
        id={id}
        signature={`${mode}:${amount}:${ice}:${depth}:${s.intrusion}:${s.underwater}:${s.vertical}`}
        expected={expected}
        options={[
          ["deform", "Tabaka ve blok değişimi"],
          ["load", "Yük ve denge ilişkisi"],
          ["magma", "Magma ve sokulma"],
          ["focus", "Odak ve yüzey ilişkisi"],
        ]}
        explanation={explanation}
      />
    </Frame>
  );
}
export default function Forge015GeographyLab({
  lessonId,
}: {
  lessonId: string;
}) {
  if (lessonId === "buyuk-iklim-tipleri") return <ClimateLab />;
  if (lessonId === "turkiye-iklimi") return <TurkeyLab />;
  if (lessonId === "dunyanin-tektonik-olusumu") return <TectonicLab />;
  if (lessonId === "ic-kuvvetler") return <InternalLab />;
  return null;
}
