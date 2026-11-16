import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";
import type { QuestionGuidance } from "../domain/questionHelpModel";

export const PHYSICS024 = {
  c: 299792458,
  h: 6.62607015e-34,
  e: 1.602176634e-19,
  k: 1.380649e-23,
  me: 9.1093837139e-31,
  sigma: 5.670374419e-8,
  wien: 2.897771955e-3,
} as const;
const hc024 = ((PHYSICS024.h * PHYSICS024.c) / PHYSICS024.e) * 1e9;
const scope024 = (n: number, lo: number, hi: number) =>
  typeof n === "number" && Number.isFinite(n) && n >= lo && n <= hi;
const integer024 = (n: number, lo: number, hi: number) =>
  Number.isInteger(n) && scope024(n, lo, hi);
/** A comoving one-dimensional teaching grid: no peculiar velocity, no claim to solve a cosmological history. */
export function cosmicScale024(
  emittedScale: number,
  receivedScale: number,
  observer: number,
) {
  if (
    !scope024(emittedScale, 0.25, 4) ||
    !scope024(receivedScale, emittedScale, 4) ||
    !integer024(observer, 0, 4)
  )
    throw new RangeError("COSMIC024_SCOPE");
  const points = [-2, -1, 0, 1, 2];
  return {
    emittedScale,
    receivedScale,
    observer,
    redshift: receivedScale / emittedScale - 1,
    wavelengthRatio: receivedScale / emittedScale,
    galaxies: points.map((x, i) => ({
      i,
      comoving: x,
      before: (x - points[observer]) * emittedScale,
      after: (x - points[observer]) * receivedScale,
    })),
  };
}
const quarkCharge024 = {
  u: 2,
  d: -1,
  s: -1,
  c: 2,
  b: -1,
  t: 2,
  antiU: -2,
  antiD: 1,
  antiS: 1,
  antiC: -2,
  antiB: 1,
  antiT: -2,
} as const;
export type Quark024 = keyof typeof quarkCharge024;
/** Valence bookkeeping only; an allowed count is not a proof of a particular stable hadron. */
export function quarkLedger024(parts: readonly Quark024[]) {
  if (
    !Array.isArray(parts) ||
    parts.length < 1 ||
    parts.length > 3 ||
    Array.from(parts).some(
      (p) => typeof p !== "string" || !Object.hasOwn(quarkCharge024, p),
    )
  )
    throw new RangeError("QUARK024_SCOPE");
  const anti = parts.filter((p) => p.startsWith("anti")).length,
    chargeThirds = parts.reduce(
      (n: number, p: Quark024) => n + quarkCharge024[p],
      0,
    ),
    baryonThirds = parts.length - 2 * anti;
  const family =
    parts.length === 3 && anti === 0
      ? "baryon"
      : parts.length === 3 && anti === 3
        ? "antibaryon"
        : parts.length === 2 && anti === 1
          ? "meson"
          : "yalin-hadron-kurali-saglanmiyor";
  return {
    parts: [...parts],
    chargeThirds,
    charge: chargeThirds / 3,
    baryonThirds,
    baryonNumber: baryonThirds / 3,
    family,
  };
}
export type Decay024 = "alpha" | "betaMinus" | "betaPlus" | "capture" | "gamma";
/** Conserved A/Z ledger for a stipulated allowed decay; does not decide isotope stability or Q-value. */
export function decayLedger024(A: number, Z: number, mode: Decay024) {
  if (
    !integer024(A, 1, 300) ||
    !integer024(Z, 0, Math.min(A, 118)) ||
    !["alpha", "betaMinus", "betaPlus", "capture", "gamma"].includes(mode)
  )
    throw new RangeError("DECAY024_SCOPE");
  const dA = mode === "alpha" ? -4 : 0,
    dZ =
      mode === "alpha"
        ? -2
        : mode === "betaMinus"
          ? 1
          : mode === "gamma"
            ? 0
            : -1;
  const daughterA = A + dA,
    daughterZ = Z + dZ;
  if (
    !integer024(daughterA, 1, 300) ||
    !integer024(daughterZ, 0, Math.min(daughterA, 118))
  )
    throw new RangeError("DECAY024_DAUGHTER");
  return {
    A,
    Z,
    N: A - Z,
    mode,
    daughterA,
    daughterZ,
    daughterN: daughterA - daughterZ,
    emittedCharge:
      mode === "alpha"
        ? 2
        : mode === "betaMinus"
          ? -1
          : mode === "betaPlus"
            ? 1
            : 0,
    absorbedCharge: mode === "capture" ? -1 : 0,
    lepton:
      mode === "betaMinus"
        ? "elektron + elektron antinötrinosu"
        : mode === "betaPlus"
          ? "pozitron + elektron nötrinosu"
          : mode === "capture"
            ? "elektron alınır; elektron nötrinosu çıkar"
            : "lepton yok",
  };
}
export function halfLife024(initial: number, halfLife: number, time: number) {
  if (
    !scope024(initial, 0, 1e18) ||
    !scope024(halfLife, 1e-9, 1e12) ||
    !scope024(time, 0, 1e12)
  )
    throw new RangeError("HALFLIFE024_SCOPE");
  const lambda = Math.LN2 / halfLife,
    fraction = Math.exp(-lambda * time),
    remaining = initial * fraction;
  return {
    initial,
    halfLife,
    time,
    lambda,
    fraction,
    remaining,
    decayed: initial * -Math.expm1(-lambda * time),
    activity: lambda * remaining,
  };
}
/** Units: proper/lab time same; lengths same; rest, total and kinetic energies in MeV; momentum MeV/c. */
export function relativity024(
  beta: number,
  properTime: number,
  properLength: number,
  restEnergyMeV: number,
) {
  if (
    !scope024(beta, 0, 0.999999) ||
    !scope024(properTime, 0, 1e6) ||
    !scope024(properLength, 0, 1e9) ||
    !scope024(restEnergyMeV, 1e-9, 1e9)
  )
    throw new RangeError("RELATIVITY024_SCOPE");
  const gamma = 1 / Math.sqrt((1 - beta) * (1 + beta)),
    gammaMinusOne = (beta * beta * gamma * gamma) / (gamma + 1);
  return {
    beta,
    gamma,
    gammaMinusOne,
    properTime,
    labTime: gamma * properTime,
    properLength,
    labLength: properLength / gamma,
    restEnergyMeV,
    totalMeV: gamma * restEnergyMeV,
    kineticMeV: gammaMinusOne * restEnergyMeV,
    momentumMeVC: gamma * restEnergyMeV * beta,
  };
}
/** Lorentz transform, S' moves +beta c in S; ct and x use the same length unit. */
export function eventTransform024(beta: number, ct: number, x: number) {
  if (
    !scope024(beta, -0.99, 0.99) ||
    !scope024(ct, -1e6, 1e6) ||
    !scope024(x, -1e6, 1e6)
  )
    throw new RangeError("EVENT024_SCOPE");
  const gamma = 1 / Math.sqrt((1 - beta) * (1 + beta));
  return { ctPrime: gamma * (ct - beta * x), xPrime: gamma * (x - beta * ct) };
}
/** Planck spectral radiance B_lambda in W sr^-1 m^-3, wavelength input nm. */
export function planck024(temperature: number, wavelengthNm: number) {
  if (!scope024(temperature, 500, 12000) || !scope024(wavelengthNm, 50, 50000))
    throw new RangeError("PLANCK024_SCOPE");
  const l = wavelengthNm * 1e-9,
    exponent = (PHYSICS024.h * PHYSICS024.c) / (l * PHYSICS024.k * temperature);
  return (
    (2 * PHYSICS024.h * PHYSICS024.c ** 2) / (l ** 5 * Math.expm1(exponent))
  );
}
export function blackbody024(temperature: number, area: number) {
  if (!scope024(temperature, 500, 12000) || !scope024(area, 0.001, 1000))
    throw new RangeError("BLACKBODY024_SCOPE");
  return {
    temperature,
    area,
    peakNm: (PHYSICS024.wien / temperature) * 1e9,
    exitance: PHYSICS024.sigma * temperature ** 4,
    power: area * PHYSICS024.sigma * temperature ** 4,
    spectrum: Array.from({ length: 161 }, (_, i) => {
      const wavelengthNm = 50 * 1000 ** (i / 160);
      return { wavelengthNm, radiance: planck024(temperature, wavelengthNm) };
    }),
  };
}
/** Single-photon external photoemission; eta is stipulated yield, not a measured I-V curve. Bias = V_anode - V_cathode. */
export function photoelectric024(
  photonEV: number,
  workEV: number,
  photonFlux: number,
  yieldFraction: number,
  biasV: number,
) {
  if (
    !scope024(photonEV, 1e-9, 100) ||
    !scope024(workEV, 1e-9, 20) ||
    !scope024(photonFlux, 0, 1e18) ||
    !scope024(yieldFraction, 0, 1) ||
    !scope024(biasV, -100, 100)
  )
    throw new RangeError("PHOTO024_SCOPE");
  const allowed = photonEV >= workEV,
    maxKineticEV = allowed ? photonEV - workEV : null,
    arrivalEV = maxKineticEV === null ? null : maxKineticEV + biasV;
  return {
    allowed,
    photonEV,
    workEV,
    photonFlux,
    yieldFraction,
    biasV,
    frequencyHz: (photonEV * PHYSICS024.e) / PHYSICS024.h,
    wavelengthNm: hc024 / photonEV,
    thresholdHz: (workEV * PHYSICS024.e) / PHYSICS024.h,
    thresholdNm: hc024 / workEV,
    maxKineticEV,
    stoppingV: maxKineticEV,
    arrivalEV,
    canArrive: arrivalEV !== null && arrivalEV > 0,
    saturationUpperA: allowed ? PHYSICS024.e * yieldFraction * photonFlux : 0,
    opticalPowerW: photonEV * PHYSICS024.e * photonFlux,
  };
}
/** Initially free, stationary electron; lambda in pm, energy keV, recoil momentum keV/c. */
export function compton024(wavelengthPm: number, angleDegrees: number) {
  if (!scope024(wavelengthPm, 0.01, 1e7) || !scope024(angleDegrees, 0, 180))
    throw new RangeError("COMPTON024_SCOPE");
  const rad = (angleDegrees * Math.PI) / 180,
    sinHalf = Math.sin(rad / 2),
    oneMinusCos = 2 * sinHalf * sinHalf,
    sin =
      angleDegrees === 0 || angleDegrees === 180
        ? 0
        : angleDegrees === 90
          ? 1
          : Math.sin(rad),
    cos = angleDegrees === 90 ? 0 : Math.cos(rad);
  const comptonPm = (PHYSICS024.h / (PHYSICS024.me * PHYSICS024.c)) * 1e12,
    shiftPm = comptonPm * oneMinusCos,
    scatteredPm = wavelengthPm + shiftPm,
    initialKeV = hc024 / wavelengthPm,
    scatteredKeV = hc024 / scatteredPm,
    kineticKeV = (initialKeV * shiftPm) / scatteredPm;
  return {
    wavelengthPm,
    angleDegrees,
    comptonPm,
    shiftPm,
    scatteredPm,
    initialKeV,
    scatteredKeV,
    kineticKeV,
    recoilX: kineticKeV + scatteredKeV * oneMinusCos,
    recoilY: -scatteredKeV * sin,
    photonX: scatteredKeV * cos,
    photonY: scatteredKeV * sin,
  };
}
/** Electron accelerated from rest through positive voltage; includes relativistic momentum correction. */
export function electronWave024(voltage: number) {
  if (!scope024(voltage, 1e-9, 1e7)) throw new RangeError("ELECTRON024_SCOPE");
  const kineticJ = PHYSICS024.e * voltage,
    restJ = PHYSICS024.me * PHYSICS024.c ** 2,
    nonrelP = Math.sqrt(2 * PHYSICS024.me * kineticJ),
    momentum = nonrelP * Math.sqrt(1 + kineticJ / (2 * restJ));
  return {
    voltage,
    kineticJ,
    momentum,
    wavelengthPm: (PHYSICS024.h / momentum) * 1e12,
    nonrelPm: (PHYSICS024.h / nonrelP) * 1e12,
    kineticToRest: kineticJ / restJ,
  };
}
/** Ideal monochromatic primary transmission through a 3 by 3 map. mu in cm^-1, cell path in cm. No scatter or CT reconstruction. */
export function attenuation024(
  cells: readonly number[],
  cellCm: number,
  incident: number,
) {
  if (
    !Array.isArray(cells) ||
    cells.length !== 9 ||
    Array.from(cells).some((x) => !scope024(x, 0, 3)) ||
    !scope024(cellCm, 0.1, 10) ||
    !scope024(incident, 1, 1e9)
  )
    throw new RangeError("ATTENUATION024_SCOPE");
  const rowDepths = [0, 1, 2].map(
      (r) => cells.slice(3 * r, 3 * r + 3).reduce((a, b) => a + b, 0) * cellCm,
    ),
    columnDepths = [0, 1, 2].map(
      (c) => (cells[c] + cells[c + 3] + cells[c + 6]) * cellCm,
    );
  return {
    rowDepths,
    columnDepths,
    rows: rowDepths.map((t) => incident * Math.exp(-t)),
    columns: columnDepths.map((t) => incident * Math.exp(-t)),
  };
}
export function echoDistance024(speed: number, roundTripSeconds: number) {
  if (
    !scope024(speed, 100, PHYSICS024.c) ||
    !scope024(roundTripSeconds, 0, 100)
  )
    throw new RangeError("ECHO024_SCOPE");
  return (speed * roundTripSeconds) / 2;
}
export function bandgap024(gapEV: number, wavelengthNm: number) {
  if (!scope024(gapEV, 0.1, 6) || !scope024(wavelengthNm, 100, 20000))
    throw new RangeError("BANDGAP024_SCOPE");
  const cutoffNm = hc024 / gapEV,
    allowed = wavelengthNm <= cutoffNm,
    photonEV = wavelengthNm === cutoffNm ? gapEV : hc024 / wavelengthNm;
  return {
    gapEV,
    wavelengthNm,
    photonEV,
    allowed,
    cutoffNm,
    excessEV: allowed ? Math.max(0, photonEV - gapEV) : null,
  };
}

type Item024 = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  guidance: QuestionGuidance;
};
type Pack024 = LessonGuide & { topic: string; title: string; items: Item024[] };

const packs024: Pack024[] = [
  {
    id: "buyuk-patlama-atomalti",
    topic: "detail-397",
    title: "Bigbang teorisi ve atomaltı parçacıklar",
    minutes: 115,
    objectives: [
      "Evrenin genişlemesini sıcak erken evrenin kanıtlarıyla ilişkilendir.",
      "Kuark, lepton, hadron ve bozon sınıflarını yük ve bileşimle ayır.",
      "Temel etkileşimleri, antimaddeyi ve Standart Modelin sınırlarını açıkla.",
    ],
    sections: [
      {
        title: "Başlangıç araçları: tayf, ölçek, sınıflama",
        paragraphs: [
          "Bu konu için dalga boyu-frekans ilişkisi c=λf, elektrik yükünün korunumu ve atomun çekirdek-elektron ayrımı gerekir. Tayftaki çizgiler belirli atom geçişlerini tanımaya yarar; bir çizginin kayması ile yalnız parlaklığın azalması farklı ölçümlerdir.",
          "Ölçek katsayısı, aynı uzaysal işaretler arasındaki uzaklığın ne kadar değiştiğini anlatan boyutsuz bir çarpandır. Parçacık tablolarını okurken elektrik yükünü e birimiyle, spini ise ħ birimiyle verilen kuantum sayısıyla izle; bunlar farklı fiziksel niceliklerdir.",
        ],
      },
      {
        title: "Sıcak ve yoğun erken evren",
        paragraphs: [
          "Büyük Patlama modeli, evrenin geçmişte daha sıcak ve yoğun olduğunu, genişleyip soğudukça bugünkü yapılara giden süreçlerin gerçekleştiğini açıklar. Önceden boş duran bir salonun içinde patlayan madde yığını resmi doğru başlangıç değildir.",
          "Modelin güçlü olduğu dönemlerle başlangıç tekilliğine ilişkin açık sorular ayrılır. Yaklaşık 13,8 milyar yıllık yaş bir gözlem-model çıkarımıdır. Bu sayı tek başına evrenin toplam boyutunu veya evren dışındaki bir patlama merkezini vermez.",
        ],
      },
      {
        title: "Genişleyen şey hangi uzaklık?",
        paragraphs: [
          "Kozmolojik ölçekte birbirine kütleçekimle bağlı olmayan galaksi grupları arasındaki tipik uzaklıklar artar. Kütleçekimle bağlı bir galaksinin yıldızları, Güneş sistemi ve atomlar bu ölçekle zorunlu olarak şişmez.",
          "Yerel hareketler genişleme üzerine eklenir. Yakın bir galaksi bize yaklaşabilir; bu durum büyük ölçekli genişleme bulgularını çürütmez. Yalnız bir galaksinin hareketinden bütün evren için sonuç çıkarmadan önce örneklemin ölçeğini belirt.",
        ],
      },
      {
        title: "Balon benzetmesini doğru kullan",
        paragraphs: [
          "Balon yüzeyindeki noktalar birbirinden uzaklaştığında yüzey üzerinde ayrıcalıklı bir merkez seçmek gerekmez. Yüzeyden herhangi bir nokta gözlemci seçilince uzaktaki işaretlerin uzaklık artışı daha büyük olur.",
          "Benzetme iki boyutlu bir yüzeyi kullanır; balonun odadaki merkezi evrenin fiziksel merkezi diye alınamaz. Noktaların büyüklükleri sabit çizilebilir: benzetmenin amacı galaksinin büyümesi değil aralıkların ölçeklenmesidir.",
        ],
      },
      {
        title: "Kırmızıya kayma bir oran ölçümüdür",
        paragraphs: [
          "z=(λalınan−λyayılan)/λyayılan tanımı, aynı tayf çizgisinin dalga boyu değişimini ölçer. z>0 kırmızıya, z<0 maviye kaymadır; frekans oranı dalga boyu oranının tersidir.",
          "Homojen genişleme modelinde 1+z=aalınan/ayayılan olur. Bu kozmolojik bağıntı, her uzaklıkta sıradan özel görelilik Doppler formülünün yerine yazılmasıyla türetilmez; yerel hareket ve kütleçekimi de gözlenen kaymaya katkı verebilir.",
        ],
      },
      {
        title: "Hubble ilişkisi ve yakın uzaklık sınırı",
        paragraphs: [
          "Yakın kozmolojik uzaklıklarda ortalama uzaklaşma hızı yaklaşık v=Hd ile betimlenir. H birim uzaklık başına hız boyutundadır; iki kat uzaktaki eş hareketli grup için yaklaşık iki kat uzaklaşma çıkar.",
          "Bu hız, uzak yerlerin aralık artışını anlatır. Onu bir parçacığın yanımızdan ölçülen yerel hızıyla özdeşleştirme. Çok büyük uzaklıklarda basit doğrusal hız ve SR Doppler yorumları yerine kozmolojik model gerekir.",
        ],
      },
      {
        title: "Kozmik mikrodalga art alanı",
        paragraphs: [
          "Erken evren yeterince soğuyunca elektronlar çekirdeklere bağlandı ve ışık madde tarafından eskisi kadar sık saçılmadan ilerleyebildi. Yaklaşık 380 bin yıl sonraki bu dönemin ışığı bugün genişleme nedeniyle mikrodalga bölgesindedir.",
          "Art alanın yaklaşık 2,7 K termal tayfı ve gökyüzündeki küçük düzensizlikleri sıcak erken evren modelini destekler. Haritadaki renkler gözle görülen sıcak-soğuk lekelerin fotoğrafı değil, çok küçük sıcaklık farklarının görselleştirilmesidir.",
        ],
      },
      {
        title: "İlk çekirdeklerden yıldızlara",
        paragraphs: [
          "İlk dakikalardaki nükleosentez hafif çekirdek bollukları için öngörü üretir; nötr atomlar daha sonra, ilk yıldızlar ise çok daha sonra oluşur. Çekirdek oluşumu ile elektronların bağlanmasını aynı olay diye adlandırma.",
          "Yıldızlarda ve yıldızların evrimindeki başka süreçlerde daha ağır elementler üretilir. Evren soğudukça bütün maddelerin aynı anda bugünkü gezegenler hâline geldiği sonucu çıkmaz; farklı fiziksel süreçler farklı zaman ölçeklerinde işler.",
        ],
      },
      {
        title: "Kanıtları birlikte değerlendirme",
        paragraphs: [
          "Uzak galaksilerin sistematik tayf kaymaları, kozmik mikrodalga art alanı ve hafif element bollukları birbirini tamamlayan bulgulardır. Birbirinden farklı ölçümlerin aynı modelle açıklanması tek benzetmeden daha güçlü destek sağlar.",
          "Bilimsel model, gözlemi açıklayıp sınanabilir sonuç üretir. Bir modelin açıklayamadığı en erken dönem sorusu bulunması, sınandığı bütün dönemlerin açıklamasını otomatik geçersiz yapmaz; destek derecesi ve kapsam ayrı yazılır.",
        ],
      },
      {
        title: "Karanlık madde ile karanlık enerji",
        paragraphs: [
          "Karanlık madde, ışıkla doğrudan kolay saptanamayan ve kütleçekimsel etkileriyle çıkarılan madde bileşenidir. Karanlık enerji ise hızlanan kozmolojik genişlemeyi açıklamakta kullanılan ayrı bir bileşen adıdır.",
          "Yakın dönem model çıkarımlarında yaklaşık%5 sıradan madde,%27 karanlık madde,%68 karanlık enerji değerleri kullanılır. Bunlar değişmez tanım sayıları değildir; bu bileşenlerin mikroskobik doğaları kesin çözülmüş diye anlatılmaz.",
        ],
      },
      {
        title: "Atomdan temel parçacığa",
        paragraphs: [
          "Atom çekirdek ve elektronlardan oluşur; çekirdek proton ve nötron içerir. Proton ve nötronun iç yapısı vardır, elektron ise güncel Standart Modelde temel lepton olarak ele alınır.",
          "Temel sözcüğü küçük veya hafif demek değildir; deneylerin ulaştığı ölçekte daha küçük bileşen yapısı bulunmamış olmasını anlatır. Bir parçacığın elektrikçe nötr olması, onun temel veya kararlı olduğunu tek başına göstermez.",
        ],
      },
      {
        title: "Kuarkların yük defteri",
        paragraphs: [
          "Altı kuark türü u, d, c, s, t, b ile gösterilir. u, c, t kuarklarının yükü+2e/3; d, s, b kuarklarının yükü−e/3 tür. Her kuarkın baryon sayısı 1/3 tür; elektrik yükü ile baryon sayısını aynı sütun gibi kullanma.",
          "Antikuarkın yükü ve baryon sayısı işaret değiştirir. Antiu yükü−2e/3, antid yükü+e/3 tür. Bileşiğin yükü bileşen yüklerinin toplamından hesaplanır; kuark sayısını toplam yük yerine yazmak sonuç vermez.",
        ],
      },
      {
        title: "Hadron, baryon ve mezon",
        paragraphs: [
          "Hadron güçlü etkileşime katılan bileşik parçacık ailesidir. Bu düzeydeki sade valans modelinde baryon üç kuark, antibaryon üç antikuark, mezon kuark-antikuark içerir; daha karmaşık hadronlar da bilinmektedir.",
          "Protonun valans yapısı uud, nötronunki udd dir. Bir kuark ve kendi antikuarkının toplam elektrik yükü sıfır olabilir; fakat mezonların tümü elektrikçe nötr değildir. Aile adı tek başına parçacığın kütlesini veya ömrünü belirlemez.",
        ],
      },
      {
        title: "Leptonlar ve nötrinolar",
        paragraphs: [
          "Elektron, müon, tau ile bunların nötrinoları leptonlardır. Elektron-müon-tau yükü−e, nötrinoların elektrik yükü sıfırdır. Leptonlar güçlü etkileşime katılmaz; yüklü olanlar elektromanyetik etkileşime de katılır.",
          "Elektron nötrinosu elektronun antiparçacığı değildir; elektronun antiparçacığı pozitrondur. Nötrinoların nötr olması bütün etkileşimlere kapalı oldukları anlamına gelmez; zayıf etkileşimleri onların saptanmasını mümkün kılar.",
        ],
      },
      {
        title: "Spin ile yapılan sınıflama",
        paragraphs: [
          "Spin kuantum özelliğidir; klasik bir bilyenin dönmesine indirgenmez. Tam sayı spinli parçacıklara bozon, yarım tam sayı spinli parçacıklara fermiyon denir; elektron ve kuarklar spin 1/2 fermiyondur.",
          "Özdeş fermiyonlar aynı tam kuantum durumunu paylaşamaz; bu Pauli ilkesidir. Bozonların aynı durumu paylaşabilmesi lazer gibi sistemlerle ilişkilidir. Bütün bozonların kuvvet taşıyıcısı olduğu sonucu çıkmaz; Higgs bozonu önemli karşı örnektir.",
        ],
      },
      {
        title: "Güçlü ve elektromanyetik etkileşim",
        paragraphs: [
          "Güçlü etkileşimin temel taşıyıcıları gluonlardır; kuarkları hadronlarda bağlar. Çekirdekte proton-nötron bağlanması güçlü etkileşimin artık etkisiyle ilişkilidir. Elektromanyetik etkileşimin taşıyıcısı fotondur.",
          "Nötr bir bileşik parçacık içindeki yükler nedeniyle elektromanyetik yapıya sahip olabilir; yalnız net yük tablosundan tüm ayrıntı çıkarılmaz. Fotonun elektrik yükü ve durgun kütlesi sıfırdır, fakat enerjisi ile momentumu sıfır olmak zorunda değildir.",
        ],
      },
      {
        title: "Zayıf etkileşim ve kütleçekimi",
        paragraphs: [
          "Zayıf etkileşim W⁺, W⁻ ve Z bozonlarıyla ilişkilidir; beta bozunmaları ile nötrinoların etkileşimlerinde rol oynar. Kuark türünün değişmesi bir elektrik yükü defteriyle birlikte izlenebilir.",
          "Kütleçekimi dört temel etkileşimden biridir; güncel Standart Modelin parçası değildir. Graviton varsayımsal taşıyıcıdır, deneysel keşif gibi yazılmaz. Kuvvet şiddetini verirken ölçek ve karşılaştırılan parçacıklar belirtilmeden evrensel sayısal sıralama kurulmaz.",
        ],
      },
      {
        title: "Higgs alanı ve modelin sınırları",
        paragraphs: [
          "Higgs mekanizması temel parçacıkların kütleleriyle ilişkilidir; Higgs bozonunun 2012 keşfi bu alan betiminin sınanmasında önemlidir. W bozonunun nötrondan ağır oluşundan eksik kütle arayıp Higgs bulma öyküsü doğru açıklama değildir.",
          "Protonun kütlesinin büyük bölümü kuark-gluon sisteminin enerjisinden gelir; bütün kütleyi yalnız Higgs ile doğrudan özdeşleştirme. Standart Model güçlü, zayıf ve elektromanyetik etkileşimleri betimler; karanlık maddenin doğası ve kütleçekimi için tamamlanmış bir çözüm sunmaz.",
        ],
      },
      {
        title: "Antimadde ve korunmuş nicelikler",
        paragraphs: [
          "Elektronla pozitron aynı durgun kütleye, zıt elektrik yüküne sahiptir. Antiprotonun yükü−e dir; nötron ve antinötronun ikisi de nötr olması onların aynı parçacık olduğunu göstermez.",
          "Parçacık-antiparçacık yok oluşunda enerji ve momentum korunur; yok olmak hiçbir şey kalmaması değildir. Başlangıçta toplam momentumu sıfır olan serbest elektron-pozitron çiftinin iki zıt yönlü fotona dönüşmesi hem enerjiyi hem momentumu dengeler.",
        ],
      },
      {
        title: "Hızlandırıcıda ne ölçülür?",
        paragraphs: [
          "Elektrik alanı yüklü parçacığa enerji verebilir; manyetik alan yönünü değiştirebilir. Çarpışma enerjisi yeni parçacıkların durgun enerjisine ve hareket enerjisine gidebilir; dedektörler izleri ve son ürünleri ölçer.",
          "Hızlandırıcı evrenin tamamını laboratuvarda yeniden yaratmaz; erken evrenle ilgili yüksek enerji süreçlerini sınar. Bir şemada iki farklı parçacığı seçip yük toplamını ve aileyi hesaplamak da model kurmadır; şema tek başına kararlılık tahmini değildir.",
        ],
      },
    ],
    examples: [
      {
        title: "İki gözlemci aynı genişlemeyi ölçer",
        prompt:
          "Bir doğru üzerindeki eş hareketli noktalar x=−3,0,4 birimdedir. Ölçek 1 den 1,5 a çıkıyor. Önce x=0, sonra x=−3 gözlemci seçilirse diğer noktaların uzaklık artışlarını bul.",
        strategy:
          "Önce işaretli konum farkını, sonra ölçek değişimiyle uzaklığın artışını hesapla.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Ortadaki gözlemci için ilk uzaklıklar 3 ve 4; son uzaklıklar 4,5 ve 6 olur. Artışlar 1,5 ve 2 dir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Soldaki gözlemci için ilk uzaklıklar 3 ve 7; son uzaklıklar 4,5 ve 10,5 olur. Artışlar 1,5 ve 3,5 tir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Her iki gözlemci de daha uzaktaki noktanın daha fazla uzaklık kazandığını bulur; özel bir merkez seçmek gerekmez.",
          },
        ],
        answer: "Artışlar sırasıyla(1,5;2) ve(1,5;3,5) birim.",
        check: "Her uzaklığın son/ilk oranı 1,5 olmalı.",
        pitfall:
          "Koordinatı doğrudan uzaklık sayma; gözlemcinin konumunu çıkar.",
      },
      {
        title: "Kaymış çizginin enerji oranı",
        prompt:
          "Bir çizgi yayılırken 480 nm, alınırken 720 nm ölçülüyor. Homojen genişleme varsayımında ölçek oranını, z yi ve tek foton enerji oranını bul.",
        strategy: "Dalga boyundan ölçek ve ters enerji oranlarına geç.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "λalınan/λyayılan=720/480=1,5 olduğundan aalınan/ayayılan=1,5 tir.",
          },
          {
            label: "Adım 2",
            explanation:
              "z=1,5−1=0,5 olur; bu yalnız kırmızıya kayma tanımını ve verilen kozmolojik varsayımı kullanır.",
          },
          {
            label: "Adım 3",
            explanation:
              "E=hc/λ nedeniyle Ealınan/Eyayılan=2/3 tür; tek foton enerjisi azalır.",
          },
        ],
        answer: "Ölçek oranı 1,5; z=0,5; enerji oranı 2/3.",
        check: "Dalga boyu artarken frekans ve enerji azalmalı.",
        pitfall: "z=0,5 değerini her koşulda v/c=0,5 diye yorumlama.",
      },
      {
        title: "Bir mezonun yükü",
        prompt:
          "u kuarkı+2e/3 ve antistrange kuarkı+e/3 yük taşıyor. Bu valans bileşiğin elektrik yükünü ve baryon sayısını bul.",
        strategy: "Elektrik yükü ve baryon sayısı için iki ayrı toplam kur.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Elektrik yükü(+2/3+1/3)e=+e olur.",
          },
          {
            label: "Adım 2",
            explanation:
              "Kuarkın baryon sayısı 1/3, antikuarkın−1/3 olduğundan toplam 0 dır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Bir kuark ve bir antikuark sade mezon kuralını sağlar; yükünün+e olması onu baryon yapmaz.",
          },
        ],
        answer: "Yük+e, baryon sayısı 0; mezondur.",
        check: "Yükü toplamaya yarayan paydalarla baryon sayısını karıştırma.",
        pitfall: "Elektrikçe yüklü her hadronu proton diye adlandırma.",
      },
      {
        title: "Karşıt bileşimin iki defteri",
        prompt:
          "Bir antiu ve iki antid içeren sade valans bileşiğin yükünü ve ailesini belirle.",
        strategy:
          "Her kuarkı karşıtına çevirirken yük ve baryon sayısı işaretlerini değiştir.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Antiu yükü−2e/3, her antid yükü+e/3 tür; toplam yük 0 dır.",
          },
          {
            label: "Adım 2",
            explanation: "Üç antikuarkın baryon sayısı−1/3−1/3−1/3=−1 dir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Bu bileşim antinötronun valans betimidir; nötr olması onu nötronla özdeş yapmaz.",
          },
        ],
        answer: "Nötr antibaryon, antinötron.",
        check: "Nötronun baryon sayısı+1 iken burada−1 çıkmalı.",
        pitfall:
          "Nötr parçacıkların karşıt parçacığının bulunmadığını varsayma.",
      },
      {
        title: "Yok oluşunda toplam ve kinetik enerji",
        prompt:
          "Zıt ve eşit büyüklükte momentuma sahip serbest elektron ve pozitronun her birinin TOPLAM enerjisi 0,800 MeV, durgun enerjisi 0,511 MeV. İdeal son durumda iki foton oluşuyor. Foton enerjilerini, yönlerini ve başlangıç toplam kinetik enerjisini bul.",
        strategy:
          "Toplam enerjiyle durgun enerjiyi ayrı say; fotonların yönünü momentumla belirle.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Çiftin toplam enerjisi 2×0,800=1,600 MeV ve toplam momentumu 0 dır; verilen 0,800 MeV durgun enerji değildir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Başlangıç toplam kinetik enerjisi 2×(0,800−0,511)=0,578 MeV dir. Bu pay yok oluşundaki foton bütçesine de katılır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Son iki foton zıt yönlü, eşit enerjili olmalıdır; her biri 1,600/2=0,800 MeV taşır. Böylece toplam enerji 1,600 MeV ve net momentum 0 korunur.",
          },
        ],
        answer:
          "Zıt yönlü iki 0,800 MeV foton; başlangıç toplam kinetik enerji 0,578 MeV.",
        check:
          "İki foton enerjisi 1,600 MeV=toplam durgun enerji 1,022 MeV+toplam kinetik enerji 0,578 MeV.",
        pitfall:
          "Toplam momentum 0 olmasını her parçacığın ayrı ayrı durgun olmasıyla eşitleme.",
      },
      {
        title: "Gözlem ile yorumun sınırı",
        prompt:
          "Bir araştırmada uzak galaksi örnekleminde kırmızıya kayma ve gökyüzünde yaklaşık 2,7 K termal art alanı ölçülüyor. Sıcak erken evren için iki verinin görevini ayır.",
        strategy: "Her ölçümü modelin farklı bir sonucuyla ilişkilendir.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Tayf kaymalarının uzaklıkla sistematik ilişkisi büyük ölçekli genişlemeyi destekler.",
          },
          {
            label: "Adım 2",
            explanation:
              "Yaklaşık termal mikrodalga art alanı, daha sıcak evrenden gelen ışığın soğuyup dalga boyunun uzamasına bağımsız destek verir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Birlikte destek sağlamaları, evrenin geometrisini veya en erken tekilliğin fiziğini tek başlarına kesin olarak çözdükleri anlamına gelmez.",
          },
        ],
        answer:
          "İki bağımsız bulgu aynı sıcak-genişleyen evren betimini destekler.",
        check:
          "Yalnız galaksi parlaklığı yerine hangi tayf çizgisinin ölçüldüğünü belirt.",
        pitfall:
          "Benzetmeyi ölçülmüş bir kanıt veya çözülmemiş ayrıntıyı kesin sonuç diye sunma.",
      },
    ],
    recall: [
      {
        prompt: "Kırmızıya kayma z nasıl tanımlanır?",
        answer:
          "z=λalınan/λyayılan−1; kozmolojik homojen ölçek modelinde 1+z=aalınan/ayayılan.",
      },
      {
        prompt: "Nötron temel parçacık mıdır?",
        answer: "Hayır; sade valans betiminde udd içeren bir baryondur.",
      },
      {
        prompt: "Nötrino elektronun karşıtı mıdır?",
        answer:
          "Hayır; elektronun karşıtı pozitron, nötrinonunki antinötrinodur.",
      },
      {
        prompt: "Bütün bozonlar kuvvet taşıyıcısı mıdır?",
        answer:
          "Hayır; spin sınıflaması görev sınıflaması değildir. Higgs bozonu bu genellemeye karşı örnektir.",
      },
      {
        prompt: "Standart Model kütleçekimini içerir mi?",
        answer:
          "Güçlü, zayıf, elektromanyetik etkileşimleri betimler; kütleçekimi bu modelin dışındadır.",
      },
      {
        prompt: "İki karşı yönlü yok oluş fotonu neyi sağlar?",
        answer:
          "Başlangıçta toplam momentumu sıfır olan çift için enerji ve momentum birlikte korunur.",
      },
    ],
    items: [
      {
        prompt:
          "Bir galaksi çizgisi laboratuvarda 500 nm, gözlemde 650 nm dir. z=(λgöz−λlab)/λlab tanımıyla kırmızıya kayma kaçtır?",
        options: ["0,77", "−0,30", "0,30", "1,30", "150"],
        answer: 2,
        hint: "Önce farkı bul, sonra yayılan çizgiye böl.",
        explanation:
          "Fark 650−500=150 nm dir. Referans 500 nm olduğundan 150/500=0,30 çıkar. Pozitif sonuç kırmızıya kaymayla uyumludur; nm birimleri sadeleşir.",
        guidance: {
          knowledge: [
            "Kayma z bir dalga boyu farkının referans dalga boyuna oranıdır.",
          ],
          strategy: "Önce farkı bul, sonra yayılan çizgiye böl.",
          steps: [
            "Fark 650−500=150 nm dir.",
            "Referans 500 nm olduğundan 150/500=0,30 çıkar.",
            "Pozitif sonuç kırmızıya kaymayla uyumludur; nm birimleri sadeleşir.",
          ],
          optionReasons: [
            "Ters dalga boyu oranını kullanır.",
            "Dalga boyu artışına ters işaret verir.",
            "Doğru: (650−500)/500=0,30 dur.",
            "Oranı verir; orandan 1 çıkarmamıştır.",
            "Boyutlu farkı boyutsuz z yerine koyar.",
          ],
          commonError: "Oran 1+z ile z yi birbirine karıştırma.",
          check: "500×(1+0,30)=650 nm eşitliğini geri kur.",
        },
      },
      {
        prompt:
          "Homojen genişleme modelinde bir foton a=0,4 iken yayılıp a=1 iken alınıyor. 1+z=aalım/ayayım veriliyor. Dalga boyu ve frekans oranları hangisidir?",
        options: [
          "1,5;0,4",
          "0,4;0,4",
          "2,5;2,5",
          "0,4;2,5",
          "λalım/λyayım=2,5; falım/fyayım=0,4",
        ],
        answer: 4,
        hint: "Önce ölçek oranı, sonra ters frekans oranı.",
        explanation:
          "Ölçek oranı 1/0,4=2,5 tir. Bu oran dalga boyu oranına eşittir. Frekans oranı 1/2,5=0,4 tür; çarpım 1 kalır.",
        guidance: {
          knowledge: [
            "Boşlukta fλ=c; modelde dalga boyu ölçek oranıyla çarpılır.",
          ],
          strategy: "Önce ölçek oranı, sonra ters frekans oranı.",
          steps: [
            "Ölçek oranı 1/0,4=2,5 tir.",
            "Bu oran dalga boyu oranına eşittir.",
            "Frekans oranı 1/2,5=0,4 tür; çarpım 1 kalır.",
          ],
          optionReasons: [
            "Dalga boyu oranı yerine z yi kullanır.",
            "Dalga boyu ölçeğinin tersini alır.",
            "Frekansı dalga boyuyla aynı yönde değiştirir.",
            "İki fiziksel oranı ters yerleştirir.",
            "Doğru: Dalga boyu ölçekle, frekans onun tersiyle değişir.",
          ],
          commonError: "Kozmolojik bağıntıyı yerel hız toplama formülü sanma.",
          check: "İki oranı çarpınca 1 elde edilmeli.",
        },
      },
      {
        prompt:
          "Eş hareketli iki grup gözlemciden 2 ve 5 birim uzaktadır. Kozmik ölçek aynı sürede 1 den 1,2 ye çıkıyor; yerel hareket yok. Uzaklık artışları hangisidir?",
        options: [
          "2,4 ve 6 birim",
          "0,2 ve 0,2 birim",
          "0,1 ve 0,04 birim",
          "2 ve 5 birim",
          "0,4 ve 1 birim",
        ],
        answer: 4,
        hint: "Son uzaklıkları bulup ilkini çıkar.",
        explanation:
          "Yakın grup 2×1,2=2,4 birime çıkar; fark 0,4 tür. Uzak grup 5×1,2=6 birime çıkar; fark 1 dir. Artış oranı 1/0,4=2,5 başlangıç uzaklık oranıyla aynıdır.",
        guidance: {
          knowledge: ["Sabit comoving aralıkta dson/dilk ölçek oranıdır."],
          strategy: "Son uzaklıkları bulup ilkini çıkar.",
          steps: [
            "Yakın grup 2×1,2=2,4 birime çıkar; fark 0,4 tür.",
            "Uzak grup 5×1,2=6 birime çıkar; fark 1 dir.",
            "Artış oranı 1/0,4=2,5 başlangıç uzaklık oranıyla aynıdır.",
          ],
          optionReasons: [
            "Son uzaklıkları artış yerine koyar.",
            "Aynı oranı aynı mutlak artış sanır.",
            "Artışı uzaklıkla ters orantılı kurar.",
            "Başlangıç uzaklıklarını değişim sayar.",
            "Doğru: Her başlangıç uzaklığı 0,2 ile çarpılır.",
          ],
          commonError:
            "Genişlemenin her gruba aynı metre eklendiği modelini kurma.",
          check: "Her iki son/ilk uzaklık oranı 1,2 olmalı.",
        },
      },
      {
        prompt:
          "Bir öğrenci “Andromeda bize yaklaştığı için evren genişlemiyor” diyor. Büyük ölçekli genişleme modeliyle uyumlu yanıt hangisidir?",
        options: [
          "Yerel bağlı hareketler büyük ölçekli genişlemenin üzerine eklenebilir",
          "Genişleyen evrende tüm atomların yarıçapı aynı oranda artmalıdır",
          "Maviye kaymış çizgi hiçbir fiziksel ölçümde olamaz",
          "Bir yakın galaksi tüm kozmolojik örneklemin yerini tutar",
          "Her galaksi her gözlemciden zorunlu uzaklaşır",
        ],
        answer: 0,
        hint: "Gözlemin yerel mi kozmolojik örnekleme mi ait olduğunu ayır.",
        explanation:
          "Andromeda örneği yakın ve yerel kütleçekim etkileşimi içeren bir sistemdir. Kozmolojik genişleme sonucu daha büyük ölçekli örneklemin ortalama davranışını betimler. Yerel yaklaşma bu ortalamanın üzerine eklenebildiği için mantıksal bir çelişki yoktur.",
        guidance: {
          knowledge: [
            "Kozmolojik genişleme bağlı olmayan büyük ölçekli sistemlerin ortalama aralıklarıyla ilgilidir.",
          ],
          strategy:
            "Gözlemin yerel mi kozmolojik örnekleme mi ait olduğunu ayır.",
          steps: [
            "Andromeda örneği yakın ve yerel kütleçekim etkileşimi içeren bir sistemdir.",
            "Kozmolojik genişleme sonucu daha büyük ölçekli örneklemin ortalama davranışını betimler.",
            "Yerel yaklaşma bu ortalamanın üzerine eklenebildiği için mantıksal bir çelişki yoktur.",
          ],
          optionReasons: [
            "Doğru: Yakın galaksinin özel hareketi kozmolojik ortalamayı geçersiz yapmaz.",
            "Bağlı küçük sistemleri kozmik ölçekle özdeşleştirir.",
            "Yaklaşma kaymasını imkânsız sayar.",
            "Örneklem ve ölçek sınırlarını yok sayar.",
            "Yerel hareket olasılığını siler.",
          ],
          commonError:
            "Büyük ölçekli bir eğilimi istisnasız her nesnenin hareketi sanma.",
          check:
            "Atomun veya Güneş sisteminin genişlemesini modelin zorunlu sonucu olarak yazmamalısın.",
        },
      },
      {
        prompt:
          "Aşağıdaki bulgulardan hangisi sıcak erken evren modeline, galaksi tayf kaymalarından bağımsız bir destek oluşturur?",
        options: [
          "Yaklaşık 2,7 K termal kozmik mikrodalga art alanı",
          "Bir lambanın uzaklaşınca sönük görünmesi",
          "Bir arabanın siren perdesinin değişmesi",
          "Balon yüzeyine kalemle nokta çizilmesi",
          "Bir yıldızın yalnız gökyüzünde yer değiştirmesi",
        ],
        answer: 0,
        hint: "Galaksi kaymasından farklı ve kozmik geçmişe ait bir ölçüm ara.",
        explanation:
          "Soruda bağımsız bir sıcaklık-tayf bulgusu isteniyor. Termal mikrodalga art alanı geçmişteki sıcak ışınımın genişlemeyle soğumasını sınar. Diğer seçenekler ya yerel olay ya da benzetmedir; aynı kozmik ölçümü sağlamaz.",
        guidance: {
          knowledge: ["Farklı ölçüm türleri modelin farklı sonuçlarını sınar."],
          strategy:
            "Galaksi kaymasından farklı ve kozmik geçmişe ait bir ölçüm ara.",
          steps: [
            "Soruda bağımsız bir sıcaklık-tayf bulgusu isteniyor.",
            "Termal mikrodalga art alanı geçmişteki sıcak ışınımın genişlemeyle soğumasını sınar.",
            "Diğer seçenekler ya yerel olay ya da benzetmedir; aynı kozmik ölçümü sağlamaz.",
          ],
          optionReasons: [
            "Doğru: Art alan sıcak geçmişin bugün soğumuş ışınımıyla ilişkilidir.",
            "Geometrik parlaklık azalması art alan tayfının yerini tutmaz.",
            "Mekanik dalga gözlemi kozmik geçmişi ölçmez.",
            "Bir öğretim benzetmesi bağımsız astronomik ölçüm değildir.",
            "Tek başına açısal hareket termal geçmiş bilgisi değildir.",
          ],
          commonError:
            "Balon modelini teleskopla ölçülmüş bir kanıt yerine koyma.",
          check: "Seçtiğin bulguda gerçek tayf ve gökyüzü ölçümü bulunmalı.",
        },
      },
      {
        prompt:
          "İlk hafif çekirdekler, nötr atomlar ve ilk yıldızların oluşumu için doğru zaman sırası hangisidir?",
        options: [
          "Hafif çekirdekler → nötr atomlar → ilk yıldızlar",
          "Hepsi aynı anda",
          "İlk yıldızlar → nötr atomlar → hafif çekirdekler",
          "İlk yıldızlar → hafif çekirdekler → nötr atomlar",
          "Nötr atomlar → hafif çekirdekler → ilk yıldızlar",
        ],
        answer: 0,
        hint: "Her aşamanın önkoşulunu belirle.",
        explanation:
          "Nötr atom için önce çekirdek ve elektronların bağlanabildiği yeterince soğuk ortam gerekir. İlk hafif çekirdekler ilk dakikalarda, nötr atomlar çok daha sonra oluşur. Yıldızlar bu maddeden kütleçekimsel yapı oluşumuyla daha sonra gelişir.",
        guidance: {
          knowledge: [
            "Çekirdek, atom ve yıldız farklı bağlanma ve yapı oluşumu ölçekleridir.",
          ],
          strategy: "Her aşamanın önkoşulunu belirle.",
          steps: [
            "Nötr atom için önce çekirdek ve elektronların bağlanabildiği yeterince soğuk ortam gerekir.",
            "İlk hafif çekirdekler ilk dakikalarda, nötr atomlar çok daha sonra oluşur.",
            "Yıldızlar bu maddeden kütleçekimsel yapı oluşumuyla daha sonra gelişir.",
          ],
          optionReasons: [
            "Doğru: Çekirdek bağlanması önce, elektron yakalanması sonra, yıldız yapıları daha sonra olur.",
            "Farklı sıcaklık ve oluşum süreçlerini tek ana sıkıştırır.",
            "Sıralamayı bütünüyle ters çevirir.",
            "Yıldızları ilk çekirdeklerin önüne koyar.",
            "Atomu çekirdeğinden önce üretir.",
          ],
          commonError:
            "Çekirdeğin oluşmasını elektronun çekirdeğe bağlanmasıyla aynı olay sayma.",
          check: "Atom aşamasını çekirdek aşamasından önce yazamazsın.",
        },
      },
      {
        prompt:
          "u yükü+2e/3, d yükü−e/3 tür. udd valans bileşiğinin toplam yükü ve ailesi nedir?",
        options: [
          "−e; mezon",
          "0; baryon",
          "0; lepton",
          "+e; baryon",
          "+e; bozon taşıyıcı",
        ],
        answer: 1,
        hint: "Yük ve aileyi iki ayrı işlemle bul.",
        explanation:
          "Verilen bileşimde bir u, iki d vardır. Toplam yük(2−1−1)e/3=0 dır. Üç bileşenin hepsi kuark olduğu için baryondur; nötron valans betimidir.",
        guidance: {
          knowledge: [
            "Sade valans modelinde üç kuark baryondur; yükleri toplanır.",
          ],
          strategy: "Yük ve aileyi iki ayrı işlemle bul.",
          steps: [
            "Verilen bileşimde bir u, iki d vardır.",
            "Toplam yük(2−1−1)e/3=0 dır.",
            "Üç bileşenin hepsi kuark olduğu için baryondur; nötron valans betimidir.",
          ],
          optionReasons: [
            "Üç kuarkı kuark-antikuark çifti sanır.",
            "Doğru: 2/3−1/3−1/3=0 ve üç kuark baryon kuralını sağlar.",
            "Kuark bileşiğini temel lepton sayar.",
            "uud için çıkan yükü udd ye taşır.",
            "Yük ve bileşimden yanlış bir temel taşıyıcı üretir.",
          ],
          commonError:
            "Elektrikçe nötr olmayı yapısız veya temel olmakla eşitleme.",
          check: "Baryon sayısı 1/3+1/3+1/3=1 kalır.",
        },
      },
      {
        prompt:
          "u yükü+2e/3, antid yükü+e/3 tür. u-antid çiftinin toplam elektrik yükü ve baryon sayısı hangisidir?",
        options: ["−e ve−1", "+e/3 ve 1/3", "0 ve 0", "+e ve 1", "+e ve 0"],
        answer: 4,
        hint: "Yük ile baryon sayısı için ayrı defter tut.",
        explanation:
          "Elektrik yükü 2e/3+e/3=+e dir. Baryon sayısı 1/3−1/3=0 dır. Bir kuark-antikuark çifti sade mezon kuralını sağlar; yüklü olabilir.",
        guidance: {
          knowledge: ["Her kuarkın baryon sayısı 1/3, antikuarkın−1/3 tür."],
          strategy: "Yük ile baryon sayısı için ayrı defter tut.",
          steps: [
            "Elektrik yükü 2e/3+e/3=+e dir.",
            "Baryon sayısı 1/3−1/3=0 dır.",
            "Bir kuark-antikuark çifti sade mezon kuralını sağlar; yüklü olabilir.",
          ],
          optionReasons: [
            "Her iki işareti yanlış değiştirir.",
            "İki bileşenin toplamını hesaplamaz.",
            "Karşıt tür isimlerini aynı kuarkın karşıtı sanır.",
            "Elektrik yükünü baryon sayısına kopyalar.",
            "Doğru: Yükler toplanır; kuark ve antikuark baryon sayıları götürür.",
          ],
          commonError: "Baryon sayısı sütununa elektrik yüklerini yazma.",
          check: "Mezonun elektrik yükünün sıfır olması zorunlu değildir.",
        },
      },
      {
        prompt:
          "Aşağıdaki parçacıklardan hangisi güncel Standart Modelde kuark bileşiği olmayan temel bir leptondur?",
        options: [
          "Nötron",
          "Pion",
          "Üç kuarklı bir baryon",
          "Elektron",
          "Proton",
        ],
        answer: 3,
        hint: "Seçenekleri lepton ve hadron olarak ayır.",
        explanation:
          "Proton, nötron ve üç kuarklı baryon aynı bileşik hadron sınıfına girer. Pion kuark-antikuark içerdiği için yine bileşiktir. Elektron bu listedeki temel lepton olarak kalır.",
        guidance: {
          knowledge: [
            "Temel olmak elektrik yükünün sıfır olması değil, bilinen alt bileşen yapısının bulunmamasıdır.",
          ],
          strategy: "Seçenekleri lepton ve hadron olarak ayır.",
          steps: [
            "Proton, nötron ve üç kuarklı baryon aynı bileşik hadron sınıfına girer.",
            "Pion kuark-antikuark içerdiği için yine bileşiktir.",
            "Elektron bu listedeki temel lepton olarak kalır.",
          ],
          optionReasons: [
            "Nötron udd valans yapılı hadrondur.",
            "Pion bir mezondur.",
            "Tanım zaten bileşik hadronu bildirir.",
            "Doğru: Elektron lepton ailesindedir ve bilinen alt bileşeni yoktur.",
            "Proton uud valans yapılı hadrondur.",
          ],
          commonError: "Atomu oluşturan her parçacığı temel parçacık sanma.",
          check:
            "Seçtiğin parçacık için kuark bileşimi yazmaya gerek olmamalı.",
        },
      },
      {
        prompt:
          "Elektron nötrinosu ile pozitron için doğru karşılaştırma hangisidir?",
        options: [
          "Nötrino elektrikçe nötr leptondur; pozitron elektronun+e yüklü karşıtıdır",
          "Nötrino elektronun+e yüklü karşıtıdır",
          "Nötrino yüksüz olduğu için hiçbir etkileşime katılmaz",
          "Pozitron üç kuark içerir",
          "İkisi de güçlü etkileşimin gluonudur",
        ],
        answer: 0,
        hint: "Önce elektronun karşıtını, sonra nötrinonun yükünü yaz.",
        explanation:
          "Elektronun yükü−e, karşıt parçacığı pozitronun yükü+e dir. Elektron nötrinosu ayrı bir nötr leptondur. Nötr oluş zayıf etkileşime engel olmadığından etkileşimsiz sonucu çıkmaz.",
        guidance: {
          knowledge: [
            "Lepton aileleri ile karşıt parçacık eşleri aynı sınıflama değildir.",
          ],
          strategy: "Önce elektronun karşıtını, sonra nötrinonun yükünü yaz.",
          steps: [
            "Elektronun yükü−e, karşıt parçacığı pozitronun yükü+e dir.",
            "Elektron nötrinosu ayrı bir nötr leptondur.",
            "Nötr oluş zayıf etkileşime engel olmadığından etkileşimsiz sonucu çıkmaz.",
          ],
          optionReasons: [
            "Doğru: Aile ve elektrik yükü doğru ayrılır.",
            "Elektronun karşıtı olan pozitronu nötrinoyla karıştırır.",
            "Nötrinolar zayıf etkileşime katılır.",
            "Pozitron temel leptondur.",
            "İki leptonu güçlü kuvvet taşıyıcısı yapar.",
          ],
          commonError:
            "Nötr sözcüğünü karşıt parçacık veya etkileşimsiz anlamında kullanma.",
          check: "Elektron-nötrino eşini elektron-pozitron çiftiyle ayrı yaz.",
        },
      },
      {
        prompt:
          "Fermiyon/bozon ayrımı hangi özelliğe dayanır ve Higgs bozonu hangi genellemeyi çürütür?",
        options: [
          "Kütle; bütün hafiflerin fermiyon olduğunu",
          "Spin; bütün bozonların kuvvet taşıyıcısı olduğu genellemesini",
          "Boyut; bütün küçüklerin kuvvet taşıdığını",
          "Elektrik yükü; bütün yüksüzlerin bozon olduğunu",
          "Hız; bütün duranların bozon olduğunu",
        ],
        answer: 1,
        hint: "Sınıflama ölçütünü parçacığın görevinden ayır.",
        explanation:
          "Elektron spin 1/2 olduğu için fermiyondur; foton spin 1 olduğu için bozondur. Higgs spin 0 olan bir bozondur. Higgs olağan bir temel kuvvet taşıyıcısı diye sınıflanmadığı için bütün bozonlar taşıyıcıdır cümlesi geçersizdir.",
        guidance: {
          knowledge: [
            "Tam sayı spin bozon, yarım tam sayı spin fermiyon sınıfını verir.",
          ],
          strategy: "Sınıflama ölçütünü parçacığın görevinden ayır.",
          steps: [
            "Elektron spin 1/2 olduğu için fermiyondur; foton spin 1 olduğu için bozondur.",
            "Higgs spin 0 olan bir bozondur.",
            "Higgs olağan bir temel kuvvet taşıyıcısı diye sınıflanmadığı için bütün bozonlar taşıyıcıdır cümlesi geçersizdir.",
          ],
          optionReasons: [
            "Kütle sınıflama ölçütü değildir.",
            "Doğru: Spin sınıflaması ile fiziksel görev farklıdır.",
            "Klasik boyut bu sınıflamanın tanımı değildir.",
            "Bozon-fermiyon ayrımı yükle tanımlanmaz.",
            "Durgunluk spin sınıfını değiştirmez.",
          ],
          commonError:
            "Tablodaki bütün bozonları tek işleve zorla yerleştirme.",
          check: "Spin 0 da tam sayıdır; bozon sınıfına dahildir.",
        },
      },
      {
        prompt:
          "Güçlü etkileşim, elektromanyetik etkileşim ve zayıf etkileşimin temel taşıyıcıları sırasıyla hangisidir?",
        options: [
          "Graviton; foton; nötron",
          "Gluon; foton; W ve Z",
          "Elektron; pozitron; foton",
          "Higgs; proton; W",
          "Foton; gluon; elektron",
        ],
        answer: 1,
        hint: "Önce kuark bağını, sonra yük etkileşimini, beta sürecini eşleştir.",
        explanation:
          "Kuarkları bağlayan güçlü etkileşim gluonlarla ilişkilidir. Elektromanyetik etkileşim fotonla ilişkilidir. Beta süreçlerini içeren zayıf etkileşim W ve Z bozonlarıyla ilişkilidir.",
        guidance: {
          knowledge: [
            "Standart Modelde üç etkileşimin taşıyıcı aileleri farklıdır.",
          ],
          strategy:
            "Önce kuark bağını, sonra yük etkileşimini, beta sürecini eşleştir.",
          steps: [
            "Kuarkları bağlayan güçlü etkileşim gluonlarla ilişkilidir.",
            "Elektromanyetik etkileşim fotonla ilişkilidir.",
            "Beta süreçlerini içeren zayıf etkileşim W ve Z bozonlarıyla ilişkilidir.",
          ],
          optionReasons: [
            "Varsayımsal gravitonu güçlü etkileşime koyar.",
            "Doğru: Üç etkileşim doğru taşıyıcılarla eşleştirilmiştir.",
            "Madde parçacıklarıyla taşıyıcıları karıştırır.",
            "Higgs ve protonu bu etkileşimlerin taşıyıcısı sayar.",
            "İlk ikisini değiştirir ve elektronu taşıyıcı yapar.",
          ],
          commonError:
            "Çekirdekte bulunan protonu kuvvetin temel taşıyıcısı sanma.",
          check: "Üç seçimin de aynı sıradaki kuvvete ait olduğuna bak.",
        },
      },
      {
        prompt: "Standart Model ve kütleçekimi için doğru ifade hangisidir?",
        options: [
          "Graviton 2012 de Higgs ile birlikte kesin keşfedildi",
          "Standart Model dört etkileşimi bütünüyle tek kuvvet yapmıştır",
          "Kütleçekimi yalnız gezegenler arasında oluşur",
          "Kütleçekimi Standart Modelde yer almaz; graviton deneysel keşif değildir",
          "Karanlık maddenin tüm parçacıkları modelde kesin tanımlıdır",
        ],
        answer: 3,
        hint: "Kapsama ve gözlemsel duruma ayrı ayrı bak.",
        explanation:
          "Standart Model güçlü, zayıf ve elektromanyetik etkileşimleri içerir. Kütleçekimi bu betimin dışında kalır. Önerilen kuantum taşıyıcısı gravitonun deneysel olarak keşfedildiği söylenemez.",
        guidance: {
          knowledge: [
            "Bir modelin kapsamı ile evrende bulunan bütün etkileşimler aynı liste olmak zorunda değildir.",
          ],
          strategy: "Kapsama ve gözlemsel duruma ayrı ayrı bak.",
          steps: [
            "Standart Model güçlü, zayıf ve elektromanyetik etkileşimleri içerir.",
            "Kütleçekimi bu betimin dışında kalır.",
            "Önerilen kuantum taşıyıcısı gravitonun deneysel olarak keşfedildiği söylenemez.",
          ],
          optionReasons: [
            "Higgs keşfini gravitona taşır.",
            "Üç etkileşimin betimini dört kuvvetin özdeşliği sanır.",
            "Kütleçekimini belirli büyük cisimlerle sınırlar.",
            "Doğru: Modelin kapsadığı üç etkileşimle açık sorular ayrılır.",
            "Açık bir araştırma sorusunu çözülmüş sayar.",
          ],
          commonError:
            "Varsayımsal taşıyıcıyı ölçülmüş parçacık listesine ekleme.",
          check:
            "Higgs keşif tarihini bütün bilinmeyen parçacıklara uygulamamalısın.",
        },
      },
      {
        prompt:
          "Bir nötron ve bir antinötronun ikisi de elektrikçe nötrdür. Bundan hangi sonuç çıkar?",
        options: [
          "Antinötronun baryon sayısı+1 olmak zorundadır",
          "Nötr oldukları için kütleleri sıfırdır",
          "Nötr olmaları aynı parçacık olduklarını göstermez",
          "İkisi zorunlu aynı parçacıktır",
          "İkisinin de iç yapısı yoktur",
        ],
        answer: 2,
        hint: "Nötron ve antinötron için baryon sayılarını karşılaştır.",
        explanation:
          "Nötronun sade yapısı udd, baryon sayısı+1 dir. Antinötron üç antikuark içerir, baryon sayısı−1 dir. İkisinin net yükü 0 olsa da bu ayrı sayı onların özdeş olmadığını gösterir.",
        guidance: {
          knowledge: [
            "Karşıt parçacık eşlerinde yalnız elektrik yüküne bakılmaz.",
          ],
          strategy: "Nötron ve antinötron için baryon sayılarını karşılaştır.",
          steps: [
            "Nötronun sade yapısı udd, baryon sayısı+1 dir.",
            "Antinötron üç antikuark içerir, baryon sayısı−1 dir.",
            "İkisinin net yükü 0 olsa da bu ayrı sayı onların özdeş olmadığını gösterir.",
          ],
          optionReasons: [
            "Antibaryonun baryon sayısı−1 dir.",
            "Yüksüz olmak kütlesiz olmak değildir.",
            "Doğru: Başka kuantum sayıları onları ayırır.",
            "Tek niceliğin eşitliğinden özdeşlik çıkarır.",
            "Net yük iç yapı hakkında yeterli değildir.",
          ],
          commonError:
            "Sıfırın işaret değiştirmemesinden tüm parçacık özelliklerinin aynı olduğunu çıkarma.",
          check: "Nötr kuark toplamının baryon sayısını ayrıca hesapla.",
        },
      },
      {
        prompt:
          "Toplam momentumu sıfır olan durgun bir e⁻e⁺ çifti serbest uzayda yok oluyor. Her parçacığın durgun enerjisi 511 keV ise ideal iki foton durumu hangisidir?",
        options: [
          "Zıt yönlü iki 1022 keV foton",
          "Hiç enerji taşımayan iki foton",
          "Tek 1022 keV foton",
          "Zıt yönlü iki 511 keV foton",
          "Aynı yönlü iki 511 keV foton",
        ],
        answer: 3,
        hint: "Toplam enerji ve toplam momentum için ayrı denetim yap.",
        explanation:
          "Başlangıç toplam enerji 2×511=1022 keV dir. Eş enerjili iki foton 511 er keV taşıyabilir. Zıt yönleri p toplamını 0 yapar; aynı yön veya tek foton bunu sağlayamaz.",
        guidance: {
          knowledge: [
            "Foton p=E/c taşır; yok oluşunda enerji ve vektörel momentum korunur.",
          ],
          strategy: "Toplam enerji ve toplam momentum için ayrı denetim yap.",
          steps: [
            "Başlangıç toplam enerji 2×511=1022 keV dir.",
            "Eş enerjili iki foton 511 er keV taşıyabilir.",
            "Zıt yönleri p toplamını 0 yapar; aynı yön veya tek foton bunu sağlayamaz.",
          ],
          optionReasons: [
            "Toplam enerjiyi iki katına çıkarır.",
            "Başlangıç durgun enerjisini yok eder.",
            "Tek foton sıfır olmayan momentum taşır.",
            "Doğru: Hem 1022 keV toplam enerji hem sıfır momentum korunur.",
            "Enerji doğru olsa da net momentum sıfır değildir.",
          ],
          commonError:
            "Yalnız enerji korunuyor diye tek foton son durumunu kabul etme.",
          check: "İki foton momentumunu işaretli olarak topla.",
        },
      },
      {
        prompt: "Higgs mekanizmasıyla ilgili hangi ifade uygundur?",
        options: [
          "Higgs keşfi karanlık enerjinin doğasını bütünüyle çözmüştür",
          "Bütün bozonlar Higgs nedeniyle kuvvet taşıyıcısıdır",
          "Temel parçacık kütleleriyle ilişkilidir; proton kütlesinin büyük bölümü iç sistem enerjisinden gelir",
          "W nin nötrondan ağır olması Higgsin eksik kütle olarak bulunması demektir",
          "Foton parçacık olduğu için küçük bir durgun kütle taşır",
        ],
        answer: 2,
        hint: "Temel parçacık ile proton gibi bileşik sistemi ayır.",
        explanation:
          "Higgs alanı temel parçacıkların kütleleriyle ilgili mekanizmanın parçasıdır. Proton kuark-gluon bileşiği olduğu için iç enerji bütçesi durgun kütlesine önemli katkı verir. Bu yüzden proton kütlesini yalnız çıplak kuark kütlelerinin toplamı diye açıklamak eksiktir.",
        guidance: {
          knowledge: [
            "Bileşik parçacık kütlesi bileşen durgun kütlelerinin yalın toplamıyla sınırlı değildir.",
          ],
          strategy: "Temel parçacık ile proton gibi bileşik sistemi ayır.",
          steps: [
            "Higgs alanı temel parçacıkların kütleleriyle ilgili mekanizmanın parçasıdır.",
            "Proton kuark-gluon bileşiği olduğu için iç enerji bütçesi durgun kütlesine önemli katkı verir.",
            "Bu yüzden proton kütlesini yalnız çıplak kuark kütlelerinin toplamı diye açıklamak eksiktir.",
          ],
          optionReasons: [
            "Higgs sonucunu farklı bir açık soruya genişletir.",
            "Spin ve görev ayrımını ihlal eder.",
            "Doğru: Temel kütle mekanizması ile bileşik sistemin enerji bütçesini ayırır.",
            "Yanlış bir keşif öyküsü kurar.",
            "Fotonun durgun kütlesi 0 dır.",
          ],
          commonError:
            "Kütle kazandırma cümlesini tüm bileşik cisimler için tek neden sanma.",
          check: "Protonun iç yapısını önceki yük defteriyle ilişkilendir.",
        },
      },
      {
        prompt:
          "Bir anlatım “karanlık madde” ile “karanlık enerji”yi aynı şey sayıyor. Hangi düzeltme uygundur?",
        options: [
          "İkisi de yalnız görünür yıldız ışığıdır",
          "Bu iki terim yalnız siyah renkli cisimleri anlatır",
          "Karanlık madde kütleçekimsel madde etkileriyle, karanlık enerji hızlanan genişleme betimiyle ilişkilidir",
          "Karanlık enerji elektronun antiparçacığıdır",
          "Karanlık madde Standart Modelde adı konmuş kesin bir tek parçacıktır",
        ],
        answer: 2,
        hint: "Genişleme etkisi ile madde kaynaklı çekim etkisini ayır.",
        explanation:
          "Karanlık madde galaksi ve yapıların çekimsel davranışında çıkarılan madde katkısıdır. Karanlık enerji hızlanan kozmik genişleme betiminde ayrı katkıdır. Aynı ad öbeğini paylaşmaları aynı fiziksel bileşen olmalarını gerektirmez.",
        guidance: {
          knowledge: [
            "Kozmolojik bileşen adları ölçümlerin model içindeki farklı rollerine dayanır.",
          ],
          strategy: "Genişleme etkisi ile madde kaynaklı çekim etkisini ayır.",
          steps: [
            "Karanlık madde galaksi ve yapıların çekimsel davranışında çıkarılan madde katkısıdır.",
            "Karanlık enerji hızlanan kozmik genişleme betiminde ayrı katkıdır.",
            "Aynı ad öbeğini paylaşmaları aynı fiziksel bileşen olmalarını gerektirmez.",
          ],
          optionReasons: [
            "Gözlenen görünür ışıkla karıştırır.",
            "Karanlık sözcüğünü gündelik renk anlamına indirger.",
            "Doğru: İki farklı kozmolojik bileşenin görevini ayırır.",
            "Kozmolojik bileşeni pozitronla özdeşleştirir.",
            "Mikroskobik doğanın açık olduğunu yok sayar.",
          ],
          commonError:
            "Oranları ezberleyip iki bileşenin fiziksel görevini silme.",
          check: "İki terimi birer farklı gözlemle eşleştirebilmelisin.",
        },
      },
      {
        prompt:
          "Bir hızlandırıcıda elektrik alan parçacıkları hızlandırıyor, manyetik alan demeti eğiyor. Dedektörlerde yeni parçacıkların ürünleri saptanıyor. En uygun yorum hangisidir?",
        options: [
          "Manyetik alan her zaman parçacığa hareket yönünde iş yapar",
          "Çarpışma enerjisi yeni parçacıkların durgun ve hareket enerjisine gidebilir",
          "Yeni parçacık oluşunca enerji korunumu geçersiz olur",
          "Laboratuvarda bütün evren fiziksel olarak yeniden yaratılmıştır",
          "Dedektörler ölçüm yapmadan yalnız varsayımı resimler",
        ],
        answer: 1,
        hint: "Enerji veren alanı, yön değiştiren alanı ve ölçümü ayır.",
        explanation:
          "Elektrik alan demete kinetik enerji sağlayabilir. Çarpışma bu enerjinin bir bölümünü yeni parçacıkların durgun enerjisine aktarabilir. Dedektör izleri ve bozunma ürünleri üzerinden bu son durumlar sınanır; evrenin bütünü yeniden üretilmez.",
        guidance: {
          knowledge: [
            "Parçacık oluşumunda enerji ve momentum bütçesi korunur; dedektörler son ürünleri ölçer.",
          ],
          strategy: "Enerji veren alanı, yön değiştiren alanı ve ölçümü ayır.",
          steps: [
            "Elektrik alan demete kinetik enerji sağlayabilir.",
            "Çarpışma bu enerjinin bir bölümünü yeni parçacıkların durgun enerjisine aktarabilir.",
            "Dedektör izleri ve bozunma ürünleri üzerinden bu son durumlar sınanır; evrenin bütünü yeniden üretilmez.",
          ],
          optionReasons: [
            "Manyetik kuvvet hıza dik olduğunda iş yapmaz.",
            "Doğru: Enerji bütçesi yeni son durumları içerir.",
            "Parçacık oluşumu toplam enerji korunumuyla uyumludur.",
            "Yerel yüksek enerji deneyini tüm kozmosla özdeşleştirir.",
            "Dedektörlerin gözlemsel görevini yok sayar.",
          ],
          commonError:
            "Yüksek enerjili çarpışmayı enerjinin yoktan yaratılması diye yorumlama.",
          check:
            "Başlangıç ve son durum için bütün enerji türlerini aynı deftere yaz.",
        },
      },
    ],
    source:
      "MEB ve OGM kapsamı esas alınarak özgün hazırlanmış konu anlatımı, modeller ve öğretim soruları. Resmî sınav sorusu değildir.",
  },
  {
    id: "radyoaktivite",
    topic: "detail-398",
    title: "Radyoaktivite",
    minutes: 110,
    objectives: [
      "A ve Z korunumu ile çekirdek dönüşümlerini çöz.",
      "Yarı ömrü tek çekirdek tahmininden ve aktiviteyi kalan miktardan ayır.",
      "Bağlanma enerjisi, fisyon, füzyon ve radyasyon uygulamalarını açıkla.",
    ],
    sections: [
      {
        title: "Önkoşul: atom ve çekirdeğin iki sayısı",
        paragraphs: [
          "Bir çekirdeğin atom numarası Z proton sayısıdır; kütle numarası A proton ve nötron sayılarının toplamıdır. N=A−Z bağıntısıyla nötron sayısı bulunur. Elektron sayısı iyonlaşmada değişebilir; bu olay tek başına Z yi değiştirmez.",
          "A tam sayı bir sayımdır, çekirdeğin kilogram cinsinden gerçek kütlesi değildir. Gama yayılmasında A sabit kalırken enerji ve dolayısıyla durgun kütle değişebilir. Sayı defteriyle enerji defterini ayrı tutmak konunun ana aracıdır.",
        ],
      },
      {
        title: "İzotop, izobar ve izoton",
        paragraphs: [
          "Aynı Z li, farklı N li çekirdekler aynı elementin izotoplarıdır. A ları eşit farklı çekirdeklere izobar, N leri eşit olanlara izoton denir. Hangisinin sabit olduğunu söylemek yalnız isim ezberinden daha güvenlidir.",
          "Örneğin A=15, Z=7 ile A=16, Z=7 izotoptur; A=15, Z=6 ile A=15, Z=7 izobardır. Etiketler tek başına kararlılık vermez. Soru hangi bozunmanın mümkün olduğunu bildirmiyorsa yalnız bu sınıflamadan kesin bozunma türü seçilmez.",
        ],
      },
      {
        title: "Radyoaktivite çekirdek olayıdır",
        paragraphs: [
          "Kararsız çekirdeklerin kendiliğinden parçacık veya foton yayarak daha düşük enerjili durumlara dönüşmesine radyoaktif bozunma denir. Oluşan ürünün mutlaka tamamen kararlı olması gerekmez; bozunma zincirleri bulunur.",
          "Radyoaktif izotoplar doğada bulunabilir veya nükleer tepkimelerle üretilebilir. Yapay üretilmiş bir radyoizotop da daha sonra kendiliğinden bozunur. Bir maddenin kimyasal olarak zehirli olmasıyla radyoaktif olması aynı özellik değildir.",
        ],
      },
      {
        title: "Çekirdeğin kararlılığı bir oran değildir",
        paragraphs: [
          "Kısa menzilli güçlü etkileşim çekirdeği bağlar; protonlar arasında elektromanyetik itme vardır. Hafif kararlı çekirdeklerde N/Z sıklıkla 1 e yakınken ağır kararlı çekirdeklerde nötron fazlası olağandır.",
          "N/Z>1 olan her çekirdek radyoaktiftir denemez. Gerçek kararlılık enerji düzeylerine ve olası son durumlara bağlıdır. A, Z defterini hesaplayan modelimiz verilen bozunmanın enerji bakımından izinli olduğunu ayrıca kanıtlamaz.",
        ],
      },
      {
        title: "Alfa bozunmasının sayımı",
        paragraphs: [
          "Alfa parçacığı iki proton ve iki nötron içeren helyum çekirdeğidir; yükü+2e, kütle numarası 4 tür. X(A, Z)→Y(A−4, Z−2)+α denkleminde hem nükleon sayısı hem elektrik yükü dengelenir.",
          "Çekirdekte kalan nötron sayısı da 2 azalır. Alfa yayımı elementin değişmesine yol açar. Dışarı çıkan alfa parçacığını iki elektronlu nötr helyum atomu gibi başlatmak yük defterini bozar; sonradan elektron yakalama ayrı süreçtir.",
        ],
      },
      {
        title: "Beta eksi: nötrondan protona",
        paragraphs: [
          "β⁻ sürecinde çekirdekteki bir nötron protona dönüşür; elektron ve elektron antinötrinosu çıkar. A aynı kalır, Z 1 artar, N 1 azalır. Elektron çekirdekte önceden saklanan bir yörünge elektronu değildir.",
          "n→p+e⁻+antineutrino denkleminde yük 0=+1−1+0 dır. Beta elektronunun enerjisi tek bir sabit değer olmak zorunda değildir; enerji elektron, antinötrino ve geri tepen çekirdek arasında paylaşılır.",
        ],
      },
      {
        title: "Beta artı ve elektron yakalama",
        paragraphs: [
          "β⁺ sürecinde çekirdekte proton nötrona dönüşür; pozitron ve elektron nötrinosu çıkar. A sabit, Z 1 azalır, N 1 artar. Bir çekirdekte bu yolun enerji bakımından mümkün olması ayrıca gerekir; serbest proton için sıradan bozunma diye genellenmez.",
          "Elektron yakalamada çekirdek bir elektron alır ve proton-nötron dönüşümüyle nötrino çıkarır. A ve Z sonuçları β⁺ ile aynı olsa da giren ve çıkan parçacıklar farklıdır. Denklemde yakalanan elektronu sol tarafa yaz.",
        ],
      },
      {
        title: "Gama: tür sabit, enerji değişir",
        paragraphs: [
          "Uyarılmış bir çekirdek daha düşük enerjiye geçerken gama fotonu yayabilir. Proton ve nötron sayıları değişmediği için A, Z, N sabittir; element ve izotop kimliği aynı kalır.",
          "Çekirdeğin enerjisi ve durgun kütlesi azalabilir; foton enerji ve momentum taşır, çekirdek geri teper. Gama yalnız alfa veya beta sonrasında olmak zorunda değildir; koşul çekirdeğin uygun uyarılmış durumda olmasıdır.",
        ],
      },
      {
        title: "Bileşik bozunma zincirini ters çöz",
        paragraphs: [
          "Bir zincirde toplam A değişimi alfa sayısını buldurur: her alfa A yı 4 azaltır. Sonra Z defterinde alfa katkısı ile beta eksi ve beta artı katkılarını ayrı toplarsın.",
          "Gama sayısı A, Z defterinden tek başına bulunamaz. Aynı son A, Z ye farklı gama sayıları eşlik edebilir. Soru yalnız bir beta türüne izin veriyorsa bunu kullan; aksi hâlde yalnız net beta farkı bulunmuş olabilir.",
        ],
      },
      {
        title: "Işımaların alanlarda sapması",
        paragraphs: [
          "Alfa pozitif, beta eksi negatif, beta artı pozitif yüklüdür; elektrik ve manyetik alanlarda uygun yönde sapabilir. Gama yüksüz elektromanyetik ışıma olduğu için bu alanlarda yüklü parçacık gibi sapmaz.",
          "Manyetik kuvvetin yönü qv×B ile bulunur; yük işareti tek başına yeterli değildir, yönler de verilmelidir. Sapma miktarını karşılaştırırken parçacıkların momentumu ve yük büyüklüğü hesaba katılır; yalnız isimden yarıçap sıralaması kurulmaz.",
        ],
      },
      {
        title: "Giricilik ve iyonlaştırma",
        paragraphs: [
          "Benzer tipik deney koşullarında alfa kısa yolda güçlü iyonlaştırma, beta orta giricilik, gama daha yüksek giricilik gösterebilir. Bu bir bağlamlı nitel karşılaştırmadır; enerji ve soğurucu malzeme sonucu etkiler.",
          "Alfanın kâğıtla durdurulabilmesi vücut içine alınan alfa yayıcının önemsiz olduğu anlamına gelmez. Dış maruziyet ile iç kirlenme ayrı değerlendirilir. Radyasyon güvenliği yalnız ince bir giysinin bütün ışımaları durdurmasıyla açıklanmaz.",
        ],
      },
      {
        title: "Yarı ömür topluluk davranışıdır",
        paragraphs: [
          "Bağımsız çekirdeklerin sabit bozunma olasılığı modelinde N=N₀·2^(−t/T) beklenen kalan çekirdek sayısıdır. T yarı ömürdür; her T sonunda o anda kalan topluluğun ortalama yarısı kalır.",
          "Tek bir çekirdeğin tam T anında bozunacağı söylenemez. Küçük örneklemde rastgele sapmalar belirgindir. Modelin sürekli sayısı gerçek çekirdeklerin kesirli olduğu anlamına gelmez; çok sayıda deneyin ortalamasını betimler.",
        ],
      },
      {
        title: "Aktivite: saniyedeki bozunma",
        paragraphs: [
          "Aktivite birim zamanda beklenen bozunma sayısıdır: Aetkinlik=λN, λ=ln 2/T. SI birimi becquerel, Bq=s⁻¹ dir. Aynı radyoizotopun miktarı azalınca aktivitesi de aynı oranla azalır.",
          "Kalan çekirdek sayısı aynı iki farklı izotopta kısa yarı ömürlü olanın aktivitesi büyüktür. Aktivite ile soğurulan enerji dozu aynı nicelik değildir; ışımaların enerjisi, dokuya ulaşan pay ve maruziyet süresi de önemlidir.",
        ],
      },
      {
        title: "Bağlanma enerjisi ve kütle defekti",
        paragraphs: [
          "Bir çekirdeğin durgun kütlesi onu serbest oluşturan proton ve nötronların toplamından küçüktür. Δm=Zmp+Nmn−mçekirdek farkı için bağlanma enerjisi Eb=Δmc² dir; çekirdeği serbest nükleonlara ayırmak enerji ister.",
          "Eb/A nükleon başına bağlanma enerjisidir; toplam Eb ile aynı sıralamayı vermeyebilir. Atom kütlesi kullanıyorsan elektronları iki tarafta tutarlı say. Sadece A nın korunmasını toplam durgun kütlenin de aynı kalması sanma.",
        ],
      },
      {
        title: "Fisyon: ağır çekirdeğin bölünmesi",
        paragraphs: [
          "Ağır çekirdeğin iki veya daha çok çekirdeğe ayrılmasına fisyon denir. Bazı fisyonlarda nötronlar çıkar ve başka fisyonları başlatabilir; zincirleme tepkimenin sürmesi sonraki olayları başlatan nötron sayısına bağlıdır.",
          "Tepkimede A ile Z nin toplamları korunur; çıkan nötronlar A defterine girer ama Z defterine girmez. Enerji açığa çıkıyorsa ürünlerin toplam durgun kütlesi girdilerden daha küçüktür; fark hareket ve ışıma enerjisine gider.",
        ],
      },
      {
        title: "Füzyon: hafif çekirdeklerin birleşmesi",
        paragraphs: [
          "Hafif çekirdeklerin daha bağlı ürünlere dönüşecek biçimde birleşmesi enerji açığa çıkarabilir. Yıldız enerjisinin temelinde füzyon vardır. Pozitif çekirdeklerin yaklaşmasındaki Coulomb engeli yüksek sıcaklık ve uygun koşulları önemli kılar.",
          "Her füzyon olayının her fisyon olayından fazla enerji verdiği genellemesi yanlıştır; olay başına ve kütle başına karşılaştırmalar ayrılır. Her birleşme enerji vermez; karar için toplam başlangıç ve son durgun enerji farkına bakılır.",
        ],
      },
      {
        title: "Enerji santralinin dönüşüm zinciri",
        paragraphs: [
          "Fisyon reaktöründe ürünlerin hareket enerjisi ve ışımalar ortama enerji aktarır; ısı taşıyan akışkan üzerinden türbin ve jeneratörle elektrik üretilebilir. Çekirdek tepkimesi doğrudan bütün elektriği kabloya akıtan bir pil gibi resmedilmez.",
          "Nötronların denetimi zincirleme tepkimenin kontrolüdür; soğutma enerji taşır. Radyoaktif atık, yakıt döngüsü ve güvenlik yönetimi fiziksel sistemin parçalarıdır. Enerji türlerini doğru adlandırmak hangi makinenin neyi yaptığını görünür kılar.",
        ],
      },
      {
        title: "Radyasyonun etkisi ve kullanım",
        paragraphs: [
          "İyonlaştırıcı radyasyon atomlardan elektron koparabilecek enerji aktarabilir. X ve gama elektromanyetik, alfa ve beta parçacık ışımalarıdır. Gama ile X adı yalnız frekans büyüklüğünden çok oluşum mekanizmasıyla da ilişkilidir.",
          "Tıpta tanı ve tedavi, arkeolojide yaş tayini ve sanayide malzeme inceleme kontrollü uygulamalardır. İyonlaştırıcı olmayan her dalga her güçte zararsız denemez. Maruziyeti azaltmada süre, uzaklık ve uygun zırhlama birlikte değerlendirilir; bu içerik kişisel tıbbi doz önerisi üretmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Alfa ardından beta",
        prompt:
          "A=216, Z=84 olan X çekirdeği bir alfa ve sonra iki β⁻ yayıyor. Son A, Z, N yi bul.",
        strategy:
          "Alfa ile A, Z yi değiştir; beta için yalnız Z, N yi güncelle.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Alfa sonrasında A 212, Z 82, N 130 olur.",
          },
          {
            label: "Adım 2",
            explanation:
              "İki β⁻ Z yi 2 artırıp N yi 2 azaltır; A 212 de kalır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Son çekirdek A 212, Z 84, N 128 dir; net iki protonlu tür dönüşümü değil, dört nükleon kaybı vardır.",
          },
        ],
        answer: "A 212, Z 84, N 128.",
        check: "İlk N 132 idi; alfa−2 ve iki beta−2 ile 128 bulunur.",
        pitfall: "Beta elektronunu nükleon sayıp A dan düşürme.",
      },
      {
        title: "Zinciri verilen sondan bul",
        prompt:
          "A=228, Z=90 çekirdeği yalnız alfa ve β⁻ ile A=208, Z=82 ye dönüşüyor. Kaç alfa, kaç beta vardır?",
        strategy: "A farkından alfayı, sonra Z farkından betayı bul.",
        steps: [
          {
            label: "Adım 1",
            explanation: "A farkı 20 olduğundan 20/4=5 alfa gerekir.",
          },
          {
            label: "Adım 2",
            explanation: "Beş alfa Z yi 90 dan 80 e indirir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Hedef Z 82 olduğundan iki β⁻ gerekir; gama sayısı bu iki defterden bulunmaz.",
          },
        ],
        answer: "5 alfa,2 beta eksi.",
        check: "228−5×4=208;90−5×2+2=82.",
        pitfall: "Gama sayısını A veya Z değişiminden uydurma.",
      },
      {
        title: "Beklenen miktar ile bozunan",
        prompt:
          "Yarı ömrü 6 saat olan bir örnekte başlangıçta 9600 çekirdek var. İdeal ortalama modelinde 18 saat sonra kalan ve bozunan sayıları bul.",
        strategy:
          "Geçen yarı ömür sayısını hesapla, sonra kalanı toplamdan çıkar.",
        steps: [
          {
            label: "Adım 1",
            explanation: "18/6=3 yarı ömür geçer.",
          },
          {
            label: "Adım 2",
            explanation: "Beklenen kalan 9600/2³=1200 çekirdektir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Beklenen bozunan 9600−1200=8400 dür; bu tek tek hangi çekirdeğin bozunduğunu belirlemez.",
          },
        ],
        answer: "Kalan 1200, bozunan 8400.",
        check: "1200+8400 başlangıçtaki 9600 ü vermeli.",
        pitfall:
          "Her yarı ömürde başlangıçtaki sayının yarısını tekrar çıkarma.",
      },
      {
        title: "İki aktiviteyi kıyasla",
        prompt:
          "Aynı anda iki örnekte eşit N çekirdek vardır. Birincinin yarı ömrü 3 gün, ikincinin 9 gündür. Aktivite oranı nedir?",
        strategy: "Aktiviteyi N/T ile orantılı yaz.",
        steps: [
          {
            label: "Adım 1",
            explanation: "İki örnek için etkinlik=ln 2·N/T dir.",
          },
          {
            label: "Adım 2",
            explanation:
              "N ve ln 2 ortak olduğundan etkinlik 1/etkinlik 2=T 2/T 1 olur.",
          },
          {
            label: "Adım 3",
            explanation:
              "9/3=3 bulunur; kısa yarı ömürlü örnek o anda üç kat hızlı bozunur.",
          },
        ],
        answer: "Aktivite oranı 3.",
        check: "Eşit kalan sayıda uzun yarı ömür daha küçük aktivite vermeli.",
        pitfall: "Aynı N yi eşit aktivite için yeterli sanma.",
      },
      {
        title: "Enerji birimiyle kütle farkı",
        prompt:
          "Bir tepkimede başlangıç durgun kütlesi ürünlerinkinden 0,006 u büyük. 1u·c²=931,5 MeV veriliyor. Açığa çıkan enerjiyi bul.",
        strategy: "Kütle farkını verilen u enerji karşılığıyla çarp.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Δm=0,006 u pozitif olduğundan son durumun eksik durgun enerjisi dışarı aktarılabilir.",
          },
          {
            label: "Adım 2",
            explanation: "Q=Δmc²=0,006×931,5=5,589 MeV dir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Bu enerji ürün hareketleri ve varsa fotonlar arasında paylaşılır; A nın değişmesi gerekmez.",
          },
        ],
        answer: "5,589 MeV.",
        check:
          "0,006 nın 0,01 den küçük olması enerjiyi 9,315 MeV den küçük tutar.",
        pitfall:
          "Kütle numarasındaki tam sayı korunumunu gerçek kütle eşitliği sanma.",
      },
      {
        title: "Nötron katsayısını tamamla",
        prompt:
          "Temsili fisyonda X(A 240, Z 94)+n→Y(A 144, Z 56)+Zürün(A 93, Z 38)+k n yazılıyor. k yi bul ve yükü denetle.",
        strategy: "Sol ve sağ A toplamını, ardından Z toplamını kur.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Solda toplam A 240+1=241 dir. Sağ çekirdeklerde 144+93=237 vardır.",
          },
          {
            label: "Adım 2",
            explanation: "Her nötron A 1 verdiğinden k=241−237=4 tür.",
          },
          {
            label: "Adım 3",
            explanation:
              "Yük 94=56+38 ile korunur; nötronlar Z ye katkı vermez.",
          },
        ],
        answer: "k=4.",
        check: "Sağ toplam A 144+93+4=241 dir.",
        pitfall: "Nötron katsayısını atom numarası denklemine ekleme.",
      },
    ],
    recall: [
      {
        prompt: "β⁻ sırasında A, Z, N nasıl değişir?",
        answer: "A sabit, Z+1, N−1; elektron ve elektron antinötrinosu çıkar.",
      },
      {
        prompt: "Gama yayımında gerçek kütle sabit midir?",
        answer: "A ve Z sabitken enerji azalır; durgun kütle azalabilir.",
      },
      {
        prompt: "Yarı ömür tek çekirdeğin ömrü müdür?",
        answer:
          "Hayır; sabit olasılıklı topluluğun ortalama yarıya inme süresidir.",
      },
      {
        prompt: "Aktivite ile doz aynı mıdır?",
        answer:
          "Hayır; aktivite bozunma/s, doz soğurulan enerji/kütle ile ilgilidir.",
      },
      {
        prompt: "Fisyon ile füzyonun enerji koşulu nedir?",
        answer:
          "Enerji veren olayda toplam son durgun kütle başlangıçtan küçüktür.",
      },
      {
        prompt: "Alfa sayısı zincirde nasıl bulunur?",
        answer: "Başka A değiştiren süreç yoksa toplam A azalmasını 4 e böl.",
      },
    ],
    items: [
      {
        prompt:
          "A=56, Z=24 olan bir çekirdeğin proton ve nötron sayıları hangisidir?",
        options: ["28 ve 28", "32 ve 24", "56 ve 24", "24 ve 56", "24 ve 32"],
        answer: 4,
        hint: "Z yi doğrudan kullan; A dan çıkar.",
        explanation:
          "Proton sayısı tanımdan 24 tür. Nötron sayısı 56−24=32 dir. 24+32=56 toplamı kütle numarasını geri verir.",
        guidance: {
          knowledge: ["A proton ve nötron toplamı, Z proton sayısıdır."],
          strategy: "Z yi doğrudan kullan; A dan çıkar.",
          steps: [
            "Proton sayısı tanımdan 24 tür.",
            "Nötron sayısı 56−24=32 dir.",
            "24+32=56 toplamı kütle numarasını geri verir.",
          ],
          optionReasons: [
            "N=Z varsayımını veriye rağmen zorlar.",
            "Z ile N yi yer değiştirir.",
            "A yı proton sayısı sayar.",
            "A yı nötron sayısı sayar.",
            "Doğru: p=Z 24, N=A−Z 32 dir.",
          ],
          commonError:
            "Kütle numarasını kilogram kütle veya nötron sayısı gibi kullanma.",
          check: "İki sayının toplamı 56 olmalı.",
        },
      },
      {
        prompt:
          "A=210, Z=84 çekirdeği enerji bakımından izinli bir alfa bozunması yapıyor. Ürünün A ve Z si nedir?",
        options: [
          "208 ve 82",
          "206 ve 82",
          "210 ve 82",
          "214 ve 86",
          "206 ve 86",
        ],
        answer: 1,
        hint: "Çıkan parçacığın iki sayısını ana çekirdekten çıkar.",
        explanation:
          "Toplam A korunumu 210=Aürün+4 verir. Toplam Z korunumu 84=Zürün+2 verir. Aürün 206, Zürün 82 çıkar; N de 126 dan 124 e iner.",
        guidance: {
          knowledge: ["Alfa helyum çekirdeğidir: A 4, Z 2."],
          strategy: "Çıkan parçacığın iki sayısını ana çekirdekten çıkar.",
          steps: [
            "Toplam A korunumu 210=Aürün+4 verir.",
            "Toplam Z korunumu 84=Zürün+2 verir.",
            "Aürün 206, Zürün 82 çıkar; N de 126 dan 124 e iner.",
          ],
          optionReasons: [
            "Alfayı yalnız iki nükleon sayar.",
            "Doğru: Alfa 4 nükleon ve 2 proton taşır.",
            "Alfanın nükleonlarını saymaz.",
            "Yayım yerine alfa yakalama yapar.",
            "Yük işaretini ters günceller.",
          ],
          commonError: "Alfa parçacığını nötr helyum atomu sayıp yükü 0 yazma.",
          check: "206+4=210 ve 82+2=84 denklemlerini kur.",
        },
      },
      {
        prompt:
          "A=32, Z=15 olan bir çekirdeğin izinli β⁻ bozunmasında ürünün nötron sayısı nedir?",
        options: ["32", "17", "18", "16", "15"],
        answer: 3,
        hint: "Önce yeni Z yi bul, sonra N=A−Z.",
        explanation:
          "İlk N 32−15=17 dir. Bir β⁻ Z yi 16 ya çıkarır, A 32 değişmez. Yeni N 32−16=16 dır; bir nötron azalmıştır.",
        guidance: {
          knowledge: [
            "β⁻ nükleon sayısını korurken bir nötronu protona çevirir.",
          ],
          strategy: "Önce yeni Z yi bul, sonra N=A−Z.",
          steps: [
            "İlk N 32−15=17 dir.",
            "Bir β⁻ Z yi 16 ya çıkarır, A 32 değişmez.",
            "Yeni N 32−16=16 dır; bir nötron azalmıştır.",
          ],
          optionReasons: [
            "A yı nötron sayısı kullanır.",
            "İlk nötron sayısını korur.",
            "Nötrondan protona dönüşümün yönünü ters kurar.",
            "Doğru: A 32 kalır, Z 16 olur, N 16 çıkar.",
            "Yeni proton sayısındaki değişimi nötron sayısı diye hatalı sayar.",
          ],
          commonError:
            "Beta elektronunu çekirdekten çıkan eski yörünge elektronu sanma.",
          check: "Yeni proton ve nötron toplamı 32 kalmalı.",
        },
      },
      {
        prompt:
          "İzinli bir β⁺ sürecinde X(A 18, Z 9) çekirdeği bozunuyor. Doğru ürün ve çıkan leptonlar hangisidir?",
        options: [
          "A 14, Z 7; alfa",
          "A 17, Z 8; pozitron",
          "A 18, Z 8; pozitron ve elektron nötrinosu",
          "A 18, Z 10; elektron ve antinötrino",
          "A 18, Z 9; yalnız gama",
        ],
        answer: 2,
        hint: "Proton dönüşümünü A, Z defterine uygula.",
        explanation:
          "Bir proton nötrona döndüğünden Z 9 dan 8 e iner. Toplam nükleon sayısı 18 kalır. Pozitron+1 ve nötrino 0 yüküyle 8+1=9 yük dengesi sağlanır.",
        guidance: {
          knowledge: [
            "β⁺ p→n+e⁺+νe biçimindedir; enerji izni soruda verilmiştir.",
          ],
          strategy: "Proton dönüşümünü A, Z defterine uygula.",
          steps: [
            "Bir proton nötrona döndüğünden Z 9 dan 8 e iner.",
            "Toplam nükleon sayısı 18 kalır.",
            "Pozitron+1 ve nötrino 0 yüküyle 8+1=9 yük dengesi sağlanır.",
          ],
          optionReasons: [
            "Alfa sonuçlarını beta yerine koyar.",
            "Beta sırasında A yı değiştirir.",
            "Doğru: Proton nötrona dönüşür, A sabit, Z bir azalır.",
            "β⁻ sürecini yazmıştır.",
            "Element dönüşümünü yok sayar.",
          ],
          commonError:
            "Serbest protonun her koşulda bu şekilde bozunacağını genelleme.",
          check: "Çıkan parçacığın yükünü ürün Z sine ekleyince 9 çıkmalı.",
        },
      },
      {
        prompt:
          "Bir çekirdek elektron yakalıyor: p+e⁻→n+νe. Başlangıç A=40, Z=19 ise ürünün A, Z si nedir?",
        options: ["40 ve 19", "40 ve 18", "40 ve 20", "39 ve 18", "41 ve 19"],
        answer: 1,
        hint: "Giren elektronu sol yük defterine koy.",
        explanation:
          "Başlangıç çekirdek yükü 19e ile elektronun−e yükü toplam 18e dir. Ürün çekirdekte proton sayısı 18 olmalıdır. Proton nötrona döndüğü için A 40 değişmez; N 22 olur.",
        guidance: {
          knowledge: ["Elektron yakalama A yı korur, Z yi 1 azaltır."],
          strategy: "Giren elektronu sol yük defterine koy.",
          steps: [
            "Başlangıç çekirdek yükü 19e ile elektronun−e yükü toplam 18e dir.",
            "Ürün çekirdekte proton sayısı 18 olmalıdır.",
            "Proton nötrona döndüğü için A 40 değişmez; N 22 olur.",
          ],
          optionReasons: [
            "Proton-nötron dönüşümünü ihmal eder.",
            "Doğru: Nükleon sayısı sabit, bir proton eksilir.",
            "β⁻ yönünde değiştirir.",
            "Yakalanan elektronu nükleon kaybı sayar.",
            "Elektronu nükleon eklenmesi sayar.",
          ],
          commonError: "Elektronun kütlesi var diye kütle numarasına 1 ekleme.",
          check: "19−1=18 yük dengesi ile A 40 ı ayrı denetle.",
        },
      },
      {
        prompt:
          "Uyarılmış bir çekirdek gama fotonu yayıyor. Hangisi zorunlu olarak korunur?",
        options: [
          "Çekirdeğin enerjisi ve gerçek kütlesi ayrı ayrı aynı kalır",
          "Yalnız A; Z bir artar",
          "A ve Z; çekirdeğin enerji düzeyi azalabilir",
          "A ve Z nin ikisi de azalır",
          "Yalnız Z; A bir azalır",
        ],
        answer: 2,
        hint: "Sayı defteri ve enerji defterini ayır.",
        explanation:
          "Yayılan fotonun A ve Z katkısı 0 dır. Çekirdeğin proton ve nötron sayıları aynı kalır. Daha düşük enerji düzeyine geçildiği için çekirdeğin iç enerjisi ve durgun kütlesi azalabilir.",
        guidance: {
          knowledge: [
            "Gama elektromanyetik fotondur; proton veya nötron götürmez.",
          ],
          strategy: "Sayı defteri ve enerji defterini ayır.",
          steps: [
            "Yayılan fotonun A ve Z katkısı 0 dır.",
            "Çekirdeğin proton ve nötron sayıları aynı kalır.",
            "Daha düşük enerji düzeyine geçildiği için çekirdeğin iç enerjisi ve durgun kütlesi azalabilir.",
          ],
          optionReasons: [
            "Çekirdeğin fotona verdiği enerjiyi hesaptan siler.",
            "Gama ile β⁻ yi karıştırır.",
            "Doğru: Nükleon sayıları aynı kalır, enerji fotona aktarılır.",
            "Gama ile alfa etkilerini karıştırır.",
            "Fotonu nükleon sayar.",
          ],
          commonError:
            "A nın sabitliğinden gerçek kütlenin de kesin sabitliğini çıkarma.",
          check: "Fotonun enerjisini içeren toplam sistem bütçesini kur.",
        },
      },
      {
        prompt:
          "X(A 220, Z 88) yalnız alfa ve β⁻ yayıp Y(A 208, Z 84) oluyor. Kaç alfa ve β⁻ gerekir?",
        options: [
          "4 alfa,2 β⁻",
          "1 alfa,6 β⁻",
          "2 alfa,3 β⁻",
          "3 alfa,2 β⁻",
          "3 alfa,0 β⁻",
        ],
        answer: 3,
        hint: "A dan alfayı, sonra Z den beta sayısını bul.",
        explanation:
          "220−208=12 olduğundan 3 alfa vardır. Üç alfa sonrası Z 88−6=82 olur. 84 e ulaşmak için iki β⁻ gerekir.",
        guidance: {
          knowledge: ["Alfa ΔA−4,ΔZ−2;β⁻ ΔA 0,ΔZ+1 verir."],
          strategy: "A dan alfayı, sonra Z den beta sayısını bul.",
          steps: [
            "220−208=12 olduğundan 3 alfa vardır.",
            "Üç alfa sonrası Z 88−6=82 olur.",
            "84 e ulaşmak için iki β⁻ gerekir.",
          ],
          optionReasons: [
            "Son A 204 olur.",
            "Son A 216 olur.",
            "A farkını sağlamaz.",
            "Doğru: A farkı 12 üç alfa; Z 82 den 84 e iki beta ister.",
            "Son Z 82 kalır.",
          ],
          commonError: "A ve Z için aynı katsayıyı kullanma.",
          check: "88−2×3+2=84 ve 220−4×3=208 olmalı.",
        },
      },
      {
        prompt:
          "Bir bozunma zincirinde başlangıç ve son A, Z değerleri biliniyor; araya istenen sayıda gama geçişi eklenebiliyor. Gama sayısı bu veriden belirlenebilir mi?",
        options: [
          "Evet; son çekirdek nötrse sıfırdır",
          "Evet; her beta için kesin iki gamadır",
          "Evet; A farkının 4 te biridir",
          "Evet; Z farkına eşittir",
          "Hayır; gama A ve Z yi değiştirmez",
        ],
        answer: 4,
        hint: "Aynı A, Z ye sıfır veya birkaç gama eklemeyi düşün.",
        explanation:
          "Bir gama eklemek A ve Z toplamlarına 0 değişim ekler. Bu yüzden aynı başlangıç-son sayıları farklı gama sayılarıyla uyumludur. Enerji düzeyi veya yayılan foton verisi olmadan gama sayısı bulunamaz.",
        guidance: {
          knowledge: ["Gama enerji düzeyini değiştirir, A ve Z yi korur."],
          strategy: "Aynı A, Z ye sıfır veya birkaç gama eklemeyi düşün.",
          steps: [
            "Bir gama eklemek A ve Z toplamlarına 0 değişim ekler.",
            "Bu yüzden aynı başlangıç-son sayıları farklı gama sayılarıyla uyumludur.",
            "Enerji düzeyi veya yayılan foton verisi olmadan gama sayısı bulunamaz.",
          ],
          optionReasons: [
            "Atomun yükü gama sayısını belirlemez.",
            "Böyle evrensel bir oran yoktur.",
            "Bu yöntem alfa sayısını koşullu bulur.",
            "Z değişimi gama sayısı değildir.",
            "Doğru: Sayı defteri gama geçişlerini görünür kılmaz.",
          ],
          commonError:
            "Korunan sayıları enerji düzeyi bilgisinin yerine koyma.",
          check:
            "Bir ve iki gama içeren iki zincirin aynı A, Z sonucunu verebildiğini göster.",
        },
      },
      {
        prompt:
          "Kararlı olduğu belirtilen ağır bir çekirdekte N>Z ölçülüyor. Hangi çıkarım uygundur?",
        options: [
          "Ağır kararlı çekirdekte nötron fazlası olabilir; N/Z tek başına kararsızlık ölçütü değildir",
          "Bu çekirdeğin A sıZ den küçüktür",
          "Nötron fazlası atomun net yükünü negatif yapar",
          "Kararlı çekirdekte mutlaka N=Z dir",
          "N>Z olan her çekirdek zorunlu radyoaktiftir",
        ],
        answer: 0,
        hint: "A, N, Z tanımlarını gerçek kararlılık bilgisinden ayır.",
        explanation:
          "Nötronlar güçlü bağa katkı verirken proton gibi Coulomb itmesi eklemez. Ağır kararlı çekirdeklerde N>Z olağan olabilir. Bu veri tek başına hangi bozunmanın gerçekleşeceğine karar verdirmez.",
        guidance: {
          knowledge: [
            "Kararlılık çekirdek enerji yapısına bağlıdır; ağır çekirdeklerde N/Z 1 den büyük olabilir.",
          ],
          strategy: "A, N, Z tanımlarını gerçek kararlılık bilgisinden ayır.",
          steps: [
            "Nötronlar güçlü bağa katkı verirken proton gibi Coulomb itmesi eklemez.",
            "Ağır kararlı çekirdeklerde N>Z olağan olabilir.",
            "Bu veri tek başına hangi bozunmanın gerçekleşeceğine karar verdirmez.",
          ],
          optionReasons: [
            "Doğru: Verilen kararlılık bilgisi ağır çekirdeklerdeki eğilimle uyumludur.",
            "A=Z+N olduğundan A daha büyüktür.",
            "Nötronun elektrik yükü 0 dır.",
            "Hafif çekirdek eğilimini tümüne geneller.",
            "Yanlış evrensel oran kuralını dayatır.",
          ],
          commonError:
            "N/Z nin 1 den farklılığını otomatik radyoaktivite testi sayma.",
          check: "Net çekirdek yükünün yine+Ze olduğunu yaz.",
        },
      },
      {
        prompt:
          "Yarı ömrü 4 saat olan bir izotopun başlangıç miktarı 80 mg. Tek izotop ve ideal bozunma modeli varsayılıyor.12 saat sonra bozunmamış izotop miktarı kaç mg dır?",
        options: ["10", "20", "70", "40", "0"],
        answer: 0,
        hint: "12 saati 4 saatlik aralıklara böl.",
        explanation:
          "12/4=3 yarı ömür geçer. Miktar 80→40→20→10 mg olur. Sorulan kalan izotop 10 mg, bozunan 70 mg dır.",
        guidance: {
          knowledge: ["Her yarı ömürde o anda kalan miktarın yarısı kalır."],
          strategy: "12 saati 4 saatlik aralıklara böl.",
          steps: [
            "12/4=3 yarı ömür geçer.",
            "Miktar 80→40→20→10 mg olur.",
            "Sorulan kalan izotop 10 mg, bozunan 70 mg dır.",
          ],
          optionReasons: [
            "Doğru: Üç yarı ömür sonunda 80/8=10 kalır.",
            "Yalnız iki yarı ömür sayar.",
            "Bozunan miktarı kalan diye verir.",
            "Yalnız bir yarı ömür sayar.",
            "Üç yarı ömrü tam yok oluş sanır.",
          ],
          commonError:
            "Her seferinde başlangıçtaki 40 mg ı çıkarmaya devam etme.",
          check: "Kalan/ilk oranı 1/8 olmalı.",
        },
      },
      {
        prompt:
          "Bir örnekte 1000 radyoaktif çekirdek var. Yarı ömür T için hangi ifade doğrudur?",
        options: [
          "T sonra ortalama 500 kalır; hangi tek çekirdeğin ne zaman bozunacağı kesin belirlenmez",
          "HerT de ilk 1000 in 500 ü yeniden azalır",
          "Her çekirdek T anında aynı anda bozunur",
          "2T sonra hiçbir çekirdek kalamaz",
          "T sonra her deneyde kesin 500 kalır",
        ],
        answer: 0,
        hint: "Beklenen sayı ile tek deney sonucunu ayır.",
        explanation:
          "Modelde bir çekirdeğin T sonunda kalma olasılığı 1/2 dir. 1000 çekirdek için beklenen kalan 1000×1/2=500 olur. Tek deneyde sayı dalgalanabilir; model kimlik ve kesin bozunma zamanı vermez.",
        guidance: {
          knowledge: [
            "Yarı ömür bağımsız çekirdeklerin olasılıksal topluluk davranışını betimler.",
          ],
          strategy: "Beklenen sayı ile tek deney sonucunu ayır.",
          steps: [
            "Modelde bir çekirdeğin T sonunda kalma olasılığı 1/2 dir.",
            "1000 çekirdek için beklenen kalan 1000×1/2=500 olur.",
            "Tek deneyde sayı dalgalanabilir; model kimlik ve kesin bozunma zamanı vermez.",
          ],
          optionReasons: [
            "Doğru: Topluluk beklentisi ile bireysel rastgelelik ayrılır.",
            "Başlangıç yerine kalan miktardan yarılama yapılmalıdır.",
            "Yarı ömrü ortak randevu sanır.",
            "İdeal model 2T de ortalama 250 verir.",
            "İstatistiksel dalgalanmayı yok sayar.",
          ],
          commonError:
            "Sürekli ortalama eğrisini tek çekirdeğin kesin zaman çizelgesi sanma.",
          check: "2T için beklenen sayının 250 olduğunu da kontrol et.",
        },
      },
      {
        prompt:
          "Eşit sayıda çekirdek içeren K ve L örneklerinin yarı ömürleri sırasıyla 2 ve 8 saattir. Aktivite=ln 2·N/T ise AK/AL kaçtır?",
        options: ["4", "1", "8", "1/4", "2"],
        answer: 0,
        hint: "Ortak ln 2 ve N çarpanlarını sadeleştir.",
        explanation:
          "AK=ln 2·N/2, AL=ln 2·N/8 yazılır. Bölümde ortak çarpanlar gider. (1/2)/(1/8)=4 bulunur; kısa yarı ömür daha yüksek aktivite verir.",
        guidance: {
          knowledge: ["Aynı N için aktivite yarı ömürle ters orantılıdır."],
          strategy: "Ortak ln 2 ve N çarpanlarını sadeleştir.",
          steps: [
            "AK=ln 2·N/2, AL=ln 2·N/8 yazılır.",
            "Bölümde ortak çarpanlar gider.",
            "(1/2)/(1/8)=4 bulunur; kısa yarı ömür daha yüksek aktivite verir.",
          ],
          optionReasons: [
            "Doğru: Eşit N için oran TL/TK=8/2 dir.",
            "Eşit sayıyı eşit hız sanır.",
            "Tek başına 8 saat değerini boyutsuz oran yapar.",
            "Yarı ömürle aktiviteyi aynı yönde oranlar.",
            "Yarı ömür farkını yanlış ölçekler.",
          ],
          commonError:
            "Yarı ömrün uzunluğunu saniyedeki bozunma sayısıyla doğru orantılı sanma.",
          check: "Oranı ters çevirince 1/4 çıktığını gör.",
        },
      },
      {
        prompt:
          "Aynı izotopun aktivitesi başlangıçta 640 Bq iken iki yarı ömür sonra kaç Bq olur?",
        options: ["480", "160", "0", "80", "320"],
        answer: 1,
        hint: "Aktiviteyi 640 tan başlayıp iki kez yarıla.",
        explanation:
          "Bir yarı ömürde 640/2=320 Bq olur. İkinci yarı ömürde 320/2=160 Bq olur. Bu değer, saniyede beklenen 160 bozunmadır; kalan çekirdek sayısı değildir.",
        guidance: {
          knowledge: [
            "λ sabit olduğunda etkinlik=λN kalan çekirdek sayısıyla aynı oranda azalır.",
          ],
          strategy: "Aktiviteyi 640 tan başlayıp iki kez yarıla.",
          steps: [
            "Bir yarı ömürde 640/2=320 Bq olur.",
            "İkinci yarı ömürde 320/2=160 Bq olur.",
            "Bu değer, saniyede beklenen 160 bozunmadır; kalan çekirdek sayısı değildir.",
          ],
          optionReasons: [
            "Azalan aktiviteyi kalan diye verir.",
            "Doğru: Aynı izotop için aktivite de iki kez yarılanır.",
            "Üstel azalmayı sonlu sürede bitiş sanır.",
            "Üç yarı ömür uygular.",
            "Bir yarı ömür uygular.",
          ],
          commonError:
            "Bq birimini çekirdek sayısı veya enerji dozu gibi okuma.",
          check: "Son/ilk aktivite 1/4 olmalı.",
        },
      },
      {
        prompt:
          "Bir çekirdek için serbest nükleon toplam kütlesi 100,850 u, çekirdek kütlesi 100,800 u dur.1u·c²=930 MeV alınırsa bağlanma enerjisi kaç MeV dir?",
        options: ["0,05", "−46,5", "46,5", "93", "1860"],
        answer: 2,
        hint: "Önce küçük kütle farkını bul, sonra enerjiye çevir.",
        explanation:
          "Δm 100,850−100,800=0,050 u dur. Eb=0,050×930=46,5 MeV dir. Çekirdeği serbest nükleonlara ayırmak bu büyüklükte enerji gerektirir.",
        guidance: {
          knowledge: ["Eb=(serbest nükleon kütlesi−çekirdek kütlesi)c²."],
          strategy: "Önce küçük kütle farkını bul, sonra enerjiye çevir.",
          steps: [
            "Δm 100,850−100,800=0,050 u dur.",
            "Eb=0,050×930=46,5 MeV dir.",
            "Çekirdeği serbest nükleonlara ayırmak bu büyüklükte enerji gerektirir.",
          ],
          optionReasons: [
            "Kütle birimindeki sayıyı enerji diye bırakır.",
            "Bağlanmayı çözmek için gereken enerjinin işaretini ters verir.",
            "Doğru: Pozitif kütle farkı 0,050 u ile 930 çarpılır.",
            "Kütle farkını iki kat sayar.",
            "Toplam kütle yerine yanlış oran kullanır.",
          ],
          commonError:
            "Bağlanma enerjisini çekirdeğin tüm durgun enerjisiyle karıştırma.",
          check: "Birimi u×MeV/u=MeV olarak denetle.",
        },
      },
      {
        prompt:
          "Temsili fisyon X(A 236, Z 92)→Y(A 140, Z 54)+W(A 93, Z 38)+k n olarak veriliyor. k kaçtır?",
        options: ["1", "4", "2", "3", "0"],
        answer: 3,
        hint: "Çekirdek ürünlerinin A larını toplayıp 236 dan çıkar.",
        explanation:
          "Ürün çekirdeklerinin A toplamı 140+93=233 tür. Sol 236 olduğundan üç nötron gerekir. Yük 54+38=92 ile zaten dengededir.",
        guidance: {
          knowledge: ["Nötronun A sı 1, Z si 0 dır; iki toplam ayrı korunur."],
          strategy: "Çekirdek ürünlerinin A larını toplayıp 236 dan çıkar.",
          steps: [
            "Ürün çekirdeklerinin A toplamı 140+93=233 tür.",
            "Sol 236 olduğundan üç nötron gerekir.",
            "Yük 54+38=92 ile zaten dengededir.",
          ],
          optionReasons: [
            "A toplamını 234 te bırakır.",
            "A toplamını 237 ye çıkarır.",
            "A toplamını 235 te bırakır.",
            "Doğru: 236−140−93=3 tür.",
            "Üç nükleonun hesabını eksik bırakır.",
          ],
          commonError: "Nötronları Z toplamında da sayma.",
          check: "140+93+3=236 eşitliğini tamamla.",
        },
      },
      {
        prompt: "Fisyon ve füzyonla ilgili hangi ifade doğrudur?",
        options: [
          "Her füzyon olayı her fisyondan olay başına daha fazla enerji verir",
          "Füzyon elektronların atom yörüngesinde yer değiştirmesidir",
          "Füzyon için yüklü çekirdeklerin yaklaşması gerekmez",
          "Fisyon A ve Z toplamlarını korumaz",
          "Enerji veren her iki olayda da toplam ürün durgun kütlesi başlangıçtan küçüktür",
        ],
        answer: 4,
        hint: "İki olayın ortak enerji bütçesini ara.",
        explanation:
          "Fisyon ağır çekirdeği böler, füzyon hafif çekirdekleri birleştirir. Enerji açığa çıkması için son toplam durgun enerji daha düşük olmalıdır. Bu ortak koşul hangi olayın her durumda daha çok enerji verdiğini tek başına belirlemez.",
        guidance: {
          knowledge: [
            "Nükleer enerji hesabı toplam kütle farkıyla yapılır; olay başına ve kütle başına karşılaştırma ayrıdır.",
          ],
          strategy: "İki olayın ortak enerji bütçesini ara.",
          steps: [
            "Fisyon ağır çekirdeği böler, füzyon hafif çekirdekleri birleştirir.",
            "Enerji açığa çıkması için son toplam durgun enerji daha düşük olmalıdır.",
            "Bu ortak koşul hangi olayın her durumda daha çok enerji verdiğini tek başına belirlemez.",
          ],
          optionReasons: [
            "Normalizasyon ve tepkime türlerini yok sayan genellemedir.",
            "Çekirdek olayıyla atom içi geçişi karıştırır.",
            "Çekirdeklerin birleşme koşulunu siler.",
            "Nükleon ve yük toplamları korunur.",
            "Doğru: Açığa çıkan enerji toplam durgun kütle farkından gelebilir.",
          ],
          commonError:
            "Füzyon kelimesinden bütün tepkimeler için tek enerji sıralaması çıkarma.",
          check:
            "Kıyas yaparken eşit olay sayısı mı eşit yakıt kütlesi mi verildiğini sor.",
        },
      },
      {
        prompt:
          "Bir reaktörün enerji dönüşümü en uygun hangi sırayla açıklanır?",
        options: [
          "Manyetik alan → yoktan enerji → fisyon",
          "Jeneratör → çekirdek oluşumu → türbin → ısı",
          "Yalnız kimyasal yanma → füzyon",
          "Nükleer enerji → doğrudan her çekirdekten hazır elektrik kablosu",
          "Nükleer enerji → ortama ısı aktarımı → türbin hareketi → jeneratörde elektrik",
        ],
        answer: 4,
        hint: "Reaktör, türbin ve jeneratöre ayrı görev ver.",
        explanation:
          "Çekirdek ürünlerinin hareket ve ışımaları ortama enerji aktarır. Taşınan ısı türbini döndüren sisteme aktarılır. Jeneratör mekanik enerjiyi elektrik enerjisine dönüştürür.",
        guidance: {
          knowledge: [
            "Fisyon ürünleri ortama enerji aktarır; türbin-jeneratör elektrik üretim zincirini tamamlar.",
          ],
          strategy: "Reaktör, türbin ve jeneratöre ayrı görev ver.",
          steps: [
            "Çekirdek ürünlerinin hareket ve ışımaları ortama enerji aktarır.",
            "Taşınan ısı türbini döndüren sisteme aktarılır.",
            "Jeneratör mekanik enerjiyi elektrik enerjisine dönüştürür.",
          ],
          optionReasons: [
            "Enerji korunumu ile uyuşmaz.",
            "Neden-sonuç sırasını ters çevirir.",
            "Kimyasal ve nükleer süreçleri karıştırır.",
            "Isı makinesini ve jeneratörü atlar.",
            "Doğru: Santralde ara enerji dönüşümleri korunur.",
          ],
          commonError:
            "Fisyon olayını kendi başına türbin ve jeneratör yerine geçen pil sayma.",
          check: "Her okta hangi fiziksel aygıtın iş gördüğünü adlandır.",
        },
      },
      {
        prompt:
          "Alfa ışını kâğıtta kolay durdurulurken gama daha giricidir. Hangisi bu bilgilerden çıkarılabilecek uygun yorumdur?",
        options: [
          "Gama ışını elektrik alanında pozitif yük gibi sapar",
          "Alfa yayıcı vücuda alındığında kesin zararsızdır",
          "Bütün radyasyonlar aynı zırhla eşit biçimde tamamen durdurulur",
          "Dış maruziyet ve vücut içine alınma farklıdır; alfa yayıcı içte önemli olabilir",
          "İyonlaştırıcı olmayan bütün dalgalar her güçte zararsızdır",
        ],
        answer: 3,
        hint: "Kısa menzilin kaynak içeri alındığında ne anlama geldiğini düşün.",
        explanation:
          "Kâğıt dışarıdaki alfa parçacığını durdurabilir. Alfa yayıcı doku içindeyse enerji yakın çevreye aktarılabilir. Bu yüzden düşük dış giricilikten genel zararsızlık sonucu çıkmaz.",
        guidance: {
          knowledge: [
            "Etkide ışınım türü, enerji, maruziyet yolu ve süre birlikte rol oynar.",
          ],
          strategy:
            "Kısa menzilin kaynak içeri alındığında ne anlama geldiğini düşün.",
          steps: [
            "Kâğıt dışarıdaki alfa parçacığını durdurabilir.",
            "Alfa yayıcı doku içindeyse enerji yakın çevreye aktarılabilir.",
            "Bu yüzden düşük dış giricilikten genel zararsızlık sonucu çıkmaz.",
          ],
          optionReasons: [
            "Gama yüksüzdür.",
            "Kısa menzilde yüksek iyonlaştırmayı yok sayar.",
            "Malzeme ve enerji bağımlılığını yok sayar.",
            "Doğru: Giricilik tek başına bütün biyolojik etkiyi belirlemez.",
            "Güç ve maruziyet koşullarını siler.",
          ],
          commonError:
            "Nüfuz etme gücünü tek ve evrensel zarar sıralaması sayma.",
          check:
            "Dışarıdaki kaynakla doku içindeki kaynağı iki ayrı çizimle karşılaştır.",
        },
      },
    ],
    source:
      "MEB ve OGM kapsamı esas alınarak özgün hazırlanmış konu anlatımı, modeller ve öğretim soruları. Resmî sınav sorusu değildir.",
  },
  {
    id: "ozel-gorelilik",
    topic: "detail-399",
    title: "Modern fizik izafiyet teorisi",
    minutes: 105,
    objectives: [
      "İki postülayı ve eylemsiz çerçeveyi tanı.",
      "Öz zaman, öz uzunluk, eşzamanlılık ve Lorentz katsayısını doğru olaya uygula.",
      "Durgun, toplam ve kinetik enerjiyi ayır; düşük hız sınırını denetle.",
    ],
    sections: [
      {
        title: "Önkoşul: hız ve referans çerçevesi",
        paragraphs: [
          "Hız bir referans çerçevesine göre ölçülür. Eylemsiz çerçeve, serbest cismin sabit hızla gittiği çerçevedir; sabit hızlı trenin içi yerel ideal model olabilir. Dünya bütün evren için mutlak durgun merkez değildir.",
          "Özel görelilikte iki gözlemci aynı olaya farklı konum ve zaman koordinatı verebilir. Hangi ölçümün hangi çerçeveye ait olduğunu belirtmeden daha uzun, daha kısa veya daha yavaş demek eksik bir karşılaştırmadır.",
        ],
      },
      {
        title: "Michelson-Morley deneyi ne sınadı?",
        paragraphs: [
          "Girişimölçerde birbirine dik iki ışık yolunun gidiş-geliş süre farkının aygıt döndürülünce değişmesi bekleniyordu. Klasik durağan esir rüzgârı modelinin öngördüğü düzenli saçak kaymasının bulunmaması o modele karşı güçlü bulgu sağladı.",
          "Deneyin sonucu tek başına mantıksal olarak bütün olası esir kuramlarını ya da bütün görelilik sonuçlarını kanıtlayan bir cümleye indirgenmez. Modern ışık hızı ve görelilik bilgisi çok sayıda deneyle sınanan daha geniş bir kuramsal bütündür.",
        ],
      },
      {
        title: "Birinci postüla: fizik yasaları",
        paragraphs: [
          "Fizik yasaları bütün eylemsiz çerçevelerde aynı biçimdedir. Kapalı bir laboratuvarda yalnız düzgün doğrusal hareketten kaynaklanan ayrıcalıklı bir mutlak durgunluk testi kurulmaz; eylemsiz sistemlerden biri yasa bakımından üstün değildir.",
          "Bu postüla bütün ölçülen sayıların eşit olduğu anlamına gelmez. Aynı cismin hızı, momentumu ve enerjisi çerçeveye göre değişebilir. Aynı kalan yasaların biçimi ve uygun fiziksel değişmezlerdir; koordinat değerleri değildir.",
        ],
      },
      {
        title: "İkinci postüla: boşluktaki c",
        paragraphs: [
          "Bütün eylemsiz gözlemciler boşluktaki ışık hızını c ölçer. Hareketli vagondan ileri gönderilen ışığı dış gözlemci c+v diye ölçmez; ışığın kaynak hareketinden bağımsız boşluk hızı yine c dir.",
          "Ortam içindeki faz hızı c/n olabilir; bu ikinci postülaya aykırılık değildir. Işığın boşlukta sabitliğiyle kaynak frekansının veya ölçülen dalga boyunun her çerçevede eşit olması karıştırılmaz; Doppler kayması bulunabilir.",
        ],
      },
      {
        title: "Olay ve eşzamanlılık",
        paragraphs: [
          "Bir flaşın yanması gibi olay konum ve zamanla tanımlanır. İki uzak olay bir çerçevede eşzamanlıysa başka hareketli çerçevede eşzamanlı olmak zorunda değildir; saatleri karşılaştırmak senkronizasyon tanımı gerektirir.",
          "Çubuğun uzunluğunu ölçmek için iki ucun konumunu aynı ölçüm çerçevesinde aynı anda kaydetmek gerekir. Farklı zamanlarda alınmış uç fotoğraflarını çıkarıp uzunluk diye sunmak görelilik ölçüm tanımını sağlamaz.",
        ],
      },
      {
        title: "Lorentz katsayısının davranışı",
        paragraphs: [
          "β=v/c ve γ=1/√(1−β²) tanımlanır. Kütleli cisim için 0≤|β|<1;γ≥1 dir. Eşitlik yalnız v=0 da olur. β büyüdükçe γ doğrusal değil, giderek daha hızlı artar.",
          "β çok küçükken γ yaklaşık 1 olur ve klasik sonuçlara yaklaşılır. Hesapta önce 1−β² nin pozitif olduğunu denetle; β=1 için sonlu γ yazmak veya c üzeri hızları bu kütleli cisim formülüne yerleştirmek modelin dışındadır.",
        ],
      },
      {
        title: "Öz zaman hangi saatte?",
        paragraphs: [
          "Aynı saatin bulunduğu yerde gerçekleşen iki olay arasındaki o saatin okuması öz zaman Δτ dur. Saat hareket ederken onu izleyen eylemsiz laboratuvarda geçen süre Δt=γΔτ olur; aynı olay çifti karşılaştırılır.",
          "Öz zaman en kısa süre ezberi, hangi olayların aynı yerde olduğunu söylemeden kullanılmaz. Farklı saatlerden farklı konumlarda alınan ölçümleri tek saatin öz zamanı gibi birleştirmek ek çerçeve ve eşzamanlılık sorunları yaratır.",
        ],
      },
      {
        title: "Işık saati düşüncesi",
        paragraphs: [
          "İki ayna arasında dik yönde gidip gelen ışık saati kendine göre dik, yanından geçen laboratuvara göre eğik bir yol izler. Her iki çerçevede ışık hızı c olduğundan laboratuvarın daha uzun yoluna daha uzun süre karşılık gelir.",
          "Bu geometrik model γ zaman çarpanını anlamaya yardım eder; saatin bozuk çalıştığı veya ışığın daha yavaş olduğu iddiasını gerektirmez. Saatin mekanizmasına özgü bir kusur değil, zaman ölçümünün çerçeveler arası ilişkisi anlatılır.",
        ],
      },
      {
        title: "Hareketli parçacığın ömrü",
        paragraphs: [
          "Kararsız parçacığın kendi çerçevesinde ortalama ömrü τ₀ ise laboratuvardaki ortalama süre γτ₀ dır. Laboratuvarda beklenen yol vγτ₀ olur; çok sayıda parçacığın gözlenen ömürleri istatistiksel olarak sınanabilir.",
          "Parçacığın kendi çerçevesinde saati alışılmadık davranmaz; laboratuvar ve öz zaman ayrıdır. Böyle deneyler özel göreliliğin yalnız sınanmamış düşünce deneyi olduğu iddiasına karşı gerçek ölçüm örnekleridir.",
        ],
      },
      {
        title: "Öz uzunluk ve paralel büzülme",
        paragraphs: [
          "Cismin kendine göre durgun çerçevesindeki boyu L₀ öz uzunluktur. Hareket doğrultusuna paralel boy, başka eylemsiz çerçevede eşzamanlı uç ölçümüyle L=L₀/γ bulunur. Cismin malzemesi eziliyor diye yorumlanmaz.",
          "Hareket doğrultusuna dik boylar bu dönüşümde değişmez. Ölçülmüş eşzamanlı uzunluk ile cismin tek fotoğraftaki görünüşü aynı şey değildir; ışığın geliş süreleri görüntüye ek etkiler getirir.",
        ],
      },
      {
        title: "Bir olayı iki çerçeveye taşı",
        paragraphs: [
          "S′ çerçevesi S ye göre+x yönünde βc ile gidiyorsa ct′=γ(ct−βx), x′=γ(x−βct) olur. Burada ct ve x aynı uzunluk birimiyle yazılır; ct zamanı ışığın o sürede aldığı yola çevirir.",
          "İki olay için farkları aynı formülle dönüştürmek eşzamanlılığı gösterir. S deΔct=0 ama Δx≠0 ise β≠0 için Δct′=−γβΔx olur. İşaret hangi olayın önce olduğunu seçilen+x yönüne göre açıklar.",
        ],
      },
      {
        title: "Simetri ve ikizlerin yolu",
        paragraphs: [
          "Birbirinden düzgün hızla geçen iki eylemsiz gözlemci karşı tarafın hareketli saatini yavaş ölçebilir; eşzamanlılık tanımları farklı olduğu için mantık çelişkisi oluşmaz. Aynı uzak olayları kıyaslamadan simetri kırıldı denmez.",
          "Gidip geri dönen ikiz tek eylemsiz çerçevede kalmaz; yolunun bir bölümünde yön değiştirir. Buluşma olayları arasında iki dünya çizgisinin öz zamanları toplanır. Yalnız tek düzgün hız bölgesinin simetrisini bütün yolculuğa taşıma.",
        ],
      },
      {
        title: "Durgun enerji ve toplam enerji",
        paragraphs: [
          "Durgun kütle m için E₀=mc² dir; cisme kendi çerçevesinde atfedilen enerji ölçeğidir. Hareketli çerçevede toplam enerji E=γmc², kinetik enerji K=(γ−1)mc² olur.",
          "Bu anlatımda kütle m çerçeveden bağımsız durgun kütledir. Hız artınca kütle büyür ifadesi yerine enerji ve momentumun arttığı söylenir. Kütleli bir cismi c ye ulaştırıp E₀ elde etmek gibi bir koşul yoktur; dururken de E₀ vardır.",
        ],
      },
      {
        title: "Momentum ve enerji değişmezi",
        paragraphs: [
          "Göreli momentum p=γmv dir. E²−p²c²=m²c⁴ bağıntısında m durgun kütledir. Foton için m 0 olduğunda E=pc çıkar; bu enerji ve momentumun sıfır olmasını gerektirmez.",
          "Kütleli cismin v sini c ye yaklaştırırken toplam enerji ve momentum sınırsız büyür. Sonlu enerjiyle c ye ulaşma bu modelde mümkün değildir. Hareket enerjisini E₀ yerine toplam enerjiye eklemek çift sayımı önler.",
        ],
      },
      {
        title: "Klasik sınır ve küçük fark",
        paragraphs: [
          "β≪1 için γ≈1+β²/2, bu nedenle K≈mv²/2 olur. Özel görelilik düşük hızdaki başarılı klasik sonuçları sınır durumda içerir; klasik mekanik her günlük olayda yanlış diye terk edilmez.",
          "Sayısal model çok küçük β de γ−1 çıkarma kaybı yaşamamak için γ−1=β²γ²/(γ+1) özdeşliğini kullanır. Fiziksel küçük değerleri yuvarlayıp yok etmek yerine açık birim ve uygun hassasiyetle göstermek gerekir.",
        ],
      },
      {
        title: "Sistem enerjisi ve kütle değişimi",
        paragraphs: [
          "Kapalı bir sistemin durgun enerjisi iç hareketleri ve bağlanmaları içerir. Sistem dışarı enerji verirse sistemin durgun kütlesi azalabilir; her bileşenin A gibi sayıları bu yüzden değişmek zorunda değildir.",
          "Kimyasal ve nükleer enerji değişimlerinin ikisi de kütle-enerji bütçesiyle uyumludur, fakat büyüklük ölçekleri farklıdır. E=mc² yi yalnız nükleer patlamada geçerli bir formül sanma; hangi m ve E nin kullanıldığını söyle.",
        ],
      },
      {
        title: "Ölçümün sınırını açık yaz",
        paragraphs: [
          "Uydu saatlerinde hareketten gelen özel görelilik ile kütleçekiminden gelen genel görelilik etkileri birlikte önem taşıyabilir. Yüksekteki her saatin yalnız hız nedeniyle daima yavaş olduğu genellemesi eksiktir.",
          "Bu laboratuvar kütleçekim potansiyel farkını ihmal eden eylemsiz karşılaştırma yapar. Parametre değiştirince aynı olay çiftini ve aynı öz uzunluğu korur; böylece sonucu karıştıran ikinci bir koşulu gizlice değiştirmez.",
        ],
      },
      {
        title: "Üç soruluk çözüm denetimi",
        paragraphs: [
          "Bir hesapta önce hangi niceliğin öz değer olduğunu, sonra hangi çerçevenin sonuç istendiğini, son olarak olayların ölçüm koşulunu belirle. Öz zamanla öz uzunluğu aynı yönde γ ile çarpmak doğru değildir.",
          "Δt≥Δτ ve L≤L₀ sınırları hızlı fiziksel kontrollerdir. Enerjide E=E₀+K, p için sıfır hızda 0 ve toplam enerjide sıfır hızda E₀ sınırlarını denetleyerek yanlış formülü erken yakalayabilirsin.",
        ],
      },
    ],
    examples: [
      {
        title: "Hareketli saatin iki kaydı",
        prompt:
          "β=0,8 için γ=5/3 veriliyor. Bir saatin kendi yerinde iki tik arası 9 μs. Laboratuvar süresi ve bu sürede alınan yol(c=3×10⁸ m/s) nedir?",
        strategy: "Tikler saatin yerinde olduğundan 9 μs öz zamandır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Δt=(5/3)×9=15 μs bulunur.",
          },
          {
            label: "Adım 2",
            explanation: "v=0,8c=2,4×10⁸ m/s dir.",
          },
          {
            label: "Adım 3",
            explanation: "Laboratuvar yolu vΔt=2,4×10⁸×15×10⁻⁶=3600 m dir.",
          },
        ],
        answer: "15 μs ve 3600 m.",
        check: "Öz zaman 9 μs laboratuvar süresinden küçük olmalı.",
        pitfall: "Yol hesabında öz zamanla laboratuvar hızını doğrudan çarpma.",
      },
      {
        title: "Yalnız paralel kenar değişir",
        prompt:
          "Durgun çerçevesinde dikdörtgenin+x kenarı 12 m,+y kenarı 5 m. Cisim+x yönünde β=0,6 ile gidiyor;γ=1,25. Laboratuvar kenarlarını bul.",
        strategy: "Hareket yönüyle paralelliği kontrol et.",
        steps: [
          {
            label: "Adım 1",
            explanation: "x kenarı 12/1,25=9,6 m ölçülür.",
          },
          {
            label: "Adım 2",
            explanation: "y kenarı hareket yönüne dik olduğundan 5 m kalır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Ölçümler laboratuvarda aynı anda uç konumları alınarak tanımlanır; bir fotoğrafın biçimi istenmiyor.",
          },
        ],
        answer: "9,6 m ve 5 m.",
        check: "Paralel kenar kısalmalı, dik kenar sabit olmalı.",
        pitfall: "Her iki kenarı daγ ya bölme.",
      },
      {
        title: "Bir eşzamanlılığın dönüşümü",
        prompt:
          "S de iki olay için Δct=0 veΔx=12 ışık-saniyesi. S′ +0,6c ile gidiyor,γ=1,25. Δct′ veΔx′ yi bul.",
        strategy: "Farkları Lorentz dönüşümüne yerleştir.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Δct′=1,25(0−0,6×12)=−9 ışık-saniyesi bulunur.",
          },
          {
            label: "Adım 2",
            explanation: "Δx′=1,25(12−0)=15 ışık-saniyesidir.",
          },
          {
            label: "Adım 3",
            explanation:
              "S de eşzamanlı olan uzak olaylar S′ de eşzamanlı değildir; negatif zaman farkı seçilen olay sırasına aittir.",
          },
        ],
        answer: "Δct′=−9,Δx′=15 ışık-saniyesi.",
        check: "Δct²−Δx²=−144; sonda 81−225=−144.",
        pitfall:
          "Işık-saniyesini zaman birimi sanıp ct ye bir kez daha c ekleme.",
      },
      {
        title: "Toplamdan kinetiğe",
        prompt:
          "Bir parçacığın durgun enerjisi 4 MeV,β=0,6 için γ=1,25. Toplam enerji, kinetik enerji vepc yi bul.",
        strategy: "E₀ yi sabit tut, üç bağıntıyı ayrı uygula.",
        steps: [
          {
            label: "Adım 1",
            explanation: "E=γE₀=5 MeV dir.",
          },
          {
            label: "Adım 2",
            explanation: "K=E−E₀=1 MeV dir.",
          },
          {
            label: "Adım 3",
            explanation: "pc=γβE₀=1,25×0,6×4=3 MeV dir.",
          },
        ],
        answer: "E 5 MeV, K 1 MeV, pc 3 MeV.",
        check: "E²−(pc)²=25−9=16=E₀².",
        pitfall: "E₀ yi kinetik enerji gibi baştan çıkarmadan tekrar toplama.",
      },
      {
        title: "Gidiş-dönüş öz zamanı",
        prompt:
          "İdeal yolculukta laboratuvara göre gidiş 8 yıl, dönüş 8 yıl sürüyor. Her düzgün hız parçasında γ=2; dönüş süresi ihmal ediliyor. Yolcunun geçen süresini bul.",
        strategy:
          "Tek bir eylemsiz çerçeve varsaymak yerine iki parçanın öz zamanını topla.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Gidiş öz zamanı 8/2=4 yıl olur.",
          },
          {
            label: "Adım 2",
            explanation: "Dönüş öz zamanı da 8/2=4 yıldır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Toplam yolcu süresi 8, laboratuvar süresi 16 yıldır; aynı buluşma olayları arasındaki yollar karşılaştırılır.",
          },
        ],
        answer: "Yolcu 8 yıl, laboratuvar 16 yıl.",
        check: "İki yol parçasının her birini ayrı saydığını denetle.",
        pitfall:
          "Yön değiştiren yolcuyu tüm seyahat boyunca tek eylemsiz gözlemci sayma.",
      },
      {
        title: "Enerji kaybeden kapalı sistem",
        prompt:
          "Durgun bir sistem dışarı net 9×10¹³ J enerji veriyor. Son sistem yine durgun kabul ediliyor; c=3×10⁸ m/s. Durgun kütle azalması nedir?",
        strategy: "ΔE=Δmc² bütçesini başlangıç-son sistem için kur.",
        steps: [
          {
            label: "Adım 1",
            explanation: "c²=9×10¹⁶ m²/s² dir.",
          },
          {
            label: "Adım 2",
            explanation: "Δm=9×10¹³/(9×10¹⁶)=10⁻³ kg bulunur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Sistemden ayrılan enerji son sistemin durgun enerjisini azalttığı için işaret kütle kaybıdır.",
          },
        ],
        answer: "1 gram azalma.",
        check: "0,001 kg×9×10¹⁶=9×10¹³ J geri bulunmalı.",
        pitfall:
          "E=mc² nin uygulanması için sistemin c hızıyla gitmesi gerektiğini sanma.",
      },
    ],
    recall: [
      {
        prompt: "Öz zaman nasıl tanınır?",
        answer: "Aynı yerdeki tek saatin iki olay arasındaki okumasıdır.",
      },
      {
        prompt: "Öz uzunluk hangi çerçevede ölçülür?",
        answer:
          "Cismin durgun olduğu çerçevede; hareketli ölçümde uçlar o çerçevede eşzamanlı alınır.",
      },
      {
        prompt: "v=0 daγ kaçtır?",
        answer: "1; bu yüzden süre ve boy öz değerlerine döner, K 0 olur.",
      },
      {
        prompt: "Hareket doğrultusuna dik boy kısalır mı?",
        answer: "Bu standart Lorentz karşılaştırmasında hayır.",
      },
      {
        prompt: "Durgun enerji ile kinetik enerji aynı mı?",
        answer: "E₀=mc², K=(γ−1)mc²; toplam E=E₀+K.",
      },
      {
        prompt: "İkizler için tek eylemsiz simetri neden yetmez?",
        answer:
          "Gidip dönen yolcu çerçeve değiştirir; aynı iki buluşma olayı arasındaki öz zamanlar toplanır.",
      },
    ],
    items: [
      {
        prompt: "Özel göreliliğin iki postülasıyla uyumlu ifade hangisidir?",
        options: [
          "Yasalar yalnız aynı konumdaki gözlemcilerde aynıdır",
          "Dünya mutlak durgun çerçevedir",
          "Işık hızı kaynak ileri gidince c+v olur",
          "Fizik yasaları bütün eylemsiz çerçevelerde aynıdır; boşluktaki ışık hızı c dir",
          "Bütün cisim hızları her gözlemcide aynıdır",
        ],
        answer: 3,
        hint: "Yasa biçimini ölçülen hız değerlerinden ayır.",
        explanation:
          "Birinci postüla eylemsiz çerçevelere fizik yasaları bakımından eşitlik verir. İkinci postüla boşlukta ışık hızını c olarak sabitler. Bu iki cümle her maddesel cismin hızını bütün çerçevelerde eşitlemez.",
        guidance: {
          knowledge: [
            "Postülalar eylemsiz çerçeveler ve boşluktaki ışık için tanımlıdır.",
          ],
          strategy: "Yasa biçimini ölçülen hız değerlerinden ayır.",
          steps: [
            "Birinci postüla eylemsiz çerçevelere fizik yasaları bakımından eşitlik verir.",
            "İkinci postüla boşlukta ışık hızını c olarak sabitler.",
            "Bu iki cümle her maddesel cismin hızını bütün çerçevelerde eşitlemez.",
          ],
          optionReasons: [
            "Eylemsiz çerçevelerin kapsamını gereksiz sınırlar.",
            "Ayrıcalıklı eylemsiz çerçeve kurar.",
            "Klasik hız toplamını ışığa uygular.",
            "Doğru: Yasa biçimi ve boşluktaki c doğru ayrılmıştır.",
            "Yasa eşitliğini tüm ölçüm sayılarının eşitliği sanır.",
          ],
          commonError: "Aynı fizik yasasını aynı sayısal ölçüm sonucu sanma.",
          check:
            "Hareketli trene ait hızın yer çerçevesinden farklı olabileceğini denetle.",
        },
      },
      {
        prompt:
          "Bir vagon yere göre 0,7c ile gidiyor. Vagondan ileri yönde boşlukta ışık atması gönderiliyor. Yerdeki eylemsiz gözlemci ışığın hızını ne ölçer?",
        options: [
          "1,7c",
          "0,7c",
          "Işığın frekansı verilmeden bulunamaz",
          "0,3c",
          "c",
        ],
        answer: 4,
        hint: "Kaynağın hızını fotonun yerel boşluk hızına ekleme.",
        explanation:
          "Vagonun 0,7c si iki çerçevenin göreli hızıdır. Atma elektromanyetik ışık olduğundan boşlukta c ile ölçülür. Frekans kayabilse bile fλ=c ilişkisi korunur.",
        guidance: {
          knowledge: [
            "İkinci postüla boşluktaki ışığı bütün eylemsiz çerçevelerde c ile betimler.",
          ],
          strategy: "Kaynağın hızını fotonun yerel boşluk hızına ekleme.",
          steps: [
            "Vagonun 0,7c si iki çerçevenin göreli hızıdır.",
            "Atma elektromanyetik ışık olduğundan boşlukta c ile ölçülür.",
            "Frekans kayabilse bile fλ=c ilişkisi korunur.",
          ],
          optionReasons: [
            "Klasik hız toplamını kullanır.",
            "Kaynağın hızını ışığın hızı sayar.",
            "Frekans dalga boyuyla değişebilir; boşluk hızı yine c dir.",
            "Kaynak hızını c den çıkarır.",
            "Doğru: Boşluktaki c kaynak hareketinden bağımsızdır.",
          ],
          commonError:
            "Işık atmasına klasik mekanik mermi hız toplamını uygulama.",
          check: "Sonuç kütleli kaynak hızından bağımsız olmalı.",
        },
      },
      {
        prompt:
          "β=0,6 veγ=1,25 veriliyor. Hareketli saatin kendi konumunda iki tik arası 8 s ise aynı tikler arası laboratuvar süresi kaç s dir?",
        options: ["10", "8", "12,5", "6,4", "1,6"],
        answer: 0,
        hint: "8 saniyenin öz zaman olduğunu saptayıp laboratuvarı bul.",
        explanation:
          "Tikler saatin kendi konumunda gerçekleştiği için Δτ8 s dir. Laboratuvar süresi 1,25×8=10 s olur. γ>1 olduğundan laboratuvar süresinin daha büyük olması kontrolü geçer.",
        guidance: {
          knowledge: ["Aynı saat yerindeki iki olay için Δt=γΔτ."],
          strategy: "8 saniyenin öz zaman olduğunu saptayıp laboratuvarı bul.",
          steps: [
            "Tikler saatin kendi konumunda gerçekleştiği için Δτ8 s dir.",
            "Laboratuvar süresi 1,25×8=10 s olur.",
            "γ>1 olduğundan laboratuvar süresinin daha büyük olması kontrolü geçer.",
          ],
          optionReasons: [
            "Doğru: Öz zaman 8 ile γ çarpılır.",
            "Hareket etkisini yok sayar.",
            "γ yi iki kez uygular.",
            "Uzunluk büzülmesi yönünde böler.",
            "Yalnız farkı veya yanlış çarpanı kullanır.",
          ],
          commonError:
            "Öz zaman etiketini Dünya üzerinde ölçülen süre diye evrenselleştirme.",
          check: "10/8=1,25 oranı γ yı geri vermeli.",
        },
      },
      {
        prompt:
          "Bir parçacığın laboratuvardaki ortalama ömrü 15 μs,γ=1,5 tir. Kendi çerçevesindeki ortalama ömrü kaç μs dir?",
        options: ["7,5", "22,5", "10", "1,5", "15"],
        answer: 2,
        hint: "İstenen çerçeveye dönüş yönünü belirle.",
        explanation:
          "15 μs laboratuvarın verdiği genişlemiş süredir. Δτ=15/1,5=10 μs bulunur. Parçacığın öz ömrü daha küçük çıkar; deney istatistiksel ortalamayı ölçer.",
        guidance: {
          knowledge: ["Δt=γΔτ den Δτ=Δt/γ."],
          strategy: "İstenen çerçeveye dönüş yönünü belirle.",
          steps: [
            "15 μs laboratuvarın verdiği genişlemiş süredir.",
            "Δτ=15/1,5=10 μs bulunur.",
            "Parçacığın öz ömrü daha küçük çıkar; deney istatistiksel ortalamayı ölçer.",
          ],
          optionReasons: [
            "γ yerine 2 ye böler.",
            "Verilen zaten laboratuvar iken yeniden genişletir.",
            "Doğru: Öz zaman laboratuvar süresinin γ ya bölümüdür.",
            "Katsayıyı süre sanır.",
            "Çerçeve farkını siler.",
          ],
          commonError:
            "Ölüm zamanı tek tek kesin biliniyormuş gibi ortalama ömrü yorumlama.",
          check: "10×1,5=15 μs olmalı.",
        },
      },
      {
        prompt:
          "Durgun boyu 20 m olan çubuk uzun ekseni boyunca hareket ediyor.γ=1,25 için laboratuvarda eşzamanlı uç ölçümü kaç m verir?",
        options: ["15", "25", "20", "4", "16"],
        answer: 4,
        hint: "20 m nin öz uzunluk olduğunu kullan.",
        explanation:
          "Çubuk kendi çerçevesinde 20 m dir. Laboratuvar boyu 20/1,25=16 m bulunur. Bu bir eşzamanlı uç ölçümüdür; fotoğrafın görünüşü sorulmamıştır.",
        guidance: {
          knowledge: ["Paralel hareketli boy L=L₀/γ."],
          strategy: "20 m nin öz uzunluk olduğunu kullan.",
          steps: [
            "Çubuk kendi çerçevesinde 20 m dir.",
            "Laboratuvar boyu 20/1,25=16 m bulunur.",
            "Bu bir eşzamanlı uç ölçümüdür; fotoğrafın görünüşü sorulmamıştır.",
          ],
          optionReasons: [
            "γ yı yanlış yaklaşıklar.",
            "Zaman genişlemesi yönünde çarpar.",
            "Hareket yönündeki büzülmeyi yok sayar.",
            "Azalma miktarını boy diye verir.",
            "Doğru: Öz uzunluk γ ya bölünür.",
          ],
          commonError: "Görüntü ile tanımlanmış uzunluk ölçümünü karıştırma.",
          check: "16×1,25=20 m geri dönmeli.",
        },
      },
      {
        prompt:
          "Durgun çerçevede+x yönünde 10 m,+y yönünde 6 m kenarlı plaka+x boyunca gidiyor;γ=2. Laboratuvardaki x ve y boyları hangisidir?",
        options: [
          "20 m ve 12 m",
          "20 m ve 6 m",
          "5 m ve 3 m",
          "5 m ve 6 m",
          "10 m ve 3 m",
        ],
        answer: 3,
        hint: "Hareket oku ile kenarları karşılaştır.",
        explanation:
          "x kenarı hareket yönüne paraleldir, Lx 10/2=5 m olur. y kenarı diktir, Ly 6 m kalır. Sonuç iki boyun aynı çarpanla değişmesini gerektirmez.",
        guidance: {
          knowledge: [
            "Lorentz uzunluk büzülmesi hareket doğrultusunda uygulanır.",
          ],
          strategy: "Hareket oku ile kenarları karşılaştır.",
          steps: [
            "x kenarı hareket yönüne paraleldir, Lx 10/2=5 m olur.",
            "y kenarı diktir, Ly 6 m kalır.",
            "Sonuç iki boyun aynı çarpanla değişmesini gerektirmez.",
          ],
          optionReasons: [
            "İki boyu zaman gibi genişletir.",
            "Paralel boyu genişletir.",
            "Dik boyu da büzüştürür.",
            "Doğru: Yalnız paralel x boyu büzülür.",
            "Yanlış kenara büzülme uygular.",
          ],
          commonError: "Alanı veya iki kenarı tek skaler boy gibi γ ya bölme.",
          check: "Hareket yönü y olsaydı hangi kenarın değişeceğini düşün.",
        },
      },
      {
        prompt:
          "S de iki uzak olay eşzamanlı:Δct=0,Δx=10 birim. S′ +0,6c ile hareket ediyor,γ=1,25. Δct′=γ(Δct−βΔx) kaç birimdir?",
        options: ["−6", "−7,5", "0", "+7,5", "12,5"],
        answer: 1,
        hint: "ct ve x farklarını aynı birimde formüle yerleştir.",
        explanation:
          "Δct 0 olduğundan parantez−0,6×10=−6 olur. γ1,25 ile çarpılınca−7,5 çıkar. S′ de zaman farkı 0 değildir; negatif işaret verilen olay sırasını bildirir.",
        guidance: {
          knowledge: [
            "Eşzamanlı uzak olaylar başka çerçevede farklı zaman koordinatlarına sahip olabilir.",
          ],
          strategy: "ct ve x farklarını aynı birimde formüle yerleştir.",
          steps: [
            "Δct 0 olduğundan parantez−0,6×10=−6 olur.",
            "γ1,25 ile çarpılınca−7,5 çıkar.",
            "S′ de zaman farkı 0 değildir; negatif işaret verilen olay sırasını bildirir.",
          ],
          optionReasons: [
            "γ çarpanını atlar.",
            "Doğru: 1,25×(−0,6×10)=−7,5 tir.",
            "Uzak eşzamanlılığın her çerçevede korunacağını sanır.",
            "İşaretli olay sırasını ters çevirir.",
            "Konum dönüşümünü zaman yerine verir.",
          ],
          commonError:
            "ct koordinatını saniye sanıp bir kez daha c ye bölmeden birim değiştiriyormuş gibi davranma.",
          check: "β0 olsaydı zaman farkı 0 kalmalıydı.",
        },
      },
      {
        prompt:
          "Lorentz katsayısı γ=1/√(1−β²) için hangi sınır davranışı doğrudur?",
        options: [
          "β=1 deγ=1",
          "β>1 değerleri aynı kütleli cisim modelinde gerçel γ verir",
          "β=0 daγ=0",
          "γ her hızda 1 den küçüktür",
          "β=0 daγ=1;|β|1 e alttan yaklaşınca γ sınırsız büyür",
        ],
        answer: 4,
        hint: "Paydanın 0 ve 1 sınırlarını incele.",
        explanation:
          "β0 iken payda√1=1 dir. |β| büyüyüp 1 e yaklaşınca 1−β² pozitif fakat çok küçük olur. Çok küçük pozitif sayıya bölme γ yı büyütür;β1 sonlu değer değildir.",
        guidance: {
          knowledge: ["Kütleli cisim için|β|<1 veγ≥1."],
          strategy: "Paydanın 0 ve 1 sınırlarını incele.",
          steps: [
            "β0 iken payda√1=1 dir.",
            "|β| büyüyüp 1 e yaklaşınca 1−β² pozitif fakat çok küçük olur.",
            "Çok küçük pozitif sayıya bölme γ yı büyütür;β1 sonlu değer değildir.",
          ],
          optionReasons: [
            "Sıfır paydayı göz ardı eder.",
            "1−β² negatif olur; model dışıdır.",
            "Durgun süre ve enerjiyi 0 yapardı.",
            "Karekök paydasının en çok 1 olduğunu kaçırır.",
            "Doğru: İki fiziksel sınır doğru uygulanır.",
          ],
          commonError: "Işık hızında kütleli cisim için sonlu γ yazma.",
          check: "Sıfır hızda bütün göreli sonuçlar öz değerlere dönmeli.",
        },
      },
      {
        prompt:
          "Durgun enerjisi 6 MeV olan parçacık γ=1,5 ile hareket ediyor. Toplam ve kinetik enerjisi hangisidir?",
        options: [
          "9 MeV ve 3 MeV",
          "15 MeV ve 9 MeV",
          "3 MeV ve 9 MeV",
          "6 MeV ve 9 MeV",
          "9 MeV ve 6 MeV",
        ],
        answer: 0,
        hint: "Önce toplamı bul, sonra durgun enerjiyi çıkar.",
        explanation:
          "E 1,5×6=9 MeV dir. K 9−6=3 MeV dir. Toplam 9=durgun 6+kinetik 3 eşitliği sağlanır.",
        guidance: {
          knowledge: ["E=γE₀, K=(γ−1)E₀."],
          strategy: "Önce toplamı bul, sonra durgun enerjiyi çıkar.",
          steps: [
            "E 1,5×6=9 MeV dir.",
            "K 9−6=3 MeV dir.",
            "Toplam 9=durgun 6+kinetik 3 eşitliği sağlanır.",
          ],
          optionReasons: [
            "Doğru: E=γE₀9, K=E−E₀3 tür.",
            "Durgun enerjiyi iki kez toplar.",
            "Kinetik enerjiyi toplamdan büyük yapar.",
            "Durgun enerjiyle toplamı yer değiştirir.",
            "Durgun enerjiyi kinetik sanır.",
          ],
          commonError: "E₀ ile K yi aynı terim sayma.",
          check: "K toplam enerjiden küçük ve pozitif olmalı.",
        },
      },
      {
        prompt:
          "Bir parçacığın durgun enerjisi 3 MeV,γ=5/3,β=0,8. pc=γβE₀ için pc kaç MeV dir?",
        options: ["4", "3", "6,4", "2,4", "5"],
        answer: 0,
        hint: "E₀ nin 3 MeV olduğunu doğrudan kullan.",
        explanation:
          "γE₀=(5/3)×3=5 MeV toplam enerjidir. pc=βE=0,8×5=4 MeV dir. E²−(pc)²=25−16=9=E₀² denetimi yapılır.",
        guidance: {
          knowledge: ["Göreli momentum için pc=γβmc²."],
          strategy: "E₀ nin 3 MeV olduğunu doğrudan kullan.",
          steps: [
            "γE₀=(5/3)×3=5 MeV toplam enerjidir.",
            "pc=βE=0,8×5=4 MeV dir.",
            "E²−(pc)²=25−16=9=E₀² denetimi yapılır.",
          ],
          optionReasons: [
            "Doğru: (5/3)×0,8×3=4 tür.",
            "Durgun enerjiyi momentum enerji karşılığı sanır.",
            "β veya γ yı iki kez sayar.",
            "γ çarpanını atlar.",
            "Toplam enerjiyi pc yerine verir.",
          ],
          commonError: "Klasik p=mv yi yüksek hıza γ olmadan uygulama.",
          check: "E²−(pc)² bağıntısı 3² vermeli.",
        },
      },
      {
        prompt:
          "Kütleli bir parçacığın hızı artarken durgun kütle m tanımıyla hangi ifade uygundur?",
        options: [
          "Durgun kütle her çerçevede γm olur",
          "m>0 olsa daγ tüm hızlarda sonlu kalır",
          "E₀ yalnız c hızında ortaya çıkar",
          "m sabitken E ve p artar; c ye ulaşmak sonlu enerjiyle mümkün değildir",
          "c ye ulaşınca tüm enerji sıfırlanır",
        ],
        answer: 3,
        hint: "β1 e yaklaşırken γ nın ne yaptığını izle.",
        explanation:
          "Hız büyüdükçe γ büyür. m sabit tutulduğunda E ile p bu çarpanla artar. c sınırında sonsuz γ gerektiği için sonlu enerjiyle kütleli cisim oraya ulaşamaz.",
        guidance: {
          knowledge: [
            "E=γmc² ve p=γmv; bu anlatımda m değişmez durgun kütledir.",
          ],
          strategy: "β1 e yaklaşırken γ nın ne yaptığını izle.",
          steps: [
            "Hız büyüdükçe γ büyür.",
            "m sabit tutulduğunda E ile p bu çarpanla artar.",
            "c sınırında sonsuz γ gerektiği için sonlu enerjiyle kütleli cisim oraya ulaşamaz.",
          ],
          optionReasons: [
            "Durgun kütleyi çerçeveye bağlı yeniden tanımlar.",
            "β1 sınırını ihlal eder.",
            "Durgun enerjiyi ışık hızına koşullar.",
            "Doğru: Durgun kütleyle göreli enerji tanımı tutarlıdır.",
            "Enerji artışını tersine çevirir.",
          ],
          commonError:
            "Eski göreli kütle dilini durgun kütleyle aynı denklemde karıştırma.",
          check: "v 0 da E=mc², p 0 çıkmalı.",
        },
      },
      {
        prompt:
          "Bir fotonun durgun kütlesi 0 dır. E²−p²c²=m²c⁴ bağıntısına göre hangisi uygundur?",
        options: [
          "Foton parçacık sayılırsa küçük m eklemek gerekir",
          "E=pc olabilir; enerjisi ve momentumu sıfır olmak zorunda değildir",
          "Foton boşlukta kaynağın hızını alır",
          "E ve p mutlaka sıfırdır",
          "Fotonun durgun çerçevesi vardır",
        ],
        answer: 1,
        hint: "Sağ taraf 0 olunca sol taraftaki iki terimi eşitle.",
        explanation:
          "m 0 için E²=p²c² olur. Pozitif foton enerjisi için E=pc çıkar. Bu eşitlik E ve p nin birlikte sıfır olmayan değerlerini dışlamaz.",
        guidance: {
          knowledge: ["Durgun kütle 0 olması momentum 0 demek değildir."],
          strategy: "Sağ taraf 0 olunca sol taraftaki iki terimi eşitle.",
          steps: [
            "m 0 için E²=p²c² olur.",
            "Pozitif foton enerjisi için E=pc çıkar.",
            "Bu eşitlik E ve p nin birlikte sıfır olmayan değerlerini dışlamaz.",
          ],
          optionReasons: [
            "Foton modeli için gereksiz yanlış durgun kütle ekler.",
            "Doğru: m 0 bağıntısı sıfır olmayan E, p için E=pc verir.",
            "Kaynak hareketini boşluk hızına taşır.",
            "Durgun kütleyle enerji-momentumu özdeş sayar.",
            "Boşlukta c ile giden fotonun durgun çerçevesi yoktur.",
          ],
          commonError:
            "E=mc² yi fotonun toplam enerjisi için tek bağıntı sayma.",
          check: "hf>0 bir foton için p=hf/c>0 yaz.",
        },
      },
      {
        prompt:
          "Bir yolcunun gidiş ve dönüşünün her biri laboratuvara göre 6 yıl; her parçada γ=1,5. Dönüşte yön değiştirme süresi ihmal ediliyor. Yolcunun geçen öz zamanı kaç yıldır?",
        options: ["18", "8", "12", "9", "4"],
        answer: 1,
        hint: "Gidiş ve dönüşü ayrı hesaplayıp topla.",
        explanation:
          "Gidiş öz zamanı 6/1,5=4 yıldır. Dönüş öz zamanı aynı koşullarda 4 yıldır. Toplam 8 yıl olur; iki buluşma arasındaki laboratuvar 12 yılıyla karşılaştırılır.",
        guidance: {
          knowledge: [
            "Parçalı yolun öz zamanı her eylemsiz parçanın Δt/γ toplamıdır.",
          ],
          strategy: "Gidiş ve dönüşü ayrı hesaplayıp topla.",
          steps: [
            "Gidiş öz zamanı 6/1,5=4 yıldır.",
            "Dönüş öz zamanı aynı koşullarda 4 yıldır.",
            "Toplam 8 yıl olur; iki buluşma arasındaki laboratuvar 12 yılıyla karşılaştırılır.",
          ],
          optionReasons: [
            "Öz zamanı yeniden genişletir.",
            "Doğru: Her parçanın 6/1,5=4 yılı toplanır.",
            "Laboratuvar süresini öz zaman sayar.",
            "Toplamı yanlış çarpanla böler.",
            "Yalnız gidişi sayar.",
          ],
          commonError:
            "Yön değiştiren yolcuyu tüm yol boyunca tek eylemsiz çerçeve sayma.",
          check: "İki yol parçasının da hesaba girdiğini kontrol et.",
        },
      },
      {
        prompt: "Özel göreliliğin sınanmasıyla ilgili uygun ifade hangisidir?",
        options: [
          "Her yüksekteki saat her durumda aynı ölçüde yavaşlar",
          "Kuramın hiçbir fiziksel deneyi yapılmamıştır",
          "Hareketli parçacık ömürleri ve saat deneyleri sonuçları sınar; yerçekimi etkileri gerekiyorsa ayrıca hesaba katılır",
          "Uçak saatindeki bütün farklar yalnız hızdan gelir",
          "Bir düşünce deneyi bütün deneysel sonuçların yerine geçer",
        ],
        answer: 2,
        hint: "İdeal özel görelilikle gerçek deneyin ek koşullarını ayır.",
        explanation:
          "Hareketli saat ve parçacık ömrü ölçümleri zaman genişlemesini sınar. Yükseklik farkında kütleçekim kaynaklı saat etkileri de bulunabilir. Deney açıklaması gerekli bütün etkileri içerdiğinde uygun karşılaştırma yapılır.",
        guidance: {
          knowledge: [
            "Kuramsal öngörüler deneylerle sınanır; gerçek saatlerde birden çok etki bulunabilir.",
          ],
          strategy:
            "İdeal özel görelilikle gerçek deneyin ek koşullarını ayır.",
          steps: [
            "Hareketli saat ve parçacık ömrü ölçümleri zaman genişlemesini sınar.",
            "Yükseklik farkında kütleçekim kaynaklı saat etkileri de bulunabilir.",
            "Deney açıklaması gerekli bütün etkileri içerdiğinde uygun karşılaştırma yapılır.",
          ],
          optionReasons: [
            "Farklı nedenleri koşulsuz tek sonuç yapar.",
            "Gerçek sınamaları inkâr eder.",
            "Doğru: Deney ve model kapsamını birlikte korur.",
            "Yerçekimi ve dönüş etkilerini dışlar.",
            "Düşünceyle ölçümü özdeşleştirir.",
          ],
          commonError:
            "İdeal modelin ihmal ettiği etkiyi gerçek deneyde yok sanma.",
          check:
            "Hangi çerçeve ve hangi potansiyel farkının varsayıldığını belirt.",
        },
      },
      {
        prompt:
          "β çok küçükken γ≈1+β²/2 veriliyor. K=(γ−1)mc² hangi klasik sınıra yaklaşır?",
        options: ["0; her küçük hızda tam sıfır", "mc²", "mv²/2", "mvc", "mv²"],
        answer: 2,
        hint: "γ−1 yerine β²/2 koy ve c yi sadeleştir.",
        explanation:
          "K≈(β²/2)mc² yazılır. β²=v²/c² olduğundan c² çarpanları sadeleşir. K≈mv²/2 bulunur; hız çok küçük de olsa v sıfır değilse K pozitiftir.",
        guidance: {
          knowledge: [
            "β=v/c; düşük hızda göreli enerji klasik kinetik enerjiyi içerir.",
          ],
          strategy: "γ−1 yerine β²/2 koy ve c yi sadeleştir.",
          steps: [
            "K≈(β²/2)mc² yazılır.",
            "β²=v²/c² olduğundan c² çarpanları sadeleşir.",
            "K≈mv²/2 bulunur; hız çok küçük de olsa v sıfır değilse K pozitiftir.",
          ],
          optionReasons: [
            "Küçük değeri tam sıfır ilan eder.",
            "Durgun enerjiyi kinetik sınır sanır.",
            "Doğru: β²c²=v² ile klasik kinetik enerji çıkar.",
            "Momentumla enerjiyi boyutsal karıştırır.",
            "1/2 çarpanını atlar.",
          ],
          commonError:
            "Yaklaşık küçük değeri hesapta iptal edip fiziksel sıfır sayma.",
          check: "Enerji biriminin kg·m²/s² kaldığını denetle.",
        },
      },
      {
        prompt:
          "Durgun bir sistem dışarı 4,5×10¹³ J enerji veriyor; başlangıç ve son sistem durgun, c=3×10⁸ m/s. Durgun kütle azalması kaç kg dır?",
        options: ["5×10⁻³", "5×10⁻⁴", "1,5×10⁵", "4,5×10¹³", "0"],
        answer: 1,
        hint: "Önce c² yi hesapla, birimleri de böl.",
        explanation:
          "c²=9×10¹⁶ m²/s² dir. 4,5/9=0,5 ve 10¹³/10¹⁶=10⁻³ olur. Δm 0,5×10⁻³=5×10⁻⁴ kg dır; azalma pozitiftir.",
        guidance: {
          knowledge: [
            "Sistemden çıkan enerji için durgun kütle farkı Δm=ΔE/c².",
          ],
          strategy: "Önce c² yi hesapla, birimleri de böl.",
          steps: [
            "c²=9×10¹⁶ m²/s² dir.",
            "4,5/9=0,5 ve 10¹³/10¹⁶=10⁻³ olur.",
            "Δm 0,5×10⁻³=5×10⁻⁴ kg dır; azalma pozitiftir.",
          ],
          optionReasons: [
            "Üs hesabını bir basamak kaydırır.",
            "Doğru: ΔE/c²=4,5×10¹³/(9×10¹⁶) dir.",
            "Enerjiyi c ye bölüp c² yi kullanmaz.",
            "Enerji sayısını kütle sayar.",
            "Enerji çıkışının sistem durgun kütlesini etkileyebileceğini reddeder.",
          ],
          commonError:
            "Kütle-enerji eşdeğerliğini yalnız hızlanma olaylarına sınırlandırma.",
          check: "Sonucu c² ile çarpınca verilen enerji geri çıkmalı.",
        },
      },
    ],
    source:
      "MEB ve OGM kapsamı esas alınarak özgün hazırlanmış konu anlatımı, modeller ve öğretim soruları. Resmî sınav sorusu değildir.",
  },
  {
    id: "siyah-cisim-foton",
    topic: "detail-400",
    title: "Siyah cisim ışıması ve foton",
    minutes: 95,
    objectives: [
      "Termal tayfı sıcaklık, alan ve dalga boyu eksenleriyle oku.",
      "Wien ve Stefan-Boltzmann ilişkilerini koşullarıyla kullan.",
      "Planck enerji paketleriyle tek foton enerjisi, momentum ve demet gücünü ayır.",
    ],
    sections: [
      {
        title: "Önkoşullar ve birimler",
        paragraphs: [
          "Işık elektromanyetik dalgadır; boşlukta c=λf bağıntısı geçerlidir. Dalga boyu metre, frekans hertz, sıcaklık kelvin ile yazılır. Nanometre 10⁻⁹ m, angstrom 10⁻¹⁰ m dir; birim dönüşümü enerji hesabından önce yapılır.",
          "Kelvin sıcaklığı Celsius sayısına yaklaşık 273,15 eklenerek bulunur. Sıcaklığın iki katı gibi oranlar mutlak sıcaklık üzerinden kurulur.20°C den 40°C ye çıkış T nin iki katı değildir; Wien ve T⁴ bağıntılarına doğrudan Celsius koyulmaz.",
        ],
      },
      {
        title: "Termal ışınım bir tayftır",
        paragraphs: [
          "Sıcaklığı 0 K den büyük cisimler elektromanyetik enerji yayar. İnsan vücudu çevre sıcaklıklarında ağırlıklı kızılötesi yayarken daha sıcak cisimlerin tayf tepe dalga boyu kısalır; gözün görmemesi ışıma olmaması değildir.",
          "Bir cisim yalnız tek dalga boyunda termal ışınım yapmaz; geniş bir tayf vardır. Tepe dalga boyu en büyük dağılım değerinin yeridir; bu dalga boyu dışındaki yayımı sıfır saymak termal tayfı tek renkli lazerle karıştırır.",
        ],
      },
      {
        title: "Siyah cisim ideal soğurucudur",
        paragraphs: [
          "Üzerine gelen ışınımın tamamını ideal olarak soğuran modele siyah cisim denir. Isıl dengede bu model sıcaklıkla belirlenen en yüksek termal yayımı da verir. Gerçek yüzeyler bu ideale belirli dalga boylarında yaklaşabilir.",
          "Siyah sözcüğü görünür renge ilişkin değişmez bir hüküm değildir. Çok sıcak bir ideal siyah cisim görünür ışık yayarak parlak görünebilir. Modelin soğurma özelliği ile o anda dışarı yayılan tayfı ayrı düşün.",
        ],
      },
      {
        title: "Oyuk ve küçük delik modeli",
        paragraphs: [
          "İçinde dengede ışınım bulunan oyuğun küçük deliğine giren ışık birçok yansımada soğurulabilir. Delikten çıkan ışınım oyuk sıcaklığını örnekler ve ideal siyah cisim davranışına iyi yaklaşır.",
          "Modelin başarısı deliğin görünür siyah boyayla kaplanması değil çoklu etkileşimle geri kaçışın azalmasıdır. Delikten çıkan güç açıklığın alanına bağlıdır; birim alan başına tayf ile toplam güç aynı nicelik değildir.",
        ],
      },
      {
        title: "Tayf grafiğinin eksenlerini oku",
        paragraphs: [
          "Bλ grafiği birim dalga boyu aralığı başına spektral dağılımı gösterir. Eğri altındaki tüm dalga boyu katkıları toplam yayımı verir; yalnız tepe yüksekliği toplam enerji değildir.",
          "Modelde Planck spektral radyansı Bλ W·sr⁻¹·m⁻³ birimiyle hesaplanır. HTML sonuçta toplam yüzey çıkışı σT⁴ W/m² ayrıca verilir. Radyans ile bütün yönlere ve dalga boylarına integre edilmiş yüzey çıkışı farklı niceliklerdir.",
        ],
      },
      {
        title: "Wien kayma yasası",
        paragraphs: [
          "Dalga boyuna göre tayfın tepe noktası için λtepe T=b, b≈2,898×10⁻³ m·K dir. Sıcaklık iki katına çıkarsa bu tepe dalga boyu yarıya iner. Ters ilişki λ eksenine göre çizilmiş tayf içindir.",
          "Bf yani frekans başına dağılımın tepe frekansını c ye bölüp Bλ nın tepe dalga boyunu aynı nokta sanma. Değişken dönüşümünde aralıkların ağırlığı değişir; bu derste Wien bağıntısı açıkça Bλ tepesine aittir.",
        ],
      },
      {
        title: "Sıcaklık artınca tayf değişimi",
        paragraphs: [
          "İdeal siyah cisimde sıcaklık arttıkça Bλ eğrisi her sabit dalga boyunda yükselir, tepe daha kısa dalga boyuna kayar. Grafiklerin yatay ekseni veya her eğrinin ayrı normalizasyonu değiştirilirse bu karşılaştırma gizlenebilir.",
          "Keşifte iki sıcaklığın eğrisi aynı yatay ve ortak düşey ölçekle çizilir. Eğri renkleri serileri ayıran işaretlerdir; cismin insan gözüne görünür renk simülasyonu değildir. Gözle algı için bütün görünür tayf ve gözün duyarlılığı gerekir.",
        ],
      },
      {
        title: "Stefan-Boltzmann toplamı",
        paragraphs: [
          "İdeal yüzeyin birim alanından tüm dalga boylarına toplam yayılan güç M=σT⁴ tür. Alan A ise P=AσT⁴ olur. Aynı sıcaklıkta iki kat alan iki kat toplam güç verir; tayfın tepe yeri değişmez.",
          "Gerçek yüzeyde basit gri cisim yaklaşımıyla ε katsayısı eklenebilir. Çevreye net enerji aktarımı için çevreden soğurma da hesaba katılır; εσA(T⁴−Tçevre⁴) ifadesi verilen koşullarda net kaybı anlatır. Yalnız yayılan güçle net soğumayı karıştırma.",
        ],
      },
      {
        title: "Klasik yaklaşımın sorunu",
        paragraphs: [
          "Klasik eş bölüşüm yaklaşımı yüksek frekanslı modlara da enerji atfedince kısa dalga boyunda fiziksel olmayan sınırsız toplam ışınım öngörür. Bu başarısızlık morötesi felaket adıyla anılır; deneysel tayf sonludur.",
          "Sorun sıcak cismin gerçekten sonsuz enerji vermesi değildir; uygunsuz modelin öngörüsüdür. Düşük frekanstaki uyum bütün frekanslara otomatik yayılmaz. Modern betim, klasik yaklaşımın işe yaradığı sınırı da açıklar.",
        ],
      },
      {
        title: "Planckın kesikli aktarımı",
        paragraphs: [
          "Planckın tarihsel osilatör modelinde enerji değişimleri hf nin tam sayı katlarıyla kurulur. h Planck sabiti, f frekanstır; bir aktarım paketi hf kadardır. Bu kuantumlama yüksek frekanstaki modların termal katkısını bastırır.",
          "Yüksek frekanslı ışınım mutlak yasak değildir; verilen sıcaklıkta büyük enerji paketlerinin oluşma olasılığı azalır. E=nhf ifadesindeki n foton sayısı veya belirtilmiş modelin basamak sayısı olarak açıkça tanımlanmalıdır.",
        ],
      },
      {
        title: "Foton enerjisi ve dalga boyu",
        paragraphs: [
          "Tek foton için E=hf=hc/λ dır. Frekansı büyük foton daha enerjilidir; dalga boyu büyük foton daha az enerjilidir. Enerji joule veya elektronvolt ile yazılabilir;1 eV≈1,602×10⁻¹⁹ J dir.",
          "hc≈1240 eV·nm yaklaşımıyla E(eV)=1240/λ(nm) hesaplanır. Aynı yaklaşım Å kullanınca 12400 eV·Å olur. Sayıyı alıp dalga boyu birimini değiştirmeden kullanmak on katlık hata üretir.",
        ],
      },
      {
        title: "Fotonun momentumu",
        paragraphs: [
          "Fotonun durgun kütlesi sıfır olmasına rağmen p=E/c=h/λ momentumu vardır. Soğurma ve yansıma sırasında enerjiyle birlikte momentum aktarılabildiği için ışık basıncı oluşabilir.",
          "Durgun foton çerçevesi yoktur; foton için p=mv formülüne m 0 koyup p 0 sonucu çıkarılmaz. E=pc kütlesiz parçacık bağıntısıyla düşünmek enerji ve momentumu doğru birleştirir.",
        ],
      },
      {
        title: "Tek foton ile demetin toplamı",
        paragraphs: [
          "Tek renkli demette saniyede Φ foton varsa güç P=Φhf dir. Frekans sabitken foton sayısını artırmak gücü artırır ama tek foton enerjisini değiştirmez. Toplam N foton enerjisi Nhf dir.",
          "Güç sabit tutulup frekans artırılırsa foton/s sayısı azalır. Aynı ışık gücüyle farklı foton enerjileri mümkündür. Işık şiddeti sözcüğünü burada enerji akı yoğunluğu olarak kullanırken foton akısından ayrı birimle belirt.",
        ],
      },
      {
        title: "Işınımın maddede soğurulması",
        paragraphs: [
          "Foton soğurulunca enerji maddeye aktarılır; bu enerji iç enerji, uyarılma, iyonlaşma veya başka süreçlere gidebilir. Soğurucunun sıcaklığı ve yapısı hangi süreçlerin mümkün olduğunu etkiler.",
          "Bir fotonun tüm enerjisinin her durumda tek bir elektronun serbest hareket enerjisi olduğu söylenemez. Fotoelektrikte iş fonksiyonu, Compton olayında saçılan foton ve geri tepen elektron ayrıca bütçeye girer.",
        ],
      },
      {
        title: "Termal kamera ve görünür renk",
        paragraphs: [
          "Termal kamera belirli kızılötesi banttaki ışınımı algılayıp renkli gösterime dönüştürür. Ekrandaki mavi-sarı tonlar yazılım ölçeğidir; cismin gerçekten görünür mavi veya sarı ışık yaydığını kanıtlamaz.",
          "Yüzey yayma katsayısı, yansıyan çevre ışınımı ve ölçüm bandı sıcaklık çıkarımını etkiler. Cisim 0 K üstünde diye bütün yayımın kızılötesi olduğu genellenmez; çok sıcak cisimler görünür ve daha kısa dalga boylarında da güçlü yayabilir.",
        ],
      },
      {
        title: "Modeli iki bağımsız değişimle dene",
        paragraphs: [
          "Sıcaklığı değiştirirken alanı sabit tutarsan tepe yerini ve birim alan toplamını kıyaslayabilirsin. Alanı değiştirirken sıcaklığı sabit tutarsan tepe aynı kalırken toplam gücün alanla değiştiğini görürsün.",
          "Sorularda hangi büyüklüğün sabit tutulduğu açıkça verilir. Bir eğrinin daha yüksek görünmesini yalnız daha sıcaklığa bağlamadan önce düşey eksenin toplam güç mü birim alan dağılımı mı olduğuna bak; ölçüm tanımı çözümün parçasıdır.",
        ],
      },
    ],
    examples: [
      {
        title: "Kelvinle tepe oranı",
        prompt:
          "Bir ideal yüzey 300 K den 900 K e ısınıyor. Dalga boyuna göre tepe ve birim alan yayılan güç kaç kat olur?",
        strategy: "Sıcaklık oranını Wien ve T⁴ e ayrı uygula.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Sıcaklık oranı 900/300=3 tür.",
          },
          {
            label: "Adım 2",
            explanation: "Tepe dalga boyu ters orantıyla 1/3 olur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Birim alan toplam güç 3⁴=81 kat olur; tepe yüksekliği yerine eğrinin tüm toplamı sorulmaktadır.",
          },
        ],
        answer: "Tepe 1/3, güç 81 kat.",
        check: "300 K için tepe yaklaşık 9660 nm,900 K için 3220 nm olmalı.",
        pitfall:
          "Celsius oranını veya yalnız tepe yüksekliğini toplam güç sayma.",
      },
      {
        title: "Alan etkisini ayır",
        prompt:
          "İdeal K ve L yüzeyleri aynı sıcaklıkta, alanları sırasıyla 0,6 ve 1,8 m². Tepe dalga boyu ve toplam güç oranlarını bul.",
        strategy: "Aynı T nin spektrum etkisini alanın toplam etkisinden ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Aynı T için birim alan tayfları veλtepe aynıdır.",
          },
          {
            label: "Adım 2",
            explanation: "P=AσT⁴ olduğundan PL/PK=1,8/0,6=3 tür.",
          },
          {
            label: "Adım 3",
            explanation:
              "L daha çok toplam enerji yayar, ancak bu tek başına daha kısa tepe anlamına gelmez.",
          },
        ],
        answer: "Tepe oranı 1, güç oranı 3.",
        check: "İki yüzeyin birer metrekaresini kıyaslarsan eşit güç çıkmalı.",
        pitfall: "Alanı büyütmenin sıcaklığı zorunlu değiştirdiğini varsayma.",
      },
      {
        title: "Foton enerjisini iki birimde bul",
        prompt: "λ=310 nm foton için hc=1240 eV·nm ve 1 eV=1,6×10⁻¹⁹ J kullan.",
        strategy: "Önce pratik nm bağıntısı, sonra eV-J dönüşümü.",
        steps: [
          {
            label: "Adım 1",
            explanation: "E=1240/310=4 eV dir.",
          },
          {
            label: "Adım 2",
            explanation: "Joule karşılığı 4×1,6×10⁻¹⁹=6,4×10⁻¹⁹ J olur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Aynı fotonun iki birim karşılığıdır; enerjiler toplanmaz.",
          },
        ],
        answer: "4 eV=6,4×10⁻¹⁹ J.",
        check: "310 nm ile 4 eV çarpımı 1240 eV·nm olmalı.",
        pitfall: "nm girdisineÅ için olan 12400 sayısını uygulama.",
      },
      {
        title: "Foton sayısı ve güç",
        prompt:
          "Tek renkli bir demette foton enerjisi 3,2×10⁻¹⁹ J, güç 0,064 W. Saniyedeki foton sayısını bul.",
        strategy: "W birimini J/s olarak aç.",
        steps: [
          {
            label: "Adım 1",
            explanation: "P=ΦE eşitliğinde Φ=P/E dir.",
          },
          {
            label: "Adım 2",
            explanation: "0,064/(3,2×10⁻¹⁹)=2×10¹⁷ s⁻¹ bulunur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Frekans sabitken güç iki katına çıkarsa bu sayı iki katına çıkar; tek foton enerjisi aynı kalır.",
          },
        ],
        answer: "2×10¹⁷ foton/s.",
        check: "E×Φ=0,064 J/s yi geri vermeli.",
        pitfall: "Gücü foton başına enerjiyle aynı birimde sanma.",
      },
      {
        title: "Sabit güçte renk değişimi",
        prompt:
          "İki tek renkli kaynak eşit güçte. K fotonları 2 eV, L fotonları 5 eV. Foton/s oranı ΦK/ΦL nedir?",
        strategy: "Aynı P için Φ=P/E kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation: "ΦK=P/2,ΦL=P/5 biçiminde ortak eV dönüşümü sadeleşir.",
          },
          {
            label: "Adım 2",
            explanation: "Oran(P/2)/(P/5)=5/2=2,5 tir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Daha düşük enerjili K fotonlarından aynı gücü taşımak için daha çok gerekir.",
          },
        ],
        answer: "2,5.",
        check: "Her demette ΦE eşit olmalı.",
        pitfall: "Güç eşitliğini foton sayısı eşitliği sanma.",
      },
      {
        title: "Işık basıncının momentum defteri",
        prompt:
          "Bir foton dik bir yüzeye E enerjisiyle geliyor. İdeal soğurma ile ideal ters yansımada yüzeye aktarılan momentumu kıyasla.",
        strategy: "Fotonun başlangıç ve son yönünü işaretli say.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Başlangıç foton momentumu+E/c dir.",
          },
          {
            label: "Adım 2",
            explanation: "Soğurmada son foton yoktur; yüzeye+E/c aktarılır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Enerji değişiminin ihmal edildiği ideal ters yansımada foton−E/c olur; yüzeye aktarılan+2E/c dir.",
          },
        ],
        answer: "Yansımada soğurmanın iki katı.",
        check: "Toplam sistem momentumu her iki durumda korunmalı.",
        pitfall: "Fotonun durgun kütlesi 0 diye momentum aktarımını 0 sayma.",
      },
    ],
    recall: [
      {
        prompt: "Wien yasasında hangi sıcaklık kullanılır?",
        answer: "Kelvin;λtepe T=b dalga boyuna göre tayf tepesine aittir.",
      },
      {
        prompt: "Sıcaklık iki katında toplam birim alan yayımı?",
        answer: "İdeal siyah cisim için 2⁴=16 kat.",
      },
      {
        prompt: "Alan iki katında tepe dalga boyu?",
        answer: "Aynı sıcaklıkta değişmez; toplam güç iki kat olur.",
      },
      {
        prompt: "Fotonun enerjisi ve momentumu?",
        answer: "E=hf=hc/λ, p=E/c=h/λ.",
      },
      {
        prompt: "Eşit güç farklı frekanslarda eşit foton/s midir?",
        answer: "Hayır;Φ=P/hf, f arttıkça Φ azalır.",
      },
      {
        prompt: "Siyah cisim her sıcaklıkta görünür siyah mıdır?",
        answer:
          "Hayır; ideal soğurma özelliği sıcak cismin görünür yayımını yasaklamaz.",
      },
    ],
    items: [
      {
        prompt:
          "İdeal siyah cisim tanımı ve sıcak görünümü için hangisi doğrudur?",
        options: [
          "Gelen ışınımı ideal soğurur; çok sıcakken görünür ışık yayabilir",
          "Her sıcaklıkta gözle siyah görünmek zorundadır",
          "Sıcaklığı 0 K üstünde olsa da hiç ışıma yapmaz",
          "Siyah boya olması tek başına bütün dalga boylarında ideal olduğunu kanıtlar",
          "Yalnız tek dalga boyu yayar",
        ],
        answer: 0,
        hint: "Gelen ışığın soğurulmasıyla kendi yayımını ayrı düşün.",
        explanation:
          "Tanım gelen ışınımın ideal soğurulmasını söyler. Sıcak cisim ayrıca termal ışınım yayar. Sıcaklık yeterliyse görünür bölgede yayım olduğundan parlak görünebilir.",
        guidance: {
          knowledge: [
            "Siyah cisim ideal soğurucu ve sıcaklıkla belirlenen termal yayıcıdır.",
          ],
          strategy: "Gelen ışığın soğurulmasıyla kendi yayımını ayrı düşün.",
          steps: [
            "Tanım gelen ışınımın ideal soğurulmasını söyler.",
            "Sıcak cisim ayrıca termal ışınım yayar.",
            "Sıcaklık yeterliyse görünür bölgede yayım olduğundan parlak görünebilir.",
          ],
          optionReasons: [
            "Doğru: Soğurma tanımıyla yayım tayfı ayrılır.",
            "Gündelik renk sözcüğünü fizik tanımı yerine koyar.",
            "Termal yayımı yok sayar.",
            "Gerçek boya ideal modelle her bantta özdeş değildir.",
            "Termal geniş tayfı tek çizgiye indirger.",
          ],
          commonError:
            "Siyah sözcüğünü bütün sıcaklıklarda görünür siyahlık diye okuma.",
          check: "Kor hâlindeki iyi soğurucunun ışık verebildiğini düşün.",
        },
      },
      {
        prompt:
          "Bλ tayfında tepe dalga boyu λT=b ile veriliyor. Sıcaklık 2000 K den 6000 K e çıkarsa λtepe nasıl değişir?",
        options: [
          "Üçte birine iner",
          "Üç katına çıkar",
          "Aynı kalır",
          "81 katına çıkar",
          "Dokuz katına çıkar",
        ],
        answer: 0,
        hint: "İki sıcaklık için çarpımları eşitle.",
        explanation:
          "λ1×2000=λ2×6000 yazılır. λ2/λ1=2000/6000=1/3 çıkar. Kısa dalga boyuna kayma artan sıcaklıkla uyumludur.",
        guidance: {
          knowledge: ["Dalga boyuna göre tayf tepesinde λtepe T sabittir."],
          strategy: "İki sıcaklık için çarpımları eşitle.",
          steps: [
            "λ1×2000=λ2×6000 yazılır.",
            "λ2/λ1=2000/6000=1/3 çıkar.",
            "Kısa dalga boyuna kayma artan sıcaklıkla uyumludur.",
          ],
          optionReasons: [
            "Doğru: T oranı 3 ise λ oranı 1/3 tür.",
            "Ters ilişkiyi doğru ilişki sanır.",
            "Wien kaymasını ihmal eder.",
            "Toplam güç oranını dalga boyuna taşır.",
            "T² yasası uydurur.",
          ],
          commonError:
            "λ-frekans tersliğini unutup iki tepeyi aynı yönde büyütme.",
          check: "Sonλ ile 6000 çarpımı ilk λ ile 2000 çarpımına eşit olmalı.",
        },
      },
      {
        prompt:
          "İdeal siyah cismin sıcaklığı iki katına çıkıyor; alan sabit. Toplam yayılan güç kaç kat olur?",
        options: ["8", "16", "2", "1/2", "4"],
        answer: 1,
        hint: "Sabit alan veσ yı oran denkleminde sadeleştir.",
        explanation:
          "P 2/P 1=(T 2/T 1)⁴ yazılır. T 2/T 1=2 verildiğinden oran 2⁴ tür. Sonuç 16 olur; bu tepe konumu değil tüm tayfın toplamıdır.",
        guidance: {
          knowledge: ["Stefan-Boltzmann yasasında toplam güç AσT⁴ tür."],
          strategy: "Sabit alan veσ yı oran denkleminde sadeleştir.",
          steps: [
            "P 2/P 1=(T 2/T 1)⁴ yazılır.",
            "T 2/T 1=2 verildiğinden oran 2⁴ tür.",
            "Sonuç 16 olur; bu tepe konumu değil tüm tayfın toplamıdır.",
          ],
          optionReasons: [
            "T³ kullanır.",
            "Doğru: P∝T⁴ olduğundan 2⁴=16 dır.",
            "Doğrusal ilişki varsayar.",
            "Wien tersliğini güce uygular.",
            "T² kullanır.",
          ],
          commonError: "Tepe dalga boyu bağıntısını toplam güce uygulama.",
          check: "Alan da iki kat olsaydı 32 çıkacağını ayır.",
        },
      },
      {
        prompt:
          "Aynı sıcaklıktaki iki ideal yüzeyin alanları A ve 3A. Büyük yüzeyin küçük yüzeye göre tepe dalga boyu ve toplam güç oranları hangisidir?",
        options: ["3 ve 3", "1/3 ve 3", "3 ve 9", "1 ve 1", "1 ve 3"],
        answer: 4,
        hint: "Birim alan tayfıyla tüm yüzeyin toplamını ayır.",
        explanation:
          "İki yüzeyin T si eşit olduğundan λtepe değerleri eşittir. P oranında σT⁴ ortak çarpanı gider. Alan oranı 3 olduğundan toplam güç oranı 3 tür.",
        guidance: {
          knowledge: ["Aynı T aynı birim alan tayfını verir; P=AσT⁴."],
          strategy: "Birim alan tayfıyla tüm yüzeyin toplamını ayır.",
          steps: [
            "İki yüzeyin T si eşit olduğundan λtepe değerleri eşittir.",
            "P oranında σT⁴ ortak çarpanı gider.",
            "Alan oranı 3 olduğundan toplam güç oranı 3 tür.",
          ],
          optionReasons: [
            "Alanı tepe konumuna taşır.",
            "Alanı ters tepe bağıntısı sanır.",
            "Her iki niceliğe yanlış alan kuvveti uygular.",
            "Toplam güçte alan etkisini yok sayar.",
            "Doğru: Tepe yalnız T ye, toplam güç alana bağlıdır.",
          ],
          commonError:
            "Daha büyük toplam gücü otomatik daha yüksek sıcaklık sanma.",
          check: "Birer metrekaresinin yayımını karşılaştırınca eşit çıkmalı.",
        },
      },
      {
        prompt:
          "Bir Bλ grafiğinde eğri altındaki bütün dalga boyu katkıları neyi verir?",
        options: [
          "Uygun yön integralinden sonra toplam yüzey yayımını",
          "Yalnız tepe dalga boyunu",
          "Işığın bütün renklerde aynı frekansta olduğunu",
          "Yalnız bir fotonun enerjisini",
          "Cismin kütlesini",
        ],
        answer: 0,
        hint: "Eksenin dağılım birimiyle toplam niceliği ayır.",
        explanation:
          "Her küçük dalga boyu aralığı enerji akışına bir katkı verir. Tüm aralıkları toplamak spektral toplamı verir. Radyans için yönlere uygun integral de yapılınca yüzey toplam yayımıyla ilişki kurulur.",
        guidance: {
          knowledge: [
            "Spektral radyans birim dalga boyu ve katı açı başına niceliktir; toplam için aralıklar ve yönler toplanır.",
          ],
          strategy: "Eksenin dağılım birimiyle toplam niceliği ayır.",
          steps: [
            "Her küçük dalga boyu aralığı enerji akışına bir katkı verir.",
            "Tüm aralıkları toplamak spektral toplamı verir.",
            "Radyans için yönlere uygun integral de yapılınca yüzey toplam yayımıyla ilişki kurulur.",
          ],
          optionReasons: [
            "Doğru: Spektral dağılımın toplamı geniş aralığı toplar.",
            "Tepe yatay eksende tek konumdur.",
            "Farklı dalga boyları farklı frekans taşır.",
            "Tayf topluluğu tek foton değildir.",
            "Grafik kütle dağılımı değildir.",
          ],
          commonError: "Tepe yüksekliğini eğri altı toplamla özdeşleştirme.",
          check:
            "Bλ nin biriminde metre başına dağılım bulunduğunu kontrol et.",
        },
      },
      {
        prompt:
          "λtepe=9660 nm olan bir ideal yüzey için b=2,898×10⁻³ m·K. Sıcaklık kaç K dir?",
        options: ["30", "9660", "0,3", "3000", "300"],
        answer: 4,
        hint: "Önce nm yi metreye çevir.",
        explanation:
          "9660×10⁻⁹=9,660×10⁻⁶ m dir. T=2,898×10⁻³/(9,660×10⁻⁶) yazılır. Sayı 0,3 ve üs 10³ çarpımı 300 K verir.",
        guidance: {
          knowledge: ["Wien yasası λtepe T=b ve nm 10⁻⁹ m."],
          strategy: "Önce nm yi metreye çevir.",
          steps: [
            "9660×10⁻⁹=9,660×10⁻⁶ m dir.",
            "T=2,898×10⁻³/(9,660×10⁻⁶) yazılır.",
            "Sayı 0,3 ve üs 10³ çarpımı 300 K verir.",
          ],
          optionReasons: [
            "nm dönüşümünde bir basamak hata yapar.",
            "Dalga boyu sayısını sıcaklık yapar.",
            "Bin çarpanını kaybeder.",
            "Bir basamak ters hata yapar.",
            "Doğru: 9660 nm=9,660×10⁻⁶ m; oran 300 dür.",
          ],
          commonError: "Dalga boyunu nm bırakıp metre-K sabitine bölme.",
          check: "300×9,660×10⁻⁶=2,898×10⁻³ olmalı.",
        },
      },
      {
        prompt:
          "İki ideal yüzey 300 K ve 600 K sıcaklıktadır. Hangi karşılaştırma doğrudur?",
        options: [
          "600 K yüzeyin bütün yayımı görünür olmak zorundadır",
          "Tepe iki kat, toplam yayım yarıdır",
          "600 K yüzeyin Bλ tepe dalga boyu yarı, alan başına toplam yayımı 16 kattır",
          "Her ikisi yalnız aynı tek dalga boyunu yayar",
          "300 K yüzey hiç elektromanyetik enerji yaymaz",
        ],
        answer: 2,
        hint: "T oranı 2 yi iki yasaya ayrı uygula.",
        explanation:
          "λ600/λ300=300/600=1/2 dir. M 600/M 300=(600/300)⁴=16 dır. İki tayf da geniştir; soğuk yüzeyin gözle görülmemesi yayım yokluğu değildir.",
        guidance: {
          knowledge: [
            "Sıcaklık termal tayfın hem dağılımını hem toplamını değiştirir.",
          ],
          strategy: "T oranı 2 yi iki yasaya ayrı uygula.",
          steps: [
            "λ600/λ300=300/600=1/2 dir.",
            "M 600/M 300=(600/300)⁴=16 dır.",
            "İki tayf da geniştir; soğuk yüzeyin gözle görülmemesi yayım yokluğu değildir.",
          ],
          optionReasons: [
            "Tayfın tamamını görünür bölgeye kapatır.",
            "İki ilişkinin yönünü ters çevirir.",
            "Doğru: Wien veT⁴ farklı niceliklere doğru uygulanır.",
            "Geniş tayfı yok sayar.",
            "0 K üstü termal yayımı inkâr eder.",
          ],
          commonError: "Görünürlükle elektromanyetik yayımı aynı ölçüt sayma.",
          check: "Tepe yaklaşık 4830 ve 9660 nm ile kızılötesinde kalabilir.",
        },
      },
      {
        prompt: "“Morötesi felaket” hangi durumu adlandırır?",
        options: [
          "Wien yasasının yalnız mor renge uygulanmasını",
          "Morötesi fotonların enerjisinin kesin sıfır olmasını",
          "Siyah cismin hiçbir frekansta yayım yapamamasını",
          "Klasik modelin kısa dalga boylarında fiziksel olmayan sınırsız toplam yayım öngörmesini",
          "Gerçek cismin her saniye sonsuz enerji vermesini",
        ],
        answer: 3,
        hint: "Deneysel sonuç ile modelin yanlış sonucunu ayır.",
        explanation:
          "Deney siyah cisim tayfında sonlu bir toplam gösterir. Klasik yaklaşım yüksek frekans katkılarını aşırı büyük öngörür. Bu uyumsuzluk Planckın kesikli enerji aktarımıyla giderilen problemdir.",
        guidance: {
          knowledge: [
            "Klasik yüksek frekans öngörüsü ölçülen sonlu tayfla uyuşmamıştır.",
          ],
          strategy: "Deneysel sonuç ile modelin yanlış sonucunu ayır.",
          steps: [
            "Deney siyah cisim tayfında sonlu bir toplam gösterir.",
            "Klasik yaklaşım yüksek frekans katkılarını aşırı büyük öngörür.",
            "Bu uyumsuzluk Planckın kesikli enerji aktarımıyla giderilen problemdir.",
          ],
          optionReasons: [
            "Yasanın kapsamını yanlış daraltır.",
            "Yüksek frekans enerjisini ters yorumlar.",
            "Termal deney bulgusunu yok sayar.",
            "Doğru: Sorun başarısız kuramsal öngörüdür.",
            "Model hatasını gerçek gözlem sayar.",
          ],
          commonError:
            "Felaket adını doğada gözlenmiş sonsuz enerji patlaması sanma.",
          check:
            "Planck modelinin neden sonlu yüksek frekans katkısı verdiğini düşün.",
        },
      },
      {
        prompt:
          "Planckın tarihsel osilatör modelinde ardışık enerji basamakları arasındaki fark hangisidir?",
        options: [
          "h/f",
          "fc",
          "nh/f",
          "hf",
          "Sıcaklıktan bağımsız her frekansta aynı 1 J",
        ],
        answer: 3,
        hint: "Enerji paketinin frekansla doğru ilişkisini ve birimini denetle.",
        explanation:
          "Bir basamak enerjisi nhf olarak yazılır. Sonraki basamak(n+1)hf dir. Fark(n+1)hf−nhf=hf olur.",
        guidance: {
          knowledge: ["h birimi J·s, f birimi s⁻¹ olduğundan hf enerji verir."],
          strategy:
            "Enerji paketinin frekansla doğru ilişkisini ve birimini denetle.",
          steps: [
            "Bir basamak enerjisi nhf olarak yazılır.",
            "Sonraki basamak(n+1)hf dir.",
            "Fark(n+1)hf−nhf=hf olur.",
          ],
          optionReasons: [
            "Frekans oranını ters kurar.",
            "c çarpımı enerji boyutu sağlamaz.",
            "Yanlış frekans bağıntısı kurar.",
            "Doğru: Kesikli paket büyüklüğü hf dir.",
            "Paketin frekansa bağlılığını siler.",
          ],
          commonError:
            "n sayısını Planck sabitinin veya frekansın yerine koyma.",
          check: "J·s×s⁻¹=J birimini yaz.",
        },
      },
      {
        prompt:
          "hc=1240 eV·nm yaklaşımıyla dalga boyu 620 nm olan tek fotonun enerjisi kaç eV dir?",
        options: ["1240", "20", "4", "2", "0,5"],
        answer: 3,
        hint: "nm sabitiyle nm girdisini aynı birimde kullan.",
        explanation:
          "Verilen çarpım 1240 eV·nm dir. 620 nm ye bölünce nm sadeleşir. Enerji 2 eV olur; daha uzun dalga boyu daha düşük enerjiyle uyumludur.",
        guidance: {
          knowledge: ["Tek foton E=hc/λ."],
          strategy: "nm sabitiyle nm girdisini aynı birimde kullan.",
          steps: [
            "Verilen çarpım 1240 eV·nm dir.",
            "620 nm ye bölünce nm sadeleşir.",
            "Enerji 2 eV olur; daha uzun dalga boyu daha düşük enerjiyle uyumludur.",
          ],
          optionReasons: [
            "Dalga boyuna bölmeyi unutur.",
            "Å sabitini nm girdisine uygular.",
            "Dalga boyunu yarıya almış gibi hesaplar.",
            "Doğru: 1240/620=2 dir.",
            "Oranı ters kurar.",
          ],
          commonError:
            "1240 ile 12400 sabitlerini birimden bağımsız ezberleme.",
          check: "2×620=1240 çarpımını denetle.",
        },
      },
      {
        prompt:
          "Bir fotonun enerjisi 5 eV.1 eV=1,6×10⁻¹⁹ J alınırsa enerji kaç joule dur?",
        options: ["5×10⁻¹⁹", "3,2×10⁻²⁰", "8×10⁻¹⁹", "8×10¹⁹", "1,6×10⁻¹⁹"],
        answer: 2,
        hint: "Beş adet 1 eV nin joule karşılıklarını topla.",
        explanation:
          "1 eV 1,6×10⁻¹⁹ J dir. 5 eV bunun 5 katıdır. 5×1,6=8 olduğundan 8×10⁻¹⁹ J bulunur.",
        guidance: {
          knowledge: [
            "eV de enerji birimidir; J ye çevirirken sayısı dönüşümle çarpılır.",
          ],
          strategy: "Beş adet 1 eV nin joule karşılıklarını topla.",
          steps: [
            "1 eV 1,6×10⁻¹⁹ J dir.",
            "5 eV bunun 5 katıdır.",
            "5×1,6=8 olduğundan 8×10⁻¹⁹ J bulunur.",
          ],
          optionReasons: [
            "Dönüşüm katsayısındaki 1,6 yı atlar.",
            "Çarpmak yerine bölme uygular.",
            "Doğru: 5 ile dönüşüm katsayısı çarpılır.",
            "Üs işaretini değiştirir.",
            "Yalnız 1 eV karşılığını verir.",
          ],
          commonError:
            "eV yi volt sanıp enerjiye yeniden elektron yükünü iki kez ekleme.",
          check: "Sonucun 5 kat 1 eV olması gerekir.",
        },
      },
      {
        prompt:
          "Aynı ortamda K fotonunun dalga boyu L ninkinin iki katı. Boşlukta enerji ve momentum oranları EK/EL ilep K/pL hangisidir?",
        options: ["2 ve 1/2", "1/2 ve 2", "1/2 ve 1/2", "1 ve 1", "2 ve 2"],
        answer: 2,
        hint: "İki bağıntıya aynı λ oranını yerleştir.",
        explanation:
          "λK=2λL veriliyor. EK/EL=λL/λK=1/2 dir. pK/pL de aynı ters oranla 1/2 olur.",
        guidance: {
          knowledge: ["E=hc/λ vep=h/λ."],
          strategy: "İki bağıntıya aynı λ oranını yerleştir.",
          steps: [
            "λK=2λL veriliyor.",
            "EK/EL=λL/λK=1/2 dir.",
            "pK/pL de aynı ters oranla 1/2 olur.",
          ],
          optionReasons: [
            "Enerjiyi ters çevirir.",
            "Momentumun dalga boyu ilişkisini ters çevirir.",
            "Doğru: E ve p aynı 1/λ ölçeğine sahiptir.",
            "Dalga boyu etkisini siler.",
            "İki ters ilişkiyi düz kurar.",
          ],
          commonError:
            "Fotonun momentumu için durgun kütle 0 diye oranı 0 sayma.",
          check: "Her foton için E/p=c sabit kalmalı.",
        },
      },
      {
        prompt:
          "Tek renkli demette tek foton enerjisi 4×10⁻¹⁹ J ve saniyedeki foton sayısı 3×10¹⁶. Güç kaç W olur?",
        options: ["7,5×10³⁴", "0,012", "1,2×10³⁶", "12", "0,12"],
        answer: 1,
        hint: "Sayı katsayılarıyla 10 üslerini ayrı çarp.",
        explanation:
          "4×3=12 katsayısı bulunur. 10⁻¹⁹×10¹⁶=10⁻³ tür. 12×10⁻³=0,012 W olur.",
        guidance: {
          knowledge: ["P=ΦE veW=J/s."],
          strategy: "Sayı katsayılarıyla 10 üslerini ayrı çarp.",
          steps: [
            "4×3=12 katsayısı bulunur.",
            "10⁻¹⁹×10¹⁶=10⁻³ tür.",
            "12×10⁻³=0,012 W olur.",
          ],
          optionReasons: [
            "Foton sayısını enerjiye böler.",
            "Doğru: Çarpım 12×10⁻³=0,012 J/s dir.",
            "Negatif üssü yanlış toplar.",
            "Bin çarpanını kaybeder.",
            "Üs hesabını bir basamak kaydırır.",
          ],
          commonError:
            "Güç ile toplam enerjiyi süreyi belirtmeden özdeş sayma.",
          check: "Bir saniyede 0,012 J taşınmalı.",
        },
      },
      {
        prompt:
          "Gücü sabit tek renkli kaynakta frekans iki katına çıkarılıyor. Foton/s sayısı ve tek foton enerjisi nasıl değişir?",
        options: [
          "Foton/s aynı, enerji iki kat",
          "İkisi de aynı",
          "Foton/s yarı, enerji iki kat",
          "Foton/s yarı, enerji yarı",
          "Foton/s iki kat, enerji iki kat",
        ],
        answer: 2,
        hint: "Önce tek fotonu değiştir, sonra sabit çarpımı koru.",
        explanation:
          "f iki kat olunca E=hf iki kat olur. P sabit olduğundan ΦE çarpımı aynı kalmalıdır. E iki katına karşı Φ yarıya iner.",
        guidance: {
          knowledge: [
            "Foton enerjisi hf, güç foton/s ile enerjinin çarpımıdır.",
          ],
          strategy: "Önce tek fotonu değiştir, sonra sabit çarpımı koru.",
          steps: [
            "f iki kat olunca E=hf iki kat olur.",
            "P sabit olduğundan ΦE çarpımı aynı kalmalıdır.",
            "E iki katına karşı Φ yarıya iner.",
          ],
          optionReasons: [
            "Gücü iki katına çıkarır.",
            "Frekansın enerjiyi değiştirmesini siler.",
            "Doğru: P=Φhf sabitliği doğru korunur.",
            "Gücü dörtte bire indirir.",
            "Gücü dört katına çıkarır.",
          ],
          commonError: "Sabit güç ile sabit foton akısını aynı koşul sanma.",
          check: "Yeni Φ ile yeni E yi çarpınca eski P çıkmalı.",
        },
      },
      {
        prompt:
          "Bir termal kamera soğuk yüzeyi mavi, sıcak yüzeyi sarı gösteriyor. Hangi yorum doğrudur?",
        options: [
          "Soğuk yüzey mutlaka mavi fotonları termal tepesinde yayar",
          "Renkler algılanan kızılötesi verinin gösterim ölçeği olabilir; gerçek görünür renk değildir",
          "Termal görüntü yayma katsayısından hiç etkilenmez",
          "Sarı görünen her piksel yalnız tek dalga boyudur",
          "Kamera cisimlerin 0 K olduğunu gösterir",
        ],
        answer: 1,
        hint: "Ekranın rengi ile algılanan bandı ayrı sor.",
        explanation:
          "Kamera görünür göz duyarlılığı dışında ışınım algılayabilir. Yazılım bu ölçümleri seçilmiş renklerle gösterir. Ekran rengi cismin yaydığı görünür rengin doğrudan fotoğrafı olmak zorunda değildir.",
        guidance: {
          knowledge: [
            "Termal kameralar belirli kızılötesi bant verisini yazılım renklerine eşler.",
          ],
          strategy: "Ekranın rengi ile algılanan bandı ayrı sor.",
          steps: [
            "Kamera görünür göz duyarlılığı dışında ışınım algılayabilir.",
            "Yazılım bu ölçümleri seçilmiş renklerle gösterir.",
            "Ekran rengi cismin yaydığı görünür rengin doğrudan fotoğrafı olmak zorunda değildir.",
          ],
          optionReasons: [
            "Sahte renk gösterimini gerçek ışık rengi sanır.",
            "Doğru: Görselleştirme rengiyle fiziksel tayf ayrılır.",
            "Gerçek yüzey özelliklerini yok sayar.",
            "Bant ölçümünü tek dalga boyuna indirger.",
            "Işıma yapan yüzeyle 0 K yi çelişkili özdeşleştirir.",
          ],
          commonError:
            "Renkli ısı haritasını çıplak göz görüntüsü diye yorumlama.",
          check: "Aynı veri farklı renk paletiyle de gösterilebilir.",
        },
      },
      {
        prompt:
          "Bir foton ideal bir aynadan geldiği yönün tersine, enerjisi değişmeden yansıyor. Fotonun başlangıç momentumu+p ise yüzeye aktarılan momentum nedir?",
        options: ["−2p", "0", "−p", "+p", "+2p"],
        answer: 4,
        hint: "Önce fotonun son-önce farkını bul, karşı işareti yüzeye ver.",
        explanation:
          "Fotonun ilk momentumu+p, son momentumu−p dir. Fotonun değişimi−p−p=−2p dir. Toplam momentum korunumu yüzeye+2p aktarım verir.",
        guidance: {
          knowledge: [
            "Momentum vektördür; ideal yansımada büyüklük aynı, yön ters olur.",
          ],
          strategy:
            "Önce fotonun son-önce farkını bul, karşı işareti yüzeye ver.",
          steps: [
            "Fotonun ilk momentumu+p, son momentumu−p dir.",
            "Fotonun değişimi−p−p=−2p dir.",
            "Toplam momentum korunumu yüzeye+2p aktarım verir.",
          ],
          optionReasons: [
            "Fotonun değişimini yüzeyin değişimiyle aynı işaret yapar.",
            "Yön değişimini momentum değişimi saymaz.",
            "Son foton momentumunu aktarım sayar.",
            "Soğurmayla yansımayı aynı sayar.",
            "Doğru: Foton momentum değişimi−2p, yüzeye aktarım+2p dir.",
          ],
          commonError: "Enerji aynı diye momentum da aynı kalır deme.",
          check: "Foton ve ayna değişimlerinin toplamı 0 olmalı.",
        },
      },
    ],
    source:
      "MEB ve OGM kapsamı esas alınarak özgün hazırlanmış konu anlatımı, modeller ve öğretim soruları. Resmî sınav sorusu değildir.",
  },
  {
    id: "fotoelektrik-olay",
    topic: "detail-401",
    title: "Fotoelektrik olay",
    minutes: 115,
    objectives: [
      "Eşik koşulunu ve enerji bütçesini bir foton-bir elektron modeliyle kur.",
      "Frekans, dalga boyu, akı ve yüzey değişimlerini ayır.",
      "Kesme gerilimi ile doyma akımını veri ve birimlerinden çıkar.",
    ],
    sections: [
      {
        title: "Önkoşul: enerji, gerilim ve akım",
        paragraphs: [
          "Tek foton enerjisi Eγ=hf=hc/λ dır. Elektronvolt enerji, volt potansiyel farkı, amper yük akışı birimidir. Elektronun 1 V ile kazandığı enerji 1 eV büyüklüğündedir; bu sayısal kolaylık V ile eV yi aynı nicelik yapmaz.",
          "Bir soruda enerji eV, kesme gerilimi V ise elektron için sayısal değerler eşit çıkabilir. Joule kullanılırsa K=eV bağıntısında e yükünün coulomb karşılığı da bulunmalıdır. Birimler hangi büyüklüğün ölçüldüğünü görünür tutar.",
        ],
      },
      {
        title: "Dış fotoelektrik olay",
        paragraphs: [
          "Uygun enerjili ışığın yüzeyden elektron koparmasına dış fotoelektrik etki denir. Metalden çıkan elektron fotoelektrondur. Olayda soğurulan foton enerji aktarır; son durumda aynı fotonun zorunlu saçılmış olarak kalması gerekmez.",
          "Sıradan düşük şiddetli tek foton yaklaşımı bu dersin varsayımıdır. Çok fotonlu süreçler ayrı koşullar gerektirir ve eşik altındaki sıradan ışığın bekleyerek enerji biriktirip elektron koparması açıklaması yerine kullanılmaz.",
        ],
      },
      {
        title: "İş fonksiyonu neyi belirtir?",
        paragraphs: [
          "W iş fonksiyonu seçilen yüzeyden elektronu dışarı çıkarmanın en küçük enerji maliyetidir. Yüzeyin malzemesi, kristal yüzü ve yüzey durumu etkili olabilir. Bu nedenle W her koşulda elementin değişmez tek sayısı diye sunulmaz.",
          "Sorularda W değeri açık verilir veya aynı yüzey korunduğu belirtilir. Işık frekansını artırmak W yi kendiliğinden değiştirmez; fotonun bütçesini değiştirir. Metalin toplam kütlesini artırmak da W yi aynı oranda artırmaz.",
        ],
      },
      {
        title: "Eşik koşulunu önce denetle",
        paragraphs: [
          "Eγ<W ise bu modelde fotoelektron yoktur. Eγ=W sınırında enerji bütçesi kopmaya izin verir ama en büyük ilk kinetik enerji 0 dır. Eγ>W ise pozitif maksimum kinetik enerji mümkündür.",
          "Eşik altında Kmax 0 diye elektron varmış gibi yazılmaz; Kmax tanımlanacak bir fotoelektron bulunmaz. Eşikte kopma enerji koşuluyla akımın toplanma koşulu da ayrıdır; uygun alan ve geometri olmadan anoda akım garantisi verilmez.",
        ],
      },
      {
        title: "Einsteinın enerji bütçesi",
        paragraphs: [
          "Maksimum enerji için Eγ=W+Kmax, bu yüzden Kmax=hf−W olur. Bazı elektronlar madde içinde ek enerji kaybedebileceği için çıkan her elektronun enerjisi Kmax değildir; bu bir üst sınırdır.",
          "Bir fotonun bütçesi yüzeyden çıkma maliyeti ve kalan hareket enerjisine bölünür. Tek foton yaklaşımında gelen foton sayısı bütçedeki hf yi büyütmez; daha çok foton daha çok olası etkileşim sunar.",
        ],
      },
      {
        title: "Eşik frekansı ve eşik dalga boyu",
        paragraphs: [
          "W=hf₀=hc/λ₀ tanımlarıyla f₀ en küçük uygun frekans,λ₀ en büyük uygun dalga boyudur. Aynı yüzeyde frekansın artması veya dalga boyunun azalması tek foton enerjisini yükseltir.",
          "W büyük yüzey için f₀ büyük,λ₀ küçüktür. Bir yüzeyin uzun eşik dalga boyuna sahip olması, onu ancak daha kısa dalga boyunun kestiği değil, daha düşük foton enerjisine de izin verdiği anlamına gelir.",
        ],
      },
      {
        title: "Kmax-f grafiği",
        paragraphs: [
          "Joule enerji ekseninde Kmax=hf−W doğrusunun eğimi h dir. Doğrunun frekans ekseni kesişimi f₀, uzantısının enerji ekseni kesişimi−W olur. Negatif uzantı gerçek negatif kinetik enerjili elektron değildir.",
          "Enerji eV birimindeyse eğim h/e eV·s dir. Grafikte tüm metaller için ortak eğim olması aynı eşik değerine sahip oldukları anlamına gelmez; farklı W doğruları paralel kaydırır.",
        ],
      },
      {
        title: "Doğrusal ile doğru orantılı farklıdır",
        paragraphs: [
          "Aynı yüzeyde Kmax frekansla doğrusal artar, fakat W>0 iken doğru orantılı değildir. Frekansı iki katına çıkarmak Kmax ı mutlaka iki kat yapmaz; hf−W de sabit terim bulunur.",
          "Benzer biçimde kesme gerilimi iş fonksiyonuyla affine biçimde azalır, ters orantı değildir. Oran sorusunda sembolik ifadeyi koruyup sonra sayısal veriyi yerleştirmek yanlış ezberi önler.",
        ],
      },
      {
        title: "Foton akısı ve optik güç",
        paragraphs: [
          "Φ saniyede yüzeye gelen foton sayısıysa tek renkli ışık gücü P=ΦEγ dır. Alan başına yazıldığında enerji akı yoğunluğu W/m², foton akı yoğunluğu ise foton/(s·m²) olur.",
          "Frekans sabitken bu iki yoğunluk birlikte artar; frekans değişirken aynı güç aynı foton sayısı değildir. Deneyde hangi akının sabit tutulduğu belirtilmeden akım nasıl değişir sorusu eksik kalabilir.",
        ],
      },
      {
        title: "Doyma akımı neyi ölçer?",
        paragraphs: [
          "Kopan elektronların tamamı toplandığında doyma akımı oluşur. Verilen kuantum verimiη için ideal üst değer Isat=eηΦ dir. Gelen her fotonun kesin bir elektron kopardığı varsayımı ancakη1 ve uygun eşik koşulu açıkça verilirse kullanılır.",
          "Gerçek yüzeyde yansıma, kayıplar ve enerjiye bağlı verim vardır. Aynı W tek başına aynıη demek değildir. Laboratuvar sonucu bu yüzden ölçülmüş bütün I-V eğrisi gibi uydurulmaz; öğretici üst sınır ile enerji bütçesi ayrı gösterilir.",
        ],
      },
      {
        title: "Vakumlu fotosel devresi",
        paragraphs: [
          "Işık katoda düşer, kopan elektronların bir bölümü anoda ulaşırsa dış devrede akım oluşur. Anot katoda göre pozitifken elektron üzerine anoda doğru kuvvet oluşur ve toplama kolaylaşabilir.",
          "Elektronun hareket yönüyle geleneksel akım yönü zıttır. Devredeki pil elektron koparmak için ışığın eşik koşulunu kendiliğinden kaldırmaz; verilen modelde pil zaten kopan elektronların hareket bütçesini değiştirir.",
        ],
      },
      {
        title: "Hızlandırıcı gerilim",
        paragraphs: [
          "V=Vanot−Vkatot pozitifken elektron anoda giderken eV kadar kinetik enerji kazanır. eV ve V birimleriyle sayısal olarak Kanot, max=Kmax+V yazılır; fotoelektrik çıkış enerjisi ve son enerji ayrıdır.",
          "Gerilimi yükseltmek fotoelektronun yüzeyden çıktığı andaki Kmax ı değiştirmez; ışık ve yüzey sabitse bu üst sınır aynı kalır. Değişen anoda ulaştığı andaki kinetik enerji ve toplama durumudur.",
        ],
      },
      {
        title: "Yavaşlatma ve kesme",
        paragraphs: [
          "Anot katoda göre negatif olduğunda elektronlar anoda giderken enerji kaybeder. Maksimum elektron için kalan enerji Kmax−e|V| olur. Akımı durduracak en küçük ters gerilim büyüklüğü için eVkesme=Kmax kullanılır.",
          "Kesme gerilimi ışık ve yüzey sabitken foton sayısını artırmakla değişmez. Eşitlikte maksimum elektronun sınırda sıfır enerjiyle ulaşıp kararlı akım taşımaması ideal kesme tanımıdır; grafik çözümünde bu sınır açık tutulur.",
        ],
      },
      {
        title: "Akım-gerilim verisini yorumla",
        paragraphs: [
          "Aynı yüzeyde daha büyük kesme gerilimi daha büyük Kmax ve dolayısıyla daha büyük foton enerjisi demektir. Doyma akımı iseηΦ hakkında bilgi verir. Bu iki ölçümün farklı görevleri vardır.",
          "İki kaynağın aynı kesme gerilimi aynı yüzey koşulunda aynı tek foton enerjisini gösterir, fakat aynı foton sayısını gerektirmez. Aynı doyma akımı daη ler eşit değilse tek başına aynı gelen akıyı kanıtlamaz.",
        ],
      },
      {
        title: "Frekans sabitken akıyı değiştir",
        paragraphs: [
          "Eşik üstünde, frekans, yüzey veη sabitken foton/s sayısını iki kat yapmak ideal doyma akımını iki kat yapar. Kmax ve kesme gerilimi değişmez; her fotonun enerji bütçesi aynıdır.",
          "Bu kontrol aynı güç ile karıştırılmaz; burada güç de foton akısıyla iki katına çıkar. Eşik altında foton sayısını yükseltmek bu tek foton modelinde akımı başlatmaz. Parlaklık tek başına eşik frekansının yerine geçmez.",
        ],
      },
      {
        title: "Güç sabitken frekansı değiştir",
        paragraphs: [
          "P sabitse Φ=P/hf olur. Frekansı yükseltmek tek fotonu daha enerjili yaparken saniyedeki foton sayısını azaltır. Eşik üstündeη sabit tutulursa ideal doyma akımı azalabilir, kesme gerilimi ise artar.",
          "Bu sonuç çelişki değildir: akım elektron sayısı/s, kesme gerilimi en büyük enerjiyle ilgilidir. Frekansa bağlıη ölçülmemişse gerçek akım için aynı kesin oran söylenmez; varsayımın soru içinde bulunması gerekir.",
        ],
      },
      {
        title: "Ölçümden W ve h/e çıkar",
        paragraphs: [
          "Kmax(eV)-f grafiğinde iki nokta arasındaki eğim ΔK/Δf=h/e verir. Sonra bir noktayı Kmax=(h/e)f−W bağıntısına koyarak W bulunur. Sıfır enerji kesişimi f₀ dır.",
          "Soru f yi 10¹⁴ Hz birimindeki sayı olarak veriyorsa grafiğin sayısal eğimi 0,4 eV/(10¹⁴ Hz) gibi yazılabilir. Bu değeri doğrudan 0,4 J·s diye adlandırmak birim hatasıdır; ölçek çarpanı korunmalıdır.",
        ],
      },
      {
        title: "Günlük uygulama ve iç etki",
        paragraphs: [
          "Işık algılayan kapı, kamera ve güvenlik sistemlerinde farklı fotodedektörler kullanılabilir. Modern yarı iletken fotodiyotta elektron-delik çiftleri oluşturulup ayrılır; her algılayıcı vakum tüpünden dışarı elektron çıkaran aygıt değildir.",
          "Dış fotoelektrik etkiyi öğrenmek ışığın kesikli aktarımını açıklar; teknolojiye geçerken bant aralığı ve iç taşıyıcı üretimi eklenir. Bir cihazın adında fotosel geçmesi onun tüm devre geometrisinin aynı olduğunu garanti etmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Eşik ile kalanı ayır",
        prompt:
          "W=2,4 eV yüzeye 3,9 eV ve 2,1 eV fotonlar ayrı ayrı gönderiliyor. Kmax ve kesme gerilimini belirle.",
        strategy: "Önce her ışık için enerji eşiğini sınayıp sonra çıkar.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "3,9>2,4 olduğundan ilk ışık fotoelektron üretebilir; Kmax 1,5 eV dir.",
          },
          {
            label: "Adım 2",
            explanation: "İlk ışık için kesme gerilimi büyüklüğü 1,5 V olur.",
          },
          {
            label: "Adım 3",
            explanation:
              "2,1<2,4 olduğundan ikinci ışıkta bu modelde fotoelektron yoktur; Kmax için negatif veya 0 elektron enerjisi yazılmaz.",
          },
        ],
        answer: "İlk:1,5 eV ve 1,5 V; ikinci: fotoelektron yok.",
        check: "W+Kmax 2,4+1,5=3,9 eV yi vermeli.",
        pitfall:
          "Eşik altındaki negatif farkı gerçek elektron kinetik enerjisi sayma.",
      },
      {
        title: "Doyma sayacı",
        prompt:
          "Yüzeye Φ=5×10¹³ foton/s geliyor, eşik aşılmış veη=0,4. e=1,6×10⁻¹⁹ C. İdeal doyma akımı nedir?",
        strategy: "Önce çıkan elektron/s, sonra yük/s bul.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Elektron üretim hızıηΦ=2×10¹³ s⁻¹ dir.",
          },
          {
            label: "Adım 2",
            explanation: "Hepsi toplanırsa I=eηΦ=3,2×10⁻⁶ A olur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Bu değer 3,2 μA dir; doyma sağlanmayan gerçek akım daha küçük olabilir.",
          },
        ],
        answer: "3,2 μA üst doyma değeri.",
        check:
          "0,4 ten küçük verim bir fotona zorunlu bir elektron olmadığını gösterir.",
        pitfall:
          "Φ yi doğrudan amper veyaη yi yüzde 40 yerine 40 olarak kullanma.",
      },
      {
        title: "Gerilimin enerji katkısı",
        prompt:
          "Eγ=6,2 eV, W=2,7 eV. Elektronlar anoda giderken V=−1,4 V veya+2,0 V görüyor. Maksimum anoda varış enerjilerini bul.",
        strategy: "Çıkış Kmax ını bir kez bul, işaretli gerilimi sonra ekle.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Yüzey çıkışında Kmax 6,2−2,7=3,5 eV dir.",
          },
          {
            label: "Adım 2",
            explanation: "−1,4 V için maksimum kalan 3,5−1,4=2,1 eV dir.",
          },
          {
            label: "Adım 3",
            explanation:
              "+2,0 V için maksimum kalan 3,5+2,0=5,5 eV dir; iki durumda da ilk Kmax 3,5 eV kalır.",
          },
        ],
        answer: "2,1 eV ve 5,5 eV.",
        check:
          "Pozitif anot gerilimi elektronun anoda varış enerjisini artırmalı.",
        pitfall: "Pil gerilimini iş fonksiyonu değişimi gibi yorumlama.",
      },
      {
        title: "Doğrunun iki noktası",
        prompt:
          "f birimi 10¹⁴ Hz, K birimi eV olan grafikte(8;1,0) ve(13;3,0) noktaları var. Eğim ve W yi bul.",
        strategy: "İki nokta farkından eğim, sonra sabit terim.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Eğim(3−1)/(13−8)=0,4 eV/(10¹⁴ Hz) dir.",
          },
          {
            label: "Adım 2",
            explanation:
              "K=0,4f−W ifadesinde f 8, K 1 koyulursa W 3,2−1=2,2 eV çıkar.",
          },
          {
            label: "Adım 3",
            explanation:
              "Eşik eksen değeri W/0,4=5,5 olduğundanf₀5,5×10¹⁴ Hz dir.",
          },
        ],
        answer: "Eğim 0,4 eV/(10¹⁴ Hz), W 2,2 eV.",
        check: "f 13 için 0,4×13−2,2=3,0 eV geri bulunmalı.",
        pitfall: "Eğim 0,4 ü birim dönüşümü olmadan h=0,4 J·s diye yazma.",
      },
      {
        title: "Sabit güçte iki frekans",
        prompt:
          "Aynı yüzeyde iş fonksiyonu 1,8 eV. İki tek renkli demetin foton enerjileri 3 eV ve 6 eV, güçleri eşit,η leri eşit. Doyma ve kesme oranlarını karşılaştır.",
        strategy: "Akım için P/E, kesme için E−W kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "İkinci demetin foton/s sayısı birincinin yarısıdır; doyma akımı oranı I 2/I 1=1/2 olur.",
          },
          {
            label: "Adım 2",
            explanation: "K 1=3−1,8=1,2 eV, K 2=6−1,8=4,2 eV dir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Kesme gerilimi oranı 4,2/1,2=3,5 olur; frekansın iki katı K yi iki kat yapmamıştır.",
          },
        ],
        answer: "Doyma oranı 1/2, kesme oranı 3,5.",
        check: "Eşit güç için foton sayısı×tek enerji aynı kalmalı.",
        pitfall: "Doğrusal grafiği orijinden geçen doğru orantı sayma.",
      },
      {
        title: "İki yüzey eşiği",
        prompt:
          "hc=1240 eV·nm. A yüzeyi W=2 eV, B yüzeyi W=3,1 eV.500 nm ışık hangisinde etki yapar veKmax nedir?",
        strategy: "Foton enerjisini bir kez hesapla, iki W ile ayrı kıyasla.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Foton enerjisi 1240/500=2,48 eV dir.",
          },
          {
            label: "Adım 2",
            explanation: "A için 2,48>2 olduğundan Kmax 0,48 eV olur.",
          },
          {
            label: "Adım 3",
            explanation:
              "B için 2,48<3,1 olduğundan fotoelektron oluşmaz; daha parlak aynı ışık eşik koşulunu değiştirmez.",
          },
        ],
        answer: "Yalnız A; Kmax 0,48 eV.",
        check:
          "A eşik dalga boyu 620 nm, B 400 nm;500 bu iki sınır arasındadır.",
        pitfall: "Her yüzey için aynı eşik değerini varsayma.",
      },
    ],
    recall: [
      {
        prompt: "Eşik altında Kmax 0 mı?",
        answer:
          "Fotoelektron yoktur;0 enerjili elektron varmış gibi Kmax yazılmaz.",
      },
      {
        prompt: "Frekans sabitken akı artışı Kmax ı artırır mı?",
        answer: "Hayır; üst eşik veη sabitse doyma akımını artırır.",
      },
      {
        prompt: "Kesme gerilimi neyi ölçer?",
        answer: "En büyük fotoelektron enerjisini: eVkesme=Kmax.",
      },
      {
        prompt: "Doyma akımı neyle ilişkilidir?",
        answer: "Toplanan elektron/s; idealη sabitseeηΦ.",
      },
      {
        prompt: "Enerji eV ekseninde eğim h mı?",
        answer: "f Hz iseh/e eV·s; enerji J iseh J·s.",
      },
      {
        prompt: "Kmax ile f doğru orantılı mı?",
        answer: "W>0 için doğrusal ama orijinden geçmez; Kmax=hf−W.",
      },
    ],
    items: [
      {
        prompt:
          "W=2,0 eV yüzeye 3,5 eV foton geliyor. Tek foton dış fotoelektrik modelinde Kmax kaç eV dir?",
        options: ["0", "5,5", "1,5", "2,0", "3,5"],
        answer: 2,
        hint: "Fotonun bütçesinden yüzey maliyetini ayır.",
        explanation:
          "3,5 eV eşiğin 2,0 eV üstündedir. Çıkış için 2,0 eV harcanır. Kalan 1,5 eV en büyük kinetik enerjidir.",
        guidance: {
          knowledge: ["Eγ=W+Kmax."],
          strategy: "Fotonun bütçesinden yüzey maliyetini ayır.",
          steps: [
            "3,5 eV eşiğin 2,0 eV üstündedir.",
            "Çıkış için 2,0 eV harcanır.",
            "Kalan 1,5 eV en büyük kinetik enerjidir.",
          ],
          optionReasons: [
            "Eşik üstü fazlayı yok sayar.",
            "Maliyeti enerjiye ekler.",
            "Doğru: 3,5−2,0=1,5 tir.",
            "İş fonksiyonunu kinetik enerji sayar.",
            "Çıkma maliyetini düşmez.",
          ],
          commonError:
            "Her foton enerjisini tamamen serbest hareket enerjisi sayma.",
          check: "2,0+1,5=3,5 eV olmalı.",
        },
      },
      {
        prompt:
          "İş fonksiyonu 4 eV yüzeye 3 eV tek renkli fotonlar düşük şiddette gönderiliyor. Tek foton modelinde doğru sonuç hangisidir?",
        options: [
          "Fotoelektron yoktur; aynı frekansta akıyı artırmak eşiği aşırmaz",
          "Işık akısı artarsa W kendiliğinden 3 eV olur",
          "Kmax=−1 eV elektron çıkar",
          "Kmax=0 eV elektron kesin çıkar",
          "Yeterince beklenirse her elektron 1 eV biriktirir",
        ],
        answer: 0,
        hint: "Önce tek fotonun 3 eV unu 4 eV ile kıyasla.",
        explanation:
          "3<4 olduğundan çıkma maliyeti karşılanmaz. Akı artışı tek foton enerjisini 3 eV dan büyütmez. Dolayısıyla belirtilen modelde fotoelektron ve ona ait Kmax bulunmaz.",
        guidance: {
          knowledge: ["Tek foton dış fotoetkide Eγ<W ise elektron çıkmaz."],
          strategy: "Önce tek fotonun 3 eV unu 4 eV ile kıyasla.",
          steps: [
            "3<4 olduğundan çıkma maliyeti karşılanmaz.",
            "Akı artışı tek foton enerjisini 3 eV dan büyütmez.",
            "Dolayısıyla belirtilen modelde fotoelektron ve ona ait Kmax bulunmaz.",
          ],
          optionReasons: [
            "Doğru: Bir foton enerji eşiğini karşılamaz.",
            "Yüzey maliyetini akıyla değiştirir.",
            "Negatif kinetik enerji fiziksel çıkış değildir.",
            "Eşik altını tam eşikle karıştırır.",
            "Tek foton modeline klasik birikim ekler.",
          ],
          commonError:
            "Negatif farkı veya 0 ı çıkmış elektronun enerjisi diye sunma.",
          check: "Frekans değişmedenhf aynı kalmalı.",
        },
      },
      {
        prompt:
          "Eγ=W tam eşik sınırı için ideal enerji bütçesinin doğru yorumu hangisidir?",
        options: [
          "Kmax=W olur",
          "Kesin doyma akımı vardır",
          "Elektron ilk anda ışık hızıyla gider",
          "Kopma enerji koşulu sağlanır, Kmax=0; toplanan akım ayrıca koşullara bağlıdır",
          "Hiçbir koşulda elektron çıkması mümkün değildir",
        ],
        answer: 3,
        hint: "Farkı hesapla, sonra akım için ek bilgi olup olmadığına bak.",
        explanation:
          "Eγ=W olduğundan Kmax 0 çıkar. Enerji bütçesi tam kopma sınırını sağlar. Akım için anoda toplama ve alan koşulları gerektiğinden yalnız bu eşitlik doyma garantisi değildir.",
        guidance: {
          knowledge: [
            "Eγ−W eşikte 0 dır; enerji koşulu ile devrede akım ayrı sorulardır.",
          ],
          strategy:
            "Farkı hesapla, sonra akım için ek bilgi olup olmadığına bak.",
          steps: [
            "Eγ=W olduğundan Kmax 0 çıkar.",
            "Enerji bütçesi tam kopma sınırını sağlar.",
            "Akım için anoda toplama ve alan koşulları gerektiğinden yalnız bu eşitlik doyma garantisi değildir.",
          ],
          optionReasons: [
            "Fotonun kalan enerjisini yanlış verir.",
            "Sıfır ilk enerji ve geometriye rağmen toplama garantiler.",
            "Kütleli elektron için yanlış hız çıkarır.",
            "Doğru: Enerji sınırıyla toplama koşulu ayrılır.",
            "Eşitliği eşik altı sayar.",
          ],
          commonError:
            "Sınırda kopmayla bütün elektronların toplanmasını aynı iddia sayma.",
          check:
            "Eşik altındaki hiç elektron yok durumundan farkını açık söyle.",
        },
      },
      {
        prompt: "hc=1240 eV·nm veW=2,5 eV. Eşik dalga boyu kaç nm dir?",
        options: ["2,5", "248", "496", "5000", "3100"],
        answer: 2,
        hint: "Eşik enerjisini verilenhc ye bölme düzeninde çöz.",
        explanation:
          "λ₀=hc/W yazılır. 1240 eV·nm/2,5 eV=496 nm olur. Bu en büyük uygun dalga boyudur; daha uzun dalgada enerji yetersizdir.",
        guidance: {
          knowledge: ["W=hc/λ₀."],
          strategy: "Eşik enerjisini verilenhc ye bölme düzeninde çöz.",
          steps: [
            "λ₀=hc/W yazılır.",
            "1240 eV·nm/2,5 eV=496 nm olur.",
            "Bu en büyük uygun dalga boyudur; daha uzun dalgada enerji yetersizdir.",
          ],
          optionReasons: [
            "Enerji sayısını dalga boyu yapar.",
            "İşi iki kat sayar.",
            "Doğru: 1240/2,5=496 dır.",
            "Birim ve sayı hesabını yanlış kurar.",
            "Çarpmak yerine bölmek gerektiğini kaçırır.",
          ],
          commonError: "Eşik dalga boyunu en küçük uygun dalga boyu sanma.",
          check: "496×2,5=1240 birim çarpımını denetle.",
        },
      },
      {
        prompt:
          "Aynı yüzeye λ=400 nm veλ=800 nm ışık gönderiliyor; hc=1240 eV·nm, W=2 eV. Hangisi uygundur?",
        options: [
          "İkisi deKmax 0,45 eV verir",
          "800 nm daha enerjik olduğu için Kmax 1,1 eV verir",
          "İkisi aynı enerjiyle elektron çıkarır",
          "400 nm eşik altı,800 nm eşik üstüdür",
          "400 nm etki yapar Kmax 1,1 eV;800 nm eşik altıdır",
        ],
        answer: 4,
        hint: "İki foton enerjisini ayrı bul ve 2 eV ile kıyasla.",
        explanation:
          "400 nm için E 3,1 eV veKmax 3,1−2=1,1 eV dir. 800 nm için E 1,55 eV bulunur. 1,55<2 olduğundan ikinci ışık fotoelektron vermez.",
        guidance: {
          knowledge: ["Eγ=1240/λ(nm) eV."],
          strategy: "İki foton enerjisini ayrı bul ve 2 eV ile kıyasla.",
          steps: [
            "400 nm için E 3,1 eV veKmax 3,1−2=1,1 eV dir.",
            "800 nm için E 1,55 eV bulunur.",
            "1,55<2 olduğundan ikinci ışık fotoelektron vermez.",
          ],
          optionReasons: [
            "Foton enerjilerini veya eşik farklarını karıştırır.",
            "Enerji-dalga boyu ilişkisini ters kurar.",
            "Dalga boyu farkını yok sayar.",
            "Her iki eşiği ters sıralar.",
            "Doğru: 3,1 eV ve 1,55 eV ayrı eşik karşılaştırmalarıdır.",
          ],
          commonError: "Büyük dalga boyunu büyük enerji diye yorumlama.",
          check: "Eşik λ620 nm;400 kısa,800 uzun taraftadır.",
        },
      },
      {
        prompt:
          "Aynı yüzeyde eşik üstü ışığın frekansı veη sabit, foton/s sayısı üç kat yapılıyor. İdeal doyma akımı ve kesme gerilimi nasıl değişir?",
        options: [
          "Akım üç kat; kesme aynı",
          "İkisi de aynı",
          "Akım aynı; kesme üç kat",
          "İkisi de üç kat",
          "Akım üçte bir; kesme aynı",
        ],
        answer: 0,
        hint: "Sabit kalan tek foton enerjisini önce işaretle.",
        explanation:
          "f sabit olduğundan Eγ veW sabit, Kmax aynıdır. Bu nedenle kesme gerilimi aynı kalır. Φ üç kat olduğundanη sabitken doyma akımı üç kat olur.",
        guidance: {
          knowledge: ["Isat=eηΦ, kesme V=Kmax(eV)."],
          strategy: "Sabit kalan tek foton enerjisini önce işaretle.",
          steps: [
            "f sabit olduğundan Eγ veW sabit, Kmax aynıdır.",
            "Bu nedenle kesme gerilimi aynı kalır.",
            "Φ üç kat olduğundanη sabitken doyma akımı üç kat olur.",
          ],
          optionReasons: [
            "Doğru: Sayı artışı I=eηΦ yi değiştirir, tek enerji aynı kalır.",
            "Elektron üretim hızını yok sayar.",
            "Sayı ve enerji ölçümlerini yer değiştirir.",
            "Akı etkisini Kmax a taşır.",
            "Akı-akım ilişkisini ters kurar.",
          ],
          commonError: "Parlaklığı tek foton enerjisiyle aynı nicelik sayma.",
          check: "Her fotonun çıkış bütçesini yeniden yazınca değişmemeli.",
        },
      },
      {
        prompt:
          "Eşik üstündeki iki tek renkli demetin güçleri veη leri eşit. İkinci demetin foton enerjisi birincinin iki katı. İdeal doyma akımı I 2/I 1 kaçtır?",
        options: ["1", "1/2", "4", "2", "0"],
        answer: 1,
        hint: "P veη ortak çarpanlarını sadeleştir.",
        explanation:
          "E 2=2E 1 ise Φ2=P/(2E 1)=Φ1/2 dir. η eşit olduğundan elektron üretim oranı da 1/2 dir. Bütün elektronlar toplandığında I 2/I 1=1/2 çıkar.",
        guidance: {
          knowledge: ["Φ=P/Eγ veIsat=eηΦ."],
          strategy: "P veη ortak çarpanlarını sadeleştir.",
          steps: [
            "E 2=2E 1 ise Φ2=P/(2E 1)=Φ1/2 dir.",
            "η eşit olduğundan elektron üretim oranı da 1/2 dir.",
            "Bütün elektronlar toplandığında I 2/I 1=1/2 çıkar.",
          ],
          optionReasons: [
            "Eşit gücü eşit sayı sayar.",
            "Doğru: Aynı güçte foton sayısı yarıya iner.",
            "Hem enerji hem sayıyı artırır.",
            "Enerji artışını foton sayısı artışı sanır.",
            "İki demetin de eşik üstü verisini yok sayar.",
          ],
          commonError:
            "Sabit güçle sabit foton akısını aynı deney koşulu sayma.",
          check: "Φ2E 2=Φ1E 1 eşitliğini denetle.",
        },
      },
      {
        prompt:
          "W=2 eV yüzeye önce 3 eV, sonra 6 eV fotonlar geliyor. Kesme gerilimleri oranı V 2/V 1 kaçtır?",
        options: ["1/2", "3", "1", "2", "4"],
        answer: 4,
        hint: "Her deneyin Kmax ını ayrı hesapla.",
        explanation:
          "İlkKmax 3−2=1 eV dir. İkinci Kmax 6−2=4 eV dir. Elektron için V sayıları 1 ve 4 olduğundan oran 4 tür.",
        guidance: {
          knowledge: [
            "Kesme büyüklüğü Eγ−W farkına bağlıdır; doğru orantı değildir.",
          ],
          strategy: "Her deneyin Kmax ını ayrı hesapla.",
          steps: [
            "İlkKmax 3−2=1 eV dir.",
            "İkinci Kmax 6−2=4 eV dir.",
            "Elektron için V sayıları 1 ve 4 olduğundan oran 4 tür.",
          ],
          optionReasons: [
            "Ters enerji oranını kullanır.",
            "Toplam foton enerjilerini yanlış böler.",
            "Yüzeyi sabit diye K yi sabit sayar.",
            "Frekansın iki katını K oranına kopyalar.",
            "Doğru: K 1=1, K 2=4 eV dur.",
          ],
          commonError: "Kmax-f doğrusunu orijinden geçen doğru sanma.",
          check: "K 2 yi 2K 1 almak enerji bütçesinde 2 eV eksik bırakır.",
        },
      },
      {
        prompt:
          "Joule birimli Kmax-Hz birimlif grafiğinin eğimi ve düşey uzantı kesişimi hangisidir?",
        options: ["h/e ve+W", "h ve−W", "W ve−h", "c ve 0", "e ve+f₀"],
        answer: 1,
        hint: "Doğruyuy=ax+b biçimiyle karşılaştır.",
        explanation:
          "f nin katsayısıh olduğundan eğimh dir. f 0 için uzantıda K=−W çıkar. Bu negatif uzantı gerçek negatif kinetik enerjili fotoelektron demek değildir.",
        guidance: {
          knowledge: ["J ekseninde K=hf−W."],
          strategy: "Doğruyuy=ax+b biçimiyle karşılaştır.",
          steps: [
            "f nin katsayısıh olduğundan eğimh dir.",
            "f 0 için uzantıda K=−W çıkar.",
            "Bu negatif uzantı gerçek negatif kinetik enerjili fotoelektron demek değildir.",
          ],
          optionReasons: [
            "eV eğimini J ye taşır ve işareti tersler.",
            "Doğru: K=hf−W ifadesinin katsayılarıdır.",
            "Katsayı ile sabit terimi yer değiştirir.",
            "Foton hızını enerji-frekans eğimi yapar.",
            "Yük ve frekansı yanlış eksene koyar.",
          ],
          commonError:
            "Doğrunun fiziksel eşik altı uzantısını elektron varlığı sanma.",
          check: "f₀=W/h noktasında K 0 olmalı.",
        },
      },
      {
        prompt:
          "Enerji eksenie V, frekans ekseni Hz olan Kmax-f grafiğinde eğim hangi birimdedir?",
        options: [
          "V/s",
          "eV/s",
          "Boyutsuz",
          "J·s ve değeri h dir",
          "eV·s ve değeri h/e dir",
        ],
        answer: 4,
        hint: "Birimleri bölerek başla.",
        explanation:
          "ΔK eV,Δf s⁻¹ birimindedir. eV/(s⁻¹)=eV·s olur. SI h J·s olduğundan eV ye çevrilmiş sayısal eğimh/e dir.",
        guidance: {
          knowledge: ["Eğim ΔK/Δf dir; Hz=s⁻¹."],
          strategy: "Birimleri bölerek başla.",
          steps: [
            "ΔK eV,Δf s⁻¹ birimindedir.",
            "eV/(s⁻¹)=eV·s olur.",
            "SI h J·s olduğundan eV ye çevrilmiş sayısal eğimh/e dir.",
          ],
          optionReasons: [
            "Gerilim-zaman ilişkisi kurar.",
            "Frekansa bölmek yerine çarpar.",
            "Eksenlerin boyutunu siler.",
            "Enerji eksenini J sanır.",
            "Doğru: Enerji/frekans=eV·s dir; h nin eV karşılığı kullanılır.",
          ],
          commonError:
            "Bütün enerji grafiklerine birimsizh etiketi yapıştırma.",
          check: "Eksen J yapılınca eğiminh olmasına dönüşümle ulaşılmalı.",
        },
      },
      {
        prompt:
          "Bir fotoselde Kmax=2,8 eV. Anot katoda göre+1,2 V olduğunda anoda ulaşan en hızlı elektronun enerjisi kaç eV dir?",
        options: ["0", "4,0", "3,36", "2,8", "1,6"],
        answer: 1,
        hint: "Gerilimin işaretini enerji katkısına çevir.",
        explanation:
          "Anot pozitif olduğundan elektron anoda giderken hızlanır. Elektronun enerji kazancı 1,2 eV dir. 2,8+1,2=4,0 eV anoda varış üst enerjisidir.",
        guidance: {
          knowledge: ["Kanot, max=Kmax+V; V=Vanot−Vkatot."],
          strategy: "Gerilimin işaretini enerji katkısına çevir.",
          steps: [
            "Anot pozitif olduğundan elektron anoda giderken hızlanır.",
            "Elektronun enerji kazancı 1,2 eV dir.",
            "2,8+1,2=4,0 eV anoda varış üst enerjisidir.",
          ],
          optionReasons: [
            "Eşik üstü elektronun pozitif alanda hareketini yok sayar.",
            "Doğru: Pozitif anot elektronun enerjisine 1,2 eV ekler.",
            "Enerjileri çarpar.",
            "Pilin işini ihmal eder.",
            "Hızlandırıcı gerilimi yavaşlatıcı sayar.",
          ],
          commonError:
            "Anoda varış enerjisini yüzeyden ilk çıkış Kmax ıyla özdeşleştirme.",
          check: "W vef sabitken yüzeydeki Kmax hâlâ2,8 eV olmalı.",
        },
      },
      {
        prompt:
          "Kmax=3,2 eV fotoelektronlar−1,5 V anot gerilimine karşı gidiyor. En hızlı elektron için kalan kinetik enerji kaç eV dir?",
        options: ["4,7", "3,2", "−1,7", "1,7", "4,8"],
        answer: 3,
        hint: "İşaretli gerilimi K ya ekle.",
        explanation:
          "V−1,5 olduğundan 1,5 eV kayıp vardır. 3,2−1,5=1,7 eV kalır. Kalan pozitif olduğu için en hızlı elektronun ulaşması enerji bakımından mümkündür.",
        guidance: {
          knowledge: ["Ters gerilimde enerji kaybıe|V| dir."],
          strategy: "İşaretli gerilimi K ya ekle.",
          steps: [
            "V−1,5 olduğundan 1,5 eV kayıp vardır.",
            "3,2−1,5=1,7 eV kalır.",
            "Kalan pozitif olduğu için en hızlı elektronun ulaşması enerji bakımından mümkündür.",
          ],
          optionReasons: [
            "Yavaşlatmayı hızlandırma sayar.",
            "Alan işini siler.",
            "Pozitif kalan enerjiye yanlış işaret verir.",
            "Doğru: 3,2−1,5=1,7 dir.",
            "Gerilimle enerjiyi çarpar.",
          ],
          commonError: "Her ters gerilimin bütün akımı kesin kestiğini sanma.",
          check: "Kesme sınırı 3,2 V büyüklüğünde olmalı.",
        },
      },
      {
        prompt:
          "İş fonksiyonu 2,2 eV yüzeye 5 eV foton geliyor. Kesme geriliminin büyüklüğü kaç V tur?",
        options: ["2,8", "5", "7,2", "2,2", "1,4"],
        answer: 0,
        hint: "Önce fotoelektrik enerji farkını bul.",
        explanation:
          "Kmax 5−2,2=2,8 eV dir. Ters alan bu enerjiyi en az 2,8 eV kadar azaltmalıdır. Elektron için gereken kesme büyüklüğü 2,8 V olur.",
        guidance: {
          knowledge: ["eVkesme=Kmax; K eV ise V sayısı aynı büyüklüktedir."],
          strategy: "Önce fotoelektrik enerji farkını bul.",
          steps: [
            "Kmax 5−2,2=2,8 eV dir.",
            "Ters alan bu enerjiyi en az 2,8 eV kadar azaltmalıdır.",
            "Elektron için gereken kesme büyüklüğü 2,8 V olur.",
          ],
          optionReasons: [
            "Doğru: Kmax 5−2,2=2,8 eV sayısal olarak 2,8 V kesme verir.",
            "Yüzey maliyetini düşmez.",
            "Maliyeti ekler.",
            "W yiK sayar.",
            "Elektron yükünü gereksiz iki kez sayar.",
          ],
          commonError:
            "Kesme büyüklüğünü anot geriliminin işaretiyle karıştırma.",
          check: "Anot gerilimi−2,8 V sınırında üst kalan enerji 0 olmalı.",
        },
      },
      {
        prompt:
          "Yüzeye 10¹⁴ foton/s geliyor; eşik üstü,η=0,25 ve bütün çıkanlar toplanıyor. e=1,6×10⁻¹⁹ C. Akım kaç μA dır?",
        options: ["0,4", "16", "25", "4", "40"],
        answer: 3,
        hint: "Foton/s den elektron/s ye, sonra yük/s ye geç.",
        explanation:
          "Elektron/s 0,25×10¹⁴=2,5×10¹³ tür. Akım 1,6×10⁻¹⁹×2,5×10¹³=4×10⁻⁶ A dır. 1 μA 10⁻⁶ A olduğundan 4 μA çıkar.",
        guidance: {
          knowledge: ["Isat=eηΦ."],
          strategy: "Foton/s den elektron/s ye, sonra yük/s ye geç.",
          steps: [
            "Elektron/s 0,25×10¹⁴=2,5×10¹³ tür.",
            "Akım 1,6×10⁻¹⁹×2,5×10¹³=4×10⁻⁶ A dır.",
            "1 μA 10⁻⁶ A olduğundan 4 μA çıkar.",
          ],
          optionReasons: [
            "Üs dönüşümünü bir basamak kaydırır.",
            "η yi 1 sayar.",
            "Elektron/s sayısının katsayısını akım sanır.",
            "Doğru: eηΦ=4×10⁻⁶ A dır.",
            "μA dönüşümünde bir basamak hata yapar.",
          ],
          commonError: "Verimi yüzde 25 yerine 25 olarak çarpma.",
          check: "η1 olsaydı 16 μA çıkacağını karşılaştır.",
        },
      },
      {
        prompt:
          "Aynı yüzeyde K ve L ışıklarının kesme gerilimleri eşit, doyma akımları farklı. Eşitη varsayımıyla hangisi uygundur?",
        options: [
          "İş fonksiyonu iki ışıkta farklıdır",
          "Tek foton enerjileri farklı, foton sayıları eşittir",
          "Eşit kesme gerilimi bütün akım değerlerini eşitler",
          "Tek foton enerjileri eşit, foton/s sayıları farklıdır",
          "Doyma akımı Kmax ı tek başına belirler",
        ],
        answer: 3,
        hint: "Önce kesme eşitliğini enerji bütçesine uygula.",
        explanation:
          "Vkesme eşitliğinden Kmax değerleri eşittir. Aynı W olduğundan Eγ=W+Kmax de eşittir. Farklı Isat, eşitη altında farklı Φ anlamına gelir.",
        guidance: {
          knowledge: [
            "Aynı W için eşit kesme eşit Eγ;η eşitse Isat oranı Φ oranıdır.",
          ],
          strategy: "Önce kesme eşitliğini enerji bütçesine uygula.",
          steps: [
            "Vkesme eşitliğinden Kmax değerleri eşittir.",
            "Aynı W olduğundan Eγ=W+Kmax de eşittir.",
            "Farklı Isat, eşitη altında farklı Φ anlamına gelir.",
          ],
          optionReasons: [
            "Aynı yüzeyi nedensiz değiştirir.",
            "İki ölçümün rollerini yer değiştirir.",
            "Bir enerji eşitliğinden tüm devre eğrisi eşitliği çıkarır.",
            "Doğru: Kesme enerji, akı doyma sayısı bilgisini taşır.",
            "Sayı hızını maksimum enerji sayar.",
          ],
          commonError:
            "Aynı renk ile aynı parlaklık veya foton sayısını özdeş sayma.",
          check: "Gelen foton/s yi artırınca kesme sabit kalabilmeli.",
        },
      },
      {
        prompt:
          "A ve B yüzeyleri W=2 eV veW=3 eV. Aynı 4 eV fotonlarla kesme büyüklükleri VA veVB nasıl kıyaslanır?",
        options: [
          "VA=6 V, VB=7 V",
          "İkisi de 0 V",
          "VA=2 V, VB=1 V",
          "VA=1 V, VB=2 V",
          "İkisi de 4 V",
        ],
        answer: 2,
        hint: "Yüzey değişimini W üzerinden takip et.",
        explanation:
          "A için Kmax 4−2=2 eV dir. B için Kmax 4−3=1 eV dir. Kesme büyüklükleri sırasıyla 2 ve 1 V olur; yüksek W daha az kalan verir.",
        guidance: {
          knowledge: ["Kmax=Eγ−W."],
          strategy: "Yüzey değişimini W üzerinden takip et.",
          steps: [
            "A için Kmax 4−2=2 eV dir.",
            "B için Kmax 4−3=1 eV dir.",
            "Kesme büyüklükleri sırasıyla 2 ve 1 V olur; yüksek W daha az kalan verir.",
          ],
          optionReasons: [
            "Maliyeti foton enerjisine ekler.",
            "Eşik üstü durumu ihmal eder.",
            "Doğru: Aynı foton enerjisinden ayrı W ler çıkarılır.",
            "Yüksek W yi yüksek kalan enerji sanır.",
            "Yüzey maliyetlerini yok sayar.",
          ],
          commonError:
            "Kesme ile W arasını ters orantı diye ezberleme; burada fark bağıntısı var.",
          check: "W bir eV artınca kesme bir V azalmalı.",
        },
      },
      {
        prompt:
          "Kmax(eV)-f(10¹⁴ Hz) doğrusunda(6;0,5) ve(10;2,1) noktaları var. İş fonksiyonu kaç eV dur?",
        options: ["2,6", "2,4", "4,75", "0,4", "1,9"],
        answer: 4,
        hint: "Eğimden doğrusal bütçeyi kur.",
        explanation:
          "Eğim(2,1−0,5)/(10−6)=0,4 tür. K=0,4f−W ifadesinde(6;0,5) kullanılır. W 2,4−0,5=1,9 eV bulunur.",
        guidance: {
          knowledge: [
            "İki nokta eğimi, hf katsayısını; sabit terim W yi verir.",
          ],
          strategy: "Eğimden doğrusal bütçeyi kur.",
          steps: [
            "Eğim(2,1−0,5)/(10−6)=0,4 tür.",
            "K=0,4f−W ifadesinde(6;0,5) kullanılır.",
            "W 2,4−0,5=1,9 eV bulunur.",
          ],
          optionReasons: [
            "İkiK değerini toplar.",
            "hf enerjisini W yapar.",
            "Eşik frekansının eksen sayısını enerji sayar.",
            "Eğimi W sanır.",
            "Doğru: Eğim 0,4 veW 0,4×6−0,5=1,9 dur.",
          ],
          commonError: "Grafik ölçek sayısını SI frekansla karıştırma.",
          check: "f 10 için 4−1,9=2,1 eV geri çıkmalı.",
        },
      },
      {
        prompt:
          "Bir metalden çıkan bütün fotoelektronların enerjisiyle ilgili hangisi doğrudur?",
        options: [
          "Kmax bir üst sınırdır; bazıları daha düşük enerjiyle çıkabilir",
          "Hepsinin enerjisi zorunlu Kmax tır",
          "Yüzeyden ayrılırken pilin son anoda varış enerjisiyle aynıdır",
          "Enerjileri negatif olmalıdır",
          "Işık akısı artınca hepsinin enerjisi aynı oranda artar",
        ],
        answer: 0,
        hint: "Üst sınır sözcüğünü bütün elektronlar için eşitlikten ayır.",
        explanation:
          "Yüzeyden çıkma maliyeti W en küçük gerekli enerjidir. Elektronlar çıkış öncesinde ek kayıp yaşayabilir. Bu nedenle 0 ile Kmax arasında dağılım mümkün olup her elektron üst sınırda değildir.",
        guidance: {
          knowledge: [
            "Einstein denklemi en büyük çıkış kinetik enerjisini verir.",
          ],
          strategy:
            "Üst sınır sözcüğünü bütün elektronlar için eşitlikten ayır.",
          steps: [
            "Yüzeyden çıkma maliyeti W en küçük gerekli enerjidir.",
            "Elektronlar çıkış öncesinde ek kayıp yaşayabilir.",
            "Bu nedenle 0 ile Kmax arasında dağılım mümkün olup her elektron üst sınırda değildir.",
          ],
          optionReasons: [
            "Doğru: Madde içi kayıplar enerji dağılımı oluşturabilir.",
            "Üst sınırı bütün dağılımla özdeşleştirir.",
            "İlk çıkışla alan sonrası enerjiyi karıştırır.",
            "Fiziksel kinetik enerji sınırını ihlal eder.",
            "Foton sayısını tek enerjiye taşır.",
          ],
          commonError:
            "Maksimum etiketi varken tüm elektronlara aynı enerji atama.",
          check:
            "Kesme ölçümünün dağılımın en enerjik ucunu sınadığını hatırla.",
        },
      },
    ],
    source:
      "MEB ve OGM kapsamı esas alınarak özgün hazırlanmış konu anlatımı, modeller ve öğretim soruları. Resmî sınav sorusu değildir.",
  },
  {
    id: "compton-debroglie",
    topic: "detail-402",
    title: "Compton Saçılması ve De Broglie Dalga Boyu",
    minutes: 105,
    objectives: [
      "Serbest durgun elektron modelinde saçılan foton ve elektronun enerji-momentum bütçesini kur.",
      "Saçılma açısıyla dalga boyu değişimini hesapla ve sınır açıları denetle.",
      "Madde dalga boyunu momentumla ilişkilendir; elektron hızlandırmada yaklaşım sınırını tanı.",
    ],
    sections: [
      {
        title: "Önkoşul: iki ayrı korunma",
        paragraphs: [
          "Foton için E=hc/λ, p=h/λ=E/c geçerlidir. Enerji skaler, momentum vektördür. Bir çarpışmada toplam enerjiyi toplamakla x ve y momentum bileşenlerini ayrı toplamak iki farklı denetimdir.",
          "Compton modelinde elektron başlangıçta serbest ve durgundur. Bağlı elektrona uygularken foton enerjisinin bağlanma ölçeğine göre yeterince büyük olması bir yaklaşımdır; her atom elektronuna her dalga boyunda aynı model doğrudan uygulanmaz.",
        ],
      },
      {
        title: "Saçılmada foton kalır",
        paragraphs: [
          "Gelen foton elektronla etkileşip başka yönde bir foton olarak saçılır; elektron geri teper. İdeal tek olayda gelen enerjinin bir bölümü elektrona gider, saçılan foton kalan enerjiyi taşır.",
          "Fotoelektrik olayındaki soğurmadan farklı olarak son durumda saçılan foton vardır. Fotonun enerji veya frekansının azalması boşlukta hızının azalması demek değildir; ilk ve son ışık hızı c dir.",
        ],
      },
      {
        title: "Açıyı hangi iki ok tanımlar?",
        paragraphs: [
          "θ gelen foton doğrultusuyla saçılan foton doğrultusu arasındaki açıdır. Elektronun geri tepme açısı ayrı açıdır. Şemada ikisini aynı sembolle kullanmak momentum üçgenini yanlış kurar.",
          "Gelen ışık+x boyunca, saçılan foton+x ten+y ye doğru θ açısıyla çizildiğinde elektronun y momentumu negatiftir. Başlangıç toplam y momentumu 0 olduğundan fotonun+y katkısını dengelemesi gerekir.",
        ],
      },
      {
        title: "Compton dalga boyu kayması",
        paragraphs: [
          "Serbest durgun elektron için Δλ=λ′−λ=(h/mec)(1−cosθ) olur. h/mec elektronun Compton dalga boyudur, yaklaşık 2,426 pm. Kayma yalnız saçılma açısı ve hedef kütleyle belirlenir.",
          "Aynı elektronda aynı θ için farklı ilk dalga boyları aynı mutlak Δλ verir. Ancak enerji farkları aynı olmak zorunda değildir; enerji 1/λ ile değişir. Kaymayı ilk dalga boyuna oranlarsan gelen ışığa bağlı göreli fark bulursun.",
        ],
      },
      {
        title: "Sıfır, dik ve geri açı",
        paragraphs: [
          "θ0 için Δλ0,θ90° için Δλ=λC,θ180° için Δλ=2λC dir. Sıfır açı ideal sınırında enerji aktarımı da 0 olur; bu yüzden her açıda kesin pozitif enerji kaybı genellemesi yapılmaz.",
          "0<θ≤180° için dalga boyu artar ve foton enerjisi azalır. θ aralığında 1−cosθ monoton artar. Çok küçük açıda 1−cosθ yerine 2sin²(θ/2) hesaplamak sayısal çıkarma kaybını azaltır.",
        ],
      },
      {
        title: "Enerji bütçesi",
        paragraphs: [
          "Başlangıç toplam enerji Eγ+mec², son toplam Eγ′+mec²+Ke dir. Durgun elektronun aynı dinlenim enerjisi iki tarafta sadeleşince Eγ=Eγ′+Ke kalır.",
          "Elektronun kinetik enerjisi Ke=hc(1/λ−1/λ′) dir. Foton ve elektronun toplam enerji-momentum korunumu bu ilişkileri birlikte üretir; gelen foton bütün enerjisini verip serbest durgun elektronda tek başına tamamen soğurulamaz.",
        ],
      },
      {
        title: "Momentum üçgeni",
        paragraphs: [
          "px, e=Eγ/c−(Eγ′/c)cosθ, py, e=−(Eγ′/c)sinθ dir. Vektörel fark elektronun yönünü ve momentumunu verir. Büyüklükleri doğrudanp γ−pγ′ diye çıkarmak yalnız aynı doğrultudaki özel durumda geçerlidir.",
          "Elektron için Ke=pe²/2me yaklaşımı ancak küçük kinetik enerjide geçerlidir. Genel enerji kontrolü(Ke+mec²)²=(pec)²+(mec²)² ile yapılır. Ke si dinlenim enerjisine yaklaşan elektron için klasik kontrol hatalı olabilir.",
        ],
      },
      {
        title: "Çarpışmaya esnek demenin sınırı",
        paragraphs: [
          "Bu olay foton-elektron etkileşiminde toplam enerjinin ve momentumun korunduğu, elektronun iç uyarılmasının bulunmadığı ideal saçılmadır. Bazı lise kaynakları bunu esnek çarpışma diye adlandırır; foton enerjisinin tek başına korunması anlamına gelmez.",
          "Enerji korunumu yalnız esnek olaylara özgü değildir. Fotoelektrik gibi soğurma olaylarında da tüm sistemin enerji bütçesi korunur. Çarpışma etiketi yerine hangi enerjilerin ve son parçacıkların sayıldığını yazmak güvenilir çözümdür.",
        ],
      },
      {
        title: "Dalga boyu kayması ve enerji kaybı",
        paragraphs: [
          "Δλ sabitken kısa ilk λ için göreli dalga boyu artışı daha büyük olur. Eγ′/Eγ=λ/(λ+Δλ) oranı, saçılan enerji payını doğrudan gösterir.",
          "Elektrona giden pay Δλ/(λ+Δλ) dır; bu oran 0 ile 1 arasındadır. Sayısal model Ke=Eγ·Δλ/(λ+Δλ) biçimini kullanır; neredeyse eşit iki büyük enerjiyi çıkarıp küçük aktarımı kaybetmez.",
        ],
      },
      {
        title: "Fotoelektrikle karşılaştırma",
        paragraphs: [
          "Her iki olay ışığın kesikli enerji ve momentum aktarımıyla ilgilidir. Dış fotoelektrikte yüzey maliyeti W ve soğurma, Compton olayında serbest durgun elektron yaklaşımı ve saçılan foton ana unsurlardır.",
          "“Fotoelektrik yalnız düşük enerji, Compton yalnız yüksek enerji” cümlesi kesin bir doğa yasağı değildir. X ışınlarıyla fotoelektrik soğurma da olabilir. Uygun model etkileşimin türü, bağlanma ölçeği ve ölçülen son duruma göre seçilir.",
        ],
      },
      {
        title: "Madde için de Broglie önerisi",
        paragraphs: [
          "Momentumup olan kuantum parçacığına λ=h/p dalga boyu atanır. Bu elektronun etrafında görünür bir su dalgası taşındığı anlamına gelmez; kuantum durumunun girişim ve kırınım özelliğini betimler.",
          "Elektronlar ve başka maddesel parçacıklarla gözlenen kırınım madde dalgasını destekler. Tespitler yerel olaylar olsa da çok sayıda deneyin dağılımı dalga etkisi gösterebilir; tanecik ve dalga betimleri birbirini rastgele iptal etmez.",
        ],
      },
      {
        title: "Momentum hangi çerçevede?",
        paragraphs: [
          "λ=h/p seçilen çerçevedeki momentuma bağlıdır. Aynı parçacık farklı çerçevelerde farklı momentum ve dalga boyuyla betimlenebilir. Bu bağıntı tek başına değişmez bir geometrik parçacık çapı vermez.",
          "Yavaş kütleli parçacıkta p≈mv kullanılır; göreli hızlarda p=γmv gerekir. Foton içinp=E/c kullanılır. Her taneciğe p=mc yazarak de Broglie bağıntısı türetmek doğru bir genel yol değildir.",
        ],
      },
      {
        title: "Aynı momentum, aynı dalga boyu",
        paragraphs: [
          "İki taneciğin momentum büyüklükleri eşitse de Broglie dalga boyları eşittir; bu kütlelerinin veya kinetik enerjilerinin eşit olduğunu gerektirmez. Kütle bilgisi hız veya kinetik enerjiyle momentumu bağlamak gerektiğinde kullanılır.",
          "Aynı düşük hızda büyük kütle daha büyük p ve daha kısa λ verir. Aynı düşük kinetik enerjide p=√(2mK) olduğundan λ∝1/√m olur. Hangi büyüklüğün eşit tutulduğunu söylemek doğru oranı seçtirir.",
        ],
      },
      {
        title: "Elektronu gerilimle hızlandırma",
        paragraphs: [
          "Başlangıçta durgun elektron U voltla hızlandırılırsa kinetik enerji eU olur. K≪mec² ise p≈√(2mee U), dolayısıyla λ≈h/√(2mee U) kullanılır; U dört katına çıkınca λ yaklaşık yarıya iner.",
          "Ke büyüdüğünde göreli düzeltmeylepc=√(Ke(Ke+2mec²)) kullanılır. Ke yi eV biriminde alırsan elektronun dinlenim enerjisi yaklaşık 511000 eV dir. Ke/mec² oranı küçük değilse klasik yaklaşımı sessizce sürdürme.",
        ],
      },
      {
        title: "Makroskobik cisimde küçük λ",
        paragraphs: [
          "Planck sabiti çok küçük olduğundan günlük kütle ve hızlarda h/p dalga boyu son derece küçüktür. Bu nedenle klasik hareket gözlemi olağan ölçeklerde iyi yaklaşım olabilir.",
          "Bu küçüklük madde dalgasının yalnız elektronlarda tanımlı olması demek değildir; gözlenebilir girişim için dalga boyu, aygıt ölçeği ve kuantum uyumluluğu önemlidir. Kütle büyüklüğünü tek başına dalga özelliği yokluğu kanıtı sayma.",
        ],
      },
      {
        title: "Kırınım çözünürlük fikri",
        paragraphs: [
          "Bir dalganın küçük yapıları ayırt etmesinde dalga boyu ölçeği önemlidir. Elektron mikroskobunda hızlandırılan elektronların kısa de Broglie dalga boyu yüksek çözünürlük olanağına katkı verir; manyetik ve elektrik alanlar demeti yönlendirir.",
          "Gerçek aygıt çözünürlüğü yalnız λ ile belirlenmez; mercek kusurları ve örnek etkileşimi de sınırlayıcıdır. Elektron dalgasını X ışını fotonuyla veya sesle aynı fiziksel dalga türü saymak yerine hangi parçacığın kullanıldığını belirt.",
        ],
      },
      {
        title: "Dalga-tanecik anlatımını birleştir",
        paragraphs: [
          "Girişim ve kırınım dalga özelliklerini, fotoelektrik ve Compton enerji-momentum aktarımı kuantum parçacık özelliklerini görünür kılar. Radyo dalgaları için de kuantum foton betimi vardır; düşük frekansta yok olduğu söylenmez.",
          "Bir tek deneyde hangi ölçümün yapıldığını açıklamak iki doğa sözcüğünü ezberlemekten yararlıdır. Fotoğrafta çizilmiş sinüs izi fotonun uzayda sallanarak gittiğinin birebir yolu değildir; şema alan veya olasılık değişimini temsil eder.",
        ],
      },
      {
        title: "Modelin üç kapanış denetimi",
        paragraphs: [
          "Compton hesabında λ′≥λ veEγ′≤Eγ sonuçlarını, enerji toplamını ve iki momentum bileşenini denetle. Sıfır açı sınırında eşitlikler doğru kalmalı;180° de kayma 2λC yi aşmamalıdır.",
          "Madde dalgasında hız veya gerilim büyüdüğünde momentum artışı veλ azalması beklenir. Hangi yaklaşımın kullanıldığını ve bütün sayısal veriyi soru kartında belirtmek, keşfin son durumunu bilmeden çözümü mümkün kılar.",
        ],
      },
    ],
    examples: [
      {
        title: "Dik saçılma",
        prompt:
          "Gelen λ=12 pm,λC=2,4 pm veθ90°. hc=1240 keV·pm alınırsa λ′ veelektron kinetik enerjisi nedir?",
        strategy: "Önce kayma, sonra iki foton enerjisi.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Δλ2,4 pm,λ′14,4 pm dir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Eilk 1240/12=103,333 keV, Eson 1240/14,4=86,111 keV dir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Ke 17,222 keV farkı elektrona gider; foton hızı yinec dir.",
          },
        ],
        answer: "λ′14,4 pm; Ke≈17,22 keV.",
        check: "86,111+17,222≈103,333 keV.",
        pitfall: "λC yi saçılan toplam dalga boyu yerine koyma.",
      },
      {
        title: "Kayma aynı, enerji payı farklı",
        prompt:
          "Aynı elektron ve aynı açıda Δλ=3 pm. İlk dalga boyları K 6 pm, L 15 pm. Fotonların son/ilk enerji oranlarını kıyasla.",
        strategy: "Eson/Eilk=λ/(λ+Δλ) kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation: "K oranı 6/9=2/3 tür.",
          },
          {
            label: "Adım 2",
            explanation: "L oranı 15/18=5/6 dır.",
          },
          {
            label: "Adım 3",
            explanation:
              "K daha büyük enerji payı kaybeder; aynı mutlak kayma eşit enerji aktarımı demek değildir.",
          },
        ],
        answer: "K 2/3, L 5/6.",
        check: "Kaybedilen paylar 1/3 ve 1/6 olmalı.",
        pitfall: "Aynı Δλ den aynı ΔE çıkarma.",
      },
      {
        title: "Momentumun iki bileşeni",
        prompt:
          "Bir Compton olayında elektronun durgun enerjisi511 keV. Gelen foton+x yönünde511 keV/c momentumlu;90° saçılan foton+y yönünde255,5 keV/c momentumlu. Elektron momentumunu ve büyüklüğünü bul.",
        strategy: "Başlangıç vektöründen son foton vektörünü çıkar.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Başlangıç momentum(511,0) keV/c dir;foton enerjileri511 ve255,5 keV olduğundan elektron kinetik enerjisi255,5 keV olur.",
          },
          {
            label: "Adım 2",
            explanation:
              "Momentum korunumu elektron için(511,−255,5) keV/c verir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Büyüklük√(511²+255,5²)≈571,315 keV/c dir;göreli enerji kontrolü√(255,5×(255,5+1022)) aynı sonucu verir.",
          },
        ],
        answer: "(511,−255,5) keV/c;büyüklük≈571,315 keV/c.",
        check:
          "Elektron ve son foton bileşen toplamı(511,0) olmalı;enerji255,5+255,5=511 keV korunur.",
        pitfall: "Farklı doğrultulu vektörlerin yalnız büyüklüklerini çıkarma.",
      },
      {
        title: "Aynı K de iki kütle",
        prompt:
          "Göreli olmayan iki taneciğin kinetik enerjileri eşit; ikinci kütle birincinin 9 katı. Dalga boyu oranı λ2/λ1 nedir?",
        strategy: "p=√(2mK) veλ=h/p yi birleştir.",
        steps: [
          {
            label: "Adım 1",
            explanation: "K sabitkenp 2/p 1=√(m 2/m 1)=3 tür.",
          },
          {
            label: "Adım 2",
            explanation:
              "Dalga boyu momentumun tersi olduğundan λ2/λ1=1/3 tür.",
          },
          {
            label: "Adım 3",
            explanation:
              "Hızları eşit varsayılmamıştır; aynı hız koşulunda oran farklı olurdu.",
          },
        ],
        answer: "1/3.",
        check: "λ²m aynı K altında sabit kalmalı.",
        pitfall: "Aynı enerji ile aynı hızı karıştırıp 1/9 cevabı verme.",
      },
      {
        title: "Hızlandırma oranı",
        prompt:
          "Elektronlar durgun başlayıp 25 V ve 225 V ile hızlandırılıyor; her ikisi göreli olmayan bölgede.λ225/λ25 nedir?",
        strategy: "K=eU, p∝√U,λ∝1/√U.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Gerilim oranı 225/25=9 dur.",
          },
          {
            label: "Adım 2",
            explanation: "Momentum oranı√9=3 tür.",
          },
          {
            label: "Adım 3",
            explanation:
              "Dalga boyu oranı 1/3 tür; gerilimin dokuz katı dalga boyunu dokuz kat küçültmez.",
          },
        ],
        answer: "1/3.",
        check:
          "K maksimum 225 eV,511000 eV dan çok küçük olduğundan yaklaşım uygundur.",
        pitfall: "λ yiU ile doğrudan ters orantılı sayma.",
      },
      {
        title: "Yaklaşım gerekliliği",
        prompt:
          "Bir elektron 300000 V ile durgunluktan hızlandırılıyor. Durgun enerjisi 511000 eV. Klasik momentum yaklaşımının düzeltme çarpanını bul: p=√(2mK)√(1+K/2mc²).",
        strategy: "K yi dinlenim enerjisine oranla.",
        steps: [
          {
            label: "Adım 1",
            explanation: "K 300000 eV,2mc²1022000 eV dir.",
          },
          {
            label: "Adım 2",
            explanation: "Düzeltme√(1+300000/1022000)≈1,137 dir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Göreli momentum klasik tahminden yaklaşık%13,7 büyük; dalga boyu onun tersi kadar daha küçüktür.",
          },
        ],
        answer: "Momentum çarpanı≈1,137; dalga boyu çarpanı≈0,879.",
        check: "K/mc²≈0,587 küçük sayı değildir.",
        pitfall:
          "Yüksek gerilimde klasik λ formülünü koşulsuz tam doğru kabul etme.",
      },
    ],
    recall: [
      {
        prompt: "Comptonθ hangi açıdır?",
        answer:
          "Gelen ve saçılan foton doğrultuları arasındaki açı; elektronun geri tepme açısı ayrı.",
      },
      {
        prompt: "θ0 da enerji aktarımı?",
        answer: "İdeal serbest durgun elektron modelinde 0;λ′=λ.",
      },
      {
        prompt: "θ180° de en büyük kayma?",
        answer: "2h/(mec)=2λC.",
      },
      {
        prompt: "Foton saçılınca neden yavaşlamaz?",
        answer: "Boşlukta hızıc; enerji azalması frekansın azalmasıyla olur.",
      },
      {
        prompt: "Aynı momentumda farklı kütlelerin λ sı?",
        answer:
          "λ=h/p olduğundan eşittir; enerjileri eşit olmak zorunda değildir.",
      },
      {
        prompt: "Düşük enerjide elektron gerilimi dört kat olursa λ?",
        answer: "p∝√U olduğundan λ yaklaşık yarıya iner.",
      },
    ],
    items: [
      {
        prompt:
          "Serbest ve başlangıçta durgun elektrona gelen foton Compton saçılmasıyla 0<θ≤180° açıyla saçılıyor. Hangisi doğrudur?",
        options: [
          "λ artar, f ve enerji azalır; boşluk hızıc kalır",
          "Foton kesin tamamen soğurulur",
          "λ ve enerji birlikte artar",
          "Elektronun kinetik enerjisi negatiftir",
          "Fotonun boşluk hızı azalır",
        ],
        answer: 0,
        hint: "Önce açıdan kaymayı, sonra enerji ve hızı ayır.",
        explanation:
          "Verilen açı aralığında 1−cosθ pozitiftir. Son dalga boyu büyüdüğündenf veE azalır. Saçılan foton hâlâ elektromanyetik ışık olduğundan boşluk hızıc dir.",
        guidance: {
          knowledge: ["Δλ=λC(1−cosθ)>0 veE=hc/λ."],
          strategy: "Önce açıdan kaymayı, sonra enerji ve hızı ayır.",
          steps: [
            "Verilen açı aralığında 1−cosθ pozitiftir.",
            "Son dalga boyu büyüdüğündenf veE azalır.",
            "Saçılan foton hâlâ elektromanyetik ışık olduğundan boşluk hızıc dir.",
          ],
          optionReasons: [
            "Doğru: Pozitif kayma enerji azalmasıyla uyumludur.",
            "Son fotonun bulunduğu saçılma modelini siler.",
            "E=hc/λ tersliğini ihlal eder.",
            "Enerji aktarımını ters işaret yapar.",
            "Enerjiyle boşluk hızını aynı yönde değiştirir.",
          ],
          commonError: "Foton enerjisi azalınca yavaşladığını söyleme.",
          check: "Eilk=Eson+Ke toplamını denetle.",
        },
      },
      {
        prompt:
          "λC=2,4 pm, gelen λ=8 pm,θ90° vecos 90°0. Saçılan dalga boyu kaç pm dir?",
        options: ["10,4", "12,8", "5,6", "8", "2,4"],
        answer: 0,
        hint: "Dik açı için kaymayı hesaplayıp ekle.",
        explanation:
          "1−cos 90°=1 dir. Δλ2,4×1=2,4 pm olur. λ′8+2,4=10,4 pm bulunur.",
        guidance: {
          knowledge: ["λ′=λ+λC(1−cosθ)."],
          strategy: "Dik açı için kaymayı hesaplayıp ekle.",
          steps: [
            "1−cos 90°=1 dir.",
            "Δλ2,4×1=2,4 pm olur.",
            "λ′8+2,4=10,4 pm bulunur.",
          ],
          optionReasons: [
            "Doğru: Δλ2,4 eklenir.",
            "180° kaymasını kullanır.",
            "Kaymayı çıkarır.",
            "Sıfır açı sınırını uygular.",
            "Kaymayı toplam λ sanır.",
          ],
          commonError:
            "Kaymayı ilk dalga boyundan bağımsız toplam dalga boyu sanma.",
          check: "Sonλ ilk λ dan büyük olmalı.",
        },
      },
      {
        prompt:
          "Serbest durgun elektron modelindeθ0° için hangi sonuç doğrudur?",
        options: [
          "Saçılan foton hızı 0",
          "Δλ0 veKe 0",
          "Δλ2λC veKe maksimum",
          "Elektronun durgun kütlesi 0 olur",
          "ΔλλC",
        ],
        answer: 1,
        hint: "Açıyı kayma formülüne yerleştir.",
        explanation:
          "ΔλλC(1−1)=0 bulunur. λ′=λ olduğundan foton enerjisi değişmez. Enerji bütçesi Ke=Eilk−Eson=0 verir.",
        guidance: {
          knowledge: ["1−cos 0°0."],
          strategy: "Açıyı kayma formülüne yerleştir.",
          steps: [
            "ΔλλC(1−1)=0 bulunur.",
            "λ′=λ olduğundan foton enerjisi değişmez.",
            "Enerji bütçesi Ke=Eilk−Eson=0 verir.",
          ],
          optionReasons: [
            "Fotonun hızını enerji aktarımıyla karıştırır.",
            "Doğru: İleri yön ideal sınırında enerji aktarımı yoktur.",
            "Geri saçılma sınırını koyar.",
            "Elektron türünü yanlış değiştirir.",
            "Dik açı sınırını koyar.",
          ],
          commonError:
            "Compton olayında her açıda kesin pozitif kayıp vardır deme.",
          check: "Sıfır açıda momentum da net değişmemeli.",
        },
      },
      {
        prompt:
          "Elektronun Compton dalga boyu 2,43 pm. En büyük dalga boyu artışı ve açısı hangisidir?",
        options: [
          "2,43 pm;90°",
          "Sınırsız; her açı",
          "4,86 pm;180°",
          "0 pm;180°",
          "2,43 pm;180°",
        ],
        answer: 2,
        hint: "Kosinüsün en küçük değerini seç.",
        explanation:
          "0..180° aralığında cosθ en küçük−1 olur. Bu değerθ180° de gerçekleşir. Δλ2×2,43=4,86 pm en büyük kaymadır.",
        guidance: {
          knowledge: ["cosθ−1 ile 1 arasındadır;1−cosθ en çok 2."],
          strategy: "Kosinüsün en küçük değerini seç.",
          steps: [
            "0..180° aralığında cosθ en küçük−1 olur.",
            "Bu değerθ180° de gerçekleşir.",
            "Δλ2×2,43=4,86 pm en büyük kaymadır.",
          ],
          optionReasons: [
            "Kayma doğru olsa da en büyük değildir.",
            "Açı katsayısının 0..2 sınırını yok sayar.",
            "Doğru: 1−cos 180°2 dir.",
            "Sıfır açıyı ters uçla karıştırır.",
            "Geri açıda 2 çarpanını atlar.",
          ],
          commonError:
            "Compton dalga boyunu her açıdaki sabit kayma diye kullanma.",
          check: "90° de bulunan 2,43 pm den iki kat büyük olmalı.",
        },
      },
      {
        prompt:
          "Aynı elektronda aynıθ açısı için ilk dalga boyları 5 pm ve 20 pm olan fotonlar saçılıyor. Hangi nicelik kesin eşittir?",
        options: [
          "Saçılan foton enerjileri",
          "Mutlak dalga boyu artışı Δλ",
          "Son/ilk enerji oranları",
          "Elektrona aktarılan enerjiler",
          "İlk foton enerjileri",
        ],
        answer: 1,
        hint: "Formülde ilk λ nın bulunup bulunmadığını izle.",
        explanation:
          "λC hedef elektron için ortaktır. θ ortak olduğundan 1−cosθ de ortaktır. Bu iki ortak çarpan Δλ yı eşitler; enerji oranını eşitlemez.",
        guidance: {
          knowledge: ["Serbest durgun aynı elektron için ΔλλC(1−cosθ)."],
          strategy: "Formülde ilk λ nın bulunup bulunmadığını izle.",
          steps: [
            "λC hedef elektron için ortaktır.",
            "θ ortak olduğundan 1−cosθ de ortaktır.",
            "Bu iki ortak çarpan Δλ yı eşitler; enerji oranını eşitlemez.",
          ],
          optionReasons: [
            "Aynı ek kayma farklı son λ verir.",
            "Doğru: Kayma yalnız hedef kütle ve açıya bağlıdır.",
            "λ/(λ+Δλ) oranı ilk λ ya bağlıdır.",
            "Enerji 1/λ olduğundan aynı fark çıkması gerekmez.",
            "İlkλ lar farklıysa enerjiler farklıdır.",
          ],
          commonError: "Aynı dalga boyu farkından aynı enerji farkı çıkarma.",
          check: "İki son λ sı 5+Δ ve 20+Δ diye ayrı kalmalı.",
        },
      },
      {
        prompt:
          "Bir olayda fotonun enerjisi 80 keV den 60 keV ye düşüyor. Başlangıç elektronu durgun ve serbest ise elektronun kinetik enerjisi kaç keV dir?",
        options: ["140", "80", "20", "60", "511"],
        answer: 2,
        hint: "Başlangıç ve son foton enerjileri farkını al.",
        explanation:
          "Toplam bütçe 80+mec²=60+mec²+Ke dir. Ortakmec² sadeleşir. Ke 80−60=20 keV bulunur.",
        guidance: {
          knowledge: [
            "Eilk=Eson+Ke; elektronun durgun enerjisi iki tarafta sadeleşir.",
          ],
          strategy: "Başlangıç ve son foton enerjileri farkını al.",
          steps: [
            "Toplam bütçe 80+mec²=60+mec²+Ke dir.",
            "Ortakmec² sadeleşir.",
            "Ke 80−60=20 keV bulunur.",
          ],
          optionReasons: [
            "İki foton enerjisini toplar.",
            "Fotonun tamamı soğurulmuş gibi sayar.",
            "Doğru: Fotonun verdiği enerji 80−60 tır.",
            "Son foton enerjisini elektrona kopyalar.",
            "Elektronun durgun enerjisini K sayar.",
          ],
          commonError:
            "Durgun elektronun 511 keV sini yeni üretilmiş kinetik enerjiye ekleme.",
          check: "60+20=80 keV olmalı.",
        },
      },
      {
        prompt:
          "Bir Compton olayında λ′=1,25λ ölçülüyor. Saçılan fotonun enerji oranı E′/E hangisidir?",
        options: ["1,8", "0,25", "1,25", "0,8", "0"],
        answer: 3,
        hint: "Oran denklemindehc yi sadeleştir.",
        explanation:
          "E′/E=(hc/λ′)/(hc/λ)=λ/λ′ dir. λ′=1,25λ yerine konur. 1/1,25=0,8 bulunur; enerjinin%20 si elektrona gider.",
        guidance: {
          knowledge: ["E=hc/λ."],
          strategy: "Oran denklemindehc yi sadeleştir.",
          steps: [
            "E′/E=(hc/λ′)/(hc/λ)=λ/λ′ dir.",
            "λ′=1,25λ yerine konur.",
            "1/1,25=0,8 bulunur; enerjinin%20 si elektrona gider.",
          ],
          optionReasons: [
            "Ters oran yerine toplam kurar.",
            "Yalnız artış oranını kullanır.",
            "Dalga boyu oranını enerjiye aynen kopyalar.",
            "Doğru: Enerji λ nın tersidir:1/1,25.",
            "Son fotonun varlığını yok sayar.",
          ],
          commonError:
            "Dalga boyundaki%25 artışı enerji için%25 azalma diye doğrudan kullanma.",
          check: "0,8×1,25=1 olmalı.",
        },
      },
      {
        prompt:
          "Foton başlangıçta+x yönünde. Saçılan fotonun y momentum bileşeni+q. Başlangıçta durgun elektronun son y momentum bileşeni nedir?",
        options: [
          "+q",
          "Elektron kütlesi bilinmeden bulunamaz",
          "0",
          "2q",
          "−q",
        ],
        answer: 4,
        hint: "Y yönünde başlangıç toplamını yaz.",
        explanation:
          "İlk foton+x boyunca olduğundanpy 0 dır; elektron da durgundur. Son toplam y momentumu+q+py, e olmalıdır. 0=q+py, e denklemindenpy, e=−q çıkar.",
        guidance: {
          knowledge: ["Her yönde toplam momentum korunur."],
          strategy: "Y yönünde başlangıç toplamını yaz.",
          steps: [
            "İlk foton+x boyunca olduğundanpy 0 dır; elektron da durgundur.",
            "Son toplam y momentumu+q+py, e olmalıdır.",
            "0=q+py, e denklemindenpy, e=−q çıkar.",
          ],
          optionReasons: [
            "Aynı yönde iki katkı üretir.",
            "Bileşen korunumu için kütle gerekmez.",
            "Saçılan fotonun y katkısını dengelemez.",
            "Korunum toplamını yanlış çarpanla kurar.",
            "Doğru: Başlangıç toplam y 0 korunur.",
          ],
          commonError: "Momentum büyüklüklerini yönsüz toplamla dengeleme.",
          check: "+q ile−q toplamı 0 vermeli.",
        },
      },
      {
        prompt:
          "Fotoelektrik soğurma ile Compton saçılmasını ayıran uygun ifade hangisidir?",
        options: [
          "Compton fotonunun boşluk hızı azalır",
          "Compton hesabı elektronun bağlanma koşulundan bağımsız her durumda aynen geçerlidir",
          "Fotoelektrik olayında enerji korunmaz",
          "Compton son durumunda saçılan foton vardır; dış fotoelektrikte foton soğurulup çıkma maliyeti ödenir",
          "Fotoelektrik yalnız görünür ışıkta mümkünken X ışınında imkânsızdır",
        ],
        answer: 3,
        hint: "Son durumda foton bulunup bulunmadığını sor.",
        explanation:
          "Compton modelinde Eilk, Eson veKe birlikte bütçededir. Dış fotoelektrikte soğurulan foton enerjisi W veK ye dağılır. Ayrım yalnız yüksek-düşük enerji etiketi değil etkileşim ve son durum farkıdır.",
        guidance: {
          knowledge: [
            "Etkileşim modeli son parçacıklar ve bağlanma koşullarıyla seçilir.",
          ],
          strategy: "Son durumda foton bulunup bulunmadığını sor.",
          steps: [
            "Compton modelinde Eilk, Eson veKe birlikte bütçededir.",
            "Dış fotoelektrikte soğurulan foton enerjisi W veK ye dağılır.",
            "Ayrım yalnız yüksek-düşük enerji etiketi değil etkileşim ve son durum farkıdır.",
          ],
          optionReasons: [
            "Hızc kalır.",
            "Serbest durgun elektron varsayımını siler.",
            "Tüm sistem enerjisi fotoelektrikte de korunur.",
            "Doğru: İki modelin son durumları ve maliyetleri ayrılır.",
            "Enerji bölgesini mutlak yasak sanır.",
          ],
          commonError: "HerX fotonunun zorunlu Compton yaptığını varsayma.",
          check: "Her iki süreç için ayrı enerji denklemi yazabilmelisin.",
        },
      },
      {
        prompt:
          "Momentumu 2p olan kuantum taneciğinin, p momentumluya göre de Broglie dalga boyu kaç kattır?",
        options: ["1/4", "2", "1", "4", "1/2"],
        answer: 4,
        hint: "Oranda ortakh yi sadeleştir.",
        explanation:
          "λ1=h/p,λ2=h/(2p) dir. λ2=(1/2)λ1 olur. Momentum arttığında dalga boyu kısalır.",
        guidance: {
          knowledge: ["De Broglie bağıntısı λ=h/p dir."],
          strategy: "Oranda ortakh yi sadeleştir.",
          steps: [
            "λ1=h/p,λ2=h/(2p) dir.",
            "λ2=(1/2)λ1 olur.",
            "Momentum arttığında dalga boyu kısalır.",
          ],
          optionReasons: [
            "İki kat momentuma dört kat terslik uygular.",
            "Momentumla doğru orantı kurar.",
            "Momentum etkisini siler.",
            "Kare bağıntısı uydurur.",
            "Doğru: λ=h/p ters orantısıdır.",
          ],
          commonError: "Madde dalga boyunu parçacığın sabit çapı sanma.",
          check: "Yeni λ ile yenip çarpımı yineh olmalı.",
        },
      },
      {
        prompt:
          "Bir elektron ve proton aynı momentum büyüklüğüne sahip. De Broglie dalga boyları nasıl karşılaştırılır?",
        options: [
          "Elektronunki kütle oranı kadar büyüktür",
          "Elektronun dalga boyu yoktur",
          "Protonun dalga boyu yoktur",
          "Eşittir",
          "Protonunki kütle oranı kadar büyüktür",
        ],
        answer: 3,
        hint: "Verilen eşit niceliğin momentum olduğunu koru.",
        explanation:
          "İki tanecik içinh aynıdır. p büyüklükleri de eşit verildiğinden paydalar aynıdır. λ değerleri eşit çıkar; kinetik enerji eşitliği sonucu gerekmez.",
        guidance: {
          knowledge: [
            "λ=h/p; kütle, p yi hız veya K den bulmak gerektiğinde devreye girer.",
          ],
          strategy: "Verilen eşit niceliğin momentum olduğunu koru.",
          steps: [
            "İki tanecik içinh aynıdır.",
            "p büyüklükleri de eşit verildiğinden paydalar aynıdır.",
            "λ değerleri eşit çıkar; kinetik enerji eşitliği sonucu gerekmez.",
          ],
          optionReasons: [
            "Aynı hızı sessizce varsayar.",
            "Elektron girişim olgularını yok sayar.",
            "Madde dalgasını yalnız elektrona sınırlar.",
            "Doğru: λ yalnız verilenp üzerinden hesaplanır.",
            "Aynı hızı ters yönde uygular.",
          ],
          commonError:
            "Momentum eşitliğini hız eşitliğiyle değiştirip kütle ekleme.",
          check: "İkiλp çarpımı aynıh ye eşit olmalı.",
        },
      },
      {
        prompt:
          "Göreli olmayan iki taneciğin hız büyüklükleri eşit; kütleleri m ve 4m. Ağırın hafife göre de Broglie dalga boyu kaç kattır?",
        options: ["4", "1/2", "1", "2", "1/4"],
        answer: 4,
        hint: "Hız ortak çarpanını sadeleştir.",
        explanation:
          "p ağır/p hafif=4mv/mv=4 tür. Dalga boyu momentumun tersidir. λ ağır/λ hafif=1/4 bulunur.",
        guidance: {
          knowledge: ["Düşük hızdap=mv,λ=h/(mv)."],
          strategy: "Hız ortak çarpanını sadeleştir.",
          steps: [
            "p ağır/p hafif=4mv/mv=4 tür.",
            "Dalga boyu momentumun tersidir.",
            "λ ağır/λ hafif=1/4 bulunur.",
          ],
          optionReasons: [
            "Momentumu λ ile doğru orantılı kurar.",
            "Aynı K koşulunun karekökünü yanlış uygular.",
            "Kütle etkisini siler.",
            "Yanlış karekök ve yön kullanır.",
            "Doğru: Aynıv de p dört kat olur.",
          ],
          commonError: "Aynı hızla aynı kinetik enerjiyi karıştırma.",
          check: "Ağır taneciğin K si aynıv de dört kattır; eşit değildir.",
        },
      },
      {
        prompt:
          "Göreli olmayan iki taneciğin kinetik enerjileri eşit; kütleleri m ve 4m. Ağırın hafife göre dalga boyu kaç kattır?",
        options: ["4", "1/4", "1/2", "2", "1"],
        answer: 2,
        hint: "Eşit K yi koruyarakmomentumu karşılaştır.",
        explanation:
          "p ağır/p hafif=√(4m/m)=2 dir. λ=h/p olduğundan oran ters döner. λ ağır/λ hafif=1/2 çıkar.",
        guidance: {
          knowledge: ["K=p²/(2m) denp=√(2mK)."],
          strategy: "Eşit K yi koruyarakmomentumu karşılaştır.",
          steps: [
            "p ağır/p hafif=√(4m/m)=2 dir.",
            "λ=h/p olduğundan oran ters döner.",
            "λ ağır/λ hafif=1/2 çıkar.",
          ],
          optionReasons: [
            "Hem koşulu hem yönü yanlış kurar.",
            "Aynıv koşulunu uygular.",
            "Doğru: p∝√m olduğundan λ oranı 1/2 dir.",
            "Tersliği unutur.",
            "Kütle etkisini yok sayar.",
          ],
          commonError: "Kütle dört kat diye hızın da aynı kaldığını varsayma.",
          check: "λ²m çarpımı eşit K de sabit olmalı.",
        },
      },
      {
        prompt:
          "Durgun elektronlar U ve 16U gerilimleriyle hızlandırılıyor; ikisi de düşük enerji bölgesinde.λ16U/λU kaçtır?",
        options: ["1/4", "4", "1/2", "1/16", "16"],
        answer: 0,
        hint: "Gerilimden K ye, oradanp ye geç.",
        explanation: "K oranı 16 dır. p oranı√16=4 tür. λ oranı 1/4 olur.",
        guidance: {
          knowledge: ["K=eU ve düşük enerjidep=√(2mK)."],
          strategy: "Gerilimden K ye, oradanp ye geç.",
          steps: ["K oranı 16 dır.", "p oranı√16=4 tür.", "λ oranı 1/4 olur."],
          optionReasons: [
            "Doğru: λ∝1/√U.",
            "Tersliği unutur.",
            "16 nın karekökünü 2 sanır.",
            "Karekökü atlar.",
            "Gerilim oranını doğrudan taşır.",
          ],
          commonError: "Gerilimi λ ile doğrudan ters orantılı sayma.",
          check: "Yeni λ nın karesi eski λ² nin 1/16 sı olmalı.",
        },
      },
      {
        prompt:
          "Elektronun kinetik enerjisi 400 keV, durgun enerjisi 511 keV. Dalga boyu için hangi yöntem uygundur?",
        options: [
          "p=mv her enerji için kesin yeterlidir",
          "Elektron kütlesiz kabul edilir",
          "De Broglie bağıntısı bu enerjide bütünüyle geçersiz olur",
          "Göreli momentum kullanılmalı; K dinlenim enerjisine göre küçük değildir",
          "λ=hc/K foton formülü elektrona aynen uygulanır",
        ],
        answer: 3,
        hint: "400/511 oranının küçük olup olmadığına bak.",
        explanation:
          "K/mec²≈0,78 dir; çok küçük değildir. Bu nedenlep≈√(2mK) tam sonuç gibi kullanılamaz. Göreli p bulunup λ=h/p uygulanmalıdır.",
        guidance: {
          knowledge: [
            "K≪mec² klasik yaklaşımın koşuludur; geneldepc=√(K(K+2mec²)).",
          ],
          strategy: "400/511 oranının küçük olup olmadığına bak.",
          steps: [
            "K/mec²≈0,78 dir; çok küçük değildir.",
            "Bu nedenlep≈√(2mK) tam sonuç gibi kullanılamaz.",
            "Göreli p bulunup λ=h/p uygulanmalıdır.",
          ],
          optionReasons: [
            "Klasik yaklaşım sınırını siler.",
            "Kütleli türü değiştirir.",
            "Momentumun doğru hesaplanmasıyla bağıntı kullanılabilir.",
            "Doğru: λ=h/p sürer, fakatp göreli hesaplanır.",
            "Fotonun E=pc bağıntısını kütleli elektrona taşır.",
          ],
          commonError:
            "Yüksek gerilimde düşük enerji formülünü otomatik sürdürme.",
          check: "K 2mec² düzeltmesinin ihmal edilemeyeceğini sayıyla göster.",
        },
      },
      {
        prompt:
          "Elektronlarla yapılan iki yarık deneyinde çok sayıda yerel tespit bir girişim dağılımı oluşturuyor. En uygun yorum hangisidir?",
        options: [
          "Elektronlar görünür ışık fotonuna dönüşmüştür",
          "Yerel tespitlerle kuantum dalga girişimi aynı betimde birlikte bulunabilir",
          "Tanecik tespiti varsa dalga özelliği imkânsızdır",
          "Girişim varsa enerji ve momentum korunmaz",
          "Her elektron klasik su dalgasıdır",
        ],
        answer: 1,
        hint: "Tek tespit ile birçok tespitin dağılımını ayır.",
        explanation:
          "Her tespit yerel bir kayıt olabilir. Çok sayıda kaydın dağılımı dalga girişimine uygun olabilir. Bu iki ölçüm özelliği elektronun kuantum betiminde birlikte açıklanır.",
        guidance: {
          knowledge: [
            "De Broglie dalgası kuantum durumunun girişim özelliğidir.",
          ],
          strategy: "Tek tespit ile birçok tespitin dağılımını ayır.",
          steps: [
            "Her tespit yerel bir kayıt olabilir.",
            "Çok sayıda kaydın dağılımı dalga girişimine uygun olabilir.",
            "Bu iki ölçüm özelliği elektronun kuantum betiminde birlikte açıklanır.",
          ],
          optionReasons: [
            "Parçacık türünü gerekçesiz değiştirir.",
            "Doğru: Madde dalgası ve yerel ölçüm birbirini dışlamaz.",
            "Gözlenen dağılımı mantıken yasaklar.",
            "Girişim korunum yasalarını kaldırmaz.",
            "Kuantum dalgayı mekanik su dalgasıyla özdeşleştirir.",
          ],
          commonError:
            "Dalga ve tanecik sözcüklerini iki ayrı klasik nesneye zorla dönüştürme.",
          check:
            "Bir tespit noktasıyla tüm deney dağılımının farklı veri olduğunu belirt.",
        },
      },
      {
        prompt:
          "Bir masa tenis topunun λ=h/p dalga boyu günlük deney ölçeğine göre çok küçük hesaplanıyor. Bundan hangi sonuç çıkar?",
        options: [
          "h top için sıfırdır",
          "Büyük cisimlerde λ bağıntısı birimce anlamsızdır",
          "Dalga etkilerinin gözlenmesi zorlaşabilir; madde dalgası yalnız elektronlarla sınırlı değildir",
          "Günlük hareket için özel bir ışık ortamı gerekir",
          "Topun momentumu yoktur",
        ],
        answer: 2,
        hint: "Bağıntının varlığıyla deneyde kolay gözlenmesini ayır.",
        explanation:
          "Günlük topunmomentumu elektron deneylerindekinden çok büyüktür. λ=h/p bu nedenle çok küçük çıkar. Bu küçük ölçek klasik yaklaşımın pratik başarısıyla uyumludur; kuantum bağıntısını yalnız elektrona kapatmaz.",
        guidance: {
          knowledge: ["h çok küçük olduğundan makroskobikp deλ çok küçüktür."],
          strategy: "Bağıntının varlığıyla deneyde kolay gözlenmesini ayır.",
          steps: [
            "Günlük topunmomentumu elektron deneylerindekinden çok büyüktür.",
            "λ=h/p bu nedenle çok küçük çıkar.",
            "Bu küçük ölçek klasik yaklaşımın pratik başarısıyla uyumludur; kuantum bağıntısını yalnız elektrona kapatmaz.",
          ],
          optionReasons: [
            "Planck sabitini nesneye göre değiştirir.",
            "h/p nin metre boyutunu reddeder.",
            "Doğru: Ölçek ve gözlenebilirlik ayrılır.",
            "Madde dalgasını mekanik taşıyıcı gereksinimiyle karıştırır.",
            "Hareketli topunp sini yok sayar.",
          ],
          commonError:
            "Ölçülemeyecek kadar küçük değeri kuramsal olarak tanımsız sayma.",
          check: "h/p birimini J·s/(kg·m/s)=m olarak denetle.",
        },
      },
      {
        prompt:
          "Elektron mikroskobunda daha kısa de Broglie dalga boyunun rolü hangi ifadeyle uygundur?",
        options: [
          "Dalga boyu kısalınca momentum azalır",
          "Küçük yapıları ayırt etme olanağına katkı verir; gerçek çözünürlük başka aygıt etkileriyle de sınırlanır",
          "Elektron mikroskobu zorunlu olarak X fotonuyla çalışır",
          "Dalga boyu kısa olunca her kusur kesin yok olur",
          "Elektronlar ses dalgasına dönüşür",
        ],
        answer: 1,
        hint: "Hızlandırılmış elektronunp veλ değişimini izle.",
        explanation:
          "Hızlandırma elektron momentumunu artırabilir. Artanp de Broglie dalga boyunu kısaltır. Kısa λ küçük yapı ölçeklerine erişimi destekler; gerçek cihazın bütün sınırlamaları bitmez.",
        guidance: {
          knowledge: [
            "Dalga boyu çözünürlüğün önemli bir ölçeğidir; mercek ve örnek etkileri de vardır.",
          ],
          strategy: "Hızlandırılmış elektronunp veλ değişimini izle.",
          steps: [
            "Hızlandırma elektron momentumunu artırabilir.",
            "Artanp de Broglie dalga boyunu kısaltır.",
            "Kısa λ küçük yapı ölçeklerine erişimi destekler; gerçek cihazın bütün sınırlamaları bitmez.",
          ],
          optionReasons: [
            "λ=h/p yönünü ters kurar.",
            "Doğru: Dalga ölçeği katkısı ile bütün aygıt performansı ayrılır.",
            "Kullanılan parçacığı değiştirir.",
            "Tek niceliği tüm çözünürlüğün kesin belirleyicisi sayar.",
            "Kuantum dalga türünü değiştirir.",
          ],
          commonError:
            "İdeal dalga boyu hesabını tam cihaz çözünürlüğü garantisi diye sunma.",
          check: "Hangi taneciğin demette kullanıldığını ayrıca söyle.",
        },
      },
    ],
    source:
      "MEB ve OGM kapsamı esas alınarak özgün hazırlanmış konu anlatımı, modeller ve öğretim soruları. Resmî sınav sorusu değildir.",
  },
  {
    id: "modern-fizik-teknoloji",
    topic: "detail-403",
    title: "Modern fiziğin teknolojideki uygulamaları",
    minutes: 130,
    objectives: [
      "Görüntüleme aygıtlarını dalga, enerji kaynağı ve ölçtüğü bilgiyle ayır.",
      "Yarı iletken katkılama, PN eklemi, LED ve fotovoltaik mekanizmalarını açıkla.",
      "Süper iletken, nano yapı ve lazerin temel ilkelerini modellerle ilişkilendir.",
    ],
    sections: [
      {
        title: "Önkoşul: teknolojiyi mekanizmayla oku",
        paragraphs: [
          "Bir cihazı anlamak için ne gönderdiğini, ne algıladığını ve hangi fiziksel farkı görüntüye çevirdiğini sor. Görüntü adının aynı olması röntgen, ultrason, MR vePET in aynı ışını kullandığı anlamına gelmez.",
          "İyonlaştırıcı sözcüğü enerji aktarımıyla atomdan elektron koparma olanağına ilişkindir. X ve gama elektromanyetik ışınım, ultrason ise mekanik sestir. İyonlaştırıcı olmayan bir aygıt için tüm koşullarda sıfır etki veya sıfır risk sonucu çıkarılmaz.",
        ],
      },
      {
        title: "Röntgende kaynak ve algılayıcı",
        paragraphs: [
          "X ışını tüpünde hızlandırılan elektronların hedefle etkileşimi frenleme ve karakteristik ışınım üretebilir. Işınlar incelenen bölgeden geçerken dokulara göre farklı miktarda zayıflar; algılayıcıya ulaşan dağılım projeksiyon görüntüsü oluşturur.",
          "Temel doku kontrastını bütün ışınların yalnız kırınıma uğraması diye açıklama. Soğurma ve saçılma kaynaklı zayıflama önemlidir; enerji, kalınlık ve bileşim etkilidir. Görüntüde yoğun görünen bölgeyle algılayıcının gösterim rengini de ayır.",
        ],
      },
      {
        title: "Beer-Lambert ile yol toplamı",
        paragraphs: [
          "İdeal tek enerjili saçılmasız ışında I=I₀exp(−μL) olur. μ zayıflama katsayısı, L yol uzunluğudur;μ cm⁻¹ veL cm seçilirse üs boyutsuzdur. Ardışık katmanlarda üstekiμL katkıları toplanır.",
          "Bu model gerçek tıbbi cihazın bütün tayfını, saçılmasını ve algoritmasını içermez; öğretim için birincil iletimi hesaplar. Kalınlığı artırmak aynı malzemede iletimi azaltır. μ değeri bu modelde seçilmiş foton enerjisine aittir; evrensel malzeme sabiti gibi genellenmez.",
        ],
      },
      {
        title: "Projeksiyon ile kesit farkı",
        paragraphs: [
          "Tek röntgen projeksiyonu bir yol boyunca biriken zayıflamayı gösterir; derinlikteki farklı yerleşimler aynı yol toplamını verebilir. Tek görüntüden bütün iç noktaların ayrı değerlerini kesin bulmak bu nedenle mümkün değildir.",
          "BT birçok açıdan projeksiyonlar alıp hesaplamayla kesit bilgisi üretir. Keşifte üçe üç haritanın yatay ve dikey iletimlerini karşılaştırıyoruz; iki açı bütün gerçek CT yi yeniden kurmaya yeterlidir demiyoruz. Yön değiştirmek verinin nasıl değiştiğini görmeyi sağlar.",
        ],
      },
      {
        title: "MR: alan, RF ve sinyal",
        paragraphs: [
          "MR güçlü manyetik alan, alan gradyanları ve radyo frekansı darbeleriyle özellikle hidrojen çekirdeklerinin sinyalini ölçer. Uyarılma sonrasındaki gevşeme ve çevre özellikleri doku kontrastına katkı verir.",
          "Bu olay yüzeyden aynasal radyo yansıması gibi tek basamakla açıklanmaz. MR iyonlaştırıcı X ışını kullanmaz; fakat radyo ışınımı kullanır. “Hiç radyasyon yok” ya da “bütün koşullarda hiçbir etkisi yok” ifadeleri doğru sınıflama değildir.",
        ],
      },
      {
        title: "PET: içerideki pozitron kaynağı",
        paragraphs: [
          "PET te uygun radyoizleyicinin yayımladığı pozitron doku elektronuyla yok oluşabilir. İdeal düşük toplam momentum durumunda yaklaşık zıt yönlü iki 511 keV gama fotonu algılanır; eşzamanlı kayıtlar olası olay doğrultusu verir.",
          "Cihaz dışarıdan dokuya yok oluş ışını göndermez; algıladığı fotonlar vücut içindeki süreçlerden gelir. İzleyici dağılımı işlev ve metabolizma bilgisine katkı verir. PET-BT birleşimi iki ölçüm yönteminin birbirini tamamlamasıdır, aynı mekanizma olması değildir.",
        ],
      },
      {
        title: "Ultrason: sesin yankısı",
        paragraphs: [
          "Ultrason insan işitme üst sınırından yüksek frekanslı mekanik sestir. Doku sınırlarında akustik özellik farkları yansıma oluşturabilir. Darbenin gidiş-dönüş süresi ve varsayılan ses hızı derinlik bilgisine dönüştürülür.",
          "d=vt/2 deki 2 sesin iki yol katetmesinden gelir. Ses hızı yanlış varsayılırsa mesafe çıkarımı değişir. Güç ve kullanım koşullarını yok sayarak her ultrason uygulaması her koşulda etkisizdir denmez.",
        ],
      },
      {
        title: "Radar ve sonar ayrımı",
        paragraphs: [
          "Radar elektromanyetik radyo veya mikrodalga gönderip dönüşünü algılar. Sonar ise sıvı gibi ortamda ses dalgasını kullanır. Her iki yankı yönteminde de uygun hız ve gidiş-dönüş süresiyle uzaklık hesaplanabilir.",
          "Sonara boşlukta c hızı atamak veya radarı havada ses hızına bağlamak yöntemleri karıştırır. Doppler kayması ayrıca hız bileşeni bilgisi verebilir; yalnız yankı süresi sabit bir anda uzaklığı verir, direkt tüm hız vektörünü değil.",
        ],
      },
      {
        title: "Termal kameranın verisi",
        paragraphs: [
          "Termal kamera belirli kızılötesi bantlardaki ışınımı ölçer. Yüzey sıcaklığı için yayma katsayısı ve çevre yansımaları önem taşır; ekran renkleri ölçümün seçilmiş gösterimidir.",
          "Cisimden gelen kızılötesi sinyali ölçmek onun içine X ışını göndermekle aynı işlem değildir. Bir yüzeyin termal fotoğrafını doğrudan iç organların kesin üç boyutlu sıcaklık haritası saymak ölçüm kapsamını aşar.",
        ],
      },
      {
        title: "LCD: ışığı denetleme",
        paragraphs: [
          "LCD de sıvı kristal düzeni elektrik alanıyla değiştirilir; polarizörlerle birlikte geçen ışık miktarı denetlenir. Yaygın ekranlarda arka aydınlatma ve renk filtreleri vardır; her alt pikselin katkısı görünür görüntüyü oluşturur.",
          "Görüntü renklerini yalnız kristalin sıcaklığını değiştirerek üreten genel bir mekanizma diye anlatma. İşaretin elektriksel kontrolüyle ışık geçirgenliği değiştirilir. LCD ile LED arkadan aydınlatmanın birlikte bulunması iki kelimenin çeliştiği anlamına gelmez.",
        ],
      },
      {
        title: "Plazma ve ışık yayan ekranlar",
        paragraphs: [
          "Plazma ekran hücresinde gaz deşarjı ultraviyole üretir; bu ışık fosfor tabakalarını uyararak görünür renk verir. İyonlaşmış gazın davranışı LCD deki sıvı kristal ışık kontrolünden farklıdır.",
          "OLED gibi ışık yayan katmanlar başka bir ekran mekanizmasıdır. Teknoloji adlarını yalnız ince ekran diye eşitleme. Ürün performans kıyası cihaz tasarımına bağlıdır; tek bir eski örneğin enerji veya hız sayısını tüm nesillere değişmez sınır sayma.",
        ],
      },
      {
        title: "Bant aralığıyla yarı iletken",
        paragraphs: [
          "Yarı iletkenin valans ve iletim bantları arasında enerji aralığı bulunur. Isı, ışık ve katkılama taşıyıcı sayısını değiştirerek iletkenliği etkileyebilir. Sıfır akım taşıyan kusursuz yalıtkan diye her koşulda sınıflanmaz.",
          "Silisyum ve germanyum dört değerlik elektronlu tanıdık örneklerdir; galyum arsenit gibi bileşik yarı iletkenler de vardır. Bütün yarı iletkenlerin tek element ve aynı kafes, aynı dört dış elektron resmiyle anlatılması doğru kapsam değildir.",
        ],
      },
      {
        title: "N tipi: çoğunluk elektron",
        paragraphs: [
          "Silisyuma beş değerlik elektronlu uygun verici katkı eklenince hareketli elektron yoğunluğu artabilir; N tipi denir. Çoğunluk taşıyıcısı elektrondur; delikler tamamen yok değildir.",
          "N harfi bütün parçanın net negatif yüklü olması demek değildir. İyonlaşmış katkı merkezleri ve hareketli taşıyıcılarla malzeme genel olarak elektrikçe nötr olabilir. Taşıyıcı türü ile parçanın toplam yükünü iki ayrı özellik olarak izle.",
        ],
      },
      {
        title: "P tipi: delik hareketi",
        paragraphs: [
          "Silisyuma üç değerlik elektronlu uygun alıcı katkı, elektron eksikliğiyle ilişkili delik taşıyıcılarını artırır. Delik, elektronların yer değiştirmesiyle etkin olarak pozitif taşıyıcı gibi davranır; çekirdekten yayılan pozitrondan farklıdır.",
          "P tipi malzeme yalnız pozitif yüklü atomlardan oluşmuş net pozitif blok değildir. Elektron-delik çiftleri ve katkı merkezleri bütünüyle yük dengesi korunabilir. Bir elektrik alanda elektron sürüklenmesi alanın tersine, delik sürüklenmesi alan yönündedir.",
        ],
      },
      {
        title: "PN eklemi ve diyot",
        paragraphs: [
          "P veN bölgeleri birleştirildiğinde taşıyıcı yayılması ve birleşmesi bir tükenim bölgesi ile iç alan oluşturur. İleri kutuplama potansiyel engelini azaltarak akımı kolaylaştırabilir; ters kutuplama olağan çalışma bölgesinde akımı büyük ölçüde sınırlar.",
          "İdeal diyot modeli bir yönde iletip ötekinde keser; gerçek aygıtta sızıntı ve kırılma vardır. İleri yöndeki P pozitif, N negatif bağlantıdır. Tek bir sabit 0,7 V değerini her malzemenin ve her akımın kesin yasası sayma.",
        ],
      },
      {
        title: "Transistörün kontrol görevi",
        paragraphs: [
          "Transistör küçük bir giriş işaretiyle daha büyük akımın akışını denetleyebilir; anahtarlama veya yükseltmede kullanılır. Bipolar transistörde NPN vePNP yapılar bulunur; alan etkili türlerde kontrol başka biçimde yapılır.",
          "Yükseltme enerji yaratma değildir; çıktının enerjisi beslemeden gelir, giriş denetim sağlar. Bütün transistörleri yalnız iki diyotun herhangi bir biçimde bağlanması saymak fiziksel kontrol yapısını açıklamaz; devre elemanının türü belirtilir.",
        ],
      },
      {
        title: "LED: enerjiden fotona",
        paragraphs: [
          "LED de uygun yarı iletkende elektron-delik yeniden birleşmesi foton yayabilir. Yaklaşık foton enerjisi bant aralığı ölçeğiyle ilişkilidir; farklı malzeme ve yapı farklı dalga boyları sağlar.",
          "Elektrik enerjisi ışığa ve ısıya dağılabilir; verim 1 olmak zorunda değildir. Bütün LED ler görünür veya hiçbir LED morötesi yaymaz denemez. Kızılötesi ve morötesi LED türleri vardır; gerçek renk tayfı tasarıma bağlıdır.",
        ],
      },
      {
        title: "Fotodiyot ve fotovoltaik",
        paragraphs: [
          "Yeterli enerjili soğurulan foton yarı iletkende elektron-delik çifti oluşturabilir. Eklemin alanı bu taşıyıcıları ayırıp devrede elektriksel sinyal veya güç üretimine katkı verir. Bu iç etki yüzeyden vakuma elektron çıkarma şartına bağlı değildir.",
          "Basit bant modeli Eγ≥Eg eşiğini kullanır; bu enerji koşulu her gelen fotonun kesin tek toplanan çift üretmesi demek değildir. Yansıma, kayıp ve taşıyıcı birleşmesi vardır; fazla enerji otomatik bütünüyle elektrik enerjisine çevrilmez.",
        ],
      },
      {
        title: "Bant modeliyle sayısal kontrol",
        paragraphs: [
          "Eγ=hc/λ ile Eg kıyaslanır. Uzun dalga boyunda foton enerjisi küçük kalırsa ideal tek foton bant geçişi oluşmaz. Kısa dalga boyu eşiği geçebilir; gelen güç aynıysa foton sayısı yine enerjiyle ters değişir.",
          "Keşif Eg ile λ yı değiştirip soğurma enerji koşulunu ve fazla enerjiyi hesaplar. Yanındaki eklem şeması taşıyıcı ayrılma yönünü gösterir; çıkan tüm enerjiyi klinik veya ticari panel verimi olarak raporlamaz. Verim için ayrı veri gerekir.",
        ],
      },
      {
        title: "Süper iletkenin iki özelliği",
        paragraphs: [
          "Uygun sıcaklık, alan ve akım koşullarında süper iletken doğru akıma karşı sıfır direnç gösterebilir. Meissner etkisi manyetik alanın uygun süper iletken durumda dışlanmasıyla ilişkilidir; yalnız çok iyi normal iletken olmak yeterli tanım değildir.",
          "Kritik sıcaklık Tc malzemeye bağlıdır; kritik alan ve akım da sınır koyar. TipII süper iletkenlerin karma durumunda manyetik akı tüpleri bulunabileceği için her koşulda bütün iç alan kesin sıfır cümlesi genellenmez. Soğutma da enerji ve sistem tasarımı gerektirir.",
        ],
      },
      {
        title: "Süper iletken uygulamaları",
        paragraphs: [
          "Güçlü mıknatıslar MR ve parçacık hızlandırıcılarda; hassas manyetik ölçümler ve bazı manyetik levitasyon sistemleri başka örneklerde kullanılır. Manyetik kuvvet temas kayıplarını azaltabilir fakat bütün enerji kayıplarını ortadan kaldırmaz.",
          "Her maglev treni zorunlu süper iletkendir denmez; farklı elektromıknatıs düzenleri vardır. Direnç kaybının azalması hava direnci, soğutma, güç elektroniği gibi tüm sistem tüketimlerinin de sıfırlandığı anlamına gelmez.",
        ],
      },
      {
        title: "Nano ölçek: yüzey ve hacim",
        paragraphs: [
          "1 nm 10⁻⁹ m dir. Nano yapılar küçük ölçeklerde yüzey/hacim oranı ve kuantum sınırlanması gibi nedenlerle büyük parçadan farklı özellik gösterebilir. Nanobilim inceler, nanoteknoloji bu bilgiyi aygıt ve malzeme tasarımında kullanır.",
          "Bir küpte yüzey/hacim=6/a dır; kenarı küçültmek oranı büyütür. Aynı toplam hacmi küçük parçalara bölmek toplam yüzeyi artırabilir; bu kataliz gibi uygulamalara katkı verir. Yalnız küçük sözcüğü her ürüne otomatik yeni üstünlük sağlamaz.",
        ],
      },
      {
        title: "Nano malzemelerin çeşitleri",
        paragraphs: [
          "Nanoparçacık, nanotel, nanotüp, ince film ve kuantum noktası farklı geometrilerdir. Telin çapı nano olup boyu daha uzun olabilir; her boyutunun 1 nm olması gerekmez. Karbonun bağlanma düzeni farklı mekanik ve elektriksel özellikler oluşturabilir.",
          "Kuantum noktalarında boyuta bağlı enerji düzeyleri ışık yayımını değiştirebilir. Kataliz, görüntüleme ve yüzey kaplama uygulamalarında malzeme, boyut ve ortam birlikte etkilidir. Araştırma aşamasındaki nanorobot fikrini bütün hastalıklarda hazır tedavi diye sunma.",
        ],
      },
      {
        title: "Lazerin enerji mekanizması",
        paragraphs: [
          "Uyarılmış bir sistem iki düzey farkına uygun fotonla etkileşince aynı modda yeni foton yayabilir; bu uyarılmış emisyondur. Gelen foton kaybolmak zorunda değildir; ek fotonun enerjisi sistemin iç enerjisinden gelir.",
          "Popülasyon terslenmesi, ilgili üst düzeyin alt düzeye göre daha çok dolu olduğu durumdur; yarı kararlı düzeyin uzun ömrü bunu oluşturmaya yardım edebilir ama iki kavram aynı tanım değildir. Pompalama dışarıdan enerji sağlayarak düzeni sürdürür.",
        ],
      },
      {
        title: "Lazer düzeni ve uygulama sınırı",
        paragraphs: [
          "Kazanç ortamı, pompalama ve uygun geri besleme lazerin temel düzenini oluşturur. Rezonatör ışığı seçilmiş modlarda güçlendirir; çıktı aynasından bir bölümü çıkar. Yüksek yönlülük, koherans ve dar tayf uygun uygulamalarda önemlidir.",
          "Her lazer görünür değildir ve demet kusursuz sıfır açılı yayılmaz; kırınım ve gerçek düzen sınırlayıcıdır. Fiber haberleşme, mesafe ölçümü, kesme ve tıbbi uygulamalar farklı güç ve dalga boyları kullanır. Lazerin güçlenmesi tek foton frekansının her aynada artması değil uygun foton sayısının artmasıdır.",
        ],
      },
    ],
    examples: [
      {
        title: "İki katmanda iletim",
        prompt:
          "Tek enerjili bir ışın I₀=1000 birim. Birinci katmandaμL 0,3, ikincide 0,7. Saçılma ihmal, e⁻¹≈0,368. Son iletim nedir?",
        strategy: "Katmanların optik derinliklerini topla.",
        steps: [
          {
            label: "Adım 1",
            explanation: "İlk katman sonrasında I 1=1000e⁻⁰·³ tür.",
          },
          {
            label: "Adım 2",
            explanation: "İkinciyle toplam üs−(0,3+0,7)=−1 olur.",
          },
          {
            label: "Adım 3",
            explanation:
              "SonI 1000×0,368≈368 birimdir; katmanları ters çevirmek bu ideal modelde toplamı değiştirmez.",
          },
        ],
        answer: "Yaklaşık 368 birim.",
        check: "İletim I/I₀0,368 ve 0..1 arasında olmalı.",
        pitfall: "Yüzdeleri doğrusal çıkarıp 1000 den 1000 eksiltme.",
      },
      {
        title: "Tek projeksiyonun belirsizliği",
        prompt:
          "İki hücreli satırdaμ değerleri(0,2;0,8) veya(0,5;0,5) cm⁻¹. Her hücre 1 cm. Tek yatay ışın bu iki düzeni ayırır mı?",
        strategy: "Yol toplamlarını karşılaştır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Birinci düzenin optik derinliği 0,2+0,8=1 dir.",
          },
          {
            label: "Adım 2",
            explanation: "İkinci düzeninki 0,5+0,5=1 dir.",
          },
          {
            label: "Adım 3",
            explanation:
              "İki iletim deI₀e⁻¹ olur; tek yol toplamı konum dağılımını ayıramaz, farklı yön veya ek veri gerekir.",
          },
        ],
        answer: "Bu tek projeksiyonda ayıramaz.",
        check: "Farklı hücrelerin aynı toplamı verdiğini açık göster.",
        pitfall: "Bir projeksiyonu bütün iç dağılımın kesin haritası sanma.",
      },
      {
        title: "Ultrasonun derinliği",
        prompt:
          "Doku için ses hızı 1540 m/s, darbe dönüş süresi 80 μs. Düz yol ve tek yansıma varsayımıyla derinlik nedir?",
        strategy: "Gidiş-dönüş süresini ikiye böl.",
        steps: [
          {
            label: "Adım 1",
            explanation: "80 μs 80×10⁻⁶ s dir.",
          },
          {
            label: "Adım 2",
            explanation: "Toplam yolvt 1540×80×10⁻⁶=0,1232 m dir.",
          },
          {
            label: "Adım 3",
            explanation: "Derinlik toplamın yarısı 0,0616 m=6,16 cm olur.",
          },
        ],
        answer: "6,16 cm.",
        check: "Gidiş süresi 40 μs ile 1540 çarpımı aynı derinliği vermeli.",
        pitfall: "Yankı süresini tek yönlü süre sayma.",
      },
      {
        title: "Bant eşiği",
        prompt:
          "Eg 1,55 eV olan ideal yarı iletkene 620 nm ve 1000 nm ışık gönderiliyor; hc 1240 eV·nm. Hangisi enerji koşulunu sağlar?",
        strategy: "Foton enerjilerini Eg ile ayrı kıyasla.",
        steps: [
          {
            label: "Adım 1",
            explanation: "620 nm için E 2 eV dur;1,55 eV eşiği geçilir.",
          },
          {
            label: "Adım 2",
            explanation:
              "1000 nm için E 1,24 eV dur; tek foton bant geçişi için yetersizdir.",
          },
          {
            label: "Adım 3",
            explanation:
              "İlk fotonun Eg üstü 0,45 eV fazlası vardır; bu fazlanın tümünü elektrik verimi sayamayız.",
          },
        ],
        answer: "Yalnız 620 nm enerji eşiğini sağlar.",
        check: "Eşik λ1240/1,55=800 nm; iki ışık bu sınırın farklı yanındadır.",
        pitfall:
          "Dış fotoelektrik W ile iç bant aralığını aynı mikroskobik mekanizma sanma.",
      },
      {
        title: "Aynı hacim, daha çok yüzey",
        prompt:
          "Kenar 4 cm küp malzeme kenarı 1 cm olan eş küplere ayrılıyor. Boşluk ve kesim kaybı yok. Toplam yüzey kaç kat olur?",
        strategy: "Önce adet ve her parçanın yüzeyini hesapla.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Başlangıç hacim 4³64 cm³; her küçük küp 1 cm³ olduğundan 64 parça vardır.",
          },
          {
            label: "Adım 2",
            explanation: "İlk yüzey 6×4²96 cm²; son toplam 64×6×1²384 cm² dir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Oran 384/96=4 tür; aynı hacimde daha küçük parça daha çok dış yüzey sunar.",
          },
        ],
        answer: "4 kat.",
        check: "Hacim 64 cm³ olarak korunmalı.",
        pitfall: "Yüzeyi hacim gibi kenarın küpüyle ölçekleme.",
      },
      {
        title: "Lazerde enerji kaynağı",
        prompt:
          "Üst-alt düzey farkı 1,8 eV olan uyarılmış sisteme aynı enerjili foton geliyor ve uyarılmış emisyon oluyor. İdeal son foton sayısı ve enerji bütçesi nedir?",
        strategy: "Gelen fotonla sistemin iç enerjisini birlikte say.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Başlangıçta 1,8 eV foton ve sistemde alt düzeye göre 1,8 eV fazla enerji vardır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Sistem alt düzeye inerken aynı modda 1,8 eV ek foton yayar.",
          },
          {
            label: "Adım 3",
            explanation:
              "Son iki fotonun toplam 3,6 eV enerjisi başlangıç bütçesine eşittir; enerji yoktan artmaz.",
          },
        ],
        answer: "İki 1,8 eV foton; ek enerji sistemin uyarılmasından.",
        check: "Sistemi tekrar uyarmak için dış pompalama gerekir.",
        pitfall:
          "Gelen tek fotonun kendi enerjisini sebepsiz ikiye bölüp iki aynı enerjili foton yaptığını sanma.",
      },
    ],
    recall: [
      {
        prompt: "MR hangi dalgayı kullanır?",
        answer:
          "Güçlü alan ve gradyanlarla birlikte radyo frekansı; iyonlaştırıcı X ışını kullanmaz.",
      },
      {
        prompt: "PET fotonları nereden gelir?",
        answer:
          "İç radyoizleyicinin pozitronunun elektronla yok oluşundan; ideal iki 511 keV foton.",
      },
      {
        prompt: "N tipi net negatif blok mudur?",
        answer:
          "Hayır; çoğunluk taşıyıcısı elektrondur, genel yük dengesi korunabilir.",
      },
      {
        prompt: "LED ile fotovoltaik dönüşüm yönleri?",
        answer:
          "LED elektriksel enerjiden ışık; fotovoltaik soğurulan ışıkla ayrılan taşıyıcılardan elektrik.",
      },
      {
        prompt: "Süper iletkenin iki ayırt edici özelliği?",
        answer:
          "Uygun koşulda sıfır doğru akım direnci ve Meissner davranışı; kritik alan/akım sınırları vardır.",
      },
      {
        prompt: "Lazerde ek foton enerjisi nereden?",
        answer: "Uyarılmış sistemin iç enerjisinden; pompaya ihtiyaç sürer.",
      },
    ],
    items: [
      {
        prompt: "Röntgen, MR, ultrason vePET için hangi eşleştirme doğrudur?",
        options: [
          "MR yalnız görünen ışık fotoğrafıdır",
          "PET vücuda dışarıdan pozitron yok oluş ışını gönderir",
          "Röntgen: X ışını; MR: RF+manyetik alan; ultrason: ses; PET: iç kaynaklı gama",
          "Röntgen: ses; MR: X; ultrason: gama; PET: RF",
          "Hepsi dışarıdan aynı X ışınını gönderir",
        ],
        answer: 2,
        hint: "Her aygıta bir dalga ve kaynak yeri ata.",
        explanation:
          "Röntgen X fotonlarının zayıflamasını ölçer. MR manyetik alanla RF, ultrason mekanik ses kullanır. PET içte oluşan gama fotonlarını algılar.",
        guidance: {
          knowledge: [
            "Görüntüleme yöntemleri gönderdikleri ve algıladıkları fiziksel sinyalle ayrılır.",
          ],
          strategy: "Her aygıta bir dalga ve kaynak yeri ata.",
          steps: [
            "Röntgen X fotonlarının zayıflamasını ölçer.",
            "MR manyetik alanla RF, ultrason mekanik ses kullanır.",
            "PET içte oluşan gama fotonlarını algılar.",
          ],
          optionReasons: [
            "MR çekirdek sinyalini görünür fotoğrafa indirger.",
            "İç kaynaklı foton algısını dış ışınlamayla karıştırır.",
            "Doğru: Dört aygıtın kaynak ve dalgası doğru ayrılır.",
            "Mekanizmaları karıştırır.",
            "Farklı fiziksel yöntemleri tekleştirir.",
          ],
          commonError:
            "Görüntü üretiyor diye tüm cihazları aynı ışına bağlama.",
          check: "İyonlaştırıcı X/gama ile RF/sesi ayrı gruplandır.",
        },
      },
      {
        prompt:
          "Saçılmasız tek enerjili ışında I=I₀e^(−μL). μL=ln 2 olduğunda iletim I/I₀ nedir?",
        options: ["1", "0", "2", "1/2", "ln 2"],
        answer: 3,
        hint: "e ve doğal logaritmanın tersliğini kullan.",
        explanation:
          "μL=ln 2 üsse konur. I/I₀=e⁻ˡⁿ²=1/eˡⁿ² dir. eˡⁿ²2 olduğundan sonuç 1/2 dir.",
        guidance: {
          knowledge: ["Boyutsuz optik derinlik üstel iletim verir."],
          strategy: "e ve doğal logaritmanın tersliğini kullan.",
          steps: [
            "μL=ln 2 üsse konur.",
            "I/I₀=e⁻ˡⁿ²=1/eˡⁿ² dir.",
            "eˡⁿ²2 olduğundan sonuç 1/2 dir.",
          ],
          optionReasons: [
            "Zayıflamayı yok sayar.",
            "Sonlu derinliği tam soğurma sayar.",
            "Üs işaretini ters verir.",
            "Doğru: e⁻ˡⁿ²=1/2.",
            "Üs girdisini son oran sayar.",
          ],
          commonError: "Zayıflama miktarını doğrusalμL kadar çıkarma.",
          check: "Aynı katman iki kez olursa iletim 1/4 olmalı.",
        },
      },
      {
        prompt:
          "İki ardışık katmanın optik derinlikleri 0,4 ve 0,6. İdeal tek enerjili ışında I₀100, e⁻¹≈0,368. Çıkan I yaklaşık kaçtır?",
        options: ["100", "60", "0", "40", "36,8"],
        answer: 4,
        hint: "İkiμL yi üs içinde topla.",
        explanation:
          "Toplam 0,4+0,6=1 dir. I 100e⁻¹ olur. 100×0,368=36,8 bulunur.",
        guidance: {
          knowledge: [
            "Ardışık iletimler çarpılır; optik derinlikler toplanır.",
          ],
          strategy: "İkiμL yi üs içinde topla.",
          steps: [
            "Toplam 0,4+0,6=1 dir.",
            "I 100e⁻¹ olur.",
            "100×0,368=36,8 bulunur.",
          ],
          optionReasons: [
            "Katman etkisini siler.",
            "Yalnız ikinci katsayıyı doğrusal çıkarır.",
            "Toplam derinlik 1 i%100 kayıp sayar.",
            "Yalnız ilk katsayıyı yanlış kullanır.",
            "Doğru: Derinlik toplamı 1 dir.",
          ],
          commonError: "Üstel katsayıyı yüzde kayıp gibi doğrudan toplama.",
          check: "Sonucun 0 ile 100 arasında olduğunu denetle.",
        },
      },
      {
        prompt:
          "Bir satırdakiμL değerleri(0,1;0,9), diğer olası düzende(0,4;0,6). Tek yatay projeksiyon için ne söylenir?",
        options: [
          "Tek projeksiyon her hücreyi ayrı kesin verir",
          "İkinci kesin sıfır geçirir",
          "İlk kesin iki kat geçirir",
          "Katman sırası bu ideal modelde toplamı mutlaka değiştirir",
          "İki düzende aynı iletim olabilir; tek toplam iç dağılımı ayırmaz",
        ],
        answer: 4,
        hint: "Önce iki satır toplamını karşılaştır.",
        explanation:
          "0,1+0,9=1 dir. 0,4+0,6=1 dir. I₀e⁻¹ iki yerleşime de uyduğundan bu ölçüm tek başına dağılımı seçmez.",
        guidance: {
          knowledge: ["Birincil iletim toplam optik derinliğe bağlıdır."],
          strategy: "Önce iki satır toplamını karşılaştır.",
          steps: [
            "0,1+0,9=1 dir.",
            "0,4+0,6=1 dir.",
            "I₀e⁻¹ iki yerleşime de uyduğundan bu ölçüm tek başına dağılımı seçmez.",
          ],
          optionReasons: [
            "Ters problemde bilgi eksikliğini yok sayar.",
            "Sonlu derinlik tam 0 değildir.",
            "Toplam eşitliğini göz ardı eder.",
            "Saçılmasız tek enerji varsayımında üstel çarpım sırası değişmez.",
            "Doğru: İki toplam da 1 dir.",
          ],
          commonError:
            "Görüntüdeki tek pikseli bütün derinlik hücreleri için ayrı ölçüm sanma.",
          check:
            "Farklı yönden ek projeksiyonun yeni bilgi getirebileceğini açıkla.",
        },
      },
      {
        prompt: "BT ile tek röntgen projeksiyonunun temel farkı hangisidir?",
        options: [
          "BT hiç iyonlaştırıcı ışın kullanmaz",
          "BT ses kullanır, röntgen RF kullanır",
          "BT bütün görüntüyü yalnız tek elektron yörüngesiyle oluşturur",
          "BT farklı açılardaki X projeksiyonlarından hesaplamayla kesit bilgisi üretir",
          "Tek röntgen her derinliği ayrı ve tam verir",
        ],
        answer: 3,
        hint: "Kaynak türüyle veri geometrisini ayrı incele.",
        explanation:
          "İki yöntem deX ışını kullanabilir. Tek projeksiyon birikimli yol bilgisi taşır. BT çok yönlü verileri işleyerek kesit çıkarır; fark dalga türü değil ölçüm düzenidir.",
        guidance: {
          knowledge: [
            "BT birden çok açının zayıflama bilgilerini birleştirir.",
          ],
          strategy: "Kaynak türüyle veri geometrisini ayrı incele.",
          steps: [
            "İki yöntem deX ışını kullanabilir.",
            "Tek projeksiyon birikimli yol bilgisi taşır.",
            "BT çok yönlü verileri işleyerek kesit çıkarır; fark dalga türü değil ölçüm düzenidir.",
          ],
          optionReasons: [
            "BT nin X kullanımını inkâr eder.",
            "Dalga türlerini karıştırır.",
            "Mekanizmayı anlamsız tek olaya indirger.",
            "Doğru: Veri toplama ve hesaplama farkı doğru belirtilir.",
            "Yol toplamını tam iç harita sayar.",
          ],
          commonError:
            "Tomografi kelimesini her koşulda radyasyonsuz yöntem sanma.",
          check: "İyonlaştırıcı sınıfı her ikisi için korunmalı.",
        },
      },
      {
        prompt: "MR için hangi ifade fiziksel olarak uygundur?",
        options: [
          "RF darbeleri ve güçlü manyetik alanla çekirdek sinyali ölçülür; X ışını kullanılmaz",
          "Temel mekanizma yalnız radyo dalgasının ayna gibi yüzeyden sekmesidir",
          "Hidrojen çekirdeği her zaman görünür ışıkla fotoğraflanır",
          "MR nin tüm koşullarda hiçbir etkisi olamaz",
          "Hiç elektromanyetik ışınım bulunmaz",
        ],
        answer: 0,
        hint: "Işınım yok ile iyonlaştırıcı X yok ayrımını kur.",
        explanation:
          "RF elektromanyetik dalgadır. Manyetik alan içindeki çekirdeklerin uyarılma ve gevşeme sinyalleri ölçülür. Bu yüzden X kullanılmaz demek doğru, hiç ışınım yok demek yanlıştır.",
        guidance: {
          knowledge: [
            "MR iyonlaştırıcı X kullanmaz, fakat RF enerjisi ve manyetik alan kullanır.",
          ],
          strategy: "Işınım yok ile iyonlaştırıcı X yok ayrımını kur.",
          steps: [
            "RF elektromanyetik dalgadır.",
            "Manyetik alan içindeki çekirdeklerin uyarılma ve gevşeme sinyalleri ölçülür.",
            "Bu yüzden X kullanılmaz demek doğru, hiç ışınım yok demek yanlıştır.",
          ],
          optionReasons: [
            "Doğru: Kullanılan alan veRF doğru belirtilir.",
            "Rezonans ve gevşeme sinyalini atlar.",
            "Çekirdek sinyalini görünür fotoğraf sanır.",
            "İyonlaştırıcı olmayışı mutlak etkisizliğe genişletir.",
            "RF nin elektromanyetik olduğunu siler.",
          ],
          commonError: "İyonlaştırıcı olmayanı ışınımsız diye adlandırma.",
          check: "RF yi elektromanyetik tayfta doğru yere koy.",
        },
      },
      {
        prompt:
          "PET te ideal düşük momentumlu e⁻e⁺ yok oluşundan hangi sinyal beklenir?",
        options: [
          "Elektron-delik ekleminde görünür LCD ışığı",
          "Yalnız manyetik alan çizgisi",
          "Yaklaşık zıt yönlü iki 511 keV gama fotonu",
          "Dışarıdan gönderilen tek 1022 keV foton",
          "Aynı yönlü iki 511 keV ses darbesi",
        ],
        answer: 2,
        hint: "Kaynak yerini ve momentum toplamını belirle.",
        explanation:
          "Pozitron radyoizleyiciden vücut içinde oluşur. Elektronla yok oluşunda iki foton yaklaşık 511 er keV taşıyabilir. Zıt yönler düşük toplam momentumu dengeler; algılayıcı eşzamanlı fotonları kaydeder.",
        guidance: {
          knowledge: [
            "Durgun çiftin 1,022 MeV enerjisi zıt yönlü fotonlara dağılabilir.",
          ],
          strategy: "Kaynak yerini ve momentum toplamını belirle.",
          steps: [
            "Pozitron radyoizleyiciden vücut içinde oluşur.",
            "Elektronla yok oluşunda iki foton yaklaşık 511 er keV taşıyabilir.",
            "Zıt yönler düşük toplam momentumu dengeler; algılayıcı eşzamanlı fotonları kaydeder.",
          ],
          optionReasons: [
            "PET i ekran mekanizmasına taşır.",
            "Algılanan foton sinyalini alanla karıştırır.",
            "Doğru: Enerji ve momentumla uygun gama çiftidir.",
            "İç süreç ve iki fotonu yok sayar.",
            "Ses türü ve yönler yanlıştır.",
          ],
          commonError:
            "PET i dışarıdan dokuya yok oluş ışını göndermek diye açıklama.",
          check: "511+511=1022 keV ve vektör toplamı yaklaşık 0 olmalı.",
        },
      },
      {
        prompt:
          "Ultrasonda ses hızı 1500 m/s, yankı dönüş süresi 40 μs. Düz yol ve tek yansıma için derinlik kaç cm dir?",
        options: ["0,3", "3", "1,5", "6", "30"],
        answer: 1,
        hint: "Süreyi saniyeye çevirip toplam yolu ikiye böl.",
        explanation:
          "40 μs 4×10⁻⁵ s dir. Toplam yol 1500×4×10⁻⁵=0,06 m olur. Derinlik 0,03 m=3 cm dir.",
        guidance: {
          knowledge: ["d=vt/2, yankı zamanı iki yolu kapsar."],
          strategy: "Süreyi saniyeye çevirip toplam yolu ikiye böl.",
          steps: [
            "40 μs 4×10⁻⁵ s dir.",
            "Toplam yol 1500×4×10⁻⁵=0,06 m olur.",
            "Derinlik 0,03 m=3 cm dir.",
          ],
          optionReasons: [
            "cm dönüşümünde 10 kat hata yapar.",
            "Doğru: 1500×40×10⁻⁶/2=0,03 m.",
            "Zamanı yanlış yarılar.",
            "Gidiş-dönüşü tek yol sayar.",
            "μs dönüşümünde 10 kat hata yapar.",
          ],
          commonError: "Yankı süresindeki 2 faktörünü unutma.",
          check: "Tek yön süre 20 μs ile aynı 3 cm yi bul.",
        },
      },
      {
        prompt: "Radar ile sonar için hangisi doğrudur?",
        options: [
          "Radar elektromanyetik, sonar mekanik ses kullanır; uygun yayılma hızları farklıdır",
          "İkisi de boşlukta ses kullanır",
          "Sonar her ortamda c ile yayılır",
          "İkisi de yalnız gama bozunması algılar",
          "Radar için havada ses hızı zorunludur",
        ],
        answer: 0,
        hint: "Önce dalga türünü seç, sonra hızını kullan.",
        explanation:
          "Radarın radyo/mikrodalga sinyali elektromanyetiktir. Sonar sesle çalıştığı için ortam gerektirir. Aynı dönüş süresi iki yöntemde farklı uzaklık verebilir.",
        guidance: {
          knowledge: [
            "Yankı uzaklığı kullanılan dalganın ortam hızına bağlıdır.",
          ],
          strategy: "Önce dalga türünü seç, sonra hızını kullan.",
          steps: [
            "Radarın radyo/mikrodalga sinyali elektromanyetiktir.",
            "Sonar sesle çalıştığı için ortam gerektirir.",
            "Aynı dönüş süresi iki yöntemde farklı uzaklık verebilir.",
          ],
          optionReasons: [
            "Doğru: Dalga türü ve hız seçimi doğru ayrılır.",
            "Sesin boşlukta yayılmadığını yok sayar.",
            "Mekanik sese ışık hızı verir.",
            "Yankı mekanizmasını radyoaktiviteye indirger.",
            "Elektromanyetik hızı sesle değiştirir.",
          ],
          commonError: "Her yankı olayına aynıc hızını yerleştirme.",
          check:
            "Suyun ses hızını sonar için, uygun EM hızını radar için belirt.",
        },
      },
      {
        prompt:
          "Termal kameranın sarı pikseliyle ilgili doğru yorum hangisidir?",
        options: [
          "Yüzeyin yayma katsayısı çıkarımda hiçbir rol oynamaz",
          "Piksel cismin bütün iç yapısını kesin verir",
          "Cisim kesin yalnız sarı dalga boyu yayar",
          "Termal kamera zorunlu X ışını yollar",
          "Algılanan kızılötesi verinin seçilmiş renk ölçeği olabilir",
        ],
        answer: 4,
        hint: "Gösterim rengini ölçülen dalga boyundan ayır.",
        explanation:
          "Cisimden gelen belirli IR bant sinyali algılanır. Yazılım yoğunluk veya sıcaklık çıkarımını sarıya eşleyebilir. Farklı palet aynı ölçümü başka renkte gösterebilir.",
        guidance: {
          knowledge: [
            "Termal kamera kızılötesi bant algılar ve veriyi renkle eşleyebilir.",
          ],
          strategy: "Gösterim rengini ölçülen dalga boyundan ayır.",
          steps: [
            "Cisimden gelen belirli IR bant sinyali algılanır.",
            "Yazılım yoğunluk veya sıcaklık çıkarımını sarıya eşleyebilir.",
            "Farklı palet aynı ölçümü başka renkte gösterebilir.",
          ],
          optionReasons: [
            "Yüzeyin ışıma özelliğini siler.",
            "Yüzey ölçümünü tüm iç hacme genişletir.",
            "Sahte rengi gerçek tayf sanır.",
            "Algılanan termal sinyali X görüntülemeyle karıştırır.",
            "Doğru: Ölçüm bandıyla ekran gösterimi ayrılır.",
          ],
          commonError:
            "Ekran rengini cismin görünür yayımının doğrudan kanıtı sayma.",
          check: "Aynı verinin siyah-beyaz gösterilebileceğini düşün.",
        },
      },
      {
        prompt: "LCD nin temel görüntü kontrolü hangisidir?",
        options: [
          "LCD ile LED arka aydınlatma birlikte bulunamaz",
          "Gama bozunmaları doğrudan ekran görüntüsüdür",
          "Sıvı kristaller her ekranda tek başına güçlü ışık kaynağıdır",
          "Elektrik alanla sıvı kristal düzeni ve polarizörlerden geçen ışık miktarı değiştirilir",
          "Her piksel yalnız sıcaklığı değiştirilerek renklendirilir",
        ],
        answer: 3,
        hint: "Işığı üretme ile geçirme işlevini ayır.",
        explanation:
          "Elektriksel işaret kristal düzenini etkiler. Polarizörlerle birlikte geçen ışık miktarı değişir. Arka aydınlatma LED olabilir; buLCD adını geçersiz kılmaz.",
        guidance: {
          knowledge: [
            "LCD genellikle ışığı modüle eder; arkadan aydınlatma ayrı bileşendir.",
          ],
          strategy: "Işığı üretme ile geçirme işlevini ayır.",
          steps: [
            "Elektriksel işaret kristal düzenini etkiler.",
            "Polarizörlerle birlikte geçen ışık miktarı değişir.",
            "Arka aydınlatma LED olabilir; buLCD adını geçersiz kılmaz.",
          ],
          optionReasons: [
            "Panel ve aydınlatma bileşenlerini çelişik sayar.",
            "Ekranı nükleer olay sanır.",
            "Arka aydınlatma ve geçirgenlik görevlerini ayırmaz.",
            "Doğru: Geçirgenlik kontrolü doğru anlatılır.",
            "Yaygın elektriksel kontrolü ısıl mekanizmayla değiştirir.",
          ],
          commonError:
            "Aygıtın bir katmanını bütün ışık üretim mekanizması sayma.",
          check: "Işık kaynağı ve kontrol katmanını iki ayrı kutu olarak çiz.",
        },
      },
      {
        prompt: "Plazma ekran hücresindeki süreç için uygun sıra hangisidir?",
        options: [
          "Ses → manyetik alan → nötron → görünür ışık",
          "Gaz deşarjı → ultraviyole → fosfor uyarılması → görünür ışık",
          "Kozmik genişleme → renkli piksel",
          "X ışını → sıvı kristal ısınması → yalnız radyo",
          "Elektron yok oluşu → kütlesiz delik",
        ],
        answer: 1,
        hint: "Önce uyarılan ortamı, sonra görünür ışığı veren katmanı bul.",
        explanation:
          "Elektriksel deşarj gazı uyarıp iyonlaştırabilir. Gazdan çıkan UV fosfor katmanına ulaşır. Fosfor görünür renk verir; buLCD geçirgenlik kontrolünden farklıdır.",
        guidance: {
          knowledge: ["Plazma gazındaki deşarjın UV si fosforu uyarır."],
          strategy:
            "Önce uyarılan ortamı, sonra görünür ışığı veren katmanı bul.",
          steps: [
            "Elektriksel deşarj gazı uyarıp iyonlaştırabilir.",
            "Gazdan çıkan UV fosfor katmanına ulaşır.",
            "Fosfor görünür renk verir; buLCD geçirgenlik kontrolünden farklıdır.",
          ],
          optionReasons: [
            "İlgisiz parçaları mekanizma diye dizer.",
            "Doğru: Gaz ve fosfor mekanizması doğru bağlanır.",
            "Yerel aygıtı kozmolojik sürece bağlar.",
            "Plazma ile LCD yi karıştırır.",
            "Delik ve yok oluş kavramlarını karıştırır.",
          ],
          commonError:
            "RGB hücre var diye bütün ekranların aynı mekanizmada olduğunu sanma.",
          check: "Hangi aşamada görünür foton üretildiğini belirt.",
        },
      },
      {
        prompt:
          "Silisyuma uygun beş değerlik elektronlu donör katkı ekleniyor. Hangisi doğrudur?",
        options: [
          "N tipi oluşabilir; çoğunluk taşıyıcısı elektrondur, parça net negatif olmak zorunda değildir",
          "Nötron sayısı artarak iletkenlik doğar",
          "Bütün elektronlar pozitrona dönüşür",
          "P tipi oluşur, çoğunluk deliktir",
          "Bütün parça zorunlu−e yüklü tek iyon olur",
        ],
        answer: 0,
        hint: "Katkının verdiği taşıyıcıyı genel yük dengesinden ayır.",
        explanation:
          "Beş değerlik elektronlu katkı Si bağ düzenine göre verici davranabilir. Artan hareketli elektronlar N tipi çoğunluk taşıyıcılarını oluşturur. Katkı iyonlarıyla taşıyıcılar birlikte sayıldığında malzeme net nötr olabilir.",
        guidance: {
          knowledge: ["Donör katkı elektron taşıyıcı yoğunluğunu artırabilir."],
          strategy: "Katkının verdiği taşıyıcıyı genel yük dengesinden ayır.",
          steps: [
            "Beş değerlik elektronlu katkı Si bağ düzenine göre verici davranabilir.",
            "Artan hareketli elektronlar N tipi çoğunluk taşıyıcılarını oluşturur.",
            "Katkı iyonlarıyla taşıyıcılar birlikte sayıldığında malzeme net nötr olabilir.",
          ],
          optionReasons: [
            "Doğru: Katkılama ile net yük ayrılır.",
            "Kimyasal katkıyı çekirdek dönüşümü yapar.",
            "Elektron-delik fiziğini antimaddeye çevirir.",
            "Donör veakseptörü yer değiştirir.",
            "Taşıyıcı türünü toplam yükle özdeşleştirir.",
          ],
          commonError: "N harfini bütün örneğin net negatif yükü diye okuma.",
          check: "Çoğunluk türüyle toplam yükü iki sütuna yaz.",
        },
      },
      {
        prompt: "P tipi yarı iletkendeki “delik” için hangisi doğrudur?",
        options: [
          "Manyetik alanın boş uzaydaki deliğidir",
          "Çekirdekten çıkan gerçek pozitrondur",
          "Elektron eksikliğiyle ilişkili etkin pozitif taşıyıcıdır; pozitron değildir",
          "Her zaman serbest protondur",
          "Yalnız atomun toplam kütle numarasıdır",
        ],
        answer: 2,
        hint: "Katı içi taşıyıcıyı temel parçacık türünden ayır.",
        explanation:
          "Bir elektronun boş konuma geçişi boşluğun ters yöne kayması gibi görünür. Bu eksiklik pozitif yük taşıyıcısı gibi betimlenebilir. Gerçek pozitron üretimi veya çekirdek bozunması gerekmez.",
        guidance: {
          knowledge: [
            "Delik elektronların bağ/bant düzenindeki eksiklik ve hareketle tanımlanır.",
          ],
          strategy: "Katı içi taşıyıcıyı temel parçacık türünden ayır.",
          steps: [
            "Bir elektronun boş konuma geçişi boşluğun ters yöne kayması gibi görünür.",
            "Bu eksiklik pozitif yük taşıyıcısı gibi betimlenebilir.",
            "Gerçek pozitron üretimi veya çekirdek bozunması gerekmez.",
          ],
          optionReasons: [
            "Fiziksel taşıyıcı modelini alan boşluğu sanır.",
            "Antimaddeyle karıştırır.",
            "Doğru: Katıdaki etkin taşıyıcı doğru ayrılır.",
            "Proton hareketini varsayar.",
            "Yük taşımayı A sayımıyla karıştırır.",
          ],
          commonError: "Delik sembolünü e⁺ antiparçacığıyla özdeşleştirme.",
          check:
            "Elektron hareketiyle deliğin hareketinin zıt olabildiğini çiz.",
        },
      },
      {
        prompt:
          "Yarı iletkende bir elektrik alan+x yönünde. Sürüklenmede elektron ve deliklerin yönleri hangisidir?",
        options: [
          "İkisi−x",
          "İkisi alan yokmuş gibi kesin durur",
          "İkisi+x",
          "Elektron−x, delik+x",
          "Elektron+x, delik−x",
        ],
        answer: 3,
        hint: "Her taşıyıcının işaretini alan okuna uygula.",
        explanation:
          "Elektrona etki eden kuvvet−eE olduğundan−x yönündedir. Delik için etkin kuvvet+eE olduğundan+x yönündedir. Sürüklenme yönleri bu yük farkına göre karşıttır.",
        guidance: {
          knowledge: ["F=qE; elektron yükü negatif, delik etkin pozitiftir."],
          strategy: "Her taşıyıcının işaretini alan okuna uygula.",
          steps: [
            "Elektrona etki eden kuvvet−eE olduğundan−x yönündedir.",
            "Delik için etkin kuvvet+eE olduğundan+x yönündedir.",
            "Sürüklenme yönleri bu yük farkına göre karşıttır.",
          ],
          optionReasons: [
            "Deliğin etkin pozitifliğini ihmal eder.",
            "Alan etkisini yok sayar.",
            "Elektronun negatifliğini ihmal eder.",
            "Doğru: Negatif ve etkin pozitif yükler ters kuvvet görür.",
            "Yük işaretlerini ters kullanır.",
          ],
          commonError:
            "Elektron hareketiyle geleneksel akım yönünü aynı ok sanma.",
          check:
            "İki taşıyıcının geleneksel akıma katkısının aynı yönde olabildiğini kontrol et.",
        },
      },
      {
        prompt:
          "İdeal PN diyot ileri kutuplamada hangi bağlantıya karşılık gelir?",
        options: [
          "Sadece sıcaklığı sıfıra indirme",
          "P tarafı pozitif, N tarafı negatif",
          "P negatif, N pozitif",
          "Yalnız manyetik alan değişimi",
          "İki taraf kesin aynı potansiyelde",
        ],
        answer: 1,
        hint: "Üreteç işaretlerini P veN ye eşleştir.",
        explanation:
          "P tarafına pozitif, N tarafına negatif potansiyel uygulanır. Dış gerilim iç engelin etkisini azaltır. Taşıyıcı geçişi ve akım kolaylaşır; gerçek aygıt ayrıntıları ideal modelden farklı olabilir.",
        guidance: {
          knowledge: [
            "İleri kutuplama PN eklemi engelini azaltır; ideal modelde iletim kolaylaşır.",
          ],
          strategy: "Üreteç işaretlerini P veN ye eşleştir.",
          steps: [
            "P tarafına pozitif, N tarafına negatif potansiyel uygulanır.",
            "Dış gerilim iç engelin etkisini azaltır.",
            "Taşıyıcı geçişi ve akım kolaylaşır; gerçek aygıt ayrıntıları ideal modelden farklı olabilir.",
          ],
          optionReasons: [
            "Diyot yönünü tanımlamaz.",
            "Doğru: İleri yönde potansiyel engeli azaltan bağlantıdır.",
            "Ters kutuplamadır.",
            "Elektriksel kutuplamayı değiştirmez.",
            "İleri sürme koşulunu sağlamaz.",
          ],
          commonError:
            "Gerçek diyot için her ters gerilimde kesin sıfır akımı evrensel yasa sayma.",
          check: "P pozitif bağlantıyı şekil üzerinde bir kez daha işaretle.",
        },
      },
      {
        prompt:
          "Bir transistör yükselteçte küçük girişle daha büyük çıkış işareti denetliyor. Ek çıkış enerjisi nereden gelir?",
        options: [
          "Elektronun durgun kütlesi her çevrim tamamen yok olur",
          "Giriş sinyalinin frekansı tek başına sınırsız enerji üretir",
          "Devrenin beslemesinden; giriş denetim sağlar",
          "Manyetik alan enerji korunumu gerektirmez",
          "Yoktan oluşur",
        ],
        answer: 2,
        hint: "Giriş, besleme ve çıkışı ayrı enerji yolları olarak çiz.",
        explanation:
          "Giriş işareti transistörün iletimini değiştirir. Bu kontrol beslemeden çıkışa enerji aktarımını düzenler. Daha büyük çıkış gücü enerji yaratımı değildir; besleme bütçesi azalır.",
        guidance: {
          knowledge: ["Yükseltme besleme enerjisini denetleme işidir."],
          strategy: "Giriş, besleme ve çıkışı ayrı enerji yolları olarak çiz.",
          steps: [
            "Giriş işareti transistörün iletimini değiştirir.",
            "Bu kontrol beslemeden çıkışa enerji aktarımını düzenler.",
            "Daha büyük çıkış gücü enerji yaratımı değildir; besleme bütçesi azalır.",
          ],
          optionReasons: [
            "Gereksiz nükleer dönüşüm varsayar.",
            "Frekansı sınırsız kaynak sanır.",
            "Doğru: Kontrol ve enerji kaynağı ayrılır.",
            "Alanlar da enerji bütçesine dahildir.",
            "Korunumu ihlal eder.",
          ],
          commonError:
            "Yükseltmek kelimesini enerjiyi yoktan çoğaltmak diye yorumlama.",
          check:
            "Besleme kesilince aynı güçlü sürekli çıkışın sürmeyeceğini kontrol et.",
        },
      },
      {
        prompt: "LED ve güneş pili için temel dönüşüm yönü hangisidir?",
        options: [
          "LED ışık→çekirdek füzyonu; pil ses→ışık",
          "LED her zaman yalnız görünür ışık yayar",
          "Güneş pili bütün foton enerjisini%100 elektriğe çevirir",
          "İkisi de yalnız X→ses",
          "LED elektrik→ışık; güneş pili soğurulan ışık→elektrik",
        ],
        answer: 4,
        hint: "Enerji akış oklarını iki aygıt için ayrı yaz.",
        explanation:
          "LED de dış elektrik enerjisiyle taşıyıcılar beslenir ve ışık yayılır. Fotovoltaikte fotonla oluşturulan taşıyıcılar ayrılıp dış yükte iş yapabilir. Her iki aygıtta da gerçek verim ve kayıplar vardır.",
        guidance: {
          knowledge: [
            "Elektron-delik birleşmesi ışık üretebilir; soğurulan fotonlar taşıyıcı oluşturabilir.",
          ],
          strategy: "Enerji akış oklarını iki aygıt için ayrı yaz.",
          steps: [
            "LED de dış elektrik enerjisiyle taşıyıcılar beslenir ve ışık yayılır.",
            "Fotovoltaikte fotonla oluşturulan taşıyıcılar ayrılıp dış yükte iş yapabilir.",
            "Her iki aygıtta da gerçek verim ve kayıplar vardır.",
          ],
          optionReasons: [
            "Nükleer ve mekanik süreçler ekler.",
            "IR veUVLED türlerini yok sayar.",
            "Kayıp ve eşik-fazla enerji ayrımını siler.",
            "Dalga ve kaynakları karıştırır.",
            "Doğru: İki yarı iletken aygıtın farklı görevleri doğru verilir.",
          ],
          commonError:
            "Karşıt dönüşüm yönlerini aynı anda kayıpsız tersinir süreç sanma.",
          check: "Isı ve taşıyıcı birleşmesi gibi kayıplara bütçede yer bırak.",
        },
      },
      {
        prompt:
          "Eg=2 eV ideal yarı iletkene λ=500 nm ışık geliyor; hc=1240 eV·nm. Tek foton bant geçişi enerji koşulu veEg üstü enerji nedir?",
        options: [
          "Sağlanır;2,48 eV tamamı elektrik olur",
          "Sağlanmaz;−0,48 eV elektron çıkar",
          "Sağlanır;4,48 eV",
          "Sağlanır;0,48 eV",
          "Sağlanmaz; fotonun enerjisi 0,4 eV dur",
        ],
        answer: 3,
        hint: "Önce foton enerjisini bul, sonra Eg yi çıkar.",
        explanation:
          "1240/500=2,48 eV bulunur. 2,48>2 olduğundan enerji koşulu geçilir. Fazla enerji 0,48 eV dir; bu tek başına elektrik verimi değildir.",
        guidance: {
          knowledge: ["Eγ=hc/λ; basit bant eşiği Eγ≥Eg."],
          strategy: "Önce foton enerjisini bul, sonra Eg yi çıkar.",
          steps: [
            "1240/500=2,48 eV bulunur.",
            "2,48>2 olduğundan enerji koşulu geçilir.",
            "Fazla enerji 0,48 eV dir; bu tek başına elektrik verimi değildir.",
          ],
          optionReasons: [
            "Eşik ve verimi yok sayar.",
            "Enerji sıralamasını ters yapar.",
            "Bant maliyetini toplar.",
            "Doğru: E 2,48 veE−Eg 0,48 dir.",
            "Oranı ters kurar.",
          ],
          commonError:
            "Enerji eşiğinin sağlanmasını her fotonun kesin toplanmasıyla eşitleme.",
          check: "Eşik λ620 nm olmalı;500 nm daha kısa taraftadır.",
        },
      },
      {
        prompt:
          "Eg=1,24 eV yüzeye 1000 nm ve 1500 nm fotonlar geliyor; hc 1240 eV·nm. Basit tek foton bant modelinde hangisi uygundur?",
        options: [
          "1000 nm tam eşik,1500 nm eşik altı",
          "1500 nm daha enerjiktir",
          "İkisi de tam eşik",
          "İkisinin toplam enerjisi tek foton sayılır",
          "Bant aralığı ışık akısıyla kesin sıfırlanır",
        ],
        answer: 0,
        hint: "İki enerji koşulunu ayrı değerlendir.",
        explanation:
          "1000 nm için E 1,24 eV tam Eg dir. 1500 nm için E yaklaşık 0,827 eV dir. İkinci tek foton bant geçişi için yetersiz kalır; yalnız akı artışı aynı enerji koşulunu değiştirmez.",
        guidance: {
          knowledge: ["E=1240/λ eV."],
          strategy: "İki enerji koşulunu ayrı değerlendir.",
          steps: [
            "1000 nm için E 1,24 eV tam Eg dir.",
            "1500 nm için E yaklaşık 0,827 eV dir.",
            "İkinci tek foton bant geçişi için yetersiz kalır; yalnız akı artışı aynı enerji koşulunu değiştirmez.",
          ],
          optionReasons: [
            "Doğru: 1000 nm 1,24 eV,1500 nm yaklaşık 0,827 eV dir.",
            "Ters bağıntıyı çevirir.",
            "Farklı λ ları aynı E sayar.",
            "Verilen tek foton modelini çok fotonlu toplamayla değiştirir.",
            "Malzeme aralığını akı etkisi sanır.",
          ],
          commonError:
            "Fotonların toplam gücünü tek fotonun enerji eşiği yerine koyma.",
          check: "En büyük eşik λ1000 nm olarak geri bulunmalı.",
        },
      },
      {
        prompt: "Süper iletken için hangi ifade uygundur?",
        options: [
          "Tc altı her alanda her akımda durum kesin sürer",
          "Uygun sıcaklık, alan ve akım koşullarında sıfır DC direnci ve Meissner davranışı görülebilir",
          "Bütün maglev türleri zorunlu aynı süper iletkeni kullanır",
          "Soğutma ve tüm sistem enerjisi her zaman sıfırdır",
          "Yalnız çok küçük dirençli her metal aynı tanımdadır",
        ],
        answer: 1,
        hint: "Malzeme durumu ile bütün aygıt tüketimini ayır.",
        explanation:
          "Uygun koşulda doğru akım direnci 0 olabilir. Manyetik dışlama davranışı yalnız iyi normal iletkenlikten farklıdır. Aşırı alan veyaakım durumu bozabilir; soğutma tüketimi ayrıca hesaba girer.",
        guidance: {
          knowledge: [
            "Süper iletkenlik kritik sıcaklığın yanında alan ve akım sınırlarına da bağlıdır.",
          ],
          strategy: "Malzeme durumu ile bütün aygıt tüketimini ayır.",
          steps: [
            "Uygun koşulda doğru akım direnci 0 olabilir.",
            "Manyetik dışlama davranışı yalnız iyi normal iletkenlikten farklıdır.",
            "Aşırı alan veyaakım durumu bozabilir; soğutma tüketimi ayrıca hesaba girer.",
          ],
          optionReasons: [
            "Kritik alan veakım sınırlarını yok sayar.",
            "Doğru: Ayırt edici özellikler ve kritik sınırlar korunur.",
            "Farklı levitasyon düzenlerini tekleştirir.",
            "Direnç kaybından tüm sistem kaybını 0 çıkarır.",
            "Meissner davranışını ve durum ayrımını siler.",
          ],
          commonError:
            "Tc tek koşuldur diye bütün çalışma alanını sınırsız sayma.",
          check: "Dirençteki kayıp ile soğutma gereksinimini ayrı listele.",
        },
      },
      {
        prompt: "1 nm kaç metredir ve 2×10⁻⁸ m kaç nm dir?",
        options: [
          "10⁻⁹ m;20 nm",
          "10⁻⁹ m;2 nm",
          "10⁻¹² m;20000 nm",
          "10⁹ m;20 nm",
          "10⁻⁶ m;0,02 nm",
        ],
        answer: 0,
        hint: "Metre sayısını bir nanometrenin metre karşılığına böl.",
        explanation:
          "1 nm 10⁻⁹ m dir. 2×10⁻⁸ m yi 10⁻⁹ m/nm ye böleriz. 2×10¹=20 nm çıkar.",
        guidance: {
          knowledge: ["Nano 10⁻⁹ çarpanıdır."],
          strategy: "Metre sayısını bir nanometrenin metre karşılığına böl.",
          steps: [
            "1 nm 10⁻⁹ m dir.",
            "2×10⁻⁸ m yi 10⁻⁹ m/nm ye böleriz.",
            "2×10¹=20 nm çıkar.",
          ],
          optionReasons: [
            "Doğru: 2×10⁻⁸/10⁻⁹=20 dir.",
            "Üs farkını atlar.",
            "Piko dönüşümü kullanır.",
            "Birim yönünü ters çevirir.",
            "Nano ilemikroyu karıştırır.",
          ],
          commonError: "Küçük metre değerini nm ye çevirirken tekrar küçültme.",
          check: "20×10⁻⁹=2×10⁻⁸ m geri bulunmalı.",
        },
      },
      {
        prompt:
          "Aynı toplam hacimde malzeme daha küçük eş küplere ayrılıyor; kenar uzunluğu yarıya düşüyor. Toplam dış yüzey nasıl değişir?",
        options: [
          "Yarıya iner",
          "İki katına çıkar",
          "Sekiz katına çıkar",
          "Dörtte bire iner",
          "Aynı kalır",
        ],
        answer: 1,
        hint: "Adet artışıyla tek parça yüzey azalmasını birlikte kullan.",
        explanation:
          "Kenar yarıya inince bir parçanın hacmi 1/8 olur;8 parça gerekir. Her küçük parçanın yüzeyi ilkinkinin 1/4 üdür. Toplam 8×1/4=2 kat olur; bu yüksek yüzey oranının temelidir.",
        guidance: {
          knowledge: ["Küp hacmi a³, yüzeyi 6a²; aynı hacimde S/V=6/a."],
          strategy:
            "Adet artışıyla tek parça yüzey azalmasını birlikte kullan.",
          steps: [
            "Kenar yarıya inince bir parçanın hacmi 1/8 olur;8 parça gerekir.",
            "Her küçük parçanın yüzeyi ilkinkinin 1/4 üdür.",
            "Toplam 8×1/4=2 kat olur; bu yüksek yüzey oranının temelidir.",
          ],
          optionReasons: [
            "Yüzey/hacim tersliğini yanlış kurar.",
            "Doğru: Parça sayısı 8, yüzey/parça 1/4; toplam 2.",
            "Yalnız parça sayısını kullanır.",
            "Yalnız bir parçanın yüzeyini toplam sanır.",
            "Yeni açılan yüzeyleri saymaz.",
          ],
          commonError:
            "Küçük parçanın tek yüzeyini bütün malzemenin toplamı sayma.",
          check: "Hacim sabit, toplam yüzey artmış olmalı.",
        },
      },
      {
        prompt:
          "Uyarılmış emisyonda düzey farkı 3 eV olan sisteme uygun 3 eV foton geliyor. İdeal son durumda iki 3 eV foton varsa ek enerji nereden gelir?",
        options: [
          "Boşluğun klasik sıcaklığının sıfır olmasından",
          "Elektronun elektrik yükü yok olmasından",
          "Gelen fotonun enerjisi yoktan ikiye katlanır",
          "Aynaların her yansımada frekansı zorunlu ikiye katlamasından",
          "Sistemin uyarılmış iç enerjisinden",
        ],
        answer: 4,
        hint: "Foton ve sistem enerjisini aynı başlangıç-son defterine koy.",
        explanation:
          "Başlangıçta gelen 3 eV fotona ek 3 eV uyarılma enerjisi vardır. Sistem alt düzeye inerken bu 3 eV yi ek fotona verir. Son toplam 6 eV başlangıç 6 eV ye eşittir; yeniden uyarma için pompa gerekir.",
        guidance: {
          knowledge: [
            "Uyarılmış emisyonda gelen fotona ek foton sistemin düzey enerjisinden üretilir.",
          ],
          strategy:
            "Foton ve sistem enerjisini aynı başlangıç-son defterine koy.",
          steps: [
            "Başlangıçta gelen 3 eV fotona ek 3 eV uyarılma enerjisi vardır.",
            "Sistem alt düzeye inerken bu 3 eV yi ek fotona verir.",
            "Son toplam 6 eV başlangıç 6 eV ye eşittir; yeniden uyarma için pompa gerekir.",
          ],
          optionReasons: [
            "Enerji kaynağı değildir.",
            "Yük korunumunu nedensiz bozar.",
            "Enerji korunumu ihlalidir.",
            "Foton sayısı kazancını frekans artışı sanır.",
            "Doğru: İç enerji azalması ek fotonu besler.",
          ],
          commonError:
            "Lazer kazancını her fotonun frekansının artması diye yorumlama.",
          check: "İki 3 eV son fotonun toplamını sistemin kaybıyla dengele.",
        },
      },
      {
        prompt: "Lazerle ilgili hangi ifade doğrudur?",
        options: [
          "Popülasyon terslenmesiyle yarı kararlı düzey aynı tanımdır",
          "Rezonatör dış enerji gereksinimini kaldırır",
          "Dar tayf ve yönlülük sağlayabilir; her lazer görünür değildir ve demet açılımı tamamen sıfır olmaz",
          "Her lazerin her fotonu sonsuz enerjilidir",
          "Bütün lazerler yalnız kırmızı görünürdür",
        ],
        answer: 2,
        hint: "Özellikleri mutlak sonsuz veya sıfır iddialarından ayır.",
        explanation:
          "Uyarılmış emisyon seçilmiş modun güçlenmesini sağlayabilir. Gerçek lazerin dalga boyu görünür dışı olabilir. Kırınım ve aygıt koşulları nedeniyle demet açılımı tamamen 0 değildir; pompalama enerji sağlamayı sürdürür.",
        guidance: {
          knowledge: [
            "Lazer uyarılmış emisyon, kazanç ve uygun geri beslemeyle çalışır; gerçek tayf ve demet sonludur.",
          ],
          strategy: "Özellikleri mutlak sonsuz veya sıfır iddialarından ayır.",
          steps: [
            "Uyarılmış emisyon seçilmiş modun güçlenmesini sağlayabilir.",
            "Gerçek lazerin dalga boyu görünür dışı olabilir.",
            "Kırınım ve aygıt koşulları nedeniyle demet açılımı tamamen 0 değildir; pompalama enerji sağlamayı sürdürür.",
          ],
          optionReasons: [
            "Nüfus dağılımı iledüzey ömrünü özdeşleştirir.",
            "Pompalama ve kayıpları yok sayar.",
            "Doğru: Gerçek lazer özelliklerinin sınırları belirtilir.",
            "Enerji paketinin sonluluğunu ihlal eder.",
            "IR, UV ve diğer dalga boylarını yok sayar.",
          ],
          commonError:
            "İdeal çizimdeki paralel ışınları her gerçek uzaklıkta kusursuz paralellik yasası sanma.",
          check: "Lazer için enerji kaynağı, ortam ve geri beslemeyi ayrı say.",
        },
      },
    ],
    source:
      "MEB ve OGM kapsamı esas alınarak özgün hazırlanmış konu anlatımı, modeller ve öğretim soruları. Resmî sınav sorusu değildir.",
  },
];

export const forge024PhysicsTopics: Record<string, string> = Object.fromEntries(
  packs024.map((p) => [p.id, p.topic]),
);
export const forge024PhysicsGuides: LessonGuide[] = packs024.map(
  ({ id, minutes, objectives, sections, examples, recall, source }) => ({
    id,
    minutes,
    objectives,
    sections,
    examples,
    recall,
    source,
  }),
);
export const forge024PhysicsLessons: Lesson[] = packs024.map((p) => ({
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
    id: `f024-${p.id}-${i + 1}`,
    prompt: txt(q.prompt),
    options: q.options.map(txt),
    answer: q.answer,
    hint: txt(q.hint),
    explanation: txt(q.explanation),
    guidance: q.guidance,
    skill: p.id,
  })),
}));
