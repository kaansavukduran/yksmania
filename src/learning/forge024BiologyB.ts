import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";
function whole024B(n: number, a: number, b: number) {
  return Number.isInteger(n) && n >= a && n <= b;
}
export const auxinData024 = {
  root: [0, 32, 12, -18, -45],
  shoot: [0, 12, 34, 45, -12],
} as const;
export type AuxinOrgan024 = keyof typeof auxinData024;
/** Supplied example measurements, relative to the untreated control. Dose levels are ordered categories, not a universal physiological curve. */
export function auxinResponse024(organ: AuxinOrgan024, dose: number) {
  if (
    typeof organ !== "string" ||
    !Object.hasOwn(auxinData024, organ) ||
    !whole024B(dose, 0, 4)
  )
    throw new RangeError("AUXIN024_SCOPE");
  const response = auxinData024[organ][dose];
  return {
    organ,
    dose,
    response,
    kind: response > 0 ? "promotion" : response < 0 ? "inhibition" : "control",
    points: [...auxinData024[organ]],
    optimumLevel: organ === "root" ? 1 : 3,
    scope:
      "Verilmiş iki doku örneğinin kontrol göreli uzama ölçümleridir. Doz basamakları aynı sırayı gösterir; gerçek derişim veya bütün türler için evrensel doz önerisi değildir.",
  };
}
export function culture024(auxin: number, cytokinin: number) {
  if (!whole024B(auxin, 1, 9) || !whole024B(cytokinin, 1, 9))
    throw new RangeError("CULTURE024_SCOPE");
  const outcome =
    auxin >= 2 * cytokinin
      ? "root"
      : cytokinin >= 2 * auxin
        ? "shoot"
        : "callus";
  return {
    auxin,
    cytokinin,
    outcome,
    ratio: auxin / cytokinin,
    scope:
      "Bu verilmiş doku kültüründe en az iki kat oksin kök, en az iki kat sitokinin sürgün, aradaki oranlar kallus yanıtı olarak kabul edilmiştir. Tür, doku ve mutlak derişime ait gerçek eşikler ölçülmüş değildir.",
  };
}
export const coleoptileTreatments024 = {
  intact: "İşlem yok",
  opaqueTip: "Uçta opak başlık",
  clearTip: "Uçta saydam başlık",
  opaqueBase: "Alt bölümde opak kılıf",
  removed: "Uç çıkarılmış",
  gelatin: "Uçla alt bölüm arasında jelatin",
  mica: "Uçla alt bölüm arasında geçirimsiz mika",
  agarCenter: "Uç çıkarılmış; ortada oksinli agar",
  agarLeft: "Uç çıkarılmış; solda oksinli agar",
  agarRight: "Uç çıkarılmış; sağda oksinli agar",
} as const;
export type ColeoptileTreatment024 = keyof typeof coleoptileTreatments024;
export type LightSide024 = "left" | "right" | "dark";
export function coleoptile024(
  light: LightSide024,
  treatment: ColeoptileTreatment024,
  stage: number,
) {
  if (
    typeof light !== "string" ||
    !["left", "right", "dark"].includes(light) ||
    typeof treatment !== "string" ||
    !Object.hasOwn(coleoptileTreatments024, treatment) ||
    !whole024B(stage, 0, 4)
  )
    throw new RangeError("COLEOPTILE024_SCOPE");
  const agar = treatment.startsWith("agar"),
    tipPresent = !agar && treatment !== "removed",
    signalPasses = agar || (tipPresent && treatment !== "mica"),
    perceives = tipPresent && treatment !== "opaqueTip" && light !== "dark";
  let left = signalPasses ? 1 : 0,
    right = left;
  if (treatment === "agarLeft") left = 2;
  else if (treatment === "agarRight") right = 2;
  else if (perceives && signalPasses) {
    if (light === "left") right = 2;
    else left = 2;
  }
  const bend = left > right ? "right" : right > left ? "left" : "straight",
    leftGrowth = left * stage,
    rightGrowth = right * stage;
  return {
    light,
    treatment,
    stage,
    tipPresent,
    signalPasses,
    perceives,
    leftAuxin: left,
    rightAuxin: right,
    leftGrowth,
    rightGrowth,
    bend: stage === 0 ? "straight" : bend,
    targetBend: bend,
    growth: signalPasses && stage > 0,
    scope:
      "Koleoptilin uzama bölgesinde bu doz aralığı daha çok oksinle daha fazla uzama verir. Uç algısı ile taşınabilir kimyasal sinyal ayrılır; çizim gerçek mm veya saniye ölçümü değildir. Opak alt kılıfın mekanik büyümeyi engellemediği kabul edilir.",
  };
}
export type PhotoKind024 = "short" | "long" | "neutral";
export type NightPulse024 = "none" | "R" | "FR" | "R-FR" | "FR-R";
/** One midpoint pulse, or immediately successive midpoint pulses. Final far-red reverses the red interruption in this stipulated phytochrome-sensitive example. */
export function nightResponse024(
  kind: PhotoKind024,
  dayHours: number,
  criticalNight: number,
  pulse: NightPulse024,
  mature: boolean,
) {
  if (
    typeof kind !== "string" ||
    !["short", "long", "neutral"].includes(kind) ||
    !whole024B(dayHours, 4, 20) ||
    !whole024B(criticalNight, 4, 16) ||
    typeof pulse !== "string" ||
    !["none", "R", "FR", "R-FR", "FR-R"].includes(pulse) ||
    typeof mature !== "boolean"
  )
    throw new RangeError("NIGHT024_SCOPE");
  const night = 24 - dayHours,
    interrupted = pulse === "R" || pulse === "FR-R",
    longestDark = interrupted ? night / 2 : night,
    boundary = kind !== "neutral" && longestDark === criticalNight;
  const induced = !mature
    ? false
    : kind === "neutral"
      ? true
      : boundary
        ? null
        : kind === "short"
          ? longestDark > criticalNight
          : longestDark < criticalNight;
  return {
    kind,
    dayHours,
    criticalNight,
    pulse,
    mature,
    night,
    interrupted,
    longestDark,
    boundary,
    induced,
    finalState:
      pulse === "none" ? "not-set" : interrupted ? "Pfr-rich" : "Pr-rich",
    scope:
      "Verilmiş olgun bitkide, diğer çiçeklenme koşulları uygundur. Gece ortasındaki kısa kırmızı darbe etkisi uzak kırmızıyla tersine çevrilebilen örnek kullanılır. Kritik değere tam eşitlikte yanıt verilmemiştir; model karar üretmez. Nötr günlük yanıt bütün çevresel gereksinimleri yok saymaz.",
  };
}
export const flowerPartNames024 = {
  sepal: "Çanak yaprak",
  petal: "Taç yaprak",
  stamen: "Erkek organ",
  pistil: "Dişi organ",
} as const;
export type FlowerPart024 = keyof typeof flowerPartNames024;
export function flowerInventory024(
  sepal: boolean,
  petal: boolean,
  stamen: boolean,
  pistil: boolean,
) {
  if ([sepal, petal, stamen, pistil].some((x) => typeof x !== "boolean"))
    throw new RangeError("FLOWER024_SCOPE");
  return {
    sepal,
    petal,
    stamen,
    pistil,
    complete: sepal && petal && stamen && pistil,
    sex:
      stamen && pistil
        ? "bisexual"
        : stamen
          ? "male"
          : pistil
            ? "female"
            : "sterile",
    presentCount: [sepal, petal, stamen, pistil].filter(Boolean).length,
    scope:
      "Tam/eksik kararı dört organ takımına; iki eşeyli/tek eşeyli kararı erkek ve dişi organa dayanır. Tek çiçekten, bitkinin tek evcikli veya iki evcikli dağılımı belirlenemez.",
  };
}
export type ReproductiveLineage024 = "male" | "female";
const maleStages024 = [
  "Diploit mikrospor ana hücresi",
  "Mayoz: dört haploit mikrospor",
  "Her mikrosporda mitoz: iki hücreli polen",
  "Generatif hücre mitozu: iki sperm ve tüp hücresi",
] as const;
const femaleStages024 = [
  "Diploit megaspor ana hücresi",
  "Mayoz: dört haploit megaspor",
  "Üçü kaybolur: bir işlevli megaspor",
  "Sitokinez olmadan ilk mitoz: iki çekirdek",
  "İkinci mitoz: dört çekirdek",
  "Üçüncü mitoz: sekiz çekirdek",
  "Hücreselleşme: tipik yedi hücre, sekiz çekirdek",
] as const;
export function reproductivePath024(
  lineage: ReproductiveLineage024,
  stage: number,
  diploid: number,
) {
  if (
    typeof lineage !== "string" ||
    !["male", "female"].includes(lineage) ||
    !whole024B(stage, 0, lineage === "male" ? 3 : 6) ||
    !whole024B(diploid, 2, 40) ||
    diploid % 2 !== 0
  )
    throw new RangeError("REPRODUCTIVE024_SCOPE");
  const stages = lineage === "male" ? maleStages024 : femaleStages024,
    products = stage === 0 ? 1 : lineage === "male" ? 4 : stage === 1 ? 4 : 1,
    cellsPerProduct =
      lineage === "male"
        ? stage < 2
          ? 1
          : stage === 2
            ? 2
            : 3
        : stage === 6
          ? 7
          : 1,
    nucleiPerProduct =
      lineage === "male"
        ? cellsPerProduct
        : stage < 3
          ? 1
          : stage === 3
            ? 2
            : stage === 4
              ? 4
              : 8,
    chromosomesPerNucleus = stage === 0 ? diploid : diploid / 2;
  return {
    lineage,
    stage,
    diploid,
    stages: [...stages],
    label: stages[stage],
    products,
    cellsPerProduct,
    nucleiPerProduct,
    chromosomesPerNucleus,
    ploidy: stage === 0 ? "2n" : "n",
    scope:
      lineage === "male"
        ? "Tüm dört mikrosporun geliştiği, polenin iki hücreli oluşup generatif hücrenin daha sonra iki sperm verdiği tipik örnek. Erkek gametofit polen, tek sperm hücresi değildir."
        : "Tipik monosporik embriyo kesesi örneği. Merkez hücredeki iki polar çekirdek henüz birleşmemiş kabul edilir; her biri n taşır. Yedi hücrede sekiz çekirdek vardır. Bu model henüz döllenme veya tohum çimlenmesi göstermez.",
  };
}
export type PollenOrigin024 =
  "sameFlower" | "samePlant" | "otherPlant" | "otherSpecies";
export function pollenTransfer024(
  origin: PollenOrigin024,
  deposited: boolean,
  compatible: boolean,
  viable: boolean,
  receptive: boolean,
  step: number,
) {
  if (
    typeof origin !== "string" ||
    !["sameFlower", "samePlant", "otherPlant", "otherSpecies"].includes(
      origin,
    ) ||
    [deposited, compatible, viable, receptive].some(
      (x) => typeof x !== "boolean",
    ) ||
    !whole024B(step, 0, 3)
  )
    throw new RangeError("POLLEN024_SCOPE");
  const sameSpecies = origin !== "otherSpecies",
    eligible = sameSpecies && compatible && viable && receptive,
    reached = step < 2 ? step : !deposited ? 1 : step === 3 && eligible ? 3 : 2,
    arrived = reached >= 2;
  const category =
    origin === "sameFlower"
      ? "same-flower-self"
      : origin === "samePlant"
        ? "same-plant-self"
        : origin === "otherPlant"
          ? "cross"
          : "foreign-species";
  const blockers = [
    ...(!sameSpecies
      ? ["Farklı tür girdisi bu modelde uyumlu kabul edilmez"]
      : []),
    ...(!compatible ? ["Verilen genetik uyum yok"] : []),
    ...(!viable ? ["Polen canlı değil"] : []),
    ...(!receptive ? ["Tepecik alıcı evrede değil"] : []),
  ];
  return {
    origin,
    step,
    category,
    sameSpecies,
    eligible,
    reached,
    arrived,
    tubeStarted: reached === 3,
    blockers,
    scope:
      "Tepeciğe taşınma ile uyumlu polenin tüp başlatması ayrı olaylardır. Model sperm–yumurta birleşmesi, tohum veya meyve sonucu üretmez. Başka bitki aynı türden ayrı bireydir; klonal ilişki veya genetik çeşitlilik miktarı verilmemiştir.",
  };
}

type Item024B = {
  prompt: string;
  correct: string;
  reason: string;
  wrong: [string, string][];
  knowledge: string[];
  strategy: string;
  steps: string[];
  commonError: string;
  check: string;
};
type Unit024B = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  source: string;
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: Item024B[];
};
const units024B: Unit024B[] = [
  {
    id: "bitki-hormonlari",
    topic: "detail-351",
    title: "Bitkisel hormonlar: doz, hedef doku ve ortak yanıt",
    minutes: 100,
    objectives: [
      "Beş temel hormon grubunun örnek etkilerini hedef organ ve koşulla ilişkilendir.",
      "Oksin dozuna kök ve sürgün yanıtını verilen ölçümlerle karşılaştır.",
      "Apikal baskınlık, doku kültürü, olgunlaşma ve su stresi deneylerini doğru kontrollerle açıkla.",
    ],
    source:
      "Aurelia YKS arşivindeki MEBİ AYT Biyoloji, Bitki Gelişiminde Hormonların Etkisi özeti; OGM aynı başlıklı sunu ve konu özeti; Dersler Cepte Bitkilerin Yapısı ile karşılaştırılan özgün öğretim anlatımı, veri modelleri ve sorular.",
    sections: [
      {
        title: "Büyüme ile gelişmeyi aynı ölçüme sıkıştırma",
        paragraphs: [
          "Büyüme hücre sayısı ve boyut artışıyla organın nicel değişimini; gelişme farklılaşma ve yaşam evrelerindeki düzenli değişimleri kapsar. Bir bitkinin boyunun uzaması ile çiçeklenmeye geçmesi aynı sonuç değildir. Meristem, hücre uzaması ve farklılaşma bilgisi hormon etkilerini yerleştirmek için önkoşuldur.",
          "Bitkisel hormonlar düşük miktarlarda etkili olabilen kimyasal sinyallerdir; hücre bölünmesi, uzama, farklılaşma, dormansi ve stres yanıtları gibi süreçleri düzenler. Bir hormona büyütücü etiketi koymak tek başına yeterli değildir: hangi organda, hangi dozda, hangi evrede ve hangi başka sinyallerle birlikte olduğu sorulur.",
        ],
      },
      {
        title: "Bitkide zorunlu bir hormon bezi arama",
        paragraphs: [
          "Hormonlar sürgün ve kök uçları, genç yapraklar, gelişen tohum ve meyveler gibi çeşitli dokularda sentezlenebilir. Üretildikleri yerde veya taşındıkları başka hedef dokularda etkili olabilirler. Her hormon yalnız tek organda, her hedef de yalnız tek hormonla çalışır diye bir kural yoktur.",
          "Ksilem, floem ve hücreden hücreye taşıma farklı sinyallere katkı verebilir; gaz hâlindeki etilen yayılabilir. Hedef hücrenin sinyali algılama ve yanıt oluşturma kapasitesi de önemlidir. Bitkisel düzenlemeyi hayvandaki her hormonun belirli bir bezden çıktığı basit şemayla aynen eşitleme.",
        ],
      },
      {
        title: "Doz–yanıt ilişkisini organla birlikte oku",
        paragraphs: [
          "Bir hormonun küçük miktarı uyarıcı, daha yüksek miktarı engelleyici olabilir; en uygun aralık dokuya göre değişir. Oksine kök uzaması çoğu öğretim örneğinde sürgünden daha düşük dozlarda yanıt verir. Aynı dış dozu iki organa uygulamak aynı uzama yüzdesi vereceği anlamına gelmez.",
          "Özgün modelde aynı sıralı beş doz basamağı için kontrol göreli uzama ölçümleri verilmiştir. Kök ve sürgün eğrileri bu örnek dokuya aittir; gerçek derişim veya tarımsal reçete değildir. Eğrinin üst noktasını, sıfır çizgisini ve negatif yani kontrolün altındaki yanıtını ayrı oku.",
        ],
      },
      {
        title: "Oksin ve hücre uzamasının bağını kur",
        paragraphs: [
          "Sürgün uçları ve genç dokular oksin kaynakları arasında bulunur. Uygun doz ve koşullarda oksin hücre duvarının gevşemesiyle uzamayı destekler; su girişi ve turgor da uzama için gereklidir. Bir hücrenin uzaması ile mitozla iki hücre oluşması farklı sonuçlardır.",
          "Oksin kambiyum etkinliği, iletim dokusu farklılaşması, kök oluşumu ve meyve gelişimi gibi bağlamlara da katılır. Bu çoklu etkiler bütün organların aynı doza aynı yönlü yanıt vereceği anlamına gelmez. Soru yalnız uzama ölçmüşse hücre sayısının kesin aynı oranda arttığını söyleme.",
        ],
      },
      {
        title: "Apikal baskınlıkta yeri ve uygulamayı izle",
        paragraphs: [
          "Tepe sürgünü yanal tomurcukların gelişimini dolaylı hormonal ilişkilerle baskılayabilir. Oksin bu apikal baskınlık düzeninin önemli parçasıdır; sitokinin ve başka sinyaller de etkilidir. Tepe çıkarıldıktan sonra yan dallanmanın artması, tepenin yalnız fiziksel ağırlık yaptığını göstermez.",
          "Kesilen tepe yerine uygun oksin uygulamasıyla yanal tomurcuk baskısının yeniden artması kimyasal düzenleme açıklamasını destekler. Taşıyıcı çözücünün tek başına uygulandığı kontrol gerekir. Mevsimsel dormansi ile tepenin yan tomurcuğa baskısını aynı adla anlatma; süreçler ilişkili olsa da tek ölçüt değildir.",
        ],
      },
      {
        title: "Asimetrik oksin dağılımı yönelme oluşturabilir",
        paragraphs: [
          "Tek yönden ışık alan tipik bir koleoptil sürgününde gölgede kalan tarafta oksin etkisi ve uzama daha fazla olabilir. Uzun kalan taraf dış yayda kalır; sürgün ışığa doğru kıvrılır. Oksin moleküllerinin ışık tarafından fiziksel olarak çekildiğini söylemek mekanizma değildir.",
          "Sinyali algılama bölgesiyle kıvrılan uzama bölgesi farklı olabilir. Oksin taşınması hücresel ve yönlü düzenlemelere bağlıdır; yerçekimi yönünde zorunlu pasif akma diye açıklanmaz. Kökün doz duyarlılığı farklı olduğundan sürgün için kurulan uzama sonucunu köke koşulsuz taşıma.",
        ],
      },
      {
        title: "Kök oluşumu, kök uzamasıyla aynı ölçüt değildir",
        paragraphs: [
          "Uygun oksin uygulaması çeliklerde adventif kök oluşumunu destekleyebilir. Yeni kök başlatma sayısı ile mevcut kökün uzama hızı iki farklı ölçümdür. Bir deneyde çok sayıda kısa kök oluşması her kökün daha hızlı uzadığı anlamına gelmez.",
          "Oksin derişimi, uygulama süresi, bitki türü ve çeliğin yaşı sonucu etkiler. Çok yüksek doz olumsuz yanıt veya dolaylı etilen etkileri oluşturabilir. Bir hormonun yararlı olduğu bağlamı bilmek, miktarı sınırsız artırma sonucuna götürmemelidir.",
        ],
      },
      {
        title: "Giberellini uzama ve enzim yanıtıyla tanı",
        paragraphs: [
          "Giberellinler sürgün uzaması, bazı türlerde çiçeklenme ve meyve gelişimiyle ilişkilidir. Bazı giberellin eksikliği durumlarında dışarıdan uygun uygulama cüce sürgünün uzamasını artırabilir. Ancak her kısa bitki giberellin eksiktir denemez; sinyali algılayamama veya başka nedenler olabilir.",
          "Tahıl çimlenmesindeki örneklerde giberellin, depo maddelerini kullanıma açan hidrolitik enzimlerin sentezini destekleyebilir. Bu bilgi hormonun besinin kendisi olmadığını gösterir. Çimlenmenin bütün koşulları sonraki ünitenin konusudur; burada hormonal sinyal ile enzim yanıtı arasındaki ilişkiyi kur.",
        ],
      },
      {
        title: "Kurtarma deneyinde eksiklikle duyarsızlığı ayır",
        paragraphs: [
          "Aynı koşuldaki iki kısa sürgünden birine giberellin verildiğinde uzama düzeliyor, diğerinde düzelmiyorsa nedenler aynı olmak zorunda değildir. İlk sonuç hormon eksikliğiyle uyumlu olabilir. İkinci grupta algılama/yanıt sorunu gibi başka nedenler incelenebilir.",
          "Dış uygulamanın başarısız olması hormonun bütün bitkilerde etkisiz olduğunu kanıtlamaz. Dozun uygunluğu ve dokunun canlılığı da kontrol edilmelidir. Deneyin tek farkı hormon uygulamasıysa bir kimyasal eklemenin hangi açıklamaları güçlendirdiğini, hangilerini henüz kesinleştirmediğini söyle.",
        ],
      },
      {
        title: "Sitokinin bölünme ve yaşlanma düzenine katılır",
        paragraphs: [
          "Sitokininler hücre bölünmesini, yan tomurcuk gelişimini ve uygun bağlamlarda sürgün oluşumunu destekleyebilir. Kök uçları dahil çeşitli dokularda sentezlenebilir; başka organlara taşınabilir. Genç dokuların gelişiminde oksin ve başka sinyallerle etkileşim önemlidir.",
          "Yaprak yaşlanmasının gecikmesi sitokininle ilişkilendirilen bir diğer etkidir. Yeşil rengin daha uzun korunması, bütün yaprağın sınırsız yaşayacağı ya da su gereksiniminin kalkacağı anlamına gelmez. Hormonların etkilerini tek bir uyarıcı/engelleyici kutusuna kapatmak yerine özgül ölçümü kullan.",
        ],
      },
      {
        title: "Doku kültüründe oran, aynı zamanda koşul bilgisidir",
        paragraphs: [
          "Uygun steril doku kültüründe oksin ve sitokinin dengesi hücrelerin kök, sürgün veya kallus gelişimine yönelmesine katkı verir. Kallus, bu bağlamda farklılaşmamış veya az farklılaşmış çoğalan hücre topluluğudur. Kallus bir tohum veya zorunlu olarak kötü huylu yapı diye adlandırılmaz.",
          "Ders modelinde en az iki kat oksin kök, en az iki kat sitokinin sürgün, aradaki oranlar kallus sonucu olarak verilmiştir. Bu eşikler model kabulüdür; bütün türlerin gerçek eşikleri değildir. Mutlak miktar, doku tipi ve genotip de gerçek deneyi etkiler; oran tek başına evrensel reçete değildir.",
        ],
      },
      {
        title: "ABA su stresi yanıtına ve dormansiye katılır",
        paragraphs: [
          "Absisik asit su stresiyle ilişkili stoma kapanmasını destekler. İyon kanalları, çözünen durumu ve su kaybıyla bekçi hücresi turgoru azalabilir. Bu yanıt su kaybını sınırlamaya yardım eder; suyu yoktan üretmez ve bütün su çıkışını mutlak sıfırlamaz.",
          "ABA tohum ve tomurcuk dormansisinin oluşması ve sürmesiyle de ilişkilidir. Dormansi yalnız kabuğun üstüne hormon sürülmesi veya her tohumda yıkamayla biten tek süreç değildir. Hormon dengesi ve doku duyarlılığı, çevresel koşullarla birlikte değerlendirilir.",
        ],
      },
      {
        title: "Bir hormonun etkisi bağlama göre yararlı olabilir",
        paragraphs: [
          "ABA’nın bazı büyüme süreçlerini sınırlaması zararlı hormon olduğu anlamına gelmez. Su yetersizliğinde kapanma yanıtı canlılığın korunmasına katkı verebilir. Aynı yanıt CO₂ alımını sınırlayıp karbon üretimiyle bir denge de oluşturabilir.",
          "Gelişimde yavaşlama, dormansi ve stres yanıtını yalnız bitkinin bozulması olarak okumak yanlış olur. Uyarıcı hormonlar da uygunsuz dozda olumsuz etki verebilir. Doğru soru hangi koşulda hangi işlevin düzenlendiğidir; bütün bitki yaşamını tek artı/eksi etikete indirme.",
        ],
      },
      {
        title: "Etilen gaz hâlinde bir sinyaldir",
        paragraphs: [
          "Etilen gaz hâlindeki bitkisel hormon olarak dokular arasında ve çevre havasında yayılabilir. Bazı meyvelerde olgunlaşma, bazı dokularda yaşlanma ve organ dökümüyle ilişkilidir. Kuraklık, yaralanma ve su baskını gibi stresler de üretimini etkileyebilir.",
          "Kapalı ortamda olgunlaşan bir meyvenin başka meyveleri etkilemesi gaz birikimi ve yayılmasıyla uyumludur. Havalandırma ortam derişimini azaltabilir; bu, hücrelerin etilen sentezinin her koşulda durduğu anlamına gelmez. Ortam birikimi ile üretim hızı farklı ölçümlerdir.",
        ],
      },
      {
        title: "Olgunlaşma, çürüme ve her meyvenin yanıtı aynı değildir",
        paragraphs: [
          "Olgunlaşmada renk, sertlik, koku ve şeker/asit dengesi değişebilir. Etilene duyarlı bazı meyvelerde çeperle ilgili enzimler ve depo maddelerinin dönüşümü bu değişimlere katılır. Hormon şekerin kendisi değildir; düzenleyici sinyaldir.",
          "Her meyve aynı büyüklükte veya aynı evrede etilen yanıtı vermez. Olgunlaşmanın sürmesiyle mikrobiyal çürüme aynı olay değildir; etilen tek başına bütün çürümenin zorunlu nedeni diye sunulmaz. Deneyde sertlik ölçülmüşse mikrop sayısını veya besin güvenliğini ayrıca ölçmeden kesinleştirme.",
        ],
      },
      {
        title: "Hormonlar birlikte ve bazen karşıt çalışır",
        paragraphs: [
          "Giberellin ve ABA’nın dormansi/etkinleşme bağlamındaki etkileri; oksin ve sitokininin doku kültüründeki dengesi; oksin, sitokinin ve başka sinyallerin dallanmadaki ilişkileri birlikte düzenlemeye örnektir. Hormonlar hücrede birbirinden tamamen yalıtılmış beş düğme değildir.",
          "Bir hormonun düzeyi sabitken diğerinin değişmesi oranı ve yanıtı değiştirebilir. Aynı hormon farklı organlarda farklı sonuç da verebilir. Karşıt etki iki maddenin kimyasal olarak mutlaka birbirini yok ettiği anlamına gelmez; hücresel düzenleme ve hedef yanıt üzerinden düşün.",
        ],
      },
      {
        title: "Hormon deneyini kontrol grubuyla oku",
        paragraphs: [
          "Aynı genotip, gelişim evresi ve çevrede hormon uygulanan grupla yalnız çözücü verilen grubu karşılaştırmak daha temiz bir deney kurar. Doz serisi, tek bir miktarın etkisini evrensel sonuç sanmayı önler. Boy, kök sayısı, açıklık ve olgunluk gibi ölçümler ayrı tutulmalıdır.",
          "Sonuçları önce ölçümün birimiyle yaz; sonra mekanizmayla ilişkilendir. Yüzde uzama değişimini kök sayısı değişimi diye aktarma. Bir uygulama eksikliği düzeltiyorsa bu önemli kanıttır; başka kontroller olmadan tüm hormon sistemi için tek neden ilan etme.",
        ],
      },
      {
        title: "Veriyi yeni bağlama aktar",
        paragraphs: [
          "Doz eğrisinde x ekseni miktar, y ekseni kontrole göre yanıt olabilir; y sıfırı büyümenin bütünüyle yokluğu değil kontrol kadar büyüme anlamına gelebilir. Modelde kökün en iyi yanıtı daha düşük dozda, sürgünün daha yüksek dozda bulunur. Negatif yanıt kontrolün altındadır.",
          "Yeni bir soruda önce ölçülen süreci ve kontrolü tanı; hormon adı sonra gelir. Apikal baskınlıkta dallanma, doku kültüründe organ gelişimi, ABA deneyinde açıklık ve etilen deneyinde olgunlaşma incelenir. Aynı açıklama kalıbını bütün sonuçlara yapıştırmadan veriye özgü mekanizmayı kur.",
        ],
      },
    ],
    examples: [
      {
        title: "Kontrol göreli eksi değer",
        prompt:
          "Verilen bir dozda kök uzama yanıtı kontrolün yüzde 25 altında, sürgün yanıtı yüzde 30 üstünde ölçülüyor. Aynı doz için ne söylenir?",
        strategy: "Organların kontrol göreli yanıtını ayrı değerlendir.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Kökün −25 değerini sıfır büyüme değil kontrolün altında uzama olarak oku.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Sürgünün +30 değerini kendi kontrolünün üzerinde uzama olarak oku.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Aynı dozun farklı doku yanıtları verdiğini belirt; iki organın mutlak boyunu oranlama.",
          },
        ],
        answer: "Kök baskılanmış, sürgün uyarılmış; mutlak boylar bilinmiyor.",
        check: "İki yüzdelik kendi kontrolüne mi ait?",
        pitfall:
          "Negatif kontrol farkını organın fiziksel olarak negatif uzunluğu sanmak.",
      },
      {
        title: "Sinyali engellerken bazal yanıtı kontrol et",
        prompt:
          "Eş yaprak dokularında bölünme endeksi kontrol grubunda 5, sitokinin grubunda 12, sitokinin+özgül reseptör engelleyici grubunda 5, yalnız engelleyicide 5. Bu deneyde engelleyicinin başka hedefi ve canlılığa etkisi olmadığı ayrıca doğrulanmış. Sitokininin ek katkısı ve engelin yeri için ne çıkarılır?",
        strategy:
          "Kontrol farkını hesapla; engelleyicinin tek başına bazal düzeyi değiştirip değiştirmediğini denetle.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Sitokininin ek yanıtını 12−5=7 endeks birimi olarak hesapla.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Yalnız engelleyicide bazal 5’in korunmasıyla genel baskılanma açıklamasını bu verilen kontrolde ayır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Sitokinin+engelleyicide ek 7 kaybolduğu için reseptör bağlantılı sinyal yanıtı desteklenir; bu ölçüm sitokininin sentez yerini vermez.",
          },
        ],
        answer:
          "Ek yanıt 7 birim; özgül reseptör engeli bu katkıyı kaldırır, bazal endeks korunur.",
        check:
          "Canlılık ve özgüllüğün ayrıca doğrulandığı kabulünü açıklamada kullandın mı?",
        pitfall:
          "Yanıtın engellenmesini hormonun hiç sentezlenmemesiyle eşitlemek.",
      },
      {
        title: "Aynı oran, modelde aynı sınıf",
        prompt:
          "Verilen kültür kuralı: oksin en az sitokininin iki katıysa kök, sitokinin en az oksinin iki katıysa sürgün, arada kallus. X’te 6/2, Y’de 3/1 birim oksin/sitokinin var. Model sonuçları nedir?",
        strategy: "Her grupta oranı aynı eşikle karşılaştır.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "X için 6/2 = 3, Y için 3/1 = 3 hesapla.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "İki oran da en az 2 olduğundan modelde kök yanıtı seç.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Gerçek dokuda mutlak dozların da etkili olabileceğini modelin sınırı olarak koru.",
          },
        ],
        answer: "İkisinde de model kök yanıtı.",
        check: "Model sonucu ile evrensel tarımsal reçete aynı şey mi?",
        pitfall: "Eşit oranlardan her canlıda kesin eşit kök sayısı çıkarmak.",
      },
      {
        title: "Olgunlaşmada şeker artışı yeni karbon üretimi değildir",
        prompt:
          "Etilene duyarlı bir meyvede başlangıç nişastası 18, çözünür şekeri 4 karbon eşdeğeri birim. Son ölçümde nişasta 8, çözünür şeker 12; solunumla 2 birim karbon dışarı çıkmış. Başka karbon girişi/çıkışı yok. Şeker artışı nasıl açıklanır?",
        strategy:
          "Kütle yerine özellikle verilmiş karbon eşdeğerleriyle bilanço kur.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Nişastadaki azalmayı 18−8=10, şekerdeki artışı 12−4=8 birim bul.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Azalan 10 birimin 8’i şeker artışı,2’si solunum çıkışıyla dengelenir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Başlangıç 18+4=22; son içerik 8+12 ve dışarı çıkan 2 toplam 22’dir. Etilen düzenleyici sinyaldir; dışarıdan karbon kaynağı değildir.",
          },
        ],
        answer:
          "Şeker 8 artmış; toplam karbon korunarak bir kısmı solunumla dışarı çıkmıştır.",
        check:
          "Gram nişastayı gram şekerle doğrudan eşitlemek yerine verilen karbon eşdeğerini kullandın mı?",
        pitfall: "Tatlanmayı hormonun yoktan şeker karbonu üretmesi saymak.",
      },
      {
        title: "Giberellinle kurtarma farkı",
        prompt:
          "İki kısa fideye aynı uygun giberellin dozu veriliyor. A’nın uzaması düzeliyor; B’nin uzaması değişmiyor. Hangi iki olasılığı ayırırsın?",
        strategy:
          "Yanıt düzelmesini eksiklik açıklamasıyla, yanıtsızlığı başka basamaklarla karşılaştır.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "A’nın dış hormonla kurtarılmasını hormon eksikliğiyle uyumlu bul.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "B’de algılama/yanıt sorunu veya başka büyüme sınırlarını olası tut.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Tek dozla B’nin kesin genini veya bütün kısa bitkilerin nedenini ilan etme.",
          },
        ],
        answer: "A eksikliğiyle uyumlu; B’de başka basamaklar araştırılmalı.",
        check:
          "Yanıtsızlığı bütün türlerde hormon etkisizliği diye genelledin mi?",
        pitfall: "Her kısa fideyi aynı hormon eksikliği saymak.",
      },
      {
        title: "ABA yanıtında ölçülen ve çıkarılan",
        prompt:
          "Su stresi altında aynı yaprak tipine ABA veya çözücü veriliyor. ABA grubunda açıklık azalıyor; toplam kütle kaybı ölçülmüyor. En güçlü sonuç nedir?",
        strategy: "Açıklık ölçümünü toplam su bilançosundan ayır.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "Kontrole göre açıklığın düştüğünü kaydet.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "ABA’nın bu koşuldaki kapanma yanıtıyla ilişki kur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Bütün terlemenin sıfır olduğu veya büyüme miktarı için sayı üretme.",
          },
        ],
        answer:
          "ABA bu koşulda kapanmayı desteklemiş; toplam su kaybı ayrıca ölçülmeli.",
        check: "Sonuç ölçülen açıklıktan ileri sıçrıyor mu?",
        pitfall:
          "Stoma açıklığından bütün bitkinin su kaybına kesin sıfır atamak.",
      },
    ],
    recall: [
      {
        prompt:
          "Hormon etkisini adın yanında hangi dört bilgiyle sınırlandırırsın?",
        answer:
          "Doz, hedef organ/doku, gelişim evresi ve çevre/diğer hormon koşullarıyla.",
      },
      {
        prompt:
          "Apikal baskınlık hangi kontrolle kimyasal açıklamaya bağlanabilir?",
        answer:
          "Tepe kesilmiş gruba uygun oksin geri uygulaması ve yalnız taşıyıcı verilen kesik kontrolün karşılaştırılmasıyla.",
      },
      {
        prompt: "Kök oluşumu ile kök uzamasının farkı nedir?",
        answer:
          "İlki yeni kök başlatma/sayısını, ikincisi mevcut kökün boy artışını anlatır; aynı ölçüm değildir.",
      },
      {
        prompt: "Hangi hormon gaz hâlinde çevrede yayılabilir?",
        answer: "Etilen; ortam derişimi hem üretime hem uzaklaşmaya bağlıdır.",
      },
      {
        prompt:
          "Doku kültüründe yalnız hormon oranı bütün gerçek sonucu garanti eder mi?",
        answer:
          "Hayır; model oran kuralı verilmiş olabilir ama gerçek tür, doku ve mutlak miktarlar da önemlidir.",
      },
      {
        prompt:
          "ABA’yı yalnız zararlı büyüme engelleyici diye adlandırmak neden eksiktir?",
        answer:
          "Su stresi ve dormansi yanıtları canlılığın korunmasına katkı verebilir; yarar koşul ve hedef işleve bağlıdır.",
      },
    ],
    items: [
      {
        prompt:
          "Aynı hormon aynı dış dozda kök ve sürgün dokularına uygulanıyor; kök uzaması kontrole göre azalırken sürgün uzaması artıyor. En uygun sonuç hangisidir?",
        correct:
          "Hormon yanıtı hedef dokuya bağlıdır; aynı doz farklı organlarda farklı etki verebilir.",
        reason:
          "Doku duyarlılığı ve doz–yanıt aralıkları farklı olabileceğinden iki organın ters yanıtı mümkündür.",
        wrong: [
          [
            "Bir hormonun aynı dozu bütün organları zorunlu aynı oranda uzatır.",
            "Verilen iki organ yanıtı bu koşulsuz eşitlik iddiasıyla çelişir.",
          ],
          [
            "Kök uzaması azalınca kökte hiçbir hormon reseptörü bulunamaz.",
            "Azalma da bir yanıt olabilir; reseptör yokluğu ölçülmemiştir.",
          ],
          [
            "Sürgün uzaması artması kök hücrelerinin sayısının kesin arttığını gösterir.",
            "Sürgün ölçümü kökün hücre sayısını vermez.",
          ],
          [
            "İki farklı sonuç ölçüldüğü için uygulanan madde hormon olamaz.",
            "Hormonlar organ ve koşula göre farklı sonuç verebilir.",
          ],
        ],
        knowledge: ["Doz–yanıt ilişkisi organ ve gelişim koşuluna bağlıdır."],
        strategy: "Aynı girdiye iki ayrı hedef yanıtını karşılaştır.",
        steps: [
          "Dış dozun aynı tutulduğunu belirle.",
          "Kök ve sürgünün kontrole göre ters yönlü uzama yanıtlarını ayır.",
          "Dokuya bağlı etkiyi seç; eşit yanıt zorunluluğu ekleme.",
        ],
        commonError:
          "Aynı hormon miktarını bütün dokular için aynı sonuç saymak.",
        check: "Yanıt iki organın verilen zıt sonuçlarını birlikte açıklıyor.",
      },
      {
        prompt:
          "Verilmiş oksin doz serisinde kökün kontrol göreli uzama değişimleri 0,+20,+5,−15; sürgünün 0,+10,+25,+35 birimdir. İki organa üçüncü sıradaki doz uygulanıyor. Hangi yorum doğrudur?",
        correct:
          "Kök ve sürgün kendi kontrollerinin üzerindedir; sürgünün göreli artışı daha büyüktür.",
        reason:
          "Üçüncü sıra kökte+5, sürgünde+25 verir; ikisi de pozitif kontrol farkıdır.",
        wrong: [
          [
            "Kök −15, sürgün+35 yanıt verir.",
            "Bunlar üçüncü değil dördüncü sıranın değerleridir.",
          ],
          [
            "Kökün mutlak boyu sürgünün beşte biridir.",
            "Kontrol göreli farklardan mutlak organ boylarının oranı hesaplanamaz.",
          ],
          [
            "Kök hiç uzamamıştır; +5 sıfır büyüme demektir.",
            "+5 kendi kontrolünden daha yüksek uzama değişimidir.",
          ],
          [
            "Sürgün baskılanmıştır çünkü dozu kökle aynıdır.",
            "Verilen sürgün yanıtı+25’tir; aynı doz eşit veya baskılı sonuç gerektirmez.",
          ],
        ],
        knowledge: [
          "Tablo sırası ve kontrol göreli işaret, mutlak boydan ayrı okunur.",
        ],
        strategy: "Önce istenen sırayı bul, sonra sıfır çizgisine göre oku.",
        steps: [
          "Üçüncü değerleri kökte+5, sürgünde+25 seç.",
          "İki işaretin de pozitif olduğunu belirle.",
          "Göreli artışları karşılaştır; mutlak boy oranı çıkarma.",
        ],
        commonError: "Doz sırasını kontrol göreli değerle karıştırmak.",
        check:
          "Seçilen değerler üçüncü sütundan ve her organın kendi kontrolüne göre alındı.",
      },
      {
        prompt:
          "Bir oksin deneyinde sıralı dozlar D0,D1,D2,D3,D4. Kök uzama değişimleri sırasıyla 0,28,14,−8,−30; sürgün 0,8,22,31,−4. Verilmiş ölçümlerde en yüksek yanıt veren dozlar hangileridir?",
        correct: "Kökte D1, sürgünde D3.",
        reason:
          "Kök serisinin en yüksek değeri 28 D1’de; sürgünün 31 değeri D3’tedir.",
        wrong: [
          [
            "Her ikisinde D4; en yüksek doz en çok büyütür.",
            "D4 değerleri iki organda da kontrolün altındadır.",
          ],
          [
            "Kökte D3, sürgünde D1.",
            "İki serinin tepe noktaları ters eşleştirilmiştir.",
          ],
          [
            "Her ikisinde D0; kontrol her zaman en yüksek hormon yanıtıdır.",
            "Verilen pozitif değerler kontrolün üstünde yanıt göstermektedir.",
          ],
          [
            "Kökte D2, sürgünde D2; ortak doz mutlaka ortak optimumdur.",
            "D2’deki 14 ve 22, serilerin en yüksekleri değildir.",
          ],
        ],
        knowledge: ["Deneysel en yüksek yanıt eğrinin tepe değerinden okunur."],
        strategy: "Dozları değil her serinin yanıt büyüklüğünü ayrı sırala.",
        steps: [
          "Kök değerlerinde en büyük 28’i D1 ile eşleştir.",
          "Sürgünde en büyük 31’i D3 ile eşleştir.",
          "İki farklı tepe dozunu aynı zorunlu optimuma dönüştürme.",
        ],
        commonError: "En yüksek dozu otomatik en yüksek yanıt saymak.",
        check: "Her organda seçilen değer kendi serisinin maksimumudur.",
      },
      {
        prompt:
          "Eş fidelerde sağlam tepeyle yan tomurcuk gelişimi düşük; tepe kesilince yüksek; kesik tepeye uygun oksin verilince yeniden düşüktür. Yalnız çözücü verilen kesik kontrolünde gelişim yüksek kalıyor. Hangi ilişki desteklenir?",
        correct:
          "Oksin, tepeyle ilişkili apikal baskınlık düzenine katkı verebilir.",
        reason:
          "Kesme etkisinin uygun oksinle kısmen geri çevrilmesi ve çözücü kontrolü kimyasal düzenleme açıklamasını destekler.",
        wrong: [
          [
            "Tepe yalnız ağırlığıyla yan tomurcukları ezer.",
            "Kesik grupta oksinin etkisi fiziksel tepe ağırlığı olmadan da görülmüştür.",
          ],
          [
            "Çözücü tek başına baskıyı geri getirmiştir.",
            "Çözücü kontrolünde gelişimin yüksek kaldığı verilmiştir.",
          ],
          [
            "Oksin her koşulda bütün yan tomurcukları kalıcı öldürür.",
            "Ölçülen gelişim baskısı kalıcı ölüm veya bütün koşullar için sonuç değildir.",
          ],
          [
            "Deney mevsimsel dormansinin tek nedenini kesin belirlemiştir.",
            "Deney tepeyle ilişkili dallanma düzenini sınar; bütün dormansi nedenlerini değil.",
          ],
        ],
        knowledge: [
          "Apikal baskınlık deneyinde kesme ve hormon geri uygulaması birlikte yorumlanır.",
        ],
        strategy: "Üç müdahaleyi çözücü kontrolüyle eşleştir.",
        steps: [
          "Tepe çıkarılınca yan gelişimin artışını kaydet.",
          "Kesik+oksin ile kesik+çözücü farkını belirle.",
          "Tepe bağlantılı kimyasal baskı katkısını seç.",
        ],
        commonError:
          "Apikal baskınlığı yalnız tepenin mekanik ağırlığına bağlamak.",
        check: "Yanıt oksin etkisini çözücü kontrolünden ayırıyor.",
      },
      {
        prompt:
          "Bir bitkide tepe sağlamken yanal tomurcuk gelişimi baskılanıyor. Başka bir bitkide kış koşullarında tepe ve yan tomurcuklar gelişime ara veriyor. En uygun ayrım nedir?",
        correct:
          "İlk gözlem apikal baskınlıkla; ikinci mevsimsel dormansiyle uyumludur; iki süreç aynı ölçüt değildir.",
        reason:
          "Tepeyle ilişkili yan gelişim baskısı ve çevresel mevsimsel uyku farklı gözlem ölçekleridir.",
        wrong: [
          [
            "İki gözlem de bütün tomurcukların öldüğünü kanıtlar.",
            "Gelişime ara verme veya baskı canlılık kaybı demek değildir.",
          ],
          [
            "Tepe varsa hiçbir mevsimsel sinyal etkili olamaz.",
            "Tepe varlığı çevresel ve hormonal başka sinyalleri dışlamaz.",
          ],
          [
            "Apikal baskınlık yalnız polenin tepeciğe taşınmasıdır.",
            "Bu tanım tozlaşmaya aittir; yan tomurcuk düzeni değildir.",
          ],
          [
            "Dormansi yalnız gövdenin yerçekimine yönelmesidir.",
            "Yerçekimine yönelme gravitropizmadır; gelişime ara verme değildir.",
          ],
        ],
        knowledge: [
          "Apikal baskınlık ve mevsimsel dormansi ilişkili olabilir ama özdeş değildir.",
        ],
        strategy: "Her gözlemi hangi koşulun tanımladığına göre ayır.",
        steps: [
          "İlk gözlemde tepe–yan tomurcuk ilişkisini belirle.",
          "İkincide mevsimsel toplu gelişim duraklamasını kaydet.",
          "İki farklı süreci adlandıran yanıtı seç.",
        ],
        commonError: "Uyuyan her tomurcuğu yalnız tepe baskısıyla açıklamak.",
        check: "İlk ve ikinci gözlem için aynı zorunlu neden kullanılmıyor.",
      },
      {
        prompt:
          "Çeliklere uygun oksin uygulanan grupta ortalama 12 kısa adventif kök, kontrolde 4 daha uzun kök oluşuyor. Hangi sonuç doğrudan verilerle desteklenir?",
        correct:
          "Uygulama kök oluşum sayısını artırmış; tekil kök uzamasının da arttığı söylenemez.",
        reason:
          "Yeni kök sayısı ve köklerin uzunluğu ayrı ölçümlerdir; uygulama grubunda sayı fazla ama kökler kısadır.",
        wrong: [
          [
            "Her kökün uzama hızı kesin üç kat artmıştır.",
            "12/4 kök sayısı oranıdır; tek kökün uzama hızını vermez.",
          ],
          [
            "Kısa kökler bulunduğundan hiç kök oluşmamıştır.",
            "Uygulamada 12 kök oluştuğu açıkça verilmiştir.",
          ],
          [
            "Oksin hiçbir bitkide kök başlatmayı etkileyemez.",
            "Bu deneyde kök sayısı değişimiyle uyumlu bir uygulama etkisi vardır.",
          ],
          [
            "Kontroldeki uzun kökler bütün hücrelerin daha çok bölündüğünü kanıtlar.",
            "Uzunluk tek başına hücre bölünme sayısını belirlemez.",
          ],
        ],
        knowledge: [
          "Yeni kök oluşumu ve mevcut kök uzaması farklı sonuç değişkenleridir.",
        ],
        strategy: "Sayı ve uzunluğu iki ayrı sütunda değerlendir.",
        steps: [
          "Uygulama 12 ve kontrol 4 kök sayısını karşılaştır.",
          "Uygulama köklerinin kısa olduğunu ayrıca koru.",
          "Artan oluşum sayısını seç; uzama artışı ekleme.",
        ],
        commonError: "Kök sayısı artışını tekil kök uzamasının artışı saymak.",
        check: "Yanıt hem yüksek sayı hem kısa kök verisini kapsıyor.",
      },
      {
        prompt:
          "Giberellin sentezi düşük olduğu belirlenen cüce bir fidede uygun dış giberellin uygulaması sürgün uzamasını artırıyor. Hangi yorum uygundur?",
        correct:
          "Hormon eksikliğinin dış uygulamayla azaltılması, uzama düzenindeki giberellin katkısıyla uyumludur.",
        reason:
          "Sentez düşüklüğü ve uygun geri uygulamayla düzelme bu düzenleyicinin rolünü destekler.",
        wrong: [
          [
            "Bütün cüce bitkilerin tek nedeni kesin aynı sentez eksikliğidir.",
            "Bu belirlenmiş fide sonucu bütün kısa bitkilere genellenemez.",
          ],
          [
            "Hormon verilince bitki artık su ve mineral gerektirmez.",
            "Düzenleyici sinyal temel kaynak gereksinimlerini ortadan kaldırmaz.",
          ],
          [
            "Uzama artışı giberellinin şekerin kendisi olduğunu gösterir.",
            "Hormon büyüme sinyalidir; hazır karbon besini değildir.",
          ],
          [
            "Dış giberellin verildiği için çekirdek kromozomları zorunlu iki katına çıkar.",
            "Uzama yanıtı takım sayısının iki katına çıkmasını gerektirmez.",
          ],
        ],
        knowledge: [
          "Uygun hormonla kurtarma eksiklik açıklamasını destekleyebilir.",
        ],
        strategy: "Tanımlanan eksikliği ve ölçülen düzelmeyi eşleştir.",
        steps: [
          "Bu fidede sentez düşüklüğünün ayrıca belirlendiğini al.",
          "Uygun dış uygulamayla uzamanın artışını kaydet.",
          "Sonucu bu eksiklik bağlamına bağla; bütün cüceliğe yayma.",
        ],
        commonError:
          "Tek kurtarma deneyinden bütün kısa bitkiler için aynı neden ilan etmek.",
        check: "Sonuç verilen sentez eksikliği ve uzama ölçümüyle sınırlı.",
      },
      {
        prompt:
          "Tahıl embriyosundan gelen giberellin sinyalinin, depo nişastasını parçalayan enzimlerin sentezini artırdığı verilen bir deneyde hormonun rolü hangisidir?",
        correct:
          "Depo kaynağın kullanımını düzenleyen sinyal; nişastanın veya enzimin kendisi değildir.",
        reason:
          "Giberellin enzim sentez yanıtını uyararak depo maddelerinin kullanılmasına dolaylı katkı verir.",
        wrong: [
          [
            "Nişasta molekülünün glikoz birimidir.",
            "Hormon, depo polisakkaritinin yapısal monomeri değildir.",
          ],
          [
            "Nişastayı doğrudan parçalayan hidroliz enziminin aynısıdır.",
            "Deney hormonun enzim sentezini etkilediğini söyler; ikisini eşitlemez.",
          ],
          [
            "Suyun yerine geçerek çimlenmenin bütün koşullarını sağlar.",
            "Düzenleyici sinyal bütün fiziksel gereksinimleri karşılamaz.",
          ],
          [
            "Enzim artışı görüldüğü için hormon bitkiye hazır ATP vermiştir.",
            "Enzim sentezinin düzenlenmesi dışarıdan enerji molekülü sağlanması değildir.",
          ],
        ],
        knowledge: [
          "Hormonlar enzim ve metabolizma yanıtlarını düzenleyebilir.",
        ],
        strategy: "Sinyal, enzim ve depo substratını ayrı adlandır.",
        steps: [
          "Giberellini ilk sinyal olarak yerleştir.",
          "Enzim sentezindeki artışı hücresel yanıt olarak belirle.",
          "Nişastanın sonraki parçalanmasını ayrı süreç olarak bağla.",
        ],
        commonError: "Düzenleyici hormonu düzenlediği enzimin kendisi saymak.",
        check: "Üç rolün hiçbiri birbirinin yerine yazılmadı.",
      },
      {
        prompt:
          "Eş yapraklara sitokinin veya yalnız çözücü uygulanıyor. Sitokinin grubunda sararma daha geç, diğer koşullar ve gözlem süresi eş. Hangi etkiyle uyumludur?",
        correct: "Sitokininin bu koşulda yaprak yaşlanmasını geciktirmesiyle.",
        reason:
          "Uygun kontrol karşılaştırmasında sararmanın gecikmesi sitokininin yaşlanma düzenine katkısıyla uyumludur.",
        wrong: [
          [
            "Sitokinin her hücrenin sınırsız yaşamasını kesin sağlar.",
            "Gecikmiş sararma sınırsız canlılık kanıtı değildir.",
          ],
          [
            "Sitokinin uygulanınca bitkinin ışığa gereksinimi kalkar.",
            "Yaşlanma yanıtı fotosentezin ışık gereksinimini ortadan kaldırmaz.",
          ],
          [
            "Sararma zamanı değiştiği için bütün hücreler kesin mayoz geçirmiştir.",
            "Renk ve yaşlanma ölçümü mayoz kanıtı değildir.",
          ],
          [
            "Çözücü grubunun aynı kalması hormon uygulamasının etkisini incelemeyi engeller.",
            "Çözücü kontrolü uygulama etkisini ayırmaya yardım eder.",
          ],
        ],
        knowledge: ["Sitokinin uygun bağlamlarda yaşlanmayı geciktirebilir."],
        strategy: "Ölçülen gecikmeyi kontrolle karşılaştır ve kapsamı sınırla.",
        steps: [
          "İki grupta çevre ve sürenin eşitliğini al.",
          "Sararmanın sitokinin grubunda gecikmesini belirle.",
          "Yaşlanma gecikmesini seç; sınırsız ömür ekleme.",
        ],
        commonError: "Gecikmiş sararmayı mutlak yaşlanmazlık saymak.",
        check: "Yorum yalnız ölçülen süre ve yaprak yanıtını açıklıyor.",
      },
      {
        prompt:
          "Bir doku kültüründe verilen kural: oksin en az sitokininin iki katıysa kök, sitokinin en az oksinin iki katıysa sürgün; arada kallus. Oksin 8, sitokinin 3 birimse model sonucu nedir?",
        correct: "Kök yanıtı.",
        reason:
          "8≥2×3 koşulu sağlanır; verilen kültür kuralı kök yanıtını tanımlar.",
        wrong: [
          [
            "Sürgün; sitokinin 3 sıfırdan büyüktür.",
            "Pozitif sitokinin yetmez; sürgün için 3≥16 gerekirdi.",
          ],
          [
            "Kallus; hormon miktarları farklıdır.",
            "Farklı her oran kallus değildir;8/3 en az 2’dir.",
          ],
          [
            "Hiç hücre yok;8+3 değeri tek sayıdır.",
            "Toplamın tek/çift olması verilen kültür kuralında yer almaz.",
          ],
          [
            "Her tür için kesin sekiz kök oluşur.",
            "Model gelişim sınıfı verir; kök sayısı veya bütün türler için sonuç vermez.",
          ],
        ],
        knowledge: [
          "Verilmiş kültür modeli oran eşiklerine göre gelişim sınıfı seçer.",
        ],
        strategy: "Oksini sitokininin iki katıyla karşılaştır.",
        steps: [
          "2×3=6 hesapla.",
          "8’in 6’dan büyük olduğunu belirle.",
          "Kök sınıfını seç; kök sayısı uydurma.",
        ],
        commonError: "Hormon birimini doğrudan kök sayısı saymak.",
        check: "Sonuç yalnız verilen oran kuralının kök dalına ait.",
      },
      {
        prompt:
          "Verilen kültür kuralında sitokinin en az oksinin iki katıysa sürgün; oksin en az sitokininin iki katıysa kök; arada kallus gelişiyor. Oksin 2, sitokinin 7 birim. Sonuç hangisidir?",
        correct: "Sürgün yanıtı.",
        reason:
          "7≥2×2 olduğundan sitokinin baskınlığına tanımlanan sürgün sınıfı seçilir.",
        wrong: [
          [
            "Kök; iki hormon birlikte bulunduğunda yalnız kök oluşur.",
            "Birlikte bulunma değil verilen oran koşulu karar verir.",
          ],
          [
            "Kallus; iki sayının toplamı 9’dur.",
            "Toplam verilen karar kuralı değildir; oran eşikleri kullanılır.",
          ],
          [
            "Kök;7/2 oranı büyük olduğu için oksin fazladır.",
            "Büyük oran sitokinin/oksin oranıdır; hangi hormonun pay olduğu korunmalıdır.",
          ],
          [
            "Kesin yedi sürgün; her sitokinin birimi bir organ üretir.",
            "Model sınıf verir; organ sayısına kalibrasyon yoktur.",
          ],
        ],
        knowledge: [
          "Oran karşılaştırmasında payın hangi hormona ait olduğu korunur.",
        ],
        strategy: "Sitokinini iki oksin miktarıyla karşılaştır.",
        steps: [
          "2×2=4 hesapla.",
          "Sitokinin 7’nin 4’ten büyük olduğunu belirle.",
          "Sürgün yanıtını seçip nicel organ sayısından ayır.",
        ],
        commonError: "Oranı ters hormon adlarıyla yorumlamak.",
        check:
          "Yüksek olan hormon ve verilen sürgün koşulu birlikte doğru kullanıldı.",
      },
      {
        prompt:
          "Bir kültür modelinde iki kat baskınlık kök veya sürgün; aradaki oran kallus olarak veriliyor. X’te oksin 5/sitokinin 4; Y’de oksin 4/sitokinin 5. Hangi sınıflama doğrudur?",
        correct: "İkisi de verilen aralıkta kallus yanıtıdır.",
        reason:
          "X’te 5<8 ve 4<10; Y’de 4<10 ve 5<8 olduğundan iki kat baskınlık yoktur.",
        wrong: [
          [
            "X kök, Y sürgün; en küçük fark bile iki kat baskınlıktır.",
            "5/4 ve 4/5 oranları verilen iki kat eşiklerine ulaşmaz.",
          ],
          [
            "İkisi kök; her ikisinde oksin vardır.",
            "Hormonun bulunması tek başına kök sınıfı için yeterli değildir.",
          ],
          [
            "İkisi sürgün; her ikisinde sitokinin vardır.",
            "Sitokinin varlığı tek başına iki kat baskınlık değildir.",
          ],
          [
            "X ve Y’nin kesin eşit büyüklükte kallus yapacağı ölçülmüştür.",
            "Model yalnız sınıfı verir; mutlak büyüklük eşitliği veya ölçüm vermez.",
          ],
        ],
        knowledge: [
          "Kallus aralığı verilen iki baskınlık eşiğinin arasında kalır.",
        ],
        strategy:
          "Her grupta iki hormonun da iki kat üstün olup olmadığını sınayarak karar ver.",
        steps: [
          "X’te 5’in 8’e ve 4’ün 10’a ulaşmadığını bul.",
          "Y’de 4’ün 10’a ve 5’in 8’e ulaşmadığını bul.",
          "İki grubu da kallus sınıfına koy; boyut eşitliği ekleme.",
        ],
        commonError:
          "Her küçük hormon farkını organ farklılaşması için yeterli saymak.",
        check: "İki grup da eşiklerin arasında, sonuç yalnız sınıf düzeyinde.",
      },
      {
        prompt:
          "Su stresi altında ABA artışıyla stomalar daralıyor. Hangi açıklama su–karbon dengesini doğru korur?",
        correct:
          "Kapanma su kaybını sınırlayabilir; aynı anda CO₂ alımını da sınırlayabilir.",
        reason:
          "Stoma geçidi hem su buharı çıkışı hem uygun CO₂ girişine katkı verdiğinden kapanmanın iki sonucu olabilir.",
        wrong: [
          [
            "Su kaybı azalınca fotosentez her koşulda kesin artar.",
            "CO₂ girişi de sınırlanabileceğinden koşulsuz artış çıkarılamaz.",
          ],
          [
            "ABA su molekülü üreterek bitkinin su gereksinimini tamamen kaldırır.",
            "Hormon su kaynağı değildir; düzenleyici yanıt oluşturur.",
          ],
          [
            "Stoma daralması bütün kütikular kaybı da zorunlu sıfırlar.",
            "Kütikula yolu stoma açıklığıyla aynı yol değildir.",
          ],
          [
            "Bu sonuç ABA’nın her koşulda zararlı olduğunu kanıtlar.",
            "Kuraklıkta su tasarrufu canlılığın korunmasına katkı verebilir.",
          ],
        ],
        knowledge: [
          "Stoma kapanması su tasarrufu ve karbon alımı arasında koşullu denge kurar.",
        ],
        strategy:
          "Aynı geçidin iki farklı madde için rolünü birlikte değerlendir.",
        steps: [
          "ABA yanıtını açıklık azalmasına bağla.",
          "Su buharı kaybı ve CO₂ girişinin iki ayrı akış olduğunu belirle.",
          "İkisini de sınırlayabilen koşullu açıklamayı seç.",
        ],
        commonError: "Azalan su kaybını otomatik fotosentez artışı saymak.",
        check:
          "Yanıt su yararını söylerken karbon alımı sınırlamasını da koruyor.",
      },
      {
        prompt:
          "Bir deneyde tohum dormansisinin sürmesiyle ABA sinyali ilişkili bulunuyor. En doğru yorum hangisidir?",
        correct:
          "ABA dormansiyi destekleyen düzenlemenin parçasıdır; bütün dormansiler yalnız dış kabuktaki ABA’nın yıkanmasına indirgenemez.",
        reason:
          "Dormansi hormonal denge, doku duyarlılığı ve çevreyle ilişkilidir; tek dış kaplama modeli bütün tohumları açıklamaz.",
        wrong: [
          [
            "Bütün tohumlar yalnız suyla bir kez yıkanınca kesin çimlenir.",
            "Dormansi ve çimlenme koşulları tür ve mekanizmaya göre değişebilir.",
          ],
          [
            "Dormansi bütün embriyo hücrelerinin ölmesi demektir.",
            "Canlı tohumda gelişim duraklaması ölümle aynı değildir.",
          ],
          [
            "ABA yalnız gaz hâlindeki meyve olgunlaşma hormonudur.",
            "Gaz hâlindeki temel örnek etilendir; ABA’nın dormansi/stres rolleri vardır.",
          ],
          [
            "ABA varsa hiçbir başka sinyal veya çevre etkili olamaz.",
            "Hormon ve çevre birlikte düzenleme yapabilir.",
          ],
        ],
        knowledge: [
          "Dormansi canlı dokunun gelişim düzenidir; tek evrensel kabuk yıkama mekanizması değildir.",
        ],
        strategy:
          "Desteklenen hormon ilişkisini koşulsuz tek neden iddiasından ayır.",
        steps: [
          "ABA sinyaliyle dormansi ilişkisini kaydet.",
          "Diğer hormonal ve çevresel kapıların dışlanmadığını koru.",
          "Düzenleyici katkıyı seç; bütün türlere tek yıkama reçetesi ekleme.",
        ],
        commonError:
          "Dormansiyi ölü tohum veya tek kabuk kaplaması olarak görmek.",
        check:
          "Yorum ölçülen ilişkiyi koruyor, ölçülmemiş evrensel koşul üretmiyor.",
      },
      {
        prompt:
          "Etilene duyarlı olgunlaşmamış meyvelerle olgun meyve, gaz alışverişi olan ortak kapta tutuluyor. Uygun kontrol kapta olgun meyve yok. Diğer koşullar eş. Ortak kapta olgunlaşmanın hızlanması hangi özellikle uyumludur?",
        correct:
          "Etilenin gaz olarak yayılıp komşu meyvelerin yanıtını etkileyebilmesiyle.",
        reason:
          "Olgunlaşan dokudan çıkan etilen ortak havaya yayılıp duyarlı hedef meyvelere ulaşabilir.",
        wrong: [
          [
            "Oksinin yalnız yerçekimiyle sıvı olarak kap içinde akmasıyla.",
            "Verilen ortak hava ilişkisi gaz etilen açıklamasına uygundur; böyle bir sıvı yol verilmemiştir.",
          ],
          [
            "Giberellinin mutlaka metal bir mineral olmasıyla.",
            "Giberellin organik düzenleyicidir; metal mineral değildir.",
          ],
          [
            "Meyveler arasında polen taşınmasının zorunlu artmasıyla.",
            "Deney meyve olgunlaşmasını ölçüyor; polen/çiçek taşıması verilmemiştir.",
          ],
          [
            "Bir meyvenin hücrelerinin diğer meyveye fiziksel olarak taşınıp yerleşmesiyle.",
            "Gaz sinyalinin yayılması hücre aktarımı gerektirmez.",
          ],
        ],
        knowledge: [
          "Etilen gaz hâlinde hedef dokular arasında ortam yoluyla etki gösterebilir.",
        ],
        strategy: "Temas yerine ortak hava yolunu ve duyarlılığı kullan.",
        steps: [
          "Ortak kapta olgun meyvenin potansiyel etilen kaynağı olduğunu belirle.",
          "Duyarlı meyvelerin aynı gaz ortamını paylaştığını al.",
          "Gaz yayılmasıyla olgunlaşma sinyalini seç.",
        ],
        commonError:
          "Etilenin etkisini mutlaka organlar arasında sıvı damar bağlantısı gerektirir saymak.",
        check:
          "Açıklama ortak hava koşulunu ve verilen meyve duyarlılığını kullanıyor.",
      },
      {
        prompt:
          "Aynı etilen üretim hızındaki iki kapta birinin havalandırması artırılıyor. Gaz kaybı dışında koşullar eş tutuluyor. Havalandırılan kapta etilen derişimi daha düşük. Hangi sonuç doğrudur?",
        correct:
          "Düşük birikim artan uzaklaşmayla açıklanabilir; üretimin durduğu sonucu çıkmaz.",
        reason:
          "Ortam derişimi üretim ve uzaklaşma bilançosuna bağlıdır; üretim hızları eşit verilmiştir.",
        wrong: [
          [
            "Düşük derişim üretimin kesin sıfır olduğunu kanıtlar.",
            "Üretim hızlarının eşit olduğu koşuluyla çelişir.",
          ],
          [
            "Havalandırma etilen moleküllerini oksine dönüştürmüştür.",
            "Verilen mekanizma gazın uzaklaştırılmasıdır; kimyasal hormon dönüşümü yoktur.",
          ],
          [
            "Gaz dışarı çıkıyorsa etilen bitkisel hormon olamaz.",
            "Gaz biçiminde uzaklaşma etilenin bilinen fiziksel özelliğiyle uyumludur.",
          ],
          [
            "İki kapta üretim eşitse derişimler her havalandırmada zorunlu aynıdır.",
            "Uzaklaşma hızları farklı olduğunda birikim farklı olabilir.",
          ],
        ],
        knowledge: [
          "Üretim hızı ile ortamda biriken derişim farklı ölçümlerdir.",
        ],
        strategy: "Bilanço girdisini sabit, çıkışını değişen etken olarak oku.",
        steps: [
          "Üretimin iki kapta eşit verildiğini koru.",
          "Havalandırmanın gaz uzaklaşmasını artırdığını belirle.",
          "Düşük derişimi düşük birikimle açıkla; sentez sıfırı ekleme.",
        ],
        commonError: "Birikim azalmasını sentezin durmasıyla eşitlemek.",
        check: "Sabit üretim koşulu sonuçta değiştirilmedi.",
      },
      {
        prompt:
          "Uygun hormon uygulamasıyla döllenme olmadan meyve geliştiği bir bitki örneği veriliyor. Bu tek gözlem hangi yorumu destekler?",
        correct:
          "Meyve gelişimi hormonal olarak uyarılabilir; meyve varlığı tek başına döllenme gerçekleştiğini kanıtlamaz.",
        reason:
          "Döllenmesiz meyve gelişimi verilen örnekte hormonal düzenleme ile üreme sonucu ayrımını gösterir.",
        wrong: [
          [
            "Meyve varsa her tohum taslağında döllenme kesin olmuştur.",
            "Soruda özellikle döllenme olmadan gelişim veriliyor.",
          ],
          [
            "Hormon uygulaması poleni zorunlu olarak spermle aynı hücre yapmıştır.",
            "Hormonla meyve gelişimi polen ve sperm kimliklerini eşitlemez.",
          ],
          [
            "Bu bitki bütün minerallerini artık meyveden üretir.",
            "Meyve gelişim sinyali mineral ediniminin kaynağını değiştirmez.",
          ],
          [
            "Bir örnek bütün türlerde aynı hormon dozunun çekirdeksizlik sağlayacağını kanıtlar.",
            "Tek örnek tür ve doz koşullarını bütün bitkilere genellemez.",
          ],
        ],
        knowledge: [
          "Meyve gelişimi ve döllenme sonucu bazı verilen örneklerde ayrılabilir.",
        ],
        strategy:
          "Verilen döllenmesiz koşulu değiştirmeden gelişim sonucunu yorumla.",
        steps: [
          "Döllenmenin olmadığını açık kabul olarak kaydet.",
          "Hormon uygulamasıyla meyve gelişimini ölçülen sonuç olarak al.",
          "Meyve varlığını tek başına döllenme kanıtı saymayan yanıtı seç.",
        ],
        commonError: "Meyve görülmesini her zaman döllenme garantisi saymak.",
        check: "Yanıt sorunun döllenmesiz gelişim koşuluyla çelişmiyor.",
      },
      {
        prompt:
          "Oksin–sitokinin oranı organ gelişimini; ABA–giberellin dengesi verilen dormansi yanıtını etkiliyor. Hangi genel çerçeve uygundur?",
        correct:
          "Hormonlar hedef doku ve süreçte etkileşebilir; aynı hormonun tek ve değişmez bir sonucu yoktur.",
        reason:
          "Birlikte ve karşıt düzenlemeler farklı gelişim bağlamlarında yanıtı değiştirebilir.",
        wrong: [
          [
            "Her hormon yalnız tek organda üretilir ve tek iş yapar.",
            "Bitkisel hormonlar çeşitli kaynak ve hedef dokularda çoklu etki gösterebilir.",
          ],
          [
            "İki hormon karşıt etki yapıyorsa kimyasal olarak mutlaka birbirini tamamen yok eder.",
            "Karşıt hücresel yanıt kimyasal nötrleşme zorunluluğu değildir.",
          ],
          [
            "ABA hiçbir koşulda yararlı, oksin hiçbir koşulda engelleyici olamaz.",
            "Yarar ve yanıt yönü doz ve koşula bağlıdır.",
          ],
          [
            "Oran değişimi varsa gelişim evresi ve çevre artık önem taşımaz.",
            "Hormon dengesi diğer gelişim ve çevre etkilerini ortadan kaldırmaz.",
          ],
        ],
        knowledge: [
          "Hormonal düzenleme çoklu sinyal ve bağlama bağlı yanıt içerir.",
        ],
        strategy: "Örnekleri tek etiket yerine etkileşim ilkesiyle birleştir.",
        steps: [
          "İlk örnekte iki hormonun oranını belirle.",
          "İkinci örnekte farklı süreçteki karşıt/ortak düzeni kaydet.",
          "Çoklu ve bağlama bağlı çerçeveyi seç.",
        ],
        commonError: "Hormonları değişmez tek işlevli düğmeler gibi görmek.",
        check: "Genel açıklama iki farklı gelişim bağlamını da kapsıyor.",
      },
    ],
  },
  {
    id: "bitkilerde-hareket",
    topic: "detail-352",
    title: "Bitkilerde hareket: algılama, sinyal ve farklı uzama",
    minutes: 105,
    objectives: [
      "Tropizma ile nastiyi uyaranın yönüne bağımlılık üzerinden ayır.",
      "Koleoptil deneylerinde algılayan uç ile yanıt veren uzama bölgesini ayır.",
      "Asimetrik uzamadan kıvrılma yönünü çıkar ve deney kontrolleriyle gerekçelendir.",
    ],
    source:
      "Aurelia YKS arşivindeki MEBİ AYT Biyoloji hareket özeti; OGM Bitkilerde Hareket I–II sunuları ve konu özetleri; Dersler Cepte Bitkilerin Yapısı karşılaştırılarak hazırlanmış özgün deney şemaları, açıklamalar ve sorular.",
    sections: [
      {
        title: "Hareket, bitkinin yer değiştirmesi olmak zorunda değildir",
        paragraphs: [
          "Bir sürgünün ışığa kıvrılması, kökün nemli bölgeye uzanması veya yaprağın dokunmayla kapanması bitkide hareket örnekleridir. Bütün bitki yerinden ayrılmadan organın konumu değişebilir. Bu değişimin büyümeye mi, turgora mı ve hangi uyarana bağlı olduğunu ayrı sorularla inceleriz.",
          "Önkoşul olarak hücre uzaması, turgor, meristem ve oksinin dokuya bağlı etkisini hatırla. Dış uyaranı algılama, sinyalin iletilmesi ve yanıtın oluşması farklı basamaklardır. Aynı organda ışığı algılayan bölge ile kıvrılan bölge bire bir aynı yer olmak zorunda değildir.",
        ],
      },
      {
        title: "Tropizmanın ayırt edici ölçütü yön ilişkisidir",
        paragraphs: [
          "Tropizma organın büyüme yönünün uyaranın geliş yönüyle ilişkili olmasıdır. Uyarana doğru yönelme pozitif, ondan uzağa yönelme negatif olarak adlandırılır. Pozitif iyi ve negatif zararlı anlamına gelmez; bunlar yön ilişkisi etiketleridir.",
          "Işık soldan sağa alındığında sürgünün kıvrılma yönü de ışığı izleyecek biçimde değişiyorsa yön bağımlılığı araştırılabilir. Yalnız hareketin yavaş veya hızlı olması kesin sınıflama için yeterli değildir. Hangi değişkenin yönüyle neyin yönünün karşılaştırıldığını açıkça belirt.",
        ],
      },
      {
        title: "Asimetrik uzamanın geometrisini kur",
        paragraphs: [
          "Bir sürgünün iki karşı tarafı eşit uzarsa organın düz uzamasıyla uyumlu bir durum oluşur. Sağ taraf daha çok uzarsa sağ taraf dış yayda kalır ve sürgün sola kıvrılır; sol taraf fazla uzarsa sağa kıvrılma beklenir. Daha çok büyüyen tarafa doğru kıvrılır ezberi bu geometriyi ters çevirir.",
          "Özgün modelde sol ve sağ uzama ayrı renk ve kenar çizgileriyle gösterilir. Seçilen ilerleme basamağı büyüme sonucunu kademeli gösterir; gerçek saniye veya milimetre değildir. Kıvrılmayı belirlerken önce uzun tarafı, sonra kısa tarafa yönelen tepeyi işaretle.",
        ],
      },
      {
        title: "Sürgün fototropizmasını koşuluyla açıkla",
        paragraphs: [
          "Tipik koleoptil örneğinde tek yönden ışık uçta algılanır; gölgeli tarafta oksin etkisi ve uygun dozda uzama daha fazla olur. Işık soldaysa sağ taraf daha fazla uzayıp tepe sola yani ışığa yönelir. Bu pozitif fototropizmadır.",
          "Kökün oksin duyarlılığı sürgünden farklıdır; her organ için aynı doz–uzama kuralı otomatik kullanılamaz. Işığın olmadığı tarafta hücrelerin daha çok bölünmesi zorunlu açıklama değildir; bu deneyde asıl karşılaştırılan uzama farkıdır. Oksin ışık olmadan da sentezlenebilir.",
        ],
      },
      {
        title: "Koleoptil kontrolü normal yanıtı belirler",
        paragraphs: [
          "Koleoptil, buğdaygil genç sürgününün koruyucu kılıfıdır; klasik deneyler büyüyen bu yapıyla yapılır. İşlem görmemiş, uygun koşullarda tek yönden ışık alan kontrolün yönelmesi deneyin karşılaştırma zeminidir. Kontrol olmadan uygulama etkisi normal örüntüden ayırt edilemez.",
          "Uç çıkarma, kapak veya ara blok uygulaması yapılırken su, sıcaklık, gelişim evresi ve ışık koşulları eş tutulmalıdır. Yaralanma, mekanik engelleme ve madde geçişi birbirine karışırsa yorum zayıflar. Model her uygulamanın bu ek koşullarını metinle açıklar.",
        ],
      },
      {
        title: "Ucu çıkarmakla opak başlık aynı müdahale değildir",
        paragraphs: [
          "Uç çıkarıldığında uç kaynaklı sinyal ve algılama bölgesi birlikte uzaklaşır. Uygun klasik örnekte uzama azalır ve ışığa kıvrılma kaybolur. Bu tek uygulama, uçta tam olarak hangi kimyasalın bulunduğunu veya sinyalin nasıl taşındığını tek başına kanıtlamaz.",
          "Uç yerindeyken opak başlık ışığın uca ulaşmasını engeller; uç dokusu ve hormon kaynağı korunabilir. Bu durumda yönlü yanıt kaybolurken simetrik uzama sürdürülebilir. Yönelme yok sonucunu her durumda hiç büyüme yok ile aynı sayma.",
        ],
      },
      {
        title: "Saydam başlık, kapak etkisi kontrolüdür",
        paragraphs: [
          "Uçta saydam başlık varken yönelme sürüp opak başlıkta kayboluyorsa kapak bulunmasından çok ışığın uca ulaşması önem kazanır. Saydam kapak uygun havalanma ve mekanik koşullarla kullanılmış olmalıdır. Kapak renklerini ezberlemek yerine deneyde değişen ışık geçirgenliğini oku.",
          "Alt bölüm opak bir kılıfla örtülüp uç açık bırakıldığında yönelmenin sürmesi uç algısını destekler. Modelde alt kılıfın büyümeyi fiziksel olarak kısıtlamadığı kabul edilir. Sonuç bütün bitkilerin yalnız uç hücrelerinde ışık algılayabildiği evrensel bir iddia değildir; bu koleoptil deneyinin yorumudur.",
        ],
      },
      {
        title: "Jelatin ve mika kimyasal iletiyi sınar",
        paragraphs: [
          "Uç ile alt bölüm arasına kimyasalların geçebildiği jelatin blok konduğunda yanıtın sürmesi, fiziksel hücre temasının bütünüyle kesilse bile taşınabilir sinyalin geçebildiği açıklamasıyla uyumludur. Geçirimsiz mika tüm enine bağlantıyı kestiğinde sinyal geçişi engellenebilir.",
          "Bu iki uygulamanın karşılaştırması sinyalin taşınabilir kimyasal niteliğini destekler. Jelatinin enerji üretip sürgünü yönlendirdiği veya mikanın ışığı emdiği sonucu tek başına çıkmaz. Nerede bariyer olduğu ve kimyasal geçişe izin verip vermediği asıl ölçüttür.",
        ],
      },
      {
        title: "Agar blokta sinyali uçtan ayır",
        paragraphs: [
          "Uç dokusu bir süre agar üzerinde tutulunca uç kaynaklı büyüme düzenleyici madde agara geçebilir. Sonra bu agar, ucu çıkarılmış koleoptilin üstüne uygulanabilir. Oksin içermeyen agar ayrı kontrol olmalıdır; yalnız jel kullanmakla hormonlu jel kullanmak aynı koşul değildir.",
          "Merkeze yerleştirilen uygun oksinli agar simetrik uzama sağlayabilir. Karanlıkta bile bu yanıt, ışığın oksin sentezi için zorunlu olduğu iddiasını sınırlar. Agarın büyüme sinyali taşıdığını göstermekle bütün hormonların aynı yolla hareket ettiğini kanıtlamak farklı şeylerdir.",
        ],
      },
      {
        title: "Yandaki agar kıvrılma yönünü sınar",
        paragraphs: [
          "Oksinli agar kesik ucun sol yarısına konursa verilen sürgün dozunda sol tarafta uzama daha çok olur; tepe sağa kıvrılabilir. Sağ yarıya konursa ters yönde kıvrılma beklenir. Bu düzenek karanlıkta yapıldığında yön farkı ışık yönünden bağımsız oluşturulur.",
          "Elde edilen kıvrılma, asimetrik kimyasal dağılımın büyüme farkı yaratabileceğini destekler. Karanlıkta oksinli agarın yol açtığı yönelim otomatik olarak fototropizma diye adlandırılmaz; ışık uyaranı verilmemiştir. Deney taklidi ile doğal uyaranın adı ayrı tutulur.",
        ],
      },
      {
        title: "Gravitropizmada referans yerçekimidir",
        paragraphs: [
          "Köklerin çoğunda yerçekimi doğrultusunda büyüme pozitif gravitropizma; sürgünde ters yönde büyüme negatif gravitropizma örneğidir. Saksıyı yatırmak organın yeni yerçekimi yönüne göre yanıtını incelemek için kullanılabilir. Ekranın altı değil fiziksel yerçekimi doğrultusu referanstır.",
          "Yatay bir organda alt ve üst tarafta oksin dağılımı farklılaşabilir; kök ve sürgünün doz yanıtı farklı olduğundan kıvrılma yönleri de farklı olabilir. Bunu oksinin yalnız yerçekimiyle su gibi aktığı iddiasıyla açıklama. Deneyde ışık yönü de değişiyorsa iki uyaranın etkisini ayırmak gerekir.",
        ],
      },
      {
        title: "Hidrotropizma ve kemotropizmayı uyaranla ayır",
        paragraphs: [
          "Kökün daha nemli bölgeye yönelmesi hidrotropizma; belirli bir kimyasal gradiyente yaklaşma veya uzaklaşması kemotropizmadır. Su gereksinimi ile belirli iyonun etkisi aynı deneyde karışabilir; ortamın hangi özelliğinin değiştirildiğini açıkça tanımla.",
          "Polen tüpünün uygun kimyasal işaretlerle yönlenmesi de yönlü büyüme için bir örnektir. Kökün çok yüksek tuz bölgesinden uzaklaşması canlı için yararlı bir negatif yanıt olabilir. Pozitif ve negatif etiketleri yarar–zarar yargısı yerine uyaran yönüne göre kullan. Yaralanmaya bağlı yönlü büyüme travmatropizma olarak ele alınır. Örneğin sağ yandaki yara bölgesinden uzağa, sola yönelerek büyüdüğü gözlenen bir sürgünde uyaran yaralanmadır. Tepkiyi adlandırmak için yalnız yara bulunması değil, büyümenin yaraya göre yönü de gözlenmelidir. Bu örnek, her yaralanmanın bütün türlerde aynı yönü oluşturduğunu veya bütün onarım tepkilerinin tek yıkamayla durduğunu göstermez.",
        ],
      },
      {
        title: "Temasa büyüyerek sarılma tigmotropizmadır",
        paragraphs: [
          "Sarılıcı bitkinin sülük veya uygun sürgününün bir desteğe temas etmesiyle farklı büyüyüp desteğe sarılması tigmotropizma örneğidir. Tepkinin geometrisi temasın yeri ve yönüyle ilişkilidir. Burada büyüme bileşeni ve uyarana bağlı yön değişimi birlikte düşünülür.",
          "Küstüm otu yaprağının dokununca kapanması da temas uyaranı taşır ama aynı sınıf olmak zorunda değildir. Kapanmanın yönü dokunmanın sağdan veya soldan gelmesiyle aynı biçimde izlenmiyorsa nasti örneği olabilir. Uyaranın adı tek başına tropizma/nasti ayrımını yapmaz.",
        ],
      },
      {
        title: "Nastide yönü organın yapısı belirler",
        paragraphs: [
          "Nasti, uyaranın geliş yönüne bağlı olmayan konum yanıtıdır. Işık, sıcaklık veya dokunma gibi uyaranlar etkili olabilir; tepkinin biçimi organın yapısal düzenine bağlıdır. Turgor değişimleri birçok hızlı nastiye katılır; bazı nasti hareketlerinde farklı büyüme de rol alabilir.",
          "Bu nedenle bütün nastiler yalnız turgorla, bütün tropizmalar her zaman daha yavaş olur gibi mutlak ayrımlar güvenilir değildir. Temel sınıflama uyaranın yönüne bağımlılıktır. Organ düzeyinde bir yanıtı bütün bitkinin bütün kısımları aynı anda hareket ediyor diye genişletme.",
        ],
      },
      {
        title: "Fotonasti ve termonastide açılma yönünü sorgula",
        paragraphs: [
          "Bazı çiçeklerin ışık/karanlık durumuna bağlı açılıp kapanması fotonasti; sıcaklık değişimine bağlı açılıp kapanması termonasti örneğidir. Çiçeğin yapısına bağlı aynı açılma biçimi, ışık kaynağının sağa veya sola taşınmasıyla o yöne dönmüyorsa yön bağımsızlık kanıtı güçlenir.",
          "Sıcaklık ya da ışığın hangi eşikte yanıt oluşturduğu tür ve koşula bağlıdır. Bir kaynakta verilen lale sıcaklık aralığı bütün türlerin evrensel eşiği değildir. Örnek bitkiyi ve ölçülen yanıtı öğren; gözlemden daha geniş eşikler veya bütün gün için zorunlu davranış çıkarma.",
        ],
      },
      {
        title: "Sismonastide hızlı turgor yanıtını gör",
        paragraphs: [
          "Küstüm otuna dokunulduğunda yaprakçıkların kapanması ve yaprak sapının sarkması motor bölgelerdeki iyon ve su hareketleriyle turgor değişimine bağlanabilir. Bu, yeni yaprak dokusu oluşturmakla aynı hızda bir büyüme olayı değildir. Hareket organ düzeyinde gerçekleşir.",
          "Yaprak uygun koşullarda eski konumuna dönebilir; her uyarıda tüm hücreler ölmez. Böcek kapan gibi farklı örneklerde mekanik düzenek ve uyarı eşikleri değişebilir. Aynı genel ad altında bütün türlerde aynı hücresel ayrıntıyı zorunlu kabul etmeden verilen düzeni açıkla.",
        ],
      },
      {
        title: "Düzenek sonucunu üç soruyla çöz",
        paragraphs: [
          "Önce algılama alanı açık mı, sonra sinyal geçebilir mi, en sonunda iki tarafın büyümesi eşit mi diye sor. Opak uçta ışık algısı, mikada kimyasal yol, yandaki agarda dağılım değişir. Bu üç müdahaleyi aynı neden diye etiketlemek deneyin asıl bilgisini kaybettirir.",
          "Modelde aşamayı sıfıra aldığında eğrilik yoktur; sonraki aşamalarda öngörülen büyüme farkı görünür. Başlangıçta düz görünmek sonucun da düz kalacağını göstermez. Kontrol, müdahale ve zaman basamağını birlikte kullanarak tahminini gerekçelendir.",
        ],
      },
      {
        title: "Uyaranı değiştirerek sınıflamayı sınayabilirsin",
        paragraphs: [
          "Bir organın hareket yönü uyaran yönü değişince düzenli olarak değişiyorsa tropizma açıklaması güçlenir. Hareket biçimi organın yapısına bağlı aynı kalıyor, yalnız başlama koşulu uyaranla değişiyorsa nasti açıklaması güçlenir. Deneyde şiddet, sıcaklık ve zaman gibi etkenleri eş tut.",
          "Sonucun adını söylemekten sonra mekanizmayı ekle: nerede algılandı, ne iletildi, hangi hücrede ne değişti? Bir sürgündeki asimetrik uzama ve bir yapraktaki turgor değişimi aynı genel hareket amacına hizmet edebilir ama farklı kanıtlarla açıklanır.",
        ],
      },
    ],
    examples: [
      {
        title: "İşaretlerden uzama bölgesini bul",
        prompt:
          "Bir koleoptilin tabandan uca doğru dört ardışık işaret aralığı başlangıçta 2,2,2,2 mm; aynı sürenin sonunda 2,3,5,2 mm. Kalıcı işaretlerin silinmediği ve aralıkların aynı bölgeleri izlediği verilmiş. En çok boy artışı hangi aralıkta? Uçta ışık algılanmasıyla bunu nasıl ayırırsın?",
        strategy: "Her aralığın kendi önce/sonra farkını hesapla.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "Farkları sırasıyla 0,1,3,0 mm bul.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "En büyük artışın üçüncü aralıkta 3 mm olduğunu belirle; toplam artış 4 mm’dir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Işığı algılayan uç bilgisi büyüyen her noktanın uçta olduğunu göstermez; algı ile uzama konumu ayrı olabilir.",
          },
        ],
        answer: "Üçüncü aralık; toplam boy artışı 4 mm.",
        check:
          "Mutlak son uzunluğu değil aynı aralığın artışını karşılaştırdın mı?",
        pitfall:
          "Işık uçta algılanıyorsa bütün uzamanın yalnız en uçta olduğunu sanmak.",
      },
      {
        title: "Üç basamaktan hangisi aksıyor?",
        prompt:
          "Üç eş koleoptilde uç ışık algısı ve alt bölüme işaretli oksin ulaşması ayrı ölçülmüş. X: algı var, sinyal ulaşmış, iki kenar 2/2 birim uzamış. Y: algı var, alt bölüme sinyal ulaşmamış,0/0 uzama. Z: yönlü algı yok ama dışarıdan eş sinyal var,2/2 uzama. Hangi grupta iletim basamağı özellikle araştırılmalı?",
        strategy: "Algı, iletim ve kenar farkını üç ayrı ölçüm olarak oku.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "X’in algı ve iletimine rağmen eşit uzamayla düz kalabileceğini belirle.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Y’de algı varken aşağı sinyalin bulunmamasını iletim basamağına yerleştir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Z’de dış sinyalin simetrik büyümeyi sağladığını ayır; Y’nin sorununu yalnız ışık algısı eksikliği diye adlandırma.",
          },
        ],
        answer:
          "İletim için öncelikli grup Y; X ve Z’de eşit uzama ayrı bir durumdur.",
        check: "Y’de ölçülmüş algıyı sonuçtan silmedin mi?",
        pitfall:
          "Kıvrılma olmayan her grupta aynı algılama kusurunu varsaymak.",
      },
      {
        title: "Yerçekimi etkisini ışıkla karıştırma",
        prompt:
          "Eş fidelerde K grubu dik saksıda karanlıkta, L grubu yatık saksıda karanlıkta; M grubu yatık saksıda yandan ışıkta tutuluyor. Su ve sıcaklık eş. Kökün saksı eksenine göre yeniden yönlenmesini incelerken hangi çift yerçekimine göre konum değişimini daha temiz ayırır?",
        strategy: "Tek değişkeni koruyan karşılaştırmayı seç.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "K ve L’de ışık koşulunun aynı karanlık olduğunu kaydet.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Bu ikisinde temel farkın organın yerçekimine göre başlangıç konumu olduğunu belirle.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "M ile karşılaştırmada yandan ışık ek uyaranı bulunduğunu söyle; L–M tek başına yalnız yerçekimi etkisi vermez.",
          },
        ],
        answer:
          "K–L daha temiz konum karşılaştırması; M ek ışık kontrolü gerektirir.",
        check:
          "Saksı yönüyle ışık koşulunu aynı anda değiştiren çifti seçmedin mi?",
        pitfall:
          "İki uyaran birlikte değişirken kıvrılmayı yalnız birine bağlamak.",
      },
      {
        title: "Aynı yön aynı toplam uzama değildir",
        prompt:
          "Karanlıkta verilen iki asimetrik oksinli agar düzeninde ölçülen sol/sağ ek uzamalar A’da 3/7, B’de 5/9 şematik birim. Bu aralıkta uzun kenarın dış yayda kaldığı kabul. Hangi ortak ve farklı sonuçlar çıkar?",
        strategy: "Kenar farkı ve toplam uzamayı ayrı hesapla.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "A’da sağ−sol=4 ve toplam 10; B’de sağ−sol=4 ve toplam 14 bul.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "İkisinde de sağ fazla olduğundan sola kıvrılma yönü ortaktır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Toplam uzama farklıdır; aynı farktan gerçek açı veya bütün şeklin kesin eşitliği verilmez.",
          },
        ],
        answer:
          "Yön ikisinde sola; toplamlar 10 ve 14, gerçek açı eşitliği bilinmiyor.",
        check: "Farkı toplamla ve yönü ölçülmemiş açıyla karıştırdın mı?",
        pitfall:
          "Aynı kıvrılma yönünü bütün büyüme miktarlarının eşitliği saymak.",
      },
      {
        title: "Aynı temas, iki farklı sınıflama",
        prompt:
          "A sürgünü destekle temas ettiği tarafta farklı büyüyerek desteğe sarılıyor. B yaprağı sağdan veya soldan dokunulunca aynı içe kapanma biçimini gösteriyor. Nasıl ayırırsın?",
        strategy: "Uyaran adını değil yön ilişkisini karşılaştır.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "A’da temas yeriyle yönlü büyümenin ilişkisini belirle.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "B’de uyaran yönü değişse de aynı kapanma biçimini kaydet.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "A tigmotropizma; B dokunma/sarsıntı kaynaklı nastiyle uyumludur.",
          },
        ],
        answer: "A tropizma, B nasti.",
        check: "İkisinde de temas var diye aynı gruba koydun mu?",
        pitfall: "Sadece uyaran türüne göre tropizma/nasti kararı vermek.",
      },
      {
        title: "Turgor yanıtında kayıp ve geri dönüşü oranla",
        prompt:
          "Bir yaprağın motor bölgesinde verilen hacim endeksi dokunma öncesi 100, kapanma sırasında 70, toparlanma sırasında 95. İşaretler arası kalıcı doku uzunluğu değişmemiş; iyon ve su hareketi ayrıca gözlenmiş. İlk kayıp yüzdesi ve kaybın geri kazanılan payı nedir?",
        strategy:
          "Başlangıca göre kayıp ile kaybedilen miktara göre geri kazanımı ayrı oranla.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "İlk kaybı 100−70=30 ve başlangıcın%30’u olarak bul.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Geri kazanılan miktarı 95−70=25; kaybın 25/30’u yani yaklaşık%83,3’ü olarak hesapla.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Kalıcı uzama ölçülmemesi ve iyon–su verisi bu örnekte geri dönebilen turgor yanıtıyla uyumludur; hacim endeksini yeni hücre sayısı yapma.",
          },
        ],
        answer:
          "İlk kayıp%30; kaybedilen miktarın yaklaşık%83,3’ü geri kazanılmış.",
        check: "İkinci yüzde için paydayı 100 yerine kayıp 30 seçtin mi?",
        pitfall: "Hacim değişimini kalıcı yeni doku üretimiyle eşitlemek.",
      },
    ],
    recall: [
      {
        prompt: "Tropizma ve nasti için en güvenilir ayırt edici ölçüt nedir?",
        answer: "Hareket yönünün uyaranın geliş yönüne bağlı olup olmaması.",
      },
      {
        prompt: "Sağ taraf daha çok uzayan sürgün hangi tarafa kıvrılır?",
        answer: "Daha uzun sağ taraf dış yayda kalır; tepe sola kıvrılır.",
      },
      {
        prompt: "Opak uç başlığıyla ucu çıkarmayı niçin aynı saymazsın?",
        answer:
          "Birinde ışık algısı engellenirken uç dokusu korunabilir; diğerinde uç dokusu ve sinyal kaynağı uzaklaştırılır.",
      },
      {
        prompt: "Agarın ortada ve yanda verilmesi neyi sınar?",
        answer:
          "Aynı büyüme düzenleyici sinyalin simetrik ve asimetrik dağılımının uzama ve kıvrılmaya etkisini.",
      },
      {
        prompt:
          "Karanlıkta hormonlu agarla büyüme hangi basit iddiayı sınırlar?",
        answer:
          "Oksin üretimi/etkisi ve uzama için ışığın her durumda zorunlu olduğu iddiasını.",
      },
      {
        prompt:
          "Bütün nastileri yalnız hızlı turgor hareketi diye tanımlar mısın?",
        answer:
          "Hayır; birçok hızlı örnekte turgor vardır, bazı örneklerde büyüme de katılır. Temel ölçüt yön bağımsızlığıdır.",
      },
    ],
    items: [
      {
        prompt:
          "Işık kaynağı soldan sağa taşındığında bir sürgünün büyüyerek kıvrılma yönü de ışığa dönüyor. Diğer koşullar eş. Hangi sınıflama uygundur?",
        correct: "Pozitif fototropizma.",
        reason:
          "Büyümenin yönü ışığın geliş yönünü izler; ışığa doğru olması pozitiftir.",
        wrong: [
          [
            "Fotonasti; ışık varsa her hareket nasti olur.",
            "Uyaran türü tek başına yetmez; burada yön bağımlılığı verilmiştir.",
          ],
          [
            "Negatif fototropizma; ışığa yaklaşma negatiftir.",
            "Uyarana doğru yönelme pozitif olarak adlandırılır.",
          ],
          [
            "Pozitif gravitropizma; her kıvrılma yerçekimine bağlıdır.",
            "Değiştirilen yön ışık yönüdür; yerçekimi yanıtı verilmemiştir.",
          ],
          [
            "Sismonasti; yavaş büyüme dokunma olmadan sarsıntıdır.",
            "Sarsıntı verilmemiştir ve yönlü ışık büyümesi tanımlanmıştır.",
          ],
        ],
        knowledge: ["Tropizma uyaran yönüne bağlı büyüme yönelimidir."],
        strategy: "Uyaranın adıyla yön ilişkisinin ikisini kullan.",
        steps: [
          "Değişen ışık yönünü belirle.",
          "Sürgünün büyüme yönünün onu izlediğini kaydet.",
          "Işığa doğru yönelmeyi pozitif fototropizma adlandır.",
        ],
        commonError: "Işık kaynaklı bütün hareketleri fotonasti saymak.",
        check: "Sınıflama hem ışığı hem ona doğru yön bağımlılığını kapsıyor.",
      },
      {
        prompt:
          "Bir çiçeğe sağdan ve soldan aynı şiddette ışık uygulandığında çiçek aynı açılma biçimini gösteriyor; kaynak yönüne dönmüyor. Bu veri hangi özellikle uyumludur?",
        correct: "Işıkla başlatılan yön bağımsız nastiyle.",
        reason:
          "Hareket biçimi uyaranın geliş yönünü izlemediğinden fotonasti açıklamasıyla uyumludur.",
        wrong: [
          [
            "Her durumda pozitif fototropizmayla.",
            "Işığa yönelme yerine aynı açılma biçimi verilmiştir.",
          ],
          [
            "Yalnız yerçekimi yönüne büyümeyle.",
            "Deneyde yerçekimi değişkeni ve ona yönelim tanımlanmamıştır.",
          ],
          [
            "Mitozun kesin tamamen durmasıyla.",
            "Yön bağımsız hareket hücre bölünmesinin kesin yokluğunu vermez.",
          ],
          [
            "Işığın hiçbir biyolojik etkisi olmadığıyla.",
            "Işık hareketi başlatıyor; etkisizlik sonucu veriye aykırıdır.",
          ],
        ],
        knowledge: ["Nasti uyaranın yönüne bağımsız yanıtla tanımlanır."],
        strategy: "Başlama uyaranıyla hareketin yönünü ayrı oku.",
        steps: [
          "Işığın açılmayı başlattığını kaydet.",
          "Sağ-sol uygulamasında aynı biçimin korunduğunu belirle.",
          "Yön bağımsız nasti açıklamasını seç.",
        ],
        commonError: "Hareketi başlatan ışığı mutlaka ışığa dönüş saymak.",
        check: "Yanıt ışığın etkisini kabul ederken yön bağımlılığı eklemiyor.",
      },
      {
        prompt:
          "Başlangıç kenar uzunlukları eşit bir sürgünün sol tarafı 5, sağ tarafı 2 şematik birim uzuyor. Dış/İç yay geometrisine göre tepe hangi tarafa kıvrılır?",
        correct: "Sağa; daha çok uzayan sol taraf dış yayda kalır.",
        reason:
          "Uzun kalan kenar kıvrımın dışında, kısa kenar içinde yer alır.",
        wrong: [
          [
            "Sola; her sürgün daha çok uzayan tarafa döner.",
            "Bu geometri ters kurulmuştur; uzun sol kenar dış yaydadır.",
          ],
          [
            "Kesin ışığa; ışığın yönü verilmeden belirlenir.",
            "Kıvrılma yönü bulunabilir ama ışık uyaranının yönü verilmemiştir.",
          ],
          [
            "Düz; başlangıç kenarlarının eşit olması son farkı siler.",
            "Sonraki 5 ve 2 uzama farkı simetriyi bozar.",
          ],
          [
            "Yön bilinemez; iki kenarın uzaması hiçbir bilgi sağlamaz.",
            "Verilen tipik büyüme geometrisinde kenar farkı yönü belirlemeye yeterlidir.",
          ],
        ],
        knowledge: ["Asimetrik uzamada uzun taraf dış yayda kalır."],
        strategy: "Uzama farkından önce uzun kenarı işaretle.",
        steps: [
          "Sol 5’in sağ 2’den büyük olduğunu belirle.",
          "Sol kenarı dış, sağı iç yay olarak yerleştir.",
          "Tepeyi kısa sağ tarafa kıvrılmış seç.",
        ],
        commonError: "Kıvrılmayı uzun kenarın yönüyle eşitlemek.",
        check: "Yönün hesabına verilmemiş ışık tarafı eklenmedi.",
      },
      {
        prompt:
          "Tipik koleoptil soldan ışık alıyor. Verilen dozda gölgeli sağ tarafta oksin etkisi ve uzama daha çok. Hangi sonuç beklenir?",
        correct: "Tepe sola, ışığa doğru kıvrılır.",
        reason:
          "Fazla uzayan sağ kenar dış yayda kalır; tepe kısa sol tarafa yönelir.",
        wrong: [
          [
            "Sağa; oksinin çok olduğu tarafa kıvrılır.",
            "Daha çok uzayan taraf dış yaydadır; tepe ters kısa tarafa döner.",
          ],
          [
            "Düz; iki tarafta oksin mutlaka tamamen eşittir.",
            "Soruda sağ etkisinin daha yüksek olduğu açıkça verilmiştir.",
          ],
          [
            "Sola yalnız ışık oksini kimyasal olarak yok ederse döner.",
            "Böyle bir kimyasal yok etme koşulu verilmemiştir.",
          ],
          [
            "Kökün her dozda aynı yanıtı verdiği kesinleşir.",
            "Veri tipik sürgün dozuna aittir; kökün duyarlılığı farklı olabilir.",
          ],
        ],
        knowledge: [
          "Verilen sürgün dozunda oksin asimetrisi uzama farkına bağlanır.",
        ],
        strategy: "Gölgeli tarafı uzun dış yay olarak konumlandır.",
        steps: [
          "Işığın solda, gölgeli tarafın sağda olduğunu belirle.",
          "Sağın daha çok uzamasını dış yayla eşleştir.",
          "Sola yani ışığa yönelmeyi seç.",
        ],
        commonError:
          "Oksin biriken tarafta büyüme artışını o tarafa kıvrılma sanmak.",
        check: "Işık, hormon etkisi, uzun kenar ve tepe yönü tutarlı sırada.",
      },
      {
        prompt:
          "Tek yönden ışık alan eş koleoptillerden kontrol yöneliyor; ucu çıkarılmış grup yönelmiyor ve uzaması çok azalıyor. Bu tek karşılaştırma hangi çıkarımı destekler?",
        correct:
          "Uç bölgesi normal yanıt için önemlidir; tek başına sinyalin tam kimyasal kimliğini kanıtlamaz.",
        reason:
          "Uç çıkarma algılama ve sinyal kaynağını birlikte etkileyebilir; özgül kimliği başka deneyler ayırır.",
        wrong: [
          [
            "Sinyalin kesin oksin olduğu yalnız bu iki fotoğrafla kimyasal olarak ölçülmüştür.",
            "Kimyasal kimlik bu müdahaleyle doğrudan ölçülmez.",
          ],
          [
            "Uç bölgesi normal yanıtla tamamen ilişkisizdir.",
            "Uç çıkarma sonrası yanıtın kaybı ilişkisizlik iddiasını desteklemez.",
          ],
          [
            "Koleoptilin bütün hücreleri zorunlu anında ölmüştür.",
            "Azalan uzama ve yönelme bütün hücre ölümü kanıtı değildir.",
          ],
          [
            "Ucu çıkarmak ışık kaynağını sağa taşımakla aynı işlemdir.",
            "Müdahale organ dokusuna yapılmıştır; ışık yönü değişmemiştir.",
          ],
        ],
        knowledge: [
          "Tek müdahale bir bölgenin önemini gösterebilir; bütün mekanizmayı tek başına çözmez.",
        ],
        strategy: "Uzaklaştırılan yapıyla kaybolan yanıtı bağla.",
        steps: [
          "Kontrolün normal yöneldiğini belirle.",
          "Uç çıkarma grubundaki yanıt kaybını kaydet.",
          "Uç önemini seç; ölçülmemiş kimlik ve hücre ölümü ekleme.",
        ],
        commonError:
          "Bir çıkarma deneyinden bütün sinyal kimyasını kesinleştirmek.",
        check:
          "Sonuç yalnız iki gruplu karşılaştırmanın kanıt gücünde kalıyor.",
      },
      {
        prompt:
          "Opak uç başlığında yönelme yokken saydam uç başlığında ve yalnız alt bölümü opak kaplı koleoptilde yönelme sürüyor. Kılıfların mekanik büyümeyi engellemediği verilmiştir. Hangi açıklama güçlüdür?",
        correct:
          "Bu koleoptil deneyinde uca ışık ulaşması yönlü yanıt için önemlidir.",
        reason:
          "Saydam kapak ve açık uçlu alt kılıf, opak uç uygulamasını ışık algısı açısından ayırır.",
        wrong: [
          [
            "Bütün bitkilerin bütün organları ışığı yalnız kökte algılar.",
            "Deney koleoptil ucuna aittir; böyle bir evrensel kök sonucu vermez.",
          ],
          [
            "Opak kapak hormon kaynağını fiziksel olarak çıkarır.",
            "Kapak ucu yerinde bırakır; çıkarma müdahalesi değildir.",
          ],
          [
            "Alt kılıf bütün büyümeyi kesin engeller.",
            "Soruda mekanik engelleme olmadığı ve yönelmenin sürdüğü belirtilmiştir.",
          ],
          [
            "Saydam kapak ışığı geçirmediği için sonuç opakla aynıdır.",
            "Saydam kapakta yönelmenin sürdüğü açıkça verilmiştir.",
          ],
        ],
        knowledge: [
          "Kapak kontrolleri algılama bölgesine ışık ulaşmasını sınar.",
        ],
        strategy: "Üç grupta uca ışık varlığını karşılaştır.",
        steps: [
          "Opak uçta uca ışığın kapandığını belirle.",
          "Saydam uç ve alt kılıfta uca ışığın sürdüğünü kaydet.",
          "Bu deneyde uç algısını destekleyen açıklamayı seç.",
        ],
        commonError: "Opak kapakla uç çıkarma müdahalesini eşitlemek.",
        check: "Açıklama üç grubun bütün sonuçlarını kapsıyor.",
      },
      {
        prompt:
          "Uç yerindeyken opak başlık tek yönlü ışık algısını engelliyor; uç oksin üretmeye devam ediyor. Modelde iki tarafa eşit sinyal ulaşıyor. Ne beklenir?",
        correct:
          "Simetrik uzama sürebilir; yönelme olmaması büyümenin zorunlu sıfırı değildir.",
        reason:
          "Hormon kaynağı korunup dağılım eşit olduğunda büyüme ile yönlü kıvrılma ayrılabilir.",
        wrong: [
          [
            "Yönelme yoksa uzama mutlaka sıfırdır.",
            "Verilen eşit sinyal simetrik uzamayı destekleyebilir.",
          ],
          [
            "Opak başlık her iki tarafta zorunlu eşitsiz sinyal yaratır.",
            "Soruda iki tarafa eşit sinyal ulaştığı belirtilmiştir.",
          ],
          [
            "Uç hormon üretiyorsa ışık algısı kesin engellenmemiştir.",
            "Hormon üretimi ve yönlü ışık algısı ayrı süreçlerdir.",
          ],
          [
            "Bütün hormonlar sadece ışıkta sentezlenebilir.",
            "Bu verilen uç karanlık başlık altında da oksin üretmektedir.",
          ],
        ],
        knowledge: ["Büyüme sinyali ile asimetrik yönlü yanıt farklıdır."],
        strategy: "Eşit sinyali eşit kenar uzamasıyla ilişkilendir.",
        steps: [
          "Uç kaynağının korunduğunu al.",
          "Sol ve sağa eşit sinyali simetrik uzamayla bağla.",
          "Düz büyüme olasılığını seç; hiç büyüme zorunluluğu ekleme.",
        ],
        commonError: "Kıvrılma kaybını mutlaka bütün uzamanın kaybı saymak.",
        check: "Yanıt hormon üretimi ve ışık algısını birbirinden ayırıyor.",
      },
      {
        prompt:
          "Uç ve alt bölüm arasına konan jelatin kimyasal geçişe izin veriyor; aynı yeri tamamen kesen mika vermiyor. Jelatinde yönelme var, mikada yok. Hangi çıkarım uygundur?",
        correct:
          "Taşınabilir kimyasal sinyalin geçişi yanıt için önemli olabilir.",
        reason:
          "Geçirgen ve geçirimsiz bağlantıların farklı sonucu maddesel sinyal açıklamasını destekler.",
        wrong: [
          [
            "Mika oksin üretimini artırarak her iki kenarı daha çok uzatmıştır.",
            "Verilen sonuç yönelme kaybı; böyle bir üretim ölçümü yoktur.",
          ],
          [
            "Jelatin mutlaka ışığı enerjiye çeviren canlı organdır.",
            "Jelatin kimyasal geçiş ortamı olarak verilmiştir.",
          ],
          [
            "Hücre teması kesildiği her durumda kimyasal sinyal geçemez.",
            "Jelatinde fiziksel ayrılmaya rağmen geçiş ve yanıt vardır.",
          ],
          [
            "Sonuç yalnız iki bitkinin farklı tür olmasıyla açıklanır.",
            "Eş koleoptillerde bağlantı geçirgenliği karşılaştırılıyor; tür farkı verilmemiştir.",
          ],
        ],
        knowledge: [
          "Bariyerin kimyasal geçirgenliği sinyal yolunu sınamakta kullanılabilir.",
        ],
        strategy: "İki bariyeri yalnız geçiş özelliğiyle karşılaştır.",
        steps: [
          "Jelatinde geçişe izin verildiğini kaydet.",
          "Mikada aynı yolun kesildiğini belirle.",
          "Yanıt farkını taşınabilir kimyasal sinyalle ilişkilendir.",
        ],
        commonError: "Geçirgen aralığı sinyal yolunun yokluğu saymak.",
        check: "Sonuç geçirgenlik ve yönelme verilerini aynı yönde açıklıyor.",
      },
      {
        prompt:
          "Karanlıkta, ucu çıkarılmış bir koleoptilin kesik yüzeyinin ortasına uygun oksinli agar konuyor. Sinyal iki tarafa eşit dağılıyor. Beklenen model yanıtı hangisidir?",
        correct: "Düz uzama; asimetrik kıvrılma gerektiren fark verilmemiştir.",
        reason:
          "Ortalanmış eşit oksin etkisi iki kenarın eşit uzamasını destekler.",
        wrong: [
          [
            "Işık yoksa oksinli agar hiçbir koşulda büyüme etkisi veremez.",
            "Verilen kimyasal sinyal karanlıkta da uzamayı destekleyebilir.",
          ],
          [
            "Sola kıvrılma; ortada agar olmak sol demektir.",
            "Orta yerleşim eşit dağılım olarak tanımlanmıştır.",
          ],
          [
            "Sağa kıvrılma; bütün kesik koleoptiller sağa döner.",
            "Böyle bir yön kuralı yoktur; kenar farkı verilmemiştir.",
          ],
          [
            "Her hücre kesin mayozla polene dönüşür.",
            "Sürgün uzaması gametofit gelişimiyle aynı süreç değildir.",
          ],
        ],
        knowledge: [
          "Ortalanmış büyüme sinyali asimetrik fark olmadan simetrik uzama verebilir.",
        ],
        strategy: "Agarın konumunu kenar etkisine çevir.",
        steps: [
          "Agarın ortada olduğunu belirle.",
          "İki tarafa eşit etkiyi eşit uzamayla bağla.",
          "Düz uzamayı seç; ışık yönü veya yan fark ekleme.",
        ],
        commonError: "Karanlıkta hormon etkisini zorunlu imkânsız saymak.",
        check: "Konum, sinyal eşitliği ve düz yanıt aynı kabulü koruyor.",
      },
      {
        prompt:
          "Ucu çıkarılmış sürgünün sol yarısına oksinli agar, sağ yarısına oksinsiz eş agar konuyor; ortam karanlık. Doz sol tarafta uzamayı artırıyor. Tepe yönü ve yorum hangisidir?",
        correct:
          "Sağa kıvrılır; kimyasal dağılım deneyidir, ışığa yönelme kanıtı değildir.",
        reason:
          "Sol kenarın fazla uzaması sağa kıvrılma yaratır; ışık uyaranı verilmemiştir.",
        wrong: [
          [
            "Sola kıvrılır; hormonlu tarafa dönme zorunludur.",
            "Uzun sol kenar dış yayda kalır; tepe kısa sağa döner.",
          ],
          [
            "Sağa kıvrılır; bu tek başına negatif gravitropizmadır.",
            "Yerçekimine yönelim düzeni verilmemiştir; uygulama hormon asimetrisidir.",
          ],
          [
            "Düz kalır; iki tarafta agar olması hormon farkını siler.",
            "Agarların oksin içeriği farklıdır; taşıyıcının varlığı farkı silmez.",
          ],
          [
            "Işık yokken oksin molekülleri mutlaka yok olur.",
            "Karanlık hormonun böyle bir zorunlu yokluğu değildir.",
          ],
        ],
        knowledge: [
          "Kimyasal asimetriyle kıvrılma doğal ışık uyaranı olmadan da üretilebilir.",
        ],
        strategy: "Agar taşıyıcısını ve hormon içeriğini ayrı değerlendir.",
        steps: [
          "Solda uygun oksin, sağda kontrol taşıyıcı olduğunu belirle.",
          "Solun fazla uzamasından sağa kıvrılmayı çıkar.",
          "Yorumu hormon dağılımı deneyinde tut; ışık adı ekleme.",
        ],
        commonError:
          "Hormonlu agar deneyini ışık olmadığı hâlde fototropizma diye adlandırmak.",
        check: "Yön doğru, sınıflama verilmemiş uyaranla genişletilmedi.",
      },
      {
        prompt:
          "Bir fidenin kökü yerçekimi doğrultusunda, sürgünü ters doğrultuda büyüyor. Hangi eşleştirme doğrudur?",
        correct: "Kök pozitif, sürgün negatif gravitropizma.",
        reason:
          "Pozitif uyaran doğrultusuna; negatif onun tersine yönelme olarak tanımlanır.",
        wrong: [
          [
            "Kök negatif, sürgün pozitif gravitropizma.",
            "Uyaran doğrultusuna ilişkin işaretler ters çevrilmiştir.",
          ],
          [
            "İkisi de hidrotropizma; bütün toprak hareketleri suya bağlıdır.",
            "Soruda referans yerçekimi olarak verilmiştir.",
          ],
          [
            "İkisi de nasti; aynı bitkinin iki organı söz konusudur.",
            "Organ sayısı yön bağımlılığını ortadan kaldırmaz.",
          ],
          [
            "Negatif olduğu için sürgün yanıtı mutlaka zararlıdır.",
            "Negatif yön etiketidir; zarar hükmü değildir.",
          ],
        ],
        knowledge: ["Gravitropizmada referans fiziksel yerçekimi yönüdür."],
        strategy: "İki organ yönünü aynı yerçekimi oku ile karşılaştır.",
        steps: [
          "Kökü yerçekimi oku yönünde işaretle.",
          "Sürgünü ters yönde işaretle.",
          "Kök pozitif, sürgün negatif eşleştirmesini seç.",
        ],
        commonError: "Pozitif/negatifi yararlı/zararlı etiketi saymak.",
        check: "İki organ aynı uyaran oku referansıyla adlandırıldı.",
      },
      {
        prompt:
          "Diğer etkenler denetlenirken kökler daha yüksek nemli bölgeye büyüyor. Deneyde belirli bir iyon gradiyenti oluşturulmadığı verilmiş. Hangi ad uygundur?",
        correct: "Pozitif hidrotropizma.",
        reason: "Yönlü büyümenin uyaranı nem/su koşulu ve yönü ona doğrudur.",
        wrong: [
          [
            "Pozitif kemotropizma; suya her tepki iyon gradiyentidir.",
            "Soruda belirli iyon gradiyenti verilmediği belirtilmiştir.",
          ],
          [
            "Negatif hidrotropizma; suya yaklaşma negatiftir.",
            "Uyarana doğru yön pozitif olarak tanımlanır.",
          ],
          [
            "Fotonasti; toprakta ışık her zaman tek etkendir.",
            "Deney nem gradiyentini sınar; ışık etkisi verilmemiştir.",
          ],
          [
            "Evciklilik; kökün yönü çiçeklerin cinsiyet dağılımıdır.",
            "Evciklilik çiçeklerin bireyler üzerindeki dağılımıdır; kök yönelmesi değil.",
          ],
        ],
        knowledge: ["Hidrotropizma su/nem gradiyentine yönlü büyümedir."],
        strategy: "Kontrol edilen iyon varsayımını eklemeden su yönünü oku.",
        steps: [
          "Yüksek nem yönünü belirle.",
          "Kökün bu yöne büyüdüğünü kaydet.",
          "Pozitif hidrotropizma sınıfını seç.",
        ],
        commonError:
          "Her kök gradiyent yanıtını aynı kimyasal uyarana bağlamak.",
        check: "İsim sorunun gerçekten değiştirdiği nem girdisini izliyor.",
      },
      {
        prompt:
          "Bir kök, yüksek ve zarar verici tuz gradiyentinin tersine büyüyor. Yalnız bu kimyasal yön etkisi sınanıyor. Hangi yorum doğrudur?",
        correct:
          "Negatif kemotropizma; negatif sözcüğü yanıtın zararlı olduğunu söylemez.",
        reason:
          "Kimyasal uyarandan uzaklaşma negatiftir; zarar verici bölgeden uzaklaşma yararlı olabilir.",
        wrong: [
          [
            "Pozitif kemotropizma; yararlı olan her yanıt pozitiftir.",
            "İşaret yarara değil uyarana göre yön ilişkisine dayanır.",
          ],
          [
            "Negatif fototropizma; bütün uzaklaşmalar ışığa bağlıdır.",
            "Verilen uyaran kimyasal tuz gradiyentidir.",
          ],
          [
            "Nasti; uyaran yönünün tersi olması yön bağımsızlıktır.",
            "Ters yönde düzenli büyüme de uyaran yönüne bağlıdır.",
          ],
          [
            "Kökün su gereksinimi kesin yok olmuştur.",
            "Tuzdan uzaklaşma su gereksiniminin kaybolduğunu göstermez.",
          ],
        ],
        knowledge: [
          "Negatif tropizma uyarandan uzaklaşmadır; fayda değerlendirmesi ayrı kalır.",
        ],
        strategy: "Uyaranı ve ona göre uzaklaşma yönünü birlikte adlandır.",
        steps: [
          "Tuz gradiyentini kimyasal uyaran olarak al.",
          "Büyümenin ters yönde olduğunu belirle.",
          "Negatif kemotropizmayı seç; negatiften zarar çıkarmama.",
        ],
        commonError: "Yararlı yanıta otomatik pozitif işaret vermek.",
        check: "Kimyasal uyaran ve uzaklaşma doğru sınıfta kaldı.",
      },
      {
        prompt:
          "Bir sülük desteğe değdiği bölgede farklı büyüyerek desteğe sarılıyor. Hareketin geometrisi temasın yeriyle değişiyor. En uygun sınıflama hangisidir?",
        correct: "Tigmotropizma.",
        reason: "Temasa bağlı yönlü farklı büyüme desteğe sarılmayı oluşturur.",
        wrong: [
          [
            "Sismonasti; her dokunma yanıtı yön bağımsızdır.",
            "Bu örnekte yönün temas yeriyle değiştiği verilmiştir.",
          ],
          [
            "Termonasti; bütün sarılmalar sıcaklıkla olur.",
            "Verilen uyaran temas, sıcaklık değişimi değildir.",
          ],
          [
            "Fotoperiyodizm; tek temas geceyi uzatır.",
            "Gün/gece süresine gelişim yanıtı bu olay değildir.",
          ],
          [
            "Gutasyon; sıvı damlası organı desteğe taşır.",
            "Gutasyon hidatot sıvı çıkışıdır; yönlü büyüyerek sarılma değil.",
          ],
        ],
        knowledge: ["Temas kaynaklı yönlü büyüme tigmotropizma örneğidir."],
        strategy: "Temasın yön etkisini büyüme sonucuyla birleştir.",
        steps: [
          "Desteğe temas noktasını belirle.",
          "Temas yeriyle değişen farklı büyümeyi kaydet.",
          "Yönlü büyüme olarak tigmotropizma seç.",
        ],
        commonError:
          "Uyaranı dokunma diye bütün örnekleri aynı nastiye koymak.",
        check:
          "Sınıflama temas ve yönlü büyüme verilerinin ikisini kullanıyor.",
      },
      {
        prompt:
          "Küstüm otu yaprağı sağdan veya soldan dokunulunca aynı kapanma biçimini gösteriyor. Motor bölgelerde iyon ve su çıkışıyla turgor değiştiği de ölçülüyor. Hangi açıklama uygundur?",
        correct:
          "Dokunma/sarsıntı kaynaklı nasti; bu örnekte turgor mekanizmasıyla.",
        reason:
          "Yön bağımsız kapanma nasti ölçütü, verilen iyon–su değişimi mekanizma kanıtıdır.",
        wrong: [
          [
            "Tigmotropizma; temas sözcüğü bütün yönsüz yanıtları yönlü yapar.",
            "Uyaran yönüne bağımlılık verilmemiş, tersine aynı kapanma belirtilmiştir.",
          ],
          [
            "Bütün hücrelerin ölümü; hızlı hareket yalnız ölümle olur.",
            "Turgorla kapanma canlı hücresel yanıttır; ölüm gerektirmez.",
          ],
          [
            "Yeni yaprakların mayozla oluşması.",
            "Hızlı konum değişimi yeni gametofit üretimi değildir.",
          ],
          [
            "Bütün nastilerin yalnız aynı hücrelerde aynı mekanizma ile olması kesin kanıtlanmıştır.",
            "Bu tek örneğin mekanizması bütün nasti türlerine genellenemez.",
          ],
        ],
        knowledge: [
          "Nasti ölçütü yön bağımsızlık; turgor bazı örneklerin mekanizmasıdır.",
        ],
        strategy:
          "Sınıflama verisini mekanizma ölçümünden ayırıp birlikte kullan.",
        steps: [
          "İki yönden dokunmaya aynı kapanmayı yön bağımsızlık olarak al.",
          "İyon–su çıkışını turgor değişimiyle bağla.",
          "Bu örnekte turgor nasti açıklamasını seç; bütün türlere yayma.",
        ],
        commonError:
          "Bir örnek mekanizmasını bütün nasti sınıfının tek zorunlu tanımı yapmak.",
        check:
          "Yanıt hem davranış ölçütünü hem özgül hücresel ölçümü kapsıyor.",
      },
      {
        prompt:
          "Bir lale çiçeği sıcaklık yükselince aynı simetrik açılma biçimini gösteriyor; ısı kaynağının sağı veya solu belirleyici değil. Hangi ad uygundur?",
        correct: "Termonasti.",
        reason:
          "Sıcaklıkla başlatılan, uyaranın yönüne bağlı olmayan açılma termonastiyle uyumludur.",
        wrong: [
          [
            "Pozitif termotropizma; sıcaklık sözcüğü tek başına yönlü büyümedir.",
            "Soru yön bağımsız açılmayı açıkça belirtir.",
          ],
          [
            "Fototropizma; çiçekte her hareket ışığa yönelmedir.",
            "Değişen girdi sıcaklık olarak verilmiştir.",
          ],
          [
            "Tigmotropizma; simetri desteğe sarılmadır.",
            "Temas ve yönlü sarılma verisi yoktur.",
          ],
          [
            "Bütün lale çeşitleri her sıcaklıkta aynı sürede açar.",
            "Bir örnek gözlemi bütün tür ve sıcaklıklar için süre garantisi değildir.",
          ],
        ],
        knowledge: [
          "Nasti adı uyaran türüyle; sınıfı yön bağımsızlığıyla belirlenir.",
        ],
        strategy: "Sıcaklık girdisini ve yön bağımsız biçimi eşleştir.",
        steps: [
          "Uyaranın sıcaklık değişimi olduğunu belirle.",
          "Kaynak yönünün biçimi değiştirmediğini kaydet.",
          "Termonasti adını seç.",
        ],
        commonError: "Uyaran adından yön bağımlılığını varsaymak.",
        check: "Ad hem sıcaklığa hem verilen yön bağımsızlığa uygun.",
      },
      {
        prompt:
          "Bir öğrenci bütün nastiler hızlı ve yalnız turgorla, bütün tropizmalar yavaş olur diyor. En sağlam düzeltme hangisidir?",
        correct:
          "Temel ayrım uyaran yönüne bağımlılıktır; nasti mekanizmalarında turgorun yanında farklı büyüme de yer alabilir.",
        reason:
          "Hız ve tek hücresel mekanizma bütün sınıf için zorunlu ölçüt değildir.",
        wrong: [
          [
            "Ayrım yalnız hareket eden organın yeşil olup olmamasıdır.",
            "Renk tropizma/nasti sınıflamasının temel ölçütü değildir.",
          ],
          [
            "Bütün nastiler yönlü, bütün tropizmalar yönsüzdür.",
            "Temel yön ölçütleri ters verilmiştir.",
          ],
          [
            "Bitkilerde hiçbir organ konum değiştiremez.",
            "Tropizma ve nasti organ hareketlerinin gözlenen örnekleridir.",
          ],
          [
            "Bir hareket hızlıysa uyarana göre yönü ölçmek gereksizdir.",
            "Hız yön bağımlılığının yerine geçmez.",
          ],
        ],
        knowledge: [
          "Davranış sınıflamasıyla mekanizma ve hız ayrı ölçütlerdir.",
        ],
        strategy: "Mutlak hız iddiasını yön bağımlılığıyla değiştir.",
        steps: [
          "İddianın hız ve tek mekanizmayı zorunlu saydığını belirle.",
          "Tropizma için yön bağımlılığını temel ölçüt yap.",
          "Nastide farklı mekanizmalar olabileceğini koru.",
        ],
        commonError: "Yardımcı örüntüyü sınıfın değişmez tanımı sanmak.",
        check:
          "Düzeltme sınıflama ölçütünü korurken mekanizma çeşitliliğini açık tutuyor.",
      },
      {
        prompt:
          "Koleoptil modelinde mika sinyali kesiyor; ilk aşamada bütün gruplar düz. Dördüncü aşamada sağlam ve yandan ışık alan kontrol kıvrılıyor, mikalı grup kıvrılmıyor. Hangi yorum uygundur?",
        correct:
          "Başlangıç düzlüğü son yanıtı belirlemez; sinyal yolu farkı ilerleyen aşamalarda görünür.",
        reason:
          "Aynı başlangıç geometrisinden farklı sinyal bağlantıları farklı büyüme sonuçları oluşturabilir.",
        wrong: [
          [
            "İlk aşamada düz oldukları için bütün gruplar sonsuza kadar düz kalmalıdır.",
            "Sonraki büyüme ve sinyal farkı başlangıç simetrisini değiştirebilir.",
          ],
          [
            "Mikalı grubun düzlüğü kontrolün de sinyal alamadığını kanıtlar.",
            "Kontrolün kıvrılması normal sinyal yanıtıyla uyumludur.",
          ],
          [
            "Aşama numarası gerçek bitkide kesin dört saniye demektir.",
            "Model aşaması gerçek zaman kalibrasyonu değildir.",
          ],
          [
            "Başlangıç görüntüsü varsa sonraki ölçümler bilimsel olarak kullanılamaz.",
            "Zaman boyunca karşılaştırma deneyin yanıt gelişimini göstermeye yarar.",
          ],
        ],
        knowledge: [
          "Başlangıç durumu, koşul ve gelişen yanıt ayrı bilgilerdir.",
        ],
        strategy: "Aynı ilk şekli sonraki sinyal farklarıyla birlikte oku.",
        steps: [
          "İlk aşamanın ortak başlangıç olduğunu belirle.",
          "Sağlam ve mikalı yollarda sinyal geçişini ayır.",
          "Sonraki büyüme farkını seç; gerçek saniye ekleme.",
        ],
        commonError:
          "Modelin başlangıç fotoğrafını bütün sürecin sonucu sanmak.",
        check: "Yorum aşamayı zaman ölçeği uydurmadan sinyal yoluna bağlıyor.",
      },
    ],
  },
  {
    id: "bitki-fotoperiyodizm",
    topic: "detail-353",
    title: "Fotoperiyodizm: kesintisiz geceyi zaman çizgisinde oku",
    minutes: 95,
    objectives: [
      "Fotoperiyot ve fizyolojik yanıtı birbirinden ayır.",
      "Kısa ve uzun gün örneklerini verilmiş kritik gece eşiğiyle karşılaştır.",
      "Gece kesintisini ve sıralı kırmızı–uzak kırmızı darbeleri verilen modelin sınırında yorumla.",
    ],
    source:
      "Aurelia YKS arşivindeki MEBİ AYT Biyoloji fotoperiyodizm özeti; OGM Bitkilerde Hareket II sunusu ve konu özeti; Dersler Cepte Bitkilerin Yapısı karşılaştırılarak hazırlanmış özgün zaman çizgileri ve veri soruları. Kırmızı/uzak kırmızı örneklerinin kabulleri her model ve soru içinde ayrıca verilmiştir.",
    sections: [
      {
        title: "Takvim adı yerine çevresel süreyi düşün",
        paragraphs: [
          "Fotoperiyot bir günlük döngüde aydınlık ve karanlık sürelerinin düzenidir. Fotoperiyodizm ise bu düzene bağlı çiçeklenme, dormansi gibi fizyolojik yanıtlardır. Biri çevresel girdi, diğeri canlının yanıtıdır; aynı kelimeyle ikisini karıştırma.",
          "Mevsimsel gün uzunluğu birçok bitki için zaman işareti olabilir. Ancak çiçeklenmeyi yalnız takvim ayına bağlamak aynı türün farklı enlem ve yetiştirme koşullarını açıklamaz. Önkoşul olarak organ gelişimi, yaprağın sinyal üretimi ve hormonların hedef doku yanıtını hatırla.",
        ],
      },
      {
        title: "Yirmi dört saatlik döngüyü önce tamamla",
        paragraphs: [
          "Soruda bir günlük döngü 24 saat olarak verildiyse gece süresi 24−gündüz süresiyle hesaplanır. Dokuz saat gündüz, on beş saat gece demektir. Geceyi gündüzle aynı uzunlukta varsaymak veya iki süreyi toplamadan oran yorumu yapmak hataya yol açar.",
          "Işığın şiddeti, spektrumu ve bitkinin yaşı bu aritmetikten ayrı verilerdir. Bir dakikalık ışık darbesi ile saatler süren normal gündüz aynı fotosentetik karbon katkısını yapmayabilir; buna rağmen sinyal yanıtı üzerinde etkili olabilir. Süre hesabını mekanizma ve enerji hesabından ayır.",
        ],
      },
      {
        title: "Kritik değer türe ve örneğe aittir",
        paragraphs: [
          "Kritik gün veya gece uzunluğu ilgili bitkinin belirli gelişim yanıtını ayıran eşik olarak verilebilir. Bütün bitkiler için zorunlu 12 veya 14 saat eşiği yoktur. Kritik değeri sorudaki türden ve koşuldan al; coğrafi mevsim adından uydurma.",
          "Etkileşimde kritik gece değeri kullanıcı tarafından seçilir. Tam eşitlikte nasıl yanıt verildiği ayrıca belirtilmediği için sınırda model karar üretmez. Bu yaklaşım gerçek bitkide hiç yanıt olmaz demek değildir; eldeki kabul o sınırı sınıflamak için yeterli değildir.",
        ],
      },
      {
        title: "Kısa gün örneğini uzun gece koşuluyla kur",
        paragraphs: [
          "Kısa gün bitkileri uygun diğer koşullarda görece uzun ve gerekli süreyi aşan kesintisiz geceyle çiçeklenme yanıtı verebilir. Bu nedenle uzun gece bitkisi adı, gece kesintisi deneylerini anlamayı kolaylaştırır. Gündüz mutlaka geceden kısa olmalıdır kuralı yerine türün kritik eşiğini kullan.",
          "Verilen örnekte kritik gece on saat ise on iki saatlik kesintisiz gece uyarıcı olabilir. Bu yalnız bir örnek eşiğidir; türlerin kesin listesini ve her çeşidin aynı yanıtını kanıtlamaz. Bitki olgun değilse uygun geceye rağmen henüz çiçeklenme yanıtı oluşmayabilir.",
        ],
      },
      {
        title: "Uzun gün örneğini kısa gece koşuluyla kur",
        paragraphs: [
          "Uzun gün bitkilerinde uygun diğer koşullarda kritik süreden kısa gece çiçeklenmeyi destekleyebilir. Bu yüzden kısa gece bitkisi karşılığı kullanılır. Geceyi kısaltan veya işlevsel olarak bölen bir ışık uygulaması uygun örnekte yanıtı değiştirebilir.",
          "Verilen kritik gece on saat ve kesintisiz gece sekiz saat ise model uyarımı destekler. Aynı gece kısa gün örneğinde yeterli uzun gece koşulu oluşturmayabilir. İki grubun aynı eşikte ters koşullarla örneklenmesi, gerçek bütün türlerin aynı kritik değeri taşıdığı iddiası değildir.",
        ],
      },
      {
        title: "Nötr gün, koşulsuz çiçeklenme değildir",
        paragraphs: [
          "Nötr gün örneklerinde çiçeklenme belirli gün/gece uzunluğu eşiğine bağlı olmayabilir. Gelişim yaşı, büyüklük, sıcaklık ve beslenme gibi başka gereksinimler yine bulunur. Fotoperiyoda nötr olmak fotosentez için ışığa gerek yok anlamına gelmez.",
          "Bir deneyde farklı gün uzunluklarında olgun bitkiler çiçekleniyorsa fotoperiyodik eşik gereksinimi olmadığıyla uyumlu veri oluşabilir. Ancak bütün çevrelerde kesin en avantajlı bitkidir veya her tohum anında çiçek açar sonucu çıkmaz. Ölçülen gelişim evresi ve diğer uygun koşullar korunmalıdır.",
        ],
      },
      {
        title: "Toplam karanlık ile kesintisiz karanlığı ayır",
        paragraphs: [
          "On dört saatlik bir gece ortada etkili kısa ışık darbesiyle bölünürse toplam karanlık yaklaşık aynı kalabilir, fakat kesintisiz parçalar yedişer saate ayrılır. Bitkinin yanıtı bu kesintiye duyarlıysa biyolojik gece algısı değişebilir. Yalnız günlük toplamı toplamak deneyi açıklamayabilir.",
          "Ders modeli tek gece ortası darbeye duyarlı verilmiş örnek kullanır. En uzun etkili kesintisiz karanlık parçası eşiğe karşılaştırılır. Bu basitleştirme bütün türlerin her spektrum ve darbe zamanına aynı yanıtı verdiği iddiası değildir; gerçek yanıt iç saat evresiyle de ilişkilidir.",
        ],
      },
      {
        title: "Gece kesintisi iki grubu farklı etkileyebilir",
        paragraphs: [
          "Kısa gün yani uzun gece örneğinin gerekli kesintisiz karanlığı ışıkla bölünürse çiçeklenme uyarımı kaybolabilir. Uzun gün yani kısa gece örneğinde aynı kesinti kısa gece yanıtını destekleyebilir. Sonucu hangi türün incelendiğiyle birlikte yaz.",
          "Gece kesildiğinde bütün bitkiler çiçek açar veya hiçbir bitki çiçek açamaz gibi tek sonuç güvenilir değildir. Kritik eşik, toplam gece ve darbe etkisi birlikte verilmelidir. Şemadaki gündüz rengiyle yetinmeden gece parçalarının sürelerini hesapla.",
        ],
      },
      {
        title: "Işığın rengi bir sinyal girdisidir",
        paragraphs: [
          "Fitokrom kırmızı ve uzak kırmızı ışık yanıtlarıyla ilişkili bir fotoreseptör sistemidir. Basit şemada Pr biçimi kırmızı ışığı alarak Pfr biçimine; Pfr uzak kırmızı etkisiyle Pr biçimine dönüşebilir. İki biçim aynı proteinin farklı sinyal durumları olarak düşünülür.",
          "Pfr’yi her tür ve her işlemde yalnız iyi veya yalnız engelleyici diye adlandırma; yanıt bağlama bağlıdır. Uygulamanın dalga boyu ve sırası önemlidir. Modelde renkler gerçek ölçülmüş reseptör yüzdesi değil verilen fotodönüşüm mantığının basit gösterimidir.",
        ],
      },
      {
        title: "Ardışık darbelerde son uygulamayı izle",
        paragraphs: [
          "Verilen fitokrom duyarlı örnekte gece ortası kırmızı darbe uzun geceyi işlevsel olarak keser; hemen ardından uzak kırmızı verilirse bu etki tersine çevrilebilir. Kırmızı→uzak kırmızı ile uzak kırmızı→kırmızı aynı sonuç olmak zorunda değildir. Son etkin uygulama sistemin durumunu değiştirir.",
          "Bu kural yalnız açıkça belirtilen darbe koşulu ve örneğe uygulanır. Uzak kırmızı her türde her gece koşulunda bütün ışık etkilerini siler denemez. Aradaki süre ve doz verilmemişse karmaşık gerçek sistemler için nicel sonuç üretme; ders modeli ardışık kısa darbeleri kabul eder.",
        ],
      },
      {
        title: "Işık darbesini fotosentez kazancıyla açıklama",
        paragraphs: [
          "Çok kısa gece darbesi, karbon kazanımına küçük katkı yaptığı hâlde çiçeklenme sinyalini değiştirebilir. Bu deney fotoperiyodik algılama ile günlük fotosentez miktarını ayırmaya yardım eder. Çiçeklenme yanıtı doğrudan ne kadar şeker üretildi göstergesi değildir.",
          "Aynı toplam ışık süresinin farklı zaman düzenleri farklı yanıt verebilir. Gece kesintisini yalnız daha çok besin üretildi diye açıklamak kesintisiz karanlık verisini kaybettirir. Karbon kazanımı için ışık şiddeti ve gaz alışverişi gibi ölçümler ayrıca gerekir.",
        ],
      },
      {
        title: "Yaprağın algısı ve sürgünün gelişimi bağlantılıdır",
        paragraphs: [
          "Fotoperiyodik algılamada yapraklar önemli rol alabilir; oluşan hareketli çiçeklenme sinyalleri sürgün uç meristeminin çiçeklenme programına geçişine katkı verir. Algılanan ışık süresi ile çiçeğin oluştuğu yerin aynı olması gerekmez.",
          "Çiçeklenme sinyalini floemle gidebilen düzenleyici ileti olarak düşünmek, yaprağın yalnız şeker üretmediğini gösterir. Bütün ayrıntıları tek hormon adıyla açıklama veya sinyalin mutlaka her bitkide aynı tek molekül olduğunu iddia etme. Bu düzeyde algılama–iletim–meristem yanıtı ilişkisi temel çerçevedir.",
        ],
      },
      {
        title: "Olgunluk ve soğuk gereksinimi ayrı kapılardır",
        paragraphs: [
          "Bazı bitkiler çiçeklenme yeteneği için belirli gelişim yaşına veya soğuk dönemine gereksinebilir. Soğuklamayla ilişkili vernalizasyon fotoperiyodizmle aynı çevresel işaret değildir. Uygun gün uzunluğu diğer gerekli kapılar kapalıysa tek başına yeterli olmayabilir.",
          "Modelde olgunluk kutusu bu bağımsız gelişim koşulunu gösterir; diğer çevresel gereksinimler uygun kabul edilmiştir. Kutuyu kapatınca uygun gece olsa bile uyarım sonucu verilmez. Bu, bütün olgun olmayan dokuların aynı yaşta çiçeklenmeyeceğini tek sayıdan çıkarmak değildir.",
        ],
      },
      {
        title: "Sera uygulamasında hedef yanıtı belirt",
        paragraphs: [
          "Karartma örtüsüyle kesintisiz gece uzatılabilir; gece aydınlatmasıyla verilen örnekte uzun gece yanıtı değiştirilebilir. Üretici hangi türün hangi eşik ve gelişim durumunda olduğunu bilmeden tek reçete uygulayamaz. Yapılan işlem çiçeklenmeyi geciktirmek de öne almak da olabilir.",
          "Sıcaklık, havalanma ve nem örtüyle birlikte değişirse sonuç yalnız fotoperiyoda bağlanamayabilir. Şeffaf/karartma uygulamalarına uygun kontrol kurmak gerekir. Verilen deneyde sabit tutulanları kontrol et; eğitim modelinin saatlerini gerçek üretim garantisine dönüştürme.",
        ],
      },
      {
        title: "Tabloyu gece parçalarına çevir",
        paragraphs: [
          "Bir tablo gündüz 8, gece 16 saat ve orta darbe gösteriyorsa önce geceyi iki etkili 8 saatlik parçaya ayır. Sonra türün kritik eşiğini ve darbenin tersine çevrilip çevrilmediğini kullan. Darbe süresi ihmal edildiyse toplamı bu kabul altında hesapla.",
          "Kritik değerle eşitlik soruda açıkça kapsanmışsa o kurala uy; kapsanmamışsa sınırda karar verilemediğini belirt. Doğru açıklama yalnız var/yok değil, hangi karşılaştırma nedeniyle olduğunu da içerir. Tek bir çiçeklenme fotoğrafından bütün eşik eğrisini çıkarma.",
        ],
      },
      {
        title: "Yeni bir soruya dört adım taşı",
        paragraphs: [
          "Önce 24 saatten geceyi hesapla, sonra etkin kesintiyi uygula, en uzun karanlığı kritik eşiğe karşılaştır ve olgunluk/diğer kabulleri denetle. Nötr gün örneğinde eşik adımını otomatik zorunlu yapma; başka kapıların uygunluğunu koru.",
          "Sonucu çiçeklenme uyarımı diye adlandırmakla anında açmış çiçek sayısı vermek aynı değildir. Model sinyal koşulunu gösterir; gerçek çiçek oluşması zaman ve gelişim ister. Tahminini açıklarken gün grubu, eşik ve darbe sırasından en az ilgili olanları açıkça söyle.",
        ],
      },
    ],
    examples: [
      {
        title: "Yanıttan kritik aralığı tersine çıkar",
        prompt:
          "Olgun kısa gün örneğinde kural gece>c ise uyarım var, gece≤c ise yok. Diğer koşullar uygun ve gece kesintisiz.10 saat gecede uyarım yok,12 saatte var. Kritik gecec için hangi aralık bulunur?",
        strategy: "İki gözlemi eşitsizlik olarak yazıp kesiştir.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "10 saatte yok bilgisinden 10≤c yani c≥10 yaz.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "12 saatte var bilgisinden 12>c yani c<12 yaz.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Birleştirince 10≤c<12 saat; tek başına tam 11 saat değeri kanıtlanmaz.",
          },
        ],
        answer: "10≤c<12 saat.",
        check:
          "Eşitliğin uyarımsız tarafa ait olduğu bu örnek kuralını kullandın mı?",
        pitfall:
          "İki gözlem arasındaki orta değeri ölçülmüş kesin eşik sanmak.",
      },
      {
        title: "Ortadan bölünmüş uzun gece",
        prompt:
          "Kritik gece 9 saat olan olgun kısa gün örneğine 6 saat gündüz ve 18 saat gece veriliyor. Etkili bir darbe gecenin tam ortasında; süre ihmal ediliyor. Eşitlikte yanıt verilmemiş. Sonuç nedir?",
        strategy: "Toplam geceyi iki parçaya ayır, sınır kuralını koru.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "18 saati iki 9 saatlik parçaya böl.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "En uzun etkin karanlığın kritik 9’a eşit olduğunu belirle.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Eşitlik kuralı verilmediği için uyarım var/yok kararı üretme.",
          },
        ],
        answer: "Sınırda; verilen modelle karar yok.",
        check: "Eşitlikte > veya < işaretini kendin ekledin mi?",
        pitfall: "9=9 durumunu zorunlu çiçeklenme saymak.",
      },
      {
        title: "İki modeli ayıran darbe zamanını seç",
        prompt:
          "M1 modeli yalnız toplam karanlığı; M2 modeli en uzun kesintisiz karanlığı esas alıyor. Olgun kısa gün örneğinde eşik 10 saat,14 saat gece uyarım veriyor. Aynı ihmal edilebilir kısa darbe gecenin 1. veya 7. saatine konabilir. Hangi zaman iki modeli ayırmak için daha uygundur? Darbe M2 modelinde karanlığı etkili biçimde keser; diğer koşullar eş ve uygundur.",
        strategy: "Her yerleşimde en uzun parçayı hesapla; toplamı aynı tut.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "1. saatte kesinti parçaları 1 ve 13; en uzun 13>10 olduğu için M2 de uyarım bekler.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "7. saatte parçalar 7 ve 7; M2 uyarım beklemezken toplamı esas alan M1 yaklaşık 14 saatten uyarım bekler.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Ayırıcı uygulama 7. saattir; darbenin etkili olduğu ve diğer koşulların eş tutulduğu ayrıca kabul edilir.",
          },
        ],
        answer: "7. saat; modeller burada farklı öngörü verir.",
        check:
          "İyi deneyin aynı sonucu veren değil modelleri ayıran koşul olduğunu kontrol et.",
        pitfall:
          "Darbe varlığını, zamanına bakmadan her durumda aynı deney saymak.",
      },
      {
        title: "En az gündüz uzatmasını planla",
        prompt:
          "Olgun uzun gün örneğinde yalnız gece 9 saatten kısa olursa uyarım var; eşitlikte yok. Başlangıç gündüz 12 saat. Yalnız gündüzün sonuna tam saat ışık eklenebilir, gece darbesi kullanılamaz.24 saatlik döngüde gereken en az ek süre nedir?",
        strategy:
          "Geceyi ek ışık süresinin fonksiyonu yapıp en küçük tamsayıyı bul.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "Ek sürex ise gece 12−x saattir.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "12−x<9 eşitsizliğinden x>3 çıkar.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "En küçük tam saat 4’tür: gündüz 16, gece 8;3 saat ekleme geceyi 9 yapıp verilen kuralı sağlamaz.",
          },
        ],
        answer: "En az 4 saat ek ışık.",
        check: "Sıkı eşitsizlikte 3 saati yanlışlıkla yeterli saymadın mı?",
        pitfall: "Kritik değere eşitliği daha kısa koşuluna katmak.",
      },
      {
        title: "İki kapıyı faktöriyel veriden ayır",
        prompt:
          "Eş kısa gün bitkilerinde iki gelişim evresi ve iki gece koşulu var: genç+kısa gece yok; genç+uzun gece yok; olgun+kısa gece yok; olgun+uzun gece var. Gece koşulları ve olgunluk dışında etkenler eş. Bu dört grupta hangi karşılaştırmalar iki kapıyı ayırır?",
        strategy: "Bir etkeni sabit tutup diğerini değiştiren çiftleri kullan.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Olgun grupları karşılaştırınca kısa/uzun gece etkisi görünür.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Uzun gecedeki genç/olgun grupları karşılaştırınca gelişim evresi etkisi görünür.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Yalnız olgun+uzun gece grubunun yanıtı, bu deneyde iki koşulun birlikte gerektiğiyle uyumludur; bütün türler için evrensel eşik çıkarılmaz.",
          },
        ],
        answer:
          "Olgunluk ve gece koşulu ayrı kapılar; ilgili kontrollü çiftlerle ayrılır.",
        check:
          "Dört grubu tek bir genç/olgun karşılaştırmasına indirgemedin mi?",
        pitfall: "Uygun bir tek koşulu bütün yanıt için yeterli saymak.",
      },
      {
        title: "İki eş sonucu nötrlük sanma",
        prompt:
          "Aynı olgunluk ve çevrede 8 saat gündüzde uyarım yok,12 ve 16 saatte var. Öğrenci yalnız 12 ve 16’yı seçip nötr gün sonucuna ulaşıyor. Hangi veri bu çıkarımı değiştirir?",
        strategy: "Seçilen dar aralığı bütün veri kümesiyle karşılaştır.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "12 ve 16 saatte aynı sonuç bulunmasının tek başına eşiksizlik kanıtı olmadığını belirle.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "8 saatte farklı yanıtı aynı kontrollü deneyin alt süre noktası olarak ekle.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Bu aralıkta süreye bağlı yanıtla uyum vardır; kesin kritik değeri yalnız üç noktadan hesaplayamazsın.",
          },
        ],
        answer:
          "8 saat noktası nötrlük çıkarımını sınırlar; kesin eşik ayrıca aranır.",
        check: "Yanıtsız alt koşulu sonuçtan çıkarmadın mı?",
        pitfall:
          "Eğrinin yalnız yanıt platosunu görüp bütün fotoperiyoda nötr demek.",
      },
    ],
    recall: [
      {
        prompt: "Fotoperiyot ve fotoperiyodizm hangi iki farklı şeyi anlatır?",
        answer:
          "Günlük aydınlık–karanlık düzeni girdiyi; bu düzene fizyolojik yanıt fotoperiyodizmi anlatır.",
      },
      {
        prompt:
          "Gece ortası darbe niçin yalnız toplam karanlık hesabıyla açıklanamaz?",
        answer:
          "Toplam yaklaşık aynı kalsa da kesintisiz etkin karanlık parçalanabilir ve sinyal yanıtı değişebilir.",
      },
      {
        prompt:
          "Kısa gün ve uzun gün örneğinde kritik gece karşılaştırması nasıl tersleşir?",
        answer:
          "Verilen modelde kısa gün kritik geceden uzun, uzun gün daha kısa etkin karanlıkla uyarılır; eşitlik ayrıca belirtilmelidir.",
      },
      {
        prompt: "Nötr gün örneği için hangi genel sonuç yanlış olur?",
        answer:
          "Işık, sıcaklık, beslenme veya olgunluğa hiç gerek yok demek yanlıştır.",
      },
      {
        prompt: "R→FR ve FR→R niçin aynı sayılmaz?",
        answer:
          "Verilen tersinir fitokrom örneğinde son etkin darbe farklı reseptör durumunu ve kesinti sonucunu belirleyebilir.",
      },
      {
        prompt: "Çiçeklenme uyarımı modeli neyi nicel olarak vermez?",
        answer:
          "Anında açan çiçek sayısını, gerçek gelişme süresini veya tarımsal verimi vermez.",
      },
    ],
    items: [
      {
        prompt:
          "Bir bitkiye her 24 saatte belirli aydınlık–karanlık düzeni uygulanıyor; bitki buna çiçeklenmeye geçişle yanıt veriyor. Fotoperiyot ve fotoperiyodizm sırası hangisidir?",
        correct:
          "Aydınlık–karanlık düzeni fotoperiyot; buna fizyolojik yanıt fotoperiyodizmdir.",
        reason: "Çevresel süre düzeni girdi, gelişimsel karşılık yanıttır.",
        wrong: [
          [
            "İkisi de yalnız bitkinin son çiçek sayısıdır.",
            "Süre düzeni ve fizyolojik yanıt farklı bilgilerdir; çiçek sayısına indirgenmez.",
          ],
          [
            "Fotoperiyot hormonun kimyasal yapısı; fotoperiyodizm su potansiyelidir.",
            "Verilen terimler günlük ışık düzeni ve ona yanıtla ilgilidir.",
          ],
          [
            "Fotoperiyot yanıt, fotoperiyodizm çevresel süre girdisidir.",
            "İki terimin girdi ve yanıt rolleri ters çevrilmiştir.",
          ],
          [
            "Her ikisi yalnız ışık kaynağının solda veya sağda olmasını anlatır.",
            "Kaynak yönüne büyüme fototropizma bağlamıdır; süre yanıtı değildir.",
          ],
        ],
        knowledge: [
          "Fotoperiyot çevresel düzen; fotoperiyodizm fizyolojik yanıttır.",
        ],
        strategy: "Girdi ve çıktı için iki ayrı etiket kullan.",
        steps: [
          "Günlük aydınlık–karanlık düzenini girdi olarak belirle.",
          "Çiçeklenmeye geçişi yanıt olarak ayır.",
          "Terimleri bu iki role eşleştir.",
        ],
        commonError: "Fotoperiyotla yanıtın adını eş anlamlı kullanmak.",
        check: "Eşleştirme çevresel girdi ve gelişim sonucunu ayırıyor.",
      },
      {
        prompt:
          "Olgun kısa gün örneği için model kuralı: kesintisiz gece kritik 12 saatten uzun olursa uyarım var. Diğer koşullar uygun;24 saatlik döngüde gündüz 7 saat, gece kesintisiz. Sonuç nedir?",
        correct: "Gece 17 saat;17>12 olduğundan uyarım var.",
        reason:
          "24−7=17 saat gece bulunur ve verilen uzun gece kuralı sağlanır.",
        wrong: [
          [
            "Gece 7 saat; uyarım yok.",
            "7 gündüz süresidir; gece 24−7 ile hesaplanır.",
          ],
          [
            "Gece 17 saat; kısa gün örneği uzun gecede asla uyarılmaz.",
            "Verilen kural kısa gün için uzun kesintisiz geceyi ister.",
          ],
          [
            "Gece 12 saat; kritik değer bütün gecelerin gerçek süresidir.",
            "Kritik eşik ölçülen veya verilen gece süresinin yerine geçmez.",
          ],
          [
            "Uyarım var; bu anında 17 çiçek açtığını gösterir.",
            "Sinyal koşulu çiçek sayısına veya anlık gelişim miktarına kalibre edilmemiştir.",
          ],
        ],
        knowledge: [
          "24 saatlik döngüde gece 24−gündüzdür; verilen eşik koşulu ayrıca uygulanır.",
        ],
        strategy: "Önce geceyi hesapla, sonra türün kuralıyla karşılaştır.",
        steps: [
          "24−7=17 bul.",
          "17’nin kritik 12’den uzun olduğunu belirle.",
          "Uyarımı seç; süreyi çiçek sayısına dönüştürme.",
        ],
        commonError: "Kritik gece eşiğini gerçek gece uzunluğu yerine yazmak.",
        check:
          "Hesap gerçek süreyi, karşılaştırma verilen eşiği ayrı kullanıyor.",
      },
      {
        prompt:
          "Olgun uzun gün örneği için kural: kesintisiz gece kritik 9 saatten kısa olduğunda uyarım var.24 saatlik döngüde gündüz 17 saat, diğer koşullar uygun. Ne beklenir?",
        correct: "Gece 7 saat;7<9 olduğundan uyarım var.",
        reason:
          "24−17=7 ve uzun gün örneğinin verilen kısa gece koşulu sağlanır.",
        wrong: [
          ["Gece 17 saat; uyarım yok.", "17 gündüzdür; gece 7 saattir."],
          [
            "Gece 7 saat; uzun gün bitkisi mutlaka daha uzun gece ister.",
            "Soruda uzun gün için kısa gece koşulu verilmiştir.",
          ],
          [
            "Gece 9 saat; her tür kritik değere eşit gece yaşar.",
            "Kritik eşik gerçek süre değildir.",
          ],
          [
            "Uyarım kesin sıfır; gece olmadan hiçbir bitki yaşayamaz.",
            "Bu döngüde 7 saat gece vardır; gece yok koşulu verilmemiştir.",
          ],
        ],
        knowledge: [
          "Uzun gün örneği verilen kritik değerden kısa geceyle uyarılabilir.",
        ],
        strategy: "Gündüzü geceye çevir ve kısa gece kuralını kullan.",
        steps: [
          "24−17=7 hesapla.",
          "7<9 karşılaştırmasını kur.",
          "Uzun gün kuralına göre uyarımı seç.",
        ],
        commonError: "Uzun gün adını uzun gece gereksinimi sanmak.",
        check: "Seçenek verilen 9 saat eşiğini doğru yönde karşılaştırıyor.",
      },
      {
        prompt:
          "Kısa gün örneği için kritik gece 10 saat; bu modelde daha uzun kesintisiz gece uyarır. Olgun bitki 13 saat gündüz ve 11 saat gece alıyor. Hangi sonuç doğrudur?",
        correct:
          "11>10 olduğundan uyarım olabilir; gündüzün geceden uzun olması bu verilen eşiği bozmaz.",
        reason:
          "Kısa gün adı her zaman gece gündüzden uzun demek değildir; türün kritik gece koşulu kullanılmalıdır.",
        wrong: [
          [
            "Gündüz 13>11 olduğu için verilen eşikten bağımsız uyarım imkânsızdır.",
            "Türün kritik 10 saat koşulu 11 saatle sağlanmıştır.",
          ],
          [
            "Gece 11 saat olması bütün türlerin aynı gün grubunda olduğunu kanıtlar.",
            "Türlerin kritik değerleri ve yanıt kuralları farklı olabilir.",
          ],
          [
            "13+11=24 olduğu için gece mutlaka 12 olmalıdır.",
            "Toplam 24 olması iki parçanın eşit olmasını gerektirmez.",
          ],
          [
            "Kritik 10 saat yalnız toplam haftalık ışık süresidir.",
            "Soruda kritik gece süresi tek günlük model eşiği olarak verilmiştir.",
          ],
        ],
        knowledge: [
          "Fotoperiyodik grubu gerçek türe ait kritik eşik tanımlar.",
        ],
        strategy:
          "Gündüz–gece kendi arası oranı yerine gece–kritik değer karşılaştır.",
        steps: [
          "Geceyi 11 saat olarak al.",
          "11>10 koşulunun sağlandığını belirle.",
          "Gündüz 13 saat olsa da verilen model uyarımını seç.",
        ],
        commonError:
          "Kısa gün için gece mutlaka gündüzden uzundur genellemesini değişmez sanmak.",
        check: "Karar türün açık 10 saat eşiğine dayanıyor.",
      },
      {
        prompt:
          "A ve B olgun kısa gün örneklerinde kural kritik geceden uzun kesintisiz gecede uyarımdır. A’nın kritik gecesi 8, B’ninki 12 saat. İkisi 10 saat kesintisiz gece alıyor. Sonuç hangisidir?",
        correct: "A uyarılır, B uyarılmaz.",
        reason: "10>8 A için doğru;10>12 B için yanlıştır.",
        wrong: [
          [
            "İkisi de uyarılır; aynı grup aynı kritik değerdir.",
            "Soruda kritik değerler farklı verilmiştir.",
          ],
          [
            "A uyarılmaz, B uyarılır.",
            "Eşik karşılaştırmaları ters yönde uygulanmıştır.",
          ],
          [
            "İkisi de sınırdadır.",
            "10 hiçbir verilen kritik değere eşit değildir.",
          ],
          [
            "B’nin kritik değeri yüksek olduğu için her gecede daha erken çiçeklenir.",
            "Daha yüksek eşik bu uzun gece modelinde daha uzun koşul gerektirir.",
          ],
        ],
        knowledge: [
          "Aynı fotoperiyodik grupta türlerin kritik değerleri farklı olabilir.",
        ],
        strategy: "Aynı geceyi her türün kendi eşiğiyle karşılaştır.",
        steps: [
          "A için 10>8 işlemini yap.",
          "B için 10<12 işlemini yap.",
          "Yalnız A’nın uyarıldığını seç.",
        ],
        commonError: "Gün grubu aynıysa eşik de zorunlu aynıdır sanmak.",
        check: "İki tür ayrı eşikleriyle değerlendirildi.",
      },
      {
        prompt:
          "Olgun kısa gün modelinde kritik gece 10 saat; uyarım için daha uzun etkin kesintisiz karanlık gerekiyor.16 saat gece ortadan etkili kısa ışıkla ikiye bölünüyor; darbe süresi ihmal ediliyor. Sonuç nedir?",
        correct: "En uzun parça 8 saat; uzun gece koşulu sağlanmaz.",
        reason: "16/2=8 ve 8<10 olduğundan verilen modelde uyarım kaybolur.",
        wrong: [
          [
            "Toplam 16 olduğundan kesinti her durumda etkisizdir.",
            "Model kesintisiz etkin parça uzunluğunu esas alır.",
          ],
          [
            "En uzun parça 16 saattir; ortadan bölmek uzunluğu değiştirmez.",
            "Etkili darbe iki 8 saatlik parça oluşturur.",
          ],
          [
            "En uzun parça 32 saattir; iki parça olduğu için 16 ikiyle çarpılır.",
            "Toplam gece bölünür, uzatılmaz.",
          ],
          [
            "Uyarım kaybolursa bitkinin bütün fotosentez dokusu ölmüştür.",
            "Sinyal koşulunun sağlanmaması doku ölümü demek değildir.",
          ],
        ],
        knowledge: [
          "Gece kesintisi toplamı değil etkin kesintisiz süreyi değiştirir.",
        ],
        strategy: "Geceyi ortadan bölüp en uzun parçayı eşikle karşılaştır.",
        steps: [
          "16/2=8 saat bul.",
          "8’i kritik 10 ile karşılaştır.",
          "Yetersiz uzun gece koşulunu seç.",
        ],
        commonError: "Toplam karanlığı kesintisiz karanlıkla aynı saymak.",
        check: "Sonuç kesinti kabulünü ve 10 saat eşiğini birlikte kullanıyor.",
      },
      {
        prompt:
          "Olgun uzun gün modelinde kritik gece 9 saat; daha kısa etkin karanlık uyarıyor.14 saat gece tam ortadan etkili bir darbeyle ikiye bölünüyor. Diğer koşullar uygun. Hangi sonuç doğrudur?",
        correct: "En uzun karanlık 7 saat olur; uyarım desteklenir.",
        reason: "14/2=7 ve 7<9 kısa gece koşulunu sağlar.",
        wrong: [
          [
            "14>9 olduğundan darbe hesaba katılmadan uyarım yoktur.",
            "Etkili orta darbe modelde geceyi bölmektedir.",
          ],
          [
            "En uzun parça 7; uzun gün modelinde daha uzun gece zorunludur.",
            "Verilen kural daha kısa etkin karanlık ister.",
          ],
          [
            "İki parça varlığı bitkinin nötr gün olduğunun kanıtıdır.",
            "Uygulamanın geceyi bölmesi türün gün grubunu değiştirmez.",
          ],
          [
            "Uyarım desteklenmesi 14 tohumun kesin oluşmasıdır.",
            "Çiçeklenme sinyal koşulu tohum sayısını vermez.",
          ],
        ],
        knowledge: [
          "Aynı gece kesintisi uzun gün örneğinde kısa gece yanıtını destekleyebilir.",
        ],
        strategy: "Parça hesabını uzun gün kuralına uygula.",
        steps: [
          "14 saat geceyi iki 7 saatlik parçaya ayır.",
          "7<9 ile kısa geceyi belirle.",
          "Uyarımı seç; sonraki üreme sayıları ekleme.",
        ],
        commonError:
          "Kısa gün örneğinin kesinti sonucunu uzun güne aynen taşımak.",
        check: "Tür grubu ve karşılaştırma işareti uyumlu kaldı.",
      },
      {
        prompt:
          "Kritik gecesi 11 saat olan olgun kısa gün modelinde A 16 saat kesintisiz gece, B 8 saat karanlık+etkili kısa darbe+8 saat karanlık alıyor. Darbe süresi ihmal, diğer koşullar eş. Hangisi doğrudur?",
        correct: "A uyarılır; B’de en uzun 8 saat olduğu için uyarım yoktur.",
        reason:
          "A’da 16>11; B’de etkin en uzun 8<11’dir. Toplam karanlık aynı olsa da düzen farklıdır.",
        wrong: [
          [
            "İkisi aynı 16 saat toplamı aldığı için zorunlu aynı yanıt verir.",
            "Verilen model kesintisiz geceye duyarlıdır.",
          ],
          [
            "Yalnız B uyarılır; her ışık darbesi bütün kısa gün örneklerini uyarır.",
            "Burada darbe gerekli uzun geceyi bölmektedir.",
          ],
          [
            "A 16, B 32 saat gece alır.",
            "B’de iki 8 saatlik parça toplam 16 saattir; süre iki kez sayılmaz.",
          ],
          [
            "İkisinin de kesin kaç çiçek açacağı 16 sayısından bulunur.",
            "Model süreyi çiçek sayısına çevirecek kalibrasyon vermez.",
          ],
        ],
        knowledge: [
          "Aynı toplam süre farklı zaman düzeniyle farklı sinyal yanıtı verebilir.",
        ],
        strategy: "Toplam ve en uzun parça için iki ayrı karşılaştırma yap.",
        steps: [
          "A’nın kesintisiz 16 saatini belirle.",
          "B’nin en uzun parçasını 8 saat al.",
          "Her birini 11 ile karşılaştırıp farklı sonucu seç.",
        ],
        commonError:
          "Aynı toplam süreden zorunlu aynı fotoperiyodik yanıt çıkarmak.",
        check:
          "İki uygulamanın toplamı aynı, kesintisiz parçası farklı tutuldu.",
      },
      {
        prompt:
          "Verilen fitokrom duyarlı kısa gün modelinde kritik gece 10 saat;14 saat gece uyarır. Gece ortası kırmızı(R) kesintisi, hemen ardından uzak kırmızı(FR) verilirse tersine çevriliyor. R→FR uygulamasında sonuç nedir?",
        correct:
          "Etkin gece 14 saat kalır;14>10 olduğundan uyarım geri sağlanır.",
        reason:
          "Son uzak kırmızı, modelde kırmızının kesinti etkisini tersine çevirir.",
        wrong: [
          [
            "Son darbe FR olsa da kırmızı etkisi bu modelde hiçbir zaman değişemez.",
            "Soruda etkinin FR ile tersine çevrildiği açıkça verilmiştir.",
          ],
          [
            "Etkin gece 7 saat kalır ve başka kabul gerekmez.",
            "R→FR tersine dönüşü modelde tam gece etkisini geri sağlar.",
          ],
          [
            "R→FR ile FR→R her zaman aynı son durumdur.",
            "Darbe sırası verilen tersinir sistemde önemlidir.",
          ],
          [
            "FR verilince bütün fotosentez gereksinimi kalıcı yok olur.",
            "Fotoreseptör darbe yanıtı genel ışık gereksinimini ortadan kaldırmaz.",
          ],
        ],
        knowledge: [
          "Verilen tersinir darbe modelinde son etkin ışık sırası sonucu değiştirebilir.",
        ],
        strategy: "Son uygulamayı bul ve kesintinin sürüp sürmediğini belirle.",
        steps: [
          "Sıranın R sonra FR olduğunu kaydet.",
          "FR’nin kesintiyi tersine çevirdiği kabulünü uygula.",
          "14>10 ile uyarımı seç.",
        ],
        commonError: "Işık darbelerini sırasız toplam enerji olarak okumak.",
        check: "Sonuç açıkça verilen tersine dönüş kuralını kullanıyor.",
      },
      {
        prompt:
          "Aynı verilen modelde gece ortası son kırmızı darbe etkilidir, hemen sonraki FR etkisini geri alabilir. Olgun kısa gün örneğinde gece 14 saat, kritik 10 saat. Uygulama FR→R ise sonuç nedir?",
        correct:
          "Son R etkili kesinti oluşturur; en uzun parça 7 saat olduğundan uyarım yoktur.",
        reason:
          "FR’den sonra gelen R modelin son etkin durumudur; gece ikiye ayrılır.",
        wrong: [
          [
            "Son durum R→FR ile aynıdır; sıra hiçbir koşulda önemli değildir.",
            "Verilen tersinir model sıralamaya duyarlıdır.",
          ],
          [
            "FR ilk verildiği için daha sonraki R kesin etkisizdir.",
            "Soruda son R’nin etkinliği belirtilmiştir.",
          ],
          [
            "Gece 28 saat olur; iki renk süreyi iki katına çıkarır.",
            "Kısa darbeler gece uzunluğunu böyle iki katına çıkarmaz.",
          ],
          [
            "Uyarım yokluğu tohumun kromozom sayısını kesin yarıya indirir.",
            "Çiçeklenme sinyali sonucu kromozom takımı değişimi değildir.",
          ],
        ],
        knowledge: [
          "Ardışık darbelerde son etkin uygulama belirtilen sistemde belirleyicidir.",
        ],
        strategy: "FR ve R yerlerini koruyup etkin geceyi hesapla.",
        steps: [
          "Son darbenin R olduğunu belirle.",
          "14/2=7 saat en uzun parçayı hesapla.",
          "7<10 olduğu için uzun gece koşulunun kaybını seç.",
        ],
        commonError:
          "İlk darbenin bütün sonraki darbeleri etkisiz yaptığını varsaymak.",
        check: "Son R ve 7 saat karşılaştırması aynı sonuca bağlı.",
      },
      {
        prompt:
          "Modelde yalnız kırmızı gece kesintisi etkindir; tek başına gece ortası FR kesinti sayılmaz. Olgun kısa gün örneği 18 saat gece alıyor, kritik 13 saat. Tek FR darbesinde sonuç hangisidir?",
        correct: "Etkin gece 18 saat; uyarım var.",
        reason:
          "Bu modelde FR tek başına geceyi bölmez;18>13 uzun gece koşuludur.",
        wrong: [
          [
            "Her görünür darbe 18 saati zorunlu 9+9 yapar.",
            "Soruda tek FR’nin kesinti sayılmadığı açıkça belirtilmiştir.",
          ],
          [
            "Etkin gece 9; uyarım yok.",
            "Bu, etkili orta kesinti varsayımıdır; tek FR için kabul edilmemiştir.",
          ],
          [
            "Kritik 13 olduğu için gerçek gece her durumda 13’tür.",
            "Kritik eşik verilen 18 saat sürenin yerine geçmez.",
          ],
          [
            "FR tek başına bütün türlerde sürekli çiçeklenme sağlar.",
            "Verilen örnek kuralı bütün tür ve koşullara genellenemez.",
          ],
        ],
        knowledge: [
          "Darbe etkisi spektrum ve modele ait açık kabule bağlıdır.",
        ],
        strategy: "Işık varlığıyla etkili gece kesintisini eşitleme.",
        steps: [
          "Tek FR’nin etkisiz kesinti kabulünü al.",
          "Etkin geceyi 18 olarak koru.",
          "18>13 karşılaştırmasıyla uyarımı seç.",
        ],
        commonError: "Her ışık dalga boyunu aynı gece kesintisi saymak.",
        check: "Yorum sorunun tek FR kuralı dışına çıkmıyor.",
      },
      {
        prompt:
          "Olgun nötr gün örneğinde diğer koşullar uygun kabul ediliyor. Gün uzunluğunun 6 ile 18 saat arasında değişmesi çiçeklenme eşiği oluşturmuyor. Hangi yorum uygundur?",
        correct:
          "Bu örnekte fotoperiyodik eşik gereksinimi yoktur; genel ışık ve gelişim gereksinimleri yine bulunabilir.",
        reason:
          "Güne nötrlük belirli günlük süre eşiğini anlatır; bütün çevresel gereksinimleri silmez.",
        wrong: [
          [
            "Nötr gün bitkisi fotosentez için asla ışık kullanmaz.",
            "Fotoperiyodik eşik ve fotosentezin ışık gereksinimi farklıdır.",
          ],
          [
            "Nötr gün ifadesi yalnız gece 12 saatse çiçeklenir demektir.",
            "Verilen örnekte 6–18 saat aralığında böyle bir eşik yoktur.",
          ],
          [
            "Bu sonuç bütün sıcaklık ve beslenmelerde aynı büyümeyi garanti eder.",
            "Diğer koşulların uygun kabul edilmesi bu garantiyi vermez.",
          ],
          [
            "Bitkinin olgun olması önemli değildir; her tohum anında çiçek açar.",
            "Olgunluk ayrı gelişim koşuludur ve soruda sağlanmıştır.",
          ],
        ],
        knowledge: [
          "Nötr gün belirli fotoperiyodik eşikten bağımsızlıktır; koşulsuz yaşam değildir.",
        ],
        strategy: "Süre eşiğini diğer uygun kapılardan ayır.",
        steps: [
          "6–18 saatte eşik oluşmadığını belirle.",
          "Diğer koşulların uygun kabulünü koru.",
          "Nötrlüğü yalnız fotoperiyodik eşik kapsamında yorumla.",
        ],
        commonError:
          "Güne nötrlüğü bütün çevresel gereksinimlerden bağımsızlık sanmak.",
        check: "Yanıt süre yanıtıyla genel ışık gereksinimini karıştırmıyor.",
      },
      {
        prompt:
          "Kısa gün öğretim modelinde yalnız kritik geceden daha uzun etkin karanlık uyarıyor; tam eşitlikte biyolojik yanıt belirtilmemiş. Olgun bitkinin etkin gecesi ve kritik değeri 10 saat. Model ne demelidir?",
        correct: "Eşitlik sınırında var/yok kararı üretmemeli.",
        reason:
          "Verilen kural eşitliği sınıflamıyor; ek biyolojik kabul olmadan sınır kararı çıkarılmaz.",
        wrong: [
          [
            "Kesin uyarım var; >işareti her zaman eşitliği de içerir.",
            "Matematikte>daha büyük,≥büyük veya eşittir; kabul değiştirilmemelidir.",
          ],
          [
            "Kesin uyarım yok; gerçek bütün türler eşitlikte hiç yanıt vermez.",
            "Soruda gerçek eşitlik yanıtı belirtilmemiştir; evrensel sonuç çıkarılamaz.",
          ],
          [
            "Gece uzunluğu hesaplanamaz;10 sayısı kullanılamaz.",
            "Süre 10 olarak verilmiştir; eksik olan eşitlikteki yanıt kuralıdır.",
          ],
          [
            "Bitki zorunlu nötr gün grubuna dönüşür.",
            "Sınırda bilgi eksikliği gün grubunu değiştirmez.",
          ],
        ],
        knowledge: [
          "Eşik karşılaştırmasında eşitlik kuralı açıkça verilmelidir.",
        ],
        strategy: "Sayısal eşitliği veri yetersizliğinden ayır.",
        steps: [
          "10=10 eşitliğini belirle.",
          "Verilen kuralın yalnız daha uzun durumu kapsadığını oku.",
          "Sınırda karar yok sonucunu seç.",
        ],
        commonError:
          "Tanımlanmamış eşitlikte kendi biyolojik kuralını eklemek.",
        check:
          "Sonuç sayıyı değil eksik eşitlik kuralını sorun olarak tanımlıyor.",
      },
      {
        prompt:
          "Olgunluk kapısı gerekli olan bir kısa gün modelinde gece 15 saat, kritik 11 saat; diğer çevresel kapılar uygun. Bitki henüz çiçeklenme olgunluğunda değil. Sonuç nedir?",
        correct:
          "Gece koşulu uygun olsa da gerekli olgunluk kapısı sağlanmadığından uyarım sonucu verilmez.",
        reason:
          "15>11 fotoperiyodik koşulu sağlar; ancak açıkça gerekli gelişim şartı eksiktir.",
        wrong: [
          [
            "15>11 olduğundan diğer bütün kapılar otomatik açılır.",
            "Bir koşulun sağlanması olgunluğu otomatik sağlamaz.",
          ],
          [
            "Gece koşulu kesin yanlıştır;15 sayısı 11’den küçüktür.",
            "Sayısal karşılaştırma ters kurulmuştur.",
          ],
          [
            "Olgunluk eksikse model geceyi sıfır saat saymalıdır.",
            "Gelişim kapısı gerçek çevresel süreyi değiştirmez.",
          ],
          [
            "Bitki olgun değilse bütün hücreleri kesin ölüdür.",
            "Gelişim evresi canlılık kaybıyla aynı değildir.",
          ],
        ],
        knowledge: [
          "Çiçeklenme yanıtı fotoperiyodun yanında bağımsız gelişim kapıları gerektirebilir.",
        ],
        strategy: "Uygun süreyi gerekli olgunluk koşulundan ayrı kontrol et.",
        steps: [
          "15>11 ile gece koşulunu doğrula.",
          "Olgunluğun henüz sağlanmadığını kaydet.",
          "Bütün gerekli kapılar tamamlanmadığı sonucunu seç.",
        ],
        commonError:
          "Tek uygun koşulu bütün gelişim gereksinimlerinin yerine koymak.",
        check: "Gece doğru hesaplandı; olgunluk eksikliği ayrıca korundu.",
      },
      {
        prompt:
          "Gece ortasındaki çok kısa ışık darbesi çiçeklenme yanıtını değiştiriyor; darbenin toplam karbon kazanımına katkısı deneyde ihmal ediliyor. Hangi açıklama daha uygundur?",
        correct:
          "Işığın fotoperiyodik sinyal etkisi, yalnız fotosentezle daha çok besin üretme açıklamasından ayrılabilir.",
        reason:
          "Kısa darbenin süre algısını değiştirmesi büyük karbon kazancı gerektirmeyen bir sinyal yanıtıyla uyumludur.",
        wrong: [
          [
            "Yanıt değiştiyse darbe mutlaka gün boyu fotosentez kadar karbon kazandırmıştır.",
            "Deney karbon katkısını ihmal edilebilir olarak verir; bu varsayım eklenemez.",
          ],
          [
            "Çiçeklenme yanıtı değişmesi ışık reseptörlerinin hiç olmadığını kanıtlar.",
            "Sinyal yanıtı ışık algısıyla uyumludur; reseptör yokluğu çıkarılamaz.",
          ],
          [
            "Bir kısa darbe bitkinin yaşını anında bir yıl artırır.",
            "Model sinyal girdisi gelişim yaşının böyle artışı değildir.",
          ],
          [
            "Günlük toplam süreler aynıysa bütün biyolojik zamanlamalar kesin aynıdır.",
            "Kesintinin zaman düzeni yanıtı değiştirebilir.",
          ],
        ],
        knowledge: [
          "Sinyal etkisiyle net fotosentetik karbon katkısı farklı ölçümlerdir.",
        ],
        strategy: "Darbe zamanlaması bilgisini karbon bilançosundan ayır.",
        steps: [
          "Karbon katkısının ihmal edildiğini koru.",
          "Buna rağmen gelişim yanıtının değiştiğini belirle.",
          "Fotoperiyodik sinyal açıklamasını seç.",
        ],
        commonError:
          "Gece darbesinin bütün etkisini zorunlu büyük besin kazancına bağlamak.",
        check: "Yorum ihmal edilen karbon katkısını geri eklemiyor.",
      },
      {
        prompt:
          "Karartma örtüsü uygulanan serada çiçeklenme değişiyor; aynı anda sıcaklık ve nem de değişmiş, ayrı kontroller yok. Hangi çıkarım doğrudur?",
        correct:
          "Sonucu yalnız gece süresine kesin bağlamak için sıcaklık/nem etkilerini ayıran kontroller gerekir.",
        reason:
          "Birden çok etken birlikte değiştiğinde tek neden ataması mevcut veriyi aşar.",
        wrong: [
          [
            "Örtü kullanılması diğer değişkenleri otomatik etkisiz yapar.",
            "Sıcaklık ve nemin de değiştiği açıkça belirtilmiştir.",
          ],
          [
            "Çiçeklenme değişimi kesin yalnız fotoperiyottandır; kontrol gereksizdir.",
            "Karıştırıcı çevresel etkenler ayrılmamıştır.",
          ],
          [
            "Sıcaklık değiştiği için fotoperiyot hiçbir bitkide etkili olamaz.",
            "Bu deneyde ayrışmaması genel biyolojik etkisizlik kanıtı değildir.",
          ],
          [
            "Nem değişimi çiçeklerin kromozom sayısını kesin iki katına çıkarır.",
            "Böyle bir kromozom ölçümü veya zorunlu mekanizma verilmemiştir.",
          ],
        ],
        knowledge: [
          "Birden çok değişkenli deneyde özgül nedensellik için uygun kontroller gerekir.",
        ],
        strategy: "Örtünün değiştirdiği bütün girdileri listele.",
        steps: [
          "Gece süresiyle sıcaklık ve nemin birlikte değiştiğini belirle.",
          "Tek etkeni ayıran kontrol olmadığını kaydet.",
          "Ek kontrol gereksinimini seç; tek nedeni kesinleştirme.",
        ],
        commonError:
          "Bir uygulama adıyla bütün sonuçları tek çevresel etkene bağlamak.",
        check:
          "Sonuç biyolojik olasılıkları dışlamadan deneyin neden ayırma sınırını söylüyor.",
      },
    ],
  },
  {
    id: "cicek-yapisi-ureme",
    topic: "detail-354",
    title: "Çiçeğin yapısı: organ takımları ve üreme hücrelerinin kökeni",
    minutes: 115,
    objectives: [
      "Çiçeğin kısımlarını işlev ve birbirine göre konumlarıyla tanı.",
      "Tamlık, eşeylilik ve evciklilik ölçütlerini birbirinden ayır.",
      "Mikrospor ve megaspor yollarında mayoz, mitoz, hücre ve çekirdek sayılarını verilen tipik modelde izle.",
    ],
    source:
      "Aurelia YKS arşivindeki MEBİ AYT Biyoloji Çiçeğin Kısımları ve Görevleri özeti; OGM Bitkilerde Eşeyli Üreme I sunusu ve konu özeti; Dersler Cepte Bitkilerde Eşeyli Üreme karşılaştırılarak hazırlanmış özgün anlatım ve şemalar. Tipik embriyo kesesinde yedi hücre/sekiz çekirdek ile tam–erselik ayrımı açıkça korunmuştur.",
    sections: [
      {
        title: "Çiçeği kapalı tohumlu sürgünün üreme yapısı olarak tanı",
        paragraphs: [
          "Çiçek kapalı tohumlu bitkilerin eşeyli üreme yapısıdır; sınırlı büyüyen değişmiş bir sürgün üzerinde özelleşmiş organlar taşır. Açık tohumlularda kozalak gibi yapılar bulunur; bütün tohumlu bitkileri çiçekli diye adlandırma. Eşeysiz çoğalma yolları çiçek ve döllenme olmadan da işleyebilir.",
          "Önkoşul olarak kromozom takımı, mayoz ve mitozu hatırla. Bitkinin görünen gövde, yaprak ve çiçek dokuları çoğunlukla diploit sporofite aittir; polen ve embriyo kesesi haploit gametofit evreleridir. Gamet, gametofit ve bütün organ aynı şey değildir.",
        ],
      },
      {
        title: "Sap ve tabla organların bağlandığı ekseni kurar",
        paragraphs: [
          "Çiçek sapı çiçeği sürgüne bağlar ve taşır. Sapın genişlemiş uç bölgesi çiçek tablası, çiçek organlarının bağlandığı alandır. Bu destek yapılarıyla polen üreten başçığı veya tohum taslağı içeren yumurtalığı aynı parça sanma.",
          "Tipik tam çiçekte dıştan içe çanak yaprak, taç yaprak, erkek organ ve dişi organ takımları düşünülür. Organ sayısı ve birleşme biçimleri türlere göre değişebilir. Şema dört takımın konum ilişkisini gösterir; bütün türlerde eşit sayıda ayrı yaprakçık olduğunu iddia etmez.",
        ],
      },
      {
        title: "Çanak yaprak tomurcuk örtüsüne katkı verir",
        paragraphs: [
          "Çanak yapraklar tipik çiçeğin dış organ takımıdır; çoğunlukla yeşildir ve tomurcuk evresinde iç yapıları korumaya katkı verir. Kloroplastlı örneklerde fotosentez de yapabilir. Yaprak benzeri görünüm, her çanak yaprağın aynı boyut ve renkte olmasını gerektirmez.",
          "Dışta bulunmak ile dişi/erkek gamet oluşturmak farklı görevlerdir. Bir çiçekte çanak yaprak bulunmaması tamlık kararını etkileyebilir ama tek başına hangi eşey organının bulunduğunu söylemez. Organ takımının varlığını işleve ilişkin başka çıkarımlardan ayır.",
        ],
      },
      {
        title: "Taç yaprak tozlaştırıcıyla ilişki kurabilir",
        paragraphs: [
          "Taç yapraklar birçok türde renk, koku ve biçimle hayvan tozlaştırıcıların ziyaretine katkı verir. Nektar üretimi farklı salgı yapılarıyla ilişkili olabilir; her taç yaprağı zorunlu nektar bezi sayma. Rüzgârla tozlaşan birçok çiçekte bu gösteriş daha azdır.",
          "Taç yaprağın görevi doğrudan sperm hücresi üretmek değildir. Parlak renkli her çiçek kesin tek bir hayvanla tozlaşır gibi sonuçlar da çıkarılmaz. Yapı özellikleri olası tozlaşma yolu için kanıt oluşturur; gerçek ziyaret ve polen taşıması ölçümü açıklamayı güçlendirir.",
        ],
      },
      {
        title: "Erkek organı sapçık ve başçıkla kur",
        paragraphs: [
          "Erkek organın sapçığı başçığı taşır; başçıkta polen keseleri bulunur. Tipik öğretim çiziminde dört polen kesesi gösterilebilir; bu bütün türlerde değişmez anatomik sayı diye kullanılmaz. Keselerde diploit mikrospor ana hücreleri gelişir.",
          "Başçık bir organa ait diploit dokularla haploit gelişim ürünlerini birlikte barındırabilir. Organın tamamını içinde bulunan polenin kromozom takımıyla aynı sayma. Polen bir sperm hücresi değildir; sperm hücrelerini oluşturacak erkek gametofit yapısına aittir.",
        ],
      },
      {
        title: "Dişi organda tepecik, boyun ve yumurtalığı ayır",
        paragraphs: [
          "Tepecik polenin tutulup uygun koşulda çimlenebildiği yüzeydir. Dişicik borusu, tepecikle yumurtalık arasındaki bölgedir; polen tüpünün ilerleyebileceği dokuları barındırır. Yumurtalık ise bir veya daha fazla tohum taslağını içerir.",
          "Tohum taslağının içindeki embriyo kesesiyle bütün yumurtalığı aynı boyutta yapı sanma. Mikropil tohum taslağının örtülerindeki açıklıktır; yumurtalığın tepeciği değildir. Polen tüpü dişicik borusunun kendisi değil, polenden gelişen hücresel uzantıdır.",
        ],
      },
      {
        title: "Tamlık dört organ takımının varlığıdır",
        paragraphs: [
          "Çanak, taç, erkek ve dişi organ takımlarının tamamı varsa çiçek tam olarak adlandırılır. Bu takımlardan en az biri yoksa eksik çiçektir. Karar kaç tane tekil taç yaprak sayıldığına değil, ilgili organ takımının bulunmasına dayanır.",
          "Taç yapraksız fakat erkek ve dişi organlı bir çiçek eksik ve iki eşeyli olabilir. Eksik çiçek demek her zaman yalnız erkek veya yalnız dişi organ var demek değildir. Etkileşimde dört takımı bağımsız açıp kapatarak bu ayrımı kendi örneğinle sınayabilirsin.",
        ],
      },
      {
        title: "Ersellik yalnız iki üreme organına bakar",
        paragraphs: [
          "Aynı çiçekte erkek ve dişi organ birlikte bulunuyorsa iki eşeyli yani erselik çiçek olarak adlandırılır. Yalnız erkek organ varsa erkek, yalnız dişi organ varsa dişi çiçek söz konusudur. Diğer organ takımlarının varlığı ayrı tamlık ölçütüdür.",
          "Tipik tam çiçek iki eşeylidir; ancak her iki eşeyli çiçek zorunlu tam değildir. İki kavramı eş anlamlı yazmak taç yapraksız iki eşeyli örneği açıklayamaz. Her iki üreme organı da bulunmayan şematik örnekte işlevsel erkek/dişi organ yoktur; bu da modelde açıkça belirtilir.",
        ],
      },
      {
        title: "Evciklilik tek çiçeğin değil bitkinin dağılımıdır",
        paragraphs: [
          "Erkek ve dişi çiçekler aynı birey üzerinde ayrı çiçekler olarak bulunuyorsa tek evciklilik; farklı bireylerde bulunuyorsa iki evciklilik söz konusudur. Bu ölçüt çiçekler arasında ve bireyler arasında dağılımı gerektirir. Bir erkek çiçeğin tek fotoğrafından bitkinin evcikliliğini belirleyemezsin.",
          "Mısır gibi tek evcikli örneklerde aynı bireyin farklı yerlerindeki erkek ve dişi çiçekler ayırt edilir. Kivi gibi iki evcikli örneklerde bireylerin üreme yapıları ayrıdır. Tür listeleri çeşide göre farklılık gösterebilir; soruda açık verilen dağılım en güçlü veridir.",
        ],
      },
      {
        title: "Mayoz spor oluşturur, her zaman doğrudan gamet değil",
        paragraphs: [
          "Çiçekli bitkide mikrospor ana hücresi mayozla mikrospor; megaspor ana hücresi mayozla megaspor oluşturur. Bunlar haploit sporlardır ve gametofit gelişiminin başlangıcıdır. Hayvanlardaki gamet oluşumunun basit şemasını bitkiye aynen taşımak bu ara evreyi kaybettirir.",
          "Gametler bu haploit evrede mitozla veya mitotik gelişim içinde oluşur. Kromozom takımı mayozda yarıya iner; normal mitozda korunur. Bir n hücre mitoz geçirdi diye 2n olmaz; DNA’nın bölünmeden önce eşlenmesi takım sayısının iki katına çıkmasıyla aynı değildir.",
        ],
      },
      {
        title: "Bir mikrospor ana hücresi dört ürüne ayrılır",
        paragraphs: [
          "Tipik modelde diploit bir mikrospor ana hücresi mayoz geçirerek dört haploit mikrospor oluşturur. Ana hücrede 2n=18 ise her normal mikrosporda n=9 kromozom vardır. Dört ürünün genetik olarak mutlaka özdeş olduğunu söyleme; mayoz çeşitliliğe katkı verir.",
          "Birçok ana hücre verildiğinde ve hepsinin normal geliştiği kabul edildiğinde ürün sayısı dörtle çarpılabilir. Ancak mikrospor sayısıyla sperm sayısı aynı aşamanın sonucu değildir. Sonraki mitoz ve farklılaşma basamaklarını sırayla eklemek gerekir.",
        ],
      },
      {
        title: "Mikrospordan iki hücreli polen gelişebilir",
        paragraphs: [
          "Tipik örnekte mikrosporun mitozu ve hücreselleşmesiyle tüp hücresi ve generatif hücre içeren polen gelişir. Tüp hücresi polen tüpünün oluşumuyla, generatif hücre sperm oluşumuyla ilişkilidir. Her ikisinin kromozom takımı başlangıçtaki mikrospor gibi haploittir.",
          "Bazı türlerde polen dağılırken iki hücreli, bazılarında generatif hücre önceden bölündüğü için üç hücreli olabilir. Ders modeli iki hücreli oluşumu ve sonra generatif mitozu ayrı gösterir. Çizimin bir aşamasını bütün türlerin tek olgun polen durumu sanma.",
        ],
      },
      {
        title: "Generatif hücre mitozuyla iki sperm oluşur",
        paragraphs: [
          "Generatif hücrenin mitozu iki haploit sperm hücresi oluşturur. Bu bölünme kromozom sayısını yeniden yarıya indirmez; zaten haploit olan takım korunur. Polen tüpünün büyümesi ve sperm oluşumu ilişkili ama aynı hücresel görev değildir.",
          "Dört mikrospordan her biri bu yolda ilerlerse dört polen ve toplam sekiz sperm oluşabilir. Bu sayı tüm ürünlerin normal geliştiği kabulüne bağlıdır. Çift döllenmenin çekirdek birleşmeleri sonraki ünitede ele alınacaktır; burada sperm kökeni ve hücresel yapı temel önkoşuldur.",
        ],
      },
      {
        title: "Megaspor yolunda dört üründen biri işlevli kalır",
        paragraphs: [
          "Tipik monosporik örnekte diploit megaspor ana hücresi mayozla dört haploit megaspor oluşturur; çoğunlukla üçü kaybolur, biri işlevli kalır. Böylece dört ürün oluşması dört embriyo kesesi geliştiği anlamına gelmez. Mikrospor yoluyla aynı verim kuralını kullanma.",
          "Ana hücrede 2n=18 ise işlevli megaspor n=9 taşır. Kayıp olan üç hücrenin kromozomları kalan hücreye eklenmiş gibi toplanmaz. Ürün sayısı, canlı kalan ürün sayısı ve kromozom takımı ayrı değişkenlerdir.",
        ],
      },
      {
        title: "Sitokinez olmadan mitoz çekirdek sayısını artırır",
        paragraphs: [
          "İşlevli megaspor çekirdeği tipik örnekte sitokinez olmadan üç mitoz döngüsü geçirir; çekirdek sayısı 1→2→4→8 olur. Bu sırada her döngüde sekiz ayrı hücre oluşması gerekmez. Çekirdek bölünmesi ile sitoplazmanın hücrelere ayrılmasını ayrı izle.",
          "Her normal çekirdek haploit takımı korur. Üç mitoz geçirildi diye n değerini üçe bölme veya 8n tek çekirdek oluşturma. Sekiz çekirdeğin ayrı ayrı n taşıması, bir çekirdeğin sekiz takım taşımasıyla aynı durum değildir.",
        ],
      },
      {
        title: "Tipik embriyo kesesi yedi hücre ve sekiz çekirdektir",
        paragraphs: [
          "Hücreselleşme sonrası tipik kesede bir yumurta hücresi, iki sinerjit hücre, üç antipod hücre ve ortada iki polar çekirdek taşıyan bir merkez hücre bulunur. Hücre sayısı 1+2+3+1=7; çekirdek sayısı 1+2+3+2=8 olur. Ortadaki iki çekirdek hücre değildir.",
          "Modelde polar çekirdeklerin henüz birleşmediği kabul edilir; her biri n taşır. Birleşmiş merkez çekirdeği kullanılan başka bir aşamada sayı ve takım ifadesi ayrıca belirtilmelidir. Kaynaktaki altı hücre/sekiz çekirdek ifadesi merkez hücreyi dışarıda bırakır; bu anlatım doğru yedi hücre sayımını kullanır.",
        ],
      },
      {
        title: "Mikropil ve zıt kutbu konumla tanı",
        paragraphs: [
          "Yumurta ve iki sinerjit mikropile yakın kutuptaki yumurta aygıtını oluşturur; üç antipod karşı kutuptadır. İki polar çekirdek merkez hücre içinde bulunur. Şekli döndürmek mikropile göre yakınlık ilişkisini değiştirmez. Ekranda üst ve alt ezberinden önce açıklığı bul.",
          "Sinerjitler polen tüpü yönlenmesi ve alımıyla ilişkili işaretlere katkı verebilir. Yumurta hücresi embriyo kesesinin tümü değildir; merkez hücre de yumurtalığın tamamı değildir. Küçük yapıdan büyük organa hiyerarşiyi korumak konum sorularını kolaylaştırır.",
        ],
      },
      {
        title: "İki üreme yolunu doğru ölçülerle karşılaştır",
        paragraphs: [
          "Erkek yolda bir ana hücreden dört işlevli mikrospor gelişebilir; tipik dişi yolda dört mayoz ürününden biri işlevli kalır. Erkek yolda generatif mitoz iki sperm verir; dişi yolda mitotik çekirdek çoğalması ve hücreselleşme yumurta taşıyan gametofiti kurar. Mayoz iki yolun başında takım sayısını düşürür.",
          "Polen sayısı, sperm sayısı, embriyo kesesi sayısı ve yumurta sayısını aynı adımda birbirine eşitleme. Sorunun hangi evreyi saydığını açıkça işaretle. Normal gelişim ve kayıp yok gibi sayısal kabuller, hesap yapılabilmesi için kart üzerinde verilmiş olmalıdır.",
        ],
      },
      {
        title: "İki ayrı modeli birleştirmeden kullan",
        paragraphs: [
          "Organ modeli dört organ takımının varlığını değiştirir; görünür çiçek yapısı ve tamlık/eşeylilik kararını gösterir. Üreme yolu modeli ise hücre kökeni ve n/2n bilgisini aşama aşama izler. Taç yaprağı kapatmak mayoz ürünlerinin kromozom sayısını otomatik değiştirmez.",
          "Dişi organı olmayan çiçek çiziminde yumurtalık gösterilmez; bu durum hücre yolu modelinin başka bir uygun çiçekteki tipik gelişimini geçersiz kılmaz. Aynı sayfada farklı öğretim modellerinin kendi kabullerini korumak, kontrol değişikliklerini bütün biyolojiye yaymayı önler.",
        ],
      },
      {
        title: "Yeni sayımlarda birim ve aşamayı kontrol et",
        paragraphs: [
          "Bir ana hücredeki kromozom sayısını, ürünlerin sayısını ve ürün başına çekirdek/hücre sayısını üç sütunda yaz. Önce mayozda takımı yarıya indir, sonra mitozda koru; kaybolan megasporları ayrıca çıkar. Hücreselleşme aşamasında çekirdekle hücreyi farklı say.",
          "Sonucunu küçük bir tutarlılık hesabıyla denetle: tipik kesede yedi hücrenin biri iki çekirdekli olduğundan sekiz çekirdek bulunabilir. Tipik polende generatif hücre iki sperme dönüşünce tüp hücresiyle toplam üç hücre yer alabilir. Döllenme ve tohum oluşumu henüz bu sayımlara eklenmez.",
        ],
      },
    ],
    examples: [
      {
        title: "İki sınıfın oranını ters yönde karşılaştır",
        prompt:
          "Sekiz çiçeğin dördünde dört organ takımı da var; ikisinde yalnız taç takımı eksik ama erkek ve dişi organ birlikte; kalan ikisi yalnız erkek üreme organlı. İki eşeyli çiçeklerin ne kadarı tam, tam çiçeklerin ne kadarı iki eşeylidir?",
        strategy: "Önce kümeleri kur, sonra koşullu paydaları değiştir.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "İki eşeyli toplamını 4+2=6; tam toplamını 4 olarak say.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "İki eşeyliler içinde tam oranı 4/6=2/3, yaklaşık%66,7’dir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Tamların içindeki iki eşeyli oranı 4/4=%100; aynı iki ad ters koşulda aynı oranı vermez.",
          },
        ],
        answer:
          "İki eşeylilerin yaklaşık%66,7’si tam; tamların%100’ü iki eşeyli.",
        check: "Paydaları 6 ve 4 olarak ayrı kullandın mı?",
        pitfall: "Tam→erselik ilişkisinin tersini koşulsuz aynı saymak.",
      },
      {
        title: "Bir ana hücreden ürünleri hesapla",
        prompt:
          "2n=30 olan beş mikrospor ana hücresinin her biri normal mayoz geçiriyor; dört ürünün hepsi polene, her polen iki sperme gelişiyor. Kaç polen ve sperm oluşur, sperm başına kaç kromozom vardır?",
        strategy: "Ürün sayısını ve kromozom takımını ayrı hesapla.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "5×4=20 mikrospor ve polen bul.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "20×2=40 sperm; mayoz sonrası n=15 kromozom olduğunu belirle.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Generatif mitozun n’yi yeniden yarıya indirmediğini denetle.",
          },
        ],
        answer: "20 polen,40 sperm; sperm başına 15 kromozom.",
        check: "Ürün sayısını kromozom sayısıyla karıştırmadın mı?",
        pitfall: "Sperm mitozunda kromozomları yeniden ikiye bölmek.",
      },
      {
        title: "Dişi yolda kaybı hesaba kat",
        prompt:
          "2n=26 olan altı megaspor ana hücresi tipik monosporik yoldan gelişiyor. Her birinde dört mayoz ürününden biri işlevli kalıyor. Kaç işlevli megaspor ve tipik embriyo kesesi beklenir?",
        strategy: "Mayoz ürünleriyle kalıcı gelişim ürününü ayır.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "6×4=24 başlangıç mayoz ürünü bulunduğunu hesapla.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Her ana hücre başına bir işlevli ürün kaldığından 6 işlevli megaspor bul.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Her biri bir keseye gelişirse 6 kese; her haploit çekirdekte 13 kromozom bulunur.",
          },
        ],
        answer: "6 işlevli megaspor ve 6 kese; her n çekirdekte 13 kromozom.",
        check: "Üç kaybı her ana hücre için uyguladın mı?",
        pitfall: "24 mayoz ürününü 24 embriyo kesesi saymak.",
      },
      {
        title: "Hücreselleşme toplamları nasıl değiştirir?",
        prompt:
          "On iki tipik embriyo kesesi adayı, her biri tek hücre içinde 8 çekirdekle hücreselleşme öncesi durumda. Yeni çekirdek bölünmesi olmadan her biri tipik 7 hücreli,8 çekirdekli yapıya ayrılıyor. Önce/sonra toplam hücre ve çekirdek sayılarını bul.",
        strategy: "Hücre sınırı oluşumuyla çekirdek bölünmesini farklı say.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "Başlangıçta 12 hücre ve 12×8=96 çekirdek hesapla.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Hücreselleşme sonrası 12×7=84 hücre ve hâlâ 96 çekirdek bul.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Hücre sayısı 72 artmış; çekirdek sayısı artmamış. Bu verilen geçişte yeni mitoz eklenmediğini koru.",
          },
        ],
        answer: "Hücre 12→84; çekirdek 96→96.",
        check:
          "Yeni hücre sınırlarını yeni çekirdek üretimi diye iki kez saydın mı?",
        pitfall:
          "Hücre sayısı artan her olayda çekirdek sayısının aynı oranda artacağını varsaymak.",
      },
      {
        title: "Merkez hücreyi sayımdan çıkarma",
        prompt:
          "Tipik embriyo kesesinde 3 antipod,2 sinerjit,1 yumurta ve iki polar çekirdekli 1 merkez hücre var. Polar çekirdekler birleşmemiş. Hücre ve çekirdek sayılarını doğrula.",
        strategy:
          "Önce zarla ayrılan hücreleri, sonra içlerindeki çekirdekleri say.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "3+2+1+1=7 hücreyi hesapla.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "İlk altı hücrede birer, merkezde iki çekirdek olduğundan 6+2=8 bul.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "İki polar çekirdeği iki hücre sayma; merkez hücreyi de yok sayma.",
          },
        ],
        answer: "7 hücre ve 8 çekirdek.",
        check: "İki farklı sayımın farkı merkez hücreyle açıklanıyor mu?",
        pitfall: "Merkezdeki iki çekirdeği hiç hücre yokmuş gibi dışlamak.",
      },
      {
        title: "Birey dağılımı için ek gözlem iste",
        prompt:
          "Bir fotoğrafta yalnız erkek organlı tek çiçek var. Bitkinin aynı bireyde başka dişi çiçekler taşıyıp taşımadığı bilinmiyor. Tek/iki evciklilik kararı için ne gerekir?",
        strategy: "Tek çiçek gözleminin kapsamını belirle.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "Fotoğrafın erkek çiçeği gösterdiğini söyle.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Aynı bireyin diğer çiçekleri ve başka bireylerin dişi çiçek dağılımını incele.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Aynı bireyde iki ayrı eşey çiçeği tek evcikli; ayrı bireyler iki evcikli olabilir.",
          },
        ],
        answer: "Bireyler üzerindeki erkek–dişi çiçek dağılımı gerekir.",
        check: "Çiçeğin eşeyini bitkinin evcikliliğiyle eşitlemedin mi?",
        pitfall: "Tek erkek çiçekten kesin iki evcikli bitki kararı vermek.",
      },
    ],
    recall: [
      {
        prompt: "Polen ile sperm niçin aynı yapı değildir?",
        answer:
          "Polen erkek gametofittir; generatif hücresi mitozla iki sperm oluşturabilir, tüp hücresi de ayrı görev taşır.",
      },
      {
        prompt: "Eksik ama erselik çiçek nasıl mümkün olur?",
        answer:
          "Erkek ve dişi organ birlikteyken çanak veya taç takımı eksik olabilir; iki ölçüt farklıdır.",
      },
      {
        prompt:
          "Tohum taslağı, yumurtalık ve embriyo kesesi hangi hiyerarşidedir?",
        answer:
          "Yumurtalık tohum taslağını, tohum taslağı embriyo kesesini barındırır.",
      },
      {
        prompt: "Üç sitokinezsiz mitozda tek çekirdek nasıl sekize çıkar?",
        answer:
          "Döngülerde 1→2→4→8 çekirdek olur; hücre ayrılması henüz gerçekleşmez.",
      },
      {
        prompt: "Tipik kesede 7 hücre/8 çekirdek farkını ne oluşturur?",
        answer:
          "Merkez hücrede iki polar çekirdek bulunması; diğer altı hücrede birer çekirdek vardır.",
      },
      {
        prompt: "Tek/iki evciklilik için niçin tek çiçek yetmez?",
        answer:
          "Ölçüt erkek ve dişi çiçeklerin aynı bireyde veya farklı bireylerde dağılımıdır.",
      },
    ],
    items: [
      {
        prompt:
          "Tipik kapalı tohumlu çiçekte başçık polen keselerini taşır, sapçık başçığı destekler. Bu iki yapının oluşturduğu organ hangisidir?",
        correct: "Erkek organ.",
        reason:
          "Sapçık ve başçık erkek organın bölümleridir; polen gelişimi başçıktaki keselerle ilişkilidir.",
        wrong: [
          [
            "Dişi organ; sapçık yumurtalığın boynudur.",
            "Dişi organ tepecik, dişicik borusu ve yumurtalıkla tanımlanır.",
          ],
          [
            "Taç yaprak; polen keseleri bütün taçların içindedir.",
            "Polen keseleri verilen başçık yapısındadır; taç yaprakla eşit değildir.",
          ],
          [
            "Tohum taslağı; sapçık mikropilin kendisidir.",
            "Tohum taslağı yumurtalık içinde bulunur; sapçık erkek organ desteğidir.",
          ],
          [
            "Çanak yaprak; iki ad aynı dış yaprağı belirtir.",
            "Çanak yaprak dış takım olup sapçık–başçık çiftinden farklıdır.",
          ],
        ],
        knowledge: ["Erkek organ sapçık ve başçık bölümlerinden oluşur."],
        strategy:
          "Destek ve polen kesesi işlevlerini aynı organın iki bölümüne bağla.",
        steps: [
          "Polen kesesi taşıyan bölümü başçık olarak al.",
          "Onu destekleyen sapçığı kaydet.",
          "Bu ikisini erkek organ çatısında birleştir.",
        ],
        commonError: "Başçıkla yumurtalığı aynı polen üretim yapısı saymak.",
        check: "Seçenek hem sapçık hem polen keseli başçığı kapsıyor.",
      },
      {
        prompt:
          "Verilen çiçekte A tepecik, B dişicik borusu, C yumurtalık; C içinde tohum taslakları bulunuyor. Polen tüpünün ilerleyebileceği yol için en uygun sıra hangisidir?",
        correct:
          "A’daki polen başlangıcı → B boyunca ilerleme → C içindeki tohum taslağına yönelme.",
        reason:
          "Tepecik başlangıç yüzeyi, dişicik borusu geçiş bölgesi ve yumurtalık tohum taslağının bulunduğu organdır.",
        wrong: [
          [
            "C→B→A; polen ilk kez yumurtada oluşur.",
            "Polen başçık kaynaklı olup tepeciğe taşınır; yumurtada üretilmez.",
          ],
          [
            "A→çanak yaprak→sapçık; dişicik borusunun rolü yoktur.",
            "Verilen dişi organ yolu çanak ve erkek sapçık üzerinden geçmez.",
          ],
          [
            "B→A→C; polen tepeciğe ancak boru içinden dışarı çıkarak ulaşır.",
            "Kapalı tohumlu tozlaşmada tepecik dıştan polen alır.",
          ],
          [
            "A’da tüp görülürse çift döllenme kesin tamamlanmıştır.",
            "Tüp başlangıcı sonraki çekirdek birleşmelerinin tamamlandığını göstermez.",
          ],
        ],
        knowledge: [
          "Dişi organ bölümlerinin konum ve görevi yol sırasını belirler.",
        ],
        strategy:
          "Tanımlanmış harfleri olay başlangıcı ve iç hedefe göre sırala.",
        steps: [
          "A’yı polenin alındığı tepecik yüzeyi olarak belirle.",
          "B’yi ilerleme bölgesi olarak yerleştir.",
          "C’deki tohum taslağı yönünü son hedef olarak seç.",
        ],
        commonError:
          "Polen tüpü başlangıcını tamamlanmış döllenmeyle eşitlemek.",
        check: "Harflerin organ adları ve yol sırası korunuyor.",
      },
      {
        prompt:
          "Bir çiçekte çanak ve taç yok; erkek ve dişi organlar birlikte var. Dört organ takımına göre ve eşey organlarına göre doğru sınıflama hangisidir?",
        correct: "Eksik ve iki eşeyli.",
        reason:
          "Dört takım tamamlanmadığı için eksik; erkek ve dişi birlikte olduğu için erseliktir.",
        wrong: [
          [
            "Tam ve iki eşeyli; iki üreme organı tüm takımlara eşittir.",
            "Tamlık ayrıca çanak ve taç takımını da gerektirir.",
          ],
          [
            "Eksik ve yalnız erkek; dişi organ taç yoksa yok sayılır.",
            "Dişi organın varlığı açıkça verilmiştir; taç yokluğu onu silmez.",
          ],
          [
            "Tam ve yalnız dişi; erkek organ çanaksız gelişemez.",
            "Sorunun verilen organ varlığı böyle bir varsayımla değiştirilemez.",
          ],
          [
            "Kesin iki evcikli; tek çiçekteki organlar birey dağılımını verir.",
            "Evciklilik için farklı çiçeklerin bireyler üzerindeki dağılımı gerekir.",
          ],
        ],
        knowledge: [
          "Tamlık ve eşeylilik farklı organ ölçütleriyle belirlenir.",
        ],
        strategy:
          "Dört takım kontrolünü iki üreme organı kontrolünden ayrı yap.",
        steps: [
          "Çanak ve taç eksikliğinden tam olmadığını belirle.",
          "Erkek ve dişinin birlikte olduğunu kaydet.",
          "Eksik+iki eşeyli sonucunu seç.",
        ],
        commonError: "Tam çiçekle erselik çiçeği koşulsuz eş anlamlı saymak.",
        check: "İki sınıflama iki farklı veri kümesiyle tutarlı.",
      },
      {
        prompt:
          "Aynı bitki bireyi üzerinde ayrı erkek çiçekler ve ayrı dişi çiçekler var. Bu dağılıma verilen ad hangisidir?",
        correct: "Tek evciklilik.",
        reason:
          "Ayrı eşeyli çiçeklerin aynı bireyde bulunması tek evciklilik ölçütüdür.",
        wrong: [
          [
            "İki evciklilik; çiçekler ayrıysa bireyler de mutlaka ayrıdır.",
            "Çiçeklerin ayrı olması aynı bireyde bulunmalarını engellemez.",
          ],
          [
            "Tek çiçekte ersellik; iki ayrı çiçek aynı organ demektir.",
            "Erselik tek çiçekte iki üreme organının birlikte bulunmasıdır.",
          ],
          [
            "Tam çiçek; bireyde her iki eşey bulunması çanak/taç varlığını kanıtlar.",
            "Tamlık tek çiçeğin dört takımına aittir; dağılım bunu vermez.",
          ],
          [
            "Kendine uyumluluk; aynı bireyde iki eşey varsa genetik engel yoktur.",
            "Evciklilik genetik uyum sistemini tek başına belirlemez.",
          ],
        ],
        knowledge: [
          "Evciklilik erkek ve dişi çiçeklerin bireyler üzerindeki dağılımıdır.",
        ],
        strategy: "Çiçek ve birey sayısını ayrı izle.",
        steps: [
          "Erkek ve dişi çiçeklerin ayrı olduğunu al.",
          "İkisinin aynı birey üzerinde bulunduğunu kaydet.",
          "Tek evcikli adını seç.",
        ],
        commonError: "İki ayrı çiçeği zorunlu iki ayrı birey saymak.",
        check: "Adlandırma sorunun aynı birey verisine dayanıyor.",
      },
      {
        prompt:
          "Bir bahçede X bireyleri yalnız erkek, Y bireyleri yalnız dişi çiçek taşıyor; incelenen türde eşeyler farklı bireylerde. Doğru adlandırma hangisidir?",
        correct: "İki evciklilik.",
        reason:
          "Erkek ve dişi çiçeklerin farklı bireylerde dağılımı iki evciklilik ölçütüdür.",
        wrong: [
          [
            "Tek evciklilik; aynı bahçede olmaları aynı birey demektir.",
            "Ortak ortam aynı bitki bireyi olmak değildir.",
          ],
          [
            "Erselik; türde iki eşey bulunması tek çiçekte birlikte olduklarını gösterir.",
            "Erselik tek çiçeğin organlarına aittir; burada ayrı bireyler vardır.",
          ],
          [
            "Tam çiçek; çanak ve taç takımları bu veriden sayılır.",
            "Veri çanak ve taç takımlarını belirtmez.",
          ],
          [
            "Kesin aynı genotip; bireylerin farklı olması genetik farkı yok eder.",
            "Birey dağılımı genotip eşitliği veya farkının miktarını vermez.",
          ],
        ],
        knowledge: [
          "İki evciklilik bireyler arasında eşey dağılımını anlatır.",
        ],
        strategy: "Bahçe ortaklığını birey kimliğiyle karıştırma.",
        steps: [
          "X ve Y’nin ayrı bireyler olduğunu belirle.",
          "Erkek ve dişi çiçeklerin bu bireylerde ayrıldığını kaydet.",
          "İki evciklilik sınıfını seç.",
        ],
        commonError: "Aynı ortamı aynı bitki bireyi saymak.",
        check: "Karar yalnız verilen farklı birey dağılımına dayanıyor.",
      },
      {
        prompt:
          "2n=24 olan bir bitkinin başçık duvar hücresi, mikrospor ana hücresi ve normal mayoz sonrası mikrosporu inceleniyor. Kromozom sayıları sırası hangisidir?",
        correct: "24,24,12.",
        reason:
          "Sporofit duvar ve ana hücre diploit; mayoz ürünü mikrospor haploittir.",
        wrong: [
          [
            "12,12,12.",
            "Başçık duvarı ve ana hücre mayoz ürünü olarak verilmemiştir; diploittir.",
          ],
          ["24,12,6.", "Ana hücre 24’tür; takım düşüşü mayozda bir kez olur."],
          ["24,24,24.", "Normal mayoz sonrası mikrosporda takım yarıya iner."],
          [
            "12,24,48.",
            "Duvar diploit ve mikrospor haploit bilgileri ters büyütülmüştür.",
          ],
        ],
        knowledge: [
          "Bir organın içindeki farklı hücreler farklı köken ve ploidide olabilir.",
        ],
        strategy: "Her hücreyi mayozdan önce/sonra konumuna yerleştir.",
        steps: [
          "Duvarı sporofit diploit 24 olarak al.",
          "Mikrospor ana hücresini diploit 24 koru.",
          "Mayoz ürününü 12 olarak hesapla.",
        ],
        commonError:
          "Başçığın tüm hücrelerini polenin haploit takımıyla aynı saymak.",
        check: "Takım değişimi yalnız ana hücreden mikrospora geçişte yapıldı.",
      },
      {
        prompt:
          "2n=20 olan üç mikrospor ana hücresinin tümü normal mayoz geçiriyor; ürün kaybı yok. Oluşan mikrospor sayısı ve her birinin kromozom sayısı hangisidir?",
        correct: "12 mikrospor; her birinde 10 kromozom.",
        reason: "Her ana hücre dört ürün verir:3×4=12; her ürün n=10’dur.",
        wrong: [
          [
            "3 mikrospor; her birinde 20 kromozom.",
            "Mayoz ürün sayısı ve takım düşüşü hesaba katılmamıştır.",
          ],
          [
            "6 mikrospor; her birinde 10 kromozom.",
            "Mayoz tam süreçte her ana hücre dört ürün verir; ikiyle sınırlanmaz.",
          ],
          [
            "12 mikrospor; her birinde 5 kromozom.",
            "Mayoz takımını bir kez yarıya indirir;20→10’dur.",
          ],
          [
            "40 mikrospor; her birinde 3 kromozom.",
            "Hücre sayısı ile kromozom sayısı yanlış ölçülere çevrilmiştir.",
          ],
        ],
        knowledge: ["Normal mikrospor mayozunda dört haploit ürün oluşur."],
        strategy: "Ürün sayısını ve ürün başına kromozomu ayrı hesapla.",
        steps: [
          "3×4=12 ürün bul.",
          "20/2=10 kromozom hesapla.",
          "İki sonucu mikrospor sayısı ve hücre başına olarak yaz.",
        ],
        commonError: "Mayozun iki bölünmesini yalnız iki ürün saymak.",
        check: "Hücre sayısı ve her hücrenin kromozomu ayrı birimlerde kaldı.",
      },
      {
        prompt:
          "Yedi mikrospor ana hücresinin her biri dört işlevli mikrospor oluşturuyor. Her mikrospor bir polene, her polen iki sperme gelişiyor; kayıp yok. Toplam polen ve sperm sayısı nedir?",
        correct: "28 polen ve 56 sperm.",
        reason: "7×4=28 polen;28×2=56 sperm olur.",
        wrong: [
          [
            "7 polen ve 14 sperm.",
            "Ana hücre başına dört mikrospor oluşması atlanmıştır.",
          ],
          [
            "28 polen ve 28 sperm.",
            "Her polenin iki sperm oluşturduğu kabulü atlanmıştır.",
          ],
          [
            "56 polen ve 28 sperm.",
            "Polen ve sperm sayıları ters eşleştirilmiştir.",
          ],
          [
            "14 polen ve 56 sperm.",
            "Polen sayısı 7×4 olmalı; sperm hesabıyla ara sayı tutarsızdır.",
          ],
        ],
        knowledge: [
          "Ürün sayısı sayılan evreye göre dört ve iki çarpanlarıyla değişir.",
        ],
        strategy: "Ana hücre→polen→sperm zincirini ayrı hesapla.",
        steps: [
          "Yedi ana hücreyi dörtle çarp.",
          "Bulduğun 28 poleni iki spermle çarp.",
          "28 ve 56 sayılarını doğru evrelere bağla.",
        ],
        commonError: "Polen ve sperm sayısını aynı aşamada eşitlemek.",
        check: "Ara ürün 28 ile son ürün 56 birbiriyle tutarlı.",
      },
      {
        prompt:
          "Tipik iki hücreli polende tüp hücresi ve generatif hücre var. Bu hücrelerin temel görev eşleştirmesi hangisidir?",
        correct:
          "Tüp hücresi polen tüpüne; generatif hücre iki sperm oluşumuna katkı verir.",
        reason:
          "İki hücre aynı haploit gametofitte farklı işlevlere ayrılmıştır.",
        wrong: [
          [
            "Tüp hücresi yumurtayı, generatif hücre başçık duvarını oluşturur.",
            "Bu yapılar verilen erkek gametofit görevleri değildir.",
          ],
          [
            "İkisi de diploit mikrospor ana hücresidir.",
            "Mikrosporun mitozuyla gelişen polen hücreleri haploit evrededir.",
          ],
          [
            "Generatif hücre ışık algılar, tüp hücresi yalnız çanak yaprak olur.",
            "Verilen polen görevleri sperm ve tüp gelişimidir.",
          ],
          [
            "Polen zaten tek sperm olduğu için iki hücre bulunamaz.",
            "Polen sperm hücresinin kendisi değildir; iki hücreli evre mümkündür.",
          ],
        ],
        knowledge: [
          "Polen erkek gametofit; tüp ve generatif hücre farklı işlevli birimlerdir.",
        ],
        strategy: "Hücre adlarını oluşturdukları yapı ile eşleştir.",
        steps: [
          "Tüp adını polen tüpü gelişimiyle bağla.",
          "Generatif hücreyi sperm üreten mitozla bağla.",
          "Polen ve sperm kimliklerini ayrı tutan seçeneği seç.",
        ],
        commonError: "Poleni tek bir sperm hücresi saymak.",
        check: "İki hücrenin görevleri ayrı ve gametofit içinde tutarlı.",
      },
      {
        prompt:
          "Generatif hücre n=9 kromozomlu ve normal mitozla iki sperm oluşturuyor. Sperm başına kromozom sayısı nedir?",
        correct: "9.",
        reason:
          "Normal mitoz haploit kromozom takımını korur; n yeniden yarıya inmez.",
        wrong: [
          [
            "18; her mitoz takım sayısını iki katına çıkarır.",
            "DNA eşlenmesi ve normal mitoz sonrası takım korunur;9→18 kalıcı artış değildir.",
          ],
          [
            "4,5; her bölünme kromozomu mutlaka yarıya indirir.",
            "Bu bölünme mayoz değil mitozdur; kromozom sayısı kesirli yarıya bölünmez.",
          ],
          [
            "3; iki sperm ve bir tüp hücresi arasında 9 paylaştırılır.",
            "Kromozomlar böyle üç hücreye sayısal bölüşümle dağılmaz.",
          ],
          [
            "0; sperm bitki hücresi olduğu için çekirdek taşımaz.",
            "Bitki sperm hücreleri döllenmeye katılan haploit çekirdek taşır.",
          ],
        ],
        knowledge: ["Normal mitoz kromozom takımını korur."],
        strategy: "Bölünme türünü ve başlangıç takımını birlikte kullan.",
        steps: [
          "Başlangıcı haploit 9 olarak al.",
          "Bölünmenin normal mitoz olduğunu belirle.",
          "Her iki sperm için 9 kromozomu koru.",
        ],
        commonError: "Her hücre bölünmesini mayoz gibi yarıya indirmek.",
        check: "Sperm sayısı artarken hücre başına takım aynı kaldı.",
      },
      {
        prompt:
          "Tipik monosporik gelişimde beş megaspor ana hücresi mayoz geçiriyor; her dörtlüden üçü kayboluyor. İşlevli megaspor sayısı ve başlangıçtaki toplam mayoz ürünü hangisidir?",
        correct: "5 işlevli megaspor; başlangıçta 20 ürün.",
        reason:
          "5×4=20 başlangıç ürünü, her ana hücreden bir işlevli kaldığı için 5 sonuç olur.",
        wrong: [
          [
            "20 işlevli; başlangıçta 20.",
            "Her dörtlüden üçünün kaybı işlevli sayıda hesaba katılmamıştır.",
          ],
          [
            "5 işlevli; başlangıçta 5.",
            "Başlangıç mayozunun dört ürün oluşturması atlanmıştır.",
          ],
          [
            "15 işlevli; başlangıçta 20.",
            "15 kaybolan üründür; işlevli kalan sayı 5’tir.",
          ],
          [
            "4 işlevli; başlangıçta 25.",
            "Ana hücre sayısı ve dörtlü ürün kuralı yanlış çarpılmıştır.",
          ],
        ],
        knowledge: [
          "Tipik dişi yolda mayoz ürünü sayısı ile işlevli kalan ürün sayısı ayrıdır.",
        ],
        strategy: "Önce oluşanları, sonra kaybolanları say.",
        steps: [
          "5×4=20 başlangıç ürünü bul.",
          "Her grupta bir işlevli kaldığını uygulayarak 5 bul.",
          "Sayıları işlevli ve başlangıç etiketlerine doğru bağla.",
        ],
        commonError: "Kaybolan üç megasporu işlevli ürün sanmak.",
        check: "20 toplamı 5 işlevli+15 kayıp olarak dengeleniyor.",
      },
      {
        prompt:
          "2n=28 olan megaspor ana hücresi normal mayoz geçiriyor; üç ürün kaybolup biri işlevli kalıyor. Kalan megasporun bir çekirdeğinde kaç kromozom vardır?",
        correct: "14.",
        reason:
          "Normal mayozla n=14 olur; diğer ürünlerin kaybolması kalan çekirdeğe kromozom eklemez.",
        wrong: [
          [
            "28; diğer üç hücre kaybolunca diploitlik geri gelir.",
            "Ürün kaybı çekirdek birleşmesi veya takım geri kazanımı değildir.",
          ],
          [
            "56; dört ürünün kromozomları kalana toplanır.",
            "Kaybolan hücrelerin kromozomları kalana aktarılmış olarak verilmemiştir.",
          ],
          [
            "7; üç ürün kaybı ikinci bir mayozdur.",
            "Kayıp, kalan çekirdeğin tekrar mayoz geçirmesi değildir.",
          ],
          [
            "4; her mayoz ürünü yalnız ürün sayısı kadar kromozom taşır.",
            "Ürün sayısı ile hücre başına kromozom sayısı farklı niceliklerdir.",
          ],
        ],
        knowledge: ["Ürün kaybı kromozom takımını otomatik değiştirmez."],
        strategy:
          "Mayozda takım düşüşünü hesaplayıp sonra kayıp sürecinden ayrı tut.",
        steps: [
          "28/2=14 bul.",
          "Diğer ürünlerin kaybının hücre sayısını azalttığını belirle.",
          "Kalan çekirdekte 14ü koru.",
        ],
        commonError: "Kaybolan megasporların kromozomlarını kalana eklemek.",
        check: "Takım sayısı yalnız verilen normal mayozla değişti.",
      },
      {
        prompt:
          "Bir işlevli megaspor çekirdeği n=8. Sitokinez olmadan iki mitoz döngüsü tamamlanmış; hücreselleşme henüz yok. Hücre sayısı/çekirdek sayısı/çekirdek başına kromozom sırası nedir?",
        correct: "1/4/8.",
        reason:
          "İki döngü 1→2→4 çekirdek oluşturur; sitokinez yokken tek hücre ve mitozda n=8 korunur.",
        wrong: [
          [
            "4/4/8.",
            "Dört çekirdeğin dört hücre olması sitokinez gerektirir; henüz yoktur.",
          ],
          [
            "1/4/32.",
            "Toplam çekirdeklerdeki kromozomları tek çekirdeğe toplamamak gerekir.",
          ],
          [
            "1/2/4.",
            "İki mitoz döngüsü dört çekirdek verir ve kromozom sayısını yarıya indirmez.",
          ],
          [
            "8/8/1.",
            "Hücre, çekirdek ve kromozom ölçüleri yanlış birbirine çevrilmiştir.",
          ],
        ],
        knowledge: [
          "Sitokinezsiz mitozda çekirdek sayısı artabilirken hücre sayısı aynı kalır.",
        ],
        strategy: "Üç sayıyı ayrı sütunlarda hesapla.",
        steps: [
          "Sitokinez yokluğundan hücreyi 1 koru.",
          "İki döngüyle çekirdeği 4 bul.",
          "Mitozda çekirdek başına 8 kromozomu koru.",
        ],
        commonError:
          "Çekirdek sayısıyla hücre sayısını her aşamada aynı saymak.",
        check: "Üç sütun 1 hücre/4 çekirdek/8 kromozom olarak tutarlı.",
      },
      {
        prompt:
          "Tipik embriyo kesesi gelişiminde işlevli tek megaspor çekirdeği üç sitokinezsiz mitozdan sonra hücreselleşiyor. İki polar çekirdek henüz birleşmemiş. Son hücre ve çekirdek sayısı hangisidir?",
        correct: "7 hücre ve 8 çekirdek.",
        reason:
          "Üç antipod, iki sinerjit, yumurta ve iki çekirdekli merkez hücre toplam 7 hücre/8 çekirdek verir.",
        wrong: [
          [
            "8 hücre ve 8 çekirdek; her çekirdek zorunlu ayrı hücredir.",
            "Merkez hücre iki polar çekirdek içerir.",
          ],
          [
            "6 hücre ve 8 çekirdek; polar çekirdeklerin bulunduğu merkezde hücre yoktur.",
            "Merkezde iki çekirdekli bir hücre vardır; sayımdan dışlanmaz.",
          ],
          [
            "4 hücre ve 4 çekirdek; üçüncü mitozun katkısı yoktur.",
            "Üçüncü döngü çekirdek sayısını 4’ten 8e çıkarır.",
          ],
          [
            "1 hücre ve 8 çekirdek; hücreselleşme hiçbir sonuç değiştirmez.",
            "Soruda hücreselleşme tamamlandığı için tipik 7 hücreye ayrılma oluşmuştur.",
          ],
        ],
        knowledge: [
          "Tipik kesede merkez hücre iki çekirdekli olduğu için hücre ve çekirdek sayısı farklıdır.",
        ],
        strategy: "Son aşamada organel ve hücre sınırlarını ayrı say.",
        steps: [
          "Üç mitozdan 8 çekirdek bul.",
          "1 yumurta+2 sinerjit+3 antipod+1 merkez hücreyi say.",
          "7 hücre ve 8 çekirdeği eşleştir.",
        ],
        commonError:
          "Merkez hücreyi iki çekirdeği olduğu için sayımdan çıkarmak.",
        check:
          "Yedi hücrenin birinin iki çekirdek taşıması sekiz toplamını açıklıyor.",
      },
      {
        prompt:
          "Tipik kesenin merkez hücresinde birleşmemiş iki polar çekirdek var; her biri n=6. Bu aşama için hangi ifade doğrudur?",
        correct:
          "Merkez hücrede iki ayrı haploit çekirdek vardır; tek çekirdeği 2n=12 diye göstermek bu kabulü değiştirir.",
        reason:
          "n+n iki ayrı çekirdeği belirtir; henüz birleşmiş tek 2n çekirdek verilmemiştir.",
        wrong: [
          [
            "Birleşmemiş iki çekirdek zorunlu tek haploit 3 kromozomlu çekirdektir.",
            "İki 6 kromozomlu çekirdek birleşmeden ayrı kalır; sayı yarıya inmez.",
          ],
          [
            "İki çekirdek bulunduğu için merkezde iki ayrı hücre vardır.",
            "Tipik merkez hücre iki çekirdekli tek hücredir.",
          ],
          [
            "Merkez hücre yumurtalığın diploit duvarıyla aynı yapıdır.",
            "Gametofit merkez hücresi ile sporofit yumurtalık duvarı farklı yapılardır.",
          ],
          [
            "n+n ifadesi üç sperm hücresi olduğunu gösterir.",
            "Polar çekirdekler merkez hücreye aittir; sperm sayısı değildir.",
          ],
        ],
        knowledge: [
          "Çekirdek sayısı ile her çekirdeğin ploidisi ayrı belirtilir.",
        ],
        strategy: "Birleşme olup olmadığını kromozom toplamından önce oku.",
        steps: [
          "İki çekirdeğin ayrı kaldığı kabulünü koru.",
          "Her birinde 6 kromozom olduğunu kaydet.",
          "Tek 2n çekirdek yerine iki ayrı n çekirdeği seç.",
        ],
        commonError:
          "n+n ifadesini aşama belirtilmeden tek 2n çekirdekle eşitlemek.",
        check: "İki ayrı çekirdek ve tek merkez hücre koşulu korunuyor.",
      },
      {
        prompt:
          "Bir embriyo kesesi çiziminde mikropil sağda. Tipik modelde yumurta ve iki sinerjit hangi konumla ilişkilidir?",
        correct: "Mikropile yakın sağ kutup; üç antipod karşı kutuptadır.",
        reason:
          "Yumurta aygıtı mikropil tarafındadır; çizimin döndürülmesi bu ilişkiyi değiştirmez.",
        wrong: [
          [
            "Her çizimde yalnız sayfanın altı; mikropilin yeri önemsizdir.",
            "Konum referansı sayfa değil mikropil açıklığıdır.",
          ],
          [
            "Üç antipodla birlikte mutlaka merkez hücrenin içinde.",
            "Yumurta/sinerjitler merkezden ayrı mikropil kutbundadır.",
          ],
          [
            "Mikropilin bulunduğu başçık içinde.",
            "Mikropil tohum taslağı açıklığıdır; başçık erkek organ bölgesidir.",
          ],
          [
            "Sağda yalnız polen kesesi; dişi hücreler yaprak epidermisindedir.",
            "Embriyo kesesinin hücreleri tohum taslağı içindedir.",
          ],
        ],
        knowledge: [
          "Tipik embriyo kesesi kutupları mikropile göre tanımlanır.",
        ],
        strategy: "Şeklin sayfa yönü yerine anatomik açıklığı referans al.",
        steps: [
          "Mikropilin sağda olduğunu bul.",
          "Yumurta ve iki sinerjiti yakın kutba koy.",
          "Antipodları karşı kutup olarak ayır.",
        ],
        commonError:
          "Şekil döndüğünde anatomik konumu sayfa altı ezberiyle yanlış okumak.",
        check: "Konumlar mikropile yakın/uzak ilişkisini koruyor.",
      },
      {
        prompt:
          "Bir öğrenci poleni tek erkek gamet, mikrosporu da mayozdan önceki diploit ana hücre olarak adlandırıyor. Hangi düzeltme doğrudur?",
        correct:
          "Polen erkek gametofittir; mikrospor mayoz sonrası haploit üründür; sperm gamettir.",
        reason: "Ana hücre, spor, gametofit ve gamet farklı evre/yapılardır.",
        wrong: [
          [
            "Polen diploit yumurtalık duvarı, sperm çanak yapraktır.",
            "Bu yapılar erkek gametofit yolu ve gamet kimlikleriyle uyuşmaz.",
          ],
          [
            "Mikrospor her zaman 2n, ana hücre her zaman n’dir.",
            "Normal gelişim sırası bunun tersidir:ana 2n, mayoz ürünü n.",
          ],
          [
            "Polen ve sperm tamamen aynı tek hücre olduğu için düzeltme gerekmez.",
            "Polen tüp ve generatif/sperm hücrelerini içerebilen gametofittir.",
          ],
          [
            "Mayoz sonucu doğrudan her zaman yalnız iki sperm oluşur.",
            "Mikrospor ana hücresi önce dört haploit mikrospor oluşturur.",
          ],
        ],
        knowledge: [
          "Bitkide spor, gametofit ve gamet ayrımı yaşam döngüsünü açıklar.",
        ],
        strategy: "Yanlış iki etiketi gelişim sırasına yerleştirerek düzelt.",
        steps: [
          "Mikrospor ana hücresi 2n ile mayoz ürünü n’yi ayır.",
          "Mikrospordan polen gametofitini kur.",
          "Spermi bu gelişimde oluşan gamet olarak adlandır.",
        ],
        commonError:
          "Hayvan gamet şemasını bitkiye ara evreleri atlayarak taşımak.",
        check: "Düzeltme üç farklı yapı için üç doğru evreyi koruyor.",
      },
      {
        prompt:
          "Bir mikrospor çekirdeği n=7 iken mitozla iki hücreli polen oluşturuyor; generatif hücre sonra normal mitozla iki sperm veriyor. Tüp hücresi ve iki spermin her çekirdeğinde kromozom sayısı nedir?",
        correct: "Her birinde 7.",
        reason: "Mayozdan sonraki bu normal mitozlarda haploit takım korunur.",
        wrong: [
          [
            "Tüp 14, spermler 7 ve 7; ilk mitoz tüp takımını kalıcı ikiye katlar.",
            "Normal mitoz tüp çekirdeğinin takımını böyle iki katına çıkarmaz.",
          ],
          [
            "Tüp 7, spermler 3,5 ve 3,5; ikinci mitoz yarıya indirir.",
            "Mitozda kromozom sayısı korunur; bu mayoz değildir.",
          ],
          [
            "Üçünde toplam yalnız 7 kromozom paylaşılır.",
            "Her normal çekirdek kendi 7 kromozomlu takımını taşır.",
          ],
          [
            "Tüp 0, spermler 14; çekirdek rolleri kromozom yokluğu gerektirir.",
            "Tüp ve sperm çekirdekleri haploit n=7 olarak gelişir.",
          ],
        ],
        knowledge: [
          "Farklı hücre görevleri normal mitozda ploidinin korunmasını değiştirmez.",
        ],
        strategy: "İki mitozu takım düşüşü olmadan sırala.",
        steps: [
          "Mikrospordaki n=7 başlangıcını al.",
          "İlk mitozda tüp ve generatif çekirdekte 7’yi koru.",
          "Generatif mitozdan sonra iki spermde de 7’yi koru.",
        ],
        commonError: "Görev farklılığını kromozom takımı farkı sanmak.",
        check: "Her mitotik gelişim çizgisinde n=7 korundu.",
      },
      {
        prompt:
          "Bir kapalı tohumluda yumurtalık duvarı 2n=16, tipik embriyo kesesindeki yumurta n=8. Hangi çıkarım uygundur?",
        correct:
          "Aynı büyük organ içinde sporofit ve gametofit kökenli hücreler farklı takımda bulunabilir.",
        reason:
          "Yumurtalık duvarı ile içteki gametofit yumurtası farklı gelişim kökenlerindedir.",
        wrong: [
          [
            "Yumurtanın 8 olması yumurtalığın bütün duvar hücrelerini 8e indirir.",
            "İçteki gametin ploidisi çevre sporofit dokunun takımını değiştirmez.",
          ],
          [
            "Duvar 16 olduğu için yumurtanın 8 olması biyolojik olarak olanaksızdır.",
            "Tipik bitki yaşam döngüsünde bu diploit/haploit birliktelik mümkündür.",
          ],
          [
            "Yumurta yalnız polen tüpünün bir parçasıdır.",
            "Yumurta dişi gametofitte bulunur; polenden gelişmez.",
          ],
          [
            "Her iki hücre aynı zamanda aynı mayoz ürünüdür.",
            "Duvar sporofit dokusudur; yumurta gametofit gelişim ürünüdür.",
          ],
        ],
        knowledge: [
          "Organ ve içindeki hücrenin gelişim kökeni farklı ploidiler verebilir.",
        ],
        strategy: "Büyük organla alt hücreyi aynı takım etiketiyle kapatma.",
        steps: [
          "Duvarın diploit 16 olduğunu kaydet.",
          "Yumurtanın haploit 8 olduğunu ayrı tut.",
          "Farklı kökenli hücrelerin aynı organda bulunabileceğini seç.",
        ],
        commonError: "İçteki gametin takımını organın tüm dokularına yaymak.",
        check:
          "İki ölçüm birbirini silmeden aynı yapısal hiyerarşide açıklanıyor.",
      },
      {
        prompt:
          "Bir bitkide normal mikrospor mayozu ve ardından polen gelişimi inceleniyor. Öğrenci dört mikrosporun hepsinin zorunlu genetik olarak özdeş olduğunu ileri sürüyor. En uygun yanıt hangisidir?",
        correct:
          "Dört ürün haploit olabilir; mayoz çeşitliliğe katkı verdiğinden özdeşlik zorunlu değildir.",
        reason:
          "Takım sayısının eşit olması alel birleşimlerinin mutlaka aynı olduğu anlamına gelmez.",
        wrong: [
          [
            "Haploit olmak her bireyin bütün genlerinin aynı olmasını gerektirir.",
            "n, aynı takım sayısıdır; genetik özdeşlik ölçütü değildir.",
          ],
          [
            "Mayoz hiçbir türde genetik çeşitlilikle ilişkili olamaz.",
            "Bağımsız dağılım ve uygun durumda crossing-over çeşitliliğe katkı verebilir.",
          ],
          [
            "Dört ürünün genetik farkı varsa kromozom sayıları zorunlu 1,2,3,4’tür.",
            "Genetik birleşim farkı normal ürünlerde aynı n sayısıyla birlikte olabilir.",
          ],
          [
            "Mikrosporlar dört ürün oldukları için hepsi diploittir.",
            "Normal mayoz ürünleri haploittir; sayı 4 takım 2n demek değildir.",
          ],
        ],
        knowledge: ["Ploidi eşitliği ve genetik özdeşlik farklı kavramlardır."],
        strategy: "Hücre başına takım sayısıyla alel birleşimlerini ayır.",
        steps: [
          "Normal mayoz ürünlerini haploit olarak belirle.",
          "Mayozun genetik birleşim farkı oluşturabileceğini ekle.",
          "Özdeşliğin zorunlu olmadığını seç.",
        ],
        commonError: "Aynı n sayısını aynı genotiple eşitlemek.",
        check:
          "Yanıt normal takım sayısını korurken genetik farklılık olasılığını açıklıyor.",
      },
    ],
  },
  {
    id: "bitki-tozlasma",
    topic: "detail-355",
    title: "Tozlaşma: polenin kaynağı, taşıyıcı ve uyumluluk kapıları",
    minutes: 100,
    objectives: [
      "Tozlaşmayı döllenmeden ayrı bir taşıma olayı olarak açıkla.",
      "Aynı çiçek, aynı bireyin başka çiçeği ve başka bireyden gelen poleni ayır.",
      "Tozlaştırıcı uyumlarını ve kontrollü tozlaşma deneylerini kanıt sınırlarıyla yorumla.",
    ],
    source:
      "Aurelia YKS arşivindeki MEBİ AYT Biyoloji tozlaşma özeti; OGM Bitkilerde Eşeyli Üreme II sunusu ve konu özeti; Dersler Cepte Bitkilerde Eşeyli Üreme karşılaştırılarak hazırlanmış özgün anlatım, madde yolu modelleri ve sorular.",
    sections: [
      {
        title: "Önce taşınma olayının sınırını çiz",
        paragraphs: [
          "Kapalı tohumlu örnekte polenin erkek organ başçığından dişi organ tepeciğine taşınması tozlaşmadır. Sperm çekirdeği ile yumurta çekirdeğinin birleşmesi ise döllenmedir. Polen tepeciğe ulaşmış olabilir ama henüz çimlenmemiş veya döllenme gerçekleşmemiş olabilir.",
          "Önkoşul olarak polenin erkek gametofit, spermin gamet olduğunu; tepecik, dişicik borusu ve tohum taslağının farklı yapılar olduğunu hatırla. Model tepeciğe varmayı ve uygun polen tüpü başlangıcını gösterir. Çift döllenme, tohum oluşumu ve çimlenme sonraki ayrı ünitede ele alınacaktır.",
        ],
      },
      {
        title: "Polenin çıkış ve varış yerini aynı kartta bul",
        paragraphs: [
          "Başçıkta polen keselerinin açılması polenin serbest kalmasını sağlar. Taşıyıcı rüzgâr, hayvan, bazı türlerde su veya insan uygulaması olabilir. Kapalı tohumlu sorusunda varış yeri tepeciktir; doğrudan yumurta veya bütün yumurtalık diye değiştirme.",
          "Açık tohumluların tozlaşma yapıları farklıdır; çam örneğinde dişicik tepeciği bulunmaz. Rüzgârla tozlaşma örnekleri anlatılırken açık ve kapalı tohumluların organ adları aynı zorunlu yapı gibi birleştirilmez. Bu dersin yol modeli kapalı tohumlu tepeciğiyle sınırlandırılmıştır.",
        ],
      },
      {
        title: "Aynı çiçekte kendileşme olasılığını tanı",
        paragraphs: [
          "Bir çiçeğin poleni aynı çiçeğin tepeciğine ulaşıyorsa aynı çiçek içinde kendi kendine tozlaşma söz konusudur. İki eşey organının birlikte bulunması bu taşıma olasılığını artırabilir ama otomatik gerçekleştiğini veya uyumlu döllenme olacağını kanıtlamaz.",
          "Polenin canlılığı, tepeciğin alıcı evresi ve genetik uyumluluk gibi kapılar ayrıca önemlidir. Erkek ve dişi yapıların uygun zamanlarda etkin olması da gerekir. Yapısal birlikte bulunmayı başarı garantisi yerine olası yol olarak adlandır.",
        ],
      },
      {
        title: "Aynı bireyin başka çiçeği farklı birey değildir",
        paragraphs: [
          "Polen aynı bireyin başka çiçeğine taşındığında çiçekler arasında hareket vardır; genetik ebeveyn birey yine aynıdır. Bu, birey düzeyinde kendi kendine tozlaşma kapsamında değerlendirilir; geitonogami adı da kullanılır. Hayvanla taşınmış olması genetik olarak çapraz olduğunu tek başına göstermez.",
          "Aynı bireyde erkek ve dişi çiçeklerin ayrı bulunması bu yolu mümkün kılabilir. Tek evcikli bitkiyi mutlaka her zaman başka bireyle tozlaşır diye sınıflama. Kaynak ve hedef çiçeğin birey kimliklerini açıkça verilen etiketlerden izle; çiçek sayısını birey sayısıyla karıştırma.",
        ],
      },
      {
        title: "Çapraz tozlaşmada başka birey ve aynı tür bilgisi gerekir",
        paragraphs: [
          "Bir bitkinin poleni aynı türden başka bir bireyin tepeciğine ulaşıyorsa bireyler arası çapraz tozlaşma söz konusudur. Polen kaynağının ayrı birey olması ve aynı tür bağlamı birlikte yazılmalıdır. Başka çiçek ifadesi tek başına ayrı birey demek değildir.",
          "Çapraz üreme genetik çeşitliliğe katkı verebilir; ancak her yeni bireyin bütün çevrelerde daha dayanıklı olacağını garanti etmez. Ayrı bitkiler vegetatif klon da olabilir. Soruda genetik farklılık miktarı verilmediyse yalnız ayrı bireyden kesin yeni alel sayısı hesaplama.",
        ],
      },
      {
        title: "Polenin gelmesiyle kabul edilmesi farklı kapılardır",
        paragraphs: [
          "Tepeciğe taşınmış polen uygun nem ve alıcılıkta çimlenebilir. Polen canlılığı ve genetik uyumluluk, sonraki tüp gelişimine etki eder. Farklı türden polenin fiziksel gelişi görülse bile bu model onu uyumlu döllenme yoluna otomatik almaz.",
          "Kendi kendine uyuşmazlık sistemleri bazı bitkilerde kendi poleninin işlevini sınırlayabilir. Böyle bir engel bulunması polenin hiç taşınmadığı anlamına gelmez. Modelde varış kapısı ve çimlenme kapıları ayrı seçilebilir; sonuç hiçbir aşamada tohum garantisi olarak verilmez.",
        ],
      },
      {
        title: "Zaman ayrımı kendileşmeyi sınırlayabilir",
        paragraphs: [
          "Aynı çiçekte başçığın polen vermesi ile tepeciğin alıcı olması farklı zamanlara denk gelirse aynı çiçek içinde kendileşme olasılığı azalabilir. Erkek önce veya dişi önce olgunlaşma farklı örüntülerdir. İki üreme organı yine aynı çiçekte olabilir.",
          "Bu zaman farkı genetik bir imkânsızlıkla aynı şey değildir; başka çiçeklerin evresi de önemlidir. Aynı bireyin başka çiçeğinden polen gelişi mümkün olabilir. Deneyde hangi çiçek ve bireyin ne zaman polen verdiğini/alıcı olduğunu açıkça eşleştir.",
        ],
      },
      {
        title: "Konum ayrımı ve uyuşmazlık farklı engellerdir",
        paragraphs: [
          "Başçık ile tepeciğin uzamsal olarak ayrılması polenin kendi tepeciğine ulaşmasını azaltabilir. Kendine uyuşmazlık ise uygun polenin tanınması ve sonraki gelişimin sınırlanmasıyla ilişkili bir mekanizmadır. İlkinde taşıma olasılığı, ikincide kabul/işlev kapısı öne çıkar.",
          "Bu ayrımlar bütün türlerde aynı ölçüde bulunmaz. Bir şemada tepeciğin yüksek olması tek başına kesin genetik uyuşmazlık kanıtı değildir. Tüp gelişimi veya kontrollü elle tozlaşma deneyleri, fiziksel erişim ile biyolojik uyumu ayırmaya yardım eder.",
        ],
      },
      {
        title: "Rüzgâr yolunda olasılığı yapıyla ilişkilendir",
        paragraphs: [
          "Rüzgârla tozlaşan birçok türde bol, küçük ve hafif polen; dışa açık başçıklar ve polen yakalamaya uygun tepecikler görülebilir. Çiçekler çoğunlukla gösterişsizdir. Bu özellikler havayla rastlantısal taşınma ve yakalanma olasılığına katkı verir.",
          "Çok polen üretilmesi her polenin doğru tepeciğe ulaşacağını veya üremenin garanti olduğunu göstermez. Hava akımı ve mekânsal uzaklık da etkilidir. Polen bolluğunu çiçek başına kesin tohum sayısı yerine taşıma stratejisiyle ilişkilendir.",
        ],
      },
      {
        title: "Hayvan yolunda ziyaret ile etkin taşıma ayrıdır",
        paragraphs: [
          "Renk, koku, nektar ve çiçeğin biçimi böcek, kuş veya yarasa gibi ziyaretçileri etkileyebilir. Polenin hayvan yüzeyine tutunması ve sonraki uygun çiçekte tepeciğe değmesi taşıma zincirinin parçasıdır. Nektar almak için gelen her hayvan eşit derecede etkin tozlaştırıcı değildir.",
          "Bir deneyde ziyaret sayısı artarken tepeciğe bırakılan polen sayısı aynı kalabilir. Polen aktarımı ölçmek yalnız ziyaret fotoğrafı çekmekten daha doğrudan kanıt verir. Tozlaştırıcı ile döllenmeyi yapan gameti karıştırma; hayvan poleni taşır, sperm hücresi çekirdek birleşmesine katılır.",
        ],
      },
      {
        title: "Uyumları olasılık olarak kullan",
        paragraphs: [
          "Gece etkin hayvanlarla ilişkili bazı çiçeklerde açık renk, koku ve gece açılma; kuşlarla ilişkili örneklerde farklı renk ve tüp biçimleri görülebilir. Bunlar belirli ekolojik örüntülerdir; tek renk kesin tek taşıyıcı türü teşhis ettirmez.",
          "Polen yüzeyi ve yapışkanlığı da taşıyıcıyla ilişkilendirilebilir. Ancak bütün rüzgâr polenleri aynı ve bütün hayvan polenleri zorunlu aynı yüzeyde değildir. Birkaç yapı özelliğini birlikte ve gözlenen taşıma kanıtıyla kullanmak tek özelliğe dayalı kesin sınıflamadan daha güçlüdür.",
        ],
      },
      {
        title: "Suyla tozlaşma bütün su bitkilerinin özelliği değildir",
        paragraphs: [
          "Bazı kapalı tohumlu türlerde polen su yüzeyinde veya su içinde taşınabilir. Polenlerin biçim ve yüzdürme özellikleri taşıma biçimine göre değişir; her suyla taşınan polende zorunlu hava boşluğu bulunur diye bir kural kurulmaz.",
          "Suda yaşayan birçok bitki çiçeğini su üstüne çıkarıp rüzgâr veya hayvanlarla tozlaşabilir. Su bitkisi olmak ile suyu polen taşıyıcısı kullanmak farklı özelliklerdir. Deneyde çiçeğin yüzeye göre konumunu ve polenin gözlenen yolunu birlikte oku.",
        ],
      },
      {
        title: "Elle tozlaşma bir taşıma müdahalesidir",
        paragraphs: [
          "İnsan uygun poleni fırça gibi araçla tepeciğe aktarabilir; bu suni tozlaşma olarak adlandırılır. Aynı birey veya farklı birey poleni kullanılabilir; yapay uygulama tek başına çapraz anlamına gelmez. Kaynak etiketi ve uygulama zamanı belirleyicidir.",
          "Uygun çaprazlama deneyinde çiçeğin kendi başçıkları açılmadan uzaklaştırılabilir ve dış polen gelişi torbalamayla sınırlandırılabilir. Ancak işlem yaralanma veya mikroçevreyi de etkileyebilir; buna uygun kontrol gerekir. İnsan poleni aktarır, tohum sonucunu yine canlılık ve uyum koşulları belirler.",
        ],
      },
      {
        title: "Torbalama deneyinde hangi yolu kapattığını söyle",
        paragraphs: [
          "Dış poleni engelleyen bir torba, kendi çiçeğinin poleninin tepeciğe ulaşmasını zorunlu engellemeyebilir. Başçık çıkarma işlemi ise yerel polen kaynağını azaltır. İki uygulamanın aynı sonucu vermesini beklemek müdahale yerlerini karıştırır.",
          "Sadece torbalı ve başçıkları korunmuş çiçekte tohum oluşması, kendileşme olasılığıyla uyumlu olabilir; ama döllenme dışı tohum oluşumu gibi alternatifler ayrıca gerekebilir. Bu dersin model ve soruları hangi üreme yolunun kabul edildiğini açıkça verir; yalnız son tohum sayısından bütün mekanizma çıkarılmaz.",
        ],
      },
      {
        title: "Canlılık ve alıcılığı ayrı kontrollerle sınayabilirsin",
        paragraphs: [
          "Aynı polen canlılık koşullarında uygun tepeciğe bırakılıp tüp başlatma sayısı ölçülebilir. Tepecik alıcı değilse canlı ve uyumlu polen bile o anda beklenen tüp yanıtını vermeyebilir. Polen canlılığı ile tepecik olgunluğu farklı değişkenlerdir.",
          "Uyumsuz ve ölü polen aynı tüp yok sonucu verebilir ama nedenleri aynı değildir. Dört kapılı modelde tür, uyum, canlılık ve alıcılığı tek tek değiştirerek aynı sonucun farklı nedenlerle oluşabileceğini gör. Bir kapı kapanınca fiziksel varışın da silindiğini varsayma.",
        ],
      },
      {
        title: "Sayıları doğru paydadan oranla",
        paragraphs: [
          "Taşınan polen sayısı, tepeciğe ulaşan sayı, çimlenen sayı ve tüp geliştiren sayı farklı basamaklardır. Yüzde başarı hesaplarken hangi paydanın istendiğini belirtmek gerekir. Yüz polenden yirmisi ulaşıp onun on tanesi çimlendiyse toplamdan çimlenme yüzde on; ulaşanlardan çimlenme yüzde ellidir.",
          "Bu iki yüzde farklı sorulara doğru yanıttır. Sonraki döllenme veya tohum oranını bu sayılardan ek veri olmadan hesaplama. Gözlenen yol ve payda açıklaması, tek bir başarı yüzdesi yazmaktan daha öğreticidir.",
        ],
      },
      {
        title: "Çeşitlilik ve uyumu garanti sözcüğü olmadan açıkla",
        paragraphs: [
          "Çapraz tozlaşmayla farklı genetik kaynakların eşeyli üremeye katılması olasıdır. Mayoz ve döllenme çeşitlilik oluşumuna katkı verir; bu çeşitlilik değişen çevreye yanıt için malzeme sağlar. Ancak her çapraz yavrunun her koşulda ebeveyninden üstün olduğu sonucu çıkmaz.",
          "Kendi kendine tozlaşma da bütün yavruların zorunlu klon olduğu anlamına gelmez; heterozigot bir bireyin mayozu genotip ayrışmasına yol açabilir. Tozlaşma sınıfı ile eşeysiz vegetatif çoğalmayı karıştırma. Genetik sonuç için ebeveyn genotipleri ve üreme süreci gerekir.",
        ],
      },
      {
        title: "Yolu aşamalarla, sonucu kanıtla anlat",
        paragraphs: [
          "Özgün modelde önce polen başçıkta, sonra taşıma yolunda, sonra tepecikte ve son olarak uygun kapılar açıksa tüp başlangıcındadır. Başka birey seçimi çizimde ikinci bitkiyi; aynı bireyin başka çiçeği seçimi aynı bitkide farklı çiçeği gösterir. Böylece kaynak etiketi gerçek yola bağlanır.",
          "Son cümlede neyin gözlendiğini açıkça söyle: polen vardı mı, tepeciğe ulaştı mı, tüp başladı mı? Bu üç bilgi döllenme veya tohum oluşumu ile eşit değildir. Çift döllenme ve çimlenmeyi sonraki ayrı ünitenin önkoşulu olarak tanı; burada bitti diye işaretleme.",
        ],
      },
    ],
    examples: [
      {
        title: "Polen ağırlıklarını birey haritasına yerleştir",
        prompt:
          "A ve B aynı türün ayrı bireyleri. İzlenen 100 polenin 30’u A’nın ilk çiçeğinden A’nın ikinci çiçeğine;50’si A’dan B’ye;20’si B’nin bir çiçeğinden yine o çiçeğe gidiyor. Bireyler arası ve birey içi taşımanın izlenen toplam içindeki payları nedir?",
        strategy: "Yol sayısı yerine her yolun taşıdığı polen sayısını topla.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Bireyler arası tek yol A→B olduğundan 50 poleni bu gruba koy.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "A içindeki 30 ile B’nin aynı çiçeğindeki 20’yi birleştirip 50 birey içi polen bul.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Her iki toplamı 100’e böl:ikisi de%50; üç yolun ikisinin birey içi olması miktarın 2/3’ü demek değildir.",
          },
        ],
        answer: "Bireyler arası%50; birey içi%50.",
        check: "Kenar sayısını ağırlıklı polen miktarıyla karıştırdın mı?",
        pitfall: "Çizimdeki yol sayısını taşınan polenin oranı sanmak.",
      },
      {
        title: "İki farklı yüzdeyi hesapla",
        prompt:
          "Bir denemede 80 polen taşımaya ayrılıyor;24’ü tepeciğe ulaşıyor,18’i tüp başlatıyor. Bütün sayımlar aynı denemeye ait. Ulaşanlardan tüp başlatma yüzdesi ve başlangıçtan tüp yüzdesi nedir?",
        strategy: "İstenen iki payda için ayrı oran kur.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "Ulaşanlar paydası 24:18/24×100=75 bul.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "Başlangıç paydası 80:18/80×100=22,5 bul.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "İki doğru yüzde farklı soruları yanıtlar; bunları döllenme oranı diye adlandırma.",
          },
        ],
        answer: "Ulaşanlardan%75; başlangıçtan%22,5.",
        check: "Paydaları 24 ve 80 olarak ayrı yazdın mı?",
        pitfall: "İki başarı yüzdesini tek sayı sanmak.",
      },
      {
        title: "İki başarısız gruba farklı kurtarma testi kur",
        prompt:
          "Genetik olarak uyumlu aynı tür eşlerinde taze polen+alıcı tepecik 20/25 tüp başlangıcı veriyor. Depolanmış polen+alıcı tepecik 0/25; onun eş kontrolünde taze polen verilince 20/25. Taze polen+henüz alıcı olmayan tepecik 0/25; eş çiçek daha sonra alıcı evrede taze polenle 20/25. Hangi iki kapı ayrı sınanmıştır?",
        strategy:
          "Başarısızlığı yalnız sonuca bakarak aynı nedene bağlama; tek etkenli kurtarmaları kullan.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Depolanmış/taze polen karşılaştırmasını alıcı tepecik sabitken polen yeteneğine bağla.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Tepecik evresi karşılaştırmasını taze polen sabitken alıcılık kapısına bağla.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "İki 0/25 sonucu aynı genetik uyuşmazlık açıklamasını gerektirmez; soru uyumu zaten sabit uygun vermiştir.",
          },
        ],
        answer:
          "Polenin korunmuş canlılık/çimlenme yeteneği ve tepeciğin alıcılık evresi ayrı sınanmış.",
        check:
          "Kurtarmada hangi değişkenin sabit kaldığını her çift için belirttin mi?",
        pitfall: "Aynı sıfır tüp sonucuna tek ve aynı neden atamak.",
      },
      {
        title: "Torba ile başçık çıkarma farklı müdahalelerdir",
        prompt:
          "Kendi kendine uyumlu çiçeklerde bir grup yalnız dış polene kapalı torbalanıyor; başka grup torbalanıp kendi başçıkları da açılmadan çıkarılıyor. Dış polen eklenmiyor; döllenmesiz tohum oluşumu bu deneyde yok kabul ediliyor. Temel fark nedir?",
        strategy: "Her uygulamanın kestiği polen kaynağını tanı.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Torbanın dış polen yolunu iki grupta da kapattığını belirle.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Başçık çıkarılan grupta yerel polen kaynağının da kaldırıldığını ekle.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "İlk grupta aynı çiçek poleni mümkün kalabilir; ikinci grupta bu kaynak da yoktur.",
          },
        ],
        answer:
          "Dış yol ikisinde kapalı; kendi başçık kaynağı yalnız ikinci grupta kaldırılmış.",
        check: "Torbalamanın iç poleni de otomatik yok ettiğini varsaydın mı?",
        pitfall: "Farklı müdahaleleri aynı taşıma engeli saymak.",
      },
      {
        title: "Ziyaretin temas geometrisini hesapla",
        prompt:
          "Basit mekanik modelde polen hayvanın gövdesindeki 5–8 mm bandına tutunuyor; yalnız bu bantla örtüşen tepecik teması polen aktarabiliyor. B çiçeği 2–4 mm, C çiçeği 7–9 mm bandına dokunuyor. Hayvanın konumu ve polen kaybı sabit kabul. Temas örtüşmeleri nedir?",
        strategy:
          "Sayı aralıklarının kesişimini bul; ziyaret sayısını ayrı tut.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "5–8 ile 2–4 arasında ortak aralık olmadığından B örtüşmesini 0 bul.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "5–8 ile 7–9 kesişimini 7–8 olarak bul; uzunluğu 1 mm’dir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Bu verilen modelde C’nin aktarım teması vardır; eşit ziyaret sayısı B ve C’ye eşit aktarım garanti etmez.",
          },
        ],
        answer: "B için 0; C için 1 mm örtüşme.",
        check:
          "Taşıyıcının gelmesini uygun polen temasının aynısı saymadın mı?",
        pitfall:
          "Çiçek ziyaretini temas geometrisini ölçmeden etkin tozlaştırma saymak.",
      },
      {
        title: "Kendi kendine üreme klon olmak değildir",
        prompt:
          "Aynı çiçekte kendileşen bir bitkinin bir gen için Aa olduğu, normal mayoz ve rastlantısal gamet birleşimi varsayılıyor. Tozlaşma sınıfı bütün yavruların klon olduğunu gösterir mi?",
        strategy: "Taşıma sınıfını genetik ayrışma bilgisinden ayır.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Aa bireyde A ve a gametlerinin oluşabileceğini belirle.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Aynı birey gametlerinin farklı kombinasyonlarla birleşebileceğini kur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Kendi kendine tozlaşma eşeysiz vegetatif klonlama değildir; bütün yavrular zorunlu Aa olmaz.",
          },
        ],
        answer: "Hayır; verilen eşeyli süreçte genotip ayrışması olabilir.",
        check: "Genetik sonucu yalnız taşıma adıyla belirlemedin mi?",
        pitfall: "Kendi kendine tozlaşmayı vegetatif çoğalma sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Tozlaşma ve döllenmenin olay sınırları nedir?",
        answer:
          "Tozlaşma polenin uygun alıcı yapıya taşınması; döllenme gamet çekirdeklerinin birleşmesidir.",
      },
      {
        prompt:
          "Aynı bireyin başka çiçeğine arıyla taşıma niçin otomatik çapraz değildir?",
        answer:
          "Taşıyıcı farklı olsa da ebeveyn birey aynıdır; birey düzeyinde kendine tozlaşma olabilir.",
      },
      {
        prompt: "Polen tepecikteyse tüp ve tohum kesin oluşur mu?",
        answer:
          "Hayır; canlılık, alıcılık, uyum ve sonraki süreçler ayrıca gereklidir.",
      },
      {
        prompt: "Ziyaret sayısı etkin tozlaştırmayı tek başına verir mi?",
        answer:
          "Hayır; tepeciğe uygun polen bırakılması ve ziyaret başına aktarım gibi ölçümler gerekir.",
      },
      {
        prompt: "Su bitkisi olmak suyla tozlaşmayı zorunlu kılar mı?",
        answer:
          "Hayır; çiçeği su üstünde olup rüzgâr/hayvanla tozlaşan türler de vardır.",
      },
      {
        prompt: "Kendileşen heterozigot bireyin bütün yavruları klon mudur?",
        answer:
          "Hayır; normal mayoz ve eşeyli birleşme genotip ayrışmasına yol açabilir.",
      },
    ],
    items: [
      {
        prompt:
          "Kapalı tohumlu bir çiçeğin tepeciğinde başçıktan taşınmış polen gözleniyor. Tüp gelişimi veya çekirdek birleşmesi henüz ölçülmemiş. Hangi sonuç doğrudan desteklenir?",
        correct:
          "Polenin tepeciğe varışı gözlenmiştir; döllenmenin tamamlandığı söylenemez.",
        reason:
          "Tozlaşma taşıma, döllenme gamet çekirdeklerinin birleşmesidir; yalnız varış sonraki sonucu kanıtlamaz.",
        wrong: [
          [
            "Polen tepecikteyse çift döllenme kesin tamamlanmıştır.",
            "Varıştan sonraki çimlenme, tüp ve çekirdek birleşmesi ayrı olaylardır.",
          ],
          [
            "Tohumun çimlendiği doğrudan ölçülmüştür.",
            "Polen gözlemi tohum veya tohum çimlenmesi ölçümü değildir.",
          ],
          [
            "Polen varışı olmadığı kanıtlanmıştır.",
            "Tepecikte polen gözlemi varışla uyumludur; bunun tersini söylemez.",
          ],
          [
            "Her polen tek yumurta hücresidir.",
            "Polen erkek gametofit, yumurta dişi gamettir.",
          ],
        ],
        knowledge: ["Tozlaşma ve döllenme farklı olay sınırlarına sahiptir."],
        strategy: "Gözlemi varış aşamasına yerleştir.",
        steps: [
          "Tepecikte taşınmış polen bulunduğunu al.",
          "Tüp ve çekirdek birleşmesi ölçümünün yokluğunu koru.",
          "Varışı söyleyip döllenme garantisi eklemeyen yanıtı seç.",
        ],
        commonError: "Polen varışını tamamlanmış döllenme saymak.",
        check: "Sonuç yalnız mikroskopta gerçekten görülen basamağı kapsıyor.",
      },
      {
        prompt:
          "Bir böcek kapalı tohumlu çiçeğin başçığından polen alıp başka çiçeğe taşıyor. Tozlaşma yolundaki uygun ilk hedef hangi yapıdır?",
        correct: "Dişi organın tepeciği.",
        reason:
          "Kapalı tohumlu modelinde polen başçıktan tepeciğe taşınır; yumurtaya doğrudan bırakılmaz.",
        wrong: [
          [
            "Yumurta çekirdeğinin içi.",
            "Polen önce tepeciğe ulaşır; sperm ile çekirdek birleşmesi sonraki olaydır.",
          ],
          [
            "Kökün endodermisindeki Kaspari şeridi.",
            "Bu yapı kök radyal taşıma bariyeridir; tozlaşma hedefi değildir.",
          ],
          [
            "Yaprak stomalarının bekçi hücreleri.",
            "Stoma gaz geçididir; dişi üreme organı alıcı yüzeyi değildir.",
          ],
          [
            "Erkek organ sapçığının iletim demeti.",
            "Sapçık başçığı destekler; uygun dişi alıcı yüzey tepeciktir.",
          ],
        ],
        knowledge: ["Çiçekte polenin çıkış ve alıcı yüzeyleri farklıdır."],
        strategy: "Taşıyıcının gelişini dişi organın dış alıcı yüzeyine bağla.",
        steps: [
          "Çıkış yeri olarak başçığı belirle.",
          "Dişi organın polen tutan tepeciğini bul.",
          "İlk varışla sonraki tüp yolunu ayır.",
        ],
        commonError: "Polenin doğrudan yumurta çekirdeğine taşındığını sanmak.",
        check: "Hedef kapalı tohumlu alıcı yüzey olarak doğru adlandırıldı.",
      },
      {
        prompt:
          "X çiçeğinin poleni yine aynı X çiçeğinin tepeciğine ulaşıyor. Genetik uyum ve döllenme henüz incelenmemiş. Taşıma sınıfı nedir?",
        correct: "Aynı çiçek içinde kendi kendine tozlaşma.",
        reason:
          "Kaynak ve hedef aynı çiçek olduğu için taşıma bu sınıftadır; sonraki başarı ayrı kapılardır.",
        wrong: [
          [
            "Bireyler arası çapraz tozlaşma.",
            "Başka birey verilmemiştir; kaynak ve hedef aynı çiçektir.",
          ],
          [
            "Eşeysiz vegetatif çoğalma.",
            "Polen taşıması eşeyli üremenin yolu içindedir; vegetatif sürgün üretimi değildir.",
          ],
          [
            "Kesin kendine uyumluluk.",
            "Taşıma sınıfı genetik uyumu tek başına belirlemez.",
          ],
          [
            "Tamamlanmış çift döllenme.",
            "Döllenme incelenmemiştir; taşıma önceki basamaktır.",
          ],
        ],
        knowledge: ["Polenin kaynak–hedef kimliği taşıma sınıfını belirler."],
        strategy: "Çiçek kimliğini koruyup ölçülmeyen kapıları ekleme.",
        steps: [
          "Kaynak X ve hedef X’in aynı olduğunu belirle.",
          "Aynı çiçek içi yolu kendi kendine sınıflandır.",
          "Uyum ve döllenme hakkında kesin sonuç ekleme.",
        ],
        commonError:
          "Kendine tozlaşma adından kesin kendine uyumluluk çıkarmak.",
        check: "Sınıflama aynı çiçek verisine dayanıyor; başarı garantisi yok.",
      },
      {
        prompt:
          "A bireyinin bir çiçeğinden polen rüzgârla aynı A bireyinin başka çiçeğine ulaşıyor. Birey düzeyindeki sınıflama hangisidir?",
        correct: "Aynı birey içinde kendi kendine tozlaşma.",
        reason:
          "Çiçekler ayrı olsa da kaynak ve hedef ebeveyn birey aynıdır; rüzgâr taşıyıcı olması bunu değiştirmez.",
        wrong: [
          [
            "Çapraz; her başka çiçek başka bireydir.",
            "Soruda iki çiçeğin aynı A bireyinde olduğu belirtilmiştir.",
          ],
          [
            "Çapraz; rüzgârla olan her taşıma bireyler arasındadır.",
            "Taşıyıcı kimliği kaynak birey kimliğinin yerine geçmez.",
          ],
          [
            "Döllenmesiz tohum oluşumu; polen rüzgârla gelmiştir.",
            "Taşıyıcıdan böyle bir tohum oluşum mekanizması çıkarılamaz.",
          ],
          [
            "Evciklilik kesin iki evciklidir.",
            "Aynı bireydeki çiçekler polen alışverişi yapıyor; veri genel dağılımı ayrıca vermeyebilir.",
          ],
        ],
        knowledge: [
          "Aynı bireyin ayrı çiçekleri arasında taşınma birey düzeyinde kendine tozlaşmadır.",
        ],
        strategy: "Taşıyıcıyı kaynak ve hedef bireyden ayrı kaydet.",
        steps: [
          "Kaynağın A bireyinde olduğunu belirle.",
          "Hedefin de A bireyinde kaldığını kaydet.",
          "Rüzgârdan bağımsız olarak aynı birey sınıfını seç.",
        ],
        commonError:
          "Rüzgâr veya hayvan yolunu otomatik çapraz tozlaşma saymak.",
        check: "İki ayrı çiçek ama tek birey koşulu korunuyor.",
      },
      {
        prompt:
          "Aynı türün ayrı A ve B bireyleri var. A’nın poleni B’nin tepeciğine taşınıyor; sonraki uyum sonucu verilmemiş. Taşıma sınıfı nedir?",
        correct:
          "Bireyler arası çapraz tozlaşma; uyumlu döllenme sonucu ayrıca incelenmelidir.",
        reason:
          "Aynı tür ve farklı birey kaynak–hedef bilgisi çapraz sınıfı verir; fiziksel varış başarı garantisi değildir.",
        wrong: [
          [
            "Aynı çiçek içinde kendileşme.",
            "Kaynak ve hedef ayrı bireylerdir.",
          ],
          [
            "Farklı tür tozlaşması.",
            "Soruda aynı tür oldukları açıkça verilmiştir.",
          ],
          [
            "Kesin başarılı tohum oluşumu.",
            "Uyum, tüp ve döllenme sonucu verilmemiştir.",
          ],
          [
            "Eşeysiz klon çoğalması.",
            "Polen taşıması vegetatif çoğalma değildir.",
          ],
        ],
        knowledge: [
          "Çapraz tozlaşma aynı türün farklı bireyleri arasında polen taşınmasıdır.",
        ],
        strategy: "Tür ve birey bilgilerini ayrı kontrol et.",
        steps: [
          "A ile B’nin aynı tür olduğunu kaydet.",
          "Farklı bireylerden polen geldiğini belirle.",
          "Çapraz sınıfını seçip sonraki başarıyı açık bırak.",
        ],
        commonError: "Çapraz taşıma sınıfını tohum başarısıyla eşitlemek.",
        check:
          "Yanıt kaynak–hedefi doğru sınıflarken ölçülmeyen aşamayı garanti etmiyor.",
      },
      {
        prompt:
          "Modelde farklı tür poleni tepeciğe fiziksel olarak bırakılıyor; bu tür çifti uyumsuz kabul edilmiş. Polen canlı ve tepecik alıcı. Hangi sonuç uygundur?",
        correct:
          "Varış gözlenebilir; verilen tür uyumsuzluğu tüp başlangıcını engelleyebilir.",
        reason:
          "Fiziksel ulaşma ile biyolojik kabul farklı kapılardır; diğer iki koşul uygun olsa da tür engeli korunur.",
        wrong: [
          [
            "Canlı polen her farklı türde kesin döllenme yapar.",
            "Tür uyumsuzluğu modelde açık engel olarak verilmiştir.",
          ],
          [
            "Uyumsuzsa polenin tepecikte görülmesi imkânsızdır.",
            "Uyumsuzluk fiziksel bırakmayı otomatik silmez.",
          ],
          [
            "Alıcı tepecik polenin türünü mutlaka aynı türe dönüştürür.",
            "Tepecik alıcılığı polenin tür kimliğini değiştirmez.",
          ],
          [
            "Varış görülmesi tüm polenin ölü olduğunu kanıtlar.",
            "Polen canlılığı uygun olarak verilmiştir.",
          ],
        ],
        knowledge: [
          "Tür uyumu, canlılık ve alıcılık birbirinden bağımsız gerekli koşullar olabilir.",
        ],
        strategy:
          "Uygun iki kapının açıkken tür kapısının kapalı kaldığını izle.",
        steps: [
          "Fiziksel bırakmayı varış olarak kaydet.",
          "Canlılık ve alıcılığın uygunluğunu koru.",
          "Tür uyumsuzluğunun sonraki aşamayı sınırlamasını seç.",
        ],
        commonError: "Bir kapı açıksa bütün uyum kapıları açıktır sanmak.",
        check: "Varış ve başarısız sonraki yanıt ayrı açıklandı.",
      },
      {
        prompt:
          "Kendine uyuşmazlığı olan bir çiçeğin canlı kendi poleni alıcı tepeciğine geliyor. Tepecikte polen var ama verilen sistemde tüp gelişimi baskılanıyor. Hangi açıklama doğrudur?",
        correct:
          "Kendi poleni taşınmış; genetik uyuşmazlık sonraki işlevi sınırlamış olabilir.",
        reason:
          "Kendine uyuşmazlık fiziksel tozlaşmayı değil kabul/gelişim basamağını engelleyebilir.",
        wrong: [
          [
            "Hiç polen taşınmadığı kesinleşmiştir.",
            "Tepecikte polen gözlendiği için fiziksel varış vardır.",
          ],
          [
            "Kendi poleni olduğu için genetik uyum mutlaka tamdır.",
            "Soruda kendine uyuşmazlık özelliği verilmiştir.",
          ],
          [
            "Canlı polen tepeciğe gelince mutlaka doğrudan yumurta olur.",
            "Polen erkek gametofittir; yumurta kimliğine dönüşmez.",
          ],
          [
            "Tüp gelişimi yoksa tepecik zorunlu erkek organa dönüşür.",
            "Gelişim engeli organ kimliği dönüşümü değildir.",
          ],
        ],
        knowledge: ["Kendine uyuşmazlık taşıma sonrası bir engel olabilir."],
        strategy: "Gözlenen varışı ve baskılanan tüpü farklı aşamalara koy.",
        steps: [
          "Tepecikte canlı kendi poleninin varlığını kabul et.",
          "Verilen genetik engeli tüp gelişimine yerleştir.",
          "Taşıma gerçekleşti ama sonraki işlev sınırlı yorumunu seç.",
        ],
        commonError: "Uyumsuzluğu mutlaka polenin taşınmaması sanmak.",
        check: "İki ölçüm aynı olay diye birleştirilmedi.",
      },
      {
        prompt:
          "Bir çiçeğin başçığı pazartesi polen veriyor; aynı çiçeğin tepeciği yalnız perşembe alıcı. Polenin alıcılığa kadar canlı kalmadığı verilmiş. Bu düzen aynı çiçek içi kendileşmeyi nasıl etkileyebilir?",
        correct:
          "Zaman ayrımı aynı çiçeğin poleniyle uygun karşılaşma olasılığını azaltır.",
        reason:
          "Polen canlılığı ve tepecik alıcılığı verilen zamanda örtüşmediğinden bu yerel yol sınırlanır.",
        wrong: [
          [
            "Çiçeği kesin yalnız erkek çiçeğe dönüştürür.",
            "Dişi tepeciğin perşembe alıcı olması dişi organın varlığını gösterir.",
          ],
          [
            "Aynı bireyin bütün başka çiçeklerinden polen gelişini de kesin engeller.",
            "Başka çiçeklerin zamanlaması verilmemiştir; bu kapsam eklenemez.",
          ],
          [
            "İki eşey organı aynı çiçekteyse zaman farkı hiçbir etki yapamaz.",
            "Uygun zaman örtüşmesi verilen canlılık koşulunda önemlidir.",
          ],
          [
            "Başka bireylerden gelen her polenin genetik uyumunu garanti eder.",
            "Zaman ayrımı başka polenin genetik uyumunu tek başına belirlemez.",
          ],
        ],
        knowledge: [
          "Eşey organlarının olgunlaşma zamanları kendileşme yolunu etkileyebilir.",
        ],
        strategy:
          "Polen canlılığı ve tepecik alıcılığının örtüşmesini sınayarak karar ver.",
        steps: [
          "Polen verme gününü pazartesi olarak al.",
          "Alıcı günü perşembe ve arada canlılığın kaybını kaydet.",
          "Aynı çiçek yolu için azalan örtüşmeyi seç.",
        ],
        commonError:
          "Yerel zaman engelini bütün birey ve polen yollarının engeli saymak.",
        check: "Sonuç yalnız aynı çiçek ve verilen canlılık aralığına ait.",
      },
      {
        prompt:
          "A çiçeğinde başçıkla tepecik uzak olduğu için kendi poleninin ulaşması azalıyor. B’de polen ulaşıyor ama genetik tanıma sistemi tüp gelişimini engelliyor. Doğru ayrım hangisidir?",
        correct: "A fiziksel/uzamsal erişim, B taşıma sonrası uyum engelidir.",
        reason:
          "İki sistem aynı düşük başarı sonucunu farklı basamaklardan oluşturabilir.",
        wrong: [
          [
            "İkisi de hiç polen üretilmediğini gösterir.",
            "A’da ulaşma azalması, B’de varış sonrası engel verilmiştir; üretim yokluğu değil.",
          ],
          [
            "A genetik uyumsuzluğu kesin kanıtlar; B yalnız mesafedir.",
            "Engellerin tanımları ters eşleştirilmiştir.",
          ],
          [
            "Başarı düşükse A ile B aynı zorunlu nedene sahiptir.",
            "Benzer sonuç farklı mekanizmalardan doğabilir.",
          ],
          [
            "B’de engel varsa tepecik fiziksel olarak yoktur.",
            "B’de polenin tepeciğe ulaştığı belirtilmiştir.",
          ],
        ],
        knowledge: ["Taşıma erişimi ile biyolojik kabul farklı süreçlerdir."],
        strategy: "Her engeli yolun hangi basamağında olduğuna yerleştir.",
        steps: [
          "A’nın polen varış olasılığını azalttığını belirle.",
          "B’nin varış sonrası tüp aşamasını etkilediğini kaydet.",
          "Uzamsal erişim ve uyum ayrımını seç.",
        ],
        commonError: "Aynı sonucun tek ve aynı mekanizma olduğunu varsaymak.",
        check: "Engeller doğru sırada ve farklı basamaklarda gösterildi.",
      },
      {
        prompt:
          "Bir türün çiçekleri gösterişsiz; dışa açık başçık, bol hafif polen ve yakalamaya uygun geniş tepecik var. Rüzgârla taşıma da gözleniyor. Hangi yorum uygundur?",
        correct:
          "Özellikler rüzgârla tozlaşma olasılığına katkı verir; bol polen her polenin başarı garantisi değildir.",
        reason:
          "Yapıların birlikte bulunması ve gözlenen yol rüzgâr açıklamasını destekler; tek tek tüm polenin hedefe ulaşması gerekmez.",
        wrong: [
          [
            "Bol polen varsa bütün polenler kesin doğru tepeciğe ulaşır.",
            "Taşıma rastlantısal kayıplar içerebilir; bolluk garanti değildir.",
          ],
          [
            "Gösterişsiz çiçekte hiçbir eşeyli üreme yapısı bulunamaz.",
            "Verilen başçık ve tepecik üreme organı bölümleridir.",
          ],
          [
            "Geniş tepecik polenin artık sperm değil tohum olduğunu gösterir.",
            "Yapı biçimi polenin gelişim kimliğini tohuma dönüştürmez.",
          ],
          [
            "Rüzgâr gözlemi bütün çiçekli türlerin rüzgârla tozlaştığını kanıtlar.",
            "Tek türün yolu bütün türlere genellenemez.",
          ],
        ],
        knowledge: [
          "Rüzgâr tozlaşmasına uyumlar olasılık ve erişimle ilişkilidir.",
        ],
        strategy: "Birlikte verilen yapıları gözlenen taşıma yoluyla bağla.",
        steps: [
          "Hafif bol polen ve açık başçığı havayla taşınmaya bağla.",
          "Geniş tepeciği yakalama yüzeyi olarak yorumla.",
          "Olasılık katkısını seç; bütün polen için garanti ekleme.",
        ],
        commonError: "Üreme olasılığını artıran özelliği mutlak başarı saymak.",
        check:
          "Açıklama bütün özellikleri ve gözlenen rüzgâr yolunu kullanıyor.",
      },
      {
        prompt:
          "Eş gözlem süresinde X ziyaretçisi 12 ziyarette 48 uygun polen, Y ziyaretçisi 6 ziyarette 36 uygun polen bırakıyor. Ziyaret başına aktarım için hangisi doğrudur?",
        correct: "Y 6, X 4 polen/ziyaret; Y ziyaret başına daha yüksektir.",
        reason:
          "48/12=4,36/6=6 hesaplanır; toplam aktarım ise X’te 48 ile daha büyüktür.",
        wrong: [
          [
            "X daha yüksektir;12 ziyaret 6’dan çoktur.",
            "İstenen ölçü ziyaret sayısı değil ziyaret başına aktarım oranıdır.",
          ],
          [
            "İkisi eşittir;48−12=36 olması yeterlidir.",
            "Oran hesabı yerine ilgisiz fark kullanılmıştır.",
          ],
          [
            "Y 6 tohum, X 4 tohum oluşturduğu kesinleşmiştir.",
            "Ölçüm polen aktarımıdır; tohum sonucu verilmemiştir.",
          ],
          [
            "X 4, Y 6 olduğu için Y toplamda daha çok polen bırakmıştır.",
            "Toplamlar X 48, Y 36 olarak verilmiştir; birim verimi toplamla karıştırma.",
          ],
        ],
        knowledge: [
          "Toplam aktarım ve ziyaret başına verim farklı ölçülerdir.",
        ],
        strategy: "Her toplamı kendi ziyaret sayısına böl.",
        steps: [
          "X için 48/12=4 bul.",
          "Y için 36/6=6 bul.",
          "Ziyaret başına Y’yi seç; toplam sırasını ayrı tut.",
        ],
        commonError: "Ziyaret sayısını doğrudan etkin aktarım oranı saymak.",
        check: "İki oranın birimi polen/ziyaret; tohum garantisi eklenmedi.",
      },
      {
        prompt:
          "Bir çiçek geceleri açıyor, açık renkli ve kokulu; aynı zamanda gece etkin bir hayvanın polen taşıdığı gözleniyor. Hangi yorum uygundur?",
        correct:
          "Özellikler gözlenen gece tozlaştırıcısıyla uyumludur; renk tek başına tüm taşıyıcı türünü kesin belirlemez.",
        reason:
          "Birden çok özellik ve gerçek taşıma gözlemi birlikte daha güçlü kanıt oluşturur.",
        wrong: [
          [
            "Açık renkli her çiçek yalnız aynı hayvan türüyle tozlaşır.",
            "Tek özellik taşıyıcıyı evrensel ve kesin biçimde sınıflamaz.",
          ],
          [
            "Gece açıldığı için bütün polenler mutlaka suyla taşınır.",
            "Gözlenen taşıma gece etkin hayvanla verilmiştir.",
          ],
          [
            "Koku varsa polen aktarımı ölçmeye gerek yoktur; her ziyaret eşit etkindir.",
            "Ziyaret ve uygun polen bırakma farklı ölçümlerdir.",
          ],
          [
            "Hayvan tozlaştırıcı olduğu için sperm çekirdeğinin kendisidir.",
            "Hayvan taşıyıcı, sperm gamettir; görevler farklıdır.",
          ],
        ],
        knowledge: [
          "Tozlaştırıcı uyumları örüntü ve doğrudan taşıma kanıtıyla değerlendirilir.",
        ],
        strategy: "Yapısal ipuçlarını ölçülen yolun yanına koy.",
        steps: [
          "Gece açılma ve koku örüntüsünü belirle.",
          "Hayvanın gerçek polen taşıma gözlemini kullan.",
          "Koşullu uyumu seç; renk tek başına kesin teşhis ekleme.",
        ],
        commonError: "Bir renk veya kokuyu tek zorunlu taşıyıcı türü saymak.",
        check: "Yorum ipucu ve doğrudan gözlemi birlikte taşıyor.",
      },
      {
        prompt:
          "Suda yaşayan bir bitkinin çiçekleri su yüzeyinin üstüne çıkıyor; polenin havayla taşınıp tepeciğe ulaştığı gözleniyor. Hangi sonuç doğrudur?",
        correct:
          "Suda yaşaması suyla tozlaşmayı zorunlu kılmaz; bu gözlem rüzgâr yoluyla uyumludur.",
        reason:
          "Yaşam ortamı ve kullanılan polen taşıyıcısı farklı özelliklerdir.",
        wrong: [
          [
            "Su bitkisi olduğundan gözlenen hava yolu kesin olanaksızdır.",
            "Çiçekler su üstünde olup hava taşıması açıkça gözlenmiştir.",
          ],
          [
            "Suyla temas eden kök her poleni suya batırmak zorundadır.",
            "Kök ortamı çiçeğin su üstü taşıma yolunu otomatik belirlemez.",
          ],
          [
            "Bütün su bitkilerinin çiçeği ve tepeciği yoktur.",
            "Soruda çiçek ve tepecik bulunduğu verilmiştir.",
          ],
          [
            "Hava yoluyla polen geldiyse bitki artık karada yaşayan başka türe dönüşür.",
            "Taşıyıcı yol tür veya yaşam ortamı kimliğinin böyle dönüşümü değildir.",
          ],
        ],
        knowledge: ["Su bitkisi olmak ve suyla tozlaşmak aynı ölçüt değildir."],
        strategy: "Çiçeğin konumunu ve gözlenen taşıyıcıyı birlikte oku.",
        steps: [
          "Çiçeğin su üstünde olduğunu belirle.",
          "Polenin hava yolunu ve tepecik varışını kaydet.",
          "Rüzgâr açıklamasını seç; yaşam ortamından zorunlu yol çıkarma.",
        ],
        commonError: "Habitatı polen taşıyıcısının zorunlu aynısı saymak.",
        check: "Sonuç hem su ortamını hem gözlenen hava yolunu koruyor.",
      },
      {
        prompt:
          "Bir kaynak bütün suyla tozlaşan polenlerin hava boşluğu taşıdığını ileri sürüyor. Farklı türlerde su yüzeyinde ve su içinde değişik biçimli polen yolları bulunduğu verilirse en doğru düzeltme nedir?",
        correct:
          "Polen uyumları taşıma biçimi ve türe göre değişir; hava boşluğu bütün su tozlaşması için zorunlu genellenemez.",
        reason:
          "Yüzeyde ve su içinde taşıma farklı yapısal gereksinimler gösterebilir; tek örnek evrensel değildir.",
        wrong: [
          [
            "Suyla tozlaşma hiçbir kapalı tohumluda mümkün değildir.",
            "Verilen farklı su yolları böyle bir yokluk sonucu taşımaz.",
          ],
          [
            "Bütün polenler zorunlu aynı şekil ve yüzeye sahiptir.",
            "Türe ve taşıyıcıya bağlı polen çeşitliliği vardır.",
          ],
          [
            "Hava boşluğu olmayan polen kesin sperm üretemez.",
            "Yüzdürme özelliği gamet gelişiminin zorunlu tek koşulu değildir.",
          ],
          [
            "Polen biçimi değişirse kromozom sayısı her durumda sıfırdır.",
            "Biçim farkından böyle bir ploidilik sonucu çıkmaz.",
          ],
        ],
        knowledge: [
          "Bir taşıyıcıya uyumun bütün türlerde tek yapıya indirgenmemesi gerekir.",
        ],
        strategy: "Su yüzeyi ve su içi yolları ayrı olasılıklar olarak koru.",
        steps: [
          "Taşıma ortamının iki farklı biçimde verildiğini belirle.",
          "Polen yapı çeşitliliğini bu yollarla ilişkilendir.",
          "Hava boşluğu için koşulsuz zorunluluk iddiasını kaldır.",
        ],
        commonError:
          "Tek morfolojik örneği bütün suyla tozlaşan türlere genellemek.",
        check:
          "Düzeltme suyla taşınmayı reddetmeden evrensel yapı iddiasını sınırlandırıyor.",
      },
      {
        prompt:
          "İnsan bir fırçayla aynı bitkinin polenini kendi başka çiçeğinin tepeciğine aktarıyor. Hangi iki sınıflama birlikte doğrudur?",
        correct: "Suni tozlaşma ve aynı birey içinde kendine tozlaşma.",
        reason:
          "İnsan aracılığı uygulama biçimini; kaynak–hedefin aynı birey olması genetik birey düzeyini belirtir.",
        wrong: [
          [
            "Suni olduğu için zorunlu bireyler arası çaprazdır.",
            "Uygulama aracı kaynak birey kimliğini değiştirmez.",
          ],
          [
            "Aynı birey olduğundan insan aktarımı gerçekleşmiş olamaz.",
            "İnsan aynı bireyin çiçekleri arasında da polen aktarabilir.",
          ],
          [
            "Her fırça uygulaması kesin döllenmesiz tohumdur.",
            "Polen aktarım biçimi böyle bir tohum mekanizmasını göstermez.",
          ],
          [
            "Dişi organ fırçayla değince erkek organ olur.",
            "Araçla aktarım organ kimliği dönüşümü değildir.",
          ],
        ],
        knowledge: [
          "Suni/doğal taşıma ve kendi/çapraz sınıfları farklı eksenlerdir.",
        ],
        strategy: "Aracı ve kaynak bireyi iki ayrı başlıkta adlandır.",
        steps: [
          "Fırça ve insanı suni uygulama olarak belirle.",
          "İki çiçeğin aynı bireyde kaldığını kaydet.",
          "Suni+aynı birey kendine sınıfını seç.",
        ],
        commonError: "Elle yapılmış her tozlaşmayı zorunlu çapraz saymak.",
        check: "İki bağımsız sınıflama aynı veriye çelişmeden uygulandı.",
      },
      {
        prompt:
          "Dış poleni engelleyen torba içindeki uyumlu çiçeğin kendi başçıkları korunuyor. Deneyde çiçeğin kendi poleninin tepeciğe ulaşabildiği ve döllenmesiz tohum oluşmadığı kabul. Hangi yorum doğrudur?",
        correct:
          "Torba dış polen yolunu sınırlar; kendi başçığından tozlaşma olasılığı korunur.",
        reason:
          "Dış kaynak engeli iç polen kaynağını veya onun fiziksel erişimini otomatik kaldırmaz.",
        wrong: [
          [
            "Torba varsa çiçeğin kendi poleni de kesin yok olur.",
            "Başçıklar korunmuş ve yerel ulaşma mümkün verilmiştir.",
          ],
          [
            "Torba tek başına genetik kendine uyuşmazlık yaratır.",
            "Fiziksel dış engel genetik uyum mekanizmasıyla aynı değildir.",
          ],
          [
            "Bu kabul altında her tohum mutlaka başka bireyden gelir.",
            "Dış polen engellenmiş, kendi yol mümkündür.",
          ],
          [
            "Başçıkları korumak bütün dış polen engelini ortadan kaldırır.",
            "Torbanın dış kaynağı engelleme işlevi ayrı kalır.",
          ],
        ],
        knowledge: [
          "Torbalama ve başçık çıkarma farklı polen yollarını etkiler.",
        ],
        strategy: "Dış engeli ve içeride kalan kaynağı birlikte izle.",
        steps: [
          "Dış polenin torbayla sınırlandığını belirle.",
          "Kendi başçığının ve erişim yolunun korunduğunu kaydet.",
          "Yerel kendine tozlaşma olasılığını seç.",
        ],
        commonError: "Dış tozlaşma engelini iç kaynağın da yokluğu saymak.",
        check: "Sonuç verilen uyum ve yerel erişim kabulleriyle sınırlı.",
      },
      {
        prompt:
          "Bir denemede başlangıçta 120 polen var;30’u tepeciğe ulaşıyor ve bunların 12’si tüp başlatıyor. Başlangıçtan tüp başlatma yüzdesi hangisidir?",
        correct: "%10.",
        reason:
          "12/120×100=10;30 sayısı yalnız ulaşanlara göre başka bir payda olur.",
        wrong: [
          [
            "%40.",
            "12/30×100=40 ulaşanlar içindeki oran; istenen başlangıç paydası 120’dir.",
          ],
          ["%25.", "30/120×100=25 varış oranıdır; tüp başlatma değil."],
          [
            "%12.",
            "12 tüp sayısıdır;120 lik başlangıçta yüzde doğrudan 12 olmaz.",
          ],
          [
            "%100.",
            "Tüm 120 polenin değil 12 sinin tüp başlattığı verilmiştir.",
          ],
        ],
        knowledge: [
          "Oran için istenen aşamanın doğru paydası kullanılmalıdır.",
        ],
        strategy: "Tüp sayısını başlangıç toplamına böl.",
        steps: [
          "Tüp başlatan 12’yi paya al.",
          "Başlangıç 120’yi paydaya koy.",
          "12/120×100 ile%10 hesapla.",
        ],
        commonError: "Ulaşanlara göre oranı başlangıca göre oran sanmak.",
        check: "Pay 12, payda 120 ve sonuç%10 aynı istenen ölçüye ait.",
      },
      {
        prompt:
          "Aynı türün ayrı iki bitkisi vegetatif çoğalmayla aynı ana bireyden elde edilmiş klonlar. Birinden diğerine polen taşınıyor. Hangi yorum uygundur?",
        correct:
          "Bireyler arası çapraz taşıma sınıfı verilebilir; ayrı bireyler olması tek başına yeni alel farkını garanti etmez.",
        reason:
          "Kaynak–hedef ayrı birey olsa da klonal ilişki genetik farklılık çıkarımını sınırlar.",
        wrong: [
          [
            "Ayrı bitkiler olduğundan her genin alelleri kesin farklıdır.",
            "Klonal köken bu koşulsuz genetik farklılık iddiasını desteklemez.",
          ],
          [
            "Klonlar arasında polen fiziksel olarak hiç taşınamaz.",
            "Genetik benzerlik fiziksel polen aktarımını otomatik engellemez.",
          ],
          [
            "Polen taşındığı için iki bitki aynı fiziksel bireye dönüşür.",
            "Üreme yolu bireylerin fiziksel kimliğini birleştirmez.",
          ],
          [
            "Çapraz taşıma adı bütün yavruların her ortamda üstün olacağını garanti eder.",
            "Taşıma sınıfı genetik fark miktarı veya çevresel üstünlük garantisi değildir.",
          ],
        ],
        knowledge: [
          "Birey kimliği, genetik özdeşlik ve üreme başarısı ayrı bilgilerdir.",
        ],
        strategy: "Ayrı birey ve klonal genetik ilişkiyi birlikte koru.",
        steps: [
          "İki bitkinin fiziksel olarak ayrı bireyler olduğunu al.",
          "Vegetatif klon kökenini genetik fark çıkarımına sınır olarak ekle.",
          "Çapraz taşıma sınıfını yeni alel garantisinden ayır.",
        ],
        commonError:
          "Bireyler arası taşımanın her durumda genetik farklılığı garanti ettiğini sanmak.",
        check: "Yorum fiziksel birey ayrımı ve klonal kökenin ikisini koruyor.",
      },
    ],
  },
];
const positions024B = [
  [1, 4, 1, 2, 3, 1, 2, 1, 2, 0, 3, 2, 0, 4, 3, 0, 0, 4],
  [4, 1, 4, 0, 2, 3, 3, 1, 2, 2, 2, 0, 4, 0, 0, 3, 1, 1],
  [0, 2, 0, 2, 2, 1, 4, 3, 4, 3, 1, 4, 1, 3, 0, 0],
  [1, 3, 0, 0, 3, 3, 0, 0, 4, 2, 1, 4, 3, 4, 1, 2, 2, 1, 4, 2],
  [0, 0, 2, 2, 0, 4, 0, 1, 3, 1, 4, 4, 1, 3, 2, 2, 3, 1],
];

export const forge024BiologyBTopics: Record<string, string> =
  Object.fromEntries(units024B.map((u) => [u.id, u.topic]));
export const forge024BiologyBGuides: LessonGuide[] = units024B.map(
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
export const forge024BiologyBLessons: Lesson[] = units024B.map((u, j) => ({
  id: u.id,
  subjectId: "ayt-biyoloji",
  title: txt(u.title),
  minutes: u.minutes,
  objectives: u.objectives.map(txt),
  source: txt(u.source),
  tags: [u.id, "forge024", "kaynakli-anlatim"],
  body: u.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: u.items.map((item, i): Question => {
    const answer = positions024B[j][i];
    const options = item.wrong.map(([text]) => text),
      optionReasons = item.wrong.map(([, reason]) => reason);
    options.splice(answer, 0, item.correct);
    optionReasons.splice(answer, 0, item.reason);
    return {
      id: `f024-bio-b-${u.id}-${i + 1}`,
      prompt: txt(item.prompt),
      options: options.map(txt),
      answer,
      hint: txt(item.strategy),
      explanation: txt(
        item.reason + " " + item.steps.join(" ") + " Kontrol: " + item.check,
      ),
      skill: u.id,
      guidance: {
        knowledge: item.knowledge,
        strategy: item.strategy,
        steps: item.steps,
        optionReasons,
        commonError: item.commonError,
        check: item.check,
      },
    };
  }),
}));
