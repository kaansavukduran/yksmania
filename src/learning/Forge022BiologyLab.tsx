import { useId, type ReactNode } from "react";
import {
  fermentation022,
  photoRespiration022,
  meristem022,
  groundTissue022,
  phloem022,
} from "./forge022Biology";
import { useExploration } from "./useExploration";
import "./forge022Biology.css";

const fmt022 = (n: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(n);
const bound022 = (n: number, low: number, high: number) =>
  Number.isFinite(n) ? Math.min(high, Math.max(low, n)) : low;
const key022 = (id: string) => `forge022:biology:${id}`;
type Prediction022 = { prediction: string; reason: string; checked: boolean };
const initialPrediction022: Prediction022 = {
  prediction: "",
  reason: "",
  checked: false,
};

function Range022({
  label,
  value,
  min,
  max,
  step = 1,
  change,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  change: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="b022-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt022(value)}</output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => change(Number(e.target.value))}
      />
    </div>
  );
}
function Choice022({
  label,
  value,
  choices,
  change,
}: {
  label: string;
  value: string;
  choices: readonly (readonly [string, string])[];
  change: (value: string) => void;
}) {
  const id = useId();
  return (
    <fieldset className="b022-choice">
      <legend id={id}>{label}</legend>
      <div role="group" aria-labelledby={id}>
        {choices.map(([key, text]) => (
          <button
            key={key}
            type="button"
            aria-pressed={value === key}
            onClick={() => change(key)}
          >
            {text}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
function Prediction022({
  value,
  change,
  choices,
  expected,
  proof,
}: {
  value: Prediction022;
  change: (patch: Partial<Prediction022>) => void;
  choices: readonly (readonly [string, string])[];
  expected: string;
  proof: string;
}) {
  const id = useId(),
    valid = choices.some(([k]) => k === value.prediction);
  return (
    <div className="b022-prediction">
      <Choice022
        label="Sonuç tahminin"
        value={valid ? value.prediction : ""}
        choices={choices}
        change={(prediction) => change({ prediction, checked: false })}
      />
      <label htmlFor={id}>Gerekçen (en çok 120 karakter)</label>
      <textarea
        id={id}
        maxLength={120}
        rows={3}
        value={value.reason.slice(0, 120)}
        onChange={(e) =>
          change({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        type="button"
        disabled={!valid || !value.reason.trim()}
        onClick={() => change({ checked: true })}
      >
        Tahmini sına
      </button>
      {value.checked && valid && value.reason.trim() && (
        <p className="b022-feedback" role="status">
          {value.prediction === expected
            ? "Seçimin modelle uyumlu."
            : "Koşulu ve sonucu yeniden kıyasla."}{" "}
          {proof}
        </p>
      )}
    </div>
  );
}
function Frame022({
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
    <section className="forge022-biology" data-forge022={id}>
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="b022-note">
        Keşif ve tahmin puan vermez. Asıl sorular ayrı kayda geçer.
      </p>
    </section>
  );
}
function Drawing022({
  title,
  height,
  children,
}: {
  title: string;
  height: number;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <svg
      className="b022-svg"
      viewBox={`0 0 300 ${height}`}
      role="img"
      aria-labelledby={id}
    >
      <title id={id}>{title}</title>
      {children}
    </svg>
  );
}
function Arrow022({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1),
    side = 9;
  return (
    <g className="b022-arrow">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <path
        d={`M ${x2 - side * Math.cos(angle - 0.5)} ${y2 - side * Math.sin(angle - 0.5)} L ${x2} ${y2} L ${x2 - side * Math.cos(angle + 0.5)} ${y2 - side * Math.sin(angle + 0.5)}`}
      />
    </g>
  );
}
function Result022({ children }: { children: ReactNode }) {
  return (
    <div className="b022-result" data-model-result aria-live="polite">
      {children}
    </div>
  );
}

function FermentationLab022() {
  const id = "ayt-fermantasyon",
    [state, set] = useExploration(key022(id), {
      ...initialPrediction022,
      glucose: 5,
      processed: 1,
      route: "lactate",
    });
  const glucose = bound022(state.glucose, 0, 10),
    processed = bound022(state.processed, 0, glucose),
    route = state.route === "alcohol" ? "alcohol" : "lactate",
    m = fermentation022(glucose, processed, route),
    active = processed > 0;
  const proof = `${fmt022(m.processed)} mol glikoz: net ${fmt022(m.netATP)} mol ATP, ${fmt022(m.co2)} mol CO₂. Kalan ve ürün karbonu toplamı ${fmt022(m.carbonInitial)} mol C.`;
  return (
    <Frame022
      id={id}
      title="Karbon ve ATP"
      intro="Serbest glikozdan laktat veya etanol yolunu izle. Seçilen pay tam işlenir; yan yol ve ATP tüketimi yok sayılır."
    >
      <div className="b022-controls">
        <Range022
          label="İlk glikoz (mol)"
          value={glucose}
          min={0}
          max={10}
          change={(glucose) =>
            set({
              glucose,
              processed: Math.min(processed, glucose),
              checked: false,
            })
          }
        />
        <Range022
          label="İşlenen (mol)"
          value={processed}
          min={0}
          max={glucose}
          change={(processed) => set({ processed, checked: false })}
        />
      </div>
      <Choice022
        label="Son ürün yolu"
        value={route}
        choices={[
          ["lactate", "Laktat"],
          ["alcohol", "Etanol"],
        ]}
        change={(route) => set({ route, checked: false })}
      />
      <figure>
        <Drawing022
          title={`${fmt022(processed)} mol glikozdan ${route === "alcohol" ? "etanol ve CO₂" : "laktat"}; net ${fmt022(m.netATP)} mol ATP`}
          height={500}
        >
          <text x={150} y={30} textAnchor="middle">
            İşlenen glikoz
          </text>
          <text x={150} y={60} textAnchor="middle">
            {fmt022(processed)} mol
          </text>
          <g opacity={active ? 1 : 0.35}>
            {Array.from({ length: 6 }, (_, k) => (
              <circle
                className="b022-carbon"
                key={k}
                cx={50 + k * 40}
                cy={95}
                r={15}
              />
            ))}
            <text x={150} y={137} textAnchor="middle">
              6 C / glikoz
            </text>
          </g>
          <Arrow022 x1={150} y1={150} x2={150} y2={190} />
          <g data-net-atp={m.netATP} data-nad-regenerated={m.nadRegenerated}>
            <text x={150} y={220} textAnchor="middle">
              Net ATP: {fmt022(m.netATP)} mol
            </text>
            <text x={150} y={250} textAnchor="middle">
              NAD⁺: {fmt022(m.nadRegenerated)} mol
            </text>
          </g>
          <Arrow022 x1={150} y1={265} x2={150} y2={295} />
          <g
            data-organic-product={m.product}
            data-product-carbon={m.carbonProduct}
            opacity={active ? 1 : 0.35}
          >
            {[80, 220].map((center) => (
              <g key={center}>
                {Array.from({ length: route === "alcohol" ? 2 : 3 }, (_, k) => (
                  <circle
                    className="b022-carbon"
                    key={k}
                    cx={center + (k - (route === "alcohol" ? 0.5 : 1)) * 30}
                    cy={325}
                    r={13}
                  />
                ))}
              </g>
            ))}
          </g>
          <text x={150} y={372} textAnchor="middle">
            {fmt022(m.product)} mol {route === "alcohol" ? "etanol" : "laktat"}
          </text>
          <g data-co2={m.co2}>
            {route === "alcohol" && active ? (
              [100, 200].map((x) => (
                <g key={x}>
                  <circle className="b022-gas" cx={x} cy={415} r={17} />
                  <text x={x} y={422} textAnchor="middle">
                    C
                  </text>
                </g>
              ))
            ) : (
              <line className="b022-line" x1={100} y1={415} x2={200} y2={415} />
            )}
            <text x={150} y={470} textAnchor="middle">
              CO₂: {fmt022(m.co2)} mol
            </text>
          </g>
        </Drawing022>
        <figcaption>
          Her C noktası bir örnek yapıda yer alan karbonu temsil eder. Şekil 1
          glikozun yolunu, sayılar seçilen mol miktarını gösterir.
        </figcaption>
      </figure>
      <Result022>
        <p>
          ATP: harcanan {fmt022(m.spentATP)} mol; brüt {fmt022(m.grossATP)} mol;
          net {fmt022(m.netATP)} mol.
        </p>
        <p>
          Ürün: {fmt022(m.product)} mol{" "}
          {route === "alcohol" ? "etanol" : "laktat"}; CO₂: {fmt022(m.co2)} mol.
          Kalan glikoz: {fmt022(m.glucoseLeft)} mol.
        </p>
        <p>
          NADH oluşumu ve NAD⁺ geri kazanımı: ayrı ayrı{" "}
          {fmt022(m.nadRegenerated)} mol. Son ürün adımı ek ATP vermez.
        </p>
        <p>
          Karbon: kalan {fmt022(m.carbonRemaining)} + organik ürün{" "}
          {fmt022(m.carbonProduct)} + gaz {fmt022(m.carbonGas)} = ilk{" "}
          {fmt022(m.carbonInitial)} mol C.
        </p>
      </Result022>
      <Prediction022
        value={state}
        change={set}
        choices={[
          ["gas", "CO₂ oluşur"],
          ["no-gas", "CO₂ oluşmaz"],
        ]}
        expected={m.co2 > 0 ? "gas" : "no-gas"}
        proof={proof}
      />
    </Frame022>
  );
}

function PhotoRespirationLab022() {
  const id = "ayt-fotosentez-solunum",
    [state, set] = useExploration(key022(id), {
      ...initialPrediction022,
      gross: 8,
      respiration: 3,
      lightHours: 12,
    });
  const gross = bound022(state.gross, 0, 30),
    respiration = bound022(state.respiration, 0, 10),
    lightHours = bound022(state.lightHours, 0, 24),
    m = photoRespiration022(gross, respiration, lightHours),
    scale = Math.max(1, m.fixed, m.released),
    bar = (Math.abs(m.net) / Math.max(1, scale)) * 100;
  const proof = `${fmt022(m.fixed)} − ${fmt022(m.released)} = ${fmt022(m.net)} µmol CO₂/gün. Solunum 24 saat boyunca sayılır.`;
  return (
    <Frame022
      id={id}
      title="Bir gün, iki akı"
      intro="Aydınlıkta brüt alım sabit; solunum 24 saat aynı hızda. Basit glikoz modeli CO₂ ve O₂ için 1:1 mol oranı kullanır."
    >
      <div className="b022-controls">
        <Range022
          label="Brüt alım (µmol/saat)"
          value={gross}
          min={0}
          max={30}
          change={(gross) => set({ gross, checked: false })}
        />
        <Range022
          label="Solunum (µmol/saat)"
          value={respiration}
          min={0}
          max={10}
          change={(respiration) => set({ respiration, checked: false })}
        />
        <Range022
          label="Işık (saat)"
          value={lightHours}
          min={0}
          max={24}
          change={(lightHours) => set({ lightHours, checked: false })}
        />
      </div>
      <figure>
        <Drawing022
          title={`Günlük brüt CO₂ alımı ${fmt022(m.fixed)}, solunum çıkışı ${fmt022(m.released)}, net ${fmt022(m.net)} µmol`}
          height={520}
        >
          <text x={150} y={30} textAnchor="middle">
            Günlük CO₂ (µmol)
          </text>
          <path
            className="b022-leaf"
            d="M150 70 C55 50 45 155 150 180 C255 155 245 50 150 70Z"
          />
          <path className="b022-line" d="M150 70 L150 175" />
          <g data-daily-fixed={m.fixed}>
            <text x={28} y={225}>
              Alım
            </text>
            <rect
              className="b022-mint"
              x={28}
              y={242}
              width={(230 * m.fixed) / scale}
              height={28}
            />
            <text x={28} y={301}>
              {fmt022(m.fixed)}
            </text>
          </g>
          <g data-daily-released={m.released}>
            <text x={28} y={345}>
              Çıkış
            </text>
            <rect
              className="b022-coral"
              x={28}
              y={362}
              width={(230 * m.released) / scale}
              height={28}
            />
            <text x={28} y={421}>
              {fmt022(m.released)}
            </text>
          </g>
          <g data-daily-net={m.net}>
            <line className="b022-line" x1={35} y1={465} x2={265} y2={465} />
            <line className="b022-line" x1={150} y1={450} x2={150} y2={480} />
            <rect
              className={m.net >= 0 ? "b022-mint" : "b022-coral"}
              x={m.net >= 0 ? 150 : 150 - bar}
              y={454}
              width={bar}
              height={22}
            />
            <text x={150} y={510} textAnchor="middle">
              Net: {fmt022(m.net)}
            </text>
          </g>
        </Drawing022>
        <figcaption>
          Üst iki çubuk aynı ölçekte günlük miktardır. Alt çizgi: solda kayıp,
          sağda kazanç; orta nokta sıfırdır.
        </figcaption>
      </figure>
      <Result022>
        <p>
          Brüt bağlama: {fmt022(m.fixed)} µmol CO₂/gün. Solunum:{" "}
          {fmt022(m.released)} µmol CO₂/gün.
        </p>
        <p>
          Günlük net: {fmt022(m.net)} µmol CO₂;{" "}
          {m.net > 0 ? "net alım" : m.net < 0 ? "net çıkış" : "net değişim yok"}
          .
        </p>
        <p>
          Işıkta solunum {fmt022(m.lightRespiration)}, karanlıkta{" "}
          {fmt022(m.darkRespiration)} µmol. Karanlık süre {fmt022(m.darkHours)}{" "}
          saat.
        </p>
        <p>
          Aydınlık için anlık net hız {fmt022(m.litNet)} µmol/saat.{" "}
          {lightHours === 0
            ? "Bu ayarda ışık süresi 0; günlük ışıkla CO₂ alımı yok."
            : m.compensation
              ? "Bu anda iki akı eşit; yollar durmak zorunda değil."
              : "Anlık hız ile günlük miktar ayrı ölçüdür."}
        </p>
      </Result022>
      <Prediction022
        value={state}
        change={set}
        choices={[
          ["gain", "Günlük kazanç"],
          ["equal", "Günlük eşit"],
          ["loss", "Günlük kayıp"],
        ]}
        expected={m.dailyDirection}
        proof={proof}
      />
    </Frame022>
  );
}

function MeristemLab022() {
  const id = "ayt-meristem-doku",
    [state, set] = useExploration(key022(id), {
      ...initialPrediction022,
      founders: 2,
      rounds: 2,
      elongation: 1,
    });
  const founders = Math.round(bound022(state.founders, 1, 8)),
    rounds = Math.round(bound022(state.rounds, 0, 4)),
    elongation = bound022(state.elongation, 1, 4),
    m = meristem022(founders, rounds, elongation),
    countY = 70 + rounds * 48 + 43,
    cellY = countY + 60,
    volumeY = cellY + 22 * elongation + 44;
  return (
    <Frame022
      id={id}
      title="Hücre say, boyu ayır"
      intro="Her hücre her turda bir kez bölünür; kayıp yok. Son yavruların uzama öncesi hacmi tek tek 1 birim kabul edilir; aradaki büyüme hesabı yok. Sonra tümü aynı oranda uzar, en kesit sabit kalır."
    >
      <div className="b022-controls">
        <Range022
          label="İlk hücre"
          value={founders}
          min={1}
          max={8}
          change={(founders) => set({ founders, checked: false })}
        />
        <Range022
          label="Bölünme turu"
          value={rounds}
          min={0}
          max={4}
          change={(rounds) => set({ rounds, checked: false })}
        />
        <Range022
          label="Uzama katı"
          value={elongation}
          min={1}
          max={4}
          step={0.5}
          change={(elongation) => set({ elongation, checked: false })}
        />
      </div>
      <figure>
        <Drawing022
          title={`Bir kurucu hücrenin örnek soyu; toplam ${m.finalCells} hücre, ${fmt022(m.finalVolume)} hacim birimi`}
          height={volumeY + 20}
        >
          <text x={150} y={30} textAnchor="middle">
            Bir hücrenin soyu
          </text>
          {m.representedGenerations.map((count, generation) => (
            <g key={generation} data-generation={generation}>
              {Array.from({ length: count }, (_, k) => {
                const x = 20 + ((k + 0.5) * 260) / count,
                  y = 70 + generation * 48;
                return (
                  <g key={k}>
                    {generation > 0 && (
                      <line
                        className="b022-line"
                        x1={
                          20 + ((Math.floor(k / 2) + 0.5) * 260) / (count / 2)
                        }
                        y1={y - 39}
                        x2={x}
                        y2={y - 9}
                      />
                    )}
                    <circle
                      className="b022-cell"
                      cx={x}
                      cy={y}
                      r={Math.min(9, 100 / count)}
                    />
                  </g>
                );
              })}
            </g>
          ))}
          <text
            x={150}
            y={countY}
            textAnchor="middle"
            data-final-cells={m.finalCells}
          >
            Toplam: {m.finalCells} hücre
          </text>
          <text x={150} y={countY + 32} textAnchor="middle">
            Son hücrede uzama
          </text>
          {[65, 120, 175, 230].map((x) => (
            <rect
              key={x}
              className="b022-cell"
              x={x - 17}
              y={cellY}
              width={34}
              height={22 * elongation}
              rx={4}
            />
          ))}
          <g
            data-final-volume={m.finalVolume}
            data-daughter-chromosomes={m.daughterChromosomes}
          >
            <text x={150} y={volumeY} textAnchor="middle">
              Hacim: {fmt022(m.finalVolume)} birim
            </text>
          </g>
        </Drawing022>
        <figcaption>
          Üst soy tek başlangıç hücresinin örneğidir. Alt dört hücre yalnız
          uzama örneği; toplam sayı sonuç alanında tüm soyu içerir.
        </figcaption>
      </figure>
      <Result022>
        <p>
          Son hücre: {m.finalCells}; yeni hücre ve mitoz olayı: ayrı ayrı{" "}
          {m.newCells}.
        </p>
        <p>
          Uzama öncesi toplam hacim {fmt022(m.volumeBeforeElongation)}; sonrası{" "}
          {fmt022(m.finalVolume)} birim.
        </p>
        <p>
          Uzama ile hücre sayısı aynı kalır. Normal mitoz sonrası her yavru bu
          örnekte 8 kromozom taşır; sayı 2ⁿ ile çarpılmaz.
        </p>
      </Result022>
      <Prediction022
        value={state}
        change={set}
        choices={[
          ["same", "Hacim aynı"],
          ["more", "Hacim artar"],
        ]}
        expected={elongation > 1 ? "more" : "same"}
        proof={`${m.finalCells} hücre × ${fmt022(elongation)} birim = ${fmt022(m.finalVolume)} birim hacim. Bu son uzama evresinde hücre sayısı aynı.`}
      />
    </Frame022>
  );
}

function GroundLab022() {
  const id = "ayt-temel-doku",
    [state, set] = useExploration(key022(id), {
      ...initialPrediction022,
      totalArea: 1000,
      airPercent: 20,
      palisadePercent: 75,
    });
  const total = bound022(state.totalArea, 100, 2000),
    air = bound022(state.airPercent, 0, 50),
    palisade = bound022(state.palisadePercent, 0, 100),
    m = groundTissue022(total, air, palisade),
    airHeight = (300 * m.air) / total,
    palHeight = (300 * m.palisade) / total,
    spongyHeight = (300 * m.spongyCells) / total;
  return (
    <Frame022
      id={id}
      title="Yüzdenin bütünü ne?"
      intro="Yalnız seçili mezofil alanı: hava, palizat ve sünger hücreleri. Örtü ve demet yok. Alan, gaz hızı veya hücre sayısı değildir."
    >
      <div className="b022-controls">
        <Range022
          label="Toplam alan (µm²)"
          value={total}
          min={100}
          max={2000}
          step={100}
          change={(totalArea) => set({ totalArea, checked: false })}
        />
        <Range022
          label="Hava payı (%)"
          value={air}
          min={0}
          max={50}
          step={5}
          change={(airPercent) => set({ airPercent, checked: false })}
        />
        <Range022
          label="Palizat payı (%)"
          value={palisade}
          min={0}
          max={100}
          step={5}
          change={(palisadePercent) => set({ palisadePercent, checked: false })}
        />
      </div>
      <p>Palizat payının bütünü hava dışındaki hücre alanıdır.</p>
      <figure>
        <Drawing022
          title={`Toplam ${fmt022(total)} µm²; hava ${fmt022(m.air)}, palizat ${fmt022(m.palisade)}, sünger hücreleri ${fmt022(m.spongyCells)} µm²`}
          height={580}
        >
          <text x={150} y={28} textAnchor="middle">
            Seçili alan (µm²)
          </text>
          <text x={150} y={58} textAnchor="middle">
            Toplam: {fmt022(total)}
          </text>
          <g
            data-air-area={m.air}
            data-palisade-area={m.palisade}
            data-spongy-area={m.spongyCells}
          >
            <rect
              className="b022-air"
              x={80}
              y={90}
              width={140}
              height={airHeight}
            />
            <rect
              className="b022-mint"
              x={80}
              y={90 + airHeight}
              width={140}
              height={palHeight}
            />
            <rect
              className="b022-coral"
              x={80}
              y={90 + airHeight + palHeight}
              width={140}
              height={spongyHeight}
            />
            <rect
              className="b022-outline"
              x={80}
              y={90}
              width={140}
              height={300}
            />
            <line
              className="b022-line"
              x1={80}
              x2={220}
              y1={90 + airHeight}
              y2={90 + airHeight}
            />
            <line
              className="b022-line"
              x1={80}
              x2={220}
              y1={90 + airHeight + palHeight}
              y2={90 + airHeight + palHeight}
            />
          </g>
          <rect className="b022-air" x={20} y={425} width={22} height={22} />
          <text x={54} y={444}>
            Hava: {fmt022(m.air)}
          </text>
          <rect className="b022-mint" x={20} y={472} width={22} height={22} />
          <text x={54} y={491}>
            Palizat: {fmt022(m.palisade)}
          </text>
          <rect className="b022-coral" x={20} y={519} width={22} height={22} />
          <text x={54} y={538}>
            Sünger: {fmt022(m.spongyCells)}
          </text>
        </Drawing022>
        <figcaption>
          Alan payları ölçeklidir. Bu bir alan şemasıdır; doğal hücre dizilişi
          veya hücre sayısı değildir.
        </figcaption>
      </figure>
      <Result022>
        <p>
          Hava: {fmt022(m.air)} µm²; hücre alanı: {fmt022(m.cells)} µm².
        </p>
        <p>
          Palizat: {fmt022(m.palisade)} µm²; sünger hücreleri:{" "}
          {fmt022(m.spongyCells)} µm².
        </p>
        <p>
          Palizat toplamın %{fmt022(m.palisadePercentOfTotal)}'i; hücre alanının
          %{fmt022(palisade)}'i.
        </p>
        <p>
          Bütçe: {fmt022(m.air)} + {fmt022(m.palisade)} +{" "}
          {fmt022(m.spongyCells)} = {fmt022(total)} µm². Bu veriden tek başına
          gaz hızı çıkmaz.
        </p>
      </Result022>
      <Prediction022
        value={state}
        change={set}
        choices={[
          ["more", "Palizat daha çok"],
          ["equal", "İki hücre alanı eşit"],
          ["less", "Sünger daha çok"],
        ]}
        expected={
          m.palisade > m.spongyCells
            ? "more"
            : m.palisade < m.spongyCells
              ? "less"
              : "equal"
        }
        proof={`Önce ${fmt022(m.cells)} µm² hücre alanı kalır. Bunun %${fmt022(palisade)}'i palizat: ${fmt022(m.palisade)} µm²; sünger hücreleri ${fmt022(m.spongyCells)} µm².`}
      />
    </Frame022>
  );
}

function PhloemLab022() {
  const id = "ayt-iletim-doku",
    [state, set] = useExploration(key022(id), {
      ...initialPrediction022,
      stock: 40,
      concentration: 2,
      sourcePressure: 8,
      sinkPressure: 2,
      resistance: 3,
      hours: 4,
      source: "leaf",
    });
  const stock = bound022(state.stock, 0, 100),
    concentration = bound022(state.concentration, 1, 5),
    sourcePressure = bound022(state.sourcePressure, 0, 10),
    sinkPressure = bound022(state.sinkPressure, 0, 10),
    resistance = bound022(state.resistance, 1, 10),
    hours = bound022(state.hours, 0, 10),
    source = state.source === "tuber" ? "tuber" : "leaf",
    m = phloem022(
      stock,
      concentration,
      sourcePressure,
      sinkPressure,
      resistance,
      hours,
      source,
    ),
    donorY = source === "leaf" ? 90 : 340,
    receiverY = source === "leaf" ? 340 : 90,
    fill = stock > 0 ? m.remaining / stock : 0,
    received = stock > 0 ? m.transferred / stock : 0;
  return (
    <Frame022
      id={id}
      title="Kaynak ve havuz"
      intro="Basıncı dıştan sabit iki hazne: aynı derişimde çözelti akar. Kaynak sonludur; bitince akış durur. Canlı bitkinin tüm su düzeni bu hesaba dahil değil."
    >
      <Choice022
        label="Şekeri veren"
        value={source}
        choices={[
          ["leaf", "Yaprak"],
          ["tuber", "Yumru"],
        ]}
        change={(source) => set({ source, checked: false })}
      />
      <div className="b022-controls">
        <Range022
          label="İlk şeker (mg)"
          value={stock}
          min={0}
          max={100}
          step={5}
          change={(stock) => set({ stock, checked: false })}
        />
        <Range022
          label="Derişim (mg/mL)"
          value={concentration}
          min={1}
          max={5}
          change={(concentration) => set({ concentration, checked: false })}
        />
        <Range022
          label="Kaynak (kPa)"
          value={sourcePressure}
          min={0}
          max={10}
          change={(sourcePressure) => set({ sourcePressure, checked: false })}
        />
        <Range022
          label="Havuz (kPa)"
          value={sinkPressure}
          min={0}
          max={10}
          change={(sinkPressure) => set({ sinkPressure, checked: false })}
        />
        <Range022
          label="Direnç"
          value={resistance}
          min={1}
          max={10}
          change={(resistance) => set({ resistance, checked: false })}
        />
        <Range022
          label="Süre (saat)"
          value={hours}
          min={0}
          max={10}
          change={(hours) => set({ hours, checked: false })}
        />
      </div>
      <p>
        Direnç birimi: kPa · saat / mL. Q = pozitif basınç farkı / direnç. Bu model
        yalnız seçili vericiden havuza giden akışı sayar. Eksi farkta gerçek
        geri akışı çözmez; sıfır sonuç yalnız bu ileri hesabın sınırıdır.
      </p>
      <figure>
        <Drawing022
          title={`${source === "leaf" ? "Yaprak" : "Yumru"} kaynağından ${fmt022(m.transferred)} mg şeker aktarımı; kalan ${fmt022(m.remaining)} mg`}
          height={560}
        >
          <text x={150} y={30} textAnchor="middle">
            Seçili floem yolu
          </text>
          <text x={150} y={69} textAnchor="middle">
            {source === "leaf" ? "Yaprak: kaynak" : "Sürgün: havuz"}
          </text>
          <g data-donor-remaining={m.remaining}>
            <rect
              className="b022-cell"
              x={80}
              y={donorY}
              width={140}
              height={80}
            />
            <rect
              className="b022-mint"
              x={84}
              y={donorY + 76 - 72 * fill}
              width={132}
              height={72 * fill}
            />
          </g>
          <g data-receiver-collected={m.collected}>
            <rect
              className="b022-cell"
              x={80}
              y={receiverY}
              width={140}
              height={80}
            />
            <rect
              className="b022-coral"
              x={84}
              y={receiverY + 76 - 72 * received}
              width={132}
              height={72 * received}
            />
          </g>
          <g
            data-transfer-direction={m.direction}
            data-transferred-sugar={m.transferred}
          >
            {m.transferred > 0 ? (
              <Arrow022
                x1={150}
                y1={source === "leaf" ? 185 : 325}
                x2={150}
                y2={source === "leaf" ? 325 : 185}
              />
            ) : (
              <line
                className="b022-reference"
                x1={150}
                y1={185}
                x2={150}
                y2={325}
              />
            )}
            <text x={150} y={270} textAnchor="middle" className="b022-label-bg">
              {fmt022(m.transferred)} mg
            </text>
          </g>
          <text x={150} y={455} textAnchor="middle">
            {source === "leaf" ? "Kök: havuz" : "Yumru: kaynak"}
          </text>
          <text x={150} y={500} textAnchor="middle">
            Q: {fmt022(m.rate)} mL/saat
          </text>
          <text x={150} y={535} textAnchor="middle">
            Etkin: {fmt022(m.activeHours)} saat
          </text>
        </Drawing022>
        <figcaption>
          Dolgu, ilk stok hacmine göre kalan ve alınan paydır. Ok tüm süre
          içindeki aktarımı gösterir; kaynak erken bittiyse son anda akış
          sürmez.
        </figcaption>
      </figure>
      <Result022>
        <p>
          Basınç farkı {fmt022(m.difference)} kPa; hacim akısı {fmt022(m.rate)}{" "}
          mL/saat. Süre kapasitesi {fmt022(m.capacity)} mg.
        </p>
        <p>
          Aktarılan: {fmt022(m.transferred)} mg; kalan: {fmt022(m.remaining)}{" "}
          mg. Şeker bütçesi {fmt022(m.collected)} + {fmt022(m.remaining)} ={" "}
          {fmt022(stock)} mg.
        </p>
        <p>
          Çözelti: ilk {fmt022(m.donorInitialVolume)} mL; aktarılan{" "}
          {fmt022(m.volume)} mL; kaynakta son {fmt022(m.donorFinalVolume)} mL.
        </p>
        <p>
          Etkin akış {fmt022(m.activeHours)} saat.{" "}
          {m.stockLimited
            ? "Stok, süre dolmadan biter."
            : "Süre kapasitesi başlangıç stoğunu aşmaz."}{" "}
          {m.transferred === 0
            ? "Seçili sürede aktarım yok."
            : source === "leaf"
              ? "Bu seçili yolda yapraktan köke, aşağı aktarım var."
              : "Bu seçili yolda yumrudan sürgüne, yukarı aktarım var."}
        </p>
      </Result022>
      <Prediction022
        value={state}
        change={set}
        choices={[
          ["none", "Aktarım yok"],
          ["stock", "Stok sınırlar"],
          ["time", "Süre yetmez"],
          ["equal", "Tam sınır"],
        ]}
        expected={
          m.transferred === 0
            ? "none"
            : m.capacity > stock
              ? "stock"
              : m.capacity < stock
                ? "time"
                : "equal"
        }
        proof={`${fmt022(m.capacity)} mg süre kapasitesi, ${fmt022(stock)} mg stokla kıyaslanır. Eşitlikte tam süre sonunda biter; kapasite küçükse süre, büyükse stok sınırlar.`}
      />
    </Frame022>
  );
}

export default function Forge022BiologyLab({ lessonId }: { lessonId: string }) {
  if (lessonId === "ayt-fermantasyon") return <FermentationLab022 />;
  if (lessonId === "ayt-fotosentez-solunum") return <PhotoRespirationLab022 />;
  if (lessonId === "ayt-meristem-doku") return <MeristemLab022 />;
  if (lessonId === "ayt-temel-doku") return <GroundLab022 />;
  if (lessonId === "ayt-iletim-doku") return <PhloemLab022 />;
  return null;
}
