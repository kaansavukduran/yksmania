import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";
const inRange = (x: number, a: number, b: number) =>
  Number.isFinite(x) && x >= a && x <= b;

export const airwayParts019 = {
  trachea: "Trake",
  bronchus: "Bronş",
  bronchiole: "Bronşiyol",
  alveolus: "Alveol",
} as const;
export type AirwayPart019 = keyof typeof airwayParts019;
export function airway019(
  part: AirwayPart019,
  area: number,
  thickness: number,
  gradient: number,
) {
  if (
    !Object.hasOwn(airwayParts019, part) ||
    !inRange(area, 1, 8) ||
    !inRange(thickness, 1, 4) ||
    !inRange(gradient, -6, 6)
  )
    throw new RangeError("AIRWAY_MODEL");
  return {
    part,
    cartilage: part === "trachea" || part === "bronchus",
    cilia: part !== "alveolus",
    smoothMuscle: part !== "alveolus",
    gasSurface: part === "alveolus",
    surfactant: part === "alveolus",
    area,
    thickness,
    gradient,
    flux: part === "alveolus" ? (area * gradient) / thickness : null,
    direction:
      part !== "alveolus"
        ? "İletim yolu"
        : gradient > 0
          ? "Alveolden kana"
          : gradient < 0
            ? "Kandan alveole"
            : "Net fark yok",
  };
}
export const breathingPhases019 = {
  inhale: "İçe akış",
  endIn: "Soluk alma sonu",
  exhale: "Dışa akış",
  endOut: "Soluk verme sonu",
} as const;
export type BreathingPhase019 = keyof typeof breathingPhases019;
/** Given representative snapshots; not a dynamic model of a person's lungs. */
export function ventilation019(
  phase: BreathingPhase019,
  tidal: number,
  dead: number,
  rate: number,
  resistance: number,
) {
  if (
    !Object.hasOwn(breathingPhases019, phase) ||
    !inRange(tidal, 200, 800) ||
    !inRange(dead, 0, tidal) ||
    !inRange(rate, 6, 30) ||
    !inRange(resistance, 1, 4)
  )
    throw new RangeError("VENTILATION_MODEL");
  const alveolarPressure = phase === "inhale" ? -1 : phase === "exhale" ? 1 : 0,
    excursion = phase === "endIn" ? tidal : phase === "endOut" ? 0 : tidal / 2;
  return {
    phase,
    tidal,
    dead,
    rate,
    resistance,
    alveolarPressure,
    atmosphericPressure: 0,
    flow: alveolarPressure === 0 ? 0 : -alveolarPressure / resistance,
    excursion,
    diaphragmLow: phase === "inhale" || phase === "endIn",
    minute: (tidal * rate) / 1000,
    alveolarMinute: ((tidal - dead) * rate) / 1000,
  };
}
export const gasLocations019 = {
  tissue: "Doku kılcalı",
  lung: "Akciğer kılcalı",
} as const;
export type GasLocation019 = keyof typeof gasLocations019;
export const affinityStates019 = {
  low: "Düşük pH örneği",
  normal: "Orta pH örneği",
  high: "Yüksek pH örneği",
} as const;
export type AffinityState019 = keyof typeof affinityStates019;
/** An explicitly supplied Hill toy curve (n=3), not fitted physiological data. */
export function oxygenCurve019(pressure: number, state: AffinityState019) {
  if (!inRange(pressure, 0, 100) || !Object.hasOwn(affinityStates019, state))
    throw new RangeError("OXYGEN_CURVE");
  const p50 = state === "low" ? 34 : state === "high" ? 24 : 28;
  return {
    pressure,
    p50,
    saturation: (100 * pressure ** 3) / (pressure ** 3 + p50 ** 3),
  };
}
export function gases019(
  location: GasLocation019,
  hb: number,
  saturation: number,
  co2: number,
) {
  if (
    !Object.hasOwn(gasLocations019, location) ||
    !Number.isInteger(hb) ||
    !inRange(hb, 1, 12) ||
    !inRange(saturation, 0, 100) ||
    !inRange(co2, 0, 200)
  )
    throw new RangeError("GAS_MODEL");
  return {
    location,
    hb,
    saturation,
    capacity: hb * 4,
    bound: (hb * 4 * saturation) / 100,
    co2,
    dissolved: co2 * 0.07,
    carbamino: co2 * 0.23,
    bicarbonate: co2 * 0.7,
    bicarbonateOut: location === "tissue",
    chlorideIn: location === "tissue",
    oxygenToBlood: location === "lung",
  };
}
export const urinaryBlocks019 = {
  none: "Yollar açık",
  left: "Sol üreter kapalı",
  right: "Sağ üreter kapalı",
  urethra: "Üretra kapalı",
} as const;
export type UrinaryBlock019 = keyof typeof urinaryBlocks019;
/** Short-window fixed-production experiment. Obstruction is not a clinical prediction. */
export function urinary019(
  block: UrinaryBlock019,
  left: number,
  right: number,
  minutes: number,
  initial: number,
  outlet: number,
) {
  if (
    !Object.hasOwn(urinaryBlocks019, block) ||
    !inRange(left, 0, 3) ||
    !inRange(right, 0, 3) ||
    !inRange(minutes, 1, 20) ||
    !inRange(initial, 0, 200) ||
    !inRange(outlet, 0, 10)
  )
    throw new RangeError("URINARY_ROUTE");
  const leftProduced = left * minutes,
    rightProduced = right * minutes,
    leftDelivered = block === "left" ? 0 : leftProduced,
    rightDelivered = block === "right" ? 0 : rightProduced,
    available = initial + leftDelivered + rightDelivered,
    actualOut = block === "urethra" ? 0 : Math.min(available, outlet * minutes);
  return {
    block,
    leftProduced,
    rightProduced,
    leftDelivered,
    rightDelivered,
    upstream:
      block === "left" ? leftProduced : block === "right" ? rightProduced : 0,
    actualOut,
    final: available - actualOut,
    bloodPreserved: true,
  };
}
export const nephronParts019 = {
  proximal: "Proksimal tüp",
  descending: "İnen Henle kolu",
  ascending: "Çıkan Henle kolu",
  earlyDistal: "Erken distal tüp",
  collecting: "Geç distal / toplama",
} as const;
export type NephronPart019 = keyof typeof nephronParts019;
export function nephron019(
  part: NephronPart019,
  adh: boolean,
  concentration: number,
  gfr: number,
  capacity: number,
) {
  if (
    !Object.hasOwn(nephronParts019, part) ||
    !inRange(concentration, 0, 5) ||
    !inRange(gfr, 50, 150) ||
    !inRange(capacity, 0, 400)
  )
    throw new RangeError("NEPHRON_MODEL");
  const filtered = concentration * gfr,
    reabsorbed = Math.min(filtered, capacity),
    waterPermeable =
      part === "proximal" ||
      part === "descending" ||
      (part === "collecting" && adh);
  return {
    part,
    adh,
    waterPermeable,
    adhResponsive: part === "collecting",
    concentration,
    gfr,
    capacity,
    filtered,
    reabsorbed,
    excreted: filtered - reabsorbed,
    secretion: 0,
  };
}
export function renalBalance019(
  filtered: number,
  secreted: number,
  reabsorbed: number,
) {
  if (
    !inRange(filtered, 0, 200) ||
    !inRange(secreted, 0, 50) ||
    !inRange(reabsorbed, 0, filtered + secreted)
  )
    throw new RangeError("RENAL_BALANCE");
  return {
    filtered,
    secreted,
    reabsorbed,
    excreted: filtered + secreted - reabsorbed,
  };
}
export const spermStages019 = {
  primary: "Birincil spermatosit",
  secondary: "İkincil spermatosit",
  spermatid: "Spermatit",
  sperm: "Farklılaşmış sperm",
} as const;
export type SpermStage019 = keyof typeof spermStages019;
export const maleSignals019 = {
  lh: "LH → Leydig",
  fsh: "FSH → Sertoli",
  inhibin: "İnhibin → FSH azalır",
  testosterone: "Testosteron geri bildirimi",
} as const;
export type MaleSignal019 = keyof typeof maleSignals019;
export function male019(
  stage: SpermStage019,
  primaries: number,
  vasOpen: boolean,
  signal: MaleSignal019,
) {
  if (
    !Object.hasOwn(spermStages019, stage) ||
    !Number.isInteger(primaries) ||
    !inRange(primaries, 1, 4) ||
    !Object.hasOwn(maleSignals019, signal)
  )
    throw new RangeError("MALE_REPRODUCTION");
  const factor = stage === "primary" ? 1 : stage === "secondary" ? 2 : 4,
    chromosomes = stage === "primary" ? 46 : 23,
    dna = stage === "primary" ? 4 : stage === "secondary" ? 2 : 1,
    cells = primaries * factor;
  return {
    stage,
    primaries,
    vasOpen,
    signal,
    cells,
    chromosomes,
    dna,
    totalDna: cells * dna,
    meioticDivision:
      stage === "secondary"
        ? 1
        : stage === "spermatid" || stage === "sperm"
          ? 2
          : 0,
    transportShown: stage === "sperm" && vasOpen,
    endocrineRoute: true,
  };
}

type Unit019 = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: LessonGuide["recall"];
  items: [string, string, string[], string, string][];
  source: string;
};

const data: Unit019[] = [
  {
    id: "solunum-organlar",
    topic: "detail-316",
    title: "Solunum organları: hava yolundan alveol sınırına",
    minutes: 48,
    objectives: [
      "Havalandırma, gaz değişimi ve hücresel solunumu ayrı olaylar olarak açıkla.",
      "İletim yolunun duvar özelliklerini sıralı organlarla ilişkilendir.",
      "Plevra, alveol hücreleri ve kılcal kanı ayrı bölmelerde izle.",
      "Verilen yüzey, kalınlık ve kısmi basınç farkıyla koşullu difüzyon hesabı yap.",
    ],
    sections: [
      {
        title: "Üç ayrı olayın ortak adı solunum olmasın",
        paragraphs: [
          "Soluk alıp verme havanın akciğere girip çıkmasıdır; ventilasyon adıyla da anılır. Alveol ile kan arasındaki ve kanla doku arasındaki gaz değişimi ise kısmi basınç farklarıyla gerçekleşen difüzyondur. Hücresel solunum hücre içindeki enerji dönüşüm yollarını anlatır. Hava tüpünün hareketiyle mitokondrideki tepkime aynı ölçekte olay değildir.",
          "İnsan dokularına yeterli oksijen ulaştırılması ve oluşan karbondioksitin uzaklaştırılması için solunum ve dolaşım birlikte çalışır. Ancak bütün ATP üretim yolları oksijene zorunlu değildir; olgun eritrositin glikolizi farklı bir örnektir. Burada yeni öğrendiğin, hücrenin ATP formülü değil, dış ortamdan değişim yüzeyine ulaşan anatomik yoldur.",
        ],
      },
      {
        title: "Burun havayı hazırlar",
        paragraphs: [
          "Burun boşluğu dış ortamla bağlantı kurar; kıllar ve mukus bazı parçacıkları tutar. Nemli yüzey ve zengin kılcal damar ağı havanın nemlenmesine ve ısınmasına katkı verir. Bu düzen bir sterilizasyon cihazı değildir: bütün mikropları kesin ortadan kaldırdığı söylenemez. Koku algısı da aynı organın başka bir görevidir.",
          "Tahriş edici maddeler hapşırma gibi koruyucu refleksleri başlatabilir. Fiziksel filtreleme, bağışıklık yanıtı ve duyu algısı farklı mekanizmalardır. Burundan gelen havayı doğrudan kan damarının içine giren bir akış gibi çizme; hava epitelin lümen tarafında kalır, kılcal kan ise dokunun içinde ayrı yoldadır.",
        ],
      },
      {
        title: "Yutak ortak kavşak, gırtlak ayrı hava geçididir",
        paragraphs: [
          "Yutak burun ve ağızdan gelen yolların ortak bölümüdür; hava gırtlağa, besin özofagusa yönlendirilir. Östaki bağlantısı orta kulakla basınç ilişkisine katılır; bu bağlantı yutağın doğrudan akciğer keseciği olduğu anlamına gelmez. Sindirim ve solunum aynı kavşağı kullanırken geçişlerin denetlenmesi gerekir.",
          "Gırtlak kıkırdaklar, kaslar ve ses kıvrımlarıyla hava iletimi ve ses oluşumuna katılır. Epiglottis yutma korumasının bir parçasıdır; bütün koruma tek kapağın yalnız başına hareketi değildir. Ses çıkarma ve öksürükte glottis durumu da değişebilir. Bu nedenle gırtlak yutma dışında her an aynı açıklıktadır diye genelleme yapma.",
        ],
      },
      {
        title: "Trakenin C biçimi ve mukosiliyer taşıma",
        paragraphs: [
          "Trake gırtlağı bronşlara bağlar. Hiyalin kıkırdak halkaları duvarın çökmesini sınırlar; C biçimindeki açık arka bölüm düz kasla tamamlanır ve özofagusla komşudur. Dış destek dokusu, kıkırdak, düz kas ve iç epitel aynı katman değildir. Bir enine kesitte hangi yüzün havaya baktığını önce belirle.",
          "İçte mukus salgılayan goblet hücreleri ve silli epitel bulunur. Mukusun tuttuğu parçacıklar sillerin eşgüdümlü hareketiyle yutak yönüne taşınabilir. Sillerin kendisi mukus molekülü veya kanı pompalayan kas değildir. Yoğun parçacık yükü ve epitel hasarı temizleme kapasitesini etkileyebilir; yalnız hava akımı her parçacığı kesin uzaklaştırmaz.",
        ],
      },
      {
        title: "Bronş ve bronşiyolü duvarıyla ayır",
        paragraphs: [
          "Trake sağ ve sol ana bronşa ayrılır; bronşlar akciğer içinde daha küçük dallar oluşturur. Bronş duvarında kıkırdak destek bulunurken bronşiyollerde kıkırdak yoktur, düz kas önemlidir. Bu ayrım yalnız tüpün çizimdeki rengine veya adının kısalığına dayanmaz.",
          "Bronşiyol düz kasının kasılması lümeni daraltabilir ve hava akımına direnci etkileyebilir. Akciğerlerin bir iskelet kası pompası gibi kendiliğinden kasılmaması, içinde hiç düz kas hücresi yok demek değildir. İletim bölümünü gaz değişiminin ana ince yüzeyiyle aynı işleve indirgememek gerekir.",
        ],
      },
      {
        title: "Akciğer lobu ile alveol aynı ölçek değildir",
        paragraphs: [
          "Sağ akciğer temel anatomik düzende üç, sol akciğer iki lobludur; kalbin komşuluğu sol taraftaki biçimi etkiler. Akciğerler göğüs boşluğundadır ve karın boşluğundan diyaframla ayrılır. Lob bir organ bölgesidir; tek bir hava kesesi veya tek bir epitel hücresi değildir.",
          "Bronşiyol dallarının solunum bölümlerinde alveoller gaz değişim alanını genişletir. Milyonlarca küçük birimin toplam yüzeyi büyüktür; verilen alveol sayısı ve alan değerleri kişiye, yaşa ve ölçüme göre değişebilir. Her insanda kesin aynı sayı veya akciğer hacmi var diye öğrenmek yerine, dallanmanın yüzey ve dağılıma katkısını izle.",
        ],
      },
      {
        title: "Plevra: iki yaprak, ince sıvı ve mekanik bağ",
        paragraphs: [
          "Visseral plevra akciğer yüzeyini, pariyetal plevra göğüs duvarının iç yüzünü örter. Aradaki ince sıvı filmi sürtünmeyi azaltır ve yüzeylerin mekanik olarak birlikte hareketine katkı verir. Normal plevral aralık, solunan havanın dolduğu ayrı bir ikinci hava kesesi değildir.",
          "Göğüs duvarı hareket ederken akciğerin onu izlemesinde plevral basınç ilişkisi önemlidir. Alveol içi basınç ve intraplevral basınç aynı nicelik değildir. Plevraya hava girmesi gibi bir durumda bağın değişebilmesi, normal hava yolunun zaten bu aralıktan geçtiğini göstermez; iki boşluğu ayrı çiz.",
        ],
      },
      {
        title: "Alveolde en az üç farklı hücresel rol",
        paragraphs: [
          "Tip I alveol hücreleri ince gaz değişim yüzeyinin önemli bölümünü oluşturur. Tip II hücreler sürfaktan salgısına ve epitel onarımına katılır; bütün alveol hücreleri aynı yassı salgısız hücre değildir. Alveoler makrofajlar ise savunma ve parçacık temizleme görevleriyle farklı hücre grubudur.",
          "Sürfaktan yüzey gerilimini azaltır, alveollerin açılmasını kolaylaştırır ve sönme eğilimini sınırlar. Bu madde kılcal kanın kendisi, oksijen taşıyan hemoglobin veya gaz bağını kesen bir enzim değildir. Sürfaktanın yüzey fiziğiyle etkisini doğrudan her durumda aynı sayısal oksijen akışına dönüştürmek için ek model gerekir.",
        ],
      },
      {
        title: "Hava ile kan arasında ince ama gerçek bir sınır var",
        paragraphs: [
          "Alveol lümeni, epitel, ince destek/bazal membran ilişkisi, kılcal endotel ve plazma ayrı bölmelerdir. Oksijen uygun kısmi basınç farkıyla bu sınırdan kana geçebilir; dokuya taşınmasının devamı dolaşımın işidir. Karbondioksit için akciğerdeki net yön ters olabilir. Kanın normalde hava kesesinin içine döküldüğü bir açık boru yoktur.",
          "İnce ve nemli yüzey, geniş alan ve uygun kısmi basınç farkı değişimi destekler. Küçük bir yapının çok sayıda olması alanı artırabilir; tek bir alveolün en kalın duvar olması gerekmez. İnflamasyonla bariyerin kalınlaşması veya etkin alanın azalması gaz değişimini etkileyebilir; bunlar farklı parametrelerdir.",
        ],
      },
      {
        title: "Difüzyon modelinde işaret ve birimi koru",
        paragraphs: [
          "Bu derste verilen oyuncak bağıntı J=kAΔP/T olsun; k=1 seçilen ölçek katsayısı, A alan, T pozitif kalınlık, ΔP ise alveol eksi kan kısmi basınç farkıdır. A=2, ΔP=3, T=1 için J=6 model birimi bulunur. Bu katsayı gerçek bir kişinin akciğer difüzyon ölçümü değildir.",
          "Pozitif fark alveolden kana, negatif fark kandan alveole eğilimi gösterir; sıfır farkta bu gaz için net itici fark yoktur. Alan iki katına çıkarsa diğer koşullar sabitken J iki kat, kalınlık iki katına çıkarsa yarı olur. Akışı hesaplamadan önce gazı, yön tanımını ve hangi bölmenin basıncını kullandığını yaz.",
        ],
      },
      {
        title: "Astım, amfizem ve enfeksiyonun farkı",
        paragraphs: [
          "Astımda hava yolu inflamasyonu ve değişken daralma, bronşiyol direncinin artmasıyla ilişkilidir. Amfizemde alveol duvarlarının yıkımı ve elastik yapının kaybı, değişim yüzeyini ve geri dönüş mekaniklerini etkiler. Biri hava yolu çapı, diğeri yüzey ve doku yapısıyla düşünmeyi gerektirir.",
          "Zatürre enfeksiyonla ilişkili alveol/doku etkilenmesini, tüberküloz ise belirli bakteri etkeniyle ilişkili hastalığı anlatır. Her öksürük aynı etken veya her amfizem yalnız kronik enfeksiyon demek değildir. BCG aşısının katkısı belirli ağır hastalık biçimleriyle birlikte değerlendirilir; her durumda bütün enfeksiyonu kesin engeller diye öğrenilmez.",
        ],
      },
      {
        title: "Temizleme yükü ve sağlığı koruyan koşullar",
        paragraphs: [
          "Tütün dumanı ve yoğun kirletici parçacıklar epitelin temizleme düzenini, inflamasyonu ve akciğer dokusunu etkileyebilir. İş ortamındaki tozun türü önemlidir: silika maruziyeti silikozisle, kömür tozu farklı pnömokonyoz örüntüleriyle ilişkilidir. Tozun rengi bütün hastalıkların tek etkenini belirlemez.",
          "Dumandan uzak ortam, uygun havalandırma ve maruziyete uygun koruma solunum sisteminin yükünü azaltmaya yardım eder. Enfeksiyonlardan korunmada el hijyeni, uygun aşılama ve sağlık hizmetine erişim farklı katkılardır. Bir egzersiz veya tek ürünün tüm solunum hastalıklarını kesin önlediği söylenmez; yapı ve mekanizmaya uygun nedenler düşünülür.",
        ],
      },
      {
        title: "KOAH, kronik bronşit ve tümörleri ayır",
        paragraphs: [
          "KOAH kalıcı hava akımı kısıtlanmasıyla ilişkili bir hastalık grubudur; tütün dumanı, mesleki maruziyetler ve bazı kalıtsal etkenler riskte rol oynayabilir. Kronik bronşitte hava yollarında uzun süreli inflamasyon ve mukus artışı, amfizemde alveol duvarı ve elastik yapı kaybı öne çıkar. Akımın kısıtlanması özellikle soluk vermeyi güçleştirebilir; solunum fonksiyon ölçümleri bu mekanik bozukluğu değerlendirmeye yardım eder.",
          "Akciğer veya gırtlakta hücrelerin denetimsiz çoğalması tümör oluşumuyla ilişkilidir; tümör bir mikrop türünün diğer adı değildir. Tütün maruziyeti, asbest ve bazı diğer kanserojenlerle ilişkili riskler vardır. Geçmeyen öksürük, kanlı balgam, ses kısıklığı veya açıklanamayan kilo kaybı değerlendirme gerektirebilir; bu belirtilerin her biri tek başına kesin kanser tanısı sayılmaz. Korunma ve erken değerlendirme, hastalık adı ezberinden farklı bir kazanımdır.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı bariyerde alan iki katına çıkarsa",
        prompt:
          "Oyuncak J=AΔP/T; A=2, ΔP=3, T=1. Sonra yalnız A=4 oluyor. İki J?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk J=2×3/1=6 model birimi.",
          },
          {
            label: "2. adım",
            explanation: "İkinci J=4×3/1=12 model birimi.",
          },
          {
            label: "3. adım",
            explanation:
              "Alan iki katına çıkmıştır; gerçek hız katsayısı veya hastalık ölçümü çıkarılmaz.",
          },
        ],
        answer: "6 ve 12 model birimi.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Alan değişimini aynı anda kalınlık veya basınç değişimi sanmak.",
      },
      {
        title: "Kalınlaşan sınır",
        prompt: "J=AΔP/T, A=2 ve ΔP=3 sabit. T önce 1, sonra 2. Sonuç?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk değer 2×3/1=6.",
          },
          {
            label: "2. adım",
            explanation: "İkinci değer 2×3/2=3.",
          },
          {
            label: "3. adım",
            explanation:
              "Kalınlık iki katına çıkınca aynı koşullardaki model akışı yarıya iner.",
          },
        ],
        answer: "6’dan 3’e.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Duvar kalınlığını toplam yüzey alanıyla aynı değişken saymak.",
      },
      {
        title: "Duvar ve hücre ipuçları",
        prompt:
          "X küçük hava yolunda kıkırdak yok, düz kas var. Y hava kesesinde sürfaktan salgılayan hücre. X ve Y?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Kıkırdaksız küçük iletim yolu bronşiyol örneğidir.",
          },
          {
            label: "2. adım",
            explanation: "Sürfaktan salgılayan hücre tip II alveol hücresidir.",
          },
          {
            label: "3. adım",
            explanation:
              "Tip I ince yüzey, makrofaj savunma ve tip II salgı rolleri ayrı kalır.",
          },
        ],
        answer: "X bronşiyol; Y tip II alveol hücresi.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Bütün küçük yapıları tek epitel hücresi saymak.",
      },
      {
        title: "Yolun sonu damar boşluğu mu?",
        prompt:
          "Burundan giren hava için trake, yutak, alveol, bronş, gırtlak, bronşiyol adlarını sırala. Sonrasında oksijenin sınırını belirt.",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Burun → yutak → gırtlak → trake sırası.",
          },
          {
            label: "2. adım",
            explanation: "Sonra bronş → bronşiyol → alveol.",
          },
          {
            label: "3. adım",
            explanation:
              "Oksijen alveol bariyerinden kılcal kana difüze olur; havanın bütünü doğrudan kan damarına dolmaz.",
          },
        ],
        answer: "Doğru hava yolu ve ardından ayrı gaz difüzyonu.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Hava akışı ile damar içi kan akışını tek boşluk çizmek.",
      },
    ],
    recall: [
      {
        prompt: "Ventilasyon ile hücresel solunum aynı mı?",
        answer:
          "Hayır; biri hava hareketi, diğeri hücre içi enerji dönüşümüdür. Gaz değişimi de ayrı basamaktır.",
      },
      {
        prompt: "Bronşiyolde kıkırdak var mı?",
        answer:
          "Temel düzende yok; düz kas bulunur. Bronşun kıkırdak desteğiyle ayrılır.",
      },
      {
        prompt: "Tip I ve tip II alveol hücreleri?",
        answer:
          "Tip I ince değişim yüzeyi; tip II sürfaktan ve onarım katkısı.",
      },
      {
        prompt: "Plevra aralığı solunan havanın yolu mu?",
        answer:
          "Normalde hayır; iki yaprak arasında ince sıvı filmi vardır, alveol lümeninden ayrıdır.",
      },
    ],
    items: [
      [
        "Havanın içeri girip çıkması ile hücrede ATP elde edilmesi için doğru ayrım hangisidir?",
        "Ventilasyon hava hareketi, hücresel solunum hücre içi enerji dönüşümüdür",
        [
          "İkisi her zaman aynı tek tepkimedir",
          "Alveol yalnız bir mitokondrinin adıdır",
          "Bütün ATP yolları mutlaka oksijen gerektirir",
          "Hava normalde bütünüyle kılcal kanın içine dolar",
        ],
        "Olayların ölçeğini ve bulunduğu bölmeyi ayır.",
        "Ventilasyon, gaz difüzyonu ve hücresel enerji yolları ayrı olaylardır. İnsan dolaşımı bu basamakları birbirine bağlar; aynı sistemle ilişkili olmaları aynı tepkime oldukları anlamına gelmez.",
      ],
      [
        "Normal hava yolu için doğru sıra hangisidir?",
        "Burun → yutak → gırtlak → trake → bronş → bronşiyol → alveol",
        [
          "Burun → aort → safra → alveol",
          "Yutak → üreter → gırtlak → mide",
          "Bronş → burun → böbrek → trake",
          "Alveol → safra kesesi → trake",
        ],
        "Kavşaktan dallanan küçük yollara ilerle.",
        "Yutak ve gırtlak sonrası trake ana bronşlara, daha küçük yollarla alveollere bağlanır. Kan damarı bu hava yolunun açık devamı değildir; arada gaz değişim bariyeri vardır.",
      ],
      [
        "Küçük bir hava yolunda kıkırdak yok, düz kas var. Temel uygun yapı hangisidir?",
        "Bronşiyol",
        [
          "Aort kapağı",
          "Safra kesesi",
          "Trakenin kıkırdak halkası",
          "Olgun eritrosit",
        ],
        "Damar yerine küçük hava yolunu seç.",
        "Bronşiyolde düz kas bulunur, kıkırdak desteği yoktur. Bronş ve trakenin kıkırdaklı destek düzeniyle karşılaştırılarak ayırt edilir.",
      ],
      [
        "Alveolde sürfaktan salgısı ve onarım katkısıyla ilişkili hücre hangisidir?",
        "Tip II alveol hücresi",
        [
          "Yalnız olgun eritrosit",
          "Pankreas beta hücresi",
          "Safra kesesi taşı",
          "Yalnız bir trombosit",
        ],
        "İnce yüzey hücresiyle salgı hücresini ayır.",
        "Tip II hücre sürfaktan ve onarımda önemlidir. Tip I hücreler ince değişim yüzeyinin büyük bölümünü, makrofajlar ise savunma görevini temsil eder.",
      ],
      [
        "Normal plevral aralık için hangi açıklama uygundur?",
        "İki yaprak arasında ince sıvı filmi vardır; solunan havanın normal yolu değildir",
        [
          "Her nefeste atmosfer havasıyla bütünüyle dolar",
          "Doğrudan aortun iç boşluğudur",
          "Yalnız mide enzimlerinin üretildiği yerdir",
          "Tek bir alveol hücresinin çekirdeğidir",
        ],
        "Alveol içi hava ile plevrayı ayrı bölmeler olarak düşün.",
        "Plevra yaprakları ve sıvı filmi mekanik bağa ve sürtünmenin azalmasına katkı verir. Alveol lümeniyle aynı açık boşluk değildir.",
      ],
      [
        "Oyuncak J=AΔP/T bağıntısında A=2, ΔP=3 ve T=1. J kaç model birimidir?",
        "6",
        ["1,5", "2", "3", "12"],
        "Alan ve farkı çarpıp kalınlığa böl.",
        "J=2×3/1=6. Bu yalnız verilen ölçekli bağıntının sonucudur; birim ve gerçek difüzyon katsayısı belirtilmeden kişisel mL/s ölçümü sayılmaz.",
      ],
      [
        "J=AΔP/T modelinde A=2 ve ΔP=3 sabit. Kalınlık T=1’den T=2’ye çıkarsa J nasıl değişir?",
        "6’dan 3’e iner",
        [
          "3’ten 6’ya çıkar",
          "6’dan 12’ye çıkar",
          "6’da kesin sabit kalır",
          "Sıfırın altına zorunlu iner",
        ],
        "Kalınlık paydadadır.",
        "İlk 6, ikinci 2×3/2=3 bulunur. Diğer koşullar sabitken iki kat kalınlık yarı akış verir; alanın da değiştiği varsayılmaz.",
      ],
      [
        "ΔP=alveol eksi kan olarak tanımlanmış modelde ΔP=−2 ise hangi yön desteklenir?",
        "Bu gaz için kandan alveole net eğilim",
        [
          "Zorunlu alveolden kana",
          "Havanın bütün olarak eritrosite pompalanması",
          "Safranın akciğere akması",
          "Negatif sayıda gaz molekülü bulunması",
        ],
        "Negatif işaret seçilen yön tanımını ters çevirir.",
        "Negatif kısmi basınç farkı, kan tarafının daha yüksek olduğunu gösterir. İşaret yönü anlatır; negatif molekül miktarı veya bütün gazlar için tek ortak yön anlamına gelmez.",
      ],
      [
        "Trakedeki mukosiliyer temizleme için hangi eşleştirme doğrudur?",
        "Mukus parçacıkları tutar; siller yutak yönüne taşımaya katılır",
        [
          "Siller bütün hemoglobini üretir",
          "Mukus bir kıkırdak kemiğidir",
          "Her parçacık doğrudan kan damarına alınır",
          "Trakede hiç epitel bulunmaz",
        ],
        "Tutma ve hareket ettirme görevlerini ayır.",
        "Goblet ve bez salgıları mukusa, silli epitel eşgüdümlü taşımaya katılır. Bu düzen her parçacığın kesin yok edilmesi veya hava ile kanın aynı boşluk olması değildir.",
      ],
      [
        "Hava ve kan arasındaki normal alveoler sınır için hangisi doğrudur?",
        "Alveol epiteli ile kılcal endotel ayrı katmanlardır; gaz bariyerden geçer",
        [
          "Kan normalde tümüyle alveol boşluğuna dökülür",
          "Alveol doğrudan bir safra kanalıdır",
          "Her alveol içinde tek bir büyük açık aort vardır",
          "Bariyer kalınlığı değişimin hiçbir koşulunu etkileyemez",
        ],
        "Lümen, epitel, destek ve damar sınırlarını ayrı çiz.",
        "Gaz difüzyonu ince bariyer üzerinden gerçekleşir. Kan damar içinde, hava alveol lümeninde kalır; iki ortamın bütünüyle açık birleştiği bir kanal yoktur.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 100–103; OGM Dersler Cepte Solunum PDF 10–11 gerçek öğretim, trake kesiti ve alveol şekilleriyle karşılaştırılmış özgün anlatım ve sorular. Sayısal difüzyon bağıntısı açık oyuncak modeldir; resmî sınav sorusu değildir.",
  },
  {
    id: "soluk-alisverisi",
    topic: "detail-317",
    title: "Soluk alışverişi: kas, hacim, basınç ve akış",
    minutes: 48,
    objectives: [
      "Diyafram ve kaburga hareketini hacim-basınç-akış sırasıyla açıkla.",
      "Dinlenim ekspirasyonu ile zorlu ekspirasyonun kas katkısını ayır.",
      "Dakika ve alveoler ventilasyonu ölü boşluğu hesaba katarak hesapla.",
      "CO₂/pH ve O₂ algısını merkez-duyu-motor yönleriyle ilişkilendir.",
    ],
    sections: [
      {
        title: "Kas hareketinden hava akışına nedensel sıra",
        paragraphs: [
          "İskelet kası olan diyafram ve kaburgalar arası kaslar göğüs boşluğu hacmini değiştirmeye katılır. Akciğer bu mekanik değişimi plevra ilişkisi sayesinde izler. Hacim değişimi alveol basıncıyla atmosfer arasındaki farkı değiştirir; açık hava yolunda akış bu farkla oluşur. Dört büyüklüğü aynı anda tek isimle anma.",
          "Göğüs boşluğunun büyümesi havanın bir kas tarafından doğrudan içeri çekilip yoktan yapılması değildir. Hava uygun basınç farkında yüksek basınçtan düşük basınca akar. Başlangıç ve son anlarında basınç farkı sıfır olabilir; büyük akciğer hacmi her an içe akış anlamına gelmez.",
        ],
      },
      {
        title: "Diyafram kasılınca kubbe aşağı iner",
        paragraphs: [
          "Diyaframın göğse bakan yüzü gevşek durumda kubbe biçimindedir. Kasılması merkezini aşağı indirip daha düz hâle getirerek göğüs boşluğunun düşey boyutunu artırır. Karın içeriğinin yer değiştirmesi de bu hareketin çevresindeki mekanik ilişkinin bir parçasıdır.",
          "Kasın kasılması kubbenin yukarı çekilmesi demek değildir. Şekli okurken göğüs ve karın bölmelerini etiketle; aşağı ok anatomik olarak hangi yöne gidiyor gör. Akciğer içinde düz kas bulunabilse de bütün akciğeri genişleten ana iskelet kası pompasıyla aynı görevde değildir.",
        ],
      },
      {
        title: "Kaburgaların hareketi ve inspirasyon",
        paragraphs: [
          "Dinlenim inspirasyonunda dış interkostal kasların katkısıyla kaburgalar yukarı ve dışa hareket eder. Göğüs kafesinin ön-arka ve yan boyutları genişler. Diyafram katkısıyla birlikte hacim artar; alveol basıncı atmosferin biraz altına indiğinde içe akış olur.",
          "Gerçek soluk alma boyunca kas kuvveti, elastik özellikler, direnç ve akış birlikte değişir. Tek bir kapalı balona ait basınç-hacim çarpımını açık hava yolunda süren tüm gerçek sürecin eksiksiz yasası gibi kullanma. Buradaki manuel evreler açıkça verilmiş örnek basınç durumlarını gösterir.",
        ],
      },
      {
        title: "Son inspirasyonda neden akış durabilir?",
        paragraphs: [
          "Soluk alma sonunda akciğer hacmi yüksekken alveol ve atmosfer basınçları yeniden eşitlenebilir. Hava yolu açık olsa da net basınç farkı sıfırsa net hava akışı durur. Bu, akciğerin bir anda bütün havasını kaybettiği veya diyaframın o an kesin tamamen gevşediği anlamına gelmez.",
          "Hacim stok miktarı, akış ise bir zaman aralığında geçen miktardır. Bir depoda çok su varken musluğun akmaması gibi, akciğerde hava bulunması akışın aynı yönde sürmesi için yeterli değildir. Grafikte hacmin tepe noktasıyla akışın sıfır anını ayrı eksenlerde ilişkilendir.",
        ],
      },
      {
        title: "Dinlenim ekspirasyonu ve elastik geri dönüş",
        paragraphs: [
          "Sakin soluk vermede inspirasyon kaslarının gevşemesi ve akciğer-göğüs sisteminin elastik geri dönüşü önemlidir. Diyafram yukarı kubbeleşir, göğüs hacmi azalır; alveol basıncı atmosferi aşınca dışa akış gerçekleşir. Bu evre çoğunlukla pasif diye adlandırılır.",
          "Pasif sözcüğü vücudun hiçbir hücresinde ATP kullanılmadığı anlamına gelmez; gevşeme ve yaşam süreçleri enerji gerektirir. Zorlu ekspirasyonda karın kasları ve uygun interkostal katkılar aktif basınç oluşturabilir. Sakin soluk vermenin açıklamasını her egzersiz veya kuvvetli üfleme için zorunlu tek kas düzeni sayma.",
        ],
      },
      {
        title: "Alveoler, atmosferik ve plevral basınç",
        paragraphs: [
          "Atmosfer basıncını göreli sıfır seçebiliriz. Örnek olarak alveol basıncı −1 cmH₂O ise içe, +1 cmH₂O ise dışa eğilim vardır; 0 ise net fark yoktur. Burada negatif sayı mutlak basıncın evrende sıfırdan küçük olması değil, seçilmiş referansın altında olma durumudur.",
          "Plevral basınç ayrı bir bölmenin basıncıdır ve normal koşullarda akciğeri açık tutan transpulmoner farkla ilişkilidir. Plevral basıncı alveol basıncı yerine kullanmak hava akışı yönünü yanlış verebilir. Aynı hesapta mmHg, cmH₂O ve pascal sayılarını dönüştürmeden toplama.",
        ],
      },
      {
        title: "Akışın direnci ve verilen basit model",
        paragraphs: [
          "Bir oyuncak açık-yol modeli Q=(Patm−Palv)/R olsun. R pozitif ve verilen uygun birimlere sahiptir. Basınç farkı sabitken direnç iki katına çıkarsa akış yarıya iner. Bronşiyol daralmasının dirence etkisini düşünmeye yardım eder, fakat tek basit formül tüm gerçek dallı akciğeri eksiksiz temsil etmez.",
          "Patm=0, Palv=−1 ve R=2 için Q=+0,5 model akış birimi; Palv=+1 olursa Q=−0,5 bulunur. Burada içe pozitif tanım kullanılır. İşaret yönü, mutlak büyüklük akışın miktarını anlatır; akciğerde negatif miktarda hava var anlamına gelmez.",
        ],
      },
      {
        title: "Dakika ventilasyonu ile alveoler ventilasyon",
        paragraphs: [
          "Bir soluğun tidal hacmi Vt, dakikadaki soluk sayısı f ise toplam dakika ventilasyonu Vt×f olur. İletim yollarındaki anatomik ölü boşluk Vd, aynı solukta gaz değişim yüzeyine yeni hava olarak ulaşmayan hacim örneğidir. Basit alveoler ventilasyon bağıntısı (Vt−Vd)×f biçimindedir.",
          "Vt=500 mL, Vd=150 mL, f=12 ise toplam 6 L/dakika, alveoler 4,2 L/dakika bulunur. Ölü boşluk atılmış gereksiz organ demek değildir; iletim yollarının anatomik sonucudur. Bu hesap için Vd≤Vt olmalıdır ve verilen solukların benzer olduğu varsayılır.",
        ],
      },
      {
        title: "Aynı toplam, farklı etkin yeni hava",
        paragraphs: [
          "Vt=250 mL ve f=24 seçilirse toplam yine 6 L/dakikadır. Ancak aynı 150 mL ölü boşluk varsayımında alveoler değer 2,4 L/dakikaya iner. Hızlı ve yüzeysel örneğin aynı toplam havayı taşıması aynı gaz değişimi sonucunu zorunlu kılmaz.",
          "Bunlar öğrencinin uygulaması gereken nefes egzersizi değildir; verilen sayılarla iki senaryonun karşılaştırmasıdır. Gerçek gaz alışverişi ayrıca perfüzyon, dağılım ve yüzey koşullarına bağlıdır. Soluk sayısını tek başına tüm oksijenlenmenin veya sağlık durumunun ölçüsü sayma.",
        ],
      },
      {
        title: "Solunum ritmini düzenleyen merkezler",
        paragraphs: [
          "Omurilik soğanı ve ponstaki nöron ağları solunum ritmi ve örüntüsünün düzenlenmesine katılır. Motor sinyaller diyafram ve kaburga kaslarına gider. Karotit ve aort bölgesindeki duyu yollarının merkeze gelişi afferent, merkezden kasa çıkış efferent yöndür.",
          "İstemli denetim kısa süreli katkı verebilir; otomatik geri denetim bu katkıyla aynı mekanizma değildir. Bir şemada duyu okunu merkezden kanın içine ölçüm yapan bir sinir gibi ters çizme. Sinyalin gittiği hedefi ve hangi değişkenin algılandığını ayrı etiketle.",
        ],
      },
      {
        title: "CO₂ ve pH için kan ile BOS ayrımı",
        paragraphs: [
          "CO₂ kandaki artışla beyin-omurilik sıvısına geçebilir ve suyla kurulan tersinir tampon tepkimesinde yerel H⁺ oluşumuna katkı verir. Merkezî kemoresepsiyon bu yerel ortamla ilişkilidir. Kandaki H⁺ iyonunun aynı serbestlikle bütün kan-beyin sınırını geçtiği varsayılmaz.",
          "Periferik kemoreseptörler kanın gaz ve asitlik koşullarıyla ilgili bilgi sağlar. Ventilasyonun artması fazla CO₂’nin uzaklaştırılmasına yardım edebilir ve negatif geri bildirim oluşturur. Hücresel solunumun CO₂ üretmesi ile ventilasyonun onu dışarı atması ters yönlü iki akış olarak ayrılır.",
        ],
      },
      {
        title: "Oksijenin önemini koşulla sınırla",
        paragraphs: [
          "Normal bir aralıkta CO₂/pH değişimleri solunum denetiminde güçlü rol oynar; bu, O₂’nin hiçbir koşulda algılanmadığı anlamına gelmez. Arteriyel O₂ ciddi azaldığında periferik kemoreseptörlerin katkısı önem kazanır. Yükseklik ve hastalık gibi durumlar tek bir sabit yanıt sayısına indirgenmez.",
          "Modelde dört evre manuel seçilir, otomatik soluk tutma veya hızlı nefes deneyi yaptırılmaz. Verilen basınç, hacim ve sayılar yalnız öğretim senaryosudur. Yeni bir problemde önce evreyi, sonra basınç farkını, en son toplam ve alveoler hacmi hesaplamak neden-sonuç sırasını korur.",
        ],
      },
    ],
    examples: [
      {
        title: "İki dakika hacmi",
        prompt:
          "Vt=500 mL, anatomik ölü boşluk 150 mL ve hız 12/dakika. Toplam ve alveoler ventilasyon?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Toplam 500×12=6.000 mL/dakika.",
          },
          {
            label: "2. adım",
            explanation: "Alveole yeni hava (500−150)×12=4.200 mL/dakika.",
          },
          {
            label: "3. adım",
            explanation:
              "1.000’e bölerek 6 ve 4,2 L/dakika bulunur; iki payda aynı zaman birimidir.",
          },
        ],
        answer: "6 ve 4,2 L/dakika.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Her soluk hacminin tamamını yeni alveoler hava saymak.",
      },
      {
        title: "Aynı toplam neden aynı değildir?",
        prompt:
          "X: Vt=500, f=12; Y: Vt=250, f=24. Vt değerleri mL, f değerleri dakika⁻¹ birimindedir. İkisinde ölü boşluk 150 mL. Toplamlar ve alveoler değerler?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Toplam X=500×12=6.000, Y=250×24=6.000 mL/dakika.",
          },
          {
            label: "2. adım",
            explanation: "Alveoler X=350×12=4.200; Y=100×24=2.400 mL/dakika.",
          },
          {
            label: "3. adım",
            explanation:
              "Eşit toplam farklı alveoler ventilasyon verir; başka gerçek gaz değişim koşulları ayrıca önemlidir.",
          },
        ],
        answer: "İki toplam 6 L/dakika; alveoler 4,2 ve 2,4 L/dakika.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Soluk sayısı artışını tek başına daha çok etkin havalandırma saymak.",
      },
      {
        title: "Basınç işaretinden yöne",
        prompt:
          "Q=(Patm−Palv)/R; Patm=0, R=2. Palv önce −1, sonra +1 cmH₂O örneği. Q?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk fark 0−(−1)=+1.",
          },
          {
            label: "2. adım",
            explanation: "İlk Q=+0,5; ikinci fark 0−1=−1, Q=−0,5 model birimi.",
          },
          {
            label: "3. adım",
            explanation: "İçe pozitif tanımda ilk içe, ikinci dışa akıştır.",
          },
        ],
        answer: "+0,5 içe; −0,5 dışa.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Göreli negatif basıncı negatif hava hacmi sanmak.",
      },
      {
        title: "Yüksek hacimde durak",
        prompt:
          "Son inspirasyonda akciğer hacmi çevrim tepesinde; hava yolu açık ve Palv=Patm. Net akış?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Akışın itici farkını hesapla: Patm−Palv=0.",
          },
          {
            label: "2. adım",
            explanation: "Pozitif sonlu R için Q=0/R=0.",
          },
          {
            label: "3. adım",
            explanation:
              "Hacim yüksek kalabilir; stok miktarıyla akışı aynı değişken saymayız.",
          },
        ],
        answer: "Net akış 0.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "En yüksek hacim noktasının en büyük içe akış olduğunu sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Diyafram kasılınca hangi yönde?",
        answer: "Merkezi aşağı iner, daha düz olur ve göğüs hacmini artırır.",
      },
      {
        prompt: "Sakin ekspirasyon neden pasif denir?",
        answer:
          "Elastik geri dönüş baskındır; bütün vücutta hiç ATP harcanmadığı anlamına gelmez.",
      },
      {
        prompt: "Alveoler dakika ventilasyonu?",
        answer:
          "Basit modelde (tidal hacim−ölü boşluk)×dakikadaki soluk sayısı.",
      },
      {
        prompt: "Merkeze duyu, kastaki yanıt yönü?",
        answer:
          "Kemoreseptörden merkeze afferent; merkezden solunum kaslarına efferent sinyal.",
      },
    ],
    items: [
      [
        "Sakin inspirasyonda temel doğru sıra hangisidir?",
        "Diyafram kasılması → göğüs hacmi artışı → alveol basıncının atmosfere göre düşmesi → içe akış",
        [
          "Diyaframın yukarı kubbeleşmesi → hacim artışı",
          "Hacim artışı → havanın zorunlu kana doğrudan dolması",
          "Akciğerin iskelet kası gibi kendi başına kasılması",
          "Her evrede aynı basınç ve kesintisiz tek yön akış",
        ],
        "Kas-hacim-basınç-akış sırasını izle.",
        "Diyafram kasılıp aşağı iner; göğüs ve akciğer hacmi artar. Alveol basıncı atmosferin altına düşünce açık hava yolunda içe akış oluşur.",
      ],
      [
        "Son inspirasyonda hava yolu açık, Palv=Patm ve hacim yüksek. Net hava akışı için doğru sonuç?",
        "Sıfır olabilir; yüksek hacim tek başına basınç farkı değildir",
        [
          "Mutlaka en büyük içe akıştır",
          "Akciğerin bütün havası yok olmuştur",
          "Diyafram kesin kopmuştur",
          "Her zaman en büyük dışa akıştır",
        ],
        "Akış için stok değil basınç farkı gerekir.",
        "Eşit basınçlarda verilen direnç modelinde net Q=0’dır. Akciğerde çok hava bulunması net içe akışın sürdüğünü zorunlu kılmaz.",
      ],
      [
        "Vt=500 mL, ölü boşluk 150 mL, f=12/dakika. Alveoler ventilasyon kaç L/dakika?",
        "4,2",
        ["6", "1,8", "7,8", "0,42"],
        "Önce her solukta etkin yeni hacmi çıkar.",
        "(500−150)×12=4.200 mL/dakika=4,2 L/dakika. Toplam dakika ventilasyonu 6 L/dakika olup farklı büyüklüktür.",
      ],
      [
        "Vt=250 mL, ölü boşluk 150 mL, f=24/dakika. Alveoler ventilasyon kaç L/dakika?",
        "2,4",
        ["6", "3,6", "9,6", "0,24"],
        "Her solukta 250−150 mL yeni alveoler hava.",
        "100×24=2.400 mL/dakika=2,4 L/dakika. Hız artmış olsa da aynı toplam ventilasyon başka senaryoyla eşit etkin hacim vermez.",
      ],
      [
        "Q=(Patm−Palv)/R; Patm=0, Palv=−1, R=2. İçe pozitif modelde Q?",
        "+0,5",
        ["−0,5", "+2", "−2", "0"],
        "Parantez içindeki negatif sayıyı doğru çıkar.",
        "[0−(−1)]/2=+0,5. İşaret içe yönü gösterir; model birimi belirtilen basınç ve direnç tanımına bağlıdır.",
      ],
      [
        "Q=(Patm−Palv)/R; Patm=0, Palv=+1, R=2. İçe pozitif modelde sonuç?",
        "−0,5; dışa",
        ["+0,5; içe", "+2; içe", "−2; sıfır hacim", "0; her basınçta akış yok"],
        "Alveol basıncı daha yüksekse akış dışadır.",
        "(0−1)/2=−0,5 bulunur. Negatif işaret dışa akışı anlatır; negatif hava stoğu olduğu anlamına gelmez.",
      ],
      [
        "Sakin ve zorlu ekspirasyon için hangi ayrım uygundur?",
        "Sakinde elastik geri dönüş baskın; zorlu ekspirasyonda ek kas katkısı olabilir",
        [
          "Her ikisinde bütün hücrelerin ATP kullanımı sıfırdır",
          "Sakin ekspirasyonda diyafram zorunlu aşağı kasılır",
          "Zorlu ekspirasyonda hiçbir kas görev yapamaz",
          "Pasif demek akciğerde hiç elastik yapı yok demektir",
        ],
        "Pasif sözcüğünün hangi mekanizmaya ait olduğunu sınırla.",
        "Dinlenim ekspirasyonu çoğunlukla pasif geri dönüşle olur; gevşeme ve diğer canlılık süreçleri yine enerji gerektirir. Zorlu soluk verme aktif kas katkısını içerebilir.",
      ],
      [
        "Solunum denetiminde uygun yön eşleştirmesi hangisidir?",
        "Kemoreseptör → merkez duyu girdisi; merkez → diyafram motor çıkışı",
        [
          "Diyafram → aort içinde hormonla doğrudan gaz üretimi",
          "Merkez → kemoreseptör ölçümü yalnız kan akımıyla",
          "Her sinyal yalnız böbrek pelvisinde dolaşır",
          "Duyu ve motor hedefler her durumda aynı tek hücredir",
        ],
        "Algılayan, işleyen ve yanıt veren yapıları ayır.",
        "Periferik duyular merkeze bilgi taşır, motor yollar solunum kaslarına gider. Afferent ve efferent okları ters çevirmek geri denetim döngüsünü bozar.",
      ],
      [
        "Merkezî CO₂/pH denetimini doğru açıklayan ifade hangisidir?",
        "CO₂ BOS’a geçip yerel H⁺ oluşumuyla merkezî algıyı etkileyebilir",
        [
          "Kandaki her H⁺ hiçbir sınır olmadan aynı hızda beyne geçer",
          "Hücresel solunum CO₂’yi her zaman dışarı üfler",
          "BOS ile bütün atmosfer tek açık boşluktur",
          "CO₂ artışı hiçbir zaman pH ilişkisi kuramaz",
        ],
        "CO₂ geçişini yerel tampon tepkimesinden ayır.",
        "Merkezî algıda BOS ortamı önemlidir; kan-beyin sınırındaki CO₂ ve H⁺ geçişleri aynı değildir. Ventilasyonun CO₂ eliminasyonu bu girdiye geri bildirim oluşturabilir.",
      ],
      [
        "Oksijenin solunum denetimindeki rolünü doğru sınırlayan ifade hangisidir?",
        "Ciddi arteriyel O₂ düşüşünde periferik kemoreseptör katkısı önemlidir",
        [
          "O₂ hiçbir koşulda algılanamaz",
          "Her durumda tek denetim yalnız O₂’dir",
          "CO₂ ve pH’nin hiçbir rolü yoktur",
          "Solunumun tek merkezî hedefi safra kesesidir",
        ],
        "Normal aralık açıklamasını bütün koşullara yayma.",
        "CO₂/pH normal denetimde güçlü rol oynar; ağır hipokside periferik O₂ algısı da önem kazanır. Bu yüzden O₂ her zaman etkisizdir genellemesi doğru değildir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 103–105; OGM Dersler Cepte Solunum PDF 12 gerçek öğretim, inspirasyon-ekspirasyon ve denetim şekilleriyle karşılaştırılmış özgün anlatım ve sorular. Basınç ve hacim sayıları açık öğretim modelleridir; resmî sınav sorusu değildir.",
  },
  {
    id: "solunum-gaz-tasinmasi",
    topic: "detail-318",
    title: "Gazların taşınması: hemoglobin, plazma ve tersinir dönüşüm",
    minutes: 48,
    objectives: [
      "Oksijenin kısmi basıncı, doygunluğu ve kandaki miktarını ayır.",
      "Dokuda ve akciğerde CO₂–bikarbonat–klorür yönlerini izleyerek açıklama yap.",
      "Hemoglobinin bağlama kapasitesi ile gerçek ortalama doluluğu hesapla.",
      "Bohr etkisini aynı O₂ basıncında karşılaştır; gaz yüzdelerini tarih dışı kesin sabit sayma.",
    ],
    sections: [
      {
        title: "Gazı taşımak, kanı havayla doldurmak değildir",
        paragraphs: [
          "Alveolden kana geçen O₂ önce plazmada çözünür ve eritrosite ulaşır. Büyük bölümü eritrositteki hemoglobine tersinir bağlanarak taşınır; küçük bölümü çözünmüş kalır. Kanın akışı taşıma, alveol sınırından geçiş ise difüzyondur. Sistemik dolaşım bu yükü dokulara götürür.",
          "Dokuda O₂ tüketimi uygun kısmi basınç farkının korunmasına katkı verir. O₂ hemoglobinden ayrılabilir, plazma ve doku sıvısından hücreye ulaşabilir. Bu nedenle yükleme ve boşaltma ayrı yerlerde gerçekleşir; hemoglobin bütün yol boyunca gazı geri veremeyen bir kilit değildir.",
        ],
      },
      {
        title: "Hemoglobinin dört hem grubu",
        paragraphs: [
          "Bir hemoglobin tetramerinde dört globin alt birimi ve dört hem grubu vardır. Hem demirine birer O₂ bağlanabilmesi tam dolulukta bir hemoglobin başına dört O₂ kapasitesi sağlar. O₂ bağlanması, hem demirinin her solukta zorunlu oksitlenip paslanması olarak anlatılmaz; tersinir oksijenlenme söz konusudur.",
          "Dört yerin doluluğu çevre koşullarına bağlıdır. On hemoglobin için azami kapasite 40 O₂ iken ortalama yüzde 75 doluluk 30 O₂ eşdeğeridir. Bu, her bir molekülün tam üç yerinin her an dolu olması gerektiği değil, topluluk ortalamasıdır. Eritrosit sayısı ve hemoglobin miktarı toplam kapasiteyi etkiler.",
        ],
      },
      {
        title: "Kısmi basınç, doygunluk ve içerik",
        paragraphs: [
          "Kısmi basınç, karışım içindeki gazın basınç katkısıdır; çözünmüş serbest O₂ ile ilişkilidir. Doygunluk ise hemoglobinin kullanılabilir O₂ bağlama yerlerinin doluluk oranıdır. İçerik, belirli kan hacminde taşınan toplam O₂ miktarını anlatır. Üçü aynı değişken ve aynı birim değildir.",
          "Aynı doygunlukta daha az hemoglobin içeren kan daha az bağlı O₂ taşıyabilir. Bu yüzden bir basınç veya yüzde tek başına toplam taşıma miktarını vermez. Bir problemde hemoglobin sayısı, doluluk ve çözünmüş miktar ayrı verilirse önce bağlı miktarı bulup sonra uygun birimlerle birleştir.",
        ],
      },
      {
        title: "Oksijen ayrışma eğrisini oku",
        paragraphs: [
          "O₂ kısmi basıncı yatay, doygunluk yüzde olarak düşey eksene yerleştirilir. Hemoglobin için işbirlikli bağlanma nedeniyle eğri S biçimli olabilir: bir O₂ bağlanması diğer yerlerin bağlanmasını etkiler. Akciğerin yüksek ve dokuların daha düşük basınç bölgeleri aynı eğri üzerinde farklı doluluklara karşılık gelir.",
          "Doygunluğun yüzde 100 olması dört yerin ortalama tam doluluğunu anlatır; 100 mmHg ile aynı ölçü değildir. Eğrinin yüksek basınçta yatıklaşması yükleme payının, daha dik bölgeleri boşaltmanın koşullu ilişkisini görmeyi sağlar. Sayısal bir değer ancak verilen eğri veya açık modelden okunur.",
        ],
      },
      {
        title: "Bohr etkisi: aynı basınçta iki ortam",
        paragraphs: [
          "CO₂ artışı ve pH düşüşü hemoglobinin O₂ ilgisini azaltan bir ortam oluşturabilir. Aynı O₂ kısmi basıncında daha düşük doluluk, dokuya bırakmanın kolaylaşmasıyla ilişkilidir. Sıcaklık artışı ve bazı eritrosit içi düzenleyiciler de eğrinin konumunu etkileyebilir; bunlar farklı girdilerdir.",
          "Karşılaştırmada yatay eksendeki basıncı sabit tut. Verilen örnekte aynı basınçta yüzde 70 yerine yüzde 50 doygunluk varsa fark 20 yüzde puanıdır. Bu, toplam O₂ miktarının her koşulda yüzde 20 azalması demek değildir; hemoglobin miktarı ve çözünmüş katkı ayrıca gerekir.",
        ],
      },
      {
        title: "CO₂ üç temel biçimde taşınır",
        paragraphs: [
          "Dokuda üretilen CO₂ kanla akciğere taşınır. Bir kısmı çözünmüş, bir kısmı proteinlerin amino gruplarına karbamino biçimde bağlı, büyük kısmı bikarbonat olarak bulunur. Karbaminohemoglobin ile O₂’nin hem demirine bağlanması aynı bağlanma yeri değildir.",
          "Kaynakta verilen yaklaşık öğretim dağılımı toplam CO₂’nin yüzde 7 çözünmüş, yüzde 23 karbamino ve yüzde 70 bikarbonat biçimidir. Bu paylar tanımlı koşulların yaklaşık anlatımıdır; tüm canlı ve durumların değişmez sabiti değildir. Yüzde 23, yüzde 93’lük alt grubun yeniden yüzdesi olarak hesaplanmaz.",
        ],
      },
      {
        title: "Dokuda karbonik anhidraz ve tampon",
        paragraphs: [
          "CO₂ eritrosite girince karbonik anhidraz, CO₂ ile su arasındaki tersinir dönüşümü hızlandırır. Oluşan karbonik asit H⁺ ve HCO₃⁻ ile dengededir. Hemoglobinin H⁺ bağlaması tampon desteği verir; CO₂ moleküllerinin çoğunun bu yolla dönüşümü, hücrenin bütün CO₂’yi kendi içinde depoladığı anlamına gelmez.",
          "Bikarbonat eritrositten plazmaya taşınırken elektriksel dengeye katkı veren klorür değişimi gerçekleşir: tipik doku yönünde HCO₃⁻ dışarı, Cl⁻ içeri. Böylece önemli taşınan biçim plazmada bulunabilir; eritrositte başlayan kimya ile nihai taşıma bölmesini ayırmak gerekir.",
        ],
      },
      {
        title: "Akciğerde dönüşümün yönü değişir",
        paragraphs: [
          "Akciğer kılcalında bikarbonat eritrosite geri girebilir ve klorür ters yönde çıkar. H⁺ ile bikarbonat ilişkisi CO₂ ve su oluşumuna doğru ilerler; CO₂ uygun farkla alveole difüze edilip ventilasyonla dışarı verilir. Kimyasal denge, difüzyon ve hava hareketi birbirini tamamlayan ayrı basamaklardır.",
          "O₂’nin hemoglobine bağlanması H⁺ ve CO₂ bırakılmasını destekleyebilir; bu ilişki Haldane etkisi olarak anılır. Bohr etkisi O₂ ilgisine CO₂/pH katkısını, Haldane etkisi oksijenlenmenin CO₂/H⁺ taşınmasına katkısını vurgular. İki yönün adını ezberlemekten önce hangi yükün bırakıldığını çiz.",
        ],
      },
      {
        title: "Gaz geçişi yönü ve dolaşım devresi",
        paragraphs: [
          "Sistemik doku kılcalında genel net O₂ yönü kandan dokuya, CO₂ yönü dokudan kana doğrudur. Akciğer kılcalında O₂ alveolden kana, CO₂ kandan alveole geçer. Bu net yönler uygun kısmi basınç farklarının bulunduğu fizyolojik karşılaştırma içindir.",
          "Atardamar ve toplardamarın tanımı kalbe göre akış yönüdür. Akciğer atardamarının görece az O₂ taşıması onu toplardamar yapmaz. Kılcalın adını yalnız kanın rengine göre seçmek yerine, devreyi ve hedef dokuyu belirlemek O₂/CO₂ oklarını doğru yere yerleştirir.",
        ],
      },
      {
        title: "Karbonmonoksit ve yüksekliğin farklı etkisi",
        paragraphs: [
          "Karbonmonoksit hemoglobine güçlü bağlanarak O₂ taşıma ve bırakma düzenini bozabilir. Bir ortamda O₂ yüzdesinin var olması tek başına hemoglobinin kullanılabilir yerlerinin açık olduğunu göstermez. Karbonmonoksit, karbon dioksitle aynı gaz veya aynı bağlanma biçimi değildir.",
          "Yükseklikte atmosferin toplam basıncının düşmesi solunan O₂ kısmi basıncını etkiler; O₂ oranının her zaman aynı ölçüde azaldığı söylenmez. Uyum süreçleri zamanla solunum ve kan yapımını etkileyebilir. Aynı yakınma tek gaz ölçümü veya kişisel tanı için yeterli olmaz; burada mekanizma karşılaştırılır.",
        ],
      },
      {
        title: "Basınç değişimi ve çözünmüş gaz",
        paragraphs: [
          "Artan çevre basıncında kanda ve dokuda çözünmüş bazı gaz miktarları değişebilir. Basınç hızla azaltıldığında çözünmüş azotun kabarcık oluşturması dekompresyon sorunlarının temel açıklamalarından biridir. İnsan kanında azotun normal olarak sıvı azota dönüşmesi bu mekanizma değildir.",
          "Bunu normal O₂–hemoglobin eğrisiyle aynı grafik sanma: çözünme, basınç ve gaz kabarcığı farklı ilişkilerdir. Buradaki model basınç deneyi veya dalış uygulaması önermez. Bir soruda basınç yükselme–azalma sırası verilirse önce hangi gazın hangi biçimde bulunduğunu belirle.",
        ],
      },
      {
        title: "İki farklı model katmanını birlikte kullan",
        paragraphs: [
          "Taşıma modelinde N hemoglobin, yüzde S doygunluk için bağlı O₂=4NS/100 verilir; bu molekül topluluğunun ortalama eşdeğeridir. CO₂ dağıtımı toplam miktara yüzde 7/23/70 uygular. Akciğer/doku seçimi klorür ve bikarbonat oklarını ters çevirir, toplamı değiştirmez.",
          "İkinci grafik yalnız öğretilmiş oyuncak Hill eğrisidir: S=100P³/(P³+P₅₀³); düşük pH örneğinde P₅₀=34, orta 28, yüksek 24 model basınç birimidir. Bunlar ölçülmüş hasta eğrileri değildir. P=P₅₀ için S=50 çıkmasını ve aynı P’de ilgi farkını cebirle sınayabilirsin.",
        ],
      },
    ],
    examples: [
      {
        title: "Tam kapasite ile ortalama doluluk",
        prompt:
          "10 hemoglobin, her birinde 4 O₂ yeri; ortalama doygunluk yüzde 75. Kapasite ve bağlı O₂ eşdeğeri?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Tam kapasite 10×4=40 O₂.",
          },
          {
            label: "2. adım",
            explanation: "Bağlı ortalama 40×75/100=30 O₂ eşdeğeri.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu topluluk ortalamasıdır; her molekülün aynı üç yerinin dolu olması zorunlu değildir.",
          },
        ],
        answer: "Kapasite 40; ortalama bağlı 30.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Yüzdeyi hemoglobin sayısıyla çarpıp dört yeri unutmak.",
      },
      {
        title: "Üç CO₂ taşıma payı",
        prompt:
          "Öğretim modelinde toplam 200 CO₂ biriminin yüzde 7’si çözünmüş,23’ü karbamino,70’i bikarbonat. Miktarlar?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Çözünmüş 200×0,07=14.",
          },
          {
            label: "2. adım",
            explanation: "Karbamino 200×0,23=46; bikarbonat 200×0,70=140.",
          },
          {
            label: "3. adım",
            explanation:
              "14+46+140=200; payların ortak paydası toplam CO₂’dir.",
          },
        ],
        answer: "14, 46 ve 140 model birimi.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Yüzde 23’ü toplam yerine çözünmemiş alt grubun yüzdesi saymak.",
      },
      {
        title: "Aynı basınçta iki doluluk",
        prompt:
          "Aynı O₂ basıncında verilen eğri X için yüzde 70, Y için yüzde 50 doygunluk gösteriyor. Fark ve yorum?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İki yüzde aynı kullanılabilir bağlama yerleri paydasındadır.",
          },
          {
            label: "2. adım",
            explanation: "70−50=20 yüzde puanı.",
          },
          {
            label: "3. adım",
            explanation:
              "Y ortamında verilen basınçta daha düşük O₂ ilgisi vardır; toplam kan miktarı tek başına bulunmaz.",
          },
        ],
        answer: "20 yüzde puanı; Y’de doluluk daha düşük.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "20 yüzde puanını toplam O₂ miktarının kesin yüzde 20 kaybı saymak.",
      },
      {
        title: "Yarım doluluğu denklemden bul",
        prompt:
          "Oyuncak S=100P³/(P³+P₅₀³) eğrisinde P₅₀=28. P=28 ve P=0 için S?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "P=28 için pay 100×28³, payda 2×28³.",
          },
          {
            label: "2. adım",
            explanation: "S=50; P=0 için pay 0, payda 28³ olduğundan S=0.",
          },
          {
            label: "3. adım",
            explanation:
              "İki sonuç verilen oyuncak eğriye aittir; kişisel ölçüm sayılmaz.",
          },
        ],
        answer: "Yüzde 50 ve yüzde 0.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "P₅₀’yi doygunluğun yüzde 28’i gibi okumak.",
      },
    ],
    recall: [
      {
        prompt: "Hb’de kaç O₂ bağlama yeri var?",
        answer:
          "Temel tetramerde dört; gerçek doluluk çevre koşullarına bağlıdır.",
      },
      {
        prompt: "Doku kılcalında klorür kayması?",
        answer:
          "Tipik modelde HCO₃⁻ eritrositten dışarı, Cl⁻ içeri; akciğerde ters yön.",
      },
      {
        prompt: "CO₂’nin büyük taşıma biçimi?",
        answer:
          "Verilen yaklaşık öğretimde bikarbonat; önemli kısmı plazmada taşınır.",
      },
      {
        prompt: "Bohr etkisinde neyi sabit tut?",
        answer:
          "Eğri karşılaştırmasında O₂ kısmi basıncını; pH/CO₂ değişimiyle doluluk farkına bak.",
      },
    ],
    items: [
      [
        "Her biri 4 O₂ bağlayabilen 10 hemoglobin yüzde 75 ortalama doygunlukta. Bağlı O₂ eşdeğeri kaçtır?",
        "30",
        ["10", "20", "40", "75"],
        "Önce tam yer sayısını bul.",
        "10×4=40 yer;40×0,75=30 O₂ eşdeğeri. Bu topluluk ortalamasıdır, her hemoglobinin aynı üç yerinin dolu olmasını zorunlu kılmaz.",
      ],
      [
        "O₂ kısmi basıncı, doygunluk ve içerik için hangi ayrım doğrudur?",
        "Aynı doygunlukta farklı hemoglobin miktarları farklı O₂ içeriği verebilir",
        [
          "Üçü her zaman aynı birimli tek sayıdır",
          "Yüzde 100 doygunluk mutlaka 100 litre O₂ demektir",
          "Doygunluk azalınca hemoglobin molekülleri zorunlu yok olur",
          "Kısmi basınç yalnız eritrositlerin toplam sayısının adıdır",
        ],
        "Doluluk oranıyla toplam yer sayısını ayır.",
        "Doygunluk kullanılabilir yerlerin doluluk oranıdır. Toplam hemoglobin miktarı değişirse aynı yüzde için bağlı O₂ miktarı farklı olabilir; kısmi basınç ayrı niceliktir.",
      ],
      [
        "Toplam 200 CO₂ model birimi yüzde 7 çözünmüş,23 karbamino,70 bikarbonat biçiminde. Bikarbonat miktarı?",
        "140",
        ["14", "46", "70", "186"],
        "Yüzde 70 toplam 200’e uygulanır.",
        "200×70/100=140. Diğer paylar 14 ve 46’dır; üç miktarın toplamı 200 olur. Yüzde 70’i eritrositteki başka bir alt miktara yeniden uygulamayız.",
      ],
      [
        "Tipik doku kılcalı modelinde eritrosit–plazma değişimi için doğru yön hangisidir?",
        "HCO₃⁻ eritrositten dışarı; Cl⁻ içeri",
        [
          "HCO₃⁻ yalnız alveolden buruna taşınır",
          "Her iki iyon yalnız hem demirine O₂ olarak bağlanır",
          "Cl⁻ her durumda yalnız dışarı, HCO₃⁻ yalnız içeri",
          "Eritrosit ile plazma arasında hiçbir taşıma olamaz",
        ],
        "CO₂’nin eritrositte dönüşüp plazmada taşınmasını izle.",
        "Doku yönünde karbonik anhidrazın hızlandırdığı dönüşümle bikarbonat oluşur. HCO₃⁻ dışarı çıkarken klorür içeri girişi elektriksel dengeye katkı verir; akciğerde temel yön tersine döner.",
      ],
      [
        "Akciğer kılcalında CO₂’nin dışarı atılmasına uygun sıra hangisidir?",
        "Bikarbonatın eritrosite dönüşü → CO₂ oluşumu → alveole difüzyon → ventilasyon",
        [
          "Bütün kanın alveol lümenine açıkça dökülmesi",
          "CO₂’nin yalnız böbrek taşına dönüşmesi",
          "Hemoglobinin bütün karaciğere safra olarak geçmesi",
          "Her HCO₃⁻ iyonunun O₂ molekülü olması",
        ],
        "Kimya, difüzyon ve hava hareketini sırala.",
        "Akciğerde tampon tepkimesinin yönü CO₂ oluşumunu destekler. CO₂ kana göre düşük alveoler kısmi basınca difüze olabilir, sonra soluk vermeyle uzaklaştırılır.",
      ],
      [
        "Aynı O₂ basıncında X ortamında doygunluk yüzde 70, Y’de yüzde 50. Doğru fark?",
        "20 yüzde puanı",
        [
          "Yüzde 20 zorunlu toplam kan kaybı",
          "120 yüzde puanı",
          "Yüzde 40 kesin toplam O₂ artışı",
          "Hemoglobin miktarı kesin sıfır",
        ],
        "Aynı oran ölçeğinde çıkarma yap.",
        "70−50=20 yüzde puanı. Toplam O₂ miktarı için hemoglobin miktarı ve çözünmüş katkı gerekir; doluluk farkını doğrudan kan kaybı sayamayız.",
      ],
      [
        "Doku ortamında CO₂ artışı ve pH düşüşünün O₂ ilgisine tipik etkisi hangisidir?",
        "Aynı O₂ basıncında daha düşük dolulukla O₂ bırakılması kolaylaşabilir",
        [
          "Her basınçta zorunlu yüzde 100 doygunluk",
          "Hemoglobinin her zaman geri dönüşsüz demir oksit olması",
          "Bütün O₂’nin safra kanalına yönelmesi",
          "CO₂’nin O₂ ile aynı hem yerine zorunlu bağlanması",
        ],
        "Karşılaştırmada basıncı sabit tut.",
        "Bohr etkisi pH/CO₂ ortamının O₂ ilgisini etkilemesidir. Aynı kısmi basınçta daha düşük ilgi, dokuda bırakmayı kolaylaştırabilir; karbamino bağlanması hem demiriyle aynı yer değildir.",
      ],
      [
        "Oyuncak S=100P³/(P³+28³) eğrisinde P=28 iken doygunluk?",
        "Yüzde 50",
        ["Yüzde 28", "Yüzde 100", "Yüzde 0", "Yüzde 75"],
        "Payda iki eşit küpün toplamıdır.",
        "P=28 için 28³/(28³+28³)=1/2;100 ile çarpınca 50 bulunur. Bu açıkça verilen eğrinin sonucu olup bütün gerçek kişilerin ölçümü değildir.",
      ],
      [
        "Yüksek çevre basıncından hızlı düşüşte dekompresyon için temel uygun açıklama hangisidir?",
        "Çözünmüş azotun gaz kabarcıkları oluşturması",
        [
          "Kanın normalde sıvı azotla tamamen dolması",
          "Her hemoglobinin safra kesesine dönüşmesi",
          "Yalnız O₂’nin bütün damarları kemikleştirmesi",
          "Her basınç düşüşünün kesin aynı kişisel sonucu vermesi",
        ],
        "Çözünmüş gaz ile sıvı azotu ayır.",
        "Basınç azalması çözünmüş gazın kabarcık oluşturmasını destekleyebilir. Mekanizma sıvı azot üretimi değildir; tek basınç öyküsü bütün kişilerin kesin sonucunu vermez.",
      ],
      [
        "Akciğer atardamarı için doğru tanım hangisidir?",
        "Kalpten akciğere kan götüren damardır; adı yalnız O₂ miktarıyla belirlenmez",
        [
          "Adı gereği her zaman sistemik en yüksek O₂’ye sahiptir",
          "Yalnız alveolün açık hava lümenidir",
          "Kalbe doğru akan her damar atardamar olur",
          "İçinde hiçbir kan hücresi bulunamaz",
        ],
        "Damar adını kalbe göre yönle belirle.",
        "Atardamar kalpten uzaklaşan akımı taşır. Akciğer atardamarının görece az O₂ taşıması bu yön tanımını değiştirmez; gaz alışverişi sonra kılcallarda gerçekleşir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 106–110; OGM Dersler Cepte Solunum PDF 13–14 gerçek gaz taşıma ve eğri şekilleriyle karşılaştırılmış özgün öğretim. Yüzde 7/23/70 yaklaşık öğretim paylarıdır; Hill eğrisi açık oyuncak bağıntıdır. Resmî sınav sorusu değildir.",
  },
  {
    id: "uriner-organlar",
    topic: "detail-319",
    title: "Üriner organlar: iki böbrekten dış ortama yol",
    minutes: 48,
    objectives: [
      "Böbreğin konumunu, kesitini ve kan ile idrar yollarını açıkla.",
      "Üreter, mesane ve üretrayı yapı ve işlevleriyle ayır.",
      "Verilen üretim, iletim ve çıkış miktarlarıyla mesane bilançosu kur.",
      "Boşaltım, dışkılama, böbrek görevleri ve tedavi desteğini doğru sınırlarla karşılaştır.",
    ],
    sections: [
      {
        title: "Boşaltımın anlamı ve üriner sistem",
        paragraphs: [
          "Metabolizma sonucunda oluşan bazı atıkların ve fazla maddelerin iç ortamdan uzaklaştırılması boşaltımın temelidir. İnsanda üriner sistem böbrekler, üreterler, mesane ve üretradan oluşur. Böbrekler idrarın oluşmasını sağlar; sonraki yapılar iletim, depolama ve kontrollü çıkış görevlerini üstlenir.",
          "Akciğer CO₂, deri su ve bazı çözünmüş maddelerin uzaklaştırılmasına katkı verir; karaciğer birçok maddenin dönüşüm ve safrayla uzaklaştırma süreçlerinde rol alır. Sindirim kanalındaki emilmemiş kalıntının dışkılanmasıyla metabolik atığın boşaltılmasını kavramsal olarak ayır. Aynı organda birden fazla süreç bulunabilir.",
        ],
      },
      {
        title: "Azotlu atığın kaynağını izle",
        paragraphs: [
          "Amino asitlerin amino gruplarının işlenmesi azotlu atık yüküne katkı verir. Karaciğerde üre döngüsü amonyak azotunun üreye dönüştürülmesinde önemlidir; üre kanla böbreğe taşınıp idrarla uzaklaştırılabilir. Proteinlerin bütünü doğrudan süzgeçten atılan büyük atık torbaları değildir.",
          "Ürik asit insanda pürinlerin parçalanmasıyla, kreatinin kas kreatin metabolizmasıyla ilişkilidir. Amonyağın hepsi önce ürik aside, sonra kesin aynı yoldan üreye dönüşür biçiminde tek çizgi kurma. Farklı maddelerin kökenleri, taşınması ve tüpte işlenmesi birbirinden ayrılmalıdır. Amonyağın üreye dönüştürülmesi toksik yükü sınırlar ama enerji gerektirir. Azotun hangi ürünle atıldığı su gereksinimini de etkiler; ürik asidin düşük çözünürlüğü bazı türlerde az suyla atılıma uyum sağlar.",
        ],
      },
      {
        title: "İki böbreğin karın arka duvarındaki yeri",
        paragraphs: [
          "Böbrekler omurganın iki yanında, karın arka duvarında ve periton arkasında bulunur. Karaciğer komşuluğu nedeniyle sağ böbrek çoğu kişide biraz daha aşağıdadır. Dıştaki kapsül ve çevre destek dokuları böbreği koruyan yapısal ilişkilerin parçalarıdır.",
          "Her böbreğin içe bakan çukur bölgesindeki hilustan damarlar, sinirler ve pelvisin üretere devamı geçer. Böbreküstü bezi komşu ama ayrı bir endokrin organdır. Böbreğin idrar oluşturması, komşu bezin bütün hormonlarının böbrek süzgecinden üretildiği anlamına gelmez.",
        ],
      },
      {
        title: "Kesitte korteks, medulla ve toplayıcı yol",
        paragraphs: [
          "Böbrek kesitinin dış kısmında korteks, iç kısmında medulla görülür. Medulladaki piramitlerin uçları papilla bölgesidir. Nefronun glomerulus ve Bowman kapsülü kortekste, tüp kollarının bazı bölümleri korteks ve medulla boyunca yer alır; bütün nefron tek noktada duran bir kese değildir.",
          "Toplama kanallarından papilla yoluna gelen idrar küçük kalikslere, sonra büyük kalikslere ve böbrek pelvisine ulaşır; pelvis üretere devam eder. Böylece tüpte oluşturulan son sıvı ana iletim yoluna katılır. Korteks dokusunu pelvisin iç boşluğuyla aynı renkte tek havuz gibi düşünme.",
        ],
      },
      {
        title: "Kan yolu ile idrar yolu farklıdır",
        paragraphs: [
          "Böbrek atardamarı kanı böbreğe getirir; dallar afferent arteriyollere, glomerulus kılcallarına, efferent arteriyollere ve sonraki kılcal ağlara ulaşır. Böbrek toplardamarı kanı dolaşıma geri götürür. Üreter ise kan damarı değil, idrarı pelvisten mesaneye ileten tüptür.",
          "Filtrasyonla kanın su ve bazı küçük maddeleri seçici bariyerden Bowman aralığına geçer; bütün kan bu aralığa dökülmez. Sağlıklı bariyerde kan hücrelerinin büyük kısmı damar içinde kalır. Kanın üreterden mesaneye akması normal idrar yolunun tanımı değildir.",
        ],
      },
      {
        title: "Üreterin peristaltik iletimi",
        paragraphs: [
          "Her böbreğin pelvisinden çıkan üreter mesaneye ulaşır. Duvarındaki düz kasların dalga biçimli kasılmaları, idrarın iletilmesine katkı verir. Taşıma yalnız yer çekimine bağımlı pasif bir açık oluk değildir; lümen, kas duvarı ve bağ dokusu ayrı katmanlardır.",
          "İdrar üretimi ile üreterden mesaneye ulaşma miktarı farklı olabilir. Kısa bir seçici engel modelinde üretim sabit kabul edilse de engelli yolda sıvı birikir. Gerçek uzun süreli tıkanmada basınç ve böbrek işlevleri de değişebilir; kısa bilanço deneyi bu klinik süreci taklit etmez.",
        ],
      },
      {
        title: "Mesane bir depodur",
        paragraphs: [
          "Mesane kaslı duvarıyla idrarı geçici depolar. Dolum sırasında duvarın gerilmesi duyu girdisi oluşturur; işeme refleksinin omurilik ve üst merkezlerle denetimi, otonom ve istemli motor katkılarla birlikte ele alınır. Depolanan sıvının miktarı giriş ve çıkışların bilançosudur.",
          "Mesane duvarındaki detrüsör kası ile üretra çevresindeki kapama düzenekleri farklı görevler taşır. İstemsiz ve istemli denetim yollarının gelişimi ve koşulları değişebilir. Mesaneyi bütün idrarın kimyasal olarak üretildiği ikinci bir böbrek saymak yerine, üretilen sıvının deposu olarak yerleştir.",
        ],
      },
      {
        title: "Üretra dışarı çıkış yoludur",
        paragraphs: [
          "Üretra mesaneden dış ortama uzanır; üreter iki böbrekten mesaneye gelen yolların adıdır. Erkekte üretra idrar ve üreme yollarının ortak son bölümlerinde görev alır; bu ortaklık iki sıvının her zaman eşzamanlı aynı yöne aktığı anlamına gelmez. Kadında üriner ve üreme açıklıkları ayrı anatomik ilişkilere sahiptir.",
          "Bir üreter engeli seçili böbreğin mesaneye teslimini etkilerken, üretra engeli mesaneden dışarı çıkışı etkiler. Şemada kapalı noktayı doğru boruya koymak, sayısal sonucu da değiştirir. Üretra ve üreter sözcüklerinin benzerliği yönleri aynı yapmaz.",
        ],
      },
      {
        title: "Böbreğin düzenleyici görevleri",
        paragraphs: [
          "Böbrek su ve elektrolit dengesi, asit-baz dengesi ve metabolik atıkların uzaklaştırılmasına katkı verir. İdrarda atılan miktar, süzülen miktarın aynısı değildir; geri emilim ve salgılama bu içeriği değiştirir. Nefronun farklı bölümleri sonraki derste bu seçiciliğin nasıl kurulduğunu gösterecek.",
          "Böbrek renin yoluyla kan basıncı düzenlenmesine, eritropoietin üretimiyle eritrosit yapımının uyarılmasına ve D vitamininin etkinleşme sürecine de katılır. Bu görevler nedeniyle böbreği yalnız mekanik süzgeç saymak eksik olur. İdrar hacmi, kan yapımı ve hormon üretimi tek bir değişken değildir. Özellikle açlıkta böbrek korteksi laktat, gliserol ve bazı amino asitlerin karbon iskeletlerinden glikoz oluşturarak glukoneogeneze katkı verebilir. Oksijenin azalmasına uygun yanıtla eritropoietinin kemik iliğini uyarması, böbrek ile kan yapımı arasındaki bağı açıklar.",
        ],
      },
      {
        title: "Enfeksiyon, taş ve yetersizlik farklı süreçlerdir",
        paragraphs: [
          "Üriner enfeksiyon alt yollarda veya böbrekte görülebilir; belirtilerin yeri ve nedenleri değişebilir. Mesane iltihabı sistit, üretra iltihabı üretrit diye adlandırılır. Üretrit, gonore gibi belirli bir etkenin adıyla eş anlamlı değildir. Taşlar farklı kimyasal bileşimlerde olabilir; yalnız tek kalsiyum tuzundan oluşan bütün taşlar diye genellenmez.",
          "Akut böbrek hasarı ile kronik böbrek hastalığı farklı süre ve neden örüntüleridir. Her akut durumda bütün böbrek görevinin bir anda sıfırlandığı veya kesin aynı günde düzeldiği söylenmez. Burada yapılar ve mekanizmalar öğrenilir; tek belirtiyi kişisel kesin tanı anahtarı yerine koyma.",
        ],
      },
      {
        title: "Diyaliz ve naklin işlev kapsamı",
        paragraphs: [
          "Hemodiyalizde seçici bir membran üzerinden çözünmüş maddelerin değişimi ve sıvı uzaklaştırılması desteklenir. Difüzyon ile uygun basınç altında ultrafiltrasyon ayrı katkılardır. Bu destek böbreğin bütün hormon ve metabolik görevlerinin aynısını eksiksiz yeniden üretmez.",
          "Nakil uygun verici organla böbrek işlevini desteklemeyi amaçlar; vericinin her durumda yakın akraba olması zorunlu tanım değildir. Uygunluk, bağışıklık ve izlem süreçleri önemlidir. Bütün kişilere tek değişmez diyaliz süresi veya risk yokluğu biçiminde sonuç öğretmek yerine, hangi görevin desteklendiğini belirle.",
        ],
      },
      {
        title: "Depo bilançosunda miktarı koru",
        paragraphs: [
          "Verilen kısa modelde her böbreğin idrar üretim hızı sabittir; süreyle çarpılarak üretilen miktar bulunur. Açık üreter bu sıvıyı mesaneye teslim eder, seçili kapalı üreterin teslimi sıfır kabul edilir. Başlangıç mesanesi ve iki açık teslimin toplamı kullanılabilir sıvıdır.",
          "Dışarı çıkış açıkken verilen çıkış kapasitesiyle mevcut sıvının küçüğü kadar idrar atılabilir. Son mesane=başlangıç+teslimler−gerçek çıkış; engelin yukarısındaki birikim ayrıca gösterilir. Bu sabit üretim varsayımı gerçek tıkanmanın uzun süreli böbrek basıncını hesaplamaz; modelin amacı stok ve akışı ayırmaktır.",
        ],
      },
      {
        title: "Dengeyi koruyan günlük koşullar",
        paragraphs: [
          "Yeterli su ve dengeli beslenme su-tuz yükünü, uygun ilaç kullanımı böbreğin işlem yükünü etkiler. Gereksiz tuz yükünü azaltmak ve tütün maruziyetinden uzak durmak, üriner sağlıkla genel damar sağlığını birlikte destekleyen koşullardır. Su gereksinimi yaş, ortam, etkinlik ve hastalıkla değişir; tek bir litre sayısı herkese değişmez kural değildir.",
          "İdrar yakınmaları ve enfeksiyonların uygun değerlendirilmesi önemlidir; tedavisiz hastalığı yalnız soğuğa veya deride gözenek kapanmasına bağlamak mekanizmayı eksiltir. Deri temizliği genel hijyene katkı verir ama gözenekler böbreğin nefron süzgeci değildir. Böbreğin, kanın ve idrar yolunun farklı görevleri korunarak sağlık bilgisi öğrenilir.",
        ],
      },
    ],
    examples: [
      {
        title: "İki açık yoldan dolum",
        prompt:
          "Mesanede 50 mL var. İki böbrek ayrı ayrı 1 mL/dakika üretip teslim ediyor; 10 dakika dışarı çıkış yok. Son miktar?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Her böbrek 1×10=10 mL teslim eder.",
          },
          {
            label: "2. adım",
            explanation: "Toplam giriş 20 mL; başlangıçla birlikte 50+20.",
          },
          {
            label: "3. adım",
            explanation: "Çıkış sıfır olduğundan son mesane 70 mL’dir.",
          },
        ],
        answer: "70 mL.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Tek böbreğin miktarını iki kez veya süreyi hiç kullanmadan toplamak.",
      },
      {
        title: "Bir üreter seçici olarak kapalı",
        prompt:
          "Başlangıç mesanesi 50 mL; iki böbrek de 1 mL/dakika üretir. Sol üreter 10 dakika kapalı, sağ açık; dışarı çıkış yok. Sabit üretim modelinde sonuç?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Sol ve sağ böbrek ayrı ayrı 10 mL üretir.",
          },
          {
            label: "2. adım",
            explanation:
              "Yalnız sağdaki 10 mL mesaneye ulaşır; solda yukarı birikim 10 mL.",
          },
          {
            label: "3. adım",
            explanation:
              "Mesane 50+10=60 mL olur; toplam üretilen 20 mL kaybolmaz.",
          },
        ],
        answer: "Mesane 60 mL; engel üstünde 10 mL.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Üretim ile mesaneye teslimi aynı değişken saymak.",
      },
      {
        title: "Depodan fazla çıkarma",
        prompt:
          "Başlangıç 5 mL; toplam teslim hızı 2 mL/dakika ve süre 3 dakika. Çıkış kapasitesi 10 mL/dakika. Açık çıkış, mevcut sıvıyı kapasite sınırına kadar bütünüyle uzaklaştırır. Son miktar?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Teslim 2×3=6 mL; kullanılabilir toplam 11 mL.",
          },
          {
            label: "2. adım",
            explanation:
              "Çıkış kapasitesi 10×3=30 mL olsa da yalnız 11 mL vardır.",
          },
          {
            label: "3. adım",
            explanation: "Gerçek çıkış min(11,30)=11; son depo 0 mL.",
          },
        ],
        answer: "Çıkış 11 mL; son 0 mL.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Kapasiteyi gerçekleşmiş akış sanıp negatif mesane yazmak.",
      },
      {
        title: "Kesitten dışarıya sıra",
        prompt:
          "Papillaya ulaşan idrar için küçük kaliks, pelvis, üretra, mesane, büyük kaliks, üreter yapılarını sırala.",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Papilla → küçük kaliks → büyük kaliks.",
          },
          {
            label: "2. adım",
            explanation: "Büyük kaliks → pelvis → üreter → mesane.",
          },
          {
            label: "3. adım",
            explanation:
              "Mesane → üretra → dış ortam; böbrek toplardamarı bu idrar yolunda değildir.",
          },
        ],
        answer:
          "Küçük kaliks → büyük kaliks → pelvis → üreter → mesane → üretra.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "İdrar ve kan yollarını veya üreter ile üretrayı yer değiştirmek.",
      },
    ],
    recall: [
      {
        prompt: "Üreter ve üretra yönleri?",
        answer:
          "Üreter böbrek pelvisinden mesaneye; üretra mesaneden dış ortama uzanır.",
      },
      {
        prompt: "Korteks ve medulla?",
        answer:
          "Böbreğin dış ve iç doku bölgeleridir; pelvis bunlarla aynı doku değildir, idrar toplama boşluğudur.",
      },
      {
        prompt: "Böbreğin süzme dışındaki üç katkısı?",
        answer:
          "Renin düzeni, eritropoietin üretimi ve D vitamininin etkinleşme süreci.",
      },
      {
        prompt: "Mesane bilançosu?",
        answer:
          "Son miktar=başlangıç+gerçek teslimler−gerçek çıkış; yalnız kapasiteyi çıkış diye kullanma.",
      },
    ],
    items: [
      [
        "Normal idrar iletim yolu için doğru sıra hangisidir?",
        "Papilla → kaliksler → pelvis → üreter → mesane → üretra",
        [
          "Papilla → aort → mesane → safra",
          "Pelvis → üretra → böbrek toplardamarı → üreter",
          "Mesane → üreter → akciğer alveolü",
          "Kaliks → mide → aort → dış ortam",
        ],
        "Toplanma, iletim, depo ve çıkışı sırala.",
        "İdrar toplama kanallarından papilla bölgesine, kalikslere ve pelvise gelir. Üreter mesaneye taşır; dışarı çıkış üretradan olur. Damarlar bu lümenin devamı değildir.",
      ],
      [
        "Böbrekte korteks, medulla ve pelvis için doğru ayrım hangisidir?",
        "Korteks dış doku, medulla iç doku; pelvis idrar toplama yolunun boşluğudur",
        [
          "Üçü aynı tek açık kan damarıdır",
          "Pelvis yalnız hemoglobin üreten eritrosittir",
          "Medulla yalnız dışarıdaki deri tabakasıdır",
          "Korteks mesaneden sonraki üretranın diğer adıdır",
        ],
        "Doku bölgesi ile lümeni ayır.",
        "Böbreğin kesitinde korteks ve medulla doku bölgeleridir. Papilla–kaliks–pelvis sırası idrarın ana toplama yoluna katılmasını sağlar; üç bölge tek açık havuz değildir.",
      ],
      [
        "Başlangıç mesanesi 50 mL; iki böbrek de 1 mL/dakika teslim eder. 10 dakika çıkış yok. Son miktar?",
        "70 mL",
        ["50 mL", "60 mL", "20 mL", "40 mL"],
        "İki girişi süreyle ayrı çarp.",
        "Her böbrek 10 mL, ikisi 20 mL teslim eder. Son miktar 50+20−0=70 mL’dir; başlangıç miktarı da bilançoya katılır.",
      ],
      [
        "Kısa sabit üretim modelinde iki böbrek de 1 mL/dakika üretir. Başlangıç 50 mL; sol üreter 10 dakika kapalı, sağ açık, çıkış yok. Mesane miktarı?",
        "60 mL",
        ["70 mL", "40 mL", "80 mL", "0 mL"],
        "Yalnız açık yolun teslimi mesaneye eklenir.",
        "Sağ yol 10 mL teslim eder; mesane 50+10=60 mL olur. Solda üretilen 10 mL modelde engel üstünde birikir, kaybolmuş sayılmaz.",
      ],
      [
        "Başlangıç 5 mL, toplam giriş 2 mL/dakika, süre 3 dakika. Açık çıkış kapasitesi 10 mL/dakika. Gerçek çıkış en çok kaç mL olur?",
        "11 mL",
        ["30 mL", "25 mL", "6 mL", "−19 mL"],
        "Kapasiteyi mevcut sıvıyla sınırla.",
        "Başlangıç ve giriş toplamı 5+2×3=11 mL’dir. Kapasite 30 mL olsa bile mevcut 11 mL’den fazlası çıkarılamaz. Bu üst sınır bütünüyle kullanılırsa son miktar sıfır olur.",
      ],
      [
        "Seçici kısa modelde üretra tamamen kapalı, iki üreter açık. Doğru etki hangisidir?",
        "Mesaneden dışarı çıkış sıfır; mesaneye teslim sürebilir",
        [
          "İki üreterin yeri birden aorta dönüşür",
          "Her böbreğin kan üretimi zorunlu sıfırlanır",
          "Mesaneden dışarı çıkış kesin iki kat olur",
          "İdrar doğrudan alveole teslim edilir",
        ],
        "Engelin depo öncesinde mi sonrasında mı olduğunu belirle.",
        "Üretra deponun çıkış yoludur. Modelde üreterler açık ve üretim sabit kabul edildiği için teslim devam ederken dışarı çıkış durur; bu uzun süreli klinik sonuç hesabı değildir.",
      ],
      [
        "İnsanda azotlu atık kökenleri için doğru eşleştirme hangisidir?",
        "Üre karaciğerde amino azotunun işlenmesiyle; ürik asit pürin yıkımıyla ilişkilidir",
        [
          "Bütün amonyak önce zorunlu ürik aside sonra üreye dönüşür",
          "Üre yalnız akciğer kıkırdağında üretilir",
          "Kreatinin her zaman safra pigmentinin tek adıdır",
          "Bütün azotlu atıklar yalnız yenmiş selülozun dışkılanmasıdır",
        ],
        "Ayrı moleküllerin kökenlerini tek çizgide birleştirme.",
        "Amino azotunun üreye dönüştürülmesi ile pürinlerin ürik asit yıkımı farklı yollardır. Böbreğe ulaşmaları aynı kimyasal kökenden geldiklerini göstermez.",
      ],
      [
        "Üreterin iletimine katkı veren temel mekanizma hangisidir?",
        "Düz kas duvarının peristaltik hareketi",
        [
          "Yalnız her eritrositin açık mesaneye dökülmesi",
          "Kıkırdak halkanın hemoglobin sentezi",
          "Yalnız mesane içinde yeni nefron yapılması",
          "İdrarın her koşulda yalnız yer çekimiyle taşınması",
        ],
        "Tüpün kas duvarını düşün.",
        "Üreter düz kasının dalgalı kasılmaları idrarı mesaneye iletmeye katkı verir. Bu yol kan damarı değildir ve iletim yalnız yer çekimine indirgenmez.",
      ],
      [
        "Böbreğin mekanik süzme dışındaki görevi hangisidir?",
        "Eritropoietinle eritrosit yapımının uyarılmasına katkı",
        [
          "Bütün solukların gırtlakta seslendirilmesi",
          "Yalnız safra kesesinde yağ damlası üretimi",
          "Besinlerin bütün kimyasal sindirimini mesanede yapma",
          "Pankreas insülininin tamamını pelviste üretme",
        ],
        "Kan yapımına giden hormon katkısını hatırla.",
        "Böbrek eritropoietin, renin düzeni ve D vitamini etkinleşmesi gibi işlevlere katılır. İdrar oluşturması onu yalnız bir pasif süzgeç yapmaz.",
      ],
      [
        "Hemodiyaliz desteği için doğru sınır hangisidir?",
        "Madde ve sıvı uzaklaştırılmasını destekler; böbreğin bütün hormon görevlerini aynen üretmez",
        [
          "Her koşulda böbreğin bütün görevleri eksiksiz aynı yapılır",
          "Hiçbir seçici membran veya basınç ilişkisi içermez",
          "Bütün kişilere tek değişmez süre ve sonuç garantisi verir",
          "Yalnız mesaneye yeni alyuvar doldurmaktır",
        ],
        "Desteklenen işlev ile tüm organı ayır.",
        "Difüzyon ve ultrafiltrasyon farklı katkılarla madde ve sıvı dengesine destek olur. Endokrin ve metabolik böbrek işlevlerinin tamamıyla eşit bir organ kopyası değildir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 111–113 ve 120–121; OGM Dersler Cepte Üriner ve Üreme PDF 10–11 gerçek öğretim ve böbrek kesitleriyle karşılaştırılmış özgün içerik. Sayısal engel modeli kısa süreli sabit üretim varsayar; resmî sınav sorusu veya klinik tahmin değildir.",
  },
  {
    id: "nefron-isleyisi",
    topic: "detail-320",
    title: "Nefronun işleyişi: süzülme, geri emilim ve salgılama",
    minutes: 48,
    objectives: [
      "Nefronun damar ve tüp yollarını ayrı izleyerek üç temel işlemi açıkla.",
      "Süzülen yük, taşıma kapasitesi ve atılan miktarı birimleriyle hesapla.",
      "Henle kollarının geçirgenliğini medulla gradyanı ve ADH hedefiyle ilişkilendir.",
      "Kan basıncı, elektrolit ve asit-baz düzeninde koşulları koruyarak çıkarım yap.",
    ],
    sections: [
      {
        title: "Nefron iki komşu yolun çalışma birimidir",
        paragraphs: [
          "Bir nefronun başlangıcında glomerulus kılcal yumağı ile onu çevreleyen Bowman kapsülü bulunur. Bowman aralığındaki sıvı proksimal tüpe, Henle kulpuna ve distal tüpe ilerler; sonra toplama sistemine katılır. Kan ise afferent arteriyolden glomerulusa, efferent arteriyole ve tüplere komşu kılcal ağlara geçer.",
          "Efferent arteriyol Bowman kapsülünün idrar boşluğundan çıkan boru değildir. Damar duvarı, doku aralığı ve tüp epiteli birbirinden ayrıdır; bir madde geri emilirken bu sınırlar üzerinden kana döner. Kortikal ve jukstamedüller nefronların kulp uzunlukları ve damar ilişkileri farklı olabilir.",
        ],
      },
      {
        title: "Seçici filtrasyon bariyerini katman katman gör",
        paragraphs: [
          "Glomerulus endotelinin pencereleri, glomerüler bazal membran ve podosit ayakları arasındaki yarık düzeni filtrasyon bariyerine katkı verir. Boyut, yük ve plazma proteinine bağlanma gibi özellikler geçişi etkiler. Normalde kan hücreleri ve büyük proteinlerin çoğu damar içinde kalır.",
          "Süzüntü tümüyle proteinsiz saf su veya plazmanın hücreleriyle eksiksiz kopyası değildir. Serbest küçük moleküller ve su geçebilir; proteinlere bağlı bir maddenin serbest kısmı ayrıca önemlidir. Örneğin serbest glikoz ile büyük lipoprotein kompleksinin davranışını yalnız ikisinde de karbon var diye eşitleme.",
        ],
      },
      {
        title: "Filtrasyonu sağlayan net basınç",
        paragraphs: [
          "Glomerulus kılcalındaki hidrostatik basınç sıvının Bowman tarafına geçişini destekler. Bowman aralığındaki hidrostatik basınç ve kandaki proteinlerin onkotik etkisi karşı yönde katkı verir. Uygun fark ve geçirgenlik birlikte oluşan filtrasyon miktarını belirler.",
          "Bu, yalnız derişim farkına bağlı basit difüzyon değildir; basınçla gerçekleşen toplu sıvı geçişidir. Böbrek içi arteriyol tonusu ve otoregülasyon filtrasyonu etkiler. Sistemik basınçtaki her artışın aynı oranda GFR artışı veya her adrenalin yanıtının kesin daha çok idrar vermesi zorunlu değildir.",
        ],
      },
      {
        title: "Geri emilimle gerekenler kana döner",
        paragraphs: [
          "Geri emilim tüp lümeninden epitel ve doku aralığı üzerinden kana doğru taşınmadır. Proksimal tüpte süzülen su ve tuzların önemli kısmı, uygun koşullarda glikoz ve amino asitler geri alınır. Bazı geçişler taşıyıcı, bazıları kanal, difüzyon veya osmoz ilişkileriyle gerçekleşir.",
          "Na⁺ gradyanını sürdürmede bazolateral Na⁺/K⁺ pompası önemlidir. Glikozun apikal Na⁺ ile ortak taşınması ikincil aktif, bazolateral çıkışı GLUT aracılı kolaylaştırılmış taşınma örneğidir. Her yüzeydeki her glikoz hareketinin doğrudan ATP parçalayan aynı pompa olduğu söylenmez.",
        ],
      },
      {
        title: "Salgılama süzülmeyen katkıyı da ekler",
        paragraphs: [
          "Tübüler salgılama kan ve doku tarafındaki maddenin tüp lümenine verilmesidir. H⁺, K⁺, bazı ilaç ve organik maddeler için farklı bölge ve taşıyıcı süreçleri bulunur. Böylece son idrar yalnız başlangıçta süzülen sıvının kalan parçası değildir.",
          "Bütün salgılanan maddeler doğrudan ATP kullanan tek pompayla geçmez. Bazı iyonlar kanallardan, NH₃ gibi maddeler uygun koşullarda difüzyonla hareket edebilir. Bir soruda salgılama sıfır verilmişse eklemeyiz; miktar verilmişse atılan yük bilançosuna artı işaretiyle katılır.",
        ],
      },
      {
        title: "Atılan miktar için üç işlem bilançosu",
        paragraphs: [
          "Aynı madde ve aynı zaman aralığı için atılan miktar=süzülen+salgılanan−geri emilen biçimindedir. Örneğin 100 mg/dakika süzülme, 20 salgılama ve 90 geri emilim varsa 30 mg/dakika atılır. Madde yaratılması veya kaybolması yerine yollar arasında taşınma izlenir.",
          "Tüp sıvısının derişimi miktar/hacimdir; suyun geri alınması kalan maddenin derişimini artırabilir. Derişim artışı tek başına daha çok madde üretildiğinin kanıtı değildir. Bilanço kurarken mg ile mg/dakika, mL ile L ve farklı zaman aralıklarını dönüştürmeden toplama.",
        ],
      },
      {
        title: "Süzülen yük ve taşıma maksimumu",
        paragraphs: [
          "Serbestçe süzülen madde için basit yük bağıntısı plazma derişimi×GFR biçimindedir. Derişim mg/mL ve GFR mL/dakika ise sonuç mg/dakikadır. Tüp taşıyıcıları belirli koşullarda sınırlı toplam kapasiteye ulaşabilir; bu kapasite Tm olarak gösterilir.",
          "Oyuncak glikoz modelinde salgılama sıfır, geri emilim min(süzülen yük, Tm) kabul edilir. Tm aşılınca geri emilim durmaz; kapasitede sürerken fazlası atılır. Gerçek eşik geçişi nefronlar arasındaki çeşitlilikle keskin köşeden daha yayvan olabilir; model bu ayrıntıyı basitleştirir.",
        ],
      },
      {
        title: "İnen ve çıkan Henle kolları",
        paragraphs: [
          "İnen ince kol suya yüksek geçirgenlik gösterir; medulladaki ozmotik ortam suyun çıkışını destekleyebilir. Tüp sıvısı bu bölümde su kaybettikçe yoğunlaşabilir. Suyun yönünü yalnız borunun sayfada aşağı çizilmesi değil, geçirgenlik ve çevrenin ozmotik koşulu belirler.",
          "Çıkan kol suya düşük geçirgenlik gösterir; NaCl geri alınır ve tüp sıvısı seyrelebilir. İnce çıkan bölümde uygun pasif, kalın çıkan bölümde NKCC2 gibi taşıyıcılarla aktif süreç katkısı vardır. Kolları aynı anda her maddeye aynı geçirgen iki düz boru saymak karşı akım etkisini siler.",
        ],
      },
      {
        title: "Medulla gradyanı ve vasa recta",
        paragraphs: [
          "Uzun Henle kulpları karşı akım çoğaltıcı düzenin kurulmasına, medullanın yüksek ozmotik ortamına ve idrarın yoğunlaştırılabilmesine katkı verir. Üre geri dolaşımı da bazı medulla bölgelerinde önemlidir; bütün gradyan yalnız tek iyonun tek geçişi değildir.",
          "Vasa recta damarlarının karşı akım değişimi gradyanın hızla yıkanmasını sınırlar. Bu damarlar uzun kulplarla ilişkili özel düzendir; tüp çevresindeki bütün kılcalların her yerde aynı ters yön geometrisinde olduğu söylenmez. Tüp akışı ile damar akışını iki ayrı ok dizisi olarak çiz.",
        ],
      },
      {
        title: "Distal bölgeyi erken ve geç olarak ayır",
        paragraphs: [
          "Erken distal tüp suya düşük geçirgen bir seyreltici bölge olarak düşünülebilir. Daha geç distal ve toplama bölgelerinde iyon taşınması ve hormonla ayarlanan su geçirgenliği son sıvıyı değiştirir. Toplama kanalı birden çok nefronun çıktısının birleştiği yoldur.",
          "ADH’nin su geçirgenliğini artırdığı hedefi bütün distal tüpün ve Henle’nin her bölgesine yayma. Aldosteron geç bölgelerde Na⁺ geri emilimini ve koşullu K⁺ salgılanmasını destekler. İki hormon farklı hedef/taşıma yollarını etkiler; biri diğerinin yalnız farklı adı değildir.",
        ],
      },
      {
        title: "ADH: sentez, salınma ve hedef",
        paragraphs: [
          "ADH hipotalamustaki nöronlarda sentezlenir ve arka hipofizden kana salınır. Kan ozmolaritesinin artışı veya uygun hacim-basınç girdileri salınmayı etkileyebilir. ADH, geç distal/toplama bölgelerindeki uygun hücrelerde aquaporinlerin apikal zara katılmasını artırarak su geçirgenliğini yükseltir.",
          "Su, medulladaki ozmotik koşullar uygunsa geri alınabilir; yalnız hormon var diye her koşulda aynı sabit litre geri emilmez. ADH azlığında daha seyreltik idrar oluşabilir; son idrarın her zaman kandan daha yoğun olduğu söylenmez. Hormon kaynağı, hedef geçirgenliği ve sonuç miktarını ayrı bağla.",
        ],
      },
      {
        title: "RAAS, aldosteron ve PTH",
        paragraphs: [
          "Uygun böbrek perfüzyonu ve tuz girdileri jukstaglomerüler renin salınmasını etkileyebilir. Renin–anjiyotensin–aldosteron düzeni damar, tuz, susama ve hacim denetiminde birlikte işler. Aldosteronun Na⁺ tutulmasına katkısı su dengesini de dolaylı etkiler; suyu her yerde tek başına pompalayan bir molekül değildir.",
          "PTH böbrekte Ca²⁺ geri emilimini ve fosfat işlenmesini etkiler; etkin D vitamini oluşumuna katkısı da vardır. Bu görevleri yalnız tek vitamin tepkimesine indirgenmez. Farklı iyonların aynı hormon altında aynı yönde kesin değiştiğini varsaymak yerine, madde ve bölgeyi belirt.",
        ],
      },
      {
        title: "Asit-baz dengesi ve su yüzdesi",
        paragraphs: [
          "Böbrek H⁺ salgılanması ve bikarbonatın geri kazanılması/yenilenmesine katkı vererek asit-baz dengesini destekler. Solunumun CO₂ uzaklaştırılmasıyla pH üzerindeki katkısı farklı zaman ve yol ilişkisine sahiptir. Kan pH’sı süreçlerin ortak sonucu olduğundan tek bir iyon geçişi bütün sistemi açıklamaz.",
          "Verilen örnekte 180 L/gün süzüntüden 2 L idrar kalırsa net su geri kazanımı 178 L ve 178/180×100≈%98,9’dur. Bu, taşıyıcıdan tek geçişin yüzdesi değil başlangıç süzüntüsüne göre net hacim hesabıdır. 180 L ile 2 L’nin aynı gün aralığına ait olması gerekir.",
        ],
      },
      {
        title: "Etkileşimde iki bağımsız soruyu ayır",
        paragraphs: [
          "Modelin bölge seçimi, temel su geçirgenliğini ve ADH’ye yanıtı gösterir. Proksimal ve inen kolda su yolu açık; çıkan ve erken distal bölgede düşük; geç distal/toplama seçeneğinde ADH koşuluyla açılır. Bu çizim tek bir maddenin tüm gerçek nefron boyunca ayrıntılı derişim grafiği değildir.",
          "Yanındaki yük paneli ise bütün basitleştirilmiş glikoz geri emilim kapasitesini hesaplar. Bölge seçmek Tm’yi tek o bölgenin sayısal ölçümüne dönüştürmez. GFR, derişim ve kapasite değiştirildiğinde süzülen yük, geri alınan ve atılan miktar ayrı sonuçlar olarak okunur.",
        ],
      },
      {
        title: "Tampon tepkimesini ve amonyumu birlikte izle",
        paragraphs: [
          "Temel tersinir denge CO₂+H₂O ⇌ H₂CO₃ ⇌ H⁺+HCO₃⁻ biçiminde yazılır. Aynı diğer koşullarda CO₂ artışı H⁺ yönünü destekleyip pH düşüşüne katkı verebilir; ventilasyon CO₂’yi, böbrek H⁺ ve bikarbonat işlenmesini etkiler. Arteriyel kan için yaklaşık pH 7,35–7,45 ders referansıdır. Bu aralığın altındaki pH asidemi, yükselmesi alkalemi diye adlandırılır; asidoz/alkaloz ise bu yönde etki yapan süreçlerdir.",
          "Proksimal tüp hücrelerinde glutamin işlenmesi NH₄⁺ atılımı ve yeni bikarbonat kazanımına katkı verir. Tüp ortamında NH₃ ile H⁺ birleşerek NH₄⁺ oluşturabilir; böylece asidin idrarla uzaklaştırılması tamponlanmış biçimde desteklenir. NH₃’ün difüzyonu ve NH₄⁺ taşıyıcı yolları aynı tek ATP pompası değildir. Bu kimyasal mekanizma, bütün idrar pH’sının da kanın dar aralığında olması gerektiği anlamına gelmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Üç işlemle atılan yük",
        prompt:
          "Aynı madde için süzülme 100, salgılama 20, geri emilim 90 mg/dakika. Atılan yük?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Tüpe giriş katkıları 100+20=120 mg/dakika.",
          },
          {
            label: "2. adım",
            explanation: "Geri emilen 90 çıkarılır: 120−90=30.",
          },
          {
            label: "3. adım",
            explanation:
              "Sonuç 30 mg/dakikadır; derişim değildir, idrar hacmi verilmeden mg/mL bulunmaz.",
          },
        ],
        answer: "30 mg/dakika.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Salgılamayı tüpten kana geri emilim sanıp eksi yazmak.",
      },
      {
        title: "Kapasite altında glikoz",
        prompt:
          "Glikoz derişimi 2 mg/mL; GFR 100 mL/dakika; model Tm 300 mg/dakika, salgılama 0. Süzülen, geri alınan ve atılan?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Süzülen yük 2×100=200 mg/dakika.",
          },
          {
            label: "2. adım",
            explanation: "Geri emilim min(200,300)=200 mg/dakika.",
          },
          {
            label: "3. adım",
            explanation: "Atılan 200−200=0; bu koşul kapasite altındadır.",
          },
        ],
        answer: "200 süzülen, 200 geri alınan, 0 atılan mg/dakika.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Kapasitenin tamamını zorunlu gerçekleşmiş geri emilim saymak.",
      },
      {
        title: "Kapasite aşıldığında geri emilim sürer",
        prompt:
          "Glikoz 4 mg/mL; GFR 100 mL/dakika; Tm 300 mg/dakika, salgılama yok. Üç yük?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Süzülen 4×100=400 mg/dakika.",
          },
          {
            label: "2. adım",
            explanation: "Geri alınan min(400,300)=300 mg/dakika; durmamıştır.",
          },
          {
            label: "3. adım",
            explanation: "Atılan 400−300=100 mg/dakika.",
          },
        ],
        answer: "400 süzülen, 300 geri alınan, 100 atılan mg/dakika.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Eşik aşılınca bütün geri emilimin sıfırlandığını sanmak.",
      },
      {
        title: "Bir günlük su bilançosu",
        prompt:
          "Bir günde 180 L süzüntü ve 2 L son idrar var; net su salgılanması yok kabul edilsin. Geri kazanım miktarı ve yüzdesi?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "180−2=178 L net geri kazanılır.",
          },
          {
            label: "2. adım",
            explanation: "Başlangıç süzüntüsüne göre 178/180×100≈98,89.",
          },
          {
            label: "3. adım",
            explanation: "Yaklaşık %98,9; aynı gün ve litre birimi korunur.",
          },
        ],
        answer: "178 L ve yaklaşık %98,9.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "2 L son hacmi doğrudan yüzde 2 kayıp saymak.",
      },
    ],
    recall: [
      {
        prompt: "Üç işlem bilançosu?",
        answer:
          "Atılan=süzülen+salgılanan−geri emilen; aynı madde ve zaman birimiyle.",
      },
      {
        prompt: "Tm aşılınca ne olur?",
        answer:
          "Basit modelde geri emilim kapasitede sürer; fazlası atılır, geri emilim bütünüyle durmaz.",
      },
      {
        prompt: "Henle kollarının su farkı?",
        answer:
          "İnen kol geçirgen; çıkan kol düşük su geçirgenliğinde, tuz geri alımı önemlidir.",
      },
      {
        prompt: "ADH nerede yapılır, nereden salınır?",
        answer:
          "Hipotalamusta sentezlenir, arka hipofizden salınır; uygun geç distal/toplama hücrelerinde su geçirgenliğini artırır.",
      },
    ],
    items: [
      [
        "Aynı madde için süzülme 100, salgılama 20, geri emilim 90 mg/dakika. Atılan yük kaçtır?",
        "30 mg/dakika",
        ["10 mg/dakika", "210 mg/dakika", "70 mg/dakika", "−10 mg/dakika"],
        "İki tüpe girişten geri emilimi çıkar.",
        "Atılan=100+20−90=30 mg/dakika. Salgılama tüp lümenine ekleme, geri emilim kana dönüş yönüdür; idrar derişimi ayrıca hacim gerektirir.",
      ],
      [
        "Serbestçe süzülen glikoz 2 mg/mL, GFR 100 mL/dakika. Süzülen yük kaç mg/dakikadır?",
        "200",
        ["2", "50", "100", "0,02"],
        "mg/mL ile mL/dakika çarpılınca mL sadeleşir.",
        "Süzülen yük=2×100=200 mg/dakika. Bu yük plazma derişiminin kendisi veya son idrar hacmi değildir.",
      ],
      [
        "Basit glikoz modelinde süzülen yük 400 mg/dakika, Tm 300 mg/dakika ve salgılama yok. Doğru geri emilim ve atılım?",
        "300 geri emilim; 100 atılım mg/dakika",
        [
          "0 geri emilim; 400 atılım",
          "400 geri emilim; 300 atılım",
          "100 geri emilim; 0 atılım",
          "700 geri emilim; −300 atılım",
        ],
        "Kapasite aşılması geri emilimin durması değildir.",
        "Geri alınan min(400,300)=300; atılan 400−300=100 mg/dakikadır. Taşıyıcılar kapasiteyle çalışmayı sürdürür, yükün fazlası kalır.",
      ],
      [
        "ADH’nin sentez, salınma ve hedefi için uygun eşleştirme hangisidir?",
        "Hipotalamus → arka hipofizden salınma → uygun geç distal/toplama su geçirgenliği",
        [
          "Mesane → üreterden salınma → yalnız alveol",
          "Arka hipofizde bütün hormonların sentezi → bütün Henle kolları aynı hedef",
          "Safra kesesi → pankreas enzimi → yalnız kıkırdak",
          "Eritrosit → çekirdekten salınma → bütün idrarın yok olması",
        ],
        "Sentez yeriyle kana salınma yerini ayır.",
        "ADH hipotalamik nöronlarda sentezlenir, arka hipofizden salınır. Uygun geç distal/toplama hücrelerinde aquaporin düzeniyle su geçirgenliğini etkiler; bütün tüplere tek etki değildir.",
      ],
      [
        "Henle kollarının temel karşılaştırması hangisidir?",
        "İnen kol suya geçirgen; çıkan kol suya düşük geçirgen, tuz geri alımı önemlidir",
        [
          "İki kol her maddeye her zaman aynı geçirgendir",
          "Çıkan kolda hiç tuz taşınamaz",
          "İnen kol su geçirmez ama bütün proteinleri pompalar",
          "Su yalnız boru sayfada aşağı çizildiği için çıkar",
        ],
        "Bölge geçirgenliğini çevrenin ozmotik koşuluyla bağla.",
        "İnen kol su çıkışına, çıkan kol tuzun geri alınmasına farklı katkı verir. Bu karşıt özellikler medulla gradyanıyla ilişkilidir; su hareketinin nedeni yalnız geometrik aşağı yön değildir.",
      ],
      [
        "180 L/gün süzüntüden 2 L/gün son idrar kalıyor; net su salgılanması yok. Net geri kazanılan hacim ve yaklaşık oran?",
        "178 L/gün ve %98,9",
        [
          "178 L/gün ve %98",
          "2 L/gün ve %2",
          "182 L/gün ve %101,1",
          "90 L/gün ve %50",
        ],
        "Miktarı çıkar, sonra başlangıca böl.",
        "180−2=178 L/gün;178/180×100≈98,89 olduğundan yaklaşık %98,9’dur. 2 L’yi yüzde 2 sanmak başlangıç paydasını gözden kaçırır.",
      ],
      [
        "Nefronda efferent arteriyolün doğru ilişkisi hangisidir?",
        "Glomerulus kılcallarından çıkan kanı sonraki damar ağına götürür",
        [
          "Bowman idrar boşluğundan üretraya açık tüptür",
          "Alveol içindeki hava yoludur",
          "Sadece mesanenin son açıklığıdır",
          "Bütün glikozu safra kesesine üreten bezdir",
        ],
        "Damar yolunu tüp lümeninden ayrı çiz.",
        "Afferent arteriyol glomerulusa getirir, efferent arteriyol damar yumağından çıkar. Süzüntünün Bowman aralığından proksimal tüpe ilerlemesi ayrı yoldur.",
      ],
      [
        "Proksimal tüpte Na⁺ ile glikozun apikal ortak taşınması için doğru açıklama hangisidir?",
        "Na⁺ gradyanından yararlanan ikincil aktif taşımadır",
        [
          "Her glikoz taşıyıcısı doğrudan aynı ATP’yi parçalar",
          "Yalnız bütün plazmanın açık boruya dökülmesidir",
          "Na⁺/K⁺ pompasıyla hiçbir enerji ilişkisi yoktur",
          "Glikozun kıkırdağa dönüşmesidir",
        ],
        "Gradyanı kuran pompa ile kullanan taşıyıcıyı ayır.",
        "Bazolateral Na⁺/K⁺ pompası gradyanı destekler; apikal Na⁺–glikoz ortak taşıması bu gradyanı kullanır. Bazolateral GLUT çıkışı da farklı bir taşıma basamağıdır.",
      ],
      [
        "İdrarda bir maddenin derişimi artmış, toplam atılan miktarı aynı kalmış. Hangi koşul bunu açıklayabilir?",
        "Aynı madde miktarının daha az su hacminde bulunması",
        [
          "Maddenin zorunlu yeni bir elemente dönüşmesi",
          "Toplam miktarın kesin iki kat olması",
          "Her durumda su hacminin de iki kat artması",
          "Derişimin miktar ve hacimle hiçbir ilişkisinin olmaması",
        ],
        "Derişim=miktar/hacim ilişkisini kullan.",
        "Aynı miktar daha küçük hacme bölünürse derişim artar. Yalnız derişim artışı yeni madde üretildiğini veya daha çok toplam atılım olduğunu kanıtlamaz.",
      ],
      [
        "Glomerüler filtrasyon için doğru temel açıklama hangisidir?",
        "Seçici bariyerden net basınç ilişkileriyle toplu sıvı geçişidir",
        [
          "Yalnız basit derişim difüzyonu, basınç hiçbir rol oynamaz",
          "Bütün kan hücrelerinin normalde Bowman’a dökülmesidir",
          "Her protein ve lipoprotein aynı serbestlikle geçer",
          "Sistemik basınç artınca GFR her koşulda aynı oranda artar",
        ],
        "İtici basınçla seçici bariyeri birlikte düşün.",
        "Hidrostatik ve onkotik katkılar, bariyer ve damar düzeni filtrasyonu etkiler. Otoregülasyon nedeniyle basit her basınç artışı aynı GFR artışı genellemesi kurulmaz.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 113–119; OGM Dersler Cepte Üriner ve Üreme PDF 10–13 ve Üriner Sistem II PDF 6 gerçek nefron/karşı akım şekilleriyle karşılaştırılmış özgün öğretim. Tm bağıntısı keskin kapasiteli oyuncak modeldir; resmî sınav sorusu değildir.",
  },
  {
    id: "erkek-ureme-organlari",
    topic: "detail-321",
    title: "Erkek üreme sistemi: üretim, olgunlaşma, kanallar ve hormonlar",
    minutes: 48,
    objectives: [
      "Gonadın gamet ve endokrin görevini, kanallar ve yardımcı bezlerden ayır.",
      "Spermatogenezde hücre, kromozom ve DNA miktarını evreye göre hesapla.",
      "Spermiogenez, epididimal olgunlaşma ve kapasitasyonu ayrı yer ve süreçlerle açıkla.",
      "GnRH–LH/FSH–Leydig/Sertoli devresini negatif geri bildirimle izle.",
    ],
    sections: [
      {
        title: "Üreme sistemi türün devamında nasıl çalışır?",
        paragraphs: [
          "İnsanda eşeyli üreme mayozla oluşan gametler ve döllenmenin birleşmesine dayanır. Sperm ve yumurta birleşince zigot oluşur; gelişim sonraki bölünme ve farklılaşmalarla ilerler. Gamet oluşumu, gametin taşınması, döllenme ve embriyonik gelişim aynı olay değildir.",
          "Gonadlar gamet üretimi ve endokrin görevleri olan organlardır; testis ve yumurtalık bu gruptadır. Kanallar, yardımcı bezler ve dış genital organlar taşıma ve uygun ortam sağlama gibi katkılar verir. Tür düzeyindeki üreme özelliği, her bireyin üremesinin canlı olmanın zorunlu koşulu olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Testis ve skrotumun yeri",
        paragraphs: [
          "Testisler skrotum içinde bulunur; gelişim sırasında karın bölgesinden inişleri ve skrotal ısı düzeni önemlidir. Spermatogeneze uygun testis sıcaklığı temel olarak gövde içinden biraz düşüktür. Kan damarları ve kas düzeni bu ortamın korunmasına katkı sağlar.",
          "Kaynakta yaklaşık 2 °C fark öğretim örneği olarak verilir; bütün kişilerde her anda değişmez sayı değildir. Sıcaklık koşulu gamet yapımını etkilerken testisin hormon görevi ayrı olarak izlenir. Organın dışarıda konumlanması, kanla hiçbir bağlantısı olmadığı veya hiç oksijen kullanmadığı anlamına gelmez.",
        ],
      },
      {
        title: "Seminifer tüpçükte hücrelerin düzeni",
        paragraphs: [
          "Testis içindeki kıvrımlı seminifer tüpçüklerde spermatogenik hücreler ve Sertoli hücreleri bulunur. Gelişen hücreler genel olarak bazal kısımdan lümene doğru farklılaşır; farklı evrelerdeki hücrelerin birlikte görülmesi üretimin zaman içinde sürmesine yardım eder.",
          "Sertoli hücreleri destek ve beslenme, artık sitoplazmanın uzaklaştırılması ve düzenleyici salgılar gibi işlevlere katılır. Aralarındaki bağlantılar kan-testis bariyerinin önemli bölümüdür. Tüpçükler arasındaki bağ dokuda bulunan Leydig hücreleri ise steroid hormon üretimiyle farklı görev taşır.",
        ],
      },
      {
        title: "Spermatogonyumdan birincil spermatosite",
        paragraphs: [
          "Diploit spermatogonyumlar mitozla hücre soyunu sürdürebilir; bir kısmı mayoz yoluna girecek şekilde farklılaşır. DNA eşlenmesinden sonra birincil spermatosit 2n kromozom ve 4C DNA taşır. İnsanın standart hesap modelinde 2n=46, n=23 alınır.",
          "Kromozom sayısı sentromer temelli sayılır; eşlenmiş her kromozom iki kardeş kromatit taşır. DNA eşlenmesi kromozom sayısını zorunlu 92’ye çıkarmaz. C bir haploit eşlenmemiş genomun DNA miktarıdır; n ile C farklı soruların ölçüsüdür.",
        ],
      },
      {
        title: "Mayoz I ve II sonunda dört hücre",
        paragraphs: [
          "Mayoz I homolog kromozomları ayırır; bir birincil spermatositten iki ikincil spermatosit oluşur. Her biri n kromozom ve 2C DNA taşır. Kardeş kromatitlerin henüz birlikte bulunması, bu hücrenin hâlâ iki homolog takım taşıdığı anlamına gelmez.",
          "Mayoz II kardeş kromatitleri ayırır; iki ikincilden dört spermatit oluşur. Her spermatit n kromozom ve 1C DNA taşır. Kayıp olmadığı verilen modelde bir başlangıcın toplam 4C DNA’sı dört hücrede korunur; bölünmeler arasında yeni DNA eşlenmesi yapılmaz.",
        ],
      },
      {
        title: "Spermiogenez seminifer tüpçükte olur",
        paragraphs: [
          "Spermatitlerin yeni bölünme olmadan baş, orta bölüm ve kuyruk düzenine farklılaşması spermiogenezdir. Çekirdek yoğunlaşır, Golgi kökenli akrozom şekillenir, fazla sitoplazma uzaklaştırılır ve hareket aparatının yapıları gelişir. Bu süreç seminifer tüpçüklerde gerçekleşir.",
          "Spermatitler epididimise gidip orada ilk kez sperm şekline dönüşür diye yer değiştirme yapma. Farklılaşmış sperm epididimiste sonraki işlevsel olgunlaşma sürecine katılır. Hücre biçimi çok değişse de farklılaşma yeni bir mayoz değildir; n ve 1C temel miktarları korunur.",
        ],
      },
      {
        title: "Spermin baş, orta bölüm ve kuyruğu",
        paragraphs: [
          "Başta haploit çekirdek ve akrozom bulunur. Akrozomun enzimleri yumurtanın çevresindeki örtülerle etkileşim ve geçiş süreçlerine katkı sağlar. Sperm ve yumurta hücre zarlarının kaynaşması ayrı bir basamaktır; akrozomun her zarı eritip tek başına bütün döllenmeyi bitirdiği düşünülmez.",
          "Orta bölümdeki mitokondriler enerji üretimine, mikrotübüllü kuyruk hareketin gerçekleşmesine katkı verir. ATP’nin tümü her koşulda yalnız orta bölümde oksijenli yolla üretilir denemez; spermde glikoliz de önemlidir. Yapı, enerji kaynağı ve hareketin mekanik aparatı farklı düzeylerdir.",
        ],
      },
      {
        title: "Epididimal olgunlaşma ve sonraki kapasitasyon",
        paragraphs: [
          "Testisten çıkan sperm kanallarla epididimise ulaşır; burada membran ve işlev değişimleriyle olgunlaşır, hareket yeteneği kazanmasına katkı sağlanır. Epididimis kuyruğu önemli depolama bölgesidir. Bu sıra testisteki spermiogenezin devamında ama onunla aynı yer ve süreç değildir.",
          "Tam döllenme yeterliliği için kapasitasyon denilen sonraki değişimler normalde dişi üreme yolu ortamında veya uygun laboratuvar koşullarında gerçekleşir. Epididimal olgunlaşma ve kapasitasyonu tek aşama sayma. Vas deferens taşıma ve geçici bulunma yeri olsa da temel ana depoyu yalnız bu kanala yerleştirmek eksiktir.",
        ],
      },
      {
        title: "Taşıma yolunu birleşme noktasından izle",
        paragraphs: [
          "Sperm epididimisten kaslı vas deferense geçer; kanal mesane çevresinden ilerleyip seminal kese kanalıyla birleşerek ejakülasyon kanalına katılır. Ejakülasyon kanalı üretraya açılır; penis içindeki üretra dışarı çıkışın son yoludur. Kanal duvarının kasılmaları taşımaya katkı verir.",
          "Bu rota testis → epididimis → vas deferens → ejakülasyon kanalı → üretra biçiminde temel sıradır. Mesane yakınından geçmek sperm yolunun normalde mesane lümeninden geçtiği anlamına gelmez. Sperm hücresi ve kanla taşınan testosteron aynı boru içinde aynı hedefe yönlendirilmez.",
        ],
      },
      {
        title: "Yardımcı bezler ve semen",
        paragraphs: [
          "Seminal keseler, prostat ve bulboüretral bezler farklı salgılarla semen ortamına katkı verir. Seminal kese salgısı fruktoz gibi enerji kaynakları ve taşıma ortamı sağlar; prostat salgısında çeşitli enzim ve bileşenler bulunur. Bulboüretral mukus kayganlaştırma ve üretra ortamına katkı verir.",
          "Semen sperm hücreleri ile yardımcı salgıların birleştiği sıvıdır; yalnız bez sıvısının veya yalnız sperm hücresinin adı değildir. Asit-baz desteği toplam bileşimin sonucudur. Bütün bezlerin salgısı tek tek zorunlu aynı pH ve aynı madde bileşiminde değildir; görevleri ortaklaştırırken farklılıkları koru.",
        ],
      },
      {
        title: "Penis, erektil doku ve koordinasyon",
        paragraphs: [
          "Peniste damarlarca zengin erektil doku kolonları bulunur; kan dolumu ve damar-kas düzeni sertleşmenin mekanik temelindedir. Üretra bu yapıların içindeki ayrı lümendir. Erektil dokuya kanın dolmasıyla üretradan sperm geçişi aynı sıvı yolu değildir.",
          "Ejakülasyon kanalların ve bezlerin koordineli etkinliğini içerir. Mesane boynu ve sfinkterlerin sinirsel denetimi idrar ile semen akışlarının düzenlenmesine katkı verir; prostat tek başına bütün kontrolü yapan bir vana değildir. Dış deri ve baş bölgesindeki deri kıvrımı anatomik örtülerdir; gamet sentezleyen bez sayılmaz.",
        ],
      },
      {
        title: "GnRH iki ön hipofiz kolunu başlatır",
        paragraphs: [
          "Hipotalamik GnRH uygun salınım düzeniyle ön hipofizin gonadotropinlerini etkiler. LH testiste Leydig hücrelerini ve testosteron üretimini uyarır. FSH Sertoli hücreleri üzerinden spermatogenez desteğine katılır; Sertoli’nin yerel bağlayıcı ve besleyici katkıları bu ortamın parçasıdır.",
          "Testosteron testis içi gamet yapımının sürdürülmesine ve çeşitli dokulardaki büyüme, kemik, kas ve ses gibi gelişim süreçlerine katkı verir. Hormonlar hedef hücre ve reseptör üzerinden etki eder. Tek hormon düzeyi bir kişinin kimliğini, yönelimini veya bütün davranışlarını belirleyen kesin etiket değildir.",
        ],
      },
      {
        title: "İki negatif geri bildirimi ayır",
        paragraphs: [
          "Artan testosteron hipotalamus ve hipofiz düzeyinde GnRH/gonadotropin uyarısını sınırlayan geri bildirime katkı verir. Sertoli hücrelerinden inhibin ise özellikle ön hipofiz FSH kolunu azaltır. Üretim ile üst merkezden gelen uyarı böylece denetim döngüsü kurar.",
          "İnhibini LH’nin kesin her koşulda aynı miktarını azaltan hormon diye genelleme yapma. Döngüler pulslar ve zamanla değişir; bir çizimde artı/eksi işareti anlık bütün hücrelerin kesin durması anlamına gelmez. Önce hormon kaynağı, sonra hedefi, en son geri bildirim okunun yönünü izle.",
        ],
      },
      {
        title: "Seçici kanal ve hücre sayısı modeli",
        paragraphs: [
          "Modelde birincil spermatosit sayısı 1–4 seçilir ve bütün hücrelerin kayıpsız ilgili evreye ulaştığı kabul edilir. Birincil başına 1/2/4/4 hücre; hücre başına 4/2/1/1C DNA sırası kullanılır. Toplam DNA miktarı evreler arasında korunur, hücre sayısının artması yeni DNA eşlenmesi sanılmaz.",
          "Vas deferens seçici engeli yalnız sperm teslim yolunu kapatır; modelde kanla hormon çıkışı korunur. Bu, gerçek bütün cerrahilerin veya hastalıkların kişisel sonucunu garanti etmez. Sayısal mayoz modeli, taşıma rotası ve hormon hedefi aynı ekranda ayrı katmanlar olarak karşılaştırılır.",
        ],
      },
    ],
    examples: [
      {
        title: "Üç başlangıçtan dört kat hücre",
        prompt:
          "Üç birincil spermatosit, kayıp ve yeni DNA eşlenmesi olmadan iki mayozu tamamlıyor. İkincil ve spermatit sayıları?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Her birincilden iki ikincil:3×2=6.",
          },
          {
            label: "2. adım",
            explanation: "Her birincilden dört spermatit:3×4=12.",
          },
          {
            label: "3. adım",
            explanation:
              "İkincil hücre başına n/2C, spermatit başına n/1C bulunur.",
          },
        ],
        answer: "6 ikincil ve 12 spermatit.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Mayoz II öncesi yeni bir DNA eşlenmesi eklemek.",
      },
      {
        title: "Kromozom sayısı ve DNA birlikte",
        prompt:
          "İnsanda eşlenmiş birincil spermatosit 46 kromozom/4C. Mayoz I ve II sonrasında hücre başına değerler?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Mayoz I homologları ayırır:23 kromozom ve 2C.",
          },
          {
            label: "2. adım",
            explanation: "Mayoz II kardeşleri ayırır:23 kromozom ve 1C.",
          },
          {
            label: "3. adım",
            explanation:
              "Başlangıç 4C, iki ikincilde toplam 4C, dört spermatitte toplam 4C; kayıp yok varsayımı korunur.",
          },
        ],
        answer: "İkincil 23/2C; spermatit 23/1C.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Haploit sözcüğünü DNA’nın her zaman 1C olması sanmak.",
      },
      {
        title: "Farklılaşma yeni bölünme mi?",
        prompt:
          "12 spermatit hücresi kayıpsız spermiogenezi tamamlıyor; her biri 23 kromozom ve 1C. Son hücre/DNA miktarı?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Spermiogenez yeni hücre bölünmesi değil farklılaşmadır.",
          },
          {
            label: "2. adım",
            explanation: "12 sperm oluşur, her biri 23 kromozom ve 1C taşır.",
          },
          {
            label: "3. adım",
            explanation:
              "Toplam 12C korunur; çekirdek yoğunlaşması DNA sayısını sıfırlamaz.",
          },
        ],
        answer: "12 sperm ve toplam 12C.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Kuyruk yapımını yeni bir mayoz diye hücreyi tekrar ikiye katlamak.",
      },
      {
        title: "İki hormon hedefini ayır",
        prompt:
          "A sinyali Leydig’de testosteronu artırıyor; B Sertoli desteğini artırıyor. A/B ve Sertoli’nin FSH’yi sınırlayan sinyali?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Leydig hedefli temel gonadotropin LH’dir.",
          },
          {
            label: "2. adım",
            explanation:
              "Sertoli hedefli kol FSH; Sertoli kaynaklı geri bildirim inhibindir.",
          },
          {
            label: "3. adım",
            explanation:
              "Hedef ve salgı kaynağını ayırınca LH–Leydig ve FSH–Sertoli eşleşir.",
          },
        ],
        answer: "A LH; B FSH; geri bildirim inhibin.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "FSH’yi Leydig’in, inhibini testis dışı tek bezin adı saymak.",
      },
    ],
    recall: [
      {
        prompt: "Spermiogenez ve epididimis farkı?",
        answer:
          "Sperm biçimine farklılaşma seminifer tüpçükte; sonraki işlevsel olgunlaşma epididimiste gerçekleşir.",
      },
      {
        prompt: "Birincil → ikincil → spermatit?",
        answer:
          "Hücre başına 2n/4C → n/2C → n/1C; bir başlangıçtan 1 →2 →4 hücre.",
      },
      {
        prompt: "LH ve FSH hedefi?",
        answer:
          "LH Leydig; FSH Sertoli. İnhibin özellikle FSH kolunu sınırlayan geri bildirimdir.",
      },
      {
        prompt: "Kanal engeli bütün hormonları durdurur mu?",
        answer:
          "Seçici taşıma modelinde hayır; sperm kanalı ve kanla hormon çıkışı ayrı yollardır.",
      },
    ],
    items: [
      [
        "Spermatitlerin baş, orta bölüm ve kuyruk düzenine farklılaşmasının temel yeri hangisidir?",
        "Testisin seminifer tüpçükleri",
        [
          "Mesane lümeni",
          "Akciğer alveolleri",
          "Yalnız böbrek pelvisi",
          "Yalnız epididimis içinde ilk kez başlayan mayoz",
        ],
        "Spermiogenezi sonraki olgunlaşmadan ayır.",
        "Spermiogenez seminifer tüpçükte gerçekleşir. Farklılaşmış sperm epididimiste işlevsel olgunlaşmaya katılır; bunlar aynı yer ve olay değildir.",
      ],
      [
        "Üç birincil spermatosit kayıpsız iki mayozu tamamlıyor. Spermatit sayısı kaçtır?",
        "12",
        ["3", "6", "9", "24"],
        "Bir başlangıçtan dört son hücre.",
        "3×4=12 spermatit oluşur. Mayoz I sonrası 6 ikincil hücre bulunur; yeni DNA eşlenmesi olmadan mayoz II ile 12’ye ulaşılır.",
      ],
      [
        "İnsanda mayoz I’i bitirmiş ikincil spermatositin hücre başına kromozom/DNA değeri hangisidir?",
        "23 kromozom ve 2C",
        [
          "46 kromozom ve 4C",
          "23 kromozom ve 4C",
          "46 kromozom ve 1C",
          "12 kromozom ve 0C",
        ],
        "Homologlar ayrılmış, kardeş kromatitler birliktedir.",
        "Mayoz I sonunda hücre haploittir ama kromozomlar eşlenmiş yapıdadır:23 kromozom ve 2C DNA. n ile C aynı nicelik değildir.",
      ],
      [
        "Her biri 23 kromozom/1C taşıyan 12 spermatit kayıpsız farklılaşıyor. Son sperm sayısı ve toplam DNA?",
        "12 sperm ve 12C",
        [
          "24 sperm ve 24C",
          "6 sperm ve 6C",
          "12 sperm ve 0C",
          "48 sperm ve 48C",
        ],
        "Farklılaşma yeni hücre bölünmesi değildir.",
        "Spermiogenezde biçim ve organeller değişir; yeni mayoz yapılmaz. Her hücre n/1C kaldığından 12 hücrede toplam 12C korunur.",
      ],
      [
        "Sperm taşıma yolu için doğru sıra hangisidir?",
        "Testis → epididimis → vas deferens → ejakülasyon kanalı → üretra",
        [
          "Testis → mesane lümeni → aort → üreter",
          "Epididimis → safra kesesi → nefron",
          "Testis → üretra → akciğer → vas deferens",
          "Prostat → yumurtalık → üreter → kalp",
        ],
        "Olgunlaşma yerinden kaslı kanala ilerle.",
        "Testis üretimi epididimal olgunlaşma izler; vas deferens seminal kese kanalıyla ejakülasyon yoluna katılır ve üretraya açılır. Mesane bu sperm lümeninin normal ara deposu değildir.",
      ],
      [
        "LH–Leydig ve FSH–Sertoli ilişkileri için doğru ifade hangisidir?",
        "LH testosteron üretimini, FSH Sertoli üzerinden gamet yapımı desteğini etkiler",
        [
          "LH yalnız mesanede idrar üretir",
          "FSH sadece Leydig’in başka adıdır",
          "Sertoli yalnız alyuvar taşıyan bir damardır",
          "Her iki hormon yalnız safra kesesinde aynı tek enzimi üretir",
        ],
        "Hormonun hedef hücresini seç.",
        "LH Leydig steroid üretimini, FSH Sertoli işlevlerini etkiler. Testosteron ve Sertoli katkıları spermatogenezi birlikte destekler; hormon kaynağı ile hedef hücre aynı şey değildir.",
      ],
      [
        "Sertoli kaynaklı inhibinin temel negatif geri bildirim hedefi hangisidir?",
        "Ön hipofizin FSH kolunu sınırlamak",
        [
          "Bütün kromozomları iki katına çıkarmak",
          "Sadece alveolde sürfaktanı sindirmek",
          "LH’yi her koşulda kesin aynı miktarda artırmak",
          "Sperm hücresini doğrudan üreye dönüştürmek",
        ],
        "Geri bildirimde kaynak ve hedef oku.",
        "İnhibin özellikle FSH salınmasının azaltılmasına katkı verir. Testosteronun hipotalamus/hipofiz geri bildirimi farklı kol olarak birlikte değerlendirilir.",
      ],
      [
        "Epididimal olgunlaşma ve kapasitasyon için doğru ayrım hangisidir?",
        "Epididimiste işlevsel olgunlaşma; sonraki kapasitasyon uygun dişi yolunda veya laboratuvar ortamında",
        [
          "Spermatogonyum ilk kez mesanede oluşur",
          "Bütün kapasitasyon yalnız vas deferens içinde zorunlu tamamlanır",
          "Kapasitasyon yeni bir mayoz III’tür",
          "Epididimis temel olarak korteksin idrar boşluğudur",
        ],
        "Üçüncü aşamayı spermiogenez ve epididimisten ayır.",
        "Sperm biçimi seminifer tüpçükte oluşur, epididimiste olgunlaşır. Kapasitasyon sonraki uygun kimyasal ortamdaki değişimdir; iki olgunlaşma ifadesini tek yer sanamayız.",
      ],
      [
        "Seçici modelde vas deferens kapalı, testis kan damarları ve hormon üretimi korunmuş. Doğru sonuç hangisidir?",
        "Bu yoldan sperm teslimi durur; kanla hormon çıkışı modelde sürebilir",
        [
          "Testosteronun bütün kan yolları zorunlu kapanır",
          "Bütün Sertoli hücreleri kesin anında yok olur",
          "Sperm üretimi model koşuluna bakmadan kesin iki kat olur",
          "Kanal kapanması tüm DNA’yı ürik aside çevirir",
        ],
        "Lümen taşımasını endokrin çıkıştan ayır.",
        "Vas deferens sperm taşıma kanalıdır; testosteron kanla taşınır. Seçici koşulda biri engellendi diye ötekinin de durduğu çıkarılamaz; kişisel cerrahi sonuç garantisi kurulmaz.",
      ],
      [
        "Semen ve yardımcı bezler için doğru açıklama hangisidir?",
        "Semen sperm hücreleriyle yardımcı salgıların birleşimidir",
        [
          "Semen yalnız tek bir spermin çekirdeğidir",
          "Bütün semen yalnız böbrek atardamarıdır",
          "Yardımcı bezlerin her biri bütün sperm mayozunu kendi içinde yapar",
          "Prostat tek başına tüm idrar/semen denetiminin değişmez vanasıdır",
        ],
        "Hücre üretimiyle sıvı katkısını ayır.",
        "Testiste üretilen hücreler seminal kese, prostat ve bulboüretral salgılarla taşıma ortamına katılır. Akışın denetimi sinirsel ve kaslı yapılarla koordinelidir; yalnız tek bez vanası değildir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 122 ve Bölüm 2 PDF 1–2; OGM Dersler Cepte Üriner ve Üreme PDF 16 ve Üreme Sistemi I PDF 17 gerçek şema ve öğretimiyle karşılaştırılmış özgün içerik. Spermiogenez, epididimal olgunlaşma ve kapasitasyon kaynak basitleştirmelerinden ayrılmıştır; sayım kayıpsız modeldir. Resmî sınav sorusu değildir.",
  },
];

export const forge019BiologyTopics: Record<string, string> = Object.fromEntries(
  data.map((d) => [d.id, d.topic]),
);
export const forge019BiologyGuides: LessonGuide[] = data.map(
  ({ items: _items, topic: _topic, title: _title, ...d }) => d,
);
function question019(
  d: Unit019,
  item: Unit019["items"][number],
  i: number,
): Question {
  const [prompt, correct, wrong, hint, explanation] = item;
  if (wrong.length !== 4) throw new Error("FIVE_CHOICES:" + d.id);
  const answer = i % 5,
    options = [...wrong];
  options.splice(answer, 0, correct);
  return {
    id: `f019-bio-${d.id}-${i + 1}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(explanation),
    skill: `f019-bio-${d.id}-${i + 1}`,
  };
}
export const forge019BiologyLessons: Lesson[] = data.map((d) => ({
  id: d.id,
  subjectId: "ayt-biyoloji",
  title: txt(d.title),
  minutes: d.minutes,
  objectives: d.objectives.map(txt),
  body: d.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join(" ")),
  })),
  questions: d.items.map((q, i) => question019(d, q, i)),
  source: txt(d.source),
  tags: ["kaynakli", "etkilesimli", "forge019"],
}));
