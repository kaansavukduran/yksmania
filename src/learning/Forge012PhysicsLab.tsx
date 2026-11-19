import { useId, type ReactNode } from "react";
import { ModelNumber } from "./ModelNumber";
import { useExploration } from "./useExploration";
import {
  waterRefraction,
  soundState,
  seismicState,
  illuminanceState,
  shadowState,
  mirrorState,
  reflectedRay,
} from "./forge012Physics";
import "./forge012Physics.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (v: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(v) < 1e-8 ? 0 : v,
  );
const bound = (v: number, min: number, max: number, fallback: number) =>
  Number.isFinite(v) ? Math.max(min, Math.min(max, Math.round(v))) : fallback;
const key = (id: string) => `forge012-physics-${id}`;
type PredictionValue = { guess: string; reason: string; checked: boolean };
function Comparison({
  uid,
  question,
  choices,
  expected,
  values,
  onChange,
  children,
}: {
  uid: string;
  question: string;
  choices: string[];
  expected: string;
  values: PredictionValue;
  onChange: (v: Partial<PredictionValue>) => void;
  children: ReactNode;
}) {
  return (
    <fieldset className="physics012-comparison">
      <legend>{question}</legend>
      <div className="physics012-guesses">
        {choices.map((choice) => (
          <label key={choice}>
            <input
              type="radio"
              name={`${uid}-guess`}
              checked={values.guess === choice}
              value={choice}
              onChange={() => onChange({ guess: choice, checked: false })}
            />
            {choice}
          </label>
        ))}
      </div>
      <label htmlFor={`${uid}-reason`}>Modelden gerekçen</label>
      <textarea
        id={`${uid}-reason`}
        rows={3}
        maxLength={120}
        value={values.reason.slice(0, 120)}
        onChange={(e) =>
          onChange({ reason: e.target.value.slice(0, 120), checked: false })
        }
        placeholder="Hangi büyüklüğü sabit tuttun, hangisini değiştirdin?"
      />
      <button
        type="button"
        className="secondary"
        disabled={!choices.includes(values.guess) || !values.reason.trim()}
        onClick={() => onChange({ checked: true })}
      >
        Tahminimi kanıtla karşılaştır
      </button>
      {values.checked && choices.includes(values.guess) && (
        <div className="physics012-feedback" role="status">
          <strong>
            {values.guess === expected
              ? "Tahminin verilen koşullarla uyumlu."
              : "Tahminini modelin koşullarıyla yeniden karşılaştır."}
          </strong>
          {children}
          <p>Gerekçen: {values.reason}</p>
          <p className="small muted">
            Gerekçen otomatik puanlanmaz; açıklamayla karşılaştırarak denetle.
          </p>
        </div>
      )}
    </fieldset>
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
    <section data-forge012={id} className="physics012-lab">
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="small muted">
        Bu görsel keşif ayrı kaydedilir; bağımsız doğru cevap, XP veya konu
        tamamlanması sayılmaz.
      </p>
    </section>
  );
}
function Water() {
  const id = "su-dalgalari",
    uid = useId();
  const [saved, set] = useExploration(key(id), {
    frequency: 3,
    speed1: 30,
    speed2: 15,
    incidence: 30,
    guess: "",
    reason: "",
    checked: false,
  });
  const frequency = bound(saved.frequency, 1, 6, 3),
    speed1 = bound(saved.speed1, 15, 60, 30),
    speed2 = bound(saved.speed2, 15, 60, 15),
    incidence = bound(saved.incidence, 0, 60, 30),
    m = waterRefraction(frequency, speed1, speed2, incidence);
  const update = (p: Partial<typeof saved>) => set({ ...p, checked: false });
  const i = (incidence * Math.PI) / 180,
    r = ((m.angle2 ?? 0) * Math.PI) / 180;
  const upper = { x: 300 - 125 * Math.sin(i), y: 170 - 125 * Math.cos(i) },
    lower = { x: 300 + 125 * Math.sin(r), y: 170 + 125 * Math.cos(r) };
  const expected =
    speed2 < speed1 ? "Daha küçük" : speed2 > speed1 ? "Daha büyük" : "Aynı";
  return (
    <Frame
      id={id}
      title="İki bölge arasında aynı kaynağı izle"
      intro="Süratleri ölçülmüş iki durgun su bölgesini karşılaştır. Açıları ilerleme ışını ile normal arasında ölçüyoruz; frekans kaynakta sabit kalır."
    >
      <div className="physics012-controls">
        <ModelNumber
          label="Kaynak frekansı (Hz)"
          value={frequency}
          min={1}
          max={6}
          onChange={(frequency) => update({ frequency })}
        />
        <ModelNumber
          label="Birinci bölge sürati (cm/s)"
          value={speed1}
          min={15}
          max={60}
          onChange={(speed1) => update({ speed1 })}
        />
        <ModelNumber
          label="İkinci bölge sürati (cm/s)"
          value={speed2}
          min={15}
          max={60}
          onChange={(speed2) => update({ speed2 })}
        />
        <ModelNumber
          label="Normalden geliş açısı (°)"
          value={incidence}
          min={0}
          max={60}
          onChange={(incidence) => update({ incidence })}
        />
      </div>
      <svg
        viewBox="0 0 600 340"
        role="img"
        aria-labelledby={`${uid}-drawing`}
        data-water-refraction
      >
        <title id={`${uid}-drawing`}>
          Birinci dalga boyu {fmt(m.wavelength1)} cm; ikinci{" "}
          {fmt(m.wavelength2)} cm.{" "}
          {m.canTransmit
            ? `Kırılma açısı ${fmt(m.angle2!)} derece.`
            : "Seçili sürat ve açı için ilerleyen kırılmış ışın bulunmuyor."}
        </title>
        <defs>
          <clipPath id={`${uid}-top`}>
            <rect x="20" y="20" width="560" height="150" />
          </clipPath>
          <clipPath id={`${uid}-bottom`}>
            <rect x="20" y="170" width="560" height="150" />
          </clipPath>
        </defs>
        <rect
          x="20"
          y="20"
          width="560"
          height="150"
          className="physics012-water"
        />
        <rect
          x="20"
          y="170"
          width="560"
          height="150"
          className="physics012-wet"
        />
        <line x1="20" y1="170" x2="580" y2="170" className="physics012-axis" />
        <line
          x1="300"
          y1="20"
          x2="300"
          y2="320"
          className="physics012-dimension"
        />
        <g clipPath={`url(#${uid}-top)`}>
          {Array.from({ length: 24 }, (_, j) => {
            const d = j * m.wavelength1 * 3;
            const cx = 300 - d * Math.sin(i),
              cy = 170 - d * Math.cos(i);
            return (
              <line
                data-water-front="incident"
                key={j}
                x1={cx - 180 * Math.cos(i)}
                y1={cy + 180 * Math.sin(i)}
                x2={cx + 180 * Math.cos(i)}
                y2={cy - 180 * Math.sin(i)}
                className="physics012-front"
              />
            );
          })}
        </g>
        <path
          d={`M${upper.x} ${upper.y}L300 170`}
          className="physics012-wave"
        />
        {m.canTransmit && (
          <g clipPath={`url(#${uid}-bottom)`}>
            {Array.from({ length: 24 }, (_, j) => {
              const d = j * m.wavelength2 * 3,
                cx = 300 + d * Math.sin(r),
                cy = 170 + d * Math.cos(r);
              return (
                <line
                  data-water-front="transmitted"
                  key={j}
                  x1={cx - 180 * Math.cos(r)}
                  y1={cy + 180 * Math.sin(r)}
                  x2={cx + 180 * Math.cos(r)}
                  y2={cy - 180 * Math.sin(r)}
                  className="physics012-front physics012-front-second"
                />
              );
            })}
            <path
              data-water-ray="transmitted"
              d={`M300 170L${lower.x} ${lower.y}`}
              className="physics012-transmitted"
            />
          </g>
        )}
        <circle cx="300" cy="170" r="5" className="physics012-marker" />
      </svg>
      <div className="physics012-result" data-model-result>
        <strong>
          Birinci λ: {fmt(m.wavelength1)} cm · İkinci λ: {fmt(m.wavelength2)} cm
        </strong>
        <p>
          Frekans iki bölgede {frequency} Hz; periyot {fmt(m.period, 3)} s.
          Normalden geliş {incidence}°;{" "}
          {m.canTransmit
            ? `kırılma ${fmt(m.angle2!)}°.`
            : "seçilen koşulda basit ilerleyen kırılmış ışın yok."}
        </p>
        <p>
          {m.canTransmit
            ? incidence === 0
              ? "Dik gelişte doğrultu sapmaz; sürat farklıysa dalga boyu yine değişir."
              : speed2 < speed1
                ? "Daha yavaş bölgeye geçişte ışın normale yaklaşır."
                : speed2 > speed1
                  ? "Daha hızlı bölgeye geçişte ışın normalden uzaklaşır."
                  : "Eşit süratlerde doğrultu ve dalga boyu değişmez."
            : "Sinüs bağıntısı 1’den büyük değer verdiği için hayalî açı çizilmiyor. Bu durum temel geçiş örneğinin sınırını gösterir."}
        </p>
      </div>
      <p className="small muted">
        Cephe çizgileri tepe konumlarının temsili üstten görünümüdür; kalın
        ışınlar ilerleme yönünü, kesik doğru sınır normalini gösterir. Süratler
        veridir; model gerçek deniz tabanını veya genlik yansımasını hesaplamaz.
      </p>
      <Comparison
        uid={uid}
        question="Aynı kaynak için ikinci bölgedeki dalga boyu birinciye göre nasıl?"
        choices={["Daha küçük", "Aynı", "Daha büyük"]}
        expected={expected}
        values={saved}
        onChange={set}
      >
        <p>
          λ=v/f. Aynı f altında sürat oranı ile dalga boyu oranı aynıdır; açı
          oranı için normalden ölçüm gerekir.
        </p>
      </Comparison>
    </Frame>
  );
}
function Sound() {
  const id = "ses-deprem-dalgalari",
    uid = useId();
  const [saved, set] = useExploration(key(id), {
    mode: "sound",
    frequency: 340,
    speed: 340,
    distance: 102,
    quakeDistance: 120,
    phase: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const mode = saved.mode === "quake" ? "quake" : "sound",
    frequency = bound(saved.frequency, 100, 1000, 340),
    speed = bound(saved.speed, 330, 360, 340),
    distance = bound(saved.distance, 10, 170, 102),
    qd = bound(saved.quakeDistance, 30, 300, 120),
    phase = bound(saved.phase, 0, 3, 0),
    m = soundState(frequency, speed, distance),
    q = seismicState(qd, 6, 3);
  const update = (p: Partial<typeof saved>) => set({ ...p, checked: false });
  return (
    <Frame
      id={id}
      title="Sesi ve varış farkını ayrı ölç"
      intro="Gazdaki boyuna sesin sıkışma bölgelerini ve sabit hava süratinde dalga boyunu izle. İkinci düzenek, verilen sabit P/S süratleriyle ayrı bir deprem yol modelidir."
    >
      <label htmlFor={`${uid}-mode`}>İncelenen düzenek</label>
      <ChoiceSelect
        id={`${uid}-mode`}
        value={mode}
        onChange={(e) => update({ mode: e.target.value })}
      >
        <option value="sound">Ses ve yankı</option>
        <option value="quake">Deprem varışları</option>
      </ChoiceSelect>
      {mode === "sound" ? (
        <>
          <div className="physics012-controls">
            <ModelNumber
              label="Ses frekansı (Hz)"
              value={frequency}
              min={100}
              max={1000}
              onChange={(frequency) => update({ frequency })}
            />
            <ModelNumber
              label="Hava sürati (m/s)"
              value={speed}
              min={330}
              max={360}
              onChange={(speed) => update({ speed })}
            />
            <ModelNumber
              label="Duvar uzaklığı (m)"
              value={distance}
              min={10}
              max={170}
              onChange={(distance) => update({ distance })}
            />
          </div>
          <svg
            viewBox="0 0 600 260"
            role="img"
            aria-labelledby={`${uid}-drawing`}
            data-sound-wave
          >
            <title id={`${uid}-drawing`}>
              Boyuna ses: dalga boyu {fmt(m.wavelength)} m. Parçacıklar denge
              çevresinde ileri geri hareket eder.
            </title>
            <line
              x1="30"
              y1="130"
              x2="570"
              y2="130"
              className="physics012-dimension"
            />
            {Array.from({ length: 48 }, (_, j) => {
              const origin = 45 + j * 10.7,
                x =
                  origin +
                  7 *
                    Math.sin(
                      (2 * Math.PI * (j / 24)) / m.wavelength -
                        (phase * Math.PI) / 2,
                    );
              return (
                <g key={j}>
                  <circle
                    cx={origin}
                    cy="130"
                    r="2"
                    className="physics012-origin"
                  />
                  <circle
                    data-sound-particle
                    cx={x}
                    cy="130"
                    r="4"
                    className="physics012-marker"
                  />
                </g>
              );
            })}
            <path
              d={`M60 205H${60 + distance * 2.4}m-8-7 8 7-8 7M${60 + distance * 2.4} 225H60m8-7-8 7 8 7`}
              className="physics012-transmitted"
            />
            <line
              x1={60 + distance * 2.4}
              y1="185"
              x2={60 + distance * 2.4}
              y2="245"
              className="physics012-wall"
            />
          </svg>
          <div className="physics012-actions">
            <button
              className="secondary"
              onClick={() => update({ phase: (phase + 1) % 4 })}
            >
              Bir çeyrek periyot ilerlet
            </button>
            <button className="secondary" onClick={() => update({ phase: 0 })}>
              İlk ana dön
            </button>
          </div>
          <div className="physics012-result" data-model-result>
            <strong>
              λ: {fmt(m.wavelength, 3)} m · Yankı: {fmt(m.echoTime, 3)} s
            </strong>
            <p>
              Duvara tek yön {distance} m; gidiş-dönüş {m.totalPath} m. t=2d/v.
              Hava sürati {speed} m/s, frekans {frequency} Hz.
            </p>
            <p>
              Parçacıklar küçük noktalı denge yerlerinin çevresinde salınır;
              oklar sesin engel yolunu temsil eder. Parçacık şeridi 2 m’lik
              temsili kesittir; duvar çizimi ayrı ölçekte verilmiştir.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="physics012-controls">
            <ModelNumber
              label="Deprem dalgası yolu (km)"
              value={qd}
              min={30}
              max={300}
              onChange={(quakeDistance) => update({ quakeDistance })}
            />
          </div>
          <svg
            viewBox="0 0 600 260"
            role="img"
            aria-labelledby={`${uid}-drawing`}
            data-seismic
          >
            <title id={`${uid}-drawing`}>
              P {fmt(q.pTime)} saniye, S {fmt(q.sTime)} saniye sonra gelir.
            </title>
            <line
              x1="60"
              y1="210"
              x2="550"
              y2="210"
              className="physics012-axis"
            />
            <path
              data-seismic-time="p"
              d={`M80 210V${210 - q.pTime * 1.4}H220V210`}
              className="physics012-wave"
            />
            <path
              data-seismic-time="s"
              d={`M340 210V${210 - q.sTime * 1.4}H480V210`}
              className="physics012-transmitted"
            />
            <text x="150" y="240" textAnchor="middle">
              P · 6 km/s
            </text>
            <text x="410" y="240" textAnchor="middle">
              S · 3 km/s
            </text>
          </svg>
          <div className="physics012-result" data-model-result>
            <strong>
              P: {fmt(q.pTime)} s · S: {fmt(q.sTime)} s · Fark:{" "}
              {fmt(q.difference)} s
            </strong>
            <p>
              İki dalga aynı {qd} km yolu başlangıçtan itibaren alır. Sıvı
              katman veya farklı yol yoktur; bu homojen ideal modeldir. Sütunlar
              varış süresini gösterir, yerel hasarı veya deprem büyüklüğünü
              göstermez.
            </p>
          </div>
        </>
      )}
      <Comparison
        uid={uid}
        question={
          mode === "sound"
            ? "Aynı hava koşulunda frekans artırılırsa dalga boyu nasıl değişir?"
            : "Bu modelde aynı yolu hangi dalga önce tamamlar?"
        }
        choices={
          mode === "sound"
            ? ["Azalır", "Artar", "Değişmez"]
            : ["P dalgası", "S dalgası", "Aynı anda"]
        }
        expected={mode === "sound" ? "Azalır" : "P dalgası"}
        values={saved}
        onChange={set}
      >
        <p>
          {mode === "sound"
            ? "Sürat sabitken λ=v/f; tizleşme daha hızlı yayılma değildir. Yankı süresi de frekansa değil yol ve sürate bağlıdır."
            : "t=d/v; aynı yolda6 km/s süratli P,3 km/s süratli S’den önce gelir. Bu hesap bir sonraki depremin zamanını tahmin etmez."}
        </p>
      </Comparison>
    </Frame>
  );
}
function Light() {
  const id = "isik-bilgisi",
    uid = useId();
  const [saved, set] = useExploration(key(id), {
    intensity: 120,
    distance: 2,
    normalAngle: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const intensity = bound(saved.intensity, 20, 400, 120),
    distance = bound(saved.distance, 1, 8, 2),
    normalAngle = bound(saved.normalAngle, 0, 90, 0),
    m = illuminanceState(intensity, distance, normalAngle),
    target = 160 + distance * 40;
  const update = (p: Partial<typeof saved>) => set({ ...p, checked: false });
  return (
    <Frame
      id={id}
      title="Aynı lambayı uzaklık ve açıyla karşılaştır"
      intro="Her yöne eş ışık veren ideal noktasal kaynak ve küçük bir yüzey kullanıyoruz. Açı, ışın ile yüzey normali arasındadır; kaynağın candela değeri uzaklaşmakla değişmez."
    >
      <div className="physics012-controls">
        <ModelNumber
          label="Işık şiddeti (cd)"
          value={intensity}
          min={20}
          max={400}
          onChange={(intensity) => update({ intensity })}
        />
        <ModelNumber
          label="Kaynağa uzaklık (m)"
          value={distance}
          min={1}
          max={8}
          onChange={(distance) => update({ distance })}
        />
        <ModelNumber
          label="Yüzey normalinin açısı (°)"
          value={normalAngle}
          min={0}
          max={90}
          onChange={(normalAngle) => update({ normalAngle })}
        />
      </div>
      <svg
        viewBox="0 0 600 300"
        role="img"
        aria-labelledby={`${uid}-drawing`}
        data-illuminance
      >
        <title id={`${uid}-drawing`}>
          Aydınlanma {fmt(m.lux)} lüks. Kaynak uzaklığı {distance} metre ve
          normal açısı {normalAngle} derece.
        </title>
        <circle cx="65" cy="150" r="19" className="physics012-marker" />
        {[-70, -35, 0, 35, 70].map((y) => (
          <path
            key={y}
            d={`M85 150L550 ${150 + y}`}
            className="physics012-light-ray"
          />
        ))}
        <line
          x1="85"
          y1="150"
          x2={target}
          y2="150"
          className="physics012-dimension"
        />
        <g transform={`translate(${target} 150)rotate(${normalAngle})`}>
          <line x1="0" y1="-75" x2="0" y2="75" className="physics012-plate" />
          <line
            data-surface-normal
            x1="-65"
            y1="0"
            x2="65"
            y2="0"
            className="physics012-normal"
          />
        </g>
        <rect
          data-lux-fill
          x="48"
          y="255"
          width={Math.min(500, m.lux * 1.1)}
          height="16"
          className="physics012-object"
        />
      </svg>
      <div className="physics012-result" data-model-result>
        <strong>Aydınlanma: {fmt(m.lux)} lx</strong>
        <p>
          E={intensity}·cos{normalAngle}°/{distance}². Aynı uzaklıkta dik yüzey:{" "}
          {fmt(m.normalLux)} lx. Seçili yönelim dik değerin %
          {fmt(m.factor * 100)} kadarını alır.
        </p>
        <p>
          Kaynağın toplam akısı, kayıpsız ve eş yönlü modelde 4πI={fmt(m.flux)}{" "}
          lm; uzaklık veya yüzeyin açısıyla değişmez. Yüzey çizimi küçük
          alıcının yönelimidir; çizim tüm odadaki ışık akışını hesaplamaz.
        </p>
      </div>
      <Comparison
        uid={uid}
        question="Seçili yüzey, aynı uzaklıktaki dik yüzeye göre nasıl aydınlanır?"
        choices={["Daha az", "Aynı", "Daha fazla"]}
        expected={normalAngle === 0 ? "Aynı" : "Daha az"}
        values={saved}
        onChange={set}
      >
        <p>
          0≤cosθ≤1 olduğundan aynı I ve r’de eğim E’yi artıramaz. θ=90°
          durumunda ideal yüzeyden geçen akı sıfırdır; kaynak sönmez.
        </p>
      </Comparison>
    </Frame>
  );
}
function Shadow() {
  const id = "golge-yari-golge",
    uid = useId();
  const [saved, set] = useExploration(key(id), {
    twoSources: true,
    separation: 40,
    halfHeight: 20,
    screen: 100,
    guess: "",
    reason: "",
    checked: false,
  });
  const separation = bound(saved.separation, 0, 80, 40),
    halfHeight = bound(saved.halfHeight, 8, 30, 20),
    screen = bound(saved.screen, 80, 120, 100),
    m = shadowState(40, screen, halfHeight, separation, saved.twoSources),
    x = (v: number) => 60 + v * 3.9,
    y = (v: number) => 200 + v;
  const update = (p: Partial<typeof saved>) => set({ ...p, checked: false });
  return (
    <Frame
      id={id}
      title="Perdede ulaşan kaynakları say"
      intro="Opak engel kaynaktan 40 cm uzakta. Kesit boyutlarını değiştir; her kaynağın gölgesini ayrı çizip kesişimi bul. İki kaynak eş güçlü noktalardır; geniş bir lambanın sürekli yarı gölgesi hesaplanmıyor."
    >
      <label className="physics012-check">
        <input
          type="checkbox"
          checked={saved.twoSources}
          onChange={(e) => update({ twoSources: e.target.checked })}
        />
        İki noktasal kaynak kullan
      </label>
      <div className="physics012-controls">
        <ModelNumber
          label="Kaynaklar arası uzaklık (cm)"
          value={separation}
          min={0}
          max={80}
          onChange={(separation) => update({ separation })}
        />
        <ModelNumber
          label="Engelin yarı boyu (cm)"
          value={halfHeight}
          min={8}
          max={30}
          onChange={(halfHeight) => update({ halfHeight })}
        />
        <ModelNumber
          label="Kaynak-perde uzaklığı (cm)"
          value={screen}
          min={80}
          max={120}
          onChange={(screen) => update({ screen })}
        />
      </div>
      <svg
        viewBox="0 0 600 400"
        role="img"
        aria-labelledby={`${uid}-drawing`}
        data-shadow-geometry
      >
        <title id={`${uid}-drawing`}>
          Tam gölge boyu {fmt(m.fullWidth)} cm; yarı gölgelerin toplam boyu{" "}
          {fmt(m.partialWidth)} cm.
        </title>
        <line
          x1={x(screen)}
          y1="25"
          x2={x(screen)}
          y2="375"
          className="physics012-screen"
        />
        {m.intervals.map((p, j) => (
          <g key={j} data-shadow-source={j}>
            <path
              d={`M${x(0)} ${y(p.source)}L${x(screen)} ${y(p.min)}M${x(0)} ${y(p.source)}L${x(screen)} ${y(p.max)}`}
              className={
                j === 0
                  ? "physics012-boundary"
                  : "physics012-boundary physics012-boundary-second"
              }
            />
            <circle
              cx={x(0)}
              cy={y(p.source)}
              r="6"
              className="physics012-marker"
            />
          </g>
        ))}
        <line
          x1={x(40)}
          y1={y(-halfHeight)}
          x2={x(40)}
          y2={y(halfHeight)}
          className="physics012-wall"
        />
        {m.segments.map((p, j) => (
          <rect
            key={j}
            data-shadow-region={p.kind}
            x={x(screen) - 9}
            y={y(p.min)}
            width="18"
            height={p.max - p.min}
            className={`physics012-shadow-${p.kind}`}
          />
        ))}
        <text x={x(40)} y="390" textAnchor="middle">
          Opak engel
        </text>
      </svg>
      <div className="physics012-result" data-model-result>
        <strong>
          Tam gölge: {fmt(m.fullWidth)} cm · Yarı gölge toplamı:{" "}
          {fmt(m.partialWidth)} cm
        </strong>
        <p>
          Kaynak-perde/ kaynak-engel oranı: {fmt(m.magnification)}. Her tek
          kaynağın gölge boyu {fmt(2 * m.halfShadow)} cm.{" "}
          {saved.twoSources
            ? "Ortak karanlık, iki aralığın kesişimidir."
            : "Tek ideal noktasal kaynakta yarı gölge bandı yoktur."}
        </p>
        <ul>
          {m.intervals.map((p, j) => (
            <li key={j}>
              {j + 1}. kaynağın engellendiği aralık: {fmt(p.min)}–{fmt(p.max)}{" "}
              cm.
            </li>
          ))}
        </ul>
        <p>
          {m.fullWidth > 0
            ? "Tam gölgede etkin kaynakların hiçbiri görünmez."
            : "Ortak tam gölge yoktur. Bu sonuç yarı gölge bölgelerinin yokluğu demek değildir."}{" "}
          Çizim uzunluk kesitini verir; alan hesabı değildir.
        </p>
      </div>
      <Comparison
        uid={uid}
        question="Seçili düzende perdede pozitif boylu tam gölge var mı?"
        choices={["Var", "Yok"]}
        expected={m.fullWidth > 1e-8 ? "Var" : "Yok"}
        values={saved}
        onChange={set}
      >
        <p>
          Her etkin kaynağın engellendiği aralığı kesiştir. Yalnız bir kaynak
          engelleniyorsa iki kaynaklı modelde o bölüm yarı gölgedir.
        </p>
      </Comparison>
    </Frame>
  );
}
function Mirror() {
  const id = "duzlem-ayna",
    uid = useId();
  const [saved, set] = useExploration(key(id), {
    distance: 40,
    mirror: 0,
    incidence: 30,
    guess: "",
    reason: "",
    checked: false,
  });
  const distance = bound(saved.distance, 20, 80, 40),
    mirror = bound(saved.mirror, -10, 20, 0),
    incidence = bound(saved.incidence, 0, 60, 30),
    m = mirrorState(-distance, mirror, incidence),
    mx = 300 + mirror * 2,
    ox = 300 - distance * 2,
    ix = 300 + m.imageX * 2,
    dy = reflectedRay(incidence).rise;
  const update = (p: Partial<typeof saved>) => set({ ...p, checked: false });
  return (
    <Frame
      id={id}
      title="Görüntüyü simetriyle, ışını normalle kur"
      intro="Cismin koordinatı başlangıç aynasının solunda. Aynayı veya cismi ayrı değiştir; görüntünün aynı yer referansındaki yeni konumunu izle. Ayrı küçük ışın diyagramı normalden gelme ve yansımayı gösterir."
    >
      <div className="physics012-controls">
        <ModelNumber
          label="Cismin başlangıç düzlemine uzaklığı (cm)"
          value={distance}
          min={20}
          max={80}
          onChange={(distance) => update({ distance })}
        />
        <ModelNumber
          label="Aynanın yer koordinatı (cm)"
          value={mirror}
          min={-10}
          max={20}
          onChange={(mirror) => update({ mirror })}
        />
        <ModelNumber
          label="Normalden gelme açısı (°)"
          value={incidence}
          min={0}
          max={60}
          onChange={(incidence) => update({ incidence })}
        />
      </div>
      <svg
        viewBox="0 0 600 400"
        role="img"
        aria-labelledby={`${uid}-drawing`}
        data-plane-mirror
      >
        <title id={`${uid}-drawing`}>
          Cisim koordinatı−{distance}, ayna{mirror}, görüntü{fmt(m.imageX)} cm.
          Yansıma açısı{incidence} derece.
        </title>
        <line
          data-mirror-surface
          x1={mx}
          y1="25"
          x2={mx}
          y2="180"
          className="physics012-mirror"
        />
        <path
          data-object-arrow
          d={`M${ox} 155V65m-8 14 8-14 8 14`}
          className="physics012-wave"
        />
        <path
          data-image-arrow
          d={`M${ix} 155V65m-8 14 8-14 8 14`}
          className="physics012-virtual"
        />
        <line
          x1={ox}
          y1="165"
          x2={ix}
          y2="165"
          className="physics012-dimension"
        />
        <text x={ox} y="198" textAnchor="middle">
          Cisim
        </text>
        <text x={ix} y="198" textAnchor="middle">
          Sanal görüntü
        </text>
        <line
          x1="390"
          y1="220"
          x2="390"
          y2="390"
          className="physics012-mirror"
        />
        <line
          x1="220"
          y1="305"
          x2="420"
          y2="305"
          className="physics012-dimension"
        />
        <path
          data-incident-ray
          d={`M350 ${305 - dy}L390 305`}
          className="physics012-wave"
        />
        <path
          data-reflected-ray
          d={`M390 305L350 ${305 + dy}`}
          className="physics012-transmitted"
        />
        <path d={`M390 305L430 ${305 - dy}`} className="physics012-virtual" />
      </svg>
      <div className="physics012-result" data-model-result>
        <strong>
          Cisim-aynaya: {fmt(m.distance)} cm · Görüntü-aynaya:{" "}
          {fmt(m.imageDistance)} cm
        </strong>
        <p>
          Cisim-görüntü aralığı {fmt(m.separation)} cm. Yer koordinatları: cisim
          −{distance} cm; ayna {mirror} cm; görüntü {fmt(m.imageX)} cm.
          xg=2xm−xc.
        </p>
        <p>
          Gelme {incidence}°; yansıma {m.reflection}°. Kesik görüntü ve kesik
          ışın uzantısı gerçek ışığın ayna arkasına gittiği anlamına gelmez. İki
          diyagram ayrı geometrileri gösterir; küçük ışın diyagramının açısı
          üstteki cismin konumundan türetilmez.
        </p>
      </div>
      <Comparison
        uid={uid}
        question="Cisim-görüntü uzaklığı, cismin aynaya dik uzaklığının kaç katı?"
        choices={["İki katı", "Aynı", "Yarısı"]}
        expected="İki katı"
        values={saved}
        onChange={set}
      >
        <p>
          Görüntü ve cisim ayna düzleminin karşı taraflarında eş d uzaklıktadır;
          aralık 2d’dir. Aynanın hareketi sırasında da son konumlar aynı
          simetriyi sağlar.
        </p>
      </Comparison>
    </Frame>
  );
}
export default function Forge012PhysicsLab({ id }: { id: string }) {
  return id === "su-dalgalari" ? (
    <Water />
  ) : id === "ses-deprem-dalgalari" ? (
    <Sound />
  ) : id === "isik-bilgisi" ? (
    <Light />
  ) : id === "golge-yari-golge" ? (
    <Shadow />
  ) : (
    <Mirror />
  );
}
