import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

function whole023(value: number, min: number, max: number) {
  return Number.isInteger(value) && value >= min && value <= max;
}
/** Tenths of MPa are the explicitly discrete measurement grid used in this lesson. */
export function guardWater023(
  soluteTenths: number,
  pressureTenths: number,
  outsideTenths: number,
) {
  if (
    !whole023(soluteTenths, -30, 0) ||
    !whole023(pressureTenths, 0, 15) ||
    !whole023(outsideTenths, -30, 0)
  )
    throw new RangeError("GUARD_WATER_GRID");
  const cellTenths = soluteTenths + pressureTenths;
  const differenceTenths = outsideTenths - cellTenths;
  return {
    soluteTenths,
    pressureTenths,
    outsideTenths,
    cellTenths,
    differenceTenths,
    cell: cellTenths / 10,
    outside: outsideTenths / 10,
    difference: differenceTenths / 10,
    direction:
      differenceTenths > 0
        ? ("in" as const)
        : differenceTenths < 0
          ? ("out" as const)
          : ("equal" as const),
    // A schematic interpolation of the supplied turgor, not a fitted pore diameter or future state.
    openingFraction: pressureTenths / 15,
  };
}
export const surfaceNames023 = {
  stoma: "Stoma",
  cuticle: "Kütikula",
  hair: "Örtü tüyü",
  rootHair: "Emici tüy",
  hydathode: "Hidatot",
  prickle: "Emergens",
  periderm: "Periderm",
  lenticel: "Lentisel",
} as const;
export type Surface023 = keyof typeof surfaceNames023;
export const surfaceFacts023: Record<
  Surface023,
  { place: string; structure: string; function: string; evidence: string }
> = {
  stoma: {
    place: "Yaprak ve genç yeşil gövde",
    structure: "İki canlı bekçi hücresi ve aradaki boşluk.",
    function: "Gaz alışverişi ve su buharı kaybı; açıklık turgorla ayarlanır.",
    evidence:
      "Kloroplast, boşlukta yer almaz; bekçi hücresinde bulunur. Gazın yönü iç ve dış derişimlere bağlıdır.",
  },
  cuticle: {
    place: "Toprak üstü genç yüzey",
    structure: "Epidermisin dışındaki hücresiz kütin ve mum örtüsü.",
    function: "Denetimsiz su kaybını sınırlar ve dış etkilere karşı korur.",
    evidence:
      "Örtüyü üreten epidermis canlı hücrelerdir; bu dış tabaka ayrı bir hücre değildir.",
  },
  hair: {
    place: "Yaprak ve genç gövde",
    structure: "Epidermis kökenli bir veya çok hücreli çıkıntı.",
    function: "Örtü tüyü, yüzey yakınındaki hava akımı ve ışıkla ilişkilidir.",
    evidence:
      "Aynı köken, bütün tüylerin aynı görevi yaptığı anlamına gelmez; salgı ve savunma tipleri de vardır.",
  },
  rootHair: {
    place: "Genç kökün olgunlaşma bölgesi",
    structure: "Bir epidermis hücresinin ince uzantısı.",
    function: "Toprak çözeltisine temas alanını artırır.",
    evidence:
      "Kendi ksilem ve floem düzeni, kaliptrası yoktur; çok hücreli yan kök değildir.",
  },
  hydathode: {
    place: "Yaprak ucu ve kenarı",
    structure: "Ksilem uçlarıyla ilişkili sıvı çıkış yolu.",
    function:
      "Uygun kök basıncı ve düşük terlemede gutasyonla damla çıkabilir.",
    evidence:
      "Mineral içeren sıvı ile su buharını ayır. Çiy, dış havadaki buhar yüzeyde yoğuşunca oluşur.",
  },
  prickle: {
    place: "Örneğin gül yüzeyi",
    structure: "Epidermis ve alt dokuların katıldığı sivri çıkıntı.",
    function:
      "Savunmaya katkı verir; tipik gül örneğinde iletim demeti taşımaz.",
    evidence:
      "Kaktüs yaprak dikeni, aynı sivri görünüşe rağmen farklı organ kökenlidir.",
  },
  periderm: {
    place: "Sekonder kalınlaşan odunsu yüzey",
    structure: "Mantar, canlı mantar kambiyumu ve bulunabilen iç parankima.",
    function: "Epidermisin yerini alıp dış korumayı sürdürür.",
    evidence:
      "Olgun mantar hücreleri çoğunlukla ölüdür; bütün peridermi tek ölü hücre tabakası sayma.",
  },
  lenticel: {
    place: "Peridermli yüzey",
    structure: "Gevşek hücreler ve gaz aralıkları içeren bölge.",
    function:
      "İç canlı dokularla dış ortam arasında gaz alışverişine yardım eder.",
    evidence:
      "O₂, CO₂ ve bir miktar su buharı geçebilir. İki bekçi hücresinin hızlı denetimi yoktur.",
  },
};
export const rootRoutes023 = {
  apoplast: "Apoplast",
  symplast: "Simplast",
  transmembrane: "Zar yolu",
} as const;
export type RootRoute023 = keyof typeof rootRoutes023;
export const rootCargo023 = {
  water: "Su",
  ion: "Seçili iyon",
  tracer: "Zarı geçmeyen boya",
} as const;
export type RootCargo023 = keyof typeof rootCargo023;
/** A counted ideal tracer experiment. The common downstream xylem exit is supplied open. */
export function rootPath023(
  route: RootRoute023,
  bandIntact: boolean,
  cargo: RootCargo023,
  ionEntry: boolean,
  count: number,
  stage: number,
) {
  if (
    !Object.hasOwn(rootRoutes023, route) ||
    !Object.hasOwn(rootCargo023, cargo) ||
    typeof bandIntact !== "boolean" ||
    typeof ionEntry !== "boolean" ||
    !whole023(count, 0, 24) ||
    !whole023(stage, 0, 3)
  )
    throw new RangeError("ROOT_PATH_INPUT");
  const needsMembrane = route !== "apoplast" || bandIntact;
  const membranePermits = cargo === "water" || (cargo === "ion" && ionEntry);
  const canPass = !needsMembrane || membranePermits;
  const blockedAt = canPass
    ? null
    : route === "apoplast"
      ? "endodermis"
      : "entry";
  const reachedStage = canPass
    ? stage
    : Math.min(stage, blockedAt === "entry" ? 0 : 1);
  const arrived = stage === 3 && canPass ? count : 0;
  return {
    route,
    bandIntact,
    cargo,
    ionEntry,
    count,
    stage,
    needsMembrane,
    membranePermits,
    canPass,
    blockedAt,
    reachedStage,
    arrived,
    notArrived: count - arrived,
    verdict: canPass ? "Geçiş mümkün" : "Yol engelli",
    evidence: !needsMembrane
      ? "Bandın deneysel kesintisi, bu ideal düzende duvar yolunu açık bırakır. Bu yol zar seçiciliğini sınamaz."
      : membranePermits
        ? route === "apoplast"
          ? "Sağlam band duvar yolunu keser; verilen madde zar denetimiyle iç yola geçer."
          : "İlk hücreye zarla giriş açıktır. Hücre içi ya da tekrar zar geçen rota, verilen koşulda devam eder."
        : blockedAt === "entry"
          ? "Seçilen hücre içi rota için ilk zar geçilmelidir. Verilen madde bu girişte durur; bandı kesmek bu zar koşulunu değiştirmez."
          : "Sağlam band duvar yolunu keser. Verilen madde gerekli zar geçişini yapamaz; bandın dışında kalır.",
  };
}
export const rootZoneNames023 = {
  cap: "Kaliptra",
  division: "Bölünme",
  elongation: "Uzama",
  maturation: "Olgun bölge",
} as const;
export type RootZone023 = keyof typeof rootZoneNames023;
export const rootZoneFacts023: Record<RootZone023, string> = {
  cap: "Ucu örten kaliptra korur, müsilaj salgısına ve yerçekimini algılamaya katılır. Uç meristemi onun gerisinde yer alır.",
  division:
    "Uç meristemi yeni hücre üretir. Kökün boy artışında sonraki uzama da önemlidir.",
  elongation:
    "Hücre boyu artar. Aynı hücre sayısında daha uzun hücreler, daha uzun bir kök parçası verir.",
  maturation:
    "Hücreler farklılaşır; genç yüzeyde emici tüyler belirginleşir. Tüy, tek hücre uzantısıdır.",
};
type Item023 = {
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
type Unit023 = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  source: string;
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: Item023[];
};
const units023: Unit023[] = [
  {
    id: "bitki-ortu-doku",
    topic: "detail-345",
    title: "Bitkisel örtü doku: koruyan yüzey, denetlenen geçit",
    minutes: 48,
    objectives: [
      "Epidermis, kütikula ve peridermi hücre ve görev düzeyinde ayır.",
      "Bekçi hücresindeki çözünen, su potansiyeli, turgor ve çeper ilişkisini sırayla açıkla.",
      "Stoma, hidatot, lentisel, tüy ve emergensi konum ve çıkan maddenin hâliyle tanı.",
      "Bir deneydeki su kaybını, değişen yüzeyi ve ölçümün sınırını birlikte değerlendir.",
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özetleri: Örtü Doku, kitap s.206–208; OGM Bitkisel Dokular II sunusu s.7–15 ve konu özeti020; Dersler Cepte Bitkilerin Yapısı s.5–6,13. Kaynaklar karşılaştırılarak yazılmış özgün anlatım, şekiller ve alıştırmalar.",
    sections: [
      {
        title: "Bitkinin yüzeyi bir duvar kadar bir alışveriş alanıdır",
        paragraphs: [
          "Bir yaprağın içindeki canlı hücreler su kaybeder, gaz kullanır ve çevreden etkilenir. Örtü doku, bu iç ortam ile dış dünya arasındaki ilk sınırdır: mekanik etkileri ve canlı saldırılarını sınırlar, denetimsiz su kaybını azaltır. Yüzey bütünüyle geçirimsiz olsaydı gerekli gaz alışverişi de güçleşirdi; koruma ile alışveriş birlikte çözülür.",
          "Genç organlarda temel dış örtü epidermistir. Sekonder kalınlaşan birçok odunsu kök ve gövdede onun yerini periderm alır. Bunlar organın içinde uzun mesafe taşımayı yapan ksilem ve floemle aynı doku değildir. Bir kesitte önce dış yüzeyi bul, ardından hangi hücre ve geçitlerin o sınırı oluşturduğunu izle.",
        ],
      },
      {
        title: "Epidermisi hücre olarak tanı",
        paragraphs: [
          "Epidermis, genç kök, genç gövde ve yaprak yüzeyinde genellikle tek kat hâlinde sık dizilen canlı hücrelerden oluşur. Komşu sıradan epidermis hücreleri arasında geniş hava boşluklarının bulunmaması korumaya yardım eder. Olgun hücrelerde belirgin bir merkezî koful ve kenara itilmiş az sitoplazma görülebilir; hücre boyutu veya koful tek başına kimlik kanıtı değildir.",
          "Tipik yaprak epidermisinin sıradan hücreleri kloroplast taşımaz; böylece alttaki fotosentetik dokuya ışık geçişini fazla engellemez. Epidermisten gelişen bekçi hücreleri ise çoğunlukla kloroplast taşır. “Epidermisin bütün hücreleri aynı işi yapar” çıkarımı bu farklılaşmayı siler. Doku kökeni ortak olabilirken hücre işlevi değişebilir.",
        ],
      },
      {
        title: "Kütikula hücre değildir",
        paragraphs: [
          "Toprak üstündeki epidermis hücrelerinin dış yüzeyinde kütin ve mum içeren bir örtü birikir: kütikula. Epidermis canlı hücre katmanıdır; kütikula o hücrelerin dışındaki hücresiz tabakadır. Saydam oluşu ışığın geçmesine, düşük su geçirgenliği ise denetimsiz buhar kaybının sınırlanmasına yardım eder. Tamamen su geçirmez bir plastik zar gibi düşünülmez.",
          "Kurak koşullara uyumlu birçok bitkide kalın kütikula görülür; tür, yaprak yaşı ve çevre de kalınlığı etkiler. Genç toprağa temas eden emici kök yüzeyinde yapraktaki gibi belirgin su geçirmez kütikula bulunmaması emilimi kolaylaştırır. Yaşlı kökte gelişen süberinli koruyucu tabakaları bu genç kök yüzeyiyle karıştırma. Kütikula kalınlığı tek başına bir bitkinin bütün ekolojisini açıklamaz.",
        ],
      },
      {
        title: "Stoma: iki hücre ve aralarındaki açıklık",
        paragraphs: [
          "Stoma sisteminde iki bekçi hücresi bir açıklığı çevreler; çevrede komşu epidermis hücreleri bulunur. Açıklık bir hücre değildir. Bekçi hücreleri canlıdır, çekirdek ve çoğunlukla kloroplast taşır. İçeriye bakan çeper bölümleri ile dışa bakan çeper bölümlerinin kalınlık ve esneme özellikleri farklıdır.",
          "Pek çok geniş yapraklı türde bekçi hücreleri böbrek biçimindedir; buğdaygillerde halter benzeri biçimler görülebilir. Bu yüzden tek çizimin şeklini bütün türlerin zorunlu biçimi sayma. Açılma-kapanmanın ortak mantığı, bekçi hücrelerinin su ve turgor durumunun hücre duvarı mimarisiyle birleşmesidir; mekanizma yalnızca bir deliğin büyümesi değildir.",
        ],
      },
      {
        title: "Gazın yönünü yapan sürece bağla",
        paragraphs: [
          "CO₂ ve O₂, derişim farkları uygun olduğunda stoma açıklığından difüzyonla geçer. Fotosentez sırasında CO₂ tüketimi içeri alımı, O₂ üretimi dışarı çıkışı destekleyebilir. Solunum ise O₂ tüketir ve CO₂ üretir. Yeşil yaprak gündüz de solunum yaptığı için ölçülen net gaz alışverişi, iki sürecin birlikte sonucudur.",
          "Stomadan dışarı çıkan su çoğunlukla buhardır; bu olay terleme, yani transpirasyondur. Buharlaşma yaprağın soğumasına ve ksilemdeki su akışının sürmesine katkı verir. Su buharıyla çözünmüş tuzların aynı biçimde taşındığı söylenmez. Stomanın “yalnız CO₂ atması” veya “bütün gazları hep dışarı vermesi” gibi ezberler, iç ve dış koşulları yok sayar.",
        ],
      },
      {
        title: "Su potansiyelini toplayarak suyun yönünü bul",
        paragraphs: [
          "Matrik ve yerçekimi gibi diğer potansiyel bileşenlerinin verilen iki kompartıman arasında ihmal edildiği okul modelinde su potansiyeli Ψ, çözünen potansiyeli Ψs ile basınç potansiyeli Ψp toplamıdır. Çözünen miktarının artışı, uygun koşullarda Ψs değerini daha negatif yapar. Pozitif turgor basıncı ise Ψp değerini artırır. İki etki aynı şey değildir; birlikte toplanır.",
          "Su, suya geçirgen zardan daha yüksek su potansiyelinden daha düşük su potansiyeline net olarak geçer. Örneğin dış ortam−0,3MPa, hücre−0,8MPa ise net yön hücre içinedir; negatif sayılarda−0,3 daha büyüktür. Bu geçişin kendisi ATP ile pompalanmaz. İyonların taşınması için çalışan pompalar ve kanallar, suyun izlediği farkı dolaylı olarak oluşturabilir.",
        ],
      },
      {
        title: "Çözünen → su → turgor → şekil zinciri",
        paragraphs: [
          "Bekçi hücrelerine K⁺ gibi iyonların ve uygun eş iyonların alınması, ayrıca şeker ve organik çözünenlerdeki değişimler, hücrenin osmotik durumunu etkiler. Su potansiyeli farkı içeri su girişini desteklerse bekçi hücrelerinin turgoru artar. Çeperlerin eşit esnememesi, uygun hücresel mimaride açıklığın genişlemesine katkı verir. Bir basamağı açıklamadan doğrudan “ışık deliği açar” demek mekanizmayı eksik bırakır.",
          "Çözünenlerin dışarı çıkışı ve su kaybı turgoru azaltarak kapanmayı destekler. Bununla birlikte bir anlık potansiyel ölçümü, bütün hücre hacminin veya gelecek açıklığın kesin sayısını vermez; hücre duvarı, komşu hücreler ve zaman önemlidir. Etkileşimde verilen Ψs ve Ψp değerleri anlık ölçümlerdir. Çizimdeki açıklık turgoru anlatan şemadır; gerçek gözenek çapı hesaplanmaz.",
        ],
      },
      {
        title: "Gündüz-gece kuralını koşuluyla öğren",
        paragraphs: [
          "Birçok bitkide ışık ve fotosentetik CO₂ tüketimi stomanın açılmasını destekler. Ancak yeterli su yoksa veya absisik asit gibi kuraklık sinyalleri etkiliyse gündüz kapanma görülebilir. İyon pompaları, kanallar ve iç saat bu denetime katılır. Bekçi hücresinin fotosentezi tek açılma nedeni değildir.",
          "CAM metabolizmasına sahip bazı kurak ortam bitkileri CO₂ alımını ağırlıkla geceye kaydırır. Bu istisna, “her bitkide bütün stomalar gece kapalıdır” cümlesini geçersiz kılar; çoğu bitki için verilen örüntüyü de yok etmez. Bir soruda tür veya deney koşulu verilmişse ona dayan; yalnız saate bakarak kesin gaz akışı ya da açıklık sonucu üretme.",
        ],
      },
      {
        title: "Stomanın yeri yüzeyle ilişkilidir",
        paragraphs: [
          "Birçok kara bitkisinin yaprak alt yüzeyinde stoma yoğunluğu üst yüzeyden fazladır. Kuraklığa uyumlu türlerde stomaların çukurda bulunması ve çevresinde tüyler olması su buharının dış ortama yayılmasını yavaşlatabilir. Bu özellikler yaprak yüzeyi, hava hareketi ve nemle birlikte değerlendirilir.",
          "Suda yüzen yaprakların havayla temas eden üst yüzeyinde stoma bulunması işlevseldir; bütünüyle su altında kalan yapraklarda tipik stomalar olmayabilir. Genç toprak kökünün emici yüzeyinde de stoma aranmaz. “Su bitkisi” tek başına hangi yüzeyin havaya açık olduğunu söylemez; önce organın gerçekten suya batık mı, yüzer mi olduğunu belirle.",
        ],
      },
      {
        title: "Örtü tüyü, yüzeydeki küçük bir çevre kurar",
        paragraphs: [
          "Tüyler epidermis kökenli, bir veya çok hücreli çıkıntılar olabilir. Yaprak üzerindeki örtü tüyleri ışığın bir bölümünü yansıtabilir, aşırı ısınmayı azaltabilir ve yüzey yakınındaki hava hareketini değiştirebilir. Aynı türde bile tüylerin yönü, sıklığı ve çevre koşulları etkili olduğundan her tüylü yaprağın aynı hızda terlediği söylenmez.",
          "Salgı tüyleri nane ve sardunya gibi bitkilerde uçucu veya aromatik maddelerin üretimiyle ilişkilidir. Isırganın savunma tüyleri ise temasla tahriş edici içerik aktarabilir. Bazı tüyler tutunmaya yardım eder. Bu örneklerde ortak olan yüzey kökenidir; salgı, emme ve korunma görevlerini tek bir tüy tipine birden zorunlu olarak yükleme.",
        ],
      },
      {
        title: "Emici tüy bir kök dalı değildir",
        paragraphs: [
          "Kök emici tüyü, genç kökün olgunlaşma bölgesinde bir epidermis hücresinin dışa uzayan bölümüdür; tipik olarak tek hücrelidir. Ayrı bir kök organı, ksilem-floem demeti veya kök şapkası taşımaz. Yüzey alanını artırması, toprak çözeltisiyle temas ve madde alışverişi için önemlidir.",
          "Bir yan kök ise çok hücreli bir organdır ve kendi uç büyüme düzeni ile iletim dokusunu geliştirir. Bu farkı boyuta bakarak değil, hücre sayısı, köken ve doku düzeniyle tanı. Kök uzarken eski tüyler yaşlanır ve yeni olgunlaşan bölgelerde yenileri oluşur. Emici tüylere ait ayrıntılı kök yolu, sonraki kök anlatımında bu epidermis bilgisi üzerine kurulur.",
        ],
      },
      {
        title: "Hidatotta suyu damla olarak izle",
        paragraphs: [
          "Hidatot, çoğunlukla yaprak uç ve kenarlarında ksilem uçlarıyla ilişkili su savağı yapısıdır. Kök basıncının etkili, havanın nemli ve terlemenin düşük olduğu koşullarda sıvı ksilem öz suyu buradan çıkabilir. Gutasyon denilen bu damlama, özellikle bazı otsu türlerde sabah yaprak kenarlarında görülür.",
          "Damlada çözünmüş mineral bulunabilir; bu, stomadan su buharı kaybından ayrılır. Hidatot gözenekleri tipik bekçi hücresi çiftinin etkin açma-kapama denetimiyle çalışmaz. Çiy ise atmosferdeki su buharının yüzeyde yoğuşmasıdır; bitkinin içinden ksilem yoluyla gelmek zorunda değildir. Yalnız bir damla fotoğrafı, kaynağı ve mineral analizi olmadan iki olayı kesin ayırmayabilir.",
        ],
      },
      {
        title: "Emergensi gerçek organ dikeninden ayır",
        paragraphs: [
          "Gülün sivri çıkıntısı, epidermis ile epidermis altındaki dokuların katıldığı bir emergens, yani yüzey çıkıntısıdır. Yalnız tek epidermis hücresinin uzantısı olan emici tüyden farklıdır. Tipik gül emergensi içinde kök veya gövde organının düzenli iletim demeti bulunmaz; yüzeyden nispeten kolay ayrılabilir.",
          "Kaktüsün dikeni yaprak, ateş dikeni gibi bitkilerin bazı dikenleri sürgün kökenli olabilir ve ilgili organın iletim bağlantısını taşır. Sivri görünüş ve korunma görevi ortak olsa da gelişimsel köken aynı değildir. Bir soruda “diken” sözcüğü geçiyorsa örnek bitkiyi ve köken kanıtını ara; görünüşten hareketle hepsini emergens sayma.",
        ],
      },
      {
        title: "Kalınlaşan organda periderm gelişir",
        paragraphs: [
          "Birçok çok yıllık odunsu kök ve gövde sekonder kalınlaşırken dış epidermis bu genişlemeye uyamaz ve yerini yeni koruyucu örtüye bırakır. Peridermin üretici katmanı mantar kambiyumudur; bu canlı meristem dışa doğru mantar hücreleri, birçok türde içe doğru felloderm adı verilen parankima üretir.",
          "Dıştaki olgun mantar hücrelerinin çeperleri süberin biriktirir; bu hücreler çoğunlukla canlılıklarını kaybeder. Su kaybına ve çevresel etkilere dayanıklı örtü böyle kurulur. Periderm bütünüyle tek bir ölü tabaka değildir: canlı kambiyum ve iç parankima da yapısına katılabilir. Mantar kambiyumu ile ksilem-floem üreten damar kambiyumunu görevleriyle ayır.",
        ],
      },
      {
        title: "Lentisel kapakta bir soluk aralığıdır",
        paragraphs: [
          "Odunsu yüzeyde süberinli mantar tabakası gazların geçişini de zorlaştırır. Lentiseller, gevşek dizilmiş hücreler ve hücreler arası boşluklarıyla içteki canlı dokuların atmosferle gaz alışverişine yardım eden bölgeler oluşturur. Gövde ve dallarda, bazı meyvelerin yüzeyinde ve uygun köklerde görülebilir.",
          "O₂, CO₂ ve bir miktar su buharı derişim farklarına göre bu yoldan geçebilir. Lentisel “yalnız su atan delik” değildir; stoma gibi iki bekçi hücresinin hızlı denetlediği açıklık da değildir. Bazı türlerde mevsimsel kapatıcı doku gelişimi olabilir. Açıklığı oluşturan yapıyı tek hücre sayıp bütün lentisel için zorunlu canlı/cansız etiketi vermek yerine doku ve boşlukları ayrı değerlendir.",
        ],
      },
      {
        title: "Üç geçidi aynı ölçütlerle karşılaştır",
        paragraphs: [
          "Stoma, hidatot ve lentiseli karşılaştırırken önce oluştuğu örtüyü, sonra bulunduğu organı ve çıkan maddenin hâlini sor. Stoma epidermis üzerinde bekçi hücreleriyle ayarlanan gaz geçididir. Hidatot ksilemle ilişkili sıvı çıkış yoludur. Lentisel peridermli yüzeyde gaz alışverişine katkı veren gevşek doku bölgesidir.",
          "Su buharı çıkışı tek başına stoma kanıtı değildir; kütikuladan veya lentiselden de bir miktar kayıp olabilir. Mineralli damla ve ksilem bağlantısı birlikte hidatot için daha güçlü kanıttır. Kloroplastı gözlenen bekçi hücresi ile gözenek boşluğunu ayırmak, tablo satırlarını ezberlemekten daha güvenli bir yöntemdir.",
        ],
        table: {
          headers: ["Ölçüt", "Stoma", "Hidatot", "Lentisel"],
          rows: [
            [
              "Başlıca yer",
              "Yaprak, genç yeşil gövde",
              "Yaprak ucu ve kenarı",
              "Peridermli yüzey",
            ],
            [
              "Denetim",
              "Bekçi hücrelerinin turgoru",
              "Stomadaki gibi etkin açma-kapama yok",
              "Stomadaki gibi bekçi hücresi çifti yok",
            ],
            [
              "Su hâli",
              "Buhar",
              "Çözünmüş iyon içerebilen sıvı",
              "Bir miktar buhar",
            ],
            [
              "Ana ilişki",
              "Gaz alışverişi ve terleme",
              "Ksilem ve gutasyon",
              "İç canlı dokuların gaz alışverişi",
            ],
          ],
        },
      },
      {
        title: "Bir su kaybı deneyini okuyarak sonuca git",
        paragraphs: [
          "Yaprak yüzeylerinden birine gaz geçirmeyen bir kaplama sürüldüğünde kütle kaybı azalabilir. Aynı tür, yaprak alanı, süre, sıcaklık, hava akımı ve nem koşulları korunursa yüzeyler arasında kontrollü bir kıyas yapılabilir. Birim alan ve birim zaman başına kayıp, farklı büyüklükteki yaprakları karşılaştırmayı kolaylaştırır.",
          "Kaplama yalnız stomayı değil kütikula yolunu ve ısı dengesini de etkileyebilir. Bu nedenle tek ölçümden bütün kaybın tam olarak hangi oranının stomadan geldiği her zaman hesaplanmaz. Önce deneyin açıkça izole ettiği değişkeni belirt, sonra sonucun izin verdiği kadar yorumla. Mekanizmayı öğrenmek, kanıtın söylemediği sayıyı üretmemeyi de içerir.",
        ],
      },
      {
        title: "Mikroskoptan mekanizmaya geç",
        paragraphs: [
          "Bir yaprak yüzeyinde iki kloroplastlı hücrenin çevrelediği açıklığı bulduğunda stoma yapısını tanırsın. Dış yüzeyde hücresiz mumsu örtü kütikuladır; odunsu yüzeyde gevşek doku aralığı lentisel olabilir. Emici kök yüzeyindeki tek hücre uzantısını, kendi iletim dokusu olan yan kökle aynı çizimde karşılaştırmak köken farkını görünür kılar.",
          "Ardından “hangi değişken neyi değiştirir?” diye sor: çözünen ve basınç, suyun net yönünü; hücre duvarı mimarisi ve turgor, açıklığın şeklini; ortamın nemi ve hava hareketi, buharın yayılmasını etkiler. Etkileşimde bir değeri değiştir, önce yönü tahmin et, sonra sayısal toplamla karşılaştır. Bu keşif çalışma kaydını korur; tek başına soru başarısı veya öğrenme puanı üretmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Negatif değerleri karşılaştırarak suyun yönünü bul",
        prompt:
          "Bir bekçi hücresinde Ψs=−1,2 MPa ve Ψp=+0,4 MPa ölçülüyor. Komşu çözeltinin su potansiyeli−0,3 MPa. Zar suya geçirgen; diğer potansiyel bileşenleri ihmal ediliyor. O anda net su hangi yönde hareket eder?",
        strategy:
          "Önce hücrenin iki bileşenini topla, sonra iki toplamı sayı doğrusunda karşılaştır.",
        steps: [
          {
            label: "Bileşenleri topla",
            explanation:
              "Çözünenin negatif etkisiyle pozitif basıncı birlikte kullan; yalnız çözünen değerine bakma.",
            expression: "Ψhücre = −1,2 + 0,4 = −0,8 MPa",
          },
          {
            label: "Daha yüksek değeri bul",
            explanation:
              "−0,3 değeri−0,8 değerinden yüksektir. Negatif sayılarda mutlak değeri büyük olan daha düşük olabilir.",
            expression: "−0,3 > −0,8",
          },
          {
            label: "Net yönü seç",
            explanation:
              "Su yüksek potansiyelli komşu çözeltiden düşük potansiyelli bekçi hücresine net geçer. Bu anlık yön, gelecek çapın kesin değerini vermez.",
            expression: "Dış ortam → bekçi hücresi",
          },
        ],
        answer: "Hücre içine net su geçişi.",
        check:
          "Hücre daha negatif olduğunda içeri yön, enerji harcamayan osmotik geçişle tutarlıdır.",
        pitfall:
          "Osmotik basınç büyüklüğü ile su potansiyelinin negatif işaretini birbirine çevirmeden kullanmak.",
      },
      {
        title: "Basınç artınca dengeye yaklaş",
        prompt:
          "Aynı anda ölçülen bir hücre için Ψs=−1,2 MPa; Ψp=+0,9 MPa ve komşu çözeltide Ψ=−0,3 MPa veriliyor. Sadece Ψ=Ψs+Ψp modelini kullan. İki ortam arasında net osmotik yön var mı?",
        strategy:
          "Potansiyeller eşitse moleküler hareket sürse de net geçişin olmadığını ayır.",
        steps: [
          {
            label: "Hücre toplamını bul",
            explanation:
              "Basınç, çözünenin negatif katkısının bir kısmını dengeler.",
            expression: "−1,2 + 0,9 = −0,3 MPa",
          },
          {
            label: "İki ortamı karşılaştır",
            explanation:
              "Komşu çözelti için de aynı toplam verildiğinden potansiyel farkı sıfırdır.",
            expression: "ΔΨ = −0,3 − (−0,3) = 0",
          },
          {
            label: "Net ile toplam hareketi ayır",
            explanation:
              "Su molekülleri iki yönde geçebilir; eşit karşılıklı akışta net yön yoktur. Hücre içi çözünen madde yok olmuş değildir.",
            expression: "Net osmotik geçiş yok",
          },
        ],
        answer: "Bu modelde net su geçişi yoktur.",
        check:
          "Her iki potansiyeli aynı birimle karşılaştırdın; basınç sıfır olmak zorunda değil.",
        pitfall: "“Denge varsa moleküller durur” sonucunu çıkarmak.",
      },
      {
        title: "İki bekçi hücresi bir gözenek oluşturur",
        prompt:
          "Bir yaprağın temsilî mikroskop alanı3,2 mm². Bu alanda toplam64 bekçi hücresi sayılıyor; bütün stomalar tam iki bekçi hücresinden oluşuyor ve sayımda başka hücre yok. Bu alanın stoma yoğunluğunu bul.",
        strategy:
          "Hücre sayısını önce stoma sayısına, sonra birim alana dönüştür.",
        steps: [
          {
            label: "Hücreyi gözenekten ayır",
            explanation:
              "Her stoma iki bekçi hücresine karşılık gelir;64 doğrudan stoma sayısı değildir.",
            expression: "64 / 2 = 32 stoma",
          },
          {
            label: "Birim alana böl",
            explanation:
              "Otuz iki stomanın gözlendiği alan3,2 mm² olarak verilmiştir.",
            expression: "32 / 3,2 = 10 stoma/mm²",
          },
          {
            label: "Kapsamı denetle",
            explanation:
              "Sonuç incelenen temsilî alanın yoğunluğudur; bütün yaprak sayısını bulmak için bütün yaprak alanı ayrıca gerekir.",
            expression: "Yoğunluk = sayı / alan",
          },
        ],
        answer: "10 stoma/mm².",
        check: "32 stoma ×2 bekçi hücresi=64 hücre;32/3,2=10.",
        pitfall:
          "Bekçi hücresi sayısını gözenek sayısıyla eşitlemek veya bütün yaprak alanını uydurmak.",
      },
      {
        title: "Gutasyon damlasındaki mineral miktarı",
        prompt:
          "Kaynağının hidatot olduğu doğrulanan sekiz gutasyon damlasının her biri0,25 mL. Toplanan sıvının mineral derişimi0,4 mg/mL. Damlalarda toplam kaç mg mineral vardır? Buharlaşma ve örnek kaybı yok.",
        strategy:
          "Önce toplam hacmi, sonra hacim×derişim ile toplam mineral kütlesini hesapla.",
        steps: [
          {
            label: "Hacimleri birleştir",
            explanation: "Sekiz eşit damlanın hacmini topla.",
            expression: "8 × 0,25 = 2 mL",
          },
          {
            label: "Derişimle çarp",
            explanation:
              "Her1 mL sıvıda0,4 mg mineral vardır;2 mL için iki katıdır.",
            expression: "2 mL × 0,4 mg/mL = 0,8 mg",
          },
          {
            label: "Olayı tanımla",
            explanation:
              "Bu ölçüm çözünmüş mineral taşıyan sıvı çıkışıdır; su buharıyla tuz taşındığı anlamına gelmez.",
            expression: "Hidatot → mineralli sıvı",
          },
        ],
        answer: "0,8 mg mineral.",
        check:
          "mL birimleri sadeleşip mg kaldı; hacim arttığında aynı derişimde toplam kütle artar.",
        pitfall:
          "Derişimi toplam mineral kütlesi sanmak veya her yaprak damlasını kaynak bilgisi olmadan gutasyon saymak.",
      },
      {
        title: "Benzer dikenin farklı kökenini kanıtla",
        prompt:
          "X bitkisindeki sivri çıkıntı epidermis ve korteks kökenli, düzenli iletim demeti taşımıyor. Y bitkisindeki sivri yapı ise yaprak taslağından gelişiyor ve iletim bağlantısı taşıyor. X ve Y aynı gelişimsel yapı mıdır?",
        strategy:
          "Görünüşü değil, yapının katıldığı dokuları ve gelişimsel başlangıcı karşılaştır.",
        steps: [
          {
            label: "X için kökeni kullan",
            explanation:
              "Yüzey ve altındaki dokuların katılması, tipik gül örneğindeki emergens düzeniyle uyumludur.",
            expression: "X: yüzey kökenli emergens",
          },
          {
            label: "Y için organı kullan",
            explanation:
              "Yaprak taslağı, yaprak kökenli organ değişimini gösterir. İletim bağlantısı bu organ yorumunu destekler.",
            expression: "Y: değişmiş yaprak",
          },
          {
            label: "Ortak görevle kökeni ayır",
            explanation:
              "Her ikisi korunmaya katkı verebilir; ortak görev, gelişimsel kökeni aynı yapmaz.",
            expression: "Benzer işlev ≠ aynı organ kökeni",
          },
        ],
        answer:
          "Aynı gelişimsel yapı değildir; X emergens, Y yaprak kökenli dikendir.",
        check:
          "İki yapı için de kökte verilen somut anatomik kanıtı kullandın.",
        pitfall: "Sivri görünen bütün çıkıntılara aynı kökeni yüklemek.",
      },
      {
        title: "Peridermin tümü ölü müdür?",
        prompt:
          "Bir periderm örneğinde50 olgun ölü mantar hücresi,5 canlı mantar kambiyumu hücresi ve15 canlı felloderm hücresi sayılmıştır. Başka hücre yok. Canlı hücrelerin toplam hücre sayısına oranı nedir?",
        strategy:
          "Önce peridermi oluşturan katmanları ayır, sonra sayıları uygun grupta topla.",
        steps: [
          {
            label: "Canlıları topla",
            explanation:
              "Mantar kambiyumu ve verilen felloderm hücreleri canlıdır.",
            expression: "5 + 15 = 20 canlı hücre",
          },
          {
            label: "Bütün örneği say",
            explanation:
              "Ölü mantar katmanı da peridermin parçasıdır ve toplamda yer alır.",
            expression: "50 + 5 + 15 = 70 hücre",
          },
          {
            label: "Oranı sadeleştir",
            explanation: "Canlı hücre sayısını toplam hücre sayısına böl.",
            expression: "20/70 = 2/7",
          },
        ],
        answer: "Canlı hücre oranı2/7.",
        check:
          "Canlı20 ve ölü50 toplam70 eder; periderm adı tek başına bütün hücreleri ölü yapmaz.",
        pitfall: "Mantar hücresiyle peridermin tümünü eşitlemek.",
      },
    ],
    recall: [
      {
        prompt: "Epidermis ile kütikulayı iki ayrı cümleyle tanımla.",
        answer:
          "Epidermis canlı hücre katmanıdır. Kütikula, dış yüzeyde kütin ve mum içeren hücresiz örtüdür.",
      },
      {
        prompt:
          "Bekçi hücresinde çözünen artışından açıklık değişimine giden basamakları sırala.",
        answer:
          "Uygun koşulda Ψs daha negatifleşir; su potansiyeli farkı içeri su girişini destekler; turgor artışı, farklı esneyen çeperlerle açıklığın genişlemesine katkı verir.",
      },
      {
        prompt: "Bir damlayı çiyden ayırmak için hangi iki kanıtı ararsın?",
        answer:
          "İç ksilem-hidatot bağlantısı ve sıvı çıkışının/çözünmüş içeriğin kanıtı gutasyonu destekler; çiy atmosferik yoğuşmadır.",
      },
      {
        prompt: "Gül emergensiyle kök emici tüyünün köken farkı nedir?",
        answer:
          "Gül emergensine epidermis ve alt dokular katılır; kök emici tüyü tek epidermis hücresinin uzantısıdır.",
      },
      {
        prompt: "Peridermde canlı olabilen iki bileşen söyle.",
        answer:
          "Mantar kambiyumu ve felloderm parankiması; olgun mantar hücrelerinin ölü olması tüm peridermi ölü yapmaz.",
      },
      {
        prompt: "Lentiseli neden yalnız su atan delik diye tanımlamazsın?",
        answer:
          "İç canlı dokularla atmosfer arasında O₂/CO₂ gibi gazların alışverişine ve bir miktar su buharı kaybına katkı verir.",
      },
    ],
    items: [
      {
        prompt:
          "Genç bir yaprak kesitinde X, çekirdekli canlı hücrelerden oluşan dış katmandır. Y, X’in dış yüzeyinde biriken hücresiz kütin ve mum örtüsüdür. X ve Y için hangi eşleştirme doğrudur?",
        correct: "X epidermis, Y kütikuladır.",
        reason:
          "Epidermis hücresel dış dokudur; kütikula onun dışındaki kütin ve mum içeren hücresiz örtüdür.",
        wrong: [
          [
            "X kütikula, Y epidermistir.",
            "Canlı hücre katmanı ile hücresiz birikimin yerini ters çevirir.",
          ],
          [
            "X ksilem, Y floemdir.",
            "Ksilem-floem iç iletim dokularıdır; verilen dış hücresiz örtüyü açıklamaz.",
          ],
          [
            "X periskl, Y kök şapkasıdır.",
            "Periskl kökün merkezî silindirindedir; soru yaprak dış yüzeyini anlatır.",
          ],
          [
            "X ve Y aynı canlı hücrenin iki adıdır.",
            "Y açıkça hücresiz tabaka olarak verilmiştir; iki yapı aynı hücre değildir.",
          ],
        ],
        knowledge: [
          "Doku, hücrelerden oluşur; hücre dışına salgılanan örtü tek başına bir hücre değildir.",
          "Kütikula kütin ve mum içeren dış örtüdür.",
        ],
        strategy:
          "Hücre bulunmasını ilk ayırt edici ölçüt yap; sonra dıştan içe konumu eşleştir.",
        steps: [
          "X’in çekirdekli canlı hücre katmanı olduğunu işaretle.",
          "Y’nin bu katmanın dışında biriken hücresiz örtü olduğunu ayır.",
          "X’i epidermis, Y’yi kütikula ile eşleştir.",
        ],
        commonError:
          "Kütikula ile onu üreten epidermisi aynı canlı doku saymak.",
        check:
          "İki adı yer değiştirirsen hücreli/hücresiz kanıtı da ters düşer.",
      },
      {
        prompt:
          "Tipik bir yaprakta sıradan epidermis hücreleri ile stomanın iki bekçi hücresi karşılaştırılıyor. Bekçi hücrelerinde kloroplast görülmüş, sıradan komşu epidermis hücrelerinde görülmemiştir. Hangi yorum bu gözlemle uyumludur?",
        correct:
          "Aynı doku kökeninden farklı görevli hücre tipleri gelişebilir.",
        reason:
          "Bekçi hücreleri epidermis kökenlidir; farklılaşma ile sıradan epidermisten farklı organel ve görev özellikleri kazanabilir.",
        wrong: [
          [
            "Bütün epidermis hücreleri zorunlu olarak kloroplast taşır.",
            "Sıradan komşu hücrelerde görülmemesi verilen gözlemle çelişir.",
          ],
          [
            "Bekçi hücreleri canlı değildir.",
            "Kloroplastlı bekçi hücreleri canlı hücrelerdir; stoma açıklığıyla karıştırılmıştır.",
          ],
          [
            "Stoma açıklığı fotosentez yapan üçüncü hücredir.",
            "Açıklık bir boşluktur, üçüncü hücre değildir.",
          ],
          [
            "Kloroplast bulunması yapının kök emici tüyü olduğunu kanıtlar.",
            "Tipik kök emici tüyüyle bu iki bekçi hücresi düzeni aynı değildir.",
          ],
        ],
        knowledge: [
          "Epidermisten gelişen bekçi hücreleri canlı ve çoğunlukla kloroplastlıdır.",
        ],
        strategy:
          "Gözlemi doku kökeni ile hücre farklılaşmasını ayırarak yorumla.",
        steps: [
          "Sıradan hücre ve bekçi hücresini iki farklı hücre tipi olarak belirle.",
          "Ortak epidermis kökeninin bütün organel özelliklerini eşitlemediğini kullan.",
          "Gözlemle uyumlu sonucu farklılaşma olarak seç.",
        ],
        commonError:
          "Doku kökenini bütün hücrelerin birebir aynı olması sanmak.",
        check:
          "Yorum hem gözlenen kloroplastı hem gözlenmeyen komşu hücreleri açıklıyor.",
      },
      {
        prompt:
          "Bir bekçi hücresinde Ψs=−1,4 MPa ve Ψp=+0,5 MPa; komşu çözeltide Ψ=−0,4 MPa. Ψ=Ψs+Ψp modeli geçerli, zar suya geçirgen ve diğer bileşenler ihmal ediliyor. O andaki net osmotik sonuç hangisidir?",
        correct: "Hücre Ψ=−0,9 MPa olur; net su hücre içine geçer.",
        reason:
          "−1,4+0,5=−0,9; dış ortamın−0,4 değeri daha yüksektir. Su daha yüksekten daha düşüğe net geçer.",
        wrong: [
          [
            "Hücre Ψ=−1,9 MPa olur; net su dışarı geçer.",
            "Hem toplama işareti hem su yönü yanlıştır.",
          ],
          [
            "Hücre Ψ=−0,9 MPa olur; net su dışarı geçer.",
            "Doğru toplamı bulur ama yüksekten düşüğe yönü ters çevirir.",
          ],
          [
            "İki ortamın potansiyeli eşittir; net geçiş yoktur.",
            "−0,9 ile−0,4 eşit değildir.",
          ],
          [
            "Su ancak ATP ile doğrudan pompalanırsa hücreye girebilir.",
            "Verilen zar ve fark altında suyun osmotik geçişi ATP pompalaması gerektirmez.",
          ],
        ],
        knowledge: [
          "Ψ toplamı, negatif çözünen ve pozitif basınç katkılarıyla bulunur.",
          "Su potansiyeli MPa ile karşılaştırılır;−0,4 sayısı−0,9’dan büyüktür.",
        ],
        strategy:
          "Önce toplamı hesapla; sonra yalnız toplam potansiyellerle yönü belirle.",
        steps: [
          "Hücre toplamını−1,4+0,5=−0,9 MPa bul.",
          "Dış−0,4 değerini iç−0,9 değeriyle karşılaştır.",
          "Yüksek dıştan düşük içe net su geçişini seç.",
        ],
        commonError:
          "Çözünen potansiyelini basıncı eklemeden toplam sanmak veya negatif sayıları ters sıralamak.",
        check: "Dıştan içe toplam fark0,5 MPa; işaret içeri yönle uyumludur.",
      },
      {
        prompt:
          "Bir hücre için Ψs=−1,3 MPa veriliyor. Komşu çözeltinin Ψ değeri−0,5 MPa. Ψ=Ψs+Ψp modelinde iki ortamın eşit potansiyelde olması için hücrede ölçülen Ψp kaç MPa olmalıdır?",
        correct: "+0,8 MPa.",
        reason: "−1,3+Ψp=−0,5 eşitliğinden Ψp=+0,8 MPa bulunur.",
        wrong: [
          [
            "−0,8 MPa.",
            "Çözünenin negatif etkisini dengelemesi gereken basıncın işaretini ters kurar.",
          ],
          [
            "+1,8 MPa.",
            "İki negatif değerin farkını almak yerine büyüklükleri toplar.",
          ],
          [
            "0 MPa.",
            "Basınç sıfırsa hücre−1,3 MPa kalır ve dış ortamla eşit olmaz.",
          ],
          ["+1,3 MPa.", "Bu basınç toplamı0 yapar; dış değer−0,5’tir."],
        ],
        knowledge: [
          "Dengede iki toplam potansiyel eşittir.",
          "Ψp=Ψdış−Ψs denkleminde bütün değerler aynı birimde olmalıdır.",
        ],
        strategy:
          "Bilinmeyen basıncı tek terim olarak bırakıp yerine koyarak denetle.",
        steps: [
          "−1,3+Ψp=−0,5 eşitliğini yaz.",
          "Ψp=−0,5−(−1,3)=+0,8 MPa hesapla.",
          "Yerine koy:−1,3+0,8=−0,5 MPa.",
        ],
        commonError:
          "Osmotik potansiyelin büyüklüğünü doğrudan gerekli basınç saymak.",
        check:
          "Bulduğun basınçla toplam tam olarak verilen dış değere eşit oluyor.",
      },
      {
        prompt:
          "Yeterli su bulunan bir yaprakta bekçi hücrelerine çözünen iyon alımı artıyor. Hücre duvarları ve komşu hücre koşulları aynı; başlangıçta bu değişim hücre su potansiyelini daha düşük yapıyor. Açılmayı açıklayan basamak sırası hangisidir?",
        correct:
          "Çözünen artışı → net su girişi → turgor artışı → farklı esneyen çeperlerle açıklığın genişlemesi.",
        reason:
          "Verilen fark su girişini destekler; artan turgor çeper mimarisiyle birleşerek stoma açıklığının genişlemesine katkı verir.",
        wrong: [
          [
            "Çözünen artışı → suyun ATP ile pompalanması → kloroplastın ölmesi.",
            "Su osmozla geçer; kloroplast ölümü verilen açılma mekanizmasının basamağı değildir.",
          ],
          [
            "Çözünen artışı → net su çıkışı → turgor artışı.",
            "Başlangıçta hücre potansiyelinin düşmesi içeri yönü destekler; su kaybı turgor artışını açıklamaz.",
          ],
          [
            "Çözünen artışı → kütikulanın hücreye dönüşmesi → stoma açılması.",
            "Kütikula hücresiz örtüdür; verilen denetim yoluna dönüşmez.",
          ],
          [
            "Çözünen artışı → bekçi hücrelerinde mitoz → üçüncü hücrenin gözenek olması.",
            "Açıklığın anlık ayarı yeni hücre üretimiyle veya üçüncü hücre oluşumuyla açıklanmaz.",
          ],
        ],
        knowledge: [
          "Uygun potansiyel farkında su pasif olarak hücreye girer.",
          "Bekçi hücresi çeperlerinin esneme özellikleri aynı değildir.",
        ],
        strategy:
          "İyon, su ve mekanik şekil değişimini üç farklı düzeyde sırala.",
        steps: [
          "Daha düşük hücre potansiyelinin verilen dış su koşulunda içeri akışı desteklediğini kullan.",
          "Su girişini turgor artışıyla ilişkilendir.",
          "Turgor ile farklı çeper esnemesini açıklığın genişlemesine bağla.",
        ],
        commonError:
          "İyon alımı için enerji gereksinimini suyun doğrudan pompalanmasıyla karıştırmak.",
        check:
          "Sıralamada her ok bir sonraki basamağı açıklamalı; hücre ölümü ya da mitoz eklenmemeli.",
      },
      {
        prompt:
          "Bir bitki türünde stomaların gece daha çok, gündüz daha az açık olduğu ölçülüyor; türün CAM metabolizması yaptığı biliniyor. Bu gözlem hangi genellemeyi doğrudan geçersiz kılar?",
        correct: "Her bitkide stomalar geceleri zorunlu olarak kapalıdır.",
        reason:
          "CAM örneğinde gece açıklığı verilen doğrudan karşı örnektir; evrensel kapanma genellemesi geçersiz olur.",
        wrong: [
          [
            "Bazı bitkilerde stoma açıklığı gündüz-gece arasında değişebilir.",
            "Verilen gözlem bu olasılıkla uyumludur; onu geçersiz kılmaz.",
          ],
          [
            "Bekçi hücreleri su durumundan etkilenebilir.",
            "Gece açıklığı, su ve turgor etkisini reddeden kanıt değildir.",
          ],
          [
            "Kütikula hücresiz bir örtüdür.",
            "Gözlem kütikulanın hücresel yapısını sınamıyor.",
          ],
          [
            "Stomalar gaz alışverişine katkı verebilir.",
            "Gece CO₂ alımı bu görevle uyumludur.",
          ],
        ],
        knowledge: [
          "“Her” sözcüğü bütün bitkileri kapsayan bir iddiadır.",
          "CAM türleri stomaların zamanlamasında önemli bir karşı örnektir.",
        ],
        strategy: "Tek karşı örneğin hangi evrensel iddiayı bozduğunu ara.",
        steps: [
          "Gözlemde geceleri açık stomaların bulunduğunu sapta.",
          "Geceyi zorunlu kapanma koşulu yapan iddiayı bul.",
          "Tipik örüntüyü bütün bitkilere yayan, verilen gece açıklığıyla çelişen genellemeyi seç.",
        ],
        commonError:
          "Bir istisna yüzünden stomaların çoğu türdeki gündüz örüntüsünü de yok saymak.",
        check:
          "Seçilen yanlış genelleme doğrudan verilen gece açıklığıyla çelişiyor.",
      },
      {
        prompt:
          "Bir su bitkisinin yaprak ayası su yüzeyinde yatay yüzüyor; üst yüzey havayla, alt yüzey suyla temas ediyor. Tipik gaz alışverişi uyumu açısından stomaların hangi yüzeyde bulunması daha işlevseldir?",
        correct: "Havayla temas eden üst yüzeyde.",
        reason:
          "Yüzen yaprakta havaya açık üst yüzey, stomanın atmosferle gaz alışverişini destekler.",
        wrong: [
          [
            "Suyla temas eden alt yüzeyde olması her koşulda zorunludur.",
            "Kara yaprağındaki tipik alt yüzey örüntüsünü bu farklı ortama zorunlu taşır.",
          ],
          [
            "Yalnız kökün toprak içindeki emici tüyünde.",
            "Emici tüy tipik stoma yeri değildir; yaprak yüzeyi sorusunu da yanıtlamaz.",
          ],
          [
            "Hiçbir canlı su bitkisinde stoma bulunamaz.",
            "Yüzen havaya açık yapraklar bu mutlak iddiaya karşı örnektir.",
          ],
          [
            "Yalnız ksilem borusunun içinde.",
            "Ksilem iç iletim dokusudur; atmosferle doğrudan stoma yüzeyi değildir.",
          ],
        ],
        knowledge: [
          "Yaprağın havaya açık yüzeyi ile su altında kalan yüzeyi aynı ortamda değildir.",
        ],
        strategy:
          "Tür etiketinden önce verilen yüzey-temas geometrisini kullan.",
        steps: [
          "Üst yüzeyin havaya açık olduğunu işaretle.",
          "Stomayı gaz alışverişi yapan epidermis açıklığı olarak düşün.",
          "Atmosfere erişen üst yüzey yerleşimini seç.",
        ],
        commonError:
          "Bütün yapraklarda stoma yalnız alt yüzeydedir diye ezberlemek.",
        check:
          "Kökü veya iletim borusunu yüzeydeki gaz geçidi yerine koymadın.",
      },
      {
        prompt:
          "X yaprağındaki yüzey çıkıntıları ışığın bir bölümünü yansıtır;Y bitkisindeki yüzey çıkıntıları uçucu aromatik maddeler salgılar. Başka bilgi verilmeden en uygun işlev eşleştirmesi hangisidir?",
        correct: "X örtü tüyü, Y salgı tüyü işleviyle uyumludur.",
        reason:
          "Işık yansıtma ve yüzey çevresini değiştirme örtü tüyüyle; aromatik madde üretimi salgı tüyüyle uyumludur.",
        wrong: [
          [
            "X kök emici tüyü, Y kök şapkasıdır.",
            "Yaprakta yansıtma emici kök görevi değildir; kök şapkası da aromatik yüzey salgısı eşleştirmesi değildir.",
          ],
          [
            "X ve Y zorunlu olarak aynı minerali emer.",
            "Kök emilim bilgisi verilmemiştir; ortak bir mineral sonucu çıkarılamaz.",
          ],
          [
            "X floem, Y ksilemdir.",
            "Verilen yapılar dış yüzey çıkıntılarıdır; iç iletim dokuları değildir.",
          ],
          [
            "X ve Y mutlaka çok hücreli yan köklerdir.",
            "Tüylerin bir veya çok hücreli yüzey çıkıntısı olması yan kök organı oldukları anlamına gelmez.",
          ],
        ],
        knowledge: [
          "Tüyler ortak yüzey kökenine karşın farklı işlevlere özelleşebilir.",
        ],
        strategy:
          "Her gözlenen etkiyi uygun işlevle eşleştir; aynı görevi ikisine zorunlu yükleme.",
        steps: [
          "X’te gözlenen etkinin ışık yansıtma olduğunu ayır.",
          "Y’de aromatik salgı üretimini belirle.",
          "İki işlevi örtü ve salgı tüyüyle eşleştir.",
        ],
        commonError: "Bütün tüyleri yalnız su emen kök tüyü sanmak.",
        check:
          "Seçim yalnız verilen işlevleri açıklar; kesin tür veya tüy hücre sayısı uydurmaz.",
      },
      {
        prompt:
          "Bir genç kökte Z, tek epidermis hücresinin dışa uzayan bölümüdür; kendi ksilem-floem demeti ve uç meristemi yoktur. Z için en uygun tanım hangisidir?",
        correct: "Kök emici tüyüdür.",
        reason:
          "Tek hücreli epidermis uzantısı olup kendi organ düzeninin bulunmaması emici tüyü tanımlar.",
        wrong: [
          [
            "Periskldan gelişmiş çok hücreli yan köktür.",
            "Yan kök iç kökenli çok hücreli organdır; verilen tek hücre uzantısı değildir.",
          ],
          [
            "İletim demetli sürgün dikenidir.",
            "Verilen yapıda iletim demeti yoktur ve kök epidermisi kökenlidir.",
          ],
          [
            "Ölü hücrelerden oluşan tüm peridermdir.",
            "Tek canlı hücre uzantısı ile çok katmanlı koruyucu periderm aynı yapı değildir.",
          ],
          [
            "Bekçi hücreleriyle çevrili stoma açıklığıdır.",
            "Z bir hücre uzantısıdır; iki bekçi hücresiyle sınırlanan boşluk değildir.",
          ],
        ],
        knowledge: [
          "Bir organın kendi uç büyüme düzeni ve çok hücreli dokuları olabilir; emici tüy tek hücre uzantısıdır.",
        ],
        strategy:
          "Önce hücre sayısını, sonra iletim ve uç büyüme kanıtını kullan.",
        steps: [
          "Z’nin tek epidermis hücresi uzantısı olduğunu oku.",
          "Yan kökün organ özelliklerinin açıkça bulunmadığını sapta.",
          "Z’yi emici tüy olarak tanı.",
        ],
        commonError:
          "Uzun veya dala benzer bir görüntüyü otomatik olarak yan kök saymak.",
        check:
          "Tanım verilen üç kanıtla da uyumludur: tek hücre, epidermis kökeni, organ düzeni yokluğu.",
      },
      {
        prompt:
          "Bir yaprak kenarından gelen damlaların ksilem ucuyla bağlantılı hidatotlardan çıktığı doğrudan izleniyor ve damlalarda çözünmüş mineral bulunuyor. Hangi yorum doğrudur?",
        correct: "Bu, sıvı su çıkışı olan gutasyonla uyumludur.",
        reason:
          "İç ksilem-hidatot bağlantısı ve çözünmüş mineral içeren sıvı, gutasyonu destekler.",
        wrong: [
          [
            "Damlalar zorunlu olarak atmosferik çiydir.",
            "Çiy için iç ksilemden çıkış gerekmez; burada kaynak doğrudan izlenmiştir.",
          ],
          [
            "Bu, tuzların su buharıyla stomadan taşındığını kanıtlar.",
            "Hidatot sıvı çıkışı ile stoma buharı karıştırılmıştır.",
          ],
          [
            "Hidatot tipik iki bekçi hücresiyle aynı biçimde açılıp kapanır.",
            "Hidatot gözenekleri stomadaki etkin bekçi hücresi denetimiyle özdeş değildir.",
          ],
          [
            "Bu sıvı çıkışı mutlaka floemde şeker taşınmasıdır.",
            "Bağlantı ksilem olarak verilmiştir; floem sonucu eklenemez.",
          ],
        ],
        knowledge: [
          "Gutasyon içeriden gelen sıvıdır; çiy dış havadaki buharın yoğuşmasıdır.",
        ],
        strategy:
          "Fotoğraf benzerliği yerine kökte verilen sıvının kökenini izle.",
        steps: [
          "Ksilem-hidatot bağlantısını belirle.",
          "Çıkan maddenin mineral içeren sıvı olduğunu kullan.",
          "Gutasyonu seç; buhar ve atmosferik yoğuşma açıklamalarını ayır.",
        ],
        commonError:
          "Yaprak üzerindeki her damlayı çiy veya her su kaybını terleme saymak.",
        check: "Yorum hem sıvının hâlini hem iç kaynak bağlantısını açıklıyor.",
      },
      {
        prompt:
          "Kaynağı hidatot olarak doğrulanmış toplam2 mL sıvıda mineral derişimi0,3 mg/mL ölçülüyor. Örnek kaybı yoksa sıvıdaki toplam mineral kütlesi kaç mg’dır?",
        correct: "0,6 mg.",
        reason: "Toplam kütle hacim×derişimdir:2×0,3=0,6 mg.",
        wrong: [
          [
            "0,15 mg.",
            "Derişimi hacme bölmek birimleri ve bağıntıyı yanlış kullanır.",
          ],
          ["2,3 mg.", "Hacim ve derişim farklı boyutludur; toplanmaz."],
          ["6 mg.", "Ondalık basamağı on kat kaydırır."],
          [
            "0 mg; sıvıda mineral taşınamaz.",
            "Mineral derişimi kökte açıkça ölçülmüştür; gutasyon sıvısı mineral içerebilir.",
          ],
        ],
        knowledge: ["mg/mL derişimi, her bir mL’deki mineral kütlesidir."],
        strategy:
          "Verilen sıvı hacmini her mL’deki kütleyle çarp ve birimi sadeleştir.",
        steps: [
          "Bağıntıyı m=V×c olarak yaz.",
          "2 mL×0,3 mg/mL hesabını yap.",
          "mL birimlerini sadeleştirip0,6 mg sonucunu seç.",
        ],
        commonError:
          "Derişimi toplam kütle veya gutasyonu saf su buharı sanmak.",
        check: "Her1 mL’de0,3 mg varsa2 mL’de0,6 mg vardır.",
      },
      {
        prompt:
          "Güldeki bir sivri çıkıntıya epidermis ve korteks katılıyor, düzenli iletim demeti bulunmuyor. Kaktüsün sivri yapısı ise yaprak kökenli. Bu iki yapı için hangi sonuç doğrudur?",
        correct: "Benzer korunma işlevi, aynı gelişimsel kökeni kanıtlamaz.",
        reason:
          "Gül emergensiyle yaprak kökenli diken benzer işlev görebilir ama farklı gelişim yollarından gelir.",
        wrong: [
          [
            "İkisi de zorunlu olarak kök emici tüyüdür.",
            "Verilen doku ve organ kökenleri kök emici tüyü tanımıyla uyuşmaz.",
          ],
          [
            "Kaktüs dikeni kesinlikle korteksten gelişmiş gül emergensidir.",
            "Kaktüs için yaprak kökeni açıkça verilmiştir.",
          ],
          [
            "İletim demeti bulunmayan gül çıkıntısı mutlaka canlı değildir.",
            "İletim dokusu bulunmaması tek başına bütün çıkıntı hücrelerinin ölü olduğunu göstermez.",
          ],
          [
            "İki yapı sivri olduğu için ortak organ kökeni kesindir.",
            "Görünüş, verilen farklı gelişim kanıtını geçersiz kılamaz.",
          ],
        ],
        knowledge: [
          "İşlev benzerliği ile organın gelişimsel kökeni ayrı ölçütlerdir.",
        ],
        strategy:
          "İki bitkiye verilen anatomik bilgiyi aynı ölçütlerle yan yana koy.",
        steps: [
          "Gül çıkıntısını yüzey ve alt doku katılımıyla tanı.",
          "Kaktüste yaprak kökenini ayrı kaydet.",
          "Ortak görevin kökenleri eşitlemediğini seç.",
        ],
        commonError: "Diken sözcüğünü tek bir anatomik yapı adı saymak.",
        check: "Sonuç verilen iki farklı kökeni de koruyor.",
      },
      {
        prompt:
          "Bir peridermde dışta olgun ölü mantar hücreleri, ortada canlı mantar kambiyumu ve içte canlı felloderm parankiması gözleniyor. Hangi ifade bu gözlemle çelişir?",
        correct: "Peridermin bütün hücreleri zorunlu olarak ölüdür.",
        reason:
          "Canlı kambiyum ve felloderm gözlemi bütün hücreler ölüdür iddiasını doğrudan çürütür.",
        wrong: [
          [
            "Olgun mantar katmanı su kaybını azaltmaya katkı verebilir.",
            "Süberinli mantar örtüsü bu koruyucu görevle uyumludur.",
          ],
          [
            "Mantar kambiyumu hücre üreten bir katmandır.",
            "Canlı meristem katmanı tanımıyla uyumludur.",
          ],
          [
            "Bir doku sisteminde canlı ve ölü hücre bileşenleri birlikte bulunabilir.",
            "Verilen periderm örneği bunun doğrudan örneğidir.",
          ],
          [
            "Periderm sekonder kalınlaşan yüzeyde epidermisin yerini alabilir.",
            "Olgunlaşma ve kalınlaşma sırasında bu görev mümkündür; gözlemle çelişmez.",
          ],
        ],
        knowledge: [
          "Parça için doğru bir özellik bütün yapı için zorunlu olmayabilir.",
        ],
        strategy:
          "Canlı iki katmana rağmen bütün peridermi ölü sayan genellemeyi bul.",
        steps: [
          "Gözlenen canlı iki bileşeni işaretle.",
          "Bütün hücreleri ölü sayan evrensel iddiayı bul.",
          "Canlı gözlemin bu iddiaya karşı örnek olduğunu kullan.",
        ],
        commonError: "Mantar doku ile periderm bütününü tek katman sanmak.",
        check: "Çelişen ifade için gözlemde açık karşı örnek var.",
      },
      {
        prompt:
          "Odunsu bir dalda lentisellerin bulunduğu bölgeler seçici olarak kapatılıyor. Diğer koşullar eşit tutulduğunda iç canlı dokuların O₂ alımının azaldığı ölçülüyor. Bu gözlemin desteklediği görev hangisidir?",
        correct:
          "Lentiseller iç dokular ile atmosfer arasında gaz alışverişine katkı verir.",
        reason:
          "O₂ alımının lentisel kapatıldığında azalması bu geçitlerin gaz alışverişine katkısını destekler.",
        wrong: [
          [
            "Lentiseller yalnız sıvı mineral çözeltisi atan hidatotlardır.",
            "Ölçülen etki gaz alımıdır; hidatotla aynı yapı sonucu çıkmaz.",
          ],
          [
            "Odunsu dalda bütün canlı hücreler yalnız fotosentez yapar.",
            "İç dokuların O₂ alımı solunumla ilişkili olabilir; fotosentez tek süreç değildir.",
          ],
          [
            "Lentisellerin tek görevi su buharı atımıdır.",
            "O₂ alımına etkisi, yalnız su görevi iddiasıyla uyuşmaz.",
          ],
          [
            "Lentisel doğrudan kök emici tüyüne dönüşmüştür.",
            "Böyle bir gelişim dönüşümü gözlenmemiştir ve anatomik olarak farklı yapılardır.",
          ],
        ],
        knowledge: [
          "Lentisel, peridermli yüzeyde gaz difüzyonuna katkı veren bir bölgedir.",
        ],
        strategy:
          "Deneyde ölçülen değişkeni doğrudan desteklediği işlevle ilişkilendir.",
        steps: [
          "Kapatılan yapının lentisel olduğunu belirle.",
          "Azalan ölçümün O₂ alımı olduğunu oku.",
          "Atmosfer-iç doku gaz alışverişi yorumunu seç.",
        ],
        commonError:
          "Lentisel için yalnız su atar tablosunu, doğrudan O₂ ölçümüne üstün tutmak.",
        check:
          "Sonuç, etkiyi tamamen tek yola indirmeden katkı sözcüğüyle veriyor.",
      },
      {
        prompt:
          "Bir yaprağın 3 mm² alanında toplam 60 bekçi hücresi sayılıyor; her stoma tam iki bekçi hücresinden oluşuyor. Başka hücre sayılmamış ve bütün çiftler alan içinde tamdır. Bu alanın stoma yoğunluğu kaç stoma/mm² olur?",
        correct: "10 stoma/mm².",
        reason: "60 bekçi hücresi30 stoma eder;30/3=10 stoma/mm².",
        wrong: [
          [
            "20 stoma/mm².",
            "Bekçi hücrelerini ikişerli eşleştirmeden60/3 yapar.",
          ],
          [
            "30 stoma/mm².",
            "Otuz toplam stoma sayısıdır;3 mm² alana bölünmemiştir.",
          ],
          [
            "180 stoma/mm².",
            "Hücre sayısını alanla çarpar; yoğunluk için yanlış işlemdir.",
          ],
          [
            "5 stoma/mm².",
            "Bekçi hücresi-stoma dönüşümünde gereksiz bir kez daha ikiye böler.",
          ],
        ],
        knowledge: [
          "Her stoma iki bekçi hücresiyle çevrilidir.",
          "Yoğunluk, stoma sayısı/alan olarak bulunur.",
        ],
        strategy:
          "İki dönüşümü sırayla yap: hücreden gözenek sayısına, sayıdan yoğunluğa.",
        steps: [
          "60/2=30 tam stoma sayısını bul.",
          "30 stoma sayısını3 mm² alana böl.",
          "10 stoma/mm² sonucunun birimini kontrol et.",
        ],
        commonError:
          "Toplam gözenek sayısı ile birim alan yoğunluğunu karıştırmak.",
        check: "10 stoma/mm²×3 mm²×2 hücre/stoma=60 hücre.",
      },
      {
        prompt:
          "Bir deneyde yapraktan çıkan maddenin yalnız su buharı olduğu, damlacık taşınmadığı ve çözünmüş tuzların uçucu olmadığı verilmiştir. Bu buhar çıkışı için hangi sonuç geçerlidir?",
        correct: "Buharla aynı yolla çözünmüş tuz atıldığı sonucu çıkmaz.",
        reason:
          "Verilen koşulda su gaz hâline geçer; çözünmüş uçucu olmayan tuz buharla birlikte aynı biçimde taşınmış sayılmaz.",
        wrong: [
          [
            "Çıkan buhar zorunlu olarak hidatot gutasyonudur.",
            "Gutasyon sıvı çıkışıdır; damla olmadığı açıkça verilmiştir.",
          ],
          [
            "Her buhar molekülü bir tuz iyonunu zorunlu olarak yanında götürür.",
            "Bu, uçucu olmayan çözünmüş tuz koşuluyla çelişir.",
          ],
          [
            "Su buharı kaybı bitkinin su bütçesini etkilemez.",
            "Yapraktan ayrılan su miktarı su bütçesine çıkış olarak katılır.",
          ],
          [
            "Stoma açıklığı üçüncü bir tuz pompası hücresidir.",
            "Açıklık bir boşluktur; iyon taşıyan üçüncü hücre olarak tanımlanmaz.",
          ],
        ],
        knowledge: [
          "Terleme su buharı kaybıdır; gutasyon çözünmüş madde içerebilen sıvı çıkışıdır.",
        ],
        strategy: "Maddenin hâlini ve uçuculuk koşulunu birlikte kullan.",
        steps: [
          "Kökte sıvı damla çıkışının dışlandığını oku.",
          "Çözünmüş tuzun uçucu olmadığını not et.",
          "Suyun buhar kaybını tuz atımıyla özdeşleştirmeyen sonucu seç.",
        ],
        commonError:
          "Sıvı çözeltiyle buhar fazının aynı bileşimi taşımak zorunda olduğunu sanmak.",
        check:
          "Seçilen ifade yalnız verilen koşullar için konuşuyor; başka atım yollarını yok saymıyor.",
      },
      {
        prompt:
          "A yaprağı2 cm² alanda2 saatte8 mg;B yaprağı3 cm² alanda2 saatte12 mg su kaybediyor. Diğer deney koşulları eşit. Birim alan ve birim süre başına kayıplar nasıl karşılaştırılır?",
        correct: "İkisi de2 mg/(cm²·saat) kaybeder.",
        reason:
          "A için8/(2×2)=2;B için12/(3×2)=2 mg/(cm²·saat). Toplam kayıp farkı burada alan farkıyla açıklanır.",
        wrong: [
          [
            "B’nin birim alan-süre kaybı A’nın iki katıdır.",
            "Verilen alan ve süreyle normalize edildiğinde iki değer eşittir.",
          ],
          [
            "A için4, B için6 mg/(cm²·saat) bulunur.",
            "Bu değerler yalnız süreye bölünmüş toplam saatlik kayıptır; alan unutulmuştur.",
          ],
          [
            "A için8, B için12 mg/(cm²·saat) bulunur.",
            "Toplam kütleyi alan ve süreye bölmeden yoğunluk gibi yazar.",
          ],
          [
            "B’de stoma sayısı kesinlikle A’dan azdır.",
            "Stoma sayısı veya her stomanın açıklığı verilmediğinden bu anatomik sayı çıkarılamaz.",
          ],
        ],
        knowledge: [
          "Farklı alanlı yaprakları kıyaslamak için kayıp/(alan×süre) kullanılabilir.",
        ],
        strategy:
          "Toplam kayıp ile birim alan-süre hızını iki ayrı sütunda düşün.",
        steps: [
          "A için8/(2×2) hesabını yap.",
          "B için12/(3×2) hesabını yap.",
          "İki normalize değeri karşılaştır; stoma sayısı uydurma.",
        ],
        commonError:
          "Toplam kütlesi daha büyük olanın birim yüzey hızını da otomatik büyük saymak.",
        check: "2×2×2=8 ve2×3×2=12; başlangıç kütlelerine geri dönüyor.",
      },
      {
        prompt:
          "X yapısında iki bekçi hücresi gaz açıklığını çevreliyor.Y yaprak kenarında ksileme bağlı mineral içeren sıvı çıkarıyor.Z odunsu peridermde gevşek hücre aralıklarıyla gaz alışverişine katılıyor. X-Y-Z sırası hangisidir?",
        correct: "Stoma – hidatot – lentisel.",
        reason:
          "Bekçi hücresi stoma, ksilem bağlantılı sıvı hidatot, peridermli gaz aralığı lentisel için birlikte ayırt edici kanıtlardır.",
        wrong: [
          [
            "Lentisel – stoma – hidatot.",
            "Bekçi hücresini lentisele, sıvı çıkışını stomaya ve periderm gaz aralığını hidatota yanlış dağıtır.",
          ],
          [
            "Hidatot – lentisel – stoma.",
            "Üç yapının kökte verilen konum ve denetim özellikleriyle uyuşmaz.",
          ],
          [
            "Stoma – lentisel – emici tüy.",
            "Y’de sıvı-ksilem kanıtını, Z’de periderm gaz yolu kanıtını yok sayar.",
          ],
          [
            "Kütikula – hidatot – ksilem.",
            "X’in hücre çiftini hücresiz kütikula, Z’nin dış geçidini iç iletim borusu sayar.",
          ],
        ],
        knowledge: [
          "Yapıyı tek özellikten değil hücre, organ ve çıkan madde hâlini birlikte kullanarak tanı.",
        ],
        strategy:
          "Her harf için ayırt edici iki kanıtı çıkarıp aynı sırayı koru.",
        steps: [
          "X’te bekçi hücresi çiftini stoma ile eşleştir.",
          "Y’de ksilem-mineralli sıvı ilişkisini hidatot olarak tanı.",
          "Z’de odunsu periderm gaz yolunu lentisel olarak tamamla.",
        ],
        commonError:
          "Harflerin sırasını veya suyun buhar-sıvı ayrımını karıştırmak.",
        check: "Üç eşleştirme de verilen bütün özellikleri karşılıyor.",
      },
    ],
  },
  {
    id: "bitki-kok-anatomisi",
    topic: "detail-346",
    title: "Bitkisel kök: büyüme bölgeleri ve seçici giriş yolu",
    minutes: 54,
    objectives: [
      "Kökün bölünme, uzama ve olgunlaşma bölgelerini görevleriyle sırala.",
      "Emici tüy, yan kök ve adventif kökün hücresel kökenlerini ayır.",
      "Olgun kökün katmanlarını dıştan içe izle; Kaspari bandının zar kontrolünü nasıl zorladığını açıkla.",
      "Tipik tek ve çift çenekli kök kesitlerini, kök sistemlerini ve su-mineral alımını kanıtla karşılaştır.",
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özetleri: Kök, kitap s.209–210; OGM Bitkisel Organlar sunusu s.2–17 ve konu özeti021; Dersler Cepte Bitkilerin Yapısı s.8,13–14; OGM Bitkilerde Madde Taşınması ders notu kök bölümü. Aurelia Bitki kağıdı temel organ/sınıflandırma önkoşulu olarak karşılaştırıldı. Özgün anlatım, şekiller ve alıştırmalar.",
    sections: [
      {
        title: "Gerçek kökü organ olarak tanı",
        paragraphs: [
          "Kök, damarlı bitkilerde tutunma ve toprakla alışveriş için özelleşmiş bir organdır. Tohumlu bitkilerde embriyonun kök taslağı radikuladan ana kök gelişir. Ana kökten çıkan yan kökler ile gövde veya yaprak gibi başka organlardan gelişen adventif kökler farklı köken yollarıdır.",
          "Çoğu kök toprak altında ve kloroplast bakımından yoksuldur; ancak hava kökleri ve özel fotosentetik kökler de bulunabilir. Kara yosununun tutunmaya yarayan rizoidi, ksilem-floemli gerçek kökle aynı organ sayılmaz. “Toprağın altında” veya “yeşil değil” tek başına kök tanısı koydurmaz; yapı, gelişim ve iletim dokusunu birlikte kullan.",
        ],
      },
      {
        title: "Tutunma, emilim, depo ve iletişim",
        paragraphs: [
          "Kökler bitkiyi zemine bağlar; su ve çözünmüş minerallerin alınmasına, gövdeye iletilmesine ve bazı bitkilerde besin depolanmasına katkı verir. Kök dokuları bazı hormonların sentezinde de rol alır. Bu görevler tek hücrenin değil, epidermis, temel ve iletim dokularının birlikte çalışmasının sonucudur.",
          "Kök hücreleri canlı oldukları için solunum yapar; ATP gerektiren madde taşıma ve büyüme süreçlerini sürdürür. Toprağın uzun süre suyla dolması gaz girişini azaltarak kökleri etkileyebilir. Kök suyu aldığından oksijene ihtiyaç duymadığı sonucu çıkmaz. Bitki fotosenteziyle yapılan organik maddeler floemle köke ulaşıp solunum veya depo için kullanılabilir.",
        ],
      },
      {
        title: "Kazık kökte ana eksen belirgindir",
        paragraphs: [
          "Kazık kök sisteminde ana kök belirgin ve güçlüdür; ondan yan kökler çıkar. Fasulye, bakla, havuç ve birçok açık tohumlu bitki bu düzen için okul örnekleridir. Havuçta ana kökün depo dokularının gelişmesi, kökün her zaman ince bir emici uzantı olmadığına iyi bir örnektir.",
          "Bir ana eksenin derine uzanması bazı koşullarda derindeki suya erişimi destekleyebilir; fakat başarı yalnız kök tipine bağlı değildir. Toprak derinliği, sıkışma, tür ve suyun dağılımı da önemlidir. Ana kök ve yan köklerin ölçüleri verilmeden “kazık kök mutlaka daha çok su alır” gibi nicel bir kıyas yapılamaz.",
        ],
      },
      {
        title: "Saçak kök ve adventif kök ayrımı",
        paragraphs: [
          "Saçak kök sisteminde benzer kalınlıktaki çok sayıda kök yaygın bir ağ oluşturur; ana kökün baskınlığı azalmış olabilir. Buğday, arpa, mısır, soğan ve pırasa tipik örneklerdir. Toprağın üst katmanını saran bu ağ, uygun koşullarda zeminin tutulmasına ve erozyonun azalmasına katkı verebilir.",
          "Birçok buğdaygilde gövde tabanından gelişen adventif kökler saçak sistemi oluşturur. Bu kökler, mevcut bir kökün içindeki periskldan çıkan yan köklerle gelişimsel olarak aynı başlangıç değildir. Saçak kök ve kazık kök bütün bitkilere uygulanacak tek sınıflama da değildir; gelişim evresine ve yetiştirme koşullarına göre sistem değişebilir.",
        ],
      },
      {
        title: "Depo kökünü gövde yumrusundan ayır",
        paragraphs: [
          "Havuç gibi depo köklerinde parankima dokularında besin birikir. Şeker pancarı gibi bazı örneklerde kalınlaşmış depo organa kök ile hipokotil birlikte katkı verebilir. Destek kökleri veya tutunma kökleri ise kendi çevrelerinde başka işlevlere uyarlanmıştır. Bir organın görevi değişse de gelişimsel kökeni tanımlanmaya devam eder.",
          "Patates yumrusu üzerindeki gözler tomurcuktur ve onun gövde kökenini gösterir; yer altında bulunması kök yapmaz. Aynı şekilde bir depolama fotoğrafından tek veya çift çeneklilik kesin belirlenmez. Organ tanısında tomurcuk, düğüm ve kök ucu gibi kanıtları; besinin depolandığı parankima işlevinden ayrı düşün.",
        ],
      },
      {
        title: "Kök ucunu kaliptra korur",
        paragraphs: [
          "Kökün uç kısmını kaliptra, yani kök şapkası örter. Toprak parçacıklarıyla temas eden bu doku hassas uç meristemini korur; salgılanan kaygan müsilaj kökün toprakta ilerlemesine ve çevresindeki mikro ortamın oluşmasına katkı verir. Bazı kaliptra hücrelerindeki yoğun nişasta tanelerinin yer değiştirmesi yerçekimi algısına katılır.",
          "Kaliptra dışındaki birkaç bölge, kök ekseni boyunca birbirine geçişlerle izlenir. En uçtaki koruma şapkası ile onun hemen arkasındaki hücre üreten meristemi aynı yapı sayma. Bir boyuna kesit, bu bölgelerin sırasını gösterir; kökün bir düzeyinden alınan enine kesit ise iç içe doku katmanlarını gösterir. İki kesit yönü farklı sorulara yanıt verir.",
        ],
      },
      {
        title: "Bölünme bölgesinde hücre sayısı artar",
        paragraphs: [
          "Kaliptranın gerisindeki uç meristem bölgesinde mitozla yeni hücreler üretilir. Küçük, canlı, yoğun sitoplazmalı ve ince çeperli meristem hücrelerinin yavruları kökün farklı dokularına katılır. Üretilen hücrelerin bir kısmı da kaliptranın yenilenmesine katkı verir.",
          "Kökün boyca uzaması yalnız mitoz değildir. Yeni hücre üretimi, ardından hücre uzaması ve farklılaşma birlikte organı büyütür. Bir çizimdeki “bölünme bölgesi” baskın etkinliği anlatır; gerçek dokuda bölgeler bir cetvelle kesilmiş kadar kesin sınırlarla ayrılmaz. Hücre sayısı ölçümüyle tek hücrenin boyunu aynı değişken saymamak gerekir.",
        ],
      },
      {
        title: "Uzama bölgesinde hücre boyu değişir",
        paragraphs: [
          "Bölünme bölgesinden daha geride hücrelerin özellikle kök ekseni boyunca uzaması belirginleşir. Su alımı, kofulun büyümesi ve hücre çeperinin kontrollü esnemesi bu boy artışına katılır. Aynı hücre sayısında daha uzun hücreler, kökün daha uzun bir bölüm oluşturmasını sağlayabilir.",
          "Örneğin eşit sayıda hücreden oluşan iki dizide ortalama hücre boyu iki katına çıkarsa toplam dizi boyu da iki katına çıkar. Bu, mitoz sayısının iki kat olduğu anlamına gelmez. Kök ucu geriye işaretlenerek izlenen bir deneyde, işaretler arası uzaklığın en çok açıldığı bölge uzamanın nerede belirgin olduğunu gösterir.",
        ],
      },
      {
        title: "Olgunlaşma bölgesinde görevler belirginleşir",
        paragraphs: [
          "Uzama bölgesinin gerisinde hücreler görevlerine uygun olarak farklılaşır. Epidermis, korteks, endodermis ve iletim dokusu burada ayırt edilebilir hâle gelir. Genç olgunlaşma bölgesindeki bazı epidermis hücreleri emici tüy oluşturur; bu yüzey, emilim için geniş bir toprak teması sağlar.",
          "Kök uzadıkça yeni olgunlaşan kısımlarda yeni tüyler oluşurken yaşlı tüyler bozulabilir. Bu nedenle emici tüyler uçtaki kaliptranın üstüne çizilmez; uçtan biraz geride bulunur. Bir yan kökün daha geride oluşması veya yaşlı kökün peridermle kaplanması, bütün kökün aynı yüzeye ve aynı emilim kapasitesine sahip olmadığını gösterir.",
        ],
      },
      {
        title: "Bir emici tüyün yüzeyi nasıl işe yarar?",
        paragraphs: [
          "Emici tüy, bir epidermis hücresinin ince ve uzun uzantısıdır. Hücre zarı ve çeperiyle toprak çözeltisine geniş temas kurar; ayrı bir çok hücreli kök organı değildir. Çeperde selüloz yanında pektin bulunur. Yüzey ve çevredeki müsilaj, toprakla temasın sürmesine katkı verebilir.",
          "Alan arttığında alışveriş için daha fazla yüzey bulunur; fakat gerçek su alımı yalnız alanla belirlenmez. Su potansiyeli, mineral derişimi, taşıyıcılar, sıcaklık ve hücrenin enerji durumu da etkili olabilir. Tüylerin toplam alanını hesaplamak, koşullar verilmeden tam bir emilim hızı hesaplamak değildir. Su kıtlığında büyük yüzey tek başına su üretemez.",
        ],
      },
      {
        title: "Dıştan içe katmanları sırala",
        paragraphs: [
          "Genç olgun kök kesitinde dışta epidermis, onun altında çoğunlukla parankimadan oluşan korteks bulunur. Korteksin en iç sınırını endodermis oluşturur. Endodermisin iç tarafında, merkezî silindirin dış katmanı olan periskl yer alır; daha içeride ksilem ve floem elemanları bulunur.",
          "Bu sırayı bir su yoluna çevir: toprakla temas eden yüzeyden geç, korteks boyunca ilerle, endodermis sınırına gel, sonra merkezî silindire ulaş. Epidermis ve endodermis benzer adlı ama farklı konumlu dokulardır. Periskl de endodermisin dışındaki bir kabuk değildir. Doku kimliği kadar komşuluk ilişkisi de anatomiyi öğretir.",
        ],
      },
      {
        title: "Kaspari bandı apoplast yolunu keser",
        paragraphs: [
          "Apoplast, hücre duvarları ve hücreler arası boşlukların oluşturduğu hücre dışı yoldur. Olgun endodermisin hücre duvarlarında çevresel bir kuşak oluşturan Kaspari bandı bu yolu keser. Ligninleşme bandın önemli bileşenidir; gelişimin sonraki basamaklarında süberin birikimi de bariyer özelliklerini artırabilir.",
          "Sağlam bandı geçen su ve uygun çözünmüş maddeler en geç bu sınırda bir canlı hücre zarının denetimine girmek zorundadır. Su hücrenin içine geçebilir; bütün endodermis “hiçbir su geçirmeyen katı duvar” değildir. Seçiciliği sağlayan yalnız süberin maddesinin kendisi de değildir: zar ve taşıma proteinleri hangi çözünmüş maddenin geçebileceğinde belirleyicidir.",
        ],
      },
      {
        title: "Üç yolu aynı son noktaya kadar izle",
        paragraphs: [
          "Simplast yolu, başlangıçta zarı geçip hücre sitoplazmasına girdikten sonra plasmodesmalarla hücreden hücreye devam eder. Apoplast yolu endodermise kadar hücre duvarları arasında ilerleyebilir; sağlam Kaspari bandında bu duvar yolu kesilir ve zar geçişi gerekir. Transmembran yolda ise su ve maddeler birden fazla hücrenin zarını tekrar tekrar geçebilir.",
          "Bu yollar birbirine dönüşebilir ve gerçek kökte birlikte çalışır. Simplastı “hiç zar geçilmeyen yol” sanma; ilk girişte zar vardır. Apoplastı da her durumda doğrudan ksileme açılan bir tünel sayma. Ksilemdeki iletim boşluğuna son aktarım ayrı bir çıkış aşaması içerir. Model, yol seçiciliğini izler; tüm zar geçişlerinin kesin sayısını veya gerçek akış hızını üretmez.",
        ],
      },
      {
        title: "Mineralin yolu ile suyun yolunu karıştırma",
        paragraphs: [
          "Mineral iyonları kök hücrelerine, iyonun elektrokimyasal farkına ve taşıma proteinlerine bağlı olarak pasif veya aktif süreçlerle alınabilir. Proton pompaları birincil aktif taşımada ATP kullanabilir; oluşturdukları fark başka taşımaları da destekler. Bu yüzden her iyon girişinin aynı pompa, aynı yön veya aynı ATP maliyeti olduğu söylenmez.",
          "Su ise uygun potansiyel farkında ozmozla geçer; akvaporinler geçişi kolaylaştırabilir ama suyu ATP ile derişim farkına karşı pompalamaz. Tuzlu bir toprak çözeltisinin su potansiyeli çok düştüğünde kök su almakta zorlanabilir, hatta su kaybedebilir. “Toprakta sıvı su var” bilgisi tek başına köke net su girişini kanıtlamaz.",
        ],
      },
      {
        title: "Merkezî silindirde taşıma görevlerini yerleştir",
        paragraphs: [
          "Ksilem su ve çözünmüş minerallerin uzun mesafeli taşınmasında rol alır. Olgun trake ve trakeitler canlılıklarını kaybetmiş iletim elemanlarıdır; tüm ksilem dokusu yalnız ölü hücrelerden oluşmaz, yaşayan parankima da bulunabilir. Floem, kaynak ve havuz organları arasında şeker ve başka organik maddelerin taşınmasına katılır.",
          "Kök çoğu durumda fotosentez yapamadığı için yapraktan gelen organik maddelerin havuzu olabilir. Depo maddeleri yeniden kullanılınca kökün kaynak rolü de değişebilir. Endodermis bu iki iletim dokusunun yerine geçmez; korteks ile merkezî silindir arasındaki seçici sınırdır. Periskl ise yan kök üretimine katılan canlı katmanıyla bu silindirin dış kenarında bulunur.",
        ],
      },
      {
        title: "Tek ve çift çenekli tipik kök kesitlerini karşılaştır",
        paragraphs: [
          "Tipik çift çenekli genç kökte merkezde yıldız benzeri ksilem kolları, bu kolların arasında floem grupları görülür; merkezî öz az gelişmiş veya belirgin olmayabilir. Tipik tek çenekli kökte ise çok sayıda ksilem ve floem grubu merkezdeki belirgin öz çevresinde daha halkasal bir düzen oluşturur. İkisinde de epidermis, korteks ve endodermis bulunur.",
          "Çift çeneklilerin ve açık tohumluların birçok kökünde damar kambiyumuyla sekonder kalınlaşma görülebilir. Çoğu tek çenekli kökte tipik damar kambiyumu halkası yoktur; bazı grupların özel kalınlaşma biçimleri bu okul modelinden farklıdır. “Açık/kapalı iletim demeti” adları, kambiyumla ilişkiyi anlatır; genç kökte iletim dokularının radyal yerleşimini yok saymaz.",
        ],
      },
      {
        title: "Yan kök içeriden başlar",
        paragraphs: [
          "Birçok tohumlu bitkide yan kök taslağı periskl hücrelerinin yeniden bölünmesiyle, kökün iç tarafından başlar. Taslak dış dokuları aşarak dışarı çıkar; kendi uç meristemi, kaliptrası ve iletim bağlantısını geliştirir. Bu nedenle yan kökün kökeni endojendir, yani içeridedir.",
          "Emici tüy ise epidermisteki tek hücre uzantısıdır ve böyle bir iç taslak kurmaz. Gövdeden gelişen adventif kökün başlangıç dokusu da o organın gelişim bağlamına göre değerlendirilir. “Bütün yeni kökler her organda periskldan çıkar” diye genişletme. Periskl, kökün yan dallanmasını doku katmanlarının içinden açıklayan temel köprü bilgidir.",
        ],
      },
      {
        title: "Kök ortaklıkları ne kazandırır?",
        paragraphs: [
          "Mikoriza, uygun bitki kökleriyle mantarların kurduğu birlikteliktir. Mantar hifleri toprağa yayılıp özellikle bazı minerallerin ve suyun alınmasına katkı verebilir; bitki de mantara fotosentezle ilişkili organik karbon sağlar. Bu, mantarın bitkinin yerine fotosentez yaptığı veya her koşulda aynı yararı sağladığı anlamına gelmez.",
          "Bazı bitkilerde, özellikle uygun baklagil-bakteri eşleşmelerinde kök nodülleri oluşur. Atmosferik N₂’nin bağlanmasını ortak bakteriler gerçekleştirir; bu işlev bitkinin kendi başına yaptığı bir tepki değildir. Mikoriza ile nodül, ortaklık ve madde alışverişi bakımından ilişkilidir ama aynı yapı veya aynı azot mekanizması değildir.",
        ],
      },
      {
        title: "Toprakta hava ve su birlikte değerlendirilir",
        paragraphs: [
          "İyi bir kök ortamı hem erişilebilir suyu hem de köklerin solunum yapabileceği gaz alışverişini destekler. Uzun süreli su basması hava boşluklarını azaltabilir; kuraklık ise dış su potansiyelini düşürür. İki koşul da büyümeyi etkileyebilir ama bozulan ilk basamak aynı değildir.",
          "Bir deneyde kök oksijeni azaltılıp ışık, sıcaklık ve dış mineral derişimi eşit tutulursa ATP gerektiren alım süreçlerinin etkilenmesi araştırılabilir. Yine de bütün mineral girişinin anında sıfırlandığı sonucu ek veri olmadan kurulmaz; pasif yollar ve mevcut enerji de önemlidir. Organın görevini öğrenmek, çevresel neden-sonuç zincirini somut basamaklarla kurmayı sağlar.",
        ],
      },
      {
        title: "Boyuna ve enine kanıtı birleştir",
        paragraphs: [
          "Bir kök ucunun boyuna çiziminde kaliptra, bölünme, uzama ve olgunlaşma bölgelerini sırala. Sonra olgunlaşma düzeyinden bir enine kesit seçip dıştan içe katmanları bul. Aynı doku adı, çizimin yönü değişince farklı geometriyle görünebilir. Hücrelerin nereden başladığını ve suyun hangi sınırdan geçtiğini ayrı oklar üzerinde izlemek karışıklığı azaltır.",
          "Etkileşimde önce sağlam Kaspari bandını ve zarı geçmeyen bir izleyiciyi seç. Ardından yalnız bandın deneysel kesintisini değiştir: apoplast yoluyla gözlenen fark, zar kontrolünün neden gerekli olduğunu gösterir. Simplast yolunu seçince ilk giriş zarının hâlâ gerekli kaldığını denetle. Bu ideal örnek gerçek kök emilim yüzdesi veya toksisite tahmini üretmez; anatomiyle koşullu geçiş mantığını öğretir.",
        ],
      },
    ],
    examples: [
      {
        title: "Hücre sayısı sabitken kök nasıl uzar?",
        prompt:
          "Aynı kök bölgesinde art arda dizilmiş20 hücrenin ortalama eksen boyu10 µm’den30 µm’ye çıkıyor. Hücre sayısı bu aralıkta değişmiyor. Dizinin boyu kaç µm artar ve kaç katına çıkar?",
        strategy:
          "Hücre sayısını ortalama boyla çarp; artış ile katı ayrı hesapla.",
        steps: [
          {
            label: "İlk ve son boyu bul",
            explanation:
              "Aynı yirmi hücre, başlangıç ve sondaki iki farklı ortalama uzunlukla çarpılır.",
            expression: "İlk20×10=200 µm; son20×30=600 µm",
          },
          {
            label: "Artış ve katı ayır",
            explanation: "Fark çıkarma, kaç kat sorusu bölme gerektirir.",
            expression: "600−200=400 µm;600/200=3",
          },
          {
            label: "Biyolojik anlamı kur",
            explanation:
              "Hücre sayısı sabit verildiği için bu değişim yeni mitozları kanıtlamaz; hücre uzamasını gösterir.",
            expression: "Boy artışı: hücre uzaması",
          },
        ],
        answer: "400 µm artar; toplam boy3 katına çıkar.",
        check:
          "Tek hücrenin boyu3 kat olduğunda eşit hücre sayısıyla dizinin boyu da3 kattır.",
        pitfall: "Uzunluk3 kat oldu diye hücre sayısını3 kat saymak.",
      },
      {
        title: "Emici tüyler temas alanına ne ekler?",
        prompt:
          "Tüy içermeyen kök yüzeyi4 mm² kabul ediliyor. Eklenen1200 tüyün her biri toprakla0,005 mm² yeni temas alanı sağlıyor; örtüşme yok. Toplam temas alanı kaç mm² ve ilk alanın kaç katıdır? Bu hesap yalnız geometri içindir.",
        strategy:
          "Yeni alanları toplayıp başlangıç alanına ekle; bunun doğrudan akış hızı olmadığını koru.",
        steps: [
          {
            label: "Tüy alanlarını topla",
            explanation:
              "Her tüyün katkısı aynı ve örtüşme olmadığı belirtilmiştir.",
            expression: "1200 × 0,005 = 6 mm²",
          },
          {
            label: "Eski alanı ekle",
            explanation:
              "Tüy alanı, kökün verilen ilk alanının yerine değil üstüne eklenir.",
            expression: "4 + 6 = 10 mm²",
          },
          {
            label: "Katsayı ve sınırı bul",
            explanation:
              "Yeni toplamın eski toplamla oranı geometrik yüzey artışıdır. Su potansiyeli verilmediği için emilim hızı hesaplanmaz.",
            expression: "10/4 = 2,5 kat",
          },
        ],
        answer: "10 mm²; ilk alanın2,5 katı.",
        check: "Yeni ek alan6 mm², toplam10 mm²; ikisini karıştırmadın.",
        pitfall:
          "Alan2,5 kat olunca bütün koşullarda su alımı da kesin2,5 kat olur demek.",
      },
      {
        title: "Olgun kök katmanlarını dıştan içe izle",
        prompt:
          "Genç olgun kök için A epidermis, B korteks, C endodermis, D periskl ve E merkezî silindirdeki ksilem elemanını gösteriyor. Toprak çözeltisinden E’ye doğru temel doku sırası nedir?",
        strategy:
          "Önce dış yüzeyi bul; korteksin son sınırı ile merkezî silindirin dış katmanını ayır.",
        steps: [
          {
            label: "Dış giriş ve korteksi yerleştir",
            explanation:
              "Toprakla ilk temas eden epidermistir, onun iç tarafında korteks bulunur.",
            expression: "A → B",
          },
          {
            label: "İki komşu sınırı yerleştir",
            explanation:
              "Endodermis korteksin en iç sınırıdır; periskl onun içindeki merkezî silindire aittir.",
            expression: "B → C → D",
          },
          {
            label: "İletim elemanına ulaş",
            explanation:
              "Ksilem elemanı merkezî silindirin daha iç kısmındaki hedef olarak verilmiştir.",
            expression: "A → B → C → D → E",
          },
        ],
        answer: "Dıştan içe temel sıra: A → B → C → D → E.",
        check:
          "C ileD’yi ters çevirmedin; bu sıra doku konumunu anlatır, her basamakta aynı sayıda zar geçildiğini söylemez.",
        pitfall:
          "Endodermis ile periskli veya epidermis ile endodermisi karıştırmak.",
      },
      {
        title: "Kaspari bandını bir izleyiciyle sınama",
        prompt:
          "Dışarı verilen12 boya biriminin hücre zarlarını hiç geçemediği ve hücre duvarı yolunda ilerleyebildiği biliniyor. İki kökte diğer bütün koşullar aynı. X’te Kaspari bandı sağlam;Y’de boyanın izlediği apoplast yolunda bandın deneysel kesintisi var. Modelde bu açık yolun tamamı ksileme kadar uzanıyor. Geçebilen boya sayıları nedir?",
        strategy:
          "Boyanın maddesel özelliğini, seçilen yolun hangi sınırda zar gerektirdiğiyle eşleştir.",
        steps: [
          {
            label: "Sağlam bandı düşün",
            explanation:
              "X’te apoplast yolunun endodermiste kesilmesi boya için zar geçişini zorunlu kılar; boya bunu yapamaz.",
            expression: "X:0/12",
          },
          {
            label: "Deneysel kesintiyi kullan",
            explanation:
              "Y’de kökte açıkça tanımlanan duvar yolu, zar kontrolünü atlar. Bu ideal koşulda on iki birim de geçebilir.",
            expression: "Y:12/12",
          },
          {
            label: "Koşullu sonuca sınır koy",
            explanation:
              "Sonuç, verilen deneysel kesinti ve tam açık yol modeline aittir; her gerçek yaralanmanın akışını aynı yüzdeyle öngörmez.",
            expression: "Sağlam0; deneysel açık12",
          },
        ],
        answer: "X’te0,Y’de12 boya birimi geçebilir.",
        check:
          "Zarı geçmeyen boya için fark, yalnız apoplast yolundaki bariyer değişiminden doğdu.",
        pitfall:
          "Simplast yolunda ilk zar geçişi gerektiğini unutarak boyayı hücre içine yerleştirmek.",
      },
      {
        title: "Mineral alımında verilen taşıma bütçesini kullan",
        prompt:
          "Bir deney aralığında köke20 iyon birimi giriyor. Ölçüm,8 birimin pasif yolla, kalanların belirli bir aktif mekanizmayla alındığını gösteriyor. Bu deneysel mekanizma için3 iyon başına1 ATP harcanıyor. Başka enerji gideri sayılmıyor. Bu aktif alıma kaç ATP birimi gerekir?",
        strategy:
          "Önce toplamdan pasif katkıyı çıkar; yalnız aktif miktara verilen oranı uygula.",
        steps: [
          {
            label: "Aktif payı ayır",
            explanation:
              "Toplam girişin hepsinin ATP maliyeti olduğu verilmemiştir.",
            expression: "20−8=12 iyon birimi",
          },
          {
            label: "Verilen oranı kullan",
            explanation:
              "Sorudaki yapay deneysel oran üç iyona bir ATP’dir; evrensel pompa maliyeti değildir.",
            expression: "12/3=4 ATP birimi",
          },
          {
            label: "Sonucu kapsamıyla yaz",
            explanation:
              "Dört birim yalnız bu alım mekanizmasının verilen maliyetidir; hücrenin bütün solunum giderini temsil etmez.",
            expression: "Aktif alım maliyeti4 ATP",
          },
        ],
        answer: "4 ATP birimi.",
        check: "8 pasif+12 aktif=20 toplam;12 aktif/3=4.",
        pitfall:
          "Toplam20’yi oranla bölmek veya verilen oranı bütün bitki iyonlarına yaymak.",
      },
      {
        title: "Tuzlu ortamda suyun yönü değişebilir",
        prompt:
          "Bir kök hücresinde Ψs=−1,2 MPa ve Ψp=+0,6 MPa. İlk toprak çözeltisinin Ψ değeri−1,0 MPa; seyreltilen ikinci çözeltide−0,2 MPa. İki ölçüm anında hücre bileşenleri aynı kabul ediliyor; zar suya geçirgen. İlk ve ikinci durumda net yön nedir?",
        strategy:
          "Hücre toplamını bir kez hesapla; her dış ortamla ayrı karşılaştır.",
        steps: [
          {
            label: "Hücrenin toplamını bul",
            explanation: "Verilen iki bileşen farklı işaretlidir.",
            expression: "−1,2+0,6=−0,6 MPa",
          },
          {
            label: "İlk ortamı değerlendir",
            explanation:
              "Hücre−0,6 ile dış−1,0’dan yüksektir; su hücreden dışarı net geçer.",
            expression: "İlk: hücre → toprak",
          },
          {
            label: "İkinci ortamı değerlendir",
            explanation:
              "Dış−0,2 hücrenin−0,6 değerinden yüksektir; net yön hücre içine döner.",
            expression: "İkinci: toprak → hücre",
          },
        ],
        answer: "İlk durumda dışarı, ikinci durumda içeri.",
        check:
          "Negatif değerleri doğru sıraladın; iki deney anı için verilen hücre koşulunu korudun.",
        pitfall:
          "Toprakta sıvı su bulunduğu için net girişin her durumda zorunlu olduğunu sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Kök ucundan geriye doğru üç temel gelişim bölgesini sırala.",
        answer:
          "Kaliptranın gerisinde bölünme, uzama ve olgunlaşma bölgeleri yer alır; sınırlar kesin cetvel çizgileri değildir.",
      },
      {
        prompt: "Yan kök ile emici tüy hangi iki kanıtla ayrılır?",
        answer:
          "Yan kök içerideki periskl kökenli çok hücreli organdır; emici tüy tek epidermis hücresinin uzantısıdır. Yan kök kendi uç ve iletim düzenini geliştirir.",
      },
      {
        prompt: "Sağlam Kaspari bandı suyun bütün geçişini mi durdurur?",
        answer:
          "Hayır; apoplast yolunu keserek en geç endodermiste zar kontrolüne geçişi zorlar. Uygun su ve iyonlar canlı hücrelerden geçebilir.",
      },
      {
        prompt: "Simplast yolu neden hiç zar geçilmeyen yol değildir?",
        answer:
          "Dış çözeltiden sitoplazmaya ilk girişte zar geçilir; sonra plasmodesmalarla sitoplazmalar arasında ilerlenebilir.",
      },
      {
        prompt:
          "Tipik tek ve çift çenekli kök kesitinde merkezi nasıl ayırırsın?",
        answer:
          "Tipik tek çeneklide belirgin öz çevresinde çok sayıda iletim grubu; çift çeneklide merkezde yıldız biçimli ksilem ve aralarda floem görülür. Bunlar tipik okul örnekleridir.",
      },
      {
        prompt: "Mikoriza ve nodülde bitkinin almadığı görevi söyle.",
        answer:
          "Mikoriza mantarı bitki yerine fotosentez yapmaz; nodülde N₂ bağlanmasını uygun bakteriler yapar. Her kök bu ortaklıkları taşımak zorunda değildir.",
      },
    ],
    items: [
      {
        prompt:
          "Bir tohum çimlenirken embriyonun radikulası gelişiyor. Daha sonra oluşan ilk kökün iç dokularından yeni kök dalları çıkıyor. İlk kök ile bu dalların adları sırasıyla hangisidir?",
        correct: "Ana kök ve yan kök.",
        reason:
          "Radikuladan gelişen ilk kök ana köktür; onun kök dokularından gelişen dallar yan köktür.",
        wrong: [
          [
            "Emici tüy ve yaprak.",
            "Emici tüy tek epidermis hücresinin uzantısıdır; radikuladan gelişen organ veya onun kök dalı değildir.",
          ],
          [
            "Gövde ve adventif kök.",
            "Soruda ilk organın radikuladan, dalların mevcut kökün içinden çıktığı belirtilmiştir.",
          ],
          [
            "Kaliptra ve stoma.",
            "Kaliptra kök ucunun örtüsüdür; stoma tipik genç toprak kökünün dalı değildir.",
          ],
          [
            "Kütikula ve hidatot.",
            "Bu yapılar radikuladan gelişen ana kökün ve kök dallarının adları değildir.",
          ],
        ],
        knowledge: [
          "Radikula embriyonik kök taslağıdır.",
          "Yan kök mevcut kökün iç dokularından gelişen yeni kök organıdır.",
        ],
        strategy:
          "Önce her yapının geliştiği başlangıcı bul; sonra organ adını ver.",
        steps: [
          "Radikulanın geliştiği ilk organı ana kök olarak adlandır.",
          "Yeni dalların ana kökten çıktığını kullan.",
          "İki adı verilen sırayla ana kök–yan kök olarak eşleştir.",
        ],
        commonError:
          "Kök organıyla onun yüzey hücresi uzantısını aynı yapı saymak.",
        check: "Her iki ad da kökte verilen gelişim kökenini karşılıyor.",
      },
      {
        prompt:
          "A bitkisinde gövde tabanından gelişmiş çok sayıda benzer kalınlıkta kök, B bitkisinde belirgin kalın ana kök ve ona bağlı daha ince kökler görülüyor. A ve B için hangi yorum uygundur?",
        correct: "A saçak kök sistemi, B kazık kök sistemi örneğidir.",
        reason:
          "A’da belirgin baskın ana kök yerine çok sayıda benzer kök; B’de gelişmiş ana kök vardır.",
        wrong: [
          [
            "A kazık, B saçak kök sistemidir.",
            "Baskın ana kökün bulunduğu B ile çok sayıdaki benzer köklü A ters eşleştirilmiştir.",
          ],
          [
            "A’daki bütün kökler tek hücreli emici tüydür.",
            "Gövde tabanından gelişen kök organları tek hücreli uzantı değildir.",
          ],
          [
            "B’nin ana kökü mutlaka gövdeden gelişmiştir.",
            "Ana kökün embriyonik kök kökeni yerine zorunlu adventif köken ileri sürülüyor.",
          ],
          [
            "A ve B’de kök sistemi bulunduğu için tüm emilim hızları eşittir.",
            "Morfolojik sistem adı, su potansiyeli ve ortam ölçümleri olmadan hız eşitliği vermez.",
          ],
        ],
        knowledge: [
          "Kazık sistemde ana kök belirgindir; saçak sistemde çok sayıda benzer kök gelişir.",
        ],
        strategy:
          "Köklerin sayısına tek başına bakma; baskın ana kökün varlığını karşılaştır.",
        steps: [
          "A’da benzer çaplı çok sayıdaki kökü belirle.",
          "B’de baskın ana kökü ve yan kökleri ayır.",
          "A’ya saçak, B’ye kazık sistem adını ver.",
        ],
        commonError:
          "Bir saçak kökü tek hücreli tüy sanmak veya ana kök baskınlığını ters okumak.",
        check:
          "Sistem adları A ve B’nin verilen mimarisini açıklıyor; ölçülmeyen hız üretmiyor.",
      },
      {
        prompt:
          "Bir öğrenci havuçta depo kök, patateste gövde yumrusu bulunduğunu öğreniyor. Hangi çıkarım bu bilgiye uygundur?",
        correct:
          "Besin depolama görevi aynı olsa da depolayan organın kökeni farklı olabilir.",
        reason:
          "Ortak depo görevi iki yapının aynı organ olmasını gerektirmez; havuç kök, patates gövde kökenlidir.",
        wrong: [
          [
            "Toprak altında bulunan bütün depolar köktür.",
            "Patatesin gövde yumrusu olduğu verilen karşı örneği yok sayar.",
          ],
          [
            "Depo kök bulunması kökün su almasını olanaksız kılar.",
            "Depolama görevi kök sistemindeki diğer görevlerin tümünü ortadan kaldırmaz.",
          ],
          [
            "Havuçta besin varsa kök kendi başına mutlaka fotosentez yapmıştır.",
            "Depo organı, başka organda üretilen organik maddeleri de alabilir.",
          ],
          [
            "Patates gövde kökenli olduğu için hücre içermez.",
            "Organ kökeni hücreli olmayı ortadan kaldırmaz.",
          ],
        ],
        knowledge: [
          "Organlar birden çok görev üstlenebilir.",
          "Morfolojik köken ile işlev aynı sınıflandırma ölçütü değildir.",
        ],
        strategy: "Depolama işlevini organ kökeninden ayrı iki sütunda düşün.",
        steps: [
          "İki örneğin ortak işlevini besin depolama olarak belirle.",
          "Verilen kök ve gövde kökenlerini koru.",
          "Ortak işlevin ortak organ kimliği gerektirmediği sonucu seç.",
        ],
        commonError:
          "Toprakta bulunmayı veya aynı görevi kök kimliğinin yeterli kanıtı saymak.",
        check: "Seçenek hem havuç hem patates örneğiyle çelişmeden çalışıyor.",
      },
      {
        prompt:
          "Fotosentez yapmayan genç bir kökün canlı hücreleri solunum yapmaktadır. Yapraklardan köke organik madde taşındığı da ölçülmüştür. Hangi açıklama uygundur?",
        correct:
          "Kök floemle gelen organik maddeleri kullanabilir; fotosentez yapmaması solunumu engellemez.",
        reason:
          "Kök bir havuz organ olarak organik madde alabilir; canlı hücrelerinde bu maddeleri solunumda kullanabilir.",
        wrong: [
          [
            "Fotosentez yapmayan kök hücreleri canlı olamaz.",
            "Soruda kök hücrelerinin canlı ve solunum yaptığı verilmiştir.",
          ],
          [
            "Köke gelen organik maddeler yalnız ksilemdeki suyun dönüşümüdür.",
            "Şeker taşınmasıyla su-mineral taşınması birbirine karıştırılmıştır.",
          ],
          [
            "Kök yalnız su aldığından hormon sentezleyemez.",
            "Kökün bazı hormonları sentezleme işlevi, yalnız su alımıyla sınırlandırılamaz.",
          ],
          [
            "Solunum yapan kökte bütün hücrelerin kloroplastı olmak zorundadır.",
            "Oksijenli solunum kloroplast zorunluluğu değildir.",
          ],
        ],
        knowledge: [
          "Floem kaynak ve havuz organları arasında organik madde taşınmasına katılır.",
          "Kökün canlı hücreleri solunum yapar; bazı hormonları da sentezleyebilir.",
        ],
        strategy:
          "Karbonun nereden geldiği ile hücrenin onu nasıl kullandığını ayır.",
        steps: [
          "Yapraktan gelen organik maddeyi kökün karbon girdisi olarak tanı.",
          "Fotosentez ile solunumun ayrı süreçler olduğunu kullan.",
          "Floem girdisi ve solunum birlikteliğini açıklayan sonucu seç.",
        ],
        commonError:
          "Fotosentez yapamayan canlı dokuda solunum da olamayacağını düşünmek.",
        check: "Kökün karbon girdisi ve enerji kullanımı birlikte açıklanıyor.",
      },
      {
        prompt:
          "Bir genç kökün boyuna görüntüsünde uçtaki koruyucu başlıktan gövde yönüne ilerleniyor. Baskın etkinliklere göre doğru sıra hangisidir?",
        correct: "Kaliptra → bölünme → uzama → olgunlaşma.",
        reason:
          "Kök şapkası ucu korur; ardındaki bölünme bölgesini uzama ve daha geride farklılaşma izler.",
        wrong: [
          [
            "Olgunlaşma → kaliptra → uzama → bölünme.",
            "Uçtan geriye verilen yönle ve büyüme sırasıyla uyuşmaz.",
          ],
          [
            "Kaliptra → olgunlaşma → bölünme → uzama.",
            "Emici tüylü olgunlaşma bölgesini uç meristeminin önüne yerleştirir.",
          ],
          [
            "Bölünme → stoma → kütikula → floem.",
            "Birbirinden farklı yüzey ve doku adlarını boyuna büyüme bölgeleri sanır.",
          ],
          [
            "Kaliptra → uzama → olgunlaşma → bölünme.",
            "Yeni hücre üreten meristemi en geriye atarak verilen gelişim zincirini ters kurar.",
          ],
        ],
        knowledge: [
          "Kök ucundaki kaliptra koruyucu yapıdır.",
          "Bölünme, uzama ve olgunlaşma bölgeleri baskın etkinlikleri anlatır; kesin cetvel sınırları değildir.",
        ],
        strategy:
          "Önce ilerleme yönünü sabitle, sonra hücre üretiminden farklılaşmaya sırala.",
        steps: [
          "Başlangıçtaki koruyucu başlığı kaliptra olarak tanı.",
          "Yeni hücre üretimini uzamadan önce yerleştir.",
          "Olgunlaşmayı uzamanın gerisinde tamamla.",
        ],
        commonError:
          "Enine doku katmanlarıyla boyuna büyüme bölgelerini aynı sıra sanmak.",
        check:
          "Sıra hem verilen yönü hem yeni hücre→uzama→farklılaşma mantığını koruyor.",
      },
      {
        prompt:
          "Kök ucunda X, toprakta ilerleyen ucu örten ve müsilaj salgısına katılan başlıktır. Y, onun gerisinde yeni kök hücrelerini üreten bölgedir. X ve Y sırasıyla hangisidir?",
        correct: "Kaliptra ve uç meristemi.",
        reason:
          "Kaliptra koruma ve kayganlaştırıcı salgıyla ilişkilidir; uç meristemi yeni hücre üretir.",
        wrong: [
          [
            "Uç meristemi ve kaliptra.",
            "Üretici bölgeyle koruyucu başlığın görevlerini ters eşleştirir.",
          ],
          [
            "Endodermis ve kütikula.",
            "Biri olgun kökün iç sınırı, diğeri hücresiz dış örtüdür; verilen uç düzeni değildir.",
          ],
          [
            "Floem ve lentisel.",
            "Organik madde iletim dokusu ve odunsu yüzey gaz bölgesi kök ucu başlığı değildir.",
          ],
          [
            "Emici tüy ve gözenek.",
            "Emici tüy olgunlaşma bölgesindedir; başlığın yeni hücre üreten arka komşusu stoma değildir.",
          ],
        ],
        knowledge: [
          "Kaliptra kök ucunu korur ve yerçekiminin algılanmasına katılır.",
          "Uç meristemi kökün primer büyümesi için yeni hücreler üretir.",
        ],
        strategy: "Her harfi kendi gözlenen görevine göre adlandır.",
        steps: [
          "Koruma ve müsilaj görevini kaliptrayla eşleştir.",
          "Yeni hücre üretimini uç meristemine bağla.",
          "Verilen X-Y sırasını koru.",
        ],
        commonError:
          "Koruyucu yapıyı tek başına mitoz yapan bütün kök bölgesi sanmak.",
        check: "İki görev birbirinin yerine geçirilmeden açıklanıyor.",
      },
      {
        prompt:
          "Bir kök dizisinde hücre sayısı değişmeden ortalama hücre boyu 2 µm’den 8 µm’ye çıkıyor. Dizi boyunca hücreler aynı yönde, arada ek boşluk olmadan uç uca dizilmiştir. Dizi boyu için ne söylenir?",
        correct:
          "Dört katına çıkar; hücre sayısının dört katına çıktığı sonucu çıkmaz.",
        reason:
          "Aynı hücre sayısında toplam uzunluk hücre boyuyla orantılıdır;8/2=4.",
        wrong: [
          [
            "Dört katına çıkar ve zorunlu olarak dört kat mitoz olmuştur.",
            "Hücre sayısının değişmediği açık koşuluyla çelişir.",
          ],
          [
            "İki katına çıkar çünkü8−2=6’dır.",
            "Fark ile oran karıştırılmıştır;6 sayısı da iki katı göstermez.",
          ],
          [
            "Değişmez çünkü hücre sayısı aynıdır.",
            "Aynı sayıda daha uzun hücreler daha uzun dizi oluşturur.",
          ],
          ["Dörtte birine iner.", "Yeni/eski boy oranını ters çevirir."],
        ],
        knowledge: [
          "Toplam dizi boyu, verilen düzende hücre sayısı×ortalama hücre boyudur.",
        ],
        strategy: "Sayıyı sabit tutup yalnız hücre boylarının oranını al.",
        steps: [
          "Hücre sayısının değişmediğini not et.",
          "8/2=4 oranını hesapla.",
          "Toplam boy artışını hücre çoğalmasıyla eşitlemeden yorumla.",
        ],
        commonError: "Uzama ile bölünmeyi aynı olay sanmak.",
        check: "N×8 / (N×2)=4; N sadeleşir.",
      },
      {
        prompt:
          "Bir genç kökte1.000 emici tüyün her biri yüzeye0,02 mm² ek temas alanı katıyor. Diğer alanlar bu hesap dışında. Tüylerin toplam ek alanı kaç mm² olur?",
        correct: "20 mm².",
        reason: "1.000×0,02=20 mm²; alan, hız veya hacim değildir.",
        wrong: [
          [
            "50.000 mm².",
            "Tüy sayısını her tüyün alanına bölmek toplam alanı vermez.",
          ],
          [
            "0,00002 mm².",
            "Her tüyün alanını sayıya bölerek toplam yerine başka bir oran hesaplar.",
          ],
          [
            "20 mL/saat.",
            "Alan hesabından koşulsuz bir sıvı akış hızı üretilemez.",
          ],
          [
            "1.000 mm².",
            "Her tüyün0,02 mm² katkısı yerine1 mm² varsayılmıştır.",
          ],
        ],
        knowledge: ["Tek tüyün alan katkısı×tüy sayısı toplam ek alanı verir."],
        strategy: "Birimleri koruyarak sayıyı tek tüyün alanıyla çarp.",
        steps: [
          "Bir tüyün ek alanını0,02 mm² olarak al.",
          "1.000 adet ile çarpıp20 mm² bul.",
          "Hesabın alan olduğunu, gerçek emilim hızı olmadığını ayır.",
        ],
        commonError:
          "Daha fazla yüzeyin miktarını doğrudan ölçülmemiş emilim hızına çevirmek.",
        check: "20/1.000=0,02 mm²/tüy ile başlangıca dönülür.",
      },
      {
        prompt:
          "X, epidermisteki bir hücrenin ince uzantısıdır. Y, kökün iç tarafında başlayıp kendi iletim dokusunu ve kaliptrasını geliştiren yeni organdır. X ve Y sırası hangisidir?",
        correct: "Emici tüy ve yan kök.",
        reason:
          "Tek epidermis uzantısı emici tüy; iç taslaktan gelişen çok hücreli yeni organ yan köktür.",
        wrong: [
          [
            "Yan kök ve emici tüy.",
            "Hücre sayısı, köken ve uç yapıları ters eşleştirilmiştir.",
          ],
          [
            "Stoma ve hidatot.",
            "Bunlar verilen kök organı ve tek epidermis uzantısı düzeni değildir.",
          ],
          [
            "Periskl ve kütikula.",
            "Periskl iç katmandır, kütikula hücresiz örtüdür; tanımların ikisini de karşılamaz.",
          ],
          [
            "X ve Y aynı tek hücrenin iki evresidir.",
            "Y’nin kendi dokuları ve kök şapkası olan organ olduğu açıkça verilmiştir.",
          ],
        ],
        knowledge: [
          "Kök emici tüyü tipik olarak tek hücre uzantısıdır.",
          "Yan kök çok hücreli yeni organdır ve içeriden gelişir.",
        ],
        strategy:
          "Boyuta değil hücre sayısı, gelişim kökeni ve doku düzenine bak.",
        steps: [
          "X’in tek epidermis hücresine ait olduğunu belirle.",
          "Y’nin iç taslak ve kendi doku düzenini birlikte kullan.",
          "X’i emici tüy, Y’yi yan kök olarak seç.",
        ],
        commonError: "Çizimdeki ince bütün çıkıntıları aynı yapı sanmak.",
        check:
          "Tanımların her biri doğru yapının bütün ayırt edici özelliklerini karşılıyor.",
      },
      {
        prompt:
          "Genç bir kökün olgunlaşma bölgesinden alınan enine kesitte topraktan merkezî iletim dokusuna doğru ilerleniyor. Hangi sıra doğrudur?",
        correct:
          "Epidermis → korteks → endodermis → periskl → iletim dokuları.",
        reason:
          "Endodermis korteksin iç sınırı, periskl ise merkezî silindirin dış katmanıdır.",
        wrong: [
          [
            "Epidermis → periskl → korteks → endodermis → iletim dokuları.",
            "Periskli korteksin dışına yerleştirir.",
          ],
          [
            "Korteks → epidermis → ksilem → endodermis → periskl.",
            "Dış epidermisi korteksin içine, endodermisi iletim dokularının sonrasına atar.",
          ],
          [
            "Endodermis → korteks → epidermis → floem → periskl.",
            "Dıştan içe yönü ilk üç katmanda ters çevirir.",
          ],
          [
            "Epidermis → kaliptra → stoma → periderm → ksilem.",
            "Boyuna uç yapısını ve yaprak/odunsu yüzey adlarını genç olgun kök katmanlarıyla karıştırır.",
          ],
        ],
        knowledge: [
          "Korteks epidermisin altında, endodermis korteksin iç sınırındadır.",
          "Periskl endodermisin hemen iç tarafında merkezî silindire katılır.",
        ],
        strategy:
          "Önce dış yüzeyi, sonra korteksin sınırını ve merkezî silindirin başlangıcını bul.",
        steps: [
          "Dışta epidermis, altında korteksi yerleştir.",
          "Korteksin iç sınırını endodermis olarak ekle.",
          "Periskl ve iletim dokularıyla merkeze ilerle.",
        ],
        commonError: "Benzer adlı epidermis ve endodermisi aynı katman sanmak.",
        check: "Sıra dıştan içe yürüyüşte doku komşuluklarını koruyor.",
      },
      {
        prompt:
          "Bir genç kökte X, korteks ile merkezî silindir arasındaki Kaspari bantlı tabaka; Y, onun hemen içindeki yan kök taslağı verebilen canlı katmandır. X ve Y hangisidir?",
        correct: "Endodermis ve periskl.",
        reason:
          "Kaspari bantlı seçici sınır endodermis; kökün endojen yan dallanmasında görev alan iç katman periskldır.",
        wrong: [
          ["Periskl ve endodermis.", "Konum ve görevleri ters dağıtır."],
          [
            "Epidermis ve kütikula.",
            "Dış yüzeyi ve hücresiz örtüyü kökün iç iki katmanı sayar.",
          ],
          [
            "Ksilem ve stoma.",
            "İletim dokusu ile gaz açıklığı verilen iç sınır ve yan kök başlangıcı değildir.",
          ],
          [
            "Kaliptra ve floem.",
            "Uç başlığı ve şeker iletim dokusu bu tanımları karşılamaz.",
          ],
        ],
        knowledge: [
          "Endodermis korteksin iç sınırıdır.",
          "Yan kök taslakları birçok tohumlu kökte periskldan gelişir.",
        ],
        strategy:
          "Kaspari bandı ve yan kök taslağı kanıtlarını ayrı ayrı eşleştir.",
        steps: [
          "X’te bantlı sınırı endodermis olarak tanı.",
          "Y’nin X’in iç tarafında olduğunu kullan.",
          "Yan kök taslağıyla Y’yi periskl olarak tamamla.",
        ],
        commonError:
          "Seçici zar sınırını yeni kök üreten katmanla aynı görev sanmak.",
        check: "İki ad hem yerlerini hem verilen işlevlerini karşılıyor.",
      },
      {
        prompt:
          "Olgun kökte12 birim boya yalnız hücre duvarlarından ilerleyebiliyor, canlı hücre zarını geçemiyor. Kaspari bandı sağlam ve başka kaçak yok. Boya apoplasttan merkezî silindire kaç birim ulaşır?",
        correct: "0 birim.",
        reason:
          "Sağlam Kaspari bandı duvar yolunu keser; zarı geçemeyen boya gereken hücresel geçişi yapamaz.",
        wrong: [
          [
            "12 birim.",
            "Sağlam bandı yok sayarak apoplastı doğrudan açık tünel sayar.",
          ],
          [
            "6 birim.",
            "Bölünme veya yarı geçirgenlik oranı verilmediği hâlde yarıya böler.",
          ],
          ["24 birim.", "Boyanın kaynaksız çoğaldığını varsayar."],
          [
            "Su geçebildiği için boyanın da tamamı geçmek zorundadır.",
            "Suya geçirgenlik zarı geçemeyen boya için aynı geçirgenlik demek değildir.",
          ],
        ],
        knowledge: [
          "Apoplast hücre duvarı ve hücre arası boşluk yoludur.",
          "Sağlam Kaspari bandı bu yolu kesip zar kontrolü gerektirir.",
        ],
        strategy:
          "İzleyicinin hangi sınırı geçemediğini bandın kestiği yolla birlikte izle.",
        steps: [
          "Boyanın duvarlarda ilerleyip zarı geçemediğini belirle.",
          "Sağlam bandın bu duvar yolunu kestiğini kullan.",
          "İzin verilmiş başka geçit olmadığından merkezî silindire0 birim yaz.",
        ],
        commonError:
          "Suyun geçiş yolunu bütün izleyiciler için koşulsuz açık saymak.",
        check:
          "12 birim başlangıcın hepsi engelin dışındadır; üretilen veya yok olan boya yok.",
      },
      {
        prompt:
          "A ve B kök deneylerinde12’şer birim, hücre zarını geçemeyen duvar izleyicisi veriliyor. İkisi de apoplasttan başlıyor. A’da Kaspari bandı sağlam; B’de yalnız bandı aşan sürekli bir deneysel duvar kaçağı açılıyor. Başka engel veya kayıp yok. A ve B için merkeze ulaşabilen miktarlar sırasıyla hangisidir?",
        correct: "0 ve12 birim.",
        reason:
          "A’da duvar yolu kesilir. B’de açıkça verilen kesintisiz duvar kaçağı, bu ideal deneyde izleyiciye geçit sağlar.",
        wrong: [
          [
            "12 ve0 birim.",
            "Sağlam engel ile açık kaçak etkileri ters çevrilmiştir.",
          ],
          [
            "6 ve6 birim.",
            "Her iki düzende yarım geçişi veren bir olasılık veya direnç hesabı yoktur.",
          ],
          [
            "0 ve0 birim; duvar kaçağı hiçbir şeyi değiştiremez.",
            "B’deki sürekli duvar yolu açık öncülünü yok sayar.",
          ],
          [
            "12 ve24 birim.",
            "A’nın engelini yok sayar, B’de başlangıç miktarından fazla izleyici üretir.",
          ],
        ],
        knowledge: [
          "Bir deneyde yalnız bir sınırın değiştirilmesi o sınırın katkısını araştırır.",
        ],
        strategy:
          "Her kökte aynı izleyiciyi, aynı başlangıç yolunu ve yalnız değişen bandı izle.",
        steps: [
          "A’da sağlam bandın duvar yolunu kapattığını kullan.",
          "B’de verilen kaçakla kesintisiz apoplast yolunu tanı.",
          "0/12 ile12/12’yi gerçek emilim hızı değil bu ideal geçiş sayımı olarak yaz.",
        ],
        commonError:
          "Deneysel bariyer hasarını normal kökün evrensel emilim yüzdesi sanmak.",
        check:
          "Her iki miktar kendi12 birim başlangıcını aşmıyor; tek değişken bant durumu.",
      },
      {
        prompt:
          "Zarı geçemeyen bir izleyici kökün dış çözeltisindedir. Deneyci onun simplasttan başlamasını istiyor; ilk hücreye zarla giriş dışında izin verilen bir yol yok. Kaspari bandı kesintili olsa bile hangi sonuç geçerlidir?",
        correct: "İlk zar geçilemediğinden simplast başlangıcı gerçekleşmez.",
        reason:
          "Simplast hücre sitoplazmaları yoludur; dışarıdan bu yola girmek için ilk zarın geçilmesi gerekir.",
        wrong: [
          [
            "Simplast hiçbir aşamada zar gerektirmez.",
            "Hücre içi yolu kullanmak için dış çözeltiden ilk giriş gereksinimi unutulmuştur.",
          ],
          [
            "Kaspari bandı kesintisi boyayı otomatik sitoplazmaya dönüştürür.",
            "Duvar kaçağı, zarı geçemeyen izleyicinin zar geçirgenliğini değiştirmez.",
          ],
          [
            "Bütün izleyiciler plasmodesmayı dış topraktan doğrudan kullanır.",
            "Plasmodesmalar komşu hücrelerin sitoplazmik bağlantılarıdır; dış toprağa açık başlangıç deliği değildir.",
          ],
          [
            "İlk zar geçilemese de verilen izleyici mutlaka ATP üretir.",
            "İzleyiciyle ATP üretimi arasında böyle bir öncül yoktur.",
          ],
        ],
        knowledge: [
          "Simplast sitoplazmaların plasmodesmalarla bağlı yoludur.",
          "Dış ortamdan ilk hücreye girişte zar kontrolü bulunur.",
        ],
        strategy: "Seçilen yolun adından önce o yola nasıl girileceğini sor.",
        steps: [
          "İzleyicinin başlangıçta hücre dışında olduğunu belirle.",
          "Simplastın hücre içinde başladığını kullan.",
          "İlk zar izleyiciyi geçirmediği için başlangıcın olmadığını seç.",
        ],
        commonError:
          "Simplastta hücreler arası geçişte her seferinde zar gerekmemesini, hiç zar gerekmemesi sanmak.",
        check:
          "Bandı değiştirmek ilk hücre zarının verilen geçirimsizliğini değiştirmiyor.",
      },
      {
        prompt:
          "Bir mineral iyonunun kök hücresine girişinde bir deneyde elektrokimyasal farkın yönünde kanal geçişi, başka deneyde ATP kullanan pompayla bağlantılı birikim gözleniyor. En uygun yorum hangisidir?",
        correct:
          "Mineral alımı, iyon ve koşula göre pasif veya aktif süreçler içerebilir.",
        reason:
          "Kanal boyunca uygun farkla geçiş ve ATP bağlantılı birikim farklı taşıma koşullarını gösterir.",
        wrong: [
          [
            "Bütün mineral girişi her durumda doğrudan ATP harcar.",
            "Fark yönünde kanal geçişi verilen pasif olasılığı yok sayar.",
          ],
          [
            "Mineraller zar proteinleriyle hiç ilişkili olamaz.",
            "Soruda kanal ve pompa bağlantısı açıkça verilmiştir.",
          ],
          [
            "Su da bütün durumlarda aynı iyon pompasıyla doğrudan pompalanır.",
            "Su ozmozu ile iyonların enerji bağlantısı aynı taşıma olayı değildir.",
          ],
          [
            "Aktif taşıma varsa kök canlı olmak zorunda değildir.",
            "ATP kullanan hücresel taşıma canlı hücresel düzenekle ilişkilidir.",
          ],
        ],
        knowledge: [
          "Pasif geçiş uygun elektrokimyasal fark yönünde olabilir.",
          "Aktif süreç enerji kullanımına veya oluşturulmuş gradyanlara bağlıdır.",
        ],
        strategy: "İki deneyin yön ve enerji kanıtlarını ayrı değerlendir.",
        steps: [
          "İlk deneyde uygun fark yönündeki kanal geçişini tanı.",
          "İkincide ATP ile ilişkili birikimi ayır.",
          "Koşula bağlı iki mekanizmayı kapsayan sonucu seç.",
        ],
        commonError:
          "Tek bir iyon örneğinden bütün mineraller için tek enerji kuralı çıkarmak.",
        check:
          "Yorum iki deneyi de açıklıyor ve suya ölçülmemiş pompa özelliği yüklemiyor.",
      },
      {
        prompt:
          "Genç kök hücresinin toplam su potansiyeli−0,4 MPa, toprak çözeltisininki−1,2 MPa. Zar suya geçirgen, diğer farklar ihmal ediliyor. O anda net suyun osmotik yönü hangisidir?",
        correct: "Kök hücresinden toprağa.",
        reason:
          "−0,4,−1,2’den yüksektir; net su daha yüksek potansiyelden daha düşüğe, hücreden toprağa geçer.",
        wrong: [
          [
            "Topraktan hücreye; çünkü bütün kökler her zaman su alır.",
            "Verilen potansiyellerin yönünü organın adıyla tersine çevirir.",
          ],
          [
            "Net geçiş yoktur; iki değer de negatiftir.",
            "Negatif olmaları eşit oldukları anlamına gelmez.",
          ],
          [
            "Su ancak ATP ile toprağa pompalanırsa çıkabilir.",
            "Verilen farkta osmotik net geçiş için doğrudan su pompası gerekmez.",
          ],
          [
            "Hücre potansiyeli−1,6 MPa’dır.",
            "İki ayrı ortamın toplamları birbirine eklenerek bir ortamın yeni potansiyeli bulunmaz.",
          ],
        ],
        knowledge: [
          "Su net olarak daha yüksek toplam su potansiyelinden daha düşüğe geçer.",
        ],
        strategy: "İki negatif toplamı sayı doğrusunda karşılaştır.",
        steps: [
          "Hücre−0,4 değerinin dış−1,2’den yüksek olduğunu belirle.",
          "Yüksekten düşüğe yönü hücre→toprak olarak yaz.",
          "Kökün her durumda su alma genellemesini kullanma.",
        ],
        commonError:
          "Toprakta sıvı su bulunmasını net su girişinin yeterli koşulu sanmak.",
        check:
          "İçerideki suyun çıkmasıyla başlangıçta verilen toplam potansiyel farkı azaltılabilir.",
      },
      {
        prompt:
          "Tipik iki genç kökün olgun enine kesitleri inceleniyor. X’te merkezde yıldız biçimli ksilem ve kollar arasında floem; Y’de belirgin merkezî öz çevresinde çok sayıda ksilem-floem grubu var. Okul anatomisi modelinde X ve Y için hangi eşleştirme uygundur?",
        correct: "X çift çenekli, Y tek çenekli kök örneğidir.",
        reason:
          "Verilen yıldız merkezli düzen tipik çift çenekli, belirgin öz çevresindeki çok sayıda grup tipik tek çenekli kökü destekler.",
        wrong: [
          [
            "X tek çenekli, Y çift çenekli köktür.",
            "Verilen tipik düzenler ters eşleştirilmiştir.",
          ],
          [
            "Y’de merkezî öz olduğundan endodermis bulunamaz.",
            "Tek çenekli tipik kökte de endodermis bulunur.",
          ],
          [
            "X’te floem bulunması onun mutlaka yaprak olduğunu kanıtlar.",
            "Floem kökte de bulunur; bir organı tek başına yaprak yapmaz.",
          ],
          [
            "Bütün bitki türlerinin kökü bu iki şekilden biriyle her yaşta tamamen aynıdır.",
            "Tipik genç okul kesitinden bütün yaş ve türler için koşulsuz kopya çıkarır.",
          ],
        ],
        knowledge: [
          "Tipik genç kök kesitlerinde ksilem-floem düzeni ve öz gelişimi birlikte kullanılır.",
        ],
        strategy:
          "Her kesitte merkezde ne bulunduğunu ve floemin ksileme göre yerini karşılaştır.",
        steps: [
          "X’in yıldız ksilem kollarını ve aradaki floemi tanı.",
          "Y’nin belirgin öz çevresindeki çok sayıda grubu ayır.",
          "Tipik çift/tek çenek eşleştirmesini koşullu biçimde seç.",
        ],
        commonError:
          "Tek bir doku varlığını organ veya çenek tipi için tek başına yeterli kanıt saymak.",
        check:
          "İki düzen de aynı olgunlaşma düzeyindeki tipik genç kök sınırıyla yorumlanıyor.",
      },
      {
        prompt:
          "Bir tohumlu bitkinin kökünde periskl hücreleri bölünüyor; taslak korteks ve epidermisi aşarak kendi kaliptrasıyla dışarı çıkıyor. Gözlenen olay nedir?",
        correct: "Endojen yan kök oluşumu.",
        reason:
          "Taslak mevcut kökün içindeki periskldan başlayıp dış dokuları aşarak yeni kök organı oluşturur.",
        wrong: [
          [
            "Epidermiste tek hücreli emici tüy uzaması.",
            "Soruda iç taslak, çoklu dokular ve kendi kaliptrası vardır.",
          ],
          [
            "Yaprak epidermisinde stoma açılması.",
            "Kökün iç dokusunda yeni organ oluşumu, bekçi hücresi turgor değişimi değildir.",
          ],
          [
            "Sadece kütikula kalınlaşması.",
            "Hücresiz örtü birikimi kendi kaliptrası olan organ üretmez.",
          ],
          [
            "Atmosferde çiy oluşumu.",
            "Gözlenen gelişim doku bölünmesi ve kök organıdır; yoğuşma değildir.",
          ],
        ],
        knowledge: [
          "Endojen, organın iç tarafından başlayan gelişimi anlatır.",
          "Periskl birçok tohumlu kökte yan kök üretimine katılır.",
        ],
        strategy:
          "Taslağın başladığı katmanı ve oluşan yapının organ olup olmadığını belirle.",
        steps: [
          "Başlangıcı periskl olarak işaretle.",
          "Korteks ve epidermisi aşan içten dışa gelişimi izle.",
          "Kendi kaliptrası olan yeni organı yan kök olarak adlandır.",
        ],
        commonError:
          "Kökteki bütün ince uzantıları epidermis tüyü olarak adlandırmak.",
        check:
          "Endojen tanımı gözlenen iç başlangıçla, yan kök adı yeni organla uyuşuyor.",
      },
      {
        prompt:
          "A ortaklığında mantar hifleri köke bağlıdır ve mineral alımına katkı sağlar; bitki mantara organik karbon verir. B’de uygun bakteriler kök nodülünde atmosferik N₂’yi bağlar. A ve B hangisidir?",
        correct: "A mikoriza, B nodül ortaklığıdır.",
        reason:
          "Mantar-kök birlikteliği mikoriza; uygun azot bağlayıcı bakterili kök yapısı nodül ortaklığıdır.",
        wrong: [
          [
            "A nodül, B mikorizadır.",
            "Mantar ve bakterinin verilen görevleri ters eşleştirilmiştir.",
          ],
          [
            "A’da mantar bitki yerine mutlaka fotosentez yapar.",
            "Mantara bitkiden organik karbon verildiği öncülünü ve mantar beslenmesini ters yorumlar.",
          ],
          [
            "B’de bitki hücreleri bakterisiz olarak N₂’yi bağlamıştır.",
            "Atmosferik azotu bağlayan uygun bakteriler açıkça verilmiştir.",
          ],
          [
            "İki ortaklık aynı hücre ve aynı mekanizmadan oluşur.",
            "Ortak canlılar ve mineral/azot katkısı farklıdır.",
          ],
        ],
        knowledge: [
          "Mikoriza mantar ve bitki kökü birlikteliğidir.",
          "Bazı nodüllerde uygun bakteriler atmosferik azotu bağlar.",
        ],
        strategy:
          "Ortak canlının kimliğini ve sağladığı madde katkısını birlikte eşleştir.",
        steps: [
          "A’daki hifleri mantar kökenli olarak tanı.",
          "B’deki bakteri ve N₂ bağlama kanıtını ayır.",
          "A mikoriza, B nodül eşleştirmesini seç.",
        ],
        commonError:
          "Her yararlı kök ortaklığını aynı canlı ve aynı azot mekanizması sanmak.",
        check:
          "Bitkiden organik karbon ve ortaklardan gelen farklı katkılar birlikte açıklanıyor.",
      },
      {
        prompt:
          "Kök ortamında O₂ azaltılıp ışık, sıcaklık ve dış mineral derişimi aynı tutuluyor. Araştırılan iyonun birikimi ATP kullanan bir taşıma basamağına bağlı. Hangi sonuç en temkinli mekanistik beklentidir?",
        correct:
          "Oksijenli solunumun enerji katkısı azalırsa ATP bağlantılı birikim zorlaşabilir.",
        reason:
          "Oksijen, enerji üretimi üzerinden ATP gerektiren basamağı etkileyebilir; bütün pasif alımların anında sıfırlandığı söylenmez.",
        wrong: [
          [
            "Bütün iyonların her tür girişi anında ve kesin sıfırlanır.",
            "Pasif yollar, mevcut enerji ve iyon farkları verilmeden kapsamı aşar.",
          ],
          [
            "Dışarıda su varsa O₂ hiçbir hücresel süreci etkileyemez.",
            "Su bulunması oksijenli solunumdaki O₂ gereksinimini ortadan kaldırmaz.",
          ],
          [
            "O₂ azaltılması bütün kök hücrelerinin kloroplastını artırır.",
            "Böyle bir organel artışı ölçümü veya mekanizması verilmemiştir.",
          ],
          [
            "ATP kullanan taşımanın enerji durumuyla hiçbir ilişkisi yoktur.",
            "Verilen ATP bağımlılığıyla doğrudan çelişir.",
          ],
        ],
        knowledge: [
          "Canlı kök hücreleri solunumla enerji sağlar.",
          "Bir taşıma basamağının ATP gerektirmesi enerji durumuyla ilişkisini kurar.",
        ],
        strategy:
          "Deneyin değiştirdiği gazı önce enerji üretimine, sonra verilen taşıma basamağına bağla.",
        steps: [
          "Değişen girdinin kök ortamındaki O₂ olduğunu belirle.",
          "ATP kullanan birikimin enerji üretimiyle bağlantısını kur.",
          "Olası zorlaşmayı söyle; ölçülmemiş bütün girişlerin sıfırlanmasını ekleme.",
        ],
        commonError:
          "Tek bir enerji bağlantılı mekanizmadan tüm kök alımı için anlık kesin sıfır sonucu çıkarmak.",
        check:
          "Seçenek, verilen ATP bağımlılığını açıklıyor; korunmuş dış derişimi değiştirmiyor.",
      },
    ],
  },
];
export const forge023BiologyTopics: Record<string, string> = Object.fromEntries(
  units023.map((u) => [u.id, u.topic]),
);
export const forge023BiologyGuides: LessonGuide[] = units023.map(
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
const positions023 = [
  [2, 4, 1, 0, 3, 1, 3, 0, 4, 2, 4, 0, 2, 3, 1, 0, 2, 4],
  [3, 1, 4, 0, 2, 2, 4, 1, 3, 0, 1, 3, 0, 4, 2, 4, 0, 2, 1, 3],
];
export const forge023BiologyLessons: Lesson[] = units023.map((u, j) => ({
  id: u.id,
  subjectId: "ayt-biyoloji",
  title: txt(u.title),
  minutes: u.minutes,
  objectives: u.objectives.map(txt),
  source: txt(u.source),
  tags: [u.id, "forge023", "kaynakli-anlatim"],
  body: u.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: u.items.map((item, i): Question => {
    const answer = positions023[j][i];
    const options = item.wrong.map(([text]) => text),
      optionReasons = item.wrong.map(([, reason]) => reason);
    options.splice(answer, 0, item.correct);
    optionReasons.splice(answer, 0, item.reason);
    return {
      id: `f023-bio-${u.id}-${i + 1}`,
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
