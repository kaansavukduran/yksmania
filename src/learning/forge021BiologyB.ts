import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

const bounded021 = (v: number, max: number) =>
  Number.isFinite(v) && v >= 0 && v <= max;
export const photoConditions021 = {
  cool: { label: "Serin koşul", capacity: 30 },
  suitable: { label: "Uygun koşul", capacity: 80 },
  hot: { label: "Isı stresi", capacity: 15 },
} as const;
/** A controlled fictional capacity experiment; all capacities share the same relative rate unit. */
export function photoFactors021(
  light: number,
  carbon: number,
  condition: keyof typeof photoConditions021,
  respiration: number,
) {
  if (
    !bounded021(light, 100) ||
    !bounded021(carbon, 100) ||
    !Object.hasOwn(photoConditions021, condition) ||
    !bounded021(respiration, 30)
  )
    throw new RangeError("PHOTO_FACTORS021");
  const heat = photoConditions021[condition].capacity;
  const gross = Math.min(light, carbon, heat);
  const limiting = (
    [
      ["light", light],
      ["carbon", carbon],
      ["heat", heat],
    ] as const
  )
    .filter(([, v]) => v === gross)
    .map(([key]) => key);
  return {
    light,
    carbon,
    condition,
    respiration,
    heat,
    gross,
    net: gross - respiration,
    limiting,
    balanced: gross === respiration,
  };
}
/** Amounts are mol N, not counts of multi-atom molecules; two aerobic nitrification steps only. */
export function nitrification021(
  initial: number,
  first: number,
  second: number,
) {
  if (
    ![initial, first, second].every((v) => bounded021(v, 10)) ||
    first > initial ||
    second > first
  )
    throw new RangeError("NITRIFICATION021");
  return {
    initial,
    first,
    second,
    ammonium: initial - first,
    nitrite: first - second,
    nitrate: second,
    oxygen: 1.5 * first + 0.5 * second,
    nitrogenTotal: initial,
    oxygenFirst: 1.5 * first,
    oxygenSecond: 0.5 * second,
  };
}
export const aerobicStages021 = {
  glycolysis: "Glikoliz",
  link: "Piruvatın oksidasyonu",
  krebs: "Krebs döngüsü",
  ets: "ETS ve ATP sentaz",
} as const;
/** Canonical complete glucose oxidation; P/O=2.5 and1.5, cytosolic shuttle choice changes two NADH equivalents. Production totals are not remaining pool sizes. */
export function aerobicRespiration021(
  glucose: number,
  stage: keyof typeof aerobicStages021,
  shuttle: "malate" | "glycerol",
  oxygenAvailable: boolean,
) {
  if (
    !Number.isInteger(glucose) ||
    !bounded021(glucose, 5) ||
    !Object.hasOwn(aerobicStages021, stage) ||
    !["malate", "glycerol"].includes(shuttle) ||
    typeof oxygenAvailable !== "boolean"
  )
    throw new RangeError("AEROBIC021");
  const index = Object.keys(aerobicStages021).indexOf(stage);
  const cumulative =
    index === 0
      ? { carbonDioxide: 0, nadh: 2, fadh2: 0, substrate: 2 }
      : index === 1
        ? { carbonDioxide: 2, nadh: 4, fadh2: 0, substrate: 2 }
        : { carbonDioxide: 6, nadh: 10, fadh2: 2, substrate: 4 };
  const oxidativePerGlucose = shuttle === "malate" ? 28 : 26;
  const sustained = oxygenAvailable && glucose > 0;
  // An ETS interruption is not a simulation of unlimited upstream turnover without NAD+ regeneration.
  const oxidative =
    stage === "ets" && sustained ? oxidativePerGlucose * glucose : 0;
  return {
    glucose,
    stage,
    shuttle,
    oxygenAvailable,
    sustained,
    index,
    pyruvate: 2 * glucose,
    investment: 2 * glucose,
    glycolysisProduced: 4 * glucose,
    glycolysisNet: 2 * glucose,
    krebsTurns: 2 * glucose,
    carbonDioxide: cumulative.carbonDioxide * glucose,
    nadhProduced: cumulative.nadh * glucose,
    fadh2Produced: cumulative.fadh2 * glucose,
    substrate: cumulative.substrate * glucose,
    oxidative,
    theoreticalTotal: (4 + oxidativePerGlucose) * glucose,
    oxygenForCompleteOxidation: 6 * glucose,
    totalShown: stage === "ets" ? null : cumulative.substrate * glucose,
    canClaimComplete: stage === "ets" && oxygenAvailable,
    location:
      stage === "glycolysis"
        ? "Sitozol"
        : stage === "ets"
          ? "Mitokondri iç zarı"
          : "Mitokondri matriksi",
  };
}
export const anaerobicAcceptors021 = {
  nitrate: {
    label: "Nitrat → N₂",
    symbol: "NO₃⁻",
    product: "N₂",
    electrons: 5,
    productRatio: 0.5,
  },
  sulfate: {
    label: "Sülfat → sülfürlü ürün",
    symbol: "SO₄²⁻",
    product: "H₂S / HS⁻",
    electrons: 8,
    productRatio: 1,
  },
  iron: {
    label: "Demir(III) → demir(II)",
    symbol: "Fe³⁺",
    product: "Fe²⁺",
    electrons: 1,
    productRatio: 1,
  },
  carbon: {
    label: "CO₂ → metan",
    symbol: "CO₂",
    product: "CH₄",
    electrons: 8,
    productRatio: 1,
  },
} as const;
/** Specified reduction half-reaction capacity, not a complete ATP/yield/pH or cell-growth simulation. */
export function anaerobicCapacity021(
  electrons: number,
  acceptor: number,
  kind: keyof typeof anaerobicAcceptors021,
) {
  if (
    !bounded021(electrons, 40) ||
    !bounded021(acceptor, 10) ||
    !Object.hasOwn(anaerobicAcceptors021, kind)
  )
    throw new RangeError("ANAEROBIC021");
  const d = anaerobicAcceptors021[kind];
  const capacity = electrons / d.electrons;
  if (electrons > 0 && acceptor > 0 && capacity === 0)
    throw new RangeError("PRECISION021");
  const processed = Math.min(acceptor, capacity);
  const used = processed * d.electrons;
  const product = processed * d.productRatio;
  if (
    processed > 0 &&
    (used === 0 || product === 0 || used / electrons > 1 + 1e-12)
  )
    throw new RangeError("PRECISION021");
  return {
    electrons,
    acceptor,
    kind,
    processed,
    electronsUsed: used,
    electronsLeft: Math.max(0, electrons - used),
    acceptorLeft: Math.max(0, acceptor - processed),
    product,
    productName: d.product,
    perAcceptor: d.electrons,
    limitedBy:
      electrons === acceptor * d.electrons
        ? "both"
        : electrons < acceptor * d.electrons
          ? "electrons"
          : "acceptor",
  };
}

interface Guidance021 {
  knowledge: string[];
  strategy: string;
  steps: string[];
  optionReasons: string[];
  commonError: string;
  check: string;
}
interface Item021 {
  prompt: string;
  correct: string;
  wrong: [string, string][];
  knowledge: string[];
  strategy: string;
  steps: string[];
  reason: string;
  commonError: string;
  check: string;
}
interface Unit021 {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: Item021[];
  source: string;
}
const data: Unit021[] = [
  {
    id: "fotosentez-hiz-faktorleri",
    topic: "detail-336",
    title: "Fotosentezin hızını belirleyen çevre ve genetik faktörler",
    minutes: 85,
    objectives: [
      "Brüt fotosentezi, solunumu ve dışarıya verilen net gazı birimleriyle ayır.",
      "Sınırlayıcı faktörün deney sırasında nasıl değiştiğini açıkla.",
      "Işık, CO₂, sıcaklık ve yaprak özelliklerini kontrollü verilerle karşılaştır.",
      "Spektrum, sera ve gaz tutucu deneylerinden kanıtın izin verdiği sonucu çıkar.",
    ],
    sections: [
      {
        title: "Bir bitkinin üretimini nasıl ölçeriz?",
        paragraphs: [
          "Bir su bitkisinin yaprağından çıkan kabarcıklar, ışık altında neler olduğunu merak ettirir. Fotosentezde karbon organik moleküllere katılır; oksijenli fotosentezde suyun parçalanmasıyla O₂ açığa çıkar. Hız, belirli bir süredeki değişimdir. Örneğin dakikada oluşan mikromol O₂ ile bir saatte oluşan toplam O₂ aynı nicelik değildir: ikincisini süreye bölmeden hızları karşılaştıramazsın.",
          "Ölçümün hangi örneğe ait olduğu da önemlidir. Bir bütün bitkinin, bir yaprağın, birim yaprak alanının veya birim klorofilin üretim hızı farklı paydalara sahiptir. İki bitkiden birinin daha çok yaprağı varsa toplam üretimi daha yüksek olabilir; bundan tek bir hücrenin daha hızlı çalıştığı zorunlu çıkmaz. Önce miktar, zaman ve karşılaştırılan örnek büyüklüğünü yaz.",
        ],
      },
      {
        title: "Brüt üretim ile dışarı çıkan net gaz",
        paragraphs: [
          "Fotosentez yapan canlı bir bitki hücresi aynı zamanda hücresel solunum da yapabilir. Fotosentezin oluşturduğu toplam O₂ miktarına brüt üretim diyelim; solunum O₂ tüketir. Aynı zaman aralığında ve aynı gaz birimiyle basitleştirilmiş denge, net O₂ çıkışı = brüt O₂ üretimi − solunumun O₂ tüketimi olur. Dışarıda gördüğün net değer bu iki olayın farkıdır.",
          "Örneğin brüt üretim 10, solunum 4 mikromol/dakika ise dışarı net 6 mikromol/dakika O₂ çıkar. CO₂ için yön tersinden düşünülür: fotosentez CO₂ tüketirken solunum CO₂ oluşturur. Gerçek ölçümde gazların çözünmesi, fotorespirasyon, sıcaklık ve başka süreçler de dikkate alınır; basit iki terimli denklemi kullanacağımız sorularda bu etkilerin ihmal edildiği açıkça verilir.",
        ],
      },
      {
        title: "Net sıfır, iki olayın da durması değildir",
        paragraphs: [
          "Işık giderek artırıldığında fotosentezin O₂ üretimi, belli bir noktada solunumun O₂ tüketimine eşit olabilir. Dışarı net O₂ çıkışı sıfırdır; fakat içeride hem üretim hem tüketim sürer. Bu dengeye ışık kompanzasyon noktası denir. Yaprağın karanlıkta olması veya bütün enzimlerinin durmasıyla aynı durum değildir.",
          "Işık bu noktanın altında ama sıfırdan büyükse fotosentez yine gerçekleşebilir; solunum daha hızlı olduğundan yaprak dışarıdan net O₂ alabilir ve net CO₂ verebilir. Bu yüzden “gündüz bitki her zaman dışarı O₂ verir” genellemesi doğru değildir. Günün saati yerine verilen üretim ve tüketim hızlarını karşılaştır.",
        ],
      },
      {
        title: "Minimum yasasını aynı ölçekte oku",
        paragraphs: [
          "Bir üretim hattında bol ışık bulunması, CO₂ yokluğunu gidermez. Fotosentezin farklı basamakları farklı gereksinimlere bağlıdır; göreli olarak en yetersiz olan gereksinim bütün yolun hızını sınırlayabilir. Minimum yasası bu darboğazı anlatır. Buradaki en az, farklı birimlerde yazılmış en küçük rakam değildir.",
          "400 ppm CO₂ ile 25 °C sıcaklığın sayısal olarak hangisinin küçük olduğunu seçemezsin. Önce bu koşulların bitkinin gereksinimini karşılama düzeyini veya aynı ölçekte deneysel üretim kapasitelerini bilmek gerekir. Etkileşimli deneyde ışık, CO₂ ve sıcaklık için aynı göreli hız biriminde kapasite verilir; en küçük kapasitenin seçilmesi yalnız bu açık model içinde anlamlıdır.",
        ],
      },
      {
        title: "Bir sınır kalkınca sıradaki sınır görünür",
        paragraphs: [
          "Işık kapasitesi 30, CO₂ kapasitesi 80 ve sıcaklık koşulunun kapasitesi 60 birim/dakika olsun. Modelde brüt hız 30 olur. Işık kapasitesini 70’e çıkarmak üretimi 70’e değil 60’a ulaştırır: artık sıcaklık koşulu sınırdır. Işığın etkisi olmadığı sonucu değil, darboğazın yer değiştirdiği sonucu çıkar.",
          "İki kapasite aynı en düşük değerdeyse birlikte sınırlama vardır. Yalnız birini artırınca hız hiç değişmeyebilir; öteki aynı düzeyde kalır. Kontrollü deneyde bir değişkeni artırdığında sonuç görmemek, o değişkenin hiçbir koşulda önemsiz olduğunu kanıtlamaz. Değişkenler arasındaki ilişkiyi önceki ve sonraki koşullarla birlikte açıkla.",
        ],
      },
      {
        title: "Işık artışı ve doygunluk platosu",
        paragraphs: [
          "Düşük ışık altında daha çok kullanılabilir foton gelmesi ışığa bağlı tepkimeleri destekler; fotosentez hızı artabilir. Ancak karbon özümleme kapasitesi, CO₂ girişi ve başka gereksinimler sınırlı olduğundan artış sonsuza kadar sürmez. Grafikte yükselen kısmın ardından görülen plato, artık başka bir sınırlayıcının belirginleştiğini gösterir.",
          "Bu standart plato grafiği, aşırı ışığın hiçbir zaman zarar vermediği anlamına gelmez. Çok yüksek ışık, özellikle su ve sıcaklık stresiyle birleşince fotoinhibisyon ve doku hasarıyla hızı düşürebilir. Önce grafiğin kapsadığı aralığı oku; verilen sınırlı aralığı bütün ışık düzeylerine uzatma. Yaprağa ulaşan ışık, lambanın gücü kadar uzaklık ve gölgelenmeye de bağlıdır.",
        ],
      },
      {
        title: "Işığın rengi neden önemlidir?",
        paragraphs: [
          "Pigmentler her dalga boyunu aynı verimle soğurmaz. Yeşil bitkilerin klorofilleri mavi-mor ve kırmızı bölgelerde güçlü soğurma gösterirken yeşil ışığın önemli bir bölümünü yansıtır veya geçirir. Yardımcı pigmentler de ışığın kullanılmasına katkı sağlar. Bu nedenle eşit ve tanımlı aydınlatma koşullarında farklı renklerin üretim hızları farklı olabilir.",
          "Yeşil ışıkta fotosentez mutlaka sıfır değildir. Dalga boyu ile hız eğrisi kullanılan canlıya, pigmentlere ve ölçüm düzenine bağlıdır. Eşit enerji akısı ile eşit foton akısı da aynı deney koşulu değildir. Okul grafiğinde mavi ve kırmızıdaki yüksek değerleri bu bağlamla yorumla; bütün fototrofları tek bir renk sırasına mahkûm etme.",
        ],
      },
      {
        title: "Engelmann deneyinde bakteriler neyi gösterir?",
        paragraphs: [
          "Engelmann deneyinin temel fikri, ipliksi bir algin üzerine ayrılmış renklerde ışık düşürmek ve O₂ kullanan bakterilerin nerede toplandığını gözlemlemektir. Daha çok O₂ oluşan bölgeler bakteriler için uygun koşul sağlar. Mavi-mor ve kırmızı bölgelerde yoğunlaşma, algin o bölgelerde daha güçlü oksijen üretmesiyle ilişkilendirilir.",
          "Bakteriler ışığı fotosentez yapmak için kullanan algin yerine geçmez; O₂ dağılımının dolaylı göstergesidir. Bu çıkarım için diğer koşulların uygun ve bakterilerin tepkisinin O₂ ile ilişkili olması gerekir. Bir noktada çok bakteri görmen o noktanın kesin sıcaklığını, algin gen dizisini veya bütün moleküllerin sayısını vermez. Gözlem ile onun desteklediği mekanizmayı ayrı cümlelerle kur.",
        ],
      },
      {
        title: "Sıcaklık hem hızı hem yapıyı etkiler",
        paragraphs: [
          "Fotosentezin tepkimeleri enzimlerle yürütülür. Uygun aralıkta sıcaklık artışı moleküler hareketi ve bazı tepkimelerin hızını artırabilir. Ancak aşırı sıcaklık enzimleri, zarları ve su dengesini olumsuz etkiler. Bu yüzden sıcaklık–hız grafiği genellikle bir optimuma yükselip ardından düşer; ışık doygunluğu platosuyla aynı şekil olmak zorunda değildir.",
          "Optimum ve hasar sıcaklığı bütün türler için değişmez 35 °C ya da 40 °C değildir. Tür, alışma koşulu, su durumu ve CO₂ ortamı etkili olabilir. Düşük ışıkta sıcaklığı artırmanın etkisi sınırlı kalırken yeterli ışıkta belirginleşebilir. Etkileşimli modelin serin, uygun ve ısı stresi kapasiteleri gerçek tür için tedavi veya yetiştirme reçetesi değil, karşılaştırma verisidir.",
        ],
      },
      {
        title: "CO₂ karbon kaynağıdır; gaz tutucu ayrı değişkendir",
        paragraphs: [
          "CO₂, karbon özümleme tepkimelerinde organik molekülün karbon iskeletine katılır. Diğer gereksinimler yeterliyse CO₂’nin artırılması hızı belirli bir aralıkta artırabilir; sonra başka gereksinimler sınır olur. Havadaki CO₂, stoma ve yaprak içi boşluklar üzerinden fotosentez yapan hücrelere ulaşır; dış derişim ile hücrenin gerçekten kullanabildiği miktar aynı şey değildir.",
          "KOH, NaOH ve uygun hidroksit çözeltileri CO₂ tutucu olarak düzenekte kullanılabilir. CO₂ azaldığında fotosentez olumsuz etkilenebilir; fakat kimyasalı canlıya doğrudan eklemenin pH ve hasar gibi başka etkileri de vardır. Bir içeceğin CO₂ taşıması onu evrensel bitki besini yapmaz. Güvenilir soruda gaz tutucu canlıdan ayrı tutulur, diğer koşullar sabitlenir ve amaç açık verilir.",
        ],
      },
      {
        title: "Su, stoma ve mineral desteği",
        paragraphs: [
          "Su oksijenli fotosentezde elektron kaynağıdır; ayrıca yaprak dokusunun işlevini sürdürür. Su kaybı arttığında stomaların kapanması CO₂ girişini azaltabilir. Böylece su yetersizliği yalnız “tepkimede su eksildi” yoluyla değil, gaz alışverişini değiştirerek de üretimi sınırlayabilir. Stoma açılıp kapanması, su korunması ile karbon kazanımı arasında bir denge kurar.",
          "Klorofil yapısında magnezyum ve azot bulunur; enzimler ve başka hücresel yapılar için de mineral desteği gerekir. Bir eksiklik pigment ve doku gelişimini etkileyebilir. Her sararmanın tek bir mineral eksikliğini kesin kanıtladığı sonucu çıkarılmaz. Verilen kontrollü karşılaştırmada hangi besin, su veya gazın değiştirildiğini belirle; gözlenen fenotipten tek başına kesin gen veya hastalık tanısı koyma.",
        ],
      },
      {
        title: "Genetik kapasite çevreyle birlikte görünür",
        paragraphs: [
          "Yaprak sayısı ve yüzeyi, stoma yoğunluğu ve yerleşimi, pigment üretimi ve enzimlerin özellikleri kalıtsal etkilere sahip olabilir. Bu özellikler ışığın yakalanmasını, gazın içeri alınmasını ve karbonun işlenmesini etkiler. Aynı çevrede farklı genotiplerin farklı üretim göstermesi, bu kalıtsal kapasitenin araştırılmasına fırsat verir.",
          "Bununla birlikte yaprak sayısı, pigment miktarı ve stoma davranışı çevre ve gelişme koşullarından da etkilenir. Genetik ve çevresel faktörleri bütünüyle ilişkisiz iki kutu gibi düşünme. Aynı bitkinin gölgede ve ışıkta farklı büyümesi mutlaka DNA dizisinin değiştiğini göstermez. Genetik etkiyi sınamak için karşılaştırılan çevre, yaş ve ölçüm paydası gibi değişkenler kontrol edilir.",
        ],
      },
      {
        title: "Klorofil artışı hangi hızı artırabilir?",
        paragraphs: [
          "Işığı yakalama kapasitesi sınırlıyken daha çok işlevsel pigment, toplam ışık yakalamaya ve üretime katkı sağlayabilir. Fakat bütün bir yaprağın pigmentiyle birlikte yaprak alanı da değişiyorsa toplam üretim ile birim alan başına üretim farklı yorumlanır. Ürün miktarı/zaman artıyorsa o paydalarla tanımlanan hız da artmıştır.",
          "Klorofil miktarı arttı diye sınırsız biçimde hızlanan bir eğri çizmek doğru değildir; CO₂ ve enzim kapasitesi sınırlayabilir. “Hız değişmez ama dakikadaki ürün artar” ifadesinde ise hangi hızın hangi payda üzerinden tanımlandığı açıklanmalıdır. Soruda birim klorofil başına hız sabitken toplam klorofil iki kat olursa toplam üretim iki kat olabilir; bu iki farklı ölçüm çelişmez.",
        ],
      },
      {
        title: "Serayı birden çok ölçümle yönet",
        paragraphs: [
          "Yapay aydınlatma, doğal ışığın yetersiz olduğu dönemlerde fotosentetik foton sağlamaya yardım eder. Gün uzunluğu, bulutluluk, örtü malzemesi, gölgelenme ve bitki yoğunluğu yaprağa ulaşan ışığı değiştirir. Doğru ışık rengi kadar günlük süre ve toplam ışık girdisi de önemlidir; ışığı artırırken su, ısı ve CO₂ koşullarını izlemek gerekir.",
          "Yüksek elektrik girdisi tek başına yüksek verim garantisi değildir. Aşırı ışık ya da ısı enerji israfına ve strese yol açabilir. Sera örneğinde öğrenci önce mevcut darboğazı ölçer, bir değişiklik önerir ve sonucu kontrol grubuyla kıyaslar. Belirli bir bölge için verilmiş güneşlenme süresi eşiğini bütün türlere uygulanacak kesin yasa saymaz; amaç mekanizmaya dayalı karar vermektir.",
        ],
      },
      {
        title: "Bir deney sonucunu nedenleriyle savun",
        paragraphs: [
          "İki özdeş bitki grubunda yalnız CO₂ düzeyi değiştiriliyorsa, yaş, yaprak alanı, ışık, su, sıcaklık ve ölçüm süresi mümkün olduğunca eşit tutulur. Tek ölçüm yerine tekrarlar ve uygun kontrol sonuçların güvenilirliğini artırır. Net gaz üzerinden brüt üretim hesaplanacaksa solunum için ek veri veya açık bir kabul gerekir.",
          "Son cümlede yalnız gördüğün artışı yazmak yerine şu zinciri kur: değişen koşul → etkilenen basamak → ölçülen nicelik → çıkarımın sınırı. Örneğin “CO₂ artınca net üretim arttı; bu aralıkta karbon girişi sınırlayıcıydı” demek, “CO₂ her koşulda bütün bitkileri aynı oranda hızlandırır” demekten daha güçlü ve daha doğrudur. Etkileşimde önce tahminini yaz, sonra sayısal kanıtla karşılaştır.",
        ],
      },
    ],
    examples: [
      {
        title: "Dışarıdaki altı, içerideki toplam değildir",
        prompt:
          "Aynı yaprakta iki terimli O₂ dengesi geçerli. Net O₂ çıkışı 6, solunumun O₂ tüketimi 4 mikromol/dakika. Brüt üretim kaçtır?",
        strategy: "Net denklemindeki tüketimi öteki tarafa ekle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Net=P−R olduğundan P=net+R olur.",
          },
          {
            label: "2. adım",
            explanation: "P=6+4=10 mikromol/dakika hesaplanır.",
          },
          {
            label: "3. adım",
            explanation:
              "10 üretilip 4 tüketilince dışarı 6 kalması sonucu doğrular.",
          },
        ],
        answer: "10 mikromol/dakika",
        check: "Bütün sayılar aynı gaz ve aynı zaman birimindedir.",
        pitfall: "Net değeri brüt sanmak solunumu yok sayar.",
      },
      {
        title: "Darboğaz yer değiştirir",
        prompt:
          "Aynı göreli hız birimindeki kapasiteler: ışık 30, CO₂ 80, sıcaklık 60. Brüt hız en küçük kapasitedir. Işık 70 yapılınca başlangıç ve son hız nedir?",
        strategy: "Önceki ve sonraki üç kapasiteyi ayrı karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation: "Başlangıçta min(30,80,60)=30 bulunur.",
          },
          {
            label: "2. adım",
            explanation: "Sonra min(70,80,60)=60 olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Işık sınırı kalkmış, sıcaklık koşulu yeni sınır olmuştur.",
          },
        ],
        answer: "30 → 60 birim/dakika",
        check: "Son hız bütün kapasitelere eşit veya küçüktür.",
        pitfall: "Işıktaki 40 artışı üretime körce 40 ekleme.",
      },
      {
        title: "Fotosentez var, net çıkış yok",
        prompt:
          "Basit O₂ modelinde brüt fotosentez 8, solunum 10 mikromol/dakika; diğer etkiler yok. Net gaz yönünü bul.",
        strategy: "Üretimden tüketimi çıkar; negatif işaretin yönünü açıkla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Net=8−10=−2 mikromol/dakika.",
          },
          {
            label: "2. adım",
            explanation:
              "Eksi değer dışarı çıkış yerine net O₂ alımını gösterir.",
          },
          {
            label: "3. adım",
            explanation: "Brüt 8 pozitif olduğu için fotosentez durmamıştır.",
          },
        ],
        answer: "Dakikada 2 mikromol net O₂ alınır.",
        check: "−2+10=8 geri kontrolü yapılır.",
        pitfall: "Dışarı O₂ vermemeyi fotosentez yokluğu sanma.",
      },
      {
        title: "Yeşil düşük ama sıfır değil",
        prompt:
          "Eşit foton akısı ve eşit örneklerde ölçülen brüt hızlar: mavi 12, yeşil 4, kırmızı 10 mikromol/dakika. Sıralama ve yeşil için çıkarım nedir?",
        strategy: "Verilen ölçümü sırala; evrensel tür kuralına genişletme.",
        steps: [
          {
            label: "1. adım",
            explanation: "12>10>4 olduğundan mavi>kırmızı>yeşil.",
          },
          {
            label: "2. adım",
            explanation:
              "Yeşilin 4 değeri sıfırdan büyüktür; bu örnekte fotosentez vardır.",
          },
          {
            label: "3. adım",
            explanation:
              "Sonuç verilen pigment/örnek/ışık koşuluyla sınırlıdır.",
          },
        ],
        answer: "Mavi > kırmızı > yeşil; yeşilde üretim sürer.",
        check: "Karşılaştırma aynı foton akısında yapılmıştır.",
        pitfall: "Yeşil ışığın tamamının yansıdığını varsayma.",
      },
      {
        title: "Toplam ile alan başına hız",
        prompt:
          "A yaprağı 10 cm², B yaprağı 20 cm². İkisinin de alan başına brüt hızı 2 mikromol/(cm²·dakika). Toplam hızlar nedir?",
        strategy: "Alan başına değeri alanla çarp.",
        steps: [
          {
            label: "1. adım",
            explanation: "A için 10×2=20 mikromol/dakika.",
          },
          {
            label: "2. adım",
            explanation: "B için 20×2=40 mikromol/dakika.",
          },
          {
            label: "3. adım",
            explanation: "Toplam B iki katken alan başına hızlar eşittir.",
          },
        ],
        answer: "A 20, B 40 mikromol/dakika",
        check: "cm² çarpanı paydadaki cm² ile sadeleşir.",
        pitfall: "Toplamın artışını tek hücrede zorunlu hızlanma sayma.",
      },
      {
        title: "Birlikte sınırlayan iki koşul",
        prompt:
          "Işık ve CO₂ kapasiteleri 40, sıcaklık 80 birim/dakika. Hız minimumdur. Önce yalnız ışık 70, sonra CO₂ 60 yapılınca hızlar?",
        strategy: "Her değişimden sonra minimumu yeniden bul.",
        steps: [
          {
            label: "1. adım",
            explanation: "Başlangıç min(40,40,80)=40.",
          },
          {
            label: "2. adım",
            explanation:
              "Yalnız ışık 70 olunca min(70,40,80)=40; CO₂ hâlâ sınırdır.",
          },
          {
            label: "3. adım",
            explanation: "CO₂ 60 olunca min(70,60,80)=60.",
          },
        ],
        answer: "40 → 40 → 60",
        check: "Son durumda ışık kapasitesi 70 olsa da brüt 60 olur.",
        pitfall: "İlk değişimin etkisizliğinden ışık önemsiz sonucu çıkarma.",
      },
    ],
    recall: [
      {
        prompt: "Net O₂ sıfırken fotosentez ve solunum nasıl sürebilir?",
        answer:
          "Aynı aralıkta üretilen ve tüketilen O₂ eşitse net fark sıfırdır; iki olayın da sıfır olması gerekmez.",
      },
      {
        prompt:
          "Minimum yasasında neden ppm ile °C’nin rakamlarını doğrudan kıyaslayamazsın?",
        answer:
          "Farklı fiziksel büyüklüklerdir; ihtiyaca göre yeterlilik veya aynı birimde kapasite gerekir.",
      },
      {
        prompt:
          "Engelmann deneyinde bakterinin yoğunlaştığı yer doğrudan hangi gazın dağılımına işaret eder?",
        answer:
          "O₂ kullanan bakteriler için uygun olan, daha çok O₂ oluşan bölgeler; bu algin fotosentezine dolaylı kanıttır.",
      },
      {
        prompt:
          "Bir genotipin gölgede daha az klorofil üretmesi neyi kanıtlamaz?",
        answer:
          "DNA dizisinin mutlaka değiştiğini; çevre gen ifadesini ve gelişmeyi etkileyebilir.",
      },
    ],
    items: [
      {
        prompt:
          "Basit O₂ dengesinde aynı yaprağın net O₂ çıkışı 6, solunum tüketimi 4 mikromol/dakika. Diğer gaz süreçleri ihmal ediliyor. Brüt fotosentetik üretim nedir?",
        correct: "10 mikromol/dakika",
        wrong: [
          [
            "2 mikromol/dakika",
            "Netten solunumu çıkarmak tüketimi iki kez eksiltir.",
          ],
          [
            "6 mikromol/dakika",
            "Bu dışarıdaki net değerdir; içeride tüketilen 4 eklenmemiştir.",
          ],
          [
            "24 mikromol/dakika",
            "İki hız çarpılmaz; üretim–tüketim farkı kullanılır.",
          ],
          [
            "0 mikromol/dakika",
            "Pozitif net çıkış üretim olmadan bu modelde oluşmaz.",
          ],
        ],
        knowledge: ["Net gaz, brüt üretim ile tüketimin farkıdır."],
        strategy: "Üretim bilinmeyenini net=P−R denkleminde yalnız bırak.",
        steps: [
          "Net=P−R, dolayısıyla P=net+R.",
          "6+4=10 mikromol/dakika.",
          "10 üretilip 4 tüketilince 6 dışarı kalır.",
        ],
        reason:
          "Net=P−R, dolayısıyla P=net+R. 6+4=10 mikromol/dakika. 10 üretilip 4 tüketilince 6 dışarı kalır.",
        commonError: "Net değeri brüt sayma.",
        check: "Bütün terimler mikromol/dakika cinsinden O₂’dir.",
      },
      {
        prompt:
          "Göreli üretim kapasiteleri aynı birimde: ışık 30, CO₂ 80, sıcaklık 60. Hız en küçük kapasite. Yalnız ışık 70 yapılınca son hız nedir?",
        correct: "60 birim/dakika",
        wrong: [
          [
            "70 birim/dakika",
            "Işık artarken sıcaklık kapasitesi 60 sınır kalır.",
          ],
          [
            "80 birim/dakika",
            "En büyük kapasite üretimi tek başına belirlemez.",
          ],
          [
            "30 birim/dakika",
            "Eski minimum yeni koşulda yeniden değerlendirilmelidir.",
          ],
          [
            "180 birim/dakika",
            "Kapasiteler toplanarak tek hattın hızı bulunmaz.",
          ],
        ],
        knowledge: ["Darboğaz, aynı ölçekte en düşük yeterli kapasitedir."],
        strategy: "Değişiklikten sonraki üç kapasiteyi birlikte yaz.",
        steps: [
          "Yeni değerler 70,80,60’tır.",
          "En küçük 60 olduğu için brüt hız 60 olur.",
          "Bu durumda sıcaklık koşulu sınırdır.",
        ],
        reason:
          "Yeni değerler 70,80,60’tır. En küçük 60 olduğu için brüt hız 60 olur. Bu durumda sıcaklık koşulu sınırdır.",
        commonError: "Bir kaynağın artışını doğrudan toplam hıza ekleme.",
        check: "Sonuç her üç kapasiteden de büyük olamaz.",
      },
      {
        prompt:
          "Işıkta bir yaprağın brüt O₂ üretimi 8, solunum tüketimi 10 mikromol/dakika; yalnız bu iki süreç var. Hangisi doğrudur?",
        correct: "Fotosentez sürerken yaprak net O₂ alır",
        wrong: [
          [
            "Fotosentez kesinlikle durmuş olur",
            "Brüt 8 verisi fotosentezin sürdüğünü doğrudan gösterir.",
          ],
          [
            "Yaprak net 18 mikromol/dakika O₂ verir",
            "Zıt yönlü akışlar toplanarak çıkış bulunmaz.",
          ],
          [
            "Solunumun gerçekleşmesi ışıkta imkânsızdır",
            "Bitki hücreleri ışıkta da solunum yapabilir.",
          ],
          [
            "Net O₂ alışverişi sıfırdır",
            "8 ile 10 eşit değildir; fark −2’dir.",
          ],
        ],
        knowledge: ["Brüt üretim pozitifken net değişim negatif olabilir."],
        strategy: "İşareti tanımlanmış net=P−R hesabını kullan.",
        steps: [
          "Net=8−10=−2 bulunur.",
          "Eksi çıkış net alım demektir.",
          "Brüt değer 8 olduğu için üretim olayı sürmektedir.",
        ],
        reason:
          "Net=8−10=−2 bulunur. Eksi çıkış net alım demektir. Brüt değer 8 olduğu için üretim olayı sürmektedir.",
        commonError: "Net işaretten bir sürecin tamamen yok olduğunu çıkarma.",
        check: "Alınan 2 O₂ ile üretilen 8 birlikte tüketilen 10’u karşılar.",
      },
      {
        prompt:
          "Aynı deneyde ışık ve CO₂ kapasiteleri 40, sıcaklık 80 birim/dakika; hız minimumdur. Yalnız ışık 70 yapılır. Hız niçin 40 kalır?",
        correct: "CO₂ kapasitesi hâlâ 40 ile sınırlar",
        wrong: [
          [
            "Işık fotosentezde hiçbir zaman önemli değildir",
            "Tek koşulda değişim olmaması bütün koşullara genellenemez.",
          ],
          [
            "Sıcaklık kapasitesi 80 olduğu için hız 80 olmalıdır",
            "Yüksek bir kapasite düşük CO₂ sınırını ortadan kaldırmaz.",
          ],
          [
            "Bitkinin DNA’sı kesin değişmiştir",
            "Verilen kapasitelerden mutasyon sonucu çıkarılmaz.",
          ],
          [
            "Her üç kapasite de mutlaka sıfırlanmıştır",
            "Soruda 40,70,80 değerleri pozitiftir.",
          ],
        ],
        knowledge: [
          "Birlikte sınırlayan iki etkenden yalnız birini yükseltmek yetmeyebilir.",
        ],
        strategy: "Değişmeden kalan en düşük kapasiteyi bul.",
        steps: [
          "Başta ışık 40 ve CO₂ 40 birlikte sınırlar.",
          "Yeni durumda 70,40,80 vardır.",
          "Minimum yine 40 olduğundan CO₂ sınırı kalır.",
        ],
        reason:
          "Başta ışık 40 ve CO₂ 40 birlikte sınırlar. Yeni durumda 70,40,80 vardır. Minimum yine 40 olduğundan CO₂ sınırı kalır.",
        commonError: "Etkisiz tek deneyi evrensel önemsizlik sayma.",
        check: "CO₂ de artırılırsa yeni minimum ayrıca hesaplanır.",
      },
      {
        prompt:
          "Özdeş alg örnekleri eşit foton akısında aydınlatılıyor. Brüt üretim mavi 12, yeşil 4, kırmızı 10 mikromol/dakika. Bu veri hangi sonucu destekler?",
        correct: "Bu örnekte yeşil ışıkta da fotosentez vardır",
        wrong: [
          ["Yeşil ışıkta üretim sıfırdır", "Ölçülen 4 değeri sıfır değildir."],
          ["Kırmızı bu örnekte maviden hızlıdır", "10, 12’den küçüktür."],
          [
            "Bütün türler her koşulda aynı renk sırasını gösterir",
            "Tek örneğin verisi bütün pigment ve türlere genellenemez.",
          ],
          [
            "Mavi ışık altında solunum kesin durmuştur",
            "Veri brüt üretimdir; solunum için ayrı bilgi yoktur.",
          ],
        ],
        knowledge: [
          "Soğurma eğrisi ile gerçek ölçümü birlikte ve koşullarıyla yorumla.",
        ],
        strategy:
          "Sıfır olup olmadığı sorusunu en yüksek renk sorusundan ayır.",
        steps: [
          "Yeşilde ölçülen hız 4’tür.",
          "Pozitif hız üretim olduğunu gösterir.",
          "Bu sonuç türler arası evrensel bir sıra gerektirmez.",
        ],
        reason:
          "Yeşilde ölçülen hız 4’tür. Pozitif hız üretim olduğunu gösterir. Bu sonuç türler arası evrensel bir sıra gerektirmez.",
        commonError: "En düşük değeri yokluk sanma.",
        check: "mavi 12 > kırmızı 10 > yeşil 4 >0.",
      },
      {
        prompt:
          "Engelmann türü deneyde ipliksi alg renklerine ayrılmış ışıkla aydınlatılır. O₂ kullanan bakteriler mavi ve kırmızı bölgelerde yoğunlaşır. Diğer koşullar uygunken en doğrudan açıklama nedir?",
        correct: "Alg bu bölgelerde daha çok O₂ oluşturur",
        wrong: [
          [
            "Bakteriler zorunlu olarak kloroplast üretir",
            "Bakterilerin kloroplast üretmesi bu deneyin mekanizması değildir.",
          ],
          [
            "Algin bütün bölgeleri aynı miktar O₂ üretmek zorundadır",
            "Farklı bakteriyel yoğunluk, verilen koşulda farklı O₂ ortamıyla ilişkilidir.",
          ],
          [
            "Yeşil bölgede ışık hiç bulunmaz",
            "Ayrılan ışıkta yeşil bölge de vardır.",
          ],
          [
            "Mavi ışık algin DNA dizisini kesin değiştirir",
            "Deney gen dizisini ölçmez ve böyle bir zorunluluk göstermez.",
          ],
        ],
        knowledge: [
          "O₂ kullanan bakteriler gaz dağılımının dolaylı göstergesidir.",
        ],
        strategy: "Gözlenen bakteri dağılımını algin O₂ üretimine bağla.",
        steps: [
          "Alg ışığa göre farklı O₂ üretimi gösterebilir.",
          "O₂ kullanan bakteriler daha uygun O₂ ortamında yoğunlaşır.",
          "Bu yüzden yoğun bölge daha çok O₂ oluşumunu destekler.",
        ],
        reason:
          "Alg ışığa göre farklı O₂ üretimi gösterebilir. O₂ kullanan bakteriler daha uygun O₂ ortamında yoğunlaşır. Bu yüzden yoğun bölge daha çok O₂ oluşumunu destekler.",
        commonError: "Gösterge canlı ile fotosentez yapan canlıyı karıştırma.",
        check:
          "Çıkarım gaz dağılımıyladır, kesin gen veya sıcaklık ölçümü değildir.",
      },
      {
        prompt:
          "Bir bitkinin hızı düşük ışıkta sıcaklık artırılınca çok az değişiyor; aynı sıcaklık aralığında güçlü ışıkta belirgin artıyor. Tür ve diğer koşullar aynı. En uygun yorum hangisidir?",
        correct:
          "Düşük ışık koşulu sıcaklık artışının etkisini sınırlamış olabilir",
        wrong: [
          [
            "Sıcaklık hiçbir fotosentez basamağını etkilemez",
            "Güçlü ışıkta sıcaklıkla artış gözlenmiştir.",
          ],
          [
            "Her sıcaklıkta hız sonsuza kadar artacaktır",
            "Verilen sınırlı aralık yüksek sıcaklık hasarını dışlamaz.",
          ],
          [
            "Düşük ışıkta bütün enzimler kesin yoktur",
            "Az değişim enzimlerin yokluğunu kanıtlamaz.",
          ],
          [
            "İki deneyde ölçüm birimleri zorunlu farklıdır",
            "Böyle bir fark verilmemiştir; etkileşim aynı birimle sınanabilir.",
          ],
        ],
        knowledge: [
          "Bir faktörün etkisi diğer gereksinimlerin yeterliliğine bağlıdır.",
        ],
        strategy:
          "İki ışık koşulunu aynı sıcaklık değişimi altında karşılaştır.",
        steps: [
          "Düşük ışıkta ışık girdisi bir darboğaz olabilir.",
          "Sıcaklık artışı bu darboğazı tek başına kaldırmaz.",
          "Güçlü ışıkta enzim hızındaki değişim daha görünür hâle gelebilir.",
        ],
        reason:
          "Düşük ışıkta ışık girdisi bir darboğaz olabilir. Sıcaklık artışı bu darboğazı tek başına kaldırmaz. Güçlü ışıkta enzim hızındaki değişim daha görünür hâle gelebilir.",
        commonError:
          "Birden çok faktörü bağımsız kesin doğrusal etkiler sayma.",
        check:
          "Yorum olasılıklıdır; verilen veri optimum sıcaklığı tek başına belirlemez.",
      },
      {
        prompt:
          "İki özdeş kapta özdeş bitkiler var; ışık, sıcaklık ve su aynı. Bir kapta canlıdan ayrı CO₂ tutucu KOH bölmesi kullanılıyor. Deney hangi değişkenin etkisini doğrudan sınamak için uygundur?",
        correct: "CO₂ kullanılabilirliği",
        wrong: [
          [
            "Bitkinin gen dizisinin zorunlu değişimi",
            "Gaz tutucu deneyi gen dizisini değiştirme veya ölçme deneyi değildir.",
          ],
          ["Işığın dalga boyu", "Işık koşulu iki kapta eşittir."],
          ["Her yaprağın kesin yaşı", "Yaş değişkeni ayrı değiştirilmemiştir."],
          [
            "O₂’nin klorofil tarafından karbon kaynağı yapılması",
            "Karbon özümlemesinin karbon kaynağı CO₂’dir; O₂ değildir.",
          ],
        ],
        knowledge: ["CO₂ tutucu, ortamdaki kullanılabilir CO₂ miktarını değiştirir."],
        strategy: "Değiştirilen işlemi sabit tutulan koşullardan ayır.",
        steps: [
          "KOH ayrı bölmede CO₂’yi ortamdan tutar.",
          "İki kap arasında hedeflenen fark CO₂ erişimidir.",
          "Üretim değişimi bu kontrollü fark bağlamında yorumlanır.",
        ],
        reason:
          "KOH ayrı bölmede CO₂’yi ortamdan tutar. İki kap arasında hedeflenen fark CO₂ erişimidir. Üretim değişimi bu kontrollü fark bağlamında yorumlanır.",
        commonError:
          "Kimyasalı bitkiye doğrudan katıp yalnız tek değişken var sanma.",
        check:
          "Canlıdan ayrılmış bölme pH ve doğrudan temas etkisini azaltma amacını taşır.",
      },
      {
        prompt:
          "A yaprağı 10 cm², B yaprağı 20 cm²; her ikisinin alan başına hızı 2 mikromol O₂/(cm²·dakika). Hangi eşleme doğrudur?",
        correct: "Toplam hız A 20, B 40 mikromol/dakika",
        wrong: [
          [
            "Toplam hız her ikisinde 2 mikromol/dakika",
            "Alan başına değer toplam hız değildir.",
          ],
          ["A 40, B 20 mikromol/dakika", "Alanlar ters kullanılmıştır."],
          [
            "B’nin her hücresi mutlaka iki kat hızlıdır",
            "Toplam fark alanla açıklanır; hücre başı hız verilmemiştir.",
          ],
          [
            "B’de fotosentez hiç gerçekleşmez",
            "Pozitif alan başına hız üretim olduğunu gösterir.",
          ],
        ],
        knowledge: ["Toplam hız = alan başına hız × alan."],
        strategy: "Birimleri çarparken cm² paydasını sadeleştir.",
        steps: [
          "A:2×10=20 bulunur.",
          "B:2×20=40 bulunur.",
          "Alan başına hızlar aynı, toplamlar farklıdır.",
        ],
        reason:
          "A:2×10=20 bulunur. B:2×20=40 bulunur. Alan başına hızlar aynı, toplamlar farklıdır.",
        commonError: "Farklı paydaları olan hızları özdeş sayma.",
        check: "B/A toplam oranı 20/10=2’dir.",
      },
      {
        prompt:
          "Aynı genotipte iki fide farklı ışık ortamlarında yetişiyor; pigment miktarları ve yaprak büyüklükleri farklılaşıyor. Yalnız bu gözlem hangisini kanıtlamaz?",
        correct: "DNA baz dizisinin mutlaka değiştiğini",
        wrong: [
          [
            "Çevre koşullarının farklı olduğunu",
            "Kökte farklı ışık ortamları açık verilmiştir.",
          ],
          [
            "Gözlenen yaprak özelliklerinin farklı olduğunu",
            "Bu doğrudan gözlemdir.",
          ],
          [
            "Pigment miktarının farklı olduğunu",
            "Bu da kökte ölçülen özellik olarak verilmiştir.",
          ],
          [
            "Fenotipin çevre bağlamında değerlendirilmesi gerektiğini",
            "Aynı genotipte farklı çevre ve fenotip bu değerlendirmeyi gerektirir.",
          ],
        ],
        knowledge: [
          "Fenotip genetik yapı, gelişme ve çevrenin ortak etkisiyle oluşabilir.",
        ],
        strategy: "Gözlenen özellik farkını zorunlu dizi değişiminden ayır.",
        steps: [
          "Başlangıç genotipi aynı verilmiştir.",
          "Çevre, gen ifadesi ve gelişme üzerinden fark yaratabilir.",
          "DNA dizisinin değiştiği sonucu ek moleküler kanıt olmadan zorunlu değildir.",
        ],
        reason:
          "Başlangıç genotipi aynı verilmiştir. Çevre, gen ifadesi ve gelişme üzerinden fark yaratabilir. DNA dizisinin değiştiği sonucu ek moleküler kanıt olmadan zorunlu değildir.",
        commonError: "Her çevresel fenotip farkını mutasyon sayma.",
        check: "Kanıtlamaz sorusu gözlenen farkı reddetmek anlamına gelmez.",
      },
      {
        prompt:
          "Bir yaprakta brüt ve solunum O₂ hızları eşit ve pozitiftir; başka gaz etkileri ihmal edilir. Hangi durum beklenir?",
        correct: "Net O₂ alışverişi sıfırdır",
        wrong: [
          [
            "Her iki olay da kesin durmuştur",
            "Pozitif hızlar iki olayın da sürdüğünü gösterir.",
          ],
          [
            "O₂ çıkışı iki hızın toplamıdır",
            "Zıt yönlü üretim ve tüketim farkla hesaplanır.",
          ],
          [
            "Yaprakta enzim bulunamaz",
            "Süregelen metabolizma enzimlerle uyumludur.",
          ],
          [
            "Bitki karbon kaynağı olarak artık yalnız O₂ kullanır",
            "O₂ karbon içermez; bu sonuç dengeden çıkmaz.",
          ],
        ],
        knowledge: ["Kompanzasyonda iki zıt hız eşittir."],
        strategy: "Eşit iki pozitif sayının farkını düşün.",
        steps: [
          "P=R>0 verilmiştir.",
          "Net=P−R=0 olur.",
          "Sıfır net değer süreçlerin yokluğu değil dengeyi gösterir.",
        ],
        reason:
          "P=R>0 verilmiştir. Net=P−R=0 olur. Sıfır net değer süreçlerin yokluğu değil dengeyi gösterir.",
        commonError: "Sıfır net ile sıfır brüt değerini karıştırma.",
        check: "P ve R’nin ayrı pozitifliği korunur.",
      },
      {
        prompt:
          "Sera denemesinde ışık artırılınca ilk aralıkta üretim artıyor, sonra plato çiziyor. CO₂ artırılınca bu plato yükseliyor. En iyi açıklama nedir?",
        correct: "İlk platoda CO₂ kapasitesi üretimi sınırlamıştır",
        wrong: [
          [
            "Işık fotosentez için gereksizdir",
            "İlk aralıkta ışıkla hız artmıştır.",
          ],
          [
            "CO₂ bütün koşullarda sınırsız artış sağlar",
            "Yeni plato da başka sınırlayıcılarla oluşabilir.",
          ],
          [
            "Yeşil ışığın her zaman sıfır hız verdiği kanıtlanır",
            "Deney ışığın rengini sınamıyor.",
          ],
          [
            "Bütün bitki türlerinin optimum sıcaklığı aynıdır",
            "Sıcaklık ve türler arası böyle bir karşılaştırma verilmemiştir.",
          ],
        ],
        knowledge: [
          "Platonun başka faktörle yükselmesi darboğazın koşula bağlı olduğunu gösterir.",
        ],
        strategy: "İki müdahaleyi sırasıyla mekanizmaya bağla.",
        steps: [
          "Işık artışı ilk sınırı azaltmıştır.",
          "CO₂ artışı önceki plato düzeyini yükseltmiştir.",
          "Bu, o aralıkta CO₂ kullanılabilirliğinin sınır olduğunu destekler.",
        ],
        reason:
          "Işık artışı ilk sınırı azaltmıştır. CO₂ artışı önceki plato düzeyini yükseltmiştir. Bu, o aralıkta CO₂ kullanılabilirliğinin sınır olduğunu destekler.",
        commonError:
          "Bir plato grafiğini bütün koşullara değişmez tavan sayma.",
        check: "Yorum yalnız kontrol edilmiş deney aralığı için kurulur.",
      },
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 PDF62–63; OGM Fotosentez Hızını Etkileyen Faktörler sunu 046 ve özet 013; Dersler Cepte Enerji 15–16; Video Fotosentez 36–43 karşılaştırılarak hazırlanmış özgün anlatım ve sorular. Brüt/net, birim ve genetik–çevre koşulları ayrıca açıklandı.",
  },
  {
    id: "kemosentez-enerji-karbon",
    topic: "detail-337",
    title: "Kemosentez: elektronlardan organik maddeye",
    minutes: 90,
    objectives: [
      "Enerji kaynağı, elektron vericisi ve karbon kaynağını ayrı tanımla.",
      "İnorganik oksidasyonu ATP ve indirgeme gücü üzerinden karbon özümlemesine bağla.",
      "Nitrifikasyonun iki basamağını azot ve O₂ bilançosuyla izle.",
      "Kemosentezi fotosentez, azot bağlama, denitrifikasyon ve organik atık ayrışmasından ayır.",
    ],
    sections: [
      {
        title: "Işık yokken yeni organik madde nasıl oluşur?",
        paragraphs: [
          "Güneş görmeyen bir ortamda yaşamak, bütün canlıların dışarıdan hazır organik besin alması gerektiği anlamına gelmez. Bazı bakteri ve arkeler, belirli inorganik maddelerin kimyasal tepkimelerinden enerji kazanır; bu enerjiyi CO₂ gibi inorganik karbon kaynaklarından organik madde yapımına bağlayabilir. Okul düzeyinde bu üretim kemosentez olarak adlandırılır.",
          "Burada yoktan madde veya enerji oluşmaz. Karbon atomları ortamdan alınır; enerji, elektronların uygun verici–alıcı tepkimelerindeki serbest enerji değişiminden sağlanır. Fotosentezde ilk enerji girdisi ışıkken bu örnekte kimyasal bir redoks tepkimesidir. Bu ayrımı anlamak, karanlık mağara veya derin deniz ekosistemindeki üretimin kaynağını açıklamayı sağlar.",
        ],
      },
      {
        title: "Üç ayrı soruyu sırayla sor",
        paragraphs: [
          "Bir canlının beslenmesini anlamak için “Karbon nereden geliyor?”, “Enerji hangi dönüşümden geliyor?” ve “Elektronları hangi madde veriyor?” sorularını ayır. Ototrof, organik maddesinin karbonunu CO₂ gibi inorganik kaynaktan sağlar. Kemotrofta enerji kimyasal tepkimelerden gelir; litotrof ifadesi elektron vericisinin inorganik olmasına işaret eder.",
          "Bu ünitenin ana örnekleri kemolitoototroflardır: enerji kimyasal dönüşümden, elektronlar indirgenmiş inorganik maddeden, karbon ise CO₂’den gelir. Kimyasal enerji kullanan her canlı ototrof değildir; insan da besin oksidasyonuyla kimyasal enerji kazanır ama karbonunu çoğunlukla organik besinle alır. Tek bir özelliği bütün beslenme tanımı yerine kullanma.",
        ],
      },
      {
        title: "Oksidasyon elektron kaybıdır",
        paragraphs: [
          "Elektron veren madde yükseltgenir; elektron alan madde indirgenir. Oksidasyonun gerçekleşmesi için tanım gereği mutlaka O₂ ile birleşme şartı yoktur. Oksijen birçok aerobik örnekte son elektron alıcısıdır; ancak temel değişim elektronların veya yükseltgenme basamağının yönüdür. İki olay birlikte bir redoks çiftini oluşturur.",
          "Örneğin Fe²⁺ bir elektron vererek Fe³⁺ hâline geçtiğinde oksitlenir. Aynı sırada bu elektronu alan başka bir sistem indirgenir. CO₂’nin karbonu organik maddeye katılırken indirgenme gücü gerekir. Böylece enerji sağlayan maddenin oksitlenmesi ile karbonun indirgenmesi farklı fakat bağlanan süreçlerdir; aynı molekülün iki yönde birden değiştiğini varsayma.",
        ],
      },
      {
        title: "Elektron akışı ATP ve indirgeme gücü sağlar",
        paragraphs: [
          "İnorganik elektron vericisinin oksidasyonundan gelen elektronlar, uygun zar üzerindeki taşıyıcı sistemlerden geçebilir. Bu akışın enerjisi iyon farkı kurulmasına, ardından ATP sentazla ATP sentezine bağlanır. CO₂’den organik molekül yapımı yalnız ATP değil, elektron sağlayan indirgenmiş taşıyıcılar da gerektirir.",
          "Elektron vericisinin özelliklerine göre indirgeme gücünün elde edilmesi ek enerji gerektirebilir. Bu nedenle “bir amonyak molekülü her canlıda kesin şu kadar ATP ve glikoz verir” şeklinde türden bağımsız bir sayı kurulmaz. Öğretim modelinde azot ve O₂ gereksinimi sayılır; kazanılan enerjinin karbon özümlemesini desteklediği nitel olarak gösterilir. Sayı verilmeyen ATP verimi uydurulmaz.",
        ],
      },
      {
        title: "CO₂ özümlemesi üretimin ikinci parçasıdır",
        paragraphs: [
          "CO₂, uygun enzim yollarında organik karbon iskeletlerine katılır. Birçok kemoototrofta Calvin döngüsü bulunur; başka karbon sabitleme yolları da vardır. Üretilen küçük organik moleküller daha sonra karbonhidrat, lipit, amino asit ve başka hücresel maddelerin sentezinde kullanılır. Amino asit ve nükleotit gibi azotlu ürünler için ayrıca azot kaynağı gerekir.",
          "Bu süreçte klorofilin ışıkla uyarılması zorunlu değildir. Kemosentetik karbon özümlemesi su fotolizi yaparak O₂ üretmez. Aerobik nitrifikasyon örneğinde O₂ tersine tüketilir. Fotosentezin oksijenli toplam denklemini, yalnız enerji kelimesini değiştirerek kemosenteze kopyalamak tepkimenin elektron ve oksijen dengesini bozar.",
        ],
      },
      {
        title: "Birinci nitrifikasyon basamağı: amonyumdan nitrite",
        paragraphs: [
          "Organik atıklardaki azotun ayrıştırılmasıyla oluşan NH₃/NH₄⁺, bazı mikroorganizmalar tarafından nitrite kadar oksitlenebilir. Bu işlemde azotun yükseltgenme basamağı artar ve elektronlar ayrılır. Aerobik örnekte oksijen elektron alıcıdır. Amonyak oksitleyen bakteri ve arkeler bu işlevi yapabilir; klasik okul örneği Nitrosomonas’tır.",
          "Amonyumla yazılmış sade net denklem NH₄⁺ + 1,5 O₂ → NO₂⁻ + 2 H⁺ + H₂O biçimindedir. Bu denklem bir mol azot içeren amonyumdan bir mol azot içeren nitrit oluştuğunu ve 1,5 mol O₂ gereksinimini gösterir. H⁺ oluşumu ortamı asitleştirebilir. NH₃ ile yazılan başka dengeli denklemde su ve proton sayıları değişebilir; seçilen formu denklemin ortasında değiştirme.",
        ],
      },
      {
        title: "İkinci nitrifikasyon basamağı: nitritten nitrata",
        paragraphs: [
          "Nitrit başka uygun mikroorganizmalarca nitrata oksitlenir. Klasik okul örneği Nitrobacter’dir. Sade denklem NO₂⁻ + 0,5 O₂ → NO₃⁻ biçimindedir. Her iki azotlu iyon da bir azot atomu taşır; bu yüzden bir mol nitrit işlenirse bir mol nitrat oluşur. Bu basamak da enerji kazanımına bağlanabilir.",
          "Doğada tek bir basamağın mutlaka yalnız bir cins tarafından yapıldığı düşünülmez; farklı türler ve iki basamağı birlikte yapabilen mikroorganizmalar vardır. Üç depolu model, iki işlevsel basamağı görünür kılmak için ayrılmıştır. Bir basamakta biriken nitritin ikinci basamak için girdi olduğunu ve ikinci basamağın stoğun izin verdiğinden çok madde işleyemeyeceğini izle.",
        ],
      },
      {
        title: "Azot bağlama ile nitrifikasyon aynı değildir",
        paragraphs: [
          "Azot bağlama, atmosferik N₂’nin amonyak gibi biyolojik olarak kullanılabilir forma indirgenmesidir. Nitrifikasyon ise zaten indirgenmiş durumda bulunan amonyak/amonyumun nitrit ve nitrata oksitlenmesidir. Denitrifikasyonda belirli yollarla nitratın N₂ gibi gazlara indirgenmesi görülebilir. Üçünün başlangıç maddesi, elektron yönü ve ekolojik sonucu farklıdır.",
          "Bir oka yalnız “azot döngüsü” yazmak bu ayrımı sağlamaz. N₂ → NH₃ bağlama; NH₄⁺ → NO₂⁻ → NO₃⁻ nitrifikasyon; NO₃⁻ → N₂ seçili denitrifikasyon yoludur. Bitkiler türe ve koşula göre amonyum veya nitrat kullanabilir; bütün bitkilerin yalnız nitrattan azot alabildiği söylenmez. Nitrifikasyon, havanın N₂’sini doğrudan bitkiye bağlamak değildir.",
        ],
      },
      {
        title: "Modelde atom miktarı korunur",
        paragraphs: [
          "Etkileşimdeki azot depoları mol N cinsindendir; “bir molekül N₂ ile bir iyon NH₄⁺ aynı azottur” gibi bir eşitlik kurulmaz. Seçilen nitrifikasyon yolunda her azotlu tanecikte bir N vardır. Başlangıç azotunun bir kısmı amonyumda, bir kısmı nitritte, bir kısmı nitratta kalabilir; giriş ve başka çıkış yoksa bu üç miktarın toplamı sabittir.",
          "İlk basamakta işlenen her mol N için 1,5 mol O₂, ikinci basamakta işlenen her mol N için 0,5 mol O₂ gerekir. Oksijen bir depo olarak üretilmez; toplam gereksinim ayrıca gösterilir. Modelde büyümeye azot çekilmesi ve başka kimyasal yan yollar yok sayılmıştır. Gerçek tesiste bu yan yollar ve biyokütle de ölçülmelidir; model sınırı olumlu ana mekanizmanın yerine geçmez.",
        ],
      },
      {
        title: "Hidrojen, kükürt ve demir yolları",
        paragraphs: [
          "İnorganik verici yalnız amonyum değildir. H₂, H₂S ve Fe²⁺ gibi uygun maddelerin oksidasyonu da belirli kemolitoototroflara enerji sağlayabilir. Örneğin Fe²⁺ → Fe³⁺ dönüşümü elektron verir; H₂S’nin kükürt veya daha oksitlenmiş kükürt biçimlerine dönüşmesi de redoks yolunun bir parçasıdır. Hangi ürünün oluştuğu türe ve ortama bağlıdır.",
          "Aynı H₂S molekülü, anoksijenik fotosentez yapan bir bakteride elektron vericisi olabilir; oradaki ilk enerji girdisi ışık uyarımıdır. Kemosentetik örnekte enerji kimyasal oksidasyondan sağlanır. “Bu maddeyi kullanıyor” demek iki canlının enerji dönüşümünü eşitlemez. Madde adı yanında elektronun nereye gittiğini ve enerjinin hangi yolla yakalandığını sor.",
        ],
      },
      {
        title: "Karanlık ekosistem ve üretici desteği",
        paragraphs: [
          "Derin denizdeki hidrotermal kaynak çevrelerinde indirgenmiş inorganik maddeler ve uygun alıcılar bir araya gelebilir. Bunları kullanan mikroorganizmalar organik madde üreterek besin ağını destekleyebilir. Bazıları başka canlılarla simbiyotik ilişkiler kurar. Böyle bir sistemde üretimin ilk girdisi o noktadaki güneş ışığı değildir.",
          "Bununla birlikte ekosistemi tümüyle çevreden bağımsız sayma. Su akımları, mineraller, elektron alıcıları ve sıcaklık ortamı etkiler; bazı alıcıların geniş biyosferdeki kaynağı fotosentezle ilişkili olabilir. Temel çıkarım, yerel birincil üretimin kimyasal enerjiye dayanabildiğidir. Bütün karanlık ortamlarda aynı türün veya aynı redoks çiftinin bulunacağı sonucu çıkmaz.",
        ],
      },
      {
        title: "Arıtma ve biyomadencilikte ne yapılır?",
        paragraphs: [
          "Atık sudaki amonyumun nitrifikasyonla dönüştürülmesi, azot yönetiminin bir basamağı olabilir. Nitrifikasyon çözünmüş azotu otomatik olarak sistemden N₂ gazı şeklinde çıkarmaz; nitrat hâline dönüştürür. Gerçek azot uzaklaştırmasında denitrifikasyon veya başka yollarla birlikte tasarım gerekebilir. Bu yüzden bir tesiste farklı oksijen koşullarına sahip bölmeler bulunabilir.",
          "Bazı demir ve kükürt oksitleyen mikroorganizmalar, düşük nitelikli cevherlerden metal kazanımını kolaylaştıran biyomadencilik işlemlerinde kullanılabilir. Bu olumlu kullanım, bütün metal kirliliğinin kendiliğinden zararsızlaştığı anlamına gelmez. Su kimyası, asit oluşumu ve yan ürünler kontrol edilir. Biyoteknolojik uygulama adı ezberlenmeden önce mikroorganizmanın hangi maddeyi hangi biçime çevirdiği öğrenilir.",
        ],
      },
      {
        title: "Arke, metan ve biyogazı doğru yerleştir",
        paragraphs: [
          "Metanojenler bakteri değil arke grubundadır. Bazı hidrojenotrof metanojenler H₂’yi elektron vericisi, CO₂’yi indirgenecek kaynak olarak kullanıp metan oluşturur; karbon özümlemesi de koşula göre gerçekleşebilir. Metan oluşturan ile metanı oksitleyen mikroorganizmalar aynı işlev değildir. “Metan bakterisi” etiketi bu farklı yönleri örtebilir.",
          "Organik atıktan biyogaz üretimi hidroliz, fermantasyon ve metan oluşumu gibi birden çok mikrobiyal basamak içerebilir; tamamını tek bir kemosentez olayı sayma. Arkelerin de hepsi aşırı sıcak, tuzlu ya da asitli yerde yaşamak zorunda değildir. Bazı arkelerden elde edilen enzimler yüksek tuzlulukta, yüksek sıcaklıkta veya uygun uç pH koşullarında işlevlerini koruyabilir; her enzim bu koşulların tümüne birden dayanmak zorunda değildir. Bu özel dayanıklılık boya endüstrisi, atık su arıtımı ve uygun metal kazanım süreçlerinde yararlı olabilir. Bu örnekler bütün arke türlerine aynı yaşam biçimini yüklemez.",
        ],
      },
      {
        title: "Karbonu, elektronu ve zamanı ayrı sınayarak çöz",
        paragraphs: [
          "Kemosentez ışığın bulunmasına doğrudan bağlı olmadığından uygun kimyasal koşullar sürüyorsa gece de gündüz de devam edebilir. Bu, besin veya elektron alıcısı bittiğinde üretimin süreceği anlamına gelmez. Ototrofluk için karbon kaynağını, enerji kazanımı için redoks tepkimesini, üretimin sürmesi için çevresel gereksinimleri ayrı denetle.",
          "Bir deneyde CO₂ işaretlenip yeni organik molekülde izlenirse karbonun kaynağına; inorganik verici tüketimi ve ETS etkinliği ölçülürse enerji/elektron yoluna kanıt elde edilir. Işık yokluğu tek başına bütün organik maddenin kemosentezle yapıldığını kanıtlamaz. Önce hazır organik karbonla beslenme olasılığını da kontrol et; olumlu sonuca hangi ölçümün ulaştırdığını açıkla.",
        ],
      },
    ],
    examples: [
      {
        title: "İlk basamağın O₂ gereksinimi",
        prompt:
          "Aerobik modelde NH₄⁺ başına 1,5 mol O₂ tüketiliyor. 4 mol NH₄⁺ bütünüyle nitrite çevrilecek; başka süreç yok. O₂ gereksinimi?",
        strategy: "Verilen stokiyometrik katsayıyı işlenen miktarla çarp.",
        steps: [
          {
            label: "1. adım",
            explanation: "İşlenen azot 4 mol N’dir.",
          },
          {
            label: "2. adım",
            explanation: "4 × 1,5 = 6 mol O₂ gerekir.",
          },
          {
            label: "3. adım",
            explanation:
              "Nitritte 4 mol N korunur; O₂ üretildiği sonucu çıkmaz.",
          },
        ],
        answer: "6 mol O₂",
        check: "Mol oranı aynı tepkime basamağına aittir.",
        pitfall: "Nitrat basamağının katsayısını ilk basamağa uygulama.",
      },
      {
        title: "Nitritin sonraki adımı",
        prompt:
          "NO₂⁻ + 0,5 O₂ → NO₃⁻ yolunda 4 mol nitrit bütünüyle işleniyor. O₂ ve nitrat miktarları?",
        strategy: "Bir mol N için verilen katsayıları uygula.",
        steps: [
          {
            label: "1. adım",
            explanation: "Nitritin her molü bir mol nitrata gider.",
          },
          {
            label: "2. adım",
            explanation: "4 × 0,5 = 2 mol O₂ tüketilir.",
          },
          {
            label: "3. adım",
            explanation: "4 mol nitrat oluşur; azot miktarı yine 4 mol N’dir.",
          },
        ],
        answer: "2 mol O₂ tüketimi, 4 mol nitrat",
        check: "Bir N taşıyan giriş ve çıkışların N miktarı eşittir.",
        pitfall: "Nitratın üç oksijenini üç mol O₂ gereksinimi sanma.",
      },
      {
        title: "İki basamağın toplamı",
        prompt:
          "2 mol NH₄⁺’ün tümü önce nitrite, sonra nitrata dönüyor. İlk basamak mol N başına 1,5, ikinci 0,5 mol O₂ gerektiriyor. Toplam?",
        strategy: "İki basamakta aynı azot stoğunun ilerlediğini izle.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk basamak 2 × 1,5 = 3 mol O₂ kullanır.",
          },
          {
            label: "2. adım",
            explanation: "İkinci basamak 2 × 0,5 = 1 mol O₂ kullanır.",
          },
          {
            label: "3. adım",
            explanation: "Toplam 4 mol O₂ ve 2 mol nitrat elde edilir.",
          },
        ],
        answer: "4 mol O₂ gereksinimi",
        check: "NH₄⁺ → NO₃⁻ için mol N başına toplam 2 mol O₂ çıkar.",
        pitfall:
          "Azot iki kez işlem gördü diye başlangıç azotunu iki kat sayma.",
      },
      {
        title: "Üç depoda beş azot",
        prompt:
          "Başlangıçta yalnız 5 mol N amonyumda. 3 mol N ilk, bunların 2 mol N’si ikinci basamağı geçiyor; başka giriş/çıkış yok. Son depolar?",
        strategy: "İlk akıştan sonra ikinci akışı nitritten çıkar.",
        steps: [
          {
            label: "1. adım",
            explanation: "Amonyumda 5−3=2 mol N kalır.",
          },
          {
            label: "2. adım",
            explanation: "Nitritte 3−2=1 mol N kalır.",
          },
          {
            label: "3. adım",
            explanation: "Nitratta 2 mol N vardır; toplam 2+1+2=5 mol N.",
          },
        ],
        answer: "Amonyum 2, nitrit 1, nitrat 2 mol N",
        check: "Toplam başlangıçtaki 5 mol N’ye eşittir.",
        pitfall: "İkinci basamağı henüz oluşmamış stoktan fazla işletemezsin.",
      },
      {
        title: "Demirin elektron yönü",
        prompt:
          "Tanımlı tepkimede 3 mol Fe²⁺ bütünüyle Fe³⁺’e dönüşüyor. Her Fe²⁺ bir elektron verir. Toplam elektron ve olay türü?",
        strategy: "Yük değişimini elektron kaybıyla bağla.",
        steps: [
          {
            label: "1. adım",
            explanation: "+2’den +3’e geçiş bir elektron kaybıdır.",
          },
          {
            label: "2. adım",
            explanation: "3 mol Fe²⁺, 3 mol elektron verir.",
          },
          {
            label: "3. adım",
            explanation:
              "Elektron veren demir oksitlenmiştir; alıcı taraf ayrıca indirgenir.",
          },
        ],
        answer: "3 mol elektron; oksidasyon",
        check:
          "İlk pozitif yük toplamı 6, son 9; verilen 3 negatif yük farkı dengeler.",
        pitfall: "Elektron kaybını indirgenme diye adlandırma.",
      },
      {
        title: "Süre ile toplamı hıza çevir",
        prompt:
          "Kontrollü nitrifikasyon reaktöründe 10 dakikada 6 mmol N amonyumdan nitrite aktarılıyor; ikinci basamak yok. Ortalama işleme hızı ve O₂ gereksinimi?",
        strategy:
          "Önce miktarı süreye böl, sonra aynı oranı O₂ katsayısıyla çarp.",
        steps: [
          {
            label: "1. adım",
            explanation: "Azot işleme hızı 6/10=0,6 mmol N/dakika.",
          },
          {
            label: "2. adım",
            explanation: "Toplam O₂ gereksinimi 6×1,5=9 mmol O₂.",
          },
          {
            label: "3. adım",
            explanation: "O₂ tüketim hızı 9/10=0,9 mmol/dakika.",
          },
        ],
        answer: "0,6 mmol N/dakika; 0,9 mmol O₂/dakika",
        check: "Katsayı 1,5 zaman birimini değiştirmez.",
        pitfall: "Toplam 6 mmol ile dakikalık hızı karıştırma.",
      },
    ],
    recall: [
      {
        prompt:
          "Kemolitoototrofun enerji kaynağı ile karbon kaynağı niçin aynı cevap değildir?",
        answer:
          "Enerji inorganik vericinin redoks dönüşümünden, organik maddenin karbonu CO₂ gibi inorganik karbon kaynağından gelir.",
      },
      {
        prompt: "NH₄⁺ → NO₂⁻ → NO₃⁻ ile N₂ → NH₃ arasındaki temel fark nedir?",
        answer:
          "İlki nitrifikasyonla oksidasyon, ikincisi azot bağlama ile indirgenmedir; başlangıç maddeleri farklıdır.",
      },
      {
        prompt: "Aerobik nitrifikasyonda O₂ dışarı üretilir mi?",
        answer:
          "Hayır; seçilen iki basamak O₂ tüketir. Kemosentetik CO₂ özümlemesi su fotoliziyle O₂ üretmez.",
      },
      {
        prompt:
          "Karanlıkta organik madde bulunduğu gözlemi tek başına kemosentezi kanıtlar mı?",
        answer:
          "Hayır. Hazır organik madde kullanımı dışlanmalı; karbon özümlemesi ile inorganik enerji/elektron yolu ölçülmelidir.",
      },
    ],
    items: [
      {
        prompt:
          "Bir mikroorganizma ışık olmadan NH₄⁺ oksidasyonundan enerji kazanıyor ve organik maddesinin karbonunu CO₂’den alıyor. Karbon kaynağı hangisidir?",
        correct: "CO₂",
        wrong: [
          [
            "Işık",
            "Işık enerji olabilir; karbon atomu kaynağı değildir ve burada kullanılmıyor.",
          ],
          ["O₂", "O₂ karbon içermez."],
          [
            "ATP’nin mutlaka dışarıdan alınması",
            "ATP’nin dışarıdan alınması verilmemiş; karbon kaynağı CO₂ açık verilmiştir.",
          ],
          ["NH₄⁺’ün karbon atomları", "NH₄⁺ hiç karbon atomu taşımaz."],
        ],
        knowledge: [
          "Enerji kaynağı ile organik maddenin karbon kaynağı ayrı sorulardır.",
        ],
        strategy:
          "Moleküllerin karbon içerip içermediğini ve kökteki akışı izle.",
        steps: [
          "Kökte karbonun CO₂’den alındığı verilmiştir.",
          "NH₄⁺ elektron/enerji yoluyla ilişkilidir, karbon taşımaz.",
          "Bu nedenle karbon kaynağı CO₂’dir.",
        ],
        reason:
          "Kökte karbonun CO₂’den alındığı verilmiştir. NH₄⁺ elektron/enerji yoluyla ilişkilidir, karbon taşımaz. Bu nedenle karbon kaynağı CO₂’dir.",
        commonError: "Enerji veren maddeyi otomatik karbon kaynağı sanma.",
        check: "Seçilen maddede C atomu bulunmalıdır.",
      },
      {
        prompt:
          "Fe²⁺ → Fe³⁺ + e⁻ dönüşümünde demir için hangi açıklama doğrudur?",
        correct: "Elektron vererek oksitlenir",
        wrong: [
          [
            "Elektron alarak indirgenir",
            "Elektron ürün tarafında, yani demir tarafından verilmektedir.",
          ],
          [
            "Karbon atomuna dönüşür",
            "Redoks elementin çekirdeğini değiştirmez.",
          ],
          [
            "Her durumda klorofil olur",
            "Bu bir redoks dönüşümüdür; pigment sentezi verilmemiştir.",
          ],
          ["Yük değişmediği için olay yoktur", "Yük +2’den +3’e değişir."],
        ],
        knowledge: [
          "Oksidasyon elektron kaybı, indirgenme elektron kazanımıdır.",
        ],
        strategy: "Elektronun okun hangi tarafında olduğunu bul.",
        steps: [
          "Elektron Fe²⁺’den ayrılmıştır.",
          "Demirin pozitif yükü bir artmıştır.",
          "Elektron kaybı oksidasyon olarak adlandırılır.",
        ],
        reason:
          "Elektron Fe²⁺’den ayrılmıştır. Demirin pozitif yükü bir artmıştır. Elektron kaybı oksidasyon olarak adlandırılır.",
        commonError: "Oksidasyonu yalnız O₂ ile birleşme diye tanımlama.",
        check: "Atom türü Fe kalır; yalnız elektron durumu değişir.",
      },
      {
        prompt:
          "Aerobik ilk nitrifikasyon basamağı NH₄⁺ +1,5 O₂ → NO₂⁻ +2 H⁺ +H₂O. 4 mol NH₄⁺ bütünüyle işlenirse O₂ tüketimi kaç moldür?",
        correct: "6",
        wrong: [
          ["2", "0,5 katsayısı ikinci nitrit→nitrat basamağına aittir."],
          ["4", "Her amonyum başına 1 değil 1,5 mol O₂ gerekir."],
          ["8", "2 katsayısı iki basamağın toplamına aittir."],
          ["0", "Denklem O₂’nin giren olduğunu açıkça gösterir."],
        ],
        knowledge: ["Dengeli denklemdeki mol oranı miktar hesabını kurar."],
        strategy: "İşlenen miktarı verilen 1,5 katsayısıyla çarp.",
        steps: [
          "4 mol NH₄⁺ işleniyor.",
          "O₂=4×1,5=6 mol olur.",
          "O₂ tüketilir; nitritte 4 mol N korunur.",
        ],
        reason:
          "4 mol NH₄⁺ işleniyor. O₂=4×1,5=6 mol olur. O₂ tüketilir; nitritte 4 mol N korunur.",
        commonError: "Birinci ve ikinci basamağın katsayılarını karıştırma.",
        check: "Sonuç oranı 6/4=1,5 olmalıdır.",
      },
      {
        prompt:
          "NO₂⁻ +0,5 O₂ → NO₃⁻ denklemine göre 6 mol nitrit bütünüyle işleniyor. Hangi çift doğrudur?",
        correct: "3 mol O₂ tüketilir, 6 mol nitrat oluşur",
        wrong: [
          [
            "6 mol O₂ tüketilir, 3 mol nitrat oluşur",
            "İki oran ters uygulanmıştır.",
          ],
          [
            "3 mol O₂ üretilir, 6 mol nitrat oluşur",
            "O₂ denklemde giren olduğundan üretilmez.",
          ],
          [
            "9 mol O₂ tüketilir, 6 mol N₂ oluşur",
            "İlk nitrifikasyon oranı ve yanlış azot ürünü birlikte kullanılmıştır.",
          ],
          [
            "O₂ tüketilmez, yalnız N₂ bağlanır",
            "Bu basamak N₂ bağlama değildir; nitrit oksidasyonudur.",
          ],
        ],
        knowledge: [
          "Bir nitritin bir N atomu bir nitrata geçer; O₂ oranı 0,5’tir.",
        ],
        strategy: "Azot ürünü ve O₂ gereksinimini iki ayrı hesapla.",
        steps: [
          "6 mol nitrit 6 mol nitrata dönüşür.",
          "O₂=6×0,5=3 mol tüketilir.",
          "Azot miktarı 6 mol N olarak korunur.",
        ],
        reason:
          "6 mol nitrit 6 mol nitrata dönüşür. O₂=6×0,5=3 mol tüketilir. Azot miktarı 6 mol N olarak korunur.",
        commonError: "Nitrat oluşumunu atmosferik N₂ bağlama sanma.",
        check: "Giriş ve çıkış azot atomları eşit olmalıdır.",
      },
      {
        prompt:
          "Başlangıçta yalnız 5 mol N amonyumda. 3 mol N nitrite, bunun 2 mol N’si nitrata ilerliyor; başka giriş/çıkış yok. Son amonyum–nitrit–nitrat miktarları?",
        correct: "2–1–2 mol N",
        wrong: [
          [
            "2–3–2 mol N",
            "Nitritten nitrata geçen 2, nitrit deposundan çıkarılmamıştır.",
          ],
          [
            "5–3–2 mol N",
            "Aktarılan azot başlangıç deposundan eksiltilmemiştir.",
          ],
          [
            "0–0–5 mol N",
            "Başlangıçtaki bütün azotun son basamağı geçtiği verilmemiştir.",
          ],
          ["3–2–1 mol N", "Verilen akışlar son depo miktarı gibi okunmuştur."],
        ],
        knowledge: [
          "Kapalı depolar arasında aktarılan atomun toplam miktarı korunur.",
        ],
        strategy: "Önce her depoya giriş ve çıkışı yaz.",
        steps: [
          "Amonyum=5−3=2.",
          "Nitrit=3−2=1 ve nitrat=2.",
          "2+1+2=5 mol N başlangıçla eşittir.",
        ],
        reason:
          "Amonyum=5−3=2. Nitrit=3−2=1 ve nitrat=2. 2+1+2=5 mol N başlangıçla eşittir.",
        commonError: "Akış miktarı ile son stok miktarını karıştırma.",
        check: "Üç depo toplamı 5 olmalıdır.",
      },
      {
        prompt:
          "Aşağıdaki oklardan hangisi nitrifikasyonun temel yönünü gösterir?",
        correct: "NH₄⁺ → NO₂⁻ → NO₃⁻",
        wrong: [
          ["N₂ → NH₃", "Bu azot bağlamanın indirgenme yönüdür."],
          ["NO₃⁻ → N₂", "Bu seçili denitrifikasyon yönüdür."],
          ["Glikoz → laktat", "Bu laktat fermantasyonuyla ilgilidir."],
          [
            "Fe³⁺ → Fe²⁺",
            "Bu demirin indirgenmesidir, azot dönüşümü değildir.",
          ],
        ],
        knowledge: [
          "Azot döngüsü yolları başlangıç maddesi ve elektron yönüyle ayrılır.",
        ],
        strategy:
          "Amonyumdan daha oksitlenmiş azot biçimlerine giden yolu ara.",
        steps: [
          "Nitrifikasyon amonyum/amonyak oksidasyonuyla başlar.",
          "Nitrit ara, nitrat daha sonraki üründür.",
          "NH₄⁺→NO₂⁻→NO₃⁻ uygun sıradır.",
        ],
        reason:
          "Nitrifikasyon amonyum/amonyak oksidasyonuyla başlar. Nitrit ara, nitrat daha sonraki üründür. NH₄⁺→NO₂⁻→NO₃⁻ uygun sıradır.",
        commonError: "Azot içeren her dönüşüme azot bağlama deme.",
        check: "Bu yolda atmosferik N₂ başlangıç değildir.",
      },
      {
        prompt:
          "Karanlıkta aerobik nitrifikasyonla enerji sağlayan kemoototrof için hangisi doğrudur?",
        correct:
          "CO₂’den organik madde yaparken su fotoliziyle O₂ üretmesi gerekmez",
        wrong: [
          [
            "Işık olmadan kesin hiçbir ATP sentezleyemez",
            "Enerji girdisi kimyasal redokstur, ışık zorunlu değildir.",
          ],
          ["CO₂’nin karbonunu O₂ molekülünden alır", "O₂ karbon içermez."],
          [
            "Nitrifikasyonun her iki basamağı O₂ üretir",
            "Verilen aerobik basamaklar O₂ tüketir.",
          ],
          [
            "Kemosentez mutlaka kloroplastta olur",
            "Bu örnek prokaryot mikroorganizmadır; kloroplast zorunlu değildir.",
          ],
        ],
        knowledge: [
          "Oksijenli fotosentezdeki su fotolizi, bütün ototrof üretimin ortak basamağı değildir.",
        ],
        strategy: "Enerji sağlama ile karbon özümlemesini ayır.",
        steps: [
          "Nitrifikasyon kimyasal enerji sağlar.",
          "CO₂ özümlemesi ATP ve indirgeme gücü kullanır.",
          "Bu yolun tanımı su fotoliziyle O₂ üretimini içermez.",
        ],
        reason:
          "Nitrifikasyon kimyasal enerji sağlar. CO₂ özümlemesi ATP ve indirgeme gücü kullanır. Bu yolun tanımı su fotoliziyle O₂ üretimini içermez.",
        commonError:
          "Fotosentez toplam denklemini aynen kemosenteze kopyalama.",
        check: "Aerobik nitrifikasyon denklemlerinde O₂ girendir.",
      },
      {
        prompt:
          "H₂S kullanan bir fototrofta ilk enerji girdisi ışık; başka bir kemolitotrofta H₂S’nin kimyasal oksidasyonu. Hangisi zorunlu ortak sonuç değildir?",
        correct: "İlk enerji girdilerinin aynı olması",
        wrong: [
          [
            "H₂S ile ilişkili elektron aktarımı bulunması",
            "İki bağlamda da H₂S elektron vericisi olarak kullanılabilir.",
          ],
          [
            "Metabolik tepkimelerde enzimlerin rol alması",
            "Her iki hücresel süreç enzimlerle yürütülür.",
          ],
          [
            "Hücrede enerji dönüşümü gerçekleşmesi",
            "İki yol da enerjinin dönüştürülmesidir.",
          ],
          [
            "Madde kullanımının tek başına enerji yolunu tanımlamaması",
            "Aynı madde farklı enerji düzenlerinde kullanılabildiğinden bu ortak ilke doğrudur.",
          ],
        ],
        knowledge: [
          "Aynı elektron vericisi farklı ilk enerji girdileriyle kullanılabilir.",
        ],
        strategy: "Kökte açıkça farklı verilen enerji girdilerini karşılaştır.",
        steps: [
          "İlk canlıda enerji girdisi ışıktır.",
          "İkincide kimyasal oksidasyonun enerji değişimidir.",
          "Bu yüzden aynı ilk enerji girdisi ortaklığı kurulamaz.",
        ],
        reason:
          "İlk canlıda enerji girdisi ışıktır. İkincide kimyasal oksidasyonun enerji değişimidir. Bu yüzden aynı ilk enerji girdisi ortaklığı kurulamaz.",
        commonError: "Madde adı aynı diye bütün metabolik yolu eşitleme.",
        check:
          "Soru ortak değildir; enzim veya elektron kullanımını reddetmez.",
      },
      {
        prompt:
          "Bir tesiste NH₄⁺ nitrata dönüştürülüyor; N₂ oluştuğu ve azotun sistemden çıktığı ölçülmemiş. En uygun sonuç hangisidir?",
        correct:
          "Azotun biçimi değişmiştir; tüm azotun uzaklaştırıldığı bu veriyle söylenemez",
        wrong: [
          [
            "Bütün azot kesin N₂ olup havaya uçmuştur",
            "Nitrifikasyon ürünü nitrat; N₂ çıkışı verilmemiştir.",
          ],
          [
            "Başlangıç azotu yoktan çoğalmıştır",
            "Biçim dönüşümü azot atomu yaratmaz.",
          ],
          [
            "Bu işlem kesin fotosentezdir",
            "Azot oksidasyonu ışık uyarımıyla özdeş değildir.",
          ],
          [
            "Nitrat hiçbir canlı tarafından kullanılamaz",
            "Nitrat bazı canlılar için azot kaynağı olabilir.",
          ],
        ],
        knowledge: [
          "Bir elementin kimyasal biçimini değiştirmek ile sistemden uzaklaştırmak farklıdır.",
        ],
        strategy: "Verilen ürünün sistem içinde kalıp kalmadığını sorgula.",
        steps: [
          "Ölçülen ürün nitrattır.",
          "Nitrattaki azot hâlâ bir azot stokudur.",
          "N₂ veya başka çıkış gösterilmeden tam uzaklaştırma sonucu kurulamaz.",
        ],
        reason:
          "Ölçülen ürün nitrattır. Nitrattaki azot hâlâ bir azot stokudur. N₂ veya başka çıkış gösterilmeden tam uzaklaştırma sonucu kurulamaz.",
        commonError: "Arıtma sözcüğünden otomatik tam madde yokluğu çıkarma.",
        check: "Azotun depolarını ve sınır dışı akışını ayrı say.",
      },
      {
        prompt:
          "Bir çalışmada CO₂ işareti yeni organik maddede bulunuyor; enerji NH₄⁺ oksidasyonundan sağlanıyor ve ışık yok. Hangi yorum desteklenir?",
        correct: "Kimyasal enerjiyle inorganik karbon özümlemesi",
        wrong: [
          [
            "CO₂ organik maddeye hiç katılmamıştır",
            "İşaretin yeni organik maddede bulunması bu seçeneğin tersine kanıttır.",
          ],
          ["Işık ilk enerji girdisidir", "Kökte ışık olmadığı belirtilmiştir."],
          [
            "ATP ve elektron aktarımı mutlaka yoktur",
            "Kimyasal enerji kazanımı bunların yokluğunu gerektirmez.",
          ],
          [
            "Hücrenin karbon kaynağı yalnız hazır glikozdur",
            "Veri yeni organik karbonun CO₂’den geldiğini gösterir.",
          ],
        ],
        knowledge: ["İşaretli atom, maddenin kaynağını izlemeye yarar."],
        strategy: "Karbon izini enerji yolundan ayrı bul, sonra birleştir.",
        steps: [
          "Karbon işareti CO₂’den yeni organik ürüne geçmiştir.",
          "Enerji girdisi NH₄⁺ oksidasyonudur.",
          "Birlikte kimyasal enerjiye dayalı ototrof üretimi destekler.",
        ],
        reason:
          "Karbon işareti CO₂’den yeni organik ürüne geçmiştir. Enerji girdisi NH₄⁺ oksidasyonudur. Birlikte kimyasal enerjiye dayalı ototrof üretimi destekler.",
        commonError:
          "Işık yokluğunu tek başına yeterli kanıt sayma; karbon izi de gerekir.",
        check:
          "Ürün yeni sentezlenmiş ve hazır organik karbon etkisi kontrol edilmiş kabul edilir.",
      },
      {
        prompt:
          "Kapalı modelde 10 dakikada 6 mmol N, amonyumdan nitrite aktarılıyor; başka süreç yok. Ortalama azot aktarım hızı nedir?",
        correct: "0,6 mmol N/dakika",
        wrong: [
          ["6 mmol N/dakika", "Bu toplam miktarı süreye bölmeden hız sayar."],
          ["60 mmol N/dakika", "Süreyle çarpmak yerine bölmek gerekir."],
          ["10 mmol N/dakika", "Bu süre değerini miktar gibi kullanır."],
          ["0 mmol N/dakika", "Pozitif aktarım verisi vardır."],
        ],
        knowledge: ["Ortalama hız, aktarılan miktarın geçen süreye bölümüdür."],
        strategy: "Miktarın birimini koruyup zamanı paydaya yaz.",
        steps: [
          "Toplam aktarım 6 mmol N.",
          "Geçen süre 10 dakika.",
          "6/10=0,6 mmol N/dakika.",
        ],
        reason:
          "Toplam aktarım 6 mmol N. Geçen süre 10 dakika. 6/10=0,6 mmol N/dakika.",
        commonError: "Toplam stok veya akışı zaman başına değerle karıştırma.",
        check: "0,6×10=6 geri kontrolü verir.",
      },
      {
        prompt:
          "Organik atıktan biyogaz oluşumunda hidroliz, fermantasyon ve metanojenik adımlar birlikte görülüyor. Hangisi uygundur?",
        correct:
          "Bütün süreci tek bir kemosentez tepkimesi saymak doğru değildir",
        wrong: [
          [
            "Metanojenlerin hepsi bakteri olarak sınıflanır",
            "Metanojenler arke grubundadır.",
          ],
          [
            "Fermantasyon zorunlu olarak kloroplast ister",
            "Fermantasyon için kloroplast zorunlu değildir.",
          ],
          [
            "Metan üretmek ile metan oksitlemek aynı yöndür",
            "Bunlar farklı madde dönüşümü yönleridir.",
          ],
          [
            "Her arke yalnız kaynar suda yaşayabilir",
            "Arkelerin tamamı aynı ekstrem koşulla sınırlı değildir.",
          ],
        ],
        knowledge: [
          "Mikrobiyal sistemlerde farklı türlerin farklı basamakları birleşebilir.",
        ],
        strategy: "Her adımı kendi enerji ve karbon yoluyla tanımla.",
        steps: [
          "Hidroliz, fermantasyon ve metan oluşumu ayrı işlevlerdir.",
          "Birlikte biyogaz sistemine katkı sağlayabilirler.",
          "Bu yüzden hepsine tek kemosentez olayı demek ayrımları siler.",
        ],
        reason:
          "Hidroliz, fermantasyon ve metan oluşumu ayrı işlevlerdir. Birlikte biyogaz sistemine katkı sağlayabilirler. Bu yüzden hepsine tek kemosentez olayı demek ayrımları siler.",
        commonError: "Uygulama adını tek hücresel mekanizma sanma.",
        check:
          "Metanojen arke ile metan oksitleyen canlının yönü ayrı tutulur.",
      },
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 PDF64–65; OGM Kemosentez sunu 047 ve özet 014; Dersler Cepte Enerji 16–17. Nitrifikasyon, O₂ bilançosu ve enerji/karbon ayrımı kaynak çelişkileri düzeltilerek hazırlanmış özgün öğretim ve sorular.",
  },
  {
    id: "solunum-oksijenli-bilanco",
    topic: "detail-338",
    title: "Oksijenli solunum: karbon, elektron ve ATP yolculuğu",
    minutes: 110,
    objectives: [
      "Glikoliz, piruvat oksidasyonu, Krebs ve ETS’yi yer, girdi ve ürünleriyle sırala.",
      "Bir glikozun karbon, NADH/FADH₂ ve net ATP bilançosunu koşullarıyla hesapla.",
      "Elektron akışını proton farkı ve ATP sentazın gerçek yönüyle bağla.",
      "Mekik, farklı yakıt ve deney verilerini genellemelerin sınırını koruyarak yorumla.",
    ],
    sections: [
      {
        title: "Nefes almak ile hücresel dönüşümü ayır",
        paragraphs: [
          "Nefes almak havayı solunum yüzeyine ulaştırır; hücresel solunum ise hücre içinde kimyasal dönüşümlerle ATP sentezine enerji sağlar. Tek hücreli bir canlı akciğeri olmadan hücresel solunum yapabilir. Yeşil bir bitki de yalnız besin üretmez, ürettiği veya depoladığı organik maddeleri kendi hücrelerinin işlerinde kullanır.",
          "Oksijenli solunumda uygun organik maddelerden gelen elektronların son alıcısı O₂’dir. Glikozun tam oksidasyonu için sade toplam denklem C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O biçiminde yazılır. Bu tek adımda gerçekleşen yanma değildir; kontrollü birçok basamağın toplamıdır. Her basamakta ATP yapılmaz; toplam serbest enerji değişiminin bir bölümü ATP sentezine bağlanırken bir bölümü ısıya dönüşür.",
        ],
      },
      {
        title: "Molekülün üç ayrı izini sür",
        paragraphs: [
          "Bir glikozu izlerken üç ayrı defter tut. Karbon defteri, altı karbonun hangi organik ara ürün veya CO₂ içinde olduğunu gösterir. Elektron defteri, oksidasyon sırasında elektronların NAD⁺ ve FAD gibi taşıyıcılara, sonra ETS’ye nasıl geçtiğini gösterir. ATP defteri ise nerede yatırım yapıldığını, nerede doğrudan veya zarla eşlenmiş kazanç oluştuğunu ayırır.",
          "Bu defterler birbirine bağlıdır ama özdeş değildir. CO₂ oluşması her zaman aynı basamakta O₂ tüketildiği anlamına gelmez; oksijenli solunumun son O₂ indirgenmesi ETS ucundadır. NADH oluşumu da o anda ATP’nin kesin aynı sayıda üretildiği demek değildir. Adım adım okurken her oka karbon, elektron ya da enerji aktarımı anlamını ver.",
        ],
      },
      {
        title: "Mitokondriyi dört bölme üzerinden tanı",
        paragraphs: [
          "Mitokondrinin dış zarı organeli çevreler; iç zarı matriksi sınırlar ve krista denen kıvrımlar yapar. İki zar arasındaki dar alan zarlar arası boşluktur. İçteki matrikste piruvat oksidasyonu ve Krebs döngüsünün birçok enzimi bulunur. İç zar üzerinde ETS elemanları ve ATP sentaz yer alır; kıvrımlar işlevsel yüzeye katkı verir.",
          "Mitokondrinin kendi DNA’sı, RNA’sı ve ribozomları vardır; ancak bütün proteinlerini bağımsız üretmez, çekirdek kodlu birçok protein dışarıdan gelir. Hücrenin gereksinimine göre mitokondri miktarı, biçimi ve ağ yapısı değişebilir. Enerji gereksinimi yüksek doku örneği önemli bir ilişkidir; tek bir şekilden bütün hücrelerde aynı sayı ve biçim olduğu çıkarılmaz.",
        ],
      },
      {
        title: "Hangi evre hangi bölmede?",
        paragraphs: [
          "Kanonik ökaryot glikoz yolunda glikoliz sitozolde gerçekleşir. Piruvat mitokondriye taşındıktan sonra bağlantı tepkimesiyle asetil-CoA’ya dönüşür; Krebs döngüsü matrikste yürür. ETS ve ATP sentaz iç zar üzerinde çalışır. Protonlar iç zarın iki tarafı arasında dağıldığından matriks ile zarlar arası boşluk ayrı tutulmalıdır.",
          "Prokaryot hücrede mitokondri yoktur. Çözünebilir basamaklar sitoplazmada, solunum ETS’si uygun hücre zarında yer alır. Mezozom adı verilen eski görüntüleri zorunlu solunum organeli olarak ezberleme. Yolun bir hücrede bulunmasını bir organelin bütün canlılarda bulunmasıyla karıştırma; yer sorusunda önce hücre tipini belirle.",
        ],
      },
      {
        title: "NAD⁺ ve FAD elektron yükünü taşır",
        paragraphs: [
          "Organik ara ürün oksitlenirken ayrılan elektronlar uygun koenzimlere aktarılır. NAD⁺ indirgenince NADH; FAD indirgenince FADH₂ oluşur. Bunlar elektron ve enerji aktarımına aracılık eder; karbonu CO₂ gibi dışarı atan ürünlerle aynı şey değildir. Taşıyıcılar sonra yeniden oksitlenerek kullanılabilir biçime dönebilir.",
          "NADH veya FADH₂’yi yalnız “ATP’nin başka yazılışı” olarak düşünme. Bunların taşıdığı elektronlar farklı girişlerden ETS’ye katılabilir ve proton taşınmasına katkıları farklı olabilir. Bu nedenle bir NADH ile bir FADH₂ için her durumda aynı ATP sayısı kullanılmaz. Sayısal soru, kabul edilen P/O oranını ya da toplam ATP modelini açıkça verir.",
        ],
      },
      {
        title: "Glikoliz: yatırım ile başlar",
        paragraphs: [
          "Glikoliz, bir glikozun iki adet üç karbonlu piruvata kadar parçalandığı enzimli tepkimeler dizisidir. Kanonik serbest glikoz yolunun başlangıcında iki ATP yatırımı yapılır. Fosfatlanma ve yeniden düzenleme, daha sonraki bölünme ve enerji kazanımına hazırlık sağlar. Glikozun altı karbonu, bu evrenin sonunda iki piruvatta korunur.",
          "Bu basamak O₂’yi doğrudan kullanmaz ve CO₂ çıkarmaz. Yol, oksijenli metabolizmanın yanında uygun fermantasyon veya anaerobik yollarda da kullanılabilir. Glikolizin yaygın ve korunmuş olması bütün canlıların bütün gen dizilerinin ve enzimlerinin birebir aynı olduğu anlamına gelmez. Bu ünitedeki miktarlar açıkça kanonik bir glikoz yolu içindir.",
        ],
      },
      {
        title: "Glikolizin geri ödemesi ve net kazancı",
        paragraphs: [
          "Geri ödeme bölümünde fosfatlı ara ürünlerden ADP’ye doğrudan fosfat aktarılır; buna substrat düzeyinde fosforilasyon denir. Bir serbest glikoz başına toplam dört ATP üretilir, başlangıçtaki iki ATP çıkarılınca net kazanç iki ATP’dir. Ayrıca iki NADH oluşur ve iki piruvat elde edilir.",
          "Brüt dört ile net iki farklı soruların cevaplarıdır. Üç glikoz için brüt on iki, yatırım altı, net altı ATP olur. Bu sayılar mol glikozla veriliyorsa mol ATP, molekül sayısıyla veriliyorsa molekül sayısı olarak yorumlanır. Molekül ile molü aynı cümlede dönüşüm vermeden birbirine eşitleme; oran aynı olsa da niceliklerin ölçeği farklıdır.",
        ],
      },
      {
        title: "Piruvatı asetil-CoA’ya hazırla",
        paragraphs: [
          "Üç karbonlu her piruvat, oksidatif dekarboksilasyonla bir CO₂ kaybedip iki karbonlu asetil grubuna dönüşür. Ayrılan elektronlar NAD⁺’ı indirger; asetil grubu koenzim A’ya bağlanarak asetil-CoA oluşturur. Bir glikoz iki piruvat verdiği için bağlantı basamağının toplamı iki CO₂, iki NADH ve iki asetil-CoA’dır.",
          "Bu basamakta doğrudan ATP üretimi sayılmaz. Piruvat dehidrogenaz tepkimesi O₂’yi doğrudan giren madde olarak kullanmaz; fakat sürekli aerobik işleyiş NAD⁺ yenilenmesine dolaylı olarak bağlıdır. Başka metabolik yollarda da asetil-CoA oluşabileceğinden, yalnız asetil-CoA görmek ortamda O₂ bulunduğunun bütün canlılar için kesin kanıtı değildir.",
        ],
      },
      {
        title: "Krebs döngüsünde kabul edici yenilenir",
        paragraphs: [
          "İki karbonlu asetil, dört karbonlu oksaloasetatla birleşerek altı karbonlu sitrat oluşturur. Ardışık oksidasyon ve dekarboksilasyon tepkimeleri sırasında karbon ve elektron ürünleri ayrılır; dört karbonlu kabul edici yeniden oluşur. Yenilendiği için aynı kabul edici, uygun koşullarda sonraki asetil grubunu da alabilir.",
          "Bir tur için net iki CO₂, üç NADH, bir FADH₂ ve bir ATP veya GTP eşdeğeri elde edilir. Glikoz başına iki asetil geldiğinden iki tur gerekir. Bu net karbon bilançosu, yeni giren asetilin karbonlarının ilk turda hemen çıkan iki CO₂’nin karbonları olduğu iddiasıyla aynı değildir; izotopların ilk turdaki yerleri daha ayrıntılı izleme gerektirir.",
        ],
      },
      {
        title: "İki turun defterini kapat",
        paragraphs: [
          "Bir glikozun iki Krebs turu net dört CO₂, altı NADH, iki FADH₂ ve iki ATP eşdeğeri üretir. Bağlantı basamağındaki iki CO₂ de eklenince toplam altı CO₂ olur; bunlar başlangıç glikozunun altı karbonuna karşılık gelen net tam oksidasyon bilançosudur. Glikolizde CO₂ oluşmadığını bu karşılaştırmayla yeniden görebilirsin.",
          "Glikolizden iki, bağlantıdan iki, Krebs’ten altı NADH geldiği için toplam on NADH eşdeğeri; ayrıca iki FADH₂ vardır. Doğrudan substrat düzeyindeki net ATP eşdeğeri glikolizden iki, Krebs’ten iki olmak üzere dörttür. Bunlar evrelerde üretilen miktarların defteridir; aynı anda hücrede serbest duran ve hiç kullanılmamış havuz miktarı gibi okunmaz.",
        ],
      },
      {
        title: "ETS’de oksijen son alıcıdır",
        paragraphs: [
          "NADH ve FADH₂’den gelen elektronlar bir dizi taşıyıcıya aktarılır. Elektronların uygun redoks çiftleri boyunca ilerlemesinden sağlanan enerji iç zar üzerinden proton taşınmasına bağlanır. O₂, zincirin sonunda elektronları alır; protonlarla birlikte su oluşumuna katılır. Oksijenin görevi karbonu doğrudan CO₂’ye dönüştüren her basamağa girmek değildir.",
          "ETS elemanlarının tümü doğrudan ATP sentezlemez. Elektron akışı ile ATP üretimi arasına zar boyunca kurulan proton itici gücü yerleştir. O₂ tükenirse sürekli aerobik elektron akışı sürdürülemez; indirgenmiş taşıyıcıların yeniden oksitlenmesi ve önceki yolların devamı da etkilenir. Glikolizin anlık O₂ gerektirmemesi, bütün aerobik zincirin O₂’den bağımsız olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Protonlar dışa pompalanır, matrikse geri döner",
        paragraphs: [
          "Mitokondride ETS etkinliği protonların matriksten zarlar arası boşluğa taşınmasına katkı sağlar. Böylece iç zarın iki tarafında hem derişim hem elektriksel yük bileşeni olan elektrokimyasal fark oluşur. Protonların bu fark yönünde geri akışı, iç zarın ATP sentaz kompleksinde ATP sentezine bağlanabilir.",
          "ATP sentazın ATP oluşturan baş kısmı matriks tarafına bakar; modelde protonun geri dönüş oku matrikse yönelir. Elektronun ETS boyunca yönüyle protonun zarı geçiş yönü aynı çizgi değildir. Zar bütünlüğü veya eşleme bozulursa elektron aktarımı ile ATP verimi ayrışabilir. Şekilde her oku önce hangi taneciği taşıdığına göre adlandır.",
        ],
      },
      {
        title: "Sitozolik NADH’ın kendisi iç zarı geçmez",
        paragraphs: [
          "Glikolizin NADH’ı sitozolde oluşur. Mitokondri iç zarı bu NADH molekülünü doğrudan içeri geçirmek zorunda değildir; elektron eşdeğerleri mekik sistemleriyle aktarılır. Malat–aspartat mekik yolu ile gliserol fosfat mekik yolu elektronların ETS’ye katılımını farklılaştırabilir. Bu fark, okul düzeyindeki iki farklı ATP toplamını açıklar.",
          "NADH’ın fiziksel olarak bütün hâliyle zarı geçtiğini çizmek bu mekanizmayı yanlış öğretir. Modelin kesikli taşıma oku “elektron eşdeğeri” olarak adlandırılır; piruvatın taşınma oku ayrı tutulur. Gerçek hücrede mekik kullanımı ve miktarı koşullara bağlıdır; bir doku adına bakıp hiçbir istisnası olmayan sabit ATP hükmü verme.",
        ],
      },
      {
        title: "30 ve 32 yaklaşık öğretim hesaplarıdır",
        paragraphs: [
          "Sık kullanılan hesapta uygun mitokondri NADH’ı başına yaklaşık 2,5, FADH₂ girişi başına yaklaşık 1,5 ATP alınır. Sitozolik iki NADH eşdeğerinin de 2,5 üzerinden katıldığı varsayımda oksidatif kazanç 28, substrat düzeyinde net kazanç 4 ve toplam 32 olur. Diğer mekik kabulünde oksidatif 26 ve toplam 30 bulunur.",
          "Bu sayılar bütün canlılarda her gerçek glikoz molekülünün değişmez ATP çıktısı değildir. Zar sızıntısı, taşıma maliyeti, başka hücresel işler ve kullanılan yol verimi etkiler. Soruda 30–32 modeli verilmişse onun varsayımıyla hesap yap; verilmeden evrensel kesin sayıya dönüştürme. Net su denklemini de bütün ara basamakların su kullanımını tek bir Krebs adımına yığarak açıklama.",
        ],
      },
      {
        title: "Başka besinler farklı noktalardan katılır",
        paragraphs: [
          "Karbonhidratların sindirimi ve dönüşümleri uygun monosakkaritleri metabolik yola sağlar; bütün karbonhidratların tek yapı taşı yalnız glikoz değildir. Trigliseritten gelen gliserol uygun ara ürünlere dönüştürülebilir. Yağ asitlerinin β-oksidasyonu asetil-CoA ile indirgenmiş taşıyıcılar sağlar; yağ asidi doğrudan glikolizde altı karbonlu glikoz gibi başlamaz.",
          "Amino asitlerde azotun uzaklaştırılması ve karbon iskeletinin işlenmesi gerekir. Giriş noktası yalnız toplam karbon sayısından değil, molekül yapısı ve enzim yolundan belirlenir. Karbon iskeleti piruvat, asetil-CoA veya döngü ara ürünleriyle ilişkilendirilebilir. Kullanılan yakıtın sırası da dokuya ve beslenme/egzersiz koşuluna bağlıdır; “her hücre önce tüm karbonhidratı bitirir” zorunluluğu yoktur.",
        ],
      },
      {
        title: "Çimlenen tohum bir gaz ölçeri hareket ettirir",
        paragraphs: [
          "Çimlenen tohum metabolik enerji gereksinimi nedeniyle solunum yapar. Kapalı respirometrede O₂ tüketilirken CO₂ oluşabilir. CO₂ ayrı bölmedeki tutucu tarafından bağlanırsa gaz hacmindeki azalma O₂ tüketimini izlemeye yardımcı olur. Kılcal borudaki renkli sıvı bu hacim/basınç değişimine tepki verir; renkli sıvının kendisi ATP ölçmez.",
          "Bu yorum için sıcaklık ve dış basıncın sabitliği, sızdırmazlık, uygun gaz hacmi ve CO₂’nin tutulması kontrol edilir. Boş veya canlı olmayan örnekli kontrol düzenekleri fiziksel değişimleri ayırt etmeye yardımcı olur. CO₂ tutulmadan toplam gaz hacminin sabit kalması, O₂ hiç tüketilmiyor sonucunu tek başına vermez. Deneyin iddiasını kimyasal ve fiziksel koşullarıyla kur.",
        ],
      },
      {
        title: "Bitki hücresinde de yol sürer",
        paragraphs: [
          "Yeşil bitki hücreleri ışık altında fotosentez yaparken solunum da yapabilir. Kök, çimlenen tohum ve fotosentez yapmayan dokular da ATP gereksinimlerini uygun metabolik yollardan sağlar. Mitokondriyal solunum gece gündüz uygun girdilerle sürer; fotosentezin varlığı ATP isteyen bütün hücresel işlerin doğrudan kloroplasttan beslendiği anlamına gelmez.",
          "Net gaz alışverişi iki olayın farkına bağlıdır. Işıkta net CO₂ alımı görmen solunumun durduğu anlamına gelmez; karanlıkta fotosentetik üretimin azalması, bitkinin bütün metabolizmasının durması değildir. Bu ünitede ayrıntılarını öğrendiğin solunum yolunu sonraki karşılaştırma ünitesinde fotosentezle madde ve enerji ölçeğinde birleştireceksin.",
        ],
      },
      {
        title: "Bilanço sorusunda son kontrolü kendin yap",
        paragraphs: [
          "Önce başlangıç maddesini ve ölçeği belirle: glikoz mu asetil-CoA mı, bir molekül mü bir mol mü? Sonra evreyi seç: glikoliz, bağlantı, tek Krebs turu veya bütün yol. Brüt ATP üretimi ile net kazancı; üretilen NADH toplamı ile o anda kalan NADH havuzunu ayrı yaz. Bu küçük düzen, büyük sayıların çoğundaki hata kaynağını giderir.",
          "Son kontrolde karbonun kaybolmadığını, ATP yatırımının çıkarıldığını ve O₂’nin doğru basamakta son alıcı olduğunu denetle. Bir mekanizma sorusunda ise yer → elektron yolu → proton farkı → ATP sentaz zincirini kur. Etkileşimli modelin O₂ kesintisi seçeneği bütün hücrenin uzun süreli alternatif metabolizmasını simüle etmez; aerobik referans bilanço ile sürdürülebilir koşulu ayrı gösterir.",
        ],
      },
    ],
    examples: [
      {
        title: "Üç glikozun glikoliz defteri",
        prompt:
          "Kanonik serbest glikoz yolu için glikoz başına 4 ATP üretilir, 2 ATP harcanır. 3 glikozda brüt, yatırım ve net ATP?",
        strategy: "Üç değeri ayrı hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Brüt üretim 3×4=12 ATP.",
          },
          {
            label: "2. adım",
            explanation: "Yatırım 3×2=6 ATP.",
          },
          {
            label: "3. adım",
            explanation: "Net kazanç 12−6=6 ATP.",
          },
        ],
        answer: "12 brüt, 6 yatırım, 6 net ATP",
        check: "Net 3×2=6 ile aynı bulunur.",
        pitfall: "Brüt 12’yi net kazanç olarak kullanma.",
      },
      {
        title: "İki glikoz, dört Krebs turu",
        prompt:
          "Bir Krebs turu 2 CO₂, 3 NADH, 1 FADH₂ ve 1 ATP eşdeğeri verir. 2 glikozun asetilleri tam döngüye giriyor. Döngü ürünleri?",
        strategy: "Önce glikozdan tur sayısına geç.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Bir glikoz 2 asetil verdiğinden 2 glikoz 4 tur sağlar.",
          },
          {
            label: "2. adım",
            explanation: "4 turdan 8 CO₂ ve 12 NADH çıkar.",
          },
          {
            label: "3. adım",
            explanation: "FADH₂ 4, ATP eşdeğeri 4 olur.",
          },
        ],
        answer: "8 CO₂; 12 NADH; 4 FADH₂; 4 ATP eşdeğeri",
        check: "Bağlantıdaki 4 CO₂ bu yalnız döngü hesabına eklenmez.",
        pitfall: "Glikoz sayısını tur sayısı sanma.",
      },
      {
        title: "İki karbon bağlantıda ayrılır",
        prompt:
          "Bir glikoz iki adet 3 C’lu piruvat verir. Her piruvattan bir CO₂ ayrılıp bir NADH ve 2 C’lu asetil-CoA oluşuyor. Toplam ürün?",
        strategy: "Her piruvat başına bilanço ile iki molekülü çarp.",
        steps: [
          {
            label: "1. adım",
            explanation: "2 piruvatın toplam karbonu 6’dır.",
          },
          {
            label: "2. adım",
            explanation: "2 CO₂ içinde 2 C, iki asetil grubunda 4 C kalır.",
          },
          {
            label: "3. adım",
            explanation: "Toplam 2 NADH oluşur; doğrudan ATP verilmemiştir.",
          },
        ],
        answer: "2 CO₂, 2 NADH, 2 asetil-CoA",
        check: "Karbon 6=2+4 korunur.",
        pitfall: "İki piruvatın her birini 6 C’lu sayma.",
      },
      {
        title: "32 ATP hesabının açık varsayımı",
        prompt:
          "Bir glikoz için 10 NADH ve 2 FADH₂ var. Bu modelde her NADH 2,5; her FADH₂ 1,5 ATP getiriyor. Net substrat kazancı 4 ATP. Toplam?",
        strategy: "Elektron taşıyıcı kazançlarını topla, net substratı ekle.",
        steps: [
          {
            label: "1. adım",
            explanation: "10×2,5=25 ATP eşdeğeri.",
          },
          {
            label: "2. adım",
            explanation: "2×1,5=3; oksidatif toplam 28.",
          },
          {
            label: "3. adım",
            explanation: "28+4=32 ATP eşdeğeri.",
          },
        ],
        answer: "32 ATP eşdeğeri",
        check: "Bu toplam belirli P/O ve mekik kabulündedir.",
        pitfall: "ATP yatırımını net 4’e bir daha eksiltme.",
      },
      {
        title: "Mekik değişince yalnız ilgili pay değişir",
        prompt:
          "Verilen tam glikoz referansında 8 NADH 2,5; 2 FADH₂ 1,5 ve net substrat 4 ATP var. Sitozolik 2 NADH eşdeğeri bu kez 1,5 üzerinden katılıyor. Toplam?",
        strategy: "Sitozolik iki eşdeğeri diğer sekizden ayır.",
        steps: [
          {
            label: "1. adım",
            explanation: "8×2,5=20; sitozolik pay 2×1,5=3.",
          },
          {
            label: "2. adım",
            explanation: "FADH₂ payı 2×1,5=3; oksidatif toplam 26.",
          },
          {
            label: "3. adım",
            explanation: "26+4=30 ATP eşdeğeri.",
          },
        ],
        answer: "30 ATP eşdeğeri",
        check: "32 hesabına göre fark 2×(2,5−1,5)=2’dir.",
        pitfall: "Bütün 10 NADH’ı yanlışlıkla 1,5 ile çarpma.",
      },
      {
        title: "Renkli sıvıdan O₂ hızına",
        prompt:
          "Sabit sıcaklık/basınçta sızdırmaz kapta çimlenen tohumlar var. CO₂ bütünüyle tutuluyor; başka gaz etkisi yok. 2 dakikada gaz hacmi 4 mL azaldı. Ortalama O₂ tüketim hızı?",
        strategy: "Tutulan CO₂ nedeniyle hacim farkını O₂ tüketimine bağla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Bu koşullarda 4 mL azalma O₂ tüketimini gösterir.",
          },
          {
            label: "2. adım",
            explanation: "Hız=4/2=2 mL O₂/dakika.",
          },
          {
            label: "3. adım",
            explanation:
              "Kontrol kabında fiziksel hacim değişimi olmadığı ayrıca doğrulanır.",
          },
        ],
        answer: "2 mL O₂/dakika",
        check: "Hacimden mol ATP hesaplanmaz; bu bir gaz hızıdır.",
        pitfall: "CO₂ tutucu/sıcaklık koşullarını yok sayma.",
      },
    ],
    recall: [
      {
        prompt: "Glikolizde brüt 4 ile net 2 ATP neden farklıdır?",
        answer:
          "Başlangıçta 2 ATP yatırılır; 4 üretimden bu yatırım çıkarılınca net 2 kalır.",
      },
      {
        prompt:
          "Mitokondride proton hangi yöne pompalanır ve ATP sentazdan hangi yöne döner?",
        answer:
          "Matriksten zarlar arası boşluğa taşınır; ATP sentaz üzerinden matrikse geri akış ATP sentezine bağlanır.",
      },
      {
        prompt:
          "Bir glikozun CO₂’si glikolizde mi bağlantı/Krebs’te mi oluşur?",
        answer:
          "Glikolizde oluşmaz; bağlantıda 2, iki Krebs turunda 4 olmak üzere net toplam 6 CO₂ oluşur.",
      },
      {
        prompt:
          "Sitozolik NADH ile iç zarı geçen elektron eşdeğeri neden aynı çizilmez?",
        answer:
          "NADH doğrudan iç zardan geçmez; elektronlar mekiklerle aktarılır, molekülün fiziksel rotası ayrıdır.",
      },
    ],
    items: [
      {
        prompt:
          "Kanonik ökaryot glikoz yolunda glikoliz–piruvat oksidasyonu–ETS yerlerini doğru veren sıra hangisidir?",
        correct: "Sitozol–matriks–mitokondri iç zarı",
        wrong: [
          [
            "Matriks–çekirdek–dış zar",
            "Glikoliz sitozolde, bağlantı matrikste ve ETS iç zardadır.",
          ],
          [
            "Kloroplast–lizozom–ribozom",
            "Bu organeller verilen aerobik evre yerleri değildir.",
          ],
          [
            "İç zar–sitozol–matriks",
            "Üç evrenin yeri ters ve yanlış atanmıştır.",
          ],
          [
            "Çekirdek–dış zar–Golgi",
            "Bu yerler yolun kanonik yerleri değildir.",
          ],
        ],
        knowledge: ["Evre adı kadar hücre tipi ve bölme önemlidir."],
        strategy: "Çözünebilir basamakları zar üzerindeki ETS’den ayır.",
        steps: [
          "Glikoliz sitozolde başlar.",
          "Piruvat oksidasyonu mitokondri matriksindedir.",
          "ETS elemanları mitokondri iç zarında bulunur.",
        ],
        reason:
          "Glikoliz sitozolde başlar. Piruvat oksidasyonu mitokondri matriksindedir. ETS elemanları mitokondri iç zarında bulunur.",
        commonError: "Mitokondrinin bütün içini tek bölme sayma.",
        check: "Prokaryot için aynı organel eşlemesi kullanılmaz.",
      },
      {
        prompt:
          "Serbest glikoz başına glikolizde 4 ATP üretiliyor, 2 ATP harcanıyor. 3 glikoz için net kazanç nedir?",
        correct: "6 ATP",
        wrong: [
          ["12 ATP", "Bu brüt üretimdir; yatırım çıkarılmamıştır."],
          ["3 ATP", "Glikoz sayısı net ATP oranıyla çarpılmamıştır."],
          ["2 ATP", "Bu yalnız bir glikozun netidir."],
          ["18 ATP", "Üretim ile tüketim net kazanç için toplanmaz."],
        ],
        knowledge: ["Net kazanç brüt üretim eksi yatırımdır."],
        strategy: "Önce bir glikozun netini bul, sonra 3 ile çarp.",
        steps: [
          "4−2=2 ATP/glikoz.",
          "3×2=6 ATP.",
          "Brüt 12 eksi yatırım 6 da 6 verir.",
        ],
        reason:
          "4−2=2 ATP/glikoz. 3×2=6 ATP. Brüt 12 eksi yatırım 6 da 6 verir.",
        commonError: "Brüt üretimi net sanma.",
        check:
          "Başlangıç maddesi glikojen değil serbest glikoz olarak verilmiştir.",
      },
      {
        prompt:
          "İki adet 3 C’lu piruvatın her birinden bir CO₂ ayrılıyor ve 2 C’lu asetil grubu kalıyor. Toplam çıkan CO₂ ve asetil grubu sayısı nedir?",
        correct: "2 CO₂ ve 2 asetil grubu",
        wrong: [
          [
            "1 CO₂ ve 1 asetil grubu",
            "İki piruvatın yalnız biri işlenmiş gibi hesaplanmıştır.",
          ],
          [
            "4 CO₂ ve 2 asetil grubu",
            "Her piruvattan bir CO₂ çıktığı verisine aykırıdır.",
          ],
          [
            "2 CO₂ ve 4 asetil grubu",
            "Bir piruvat başına tek asetil grubu oluşur.",
          ],
          [
            "0 CO₂ ve 2 glikoz",
            "Verilen dekarboksilasyon ve ürünler yok sayılmıştır.",
          ],
        ],
        knowledge: ["Bağlantı tepkimesinde her piruvat bir karbon kaybeder."],
        strategy: "İki piruvat için aynı tek-molekül bilançosunu uygula.",
        steps: [
          "Piruvat sayısı 2’dir.",
          "Her biri 1 CO₂ ve 1 asetil verdiğinden ikisinden 2’şer çıkar.",
          "Karbon 6=2 CO₂’de 2 + asetillerde 4 olarak korunur.",
        ],
        reason:
          "Piruvat sayısı 2’dir. Her biri 1 CO₂ ve 1 asetil verdiğinden ikisinden 2’şer çıkar. Karbon 6=2 CO₂’de 2 + asetillerde 4 olarak korunur.",
        commonError: "Molekül sayısı ile karbon sayısını eşitleme.",
        check: "Her asetil 2 C taşır; 2 asetil toplam 4 C’dir.",
      },
      {
        prompt:
          "Bir Krebs turu 2 CO₂ çıkarır. Her glikoz iki asetil ile iki tur sağlar. 2 glikozun yalnız Krebs döngüsündeki toplam CO₂’si kaçtır?",
        correct: "8",
        wrong: [
          ["4", "İki glikozun dört tur sağladığı atlanmıştır."],
          [
            "12",
            "Bu iki glikozun bağlantı dahil toplam CO₂’sidir; yalnız Krebs isteniyor.",
          ],
          ["2", "Bu bir turdaki miktardır."],
          ["0", "Krebs dekarboksilasyonlarında CO₂ oluşur."],
        ],
        knowledge: ["Bir glikoz ile bir Krebs turu aynı ölçek değildir."],
        strategy: "Glikoz→tur→CO₂ dönüşümlerini sırala.",
        steps: [
          "2 glikoz 4 tur sağlar.",
          "Her tur 2 CO₂ oluşturur.",
          "4×2=8 CO₂ bulunur.",
        ],
        reason:
          "2 glikoz 4 tur sağlar. Her tur 2 CO₂ oluşturur. 4×2=8 CO₂ bulunur.",
        commonError: "Bağlantı ürününü yalnız döngü hesabına ekleme.",
        check: "Bir glikozda yalnız Krebs 4 CO₂’dir.",
      },
      {
        prompt:
          "Oksijenli solunumda O₂’nin en doğrudan ayırt edici rolü hangisidir?",
        correct: "ETS sonunda elektron alarak su oluşumuna katılması",
        wrong: [
          [
            "Glikolizde glikozun her karbonunu doğrudan koparması",
            "Glikolizde O₂ doğrudan giren değildir ve CO₂ çıkmaz.",
          ],
          [
            "Krebs’in bütün ATP’sini kendi başına sentezlemesi",
            "ATP sentezinde enzimler ve farklı eşleme yolları vardır.",
          ],
          [
            "Karbon kaynağı olarak glikozun yerini alması",
            "O₂ karbon içermez.",
          ],
          [
            "NADH’ın iç zardan fiziksel geçişini sağlaması",
            "Sitozolik NADH doğrudan iç zarı geçmez; mekik gereksinimi ayrıdır.",
          ],
        ],
        knowledge: ["Oksijenli yolun son elektron alıcısı O₂’dir."],
        strategy: "Karbon koparma ile elektron alma görevini ayır.",
        steps: [
          "Elektronlar taşıyıcılardan ETS’ye gelir.",
          "O₂ son basamakta elektronları alır.",
          "Protonlarla birlikte su oluşumuna katılır.",
        ],
        reason:
          "Elektronlar taşıyıcılardan ETS’ye gelir. O₂ son basamakta elektronları alır. Protonlarla birlikte su oluşumuna katılır.",
        commonError:
          "O₂ tüketimini her CO₂ üreten basamakta doğrudan gerçekleşmiş sayma.",
        check:
          "Karbon ürünleri ile son alıcının ürünü ayrı defterlerde izlenir.",
      },
      {
        prompt:
          "Mitokondri iç zarında ETS çalışırken proton farkı kuruluyor. ATP senteziyle eşlenen ATP sentaz akışının yönü nedir?",
        correct: "Zarlar arası boşluktan matrikse",
        wrong: [
          [
            "Matriksten yalnız çekirdeğe",
            "ATP sentaz çekirdeğe proton taşıyan bir kanal değildir.",
          ],
          [
            "Dış ortamdan doğrudan ribozoma",
            "Bu organel mekanizmasının rotası değildir.",
          ],
          [
            "Matriksten zarlar arası boşluğa",
            "Bu proton pompalamanın temel yönüdür; ATP sentezine eşlenen geri akış ters yöndedir.",
          ],
          [
            "İç zarı hiç geçmeden yalnız sitozolde",
            "Proton farkının iç zar üzerinden kullanılması göz ardı edilmiştir.",
          ],
        ],
        knowledge: [
          "ATP sentaz protonun elektrokimyasal fark yönündeki dönüşünü kullanır.",
        ],
        strategy: "Pompalama yönü ile geri dönüş yönünü ayrı çiz.",
        steps: [
          "ETS matriksten dış bölmeye proton taşınmasını destekler.",
          "Zarlar arası boşlukta proton itici gücü oluşur.",
          "ATP sentazdan matrikse dönüş ATP sentezine bağlanır.",
        ],
        reason:
          "ETS matriksten dış bölmeye proton taşınmasını destekler. Zarlar arası boşlukta proton itici gücü oluşur. ATP sentazdan matrikse dönüş ATP sentezine bağlanır.",
        commonError: "Elektron akışı oku ile proton akışını aynı ok sanma.",
        check: "ATP oluşturan başın matriks yönünde olduğu şemayla uyumludur.",
      },
      {
        prompt:
          "Bu varsayımlı tam glikoz hesabında 10 NADH’ın her biri 2,5; 2 FADH₂’nin her biri 1,5 ATP getiriyor. Net substrat kazancı 4 ATP. Toplam kaç ATP eşdeğeridir?",
        correct: "32",
        wrong: [
          ["28", "Yalnız oksidatif kazançtır; net substrat 4 eklenmemiştir."],
          [
            "30",
            "Bu verilen 10 NADH’ın tümüne 2,5 uygulanması varsayımıyla uyuşmaz.",
          ],
          ["36", "Net 4’e ayrıca verilmemiş üretim eklenmiştir."],
          ["4", "ETS/oksidatif kazanç tamamen atlanmıştır."],
        ],
        knowledge: [
          "Verilen P/O varsayımları altında taşıyıcı katkısı ve net substrat kazancı toplanır.",
        ],
        strategy: "İki taşıyıcı türünü ayrı çarp.",
        steps: [
          "10×2,5=25.",
          "2×1,5=3; oksidatif 25+3=28.",
          "28+4=32 ATP eşdeğeri.",
        ],
        reason: "10×2,5=25. 2×1,5=3; oksidatif 25+3=28. 28+4=32 ATP eşdeğeri.",
        commonError:
          "Yaklaşık öğretim katsayılarını evrensel kesin verim sayma.",
        check: "Soru yalnız verilen kayıpsız hesap varsayımını kullanır.",
      },
      {
        prompt:
          "Bir glikozda 8 NADH 2,5; sitozolik 2 NADH eşdeğeri 1,5; 2 FADH₂ 1,5 ATP getiriyor. Net substrat 4 ATP. Toplam nedir?",
        correct: "30 ATP eşdeğeri",
        wrong: [
          [
            "32 ATP eşdeğeri",
            "Sitozolik iki eşdeğer yanlışlıkla 2,5 ile çarpılmıştır.",
          ],
          [
            "26 ATP eşdeğeri",
            "Bu yalnız oksidatif katkıdır; substrat 4 eksiktir.",
          ],
          [
            "22 ATP eşdeğeri",
            "NADH alt grupları ve FADH₂ katkıları doğru toplanmamıştır.",
          ],
          ["4 ATP eşdeğeri", "Bütün oksidatif katkı atlanmıştır."],
        ],
        knowledge: [
          "Mekik değişimi sitozolik iki elektron eşdeğerinin kazancını değiştirir.",
        ],
        strategy: "Sekiz ve iki NADH grubunu karıştırmadan hesapla.",
        steps: [
          "8×2,5=20 ve 2×1,5=3.",
          "FADH₂ katkısı 2×1,5=3; oksidatif 26.",
          "26+4=30 ATP eşdeğeri.",
        ],
        reason:
          "8×2,5=20 ve 2×1,5=3. FADH₂ katkısı 2×1,5=3; oksidatif 26. 26+4=30 ATP eşdeğeri.",
        commonError: "Bütün 10 NADH’a tek düşük katsayıyı uygulama.",
        check: "Yüksek mekik hesabından fark 2 ATP’dir.",
      },
      {
        prompt:
          "Ökaryot hücrede sitozolik glikoliz NADH’ının elektronlarının mitokondri ETS’sine katılımı için hangi açıklama uygundur?",
        correct:
          "NADH doğrudan iç zarı geçmeden elektron eşdeğerleri mekiklerle aktarılabilir",
        wrong: [
          [
            "Her NADH molekülü zorunlu olarak aynı hâliyle iç zardan geçer",
            "İç zar sitozolik NADH’a doğrudan geçirgen kabul edilmez.",
          ],
          [
            "Glikolizin bütün karbonu O₂ içinde taşınır",
            "O₂ karbon taşımaz; elektron aktarımıyla ilgili soru karbon rotası değildir.",
          ],
          [
            "Sitozolik taşıyıcılar hiçbir koşulda ETS’ye katkı veremez",
            "Mekiklerin görevi bu elektron eşdeğerlerini aktarabilmektir.",
          ],
          [
            "ATP sentaz bir NADH taşıma pompasıdır",
            "ATP sentaz proton akışını ATP sentezine bağlar.",
          ],
        ],
        knowledge: [
          "Molekülün fiziksel taşınması ile elektron eşdeğerinin aktarımı farklıdır.",
        ],
        strategy: "İç zarın hangi maddeyi doğrudan geçirmediğini düşün.",
        steps: [
          "NADH sitozolde oluşur.",
          "İç zarı doğrudan geçmek yerine mekik sistemleri elektronları aktarabilir.",
          "Mekik türü ATP hesabına etki edebilir.",
        ],
        reason:
          "NADH sitozolde oluşur. İç zarı doğrudan geçmek yerine mekik sistemleri elektronları aktarabilir. Mekik türü ATP hesabına etki edebilir.",
        commonError: "Sitozoldeki NADH’ı matrikse giden tek parça okla çizme.",
        check: "Piruvatın taşınması bu elektron mekiğinden farklı bir olaydır.",
      },
      {
        prompt:
          "Glikolizde bir fosfatlı organik ara ürün fosfatını doğrudan ADP’ye veriyor. Bu ATP oluşumunun adı nedir?",
        correct: "Substrat düzeyinde fosforilasyon",
        wrong: [
          [
            "Fotofosforilasyon",
            "Soruda ışık uyarımlı fotosentetik düzenek yoktur.",
          ],
          [
            "Yalnız DNA eşlenmesi",
            "Fosfatın ADP’ye aktarımı DNA kopyalama tanımı değildir.",
          ],
          [
            "ATP sentazdan zorunlu proton dönüşü",
            "Doğrudan substrat fosfatı aktarımı için bu zar mekanizması şart değildir.",
          ],
          [
            "Karbonun oksijene dönüşmesi",
            "Element dönüşümü ve verilen tepkimeyle ilgisizdir.",
          ],
        ],
        knowledge: ["Fosfatın doğrudan kaynağı fosforilasyon türünü ayırır."],
        strategy: "ADP’ye fosfatı hangi yapının verdiğini bul.",
        steps: [
          "Verici fosfatlı organik ara üründür.",
          "Fosfat doğrudan ADP’ye aktarılır.",
          "Bu substrat düzeyinde fosforilasyondur.",
        ],
        reason:
          "Verici fosfatlı organik ara üründür. Fosfat doğrudan ADP’ye aktarılır. Bu substrat düzeyinde fosforilasyondur.",
        commonError: "Her ATP oluşumunu ETS veya ATP sentaz üzerinden sanma.",
        check: "Glikolizin net kazancı bu tür aktarımı içerir.",
      },
      {
        prompt:
          "Sızdırmaz respirometrede sabit sıcaklık/basınç var. Tohumların CO₂’si tamamen tutuluyor; başka gaz değişimi yok. 2 dakikada hacim 4 mL azalıyor. Ortalama O₂ tüketim hızı?",
        correct: "2 mL/dakika",
        wrong: [
          ["8 mL/dakika", "Miktar süreyle çarpılmış; hız için bölmek gerekir."],
          ["4 mL/dakika", "Toplam 4 mL iki dakika boyunca oluşmuştur."],
          [
            "0 mL/dakika",
            "Verilen koşullarda hacim azalması O₂ tüketimini izler.",
          ],
          [
            "2 mol ATP/dakika",
            "Gaz hacminden bu veriyle mol ATP’ye dönüşüm yapılamaz.",
          ],
        ],
        knowledge: [
          "CO₂ tutulduğunda kontrol edilmiş gaz hacmi azalması O₂ tüketimine bağlanabilir.",
        ],
        strategy: "Önce ölçülen büyüklüğü, sonra zamanı yaz.",
        steps: [
          "O₂ tüketimine karşılık gelen hacim 4 mL’dir.",
          "Süre 2 dakika olduğundan 4/2=2 mL/dakika.",
          "Bu değer ATP değil gaz tüketim hızıdır.",
        ],
        reason:
          "O₂ tüketimine karşılık gelen hacim 4 mL’dir. Süre 2 dakika olduğundan 4/2=2 mL/dakika. Bu değer ATP değil gaz tüketim hızıdır.",
        commonError: "CO₂ tutucu ve sıcaklık koşullarını sorudan düşürme.",
        check: "Kontrol kabı fiziksel hacim değişimini ayırmaya yardım eder.",
      },
      {
        prompt:
          "Trigliseritten gelen gliserol ve yağ asitlerinin solunuma katılımı için hangi açıklama uygundur?",
        correct:
          "Gliserol ara ürünlere, yağ asitleri β-oksidasyonla asetil-CoA yoluna katılabilir",
        wrong: [
          [
            "İkisi de mutlaka doğrudan altı karbonlu glikozdur",
            "Farklı yapılar glikozla özdeş değildir.",
          ],
          [
            "Yağ asidi hiçbir elektron taşıyıcısını etkileyemez",
            "β-oksidasyon indirgenmiş taşıyıcılar sağlayabilir.",
          ],
          [
            "Gliserol önce zorunlu olarak N₂’ye çevrilir",
            "Gliserol karbonlu bir bileşiktir; böyle bir zorunluluk yoktur.",
          ],
          [
            "Lipitlerin tümü ribozomda CO₂’ye parçalanır",
            "Ribozom protein senteziyle ilişkilidir; bu yıkım yeri değildir.",
          ],
        ],
        knowledge: ["Farklı besinler uygun metabolik ara ürünlerden katılır."],
        strategy: "Molekülün yapısını giriş noktasıyla eşleştir.",
        steps: [
          "Gliserol uygun dönüşümlerle üç karbonlu ara ürünlere katılabilir.",
          "Yağ asitleri β-oksidasyonla asetil-CoA sağlayabilir.",
          "Bunları tek bir glikoliz başlangıç maddesi saymak doğru değildir.",
        ],
        reason:
          "Gliserol uygun dönüşümlerle üç karbonlu ara ürünlere katılabilir. Yağ asitleri β-oksidasyonla asetil-CoA sağlayabilir. Bunları tek bir glikoliz başlangıç maddesi saymak doğru değildir.",
        commonError:
          "Her enerji verici maddenin mutlaka glikoz olarak başlamasını bekleme.",
        check:
          "Amino asit girişleri de yalnız karbon sayısıyla kesinleştirilmez.",
      },
      {
        prompt:
          "Sürekli aerobik ETS’de O₂ son alıcısı ortadan kalkıyor; alternatif yol bu deneyde yok. Hangi yorum uygundur?",
        correct: "Sürekli elektron akışı ve taşıyıcı yenilenmesi etkilenir",
        wrong: [
          [
            "Glikoliz artık doğrudan O₂ tüketmeye başlar",
            "Glikolizin kimyasal tanımı böyle değişmez.",
          ],
          [
            "Bütün hücreler zorunlu olarak aynı miktar metan üretir",
            "Alternatif tür ve yol verilmemiştir.",
          ],
          [
            "ETS hiçbir son alıcı olmadan sınırsız sürer",
            "Elektronların aktarılacağı son alıcı gereklidir.",
          ],
          [
            "O₂ yokluğu ATP’nin bütün olası sentez yollarını tanım gereği siler",
            "Substrat düzeyinde fosforilasyon gibi O₂’yi doğrudan kullanmayan yollar vardır.",
          ],
        ],
        knowledge: [
          "Bir basamağın doğrudan O₂ gereksinimi ile bütün yolun dolaylı bağımlılığı ayrı okunur.",
        ],
        strategy: "Son alıcının kaybının zincir boyunca etkisini izle.",
        steps: [
          "O₂’ye son elektron aktarımı sürdürülemez.",
          "NADH/FADH₂’nin aerobik oksitlenmesi etkilenir.",
          "Bu, önceki yolların sürekli işleyişini de sınırlayabilir.",
        ],
        reason:
          "O₂’ye son elektron aktarımı sürdürülemez. NADH/FADH₂’nin aerobik oksitlenmesi etkilenir. Bu, önceki yolların sürekli işleyişini de sınırlayabilir.",
        commonError:
          "Glikolizin anlık O₂ kullanmamasını bütün aerobik yolun bağımsızlığı sanma.",
        check: "Soru alternatif metabolizmayı modellemiyor.",
      },
      {
        prompt:
          "Krebs’te 4 C’lu oksaloasetat 2 C’lu asetili kabul ederek 6 C’lu sitrat oluşturuyor; döngü sonunda 4 C’lu kabul edici yenileniyor. Hangi sonuç doğrudur?",
        correct:
          "Kabul edici uygun koşullarda sonraki turda yeniden kullanılabilir",
        wrong: [
          [
            "Kabul edici her turda bütünüyle yok olur",
            "Kökte yenilendiği açık verilmiştir.",
          ],
          [
            "Yeni asetilin iki karbonu ilk turda zorunlu olarak çıkan iki CO₂’nin karbonudur",
            "Net bilanço, atomların ilk tur izotop rotasını tek başına vermez.",
          ],
          ["Sitrat yalnız 2 C taşır", "4+2=6 C olduğu verilmiştir."],
          [
            "Bu birleşme glikolizde doğrudan O₂ fotolizidir",
            "Bu Krebs karbon birleşmesidir; fotolizle ilgisizdir.",
          ],
        ],
        knowledge: [
          "Döngü, başlangıç kabul edicisinin yeniden oluşmasıyla devam edebilir.",
        ],
        strategy:
          "Net ürün bilançosu ile tek tek karbon atomlarının rotasını ayır.",
        steps: [
          "Oksaloasetat yeniden oluşur.",
          "Bu nedenle tekrar asetil kabul edebilir.",
          "Net CO₂ miktarı, ilk turda hangi karbonun çıktığını tek başına kanıtlamaz.",
        ],
        reason:
          "Oksaloasetat yeniden oluşur. Bu nedenle tekrar asetil kabul edebilir. Net CO₂ miktarı, ilk turda hangi karbonun çıktığını tek başına kanıtlamaz.",
        commonError:
          "Yenilenen kabul ediciyi her turda tüketilen stok gibi sayma.",
        check: "Karbon sayısı başlangıç birleşmesinde 4+2=6’dır.",
      },
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 PDF66–70 ve73; OGM Oksijenli Solunum sunu 048/özet 015, Hücresel Solunum sunu 050; Dersler Cepte Solunum 10–13; Video Hücresel Solunum seçili 2–35,55–60. Mekik, yer, net/brüt ve yaklaşık ATP koşulları düzeltilerek yazılmış özgün öğretim ve sorular.",
  },
  {
    id: "solunum-oksijensiz-alicilar",
    topic: "detail-339",
    title: "Oksijensiz solunum: son alıcı ve elektron hesabı",
    minutes: 90,
    objectives: [
      "Oksijensiz solunumu ETS ve O₂ dışı son alıcıyla tanımla.",
      "Nitrat, sülfat, Fe³⁺ ve CO₂ indirgenmesini madde ve elektron yönleriyle açıkla.",
      "Fermantasyonla karşılaştırmada süreç adı, son alıcı ve ATP yolunu ayrı kullan.",
      "Tanımlı yarı tepkimelerde elektron ve alıcı kapasitesini hesapla; ATP verimini uydurma.",
    ],
    sections: [
      {
        title: "Oksijen yokluğu tek bir yolun adı değildir",
        paragraphs: [
          "Çamur veya suya doymuş toprakta O₂ kolay tükenebilir. Buna rağmen bazı mikroorganizmalar başka maddelere elektron aktararak enerji kazanabilir. Oksijensiz, yani anaerobik solunumun ayırt edici özelliği solunumsal elektron taşıma yolunda O₂ yerine başka uygun bir son elektron alıcısının kullanılmasıdır.",
          "Sadece “ortamda oksijen yok” demek hangi yolun çalıştığını belirlemez. Fermantasyon da O₂ doğrudan kullanılmadan gerçekleşebilir; fakat burada ele aldığımız solunumsal ETS ve dış son alıcı düzeninden farklıdır. Önce elektronun hangi maddeden geldiğini, hangi yoldan geçtiğini ve sonunda hangi maddeyi indirgediğini sor. Sürecin adı bu mekanizma üzerinden konur.",
        ],
      },
      {
        title: "Verici, zincir ve son alıcıyı sırala",
        paragraphs: [
          "Elektron vericisi oksitlenir; elektronlar uygun taşıyıcılardan geçer ve son alıcı indirgenir. Verici organik bir besin veya bazı yollarda uygun inorganik madde olabilir. Son alıcı, seçilen tür ve ortamda kullanılabilen nitrat, sülfat, Fe³⁺ ya da CO₂ gibi bir madde olabilir. Hepsi aynı mikroorganizmada aynı anda kullanılmak zorunda değildir.",
          "Bu sıra enerji kazanımını açıklar: uygun redoks akışı, zar üzerindeki iyon farkı ve ATP senteziyle eşlenebilir. Bir madde adı tek başına onun verici mi alıcı mı olduğunu söylemez. Örneğin Fe²⁺’nin oksitlenmesi elektron verirken Fe³⁺’ün indirgenmesi elektron alır. Türünü ve yükünü yazmadan yalnız “demir kullanılıyor” demek yönü belirsiz bırakır.",
        ],
      },
      {
        title: "Prokaryot zarındaki enerji düzenini gör",
        paragraphs: [
          "Okul düzeyindeki başlıca örnekler bazı bakteri ve arkelerdir. Bu hücrelerde mitokondri bulunması gerekmez; solunumsal taşıyıcı ve enerji dönüştüren düzenler uygun hücre zarında yer alır. Elektron aktarımından sağlanan enerji, zarın iki tarafında iyon farkı kurmaya ve ATP sentaz üzerinden ATP sentezine bağlanabilir.",
          "Bütün anaerobik mikroorganizmaların aynı taşıyıcı protein dizisini, aynı glikoliz yolunu veya eksiksiz aynı Krebs döngüsünü kullandığı söylenmez. Hücre grupları ve enerji eşleme ayrıntıları farklı olabilir. Bu nedenle modelde seçilmiş yarı tepkimenin elektron kapasitesi gösterilir; bunun bütün bir hücrenin metabolik ağını eksiksiz simüle ettiği iddia edilmez.",
        ],
      },
      {
        title: "Nitratın indirgenmesi hangi ürüne gider?",
        paragraphs: [
          "Bazı mikroorganizmalar O₂ sınırlı koşullarda nitratı son alıcı olarak kullanabilir. Seçili denitrifikasyon yolunda nitrat, nitrit ve gaz ara ürünleri üzerinden N₂’ye kadar indirgenir. Bu yol toprağın veya suyun bağlı azotunu gaz biçiminde dışarı taşıyarak azot döngüsüne katkı sağlar.",
          "Nitrat kullanıldığı bilgisi tek başına mutlaka N₂ oluştuğunu göstermez; farklı yollar nitrit veya amonyum gibi başka ürünlere de gidebilir. Soruda son ürün belirtilmelidir. Tam N₂ yolunda nitratın N atomu +5 basamağından N₂’de 0’a iner; bir mol nitrat azotu için beş mol elektron gerekir. İki mol nitratın iki N atomu, bir mol N₂ oluşturur.",
        ],
      },
      {
        title: "Nitrifikasyonun ters yönünü ezberlemeden ayır",
        paragraphs: [
          "Nitrifikasyon amonyumun nitrit ve nitrata oksitlenmesidir; klasik aerobik örnekte O₂ tüketilir. Denitrifikasyonun seçili N₂ yolunda ise nitrat indirgenir ve gaz azot oluşur. Böylece aynı azot döngüsünde bir yol nitrat stokunu beslerken başka bir yol uygun koşullarda onu azaltabilir.",
          "Arıtma sistemlerinde bu işlevlerin farklı bölmelerde düzenlenmesi işe yarayabilir. Nitrifikasyon bölmesinin oksijen gereksinimi ile denitrifikasyon bölmesinin düşük O₂ koşulu aynı şey değildir. Her iki olayın azotla ilgili olması onları azot bağlama yapmaz. N₂’nin amonyağa indirgenmesi olan azot bağlama üçüncü ayrı işlevdir.",
        ],
      },
      {
        title: "Sülfat indirgenince kükürt biçimi değişir",
        paragraphs: [
          "Bazı anaerobik mikroorganizmalar sülfatı son elektron alıcısı olarak kullanır. Sülfatın kükürdü +6 basamağındadır; sülfürlü ürünlerde −2’ye indirgenebilir. Bu değişim bir kükürt başına sekiz elektron alınmasına karşılık gelir. Ürünün H₂S veya HS⁻ biçiminde dağılımı ortamın pH’sı gibi koşullara bağlıdır.",
          "Bataklıktaki çürük yumurta kokusu H₂S ile ilişkilendirilebilir; fakat kokuyu tanılamak için gazı soluma veya üretme deneyi yapmak güvenli değildir. Öğretimde kimyasal yön ve ekolojik rol incelenir. Sülfat indirgenmesi ile H₂S’yi oksitleyerek enerji sağlayan kemosentetik yol farklı yönlerdir; aynı kükürt elementi iki süreçte farklı başlangıç biçiminde bulunur.",
        ],
      },
      {
        title: "Demir(III) elektron alır",
        paragraphs: [
          "Fe³⁺ + e⁻ → Fe²⁺ indirgenmesi, bir demir iyonunun bir elektron almasını gösterir. Uygun ortam ve mikroorganizmalarda Fe³⁺ içeren mineraller elektron alıcısı olarak kullanılabilir. Bu dönüşümler toprak ve tortunun kimyasını, metallerin çözünürlüğünü ve başka maddelerin taşınmasını etkileyebilir.",
          "Burada son alıcı metalik demirin her biçimi değildir; yük ve kimyasal bağlam önemlidir. Kemosentez ünitesindeki Fe²⁺ → Fe³⁺ + e⁻ örneğinin elektron yönü bunun tersidir. İki modeli yan yana koyduğunda aynı ok rengini değil, elektronun giren mi çıkan mı olduğunu oku. Böylece “oksitlenme” ve “indirgenme” adlarını kör ezber yerine yük hesabıyla denetleyebilirsin.",
        ],
      },
      {
        title: "CO₂ indirgenmesi ve metanojen arke",
        paragraphs: [
          "Hidrojenotrof metanojen örneğinde H₂ elektron sağlayabilir ve CO₂ metana kadar indirgenebilir. CO₂’nin karbonu +4, metandaki karbon −4 basamağındadır; bu yarı tepkime bir mol CO₂ başına sekiz mol elektron gerektirir. Böyle bir indirgenme hesabı karbonun yok olmadığını, farklı kimyasal biçime geçtiğini gösterir.",
          "Metanojenler arkelerdir; metan yapan bütün türlerin karbon ve enerji kaynakları tek değildir. Arke enerji eşleme düzenleri klasik bakteriyel ETS ayrıntılarıyla birebir aynı kabul edilmez. Modelin CO₂→CH₄ satırı tanımlı elektron kapasitesini öğretir; bütün metan üretimini tek bir glikoz–Krebs yolu gibi çizmez. Metan üreten ile metanı oksitleyen canlının yönleri de farklıdır.",
        ],
      },
      {
        title: "Elektron hesabı için dört açık referans",
        paragraphs: [
          "Modelde nitrat→N₂ için nitrat başına 5, sülfat→sülfürlü ürün için sülfat başına 8, Fe³⁺→Fe²⁺ için demir başına 1, CO₂→CH₄ için CO₂ başına 8 mol elektron gereksinimi kullanılır. Bu katsayılar seçilen ürün ve yükseltgenme basamağı farkından gelir; yalnız kimyasal formüldeki atomları saymak değildir.",
          "Bunlar yarı tepkime kapasitesi hesaplarıdır. Elektronları veren tam yakıt, proton/su ve pH koşulları ayrıca tanımlanmadan tam hücresel denklem veya ATP verimi çıkarılamaz. Modelde e⁻ miktarı ile alıcı miktarı mol cinsindedir; bu yüzden yarım mol N₂ gibi değerler fiziksel olarak anlamlıdır. Yarım tek bir N₂ molekülü oluştuğu iddia edilmez.",
        ],
        table: {
          headers: [
            "Tanımlı alıcı → ürün",
            "Alıcı başına elektron",
            "Ürün mol / işlenen alıcı mol",
          ],
          rows: [
            ["NO₃⁻ → N₂", "5 mol e⁻", "0,5"],
            ["SO₄²⁻ → H₂S/HS⁻", "8 mol e⁻", "1"],
            ["Fe³⁺ → Fe²⁺", "1 mol e⁻", "1"],
            ["CO₂ → CH₄", "8 mol e⁻", "1"],
          ],
        },
      },
      {
        title: "Kapasiteyi hangi stok sınırlar?",
        paragraphs: [
          "Elektron havuzunda 10 mol e⁻ ve 3 mol nitrat olsun; seçilen yol nitratı N₂’ye götürüyor. Her nitrat 5 elektron istediğine göre elektronlar yalnız 2 mol nitratı işleyebilir. Bir mol nitrat artar; işlenen iki N atomundan bir mol N₂ oluşur. Başlangıç alıcı miktarını ürün miktarına doğrudan eşitlemek doğru olmaz.",
          "Genel hesap işlenen alıcı = min(alıcı miktarı, elektron miktarı / katsayı) biçimindedir. Kullanılan elektron, işlenen alıcı ile katsayının çarpımıdır. Son stoklar negatif olamaz. İki kapasite tam eşitse ikisi birlikte tükenebilir; başlangıç sıfırsa ürün de sıfırdır. Bu denetimler küçük sayı hatalarını ve imkânsız madde üretimini yakalar.",
        ],
      },
      {
        title: "Fermantasyonla ayırırken üç ölçüt kullan",
        paragraphs: [
          "Anaerobik solunumda burada ele aldığımız tanımlayıcı düzen, solunumsal elektron taşıma ve O₂ dışı uygun son alıcıdır. Klasik laktat veya etanol fermantasyonunda solunumsal ETS ile dış son alıcıya dayalı bu düzen kullanılmaz; glikolizden gelen NADH’ın elektronları organik ürüne aktarılıp NAD⁺ yenilenir. Serbest glikozun bu iki kanonik yolunda net ATP glikolizin substrat düzeyindeki kazancıdır.",
          "Bu kısa karşılaştırma, bütün fermantasyon biyokimyasının sonraki ünitedeki ayrıntılarının yerine geçmez. “Oksijensiz” sözcüğünü fermantasyonun eşanlamlısı yapma. ETS varlığı, son alıcının kimliği ve ATP sentezinin yolu birlikte sorulmalıdır. O₂ kullanılmaması tek başına bu iki mekanizmayı ayırmaya yetmez.",
        ],
      },
      {
        title: "Karbonun tamamı ve ATP miktarı ayrı sorulardır",
        paragraphs: [
          "Anaerobik solunumda seçilen verici bazı tür ve koşullarda tamamen, bazılarında kısmen oksitlenebilir. “O₂ yoksa karbon hiçbir zaman CO₂’ye kadar gidemez” genellemesi doğru değildir. Sürecin adı, karbonun zorunlu yarım kalmasından değil solunumsal son alıcı olarak O₂ kullanılmamasından gelir.",
          "Enerji kazancı elektron vericisi–alıcı çiftinin serbest enerji farkına ve bunun ATP sentezine ne kadar eşlendiğine bağlıdır. Belirli ders örneklerinde aerobik verim daha yüksek olabilir; fakat bütün anaerobik yolları tek sabit ATP sayısına veya evrensel “fermantasyondan kesin büyük” eşitsizliğine sıkıştırma. Elektron katsayısı 8 diye 8 ATP üretilir sonucu da çıkmaz; elektron miktarı enerji verimi değildir.",
        ],
      },
      {
        title: "Toprak, tortu ve arıtmada neden önemlidir?",
        paragraphs: [
          "O₂’nin azaldığı tortu veya suya doymuş toprak, uygun anaerobik yollar için ortam sağlayabilir. Nitrat indirgenmesi azotun biçimini ve sistemden gaz çıkışını; demir ve sülfat indirgenmesi mineral ve su kimyasını değiştirebilir. Bu dönüşümler başka canlıların kullanabildiği maddelerin dağılımına da etki eder.",
          "Gerçek bir örnekte yalnız “oksijen az” ölçümüyle tam ürün dağılımı belirlenemez. Elektron vericisi, alıcıların erişilebilirliği, pH, sıcaklık ve uygun mikroorganizmalar önemlidir. Arıtma veya biyogaz uygulamasında olumlu işlevleri anlamak kadar yan ürün ve emisyonları izlemek de gerekir. Kaynakta geçen çevresel rolü, her durumda bütün kirliliği çözen sihirli işlem gibi sunma.",
        ],
      },
      {
        title: "Kanıtı süreç adıyla birlikte değerlendir",
        paragraphs: [
          "Bir deneyde nitrat azalması ve N₂ artışı, belirli yol için madde dönüşümüne kanıt olabilir. Solunumsal taşıyıcılar ve enerji eşleme hakkında ek ölçüm, sürecin mekanizmasını güçlendirir. Yalnız CO₂ çıkışı veya ATP varlığı, tek başına oksijenli/oksijensiz solunum/fermantasyon ayrımını bütünüyle kurmaz; bunlar farklı yollarda görülebilir.",
          "Soruyu çözerken verici → taşıma yolu → alıcı → ürün dizisini tamamla. Sayısal soruda verilen katsayı ve ürün dışına çıkma; yorum sorusunda kanıtın sınırını koru. Etkileşimde önce alıcı değişince ürünün ve elektron gereksiniminin nasıl değişeceğini tahmin et; sonra korunan atom ve kalan stokları kontrol ederek gerekçeni düzelt.",
        ],
      },
    ],
    examples: [
      {
        title: "Nitrat stokundan N₂ ürününe",
        prompt:
          "Tanımlı NO₃⁻→N₂ yolunda bir mol nitrat 5 mol e⁻ ister; iki mol nitrat bir mol N₂ verir. 10 mol e⁻ ve 3 mol nitrat var. Ürün ve artan alıcı?",
        strategy: "Önce elektron kapasitesini, sonra N₂ oranını kullan.",
        steps: [
          {
            label: "1. adım",
            explanation: "Elektronlar 10/5=2 mol nitratı işleyebilir.",
          },
          {
            label: "2. adım",
            explanation:
              "Alıcı 3 olduğundan 2 mol işlenir, 1 mol nitrat kalır.",
          },
          {
            label: "3. adım",
            explanation: "Ürün 2×0,5=1 mol N₂’dir.",
          },
        ],
        answer: "1 mol N₂; 1 mol nitrat artar",
        check:
          "Azot başlangıçta 3 mol N; üründe 2 ve artanda 1 olarak korunur.",
        pitfall: "Nitrat molünü doğrudan N₂ molüne eşitleme.",
      },
      {
        title: "Sülfatta sekiz elektron",
        prompt:
          "Seçilen sülfat→sülfürlü ürün yarı tepkimesi alıcı başına 8 mol e⁻ ister. 16 mol e⁻ ve 3 mol sülfat var; ürün oranı 1:1. Son durum?",
        strategy: "Elektron kapasitesi ile alıcı stoğunun küçüğünü al.",
        steps: [
          {
            label: "1. adım",
            explanation: "16/8=2 mol sülfat işlenebilir.",
          },
          {
            label: "2. adım",
            explanation: "3 mol alıcıdan 2 işlenir; 1 mol sülfat kalır.",
          },
          {
            label: "3. adım",
            explanation: "2 mol sülfürlü ürün oluşur, elektron havuzu tükenir.",
          },
        ],
        answer: "2 mol ürün; 1 mol sülfat kalır",
        check: "Kükürt miktarı 3=2+1 mol S olarak korunur.",
        pitfall: "Elektron gereksinimini ATP sayısı sanma.",
      },
      {
        title: "Demirde alıcı önce biter",
        prompt:
          "Fe³⁺ başına bir elektronla Fe²⁺ oluşuyor. 5 mol e⁻ ve 3 mol Fe³⁺ var. Son Fe²⁺ ve elektron stoğu?",
        strategy: "Bir-elektron oranını iki stokla karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation: "3 mol Fe³⁺ için 3 mol e⁻ yeterlidir.",
          },
          {
            label: "2. adım",
            explanation: "3 mol Fe²⁺ oluşur ve alıcı tükenir.",
          },
          {
            label: "3. adım",
            explanation: "5−3=2 mol e⁻ kullanılmadan kalır.",
          },
        ],
        answer: "3 mol Fe²⁺; 2 mol e⁻ kalır",
        check:
          "Demir 3 mol olarak korunur; yük değişimi alınan elektronla dengelenir.",
        pitfall: "Her deneyde elektronların mutlaka tamamını harcama.",
      },
      {
        title: "CO₂ karbonu metanda kalır",
        prompt:
          "Tanımlı CO₂→CH₄ indirgenmesi mol CO₂ başına 8 mol e⁻ ister ve ürün oranı 1:1’dir. 8 mol e⁻ ile 2 mol CO₂ veriliyor. Son miktarlar?",
        strategy: "Sınırlayıcı stoğu ve karbon korunumunu denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Elektron kapasitesi 8/8=1 mol CO₂’dir.",
          },
          {
            label: "2. adım",
            explanation: "1 mol CO₂ işlenip 1 mol CH₄ oluşur.",
          },
          {
            label: "3. adım",
            explanation: "Başlangıç 2 mol CO₂’nin 1 molü artar.",
          },
        ],
        answer: "1 mol CH₄; 1 mol CO₂ kalır",
        check: "Toplam 2 mol C, iki biçimde 1+1 olarak korunur.",
        pitfall: "Bir CO₂’nin iki oksijenini iki metan ürünü sanma.",
      },
      {
        title: "Alıcı arttırmak neden ürün artırmaz?",
        prompt:
          "Aynı NO₃⁻→N₂ modelinde elektron 10 mol e⁻ olarak sabit. Alıcı 3 molden 6 mole çıkıyor; nitrat başına 5 elektron ve N₂ oranı 0,5. Ürün değişir mi?",
        strategy: "Her iki durumda elektron kapasitesini yeniden yaz.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Elektron kapasitesi iki deneyde de 10/5=2 mol nitrat.",
          },
          {
            label: "2. adım",
            explanation: "3 ve 6 mol alıcı bu kapasitenin üstündedir.",
          },
          {
            label: "3. adım",
            explanation: "Her iki deneyde 2×0,5=1 mol N₂ oluşur.",
          },
        ],
        answer: "Değişmez; her ikisinde 1 mol N₂",
        check: "Artan nitrat önce 1, sonra 4 mol olur.",
        pitfall: "Bir girdiyi artırınca bütün ürünler zorunlu artar sanma.",
      },
      {
        title: "Eşit stok, farklı elektron gereksinimi",
        prompt:
          "Ayrı iki yarı tepkime modelinde 8 mol e⁻ ve 2 mol alıcı var. Fe³⁺ için katsayı 1; sülfat için 8. Ürün oranları 1:1. İşlenen miktarlar?",
        strategy:
          "Aynı sayılı stokların aynı kimyasal kapasite demek olmadığını hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Demirde min(2,8/1)=2 mol işlenir.",
          },
          {
            label: "2. adım",
            explanation: "Sülfatta min(2,8/8)=1 mol işlenir.",
          },
          {
            label: "3. adım",
            explanation:
              "Katsayı farkı nedeniyle eşit alıcı stokları farklı ürün verir.",
          },
        ],
        answer: "Fe³⁺ modelinde 2, sülfatta 1 mol alıcı işlenir",
        check:
          "Bu yalnız yarı tepkime kapasitesidir; ATP verimleri kıyaslanmış değildir.",
        pitfall: "Elektron başına ürünü bütün alıcılar için eşit sayma.",
      },
    ],
    recall: [
      {
        prompt:
          "Anaerobik solunum ile fermantasyonu yalnız O₂ yokluğuyla ayırabilir misin?",
        answer:
          "Hayır; solunumsal ETS, son alıcı ve ATP yolu birlikte değerlendirilir.",
      },
      {
        prompt:
          "NO₃⁻’ten N₂ oluştuğu belirtilmeden her nitrat kullanımını denitrifikasyonun tam N₂ yolu sayabilir misin?",
        answer:
          "Hayır; farklı nitrat indirgeme yolları başka ürünlere gidebilir.",
      },
      {
        prompt:
          "Fe³⁺→Fe²⁺ ile Fe²⁺→Fe³⁺ yönleri elektron bakımından nasıl ayrılır?",
        answer:
          "İlkinde elektron alınır/indirgenme; ikincide elektron verilir/oksidasyon olur.",
      },
      {
        prompt:
          "Bir alıcının 8 elektron istemesi neden 8 ATP ürettiğini söylemez?",
        answer:
          "Elektron kapasitesi madde/redoks hesabıdır; ATP verimi redoks enerji farkı ve eşlenme ayrıntılarına bağlıdır.",
      },
    ],
    items: [
      {
        prompt:
          "Bir mikroorganizmada O₂ kullanılmadan elektronlar solunumsal taşıma sistemi üzerinden dış nitrat alıcısına aktarılıyor. Bu düzen en uygun hangi süreçtir?",
        correct: "Oksijensiz solunum",
        wrong: [
          [
            "Yalnız laktat fermantasyonu",
            "Kökte solunumsal taşıma ve dış nitrat alıcısı vardır; klasik laktat fermantasyonunun tanımı bu değildir.",
          ],
          ["Oksijenli solunum", "Son alıcı O₂ değil nitrattır."],
          ["Suyun ışıkla fotolizi", "Işık ve su fotolizi verilmemiştir."],
          [
            "DNA’nın yarı korunumlu eşlenmesi",
            "Verilen mekanizma enerji/redoks yoludur; DNA kopyalama değildir.",
          ],
        ],
        knowledge: [
          "Anaerobik solunumun ayrımı O₂ dışı son alıcıya giden solunumsal elektron yoludur.",
        ],
        strategy:
          "Yalnız ortamı değil verilen taşıma ve alıcı mekanizmasını oku.",
        steps: [
          "O₂ kullanılmıyor.",
          "Solunumsal elektron aktarımı dış nitrata gidiyor.",
          "Bu düzen oksijensiz solunuma uyar.",
        ],
        reason:
          "O₂ kullanılmıyor. Solunumsal elektron aktarımı dış nitrata gidiyor. Bu düzen oksijensiz solunuma uyar.",
        commonError: "Oksijensiz sözcüğünü otomatik fermantasyon sayma.",
        check: "Nitrata hangi ürünün oluştuğu ayrı kimyasal sorudur.",
      },
      {
        prompt:
          "Tam NO₃⁻→N₂ yarı tepkimesinde nitrat başına 5 mol e⁻, ürün oranı 0,5 mol N₂. 10 mol e⁻ ve 3 mol nitrat varsa N₂ ürünü nedir?",
        correct: "1 mol",
        wrong: [
          ["2 mol", "Bu işlenen nitrat miktarıdır; N₂ iki azot atomu taşır."],
          [
            "3 mol",
            "Bütün başlangıç nitratının işlenmesi için 15 mol e⁻ gerekir.",
          ],
          ["5 mol", "Elektron katsayısı ürün miktarı değildir."],
          [
            "0 mol",
            "Elektron ve alıcı stokları pozitif ve yeterli bir işleme kapasitesi vardır.",
          ],
        ],
        knowledge: ["Önce işlenen alıcı, sonra ürün oranı hesaplanır."],
        strategy: "10/5 ile nitrat kapasitesini bul.",
        steps: [
          "Elektronlar 2 mol nitratı işleyebilir.",
          "3 mol alıcının 2 molü işlenir.",
          "N₂=2×0,5=1 mol.",
        ],
        reason:
          "Elektronlar 2 mol nitratı işleyebilir. 3 mol alıcının 2 molü işlenir. N₂=2×0,5=1 mol.",
        commonError: "Tek N’li nitrat ile iki N’li N₂’yi 1:1 sayma.",
        check:
          "Üründe 2 mol N, artan nitrattaki 1 mol N ile başlangıç 3 mol N’ye eşittir.",
      },
      {
        prompt:
          "Sülfat→sülfürlü ürün için mol alıcı başına 8 mol e⁻ ve ürün oranı 1:1.16 mol e⁻ ile 3 mol sülfat veriliyor. Artan sülfat nedir?",
        correct: "1 mol",
        wrong: [
          ["0 mol", "3 mol sülfatın tümü 24 mol e⁻ ister."],
          ["2 mol", "İşlenen 2 mol ile artan miktar karıştırılmıştır."],
          [
            "3 mol",
            "Pozitif elektron havuzu nedeniyle bir miktar sülfat işlenir.",
          ],
          ["8 mol", "Başlangıç alıcı stoğundan fazla artık oluşamaz."],
        ],
        knowledge: ["Kalan stok başlangıç eksi işlenen miktardır."],
        strategy: "Elektron kapasitesini bulup başlangıçtan çıkar.",
        steps: [
          "16/8=2 mol sülfat işlenebilir.",
          "3−2=1 mol sülfat kalır.",
          "Ürün 2 mol, elektron artığı 0’dır.",
        ],
        reason:
          "16/8=2 mol sülfat işlenebilir. 3−2=1 mol sülfat kalır. Ürün 2 mol, elektron artığı 0’dır.",
        commonError: "İşlenen ve kalan miktarları aynı cevap sayma.",
        check: "Kükürt atomu toplamı 3 mol olarak korunur.",
      },
      {
        prompt:
          "Fe³⁺ + e⁻ → Fe²⁺ yolunda 5 mol e⁻ ve 3 mol Fe³⁺ var. Başka yol yok. İşlem sonundaki kullanılmamış elektron miktarı nedir?",
        correct: "2 mol",
        wrong: [
          ["0 mol", "Alıcı 3 mol olduğundan yalnız 3 mol elektron kullanılır."],
          ["3 mol", "Bu ürün Fe²⁺ miktarıdır; elektron artığı değildir."],
          ["5 mol", "Hiç işlem olmamış gibi hesaplanmıştır."],
          ["8 mol", "Başlangıç elektronuna alıcı miktarı eklenmez."],
        ],
        knowledge: [
          "Bir alıcı başına bir elektron gerekir; sınırlayıcı stok alıcı olabilir.",
        ],
        strategy: "Kullanılan elektronları önce hesapla.",
        steps: [
          "3 mol Fe³⁺ için 3 mol e⁻ kullanılır.",
          "5−3=2 mol e⁻ artar.",
          "3 mol Fe²⁺ oluşur.",
        ],
        reason:
          "3 mol Fe³⁺ için 3 mol e⁻ kullanılır. 5−3=2 mol e⁻ artar. 3 mol Fe²⁺ oluşur.",
        commonError: "Elektronların her koşulda tamamen tükeneceğini sanma.",
        check: "Kullanılan 3+artan 2=başlangıç 5 mol e⁻.",
      },
      {
        prompt:
          "Tanımlı CO₂→CH₄ indirgenmesinde bir mol CO₂ 8 mol e⁻ ister ve 1 mol CH₄ verir. 8 mol e⁻ ile 2 mol CO₂’den en fazla ne oluşur?",
        correct: "1 mol CH₄",
        wrong: [
          ["2 mol CH₄", "İki mol için 16 mol e⁻ gerekir."],
          ["8 mol CH₄", "Elektron sayısı ürün molüne doğrudan eşit değildir."],
          [
            "1 mol O₂",
            "Seçilen ürün metandır; bu indirgenme O₂ üretim yolu değildir.",
          ],
          [
            "0 mol CH₄",
            "Elektron ve alıcı yeterli olduğu için 1 mol ürün oluşabilir.",
          ],
        ],
        knowledge: [
          "Karbonun yükseltgenme basamağı farkı elektron gereksinimini belirler.",
        ],
        strategy: "Elektron miktarını 8’e böl ve alıcıyla sınırla.",
        steps: [
          "8/8=1 mol CO₂ işlenebilir.",
          "2 mol CO₂’nin 1 molü işlenir.",
          "Ürün oranı 1:1 olduğundan 1 mol CH₄ olur.",
        ],
        reason:
          "8/8=1 mol CO₂ işlenebilir. 2 mol CO₂’nin 1 molü işlenir. Ürün oranı 1:1 olduğundan 1 mol CH₄ olur.",
        commonError: "Formüldeki oksijen atomunu ürün sayısı sanma.",
        check: "1 mol CO₂ artar; toplam karbon 2 mol kalır.",
      },
      {
        prompt:
          "Fe²⁺→Fe³⁺ +e⁻ ile Fe³⁺ +e⁻→Fe²⁺ karşılaştırılıyor. Hangi eşleme doğrudur?",
        correct: "İlkinde demir oksitlenir, ikincide indirgenir",
        wrong: [
          [
            "Her ikisinde de demir elektron verir",
            "İkinci denklemde elektron girendir.",
          ],
          [
            "İlkinde indirgenir, ikincide oksitlenir",
            "Elektron alma/verme yönleri ters adlandırılmıştır.",
          ],
          [
            "İki tepkimede de demir karbon olur",
            "Redoks elementin kimliğini değiştirmez.",
          ],
          [
            "Yük farkı hiçbir tepkimede değişmez",
            "+2 ve+3 arasındaki yük değişimi açıktır.",
          ],
        ],
        knowledge: ["Elektron veren yükseltgenir, alan indirgenir."],
        strategy: "Elektronun giren/ürün tarafını her denklemde ayrı bul.",
        steps: [
          "İlk denklem elektron verir: oksidasyon.",
          "İkinci denklem elektron alır: indirgenme.",
          "Demir türü aynı element olarak kalır.",
        ],
        reason:
          "İlk denklem elektron verir: oksidasyon. İkinci denklem elektron alır: indirgenme. Demir türü aynı element olarak kalır.",
        commonError: "Madde adı aynı diye elektron yönünü aynı sanma.",
        check: "Fe²⁺ ve Fe³⁺ yükleri yönü kontrol etmeye yardım eder.",
      },
      {
        prompt:
          "Bir bakterinin nitratı son alıcı olarak kullandığı biliniyor; son azot ürünü ölçülmemiş. Hangisi bu veriyle kesin söylenemez?",
        correct: "Azotun mutlaka N₂’ye kadar gittiği",
        wrong: [
          ["Son alıcının nitrat olduğu", "Bu kökte doğrudan verilen bilgidir."],
          [
            "Nitratın elektron alma rolünün araştırıldığı",
            "Son alıcı tanımı elektron alma rolüdür.",
          ],
          [
            "Ürünü belirlemek için ek ölçüm gerektiği",
            "Farklı indirgenme ürünleri olabileceğinden ek ölçüm gerekir.",
          ],
          [
            "Verici ile alıcının ayrı roller taşıdığı",
            "Verici elektron verir, son alıcı alır; tanımsal ayrım korunur.",
          ],
        ],
        knowledge: ["Nitrat indirgenmesi farklı son ürünlere gidebilir."],
        strategy: "Verilen başlangıç alıcısı ile ölçülmemiş ürünü ayır.",
        steps: [
          "Nitrat alıcısı biliniyor.",
          "Tam N₂ yolu ayrı bir ürün ve yol bilgisidir.",
          "Son ürün ölçülmeden N₂’ye kadar gidildiği zorunlu değildir.",
        ],
        reason:
          "Nitrat alıcısı biliniyor. Tam N₂ yolu ayrı bir ürün ve yol bilgisidir. Son ürün ölçülmeden N₂’ye kadar gidildiği zorunlu değildir.",
        commonError:
          "Nitrat kullanımını her koşulda tam denitrifikasyon sayma.",
        check: "Soru nitratın alıcı olduğu verisini reddetmez.",
      },
      {
        prompt:
          "İki sistem O₂ kullanmıyor. A’da solunumsal ETS ve dış sülfat alıcısı var. B’de klasik glikoliz NADH’ı organik ürüne elektron verip NAD⁺ yeniliyor; solunumsal ETS yok. Uygun ayrım?",
        correct: "A anaerobik solunum, B fermantasyon",
        wrong: [
          [
            "A fotosentez, B DNA eşlenmesi",
            "Verilen enerji/redoks mekanizmaları bu olaylar değildir.",
          ],
          [
            "İkisi de zorunlu oksijenli solunum",
            "Her ikisinde O₂ kullanılmadığı açık verilmiştir.",
          ],
          [
            "A fermantasyon, B anaerobik solunum",
            "ETS ve dış alıcı düzeni ters eşlenmiştir.",
          ],
          [
            "Hiçbirinde ATP sentezi mümkün değildir",
            "O₂ olmaması bütün ATP yollarını ortadan kaldırmaz.",
          ],
        ],
        knowledge: [
          "O₂ yokluğuna ek olarak taşıma sistemi ve son alıcıyı kullan.",
        ],
        strategy: "İki sistemin mekanizmalarını üç sütunda kıyasla.",
        steps: [
          "A dış alıcıya giden solunumsal elektron yolu taşır.",
          "B’de organik ürüne aktarımla NAD⁺ yenilenir, solunumsal ETS yoktur.",
          "Bu tanımlar A’yı anaerobik solunum, B’yi fermantasyon yapar.",
        ],
        reason:
          "A dış alıcıya giden solunumsal elektron yolu taşır. B’de organik ürüne aktarımla NAD⁺ yenilenir, solunumsal ETS yoktur. Bu tanımlar A’yı anaerobik solunum, B’yi fermantasyon yapar.",
        commonError: "Yalnız çevrenin oksijenini süreç adı sanma.",
        check: "Klasik B’nin ATP yolu glikolizde substrat düzeyindedir.",
      },
      {
        prompt:
          "Tam NO₃⁻→N₂ modelinde 10 mol e⁻ sabit. Nitrat 3 molden 6 mole çıkarılıyor; mol nitrat başına 5 mol e⁻ ve ürün oranı 0,5. N₂ miktarı ne olur?",
        correct: "İki durumda da 1 mol",
        wrong: [
          [
            "1 molden 3 mole çıkar",
            "Elektron kapasitesi artmadığından işlenen alıcı 3 kat olamaz.",
          ],
          [
            "Her iki durumda 6 mol olur",
            "Başlangıç alıcı sayısı N₂ ürününe doğrudan eşit değildir.",
          ],
          [
            "İlkinde 0, ikincide 10 mol olur",
            "Her iki stok da başlangıçta işlem sağlayacak pozitiftir; verilen oranlara aykırıdır.",
          ],
          [
            "İkinci durumda kesin sıfırlanır",
            "Alıcı artışı verilen kapasite modelinde ürünü sıfırlamaz.",
          ],
        ],
        knowledge: ["Alıcı bolken elektron havuzu sınırlayıcı olabilir."],
        strategy: "Her iki deneyde elektron/alıcı oranını yeniden hesapla.",
        steps: [
          "10/5=2 mol nitrat kapasitesi değişmez.",
          "3 ve 6 mol alıcı ikisi de 2’nin üzerindedir.",
          "Her ikisinde N₂=2×0,5=1 mol.",
        ],
        reason:
          "10/5=2 mol nitrat kapasitesi değişmez. 3 ve 6 mol alıcı ikisi de 2’nin üzerindedir. Her ikisinde N₂=2×0,5=1 mol.",
        commonError: "Her girdi artışını zorunlu ürün artışı sayma.",
        check: "Alıcı artığı ilkinde 1, ikincide 4 mol olur.",
      },
      {
        prompt:
          "Bir anaerobik yarı tepkimede alıcı başına 8 mol elektron gerektiği verilmiş. ATP verimi hakkında hangisi doğrudur?",
        correct: "Bu katsayı tek başına ATP sayısını vermez",
        wrong: [
          [
            "Her alıcı mutlaka 8 ATP oluşturur",
            "Elektron stokiyometrisi enerji eşleme katsayısı değildir.",
          ],
          [
            "ATP mutlaka sıfırdır",
            "Süreçte enerji kazanımı mümkün olabilir; verilen katsayı bunu sıfırlamaz.",
          ],
          [
            "Bütün türlerde aerobikten tam 8 ATP azdır",
            "Verici–alıcı enerji farkı ve eşlenme verilmemiştir.",
          ],
          [
            "ATP miktarı yalnız başlangıç pH’sına eşittir",
            "Farklı birimler ve fiziksel nicelikler eşitlenemez.",
          ],
        ],
        knowledge: [
          "Elektron miktarı ile serbest enerji ve ATP eşlenmesi ayrı niceliklerdir.",
        ],
        strategy:
          "Hangi hesabın verildiğini ve hangisi için veri eksik olduğunu belirle.",
        steps: [
          "8 mol e⁻ kimyasal indirgenme gereksinimidir.",
          "ATP verimi redoks çifti ve eşlenmeye bağlıdır.",
          "Bu bilgiler olmadan sabit ATP sayısı çıkarılamaz.",
        ],
        reason:
          "8 mol e⁻ kimyasal indirgenme gereksinimidir. ATP verimi redoks çifti ve eşlenmeye bağlıdır. Bu bilgiler olmadan sabit ATP sayısı çıkarılamaz.",
        commonError: "Elektron sayısını ATP sayısına çevirecek oranı uydurma.",
        check: "Model yalnız atom/elektron kapasitesi iddiası taşır.",
      },
      {
        prompt: "Anaerobik solunum hakkında hangi genelleme yanlıştır?",
        correct: "Organik karbon hiçbir koşulda CO₂’ye kadar oksitlenemez",
        wrong: [
          [
            "Son alıcı O₂ dışında uygun bir madde olabilir",
            "Bu anaerobik solunumun ana ayrımıyla uyumludur.",
          ],
          [
            "Bazı bakteri ve arkelerde örnekleri vardır",
            "Bu okul kapsamındaki doğru canlı gruplarıdır.",
          ],
          [
            "Ürün ve verim kullanılan yola bağlıdır",
            "Farklı redoks çiftleri ve eşlenme bunu etkiler.",
          ],
          [
            "Elektron vericisi ile alıcısı ayrı roller taşır",
            "Oksidasyon ve indirgenmenin temel ayrımıdır.",
          ],
        ],
        knowledge: [
          "Süreç adı karbonun zorunlu yarım kalmasından değil son alıcıdan gelir.",
        ],
        strategy: "Mutlak karbon iddiasını mekanizma tanımıyla karşılaştır.",
        steps: [
          "Anaerobik yollarda karbon tam veya kısmi oksitlenebilir.",
          "Tanımlayıcı fark solunumsal son alıcı olarak O₂ kullanılmamasıdır.",
          "Bu yüzden hiçbir koşulda CO₂ olamaz genellemesi yanlıştır.",
        ],
        reason:
          "Anaerobik yollarda karbon tam veya kısmi oksitlenebilir. Tanımlayıcı fark solunumsal son alıcı olarak O₂ kullanılmamasıdır. Bu yüzden hiçbir koşulda CO₂ olamaz genellemesi yanlıştır.",
        commonError:
          "Fermantasyonun eksik oksidasyon örneğini bütün anaerobik yollara taşıma.",
        check: "Hangi ürünün oluşacağı verilen yol ve koşulla belirlenir.",
      },
      {
        prompt:
          "Ayrı iki kapasite deneyinde 8 mol e⁻ ve 2 mol alıcı var. Fe³⁺ başına 1, sülfat başına 8 mol e⁻ gerekiyor. İşlenen alıcı miktarları nasıl olur?",
        correct: "Fe³⁺ 2 mol, sülfat 1 mol",
        wrong: [
          ["İkisi de 8 mol", "Başlangıçta yalnız 2 mol alıcı vardır."],
          [
            "Fe³⁺ 1 mol, sülfat 2 mol",
            "Katsayıların etkisi ters hesaplanmıştır.",
          ],
          [
            "İkisi de 0 mol",
            "Pozitif elektron ve alıcı stokları işleme sağlar.",
          ],
          [
            "Fe³⁺ 2 mol, sülfat 2 mol",
            "Sülfatta 2 mol işlemek 16 mol e⁻ ister; eldeki 8 mol yalnız 1 mol sülfatı işler.",
          ],
        ],
        knowledge: [
          "İşlenen miktar hem alıcı stoğu hem elektron kapasitesiyle sınırlıdır.",
        ],
        strategy: "Her alıcı için min(alıcı, e⁻/katsayı) uygula.",
        steps: [
          "Fe³⁺ için min(2,8/1)=2.",
          "Sülfat için min(2,8/8)=1.",
          "Fark elektron gereksiniminden doğar; ATP verimi kıyaslanmaz.",
        ],
        reason:
          "Fe³⁺ için min(2,8/1)=2. Sülfat için min(2,8/8)=1. Fark elektron gereksiniminden doğar; ATP verimi kıyaslanmaz.",
        commonError: "Eşit sayılı alıcıları eşit kimyasal kapasite sayma.",
        check: "Hiçbir işlenen miktar başlangıç 2 mol alıcıyı geçmez.",
      },
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 PDF71 ve73; OGM Hücresel Solunum sunu 050/özet 017; Dersler Cepte Solunum 13 karşılaştırılarak yazılmış özgün öğretim ve sorular. Son alıcı, tam/kısmi oksidasyon, fermentasyon ayrımı ve yarı tepkime elektron kapasitesi koşulları açıklandı.",
  },
];

function question021(
  unit: string,
  item: Item021,
  index: number,
): Question & { guidance: Guidance021 } {
  const answer = index % 5;
  const options = item.wrong.map((w) => w[0]);
  const optionReasons = item.wrong.map((w) => w[1]);
  options.splice(answer, 0, item.correct);
  optionReasons.splice(answer, 0, item.reason);
  if (options.length !== 5 || new Set(options).size !== 5)
    throw new Error("FIVE_CHOICES021:" + unit);
  return {
    id: `f021-bio-b-${unit}-${index + 1}`,
    prompt: txt(item.prompt),
    options: options.map(txt),
    answer,
    hint: txt(item.knowledge[0]),
    explanation: txt(item.reason + " " + item.check),
    skill: `f021-bio-b-${unit}-${index + 1}`,
    guidance: {
      knowledge: item.knowledge,
      strategy: item.strategy,
      steps: item.steps,
      optionReasons,
      commonError: item.commonError,
      check: item.check,
    },
  };
}
export const forge021BiologyBTopics: Record<string, string> =
  Object.fromEntries(data.map((u) => [u.id, u.topic]));
export const forge021BiologyBGuides: LessonGuide[] = data.map(
  ({ items: _items, topic: _topic, title: _title, ...guide }) => guide,
);
export const forge021BiologyBLessons: Lesson[] = data.map((u) => ({
  id: u.id,
  subjectId: "ayt-biyoloji",
  title: txt(u.title),
  minutes: u.minutes,
  objectives: u.objectives.map(txt),
  body: u.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join(" ")),
  })),
  questions: u.items.map((q, i) => question021(u.id, q, i)),
  source: txt(u.source),
  tags: ["kaynakli", "etkilesimli", "forge021", "kademeli-ipucu"],
}));
