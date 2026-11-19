import { useId, useState, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  geography014Contributions,
  geography014Contribution,
  civilArrival014,
  geography014Focus,
  geography014FocusState,
  geography014Periods,
  geography014Period,
  localSolarTime,
  atmosphere014Layers,
  atmosphere014State,
  reducedTemperature,
  pressure014Gradient,
  foehn014Descent,
  humidity014Balance,
  rainfall014Processes,
} from "./forge014Geography";
import "./forge014Geography.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

const num = (x: number, a: number, b: number) =>
  Number.isFinite(x) ? Math.min(b, Math.max(a, Math.round(x))) : a;
const fmt = (x: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(x);
function Diagram({
  title,
  description,
  children,
  height = 280,
}: {
  title: string;
  description: string;
  children: ReactNode;
  height?: number;
}) {
  const uid = useId();
  return (
    <svg
      className="g014-diagram"
      viewBox={`0 0 400 ${height}`}
      role="img"
      aria-labelledby={`${uid}-title ${uid}-desc`}
    >
      <title id={`${uid}-title`}>{title}</title>
      <desc id={`${uid}-desc`}>{description}</desc>
      {children}
    </svg>
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
  const uid = useId();
  const [draft, setDraft] = useState(String(value));
  const [editing, setEditing] = useState(false);
  const commit = () => {
    setEditing(false);
    if (draft.trim() === "" || !Number.isFinite(Number(draft))) return;
    const bounded = Math.min(max, Math.max(min, Number(draft)));
    const normalized = min + Math.round((bounded - min) / step) * step;
    onChange(Math.min(max, Math.max(min, normalized)));
  };
  return (
    <div className="g014-control">
      <label htmlFor={uid}>
        {label}: <strong>{fmt(value)}</strong>
      </label>
      <input
        id={uid}
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <input
        type="number"
        aria-label={`${label}, sayıyla`}
        min={min}
        max={max}
        step={step}
        value={editing ? draft : value}
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
  const uid = useId();
  return (
    <div className="g014-control">
      <label htmlFor={uid}>{label}</label>
      <ChoiceSelect id={uid} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([k, text]) => (
          <option key={k} value={k}>
            {text}
          </option>
        ))}
      </ChoiceSelect>
      <output className="g014-selected" htmlFor={uid}>
        Seçili: {options.find(([k]) => k === value)?.[1]}
      </output>
    </div>
  );
}
function Prediction({
  id,
  signature,
  expected,
  explanation,
  options,
}: {
  id: string;
  signature: string;
  expected: string;
  explanation: string;
  options: readonly (readonly [string, string])[];
}) {
  const uid = useId();
  const [s, set] = useExploration(`forge014-geo-prediction-${id}`, {
    answer: "",
    reason: "",
    checkedFor: "",
  });
  const valid = options.some(([key]) => key === s.answer),
    reason = s.reason.slice(0, 120);
  const checked =
    s.checkedFor === signature && valid && reason.trim().length >= 8;
  return (
    <div className="g014-prediction">
      <Choice
        label="Sonuç tahminin"
        value={valid ? s.answer : ""}
        options={[["", "Bir sonuç seç"], ...options]}
        onChange={(answer) => set({ answer, checkedFor: "" })}
      />
      <label htmlFor={uid}>Gerekçen</label>
      <textarea
        id={uid}
        rows={3}
        maxLength={120}
        value={reason}
        onChange={(e) =>
          set({ reason: e.target.value.slice(0, 120), checkedFor: "" })
        }
      />
      <p className="g014-help">
        Seçiminin nedenini 8–120 karakterle açıkla; sonra kanıtla karşılaştır.
      </p>
      <button
        type="button"
        className="button"
        disabled={!valid || reason.trim().length < 8}
        onClick={() => set({ checkedFor: signature })}
      >
        Tahmini dene
      </button>
      {checked && (
        <div className="g014-feedback" role="status" data-prediction-feedback>
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
    <section className="forge014-geography-lab" data-forge014={id}>
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
    </section>
  );
}
function Valley() {
  const id = "doga-insan-cografya";
  const [s, set] = useExploration(`forge014-geo-${id}`, {
    focus: 0,
    human: true,
  });
  const index = num(s.focus, 0, 3),
    row = geography014FocusState(index);
  return (
    <Frame
      id={id}
      title="Aynı vadiye dört soru"
      intro="Araştırma odağını değiştir. Ölçülen sonucun hangi alanı öne çıkardığını gör; insan katmanını açıp kapatarak aynı yerin farklı ilişkilerini karşılaştır."
    >
      <Choice
        label="Araştırma odağı"
        value={String(index)}
        options={geography014Focus.map((x, i) => [String(i), x.label])}
        onChange={(v) => set({ focus: Number(v) })}
      />
      <label className="g014-check">
        <input
          type="checkbox"
          checked={s.human}
          onChange={(e) => set({ human: e.target.checked })}
        />{" "}
        İnsan katmanını göster
      </label>
      <figure>
        <Diagram
          title={`${row.label} odağında vadi`}
          description="Dağ, akarsu ve bitki alanı doğal tabandır. İnsan katmanı açıldığında yere oturan baraj, köy ve tarlalar görünür. Seçili araştırma bağlantısı kalın çizilir."
        >
          <path
            className="g014-land"
            d="M10 210L80 55 160 210 225 85 310 210 390 210V265H10Z"
          />
          <path className="g014-land" d="M10 228H390V265H10Z" />
          <path
            data-geo-river
            className={`g014-water-line ${row.target === "river" ? "g014-emphasis" : ""}`}
            d="M200 20C150 70 210 105 170 145S150 210 205 265"
          />
          <path
            data-geo-mountain
            className={
              row.target === "mountain"
                ? "g014-accent-line g014-emphasis"
                : "g014-line"
            }
            d="M30 180L80 55 140 180"
          />
          {[55, 325, 350].map((x) => (
            <g key={x}>
              <path className="g014-trunk" d={`M${x} 206V228`} />
              <path
                className="g014-leaf"
                d={`M${x - 15} 213L${x} 178 ${x + 15} 213Z`}
              />
            </g>
          ))}
          {s.human && (
            <g data-human-layer>
              <path className="g014-dam" d="M139 150H195V170H139Z" />
              <g
                data-geo-village
                className={row.target === "village" ? "g014-emphasis" : ""}
              >
                <path className="g014-house" d="M260 184V218H300V184Z" />
                <path className="g014-roof" d="M252 184L280 160 308 184Z" />
                <path className="g014-land" d="M250 218H312L322 228H240Z" />
              </g>
              <g
                data-geo-field
                className={row.target === "field" ? "g014-emphasis" : ""}
              >
                <path className="g014-field" d="M25 235H125V260H25Z" />
                <path
                  className="g014-line"
                  d="M40 237V258M60 237V258M80 237V258M100 237V258"
                />
              </g>
              <path
                className="g014-link"
                data-focus-link={row.target}
                d={
                  row.target === "village"
                    ? "M200 160Q230 130 280 164"
                    : row.target === "field"
                      ? "M155 170Q115 195 75 237"
                      : row.target === "mountain"
                        ? "M160 145Q120 110 80 80"
                        : "M167 170Q215 205 200 250"
                }
              />
            </g>
          )}
        </Diagram>
        <figcaption>
          Şematik vadi; şekiller ölçekli ölçüm veya gerçek bir projenin etki
          tahmini değildir. Ağaç gövdeleri ve yapılar kendi zeminlerine oturur.
        </figcaption>
      </figure>
      <div data-model-result className="g014-result">
        <h4>{row.question}</h4>
        <p>
          <strong>Öncelik:</strong> {row.primary}
        </p>
        <p>
          <strong>Destek:</strong> {row.support}
        </p>
        <p>{row.evidence}</p>
        <p>{row.limit}</p>
      </div>
      <Prediction
        id={id}
        signature={`${index}-${s.human}`}
        expected={String(index)}
        options={geography014Focus.map((r, i) => [
          String(i),
          r.label === "Akım"
            ? "Su sistemi"
            : r.label === "Göç"
              ? "Nüfus hareketi"
              : r.label === "Tarım"
                ? "Üretim"
                : "Yer şekilleri",
        ])}
        explanation={
          row.evidence +
          " İnceleme nesnesi, aynı vadide bulunmaktan daha seçici bir kanıttır."
        }
      />
    </Frame>
  );
}
function Contributions({ period }: { period: number }) {
  const [saved, set] = useExploration("forge014-geo-history-contribution", {
    card: 0,
    open: false,
  });
  const rows = geography014Contributions[period],
    card = num(saved.card, 0, rows.length - 1),
    item = geography014Contribution(period, card);
  return (
    <details
      className="g014-contributions"
      open={saved.open}
      onToggle={(e) => {
        if (e.currentTarget.open !== saved.open)
          set({ open: e.currentTarget.open });
      }}
    >
      <summary>Katkıları aç</summary>
      <h4>Kişiyi eser ve yöntemle ayır</h4>
      <p>
        Dönem aynı kaldığında ayırt edici katkıyı değiştir. Bu kartlar, üstteki
        genel dönem örneğinin yanında farklı kişileri karşılaştırır.
      </p>
      <Choice
        label="Kişi kartı"
        value={String(card)}
        options={rows.map((r, i) => [String(i), r.person])}
        onChange={(v) => set({ card: Number(v) })}
      />
      <figure>
        <Diagram
          title={`${item.person}: ${item.work}`}
          description="Şekil seçilen katkı türünü simgeler; tarih süresi veya gerçek bir haritanın ölçekli kopyası değildir. Eser ve açıklama metin olarak da verilmiştir."
          height={200}
        >
          <g data-contribution-mark={item.kind}>
            {item.kind === "measure" ? (
              <>
                <circle className="g014-node" cx="200" cy="100" r="60" />
                <path
                  className="g014-accent-line"
                  d="M200 40V100L248 65M80 30L140 80M250 30L300 80"
                />
              </>
            ) : item.kind === "map" ? (
              <>
                <rect
                  className="g014-node"
                  x="80"
                  y="30"
                  width="240"
                  height="140"
                />
                <path
                  className="g014-line"
                  d="M140 30V170M200 30V170M260 30V170M80 77H320M80 124H320"
                />
                <path
                  className="g014-accent-line"
                  d="M110 145L180 70 280 110"
                />
                <circle className="g014-current" cx="180" cy="70" r="6" />
              </>
            ) : item.kind === "travel" ? (
              <>
                <path
                  className="g014-accent-line"
                  d="M70 145C120 5 200 190 315 50M295 50H315V70"
                />
                {[
                  [70, 145],
                  [180, 97],
                  [315, 50],
                ].map(([x, y], i) => (
                  <circle key={i} className="g014-node" cx={x} cy={y} r="10" />
                ))}
              </>
            ) : item.kind === "compile" ? (
              <>
                {[0, 1, 2].map((i) => (
                  <g key={i}>
                    <rect
                      className="g014-node"
                      x={90 + i * 35}
                      y={30 + i * 25}
                      width="150"
                      height="100"
                    />
                    <path
                      className="g014-line"
                      d={`M${110 + i * 35} ${55 + i * 25}h90M${110 + i * 35} ${75 + i * 25}h70`}
                    />
                  </g>
                ))}
              </>
            ) : (
              <>
                <path
                  className="g014-accent-line"
                  d="M100 50L300 50 200 155 100 50M100 50L300 155 300 50M200 155H300"
                />
                {[
                  [100, 50],
                  [300, 50],
                  [200, 155],
                  [300, 155],
                ].map(([x, y], i) => (
                  <circle key={i} className="g014-node" cx={x} cy={y} r="13" />
                ))}
              </>
            )}
          </g>
        </Diagram>
        <figcaption>
          Katkı simgesi; eser–yazar–yöntem ilişkisi aşağıdaki açıklamayla
          birlikte okunur.
        </figcaption>
      </figure>
      <div className="g014-result" data-contribution-result>
        <strong>{item.person}</strong>
        <p>{item.work}</p>
        <p>{item.explanation}</p>
      </div>
    </details>
  );
}

function History() {
  const id = "cografyanin-tarihi-gelisimi";
  const [s, set] = useExploration(`forge014-geo-${id}`, {
    period: 0,
    evidence: false,
  });
  const index = num(s.period, 0, 3),
    row = geography014Period(index);
  return (
    <Frame
      id={id}
      title="Dönemden kanıta ilerle"
      intro="Bir dönem seç; isimleri ve yöntem örneğini karşılaştır. Kutular tarih sırasını gösterir, eşit süreli bir zaman ölçeği değildir."
    >
      <Choice
        label="Dönem"
        value={String(index)}
        options={geography014Periods.map((r, i) => [String(i), r.label])}
        onChange={(v) => set({ period: Number(v), evidence: false })}
      />
      <figure>
        <Diagram
          title={`Coğrafi düşüncede seçilen dönem: ${row.label}`}
          description="Dört dönem soldan sağa tarih sırasında çizilmiştir. Seçili düğüm vurgulanır; çizgi uzunluğu yüzyıl miktarı göstermez."
          height={160}
        >
          <path className="g014-line" d="M45 80H355" />
          {geography014Periods.map((r, i) => (
            <g key={r.label} transform={`translate(${45 + i * 103.33},80)`}>
              <circle
                data-geo-period={i}
                className={i === index ? "g014-current" : "g014-node"}
                r={i === index ? 23 : 14}
              />
              <text
                y="7"
                textAnchor="middle"
                className={
                  i === index ? "g014-number g014-on-accent" : "g014-number"
                }
              >
                {i + 1}
              </text>
            </g>
          ))}
        </Diagram>
        <figcaption>
          {geography014Periods.map((r) => r.label).join(" → ")}. Yöntemler çağ
          sınırlarında tamamen kaybolmaz; yeni araç ve bilgilerle sürebilir.
        </figcaption>
      </figure>
      <div data-model-result className="g014-result">
        <h4>{row.label}</h4>
        <p>{row.names}</p>
        <p>
          <strong>Yöntem örneği:</strong> {row.method}
        </p>
        <button
          className="button"
          type="button"
          onClick={() => set({ evidence: !s.evidence })}
        >
          {s.evidence ? "Kanıtı kapat" : "Kanıtı aç"}
        </button>
        {s.evidence && (
          <div data-history-evidence>
            <p>{row.evidence}</p>
            <p>{row.conclusion}</p>
          </div>
        )}
        <p>{row.limit}</p>
      </div>
      <Prediction
        id={id}
        signature={`${index}-${s.evidence}`}
        expected={String(index)}
        options={geography014Periods.map((r, i) => [String(i), r.method])}
        explanation={`${row.evidence} Bu kartın yöntem örneği: ${row.method}. Bir dönem etiketi bütün eserlere veya kesin tarihlere kanıt değildir.`}
      />
      <Contributions period={index} />
    </Frame>
  );
}
function Clock() {
  const id = "yerel-saat";
  const [s, set] = useExploration(`forge014-geo-${id}`, {
    first: 30,
    second: 45,
    hour: 12,
    minute: 0,
    mode: "solar",
    offsetA: 180,
    offsetB: -120,
    travel: 0,
  });
  const first = num(s.first, -180, 180),
    second = num(s.second, -180, 180),
    hour = num(s.hour, 0, 23),
    minute = num(s.minute, 0, 59),
    civil = s.mode === "civil";
  const offsetA = num(s.offsetA, -720, 840),
    offsetB = num(s.offsetB, -720, 840),
    travel = num(s.travel, 0, 2880);
  const solar = localSolarTime(first, second, hour * 60 + minute),
    arrival = civilArrival014(hour * 60 + minute, offsetA, offsetB, travel),
    model = civil ? arrival : solar;
  const relative = (d: number) =>
    d === 0
      ? "Aynı gün"
      : d === -1
        ? "Önceki gün"
        : d === 1
          ? "Ertesi gün"
          : d < 0
            ? `${-d} gün önce`
            : `${d} gün sonra`;
  const day = relative(model.dayOffset),
    difference = civil ? arrival.wallDifference : solar.minuteDifference,
    direction = difference > 0 ? "ahead" : difference < 0 ? "behind" : "same";
  const long = (x: number) =>
    x === 0 ? "0°" : `${Math.abs(x)}°${x < 0 ? "B" : "D"}`;
  const hand = (minutes: number, length: number) => ({
    x: 200 + Math.sin((minutes / 720) * Math.PI * 2) * length,
    y: 135 - Math.cos((minutes / 720) * Math.PI * 2) * length,
  });
  const h = hand(model.minuteOfDay, 42),
    m = hand(model.minuteOfDay * 12, 65);
  const clockAt = (minutes: number) =>
    `${relative(Math.floor(minutes / 1440))} ${`${Math.floor((((minutes % 1440) + 1440) % 1440) / 60)}`.padStart(2, "0")}.${`${((minutes % 60) + 60) % 60}`.padStart(2, "0")}`;
  const utc = (minutes: number) =>
    `UTC${minutes < 0 ? "−" : "+"}${`${Math.floor(Math.abs(minutes) / 60)}`.padStart(2, "0")}:${`${Math.abs(minutes) % 60}`.padStart(2, "0")}`;
  return (
    <Frame
      id={id}
      title="Saat türünü seç, günü izle"
      intro="Yerel güneş saatinde boylamı; sivil saat ve yolculukta verilen UTC farklarını kullan. İki hesabı karıştırmadan önce hangi verinin verildiğini seç."
    >
      <Choice
        label="Saat hesabı"
        value={civil ? "civil" : "solar"}
        options={[
          ["solar", "Yerel güneş saati"],
          ["civil", "UTC ve yolculuk"],
        ]}
        onChange={(mode) => set({ mode })}
      />
      <div className="g014-grid">
        {!civil && (
          <>
            <Range
              label="Başlangıç boylamı (°)"
              value={first}
              min={-180}
              max={180}
              onChange={(v) => set({ first: v })}
            />
            <Range
              label="Hedef boylamı (°)"
              value={second}
              min={-180}
              max={180}
              onChange={(v) => set({ second: v })}
            />
          </>
        )}
        <Range
          label="Başlangıç saat"
          value={hour}
          min={0}
          max={23}
          onChange={(v) => set({ hour: v })}
        />
        <Range
          label="Başlangıç dakika"
          value={minute}
          min={0}
          max={59}
          onChange={(v) => set({ minute: v })}
        />
        {civil && (
          <>
            <Range
              label="Kaynak UTC farkı (dk)"
              value={offsetA}
              min={-720}
              max={840}
              step={15}
              onChange={(v) => set({ offsetA: v })}
            />
            <Range
              label="Hedef UTC farkı (dk)"
              value={offsetB}
              min={-720}
              max={840}
              step={15}
              onChange={(v) => set({ offsetB: v })}
            />
            <Range
              label="Geçen süre (dk)"
              value={travel}
              min={0}
              max={2880}
              onChange={(v) => set({ travel: v })}
            />
          </>
        )}
      </div>
      {civil && (
        <p>
          Kaynak: {utc(offsetA)}; hedef: {utc(offsetB)}. Ofsetler dakika
          cinsindedir: +180 dk, UTC+3 saat demektir. Bu eğitim aralığı sabit
          verilen ofsetlerle çalışır; tarihî veya yaz saati kuralını
          kendiliğinden tahmin etmez. Geçen süre sıfırsa aynı an
          karşılaştırılır.
        </p>
      )}
      <figure>
        <Diagram
          title={
            civil
              ? "Sivil saat: kaynak, UTC ve varış"
              : `${long(first)} noktasından ${long(second)} noktasına yerel saat`
          }
          description={`Hedef saat ${model.clock}. Kadran hedefin saat ve dakikasına bağlıdır; alt çizginin anlamı seçilen hesap türüne göre açıklanır.`}
        >
          <circle className="g014-node" cx="200" cy="135" r="92" />
          {[0, 1, 2, 3].map((i) => (
            <text
              className="g014-tick"
              key={i}
              x={200 + Math.sin((i * Math.PI) / 2) * 76}
              y={142 - Math.cos((i * Math.PI) / 2) * 76}
              textAnchor="middle"
            >
              {i === 0 ? 12 : i * 3}
            </text>
          ))}
          <path
            data-clock-hour
            className="g014-accent-line"
            d={`M200 135L${h.x} ${h.y}`}
          />
          <path
            data-clock-minute
            className="g014-water-line"
            d={`M200 135L${m.x} ${m.y}`}
          />
          <circle className="g014-current" cx="200" cy="135" r="5" />
          {!civil ? (
            <>
              <path className="g014-line" d="M20 258H380" />
              {[-180, -90, 0, 90, 180].map((x) => (
                <path
                  key={x}
                  className="g014-line"
                  d={`M${20 + (x + 180)} 251V265`}
                />
              ))}
              <circle
                data-source-longitude
                className="g014-node"
                cx={20 + first + 180}
                cy="258"
                r="7"
              />
              <circle
                data-target-longitude
                className="g014-current"
                cx={20 + second + 180}
                cy="258"
                r="7"
              />
            </>
          ) : (
            <g data-utc-ledger>
              <path
                className="g014-accent-line"
                d="M65 250H335M325 240L335 250 325 260"
              />
              {[65, 200, 335].map((x, i) => (
                <g key={x}>
                  <circle className="g014-node" cx={x} cy="250" r="17" />
                  <text className="g014-tick" x={x} y="257" textAnchor="middle">
                    {i + 1}
                  </text>
                </g>
              ))}
            </g>
          )}
        </Diagram>
        <figcaption>
          {civil
            ? "Alt sıra işlem adımlarını gösterir: 1 kaynak saatinden UTC’ye, 2 gerçek süreyi ekle, 3 hedef farkını uygula. Nokta aralığı süre ölçeği değildir."
            : "Boylam ekseni: 180°B → 90°B → 0° → 90°D → 180°D. Uçlardaki iki ad aynı meridyeni gösterir. Kadran hedef yerel saati gösterir."}
        </figcaption>
      </figure>
      <div data-model-result className="g014-result">
        <strong>
          {day} {model.clock}
        </strong>
        {civil ? (
          <>
            <p>Kalkış UTC: {clockAt(arrival.utcStart)}.</p>
            <p>
              {travel} dakika gerçek süre sonrası UTC:{" "}
              {clockAt(arrival.utcArrival)}.
            </p>
            <p>
              Hedef {utc(offsetB)}: {day} {arrival.clock}.
            </p>
            <p>
              Duvar saati farkı: {travel} + ({offsetB}) − ({offsetA}) ={" "}
              {arrival.wallDifference} dakika. UTC dönüşümü gün taşmasını
              içerir; aynı geçiş için ayrıca tarih çizgisi düzeltmesi
              uygulanmaz.
            </p>
          </>
        ) : (
          <>
            <p>
              {long(first)} → {long(second)}; işaretli boylam farkı{" "}
              {solar.difference}°.
            </p>
            <p>
              {solar.difference} × 4 = {solar.minuteDifference} dakika.
            </p>
            <p>
              {solar.dateContextRequired
                ? "Sınır bağlamı: bu Greenwich’e göre seçilmiş cebirsel gösterimdir. Sivil takvim için tarih çizgisinin tarafı ve zaman dilimi ayrıca gerekir; iki 180° yazımı aynı fiziksel meridyendir."
                : "Bu bir yerel güneş saati okul hesabıdır. Ülkelerin ortak/sivil saatini otomatik vermez."}
            </p>
          </>
        )}
      </div>
      {civil ? (
        <Prediction
          id={`${id}-civil`}
          signature={`${offsetA}:${offsetB}:${travel}:${hour}:${minute}`}
          expected={
            arrival.dayOffset < 0
              ? "before"
              : arrival.dayOffset > 0
                ? "after"
                : "same"
          }
          options={[
            ["before", "Önceki günlerde"],
            ["same", "Aynı günde"],
            ["after", "Sonraki günlerde"],
          ]}
          explanation={`Kaynak gösterimine göre sonuç ${day.toLocaleLowerCase("tr-TR")} ${arrival.clock}. Gerçek yol süresi ${travel} dakikadır; duvar saatindeki fark süreyle aynı nicelik değildir.`}
        />
      ) : (
        <Prediction
          id={id}
          signature={`${first}:${second}:${hour}:${minute}`}
          expected={direction}
          options={[
            ["ahead", "Hedef ileri"],
            ["behind", "Hedef geri"],
            ["same", "Fark yok"],
          ]}
          explanation={`İşaretli fark ${solar.difference}° ve ${solar.minuteDifference} dakikadır. Hedefin sayısal saat yönünü bu işaret belirler; gece yarısı geçişi gün kartında ayrıca izlenir.`}
        />
      )}
    </Frame>
  );
}

function Atmosphere() {
  const id = "atmosfer-katmanlari";
  const [s, set] = useExploration(`forge014-geo-${id}`, {
    height: 30,
    water: 0,
  });
  const height = num(s.height, 0, 700),
    water = num(s.water, 0, 4),
    model = atmosphere014State(height, water);
  const bands = [235, 195, 155, 115, 45, 15],
    nodes = [
      [0, 15],
      [13, -55],
      [50, 0],
      [85, -90],
      [600, 1000],
      [700, 1000],
    ];
  const plotY = (h: number) => {
    const i = atmosphere014State(h, 0).index;
    return (
      bands[i] +
      ((h - atmosphere014Layers[i].from) /
        (atmosphere014Layers[i].to - atmosphere014Layers[i].from)) *
        (bands[i + 1] - bands[i])
    );
  };
  return (
    <Frame
      id={id}
      title="Yüksekliği ve karışımı keşfet"
      intro="Yükseklik sürgüsü yaklaşık sıcaklık katmanını; nem sürgüsü toplam karışımın paydasını değiştirir. Bunlar iki ayrı incelemedir: yükseklik tek başına burada nemi belirlemez."
    >
      <div className="g014-grid">
        <Range
          label="Yükseklik (km)"
          value={height}
          min={0}
          max={700}
          onChange={(v) => set({ height: v })}
        />
        <Range
          label="Su buharı (hacim %)"
          value={water}
          min={0}
          max={4}
          onChange={(v) => set({ water: v })}
        />
      </div>
      <figure>
        <Diagram
          title={`${height} km: yaklaşık ${model.layer.label}`}
          height={360}
          description="Katmanlar okunabilirlik için farklı düşey ölçeklerde bantlara ayrılır; bant kalınlığı kilometreyle orantılı değildir. Solda katman işareti, sağda şematik sıcaklık çizgisi vardır. Tam sınırlar ve sonuçlar metinde de verilmiştir."
        >
          {atmosphere014Layers.map((layer, i) => (
            <g key={layer.label}>
              <rect
                data-atmosphere-layer={i}
                className={
                  i === model.index ? "g014-layer-selected" : "g014-layer"
                }
                x="28"
                y={bands[i + 1]}
                width="120"
                height={bands[i] - bands[i + 1]}
              />
              <text className="g014-tick" x="166" y={bands[i] + 6}>
                {layer.from}
              </text>
            </g>
          ))}
          <text className="g014-tick" x="166" y="20">
            700
          </text>
          <text className="g014-tick" x="165" y="268">
            km
          </text>
          <path className="g014-line" d="M230 15V235H385" />
          <g data-temperature-axis>
            <path className="g014-line" d="M240 230V240M370 230V240" />
            <text className="g014-tick" x="240" y="268" textAnchor="middle">
              −100
            </text>
            <text className="g014-tick" x="368" y="268" textAnchor="middle">
              1000
            </text>
            <text className="g014-tick" x="305" y="290" textAnchor="middle">
              T (°C)
            </text>
          </g>
          <polyline
            className="g014-accent-line"
            points={nodes
              .map(([h, t]) => `${240 + ((t + 100) / 1100) * 130},${plotY(h)}`)
              .join(" ")}
          />
          <circle
            data-atmosphere-marker
            className="g014-current"
            cx="88"
            cy={plotY(height)}
            r="8"
          />
          <circle
            data-atmosphere-temperature
            className="g014-current"
            cx={240 + ((model.temperature + 100) / 1100) * 130}
            cy={plotY(height)}
            r="5"
          />
          <g data-air-composition>
            {[model.nitrogen, model.oxygen, model.other, model.water].map(
              (share, i, parts) => (
                <rect
                  key={i}
                  data-air-component={i}
                  className={`g014-air-part g014-air-part-${i}`}
                  x={20 + parts.slice(0, i).reduce((a, b) => a + b, 0) * 3.6}
                  y="300"
                  width={share * 3.6}
                  height="30"
                />
              ),
            )}
          </g>
        </Diagram>
        <figcaption>
          Sol: yaklaşık katman sınırları; sağ: sıcaklığın yönünü gösteren
          şematik profil. Bant kalınlıkları eş ölçekli değildir. Sayısal profil
          gerçek bir anlık atmosfer ölçümü değildir.
        </figcaption>
      </figure>
      <div data-model-result className="g014-result">
        <strong>{model.layer.label}</strong>
        <p>
          {height} km; seçili şema aralığı yaklaşık {model.layer.from}–
          {model.layer.to} km. {model.layer.note}
        </p>
        <p>
          Şematik sıcaklık: {fmt(model.temperature, 1)}°C. Gerçek değerler
          enlem, mevsim ve koşullarla değişir.
        </p>
        <p>
          Karışım: azot %{fmt(model.nitrogen)}, oksijen %{fmt(model.oxygen)},
          diğer kuru gazlar %{fmt(model.other)}, su buharı %{water}.
        </p>
        <p>
          Kuru hava payı %{100 - water}; bileşim hesabı bu paya uygulanır.
          Yüzdeler hacim/mol payı yaklaşımıdır, kütle yüzdesi değildir. Ozon ve
          iyonosfer ayrı saf gaz kabukları değildir.
        </p>
      </div>
      <ul className="g014-legend">
        {atmosphere014Layers.map((layer) => (
          <li key={layer.label}>
            {layer.label}: yaklaşık {layer.from}–{layer.to} km
            {layer.from === 600 ? " ve ötesine kademeli geçiş" : ""}.
          </li>
        ))}
      </ul>
      <Prediction
        id={id}
        signature={`${height}:${water}`}
        expected={String(model.index)}
        options={atmosphere014Layers.map((r, i) => [String(i), r.label])}
        explanation={`${height} km, seçilen yaklaşık şemada ${model.layer.label} bandındadır. Sınırlar evrensel sabit değildir; su buharı oranının değişmesi katman sınıfını otomatik değiştirmez.`}
      />
    </Frame>
  );
}
function Temperature() {
  const id = "cografya-sicaklik";
  const [s, set] = useExploration(`forge014-geo-${id}`, {
    measured: 12,
    height: 1200,
    normal: true,
  });
  const height = num(s.height, 0, 4000),
    measured = num(s.measured, -40, 50),
    model = reducedTemperature(measured, height, s.normal);
  const topY = 230 - (height / 4000) * 180;
  return (
    <Frame
      id={id}
      title="Yükseltinin etkisini ayır"
      intro="Ölçülen değeri ve yükseltiyi seç. Normal okul yaklaşımında her 200 m için 1°C düzeltme kullanılır; inversiyon seçilirse bu sabit oranla sayı üretmek uygun değildir."
    >
      <div className="g014-grid">
        <Range
          label="Ölçülen sıcaklık (°C)"
          value={measured}
          min={-40}
          max={50}
          onChange={(v) => set({ measured: v })}
        />
        <Range
          label="İstasyon yüksekliği (m)"
          value={height}
          min={0}
          max={4000}
          step={100}
          onChange={(v) => set({ height: v })}
        />
      </div>
      <label className="g014-check">
        <input
          type="checkbox"
          checked={s.normal}
          onChange={(e) => set({ normal: e.target.checked })}
        />{" "}
        Normal yaklaşım geçerli
      </label>
      <figure>
        <Diagram
          title="Gerçek ölçüm ve deniz seviyesine indirgeme"
          description="Dağ yamacındaki işaret seçili yükseltiye bağlı hareket eder. Deniz seviyesi hesap noktası ayrıdır; ölçüm noktası fiziksel olarak aşağı taşınmaz."
        >
          <path className="g014-land" d="M25 230L190 45 350 230Z" />
          <path className="g014-water-line" d="M15 235H385" />
          <path className="g014-line" d="M360 230V50" />
          {[0, 1000, 2000, 3000, 4000].map((h) => (
            <g key={h}>
              <path
                className="g014-line"
                d={`M355 ${230 - (h / 4000) * 180}H365`}
              />
              <text
                className="g014-tick"
                x="348"
                y={236 - (h / 4000) * 180}
                textAnchor="end"
              >
                {h}
              </text>
            </g>
          ))}
          <circle
            data-temperature-station
            className="g014-current"
            cx={25 + ((230 - topY) / 185) * 165}
            cy={topY}
            r="9"
          />
          <path
            className={s.normal ? "g014-link" : "g014-dashed"}
            d={`M${25 + ((230 - topY) / 185) * 165} ${topY}Q195 250 300 235`}
          />
        </Diagram>
        <figcaption>
          Düşey eksen metre cinsindendir. Deniz seviyesindeki bağlantı bir hesap
          işlemidir; dağın veya ölçümün gerçekten yer değiştirmesi değildir.
        </figcaption>
      </figure>
      <div data-model-result className="g014-result">
        {model.reduced === null ? (
          <>
            <strong>Ek profil gerekli</strong>
            <p>
              Normal yaklaşım kapalı: inversiyon veya başka koşulda 200 m’de 1°C
              oranıyla indirgenmiş değer verilmiyor.
            </p>
          </>
        ) : (
          <>
            <strong>İndirgenmiş: {fmt(model.reduced)}°C</strong>
            <p>
              {fmt(measured)} + {fmt(height)} / 200 = {fmt(model.reduced)}°C.
            </p>
          </>
        )}
        <p>
          Gerçek ölçüm: {fmt(measured)}°C; yükselti: {fmt(height)} m. İndirgeme,
          enlem ve denizellik gibi diğer bütün etkenleri kaldırmaz.
        </p>
      </div>
      <Prediction
        id={id}
        signature={`${measured}:${height}:${s.normal}`}
        expected={!s.normal ? "unknown" : height === 0 ? "same" : "higher"}
        options={[
          ["higher", "Hesap değeri artar"],
          ["same", "Düzeltme yok"],
          ["unknown", "Ek profil gerekir"],
        ]}
        explanation={
          !s.normal
            ? "İnversiyon koşulunda genel düşüm oranını zorlamak yerine sıcaklık profilini istemek gerekir."
            : height === 0
              ? "İstasyon deniz seviyesinde: yükselti düzeltmesi sıfırdır."
              : `Verilen yaklaşımda denize indirirken ${fmt(height / 200)}°C eklenir. Bu, gerçek ölçümün fiziksel olarak değiştiği anlamına gelmez.`
        }
      />
    </Frame>
  );
}
function Wind() {
  const id = "basinc-ruzgarlar";
  const [s, set] = useExploration(`forge014-geo-${id}`, {
    mode: "gradient",
    first: 1020,
    second: 1000,
    distance: 100,
    hemisphere: "north",
    day: true,
    descent: 1000,
    top: 5,
  });
  const mode = ["gradient", "coast", "foehn"].includes(s.mode)
      ? s.mode
      : "gradient",
    first = num(s.first, 900, 1100),
    second = num(s.second, 900, 1100),
    distance = num(s.distance, 10, 1000),
    descent = num(s.descent, 0, 3000),
    top = num(s.top, -30, 30);
  const model = pressure014Gradient(first, second, distance),
    foehn = foehn014Descent(top, descent),
    north = s.hemisphere !== "south";
  const leftToRight =
    mode === "coast" ? s.day : mode === "foehn" ? true : first > second;
  const equal = mode === "gradient" && first === second,
    sign = leftToRight ? 1 : -1,
    bend = (north ? 1 : -1) * sign;
  const expected =
    mode === "gradient"
      ? equal
        ? "none"
        : first > second
          ? "a-b"
          : "b-a"
      : mode === "coast"
        ? s.day
          ? "sea-land"
          : "land-sea"
        : "compression";
  const options: readonly (readonly [string, string])[] =
    mode === "gradient"
      ? [
          ["a-b", "A’dan B’ye kuvvet"],
          ["b-a", "B’den A’ya kuvvet"],
          ["none", "Basınç farkı yok"],
        ]
      : mode === "coast"
        ? [
            ["sea-land", "Denizden karaya"],
            ["land-sea", "Karadan denize"],
          ]
        : [
            ["compression", "Sıkışarak ısınma"],
            ["friction", "Yamaçla sürtünme"],
          ];
  const path =
    mode === "foehn"
      ? "M60 205Q135 120 200 55Q265 140 345 205"
      : mode === "gradient"
        ? `M${leftToRight ? 92 : 308} 150Q200 ${150 + bend * 65} ${leftToRight ? 308 : 92} 150`
        : `M${leftToRight ? 60 : 340} 150H${leftToRight ? 340 : 60}`;
  return (
    <Frame
      id={id}
      title="Farkı ve hareketi karşılaştır"
      intro="Basınç farkı, kıyı meltemi ve kuru alçalma üç ayrı modeldir. Görsel okları değiştir; sayının hangi koşullarda hesaplanabildiğini metin sonucuyla denetle."
    >
      <Choice
        label="İnceleme"
        value={mode}
        options={[
          ["gradient", "Basınç farkı"],
          ["coast", "Kıyı meltemi"],
          ["foehn", "Kuru alçalma"],
        ]}
        onChange={(mode) => set({ mode })}
      />
      {mode === "gradient" && (
        <>
          <div className="g014-grid">
            <Range
              label="A basıncı (hPa)"
              value={first}
              min={900}
              max={1100}
              onChange={(v) => set({ first: v })}
            />
            <Range
              label="B basıncı (hPa)"
              value={second}
              min={900}
              max={1100}
              onChange={(v) => set({ second: v })}
            />
            <Range
              label="Uzaklık (km)"
              value={distance}
              min={10}
              max={1000}
              step={10}
              onChange={(v) => set({ distance: v })}
            />
          </div>
          <Choice
            label="Yarımküre"
            value={north ? "north" : "south"}
            options={[
              ["north", "Kuzey"],
              ["south", "Güney"],
            ]}
            onChange={(hemisphere) => set({ hemisphere })}
          />
        </>
      )}
      {mode === "coast" && (
        <label className="g014-check">
          <input
            type="checkbox"
            checked={s.day}
            onChange={(e) => set({ day: e.target.checked })}
          />{" "}
          Gündüz koşulu
        </label>
      )}
      {mode === "foehn" && (
        <div className="g014-grid">
          <Range
            label="Tepe sıcaklığı (°C)"
            value={top}
            min={-30}
            max={30}
            onChange={(v) => set({ top: v })}
          />
          <Range
            label="Alçalma (m)"
            value={descent}
            min={0}
            max={3000}
            step={100}
            onChange={(v) => set({ descent: v })}
          />
        </div>
      )}
      <figure>
        <Diagram
          title={`Seçili rüzgâr incelemesi: ${mode === "gradient" ? "basınç farkı" : mode === "coast" ? "kıyı meltemi" : "kuru alçalma"}`}
          description="Okun yönü seçilen basınç veya gündüz-gece koşuluna bağlıdır. Basınç modundaki eğrilik yalnız yarımküreye göre sapmanın yönünü öğretir, gerçek hava yörüngesi veya hız hesabı değildir."
        >
          {mode === "gradient" ? (
            <>
              <circle className="g014-node" cx="60" cy="150" r="32" />
              <circle className="g014-node" cx="340" cy="150" r="32" />
              <text className="g014-tick" x="60" y="157" textAnchor="middle">
                A
              </text>
              <text className="g014-tick" x="340" y="157" textAnchor="middle">
                B
              </text>
              <path className="g014-line" d="M60 245H340" />
              <text className="g014-tick" x="200" y="270" textAnchor="middle">
                {distance} km
              </text>
            </>
          ) : mode === "coast" ? (
            <>
              <path className="g014-water-fill" d="M10 220H200V270H10Z" />
              <path
                className="g014-land"
                d="M200 220L260 195 390 220V270H200Z"
              />
              <text className="g014-tick" x="90" y="256" textAnchor="middle">
                Deniz
              </text>
              <text className="g014-tick" x="290" y="256" textAnchor="middle">
                Kara
              </text>
            </>
          ) : (
            <>
              <path className="g014-land" d="M20 235L200 55 380 235Z" />
              <text className="g014-tick" x="200" y="32" textAnchor="middle">
                {top}°C
              </text>
              <text className="g014-tick" x="335" y="265" textAnchor="middle">
                {fmt(foehn.finalTemperature)}°C
              </text>
            </>
          )}
          {!equal && (
            <g data-wind-arrow data-direction={leftToRight ? "right" : "left"}>
              <path className="g014-accent-line" d={path} />
              <path
                className="g014-accent-line"
                d={
                  mode === "foehn"
                    ? "M325 190L345 205 322 208"
                    : mode === "gradient"
                      ? leftToRight
                        ? "M292 138L308 150 292 162"
                        : "M108 138L92 150 108 162"
                      : leftToRight
                        ? "M324 138L340 150 324 162"
                        : "M76 138L60 150 76 162"
                }
              />
            </g>
          )}
        </Diagram>
        <figcaption>
          {mode === "gradient"
            ? `A: ${first} hPa; B: ${second} hPa; uzaklık ${distance} km. Eğrilik hareketin ${north ? "sağına" : "soluna"} sapma fikrini gösterir; okun eğimi sayısal hız değildir.`
            : mode === "coast"
              ? "Solda deniz, sağda kara. İdeal yerel model; kuvvetli genel dolaşımın baskın olmadığı kabul edilir."
              : "Kuru hava için verilen 100 m’de 1°C ısınma yaklaşımı; gerçek Föhn olayının bütün nem süreci hesaplanmıyor."}
        </figcaption>
      </figure>
      <div data-model-result className="g014-result">
        {mode === "gradient" ? (
          <>
            <strong>Gradyan: {fmt(model.magnitude, 3)} hPa/km</strong>
            <p>
              {model.direction}; |{first} − {second}| / {distance} ={" "}
              {fmt(model.magnitude, 3)}.
            </p>
            <p>
              Yalnız bu verilerle gerçek rüzgâr hızı bulunamaz.{" "}
              {north ? "Kuzeyde hareketin sağına" : "Güneyde hareketin soluna"}{" "}
              Coriolis sapması; yüzey sürtünmesi ayrı etkidir.
            </p>
          </>
        ) : mode === "coast" ? (
          <>
            <strong>{s.day ? "Denizden karaya" : "Karadan denize"}</strong>
            <p>
              {s.day
                ? "Gündüz kara daha hızlı ısınarak göreli alçak; deniz görece yüksek basınçlı olur."
                : "Gece kara daha hızlı soğuyarak göreli yüksek; deniz görece alçak basınçlı olur."}
            </p>
          </>
        ) : (
          <>
            <strong>Son sıcaklık: {fmt(foehn.finalTemperature)}°C</strong>
            <p>
              {top} + {descent} / 100 = {fmt(foehn.finalTemperature)}°C. Alçalan
              kuru hava sıkışarak adiyabatik ısınır; temel açıklama yamaç
              sürtünmesi değildir.
            </p>
          </>
        )}
      </div>
      <Prediction
        id={id}
        signature={`${mode}:${first}:${second}:${distance}:${north}:${s.day}:${descent}:${top}`}
        expected={expected}
        options={options}
        explanation={
          mode === "gradient"
            ? `${model.direction}. Yönü basınç farkı belirler; gradyan ${fmt(model.magnitude, 3)} hPa/km’dir ve hız değildir.`
            : mode === "coast"
              ? s.day
                ? "Gündüz deniz göreli yüksek, kara göreli alçak: yüzeyde denizden karaya akış."
                : "Gece kara göreli yüksek, deniz göreli alçak: yüzeyde karadan denize akış."
              : "Alçalırken artan çevre basıncı sıkışmayı ve adiyabatik ısınmayı açıklar. Bu süreç sürtünmeyle özdeş değildir."
        }
      />
    </Frame>
  );
}
function Humidity() {
  const id = "nem-yagis";
  const [s, set] = useExploration(`forge014-geo-${id}`, {
    total: 10,
    saturation: 20,
    process: 0,
  });
  const total = num(s.total, 0, 40),
    saturation = num(s.saturation, 1, 40),
    index = num(s.process, 0, 2),
    model = humidity014Balance(total, saturation),
    process = rainfall014Processes[index];
  const fraction = model.total === 0 ? 0 : model.condensed / model.total;
  const path =
    index === 0
      ? "M35 225Q115 210 200 60"
      : index === 1
        ? "M200 225V70"
        : "M45 220Q150 210 325 65";
  return (
    <Frame
      id={id}
      title="Su miktarını ve yükselmeyi izle"
      intro="Birinci model kapalı, sabit hacimli 1 m³ ortamın su bütçesidir. Doyma miktarı sıcaklıkla ilişkili bir girdidir; sürgüdeki g/m³ değeri °C değildir. İkinci model yükselmenin nedenini karşılaştırır."
    >
      <div className="g014-grid">
        <Range
          label="Toplam su (g/m³)"
          value={total}
          min={0}
          max={40}
          onChange={(v) => set({ total: v })}
        />
        <Range
          label="Doyma miktarı (g/m³)"
          value={saturation}
          min={1}
          max={40}
          onChange={(v) => set({ saturation: v })}
        />
      </div>
      <figure>
        <Diagram
          title={`Su dengesi: ${fmt(model.vapor)} buhar, ${fmt(model.condensed)} yoğuşmuş`}
          description="Kap içindeki alt sıvı şeridi yoğunlaşan su payını, noktalar buharın temsili varlığını gösterir. Gerçek gaz molekülleri gözle görülmez. Nokta sayısı molekül sayısı veya gram ölçeği değildir."
          height={240}
        >
          <rect
            className="g014-node"
            x="65"
            y="20"
            width="270"
            height="195"
            rx="12"
          />
          <rect
            data-condensed-water
            className="g014-water-fill"
            x="68"
            y={212 - fraction * 120}
            width="264"
            height={fraction * 120}
          />
          {Array.from(
            { length: Math.min(24, Math.ceil(model.vapor)) },
            (_, i) => (
              <circle
                key={i}
                className="g014-vapor"
                cx={85 + (i % 6) * 44}
                cy={42 + Math.floor(i / 6) * 30}
                r="4"
              />
            ),
          )}
          <path
            className="g014-accent-line"
            d={`M350 ${212 - (model.saturation / 40) * 180}H380`}
          />
        </Diagram>
        <figcaption>
          Sabit 1 m³ ve denge kabulü. Sıvı şeridi toplam suyun yoğunlaşmış
          payına bağlıdır; yan çizgi doyma girdisinin konumunu gösterir. Şerit
          gerçek sıvı yüksekliği değildir. Toplam madde buhar + yoğuşmuş sudur.
        </figcaption>
      </figure>
      <div data-model-result className="g014-result">
        <strong>Bağıl nem: %{fmt(model.relative)}</strong>
        <p>
          Buhar: {fmt(model.vapor)} g/m³; yoğuşmuş su: {fmt(model.condensed)}{" "}
          g/m³.
        </p>
        <p>
          {fmt(model.vapor)} + {fmt(model.condensed)} = {total} g/m³; toplam
          korunur.
        </p>
        <p>
          {model.saturated
            ? "Denge modelinde doyma eşiğine ulaşıldı. Fazla su varsa yoğunlaşır; bu durum tek başına kentin üzerinde yağmur garantilemez."
            : "Doyma eşiğinin altında. Doyma miktarı düşerse aynı toplam suyla bağıl nem yükselebilir."}
        </p>
      </div>
      <Choice
        label="Yükselme nedeni"
        value={String(index)}
        options={rainfall014Processes.map((r, i) => [String(i), r.label])}
        onChange={(v) => set({ process: Number(v) })}
      />
      <figure>
        <Diagram
          title={`${process.label} yükselmesi`}
          description={process.cause}
        >
          {index === 0 ? (
            <path className="g014-land" d="M10 245L200 60 390 245Z" />
          ) : index === 1 ? (
            <>
              <path className="g014-land" d="M10 245H390V275H10Z" />
              <path
                className="g014-accent-line"
                d="M80 260V235M200 260V235M320 260V235"
              />
            </>
          ) : (
            <>
              <path className="g014-water-fill" d="M10 245L325 65V275H10Z" />
              <path className="g014-dashed" d="M10 245L325 65" />
            </>
          )}
          <path data-rain-rise={index} className="g014-accent-line" d={path} />
          <path
            className="g014-cloud"
            d="M175 70C160 55 175 35 192 40C205 18 238 25 242 45C265 35 280 58 265 73Z"
          />
        </Diagram>
        <figcaption>
          {process.cause} {process.limit}
        </figcaption>
      </figure>
      <ol className="g014-legend">
        {process.chain.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <Prediction
        id={id}
        signature={`${total}:${saturation}:${index}`}
        expected={
          model.condensed > 0
            ? "condensed"
            : model.saturated
              ? "saturated"
              : "below"
        }
        options={[
          ["below", "Doyma altında"],
          ["saturated", "Tam sınırda"],
          ["condensed", "Yoğuşmuş su var"],
        ]}
        explanation={`Toplam ${total}, doyma ${saturation} g/m³: ${fmt(model.vapor)} g/m³ buhar ve ${fmt(model.condensed)} g/m³ yoğuşmuş su. Sayısal sonuç kapalı sabit hacimli denge varsayımına bağlıdır.`}
      />
    </Frame>
  );
}
export default function Forge014GeographyLab({
  lessonId,
}: {
  lessonId: string;
}) {
  switch (lessonId) {
    case "doga-insan-cografya":
      return <Valley />;
    case "cografyanin-tarihi-gelisimi":
      return <History />;
    case "yerel-saat":
      return <Clock />;
    case "atmosfer-katmanlari":
      return <Atmosphere />;
    case "cografya-sicaklik":
      return <Temperature />;
    case "basinc-ruzgarlar":
      return <Wind />;
    case "nem-yagis":
      return <Humidity />;
    default:
      return null;
  }
}
