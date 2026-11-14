import OttomanWorkshop from "./OttomanWorkshop";
import { useExploration } from "./useExploration";
import { ModelNumber } from "./ModelNumber";
import { AtomCounter } from "./AtomCounter";
import { DivisionModel, CommonNumberModel } from "./DivisionModels";
import { EnergyModel } from "./EnergyModel";
import { SoundModel, WordStructureModel } from "./WordModels";
import { clampInt } from "./mathModels";
import {
  chainParts,
  centuryInfo,
  density,
  digitParts,
  motionSteps,
} from "./narrativeCalculations";
const fmt = (value: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 }).format(value);
function ChainBuilder({ id }: { id: string }) {
  const [saved, set] = useExploration(`chain:${id}`, { total: 6, chains: 1 });
  const total = clampInt(saved.total, 1, 16),
    chains = clampInt(saved.chains, 1, Math.min(4, total)),
    model = chainParts(total, chains),
    protein = id === "proteinler";
  let offset = 0;
  return (
    <section className="concept-model" aria-label="Bağ ve su sayacı">
      <h3>Zinciri kur, bağları say</h3>
      <p>
        Toplam birim sayısını ve ayrı zincir sayısını değiştir. Halkasız, ayrı
        zincirleri sayıyoruz.
      </p>
      <ModelNumber
        label={protein ? "Amino asit sayısı" : "Monosakkarit sayısı"}
        min={1}
        max={16}
        value={total}
        onChange={(n) => set({ total: n, chains: Math.min(chains, n) })}
      />
      <ModelNumber
        label="Ayrı zincir sayısı"
        min={1}
        max={Math.min(4, total)}
        value={chains}
        onChange={(n) => set({ chains: n })}
      />
      <svg
        viewBox={`0 0 820 ${model.rows.length * 65 + 15}`}
        role="img"
        aria-label={`${total} birim, ${chains} zincir ve ${model.bonds} ${protein ? "peptit" : "glikozit"} bağı`}
      >
        {model.rows.map((count, row) => {
          const start = offset;
          offset += count;
          return (
            <g key={row}>
              {Array.from({ length: count }, (_, i) => {
                const x = 30 + i * 48,
                  y = 35 + row * 65;
                return (
                  <g key={i}>
                    {i > 0 && (
                      <line
                        x1={x - 30}
                        y1={y}
                        x2={x - 17}
                        y2={y}
                        stroke="var(--accent)"
                        strokeWidth="3"
                      />
                    )}
                    {protein ? (
                      <circle
                        cx={x}
                        cy={y}
                        r="17"
                        fill="var(--surface-2)"
                        stroke="var(--mint)"
                        strokeWidth="2"
                      />
                    ) : (
                      <polygon
                        points={`${x - 17},${y} ${x - 9},${y - 15} ${x + 9},${y - 15} ${x + 17},${y} ${x + 9},${y + 15} ${x - 9},${y + 15}`}
                        fill="var(--surface-2)"
                        stroke="var(--mint)"
                        strokeWidth="2"
                      />
                    )}
                    <text
                      x={x}
                      y={y + 4}
                      fill="var(--text)"
                      textAnchor="middle"
                      fontSize="10"
                    >
                      {start + i + 1}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
      <p className="model-result">
        <strong>
          {total} − {chains} = {model.bonds} {protein ? "peptit" : "glikozit"}{" "}
          bağı
        </strong>
      </p>
      <p>
        TYT sayımında sentez sırasında {model.bonds} su açığa çıkar; bütün bu
        bağların hidrolizinde {model.bonds} su kullanılır.
      </p>
      <p className="small muted">
        Şekiller birimleri saydırır; atomik geometri veya gerçek molekül boyutu
        göstermez. Halka ve çapraz bağ yoktur.
      </p>
    </section>
  );
}
function WaterModel() {
  const [saved, set] = useExploration("water-ph", { ph: 7 });
  const ph = clampInt(saved.ph, 0, 14),
    power = 7 - ph;
  return (
    <section className="concept-model" aria-label="pH keşfi">
      <h3>pH’ı değiştir</h3>
      <ModelNumber
        label="pH"
        min={0}
        max={14}
        value={ph}
        onChange={(n) => set({ ph: n })}
      />
      <svg
        viewBox="0 0 520 90"
        role="img"
        aria-label={`pH ${ph}: ${ph < 7 ? "asidik" : ph > 7 ? "bazik" : "nötr"}`}
      >
        <line
          x1="25"
          y1="35"
          x2="495"
          y2="35"
          stroke="var(--muted)"
          strokeWidth="4"
        />
        {[0, 7, 14].map((v) => (
          <g key={v}>
            <line
              x1={25 + (v / 14) * 470}
              y1="28"
              x2={25 + (v / 14) * 470}
              y2="45"
              stroke="var(--text)"
            />
            <text
              x={25 + (v / 14) * 470}
              y="68"
              textAnchor="middle"
              fill="var(--text)"
              fontSize="13"
            >
              {v}
            </text>
          </g>
        ))}
        <circle
          className="model-marker"
          cx={25 + (ph / 14) * 470}
          cy="35"
          r="9"
          fill="var(--accent)"
        />
      </svg>
      <p className="model-result">
        <strong>{ph < 7 ? "Asidik" : ph > 7 ? "Bazik" : "Nötr"}</strong> · H⁺
        derişimi pH 7’ye göre 10<sup>{power}</sup> kat.
      </p>
      <p>
        {power > 0
          ? `${power} birim daha küçük pH, 10’un ${power}. kuvveti kadar daha yüksek H⁺ derişimidir.`
          : power < 0
            ? `${-power} birim daha büyük pH, H⁺ derişiminin 10’un ${-power}. kuvvetine bölünmesi demektir.`
            : "Karşılaştırma noktası aynı olduğundan oran 1’dir."}
      </p>
      <p className="small muted">
        25 °C’de sulu çözelti varsayımı. Bu, asit kuvveti veya vücudun belirli
        bir organı için güvenli pH aralığı ölçümü değildir.
      </p>
    </section>
  );
}
function PlaceValue() {
  const [saved, set] = useExploration("place-value", {
    value: 407,
    selected: 0,
  });
  const value = clampInt(saved.value, 0, 9999),
    parts = digitParts(value),
    selected = clampInt(saved.selected, 0, parts.length - 1),
    part = parts[selected];
  return (
    <section className="concept-model" aria-label="Basamak çözümleme">
      <h3>Rakamın yerini gör</h3>
      <ModelNumber
        label="Onluk doğal sayı"
        min={0}
        max={9999}
        value={value}
        onChange={(n) => set({ value: n, selected: 0 })}
      />
      <div className="walk-scenarios">
        {[407, 5072, 205, 40].map((n) => (
          <button
            className="secondary"
            key={n}
            onClick={() => set({ value: n, selected: 0 })}
          >
            {n}
          </button>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${parts.length * 115 + 20} 145`}
        role="img"
        aria-label={parts
          .map((p) => `${p.digit} çarpı ${p.weight} eşittir ${p.contribution}`)
          .join(", ")}
      >
        {parts.map((p, i) => (
          <g key={p.power}>
            <rect
              x={10 + i * 115}
              y="15"
              width="100"
              height="110"
              rx="8"
              fill="var(--surface-2)"
              stroke={i === selected ? "var(--accent)" : "var(--border)"}
              strokeWidth="2"
            />
            <text
              x={60 + i * 115}
              y="62"
              textAnchor="middle"
              fill="var(--text)"
              fontSize="28"
            >
              {p.digit}
            </text>
            <text
              x={60 + i * 115}
              y="91"
              textAnchor="middle"
              fill="var(--muted)"
              fontSize="13"
            >
              × {p.weight}
            </text>
          </g>
        ))}
      </svg>
      <div className="walk-node-controls">
        {parts.map((p, i) => (
          <button
            key={p.power}
            className="secondary"
            aria-pressed={i === selected}
            onClick={() => set({ selected: i })}
          >
            {p.weight}’ler basamağı
          </button>
        ))}
      </div>
      <p className="model-result">
        <strong>
          Sayı değeri: {part.digit} · Basamak değeri: {part.digit} ×{" "}
          {part.weight} = {part.contribution}
        </strong>
      </p>
      <p>
        {value} = {parts.map((p) => `${p.digit}×${p.weight}`).join(" + ")}.
        Rakam toplamı: {parts.reduce((sum, p) => sum + p.digit, 0)}.
      </p>
      <p className="small muted">
        Kutular konumu gösterir; alanları rakamların büyüklükleriyle orantılı
        değildir. Baştaki sıfırlar sayı değerine yeni basamak katmaz.
      </p>
    </section>
  );
}
function Century() {
  const [saved, set] = useExploration("century", { year: 1923, before: false });
  const year = clampInt(saved.year, 1, 9999),
    model = centuryInfo(year, saved.before),
    era = saved.before ? "MÖ" : "MS";
  return (
    <section className="concept-model" aria-label="Yüzyıl ve çeyrek hesabı">
      <h3>Tarihi doğru yüzyıla yerleştir</h3>
      <div className="walk-scenarios">
        <button
          className="secondary"
          aria-pressed={saved.before}
          onClick={() => set({ before: true })}
        >
          Milattan önce
        </button>
        <button
          className="secondary"
          aria-pressed={!saved.before}
          onClick={() => set({ before: false })}
        >
          Milattan sonra
        </button>
      </div>
      <ModelNumber
        label="Tarih yılı"
        min={1}
        max={9999}
        value={year}
        onChange={(n) => set({ year: n })}
      />
      <svg
        viewBox="0 0 520 110"
        role="img"
        aria-label={`${era} ${year}, ${model.century}. yüzyılın ${model.quarter}. çeyreği`}
      >
        {[1, 2, 3, 4].map((q) => (
          <g key={q}>
            <rect
              x={15 + (q - 1) * 125}
              y="20"
              width="115"
              height="60"
              fill={q === model.quarter ? "var(--mint)" : "var(--surface-2)"}
              stroke="var(--border)"
            />
            <text
              x={72 + (q - 1) * 125}
              y="55"
              textAnchor="middle"
              fontSize="13"
              fill={q === model.quarter ? "var(--bg)" : "var(--text)"}
            >
              {q}. çeyrek
            </text>
          </g>
        ))}
      </svg>
      <p className="model-result">
        <strong>
          {era} {year}: {model.century}. yüzyıl, {model.half}. yarı,{" "}
          {model.quarter}. çeyrek
        </strong>
      </p>
      <p>
        Bu yüzyıl {era} {model.start} ile {era} {model.end} arasındadır.
        Kronolojik ilerleyişte{" "}
        {saved.before ? "yıl sayıları küçülür" : "yıl sayıları büyür"}.
      </p>
      <p className="small muted">
        Geleneksel MÖ/MS tarih yazımında yıl 0 yoktur. Bu araç gün/ay veya
        farklı takvimler arasında dönüşüm yapmaz.
      </p>
    </section>
  );
}
function Density() {
  const [saved, set] = useExploration("density", { mass: 200, volume: 100 });
  const mass = clampInt(saved.mass, 10, 1000),
    volume = clampInt(saved.volume, 10, 500),
    rho = density(mass, volume),
    lineVolume = Math.min(500, 1000 / rho);
  return (
    <section className="concept-model" aria-label="Kütle hacim özkütle">
      <h3>Madde miktarı mı, özkütle mi?</h3>
      <ModelNumber
        label="Kütle (g)"
        min={10}
        max={1000}
        value={mass}
        onChange={(n) => set({ mass: n })}
      />
      <ModelNumber
        label="Hacim (cm³)"
        min={10}
        max={500}
        value={volume}
        onChange={(n) => set({ volume: n })}
      />
      <div className="walk-scenarios">
        <button
          className="secondary"
          disabled={mass > 500 || volume > 250}
          onClick={() => set({ mass: mass * 2, volume: volume * 2 })}
        >
          Kütleyi ve hacmi iki katına çıkar
        </button>
        <button
          className="secondary"
          onClick={() => set({ mass: 200, volume: 100 })}
        >
          Örneği sıfırla
        </button>
      </div>
      <svg
        viewBox="0 0 520 150"
        role="img"
        aria-label={`${mass} gram, ${volume} santimetreküp; özkütle ${fmt(rho)} gram bölü santimetreküp`}
      >
        <rect
          x="40"
          y="25"
          width="170"
          height="95"
          fill="var(--surface-2)"
          stroke="var(--mint)"
          strokeWidth="2"
        />
        <text
          x="125"
          y="68"
          textAnchor="middle"
          fill="var(--text)"
          fontSize="20"
        >
          {mass} g
        </text>
        <text
          x="125"
          y="99"
          textAnchor="middle"
          fill="var(--muted)"
          fontSize="16"
        >
          {volume} cm³
        </text>
        <path d="M235 72H290" stroke="var(--muted)" strokeWidth="2" />
        <text
          x="400"
          y="76"
          textAnchor="middle"
          fill="var(--text)"
          fontSize="22"
        >
          {fmt(rho)} g/cm³
        </text>
      </svg>
      <svg
        viewBox="0 0 560 280"
        role="img"
        aria-label={`Kütle hacim grafiği: ${volume} santimetreküp hacimde ${mass} gram; eğim ${fmt(rho)} gram bölü santimetreküp`}
      >
        <path d="M65 20V230H530" fill="none" stroke="var(--muted)" />
        <path
          d={`M65 230L${65 + lineVolume * 0.9} ${230 - lineVolume * rho * 0.2}`}
          stroke="var(--mint)"
          strokeWidth="3"
          fill="none"
        />
        <path
          d={`M65 ${230 - mass * 0.2}H${65 + volume * 0.9}V230`}
          stroke="var(--muted)"
          strokeDasharray="5 4"
          fill="none"
        />
        <circle
          className="model-plot-marker"
          cx={65 + volume * 0.9}
          cy={230 - mass * 0.2}
          r="6"
          fill="var(--accent)"
        />
        <text x="65" y="15" fill="var(--text)" fontSize="13">
          Kütle (g)
        </text>
        <text x="395" y="270" fill="var(--text)" fontSize="13">
          Hacim (cm³)
        </text>
        <text x="50" y="246" fill="var(--muted)" fontSize="12">
          0
        </text>
        <text x="498" y="246" fill="var(--muted)" fontSize="12">
          500
        </text>
        <text x="20" y="35" fill="var(--muted)" fontSize="12">
          1000
        </text>
      </svg>
      <p className="model-result">
        <strong>
          ρ = m/V = {mass}/{volume} = {fmt(rho)} g/cm³
        </strong>
      </p>
      <p>
        Kütle ve hacim aynı oranda artarsa oran korunur. Yalnız birini
        değiştirirsen özkütle de değişir; bu artık aynı koşullardaki aynı
        maddeyi temsil etmek zorunda değildir.
      </p>
      <p>
        Doğrunun eğimi m/V oranıdır. Nokta seçtiğin örneği, doğru aynı
        yoğunluktaki varsayımsal örnekleri gösterir. Eksenler sabittir.
      </p>
      <p className="small muted">
        Dikdörtgen ölçü kabı veya ölçekli cisim çizimi değildir. Aynı madde
        karşılaştırması sıcaklık ve basınç sabit varsayar; değerler özgün
        sayısal örneklerdir.
      </p>
    </section>
  );
}
function Motion() {
  const [saved, set] = useExploration("motion-two-legs", {
    first: 6,
    second: -6,
    t1: 3,
    t2: 3,
  });
  const first = clampInt(saved.first, -20, 20),
    second = clampInt(saved.second, -20, 20),
    t1 = clampInt(saved.t1, 1, 20),
    t2 = clampInt(saved.t2, 1, 20),
    model = motionSteps(first, second, t1, t2),
    scale = 6,
    v1 = first / t1,
    v2 = second / t2;
  return (
    <section className="concept-model" aria-label="Yol ve yer değiştirme">
      <h3>Gidiş ve dönüşü ayrı izle</h3>
      <ModelNumber
        label="Birinci yer değiştirme (m)"
        min={-20}
        max={20}
        value={first}
        onChange={(n) => set({ first: n })}
      />
      <ModelNumber
        label="İkinci yer değiştirme (m)"
        min={-20}
        max={20}
        value={second}
        onChange={(n) => set({ second: n })}
      />
      <ModelNumber
        label="Birinci süre (s)"
        min={1}
        max={20}
        value={t1}
        onChange={(n) => set({ t1: n })}
      />
      <ModelNumber
        label="İkinci süre (s)"
        min={1}
        max={20}
        value={t2}
        onChange={(n) => set({ t2: n })}
      />
      <svg
        viewBox="0 0 560 155"
        role="img"
        aria-label={`Başlangıç 0, ara konum ${first}, son konum ${model.displacement} metre`}
      >
        <path d="M20 90H540" stroke="var(--muted)" />
        {[-40, -20, 0, 20, 40].map((x) => (
          <g key={x}>
            <line
              x1={280 + x * scale}
              y1="85"
              x2={280 + x * scale}
              y2="95"
              stroke="var(--muted)"
            />
            <text
              x={280 + x * scale}
              y="120"
              textAnchor="middle"
              fill="var(--muted)"
              fontSize="12"
            >
              {x} m
            </text>
          </g>
        ))}
        <path
          d={`M280 45H${280 + first * scale}`}
          stroke="var(--mint)"
          strokeWidth="5"
        />
        <path
          d={`M${280 + first * scale} 65H${280 + model.displacement * scale}`}
          stroke="var(--accent)"
          strokeWidth="5"
        />
        {model.positions.map((x, i) => (
          <circle
            key={i}
            cx={280 + x * scale}
            cy={45 + i * 20}
            r="5"
            fill={i === 1 ? "var(--mint)" : "var(--accent)"}
          />
        ))}
      </svg>
      <svg
        viewBox="0 0 560 240"
        role="img"
        aria-label={`Hız zaman grafiği: ilk ${t1} saniyede ${fmt(v1)} metre bölü saniye; sonraki ${t2} saniyede ${fmt(v2)} metre bölü saniye. İşaretli alan toplamı ${model.displacement} metre.`}
      >
        <path d="M50 20V200M50 110H535" fill="none" stroke="var(--muted)" />
        {[
          [0, t1, v1],
          [t1, t2, v2],
        ].map(([start, duration, v], i) => (
          <g key={i}>
            <rect
              x={50 + start * 12}
              y={Math.min(110, 110 - v * 4)}
              width={duration * 12}
              height={Math.abs(v * 4)}
              fill={i === 0 ? "var(--mint)" : "var(--accent)"}
              opacity=".22"
            />
            <path
              d={`M${50 + start * 12} ${110 - v * 4}h${duration * 12}`}
              stroke={i === 0 ? "var(--mint)" : "var(--accent)"}
              strokeWidth="3"
            />
          </g>
        ))}
        <text x="50" y="15" fill="var(--text)" fontSize="13">
          Hız (m/s)
        </text>
        <text x="430" y="235" fill="var(--text)" fontSize="13">
          Zaman (s)
        </text>
        <text x="25" y="114" fill="var(--muted)" fontSize="12">
          0
        </text>
        <text x="15" y="34" fill="var(--muted)" fontSize="12">
          20
        </text>
        <text x="8" y="194" fill="var(--muted)" fontSize="12">
          −20
        </text>
        {[0, 20, 40].map((t) => (
          <text
            key={t}
            x={50 + t * 12}
            y="218"
            textAnchor="middle"
            fill="var(--muted)"
            fontSize="12"
          >
            {t}
          </text>
        ))}
      </svg>
      <table className="model-data">
        <caption>İki parçanın hız ve alanları</caption>
        <thead>
          <tr>
            <th scope="col">Parça</th>
            <th scope="col">Hız (m/s)</th>
            <th scope="col">İşaretli alan (m)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Birinci</th>
            <td>{fmt(v1)}</td>
            <td>{first}</td>
          </tr>
          <tr>
            <th scope="row">İkinci</th>
            <td>{fmt(v2)}</td>
            <td>{second}</td>
          </tr>
        </tbody>
      </table>
      <p>
        Zaman ekseninin üstündeki alan artı, altındaki eksi yer değiştirmedir.
        Yol hesabında iki alanın büyüklüğü toplanır. Eksenler sabittir; dönüş
        anındaki hız değişimi idealize edilmiştir.
      </p>
      <p>
        Birinci adım: {first} m / {t1} s. İkinci adım: {second} m / {t2} s. Sağa
        artı, sola eksi.
      </p>
      <p className="model-result">
        <strong>
          Yol: {model.distance} m · Yer değiştirme: {model.displacement} m
        </strong>
      </p>
      <p>
        Ortalama sürat = {model.distance}/{model.time} = {fmt(model.speed)} m/s.
        Ortalama hız = {model.displacement}/{model.time} = {fmt(model.velocity)}{" "}
        m/s.
      </p>
      <p className="small muted">
        Tek doğrultuda iki hareket parçası modeli. Aynı konuma dönüşte yol sıfır
        olmak zorunda değildir. Çizimde iki parça ayırt etmek için farklı
        yükseklikler kullanılır; fiziksel yol tek doğrultudadır.
      </p>
    </section>
  );
}
export function NarrativeModels({ id }: { id: string }) {
  if (
    [
      "osmanli-kurulus-siyaseti",
      "osmanli-askeri-teskilat",
      "osmanli-medeniyeti",
    ].includes(id)
  )
    return <OttomanWorkshop id={id} />;
  if (id === "bolme-bolunebilme") return <DivisionModel />;
  if (id === "ebob-ekok") return <CommonNumberModel />;
  if (id === "enerji-ve-hareket") return <EnergyModel />;
  if (id === "ses-bilgisi") return <SoundModel />;
  if (id === "sozcukte-yapi") return <WordStructureModel />;
  if (id === "atomun-temel-tanecikleri" || id === "izotop-izoton-izobar")
    return <AtomCounter key={id} comparison={id === "izotop-izoton-izobar"} />;
  if (id === "karbohidratlar" || id === "proteinler")
    return <ChainBuilder key={id} id={id} />;
  if (id === "su-asit-baz-tuz") return <WaterModel />;
  if (id === "sayi-basamaklari") return <PlaceValue />;
  if (id === "tarih-zaman") return <Century />;
  if (id === "madde-ozkutle") return <Density />;
  if (id === "dogrusal-hareket") return <Motion />;
  return null;
}
