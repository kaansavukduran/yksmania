import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

function finite026(v: unknown, min: number, max: number): asserts v is number {
  if (typeof v !== "number" || !Number.isFinite(v) || v < min || v > max)
    throw new RangeError("PHYSICS026_NUMBER_SCOPE");
}
function choice026<T extends string>(
  v: unknown,
  choices: readonly T[],
): asserts v is T {
  if (typeof v !== "string" || !choices.includes(v as T))
    throw new RangeError("PHYSICS026_CHOICE_SCOPE");
}
/** A known additive zero offset is removed; spread is not a confidence interval. */
export function measurement026(
  readings: readonly number[],
  offset: number,
  resolution: number,
) {
  if (!Array.isArray(readings) || readings.length < 2 || readings.length > 20)
    throw new RangeError("PHYSICS026_READINGS");
  finite026(offset, -10000, 10000);
  finite026(resolution, 0.000001, 100);
  const values = Array.from(readings);
  for (const value of values) finite026(value, -1000000, 1000000);
  const corrected = values.map((v) => v - offset),
    indicatedMean = values.reduce((a, b) => a + b, 0) / values.length,
    mean = corrected.reduce((a, b) => a + b, 0) / values.length,
    spread = Math.max(...values) - Math.min(...values);
  return {
    readings: values,
    corrected,
    offset,
    resolution,
    indicatedMean,
    mean,
    spread,
    halfRange: spread / 2,
    halfStep: resolution / 2,
    scope:
      "Aynı büyüklüğün tekrarlı okumaları ve bilinen sabit sıfır sapması. Aralık tekrar yayılımıdır; çözünürlük tek başına doğruluğu veya güven aralığını belirlemez.",
  };
}
export const dimensions026 = {
  length: {
    name: "Uzunluk",
    unit: "m",
    vector: false,
    base: true,
    powers: [0, 1, 0, 0, 0, 0, 0],
  },
  mass: {
    name: "Kütle",
    unit: "kg",
    vector: false,
    base: true,
    powers: [1, 0, 0, 0, 0, 0, 0],
  },
  time: {
    name: "Zaman",
    unit: "s",
    vector: false,
    base: true,
    powers: [0, 0, 1, 0, 0, 0, 0],
  },
  current: {
    name: "Akım şiddeti",
    unit: "A",
    vector: false,
    base: true,
    powers: [0, 0, 0, 1, 0, 0, 0],
  },
  temperature: {
    name: "Sıcaklık",
    unit: "K",
    vector: false,
    base: true,
    powers: [0, 0, 0, 0, 1, 0, 0],
  },
  amount: {
    name: "Madde miktarı",
    unit: "mol",
    vector: false,
    base: true,
    powers: [0, 0, 0, 0, 0, 1, 0],
  },
  luminous: {
    name: "Işık şiddeti",
    unit: "cd",
    vector: false,
    base: true,
    powers: [0, 0, 0, 0, 0, 0, 1],
  },
  displacement: {
    name: "Yer değiştirme",
    unit: "m",
    vector: true,
    base: false,
    powers: [0, 1, 0, 0, 0, 0, 0],
  },
  speed: {
    name: "Sürat",
    unit: "m/s",
    vector: false,
    base: false,
    powers: [0, 1, -1, 0, 0, 0, 0],
  },
  velocity: {
    name: "Hız",
    unit: "m/s",
    vector: true,
    base: false,
    powers: [0, 1, -1, 0, 0, 0, 0],
  },
  acceleration: {
    name: "İvme",
    unit: "m/s²",
    vector: true,
    base: false,
    powers: [0, 1, -2, 0, 0, 0, 0],
  },
  force: {
    name: "Kuvvet",
    unit: "N",
    vector: true,
    base: false,
    powers: [1, 1, -2, 0, 0, 0, 0],
  },
  energy: {
    name: "Enerji",
    unit: "J",
    vector: false,
    base: false,
    powers: [1, 2, -2, 0, 0, 0, 0],
  },
  power: {
    name: "Güç",
    unit: "W",
    vector: false,
    base: false,
    powers: [1, 2, -3, 0, 0, 0, 0],
  },
  pressure: {
    name: "Basınç",
    unit: "Pa",
    vector: false,
    base: false,
    powers: [1, -1, -2, 0, 0, 0, 0],
  },
  density: {
    name: "Özkütle",
    unit: "kg/m³",
    vector: false,
    base: false,
    powers: [1, -3, 0, 0, 0, 0, 0],
  },
} as const;
export type Dimension026 = keyof typeof dimensions026;
export function dimensionProduct026(
  factors: readonly { quantity: Dimension026; power: number }[],
) {
  if (!Array.isArray(factors) || factors.length < 1 || factors.length > 8)
    throw new RangeError("PHYSICS026_FACTORS");
  const powers = [0, 0, 0, 0, 0, 0, 0];
  for (const factor of Array.from(
    factors as readonly { quantity: Dimension026; power: number }[],
  )) {
    if (
      !factor ||
      typeof factor.quantity !== "string" ||
      !Object.hasOwn(dimensions026, factor.quantity) ||
      !Number.isInteger(factor.power) ||
      Math.abs(factor.power) > 4
    )
      throw new RangeError("PHYSICS026_DIMENSION");
    dimensions026[factor.quantity].powers.forEach(
      (v, i) => (powers[i] += v * factor.power),
    );
  }
  return {
    powers,
    units: ["kg", "m", "s", "A", "K", "mol", "cd"].map((unit, i) => ({
      unit,
      power: powers[i],
    })),
    scope:
      "Boyut eşitliği gerekli bir kontroldür; sayısal katsayıyı, vektör işlemini veya fizik yasasının geçerliliğini tek başına kanıtlamaz.",
  };
}
/** Grams and cubic centimetres; partial immersion supplies an upper bound, not the density. */
export function density026(
  totalMass: number,
  tare: number,
  startVolume: number,
  endVolume: number,
  immersion: "full" | "partial",
) {
  finite026(totalMass, 0.001, 10000);
  finite026(tare, 0, 9999);
  finite026(startVolume, 0, 9999);
  finite026(endVolume, 0.001, 10000);
  choice026(immersion, ["full", "partial"]);
  if (totalMass <= tare || endVolume <= startVolume)
    throw new RangeError("PHYSICS026_DENSITY_ORDER");
  const mass = totalMass - tare,
    displaced = endVolume - startVolume,
    ratio = mass / displaced;
  return {
    mass,
    displaced,
    immersion,
    density: immersion === "full" ? ratio : null,
    densitySI: immersion === "full" ? ratio * 1000 : null,
    upperBound: immersion === "partial" ? ratio : null,
    scope:
      "Cisim çözünmez, sıvı emmez; taşma ve hapsolmuş hava yok. Tam batmada dış hacim, kısmi batmada yalnız batan hacim bulunur. Kısmi hacimle m/V tüm cismin özkütlesi değil üst sınırıdır.",
  };
}
export function mixture026(
  d1: number,
  d2: number,
  v1: number,
  v2: number,
  finalVolume: number,
) {
  finite026(d1, 0.01, 30);
  finite026(d2, 0.01, 30);
  finite026(v1, 0.01, 10000);
  finite026(v2, 0.01, 10000);
  finite026(finalVolume, 0.01, 30000);
  const m1 = d1 * v1,
    m2 = d2 * v2,
    mass = m1 + m2;
  return {
    m1,
    m2,
    mass,
    initialVolume: v1 + v2,
    finalVolume,
    volumeChange: finalVolume - v1 - v2,
    density: mass / finalVolume,
    additiveDensity: mass / (v1 + v2),
    scope:
      "Kapalı karışımda kütle kaybı ve kimyasal tepkime yok; son hacim aynı koşulda ölçülen ayrı veridir. Hacimler toplanabilir kabulü yalnız ek karşılaştırma değerinde kullanılır.",
  };
}
export function similarity026(scale: number) {
  finite026(scale, 0.1, 10);
  return {
    scale,
    areaFactor: scale ** 2,
    volumeFactor: scale ** 3,
    massFactor: scale ** 3,
    relativeSupportFactor: 1 / scale,
    absoluteLoadFactor: scale ** 2,
    scope:
      "Geometrik benzerlik, aynı malzeme/özkütle ve aynı izinli gerilme varsayılır. Kesit kapasitesi alanla; kendi ağırlığı hacimle ölçeklenir. Burkulma, kusur ve yapı ayrıntısı çözülmez.",
  };
}
export function capillary026(
  radiusMm: number,
  surfaceTension: number,
  angleDegrees: number,
  densitySI: number,
  gravity = 10,
) {
  finite026(radiusMm, 0.05, 5);
  finite026(surfaceTension, 0.001, 1);
  finite026(angleDegrees, 0, 180);
  finite026(densitySI, 100, 20000);
  finite026(gravity, 1, 20);
  const cosine =
      angleDegrees === 90 ? 0 : Math.cos((angleDegrees * Math.PI) / 180),
    heightM =
      (2 * surfaceTension * cosine) / ((densitySI * gravity * radiusMm) / 1000);
  return {
    heightM,
    heightMm: heightM * 1000,
    cosine,
    scope:
      "Düşey dairesel ince tüp, açık geniş hazne, statik denge ve aynı dış gaz basıncı; temas açısı sıvı içinden ölçülür. Menisküs hacmi ve sonlu tüp etkisi ihmal edilir; kan dolaşımı modeli değildir.",
  };
}
export type MotionSegment026 = { duration: number; acceleration: number };
export function motion026(
  initialVelocity: number,
  pieces: readonly MotionSegment026[],
  elapsed: number,
  frameVelocity = 0,
  origin = 0,
) {
  finite026(initialVelocity, -100, 100);
  finite026(frameVelocity, -100, 100);
  finite026(origin, -10000, 10000);
  if (!Array.isArray(pieces) || pieces.length < 1 || pieces.length > 3)
    throw new RangeError("PHYSICS026_SEGMENTS");
  let t = 0,
    x = origin,
    v = initialVelocity,
    distance = 0;
  const turns: number[] = [];
  const segments = Array.from(pieces).map((piece) => {
    if (!piece) throw new RangeError("PHYSICS026_SEGMENT");
    finite026(piece.duration, 0, 60);
    finite026(piece.acceleration, -50, 50);
    const dt = piece.duration,
      a = piece.acceleration,
      start = { t, x, v },
      frameStartV = v - frameVelocity,
      dx = frameStartV * dt + (a * dt * dt) / 2,
      turn = a === 0 ? -1 : -frameStartV / a;
    let path = Math.abs(dx);
    if (turn > 0 && turn < dt) {
      const before = frameStartV * turn + (a * turn * turn) / 2;
      path = Math.abs(before) + Math.abs(dx - before);
      turns.push(t + turn);
    }
    x += v * dt + (a * dt * dt) / 2;
    v += a * dt;
    t += dt;
    distance += path;
    return {
      ...piece,
      start,
      end: { t, x, v },
      frameDisplacement: dx,
      distance: path,
    };
  });
  // A zero at a shared phase boundary is a turn only when the velocities
  // immediately before and after it have opposite signs. Zero-duration phases
  // add no motion; a finite stationary interval has no single isolated turn.
  const movingPhases = segments.filter((part) => part.duration > 0);
  for (let i = 1; i < movingPhases.length; i++) {
    const left = movingPhases[i - 1],
      right = movingPhases[i];
    if (
      left.end.v === frameVelocity &&
      right.start.v === frameVelocity &&
      left.acceleration * right.acceleration > 0
    )
      turns.push(right.start.t);
  }
  turns.sort((a, b) => a - b);
  finite026(elapsed, 0, t);
  const sample = (at: number) => {
    const part = segments.find(
      (p) => p.duration > 0 && at >= p.start.t && at < p.end.t,
    );
    if (!part)
      return {
        t: at,
        x: x - frameVelocity * at,
        v: v - frameVelocity,
        a: null,
      };
    const dt = at - part.start.t,
      a = part.acceleration;
    return {
      t: at,
      x:
        part.start.x +
        part.start.v * dt +
        (a * dt * dt) / 2 -
        frameVelocity * at,
      v: part.start.v + a * dt - frameVelocity,
      a,
    };
  };
  const displacement = x - origin - frameVelocity * t;
  return {
    totalTime: t,
    worldFinalX: x,
    worldFinalV: v,
    displacement,
    distance,
    averageVelocity: t === 0 ? null : displacement / t,
    averageSpeed: t === 0 ? null : distance / t,
    current: sample(elapsed),
    turns,
    segments,
    samples: Array.from({ length: 121 }, (_, i) =>
      sample(i === 120 ? t : (t * i) / 120),
    ),
    scope:
      "Bir boyutta en çok3 sabit ivme evresi; aynı başlangıçta çakışan, sabit u hızlı gözlemci. Yol ve yer değiştirme seçili gözlemciye göredir. İç evre sınırında sağ evrenin ivmesi alınır; deney sonunda ivme belirtilmez. Sonraki hareket varsayılmaz.",
  };
}
/** Forward sliding along a straight ramp; the model stops at the first exhausted kinetic budget. */
export function rampEnergy026(
  mass: number,
  initialSpeed: number,
  drive: number,
  resistance: number,
  slope: number,
  requestedDistance: number,
  gravity = 10,
) {
  finite026(mass, 0.1, 100);
  finite026(initialSpeed, 0, 50);
  finite026(drive, 0, 500);
  finite026(resistance, 0, 200);
  finite026(slope, -0.5, 0.5);
  finite026(requestedDistance, 0, 100);
  finite026(gravity, 1, 20);
  const initialK = (mass * initialSpeed ** 2) / 2,
    netForce = drive - resistance - mass * gravity * slope;
  const stopDistance = netForce < 0 ? initialK / -netForce : null;
  let distance = requestedDistance;
  if (initialK === 0 && netForce <= 0) distance = 0;
  else if (stopDistance !== null && requestedDistance > stopDistance)
    distance = stopDistance;
  const reached = distance === requestedDistance,
    finalK =
      !reached || (stopDistance !== null && distance === stopDistance)
        ? 0
        : Math.max(0, initialK + netForce * distance),
    finalSpeed = Math.sqrt((2 * finalK) / mass),
    driveWork = drive * distance,
    thermalGain = resistance * distance,
    potentialChange = mass * gravity * slope * distance;
  return {
    mass,
    initialK,
    netForce,
    stopDistance,
    requestedDistance,
    distance,
    reached,
    finalK,
    finalSpeed,
    driveWork,
    thermalGain,
    potentialChange,
    netWork: netForce * distance,
    elapsed: distance === 0 ? 0 : (2 * distance) / (initialSpeed + finalSpeed),
    scope:
      "Noktasal cisim ileri kayar; sabit itiş ve harekete zıt sabit direnç, h=s·sinθ. Direnç kayarken iç enerjiye dönüşür. Bütçe bitince ileri izleme durur; geri kayma ve statik sürtünme çözülmez. Başlangıçta ileri enerji/ivme yoksa ilerleme varsayılmaz.",
  };
}
export function springEnergy026(stiffness: number, start: number, end: number) {
  finite026(stiffness, 1, 1000);
  finite026(start, -1.5, 1.5);
  finite026(end, -1.5, 1.5);
  const initialU = (stiffness * start ** 2) / 2,
    finalU = (stiffness * end ** 2) / 2;
  return {
    stiffness,
    start,
    end,
    initialU,
    finalU,
    change: finalU - initialU,
    springWork: initialU - finalU,
    externalQuasistaticWork: finalU - initialU,
    initialForce: -stiffness * start,
    finalForce: -stiffness * end,
    scope:
      "İdeal kütlesiz Hooke yayı, belirtilen aralığın tümünde esneklik sınırı aşılmaz. x doğal boydan işaretli sapma; dış iş ifadesi çok yavaş değişim içindir. Yay sabiti tek başına esneklik sınırını vermez.",
  };
}
export function powerLedger026(
  inputPower: number,
  seconds: number,
  usefulFraction: number,
) {
  finite026(inputPower, 0, 1000000);
  finite026(seconds, 0, 86400);
  finite026(usefulFraction, 0, 1);
  const inputEnergy = inputPower * seconds;
  return {
    inputPower,
    seconds,
    usefulFraction,
    inputEnergy,
    usefulPower: inputPower * usefulFraction,
    usefulEnergy: inputEnergy * usefulFraction,
    otherEnergy: inputEnergy * (1 - usefulFraction),
    kWh: inputEnergy / 3600000,
    measuredEfficiency: inputEnergy === 0 ? null : usefulFraction,
    scope:
      "Sabit giriş gücü ve seçilmiş yararlı çıktı tanımı; verilen pay bir model katsayısıdır. Giriş enerjisi0 ise çıktı/giriş oranı ölçülemez. Diğer enerji yok olmaz; bu oran ısı pompası COP değeri değildir.",
  };
}

type Pack026 = LessonGuide & {
  detail: string;
  title: string;
  questions: Question[];
};
const packs026: Pack026[] = [
  {
    id: "fizik-bilimine-giris",
    detail: "detail-114",
    title: "Fizik bilimine giriş: ölç, modelle, sınırını bil",
    minutes: 120,
    objectives: [
      "Ölçülebilir bir soruyu değişken, model varsayımı ve sınanabilir öngörüyle kur.",
      "SI temel büyüklüklerini, birim türetmeyi ve skaler–vektörel ayrımını bağımsız kullan.",
      "Kalibrasyon, çözünürlük, tekrar yayılımı ve belirsizlik için verinin izin verdiği sonucu seç.",
      "Birim, boyut, grafik ve kontrollü karşılaştırmayı birlikte kullanarak özgün ileri alıştırmaları çöz.",
    ],
    sections: [
      {
        title: "Fizik sorusu ölçülebilir ilişki arar",
        paragraphs: [
          "Fizik, madde ve enerjinin hareketini ve etkileşimlerini ölçülebilir büyüklüklerle inceler. Önce neyin ölçüleceğini söyle: “Bu araç iyi gidiyor.” yerine “Aynı yükle 10 saniyede aldığı yol nasıl değişiyor?” sorusu kurulabilir. Uzunluk, süre, kütle gibi nicelikleri adlandırmak; gözlemle sayısal iddiayı birbirine bağlar. Sayının yanında birim ve ölçüm koşulu bulunur.",
          "Model, seçilen ilişkiyi incelemek için gerçeğin bazı ayrıntılarını dışarıda bırakır. Noktasal cisim kabulü dönmeyi, dirençsiz hareket kabulü hava etkisini bu hesapta izlemediğini bildirir. Önce sistemin sınırını ve modelin hangi aralıkta sınandığını yaz. Sonuç, ancak bu koşullar ve ölçüm belirsizliği içinde bir öngörüdür; modelde çizilen her ayrıntı gerçek dünyada ayrıca ölçülmüş veri değildir.",
        ],
      },
      {
        title: "Alanları sorudaki mekanizmaya göre ayır",
        paragraphs: [
          "Fiziğin alt alanlarını olayın mekanizmasıyla ilişkilendir: hareket ve kuvvet mekanikte; yük, akım ve alan elektrik ve manyetizmada; ışığın yayılması optikte; sıcaklık ve enerji aktarımı termodinamikte incelenir. Atomun elektron durumları atom fiziğine, çekirdek yapısı ve tepkimeleri nükleer fiziğe doğrudan bağlanır. Katıhal fiziği kristal yapı, bantlar ve katı malzemelerin ortak davranışıyla ilgilenir.",
          "Tek bir aygıt birden çok alanın bilgisini kullanabilir. Bir görüntüleme sisteminde çekirdek, manyetik alan ve elektronik algılama birlikte yer alabilir; aygıtta “atom” sözcüğünün geçmesi her aşamayı aynı alana dönüştürmez. Parçacıkların çok yüksek enerjide etkileşimiyle gök cisimlerinin büyük ölçekli davranışı da farklı araştırma sorularıdır. Alan seçerken soruda özellikle incelenen süreci ve ölçeği kullan; kurum adı tek başına mekanizma değildir.",
        ],
      },
      {
        title: "Yedi temel büyüklük; yedi temel birim",
        paragraphs: [
          "SI için yedi temel büyüklük ve birim eşleşmesi şöyledir: uzunluk–metre (m), kütle–kilogram (kg), zaman–saniye (s), elektrik akımı şiddeti–amper (A), termodinamik sıcaklık–kelvin (K), madde miktarı–mol (mol), ışık şiddeti–kandela (cd). Niceliğin sembolü ile birimin sembolü aynı görevde değildir: m kütle sembolü olarak kullanılsa da sayının ardından m yazılması metreyi gösterir.",
          "Bu temel nicelikler birim sisteminin seçilmiş başlangıçlarıdır; diğerlerini değersiz yapmaz. Güncel SI birimleri sabitlerin belirlenmiş değerleriyle tanımlanır, gerçek ölçüm ise bir araç ve kalibrasyonla yapılır. Birim adları küçük harfle yazılır; kişi adından gelen N, J, W gibi birim sembolleri büyük harftir. Kelvin K ile gösterilir; °K yazılmaz. Temel birim ile ölçüm aygıtını karıştırma: saniye birimdir, kronometre araçtır.",
        ],
      },
      {
        title: "Türetilmiş olmak, daha az önemli olmak değildir",
        paragraphs: [
          "Türetilmiş büyüklüğün birimi temel birimlerin bağıntısıyla ifade edilir. Sürat m/s, ivme m/s², kuvvet kg·m/s², enerji kg·m²/s² ve güç kg·m²/s³ birimine sahiptir. Özkütle kg/m³, basınç N/m² ile yazılır. Örneğin birim hacimde kütle aradığında kütleyi hacme bölersin; hacim başına kuvvet arandığında basınç tanımını kullanmış olmazsın.",
          "Türetilmiş bir nicelik de kalibre bir sensörle okunabilir. Bir aracın basınç göstermesi onu SI temel niceliği yapmaz; bir uzunluğu dolaylı yöntemle bulmak da uzunluğu türetilmiş niceliğe çevirmez. Birimin açılımı büyüklüğün boyutunu denetler, fiziksel anlamın tümünü vermez. Enerjiyle kuvvet momenti aynı N·m birimiyle ifade edilebilse de farklı fiziksel niceliklerdir; aynı boyut, aynı işlem veya aynı anlam demek değildir.",
        ],
      },
      {
        title: "İki sınıflamayı çapraz kontrol et",
        paragraphs: [
          "Temel–türetilmiş ayrımı birim sisteminin kuruluşuna; skaler–vektörel ayrımı büyüklüğün yönle nasıl davrandığına ilişkindir. Kütle, süre, sıcaklık, enerji ve sürat skaler örnekleridir. Hız, ivme ve kuvvet yönlüdür. Süratin m/s, hızın da m/s ile ölçülmesi onların aynı nicelik olduğunu göstermez: birinde gidilen yolun büyüklüğü, diğerinde işaretli yer değiştirme vardır.",
          "Bir skaler sayı negatif olabilir; işaret tek başına vektör kanıtı değildir. Bir vektörün tek eksendeki bileşeni de işaretli bir sayı ile temsil edilebilir; yönün hangi eksene göre pozitif sayıldığı belirtilir. Okun büyüklüğü ile bileşenini ayır: hız bileşeni −4 m/s iken sürat 4 m/s’tir. Skaler toplama ile farklı yönlü vektörleri toplama aynı işlem değildir; sağa ve sola etkiler işaretleriyle birlikte değerlendirilir.",
        ],
      },
      {
        title: "Ölçümün yanında yöntemini de söyle",
        paragraphs: [
          "Ölçüm kaydı; niceliği, aygıtı, aralığı, birimi ve yöntemi birlikte içerir. Cetvelde sıfırın uca denk gelip gelmediğini, dereceli kapta bakışın menisküse dikliğini, kronometrede başlatma yöntemini kontrol edersin. Aygıtın ölçebileceği aralık ile ayırt edebildiği en küçük adım farklıdır. 0–100 mm aralık ve 1 mm adım, her okumanın gerçek değerden en çok 1 mm uzak olacağına tek başına söz vermez.",
          "Tekrarlanan okumalar rastgele yayılımı görmeyi sağlar; ortak bir sıfır sapması bütün okumaları aynı yönde kaydırabilir. Aynı cetvelle çok tekrar yapmak bu ortak sapmayı kendiliğinden yok etmez. Ölçümün sınırını açıkça ver: örneğin yalnız gösterge yuvarlamasının ele alındığı bir modelde yarım adım sınırı kullanılabilir; toplam hata için diğer etkiler ayrıca incelenir. Çok basamaklı ekranda görülen sayı, kendi başına yüksek doğruluk kanıtı değildir.",
        ],
      },
      {
        title: "Sorudan sınanabilir öngörüye",
        paragraphs: [
          "Araştırma sorusu önce iki nicelik arasındaki ilişkiyi belirler. İdeal bir sarkaç için “uzunluk artarsa bir tam salınım süresi nasıl değişir?” sorusu ölçülebilir; başlangıç açısı ve yerel çekim gibi koşullar da belirtilir. Hipotez, belirli bir koşulda ne gözlenmesini beklediğini söyler. Bir açıklama her olası sonucu aynı biçimde kabul ediyorsa bu deneyle ayırt edilecek bir öngörü kurmamışsındır.",
          "Veri topladıktan sonra öngörüyle ölçümü belirsizlikleri içinde kıyasla. Uyumlu sonuç hipotezin her koşulda kanıtlandığı anlamına gelmez; belirli aralıkta destek sağlar. Uyumsuzlukta ölçüm, işlem, kontrol koşulları ve model kapsamı ayrı ayrı değerlendirilir. Deney sonucu ile sonradan kurulan yorumun kaydı ayrıdır. Aynı deneyin başkası tarafından aynı yöntemle tekrarlanabilmesi bilimsel değerlendirmeyi güçlendirir.",
        ],
      },
      {
        title: "Değişkenleri bir karşılaştırmada düzenle",
        paragraphs: [
          "Bağımsız değişken bilinçli olarak değiştirdiğin; bağımlı değişken ölçerek izlediğin niceliktir. Bir telin uzunluğunun elektrik direncine etkisini araştırırken aynı malzeme, aynı kesit ve aynı sıcaklık koşulları karşılaştırmayı anlamlı kılar. Uzunlukla birlikte tel cinsini de değiştirirsen gözlenen farkı yalnız uzunluğa bağlayamazsın. Kontrol edilen niceliğin deney boyunca gerçekten aynı tutulduğunu da kaydet.",
          "Bir deney için uygun kontrol düzeni soruya göre seçilir. Işığın bitki büyümesine etkisinde ışık dışındaki su ve besin koşulları da önemli olabilir; fiziksel aygıtta iki farklı sensör kullanılması yeni bir kalibrasyon etkisi doğurabilir. “İki şey birlikte arttı.” gözlemi tek başına neden ilişkisini kurmaz. Değişkenin etkisini ayıran karşılaştırma ve alternatif açıklamaları sınayan ek ölçüm gerekir.",
        ],
      },
      {
        title: "Kalibrasyon ve sıfır sapması",
        paragraphs: [
          "Sıfır sapması, gerçek sıfırda aygıtın sıfırdan farklı okumasıdır. Bilinen sabit bir +0,4 cm sapma varsa her gösterge okumasından 0,4 cm çıkarılır. Sapmanın işaretini koru: negatif sıfır sapmasında düzeltme ekleme yönündedir. Bu düzeltme, aygıtın aralık boyunca gerçekten sabit eklemeli sapma gösterdiği kabulüne dayanır; farklı ölçek hatasını aynı işlemle düzeltemezsin.",
          "Kalibrasyon, göstergenin bilinen referanslarla ilişkisinin belirlenmesidir. İki referans y = a·x + b gibi doğrusal bir yanıtın ölçek çarpanı ile sıfır kaymasını ayırabilir; tek sıfır kontrolü a’yı vermez. Referansın da belirsizliği vardır. Düzeltilmiş ortalama ile gerçek değer arasında kalan bilinmeyen farkı sırf işlem yaptığın için sıfır sayma. Laboratuvardaki eklemeli model, yalnız bilinen b etkisini kaldırır.",
        ],
      },
      {
        title: "Çözünürlük, tekrarlanabilirlik ve doğruluk",
        paragraphs: [
          "Çözünürlük, aygıtın birbirinden ayırabildiği değişim adımıyla ilişkilidir. Tekrarlanabilirlik, aynı koşulda alınan sonuçların birbirine yakınlığıdır. Doğruluk ise sonucun uygun referans değere yakınlığıyla ilişkilidir. Yakın çıkan beş okuma, tümü aynı kalibrasyon sapmasını taşıyorsa referansa yakın olmayabilir. Daha küçük gösterge adımı seçmek de ölçüm yöntemindeki başka bir ortak hatayı gidermez.",
          "Bu üç özelliği verinin kapsamına göre değerlendir. Tekrarlı ölçümlerin aralığı küçülmüşse yayılımın azaldığı söylenir; referans ölçümü verilmemişse doğruluğun ne kadar arttığını kesin hesaplayamazsın. Gösterge yuvarlaması, tepki süresi, bakış açısı ve ortam koşulları ayrı etkilerdir. Birim yazıldıktan sonra eklenen gereksiz ondalıklar ölçümü geliştirmez; rapordaki basamaklar aracın ve yöntemin sağladığı bilgiyle uyumlu olmalıdır.",
        ],
      },
      {
        title: "SI ön eklerini kuvvetiyle dönüştür",
        paragraphs: [
          "Ön ek birime uygulanır: 1 cm = 10⁻² m, 1 mm = 10⁻³ m, 1 ms = 10⁻³ s ve 1 μs = 10⁻⁶ s. Alan birimi dönüşürken uzunluk çarpanı karesini, hacimde küpünü alır. Bu yüzden 1 cm² = 10⁻⁴ m² ve 1 cm³ = 10⁻⁶ m³ olur. Aynı “santi” sözcüğü geçti diye her durumda yalnız yüze bölme işlemi yapılamaz.",
          "Bileşik birimde pay ve paydayı birlikte dönüştür. 1 g/cm³ = 10⁻³ kg / 10⁻⁶ m³ = 10³ kg/m³’tür. Zamanın karesini içeren mm/ms² biriminde hem milimetrenin hem milisaniyenin çarpanı hesaba katılır. Litre hacim birimidir: 1 L = 10⁻³ m³, 1 mL = 1 cm³. Dönüşümde niceliğin değerini değil, onu ifade eden birimle sayı çiftini değiştirirsin.",
        ],
      },
      {
        title: "Birimleri işlem boyunca yanında taşı",
        paragraphs: [
          "Bir eşitlikte toplanan terimler aynı tür niceliğin uyumlu birimleriyle ifade edilmelidir. 2 m ile 30 cm toplanabilir; önce 30 cm = 0,30 m yazılır ve sonuç 2,30 m olur. 2 m ile 3 s’nin toplamı uzunluk olarak yorumlanamaz. Çarpma ve bölmede birimler de sayılar gibi birlikte işlem görür; kg·m/s² ifadesi kuvvet boyutuna gider.",
          "Grafik eğimi de bir niceliktir. Düşey eksen kütle, yatay eksen hacim ise eğim kütle/hacim; eksenler yer değiştirirse hacim/kütle birimindedir. Eğimin yalnız çizginin kâğıttaki açısı olduğunu sanma: eksen ölçeği değişince çizgi açısı değişir, fiziksel oran değişmez. İki noktanın farkıyla Δy/Δx hesaplamak, birim ve sıfır kayması denetimini açık tutar.",
        ],
      },
      {
        title: "Boyut denetimi neyi söyleyebilir?",
        paragraphs: [
          "Boyut hesabında kütle M, uzunluk L ve zaman T gibi sembollerle niceliklerin birim yapısını izlersin. Enerjinin boyutu M·L²·T⁻² olduğundan m·v² bu boyuta uyar; m·v ise momentum boyutundadır. Bir eşitliğin iki tarafı farklı boyuttaysa sayısal değerler bir örnekte tesadüfen eşit çıksa bile ilişki bu biçimiyle fiziksel bir genel bağıntı olamaz.",
          "Boyut eşitliği bir eleme aracıdır. K = m·v² ile K = ½m·v² aynı boyuta sahip olduğu için ½ katsayısını bu denetim seçemez. Skaler çarpım, vektör çarpımı, yön işareti ve hangi koşulda modelin geçerli olduğu da ayrıca incelenir. Laboratuvardaki boyut defteri yalnız temel birim üslerini toplar; üretilen eşit boyutu bir doğa yasasının doğrulanması diye etiketlemez.",
        ],
      },
      {
        title: "Tek eksende ok ve bileşen",
        paragraphs: [
          "Pozitif ekseni sağa seçtiğinde sağ yönlü 5 birimlik bir vektörün bileşeni +5, sol yönlü aynı büyüklüğün bileşeni −5 olur. Vektörün büyüklüğü her iki durumda 5’tir. Eksen yönünü ters seçmek bileşen işaretini değiştirir; fiziksel oku kendiliğinden ters döndürmez. Bu ayrım konum, hız ve kuvvet işaretlerini birlikte okumada temel bir önkoşuldur.",
          "Bir boyutta ortak eksendeki vektörleri işaretli bileşenleriyle topla. +7 ile −3’ün bileşkesi +4 olur; büyüklükleri doğrudan toplayıp 10 demek yalnız aynı yön koşulunda uygundur. Bileşke sıfır olsa da tek tek etkileşimler sıfır olmak zorunda değildir. Bir cismin negatif konumda bulunması da o anda sola gittiğini söylemez; konum ve hız ayrı vektör bilgileridir.",
        ],
      },
      {
        title: "İki yöndeki bileşenlerden bileşkeye",
        paragraphs: [
          "Birbirine dik x ve y eksenlerinde vektör (Ax, Ay) ile gösterilebilir. İki vektörün bileşke bileşenleri ayrı toplanır: Rx = Ax + Bx ve Ry = Ay + By. Büyüklük, dik eksenler için √(Rx² + Ry²) olur. Tek tek büyüklüklerin toplamı yalnız aynı yön gibi özel koşullarda bileşke büyüklüğüne eşittir; farklı yönlerde bileşen bilgisi korunur.",
          "Aynı büyüklükte iki okun aynı vektör olması için yönleri de aynı olmalıdır. Saf bir vektörün eşitliğinde uygulama noktası her zaman tanımın parçası değildir; fakat bir katı cisme etki eden kuvvetin nerede uygulandığı dönme etkisini değiştirebilir. Bu durumda yalnız “aynı ok boyu” demek aynı mekanik sonucu garanti etmez. Fiziksel problemi incelerken niceliğin matematiksel vektörüyle sistemdeki etki yerini ayrı belirt.",
        ],
      },
      {
        title: "İşaret ve yönü bağlamıyla oku",
        paragraphs: [
          "Enerji aktarımında işaret, seçilmiş sisteme giriş veya çıkışa bağlı olabilir; sıcaklık değerindeki işaret kullanılan ölçeğin sıfırına bağlıdır. Bu işaretler yön oku değildir. Elektrik akımı şiddeti de SI temel skaler niceliğidir; bir devrede seçilen referans yöne göre işaretli ifade edilebilir. “Yönle ilgili bir kelime kullanıldı.” gerekçesiyle her niceliği vektör sınıfına taşıma.",
          "Bir soruda büyüklük türünü saptarken önce niceliğin tanımını kullan, sonra sembol ve birimi denetle. Hız vektörünün tek bir bileşeni sayı gibi yazılabilir; bu, hızın vektör niteliğini kaldırmaz. Basıncın bir yüzeye etkisi kuvvet yönünü belirlemeye yardım etse de basıncın kendisi skaler örneğidir. Sınıflandırma ile bir örnekte seçilen koordinat işaretini farklı sorular olarak tut.",
        ],
      },
      {
        title: "Tekrarlı okumaları özetle",
        paragraphs: [
          "Aynı büyüklük n kez okunursa aritmetik ortalama, okumalar toplamının n’ye bölümüdür. En büyük ile en küçük arasındaki fark tekrar aralığını verir. Bir dizinin ortalaması aynı kalırken yayılımı değişebilir; başka bir dizide bütün okumalar aynı miktarda kayınca yayılım aynı kalıp ortalama değişir. Ortak sıfır sapmasını kaldırmak ikinci durumun bilinen kısmını düzeltir.",
          "Aralık veya yarı aralık, bu küçük veri grubunun bir özetidir; otomatik bir yüzde güven sınırı değildir. Tekrarlı ölçüm sayısı ve hata modeli verilmeden her belirsizliğin 1/√n ile azaldığı söylenemez. Laboratuvar, okumaları, düzeltilmiş ortalamayı, toplam aralığı ve yarım gösterge adımını ayrı sunar. Bunları birleştiren bir istatistiksel belirsizlik hesabı yapıldığı izlenimi oluşturmaz.",
        ],
      },
      {
        title: "Doğru grafiğinde sıfır kayması",
        paragraphs: [
          "Bir sensör için gösterge y = a·x + b ise a yanıt çarpanı, b sıfır kaymasıdır. Grafikte iki noktanın farkından bulunan eğim a, ortak b’den etkilenmez. Buna karşılık tek bir noktada y/x oranı, b sıfır değilse eğimi vermez. Doğrunun orijinden geçip geçmediğini kontrol etmek, doğrudan oran ile fark oranını ayırır.",
          "Yalnız doğruya benzeyen çizim yeterli değildir; eksenler, birimler ve veri aralığı gerekir. Deney yalnız 0–10 aralığında sınanmışsa çok uzaktaki girdiler için aynı doğruyu kullanmak yeni bir varsayımdır. Aygıtın doyması veya başka bir fiziksel etki ilişkiyi değiştirebilir. Eğri uydurma ile fiziksel yasa seçimi aynı işlem değildir; alternatif modellerin ayırt edileceği yeni ölçümler planlanabilir.",
        ],
      },
      {
        title: "Gözlem, çıkarım ve açıklama",
        paragraphs: [
          "“Gösterge 12,0 değerini verdi.” ölçüm kaydıdır; “Sistemde daha çok enerji var.” ise bağıntı ve sistem bilgisi gerektiren yorum olabilir. Bir gözlemcinin beklentisi ölçüm kaydının yerine geçmez. Verinin nasıl toplandığını açıklamak; aygıtın kalibrasyonunu, örnek seçimini ve işlem basamaklarını başkasının denetleyebilmesine olanak verir.",
          "Bilimsel açıklamalar yeni kanıtlarla kapsamı belirlenebilen modellerdir. Bir teoriyi günlük dildeki dayanaksız tahminle eş tutma; yasa ve teori de birinin ötekine “terfi ettiği” iki başarı basamağı değildir. Düzenli bir ilişkiyi betimlemekle bu ilişkinin nasıl ve niçin ortaya çıktığını açıklamak farklı görevler üstlenebilir. Kanıt, yöntem ve öngörü tartışmanın ortak ölçütleridir.",
        ],
      },
      {
        title: "Fizik, teknoloji ve araştırma etiği",
        paragraphs: [
          "Fizik bilgisi haberleşme, enerji, görüntüleme, malzeme ve ulaşım teknolojilerinde kullanılabilir. Teknolojik bir gereksinim de yeni ölçüm yöntemlerini ve araştırma sorularını doğurabilir. Bir araştırma kurumu, üniversite ve sanayi laboratuvarı farklı görevlerle aynı projeye katılabilir. Cihazın gelişmiş görünmesi, ürettiği her sonucun yöntemden bağımsız doğru olduğu anlamına gelmez.",
          "Bilimsel kayıtta kaynak belirtme, veriyi uydurmama, olumsuz sonuçları saklamama ve deney koşullarını açık tutma önem taşır. Grafik eksenini gizlemek ya da yalnız istenen sonucu veren denemeleri seçmek çıkarımı yanıltabilir. Kurum veya bilim insanı adı düşünceyi tanımaya yardım eder; bir iddianın geçerliliği için ölçüm, denetim ve tekrarlanabilir yöntem gerekir. Bu rehberdeki alıştırmalar özgündür; resmî sınav sorusu olarak sunulmaz.",
        ],
      },
      {
        title: "Ölçüm ve boyut laboratuvarını kullan",
        paragraphs: [
          "Ölçüm görünümünde aynı uzunluğun üç gösterge okumasını, bilinen eklemeli sıfır sapmasını ve gösterge adımını değiştir. Düzeltmenin bütün okumalara aynı yönde etkisini ve tekrar aralığını izleyebilirsin. Aralığı sıfır olan üç okuma bile bilinen sapma varken düzeltilmeye ihtiyaç duyar. Grafikte aynı ölçekte gösterilen okumalar ve HTML sonuçlar birlikte okunur.",
          "Boyut görünümünde niceliklerin temel birim üslerini karşılaştır. Aynı boyutlu iki ifadenin aynı fiziksel yasa olmak zorunda olmadığını açıklamaya çalış. Tahmin ve gerekçe yalnız keşif kaydında saklanır; soru cevabı, puan veya ustalık kaydı oluşturmaz. Kontroller verilen basit modelin girdileridir; değiştirdiğin bir sayının gerçek bir laboratuvarda ölçüldüğü iddiası yoktur.",
        ],
      },
      {
        title: "Bir fizik çözümünü görünür kıl",
        paragraphs: [
          "Çözümden önce sistem, istenen nicelik, verilenler ve kabulleri yaz. Birimleri uyumlu hale getir; hangi tanım veya bağıntıyı niçin kullandığını söyle. Sayı hesabını bitirdikten sonra birim ve işaret denetimi yap. Bir oran büyüklük bildiriyorsa negatif çıkmasının hangi veri veya işaret seçiminden kaynaklandığını araştır; sırf sonuç seçeneklerden birine uydu diye hesabı tamamlanmış sayma.",
          "Sonucu sınır durumuyla da sınayabilirsin: sapma 0 ise eklemeli düzeltme okumayı değiştirmemeli; iki eşit zıt bileşen toplamı 0 olmalı; birim dönüşümü fiziksel niceliği değiştirmemelidir. Deney koşulunun dışına taşan hesap için ek bilgi gerektiğini belirtmek de doğru sonuçtur. Bu denetimler bağıntıyı ezberlemekten farklı olarak aynı fikri yeni veriyle kullanmanı sağlar.",
        ],
      },
    ],
    examples: [
      {
        title: "İki referansla sensörü geri çöz",
        prompt:
          "Doğrusal yanıt verdiği belirtilen bir uzunluk sensörü, gerçek 0 cm referansta 2 cm; gerçek 20 cm referansta 24 cm gösteriyor. Aynı aralıkta gösterge 13 cm iken gerçek uzunluğu bul. Referanslar kesin, yanıt y=a·x+b kabul edilsin.",
        strategy:
          "İki referans önce eğim ve sıfır kaymasını ayrı belirler; sonra göstergeyi ters bağıntıya yerleştir.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Gerçek 0 için gösterge 2 olduğundan b=2 cm. İki ölçüm farkıyla a=(24−2)/(20−0)=1,1 olur.",
          },
          {
            label: "2. adım",
            explanation:
              "Gösterge bağıntısı y=1,1 x+2. y=13 için 13−2=1,1 x yazılır.",
          },
          {
            label: "3. adım",
            explanation:
              "x=11/1,1=10 cm bulunur. Yalnız 2 çıkarmak 11 cm verir; ölçek çarpanı da düzeltilmelidir.",
          },
        ],
        answer: "Gerçek uzunluk 10 cm.",
        check:
          "1,1·10+2=13 gösterge değerini geri verir; sonuç kalibre edilen 0–20 cm aralığındadır.",
        pitfall: "Yalnız sıfır düzeltmesini yapıp ölçek çarpanını atlamak.",
      },
      {
        title: "Tek bir etkiyi sınayan tel düzeni",
        prompt:
          "Üç tel ölçülüyor: K: bakır,1 m,1 mm²,20°C; L: bakır,2 m,1 mm²,20°C; M: bakır,2 m,2 mm²,40°C. Hedef yalnız uzunluğun dirence etkisi. İlk karşılaştırmayı ve M’yi kullanılabilir kılacak değişiklikleri gerekçelendir.",
        strategy:
          "Uzunluğu değiştirip diğer bağımsız etkileri sabit tutan çifti seç.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "K ile L’de malzeme, kesit ve sıcaklık aynıdır; yalnız uzunluk değişmiştir. Bu çift verilen hedefi ayırır.",
          },
          {
            label: "2. adım",
            explanation:
              "L ile M’de kesit ve sıcaklık birlikte değişir. Direnç farkı yalnız uzunluğa bağlanamaz; ayrıca uzunlukları zaten eşittir.",
          },
          {
            label: "3. adım",
            explanation:
              "M, K ile karşılaştırılacaksa kesiti 1 mm² ve sıcaklığı 20°C yapılır. Böylece uzunluğu 2 m olan yeni M, K’ye karşı kontrollü bir uzunluk deneyi sağlar.",
          },
        ],
        answer: "İlk kontrollü çift K–L; M için kesit ve sıcaklık eşitlenmeli.",
        check:
          "Ölçülen direnç bağımlı nicelik, uzunluk bağımsız niceliktir; diğer üç özellik kontrol altında kalır.",
        pitfall:
          "Aynı malzeme bulunmasını diğer bütün etkilerin kontrolü saymak.",
      },
      {
        title: "Zamana bağlı hacim modelinin birimi",
        prompt:
          "Bir dolum için V=k·t² modeli yalnız 0–4 s aralığında sınanmıştır. t=2 s iken V=8 L. k’nın SI birimini, değerini ve modelin 3 s için öngördüğü hacmi bul; 12 s için kesin ölçüm iddiası kurulabilir mi?",
        strategy:
          "Litreyi m³’e çevir, k’yı denklemden yalnız bırak, geçerli aralık içinde öngörü yap.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "8 L=0,008 m³. k=V/t²=0,008/4=0,002 m³/s² olur; boyutu L³ T⁻²’dir.",
          },
          {
            label: "2. adım",
            explanation: "t=3 s model aralığında: V=0,002·9=0,018 m³=18 L.",
          },
          {
            label: "3. adım",
            explanation:
              "12 s verilen sınanmış aralığın dışındadır. Aynı modelle cebirsel değer üretilebilir, fakat bunun kesin ölçülmüş sonuç olduğu söylenemez.",
          },
        ],
        answer:
          "k=0,002 m³/s²; 3 s öngörüsü 18 L.12 s için yeni kapsam varsayımı gerekir.",
        check:
          "2 s değeri geri konunca 8 L elde edilir; hacim birimi hiçbir adımda m/s’ye dönüşmez.",
        pitfall:
          "Bir grafiğe uyan bağıntıyı sınanmamış her zamana kesin yasa diye uzatmak.",
      },
      {
        title: "Vektörün ekseni değişince",
        prompt:
          "Dik eksenlerde A=(6,2), B=(−2,1) birim. Önce bileşke büyüklüğünü bul. Sonra yalnız x ekseninin pozitif yönünü ters seç; aynı fiziksel A, B ve bileşke için bileşenleri yeniden yaz.",
        strategy:
          "Önce ortak eksenlerde bileşenleri topla; sonra koordinat dönüşümünü bütün x bileşenlerine uygula.",
        steps: [
          {
            label: "1. adım",
            explanation: "R=(6−2,2+1)=(4,3). Büyüklük√(4²+3²)=5 birimdir.",
          },
          {
            label: "2. adım",
            explanation:
              "Yeni x ekseninde aynı A=(−6,2), B=(2,1) olur; fiziksel okların yönü değişmedi.",
          },
          {
            label: "3. adım",
            explanation:
              "Yeni bileşke R=(−4,3), büyüklük yine 5’tir. İşaret değişimi ölçülen vektörü değil temsilini değiştirdi.",
          },
        ],
        answer: "İlk R=(4,3); yeni R=(−4,3); her iki büyüklük 5 birim.",
        check: "Yeni bileşenlerin karesi eskiyle aynı toplamı 25 verir.",
        pitfall:
          "Eksen seçimi ters dönünce fiziksel okun da döndüğünü varsaymak.",
      },
      {
        title: "Yayılım ve referansa yakınlık",
        prompt:
          "Aynı kesin 10 cm referans, A aracıyla 10,2/10,2/10,2 cm; B aracıyla 9,8/10,0/10,2 cm ölçülüyor. İki araç için ortalama, tekrar aralığı ve bu referansa yakınlık bakımından neler söylenebilir?",
        strategy:
          "Tekrarlı yayılım ile referans yakınlığını farklı hesaplarla karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "A ortalaması 10,2 cm, aralık 0. B ortalaması(9,8+10,0+10,2)/3=10,0 cm, aralık 0,4 cm.",
          },
          {
            label: "2. adım",
            explanation:
              "A’nın tekrarları bu dizide daha yakın; buna karşılık ortalaması referanstan+0,2 cm uzakta. B’nin ortalaması verilen referansla örtüşür.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu üç okuma, bütün koşullardaki doğruluk ve belirsizliği tek başına belirlemez. Yalnız verilen tekrarlar ve bu kesin referans için kıyas yapılır.",
          },
        ],
        answer: "A daha küçük yayılım; B ortalaması bu referansa daha yakın.",
        check: "Sıfır yayılım ile sıfır ortak sapma aynı özellik değildir.",
        pitfall: "Üç eşit gösterge okumasını mutlak doğru ölçüm saymak.",
      },
      {
        title: "Çift dönüşümlü bir ivme birimi",
        prompt:
          "Bir hareket sensörü ivmeyi 0,006 mm/μs² gösteriyor. Bunu m/s² ile ifade et. Gösterge yalnız birim dönüşümü gerektiriyor; gerçek aygıt doğruluğu hakkında ek bilgi yok.",
        strategy:
          "Paydaki uzunluk ve karesi alınmış payda zaman dönüşümünü ayrı yaz.",
        steps: [
          {
            label: "1. adım",
            explanation: "1 mm=10⁻³ m; 1μs=10⁻⁶ s olduğundan 1μs²=10⁻¹² s².",
          },
          {
            label: "2. adım",
            explanation: "0,006 mm/μs²=0,006·10⁻³/10⁻¹² m/s²=6·10⁶ m/s².",
          },
          {
            label: "3. adım",
            explanation:
              "Büyük çıkan sayısal değer küçük zaman biriminin karesinden doğar. Bu işlem aygıtın doğru kalibre edildiğini kanıtlamaz.",
          },
        ],
        answer: "6×10⁶ m/s².",
        check:
          "Ters dönüşümde m→mm ve s²→μs² çarpanları göstergeyi 0,006’ya geri getirir.",
        pitfall: "Mikrosaniyenin çarpanını karesini almadan kullanmak.",
      },
      {
        title: "Türetilmiş sensör okumasını sınıflandır",
        prompt:
          "Kalibre bir aygıt A yüzeyinde basıncı 40 Pa okuyor. A=0,25 m² ve basınç tekdüze; kuvvet yüzeye dik. Basıncın birim açılımını ve kuvvet büyüklüğünü bul. “Doğrudan ekrandan okunduğu için temel büyüklüktür.” iddiasını değerlendir.",
        strategy:
          "Niceliğin tanımı ölçüm yolundan bağımsızdır; basınçtan alana etkiyen kuvveti hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Pa=N/m²=kg·m⁻¹·s⁻². Basınç birimi temel birimlerden türetilmiştir; basınç skalerdir.",
          },
          {
            label: "2. adım",
            explanation:
              "Tekdüze basınçta F=pA=40·0,25=10 N olur. Kuvvet yüzeye dik yönlü bir vektördür.",
          },
          {
            label: "3. adım",
            explanation:
              "Ekrandan okunması basıncı SI temel niceliği yapmaz. Aynı cihazın ölçüm yöntemi ile niceliğin sınıfı farklı sorulardır.",
          },
        ],
        answer: "Basınç türetilmiş skaler; dik kuvvet büyüklüğü 10 N.",
        check:
          "Pa·m²=N çıkar; kuvvet yönü ayrıca yüzeyin normalinden belirlenir.",
        pitfall: "Aygıttan doğrudan okunan her niceliği temel saymak.",
      },
      {
        title: "Ölçüm kaydıyla yorumun sınırı",
        prompt:
          "Bir ekip “Kırmızı ışık altında sensör 12, mavi ışık altında 8 birim gösterdi.” diyor. Aygıtın iki renge aynı duyarlılıkta olduğu henüz bilinmiyor. “Kırmızı ışığın gerçek gücü daha büyük.” çıkarımını sınamak için hangi ek denetim gerekir?",
        strategy:
          "Gösterge farkı ile fiziksel güç farkı arasındaki kalibrasyon bağını arat.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "12 ve 8 gösterge kayıtlarıdır; kendi başına eş duyarlılıklı güç ölçümü oldukları verilmedi.",
          },
          {
            label: "2. adım",
            explanation:
              "Sensörün iki dalga boyundaki yanıtı, bilinen aynı güçteki referans ışıklarla karşılaştırılabilir. Gerekirse renk başına kalibrasyon uygulanır.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu denetim ve ölçüm belirsizliği sonrasında güç kıyası yapılabilir. Sadece büyük göstergeyi büyük gerçek güç diye okumak erken çıkarımdır.",
          },
        ],
        answer:
          "Dalga boyuna bağlı sensör duyarlılığını referanslarla kalibre etmek gerekir.",
        check:
          "Aynı gösterge ölçeği, farklı fiziksel girdiler için aynı duyarlılık demek değildir.",
        pitfall:
          "Gözlenen sayıyı ölçüm modelinden bağımsız fiziksel sonuç saymak.",
      },
    ],
    recall: [
      {
        prompt:
          "Bir büyüklüğün temel olması ölçümün doğrudan yapıldığını gösterir mi?",
        answer:
          "Hayır. Temel–türetilmiş birim sistemine; doğrudan veya dolaylı ölçme yönteme ilişkindir.",
      },
      {
        prompt:
          "Bir vektör bileşeninin negatif işareti neye göre anlam kazanır?",
        answer:
          "Seçilen pozitif eksene göre. Büyüklük negatife dönüşmez; eksen ters seçilirse bileşen işareti değişebilir.",
      },
      {
        prompt: "Tekrar aralığı 0 iken hangi hata yine bulunabilir?",
        answer:
          "Bütün okumaları aynı yönde kaydıran ortak sıfır veya ölçek sapması bulunabilir.",
      },
      {
        prompt: "Hacim birimi dönüşümünde uzunluk çarpanına ne yapılır?",
        answer: "Küpü alınır: 1 cm³=(10⁻² m)³=10⁻⁶ m³.",
      },
      {
        prompt: "Boyutça uyumlu bağıntı neden tek başına doğru yasa sayılmaz?",
        answer:
          "Boyutsuz katsayı, vektör işlemi, işaret ve model koşulu bu denetimle belirlenmez.",
      },
      {
        prompt: "Grafikte y/x ne zaman doğru eğimi vermeyebilir?",
        answer:
          "Doğru orijinden geçmiyorsa. Eğim iki nokta farkından Δy/Δx ile bulunur.",
      },
      {
        prompt: "Kontrollü karşılaştırmanın temel amacı nedir?",
        answer:
          "İncelenen değişkenin etkisini başka değişen etkenlerden ayırmak; ölçülen bağımlı niceliği uygun kontrolle kıyaslamak.",
      },
      {
        prompt: "Laboratuvarın “yarım gösterge adımı” neyi kapsar?",
        answer:
          "Yalnız ideal yuvarlama adımını. Toplam doğruluk veya istatistiksel güven aralığı için diğer etkiler ayrıca gerekir.",
      },
    ],
    questions: [
      {
        id: "f026p-fizik-bilimine-giris-1",
        prompt: {
          tr: "Aynı uzunluğun göstergede 5,3; 5,5; 5,4 cm okumaları alınıyor. Referans denetimi aygıtın bütün aralıkta sabit +0,2 cm eklemeli sapma gösterdiğini doğruluyor. Yalnız bu sapma düzeltildiğinde üç okumanın ortalaması kaç cm olur?",
        },
        options: [
          {
            tr: "0,2",
          },
          {
            tr: "5,6",
          },
          {
            tr: "5,2",
          },
          {
            tr: "15,6",
          },
          {
            tr: "5,4",
          },
        ],
        answer: 2,
        hint: {
          tr: "Gösterge toplamı 16,2 cm; üçe bölünce ortalama 5,4 cm olur.",
        },
        explanation: {
          tr: "Gösterge toplamı 16,2 cm; üçe bölünce ortalama 5,4 cm olur. Aygıt +0,2 cm fazla okuduğundan ortalamadan 0,2 çıkar: 5,4−0,2. Düzeltilmiş ortalama 5,2 cm. Bu işlem diğer bilinmeyen ölçüm etkilerini sıfırlamaz.",
        },
        skill: "physics026-fizik-bilimine-giris-1",
        guidance: {
          knowledge: [
            "Bilinen pozitif eklemeli sapma her okumadan çıkarılır; ortak çıkarma ortalamadan da aynı miktarı çıkarır.",
          ],
          strategy:
            "Önce gösterge ortalamasını bul; sonra bilinen sıfır düzeltmesini uygula.",
          steps: [
            "Gösterge toplamı 16,2 cm; üçe bölünce ortalama 5,4 cm olur.",
            "Aygıt +0,2 cm fazla okuduğundan ortalamadan 0,2 çıkar: 5,4−0,2.",
            "Düzeltilmiş ortalama 5,2 cm. Bu işlem diğer bilinmeyen ölçüm etkilerini sıfırlamaz.",
          ],
          optionReasons: [
            "Bu sapmanın kendisidir; ölçülen uzunluğun düzeltilmiş ortalaması değildir.",
            "Pozitif sapma yanlış yönde eklenmiştir; aygıt zaten fazla okumaktadır.",
            "Doğru. Ortalama 5,4 cm’den bilinen pozitif 0,2 cm sapma çıkarılır.",
            "Her okuma düzeltilince toplam 15,6 cm olur; üç ölçümün ortalaması için 3’e bölünmelidir.",
            "Bu ham gösterge ortalamasıdır; sıfır düzeltmesi uygulanmamıştır.",
          ],
          commonError:
            "Bilinen pozitif sapmayı gerçek uzunluğa eklemek veya toplamı ortalama saymak.",
          check:
            "5,1/5,3/5,2 cm düzeltilmiş okumalarının ortalaması 5,2 cm’dir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-2",
        prompt: {
          tr: "Bir dijital cetvel en yakın tam milimetreye yuvarlıyor. Gösterge 36 mm; yalnız ideal yuvarlama etkisi inceleniyor ve yarım adımlı sınır değerleri de kabul ediliyor. Başka hata yok varsayımıyla hangi aralık bu okumayla uyumludur?",
        },
        options: [
          {
            tr: "35,5–36,5 mm",
          },
          {
            tr: "0–36 mm",
          },
          {
            tr: "35–37 mm",
          },
          {
            tr: "Yalnız 36 mm",
          },
          {
            tr: "36–36,5 mm",
          },
        ],
        answer: 0,
        hint: {
          tr: "Gösterge adımı 1 mm, yarım adım 0,5 mm’dir.",
        },
        explanation: {
          tr: "Gösterge adımı 1 mm, yarım adım 0,5 mm’dir. 36−0,5=35,5 mm ve 36+0,5=36,5 mm sınırlarını bul. Soruda yalnız yuvarlama ve uçların kabulü verildiğinden uyumlu aralık 35,5–36,5 mm’dir.",
        },
        skill: "physics026-fizik-bilimine-giris-2",
        guidance: {
          knowledge: [
            "En yakın bir gösterge adımına yuvarlamada ideal sınır, okumanın iki yanında yarım adımdır.",
          ],
          strategy: "Gösterge adımını bulup iki yöne yarısını ekle.",
          steps: [
            "Gösterge adımı 1 mm, yarım adım 0,5 mm’dir.",
            "36−0,5=35,5 mm ve 36+0,5=36,5 mm sınırlarını bul.",
            "Soruda yalnız yuvarlama ve uçların kabulü verildiğinden uyumlu aralık 35,5–36,5 mm’dir.",
          ],
          optionReasons: [
            "Doğru.36 mm okumasının iki yanındaki yarım adım 0,5 mm’dir.",
            "Gösterge adımı, ölçeğin sıfırından okumaya kadar tüm aralığı belirsizlik yapmaz.",
            "Bu aralık iki yönde tam adım kullanır; verilen ideal yuvarlama sınırından geniştir.",
            "Yuvarlama adımını yok sayar; aynı göstergeye bir aralık değer yuvarlanabilir.",
            "Üst yarıyı tutup okumadan düşük 35,5–36 mm değerlerini haksız dışlar.",
          ],
          commonError:
            "Çözünürlük adımıyla toplam ölçüm doğruluğunu, ya da yarım adımla tam adımı karıştırmak.",
          check:
            "Bu sınır yalnız açıkça verilen yuvarlama modeli içindir; gerçek aygıtın başka sapmaları ayrıca gerekir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-3",
        prompt: {
          tr: "Bir deneyde basınç için p=F/A kullanılıyor. F=12 N ve A=300 cm². Kuvvet yüzeye dik ve basınç tekdüze kabul ediliyor. Basıncın SI değeri ve temel birim açılımı hangisidir?",
        },
        options: [
          {
            tr: "4 Pa; kg·m⁻¹·s⁻²",
          },
          {
            tr: "400 Pa; kg·m·s⁻²",
          },
          {
            tr: "0,04 Pa; kg·m⁻¹·s⁻²",
          },
          {
            tr: "400 Pa; kg·m⁻¹·s⁻²",
          },
          {
            tr: "400 Pa; kg·m²·s⁻²",
          },
        ],
        answer: 3,
        hint: {
          tr: "300 cm²=300·10⁻⁴=0,03 m².",
        },
        explanation: {
          tr: "300 cm²=300·10⁻⁴=0,03 m². p=12/0,03=400 Pa. Pa=N/m² olduğundan kg·m·s⁻²/m²=kg·m⁻¹·s⁻² elde edilir.",
        },
        skill: "physics026-fizik-bilimine-giris-3",
        guidance: {
          knowledge: ["1 cm²=10⁻⁴ m²; 1 Pa=1 N/m²=1 kg·m⁻¹·s⁻²."],
          strategy: "Önce alanı metrekareye çevir, sonra kuvveti alana böl.",
          steps: [
            "300 cm²=300·10⁻⁴=0,03 m².",
            "p=12/0,03=400 Pa.",
            "Pa=N/m² olduğundan kg·m·s⁻²/m²=kg·m⁻¹·s⁻² elde edilir.",
          ],
          optionReasons: [
            "Santi dönüşümünü alanın karesine uygulamak yerine yalnız uzunluk çarpanı kullanılmıştır.",
            "Sayısal değer doğru olsa da bu açılım kuvvete aittir; alanla bölmenin m⁻² etkisi eksiktir.",
            "12/300 hesabıcm²’yi m² gibi kullanır; dönüşüm çarpanı atlanmıştır.",
            "Doğru. Alan 0,03 m² ve basınç 400 N/m²’dir.",
            "Bu enerji boyutudur; basınç boyutuyla uyuşmaz.",
          ],
          commonError:
            "Alan dönüşümünde yalnız 100’e bölmek veya basıncın birimini kuvvetle aynı tutmak.",
          check: "400 Pa·0,03 m²=12 N verilen kuvveti geri verir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-4",
        prompt: {
          tr: "Bir boyutta konumu veren x=c₀+c₁t+c₂t² bağıntısında x metre, t saniye ile ölçülüyor. Katsayıların birimleri sırasıyla hangi üçlü olmalıdır?",
        },
        options: [
          {
            tr: "m; m/s; m/s²",
          },
          {
            tr: "m; m; m",
          },
          {
            tr: "m; m·s; m·s²",
          },
          {
            tr: "m; m/s²; m/s",
          },
          {
            tr: "Birimsiz; m/s; m/s²",
          },
        ],
        answer: 0,
        hint: {
          tr: "c₀ tek başına toplandığından birimi m olmalıdır.",
        },
        explanation: {
          tr: "c₀ tek başına toplandığından birimi m olmalıdır. c₁t metre olacağı için c₁’in birimi m/s olur. c₂t² metre olacağı için c₂’nin birimi m/s² olur; katsayının sayısal değeri bu denetimle belirlenmez.",
        },
        skill: "physics026-fizik-bilimine-giris-4",
        guidance: {
          knowledge: [
            "Toplanan her terimin boyutu konumla aynı olmalıdır; katsayı birimi terimdeki zaman kuvvetini tamamlar.",
          ],
          strategy:
            "Her terimi ayrı metreye eşitle ve katsayının birimini yalnız bırak.",
          steps: [
            "c₀ tek başına toplandığından birimi m olmalıdır.",
            "c₁t metre olacağı için c₁’in birimi m/s olur.",
            "c₂t² metre olacağı için c₂’nin birimi m/s² olur; katsayının sayısal değeri bu denetimle belirlenmez.",
          ],
          optionReasons: [
            "Doğru. Her üç terim de metre birimi verir.",
            "Son iki terim sırasıyla m·s ve m·s² olur; konumla toplanamaz.",
            "Zamanla çarpımda katsayının zaman kuvveti ters yönde olmalıdır.",
            "t ve t² terimlerine gerekli birimler yer değiştirmiştir.",
            "c₀ da konuma eklenir; birimsiz sabit doğrudan metreye toplanamaz.",
          ],
          commonError: "Katsayı sabit olduğu için birimsiz sanmak.",
          check:
            "Katsayıların sabit olması, birim taşımalarına engel değildir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-5",
        prompt: {
          tr: "Bir akış direnci modeli F=k·A·v² biçiminde veriliyor. F kuvvet, A alan, v sürat. Bağıntının boyutça uyumlu olması için k’nın SI birimi hangisi olmalıdır?",
        },
        options: [
          {
            tr: "m³/kg",
          },
          {
            tr: "kg/m³",
          },
          {
            tr: "kg·m/s²",
          },
          {
            tr: "Birimsiz",
          },
          {
            tr: "kg/m²",
          },
        ],
        answer: 1,
        hint: {
          tr: "A·v² birimi m²·m²/s²=m⁴/s² olur.",
        },
        explanation: {
          tr: "A·v² birimi m²·m²/s²=m⁴/s² olur. k’nın birimi (kg·m/s²)/(m⁴/s²) olmalıdır. Zaman kuvvetleri gider, k için kg/m³ kalır. Boyut uyumu modelin her akışta geçerli olduğunu ayrıca kanıtlamaz.",
        },
        skill: "physics026-fizik-bilimine-giris-5",
        guidance: {
          knowledge: [
            "Kuvvet kg·m/s², alan m² ve süratin karesi m²/s² birimindedir.",
          ],
          strategy: "k=F/(A·v²) yaz ve temel birimleri sadeleştir.",
          steps: [
            "A·v² birimi m²·m²/s²=m⁴/s² olur.",
            "k’nın birimi (kg·m/s²)/(m⁴/s²) olmalıdır.",
            "Zaman kuvvetleri gider, k için kg/m³ kalır. Boyut uyumu modelin her akışta geçerli olduğunu ayrıca kanıtlamaz.",
          ],
          optionReasons: [
            "Gerekli birimin tersi alınmıştır; k=F/(A·v²) olmalıdır.",
            "Doğru. Kuvveti alan ve sürat karesine bölünce özkütle boyutu kalır.",
            "Bu kuvvet birimidir; A·v² çarpanı bölünmemiştir.",
            "Alan ve sürat karesi tek başına kuvvet boyutu vermediği için katsayı birimsiz olamaz.",
            "Bu birimle sağ taraf kg·m²/s² olur; kuvvet yerine enerji boyutu çıkar.",
          ],
          commonError:
            "Formülde harf sabit gösterildi diye katsayının zorunlu olarak birimsiz olduğunu varsaymak.",
          check: "kg/m³·m²·m²/s²=kg·m/s² kuvvet birimini verir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-6",
        prompt: {
          tr: "Bir öğrenci sabit süratli bir yol modeli için s=v·t ve s=2 v·t ifadelerini yalnız birimlerine bakarak karşılaştırıyor. s yol, v sürat, t süre. Sadece boyut denetimiyle hangi sonuca varabilir?",
        },
        options: [
          {
            tr: "İlk ifade birimsizdir, ikinci metredir.",
          },
          {
            tr: "İkinci ifade boyutça yanlıştır; 2 ek bir birim taşır.",
          },
          {
            tr: "İki ifade boyutça uyduğu için ikisi de fiziksel olarak kesin doğrudur.",
          },
          {
            tr: "İkisi de metre boyutundadır; katsayı yalnız boyutla seçilemez.",
          },
          {
            tr: "s, v ve t aynı birimde olmalıdır.",
          },
        ],
        answer: 3,
        hint: {
          tr: "v·t birimi m/s·s=m olur.",
        },
        explanation: {
          tr: "v·t birimi m/s·s=m olur. 2 boyutsuz olduğundan 2 v·t de metre birimindedir. Boyut denetimi iki ifadeyi ayıramaz. Sabit sürat tanımıyla gerçek bağıntı ayrıca seçilir; boyut uyumu tek başına yeterli değildir.",
        },
        skill: "physics026-fizik-bilimine-giris-6",
        guidance: {
          knowledge: [
            "Boyutsuz sayısal katsayılar boyutu değiştirmez; fiziksel katsayıyı seçmek için tanım ve koşullar da gerekir.",
          ],
          strategy:
            "İki sağ tarafın birimini karşılaştır; boyutsuz 2’nin denetime etkisini ayır.",
          steps: [
            "v·t birimi m/s·s=m olur.",
            "2 boyutsuz olduğundan 2 v·t de metre birimindedir.",
            "Boyut denetimi iki ifadeyi ayıramaz. Sabit sürat tanımıyla gerçek bağıntı ayrıca seçilir; boyut uyumu tek başına yeterli değildir.",
          ],
          optionReasons: [
            "Her iki v·t çarpımı da metre verir.",
            "Verilen 2 saf sayıdır; yeni bir fiziksel birim eklemez.",
            "Gerekli boyut koşulu, katsayı ve fizik tanımı için yeterli kanıt değildir.",
            "Doğru. Boyutsuz 2, metre boyutunu değiştirmez.",
            "Çarpım bağıntısında niceliklerin birimleri aynı olmak zorunda değildir; çarpımın birimi sol tarafı vermelidir.",
          ],
          commonError: "Boyut uyumunu eksiksiz fiziksel doğrulama saymak.",
          check:
            "Sabit sürat tanımı s/t=v olduğundan fiziksel seçim için tanım da kullanılır.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-7",
        prompt: {
          tr: "Bir sıvı örneğinin 3,6 cm³ hacmi 5 ms sürede geçiyor. Ortalama hacimsel akış V/t ile tanımlanıyor. Bu akışın m³/s değeri nedir?",
        },
        options: [
          {
            tr: "1,388…×10³",
          },
          {
            tr: "7,2×10⁻⁴",
          },
          {
            tr: "0,72",
          },
          {
            tr: "7,2",
          },
          {
            tr: "7,2×10⁻¹⁰",
          },
        ],
        answer: 1,
        hint: {
          tr: "3,6 cm³=3,6×10⁻⁶ m³; 5 ms=5×10⁻³ s.",
        },
        explanation: {
          tr: "3,6 cm³=3,6×10⁻⁶ m³; 5 ms=5×10⁻³ s. Oran(3,6/5)×10⁻³=0,72×10⁻³ m³/s olur. Sonuç 7,2×10⁻⁴ m³/s. Zamanın birimi kareli değil; süre tek kuvvetle dönüştürülür.",
        },
        skill: "physics026-fizik-bilimine-giris-7",
        guidance: {
          knowledge: [
            "1 cm³=10⁻⁶ m³; 1 ms=10⁻³ s. Hacimsel akış hacim/süre oranıdır.",
          ],
          strategy: "Pay ve paydayı SI’ye ayrı çevirip sonra böl.",
          steps: [
            "3,6 cm³=3,6×10⁻⁶ m³; 5 ms=5×10⁻³ s.",
            "Oran(3,6/5)×10⁻³=0,72×10⁻³ m³/s olur.",
            "Sonuç 7,2×10⁻⁴ m³/s. Zamanın birimi kareli değil; süre tek kuvvetle dönüştürülür.",
          ],
          optionReasons: [
            "Bu süre/hacim türü ters oranla ilişkilidir; istenen hacim/süredir.",
            "Doğru.3,6×10⁻⁶ m³,0,005 s’ye bölünmüştür.",
            "Bu 3,6/5 oranıdır; cm³/ms birimi SI’ye dönüştürülmemiştir.",
            "Hacimde santi çarpanı yerine yanlış uzunluk çarpanı kullanılmıştır.",
            "Milisaniyeyi paydada bölmek yerine ters yönde çarpmak sonucu küçültür.",
          ],
          commonError:
            "Ön eki birimin küpüne uygulamamak veya oranı ters kurmak.",
          check: "7,2×10⁻⁴ m³/s·0,005 s=3,6×10⁻⁶ m³ verir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-8",
        prompt: {
          tr: "Bir maddenin aynı koşuldaki özkütlesi 1,8 g/cm³ olarak verilmiştir. 1 g=1000 mg ve 1 cm=10 mm. Aynı özkütle mg/mm³ birimiyle kaçtır?",
        },
        options: [
          {
            tr: "1,8",
          },
          {
            tr: "18",
          },
          {
            tr: "180",
          },
          {
            tr: "0,0018",
          },
          {
            tr: "1800",
          },
        ],
        answer: 0,
        hint: {
          tr: "1 cm³=(10 mm)³=1000 mm³.",
        },
        explanation: {
          tr: "1 cm³=(10 mm)³=1000 mm³. 1,8 g/cm³=1800 mg/1000 mm³. Oran 1,8 mg/mm³ olur; iki 1000 çarpanı sadeleşir.",
        },
        skill: "physics026-fizik-bilimine-giris-8",
        guidance: {
          knowledge: [
            "Uzunluk 10 kat olunca hacim birimi 1000 kat dönüşür; paydaki gram da 1000 mg’dir.",
          ],
          strategy: "Hem kütle hem hacim dönüşüm çarpanını yazıp sadeleştir.",
          steps: [
            "1 cm³=(10 mm)³=1000 mm³.",
            "1,8 g/cm³=1800 mg/1000 mm³.",
            "Oran 1,8 mg/mm³ olur; iki 1000 çarpanı sadeleşir.",
          ],
          optionReasons: [
            "Doğru. Kütle ve hacim dönüşümlerinin 1000 çarpanları birbirini götürür.",
            "Hacimde küp yerine yanlış 100 çarpanı kullanılmıştır.",
            "Santimetreyi milimetreye çevirirken hacimde yalnız 10 kullanılmıştır.",
            "Hacim 1000’e genişletilmiş fakat gramın mg dönüşümü yapılmamıştır.",
            "Pay çevrilmiş, paydadaki cm³ dönüşümü atlanmıştır.",
          ],
          commonError:
            "Hacim dönüşümünü doğrusal uzunluk dönüşümü gibi yapmak.",
          check: "1 mg/mm³=1 g/cm³ eşitliği ters yönden de bulunur.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-9",
        prompt: {
          tr: "Dik x ve y eksenlerinde iki kuvvetin bileşenleri F₁=(4,−3)N ve F₂=(−4,7)N. Bileşkenin yönü ve büyüklüğü hangisidir?",
        },
        options: [
          {
            tr: "+x yönünde 8 N",
          },
          {
            tr: "+y yönünde 4 N",
          },
          {
            tr: "Büyüklüğü 0 N",
          },
          {
            tr: "−y yönünde 4 N",
          },
          {
            tr: "+y yönünde 10 N",
          },
        ],
        answer: 1,
        hint: {
          tr: "Rx=4+(−4)=0 N.",
        },
        explanation: {
          tr: "Rx=4+(−4)=0 N. Ry=−3+7=+4 N. Bileşke(0,+4)N olduğundan+y yönünde ve büyüklüğü 4 N’dir.",
        },
        skill: "physics026-fizik-bilimine-giris-9",
        guidance: {
          knowledge: [
            "Dik eksenlerde bileşenler ayrı ayrı toplanır; yön sıfır olmayan bileşenin işaretinden okunur.",
          ],
          strategy:
            "Önce x bileşenlerinin birbirini götürüp götürmediğine bak; sonra y toplamını kullan.",
          steps: [
            "Rx=4+(−4)=0 N.",
            "Ry=−3+7=+4 N.",
            "Bileşke(0,+4)N olduğundan+y yönünde ve büyüklüğü 4 N’dir.",
          ],
          optionReasons: [
            "Zıt işaretli x bileşenleri toplanıp 8 yapılamaz; birbirini götürür.",
            "Doğru. x bileşenleri sıfırlanır; y toplamı+4 N kalır.",
            "Yalnız x bileşenleri sıfırlanır; y bileşenleri sıfırlanmaz.",
            "Büyüklük 4 N olsa da y toplamının işareti pozitiftir.",
            "y bileşenlerinin büyüklükleri 3+7 doğrudan toplanmış,−3 işareti atlanmıştır.",
          ],
          commonError: "Zıt yönlü bileşenlerin yalnız büyüklüklerini toplamak.",
          check:
            "R’nin büyüklüğü√(0²+4²)=4 N; x doğrultusunda net etki yoktur.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-10",
        prompt: {
          tr: "p basıncı Pa, V hacmi m³ birimiyle veriliyor. pV çarpımının boyutunun enerjiyle aynı olduğu söyleniyor. Bu bilgiyle tek başına hangi yorum yapılabilir?",
        },
        options: [
          {
            tr: "Basınç skaler olduğu için pV birimsizdir.",
          },
          {
            tr: "pV birimi kuvvettir.",
          },
          {
            tr: "Enerji boyutuna uyar; gerçek iş olup olmadığı için süreç bilgisi gerekir.",
          },
          {
            tr: "pV metreyle hacim topladığı için tanımsızdır.",
          },
          {
            tr: "pV mutlaka her durumda cismin kinetik enerjisidir.",
          },
        ],
        answer: 2,
        hint: {
          tr: "pV birimi N/m²·m³=N·m olur.",
        },
        explanation: {
          tr: "pV birimi N/m²·m³=N·m olur. N·m joule ile aynı enerji boyutudur. Bu, her pV sayısının o süreçte yapılmış işe eşit olduğunu tek başına göstermez; süreç ve sistem koşulları ayrıca gerekir.",
        },
        skill: "physics026-fizik-bilimine-giris-10",
        guidance: {
          knowledge: [
            "Pa=N/m² olduğundan Pa·m³=N·m=J; aynı boyut fiziksel sürecin tamamını belirlemez.",
          ],
          strategy:
            "Önce birimleri sadeleştir; sonra birim eşliğinin vermediği süreç bilgisini ayır.",
          steps: [
            "pV birimi N/m²·m³=N·m olur.",
            "N·m joule ile aynı enerji boyutudur.",
            "Bu, her pV sayısının o süreçte yapılmış işe eşit olduğunu tek başına göstermez; süreç ve sistem koşulları ayrıca gerekir.",
          ],
          optionReasons: [
            "Skaler olmak birimsiz olmak demek değildir; pV enerji birimi taşır.",
            "Hacimle çarpımda bir metre daha kalır; sonuç N değil N·m olur.",
            "Doğru. Boyut uyumu ile belirli bir süreçte iş hesabı aynı iddia değildir.",
            "Burada toplama değil çarpma vardır; bileşik birimler sadeleştirilebilir.",
            "J birimi, enerjinin hangi türü olduğunu veya kinetik değere eşitliği belirlemez.",
          ],
          commonError:
            "Aynı birime sahip her ifadeyi koşulsuz aynı fiziksel nicelik saymak.",
          check: "Pa·m³=J, yalnız birim ve boyut denetimidir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-11",
        prompt: {
          tr: "Bir uzunluk sensörünün kalibrasyonu y=3 x+6 biçiminde. x gerçek uzunluk cm, y gösterge birimi. Bu modelin 0–10 cm aralığında geçerli olduğu verilmiş. Gerçek uzunluk 2 cm’den 4 cm’ye çıkarılırsa gösterge değerleri ve gösterge artışı hangisidir?",
        },
        options: [
          {
            tr: "8 ve 10; artış 2",
          },
          {
            tr: "12 ve 24; artış 12",
          },
          {
            tr: "18 ve 12; artış−6",
          },
          {
            tr: "12 ve 18; artış 6",
          },
          {
            tr: "6 ve 12; artış 6",
          },
        ],
        answer: 3,
        hint: {
          tr: "x=2 için y=3·2+6=12.",
        },
        explanation: {
          tr: "x=2 için y=3·2+6=12. x=4 için y=3·4+6=18. Gösterge artışı 18−12=6 birimdir. Girdi iki kat olsa da b=6 nedeniyle gösterge iki kat olmamıştır.",
        },
        skill: "physics026-fizik-bilimine-giris-11",
        guidance: {
          knowledge: [
            "Sıfır kayması iki göstergeye de eklenir; fark alınırken ortak kayma gider.",
          ],
          strategy:
            "İki girdiyi bağıntıya ayrı yerleştir, sonra gösterge farkını al.",
          steps: [
            "x=2 için y=3·2+6=12.",
            "x=4 için y=3·4+6=18.",
            "Gösterge artışı 18−12=6 birimdir. Girdi iki kat olsa da b=6 nedeniyle gösterge iki kat olmamıştır.",
          ],
          optionReasons: [
            "Çarpan 3 uygulanmamış, yalnız x+6 hesaplanmıştır.",
            "Göstergeyi doğrudan girdiyle orantılı sayar; sıfır kaymasını yok sayar.",
            "Girdiler yer değiştirilmiştir; pozitif eğimde 4 cm okuması daha büyük olmalıdır.",
            "Doğru. İki göstergeye de aynı+6 kayma eklenir; fark 6 kalır.",
            "3 x terimleri alınmış fakat+6 sıfır kayması her okumadan atlanmıştır.",
          ],
          commonError:
            "Sıfırdan geçmeyen doğruda girdi iki kat olunca göstergeyi de iki kat saymak.",
          check: "Δy/Δx=6/2=3 kalibrasyon eğimini geri verir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-12",
        prompt: {
          tr: "Kesin referans uzunluk 40,0 mm. Bir ölçüm dizisinin ortalaması 40,8 mm. Göreli sapma |ortalama−referans|/referans ile tanımlanırsa yüzde kaçtır?",
        },
        options: [
          {
            tr: "%0,8",
          },
          {
            tr: "%2",
          },
          {
            tr: "%98",
          },
          {
            tr: "%0,02",
          },
          {
            tr: "%102",
          },
        ],
        answer: 1,
        hint: {
          tr: "Mutlak sapma|40,8−40,0|=0,8 mm.",
        },
        explanation: {
          tr: "Mutlak sapma|40,8−40,0|=0,8 mm. Göreli sapma 0,8/40,0=0,02. Yüzde değeri 0,02·100=%2’dir; birimler oranda sadeleşir.",
        },
        skill: "physics026-fizik-bilimine-giris-12",
        guidance: {
          knowledge: [
            "Göreli sapmada mutlak fark referans değere bölünür; yüzde için 100 ile çarpılır.",
          ],
          strategy: "Önce 0,8 mm farkı bul, sonra 40,0 mm referansa oranla.",
          steps: [
            "Mutlak sapma|40,8−40,0|=0,8 mm.",
            "Göreli sapma 0,8/40,0=0,02.",
            "Yüzde değeri 0,02·100=%2’dir; birimler oranda sadeleşir.",
          ],
          optionReasons: [
            "Mutlak mm farkı doğrudan yüzde sayılmıştır.",
            "Doğru.0,8/40=0,02 ve yüzde 2 olur.",
            "Bu fark/referans sapması değildir; referansa yakınlık başka bir yüzdeyle karıştırılmıştır.",
            "0,02 oranı yüzdeye çevrilmeden yüzde işareti eklenmiştir.",
            "Bu ortalama/referans oranının yüzdesidir; istenen fark/referanstır.",
          ],
          commonError:
            "Mutlak sapmayla göreli sapmayı veya oranla yüzdeyi karıştırmak.",
          check:
            "40 mm’nin%2’si 0,8 mm’dir; işaretli sapma ayrıca+0,8 mm olarak verilebilir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-13",
        prompt: {
          tr: "Bir sensör aynı kesin 0 referansta deneyden önce−0,3 birim, deneyden sonra+0,1 birim okuyor. İki sıfır kontrolü dışında veri yok. Hangi sonuç doğrudan desteklenir?",
        },
        options: [
          {
            tr: "Aygıtın tüm okumaları kesin 4 katına çıkmıştır.",
          },
          {
            tr: "Deneyden sonra hiçbir ölçüm hatası kalmamıştır.",
          },
          {
            tr: "Ölçek çarpanı kesin değişmemiştir.",
          },
          {
            tr: "Sıfır okuması−0,2 birim değişmiştir.",
          },
          {
            tr: "Sıfır okuması+0,4 birim değişmiştir; ölçek çarpanı ayrıca bilinmez.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Sıfır göstergesi+0,1−(−0,3)=+0,4 birim değişmiştir.",
        },
        explanation: {
          tr: "Sıfır göstergesi+0,1−(−0,3)=+0,4 birim değişmiştir. Bu iki anda sıfır kaymasının aynı olmadığını gösterir. Başka referans noktası verilmediği için tüm ölçek çarpanının ne kadar değiştiği çıkarılamaz.",
        },
        skill: "physics026-fizik-bilimine-giris-13",
        guidance: {
          knowledge: [
            "Sıfır kontrolü eklemeli kaymanın o andaki değerini gösterir; tek noktadan bütün ölçek çarpanı bulunmaz.",
          ],
          strategy:
            "İki sıfır okumasının farkını hesapla; ölçülmeyen ölçek davranışını ayrıca tut.",
          steps: [
            "Sıfır göstergesi+0,1−(−0,3)=+0,4 birim değişmiştir.",
            "Bu iki anda sıfır kaymasının aynı olmadığını gösterir.",
            "Başka referans noktası verilmediği için tüm ölçek çarpanının ne kadar değiştiği çıkarılamaz.",
          ],
          optionReasons: [
            "Sıfır kaymalarının oranı genel ölçek çarpanı değildir; ayrıca işaretleri farklıdır.",
            "Son sıfır okuması bile+0,1’dir; başka hata etkileri de verilmemiştir.",
            "Tek sıfır noktası ölçek çarpanını sınamaz; değişmediği de kanıtlanmaz.",
            "İşaretli fark yerine iki sayı yanlış toplanmıştır.",
            "Doğru. İki sıfır kontrolünün farkı+0,4’tür; eğim için aralıklı referanslar gerekir.",
          ],
          commonError:
            "Sıfır kontrolünü bütün ölçüm aralığının kalibrasyonu saymak.",
          check: "Eski−0,3 okumaya+0,4 eklenince yeni+0,1 bulunur.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-14",
        prompt: {
          tr: "Bir levhanın soğuma hızına yüzey alanının etkisi araştırılıyor. İki denemede malzeme, kütle, başlangıç sıcaklığı ve ortam aynı; yüzey alanı farklı seçiliyor. Her denemede ilk 60 s’deki sıcaklık azalması ölçülüyor. Bağımsız ve bağımlı nicelikler sırasıyla hangisidir?",
        },
        options: [
          {
            tr: "Kütle; yüzey alanı",
          },
          {
            tr: "Sıcaklık azalması; yüzey alanı",
          },
          {
            tr: "60 s; başlangıç sıcaklığı",
          },
          {
            tr: "Yüzey alanı; 60 s’deki sıcaklık azalması",
          },
          {
            tr: "Ortam sıcaklığı; malzeme",
          },
        ],
        answer: 3,
        hint: {
          tr: "Bilerek farklı seçilen büyüklük yüzey alanıdır.",
        },
        explanation: {
          tr: "Bilerek farklı seçilen büyüklük yüzey alanıdır. Karşılaştırılan ölçüm ilk 60 s’de sıcaklık azalmasıdır. Malzeme, kütle, ilk sıcaklık ve ortam kontrol edilen koşullardır; bağımsız–bağımlı çift yüzey alanı–sıcaklık azalmasıdır.",
        },
        skill: "physics026-fizik-bilimine-giris-14",
        guidance: {
          knowledge: [
            "Bağımsız nicelik değiştirilen; bağımlı nicelik karşılaştırma için ölçülen sonuçtur.",
          ],
          strategy:
            "İki denemede bilerek değişen özelliği ve ölçüm çıktısını ayrı bul.",
          steps: [
            "Bilerek farklı seçilen büyüklük yüzey alanıdır.",
            "Karşılaştırılan ölçüm ilk 60 s’de sıcaklık azalmasıdır.",
            "Malzeme, kütle, ilk sıcaklık ve ortam kontrol edilen koşullardır; bağımsız–bağımlı çift yüzey alanı–sıcaklık azalmasıdır.",
          ],
          optionReasons: [
            "Kütle aynı tutulmuştur; alan ölçülen sonuç değil değiştirilen etkendir.",
            "Değiştirilen etken ile ölçülen sonuç yer değiştirmiştir.",
            "60 s iki deneyin ortak ölçüm penceresidir; başlangıç sıcaklığı da aynı tutulur.",
            "Doğru. Biri değiştirilir, diğeri aynı zaman penceresinde ölçülür.",
            "İkisi de aynı tutulan koşullardır; deney çıktısını göstermez.",
          ],
          commonError:
            "Soruda geçen her değişkeni bağımsız saymak veya sonucu neden yerine koymak.",
          check:
            "Aynı 60 s penceresi, ölçülen azalmanın süre farkıyla karışmasını önler.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-15",
        prompt: {
          tr: "Bir araştırma, katı bir yarı iletkenin bant yapısını; bu malzemeye gelen ışığın soğurulmasını; oluşan elektriksel taşıyıcı akımını birlikte inceliyor. Hangi alan ilişkisi bu çalışmayı en doğru açıklar?",
        },
        options: [
          {
            tr: "Katıhal yalnız makroskobik hareketi inceler.",
          },
          {
            tr: "Bir çalışma iki alt alana ait olamaz.",
          },
          {
            tr: "Katıhal, optik ve elektrik–manyetizma birlikte kullanılır.",
          },
          {
            tr: "Işık bulunduğu için elektrik akımıyla ilişki kurulamaz.",
          },
          {
            tr: "Malzeme atom içerdiği için yalnız nükleer fiziktir.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Katıdaki bant yapısı katıhal fiziğiyle doğrudan ilişkilidir.",
        },
        explanation: {
          tr: "Katıdaki bant yapısı katıhal fiziğiyle doğrudan ilişkilidir. Işık etkileşimi optik, yük taşıyıcı akımı elektrik ve manyetizma bilgisini kullanır. Bu yüzden çalışma bu alanların ortak çerçevesini kullanır; tek bir sözcükle yalnız bir alana kapatılamaz.",
        },
        skill: "physics026-fizik-bilimine-giris-15",
        guidance: {
          knowledge: [
            "Bir aygıtın farklı mekanizmaları birden çok fizik alt alanının ortak bilgisini kullanabilir.",
          ],
          strategy:
            "Bant yapısı, ışık etkileşimi ve akım aşamalarını ayrı adlandır.",
          steps: [
            "Katıdaki bant yapısı katıhal fiziğiyle doğrudan ilişkilidir.",
            "Işık etkileşimi optik, yük taşıyıcı akımı elektrik ve manyetizma bilgisini kullanır.",
            "Bu yüzden çalışma bu alanların ortak çerçevesini kullanır; tek bir sözcükle yalnız bir alana kapatılamaz.",
          ],
          optionReasons: [
            "Bant ve katı malzemenin elektronik özellikleri katıhal kapsamındadır.",
            "Alt alanlar araştırma sorusunu düzenler; ortak kullanılan bir aygıtı birbirinden kopuk yapmaz.",
            "Doğru. Üç ayrı mekanizma ilgili alt alanların ortak bilgisini gerektirir.",
            "Işık soğurması ile oluşan taşıyıcı akımı aynı aygıtta ilişkilendirilebilir.",
            "Atom içermek çekirdek tepkimesi incelendiğini göstermez; bant ve akım süreçleri verilmiştir.",
          ],
          commonError:
            "Bir anahtar kelime görüp bütün aygıtın mekanizmalarını tek alana indirgemek.",
          check:
            "Kök, çekirdek tepkimesi değil katı bant–ışık–taşıyıcı akımı zincirini açıkça vermektedir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-16",
        prompt: {
          tr: "Bir rapor “Bu ilişki birçok ölçümle desteklendiği için artık açıklamaya gerek kalmadan teoriden yasaya dönüşmüştür.” diyor. Bilimsel yasa ve teori ilişkisi için en uygun değerlendirme hangisidir?",
        },
        options: [
          {
            tr: "Teori her durumda kanıtsız kişisel tahmindir.",
          },
          {
            tr: "Çok tekrar edilmiş ilişki hangi koşulda olursa olsun kesindir.",
          },
          {
            tr: "Yasa adı verilen ifade yeni kanıtla hiçbir zaman sınanamaz.",
          },
          {
            tr: "Her hipotez üçüncü deneyde otomatik teori olur.",
          },
          {
            tr: "Destek artabilir; fakat teori–yasa zorunlu bir terfi sırası değildir.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Ölçümler bir ilişkiyi destekleyebilir; bu, açıklayıcı soruların bittiğini göstermez.",
        },
        explanation: {
          tr: "Ölçümler bir ilişkiyi destekleyebilir; bu, açıklayıcı soruların bittiğini göstermez. Yasa düzenli ilişkiyi betimleyebilir; teori mekanizma ve geniş açıklayıcı çerçeve sunabilir. Birinin yeterince tekrar edilince ötekine terfi etmesi biçiminde zorunlu bir basamak yoktur.",
        },
        skill: "physics026-fizik-bilimine-giris-16",
        guidance: {
          knowledge: [
            "Yasa ve teori bilimsel bilginin farklı görevleridir; teori günlük dildeki temelsiz tahmin veya yasaya dönüşme aşaması değildir.",
          ],
          strategy:
            "İlişkiyi betimlemek ile açıklayıcı çerçeve kurmayı farklı görevler olarak ayır.",
          steps: [
            "Ölçümler bir ilişkiyi destekleyebilir; bu, açıklayıcı soruların bittiğini göstermez.",
            "Yasa düzenli ilişkiyi betimleyebilir; teori mekanizma ve geniş açıklayıcı çerçeve sunabilir.",
            "Birinin yeterince tekrar edilince ötekine terfi etmesi biçiminde zorunlu bir basamak yoktur.",
          ],
          optionReasons: [
            "Bilimsel teori ölçüm ve öngörülerle sınanan açıklayıcı çerçeve olabilir.",
            "Desteklenen veri aralığı ve model koşulları yine belirtilmelidir.",
            "Bilimsel ifadeler kapsam ve yeni kanıt bakımından değerlendirmeye açıktır.",
            "Deney sayısına bağlı böyle sabit bir sınıf değiştirme kuralı yoktur.",
            "Doğru. Kanıt ve kapsam değerlendirilir; betimleme ile açıklama farklı görevler taşır.",
          ],
          commonError:
            "Bilimsel terimleri başarı sıralaması veya kanıt sayısı kotası gibi okumak.",
          check:
            "Kanıtın niteliği ve kapsamı önemlidir; yalnız ad veya tekrar sayısı yeterli değildir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-17",
        prompt: {
          tr: "Sabit sıcaklıkta aynı homojen madde için m–V doğrusu (V=2 cm³, m=6 g) ve (V=5 cm³, m=15 g) noktalarından geçiyor. Eksenler değiştirilip V düşeye, m yataya alınırsa yeni doğrunun eğimi nedir?",
        },
        options: [
          {
            tr: "1/3 cm³/g",
          },
          {
            tr: "9 cm³/g",
          },
          {
            tr: "3 g/cm³",
          },
          {
            tr: "0; çünkü madde değişmedi",
          },
          {
            tr: "1/3 g/cm³",
          },
        ],
        answer: 0,
        hint: {
          tr: "Yeni düşey fark 5−2=3 cm³; yeni yatay fark 15−6=9 g.",
        },
        explanation: {
          tr: "Yeni düşey fark 5−2=3 cm³; yeni yatay fark 15−6=9 g. Yeni eğim 3/9=1/3 cm³/g olur. Özkütle yine m/V=3 g/cm³’tür; yeni eğim bu oranın tersini gösterir.",
        },
        skill: "physics026-fizik-bilimine-giris-17",
        guidance: {
          knowledge: [
            "Grafik eğimi düşey nicelik farkının yatay nicelik farkına oranıdır; eksenleri değiştirmek fiziksel özkütleyi değiştirmez.",
          ],
          strategy:
            "Yeni eksenlerde ΔV/Δm oranını iki noktanın farklarıyla bul.",
          steps: [
            "Yeni düşey fark 5−2=3 cm³; yeni yatay fark 15−6=9 g.",
            "Yeni eğim 3/9=1/3 cm³/g olur.",
            "Özkütle yine m/V=3 g/cm³’tür; yeni eğim bu oranın tersini gösterir.",
          ],
          optionReasons: [
            "Doğru. Yeni grafikte düşey hacim, yatay kütledir; eğim ΔV/Δm’dir.",
            "Kütle farkı 9 g tek başına eğim değildir; hacim farkına oran gerekir.",
            "Bu eski m–V eğimi ve özkütledir; yeni eksenlerin eğimi değildir.",
            "Fiziksel özkütlenin sabit olması eğimi sıfır yapmaz; iki nicelik doğrusal artar.",
            "Sayısal ters oran alınmış fakat birimler ters çevrilmemiştir.",
          ],
          commonError:
            "Eksenleri değiştirdikten sonra eski eğim birimini kullanmayı sürdürmek.",
          check:
            "(cm³/g)·(g/cm³) çarpımı 1’dir; yeni eğim özkütlenin tersidir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-18",
        prompt: {
          tr: "Bir deneyde dört ölçüm 9,8; 10,0; 10,1; 11,4 birim. Son değerin hatalı olduğu henüz gösterilmemişken araştırmacı, beklediği sonuca uymadığı için yalnız 11,4’ü rapordan çıkarıyor. En uygun bilimsel işlem hangisidir?",
        },
        options: [
          {
            tr: "En büyük ölçüm fiziksel olarak her zaman yanlıştır.",
          },
          {
            tr: "Ortalama değişmesin diye 11,4 yerine 10,0 yazmak.",
          },
          {
            tr: "Deneyin amacı kalmadığı için yöntemi hiç raporlamamak.",
          },
          {
            tr: "Beklenene en yakın üç ölçümü her zaman saklamak.",
          },
          {
            tr: "Bütün kayıtları koruyup farkın nedenini ve varsa dışlama ölçütünü açıkça denetlemek.",
          },
        ],
        answer: 4,
        hint: {
          tr: "11,4 diğerlerinden uzakta olsa da bu tek başına bozuk kayıt kanıtı değildir.",
        },
        explanation: {
          tr: "11,4 diğerlerinden uzakta olsa da bu tek başına bozuk kayıt kanıtı değildir. Aygıt, yöntem ve kayıt koşulları incelenmeli; tekrar veya önceden belirlenmiş dışlama ölçütü kullanılabilir. Kayıt ve dışlama gerekçesi açık raporlanmalıdır; beklenen sonuca göre gizli seçim yapılmaz.",
        },
        skill: "physics026-fizik-bilimine-giris-18",
        guidance: {
          knowledge: [
            "Veri dışlama açık yöntem ve gerekçe gerektirir; sonuca uymamak tek başına ölçümün hatalı olduğunu kanıtlamaz.",
          ],
          strategy:
            "Önce kaydı koru; aygıt ve deney koşullarında açıklanabilir hata olup olmadığını denetle.",
          steps: [
            "11,4 diğerlerinden uzakta olsa da bu tek başına bozuk kayıt kanıtı değildir.",
            "Aygıt, yöntem ve kayıt koşulları incelenmeli; tekrar veya önceden belirlenmiş dışlama ölçütü kullanılabilir.",
            "Kayıt ve dışlama gerekçesi açık raporlanmalıdır; beklenen sonuca göre gizli seçim yapılmaz.",
          ],
          optionReasons: [
            "Büyüklük sırası tek başına aygıt veya yöntem hatası göstermez.",
            "Veri değiştirmek gerçek ölçüm kaydını uydurmak olur.",
            "Yöntemin açık olması, verinin denetlenebilmesi için özellikle gereklidir.",
            "Bu seçim sonucu baştan belirler; hata gerekçesi sağlamaz.",
            "Doğru. Uzak değer incelenir; sırf beklentiye uymadığı için gizlenmez.",
          ],
          commonError:
            "Beklenen sonuca uyumu, verinin güvenilirliğinin tek ölçütü yapmak.",
          check:
            "Olası aykırı değer ile kanıtlanmış ölçüm hatası aynı sınıf değildir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-19",
        prompt: {
          tr: "Bir katı cisim üzerinde iki ayrı denemede aynı yön ve büyüklükte 10 N kuvvet uygulanıyor. Birinde kuvvetin etki doğrusu dönme ekseninden geçiyor; diğerinde eksene dik uzaklık 0,2 m. Moment büyüklüğü F·d olarak verilmiş. Hangi karşılaştırma doğrudur?",
        },
        options: [
          {
            tr: "İkisi de 2 N·m’dir.",
          },
          {
            tr: "İkisi de 10 N·m’dir.",
          },
          {
            tr: "İlk 2, ikinci 0 N·m’dir.",
          },
          {
            tr: "İlk moment 0, ikinci 2 N·m; dönme etkileri farklıdır.",
          },
          {
            tr: "Aynı kuvvetler bütün mekanik sonuçları zorunlu aynı yapar.",
          },
        ],
        answer: 3,
        hint: {
          tr: "İlk denemede etki doğrusu eksenden geçtiği için d=0 ve moment 0’dır.",
        },
        explanation: {
          tr: "İlk denemede etki doğrusu eksenden geçtiği için d=0 ve moment 0’dır. İkinci denemede moment 10·0,2=2 N·m’dir. Kuvvetlerin yön ve büyüklüğü aynı iken dönme etkisi farklıdır; uygulama geometrisi ayrıca belirtilmelidir.",
        },
        skill: "physics026-fizik-bilimine-giris-19",
        guidance: {
          knowledge: [
            "Kuvvet vektörünün büyüklük ve yönü aynı olsa da katı cismin dönme etkisinde etki doğrusunun yeri önemlidir.",
          ],
          strategy: "Her deneme için eksene dik uzaklığı kullan.",
          steps: [
            "İlk denemede etki doğrusu eksenden geçtiği için d=0 ve moment 0’dır.",
            "İkinci denemede moment 10·0,2=2 N·m’dir.",
            "Kuvvetlerin yön ve büyüklüğü aynı iken dönme etkisi farklıdır; uygulama geometrisi ayrıca belirtilmelidir.",
          ],
          optionReasons: [
            "İlk etki doğrusu eksenden geçtiği için dik uzaklık 0’dır.",
            "Kuvvet değeri doğrudan moment değildir; dik uzaklıkla çarpılır.",
            "Etki doğrularının eksene göre yerleri ters yorumlanmıştır.",
            "Doğru. Aynı kuvvet büyüklüğü için iki farklı dik uzaklık kullanılmıştır.",
            "Katı cismin dönme etkisinde etki doğrusunun konumu ek bilgidir.",
          ],
          commonError:
            "Eşit kuvvet vektörlerini, farklı etki doğrularıyla da aynı dönme etkisi saymak.",
          check:
            "N·m moment birimidir; enerjiyle aynı boyutta olması bu iki fiziksel anlamı birleştirmez.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-20",
        prompt: {
          tr: "Bir cismin ısı sığası C=Q/ΔT ile tanımlanıyor; Q enerji, ΔT sıcaklık değişimi. Q için J, sıcaklık farkı için K kullanılırsa C’nin temel birim açılımı ve sınıfı hangisidir?",
        },
        options: [
          {
            tr: "K; temel skaler",
          },
          {
            tr: "J/K; temel vektörel",
          },
          {
            tr: "kg·m²·s⁻²·K⁻¹; türetilmiş skaler",
          },
          {
            tr: "kg·m·s⁻²; türetilmiş vektörel",
          },
          {
            tr: "kg·m²·s⁻²·K; türetilmiş skaler",
          },
        ],
        answer: 2,
        hint: {
          tr: "C’nin birimi J/K olur.",
        },
        explanation: {
          tr: "C’nin birimi J/K olur. J/K=kg·m²·s⁻²·K⁻¹ temel birim açılımıdır. Isı sığası bu tanımda türetilmiş skaler niceliktir; sıcaklığın temel olması oranı da temel yapmaz.",
        },
        skill: "physics026-fizik-bilimine-giris-20",
        guidance: {
          knowledge: [
            "Enerji birimi J=kg·m²·s⁻²; sıcaklık farkı K ile ölçülür. Tanım bir oranla yeni nicelik kurar.",
          ],
          strategy:
            "Enerjinin temel birimini kelvine böl; yön gerekip gerekmediğini tanımdan denetle.",
          steps: [
            "C’nin birimi J/K olur.",
            "J/K=kg·m²·s⁻²·K⁻¹ temel birim açılımıdır.",
            "Isı sığası bu tanımda türetilmiş skaler niceliktir; sıcaklığın temel olması oranı da temel yapmaz.",
          ],
          optionReasons: [
            "Bu sıcaklık birimidir; enerji/sıcaklık oranının birimi değildir.",
            "Birim yazımı doğru olsa da tanım temel değildir ve yönlü vektör kurmaz.",
            "Doğru. Enerji/sıcaklık farkı oranı J/K ve yönsüz bir yanıt katsayısıdır.",
            "Bu kuvvetin birimi ve türüdür; C tanımıyla uyuşmaz.",
            "Sıcaklık farkına bölmek yerine onunla çarpılmıştır.",
          ],
          commonError:
            "Oranın içinde temel bir nicelik bulunduğu için bütün oranı temel saymak.",
          check: "C·ΔT enerji birimi J verir; K⁻¹ ile K sadeleşir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-21",
        prompt: {
          tr: "Bir öğretim yazılımında üç ölçüm noktası kullanıcının seçtiği sayılarla çiziliyor; gerçek sensöre bağlı değil. Yazılım bu noktalardan ortalama ve aralık hesaplıyor. Hangi ifade bilimsel kapsamı doğru belirtir?",
        },
        options: [
          {
            tr: "Ekranda grafik çizildiği için gerçek sensör verisidir.",
          },
          {
            tr: "Ortalama çıktıysa gerçek büyüklüğün kesin değeri bulunmuştur.",
          },
          {
            tr: "Seçilmiş girdilerin hesaplanan özetidir; gerçek deney kaydı olduğu ileri sürülemez.",
          },
          {
            tr: "Programın her çıktısı otomatik soru başarısı ve ustalık kanıtıdır.",
          },
          {
            tr: "Kullanıcının seçtiği sayılarla hiçbir matematiksel işlem yapılamaz.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Noktalar kullanıcının girdiği sayılardır; sensör ölçümü olduğu verilmemiştir.",
        },
        explanation: {
          tr: "Noktalar kullanıcının girdiği sayılardır; sensör ölçümü olduğu verilmemiştir. Ortalama ve aralık bu sayıların geçerli matematiksel özetleri olabilir. Bunları gerçek aygıtın doğruluğu veya yeni deneysel kanıt diye sunmak için ayrıca gerçek ölçüm ve yöntem gerekir.",
        },
        skill: "physics026-fizik-bilimine-giris-21",
        guidance: {
          knowledge: [
            "Model girdileriyle doğru hesap yapmak, bu girdilerin gerçek deneyde ölçüldüğünü tek başına göstermez.",
          ],
          strategy:
            "Hesabın matematiksel doğruluğu ile girdilerin veri kaynağını ayrı değerlendir.",
          steps: [
            "Noktalar kullanıcının girdiği sayılardır; sensör ölçümü olduğu verilmemiştir.",
            "Ortalama ve aralık bu sayıların geçerli matematiksel özetleri olabilir.",
            "Bunları gerçek aygıtın doğruluğu veya yeni deneysel kanıt diye sunmak için ayrıca gerçek ölçüm ve yöntem gerekir.",
          ],
          optionReasons: [
            "Grafik çizilmesi sayıların kaynağını gerçek ölçüme dönüştürmez.",
            "Ortalama, seçilmiş veri grubunun özetidir; gerçek değere kesin eşitlik vermez.",
            "Doğru. Girdinin kaynağı ile yapılan hesap ayrı bilgi türleridir.",
            "Bir keşif hesabı, bağımsız soru yanıtı veya öğrenme başarısı ölçümü değildir.",
            "Seçilmiş sayılar için ortalama ve aralık hesaplanabilir; kapsam doğru adlandırılmalıdır.",
          ],
          commonError:
            "Modelin görünen grafiğini gerçek veri veya otomatik öğrenme kanıtı saymak.",
          check:
            "Bir hesap sonucu doğru olabilirken gerçek deney iddiası için veri kaynağı yine eksik olabilir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-22",
        prompt: {
          tr: "Bir araştırma sorusu “Belirli bir yalıtkanın kalınlığı artınca aynı sıcaklık farkında bir saatte aktarılan enerji nasıl değişir?” biçiminde. Hangi ek bilgi, soruyu nicel olarak sınamak için en doğrudan gereklidir?",
        },
        options: [
          {
            tr: "Sonucun baştan mutlaka azalacağının ilan edilmesi.",
          },
          {
            tr: "Yalıtkanın reklamda kullanılan rengi.",
          },
          {
            tr: "Bütün ölçümler aynı sayı çıkana kadar veri silme yöntemi.",
          },
          {
            tr: "Deneyi yapan kurumun yalnız adı.",
          },
          {
            tr: "Enerji ölçüm yöntemi ve aynı tutulan malzeme, alan, sıcaklık farkı koşulları.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Kalınlık değiştirilen nicelik, bir saatte aktarılan enerji ölçülen sonuçtur.",
        },
        explanation: {
          tr: "Kalınlık değiştirilen nicelik, bir saatte aktarılan enerji ölçülen sonuçtur. Malzeme, yüzey alanı ve iki tarafın sıcaklık farkı gibi etkiler denetim altında tutulmalıdır. Enerji ölçüm yöntemi ile bu kontrol koşulları belirtilirse nicel kıyas kurulabilir; yalnız “iyi yalıtır” sözü yetmez.",
        },
        skill: "physics026-fizik-bilimine-giris-22",
        guidance: {
          knowledge: [
            "Sınanabilir karşılaştırmada ölçülecek nicelik, süre, sistem ve kontrol koşulları tanımlanmalıdır.",
          ],
          strategy:
            "Verilen bağıntıda değiştirilen kalınlığa karşı enerji ölçümünün nasıl karşılaştırılacağını arat.",
          steps: [
            "Kalınlık değiştirilen nicelik, bir saatte aktarılan enerji ölçülen sonuçtur.",
            "Malzeme, yüzey alanı ve iki tarafın sıcaklık farkı gibi etkiler denetim altında tutulmalıdır.",
            "Enerji ölçüm yöntemi ile bu kontrol koşulları belirtilirse nicel kıyas kurulabilir; yalnız “iyi yalıtır” sözü yetmez.",
          ],
          optionReasons: [
            "Beklenti kurmak, deneysel yöntemi ve denetimi tamamlamaz.",
            "Renk tek başına ölçüm yöntemini ve diğer kontrol etkilerini belirlemez.",
            "Veri silmek kontrollü karşılaştırma sağlamaz; ölçüm kaydını yanıltır.",
            "Kurum adı nicel ölçüm ve kontrol koşullarının yerini tutmaz.",
            "Doğru. Kalınlık etkisini başka etkenlerden ayıran ölçüm düzenini tamamlar.",
          ],
          commonError:
            "Sınanabilir soru kurmayı yalnız bir beklenti cümlesi yazmak sanmak.",
          check:
            "Süre zaten 1 saat olarak sabit; enerji için ölçüm ve diğer etkiler için kontrol gerekir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-23",
        prompt: {
          tr: "Bir sensörün kalibrasyon verileri x=1,2,3,4 için sırasıyla y=2,4,6,6. Hiçbir ölçüm belirsizliği verilmediği ve değerlerin kesin kabul edildiği belirtiliyor. Tüm aralık için y=2 x iddiasına ilişkin en uygun değerlendirme hangisidir?",
        },
        options: [
          {
            tr: "İlk üç uyum son veriyi otomatik yanlış yapar.",
          },
          {
            tr: "y=2 x dört kesin veriye de uyar.",
          },
          {
            tr: "Son değer aynı kaldığı için bütün eğimler sıfırdır.",
          },
          {
            tr: "Bu veriler aygıtın neden doymuş olduğunu kesin kanıtlar.",
          },
          {
            tr: "İlk üç noktaya uyar; x=4 verisi tüm aralık iddiasını karşılamaz.",
          },
        ],
        answer: 4,
        hint: {
          tr: "İlk üç girdide 2 x sırasıyla 2,4,6 verir ve verilerle uyumludur.",
        },
        explanation: {
          tr: "İlk üç girdide 2 x sırasıyla 2,4,6 verir ve verilerle uyumludur. x=4 için model 8 öngörür; kesin veri 6 olduğundan tüm aralıkta aynı model uymaz. Son noktada doyma gibi başka bir mekanizma olabilir; bu mekanizmanın ne olduğu tek veriyle kesinleşmez. Tüm aralık için model yeniden sınanmalıdır.",
        },
        skill: "physics026-fizik-bilimine-giris-23",
        guidance: {
          knowledge: [
            "Bir modelin bütün belirtilen kesin verileri karşılaması gerekir; veri aralığına göre kapsam sınanır.",
          ],
          strategy:
            "Öngörüyü her veri noktasında denetle; özellikle son girdide hesapla.",
          steps: [
            "İlk üç girdide 2 x sırasıyla 2,4,6 verir ve verilerle uyumludur.",
            "x=4 için model 8 öngörür; kesin veri 6 olduğundan tüm aralıkta aynı model uymaz.",
            "Son noktada doyma gibi başka bir mekanizma olabilir; bu mekanizmanın ne olduğu tek veriyle kesinleşmez. Tüm aralık için model yeniden sınanmalıdır.",
          ],
          optionReasons: [
            "Son ölçümün hatalı olduğu ayrıca gösterilmemiştir; modelin kapsamı da sorgulanır.",
            "x=4 için 2 x=8 olur; verilen 6 ile eşit değildir.",
            "Yalnız son aralıkta gösterge artışı 0; ilk üç nokta arasındaki artışlar sıfır değildir.",
            "Son aralıkta plato görülür; nedenini ayırt etmek için ek mekanizma ve ölçüm gerekir.",
            "Doğru.4 girdisinde 8 beklenirken 6 verilmiştir; belirtilen kesinlikte uyumsuzluk vardır.",
          ],
          commonError:
            "Kısmi veri uyumunu tüm aralık için geçerlilik veya tek bir mekanizma kanıtı saymak.",
          check:
            "Belirsizlik verilseydi uyum o sınırlar içinde değerlendirilirdi; burada değerler kesin kabul edilmiştir.",
        },
      },
      {
        id: "f026p-fizik-bilimine-giris-24",
        prompt: {
          tr: "Bir model Q=m·c·ΔT biçiminde. Q enerji, m kütle, ΔT sıcaklık farkı. Q joule, m kilogram, sıcaklık farkı kelvin ile verildiğinde c’nin birimi nedir?",
        },
        options: [
          {
            tr: "kg·K/J",
          },
          {
            tr: "J/(kg·K)",
          },
          {
            tr: "J·kg·K",
          },
          {
            tr: "J/K",
          },
          {
            tr: "K/(kg·J)",
          },
        ],
        answer: 1,
        hint: {
          tr: "Pay J, payda kg·K’dır.",
        },
        explanation: {
          tr: "Pay J, payda kg·K’dır. c birimi J/(kg·K) olur. J=kg·m²/s² açılımı kullanılırsa kg sadeleşir ve m²·s⁻²·K⁻¹ elde edilir.",
        },
        skill: "physics026-fizik-bilimine-giris-24",
        guidance: {
          knowledge: [
            "Bir çarpımda bilinmeyen katsayı birimi, sol tarafın biriminin diğer çarpanların birimlerine bölünmesiyle bulunur.",
          ],
          strategy:
            "c=Q/(m·ΔT) yazıp enerji birimini kütle ve sıcaklık farkına böl.",
          steps: [
            "Pay J, payda kg·K’dır.",
            "c birimi J/(kg·K) olur.",
            "J=kg·m²/s² açılımı kullanılırsa kg sadeleşir ve m²·s⁻²·K⁻¹ elde edilir.",
          ],
          optionReasons: [
            "Gerekli katsayı biriminin tersi alınmıştır.",
            "Doğru. m·c·ΔT çarpımı bu birimle yeniden joule verir.",
            "Bölünmesi gereken kütle ve sıcaklık birimleri çarpılmıştır.",
            "Kütle birimi atlanmıştır; bu ısı sığasının birimi olabilir, verilen c’nin değil.",
            "Sıcaklık farkı yanlışlıkla paya taşınmıştır.",
          ],
          commonError:
            "Formüldeki katsayının birimini, yanındaki bütün birimleri gelişigüzel çarparak kurmak.",
          check: "kg·[J/(kg·K)]·K=J eşitliği birimi geri doğrular.",
        },
      },
    ],
    source:
      "MEBİ TYT Fizik ile OGM Dersler Cepte kaynakları karşılaştırılarak hazırlanmış özgün derin öğretim. Önkoşullar, ölçüm/model sınırları ve kaynaklardaki aşırı genellemeler bilimsel denetimle ayrılmıştır. Sorular ve çözümlü örnekler özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "madde-ozkutle",
    detail: "detail-115",
    title: "Madde ve özellikleri: kütleden yoğunluğa",
    minutes: 120,
    objectives: [
      "Kütle, ağırlık ve farklı hacim tanımlarını ölçüm koşuluyla ayır.",
      "Özkütle grafiği, dara, boşluk ve gerçek karışım hacmi problemlerini kütle–hacim bilançosuyla çöz.",
      "Benzerlikte kesit kapasitesi ile kendi ağırlığına göre destek oranını farklı değerlendir.",
      "Islatma, yüzey gerilimi ve ideal kılcal dengeyi yarıçap, temas açısı ve ortam varsayımıyla açıkla.",
    ],
    sections: [
      {
        title: "Kütle ağırlıkla aynı değildir",
        paragraphs: [
          "Kütle, cismin eylemsizlik özelliğiyle ilişkilidir; SI birimi kilogramdır. Ağırlık, belirli bir çekim alanında cisme etki eden kuvvettir; yaklaşık düzgün yerel alanda G=m·g yazılır ve birimi newtondur. Bir cismi Dünya’dan başka bir yerdeki laboratuvara götürmek, kapalı ve madde alışverişsiz cismin kütlesini bu klasik modelde değiştirmez; g farklıysa ağırlık değişebilir.",
          "Eşit kollu terazi aynı yerde iki kütleyi karşılaştırır; iki kefedeki ortak g etkisi dengede sadeleşir. Yaylı kuvvetölçer ağırlık kuvvetine tepki verir; üzerindeki kilogram ölçeği belirli g için kalibre edilmiş olabilir. Ölçümün “kg gösterdiği” ile aracın hangi fiziksel etkiye yanıt verdiğini ayır. Kapla birlikte tartımda kabın darası çıkarılmadan bulunan sayı, örneğin yalnız kendi kütlesi değildir.",
        ],
      },
      {
        title: "Hacim ölçerken boşluk ve batma koşuluna bak",
        paragraphs: [
          "Hacim cismin uzayda kapladığı yerdir. Dikdörtgenler prizmasında a·b·c, silindirde πr² h ve kürede 4πr³/3 bağıntıları geometrik hacim verir. Şekli düzensiz, çözünmeyen ve sıvı emmeyen bir cisim tamamen batırıldığında seviye artışı yer değiştiren dış hacme eşittir. Cismin tamamı batmadıysa yalnız batan bölümün hacmi ölçülmüş olur.",
          "Dereceli kapta ilk ve son hacim aynı birimde okunur; fark Vson−Vilk alınır. Taşma, hapsolmuş hava, çözünme ve gözeneklere sıvı girmesi bu basit farkın anlamını değiştirebilir. Cismin içindeki kapalı boşluk dışarıdan sıvı giremiyorsa yer değiştiren dış hacme dahildir; açık bir oyuk sıvıyla doluyorsa o sıvı boşluğu ayrıca yer değiştirmez. Ölçmeden önce hangi hacmin arandığını belirt.",
        ],
      },
      {
        title: "Özkütle oranı neden miktara bağlı değildir?",
        paragraphs: [
          "Homojen örneğin özkütlesi ρ=m/V ile tanımlanır. Aynı madde, aynı sıcaklık ve basınç koşulunda örnek miktarı değişse de kütle ve hacim aynı oranda değişirse oran sabit kalır. Kütlesi büyük her örneğin özkütlesi de büyük olmak zorunda değildir; büyük bir düşük yoğunluklu blok, küçük bir yoğun metal parçasından daha ağır olabilir.",
          "Kabın darası çıkarılmış saf örnek için m–V grafiğinin eğimi özkütleyi verir. Doğru orijinden geçmiyorsa toplam tartımda kap veya başka bir sabit katkı bulunabilir; tek noktada toplam m/V oranını almak yanıltabilir. Özkütle ayırt etmeye yardımcı olur, fakat aynı değere sahip her örneğin kesin aynı madde olduğunu kanıtlamaz. Karşılaştırmada koşullar ve örneğin homojenliği belirtilmelidir.",
        ],
      },
      {
        title: "Birimleri ve karışım kabulünü açık yaz",
        paragraphs: [
          "Bir karışımın ortalama özkütlesi toplam kütlenin son toplam hacme bölümüdür. Madde kaybı yoksa mtop=m₁+m₂; her bileşen için m=ρV kullanılır. Hacimler toplanabilir kabul edilmişse Vson=V₁+V₂ yazılabilir. Gerçek sıvı karışımlarında son hacim büzülme veya genleşme gösterebilir; verilen ölçülmüş son hacim, başlangıç hacimlerinin toplamından ayrı bir veridir.",
          "Toplanabilir hacimde eşit hacimli iki bileşenin karışım özkütlesi aritmetik ortalama; eşit kütleli bileşenlerde ise 2ρ₁ρ₂/(ρ₁+ρ₂) olur. İkisi aynı “eşit miktar” durumu değildir. Pozitif katkılar ve hacim toplama koşulunda karışım özkütlesi bileşenlerin arasında kalır. Bu son kuralı ölçülmüş büzülen hacme koşulsuz aktarma; önce gerçek kütle ve son hacim bilançosunu kur.",
        ],
      },
      {
        title: "Boyut büyütme ve dayanıklılık",
        paragraphs: [
          "Aynı malzeme ve geometrik benzerlikle bütün uzunluklar s katına çıkarsa kesit alanı s², hacim ve kütle s³ katına çıkar. Aynı izinli gerilmede taşıyıcı kesitin mutlak kuvvet kapasitesi alanla ölçeklenirken kendi ağırlığı hacimle artar. Bu sade karşılaştırmada kendi ağırlığına göre destek oranı kesit/hacim ile, dolayısıyla 1/s ile ölçeklenir.",
          "Büyük örneğin mutlak taşıyabileceği kuvvet daha büyük olabilirken kendi ağırlığına göre payı daha küçük olabilir. “Büyüdükçe dayanıklılık azalır.” cümlesinde hangi dayanıklılığın kastedildiği bu yüzden önemlidir. Malzeme, şekil veya oranlar değişirse tek s çarpanı kullanılamaz. Burkulma, çatlaklar ve ayrıntılı yapı hesabı bu basit modelin dışındadır; bu oran gerçek bir yapının mühendislik güvenlik hesabı değildir.",
        ],
      },
      {
        title: "Yapışma, yüzey ve kılcal boru",
        paragraphs: [
          "Adezyon farklı tür maddeler arasındaki, kohezyon aynı madde içindeki tanecikler arası etkileşimlerle ilişkilidir. Sıvının bir katı yüzeyi ıslatıp yayılması, sıvı–katı–gaz arayüzlerinin özelliklerine bağlıdır. Temiz camdaki su ile aynı yüzeydeki cıvanın menisküsleri farklı olabilir. Bu, sadece sıvının özkütlesine bakılarak belirlenen bir davranış değildir.",
          "Yüzey gerilimi γ, bir arayüzün alanını artırmak için gereken enerji/alan olarak veya uygun düzenekte kuvvet/uzunluk olarak tanımlanır. Birimleri J/m² ve N/m eşdeğerdir. Yüzeyi katı bir zar gibi düşünmek yerine arayüz alanı değişiminin enerji maliyetini kullan. Islatma ve menisküsün kılcal yükselmeye etkisini anlatmak için temas açısı ve tüp geometrisi de belirtilmelidir.",
        ],
      },
      {
        title: "Madde hâli ve ölçüm koşulu",
        paragraphs: [
          "Katıların belirli biçim ve hacmi; sıvıların belirli hacmi ve kabın uygun bölümüne uyum sağlayan biçimi vardır. Gaz, içinde bulunduğu erişilebilir hacme yayılır. Bir sıvı kabın tüm hacmini doldurmak zorunda değildir. Tanecikler arası uzaklık ve etkileşimler maddenin sıkışabilirliğini ve biçim değiştirmesini etkiler; aynı nicelikler her hâlde aynı ölçüm yöntemiyle bulunmaz.",
          "Bir madde için sıcaklık ve basınç değişirse hacim ve özkütle de değişebilir. Farklı maddelerin hâllerini sırf katı–sıvı–gaz sırasıyla evrensel sıcaklık sırasına dizemezsin; oda sıcaklığındaki sıvıyla çok daha sıcak bir katı birlikte bulunabilir. Buradaki miktardan bağımsız özkütle karşılaştırmaları özellikle aynı sıcaklık, basınç ve yapı koşullarındaki örnekler içindir.",
        ],
      },
      {
        title: "Kapalı sistem ve tartım bilançosu",
        paragraphs: [
          "Bir kaba madde eklerken toplam kütle kap ve örneğin toplamıdır. Dara biliniyorsa mnet=mtoplam−mdara ile yalnız örnek bulunur. Tartım öncesi ve sonrası sıvı buharlaşmış veya taşmışsa kapalı sistem kabulü bozulur; kütle farkının tamamını incelenen cisme yükleyemezsin. Cihazın sıfır sapması ile kabın fiziksel darası da kavramsal olarak farklıdır.",
          "Yoğunluk ölçümünde birim ve sınır denetimi yap: pozitif örnek kütlesi için toplam dara değerinden büyük; pozitif yer değiştiren hacim için son okuma ilk okumadan büyük olmalıdır. Aynı kabın farklı miktarlarda dolumu, dara ve özkütleyi birlikte ayıran bir m–V doğrusu oluşturabilir. Bütün hesaplarda hangi kütlenin kaba, hangisinin örneğe ait olduğu açık tutulur.",
        ],
      },
      {
        title: "Özkütle birimlerini dönüştür",
        paragraphs: [
          "SI özkütle birimi kg/m³’tür. Günlük laboratuvar verileri sıklıkla g/cm³ veya g/mL olarak gelir; 1 cm³=1 mL olduğundan bu son iki sayı aynı olabilir.1 g/cm³=1000 kg/m³ dönüşümünde kütlenin 10⁻³ kg, hacmin 10⁻⁶ m³ çarpanı birlikte kullanılır. Sadece gramı kilograma çevirip hacmi unutmak sonucu binlerce kat değiştirebilir.",
          "Bir oranı yorumlarken birim çiftiyle düşün: 2 g/cm³, her 1 cm³ homojen örnekte 2 g kütle anlamına gelir.20 cm³ için 40 g,5 g için 2,5 cm³ bulunur. Buna karşılık 20 g ile 20 cm³ sayılarının aynı olması, birimler ve malzeme koşulları verilmeden evrensel bir eşitlik değildir. Su için kullanılan yaklaşık 1 g/cm³ değeri de belirli koşullar içindir; bütün sıvılara taşınmaz.",
        ],
      },
      {
        title: "Sıvı düzeyi hangi hacmi verir?",
        paragraphs: [
          "Tam batırılmış, kapalı ve sıvı emmeyen bir örnekte seviye farkı dış hacmi verir. Bu ölçüm, bir cismin yalnız katı malzemesinin hacmiyle her zaman aynı değildir. İçi kapalı boşluk olan bir cismin dış sınırı sıvıyı uzaklaştırır; boşluğun içi sıvıyla dolmadığından bu boşluk dış hacme dahildir. Geometrik dış hacim ile maddeyi oluşturan katı kısmın hacmini ayrı adlandır.",
          "Gözenekli bir örnek sıvı alırsa ilk ve son okuma, gözeneklerin erişilebilirliğine ve bekleme süresine bağlı olabilir. Hava kabarcığı ek yer değiştirme gibi görünebilir; çözünen bir örnekte örneğin hacmi ve sıvının bileşimi değişebilir. Böyle durumlarda basit Vson−Vilk bağıntısı tek başına istenen katı hacmini vermez. Soru kökünün verdiği batma, çözünmeme ve sıvı emmeme kabullerini hesapla birlikte kullan.",
        ],
      },
      {
        title: "Kısmi batmada oranı sınırla",
        paragraphs: [
          "Bir örneğin yalnız bir kısmı sıvı içindeyse seviye artışı batan kısmın hacmidir. Tüm örneğin kütlesini bu kısmi hacme bölmek, tüm dış hacimle tanımlı ortalama özkütleyi vermez. Batan hacim dış hacimden küçük olduğu için m/Vbatan oranı, m/Vdış oranından daha büyüktür; dış hacim bilinmiyorsa bu oran yalnız üst sınır sağlar.",
          "Bu çıkarım için örneğin kütlesi ve yer değiştiren hacmin gerçekten batan hacim olduğu bilinmelidir. Yüzey gerilimi, dıştan tutma veya kaldırma etkilerinin bulunup bulunmadığına göre neden o kadar battığı ayrıca değişebilir. Laboratuvar, “kısmi batma” seçiminde bir yoğunluk değeri uydurmak yerine dış hacmin verilmediğini ve yalnız bu üst sınırın bulunduğunu açıkça gösterir.",
        ],
      },
      {
        title: "İçi boş cisim ve ortalama yoğunluk",
        paragraphs: [
          "Homojen katı malzemenin özkütlesi ρmadde, katı kısmın kütlesi ve hacmi arasındaki orandır. Kapalı boşluklu bir cismin ortalama özkütlesi ise toplam kütlenin tüm dış hacme oranıdır. Boşluğun kütlesi ihmal edilirse m=ρmadde·Vkatı ve Vdış=Vkatı+Vboşluk yazılır. Bu iki oran farklı nicelikleri anlatır.",
          "Aynı dış hacimde daha fazla kapalı boşluk bulunması, aynı malzemeden cismin kütlesini ve ortalama yoğunluğunu azaltır; malzemenin kendi özkütlesini değiştirmez. Boşluk sıvıyla doluyorsa toplam kütleye sıvı da eklenir. Boşluğun açık mı kapalı mı olduğu verilmeden seviye farkı, malzeme hacmi ve ortalama yoğunluk için tek bir sonuç seçilmemelidir.",
        ],
      },
      {
        title: "Dara içeren m–V grafiği",
        paragraphs: [
          "Aynı kapta aynı homojen sıvı için toplam tartım mtop=mdara+ρV olur. İki dolum arasındaki Δmtop/ΔV oranı ρ’yu verir; sabit dara farkta gider. Doğrunun V=0’daki kesimi kaptır. Örneğin eksen sıfırından başlamayan bir doğruyu zorla orijinden geçirerek eğim hesaplamak, kap kütlesini örnek yoğunluğuna karıştırır.",
          "Eğer yatay eksen kütle, düşey eksen hacim yapılırsa eğim 1/ρ türü olur; birimi hacim/kütledir. Grafiğin kâğıttaki dikliği, ölçekler değiştirilince değişebilir. Eğimi daima sayısal eksen farklarından birimiyle hesapla. Parçalı veya eğri bir ilişki veriliyorsa homojen tek madde, sabit sıcaklık ve sabit dara kabullerinin hangi bölümde geçerli olduğu ayrıca sorgulanır.",
        ],
      },
      {
        title: "Sıcaklıkla hacim ve özkütle",
        paragraphs: [
          "Madde kaybı olmayan bir örnekte sıcaklık etkisiyle hacim değişirse m sabitken ρ=m/V değişir. Hacim yüzde 2 artarsa yeni yoğunluk eski yoğunluğun 1/1,02 katıdır; yüzdeyi doğrudan çıkarma ancak küçük değişimler için yaklaşık olabilir. Suyun belirli aralıktaki sıra dışı hacim davranışı gibi durumlar, “her madde her sıcaklık artışında aynı yönde değişir” genellemesini sınırlar.",
          "Hacmin sıcaklığa veya basınca nasıl bağlı olduğu verilmeden yalnız “ısıtıldı” sözcüğünden kesin sayı üretme. Gazlarda basınç ve sıcaklık koşulları özellikle önemlidir; katıların da genleşmesi ve sıkışması vardır. Bu rehberin yoğunluk modeli ölçüm anındaki kütle ve hacmi kullanır; ayrıca bir termal genleşme yasası çözmez. Farklı sıcaklıkta iki örneği karşılaştırırken aynı madde olsalar da farklı yoğunluk olabileceğini belirt.",
        ],
      },
      {
        title: "Karışımda kütle ve son hacmi ayır",
        paragraphs: [
          "Birinci sıvı için m₁=ρ₁V₁, ikinci için m₂=ρ₂V₂ yaz; tepkime ve kayıp yoksa toplam kütleyi topla. Son hacim ölçülmüşse ρson=(m₁+m₂)/Vson kullan. Başlangıç hacimlerinin toplamından küçük son hacim, aynı toplam kütleyi daha küçük paydada tuttuğu için toplanabilir hacim hesabından daha büyük yoğunluk verir.",
          "Toplanabilir hacim modelinde karışım yoğunluğu bir hacim ağırlıklı ortalamadır. Hacimce hangi bileşenin fazla olması, sonucun o bileşene yakınlığını etkiler. Eşit kütle sorusunda önce her birinin hacmini m/ρ ile bulmak gerekir; eşit kütle, eşit hacim değildir. Bir karışım heterojense yine kapta toplam m/V gibi bir yığın ortalaması tanımlanabilir; bunun her küçük bölgede aynı yerel yoğunluk olduğu ileri sürülmez.",
        ],
      },
      {
        title: "Aynı özkütle aynı kimliği kanıtlar mı?",
        paragraphs: [
          "Özkütle birçok malzemeyi ayırmada yararlıdır; sıcaklık, basınç, saflık ve yapı gibi koşullarıyla değerlendirilir. İki cismin aynı ölçülen yoğunluğu vermesi tek başına aynı kimyasal madde olduklarını kanıtlamaz. Bir alaşım, karışım veya boşluklu örnek başka bir saf maddeyle aynı ortalama değere sahip olabilir. Ek özellikler ve uygun analiz gerekebilir.",
          "Kütle/hacim oranının miktardan bağımsızlığı, ancak örnekler aynı tür homojen yapıyı temsil ediyorsa beklenir. İçinde hava boşluğu oranı farklı iki köpük örnek aynı malzemeden üretilse de farklı yığın yoğunluğu gösterebilir. Madde özkütlesi ile nesnenin ortalama özkütlesini ayırmak; yüzme, boşluk ve karışım yorumlarında gereksiz çelişkileri önler.",
        ],
      },
      {
        title: "Kesit kapasitesi ile kendi ağırlığı",
        paragraphs: [
          "Sade destek modelinde kesit alanı A için izinli kuvvet σizin·A ile orantılıdır; cismin kendi ağırlığı ρgV’dir. Bu ikisinin oranında aynı malzeme ve g sabit tutulursa A/V belirleyici olur. Aynı ölçekli benzer cismin büyütülmesi mutlak kesit kapasitesini artırırken kendi ağırlığını daha hızlı artırır. “Daha çok kuvvet taşır.” ile “Kendi ağırlığının daha çok katını taşır.” farklı iddialardır.",
          "Geometrik benzerlik yoksa bütün boyutlara tek s atayamazsın. Silindirin taban kesiti πr², hacmi πr² h olduğundan bu basit kendi ağırlığı oranı 1/h ile değişir; r çarpanı sadeleşir. Yalnız yarıçapı artırmak mutlak kapasiteyi artırabilir ama aynı yükseklikte bu oranı değiştirmez. Gerçek dayanıklılıkta malzeme sınırı, kusur ve burkulma etkileri ayrıca belirleyicidir.",
        ],
      },
      {
        title: "Yüzey enerjisi ve damla",
        paragraphs: [
          "Aynı arayüz için sabit γ kabul edilirse alanı ΔA kadar artırmanın en az tersinir enerji bedeli γΔA’dır. Sıvı damlası, hacim sabitken alanını azaltma eğilimi gösterir; dış etkiler küçükken küre en küçük alanlı biçimdir. Yerçekimi, yüzeye temas ve başka kuvvetler biçimi değiştirebilir. Uzay aracında yaklaşık küresel damla görülmesi yerçekimi kuvvetinin her yerde yok olduğu anlamına gelmez; serbest düşme koşulu önemlidir.",
          "Bir damlayı daha küçük damlalara bölmek toplam hacmi ve kütleyi koruyabilirken toplam yüzey alanını artırır. Bu nedenle sadece yoğunluk bilgisi damla bölmenin enerji gereğini açıklamaz. Bir küçük cismin sıvı yüzeyinde tutulmasında da yüzey gerilimi ve ıslatma önem taşır; yalnız “özkütlesi büyükse mutlaka hemen batar” denemez. Bu etkileri, tam batmış büyük cisim için basit hacim ölçümüyle karıştırma.",
        ],
      },
      {
        title: "Sıcaklık, bileşim ve arayüz",
        paragraphs: [
          "Yüzey gerilimi seçilen sıvı–gaz veya sıvı–sıvı arayüzüne, sıcaklığa ve bileşime bağlıdır. Birçok saf sıvıda uygun aralıkta sıcaklık artışı γ’yı azaltabilir; yüzey etkin maddeler bazı arayüzlerde γ’yı güçlü biçimde azaltır. Bununla birlikte her çözünen madde veya eklenen her sıvı aynı yönde ve aynı miktarda etki yapmaz. Ölçüm koşulu veya verilen veri kullanılmalıdır.",
          "Temas açısı, sıvı içinden ölçülen menisküs geometrisiyle tanımlanır. Aynı sıvı başka bir katı yüzeyde farklı temas açısı gösterebilir; temizleme veya yüzey kaplaması ıslatmayı değiştirebilir. Basit “adezyon büyükse yayılır” anlatımı nitel bir başlangıçtır; sayısal kılcal modelde doğrudan verilen temas açısının kosinüsü kullanılır. Böylece birden fazla arayüzün etkisi açık bir parametrede toplanır.",
        ],
      },
      {
        title: "İdeal kılcal dengeyi kur",
        paragraphs: [
          "Düşey dairesel tüpte geniş hazneye göre sıvı yüksekliği h için ideal denge 2πrγcosθ=ρgπr² h biçiminde kurulabilir. Soldaki terim temas çizgisi boyunca düşey yüzey gerilimi bileşeni, sağdaki terim yaklaşık sıvı sütunu ağırlığıdır. Sadeleşince h=2γcosθ/(ρgr) elde edilir. θ sıvı içinden ölçülür; menisküs hacmi ve sonlu tüp uzunluğu bu basit modelde ihmal edilir.",
          "θ<90° olduğunda cosθ pozitiftir ve h pozitif yükselme verir; θ=90° için h=0; θ>90° için h negatif, yani hazne düzeyinin altında kalma verir. Aynı γ,θ,ρ, g ile yarıçap yarıya inince |h| iki katına çıkar. Başka parametreler de değişiyorsa yalnız borunun “dar” oluşuyla kesin sayı kıyaslanamaz. Ölçülen yüksekliği tüm sistem için geçerli bir oran gibi kullanmadan bu kabulleri kontrol et.",
        ],
      },
      {
        title: "Denge yüksekliği ile akış hızını karıştırma",
        paragraphs: [
          "Kılcallıkta verilen Jurin bağıntısı statik denge yüksekliğini anlatır. Sıvının bu yüksekliğe ne kadar sürede ulaştığı, viskozite ve akış ayrıntılarına da bağlıdır. Dar tüpte denge yüksekliğinin daha büyük olması, sıvının mutlaka her anda daha hızlı aktığı anlamına gelmez. Kâğıt havlu ve fitilde gözenek ağı nedeniyle tek dairesel boru modeli ancak sade bir benzetmedir.",
          "Yüksek ağaçlarda su taşınmasını yalnız basit kılcal yükselmeyle açıklamak yeterli değildir; terleme, kohezyon–gerilim ve basınç farkları gerekir. Kanın dolaşımı da kalbin ve damar basınçlarının sağladığı akışla ilişkilidir; damara “kılcal” denmesi, kanın Jurin yükselmesiyle dolaştığı anlamına gelmez. Öğretim modelinin hangi sistemi temsil etmediğini belirtmek, aynı sözcüğü farklı mekanizmalara taşımayı önler.",
        ],
      },
      {
        title: "Yüzey/hacim ve parçalama",
        paragraphs: [
          "Birbirine benzer küçük parçaların yüzey/hacim oranı, bütün uzunluklar küçüldükçe büyür. Aynı toplam hacim daha çok küçük parçaya ayrılırsa toplam dış alan artabilir. Malzemenin kendi kütle/hacim oranı aynı kalırken dış yüzeyle gerçekleşen etkileşimler değişebilir. Daha büyük yüzey/hacim oranı ile daha büyük yoğunluk aynı nicelik değildir.",
          "Bu geometrik karşılaştırma temas, çözünme veya ısı aktarımı gibi yüzeyle ilişkili süreçlerde bir başlangıç sağlar; bütün süreçlerin hızını tek başına belirlemez. Kimyasal yapı, ortam ve boyutun çok küçük olduğu durumlarda yeni fiziksel etkiler de önemli olabilir. Bu rehberin benzerlik hesabı yalnız klasik alan ve hacim ölçeklemesini verir; özel nano malzeme davranışını otomatik üretmez.",
        ],
      },
      {
        title: "Madde laboratuvarındaki dört ayrı model",
        paragraphs: [
          "Yoğunluk görünümünde toplam tartım, dara ve sıvı düzeyi okumalarını birlikte değiştir. Tam ve kısmi batmanın sonuç alanında neden farklı tür bilgi verdiğini açıkla. Karışım görünümünde ölçülmüş son hacmi bağımsız değiştir; hacimlerin toplanabilir olması halinde verilen kıyas değeri ile gerçek son hacim hesabını ayrı oku. İki modelde de kütle ve hacim birimleri HTML sonuçlarda açık kalır.",
          "Benzerlik görünümünde aynı malzeme için alan, hacim, mutlak kapasite ve kendi ağırlığına göre oran ayrı gösterilir. Kılcal görünümde temas açısını 90° eşiğinin iki yanında incele; çizim yükseklik işaretine göre gerçekten hazne üstüne veya altına geçer. Bu modeller belirli kabullü öğretim hesaplarıdır; mühendislik güvenliği, gerçek kan akışı veya bir sıvının evrensel kimyasal tepkimesi için gizli veri üretmez.",
        ],
      },
      {
        title: "Önce hacmin adını yaz",
        paragraphs: [
          "Bir madde probleminde sırayla net kütleyi, aranan hacim türünü, birimleri ve koşulları belirle. Örnek sıvı mı, gözenekli katı mı, kapalı boşluklu cisim mi? V verisi bütün dış hacim mi, katı malzeme hacmi mi, yalnız batan hacim mi? Bu ayrımlar yapılmadan aynı ρ=m/V eşitliğine farklı anlamlı sayılar koymak yanlış sonuç verir.",
          "Hesaptan sonra fiziksel denetim yap: aynı madde miktarı iki katına çıktığında m ve V birlikte iki kat oluyorsa yoğunluk sabit kalmalı; dara eklenmesi eğimi değil toplam tartımı değiştirmeli; hacim büzülmesi aynı kütlede yoğunluğu artırmalı. Kılcal açı 90° olduğunda çizim düzey farkı 0 vermeli; benzerlikte s=1 bütün oranları 1 bırakmalı. Bu sınır denetimleri yeni bağlamlara aktarılabilir.",
        ],
      },
    ],
    examples: [
      {
        title: "Dolu kap doğrusundan dara ve malzeme",
        prompt:
          "Aynı kapta homojen bir sıvının 10 cm³ örneğiyle toplam tartım 108 g; 25 cm³ örneğiyle 150 g. Sıcaklık aynı, dara sabit, sıvı kaybı yok. Özkütleyi ve darayı bul; 18 cm³ dolum için toplam tartımı öngör.",
        strategy:
          "İki dolumun farkı darayı kaldırır; ardından kesim ve yeni dolum bulunur.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Sıvı kütle farkı 150−108=42 g, hacim farkı 25−10=15 cm³. Özkütle 42/15=2,8 g/cm³.",
          },
          {
            label: "2. adım",
            explanation: "10 cm³ sıvı 28 g olur; kap darası 108−28=80 g.",
          },
          {
            label: "3. adım",
            explanation: "18 cm³ sıvı 50,4 g; toplam tartım 80+50,4=130,4 g.",
          },
        ],
        answer: "ρ=2,8 g/cm³; dara 80 g; yeni toplam 130,4 g.",
        check: "25 cm³ için 80+2,8·25=150 g ikinci veriyi de sağlar.",
        pitfall:
          "Toplam 108 g’ı 10 cm³’e bölüp kabın kütlesini sıvı yoğunluğu saymak.",
      },
      {
        title: "Kapalı boşluğu tersine bul",
        prompt:
          "Dış hacmi 125 cm³ olan kapalı boşluklu bir parça 216 g. Katı malzemenin özkütlesi 2,7 g/cm³; boşluktaki gaz kütlesi ihmal. Boşluğun hacmini ve kapalı cismin ortalama özkütlesini bul. Sonra boşluk 1 g/cm³ sıvıyla tam doldurulup dış hacim değişmeden kapatılırsa toplam kütle nedir?",
        strategy:
          "Önce katı hacmini kütle/malzeme özkütlesinden bul; dış hacimden ayır.",
        steps: [
          {
            label: "1. adım",
            explanation: "Katı hacmi 216/2,7=80 cm³; boşluk 125−80=45 cm³.",
          },
          {
            label: "2. adım",
            explanation:
              "Boşken ortalama özkütle 216/125=1,728 g/cm³; bu malzemenin 2,7 değeri değildir.",
          },
          {
            label: "3. adım",
            explanation:
              "Doldurulan 45 cm³ sıvı 45 g ekler. Toplam 216+45=261 g olur; dış hacim 125 cm³ kalır.",
          },
        ],
        answer:
          "Boşluk 45 cm³; boşken ortalama 1,728 g/cm³; doldurulunca 261 g.",
        check:
          "Katı hacim 80 ile boşluk 45 toplamı 125 cm³; kütle artışı yalnız eklenen sıvıdır.",
        pitfall: "Dış hacmin tamamını katı malzeme hacmi kabul etmek.",
      },
      {
        title: "Son yoğunluktan büzülmeyi ölç",
        prompt:
          "Tepkime ve kayıp olmadan 50 cm³,1 g/cm³ sıvı ile 50 cm³,1,1 g/cm³ sıvı karıştırılıyor. Aynı koşulda son karışım özkütlesi 21/19 g/cm³ ölçülüyor. Son hacmi ve başlangıç toplamına göre hacim değişimini bul; arada kalma kuralını değerlendir.",
        strategy:
          "Kütleleri topla; ölçülmüş son yoğunlukla gerçek son hacmi geri çöz.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Başlangıç kütleleri 50 g ve 55 g; toplam 105 g korunur.",
          },
          {
            label: "2. adım",
            explanation:
              "Son hacim 105/(21/19)=95 cm³. Başlangıç toplamı 100 cm³ olduğundan değişim−5 cm³, yani%5 büzülmedir.",
          },
          {
            label: "3. adım",
            explanation:
              "21/19≈1,1053, bileşenlerin büyük yoğunluğu 1,1’den az farkla büyüktür. Bu veri hacim toplama kabulüyle çelişir; kütle/gerçek son hacim tanımıyla çelişmez.",
          },
        ],
        answer:
          "Vson=95 cm³; değişim−5 cm³. Hacim toplama kabulü burada geçerli değildir.",
        check: "95·21/19=105 g toplam kütleyi geri verir.",
        pitfall:
          "Her karışımda son yoğunluğun koşulsuz bileşenlerin arasında kalacağını varsaymak.",
      },
      {
        title: "İki kez hacim değişimiyle seyreltme",
        prompt:
          "200 cm³ homojen sıvının yoğunluğu 1 g/cm³. Her adımda iyi karışmış kaptan 50 cm³ çıkarılıp yerine 50 cm³,2 g/cm³ başka sıvı ekleniyor. İki adım boyunca hacimler toplanabilir; tepkime yok. İkinci adım sonundaki kütle ve özkütleyi bul.",
        strategy:
          "Her çıkarılan hacmin kütlesini o andaki karışım yoğunluğuyla hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Başlangıç 200 g. İlk çıkarılan 50 cm³,50 g; eklenen 50 cm³,100 g. İlk son kütle 250 g ve yoğunluk 1,25 g/cm³.",
          },
          {
            label: "2. adım",
            explanation:
              "İkinci çıkarılan 50 cm³ bu kez 62,5 g’dır. İkinci eklenen yine 100 g.",
          },
          {
            label: "3. adım",
            explanation:
              "Son kütle 250−62,5+100=287,5 g; hacim 200 cm³ olduğundan yoğunluk 1,4375 g/cm³.",
          },
        ],
        answer: "287,5 g ve 1,4375 g/cm³.",
        check:
          "Her adım sonunda hacim 200 cm³ kalır; ikinci çıkarılan örnek artık saf ilk sıvı değildir.",
        pitfall: "İkinci adımda da 50 g çıkarıldığını sanmak.",
      },
      {
        title: "Benzer olmayan silindirde iki oran",
        prompt:
          "Aynı malzemeden dik silindirin yarıçapı 2 kat, yüksekliği 3 kat yapılıyor. Taban alanına göre mutlak kesit kapasitesi ve kendi ağırlığına göre A/V destek oranı nasıl değişir? Yalnız bu sade model kullanılsın.",
        strategy:
          "Yarıçap ve yükseklik farklı çarpanla değiştiği için tek benzerlik ölçeği atama.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Taban alanıπr² olduğundan yeni alan 4 kat; aynı izinli gerilmede mutlak kapasite 4 kat.",
          },
          {
            label: "2. adım",
            explanation:
              "Hacimπr² h olduğundan yeni hacim 4·3=12 kat; kendi ağırlığı da 12 kat.",
          },
          {
            label: "3. adım",
            explanation:
              "Kapasite/ağırlık oranı 4/12=1/3 kat olur. Mutlak kapasitenin artması göreli oranın da arttığını göstermez.",
          },
        ],
        answer:
          "Mutlak kesit kapasitesi 4 kat; kendi ağırlığına göre oran 1/3 kat.",
        check: "A/V=1/h bağıntısı doğrudan 1/3 sonucunu doğrular; r sadeleşir.",
        pitfall:
          "Farklı boyut çarpanlarına rağmen cismi geometrik benzer saymak.",
      },
      {
        title: "İki kılcal ölçüm hangi çarpımı verir?",
        prompt:
          "Aynı sıvı ve tüp yüzeyiyle r=0,5 mm tüpte h=24 mm; r=1 mm tüpte h=12 mm ölçülüyor. ρ=1000 kg/m³, g=10 m/s². İdeal h=2γcosθ/(ρgr) modelinde γcosθ değerini bul. Bu iki ölçüm γ ve θ’yı ayrı ayrı belirler mi?",
        strategy:
          "Her ölçümde h·r sabitini denetle, sonra bileşik yüzey parametresini çöz.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "0,024 m·0,0005 m=0,012 m·0,001 m=1,2×10⁻⁵ m²; iki veri aynı h·r çarpımını verir.",
          },
          {
            label: "2. adım",
            explanation: "γcosθ=ρgrh/2=1000·10·1,2×10⁻⁵/2=0,06 N/m.",
          },
          {
            label: "3. adım",
            explanation:
              "İki ölçüm aynı çarpımı sınar; γ ve cosθ ayrı verilmediği için sonsuz uygun ikili olabilir. Örneğinγ=0,06,θ=0°veγ=0,12,θ=60°aynı çarpımı verir.",
          },
        ],
        answer: "γcosθ=0,06 N/m; γ ve temas açısı ayrı belirlenemez.",
        check: "İki örnek çiftin 0,06·1 ve 0,12·0,5 çarpımları eşittir.",
        pitfall:
          "İki farklı yarıçap ölçüldü diye iki bağımsız yüzey parametresi bulunduğunu sanmak.",
      },
      {
        title: "Açık gözenek ile dış hacmi ayır",
        prompt:
          "Kuru kütlesi 72 g olan katı örnek, ince kaplama ile gözenekleri kapatıldığında 40 cm³ sıvı yer değiştiriyor. Kaplamanın hacmi/kütlesi ihmal; kaplama kaldırılıp açık gözenekler tamamen sıvıyla dolduğunda 30 cm³ yer değiştiriyor. Şişme, çözünme ve başka kapalı gözenek yok. Dış hacmi, açık gözenek hacmini, kuru yığın yoğunluğunu ve katı iskelet yoğunluğunu bul.",
        strategy:
          "İki yer değiştirme verisini farklı hacim tanımları olarak kullan.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Kapalı yüzeyde sıvının dışladığı dış hacim 40 cm³. Açık gözenekler dolunca yer değiştiren katı iskelet hacmi 30 cm³ kalır.",
          },
          {
            label: "2. adım",
            explanation: "Açık gözenek hacmi 40−30=10 cm³; dış hacmin%25’i.",
          },
          {
            label: "3. adım",
            explanation:
              "Kuru yığın yoğunluğu 72/40=1,8 g/cm³; katı iskelet yoğunluğu 72/30=2,4 g/cm³.",
          },
        ],
        answer:
          "Dış 40 cm³; açık gözenek 10 cm³; kuru yığın 1,8 ve iskelet 2,4 g/cm³.",
        check:
          "Her yoğunluk aynı kuru 72 g’ı kendi tanımlı hacmine böler; ölçümde sıvıya geçen suyun kütlesi kuru tartıma eklenmez.",
        pitfall:
          "Gözenekleri dolduran sıvı alanını her iki ölçümde de dışlanan hacim saymak.",
      },
      {
        title: "Damlaları bölerken yüzey işi",
        prompt:
          "Dış etkiler ihmal edilen küresel bir sıvı damlası 8 eşit küresel damlaya ayrılıyor. Toplam hacim korunuyor, aynı arayüzün γ değeri sabit. Başlangıç yüzey enerjisi 12μJ. Son toplam yüzey enerjisi ve en az tersinir dış iş nedir?",
        strategy: "Hacimden yeni yarıçapı; yarıçaptan toplam alanı bul.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Her damlanın hacmi ilk hacmin 1/8’i olduğundan yarıçap ilk yarıçapın 1/2’si olur.",
          },
          {
            label: "2. adım",
            explanation:
              "Bir küçük damlanın alanı 1/4; 8 damlanın toplam alanı 8/4=2 kat olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Uson=2·12=24μJ. Alan oluşturmak için en az tersinir iş ΔU=24−12=12μJ’dir.",
          },
        ],
        answer: "Toplam yüzey enerjisi 24μJ; en az dış iş 12μJ.",
        check:
          "Kütle ve hacim korunurken yüzey alanı değişebilir; yoğunluğun değişmesi gerekmez.",
        pitfall: "Damla sayısı 8 kat oldu diye toplam alanı da 8 kat saymak.",
      },
    ],
    recall: [
      {
        prompt:
          "Kütle ile ağırlığın birimleri ve çevreye bağlılığı nasıl ayrılır?",
        answer:
          "Kütle kg; ağırlık N ve yerel g’ye bağlı kuvvettir. Kapalı klasik örnek başka g alanına taşınınca kütlesi aynı, ağırlığı farklı olabilir.",
      },
      {
        prompt: "Seviye artışını bütün dış hacme ne zaman eşitleyebilirsin?",
        answer:
          "Tam batma, çözünmeme, sıvı emmeme, taşma/kabarcık bulunmama gibi koşullarda; açık oyuk ve gözenek tanımı ayrıca belirtilmelidir.",
      },
      {
        prompt: "Toplam tartım–hacim doğrusunda dara ve özkütle nerededir?",
        answer: "mtop=mdara+ρV; kesim daradır, Δm/ΔV eğimi özkütledir.",
      },
      {
        prompt:
          "Eşit kütleli ve eşit hacimli karışım aynı ortalamayı mı verir?",
        answer:
          "Hayır. Toplanabilir hacimde eşitV aritmetik; eşitm,2ρ₁ρ₂/(ρ₁+ρ₂) verir. Gerçek son hacim ayrıca ölçülmüşse doğrudan mtop/Vson kullanılır.",
      },
      {
        prompt: "Mutlak kapasite ile göreli destek niçin farklı ölçeklenir?",
        answer:
          "Benzer aynı malzemede kesit kapasitesi s², ağırlık s³ ile; kapasite/ağırlık 1/s ile değişir.",
      },
      {
        prompt: "Yüzey geriliminin iki eşdeğer birimi nedir?",
        answer:
          "N/m ve J/m². Bir arayüzün alan değişiminin enerji bedeliyle ilişkilidir; katı bir zar değildir.",
      },
      {
        prompt: "Temas açısı 90° eşiğinde ideal kılcal model ne verir?",
        answer:
          "cos 90°=0 olduğu için h=0. Daha küçük açıda yükselme, daha büyük açıda alçalma verir.",
      },
      {
        prompt:
          "Dar kılcalda daha büyük denge yüksekliği, her zaman daha hızlı akış mı demektir?",
        answer:
          "Hayır. Denge yüksekliği ile akış süresi farklıdır; viskozite ve akış geometrisi süreyi etkiler. Kan dolaşımı Jurin yükselmesiyle açıklanmaz.",
      },
    ],
    questions: [
      {
        id: "f026p-madde-ozkutle-1",
        prompt: {
          tr: "Dara kütlesi 18 g olan kaba konan düzensiz örnekle toplam tartım 78 g. Örnek çözünmeden, sıvı emmeden ve kabarcık bırakmadan tamamen batırılınca dereceli sıvı düzeyi 40 cm³’ten 64 cm³’e çıkıyor. Örneğin özkütlesi kaç g/cm³’tür?",
        },
        options: [
          {
            tr: "3,25",
          },
          {
            tr: "1,5",
          },
          {
            tr: "0,4",
          },
          {
            tr: "2,5",
          },
          {
            tr: "0,9375",
          },
        ],
        answer: 3,
        hint: {
          tr: "Net örnek kütlesi 78−18=60 g.",
        },
        explanation: {
          tr: "Net örnek kütlesi 78−18=60 g. Tam batırmada hacim 64−40=24 cm³. Özkütle 60/24=2,5 g/cm³ olur.",
        },
        skill: "physics026-madde-ozkutle-1",
        guidance: {
          knowledge: [
            "Özkütlede örneğin net kütlesi ve tam batırmada yer değiştiren dış hacmi kullanılır.",
          ],
          strategy: "Tartımdan darayı, hacim okumalarından ilk düzeyi çıkar.",
          steps: [
            "Net örnek kütlesi 78−18=60 g.",
            "Tam batırmada hacim 64−40=24 cm³.",
            "Özkütle 60/24=2,5 g/cm³ olur.",
          ],
          optionReasons: [
            "78/24 toplam tartımı kullanır; 18 g kap darası çıkarılmamıştır.",
            "60/40 ilk sıvı hacmini örnek hacmi yerine kullanır.",
            "24/60 hacim/kütle oranıdır; istenen kütle/hacimdir.",
            "Doğru. Net 60 g, tam dış hacim 24 cm³’e bölünür.",
            "60/64 son sıvı düzeyini örnek hacmi sayar; ilk 40 cm³ çıkarılmalıdır.",
          ],
          commonError:
            "Dara ile örnek kütlesini veya sıvı okuması ile seviye farkını karıştırmak.",
          check: "2,5 g/cm³·24 cm³=60 g örnek kütlesini geri verir.",
        },
      },
      {
        id: "f026p-madde-ozkutle-2",
        prompt: {
          tr: "Kütlesi 36 g olan bir cismin yalnız bir kısmı sıvıya batmış; batan bölüm 12 cm³. Cismin tüm dış hacmi verilmemiş ve bu hacmin 12 cm³’ten büyük olduğu biliniyor. Dış hacme göre ortalama özkütlesi hakkında hangi sayısal sınır kesin kurulabilir?",
        },
        options: [
          {
            tr: "ρ=3 g/cm³",
          },
          {
            tr: "0<ρ<3 g/cm³",
          },
          {
            tr: "ρ=1/3 g/cm³",
          },
          {
            tr: "ρ>3 g/cm³",
          },
          {
            tr: "ρ=0",
          },
        ],
        answer: 1,
        hint: {
          tr: "36/12=3 g/cm³ kısmi hacimle bulunan orandır.",
        },
        explanation: {
          tr: "36/12=3 g/cm³ kısmi hacimle bulunan orandır. Tüm dış hacim 12 cm³’ten büyük olduğundan payda daha büyüktür. Ortalama özkütle 3 g/cm³’ten küçüktür; tam değer bu veriyle belirlenmez.",
        },
        skill: "physics026-madde-ozkutle-2",
        guidance: {
          knowledge: [
            "Aynı pozitif kütlede daha büyük hacme bölmek daha küçük yoğunluk verir.",
          ],
          strategy:
            "Önce m/Vbatan oranını hesapla; sonra gerçek dış hacmin daha büyük olduğunu kullan.",
          steps: [
            "36/12=3 g/cm³ kısmi hacimle bulunan orandır.",
            "Tüm dış hacim 12 cm³’ten büyük olduğundan payda daha büyüktür.",
            "Ortalama özkütle 3 g/cm³’ten küçüktür; tam değer bu veriyle belirlenmez.",
          ],
          optionReasons: [
            "Batan bölümün hacmi tüm hacim sayılmıştır; kök bunu açıkça dışlar.",
            "Doğru. Batan hacimden daha büyük dış hacim,36 g için 3’ten küçük pozitif oran verir.",
            "Hacim/kütle ters oranı hem yanlış nicelik hem de tüm hacmi bilinmeyen durumdur.",
            "Paydanın büyümesi yoğunluğu artırmaz; azaltır.",
            "Pozitif kütle ve sonlu pozitif dış hacim için yoğunluk sıfır değildir.",
          ],
          commonError:
            "Kısmi batmanın hacmiyle tüm cismin yoğunluğunu kesin hesaplamak.",
          check:
            "Örneğin dış hacim 18 olursa 2; 24 olursa 1,5 g/cm³ elde edilir; ikisi de sınırı sağlar.",
        },
      },
      {
        id: "f026p-madde-ozkutle-3",
        prompt: {
          tr: "Dış hacmi 60 cm³ olan kapalı boşluklu cisimde boşluk 10 cm³; gaz kütlesi ihmal. Katı madde özkütlesi 2 g/cm³. Sıvı boşluğa giremiyor. Cismin kütlesi ve tamamen batmada yer değiştirdiği hacim sırasıyla nedir?",
        },
        options: [
          {
            tr: "20 g; 10 cm³",
          },
          {
            tr: "120 g; 60 cm³",
          },
          {
            tr: "100 g; 60 cm³",
          },
          {
            tr: "100 g; 50 cm³",
          },
          {
            tr: "120 g; 50 cm³",
          },
        ],
        answer: 2,
        hint: {
          tr: "Katı hacmi 60−10=50 cm³.",
        },
        explanation: {
          tr: "Katı hacmi 60−10=50 cm³. Kütle 2·50=100 g. Kapalı boşluğa sıvı girmediğinden tam batmada yer değiştiren hacim 60 cm³’tür.",
        },
        skill: "physics026-madde-ozkutle-3",
        guidance: {
          knowledge: [
            "Katı madde hacmi dış hacimden boşluk çıkarılarak bulunur; kapalı boşluk dış sıvıyı da dışlar.",
          ],
          strategy:
            "Kütle için katı hacmi, yer değiştirme için dış hacmi kullan.",
          steps: [
            "Katı hacmi 60−10=50 cm³.",
            "Kütle 2·50=100 g.",
            "Kapalı boşluğa sıvı girmediğinden tam batmada yer değiştiren hacim 60 cm³’tür.",
          ],
          optionReasons: [
            "Yalnız boşluk hacmi kullanılmıştır; boşluğun kütlesi zaten ihmal edilmiştir.",
            "Dış hacmin tamamı katı madde sayılmıştır; boşluk kütlesi ihmal edilmelidir.",
            "Doğru. Kütleyi 50 cm³ katı, yer değiştirmeyi 60 cm³ dış hacim belirler.",
            "Kütle doğru; kapalı boşluk dış hacme dahil olduğu için yer değiştirme 50 değil 60 cm³’tür.",
            "Kütlede boşluk katı sayılmış, yer değiştirmede ise dışarıda bırakılmıştır; iki tanım da ters kullanılmıştır.",
          ],
          commonError:
            "Madde hacmiyle kapalı cismin dış hacmini aynı sayı saymak.",
          check:
            "Ortalama yoğunluk 100/60 iken malzemenin yoğunluğu 100/50=2 g/cm³ kalır.",
        },
      },
      {
        id: "f026p-madde-ozkutle-4",
        prompt: {
          tr: "Aynı homojen sıvı iki farklı kapta tartılıyor. Birinci kap için m₁=12+2 V; ikinci için m₂=30+2 V bağıntıları verilmiş; m gram, V cm³. Hangi kıyas doğrudur?",
        },
        options: [
          {
            tr: "Özkütleler eşit; ikinci dara 18 g daha büyük.",
          },
          {
            tr: "Aynı sıvı olduğu için toplam tartımlar her V’de eşittir.",
          },
          {
            tr: "İkinci sıvı 15 kat yoğundur.",
          },
          {
            tr: "Birinci kap darasızdır.",
          },
          {
            tr: "İkinci sıvı 18 g/cm³ daha yoğundur.",
          },
        ],
        answer: 0,
        hint: {
          tr: "İki doğrunun eğimi de 2 g/cm³’tür; sıvı özkütleleri eşittir.",
        },
        explanation: {
          tr: "İki doğrunun eğimi de 2 g/cm³’tür; sıvı özkütleleri eşittir. Dara değerleri 12 g ve 30 g’dır. Aynı V için ikinci toplam tartım 18 g fazladır; bu fark sıvı özkütlesi farkı değildir.",
        },
        skill: "physics026-madde-ozkutle-4",
        guidance: {
          knowledge: [
            "Toplam tartım–hacim doğrusunun eğimi sıvı özkütlesini, sabit terimi darayı verir.",
          ],
          strategy: "V katsayılarını ve V=0 kesimlerini ayrı karşılaştır.",
          steps: [
            "İki doğrunun eğimi de 2 g/cm³’tür; sıvı özkütleleri eşittir.",
            "Dara değerleri 12 g ve 30 g’dır.",
            "Aynı V için ikinci toplam tartım 18 g fazladır; bu fark sıvı özkütlesi farkı değildir.",
          ],
          optionReasons: [
            "Doğru. Eğimler 2; kesim farkı 30−12=18 g’dır.",
            "Farklı kap daraları aynı sıvı miktarında toplam tartımı farklı yapar.",
            "Sabit 30 terimi eğim 2’ye bölünerek sıvı yoğunluğu bulunmaz; 30 g kap darasıdır.",
            "V=0 için 12 g toplam tartım vardır; dara sıfır değildir.",
            "18 g kesim farkıdır; hacim başına kütle farkı değil.",
          ],
          commonError:
            "Doğru kesimini eğimle veya toplam kütle farkını yoğunluk farkıyla karıştırmak.",
          check: "V=10 cm³ için 32 g ve 50 g; fark yine 18 g’dır.",
        },
      },
      {
        id: "f026p-madde-ozkutle-5",
        prompt: {
          tr: "Özkütleleri 0,8 ve 1,2 g/cm³ olan sıvılar hacimce 3: 1 oranında karıştırılıyor. Tepkime ve kayıp yok; hacimler toplanabilir. Karışım özkütlesi kaç g/cm³ olur?",
        },
        options: [
          {
            tr: "0,9",
          },
          {
            tr: "1,0",
          },
          {
            tr: "3,6",
          },
          {
            tr: "1,1",
          },
          {
            tr: "0,3",
          },
        ],
        answer: 0,
        hint: {
          tr: "Kütleler 0,8·3 V=2,4 V ve 1,2 V; toplam 3,6 V olur.",
        },
        explanation: {
          tr: "Kütleler 0,8·3 V=2,4 V ve 1,2 V; toplam 3,6 V olur. Toplam hacim 4 V’dir. Karışım yoğunluğu 3,6 V/4 V=0,9 g/cm³.",
        },
        skill: "physics026-madde-ozkutle-5",
        guidance: {
          knowledge: [
            "Hacimce oranlı karışımda toplam kütle her bileşeninρV katkılarının toplamıdır.",
          ],
          strategy: "Hacimleri 3 V veV seçip ortakV’yi sadeleştir.",
          steps: [
            "Kütleler 0,8·3 V=2,4 V ve 1,2 V; toplam 3,6 V olur.",
            "Toplam hacim 4 V’dir.",
            "Karışım yoğunluğu 3,6 V/4 V=0,9 g/cm³.",
          ],
          optionReasons: [
            "Doğru. Düşük yoğunluklu sıvı hacimce üç kat fazla olduğundan hacim ağırlıklı oran 0,9’dur.",
            "Bu yalnız eşit hacimlerin aritmetik ortalamasıdır; hacimler 3: 1 verilmiştir.",
            "Bu seçilenV ölçeğinde toplam kütle katsayısıdır; 4 V hacme bölünmemiştir.",
            "Büyük yoğunluklu bileşene üç kat hacim verilmiş gibi ters ağırlıklandırır.",
            "Toplam hacim 4 V yerine 12 V alınırsa 3,6/12=0,3 çıkar; ikinci kez 3 ile çarpmak hacmi üç kez sayar.",
          ],
          commonError: "Eşit olmayan hacimlere aritmetik ortalama uygulamak.",
          check: "0,8<0,9<1,2 ve sonuç hacimce fazla olan 0,8’e daha yakındır.",
        },
      },
      {
        id: "f026p-madde-ozkutle-6",
        prompt: {
          tr: "Özkütleleri 1 ve 1,5 g/cm³ olan iki sıvının karışım özkütlesi 1,2 g/cm³ isteniyor. Tepkime yok, hacimler toplanabilir. Birinci ve ikinci sıvının hacim oranı V₁/V₂ ne olmalıdır?",
        },
        options: [
          {
            tr: "1",
          },
          {
            tr: "5",
          },
          {
            tr: "1/5",
          },
          {
            tr: "2/3",
          },
          {
            tr: "3/2",
          },
        ],
        answer: 4,
        hint: {
          tr: "1,2 V₁+1,2 V₂=V₁+1,5 V₂ yazılır.",
        },
        explanation: {
          tr: "1,2 V₁+1,2 V₂=V₁+1,5 V₂ yazılır. 0,2 V₁=0,3 V₂ elde edilir. V₁/V₂=0,3/0,2=3/2.",
        },
        skill: "physics026-madde-ozkutle-6",
        guidance: {
          knowledge: [
            "İstenen yoğunluk,1,2(V₁+V₂)=1·V₁+1,5·V₂ kütle bilançosunu sağlamalıdır.",
          ],
          strategy:
            "Toplam kütle eşitliğinde iki hacim katkısını farklı taraflara topla.",
          steps: [
            "1,2 V₁+1,2 V₂=V₁+1,5 V₂ yazılır.",
            "0,2 V₁=0,3 V₂ elde edilir.",
            "V₁/V₂=0,3/0,2=3/2.",
          ],
          optionReasons: [
            "Eşit hacim 1,25 g/cm³ verir; hedef 1,2 değildir.",
            "Bu oran(5+1,5)/6≈1,083 verir; hedefe uymaz.",
            "Bu oran(0,2+1,5)/1,2≈1,417 verir; hedefe uymaz.",
            "Hacim oranı ters alınmıştır; bu oranla karışım 1,3 g/cm³ olur.",
            "Doğru.1 g/cm³ bileşenin hacmi 1,5 kat olunca hedef 1,2 sağlanır.",
          ],
          commonError:
            "Yoğunluk farklarının oranını kurarken hangi hacme ait olduğunu terslemek.",
          check: "V₁=3, V₂=2 için kütle 6 g, hacim 5 cm³; oran 1,2’dir.",
        },
      },
      {
        id: "f026p-madde-ozkutle-7",
        prompt: {
          tr: "Özkütleleri 2 ve 8 g/cm³ olan iki sıvıdan eşit kütlede alınıyor. Tepkime yok, hacimler toplanabilir. Daha yoğun sıvının hacmi toplam karışım hacminin yüzde kaçıdır?",
        },
        options: [
          {
            tr: "%25",
          },
          {
            tr: "%50",
          },
          {
            tr: "%20",
          },
          {
            tr: "%80",
          },
          {
            tr: "%12,5",
          },
        ],
        answer: 2,
        hint: {
          tr: "Hacimler m/2 ve m/8; oran 4: 1’dir.",
        },
        explanation: {
          tr: "Hacimler m/2 ve m/8; oran 4: 1’dir. Toplam hacim 5 m/8, yoğun bileşenin hacmi m/8 olur. Pay(m/8)/(5 m/8)=1/5=%20.",
        },
        skill: "physics026-madde-ozkutle-7",
        guidance: {
          knowledge: [
            "Eşit kütlede hacim özkütleyle ters orantılıdır; hacim payı için her bileşenin m/ρ hacmi bulunur.",
          ],
          strategy:
            "Ortak kütleyi m seçip hacimleri ve yoğun bileşenin payını hesapla.",
          steps: [
            "Hacimler m/2 ve m/8; oran 4: 1’dir.",
            "Toplam hacim 5 m/8, yoğun bileşenin hacmi m/8 olur.",
            "Pay(m/8)/(5 m/8)=1/5=%20.",
          ],
          optionReasons: [
            "m/8 hacminin m/2’ye oranı 1/4’tür; istenen toplam hacme oranıdır.",
            "Eşit kütleler yanlışlıkla eşit hacim sayılmıştır.",
            "Doğru. Eşit kütlede yoğun sıvının hacmi düşük yoğunluklu sıvının dörtte biridir; toplamın beşte biridir.",
            "Bu düşük yoğunluklu sıvının hacim payıdır; sorulan 8 g/cm³ bileşenidir.",
            "1/8 sayısı hacim payı değildir; ortakm/2 hacim katkısı da paydaya eklenmelidir.",
          ],
          commonError:
            "Bir bileşenin diğerine oranını, toplam içindeki payıyla karıştırmak.",
          check:
            "Örnek 8 g+8 g alınırsa hacimler 4 ve 1 cm³; yoğun bileşen 1/5 pay alır.",
        },
      },
      {
        id: "f026p-madde-ozkutle-8",
        prompt: {
          tr: "Bir karışımda toplam kütle 160 g korunuyor. Başlangıç hacimleri toplamı 100 cm³; ölçülmüş son hacim 90 cm³. Hacim toplama kabulüyle bulunacak yoğunluğa göre gerçek son yoğunluk hangi oranla değişmiştir?",
        },
        options: [
          {
            tr: "Aynı kalmıştır.",
          },
          {
            tr: "Yüzde 10 azalmıştır.",
          },
          {
            tr: "2 katına çıkmıştır.",
          },
          {
            tr: "10/9 katına çıkmıştır.",
          },
          {
            tr: "9/10 katına inmiştir.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Toplanabilir hacim hesabı 160/100=1,6 g/cm³ olur.",
        },
        explanation: {
          tr: "Toplanabilir hacim hesabı 160/100=1,6 g/cm³ olur. Gerçek yoğunluk 160/90=16/9 g/cm³. Oran 100/90=10/9; gerçek değer eski hesabın 10/9 katıdır, yani 1/9 oranında artmıştır.",
        },
        skill: "physics026-madde-ozkutle-8",
        guidance: {
          knowledge: [
            "Aynı kütlede yoğunluk hacmin tersiyle değişir; yoğunlukların oranında kütle sadeleşir.",
          ],
          strategy: "İki yoğunluğun oranını(160/90)/(160/100) olarak kur.",
          steps: [
            "Toplanabilir hacim hesabı 160/100=1,6 g/cm³ olur.",
            "Gerçek yoğunluk 160/90=16/9 g/cm³.",
            "Oran 100/90=10/9; gerçek değer eski hesabın 10/9 katıdır, yani 1/9 oranında artmıştır.",
          ],
          optionReasons: [
            "Kütlenin korunması yoğunluğu tek başına korumaz; son hacim değişmiştir.",
            "Hem yön hem nicelik yanlıştır; hacim%10 azalınca yoğunluk 10/9 kat artar.",
            "Hacim yarıya inmemiş; 100’den 90’a düşmüştür.",
            "Doğru. Kütle aynı olduğundan yoğunluk oranı 100/90’dır.",
            "Bu hacim oranıdır; yoğunlukta ters oran kullanılır.",
          ],
          commonError:
            "Hacimdeki yüzde değişimi aynı yönde ve aynı yüzdeyle yoğunluğa aktarmak.",
          check: "(16/9)/1,6=10/9; iki hesapta da kütle 160 g kalır.",
        },
      },
      {
        id: "f026p-madde-ozkutle-9",
        prompt: {
          tr: "Madde kaybı olmayan homojen bir örneğin hacmi verilen sıcaklık değişiminde 1,25 katına çıkıyor. Bu aralıkta yalnız hacim değişimi biliniyor. Son özkütle ilk özkütlenin kaç katıdır?",
        },
        options: [
          {
            tr: "4",
          },
          {
            tr: "1",
          },
          {
            tr: "0,75",
          },
          {
            tr: "1,25",
          },
          {
            tr: "0,8",
          },
        ],
        answer: 4,
        hint: {
          tr: "ρilk=m/Vilk veρson=m/(1,25 Vilk).",
        },
        explanation: {
          tr: "ρilk=m/Vilk veρson=m/(1,25 Vilk). Oran 1/1,25=0,8 olur. Yoğunluk 0,8 katına iner; sıcaklığın sayısal değeri gerekmez, çünkü hacim çarpanı açık verilmiştir.",
        },
        skill: "physics026-madde-ozkutle-9",
        guidance: {
          knowledge: ["Kapalı örnekte kütle sabitkenρson/ρilk=Vilk/Vson olur."],
          strategy:
            "Hacim çarpanının tersini al; kütleyi iki tarafta sadeleştir.",
          steps: [
            "ρilk=m/Vilk veρson=m/(1,25 Vilk).",
            "Oran 1/1,25=0,8 olur.",
            "Yoğunluk 0,8 katına iner; sıcaklığın sayısal değeri gerekmez, çünkü hacim çarpanı açık verilmiştir.",
          ],
          optionReasons: [
            "1/0,25 hesabı yalnız artış payını tersler; son toplam hacim 1,25 kat kullanılmalıdır.",
            "Kütle korunur ama hacim değiştiği için yoğunluk korunmaz.",
            "Hacim%25 artışını yoğunluktan doğrudan%25 çıkarmak kesin oranı vermez.",
            "Bu hacim çarpanıdır; özkütle sabit kütlede ters yönde değişir.",
            "Doğru. Sabit kütlede hacim 1,25 kat iken yoğunluk 1/1,25 kat olur.",
          ],
          commonError:
            "Hacim artışının yüzde karşılığını yoğunluğa doğrusal ve ters yönde kopyalamak.",
          check: "0,8ρilk·1,25 Vilk=ρilkVilk=kütle.",
        },
      },
      {
        id: "f026p-madde-ozkutle-10",
        prompt: {
          tr: "Özkütlesi 800 kg/m³ olan bir sıvının 40 g örneği var. Aynı koşullardaki hacmi kaç mL’dir?1 g/cm³=1000 kg/m³ ve 1 mL=1 cm³ alınsın.",
        },
        options: [
          {
            tr: "50000",
          },
          {
            tr: "40",
          },
          {
            tr: "50",
          },
          {
            tr: "0,05",
          },
          {
            tr: "32",
          },
        ],
        answer: 2,
        hint: {
          tr: "800 kg/m³=0,8 g/cm³.",
        },
        explanation: {
          tr: "800 kg/m³=0,8 g/cm³. V=40/0,8=50 cm³. 1 cm³=1 mL olduğundan sonuç 50 mL’dir.",
        },
        skill: "physics026-madde-ozkutle-10",
        guidance: {
          knowledge: [
            "Hacim kütle/özkütledir; önce kütle ve yoğunluk birimleri uyumlu seçilmelidir.",
          ],
          strategy: "Yoğunluğu g/cm³’e çevirip 40 g’ı bu değere böl.",
          steps: [
            "800 kg/m³=0,8 g/cm³.",
            "V=40/0,8=50 cm³.",
            "1 cm³=1 mL olduğundan sonuç 50 mL’dir.",
          ],
          optionReasons: [
            "50 cm³’ü mL’ye çevirirken gereksiz 1000 çarpanı uygulanmıştır.",
            "Bu yalnız yoğunluk 1 g/mL olsaydı sayısal hacim olurdu; verilen 0,8’dir.",
            "Doğru.40 g/0,8 g/cm³=50 cm³=50 mL.",
            "40/800 işlemi birimleri uyumlu hale getirmeden yapılmıştır; çıkan sayı mL değildir.",
            "40·0,8 kütleyle yoğunluğu çarpar; hacim için bölmek gerekir.",
          ],
          commonError:
            "Sayılara işlem yapıp uyumsuz kütle–hacim birimlerini sonradan adlandırmak.",
          check: "50 mL·0,8 g/mL=40 g örnek kütlesini verir.",
        },
      },
      {
        id: "f026p-madde-ozkutle-11",
        prompt: {
          tr: "Aynı malzemeden bir prizmanın uzunluğu 2 kat, genişliği 2 kat, yüksekliği 3 kat yapılıyor. Bir öğrenci “Bütün uzunluklar 2 kat oldu; benzerlikte hacim 8 kat.” diyor. En uygun değerlendirme hangisidir?",
        },
        options: [
          {
            tr: "Hacim 12 kat olduğu için özkütle de 12 kat olur.",
          },
          {
            tr: "Geometrik benzerlik var; hacim 8 kat.",
          },
          {
            tr: "Malzeme aynı olduğu için hacim değişmez.",
          },
          {
            tr: "Geometrik benzerlik yok; hacim 12 kat.",
          },
          {
            tr: "Geometrik benzerlik yok; hacim 7 kat.",
          },
        ],
        answer: 3,
        hint: {
          tr: "İlk iki boyut 2 kat, üçüncü 3 kat olduğundan tek bir benzerlik ölçeği yoktur.",
        },
        explanation: {
          tr: "İlk iki boyut 2 kat, üçüncü 3 kat olduğundan tek bir benzerlik ölçeği yoktur. Hacim çarpanı 2·2·3=12’dir. Bu değişime bütün uzunluklar için s=2 atayıp s³=8 uygulamak doğru değildir.",
        },
        skill: "physics026-madde-ozkutle-11",
        guidance: {
          knowledge: [
            "Geometrik benzerlikte bütün karşılık gelen uzunlukların aynı çarpanla değişmesi gerekir.",
          ],
          strategy:
            "Üç boyut çarpanını ayrı denetle; sonra hacim çarpanını doğrudan bul.",
          steps: [
            "İlk iki boyut 2 kat, üçüncü 3 kat olduğundan tek bir benzerlik ölçeği yoktur.",
            "Hacim çarpanı 2·2·3=12’dir.",
            "Bu değişime bütün uzunluklar için s=2 atayıp s³=8 uygulamak doğru değildir.",
          ],
          optionReasons: [
            "Aynı homojen malzemede kütle de 12 kat olur; m/V oranı aynı kalır.",
            "Yüksekliğin 3 kat olduğu bilgisi göz ardı edilmiştir.",
            "Malzeme özkütleyi aynı tutabilir; geometrik hacim boyutlarla değişir.",
            "Doğru. Üçüncü boyut farklı çarpandadır; hacim çarpanları tek tek çarpılır.",
            "Uzunluk çarpanları 2+2+3 toplanmaz; hacimde çarpılır.",
          ],
          commonError:
            "İki boyutun aynı değişmesini bütün cismin geometrik benzerliği için yeterli saymak.",
          check: "Yeni kütle aynıρile 12 kat artar; yeniρ=12 m/12 V=ρ.",
        },
      },
      {
        id: "f026p-madde-ozkutle-12",
        prompt: {
          tr: "İdeal bir kılcalda h=2γcosθ/(ρgr). γ=0,05 N/m,ρ=1000 kg/m³, g=10 m/s², r=1 mm vecosθ=−0,5 verilmiş. h’nin işaretli değeri nedir?",
        },
        options: [
          {
            tr: "0 mm",
          },
          {
            tr: "−5 mm",
          },
          {
            tr: "+10 mm",
          },
          {
            tr: "−10 mm",
          },
          {
            tr: "+5 mm",
          },
        ],
        answer: 1,
        hint: {
          tr: "Pay 2·0,05·(−0,5)=−0,05 N/m.",
        },
        explanation: {
          tr: "Pay 2·0,05·(−0,5)=−0,05 N/m. Payda 1000·10·0,001=10; h=−0,005 m. h=−5 mm: sıvı düzeyi geniş haznenin 5 mm altında kalır.",
        },
        skill: "physics026-madde-ozkutle-12",
        guidance: {
          knowledge: [
            "Kılcal yüksekliğin işaretini temas açısının kosinüsü belirler; yarıçap SI’de metreye çevrilir.",
          ],
          strategy: "r=0,001 m yaz; pay ve paydayı işaretleriyle hesapla.",
          steps: [
            "Pay 2·0,05·(−0,5)=−0,05 N/m.",
            "Payda 1000·10·0,001=10; h=−0,005 m.",
            "h=−5 mm: sıvı düzeyi geniş haznenin 5 mm altında kalır.",
          ],
          optionReasons: [
            "Sıfır yalnızcosθ=0 gibi koşulda olur; verilen−0,5’tir.",
            "Doğru. Negatif kosinüs alçalma,−0,005 m ise−5 mm verir.",
            "Hem kosinüs büyüklüğü hem işareti yanlış kullanılmıştır.",
            "cosθ=−0,5 yerine−1 alınmıştır.",
            "Büyüklük doğru, temas açısının negatif kosinüsü atlanmıştır.",
          ],
          commonError:
            "Temas açısının kosinüs işaretini yok saymak veya milimetreyi metre gibi kullanmak.",
          check:
            "−5 mm işaretli sonuç, tüpteki sıvı düzeyinin hazneden düşük olduğunu anlatır.",
        },
      },
      {
        id: "f026p-madde-ozkutle-13",
        prompt: {
          tr: "Aynıγ, g ve temas açısında ideal bir kılcal deneyinin ikinci hâlinde sıvı özkütlesi 2 kat, tüp yarıçapı ilk değerin 1/4’ü. İlk yükselme pozitif. Son yükselme ilk değerin kaç katıdır?",
        },
        options: [
          {
            tr: "2",
          },
          {
            tr: "4",
          },
          {
            tr: "1",
          },
          {
            tr: "1/2",
          },
          {
            tr: "8",
          },
        ],
        answer: 0,
        hint: {
          tr: "Yeniρr çarpanı 2·(1/4)=1/2 katına iner.",
        },
        explanation: {
          tr: "Yeniρr çarpanı 2·(1/4)=1/2 katına iner. h ters orantılı olduğundan 1/(1/2)=2 katına çıkar. Kosinüs aynı ve pozitif kaldığı için işaret de pozitif kalır.",
        },
        skill: "physics026-madde-ozkutle-13",
        guidance: {
          knowledge: [
            "Aynıγcosθ ve g altında h,ρr çarpımının tersiyle orantılıdır.",
          ],
          strategy: "İki değişkenin paydadaki ortak çarpanını hesapla.",
          steps: [
            "Yeniρr çarpanı 2·(1/4)=1/2 katına iner.",
            "h ters orantılı olduğundan 1/(1/2)=2 katına çıkar.",
            "Kosinüs aynı ve pozitif kaldığı için işaret de pozitif kalır.",
          ],
          optionReasons: [
            "Doğru. Payda yarıya iner; yükselme iki kat olur.",
            "Yarıçap etkisi kullanılmış fakat özkütlenin 2 kat oluşu atlanmıştır.",
            "İki değişken tam dengelemiyor;ρr’nin çarpanı 1/2’dir.",
            "Payda çarpanıyla yükseklik çarpanı aynı yönde alınmıştır.",
            "Özkütle etkisi ters yönde uygulanmıştır; büyükρyükselmeyi azaltır.",
          ],
          commonError:
            "Birden çok parametre değişirken yalnız daralma etkisini kullanmak.",
          check: "h₂/h₁=(ρ₁r₁)/(2ρ₁·r₁/4)=2.",
        },
      },
      {
        id: "f026p-madde-ozkutle-14",
        prompt: {
          tr: "γ>0,ρ>0, g>0, r>0 olan ideal bir kılcal için temas açısı tam 90° seçilmiş. h=2γcosθ/(ρgr) vecos 90°=0. Hangi sonuç doğrudur?",
        },
        options: [
          {
            tr: "γkesin 0’dır.",
          },
          {
            tr: "h<0; çünkü 90°ıslatmayan sınırdır.",
          },
          {
            tr: "h>0; çünküγpozitif.",
          },
          {
            tr: "h sonsuzdur.",
          },
          {
            tr: "h=0;γpozitif kalabilir.",
          },
        ],
        answer: 4,
        hint: {
          tr: "cos 90°=0 olduğu için pay 2γ·0=0.",
        },
        explanation: {
          tr: "cos 90°=0 olduğu için pay 2γ·0=0. Pozitif sonlu paydaya bölünce h=0 olur. Yüzey gerilimi ortadan kalkmış değildir; bu geometride düşey bileşen sıfırdır.",
        },
        skill: "physics026-madde-ozkutle-14",
        guidance: {
          knowledge: [
            "Pozitifγbulunması tek başına yükselme gerektirmez; düşey bileşen cosθile belirlenir.",
          ],
          strategy:
            "Sıfır kosinüsünü paya yerleştir; bununγhakkında ne söylemediğini ayır.",
          steps: [
            "cos 90°=0 olduğu için pay 2γ·0=0.",
            "Pozitif sonlu paydaya bölünce h=0 olur.",
            "Yüzey gerilimi ortadan kalkmış değildir; bu geometride düşey bileşen sıfırdır.",
          ],
          optionReasons: [
            "Bu, köktekiγ>0 koşuluyla da çelişir; h=0 kosinüsten kaynaklanır.",
            "Verilen tam 90°değerinde kosinüs 0’dır; negatif değildir.",
            "Kosinüs çarpanı 0 olduğu için pozitifγtek başına yükselme vermez.",
            "Payda sıfır değil; pozitifρgr verilmiştir.",
            "Doğru. Düzey farkı 0,γ’nın yok olduğu anlamına gelmez.",
          ],
          commonError:
            "Kılcal düzey farkının sıfırını yüzey geriliminin sıfırı saymak.",
          check:
            "90°eşiğinde yükselme ile alçalmanın işareti değişir; tam eşikte h=0.",
        },
      },
      {
        id: "f026p-madde-ozkutle-15",
        prompt: {
          tr: "Bir deneyde iki sıvı içinγ,ρ, temas açısı ve tüp yarıçapı aynı; viskoziteleri farklı. İdeal h=2γcosθ/(ρgr) yalnız statik denge yüksekliğini veriyor. Bu veriyle hangi kıyas kurulabilir?",
        },
        options: [
          {
            tr: "İdeal denge yüksekliği aynı; ulaşma süresi bu bağıntıdan çıkmaz.",
          },
          {
            tr: "Yükseklik aynıysa her andaki akış hızı da aynıdır.",
          },
          {
            tr: "Viskozite farklıysa denge yüksekliği mutlaka farklıdır.",
          },
          {
            tr: "Dar tüpte kan dolaşımı da aynı statik yükselmedir.",
          },
          {
            tr: "Viskozitesi büyük olan kesin daha yüksek çıkar.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Denge bağıntısındakiγ,ρ,θ, raynı olduğundan aynı yerelgile denge yüksekliği aynıdır.",
        },
        explanation: {
          tr: "Denge bağıntısındakiγ,ρ,θ, raynı olduğundan aynı yerelgile denge yüksekliği aynıdır. Viskozite ve zamana bağlı akış bu bağıntının içinde değildir. Dolayısıyla dengeye aynı sürede veya aynı hızla ulaşılacağı söylenemez.",
        },
        skill: "physics026-madde-ozkutle-15",
        guidance: {
          knowledge: [
            "Statik denge bağıntısı, o dengeye ulaşma süresini içermez.",
          ],
          strategy:
            "Bağıntıda yer alan parametrelerle, hiç yer almayan akış süresini ayır.",
          steps: [
            "Denge bağıntısındakiγ,ρ,θ, raynı olduğundan aynı yerelgile denge yüksekliği aynıdır.",
            "Viskozite ve zamana bağlı akış bu bağıntının içinde değildir.",
            "Dolayısıyla dengeye aynı sürede veya aynı hızla ulaşılacağı söylenemez.",
          ],
          optionReasons: [
            "Doğru. Statik sonuç ile dinamik akış süresi farklı modeller ister.",
            "Aynı son denge, aynı zamana bağlı yol veya hız demek değildir.",
            "Verilen statik bağıntıda bu koşullarda viskozite bulunmaz.",
            "Bu deney geniş hazneli statik kılcal modelidir; basınçla kan dolaşımına taşınamaz.",
            "Böyle bir yükseklik ilişkisi verilen bağıntıdan türemez.",
          ],
          commonError:
            "Dengeyi belirleyen niceliklerle dengeye ulaşma süresini aynı formülden çıkarmak.",
          check:
            "İki sıvının farklı süre davranışı, aynı statik h sonucu ile çelişmez.",
        },
      },
      {
        id: "f026p-madde-ozkutle-16",
        prompt: {
          tr: "Sabitγvarsayılan bir arayüzün alanı 5 cm² artırılırken en az tersinir dış iş 10μJ ölçülüyor. W=γΔA ve 1 cm²=10⁻⁴ m². γkaç N/m’dir?",
        },
        options: [
          {
            tr: "50",
          },
          {
            tr: "0,002",
          },
          {
            tr: "0,02",
          },
          {
            tr: "0,000002",
          },
          {
            tr: "2",
          },
        ],
        answer: 2,
        hint: {
          tr: "10μJ=10×10⁻⁶ J; 5 cm²=5×10⁻⁴ m².",
        },
        explanation: {
          tr: "10μJ=10×10⁻⁶ J; 5 cm²=5×10⁻⁴ m². γ=(10×10⁻⁶)/(5×10⁻⁴)=2×10⁻² J/m². Sonuç 0,02 N/m olur.",
        },
        skill: "physics026-madde-ozkutle-16",
        guidance: {
          knowledge: ["Sabit arayüzdeγ=W/ΔA; J/m²=N/m eşdeğeridir."],
          strategy: "İşi joule, alanı metrekare yapıp böl.",
          steps: [
            "10μJ=10×10⁻⁶ J; 5 cm²=5×10⁻⁴ m².",
            "γ=(10×10⁻⁶)/(5×10⁻⁴)=2×10⁻² J/m².",
            "Sonuç 0,02 N/m olur.",
          ],
          optionReasons: [
            "Alan/iş ters oranıdır;γiçin iş alana bölünmelidir.",
            "Alan dönüşümünde fazladan 10 çarpanı kullanılmıştır.",
            "Doğru. İş/alan oranı 0,02 J/m² ve aynı sayıylaN/m’dir.",
            "μJ/cm² sayısı SI’ye çevrilirken alanın 10⁻⁴ çarpanı atlanmıştır.",
            "Alanı yanlış 5×10⁻⁶ m² almak (10×10⁻⁶)/(5×10⁻⁶)=2 verir. Doğru 5 cm²=5×10⁻⁴ m²’dir.",
          ],
          commonError:
            "İş/alan oranında alanın karesel birim dönüşümünü atlamak.",
          check: "0,02 N/m·5×10⁻⁴ m²=10⁻⁵ J=10μJ.",
        },
      },
      {
        id: "f026p-madde-ozkutle-17",
        prompt: {
          tr: "Yüzey gerilimi için N/m veJ/m² birimleri kullanılıyor.1 J=1 N·m bilgisine göre hangi açıklama doğrudur?",
        },
        options: [
          {
            tr: "N/m veJ/m² sayısal olarak her zaman 1000 kat farklıdır.",
          },
          {
            tr: "J/m²=N·m; alanın birimi yoktur.",
          },
          {
            tr: "J/m²=N; alanla bölme kuvvet verir.",
          },
          {
            tr: "J/m²=N/m; iki birim eşdeğerdir.",
          },
          {
            tr: "Yüzey gerilimi bu yüzden bir hacimdir.",
          },
        ],
        answer: 3,
        hint: {
          tr: "J/m²=(N·m)/m².",
        },
        explanation: {
          tr: "J/m²=(N·m)/m². Bir m sadeleşinceN/m kalır. Bu eşitlik, sabitγiçin alan oluşturmaya gereken enerjiyi kuvvet/uzunluk katsayısıyla bağlar.",
        },
        skill: "physics026-madde-ozkutle-17",
        guidance: {
          knowledge: [
            "Birim eşdeğerliği aynı fiziksel katsayının kuvvet/uzunluk ve enerji/alan tanımlarını bağlar.",
          ],
          strategy: "JyerineN·m yazıp bir metreyi sadeleştir.",
          steps: [
            "J/m²=(N·m)/m².",
            "Bir m sadeleşinceN/m kalır.",
            "Bu eşitlik, sabitγiçin alan oluşturmaya gereken enerjiyi kuvvet/uzunluk katsayısıyla bağlar.",
          ],
          optionReasons: [
            "SIbirimleri arasında burada ek ön ek çarpanı yoktur; aynıdır.",
            "Alan m² birimi taşır; paydadan atılamaz.",
            "Bir metre paydada kalır; sonuçNdeğilN/m’dir.",
            "Doğru. Enerjideki bir uzunluk çarpanı alanın iki uzunluk çarpanından biriyle sadeleşir.",
            "Birim eşdeğerliği hacim boyutu vermez; katsayı kuvvet/uzunluk boyutundadır.",
          ],
          commonError:
            "Birim sadeleşmesinde alanı tek uzunluk veya birimsiz sayı gibi kullanmak.",
          check: "N/m=kg/s²; J/m²=kg·m²/s²/m² aynı açılımı verir.",
        },
      },
      {
        id: "f026p-madde-ozkutle-18",
        prompt: {
          tr: "3 kg kütleli kapalı bir cisim, yerelg=10 m/s² için kilogram ölçeğiyle kalibre edilmiş yaylı kuvvetölçerle tartılıyor. Cisim ve aygıt, g=2 m/s² olan yerde de aynı biçimde asılı ve dengede. YalnızG=mgve gösterge=G/10 ilişkileri veriliyor. Gerçek kütle ve aygıtın kgölçeğindeki okuma nedir?",
        },
        options: [
          {
            tr: "3 kg; 3 kg",
          },
          {
            tr: "3 kg; 0,6 kg",
          },
          {
            tr: "15 kg; 15 kg",
          },
          {
            tr: "0,6 kg; 0,6 kg",
          },
          {
            tr: "6 kg; 6 kg",
          },
        ],
        answer: 1,
        hint: {
          tr: "Gerçek kütle 3 kg kalır.",
        },
        explanation: {
          tr: "Gerçek kütle 3 kg kalır. Yeni ağırlık 3·2=6 N. Gösterge 6/10=0,6 kg olur; bu kalibrasyon okuması gerçek kütlenin değiştiği anlamına gelmez.",
        },
        skill: "physics026-madde-ozkutle-18",
        guidance: {
          knowledge: [
            "Kütle yerelgile değişmez; kuvvetölçerin sabit kalibrasyonu farklıgde aynı gerçek kütleyi yanlış kggöstergesine çevirebilir.",
          ],
          strategy:
            "Yeni ağırlık kuvvetini bul; bunu aygıtın verilmiş kalibrasyonuna uygula.",
          steps: [
            "Gerçek kütle 3 kg kalır.",
            "Yeni ağırlık 3·2=6 N.",
            "Gösterge 6/10=0,6 kg olur; bu kalibrasyon okuması gerçek kütlenin değiştiği anlamına gelmez.",
          ],
          optionReasons: [
            "Aygıtın 10 m/s² kalibrasyonu yeni 2 m/s² ortamına kendiliğinden uyarlanmış sayılmıştır.",
            "Doğru. Kuvvet 6 N ve eskiG/10 ölçeği 0,6 kg gösterir.",
            "goranı ters yönde uygulanmıştır; kapalı cismin kütlesi yine değişmez.",
            "Aygıtın kalibre okuması gerçek kütleyle karıştırılmıştır.",
            "6 sayısı yeni ağırlığın newton değeridir; kütle değildir.",
          ],
          commonError:
            "Üzerinde kgölçeği bulunan her yaylı aygıtı g’den bağımsız doğrudan kütle karşılaştırıcısı saymak.",
          check:
            "0,6 gösterge·10=6 N; 6 N/2 m/s²=3 kg gerçek kütleyi geri verir.",
        },
      },
      {
        id: "f026p-madde-ozkutle-19",
        prompt: {
          tr: "300 mL hacimli kapta 40 mL sıvı var. Sıvı bu koşullarda buharlaşmıyor ve hacmi sabit. Kabın daha geniş tabanlı başka bir kaba aktarılması için hangi ifade doğrudur?",
        },
        options: [
          {
            tr: "Sıvının hacmi tanımsızdır.",
          },
          {
            tr: "Sıvının hacmi 40 mL kalır; biçimi ve yüksekliği değişebilir.",
          },
          {
            tr: "Sıvı zorunlu 300 mL olur.",
          },
          {
            tr: "Sıvı yeni kabın biçimini alamaz.",
          },
          {
            tr: "Taban büyüyünce kütle kendiliğinden artar.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Sıvı hacmi 40 mL; kabın kapasitesi 300 mL’dir.",
        },
        explanation: {
          tr: "Sıvı hacmi 40 mL; kabın kapasitesi 300 mL’dir. Geniş kapta sıvı yüksekliği değişebilir fakat kayıpsız aktarmada hacim 40 mL kalır. Kabın tüm hacmini almak sıvı için bu verilerde doğru değildir.",
        },
        skill: "physics026-madde-ozkutle-19",
        guidance: {
          knowledge: [
            "Sıvı kabın uygun bölümünün biçimini alırken kendi hacmi bu koşullarda korunabilir; gaz gibi tüm kabı doldurmak zorunda değildir.",
          ],
          strategy:
            "Kabın toplam kapasitesiyle sıvının miktarına ait hacmi ayır.",
          steps: [
            "Sıvı hacmi 40 mL; kabın kapasitesi 300 mL’dir.",
            "Geniş kapta sıvı yüksekliği değişebilir fakat kayıpsız aktarmada hacim 40 mL kalır.",
            "Kabın tüm hacmini almak sıvı için bu verilerde doğru değildir.",
          ],
          optionReasons: [
            "Verilen koşullarda belirli 40 mL hacim vardır.",
            "Doğru. Kayıp ve hacim değişimi açıkça dışlanmıştır; kap kapasitesi örnek hacmi değildir.",
            "Sıvı, bulunduğu kabın bütün kapasitesini gaz gibi doldurmak zorunda değildir.",
            "Sıvıların belirli kendi biçimi yoktur; kabın bulunduğu bölümüne uyum sağlar.",
            "Sadece kap biçimi değişimi kapalı sıvı örneğine madde eklemez.",
          ],
          commonError:
            "Kap kapasitesiyle içindeki sıvı hacmini aynı sayı saymak.",
          check:
            "Kayıpsız aktarılan aynı örnek için kütle ve bu koşuldaki 40 mL hacim korunur.",
        },
      },
      {
        id: "f026p-madde-ozkutle-20",
        prompt: {
          tr: "Aynı sıcaklık ve basınçta iki homojen örneğin ölçülmüş özkütlesi de 2,0 g/cm³. Başka özellik verilmemiş. Hangi çıkarım bilimsel olarak uygundur?",
        },
        options: [
          {
            tr: "İki örnek kesin aynı kimyasal maddedir.",
          },
          {
            tr: "İki örneğin kütleleri kesin eşittir.",
          },
          {
            tr: "İki örneğin hacimleri kesin eşittir.",
          },
          {
            tr: "Ölçülen oranlar eşittir; kesin aynı madde sonucu tek başına çıkmaz.",
          },
          {
            tr: "Özkütle eşitliği sıcaklığın da eşit olmadığını kanıtlar.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Her iki örnekte ölçülen kütle/hacim oranı 2,0 g/cm³’tür.",
        },
        explanation: {
          tr: "Her iki örnekte ölçülen kütle/hacim oranı 2,0 g/cm³’tür. Bu eşitlik başka kimyasal veya yapısal özellikleri tek başına vermez. Örnekler aynı madde olabilir; kesin aynı madde oldukları için ek tanımlayıcı bilgi gerekir.",
        },
        skill: "physics026-madde-ozkutle-20",
        guidance: {
          knowledge: [
            "Özkütle ayırt etmeye yardımcı bir özelliktir; tek ölçülen değerin eşitliği kesin kimlik kanıtı değildir.",
          ],
          strategy:
            "Verilen eşit oranı belirt; bu oranın ötesindeki madde kimliğini ayrıca tut.",
          steps: [
            "Her iki örnekte ölçülen kütle/hacim oranı 2,0 g/cm³’tür.",
            "Bu eşitlik başka kimyasal veya yapısal özellikleri tek başına vermez.",
            "Örnekler aynı madde olabilir; kesin aynı madde oldukları için ek tanımlayıcı bilgi gerekir.",
          ],
          optionReasons: [
            "Tek bir ölçüm özelliği eşitliği, kimyasal kimliği zorunlu belirlemez.",
            "Oranların eşitliği miktarların eşit olduğunu söylemez.",
            "Kütle/hacim aynıyken miktarlar farklı olabilir.",
            "Doğru. Aynı yoğunluk farklı malzeme veya karışımlarda da görülebilir.",
            "Kök sıcaklık ve basıncın aynı olduğunu açıkça vermiştir; bunun tersine çıkarım yapılamaz.",
          ],
          commonError:
            "Ayırt edici özelliği tek başına her örnekte benzersiz kimlik etiketi saymak.",
          check:
            "4 g/2 cm³ ve 20 g/10 cm³ aynı 2,0 oranını verir; miktar eşitliği gerekmez.",
        },
      },
      {
        id: "f026p-madde-ozkutle-21",
        prompt: {
          tr: "Bir kabın iki ayrı bölgesinden alınan eşit 10 cm³ örneklerin kütleleri 10 g ve 30 g. Tüm kap 20 cm³ ve 40 g; madde kaybı yok. Yerel ve yığın ortalama yoğunluklar için hangi ifade doğrudur?",
        },
        options: [
          {
            tr: "Yerel yoğunluklar eşit, yalnız kütleleri farklıdır.",
          },
          {
            tr: "Yığın ortalaması 4 g/cm³",
          },
          {
            tr: "Yerel 1 ve 3; yığın ortalaması 2 g/cm³.",
          },
          {
            tr: "Hiçbir toplam kütle/hacim oranı kurulamaz.",
          },
          {
            tr: "Her yerde 2 g/cm³",
          },
        ],
        answer: 2,
        hint: {
          tr: "Yerel oranlar 10/10=1 ve 30/10=3 g/cm³.",
        },
        explanation: {
          tr: "Yerel oranlar 10/10=1 ve 30/10=3 g/cm³. Tüm kap için 40/20=2 g/cm³ yığın ortalaması bulunur. Yerel değerler farklı olduğu için bütün kabın her yerinde 2 g/cm³ vardır denemez.",
        },
        skill: "physics026-madde-ozkutle-21",
        guidance: {
          knowledge: [
            "Heterojen örnekte toplam m/V ortalaması tanımlanabilir; bu değer her küçük bölgenin aynı yerel yoğunluğu olduğu anlamına gelmez.",
          ],
          strategy: "İki yerel oranı ve bütün kabın oranını ayrı hesapla.",
          steps: [
            "Yerel oranlar 10/10=1 ve 30/10=3 g/cm³.",
            "Tüm kap için 40/20=2 g/cm³ yığın ortalaması bulunur.",
            "Yerel değerler farklı olduğu için bütün kabın her yerinde 2 g/cm³ vardır denemez.",
          ],
          optionReasons: [
            "Hacimler eşit 10 cm³ olduğundan farklı kütleler farklı yerel oran verir.",
            "Yerel yoğunluklar doğrudan toplanmıştır; toplam kütle toplam hacme bölünmelidir.",
            "Doğru. Toplam oran, yerel yoğunlukların her bölgede aynı olduğunu göstermez.",
            "40 g ve 20 cm³ verileri yığın ortalaması tanımlamaya yeterlidir; homojen yerel özellik diye sunulmaz.",
            "Ortalama doğru sayı olsa da yerel ölçümler 1 ve 3 g/cm³ ile farklıdır.",
          ],
          commonError:
            "Heterojen sistemde yığın ortalamasını reddetmek veya her bölgeye aynı yerel değer olarak yaymak.",
          check:
            "Eşit hacimlerde(1+3)/2=2; farklı hacimlerde hacim ağırlıkları da gerekir.",
        },
      },
      {
        id: "f026p-madde-ozkutle-22",
        prompt: {
          tr: "Aynı sıvı iki farklı yüzey kaplamalı, eşit yarıçaplı düşey tüpe konuyor. γ,ρ, gaynı; ilkindeθ=60°, ikincideθ=120°; cos 60°=+0,5, cos 120°=−0,5. İdeal kılcal modelde iki düzey farkı nasıl ilişkilidir?",
        },
        options: [
          {
            tr: "Eşit büyüklükte; ilk yükselme, ikinci alçalma.",
          },
          {
            tr: "İkincinin yüksekliği iki kat büyüktür.",
          },
          {
            tr: "İkisi de aynı yönde yükselir.",
          },
          {
            tr: "Özkütle aynıysa temas açısı sonucu değiştiremez.",
          },
          {
            tr: "İkisinde de h=0",
          },
        ],
        answer: 0,
        hint: {
          tr: "Her iki kosinüsün mutlak değeri 0,5 olduğu için|h|değerleri eşittir.",
        },
        explanation: {
          tr: "Her iki kosinüsün mutlak değeri 0,5 olduğu için|h|değerleri eşittir. İlkinde kosinüs pozitif; hazneye göre yükselme vardır. İkincide kosinüs negatif; aynı büyüklükte alçalma vardır.",
        },
        skill: "physics026-madde-ozkutle-22",
        guidance: {
          knowledge: [
            "Aynı pozitif parametrelerde h’nin büyüklük ve işaret farkı cosθçarpanından gelir.",
          ],
          strategy:
            "Kosinüslerin büyüklüklerini ve işaretlerini ayrı karşılaştır.",
          steps: [
            "Her iki kosinüsün mutlak değeri 0,5 olduğu için|h|değerleri eşittir.",
            "İlkinde kosinüs pozitif; hazneye göre yükselme vardır.",
            "İkincide kosinüs negatif; aynı büyüklükte alçalma vardır.",
          ],
          optionReasons: [
            "Doğru. Kosinüsler aynı mutlak değerde ve zıt işaretlidir.",
            "Açının iki kat olması kosinüs büyüklüğünün iki kat olduğu anlamına gelmez; ikisi 0,5’tir.",
            "İkinci temas açısının kosinüsü negatif olduğundan yükseklik işareti negatiftir.",
            "İdeal bağıntıda cosθdoğrudan çarpandır; yüzey değişimi sonucu değiştirebilir.",
            "Kosinüsler sıfır değildir; sıfır 90°eşiğinde olur.",
          ],
          commonError:
            "Açı oranını doğrudan yükseklik oranı saymak veya temas açısını yoğunlukla ikame etmek.",
          check: "h₂/h₁=−0,5/+0,5=−1; işaretli düzeyler zıttır.",
        },
      },
      {
        id: "f026p-madde-ozkutle-23",
        prompt: {
          tr: "Özkütlesi sudan büyük aynı ince iğne önce su yüzeyine dikkatle bırakıldığında tutuluyor. Sonra yüzey gerilimini bu deneyde azalttığı ayrıca ölçülen bir katkı ekleniyor ve iğne batıyor. İğnenin kütle ve hacmi değişmediği verilmiş. Hangi açıklama verilerle uyumludur?",
        },
        options: [
          {
            tr: "Bütün katkılar her sıvının yüzey gerilimini mutlaka azaltır.",
          },
          {
            tr: "Özkütlesi büyük hiçbir cisim yüzeyde tutulamaz.",
          },
          {
            tr: "İğnenin yoğunluğu kesin artmıştır.",
          },
          {
            tr: "Yüzey gerilimi değiştiyse suyun kütlesi kesin sıfır olur.",
          },
          {
            tr: "İğnenin yoğunluğu aynı kalırken arayüzde tutulma koşulu değişmiş olabilir.",
          },
        ],
        answer: 4,
        hint: {
          tr: "İğnenin mveVsi aynı olduğundan özkütlesi değişmedi.",
        },
        explanation: {
          tr: "İğnenin mveVsi aynı olduğundan özkütlesi değişmedi. Katkı sonrası bu deneydeγazaldığı ölçülmüş; yüzeyde tutunma koşulu değişmiş olabilir. Batma, iğnenin birden daha yoğun olduğu sonucunu zorunlu kılmaz; arayüz desteği ve ıslatma incelenir.",
        },
        skill: "physics026-madde-ozkutle-23",
        guidance: {
          knowledge: [
            "Yüzeyde tutunmada yüzey gerilimi ve ıslatma etkisi bulunabilir; cismin özkütlesi tek başına bütün arayüz davranışını belirlemez.",
          ],
          strategy:
            "İğnenin değişmeyen özelliklerini ve deneyde değiştirilen arayüz koşulunu ayır.",
          steps: [
            "İğnenin mveVsi aynı olduğundan özkütlesi değişmedi.",
            "Katkı sonrası bu deneydeγazaldığı ölçülmüş; yüzeyde tutunma koşulu değişmiş olabilir.",
            "Batma, iğnenin birden daha yoğun olduğu sonucunu zorunlu kılmaz; arayüz desteği ve ıslatma incelenir.",
          ],
          optionReasons: [
            "Bu deneydeki ölçüm, bütün katkı ve sıvılar için evrensel genelleme sağlamaz.",
            "İlk deneyde dikkatle bırakılan iğnenin tutulduğu açık verilmiştir; yüzey etkisi önemlidir.",
            "mveVnin değişmediği bilgisi bu yorumu dışlar.",
            "Arayüz katsayısındaki değişim maddenin kütlesini yok etmez.",
            "Doğru. Verilen kütle/hacim sabit; yüzey gerilimi ise ölçülmüş olarak değişmiştir.",
          ],
          commonError:
            "Yüzeyde tutulmayı yalnız yoğunlukla açıklamak veya tek katkı verisinden evrensel kural üretmek.",
          check:
            "Aynı iğneninρ=m/Vdeğeri sabit kalır; farklı sonuç arayüz koşuluyla bağdaşabilir.",
        },
      },
      {
        id: "f026p-madde-ozkutle-24",
        prompt: {
          tr: "Yarıçapı 2 cm olan küre için merkezden geçen kesit alanı A=πr², hacim V=4πr³/3 olarak veriliyor. Bu kesit/hacim oranının sayısal değeri ve birimi nedir? Tüm yüzey alanı değil, belirtilen merkez kesiti kullanılacak.",
        },
        options: [
          {
            tr: "3/8 cm",
          },
          {
            tr: "3/2 cm⁻¹",
          },
          {
            tr: "8/3 cm",
          },
          {
            tr: "3/(4π); birimsiz",
          },
          {
            tr: "3/8 cm⁻¹",
          },
        ],
        answer: 4,
        hint: {
          tr: "A/V=(πr²)/(4πr³/3)=3/(4 r).",
        },
        explanation: {
          tr: "A/V=(πr²)/(4πr³/3)=3/(4 r). r=2 cm için 3/(4·2)=3/8 elde edilir. Alan cm², hacim cm³ olduğundan birim cm⁻¹’dir; sonuç boyutsuz değildir.",
        },
        skill: "physics026-madde-ozkutle-24",
        guidance: {
          knowledge: [
            "Alan/hacim oranı ters uzunluk boyutundadır; kürenin merkez kesiti ile tüm dış yüzeyi farklı alanlardır.",
          ],
          strategy: "Verilen iki formülü oranla,πve rkuvvetlerini sadeleştir.",
          steps: [
            "A/V=(πr²)/(4πr³/3)=3/(4 r).",
            "r=2 cm için 3/(4·2)=3/8 elde edilir.",
            "Alan cm², hacim cm³ olduğundan birim cm⁻¹’dir; sonuç boyutsuz değildir.",
          ],
          optionReasons: [
            "Sayısal oran doğru fakat birim ters uzunluk olmalıdır; alan/hacim cm⁻¹ verir.",
            "Bu 4πr² tüm yüzey alanının hacme oranı 3/r’dir; belirtilen merkez kesiti değildir.",
            "BuV/Aters oranıdır; istenenA/V’dir.",
            "πsadeleşmelidir ve bir rpaydada kalır; bu kaynak benzeri ifade boyutça da yanlıştır.",
            "Doğru. Merkez kesiti/hacim 3/(4 r)ve r=2 cm için 3/8 cm⁻¹ verir.",
          ],
          commonError:
            "Merkez kesitini tüm yüzeyle veya alan/hacim oranını boyutsuz sayıyla karıştırmak.",
          check:
            "Yarıçap iki katına çıkarılırsa 3/(4 r)yarıya iner; ters uzunluk boyutuyla uyumludur.",
        },
      },
    ],
    source:
      "MEBİ TYT Fizik ile OGM Dersler Cepte kaynakları karşılaştırılarak hazırlanmış özgün derin öğretim. Önkoşullar, ölçüm/model sınırları ve kaynaklardaki aşırı genellemeler bilimsel denetimle ayrılmıştır. Sorular ve çözümlü örnekler özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "dogrusal-hareket",
    detail: "detail-116",
    title: "Doğrusal hareket: yol, yön ve grafik",
    minutes: 120,
    objectives: [
      "Konum, yol, yer değiştirme, sürat, hız ve ivmeyi eksen ve zaman aralığıyla tanımla.",
      "Parçalı hareketi evre sınırlarında süreklilik ve yerel süre kullanarak çöz.",
      "x–t, v–t, a–t grafiklerini eğim, işaretli alan ve yön değişimiyle ilişkilendir.",
      "Sabit hızlı gözlemciye geçince değişen yol/hızla aynı kalan ivmeyi ayır; sıfır ve sınır anlarını açık yorumla.",
    ],
    sections: [
      {
        title: "Hareket gözlemci ve referansla tanımlanır",
        paragraphs: [
          "Hareket, seçilen referans sistemine göre konumun zaman içinde değişmesidir. Önce başlangıç noktası, pozitif eksen ve saat sıfırı seçilir. Aynı araç içindeki iki yolcu birbirine göre durgun olabilirken yol kenarındaki gözlemciye göre hareket eder. Bir tur sonunda ilk yere dönmek toplam yer değiştirmeyi sıfır yapabilir; arada hareket yapılmadığı anlamına gelmez.",
          "Bu rehberde tek doğru boyunca hareket incelenir; x bileşeni işaretli sayı ile gösterilir. Öteleme kavramı genel olarak yalnız düz bir yola zorunlu değildir; burada özellikle bir boyutlu model seçilmiştir. Bir cismin konumu negatifken hızı pozitif olabilir: başlangıç noktasının solunda olup sağa doğru ilerleyebilir. Konumun işareti, hareket yönünün işareti ve yön değişimi farklı bilgilerdir.",
        ],
      },
      {
        title: "Gittiğin yol ile vardığın yer aynı şey değil",
        paragraphs: [
          "Yer değiştirme Δx=xson−xilk ile başlangıç ve son konumun yönlü farkıdır. Yol ise izlenen bütün parçaların uzunluklarının toplamıdır; negatife düşmez. Aynı başlangıç ve son nokta, farklı ara hareketlerle aynı Δx ama farklı yol verebilir. Bir boyutta yön hiç değişmiyorsa yol |Δx| olur; ileri gidip dönme varsa yol daha büyük olabilir.",
          "Bir eksenin pozitif yönü ters seçilirse konum, yer değiştirme ve hız bileşenlerinin işareti ters döner; aynı gözlemcide gidilen yol ve sürat büyüklükleri değişmez. Yol parçalarını işaretleriyle toplamak Δx verir; yol için parçaların büyüklükleri toplanır. Duran bir aralık yola katkı yapmaz fakat toplam geçen süreye katkı yapar. Ortalama hesabında beklemeyi yok saymamak gerekir.",
        ],
      },
      {
        title: "İki ortalamanın payları farklı",
        paragraphs: [
          "Ortalama hız Δx/Δt, ortalama sürat toplam yol/Δt olarak tanımlanır. Paydaları aynı toplam geçen süredir; payları farklı olabilir. Hareketin farklı bölümlerindeki süratlerin aritmetik ortalaması her zaman toplam sürati vermez. Eşit sürelerle gidilmişse zaman ağırlıkları eşit olur; eşit yollar farklı süratlerle gidildiğinde daha yavaş bölüm daha uzun süre alır.",
          "Örneğin iki eşit yol için toplam süre L/v₁+L/v₂; ortalama sürat 2 v₁v₂/(v₁+v₂) olur. Bu bağıntıyı yol uzunlukları eşit değilken veya ayrıca bekleme varken koşulsuz kullanma. Ortalama hız işaretli olabilir; ortalama sürat negatif olmaz. Pozitif toplam sürede her zaman ortalama sürat ≥ |ortalama hız|; eşitlik, bütün hareketin aynı yönlü olmasıyla uyumludur.",
        ],
      },
      {
        title: "Düzgün hareket ve ivme",
        paragraphs: [
          "Düzgün doğrusal harekette hız sabittir; eşit zaman aralıklarında eşit işaretli yer değiştirmeler olur. x=x₀+vt, v sabit ve a=0 bağıntıları bu modelin ifadeleridir. İvme, birim zamanda hız değişimidir; ortalama ivme Δv/Δt, birimi m/s². Sabit sürat tek başına genel uzaysal harekette sıfır ivme demek değildir; dönme yönü değiştirebilir. Burada doğrusal eksen varsayımı özellikle korunur.",
          "Sabit ivmede yerel süreτiçin v=v₀+aτ ve Δx=v₀τ+½aτ² kullanılır. v ile a aynı işaretliyse sürat artar; zıt işaretliyse hız sıfıra gelene kadar sürat azalır. Sabit negatif ivme ile başlayan yavaşlama, hız negatife geçince hızlanmaya dönüşebilir. “Yavaşlayan” etiketi bütün süreye otomatik uzatılmaz; sıfır hız anı aralık içindeyse evre yön açısından ayrıca bölünür.",
        ],
      },
      {
        title: "Grafik okurken önce eksenlere bak",
        paragraphs: [
          "Konum–zaman grafiğinin eğimi hız; hız–zaman grafiğinin eğimi ivmedir. Hız–zaman eğrisinin zaman eksenine göre işaretli alanı yer değiştirmeyi; hızın mutlak değerinin alanı yolu verir. İvme–zaman işaretli alanı hız değişimini verir. İvme grafiğinin alanı, başlangıç hızını bilmeden son hızın mutlak değerini tek başına vermez.",
          "Eğim için eksen farklarını ve birimleri kullan: m/s ile m/s² aynı şey değildir. Bir grafikte eksenin altında kalan alan negatif işaretli katkıdır; geometrik alan büyüklüğü ayrıca pozitiftir. Konum grafiğinin zaman eksenini kesmesi x=0 geçişidir; eğimin işaret değiştirmesi olmadıkça hareket yönü değişmiş olmaz. Grafiklerin yatay veya sıfır olması da hangi niceliğin çizildiğine göre farklı anlam taşır.",
        ],
      },
      {
        title: "İşaret ve birimle son kontrol",
        paragraphs: [
          "Bir sonuçta önce birim, sonra işaret ve sınır denetimi yap. Son hız−5 m/s ise sürat 5 m/s’tir; yol−5 m yazılamaz. Son konum başlangıç noktasının solunda olabilir, fakat toplam yol bu yüzden negatife dönmez.3,6 km/h=1 m/s dönüşümünü hızlar karşılaştırılmadan önce uygula; ivmedeki zaman karesini ayrıca koru.",
          "Toplam süre 0 ise Δx/Δt ve yol/Δt ortalamaları tanımlanmaz. Bunun yerine 0/0’dan 0 sonucu uydurma. Deney tam bittiği anda daha sonra uygulanacak ivme verilmemiş olabilir; bilinen son konum ve hız, gelecekteki kuvvet programını tek başına belirlemez. Laboratuvar son anı bu sınırla sunar; sonraki hareketi çizip kesinleştirmez.",
        ],
      },
      {
        title: "Anlık hız ile bir aralık ortalaması",
        paragraphs: [
          "Anlık hız, belirli bir anda konumun değişim hızıdır; düzgün bir x–t eğrisinde teğet eğimiyle ilişkilidir. İki uzak zaman arasındaki kiriş eğimi o aralığın ortalama hızını verir. İvme varsa anlık hızlar aralık içinde değişebilir; ortalama değerin bir uçtaki anlık hızla aynı olması gerekmez. Bir noktada xdeğeri ile o noktadaki eğim ayrı ayrı okunur.",
          "Bir boyutta anlık sürat her zaman |v|’dir. İleri gidip sonra dönmek, toplam aralığın ortalama süratini |ortalama hız|’dan ayırabilir; bu yüzden anlık tanımdaki eşitliği tüm aralık ortalamasına aktarma. Teğetin yatay olduğu bir anda v=0 olabilir; ivme sıfır olmak zorunda değildir. Örneğin dönüş anında hız 0 iken hareketin yönünü değiştiren ivme devam edebilir.",
        ],
      },
      {
        title: "Hız ve ivmenin işaret tablosu",
        paragraphs: [
          "v>0, a>0 veya v<0, a<0 durumlarında hız vektörü ile ivme aynı yönlüdür; sürat artar. v>0, a<0 veya v<0, a>0 durumlarında ivme o anki harekete karşıdır; sürat azalır. Negatif işaret kendi başına “yavaş” veya “geri dönüş” sözcüğünün eşanlamlısı değildir; iki işaret birlikte okunur.",
          "Sabit ivmede v=0 eşitliği içinτ=−v₀/açözülebilir. Bu zaman ancak incelenen aralığın içinde ve pozitifse o evrede duruş anıdır. τnegatifse duruş modelin geçmiş uzatımındadır; verilen gelecekte gerçekleşmiş sayılmaz. Evrenin tam sonunda sıfıra gelmek ile evre içinde yön değiştirip yolun bir bölümünü ters gitmek farklıdır.",
        ],
      },
      {
        title: "Sabit ivme denklemlerinin kökeni",
        paragraphs: [
          "İvme sabitse hız zamana göre doğru verir: v=v₀+aτ. Hız grafiğinin alanı, v₀τdikdörtgeniyle½aτ² işaretli üçgeninin toplamıdır. Böylece Δx=v₀τ+½aτ² elde edilir. Aynı evrede ortalama hız(v₀+vson)/2 olduğu için Δx=[(v₀+vson)/2]τda kullanılabilir; bu, son hızları farklı evrelerin tümüne gelişigüzel ortalama alma kuralı değildir.",
          "Zaman elenince vson²=v₀²+2 aΔxbağıntısı bulunur. Kareli bağıntı yön bilgisini tek başına seçemez: karekökten çıkan büyüklüğün hangi işaretli hız olduğu hareketin yönü ve zaman koşuluyla belirlenir. AynıΔxdeğerine gidişte ve dönüşte farklı hız işaretleriyle ulaşılabilir. Yol yerineΔxkullanılması gereken bir eşitliğe toplam yolu koyma.",
        ],
      },
      {
        title: "Evre içinde sıfır hız ve gerçek yol",
        paragraphs: [
          "Bir sabit ivme evresinde v₀vevsonzıt işaretliyse hız sıfırı evrenin içindedir. Bu noktada yolu hesaplamak için evreyi iki yönlü parçaya ayırırsın. Her parçanın işaretli yer değiştirmesini bulup büyüklüklerini toplarsın. Yalnız bütün evrenin Δxdeğerinin mutlak değeri, gidip dönülen fazladan yolu kaybeder.",
          "Örneğin v₀=4 m/s, a=−2 m/s² veτ=3 s için dönüş 2 s’dedir. İlk bölümün konum artışı 4 m, sonraki bölümün geri gelişi 1 m olduğundan Δx=3 m ama yol 5 m olur. Bu örnek, hız grafiğinin pozitif ve negatif üçgenlerini işaretli alanla veya mutlak alanla toplamanın iki farklı hedefini gösterir. Dönüş zamanı aralığın dışındaysa gereksiz parçalara ayırma yapılmaz.",
        ],
      },
      {
        title: "Parçalı harekette yerel süre",
        paragraphs: [
          "Hareketin farklı evrelerinde ivme değişebilir. Bir evre tbaşlangıçanında başlıyorsa o evredekiτ=t−tbaşlangıçyerel süresidir. Yeni evrenin ilk konum ve hızı, önceki evrenin son değerlerinden alınır. Aynı cismi izlerken saat sıfırlanmasa da evre denkleminin süre değişkeni yeniden 0’dan başlar.",
          "Örneğin ikinci evre t=5 s’de başlıyorsa global t=7 s anında bu evrede geçen süre 2 s’dir. v=vbaş+a·7 yazmak, ivmeyi sanki ilk andan beri uygulamış gibi yanlış katkı üretir. Başlangıç konumu için de xbaş eklenir; her evreyi x=0’dan başlatmak yörüngeyi keser. Evre sonlarının konum ve hızlarının sürekliliği, bu modelin önemli denetimidir.",
        ],
      },
      {
        title: "Evre sınırında ne değişebilir?",
        paragraphs: [
          "İdeal parçalı sabit ivme programında ivme bir sınırda sıçrayabilir; bunun için hızın aynı anda sıçraması gerekmez. Sonlu ivmenin sıfır süreli katkısı hız değişimini sonlu bir sıçrama yapmaz. Bu model darbeli çarpışma veya anlık hız değiştirme içermediğinden xvevbir evrenin sonundan ötekinin başına aynı değerle geçer.",
          "İç sınırdaki ivmenin tek bir sayıyla raporlanması için hangi yanın seçildiği açıkça belirtilir. Laboratuvar iç sınırda sağdaki yeni evreyi kullanır; tam son anda daha sonra gelen evre verilmediği için ivmeyi belirtilmedi olarak gösterir. Bu etiket, bilinen son hızın veya son konumun yok olduğu anlamına gelmez. Sınırdaki tanım ile aralık boyunca biriken alanı ayır.",
        ],
      },
      {
        title: "Bekleme de zamandır",
        paragraphs: [
          "Bir hareket boyunca v=0 olan evre, yola ve yer değiştirmeye 0 katkı yapar. Fakat süre pozitifse toplam geçen zamana eklenir. Toplam ortalama hız ve sürat bu yüzden küçülebilir. Hareket halinde geçen süreye göre verilen ortalama ile başlangıçtan son beklemeye kadar verilen ortalama aynı zaman penceresi değildir.",
          "Bir soruda “hareket sırasında ortalama” veya “bütün yolculuk boyunca ortalama” deniyorsa aralığı açıkça seç. Son duraktaki bekleme de sorunun son anına dahil edilmiş olabilir. Eşit zamanlı bölüm ortalaması yapılırken duruş bölümü 0 hızla kendi ağırlığını alır. Bekleme süresini gizleyerek süratlerin sadece aritmetik ortalamasını almak toplam sürenin bir bölümünü dışarıda bırakır.",
        ],
      },
      {
        title: "Eşit süre ve eşit yol ortalamaları",
        paragraphs: [
          "İki evrede aynı süreτboyunca sabit süratler v₁vev₂ile aynı yönde gidilirse toplam yol(v₁+v₂)τve süre 2τolur; ortalama sürat(v₁+v₂)/2’dir. Evreler farklı süreliyse(v₁t₁+v₂t₂)/(t₁+t₂)kullanılır. Ortalama alırken ağırlıkların gerçekten eşit olup olmadığını kontrol et.",
          "İki evrede eşit yol Lgidilirse süreler farklıdır: L/v₁veL/v₂. Ortalama 2 L/[L/v₁+L/v₂]olur. Bu yüzden örneğin çok yavaş bir bölümün süre etkisi büyüktür; büyük sürat değeri aritmetik ortalamayı yapay biçimde yukarı taşıyabilir. Ek bir duruş varsa onun süresi de paydaya eklenir; eşit yol bağıntısı tek başına bütün yolculuğu vermez.",
        ],
      },
      {
        title: "Konum grafiği: kesim ve eğim",
        paragraphs: [
          "x–tgrafiğinin düşey kesimi başlangıç konumunu, eğimi hızı temsil eder. Farklı başlangıç konumlarında aynı eğimli iki doğru, aynı yön ve hızla giden cisimleri gösterebilir; konumların farklı olması hızların farklı olmasını gerektirmez. Yatay bir x–tdoğrusu sabit konum ve durgunluk demektir; zaman ekseninin altında olması yalnız negatif konumu gösterir.",
          "Eğri bir konum grafiğinde eğim zamanla değişir. Yukarı doğru kıvrımlılık pozitif ivmeyle; aşağı doğru kıvrımlılık negatif ivmeyle ilişkilidir, fakat cismin o anda hangi yönde gittiği eğimin işaretinden okunur. Bir konum eğrisinin ekseni kesmesi, hareketlinin seçilen başlangıç noktasından geçtiğini gösterir. Dönüş için hızın, yani eğimin işaret değiştirmesi gerekir.",
        ],
      },
      {
        title: "Hız grafiği: alan ile yol",
        paragraphs: [
          "v–tgrafiğinde pozitif bölgeler pozitifΔx, negatif bölgeler negatifΔxkatkısı yapar. İşaretli toplam, son konumun ilk konuma göre değişimini verir. Yol için negatif bölgelerin geometrik büyüklükleri de pozitif katkı alınır. Bir grafiğin altında iki pozitif ve bir negatif parça bulunması, toplam yer değiştirmenin işareti için hepsinin değerlerinin birlikte gerektiğini gösterir.",
          "Hızın sıfırı kestiği yer, grafik alanını yol hesabı için bölme noktasıdır. Eğik bir hız doğrusunda üçgen veya yamuk alanı kullanılabilir; ancak eksen altına geçişte tek bir işaretli yamuk alanını mutlak almak toplam yolu her zaman vermez. Zaman ekseninde çizginin bulunduğu bölüm, hız 0 ise bekleme bölümüdür; alan 0 olsa da geçen süre devam eder.",
        ],
      },
      {
        title: "İvme grafiği: başlangıç bilgisi",
        paragraphs: [
          "a–tgrafiğinin işaretli alanı Δvverir. Başlangıç hızı v₀biliniyorsa son hız v₀+Δvile bulunur. Aynı ivme grafiği, farklı başlangıç hızlarında farklı hız grafiklerine yol açabilir. Bu nedenle “alan 5 m/s” demek son hızın mutlaka 5 m/s olduğu anlamına gelmez; önce başlangıç değeri sorulur.",
          "Konuma ulaşmak için hızın zamana bağlı davranışı ve başlangıç konumu da gerekir. Sabit ivme alanlarını art arda eklerken her evrenin ilk hızı güncellenir. a=0 olan bölüm hızın sabit kaldığını gösterir; bu hızın sıfır olduğu bilgisi değildir. İvme grafiğinin negatif olması da tek başına yolun negatif olacağını veya cismin tüm evrede yavaşlayacağını söylemez.",
        ],
      },
      {
        title: "Sabit hızlı gözlemciye geçiş",
        paragraphs: [
          "Başlangıçta aynı noktada bulunan, seçili eksende sabit u hızıyla giden gözlemci için Galile dönüşümü x′=x−ut, v′=v−u, a′=a biçimindedir. Burada klasik ve düşük hızlı bir model kullanılır; ışık hızına yakın hareket çözülmez. Gözlemciye göre yer değiştirmeΔx′=Δx−uΔtolur. Aynı dünya hareketi, gözlemciye göre başka yönde veya bir bölümde durgun görünebilir.",
          "Yol da seçilen gözlemciye bağlıdır: v′işaret değiştiriyorsa bu yeni sıfırlar üzerinden |v′|alanı toplanır. Dünya gözlemcisinde bulunan toplam yolu doğrudan uTçıkararak her durumda yeni yol elde edemezsin; bu işlem işaretli yer değiştirme içindir. Sabit hızlı gözlemciler arasında aynı hız programının ivmesi değişmez. İvmeli bir gözlemciye geçiş ise bu basit dönüşümün dışındadır.",
        ],
      },
      {
        title: "Başlangıç noktasını kaydırmak",
        paragraphs: [
          "Aynı gözlemci ve eksen yönünde yalnız konum başlangıcı b kadar kaydırılırsa bütün konumlara aynı sabit eklenir veya çıkarılır. İki konumun farkında bu sabit gider;Δx, hız, ivme ve yol değişmez. Buna karşılık hareketli gözlemci dönüşümünde utterimi zamana bağlıdır; hız da değişebilir. Sabit başlangıç kaymasıyla hareketli referansı birbirine karıştırma.",
          "Saat sıfırının değiştirilmesi de doğru zaman farkları kullanıldığında aynı fiziksel aralığı korur. t=10 ile 14 arasındaki hareketi yeni saatte 0 ile 4 arasında ifade edebilirsin. Evre sınırları ve başlangıç koşulları da aynı dönüşümle taşınmalıdır. Farklı saatler için aynı sembolü kullanıp hangi anın kastedildiğini gizlemek, doğru bağıntının yanlış aralığa uygulanmasına neden olur.",
        ],
      },
      {
        title: "Karşılaşma ve geçme",
        paragraphs: [
          "İki cismin aynı anda aynı konumda olması karşılaşma koşuludur: xA(t)=xB(t). Bulunan her cebirsel zaman, iki cismin tanımlı hareket aralığına geri konur. Biri henüz hareketine başlamamışsa o evrenin denklemini daha erken zamana uzatmak fiziksel karşılaşma üretmez. Aynı zaman değeri her iki cismin saatine tutarlı çevrilir.",
          "Konum grafiklerinin kesişmesi tek başına öne geçme anlamına gelmez. Aradaki farkın işareti kesişmenin iki yanında değişiyorsa sıralama değişir; yalnız 0 olup aynı işarette kalıyorsa temas anı vardır. Karşılaşmada hızların eşit veya farklı olması da önemli ipucu sağlar. Tek bir konumda iki kez bulunmak, başlangıçtan sonraki hangi zamanın istendiğini ayrıca belirtmeyi gerektirebilir.",
        ],
      },
      {
        title: "Ölçülen aralığın dışına taşma",
        paragraphs: [
          "Bir hız veya ivme programı yalnız belirli toplam süre için verilmişse bu süreden sonrasını hesaplamak ek varsayım gerektirir. Son hızın bilinmesi, cismin bundan sonra o hızla gideceğini veya duracağını kanıtlamaz. Aynı biçimde, veri başlangıcından önceki hareketi bütün evrelerin denklemini geriye uzatarak kesinleştiremezsin.",
          "Laboratuvar örnek zamanı 0 ile toplam süre arasında tutar. Son anda konum ve hız hesaplanır; devam eden yeni bir evre verilmediği için ileri ivme belirtilmez. Toplam süre 0 olduğunda anlık başlangıç konum ve hız bilgisi korunur, aralık ortalamaları tanımsız gösterilir. Bu sınırlar gizli bir cevap seçmek yerine verinin hangi sonucu belirlemeye yettiğini açık tutar.",
        ],
      },
      {
        title: "Üç evreyi aynı grafikte izle",
        paragraphs: [
          "Modelde ilk hız, her evrenin süresi ve ivmesi, gözlemcinin sabit hızı ve örnek anı değiştirilebilir. Evre sonundaki konum ve hız yeni evreye aktarılır; hız sıfırı evre içinde kalıyorsa yol parçalanır. Üç grafikte aynı örnek anına ait konum, hız ve ivme birlikte izlenir. HTML evre listesi çizimdeki başlangıç ve son değerleri sayısal olarak da sunar.",
          "Gözlemci hızını değiştirirken aynı dünya programının hangi grafiklerinin değiştiğini incele. Hız–zaman alanınınΔx′ile ve mutlak alanın bu gözlemcinin yoluyla uyuşmasını denetle. Grafikte eklenen kılavuz veya işaretçi fiziksel yeni kuvvet değildir; seçili anı okumaya yardım eder. Keşif kaydı, verilen sayılarla model kullanımını saklar; soru başarısını otomatik üretmez.",
        ],
      },
      {
        title: "Eşitlik ve sıfır durumlarını denetle",
        paragraphs: [
          "Bütün ivmeler 0 ve ilk hız v₀sabitse toplam yer değiştirme v₀T, yol |v₀|Tolmalıdır. İlk ve son konum aynıysa ortalama hız 0 olabilir; yol ve ortalama sürat yine pozitif olabilir. Aynı v ile u seçilirse sabit hızla giden cisim bu gözlemciye göre durgun görünür. Bu sınır durumları, işaretleri ve ortalama tanımlarını birlikte sınar.",
          "Bir hızın yalnız bir anda 0 olması tüm aralığın yolu 0 demek değildir. İki evrenin toplamΔvsi 0 olsa da arada hız ve konum değişmiş olabilir. Sonuç seçmeden önce istenenin son konum, yer değiştirme, yol, anlık hız veya aralık ortalaması olduğuna tekrar bak. Birimler farklı nicelikleri ayırır; aynı m/sbirimi taşıyan anlık ve ortalama değerleri de zaman bağlamı ayırır.",
        ],
      },
      {
        title: "Parçalı çözüm için küçük tablo",
        paragraphs: [
          "Her evre için başlangıç zamanı, süre, ilk konum, ilk hız ve ivme satırı kur. Son hızı ve işaretliΔxhesabını yaz; hız sıfırı evre içindeyse yol için alt parçalara geç. Son konumu önceki konuma ekle, son hızı öteki evreye taşı. Son satırda işaretli yer değiştirmeleri ayrı, pozitif yolları ayrı, bütün süreleri birlikte topla.",
          "Toplamın kontrolündeΣΔx=xson−xilkveΣsüre=Tuyumunu ara. Ortalama hız için toplamΔx/T, sürat için toplamyol/Tkullan. Hareketli gözlemcide hesaplara başlamadan v′=v−udönüşümünü uygulamak veya dünya konumlarını x′=x−utile dönüştürmek aynı sonucu vermelidir. Bu iki yolun uyuşması, gözlemci dönüşümü ve işaretli alan hesabı için güçlü bir denetimdir.",
        ],
      },
    ],
    examples: [
      {
        title: "Bekleme süresini tersine bul",
        prompt:
          "Bir araç doğrusal yolda aynı yönde önce 4 s boyunca 6 m/s, sonra 2 s boyunca 3 m/s gidiyor; son noktada τs bekliyor. Başlangıçtan beklemenin sonuna ortalama hız 2 m/s. Bekleme süresini ve bütün aralığın ortalama süratini bul.",
        strategy:
          "Toplam yer değiştirmeyi bilinen hareket evrelerinden bul; bilinmeyen süreyi ortalama tanımından çöz.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Hareket evreleri 24 m ve 6 m; toplamΔx=30 m. Yön değişmediği için yol da 30 m.",
          },
          {
            label: "2. adım",
            explanation:
              "Ortalama hız 30/(6+τ)=2 olduğundan toplam süre 15 s,τ=9 s.",
          },
          {
            label: "3. adım",
            explanation:
              "Bütün aralığın sürati de 30/15=2 m/s. Bekleme sadece süreye katkı yapar.",
          },
        ],
        answer: "Bekleme 9 s; ortalama sürat 2 m/s.",
        check:
          "24+6=30 m; 4+2+9=15 s. Hareket hâlindeki 5 m/sortalaması bütün aralığa taşınamaz.",
        pitfall:
          "Bekleme süresini paydadan çıkarmak veya 6 ve 3 süratlerinin aritmetik ortalamasını almak.",
      },
      {
        title: "İki konum verisinden iki ivme",
        prompt:
          "Cisim x₀=0, v₀=1 m/s ile başlıyor. İlk 2 s sabita₁ile x=6 m’ye geliyor. Sonraki 2 s sabita₂ile t=4 s’de x=10 m’ye geliyor. xvevevre sınırında sürekli. a₁, a₂ve son hızı bul; ikinci evrede dönüş var mı?",
        strategy:
          "İlk evreden a₁ve sınır hızını bul; ikinci evreye yerel 2 s ile geç.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İlkΔx=1·2+½a₁·4=6; a₁=2 m/s². Sınır hızı 1+2·2=5 m/s.",
          },
          {
            label: "2. adım",
            explanation:
              "İkinciΔx=10−6=4 m=5·2+½a₂·4; a₂=−3 m/s². Son hız 5−3·2=−1 m/s.",
          },
          {
            label: "3. adım",
            explanation:
              "İkinci evrede sıfır hız yerel 5/3 s’de,2 s’den önce gerçekleşir; bu evre içinde yön değişir.",
          },
        ],
        answer: "a₁=+2, a₂=−3 m/s²; son hız−1 m/s. İkinci evrede dönüş vardır.",
        check: "İkinci evre denklemi 6+5·2−1,5·4=10 mson konumu geri verir.",
        pitfall:
          "İkinci evrenin ilk hızını yeniden 1 m/salmak veya global 4 s’yi yerel süre olarak kullanmak.",
      },
      {
        title: "Karşılaşma sıralamayı değiştirir mi?",
        prompt:
          "A, t=0’dan itibaren xA=4 t bağıntısıyla gidiyor. B, t=2 s’den itibaren xB=12+(t−2)² ile tanımlı; bu formülde xmetre, tsaniye. İki denklem yalnız 2≤t≤6 s ortak aralığında kullanılacak. Karşılaşma zamanı ve bu anda öne geçme olup olmadığını bul. vA=4, vB=2(t−2)verilmiş.",
        strategy:
          "Konum farkını çarpanlarına ayır; sıfırın iki yanındaki işareti de denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "xB−xA=12+(t−2)²−4 t=t²−8 t+16=(t−4)².",
          },
          {
            label: "2. adım",
            explanation: "Eşitlikt=4 s’de; x=16 m. vA=vB=4 m/s.",
          },
          {
            label: "3. adım",
            explanation:
              "Fark iki yanda da negatif olmaz; Bönce ve sonra A’nın önünde veya aynı yerdedir. t=4 temas anı vardır, sıralama değişmez.",
          },
        ],
        answer:
          "4 s’de 16 m’de karşılaşırlar; bu modelde birbirlerini geçmezler.",
        check:
          "t=3 ve 5 s’de fark 1 m’dir; tek sıfır iki tarafta işaret değiştirmez.",
        pitfall: "Konum eğrilerinin her kesişmesini otomatik öne geçme saymak.",
      },
      {
        title: "Eşit yollar ve moladan bilinmeyen sürat",
        prompt:
          "Bir araç aynı yönde iki 30 m bölüm gidiyor. İlk bölüm sürati 6 m/s; iki bölüm arasında 5 s bekliyor. Bütün yolculuk ortalama sürati 4 m/s. İkinci bölümün sabit süratini bul.",
        strategy:
          "Toplam süreden bilinen sürüş ve beklemeyi çıkar; kalan sürede ikinci yolu böl.",
        steps: [
          {
            label: "1. adım",
            explanation: "Toplam yol 60 m; bütün süre 60/4=15 s.",
          },
          {
            label: "2. adım",
            explanation:
              "İlk bölüm 30/6=5 s; bekleme 5 s. İkinci bölüm süresi 15−5−5=5 s.",
          },
          {
            label: "3. adım",
            explanation:
              "İkinci sürat 30/5=6 m/s. Sürüşte iki hız aynı olsa da bekleme ortalamayı 4 m/s’ye indirir.",
          },
        ],
        answer: "İkinci sürat 6 m/s.",
        check: "5 s+5 sbekleme+5 s=15 s; 60/15=4 m/s.",
        pitfall:
          "İki eşit yol formülüne beklemeyi katmadan doğrudan 4 m/sortalama yerleştirmek.",
      },
      {
        title: "Ortalama hızı sıfırlayan gözlemci",
        prompt:
          "Dünya gözlemcisinde bir cisim ilk 2 s 8 m/s, sonraki 3 s 2 m/s sabit hızla+x yönünde gidiyor. Başlangıçta aynı yerde bulunan sabitu hızlı gözlemciye göre toplam ortalama hız 0 olsun. u’yu ve bu gözlemcinin gördüğü toplam yolu bul.",
        strategy:
          "Önce toplamΔx/Tile gerekli gözlemci hızını bul; sonra her evreyi bu gözlemciye göre izle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "DünyaΔx=8·2+2·3=22 m, T=5 s. Δx′=22−5 u=0 için u=4,4 m/s.",
          },
          {
            label: "2. adım",
            explanation: "İlk göreli hız 8−4,4=+3,6 m/s; iki saniyede+7,2 m.",
          },
          {
            label: "3. adım",
            explanation:
              "İkinci göreli hız 2−4,4=−2,4 m/s; üç saniyede−7,2 m. Göreli yol 7,2+7,2=14,4 m, yer değiştirme 0.",
          },
        ],
        answer: "u=4,4 m/s; göreli yol 14,4 m.",
        check: "Göreli ortalama sürat 14,4/5=2,88 m/siken ortalama hız 0’dır.",
        pitfall: "Dünya yolundan uTçıkarıp 0 sonucunu göreli yol saymak.",
      },
      {
        title: "Sürat sınırından yönü kanıtla",
        prompt:
          "Bir cismin hızı süreklidir. Cisim 0 konumundan 4 s sonunda 8 m’ye geliyor; bütün aralıkta sürati en çok 2 m/s. Bu verilerle pozitif süre boyunca geri gitmiş veya beklemiş olabilir mi? Yol ve hız için ne zorunludur?",
        strategy:
          "Maksimum süratin koyduğu üst yol sınırını, uç konumların koyduğu alt sınırla karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Uç konumlarΔx=8 m verir; her hareket için yol≥|Δx|=8 m.",
          },
          {
            label: "2. adım",
            explanation:
              "Sürat her anda en çok 2 m/s ve süre 4 s olduğundan yol≤2·4=8 m. İki sınır birlikte yolun tam 8 m olduğunu zorunlu kılar.",
          },
          {
            label: "3. adım",
            explanation:
              "Pozitif süreli geri gidiş yolu 8 m’den büyük yapardı. Pozitif süreli bekleme veya 2’den düşük sürat, geri kalan zamanda 2 aşılmadan 8 m’ye ulaşamaz. Sürekli hız koşulunda v=+2 m/s bütün aralıkta zorunludur.",
          },
        ],
        answer:
          "Yol 8 m; pozitif süreli geri gidiş veya bekleme olamaz; v=+2 m/s.",
        check:
          "Sabit+2 m/sprogramı 4 s’de 8 m verir ve üst sınırı her anda tam kullanır.",
        pitfall:
          "Uç konum bilgisi tek başına yolu belirlemez kuralını, ek maksimum sürat sınırını yok sayarak uygulamak.",
      },
      {
        title: "Global zamanı yanlış kullanan hesabı düzelt",
        prompt:
          "Bir cismin t=3 s’de x=10 m, v=4 m/s olduğu biliniyor. Sonraki evrede t=3 ile 5 s arasında a=−1 m/s². Bir öğrenci t=5 anında x=10+4·5−½·5²=17,5 m yazıyor. Hatasını bul; doğru konumu ve hızı hesapla.",
        strategy:
          "Evrenin başlangıç saatini denklemdeki yerel süreye dönüştür.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Bu evrede geçen süreτ=5−3=2 s’dir; 5 suygulamak ivmeyi yanlış başlangıca uzatır.",
          },
          {
            label: "2. adım",
            explanation: "DoğruΔx=4·2−½·2²=6 m; xson=10+6=16 m.",
          },
          {
            label: "3. adım",
            explanation:
              "Son hız 4−1·2=2 m/s; aynı evre içinde hız henüz yön değiştirmemiştir.",
          },
        ],
        answer: "Yerel süre 2 s; doğru konum 16 m ve hız+2 m/s.",
        check:
          "Ortalama hız(4+2)/2=3 m/s; 2 s’de 6 m yer değiştirmeyi doğrular.",
        pitfall:
          "Başlangıç koşulu t=3’e aitken aynı denkleme t=0’dan geçen 5 s’yi koymak.",
      },
      {
        title: "Aynı ivme grafiği konumu belirler mi?",
        prompt:
          "İki hareketli x₀=0’dan başlıyor; ikisi için de 0–2 s boyunca a=+2 m/s². K’nın ilk hızı+6 m/s, L’nin−6 m/s. Son konumları bul ve yalnız aynı a–tgrafiğinden aynı x–tgrafiği çıkarılıp çıkarılamayacağını değerlendir.",
        strategy:
          "İvme alanının aynı hız değişimini verdiğini, başlangıç hızlarının ise farklı kaldığını göster.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Her ikisi için Δv=2·2=4 m/s. Son hızlar K’da 10, L’de−2 m/s.",
          },
          {
            label: "2. adım",
            explanation: "K’nınΔxsi 6·2+½·2·4=16 m. L’ninΔxsi−6·2+4=−8 m.",
          },
          {
            label: "3. adım",
            explanation:
              "İvme grafikleri aynı ama hız ve konum programları farklıdır; başlangıç koşulları olmadan konum belirlenmez.",
          },
        ],
        answer:
          "Kson 16 m, Lson−8 m; aynı ivme grafiği tek başına aynı konumu vermez.",
        check:
          "Her iki hız farkı 4 m/s; konum farkı ilk hızların 12 m/sfarkının 2 s’lik etkisi 24 m’dir.",
        pitfall: "İvme alanını son hızın veya son konumun kendisi saymak.",
      },
    ],
    recall: [
      {
        prompt: "vnegatifken a da negatifse sürat ne yapar?",
        answer:
          "İkisi aynı yönlü olduğundan sürat artar. Negatif ivme tek başına yavaşlama değildir.",
      },
      {
        prompt: "Evre içinde yön değişimi olup olmadığını nasıl denetlersin?",
        answer:
          "Sabit ivmedeτ=−v₀/a sıfırını bul; 0<τ<evre süresi ve hızın işaret değişimi koşulunu kontrol et.",
      },
      {
        prompt: "v–tgrafiğinin iki alan toplamı hangi nicelikleri verir?",
        answer:
          "İşaretli alanΔx; mutlak alan toplamı yoldur. Yön değişirse bu ikisi farklı olabilir.",
      },
      {
        prompt: "a–talanı son hızı bulmaya tek başına yeter mi?",
        answer:
          "Alan yalnızΔvverir. Son hız için v₀; konum için başlangıç konumu ve hız programı da gerekir.",
      },
      {
        prompt: "Parçalı hareketin ikinci evresindeτneden yeniden başlar?",
        answer:
          "Evrenin başlangıç koşulları kendi başlangıç anına aittir;τ=global t−evre başlangıcı kullanılır.",
      },
      {
        prompt: "Sabit u hızlı gözlemcide hangi dönüşümler kullanılır?",
        answer:
          "x′=x−ut, v′=v−u, a′=a. Yol için |v′|ayrı toplanır; dünya yolundan uTçıkarma genel kural değildir.",
      },
      {
        prompt: "Bir karşılaşma neden her zaman geçme değildir?",
        answer:
          "Konum farkı 0 olabilir ama iki yanda işaret değiştirmeyebilir; bu durumda sıralama değişmeden temas olur.",
      },
      {
        prompt: "Toplam süre 0 ise ortalama hız ve sürat 0 mıdır?",
        answer:
          "Hayır; 0/0 tanımsızdır. Başlangıç/son anlık konum ve hız bilgisi bulunabilir, aralık ortalamaları tanımlanmaz.",
      },
    ],
    questions: [
      {
        id: "f026p-dogrusal-hareket-1",
        prompt: {
          tr: "Doğrusal eksende cisim x=−5 m’den x=12 m’ye gidip x=7 m’ye dönüyor. Bütün süre 4 s. Bu aralığın toplam yolu ve ortalama hızı sırasıyla nedir?",
        },
        options: [
          {
            tr: "−22 m;−3 m/s",
          },
          {
            tr: "22 m;+5,5 m/s",
          },
          {
            tr: "12 m;+3 m/s",
          },
          {
            tr: "24 m;+6 m/s",
          },
          {
            tr: "22 m;+3 m/s",
          },
        ],
        answer: 4,
        hint: {
          tr: "İlk yol 12−(−5)=17 m; dönüş yolu 12−7=5 m, toplam 22 m.",
        },
        explanation: {
          tr: "İlk yol 12−(−5)=17 m; dönüş yolu 12−7=5 m, toplam 22 m. Yer değiştirme 7−(−5)=12 m. Ortalama hız 12/4=+3 m/s; yol 22 m olarak kalır.",
        },
        skill: "physics026-dogrusal-hareket-1",
        guidance: {
          knowledge: [
            "Yol parçaların uzunluk toplamı; ortalama hız son–ilk konum farkının toplam süreye oranıdır.",
          ],
          strategy:
            "İki yol parçasını pozitif topla; hız için yalnız uç konum farkını kullan.",
          steps: [
            "İlk yol 12−(−5)=17 m; dönüş yolu 12−7=5 m, toplam 22 m.",
            "Yer değiştirme 7−(−5)=12 m.",
            "Ortalama hız 12/4=+3 m/s; yol 22 m olarak kalır.",
          ],
          optionReasons: [
            "Yol negatif olamaz; son konum ilkinden sağda olduğundan ortalama hız pozitiftir.",
            "5,5 m/sortalama sürattir; istenen ortalama hızdır.",
            "Hız doğru fakat yol yerine işaretli yer değiştirme kullanılmıştır.",
            "İlk konum−5 m doğru hesaba katılmamıştır; uç fark 12 m’dir.",
            "Doğru. Yol 17+5, ortalama hız ise 12/4 ile bulunur.",
          ],
          commonError: "Yol ile işaretli yer değiştirmeyi tek toplam saymak.",
          check: "Ortalama sürat 22/4=5,5 m/s≥|3 m/s|koşulu sağlanır.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-2",
        prompt: {
          tr: "x₀=0, v₀=+6 m/s ile başlayan bir cisim 0–8 s boyunca sabita=−2 m/s² ile hareket ediyor. Başlangıçtan sonra ilk kez x=0’a döndüğü zaman ve o andaki hızı hangisidir?",
        },
        options: [
          {
            tr: "0 s;+6 m/s",
          },
          {
            tr: "6 s;+6 m/s",
          },
          {
            tr: "6 s;−6 m/s",
          },
          {
            tr: "8 s;−10 m/s",
          },
          {
            tr: "3 s; 0 m/s",
          },
        ],
        answer: 2,
        hint: {
          tr: "x=6 t−t²=t(6−t). Sıfırlar 0 ve 6 s’dir.",
        },
        explanation: {
          tr: "x=6 t−t²=t(6−t). Sıfırlar 0 ve 6 s’dir. Başlangıçtan sonraki ilk dönüş 6 s; verilen 0–8 aralığındadır. v=6−2·6=−6 m/s. Dönüş noktasındaki duruş ise 3 s’dedir; başlangıca dönüşle aynı an değildir.",
        },
        skill: "physics026-dogrusal-hareket-2",
        guidance: {
          knowledge: [
            "Sabit ivmedeΔx=v₀t+½at²; başlangıca dönüş içinΔx=0 ve başlangıçt=0 dışında kök aranır.",
          ],
          strategy:
            "Konum denklemini çarpanlarına ayır, pozitif dönüş zamanını hız denklemine koy.",
          steps: [
            "x=6 t−t²=t(6−t). Sıfırlar 0 ve 6 s’dir.",
            "Başlangıçtan sonraki ilk dönüş 6 s; verilen 0–8 aralığındadır.",
            "v=6−2·6=−6 m/s. Dönüş noktasındaki duruş ise 3 s’dedir; başlangıca dönüşle aynı an değildir.",
          ],
          optionReasons: [
            "Başlangıç kökü özellikle dışlanmıştır.",
            "Zaman doğru, dönüşteki hızın negatif yönü atlanmıştır.",
            "Doğru. Konum 6 s’de yeniden 0; cisim o anda sola 6 m/s ile gider.",
            "Bunlar programın son anına aittir; x(8)=−16 m başlangıç konumu değildir.",
            "Bu en sağ konumdaki yön değiştirme anıdır; başlangıç konumuna dönüş değil.",
          ],
          commonError:
            "Hızın sıfır olmasını başlangıç konumuna dönüşle aynı koşul saymak.",
          check: "x(6)=36−36=0; v(6)=−6 m/s verir.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-3",
        prompt: {
          tr: "Cisim x₀=−4 m, v₀=+2 m/s ile başlıyor. İlk 2 s a=+3 m/s²; sonraki 4 s a=−1 m/s². Konum ve hız evre sınırında sürekli. t=6 s’de konum ve hız nedir?",
        },
        options: [
          {
            tr: "34 m;+4 m/s",
          },
          {
            tr: "30 m;−2 m/s",
          },
          {
            tr: "30 m;+4 m/s",
          },
          {
            tr: "36 m;+2 m/s",
          },
          {
            tr: "6 m;+8 m/s",
          },
        ],
        answer: 2,
        hint: {
          tr: "İlk evreΔx=2·2+½·3·4=10 m; sınır konumu 6 m, hızı 8 m/s.",
        },
        explanation: {
          tr: "İlk evreΔx=2·2+½·3·4=10 m; sınır konumu 6 m, hızı 8 m/s. İkinci evreΔx=8·4−½·16=24 m; son hız 8−4=4 m/s. Son konum 6+24=30 m; son hız+4 m/s.",
        },
        skill: "physics026-dogrusal-hareket-3",
        guidance: {
          knowledge: [
            "Her yeni evre öncekinin son konum ve hızından, kendi yerel süresiyle başlar.",
          ],
          strategy:
            "İlk evrenin sonunu bul; sonra 4 s’lik ikinci evreyi ayrı hesapla.",
          steps: [
            "İlk evreΔx=2·2+½·3·4=10 m; sınır konumu 6 m, hızı 8 m/s.",
            "İkinci evreΔx=8·4−½·16=24 m; son hız 8−4=4 m/s.",
            "Son konum 6+24=30 m; son hız+4 m/s.",
          ],
          optionReasons: [
            "Hız doğru, konum yerine toplam yer değiştirme verilmiştir.",
            "İkinci evrenin ilk hızı 8 yerine başlangıç 2 alınmıştır.",
            "Doğru. Evre sonları doğru aktarılır; toplamΔx 34 m, başlangıç−4 m’dir.",
            "İkinci evreye global 6 suygulanarak evre süresi yanlış kullanılmıştır.",
            "Bunlar yalnız ilk 2 s’nin son değerleridir; ikinci evre atlanmıştır.",
          ],
          commonError:
            "Evre süresini global saatle veya son konumu toplam yer değiştirmeyle karıştırmak.",
          check:
            "İkinci evrede hız 8’den 4’e iner ve pozitif kalır; bu bölümde yol 24 m’dir.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-4",
        prompt: {
          tr: "Bir cisim ilk 2 s +6 m/s, sonraki 3 s 0 m/s, son 4 s−3 m/s sabit hızla gidiyor. Bütün 9 s için ortalama hız ve ortalama sürat nedir?",
        },
        options: [
          {
            tr: "8/3 m/s; 0",
          },
          {
            tr: "0; 0",
          },
          {
            tr: "+1 m/s;+1 m/s",
          },
          {
            tr: "0; 8/3 m/s",
          },
          {
            tr: "0; 4 m/s",
          },
        ],
        answer: 3,
        hint: {
          tr: "İşaretli yer değiştirmeler+12,0,−12 m; toplam 0.",
        },
        explanation: {
          tr: "İşaretli yer değiştirmeler+12,0,−12 m; toplam 0. Yol 12+0+12=24 m; toplam süre 2+3+4=9 s. Ortalama hız 0/9=0; sürat 24/9=8/3 m/s.",
        },
        skill: "physics026-dogrusal-hareket-4",
        guidance: {
          knowledge: [
            "Bekleme süreye eklenir; ortalama hızda işaretli, süratte pozitif yol toplamı kullanılır.",
          ],
          strategy: "Üç evreninΔx, yolve süre katkılarını ayrı topla.",
          steps: [
            "İşaretli yer değiştirmeler+12,0,−12 m; toplam 0.",
            "Yol 12+0+12=24 m; toplam süre 2+3+4=9 s.",
            "Ortalama hız 0/9=0; sürat 24/9=8/3 m/s.",
          ],
          optionReasons: [
            "İki ortalamanın payları yer değiştirmiştir; sürat pozitif yola dayanır.",
            "Başlangıca dönmek arada yapılan 24 m’lik yolu yok etmez.",
            "Üç hızın süre ağırlıkları yerine aritmetik ortalaması alınmıştır.",
            "Doğru. Yer değiştirme 0 iken toplam yol 24 m ve geçen süre 9 s.’dir.",
            "Bekleme 3 spaydadan çıkarılmıştır; 24/6 hareket süresine göre ortalamadır.",
          ],
          commonError:
            "Sıfır yer değiştirmeyi sıfır hareket veya sıfır sürat saymak.",
          check: "9·8/3=24 m; bekleme yol eklemeden süreyi uzatır.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-5",
        prompt: {
          tr: "Bir x–tgrafiği t=1 s, x=−2 m ve t=3 s, x=6 mnoktalarından geçen bir doğru. Aynı doğru 0≤t≤4 s boyunca geçerli. Sabit hız ve t=0 konumu nedir?",
        },
        options: [
          {
            tr: "+4 m/s;−2 m",
          },
          {
            tr: "+4 m/s;−6 m",
          },
          {
            tr: "−4 m/s;+6 m",
          },
          {
            tr: "+2 m/s; 0 m",
          },
          {
            tr: "+8 m/s;−10 m",
          },
        ],
        answer: 1,
        hint: {
          tr: "v=(6−(−2))/(3−1)=8/2=4 m/s.",
        },
        explanation: {
          tr: "v=(6−(−2))/(3−1)=8/2=4 m/s. x=x₀+4 t; t=1, x=−2 için x₀=−6 m. Hız+4 m/s, başlangıç konumu−6 m’dir; konumun negatifliği hızın negatifliğini gerektirmez.",
        },
        skill: "physics026-dogrusal-hareket-5",
        guidance: {
          knowledge: [
            "x–tdoğrusunda eğim hız, düşey kesim başlangıç konumudur.",
          ],
          strategy:
            "İki nokta farkından eğimi bul; bilinen bir noktadan başlangıca geri git.",
          steps: [
            "v=(6−(−2))/(3−1)=8/2=4 m/s.",
            "x=x₀+4 t; t=1, x=−2 için x₀=−6 m.",
            "Hız+4 m/s, başlangıç konumu−6 m’dir; konumun negatifliği hızın negatifliğini gerektirmez.",
          ],
          optionReasons: [
            "Hız doğru, t=1 konumu başlangıç konumu sanılmıştır.",
            "Doğru. Eğim 4 ve kesim−6, iki veriyi de sağlar.",
            "Grafik artan doğruludur; eğimin işareti pozitif olmalıdır.",
            "Bir noktada x/tveya yanlış fark oranı kullanılmıştır; iki noktaya aynı anda uymaz.",
            "Konum farkı 8 m, süre farkı 2 s’ye bölünmeden hız yapılmıştır.",
          ],
          commonError:
            "Grafikteki bir noktanın koordinat oranını her zaman eğim sanmak.",
          check: "−6+4·3=6 m ve−6+4·1=−2 m.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-6",
        prompt: {
          tr: "0≤t≤5 s için x=2−6 t+t² metre ve v=−6+2 t m/sverilmiş. t=3 s’de hız, ivme ve konum grafiğinin durumu hangisidir?",
        },
        options: [
          {
            tr: "v=−6, a=+2 m/s²; konum maksimumdadır.",
          },
          {
            tr: "v=0, a=−2 m/s²; konum maksimumdadır.",
          },
          {
            tr: "v=+6, a=0; konum doğrusu artar.",
          },
          {
            tr: "v=0, a=0; kalıcı durgunluk vardır.",
          },
          {
            tr: "v=0, a=+2 m/s²; konum minimumdadır.",
          },
        ],
        answer: 4,
        hint: {
          tr: "v(3)=−6+6=0 m/s.",
        },
        explanation: {
          tr: "v(3)=−6+6=0 m/s. Hız her saniye 2 m/s arttığı için a=+2 m/s². 3 s’den önce hız negatif, sonra pozitiftir; konumda yerel minimum ve yön değişimi vardır.",
        },
        skill: "physics026-dogrusal-hareket-6",
        guidance: {
          knowledge: [
            "Hızın sabit zaman katsayısı ivmedir; v=0 konum grafiğinde yatay teğet verir, ivmenin 0 olması gerekmez.",
          ],
          strategy:
            "Önce 3 s’yi hız ifadesine koy; sonra hızın değişim katsayısını oku.",
          steps: [
            "v(3)=−6+6=0 m/s.",
            "Hız her saniye 2 m/s arttığı için a=+2 m/s².",
            "3 s’den önce hız negatif, sonra pozitiftir; konumda yerel minimum ve yön değişimi vardır.",
          ],
          optionReasons: [
            "−6 ilk hızdır; 3 s’de güncellenmelidir. Pozitif ivmede bu sıfır minimumdur.",
            "Hızın zaman katsayısı+2’dir; ivme işareti ters alınmıştır.",
            "Verilen hız formülü 3 s’de 0 verir; ivme de 0 değildir.",
            "Bir anlık sıfır hız ivmenin veya sonraki hareketin sıfır olduğunu göstermez.",
            "Doğru. Sıfır hız ve pozitif ivme, bu programda negatiften pozitife dönüş verir.",
          ],
          commonError:
            "Bir anda hızın 0 olmasını bütün türevlerin 0 veya cismin sonsuza dek durması saymak.",
          check: "x(3)=−7 m; t=2 ve 4 için−6 m, minimumu iki yandan doğrular.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-7",
        prompt: {
          tr: "Bir cismin 0–4 s aralığındaki hızı v=−5+2 t m/s. Bu aralığın toplam yolu ve yer değiştirmesi nedir?",
        },
        options: [
          {
            tr: "6,25 m;−6,25 m",
          },
          {
            tr: "8,5 m;+4 m",
          },
          {
            tr: "2,25 m;+2,25 m",
          },
          {
            tr: "8,5 m;−4 m",
          },
          {
            tr: "4 m;−4 m",
          },
        ],
        answer: 3,
        hint: {
          tr: "v=0 için t=2,5 s; ilk parça negatif, son 1,5 spozitif hızdır.",
        },
        explanation: {
          tr: "v=0 için t=2,5 s; ilk parça negatif, son 1,5 spozitif hızdır. Negatif üçgenin büyüklüğü½·2,5·5=6,25 m; pozitif üçgen½·1,5·3=2,25 m. Yol 8,5 m; yer değiştirme−6,25+2,25=−4 m.",
        },
        skill: "physics026-dogrusal-hareket-7",
        guidance: {
          knowledge: [
            "Yol için hızın sıfırı iç noktadaysa pozitif ve negatif alanların büyüklükleri ayrı toplanır.",
          ],
          strategy:
            "Sıfır zamanı bul; iki üçgenin büyüklüklerini ve işaretli toplamını hesapla.",
          steps: [
            "v=0 için t=2,5 s; ilk parça negatif, son 1,5 spozitif hızdır.",
            "Negatif üçgenin büyüklüğü½·2,5·5=6,25 m; pozitif üçgen½·1,5·3=2,25 m.",
            "Yol 8,5 m; yer değiştirme−6,25+2,25=−4 m.",
          ],
          optionReasons: [
            "Yalnız ilk 2,5 slik bölüm hesaplanmıştır; son pozitif bölüm atlanmıştır.",
            "Yol doğru; negatif ilk alan baskın olduğundanΔxnegatif olmalıdır.",
            "Yalnız son 1,5 slik bölüm alınmış; ilk negatif bölüm atlanmıştır.",
            "Doğru. Mutlak alanlar 8,5, işaretli alan−4 verir.",
            "İşaretli toplamın mutlak değeri yol sayılmış; geri dönüş katkısı kaybolmuştur.",
          ],
          commonError:
            "Eksen geçen hız grafiğini tek bir işaretli yamukla yol hesabına taşımak.",
          check:
            "DoğrudanΔx=−5·4+½·2·16=−4 m; bu yalnız yer değiştirmeyi doğrular.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-8",
        prompt: {
          tr: "Başlangıç hızı−1 m/s olan cismin ilk 2 s ivmesi+3 m/s², sonraki 3 s ivmesi−2 m/s². Son hız ve toplam yer değiştirme hangisidir?",
        },
        options: [
          {
            tr: "0 m/s; 0 m",
          },
          {
            tr: "−1 m/s;+10 m",
          },
          {
            tr: "+5 m/s;+4 m",
          },
          {
            tr: "−1 m/s; 0 m",
          },
          {
            tr: "−7 m/s;−8 m",
          },
        ],
        answer: 1,
        hint: {
          tr: "İlk son hız−1+3·2=5 m/s; ilkΔx=−1·2+½·3·4=4 m.",
        },
        explanation: {
          tr: "İlk son hız−1+3·2=5 m/s; ilkΔx=−1·2+½·3·4=4 m. İkinci son hız 5−2·3=−1 m/s; ikinciΔx=5·3−½·2·9=6 m. Son hız−1 m/s, toplamΔx=10 m. ToplamΔv=0 olsa daΔxsıfır değildir.",
        },
        skill: "physics026-dogrusal-hareket-8",
        guidance: {
          knowledge: [
            "a–talanı hız değişimini verir; konum için her evrede güncel ilk hızlaΔxhesaplanır.",
          ],
          strategy:
            "İlk evre sınır hızını bul; ikinci evre konumunu bu hızla hesapla.",
          steps: [
            "İlk son hız−1+3·2=5 m/s; ilkΔx=−1·2+½·3·4=4 m.",
            "İkinci son hız 5−2·3=−1 m/s; ikinciΔx=5·3−½·2·9=6 m.",
            "Son hız−1 m/s, toplamΔx=10 m. ToplamΔv=0 olsa daΔxsıfır değildir.",
          ],
          optionReasons: [
            "Toplam ivme alanı 0, sanki son hız ve yer değiştirme de 0 demekmiş gibi kullanılmıştır.",
            "Doğru. Hız ilk değere döner; iki konum katkısı 4+6 m’dir.",
            "Bunlar yalnız ilk 2 s’nin son değerleridir.",
            "Son hızın ilk hızla eşitliği konumun da aynı olduğunu göstermez.",
            "İkinci evrede ilk hız güncellenmeden−1 kullanılmıştır.",
          ],
          commonError:
            "Sıfır toplam hız değişimini sıfır son hız veya sıfır yer değiştirme saymak.",
          check: "Δv=+6−6=0; vson=v₀=−1 m/skoşulu sağlanır.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-9",
        prompt: {
          tr: "Bir cismin 3 s boyunca ivmesi 0, bu aralığın başındaki hızı+7 m/s. Başlangıç konumu verilmemiş. Hangi nicelik çifti bu verilerle kesin belirlenir?",
        },
        options: [
          {
            tr: "Son hız+7 m/s; yer değiştirme+21 m",
          },
          {
            tr: "Son sürat 21 m/s; yer değiştirme 7 m",
          },
          {
            tr: "Son hız 0; yer değiştirme 0",
          },
          {
            tr: "Yalnız ivme bilindiği için hiçbir sonuç çıkarılamaz",
          },
          {
            tr: "Son konum 21 m; ilk konum 0",
          },
        ],
        answer: 0,
        hint: {
          tr: "vson=+7 m/sçünküΔv=0.",
        },
        explanation: {
          tr: "vson=+7 m/sçünküΔv=0. Δx=7·3=+21 m. xson=xilk+21 m olur; başlangıç verilmediğinden mutlak son konum bilinmez.",
        },
        skill: "physics026-dogrusal-hareket-9",
        guidance: {
          knowledge: [
            "Sıfır ivme hızı sabit tutar; konumun mutlak değeri için başlangıç konumu ayrıca gerekir.",
          ],
          strategy:
            "Sabit hızdan yer değiştirmeyi bul; son konum ile yer değiştirmeyi ayır.",
          steps: [
            "vson=+7 m/sçünküΔv=0.",
            "Δx=7·3=+21 m.",
            "xson=xilk+21 m olur; başlangıç verilmediğinden mutlak son konum bilinmez.",
          ],
          optionReasons: [
            "Doğru. Bu iki sonuçxilkbilinmeden bulunabilir.",
            "Süre ve hız yanlış niceliklere aktarılmıştır.",
            "İvmenin 0 olması hızın 0 olduğu anlamına gelmez.",
            "İlk hız da 7 m/s verilmiştir; bu önemli başlangıç bilgisi kullanılmalıdır.",
            "Kökte başlangıç konumu 0 seçilmemiştir; mutlak konum uydurulmuştur.",
          ],
          commonError:
            "Sıfır ivmeyi durgunluk veya bilinmeyen başlangıç konumunu otomatik 0 saymak.",
          check:
            "Herhangi birxilkdeğeri seçilse de 3 s’deki fark 21 m olarak kalır.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-10",
        prompt: {
          tr: "Bir cisim ilk 3 s +8 m/s, sonraki 3 s−2 m/s sabit hızla gidiyor. Toplam aralığın ortalama hızı ve sürati nedir?",
        },
        options: [
          {
            tr: "6 m/s; 10 m/s",
          },
          {
            tr: "+3 m/s; 5 m/s",
          },
          {
            tr: "3 m/s; 3 m/s",
          },
          {
            tr: "5 m/s; 5 m/s",
          },
          {
            tr: "−3 m/s; 5 m/s",
          },
        ],
        answer: 1,
        hint: {
          tr: "İşaretliΔx=8·3−2·3=18 m.",
        },
        explanation: {
          tr: "İşaretliΔx=8·3−2·3=18 m. Toplam yol 24+6=30 m; toplam süre 6 s. Ortalama hız 3 m/s; ortalama sürat 5 m/s.",
        },
        skill: "physics026-dogrusal-hareket-10",
        guidance: {
          knowledge: [
            "Eşit sürelerde işaretli hızlar ortalama hız için; hız büyüklükleri ortalama sürat için kullanılabilir.",
          ],
          strategy: "İki evrenin yer değiştirme ve yol katkılarını 6 s’ye böl.",
          steps: [
            "İşaretliΔx=8·3−2·3=18 m.",
            "Toplam yol 24+6=30 m; toplam süre 6 s.",
            "Ortalama hız 3 m/s; ortalama sürat 5 m/s.",
          ],
          optionReasons: [
            "İki hızın toplamları ortalamaya çevrilmeden verilmiştir.",
            "Doğru. Eşit süreli iki evrede işaretli ve mutlak toplamlar farklıdır.",
            "Sürat için geri gidilen 6 mçıkarılmış; oysa yola eklenir.",
            "Ortalama hız için de büyüklükler toplanmış; yön değişimi yok sayılmıştır.",
            "Baskın yer değiştirme+x’tir; ortalama hız negatif değildir.",
          ],
          commonError:
            "Sürat ortalamasında hız işaretini veya hız ortalamasında yalnız büyüklüğü kullanmak.",
          check: "6·3=18 m ve 6·5=30 miki ayrı toplamı geri verir.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-11",
        prompt: {
          tr: "Bir araç aynı yönde 45 m’lik ilk yolu 9 m/s,45 m’lik ikinci yolu 3 m/s sabit süratle gidiyor. Bekleme yok. Bütün aralığın ortalama sürati kaç m/s?",
        },
        options: [
          {
            tr: "9",
          },
          {
            tr: "12",
          },
          {
            tr: "3",
          },
          {
            tr: "6",
          },
          {
            tr: "4,5",
          },
        ],
        answer: 4,
        hint: {
          tr: "İlk süre 45/9=5 s; ikinci süre 45/3=15 s.",
        },
        explanation: {
          tr: "İlk süre 45/9=5 s; ikinci süre 45/3=15 s. Toplam yol 90 m, süre 20 s. Ortalama sürat 90/20=4,5 m/s.",
        },
        skill: "physics026-dogrusal-hareket-11",
        guidance: {
          knowledge: [
            "Eşit yollar için sürelerL/vile bulunur; aritmetik hız ortalaması yalnız eşit süre koşulunda geçerlidir.",
          ],
          strategy: "İki yolu değil, iki süreyi önce birleştir.",
          steps: [
            "İlk süre 45/9=5 s; ikinci süre 45/3=15 s.",
            "Toplam yol 90 m, süre 20 s.",
            "Ortalama sürat 90/20=4,5 m/s.",
          ],
          optionReasons: [
            "Yalnız hızlı bölümün sürati alınmıştır.",
            "İki sürat toplanmıştır; ortalama toplam yol/toplam süredir.",
            "Yalnız yavaş bölümün sürati alınmıştır; ilk yolun süre ve uzunluğu da hesaba katılır.",
            "Bu 9 ve 3’ün aritmetik ortalamasıdır; iki bölüm eşit süreli değildir.",
            "Doğru. Daha yavaş ikinci bölüm 15 ssürdüğünden süre ağırlığı daha fazladır.",
          ],
          commonError: "Eşit yol ile eşit süreyi aynı ortalama kuralı saymak.",
          check: "2·9·3/(9+3)=4,5 m/seşit yol formülü aynı sonucu verir.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-12",
        prompt: {
          tr: "Başlangıç hızı−8 m/s, cismin 3 s boyunca sabit ivmesi+2 m/s². Bu 3 s’nin sonunda hareket yönü ve süratin değişme eğilimi hangisidir?",
        },
        options: [
          {
            tr: "+x yönünde; son anda sürat azalıyor.",
          },
          {
            tr: "Durgun; ivme 0",
          },
          {
            tr: "+x yönünde; son anda sürat artıyor.",
          },
          {
            tr: "−x yönünde; son anda sürat azalıyor.",
          },
          {
            tr: "−x yönünde; son anda sürat artıyor.",
          },
        ],
        answer: 3,
        hint: {
          tr: "vson=−8+2·3=−2 m/s.",
        },
        explanation: {
          tr: "vson=−8+2·3=−2 m/s. Son hız negatif olduğundan cisim hâlâ−x yönündedir. a=+2, v=−2 zıt işaretli; son anda sürat azalır. Duruş 4 s’de olur, verilen 3 s’den sonradır.",
        },
        skill: "physics026-dogrusal-hareket-12",
        guidance: {
          knowledge: [
            "İvme hızla zıt işaretliyse sıfıra gelene kadar sürat azalır; hızın işareti hareket yönünü verir.",
          ],
          strategy:
            "Önce son hızı bul; son anda hız ve ivme işaretlerini karşılaştır.",
          steps: [
            "vson=−8+2·3=−2 m/s.",
            "Son hız negatif olduğundan cisim hâlâ−x yönündedir.",
            "a=+2, v=−2 zıt işaretli; son anda sürat azalır. Duruş 4 s’de olur, verilen 3 s’den sonradır.",
          ],
          optionReasons: [
            "Hızın işareti yanlış; sonuç−2 m/s olarak bulunur.",
            "Cisim henüz 4 s’lik duruş anına gelmemiştir; ivme de+2 olarak sürer.",
            "Pozitif ivme otomatik pozitif hız demek değildir; 3 s’de hız−2’dir.",
            "Doğru. Hız−2 iken pozitif ivme hız büyüklüğünü azaltır.",
            "İvme negatif hıza karşı olduğundan bu anda sürat artmaz.",
          ],
          commonError:
            "İvmenin işaretini doğrudan hareket yönü veya hızlanma etiketi saymak.",
          check: "Sürat 8’den 2 m/s’ye iner; negatif hız daha az negatif olur.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-13",
        prompt: {
          tr: "Dünya çerçevesinde v₀=−2 m/s, a=+3 m/s². Başlangıçta aynı yerde bulunan gözlemci+x yönünde sabit 4 m/s ile gidiyor. t=2 s’de cismin bu gözlemciye göre hızı ve ivmesi nedir? Galile dönüşümü kullanılacak.",
        },
        options: [
          {
            tr: "+4 m/s;+3 m/s²",
          },
          {
            tr: "−4 m/s;−1 m/s²",
          },
          {
            tr: "0 m/s;+3 m/s²",
          },
          {
            tr: "+8 m/s;+3 m/s²",
          },
          {
            tr: "0 m/s; 0 m/s²",
          },
        ],
        answer: 2,
        hint: {
          tr: "Dünya hızı−2+3·2=+4 m/s.",
        },
        explanation: {
          tr: "Dünya hızı−2+3·2=+4 m/s. Göreli hız 4−4=0 m/s. Gözlemci sabit hızlı olduğundan göreli ivme yine+3 m/s²’dir.",
        },
        skill: "physics026-dogrusal-hareket-13",
        guidance: {
          knowledge: [
            "Sabit hızlı gözlemcide v′=v−u, a′=a; durgun görünmek sıfır ivme gerektirmez.",
          ],
          strategy: "Önce dünya hızını hesapla, sonra gözlemci hızını çıkar.",
          steps: [
            "Dünya hızı−2+3·2=+4 m/s.",
            "Göreli hız 4−4=0 m/s.",
            "Gözlemci sabit hızlı olduğundan göreli ivme yine+3 m/s²’dir.",
          ],
          optionReasons: [
            "Dünya hızı, göreli hız diye aynen kullanılmıştır.",
            "İvmeden sabit gözlemci hızı çıkarılamaz; birimleri de farklıdır.",
            "Doğru. Aynı anlık hızlar birbirini çıkarır; ivme değişmez.",
            "Aynı yöndeki gözlemci hızı çıkarılmak yerine eklenmiştir.",
            "Bir an durgun görünme, ivmenin de 0 olduğunu göstermez.",
          ],
          commonError:
            "Sabit gözlemci hızını ivmeden çıkarmak veya anlık göreli duruşu kalıcı durgunluk saymak.",
          check:
            "t=2’den kısa süre sonra dünya hızı 4’ü aşar; göreli hızpozitife geçebilir.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-14",
        prompt: {
          tr: "Sabit duran iki gözlemcinin eksen yönleri aynı; B’nin konum başlangıcı A’ya göre+x yönünde 10 m ileride. Bir cisim A’da 25 m’den 40 m’ye 3 s’de gidiyor. B’nin ilk/son konumları ve bu aralığın ortalama hızı nedir?",
        },
        options: [
          {
            tr: "15 m,30 m; 0 m/s",
          },
          {
            tr: "35 m,50 m;+5 m/s",
          },
          {
            tr: "25 m,40 m;+5 m/s",
          },
          {
            tr: "15 m,30 m;+5 m/s",
          },
          {
            tr: "15 m,30 m;+15 m/s",
          },
        ],
        answer: 3,
        hint: {
          tr: "B’de ilk konum 25−10=15 m, son konum 40−10=30 m.",
        },
        explanation: {
          tr: "B’de ilk konum 25−10=15 m, son konum 40−10=30 m. Yer değiştirme 30−15=15 m; A’da da 40−25=15 m’dir. Ortalama hız 15/3=+5 m/s; yalnız sabit başlangıç noktası kayması hızı değiştirmez.",
        },
        skill: "physics026-dogrusal-hareket-14",
        guidance: {
          knowledge: [
            "Sabit başlangıç kaymasında xB=xA−10; sabit fark yer değiştirmede gider.",
          ],
          strategy:
            "İki konumdan aynı 10 m’yi çıkar; aralarındaki farkı süreye böl.",
          steps: [
            "B’de ilk konum 25−10=15 m, son konum 40−10=30 m.",
            "Yer değiştirme 30−15=15 m; A’da da 40−25=15 m’dir.",
            "Ortalama hız 15/3=+5 m/s; yalnız sabit başlangıç noktası kayması hızı değiştirmez.",
          ],
          optionReasons: [
            "İki gözlemcinin durgun olması cismi durgun yapmaz.",
            "Hız değişmez amaBbaşlangıcı ilerideyse konumlardan 10 çıkarılmalıdır.",
            "A’nın konumlarıB’ye dönüştürülmeden verilmiştir.",
            "Doğru. Aynı 10 m sabit kayma iki konuma uygulanır; fark değişmez.",
            "Yer değiştirme 15 m, süre 3 s’ye bölünmeden hız sayılmıştır.",
          ],
          commonError:
            "Başlangıç noktasını kaydırmayı gözlemci hızını değiştirmekle aynı işlem saymak.",
          check: "İki çerçevede deΔx=15 mveΔt=3 s.’dir.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-15",
        prompt: {
          tr: "A veB için aynı saatle xA=−6+4 t, xB=12−2 t metre bağıntıları 0–5 s boyunca verilmiş. Karşılaşma zamanı ve konumu hangisidir?",
        },
        options: [
          {
            tr: "9 s; 30 m",
          },
          {
            tr: "0 s;−6 m",
          },
          {
            tr: "2 s; 2 m",
          },
          {
            tr: "3 s; 12 m",
          },
          {
            tr: "3 s; 6 m",
          },
        ],
        answer: 4,
        hint: {
          tr: "−6+4 t=12−2 t; 6 t=18.",
        },
        explanation: {
          tr: "−6+4 t=12−2 t; 6 t=18. t=3 s verilen 0–5 aralığındadır. xA=−6+12=6 m; xB=12−6=6 m.",
        },
        skill: "physics026-dogrusal-hareket-15",
        guidance: {
          knowledge: [
            "Karşılaşma aynı global zamanda konumların eşitlenmesidir; bulunan zaman iki modelin aralığında olmalıdır.",
          ],
          strategy: "İki konumu eşitle, sonra zamanı iki bağıntıda da denetle.",
          steps: [
            "−6+4 t=12−2 t; 6 t=18.",
            "t=3 s verilen 0–5 aralığındadır.",
            "xA=−6+12=6 m; xB=12−6=6 m.",
          ],
          optionReasons: [
            "Bağıl hız 4−2 yanlış kurulmuş; karşı yönlerde kapanma hızı 6 m/s ve 9 s veri aralığı dışındadır.",
            "Başlangıçta konumlar−6 ve 12 m; aynı yerde değillerdir.",
            "A’nın 2 s’deki konumu 2 mikenB’nin 8 m’dir; eşitlik sağlanmaz.",
            "Zaman doğru, başlangıç konumlarından biri karşılaşma konumu sanılmıştır.",
            "Doğru. Aynı anda iki konum da 6 m’dir.",
          ],
          commonError:
            "Karşılaşmada zamanları ayrı almak veya iki konum yerine yalnız hız eşitliği aramak.",
          check: "Başlangıç aralık 18 m; kapanma sürati 4+2=6 m/s; 18/6=3 s.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-16",
        prompt: {
          tr: "Bir cismin 0–4 s hız grafiği,+3 m/s’den 0 m/s’ye inen doğru parçası.4 s’den sonraki hareket verilmemiş. Bu aralık ve tam 4 s için hangi ifade doğrudur?",
        },
        options: [
          {
            tr: "Yol 6 m,Δx=+6 m; 4 s’den sonraki yön belirsiz.",
          },
          {
            tr: "Yol 12 m; dikdörtgen alanı kullanılır.",
          },
          {
            tr: "4 s’de ivme 0 olduğu kesin",
          },
          {
            tr: "Yol 0; çünkü son hız 0",
          },
          {
            tr: "Yol 6 m,Δx=−6 m; sonra kesin+x",
          },
        ],
        answer: 0,
        hint: {
          tr: "0–4 s alanı½·4·3=6 m; grafik negatif alana geçmez.",
        },
        explanation: {
          tr: "0–4 s alanı½·4·3=6 m; grafik negatif alana geçmez. Bu aralıkta yol 6 m, yer değiştirme+6 m. t=4 s’de hız 0; sonrasında mutlaka geri gideceği verilmiş değildir.",
        },
        skill: "physics026-dogrusal-hareket-16",
        guidance: {
          knowledge: [
            "Hız aralık boyunca negatif değilse yol işaretli alanla eşittir; sondaki sıfırdan gelecekteki yön çıkmaz.",
          ],
          strategy: "Üçgen alanını hesapla; verilmeyen sonraki programı ayır.",
          steps: [
            "0–4 s alanı½·4·3=6 m; grafik negatif alana geçmez.",
            "Bu aralıkta yol 6 m, yer değiştirme+6 m.",
            "t=4 s’de hız 0; sonrasında mutlaka geri gideceği verilmiş değildir.",
          ],
          optionReasons: [
            "Doğru. Aralıkta tek yön vardır; gelecek evre verilmemiştir.",
            "Hız sabit 3 değil,3’ten 0’a doğrusal iner; alan üçgendir.",
            "Son hızın 0 olması o anda ivmenin 0 olduğunu göstermez; ayrıca sonraki program yoktur.",
            "Bir son anın hızı arada alınan yolu silmez.",
            "Grafik tüm aralıkta pozitif olduğu içinΔxpozitiftir; gelecek yön de verilmemiştir.",
          ],
          commonError:
            "Uçtaki sıfır hızı bütün aralığın veya sonraki evrenin yerine koymak.",
          check: "Ortalama hız(3+0)/2=1,5 m/s; 4 s’de 6 m verir.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-17",
        prompt: {
          tr: "Bir cismin 0≤t<2 s için ivmesi+1 m/s²; 2≤t<5 s için ivmesi−2 m/s² verilmiş. Model iç sınırda sağ evrenin değerini kullanıyor; 5 s’den sonrası belirtilmemiş. t=2 s ve tam 5 s için ivme raporu hangisi olmalıdır?",
        },
        options: [
          {
            tr: "2 s’de 0; 5 s’de 0",
          },
          {
            tr: "2 s’de−2 m/s²; 5 s’de belirtilmemiş.",
          },
          {
            tr: "2 s’de+1; 5 s’de−2",
          },
          {
            tr: "2 s’debelirsiz; 5 s’de+1",
          },
          {
            tr: "2 s’de−0,5; 5 s’de−2",
          },
        ],
        answer: 1,
        hint: {
          tr: "2 s, ikinci aralığın dahil başlangıcıdır; rapor−2 m/s² olur.",
        },
        explanation: {
          tr: "2 s, ikinci aralığın dahil başlangıcıdır; rapor−2 m/s² olur. 5 s, ikinci aralığın dışarıda bırakılmış sonudur. Sonraki evre verilmediğinden tam 5 s için ileri ivme bu modelde belirtilmez; sol limitin−2 olması yeni tanım eklemez.",
        },
        skill: "physics026-dogrusal-hareket-17",
        guidance: {
          knowledge: [
            "Parçalı programda sınır seçimi tanımla belirlenir; sonraki evre yoksa son andaki ileri ivme uydurulmaz.",
          ],
          strategy:
            "2 s’nin hangi yarı açık aralığa dahil olduğunu bul; 5 s’nin hiçbir verilen aralıkta olmadığını denetle.",
          steps: [
            "2 s, ikinci aralığın dahil başlangıcıdır; rapor−2 m/s² olur.",
            "5 s, ikinci aralığın dışarıda bırakılmış sonudur.",
            "Sonraki evre verilmediğinden tam 5 s için ileri ivme bu modelde belirtilmez; sol limitin−2 olması yeni tanım eklemez.",
          ],
          optionReasons: [
            "Evre sınırı ivmelerin ortalaması veya zorunlu 0 noktası değildir.",
            "Doğru. Sağ evre kuralı 2 s’yi seçer; 5 s sonrasında tanımlı evre yoktur.",
            "İlk değer sol evreden seçilmiş; son değer de açık sınırın dışına taşınmıştır.",
            "2 s için açık sağ evre kuralı vardır; 5 s için ilk evreye dönüş verilmemiştir.",
            "İvme değerleri sınırda aritmetik ortalama alınarak tanımlanmamıştır.",
          ],
          commonError:
            "Sınır anında komşu değerleri ortalamak veya bilinmeyen sonraki evreyi varsaymak.",
          check:
            "İşaretli a–talanı hesaplanırken tek sınır noktasının seçimi sonlu alanı değiştirmez.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-18",
        prompt: {
          tr: "Bir hareket kaydında başlangıç konumu 7 m, hızı+3 m/s ve tüm evre süreleri 0 s. Başka hareket aralığı yok. Bu sıfır toplam süre için hangi rapor doğrudur?",
        },
        options: [
          {
            tr: "Konum 7 m, hız+3 m/s; iki aralık ortalaması tanımsız.",
          },
          {
            tr: "İki ortalama da 0 m/s",
          },
          {
            tr: "Bütün hızlar 0 olmalıdır.",
          },
          {
            tr: "Ortalama hız sonsuzdur.",
          },
          {
            tr: "Son konum 0 m; son hız 7 m/s",
          },
        ],
        answer: 0,
        hint: {
          tr: "Hiç süre geçmediği için konum 7 m ve hız+3 m/sanlık başlangıç bilgisi olarak kalır.",
        },
        explanation: {
          tr: "Hiç süre geçmediği için konum 7 m ve hız+3 m/sanlık başlangıç bilgisi olarak kalır. Toplam yer değiştirme ve yol 0’dır. Ortalama hız 0/0 veortalama sürat 0/0 olduğundan tanımsızdır; 0 diye raporlanmaz.",
        },
        skill: "physics026-dogrusal-hareket-18",
        guidance: {
          knowledge: [
            "Aralık ortalamaları pozitif zaman farkı gerektirir; 0/0 oranına 0 atanmaz.",
          ],
          strategy:
            "Anlık başlangıç bilgisini, hiç süre geçmemiş aralığın ortalamasından ayır.",
          steps: [
            "Hiç süre geçmediği için konum 7 m ve hız+3 m/sanlık başlangıç bilgisi olarak kalır.",
            "Toplam yer değiştirme ve yol 0’dır.",
            "Ortalama hız 0/0 veortalama sürat 0/0 olduğundan tanımsızdır; 0 diye raporlanmaz.",
          ],
          optionReasons: [
            "Doğru. Anlık veri korunur; pozitif süre olmayan aralıkta ortalama kurulmaz.",
            "0/0 tanımsızdır; payın 0 olması bu oranı 0 yapmaz.",
            "Sıfır süre verilmesi başlangıç hızının 3 m/sbilgisini değiştirmez.",
            "Bu durumda sıfır payın sıfır paydaya oranı vardır; sonlu olmayan tek bir değer çıkarılamaz.",
            "Konum ve hız değerleri yanlış niceliklere aktarılmıştır.",
          ],
          commonError:
            "Sıfır zaman aralığında sırf yol 0 diye ortalama sürati 0 saymak.",
          check:
            "Kayıtta 3 m/sbir anlık hızdır; bir süre boyunca alınmış ortalama değildir.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-19",
        prompt: {
          tr: "Doğrusal harekette hız 54 km/h’den 90 km/h’ye 5 s’de düzgün artıyor. Ortalama ivme kaç m/s²?1 m/s=3,6 km/h.",
        },
        options: [
          {
            tr: "2",
          },
          {
            tr: "10",
          },
          {
            tr: "7,2",
          },
          {
            tr: "0,5",
          },
          {
            tr: "5",
          },
        ],
        answer: 0,
        hint: {
          tr: "54/3,6=15 m/s; 90/3,6=25 m/s.",
        },
        explanation: {
          tr: "54/3,6=15 m/s; 90/3,6=25 m/s. Hız farkı+10 m/s. a=10/5=+2 m/s².",
        },
        skill: "physics026-dogrusal-hareket-19",
        guidance: {
          knowledge: [
            "İvmede hız farkı aynı birime çevrildikten sonra geçen saniyeye bölünür.",
          ],
          strategy: "İki hızı m/s’ye çevirip farkını 5 s’ye böl.",
          steps: [
            "54/3,6=15 m/s; 90/3,6=25 m/s.",
            "Hız farkı+10 m/s.",
            "a=10/5=+2 m/s².",
          ],
          optionReasons: [
            "Doğru. SIhız farkı 10 m/s, süre 5 s’dir.",
            "Bu hız farkıdır; geçen 5 s’ye bölünmelidir.",
            "36 km/hfarkı doğrudan 5 s’ye bölünmüştür; çıkan birim m/s² değildir.",
            "Hız farkı/süre yerine süre/hız farkı ters oranı alınmıştır.",
            "Bu 25/5 son hız/süre hesabıdır; ilk 15 m/sçıkarılmamıştır.",
          ],
          commonError:
            "Son hızı ilk hız değişimi sanmak veya km/hile saniyeyi uyumsuz kullanmak.",
          check: "2 m/s²·5 s=10 m/s hız artışı; 15+10=25 m/s.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-20",
        prompt: {
          tr: "Bir hareketlinin sürati dairesel yol boyunca sabit; hız yönü sürekli değişiyor. Bu bilgi doğrusal hareket için kullanılan “sabit hızda ivme 0” cümlesine nasıl uygulanmalıdır?",
        },
        options: [
          {
            tr: "Sabit sürat, yolun 0 olduğu anlamına gelir.",
          },
          {
            tr: "Sürat sabitse bütün hareketlerde ivme 0’dır.",
          },
          {
            tr: "Sabit sürat, hız yönü değiştiğinde sıfır ivme gerektirmez.",
          },
          {
            tr: "İvme yalnız negatif sayıyla gösterilebilir.",
          },
          {
            tr: "Dairesel yolun konumu sabittir.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Dairesel yolda yön değiştiği için vektörel hız sabit değildir.",
        },
        explanation: {
          tr: "Dairesel yolda yön değiştiği için vektörel hız sabit değildir. İvme hız vektöründeki değişimle ilişkilidir; yalnız büyüklük değişimine indirgenmez. Bu örnek doğrusal sabit hız koşulunu sağlamaz; sabit sürat tek başına ivme 0 sonucu vermez.",
        },
        skill: "physics026-dogrusal-hareket-20",
        guidance: {
          knowledge: [
            "Vektörel hız büyüklük ve yön taşır; yön değişimi sürat sabitken de ivme oluşturabilir.",
          ],
          strategy:
            "Sabit sürat ile sabit vektörel hızı ayır; doğrusal varsayımın burada bulunmadığını kontrol et.",
          steps: [
            "Dairesel yolda yön değiştiği için vektörel hız sabit değildir.",
            "İvme hız vektöründeki değişimle ilişkilidir; yalnız büyüklük değişimine indirgenmez.",
            "Bu örnek doğrusal sabit hız koşulunu sağlamaz; sabit sürat tek başına ivme 0 sonucu vermez.",
          ],
          optionReasons: [
            "Pozitif sabit süratle zaman geçtikçe pozitif yol alınabilir.",
            "Yön değişimi de hız değişimidir; bu genelleme eksiktir.",
            "Doğru. Verilen örnekte vektörel hız değişmektedir.",
            "İvme yönlüdür; işareti seçilen eksene bağlıdır; böyle bir kural yoktur.",
            "Yol boyunca hareket ettiği ve hız yönünün değiştiği verilmiştir.",
          ],
          commonError: "Sürat büyüklüğünü vektörel hızın tümü yerine koymak.",
          check:
            "Bu yüzden rehberin a=0 sabit hız bağıntısı doğrusal ve değişmeyen yön koşuluyla kullanılır.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-21",
        prompt: {
          tr: "Cisim x₀=−5 m’den sabitv=+3 m/s ile hareket ediyor. Program 0–3 s için verilmiş. Başlangıç noktasından(x=0)geçiş zamanı ve bu geçişteki hareket yönü nedir?",
        },
        options: [
          {
            tr: "3/5 s;+x yönünde",
          },
          {
            tr: "5/3 s;+x yönünde",
          },
          {
            tr: "Hiç geçmez; negatif konumda kalır",
          },
          {
            tr: "0 s; çünkü konum başlangıcı 0’dır",
          },
          {
            tr: "5/3 s;−x yönünde",
          },
        ],
        answer: 1,
        hint: {
          tr: "−5+3 t=0 için t=5/3 s.",
        },
        explanation: {
          tr: "−5+3 t=0 için t=5/3 s. 5/3,0–3 saralığındadır. Hız daima+3 m/s olduğu için geçiş+x yönündedir; konum eksenini kesmek yön değiştirmek değildir.",
        },
        skill: "physics026-dogrusal-hareket-21",
        guidance: {
          knowledge: [
            "Negatif ilk konum, negatif hız demek değildir; başlangıç noktasından geçiş x(t)=0 ile bulunur.",
          ],
          strategy:
            "x=−5+3 tdenklemini 0’a eşitle; program aralığı ve hız işaretini denetle.",
          steps: [
            "−5+3 t=0 için t=5/3 s.",
            "5/3,0–3 saralığındadır.",
            "Hız daima+3 m/s olduğu için geçiş+x yönündedir; konum eksenini kesmek yön değiştirmek değildir.",
          ],
          optionReasons: [
            "Zaman=mesafe/sürat oranı ters alınmıştır.",
            "Doğru. Konum 0 olurken hız hâlâ+3 m/s.’dir.",
            "Pozitif hızla ilerleyen cisim 5/3 s’de 0’ı aşar.",
            "Cismin ilk konumu−5 m olarak verilmiştir; eksen başlangıcı ile cisim aynı yerde değildir.",
            "Zaman doğru, ilk konumun negatifliği hareket yönüne taşınmıştır.",
          ],
          commonError:
            "Konum grafiğinin 0 geçişini hızın 0 veya yön değişimi saymak.",
          check: "x(5/3)=−5+5=0; öncesi negatif, sonrası pozitif konumdur.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-22",
        prompt: {
          tr: "Aynı cisim için aynı saat ve aynı eksen yönüyle iki gözlem kaydı x₁=−3+2 t, x₂=7+2 t metre biçiminde. İki gözlemci de birbirine göre durgun. Bu iki kayıt hangi farkla uyumludur?",
        },
        options: [
          {
            tr: "İkinci cisim 10 m/sdaha hızlı görünür.",
          },
          {
            tr: "İki kayıt aynı olamaz; ilk konumlar farklıdır.",
          },
          {
            tr: "İkinci gözlemciye göre ivme 10 m/s² artar.",
          },
          {
            tr: "İkinci kayıtta sürat−2 m/s’dir.",
          },
          {
            tr: "Sabit 10 mkonum kayması; hızlar aynı+2 m/s",
          },
        ],
        answer: 4,
        hint: {
          tr: "x₂−x₁=10 m ve zamandan bağımsızdır.",
        },
        explanation: {
          tr: "x₂−x₁=10 m ve zamandan bağımsızdır. İki eğim de+2 m/s; ivmeler 0’dır. Kayıtlar 10 m’lik konum başlangıcı farkıyla uyumludur; hareketli gözlemci hızı farkı gerektirmez.",
        },
        skill: "physics026-dogrusal-hareket-22",
        guidance: {
          knowledge: [
            "Durgun gözlemcilerde yalnız konum başlangıcının sabit kayması bütün konumlara aynı farkı ekler; hız ve ivme değişmez.",
          ],
          strategy: "İki konumun farkını ve eğimlerini karşılaştır.",
          steps: [
            "x₂−x₁=10 m ve zamandan bağımsızdır.",
            "İki eğim de+2 m/s; ivmeler 0’dır.",
            "Kayıtlar 10 m’lik konum başlangıcı farkıyla uyumludur; hareketli gözlemci hızı farkı gerektirmez.",
          ],
          optionReasons: [
            "10 mfarkın birimi hız değildir; fark zamana bağlı değişmiyor.",
            "Farklı konum başlangıçları aynı hareketi farklı sabitlerle gösterebilir.",
            "İki kayıt da doğrusal ve eşit eğimlidir; ivme farkı yoktur.",
            "Eğim+2’dir; sürat daima büyüklük olarak pozitiftir.",
            "Doğru. Konum farkı sabit, eğim farkı 0’dır.",
          ],
          commonError: "Konum kesim farkını hız veya ivme farkı sanmak.",
          check: "Her t’den t+1’e konum artışı iki kayıtta da 2 m’dir.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-23",
        prompt: {
          tr: "Darbeli çarpışma içermeyen parçalı modelde ilk evre v₀=+2 m/s, a=+1 m/s² ile 3 s sürüyor. İkinci evre aynı cismi kesintisiz izliyor. İkinci evreye hangi başlangıç hızının aktarılması gerekir?",
        },
        options: [
          {
            tr: "+5 m/s",
          },
          {
            tr: "+3 m/s",
          },
          {
            tr: "0 m/s",
          },
          {
            tr: "−5 m/s",
          },
          {
            tr: "+2 m/s",
          },
        ],
        answer: 0,
        hint: {
          tr: "İlkΔv=1·3=+3 m/s.",
        },
        explanation: {
          tr: "İlkΔv=1·3=+3 m/s. İlk evre son hızı 2+3=+5 m/s. Anlık hız sıçraması verilmediğinden ikinci evre ilk hızı da+5 m/s olmalıdır.",
        },
        skill: "physics026-dogrusal-hareket-23",
        guidance: {
          knowledge: [
            "Sonlu ivmeli, darbesiz evre sınırında hız süreklidir; önceki son hız yeni ilk hızdır.",
          ],
          strategy:
            "İlk evrenin hız değişimini hesaplayıp başlangıç hızına ekle.",
          steps: [
            "İlkΔv=1·3=+3 m/s.",
            "İlk evre son hızı 2+3=+5 m/s.",
            "Anlık hız sıçraması verilmediğinden ikinci evre ilk hızı da+5 m/s olmalıdır.",
          ],
          optionReasons: [
            "Doğru. Önceki evrenin son hızı yeni evrenin ilk koşuludur.",
            "Bu hız değişimidir; ilk 2 m/seklenmemiştir.",
            "Evre sınırı cismin zorunlu durduğu bir yer değildir.",
            "Bir evre bitti diye hız yönü kendiliğinden tersine dönmez.",
            "Her evrede global başlangıç hızı yeniden kullanılmıştır; ilk evrenin ivmesi kaybolur.",
          ],
          commonError:
            "Parçalı modelde saati yenilerken fiziksel hızı da sıfırlamak.",
          check:
            "İkinci evrede yerel süre 0 olduğunda hız, global 3 s’deki+5 m/s ile eşleşir.",
        },
      },
      {
        id: "f026p-dogrusal-hareket-24",
        prompt: {
          tr: "İki ayrı doğrusal yolculuk için pozitif süre boyunca ortalamalar raporlanıyor. K’da ortalama hız−2 m/s, ortalama sürat 3 m/s; L’de ortalama hız+2 m/s, ortalama sürat 1 m/s. Yalnız yol ve yer değiştirme tanımlarına göre hangisi mümkündür?",
        },
        options: [
          {
            tr: "İkisi de tutarsızdır.",
          },
          {
            tr: "K’da sürat−3 olarak yazılmalıdır.",
          },
          {
            tr: "İkisi de mümkündür.",
          },
          {
            tr: "K mümkün olabilir; L tutarsızdır.",
          },
          {
            tr: "YalnızL mümkündür; negatif hız olmaz.",
          },
        ],
        answer: 3,
        hint: {
          tr: "K’da 3≥|−2|=2; zorunlu sınırla çelişmez.",
        },
        explanation: {
          tr: "K’da 3≥|−2|=2; zorunlu sınırla çelişmez. L’de 1<|+2|=2; sınır ihlal edilir. Dolayısıyla yalnız Kkaydı bu tanımlarla mümkün olabilir; Lverileri birlikte tutarsızdır.",
        },
        skill: "physics026-dogrusal-hareket-24",
        guidance: {
          knowledge: [
            "Her aralıkta yol≥|yer değiştirme|olduğundan ortalama sürat≥|ortalama hız|olmalıdır.",
          ],
          strategy:
            "İki kayıtta sürati hızın mutlak değeriyle ayrı karşılaştır.",
          steps: [
            "K’da 3≥|−2|=2; zorunlu sınırla çelişmez.",
            "L’de 1<|+2|=2; sınır ihlal edilir.",
            "Dolayısıyla yalnız Kkaydı bu tanımlarla mümkün olabilir; Lverileri birlikte tutarsızdır.",
          ],
          optionReasons: [
            "K’da negatif ortalama hız yasak değildir; sürat 3, mutlak hız 2’den büyüktür.",
            "Sürat büyüklüğü negatife çevrilmez; K’nın 3 m/sdeğeri uygundur.",
            "L’de pozitif sürede gidilen yol, yer değiştirme büyüklüğünden küçük olmak zorunda kalır.",
            "Doğru.3≥2 sağlanır,1≥2 sağlanmaz.",
            "Ortalama hız yönlüdür ve negatif olabilir; sorun L’nin küçük süratidir.",
          ],
          commonError:
            "Hızın işaretini yasaklamak veya sürati yer değiştirme oranından küçük kabul etmek.",
          check:
            "Ortak 5 sörneğindeK içinΔx=−10 m, yol 15 m seçilebilir; L içinΔx 10 m, yol 5 m seçilemez.",
        },
      },
    ],
    source:
      "MEBİ TYT Fizik ile OGM Dersler Cepte kaynakları karşılaştırılarak hazırlanmış özgün derin öğretim. Önkoşullar, ölçüm/model sınırları ve kaynaklardaki aşırı genellemeler bilimsel denetimle ayrılmıştır. Sorular ve çözümlü örnekler özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "enerji-ve-hareket",
    detail: "detail-118",
    title: "Enerji ve hareket: dönüşümü hesapla, sistemi seç",
    minutes: 120,
    objectives: [
      "Seçili kuvvetin işi ile net işi ayır; klasik noktasal cisim için net iş–kinetik enerji teoremini kullan.",
      "Yerçekimi ve yay potansiyelini sistem ve referansla tanımla; mekanik enerji korunumunun koşullarını açıkla.",
      "Sürtünmede enerji yok olmadan iç enerji ve aktarım bilançosunu kur; ulaşılabilir yol ile negatif cebirsel bütçeyi ayır.",
      "Güç, enerji, verim ve enerji taşıyıcısı ayrımlarını birim ve açık yararlı çıktı tanımıyla çöz.",
    ],
    sections: [
      {
        title: "Yorulmak ile fiziksel iş aynı değildir",
        paragraphs: [
          "Fiziksel iş, seçilen kuvvetin uygulama noktasının yer değiştirmesiyle ilişkili enerji aktarımıdır. Sabit kuvvet ve doğrusal yer değiştirme için W=F·Δr=F·Δr·cosθ kullanılır. θkuvvetle yer değiştirme arasındaki açıdır; aynı yönde pozitif, zıt yönde negatif, dik durumda 0 iş oluşur. Kuvvet uygulamak veya yorulmak tek başına bu kuvvetin mekanik iş yaptığını göstermez.",
          "Hangi kuvvetin işinin sorulduğunu yaz. Aynı cisimde çekme kuvveti pozitif, ağırlık negatif, normal 0 iş yapabilir; net iş bütün seçili kuvvet işlerinin işaretli toplamıdır. Bir kuvvetin yönü veya uygulama noktası değişiyorsa sabit F·Δr ifadesinin koşulları yeniden denetlenir. Birim N·m=J; iş bir skaler niceliktir, pozitif veya negatif olması vektör olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Net iş kinetik enerjiyi değiştirir",
        paragraphs: [
          "Klasik, noktasal veya yalnız ötelemesi izlenen cisimde K=½mv². Sabit kütlede net kuvvetin yaptığı iş Wnet=Kson−Kilk=ΔK olarak ifade edilir. Burada v sürat büyüklüğüdür; kinetik enerji bu klasik modelde negatif olmaz. Hızın yönü tersine dönerken aynı sürate dönülürse K aynı olabilir; bu, bütün arada kuvvetlerin iş yapmadığı anlamına gelmez.",
          "Seçilen bir çekme kuvvetinin işi, başka kuvvetler de iş yapıyorsa tek başınaΔK’ye eşit değildir. Net işin pozitifliği K’nin arttığını, negatifliği azaldığını söyler. Kütlesi sabit cismin süratinin karesi önemlidir; hızın işareti K’ye eksi işareti taşımaz. İş–kinetik enerji teoremini cismin bütün iç, kimyasal veya ısıl enerjisinin değişimi için koşulsuzWnet=ΔEtoplam biçimine genişletme.",
        ],
      },
      {
        title: "Potansiyel enerji referans ve sistemle tanımlanır",
        paragraphs: [
          "Yerçekimi potansiyel enerjisi, cisim–Dünya etkileşim sistemi ve seçilen sıfır düzeyiyle tanımlanır. Yaklaşık düzgün yerel g için U=mgh+C yazılır; fiziksel değişimdeΔU=mgΔh kullanılır. Yükseklik, uzamış homojen cisimde uygun kütle merkezinin yüksekliğidir. Sıfır düzeyini değiştirmek bütün U değerlerine sabit ekler; aynı başlangıç ve son arasındakiΔU’yu değiştirmez.",
          "İdeal Hooke yayının doğal boydan işaretli sapması x için Uyay=½kx². Sıkıştırma ve uzatma aynı|x|ile aynı enerji depolayabilir; geri çağırıcı kuvvet Fyay=−kx olduğundan yönleri farklıdır. Bu ifade verilen aralıkta esneklik sınırı aşılmayan ideal yay içindir. Yay sabiti k sertliği anlatır; malzemenin ne kadar uzamaya kadar kalıcı bozulmadan dayanacağını tek başına belirlemez.",
        ],
      },
      {
        title: "Mekanik enerji ne zaman korunur?",
        paragraphs: [
          "Mekanik enerji, izlenen kinetik ve potansiyel enerji terimlerinin toplamıdır: Emek=K+Uyer+Uyay gibi. Seçilmiş sistemde yalnız modele alınan korunumlu etkileşimler enerji değiştiriyorsa ve dışarıdan net mekanik enerji aktarımı yoksa bu toplam korunur. Yerçekimi işini−ΔU ile ifade etmek, aynı etkiyi net iş tarafında ikinci kez eklememeyi gerektirir.",
          "Sürtünmenin ihmal edilmesi tek başına her olayda Emek sabit demek değildir; bir motor veya dış kuvvet sisteme iş yapabilir. Mekanik enerji azalırken iç enerji artabilir, ses veya başka aktarım oluşabilir. Bütün enerjinin korunumu daha geniş bir bilanço ilkesidir; seçilmiş açık sistemin enerjisi giriş ve çıkışlarla değişebilir. Hangi sınır içinde hangi enerji türlerinin sayıldığı açıklanırsa görünür “kayıp” doğru yere yerleştirilir.",
        ],
      },
      {
        title: "Isıl aktarım olunca enerji yok olmaz",
        paragraphs: [
          "Durgun zemin üzerinde kayan bir cisme kinetik sürtünme hareketine zıt yönde etki ediyorsa cismin ötelemesi için Wsür=−f·s olur. Cisim ve zemin birlikte izlenip başka aktarım dışlanırsa bu mekanik azalma iç enerji artışına bağlanabilir. Isı, enerjinin sıcaklık farkıyla aktarılması için kullanılan kavramdır; cismin içinde depolanan madde benzeri bir “ısı miktarı” olarak düşünülmez.",
          "Sürtünmenin her durumda her cisme negatif iş yaptığı söylenemez. Hareketli bant üstündeki daha yavaş cisim, banttan ileri sürtünme kuvvetiyle enerji kazanabilir; motorun sağladığı enerji ve kayma ısınması birlikte sayılır. Enerji yok olmaz; yararlı kabul edilen mekanik kısımdan başka biçime geçebilir. “Kayıp enerji” ifadesinde kaybın hangi yararlı amaç bakımından söylendiğini belirt.",
        ],
      },
      {
        title: "Güç hızla, verim payla ilgilidir",
        paragraphs: [
          "Ortalama güç belirli aralıkta yapılan işin veya aktarılan enerjinin süreye oranıdır: Port=W/Δt. Birimi watt=W=J/s. Aynı işi daha kısa sürede yapan sistemin ortalama gücü daha büyüktür; bu, bütün süre boyunca anlık gücün aynı olduğunu söylemez. Anlık mekanik güç seçilen kuvvet için P=F·v olabilir; kuvvetle hızın yönü de işarete etki eder.",
          "Verim, açıkça tanımlanmış yararlı çıktı enerjisinin aynı aralıktaki toplam giriş enerjisine oranıdır. Tutarlı tam enerji hesabında 0≤η≤1; ideal modelde 1 olabilir, gerçek aygıtta amacı karşılamayan başka enerji aktarımı genellikle vardır. Yararlı çıktı tanımı değişirse verim de değişebilir. Giriş enerji 0 ise çıktı/giriş oranı ölçülemez; ısı pompasının taşınan ısı/giriş işi olan COP oranı ise aynı verim tanımı değildir.",
        ],
      },
      {
        title: "Sistem sınırını çiz",
        paragraphs: [
          "Yalnız bloğu sistem seçersen yerçekimi ve yay kuvveti dış kuvvet olarak net iş hesabına girebilir. Blok+Dünya veya blok+yay etkileşimini sistemin potansiyel enerjisine alırsan ilgili aktarımı U değişimiyle izlersin. İki yöntem aynı fiziksel olayı açıklayabilir; ancak aynı yerçekimi işini hem Wnet’e ekleyip hem aynı taraftaΔU diye ikinci kez sayamazsın.",
          "Önce hangi kuvvetlerin sistem dışından enerji aktardığını, hangilerinin potansiyelde temsil edildiğini ve iç enerji değişimi olup olmadığını listele. Bir motorun besleme kaynağı sistem dışında kalırsa yaptığı iş giriş terimidir. Sistem genişletilip pil veya yakıt da içerilirse onun enerji azalması sayılabilir. “Toplam enerji korunur” cümlesi, seçilmiş açık sistemin hiçbir enerji alışverişi yapmadığı iddiasına dönüştürülmez.",
        ],
      },
      {
        title: "Kuvvet–konum grafiğinde iş",
        paragraphs: [
          "Bir doğru boyunca değişen kuvvet için F‖–xgrafiğinin işaretli alanı o kuvvetin işini verir. Alan kuvvet×uzunluk birimindedir. Pozitif bölgeler enerji aktarımını, negatif bölgeler ters yöndeki aktarımı temsil eder. Kuvvet grafikte yalnız bir seçilmiş kuvvetse bu alan doğrudan net iş olmayabilir; diğer kuvvetlerin işleri de ayrıca gerekir.",
          "Kuvvet 0’danFmax’a doğrusal artıyorsa 0–Laralığındaki iş½FmaxL olur; son kuvveti bütün yol boyunca sabitmiş gibi FmaxL almak iki kat verir. Aynı iş, daha küçük kuvvetin daha uzun yoluyla da yapılabilir. Grafik ekseni zaman ise altındaki alanın birimi N·s olur; bu iş değildir. Önce eksen adlarını ve sorulan niceliği kontrol et.",
        ],
      },
      {
        title: "Kinetik enerjide yön ve durma",
        paragraphs: [
          "K=½mv² süratin karesiyle değişir. +v ve−v aynı K’yi verir; v yönlü, kinetik enerji skaler ve bu modelde negatif değildir. Net iş−Kilk olduğunda son K 0 olur; bundan daha negatif bir cebirsel değer ileri izlenen yolun aynı biçimde tamamlanamayacağını gösterebilir. Fiziksel son duruma negatif kinetik enerji atama.",
          "Bir yolda enerji bütçesi ilk kez 0’a indiğinde ileri hareketin son erişim noktasını bul. Ondan sonra hangi kuvvetlerin devam ettiği, geri kayma veya statik sürtünme gibi bilgiler yeni hareket için gerekir. Bir denklemde verilen son yol uzunluğunu körce kullanıp negatif karekök almak, ulaşılabilirlik denetimini atlamaktır. Laboratuvar bu noktada ileri yolu keser; eksik bütçeyi 0’a yapıştırıp hedefe varılmış gibi göstermez.",
        ],
      },
      {
        title: "Potansiyel enerji sıfırını değiştir",
        paragraphs: [
          "U=mgh tanımında h seçili referansa göre işaretlidir. Bir nokta referansın altındaysa U negatif olabilir; bu fiziksel enerji korunumu ihlali değildir. Aynı iki nokta için Uson−Uilk=mg(hson−hilk) sabiti götürür. Cismin hangi sürate ulaşacağı gibi hareket sonuçları, aynı sistemin bütün terimlerinde tutarlı kullanılan referans değişiminden etkilenmez.",
          "İki farklı cisim veya aynı cismin iki anı karşılaştırılırken farklı sıfır düzeylerinden alınmış U sayılarını doğrudan çıkarma. Referansı birleştir veya yalnız yükseklik farkını kullan. Potansiyel enerji yalnız cismin “kendi içinde” bir etiket değildir; etkileşim düzenine aittir. Referans keyfîliği, yükseklik farkının etkisini veya enerjinin ölçülebilir değişimini keyfî yapmaz.",
        ],
      },
      {
        title: "Yayın kuvveti ile enerjisi",
        paragraphs: [
          "Hooke aralığında yay kuvveti Fyay=−kx; enerji U=½kx². x iki katına çıkarsa kuvvet büyüklüğü 2, enerji 4 kat olur. x işareti terslenince kuvvet yönü terslenir fakat enerji aynı kalır. Kuvvet birimi N, enerji J; k birimi N/m’dir. Aynı sembolle verilen doğrusal katsayıyı kuvvetin kendisi veya enerjiyle karıştırma.",
          "Yayı doğal boydan uzatmak veya sıkıştırmak dış enerji aktarımı gerektirebilir. Yayın cisme yaptığı iş Wyay=Uilk−Uson; çok yavaş değişimde dış kuvvet işi Uson−Uilk olur. Başlangıç sapması 0 değilse doğrudan½kxson² yazıp bütün dış iş saymak başlangıçtaki depoyu atlar. Esneklik sınırı veya doğrusal davranış aralığı verilmemiş bir gerçek malzemeyi sonsuz Hooke yayı kabul etme.",
        ],
      },
      {
        title: "Net yay işi ve pozitif giriş",
        paragraphs: [
          "Yay bir negatif sapmadan doğal boya gelip sonra pozitif sapmaya götürülürse ilk bölümde depolanan enerji geri verilebilir, ikinci bölümde tekrar enerji depolanır. Net dış iş toplamΔU’dur; yalnız pozitif enerji sağlanan kısmın toplamı bundan farklı olabilir. Bir bölümde geri alınan enerji ayrıca sayılınca bu iki raporun farklı olması anlaşılır.",
          "Çok yavaş hareket koşulunda kinetik enerji değişimi ihmal edilir; bu yüzden dış iş yalnız yay potansiyeli değişimiyle eşleştirilebilir. Aynı konumlar arasında hızlı bir çekişte cismin kinetik enerjisi de değişebilir. “Yayı çekmek için harcanan enerji” sorusunda net iş mi, geri kazanım olmadan verilen toplam pozitif enerji mi istendiğini sorunun verisinden belirle. Örneklerde bu ayrım açıkça yazılır.",
        ],
      },
      {
        title: "Eğik yolda kuvvet ve yükseklik",
        paragraphs: [
          "Düz bir rampada yol s ve eğimin sinüsü q verilmişse yükseklik değişimiΔh=q·s olur. Yola paralel sabit itiş F’nin işiFs; durgun yüzeyde kaymaya karşı sabit direnç f’nin işi−fs; yerçekimi işi−mgqs’dir. Normal kuvvet, bu ideal sabit yüzeyde yer değiştirmeye dik olduğundan iş yapmaz. Böylece net iş(F−f−mgq)s olur.",
          "Aynı bilanço Kson+mgΔh+fs=Kilk+Fs biçiminde de yazılabilir. q negatifse aşağı inişteΔU negatif olur; yerçekimi mekanik harekete enerji sağlayabilir. İtişin işi ile net iş aynı sayı olmak zorunda değildir. Sürtünme modelinde f sabit verilmiştir; bu sayıdan ayrıca bir statik tutunma eşiği veya hızla değişen sürtünme yasası çıkarılmaz.",
        ],
      },
      {
        title: "Rampada erişim sınırı",
        paragraphs: [
          "Yol başındaki K₀ve her metre başına net enerji değişimi b=F−f−mgq ise K(s)=K₀+bsolur. b<0 iken K₀/|b| ileri duruş uzaklığıdır. Hedef bunun içindeyse pozitif hızla ulaşılır; tam sınırdaysa hedefe anlık 0 hızla varılır; ötesi aynı ileri kayma programıyla tamamlanamaz. Sınırın kendisi ile sınırın ötesini tek etiketle birleştirme.",
          "Başlangıçta K₀=0 ve b≤0 ise modelde ileri hareket için pozitif başlangıç enerji veya ivme yoktur; pozitif yolu gidilmiş saymazsın. b>0 ise ilk hız 0 olsa da ileri hız kazanabilir. Duruştan sonra geri kayma veya statik sürtünmenin ne yapacağı bu modelde çözülmez. Geçen süre, sabit net kuvvet ve tamamlanan ileri bölüm için 2 s/(vilk+vson)ile bulunabilir; 0 yolda süre 0’dır.",
        ],
      },
      {
        title: "Sürtünme hangi cisme ne iş yapar?",
        paragraphs: [
          "Durgun zeminle ileri kayan blokta sürtünme geriye yönelerek blok üzerinde negatif öteleme işi yapar. Sabit hızla ileri giden bant üstündeki daha yavaş blokta ise bant ileri sürtünme uygulayıp bloğu hızlandırabilir. İş hesabındaki yer değiştirme seçilen cismin kuvvet uygulama noktasına aittir; bandın yer değiştirmesiyle bloğunki aynı olmayabilir.",
          "Motor bandın hızını sabit tutarken sağladığı enerji, bloğun kinetik artışı ve kayma kaynaklı iç enerji artışı arasında paylaşılabilir. Bir cisme pozitif sürtünme işi bulunması, enerji yaratıldığı veya sürtünme ısınmasının bittiği anlamına gelmez. Kayan temasın iki tarafını ve dış motoru bilançoya eklemek işaret sorununu çözer. Bu rehberin rampası özellikle durgun yüzey ve harekete karşı sabit direnç modelidir.",
        ],
      },
      {
        title: "Bilanço tablosunu işaretleriyle oku",
        paragraphs: [
          "Başlangıç kinetik enerji ve dış itiş işi giriş; son kinetik enerji, yükselme potansiyeli ve uygun sistemde iç enerji artışı çıktı gibi gruplanabilir. Aşağı iniliyorsa potansiyel azalışı da harekete sağlanan giriş olarak gruplanır. Aynı eşitlikte bir terimi karşı tarafa taşıma, enerjinin fiziksel olarak yok olması veya iki kez üretilmesi değildir; hesap düzenidir.",
          "İnteraktif diyagramda ortak enerji ölçeğindeki çubuklar ayrı bileşenleri gösterir. Grafikteki renkli alan bir enerji miktarı temsil eder; kuvvetin gerçek uzunluğu veya cismin geometrik hacmi değildir. Sıfır enerji terimi çubuk genişliğini 0 yapabilir; adı ve sayısı HTML’de kalır. Toplam giriş ve toplam izlenen çıktı eşitliği, model varsayımlarındaki korunumu kontrol etmeye yarar.",
        ],
      },
      {
        title: "Verimde yararlı çıktıyı tanımla",
        paragraphs: [
          "Bir motor için yararlı çıktı kaldırılan yükün mekanik enerjisi olabilir; bir elektrikli ısıtıcıda istenen ortamın iç enerji artışı seçilebilir. İstenmeyen sese giden enerji bir amaç için kayıp sayılırken yine fiziksel enerjidir. Verim hesabında aynı aralık ve sistem sınırı içinde yararlı çıktı/toplam giriş oranını kullan; farklı sürelerin güçleri veya yalnız bazı girişleri oranlamak yanlış değer verir.",
          "İki ardışık dönüştürücüde birincinin yararlı çıkışı ikincinin tam girişi ise toplam verimη₁η₂olur. Yüzdeler gelişigüzel toplanmaz. Aynı yararlı işi daha küçük giriş enerjisiyle yapmak enerji verimliliğini artırabilir. Giriş 0 olduğunda 0/0 oranı ölçülmüş verim vermez; modelde seçilenηkatsayısı bir varsayım olarak kalır. İdeal 100%model enerji korunumu ile uyumludur; gerçek cihazın bunu sağladığı ayrıca gösterilmelidir.",
        ],
      },
      {
        title: "Güç ve enerji birimleri",
        paragraphs: [
          "1 W=1 J/s; 1 kW=1000 W. Kilowattsaat, kilowatt ile saatin çarpımıdır: 1 kWh=1000 J/s·3600 s=3,6×10⁶ J. Bu bir enerji birimidir,“saat başına kilowatt” değildir. Güç aynı kalırken çalışma süresi iki kat olursa aktarılan enerji iki kat olabilir; enerji sabitken süre yarıya inerse ortalama güç iki kat olur.",
          "Bir aygıtın etiket gücüyle gerçek ortalama tüketim aynı olmak zorunda değildir; aygıt aralıklı çalışabilir veya yükü değişebilir. Soruda sabit güç verilmişse E=Pttanımı kullanılabilir. Bir enerji faturasında kWh gösterilmesi enerjiyi ölçer; sırf çok watt değeri kısa sürede çalışan cihazın her koşulda daha çok toplam enerji tükettiğini söylemez. Önce güç–süre çarpımlarını karşılaştır.",
        ],
      },
      {
        title: "Anlık güçte kuvvet ve hız",
        paragraphs: [
          "Seçilen kuvvetin anlık mekanik gücü P=F·v; doğrusal aynı yönde Fvsayısına iner. Kuvvet sabit olsa da hız değişiyorsa anlık güç değişebilir. Sabit kuvvetin ortalama gücü F·vortile hesaplanabilir; vortişaretli yer değiştirme/süre oranıdır. Kuvvet de değişiyorsa yalnız ayrı ayrı ortalamaları çarpmak genel bir kural değildir.",
          "Frenleyen bir kuvvet için anlık güç negatif olabilir; bu, izlenen cismin mekanik enerjisinden aktarım yönünü gösterir. Güç birimindeki Wile iş için kullanılan Wsembolünü bağlamdan ayır: birinde watt birim, birinde fiziksel iş niceliği olabilir. Bu rehberin tüketim modeli negatif giriş gücü üretmez; olası geri besleme veya rejenerasyon başka bir model gerektirir.",
        ],
      },
      {
        title: "Birincil kaynak ve enerji taşıyıcısı",
        paragraphs: [
          "Güneş, rüzgâr, akarsu ve benzeri kaynaklar insan zaman ölçeğinde doğal yenilenme süreçleriyle değerlendirilebilir; fosil yakıtlar ve kullanılan nükleer yakıtlar için süre ve stok sınırlamaları farklıdır. Yenilenebilir olmak sürekli aynı güçte üretmek veya sıfır çevresel etki demek değildir. Üretim, depolama, iletim ve yaşam döngüsü birlikte değerlendirilir.",
          "Elektrik ve üretilmiş hidrojen enerjiyi taşıma/depolama yollarıdır; hidrojenin yenilenebilir niteliği onu hangi enerji ve yöntemle ürettiğine bağlıdır. Güneş hücresinde ışık elektriksel enerjiye; bir hidroelektrik tesiste suyun potansiyeli akış ve türbin üzerinden elektriğe aktarılabilir. Nükleer çekirdek enerjisinin kullanımında da toplam enerji yoktan üretilmez. Maliyet ve çevresel etkiyi her yer ve teknoloji için tek evrensel sayı sayma.",
        ],
      },
      {
        title: "Isı pompası oranı neden farklıdır?",
        paragraphs: [
          "Bir ısı pompası soğuk ortamdan enerji alıp dışarıdan verilen işle daha sıcak ortama enerji taşır. Sıcak tarafa aktarılan enerji Qsıcak=Qsoğuk+Wgiriş olabilir. Qsıcak/Wgirişoranı 1’den büyük çıkarsa bu, ısı pompasının COPdeğeridir; yalnız giriş işinin enerjiye dönüşme verimi değildir. Çevreden alınan enerji de tam bilançoya dahildir.",
          "Yararlı çıktı/giriş veriminde bütün enerji girdileri tutarlı sayıldığında enerji korunumu 1 üstü enerji yaratmaya izin vermez. Isı pompasında yalnız Wgirişipayda almak, taşınan çevre enerjisini dışarıda bırakan farklı bir performans tanımıdır. Bu iki oran aynı sözcükle etiketlenmez. Sayısal sonuçtan önce hangi girişlerin hesaba katıldığını ve çıktı olarak neyin seçildiğini yaz.",
        ],
      },
      {
        title: "Üç enerji modelinin varsayımları",
        paragraphs: [
          "Rampa görünümünde aynı ileri yol için itiş, direnç, yükseklik ve kinetik bütçeyi birlikte izle. Model ilk duruş noktasında yolu bitirir; hedefin ulaşılamayan bölümüne negatifKçizmez. Yay görünümünde ilk ve son işaretli sapmayı değiştir; kuvvet yönünün, enerjinin ve yay işinin aynı şey olmadığını karşılaştır. Bütün parametreler verilen ideal aralık içindedir.",
          "Tüketim görünümünde sabit giriş gücü, süre ve yararlı pay seçilir; JvekWhbilançosu aynı enerji için birlikte sunulur. Sıfır girişte oran neden tanımsız kalıyor açıklamaya çalış. Bu modeller ayrıntılı motor sürüşü, gerçek malzeme kopması veya ısı pompası çevrimi çözmez. Tahmin ve kısa gerekçe keşif kaydıdır; otomatik puan veya öğrenme ustalığı kaydı oluşturulmaz.",
        ],
      },
      {
        title: "Sıfır ve eşik durumları",
        paragraphs: [
          "Yer değiştirme 0 ise seçilen sabit kuvvetin öteleme işi 0 olabilir; vücutta iç enerji harcanmadığı sonucu çıkmaz. İtiş ve direnç aynı işi zıt işaretle yaparsa net iş 0 ve Kson=Kilk olabilir; tek tek işler yine sıfır değildir. Yayda x=0 enerji sıfırı seçilmiş doğal boydur; kpozitifken±xsapmaları aynı pozitifenerjiyi verir.",
          "Rampa hedefi duruş uzaklığına tam eşitse hedefe 0 hızla erişim vardır; biraz ötesinde erişim yoktur. Sıfır süre için ortalama güç oranı ancak ayrıca pozitif süre verilince kurulur. Sabit güç tüketiminde süre 0 ise enerji 0; seçilmiş yararlı pay bulunsa bile ölçülmüş çıktı/giriş 0/0 tanımlanamaz. Bu sınırlar sayısal hesap ile fiziksel yorumun birlikte yapılmasını gerektirir.",
        ],
      },
      {
        title: "Enerji çözümünü planla",
        paragraphs: [
          "Önce sistem ve başlangıç–son durumları yaz. Kinetik terimler için sürati, potansiyel için aynı referanslı yükseklik veya doğal boydan sapmayı, kuvvet işleri için uygun yol ve açıyı seç. Korunumlu kuvveti potansiyelde sayıyorsan iş tarafında tekrar sayma. Isıl artış veya dış giriş varsa eşitliğe ekle;“sürtünmesiz” sözcüğünü otomatik her tür enerji korunumu etiketi yapma.",
          "Bulduğun son Knegatifse önce hedefin gerçekten erişilip erişilemediğini denetle. Birimleri J, N, m, sile uyumlu tut; kWhdönüşümünü ayrı göster. Verim veya güç isteniyorsa hangi enerji miktarının hangi süreye veya hangi toplam girişe bölündüğünü açıkla. Son eşitliği sayılarla geri kontrol et: başlangıçlar+girişler, izlenen sonlar+çıkışlarla aynı hesabı vermelidir.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı işi yapan sabit kuvveti tasarla",
        prompt:
          "Seçilmiş kuvvetin F‖–xgrafiği 0–2 m’de 0’dan 8 N’a doğrusal artıyor; 2–3 m’de 8 N; 3–4 m’de 8’den 0 N’a doğrusal azalıyor. Başka kuvvetler bu soru için sorulmuyor. Aynı 4 m’de aynı işi yapacak sabit paralel kuvveti bul.",
        strategy:
          "Üç alanı topla; eşdeğer sabit kuvveti iş/toplam yol oranından bul.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk üçgen½·2·8=8 J; orta dikdörtgen 1·8=8 J.",
          },
          {
            label: "2. adım",
            explanation: "Son üçgen½·1·8=4 J; toplam seçili iş 20 J.",
          },
          {
            label: "3. adım",
            explanation:
              "F eşdeğer=20 J/4 m=5 N. En büyük 8 N, ortalama paralel kuvvet 5 N ile aynı değildir.",
          },
        ],
        answer: "Aynı iş 20 J; sabit eşdeğer kuvvet 5 N.",
        check: "5 N·4 m=20 J; grafikteki üç ayrı alanla aynı toplamı verir.",
        pitfall:
          "Son veya en büyük kuvveti bütün 4 m boyunca sabit kabul etmek.",
      },
      {
        title: "Rampayı sınırda tamamlayacak itiş",
        prompt:
          "2 kg cisim 5 m’lik düz rampaya 2 m/s süratle giriyor. Rampa sonunda 1 m yükseklik artışı var; harekete zıt direnç 3 N, sabit ve yüzey durgun.g=10 m/s². Cisim tam üst uçta 0 hızla dursun. Yola paralel sabit itişFkaçNolmalıdır?",
        strategy:
          "SonK 0 koşulunu, yerçekimi ve direnç bilançosuyla istenen işe çevir.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İlkK=½·2·2²=4 J; yükselme potansiyeli 2·10·1=20 J, ısıl artış 3·5=15 J.",
          },
          {
            label: "2. adım",
            explanation: "4+F·5=0+20+15; F’nin işi 31 J olmalıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "F=31/5=6,2 N. Metre başına net değişim 6,2−3−4=−0,8 J/m; 4 Jtam 5 m’de tükenir.",
          },
        ],
        answer: "F=6,2 N; hedefe 0 hızla tam erişir.",
        check:
          "K(s)=4−0,8 s; ilk sıfır 5 m. Daha küçük itiş hedefe varamadan durdurur.",
        pitfall:
          "Duruşu hedefe erişilemedi etiketiyle karıştırmak veya başlangıç kinetiğini atlamak.",
      },
      {
        title: "Yayı sıfırdan geçirirken net ve pozitif iş",
        prompt:
          "k=200 N/mideal yay çok yavaş x=−0,10 m’den doğal boy 0’a, oradan x=+0,20 m’ye götürülüyor. Kinetik değişim yok; ilk bölümde enerji geri alınabiliyor. Net dış işi, son bölümde verilen pozitif işi ve ilk bölümde geri alınan enerjiyi ayrı bul.",
        strategy:
          "İlk ve son depoları hesapla; 0’dan geçen iki aşamayı ayrı say.",
        steps: [
          {
            label: "1. adım",
            explanation: "Uilk=½·200·0,10²=1 J; U 0=0; Uson=½·200·0,20²=4 J.",
          },
          {
            label: "2. adım",
            explanation:
              "İlk bölümde 1 Jgeri alınır; ikinci bölümde 4 Jpozitif dış iş verilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Net dış iş 4−1=3 J; yaya bağlı kuvvetin net işi−3 J’dir.",
          },
        ],
        answer: "Net dış iş+3 J; pozitif verilen 4 J; geri alınan 1 J.",
        check:
          "Başlangıç 1 J+net 3 J=son 4 J. Pozitif giriş ile net iş farklı raporlardır.",
        pitfall:
          "İlk−xsapmasındaki enerjiyi negatif saymak veya net işle yalnız son enerji değerini karıştırmak.",
      },
      {
        title: "Uzun cismin merkezi ve referansı",
        prompt:
          "Homojen ince çubuk 2 m,4 kg.g=10 m/s². Önce yatay ve tümü yerden 0,5 m’de; sonra dikey, alt ucu 0,5 m, üst ucu 2,5 m’de tutuluyor. Yerçekimi potansiyel değişimini bul. U=0 düzeyi 1 m yüksekliğe alınırsa ilk ve sonUkaçJolur?",
        strategy:
          "Çubuğun kütle merkezi yüksekliklerini bul; aynı referansı iki duruma uygula.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İlk merkez 0,5 m; son merkez(0,5+2,5)/2=1,5 m. Δh=1 m.",
          },
          {
            label: "2. adım",
            explanation:
              "ΔU=4·10·1=40 J; üst ucun 2 m’lik yükselmesi bütün kütleye uygulanmaz.",
          },
          {
            label: "3. adım",
            explanation:
              "1 m sıfırında ilk göreli h=−0,5, son+0,5 m; Uilk=−20 J, Uson=+20 J. Fark yine 40 J.",
          },
        ],
        answer: "ΔU=40 J; yeni referansta−20 J ve+20 J.",
        check:
          "Referans kayması ikiUdeğerine aynı−40 Jekler; farkı değiştirmez.",
        pitfall: "Uzamış homojen cismin bütün kütlesini üst ucunda saymak.",
      },
      {
        title: "İki basamakta gerekli giriş enerjisi",
        prompt:
          "Bir dönüştürücünün verimi 0,80; çıkışının tamamını alan ikinci motorun verimi 0,75. Motor 12 kg yükü 4 m sabit süratle 20 s’de kaldırıyor; g=10 m/s², başka yararlı çıktı yok. İlk giriş enerjisini, ortalama giriş gücünü ve iki basamağın yararsız enerji paylarını bul.",
        strategy:
          "İstenen son yararlı enerjiden başlayıp her verimi geriye doğru uygula.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Son yararlı enerji 12·10·4=480 J. İkinci motor girişi 480/0,75=640 J; bu basamakta 160 Jbaşka enerjiye gider.",
          },
          {
            label: "2. adım",
            explanation:
              "İlk giriş 640/0,80=800 J; ilk basamakta 160 Jbaşka enerjiye gider. Toplam verim 0,80·0,75=0,60.",
          },
          {
            label: "3. adım",
            explanation:
              "Ortalama ilk giriş gücü 800/20=40 W; toplam diğer enerji 160+160=320 J.",
          },
        ],
        answer: "Giriş 800 J, güç 40 W; her basamakta 160 Jdiğer enerji.",
        check: "800=480+320 J; 20 s’de yararlı güç 24 W, oran 24/40=0,60.",
        pitfall:
          "Ardışık verimleri toplamak veya 480 J’yi doğrudan 20 s’ye bölüp giriş gücü saymak.",
      },
      {
        title: "Bant sürtünmesi pozitif iş yaparken",
        prompt:
          "1 kg blok ilk anda durgun, bant 5 m/s sabit hızla ileri gidiyor. İlk 1 s boyunca bloğa ileri 4 Nkinetik sürtünme etki ediyor; diğer yatay kuvvet yok. Bu aralıkta bant 5 m, blok 2 m ilerliyor; son blok hızı 4 m/s. Motor bandı sabit hızda tutuyor, başka kayıp yok. Blok işi, motorun temasa sağladığı enerji ve kayma iç enerji artışını bul.",
        strategy:
          "İşin yer değiştirmesini hangi cisme ait olduğuna göre seç; iki hareket arasındaki enerji farkını say.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Blok üzerindeki sürtünme işi 4 N·2 m=+8 J; bu½·1·4²=8 Jkinetik artıştır.",
          },
          {
            label: "2. adım",
            explanation:
              "Bant temasındaki ters kuvvet nedeniyle sabit hız için motor 4 N·5 m=20 Jsağlar.",
          },
          {
            label: "3. adım",
            explanation:
              "Toplam 20 J’nin 8 J’si blok kinetiği; 12 J’si kayma iç enerji artışıdır. Son 4 m/s, hâlâ5 m/sbanttan küçük olduğundan ileri sürtünme varsayımı bu aralıkta tutarlıdır.",
          },
        ],
        answer: "Blok işi+8 J; motor 20 J; ısıl iç enerji artışı 12 J.",
        check: "20=8+12 Jveya 4 N·(5−2)m=12 J; enerji yaratılmaz.",
        pitfall:
          "Her sürtünme kuvvetinin her cisme negatif iş yapacağını veya bandın yoluyla bloğun yolunun aynı olduğunu sanmak.",
      },
      {
        title: "Sabit kuvvetin değişen gücü",
        prompt:
          "3 kg noktasal cisme+x yönünde sabit net 6 N kuvvet etki ediyor. Hız 2 m/s’den 8 m/s’ye 3 s’de artıyor; başka enerji aktarımı bu soru için yok. Kuvvetin bu aralıktaki işi, ortalama gücü ve son andaki anlık gücü nedir?",
        strategy:
          "Sabit ivmede ortalama hızdan yolu; sonra iş ve iki farklı güç tanımını kullan.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İvme 6/3=2 m/s² verilen hız artışını sağlar. Ortalama hız(2+8)/2=5 m/s; yol 15 m.",
          },
          {
            label: "2. adım",
            explanation: "İş 6·15=90 J; ortalama güç 90/3=30 W.",
          },
          {
            label: "3. adım",
            explanation:
              "Son anlık güç 6·8=48 W. Sabit kuvvet, hız değiştiği için sabit anlık güç demek değildir.",
          },
        ],
        answer: "İş 90 J; ortalama güç 30 W; son anlık güç 48 W.",
        check:
          "ΔK=½·3·(64−4)=90 J; başlangıç anlık 12 W ile son 48 W’nin ortalaması da 30 W.",
        pitfall: "Son anlık gücü bütün 3 s’nin sabit gücü gibi kullanmak.",
      },
      {
        title: "Isı pompasında eksik girişi bul",
        prompt:
          "Bir ısı pompasına 300 Jelektrik işi veriliyor; aynı aralıkta sıcak odaya 1200 Jaktarılıyor. Başka aktarım ve sistemde depolama yok. Soğuk ortamdan alınan enerjiyi veQsıcak/WgirişCOPoranını bul. Bu oran%400 enerji üretme verimi midir?",
        strategy: "Toplam enerji bilançosuna çevreden alınan enerjiyi de ekle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Qsoğuk+300=1200 olduğundan Qsoğuk=900 J.",
          },
          {
            label: "2. adım",
            explanation:
              "COP=1200/300=4. Payda yalnız sağlanan iş; çevreden alınan 900 Jbu performans oranında ayrıca girdi olarak sayılmıyor.",
          },
          {
            label: "3. adım",
            explanation:
              "Tam bilanço 1200=900+300 J’dir; enerji yaratılmaz. Bu 4 oranı toplam enerji girişine göre çıktı verimi diye adlandırılmaz.",
          },
        ],
        answer:
          "Soğuk ortamdan 900 J; COP 4. Bu, enerji yaratma verimi değildir.",
        check: "Bütün girişler 900+300=1200 J; çıkışla eşittir.",
        pitfall:
          "Taşınan çevre enerjisini bilançodan çıkarıpCOP 1 üstünü enerji korunumu ihlali sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Seçilmiş kuvvet işi hangi koşuldaΔK’ye eşittir?",
        answer:
          "Noktasal/öteleme modelindeΔKnet işe eşittir. Seçilmiş kuvvet ancak diğer kuvvetlerin net işi 0 ise tek başına aynı sonucu verir.",
      },
      {
        prompt:
          "Yerçekimi potansiyelinin sıfırı değişince hangi nicelik değişmez?",
        answer:
          "Aynı iki durumunΔU=mgΔhdeğeri ve tutarlı enerji hesabından çıkan fiziksel hareket sonucu değişmez.",
      },
      {
        prompt:
          "Sürtünmesiz olmak mekanik enerji korunumuna tek başına yeter mi?",
        answer:
          "Hayır. Dış motor veya başka mekanik enerji aktarımı olabilir; sistem ve potansiyelde sayılan etkileşimler açık olmalıdır.",
      },
      {
        prompt: "Bir ilerleme hesabında sonKnegatif çıkarsa ne kontrol edilir?",
        answer:
          "Aynı ileri hareketin hedefe erişebilirliği. İlkK=0 noktasında duruş olabilir; negatif fiziksel kinetik enerji atanmaz.",
      },
      {
        prompt: "Yayda±xsapmaları için hangi nicelik aynı, hangisi zıttır?",
        answer:
          "½kx² enerjileri aynı;−kxgeri çağırıcı kuvvetleri zıt yönlüdür. Net yay işi−ΔU’dur.",
      },
      {
        prompt: "1 kWhhangi büyüklük ve kaç joule?",
        answer:
          "Enerji; 3,6×10⁶ J. kWgüç, saat süre olduğundan çarpımları enerji verir.",
      },
      {
        prompt: "Ardışık iki verim hangi koşulda çarpılır?",
        answer:
          "Birincinin yararlı çıkışının tamamı ikincinin girişi olursa ηtop=η₁η₂; yararlı amaç ve aynı aralık açık tanımlanır.",
      },
      {
        prompt: "COP 4 neden tek başına enerji yaratılması değildir?",
        answer:
          "Sıcak tarafa taşınan enerji, çevreden alınan enerji+giriş işini içerir. COPpaydasında yalnız iş vardır; tam enerji bilançosu bütün girişleri sayar.",
      },
    ],
    questions: [
      {
        id: "f026p-enerji-ve-hareket-1",
        prompt: {
          tr: "Cisim 5 m boyunca+x yönünde gidiyor. Seçili itiş kuvveti+10 N, direnç−4 N ve yer değiştirmeye dik normal 20 N; sabitler. Başka iş yapan kuvvet yok. İtişin işi, net iş ve kinetik enerji değişimi sırasıyla nedir?",
        },
        options: [
          {
            tr: "+50 J;+70 J;+70 J",
          },
          {
            tr: "+50 J;+30 J;−30 J",
          },
          {
            tr: "+50 J;+30 J;+30 J",
          },
          {
            tr: "+30 J;+30 J;+30 J",
          },
          {
            tr: "+50 J;+130 J;+130 J",
          },
        ],
        answer: 2,
        hint: {
          tr: "İtiş işi 10·5=+50 J; direnç işi−4·5=−20 J; normal işi 0.",
        },
        explanation: {
          tr: "İtiş işi 10·5=+50 J; direnç işi−4·5=−20 J; normal işi 0. Net iş 50−20=+30 J. Kinetik enerji değişimiΔK=+30 J’dir; tek itiş işi 50 J ile karıştırılmaz.",
        },
        skill: "physics026-enerji-ve-hareket-1",
        guidance: {
          knowledge: [
            "Seçili kuvvet işi ile bütün kuvvetlerin işaretli toplamı ayrı hesaplanır;ΔKnet işe eşittir.",
          ],
          strategy:
            "Her kuvvet için işini bul; net toplamı kinetik değişime eşitle.",
          steps: [
            "İtiş işi 10·5=+50 J; direnç işi−4·5=−20 J; normal işi 0.",
            "Net iş 50−20=+30 J.",
            "Kinetik enerji değişimiΔK=+30 J’dir; tek itiş işi 50 J ile karıştırılmaz.",
          ],
          optionReasons: [
            "Direnç işinin negatif işareti atlanmıştır.",
            "Pozitif net iş kinetik enerjiyi azaltmaz; artırır.",
            "Doğru. Seçili iş 50, işaretli toplam 30 veΔK 30 J.’dir.",
            "Net iş doğru fakat seçili itişin işi de net işle aynı sayılmıştır.",
            "Dik normalin 20·5=100 J iş yaptığı varsayılmış; dik kuvvet bu yer değiştirmede 0 iş yapar.",
          ],
          commonError:
            "Direncin büyüklüğünü pozitif iş diye toplamak veya seçili kuvveti net kuvvet saymak.",
          check: "ΔK=+30 J; ilkKne olursa olsun bu aralıkta 30 J artar.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-2",
        prompt: {
          tr: "Bir cisim yatay 3 m ilerliyor.20 Nçekme kuvveti yer değiştirmeye 60°açı yapıyor; cos 60°=0,5. Aynı aralıkta sabit 5 Ndirenç geriye yönlü. Diğer kuvvetlerin işi 0. Çekme ve net iş nedir?",
        },
        options: [
          {
            tr: "30 J;+45 J",
          },
          {
            tr: "15 J;+15 J",
          },
          {
            tr: "30 J;+15 J",
          },
          {
            tr: "0 J;−15 J",
          },
          {
            tr: "60 J;+45 J",
          },
        ],
        answer: 2,
        hint: {
          tr: "Çekme işi 20·3·0,5=30 J.",
        },
        explanation: {
          tr: "Çekme işi 20·3·0,5=30 J. Direnç işi−5·3=−15 J. Net iş 30−15=+15 J.",
        },
        skill: "physics026-enerji-ve-hareket-2",
        guidance: {
          knowledge: [
            "Sabit kuvvetin işi yer değiştirme doğrultusundaki bileşenle bulunur; direnç işi işaretli toplanır.",
          ],
          strategy: "Çekmenin yatay bileşenini kullan; direnç işini çıkar.",
          steps: [
            "Çekme işi 20·3·0,5=30 J.",
            "Direnç işi−5·3=−15 J.",
            "Net iş 30−15=+15 J.",
          ],
          optionReasons: [
            "Çekme işi doğru fakat direnç işi pozitif eklenmiştir.",
            "Çekme işi yerine net iş iki kez verilmiştir.",
            "Doğru. Çekme bileşeni 10 N; net paralel kuvvet 5 N.’dir.",
            "60°dik açı değildir; çekmenin paralel bileşeni 0 değil 10 N.’dir.",
            "Çekme kuvvetinin tamamı yatay alınmış; cos 60°atlanmıştır.",
          ],
          commonError:
            "Kuvvet büyüklüğünü açıdan bağımsız bütün yola uygulamak.",
          check: "Net iş=(20·0,5−5)·3=15 Jaynı sonucu verir.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-3",
        prompt: {
          tr: "Net kuvvet–konum grafiği 0–2 m’de 0’dan+6 N’a doğrusal artıyor; 2–4 m’de−2 N sabit. Cisim bu 4 m’yi gerçekten tamamlıyor ve başlangıç kinetik enerjisi 10 J. Son kinetik enerjisi nedir?",
        },
        options: [
          {
            tr: "12 J",
          },
          {
            tr: "20 J",
          },
          {
            tr: "2 J",
          },
          {
            tr: "16 J",
          },
          {
            tr: "8 J",
          },
        ],
        answer: 0,
        hint: {
          tr: "İlk iş½·2·6=+6 J.",
        },
        explanation: {
          tr: "İlk iş½·2·6=+6 J. İkinci iş−2·2=−4 J; net+2 J. Kson=10+2=12 J. İkinci bölümdeK 16’dan 12’ye iner; negatif olmaz.",
        },
        skill: "physics026-enerji-ve-hareket-3",
        guidance: {
          knowledge: ["NetF–xişaretli alanıΔKverir; başlangıçKsonuca eklenir."],
          strategy:
            "Pozitif üçgen ve negatif dikdörtgen alanını toplayıp başlangıç depoya ekle.",
          steps: [
            "İlk iş½·2·6=+6 J.",
            "İkinci iş−2·2=−4 J; net+2 J.",
            "Kson=10+2=12 J. İkinci bölümdeK 16’dan 12’ye iner; negatif olmaz.",
          ],
          optionReasons: [
            "Doğru. Net iş+2 J, başlangıç 10 J’ye eklenir.",
            "Negatif alan−4 yerine+4 alınmıştır; toplam 10 J iş bulunmuştur.",
            "Bu net iştir; başlangıç kinetik enerjisi eklenmemiştir.",
            "Yalnız ilk pozitif alan eklenmiştir; sonraki−4 Jatlanmıştır.",
            "Net işin işareti terslenmiştir; toplam alan+2 J’dir.",
          ],
          commonError:
            "Net işi son kinetik enerjinin kendisi sanmak veya eksen altı alanı pozitif almak.",
          check: "Başlangıç 10+6−4=12 J ve program boyuKpozitiftir.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-4",
        prompt: {
          tr: "A veB iki ayrı klasik cisim. B’nin kütlesi A’nın yarısı; A’nın hızı+3 m/s, B’nin−6 m/s. K=½mv² ile KB/KAkaçtır?",
        },
        options: [
          {
            tr: "2",
          },
          {
            tr: "1",
          },
          {
            tr: "1/2",
          },
          {
            tr: "−2",
          },
          {
            tr: "4",
          },
        ],
        answer: 0,
        hint: {
          tr: "mB/mA=1/2.",
        },
        explanation: {
          tr: "mB/mA=1/2. vB²/vA²=36/9=4. KB/KA=(1/2)·4=2; eksi hız negatif enerji vermez.",
        },
        skill: "physics026-enerji-ve-hareket-4",
        guidance: {
          knowledge: [
            "Kinetik enerji kütleyle ve süratin karesiyle orantılıdır; hız işareti karesinde gider.",
          ],
          strategy: "Kütle oranı ile hız büyüklük oranının karesini çarp.",
          steps: [
            "mB/mA=1/2.",
            "vB²/vA²=36/9=4.",
            "KB/KA=(1/2)·4=2; eksi hız negatif enerji vermez.",
          ],
          optionReasons: [
            "Doğru. Yarı kütle ve iki kat sürat birlikte 2 kat enerji verir.",
            "Sürat karesi yerine sürat oranı kullanılmıştır: 1/2·2=1 yanlıştır.",
            "Yalnız kütle oranı alınmış, hız büyüklüğü değişimi kullanılmamıştır.",
            "Hızın negatif yönü kinetik enerjiye negatif işaret olarak taşınmıştır.",
            "Sürat karesi kullanılmış fakat kütlenin yarıya indiği atlanmıştır.",
          ],
          commonError:
            "Sürati doğrusal kullanmak veya vektörel işareti skalerK’ye taşımak.",
          check: "mA=2 kg seçilirseKA=9 J, KB=18 J; oran 2.’dir.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-5",
        prompt: {
          tr: "Sabit 4 kg kütleli noktasal cismin sürati bir aralık sonunda 2 m/s. Bu aralıktaki net iş−24 J. Başlangıç sürati kaç m/s?",
        },
        options: [
          {
            tr: "2",
          },
          {
            tr: "0",
          },
          {
            tr: "4",
          },
          {
            tr: "−4",
          },
          {
            tr: "8",
          },
        ],
        answer: 2,
        hint: {
          tr: "Kson=½·4·2²=8 J.",
        },
        explanation: {
          tr: "Kson=½·4·2²=8 J. −24=8−Kilk; Kilk=32 J. 32=½·4·vilk²=2 vilk²; vilk=4 m/sbüyüklüğü bulunur.",
        },
        skill: "physics026-enerji-ve-hareket-5",
        guidance: {
          knowledge: [
            "Wnet=Kson−Kilk; negatif iş başlangıç kinetiğinin daha büyük olduğunu gösterir.",
          ],
          strategy: "SonK’yi bul; net işten ilkK’ye ve sürate geri git.",
          steps: [
            "Kson=½·4·2²=8 J.",
            "−24=8−Kilk; Kilk=32 J.",
            "32=½·4·vilk²=2 vilk²; vilk=4 m/sbüyüklüğü bulunur.",
          ],
          optionReasons: [
            "Bu son sürattir; negatif net işin önceki daha büyük kinetik enerjisi atlanmıştır.",
            "Durgun başlangıçtan−24 Jnet işle pozitif 8 JsonKelde edilemez.",
            "Doğru. Başlangıç 32 J’den 24 Jeksilince son 8 J kalır.",
            "Sürat büyüklüğü negatif yazılmaz; yön bilgisi kökte ayrıca verilmemiştir.",
            "Kinetik enerji 8 Jveya karekök işlemi süratle karıştırılmıştır.",
          ],
          commonError:
            "ΔKişaretini ters kullanmak veya sürati negatif karekök olarak raporlamak.",
          check: "½·4·(2²−4²)=2·(4−16)=−24 J.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-6",
        prompt: {
          tr: "3 kg cisim yerden 4 m yüksekte. U=0 referansı yerden 2 m yükseklikteki düzlem; g=10 m/s². Bu referansa göre yerçekimi potansiyeli nedir?",
        },
        options: [
          {
            tr: "−60 J",
          },
          {
            tr: "180 J",
          },
          {
            tr: "60 J",
          },
          {
            tr: "120 J",
          },
          {
            tr: "0 J",
          },
        ],
        answer: 2,
        hint: {
          tr: "Göreli yükseklik 4−2=2 m.",
        },
        explanation: {
          tr: "Göreli yükseklik 4−2=2 m. U=3·10·2=60 J. Yere göre 120 Jolabilirdi; referans seçimi mutlakUdeğerini değiştirir, fiziksel yükseklik farkını değiştirmez.",
        },
        skill: "physics026-enerji-ve-hareket-6",
        guidance: {
          knowledge: [
            "U=mg(h−href)ile seçilen ortak referansa göre işaretli yükseklik kullanılır.",
          ],
          strategy: "Önce referansa göre yüksekliği bul; sonra mgile çarp.",
          steps: [
            "Göreli yükseklik 4−2=2 m.",
            "U=3·10·2=60 J.",
            "Yere göre 120 Jolabilirdi; referans seçimi mutlakUdeğerini değiştirir, fiziksel yükseklik farkını değiştirmez.",
          ],
          optionReasons: [
            "Cisim referansın üstündedir; göreli yüksekliğin işareti ters alınmıştır.",
            "Yükseklikler çıkarılmak yerine toplanmıştır.",
            "Doğru. Seçilen sıfır düzeyinin 2 müstünde, mg 30 N ile 60 J verir.",
            "Bu yere göre seçilmiş sıfır için değerdir; verilen 2 m referansı kullanılmamıştır.",
            "Sıfır düzeyi cismin 4 mkonumunda değil 2 m’dedir.",
          ],
          commonError:
            "Potansiyel sıfır düzeyini sorudaki referans yerine otomatik yere atamak.",
          check:
            "Referans düzleminden cisme çıkışta 3·10·2=60 Jpotansiyel artışı vardır.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-7",
        prompt: {
          tr: "Bir cisim yukarı taşınırken dış çekmenin işi+30 J, ağırlığın işi−20 J. Diğer kuvvet işi 0. Cisim–Dünya sistemi içinΔU=+20 J. Hangi iki eşitlik aynı doğru enerji hesabını verir?",
        },
        options: [
          {
            tr: "30=ΔK ve 30=ΔK+20",
          },
          {
            tr: "30−20=ΔK+20",
          },
          {
            tr: "30+20=ΔK ve 30=ΔK−20",
          },
          {
            tr: "ΔK=−20 veΔU=30",
          },
          {
            tr: "30−20=ΔK ve 30=ΔK+20",
          },
        ],
        answer: 4,
        hint: {
          tr: "Wnet=30−20=10 J;ΔK=10 J.",
        },
        explanation: {
          tr: "Wnet=30−20=10 J;ΔK=10 J. −20 Jyerçekimi işi,+20 Jpotansiyel artışının negatifidir. Bu yüzden 30−20=ΔKile 30=ΔK+20 aynıΔK=10 Jsonucunu verir.",
        },
        skill: "physics026-enerji-ve-hareket-7",
        guidance: {
          knowledge: [
            "Ağırlığı dış iş saymak veya potansiyel değişimine almak eşdeğer olabilir; aynı etki iki kez sayılmaz.",
          ],
          strategy:
            "Önce net işi bul; sonra ağırlık işini−ΔUolarak karşı tarafa taşı.",
          steps: [
            "Wnet=30−20=10 J;ΔK=10 J.",
            "−20 Jyerçekimi işi,+20 Jpotansiyel artışının negatifidir.",
            "Bu yüzden 30−20=ΔKile 30=ΔK+20 aynıΔK=10 Jsonucunu verir.",
          ],
          optionReasons: [
            "İlk denklem ağırlığın−20 Jişini yok sayar; ikinciyle aynıΔK’yi vermez.",
            "Ağırlık hem negatif işte hem potansiyel artışında iki kez sayılmıştır.",
            "Yerçekiminin işi ve potansiyel değişiminin işaretleri ters alınmıştır.",
            "Çekme ve ağırlık işleri istenen enerji türleriyle doğru bağlanmamıştır.",
            "Doğru. Aynı yerçekimi etkisi iki eşdeğer tarafta birer kez sayılır.",
          ],
          commonError:
            "Korunumlu kuvvetin işini ve aynı potansiyel değişimini tek bilançoda iki kez saymak.",
          check: "İlk denklemΔK 10; ikinci 30=10+20 J ile doğrulanır.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-8",
        prompt: {
          tr: "Yatay sürtünmesiz yüzeyde 2 kg cisme hareket yönünde sabit 10 N dış kuvvet,3 m boyunca iş yapıyor. Yerçekimi ve normalin işi 0; yükseklik ve yay enerjisi değişmiyor. “Sürtünme yok, mekanik enerji kesin sabit.” iddiası için hangi değerlendirme doğrudur?",
        },
        options: [
          {
            tr: "Kinetik enerji sabit,30 Jyok olur.",
          },
          {
            tr: "Sürtünme yoksa kuvvet uygulanamaz.",
          },
          {
            tr: "Mekanik enerji 30 J artar; dış iş vardır.",
          },
          {
            tr: "Mekanik enerji 30 J azalır.",
          },
          {
            tr: "Mekanik enerji sabit; her sürtünmesiz harekette korunur.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Dış kuvvet işi 10·3=+30 J.",
        },
        explanation: {
          tr: "Dış kuvvet işi 10·3=+30 J. Diğer işler 0 olduğundanΔK=+30 J. Potansiyeller değişmiyorsa mekanik enerji de 30 J artar; sürtünmesizlik dış girişi ortadan kaldırmaz.",
        },
        skill: "physics026-enerji-ve-hareket-8",
        guidance: {
          knowledge: [
            "Sürtünme yokken de dış kuvvet sisteme iş aktarabilir; mekanik korunum için bu giriş ayrıca denetlenir.",
          ],
          strategy:
            "Dış işi hesapla; potansiyeller sabitken kinetik değişime bağla.",
          steps: [
            "Dış kuvvet işi 10·3=+30 J.",
            "Diğer işler 0 olduğundanΔK=+30 J.",
            "Potansiyeller değişmiyorsa mekanik enerji de 30 J artar; sürtünmesizlik dış girişi ortadan kaldırmaz.",
          ],
          optionReasons: [
            "Net pozitif iş kinetik artış verir; enerji yok olmaz.",
            "Sürtünmesiz yüzeyde de dış bir çekme veya itme kuvveti uygulanabilir.",
            "Doğru. Sürtünme yok ama dış kuvvet 30 J enerji aktarır.",
            "Dış kuvvet hareketle aynı yönde pozitif iş yapar.",
            "Dış kuvvetin pozitif işi açıkça verilmiştir; koşulsuz genelleme yanlıştır.",
          ],
          commonError:
            "Sürtünmesizlik sözcüğünü dış enerji aktarımını yok sayan otomatik korunum etiketi yapmak.",
          check: "ΔEmek=ΔK=30 J; hareket sonucu netişteoremiyle uyumludur.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-9",
        prompt: {
          tr: "İdeal Hooke yayında k=100 N/m, doğal boydan işaretli sapmax=−0,20 m. Yayın cisme kuvveti ve depoladığı enerji nedir?Fx=−kx, U=½kx².",
        },
        options: [
          {
            tr: "+20 N;−2 J",
          },
          {
            tr: "+20 N; 2 J",
          },
          {
            tr: "+20 N; 4 J",
          },
          {
            tr: "+10 N; 2 J",
          },
          {
            tr: "−20 N; 2 J",
          },
        ],
        answer: 1,
        hint: {
          tr: "Fx=−100·(−0,20)=+20 N.",
        },
        explanation: {
          tr: "Fx=−100·(−0,20)=+20 N. U=½·100·0,20²=2 J. Kuvvet+x yönünde, enerji pozitiftir; sıkıştırılmış yay negatif enerji taşımak zorunda değildir.",
        },
        skill: "physics026-enerji-ve-hareket-9",
        guidance: {
          knowledge: [
            "Kuvvet sapmanın ters yönlü bileşeni; yay enerjisi sapmanın karesiyle bulunan skaler miktardır.",
          ],
          strategy: "−xi kuvvete işaretiyle, enerjiye karesiyle yerleştir.",
          steps: [
            "Fx=−100·(−0,20)=+20 N.",
            "U=½·100·0,20²=2 J.",
            "Kuvvet+x yönünde, enerji pozitiftir; sıkıştırılmış yay negatif enerji taşımak zorunda değildir.",
          ],
          optionReasons: [
            "Enerjiye sapmanın işareti taşınmıştır; Ukaresel ve pozitiftir.",
            "Doğru. Geri çağırıcı kuvvet pozitif, karesel enerji 2 J.’dir.",
            "Kuvvet doğru, enerjide 1/2 çarpanı atlanmıştır.",
            "Kuvvete enerji bağıntısındaki 1/2 çarpanı yanlış eklenmiştir.",
            "Enerji doğru, kuvvetteki geri çağırıcı eksi işareti atlanmıştır.",
          ],
          commonError:
            "Kuvvet ve enerji bağıntılarını aynı doğrusal işaret kuralıyla kullanmak.",
          check: "2 J=½·100·0,04; 20 N kuvvet doğal boya doğru+x’tir.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-10",
        prompt: {
          tr: "A veB iki ideal yay, doğal boylarından sırasıyla x ve 2 x kadar uzatılıyor; x>0. Depoladıkları enerji eşit. kB/kA ve bu durumdaki kuvvet büyüklükleri FB/FA nedir?",
        },
        options: [
          {
            tr: "1/2; 1",
          },
          {
            tr: "4; 8",
          },
          {
            tr: "1/4; 1/4",
          },
          {
            tr: "1; 2",
          },
          {
            tr: "1/4; 1/2",
          },
        ],
        answer: 4,
        hint: {
          tr: "½kAx²=½kB(2 x)²; kA=4 kB.",
        },
        explanation: {
          tr: "½kAx²=½kB(2 x)²; kA=4 kB. kB/kA=1/4. FB/FA=(kB·2 x)/(kA·x)=2·1/4=1/2.",
        },
        skill: "physics026-enerji-ve-hareket-10",
        guidance: {
          knowledge: [
            "Eşit enerji için kx² çarpımı eşit; kuvvet büyüklüğü ise kx’tir.",
          ],
          strategy:
            "Önce enerji eşitliğinden yay sabiti oranını bul; sonra kuvvet oranını kur.",
          steps: [
            "½kAx²=½kB(2 x)²; kA=4 kB.",
            "kB/kA=1/4.",
            "FB/FA=(kB·2 x)/(kA·x)=2·1/4=1/2.",
          ],
          optionReasons: [
            "Enerji uzamayla doğrusal sanılmıştır; karesi kullanılmalıdır.",
            "Gerekli k oranı ters alınmış; bu durumda enerjiler eşit olmaz.",
            "k oranı doğru, fakatB’nin uzamasının 2 kat oluşu kuvvette kullanılmamıştır.",
            "Aynıkile iki kat uzama enerji 4 kat olur; eşi enerji koşulu bozulur.",
            "Doğru. İki kat uzama aynı enerji için dörtte birkister; kuvvet yarıya iner.",
          ],
          commonError:
            "Yay enerjisindeki x² ile kuvvetteki xbağımlılığını aynı saymak.",
          check: "kB=kA/4 ileUB=½(kA/4)4 x²=UAveFB=FA/2.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-11",
        prompt: {
          tr: "İki yay için kA=100 N/m, kB=200 N/m. Verilen küçükxuzamasında ikisi de Hooke aralığında. Başka malzeme veya esneklik sınırı bilgisi yok. Hangi sonuç zorunludur?",
        },
        options: [
          {
            tr: "B’nin kuvveti yarısıdır.",
          },
          {
            tr: "Aynıx’te kuvvetleri eşittir.",
          },
          {
            tr: "B’nin enerjisi kesin negatiftir.",
          },
          {
            tr: "Bkesin iki kat daha uzun esneyebilir.",
          },
          {
            tr: "Aynıx’teBkuvveti 2 kat; esneklik sınırı karşılaştırılamaz.",
          },
        ],
        answer: 4,
        hint: {
          tr: "FA=100 x, FB=200 xolduğundanFB=2 FA.",
        },
        explanation: {
          tr: "FA=100 x, FB=200 xolduğundanFB=2 FA. Bu bilgiB’nin aynı uzamada daha büyük kuvvet uyguladığını söyler. Hangi yayın daha büyük maksimum esnek uzamaya dayanacağı verilmemiştir.",
        },
        skill: "physics026-enerji-ve-hareket-11",
        guidance: {
          knowledge: [
            "kverilen doğrusal aralıktaki sertliği belirler; kalıcı bozulma sınırını tek başına vermez.",
          ],
          strategy:
            "Aynıx’te kuvvetleri karşılaştır; verilmeyen sınır uzamasını ayrıca tut.",
          steps: [
            "FA=100 x, FB=200 xolduğundanFB=2 FA.",
            "Bu bilgiB’nin aynı uzamada daha büyük kuvvet uyguladığını söyler.",
            "Hangi yayın daha büyük maksimum esnek uzamaya dayanacağı verilmemiştir.",
          ],
          optionReasons: [
            "Aynı uzamada büyük kuvvet, kile doğru orantılıdır.",
            "kdeğerleri farklı; Hooke bağıntısında kuvvetler 2 kat farklıdır.",
            "½kx² pozitifkvegerçekxiçin negatif değildir.",
            "Yay sabiti tek başına maksimum esnek uzama sınırını vermez.",
            "Doğru. Sertlik oranı bilinir; kopma veya kalıcı şekil sınırı ayrı özelliktir.",
          ],
          commonError:
            "Sertlik katsayısını malzemenin izinli maksimum uzaması saymak.",
          check: "Küçükxiki yay için açıkça geçerli; FB/FA=200/100=2.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-12",
        prompt: {
          tr: "2 kg cisim yatay yola 3 m/s süratle giriyor. İleri sabit itiş 4 N, geriye sabit kayma direnci 7 N.5 m ilerlemesi isteniyor. İlk duruşta ileri izleme bitiriliyor. Gerçekte tamamlanan yol ve o yolda direnç kaynaklı iç enerji artışı nedir?",
        },
        options: [
          {
            tr: "3 m; 9 J",
          },
          {
            tr: "3 m; 21 J",
          },
          {
            tr: "0 m; 0 J",
          },
          {
            tr: "5 m; 35 J",
          },
          {
            tr: "9/7 m; 9 J",
          },
        ],
        answer: 1,
        hint: {
          tr: "K₀=½·2·3²=9 J; net kuvvet 4−7=−3 N.",
        },
        explanation: {
          tr: "K₀=½·2·3²=9 J; net kuvvet 4−7=−3 N. K=9−3 s, ilk sıfır s=3 m; 5 m hedef tamamlanamaz. Bu 3 m’de iç enerji artışı 7·3=21 J; başlangıç 9+itiş 12=21 J.’dir.",
        },
        skill: "physics026-enerji-ve-hareket-12",
        guidance: {
          knowledge: [
            "K(s)=K₀+(F−f)s; ilk sıfırdan sonrası aynı ileri kayma programıyla tamamlanamaz.",
          ],
          strategy:
            "İlkKve metre başına net değişimi bul; durma uzaklığında direnç işinin büyüklüğünü kullan.",
          steps: [
            "K₀=½·2·3²=9 J; net kuvvet 4−7=−3 N.",
            "K=9−3 s, ilk sıfır s=3 m; 5 m hedef tamamlanamaz.",
            "Bu 3 m’de iç enerji artışı 7·3=21 J; başlangıç 9+itiş 12=21 J.’dir.",
          ],
          optionReasons: [
            "9 J başlangıç kinetiğidir; itişin sağladığı 12 Jde sürtünmeye gitmiştir.",
            "Doğru. İlk kinetik bütçe 3 m’de tükenir; direnç yalnız gerçekten tamamlanan yolda sayılır.",
            "Cisim başlangıçta 3 m/s sürate ve 9 J enerjiye sahiptir; hemen durgun değildir.",
            "Hedefe varılmış sayılmıştır; 5 m’de cebirselK=−6 Jfiziksel son durum değildir.",
            "İtişin pozitif işi yok sayılıp bütün bütçe yalnız başlangıç 9 Jsanılmıştır.",
          ],
          commonError:
            "Hedef uzunluğu erişim denetimi yapmadan gerçek alınan yol saymak.",
          check: "3 m’deK 0, netiş−9 J; 9+4·3=7·3 enerji eşitliği sağlanır.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-13",
        prompt: {
          tr: "İleri yol boyunca K(s)=8−2 s joule veren bir model var; smetre. İlkK=0 noktasında ileri hareket durur. Bir denemede hedef 4 m, diğerinde 4,1 m. Hedefe erişim için hangi kıyas doğrudur?",
        },
        options: [
          {
            tr: "4 m’ye 0 hızla erişir; 4,1 m’ye erişemez.",
          },
          {
            tr: "İki hedefe de erişemez; 0 Kvarış sayılmaz.",
          },
          {
            tr: "Duruş 8 m’dedir.",
          },
          {
            tr: "4,1 m’ye erişir,4 m’ye erişemez.",
          },
          {
            tr: "İki hedefe de erişir; negatifKkullanılır.",
          },
        ],
        answer: 0,
        hint: {
          tr: "8−2 s=0 için duruş uzaklığı 4 m.",
        },
        explanation: {
          tr: "8−2 s=0 için duruş uzaklığı 4 m. 4 m hedefindeK 0; hedefe anlık 0 hızla varılır. 4,1 m hedefi ilk duruştan ötedir; aynı ileri programda tamamlanamaz.",
        },
        skill: "physics026-enerji-ve-hareket-13",
        guidance: {
          knowledge: [
            "Kilk 0 olduğu uzaklık maksimum ileri erişimdir; eşik noktasına 0 hızla erişim, ötesine erişimden farklıdır.",
          ],
          strategy:
            "K’nin sıfırını bul; iki hedefi bu kapalı sınırla karşılaştır.",
          steps: [
            "8−2 s=0 için duruş uzaklığı 4 m.",
            "4 m hedefindeK 0; hedefe anlık 0 hızla varılır.",
            "4,1 m hedefi ilk duruştan ötedir; aynı ileri programda tamamlanamaz.",
          ],
          optionReasons: [
            "Doğru. Eşik dahil, ötesi aynı programın fiziksel ileri yolu değildir.",
            "Duruş noktası hedefin kendisiyse o konuma erişilmiştir.",
            "8 başlangıç enerjisidir; metre başına 2 J azalışa bölünmelidir.",
            "Daha uzak hedefe gitmek için önce 4 m’den geçmesi gerekir; enerji sınırı ters yorumlanmıştır.",
            "Kinetik enerji bu modelde negatif fiziksel değer alamaz.",
          ],
          commonError:
            "Eşik değeri ötesiyle aynı sınıfa koymak veya negatif bütçeyi fizikselKsaymak.",
          check: "4 m’de 8−8=0; 4,1 m’de−0,2 Jhesabı erişim engelini gösterir.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-14",
        prompt: {
          tr: "1 kg cisim durgun başlayıp 5 m’lik düz yolda 1 m alçalıyor.g=10 m/s². İtiş yok; harekete karşı sabit 1 Ndirenç. İleri hareket başlayabiliyor. Yol sonunda kinetik ve direnç kaynaklı iç enerji artışı nedir?",
        },
        options: [
          {
            tr: "0 J; 10 J",
          },
          {
            tr: "5 J; 0 J",
          },
          {
            tr: "10 J; 5 J",
          },
          {
            tr: "5 J; 5 J",
          },
          {
            tr: "−5 J; 5 J",
          },
        ],
        answer: 3,
        hint: {
          tr: "Potansiyel azalışı 1·10·1=10 J.",
        },
        explanation: {
          tr: "Potansiyel azalışı 1·10·1=10 J. Direnç kaynaklı iç enerji artışı 1·5=5 J. BaşlangıçK 0; sonK=10−5=5 J.",
        },
        skill: "physics026-enerji-ve-hareket-14",
        guidance: {
          knowledge: [
            "Potansiyel azalışı kinetik artış ve uygun sistemde ısıl artış arasında paylaşılır.",
          ],
          strategy:
            "mgile düşey düşüşten sağlanan enerjiyi, dirençle yoldaki aktarımı ayrı bul.",
          steps: [
            "Potansiyel azalışı 1·10·1=10 J.",
            "Direnç kaynaklı iç enerji artışı 1·5=5 J.",
            "BaşlangıçK 0; sonK=10−5=5 J.",
          ],
          optionReasons: [
            "Direncin işi 5 J verir; 10 J değil. Kalan 5 Jkinetik olmalıdır.",
            "SonK 5 olsada verilen 1 Ndirencin 5 m’deki enerji aktarımı yok sayılamaz.",
            "Kinetiğe bütün potansiyel verilmiş, ısıl 5 Jayrıca eklenerek enerji iki kez sayılmıştır.",
            "Doğru. Salınan 10 J,5 Jkinetik ve 5 Jiç enerjiye gider.",
            "Aşağı inişte potansiyel değişiminin işareti yanlış enerji yönünde kullanılmıştır.",
          ],
          commonError:
            "Alçalmada potansiyel azalışını negatif kinetik enerji diye yorumlamak.",
          check:
            "Bilanço 0+10=5+5 J; metre başına net enerji 10/5−1=1 J/mileriye ivme sağlar.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-15",
        prompt: {
          tr: "Bir kişi ağır bir yükü hareketsiz tutuyor; yükün kuvvet uygulama noktası bu aralıkta yer değiştirmiyor. Kişinin kaslarında kimyasal/iç enerji süreçleri sürüyor. Yüke uygulanan tutma kuvvetinin öteleme işi ve kişinin enerji harcaması için hangi ifade doğrudur?",
        },
        options: [
          {
            tr: "Yükün işi kesin negatiftir.",
          },
          {
            tr: "Yüke öteleme işi 0; kişi enerji harcayabilir.",
          },
          {
            tr: "İş 0 isekişinin bütün enerjisi sabittir.",
          },
          {
            tr: "Yük ağırsa iş mutlaka pozitiftir.",
          },
          {
            tr: "Kişinin yorulması yüke mutlaka hareket verildiğini kanıtlar.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Yükün uygulama noktasıΔr=0; bu kuvvetin yüke öteleme işi 0.",
        },
        explanation: {
          tr: "Yükün uygulama noktasıΔr=0; bu kuvvetin yüke öteleme işi 0. Kişinin kas sisteminde iç süreçler ve enerji dönüşümleri ayrıca bulunabilir. Bu nedenle mekanik iş 0 sonucu kişinin hiçbir enerji harcamadığı iddiasını vermez.",
        },
        skill: "physics026-enerji-ve-hareket-15",
        guidance: {
          knowledge: [
            "Seçili kuvvetin mekanik işi yer değiştirmeye bağlıdır; bu sonuç başka iç enerji süreçlerini sıfırlamaz.",
          ],
          strategy:
            "Önce yüke ait yer değiştirmeyi iş tanımına uygula; sonra kas sistemini ayrı değerlendir.",
          steps: [
            "Yükün uygulama noktasıΔr=0; bu kuvvetin yüke öteleme işi 0.",
            "Kişinin kas sisteminde iç süreçler ve enerji dönüşümleri ayrıca bulunabilir.",
            "Bu nedenle mekanik iş 0 sonucu kişinin hiçbir enerji harcamadığı iddiasını vermez.",
          ],
          optionReasons: [
            "Yer değiştirme 0 olduğu için işaretli çarpım 0’dır.",
            "Doğru. Sistem ve aktarım türleri ayrıdır; durgun yük sonucu kas süreçlerini yok saymaz.",
            "Yüke mekanik iş ile kişinin kimyasal/iç enerji bilançosu aynı sistem değildir.",
            "Kuvvet büyük olsa da uygulama noktası yer değiştirmemiştir.",
            "Kök yükün hareketsizliğini açıkça vermektedir; yorgunluk yer değiştirme ölçümü değildir.",
          ],
          commonError:
            "Günlük enerji harcamasıyla seçilmiş kuvvetin yüke yaptığı mekanik işi tek kavram saymak.",
          check:
            "W=F·0=0 J; bu yalnız tanımlanan mekanik aktarım için sonuçtur.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-16",
        prompt: {
          tr: "Blok ve durgun zemin birlikte yalıtılmış sistem seçiliyor. Kayma sonunda blok kinetik enerjisi 20 J azalıyor; başka mekanik depo, ışık, ses veya dış aktarım yok. Bu sistemin iç enerji artışı ve sınırdan sıcaklık farkıyla gelen net ısı nedir?",
        },
        options: [
          {
            tr: "−20 J; 0 J",
          },
          {
            tr: "+20 J; 0 J",
          },
          {
            tr: "+40 J;+20 J",
          },
          {
            tr: "0 J; 0 J",
          },
          {
            tr: "+20 J;+20 J",
          },
        ],
        answer: 1,
        hint: {
          tr: "Kinetik 20 J azalmış; başka depo veya aktarım olmadığından iç enerji 20 J artar.",
        },
        explanation: {
          tr: "Kinetik 20 J azalmış; başka depo veya aktarım olmadığından iç enerji 20 J artar. Sistem yalıtılmış olduğundan sınırdan netısı aktarımı 0’dır. Biri sistem içi dönüşüm, öteki sınırdan aktarım olduğundan 20 J ve 0 Jbirbirine aykırı değildir.",
        },
        skill: "physics026-enerji-ve-hareket-16",
        guidance: {
          knowledge: [
            "Sistem içinde mekanikten iç enerjiye dönüşüm, aynı sistem sınırından ısı aktarımıyla aynı terim değildir.",
          ],
          strategy:
            "Toplam korunumu iç enerjiye uygula; yalıtılmış sınırdaki ısı aktarımını ayrı raporla.",
          steps: [
            "Kinetik 20 J azalmış; başka depo veya aktarım olmadığından iç enerji 20 J artar.",
            "Sistem yalıtılmış olduğundan sınırdan netısı aktarımı 0’dır.",
            "Biri sistem içi dönüşüm, öteki sınırdan aktarım olduğundan 20 J ve 0 Jbirbirine aykırı değildir.",
          ],
          optionReasons: [
            "Kinetik azalırken başka çıkış yoksa iç enerji artmalıdır, azalmamalıdır.",
            "Doğru. İç enerji sistem içinde artar; yalıtılmış sınırdan ısı gelmez.",
            "Dış giriş verilmediği hâlde fazladan enerji oluşturulmuştur.",
            "Kinetik azalmasının 20 Jkarşılığı toplam bilançoda kaybolmuştur.",
            "Aynı enerji hem iç dönüşüm hem dışarıdan gelen ısı olarak iki kez sayılmıştır.",
          ],
          commonError:
            "Sürtünmeyle oluşan iç enerji artışını aynı kapalı sisteme dışarıdan giren ısıyla karıştırmak.",
          check: "ΔK+ΔUiç=−20+20=0 J; toplam enerji korunur.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-17",
        prompt: {
          tr: "Sabit 750 W giriş gücüyle 8 dakika çalışan aygıtın yararlı payı 0,60. Giriş enerjisinin kWhdeğeri ve diğer enerjiye giden miktar nedir?1 kWh=3,6×10⁶ J.",
        },
        options: [
          {
            tr: "0,10 kWh; 144 kJ",
          },
          {
            tr: "6 kWh; 144 kJ",
          },
          {
            tr: "0,75 kWh; 300 J",
          },
          {
            tr: "0,10 kWh; 216 kJ",
          },
          {
            tr: "360 kWh; 144 J",
          },
        ],
        answer: 0,
        hint: {
          tr: "8 dakika 480 s; giriş 750·480=360000 J.",
        },
        explanation: {
          tr: "8 dakika 480 s; giriş 750·480=360000 J. 360000/(3,6×10⁶)=0,10 kWh. Diğer enerji payı 0,40·360000=144000 J=144 kJ.",
        },
        skill: "physics026-enerji-ve-hareket-17",
        guidance: {
          knowledge: ["Sabit güçteE=Pt; yararlı olmayan pay 1−ηile bulunur."],
          strategy:
            "Dakikayı saniyeye çevir; giriş enerjisini hemJhemkWhile yaz.",
          steps: [
            "8 dakika 480 s; giriş 750·480=360000 J.",
            "360000/(3,6×10⁶)=0,10 kWh.",
            "Diğer enerji payı 0,40·360000=144000 J=144 kJ.",
          ],
          optionReasons: [
            "Doğru. Toplam 360 kJ’nin%40’ı 144 kJ; aynı giriş 0,10 kWh.’dir.",
            "Dakika saat yerine doğrudan 8 ile çarpılmıştır; 0,75 kW·8/60 h=0,10 kWh olur.",
            "Güç değeri enerji sanılmış; süre ve toplam enerji bilançosu kullanılmamıştır.",
            "216 kJyararlı%60 çıktıdır; sorulan diğer enerji%40’tır.",
            "J, kJvekWhbirimleri birbirinin yerine etiketlenmiştir.",
          ],
          commonError:
            "Süreyi güç birimine uygun çevirmemek veya yararlı payla diğer payı terslemek.",
          check: "216+144=360 kJ; 0,10 kWh·3,6 MJ/kWh=0,36 MJ.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-18",
        prompt: {
          tr: "Aaygıtı 2 kW ile 5 dakika, Baygıtı 0,5 kW ile 30 dakika sabit çalışıyor. Hangi aygıt daha çok giriş enerjisi tüketir ve EB/EAoranı nedir?",
        },
        options: [
          {
            tr: "Eşit; 1",
          },
          {
            tr: "A; 4",
          },
          {
            tr: "A; 2/3",
          },
          {
            tr: "B; 6",
          },
          {
            tr: "B; 3/2",
          },
        ],
        answer: 4,
        hint: {
          tr: "EA=2·5/60=1/6 kWh.",
        },
        explanation: {
          tr: "EA=2·5/60=1/6 kWh. EB=0,5·30/60=1/4 kWh. EB/EA=(1/4)/(1/6)=3/2; Bdaha fazla tüketir.",
        },
        skill: "physics026-enerji-ve-hareket-18",
        guidance: {
          knowledge: [
            "Enerji güç×süreyle bulunur; daha büyük güç tek başına daha büyük toplam tüketim demek değildir.",
          ],
          strategy: "Süreleri saate çevirerek iki kWhdeğerini karşılaştır.",
          steps: [
            "EA=2·5/60=1/6 kWh.",
            "EB=0,5·30/60=1/4 kWh.",
            "EB/EA=(1/4)/(1/6)=3/2; Bdaha fazla tüketir.",
          ],
          optionReasons: [
            "Güç–süre çarpımları eşit değildir; 1/6 ve 1/4 kWhfarklıdır.",
            "4 yalnız güç oranıdır; süre farkı hesaba katılmamıştır.",
            "2/3, EA/EBoranıdır; istenenEB/EAtersidir veBdaha büyüktür.",
            "6 yalnız süre oranıdır; güç oranı 1/4 ile çarpılmalıdır.",
            "Doğru. Düşük güç daha uzun çalışınca 0,25 kWh, diğerinin 1/6 kWhdeğerini aşar.",
          ],
          commonError:
            "Güç etiketini çalışma süresinden bağımsız tüketim sıralaması yapmak.",
          check: "2 kW·300 s=600 kJ; 0,5 kW·1800 s=900 kJ; oran 1,5.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-19",
        prompt: {
          tr: "Bir modelde sabitgiriş gücü 0 W, süre 10 s ve önceden seçilmiş yararlıpay katsayısı 0,80. Çıkış da 0 Jhesaplanıyor. Bu denemedeki ölçülmüş yararlı çıktı/giriş verimi için hangi rapor doğrudur?",
        },
        options: [
          {
            tr: "Model mutlaka 0,8 Jyararlı enerji üretir.",
          },
          {
            tr: "Ölçülmüş oran tanımsız; 0,80 yalnız model katsayısıdır.",
          },
          {
            tr: "Ölçülmüş verimkesin%80",
          },
          {
            tr: "Ölçülmüş verimkesin%0",
          },
          {
            tr: "Verimsonsuzdur",
          },
        ],
        answer: 1,
        hint: {
          tr: "Ein=0·10=0 J; Eyararlı=0 J.",
        },
        explanation: {
          tr: "Ein=0·10=0 J; Eyararlı=0 J. Ölçülmüş oran 0/0 şeklindedir. 0,80 model varsayımı olarak kalabilir; bu sıfır giriş denemesi onu oranla ölçmüş olmaz.",
        },
        skill: "physics026-enerji-ve-hareket-19",
        guidance: {
          knowledge: [
            "Giriş enerjisi 0 iken 0/0 oranı tanımsızdır; önceden seçilmiş model katsayısı ölçülmüş oran yerine konmaz.",
          ],
          strategy: "Giriş enerjisini hesapla; oranın paydasını denetle.",
          steps: [
            "Ein=0·10=0 J; Eyararlı=0 J.",
            "Ölçülmüş oran 0/0 şeklindedir.",
            "0,80 model varsayımı olarak kalabilir; bu sıfır giriş denemesi onu oranla ölçmüş olmaz.",
          ],
          optionReasons: [
            "Boyutsuz katsayı giriş olmadan enerji yaratmaz; çıktı 0 J verilmiştir.",
            "Doğru. Sıfır payda çıktı/giriş ölçümünü kurmaya izin vermez.",
            "Önceden verilmiş katsayı ile bu denemede ölçülmüş oran karıştırılmıştır.",
            "0/0 tanımsızdır; payın 0 olması oranı 0 yapmaz.",
            "0/0 tek bir sonsuz değer değildir; oran belirlenmez.",
          ],
          commonError:
            "Sıfır giriş sınırında varsayılan katsayıyı deneyle doğrulanmış verim saymak.",
          check:
            "Aynı katsayıyla pozitifEinolduğunda oran kurulabilir; bu deneme o koşulu sağlamaz.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-20",
        prompt: {
          tr: "Depolama değişimi olmayan aygıt için bir raporda toplam giriş 500 J, yararlı çıkış 300 J, diğer tüm çıkış 250 J olarak veriliyor. Başka giriş olmadığı da iddia ediliyor. Hangi değerlendirme zorunludur?",
        },
        options: [
          {
            tr: "Giriş 150 J olmalıdır.",
          },
          {
            tr: "Toplam çıkış 50 J’dir.",
          },
          {
            tr: "50 J enerji kendiliğinden üretilmiştir.",
          },
          {
            tr: "Rapor 50 Jeksik giriş veya başka açıklama gerektirir; veriler birlikte tutarsız.",
          },
          {
            tr: "Verim 300/500=%60 olduğu için bütün rapor tutarlıdır.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Toplam çıkış 300+250=550 J.",
        },
        explanation: {
          tr: "Toplam çıkış 300+250=550 J. Giriş 500 J; 50 Jeksik bilanço vardır. Veriler ve “başka giriş yok” iddiası birlikte tutarlı değildir; ek giriş, depolama veya ölçüm bilgisi yeniden denetlenmelidir.",
        },
        skill: "physics026-enerji-ve-hareket-20",
        guidance: {
          knowledge: [
            "Depolama değişimi yoksa bütün enerji girişleri bütün çıkışlara eşit olmalıdır.",
          ],
          strategy: "İki çıkışı topla; toplam girişle farkını bul.",
          steps: [
            "Toplam çıkış 300+250=550 J.",
            "Giriş 500 J; 50 Jeksik bilanço vardır.",
            "Veriler ve “başka giriş yok” iddiası birlikte tutarlı değildir; ek giriş, depolama veya ölçüm bilgisi yeniden denetlenmelidir.",
          ],
          optionReasons: [
            "Bu sayı verilen çıkışlarla korunum sağlamaz; toplam çıkış 550 J’dir.",
            "İki çıkışın farkı değil, toplamı 550 Jkullanılır.",
            "Tutarsız kayıt enerji yaratımını kanıtlamaz; eksik veya yanlış bilgi araştırılır.",
            "Doğru.550 J çıkış,500 J giriş ve 0 depo değişimiyle kapanmaz.",
            "Yararlı oran 0,60 olsa da diğer çıkışlarla toplam enerji hesabı kapanmıyor.",
          ],
          commonError:
            "Tek bir yararlı verim oranının uygun görünmesini tam enerji bilançosunun yerine koymak.",
          check:
            "500−550=−50 J; açık kalan fark ölçüm veya sistem sınırı denetimi ister.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-21",
        prompt: {
          tr: "Bir cisim+x yönünde 3 m/s süratle giderken seçilmiş sabit kuvvet−4 N. Bu kuvvetin o andaki gücü P=Fx·vxile veriliyor. Güç ve enerji aktarım yönü hangisidir?",
        },
        options: [
          {
            tr: "−12 W; bu kuvvet mekanik enerjiden çıkarma yönünde aktarır.",
          },
          {
            tr: "+7 W; kuvvet ve hız toplanır.",
          },
          {
            tr: "0 W; hız sabit olmak zorundadır.",
          },
          {
            tr: "−4 W; yalnız kuvvet yeterlidir.",
          },
          {
            tr: "+12 W; kuvvet mutlaka enerji ekler.",
          },
        ],
        answer: 0,
        hint: {
          tr: "P=(−4)·(+3)=−12 W.",
        },
        explanation: {
          tr: "P=(−4)·(+3)=−12 W. Kuvvet hızın ters yönündedir. Bu kuvvetin o anki aktarımı cismin mekanik enerjisini azaltma yönündedir; başka kuvvetlerin etkisi ayrıca olabilir.",
        },
        skill: "physics026-enerji-ve-hareket-21",
        guidance: {
          knowledge: [
            "Anlık güç kuvvet–hız skaler çarpımıdır; negatif işaret seçilmiş kuvvetin cismin mekanik enerjisinden enerji çıkarmasıyla uyumludur.",
          ],
          strategy: "İşaretli iki bileşeni çarp; J/sbirimini kullan.",
          steps: [
            "P=(−4)·(+3)=−12 W.",
            "Kuvvet hızın ters yönündedir.",
            "Bu kuvvetin o anki aktarımı cismin mekanik enerjisini azaltma yönündedir; başka kuvvetlerin etkisi ayrıca olabilir.",
          ],
          optionReasons: [
            "Doğru. İşaretli çarpım negatif; seçilmiş kuvvet için enerji çıkışı yönünü gösterir.",
            "Nile m/sdoğrudan toplanamaz; güçte skaler çarpım kullanılır.",
            "Kökte hızın o anki değeri verilmiştir; kuvvet hareketle dik değil zıttır.",
            "Anlık güç için hızla çarpım gerekir; NileWaynı birim değildir.",
            "İvme veya kuvvet büyüklüğünün işareti atlanmıştır; kuvvet−x’tir.",
          ],
          commonError:
            "Skaler gücün negatif olamayacağını sanmak veya seçilmiş kuvvet gücünden bütün net gücü çıkarmak.",
          check: "1 W=1 N·m/s;−4 N·3 m/s=−12 J/s.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-22",
        prompt: {
          tr: "Hidrojen, suyun elektroliziyle dışarıdan verilen elektrik kullanılarak üretiliyor; sonra bir aygıtta yakıt olarak kullanılıyor. Elektriğin hangi kaynaktan geldiği verilmemiş. Hangi yorum doğrudur?",
        },
        options: [
          {
            tr: "Yenilenebilir kaynaklar her saniye aynı güç verir.",
          },
          {
            tr: "Hidrojen her üretim yolunda kesin sıfır çevresel etkilidir.",
          },
          {
            tr: "Elektrik harcanınca enerji yok olmuştur.",
          },
          {
            tr: "Hidrojen taşıyıcıdır; üretim kaynağı bilinmeden zorunlu yenilenebilir denemez.",
          },
          {
            tr: "Sudan elde edildiği için enerji girişi gerekmez.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Elektroliz için dışarıdan enerji verildiği açık.",
        },
        explanation: {
          tr: "Elektroliz için dışarıdan enerji verildiği açık. Hidrojen bu enerjiyi başka biçimde taşıma/depolama yoludur. Elektriğin kaynağı bilinmeden hidrojenin mutlaka yenilenebilir veya sıfır etkili olduğu sonucu çıkmaz.",
        },
        skill: "physics026-enerji-ve-hareket-22",
        guidance: {
          knowledge: [
            "Üretilmiş hidrojen enerji taşıyıcısı olabilir; üretim yönteminin kaynağı yenilenebilir niteliğini etkiler.",
          ],
          strategy:
            "Hidrojenin kullanımıyla onu üretmek için sağlanan enerji kaynağını ayır.",
          steps: [
            "Elektroliz için dışarıdan enerji verildiği açık.",
            "Hidrojen bu enerjiyi başka biçimde taşıma/depolama yoludur.",
            "Elektriğin kaynağı bilinmeden hidrojenin mutlaka yenilenebilir veya sıfır etkili olduğu sonucu çıkmaz.",
          ],
          optionReasons: [
            "Yenilenebilirlik üretimin zamandan bağımsız sabit olduğunu söylemez.",
            "Üretim, elektrik kaynağı ve yaşam döngüsü etkileri ayrıca gerekir.",
            "Enerji kimyasal ve diğer türlere dönüşebilir; yoktan var veya yok olmaz.",
            "Doğru. Taşıyıcı ile birincil enerji kaynağı ayrıdır.",
            "Kök elektrolize elektrik verildiğini açıkça söylüyor.",
          ],
          commonError:
            "Yakıtın adını üretim kaynağından ve tam enerji hesabından bağımsız bir etiket saymak.",
          check:
            "Hidrojenin kullanıldığı yerdeki çıktı, üretim enerjisinin nereden geldiği bilgisini kendiliğinden vermez.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-23",
        prompt: {
          tr: "1 kg cisim 2 m yüksekte durgun başlıyor; g=10 m/s². Son durumda aynı referansa göre yükseklik 0; ideal yatay yay en çok sıkıştığı için cisim anlık durgun. Bu aralıkta toplam 5 Jiç enerjiye aktarılmış; başka giriş/çıkış yok. Yayk=120 N/m. Maksimum sıkışma büyüklüğü nedir?",
        },
        options: [
          {
            tr: "−0,50 m",
          },
          {
            tr: "√(1/3)m",
          },
          {
            tr: "1 m",
          },
          {
            tr: "0,50 m",
          },
          {
            tr: "0,25 m",
          },
        ],
        answer: 3,
        hint: {
          tr: "Başlangıç enerji 1·10·2=20 J; ilk ve sonK 0.",
        },
        explanation: {
          tr: "Başlangıç enerji 1·10·2=20 J; ilk ve sonK 0. Son yay enerjisi 20−5=15 J. 15=½·120·x²=60 x²; x²=1/4; x=0,50 mbüyüklüğü bulunur.",
        },
        skill: "physics026-enerji-ve-hareket-23",
        guidance: {
          knowledge: [
            "Başlangıç yerçekimi enerjisi son yay enerjisi ve belirtilen iç enerji artışı arasında paylaşılır.",
          ],
          strategy: "Yayda kalacak enerjiyi bul;½kx² denklemini çöz.",
          steps: [
            "Başlangıç enerji 1·10·2=20 J; ilk ve sonK 0.",
            "Son yay enerjisi 20−5=15 J.",
            "15=½·120·x²=60 x²; x²=1/4; x=0,50 mbüyüklüğü bulunur.",
          ],
          optionReasons: [
            "Sapma işareti eksene bağlı olabilir; istenen sıkışma büyüklüğü negatif değildir.",
            "20 J’nin tamamı yaya verilmiş; 5 Jiç enerji artışı atlanmıştır.",
            "Bu 60 Jyay enerjisi gerektirir; eldeki 15 J’yi aşar.",
            "Doğru.15 Jyay enerjisi 120 N/m ile 0,5 msıkışma verir.",
            "x²=0,25 sonucu doğrudan xsanılmış; karekök alınmamıştır.",
          ],
          commonError:
            "İç enerji artışını atlamak veya enerji denkleminden çıkanx² yi xsaymak.",
          check: "½·120·0,5²=15 J; 15+5=20 J başlangıçla eşittir.",
        },
      },
      {
        id: "f026p-enerji-ve-hareket-24",
        prompt: {
          tr: "Bir sistemin seçilmiş mekanik enerji terimleri K+Uyer+Uyay.2 kg cisim 3 m/s süratli; bulunduğu düzlemde Uyer=0 seçilmiş. k=100 N/myay doğal boydan 0,20 m sapmış. Bu mekanik toplam nedir ve Uyer=0 ne demektir?",
        },
        options: [
          {
            tr: "9 J; yay enerji depolamaz.",
          },
          {
            tr: "2 J; sürat varsa enerji ayrıca sayılamaz.",
          },
          {
            tr: "0 J; bir terim 0 isebütün enerji 0 olur.",
          },
          {
            tr: "13 J; yerçekimi enerjisi 2 Jeklenir.",
          },
          {
            tr: "11 J; yalnız yerçekimi potansiyelinin referansı 0’dır.",
          },
        ],
        answer: 4,
        hint: {
          tr: "K=½·2·3²=9 J.",
        },
        explanation: {
          tr: "K=½·2·3²=9 J. Uyay=½·100·0,20²=2 J; Uyer=0. Mekanik toplam 11 J; yerçekimi referansı 0 olması bütün enerjinin 0 olduğu anlamına gelmez.",
        },
        skill: "physics026-enerji-ve-hareket-24",
        guidance: {
          knowledge: [
            "Bir potansiyel teriminin sıfır referansı, diğer enerji terimlerini sıfırlamaz.",
          ],
          strategy:
            "Kinetik ve yay depolarını ayrı hesapla; seçilen 0 yerçekimi terimini ekle.",
          steps: [
            "K=½·2·3²=9 J.",
            "Uyay=½·100·0,20²=2 J; Uyer=0.",
            "Mekanik toplam 11 J; yerçekimi referansı 0 olması bütün enerjinin 0 olduğu anlamına gelmez.",
          ],
          optionReasons: [
            "Verilen sapma ve pozitifkile yay enerjisi 2 J’dir.",
            "Kinetik ve potansiyel aynı sistemde birlikte bulunabilir.",
            "Toplamda diğer iki pozitif terim bulunur; çarpım değil toplamdır.",
            "Uyer 0 açık verilmiş; ek 2 Jyerçekimi katkısı uydurulmuştur.",
            "Doğru.9 Jkinetik ve 2 Jyay enerjisi toplamda kalır.",
          ],
          commonError:
            "Potansiyelin sıfır seçimini bütün fiziksel enerjinin yokluğu saymak.",
          check:
            "9+0+2=11 J; başka iç veya kimyasal enerji türleri bu mekanik toplamın tanımı dışındadır.",
        },
      },
    ],
    source:
      "MEBİ TYT Fizik ile OGM Dersler Cepte kaynakları karşılaştırılarak hazırlanmış özgün derin öğretim. Önkoşullar, ölçüm/model sınırları ve kaynaklardaki aşırı genellemeler bilimsel denetimle ayrılmıştır. Sorular ve çözümlü örnekler özgündür; resmî sınav sorusu değildir.",
  },
];
export const forge026PhysicsGuides: LessonGuide[] = packs026.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: p.source,
}));
export const forge026PhysicsLessons: Lesson[] = packs026.map((p) => ({
  id: p.id + "-ileri",
  subjectId: "tyt-fizik",
  title: txt(p.title + " — İleri özgün sorular"),
  minutes: 50,
  objectives: p.objectives.map(txt),
  body: [],
  questions: p.questions,
  source: txt(p.source),
  tags: [p.detail, "soru-seti", "özgün-öğretim", "forge026"],
}));
export const forge026PhysicsTopics: Record<string, string> = Object.fromEntries(
  packs026.map((p) => [p.id + "-ileri", p.detail]),
);
