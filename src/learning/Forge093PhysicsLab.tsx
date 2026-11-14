import { useId, type ReactNode } from "react";
import { ModelNumber } from "./ModelNumber";
import { useExploration } from "./useExploration";
import {
  circuitState,
  dipoleDirection,
  expansionState,
  iceWaterMix,
  inductionState,
  phaseHeating,
  wireField,
} from "./forge093Physics";
import "./forge093PhysicsLab.css";

const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(n) < 1e-9 ? 0 : n,
  );
const limit = (v: number, a: number, b: number, fallback: number) =>
  Number.isFinite(v) ? Math.max(a, Math.min(b, Math.round(v))) : fallback;
const key = (id: string) => `forge093-physics-${id}`;
const titles: Record<string, string> = {
  genlesme: "Boyutlar değişirken",
  "hal-degisimi": "Enerji ve hâl atölyesi",
  "durgun-elektrik": "Elektronların hesabı",
  "elektrik-akimi": "Devreyi kur, hesabını gör",
  "miknatislar-ve-manyetik-alan": "Görünmeyen yönleri keşfet",
};

function Prediction({
  id,
  prompt,
  choices,
  feedback,
}: {
  id: string;
  prompt: string;
  choices: string[];
  feedback: ReactNode;
}) {
  const uid = useId();
  const [saved, set] = useExploration(key(id), {
    prediction: "",
    reason: "",
    revealed: false,
  });
  return (
    <fieldset className="forge093-physics-prediction">
      <legend>{prompt}</legend>
      <div
        className="forge093-physics-choices"
        role="group"
        aria-label="Tahminin"
      >
        {choices.map((choice) => (
          <label key={choice}>
            <input
              type="radio"
              name={`${uid}-guess`}
              value={choice}
              checked={saved.prediction === choice}
              onChange={() => set({ prediction: choice, revealed: false })}
            />
            {choice}
          </label>
        ))}
      </div>
      <label htmlFor={`${uid}-reason`}>Gerekçen</label>
      <textarea
        id={`${uid}-reason`}
        rows={3}
        maxLength={500}
        value={saved.reason.slice(0, 500)}
        onChange={(e) => set({ reason: e.target.value, revealed: false })}
        placeholder="Neyi sabit tuttun, hangi ilişkiyi kullandın?"
      />
      <button
        className="secondary"
        type="button"
        disabled={!choices.includes(saved.prediction) || !saved.reason.trim()}
        onClick={() => set({ revealed: true })}
      >
        Tahminimi karşılaştır
      </button>
      {saved.revealed && (
        <div className="forge093-physics-feedback" role="status">
          <p>
            <strong>Modelin gerekçesi</strong>
          </p>
          {feedback}
          <p>
            Tahminin: {saved.prediction}. Gerekçen: {saved.reason.slice(0, 500)}
          </p>
        </div>
      )}
    </fieldset>
  );
}

function ExpansionLab({ id }: { id: string }) {
  const uid = useId();
  const [s, set] = useExploration(key(id), {
    length: 2,
    alpha: 12,
    delta: 40,
    gap: 3,
    revealed: false,
  });
  const length = limit(s.length, 1, 5, 2),
    alpha = s.alpha === 24 ? 24 : 12,
    delta = limit(s.delta, -50, 100, 40),
    gap = limit(s.gap, 1, 10, 3);
  const model = expansionState(length, alpha, delta, gap),
    width0 = (length / 5) * 300,
    visualScale = 1 + model.strain * 100;
  return (
    <>
      <p>
        Serbest, izotrop ve her yerinde aynı sıcaklıktaki katı; α sabit ve hâl
        değişimi yok. Başlangıç deliği 20 mm. Çubukta bir uç sabit, öteki uç
        boşluğa ilerleyebilir.
      </p>
      <div className="forge093-physics-controls">
        <ModelNumber
          label="Çubuğun ilk boyu (m)"
          min={1}
          max={5}
          value={length}
          onChange={(n) => set({ length: n, revealed: false })}
        />
        <label htmlFor={`${uid}-alpha`}>
          Doğrusal katsayı α (×10⁻⁶ °C⁻¹)
          <select
            id={`${uid}-alpha`}
            value={alpha}
            onChange={(e) =>
              set({ alpha: Number(e.target.value), revealed: false })
            }
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </label>
        <ModelNumber
          label="Sıcaklık değişimi (°C)"
          min={-50}
          max={100}
          value={delta}
          onChange={(n) => set({ delta: n, revealed: false })}
        />
        <ModelNumber
          label="İlk boşluk (mm)"
          min={1}
          max={10}
          value={gap}
          onChange={(n) => set({ gap: n, revealed: false })}
        />
      </div>
      <svg
        viewBox="0 0 560 390"
        role="img"
        aria-label={`Çubuk değişimi ${fmt(model.changeMm, 3)} milimetre; delik çapı ${fmt(model.holeDiameterMm, 4)} milimetre. Çizimde değişim yüz kat büyütüldü.`}
      >
        <g fill="var(--text)" fontSize="16">
          <text x="35" y="30">
            İlk boy
          </text>
          <text x="35" y="115">
            Yeni boy
          </text>
        </g>
        <path d="M35 45V170" stroke="var(--muted)" strokeWidth="8" />
        <rect
          x="40"
          y="50"
          width={width0}
          height="28"
          rx="3"
          fill="var(--surface-2)"
          stroke="var(--muted)"
        />
        <rect
          x="40"
          y="130"
          width={width0 * visualScale}
          height="28"
          rx="3"
          fill="var(--accent)"
        />
        <path
          d={`M${40 + width0} 45V174`}
          stroke="var(--muted)"
          strokeDasharray="5 4"
        />
        <circle
          cx="280"
          cy="285"
          r={60 * visualScale}
          fill="var(--surface-2)"
          stroke="var(--text)"
          strokeWidth="2"
        />
        <circle
          cx="280"
          cy="285"
          r={35 * visualScale}
          fill="var(--bg)"
          stroke="var(--accent)"
          strokeWidth="3"
        />
        <circle
          cx="280"
          cy="285"
          r="35"
          fill="none"
          stroke="var(--muted)"
          strokeDasharray="4 4"
        />
        <text
          x="280"
          y="375"
          textAnchor="middle"
          fill="var(--text)"
          fontSize="16"
        >
          Kesikli çember: ilk delik sınırı
        </text>
      </svg>
      <div data-model-result className="forge093-physics-result" role="status">
        <p>
          ΔL = {fmt(model.changeMm, 3)} mm · Son boy = {fmt(model.finalM, 6)} m
        </p>
        <p>
          Delik çapı = <strong>{fmt(model.holeDiameterMm, 4)} mm</strong>
        </p>
        <p>
          {model.projectedGapMm > 0
            ? `Kalan boşluk: ${fmt(model.projectedGapMm, 3)} mm; temas yok.`
            : "Serbest uzama boşluğu kapatır. Temas sonrasında gerçek uzama ve gerilme için mekanik model gerekir."}
        </p>
      </div>
      <p className="small muted">
        Çizimde bağıl boyut değişimi 100 kat büyütülmüştür; sayısal sonuçlar
        gerçek küçük genleşme hesabıdır. Delik ile çubuk aynı değişim
        katsayısıyla çizilir. Duvar hesabı yalnız temasa kadar geçerlidir.
      </p>
      <Prediction
        id={id}
        prompt="Seçtiğin ΔT’de delik nasıl değişir?"
        choices={["Büyür", "Küçülür", "Aynı kalır"]}
        feedback={
          <p>
            α pozitif. ΔT={delta} °C olduğundan 1+αΔT={fmt(1 + model.strain, 6)}
            ; delik {delta > 0 ? "büyür" : delta < 0 ? "küçülür" : "aynı kalır"}
            . Çap bir uzunluktur; α kullanılır,2α değil.
          </p>
        }
      />
    </>
  );
}

function PhaseLab({ id }: { id: string }) {
  const [s, set] = useExploration(key(id), {
    mode: "curve",
    mass: 50,
    energy: 5,
    waterMass: 100,
    waterTemp: 20,
    iceMass: 20,
    revealed: false,
  });
  const mass = limit(s.mass, 10, 100, 50),
    energy = limit(s.energy, 0, 100, 5),
    waterMass = limit(s.waterMass, 50, 300, 100),
    waterTemp = limit(s.waterTemp, 10, 80, 20),
    iceMass = limit(s.iceMass, 10, 100, 20);
  const curve = phaseHeating(mass, (mass * 3075 * energy) / 100),
    mix = iceWaterMix(waterMass, waterTemp, iceMass);
  const x = (q: number) => 55 + (q / curve.maximum) * 450,
    y = (t: number) => 255 - ((t + 10) / 130) * 205;
  const points = [
    [0, -10],
    [curve.edges[1], 0],
    [curve.edges[2], 0],
    [curve.edges[3], 100],
    [curve.edges[4], 100],
    [curve.maximum, 120],
  ]
    .map(([q, t]) => `${x(q)},${y(t)}`)
    .join(" ");
  return (
    <>
      <p>
        Saf su, normal atmosfer basıncı. Kap ve çevreye ısı kaybı ihmal. c ve L
        sabit basınçtaki ısı gereksinimini temsil eder; Q yalnız iç enerji
        değişimine eşitlenmez. cbuz=2,1; csu=4,2; cbuhar=2 J/(g·°C), Lf=334 ve
        Lv=2260 J/g sabit yaklaşık değerlerdir.
      </p>
      <div
        className="forge093-physics-modes"
        role="group"
        aria-label="Hâl değişimi modeli"
      >
        <button
          className="secondary"
          aria-pressed={s.mode !== "mix"}
          onClick={() => set({ mode: "curve", revealed: false })}
        >
          Beş enerji basamağı
        </button>
        <button
          className="secondary"
          aria-pressed={s.mode === "mix"}
          onClick={() => set({ mode: "mix", revealed: false })}
        >
          Buz–su karışımı
        </button>
      </div>
      {s.mode !== "mix" ? (
        <>
          <ModelNumber
            label="Isıtılan kütle (g)"
            min={10}
            max={100}
            value={mass}
            onChange={(n) => set({ mass: n, revealed: false })}
          />
          <ModelNumber
            label="Toplam enerji payı (%)"
            min={0}
            max={100}
            value={energy}
            onChange={(n) => set({ energy: n, revealed: false })}
          />
          <svg
            viewBox="0 0 560 315"
            role="img"
            aria-label={`Beş basamaklı sıcaklık enerji grafiği. ${fmt(curve.energy)} joule, ${fmt(curve.temperature)} derece; ${curve.stage}.`}
          >
            <path d="M55 25V255H520" stroke="var(--muted)" fill="none" />
            <polyline
              points={points}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <circle
              cx={x(curve.energy)}
              cy={y(curve.temperature)}
              r="7"
              fill="var(--mint)"
              stroke="var(--text)"
              strokeWidth="2"
            />
            <g fill="var(--text)" fontSize="14">
              <text x="8" y="20">
                T(°C)
              </text>
              {[-10, 0, 100, 120].map((t) => (
                <text key={t} x="5" y={y(t) + 5}>
                  {t}
                </text>
              ))}
              <text x="55" y="280">
                0
              </text>
              <text x="505" y="280" textAnchor="end">
                {fmt(curve.maximum, 0)}
              </text>
              <text x="505" y="306" textAnchor="end">
                Alınan Q (J)
              </text>
            </g>
          </svg>
          <div
            data-model-result
            className="forge093-physics-result"
            role="status"
          >
            <strong>
              {curve.stage} · {fmt(curve.temperature)} °C
            </strong>
            <p>Alınan enerji: {fmt(curve.energy)} J</p>
            <p>
              Katı %{fmt(curve.solid * 100)} · Sıvı %{fmt(curve.liquid * 100)} ·
              Gaz %{fmt(curve.gas * 100)}
            </p>
          </div>
          <div
            className="forge093-phase-bar"
            role="img"
            aria-label={`Katı yüzde${fmt(curve.solid * 100)}, sıvı yüzde${fmt(curve.liquid * 100)}, gaz yüzde${fmt(curve.gas * 100)}`}
          >
            <span
              className="solid"
              style={{ width: `${curve.solid * 100}%` }}
            />
            <span
              className="liquid"
              style={{ width: `${curve.liquid * 100}%` }}
            />
            <span className="gas" style={{ width: `${curve.gas * 100}%` }} />
          </div>
          <p className="small">
            Açık: katı, mavi: sıvı, turuncu: gaz. Şerit kütle paylarını
            gösterir; hacim değildir. Gaz, modelde aynı basınçta genleşebilen
            düzenekte ele alınır; sabit hacimli kap varsayılmaz.
          </p>
          <dl className="forge093-physics-list">
            {[
              ["Buzu ısıt", mass * 21],
              ["Erit", mass * 334],
              ["Suyu ısıt", mass * 420],
              ["Buharlaştır", mass * 2260],
              ["Buharı ısıt", mass * 40],
            ].map(([label, q]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{fmt(Number(q))} J</dd>
              </div>
            ))}
          </dl>
          <p className="small muted">
            Yatay eksen zaman değil birikimli enerjidir. Kütle değişince Q
            ölçeği yeniden çizilir; her bir bölümün gerçek J değeri listelenir.
            Saf madde ve sabit basınç koşulları platonun nedenidir.
          </p>
          <Prediction
            id={id}
            prompt="Enerji artınca sıcaklık her basamakta artar mı?"
            choices={[
              "Her basamakta artar",
              "Hâl değişiminde sabit kalabilir",
              "Hiçbir basamakta artmaz",
            ]}
            feedback={
              <p>
                Şu anda {curve.stage.toLocaleLowerCase("tr-TR")}; sıcaklık
                {fmt(curve.temperature)} °C. Erime ve kaynamada enerji kütlenin
                hâl payını değiştirir; yatay parçada ΔT=0 olması Q=0 anlamına
                gelmez.
              </p>
            }
          />
        </>
      ) : (
        <>
          <p>
            Karışım: başlangıç buzu 0 °C, su0 °C’nin üzerinde. Daha soğuk buzun
            önce ısınması veya suyun donması bu kontrolün kapsamı değildir.
          </p>
          <ModelNumber
            label="Sıcak su kütlesi (g)"
            min={50}
            max={300}
            value={waterMass}
            onChange={(n) => set({ waterMass: n, revealed: false })}
          />
          <ModelNumber
            label="Suyun ilk sıcaklığı (°C)"
            min={10}
            max={80}
            value={waterTemp}
            onChange={(n) => set({ waterTemp: n, revealed: false })}
          />
          <ModelNumber
            label="Eklenen 0 °C buz (g)"
            min={10}
            max={100}
            value={iceMass}
            onChange={(n) => set({ iceMass: n, revealed: false })}
          />
          <svg
            viewBox="0 0 560 250"
            role="img"
            aria-label={`Enerji bütçesi: su0dereceye kadar${fmt(mix.available)}joule verebilir, tüm erime${fmt(mix.meltNeed)}joule ister.`}
          >
            <path
              d="M60 45H235V210H60Z M325 45H500V210H325Z"
              fill="none"
              stroke="var(--text)"
              strokeWidth="3"
            />
            <rect
              x="63"
              y={207 - (mix.available / 100800) * 150}
              width="169"
              height={(mix.available / 100800) * 150}
              fill="var(--accent)"
            />
            <rect
              x="328"
              y={207 - (mix.meltNeed / 100800) * 150}
              width="169"
              height={(mix.meltNeed / 100800) * 150}
              fill="var(--mint)"
            />
            <g fill="var(--text)" fontSize="14">
              <text x="145" y="28" textAnchor="middle">
                Su verebilir
              </text>
              <text x="410" y="28" textAnchor="middle">
                Tüm buz ister
              </text>
              <text x="145" y="240" textAnchor="middle">
                {fmt(mix.available)} J
              </text>
              <text x="410" y="240" textAnchor="middle">
                {fmt(mix.meltNeed)} J
              </text>
            </g>
          </svg>
          <div
            data-model-result
            className="forge093-physics-result"
            role="status"
          >
            <strong>Denge: {fmt(mix.temperature)} °C</strong>
            <p>
              Eriyen buz: {fmt(mix.melted)} g · Kalan buz: {fmt(mix.remaining)}{" "}
              g
            </p>
            <p>
              Son sıvı: {fmt(mix.liquidG)} g · Toplam kütle:{" "}
              {waterMass + iceMass} g
            </p>
          </div>
          <p>
            Ortak çubuk ölçeği 0–100.800 J. Önce suyun 0 °C’ye kadar verebildiği
            enerji ile tüm erime ihtiyacını karşılaştırılır; son sıcaklığa ancak
            bu testten sonra geçilir.
          </p>
          <Prediction
            id={id}
            prompt="Bu karışımda bütün buz erir mi?"
            choices={["Tamamı erir", "Bir kısmı kalır", "Hiç erimez"]}
            feedback={
              <p>
                Su {fmt(mix.available)} J verebilir; bütün buz için
                {fmt(mix.meltNeed)} J gerekir.{" "}
                {mix.remaining > 0
                  ? `Enerji yetmedi; ${fmt(mix.remaining)} g buz kaldığı için denge 0 °C.`
                  : `Bütün buz eridi; kalan enerji toplam ${waterMass + iceMass} g suyu ${fmt(mix.temperature)} °C’ye getirir.`}
              </p>
            }
          />
        </>
      )}
    </>
  );
}

function ChargeLab({ id }: { id: string }) {
  const uid = useId();
  const [s, set] = useExploration(key(id), {
    mode: "transfer",
    electrons: 4,
    step: 0,
    positive: true,
    disconnectFirst: true,
    revealed: false,
  });
  const electrons = limit(s.electrons, 0, 10, 4),
    step = limit(s.step, 0, 4, 0),
    induction = inductionState(step, s.positive ? 1 : -1, s.disconnectFirst);
  const sign = (n: number) =>
      n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : "0",
    rodSign = s.positive ? "+" : "−";
  const stages = s.disconnectFirst
    ? [
        "Nötr, bağlantısız iletken",
        "Çubuğu yaklaştır",
        "Çubuk dururken toprakla",
        "Önce toprağı kes",
        "Sonra çubuğu uzaklaştır",
      ]
    : [
        "Nötr, bağlantısız iletken",
        "Çubuğu yaklaştır",
        "Çubuk dururken toprakla",
        "Önce çubuğu uzaklaştır, toprak bağlı",
        "Sonra toprağı kes",
      ];
  return (
    <>
      <p>
        Olağan katı elektriklenmesinde hareket eden taşıyıcı elektrondur. +
        işareti protonların yer değiştirdiği değil elektron eksikliği, − işareti
        elektron fazlalığı anlamına gelir.
      </p>
      <div
        className="forge093-physics-modes"
        role="group"
        aria-label="Yük modeli"
      >
        <button
          className="secondary"
          aria-pressed={s.mode !== "induction"}
          onClick={() => set({ mode: "transfer", revealed: false })}
        >
          Elektron aktarımı
        </button>
        <button
          className="secondary"
          aria-pressed={s.mode === "induction"}
          onClick={() => set({ mode: "induction", revealed: false })}
        >
          Etki ve topraklama
        </button>
      </div>
      {s.mode !== "induction" ? (
        <>
          <ModelNumber
            label="A’dan B’ye geçen elektron sayısı"
            min={0}
            max={10}
            value={electrons}
            onChange={(n) => set({ electrons: n, revealed: false })}
          />
          <svg
            viewBox="0 0 560 260"
            role="img"
            aria-label={`A${sign(electrons)}e, B${sign(-electrons)}e net yüklü; toplam 0. ${electrons}elektronA’danB’ye geçti.`}
          >
            <circle
              cx="130"
              cy="130"
              r="80"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <circle
              cx="430"
              cy="130"
              r="80"
              fill="var(--surface)"
              stroke="var(--mint)"
              strokeWidth="3"
            />
            <g fill="var(--text)" fontSize="20">
              <text x="130" y="30" textAnchor="middle">
                A
              </text>
              <text x="430" y="30" textAnchor="middle">
                B
              </text>
              <text x="280" y="110" textAnchor="middle">
                e⁻ →
              </text>
              <text x="130" y="250" textAnchor="middle">
                {sign(electrons)}e
              </text>
              <text x="430" y="250" textAnchor="middle">
                {sign(-electrons)}e
              </text>
            </g>
            {Array.from({ length: electrons }, (_, i) => (
              <g key={i} fill="var(--text)" fontSize="19">
                <text x={95 + (i % 4) * 22} y={100 + Math.floor(i / 4) * 26}>
                  +
                </text>
                <text x={395 + (i % 4) * 22} y={100 + Math.floor(i / 4) * 26}>
                  −
                </text>
              </g>
            ))}
          </svg>
          <div
            data-model-result
            className="forge093-physics-result"
            role="status"
          >
            <p>
              A: <strong>{sign(electrons)}e</strong> · B:{" "}
              <strong>{sign(-electrons)}e</strong>
            </p>
            <p>
              q<sub>A</sub>+q<sub>B</sub>=0. Aktarılan yük büyüklüğü{" "}
              {fmt(electrons * 1.6, 1)}×10⁻¹⁹ C.
            </p>
          </div>
          <p className="small muted">
            İki örnek başlangıçta nötrdür. İşaretler net fazla/eksik yükü
            gösterir; atomların tamamını çizmez. Elektron aktarımı miktarı
            seçilir; bu, gerçek sürtünmede malzemeden bağımsız bir yük tahmin
            yasası değildir.
          </p>
          <Prediction
            id={id}
            prompt="A elektron verince net yükü ne olur?"
            choices={[
              "Pozitif olur",
              "Negatif olur",
              "Aktarım yoksa nötr kalır",
            ]}
            feedback={
              <p>
                {electrons === 0
                  ? "Aktarım 0; iki cisim nötr kaldı."
                  : `A ${electrons} negatif elektron verdiğinden +${electrons}e kalır; B aynı sayıyı kazandığından −${electrons}e olur.`}{" "}
                Toplam yük yaratılmadı; iki cisim birlikte korunur.
              </p>
            }
          />
        </>
      ) : (
        <>
          <label htmlFor={`${uid}-rod`}>
            Çubuğun yükü
            <select
              id={`${uid}-rod`}
              value={s.positive ? "positive" : "negative"}
              onChange={(e) =>
                set({
                  positive: e.target.value === "positive",
                  revealed: false,
                })
              }
            >
              <option value="positive">Pozitif (+)</option>
              <option value="negative">Negatif (−)</option>
            </select>
          </label>
          <label className="forge093-physics-check">
            <input
              type="checkbox"
              checked={s.disconnectFirst}
              onChange={(e) =>
                set({ disconnectFirst: e.target.checked, revealed: false })
              }
            />
            Önce toprağı kes, sonra çubuğu uzaklaştır
          </label>
          <ModelNumber
            label="Topraklama adımı"
            min={0}
            max={4}
            value={step}
            onChange={(n) => set({ step: n, revealed: false })}
          />
          <p>
            <strong>
              {step}. adım · {stages[step]}
            </strong>
          </p>
          <svg
            viewBox="0 0 560 300"
            role="img"
            aria-label={`${stages[step]}; iletken net ${sign(induction.net)}e, Dünya değişimi ${sign(induction.earthNet)}e.`}
          >
            {induction.rodPresent && (
              <g>
                <rect
                  x="35"
                  y="75"
                  width="65"
                  height="100"
                  rx="20"
                  fill="var(--accent)"
                />
                <text
                  x="67"
                  y="140"
                  textAnchor="middle"
                  fill="var(--accent-text)"
                  fontSize="45"
                >
                  {rodSign}
                </text>
              </g>
            )}
            <circle
              cx="280"
              cy="130"
              r="75"
              fill="var(--surface)"
              stroke="var(--text)"
              strokeWidth="3"
            />
            <text
              x="280"
              y="35"
              textAnchor="middle"
              fill="var(--text)"
              fontSize="18"
            >
              İletken
            </text>
            {step === 1 ? (
              <g fill="var(--text)" fontSize="28">
                <text x="220" y="135">
                  {s.positive ? "− −" : "+ +"}
                </text>
                <text x="290" y="135">
                  {s.positive ? "+ +" : "− −"}
                </text>
              </g>
            ) : (
              <text
                x="280"
                y="140"
                textAnchor="middle"
                fill="var(--text)"
                fontSize="28"
              >
                {sign(induction.net)}e
              </text>
            )}
            {induction.grounded && (
              <path
                d="M355 130H455V235"
                fill="none"
                stroke="var(--mint)"
                strokeWidth="4"
              />
            )}
            <path
              d="M455 235v20m-25 0h50m-42 10h34m-25 10h16"
              stroke="var(--text)"
              strokeWidth="3"
            />
            <text
              x="455"
              y="215"
              textAnchor="middle"
              fill="var(--text)"
              fontSize="16"
            >
              Dünya
            </text>
          </svg>
          <div
            data-model-result
            className="forge093-physics-result"
            role="status"
          >
            <p>
              İletken net: <strong>{sign(induction.net)}e</strong> · Dünya’nın
              yük değişimi: <strong>{sign(induction.earthNet)}e</strong>
            </p>
            <p>
              Seçilen iletken+Dünya toplamı0; çubuğun kendi yükü aktarılmıyor.
            </p>
          </div>
          <p className="small muted">
            4e, işlem sırasını göstermek için seçilmiş temsili bütçedir; gerçek
            indüklenen yükün büyüklüğü bu modelden ölçülmez. Çubuk yakındayken
            yalnız ayrışma için net 0 yeterlidir; toprak bağlıyken net yük sıfır
            olmak zorunda değildir. İzole tek iletken ve ideal Dünya deposu
            varsayılır.
          </p>
          <Prediction
            id={id}
            prompt="Son adımda hangi yük kalır?"
            choices={[
              "Çubuğa zıt yük",
              "Çubukla aynı yük",
              "Sıra tersse net yük kalmayabilir",
            ]}
            feedback={
              <p>
                {s.disconnectFirst
                  ? `Çubuk dururken toprak kesildi; son net yük ${sign(-(s.positive ? 1 : -1) * 4)}e kalır, işareti çubuğa zıttır.`
                  : "Çubuk önce uzaklaştı, iletken hâlâ toprağa bağlıydı; bu ideal protokolün sonunda net yük0 kalır."}{" "}
                Şu an{step}. adımdasın; elektronlar toprağa gidip gelebilir,
                protonlar taşınmaz.
              </p>
            }
          />
        </>
      )}
    </>
  );
}

function CircuitLab({ id }: { id: string }) {
  const uid = useId(),
    marker = `${uid}-arrow`;
  const [s, set] = useExploration(key(id), {
    voltage: 12,
    r1: 6,
    r2: 3,
    parallel: false,
    closed: true,
    revealed: false,
  });
  const voltage = limit(s.voltage, 1, 24, 12),
    r1 = limit(s.r1, 1, 12, 6),
    r2 = limit(s.r2, 1, 12, 3),
    model = circuitState(voltage, r1, r2, s.parallel, s.closed);
  const resistor = (x: number, y: number, value: number, name: string) => (
    <g>
      <rect
        x={x}
        y={y - 15}
        width="80"
        height="30"
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth="3"
      />
      <text
        x={x + 40}
        y={y - 29}
        textAnchor="middle"
        fill="var(--text)"
        stroke="none"
        fontSize="16"
      >
        {name}: {value} Ω
      </text>
    </g>
  );
  return (
    <>
      <p>
        İdeal doğru gerilim kaynağı; iç direnç ve kablo direnci0. İki ohmik
        dirençte sıcaklık sabit. Devre şeması bağlantıyı gösterir; çizgi
        uzunluğu tel direnci değildir.
      </p>
      <div className="forge093-physics-controls">
        <ModelNumber
          label="Kaynak gerilimi (V)"
          min={1}
          max={24}
          value={voltage}
          onChange={(n) => set({ voltage: n, revealed: false })}
        />
        <ModelNumber
          label="R1 direnci (Ω)"
          min={1}
          max={12}
          value={r1}
          onChange={(n) => set({ r1: n, revealed: false })}
        />
        <ModelNumber
          label="R2 direnci (Ω)"
          min={1}
          max={12}
          value={r2}
          onChange={(n) => set({ r2: n, revealed: false })}
        />
        <label htmlFor={`${uid}-connection`}>
          Dirençlerin bağlantısı
          <select
            id={`${uid}-connection`}
            value={s.parallel ? "parallel" : "series"}
            onChange={(e) =>
              set({ parallel: e.target.value === "parallel", revealed: false })
            }
          >
            <option value="series">Seri</option>
            <option value="parallel">Paralel</option>
          </select>
        </label>
      </div>
      <label className="forge093-physics-check">
        <input
          type="checkbox"
          checked={s.closed}
          onChange={(e) => set({ closed: e.target.checked, revealed: false })}
        />
        Anahtar kapalı
      </label>
      <svg
        viewBox="0 0 540 320"
        role="img"
        aria-label={`${s.parallel ? "Paralel" : "Seri"} devre, anahtar ${s.closed ? "kapalı" : "açık"}; kaynak ${voltage} volt, toplam akım ${fmt(model.total)} amper.`}
      >
        <defs>
          <marker
            id={marker}
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0 0L8 4L0 8Z" fill="var(--mint)" />
          </marker>
        </defs>
        <g stroke="var(--text)" strokeWidth="3" fill="none">
          <path d="M50 70V140M50 155V260H250M330 260H470V70M50 70H150" />
          <path d="M30 140H70M38 155H62" />
          {s.parallel ? (
            <>
              <path d="M150 70H220M300 70H470M150 70V175H220M300 175H470V70" />
              {resistor(220, 70, r1, "R1")}
              {resistor(220, 175, r2, "R2")}
            </>
          ) : (
            <>
              <path d="M150 70H160M240 70H310M390 70H470" />
              {resistor(160, 70, r1, "R1")}
              {resistor(310, 70, r2, "R2")}
            </>
          )}
          <path
            d={s.closed ? "M250 260H330" : "M250 260L315 230"}
            stroke="var(--accent)"
          />
          <circle cx="250" cy="260" r="4" fill="var(--text)" />
          <circle cx="330" cy="260" r="4" fill="var(--text)" />
        </g>
        <g fill="var(--text)" fontSize="16">
          <text x="80" y="145">
            +
          </text>
          <text x="80" y="168">
            −
          </text>
          <text x="18" y="210">
            {voltage} V
          </text>
          <text x="290" y="300" textAnchor="middle">
            Anahtar
          </text>
        </g>
        {s.closed && (
          <>
            <path
              d="M70 44H125"
              stroke="var(--mint)"
              strokeWidth="3"
              markerEnd={`url(#${marker})`}
            />
            <text x="83" y="28" fill="var(--text)" fontSize="14">
              I →
            </text>
          </>
        )}
      </svg>
      <div data-model-result className="forge093-physics-result" role="status">
        <p>
          R<sub>eş</sub> = {fmt(model.resistance)} Ω · Ana akım ={" "}
          <strong>{fmt(model.total)} A</strong>
        </p>
        <p>
          R1: {fmt(model.i1)} A · {fmt(model.v1)} V · {fmt(model.p1)} W
        </p>
        <p>
          R2: {fmt(model.i2)} A · {fmt(model.v2)} V · {fmt(model.p2)} W
        </p>
        <p>
          Kaynak gücü = {fmt(voltage * model.total)} W · Dirençlerin toplamı ={" "}
          {fmt(model.p1 + model.p2)} W
        </p>
      </div>
      <p>
        {!s.closed
          ? "Açık anahtar kararlı akım yolunu kesti: I=0. Dirençlerin gerilimi 0; kaynak gerilimi açık anahtar uçları arasında kalır."
          : s.parallel
            ? `Her iki kol ${voltage} V görüyor. Ana akım ${fmt(model.i1)}+${fmt(model.i2)}=${fmt(model.total)} A.`
            : `Aynı ${fmt(model.total)} A iki dirençten de geçer. Gerilimler ${fmt(model.v1)}+${fmt(model.v2)}=${voltage} V.`}{" "}
        Elektron sürüklenmesi dış metal devrede I okuna terstir.
      </p>
      <Prediction
        id={id}
        prompt="Bağlantıyı okuyarak hangi niceliğin ortak olduğunu tahmin et"
        choices={[
          "Seride akım, paralelde gerilim",
          "Her zaman akımlar eşit",
          "Her zaman gerilimler eşit",
        ]}
        feedback={
          <p>
            {s.parallel
              ? "R1 ve R2 aynı iki düğüme bağlıdır; gerilimleri aynı, akımları V/R’ye göre değişir."
              : "R1 ve R2 tek akım yolundadır; akımları aynı, gerilimleri I·R’ye göre paylaşılır."}{" "}
            {s.closed
              ? "Kaynak gücü, iki direncin dönüştürdüğü güç toplamına eşittir."
              : "Anahtar açıkken kararlı akım 0; bağlantının kapalı devre kuralını akım varmış gibi uygulama."}
          </p>
        }
      />
    </>
  );
}

function MagneticLab({ id }: { id: string }) {
  const uid = useId(),
    marker = `${uid}-b`;
  const [s, set] = useExploration(key(id), {
    mode: "magnet",
    northRight: true,
    angle: 90,
    current: 4,
    distance: 4,
    outward: true,
    revealed: false,
  });
  const angle = limit(s.angle, 0, 360, 90),
    current = limit(s.current, 1, 10, 4),
    distance = limit(s.distance, 2, 10, 4),
    theta = (angle * Math.PI) / 180;
  const field =
    s.mode === "wire"
      ? wireField(current, distance, angle, s.outward)
      : dipoleDirection(angle, s.northRight);
  const radius = s.mode === "wire" ? distance * 10 : 150,
    cx = 280 + radius * Math.cos(theta),
    cy = 250 - radius * Math.sin(theta);
  const arrow = (x: number, y: number, bx: number, by: number) => (
    <line
      x1={x - bx * 22}
      y1={y + by * 22}
      x2={x + bx * 22}
      y2={y - by * 22}
      stroke="var(--accent)"
      strokeWidth="4"
      markerEnd={`url(#${marker})`}
    />
  );
  const linePoints = (r0: number, bottom: boolean) =>
    Array.from({ length: 101 }, (_, i) => {
      const t = (i * Math.PI) / 100,
        r = r0 * Math.sin(t) ** 2;
      return `${280 + r * Math.cos(t)},${250 + (bottom ? 1 : -1) * r * Math.sin(t)}`;
    }).join(" ");
  return (
    <>
      <div
        className="forge093-physics-modes"
        role="group"
        aria-label="Manyetik kaynak"
      >
        <button
          className="secondary"
          aria-pressed={s.mode !== "wire"}
          onClick={() => set({ mode: "magnet", revealed: false })}
        >
          Çubuk ve pusula
        </button>
        <button
          className="secondary"
          aria-pressed={s.mode === "wire"}
          onClick={() => set({ mode: "wire", revealed: false })}
        >
          Akım geçen tel
        </button>
      </div>
      {s.mode !== "wire" ? (
        <>
          <p>
            Çubuk dışındaki alan yönü için dipol yaklaşımı. Pusula küçük; Dünya
            alanı ihmal. Çizgiler bir yön modelidir; gerçek mıknatısın tesla
            değeri veya kaldırma kuvveti ölçülmüyor.
          </p>
          <label htmlFor={`${uid}-pole`}>
            Mıknatıs yönü
            <select
              id={`${uid}-pole`}
              value={s.northRight ? "right" : "left"}
              onChange={(e) =>
                set({ northRight: e.target.value === "right", revealed: false })
              }
            >
              <option value="right">N sağda</option>
              <option value="left">N solda</option>
            </select>
          </label>
        </>
      ) : (
        <>
          <p>
            Hava/vakumda çok uzun ince tel, uç etkileri ve Dünya alanı ihmal.
            μ0=4π×10⁻⁷ T·m/A. P, tel eksenine dik düzlemde; r santimetreyle
            seçilir.
          </p>
          <ModelNumber
            label="Tel akımı (A)"
            min={1}
            max={10}
            value={current}
            onChange={(n) => set({ current: n, revealed: false })}
          />
          <ModelNumber
            label="Tele dik uzaklık (cm)"
            min={2}
            max={10}
            value={distance}
            onChange={(n) => set({ distance: n, revealed: false })}
          />
          <label htmlFor={`${uid}-current`}>
            Akımın sayfaya göre yönü
            <select
              id={`${uid}-current`}
              value={s.outward ? "out" : "in"}
              onChange={(e) =>
                set({ outward: e.target.value === "out", revealed: false })
              }
            >
              <option value="out">Dışarı (⊙)</option>
              <option value="in">İçeri (⊗)</option>
            </select>
          </label>
        </>
      )}
      <ModelNumber
        label="Pusula konumu (derece)"
        min={0}
        max={360}
        value={angle}
        onChange={(n) => set({ angle: n, revealed: false })}
      />
      <p className="small">
        Konum açısı sağdan başlayıp saat yönünün tersine artar:0° sağ,90°
        üst,180° sol,270° alt. Pusulanın N ucu ok ucundadır.
      </p>
      <svg
        viewBox="0 0 560 500"
        role="img"
        aria-label={`P konumu ${angle} derece. Manyetik alan yön birim bileşenleri sağa ${fmt(field.bx)}, yukarı ${fmt(field.by)}; pusulanın N ucu B yönüne döner.`}
      >
        <defs>
          <marker
            id={marker}
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path d="M0 0L7 3.5L0 7Z" fill="var(--accent)" />
          </marker>
          <marker
            id={`${uid}-inside`}
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path
              d="M0 0L7 3.5L0 7Z"
              fill={s.northRight ? "var(--accent-text)" : "var(--text)"}
            />
          </marker>
        </defs>
        {s.mode !== "wire" ? (
          <>
            <g fill="none" stroke="var(--muted)" strokeWidth="2">
              {[90, 130, 180, 220].flatMap((r) =>
                [false, true].map((bottom) => (
                  <polyline
                    key={`${r}-${bottom}`}
                    points={linePoints(r, bottom)}
                  />
                )),
              )}
            </g>
            {[90, 130, 180, 220].flatMap((r) =>
              [false, true].map((bottom) => (
                <g key={`${r}-${bottom}`}>
                  {arrow(
                    280,
                    250 + (bottom ? r : -r),
                    s.northRight ? -1 : 1,
                    0,
                  )}
                </g>
              )),
            )}
            <rect
              x="220"
              y="225"
              width="60"
              height="50"
              fill="var(--surface-2)"
              stroke="var(--text)"
            />
            <rect
              x="280"
              y="225"
              width="60"
              height="50"
              fill="var(--accent)"
              stroke="var(--text)"
            />
            <text
              x="250"
              y="245"
              textAnchor="middle"
              fill="var(--text)"
              fontSize="20"
            >
              {s.northRight ? "S" : "N"}
            </text>
            <text
              x="310"
              y="245"
              textAnchor="middle"
              fill="var(--accent-text)"
              fontSize="20"
            >
              {s.northRight ? "N" : "S"}
            </text>
            <line
              x1={s.northRight ? 240 : 320}
              y1="265"
              x2={s.northRight ? 320 : 240}
              y2="265"
              stroke="var(--mint)"
              strokeWidth="2"
              markerEnd={`url(#${uid}-inside)`}
            />
          </>
        ) : (
          <>
            {[30, 60, 90, 120].map((r) => (
              <g key={r}>
                <circle
                  cx="280"
                  cy="250"
                  r={r}
                  fill="none"
                  stroke="var(--muted)"
                  strokeWidth="2"
                />
                {arrow(280 + r, 250, 0, s.outward ? 1 : -1)}
              </g>
            ))}
            <circle
              cx="280"
              cy="250"
              r="15"
              fill="var(--surface)"
              stroke="var(--text)"
              strokeWidth="3"
            />
            {s.outward ? (
              <circle cx="280" cy="250" r="4" fill="var(--text)" />
            ) : (
              <path
                d="M272 242L288 258M288 242L272 258"
                stroke="var(--text)"
                strokeWidth="3"
              />
            )}
          </>
        )}
        <circle
          cx={cx}
          cy={cy}
          r="30"
          fill="var(--surface)"
          stroke="var(--text)"
          strokeWidth="2"
        />
        {arrow(cx, cy, field.bx, field.by)}
        <text
          x={cx}
          y={cy + 51}
          textAnchor="middle"
          fill="var(--text)"
          fontSize="16"
        >
          P · pusula
        </text>
      </svg>
      <div data-model-result className="forge093-physics-result" role="status">
        {s.mode === "wire" ? (
          <p>
            Manyetik alan ={" "}
            <strong>
              {fmt(wireField(current, distance, angle, s.outward).microTesla)}{" "}
              μT
            </strong>
            . Dolanım: {s.outward ? "saat yönünün tersi" : "saat yönü"}.
          </p>
        ) : (
          <p>
            Kutup düzeni:{" "}
            {s.northRight ? "S solda, N sağda" : "N solda, S sağda"}. Pusula N
            ucu yerel B’ye yönelir.
          </p>
        )}
        <p>
          B yönü: sağ bileşen {fmt(field.bx)}, yukarı bileşen {fmt(field.by)}.
        </p>
        <p className="small">
          Bileşenler birim yön vektörüdür; tesla büyüklüğü değildir. Eksi,
          sol/aşağı yönünü gösterir.
        </p>
      </div>
      <p className="small muted">
        Çubukta çizgiler dışarıda N→S, içeride S→N kapanır; çizilen alan gücü
        ölçümü değildir. Tel çevresinde çizgiler çemberdir, P oku çembere
        teğettir. Okların ekran boyu alan büyüklüğünü kodlamaz; telin sayısal
        B’si ayrı hesaplanır.
      </p>
      <Prediction
        id={id}
        prompt="Kaynağın yönünü ters çevirirsen P’deki B ne olur?"
        choices={[
          "Yön tersine döner",
          "Yön aynı kalır",
          "Her durumda alan yok olur",
        ]}
        feedback={
          <p>
            {s.mode === "wire"
              ? "Sağ elin başparmağı I yönünde tutulur. Akım tersine dönünce çemberdeki dolaşım ve P’deki teğet yön tersine döner; aynı I ve r’de büyüklük değişmez."
              : "Mıknatısın N ve S uçları yer değiştirince aynı dış noktadaki alan ve pusula yönü tersine döner. Pusula mıknatısın merkezini değil yerel B yönünü izler."}
          </p>
        }
      />
    </>
  );
}

export default function Forge093PhysicsLab({ id }: { id: string }) {
  if (!(id in titles)) return null;
  return (
    <section
      className="concept-model forge093-physics-lab"
      data-forge093={id}
      aria-label={`${titles[id]} atölyesi`}
    >
      <h3>{titles[id]}</h3>
      {id === "genlesme" ? (
        <ExpansionLab key={id} id={id} />
      ) : id === "hal-degisimi" ? (
        <PhaseLab key={id} id={id} />
      ) : id === "durgun-elektrik" ? (
        <ChargeLab key={id} id={id} />
      ) : id === "elektrik-akimi" ? (
        <CircuitLab key={id} id={id} />
      ) : (
        <MagneticLab key={id} id={id} />
      )}
      <p className="small muted">
        Seçimler, tahmin ve gerekçe bu cihazda saklanır. Keşif XP, ustalık, soru
        doğrusu veya konu tamamlanması oluşturmaz. Bağımsız sorular Sorular
        bölümündedir.
      </p>
    </section>
  );
}
