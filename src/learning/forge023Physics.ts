import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";
import type { QuestionGuidance } from "../domain/questionHelpModel";

const inRange = (x: number, lo: number, hi: number) =>
  Number.isFinite(x) && x >= lo && x <= hi;
const C023 = 299792458;
const H023 = 6.62607015e-34;
const E023 = 1.602176634e-19;
const HC023 = ((H023 * C023) / E023) * 1e9;
const normZero = (x: number) => (Object.is(x, -0) ? 0 : x);
function trig023(degrees: number) {
  const x = degrees % 360;
  if (x % 90 === 0)
    return { sin: [0, 1, 0, -1][x / 90], cos: [1, 0, -1, 0][x / 90] };
  return {
    sin: Math.sin((x * Math.PI) / 180),
    cos: Math.cos((x * Math.PI) / 180),
  };
}
/** Scalar coherent far field. lambda0 is vacuum nm; aperture is d or a in mm. y is signed screen mm, upper slit positive. */
export function optics023(
  mode: "double" | "single",
  lambda0: number,
  refractiveIndex: number,
  distance: number,
  aperture: number,
  delayNm: number,
  probeMm: number,
) {
  if (
    !["double", "single"].includes(mode) ||
    !inRange(lambda0, 200, 1000) ||
    !inRange(refractiveIndex, 1, 3) ||
    !inRange(distance, 0.1, 10) ||
    !inRange(aperture, 0.01, 5) ||
    !inRange(delayNm, 0, 2000) ||
    !inRange(probeMm, -100, 100) ||
    (mode === "single" && delayNm !== 0)
  )
    throw new RangeError("OPTICS023_SCOPE");
  const lambdaMediumNm = lambda0 / refractiveIndex;
  const spacingMm = (lambdaMediumNm * 1e-3 * distance) / aperture;
  const centerMm = mode === "double" ? (delayNm / lambda0) * spacingMm : 0;
  const at = (yMm: number) => {
    const turns = yMm / spacingMm - (mode === "double" ? delayNm / lambda0 : 0);
    let intensity: number;
    if (mode === "double") {
      const f = turns - Math.floor(turns);
      intensity = f === 0 ? 1 : f === 0.5 ? 0 : Math.cos(Math.PI * f) ** 2;
    } else {
      const z = Math.PI * turns;
      const amplitude =
        turns === 0 ? 1 : Number.isInteger(turns) ? 0 : Math.sin(z) / z;
      intensity = amplitude * amplitude;
    }
    return { yMm, intensity };
  };
  return {
    mode,
    lambda0,
    refractiveIndex,
    distance,
    aperture,
    delayNm,
    probeMm,
    lambdaMediumNm,
    spacingMm,
    centerMm,
    centralWidthMm: mode === "single" ? 2 * spacingMm : spacingMm,
    firstDarkMm: mode === "single" ? spacingMm : spacingMm / 2,
    probe: at(probeMm),
    profile: Array.from({ length: 1201 }, (_, i) => at((i - 600) / 40)),
  };
}
/** One dimensional sound in a still medium. Both velocities are signed +x; receiver stays on the right and waves travel +x. */
export function soundDoppler023(
  sourceFrequency: number,
  soundSpeed: number,
  sourceVelocity: number,
  receiverVelocity: number,
) {
  if (
    !inRange(sourceFrequency, 20, 2000) ||
    !inRange(soundSpeed, 100, 1600) ||
    !Number.isFinite(sourceVelocity) ||
    !Number.isFinite(receiverVelocity) ||
    !inRange(sourceVelocity / soundSpeed, -0.8, 0.8) ||
    !inRange(receiverVelocity / soundSpeed, -0.8, 0.8)
  )
    throw new RangeError("SOUND_DOPPLER023_SCOPE");
  const forwardWavelength = (soundSpeed - sourceVelocity) / sourceFrequency;
  const backwardWavelength = (soundSpeed + sourceVelocity) / sourceFrequency;
  const receivedFrequency =
    (sourceFrequency * (soundSpeed - receiverVelocity)) /
    (soundSpeed - sourceVelocity);
  const mach = sourceVelocity / soundSpeed;
  const fronts = Array.from({ length: 7 }, (_, cycle) => ({
    emittedCycle: cycle,
    centerX: mach * cycle,
    radius: 7 - cycle,
  }));
  return {
    sourceFrequency,
    soundSpeed,
    sourceVelocity,
    receiverVelocity,
    forwardWavelength,
    backwardWavelength,
    receivedFrequency,
    relativeCrestSpeed: soundSpeed - receiverVelocity,
    sourcePosition: mach * 7,
    receiverPosition: 12 + (receiverVelocity / soundSpeed) * 7,
    fronts,
  };
}
/** Pure radial special relativistic Doppler in vacuum. beta>0 means receding; not cosmological/gravitational redshift. */
export function lightDoppler023(emittedWavelengthNm: number, beta: number) {
  if (!inRange(emittedWavelengthNm, 200, 1500) || !inRange(beta, -0.95, 0.95))
    throw new RangeError("LIGHT_DOPPLER023_SCOPE");
  const wavelengthRatio = Math.sqrt(1 + beta) / Math.sqrt(1 - beta);
  const observedWavelengthNm = emittedWavelengthNm * wavelengthRatio;
  return {
    emittedWavelengthNm,
    beta,
    wavelengthRatio,
    observedWavelengthNm,
    frequencyRatio: 1 / wavelengthRatio,
    observedFrequency: C023 / (observedWavelengthNm * 1e-9),
    vacuumSpeed: C023,
    shift: beta > 0 ? "red" : beta < 0 ? "blue" : "none",
  };
}
/** Vacuum plane wave with matched phases. E and B are shown at one chosen event; propagation is ±x. */
export function electromagnetic023(
  wavelengthNm: number,
  electricAmplitude: number,
  phaseDegrees: number,
  polarizationDegrees: number,
  direction: 1 | -1,
) {
  if (
    !inRange(wavelengthNm, 0.001, 1e10) ||
    !inRange(electricAmplitude, 0.01, 10000) ||
    !inRange(phaseDegrees, 0, 360) ||
    !inRange(polarizationDegrees, 0, 360) ||
    ![1, -1].includes(direction)
  )
    throw new RangeError("EM023_SCOPE");
  const phase = trig023(phaseDegrees),
    polarization = trig023(polarizationDegrees);
  const electric = electricAmplitude * phase.cos;
  const magneticAmplitude = electricAmplitude / C023,
    magnetic = magneticAmplitude * phase.cos;
  const electricVector = {
    x: 0,
    y: normZero(electric * polarization.cos),
    z: normZero(electric * polarization.sin),
  };
  const magneticVector = {
    x: 0,
    y: normZero(-direction * magnetic * polarization.sin),
    z: normZero(direction * magnetic * polarization.cos),
  };
  const frequency = C023 / (wavelengthNm * 1e-9),
    photonEnergyJ = H023 * frequency;
  return {
    wavelengthNm,
    electricAmplitude,
    magneticAmplitude,
    phaseDegrees,
    polarizationDegrees,
    direction,
    frequency,
    photonEnergyJ,
    photonEnergyEV: photonEnergyJ / E023,
    electricVector,
    magneticVector,
    normalizedElectric: phase.cos,
    normalizedMagnetic: direction * phase.cos,
    normalizedEnergyFlowX: direction * phase.cos ** 2,
    vacuumSpeed: C023,
  };
}
/** Bohr approximation: one electron, infinite nuclear mass, 13.6 eV and a0=.0529nm. No claim of modern orbital trajectories. */
export function bohr023(atomicNumber: number, level: number) {
  if (
    !Number.isInteger(atomicNumber) ||
    !inRange(atomicNumber, 1, 3) ||
    !Number.isInteger(level) ||
    !inRange(level, 1, 8)
  )
    throw new RangeError("BOHR023_SCOPE");
  const energyEV = -13.6 * (atomicNumber / level) ** 2;
  return {
    atomicNumber,
    level,
    energyEV,
    kineticEV: -energyEV,
    potentialEV: 2 * energyEV,
    radiusNm: (0.0529 * level ** 2) / atomicNumber,
    angularMomentumHbar: level,
    ionizationEV: -energyEV,
  };
}
export function atomTransition023(
  atomicNumber: number,
  initial: number,
  final: number,
) {
  const first = bohr023(atomicNumber, initial),
    last = bohr023(atomicNumber, final);
  const differenceEV = last.energyEV - first.energyEV;
  const photonEnergyEV = Math.abs(differenceEV);
  return {
    first,
    last,
    differenceEV,
    photonEnergyEV,
    wavelengthNm: photonEnergyEV === 0 ? null : HC023 / photonEnergyEV,
    kind:
      final === initial ? "none" : final > initial ? "absorption" : "emission",
    possibleLinesThroughLevel: (initial * (initial - 1)) / 2,
    maximumCascadePhotons: initial - 1,
  };
}
/** Ideal ground/bound-state target; channels are energetically possible, not guaranteed collision probabilities. */
export function excitation023(
  atomicNumber: number,
  initial: number,
  particle: "photon" | "electron",
  incidentEV: number,
) {
  const start = bohr023(atomicNumber, initial);
  if (
    !["photon", "electron"].includes(particle) ||
    !inRange(incidentEV, 0, 600)
  )
    throw new RangeError("EXCITATION023_SCOPE");
  const allowed = Array.from(
    { length: 8 - initial },
    (_, i) => initial + 1 + i,
  ).map((n) => ({
    n,
    gapEV:
      (13.6 * atomicNumber ** 2 * (n ** 2 - initial ** 2)) /
      (initial ** 2 * n ** 2),
  }));
  const matches = (a: number, b: number) =>
    Math.abs(a - b) <=
    8 * Number.EPSILON * Math.max(1, Math.abs(a), Math.abs(b));
  const ionizationPossible = incidentEV >= start.ionizationEV;
  const channels = allowed
    .filter((x) =>
      particle === "photon"
        ? matches(incidentEV, x.gapEV)
        : incidentEV >= x.gapEV,
    )
    .map((x) => ({
      ...x,
      remainingEV: particle === "photon" ? 0 : incidentEV - x.gapEV,
    }));
  return {
    atomicNumber,
    initial,
    particle,
    incidentEV,
    ionizationPossible,
    ionizationThresholdEV: start.ionizationEV,
    ionizationExcessEV: ionizationPossible
      ? incidentEV - start.ionizationEV
      : null,
    channels,
    maximumModelLevel: 8,
    noListedBoundExcitation: channels.length === 0,
  };
}

type Card023 = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  guidance: QuestionGuidance;
};
type Pack023 = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: LessonGuide["sections"];
  examples: LessonGuide["examples"];
  recall: LessonGuide["recall"];
  source: string;
  items: Card023[];
};

const packs023: Pack023[] = [
  {
    id: "isik-teorileri",
    topic: "detail-393",
    title: "Işık teorileri: kanıttan girişim ve kırınıma",
    minutes: 85,
    objectives: [
      "Işık modellerini deneysel kanıtla karşılaştır",
      "Çift ve tek yarık desenini değişkenlerden kur",
      "Optik yol, faz, saçak yeri ve parlaklığı ayır",
    ],
    sections: [
      {
        title: "Bir olguyu açıklamak için model kur",
        paragraphs: [
          "Bir el fenerinin ışığı doğrusal bir yolda ilerliyor gibi görünür; iki dar yarıktan geçen lazer ise perdede çok sayıda açık ve koyu bölge oluşturabilir. Işığı hangi ölçekte ve hangi deneyde incelediğini söylemeden tek bir çizimle bütün davranışı açıklayamazsın.",
          "Model, gözlemle sınanan bir açıklamadır. Doğrusal ışınlar görüntü ve gölge hesabında işe yarar; girişim için dalga genliği ve fazı, tekil enerji alışverişinde ise foton kavramı gerekir. Bir modelin sınırı, gözlenen olguyu yok saymayı haklı çıkarmaz.",
        ],
      },
      {
        title: "Newton ve Huygens’in farklı başlangıçları",
        paragraphs: [
          "Newton’un tanecik yaklaşımı ışığın doğrusal ilerlemesi ve yansımasına bir açıklama arar. Huygens yaklaşımında dalga cephesinin her noktası sonraki dalga cephesinin kurulmasına katkı veren ikincil dalga kaynağı gibi ele alınır.",
          "Bu tarihsel görüşleri bugünkü fotonla özdeşleştirme. Modern foton, küçük klasik bilye değildir. Huygens ilkesi de ışığın mutlaka maddesel bir ortam içinde ilerlemesini gerektirmez; ışığın boşlukta yayılması elektromanyetik kuramla açıklanır.",
        ],
      },
      {
        title: "Deney ile açıklamayı eşleştir",
        paragraphs: [
          "Yansıma ve kırılma, yalnız başına dalga ile tanecik açıklaması arasında kesin seçim yaptırmaz. Girişim, kırınım ve kutuplanma dalga betimini öne çıkarır; fotoelektrik ve Compton deneyleri enerji ile momentumun foton üzerinden aktarılmasını gerektirir.",
          "Dalga ve foton anlatımları birbirini silen iki slogan değildir. Deneyin hazırlığı, hangi niceliği ölçtüğün ve ölçüm sonuçları birlikte değerlendirilir. Işık sayacı tek tek olaylar kaydederken, çok sayıda olayın dağılımında girişim deseni görülebilir.",
        ],
      },
      {
        title: "Maxwell, Hertz ve kuantum köprüsü",
        paragraphs: [
          "Maxwell elektrik ve manyetik alanların birlikte yayılan dalga çözümlerini ortaya koydu. Hertz’in deneyleri radyo dalgalarının üretilip alınabileceğini ve dalga özellikleri gösterdiğini destekledi; görünür ışık aynı elektromanyetik ailenin bir bölümüdür.",
          "Planck’ın enerji kuantumu ve Einstein’ın foton yaklaşımı, her foton için E=hf bağıntısına bağlanır. Frekans artınca tek foton enerjisi artar. Aynı frekansta daha parlak ışık, tek fotonun enerjisini büyütmek yerine daha çok enerji akışı sağlayabilir.",
        ],
      },
      {
        title: "Fazı iki titreşimin zaman düzeni olarak gör",
        paragraphs: [
          "Aynı frekansta iki dalganın tepe ve çukurlarının aynı anlarda oluşması eş fazlı olma durumudur. Bir noktada tepe tepeyle buluşursa genlikler toplanır; tepe eş büyüklükte çukurla buluşursa seçili noktadaki toplam genlik sıfır olabilir.",
          "Kararlı bir girişim deseni için bağıl fazın zaman içinde belirli kalması gerekir; buna uyumluluk denir. İki bağımsız ampulün dalgaları da üst üste gelir fakat hızla değişen bağıl faz, gözle izlenen sabit açık-koyu saçakları genellikle ortadan kaldırır.",
        ],
      },
      {
        title: "Young düzeneğini adım adım kur",
        paragraphs: [
          "Tek renkli bir kaynak iki dar yarığı birlikte aydınlatır; yarıklar aynı kaynağın dalgasından beslenir. Yarıklardan perdeye ulaşan ışık, farklı yollar katettiği için perde noktasına bağlı bir faz farkıyla birleşir. Dar yarıkların kendisi de kırınım sağlar.",
          "İdeal başlangıçta yarıklar eş fazlı, eş şiddetli ve perdeye göre simetriktir. Orta dikme üzerindeki iki yol eşit olduğundan merkezde aydınlık vardır. Eşitlik bozulduğunda merkezin aydınlık olması otomatik bir kural olarak kullanılamaz.",
        ],
      },
      {
        title: "Yol farkından aydınlık ve karanlığa",
        paragraphs: [
          "İçindeki dalga boyu λ olan tekdüze bir ortamda eş fazlı iki kaynaktan gelen yolların farkı mλ ise yapıcı girişim oluşur. Burada m sıfır veya tam sayıdır; ilk merkez dışı aydınlıkta yol farkının büyüklüğü bir dalga boyudur.",
          "Yol farkı λ/2, 3λ/2, 5λ/2 gibi tek yarım katlara eşitse ideal eş genlikli iki dalga birbirini söndürür. Karanlık için faz koşuluna ek olarak genliklerin de eşit olması gerekir; eşit olmayan genliklerde tam sıfır yerine minimum ışık şiddeti kalır.",
        ],
      },
      {
        title: "Saçak aralığını geometriyle üret",
        paragraphs: [
          "Yarıklara göre perde çok uzakta ve bakılan açı küçükken yol farkı yaklaşık d·y/L olur. d yarıklar arası uzaklık, L perde uzaklığı, y ise merkezden perde üzerindeki işaretli konumdur. Ardışık aydınlıklar arasında bu yol farkı bir λ değişir.",
          "Böylece Δy=λL/d bulunur. λ ortam içindeki dalga boyuysa tekrar kırılma indisine bölünmez. Boşluk dalga boyu λ₀ veriliyorsa λ=λ₀/n olduğundan Δy=λ₀L/(nd) yazılır; aynı değişken için n’yi iki kez kullanmak gerçek bir hesap hatasıdır.",
        ],
      },
      {
        title: "Birimleri aynı uzunluk düzenine taşı",
        paragraphs: [
          "Bir nanometre 10⁻⁹ metre, bir milimetre 10⁻³ metredir. Örneğin λ₀=600 nm, L=2 m ve d=0,30 mm için havada Δy=4 mm bulunur. Formüle önce her uzunluğu metre olarak koymak, sonucu yorumlamayı kolaylaştırır.",
          "Oran hesabında ise aynı tür iki d değerinin ikisi de milimetre olabilir; birimleri sadeleşir. Sayıyı hızlı bulmak kadar fiziksel kontrol de önemlidir: L artarken desen açılmalı, d artarken sıklaşmalı, dalga boyu artarken aralık büyümelidir.",
        ],
      },
      {
        title: "Saçak sırası ile aralık sayısını ayır",
        paragraphs: [
          "Merkezî aydınlığın iki yanındaki m’inci aydınlık, merkezden m·Δy uzaklıktadır. İlk karanlık Δy/2, ikinci karanlık 3Δy/2 uzaklıktadır. Sağ ve sol, aynı sıranın iki ayrı konumudur; uzaklık ile işaretli koordinat aynı şey değildir.",
          "Üç ardışık aydınlığın merkezleri arasındaki toplam uzaklık iki aralıktır. Merkezin iki yanındaki ikinci aydınlıklar arasında dört aralık bulunur. Önce küçük bir konum çizelgesi yazmak, yalnız isim sayarak yapılan bir eksik veya fazla aralık hatasını önler.",
        ],
      },
      {
        title: "Renk ve ortam değişince hangi nicelik korunur",
        paragraphs: [
          "Aynı düzende daha uzun dalga boylu kırmızı ışık, daha kısa dalga boylu mora göre daha geniş saçak aralığı verir. Sabit bir kaynaktan gelen ışık başka saydam ortama geçtiğinde frekans aynı kalır; hızı ve ortam içindeki dalga boyu değişir.",
          "Ortamın n değeri artınca v=c/n ve λ=λ₀/n küçülür; aynı d ve L için saçak aralığı daralır. Frekans değişmediği için tek fotonun hf enerjisi de ortam sınırında sırf hız azaldı diye küçülmüş sayılmaz; soğurma ayrı bir etkileşimdir.",
        ],
      },
      {
        title: "Parlaklık, aralık ve enerji hesabı",
        paragraphs: [
          "Aynı frekanslı kaynağın ışık akısını artırmak ideal düzende aydınlık saçakları daha parlak yapar; tek başına saçak aralığını veya yerlerini değiştirmez. Tam karanlıkta enerji yok olmuş değildir; dağılımın başka bölgelerinde daha fazla enerji taşınır.",
          "Genlik ile ışık şiddeti aynı nicelik değildir; aynı ortamda şiddet genliğin karesiyle ilişkilidir. Her iki yarığın genliği iki katına çıkarsa aydınlık maksimumdaki şiddet dört kat olur. Bu sonuç, foton enerjisinin dört katına çıktığı anlamına gelmez.",
        ],
      },
      {
        title: "Optik yol ve saydam levha",
        paragraphs: [
          "Işığın bir bölgedeki faz gecikmesi yalnız geometrik uzunluğa değil kırılma indisine de bağlıdır; bu nedenle optik yol n·ℓ ile ifade edilir. Hava yerine n indise sahip t kalınlıklı levhadan geçen demetin ek optik yolu yaklaşık (n−1)t olur.",
          "Üst yarığın önüne levha konursa o yoldaki demet gecikir. Merkez aydınlığı yeniden kurmak için üst geometrik yol daha kısa olmalıdır; desen levhanın bulunduğu yarık tarafına kayar. İki yarığı eşit geciktirmek ise bağıl fazı ve ideal desen yerini değiştirmez.",
        ],
      },
      {
        title: "Kaynak ve düzenek hareketlerini karşılaştır",
        paragraphs: [
          "Kaynak simetri ekseninde yarıklara yaklaştırılırken iki yarık eşit koşulda besleniyorsa bağıl faz değişmez; saçak aralığını λ, L ve d belirlemeyi sürdürür. Kaynak yarık düzlemine paralel kaydırılırsa geliş yolları farklılaşır ve desenin merkezi kayabilir.",
          "Yarık düzlemini veya perdeyi döndürmek, geometriyi değiştiren ayrı bir müdahaledir. Küçük açı ve belirtilen geometri verilmeden yalnız 'döndü' sözüyle her nokta için aynı aralık veya aynı merkez sonucu kurulamaz; sorudaki şekil ve yönler önce tanımlanmalıdır.",
        ],
      },
      {
        title: "Tek yarıkta tek bir kaynak neden desen oluşturur",
        paragraphs: [
          "Tek yarığın farklı noktalarından çıkan dalga katkıları birbirleriyle girişim yapar. Perde merkezinde katkılar aynı faza yakın birleşir; merkezden uzaklaşınca yarığın bir bölümünün katkısı başka bölümünü kısmen veya tamamen dengeleyebilir.",
          "Kırınım için mutlaka iki ayrı yarık gerekmez. Yarık daraldıkça yayılma daha belirgin olur. Işığın dalga boyu küçük olduğundan günlük geniş kapılarda keskin gölge yaklaşımı işe yararken, ince yarıklarda açık-koyu yapı görünür hâle gelir.",
        ],
      },
      {
        title: "Tek yarığın minimumlarını çift yarıktan ayır",
        paragraphs: [
          "Uzak alan ve küçük açı yaklaşımında ilk karanlıklar y=±λL/a konumundadır; a tek yarık genişliğidir. Merkez aydınlığı bu iki ilk karanlık arasında uzandığından genişliği 2λL/a olur. a’yı çift yarığın d ayrımıyla karıştırma.",
          "Diğer karanlıklar a·sinθ=mλ koşulundan gelir. Yan aydınlık tepe yerleri tam yarım kat bağıntısıyla bulunmaz; basit ders çizimindeki eşit aralık gösterimi, tam şiddet eğrisinin bütün ayrıntısı değildir. Etkileşimde gerçek sinc² zarfı kullanılır.",
        ],
      },
      {
        title: "Tek yarıkta değişkenleri tek tek değiştir",
        paragraphs: [
          "Aynı λ ve L için yarık genişliği iki katına çıkarsa merkez aydınlığın genişliği yarıya iner. Aynı yarıkta L veya λ iki katına çıkarsa genişlik iki katına çıkar. Bütün ortam n ile değiştirilirse λ₀/n kullanılır ve genişlik n ile ters orantılı olur.",
          "Yarığın bir kısmını opak maddeyle kapatmak kalan açıklığı daraltır ve geometrik merkezini değiştirebilir. Saydam bir parçanın oluşturduğu faz profili ise açıklık kapatmakla aynı değildir; her kısmi levhada desenin yalnızca bütünüyle ötelenmesi garanti edilmez.",
        ],
      },
      {
        title: "Günlük renklenmeleri dalga kanıtına bağla",
        paragraphs: [
          "Sabun zarı ve su üzerindeki ince yağ tabakasında farklı yüzeylerden dönen ışıklar farklı optik yollarla birleşir. Dalga boyuna, kalınlığa ve bakış açısına bağlı girişim, bazı renkleri güçlendirip bazılarını zayıflatır; yeni renkli madde üretilmesi gerekmez.",
          "CD üzerindeki sık izler, birden çok yoldan gelen ışığın farklı açılarda girişimi için düzenli bir yapı sağlar. Newton halkaları da ince hava tabakasındaki optik yol farkıyla ilişkilidir. Burada desenin adını ezberlemekten önce iki katkının nereden geldiğini göstermek daha açıklayıcıdır.",
        ],
      },
      {
        title: "Etkileşimli perdeyi bir kontrollü deney gibi kullan",
        paragraphs: [
          "Önce çift yarığı seç; bir parametre değişirken diğerlerini sabit tut ve seçili noktanın bağıl şiddetini tahmin et. Sonra tek yarığa geçerek aynı sayısal açıklığın merkez genişliğini karşılaştır. Grafik yatay ekseni perde konumunu, düşey ekseni normalize ışık şiddetini gösterir.",
          "Çift yarık modeli ideal eş genlikli noktasal yarıkları, tek yarık modeli düzgün aydınlatılmış skaler açıklığı kullanır. Sonlu yarık genişliğinin çift yarık zarfı bu basit çift modelde yoktur. Varsayımları okumak, çizgiyi gerçek bir laboratuvarın tüm ayrıntısı sanmayı önler.",
        ],
      },
    ],
    examples: [
      {
        title: "Saçak aralığını birimleriyle bul",
        prompt:
          "Havada λ=600 nm, L=2 m, d=0,30 mm. Küçük açı modelinde aralığı bul.",
        strategy: "Dalga boyu ve yarık ayrımını metreye dönüştür.",
        steps: [
          {
            label: "Koşulu kur",
            explanation:
              "λ=6·10⁻⁷m ve d=3·10⁻⁴m. Aynı ortam olduğu için başka n katsayısı eklenmez.",
          },
          {
            label: "İşlemi yap",
            explanation: "Δy=λL/d=(6·10⁻⁷·2)/(3·10⁻⁴)=4·10⁻³m.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Sonuç 4 mm olur; bu merkezden ilk aydınlığa veya ardışık aydınlıklar arasına ait aralıktır.",
          },
        ],
        answer: "4 mm",
        check: "L=1 m olsaydı sonuç 2 mm olurdu; L oranı korunur.",
        pitfall:
          "Nanometreyle milimetreyi doğrudan bölüp birim katsayısını atlama.",
      },
      {
        title: "İki farklı konum arasında kaç aralık var?",
        prompt:
          "Çift yarıkta Δy=1,2 mm. Soldaki üçüncü karanlıkla sağdaki ikinci aydınlık arasını bul.",
        strategy: "İşaretli koordinatları yaz.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "Sol üçüncü karanlık y=−(3−1/2)·1,2=−3 mm.",
          },
          {
            label: "İşlemi yap",
            explanation:
              "Sağ ikinci aydınlık y=2·1,2=+2,4 mm. Uzaklık 2,4−(−3) olarak bulunur.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Uzaklık 5,4 mm’dir; yalnız 3+2 tam sıra sayımı karanlık yarım adımını gizler.",
          },
        ],
        answer: "5,4 mm",
        check: "2,5+2=4,5 aralık ve 4,5·1,2=5,4.",
        pitfall:
          "Karanlık sırasını tam sayı aydınlık koordinatıyla karıştırma.",
      },
      {
        title: "Ortam indisini değiştirmek",
        prompt:
          "Havadaki aralığı 4,8 mm olan düzenek aynı geometriyle n=1,6 ortama dolduruluyor. Frekans sabit.",
        strategy: "Boşluk dalga boyu aynı; ortam dalga boyu n’ye bölünür.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "İlk aralıkλ₀L/d=4,8 mm olarak biliniyor.",
          },
          {
            label: "İşlemi yap",
            explanation: "Yeni aralıkλ₀L/(1,6 d)=4,8/1,6=3 mm olur.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Desen daha sıklaşır; frekanstaki değişim değil, ortam dalga boyundaki kısalma kullanıldı.",
          },
        ],
        answer: "3 mm",
        check: "3·1,6=4,8 mm geri çarpımı havadaki aralığı yeniden verir.",
        pitfall: "Hem frekansı hem dalga boyunu aynı n katsayısıyla azaltma.",
      },
      {
        title: "Genlik ile parlaklık",
        prompt:
          "İdeal eş yarıklı düzende iki yarıktaki alan genlikleri aynı oranla iki katına çıkıyor. Renk sabit. Maksimum şiddet ve aralık değişimini açıkla.",
        strategy: "Şiddetin alan genliğinin karesiyle ilişkisini kullan.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "İlk maksimumda iki eş alan A+A=2 A olarak toplanır.",
          },
          {
            label: "İşlemi yap",
            explanation:
              "Yeni toplam 2 A+2 A=4 A; alan oranı 2, şiddet oranı 4 olur.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "λ, L, d sabit olduğundan aralık aynı kalır. Foton başına enerji hf de aynı frekansta değişmez.",
          },
        ],
        answer: "Maksimum şiddet 4 kat; aralık ve tek foton enerjisi aynı.",
        check: "Şiddet oranı(4 A/2 A)²=4.",
        pitfall:
          "Şiddetin dört katını frekansın veya tek foton enerjisinin dört katı sayma.",
      },
      {
        title: "Tek yarığın iki ilk karanlığı",
        prompt:
          "Havada λ=500 nm, L=1,2 m, a=0,20 mm. İlk minimumları ve merkez tam genişliğini bul.",
        strategy: "Merkezden tek tarafa λL/a hesapla.",
        steps: [
          {
            label: "Koşulu kur",
            explanation:
              "İlk minimum uzaklığı(5·10⁻⁷·1,2)/(2·10⁻⁴)=3·10⁻³m=3 mm.",
          },
          {
            label: "İşlemi yap",
            explanation: "İki ilk karanlık y=−3 mm ve y=+3 mm konumlarındadır.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Tam merkez genişliği aralarındaki 6 mm’dir; diğer karanlıklar bu ideal modelde daha dışarıda bulunur.",
          },
        ],
        answer: "İlk minimumlar±3 mm; merkez 6 mm.",
        check:
          "Aynı açıklıklı çift yarığın aralığı 3 mm olur; tek merkez bunun iki katıdır.",
        pitfall:
          "Tek bir ilk karanlığa uzaklığı tam merkez genişliği diye yazma.",
      },
      {
        title: "Etiketli merkez çizgisinin kayması",
        prompt:
          "Üst kola ek optik yol 0,25λ₀ ekleniyor; çift yarığın aralığı 4 mm. Başlangıçtaki m=0 çizgisi hangi tarafa ne kadar kayar?",
        strategy:
          "Ek optik yol oranını aralıkla çarp; geometrik yolun nerede kısalacağını belirle.",
        steps: [
          {
            label: "Koşulu kur",
            explanation:
              "Üst yol 0,25 dalga kadar gecikir; merkez koşulu için üst geometrik yolun kısalması gerekir.",
          },
          {
            label: "İşlemi yap",
            explanation: "Kayma büyüklüğü 0,25·4=1 mm bulunur.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Üst yarığa yakın perde tarafında üst yol daha kısa olduğundan çizgi üst tarafa 1 mm kayar.",
          },
        ],
        answer: "Üst yarık yönüne 1 mm.",
        check: "Ek optik yol sıfıra dönünce izlenen çizgi eski yerine döner.",
        pitfall:
          "Kaymayı bütün saçakların aralığının dörtte bire inmesi sanma.",
      },
    ],
    recall: [
      {
        prompt: "Çift yarıkta ideal karanlık için iki ayrı koşul nedir?",
        answer:
          "Uygun yarım dalga bağıl faz koşulu ve eş genlik gerekir; eşit olmayan genlikler minimumda sıfır bırakmayabilir.",
      },
      {
        prompt: "λ₀ ileλ neden ayrı yazılır?",
        answer:
          "λ₀boşluk,λ=λ₀/n ortam dalga boyudur; indis aynı formülde ikinci kez bölünmez.",
      },
      {
        prompt: "Tek yarıkta merkez neden ikiλL/a genişliğindedir?",
        answer:
          "İlk karanlıklar−λL/a ile+λL/a arasındadır; iki taraflı uzaklık 2λL/a olur.",
      },
      {
        prompt: "Işık akısı artarken aralık neden sabit kalabilir?",
        answer:
          "Akı foton sayısını ve şiddeti etkiler; f,λ, L, d sabitse geometrik aralık değişmez.",
      },
      {
        prompt: "Bir kola saydam levha eklemek hangi büyüklüğü değiştirir?",
        answer:
          "Ek optik yol ve bağıl fazı; ideal çift yarıkta aralık değişmeden izlenen merkez çizgisi geciken kol yönüne kayar.",
      },
      {
        prompt: "Işığın dalga ve foton betimleri neye göre seçilir?",
        answer:
          "Ölçülen olguya göre:uzaysal girişim/kırınımda dalga, tekil enerji-momentum alışverişinde foton yaklaşımı gerekir.",
      },
    ],
    source:
      "MEBİ AYT Fizik fiziksel PDF 192–200 ve Dersler Cepte 12 Fizik 5. sayı PDF 13–16 karşılaştırılarak yazılmış özgün öğretim. Uzak alan, küçük açı, boşluk/ortam dalga boyu ve ideal eş genlik koşulları açıkça ayrılır. Sorular resmî kitapçık aktarımı değildir.",
    items: [
      {
        prompt:
          "Aynı lazer iki dar yarığı birlikte aydınlatıyor. Perdede çok sayıda sabit aydınlık ve karanlık saçak oluşuyor. Bu gözlem hangi açıklamayı doğrudan destekler?",
        options: [
          "Işığın yalnız düz giden klasik bilyelerden oluştuğunu",
          "Yarıklardan gelen dalga katkılarının faza bağlı birleştiğini",
          "Her fotonun yarıkta enerjisinin yarısını kaybettiğini",
          "Yarıkların yeni bir kimyasal element ürettiğini",
          "Işığın boşlukta hiç yayılamadığını",
        ],
        answer: 1,
        hint: "İki iz bekleyen klasik bilye resmi ile çok saçaklı deseni karşılaştır.",
        explanation:
          "İki yarık aynı kaynaktan beslendiği için bağıl faz düzenli tutulabilir. Perde üzerindeki yol farkı değişir; bazı noktalarda katkılar güçlenir, bazılarında söner. B seçeneği bu faza bağlı birleşmeyi açıklar; gözlem tek başına foton enerjisinin kaybını söylemez.",
        guidance: {
          knowledge: [
            "Kararlı girişim deseni, bağıl fazı belirli katkıların üst üste gelmesiyle kurulur.",
          ],
          strategy:
            "İki iz bekleyen klasik bilye resmi ile çok saçaklı deseni karşılaştır.",
          steps: [
            "İki yarık aynı kaynaktan beslendiği için bağıl faz düzenli tutulabilir.",
            "Perde üzerindeki yol farkı değişir; bazı noktalarda katkılar güçlenir, bazılarında söner.",
            "B seçeneği bu faza bağlı birleşmeyi açıklar; gözlem tek başına foton enerjisinin kaybını söylemez.",
          ],
          optionReasons: [
            "İki klasik bilye demeti, verilen çok saçaklı deseni tek başına açıklamaz.",
            "Doğru: yol farkına bağlı yapıcı ve yıkıcı girişimi ifade eder.",
            "Saçak oluşumu, her fotonda yarım enerji kaybı ölçümü değildir.",
            "Kimyasal element oluştuğunu gösteren veri yoktur.",
            "Boşlukta yayılmama sonucu, bu deneyden çıkmaz ve ışığın özelliğiyle çelişir.",
          ],
          commonError:
            "Karanlık bölgeyi foton enerjisinin her yarıkta yarıya inmesiyle açıklama.",
          check:
            "Bir aydınlık ile yanındaki karanlığı aynı dalga modelinde yol farkını değiştirerek açıklayabiliyor musun?",
        },
      },
      {
        prompt:
          "Havada, eş fazlı ideal çift yarık deneyinde λ=500 nm, L=1,5 m ve d=0,50 mm. Küçük açı yaklaşımında ardışık iki aydınlık arasındaki uzaklık kaç mm olur?",
        options: ["15", "3,0", "0,15", "0,75", "1,5"],
        answer: 4,
        hint: "Nanometre ve milimetreyi metreye çevir; en sonda mm yaz.",
        explanation:
          "λ=5·10⁻⁷ m ve d=5·10⁻⁴ m olarak alınır. Δy=(5·10⁻⁷·1,5)/(5·10⁻⁴)=1,5·10⁻³ m bulunur. 1,5·10⁻³ m=1,5 mm olduğundan E doğrudur.",
        guidance: {
          knowledge: ["Çift yarıkta ardışık aydınlık aralığı Δy=λL/d olur."],
          strategy: "Nanometre ve milimetreyi metreye çevir; en sonda mm yaz.",
          steps: [
            "λ=5·10⁻⁷ m ve d=5·10⁻⁴ m olarak alınır.",
            "Δy=(5·10⁻⁷·1,5)/(5·10⁻⁴)=1,5·10⁻³ m bulunur.",
            "1,5·10⁻³ m=1,5 mm olduğundan E doğrudur.",
          ],
          optionReasons: [
            "Metre-milimetre dönüşümünde on kat büyütülmüştür.",
            "İki aralık veya tek yarığın merkez genişliğiyle karıştırılmıştır.",
            "Birim dönüşümünde bir onluk basamak kaybı vardır.",
            "Verilen L ile doğru aralık yarıya indirilmiş olur.",
            "Doğru: hesap 1,5·10⁻³ metre verir.",
          ],
          commonError: "d=0,50 mm değerini 0,50 metre olarak formüle koyma.",
          check: "L iki katına çıksaydı sonucun 3 mm olacağını oranla doğrula.",
        },
      },
      {
        prompt:
          "Boşluk dalga boyu λ₀=600 nm olan ışık, kırılma indisi n=1,5 ile doldurulmuş çift yarık düzeneğinde kullanılıyor. L=1 m ve d=0,20 mm. Ardışık aydınlık aralığı kaç mm?",
        options: ["2", "3", "1", "4,5", "6"],
        answer: 0,
        hint: "Önce ortam içindeki dalga boyunu bul; indisi ikinci kez kullanma.",
        explanation:
          "λ=600/1,5=400 nm bulunur. Δy=(4·10⁻⁷ m·1 m)/(2·10⁻⁴ m)=2·10⁻³ m olur. Aralık 2 mm çıkar; λ₀ doğrudan kullanılıp n unutulursa 3 mm bulunur.",
        guidance: {
          knowledge: ["Ortam içi dalga boyu λ=λ₀/n; aralık λL/d olur."],
          strategy:
            "Önce ortam içindeki dalga boyunu bul; indisi ikinci kez kullanma.",
          steps: [
            "λ=600/1,5=400 nm bulunur.",
            "Δy=(4·10⁻⁷ m·1 m)/(2·10⁻⁴ m)=2·10⁻³ m olur.",
            "Aralık 2 mm çıkar; λ₀ doğrudan kullanılıp n unutulursa 3 mm bulunur.",
          ],
          optionReasons: [
            "Doğru: ortam dalga boyu 400 nm ile aralık 2 mm.",
            "Ortam etkisini atlayıp boşluk dalga boyuyla hesaplama sonucudur.",
            "Verilen indisin etkisi veya uzunluk dönüşümü gereğinden büyük alınmıştır.",
            "n ile bölmek yerine çarpmak bu yanlış sonucu verir.",
            "Hem d hem ortam düzenini yanlış kullanır.",
          ],
          commonError:
            "λ=λ₀/n yazdıktan sonra Δy formülünü yeniden n ile bölme.",
          check:
            "Havada aralık 3 mm olurdu; n=1,5 ile 3/1,5=2 mm kontrolünü yap.",
        },
      },
      {
        prompt:
          "Eş fazlı çift yarıkta renk ve ortam sabitken perde uzaklığı L iki katına, yarık ayrımı d de iki katına çıkarılıyor. Küçük açı yaklaşımında saçak aralığı nasıl değişir?",
        options: [
          "Değişmez",
          "Dört katına çıkar",
          "İki katına çıkar",
          "Sıfıra iner",
          "Yarıya iner",
        ],
        answer: 0,
        hint: "İki değişimin oran etkisini aynı çarpımda sadeleştir.",
        explanation:
          "Başlangıçta Δy=λL/d yazılır. Yeni aralık λ(2 L)/(2 d) olur; iki katsayı sadeleşir. Aralık ilk değere eşittir; desenin mutlaka yok olması gerekmez.",
        guidance: {
          knowledge: ["Saçak aralığı L ile doğru, d ile ters orantılıdır."],
          strategy: "İki değişimin oran etkisini aynı çarpımda sadeleştir.",
          steps: [
            "Başlangıçta Δy=λL/d yazılır.",
            "Yeni aralık λ(2 L)/(2 d) olur; iki katsayı sadeleşir.",
            "Aralık ilk değere eşittir; desenin mutlaka yok olması gerekmez.",
          ],
          optionReasons: [
            "Doğru: iki kat artışlar birbirini dengeler.",
            "Pay ve paydadaki iki katsayıyı ikisini de artırıcı sayar.",
            "d artışının ters etkisini atlar.",
            "Bu geometri değişikliği girişimi zorunlu olarak söndürmez.",
            "L artışını atlar.",
          ],
          commonError: "d arttığında da aralık büyür sanma; d paydadadır.",
          check:
            "λ=600 nm, L=1 m, d=0,3 mm örneğini iki durumda sayısal karşılaştır.",
        },
      },
      {
        prompt:
          "İdeal çift yarıkta saçak aralığı 2 mm. Merkezin sağındaki üçüncü aydınlık ile solundaki ikinci aydınlık arasındaki uzaklık kaç mm?",
        options: ["4", "2", "10", "6", "8"],
        answer: 2,
        hint: "İki noktanın işaretli koordinatını ayrı yaz, sonra farkın büyüklüğünü al.",
        explanation:
          "Sağ üçüncü aydınlık y=+3·2=+6 mm konumundadır. Sol ikinci aydınlık y=−2·2=−4 mm konumundadır. Uzaklık |6−(−4)|=10 mm olur; beş aralık vardır.",
        guidance: {
          knowledge: [
            "Aydınlık merkezleri y=mΔy konumundadır; sağ ve solun işaretleri zıttır.",
          ],
          strategy:
            "İki noktanın işaretli koordinatını ayrı yaz, sonra farkın büyüklüğünü al.",
          steps: [
            "Sağ üçüncü aydınlık y=+3·2=+6 mm konumundadır.",
            "Sol ikinci aydınlık y=−2·2=−4 mm konumundadır.",
            "Uzaklık |6−(−4)|=10 mm olur; beş aralık vardır.",
          ],
          optionReasons: [
            "Sadece sol noktayı merkeze göre ölçer.",
            "İki sıranın farkını alıp karşı tarafı göz ardı eder.",
            "Doğru: işaretli koordinatlar arası uzaklık 10 mm.",
            "Sadece sağ noktayı merkeze göre ölçer.",
            "Merkezler arasında bir aralığı eksik sayar.",
          ],
          commonError: "Karşı taraflardaki sıraları 3−2 biçiminde çıkarma.",
          check:
            "Merkezden +6’ya ve merkezden −4’e iki parçayı toplayınca da 10 mm bul.",
        },
      },
      {
        prompt:
          "Havada eş fazlı çift yarıkta ardışık aydınlık aralığı 2 mm. Merkezin sağındaki üçüncü karanlık, merkezden kaç mm uzaktadır?",
        options: ["4", "3", "1", "5", "6"],
        answer: 3,
        hint: "İlk karanlığı yarım aralıkla başlat ve üçüncüye kadar ilerle.",
        explanation:
          "İlk karanlık merkezden 1 mm uzaktadır. Ardışık karanlıklar da 2 mm ayrıdır; ikinci 3 mm olur. Üçüncü karanlık 5 mm’dedir; 3Δy hesabı aydınlık için olurdu.",
        guidance: {
          knowledge: ["Karanlıklar Δy/2,3Δy/2,5Δy/2 biçiminde sıralanır."],
          strategy:
            "İlk karanlığı yarım aralıkla başlat ve üçüncüye kadar ilerle.",
          steps: [
            "İlk karanlık merkezden 1 mm uzaktadır.",
            "Ardışık karanlıklar da 2 mm ayrıdır; ikinci 3 mm olur.",
            "Üçüncü karanlık 5 mm’dedir; 3Δy hesabı aydınlık için olurdu.",
          ],
          optionReasons: [
            "İkinci aydınlığın konumudur.",
            "İkinci karanlığın konumudur.",
            "Birinci karanlığın konumudur.",
            "Doğru: (3−1/2)·2=5 mm.",
            "Üçüncü aydınlığı karanlıkla karıştırır.",
          ],
          commonError:
            "Karanlık sırasını mΔy diye başlatma; yarım aralık kayması vardır.",
          check: "Karanlık konum listesini 1,3,5 mm olarak kontrol et.",
        },
      },
      {
        prompt:
          "Aynı lazerin frekansı ve çift yarık geometrisi sabitken saniyede gönderilen foton sayısı artırılıyor. İdeal düzenek için hangi sonuç doğrudur?",
        options: [
          "Tek foton enerjisi ve aralık birlikte artar",
          "Aralık küçülür; frekans aynı kalamaz",
          "Aydınlıklar daha parlak olur; tek foton enerjisi ve aralık aynı kalır",
          "Karanlıklar zorunlu olarak aydınlığa dönüşür",
          "Tek foton enerjisi azalır ve bütün saçaklar kayar",
        ],
        answer: 2,
        hint: "Toplam foton akışını tek fotonun enerjisi ve desen geometrisinden ayır.",
        explanation:
          "f sabit olduğundan her fotonun hf enerjisi aynı kalır. Aynı ortamda λ ve aynı L, d nedeniyle aralık değişmez. Daha çok foton, ideal aydınlık bölgelerde daha büyük enerji akışı sağlar; C doğrudur.",
        guidance: {
          knowledge: [
            "E=hf tek foton enerjisidir; saçak aralığı λL/d ile belirlenir.",
          ],
          strategy:
            "Toplam foton akışını tek fotonun enerjisi ve desen geometrisinden ayır.",
          steps: [
            "f sabit olduğundan her fotonun hf enerjisi aynı kalır.",
            "Aynı ortamda λ ve aynı L, d nedeniyle aralık değişmez.",
            "Daha çok foton, ideal aydınlık bölgelerde daha büyük enerji akışı sağlar; C doğrudur.",
          ],
          optionReasons: [
            "Foton sayısının artışı frekansı ve geometriyi artırmaz.",
            "Sabit frekanslı bir kaynakta foton akısı değişebilir.",
            "Doğru: akış artar, f ve geometri korunur.",
            "Eş faz ve eş genlik koşulları korunuyorsa ideal karanlık yerleri kalır.",
            "Daha çok foton tek başına enerji azalması veya faz kayması değildir.",
          ],
          commonError: "Parlaklık ile hf enerjisini aynı büyüklük sanma.",
          check:
            "Aynı renkli iki lazerin güçleri farklı olabilir; foton enerjileri yine aynı olabilir.",
        },
      },
      {
        prompt:
          "Eşit genlikli, aynı frekanslı iki yarığın perde merkezine geometrik yolları eşit. Bir yarıktaki ek optik yol λ₀/2 kadar artırılıyor. Diğer koşullar sabitken eski merkezde ne görülür?",
        options: [
          "Işığın ses dalgasına dönüşmesi",
          "İdeal karanlık",
          "Dalga boyunun sıfır olması",
          "Kesinlikle aynı aydınlık maksimum",
          "Öncekinden iki kat frekans",
        ],
        answer: 1,
        hint: "Eski merkezde geometrik fark sıfırken ek optik yolu faz farkına çevir.",
        explanation:
          "Başlangıçta yollar eşit olduğu için merkeze aynı fazda ulaşılır. Bir kola λ₀/2 optik yol eklenmesi bu noktada tepeyi çukurla buluşturur. Genlikler eşit olduğundan toplam genlik sıfırdır; eski merkez ideal karanlıktır.",
        guidance: {
          knowledge: [
            "Yarım boşluk dalga boyu kadar ek optik yol, π bağıl faz farkı oluşturur.",
          ],
          strategy:
            "Eski merkezde geometrik fark sıfırken ek optik yolu faz farkına çevir.",
          steps: [
            "Başlangıçta yollar eşit olduğu için merkeze aynı fazda ulaşılır.",
            "Bir kola λ₀/2 optik yol eklenmesi bu noktada tepeyi çukurla buluşturur.",
            "Genlikler eşit olduğundan toplam genlik sıfırdır; eski merkez ideal karanlıktır.",
          ],
          optionReasons: [
            "Optik yol eklemek elektromanyetik dalgayı mekanik sese çevirmez.",
            "Doğru: π faz farkı eşit genlikleri söndürür.",
            "Sonlu dalga boyu sıfır hâline gelmez.",
            "Yarım dalga gecikmesi eski yapıcı koşulu korumaz.",
            "Faz gecikmesi kaynağın frekansını iki katına çıkarmaz.",
          ],
          commonError:
            "Eski geometrik merkezin her koşulda aydınlık olduğunu varsayma.",
          check:
            "Ek yol λ₀ olsaydı aynı noktada yeniden aydınlık maksimum bekle.",
        },
      },
      {
        prompt:
          "Havada eş fazlı çift yarıkta λ₀=600 nm. Üst yarığın önüne n=1,5 indisi ve t=1,2 μm kalınlığı olan levha konuyor. Ek optik yol sıfırdan artırılırken izlenen m=0 aydınlık çizgisi, küçük açı modelinde başlangıç konumuna göre nasıl kayar?",
        options: [
          "Üst yarığa doğru yarım saçak aralığı",
          "Alt yarığa doğru yarım saçak aralığı",
          "Yerinde kalır ve bütün ışık yok olur",
          "Üst yarığa doğru bir saçak aralığı",
          "Alt yarığa doğru bir saçak aralığı",
        ],
        answer: 3,
        hint: "Ek optik yolu dalga boyuyla karşılaştır; geciken yarık yönünü ayrıca belirle.",
        explanation:
          "Ek yol=(1,5−1)·1,2 μm=0,6 μm=600 nm olur. Bu, bir boşluk dalga boyudur; ilgili merkez çizgisinin kayması bir aralıktır. Üst koldaki gecikmeyi daha kısa üst geometrik yol dengeler; kayma üst yarığa doğrudur.",
        guidance: {
          knowledge: [
            "Ek optik yol (n−1)t; merkez kayması bu ek yolun λ₀’ya oranı kadar saçak aralığıdır.",
          ],
          strategy:
            "Ek optik yolu dalga boyuyla karşılaştır; geciken yarık yönünü ayrıca belirle.",
          steps: [
            "Ek yol=(1,5−1)·1,2 μm=0,6 μm=600 nm olur.",
            "Bu, bir boşluk dalga boyudur; ilgili merkez çizgisinin kayması bir aralıktır.",
            "Üst koldaki gecikmeyi daha kısa üst geometrik yol dengeler; kayma üst yarığa doğrudur.",
          ],
          optionReasons: [
            "Yön doğru fakat gecikme bir tam λ₀ iken yarım aralık denmiştir.",
            "Hem yön hem aralık katsayısı yanlıştır.",
            "İdeal ışık levha yüzünden bütünüyle yok olmaz; etiketli merkez çizgisi kayar.",
            "Doğru: üst tarafa bir Δy kayması.",
            "Aralık miktarı doğru fakat geciken yarığın ters yönünü seçer.",
          ],
          commonError:
            "Levha yönünü ezberlemek yerine, üst yolun kısalacağı perde tarafını düşün.",
          check:
            "600 nm/600 nm=1 oranını ve üst yoldaki gecikmeyi aynı çizimde doğrula.",
        },
      },
      {
        prompt:
          "Havada düzgün aydınlatılan tek yarıkta λ=600 nm, L=1 m ve a=0,30 mm. Uzak alan-küçük açı yaklaşımında merkez aydınlığın iki ilk karanlık arasındaki genişliği kaç mm?",
        options: ["6", "2", "1", "4", "8"],
        answer: 3,
        hint: "Önce bir taraftaki ilk karanlık uzaklığını bul, iki tarafı birleştir.",
        explanation:
          "λL/a=(6·10⁻⁷)/(3·10⁻⁴)=2·10⁻³ m=2 mm. İlk karanlıklar −2 ve +2 mm konumlarındadır. Aralarındaki merkez genişliği 4 mm olur; tek taraflı uzaklık genişlik değildir.",
        guidance: {
          knowledge: ["Tek yarık merkez genişliği 2λL/a olur."],
          strategy:
            "Önce bir taraftaki ilk karanlık uzaklığını bul, iki tarafı birleştir.",
          steps: [
            "λL/a=(6·10⁻⁷)/(3·10⁻⁴)=2·10⁻³ m=2 mm.",
            "İlk karanlıklar −2 ve +2 mm konumlarındadır.",
            "Aralarındaki merkez genişliği 4 mm olur; tek taraflı uzaklık genişlik değildir.",
          ],
          optionReasons: [
            "İlk minimum formülüne üç katsayısı eklenemez.",
            "Yalnız merkezden bir ilk karanlığa olan uzaklıktır.",
            "İlk karanlık uzaklığı bile gereğinden küçük alınmıştır.",
            "Doğru: iki taraflı genişlik 4 mm.",
            "Doğru iki katsayısı ikinci kez uygulanmıştır.",
          ],
          commonError:
            "Tek yarık merkezinin tam genişliğinde iki çarpanını unutma.",
          check:
            "a iki katına çıkarsa aynı hesabın 2 mm genişlik vermesi gerekir.",
        },
      },
      {
        prompt:
          "Tek yarık kırınımında dalga boyu, ortam ve perde uzaklığı sabit. Yarık genişliği a iki katına çıkarılıyor. Merkez aydınlığın genişliği ne olur?",
        options: ["Dörtte biri", "Dört katı", "İki katı", "Aynı", "Yarısı"],
        answer: 4,
        hint: "Yarığı fiziksel olarak büyütmenin kırınım yayılmasını nasıl azalttığını oranla göster.",
        explanation:
          "Başlangıç genişliği 2λL/a olarak yazılır. Yeni değer 2λL/(2 a) olur. Sonuç ilk değerin yarısıdır; daha geniş açıklık daha dar merkez deseni verir.",
        guidance: {
          knowledge: [
            "Wmerkez=2λL/a olduğundan genişlik a ile ters orantılıdır.",
          ],
          strategy:
            "Yarığı fiziksel olarak büyütmenin kırınım yayılmasını nasıl azalttığını oranla göster.",
          steps: [
            "Başlangıç genişliği 2λL/a olarak yazılır.",
            "Yeni değer 2λL/(2 a) olur.",
            "Sonuç ilk değerin yarısıdır; daha geniş açıklık daha dar merkez deseni verir.",
          ],
          optionReasons: [
            "İki kat açıklık değişimi kareyle kullanılmamıştır.",
            "a paydada olduğundan artışın yönü ters seçilmiştir.",
            "Yarık genişliğiyle desen genişliği özdeş sanılmıştır.",
            "a değişimi modelde etkilidir; sabit kalmaz.",
            "Doğru: payda iki katına çıkınca merkez genişliği yarılanır.",
          ],
          commonError:
            "Yarık ne kadar genişse desen de o kadar geniştir genellemesi yapma.",
          check:
            "İlk minimumların merkeze yaklaşmasıyla genişliğin daralmasını birlikte çiz.",
        },
      },
      {
        prompt:
          "Aynı λ ve L ile yapılan iki ideal deneyde çift yarık ayrımı d, tek yarık genişliği a’ya eşit. Çift yarığın merkez aydınlığının genişliği Δy kabul edilirse tek yarığın merkez genişliği kaç Δy olur?",
        options: ["1/2", "3", "4", "1", "2"],
        answer: 4,
        hint: "Aynı sayısal açıklığı iki farklı deneyin doğru formülüne koy.",
        explanation:
          "d=a koşulunda çift yarık için Δy=λL/a olur. Tek yarığın ilk karanlıkları ±λL/a konumundadır. Tek merkez genişliği 2λL/a=2Δy olur.",
        guidance: {
          knowledge: [
            "Çift yarık aralığı λL/d, tek yarık merkez genişliği 2λL/a olur.",
          ],
          strategy:
            "Aynı sayısal açıklığı iki farklı deneyin doğru formülüne koy.",
          steps: [
            "d=a koşulunda çift yarık için Δy=λL/a olur.",
            "Tek yarığın ilk karanlıkları ±λL/a konumundadır.",
            "Tek merkez genişliği 2λL/a=2Δy olur.",
          ],
          optionReasons: [
            "Merkez genişliğini yarım aralığa indiren karışıklıktır.",
            "İki ilk karanlık arasında üç aralık yoktur.",
            "İki katsayısını iki kez uygular.",
            "Tek ve çift yarık merkezlerini özdeş sayar.",
            "Doğru: tek yarık merkezinin tam genişliği iki Δy.",
          ],
          commonError:
            "Tek yarığın iki ilk karanlığı ile çift yarığın yarım aralık minimumlarını aynı konum sanma.",
          check:
            "Aynı λ, L, a için iki deneyin ilk sağ karanlığını karşılaştır; tekte iki kat uzak olur.",
        },
      },
      {
        prompt:
          "Çift yarıkta 600 nm dalga boylu ışık için saçak aralığı 3 mm. Aynı düzenekte dalga boyu 600 nm’den 400 nm’ye değiştiriliyor; ortam indisi iki renk için aynı kabul ediliyor. Yeni aralık kaç mm?",
        options: ["2", "1", "1,5", "3", "4,5"],
        answer: 0,
        hint: "Yeni/eski dalga boyu oranını eski aralıkla çarp.",
        explanation:
          "Dalga boyu oranı 400/600=2/3 olur. Yeni aralık 3·2/3=2 mm bulunur. Daha kısa dalga boyu daha sık saçak verir; sonuç yön ve sayıyla uyumludur.",
        guidance: {
          knowledge: [
            "Sabit L, d, n için aralık dalga boyuyla doğru orantılıdır.",
          ],
          strategy: "Yeni/eski dalga boyu oranını eski aralıkla çarp.",
          steps: [
            "Dalga boyu oranı 400/600=2/3 olur.",
            "Yeni aralık 3·2/3=2 mm bulunur.",
            "Daha kısa dalga boyu daha sık saçak verir; sonuç yön ve sayıyla uyumludur.",
          ],
          optionReasons: [
            "Doğru: 2/3 oranıyla 2 mm.",
            "Dalga boyunu üçte birine düşmüş gibi alır.",
            "Yeni/eski yerine gereksiz ikiye bölme yapılır.",
            "Rengin geometrik aralığı etkilediğini atlar.",
            "Ters oran kullanılarak aralık büyütülmüştür.",
          ],
          commonError:
            "600/400 ters oranını kullanarak kısa dalga boyunda daha geniş desen bulma.",
          check:
            "Yeni λ daha küçükken Δy’nin de 3 mm’den küçük olduğunu kontrol et.",
        },
      },
      {
        prompt:
          "İki yarık aynı tek renkli lazerden beslenince kararlı saçaklar görülüyor; bağımsız iki ampulle aynı düzenli desen görülmüyor. Bu fark için en uygun açıklama hangisi?",
        options: [
          "Girişim için mutlaka foton enerjisinin sıfır olması gerekir",
          "Ampuller her zaman aynı fazda titreşir",
          "Lazerden ayrılan iki katkının bağıl fazı daha düzenli korunur",
          "Ampullerin yaydığı ışık hiç dalga değildir",
          "Lazer ışığının boşluktaki hızı her zaman daha büyüktür",
        ],
        answer: 2,
        hint: "Işığın dalga olup olmaması yerine kaynakların bağıl faz düzenini değerlendir.",
        explanation:
          "Bağımsız ampullerde farklı katkıların bağıl fazı hızlı değişebilir. Ekranın zaman ortalamasında sabit maksimum ve minimumlar bu yüzden silikleşir. Aynı lazerden türetilen kollar daha düzenli bağıl faz sağladığı için C doğrudur.",
        guidance: {
          knowledge: [
            "Gözlenebilir kararlı girişim için bağıl fazın zaman içinde belirli kalması gerekir.",
          ],
          strategy:
            "Işığın dalga olup olmaması yerine kaynakların bağıl faz düzenini değerlendir.",
          steps: [
            "Bağımsız ampullerde farklı katkıların bağıl fazı hızlı değişebilir.",
            "Ekranın zaman ortalamasında sabit maksimum ve minimumlar bu yüzden silikleşir.",
            "Aynı lazerden türetilen kollar daha düzenli bağıl faz sağladığı için C doğrudur.",
          ],
          optionReasons: [
            "Sıfır foton enerjisi ışık girişiminin şartı değildir.",
            "Bağımsız ampullerin eş fazlı kalacağı varsayımı verilen durumu açıklamaz.",
            "Doğru: uyumluluk sabit desenin koşuludur.",
            "Ampul ışığı da elektromanyetik dalga özellikleri taşır.",
            "Boşlukta hız türden bağımsız c’dir.",
          ],
          commonError:
            "Kararlı desen görülmemesini ışığın dalga özelliğinin kaybolması diye yorumlama.",
          check:
            "Aynı ışığı iki kola ayırmanın, iki bağımsız kaynağı yan yana koymaktan neden farklı olduğunu açıkla.",
        },
      },
      {
        prompt:
          "Bir deneyde metalden elektron kopması ışığın eşik frekans koşuluna bağlıyken, başka deneyde dar yarıkta kırınım görülüyor. Işık modelleri için hangi sonuç uygundur?",
        options: [
          "Deneyin biri mutlaka uydurmadır",
          "Enerji alışverişinde foton, kırınımda dalga betimi işe yarar",
          "Yarıkta kırınım görülünce foton enerjisi tanımsız olur",
          "Bütün olaylar yalnız klasik bilye resmiyle tam açıklanır",
          "Frekansın hiçbir fiziksel rolü yoktur",
        ],
        answer: 1,
        hint: "Hangi deneyin enerji aktarımını, hangisinin uzaysal dalga dağılımını ölçtüğünü ayır.",
        explanation:
          "Elektron koparma eşiği, tekil enerji alışverişinde hf büyüklüğünün rolünü gösterir. Kırınım, açıklığın farklı bölgelerinden gelen dalga katkılarıyla betimlenir. İki gözlem aynı fiziksel ışığın farklı deneysel yönleridir; B bunları birlikte korur.",
        guidance: {
          knowledge: [
            "Farklı ölçümler ışığın kuantum ve dalga özelliklerinin farklı yönlerini gösterir.",
          ],
          strategy:
            "Hangi deneyin enerji aktarımını, hangisinin uzaysal dalga dağılımını ölçtüğünü ayır.",
          steps: [
            "Elektron koparma eşiği, tekil enerji alışverişinde hf büyüklüğünün rolünü gösterir.",
            "Kırınım, açıklığın farklı bölgelerinden gelen dalga katkılarıyla betimlenir.",
            "İki gözlem aynı fiziksel ışığın farklı deneysel yönleridir; B bunları birlikte korur.",
          ],
          optionReasons: [
            "Birbirini tamamlayan iki gerçek davranış arasında zorunlu sahtecilik sonucu yoktur.",
            "Doğru: açıklama aracı ölçülen olguya göre seçilir.",
            "Kırınım, E=hf ilişkisini geçersiz kılmaz.",
            "Klasik bilye resmi kırınımı tek başına karşılamaz.",
            "Eşik olayında frekans temel belirleyicidir.",
          ],
          commonError:
            "Dalga ve fotonu, birinin doğruluğu diğer gözlemi yok eder biçiminde kullanma.",
          check:
            "Her iki deneyin açıkladığı gözlemi bir cümleyle ayrı söyle; aynı cümleyi kopyalama.",
        },
      },
    ],
  },
  {
    id: "doppler-etkisi",
    topic: "detail-394",
    title: "Doppler etkisi: dalga cephelerinden gözlenen frekansa",
    minutes: 60,
    objectives: [
      "Kaynak ve alıcı hareketini ortam hızından ayır",
      "Bir boyutlu ses Doppler hesabını işaretlerle kur",
      "Işıkta mavi/kırmızı kayma ve ölçüm yöntemlerini karşılaştır",
    ],
    sections: [
      {
        title: "Kaynak frekansı ile duyulan frekans",
        paragraphs: [
          "Kaynak bir saniyede belirli sayıda titreşim üretir; buna kaynak frekansı denir. Gözlemcinin bir saniyede karşılaştığı dalga tepesi sayısı farklı olabilir. Bu fark, kaynağın kendisinin daha hızlı titreşmeye başlamasını gerektirmez.",
          "Doppler olayı, kaynak ve gözlemci hareketine bağlı olarak gözlenen frekansın değişmesidir. Ses için havanın durgun olduğu çerçeveyi ve gözlemcinin konumunu önce seç. Uzaklık tek başına frekans değildir; önemli olan tepelere ulaşma zaman düzenidir.",
        ],
      },
      {
        title: "Hareket eden kaynağın izini çiz",
        paragraphs: [
          "Kaynak her yeni titreşimi bir önceki konumundan farklı bir yerde üretir. Kaynak ses hızından yavaş biçimde sağa giderse önündeki ardışık tepeler daha yakın, arkasındakiler daha uzak olur; sesin havaya göre yayılma hızı değişmez.",
          "Kaynağın önündeki dalga boyu λön=(v−vk)/f₀, arkasındaki λarka=(v+vk)/f₀ bağıntısıyla bulunur. Burada vk sağ yönlü kaynak hızıdır ve v ortamda sesin hızıdır. Formül kaynak hareketsizken iki yanda v/f₀ sonucuna dönmelidir.",
        ],
      },
      {
        title: "Hareket eden alıcıyı ayrı düşün",
        paragraphs: [
          "Sabit bir kaynağa doğru hareket eden alıcı, havada zaten yayılmış tepelerle daha sık karşılaşır. Kaynak sabit olduğundan havadaki dalga boyu değişmez; alıcının birim zamanda gördüğü tepe sayısı değişir. Alıcı tepelerden kaçarsa karşılaşma sayısı azalır.",
          "Bu nedenle yalnız kaynak hareketinde kullanılan dalga boyu değişimi, alıcı hareketine otomatik taşınmaz. Havadaki bir cetvelin ölçtüğü dalga boyu ile hareketli alıcının iki tepeyi karşılaması arasındaki süre farklı ölçümlerdir; hangi büyüklüğün sorulduğunu oku.",
        ],
      },
      {
        title: "Bir boyutlu formülü işaretlerden kur",
        paragraphs: [
          "Kaynak solda, alıcı sağda ve dalga sağa ilerliyor olsun. İki hız da sağ yön pozitif seçilirse alıcının tepelere göre yaklaşma hızı v−vg, havadaki ön dalga boyu (v−vk)/f₀ olur. Frekans bu iki büyüklüğün oranıdır.",
          "Böylece fG=f₀·(v−vg)/(v−vk) elde edilir. Alıcı sola giderse vg negatiftir ve pay büyür; kaynak sağa giderse payda küçülür. Bu formül bir boyutlu, sabit hızlı ve ses altı kaynak için kurulmuştur; rastgele yönlü iki hızı işaretsiz toplamaya çalışma.",
        ],
      },
      {
        title: "Aynı kapanma hızı her zaman aynı sonucu vermez",
        paragraphs: [
          "Ses ortamı bir başvuru çerçevesi sağlar. 340 m/s ses hızında 34 m/s ile yaklaşan kaynak ve duran alıcı, fG/f₀=340/306 oranını verir. Kaynak durup alıcı 34 m/s ile yaklaşırsa oran 374/340 olur; ikisi aynı sayıya eşit değildir.",
          "Her iki durumda uzaklık aynı hızla azalsa da ilkinde tepeler arası uzaklık, ikincisinde karşılaşma hızı değişmiştir. Küçük hızlarda yaklaşık değişimler yakın olabilir; tam sayısal karşılaştırma, sesin ortamına göre kaynak ve alıcı hızlarını ayrı kullanır.",
        ],
      },
      {
        title: "Birlikte giden kaynak ve alıcı",
        paragraphs: [
          "Kaynak ve alıcı aynı doğru üzerinde aynı sabit hızla giderken aralarındaki uzaklık sabit kalır. Bir boyutlu formülde vk=vg seçildiğinde pay ve payda eşit olur; gözlenen frekans kaynak frekansına döner. Havadaki ön dalga boyu yine kaynak hareketinden etkilenmiş olabilir.",
          "Bu sonuç frekans aynıysa her niceliğin aynı olduğu anlamına gelmez. Dalga boyunun kime ve hangi çerçeveye göre ölçüldüğünü, ses hızının ortama göre verildiğini ve alıcının tepelerle karşılaşma hızını birlikte yazınca görünür çelişki çözülür.",
        ],
      },
      {
        title: "Siren örneğinde tizliği uzaklıktan ayır",
        paragraphs: [
          "Düz bir doğrultuda sabit hızla yaklaşan kaynak ve duran alıcı için ideal modelde yaklaşma boyunca frekans sabittir ve f₀’dan büyüktür. Kaynak geçip uzaklaşınca frekans f₀’dan küçük olur. Yaklaşırken sesin şiddetinin büyümesi, frekansın sürekli artması demek değildir.",
          "Yol kenarındaki gerçek geçişte hızın görüş doğrultusundaki bileşeni değişebilir; gözlenen perde değişimi bu geometriyi içerir. Uzaklık ve şiddet, radyal hız ve frekans, sesin kalınlığı ve gürlüğü ayrı kavramlardır; sorudaki ideal koşulu gerçek trafikle karıştırma.",
        ],
      },
      {
        title: "Bir sınır modeli olarak ses hızı",
        paragraphs: [
          "Sesin havadaki hızı sıcaklık ve ortam koşullarıyla değişir; ses kaynağının otomobil motoruyla hızlandırılması, aynı havada v değerini kaynak hızıyla toplamayı gerektirmez. Tepelerin kaynaktan çıkış düzeni ile ortamda sonraki yayılması farklıdır.",
          "Kaynak hızı ses hızına yaklaşınca öndeki dalga boyu çok küçülür; ses hızını aşan kaynakta şok ve Mach konisi gibi başka bir geometri gerekir. Bu etkileşim yalnız ses altı durumu kullanır; formülü geçersiz bölgeye uzatıp negatif frekans üretmez.",
        ],
      },
      {
        title: "Işıkta ortamın yerini boşluk alır",
        paragraphs: [
          "Işıkta vakum için sesin durgun havasına karşılık gelen ayrı bir taşıyıcı ortam kullanılmaz. Her eylemsiz gözlemci ışığın boşluktaki hızını c ölçer. Bu nedenle ses için yazılmış v±vk kuralını ışığa aynen taşımak doğru bir relativistik hesap vermez.",
          "Doğrusal yaklaşma veya uzaklaşmada ışığın frekansı ve dalga boyu gözlemciye göre değişir. Yaklaşan kaynağın çizgisi daha kısa dalga boyuna, uzaklaşanınki daha uzun dalga boyuna kayar. Buradaki 'mavi' veya 'kırmızı', bütün yıldızın mutlaka o renkte görünmesi demek değildir.",
        ],
      },
      {
        title: "Bir spektrum çizgisini karşılaştır",
        paragraphs: [
          "Laboratuvarda dalga boyu bilinen bir atom çizgisi, uzak kaynağın tayfındaki aynı kimlikli çizgiyle eşleştirilir. Gözlenen dalga boyu laboratuvar değerinden büyükse kırmızıya kayma, küçükse maviye kayma adını alır. Önce aynı çizgiyi eşleştirmek gerekir.",
          "Işığın boşlukta λf=c bağıntısı kullanılır: dalga boyu büyürken frekans küçülür. Bir çizginin yoğunluğunun azalması, tepe yerinin kaymasıyla aynı olay değildir. Sıcaklık, kimyasal bolluk ve alıcı duyarlılığı çizgi şiddetini ayrıca etkileyebilir.",
        ],
      },
      {
        title: "Işık modelinin sayısal genişletmesi",
        paragraphs: [
          "Yalnız görüş doğrultusunda bağıl hız u olan özel görelilik modelinde β=u/c seçilsin ve pozitif işaret uzaklaşmayı göstersin. Dalga boyu oranı λG/λ₀=√((1+β)/(1−β)) olur; yaklaşmada β negatiftir ve oran birden küçük çıkar.",
          "Bu bağıntı öğretimi sayısal olarak genişletir; temel renk yönünü bilmek için formülü ezberlemek gerekmez. Kozmolojik genişleme ve kütle çekiminden kaynaklanan kırmızıya kayma, aynı sözcüğü kullansa da bu iki eylemsiz cisim formülünün doğrudan kapsamı değildir.",
        ],
      },
      {
        title: "Ultrason ve radar neyi ölçer",
        paragraphs: [
          "Doppler ultrasonda hareketli kan hücrelerinden yansıyan sesin frekans değişimi kullanılır. Radar ise elektromanyetik dalga gönderip hareketli hedeften dönen sinyali inceler. Her ikisinde de yansıma yüzünden gidiş ve dönüş hareketleri birlikte rol oynayabilir.",
          "Tek bir kaynak-alıcı geçişi için bulunan oranı, yansımalı düzeneğe koşulsuz aynen koyma. Hızın ışın doğrultusundaki bileşeni önemlidir. İki yönlü ideal radarın küçük hız yaklaşımındaki katsayı iki, farklı bir ölçüm geometrisinin sonucudur; bir ezber ek sayı değildir.",
        ],
      },
      {
        title: "Sonarda uçuş zamanı ve Doppler’i ayır",
        paragraphs: [
          "Giden sesin dönmesi için geçen süre ve ortam hızı biliniyorsa durağan hedefin uzaklığı yaklaşık d=v·t/2 ile bulunur. Buradaki iki, sesin gidiş ve dönüş yolunu birlikte katetmesinden gelir; frekans ölçmek zorunlu değildir.",
          "Doppler kayması ise hareketin görüş doğrultusundaki bileşeni hakkında bilgi verir. Sabit deniz tabanına ait yankı süresiyle harita üretmek, her ölçümün Doppler kayması olduğu anlamına gelmez. Aynı cihazın iki farklı ölçüm ilkesini kullanabilmesi, ilkeleri özdeş yapmaz.",
        ],
      },
      {
        title: "Tahmini ayrı, kanıtı ayrı kaydet",
        paragraphs: [
          "Ses modelinde önce kaynak ve alıcı hızlarını işaretleriyle seç; sonra ön ve arka dalga boyunu, alıcının karşılaşma hızını ve gözlenen frekansı birlikte oku. Görünen halkalar, bir kaynak periyodu ve başlangıç dalga boyu cinsinden örnek dalga cepheleridir.",
          "Işık sekmesinde bağıl hızı değiştirip aynı çizginin yerini karşılaştır. İki modelin hız bağıntısı aynı olmadığını gör; burada ses dosyası veya gerçek tıbbi ölçüm üretilmez. Tahmin-gerekçe karşılaştırması puansızdır ve bağımsız soru cevabı yerine sayılmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Kaynak hareketiyle tepe aralığı",
        prompt:
          "Ses 340 m/s, kaynak 680 Hz ve alıcıya doğru 68 m/s. Alıcı duruyor. Frekansı bul.",
        strategy: "Ön dalga boyunu ayrı bul.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "Kaynağın önündekiλ=(340−68)/680=0,4 m.",
          },
          {
            label: "İşlemi yap",
            explanation:
              "Alıcı tepelerle 340 m/s hızla karşılaşır; fG=340/0,4=850 Hz.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Kaynak 680 Hz titreşmeyi sürdürür; ön tarafta tepe aralığının sıkışması alınan frekansı artırır.",
          },
        ],
        answer: "850 Hz",
        check:
          "Doğrudan frekans oranı 680·340/272=850 Hz ile aynı sonucu vermelidir.",
        pitfall: "Dalganın havaya göre hızını 408 m/s yapma.",
      },
      {
        title: "Alıcı hareketiyle karşılaşma",
        prompt:
          "Kaynak 400 Hz ile duruyor; alıcı kaynağa doğru 17 m/s gidiyor. Ses hızı 340 m/s.",
        strategy: "Havadakiλ sabitken karşılaşma hızını değiştir.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "λ=340/400=0,85 m olarak kalır.",
          },
          {
            label: "İşlemi yap",
            explanation: "Alıcının karşılaşma hızı 340+17=357 m/s.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "357/0,85=420 Hz; alıcıya göre frekans değişse de havadaki dalga boyu değişmedi.",
          },
        ],
        answer: "420 Hz",
        check: "400·357/340=420 Hz; alıcı hızı sıfır olsa sonuç 400 Hz olurdu.",
        pitfall: "Duran kaynak içinλ’yı(340−17)/400 diye yazma.",
      },
      {
        title: "Uzaklaşan iki hareketin işaretleri",
        prompt:
          "Kaynak solda 550 Hz, sola 34 m/s; alıcı sağda sağa 34 m/s. Ses 340 m/s.",
        strategy: "+x yönünü sağ seçip iki hızı ayrı yaz.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "vk=−34, vg=+34; pay 306, payda 374 olur.",
          },
          {
            label: "İşlemi yap",
            explanation: "fG=550·306/374=450 Hz.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Kaynak ve alıcı uzaklaşmaları aynı yönde etki ederek gözlenen frekansı azaltır.",
          },
        ],
        answer: "450 Hz",
        check: "550·9/11=450; oran 1’den küçük.",
        pitfall: "İki 34’ü toplayıp tek kaynak hızına dönüştürme.",
      },
      {
        title: "Yaklaşan ışık kaynağı",
        prompt:
          "Radyal özel görelilik modelindeβ=−0,6 veλ₀=600 nm. λG/λ₀=√((1+β)/(1−β)).",
        strategy: "Eksiβ yaklaşmayı temsil eder.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "Oran√(0,4/1,6)=√0,25=0,5.",
          },
          {
            label: "İşlemi yap",
            explanation: "Gözlenen dalga boyu 600·0,5=300 nm.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Daha kısa dalga boyu maviye kayma yönüdür; dalganın boşluk hızı yine c.",
          },
        ],
        answer: "300 nm",
        check: "Frekans oranı 2 olmalı; 0,5·2=1.",
        pitfall: "Yaklaşmayı+0,6 yazarak kırmızıya kayma bulma.",
      },
      {
        title: "Aynı çizginin oranını okumak",
        prompt:
          "Laboratuvar çizgisi 500 nm, aynı çizginin gözlemi 525 nm. Frekans oranı ve kayma nedir?",
        strategy: "Dalga boyu ile frekans oranını ters kur.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "Dalga boyu oranı 525/500=1,05.",
          },
          {
            label: "İşlemi yap",
            explanation: "Frekans oranı 500/525=20/21≈0,9524.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Dalga boyu büyüdüğü için kırmızıya kayma; frekans yaklaşık%4,76 azalır.",
          },
        ],
        answer: "Kırmızıya kayma; fG/f₀=20/21.",
        check:
          "Dalga boyu ve frekans oranlarının çarpımı 1,05·20/21=1 olmalıdır.",
        pitfall: "Dalga boyundaki%5 artışı frekansta tam%5 azalış diye yazma.",
      },
      {
        title: "Yankı süresi başka ölçümdür",
        prompt:
          "Ses hızının 1000 m/s olduğu ortamda yankı 0,12 s sonra dönüyor; düşey durağan hedefin uzaklığını bul.",
        strategy: "Toplam yol ile tek yönü ayır.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "Gidiş-dönüş yolu 1000·0,12=120 m.",
          },
          {
            label: "İşlemi yap",
            explanation: "Tek yön uzaklık 120/2=60 m.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Bu sonuç frekans farkı verilmese de uçuş zamanı sayesinde hesaplanır; Doppler varsayımı gerekmez.",
          },
        ],
        answer: "60 m",
        check: "60+60=120 m ve 120/1000=0,12 s.",
        pitfall: "Gidiş-dönüş iki katsayısını hıza ekleme veya iki kez bölme.",
      },
    ],
    recall: [
      {
        prompt: "Hareketli kaynak havadaki ses hızını neden değiştirmez?",
        answer:
          "Kaynak yeni tepeleri farklı konumlarda üretir; tepelerin ortam içindeki yayılma hızı hâlâ ortam özellikleriyle belirlenir.",
      },
      {
        prompt: "Sabit kaynak, hareketli alıcı durumunda ne değişir?",
        answer:
          "Havadaki dalga boyu aynı kalır; alıcının tepelerle karşılaşma hızı ve gözlenen frekans değişir.",
      },
      {
        prompt: "Ses için yalnız kapanma hızı tam hesapta yeterli midir?",
        answer:
          "Hayır; kaynak ve alıcı hızları ortam çerçevesinde farklı yerlerde formüle girer.",
      },
      {
        prompt: "Maviye kaymadaλ, f ve boşluk hızı nasıl değişir?",
        answer:
          "Aynı çizgi daha kısaλ ve daha büyükf ile görülür; c yine aynıdır.",
      },
      {
        prompt: "Yankı süresiyle derinlik hesabı Doppler midir?",
        answer:
          "Tek başına değildir; uçuş zamanından d=vt/2 bulunur, Doppler ise frekans değişimini kullanır.",
      },
      {
        prompt: "Radyal ışık formülündekiβ>0 neyi temsil eder?",
        answer:
          "Bu modelde uzaklaşmayı; dalga boyu oranı 1’den büyük olur. Kozmolojik ve kütle çekim kaymaları ayrı kapsamdır.",
      },
    ],
    source:
      "MEBİ AYT Fizik fiziksel PDF 199–201 ve Dersler Cepte 12 Fizik 5. sayı PDF 15–16 okunarak yazılmış özgün öğretim. Ses için ortam çerçevesi; ışık için açıkça eklenen saf radyal özel görelilik modeli ayrılır. Gerçek tıbbi hız ölçümü veya bütün ÖSYM arşivi değildir.",
    items: [
      {
        prompt:
          "Durgun havada ses hızı 340 m/s. 500 Hz’lik kaynak, sağında duran alıcıya doğru 34 m/s hızla gidiyor. Bir boyutlu ses altı modelinde alıcı yaklaşık kaç Hz duyar?",
        options: ["600", "550", "555,6", "500", "450"],
        answer: 2,
        hint: "Kaynak hareketinin öndeki dalga boyunu küçülttüğünü kullan.",
        explanation:
          "Kaynak alıcıya doğru gittiğinden payda 340−34=306 m/s olur. fG=500·340/306≈555,6 Hz bulunur. Kaynak frekansı 500 Hz kalırken alınan frekans daha büyüktür.",
        guidance: {
          knowledge: ["Duran sağ alıcı için fG=f₀v/(v−vk) kullanılır."],
          strategy:
            "Kaynak hareketinin öndeki dalga boyunu küçülttüğünü kullan.",
          steps: [
            "Kaynak alıcıya doğru gittiğinden payda 340−34=306 m/s olur.",
            "fG=500·340/306≈555,6 Hz bulunur.",
            "Kaynak frekansı 500 Hz kalırken alınan frekans daha büyüktür.",
          ],
          optionReasons: [
            "Verilen hızlarda oran 1,2 değildir.",
            "Bu, duran kaynak ve 34 m/s yaklaşan alıcı için çıkar.",
            "Doğru: 340/306 oranı uygulanır.",
            "Kaynak hareketinin etkisi atlanmıştır.",
            "Uzaklaşan kaynak yönüne uygun bir düşüş olurdu.",
          ],
          commonError:
            "Kaynak hareketini alıcı hareketinin pay katsayısıyla değiştirme.",
          check: "Ön dalga boyu 306/500=0,612 m; 340/0,612 aynı sonucu verir.",
        },
      },
      {
        prompt:
          "Durgun havada ses hızı 340 m/s ve kaynak 500 Hz ile sabit duruyor. Kaynağın sağındaki alıcı sola, kaynağa doğru 34 m/s ile gidiyor. Gözlenen frekans kaç Hz?",
        options: ["625", "550", "450", "555,6", "500"],
        answer: 1,
        hint: "Önce kaynak sabitken dalga boyunun değişmediğini belirle.",
        explanation:
          "Havadaki dalga boyu 340/500=0,68 m olarak kalır. Alıcı tepelere doğru gittiği için karşılaşma hızı 374 m/s olur. fG=374/0,68=550 Hz; bu kaynak hareketi sorusundaki 555,6 Hz ile aynı değildir.",
        guidance: {
          knowledge: [
            "Duran kaynakta havadaki dalga boyu v/f₀; yaklaşan alıcının tepe karşılaşma hızı v+34 olur.",
          ],
          strategy: "Önce kaynak sabitken dalga boyunun değişmediğini belirle.",
          steps: [
            "Havadaki dalga boyu 340/500=0,68 m olarak kalır.",
            "Alıcı tepelere doğru gittiği için karşılaşma hızı 374 m/s olur.",
            "fG=374/0,68=550 Hz; bu kaynak hareketi sorusundaki 555,6 Hz ile aynı değildir.",
          ],
          optionReasons: [
            "Verilen karşılaşma hızı bu kadar büyük artış üretmez.",
            "Doğru: (340+34)/340 ile 500 çarpılır.",
            "Alıcı uzaklaşsaydı frekans düşerdi.",
            "Kaynak hareketinin paydası kullanılmıştır.",
            "Alıcı hareketi göz ardı edilmiştir.",
          ],
          commonError: "Alıcı sola giderken vg=+34 yazma; seçilen +x sağdır.",
          check:
            "Alıcı durunca vg=0 için frekansın yeniden 500 Hz olacağını kontrol et.",
        },
      },
      {
        prompt:
          "Durgun havada kaynak solda, alıcı sağda ve her ikisi sağa 34 m/s ile gidiyor; yer değiştirme doğrultuları aynı. Kaynak 500 Hz, ses hızı 340 m/s. Alıcı kaç Hz duyar?",
        options: ["555,6", "500", "450", "550", "Sıfır"],
        answer: 1,
        hint: "Eşit iki hızı aynı işaretle pay ve paydaya koy.",
        explanation:
          "Alıcının karşılaşma hızı 340−34=306 m/s’dir. Kaynağın öndeki dalga boyu (340−34)/500=0,612 m olur. 306/0,612=500 Hz; aynı hızlar frekans oranında sadeleşir.",
        guidance: {
          knowledge: ["Bir boyutlu modelde fG=f₀(v−vg)/(v−vk)."],
          strategy: "Eşit iki hızı aynı işaretle pay ve paydaya koy.",
          steps: [
            "Alıcının karşılaşma hızı 340−34=306 m/s’dir.",
            "Kaynağın öndeki dalga boyu (340−34)/500=0,612 m olur.",
            "306/0,612=500 Hz; aynı hızlar frekans oranında sadeleşir.",
          ],
          optionReasons: [
            "Duran alıcı varsayımı kullanır.",
            "Doğru: iki hız etkisi oran içinde dengelenir.",
            "Yalnız alıcının uzaklaşma etkisini sayar.",
            "Yalnız yaklaşan kaynak/alıcı etkilerinden birini sayar.",
            "Dalga tepeleri alıcıya ulaşır; ses kesilmesi gerekmez.",
          ],
          commonError:
            "Frekans aynı kaldı diye havadaki dalga boyunun da 0,68 m kaldığını sanma.",
          check:
            "Havadaki dalga boyu değişse de alıcı karşılaşma hızının aynı oranda değiştiğini göster.",
        },
      },
      {
        prompt:
          "Kaynak solda, alıcı sağda. Durgun havada v=340 m/s, kaynak f₀=450 Hz ile sağa 34 m/s, alıcı sola 34 m/s gidiyor. İdeal bir boyutlu modelde alınan frekans kaç Hz?",
        options: ["495", "500", "600", "450", "550"],
        answer: 4,
        hint: "İki hareketi v−vg ve v−vk terimlerinde ayrı uygula.",
        explanation:
          "Pay 340−(−34)=374; payda 340−34=306 bulunur. Oran 374/306=11/9 olur. 450·11/9=550 Hz; yaklaşan iki hareketin ikisi de frekansı artırır.",
        guidance: {
          knowledge: ["Sağ yönü pozitif seçince vk=+34 ve vg=−34 olur."],
          strategy: "İki hareketi v−vg ve v−vk terimlerinde ayrı uygula.",
          steps: [
            "Pay 340−(−34)=374; payda 340−34=306 bulunur.",
            "Oran 374/306=11/9 olur.",
            "450·11/9=550 Hz; yaklaşan iki hareketin ikisi de frekansı artırır.",
          ],
          optionReasons: [
            "Yalnız bir yaklaşık artışı kullanır.",
            "Tek bir kaynak uzaklaşma/ölçek hesabına aittir.",
            "İşaretleri toplam hız diye tek paydada yanlış birleştirir.",
            "İki hareketin de etkisini atlar.",
            "Doğru: 450·374/306=550.",
          ],
          commonError:
            "İki cisim yaklaşınca hızları toplayıp tek kaynak hızı yapma.",
          check:
            "vg=0 veya vk=0 yazarak her bir etkinin ayrı hâlde de artış verdiğini kontrol et.",
        },
      },
      {
        prompt:
          "600 Hz’lik kaynak, duran alıcıdan 68 m/s ile uzaklaşıyor. Hava durgun ve ses hızı 340 m/s. Bir boyutlu ses altı modelinde alıcı kaç Hz duyar?",
        options: ["500", "750", "400", "480", "600"],
        answer: 0,
        hint: "Uzaklaşmayı paydada artış olarak kur; frekansın düşmesini bekle.",
        explanation:
          "Alıcıya giden tepeler 340+68=408 katsayısıyla daha aralıklı üretilir. fG=600·340/408 hesaplanır. Sonuç 500 Hz’dir ve 600 Hz’den küçüktür.",
        guidance: {
          knowledge: [
            "Uzaklaşan kaynak için alıcı yönündeki dalga boyu (v+|vk|)/f₀ olur.",
          ],
          strategy:
            "Uzaklaşmayı paydada artış olarak kur; frekansın düşmesini bekle.",
          steps: [
            "Alıcıya giden tepeler 340+68=408 katsayısıyla daha aralıklı üretilir.",
            "fG=600·340/408 hesaplanır.",
            "Sonuç 500 Hz’dir ve 600 Hz’den küçüktür.",
          ],
          optionReasons: [
            "Doğru: payda 408 ile sonuç 500.",
            "Yaklaşma yönü kullanılmıştır.",
            "Verilen hızın etkisi gereğinden büyük alınmıştır.",
            "Kaynak yerine alıcı hareketinin 1−68/340 katsayısı kullanılmıştır.",
            "Kaynak-alıcı bağıl hareketi atlanmıştır.",
          ],
          commonError:
            "Uzaklaşan kaynakta v−68 paydası yazıp frekansı artırma.",
          check: "Hız sıfıra yaklaşırken sonucun 600 Hz’e yaklaşması gerekir.",
        },
      },
      {
        prompt:
          "Havada v=340 m/s. 400 Hz’lik kaynak sağa 68 m/s ile ilerliyor. Havadaki kaynak önündeki ve arkasındaki dalga boyları sırasıyla kaç metredir?",
        options: [
          "0,85 ve 0,85",
          "1,02 ve 0,68",
          "0,68 ve 0,68",
          "0,17 ve 0,17",
          "0,68 ve 1,02",
        ],
        answer: 4,
        hint: "Ön tarafın sıkıştığını, arka tarafın açıldığını aynı işlemde kontrol et.",
        explanation:
          "Ön için λ=(340−68)/400=272/400=0,68 m. Arka için λ=(340+68)/400=408/400=1,02 m. E doğru sırayı verir; kaynağın iki yanda ayrı frekansta titreşmesi gerekmez.",
        guidance: {
          knowledge: ["λön=(v−vk)/f₀; λarka=(v+vk)/f₀."],
          strategy:
            "Ön tarafın sıkıştığını, arka tarafın açıldığını aynı işlemde kontrol et.",
          steps: [
            "Ön için λ=(340−68)/400=272/400=0,68 m.",
            "Arka için λ=(340+68)/400=408/400=1,02 m.",
            "E doğru sırayı verir; kaynağın iki yanda ayrı frekansta titreşmesi gerekmez.",
          ],
          optionReasons: [
            "Bu, duran kaynağın dalga boyudur.",
            "Ön ve arka yönler yer değiştirmiştir.",
            "Arka dalganın aralık artışı atlanır.",
            "Kaynak hızını tek başına dalga hızı gibi kullanır.",
            "Doğru: önde 0,68, arkada 1,02 m.",
          ],
          commonError:
            "Havadaki ses hızını ön tarafta 408, arkada 272 m/s sanma; değişen dalga boyudur.",
          check: "İki dalga boyunun ortalaması 0,85 m, yani v/f₀ olmalıdır.",
        },
      },
      {
        prompt:
          "Düz bir doğru üzerinde sabit hızla yaklaşan siren kaynağı ve duran alıcı düşünülüyor. Ses hızı sabit, kaynak henüz alıcıyı geçmedi. İdeal modelde yalnız uzaklığın azalması hangi sonucu zorunlu kılar?",
        options: [
          "Alınan frekansın uzaklık yüzünden sürekli değişmesini gerektirmez",
          "Sesin havadaki hızının sürekli artmasını",
          "Alınan frekansın sürekli artmasını",
          "Her an yeni bir ses kaynağı oluşmasını",
          "Kaynak frekansının her saniye iki katına çıkmasını",
        ],
        answer: 0,
        hint: "Uzaklığa bağlı şiddet değişimini hızlara bağlı frekanstan ayır.",
        explanation:
          "Kaynak ve alıcı hızları ideal yaklaşma boyunca sabittir. fG=f₀v/(v−vk) bu koşullarda sabit bir frekans verir. Uzaklık azalırken ses daha güçlü duyulabilir; bu frekansın sürekli yükselmesiyle aynı değildir.",
        guidance: {
          knowledge: [
            "Bir boyutlu sabit hızlı Doppler oranında uzaklık yoktur.",
          ],
          strategy:
            "Uzaklığa bağlı şiddet değişimini hızlara bağlı frekanstan ayır.",
          steps: [
            "Kaynak ve alıcı hızları ideal yaklaşma boyunca sabittir.",
            "fG=f₀v/(v−vk) bu koşullarda sabit bir frekans verir.",
            "Uzaklık azalırken ses daha güçlü duyulabilir; bu frekansın sürekli yükselmesiyle aynı değildir.",
          ],
          optionReasons: [
            "Doğru: uzaklık azalması tek başına frekans sürüklenmesi değildir.",
            "Aynı hava koşullarında kaynak yaklaşması v’yi artırmaz.",
            "Sabit hız formülünde artışı uzaklık yönetmez.",
            "Dalga yayılması yeni bağımsız sirenler üretmez.",
            "Kaynağın kendi titreşim düzeni sabit verilmiştir.",
          ],
          commonError:
            "Yaklaşırken gürleşen sesi zorunlu olarak sürekli tizleşen ses sanma.",
          check:
            "Aynı vk için iki farklı uzaklığı formülde deneyip aynı oranı bul.",
        },
      },
      {
        prompt:
          "Bir atom çizgisinin laboratuvar dalga boyu 600 nm; uzak kaynaktan gözlenen aynı çizgi 660 nm. Boşlukta aynı c için frekans oranı fG/f₀ ve kayma türü nedir?",
        options: [
          "11/10 ve kırmızı",
          "10/11 ve mavi",
          "10/11 ve kırmızı",
          "11/10 ve mavi",
          "1 ve kırmızı",
        ],
        answer: 2,
        hint: "Aynı çizginin dalga boylarını ters oranla frekansa bağla.",
        explanation:
          "Gözlenen dalga boyu 660 nm, laboratuvar 600 nm’den büyüktür. fG/f₀=λ₀/λG=600/660=10/11 olur. Frekans azalıp dalga boyu arttığı için kırmızıya kaymadır.",
        guidance: {
          knowledge: [
            "Boşlukta f=c/λ; dalga boyu artışı frekans azalışıyla birlikte kırmızıya kaymadır.",
          ],
          strategy: "Aynı çizginin dalga boylarını ters oranla frekansa bağla.",
          steps: [
            "Gözlenen dalga boyu 660 nm, laboratuvar 600 nm’den büyüktür.",
            "fG/f₀=λ₀/λG=600/660=10/11 olur.",
            "Frekans azalıp dalga boyu arttığı için kırmızıya kaymadır.",
          ],
          optionReasons: [
            "Frekans artışı, verilen daha uzun dalga boyuyla çelişir.",
            "Oran doğru olsa da kayma adı ters seçilmiştir.",
            "Doğru: ters oran 10/11 ve kırmızı.",
            "Dalga boyu oranını frekans oranı sanır; yön de terstir.",
            "Aynı c korunurken λ değiştiğinde f sabit kalamaz.",
          ],
          commonError: "Frekans oranını 660/600 diye yazma.",
          check:
            "(10/11)·(660/600)=1 ile λf çarpımının aynı kaldığını denetle.",
        },
      },
      {
        prompt:
          "Yalnız radyal özel görelilik modelinde λG/λ₀=√((1+β)/(1−β)), β>0 uzaklaşma. λ₀=500 nm ve β=0,6 ise gözlenen dalga boyu kaç nm?",
        options: ["1000", "500", "250", "400", "800"],
        answer: 0,
        hint: "Karekök içindeki oranı önce hesapla; sonra λ₀ ile çarp.",
        explanation:
          "(1+0,6)/(1−0,6)=1,6/0,4=4 bulunur. Karekök 4=2 olduğu için dalga boyu iki katına çıkar. λG=2·500=1000 nm; uzaklaşma kırmızıya kayma yönündedir.",
        guidance: {
          knowledge: [
            "Verilen β, sesin ortamına göre kaynak hızı değil ışığın radyal bağıl hız oranıdır.",
          ],
          strategy: "Karekök içindeki oranı önce hesapla; sonra λ₀ ile çarp.",
          steps: [
            "(1+0,6)/(1−0,6)=1,6/0,4=4 bulunur.",
            "Karekök 4=2 olduğu için dalga boyu iki katına çıkar.",
            "λG=2·500=1000 nm; uzaklaşma kırmızıya kayma yönündedir.",
          ],
          optionReasons: [
            "Doğru: kök oran 2 ve dalga boyu 1000 nm.",
            "β sıfırmış gibi etkisiz alınmıştır.",
            "Ters Doppler oranıyla yaklaşma sonucu verir.",
            "Karekök formülü yerine doğrusal yanlış katsayı kullanır.",
            "Yalnız 1+β katsayısını alır.",
          ],
          commonError:
            "Verilen ışık formülünün yerine sesin v/(v−vk) bağıntısını koyma.",
          check: "β=0 için oran 1, β>0 için oran 1’den büyük olmalıdır.",
        },
      },
      {
        prompt:
          "Durgun deniz tabanına gönderilen ses 0,20 s sonra gemiye geri dönüyor. Sudaki ses hızı 1500 m/s. Gidiş-dönüş ışını aynı düşey yolu izliyorsa derinlik kaç metre ve hangi temel ölçüm kullanılmıştır?",
        options: [
          "300 m, Doppler kayması",
          "3000 m, kaynak frekansı",
          "150 m, zorunlu frekans artışı",
          "150 m, uçuş zamanı",
          "75 m, ışığın boşluk hızı",
        ],
        answer: 3,
        hint: "İki kat yolu tek yön derinlikten ayır; frekans verisi olup olmadığını kontrol et.",
        explanation:
          "Toplam ses yolu 1500·0,20=300 m olur. Bu yol gidiş ve dönüşü içerdiği için derinlik 150 m’dir. Ölçülen nicelik zaman olduğundan bu hesap uçuş zamanına dayanır; Doppler zorunlu değildir.",
        guidance: {
          knowledge: ["Yankı zamanı iki yönlü yol içindir; d=vt/2."],
          strategy:
            "İki kat yolu tek yön derinlikten ayır; frekans verisi olup olmadığını kontrol et.",
          steps: [
            "Toplam ses yolu 1500·0,20=300 m olur.",
            "Bu yol gidiş ve dönüşü içerdiği için derinlik 150 m’dir.",
            "Ölçülen nicelik zaman olduğundan bu hesap uçuş zamanına dayanır; Doppler zorunlu değildir.",
          ],
          optionReasons: [
            "Hem ikiye bölme unutulur hem ölçüm türü karıştırılır.",
            "Birim ve sayı verilen hız-zamanla uyuşmaz.",
            "Derinlik doğru ama frekans artışı veriden çıkmaz.",
            "Doğru: tek yön mesafe 150 m ve zaman ölçümü.",
            "Ses hesabına ışık hızı veya fazladan iki bölme uygulanamaz.",
          ],
          commonError:
            "Sonar sözcüğü geçtiğinde her hesabı Doppler diye adlandırma.",
          check:
            "150 m gidiş+150 m dönüşün 1500 m/s ile 0,20 s sürdüğünü doğrula.",
        },
      },
      {
        prompt:
          "Kan akışını inceleyen Doppler ultrason ile trafikte hız ölçen elektromanyetik radar karşılaştırılıyor. Hangi ifade doğrudur?",
        options: [
          "Ultrason elektromanyetik, radar mekanik dalgadır",
          "Her ikisinin boşlukta yayılması için hava zorunludur",
          "İkisi de yalnız görünür ışık kullanır",
          "İkisi de hareketli hedeften dönen dalganın frekans değişimini kullanabilir",
          "İkisi de hedefin hızından bağımsız aynı frekansı zorunlu alır",
        ],
        answer: 3,
        hint: "Dalga türünü ölçüm ilkesinden ayrı sınıflandır.",
        explanation:
          "Ultrasonun ses dalgası maddesel ortamda, radarın sinyali elektromanyetik dalga olarak yayılır. Hareketli hedefin yansıttığı dalgada alınan frekans değişimi hıza ilişkin bilgi sağlayabilir. D ortak ölçüm ilkesini korur; iki dalga türünü özdeşleştirmez.",
        guidance: {
          knowledge: [
            "Ultrason mekanik ses, radar elektromanyetik dalga kullanır; yansımada Doppler kayması oluşabilir.",
          ],
          strategy: "Dalga türünü ölçüm ilkesinden ayrı sınıflandır.",
          steps: [
            "Ultrasonun ses dalgası maddesel ortamda, radarın sinyali elektromanyetik dalga olarak yayılır.",
            "Hareketli hedefin yansıttığı dalgada alınan frekans değişimi hıza ilişkin bilgi sağlayabilir.",
            "D ortak ölçüm ilkesini korur; iki dalga türünü özdeşleştirmez.",
          ],
          optionReasons: [
            "Mekanik ve elektromanyetik adları yer değiştirmiştir.",
            "Radar dalgası boşlukta da yayılabilir; sesin ortam gereksinimi farklıdır.",
            "İki yöntemin de dalga türünü yanlış sınırlar.",
            "Doğru: farklı dalga türleriyle ortak Doppler ilkesi kullanılabilir.",
            "Hareketli hedefin doğrultu bileşeni frekansı etkileyebilir.",
          ],
          commonError:
            "Ortak Doppler adından bütün dalgaların aynı tür olduğunu çıkarma.",
          check:
            "Her cihaz için dalga türü ve ölçülen frekans farkını iki ayrı satırda yaz.",
        },
      },
      {
        prompt:
          "Durgun havada 340 m/s ses hızı ve 500 Hz kaynak var. A düzeninde kaynak 34 m/s ile duran alıcıya yaklaşıyor. B’de kaynak duruyor, alıcı 34 m/s ile yaklaşıyor. Bir boyutlu tam hesap için hangi ifade doğrudur?",
        options: [
          "A 450 Hz; B 500 Hz’dir",
          "İkisinde de sesin havaya göre hızı 374 m/s olur",
          "A yaklaşık 555,6 Hz; B 550 Hz’dir",
          "A 500 Hz; B 555,6 Hz’dir",
          "A ve B tam olarak eşittir; yalnız kapanma hızı önemlidir",
        ],
        answer: 2,
        hint: "İlkinde dalga boyunu, ikincisinde alıcının karşılaşma hızını değiştir.",
        explanation:
          "A için fA=500·340/(340−34)≈555,6 Hz. B için fB=500·(340+34)/340=550 Hz. İki kapanma hızı aynı olsa da iki mekanizma farklı olduğundan C seçeneğindeki eşit olmayan sonuçlar doğrudur.",
        guidance: {
          knowledge: [
            "Sesin ortam çerçevesi, kaynak ile alıcının hareketlerini tam formülde farklı yerlere koyar.",
          ],
          strategy:
            "İlkinde dalga boyunu, ikincisinde alıcının karşılaşma hızını değiştir.",
          steps: [
            "A için fA=500·340/(340−34)≈555,6 Hz.",
            "B için fB=500·(340+34)/340=550 Hz.",
            "İki kapanma hızı aynı olsa da iki mekanizma farklı olduğundan C seçeneğindeki eşit olmayan sonuçlar doğrudur.",
          ],
          optionReasons: [
            "Yaklaşma yönündeki iki frekansı düşürür veya etkisiz bırakır.",
            "Havaya göre ses hızı iki düzende de 340 m/s kalır.",
            "Doğru: kaynak ve alıcı tam hesapları farklıdır.",
            "Kaynak hareketini atlar; ikinciye yanlış payda uygular.",
            "Küçük hız yaklaşımını tam eşitlik sanır.",
          ],
          commonError:
            "Yalnız bağıl hızla ses Doppler hesabı yapıp ortam çerçevesini silme.",
          check:
            "Her bir düzende değişen büyüklüğü sözle açıkla: λ mı, tepe karşılaşma hızı mı?",
        },
      },
    ],
  },
  {
    id: "elektromanyetik-dalgalar",
    topic: "detail-395",
    title: "Elektromanyetik dalgalar: alan, tayf ve enerji",
    minutes: 75,
    objectives: [
      "Elektrik ve manyetik alan ile yayılma yönünü ilişkilendir",
      "Dalga boyu, frekans ve tek foton enerjisini hesapla",
      "Tayfı üretim, gözlem ve günlük kullanımlarla eşleştir",
    ],
    sections: [
      {
        title: "Mekanik dalgadan alan dalgasına",
        paragraphs: [
          "Ses bir maddesel ortamın sıkışma ve genişlemesiyle yayılır; elektromanyetik dalga ise elektrik ve manyetik alanın uzay ve zamanda değişmesiyle betimlenir. Bu alanların yayılabilmesi için hava, su veya başka bir maddesel taşıyıcı ortam zorunlu değildir.",
          "Güneş ışığının uzaydan Dünya’ya ulaşması, boşlukta yayılmanın günlük sonucudur. Bir radyo sinyalini antenle algılarken sinyalin kendisi ses dalgası değildir; alıcı elektronik sistem, taşınan bilgiyi daha sonra hoparlörle havadaki sese dönüştürebilir.",
        ],
      },
      {
        title: "Maxwell’in önerisi ve Hertz’in sınaması",
        paragraphs: [
          "Maxwell’in alan kuramı, ışık hızına eşit hızda yayılabilen elektromanyetik dalgaları öngördü. Böylece optik ile elektrik-manyetizma arasında ortak bir açıklama kuruldu. Öngörü ile deneysel gözlem aynı bilgi kaynağı değildir; birbirini sınar.",
          "Hertz ivmelendirilen yüklerle elektromanyetik dalga üretip alarak yansıma, kırılma ve girişim gibi davranışları gösterdi. Radyo dalgaları ile görünür ışığın aynı aileden olması, gözümüzün radyo frekansını doğrudan görebildiği anlamına gelmez.",
        ],
      },
      {
        title: "E, B ve ilerleme doğrultusunu kur",
        paragraphs: [
          "Boşlukta serbest bir düzlem elektromanyetik dalganın elektrik alanı E ve manyetik alanı B birbirine ve yayılma doğrultusuna diktir. Örneğin E o anda +y, B +z yönündeyse E×B sağ el kuralıyla +x yönünü verir.",
          "Alanlar birbirine doğru gidip çarpışan iki ayrı madde akışı değildir. Aynı dalganın birbiriyle ilişkili bileşenleridir; alanın bir noktadaki salınım yönü ile bütün desenin ilerleme yönünü ayrı okuduğunda 'enine' sözü somutlaşır.",
        ],
      },
      {
        title: "Eş faz ve alan büyüklükleri",
        paragraphs: [
          "İdeal boşluk düzlem dalgasında E ve B aynı fazdadır; biri sıfırdan geçerken diğeri de sıfırdan geçer, maksimumlarının zamanları aynıdır. Alan büyüklüklerinin oranı E₀/B₀=c olur. E volt/metre, B tesla ile ölçülür.",
          "Çizimde iki eğrinin aynı yüksekliğe sahip olması, iki alanın sayısal değerinin eşit olduğunu göstermez; birimleri farklıdır. Etkileşimde E/E₀ ve B/B₀ normalize edilir. Örneğin E₀=120 V/m için B₀ yaklaşık 4,00·10⁻⁷ T olur.",
        ],
      },
      {
        title: "Hız, frekans ve dalga boyu",
        paragraphs: [
          "Bütün elektromanyetik dalgalar boşlukta c hızıyla yayılır. Dalganın dalga boyu λ ile frekansı f arasında c=λf bağıntısı vardır; frekansı büyük bir gama fotonu, radyo dalgasını boşlukta sollayarak gitmez. Farklı olan dalga boyu ve enerji ölçeğidir.",
          "Hesap sorularında çoğu kez c=3·10⁸ m/s yaklaşık değeri verilir. Etkileşimde SI tanımındaki 299792458 m/s kullanılır. İki sonucun son basamakları bu nedenle farklı olabilir; formül ve birim düzeni aynı olmalıdır.",
        ],
      },
      {
        title: "Ortam sınırında korunanı belirle",
        paragraphs: [
          "Aynı kaynağın dalgası durağan bir saydam ortam sınırından geçince frekansı değişmez. Faz hızı v=c/n ile, ortam içi dalga boyu λ=λ₀/n ile değişir. Ortam indisi dalga boyuna bağlıysa farklı renklerin hızları aynı olmayabilir.",
          "Bu sonuç kırılma ve girişim hesaplarına bağlanır. Frekans korunurken hızın azalması, her fotonun enerjisinin otomatik olarak azalması değildir. Soğurulan, yansıtılan ve geçen enerji akıları için ayrıca maddeyle etkileşim ve sınır koşulları incelenir.",
        ],
      },
      {
        title: "Tek foton enerjisi ile toplam enerji",
        paragraphs: [
          "Tek fotonun enerjisi E=hf=hc/λ₀ ile verilir. Frekans iki katına çıkarsa bir fotonun enerjisi iki katına çıkar. Aynı frekansta iki kat sayıda foton gelirse toplam aktarılan enerji iki kat olabilir; tek fotonun enerjisi değişmez.",
          "Bir lambanın gücü birim zamanda taşınan toplam enerjidir. Sabit güçte daha yüksek enerjili fotonlardan saniyede daha az sayıda gelmesi mümkündür. 'Daha yüksek frekanslı ışık mutlaka daha parlaktır' çıkarımı, foton başına enerji ile toplam akışı karıştırır.",
        ],
      },
      {
        title: "Momentum ve ışığın maddeyle etkileşimi",
        paragraphs: [
          "Boşlukta bir fotonun momentum büyüklüğü p=E/c=h/λ₀ ile ilişkilidir. Dalga bir yüzeyde soğurulduğunda enerji ve momentum aktarabilir. Işıma basıncı bu momentum aktarımının çok sayıda foton üzerinden ortaya çıkan sonucudur.",
          "Işığın yüksüz olması, statik elektrik veya manyetik alanda yüklü tanecik gibi Lorentz kuvvetiyle sapmaması anlamına gelir. Fakat soğurma, saçılma, kırılma ve başka sinyallerle girişim görülebilir; yüksüzlük, kablosuz bağlantının hiç etkilenmeyeceği garantisi değildir.",
        ],
      },
      {
        title: "Spektrumu ezber sırası yerine ilişkiyle kur",
        paragraphs: [
          "Uzun dalga boyundan kısaya doğru radyo, mikrodalga, kızılötesi, görünür, morötesi, X ve gama bölgeleri sıralanır. Bu yönde boşluktaki dalga boyu küçülürken frekans ve tek foton enerjisi artar; boşluk hızı aynı kalır.",
          "Bölge sınırları her kullanımda keskin ve tek bir sayıya bağlı olmayabilir; mikrodalgalar geniş anlamda radyo bölgesinin bir alt grubudur. X ve gama adlarında oluşum süreci de önemlidir. Sıralama sorusunda hangi büyüklüğün arttığını önce belirle.",
        ],
      },
      {
        title: "Radyo ve mikrodalgada bilgi taşımak",
        paragraphs: [
          "Radyo ve televizyon yayınlarında antenlerdeki yüklerin değişen hareketi elektromanyetik sinyal üretir. Alıcı anten bu alana tepki verir. Taşıyıcının genliği, frekansı veya fazı gibi özellikler değiştirilerek bilgi sinyale kodlanabilir; sinyalin kendisi konuşma sesi değildir.",
          "Mikrodalgalar uydu iletişimi ve radarda kullanılır. Fırında malzemenin elektromanyetik enerjiyi soğurması, yiyecekte ısınma oluşturur. Aynı adı taşıyan bütün frekansların her maddeden aynı oranda geçmesi veya hiç soğurulmaması beklenmez.",
        ],
      },
      {
        title: "Kızılötesi ve görünür bölgenin rolleri",
        paragraphs: [
          "Kızılötesi, görünür kırmızının daha uzun dalga boylu tarafındadır; uzaktan kumanda ve termal görüntüleme gibi kullanımları vardır. Sıcaklıkla ilgili ışıma bir dalga boyu dağılımına sahiptir. Her sıcak cismin yalnız kızılötesi yaydığı söylenemez.",
          "Görünür bölgede kırmızıdan mora doğru dalga boyu genel olarak azalır ve frekans artar. Termal kameranın ekran renkleri bir görselleştirme paletidir; ölçülen kızılötesi sinyalin kendisinin insan gözüne kırmızı veya mavi görünmesi gerektiği anlamına gelmez.",
        ],
      },
      {
        title: "Morötesi, X ve gama kullanımını mekanizmayla bağla",
        paragraphs: [
          "Morötesi ışınım sterilizasyon ve güvenlik işaretlerinin görünürleşmesi gibi alanlarda kullanılabilir; enerji aktarımı canlı dokuyu da etkileyebilir. X ışınları hızlı elektronların yavaşlatılması veya atomun iç enerji düzeyleri arasındaki geçişlerle üretilebilir.",
          "Gama ışınları nükleer geçişlerle ilişkilidir; görüntüleme, inceleme ve tedavide kontrollü kullanım alanları vardır. Bir uygulamanın yararlı olması, enerjisinin ve dozunun önemsiz olduğu anlamına gelmez. Her bölgeyi yalnız 'zararlı' veya yalnız 'yararlı' diye etiketlemek yerine etkileşimi açıkla.",
        ],
      },
      {
        title: "Soğurma, geçirme ve yansımayı ayır",
        paragraphs: [
          "Bir yüzeye gelen elektromanyetik enerjinin bir bölümü geçebilir, bir bölümü geri yansıyabilir, bir bölümü soğurulabilir. Soğurulan enerji maddenin iç enerjisine veya başka bir enerji biçimine dönüşebilir. Ortam ve dalga boyu, bu payların büyüklüğünü etkiler.",
          "Bu yüzden görünür ışığı geçiren bir pencerenin X veya kızılötesi için de aynı davranması gerekmez. 'Elektromanyetik' ortak aile adıdır; bütün maddelerle özdeş etkileşim garantisi değildir. Bir geçirgenlik grafiğinde önce hangi dalga boyunun verildiğini oku.",
        ],
      },
      {
        title: "Kutuplanmanın enine dalgayla ilişkisi",
        paragraphs: [
          "Doğrusal kutuplanmış dalgada elektrik alanın salınım doğrultusu belirlenmiştir. Uygun bir polarizör belirli doğrultu bileşenini geçirir. İki doğrusal polarizörün eksenleri dikleştirildiğinde ideal koşullarda geçiş çok azalır; bu, enine doğanın bir sonucudur.",
          "Sesin durgun akışkandaki sıradan boyuna dalgası aynı biçimde doğrusal kutuplanmaz. Etkileşimde kutuplanma açısını değiştirmek E ve B vektörlerini birlikte döndürür; E×B’nin yayılma yönü buna uygun kalır. Açıyı değiştirirken enerji veya frekansın sırf dönme nedeniyle değiştiğini varsayma.",
        ],
      },
      {
        title: "Çok dalga boylu gökyüzünü oku",
        paragraphs: [
          "Bir gökcisminin görünür, radyo, kızılötesi ve X görüntüleri farklı süreçler hakkında bilgi taşır. Radyo teleskopları ve görünür ışık teleskopları aynı elektromanyetik ailenin farklı bölümlerini toplar; tek görüntünün veremediği ayrıntılar birlikte değerlendirilebilir.",
          "Hubble görünür ve yakın bölgelerde, James Webb ağırlıkla kızılötesinde, Chandra X ve Fermi gama gözlemlerinde kullanılır. Bunlar mutlak tek bir dalga boyuyla sınırlı birer renk kutusu değildir. Atmosferin geçirmediği bölgelerde uzay gözlemi ayrıca önemlidir.",
        ],
      },
      {
        title: "Alan karesinden akışı yorumla",
        paragraphs: [
          "Alanların işareti bir yarım periyotta birlikte döner. E ve B’nin ikisi birden ters döndüğünde E×B aynı yayılma yönünü gösterir; dalga her yarım titreşimde geri dönmez. Seçili anda alanlar sıfırsa anlık enerji akışı da sıfır olabilir.",
          "Bu durum, dalganın frekansının veya genel ilerleme doğrultusunun ortadan kalktığı anlamına gelmez. Modelde fazı 0°,90°,180° seçerek vektörleri, normalize alanları ve HTML bileşenlerini karşılaştır; yalnız renk değişimine bakarak karar verme.",
        ],
      },
    ],
    examples: [
      {
        title: "Mikrodalganın frekansı",
        prompt: "Boşluk dalga boyu 3 cm, c=3·10⁸m/s. Frekansı hesapla.",
        strategy: "Santimetreyi metreye dönüştür.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "3 cm=3·10⁻²m.",
          },
          {
            label: "İşlemi yap",
            explanation: "f=c/λ=(3·10⁸)/(3·10⁻²)=10¹⁰Hz.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Bu 10 GHz’dir; görünür ışıkla aynı boşluk hızına sahip olmasına rağmen frekansı çok daha düşüktür.",
          },
        ],
        answer: "10¹⁰Hz=10 GHz",
        check: "λf=(0,03)·10¹⁰=3·10⁸.",
        pitfall: "3 cm’yi 3 m alıp 100 kat küçük frekans üretme.",
      },
      {
        title: "Alan oranını yorumlamak",
        prompt: "Boşluk düzlem dalgasında E₀=30 V/m, c=3·10⁸m/s. B₀ nedir?",
        strategy: "B₀=E₀/c kur.",
        steps: [
          {
            label: "Koşulu kur",
            explanation:
              "Alanların aynı fazda olması eşit sayısal büyüklükte olmalarını gerektirmez.",
          },
          {
            label: "İşlemi yap",
            explanation: "B₀=30/(3·10⁸)=1·10⁻⁷T.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "E/B=3·10⁸m/s olur; birimler oranı ışık hızına karşılık gelir.",
          },
        ],
        answer: "10⁻⁷T",
        check: "Büyüklükleri geri çarparak 10⁻⁷T·3·10⁸m/s=30 V/m bul.",
        pitfall: "V/m ile tesla sayılarını doğrudan eşitleme.",
      },
      {
        title: "Vektörlerin sırasını korumak",
        prompt: "Bir anda E=−z ve B=+y yönünde; yayılma E×B ile belirleniyor.",
        strategy: "Önce z×y=-x ilişkisini kur.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "Sağ el çarpımında z×y=−x olur.",
          },
          {
            label: "İşlemi yap",
            explanation: "E’nin eksi işaretiyle(−z)×y=+x.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Yayılma+x; bu yön hem E’ye hem B’ye diktir. İki alanın sıra değişimi sonucu ters yapardı.",
          },
        ],
        answer: "+x yönü",
        check: "B×E hesaplasaydın−x bulacağını kontrol et; fiziksel sıraE×B.",
        pitfall:
          "E ve B yönlerini sağ el kuralına yerleştirirken sırayı atlama.",
      },
      {
        title: "Foton enerjisinin ölçeği",
        prompt:
          "f=10¹⁵Hz ve bu örnekte h=4,14·10⁻¹⁵eV·s. Bir fotonun enerjisini bul.",
        strategy: "eV birimli Planck sabitini doğrudan kullan.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "E=hf bağıntısı tek foton için yazılır.",
          },
          {
            label: "İşlemi yap",
            explanation: "E=(4,14·10⁻¹⁵)·10¹⁵=4,14 eV.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Bu toplam demet gücü değil, her bir fotonun taşıdığı enerji ölçeğidir.",
          },
        ],
        answer: "4,14 eV",
        check: "Frekans yarıya inse foton enerjisi 2,07 eV olurdu.",
        pitfall:
          "eV·s sabitini kullanıp sonucu bir daha joule diye etiketleme.",
      },
      {
        title: "Eşit güçte foton sayısı",
        prompt:
          "İki demetin güçleri aynı; ikinci demetin frekansı birincinin üç katı. Foton sayısı akış oranını bul.",
        strategy: "P=N·hf eşitliğini kullan.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "İkinci fotonun enerjisi birincinin üç katıdır.",
          },
          {
            label: "İşlemi yap",
            explanation: "Eşit güç için N₂·3 E₁=N₁·E₁ gerekir.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "N₂/N₁=1/3; daha yüksek foton enerjisi, aynı güçte daha az fotonla taşınabilir.",
          },
        ],
        answer: "1/3",
        check: "İki demetin güç kontrolü:(N₁/3)·(3 E₁)=N₁E₁, toplam akış aynı.",
        pitfall:
          "Güç eşitken enerji ve foton sayısının ikisini de üç kat yapma.",
      },
      {
        title: "Ortamdaλ ve v birlikte değişir",
        prompt:
          "λ₀=800 nm olan dalga n=2 durağan ortama geçiyor; c=3·10⁸m/s. v,λ, f nedir?",
        strategy:
          "Önce boşluk frekansını bul; sonra ortam hızını ve dalga boyunu değiştir.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "f=3·10⁸/(800·10⁻⁹)=3,75·10¹⁴Hz.",
          },
          {
            label: "İşlemi yap",
            explanation: "v=c/2=1,5·10⁸m/s; λ=800/2=400 nm.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "v/λ aynı 3,75·10¹⁴Hz verir; durağan sınırda frekans korunmuştur.",
          },
        ],
        answer: "v=1,5·10⁸m/s; λ=400 nm; f=3,75·10¹⁴Hz.",
        check: "400·10⁻⁹·3,75·10¹⁴=1,5·10⁸.",
        pitfall: "Hemλ’yı n’ye bölüp hem frekansı yeniden n ile çarpma.",
      },
    ],
    recall: [
      {
        prompt: "Bir boşluk düzlem dalgasında yönü hangi vektör sırası verir?",
        answer: "E×B; iki alanın sırasını ters çevirmek yönü ters çevirir.",
      },
      {
        prompt: "E veB aynı anda ters dönerse yayılma neden geri dönmez?",
        answer:
          "İki eksi işaret çarpımda birbirini götürür; E×B aynı yönde kalır.",
      },
      {
        prompt: "Aynı güçte frekans artarsa foton sayısı ne olur?",
        answer:
          "E=hf arttığı için aynıP=N·E değerini taşımak üzere saniyedeki foton sayısı azalır.",
      },
      {
        prompt: "Tayfta dalga boyu azalırken hangi ortak nicelik değişmez?",
        answer:
          "Boşluk yayılma hızıc; frekans ve tek foton enerjisi artabilir.",
      },
      {
        prompt: "Polarizasyon hangi yönü seçer?",
        answer:
          "Yayılmaya dik düzlemde elektrik alanın salınım doğrultusu bileşenini.",
      },
      {
        prompt: "Termal kameranın kırmızı rengi fiziksel sinyalin rengi midir?",
        answer:
          "Zorunlu değildir; kızılötesi ölçümün sonradan atanmış görünür ekran paleti olabilir.",
      },
    ],
    source:
      "MEBİ AYT Fizik fiziksel PDF 202–209 ile Dersler Cepte 12 Fizik 6. sayı PDF 10–12 okunarak yazılmış özgün anlatım. Model yalnız boşluk düzlem dalgasıdır; kesin SI c, h, e değerlerini kullanır. Spektrum örnekleri gerçek cihaz ölçümü değildir.",
    items: [
      {
        prompt:
          "Boşlukta dalga boyu 600 nm olan elektromanyetik dalganın frekansı kaç Hz? Bu soruda c=3·10⁸ m/s alınsın.",
        options: ["5·10¹¹", "2·10¹²", "5·10¹³", "5·10¹⁴", "1,8·10¹⁷"],
        answer: 3,
        hint: "600 nm değerini metreye çevirmeden bölme yapma.",
        explanation:
          "600 nm=6·10⁻⁷ m yazılır. f=(3·10⁸)/(6·10⁻⁷)=0,5·10¹⁵ Hz bulunur. Bu değer 5·10¹⁴ Hz olarak yazılır; D doğrudur.",
        guidance: {
          knowledge: ["Boşlukta λf=c olduğundan f=c/λ."],
          strategy: "600 nm değerini metreye çevirmeden bölme yapma.",
          steps: [
            "600 nm=6·10⁻⁷ m yazılır.",
            "f=(3·10⁸)/(6·10⁻⁷)=0,5·10¹⁵ Hz bulunur.",
            "Bu değer 5·10¹⁴ Hz olarak yazılır; D doğrudur.",
          ],
          optionReasons: [
            "Nanometre dönüşümünde üç basamak eksik kalmıştır.",
            "Verilen λ ile c/λ oranına uymaz.",
            "Bir onluk basamak eksik bırakılmıştır.",
            "Doğru:5·10¹⁴Hz.",
            "λ ile c çarpılmış veya üsler yanlış kullanılmıştır.",
          ],
          commonError: "600 nm yerine 600 metre koyma.",
          check: "(6·10⁻⁷)·(5·10¹⁴)=3·10⁸ m/s ile geri kontrol yap.",
        },
      },
      {
        prompt:
          "Boşlukta bir düzlem elektromanyetik dalganın elektrik alan genliği 90 V/m. c=3·10⁸ m/s için manyetik alan genliği kaç tesladır?",
        options: ["90", "3·10⁻⁷", "3·10⁷", "2,7·10¹⁰", "3·10⁻⁹"],
        answer: 1,
        hint: "Manyetik alanı bulmak için elektrik alanı c’ye böl.",
        explanation:
          "B₀=E₀/c bağıntısı kurulur. 90/(3·10⁸)=30·10⁻⁸=3·10⁻⁷ T hesaplanır. Alanların birimleri farklıdır; aynı grafikteki yüksekliği eşit tesla ve V/m sayıları olarak okuma.",
        guidance: {
          knowledge: ["Boşluk düzlem dalgasında E₀=c·B₀."],
          strategy: "Manyetik alanı bulmak için elektrik alanı c’ye böl.",
          steps: [
            "B₀=E₀/c bağıntısı kurulur.",
            "90/(3·10⁸)=30·10⁻⁸=3·10⁻⁷ T hesaplanır.",
            "Alanların birimleri farklıdır; aynı grafikteki yüksekliği eşit tesla ve V/m sayıları olarak okuma.",
          ],
          optionReasons: [
            "Elektrik ve manyetik alanlar sayısal olarak eşitlenemez.",
            "Doğru:90/c=3·10⁻⁷T.",
            "Negatif üs işareti kaybedilmiştir.",
            "c ile bölmek yerine çarpılmıştır.",
            "Hızın üssü iki basamak fazla alınmıştır.",
          ],
          commonError: "E ve B’yi aynı birimde iki eş sayı sanma.",
          check: "3·10⁸ ile 3·10⁻⁷ çarpımının 90 V/m verdiğini göster.",
        },
      },
      {
        prompt:
          "Bir boşluk düzlem dalgasında seçili anda E alanı+y, B alanı−z yönünde. E×B yayılma yönünü veriyorsa dalga hangi yönde ilerler?",
        options: ["+z", "+x", "+y", "−x", "−y"],
        answer: 3,
        hint: "Önce y×z yönünü bul, B’nin eksi işaretini en sonda uygula.",
        explanation:
          "+y ile+z için E×B yönü+x olur. B bu soruda−z olduğu için çarpımın işareti ters çevrilir. Yayılma−x yönündedir; D seçeneği doğrudur.",
        guidance: {
          knowledge: [
            "Sağ el kuralında y×z=x; vektörlerden birinin işareti değişirse çarpım yönü ters döner.",
          ],
          strategy:
            "Önce y×z yönünü bul, B’nin eksi işaretini en sonda uygula.",
          steps: [
            "+y ile+z için E×B yönü+x olur.",
            "B bu soruda−z olduğu için çarpımın işareti ters çevrilir.",
            "Yayılma−x yönündedir; D seçeneği doğrudur.",
          ],
          optionReasons: [
            "Manyetik alan eksenini yayılma yönü sanır.",
            "B’nin eksi yönünü göz ardı eder.",
            "Elektrik alan yönünü yayılma yönü sanır.",
            "Doğru:y×(−z)=−x.",
            "Elektrik alanın ters yönü de alanlara dik değildir.",
          ],
          commonError:
            "Vektörel çarpımı B×E sırasıyla yapma; sıra sonucu ters çevirir.",
          check: "Bulduğun yönün hem E’ye hem B’ye dik olduğunu kontrol et.",
        },
      },
      {
        prompt:
          "Bir düzlem dalgada ilk anda E=+y ve B=+z iken yayılma+x. Yarım periyot sonra E=−y ve B=−z oluyor. Yeni yayılma yönü nedir?",
        options: ["+y", "Sıfır; dalga yok olur", "+x", "−x", "−z"],
        answer: 2,
        hint: "İki eksi işaretin çarpımını koru.",
        explanation:
          "İkinci anda E×B=(−y)×(−z) yazılır. İki eksi işaret birbirini götürür ve y×z=x kalır. Alanlar salınırken dalga her yarım periyotta geri dönmez; yön+x’tir.",
        guidance: {
          knowledge: [
            "E ve B birlikte işaret değiştirirse vektörel çarpımları aynı yönde kalır.",
          ],
          strategy: "İki eksi işaretin çarpımını koru.",
          steps: [
            "İkinci anda E×B=(−y)×(−z) yazılır.",
            "İki eksi işaret birbirini götürür ve y×z=x kalır.",
            "Alanlar salınırken dalga her yarım periyotta geri dönmez; yön+x’tir.",
          ],
          optionReasons: [
            "Alan salınım yönüyle yayılma yönü karıştırılır.",
            "Alanların ters dönmesi dalgayı yok etmez.",
            "Doğru:iki alan birlikte ters dönerken enerji akış yönü korunur.",
            "Yalnız bir alanın ters döndüğü varsayılmıştır.",
            "B ekseni yayılma yönü değildir.",
          ],
          commonError:
            "E’nin işareti değişince dalganın mutlaka geriye gittiğini varsayma.",
          check:
            "İki alanın çarpımındaki işaret çarpımını(−1)·(−1)=+1 olarak kontrol et.",
        },
      },
      {
        prompt:
          "İdeal boşluk düzlem dalgasında elektrik ve manyetik alanlar aynı fazdadır. Seçili bir noktada E o anda sıfırdan geçerken B için ne söylenir?",
        options: [
          "Mutlaka pozitif maksimumdur",
          "Mutlaka negatif maksimumdur",
          "Daima sıfır olmadan sabit kalır",
          "Tek başına her zaman dalgayı durdurur",
          "Aynı anda sıfırdan geçer",
        ],
        answer: 4,
        hint: "Anlık alanı, dalganın varlığı veya genel yönüyle karıştırma.",
        explanation:
          "E=E₀cosφ ve B=B₀cosφ aynı faz çarpanını taşır. E sıfırken cosφ=0 olur; B de aynı anda sıfırdır. Bu anlık durum, dalganın bütünüyle yok olduğu anlamına gelmez.",
        guidance: {
          knowledge: [
            "Aynı fazlı E ve B, boşluk düzlem dalgasında aynı zamanlarda sıfır olur.",
          ],
          strategy:
            "Anlık alanı, dalganın varlığı veya genel yönüyle karıştırma.",
          steps: [
            "E=E₀cosφ ve B=B₀cosφ aynı faz çarpanını taşır.",
            "E sıfırken cosφ=0 olur; B de aynı anda sıfırdır.",
            "Bu anlık durum, dalganın bütünüyle yok olduğu anlamına gelmez.",
          ],
          optionReasons: [
            "Bu, çeyrek periyot faz farkı varsayar.",
            "Yine verilen eş faz koşuluyla çelişir.",
            "Sinüzoidal eş fazlı dalgada B sabit değildir.",
            "Bir noktadaki sıfır anı bütün yayılmayı durdurmaz.",
            "Doğru:aynı faz çarpanı ikisini birlikte sıfırlar.",
          ],
          commonError:
            "Bir noktadaki anlık sıfırı bütün uzaydaki alanın yokluğu sanma.",
          check:
            "Bir çeyrek periyot önce veya sonra iki alanın birlikte maksimum büyüklüğe ulaştığını düşün.",
        },
      },
      {
        prompt:
          "Radyo ve X ışınları aynı boşlukta yayılıyor. X ışınının dalga boyu daha kısa olduğuna göre doğru karşılaştırma hangisidir?",
        options: [
          "Radyo dalgası boşlukta yayılamaz",
          "Hızları aynı; X frekansı ve tek foton enerjisi daha büyüktür",
          "X daha hızlı; foton enerjileri aynıdır",
          "Hızları aynı; X frekansı daha küçüktür",
          "X daha yavaş ve daha düşük frekanslıdır",
        ],
        answer: 1,
        hint: "Hız, frekans ve tek foton enerjisini üç ayrı satırda karşılaştır.",
        explanation:
          "İki dalga da boşlukta c hızıyla yayılır. X’in λ değeri küçük olduğundan f değeri daha büyüktür. E=hf ile X’in bir fotonunun enerjisi daha büyüktür; toplam güç hakkında veri yoktur.",
        guidance: {
          knowledge: [
            "Boşlukta bütün elektromanyetik dalgalar c ile yayılır; f=c/λ ve E=hf.",
          ],
          strategy:
            "Hız, frekans ve tek foton enerjisini üç ayrı satırda karşılaştır.",
          steps: [
            "İki dalga da boşlukta c hızıyla yayılır.",
            "X’in λ değeri küçük olduğundan f değeri daha büyüktür.",
            "E=hf ile X’in bir fotonunun enerjisi daha büyüktür; toplam güç hakkında veri yoktur.",
          ],
          optionReasons: [
            "Radyo elektromanyetiktir ve boşlukta yayılır.",
            "Doğru:aynı hız, daha büyük frekans ve foton enerjisi.",
            "Boşluk hızları farklı değildir; enerji de frekansa bağlıdır.",
            "Daha kısaλ için frekansın azaldığını söyler.",
            "Dalga boyu ile hız veya frekans ilişkisi ters kurulmuştur.",
          ],
          commonError:
            "Yüksek frekanslı dalganın boşlukta daha hızlı gittiğini düşünme.",
          check: "Her biri içinλf=c çarpımını koruyup enerjiyi ayrıca kıyasla.",
        },
      },
      {
        prompt:
          "İki tek renkli ışık demetinin toplam güçleri eşit. B demetinin frekansı A’nın iki katı. Foton başına enerji EB/EA ve saniyedeki foton sayısı NB/NA hangi sıradadır?",
        options: ["2 ve 1/2", "2 ve 2", "1/2 ve 2", "1/2 ve 1/2", "1 ve 2"],
        answer: 0,
        hint: "Önce tek foton oranını bul, eşit güç için sayı oranını ters çevir.",
        explanation:
          "fB=2 fA olduğundan EB=2 EA olur. PA=NAEA ve PB=NBEB eşittir. NB=NA/2 olmalıdır; oranlar 2 ve 1/2.",
        guidance: {
          knowledge: [
            "Her fotonun enerjisi hf; toplam güç saniyedeki foton sayısı ile foton enerjisinin çarpımıdır.",
          ],
          strategy:
            "Önce tek foton oranını bul, eşit güç için sayı oranını ters çevir.",
          steps: [
            "fB=2 fA olduğundan EB=2 EA olur.",
            "PA=NAEA ve PB=NBEB eşittir.",
            "NB=NA/2 olmalıdır; oranlar 2 ve 1/2.",
          ],
          optionReasons: [
            "Doğru:iki kat enerji, yarı sayıda foton eşit gücü korur.",
            "Hem enerji hem sayı iki kat olsa güç dört kat olurdu.",
            "Enerji oranı ters yazılmıştır.",
            "Enerji ve sayı birlikte yarılanırsa güç dörtte bir olur.",
            "Enerjinin frekansla değişmesini atlar.",
          ],
          commonError:
            "Eşit gücün eşit foton sayısı anlamına geldiğini varsayma.",
          check: "NBEB=(NA/2)·(2 EA)=NAEA çarpımını doğrula.",
        },
      },
      {
        prompt:
          "Boşluk dalga boyu 600 nm olan ışık, durağan saydam n=1,5 ortama geçiyor. Soğurma ihmal ve kaynağın frekansı sabit. Ortam içindeki dalga boyu ve frekans nasıl değişir?",
        options: [
          "400 nm, frekans 1,5 katına çıkar",
          "600 nm, frekans azalır",
          "900 nm, frekans artar",
          "400 nm, frekans aynı",
          "900 nm, frekans aynı",
        ],
        answer: 3,
        hint: "Ortam hız değişimini frekans değişimi sanmadanλ hesabına taşı.",
        explanation:
          "Hız c/1,5 olur; frekans kaynak düzeniyle aynı kalır. λ=600/1,5=400 nm bulunur. D doğru ikiliyi verir; hf de frekans korunurken sırf ortam değişti diye azalmaz.",
        guidance: {
          knowledge: ["Durağan sınırda frekans korunur; v=c/n veλ=λ₀/n."],
          strategy:
            "Ortam hız değişimini frekans değişimi sanmadanλ hesabına taşı.",
          steps: [
            "Hız c/1,5 olur; frekans kaynak düzeniyle aynı kalır.",
            "λ=600/1,5=400 nm bulunur.",
            "D doğru ikiliyi verir; hf de frekans korunurken sırf ortam değişti diye azalmaz.",
          ],
          optionReasons: [
            "λ doğru fakat durağan sınırda frekans artmaz.",
            "λ değişimini ve frekans korunumunu ikisini de atlar.",
            "λ’yı n ile çarpar ve frekansı gereksiz değiştirir.",
            "Doğru:400 nm ve aynı frekans.",
            "Frekans korunsa daλ n ile ters orantılıdır.",
          ],
          commonError: "Hız azalınca hemfhemλ’yı aynı anda n’ye bölme.",
          check: "v/λ=(c/1,5)/(λ₀/1,5)=c/λ₀ eşitliğini kontrol et.",
        },
      },
      {
        prompt:
          "Doğrusal polarizörlerle ışığın belirli elektrik alan yönlerini seçmek mümkün. Bu gözlem ışığın hangi özelliğiyle doğrudan ilişkilidir?",
        options: [
          "Her fotonun elektrik yükü taşıması",
          "Maddesel ortam gerektirmesi",
          "Enine alan salınımı göstermesi",
          "Yalnız boyuna olması",
          "Boşlukta durması",
        ],
        answer: 2,
        hint: "Salınım yönü seçiminin enine dalga geometrisiyle bağını kur.",
        explanation:
          "Düzlem ışıkta elektrik alan, yayılma doğrultusuna diktir. Polarizör, bu dik düzlemdeki uygun doğrultu bileşenini seçebilir. Bu nedenle kutuplanma enine doğayla ilişkilidir; fotonun yük taşıması gerekmez.",
        guidance: {
          knowledge: [
            "Kutuplanma, elektrik alanın yayılma doğrultusuna dik yöndeki salınım düzenidir.",
          ],
          strategy:
            "Salınım yönü seçiminin enine dalga geometrisiyle bağını kur.",
          steps: [
            "Düzlem ışıkta elektrik alan, yayılma doğrultusuna diktir.",
            "Polarizör, bu dik düzlemdeki uygun doğrultu bileşenini seçebilir.",
            "Bu nedenle kutuplanma enine doğayla ilişkilidir; fotonun yük taşıması gerekmez.",
          ],
          optionReasons: [
            "Fotonlar elektriksel olarak yüksüzdür.",
            "Işık boşlukta da kutuplanmış biçimde yayılabilir.",
            "Doğru:kutuplanma enine alan yönleriyle ilgilidir.",
            "Boyuna dalganın aynı doğrusal polarizasyon geometrisi yoktur.",
            "Polarizör, boşlukta ışığın genel hızını sıfıra indirmez.",
          ],
          commonError:
            "Sesin akışkandaki sıradan boyuna dalgasını aynı tür polarizörle seçilecekmiş gibi düşünme.",
          check:
            "E, B ve yayılma doğrultusunu birbirine dik çizip polarizör eksenini E düzleminde göster.",
        },
      },
      {
        prompt:
          "Hızlandırılmış elektronların metale çarpıp yavaşlamasıyla üretilen ışınlar ile uyarılmış atom çekirdeğinin geçişinde çıkan ışınlar sırasıyla hangi adlarla ilişkilidir?",
        options: [
          "Kızılötesi ve radyo",
          "Ses ve X",
          "Gama ve mikrodalga",
          "Radyo ve görünür",
          "X ve gama",
        ],
        answer: 4,
        hint: "Işımanın üretildiği atomik ya da çekirdeksel süreci sınıflandır.",
        explanation:
          "İlk süreç metalde elektronların yavaşlamasıdır; X ışını üretiminin bir yoludur. İkinci süreç çekirdeğin enerji geçişidir; gama ışınıyla ilişkilidir. E doğru sırayı korur; yalnız dalga boyuna bakarak bütün kökenleri özdeşleştirmez.",
        guidance: {
          knowledge: [
            "X ışınları hızlı elektronların yavaşlaması veya iç kabuk geçişleriyle; gama ışınları nükleer geçişlerle ilişkilidir.",
          ],
          strategy:
            "Işımanın üretildiği atomik ya da çekirdeksel süreci sınıflandır.",
          steps: [
            "İlk süreç metalde elektronların yavaşlamasıdır; X ışını üretiminin bir yoludur.",
            "İkinci süreç çekirdeğin enerji geçişidir; gama ışınıyla ilişkilidir.",
            "E doğru sırayı korur; yalnız dalga boyuna bakarak bütün kökenleri özdeşleştirmez.",
          ],
          optionReasons: [
            "Kızılötesi veya radyo adı bu iki sürecin belirtilen sınıflaması değildir.",
            "İlk ışın mekanik ses değildir.",
            "İki oluşum süreci yer değiştirilmiş veya yanlış gruplandırılmıştır.",
            "Verilen yüksek enerji üretim süreçlerinin sınıfına uymaz.",
            "Doğru:elektronik yavaşlama X, nükleer geçiş gama.",
          ],
          commonError:
            "X ve gamayı yalnız ezberlenmiş bir sert dalga boyu sınırıyla, oluşum sürecini okumadan ayırma.",
          check:
            "İlk süreçte elektronik, ikincide çekirdeksel enerji düzeninin değiştiğini işaretle.",
        },
      },
      {
        prompt:
          "Termal kameranın ekranında sıcak bölge kırmızı, soğuk bölge mavi gösteriliyor. Bu gösterimden hangi çıkarım uygundur?",
        options: [
          "Ekran rengi bir palettir; kızılötesi ölçüm doğrudan gözle görülen renk değildir",
          "Mavi gösterilen cisimler enerji yayamaz",
          "Bütün cisimler yalnız tek bir kızılötesi dalga boyu yayar",
          "Kamera sıcaklığı mutlaka görünür tayfıyla tek başına belirler",
          "Ölçülen kızılötesi sinyalin kendisi zorunlu kırmızı görünür ışıktır",
        ],
        answer: 0,
        hint: "Ölçülen fiziksel dalgayla cihazın sonradan verdiği ekran rengini ayır.",
        explanation:
          "Kamera kızılötesi bölgedeki sinyali algılayabilir; insan gözü bu sinyali doğrudan görmez. Yazılım ölçüm değerlerine kırmızı, mavi gibi ekran renkleri atar. A bu temsili açıklar; palet değiştirmek ölçülen dalgayı başka fiziksel bölgeye dönüştürmez.",
        guidance: {
          knowledge: [
            "Termal görüntüde görünür ekran paleti, kızılötesi ölçümün temsilidir.",
          ],
          strategy:
            "Ölçülen fiziksel dalgayla cihazın sonradan verdiği ekran rengini ayır.",
          steps: [
            "Kamera kızılötesi bölgedeki sinyali algılayabilir; insan gözü bu sinyali doğrudan görmez.",
            "Yazılım ölçüm değerlerine kırmızı, mavi gibi ekran renkleri atar.",
            "A bu temsili açıklar; palet değiştirmek ölçülen dalgayı başka fiziksel bölgeye dönüştürmez.",
          ],
          optionReasons: [
            "Doğru:ölçüm ve görünür temsil ayrıdır.",
            "Soğuk görülen cisim de ısıl ışınım yayabilir.",
            "Isıl ışınım bir dalga boyu dağılımına sahiptir.",
            "Verilen termal ölçüm yalnız görünür görüntü değildir.",
            "Ekran paletini ölçülen dalganın gerçek görünür rengi sanır.",
          ],
          commonError:
            "Kırmızı ekran rengi gördüğünde sinyalin görünür kırmızı dalga olduğunu söyleme.",
          check:
            "Aynı verinin siyah-beyaz paletle gösterilebileceğini düşün; fiziksel ölçüm değişir mi?",
        },
      },
      {
        prompt:
          "James Webb ağırlıkla kızılötesi, Chandra X ışını gözlemleri yapar. Aynı gökcisminin bu iki araçla incelenmesinin en uygun açıklaması hangisidir?",
        options: [
          "Kızılötesi mekanik, X elektromanyetiktir",
          "İki dalga türü de boşlukta aynı c ile gelir; farklı bölgeler farklı süreçlerden bilgi taşır",
          "X ışınları boşlukta kızılötesini hızla geçer",
          "İki görüntünün mutlaka her pikseli aynı olur",
          "Bu araçlar yalnız gözle görülen renkleri büyütür",
        ],
        answer: 1,
        hint: "Ortak boşluk hızıyla farklı gözlem bilgisini aynı anda koru.",
        explanation:
          "Kızılötesi ve X ışınları elektromanyetik ailenin farklı bölgeleridir. Boşluk hızları aynı c olsa da dalga boyları, foton enerjileri ve maddeyle etkileşimleri farklıdır. Bu nedenle iki gözlem birbirini tamamlayabilir; B doğru açıklamadır.",
        guidance: {
          knowledge: [
            "Elektromanyetik tayfın farklı bölgeleri farklı oluşum ve soğurma süreçlerini izleyebilir.",
          ],
          strategy:
            "Ortak boşluk hızıyla farklı gözlem bilgisini aynı anda koru.",
          steps: [
            "Kızılötesi ve X ışınları elektromanyetik ailenin farklı bölgeleridir.",
            "Boşluk hızları aynı c olsa da dalga boyları, foton enerjileri ve maddeyle etkileşimleri farklıdır.",
            "Bu nedenle iki gözlem birbirini tamamlayabilir; B doğru açıklamadır.",
          ],
          optionReasons: [
            "Kızılötesi de elektromanyetiktir.",
            "Doğru:ortak aile ve hız, farklı fiziksel bilgiyi dışlamaz.",
            "Boşluk hızı frekansla artmaz.",
            "Farklı bölgeler aynı dağılımı göstermek zorunda değildir.",
            "Her iki araç da sırf görünür renk büyütücüsü değildir.",
          ],
          commonError:
            "Teleskopların farklı dalga boylarını toplamasını farklı boşluk hızlarına bağlama.",
          check:
            "Bir sıcak-toz bölgesini ve yüksek enerji plazmasını farklı bölgelerde izleme fikrini açıkla.",
        },
      },
    ],
  },
  {
    id: "atom-modelleri-fizik",
    topic: "detail-396",
    title: "Atom modelleri: deneyden enerji düzeylerine",
    minutes: 100,
    objectives: [
      "Atom modellerinin hangi deneye yanıt verdiğini açıkla",
      "Tek elektronlu Bohr atomunda enerji, yarıçap ve geçişleri hesapla",
      "Foton-elektron uyarılması ile modern orbital betimini ayır",
    ],
    sections: [
      {
        title: "Atom fikrinden sınanabilir modele",
        paragraphs: [
          "Atom düşüncesi, maddenin sürekli mi yoksa tanecikli mi olduğu sorusuyla başlar. Demokritos’un atomos yaklaşımı tarihsel bir düşünsel öneridir; modern ölçümle bulunan elektron veya çekirdeğin deneysel keşfiyle aynı kanıt düzeyinde değildir.",
          "Bilimsel atom modeli, gözlenebilir sonuçlar üretip bunların deneyle karşılaştırılmasına dayanır. Kimyasal birleşme oranları, katot ışınlarının sapması, alfa saçılması ve kesikli tayflar farklı sorular sorar; her yeni bulgu önceki modelin hangi özelliğini sınadığını gösterir.",
        ],
      },
      {
        title: "Dalton’un katkısı ve sınırı",
        paragraphs: [
          "Dalton, elementleri atomlarla betimleyip bileşiklerin basit tam sayılı atom oranlarıyla oluşmasını ve kimyasal tepkimelerde atomların yeniden düzenlenmesini vurguladı. Bu yaklaşım, kütle ve birleşme oranlarına düzenli bir açıklama sağladı.",
          "Modelin atomu bölünmez ve iç yapısız küre sayması bugün geçerli değildir. Aynı elementin farklı kütleli izotopları bulunabilir; kimyasal tepkimelerde atom kimliği korunurken nükleer tepkimeler element dönüşümüne yol açabilir. Bir katkıyı öğrenmek, bütün önermelerini doğru kabul etmek değildir.",
        ],
      },
      {
        title: "Thomson ve elektronun varlığı",
        paragraphs: [
          "Katot ışınlarının elektrik ve manyetik alanlarda uygun biçimde sapması, negatif yüklü taneciklerden oluştuğunu gösterir. Thomson bu tanecikler için yük/kütle oranını ölçtü. Atomda elektron bulunması, Dalton’un iç yapısız bölünmez atom fikrini değiştirdi.",
          "Thomson’un modelinde negatif elektronlar yaygın pozitif yük içinde düşünülür; buna üzümlü kek benzetmesi yapılır. Bu model, pozitif yükün çok küçük ve yoğun çekirdekte toplandığı Rutherford betimiyle aynı değildir. Deneyin bulduğu tanecikle önerilen bütün atom geometrisini ayır.",
        ],
      },
      {
        title: "Millikan ölçümüyle e ve m’yi ayır",
        paragraphs: [
          "Yağ damlası deneyinde damlacıkların elektrik alan ve yer çekimi etkisindeki hareketleri incelenir. Uygun denge durumunda elektriksel kuvvetin büyüklüğü ∣q∣E ile ağırlık mg dengelenebilir. Çok sayıda damlada ölçülen yükler temel yükün tam katlarını verir.",
          "Bu çalışma temel yükün büyüklüğünü belirler. Thomson’un ∣e∣/mₑ oranıyla birleştirildiğinde elektron kütlesi bulunabilir; yağ damlasının bütün kütlesini elektron kütlesi sanma. Hareketli limit hız durumunda sürükleme de varsa yalnız iki kuvvet yazmak ayrıca koşul ister.",
        ],
      },
      {
        title: "Rutherford saçılmasını iki gözlemle yorumla",
        paragraphs: [
          "İnce metal levhaya gönderilen alfa parçacıklarının çoğu küçük sapmayla geçer; çok azı büyük açılarla sapar veya geri döner. Çoğunluğun geçmesi, atomun büyük bölümünün yoğun maddeyle dolu olmadığına; az sayıdaki büyük sapma ise çok küçük ve yoğun pozitif bölgeye işaret eder.",
          "Alfa parçacığı pozitiftir; pozitif çekirdekle itişi büyük sapmaya katkı verir. Elektronun varlığı tek başına bu gözlemi açıklamaz. Rutherford’un çekirdek bulgusu, aynı modelin atomun kararlılığını veya çizgisel tayfını bütünüyle açıklamış olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Çekirdek, izotop ve nötr atom",
        paragraphs: [
          "Atom numarası Z çekirdekteki proton sayısını belirler. Nötr atomda elektron sayısı da Z olur; iyonlaşma, elektron sayısını değiştirir fakat çekirdek değişmedikçe Z aynı kalır. İzotoplarda proton sayısı aynı, nötron sayısı farklıdır.",
          "Nötronun keşfi Chadwick ile ilişkilidir; elektron, proton ve nötron aynı deneyle tek seferde bulunmadı. Atom kütlesinin büyük bölümü çekirdektedir; bu, elektronun hacim boyunca bulunma dağılımının veya kimyasal davranıştaki rolünün önemsiz olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Klasik yörüngenin kararlılık sorunu",
        paragraphs: [
          "Klasik elektromanyetizma, çekirdek çevresinde ivmeli hareket eden yüklü elektronun enerji yaymasını bekler. Enerji kaybeden klasik yörünge küçülmeli ve atom çökmelidir. Oysa atomlar kararlı yapılar ve belirli dalga boylarında tayf çizgileri gösterir.",
          "Bohr modeli bu soruna, sürekli ışıma yapmayan belirli kararlı yörüngeler ve kesikli geçiş varsayımlarıyla yanıt aradı. Bu, klasik dairesel hareketin tek başına ulaştığı sonuç değil; klasik fikirlere kuantum koşullarının eklendiği tarihsel bir modeldir.",
        ],
      },
      {
        title: "Bohr’un üç temel koşulu",
        paragraphs: [
          "Elektron belirli kararlı yörüngelerde bulunurken sürekli enerji yaymaz. Modelde açısal momentum L=nħ biçiminde kuantumlanır; n=1,2,3 gibi pozitif tam sayıdır ve ħ=h/(2π) anlamına gelir. Her rastgele yarıçap veya enerji kararlı düzey sayılmaz.",
          "Bir düzeyden daha düşük enerjili düzeye geçişte fark kadar foton yayılır; daha yüksek düzeye geçiş enerji alınmasını gerektirir. Kararlı bir düzeyde elektron bulunması ile düzey değiştirme sırasında ışık yayılması birbirinden ayrı durumdur.",
        ],
      },
      {
        title: "Tek elektronlu sistem koşulunu koru",
        paragraphs: [
          "Bohr’un basit enerji ve yarıçap formülleri hidrojen ve tek elektronlu hidrojen benzeri iyonlar için yaklaşık sonuç verir. H için Z=1, He⁺ için Z=2, Li²⁺ için Z=3’tür; hepsinin elektron sayısı birdir. Nötr helyumun iki elektronu olduğundan aynı basit formül doğrudan kullanılamaz.",
          "Çekirdek yükünün Z olması, Z’nin her zaman bir olması demek değildir. Model etkileşiminde yalnız bu üç tek elektronlu sistem seçilir. Çok elektronlu atomlarda perdeleme ve elektronlar arası etkileşim, basit −13,6 Z²/n² bağıntısının tek başına yeterli olmasını engeller.",
        ],
      },
      {
        title: "Enerji ölçeğini negatif sayılarla oku",
        paragraphs: [
          "Bohr yaklaşımında Eₙ=−13,6 Z²/n² eV yazılır; sıfır enerji çekirdekten sonsuz uzakta durgun elektrona göre seçilir. Negatif toplam enerji, elektronun bağlı olduğunu belirtir. Daha az negatif olan −3,4 eV, −13,6 eV’den daha yüksektir.",
          "n arttıkça enerji sıfıra yaklaşarak artar; iyonlaşma için gereken ek enerji azalır. Bu işaret düzenini bir borç benzetmesiyle görmek kolay olabilir: sıfıra ulaşmak için dışarıdan enerji verilmelidir. Bağlı atomun enerjisi negatif diye kinetik enerjisi negatif olmaz.",
        ],
      },
      {
        title: "Yarıçap ve açısal momentum ölçekleri",
        paragraphs: [
          "Modelde rₙ=a₀n²/Z ve a₀ yaklaşık 0,0529 nm’dir. Aynı Z için n iki katına çıkınca yarıçap dört katına çıkar; aynı n için Z iki katına çıkınca yarıçap yarıya iner. Açısal momentum ise nħ ile doğru orantılıdır.",
          "Aynı n’de Z büyüyünce elektron daha güçlü bağlanır ve ∣Eₙ∣ Z² ile büyür. Yarıçapın n²’ye, açısal momentumun n’ye bağlı olması farklı fiziksel ilişkilerin sonucudur; her ikisini de 'n ile artar' diye söylemek oran sorusunu çözmeye yetmez.",
        ],
      },
      {
        title: "Kinetik ve potansiyel enerjiyi ayır",
        paragraphs: [
          "Coulomb bağlı dairesel Bohr modelinde potansiyel enerji U=2 Eₙ, kinetik enerji K=−Eₙ olur. Böylece K pozitiftir, U negatiftir ve toplamları Eₙ verir. Örneğin H temel hâlinde K=13,6 eV ve U=−27,2 eV olur.",
          "Üst düzeye çıkarken toplam enerji artar fakat elektronun kinetik enerjisi ve sürati azalır; potansiyel enerji daha az negatif olur. Toplam enerji artışıyla hız artışını aynı sanmak, bağlı Coulomb sistemlerinde yanlış sonuç üretir. Bu bağıntılar modelin varsayımları içinde kullanılır.",
        ],
      },
      {
        title: "Uyarılma, ışıma ve iyonlaşma",
        paragraphs: [
          "Atomun daha yüksek bağlı enerji düzeyine çıkarılması uyarılmadır. Üst düzeyden daha düşük düzeye foton yayarak geçmesi emisyondur. Elektronun bağlı durumdan ayrılması iyonlaşmadır; iyonlaşmış elektron artık bir üst bağlı düzeyde sayılmaz.",
          "Bulunduğu n düzeyinden iyonlaşma eşiği 13,6 Z²/n² eV’dir. 'Birinci uyarılma' temel n=1’den n=2’ye çıkıştır; n=1 birinci uyarılmış hâl değildir. Soruda verilen enerji düzeyinin mutlak enerji mi yoksa temelden ölçülmüş uyarılma enerjisi mi olduğunu belirle.",
        ],
      },
      {
        title: "Geçiş enerjisinden fotona git",
        paragraphs: [
          "Yayımda foton enerjisi Eilk−Eson pozitif farktır; soğurmada atoma verilmesi gereken enerji Eson−Eilk olur. Foton için hf=hc/λ kullanılır. H’de n=2’den n=1’e geçiş 10,2 eV foton yayar; bu fotonun enerjisi −10,2 eV değildir.",
          "Hesaplarda hc yaklaşık 1240 eV·nm alınırsa dalga boyu nanometreyle kolay bulunur. Etkileşimde kesin SI h, c, e değerlerinden hc hesaplanır; Bohr düzeyleri ise belirtilen 13,6 eV yaklaşımıyla kuruludur. Yaklaşık sonuçtaki son basamakları kesin ölçüm gibi yorumlama.",
        ],
      },
      {
        title: "Fotonla uyarılmada seçicilik",
        paragraphs: [
          "İdeal yalıtılmış atomun bağlı-bağlı geçişinde gelen fotonun enerjisi izinli iki düzey farkıyla eşleşmelidir; foton soğurulur. Temel H’ye gelen 11 eV foton, 10,2 eV’yi bırakıp 0,8 eV’lik aynı foton olarak yoluna devam ederek o bağlı geçişi yaptıramaz.",
          "İyonlaşma eşiğinin üzerinde fotonla iyonlaşma ayrı bir kanaldır; fazla enerji elektronun kinetik enerjisine ve gerekirse geri tepmeye gidebilir. Buradaki model ideal dar çizgi ve basit enerji bütçesidir; gerçek çizgi genişliği ve saçılma olasılıklarını hesapladığını iddia etmez.",
        ],
      },
      {
        title: "Elektronla uyarılmada kalan enerji",
        paragraphs: [
          "Gelen serbest elektronun kinetik enerjisi izinli düzey farkından büyükse, esnek olmayan çarpışmada farkı atoma aktarabilir ve kalan kinetik enerjiyle ayrılabilir. Örneğin H temel düzeyini n=2’ye çıkaran 11 eV elektron yaklaşık 0,8 eV ile devam edebilir.",
          "Enerjinin yeterli olması her çarpışmada mutlaka uyarılma olacağı anlamına gelmez. İyonlaşma, birden fazla atomu farklı çarpışmalarda uyarma veya enerji aktarmadan ayrılma gibi olasılıklar ayrıca vardır. Model 'enerjice mümkün kanal' gösterir; kesin olasılık veya tek zorunlu sonuç göstermez.",
        ],
      },
      {
        title: "Isıtma ve Franck–Hertz kanıtı",
        paragraphs: [
          "Isıtılan gazda taneciklerin çarpışmaları atomun iç enerji düzeylerini uyarabilir; elektrik boşalması da elektronlara enerji vererek uyarılma sağlar. Sonraki yayımda elemente özgü çizgiler görülebilir. Isınan yoğun bir metalin sürekli ısıl tayfı, tek yalıtılmış atomun çizgileriyle aynı değildir.",
          "Franck–Hertz deneyinde hızlandırılan elektronların belirli eşiklerde atomlara kesikli enerji aktarması, atomların enerji düzeylerinin sürekli olmadığını destekler. İç enerji artıran çarpışma, toplam kinetik enerjiyi koruyan esnek çarpışma diye adlandırılmaz; toplam enerji her durumda korunur.",
        ],
      },
      {
        title: "Bir atom, çok atom ve tayf çizgisi sayısı",
        paragraphs: [
          "n düzeyinden başlayıp temel hâle inen tek atom, her geçişte bir foton yayabilir; en fazla n−1 basamaklı bir zincir kurabilir. Tek bir atomun bir düşüşte bütün olası düzey çiftlerini aynı anda deneyimlemesi beklenmez.",
          "Çok sayıda atomun erişebildiği ilk n düzey arasındaki bütün olası geçiş çiftleri sayılıyorsa n(n−1)/2 farklı çizgi üst sınırı elde edilir. Bu sayıyı tek atomun tek zincirde yaydığı foton sayısıyla karıştırma; çizgi çeşitliliği ile olay sayısı farklıdır.",
        ],
      },
      {
        title: "Hidrojen serilerini son düzeyle tanı",
        paragraphs: [
          "Hidrojen için son düzeyi n=1 olan geçişler Lyman, n=2 olanlar Balmer, n=3 olanlar Paschen adını alır. Lyman çizgileri morötesi, Paschen çizgileri kızılötesidir. Balmer’in bilinen bazı çizgileri görünür bölgededir; seri sınırı yakınındaki çizgiler için tek bir görünür etiket yeterli değildir.",
          "Aynı son düzeye farklı üst düzeylerden inen geçişlerin enerjileri ve dalga boyları farklıdır. En büyük enerji farkı, en yüksek frekansı ve en kısa dalga boyunu verir. Bir seri adı, bütün çizgilerin aynı enerjiye sahip olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Bohr’dan modern atom betimine",
        paragraphs: [
          "Elektronların dalga davranışı, belirsizlik ilişkileri ve daha ayrıntılı tayf verileri, kesin klasik çember yörüngesini yeterli bir atom resmi olmaktan çıkarır. Bohr modeli, tayf çizgilerinin parlaklık farklarını ve manyetik alanda ayrışmasını açıklamaz; çok elektronlu atomları ve bunların kimyasal bağlarını da yeterince betimleyemez. De Broglie momentumla ilişkili dalga boyu fikrine, Heisenberg konum-momentum belirsizliğine, Schrödinger dalga denklemi yaklaşımına katkı verdi.",
          "Modern atom kuramında orbital, belirli bir enerji durumunun uzaysal olasılık betimiyle ilişkilidir. Elektron bulutu gerçek bir sis veya elektronun çizdiği sabit yol değildir. Bohr çizimindeki çemberler tarihsel modelin araçlarıdır; modern orbitalin gözle görülen rayları sayılmaz.",
        ],
      },
      {
        title: "Belirsizlik, kuantum sayısı ve spin",
        paragraphs: [
          "Konum ve aynı doğrultudaki momentum belirsizlikleri birlikte sınırsız küçültülemez; bu, yalnız ölçü aletini kötü yaptığımız için ortaya çıkan bir durum değildir. Kuantum sayıları enerji ve açısal özellikleri sınıflandırır; n, l, mₗ, mₛ adları farklı bilgileri temsil eder.",
          "Spin, elektronun içsel açısal özelliğidir; küçük katı bir topun kendi ekseni etrafındaki klasik dönüşüyle özdeş değildir. Bir orbital en çok iki zıt spinli elektron alır; bir n kabuğunda n² orbital ve en çok 2 n² elektron bulunması, her orbitalin önceden dolu olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Kuramın kapsamı ve bilimsel katkı",
        paragraphs: [
          "Modern kuram çok elektronlu yapı, spektrum ayrıntıları ve kimyasal bağ için Bohr’dan daha geniş bir çerçeve sağlar. Feza Gürsey, Asım Orhan Barut ve Behram Kurşunoğlu gibi fizikçiler temel parçacık, simetri ve alan kuramı çalışmalarına katkıda bulunmuştur; hepsinin tek bir atom deneyini yaptığı söylenmez.",
          "Etkileşimde tarihsel modelin kanıt kartını ve Bohr enerji diyagramını ayrı incele. Enerji eksenindeki aralıklar hesaplanan düzey farklarından çizilir; orbital resmi bir kesin yörünge simülasyonu olarak sunulmaz. Tahmin ve örnek açma bağımsız soru başarısı yerine kaydedilmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Hidrojen 3→1 fotonu",
        prompt:
          "Eₙ=−13,6/n²eV. H’nin n=3→1 geçişinde Efoton veλ’yı hc=1240 eV·nm ile bul.",
        strategy: "İki negatif düzeyi çıkar.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "E₃≈−1,5111 eV, E₁=−13,6 eV.",
          },
          {
            label: "İşlemi yap",
            explanation: "Efoton≈−1,5111−(−13,6)=12,0889 eV.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "λ≈1240/12,0889=102,57 nm; bu Lyman serisinde morötesi bir çizgidir.",
          },
        ],
        answer: "12,0889 eV; 102,57 nm.",
        check: "Fark, E₁bağlanma 13,6 eV’den küçük olmalıdır.",
        pitfall: "Üst düzeyin enerjisini doğrudan foton enerjisi sayma.",
      },
      {
        title: "Li²⁺ için farklı Z, n oranları",
        prompt:
          "Tek elektronlu Li²⁺ için Z=3, n=3. E=−13,6 Z²/n²eV, r=0,0529 n²/Znm.",
        strategy: "Enerji ve yarıçap oranlarını ayrı sadeleştir.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "Enerjide Z²/n²=9/9=1, bu yüzden E=−13,6 eV.",
          },
          {
            label: "İşlemi yap",
            explanation: "Yarıçapta n²/Z=9/3=3, bu yüzden r=0,1587 nm.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Hidrojen temel enerjisiyle aynı sayı elde etmek, sistemin yarıçapını da aynı yapmaz.",
          },
        ],
        answer: "−13,6 eV; 0,1587 nm.",
        check: "K=13,6 eV, U=−27,2 eVtoplamı bu enerjiye uyar.",
        pitfall:
          "Üç elektron varmış gibi nötr Li’nin yapısını kullanma; Li²⁺’ta bir elektron vardır.",
      },
      {
        title: "Başlangıç uyarılmış düzeyse eşik değişir",
        prompt:
          "Bir ideal atomda başlangıç düzeyi−3,4 eV, son bağlı düzey−1,5 eV, iyon sınırı 0 eV.2 eV foton ve 2 eV elektron bu geçişe gönderiliyor.",
        strategy:
          "Verilen yaklaşık düzeyleri bu örneğin tam model değerleri kabul et.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "İzinli bağlı fark−1,5−(−3,4)=1,9 eV.",
          },
          {
            label: "İşlemi yap",
            explanation:
              "2 eV foton bu 1,9 eVrezonansıyla eşleşmez ve 3,4 eViyonlaşma eşiğinin altında kalır.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "2 eVelektron 1,9 eVaktarabilirse 0,1 eVile ayrılabilir; bu enerjice mümkün kanaldır.",
          },
        ],
        answer:
          "Foton bağlı geçişe eşleşmez; elektron için 0,1 eVkalan mümkün.",
        check:
          "Aktarılan 1,9 eV ile kalan 0,1 eV toplanınca gelen 2 eV bulunmalıdır.",
        pitfall:
          "Temel hâlden ölçülen başka bir uyarılma enerjisini bu başlangıca taşıma.",
      },
      {
        title: "He⁺ iyonlaşmasında enerji bütçesi",
        prompt:
          "He⁺ temel hâli için E₁=−54,4 eV.60 eV foton soğurulup iyonlaşma yapıyor; geri tepme ihmal.",
        strategy: "0 eV serbestlik sınırına gereken enerjiyi ayır.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "İyonlaşma eşiği 54,4 eV’dir.",
          },
          {
            label: "İşlemi yap",
            explanation: "Fazla enerji 60−54,4=5,6 eV.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "Bu fazla, çıkan elektronun kinetik enerjisi olabilir; foton bütün olarak soğurulmuştur.",
          },
        ],
        answer: "5,6 eV",
        check:
          "İyonlaşma 54,4 eV+kalan 5,6 eV=gelen 60 eV enerji bütçesini doğrular.",
        pitfall: "Z² katsayısını atlayıp hidrojenin 13,6 eVeşiğini kullanma.",
      },
      {
        title: "Beş düzeyde çizgi ile foton sayısı",
        prompt:
          "Çok sayıda atom ilk beş düzeyde bulunabilir. Tüm olası farklı aşağı geçişleri ve tek atomun 5’ten 1’e en uzun zincirini say.",
        strategy: "Olası kenar sayısıyla tek yol uzunluğunu ayır.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "Bütün düzey çiftleri 5·4/2=10 farklı çizgi verir.",
          },
          {
            label: "İşlemi yap",
            explanation: "Tek atom 5→4→3→2→1 ile en fazla 4 geçiş yapabilir.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "On çizgi çeşitliliği, tek bir atomun aynı inişte on foton yayması değildir.",
          },
        ],
        answer: "10 çizgi üst sınırı; tek zincirde en çok 4 foton.",
        check: "Düzey 5’ten 4 olası ok,4’ten 3,3’ten 2,2’den 1:4+3+2+1=10.",
        pitfall:
          "Seri sınırı veya çizgi çeşitliliğiyle tek olayın foton sayısını karıştırma.",
      },
      {
        title: "Negatif toplam enerjinin parçaları",
        prompt:
          "Hidrojen n=4 düzeyinde E=−0,85 eV. U=2 E veK=−E için iki enerjiyi ve iyonlaşma eşiğini bul.",
        strategy:
          "Kinetik enerjinin pozitif olmasını geri kontrol olarak kullan.",
        steps: [
          {
            label: "Koşulu kur",
            explanation: "U=−1,70 eV veK=+0,85 eV hesaplanır.",
          },
          {
            label: "İşlemi yap",
            explanation: "ToplamU+K=−0,85 eV olarak başlangıçla aynıdır.",
          },
          {
            label: "Sonucu yorumla",
            explanation:
              "İyonlaşma eşiği 0−(−0,85)=0,85 eV; negatif toplam enerji negatif kinetik enerji değildir.",
          },
        ],
        answer: "U=−1,70 eV; K=0,85 eV; iyonlaşma 0,85 eV.",
        check: "K+U=0,85−1,70=−0,85 eV; eksi işaret toplamda korunur.",
        pitfall:
          "İyonlaşma eşiğini potansiyel enerjinin mutlak değerine eşitleme; toplam enerjiye göre sıfıra çıkılır.",
      },
    ],
    recall: [
      {
        prompt: "Rutherford gözleminin iki parçası nedir?",
        answer:
          "Çoğunluğun geçmesi atom hacminin seyrekliğine, az sayıdaki büyük sapma küçük yoğun pozitif çekirdeğe kanıt sağlar.",
      },
      {
        prompt: "Bohr formülünde tek elektronlu olmak ne demektir?",
        answer:
          "H, He⁺, Li²⁺gibi yalnız bir elektronlu sistem; Z’nin mutlaka 1 olması gerekmez.",
      },
      {
        prompt:
          "Negatif toplam enerji elektronun kinetik enerjisini negatif yapar mı?",
        answer: "Hayır; Bohr Coulomb modelindeK=−E pozitif, U=2 E negatiftir.",
      },
      {
        prompt: "Foton ve elektronla uyarılmada temel fark nedir?",
        answer:
          "Bağlı foton soğurması izinli enerji farkıyla eşleşir; elektron farkı aktarıp kalan kinetik enerjiyle ayrılabilir.",
      },
      {
        prompt: "n(n−1)/2 ile n−1 neyi sayar?",
        answer:
          "İlk n düzey arasında olası çizgi çeşitliliği ile tek atomun en uzun aşağı iniş zincirindeki foton sayısını.",
      },
      {
        prompt: "Modern orbital niçin Bohr çemberi değildir?",
        answer:
          "Orbital bir kuantum durumunun uzaysal olasılık betimiyle ilişkilidir; kesin klasik yol veya ray değildir.",
      },
    ],
    source:
      "MEBİ AYT Fizik fiziksel PDF 210–225 ve Dersler Cepte 12 Fizik 6. sayı PDF 12–18 okunarak yazılmış özgün öğretim. Bohr modeli tek elektronlu H/He⁺/Li²⁺ ile sınırlıdır. Kaynaktaki yörünge-orbital, spin, foton sayısı ve esnek çarpışma genellemeleri öğretime aynen taşınmaz.",
    items: [
      {
        prompt:
          "Aynı elementin nötron sayıları farklı iki atomunun kütleleri farklı ölçülüyor. Bu bulgu Dalton’un hangi önermesinin bugün koşulsuz geçerli olmadığını gösterir?",
        options: [
          "Bileşikler birden çok element içerebilir",
          "Bir elementin bütün atomları aynı kütlededir",
          "Basit birleşme oranları anlamlıdır",
          "Elementler atomlarla betimlenebilir",
          "Kimyasal olaylarda atomlar yeniden düzenlenebilir",
        ],
        answer: 1,
        hint: "Ölçümün yalnız hangi önermeyle çeliştiğini seç; modelin bütün katkılarını silme.",
        explanation:
          "İki atomun aynı element olması proton sayılarının aynı olduğunu belirtir. Farklı nötron sayıları farklı kütleli izotopları mümkün kılar. Bu durum aynı elementin bütün atomlarının aynı kütlede olduğu önermesini sınırlar; B doğrudur.",
        guidance: {
          knowledge: [
            "İzotoplar aynı proton sayısına fakat farklı nötron sayısına ve kütleye sahip olabilir.",
          ],
          strategy:
            "Ölçümün yalnız hangi önermeyle çeliştiğini seç; modelin bütün katkılarını silme.",
          steps: [
            "İki atomun aynı element olması proton sayılarının aynı olduğunu belirtir.",
            "Farklı nötron sayıları farklı kütleli izotopları mümkün kılar.",
            "Bu durum aynı elementin bütün atomlarının aynı kütlede olduğu önermesini sınırlar; B doğrudur.",
          ],
          optionReasons: [
            "İzotop farkı, bileşiklerin varlığını çürütmez.",
            "Doğru:farklı izotop kütleleri bu önermeyi koşulsuz bırakmaz.",
            "Basit oranların açıklanması izotop varlığıyla özdeş soru değildir.",
            "Atom fikrinin bütünü bu ölçümle ortadan kalkmaz.",
            "Kimyasal yeniden düzenleme bu ölçümle reddedilmez.",
          ],
          commonError:
            "Bir önerme yanlışlanınca modelin bütün gözlemsel katkılarının da yanlış olduğunu sanma.",
          check:
            "Proton sayısını sabit tutup nötron sayısını değiştirerek izotop tanımını doğrula.",
        },
      },
      {
        prompt:
          "Thomson ve Millikan deneyleri birlikte değerlendirilirken doğru görev eşleştirmesi hangisidir?",
        options: [
          "Thomson proton sayısını, Millikan atom tayfını belirledi",
          "Thomson çekirdek yarıçapını, Millikan nötron sayısını ölçtü",
          "Thomson elektronun yük/kütle oranını, Millikan temel yük büyüklüğünü belirledi",
          "İkisi de yalnız altın levhadan alfa saçılmasını inceledi",
          "Millikan yağ damlasının bütün kütlesini elektron kütlesi saydı",
        ],
        answer: 2,
        hint: "e/m ile e’nin farklı bilgiler olduğunu belirle.",
        explanation:
          "Thomson katot ışınlarının alanlardaki davranışından elektron için e/m oranına ulaştı. Millikan damlacık yüklerinin temel yükün katları olduğunu ölçerek e büyüklüğünü belirledi. Bu iki bilgi birleştirilince m=e/(e/m) hesaplanabilir; C doğrudur.",
        guidance: {
          knowledge: [
            "Yük/kütle oranı ile temel yük ayrı ölçümlerdir; birleştirilirse elektron kütlesi bulunabilir.",
          ],
          strategy: "e/m ile e’nin farklı bilgiler olduğunu belirle.",
          steps: [
            "Thomson katot ışınlarının alanlardaki davranışından elektron için e/m oranına ulaştı.",
            "Millikan damlacık yüklerinin temel yükün katları olduğunu ölçerek e büyüklüğünü belirledi.",
            "Bu iki bilgi birleştirilince m=e/(e/m) hesaplanabilir; C doğrudur.",
          ],
          optionReasons: [
            "Elektron deneylerini proton veya tayf ölçümüyle karıştırır.",
            "Bu büyüklükler verilen deneylerin doğrudan sonuçları değildir.",
            "Doğru:oran ve yük iki ayrı ölçüm bilgisidir.",
            "Alfa saçılması Rutherford ekibinin farklı düzenidir.",
            "Damla kütlesi bir elektron kütlesi değildir.",
          ],
          commonError:
            "e/m bulundu diye e ve m’nin ikisinin de ayrı ayrı aynı deneyle belirlendiğini söyleme.",
          check: "Birim kontrolünde C/(C/kg)=kg sonucunu elde et.",
        },
      },
      {
        prompt:
          "İnce altın levha deneyinde alfa parçacıklarının çoğu az sapıyor, çok azı büyük açıyla sapıp geri dönebiliyor. Bu iki gözlemi birlikte en iyi açıklayan yapı hangisidir?",
        options: [
          "Atomun her noktasında aynı yüksek kütle yoğunluğu",
          "Pozitif yükün bütün hacme yayılıp yoğun çekirdeğin bulunmaması",
          "Negatif kütleli elektronların levhayı bütünüyle doldurması",
          "Alfa parçacıklarının yüksüz olması",
          "Küçük yoğun pozitif çekirdek ve atom hacminin büyük bölümünün seyrek olması",
        ],
        answer: 4,
        hint: "Çoğunluğun geçişi ile az sayıdaki büyük sapmayı aynı modelde açıkla.",
        explanation:
          "Çoğunluğun az sapması, atom hacminin her yerde yoğun dolu olmadığını gösterir. Az sayıdaki güçlü sapma, pozitif yük ve kütlenin küçük bir bölgede toplanmasını destekler. Yoğun pozitif çekirdek açıklaması her iki gözlemi birlikte karşılar; yalnız elektron keşfi bu geometriyi açıklamaya yetmez.",
        guidance: {
          knowledge: [
            "Pozitif alfa parçacığının büyük sapması küçük yoğun pozitif çekirdekle ilişkilidir; çoğunluğun geçmesi hacim dağılımını sınırlar.",
          ],
          strategy:
            "Çoğunluğun geçişi ile az sayıdaki büyük sapmayı aynı modelde açıkla.",
          steps: [
            "Çoğunluğun az sapması, atom hacminin her yerde yoğun dolu olmadığını gösterir.",
            "Az sayıdaki güçlü sapma, pozitif yük ve kütlenin küçük bir bölgede toplanmasını destekler.",
            "Yoğun pozitif çekirdek açıklaması her iki gözlemi birlikte karşılar; yalnız elektron keşfi bu geometriyi açıklamaya yetmez.",
          ],
          optionReasons: [
            "Her yerde yoğun yapı, çoğunluğun geçişiyle uyumsuzdur.",
            "Yaygın pozitif yük büyük nadir sapmaları yeterli açıklamaz.",
            "Elektron kütlesi negatif değildir; modelin böyle bir dayanağı yoktur.",
            "Alfa pozitiftir; verilen sapmanın elektriksel yorumu yüksüzlük değildir.",
            "Doğru:iki saçılma gözlemi çekirdekli seyrek hacimle birleşir.",
          ],
          commonError:
            "Yalnız büyük sapmaya bakıp atomun bütün hacmini katı dolu sanma.",
          check:
            "Çoğu parçacığın yolu ile çok azının yolunu ayrı çizip aynı küçük çekirdeğe bağla.",
        },
      },
      {
        prompt:
          "Basit Bohr Eₙ=−13,6 Z²/n² eV bağıntısı hangi sistemlere doğrudan yaklaşık uygulanabilir?",
        options: [
          "Nötr He ve nötr Li",
          "Her nötr atomun bütün elektronlarına bağımsız",
          "Sadece nötr helyuma",
          "Yalnız elektronsuz protonlara",
          "H ve He⁺",
        ],
        answer: 4,
        hint: "Her sistemde elektron sayısını proton sayısından ayrı say.",
        explanation:
          "H bir proton ve bir elektron içerir. He⁺ iki protona karşın bir elektron taşır; Z=2 ile aynı tip bağıntı uygulanır. Nötr He iki elektronlu olduğundan basit tek elektron formülünün doğrudan kapsamı değildir; E doğru.",
        guidance: {
          knowledge: [
            "Bu Bohr bağıntısı tek elektronlu hidrojen benzeri sistemleri betimler.",
          ],
          strategy:
            "Her sistemde elektron sayısını proton sayısından ayrı say.",
          steps: [
            "H bir proton ve bir elektron içerir.",
            "He⁺ iki protona karşın bir elektron taşır; Z=2 ile aynı tip bağıntı uygulanır.",
            "Nötr He iki elektronlu olduğundan basit tek elektron formülünün doğrudan kapsamı değildir; E doğru.",
          ],
          optionReasons: [
            "İki sistem de birden fazla elektronludur.",
            "Elektronlar arası etkileşimi yok sayan koşulsuz genellemedir.",
            "Nötr He tek elektronlu değildir.",
            "Bağıntı bağlı elektron enerjisidir; elektronsuz sistemde bu enerji düzeyi yoktur.",
            "Doğru:H ve He⁺ tek elektronludur.",
          ],
          commonError:
            "Tek elektronlu demeyi tek protonlu ile eşanlamlı kullanma.",
          check:
            "He çekirdeğinin yükü+2 e, He⁺ toplam yükünün+e olduğunu sayarak bir elektron kaldığını göster.",
        },
      },
      {
        prompt:
          "Tek elektronlu hidrojen için Eₙ=−13,6/n² eV. n=3 düzeyindeki toplam enerji yaklaşık kaç eV ve temel düzeye göre durumu nedir?",
        options: [
          "+1,51; daha yüksek",
          "−1,51; daha yüksek",
          "−4,53; daha yüksek",
          "−40,8; daha düşük",
          "−1,51; daha düşük",
        ],
        answer: 1,
        hint: "n’nin karesini kullan; sonra negatif sayıları sayı doğrusunda karşılaştır.",
        explanation:
          "E₃=−13,6/9≈−1,51 eV hesaplanır. Temel düzey−13,6 eV’dir; −1,51 bundan daha büyük bir sayıdır. n=3 daha yüksek bağlı düzeydir ve enerji hâlâ negatiftir; B doğrudur.",
        guidance: {
          knowledge: [
            "Negatif bağlı enerjilerde sıfıra daha yakın değer daha büyüktür.",
          ],
          strategy:
            "n’nin karesini kullan; sonra negatif sayıları sayı doğrusunda karşılaştır.",
          steps: [
            "E₃=−13,6/9≈−1,51 eV hesaplanır.",
            "Temel düzey−13,6 eV’dir; −1,51 bundan daha büyük bir sayıdır.",
            "n=3 daha yüksek bağlı düzeydir ve enerji hâlâ negatiftir; B doğrudur.",
          ],
          optionReasons: [
            "Bağlı durumun eksi işaretini atlar.",
            "Doğru:−1,51 eV ve temelden yüksek.",
            "n yerine n² kullanılmamıştır.",
            "n² ile bölmek yerine n ile çarpar.",
            "Sayı değeri doğru fakat negatif enerji sıralaması ters kurulmuştur.",
          ],
          commonError:
            "Mutlak değeri küçülen negatif sayıyı daha küçük toplam enerji sanma.",
          check:
            "İyonlaşma için gereken ek enerjinin 1,51 eV olması sıfıra yakınlığı doğrular.",
        },
      },
      {
        prompt:
          "Tek elektronlu He⁺ için Z=2 ve n=2. Eₙ=−13,6 Z²/n² eV, rₙ=0,0529 n²/Z nm veriliyor. Enerji ve yarıçap sırasıyla nedir?",
        options: [
          "−13,6 eV ve 0,0529 nm",
          "+13,6 eV ve 0,1058 nm",
          "−3,4 eV ve 0,2116 nm",
          "−54,4 eV ve 0,02645 nm",
          "−13,6 eV ve 0,1058 nm",
        ],
        answer: 4,
        hint: "İki formüle aynı Z, n değerlerini ayrı ayrı koy.",
        explanation:
          "E₂=−13,6·4/4=−13,6 eV. r₂=0,0529·4/2=0,1058 nm. E iki değeri doğru eşler; aynı enerji, hidrojen temel yarıçapıyla aynı yarıçap demek değildir.",
        guidance: {
          knowledge: ["Enerjide Z²/n², yarıçapta n²/Z oranları farklıdır."],
          strategy: "İki formüle aynı Z, n değerlerini ayrı ayrı koy.",
          steps: [
            "E₂=−13,6·4/4=−13,6 eV.",
            "r₂=0,0529·4/2=0,1058 nm.",
            "E iki değeri doğru eşler; aynı enerji, hidrojen temel yarıçapıyla aynı yarıçap demek değildir.",
          ],
          optionReasons: [
            "Enerji doğru ama yarıçapta n²/Z=2 etkisi atlanır.",
            "Bağlı enerji eksi işareti kaybedilmiştir.",
            "Z=2 etkisi iki formülde de atlanmıştır.",
            "He⁺ temel n=1 düzeyinin değerleridir.",
            "Doğru:iki bağıntının farklı oranları korunmuş.",
          ],
          commonError:
            "Enerjiyle yarıçapın aynı Z kuvvetine bağlı olduğunu sanma.",
          check:
            "n=2, Z=2 için enerjide oran 1, yarıçapta oran 2 olduğunun altını çiz.",
        },
      },
      {
        prompt:
          "Hidrojen için Bohr yarıçapı rₙ=a₀n². Aynı atomun n=4 düzeyindeki yarıçapı n=2 düzeyindekinin kaç katıdır?",
        options: ["16", "4", "8", "2", "1/4"],
        answer: 1,
        hint: "Baş kuantum sayılarının oranını kareye al.",
        explanation:
          "r₄/r₂=4²/2² yazılır. 16/4=4 bulunur. B doğrudur; düzey numarasının iki katı yarıçapta dört kat yapar.",
        guidance: {
          knowledge: ["Aynı Z’de yarıçap n² ile orantılıdır."],
          strategy: "Baş kuantum sayılarının oranını kareye al.",
          steps: [
            "r₄/r₂=4²/2² yazılır.",
            "16/4=4 bulunur.",
            "B doğrudur; düzey numarasının iki katı yarıçapta dört kat yapar.",
          ],
          optionReasons: [
            "r₂ paydası göz ardı edilir.",
            "Doğru:(4/2)²=4.",
            "Kare oranına gereksiz ek iki uygulanır.",
            "n oranı doğrudan kullanılarak kare atlanmıştır.",
            "Yeni/eski oranı ters çevrilmiştir.",
          ],
          commonError:
            "r₄=16 a₀ sonucunu doğrudan 16 kat diye söyleyip r₂=4 a₀ değerini unutma.",
          check:
            "Her iki yarıçapı a₀ cinsinden ayrı yazarak 16/4 kontrolü yap.",
        },
      },
      {
        prompt:
          "Bohr modelinde hidrojenin n=2 düzeyinde toplam enerji−3,4 eV. U=2 E ve K=−E bağıntılarına göre potansiyel ve kinetik enerji sırasıyla nedir?",
        options: [
          "−1,7 ve−1,7 eV",
          "−3,4 ve+6,8 eV",
          "+6,8 ve−3,4 eV",
          "−6,8 ve+3,4 eV",
          "+3,4 ve−6,8 eV",
        ],
        answer: 3,
        hint: "İşaretleri koruyarak iki bağıntıyı uygula; toplamla geri kontrol et.",
        explanation:
          "U=2·(−3,4)=−6,8 eV. K=−(−3,4)=+3,4 eV. Toplam−6,8+3,4=−3,4 eV verir; D doğru.",
        guidance: {
          knowledge: [
            "Coulomb bağlı Bohr durumunda U negatif, K pozitif ve K+U=E.",
          ],
          strategy:
            "İşaretleri koruyarak iki bağıntıyı uygula; toplamla geri kontrol et.",
          steps: [
            "U=2·(−3,4)=−6,8 eV.",
            "K=−(−3,4)=+3,4 eV.",
            "Toplam−6,8+3,4=−3,4 eV verir; D doğru.",
          ],
          optionReasons: [
            "Kinetik enerjiyi negatif yapıp eşit paylaştırır.",
            "Verilen iki bağıntıya uymayan değiş tokuştur.",
            "Kinetik enerjiyi negatif yapar ve U işaretini ters çevirir.",
            "Doğru:U+K verilen toplamı sağlar.",
            "Potansiyel ve kinetik işaretleri ters kurar.",
          ],
          commonError:
            "Toplam enerji negatifken kinetik enerjinin de negatif olması gerektiğini düşünme.",
          check: "K+U’nun−3,4 eV çıktığını mutlaka hesapla.",
        },
      },
      {
        prompt:
          "Hidrojen Bohr düzeyleri Eₙ=−13,6/n² eV. n=4’ten n=2’ye geçişte çıkan foton için hc=1240 eV·nm alınırsa enerji ve dalga boyu yaklaşık nedir?",
        options: [
          "−2,55 eV ve−486 nm",
          "0,85 eV ve 1459 nm",
          "2,55 eV ve 486 nm",
          "10,2 eV ve 122 nm",
          "3,4 eV ve 365 nm",
        ],
        answer: 2,
        hint: "İki düzey enerjisini önce ayrı bul; sonra farkı ve dalga boyunu hesapla.",
        explanation:
          "E₄=−0,85 eV ve E₂=−3,40 eV. Yayılan enerji−0,85−(−3,40)=2,55 eV olur. λ=1240/2,55≈486 nm; C doğru iki değeri verir.",
        guidance: {
          knowledge: ["Foton enerjisi Eilk−Eson pozitiftir; λ=hc/Efoton."],
          strategy:
            "İki düzey enerjisini önce ayrı bul; sonra farkı ve dalga boyunu hesapla.",
          steps: [
            "E₄=−0,85 eV ve E₂=−3,40 eV.",
            "Yayılan enerji−0,85−(−3,40)=2,55 eV olur.",
            "λ=1240/2,55≈486 nm; C doğru iki değeri verir.",
          ],
          optionReasons: [
            "Yayılan fotonun enerji ve dalga boyu negatif değildir.",
            "İlk düzeyin bağlanma enerjisini geçiş enerjisi sanır.",
            "Doğru:2,55 eV ve yaklaşık 486 nm.",
            "Hidrojen 2→1 geçişine ait değerleri kullanır.",
            "Son düzeyin bağlanma enerjisini fark yerine alır.",
          ],
          commonError:
            "Eilk ve Eson negatifken farkta ikinci eksi işaretini kaybetme.",
          check:
            "2,55·486≈1240 eV·nm çarpımını ve görünür çizgi ölçeğini kontrol et.",
        },
      },
      {
        prompt:
          "İdeal yalıtılmış temel hidrojen için ilk uyarılma 10,2 eV, ikinci uyarılma yaklaşık 12,09 eV ve iyonlaşma 13,6 eV. 11 eV foton ile 11 eV elektronun ilk uyarılmayı sağlaması karşılaştırılıyor. Doğru ifade hangisi?",
        options: [
          "Elektron uyarırken toplam kinetik enerji mutlaka aynıdır",
          "İkisi de zorunlu olarak 0,8 eV foton bırakır",
          "Foton her durumda enerjisinin istenen bölümünü bırakıp devam eder",
          "Foton bağlı geçişi uyaramaz; elektron 10,2 eV aktarırsa 0,8 eV ile ayrılabilir",
          "İkisi de 13,6 eV iyonlaşma eşiğini geçer",
        ],
        answer: 3,
        hint: "11 eV’nin eşleşme ve eşik koşullarını iki parçacık için ayrı incele.",
        explanation:
          "11 eV, verilen bağlı enerji farklarından biri değildir ve iyonlaşma eşiğinin altındadır. Foton, bu ideal bağlı geçişte 10,2 eV bırakıp 0,8 eV olarak devam edemez. Elektron ise 10,2 eV aktarabilirse 11−10,2=0,8 eV kinetik enerjiyle ayrılabilir; bu zorunlu tek çarpışma sonucu değildir.",
        guidance: {
          knowledge: [
            "Bağlı-bağlı foton soğurması rezonans farkını ister; serbest elektron uygun miktarı esnek olmayan çarpışmada aktarabilir.",
          ],
          strategy:
            "11 eV’nin eşleşme ve eşik koşullarını iki parçacık için ayrı incele.",
          steps: [
            "11 eV, verilen bağlı enerji farklarından biri değildir ve iyonlaşma eşiğinin altındadır.",
            "Foton, bu ideal bağlı geçişte 10,2 eV bırakıp 0,8 eV olarak devam edemez.",
            "Elektron ise 10,2 eV aktarabilirse 11−10,2=0,8 eV kinetik enerjiyle ayrılabilir; bu zorunlu tek çarpışma sonucu değildir.",
          ],
          optionReasons: [
            "Uyarılmada kinetik enerji iç enerjiye aktarılır; çarpışma esnek değildir.",
            "Giden parçacık türü ve foton enerji bütçesi yanlış kurulmuştur.",
            "Bu, ideal bağlı soğurma için fotonun seçiciliğini siler.",
            "Doğru:foton seçiciliği ile elektronun kalan kinetik enerjisi ayrılır.",
            "11 eV,13,6 eV’den küçüktür.",
          ],
          commonError:
            "Foton ile serbest elektrona aynı “fazlasını yanında götürür” kuralını uygulama.",
          check:
            "Elektron için 0,8+10,2=11 bütçesini yaz; foton içinse 11 eV’lik izinli fark olmadığını göster.",
        },
      },
      {
        prompt:
          "Temel hâldeki yalıtılmış H atomunun iyonlaşma eşiği 13,6 eV. 15 eV foton soğurulup iyonlaşma oluşturuyor; çekirdek geri tepmesi ihmal edilsin. Serbest elektronun kinetik enerjisi kaç eV?",
        options: ["1,4", "28,6", "15", "10,2", "13,6"],
        answer: 0,
        hint: "Önce bağdan kurtulma eşiğini ayır; kalana kinetik enerji de.",
        explanation:
          "15 eV’nin 13,6 eV’lik kısmı bağlı elektronu serbestleştirmek için gerekir. Kalan 15−13,6=1,4 eV elektronun kinetik enerjisidir. A doğrudur; foton sonradan 1,4 eV’lik aynı foton olarak devam etmez, soğurulmuştur.",
        guidance: {
          knowledge: [
            "Foton enerjisi, iyonlaşma için gereken enerji ve çıkan elektronun kinetik enerjisi arasında paylaşılır.",
          ],
          strategy:
            "Önce bağdan kurtulma eşiğini ayır; kalana kinetik enerji de.",
          steps: [
            "15 eV’nin 13,6 eV’lik kısmı bağlı elektronu serbestleştirmek için gerekir.",
            "Kalan 15−13,6=1,4 eV elektronun kinetik enerjisidir.",
            "A doğrudur; foton sonradan 1,4 eV’lik aynı foton olarak devam etmez, soğurulmuştur.",
          ],
          optionReasons: [
            "Doğru:15=13,6+1,4 enerji bütçesi.",
            "İyonlaşma enerjisi çıkarılacağına eklenmiştir.",
            "Bağlanmadan kurtulmaya ayrılan enerji atlanmıştır.",
            "İlk bağlı uyarılma farkını sonuç sanır.",
            "Bu iyonlaşma eşiğidir, kalan kinetik enerji değildir.",
          ],
          commonError:
            "Foton eşiği geçtiğinde mutlaka hiç etkileşmeden geçer genellemesi yapma.",
          check:
            "Fazla enerji negatif olmamalı; eşiğe tam eşit fotonda çıkanK yaklaşık sıfır olurdu.",
        },
      },
      {
        prompt:
          "Hidrojenin Bohr modelinde n=2 düzeyi E₂=−3,4 eV ve serbest elektron sınırı 0 eV. Bu düzeyden iyonlaşma için en az kaç eV gerekir?",
        options: ["1,51", "0,85", "13,6", "10,2", "3,4"],
        answer: 4,
        hint: "Başlangıç düzeyi n=2 olarak sabit tut.",
        explanation:
          "Başlangıç enerjisi−3,4 eV’dir. Serbestlik sınırı 0 eV olduğundan gerekli fark 0−(−3,4)=3,4 eV. E doğrudur; 13,6 eV temel n=1 için olurdu.",
        guidance: {
          knowledge: [
            "Bulunulan bağlı düzeyden iyonlaşma farkı 0−Eₙ’dir; her durumda temel düzeyden başlanmaz.",
          ],
          strategy: "Başlangıç düzeyi n=2 olarak sabit tut.",
          steps: [
            "Başlangıç enerjisi−3,4 eV’dir.",
            "Serbestlik sınırı 0 eV olduğundan gerekli fark 0−(−3,4)=3,4 eV.",
            "E doğrudur; 13,6 eV temel n=1 için olurdu.",
          ],
          optionReasons: [
            "Hidrojen n=3 bağlanma enerjisidir.",
            "Hidrojen n=4 bağlanma enerjisidir.",
            "Temel hâlden iyonlaşma eşiğidir; başlangıç yanlıştır.",
            "Temelden n=2’ye uyarılma enerjisidir.",
            "Doğru:n=2’den sıfıra 3,4 eV gerekir.",
          ],
          commonError:
            "İyonlaşma sözcüğünü görünce atomun her zaman temel hâlde olduğunu varsayma.",
          check: "Enerji ekseninde−3,4 ile 0 arasındaki farkı çiz.",
        },
      },
      {
        prompt:
          "Çok sayıda H atomunun erişebildiği ilk dört Bohr düzeyi arasındaki bütün farklı geçişler ile, tek bir atomun n=4’ten n=1’e bir düşüş zincirindeki en çok foton sayısı soruluyor. Sırasıyla kaçtır?",
        options: ["6 ve 3", "6 ve 6", "4 ve 4", "3 ve 6", "12 ve 4"],
        answer: 0,
        hint: "Olası farklı çizgilerle tek atomun sıralı olay sayısını ayrı say.",
        explanation:
          "Dört düzey arasında 4·3/2=6 farklı aşağı geçiş çifti vardır. Tek atom 4→3→2→1 zinciriyle en fazla 3 foton yayabilir. A iki farklı sayımın doğru sonucudur; tek atom bütün altı oku aynı inişte kullanamaz.",
        guidance: {
          knowledge: [
            "İlk n düzeyde olası çiftler n(n−1)/2; tek iniş zincirinde en çok n−1 geçiş vardır.",
          ],
          strategy:
            "Olası farklı çizgilerle tek atomun sıralı olay sayısını ayrı say.",
          steps: [
            "Dört düzey arasında 4·3/2=6 farklı aşağı geçiş çifti vardır.",
            "Tek atom 4→3→2→1 zinciriyle en fazla 3 foton yayabilir.",
            "A iki farklı sayımın doğru sonucudur; tek atom bütün altı oku aynı inişte kullanamaz.",
          ],
          optionReasons: [
            "Doğru:altı olası çizgi, tek zincirde en çok üç foton.",
            "Çizgi çeşitliliği tek atomun foton sayısına kopyalanmıştır.",
            "Düzey sayıları doğrudan cevap değildir.",
            "İki farklı sayımın sırası ters çevrilmiştir.",
            "Her çift iki kez sayılmış ve tek zincire fazladan geçiş eklenmiştir.",
          ],
          commonError:
            "n(n−1)/2 sayısını tek atomun bir dönüşte yaydığı foton sayısı diye kullanma.",
          check:
            "Altı farklı oku listele; tek bir 4→3→2→1 yolunda bunlardan üçünün bulunduğunu göster.",
        },
      },
      {
        prompt:
          "Hidrojenin n=3’ten n=2’ye ve n=3’ten n=1’e geçişleri karşılaştırılıyor. İlk geçişin serisi ve ikinci fotonun ilkine göre enerji durumu nedir?",
        options: [
          "Balmer; daha büyük",
          "Lyman; aynı",
          "Balmer; daha küçük",
          "Paschen; aynı",
          "Lyman; daha küçük",
        ],
        answer: 0,
        hint: "Seriyi son düzeyden bul; enerji farklarını aynı başlangıç düzeyinde karşılaştır.",
        explanation:
          "3→2 geçişi son n=2 olduğu için Balmer serisindedir. 3→1, aynı üst düzeyden daha düşük enerjiye iner; daha büyük fark bırakır. İkinci fotonun enerjisi daha büyüktür; A doğru.",
        guidance: {
          knowledge: [
            "Hidrojen serisi son düzeyle adlandırılır; n=2 Balmer, n=1 Lyman’dır.",
          ],
          strategy:
            "Seriyi son düzeyden bul; enerji farklarını aynı başlangıç düzeyinde karşılaştır.",
          steps: [
            "3→2 geçişi son n=2 olduğu için Balmer serisindedir.",
            "3→1, aynı üst düzeyden daha düşük enerjiye iner; daha büyük fark bırakır.",
            "İkinci fotonun enerjisi daha büyüktür; A doğru.",
          ],
          optionReasons: [
            "Doğru:Balmer ve daha büyük ikinci enerji.",
            "Lyman son 1 içindir; ilk geçişin adı olamaz.",
            "Seri doğru fakat daha derine inişin farkı ters yorumlanır.",
            "Paschen son n=3 ister; burada son 2’dir.",
            "İlk geçişin son düzeyi yanlış okunur; enerji sırası da terstir.",
          ],
          commonError:
            "Seriyi başlangıç düzeyi n=3’e bakarak Paschen diye adlandırma.",
          check:
            "E₃−E₁ ile E₃−E₂ farklarında E₁’in daha negatif olduğunu kontrol et.",
        },
      },
      {
        prompt:
          "Modern atom modelinde n=3 kabuğu için orbital sayısı n², en çok elektron sayısı 2 n². Bir orbitalin kapasitesi de en çok 2. Hangi ifade doğrudur?",
        options: [
          "9 orbital ve 9 elektron",
          "3 orbital ve 6 elektron",
          "18 orbital ve 36 elektron",
          "9 orbital ve 18 elektron üst sınırı",
          "6 orbital ve 9 elektron",
        ],
        answer: 3,
        hint: "n=3’ü iki bağıntıya ayrı koy; kapasiteyle doluluk durumunu ayır.",
        explanation:
          "Orbital sayısı 3²=9 olur. Her orbitalin kapasitesi 2 olduğundan toplam üst sınır 18 elektrondur. D doğru üst sınırı verir; bu kabukta mutlaka 18 elektron bulunduğunu söylemez.",
        guidance: {
          knowledge: [
            "Kabuğun orbital sayısıyla elektron kapasitesi farklı sayımlardır.",
          ],
          strategy:
            "n=3’ü iki bağıntıya ayrı koy; kapasiteyle doluluk durumunu ayır.",
          steps: [
            "Orbital sayısı 3²=9 olur.",
            "Her orbitalin kapasitesi 2 olduğundan toplam üst sınır 18 elektrondur.",
            "D doğru üst sınırı verir; bu kabukta mutlaka 18 elektron bulunduğunu söylemez.",
          ],
          optionReasons: [
            "Orbital sayısı doğru ama orbital başına iki kapasitesini atlar.",
            "n² yerine n kullanır.",
            "Orbital sayısına iki katsayısını iki kez taşır.",
            "Doğru:9 orbital, kapasite 18 elektron.",
            "Orbital ve kapasite bağıntılarıyla uyuşmaz.",
          ],
          commonError:
            "Kabuk kapasitesini belirli bir atomun gerçek elektron doluluğu sanma.",
          check:
            "9 orbitalin her birine en çok 2 konunca 9·2=18 olduğunu doğrula.",
        },
      },
      {
        prompt:
          "Bohr yörüngesi, modern orbital ve elektron spini için hangi ifade uygundur?",
        options: [
          "Modern kuramda enerji düzeyleri zorunlu sürekli olur",
          "Orbital, elektronun her an izlediği kesin çembersel raydır",
          "Modern betim olasılık dağılımını kullanır; spin içsel açısal özelliktir",
          "Spin, klasik katı bir topun kendi ekseni etrafında dönmesiyle tamamen özdeştir",
          "Belirsizlik yalnız alet bozukluğundan doğar",
        ],
        answer: 2,
        hint: "Tarihsel çizim benzetmelerini modern modelin gerçek iddiasından ayır.",
        explanation:
          "Bohr çemberleri tarihsel modelin belirli yörüngeleridir. Modern orbital kesin bir iz yolu yerine uzaysal kuantum durumuyla ilişkilidir. Spin de klasik top dönüşüne indirgenmez; C iki kavramı doğru sınırla açıklar.",
        guidance: {
          knowledge: [
            "Modern atomda orbital olasılık betimi, spin içsel kuantum özelliğidir; kesin klasik ray zorunlu değildir.",
          ],
          strategy:
            "Tarihsel çizim benzetmelerini modern modelin gerçek iddiasından ayır.",
          steps: [
            "Bohr çemberleri tarihsel modelin belirli yörüngeleridir.",
            "Modern orbital kesin bir iz yolu yerine uzaysal kuantum durumuyla ilişkilidir.",
            "Spin de klasik top dönüşüne indirgenmez; C iki kavramı doğru sınırla açıklar.",
          ],
          optionReasons: [
            "Modern model de kesikli bağlı enerji düzeylerini içerir.",
            "Orbitale klasik yörünge anlamı yükler.",
            "Doğru:olasılık betimi ve içsel spin ayrılır.",
            "Spin benzetmesini fiziksel özdeşlik yapar.",
            "Kuantum belirsizliği yalnız cihaz kusuru değildir.",
          ],
          commonError:
            "Elektron bulutunu küçük topun hızlı dönmesiyle oluşan bulanık bir halka sanma.",
          check:
            "Orbitalin neyi verdiğini ve neyi kesin bir yol olarak vermediğini ayrı söyle.",
        },
      },
      {
        prompt:
          "Franck–Hertz düzeninde elektronlar, atomlara belirli eşiklerde kesikli enerji aktararak iç düzeylerini uyarıyor. Hangi yorum doğrudur?",
        options: [
          "Kesikli aktarım atom düzeylerini destekler; uyarıcı çarpışma esnek değildir, toplam enerji korunur",
          "Deney yalnız bütün atomların iç yapısız katı küre olduğunu gösterir",
          "Uyarıcı çarpışma esnektir; toplam kinetik enerji mutlaka korunur",
          "Her elektron enerjisinin tamamını zorunlu aynı anda verir",
          "Atom iç enerjisi artınca toplam enerji korunumu bozulur",
        ],
        answer: 0,
        hint: "Kinetik enerji korunması ile bütün enerji bütçesinin korunmasını ayır.",
        explanation:
          "Elektronun kaybettiği belirli enerji miktarı atomun izinli iç düzey farkına gidebilir. Bu aktarım toplam kinetik enerjiyi azaltır; uyarıcı süreç esnek olmayan çarpışma olarak değerlendirilir. Atom iç enerjisiyle birlikte toplam bütçe korunur; kesikli aktarım da enerji düzeylerine kanıttır.",
        guidance: {
          knowledge: [
            "Uyarılmada kinetik enerjinin bir bölümü atom iç enerjisine dönüşür; toplam enerji korunur.",
          ],
          strategy:
            "Kinetik enerji korunması ile bütün enerji bütçesinin korunmasını ayır.",
          steps: [
            "Elektronun kaybettiği belirli enerji miktarı atomun izinli iç düzey farkına gidebilir.",
            "Bu aktarım toplam kinetik enerjiyi azaltır; uyarıcı süreç esnek olmayan çarpışma olarak değerlendirilir.",
            "Atom iç enerjisiyle birlikte toplam bütçe korunur; kesikli aktarım da enerji düzeylerine kanıttır.",
          ],
          optionReasons: [
            "Doğru:kesikli düzey ve enerji dönüşümü birlikte korunur.",
            "Kesikli iç düzey gözlemi iç yapısız atom resmiyle aynı iddia değildir.",
            "İç enerji artışına karşın kinetik enerjiyi sabit tutar.",
            "Elektron aktarımdan sonra kalan kinetik enerjiyle ayrılabilir.",
            "İç enerji hesaba katılırsa toplam enerji korunur.",
          ],
          commonError: "Esnek olmayanı enerji korunmayan diye adlandırma.",
          check:
            "Kilk=Kson+ΔEatom bütçesini örnek bir uyarılma enerjisiyle doğrula.",
        },
      },
      {
        prompt:
          "Modern atom yaklaşımında de Broglie dalgası ile bir radyo dalgası karşılaştırılıyor. Hangisi doğrudur?",
        options: [
          "Madde dalgası varsa bütün enerji düzeyleri yok olur",
          "İkisi de mutlaka havadaki basınç dalgasıdır",
          "Elektrona ilişkin de Broglie betimi, maddenin kuantum dalga özelliğidir; radyo elektromanyetiktir",
          "Elektronun madde dalgası mutlaka görünür kırmızı ışık olur",
          "Radyo dalgasının yayılması için elektronun klasik çembersel yörüngesi zorunludur",
        ],
        answer: 2,
        hint: "Dalga sözcüğünü ortak kullanmanın iki fiziksel betimi özdeşleştirmediğini göster.",
        explanation:
          "De Broglie bağıntısı bir taneciğin momentumuyla dalga boyunu ilişkilendirir. Radyo dalgası elektromanyetik alanın yayılan bir biçimidir. C iki dalga kavramının farklı bağlamını korur; madde dalgasını görünür renkli ışık diye adlandırmaz.",
        guidance: {
          knowledge: [
            "Madde dalgası kuantum durumunun betimidir; radyo dalgası değişen E ve B alanlarıyla ilişkilidir.",
          ],
          strategy:
            "Dalga sözcüğünü ortak kullanmanın iki fiziksel betimi özdeşleştirmediğini göster.",
          steps: [
            "De Broglie bağıntısı bir taneciğin momentumuyla dalga boyunu ilişkilendirir.",
            "Radyo dalgası elektromanyetik alanın yayılan bir biçimidir.",
            "C iki dalga kavramının farklı bağlamını korur; madde dalgasını görünür renkli ışık diye adlandırmaz.",
          ],
          optionReasons: [
            "Kuantum dalga yaklaşımı kesikli bağlı düzeylerle uyumludur.",
            "Hem elektromanyetik hem madde dalgasını sese indirger.",
            "Doğru:iki betimin fiziksel taşıdığı bilgi ayrıdır.",
            "Elektronun kuantum betimi bir görünür ışık rengi değildir.",
            "Klasik atom yörüngesi radyo yayılmasının zorunlu taşıyıcısı değildir.",
          ],
          commonError:
            "Her dalgayı elektromanyetik dalga veya ses dalgası olarak iki sınıfa zorla sıkıştırma.",
          check:
            "Elektron için momentum ilişkisini, radyo için E-B alanlarını iki ayrı başlangıç olarak yaz.",
        },
      },
    ],
  },
];

export const forge023PhysicsTopics: Record<string, string> = Object.fromEntries(
  packs023.map((p) => [p.id, p.topic]),
);
export const forge023PhysicsGuides: LessonGuide[] = packs023.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: p.source,
}));
export const forge023PhysicsLessons: Lesson[] = packs023.map((p) => ({
  id: p.id,
  subjectId: "ayt-fizik",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  body: p.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  source: txt(p.source),
  tags: [p.topic, "Özgün öğretim soruları"],
  questions: p.items.map((q, i) => ({
    id: `f023-${p.id}-${i + 1}`,
    prompt: txt(q.prompt),
    options: q.options.map(txt),
    answer: q.answer,
    hint: txt(q.hint),
    explanation: txt(q.explanation),
    guidance: q.guidance,
    skill: p.id,
  })),
}));
