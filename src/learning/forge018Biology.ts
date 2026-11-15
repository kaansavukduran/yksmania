import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

const between = (x: number, a: number, b: number) =>
  Number.isFinite(x) && x >= a && x <= b;
export const intestinalCargo018 = {
  glucose: "Glikoz",
  fructose: "Fruktoz",
  amino: "Aminoasit",
  longFat: "Uzun zincir lipit ürünü",
  shortFat: "Kısa zincir yağ asidi",
  b12: "IF ile bağlı B₁₂",
} as const;
export type IntestinalCargo018 = keyof typeof intestinalCargo018;
/** Selective pathway experiment, not an absorption-rate or clinical simulator. */
export function intestine018(
  cargo: IntestinalCargo018,
  sodium: boolean,
  lacteal: boolean,
  ileum: boolean,
) {
  if (!Object.hasOwn(intestinalCargo018, cargo))
    throw new RangeError("INTESTINAL_CARGO");
  const needsSodium = cargo === "glucose",
    needsIleum = cargo === "b12",
    lymph = cargo === "longFat";
  const apical = (!needsSodium || sodium) && (!needsIleum || ileum),
    exit = apical && (!lymph || lacteal);
  return {
    cargo,
    apical,
    exit,
    lymph,
    route: lymph ? "Lenf" : "Portal kan",
    needsSodium,
    needsIleum,
    evidence: !apical
      ? needsSodium && !sodium
        ? "Verilen glikoz girişinde Na gradyanı kapalı; aynı apikal taşıma gösterilmez."
        : "IF–B₁₂ alımında terminal ileum yolu kapalı; aynı alım gösterilmez."
      : !exit
        ? "Epitelde işleme seçili fakat lakteal çıkış kapalı; şilomikronun normal lenf çıkışı gösterilmez."
        : lymph
          ? "Uzun zincir ürünler epitelde yeniden paketlenir; şilomikron lakteale, sonra venöz kana katılır."
          : cargo === "fructose"
            ? "Verilen fruktoz yolu kolaylaştırılmış apikal geçiş ve portal kan çıkışıdır; glikozun Na bağına eşitlenmez."
            : cargo === "shortFat"
              ? "Bu kısa zincir örneği portal yola gider; bütün yağ ürünleri zorunlu lenf değildir."
              : cargo === "b12"
                ? "IF ile bağlı B₁₂ için terminal ileum alımı ve sonra kan yolu gösterilir; kolondaki üretim bu yolun yerine geçmez."
                : "Verilen suda çözünen ürün epitelden kılcal kana, portal sistemle karaciğere yönelir.",
  };
}
export const digestiveSignals018 = {
  acid: "Asit girdisi",
  nutrient: "Yağ ve protein ürünü",
  neural: "Sinirsel uyarı",
} as const;
export type DigestiveSignal018 = keyof typeof digestiveSignals018;
export function enzymeNetwork018(
  signal: DigestiveSignal018,
  enteropeptidase: boolean,
  trypsinogen: boolean,
  chain: number,
  cuts: number,
) {
  if (
    !Object.hasOwn(digestiveSignals018, signal) ||
    !Number.isInteger(chain) ||
    !between(chain, 2, 16) ||
    !Number.isInteger(cuts) ||
    !between(cuts, 0, chain - 1)
  )
    throw new RangeError("ENZYME_NETWORK");
  const trypsin = enteropeptidase && trypsinogen;
  return {
    signal,
    trypsin,
    downstream: trypsin,
    amylasePreserved: true,
    chain,
    cuts,
    fragments: cuts + 1,
    bonds: chain - 1 - cuts,
    water: cuts,
    hormone:
      signal === "acid"
        ? "Sekretin"
        : signal === "nutrient"
          ? "CCK"
          : "Sinirsel haber",
    target:
      signal === "acid"
        ? "Bikarbonat yanıtı"
        : signal === "nutrient"
          ? "Enzim ve safra yanıtı"
          : "Salgı ve hareket desteği",
  };
}
export const biliaryBlocks018 = {
  none: "Açık yollar",
  cystic: "Kese kanalı kapalı",
  common: "Ortak safra yolu kapalı",
} as const;
export type BiliaryBlock018 = keyof typeof biliaryBlocks018;
export function liver018(
  block: BiliaryBlock018,
  gallbladder: boolean,
  divisions: number,
  recycled: number,
) {
  if (
    !Object.hasOwn(biliaryBlocks018, block) ||
    !Number.isInteger(divisions) ||
    !between(divisions, 1, 4) ||
    !between(recycled, 0, 100)
  )
    throw new RangeError("LIVER_MODEL");
  return {
    block,
    gallbladder,
    produced: true,
    direct: block !== "common",
    storedRoute: gallbladder && block === "none",
    bloodPreserved: true,
    divisions,
    droplets: divisions ** 3,
    relativeSurface: divisions,
    relativeVolume: 1,
    recycled,
    loss: 100 - recycled,
    replacement: 100 - recycled,
  };
}
export function pancreas018(
  duct: boolean,
  acid: boolean,
  nutrient: boolean,
  acidUnits: number,
  bicarbonate: number,
) {
  if (!between(acidUnits, 0, 12) || !between(bicarbonate, 0, 12))
    throw new RangeError("PANCREAS_MODEL");
  const delivered = duct ? bicarbonate : 0;
  return {
    duct,
    acid,
    nutrient,
    secretin: acid,
    cck: nutrient,
    enzymeRoute: duct && nutrient,
    bicarbonateRoute: duct && acid,
    endocrinePreserved: true,
    acidUnits,
    bicarbonate,
    delivered,
    neutralized: Math.min(acidUnits, delivered),
    acidLeft: Math.max(0, acidUnits - delivered),
    baseLeft: Math.max(0, delivered - acidUnits),
  };
}
export const heartPhases018 = {
  fill: "Dolum",
  atrial: "Atriyum kasılması",
  isoContract: "Hacim sabit kasılma",
  eject: "Fırlatma",
  isoRelax: "Hacim sabit gevşeme",
} as const;
export type HeartPhase018 = keyof typeof heartPhases018;
export function heart018(
  phase: HeartPhase018,
  edv: number,
  esv: number,
  rate: number,
) {
  if (
    !Object.hasOwn(heartPhases018, phase) ||
    !between(edv, 80, 180) ||
    !between(esv, 20, 80) ||
    esv >= edv ||
    !between(rate, 40, 140)
  )
    throw new RangeError("HEART_MODEL");
  const av = phase === "fill" || phase === "atrial",
    semilunar = phase === "eject",
    stroke = edv - esv;
  return {
    phase,
    av,
    semilunar,
    ventricularContracting: phase === "isoContract" || phase === "eject",
    stroke,
    output: (stroke * rate) / 1000,
    period: 60 / rate,
    mitral: av,
    tricuspid: av,
    aortic: semilunar,
    pulmonary: semilunar,
  };
}
/** Classical reduced classroom pressure model; other terms are explicitly zero. */
export function vessels018(
  flow: number,
  area: number,
  hydrostatic: number,
  oncotic: number,
  filtered: number,
  returned: number,
  lymphCapacity: number,
) {
  if (
    !between(flow, 20, 200) ||
    !between(area, 10, 200) ||
    !between(hydrostatic, 10, 40) ||
    !between(oncotic, 15, 35) ||
    !between(filtered, 0, 30) ||
    !between(returned, 0, filtered) ||
    !between(lymphCapacity, 0, 15)
  )
    throw new RangeError("VESSELS_MODEL");
  const netPressure = hydrostatic - oncotic,
    excess = filtered - returned,
    lymph = Math.min(excess, lymphCapacity);
  return {
    flow,
    area,
    velocity: flow / area,
    hydrostatic,
    oncotic,
    netPressure,
    direction: netPressure > 0 ? "Dışa" : netPressure < 0 ? "İçe" : "Dengede",
    filtered,
    returned,
    excess,
    lymphCapacity,
    lymph,
    accumulation: excess - lymph,
  };
}
export const hemostasisSteps018 = {
  vessel: "Damar yanıtı",
  platelet: "Trombosit tıkacı",
  thrombin: "Trombin basamağı",
  fibrin: "Fibrin ağı",
} as const;
export type HemostasisStep018 = keyof typeof hemostasisSteps018;
export function blood018(
  total: number,
  packed: number,
  step: HemostasisStep018,
  platelets: boolean,
  factors: boolean,
) {
  if (
    !between(total, 5, 20) ||
    !between(packed, 0, total) ||
    !Object.hasOwn(hemostasisSteps018, step)
  )
    throw new RangeError("BLOOD_MODEL");
  const plug = platelets,
    fibrin = factors;
  return {
    total,
    packed,
    hematocrit: (packed / total) * 100,
    rest: total - packed,
    step,
    plug,
    fibrin,
    active: step === "vessel" || (step === "platelet" ? plug : fibrin),
    stablePlug: plug && fibrin,
  };
}
export const lymphRegions018 = {
  rightArm: "Sağ kol",
  rightHead: "Başın sağ yarısı",
  rightChest: "Göğsün sağ üst bölümü",
  leftArm: "Sol kol",
  legs: "Bacaklar",
  intestine: "Bağırsak uzun zincir yağı",
} as const;
export type LymphRegion018 = keyof typeof lymphRegions018;
export function lymph018(
  region: LymphRegion018,
  blocked: boolean,
  initial: number,
  filtration: number,
  capacity: number,
) {
  if (
    !Object.hasOwn(lymphRegions018, region) ||
    !between(initial, 0, 20) ||
    !between(filtration, 0, 10) ||
    !between(capacity, 0, 10)
  )
    throw new RangeError("LYMPH_MODEL");
  const right =
      region === "rightArm" ||
      region === "rightHead" ||
      region === "rightChest",
    actual = blocked ? 0 : Math.min(initial + filtration, capacity);
  return {
    region,
    right,
    blocked,
    route: right ? "Sağ lenf kanalı" : "Göğüs kanalı",
    venousAngle: right ? "Sağ venöz köşe" : "Sol venöz köşe",
    initial,
    filtration,
    capacity,
    actual,
    final: initial + filtration - actual,
    change: filtration - actual,
  };
}
export const immuneAntigens018 = { a: "A antijeni", b: "B antijeni" } as const;
export type ImmuneAntigen018 = keyof typeof immuneAntigens018;
export function immunity018(
  antigen: ImmuneAntigen018,
  memoryA: boolean,
  passiveA: boolean,
  days: number,
  presented: boolean,
) {
  if (!Object.hasOwn(immuneAntigens018, antigen) || !between(days, 0, 12))
    throw new RangeError("IMMUNITY_MODEL");
  const matchingMemory = antigen === "a" && memoryA,
    matchingPassive = antigen === "a" && passiveA,
    passiveAmount = passiveA ? 32 * 2 ** (-days / 4) : 0;
  return {
    antigen,
    memoryA,
    passiveA,
    days,
    presented,
    matchingMemory,
    matchingPassive,
    passiveAmount,
    response: matchingMemory
      ? "A için bellek yanıtı"
      : "Bu antijen için birincil yanıt",
    tRecognition: presented,
    matchingAntibody: antigen === "a" ? "A’ya bağlanan" : "B’ye bağlanan",
    passiveCreatesMemory: false,
  };
}

type Unit018 = {
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

const data: Unit018[] = [
  {
    id: "sindirim-bagirsaklar",
    topic: "detail-307",
    title: "Bağırsaklar: yüzeyden kana ve lenfe",
    minutes: 48,
    objectives: [
      "Duodenum, jejunum, ileum ve kalın bağırsak görevlerini bölgesel olarak açıkla.",
      "Villus ile mikrovillusu ve epitelin iki yüzündeki taşıma basamaklarını ayır.",
      "Besin ürünlerinin portal kan ve lenf yollarını istisnalarıyla izle.",
      "Su, iyon ve mikrobiyal etkinliği verilen bilanço ve kanıt sınırıyla değerlendir.",
    ],
    sections: [
      {
        title: "Bir tüpün farklı görevli bölgeleri",
        paragraphs: [
          "Mideden gelen kimus önce onikiparmak bağırsağına, yani duodenuma girer. Onu jejunum ve ileum izler. Duodenumda pankreas sıvısı ve safra bağırsak içeriğiyle buluşur; jejunum ve ileum geniş emilim yüzeyleri sunar. Görevler keskin duvarlarla tamamen ayrılmış değildir; aynı süreç birden fazla bölgede sürdürülebilir.",
          "İnce bağırsakta sindirim ürünlerinin epitelden iç ortama alınması önemlidir. Kalın bağırsak ise çekum ve kolonla devam eder; rektum dışkının tutulmasına, anal kanal dışarı çıkışın düzenlenmesine katılır. Yolun sırasını öğrenirken her bölgeyi aynı enzim, aynı yüzey ve aynı taşıma biçimine sahip sanma.",
        ],
      },
      {
        title: "Duvarın katlarını akışla birlikte düşün",
        paragraphs: [
          "Lümene bakan mukoza epitel ve destek dokularıyla emilim ve korumaya katılır. Bezlerin bulunduğu kriptler ile yüzeye uzanan yapılar aynı şekil değildir. Daha dıştaki bağ dokusu, damarlar, sinir ağı ve düz kas tabakaları bu yüzeyi destekler. İçerik lümendedir; damar içindeki kanla doğrudan aynı bölme değildir.",
          "Halkasal ve boyuna düz kasların eşgüdümü içeriği karıştırır ve ilerletir. Segmentasyon karıştırmayı, peristaltik dalga ise net ilerlemeyi vurgular; ikisi aynı anda farklı kesimlerde bulunabilir. Enterik sinir ağı ve dış sinirsel-hormonal denetim katılır. Emilim yüzeyini artırmak kasın hidroliz enzimi olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Kıvrım, villus ve mikrovillus üç ayrı ölçektir",
        paragraphs: [
          "Bağırsak duvarının büyük kıvrımları üzerinde çok hücreli parmak benzeri villuslar bulunur. Villusun içinde bağ dokusu, kılcal kan ağı ve başlangıç lenf damarı olan lakteal yer alır. Villus tek bir hücre değildir; üzerini örten epitel bir hücre tabakasıyla lümeni iç dokudan ayırır.",
          "Bir emici epitel hücresinin apikal yüzündeki mikrovilluslar, o hücrenin zar uzantılarıdır; fırçamsı kenarı oluşturur. Büyük kıvrım, villus ve mikrovillus art arda yüzey kazandırır. Alan veya uzunluk için verilen sayılar ölçüm yöntemine bağlı yaklaşık değerlerdir; her insanda değişmez 300 m² varsayımı gerekmez.",
        ],
      },
      {
        title: "Emilimin iki kapısı: apikal giriş ve bazolateral çıkış",
        paragraphs: [
          "Bir besin ürünü önce lümenden epitelin apikal zarını geçer; sonra hücre içinden kan tarafına bakan bazolateral zarı aşar. Bu iki yüzdeki taşıyıcılar aynı olmak zorunda değildir. Zarın bir yanındaki girişin açık olması, öteki yandaki çıkışın bütün koşullarda aynı hızda işlediğini kanıtlamaz.",
          "Glikoz ve galaktozun apikal alımında Na gradyanına bağlı ikincil aktif taşıma önemli örnektir. Gradyanın sürdürülmesi dolaylı enerji gerektirir; glikoz taşıyıcısı her geçişte ATP’yi doğrudan parçalamak zorunda değildir. Fruktozun apikal kolaylaştırılmış geçişi farklı bir örnektir. Kan tarafına çıkış ayrıca değerlendirilir.",
        ],
      },
      {
        title: "Protein parçaları ve karbonhidrat ürünleri",
        paragraphs: [
          "Karbonhidratların başlıca emilen ürünleri glikoz, galaktoz ve fruktoz gibi monosakkaritlerdir. Nişastanın bütün bir zincir olarak kılcal kana geçmesi normal sindirim ürünü yolu değildir. Fırçamsı kenardaki disakkarit parçalayan enzimlerle taşıyıcıların görevlerini ayır: biri bağı hidroliz eder, diğeri zar geçişine yardım eder.",
          "Protein sindiriminde aminoasitlerle birlikte bazı küçük dipeptit ve tripeptitler epitele alınabilir; küçük peptitler hücre içinde de parçalanır. Bütün besin proteininin değişmeden genel dolaşıma verilmesiyle bu süreç aynı değildir. Emilmiş suda çözünen ürünlerin kılcal kanı portal sistem üzerinden karaciğere yönelir.",
        ],
      },
      {
        title: "Yağ yolunda yeniden paketleme ve önemli istisna",
        paragraphs: [
          "Uzun zincir yağ sindirimi ürünleri epitele alındıktan sonra yeniden trigliseritlere dönüştürülebilir. Protein ve diğer lipitlerle paketlenmiş şilomikronlar hücreden çıkarak lakteale katılır. Lenf, göğüs kanalı ve venöz birleşim üzerinden kan dolaşımına ulaşır; besin ürünü sonunda dolaşımdan tamamen ayrı kalmaz.",
          "Kısa ve orta zincir yağ asitlerinin önemli bölümü ile gliserol için portal kan yolu bulunur. Bu nedenle bütün yağ ürünleri mutlaka önce lenfe gider cümlesi fazla geneldir. Safra destekli misel ile epitelden çıkan şilomikron da aynı yapı değildir: biri lümende taşımaya yardımcı, öteki hücrenin yaptığı lipoprotein paketidir.",
        ],
      },
      {
        title: "Vitamin ve minerali tek kurala sıkıştırma",
        paragraphs: [
          "Yağda çözünen A, D, E ve K vitaminlerinin normal alımında yağ sindirimi ve safra desteği önem taşır. Suda çözünen vitaminlerin ve iyonların farklı taşıma yolları vardır. Su da ozmotik gradyanlarla hareket eder; suyun aktif bir ATP pompasıyla birer molekül itilmesi zorunlu açıklama değildir.",
          "B₁₂ özel bir örnektir: mide kaynaklı intrinsik faktöre bağlı etkin alım terminal ileumla ilişkilidir. Kolondaki bakterilerin B₁₂ üretmesi, bu ürünün aynı etkin yol üzerinden yeterli miktarda kazanıldığı anlamına gelmez. Üretim yeri, kimyasal biçim, taşıyıcı ve emilim bölgesi ayrı basamaklardır.",
        ],
      },
      {
        title: "Kalın bağırsakta su, iyon, mukus ve mikroplar",
        paragraphs: [
          "Kolonda ince bağırsaktaki villus düzeni bulunmaz; bezler ve mukus üreten hücreler vardır. Su ve elektrolitlerin geri alınması içeriğin koyulaşmasına katılır. İnsanın kendi enzimleriyle ana besin hidrolizi burada temel görev değildir; bu ifade kolonda hiç kimyasal değişim olmadığı anlamına gelmez.",
          "Mikroorganizmalar bazı sindirilmemiş bileşenleri fermente eder ve kısa zincir yağ asitleri gibi ürünler oluşturabilir. Bazı vitaminler de üretilebilir; gerçek kullanılabilir miktar ve kişinin gereksinimi ayrıca önemlidir. Her bakteri yararlı ya da her mikrobiyal ürün bütünüyle emilir diye genelleme yapılmaz.",
        ],
      },
      {
        title: "Çekumdan dışkılamaya bölge ve denetim",
        paragraphs: [
          "İleumun kalın bağırsakla birleştiği çekuma apendiks bağlıdır. Apendiksin lenfoid dokusu bağışıklıkla ilişkilidir; yalnız hiçbir görevi olmayan bir artığa indirgenmez. Kolonun çıkan, enine, inen ve sigmoid bölümleri rektuma uzanır. Dışkıda emilmemiş artıklar yanında mikroplar, su ve dökülmüş hücreler de bulunur.",
          "Rektumun gerilmesi dışkılama yanıtlarını başlatabilir. İç anal sfinkter düz kas denetimiyle, dış sfinkter ise çizgili kas ve istemli denetim katkısıyla farklılaşır. İshal ve kabızlık; geçiş süresi, salgı, emilim ve başka etkenlerle ilişkilidir. Tek bir belirti burada kişisel tanı ya da tek besinle kesin çözüm üretmez.",
        ],
      },
      {
        title: "Bir bilanço kur, eksik bilgiyi üretme",
        paragraphs: [
          "Verilmiş bir bağırsak sıvı modelinde son lümen suyu, ilk miktar artı salgı girişi eksi emilim ve çıkış olarak hesaplanır. Örneğin 800 mL başlangıç, 200 mL salgı, 700 mL emilim ve 100 mL ilerleme varsa 200 mL kalır. Birimleri aynı tutmak ve bütün akışları saymak gerekir.",
          "Bu sayılar gerçek bir kişinin gün içindeki bağırsak ölçümleri değildir. Son hacmin azalması hangi besinin ne kadar öğrenildiğini veya hangi hastalığın bulunduğunu göstermez. Yeni bir soruda önce ürünün nerede oluştuğunu, epitele nasıl girdiğini ve hangi damara çıktığını çiz; yalnız organ adı ezberinden daha güçlü bir çözüm yolu elde edersin.",
        ],
      },
    ],
    examples: [
      {
        title: "Tek hücre mi, yüzey örgüsü mü?",
        prompt:
          "Bir çizimde 20 epitel hücresi bir parmak çıkıntısını örtüyor. Her hücrenin yüzünde çok küçük zar uzantıları var. İki yapıyı adlandır.",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Çok sayıda hücrenin örttüğü büyük çıkıntı organ yüzeyinin villusudur.",
          },
          {
            label: "2. adım",
            explanation:
              "Tek epitel hücresinin küçük apikal zar uzantıları mikrovillustur.",
          },
          {
            label: "3. adım",
            explanation:
              "Kılcal kan ve lakteal villusun iç dokusundadır; her mikrovillusun içine ayrı damar girmesi gerekmez.",
          },
        ],
        answer: "Büyük yapı villus; hücresel zar uzantıları mikrovillus.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Villus ile mikrovillusu aynı ölçekte tek hücre saymak.",
      },
      {
        title: "İki ürün, iki ilk damar yolu",
        prompt:
          "Verilen modelde glikoz epitelden kılcal kana; uzun zincir üründen yapılan şilomikron lakteale çıkıyor. Hangisi karaciğere portal yoldan önce ulaşır?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Glikozun kılcal kanı bağırsak toplardamarlarına katılır.",
          },
          {
            label: "2. adım",
            explanation:
              "Bu kan portal toplardamarla önce karaciğere taşınır; şilomikronun ilk yolu lenftir.",
          },
          {
            label: "3. adım",
            explanation:
              "Lenf daha sonra venöz kana döner. Bütün yağ asitlerini bu uzun zincir varsayımına dahil etmeyiz.",
          },
        ],
        answer: "Glikoz için ilk yol portal kan; şilomikron için ilk yol lenf.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Sonunda ikisi kana karışıyor diye ilk yolları aynı saymak.",
      },
      {
        title: "Lümen suyunun hesabı",
        prompt:
          "Oyuncak bilanço: ilk 800 mL, salgı girişi 200 mL, emilim 700 mL ve ileri çıkış 100 mL. Başka akış yok. Son?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk miktara girişi ekle: 800+200=1.000 mL.",
          },
          {
            label: "2. adım",
            explanation: "İki çıkışı birlikte say: 700+100=800 mL.",
          },
          {
            label: "3. adım",
            explanation:
              "Son 1.000−800=200 mL. Emilimle ileri taşınma iki ayrı çıkış olduğundan ikisini de kullan.",
          },
        ],
        answer: "200 mL.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "İleri taşınan suyu emilmiş saymak veya aynı çıkışı iki kez çıkarmak.",
      },
      {
        title: "Na gradyanı seçici olarak kapatılırsa",
        prompt:
          "Modelde glikozun apikal girişi Na’ya bağlı; fruktozun kolaylaştırılmış girişi sağlam. Yalnız Na gradyanı kapatılıyor. Ne sonuç çıkar?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Verilen bağımlılık glikoz için doğrudan önemlidir.",
          },
          {
            label: "2. adım",
            explanation:
              "Fruktozun bu karttaki taşıyıcısı aynı gradyana bağlanmamıştır.",
          },
          {
            label: "3. adım",
            explanation:
              "Glikozun gösterilen girişi aksar; bundan bütün besinlerin ve suyun hiçbir yolla geçemeyeceği çıkmaz.",
          },
        ],
        answer: "Seçili glikoz yolu etkilenir; fruktoz yolu modelde korunur.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Bir taşıyıcı koşulunu bütün bağırsak işlevlerine yaymak.",
      },
    ],
    recall: [
      {
        prompt: "Villus tek hücre midir?",
        answer:
          "Hayır; çok hücreli doku çıkıntısıdır. Mikrovillus bir epitel hücresinin apikal zar uzantısıdır.",
      },
      {
        prompt: "Şilomikron ile misel aynı mı?",
        answer:
          "Hayır. Misel lümendeki lipit taşınmasına, şilomikron epitelden lenfe çıkan pakete karşılık gelir.",
      },
      {
        prompt: "Kolonda enzimsel sindirim yok ifadesinin sınırı?",
        answer:
          "İnsanın kendi ana sindirim enzimleriyle hidroliz temel görev değildir; mikrobiyal fermantasyon sürebilir.",
      },
      {
        prompt: "B₁₂ üretmek onu yeterli emmek midir?",
        answer:
          "Hayır; intrinsik faktör, terminal ileum, kimyasal biçim ve miktar ayrı koşullardır.",
      },
    ],
    items: [
      [
        "İnce bağırsakta lümenden emilen bir glikoz molekülü için normal ilk kan yolu hangi sıradadır?",
        "Epitel → kılcal kan → portal toplardamar → karaciğer",
        [
          "Epitel → aort → mide lümeni",
          "Lakteal → safra kanalı → karaciğer",
          "Kolon boşluğu → pankreas kanalı",
          "Epitel → üreter → böbrek pelvisi",
        ],
        "Kan ve sindirim kanalı boşluğunu ayır.",
        "Suda çözünen glikoz epitelden kılcal kana ve portal sistemle karaciğere gider. Safra ve pankreas kanalları besin emilim damarları değildir.",
      ],
      [
        "Bir çıkıntı çok sayıda epitel hücresiyle örtülmüş, içinde kılcal kan ve lakteal var. Bu yapı nedir?",
        "Villus",
        [
          "Tek bir mikrovillus",
          "Bir mitokondri",
          "Safra kesesinin tamamı",
          "Yalnız bir taşıyıcı protein",
        ],
        "Hücre sayısına ve içteki damarlara bak.",
        "Villus doku ölçeğinde çıkıntıdır. Mikrovillus ise bir epitel hücresinin zar uzantısıdır ve içine ayrı bir kan damarı yerleşmez.",
      ],
      [
        "Verilen deneyde glikozun apikal taşıyıcısı Na gradyanına bağlı, fruktozun kolaylaştırılmış taşıyıcısı sağlamdır. Yalnız Na gradyanı yok edilirse hangisi desteklenir?",
        "Gösterilen glikoz girişi aksar; fruktozun verilen yolu korunabilir",
        [
          "Bütün taşıyıcılar aynı nedenle kesin kapanır",
          "Fruktoz taşıyıcısı zorunlu ATP sentezler",
          "Hiçbir hücrede zar bulunmaz",
          "Glikoz artık yalnız safra olarak üretilir",
        ],
        "Sadece verilen bağımlılığı kullan.",
        "Na’ya bağlı örnek glikoz içindir. Fruktozun ayrı yolu aynı koşula bağlanmadığından bütün emilimin durduğu sonucuna gidilemez.",
      ],
      [
        "Normal uzun zincir yağ emiliminde epitelin yaptığı şilomikron için ilk çıkış hangisidir?",
        "Lakteal ve lenf yolu",
        [
          "Doğrudan safra kesesi boşluğu",
          "Pankreasın ekzokrin kanalı",
          "İdrar kanalı",
          "Ağız tükürük kanalı",
        ],
        "Üretimden sonraki paketin ilk damarını seç.",
        "Uzun zincir ürünler yeniden trigliserit ve lipoprotein paketine dönüştürülebilir; şilomikron lakteale çıkar. Sonra venöz kana katılması ilk yolun lenf olduğu bilgisini değiştirmez.",
      ],
      [
        "Hangi ifade yağ ürünlerinin emilimini daha doğru sınırlar?",
        "Kısa ve orta zincir yağ asitleri ile gliserol için portal kan yolu bulunabilir",
        [
          "Her yağ ürünü zorunlu yalnız lenfe geçer",
          "Şilomikron bağırsak lümeninde safra kesesince yapılır",
          "Misel ve şilomikron aynı yapıdır",
          "Safra bütün yağları aminoaside çevirir",
        ],
        "Uzun zincir örneğini bütün ürünlere yayma.",
        "Yağ emiliminde zincir uzunluğu ve ürünün işlenmesi önemlidir. Portal yol istisnaları bütün yağların aynı ilk damarı kullandığı genellemesini bozar.",
      ],
      [
        "Kolonda insanın kendi ana sindirim enzimleriyle besin hidrolizinin temel görev olmaması neyi dışlamaz?",
        "Mikroorganizmaların bazı artıkları fermente etmesini",
        [
          "Her nişastanın tek parça kana geçmesini zorunlu kılar",
          "Kolonda hiçbir kimyasal değişim olamayacağını kanıtlar",
          "Kolonun sadece bir sinir hücresi olduğunu",
          "Dışkıda hiç su bulunamayacağını",
        ],
        "İnsanın enzimleri ile mikrobiyal etkinliği ayır.",
        "Kolon su ve iyon alımının yanında mikrobiyal fermantasyona ev sahipliği yapabilir. Enzim kaynağı ve olayın varlığı birbirinden ayrı değerlendirilir.",
      ],
      [
        "Etkin B₁₂ emilimi için intrinsik faktörle bağlı ürünün terminal ileum alımı verilmiştir. Kolonda bakterinin B₁₂ üretmesi tek başına hangi sonucu kanıtlamaz?",
        "Kişinin gereksiniminin bu üretimle yeterince karşılandığını",
        [
          "Bir mikrobiyal üretim gerçekleşebildiğini",
          "Üretim ve emilimin ayrı basamak olduğunu",
          "Etkin alım bölgesinin önemli olduğunu",
          "Ürünün miktarının ayrıca bilinmesi gerektiğini",
        ],
        "Üretim miktarı ve doğru alım yeri eksik.",
        "Kolondaki üretim, terminal ileumdaki etkin alım yolunun gerisinde kalır; kimyasal biçim ve kullanılabilir miktar da gerekir. Yeterlilik tek üretim gözleminden çıkmaz.",
      ],
      [
        "Oyuncak bağırsak su bilançosunda ilk 800 mL, salgı girişi 200 mL, emilim 700 mL, ileri çıkış 100 mL. Başka akış yoksa son kaç mL?",
        "200",
        ["0", "400", "800", "1.000"],
        "Girişleri ekle, iki çıkışı çıkar.",
        "800+200−700−100=200 mL. Emilim iç ortama geçiş, ileri çıkış ise lümen boyunca taşınmadır; ikisi farklı akış olarak verilmiştir.",
      ],
      [
        "İnce bağırsak hücresinin lümene bakan ve kan tarafına bakan yüzleri için hangisi doğrudur?",
        "Apikal giriş ve bazolateral çıkış farklı taşıyıcılar kullanabilir",
        [
          "Her iki yüz zorunlu tek ve aynı taşıyıcıdır",
          "Apikal yüz doğrudan aort boşluğudur",
          "Bazolateral yüz sindirilmemiş besinin bulunduğu mide lümenidir",
          "Yüzlerin yönü taşımada hiç önemli değildir",
        ],
        "Yolun iki zar geçişini ayrı çiz.",
        "Epitelin kutupluluğu yönlü emilimi destekler. Bir yüzdeki geçiş koşulu diğer yüzdeki bütün taşıyıcı ve hızların aynı olduğunu kanıtlamaz.",
      ],
      [
        "Dışkılama denetiminde iç ve dış anal sfinkter için temel ayrım hangisidir?",
        "İç sfinkter düz kas; dış sfinkter çizgili kas ve istemli denetim katkısı taşır",
        [
          "İkisi de yalnız kemiktir",
          "Dış sfinkter sadece kan plazmasıdır",
          "İç sfinkter bütün pankreas enzimlerini yapar",
          "İki yapı da villusun içindeki laktealdir",
        ],
        "Doku türünü denetim biçimiyle eşleştir.",
        "Rektum gerilmesi refleks yanıtları başlatabilir. Dış sfinkterin istemli katkısı iç sfinkterin düz kas denetimiyle aynı değildir; süreç birden çok basamağın eşgüdümüdür.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 70–71 ve 76–78; OGM Dersler Cepte Sindirim PDF 12 ve 16, OGM Sindirim II PDF 19–20 gerçek seçili öğretim ve şekilleriyle karşılaştırılmış özgün anlatım ve öğretim soruları. Resmî sınav sorusu değildir.",
  },
  {
    id: "sindirim-enzimler-hormonlar",
    topic: "detail-308",
    title: "Sindirim enzimleri ve hormonal denetim: kaynaktan hedefe",
    minutes: 48,
    objectives: [
      "Enzimlerin üretim, iletim ve etki yerlerini substrat ve ürünle birlikte ilişkilendir.",
      "Zimojen etkinleşmesini hormonun kana verilmesinden ayır.",
      "Asit-sekretin ile besin-CCK yollarını sinirsel destekle birlikte açıkla.",
      "Verilen hidroliz modelinde kesim, bağ, ürün ve su bilançosunu kur.",
    ],
    sections: [
      {
        title: "Aynı organda bulunmak aynı görev değildir",
        paragraphs: [
          "Enzim, tepkimeyi hızlandıran biyolojik katalizördür; sindirimde büyük besinlerin hidrolizine katılır. Hormon ise kanla hedefe haber taşır. Safra tuzu da yağın fiziksel dağılımına yardım eder; bu nedenle ne her salgı enzimdir ne her sindirimle ilgili molekül hormon sayılır.",
          "Bir enzimi öğrenirken üretildiği hücre, taşındığı kanal, çalıştığı bölge, substrat ve ürün için beş ayrı kutu aç. Pankreasta üretilip duodenumda çalışan enzim, duodenumda üretilmiş sayılmaz. Kanal içindeki enzimle kanda yol alan hormonun oklarını farklı çizmek karışıklığı azaltır.",
        ],
      },
      {
        title: "Ağızdan başlayan karbonhidrat zinciri",
        paragraphs: [
          "Tükürük amilazı nişasta ve glikojen gibi uygun bağlara sahip polisakkaritleri daha küçük ürünlere ayırmaya başlar. Pankreas amilazı ince bağırsakta bu işlemi sürdürür. İnsan enzimleri selülozun bağlarını aynı amilaz yoluyla parçalayamaz; bütün polisakkaritler aynı tür bağ düzenine sahip değildir.",
          "Fırçamsı kenarda maltaz, sükraz ve laktaz gibi enzimler disakkaritlerin monosakkaritlere ayrılmasına katılır. Sükrozdan glikoz ve fruktoz, laktozdan glikoz ve galaktoz oluşur. Bir hidrolizde su kullanılır; glikozun zardan taşınması ise sonraki olaydır. Enzim ürünü oluşturur, taşıyıcının görevini doğrudan üstlenmez.",
        ],
        table: {
          headers: ["Enzim / kaynak", "Etki ve ürün örneği"],
          rows: [
            [
              "Tükürük ve pankreas amilazı",
              "Uygun nişasta/glikojen bağları; daha küçük karbonhidrat ürünleri",
            ],
            ["Maltaz / fırçamsı kenar", "Maltoz → iki glikoz"],
            ["Sükraz / fırçamsı kenar", "Sükroz → glikoz ve fruktoz"],
            ["Laktaz / fırçamsı kenar", "Laktoz → glikoz ve galaktoz"],
          ],
        },
      },
      {
        title: "Protein sindirimi midede başlar, bağırsakta sürer",
        paragraphs: [
          "Midenin baş hücreleri pepsinojen öncülünü salgılar. Uygun asidik ortam ve oluşan pepsinin katkısıyla etkin pepsin elde edilir; proteinler daha küçük peptitlere ayrılır. Mide asidi proteinin yapısını değiştirmeye de katılır; fakat asitle denatürasyon ve peptit bağının enzimli hidrolizi aynı işlem değildir.",
          "Pankreas proteazları ince bağırsakta protein ve peptitlere etki eder. Tripsin ve kimotripsin iç bağlara, karboksipeptidaz uçtan ayırmaya örnektir. Fırçamsı kenar ve hücre içi peptidazlar son ürünlere ulaşmaya katılır. Karboksipeptidazın pankreas kökenini, aminopeptidazın bağırsak örneğiyle karıştırma.",
        ],
      },
      {
        title: "Zimojenler için bir etkinleşme ağı kur",
        paragraphs: [
          "Etkin proteazın üretildiği hücreye zarar vermesini azaltan düzenlerden biri öncül salgılanmasıdır. Duodenum fırçamsı kenarındaki enteropeptidaz, diğer adıyla enterokinaz, tripsinojenden tripsin oluşumunu başlatır. Tripsin başka tripsinojenleri ve bazı diğer pankreas proteaz öncüllerini etkinleştirebilir.",
          "Burada bir ağ vardır: başlangıç etkinleştiricisinin seçici yokluğu alt basamakları etkiler. Ancak pankreas amilazı, lipazı ve nükleazının tümünü aynı inaktif proteaz öncülü saymak yanlıştır. Midede asidin pepsin yoluna katkısını bütün pankreas enzimleri için ortak etkinleşme kuralına dönüştürme.",
        ],
      },
      {
        title: "Yağda fiziksel dağılım ile ester hidrolizini ayır",
        paragraphs: [
          "Safra tuzları yağ damlacıklarının dağılmasına ve karışık misellerle ürünlerin yüzeye taşınmasına yardım eder. Pankreatik lipazın yağ-su ara yüzüne erişimi böylece desteklenir. Safra enzim gibi ester bağını tek başına hidroliz etmez; büyük damlanın küçülmesi molekül sayısının aynı oranda arttığı anlamına gelmez.",
          "Pankreatik lipazın başlıca ürünleri uzun zincir yağ asitleri ve monoasilgliserol içerir. Derslerdeki trigliserit + üç su → gliserol + üç yağ asidi gösterimi, tam hidroliz son noktasının açık modeli olabilir; baskın bağırsak ürünlerinin tamamını tek biçime indirmez. Kolipaz gibi yardımcılar ile ortam da gerçek etkinliğe katkı verir.",
        ],
      },
      {
        title: "Nükleik asit ve son ürünleri unutma",
        paragraphs: [
          "Pankreas nükleazları DNA ve RNA’nın daha küçük nükleotit ürünlerine ayrılmasına katılır. Bağırsak yüzeyindeki nükleotidaz ve ilgili enzimlerle fosfat, şeker ve azotlu baz içeren son ürünlere ilerlenebilir. Nükleik asidi protein sanıp aminoasit tek üründür demek molekül türünü karıştırır.",
          "İnsan sindirim enzimlerinin üretim yerini substratın geldiği organla eşitleme. Besindeki DNA bitki ya da hayvan hücresinden gelse de parçalanma ürünü kuralı molekülün yapısına bağlıdır. Su, vitamin ve minerallerin önce aynı polimer hidrolizinden geçmesi gerekmez; sindirim ile emilim ayrı kavramlardır.",
        ],
      },
      {
        title: "Gastrin: mideden kana, hedefte yanıta",
        paragraphs: [
          "Midenin G hücrelerinden salgılanan gastrin kana katılır ve mide salgısı ile hareketinin düzenlenmesine katkı verir. Protein parçaları ve sinirsel girdiler gibi etkiler yanıtı başlatabilir; çok asitli koşullardaki geri denetim de önemlidir. Hormonun adı, bütün etkilerin tek doğrudan hücre basamağıyla gerçekleştiği anlamına gelmez.",
          "Gastrin sindirim lümenine dökülüp pepsin gibi protein kesen enzim değildir. Kanda dolaşma ile hedef hücrenin reseptör üzerinden yanıt vermesi iki ayrı aşamadır. Vagus ve enterik sinir katkıları hormonal yolla etkileşebilir; sinir ucundan çıkan her haberciyi otomatik endokrin hormon diye adlandırma.",
        ],
      },
      {
        title: "Sekretin: asit girdisinden bikarbonat desteğine",
        paragraphs: [
          "Duodenuma ulaşan asit, sekretin salımının önemli uyarısıdır. Sekretin pankreasın sulu-bikarbonat yönünden zengin salgısını destekler; safra kanalı salgısı gibi başka hedef katkıları da bulunabilir. Bikarbonat, asidik kimusun nötralizasyonuna ve ince bağırsak ortamının düzenlenmesine yardım eder.",
          "Sekretin kendisi asidi bir enzim gibi hidroliz etmez. Hormon kana, bikarbonatlı salgı ise kanalla lümene gider. Gerçek salgı; sinirler ve başka hormonlarla birlikte düzenlenir. Tek bir asit düğmesinden her kişide değişmez bir pH veya mililitre salgı hesaplamak, kaynakta olmayan nicel yasa üretmek olur.",
        ],
      },
      {
        title: "CCK: besin içeriğinden enzim ve safra yanıtına",
        paragraphs: [
          "Yağ sindirimi ürünleri ve protein ürünleri gibi duodenal girdiler CCK, yani kolesistokinin yanıtını destekler. Pankreastan enzimce zengin salgı ve safra kesesinin kasılması önemli sonuçlardır. Sfinkter ve mide boşalması denetimiyle de bağlantı kurularak bağırsaktaki iş yüküyle giriş eşgüdümlenir.",
          "CCK safrayı karaciğer yerine üretmez; depolanmış safranın uygun zamanda akışını destekler. Yağ varlığını sekretinin tek ve zorunlu uyarısı saymak da doğru değildir. Asit–sekretin/bikarbonat ve besin–CCK/enzim-safra eşleştirmeleri temel ayrımı öğretir; gerçek yanıtların birbirinden tamamen yalıtık olduğunu ileri sürmez.",
        ],
        table: {
          headers: ["Haber", "Başlıca girdi → hedef örneği"],
          rows: [
            [
              "Gastrin",
              "Mide içeriği/sinir desteği → mide salgı-hareket yanıtı",
            ],
            ["Sekretin", "Duodenal asit → bikarbonatlı salgı desteği"],
            ["CCK", "Yağ/protein ürünleri → enzim ve safra akışı desteği"],
            ["Sinirsel ağ", "Duyusal ve yerel bilgi → salgı/hareket eşgüdümü"],
          ],
        },
      },
      {
        title: "Koşul deneyinden sağlam çıkarım yap",
        paragraphs: [
          "Bir proteaz etkinleşme deneyinde enteropeptidaz ve tripsinojen birlikte sağlamsa tripsin oluşumu gösterilir. Seçici olarak enteropeptidazı kaldırınca tripsin ve ona bağlı etkinleşme yolları aksar. Aynı deney amilazın üretimini hedeflemiyorsa, bütün sindirim salgıları yok oldu sonucuna ulaşılmaz.",
          "Hidroliz hesabında açık bir doğrusal n birimli zincirin başlangıçta n−1 bağı vardır. K ayrı bağ kesilirse k+1 zincir parçası, n−1−k kalan bağ ve k su kullanımı bulunur. Kesim yerleri verilmeden her parçaya monomer denmez. Hormon sinyalini bu bağ sayısına bağlamak için ayrıca verilmiş deneysel veri gerekir.",
        ],
      },
    ],
    examples: [
      {
        title: "On bir birimlik zincirde dört kesim",
        prompt:
          "Tek açık doğrusal zincirde 11 birim var. Dört farklı bağ hidroliz ediliyor; kesim yeri uzunlukları verilmemiş. Parça, bağ ve su?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Başlangıç bağ sayısı 11−1=10’dur.",
          },
          {
            label: "2. adım",
            explanation:
              "Dört kesim 4+1=5 parça oluşturur; kalan bağ 10−4=6 olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Her hidroliz için bir su: 4 su kullanılır. Beş parçanın her biri zorunlu monomer değildir.",
          },
        ],
        answer: "5 parça, 6 kalan bağ, 4 su.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Parça sayısını monomer sayısı sanmak.",
      },
      {
        title: "İki haber, iki farklı başlıca yanıt",
        prompt:
          "X duodenal asit, Y yağ ve protein ürünü girdisidir. Temel hormon–hedef eşleştirmesini yap.",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "X için sekretin yolunu seç; pankreas kanal hücrelerinin bikarbonat desteğiyle ilişkilendir.",
          },
          {
            label: "2. adım",
            explanation:
              "Y için CCK yolunu seç; enzimce zengin salgı ve safra kesesi yanıtını düşün.",
          },
          {
            label: "3. adım",
            explanation:
              "Her iki hormon kana gider; bikarbonat ve enzimler ise kanal-lümen yoluna katılır.",
          },
        ],
        answer: "X: sekretin–bikarbonat; Y: CCK–enzim/safra.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Hormonu enzimle veya iki hormonun ana uyarısını birbiriyle değiştirmek.",
      },
      {
        title: "Seçici başlangıç engeli",
        prompt:
          "Tripsinojen ve diğer proteaz öncülleri var; yalnız enteropeptidaz yolu engelli. Amilaz üretimi ve ulaşımı sağlam kabul ediliyor. Ne beklenir?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Tripsin oluşumunun verilen başlangıç basamağı eksiktir.",
          },
          {
            label: "2. adım",
            explanation:
              "Tripsine bağlı proteaz etkinleşmeleri de bu kartta aksar.",
          },
          {
            label: "3. adım",
            explanation:
              "Amilaz ayrı koşulla sağlam verildiğinden nişasta yolunun zorunlu tamamen durduğu çıkarılamaz.",
          },
        ],
        answer: "Proteaz ağı etkilenir; verilen amilaz yolu korunur.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Bir ağdaki engeli bütün enzimlere yaymak.",
      },
      {
        title: "Üretim yeri ile etki yerini ayır",
        prompt:
          "Bir enzim pankreas asiner hücresinde yapılıyor, kanalla duodenuma gidip peptit ucundan birim ayırıyor. Kaynak ve görev?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Üretim kaynağı pankreastır; çalıştığı boşluk ince bağırsaktır.",
          },
          {
            label: "2. adım",
            explanation:
              "Uçtan ayıran pankreatik proteaz örneği karboksipeptidazdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Duodenumda çalışması, enzimin bağırsak hücresinde üretildiği sonucunu vermez.",
          },
        ],
        answer: "Pankreas kaynaklı karboksipeptidaz; ince bağırsakta etki.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Etki bölgesini üretim organı saymak.",
      },
    ],
    recall: [
      {
        prompt: "Hormon ve enzim nasıl ayrılır?",
        answer:
          "Hormon hedefe haber taşır; sindirim enzimi uygun substratın tepkimesini katalizler. Kan ve lümen yollarını ayır.",
      },
      {
        prompt: "Enteropeptidaz neyi başlatır?",
        answer:
          "Tripsinojenden tripsin oluşumunu; tripsin bazı başka proteaz öncüllerinin etkinleşmesine katılır.",
      },
      {
        prompt: "Karboksipeptidazın temel kaynağı?",
        answer:
          "Pankreas; duodenumda çalışması bağırsakta üretildiği anlamına gelmez.",
      },
      {
        prompt: "Safra ester bağını keser mi?",
        answer:
          "Safra fiziksel dağılım ve misel desteği verir; ester hidrolizi lipaz gibi enzimlerin görevidir.",
      },
    ],
    items: [
      [
        "Sükrazın sükroza etki ettiği normal hidroliz için ürün çifti hangisidir?",
        "Glikoz ve fruktoz",
        [
          "İki aminoasit",
          "Galaktoz ve yağ asidi",
          "Gliserol ve fosfat",
          "Yalnız iki galaktoz",
        ],
        "Sükrozun iki monosakkarit bileşenini düşün.",
        "Sükroz hidrolizinde glikoz ve fruktoz oluşur. Laktazın laktozdan oluşturduğu glikoz–galaktoz çiftiyle karıştırılmaz.",
      ],
      [
        "Bir enzim pankreasta üretilip duodenumda peptitlerin ucuna etki ediyor. Hangi eşleştirme doğrudur?",
        "Karboksipeptidaz; kaynak pankreas, etki yeri ince bağırsak",
        [
          "Gastrin; nişastayı kanda keser",
          "Safra; proteaz öncülüdür",
          "Tükürük amilazı; tek kaynağı karaciğerdir",
          "Laktaz; mide asidini üreten paryetal hücredir",
        ],
        "Kaynağı ve substratı birlikte denetle.",
        "Pankreatik karboksipeptidaz ince bağırsakta çalışır. Bağırsaktaki etki yeri üretim kaynağını değiştirmez; hormon ve fiziksel yardımcılar enzimle eşitlenmez.",
      ],
      [
        "Duodenal asit için en uygun temel düzenleme yolu hangisidir?",
        "Sekretin → bikarbonatlı salgı desteği",
        [
          "Sekretin → bütün antikorların doğrudan sentezi",
          "CCK → yalnız retina pigmenti",
          "Pepsin → kana verilen tek temel hormon",
          "Safra tuzu → sinir aksonu",
        ],
        "Asit girdisiyle nötralizasyon yanıtını bağla.",
        "Sekretin duodenal asit yanıtında önemlidir. Hormon kanla haber taşır; bikarbonat salgısı ise kanalla lümene ulaşır. Bu yol doğrudan hormonun asit parçalayan enzim olması değildir.",
      ],
      [
        "Yağ ve protein ürünlerinin duodenumdaki etkisiyle temel CCK yanıtı hangisidir?",
        "Pankreas enzim salgısı ve safra kesesi yanıtının desteklenmesi",
        [
          "Safranın artık safra kesesinde üretilmeye başlaması",
          "Her enzimin zorunlu aynı anda kana dökülmesi",
          "Bütün bağırsak hareketinin yaşam boyu kesin durması",
          "CCK’nin tek başına bütün ester bağlarını kesmesi",
        ],
        "Haberin hedefini kimyasal hidrolizden ayır.",
        "CCK enzimce zengin pankreas salgısı, safra akışı ve boşalma denetimiyle ilişkilidir. Safra üretiminin kaynağı yine karaciğerdir; CCK enzim değildir.",
      ],
      [
        "Seçici deneyde enteropeptidaz yok, tripsinojen var; amilaz üretimi ve ulaşımı sağlam. Hangisi desteklenir?",
        "Verilen tripsin başlangıcı ve ona bağlı proteaz ağı aksar",
        [
          "Amilaz mutlaka artık hiç sentezlenemez",
          "Gastrin doğrudan bütün proteaz bağlarını keser",
          "Safra artık bir aminoasit olur",
          "Bütün vitaminler polimerleşir",
        ],
        "Engellenen özel basamağı takip et.",
        "Enteropeptidaz tripsinojen etkinleşmesinin başlangıç basamağıdır. Amilaz aynı proteaz öncül ağının zorunlu üyesi olarak verilmediğinden onun da yokluğu çıkarılamaz.",
      ],
      [
        "Açık doğrusal 11 birimli tek zincirde dört farklı bağ hidroliz ediliyor. Doğru üçlü hangisidir?",
        "5 parça, 6 kalan bağ, 4 su kullanımı",
        [
          "4 parça, 11 bağ, 5 su",
          "11 monomer kesin, 0 bağ, 4 su",
          "5 parça, 10 bağ, 0 su",
          "6 parça, 5 bağ, 11 su",
        ],
        "Başlangıçta n−1 bağ vardır; k kesim k+1 parça verir.",
        "Başlangıç 10 bağdır. Dört kesimle kalan 6 bağ, oluşan 5 parça ve tüketilen 4 su bulunur. Kesim konumları bilinmediğinden bütün parçalar monomer sayılamaz.",
      ],
      [
        "Sindirimde safra ile lipazı doğru ayıran ifade hangisidir?",
        "Safra dağılım ve misel desteği verir; lipaz ester hidrolizini katalizler",
        [
          "Safra bir DNA nükleazıdır",
          "Lipaz yalnız kanla taşınan bir hormon adıdır",
          "Safra bütün yağları önce proteine çevirir",
          "Damlacık küçülmesi zorunlu tüm ester bağlarının koptuğunu kanıtlar",
        ],
        "Fiziksel yüzey değişimini bağ kesimiyle karıştırma.",
        "Damlacıkların küçülmesi yüzeye erişimi artırabilir; molekülün ester bağı ise enzimli hidrolizle kesilir. İki süreç birbirini destekleyebilir ama aynı olay değildir.",
      ],
      [
        "Pankreas nükleazı besindeki DNA’ya etki ediyor. En uygun açıklama hangisidir?",
        "Nükleik asit daha küçük nükleotit ürünlerine ayrılır; sonraki enzimlerle bileşenlerine ilerlenir",
        [
          "DNA yalnız gliserole döner",
          "Nükleazın temel ürünü bütün hâlinde kas lifidir",
          "DNA sindirimi her zaman pepsinle yalnız aminoasit üretir",
          "Nükleaz yalnız safra depolayan hücredir",
        ],
        "Substratın nükleik asit olduğunu koru.",
        "Nükleaz nükleik asit hidrolizine katılır. Nükleotidaz ve ilgili son basamaklarla fosfat, şeker ve azotlu baz bileşenleri elde edilebilir; protein ürünüyle eşitlenmez.",
      ],
      [
        "Gastrin için hangi yol ve görev uygundur?",
        "Mide hücresinden kana → hedefte salgı ve hareket düzenlenmesine katkı",
        [
          "Mide lümeninde tek başına bütün nişastayı kesme",
          "Safra kesesinden üreye dönüşme",
          "Duodenumdan idrar kesesine mekanik lokma taşıma",
          "Yalnız diş minesinin inorganik bileşeni olma",
        ],
        "Sinyal ile kataliz ayrı işlevlerdir.",
        "Gastrin bir hormondur ve kanla taşınır; pepsin gibi lümende protein bağlarını kesen enzim değildir. Sinirsel ve geri denetleyici girdilerle birlikte yanıt oluşur.",
      ],
      [
        "Hangi genelleme yanlıştır?",
        "Pankreastan çıkan bütün enzimler zorunlu inaktif proteaz öncülleridir",
        [
          "Bazı proteazlar öncül olarak salgılanır",
          "Enteropeptidaz tripsin başlangıcına katılır",
          "Enzimin kaynağı ve etki yeri farklı olabilir",
          "Amilaz ve proteazın substratları farklıdır",
        ],
        "Bütün sözcüğünü farklı enzim sınıflarına karşı denetle.",
        "Proteaz zimojenleri önemli koruma düzenidir; bunu amilaz, lipaz ve nükleazın tümü için aynı zorunlu inaktif proteaz modeli yapmak yanlıştır. Enzim sınıfları ve salgı biçimleri ayrılır.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 70, 72 ve 74–76; OGM Dersler Cepte Sindirim PDF 12 ve 14–15; OGM Sindirim II PDF 20 tablosunun gerçek öğretimiyle karşılaştırılmış özgün anlatım ve sorular. Resmî sınav sorusu değildir.",
  },
  {
    id: "sindirim-karaciger-safra",
    topic: "detail-309",
    title: "Karaciğer ve safra kesesi: kan yolu ile safra yolunu ayır",
    minutes: 48,
    objectives: [
      "Hepatik arter, portal ven, hepatik ven ile safra kanallarını ayrı izleyerek anatomiyi açıkla.",
      "Safra üretimi, depolanması, emülsiyon ve geri kazanımı ilişkilendir.",
      "Karaciğerin metabolizma, sentez, depolama ve savunma görevlerini doğru hücre kapsamıyla öğren.",
      "Seçici tıkanma ve havuz bilançosundan koşullu sonuç çıkar.",
    ],
    sections: [
      {
        title: "Sağ üst karında iki ayrı taşıma ağı",
        paragraphs: [
          "Karaciğer diyaframın altında, karın sağ üst bölümünde büyük bir organdır. Hepatositlerin metabolik işlevlerini destekleyen yoğun kan ağı vardır. Organın alt yüzüyle ilişkili safra kesesi ise karaciğerle aynı organ değildir. Şemada iki yapının sınırını ayırmak, üretim ve depolamayı doğru yere yerleştirir.",
          "Kan karaciğere iki önemli yoldan girer: hepatik arter ve sindirim organlarından gelen portal toplardamar. Hepatik toplardamarlar kanı sistemik dönüşe verir. Safra kanallarıysa başka yönde bir salgı yolu kurar. Portal kan içindeki glikozun safra kanalıyla duodenuma gittiği varsayımı iki ağı karıştırır.",
        ],
      },
      {
        title: "Hepatositten duodenuma safra akışı",
        paragraphs: [
          "Safra hepatositlerce üretilir ve küçük safra kanalcıklarından daha büyük kanallara toplanır. Sağ ve sol karaciğer kanallarının devamı, kese kanalıyla bağlantı kuran hepatik yol olarak düşünülür. Kesenin sistik kanalı ile devamdaki ortak safra yolu, yani koledok, şemada ayrı isimler taşır.",
          "Koledok duodenuma açılan yola katılır; pankreasın ana kanalı Wirsung farklı bir bezden gelir. Birçok öğretim şeması ortak son giriş düzenini gösterir, fakat gerçek kanal birleşimlerinde anatomik varyasyon bulunabilir. Bu nedenle çizimdeki tek birleşimi her insanda değişmez bütün ayrıntı sanma.",
        ],
      },
      {
        title: "Kese üretmez; depolar ve yoğunlaştırır",
        paragraphs: [
          "Safra kesesi öğünler arasında safrayı depolayabilir ve su-elektrolit alımıyla yoğunlaştırabilir. Yağ ve protein ürünleriyle desteklenen CCK yanıtı kesenin kasılmasına ve uygun akışın düzenlenmesine katılır. Üretim karaciğerde sürerken depolama akışı öğüne göre değişebilir.",
          "Safra kesesinin bulunmaması tek başına karaciğerin safra üretimini durdurmaz; doğrudan kanal yoluyla bağırsak akışı olabilir. Kese kanalı tıkanmasıyla ortak safra yolunun tıkanması bu yüzden aynı deney değildir. Birinde kese kullanımı aksarken hepatik yol açık kalabilir; ötekinde karaciğerden duodenuma çıkış da etkilenebilir.",
        ],
      },
      {
        title: "Safranın içeriği ve fiziksel yardım",
        paragraphs: [
          "Safrada su, iyonlar, safra tuzları, fosfolipitler, kolesterol ve bilirubin gibi bileşenler yer alır. Bunların hepsi aynı görevde değildir: safra tuzları lipitlerin sindirim ve emilim ortamını desteklerken bazı bileşenler atılım yoluna katılır. Safra pankreas lipazı gibi bir protein sindirim enzimi değildir.",
          "Emülsiyon, büyük yağ kütlesinin küçük damlacıklara dağılmasıdır. Eşit hacim daha küçük damlalara ayrılınca toplam ara yüz artar. Safra yağ moleküllerini tamamen suda gerçek çözelti hâline getirmiş veya ester bağlarını kendi başına kesmiş sayılmaz; fiziksel dağılım ve kimyasal hidroliz ayrıdır.",
        ],
      },
      {
        title: "Misel, epitel ve şilomikron ardışık ama farklı",
        paragraphs: [
          "Safra tuzlarının katıldığı karışık miseller uzun zincir yağ ürünlerinin sulu ortamda epitel yüzeyine taşınmasına yardım eder. Ürünler epitele geçer; miselin bütünü aynı paket olarak doğrudan lakteale atılmaz. Yağda çözünen A, D, E ve K vitaminlerinin alımı da bu süreçle ilişkilidir.",
          "Epitelde yeniden yapılan trigliseritler şilomikron paketlerine katılabilir ve lenfe çıkar. Kısa/orta zincir yağ asitleri ve gliserol için portal yol istisnasını koru. Safra akışındaki engelin yağ ve vitamin emilimini etkilemesi olasıdır; tek bir seçici engelden bütün suda çözünen ürünlerin yok olduğu sonucu çıkmaz.",
        ],
      },
      {
        title: "Geri dönen safra tuzuyla bir havuz kur",
        paragraphs: [
          "Safra tuzlarının önemli bölümü bağırsaktan, özellikle ileal geri alım yoluyla portal dolaşıma katılıp karaciğere döner. Enterohepatik dolaşım böyle bir yeniden kullanım döngüsüdür. Bir molekül her öğünde mutlaka sıfırdan aynı miktarda yapılmaz; döngü içinde tekrar kullanılabilir.",
          "Oyuncak bir 100 birimlik havuzdan 80 birim geri dönüyorsa kayıp 20 birimdir. Havuz aynı büyüklükte korunacaksa yeni sentez 20 birimi tamamlar. Bu bir kütle bilançosudur; gerçek kişideki sentez hızı, genetik düzenleme veya hastalık şiddeti yalnız bu yüzdeyle bulunmaz.",
        ],
      },
      {
        title: "Karbonhidrat ve lipit metabolizmasının kavşağı",
        paragraphs: [
          "Karaciğer glikozun glikojen olarak depolanması, gerektiğinde glikojenin parçalanması ve glikoz üretim yollarıyla kan glikozu düzenine katkı verir. İnsülin ve glukagon gibi haberler bu süreçlerin denetiminde önemlidir. Karaciğer tek başına kapalı bir depo değildir; kas ve yağ doku gibi organlarla birlikte çalışır.",
          "Lipit sentezi, yağ asidi işlenmesi ve lipoprotein metabolizması da önemli görevlerdir. Kolesterol hem hücresel bir yapı bileşeni hem bazı ürünlerin öncülüdür; bütün kolesterolü gereksiz zehir diye adlandırma. Yağların enerjiye katkısı ile safra tuzlarının sindirim ortamına katkısı farklı işlevlerdir.",
        ],
      },
      {
        title: "Azot, üre ve plazma proteinlerinde doğru kaynak",
        paragraphs: [
          "Aminoasitlerin işlenmesinde azotlu artıklar oluşabilir; karaciğerde üre sentezi amonyağın yönetilmesine katkı verir. Üre kana verilir ve başlıca böbrekten uzaklaştırılır. Protein metabolizmasıyla oluşan azotun yolu, bütün nükleik asit azotlarının her koşulda aynı tek ürüne döndüğü genellemesi değildir.",
          "Albümin ve fibrinojen gibi önemli plazma proteinleri karaciğerde sentezlenir. Buna karşılık antikorları plazma hücreleri üretir; bütün globulinleri veya bütün savunma moleküllerini hepatosit ürünü sayma. Aminoasit havuzu da glikojen gibi sınırsız özel bir protein deposu değildir; yapım, yıkım ve doku gereksinimleriyle dengelenir.",
        ],
      },
      {
        title: "Depolar, fagositler ve biyotransformasyon",
        paragraphs: [
          "Karaciğer bazı vitaminleri ve demiri depolayabilir; depolanan miktar ve süre maddeye göre değişir. Embriyonik dönemde kan yapımına da katılır; sağlıklı erişkinde bütün eritrositlerin tek üretim yeri değildir. Yaşlanan kan hücrelerinin yıkımında karaciğer ve dalaktaki fagositik hücreler rol oynar.",
          "Karaciğerdeki Kupffer hücreleri savunmaya, biyotransformasyon enzimleri bazı maddelerin kimyasal dönüşümüne katılır. Bir maddenin dönüştürülmesi onun her koşulda tamamen zararsız olduğu anlamına gelmez; bazı ara ürünler zararlı olabilir. Bu bilgiler kişiye alkol veya ilaç için güvenli miktar ya da arınma yöntemi seçtirmez.",
        ],
      },
      {
        title: "Katalaz, depolar ve EPO katkısını yerli yerine koy",
        paragraphs: [
          "Karaciğerin peroksizomları gibi hücresel düzeneklerde katalaz hidrojen peroksidin su ve oksijene parçalanmasına katılır. Dengelenmiş örnek 2 H₂O₂ → 2 H₂O + O₂ biçimindedir. Bu belirli enzim tepkimesi, bütün ilaç ve zehirlerin aynı enzimle bütünüyle zararsızlaştırıldığı anlamına gelmez; maddelere göre farklı biyotransformasyon yolları bulunur.",
          "Demir ve bakır gibi bazı minerallerle A ve B₁₂ gibi vitaminlerin depolanmasına katkı vardır; depolama kapasitesi maddeye göre değişir. Erişkinde EPO’nun başlıca kaynağı böbrektir, karaciğerin daha küçük katkısı da bulunabilir; embriyonik rol farklıdır. Bir kaynaktaki yaklaşık organ yüzdeleri her yaş ve koşul için değişmez yasa sayılmaz. Protrombin gibi bazı pıhtılaşma proteinleri de karaciğer sentezinin örnekleridir.",
        ],
      },
      {
        title: "Tıkanma, sarılık ve kanıtın sınırı",
        paragraphs: [
          "Bilirubinin safra akışıyla uzaklaştırılmasında sorun sarılığa katkı verebilir. Safra taşı ve kanal tıkanması olası nedenlerden biridir; fakat kan hücresi yıkımı veya karaciğer işleme kusurları gibi başka nedenler de vardır. Tek bir renk değişiminden bütün mekanizmayı kesin belirlemek doğru değildir.",
          "Etkileşimde sadece belirtilen kanal engellenir: sistik kanal kapalıyken karaciğerin ortak yola doğrudan bağlantısı açık kalabilir; ortak yol engelinde duodenuma safra çıkışı aksar. Kan ağı deneyde korunmuşsa portal akımı da otomatik sıfırlama. Önce okları, sonra engelin yukarı ve aşağı etkilerini izle.",
        ],
      },
    ],
    examples: [
      {
        title: "Kese kanalı mı, ortak kanal mı?",
        prompt:
          "Şemada hepatik kanal doğrudan ortak safra yoluna bağlı. Yalnız sistik kanal tıkalı; diğer yollar açık. Karaciğer safrası duodenuma ulaşabilir mi?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Sistik kanal kesenin giriş-çıkış bağlantısıdır.",
          },
          {
            label: "2. adım",
            explanation:
              "Hepatik kanaldan ortak yola giden bağlantı deneyde sağlamdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu nedenle kese akışı aksarken doğrudan hepatik safra çıkışı sürebilir.",
          },
        ],
        answer: "Evet, verilen açık doğrudan yol korunur.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Her safra yolu tıkanmasını bütün üretimin durması saymak.",
      },
      {
        title: "Aynı hacim, daha çok yüzey",
        prompt:
          "Kenar uzunluğu 2 birim olan bir küp yağ modeli, her kenarı ikiye bölünerek 8 küçük küpe ayrılıyor. Hacim ve toplam yüzey?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Başlangıç hacmi 2³=8, yüzeyi 6×2²=24 birim karedir.",
          },
          {
            label: "2. adım",
            explanation:
              "Sekiz küçük küpün kenarı 1; toplam hacim 8, toplam yüzey 8×6=48 olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Hacim korunur, yüzey iki katına çıkar. Bu geometrik model ester bağı kesildiğini göstermez.",
          },
        ],
        answer: "Hacim 8; yüzey 24’ten 48’e.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Fiziksel parçalanmayı yeni yağ molekülleri veya hidroliz saymak.",
      },
      {
        title: "Geri kazanımın eksik kısmı",
        prompt:
          "100 birim safra tuzu havuzunun 80 birimi geri dönüyor. Başka giriş-çıkış yok; havuz aynı tutulacak. Yeni sentez?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Kayıp 100−80=20 birimdir.",
          },
          {
            label: "2. adım",
            explanation:
              "Havuz büyüklüğünü korumak için kaybedilen kısım tamamlanmalıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Yeni sentez 20 olursa 80+20=100 olur. Bu yeniden kullanım her tur 100 yeni birim gerektirmez.",
          },
        ],
        answer: "20 birim yeni sentez.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Geri döneni yeniden kayıp saymak.",
      },
      {
        title: "İki hücrenin ürününü ayır",
        prompt:
          "X hücresi hepatosit, Y hücresi antikor üreten plazma hücresi. Albümin ile özgül antikorun temel kaynaklarını eşleştir.",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Albümin karaciğer hepatositlerinin önemli plazma proteini ürünüdür.",
          },
          {
            label: "2. adım",
            explanation: "Özgül antikor immünoglobulini plazma hücresi üretir.",
          },
          {
            label: "3. adım",
            explanation:
              "Karaciğerin savunmaya katkısı, bütün antikorları hepatositin ürettiğini göstermez.",
          },
        ],
        answer: "Albümin: X; antikor: Y.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Organın savunma rolünü bütün savunma proteinlerinin tek kaynağı saymak.",
      },
    ],
    recall: [
      {
        prompt: "Safrayı kim üretir, kese ne yapar?",
        answer:
          "Hepatositler üretir; safra kesesi depolama ve yoğunlaştırmaya katılır.",
      },
      {
        prompt: "Portal kan ve koledok aynı mı?",
        answer:
          "Hayır. Portal yol kandır; koledok safranın duodenuma giden kanalıdır.",
      },
      {
        prompt: "Safra damlayı küçültünce bağ kesilir mi?",
        answer:
          "Zorunlu değil. Yüzey artışı fiziksel; ester hidrolizi enzimli kimyasal olaydır.",
      },
      {
        prompt: "Karaciğer bütün antikorları yapar mı?",
        answer:
          "Hayır. Antikorları plazma hücreleri üretir; karaciğerin başka sentez ve savunma görevleri vardır.",
      },
    ],
    items: [
      [
        "Safranın üretim ve depolanması için temel eşleştirme hangisidir?",
        "Karaciğer üretir; safra kesesi depolar ve yoğunlaştırır",
        [
          "Safra kesesi üretir; böbrek villusta depolar",
          "Pankreas üretir; aort depolar",
          "Trombosit üretir; mide çekirdeği depolar",
          "Dalak üretir; özofagus laktealinde tutulur",
        ],
        "Üretici hücre ile depoyu ayır.",
        "Hepatositler safra üretir; kese bu salgıyı depolayıp yoğunlaştırabilir. Kese olmaması tek başına üretimin tamamen durması değildir.",
      ],
      [
        "Verilen anatomik modelde hepatik kanal ortak safra yoluna doğrudan bağlı. Yalnız sistik kanal tıkalıysa hangisi mümkündür?",
        "Kese yolu aksarken karaciğerden duodenuma doğrudan safra akışı sürmesi",
        [
          "Bütün hepatositlerin zorunlu anında yok olması",
          "Portal kanın artık hiçbir damardan akamaması",
          "Safra üretiminin kesin sıfır olması",
          "Kesenin artık tek antikor üreticisi olması",
        ],
        "Yalnız engellenen bağlantıyı kapat.",
        "Sistik kanal kese bağlantısıdır; açık hepatik-ortak yol üzerinden çıkış sürebilir. Ortak yolun tıkanması farklı bir seçici senaryodur.",
      ],
      [
        "Hangi yol normalde karaciğere kan girişi sağlar?",
        "Hepatik arter ve portal toplardamar",
        [
          "Yalnız koledok ve sistik kanal",
          "Yalnız üreter ve özofagus",
          "Safra kesesi lümeni ve pankreas kanalı",
          "Dış anal sfinkter ve lakteal boşluk",
        ],
        "Safra yolunu kan damarından ayır.",
        "Karaciğer arteriyel kanın yanında sindirim organlarından portal kan alır. Hepatik venler çıkış yoluna katılır; safra kanalları ayrı salgı ağıdır.",
      ],
      [
        "Büyük yağ damlasının safra desteğiyle küçük damlalara ayrılması neyi doğrudan gösterir?",
        "Fiziksel dağılım ve enzim erişimi için ara yüz artışını",
        [
          "Bütün ester bağlarının kesin koptuğunu",
          "Bütün yağların aminoaside döndüğünü",
          "Safranın bir proteaz olduğunu",
          "Yağın toplam hacminin zorunlu sıfırlandığını",
        ],
        "Yüzey değişimiyle moleküler bağ kesimi aynı değildir.",
        "Emülsiyon yağ-su ara yüzünü artırır. Lipazın katalizlediği ester hidrolizi farklı olaydır; fiziksel parçalanma tek başına kimyasal ürün sayısını belirlemez.",
      ],
      [
        "Kenar uzunluğu 2 birim olan küp, her kenarı ikiye bölünerek 8 küçük küpe ayrılıyor. Toplam yüzey ve hacim nasıl değişir?",
        "Yüzey 24’ten 48’e çıkar; hacim 8 kalır",
        [
          "Yüzey 24 kalır; hacim 64 olur",
          "Yüzey 8 olur; hacim 0 olur",
          "Yüzey 48 olur; hacim 16 olur",
          "İkisi de kesin iki katına çıkar",
        ],
        "Her küçük küpün kenarı 1’dir.",
        "Başlangıç yüzeyi 6×4=24, hacmi 8’dir. Sekiz küçük küpün toplam yüzeyi 8×6=48, hacmi 8×1=8 olur. Bu yalnız geometrik dağılım modelidir.",
      ],
      [
        "100 birim safra tuzu havuzundan 80 birim geri dönüyor. Başka akış yok ve havuz korunacaksa yeni sentez kaç birimdir?",
        "20",
        ["80", "100", "180", "0"],
        "Geri dönmeyen kısmı tamamla.",
        "Kayıp 100−80=20’dir. Geri kazanılan 80 birim yeniden kullanılabildiği için her tur 100 yeni birim sentez gerektiği sonucu çıkmaz.",
      ],
      [
        "Karaciğerin sentez görevini doğru sınırlayan ifade hangisidir?",
        "Albümin ve fibrinojen sentezine katılır; özgül antikorları plazma hücreleri üretir",
        [
          "Bütün antikorlar yalnız hepatositten çıkar",
          "Hiçbir plazma proteini karaciğerde yapılmaz",
          "Her globulin zorunlu tek hepatosit ürünüdür",
          "Karaciğer yalnız safra depolar ve başka iş yapmaz",
        ],
        "Plazma proteinlerini tek kaynakta toplama.",
        "Karaciğer önemli plazma proteinleri sentezler; immünoglobulin üretimi plazma hücrelerinin görevidir. Savunmaya katkı bütün savunma proteinlerini tek hücreye mal etmez.",
      ],
      [
        "Aminoasit metabolizmasından gelen amonyağın yönetiminde karaciğerin önemli katkısı hangisidir?",
        "Üre sentezi; ürenin kanla böbreğe taşınıp uzaklaştırılması",
        [
          "Bütün amonyağı direkt mide boşluğunda dişe çevirmek",
          "Üreyi yalnız safra kesesi içinde eritrosit yapmak",
          "Her azot atomunu zorunlu glikojene dönüştürmek",
          "Böbreğin bütün kan girişini kalıcı kapatmak",
        ],
        "Sentez organı ile başlıca atılım organını ayır.",
        "Karaciğer üre sentezine, böbrek ürenin uzaklaştırılmasına katılır. Bu görev ayrımı bütün azotlu moleküllerin aynı son ürüne zorunlu gittiği genellemesi değildir.",
      ],
      [
        "Biyotransformasyon için hangi ifade doğrudur?",
        "Bir maddenin dönüştürülmesi her koşulda tamamen zararsız hâle geldiğini kanıtlamaz",
        [
          "Karaciğer bütün maddeleri sınırsız zararsız yapar",
          "Her dönüşüm mutlaka vitamin sentezidir",
          "Bütün dönüşümler safra kesesinde antikorla gerçekleşir",
          "Dönüşüm varsa miktar ve ürünün önemi yoktur",
        ],
        "Dönüşümün ürünü ve miktarı da önemlidir.",
        "Karaciğerin kimyasal dönüşümleri atılımı destekleyebilir; bazı ara ürünler zararlı olabilir. Bu yüzden organa sahip olmak her maruziyeti güvenli kılmaz.",
      ],
      [
        "Sarılık ile safra akışını doğru ilişkilendiren açıklama hangisidir?",
        "Kanal tıkanması olası nedendir; bütün sarılıkların tek nedeni değildir",
        [
          "Her sarılık yalnız tek safra taşıdır",
          "Bilirubin hiçbir zaman metabolizmayla ilişkili değildir",
          "Sarılık görülürse bütün kan damarları kesin yoktur",
          "Tek renk değişimi aynı kişisel tedaviyi zorunlu belirler",
        ],
        "Olası bir yolu bütün nedenlerin yerine koyma.",
        "Bilirubin oluşumu, işlenmesi ve atılımı farklı basamaklardır. Tıkanma yanında başka mekanizmalar da sarılığa katkı verebilir; tek bulgu mekanizmayı kesinleştirmez.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 73 ve 76–77; OGM Dersler Cepte Sindirim PDF 13; OGM Sindirim II PDF 3 ve 19 gerçek öğretim ve şekilleriyle karşılaştırılmış özgün anlatım ve sorular. Resmî sınav sorusu değildir.",
  },
  {
    id: "sindirim-pankreas",
    topic: "detail-310",
    title: "Pankreas: enzim kanalı, bikarbonat ve ayrı hormon yolu",
    minutes: 48,
    objectives: [
      "Asiner, kanal ve adacık bölümlerini hedef ve salgı yolu bakımından ayır.",
      "Pankreatik enzimleri substratları ve öncül etkinleşmeleriyle ilişkilendir.",
      "Sekretin ve CCK yanıtlarını seçici kanal deneyiyle açıkla.",
      "Verilen asit-baz eşdeğer bilançosunu pH hesabıyla karıştırmadan çöz.",
    ],
    sections: [
      {
        title: "Midenin arkasında bir karma bez",
        paragraphs: [
          "Pankreas mideyle komşu, baş bölümü duodenum kıvrımıyla ilişkili bir bezdir. Lobüllerdeki asiner hücreler ve bunların boşaldığı kanallar ekzokrin örgüyü oluşturur. Aralara dağılmış endokrin adacıklar başka hücre gruplarıdır. Aynı organda bulunmak salgıların aynı boşluğa gittiği anlamına gelmez.",
          "Pankreas sıvısı ana pankreas kanalıyla duodenuma taşınır; Wirsung bu ana kanalın adıdır. Safra yolu olan koledok farklı organdan gelir. Öğretim şeması ortak son giriş gösterebilir; kanal varyasyonları bulunduğundan her gerçek anatomiyi tek çizgiye zorlamamak gerekir.",
        ],
      },
      {
        title: "Asiner salgı ile kanal salgısı birlikte çalışır",
        paragraphs: [
          "Asiner hücreler enzimlerden zengin salgı üretir. Kanal hücrelerinin su ve bikarbonat katkısı bu içeriğin taşınmasına ve asidik kimusun nötralizasyonuna yardım eder. Enzimin var olmasıyla çalışacağı ortamın uygun olması iki farklı koşuldur.",
          "Salgı karışımı su, iyon ve farklı enzimler içerir. Hacim artışı tek başına enzim derişiminin aynı oranda arttığını göstermez; toplam miktar ile derişim ayrılır. Bir oyuncak deneyde kanal bileşeni eksikken enzim üretimi devam edebilir, fakat lümene ulaşma ve uygun ortam etkilenir.",
        ],
      },
      {
        title: "Karbonhidrat ve lipit enzimleri",
        paragraphs: [
          "Pankreatik amilaz nişasta ve glikojenin uygun bağlarını parçalayarak küçük karbonhidrat ürünlerine ulaşılmasını destekler. Son disakkarit parçalanması fırçamsı kenar enzimleriyle tamamlanabilir. Pankreas amilazı bütün karbonhidrat türlerini, özellikle selülozu aynı biçimde kesmez.",
          "Pankreatik lipaz yağ sindiriminde önemlidir; safra destekli dağılım ve uygun yardımcı koşullar etkiyi destekler. Baskın ürünler yağ asitleri ve monoasilgliserol içerebilir. Bütün trigliseridin gliserol ve üç yağ asidine tam hidrolizi, açıkça öyle verilen son nokta modelidir; her gerçek bağırsak anındaki tek ürün listesi değildir.",
        ],
      },
      {
        title: "Proteaz öncülleri ve koruyucu etkinleşme yeri",
        paragraphs: [
          "Tripsinojen, kimotripsinojen ve prokarboksipeptidaz gibi öncüller pankreatik protein sindiriminin örnekleridir. Duodenum yüzeyindeki enteropeptidaz tripsin oluşumunu başlatır; tripsin başka proteaz öncüllerinin etkinleşmesine katılır. Bu mekânsal ayrım, etkin proteazların bezin kendi proteinlerine etkisini sınırlayan düzenlerin bir parçasıdır.",
          "Bütün pankreas enzimlerini inaktif proteaz öncülü sayma: amilaz, lipaz ve nükleaz ayrı sınıflardır. Erken ve uygunsuz proteaz etkinleşmesi doku hasarı mekanizmalarıyla ilişkilendirilebilir; fakat tek deney düğmesi bir hastaya tanı koymaz. Kaynak-hedef ve etkinleşme koşulları ayrı öğretilir.",
        ],
      },
      {
        title: "Nükleazdan son parçalama basamaklarına",
        paragraphs: [
          "Pankreatik nükleazlar besinle gelen DNA ve RNA’nın hidrolizine katılır. Daha küçük nükleotitler ve bağırsak yüzeyindeki devam enzimleriyle şeker, fosfat ve azotlu baz bileşenlerine ilerlenir. Nükleazın substratı nükleik asittir; protein için proteaz, yağ için lipaz ayrımı korunur.",
          "Sindirim ürünü oluşturmak ile ürünün epitele alınması aynı olay değildir. Pankreas enzimleri kanal içinden duodenuma gelir; emilmiş ürünler daha sonra kan veya lenf yollarını kullanır. Pankreas kanalını besinleri karaciğere taşıyan portal damar gibi okumak iki yönü karıştırır.",
        ],
      },
      {
        title: "Asit geldiğinde sekretin desteği",
        paragraphs: [
          "Duodenal asit sekretin salımını destekler. Hormon kana katılıp pankreasın sulu-bikarbonat salgısına katkı verir. Bikarbonat lümene kanal yoluyla ulaşır ve asit eşdeğerlerini nötralize etmeye yardım eder. Hormonun kan yolu ile iyonun kanal yolu ayrı çizilmelidir.",
          "Bikarbonat yanıtı enzimlerin uygun ortamda çalışmasına yardım eder ama her koşulda tek sabit pH üretmez. Tampon bileşimi, giriş miktarı ve karışma önemlidir. Modelde yalnız eşdeğer miktarlarını çıkarmak mümkündür; pH bulmak için derişim, hacim ve kimyasal denge bilgileri ayrıca gerekir.",
        ],
      },
      {
        title: "Besin geldiğinde CCK ve sinirsel katkı",
        paragraphs: [
          "Yağ ve protein ürünleri gibi bağırsak girdileri CCK yanıtını destekler. CCK asiner enzim salgısına ve safra kesesi yanıtına katılır; mide boşalmasıyla bağırsak iş yükü de eşgüdümlenir. Safra kesesi yanıtı pankreasın kendi içinde safra üretildiğini göstermez.",
          "Vagus ve yerel sinirsel yollar salgıya katkı verebilir; sekretin ve CCK etkileri de etkileşir. Temel eşleştirme öğrenilirken her gerçek salgının yalnız bir hormondan kaynaklandığı iddia edilmez. Bir habercinin etkisi için hedefin yanıt verme koşulu da gerekir.",
        ],
      },
      {
        title: "Endokrin adacığın yolu kanaldan ayrıdır",
        paragraphs: [
          "Adacıkların beta hücrelerinden insülin, alfa hücrelerinden glukagon gibi hormonlar kana verilir. Bunlar besin bağlarını duodenum lümeninde kesen sindirim enzimleri değildir. Kan glikozunun düzenlenmesi önceki endokrin konunun devamıdır; burada asıl yeni ayrım organ içindeki iki ayrı çıkış yoludur.",
          "Sadece ekzokrin ana kanal kapatılmış ve adacık kan dolaşımı sağlam verilmişse, pankreatik hormonların kana çıkışı sırf bu nedenle zorunlu sıfırlanmaz. Gerçek yaygın organ hasarı başka süreçleri birlikte etkileyebilir; seçici deney ile bütün organın yokluğu aynı koşul değildir.",
        ],
      },
      {
        title: "Asit-baz eşdeğeri hesabını sınırla",
        paragraphs: [
          "Modelde 8 birim asit eşdeğeri ile 6 birim bikarbonat eşdeğeri tam tepkimeye giriyorsa 6 birim asit nötralize edilir ve 2 birim asit kalır. Bu, verilen bire bir eşdeğer tanımına dayanır. Asit ve baz miktarını ayrı stoklar olarak tutmak negatif miktar hatasını önler.",
          "Kanal kapalıysa üretilen bikarbonatın duodenuma teslim edilen miktarı bu seçici modelde sıfırdır. Üretim, teslim ve etki böylece ayrı denetlenir. Bu hesabın 2 birim asit kalır sonucu doğrudan pH 2 demek değildir; pH logaritmik derişim ölçüsüdür.",
        ],
      },
      {
        title: "Derişim, toplam miktar ve nedensellik",
        paragraphs: [
          "Örnek olarak 10 mL sıvıda 20 birim enzim varsa derişim 2 birim/mL’dir. Aynı toplam enzim 20 mL’ye dağılırsa 1 birim/mL olur. Salgı hacmi artarken toplam enzim veya derişim için ayrı ölçüm gerektiği bu hesapla görülür.",
          "Enzim ulaşımı aksayınca yağlı içerik işlenmesi etkilenebilir; aynı görünümün bütün olası nedenlerini tek kanala indirgememek gerekir. Öğrenme modelinde değişen parametrenin hangi oku etkilediğini belirt. Üretim organı, kanal, hedef ortam ve kimyasal işlem sırasını izlemek yeni sindirim sorularına aktarılır.",
        ],
      },
    ],
    examples: [
      {
        title: "Sekiz ile altı eşdeğer",
        prompt:
          "Verilen kapalı modelde asit 8 eşdeğer, teslim edilmiş bikarbonat 6 eşdeğer. Tepkime bire bir. Kalan?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Nötralize edilen miktar küçük stok kadar, yani 6’dır.",
          },
          {
            label: "2. adım",
            explanation: "Asit 8−6=2, baz 6−6=0 kalır.",
          },
          {
            label: "3. adım",
            explanation:
              "Bunlar miktardır; hacim ve denge olmadan pH bulunmaz.",
          },
        ],
        answer: "2 eşdeğer asit, 0 eşdeğer baz.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Kalan miktarı doğrudan pH sayısı sanmak.",
      },
      {
        title: "Üretildi ama ulaşmadı",
        prompt:
          "Asiner enzim ve bikarbonat üretiliyor. Yalnız ana ekzokrin kanal kapalı; adacık dolaşımı sağlam. Hangi yollar etkilenir?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Kanal içeriğinin duodenuma teslimi engellenir.",
          },
          {
            label: "2. adım",
            explanation:
              "Adacığın hormon çıkışı kanadır ve bu seçici engelden ayrı verilmiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "Ekzokrin ulaşım aksar; bütün endokrin salımın durduğu sonucu çıkmaz.",
          },
        ],
        answer: "Kanal-lümen yolu engelli; verilen kan-hormon yolu korunur.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Bir organın iki çıkışını tek hat sanmak.",
      },
      {
        title: "Aynı enzim, iki hacim",
        prompt:
          "Toplam 20 birim enzim önce 10 mL, sonra 20 mL sıvıya dağılmış. Enzim kaybı yok. Derişimler?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk derişim 20/10=2 birim/mL.",
          },
          {
            label: "2. adım",
            explanation: "İkinci derişim 20/20=1 birim/mL.",
          },
          {
            label: "3. adım",
            explanation:
              "Hacim ikiye çıkınca aynı toplamın derişimi yarıya iner; toplam enzim 20 kalır.",
          },
        ],
        answer: "2 ve 1 birim/mL.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Hacim arttı diye enzim miktarının da kesin arttığını sanmak.",
      },
      {
        title: "Kaynak, öncül ve başlangıç",
        prompt:
          "Pankreas tripsinojeni salgılıyor; duodenum yüzeyinde enteropeptidaz var. İlk proteaz etkinleşmesini ve kaynağı açıkla.",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Tripsinojen pankreas kaynaklı öncüldür.",
          },
          {
            label: "2. adım",
            explanation:
              "Enteropeptidaz bağırsak yüzeyinde tripsin oluşumunu başlatır.",
          },
          {
            label: "3. adım",
            explanation:
              "Tripsin bazı başka öncülleri etkinleştirir; pankreasta üretilmek ve bağırsakta etkinleşmek çelişmez.",
          },
        ],
        answer: "Pankreatik öncül, duodenal başlangıç, etkin proteaz ağı.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Enteropeptidazı pankreasın bütün enzimlerini yapan hücre saymak.",
      },
    ],
    recall: [
      {
        prompt: "Asiner ve kanal salgısının ayrımı?",
        answer:
          "Asiner bölüm enzimlere; kanal bölümü su-bikarbonat katkısına örnektir; ikisi aynı lümene birlikte ulaşabilir.",
      },
      {
        prompt: "Sekretin ve CCK temel farkı?",
        answer:
          "Asit-sekretin/bikarbonat; yağ-protein ürünü-CCK/enzim ve safra yanıtı.",
      },
      {
        prompt: "Kanal engeli bütün hormonları kapatır mı?",
        answer:
          "Seçici ekzokrin kanal engelinden sağlam adacık dolaşımının zorunlu durduğu sonucu çıkmaz.",
      },
      {
        prompt: "Asit miktarı ile pH aynı mı?",
        answer:
          "Hayır. Eşdeğer bilançosu miktarı verir; pH için derişim ve denge koşulları gerekir.",
      },
    ],
    items: [
      [
        "Pankreasın ekzokrin ve endokrin çıkışları için doğru eşleştirme hangisidir?",
        "Sindirim salgısı kanalla duodenuma; adacık hormonları kana",
        [
          "İnsülin yalnız koledokla safraya; lipaz yalnız aorta",
          "İki salgı da zorunlu idrar kesesine",
          "Enzimler yalnız kemik iliğine; hormonlar yalnız dişe",
          "Her iki çıkış da tek sinir aksonudur",
        ],
        "Hedef bölmeyi belirle.",
        "Ekzokrin enzim ve iyon salgısı kanal-lümen yoluna; insülin/glukagon gibi adacık hormonları kan yoluna katılır. Aynı organ iki farklı salgı örgüsü taşır.",
      ],
      [
        "Duodenal asit, sekretin ve pankreas ilişkisi için hangisi uygundur?",
        "Sekretin bikarbonatlı salgıyı destekler; bikarbonat lümene kanalla ulaşır",
        [
          "Sekretin doğrudan nişastayı kanda keser",
          "Bikarbonat pankreastan bir sinir hücresi olarak çıkar",
          "Asit bütün hormonları safra kesesinde üretir",
          "Sekretin yalnız eritrositlerin oksijen pigmentidir",
        ],
        "Haberin yolu ile salgının yolunu ayır.",
        "Sekretin kanda hedefe haber taşır; kanal hücrelerinin bikarbonat katkısı lümene ulaşır. Hormonun kendisi nötralizasyon iyonuyla aynı molekül değildir.",
      ],
      [
        "Yağ ve protein ürünleriyle desteklenen temel CCK yanıtı hangisidir?",
        "Pankreasın enzimce zengin salgısının desteklenmesi",
        [
          "Pankreasın bütün enzimlerinin anında antikora dönüşmesi",
          "Her koşulda bütün kasların felç olması",
          "Safra üretiminin zorunlu sadece pankreasa taşınması",
          "Bütün bikarbonatın DNA’ya dönüşmesi",
        ],
        "CCK’nin temel sindirim hedefini düşün.",
        "CCK enzim salgısı ve safra kesesi yanıtına katkı verir; gerçek yanıtlar başka hormon ve sinirlerle etkileşir. Enzim salgısı ile safra üretimi aynı görev değildir.",
      ],
      [
        "Seçici deneyde yalnız ana ekzokrin kanal tıkalı, adacıkların kan dolaşımı sağlam. Hangisi kesin çıkarılamaz?",
        "İnsülinin kana salımının sırf bu engelle tamamen durduğu",
        [
          "Duodenuma kanal içeriğinin ulaşmasının aksayabildiği",
          "Üretimle teslimin farklı basamak olduğu",
          "Kanal yolunun kan yolundan farklı olduğu",
          "Salgı bezinin iki farklı örgü taşıdığı",
        ],
        "Ekzokrin engeli endokrin kana otomatik yayma.",
        "Adacık hormonları doğrudan kana verilir. Seçici kanal tıkanması, ayrıca organ hasarı veya dolaşım engeli verilmedikçe bütün hormon salımının yokluğunu kanıtlamaz.",
      ],
      [
        "Bire bir eşdeğer modelde 8 asit ve 6 teslim edilmiş bikarbonat birimi tepkimeye giriyor. Kalan asit kaç birim?",
        "2",
        ["0", "6", "8", "14"],
        "Küçük stok kadar nötralizasyon olur.",
        "Altı birim asit nötralize edilir; 8−6=2 kalır. Sonuç pH değil, verilen ölçekte kalan asit miktarıdır.",
      ],
      [
        "Bire bir eşdeğer modelde duodenumda 8 asit birimi var. Pankreasta 6 baz birimi üretiliyor, fakat tek teslim kanalı tamamen kapalı. Başka giriş yoksa kaç asit birimi kalır?",
        "8",
        ["2", "0", "6", "14"],
        "Üretimden farklı olarak teslim sıfır.",
        "Üretilen baz bu seçici modelde lümene ulaşamaz. Teslim edilen miktar 0 olduğundan asit 8−0=8 kalır; üretimi otomatik etki saymak yanlıştır.",
      ],
      [
        "Toplam 20 birim enzim 10 mL’den 20 mL’ye aynı kayıpsız miktarla dağıtılıyor. Son derişim kaç birim/mL?",
        "1",
        ["2", "10", "20", "40"],
        "Toplamı son hacme böl.",
        "20/20=1 birim/mL. İlk derişim 2 idi; toplam korunurken hacim artışı derişimi azaltır. Bu tek başına gerçek sindirim hızını belirlemez.",
      ],
      [
        "Pankreas proteazlarının korunma ve etkinleşmesi için doğru açıklama hangisidir?",
        "Bazıları öncül salgılanır; duodenal enteropeptidaz tripsin başlangıcına katılır",
        [
          "Bütün pankreas enzimleri aynı inaktif proteinazdır",
          "Tripsinojen yalnız safra kesesinde üretilir",
          "Pepsin bütün pankreas enzimlerini aortta etkinleştirir",
          "Hiçbir proteaz proteine etki edemez",
        ],
        "Bazıları ile bütün sözcüklerini ayır.",
        "Proteaz zimojenleri mekânsal etkinleşme düzeni sağlar. Amilaz, lipaz ve nükleazın hepsi aynı proteaz öncülü değildir; kaynak ve substratlar ayrılır.",
      ],
      [
        "Pankreatik amilaz için hangi substrat örneği uygundur?",
        "Nişasta ve glikojenin uygun bağları",
        [
          "Yalnız hemoglobinin bütün peptit bağları",
          "Yalnız trigliseridin ester bağları",
          "Her selüloz bağı için zorunlu aynı etkinlik",
          "Yalnız DNA’nın fosfodiester bağları",
        ],
        "Enzim sınıfını substrat bağıyla eşleştir.",
        "Amilaz uygun karbonhidrat bağlarını hidroliz eder. Selülozun bağ düzeni farklıdır; protein, yağ ve nükleik asit için başka enzim sınıfları gerekir.",
      ],
      [
        "Bir model sonunda 2 eşdeğer asit kaldığı bulunuyor. Hacim ve kimyasal denge verisi yok. Hangi sonuç çıkarılamaz?",
        "Çözeltinin pH’sının kesin 2 olduğu",
        [
          "Verilen ölçekte asit kaldığı",
          "Başlangıç ve teslim miktarlarının ayrı okunması gerektiği",
          "Eşdeğer bilançosunun bir miktar hesabı olduğu",
          "pH için ek bilgi gerektiği",
        ],
        "Logaritmik derişim ölçüsünü stok miktarı sayma.",
        "pH hidrojen iyonu etkinliği/derişimiyle ilişkilidir. Eşdeğer miktarı tek başına hacim ve tampon dengesini vermediği için aynı sayı pH olarak kullanılamaz.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 72 ve 75–76; OGM Dersler Cepte Sindirim PDF 12 ve 14–15; OGM Sindirim II PDF 5 ve 20 gerçek kaynaklarıyla karşılaştırılmış özgün anlatım, modeller ve sorular. Resmî sınav sorusu değildir.",
  },
  {
    id: "dolasim-kalp",
    topic: "detail-311",
    title: "Kalp: odacık, kapak, basınç ve ritim",
    minutes: 48,
    objectives: [
      "Anatomik sağ-sol yönüyle küçük ve büyük dolaşımı dört odacıkta izle.",
      "Kapakların basınç farkına göre değişimini kalp çevrimiyle ilişkilendir.",
      "Uyarı iletimini kalp kasının kendiliğinden ritmi ve dış düzenlemeyle ayır.",
      "Atım hacmi, debi ve çevrim süresini verilen sayılardan doğru birimle hesapla.",
    ],
    sections: [
      {
        title: "İki dolaşım, tek seri akış",
        paragraphs: [
          "İnsanda sağ kalp sistemik dönüş kanını akciğere, sol kalp akciğerden dönen kanı vücuda pompalar. Bir çizimde hastanın anatomik sağı, karşıdan bakan izleyenin soluna düşebilir; sağ ve sol odacık etiketleri bu yüzden açık verilmelidir. Renk, odacığın adının yerine geçmez.",
          "Küçük dolaşım sağ ventrikülden pulmoner arterlerle akciğere, pulmoner venlerle sol atriyuma uzanır. Büyük dolaşım sol ventrikülden aortla başlayıp vena kavalarla sağ atriyuma döner. İki pompa seri bağlıdır; uzun vadeli dengede biri diğerinin iki katı kanı sürekli taşıyamaz.",
        ],
      },
      {
        title: "Dört odacık ve ayırıcı duvar",
        paragraphs: [
          "Üstteki atriyumlar kanı alır, alttaki ventriküller çıkışa pompalar. Sağ ve sol bölmeleri ayıran septum normal erişkin dolaşımında karışmayı sınırlar. Her atriyum ile kendi ventrikülü arasında bağlantı vardır; sağ atriyumdan doğrudan sol ventriküle açık normal bir kapı çizilmez.",
          "Sol ventrikülün kas duvarı sistemik basınca karşı iş ürettiği için daha kalındır. Bu, her atımda sağ ventrikülün mutlaka yarısı kadar kan taşıdığı anlamına gelmez. Basınç ve hacim ayrı niceliklerdir. Anatomik kesitin kalın duvarını seçerken akışın hangi çıkışa bağlandığını da denetle.",
        ],
      },
      {
        title: "Dört kapak ve destek düzeni",
        paragraphs: [
          "Sağ atriyum–ventrikül arasında triküspit, sol tarafta mitral kapak bulunur. Pulmoner ve aort kapakları ventrikül çıkışlarındaki yarımay kapaklarıdır. Kapaklar kanın geri kaçmasını sınırlar; kendi başlarına ayrı bir kas pompası gibi kanı itmez.",
          "Atriyoventriküler kapakların korda ve papiller kas desteği, ventrikül kasılırken yaprakçıkların atriyuma ters dönmesini önlemeye katılır. Papiller kasın kasılması kapağı aktifçe açmakla aynı olay değildir. Yarımay kapakları aynı korda düzenine sahip değildir. Şemada destek ile akış kapısını ayır.",
        ],
      },
      {
        title: "Duvarın beslenmesi odacık kanından ayrı",
        paragraphs: [
          "Endokart iç yüzü örter, miyokart kuvvet üreten kas tabakasıdır. Perikart kalbi çevreleyen kese ve ilişkili zar düzenidir; hepsini tek aynı hücre katmanı saymak yanlıştır. Yüzeyler arasındaki sıvı hareket sırasında sürtünmeyi azaltmaya yardım eder.",
          "Kalp duvarının oksijen ve besin gereksinimi koroner damarlarla karşılanır. Odacığın içinden kan geçmesi, bütün kas hücrelerinin o boşluktan doğrudan yeterince beslendiğini göstermez. Koroner akışın aksaması pompa dokusunu etkileyebilir; damar yeri ve etkilenen doku ayrı ilişkilendirilir.",
        ],
      },
      {
        title: "Ritmin başlangıcı ve iletim sırası",
        paragraphs: [
          "Sinoatriyal düğüm kalbin normal temel ritminde öncül rol oynar. Uyarı atriyumlara, atriyoventriküler düğüme, His demeti ve dalları üzerinden Purkinje ağına yayılır. Bu özelleşmiş kalp dokusu düzeni, atriyum ve ventrikül etkinliğini zaman bakımından eşgüdümler.",
          "AV bölgedeki gecikme ventriküllerin dolumuna zaman kazandırır; uyarının hiç iletilmediği anlamına gelmez. Kalbin miyojenik özellikleri, hızının sinirlerden hiç etkilenmediği iddiası değildir. Elektrokardiyogram elektriksel değişimleri kaydeder; her dalgayı doğrudan tek kapak açıklığı ölçümü sayma.",
        ],
      },
      {
        title: "Sinir ve hormonla hız düzenlenebilir",
        paragraphs: [
          "Sempatik katkı ve adrenalin gibi dolaşımdaki sinyaller kalp hızı ve kasılma özelliklerini etkileyebilir. Parasempatik vagus katkısı çoğunlukla hızın azaltılmasına yardım eder. Gerçek sonuçlar reseptör, doz ve başka koşullara bağlıdır; burada kişisel nabız hedefi üretilmez.",
          "Vagus ucundaki asetilkolin bu bağlamda nörotransmiterdir; kanla uzak hedefe giden adrenalinle aynı yol değildir. Ateş, etkinlik ve otonom durum gibi etkenlerle kalp periyodu değişebilir. Kaynaktaki yaklaşık 0,8 saniyelik çevrim, her insanda yaşam boyu sabit süre sayılmaz.",
        ],
      },
      {
        title: "Dolum ve atriyum kasılması",
        paragraphs: [
          "Ventrikül basıncı atriyumdan düşük olduğunda atriyoventriküler kapaklar açılır ve kan ventriküle geçer. Çevrimin dolum döneminin önemli kısmı pasif basınç farkıyla gerçekleşebilir. Atriyum kasılması kalan doluma katkı yaparken ventrikül henüz gevşeme dönemindedir.",
          "Bu nedenle atriyum sistolü ile ventrikül sistolünü aynı an diye ezberleme. Diyastol de kalbin tamamen cansız veya hiç enerji kullanmayan bir yapı olması değildir. Kapak durumunu açıklamak için hangi iki bölmenin basınçlarını kıyasladığını açıkça yaz.",
        ],
      },
      {
        title: "Hacim sabit kasılmadan fırlatmaya",
        paragraphs: [
          "Ventrikül kasılması başlarken basınç artar ve atriyoventriküler kapaklar kapanır. Çıkış basıncı henüz aşılmadıysa yarımay kapakları da kapalıdır: kısa izovolümetrik kasılmada tüm kapaklar kapalı, ventrikül hacmi yaklaşık sabittir. Kasılma olması her an kan çıkışı olduğu anlamına gelmez.",
          "Ventrikül basıncı aort veya pulmoner arter basıncını aşınca ilgili yarımay kapak açılır ve fırlatma başlar. Bu evrede AV kapaklar kapalı kalır. Üfleme gibi dış bir olay değil, basınç farkı kapak durumunu belirler. Sağ ve sol tarafta mutlak basınçlar aynı olmak zorunda değildir.",
        ],
      },
      {
        title: "Gevşeme, kalp sesi ve yeni dolum",
        paragraphs: [
          "Fırlatma sonunda ventrikül gevşeyince basıncı düşer; çıkıştaki geri akım eğilimi yarımay kapaklarını kapatır. AV kapak henüz açılmadan tüm kapakların kapalı olduğu izovolümetrik gevşeme görülebilir. Ventrikül basıncı atriyumun altına inince yeni dolum başlar.",
          "Birinci ve ikinci kalp sesleri temel olarak AV ve yarımay kapak kapanmalarıyla ilişkili mekanik titreşimlerdir. Sesin varlığı doğrudan bir kapağın açıldığı veya her kalp hastalığının bulunduğu anlamına gelmez. Çevrimi okurken kas durumu, hacim değişimi ve kapak durumunu ayrı satırlarda izle.",
        ],
      },
      {
        title: "Atım hacminden dakikalık debiye",
        paragraphs: [
          "Atım hacmi, dolum sonu ventrikül hacminden kasılma sonu kalan hacmin çıkarılmasıyla bulunur. Dolum sonu 120 mL ve kalan 50 mL ise atım hacmi 70 mL’dir. Dakikada 75 atımda debi 70×75=5.250 mL/dakika, yani 5,25 L/dakika olur.",
          "Bir çevrimin süresi 60 saniyenin dakikadaki atım sayısına bölünmesidir; 75 için 0,8 saniyedir. Sağ ve sol kalp seri olduğundan sistemik debiyi bulmak için bu sonucu ikiyle çarpma. Hacim, hız ve basınç ayrı verilerdir; bu hesap tek başına kişisel sağlık tanısı koymaz.",
        ],
      },
    ],
    examples: [
      {
        title: "İlk damardan dönüşe tam yol",
        prompt:
          "Sağ ventrikülden çıkan kanın yeniden sağ atriyuma dönüşüne kadar temel sırayı kur.",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Pulmoner arter → akciğer kılcalı → pulmoner ven → sol atriyum.",
          },
          {
            label: "2. adım",
            explanation:
              "Mitral kapak → sol ventrikül → aort → sistemik kılcallar.",
          },
          {
            label: "3. adım",
            explanation:
              "Sistemik venler → vena kavalar → sağ atriyum; damar adları akış yönüne göre korunur.",
          },
        ],
        answer: "Akciğer ve vücut devreleri seri sırayla tamamlanır.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Pulmoner arterin oksijence daha az kan taşımasını damar adının yanlışlığı saymak.",
      },
      {
        title: "Bütün kapaklar kapalı olabilir mi?",
        prompt:
          "Ventrikül kasılmaya başladı; basıncı atriyumdan yüksek ama çıkış arterinden düşük. Hangi kapak durumu?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Atriyuma geri akım eğilimi AV kapağı kapatır.",
          },
          {
            label: "2. adım",
            explanation:
              "Çıkış arter basıncı aşılmadığından yarımay kapak henüz açılmaz.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu izovolümetrik kasılmadır; hacim yaklaşık sabit, basınç artar.",
          },
        ],
        answer: "AV ve yarımay kapaklar kapalı.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Kasılma varsa mutlaka o anda fırlatma vardır sanmak.",
      },
      {
        title: "Bir kalbin dakikalık çıktısı",
        prompt:
          "Dolum sonu 120 mL, kasılma sonu 50 mL; hız 75 atım/dakika. Atım hacmi ve debi?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Atım hacmi 120−50=70 mL/atım.",
          },
          {
            label: "2. adım",
            explanation: "Debi 70×75=5.250 mL/dakika.",
          },
          {
            label: "3. adım",
            explanation:
              "1.000 mL=1 L ile 5,25 L/dakika; sağ ve sol pompa için tekrar toplanmaz.",
          },
        ],
        answer: "70 mL/atım; 5,25 L/dakika.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Seri pompaların debilerini ikiyle çarpmak.",
      },
      {
        title: "Ritimden süreye",
        prompt: "Bir modelde kalp 75 atım/dakika. Tek çevrim ortalama süresi?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Bir dakikayı 60 saniye olarak yaz.",
          },
          {
            label: "2. adım",
            explanation: "60/75=0,8 saniye/atım.",
          },
          {
            label: "3. adım",
            explanation:
              "Hız 100 olsaydı 0,6 saniye olurdu; hız arttıkça toplam çevrim süresi azalır. Evreler aynı oranda kısalmak zorunda değildir.",
          },
        ],
        answer: "0,8 saniye.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "75’i saniye cinsinden süre veya sabit evre payı saymak.",
      },
    ],
    recall: [
      {
        prompt: "Arter ve ven adını ne belirler?",
        answer: "Kalbe göre akış yönü; oksijen miktarı tek tanım değildir.",
      },
      {
        prompt: "Papiller kas kapağı mı açar?",
        answer:
          "AV yaprakçıkların ters dönmesini sınırlayan korda desteğine katılır; kapak açılması basınç farkıyla ilişkilidir.",
      },
      {
        prompt: "Tüm kapaklar ne zaman kapalı olabilir?",
        answer: "İzovolümetrik kasılma ve gevşeme evrelerinde.",
      },
      {
        prompt: "Debi nasıl hesaplanır?",
        answer:
          "Atım hacmi × atım sayısı/dakika; seri sağ ve sol pompa için ikiyle çarpılmaz.",
      },
    ],
    items: [
      [
        "Normal erişkin küçük dolaşımın doğru sırası hangisidir?",
        "Sağ ventrikül → pulmoner arter → akciğer → pulmoner ven → sol atriyum",
        [
          "Sol atriyum → aort → safra kesesi → sağ ventrikül",
          "Sağ ventrikül → vena kava → mide lümeni",
          "Sol ventrikül → pulmoner ven → sağ atriyum",
          "Sağ atriyum → koledok → akciğer",
        ],
        "Başlangıç odacığından akciğer dönüşüne kadar izle.",
        "Sağ ventrikül akciğer devresini besler. Pulmoner arter kalpten uzaklaşır, pulmoner ven kalbe döner; oksijen miktarı bu yön tanımını değiştirmez.",
      ],
      [
        "Ventrikül kasılmaya başlamış; basıncı atriyumdan yüksek fakat aort/pulmoner arterden düşük. Hangi durum uygundur?",
        "AV ve yarımay kapaklar kapalı; izovolümetrik kasılma",
        [
          "Bütün kapaklar açık ve hacim zorunlu artıyor",
          "Yalnız AV kapak açık, çıkış mutlaka var",
          "Yalnız yarımay açık, ventrikül hiç basınç üretmiyor",
          "Kapakların durumu basınçla hiç ilişkili değil",
        ],
        "İki ayrı basınç eşiğini denetle.",
        "Atriyuma doğru basınç AV kapağı kapatır, arter basıncı aşılmadığı için yarımay kapak açılmaz. Kasılma bu kısa evrede hacim değiştirmeden basıncı yükseltir.",
      ],
      [
        "Dolum sonu 120 mL, kasılma sonu kalan 50 mL ise atım hacmi kaç mL?",
        "70",
        ["50", "120", "170", "2,4"],
        "Dolumdan kalan hacmi çıkar.",
        "120−50=70 mL/atım. Ventrikülde kalan 50 mL de dışarı çıkmış gibi toplanmaz.",
      ],
      [
        "Atım hacmi 70 mL, hız 75 atım/dakika. Sistemik dakikalık debi kaç L/dakikadır?",
        "5,25",
        ["10,5", "0,525", "52,5", "1,05"],
        "Önce çarp, sonra mL’yi L’ye çevir.",
        "70×75=5.250 mL/dakika=5,25 L/dakika. Sağ ve sol kalp seri olduğundan sonuç ikiyle çarpılmaz.",
      ],
      [
        "Kalp hızı 75 atım/dakika olan modelde ortalama tek çevrim kaç saniyedir?",
        "0,8",
        ["75", "1,25", "4.500", "0,08"],
        "Bir dakikayı 60 saniye kullan.",
        "60/75=0,8 saniye/atım. Bu bütün insanlarda sabit çevrim veya her evrenin eşit süreli olduğu iddiası değildir.",
      ],
      [
        "Kalbin normal temel uyarı iletimi için uygun sıra hangisidir?",
        "SA düğüm → atriyumlar → AV düğüm → His/dallar → Purkinje",
        [
          "Purkinje → safra kesesi → SA",
          "Aort kapağı → karaciğer → AV",
          "AV → koledok → miyelin",
          "Yalnız vena kava içindeki eritrosit çekirdeği",
        ],
        "Öncü ritimden ventriküler ağa ilerle.",
        "Özelleşmiş kalp dokusu atriyum ve ventrikülleri zamanlar; AV gecikmesi dolum için katkı verir. İletim yolu salgı kanalı veya damar içi kan hücresi yolu değildir.",
      ],
      [
        "Sol ventrikül duvarının daha kalın olması için en uygun yorum hangisidir?",
        "Sistemik basınca karşı iş üretir; uzun vadede sağ ve sol debinin farklı olmasını zorunlu kılmaz",
        [
          "Sol kalp her dakika zorunlu sağın iki katı kan taşır",
          "Sağ kalpte hiç kas yoktur",
          "Sol ventriküle kan giremez",
          "Kalın duvar yalnız daha çok safra depolar",
        ],
        "Basınç ile taşınan hacmi ayır.",
        "Sol ventrikül sistemik dolaşımın yüküne karşı daha kalın miyokart taşır. İki devre seri olduğundan sürekli farklı debiler birikim doğurur; kalınlık iki kat hacim kuralı değildir.",
      ],
      [
        "Papiller kas ve korda düzeninin temel görevi hangisidir?",
        "AV yaprakçıkların ventrikül kasılırken atriyuma ters dönmesini sınırlamak",
        [
          "Yarımay kapakları ayrı pompalarla aktif açmak",
          "Kanı doğrudan safra yoluna geçirmek",
          "SA düğümü tamamen damara çevirmek",
          "Bütün koroner kanı odacık içine boşaltmak",
        ],
        "Destek görevini basınçla açılmadan ayır.",
        "Korda ve papiller destek AV kapaklarda geri kaçışı sınırlayan yapısal düzene katılır. Kapağın açılması basınç farkına bağlıdır; destek kapağı açan ayrı pompa değildir.",
      ],
      [
        "Kalp kası dokusunun beslenmesi için hangisi doğrudur?",
        "Koroner damarlar duvarı besler; odacıktan kan geçmesi tek başına bütün kas hücrelerine yeterli beslenme sağlamaz",
        [
          "Odacıkta kan varsa koroner damarlara hiç gerek yoktur",
          "Bütün kalp duvarı safra kesesinden beslenir",
          "Koroner damar yalnız sindirim enzimi üretir",
          "Kalp kasında hiç enerji kullanımı yoktur",
        ],
        "Odacık boşluğuyla duvarın damarını ayır.",
        "Miyokardın metabolik gereksinimi koroner dolaşımla desteklenir. Boşluktaki kanın varlığı bütün dokuya doğrudan yeterli difüzyon olduğunu kanıtlamaz.",
      ],
      [
        "Vagus ucundan kalbe etki eden asetilkolin bu bağlamda nasıl sınıflanır?",
        "Sinir ucunun nörotransmiteri",
        [
          "Yalnız safra enzimi",
          "Yalnız kanda uzak hedefe giden adrenalin hormonu",
          "Bir eritrosit kromozomu",
          "Mitral kapağın kemik dokusu",
        ],
        "Salınma yolunu dikkate al.",
        "Asetilkolin burada sinaptik haberci olarak görev yapar. Kalbin miyojenik ritmi dış sinirsel düzenlemenin olmadığı anlamına gelmez; hormonla sinir yolu ayrı tutulur.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 79–84; OGM Dersler Cepte Dolaşım PDF 10–11 gerçek öğretim ve kalp kesitleriyle karşılaştırılmış özgün anlatım, basınç-evre modeli ve sorular. Resmî sınav sorusu değildir.",
  },
  {
    id: "dolasim-damarlar-starling",
    topic: "detail-312",
    title: "Damarlar ve Starling: yön, alan, basınç ve doku sıvısı",
    minutes: 48,
    objectives: [
      "Damar türünü kalbe göre akış yönüyle, duvarını işlevle ilişkilendir.",
      "Tek kesit alanı ile toplam paralel alanı kullanarak hacimsel akış ve hızı ayır.",
      "Klasik azaltılmış Starling modelinde basınç işaretini koşullarıyla yorumla.",
      "Filtrasyon, doğrudan dönüş ve lenf akışını ayrı birimler ve bilanço ile açıkla.",
    ],
    sections: [
      {
        title: "Damarın adı yönü anlatır",
        paragraphs: [
          "Atardamarlar kanı kalpten uzaklaştıran, toplardamarlar kalbe dönüşe katılan damarlardır. Sistemik ve pulmoner devreleri ayrı okuyunca oksijen miktarının damar adını belirlemediği görülür. Pulmoner arter oksijence daha az, pulmoner ven daha çok kan taşır; doğum öncesi göbek damarlarının da ayrı bağlamı vardır.",
          "Portal sistemde iki kılcal yatak arasında toplardamar bağlantısı bulunabilir; bağırsak–karaciğer yolu temel örnektir. Bu ağ, bütün venlerin arada hiçbir başka yatak olmadan tek çizgide kalbe bağlandığı basit çizimden daha zengindir. Damarın adını değiştirmek yerine tüm yolu ve hangi devrede olduğunu yaz.",
        ],
      },
      {
        title: "Duvarın bileşimi yükle ilişkilidir",
        paragraphs: [
          "Büyük arterlerde elastik lifler ve düz kaslı duvar basınç dalgalarını karşılamaya yardım eder. Arteriyoller çaplarını değiştirerek dokuya dağıtım ve dirençte önemli rol oynar. Endotel bütün damarların iç yüzünü örter; kalın dış duvar ile içteki hücre yüzeyi aynı katman değildir.",
          "Venlerin görece geniş lümeni ve uyumlu duvarı kan depolama kapasitesine katkı verir. Birçok özellikle ekstremite venindeki kapaklar geri akımı sınırlar; fakat bütün venlerde vardır veya kalbin üstündeki tüm venlerde yoktur gibi mutlak kurallar doğru değildir. Kapak, kas pompası ve solunum basınçları birlikte dönüşü destekler.",
        ],
      },
      {
        title: "Kılcal damar değişim yüzeyidir",
        paragraphs: [
          "Kılcal duvarın ince olması kan ve doku arasındaki alışverişe uygundur. Geçirgenlik ve yapı organa göre değişir; bütün kılcallar aynı delik boyuna ve aynı madde geçişine sahip değildir. Eritrositin normalde damar içinde kalmasıyla su ve küçük çözünenlerin değişimi farklı koşullardır.",
          "Oksijen, karbondioksit ve birçok küçük maddenin hareketinde derişim ve kısmi basınç farkları önemlidir. Toplu sıvı hareketini açıklayan basınç hesabı bütün gaz geçişlerini tek başına açıklamaz. Damarı dokudan ayıran sınırı çizmek, difüzyon ile filtrasyonu ayrı göstermeyi kolaylaştırır.",
        ],
      },
      {
        title: "Tek damar alanı ve toplam alan farklıdır",
        paragraphs: [
          "Bir tek arterin çapı bir tek kılcaldan büyüktür. Fakat çok sayıdaki kılcal paralel olarak birlikte düşünüldüğünde toplam kesit alanı büyük olabilir. Dolaşım boyunca ortalama hız grafiğini açıklamak için tek damarın değil bütün eş düzey ağın toplam alanını kullanmak gerekir.",
          "Aynı hacimsel akış Q için ortalama hız v=Q/A’dır. Q cm³/s ve A cm² verilirse hız cm/s çıkar. Akış sabitken alanın artması hızı azaltır; bu sonuç basıncın veya taşınan oksijenin aynı oranla değiştiği anlamına gelmez. Değiştirilen büyüklükleri tek tek belirt.",
        ],
      },
      {
        title: "Basınç, direnç ve hız aynı büyüklük değildir",
        paragraphs: [
          "Kalp basınç farkları oluşturur; damarların direnç ve uyum özellikleri akışı etkiler. Ortalama basınç dolaşım boyunca aynı kalmaz, önemli düşüşlerden biri arteriyol düzeyindedir. Venöz dönüşün sürmesi için de uygun basınç farkı ve destek mekanizmaları gerekir.",
          "Nabız arter duvarındaki basınç dalgasıdır; bir kan hücresinin kalpten parmağa aynı hızla yolculuğuyla özdeş değildir. Bu derste v=Q/A yalnız verilmiş Q ve A arasındaki bağı hesaplar. Bütün dolaşım direncini bulmak için gerekli viskozite, uzunluk ve yarıçap verileri ayrıca gerekir.",
        ],
      },
      {
        title: "Klasik Starling modelinin iki karşı etkisi",
        paragraphs: [
          "Okulun azaltılmış modelinde kapiller hidrostatik basınç sıvıyı dışa iten, plazma proteinlerinin onkotik etkisi içe çeken karşı etki olarak verilir. Diğer basınç terimleri sıfır kabul edilirse net dışa fark Pc−π olur. Pozitif işaret dışa, negatif işaret içe eğilimi anlatır.",
          "Örneğin Pc=40 ve π=25 mmHg ise +15 mmHg dışa; Pc=15 ise −10 mmHg içe eğilimi bulunur. Bu bir basınç farkıdır, doğrudan 15 mL/s akış değildir. Akış miktarı için geçirgenlik, alan ve başka katsayılar ayrıca gerekir; işaret ile miktar ayrı tutulur.",
        ],
      },
      {
        title: "Klasik şemanın gerçek fizyoloji sınırı",
        paragraphs: [
          "Gerçek sıvı geçişinde doku basıncı, doku proteinleri, endotel yüzeyi ve organa özgü geçirgenlik de rol oynar. Bu yüzden her organda venöz uç mutlaka aynı şekilde bütün sıvıyı geri emer demek aşırı genellemedir. İnterstisyuma ulaşan proteinler de lenf dönüşünde önemlidir; protein asla hiçbir yerde çıkmaz kuralı kurulmaz.",
          "Klasik model sınav sorusunda açıkça verilen varsayımlar altında kullanılabilir. Modern ayrıntıların bütün katsayıları verilmeden yeni sayısal bir gerçek kişi hesabı uydurulmaz. Hangi terimlerin yok sayıldığını önce yazmak hem okul hesabını doğru çözmeyi hem modelin sınırını anlamayı sağlar.",
        ],
      },
      {
        title: "Lenf doğrudan venöz geri alımın aynısı değildir",
        paragraphs: [
          "Dokuya geçen sıvının bir bölümü kapiller ağın uygun koşullarında geri dönebilir; kalan kısım başlangıç lenf damarlarıyla uzaklaştırılır. Lenf ayrıca dışarı ulaşan proteinlerin ve bağırsaktan bazı yağ paketlerinin taşınmasına katılır. Kan ve lenf birbirinden tamamen bağlantısız iki kapalı sistem değildir.",
          "Örnek günlük modelde 20 birim dışa geçiş ve 17 birim doğrudan geri dönüş varsa fark 3 birimdir. Doku hacmi sabit kalacaksa net lenf dönüşü bu farkı tamamlamalıdır. Bu sayıları her kişide sabit litre ölçümü diye kullanma; burada yalnız açık bilanço verileridir.",
        ],
      },
      {
        title: "Birikimi giriş ve çıkışla hesapla",
        paragraphs: [
          "Süzülen 20, doğrudan dönen 17, lenfle uzaklaştırılabilen 2 birimse dokudaki değişim 20−17−2=+1 birimdir. İşaret artı olduğu için seçili süre sonunda sıvı birikimi vardır. Lenf kapasitesi 4 olsa bile yalnız 3 birim artık varsa model 3 taşır; bulunmayan sıvıyı eksiye düşürmez.",
          "Ödem tek bir nedene bağlı değildir: basınç, protein dengesi, geçirgenlik ve lenf akımı değişiklikleri katkı verebilir. Bu etkileşim seçici bir mekanizma modelidir, kişisel şişlik tanısı değildir. Belirtilen engeli başka bütün damar ve organlara otomatik yaymamak gerekir.",
        ],
      },
      {
        title: "Üç grafik ve birimler arasında geçiş yap",
        paragraphs: [
          "Basınç grafiğinde mmHg, hız grafiğinde cm/s ve alan grafiğinde cm² ayrı eksenlerdir. Eğrilerin birlikte görünmesi sayısal değerlerinin doğrudan toplanabileceği anlamına gelmez. Kılcalda toplam alanın yüksekliği, yavaş ortalama akış ve değişim süresiyle ilişkilendirilir; tek damarın en kalın olduğu sonucu çıkmaz.",
          "Yeni problemde önce yönü belirle, sonra Q ve toplam A’yı, ardından basınç farkı ve sıvı bilançosunu ayrı hesapla. Formülün paydasını yazmak yanlış tek-damar alanı kullanımını önler. Basınç farkını hacimsel akışa dönüştürmek için ek yasa verilmedikçe yalnız işaret ve büyüklük farkı yorumlanır.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı akış, on kat alan",
        prompt:
          "Q=100 cm³/s sabit. Toplam A önce 20, sonra 200 cm². Ortalama hızlar?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk hız 100/20=5 cm/s.",
          },
          {
            label: "2. adım",
            explanation: "İkinci hız 100/200=0,5 cm/s.",
          },
          {
            label: "3. adım",
            explanation:
              "Alan on kat artarken hız onda bire iner; Q aynı kalır.",
          },
        ],
        answer: "5 ve 0,5 cm/s.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Toplam alanı tek kılcalın alanı sanmak.",
      },
      {
        title: "İşaretin dışa ve içe anlamı",
        prompt:
          "Klasik modelde diğer terimler sıfır; onkotik karşı etki 25 mmHg. Pc önce 40, sonra 15 mmHg.",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk fark 40−25=+15 mmHg.",
          },
          {
            label: "2. adım",
            explanation: "İkinci fark 15−25=−10 mmHg.",
          },
          {
            label: "3. adım",
            explanation:
              "İlkinde dışa, ikincide içe eğilim; bunlar doğrudan hacimsel hız değildir.",
          },
        ],
        answer: "+15 dışa; −10 içe.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Negatif sonucu sıvının yokluğu veya eksi mL saymak.",
      },
      {
        title: "Lenf kapasitesi yetmiyorsa",
        prompt:
          "Seçili sürede filtrasyon 20, doğrudan dönüş 17, lenf kapasitesi 2 hacim birimi. Bu model kalan sıvıyı kapasiteye kadar bütünüyle alır; başka akış yok.",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Doğrudan dönmeyen artık 20−17=3 birim.",
          },
          {
            label: "2. adım",
            explanation: "Verilen tam kullanım koşulunda lenf 2 birimi alır.",
          },
          {
            label: "3. adım",
            explanation: "Doku değişimi 3−2=+1 birimdir.",
          },
        ],
        answer: "1 birim birikim.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Doğrudan geri dönüş ile lenfi aynı çıkış olarak iki kez saymak.",
      },
      {
        title: "Basınç neden akış miktarı değildir?",
        prompt:
          "Azaltılmış model net +15 mmHg veriyor; geçirgenlik ve alan katsayısı yok. 15 mL/s sonucuna ulaşılır mı?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Verilen büyüklüğün birimi basınçtır.",
          },
          {
            label: "2. adım",
            explanation:
              "Hacimsel akış için basıncı akışa bağlayan katsayılar gerekir.",
          },
          {
            label: "3. adım",
            explanation: "Dışa eğilim söylenebilir; 15 mL/s sayısı üretilemez.",
          },
        ],
        answer: "Hayır; işaret dışa, akış miktarı belirsiz.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Aynı sayıyı farklı birime taşımak.",
      },
    ],
    recall: [
      {
        prompt: "Pulmoner arter neden arter?",
        answer: "Kalpten uzaklaşır; adın tanımı oksijen miktarı değildir.",
      },
      {
        prompt: "v=Q/A hangi alanı ister?",
        answer:
          "İncelenen paralel damar düzeyinin toplam kesit alanını; tek damarı değil.",
      },
      {
        prompt: "Pc−π sonucu ne birimlidir?",
        answer:
          "Verilen basınç birimiyle bir farktır; ek katsayı olmadan hacimsel akış değildir.",
      },
      {
        prompt: "Venöz uçta her sıvı kesin döner mi?",
        answer:
          "Hayır; klasik varsayım ve organa özgü gerçek koşullar ayrılır, lenf dönüşü önemlidir.",
      },
    ],
    items: [
      [
        "Atardamar ve toplardamarı tanımlayan temel ölçüt hangisidir?",
        "Kalbe göre kanın akış yönü",
        [
          "Her durumda taşıdıkları oksijenin kesin aynı yüzdesi",
          "Yalnız damar renginin kırmızı olması",
          "Yalnız tek damarın çapı",
          "Kanın içinde hiç hücre bulunmaması",
        ],
        "Pulmoner devredeki örneği düşün.",
        "Arter kalpten uzaklaşan, ven kalbe dönüşe katılan damardır. Pulmoner arter ve venin oksijen özellikleri bu yön tanımını değiştirmez.",
      ],
      [
        "Toplam akış 100 cm³/s ve paralel ağın toplam kesit alanı 20 cm² ise ortalama hız kaç cm/s?",
        "5",
        ["0,2", "2.000", "120", "80"],
        "Hacimsel akışı toplam alana böl.",
        "v=Q/A=100/20=5 cm/s. Birimler cm³/s ÷ cm² ile cm/s olur; tek damarın alanına ilişkin veri kullanılmamıştır.",
      ],
      [
        "Q=100 cm³/s sabitken toplam alan 20’den 200 cm²’ye çıkarılıyor. Hangisi doğrudur?",
        "Ortalama hız 5’ten 0,5 cm/s’ye iner",
        [
          "Hız 5’ten 50’ye çıkar",
          "Q zorunlu sıfır olur",
          "Basınç kesin on kat artar",
          "Her tek kılcalın çapı kesin on kat olur",
        ],
        "Sabit tutulan Q ile değişen A’yı ayrı tut.",
        "Toplam alan on katına çıkınca v=Q/A onda bire iner. Bu hesabın basınç veya tek damar çapı hakkında ayrıca kesin sonuç vermediği korunur.",
      ],
      [
        "Klasik azaltılmış Starling modelinde diğer terimler sıfır, Pc=40 ve onkotik karşı etki=25 mmHg. Net dışa basınç farkı?",
        "+15 mmHg",
        ["−15 mmHg", "65 mL/s", "1,6 cm/s", "0 mmHg"],
        "Dışa etkiden içe karşı etkiyi çıkar.",
        "40−25=+15 mmHg. Pozitif işaret dışa sıvı hareketi eğilimini anlatır; sayı doğrudan mL/s akış değildir.",
      ],
      [
        "Aynı azaltılmış modelde Pc=15, onkotik karşı etki=25 mmHg ve diğer terimler sıfır. Sonuç?",
        "−10 mmHg; içe eğilim",
        [
          "+10 mmHg; dışa eğilim",
          "40 mL; kesin birikim",
          "25 cm/s; en hızlı akış",
          "0; çünkü negatif basınç farkı hesaplanamaz",
        ],
        "Negatif farkın yön anlamını kullan.",
        "15−25=−10 mmHg. İşaret seçilen dışa pozitif tanımda içe eğilimi gösterir; negatif miktarda sıvı bulunduğu anlamına gelmez.",
      ],
      [
        "Seçili sürede dışa sıvı geçişi 20, doğrudan dönüş 17, gerçek lenf uzaklaştırması 2 hacim birimi. Başka akış yoksa doku değişimi?",
        "+1 birim",
        ["−1 birim", "+3 birim", "+5 birim", "−39 birim"],
        "Girişten iki ayrı çıkışı çıkar.",
        "20−17−2=+1. Doğrudan dönmeyen 3 birimin yalnız 2’si lenfle uzaklaşır; kalan 1 birim birikir.",
      ],
      [
        "Gerçek kılcal fizyolojiyi doğru sınırlayan ifade hangisidir?",
        "Geçirgenlik ve doku koşulları organa göre değişebilir; her venöz uç bütün sıvıyı aynı biçimde geri emmez",
        [
          "Proteinler hiçbir kılcalda hiçbir zaman dışarı ulaşamaz",
          "Bütün organlar aynı geçirgenlik katsayısına sahiptir",
          "Lenf hiçbir zaman protein taşıyamaz",
          "Gazların tüm geçişleri yalnız Pc−π çıkarımıdır",
        ],
        "Klasik okul modeli ile tüm gerçek organları ayır.",
        "Basitleştirilmiş hesap açık koşullarda kullanılır. Gerçekte endotel ve doku koşulları, proteinler ve lenf dönüşü önemlidir; difüzyon ile toplu akış da ayrı olaylardır.",
      ],
      [
        "Sistemik venöz dönüşü destekleyen düzenek için hangisi uygundur?",
        "İskelet kası ve solunum basınçlarıyla birlikte birçok vendeki kapakların katkısı",
        [
          "Bütün venlerde zorunlu ayrı ikinci kalp bulunması",
          "Kalbin üstündeki bütün venlerin kesin kapaksız olması",
          "Her venin kan yerine safra taşıması",
          "Kapakların kanı yoktan üretmesi",
        ],
        "Desteklerin birlikte ve koşullu çalıştığını düşün.",
        "Venöz dönüş kas pompası, solunum ve uygun kapak düzeniyle desteklenebilir. Bütün venler için tek mutlak kapak genellemesi kurmak doğru değildir.",
      ],
      [
        "Kılcal ağ için büyük toplam alan ne demektir?",
        "Çok sayıdaki paralel küçük damarın alanlarının birlikte büyük olması",
        [
          "Tek kılcalın her zaman aorttan daha geniş olması",
          "Kılcalda hiç kan akmaması",
          "Her kılcalın aynı geçirgenlikte olması",
          "Toplam alanın bütün organlarda sıfır olması",
        ],
        "Tek parça ile paralel toplamı ayır.",
        "Tek kılcal küçüktür fakat çok sayıda paralel damar toplam alanı büyütür. Aynı akışta ortalama hızın azalması bu toplam üzerinden açıklanır.",
      ],
      [
        "Azaltılmış model +15 mmHg buluyor; akış katsayısı ve geçirgenlik alanı verilmemiş. Hangisi söylenemez?",
        "Hacimsel akışın kesin 15 mL/s olduğu",
        [
          "Dışa pozitif tanımda eğilimin dışa olduğu",
          "Sonucun bir basınç farkı olduğu",
          "Akış miktarı için ek bilgi gerektiği",
          "Kullanılan modelin varsayım içerdiği",
        ],
        "Basınç birimini hacme çevirmek için yasa gerekir.",
        "Basınç farkıyla hacimsel hız aynı nicelik değildir. Katsayı olmadan yalnız yön ve basınç büyüklüğü bulunur; mL/s sayısı türetilemez.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 85–87; OGM Dersler Cepte Dolaşım PDF 12–13 gerçek grafik ve doku-sıvı şemalarıyla karşılaştırılmış özgün anlatım ve sorular. Klasik azaltılmış Starling modelinin varsayımları ayrıca belirtilmiştir; resmî sınav sorusu değildir.",
  },
  {
    id: "dolasim-kan-doku",
    topic: "detail-313",
    title: "Kan doku: taşıma, hücreler ve hemostaz",
    minutes: 48,
    objectives: [
      "Plazma, serum ve hücresel öğeleri hacim, sayı ve görev bakımından ayır.",
      "Eritrosit üretimi ve enerjisini; akyuvar alt tipleri ve trombosit işlevleriyle ilişkilendir.",
      "Trombosit tıkacı ile fibrin pıhtısını ve aglütinasyonu farklı süreçler olarak açıkla.",
      "ABO/Rh bilgisini ürün ve alıcı-verici bağlamıyla sınırla.",
    ],
    sections: [
      {
        title: "Bağ dokunun sıvı ortamı",
        paragraphs: [
          "Kan, plazma adlı sıvı hücreler arası ortamda taşınan hücresel öğeleri içeren özelleşmiş bağ dokudur. Gaz, besin, hormon ve atık taşır; ısı dağılımı, pH düzeni, savunma ve kan kaybının sınırlandırılmasına katılır. Bu görevler tek bir hücrenin yaptığı tek iş değildir.",
          "Plazmanın büyük bölümü sudur; iyonlar, proteinler, küçük organik maddeler ve taşınan ürünleri içerir. Yaklaşık %55 plazma ve %45 paketlenmiş hücre hacmi öğretim örneğidir; her kişinin değişmez ölçümü değildir. Hacim payı ile hücrelerin sayıca oranını karıştırmamak gerekir.",
        ],
      },
      {
        title: "Plazma, serum ve hematokrit",
        paragraphs: [
          "Antikoagülanlı kandan hücreler ayrılırsa üstteki sıvı plazmadır; pıhtılaşma sonrasında fibrinojenin önemli bölümü kullanılmış sıvı serum olarak adlandırılır. Serum yalnızca saf su değildir; pek çok protein ve çözünmüş maddeyi taşımayı sürdürür. Pıhtılaşma ile santrifüj ayırımı aynı olay değildir.",
          "Hematokrit esas olarak paketlenmiş eritrosit hacminin toplam kan hacmine oranıdır. 10 mL örnekte 4,5 mL eritrosit tabakası varsa %45 bulunur. Bu, birim hacimdeki eritrosit sayısını tek başına vermez; hücrelerin ortalama hacmi de önemlidir. İnce akyuvar-trombosit tabakası ayrı düşünülebilir.",
        ],
      },
      {
        title: "Plazma proteinleri ve iç denge",
        paragraphs: [
          "Albümin onkotik denge ve madde taşınmasına, fibrinojen pıhtılaşmaya, immünoglobulinler özgül savunmaya katılır. Karaciğer albümin ve fibrinojen gibi birçok proteini yapar; antikorları plazma hücreleri üretir. Bütün globulinlerin aynı hücrede yapıldığı genellemesi doğru değildir.",
          "Kanın pH’sı yaklaşık 7,4 çevresinde sıkı düzenlenir; sağlıklı olağan aralık 7,0–7,8 diye genişletilemez. Tamponlar yanında akciğer ve böbrek katkısı önemlidir. Protein, iyon ve su dengesinin değişimi taşıma ve doku-sıvı ilişkisini etkileyebilir; tek değer burada kişisel tanı olarak kullanılmaz.",
        ],
      },
      {
        title: "Eritrositin biçimi, hemoglobini ve enerjisi",
        paragraphs: [
          "Olgun insan eritrositi çekirdeksiz, iki yüzü çukur ve esnek yapısıyla kılcallardan geçişe uygundur. Hemoglobin oksijen taşınmasında önemlidir; karbondioksitin taşınmasında da kanın farklı biçimleri birlikte rol oynar. Bütün gaz moleküllerinin tek aynı biçimde hemoglobine bağlandığı sonucu çıkmaz.",
          "Olgun eritrositte mitokondri yoktur; ATP’sini glikoliz ve laktat oluşumuyla sürdürebilir. Bu durum mitokondrisiz ökaryotik hücrede oksijensiz elektron taşıma zinciri solunumu var demek değildir. Kendi taşıdığı oksijeni mitokondriyle tüketmemesiyle enerjiye hiç gereksinim duymaması da aynı şey değildir.",
        ],
      },
      {
        title: "Kan yapımı, EPO ve geri dönüşüm",
        paragraphs: [
          "Erişkinde kan hücrelerinin üretiminde kırmızı kemik iliği önemlidir. Oksijen yetersizliğine yanıtla başlıca böbrekten verilen eritropoietin eritrosit üretimini destekler. Embriyonik dönemde karaciğer gibi organların kan yapımına katılması erişkinde tek üretim organının karaciğer olduğu anlamına gelmez.",
          "Eritrosit ömrü için yaklaşık 120 gün öğretim değeri kullanılır; hepsi aynı anda ve aynı gün parçalanmaz. Yaşlı hücreler dalak ve karaciğer gibi yerlerde fagositik sistemle işlenir, demir geri kazanılabilir ve hem yıkımı bilirubin yoluna katılır. Sayı, hacim ve hemoglobin ayrı ölçütlerdir.",
        ],
      },
      {
        title: "Akyuvarlar tek tip savunmacı değildir",
        paragraphs: [
          "Nötrofil ve monosit/makrofaj gibi hücreler fagositozla ilişkilidir; eozinofil ve bazofil gibi granülositlerin farklı savunma ve aşırı yanıt görevleri vardır. Lenfosit grubu B, T ve doğal öldürücü hücreleri kapsar. Hücrenin görevi yalnız çekirdek şeklinin adı değildir; hedef ve yanıt yolu da gerekir.",
          "B hücresinden farklılaşan plazma hücresi antikor üretir; T hücrelerinin farklı görevleri ve NK’nin özgül olmayan hedefleme özellikleri vardır. Akyuvarlar dokulara geçebilir. Bütün akyuvarlar birkaç gün yaşar veya her enfeksiyonda sayıları mutlaka artar kuralı kurulmaz; bellek hücreleri çok daha uzun süre kalabilir.",
        ],
      },
      {
        title: "Trombosit tıkacı ve damar yanıtı",
        paragraphs: [
          "Trombositler memelilerde megakaryositlerden ayrılan hücre parçalarıdır; olgun tam hücre gibi çekirdek taşımazlar. Damar hasarında tutunma, etkinleşme ve kümelenmeyle ilk tıkaç oluşumuna katılırlar. Damarın yerel daralması kan kaybını sınırlayan başka bir basamaktır.",
          "Bu ilk tıkaç daha sonra fibrin desteğiyle sağlamlaştırılabilir. Trombositlerin kümelenmesi ile ABO uyumsuzluğunda eritrositlerin aglütinasyonu aynı süreç değildir. Bir deneyde trombosit yolu eksik fakat pıhtılaşma faktörleri sağlam verilirse iki basamağı ayrı yorumlamak gerekir; gerçek hastada yolların etkileşimi daha geniştir.",
        ],
      },
      {
        title: "Pıhtılaşma zinciri ve fibrin ağı",
        paragraphs: [
          "Pıhtılaşma faktörlerinin düzenli etkinleşmesi trombin oluşumuna ve çözünür fibrinojenin fibrine dönüşmesine katılır. Fibrin ağı tıkacı destekler; tek bir eritrosit birden iplik proteinine dönüşmez. Kalsiyum birçok basamakta, K vitamini ise bazı faktörlerin uygun yapımında önem taşır.",
          "Pıhtılaşmanın gerektiği yerde sınırlanması ve daha sonra fibrin çözülmesi de denetlenir. Bütün kanın damar içinde sürekli pıhtı olması normal işleyiş değildir. Hemofili gibi belirli faktör yollarındaki bozukluklar, trombosit eksikliği ve damar sorunları farklı mekanizmalardır; hepsi aynı tek hastalık adı değildir.",
        ],
      },
      {
        title: "ABO ile Rh’yi molekül ve ürün bağlamında öğren",
        paragraphs: [
          "ABO A ve B belirleyicileri eritrosit yüzeyindeki protein veya lipitlere bağlı karbonhidrat yapılarına dayanır. Rh sisteminde D protein antijeni önemli örnektir; Rh negatif demek bütün Rh sistemi antijenlerinin hiçbiri yok demek değildir. Antijenle antikor aynı yapı ve aynı yer değildir.",
          "Ders tablosunda eritrosit ürünü verilirken verici hücre antijeni ile alıcı antikorları düşünülür; plazma ürününde antikorun yönü farklıdır. ABO/Rh etiketi tek başına gerçek nakil kararı değildir; çapraz karşılaştırma ve klinik koşullar gerekir. Anti-D duyarlanması da her ilk karşılaşmada anında aynı miktarda oluşmak zorunda değildir.",
        ],
      },
      {
        title: "A, B, AB ve 0 grubunu iki bölmede oku",
        paragraphs: [
          "Temel erişkin ABO öğretim modelinde A grubu eritrositte A belirleyicisi, plazmada anti-B; B grubu B belirleyicisi, plazmada anti-A taşır. AB’de her iki belirleyici bulunur ve olağan tabloda anti-A/anti-B yoktur. 0 grubunda A ve B belirleyicisi bulunmaz, plazmada anti-A ve anti-B örneklenir. Bu tablo bütün diğer kan grubu sistemlerinin antijenlerini yok saymaz.",
          "Anti-A’nın A taşıyan eritrositlerle karşılaşması hücre kümelenmesi ve hemoliz gibi zararlı sonuçlara yol açabilir. Eritrosit ürününde vericinin hücresi ile alıcının plazması düşünülür; plazma ürününde bağışlanan antikor yönü tersinden denetlenir. Yeni doğanlık ve özel antikor durumları temel erişkin şemanın dışında değerlendirilir. Aynı ABO etiketi dahi bütün klinik uyum ve çapraz karşılaştırma gereksinimini ortadan kaldırmaz.",
        ],
        table: {
          headers: [
            "Grup",
            "Eritrositte A/B belirleyicisi",
            "Temel erişkin plazma örneği",
          ],
          rows: [
            ["A", "A", "Anti-B"],
            ["B", "B", "Anti-A"],
            ["AB", "A ve B", "Anti-A/anti-B olağan tabloda yok"],
            ["0", "A ve B yok", "Anti-A ve anti-B"],
          ],
        },
      },
      {
        title: "Kan hastalığı terimini tek sayıdan çıkarma",
        paragraphs: [
          "Anemi farklı nedenlerle hemoglobin/eritrosit taşıma kapasitesinin azalmasıyla ilişkili geniş bir durumdur. Lösemi yalnız akyuvarın herhangi bir nedenle artmasının adı değildir; kan yapıcı hücrelerin kontrolsüz hastalıklı çoğalmasıyla ilgilidir. Orak hücre gibi yapı değişimleri ve pıhtılaşma bozuklukları ayrı neden zincirleridir.",
          "Bir soruda sayı verildiğinde birimini koru: 5 milyon eritrosit/µL yoğunlukta 2 µL örnek 10 milyon hücre içerir. Bununla hematokrit bulunamaz; hacim gerekir. Öğrencinin görevi ölçülen özelliği doğru adlandırmaktır; tek sayı veya tek belirtiyle kişinin hastalığını seçmek değildir.",
        ],
      },
    ],
    examples: [
      {
        title: "Hematokrit hacim oranıdır",
        prompt:
          "Antikoagülanlı 10 mL kan ayrılıyor; paketlenmiş eritrosit hacmi 4,5 mL. Hematokrit?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Pay eritrosit hacmi, payda toplam örnek hacmidir.",
          },
          {
            label: "2. adım",
            explanation: "4,5/10×100=%45.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu oran bütün hücrelerin sayıca %45’inin eritrosit olduğu veya eritrosit sayısının 4,5 olduğu anlamına gelmez.",
          },
        ],
        answer: "%45.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Hacim oranını hücre sayısı oranı sanmak.",
      },
      {
        title: "Birim hacimden toplam hücreye",
        prompt:
          "Özgün örnekte eritrosit yoğunluğu 5 milyon/µL. 2 µL örnekte kaç eritrosit?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Yoğunluğu örnek hacmiyle çarp: 5 milyon/µL ×2 µL.",
          },
          {
            label: "2. adım",
            explanation:
              "Mikrolitre birimleri sadeleşir; 10 milyon hücre kalır.",
          },
          {
            label: "3. adım",
            explanation:
              "Hücrelerin ortalama hacmi verilmediğinden hematokrit ayrıca bulunmaz.",
          },
        ],
        answer: "10 milyon eritrosit.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Yoğunluk ile toplamı veya hematokriti eşitlemek.",
      },
      {
        title: "İki basamaklı hemostaz deneyi",
        prompt:
          "Seçici kartta trombosit tıkacı oluşmuyor; trombin-fibrin yolu kimyasal olarak sağlam. Hangi sonuç sınırlıdır?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Primer trombosit tıkacı bu kartta eksiktir.",
          },
          {
            label: "2. adım",
            explanation:
              "Faktör yolu sağlam verilmiş olduğundan fibrin oluşturma yeteneği otomatik yok sayılmaz.",
          },
          {
            label: "3. adım",
            explanation:
              "İkisinin birlikte sağlam olması gereken kararlı tıkaç, eksik primer destekle aynı normal duruma eşitlenmez.",
          },
        ],
        answer: "Primer tıkaç eksik; verilen fibrin yolu ayrı korunur.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Trombosit ve fibrin yolunu tek değişmez olay sanmak.",
      },
      {
        title: "Rh etiketi neyi söylemez?",
        prompt:
          "Bir eritrosit D antijeni bakımından negatif. Bütün Rh sistemi antijenleri yok sonucu çıkar mı?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Verilen işaret yalnız D durumunu bildirir.",
          },
          {
            label: "2. adım",
            explanation:
              "Rh sisteminin başka antijenleri vardır; bunlara ilişkin ölçüm verilmedi.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu nedenle bütün antijenlerin yokluğu çıkarılamaz; nakil değerlendirmesi de tek etikete indirgenmez.",
          },
        ],
        answer: "Hayır; D yokluğu tüm Rh antijenlerinin yokluğu değildir.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Bir sistemin tek antijen testini bütün moleküllere yaymak.",
      },
    ],
    recall: [
      {
        prompt: "Serum saf su mudur?",
        answer:
          "Hayır; pıhtılaşma sonrası sıvıdır, çok sayıda çözünmüş madde taşır; fibrinojenin önemli kısmı kullanılmıştır.",
      },
      {
        prompt: "Eritrosit ATP’yi nasıl sağlar?",
        answer:
          "Olgun insan eritrositinde mitokondri yok; glikoliz ve laktat yolu önemlidir.",
      },
      {
        prompt: "Trombosit ve fibrin aynı mı?",
        answer:
          "Trombosit hücresel parçadır; fibrin pıhtılaşmayla oluşan protein ağıdır.",
      },
      {
        prompt: "ABO aglütinasyonu pıhtı mı?",
        answer:
          "Antijen-antikorla hücre kümelenmesi, trombosit/fibrin hemostazıyla aynı mekanizma değildir.",
      },
    ],
    items: [
      [
        "10 mL kan örneğinde paketlenmiş eritrosit tabakası 4,5 mL. Hematokrit kaçtır?",
        "%45",
        ["%4,5", "%55", "%450", "%0,45"],
        "Eritrosit hacmini toplam hacme oranla.",
        "4,5/10×100=45 bulunur. Hematokrit hacim yüzdesidir; hücrelerin sayıca oranı veya tek başına birim hacimdeki hücre sayısı değildir.",
      ],
      [
        "Pıhtılaşmış kanın pıhtıdan ayrılan sıvısı için hangi ifade uygundur?",
        "Serumdur; saf su değildir ve fibrinojenin önemli kısmı pıhtıda kullanılmıştır",
        [
          "Yalnız tüm eritrosit çekirdeklerinden oluşur",
          "Safra adı verilir",
          "Hiç protein içeremez",
          "Antikoagülanlı bütün kanın aynı adı serumdur",
        ],
        "Pıhtı sonrası sıvıyı plazma örneğinden ayır.",
        "Serum birçok çözünmüş madde taşır. Pıhtılaşma öncesi plazmayla önemli farklarından biri fibrinojenin pıhtıya katılmasıdır.",
      ],
      [
        "Olgun insan eritrositinin enerji üretimi için hangisi doğrudur?",
        "Mitokondrisiz yapıda glikoliz ve laktat yolu ATP sağlamaya katılır",
        [
          "Oksijensiz elektron taşıma zinciri zorunlu mitokondride çalışır",
          "Hiç ATP gereksinimi yoktur",
          "Yalnız çekirdekte fotosentez yapar",
          "Kendi glikozunu safra kanalından çekirdeğe alır",
        ],
        "Mitokondri yokluğu enerji yokluğu demek değildir.",
        "Olgun eritrosit glikolizle ATP sağlar ve laktat oluşturabilir. Bunu ökaryotik hücrede mitokondri kaynaklı oksijensiz solunum diye adlandırmak doğru değildir.",
      ],
      [
        "Sağlıklı erişkin kan yapımı ve eritropoietin için uygun eşleştirme hangisidir?",
        "Kırmızı kemik iliği üretimde; böbrek EPO sinyalinde önemli",
        [
          "Safra kesesi bütün eritrositleri yapar; EPO yalnız dişten çıkar",
          "EPO yalnız pankreas lipazının diğer adıdır",
          "Olgun eritrosit çekirdeği her gün bölünür",
          "Erişkinde tek kan yapım yeri zorunlu karaciğer lümenidir",
        ],
        "Üretim dokusu ile haberi veren organı ayır.",
        "Erişkinde kırmızı ilik kan yapımında önemlidir. Böbreğin hipoksiye yanıtla EPO katkısı bu üretimi düzenler; embriyonik karaciğer rolü erişkinin tek yolu sayılamaz.",
      ],
      [
        "Hangi açıklama akyuvarları doğru sınırlar?",
        "Farklı alt tipler farklı görev yapar; bazı bellek hücreleri uzun yaşayabilir",
        [
          "Bütün akyuvarlar yalnız iki gün yaşar",
          "Her enfeksiyonda akyuvar sayısı kesin artar",
          "Bütün antikorlar eritrosit çekirdeğinde yapılır",
          "Bütün lenfositler aynı işi yapan trombositlerdir",
        ],
        "Tek hücre ömrünü bütün alt gruplara yayma.",
        "Akyuvarlar fagosit, lenfosit ve başka alt görevler taşır. Bellek hücreleri ve akut yanıt hücrelerinin ömürleri aynı değildir; sayı değişimi de her olayda tek yönde zorunlu değildir.",
      ],
      [
        "Trombosit tıkacı ile fibrin için doğru ayrım hangisidir?",
        "Trombosit parçaları primer tıkaca, fibrin protein ağı sağlamlaştırmaya katılır",
        [
          "Fibrin bir eritrositin çekirdeğidir",
          "Trombosit yalnız çözünmüş saf sudur",
          "İkisi ABO antijeninin aynı molekülüdür",
          "Fibrin yalnız glikoz taşıyan bir disakkarittir",
        ],
        "Hücresel parça ile protein ağını ayır.",
        "Hemostaz damar yanıtı, trombosit ve pıhtılaşma basamaklarını içerir. Fibrin trombin etkisiyle fibrinojenden oluşan ağdır; ABO hücre aglütinasyonuyla aynı olay değildir.",
      ],
      [
        "Pıhtılaşma zincirinde temel ürün eşleştirmesi hangisidir?",
        "Trombin etkisiyle fibrinojenden fibrin oluşması",
        [
          "Pepsinin hemoglobini doğrudan trombosite çevirmesi",
          "İnsülinin safrayı DNA’ya çevirmesi",
          "Albüminin zorunlu bir kemiğe dönüşmesi",
          "Her antikorun yalnız fibrinojenden yapılması",
        ],
        "Çözünür öncül ile ağ ürününü eşleştir.",
        "Fibrinojen çözünür plazma proteinidir; trombinin katkısıyla fibrin ağı oluşur. Kalsiyum ve bazı K vitamini bağımlı faktörler farklı basamaklarda önemlidir.",
      ],
      [
        "RhD negatif bir eritrosit için hangi sonuç zorunlu değildir?",
        "Bütün Rh sistemi antijenlerinin yokluğu",
        [
          "D antijeninin negatif olarak bildirildiği",
          "RhD ile başka antijenlerin aynı tek ölçüm olmadığı",
          "Nakilde ek uygunluk koşullarının önemli olduğu",
          "Antijen ve antikorun farklı olduğu",
        ],
        "D testi tüm sistemin ölçümü değildir.",
        "Rh sisteminde birden çok antijen vardır. D negatiflik bütün sistem antijenlerini yok saymaz; klinik ürün uygunluğu tek etikete indirgenmez.",
      ],
      [
        "Bir örnekte eritrosit yoğunluğu 5 milyon/µL. 2 µL örnekte toplam kaç eritrosit vardır?",
        "10 milyon",
        ["2,5 milyon", "5 milyon", "7 milyon", "0,4 milyon"],
        "Yoğunluğu hacimle çarp.",
        "5 milyon/µL ×2 µL=10 milyon hücre. Bu sayı ortalama hücre hacmi verilmeden hematokrit yüzdesini belirlemez.",
      ],
      [
        "ABO uyumsuzluğunda eritrosit antijen-antikor etkileşimiyle kümelenme ile normal fibrin pıhtısı için hangisi doğrudur?",
        "Aglütinasyon ve hemostatik pıhtılaşma farklı mekanizmalardır",
        [
          "Her ikisi zorunlu aynı tek kimyasal basamaktır",
          "İkisi de yalnız nişasta sindirimidir",
          "Aglütinasyonda asla antikor bulunmaz",
          "Fibrin yalnız ABO genotipinin diğer adıdır",
        ],
        "Benzer kümelenme görünümü aynı mekanizma kanıtı değildir.",
        "ABO aglütinasyonu hücre antijenleri ve antikorlarla ilişkilidir. Normal hemostaz trombositler ve pıhtılaşma-fibrin ağıyla gelişir; süreçler birbirinin tanımı değildir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 88–90; OGM Dersler Cepte Dolaşım PDF 14–15 gerçek öğretim, santrifüj ve hemostaz şekilleriyle karşılaştırılmış özgün anlatım ve sorular. Resmî sınav sorusu değildir.",
  },
  {
    id: "lenf-sistemi",
    topic: "detail-314",
    title: "Lenf sistemi: dokudan tek yönlü dönüş ve savunma",
    minutes: 48,
    objectives: [
      "Başlangıç lenf damarı, düğüm, büyük kanal ve venöz birleşimi sırayla izle.",
      "Sağ üst bölge ile diğer bölgelerin iki asimetrik dönüş yolunu anatomik sağ-sol ile ayır.",
      "Protein, yağ ve bağışıklık görevlerini kan dolaşımıyla ilişkilendir.",
      "Seçici engel ve sıvı bütçesinde giriş, gerçek çıkış ve birikimi hesapla.",
    ],
    sections: [
      {
        title: "Doku aralığında kalan sıvının dönüş yolu",
        paragraphs: [
          "Kılcal kan ile doku arasında su ve küçük maddeler değişir; dokuya çıkan sıvının tamamı her koşulda doğrudan kan kılcalından geri dönmez. Başlangıç lenf damarları fazla sıvı ve dışarı ulaşan proteinlerin dönüşüne katılır. Lenf, doku sıvısının bu damarlara girmiş hâlidir; doku aralığıyla damar içi ayrı bölmelerdir.",
          "Kan ile lenf birbirine hiç bağlanmayan iki sistem değildir. Lenf büyük venöz birleşimlere döner, yeniden kan dolaşımına katılır. Tek merkezi kalp benzeri lenf pompası bulunmaması, lenfin tamamen rastgele hareket ettiği veya hiç yön taşımadığı anlamına gelmez.",
        ],
      },
      {
        title: "Başlangıç damarı ve tek yönlü kapılar",
        paragraphs: [
          "Kör başlangıçlı lenf kılcallarının üst üste binen endotel düzeni doku tarafındaki uygun basınçla sıvı girişine izin verebilir. Bu giriş yalnız bütün moleküllerin tek tek difüzyonu olarak açıklanmaz; basınca bağlı toplu akım da önemlidir. Protein ve hücrelerin katılabilmesi kana göre farklı bir başlangıç yoludur.",
          "Daha büyük toplayıcı damarlardaki kapaklar geri akımı sınırlar. Damar duvarının kasılması, iskelet kası hareketleri ve solunum basınçları akımı destekler. Kapaklar akımı yoktan üretmez; uygun basınç farkı ve hareketle birlikte tek yönlülüğü destekler.",
        ],
      },
      {
        title: "Lenfin içeriği bölgesine göre değişir",
        paragraphs: [
          "Lenf su, iyon, protein ve bağışıklık hücrelerini taşıyabilir. Normal lenfte eritrositlerin ana yoğun kan hücresi gibi bulunması beklenmez. İçeriğin tamamını saf su veya yalnız protein içermeyen sıvı saymak yanlıştır. Doku ve bölgeye göre protein ile yağ miktarı değişebilir.",
          "Lenf plazmaya göre farklı protein derişimleri taşısa da hiç fibrinojen veya pıhtılaşma proteini içermez, hiçbir koşulda pıhtılaşamaz genellemesi doğru değildir. Kılcal ve lenf proteinlerinin oranları organa göre değişir. Bir örneğin sayısı bütün beden bölgeleri için sabit oran sayılmaz.",
        ],
      },
      {
        title: "Sağ üst bölümün kısa büyük kanalı",
        paragraphs: [
          "Anatomik sağ kol, baş-boynun sağ bölümü ve sağ üst göğsün önemli lenf dönüşü sağ lenf kanalı yoluyla sağ venöz köşeye katılır. Venöz köşe, sağ iç juguler ve sağ köprücük altı ven birleşimi çevresindeki bağlantıdır. İzleyenin sağını bedenin sağıyla karıştırmamak gerekir.",
          "Bu kanal bütün sağ beden yarısının tek yolu değildir: sağ bacak dahil alt bölgeler göğüs kanalı sistemine katılır. Sağ ve sol sözcüklerini sadece iki eşit dikey yarı gibi ezberlemek önemli hataya yol açar. Haritada bölgeyi ve hedef birleşimi birlikte göster.",
        ],
      },
      {
        title: "Göğüs kanalı ve alt bölgeler",
        paragraphs: [
          "Bacaklar, alt gövde, bağırsak ve sol üst bedenin lenfi göğüs kanalı üzerinden sol venöz köşeye ulaşır. Alt bölge toplayıcıları bazı anatomik düzenlerde sisterna şili adı verilen genişlemeyle birleşir. Bu yapı bir lenf düğümü veya hormon bezi değildir.",
          "Göğüs kanalı sol juguler-köprücük altı ven birleşimi çevresinde kana katılır. Sol koldan gelen lenfin de yolu buraya bağlıdır. Büyük kanalın tek seçici engeli, o yola katılan bölgelerde dönüşü etkileyebilir; bundan bütün kan akımının durduğu veya her organda aynı derece etki olduğu çıkarılmaz.",
        ],
      },
      {
        title: "Bağırsak yağı neden sütümsü lenfe katılır?",
        paragraphs: [
          "İnce bağırsak villusunun lakteali uzun zincir yağ ürünlerinden epitelin yaptığı şilomikronları alır. Yemek sonrası yağca zengin bağırsak lenfi şilüs olarak adlandırılabilir. Bu yol göğüs kanalına ve sonra venöz kana bağlanır; yağ paketi bütün yaşamı boyunca lenfte kalmaz.",
          "Kısa/orta zincir yağ asidi ve gliserol için portal kan istisnaları önemlidir. Yağda çözünen vitaminlerin yoluyla bağlantı kurulabilir; fakat her vitamin her koşulda aynı biçimde paketlenir diye genellenmez. Misel lümendeki yardımcı düzen, şilomikron epitelden çıkan pakettir.",
        ],
      },
      {
        title: "Düğüm lenfi, dalak kanı inceler",
        paragraphs: [
          "Lenf düğümleri damar yolu üzerinde bağışıklık hücrelerinin lenfle taşınan maddelerle karşılaşmasını destekler. Boyun, koltuk altı ve kasık gibi bölgelerde kümeler bulunur. Her düğüm büyümesi tek aynı hastalık anlamına gelmez; yer, süre ve neden ayrı değerlendirilir.",
          "Dalak dolaşan kanı süzen ve kanla gelen antijenlerle karşılaşmaya katılan organdır. Timus T hücresi olgunlaşmasında önemli birincil lenfoid organdır; düğüm kümesi değildir. Bademcikler mukozal savunmaya katılır, sisterna şili ise damar genişlemesidir. Adların hepsini aynı lenf bezi torbasına koyma.",
        ],
      },
      {
        title: "Protein dönüşü ve ödem mekanizmaları",
        paragraphs: [
          "Dokuya ulaşan proteinler geri taşınamazsa ozmotik koşulları ve sıvı birikimini etkileyebilir. Lenf dönüşü hem hacim hem protein bilançosunda önemlidir. Damar hasarı, lenf yolu engeli, basınç ve protein dengesindeki değişiklikler farklı yollardan ödeme katkı verebilir.",
          "Bir öğretim kartında sadece lenf çıkışı engellenmişse girişler ayrı sabit tutulur. Kapasitenin azalmasını bütün filtrasyonun da otomatik aynı oranda azalması saymak yanlış olur. Doku sıvısı şişliği kişisel tanıya indirgenmez; model yalnız belirtilen giriş-çıkış nedenselliğini gösterir.",
        ],
      },
      {
        title: "Bir zaman aralığında açık sıvı bilançosu",
        paragraphs: [
          "Verilen başlangıç 10 mL doku sıvısı, yeni net giriş 5 mL ve lenfle çıkış 3 mL ise son hacim 12 mL’dir. Net giriş burada doğrudan kan dönüşü düşüldükten sonra verilmiştir; onu yeniden çıkarmak aynı akışı iki kez sayar. Gerçek çıkış mevcut sıvıdan fazla olamaz.",
          "Modelde yol tamamen kapalıysa çıkış sıfır olur, aynı 5 mL girişle son 15 mL bulunur. Bu sayılar kapalı bir zaman penceresinin oyuncak bütçesidir; kişide normal doku hacmi veya gerçek hastalık süresi olarak kullanılmaz. İşaret artıysa birikim, eksi ise mevcut stoğun azalışı anlatılır.",
        ],
      },
      {
        title: "Dolaşım sağlığında farklı mekanizmaları ayır",
        paragraphs: [
          "Ateroskleroz arter duvarındaki plak ve süreçleri, trombüs damar içi pıhtıyı, emboli ise taşınıp başka yerde tıkayabilen materyali anlatır. Varis venöz genişleme ve kapak/dönüş sorunlarıyla; hipertansiyon kan basıncı düzeniyle ilişkilidir. Hemoroidal damar hastalığıyla lenf düğümünü aynı yapı sayma.",
          "İnme iskemik tıkanma veya kanama gibi farklı mekanizmalarla oluşabilir; bütün inmeler tek pıhtı değildir. Koroner damar hastalığı ile lenf yolu engelini de ayır. Kaynaktaki bir ilaç adı her göğüs ağrısı veya inmede aynı kişisel müdahalenin uygun olduğu sonucunu vermez; burada hastalık mekanizmaları öğrenilir, ilaç seçimi yapılmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Sağ kol ile sağ bacağın farkı",
        prompt:
          "Anatomik sağ kol ve sağ bacak için büyük lenf kanalı ve kana katılma köşesini seç.",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Sağ kol sağ üst bölge sistemindedir: sağ lenf kanalı.",
          },
          {
            label: "2. adım",
            explanation:
              "Sağ bacak alt bölgedir: göğüs kanalı, sol venöz köşe.",
          },
          {
            label: "3. adım",
            explanation:
              "İki bölgenin ikisinin de sağda olması aynı kanala katılmalarını gerektirmez.",
          },
        ],
        answer:
          "Sağ kol: sağ kanal/sağ köşe; sağ bacak: göğüs kanalı/sol köşe.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Bütün sağ yarıyı tek kanala bağlamak.",
      },
      {
        title: "Açık yolun su bütçesi",
        prompt:
          "Başlangıç 10 mL, seçili sürede net doku girişi 5 mL, lenf çıkışı 3 mL. Başka akış yok. Son?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk miktar ve giriş 10+5=15 mL.",
          },
          {
            label: "2. adım",
            explanation: "Çıkış 3 mL; son 15−3=12 mL.",
          },
          {
            label: "3. adım",
            explanation:
              "Doku değişimi +2 mL’dir; son hacim ile değişim aynı sayı değildir.",
          },
        ],
        answer: "Son 12 mL, değişim +2 mL.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Net girişten zaten düşülmüş venöz dönüşü tekrar çıkarmak.",
      },
      {
        title: "Aynı giriş, kapalı dönüş",
        prompt:
          "Başlangıç 10 mL, net giriş 5 mL. Açık durumda lenf çıkışı 3 mL idi; şimdi yalnız lenf yolu tamamen kapatılıyor. Başka akış yok. Son hacim ve açık duruma fark?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Kapalı yolun çıkışı 0’dır.",
          },
          {
            label: "2. adım",
            explanation: "Son hacim 10+5=15 mL.",
          },
          {
            label: "3. adım",
            explanation:
              "Açık durumda 10+5−3=12 mL kalırdı; kapalı durumda 3 mL daha çok sıvı kalır.",
          },
        ],
        answer: "15 mL; açık yoldan 3 mL fazla.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Engel açıldı diye girişin de verilmeden sıfırlandığını sanmak.",
      },
      {
        title: "Organı süzdüğü sıvıyla eşleştir",
        prompt:
          "X lenf yolunun düğümü; Y dalak; Z timus. Lenf süzme, kanı inceleme ve T olgunlaşması?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "X damar yolundaki lenf ve antijenlerle karşılaşmaya katılır.",
          },
          {
            label: "2. adım",
            explanation:
              "Y kanla gelen öğeleri inceler; kan hücresi işlenmesine de katılır.",
          },
          {
            label: "3. adım",
            explanation:
              "Z T hücresi olgunlaşmasıyla ilişkilidir; bir damar rezervuarı değildir.",
          },
        ],
        answer: "X lenf, Y kan, Z T olgunlaşması.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Bütün lenfoid organları aynı lenf düğümü sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Bütün sağ beden sağ lenf kanalına mı?",
        answer:
          "Hayır. Sağ üst bölge örnekleri sağ kanala; alt bölgeler göğüs kanalına katılır.",
      },
      {
        prompt: "Lenf sadece difüzyonla mı ilerler?",
        answer:
          "Hayır; basınca bağlı giriş, kapak, kas ve solunum katkıları vardır.",
      },
      {
        prompt: "Dalak ve düğümün sıvı farkı?",
        answer: "Dalak kanı, lenf düğümleri lenfle gelen içeriği inceler.",
      },
      {
        prompt: "Lenf hiç protein taşımaz mı?",
        answer:
          "Protein taşır; protein dönüşü ve sıvı dengesi temel görevlerindendir.",
      },
    ],
    items: [
      [
        "Anatomik sağ koldan gelen lenfin temel büyük kanal yolu hangisidir?",
        "Sağ lenf kanalı → sağ venöz köşe",
        [
          "Göğüs kanalı → yalnız safra kesesi",
          "Portal ven → doğrudan sol karın lümeni",
          "Üreter → sağ atriyum",
          "Wirsung → dalak boşluğu",
        ],
        "Sağ üst bölgeyi seç.",
        "Sağ kol, sağ baş-boyun ve sağ üst göğüs temel sağ kanal bölgesidir. Bu kural bütün sağ bacağı kapsayan eşit yarı bölünmesi değildir.",
      ],
      [
        "Anatomik sağ bacaktan gelen lenf için temel büyük dönüş yolu hangisidir?",
        "Göğüs kanalı → sol venöz köşe",
        [
          "Sağ lenf kanalı → mide boşluğu",
          "Safra kanalı → duodenum",
          "Pulmoner arter → doğrudan bağırsak lümeni",
          "Sağ üreter → baş lenf düğümü",
        ],
        "Alt bölgelerin yolu sağ-sol eşit yarı kuralına uymaz.",
        "Bacakların lenfi göğüs kanalı sistemine katılır. Sağ bacağın anatomik sağda olması onu sağ üst kanalın alanına sokmaz.",
      ],
      [
        "Lenf akımının desteklenmesi için hangi açıklama uygundur?",
        "Kapaklar, damar ve iskelet kasları ile solunum basınçları katkı verir",
        [
          "Tek merkezi ikinci kalp bütün lenfi pompalar",
          "Lenf yalnız rastgele difüzyonla yönsüzdür",
          "Kapaklar sıvıyı yoktan üretir",
          "Lenf damarlarında bütün akış yalnız mide asidiyle olur",
        ],
        "Tek yönlü destek ile merkezi pompayı ayır.",
        "Lenf başlangıcında basınca bağlı giriş ve toplayıcılarda kapak-kas katkısı vardır. Kalp benzeri tek merkezi pompa olmaması hiçbir mekanik destek yok demek değildir.",
      ],
      [
        "Başlangıç doku sıvısı 10 mL, seçili sürede net giriş 5 mL, lenf çıkışı 3 mL. Başka akış yoksa son hacim?",
        "12 mL",
        ["2 mL", "8 mL", "15 mL", "18 mL"],
        "Başlangıca net girişi ekle, lenfi çıkar.",
        "10+5−3=12 mL. Değişim +2 mL’dir; son stokla değişim aynı nicelik değildir. Net girişte zaten düşülmüş çıkış ayrıca tekrar düşülmez.",
      ],
      [
        "Aynı kapalı zaman modelinde ilk 10 mL ve net giriş 5 mL var. Lenf yolu tamamen kapalı, başka çıkış yok. Son hacim?",
        "15 mL",
        ["0 mL", "5 mL", "10 mL", "12 mL"],
        "Kapalı yolda lenf çıkışı sıfırdır.",
        "10+5−0=15 mL. Model yalnız seçilen engeli değiştirir; verilmeden bütün kan filtrasyonunu veya ilk stoğu sıfırlamaz.",
      ],
      [
        "Lenfin içeriği için hangi ifade doğrudur?",
        "Protein ve bağışıklık hücreleri taşıyabilir; içeriği bölgeye göre değişir",
        [
          "Her yerde yalnız saf sudur",
          "Hiçbir protein hiçbir koşulda lenfe geçemez",
          "Normal lenfin temel hücresi daima eritrosittir",
          "Lenf bütün bölgelerde kesin aynı yağ derişimindedir",
        ],
        "Bölgesel farkı ve protein dönüşünü koru.",
        "Lenf su, iyon, protein ve hücre taşır; bağırsak bölgesinde yağ paketleri artabilir. Hiç protein veya pıhtılaşma proteini yok genellemesi doğru değildir.",
      ],
      [
        "Lenf düğümü, dalak ve timus için doğru eşleştirme hangisidir?",
        "Düğüm lenfle gelen içeriği inceler; dalak kanı, timus T olgunlaşmasını destekler",
        [
          "Üçü de yalnız sisterna şili adlı kanal boşluğudur",
          "Dalak yalnız safra üretir",
          "Timus bütün eritrositleri portal vene iter",
          "Düğüm yalnız bir mitral kapaktır",
        ],
        "Organın işlediği ortamı ayır.",
        "Lenfoid organlar aynı göreve indirgenmez. Düğüm lenf yolunda, dalak kanla karşılaşmada, timus ise T hücresi olgunlaşmasında önemlidir.",
      ],
      [
        "Sisterna şili için hangi tanım uygundur?",
        "Alt bölge lenf yollarıyla ilişkili genişleme; lenf düğümü değildir",
        [
          "Antikor üreten tek büyük hücre",
          "Bir safra taşı",
          "Kalbin SA düğümünün diğer adı",
          "Yalnız mide asidinin enzimi",
        ],
        "Damar rezervuarı ile bağışıklık organını ayır.",
        "Sisterna şili bazı anatomik düzenlerde alt bölge lenfinin toplandığı genişlemedir. Timus veya lenf düğümü kümesi gibi adlandırılmaz.",
      ],
      [
        "İnce bağırsak epitelinden çıkan uzun zincir lipit şilomikronu için uygun yol hangisidir?",
        "Lakteal → lenf yolları → göğüs kanalı → venöz kan",
        [
          "Doğrudan sistik kanal → safra kesesi",
          "Yalnız üreter → idrar",
          "Mikrovillus → mide paryetal hücresi",
          "Daima hiç kana katılmadan yalnız dışkı",
        ],
        "İlk lenf yoluyla son kan birleşimini birlikte izle.",
        "Şilomikron bağırsak laktealine girer ve sonra venöz kana katılır. Kısa/orta zincir yağ asidi portal istisnası tüm yağ ürünlerinin aynı ilk yolu kullandığı iddiasını engeller.",
      ],
      [
        "Dolaşım hastalıklarını doğru sınırlayan ifade hangisidir?",
        "İnme tıkanma veya kanama gibi farklı mekanizmalarla oluşabilir",
        [
          "Her inme kesin yalnız tek pıhtıdır",
          "Bütün ven genişlemeleri lenf düğümü çoğalmasıdır",
          "Ateroskleroz yalnız bir vitamin adıdır",
          "Bir ilaç adı bütün göğüs ağrılarında aynı müdahaleyi kesin belirler",
        ],
        "Tek görünümün farklı nedenleri olabilir.",
        "İskemi ve kanama farklı süreçlerdir. Varis, arter plağı ve lenf engeli de ayrı mekanizmalar taşır; temel öğretim tek kişisel tanı veya ilaç seçimi değildir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 91–95; OGM Dersler Cepte Dolaşım PDF 16–17 gerçek öğretim ve lenf dönüşü şekilleriyle karşılaştırılmış özgün anlatım ve sorular. Anatomik sağ-sol ve seçici sıvı bütçesi açık belirtilir; resmî sınav sorusu değildir.",
  },
  {
    id: "bagisiklik-sistemi",
    topic: "detail-315",
    title: "Bağışıklık: engelden özgül belleğe",
    minutes: 48,
    objectives: [
      "Doğal ve kazanılmış yanıtların birlikte işleyişini hücre ve molekül düzeyinde açıkla.",
      "B-antikor ile T hücresi yollarını hedef, sunum ve klon seçimiyle ayır.",
      "Aktif ve pasif bağışıklığı kaynağı, süre ve bellek bakımından karşılaştır.",
      "Alerji, otoimmünite ve yetersiz yanıtı aynı mekanizma saymadan kanıtla sınırla.",
    ],
    sections: [
      {
        title: "Savunma katmanları işbirliği yapar",
        paragraphs: [
          "Deri, mukozalar, doğal hücresel yanıtlar ve özgül lenfosit yanıtları bedeni koruyan birlikte çalışan düzenlerdir. Birinci, ikinci ve üçüncü hat öğretim düzeni mekanizmaları gruplamaya yardım eder. Gerçekte bütün basamaklar her olayda kesin sırayla biri bitince diğeri başlayacak biçimde yalıtık değildir.",
          "Doğal bağışıklık yaygın mikrobiyal örüntüler ve hasar sinyallerini tanır; hiçbir şeyi tanımayan rastgele bir güç değildir. Kazanılmış yanıtta antijene özgü klon seçimi ve bellek önemlidir. Doğal yanıt antijen sunumu ve haberci moleküllerle özgül yanıtın başlamasını da etkiler.",
        ],
      },
      {
        title: "Yüzey engelleri sadece duvar değildir",
        paragraphs: [
          "Sağlam deri fiziksel engel; yağ, pH ve yüzey bileşenleri kimyasal destek oluşturur. Solunum mukusu maddeleri tutarken siller hareketle uzaklaştırmaya yardım eder. Gözyaşı ve tükürükteki lizozim gibi moleküller, mide asidi ve normal mikrobiyota farklı bölgelerde katkı verir.",
          "Her mikrop aynı yüzeyden giremez; engelin hasarı veya giriş yolu sonucu değiştirir. Mikrobiyotadaki her türün bütün koşullarda yararlı, bütün yabancı moleküllerin de tehlikeli olduğu söylenmez. Yüzey engelini geçmek ağır hastalığın kesin oluştuğu anlamına gelmez; içerideki yanıtlar da devrededir.",
        ],
      },
      {
        title: "Fagositler, inflamasyon ve ateş",
        paragraphs: [
          "Nötrofiller ve makrofajlar gibi fagositler hedefleri çevreleyip hücre içine alabilir ve parçalayabilir. Monositler dokuya geçtiğinde makrofajlara farklılaşabilir; önce mutlaka bir hedefi yutmuş olmaları gerekmez. Fagositoz ile antikorun dışarıdan bağlanması farklı mekanizmalardır.",
          "Hasar ve enfeksiyon sinyalleri damar genişlemesi, geçirgenlik ve hücre çağrılmasıyla inflamasyona katkı verir. Kızarıklık, ısı, şişlik ve ağrı bu süreçle ilişkili olabilir, tek neden kanıtı değildir. Ateş düzenlenmiş bir sistem yanıtıdır; her sıcaklık artışı aynı nedenli veya ne kadar yüksekse o kadar yararlı sayılmaz.",
        ],
      },
      {
        title: "Kompleman, interferon ve NK farklı araçlardır",
        paragraphs: [
          "Kompleman proteinleri işaretleme, inflamasyon ve bazı hedef zarlarına etki gibi yollarla savunmayı destekler. Bazı yollar antijen-antikor kompleksleriyle, bazıları başka tanıma düzenleriyle başlayabilir. Komplemanın adı antikor üreten hücre veya yalnız tek antikor molekülü değildir.",
          "İnterferonlar komşu hücrelerin antiviral durumuna ve bağışıklık haberleşmesine katkı verir; virüsü doğrudan tek başına her durumda yok eden sihirli madde sayılmaz. NK hücreleri bazı enfekte veya anormal hücreleri perforin/granzim gibi araçlarla apoptoza yöneltebilir. Bu, hedefi fagosit gibi bütünüyle yutmakla aynı olay değildir.",
        ],
      },
      {
        title: "Antijenin bütünü ve epitopun sınırı",
        paragraphs: [
          "Antijen bağışıklık tanımasıyla ilişkili molekül veya yapıdır; tek bir mikrop üzerinde pek çok farklı epitop bulunabilir. Bir lenfosit reseptörü ya da antikor belirli yapısal bölgelere bağlanır. Bir mikrobun bütününü tek antijen ve tek değişmez anahtar gibi düşünmek ayrıntıyı kaybettirir.",
          "Önceden oluşmuş farklı reseptörlü lenfositler arasından uygun hedefi tanıyan klonun etkinleşip çoğalması klonal seçime örnektir. Mikrop hücreye yeni ihtiyaç duyduğu antikoru çizip sipariş vermez. Aynı yapı benzerlikleri çapraz bağlanma oluşturabilir; her antikor yalnız tek bütün canlı türüne mutlak bağlanır genellemesi yapılmaz.",
        ],
      },
      {
        title: "B hücresinden plazma hücresine humoral yanıt",
        paragraphs: [
          "Uygun B hücresinin antijenle karşılaşması ve gereken yardımcı sinyallerle etkinleşmesi çoğalmayı destekler. Hücrelerin bir bölümü antikor salgılayan plazma hücrelerine, bir bölümü bellek hücrelerine farklılaşır. B hücresi adı bütün grubun aynı anda aynı miktarda antikor salgıladığı anlamına gelmez.",
          "Antikorlar hedefe bağlanarak nötralizasyon, hücrelerin hedefi tanımasına yardım ve başka efektör yolları destekleyebilir. Antikorun her durumda tek başına mikrobun duvarını delmesi zorunlu değildir. Kanda ve mukozada farklı antikor sınıfları rol oynar; etkinlik hedef ve bağlamla birlikte değerlendirilir.",
        ],
      },
      {
        title: "T hücresi için sunum ve hücresel hedef",
        paragraphs: [
          "T hücreleri antijeni çoğunlukla hücre yüzeyinde sunulmuş peptit ve uygun MHC bağlamında tanır. Yardımcı T hücreleri başka hücrelerin yanıtını düzenler; sitotoksik T hücreleri uygun hedef hücrelerin ölümüne katkı verir. Yardımcı ile öldürücü görevler aynı hücre işi değildir.",
          "Hücre içindeki her molekülün antikora serbestçe erişilebilir olduğu varsayılmaz. T tanıması için işleme ve sunum, hedefin uygun yüzey bağlamı ve ek sinyaller önemlidir. NK ile sitotoksik T’nin ikisi hücre ölümünü destekleyebilir, fakat tanıma kuralları aynı özgül klon modeline indirgenmez.",
        ],
      },
      {
        title: "İlk karşılaşma ve antijene özgü bellek",
        paragraphs: [
          "Birincil yanıtta uygun klonların etkinleşmesi ve çoğalması zaman alır. Aynı antijenle yeniden karşılaşmada uygun bellek hücreleri daha hızlı ve güçlü yanıtı destekleyebilir. Bu ifade her durumda her kişinin kesin hiç hastalanmayacağı anlamına gelmez; hedefin değişimi, süre ve bireysel koşullar önemlidir.",
          "A antijenine ait bellek, tamamen farklı B antijeni için aynı özgül belleğin otomatik varlığı değildir. Grafiklerde zaman ekseni, antijen türü ve verilen yanıt büyüklükleri birlikte okunur. Önceden geçirmiş olmak ile dışarıdan hazır antikor almak, belleğin kaynağı bakımından farklı olaylardır.",
        ],
      },
      {
        title: "Aktif kazanım ile hazır antikor desteği",
        paragraphs: [
          "Aktif bağışıklıkta kişinin kendi yanıtı etkinleşir; doğal karşılaşma veya aşılama buna örnek olabilir. Pasif bağışıklıkta hazır antikorlar alınır; etki daha hızlı başlayabilir ama alıcının otomatik yeni özgül belleğini oluşturmaz. Koruma süresi hedef, ürün ve kişinin koşuluna göre değişir.",
          "Aşıların farklı türleri bağışıklığa antijen bilgisi sunar; her aşı yalnız canlı mikrop veya her doz ömür boyu tam koruma demek değildir. Antiserum hazır özgül antikor içeren ürün bağlamıdır; genel serum sözcüğü her zaman böyle bir ürün değildir. Aktif-pasif ayrımı ilacın adıyla değil, yanıtın kimde üretildiğiyle kurulur.",
        ],
      },
      {
        title: "Anneden geçen antikorun iki yolu",
        paragraphs: [
          "İnsanda anneden plasentayla geçen IgG doğum öncesi pasif desteğe örnektir. Anne sütündeki salgısal IgA özellikle mukozal yüzey korumasına katkı verir; bunların hepsi bebeğin kanına aynı düzeyde geçiyor diye genellenmez. Geçiş yolu ve görev bölgesi farklıdır.",
          "Hazır anne antikorunun bulunması bebeğin aynı antijene kendi bellek hücrelerini zorunlu oluşturduğunu kanıtlamaz. Bebeğin gelişen bağışıklığı, kendi karşılaşmaları ve aşı yanıtı ayrı süreçlerdir. Anne-bebek bağışıklık ilişkisi tek bir antikor türüne veya tek dokuda aynı mekanizmaya indirgenmez.",
        ],
      },
      {
        title: "Alerji, otoimmünite ve bağışıklık yetersizliği",
        paragraphs: [
          "Alerji normalde zararsız olabilen bir hedefe uygunsuz aşırı yanıtla ilişkilidir. Bazı hızlı tiplerde IgE ve mast hücreleri önemlidir; bütün alerjileri aynı IgE süreci saymak yanlıştır, gecikmiş T hücreli yollar da vardır. Histamin gibi aracıların etkisi hedef dokuya göre değişir.",
          "Otoimmünitede öz yapılara toleransın bozulması, bağışıklık yetersizliğinde ise yanıtın belirli kollarının eksikliği önemlidir. Bunlar yalnız antikor miktarı tek sayıdan okunmaz. HIV’nin belirli yardımcı T hücrelerini etkilemesi gibi örnekler savunma ağındaki bir kaybın geniş etkisini gösterir; her enfeksiyon aynı mekanizma değildir.",
        ],
      },
      {
        title: "Kök hücreden olgun lenfosite ve karşılaşma yerine",
        paragraphs: [
          "B ve T lenfosit soyları kemik iliğindeki kan yapıcı kök hücrelerle ilişkilidir. İnsan B hücrelerinin olgunlaşması temel olarak kemik iliğinde, T hücrelerinin olgunlaşması timusta gerçekleşir. Olgunlaşma sürecinde uygun reseptör ve öz yapılara karşı denetim önemlidir; yalnız bir organın büyümesi güçlü ve kusursuz bağışıklık kanıtı değildir.",
          "Olgun hücreler kan ve lenfle dolaşıp lenf düğümü, dalak ve mukozal lenfoid dokularda karşılaşmalara katılabilir. Birincil olgunlaşma organı ile antijenle karşılaşmanın gerçekleştiği ikincil organ aynı sınıf değildir. B hücresinin B harfini bütün görevlerinin kanın tek boşluğunda tamamlanması diye, T hücresini de yalnız timusta yaşam boyu sabit kalma diye yorumlama. Etkinleşme, çoğalma ve plazma/bellek farklılaşması sonraki ayrı basamaklardır.",
        ],
      },
      {
        title: "Özgüllük ve azalma hesabını karıştırma",
        paragraphs: [
          "Modelde hazır A antikoru 32 birimle başlıyor ve verilen yapay yarı ömür 4 gün. Sekiz günde iki yarılanma ile 8 birim kalır. Bu sayısal azalma hedef B olduğunda antikorun B’ye bağlandığını göstermez; miktar ve eşleşme iki ayrı koşuldur.",
          "Bu yarı ömür bütün gerçek antikorların ortak ölçümü değildir. Etkileşimde A belleği, hazır A antikoru ve uygun sunum ayrı düğmelerdir: biri yeniden yanıtı, biri geçici hazır bağlanmayı, biri T tanımasını etkiler. Şekilde aynı rengi görmek yerine hedef–reseptör eşini ve gereken sinyali gerekçenle açıkla.",
        ],
      },
    ],
    examples: [
      {
        title: "Bellek hangi hedef içindir?",
        prompt:
          "Kişinin A antijenine özgü bellek hücreleri var; karşılaşma B antijeniyle. A ve B bu modelde çapraz bağlanmıyor. Hızlı A belleği doğrudan B yanıtı mıdır?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Verilen bellek yalnız A’ya özgüdür.",
          },
          {
            label: "2. adım",
            explanation:
              "B için aynı tanıma koşulu sağlanmadığından A belleği doğrudan eşleşmez.",
          },
          {
            label: "3. adım",
            explanation:
              "B’ye yanıt için uygun kendi klonları gerekir; bütün bağışıklık yok demeyiz.",
          },
        ],
        answer: "B için otomatik A bellek yanıtı çıkarılamaz.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Bir hedef belleğini bütün antijenlere yaymak.",
      },
      {
        title: "Hazır antikorun yapay yarı ömrü",
        prompt:
          "Modelde A’ya bağlanan hazır antikor 32 birim. Her 4 günde yarıya iniyor; üretim yok. 8. günde miktar?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Sekiz gün iki adet 4 günlük dönemdir.",
          },
          {
            label: "2. adım",
            explanation: "32→16→8 birim kalır.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu hazır antikor alıcının otomatik bellek hücresi oluşturduğunu kanıtlamaz.",
          },
        ],
        answer: "8 birim.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall: "Azalmayı doğrusal 32−8 veya yeni bellek üretimi sanmak.",
      },
      {
        title: "T hücresi ve antikor aynı erişime sahip mi?",
        prompt:
          "Modelde hücre içi bir hedefin peptidi yüzeyde uygun MHC ile sunuluyor. Sitotoksik T ile serbest antikorun erişimini ayır.",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "T hücresi sunulmuş peptit–MHC bağlamını tanıyabilir.",
          },
          {
            label: "2. adım",
            explanation:
              "Serbest antikorun hücre zarını geçip bütün sitoplazmik moleküllere doğrudan ulaştığı verilmemiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "İki yanıt farklı hedef erişimi kullanır; NK tanıması da ayrı koşullara dayanır.",
          },
        ],
        answer:
          "T için uygun yüzey sunumu önemli; antikor bütün hücre içine serbestçe girmez.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Hücre içindeki her hedefi antikorun doğrudan gördüğünü sanmak.",
      },
      {
        title: "Anneden iki farklı pasif yol",
        prompt:
          "X antikoru plasentayla geçiyor; Y anne sütünde mukozal desteğe katılıyor. İnsandaki temel örnekler?",
        strategy:
          "Önce bölmeleri ve verilen koşulu ayır; ilişkiyi kurup sonucu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Plasenta için IgG örneğini seç.",
          },
          {
            label: "2. adım",
            explanation: "Salgısal süt antikoru için IgA örneğini seç.",
          },
          {
            label: "3. adım",
            explanation:
              "İki yol da hazır antikor desteğidir; bebeğin kendi özgül belleği otomatik kanıtlanmaz.",
          },
        ],
        answer: "X: IgG; Y: salgısal IgA.",
        check: "Sonuç verilen modelin birimi ve koşullarıyla sınırlıdır.",
        pitfall:
          "Sütteki bütün antikorun bebeğin kanına aynı mekanizmayla geçtiğini varsaymak.",
      },
    ],
    recall: [
      {
        prompt: "Doğal bağışıklık hiç tanımaz mı?",
        answer:
          "Ortak mikrobiyal örüntü ve hasar sinyallerini tanır; rastgele değildir.",
      },
      {
        prompt: "B hücresi ile plazma hücresi aynı görev mi?",
        answer:
          "Plazma hücresi antikor salgılayan farklılaşmış hücredir; bütün B hücreleri aynı anda plazma hücresi değildir.",
      },
      {
        prompt: "Pasif antikor otomatik bellek yapar mı?",
        answer:
          "Hayır; hazır antikor sağlanması alıcının aynı antijene kendi belleğini oluşturduğunu kanıtlamaz.",
      },
      {
        prompt: "Birincil ve ikincil yanıtın ana koşulu?",
        answer:
          "İkincil özgül yanıt için uygun antijene ait bellek ve diğer yanıt koşulları gerekir; farklı antijene otomatik yayılmaz.",
      },
    ],
    items: [
      [
        "Doğal bağışıklık için hangi açıklama uygundur?",
        "Yaygın mikrobiyal örüntü ve hasar sinyallerini tanıyan hızlı yanıt yolları içerir",
        [
          "Hiçbir yapıyı tanımaz ve tamamen rastgele çalışır",
          "Yalnız tek bir antikorun ismidir",
          "Her hedefe mutlaka yeni aşı yapar",
          "Kazanılmış yanıtla hiçbir haberleşmesi yoktur",
        ],
        "Özgül klon belleği yokluğu tanıma yokluğu demek değildir.",
        "Doğal tanıma ortak örüntüler üzerinden işler ve özgül yanıta haber iletebilir. Üç savunma hattı gerçek olayda tamamen yalıtık bir sıra değildir.",
      ],
      [
        "NK hücresinin bazı hedef hücreleri öldürmesi için uygun açıklama hangisidir?",
        "Perforin/granzim gibi araçlarla hedef hücre ölümünü destekleyebilir",
        [
          "Hedefi zorunlu bütün hâlde fagosite ederek antikor üretir",
          "Yalnız safra tuzu salgılayan hücredir",
          "Bütün hedefleri MHC-peptit özgül T klonuyla aynı biçimde tanır",
          "Olgun eritrositin çekirdeğidir",
        ],
        "Öldürme yolu ile fagositozu ve T özgüllüğünü ayır.",
        "NK’nin sitotoksik etkisi fagositozla aynı olay değildir. Sitotoksik T ile bazı araçlar ortak olsa da tanıma düzenleri aynı özgül reseptör modeline indirgenmez.",
      ],
      [
        "Uygun B hücresi etkinleşip çoğalıyor. Hücrelerin bir bölümü yoğun antikor salgılıyor. Bu farklılaşmış hücrelerin adı nedir?",
        "Plazma hücresi",
        [
          "Paryetal hücre",
          "Eritrosit",
          "Megakaryosit",
          "Hepatositin safra kanalcığı",
        ],
        "Antikor salgılayan B türevini seç.",
        "Plazma hücresi antikor üreten farklılaşmış B türevidir. Diğer bazı hücreler bellek yönüne gidebilir; bütün B hücreleri aynı anda aynı görevde değildir.",
      ],
      [
        "T hücresinin antijen tanımasında temel uygun koşul hangisidir?",
        "Uygun MHC bağlamında yüzeyde sunulmuş peptidin tanınması",
        [
          "Hücre içindeki her moleküle serbest antikor gibi sınırsız girme",
          "Yalnız mide pH’sını doğrudan ölçen hemoglobin olma",
          "Antijeni mutlaka glikoza çevirme",
          "Bütün tanımayı safra kesesindeki yağ damlasıyla yapma",
        ],
        "Hücre içi bilgi yüzeye nasıl sunulur?",
        "T reseptörleri sunulmuş peptit ve uygun yüzey bağlamına göre tanır; ek sinyaller de önemlidir. Bu yol serbest antikorun hücre içine sınırsız girmesi değildir.",
      ],
      [
        "Modelde yalnız A’ya özgü bellek var; B ile karşılaşma gerçekleşiyor ve A-B çapraz tanıması yok. Hangisi desteklenir?",
        "A belleği B için otomatik aynı özgül bellek yanıtını sağlamaz",
        [
          "A belleği bütün antijenlere kesin aynı hızda yanıt verir",
          "B için hiçbir bağışıklık hücresi hiçbir koşulda bulunamaz",
          "B karşılaşması bütün belleği glikojene çevirir",
          "Bellek yalnız safra kesesinde depolanan antikordur",
        ],
        "Özgüllük koşulunu koru.",
        "Uygun bellek hedef antijenle eşleşmelidir. B için birincil uygun klon yanıtı mümkünken A belleğinin aynı hazır B yanıtı olduğu söylenemez.",
      ],
      [
        "Hazır özgül antikor verilmesiyle sağlanan pasif destek için hangisi doğrudur?",
        "Alıcının kendi aynı antijene özgü belleğini otomatik oluşturduğunu kanıtlamaz",
        [
          "Her koşulda ömür boyu tam koruma sağlar",
          "Mutlaka alıcının bütün B hücrelerini aşı gibi etkinleştirir",
          "Sadece canlı mikrobun kalıcı yerleşmesidir",
          "Hazır antikor hiç bağlanma yapamaz",
        ],
        "Hazır ürün ile alıcının kendi yanıtını ayır.",
        "Pasif destek hazır antikor sağlar ve zamanla azalabilir. Kendi klonlarının etkinleşmesi ve bellek oluşması ayrıca gereken koşullardır; ürünün varlığı bunların kanıtı değildir.",
      ],
      [
        "Yapay modelde hazır antikor 32 birim, yarı ömür 4 gün ve yeni üretim yok. Sekizinci gün kaç birim kalır?",
        "8",
        ["24", "16", "4", "0"],
        "İki yarılanma uygula.",
        "8/4=2 dönem; 32×(1/2)²=8. Bu verilen modelin yarı ömrüdür; bütün gerçek antikorlar için ortak süre veya kişisel koruma eşiği değildir.",
      ],
      [
        "İnsanda anneden pasif antikor desteğinin temel eşleştirmesi hangisidir?",
        "Plasenta: IgG; anne sütü mukozal desteği: salgısal IgA",
        [
          "Plasenta: yalnız trombosit; süt: yalnız eritrosit",
          "Plasenta: safra; süt: glikojen",
          "Her iki yol yalnız timusta yapılmış kemiktir",
          "Süt antikoru her koşulda bebeğin kanına tümüyle aynı yoldan geçer",
        ],
        "Geçiş yolu ve antikor sınıfını birlikte seç.",
        "IgG plasental, salgısal IgA sütle mukozal destek örneğidir. Hazır antikorun geçmesi bebeğin kendi belleğinin otomatik oluştuğu anlamına gelmez.",
      ],
      [
        "Alerji ve otoimmünite için doğru sınır hangisidir?",
        "Alerji uygunsuz aşırı yanıt, otoimmünite öz yapılara tolerans bozukluğuyla ilişkilidir",
        [
          "Bütün alerjiler yalnız aynı IgE yoludur",
          "Her otoimmünite sadece vitamin eksikliği adıdır",
          "İkisi de hiçbir bağışıklık hücresi içermeyen saf mekanik kırılmadır",
          "Her yüksek antikor değeri aynı kesin kişisel tanıyı verir",
        ],
        "Hedefi ve yanıt düzenini ayır.",
        "Bazı hızlı alerjilerde IgE-mast yolu önemlidir; gecikmiş T yolları da bulunabilir. Otoimmünitede öz yapılara tolerans sorunu ayrı mekanizmadır; tek sayı tümünü belirlemez.",
      ],
      [
        "Kompleman proteinleri için uygun açıklama hangisidir?",
        "İşaretleme ve inflamasyon gibi efektör yolları destekler; yalnız antikor üreten hücre değildir",
        [
          "Bütün kompleman yalnız plazma hücresinin diğer adıdır",
          "Her kompleman molekülü zorunlu bütün antikorları sentezler",
          "Kompleman yalnız nişastayı sindiren amilazdır",
          "Kompleman hiçbir doğal tanıma yoluyla başlayamaz",
        ],
        "Savunma proteini ile antikor üretici hücreyi ayır.",
        "Kompleman bazı antijen-antikor yollarıyla ve başka aktivasyon yollarıyla çalışabilir. Savunmanın efektör ağıdır; antikor salgılayan hücre veya tek immünoglobulin değildir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 1 PDF 96–99; OGM Dersler Cepte Dolaşım PDF 18–19 gerçek öğretim ve özgül yanıt şekilleriyle karşılaştırılmış özgün anlatım ve sorular. Sayısal antikor azalması açık oyuncak modeldir; resmî sınav sorusu değildir.",
  },
];

export const forge018BiologyTopics: Record<string, string> = Object.fromEntries(
  data.map((d) => [d.id, d.topic]),
);
export const forge018BiologyGuides: LessonGuide[] = data.map(
  ({ items: _items, topic: _topic, title: _title, ...d }) => d,
);
function question018(
  d: Unit018,
  item: Unit018["items"][number],
  i: number,
): Question {
  const [prompt, correct, wrong, hint, explanation] = item;
  if (wrong.length !== 4) throw Error("Five choices required: " + d.id);
  const answer = i % 5,
    options = [...wrong];
  options.splice(answer, 0, correct);
  return {
    id: `f018-bio-${d.id}-${i + 1}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(explanation),
    skill: `f018-bio-${d.id}-${i + 1}`,
  };
}
export const forge018BiologyLessons: Lesson[] = data.map((d) => ({
  id: d.id,
  subjectId: "ayt-biyoloji",
  title: txt(d.title),
  minutes: d.minutes,
  objectives: d.objectives.map(txt),
  body: d.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join(" ")),
  })),
  questions: d.items.map((q, i) => question018(d, q, i)),
  source: txt(d.source),
  tags: ["kaynakli", "etkilesimli", "forge018"],
}));
