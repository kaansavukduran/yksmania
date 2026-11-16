import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";
function integer024(value: number, low: number, high: number) {
  return Number.isInteger(value) && value >= low && value <= high;
}
export type StemKind024 = "monocot" | "dicot";
/** Typical teaching sections. A season adds one stipulated growth ring; it is not an automatic age inference. */
export function stemSection024(kind: StemKind024, seasons: number) {
  if (
    typeof kind !== "string" ||
    !["monocot", "dicot"].includes(kind) ||
    !integer024(seasons, 0, 5)
  )
    throw new RangeError("STEM024_SCOPE");
  const secondary = kind === "dicot";
  const cambiumRadius = secondary ? 82 + 6 * seasons : null;
  const bundles =
    secondary && seasons === 0
      ? Array.from({ length: 10 }, (_, i) => {
          const angle = (i * Math.PI) / 5 - Math.PI / 2;
          const r = 82;
          return {
            id: i + 1,
            x: 180 + r * Math.cos(angle),
            y: 180 + r * Math.sin(angle),
            angle,
          };
        })
      : secondary
        ? []
        : [
            [-81, -61],
            [-30, -95],
            [30, -75],
            [84, -55],
            [-108, -5],
            [-58, -15],
            [0, -35],
            [58, -3],
            [104, 26],
            [-90, 56],
            [-30, 55],
            [30, 40],
            [75, 85],
            [-42, 105],
            [8, 100],
            [10, 6],
          ].map(([x, y], i) => ({
            id: i + 1,
            x: 180 + x,
            y: 180 + y,
            angle: Math.atan2(y, x),
          }));
  return {
    kind,
    seasons,
    typicalSecondaryGrowth: secondary,
    cambiumRadius,
    secondaryRings: secondary
      ? Array.from({ length: seasons }, (_, i) => ({
          season: i + 1,
          radius: 78 + 6 * i,
        }))
      : [],
    phloemRadius: secondary ? 92 + 6 * seasons : null,
    outerRadius: secondary ? 120 + 6 * seasons : 137,
    bundles,
    cortexAndPithDistinct: secondary,
    modelAssumption:
      "Tipik kesitlerdir. Dikot örneğinde her gösterilen büyüme mevsiminde tek belirgin halka oluştuğu verilmiştir; monokot örnekte olağan vasküler kambiyum yoktur.",
  };
}
export type LeafRoute024 = "carbon" | "water" | "sugar";
const leafPaths024: Record<LeafRoute024, readonly string[]> = {
  carbon: ["outside", "pore", "air", "spongy", "palisade"],
  water: ["xylem", "film", "air", "pore", "outside"],
  sugar: ["palisade", "mesophyll", "companion", "phloem", "sink"],
};
/** Given daylight/net photosynthesis gradients in a mature source leaf; the tracked stomatal route is only one water-loss route. */
export function leafJourney024(
  route: LeafRoute024,
  step: number,
  stomaOpen: boolean,
) {
  if (
    typeof route !== "string" ||
    !Object.hasOwn(leafPaths024, route) ||
    !integer024(step, 0, 4) ||
    typeof stomaOpen !== "boolean"
  )
    throw new RangeError("LEAF024_SCOPE");
  const path = [...leafPaths024[route]];
  const gateStep = route === "carbon" ? 1 : route === "water" ? 3 : null;
  const blocked = !stomaOpen && gateStep !== null && step >= gateStep;
  const reached = blocked ? gateStep! - 1 : step;
  return {
    route,
    step,
    stomaOpen,
    path,
    reached,
    blocked,
    activeNodes: path.slice(0, reached + 1),
    links: path.slice(1).map((to, i) => ({
      from: path[i],
      to,
      active: i < reached,
      blocked: blocked && i + 1 === gateStep,
    })),
    phase:
      route === "water" && reached >= 2
        ? "vapor"
        : route === "water"
          ? "liquid"
          : null,
    statement: blocked
      ? "Gösterilen stoma yolu kapalıdır. Kütikuladan su kaybının sıfır olduğu veya bütün gaz yollarının yok olduğu sonucu çıkmaz."
      : route === "carbon"
        ? "Bu örnekte dışarıdan mezofile CO₂ gradiyenti ve net fotosentez verilmiştir. İzlenen yol sünger bölgesindeki hava boşluklarından palizat hücresine uzanan bir örnektir; CO₂ önce sünger hücresinin içine girip sonra palizata geçmek zorunda değildir. Hava boşlukları iki fotosentez dokusunun yüzeyine de erişim sağlayabilir."
        : route === "water"
          ? "Sıvı su mezofil çeper filminden buharlaşır; buhar hava boşluğu ve stomadan dışarı yayılır."
          : "Olgun kaynak yaprağın ürettiği organik madde, arkadaş hücresi ile floem üzerinden havuza yönelir.",
  };
}
export type FlowMode024 = "xylem" | "phloem";
/** Given conductance Q=G·difference in teaching units. Xylem inputs are total water potentials; phloem inputs are pressure potentials. */
export function plantFlow024(
  mode: FlowMode024,
  atATenths: number,
  atBTenths: number,
  conductance: number,
  intact: boolean,
) {
  if (
    typeof mode !== "string" ||
    !["xylem", "phloem"].includes(mode) ||
    !integer024(atATenths, mode === "xylem" ? -50 : 0, 50) ||
    !integer024(atBTenths, mode === "xylem" ? -50 : 0, 50) ||
    !integer024(conductance, 1, 10) ||
    typeof intact !== "boolean"
  )
    throw new RangeError("FLOW024_SCOPE");
  const differenceTenths = atATenths - atBTenths;
  const flowTenths = intact ? conductance * differenceTenths : 0;
  return {
    mode,
    atATenths,
    atBTenths,
    conductance,
    intact,
    differenceTenths,
    flowTenths,
    direction: flowTenths > 0 ? "A-to-B" : flowTenths < 0 ? "B-to-A" : "none",
    cause: !intact
      ? "interrupted"
      : differenceTenths === 0
        ? "equal"
        : "gradient",
    a: atATenths / 10,
    b: atBTenths / 10,
    flow: flowTenths / 10,
    assumption:
      "İletkenlik verilen sabit bir öğretim parametresidir; akış birimi gerçeğe ölçülmüş mL/s değildir. Ksilemde verilen Ψ yerçekimi dahil toplamı, floemde verilen P basıncı temsil eder.",
  };
}
export type GuardSignal024 = "light" | "ABA" | "dark" | "CAM-night";
export function guardCycle024(signal: GuardSignal024, step: number) {
  if (
    typeof signal !== "string" ||
    !["light", "ABA", "dark", "CAM-night"].includes(signal) ||
    !integer024(step, 0, 4)
  )
    throw new RangeError("GUARD024_SCOPE");
  const opening = signal === "light" || signal === "CAM-night";
  const labels = opening
    ? [
        "Başlangıç: düşük açıklık",
        "Zar pompaları ve kanallar uyarılır",
        "Çözünmüş iyon miktarı artar",
        "Su girişiyle turgor artar",
        "Çeper düzeni açıklığı genişletir",
      ]
    : [
        "Başlangıç: açık stoma",
        "Kapanma sinyali alınır",
        "İyonların hücre dışına çıkışı artar",
        "Su çıkışıyla turgor azalır",
        "Bekçi hücreleri açıklığı kapatır",
      ];
  return {
    signal,
    step,
    opening,
    labels,
    apertureStage: opening ? [0, 0, 0, 1, 2][step] : [2, 2, 2, 1, 0][step],
    ionDirection: step >= 2 ? (opening ? "in" : "out") : "pending",
    waterDirection: step >= 3 ? (opening ? "in" : "out") : "pending",
    activeEvents: labels.slice(0, step + 1),
    scope:
      signal === "CAM-night"
        ? "Bu verilen CAM örneğinde gece açılma programı izlenir. Her türün her gece aynı yanıt verdiği söylenmez."
        : signal === "light"
          ? "Su yeterli ve açılmaya uygun verilen gündüz örneğidir; ışık tek başına her koşulda açılmayı zorunlu kılmaz."
          : signal === "ABA"
            ? "Su stresiyle bağlantılı ABA sinyali iyon kanalları üzerinden kapanmayı destekler; yalnız asitlik etiketiyle açıklanmaz."
            : "Verilen gündüz etkin türün karanlıkta kapanma örneğidir; CAM türlerine genellenmez.",
  };
}
export type RootPartner024 = "bacterium" | "fungus";
export type Exchange024 = "nitrogen" | "phosphate" | "water" | "carbon";
export function symbiosis024(
  partner: RootPartner024,
  exchange: Exchange024,
  step: number,
) {
  if (
    typeof partner !== "string" ||
    typeof exchange !== "string" ||
    !["bacterium", "fungus"].includes(partner) ||
    !["nitrogen", "phosphate", "water", "carbon"].includes(exchange) ||
    !integer024(step, 0, 3)
  )
    throw new RangeError("SYMBIOSIS024_SCOPE");
  const represented =
    partner === "bacterium"
      ? ["nitrogen", "carbon"].includes(exchange)
      : ["phosphate", "water", "carbon"].includes(exchange);
  const path = !represented
    ? []
    : exchange === "carbon"
      ? ["leaf", "phloem", "root", partner]
      : exchange === "nitrogen"
        ? ["air-N2", "nodule-bacterium", "fixed-N", "plant"]
        : ["soil", "fungal-hypha", "root-interface", "plant"];
  return {
    partner,
    exchange,
    step,
    represented,
    path,
    activeNodes: path.slice(0, step + 1),
    model:
      partner === "bacterium"
        ? "Baklagil–Rhizobium nodülü"
        : "Verilen bitki–mantar mikoriza ortaklığı",
    note: represented
      ? exchange === "carbon"
        ? "Fotosentez kökenli organik karbon bitkiden ortağa gider; ortak ışık kullanarak bu şekeri üretmez."
        : exchange === "nitrogen"
          ? "N₂'yi kullanılabilir azot biçimine dönüştüren bakteri, bitkinin içinde yaşadığı nodül ortaklığının tarafıdır."
          : "Bu mikoriza modelinde hifler, topraktan kaynak alımını artıran ek yüzey ve kökle alışveriş bağlantısı sağlar."
      : "Bu seçili ortaklığın çizilen işlevleri arasında bu yol yoktur; örneğin mantara N₂ bağlayan Rhizobium görevi yüklenemez.",
  };
}

type Item024A = {
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
type Unit024A = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  source: string;
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: Item024A[];
};
const units024A: Unit024A[] = [
  {
    id: "ayt-govde-yapisi",
    topic: "detail-347",
    title: "Bitki gövdesi: düğümden iletim halkasına",
    minutes: 100,
    objectives: [
      "Gövdeyi bulunduğu yerden önce düğüm, tomurcuk ve organ bağlantılarıyla tanı.",
      "Tipik tek ve çift çenekli gövde kesitlerinde iletim dokularını ilişkilendir.",
      "Boyuna büyüme, sekonder kalınlaşma ve halka kesme deneyini farklı ölçeklerde açıkla.",
    ],
    source:
      "Aurelia YKS arşivindeki MEBİ AYT Biyoloji gövde özeti; OGM Bitkisel Organlar sunusu ve konu özeti; Dersler Cepte Bitkilerin Yapısı ile karşılaştırılarak hazırlanmış özgün anlatım ve şemalar. Soru ve örnekler özgün öğretim çalışmalarıdır.",
    sections: [
      {
        title: "Önce organı, sonra dokuyu tanı",
        paragraphs: [
          "Kök, gövde ve yaprak birer organdır; epidermis, temel doku ve iletim dokusu bu organların içinde birlikte bulunabilir. Önce kökteki olgunlaşma bölgesini ve ksilem–floem ayrımını hatırla. Yeni sorumuz, aynı doku türlerinin gövdede hangi düzenle yer aldığıdır.",
          "Gövde, sürgün sisteminin eksenidir. Yaprakları ve üreme yapılarını taşır; kökle bu organlar arasında madde bağlantısı kurar. Bir kesitte ksilem görmek tek başına organın gövde olduğunu kanıtlamaz; kök ve yaprakta da iletim dokusu bulunur. Organı birden çok yapısal kanıtla tanı.",
        ],
      },
      {
        title: "Toprak altında bulunmak kök olmak değildir",
        paragraphs: [
          "Gövdeyi yalnız toprağın üstünde duran parça diye tanımlarsan patates yumrusunu ve birçok rizomu yanlış sınıflandırırsın. Bu yapılar toprak altında olabilir; düğüm, tomurcuk veya indirgenmiş yaprak izleri gibi sürgün özellikleri gövde kökenlerini gösterir.",
          "Patatesin gözleri tomurcuk taşır; uygun koşulda bunlardan yeni sürgün gelişebilir. Havuçta şişkin bölümün kök kökenli olması başka bir durumdur. Depolama iki organın ortak görevi olabilir, fakat ortak görev aynı organ kökeni demek değildir. Soruda verilen yapı işaretini koru.",
        ],
      },
      {
        title: "Destek ve iletim aynı eksende birleşir",
        paragraphs: [
          "Gövdenin dallanması, yaprakların ışık alabileceği ve çiçeklerin taşınabileceği bir iskelet oluşturur. Genç, yeşil gövde hücreleri kloroplast taşıyorsa fotosenteze de katılabilir. Her gövdeyi bütünüyle odun veya bütünüyle fotosentezsiz kabul etmek bu çeşitliliği kaybettirir.",
          "Ksilemle gelen su ve mineraller gövdeden yapraklara ulaşır. Floem, kaynak organların organik maddelerini tüketen ya da depolayan havuzlara bağlar. Kaynak ve havuzun yeri değişebildiğinden gövdedeki bütün maddeleri aynı boruda ve yalnız tek yönde taşınıyor gibi çizme.",
        ],
      },
      {
        title: "Düğüm, iki düğüm arası ve yaprak izini ayır",
        paragraphs: [
          "Yaprağın gövdeye bağlandığı yer düğüm, yani nodyumdur. İki düğüm arasındaki eksen bölümü internodyum adını alır. Bir fotoğrafta boğumları saymak ile aralarındaki uzunluğu ölçmek farklı işlemlerdir; beş ardışık düğüm arasında dört tam aralık bulunur.",
          "Yaprak dökülünce bağlantı yerinde yaprak izi kalabilir. Tomurcuğu örten pulların izleri ise bir sürgünün önceki büyüme dönemlerini izlemeye yardım eder. Bu yüzey izleriyle odunun enine kesitindeki büyüme halkalarını aynı yapı sanma; biri dış yüzeyde, diğeri sekonder ksilemdedir.",
        ],
      },
      {
        title: "Tepe ve yanal tomurcuk farklı konumları anlatır",
        paragraphs: [
          "Tepe tomurcuğundaki sürgün uç meristemi, yeni gövde ve yaprak oluşumunun kaynağıdır. Uçtan üretilen hücrelerin çoğalması ve ardından uzaması boyca büyümeye katkı verir. Yanal tomurcuk ise çoğunlukla yaprak ile gövde arasındaki koltukta yer alır ve dal oluşturabilir.",
          "Tomurcuğun mevsimsel olarak etkin olmaması dormansiyle ilgilidir. Tepe sürgününün yanal tomurcuk gelişimini baskılaması ise apikal baskınlık olarak ele alınır. Aynı bitkide bu iki süreç ilişkili olabilir; yine de yalnız uyuyan bir tomurcuk görmek baskının tek nedenini belirlemez.",
        ],
      },
      {
        title: "Otsu olmakla tek yıllık olmayı karıştırma",
        paragraphs: [
          "Otsu gövdeler genellikle odunsu bir kalın eksen geliştirmez; buna karşılık odunsu gövdelerde belirgin sekonder ksilem ve koruyucu dış tabakalar görülür. Otsu veya odunsu sınıflaması gövdenin yapısıyla, tek ya da çok yıllık olmak yaşam süresiyle ilgilidir.",
          "Bir otsu bitki çok yıllık olabilir. Tek çeneklilerin çoğunda tanıdığımız tipik gövde yapısı otsudur; bazı çift çenekliler de otsudur. Bu nedenle otsu sözcüğünden doğrudan tek çenekli veya tek yıllık sonucuna geçme. Soru hangi özelliği verdiğini açıkça söylemelidir.",
        ],
      },
      {
        title: "Tipik tek çenekli kesitte demetleri izle",
        paragraphs: [
          "Mısır gibi tipik tek çenekli bir gövdenin enine kesitinde iletim demetleri temel doku içinde dağınık görünür. Gösterilen örnekte korteks ile öz, tipik çift çenekli kesitteki gibi iki belirgin bölgeye ayrılmaz. Dağınık olmak dokunun düzensiz ya da işlevsiz olduğu anlamına gelmez.",
          "Bu demetlerde olağan vasküler kambiyum bulunmaz; dolayısıyla tipik çift çenekli gövdeye ait sekonder kalınlaşma modeli aynı biçimde uygulanmaz. Bu, bütün tek çeneklilerin hiçbir yolla kalınlaşamayacağı iddiası değildir. Etkileşim bu tipik anatomik karşılaştırmayı sınırlarıyla gösterir.",
        ],
      },
      {
        title: "Tipik çift çenekli kesitte halkayı kur",
        paragraphs: [
          "Genç bir çift çenekli gövdede iletim demetleri çoğunlukla bir halka çevresinde dizilir. Halka dışındaki temel bölge korteks, merkezdeki bölüm öz olarak ayırt edilebilir. Bu düzeni, kökteki merkezi ksilem yerleşimiyle aynı kesit sanmadan karşılaştır.",
          "Demette merkeze yakın tarafta ksilem, dışa yakın tarafta floem bulunur; ikisinin arasında vasküler kambiyum yer alabilir. İç ve dış sözcüklerinin referansı organın merkezidir. Sayfadaki çizim döndürülünce merkeze yakınlık değişmez; ksilem her zaman ekranın altı demek değildir.",
        ],
      },
      {
        title: "Primer büyüme yeni bir eksen kurar",
        paragraphs: [
          "Primer büyüme, uç meristemlerinin oluşturduğu birincil dokularla organın boyuna gelişmesi ve yeni kısımların eklenmesidir. Genç gövdede primer ksilem ve primer floem bu gelişim sırasında farklılaşır. Bir gövdenin büyümesi yalnız kalınlık artışıyla ölçülmez.",
          "Bir deneyde sürgün uzunluğu artarken çap değişmeyebilir; başka bir deneyde ikisi birlikte değişebilir. Bu gözlemler farklı büyüme bileşenlerini gösterir. Başlangıç ve son ölçümlerini, ölçülen organ bölümünü ve süreyi birlikte tut; bütün boy artışını eski dokunun eşit oranda uzaması sanma.",
        ],
      },
      {
        title: "Vasküler kambiyum iki yana ürün verir",
        paragraphs: [
          "Vasküler kambiyum, uygun gövdede halka oluşturan yanal meristemdir. Bölünmeleriyle iç tarafa sekonder ksilem, dış tarafa sekonder floem eklenir. Ksilem ve floemin hangi tarafta oluştuğunu, kambiyumu sabit referans alarak izlemek isimleri ezberlemekten daha güvenilirdir.",
          "Kambiyum yeni dokular eklerken organın çevresi ve çapı büyür. Sekonder ksilem birikimi çoğunlukla odunun büyük bölümünü oluşturur; sekonder floem dış tarafta daha ince bir bölge olarak kalabilir. İki ürünün aynı kalınlıkta oluşacağı veya her mevsim eşit miktarda ekleneceği verilmeden kabul edilmez.",
        ],
      },
      {
        title: "Dış yüzey büyümeye uyum sağlar",
        paragraphs: [
          "Gövde sekonder kalınlaştığında başlangıçtaki epidermis ve kütikula bütün genişleyen yüzeyi tek başına örtemeyebilir. Mantar kambiyumu ve onun ürünleriyle gelişen periderm, uygun odunsu gövdelerde yeni koruyucu örtü oluşturur. Bu meristemi vasküler kambiyumla karıştırma.",
          "Vasküler kambiyumun temel ürünleri iletim dokuları; mantar kambiyumunun ürünleri ise peridermin bölümleridir. Peridermin tamamı tek bir ölü hücre tabakası değildir. Odunsu gövde dışındaki lentiseller gaz alışverişine olanak verebilir; kabuk gaz geçirmez bir duvar gibi düşünülmez.",
        ],
      },
      {
        title: "Bir büyüme halkasının nedenini açıkla",
        paragraphs: [
          "Mevsimsel büyümesi belirgin bir ağaçta kambiyumun yılın farklı dönemlerinde oluşturduğu ksilem hücrelerinin çap ve çeper özellikleri değişebilir. Erken odun ile geç odunun birlikte oluşturduğu fark, enine kesitte bir büyüme halkasını ayırt etmeyi sağlar.",
          "Halkaları saymadan önce her büyüme döneminde tek belirgin halka oluştuğunun ve kesitin hangi yükseklikten alındığının verilmesi gerekir. Kuraklık gibi koşullar yalancı ya da belirsiz halkalar oluşturabilir. Ders modelinde bir mevsim–bir halka kabulü özellikle belirtilir; bu koşul bütün doğaya otomatik taşınmaz.",
        ],
      },
      {
        title: "Odunun bütün hücrelerini aynı sanma",
        paragraphs: [
          "Olgun trake ve trakeitler su iletimine uygun, canlı içeriğini kaybetmiş yapılardır. Buna karşılık odun içinde canlı parankima hücreleri de bulunabilir. Odun sözcüğünü duyunca bütün kesitin canlılığı veya görevi için tek bir hüküm vermek doğru olmaz.",
          "Bazı gövdelerde dışa yakın odun su taşınmasına daha etkin katılırken içteki daha eski odun destek ve depolanan maddelerle farklılaşabilir. Bunlar aynı organın yaş ve işlev bakımından farklı bölgeleridir. Genç floemin yerini, yaşlı ksilemin yerini ve kambiyumu ayrı işaretle.",
        ],
      },
      {
        title: "Depo gövdeyi depo kökten ayır",
        paragraphs: [
          "Yumru gövde, rizom ve sürünücü gövde farklı biçimlerdir. Patates yumrusunda göz adı verilen tomurcuklar, rizomda düğümler ve indirgenmiş yapraklar, çileğin sürünücü gövdesinde ise yeni sürgün–kök oluşabilen düğümler gövde kökenini anlamaya yardım eder.",
          "Bir organın depoladığı maddenin şeker, nişasta veya su olması tek başına organ adını belirlemez. Kaktüsün su depolayan yeşil ekseniyle havucun şişkin kökünü aynı sınıfa koyma. Önce köken göstergesini, sonra üstlendiği görevi yaz; benzer işlev farklı kökenlerde gelişebilir.",
        ],
      },
      {
        title: "Vegetatif çoğalmada hangi bağın korunduğunu düşün",
        paragraphs: [
          "Sürünücü bir gövdeden uygun koşulda yeni birey gelişmesi eşeysiz çoğalmaya örnek olabilir. Yeni sürgün ve kök oluşması, başlangıç organının mutlaka kök olduğu anlamına gelmez. Mitozla oluşan dokular ile döllenme sonucu oluşan yeni birey farklı süreçlerdir.",
          "Aynı ana bitkiden vegetatif yolla çoğalan bireyler genellikle aynı genetik yapıyı taşır; mutasyon olasılığı gibi sınırlar ayrıca vardır. Genetik benzerlik çevrelerinin ve büyüklüklerinin kesin aynı olmasını gerektirmez. Gövde bir üreme aracı olabilir, fakat her gövde parçası her koşulda yeni bitki oluşturmaz.",
        ],
      },
      {
        title: "Halka çıkarma deneyinde zamanı ayrı satıra koy",
        paragraphs: [
          "Yalnız floemi etkileyen bir kabuk halkası çıkarıldığında yapraktan köke organik madde aktarımı kesintiye uğrayabilir. Ksilem sağlam kaldıysa su iletiminin ilk anda doğrudan kesildiği sonucu çıkmaz. Kaynağın üst tarafında organik madde birikmesi de izlenebilir.",
          "Uzun sürede kök, depolarını tüketip canlılığını kaybederse su ve mineral alımı dolaylı biçimde aksar. İlk etki ile sonraki etki aynı mekanizma değildir. Deneyin hangi dokuyu, ne kadar çevreyi ve hangi süre boyunca etkilediğini bilmeden bütün organın anında öldüğü söylenemez.",
        ],
      },
      {
        title: "Kesit çizimini kanıtları birleştirerek oku",
        paragraphs: [
          "Özgün etkileşimde önce tipik tek çenekli ve çift çenekli örneği karşılaştır. Demetlerin yerini, öz–korteks ayrımını ve olağan vasküler kambiyumu birlikte incele. Sonra yalnız verilen çift çenekli modelde büyüme mevsimini artırıp yeni ksilemin kambiyuma göre içte kaldığını kontrol et.",
          "Şemanın renkleri dokunun gerçek rengi olmak zorunda değildir; anlamı yanındaki ad ve konum verir. Gösterilen halka sayısı bu öğretim modelinin kabulüne bağlıdır. Şekli yalnız görünüşü güzel olduğu için değil, aynı anda yazılı doku açıklamasıyla tutarlı olduğu için doğru kabul et.",
        ],
      },
      {
        title: "Sonucu yeni bir düzenekte denetle",
        paragraphs: [
          "Bir dal parçasında yaprak izleri, koltuk tomurcukları ve iletim kesiti birlikte verilirse organı ve büyüme türünü açıklamak daha güçlüdür. Ölçümde düğüm sayısını, düğümler arası uzunluğu, gövde çapını ve yeni doku türünü birbirinin yerine kullanma.",
          "Kendi açıklamanı şu sırayla kur: verilen gözlem nedir, hangi yapı onu açıklar, hangi başka sonuç henüz çıkarılamaz? Örneğin dağınık demet gözlemi tipik monokot kesitle uyumludur; tek başına bitkinin tek yıllık olduğunu göstermez. Bir kanıtın sınırını korumak yeni sorulara aktarımı kolaylaştırır.",
        ],
      },
    ],
    examples: [
      {
        title: "Toprak altındaki sürgünü tanı",
        prompt:
          "Toprak altında yatay büyüyen X organında beş düğüm, her düğümde indirgenmiş bir yaprak ve onun koltuğunda tomurcuk vardır. X için hangi organ kökeni en iyi desteklenir?",
        strategy: "Konum yerine düğüm–yaprak–tomurcuk birlikteliğini kullan.",
        steps: [
          {
            label: "Verileni yerleştir",
            explanation:
              "Toprak altında olma bilgisini yerleşim özelliği olarak yaz; bu bilgi tek başına kök anlamına gelmez.",
          },
          {
            label: "Bağlantıyı kur",
            explanation:
              "Düğümlerde yaprak ve koltuk tomurcuğu bulunması sürgün ekseni özellikleridir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "X, bu kanıtlarla toprak altı gövde olarak yorumlanır; su veya nişasta depolaması kökeni değiştirmez.",
          },
        ],
        answer: "Toprak altı gövde.",
        check:
          "Düğüm ve tomurcuğu aynı açıklamaya sığdır; yalnız derinlik üzerinden karar verme.",
        pitfall: "Her toprak altı organı kök diye sınıflandırmak.",
      },
      {
        title: "Düğümden aralığa geç",
        prompt:
          "Bir sürgünün aynı ekseni üzerinde art arda yedi düğüm görülüyor. Birinci düğümle yedinci düğüm arasındaki altı internodyumun her biri 3 cm ise bu iki düğüm arası kaç santimetredir?",
        strategy: "Nokta sayısı ile aralık sayısını ayrı yaz.",
        steps: [
          {
            label: "Verileni yerleştir",
            explanation:
              "Yedi düğüm arasında yediden bir eksik, yani altı tam internodyum vardır.",
          },
          {
            label: "Bağlantıyı kur",
            explanation:
              "Altı aralığın her biri 3 cm olduğundan uzunluk 6·3 olur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Sonuç 18 cm; 21 cm seçimi düğümleri aralık gibi sayardı.",
          },
        ],
        answer: "18 cm.",
        check:
          "İki düğümlü daha küçük bir örnekte yalnız bir aralık bulunduğunu kontrol et.",
        pitfall: "Yedi düğüm için yedi aralık çarpmak.",
      },
      {
        title: "Kambiyumun iki ürününü yerleştir",
        prompt:
          "Bir büyüme döneminde kambiyumun iç tarafına 0,24 mm sekonder ksilem, dış tarafına 0,06 mm sekonder floem ekleniyor. Bu iki dokuyu ad ve yön olarak nasıl sıralarsın? Kalınlık oranı nedir?",
        strategy:
          "Kambiyumu iç–dış referansı yap; sonra yalnız verilen kalınlıkları oranla.",
        steps: [
          {
            label: "Verileni yerleştir",
            explanation:
              "Organ merkezine bakan 0,24 mm kısmı sekonder ksilem olarak işaretle.",
          },
          {
            label: "Bağlantıyı kur",
            explanation:
              "Dış yüzeye bakan 0,06 mm kısmı sekonder floemdir; oran 0,24/0,06=4.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Bu dönem için ksilem:floem kalınlık oranı 4:1; bu oran bütün türlerin sabit kuralı değildir.",
          },
        ],
        answer: "İçte sekonder ksilem, dışta sekonder floem; 4:1.",
        check:
          "İki kalınlığın toplamı 0,30 mm, ayrı ürünlerin sırasını değiştirmez.",
        pitfall: "Daha ince ürünün daha içte olması gerektiğini varsaymak.",
      },
      {
        title: "Kesitin yaş sınırını koru",
        prompt:
          "Bir ağacın yerden 1,5 m yüksekteki kesitinde dokuz belirgin büyüme halkası sayılıyor. Bu gövde bölgesinde her büyüme yılında tek halka oluştuğu verilmiş. Ağacın tohumdan itibaren tam yaşı kesin belirlenir mi?",
        strategy:
          "Halkaların sayıldığı bölgeyi bütün bireyin doğumuyla özdeşleştirme.",
        steps: [
          {
            label: "Verileni yerleştir",
            explanation:
              "Dokuz halka, verilen kabul altında bu bölgenin dokuz büyüme dönemine ait kayıt taşır.",
          },
          {
            label: "Bağlantıyı kur",
            explanation:
              "Fidanın bu yüksekliğe ulaşmadan önce ne kadar süre büyüdüğü verilmemiştir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Kesit dokuz dönemi gösterir; tohumdan itibaren tam yaş için ek başlangıç bilgisi gerekir.",
          },
        ],
        answer:
          "Kesitin dokuz büyüme dönemi okunur; bütün ağacın tam yaşı kesinleşmez.",
        check:
          "Kesit gövde tabanından alınsaydı hangi ek başlangıç varsayımına ihtiyaç kalacağını düşün.",
        pitfall:
          "Kesit yüksekliği ve ilk büyüme zamanını yok sayıp tam yaşı eşitlemek.",
      },
      {
        title: "Kısa süre ile uzun süreyi ayır",
        prompt:
          "Yalnız floemi etkileyen bir halka çıkarılan bitkide ksilem sağlam. İlk gün su yukarı iletiliyor; haftalar sonra kök deposu azalıyor. Bu iki gözlem birbiriyle çelişir mi?",
        strategy:
          "Doğrudan kesilen yolu ve canlı kökün daha sonraki ihtiyacını ayrı izle.",
        steps: [
          {
            label: "Verileni yerleştir",
            explanation:
              "İlk müdahale floemin organik madde yolunu keser; sağlam ksilem başlangıçta suyu taşıyabilir.",
          },
          {
            label: "Bağlantıyı kur",
            explanation:
              "Kök yeni organik madde alamadıkça mevcut depolarını tüketebilir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Kökün sonradan işlev kaybıyla su alımının aksaması, başlangıçta ksilemin açık olmasıyla tutarlıdır.",
          },
        ],
        answer: "Çelişmez; erken doğrudan etki ile geç dolaylı etki farklıdır.",
        check:
          "İlk günün sonucunu haftalar sonrasına süresiz taşımadığını kontrol et.",
        pitfall:
          "Floem kesildiği an bütün su borularının da fiziksel olarak kesildiğini sanmak.",
      },
      {
        title: "İki ayrı sınıflama ölçütü",
        prompt:
          "X bitkisi üç kış boyunca yaşamış ve yeniden sürgün oluşturmuş; gövdelerinde belirgin odun gelişimi gözlenmemiştir. X için ömür ve gövde yapısı nasıl birlikte ifade edilir?",
        strategy: "Yaşam süresi ile odunsuluk ölçütünü iki sütuna ayır.",
        steps: [
          {
            label: "Verileni yerleştir",
            explanation:
              "Birden fazla kıştan sonra yaşamını sürdüren X, verilen gözleme göre çok yıllıktır.",
          },
          {
            label: "Bağlantıyı kur",
            explanation:
              "Belirgin odun gelişmemesi, verilen örneğin otsu gövde yapısıyla uyumludur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "X, çok yıllık otsu bir bitki olabilir; iki ifade birbirini dışlamaz.",
          },
        ],
        answer: "Çok yıllık ve otsu.",
        check:
          "Tek yıllık sözcüğünü kullanmak için hangi gözlemin eksik kaldığını açıkla.",
        pitfall: "Otsu sözcüğünü tek yıllık sözcüğüyle eş anlamlı saymak.",
      },
    ],
    recall: [
      {
        prompt:
          "Bir depo organının gövde kökenini hangi yapısal işaretler destekler?",
        answer:
          "Düğüm, yaprak/indirgenmiş yaprak izleri ve koltuk tomurcuğu gibi sürgün özellikleri; yalnız toprak altında olma veya depolama yetmez.",
      },
      {
        prompt:
          "Kambiyuma göre sekonder ksilem ve sekonder floem nereye eklenir?",
        answer:
          "Sekonder ksilem merkeze bakan iç tarafa, sekonder floem dış tarafa eklenir.",
      },
      {
        prompt: "Düğüm sayısını internodyum sayısına nasıl bağlarsın?",
        answer:
          "Aynı eksende kesintisiz n ardışık düğümün ilk ve sonu arasında n−1 tam internodyum bulunur.",
      },
      {
        prompt: "Otsu gövde bitkinin tek yıllık olduğunu kanıtlar mı?",
        answer:
          "Hayır. Otsuluk gövde yapısı, tek/çok yıllıklık yaşam süresidir; çok yıllık otsu bitkiler de vardır.",
      },
      {
        prompt:
          "Halka çıkarma deneyinde ksilem sağlamsa ilk etki ile geç etki nasıl ayrılır?",
        answer:
          "Önce floemle organik madde aktarımı kesilebilir; kökün depo tüketimi ve canlılık kaybıyla su alımı daha sonra dolaylı aksayabilir.",
      },
      {
        prompt: "Büyüme halkasından kesin yaş söylemek için ne verilmelidir?",
        answer:
          "Halka oluşumunun bir büyüme dönemiyle ilişkisi, kesitin yeri ve gerekliyse bölgenin oluştuğu başlangıç zamanı bilinmelidir.",
      },
    ],
    items: [
      {
        prompt:
          "Toprak altında büyüyen bir depo organının üzerinde düğümler, indirgenmiş yaprak izleri ve bu yaprakların koltuğunda tomurcuklar görülüyor. Bu organı en iyi açıklayan yargı hangisidir?",
        correct:
          "Gövde kökeni, düğüm ve tomurcuk gibi sürgün özellikleriyle desteklenir.",
        reason:
          "Yerleşim toprak altında olsa da düğüm–yaprak–tomurcuk birlikteliği sürgün eksenine ait morfolojik kanıttır.",
        wrong: [
          [
            "Toprak altında bulunduğu için mutlaka ana köktür.",
            "Toprak altı gövdeler de vardır; yerleşim kökeni tek başına belirlemez.",
          ],
          [
            "Besin depoladığı için bütün hücreleri floemdir.",
            "Depolama bir organ işlevi; floem ise bir doku sisteminin parçasıdır.",
          ],
          [
            "Tomurcuk bulunduğuna göre organ bir yaprak ayasıdır.",
            "Koltuk tomurcuğu yaprakla gövdenin birleşimine ait işarettir; yaprak ayasının kendisi sayılmaz.",
          ],
          [
            "Organ kökeni yalnız depolanan maddenin türüyle belirlenir.",
            "Aynı madde farklı kökenli organlarda depolanabilir.",
          ],
        ],
        knowledge: [
          "Organ kökeni, yerleşim ve işlevden ayrı morfolojik ölçütlerle belirlenir.",
        ],
        strategy:
          "Konum ve depo görevini bir yana ayırıp sürgüne ait işaretleri birlikte değerlendir.",
        steps: [
          "Toprak altında bulunmayı yalnız yerleşim bilgisi olarak kaydet.",
          "Düğüm ve koltuk tomurcuğunu sürgün ekseni belirtileri olarak eşleştir.",
          "Gövde kökenini destekleyen seçeneği, yalnız konuma dayanan kök iddiasından ayır.",
        ],
        commonError: "Her yer altı depo organını kök sanmak.",
        check:
          "Açıklama verilen üç yapısal işareti de kapsıyor; yalnız depolamaya dayanmıyor.",
      },
      {
        prompt:
          "Genç, yeşil bir bitki gövdesinin bazı parankima hücrelerinde kloroplast, aynı gövdenin farklı bölgelerinde ksilem ve floem bulunduğu gözleniyor. Bu bulgular birlikte hangi sonucu destekler?",
        correct:
          "Aynı gövdede fotosenteze katılan hücrelerle madde iletimine katılan dokular birlikte bulunabilir.",
        reason:
          "Gövde bir organdır; farklı görevli dokular ve kloroplastlı temel doku hücreleri aynı organ içinde yer alabilir.",
        wrong: [
          [
            "Ksilem bulunduğundan bu gövdede hiçbir hücre fotosentez yapamaz.",
            "Ksilem varlığı kloroplastlı parankimayı ortadan kaldırmaz.",
          ],
          [
            "Yeşil görünen her hücre floem olmak zorundadır.",
            "Yeşil renk doku kökenini floem olarak belirlemez.",
          ],
          [
            "Fotosentez yalnız kök emici tüylerinde gerçekleşir.",
            "Verilen kloroplastlı hücreler gövdededir; emici tüy zorunluluğu yoktur.",
          ],
          [
            "Bir organ tek bir görev yapabileceği için gözlemler çelişkilidir.",
            "Bir organ birden çok doku ve işlevi birlikte taşıyabilir.",
          ],
        ],
        knowledge: [
          "Gövde, destek ve iletimin yanında kloroplastlı hücreleri varsa fotosenteze de katılabilir.",
        ],
        strategy:
          "Hücrede gözlenen organelle organdaki iletim dokusunu farklı yapı düzeylerinde tut.",
        steps: [
          "Kloroplastlı parankima hücrelerinin fotosenteze katılabileceğini belirle.",
          "Ksilem ve floemin aynı organın iletim dokuları olduğunu yerleştir.",
          "Bu işlevleri birbirini dışlamadan birleştiren yargıyı seç.",
        ],
        commonError:
          "Bir işlev gözlendiğinde aynı organda bütün öteki işlevleri yok saymak.",
        check: "Doğru yargı hem kloroplastı hem iki iletim dokusunu açıklıyor.",
      },
      {
        prompt:
          "Bir sürgünün aynı doğrultudaki ekseni üzerinde art arda altı düğüm işaretleniyor. İlk düğüm ile altıncı düğüm arasındaki beş internodyum eşit uzunlukta ve toplam uzaklık 25 mm. Bir internodyum kaç mm olur?",
        correct: "5 mm.",
        reason:
          "Altı ardışık düğüm arasında beş aralık vardır; verilen 25 mm bu beş internodyumun toplamıdır.",
        wrong: [
          ["25/6 mm.", "Düğüm sayısı aralık sayısı olarak kullanılmıştır."],
          ["25 mm.", "Bu bütün beş aralığın toplamıdır; tek aralık değildir."],
          ["6 mm.", "Düğüm sayısı doğrudan uzunluk olamaz."],
          ["125 mm.", "Toplam uzunluk aralık sayısıyla çarpılmaz, bölünür."],
        ],
        knowledge: [
          "n ardışık düğümün ilk ve sonu arasında n−1 internodyum bulunur.",
        ],
        strategy: "Eşit aralıkları sayıp verilen toplamı bu sayıya böl.",
        steps: [
          "Altı düğümün arasında beş tam internodyum bulunduğunu yaz.",
          "Toplam 25 mm’yi beşe bölerek 5 mm bul.",
          "Beş aralıkla geri çarp: 5·5=25 mm; ilk–son uzaklığı korunur.",
        ],
        commonError: "Düğüm ve internodyum sayılarını eşitlemek.",
        check:
          "Bir düğüm daha eklenirse aralık sayısının da bir artacağını dene.",
      },
      {
        prompt:
          "Bir yaprağın gövdeye bağlandığı düğümde, yaprak sapı ile gövde arasındaki koltukta küçük bir tomurcuk görülüyor. Bu tomurcuk etkinleşip yaprak taşıyan yeni bir eksen oluşturuyor. Yapının en uygun adı ve sonucu hangisidir?",
        correct: "Yanal tomurcuk; yeni bir dalın oluşumuna katılır.",
        reason:
          "Verilen konum koltuk tomurcuğuna, yaprak taşıyan yeni eksen ise dal gelişimine karşılık gelir.",
        wrong: [
          [
            "Kaliptra; yeni kök şapkasını oluşturur.",
            "Kaliptra kök ucundaki koruyucu yapıdır; verilen yaprak koltuğu değildir.",
          ],
          [
            "Stoma; gövdeyi bütünüyle odunlaştırır.",
            "Stoma gaz geçişiyle ilgili gözenektir, yaprak taşıyan dal oluşturmaz.",
          ],
          [
            "İnternodyum; yalnız ölü ksilem üretir.",
            "İnternodyum iki düğüm arası bölgedir; sorudaki tomurcuk adı değildir.",
          ],
          [
            "Mantar kambiyumu; çiçek sapının koltuğunda yeni yaprak üretir.",
            "Mantar kambiyumu peridermle ilişkilidir; yanal sürgün tomurcuğu yerine kullanılamaz.",
          ],
        ],
        knowledge: [
          "Yaprak koltuğundaki tomurcuk, yanal sürgün gelişimine katılabilir.",
        ],
        strategy:
          "Önce tomurcuğun konumunu, sonra oluşan yeni yapının niteliğini adlandır.",
        steps: [
          "Tomurcuğun yaprak sapı–gövde koltuğunda bulunduğunu işaretle.",
          "Yeni eksenin yaprak taşımasını bir sürgün dalı gelişimi olarak tanı.",
          "Yanal tomurcuk ve dal eşleşmesini, kök ya da örtü dokusu adlarından ayır.",
        ],
        commonError:
          "Her büyüme noktasını organ ve konum ayrımı yapmadan aynı adla anmak.",
        check:
          "Seçilen ad, hem koltuk konumuyla hem yapraklı yeni eksenle uyumludur.",
      },
      {
        prompt:
          "X bitkisi dört yıl boyunca yaşamını sürdürmüş; her yıl yeni otsu sürgünler oluşturmuş ve gözlenen gövdelerde belirgin odun dokusu gelişmemiştir. Yalnız bu verilere göre hangi sınıflama uygundur?",
        correct: "X, çok yıllık ve otsu gövdeli bir bitki olabilir.",
        reason:
          "Yaşam süresi birden fazla yılı kapsar; verilen gövde yapısı ise otsulukla uyumludur. Bu iki ölçüt bağımsız ele alınır.",
        wrong: [
          [
            "X otsuysa dört yıllık gözlem mutlaka yanlıştır.",
            "Otsu bitkilerin tümünün tek yıllık olması gerekmez.",
          ],
          [
            "X dört yıl yaşamışsa her gövdesi zorunlu odunsudur.",
            "Uzun yaşam, her gövdenin odunsu olmasını zorunlu kılmaz.",
          ],
          [
            "X’in tek çenekli olduğu kesinleşmiştir.",
            "Çift çenekli otsu bitkiler de olabilir; bu veri çenek yapısını kesinleştirmez.",
          ],
          [
            "Odun görülmemesi, bitkide hiç iletim dokusu olmadığını gösterir.",
            "Otsu gövdelerde de ksilem ve floem bulunabilir.",
          ],
        ],
        knowledge: [
          "Otsuluk/odunsuluk gövde yapısını; tek/çok yıllıklık yaşam süresini anlatır.",
        ],
        strategy: "İki sınıflama ölçütünü ayrı sorulara dönüştür.",
        steps: [
          "Dört yıllık yaşamı çok yıllılık yönünden değerlendir.",
          "Belirgin odun gelişmeyen gözlenen sürgünleri otsu yapı yönünden değerlendir.",
          "Bu iki bilgiyi birlikte tutup çenek sayısı gibi verilmemiş bir özelliği ekleme.",
        ],
        commonError: "Otsu sözcüğünü tek yıllık sözcüğüyle özdeşleştirmek.",
        check:
          "Doğru seçenek dört yıllık gözlemle de gövde bulgusuyla da çelişmiyor.",
      },
      {
        prompt:
          "Bir öğretim karşılaştırmasında A gövdesinin iletim demetleri temel dokuda dağınık; olağan vasküler kambiyum ve belirgin öz–korteks ayrımı yok. B gövdesinin demetleri halka biçiminde; öz ve korteks ayırt ediliyor. Bu iki tipik örnek için hangi eşleştirme uygundur?",
        correct:
          "A tipik tek çenekli, B tipik çift çenekli gövde kesitiyle uyumludur.",
        reason:
          "Demet yerleşimi ve temel doku ayrımı birlikte, karşılaştırılan tipik gövde modellerini destekler.",
        wrong: [
          [
            "A kök, B yaprak olmak zorundadır.",
            "Her ikisinin gövde olduğu verilmiştir; organ adı keyfî değiştirilemez.",
          ],
          [
            "A’da dağınık demet olması bitkinin tek yıllık olduğunu kesin kanıtlar.",
            "Demet düzeni yaşam süresini tek başına belirlemez.",
          ],
          [
            "B’de halka biçimli demet bulunması floem olmadığı anlamına gelir.",
            "Halka düzeni ksilem ve floem içeren demetleri kapsar.",
          ],
          [
            "Bu iki düzenin arasında hiçbir anatomik fark yoktur.",
            "Verilen demet konumu ve öz–korteks ayrımı gerçek karşılaştırma ölçütleridir.",
          ],
        ],
        knowledge: [
          "Tipik tek ve çift çenekli gövdeler, demetlerin konumu ve temel doku düzeni bakımından karşılaştırılır.",
        ],
        strategy:
          "Tek işaret yerine iki bağımsız kesit özelliğini birlikte eşleştir.",
        steps: [
          "A’daki dağınık demetleri ve belirgin öz–korteks ayrımının yokluğunu bir araya getir.",
          "B’deki halkalı demet ve belirgin temel bölge ayrımını ikinci örneğe yerleştir.",
          "Tipik gövde eşleşmesini seç; yaşam süresi veya başka organ adı ekleme.",
        ],
        commonError:
          "Bir anatomik karşılaştırmayı bütün türler için sınırsız sınıflama kuralı sanmak.",
        check:
          "Seçenek örnekleri tipik model olarak tanımlar ve sorunun gövde bağlamını korur.",
      },
      {
        prompt:
          "Genç bir çift çenekli gövdenin enine kesitindeki aynı iletim demetinde K bölgesi organ merkezine daha yakın, F bölgesi dış yüzeye daha yakındır. K ile F arasında vasküler kambiyum verilmiştir. K ve F en uygun nasıl adlandırılır?",
        correct: "K ksilem, F floemdir.",
        reason:
          "Verilen tipik gövde demetinde kambiyuma göre içte ksilem, dışta floem yer alır.",
        wrong: [
          ["K floem, F ksilemdir.", "İç–dış yerleşimi ters kurulmuştur."],
          [
            "İkisi de kaliptradır.",
            "Kaliptra gövde iletim demetinin iki bölgesi değildir.",
          ],
          [
            "K kütikula, F kök emici tüyüdür.",
            "Kütikula örtü, emici tüy kök yüzey yapısıdır; kambiyumlu demet eşleşmez.",
          ],
          [
            "K öz, F kortekstir; demette iletim dokusu bulunmaz.",
            "Soruda aynı iletim demetinin kambiyuma komşu kısımları verilmiştir.",
          ],
        ],
        knowledge: [
          "Tipik çift çenekli gövdede ksilem merkez yönünde, floem dış yüzey yönündedir.",
        ],
        strategy:
          "Ekrandaki sağ–sola değil organ merkezine göre iç–dışı belirle.",
        steps: [
          "K’nin merkez yönündeki bölge olduğunu tespit et.",
          "Kambiyumu araya koyup dış yüzey tarafındaki F’yi ayır.",
          "İçte ksilem ve dışta floem sırasını K–F adlarına eşleştir.",
        ],
        commonError: "Sayfa yönünü anatomik iç–dış yönü sanmak.",
        check: "Kesit resmi döndürülse de K’nin merkeze yakınlığı değişmez.",
      },
      {
        prompt:
          "Bir gövdede işaretlenen vasküler kambiyumun bölünmeleri izleniyor. Yeni hücrelerden X organ merkezine bakan tarafta, Y dış yüzeye bakan tarafta iletim dokusuna farklılaşıyor. Beklenen temel ürün eşleşmesi hangisidir?",
        correct: "X sekonder ksilem, Y sekonder floemdir.",
        reason:
          "Vasküler kambiyum içe sekonder ksilem, dışa sekonder floem ekleyerek sekonder kalınlaşmaya katılır.",
        wrong: [
          [
            "X sekonder floem, Y sekonder ksilemdir.",
            "Ürünlerin kambiyuma göre yönü ters çevrilmiştir.",
          ],
          [
            "X yumurta, Y polendir.",
            "Üreme hücreleri vasküler kambiyumun bu iletim ürünleri değildir.",
          ],
          [
            "X ve Y yalnız kütikula salgısıdır.",
            "Kütikula vasküler kambiyumun sekonder iletim dokusu ürünü değildir.",
          ],
          [
            "X kaliptra, Y yaprak ayasıdır.",
            "Bir gövdenin yanal meristem ürünleri kök şapkası ve yaprak organıyla eşleştirilemez.",
          ],
        ],
        knowledge: [
          "Vasküler kambiyumun ürünleri sekonder iletim dokularıdır.",
        ],
        strategy: "Kambiyumun ürünlerini iç ve dış yönde ayrı izle.",
        steps: [
          "X’in merkeze bakan yeni doku olduğunu kaydet.",
          "Y’nin dış tarafta kaldığını ve her ikisinin iletim dokusuna farklılaştığını kullan.",
          "İç ürünü sekonder ksilem, dış ürünü sekonder floem olarak tamamla.",
        ],
        commonError:
          "Vasküler kambiyumu mantar kambiyumu veya uç meristemiyle aynı ürünleri veriyor sanmak.",
        check:
          "İki ürünün adları hem iletim görevi hem belirtilen yönlerle uyuşur.",
      },
      {
        prompt:
          "Uygun bir odunsu gövdede M meristeminin etkinliği sürgün ucunda yeni boyuna gelişimle; N meristeminin etkinliği ise kambiyumdan yeni iletim dokusu eklenip çapın artmasıyla ilişkilidir. Bu iki büyüme bileşeni nasıl eşleşir?",
        correct:
          "M primer boyuna büyümeyle, N sekonder kalınlaşmayla ilişkilidir.",
        reason:
          "Uç meristemi yeni primer dokularla boyuna gelişime, vasküler kambiyum sekonder iletim dokularıyla enine kalınlaşmaya katılır.",
        wrong: [
          [
            "M yalnız kabuk kalınlığı, N yalnız düğüm sayısı üretir.",
            "Verilen yer ve ürünler bu tekli eşleşmeyi desteklemez.",
          ],
          [
            "M ve N aynı dokunun aynı yöndeki büyümesidir.",
            "Büyümenin konumu ve eklenen doku türleri farklıdır.",
          ],
          [
            "Çap artışı gözlenirse boyuna büyüme olanaksızdır.",
            "Uygun bitkide iki büyüme bileşeni aynı dönemde birlikte görülebilir.",
          ],
          [
            "Primer büyüme yalnız ölü hücrelerin şişmesiyle gerçekleşir.",
            "Primer büyüme meristemden hücre üretimi ve gelişimini içerir.",
          ],
        ],
        knowledge: [
          "Uç ve yanal meristemler farklı büyüme bileşenleriyle ilişkilendirilir.",
        ],
        strategy:
          "Konumu, üretilen dokuyu ve ölçülen değişimi aynı sırada eşleştir.",
        steps: [
          "M’de uç bölge ve yeni boyuna gelişimi birleştir.",
          "N’de kambiyumdan sekonder iletim dokusu eklenmesini çap artışıyla ilişkilendir.",
          "İki büyümenin birlikte mümkün olduğunu koruyarak doğru adları yerleştir.",
        ],
        commonError:
          "Bir büyüme bileşeninin gözlenmesini diğerinin yokluğu saymak.",
        check:
          "Doğru seçenek gözlenen konum ve doku ürünlerini değiştirmeden açıklar.",
      },
      {
        prompt:
          "Bir gövde kesitinde her büyüme döneminde bir erken odun ve bir geç odun bandı oluştuğu; bu iki bandın birlikte tek belirgin halka sayıldığı verilmiştir. Kesitte 12 böyle bant bulunuyor ve hiçbir bant eksik değil. Kaç büyüme dönemine ait kayıt vardır?",
        correct: "6 dönem.",
        reason:
          "Bir döneme iki bant karşılık gelir; 12/2=6 dönem bulunur. Bu sonuç verilen oluşum kabulüne bağlıdır.",
        wrong: [
          [
            "12 dönem.",
            "Her bandı tek halka saymak aynı dönemi iki kez sayar.",
          ],
          ["24 dönem.", "Bant sayısı ikiyle çarpılmaz, ikiye bölünür."],
          ["Kesin 6 günlük yaş.", "Verilen birim büyüme dönemi; gün değildir."],
          [
            "Bantlar yalnız floemde oluştuğundan dönem bilgisi vermez.",
            "Soruda erken ve geç odun bantları verilmiştir; bunlar sekonder ksileme aittir.",
          ],
        ],
        knowledge: [
          "Belirtilen modelde erken ve geç odun birlikte bir büyüme halkasını oluşturur.",
        ],
        strategy: "Bir dönemin kaç bant içerdiğini başlangıçta sabitle.",
        steps: [
          "Her döneme bir erken ve bir geç odun bandı, toplam iki bant yaz.",
          "12 tam bandı ikili gruplara ayırarak altı grup bul.",
          "Sonucu gün veya bütün ağacın yaşı diye genişletmeden altı büyüme dönemi olarak ifade et.",
        ],
        commonError:
          "Renk bandı sayısını verilen halka tanımını okumadan yaşa eşitlemek.",
        check: "Altı dönemde 6·2=12 bant beklenmesi veriye geri döner.",
      },
      {
        prompt:
          "Bir dalın dış yüzeyinde tomurcuk pullarından kalmış izler; aynı bitkinin odun enine kesitinde ise erken ve geç odun sınırları görülüyor. Bu iki gözlem nasıl ilişkilendirilmelidir?",
        correct:
          "İzler sürgün yüzeyindeki büyüme dönemlerini, odun sınırları ise sekonder ksilemdeki dönemsel yapıyı gösterebilir; aynı doku değildir.",
        reason:
          "Tomurcuk pulları dış yüzey yapıları, odun halkaları sekonder ksilemin farklılaşmasıdır. İkisinin dönem bilgisi vermesi anatomik olarak aynı oldukları anlamına gelmez.",
        wrong: [
          [
            "Tomurcuk pulu izleri doğrudan floemdeki kalburlu plaklardır.",
            "Dış yüzeydeki pul izleri floem borularının iç bağlantı plaklarıyla aynı yapı değildir.",
          ],
          [
            "Her iki işaret yalnız kök şapkasında oluşur.",
            "Gözlemler gövde yüzeyi ve odun kesiti üzerindedir; kaliptra değildir.",
          ],
          [
            "Odun halkaları yaprak ayasındaki stoma sayısına eşittir.",
            "Halka ve stoma farklı yapıları ve ölçütleri anlatır; verilen eşitlik yoktur.",
          ],
          [
            "İki işaretin bulunması bütün ağacın tam yaşını hiçbir ek koşul olmadan verir.",
            "İşaretlerin oluşum sıklığı, kesitin yeri ve başlangıç bilgisi bilinmeden kesin yaş kurulamaz.",
          ],
        ],
        knowledge: [
          "Büyüme dönemiyle ilişkili farklı işaretler farklı doku ve organ bölgelerinde oluşabilir.",
        ],
        strategy:
          "Gözlemin yapıldığı yeri ve işareti oluşturan dokuyu ayrı eşleştir.",
        steps: [
          "Tomurcuk pulu izlerini dalın dış yüzeyine yerleştir.",
          "Erken–geç odun sınırını sekonder ksilemdeki farklı hücre özellikleriyle ilişkilendir.",
          "İki yapıyı aynı doku saymadan dönemsel bilgi taşıyabileceklerini koru.",
        ],
        commonError:
          "Benzer bir zaman bilgisi veren bütün işaretleri aynı anatomi sanmak.",
        check:
          "Doğru seçenek yüzey izini de odun kesitini de kendi yerinde bırakır.",
      },
      {
        prompt:
          "Bir çift çenekli gövdede önceki yıl oluşmuş sekonder ksilem işaretleniyor. Sonraki büyüme döneminde kambiyum iç tarafa yeni ksilem ekliyor. Eski ksilem ile kambiyum arasındaki konum için hangi sonuç beklenir?",
        correct:
          "Yeni sekonder ksilem, önceki ksileme göre kambiyuma daha yakın iç tarafta yer alır.",
        reason:
          "Kambiyumun iç yüzünde üretilen yeni ksilem, daha önce birikmiş ksilem ile o anki kambiyum arasında eklenir.",
        wrong: [
          [
            "Yeni ksilem bütün floemin dışında, peridermin üstünde oluşur.",
            "Ksilem kambiyumun iç ürünüdür; dış örtünün dışına eklenmez.",
          ],
          [
            "Önceki yılın ksilemi yeni oluştuğu için mutlaka en dışta kalır.",
            "Yeni ürün kambiyuma bitişik tarafta eklenirken önceki ksilem daha içte kalır.",
          ],
          [
            "Kambiyum yalnız dışa ürün verdiği için yeni ksilem oluşamaz.",
            "Vasküler kambiyum hem içe ksilem hem dışa floem ekleyebilir.",
          ],
          [
            "Ksilem eklenmesiyle gövde bir kök şapkasına dönüşür.",
            "Sekonder büyüme organ kimliğini kaliptraya dönüştürmez.",
          ],
        ],
        knowledge: [
          "Sekonder ksilem, vasküler kambiyumun iç tarafına ardışık olarak eklenir.",
        ],
        strategy:
          "Yeni ürünün eklendiği sınıra göre eski ve yeni dokunun göreli yerini kur.",
        steps: [
          "İlk yılın ksilemini kambiyumun merkez tarafında tut.",
          "Sonraki dönemin ksilemini o anki kambiyumun iç yüzüne ekle.",
          "Yeni tabakanın kambiyuma, eski tabakanın merkeze göre konumunu karşılaştır.",
        ],
        commonError:
          "Yeni ürünün kambiyumun hangi yüzünde oluştuğunu kaybedip dış yüzeye taşımak.",
        check: "Yeni tabaka iç üründür; floemin dışında gösterilmiyor.",
      },
      {
        prompt:
          "Bir bitkinin toprak altı gövdesinde depolanmış nişasta ilkbaharda şekere çevriliyor ve yeni sürgünlere aktarılıyor. Bu dönemde depo gövdenin kaynak–havuz ilişkisi için hangi yorum uygundur?",
        correct:
          "Depo gövde, çözünür organik madde sağlayarak yeni sürgünler için kaynak işlevi görebilir.",
        reason:
          "Kaynak olmak yalnız o anda fotosentez yapmak değildir; depodan mobilize edilen organik madde de başka organa gönderilebilir.",
        wrong: [
          [
            "Toprak altında olan organ hiçbir zaman organik madde kaynağı olamaz.",
            "Depo maddelerinin mobilizasyonu kaynak işlevi sağlayabilir.",
          ],
          [
            "Yeni sürgünler besin aldıkları için bu deneyde kaynaktır.",
            "Verilen aktarımda organik madde alan ve büyümede kullanan sürgünler havuzdur.",
          ],
          [
            "Nişastanın şekere dönüşmesi bütün ksilemi floeme dönüştürür.",
            "Depo metabolizması ile iletim dokusunun kimliği aynı olay değildir.",
          ],
          [
            "Kaynak–havuz adları yalnız organın yukarıda veya aşağıda olmasına göre verilir.",
            "İlişki, organik maddenin sağlanması ve kullanılmasıyla belirlenir.",
          ],
        ],
        knowledge: [
          "Kaynak ve havuz rolleri organik madde akışına göre belirlenir ve gelişim dönemine göre değişebilir.",
        ],
        strategy: "Bu dönemde organik maddeyi veren ve alan tarafı belirle.",
        steps: [
          "Nişastadan oluşan şekerin depo gövdeden çıktığını kaydet.",
          "Yeni sürgünün bu organik maddeyi büyümede kullandığını havuz işleviyle eşleştir.",
          "Depo gövdeye kaynak rolü ver; toprağın altı–üstü konumunu ölçüt yapma.",
        ],
        commonError:
          "Bir organın bir mevsimdeki havuz rolünü her dönem değişmez kabul etmek.",
        check:
          "Aktarım oku depo gövdeden yeni sürgüne gider; adlandırma bu yönü izliyor.",
      },
      {
        prompt:
          "Odunsu bir gövdede P meristemi peridermin koruyucu hücrelerini, V meristemi ise içe sekonder ksilem ve dışa sekonder floem oluşturuyor. P ve V için hangi eşleştirme doğrudur?",
        correct: "P mantar kambiyumu, V vasküler kambiyumdur.",
        reason:
          "Ürün türü meristemleri ayırır: peridermin oluşumu mantar kambiyumuyla, sekonder iletim dokuları vasküler kambiyumla ilişkilidir.",
        wrong: [
          [
            "P vasküler kambiyum, V mantar kambiyumudur.",
            "İki meristemin ürünleri ters eşleştirilmiştir.",
          ],
          [
            "P bekçi hücre, V kök emici tüyüdür.",
            "Bunlar verilen ürünleri üreten yanal meristem adları değildir.",
          ],
          [
            "P ve V aynı şekilde yalnız polen üretir.",
            "Verilen ürünler koruyucu ve iletim dokularıdır; polen değildir.",
          ],
          [
            "P ve V’nin ürünleri aynı olduğundan ayırt edilemezler.",
            "Soruda farklı doku ürünleri açıkça belirtilmiştir.",
          ],
        ],
        knowledge: [
          "Mantar ve vasküler kambiyum, ürünleri farklı olan iki yanal meristemdir.",
        ],
        strategy: "Adı tahmin etmeden önce her meristemin ürün listesini ayır.",
        steps: [
          "P’nin periderm oluşturmasını örtü yenilenmesiyle ilişkilendir.",
          "V’nin iki yöne sekonder iletim dokusu eklediğini belirle.",
          "Ürünleri mantar kambiyumu ve vasküler kambiyum adlarıyla doğru sırada eşleştir.",
        ],
        commonError:
          "İki yapının adında kambiyum geçmesini bütün ürünlerinin aynı olması saymak.",
        check:
          "Doğru sırada V’nin iç ürünü ksilem olarak kalır; P’nin ürünü peridermle ilişkilidir.",
      },
      {
        prompt:
          "Bir odun örneğinde olgun trake ve trakeitlerin canlı içeriğini kaybettiği, bunların arasında ise canlı parankima hücreleri bulunduğu gösteriliyor. Bu örnek hangi genellemenin yanlışlığını kanıtlar?",
        correct:
          "Odun içindeki bütün hücrelerin aynı canlılık durumunda olduğu genellemesinin.",
        reason:
          "Aynı odun örneğinde hem canlı içeriksiz iletim elemanları hem canlı parankima bulunduğu verilmiştir; tüm hücreleri tek canlılık sınıfına koymak bu veriyle çelişir.",
        wrong: [
          [
            "Olgun trake ve trakeitlerin su iletimine katılabildiğinin.",
            "Canlı içeriğini kaybetmiş olgun iletim elemanları su taşınmasına katılabilir.",
          ],
          [
            "Parankima hücrelerinin bazı organlarda canlı olabileceğinin.",
            "Soruda canlı parankima doğrudan gösterilmiştir; bu ifade çürütülmez.",
          ],
          [
            "Gövdenin farklı doku elemanları içerebileceğinin.",
            "Örnek farklı elemanların birlikte bulunmasını destekler.",
          ],
          [
            "Canlılık ile mekanik destek görevinin ayrı ölçütler olduğunun.",
            "Bu iki ölçütün ayrı tutulması verilen gözlemle çelişmez.",
          ],
        ],
        knowledge: [
          "Odun, farklı canlılık ve görev özellikleri taşıyan elemanlar içerebilir.",
        ],
        strategy: "Tek bir karşı örnekle çürüyen evrensel ifadeyi bul.",
        steps: [
          "Canlı parankimayı bir gruba, canlı içeriğini kaybetmiş olgun iletim elemanlarını diğer gruba yaz.",
          "İki grubun aynı örnekte bulunduğunu kullan.",
          "Bütün hücrelere tek canlılık durumu yükleyen genellemeyi seç.",
        ],
        commonError:
          "Bir iletim elemanının durumunu bütün odun dokusuna yaymak.",
        check: "Doğru seçenek her iki hücre grubunun birlikte varlığını korur.",
      },
      {
        prompt:
          "Bir gövdenin yalnız dıştan görünüşü inceleniyor: yaprak izleri ve birkaç tomurcuk seçilebiliyor. Odun kesiti, türün büyüme düzeni ve ilk sürgünün oluşum tarihi bilinmiyor. Bu gözlemden hangisi doğrudan çıkarılamaz?",
        correct: "Bitkinin tohumdan itibaren tam yaşı.",
        reason:
          "Dış yüzey işaretleri yapı ve bazı büyüme dönemleri için kanıt olabilir; oluşum sıklığı ve başlangıç bilinmeden tam yaş hesaplanamaz.",
        wrong: [
          [
            "Gözlenen yerde yaprak bağlantılarının geçmişte bulunmuş olabileceği.",
            "Yaprak izi, önceki yaprak bağlantısıyla uyumlu doğrudan bir işarettir.",
          ],
          [
            "Tomurcukların gövde üzerindeki farklı konumlarının gösterilebileceği.",
            "Görünen tomurcuklar konum açısından işaretlenebilir.",
          ],
          [
            "Dış yüzey gözleminin odun enine kesitiyle aynı veri olmadığı.",
            "İki gözlem türü açıkça farklıdır.",
          ],
          [
            "Ek kesit ve başlangıç bilgisiyle daha güçlü bir açıklama kurulabileceği.",
            "Eksik verilerin tamamlanması yorum gücünü artırabilir.",
          ],
        ],
        knowledge: [
          "Kesin yaş çıkarımı için gözlenen işaretin oluşum koşulu ve zaman başlangıcı bilinmelidir.",
        ],
        strategy:
          "Görünen yapıyı tanımakla bilinmeyen zamanı hesaplamayı ayır.",
        steps: [
          "Gözlenen verileri yaprak izi ve tomurcuk konumuyla sınırla.",
          "Yaş için gereken başlangıç tarihi ve dönem–işaret ilişkisini arayıp verilmediğini belirle.",
          "Tam yaş çıkarımını ayır; görünen yapısal kanıtları gereksiz yere reddetme.",
        ],
        commonError:
          "Bir büyüme işareti görmekle kesin kronolojik yaşa ulaşmak.",
        check:
          "Diğer seçenekler gözlemi veya eksik veri gereğini koruyor; yalnız tam yaş ek bilgi istiyor.",
      },
      {
        prompt:
          "Aynı türün aynı yaşta ve aynı koşullardaki iki sürgününden birinin tepe tomurcuğu uzaklaştırılıyor, diğerine yalnız aynı işlem ortamında dokunuluyor. Mevsim, su ve ışık eşit. İlk grupta yanal tomurcuk gelişimi daha fazla görülürse hangi yorum en iyi desteklenir?",
        correct:
          "Tepe sürgününün varlığı, bu koşullarda yanal tomurcuk gelişimini baskılayan bir etkiye katılabilir.",
        reason:
          "Tepe uzaklaştırılan ve kontrol sürgünü arasındaki fark, verilen koşullarda tepenin baskılayıcı etkisiyle uyumludur; tek başına bütün moleküler mekanizmayı kanıtlamaz.",
        wrong: [
          [
            "Bütün mevsimsel dormansilerin tek nedeni kesin olarak aynı hormon bulunmuştur.",
            "Deney tek başına bütün dormansi nedenlerini veya tek bir molekülü belirlemez.",
          ],
          [
            "Yanal tomurcuklar uzaklaştırılan tepe tomurcuğundan doğrudan taşınmıştır.",
            "Gelişen yanal tomurcuklar zaten gövde üzerinde bulunabilir; bu taşınma verilmemiştir.",
          ],
          [
            "Kesilen sürgünün her hücresi kök hücresine dönüşmüştür.",
            "Yan dal gelişimi bütün hücrelerin kök kimliğine dönüşmesi değildir.",
          ],
          [
            "Kontrol grubunun tutulması sonuç yorumunu gereksiz kılar.",
            "Kontrol, farkın işlem ve ortamla ilişkisini değerlendirmek için gereklidir.",
          ],
        ],
        knowledge: [
          "Apikal baskınlık yanal tomurcuk gelişimiyle ilgili bir düzenlemedir; mevsimsel uyku ile eş anlamlı değildir.",
        ],
        strategy:
          "Değiştirilen tek etkeni ve gözlenen yanal gelişim farkını bağla.",
        steps: [
          "İki grupta su, ışık ve mevsimin aynı tutulduğunu kontrol et.",
          "Esas müdahalenin tepe tomurcuğunu uzaklaştırmak olduğunu belirle.",
          "Yanal gelişim artışını tepenin baskılayıcı etkisiyle ilişkilendir; tek hormon ve bütün türler sonucunu ekleme.",
        ],
        commonError:
          "Bir düzenek sonucundan bütün türlerin bütün dormansi nedenlerini kesinleştirmek.",
        check:
          "Doğru seçenek bu koşullarla sınırlıdır ve kontrolün verdiği karşılaştırmayı kullanır.",
      },
      {
        prompt:
          "Bir deneyde olgun kaynak yaprağa işaretli karbon içeren CO₂ veriliyor. Kısa süre sonra işaretli organik maddeler yaprağa komşu gövde floeminde, daha sonra büyüyen bir sürgün ucunda görülüyor. Yalnız bu izleme hangi açıklamayı destekler?",
        correct:
          "Yaprakta organik maddeye katılan karbon, gövdedeki floem üzerinden büyüyen havuza taşınabilir.",
        reason:
          "CO₂ karbonunun organik maddede izlenmesi ve floemden sürgüne ulaşması, kaynak–iletim–havuz bağlantısıyla uyumludur.",
        wrong: [
          [
            "İşaretli karbon yalnız ksilemde taşınmış olmak zorundadır.",
            "Verilen tespit floemdedir; ksilem zorunluluğu veriye aykırıdır.",
          ],
          [
            "Sürgün ucu işareti görünce artık hiçbir madde kullanmayan ölü bir dokudur.",
            "Büyüyen sürgün, organik madde kullanabilen canlı bir havuzdur.",
          ],
          [
            "CO₂ gazı hiçbir kimyasal değişim olmadan nişasta olarak gövdede dolaşır.",
            "Karbonun organik maddeye katılmasıyla gazın aynı molekül olarak dolaşması farklıdır.",
          ],
          [
            "Floemde işaret görülmesi bütün bitkide su iletiminin durduğunu kanıtlar.",
            "Organik karbonun izlenmesi tek başına su iletiminin durduğunu göstermez.",
          ],
        ],
        knowledge: [
          "İşaretli atomun bir organik bileşende izlenmesi, madde yolunu araştırmak için kullanılabilir.",
        ],
        strategy:
          "İşaretin önce hangi bileşiğe, sonra hangi dokuya ve havuza geçtiğini sırala.",
        steps: [
          "Başlangıç karbonunun yaprakta organik maddeye katıldığını belirle.",
          "Gövde floemindeki ara tespiti iletim yolu kanıtı olarak yerleştir.",
          "Büyüyen sürgünü havuz olarak bağla; aynı atomu aynı molekül sanma.",
        ],
        commonError:
          "Atom izini izlerken molekül türünün hiç değişmediğini varsaymak.",
        check:
          "Doğru açıklama yaprak, gövde floemi ve sürgün ucundaki üç tespiti aynı sırada kapsar.",
      },
    ],
  },
  {
    id: "ayt-yaprak-yapisi",
    topic: "detail-348",
    title: "Yaprak: dokular arasında ışık, gaz ve su yolu",
    minutes: 95,
    objectives: [
      "Yaprağın dış biçimini ve tipik enine kesitini doku işlevleriyle ilişkilendir.",
      "Gaz, su ve organik madde yollarını farklı gradiyent ve fiziksel hâllerle izle.",
      "Yaprak uyumlarını, stoma ölçümlerini ve kaynak–havuz ilişkisini verilen koşullarla değerlendir.",
    ],
    source:
      "Aurelia YKS arşivindeki MEBİ AYT Biyoloji yaprak özeti, OGM Bitkisel Organlar sunusu ve konu özeti, Dersler Cepte Bitkilerin Yapısı temel alınarak hazırlanmış özgün anlatım, şema ve öğretim soruları.",
    sections: [
      {
        title: "Yaprağı görevlerin buluştuğu bir organ olarak kur",
        paragraphs: [
          "Yaprak, sürgün eksenine bağlı, çoğu örnekte ışığı yakalayan geniş bir yüzeydir. Fotosentez, gaz alışverişi ve terleme aynı organda birlikte gerçekleşebilir. Bu olaylar ilişkili olsa da biri gazın yayılması, biri kimyasal dönüşüm, biri suyun buharlaşıp uzaklaşmasıdır.",
          "Bir yaprağı incelemek için önce gövdedeki düğümü, yaprağın bağlandığı yeri ve iletim demetini hatırla. Bu ünitede organın dış biçimini, içindeki doku düzenini ve dokular arasındaki madde yolunu birleştireceğiz. Tek bir yeşil çizim bütün görevlerin mekanizmasını göstermeye yetmez.",
        ],
      },
      {
        title: "Aya ve sapı aynı yapı sanma",
        paragraphs: [
          "Yaprak ayası genişlemiş, çoğu örnekte ince ve yassı bölümdür. Yaprak sapı ayayı gövdeye bağlar ve gövdeden gelen iletim demetlerinin yaprağa geçişini sağlar. Ayaya düşen ışık, sapın konumu ve yaprağın çevresindeki hava koşulları birlikte önem taşır.",
          "Her yaprak belirgin bir sap taşımak zorunda değildir. Arpa ve buğday gibi örneklerde yaprak gövdeyi bir kınla sarabilir. Bu yüzden sap görünmüyorsa yaprak değildir demek yerine bağlantının nasıl kurulduğunu incele. Dış yapı çeşitliliği, yaprak organının temel kimliğini ortadan kaldırmaz.",
        ],
      },
      {
        title: "Loblu bir aya hâlâ basit yaprak olabilir",
        paragraphs: [
          "Tek bir yaprak ayası kenarlarından girintili, dişli veya derin loplu olsa bile basit yaprak olabilir. Bileşik yaprakta ise bir yaprağın ayası birden çok ayrı yaprakçık hâlinde düzenlenmiştir. Görünen yeşil çıkıntıların sayısı tek başına yeterli sınıflama ölçütü değildir.",
          "Yaprağın gövdeyle birleştiği yerdeki koltuk tomurcuğu önemli bir işarettir. Tek bir bileşik yaprağın ayrı yaprakçıkları, her biri gövdeye bağlı ayrı yaprakmış gibi kendi koltuk tomurcuğunu taşımaz. Soru düğüm ve tomurcuk konumunu veriyorsa bu bilgiyi dış biçimle birlikte kullan.",
        ],
      },
      {
        title: "Damar ağı yaprağı gövdeye bağlar",
        paragraphs: [
          "Yaprak damarları ksilem, floem ve bunlara eşlik eden dokuları içeren iletim demetleridir. Gövdedeki iletim yollarının yaprağa uzanan devamı olarak su ve mineralleri getirir, uygun kaynak yaprakta üretilen organik maddelerin başka organlara taşınmasına katılırlar.",
          "Tipik tek çenekli yaprakta paralel, tipik çift çenekli yaprakta ağsı damarlanma görülür. Bu bir karşılaştırma eğilimidir; bütün türleri tek özellikten kesin sınıflandıran sınırsız bir kural olarak kullanılmaz. Demetlerin düzenini, çenek bilgisi ve diğer anatomik kanıtlarla birlikte değerlendir.",
        ],
      },
      {
        title: "Enine kesitte üç doku sistemini yerleştir",
        paragraphs: [
          "Tipik bir yaprak enine kesitinde yüzeyi örten epidermis, aradaki temel doku olan mezofil ve damarları oluşturan iletim dokusu ayırt edilir. Üst ve alt sözcükleri çizimin rastgele sayfa yönünü değil, ele alınan yaprağın tanımlanmış yüzlerini anlatır.",
          "Bu ünitenin şeması, üstte palizat ve altta sünger mezofili belirgin olan tipik bir yaprak modelidir. Bütün yaprakların aynı kalınlıkta veya aynı hücre dizilişinde olması gerekmez. Çizimdeki göreli tabaka kalınlıkları ölçülmüş bir tür oranı değil, doku bağlantısını gösteren öğretim düzenidir.",
        ],
      },
      {
        title: "Epidermis ve kütikula yüzeyi düzenler",
        paragraphs: [
          "Epidermis hücreleri yaprağın dış sınırını oluşturur. Ürettikleri mumsu kütikula, kontrolsüz su kaybını azaltan yüzey örtüsüdür. Kütikula bir hücre sırası değil, hücrelerin dışındaki bir tabakadır; üzerindeki stoma açıklıkları yüzeyin gaz geçişine izin veren yollarını oluşturur.",
          "Sıradan epidermis hücreleri genellikle kloroplastça zengin değildir. Buna karşılık bekçi hücrelerinde kloroplast bulunabilir; bütün epidermis hücreleri kesinlikle fotosentezsizdir genellemesi bu özelleşmeyi siler. Bir hücre türünün tipik özelliğini aynı dokudaki bütün farklılaşmış hücrelere koşulsuz yayma.",
        ],
      },
      {
        title: "Palizat mezofilinde ışıkla ilişkiyi gör",
        paragraphs: [
          "Palizat parankiması, bu tipik kesitte üst epidermisin altında daha uzun ve birbirine yakın hücrelerden oluşur. Kloroplastça zengin bu hücreler ışığın yakalanması ve fotosentezle organik madde üretimine etkin katılır. Uzun hücre biçimi, hücrenin her zaman daha büyük bir gaz boşluğu taşıdığı anlamına gelmez.",
          "Fotosentezin yeri yalnız palizat değildir; başka kloroplastlı hücreler de fotosentez yapabilir. Palizatın yoğun katkısını anlatmak, sünger mezofilini veya yeşil gövdeyi bütünüyle dışlamak demek değildir. Bir kesitte hangi hücrede kloroplast bulunduğu verilmişse bunu işlev açıklamasına kat.",
        ],
      },
      {
        title: "Sünger mezofilindeki boşluklar gaz yoludur",
        paragraphs: [
          "Sünger parankiması bu modelde palizatın altında, daha düzensiz biçimli hücreler ve aralarındaki geniş boşluklarla gösterilir. Bu boşluklarda hava ve su buharı bulunur; stoma ile hücre yüzeyleri arasında gazın yayılabileceği bir iç bağlantı oluşur.",
          "Boşluk görmek o bölgenin cansız bir doku olduğu anlamına gelmez. Boşlukların çevresindeki sünger parankiması hücreleri canlıdır ve kloroplast taşıyabilir. Canlı hücre ile hücreler arası alanı ayrı adlandır; CO₂ gazının geçeceği yol ile fotosentezin gerçekleştiği hücre aynı yapı düzeyi değildir.",
        ],
      },
      {
        title: "Stoma, iç hava alanını dışarıya açar",
        paragraphs: [
          "Bir stoma açıklığı iki bekçi hücrenin çevrelediği gözenektir. Gözenek açıklığının altında hava boşluğu bulunur; bu boşluk daha içteki mezofil aralıklarıyla bağlantılıdır. Açıklığın kendisi ayrı bir hücre değildir ve kloroplast taşımaz; kloroplast bekçi hücrelerin içindedir.",
          "Açılıp kapanma, bekçi hücrelerinin su durumu, iyon dengesi ve çeper düzeniyle ilişkilidir. Böylece dış hava ile iç boşluk arasındaki geçiş düzenlenir. Stomanın konumu ve açık kalma durumu su kaybıyla CO₂ kazanımı arasında bir dengeyi etkiler; yalnız terlemeyi artırmak için kurulmuş bir delik değildir.",
        ],
      },
      {
        title: "Ksilem ve floemi tipik damar içinde ayır",
        paragraphs: [
          "Gösterilen tipik yaprak kesitinde ksilem üst yüzeye, floem alt yüzeye yakın tarafta yer alır. Ksilem su ve çözünmüş minerallerin yaprağa ulaşmasına; floem organik maddelerin kaynak ve havuzlar arasında iletimine katılır. Aynı damar iki farklı iletim görevini birlikte taşıyabilir.",
          "Bu yerleşim için yaprağın hangi yüzünün üst olduğunun verilmesi gerekir. Şekli döndürmek ksilem ve floemin organ içindeki konumunu tersine çevirmez. Her yaprak damarında organ merkeze göre aynı gövde iç–dış şemasını kullanmak yerine, ele alınan organın anatomik referansını oku.",
        ],
      },
      {
        title: "CO₂ yolu bir gradiyent ve gündüz koşulu taşır",
        paragraphs: [
          "Net fotosentez yapan, dış havadan iç mezofile doğru CO₂ farkı bulunan olgun yaprak örneğinde CO₂ stomadan iç hava boşluğuna, oradan hücre yüzeylerine doğru yayılır. Hücreye ulaşan karbon, uygun tepkimelerle organik maddeye katılır. Gazın içeri girmesiyle kimyasal bağlanmasını ayrı basamaklar olarak düşün.",
          "Gaz alışverişinin yönü her zaman aynı olmak zorunda değildir. Solunum yaprağın canlı hücrelerinde de sürer; net fotosentezin bulunmadığı bir anda CO₂ ve O₂ için net gradiyentler değişebilir. Bu yüzden her koşulda yapraktan yalnız oksijen çıkar, yalnız CO₂ girer diye ezberleme.",
        ],
      },
      {
        title: "Su sıvı yoldan buhar yoluna geçer",
        paragraphs: [
          "Ksilemle gelen su mezofil hücrelerine ve çeperlerindeki ince su filmine ulaşabilir. Bu filmden buharlaşan su, hücreler arası hava boşluklarına geçer; dış hava daha kuruysa buhar stomadan dışarı yayılır. Sıvı iletimi, buharlaşma ve gazın yayılması üç ayrı fiziksel basamaktır.",
          "Stoma yolunun kapanması bu yoldan kaybı azaltır; kütikuladan gerçekleşen su kaybını otomatik olarak sıfırlamaz. Etkileşimde yalnız seçili rota izlenir. Bir yolun kesilmesini bütün organın bütün madde alışverişinin aynı anda tamamen bitmesi diye genişletme.",
        ],
      },
      {
        title: "Organik maddenin çıkışı yaprağın yaşına bağlıdır",
        paragraphs: [
          "İyi gelişmiş bir yaprak, ürettiği organik maddenin bir kısmını kendi gereksinimi için kullanırken bir kısmını floeme aktararak başka organlara sağlayabilir. Bu durumda kaynak işlevi görür. Taşınan temel şekeri her durumda yalnız glikoz diye sınırlamak yerine organik madde ve uygun örnekte sakkaroz kavramlarını kullan.",
          "Henüz gelişen genç yaprak ise başka kaynaklardan organik madde alıp büyümede kullanabilir; bu dönemde havuzdur. Yaprağın yeşil olması, net olarak bütün bitkiye madde veren kaynak olduğu sonucunu tek başına kurdurmaz. Kaynak–havuz rolünü net organik madde akışıyla belirle.",
        ],
      },
      {
        title: "Kuraklık uyumlarını tek bir zorunlu paket sanma",
        paragraphs: [
          "Kalın kütikula, küçük veya indirgenmiş aya, yoğun tüy örtüsü ve gömülü stoma gibi özellikler bazı kurak ortam örneklerinde su kaybını sınırlamaya katkı verir. Aynı özelliğin etkisi, diğer özellikler ve ortam koşulları sabit tutularak karşılaştırılır.",
          "Her kurak bitkinin aynı kök tipine veya aynı stoma sayısına sahip olduğu söylenemez. Nemli ortamdaki bir örneğin geniş ayası da başka türün bütün yapısına taşınamaz. Tabloda verilen iki örneği karşılaştırabilirsin; o tabloyu bütün canlıların değişmez tanısı hâline getiremezsin.",
        ],
      },
      {
        title: "Su üstünde ve su altında aynı gaz yüzeyi yoktur",
        paragraphs: [
          "Su üstünde yüzen bir yaprağın havayla doğrudan temas eden üst yüzü, gaz alışverişi açısından farklı bir ortam sunar. Verilen yüzer yaprak örneğinde stomalar üstte bulunabilir. Tamamen su altında gelişen yapraklarda ise stoma bulunmaması ve başka yüzey yollarının kullanılması mümkündür.",
          "Böyle bir uyum, bitkinin solunum yapmadığı veya su içinde hiçbir gaz bulunmadığı anlamına gelmez. Ortamda çözünmüş gazlar da vardır. Yaprağın hangi yüzünün hava ya da suyla temas ettiğini, soruda belirtilen gaz geçişi yolu ve yapısal veriyle birlikte değerlendir.",
        ],
      },
      {
        title: "Biçim değişirse organ kökenini koru",
        paragraphs: [
          "Yaprak bazı bitkilerde koruma, depolama veya tutunma gibi görevler için farklılaşabilir. Bir yapının ince ve yassı görünmemesi, onun hiçbir zaman yaprak kökenli olamayacağı anlamına gelmez. Benzer biçimde yeşil gövde fotosentez yapabilir; fotosentez yapmak tek başına yaprak kimliği vermez.",
          "Kökeni belirlemek için geliştiği yer ve gövdeyle bağlantısı gibi morfolojik kanıtlara bak. Bir yaprak diken biçimini alırken başka bir türde yüzeysel diken epidermis ve temel doku katkısıyla oluşabilir. Aynı sivri biçim veya aynı koruma işlevi bütün yapılara aynı organ adını vermeye yetmez.",
        ],
      },
      {
        title: "Dökülme hem kayıp hem yeniden dağıtım içerir",
        paragraphs: [
          "Yaprak dökülmesi bazı bitkilerde su ve mevsim koşullarıyla uyumlu bir yaşam döngüsünün parçasıdır. Dökülmeden önce bazı besin elementleri diğer organlara geri taşınabilir. Yaprakta kalan bazı maddeler ve atıklar ise dökülmeyle bitkiden uzaklaşabilir.",
          "Bu olayın bütün yapraklarda aynı mevsimde gerçekleşmesi gerekmez. Her sararma yalnız bir mineral eksikliğini ya da her dökülme yalnız boşaltımı kanıtlamaz. Hormonal düzenleme, yaş ve ortam gibi farklı etkenleri düşün; tek belirtiyle kesin neden kurmak yerine deney veya ek gözlem ara.",
        ],
      },
      {
        title: "Bir stoma ölçümünde alanı paydada tut",
        paragraphs: [
          "Mikroskopta bir görüntüde daha çok stoma sayılması, görüntü alanı da daha büyükse daha yüksek yoğunluk olduğu anlamına gelmez. Yoğunluk, stoma sayısının incelenen yüzey alanına bölünmesiyle bulunur. Alt ve üst yüzeyi karşılaştırırken örnekleme alanını ve birimini birlikte yaz.",
          "Stoma yoğunluğundan doğrudan gerçek terleme hızını hesaplamak için yeterli veri çıkmaz. Açıklık, nem, sıcaklık, rüzgâr, kütikula ve yaprağın su durumu da etkilidir. Ölçüm yalnız bir anatomik değişkeni veriyorsa sonucu önce o değişkenle sınırlı tut.",
        ],
      },
      {
        title: "Rotaları karşılaştırıp bir deney öner",
        paragraphs: [
          "Özgün kesitte CO₂, su ve organik madde rotalarını sırayla seç. Her basamakta madde hangi fiziksel hâlde, hangi dokudan geçiyor ve yolun açık olması için hangi koşul verilmiş diye düşün. Aynı renkte bir ok görmek farklı moleküllerin aynı boruyu kullandığını kanıtlamaz.",
          "Yaprağın bir yüzünü kapatma gibi deneylerde diğer yüzün durumu, kaplamanın ışığı etkileyip etkilemediği ve kontrol grubu önemlidir. Yalnız tek bir ölçüm değişkenini incelemek için deney koşullarını sabit tut. Açıklaman, ilk gözlenen etkiyi ve daha sonra gelişebilecek dolaylı etkileri ayrı saysın.",
        ],
      },
    ],
    examples: [
      {
        title: "Yeşil parçaları değil bağlantıyı say",
        prompt:
          "Tek bir yaprak sapı üzerinde yedi ayrı yaprakçık bulunuyor. Gövdeyle birleşen sapın koltuğunda bir tomurcuk var; yaprakçıkların kendi bağlantılarında tomurcuk yok. Kaç yapraklık yapı gösteriliyor?",
        strategy: "Yaprakçık ile gövdeye bağlı bütün yaprağı ayır.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "Yedi yeşil parça, sap üzerindeki yaprakçıklar olarak verilmiştir.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Koltuk tomurcuğu bütün yaprağın gövdeyle birleştiği tek yerde bulunuyor.",
          },
          {
            label: "Sonucu kontrol et",
            explanation:
              "Bu yapı yedi yaprakçık içeren tek bileşik yapraktır; yedi ayrı dal yaprağı diye sayılmaz.",
          },
        ],
        answer: "Bir bileşik yaprak; yedi yaprakçık.",
        check:
          "Gövdeye bağlanan birim ile yaprakçık sayısını ayrı söyleyebiliyor musun?",
        pitfall: "Her yeşil parçayı ayrı yaprak saymak.",
      },
      {
        title: "Hücre başına miktarla doku toplamını ayır",
        prompt:
          "Eş örnek alanında palizat dokuda 30 hücrenin her birinde 12, sünger dokuda 60 hücrenin her birinde 7 kloroplast sayılıyor. Sayımın tam olduğu kabul ediliyor. Hangi doku alanında toplam daha çok kloroplast vardır; buradan fotosentez hızı kesin sıralanır mı?",
        strategy:
          "Önce hücre sayısıyla hücre başına organel sayısını çarp; sonra ölçümün sınırını koru.",
        steps: [
          {
            label: "Toplamları hesapla",
            explanation:
              "Palizat için 30×12=360, sünger için 60×7=420 kloroplast bul.",
          },
          {
            label: "İki ölçeği ayır",
            explanation:
              "Hücre başına palizatın sayısı yüksek olsa da bu eş örnek alanda sünger toplamı daha yüksektir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "Kloroplast sayısı tek başına ışık, enzim durumu ve diğer koşulları vermediğinden fotosentez hızının kesin oranını hesaplayamazsın.",
          },
        ],
        answer:
          "Bu örnek alanında sünger toplamı 420, palizat toplamı 360; kesin fotosentez hızı oranı verilmez.",
        check:
          "Hücre başına sayıyla alan toplamını ayrı hesaplayıp işlev hızını ayrıca sorguladın mı?",
        pitfall:
          "Hücre başına daha fazla organeli bütün doku alanında zorunlu daha fazla toplam sanmak.",
      },
      {
        title: "Yoğunluğu eşit alanda karşılaştır",
        prompt:
          "Üst yüzeyde 0,50 mm² alanda 10 stoma, alt yüzeyde 0,25 mm² alanda 30 stoma sayılıyor. Stoma yoğunlukları ve alt/üst oranı nedir?",
        strategy: "Her sayımı kendi alanına böl.",
        steps: [
          {
            label: "Verileni ayır",
            explanation: "Üst yüzey:10/0,50=20 stoma/mm².",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "Alt yüzey:30/0,25=120 stoma/mm².",
          },
          {
            label: "Sonucu kontrol et",
            explanation:
              "Alt/üst yoğunluk oranı120/20=6; bu, tek başına terleme hızının da altı kat olduğu anlamına gelmez.",
          },
        ],
        answer: "Üst20, alt120 stoma/mm²; oran6.",
        check:
          "Örnekleme alanları farklıyken ham30/10=3 oranının neden yoğunluk oranı olmadığını açıkla.",
        pitfall:
          "Yüzey alanını paydada kullanmadan stoma sayılarını karşılaştırmak.",
      },
      {
        title: "Gazın girişiyle karbonun bağlanmasını ayır",
        prompt:
          "Net fotosentez yapan yaprakta dış CO₂ derişimi iç hava boşluğundan yüksek. Stoma açık. CO₂’nin dış havadan organik maddenin karbonuna kadar yolu nasıl ayrılır?",
        strategy: "Önce fiziksel taşınmayı, sonra kimyasal dönüşümü kur.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "CO₂, verilen gradiyentte stoma ve iç hava boşlukları üzerinden hücre yüzeyine yayılabilir.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Hücreye ulaşan karbon uygun fotosentez tepkimelerinde organik maddeye katılır.",
          },
          {
            label: "Sonucu kontrol et",
            explanation:
              "Gazın gözenekten geçmesi fiziksel bir yol; karbonun organik bağa katılması ayrı bir kimyasal basamaktır.",
          },
        ],
        answer:
          "Difüzyonla içeri ulaşma ve sonrasında organik maddeye katılma iki ayrı süreçtir.",
        check:
          "Stomanın kendisini kloroplastlı fotosentez yapan organel gibi anlatmadığını denetle.",
        pitfall:
          "CO₂ deliğe girdiği anda hiçbir hücresel tepkime olmadan şekere dönüşmüş saymak.",
      },
      {
        title: "Yüzeyi kapatırken deney koşulunu koru",
        prompt:
          "Stomaları yalnız alt yüzeyde bulunan bir yaprağın altına ışığı engellemeyen, gaz ve buhar geçirmeyen bir kaplama uygulanıyor. Üst yüzeye işlem yapılmıyor; kontrol yaprağı aynı ışıkta. İlk etkiyi nasıl yorumlarsın?",
        strategy:
          "Önce doğrudan kapanan yolu bul; bütün organ sonuçlarını tek anda ilan etme.",
        steps: [
          {
            label: "Verileni ayır",
            explanation:
              "Alt yüzeydeki stoma yolu kaplamayla dış havaya kapanır.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Bu yoldan CO₂ alışverişi ve su buharı çıkışı sınırlanabilir; ışığın kesildiği verilmemiştir.",
          },
          {
            label: "Sonucu kontrol et",
            explanation:
              "Üst kütikula ve diğer yollar aynı kaplama altında olmadığından bütün su kaybı kesin sıfır denemez.",
          },
        ],
        answer:
          "Gösterilen stomatal gaz ve buhar yolu sınırlanır; ışık kaybı veya bütün su kaybının sıfırı kendiliğinden çıkmaz.",
        check:
          "Deneyde yalnız alt yüzey değiştiğini ve ışığın sabit kaldığını kontrol et.",
        pitfall:
          "Kaplamanın saydamlığını yok sayarak ilk nedeni ışık azalması ilan etmek.",
      },
      {
        title: "Bir yaprağın günlük karbon bilançosu",
        prompt:
          "Verilen öğretim bilançosunda bir yaprak gündüz 36 birim organik karbon üretip 18’ini tüketiyor,10’unu başka organlara gönderiyor ve 8’ini depoluyor. Gece üretim yok;12 birim tüketimin 8’i kendi deposundan,4’ü dışarıdan alımla karşılanıyor. Bütün sayılar aynı karbon biriminde. Günlük net dışa aktarım kaç birimdir?",
        strategy:
          "Depodan kullanım ile organlar arası alımı ayırıp dışa aktarım eksi dış alımı hesapla.",
        steps: [
          {
            label: "Gündüzü dengele",
            explanation:
              "36=18+10+8 bilançosunu denetle; organlar arası dışa gönderim 10 birimdir.",
          },
          {
            label: "Geceyi dengele",
            explanation:
              "12=8+4; depodaki 8 iç kaynaktır, dış organlardan alınan miktar 4 birimdir.",
          },
          {
            label: "Döngüyü birleştir",
            explanation:
              "Günlük net dışa aktarım 10−4=6 birimdir. Yaprak gündüz net verici, gece bu verilen düzende net alıcı olabilir.",
          },
        ],
        answer: "Günlük net dışa aktarım 6 birim organik karbon.",
        check:
          "Depodan çekilen 8 birimi yeniden dışarıdan alım diye saymadığını kontrol et.",
        pitfall:
          "Yaprağın kendi deposunu kullanmasını başka organdan alınan karbonla aynı saymak.",
      },
    ],
    recall: [
      {
        prompt:
          "Loblu basit yaprakla bileşik yaprak arasında hangi bağlantı işaretini kullanırsın?",
        answer:
          "Gövdeyle birleşen bütün yaprağın koltuk tomurcuğu ve ayanın yaprakçıklara ayrılışı birlikte değerlendirilir; yalnız lop sayısı yeterli değildir.",
      },
      {
        prompt: "Mezofil hava boşluğu ile kloroplastlı hücre aynı yapı mıdır?",
        answer:
          "Hayır; boşluk gazın yayılabileceği hücreler arası alan, hücre ise fotosentez ve solunum gibi olayların gerçekleşebildiği canlı birimdir.",
      },
      {
        prompt:
          "Bir su molekülü yaprakta sıvı yoldan buhar yoluna nerede geçer?",
        answer:
          "Ksilemden mezofil çeperlerindeki ince su filmine ulaşan sıvı su, buharlaşarak iç hava boşluklarına geçer; dışarıya su buharı yayılır.",
      },
      {
        prompt: "Stoma yoğunluğu için ham sayının yanında hangi veri gerekir?",
        answer:
          "Sayımın yapıldığı yüzey alanı ve birimi; yoğunluk sayı/alan olarak hesaplanır.",
      },
      {
        prompt:
          "Stoma yolunun kapanması bütün terlemenin sıfır olduğunu gösterir mi?",
        answer:
          "Hayır; gösterilen stomatal yol sınırlanır, fakat kütikula gibi başka su kaybı yolları ayrıca değerlendirilir.",
      },
      {
        prompt:
          "Yaprak gaz alışverişinin yönü neden her zaman aynı söylenemez?",
        answer:
          "Net fotosentez/solunum durumu ve gazların derişim farkları değişebilir; yön verilen gradiyent ve koşullarla açıklanır.",
      },
    ],
    items: [
      {
        prompt:
          "Bir yaprağın ayası derin girintilerle beş loba ayrılıyor; yine de aya tek parça olarak bağlantısını koruyor. Gövdeyle birleşen yaprak sapının koltuğunda bir tomurcuk var. Yalnız bu verilere göre hangi yorum uygundur?",
        correct:
          "Girintili aya, tek parçalı bağlantısını koruyan basit yaprakla uyumludur.",
        reason:
          "Loplu bir aya zorunlu olarak yaprakçıklara ayrılmış bileşik yaprak değildir; verilen bağlantı tek yaprak ayasını gösterir.",
        wrong: [
          [
            "Beş lop görülmesi kesin olarak beş ayrı dal bulunduğunu kanıtlar.",
            "Loplar yaprak ayasının bölümleridir; dal için gövde ekseni ve bağlantı kanıtı gerekir.",
          ],
          [
            "Her lop gövdeye bağlı bağımsız bir yaprak olmak zorundadır.",
            "Gövdeye bağlanan tek sap ve tek parçalı aya verilmiştir.",
          ],
          [
            "Koltuk tomurcuğu bulunduğundan gözlenen organ kök şapkasıdır.",
            "Koltuk tomurcuğu yaprak–gövde bağlantısını destekler; kaliptra değildir.",
          ],
          [
            "Basit yaprakta hiç girinti bulunamayacağı için verilen örnek olanaksızdır.",
            "Basit yapraklar dişli veya loplu olabilir.",
          ],
        ],
        knowledge: [
          "Basit/bileşik yaprak ayrımında lop sayısından önce ayanın ve bağlantının düzeni kullanılır.",
        ],
        strategy:
          "Ayanın devamlılığını, görünen lop sayısından ayrı değerlendir.",
        steps: [
          "Beş lobun tek parçalı bir aya üzerinde bulunduğunu kaydet.",
          "Gövdeye tek sapla bağlanan yaprağın koltuk tomurcuğunu bütün birimin bağlantısıyla eşleştir.",
          "Lop sayısını yaprakçık sayısı yerine koymadan basit yaprak yorumunu seç.",
        ],
        commonError: "Her derin girintiyi ayrı yaprakçık sanmak.",
        check:
          "Doğru seçenek aya sürekliliği ve tek sap bilgisini birlikte koruyor.",
      },
      {
        prompt:
          "Bir gövde düğümüne tek sap bağlanıyor. Bu sap üzerinde üç ayrı yaprakçık var. Gövde–sap birleşiminde koltuk tomurcuğu bulunurken yaprakçıkların bağlantılarında böyle bir tomurcuk bulunmuyor. En uygun adlandırma hangisidir?",
        correct: "Üç yaprakçıklı tek bileşik yaprak.",
        reason:
          "Bütün yaprağın gövdeyle bağlantısı tek yerdedir; ayrı parçalar o yaprağın yaprakçıkları olarak verilmiştir.",
        wrong: [
          [
            "Üç ayrı kök emici tüyü.",
            "Yaprakçık ve sap bağlamı kök emici tüyü yapısı değildir.",
          ],
          [
            "Her biri ayrı bir gövde düğümünden çıkan üç yaprak.",
            "Üç ayrı gövde düğümü verilmemiş; tek düğümden tek sap çıkıyor.",
          ],
          [
            "Tek bir stoma ve onun üç bekçi hücresi.",
            "Yaprakçıklar stoma hücreleri değildir; tipik stoma iki bekçi hücreyle kuşatılır.",
          ],
          [
            "Üç odun halkasından oluşan tek gövde.",
            "Verilen yapılar yaprak sapı ve yaprakçıklardır; sekonder ksilem halkası değildir.",
          ],
        ],
        knowledge: [
          "Bileşik yaprak, bir yaprak birimi üzerinde ayrı yaprakçıklar taşıyabilir.",
        ],
        strategy:
          "Bağlanan bütün birimi ve onun alt parçalarını iki düzeyde say.",
        steps: [
          "Gövdeye bağlanan tek sapı bir yaprak bağlantısı olarak işaretle.",
          "Sap üzerindeki üç parçayı yaprakçık olarak verilen özellikleriyle tut.",
          "Gövdeyle birleşen bütün birimi tek bileşik yaprak, alt parçaları üç yaprakçık diye adlandır.",
        ],
        commonError: "Alt parçaları organın bütünüyle aynı düzeyde saymak.",
        check:
          "Koltuk tomurcuğunun bulunduğu tek bağlantı doğru adlandırmada kaybolmuyor.",
      },
      {
        prompt:
          "Buğday benzeri verilen bir örnekte yaprak gövdeyi kın biçiminde sarıyor ve belirgin bir yaprak sapı bulunmuyor. Aya ile gövdedeki iletim dokusu arasındaki bağlantı sürüyor. Hangi sonuç doğrudur?",
        correct:
          "Belirgin sap bulunmaması, yaprağın organ kimliğini veya iletim bağlantısını zorunlu olarak ortadan kaldırmaz.",
        reason:
          "Yaprakların bağlanma biçimleri farklı olabilir; bütün yaprakların belirgin bir sap taşıması şart değildir.",
        wrong: [
          [
            "Yaprak sapı yoksa bu yapı hiçbir koşulda yaprak olamaz.",
            "Kınla bağlanan yaprak örneği bu zorunluluğu çürütür.",
          ],
          [
            "Sap bulunmadığı için aya artık bütün bitkinin köküdür.",
            "Bağlanma biçimi organı köke dönüştürmez.",
          ],
          [
            "İletim bağlantısı yalnız odunsu gövdelerde bulunabileceğinden gözlem yanlıştır.",
            "Otsu gövdeli örneklerin yapraklarında da iletim dokusu bulunur.",
          ],
          [
            "Kın biçimi, bütün yaprak hücrelerinin kloroplastsız olduğunu kanıtlar.",
            "Dış bağlantı biçimi bütün hücrelerin organel durumunu belirlemez.",
          ],
        ],
        knowledge: [
          "Yaprak ayasının gövdeye bağlanmasında türler arasında yapı çeşitliliği vardır.",
        ],
        strategy:
          "Bağlantı biçimiyle temel organ görevini birbirinin yerine koyma.",
        steps: [
          "Belirgin sap yokluğunu dış biçim verisi olarak kaydet.",
          "Aya ile gövdenin iletim dokuları arasındaki bağlantının korunduğunu kullan.",
          "Sapı bütün yapraklar için zorunlu saymayan açıklamayı seç.",
        ],
        commonError:
          "Tek bir tipik yaprak çizimini bütün türlerin değişmez planı kabul etmek.",
        check:
          "Doğru açıklama hem sap yokluğunu hem devam eden iletimi kapsar.",
      },
      {
        prompt:
          "A yaprağında damarlar büyük ölçüde paralel, B yaprağında ise dallanan ağ biçiminde görülüyor. İki örneğin çenek sayısı ayrıca verilmemiştir. Bu gözlem en uygun nasıl kullanılır?",
        correct:
          "Tipik tek ve çift çenekli örnekleri karşılaştırmada bir kanıt olarak kullanılır; tek başına sınırsız kesin tür kuralı yapılmaz.",
        reason:
          "Paralel/ağsı damarlanma tipik bir karşılaştırma sağlar; tür çeşitliliği ve başka anatomik veriler dikkate alınmalıdır.",
        wrong: [
          [
            "A’nın kesin tek yıllık, B’nin kesin çok yıllık olduğu söylenir.",
            "Damar düzeni yaşam süresini kesinleştirmez.",
          ],
          [
            "B’de ağsı damar varsa iletim dokusu bulunmadığı kabul edilir.",
            "Damar ağı iletim demetlerinin dallanmasıdır.",
          ],
          [
            "A’da paralel damar görülmesi bütün hücrelerin aynı dokudan oluştuğunu gösterir.",
            "Damar biçimi epidermis ve mezofil gibi diğer dokuları ortadan kaldırmaz.",
          ],
          [
            "Yaprak damarı yalnız dekoratif renk çizgisidir; işlevle ilişkili değildir.",
            "Damarlar ksilem ve floem içeren iletim yapılarıdır.",
          ],
        ],
        knowledge: [
          "Damarlanma, yaprağın iletim demetlerinin yerleşimini gösterir ve tipik gruplar arasında karşılaştırılabilir.",
        ],
        strategy:
          "Gözlenen düzeni tanımla; verilmemiş yaşam süresi veya kesin tür kimliği ekleme.",
        steps: [
          "A’nın paralel, B’nin ağsı düzenini iki ayrı gözlem olarak kaydet.",
          "Bu düzenlerin tipik çenek gruplarıyla ilişkisinin karşılaştırma kanıtı olduğunu belirle.",
          "Tek özellikten bütün türler için zorunlu kimlik üretmeyen seçeneği seç.",
        ],
        commonError:
          "Bir eğilimi bütün canlıları kesin tanıtan tek işaret sanmak.",
        check:
          "Doğru seçenek damarın iletim görevini ve kanıtın sınırını birlikte korur.",
      },
      {
        prompt:
          "Bir yaprak kesitinde E, canlı epidermis hücreleri; K ise bu hücrelerin dış yüzeyinde yer alan mumsu ve hücresiz tabaka olarak gösteriliyor. E ve K için hangi ilişki doğrudur?",
        correct:
          "Epidermis hücreleri kütikula oluşumuna katkı verir; K ayrı bir hücre sırası değildir.",
        reason:
          "Kütikula epidermisin dışındaki mumsu örtüdür; bir doku hücresi veya organel gibi adlandırılmaz.",
        wrong: [
          [
            "K, epidermisin içinde DNA taşıyan ayrı bir çekirdektir.",
            "K dış yüzeyde hücresiz tabaka olarak verilmiştir; çekirdek değildir.",
          ],
          [
            "K tek başına ksilem borusunun canlı sitoplazmasıdır.",
            "Kütikula, yaprak dış örtüsüyle ilişkilidir; ksilem sitoplazması değildir.",
          ],
          [
            "E ve K aynı hücre tabakasının iki eş anlamlı adıdır.",
            "Canlı epidermis hücreleri ile hücresiz örtü aynı yapı değildir.",
          ],
          [
            "K bulunduğunda yaprağın hiçbir noktasında gaz yolu bulunamaz.",
            "Stoma açıklıkları ve başka yapı özellikleri gaz geçişine olanak verebilir.",
          ],
        ],
        knowledge: [
          "Epidermis bir hücre tabakası, kütikula ise dış yüzeydeki hücresiz örtüdür.",
        ],
        strategy:
          "Hücre ile o hücrelerin oluşturduğu dış tabakayı ayrı adlandır.",
        steps: [
          "E’nin canlı hücrelerden oluştuğunu ve K’nin dışta bulunduğunu kullan.",
          "Mumsu hücresiz K’yi kütikula olarak eşleştir.",
          "Kütikulayı ayrı hücre veya çekirdek saymayan ilişkiyi seç.",
        ],
        commonError:
          "Bir örtü tabakasını onu oluşturan hücrelerle aynı yapı sanmak.",
        check: "Seçenek verilen hücresiz olma koşuluna uyuyor.",
      },
      {
        prompt:
          "Bir yaprak epidermisinde sıradan epidermis hücreleriyle iki bekçi hücre birlikte inceleniyor. Bekçi hücrelerde kloroplast görülürken sıradan hücrelerde görülmüyor. Bu bulgu hangi sonucu destekler?",
        correct:
          "Aynı doku içinde farklılaşmış hücrelerin organel ve görev özellikleri farklı olabilir.",
        reason:
          "Bekçi hücreler epidermisin özelleşmiş hücreleridir; onların kloroplast taşıması sıradan epidermis hücrelerinin durumuyla birlikte değerlendirilebilir.",
        wrong: [
          [
            "Kloroplast bulunduğu için bekçi hücreler epidermisle hiçbir biçimde ilişkili olamaz.",
            "Özelleşmiş hücreler, ait oldukları dokunun sıradan hücrelerinden farklı özellikler taşıyabilir.",
          ],
          [
            "Gözenek boşluğunun kendisi kloroplast taşıyan bir hücredir.",
            "Kloroplast bekçi hücreler içindedir; boşluğun kendisi hücre değildir.",
          ],
          [
            "Sıradan hücrelerde kloroplast yoksa bekçi hücredeki görüntü zorunlu olarak yanlıştır.",
            "Verilen iki hücre türü arasındaki farklılık gözlemle uyumludur.",
          ],
          [
            "Bütün epidermis hücreleri her türde aynı organellere ve aynı sayıya sahip olmalıdır.",
            "Verilen bulgu böyle bir sınırsız eşitliği desteklemez.",
          ],
        ],
        knowledge: [
          "Bekçi hücreler epidermisin farklılaşmış hücreleridir; doku içindeki bütün hücreler tek tip olmak zorunda değildir.",
        ],
        strategy: "Doku kimliği ile hücresel özelleşmeyi birlikte tut.",
        steps: [
          "İki bekçi hücreyle sıradan epidermis hücrelerini ayrı gruplara yaz.",
          "Kloroplast gözlemini yalnız görüldüğü hücre grubuna bağla.",
          "Hücresel farklılaşmayı kabul eden, gözenek boşluğunu hücre saymayan açıklamayı seç.",
        ],
        commonError:
          "Bir hücre tipinin tipik özelliğini aynı dokudaki bütün özelleşmiş hücrelere zorunlu yaymak.",
        check: "Doğru seçenek iki gözlemi de değiştirmeden açıklıyor.",
      },
      {
        prompt:
          "Tipik bir yaprak kesitinde P bölgesi üst epidermisin altında, uzun ve sık dizilmiş kloroplastça zengin hücrelerden oluşuyor. Altındaki S bölgesinde kloroplastlı hücreler arasında daha geniş hava boşlukları var. Hangi yorum uygundur?",
        correct:
          "P fotosenteze güçlü katkı verir; S’deki canlı hücreler de fotosenteze katılabilir ve boşluklar gaz yolunu kolaylaştırır.",
        reason:
          "Palizat ve sünger mezofilinin katkıları birbirini dışlamaz; S’deki kloroplast verisi fotosentez olasılığını korur.",
        wrong: [
          [
            "P ışığa yakın olduğu için bütün hücreleri ölüdür.",
            "Kloroplastça zengin mezofil hücreleri canlıdır.",
          ],
          [
            "S’de geniş boşluk bulunduğundan bütün S hücreleri cansızdır.",
            "Hücreler arası boşluk ile boşluğu çevreleyen canlı hücre farklıdır.",
          ],
          [
            "Fotosentez yalnız boşlukların içindeki kuru havada gerçekleşir.",
            "Fotosentezin hücresel tepkimeleri uygun hücre yapılarında gerçekleşir; boşluk hava yoludur.",
          ],
          [
            "P ve S aynı konumda tek hücre sırasının iki adıdır.",
            "Soruda farklı diziliş ve konumlar açıkça verilmiştir.",
          ],
        ],
        knowledge: [
          "Palizat ve sünger parankiması, tipik yaprağın mezofilini oluşturan canlı temel doku bölümleridir.",
        ],
        strategy: "Kloroplastlı hücreyle hücreler arası gaz alanını ayır.",
        steps: [
          "P’nin yoğun kloroplastlarını ve konumunu fotosentez katkısıyla bağla.",
          "S’nin kloroplastlı hücrelerini canlı temel doku, aralarındaki alanı gaz yolu olarak tut.",
          "İki bölgenin görevlerini birbirini gereksiz yere dışlamadan birleştir.",
        ],
        commonError:
          "Sünger mezofilini boşlukları yüzünden bütünüyle işlevsiz saymak.",
        check:
          "Doğru açıklama S’deki kloroplastı da geniş hava alanlarını da hesaba katıyor.",
      },
      {
        prompt:
          "Bir yaprakta dış hava ile stoma açıklığı, açıklığın altındaki hava odası ve mezofil hücrelerinin arasındaki boşluklar bağlantılıdır. Bu bağlantının gaz alışverişine katkısı nedir?",
        correct:
          "Dış hava ile mezofil hücre yüzeyleri arasında gazın yayılabileceği bir iç yol sağlar.",
        reason:
          "Stoma ve hücreler arası alanlar, uygun derişim farkında gazın dış ortamdan hücre yüzeylerine veya ters yönde yayılmasına bağlantı sunar.",
        wrong: [
          [
            "CO₂’yi hiçbir hücresel tepkime olmadan doğrudan nişastaya çevirir.",
            "Fiziksel geçiş yolu ile kimyasal karbon bağlanması ayrı süreçlerdir.",
          ],
          [
            "Bütün boşlukları ksilem içindeki sıvı su borusuna dönüştürür.",
            "Hava boşluğu ile sıvı ileten ksilem farklı yapılardır.",
          ],
          [
            "Bu bağlantı yaprakta solunumu olanaksız kılar.",
            "Gaz alışverişi canlı hücrelerin solunumuyla çelişmez.",
          ],
          [
            "Gazlar için her koşulda aynı tek yönlü pompa görevi görür.",
            "Net gaz yönü verilen derişim farkları ve metabolik duruma bağlıdır.",
          ],
        ],
        knowledge: [
          "Yaprak içindeki hava alanları, dış ortam ile hücre yüzeyleri arasında gaz difüzyon yolunun parçalarıdır.",
        ],
        strategy:
          "Bağlantının fiziksel işlevini, hücre içindeki kimyasal tepkimeden ayır.",
        steps: [
          "Dış hava–stoma–hava odası–mezofil arası bağlantısını sırala.",
          "Bu yolun gazı hücre yüzeylerine ulaştırabildiğini belirle.",
          "Yolun tek başına şeker sentezi veya her koşulda tek yönlü pompa olduğunu söylemeyen açıklamayı seç.",
        ],
        commonError:
          "Bir maddeye geçit veren yapıyı o maddeyi kimyasal olarak dönüştüren yapı sanmak.",
        check:
          "Doğru seçenek yönü derişim farkına bağlı bir yayılma yolu olarak bırakır.",
      },
      {
        prompt:
          "Üst ve alt yüzeyi açıkça tanımlanmış tipik bir yaprağın damar kesitinde K dokusu üst epidermise, F dokusu alt epidermise daha yakın verilmiştir. Modelde K su ve mineral iletimine, F organik madde iletimine katılıyor. K ve F sırası hangisidir?",
        correct: "Ksilem ve floem.",
        reason:
          "Görev ve verilen tipik yaprak konumu birlikte K’yi ksilem, F’yi floem olarak destekler.",
        wrong: [
          [
            "Floem ve ksilem.",
            "Su–mineral ve organik madde görevleri ters eşleştirilmiştir.",
          ],
          [
            "Kütikula ve kaliptra.",
            "Bunlar verilen iki damar iletim dokusunun adları değildir.",
          ],
          [
            "Palizat ve sünger mezofili.",
            "Mezofil temel dokudur; soruda damar içindeki iletim dokuları verilmiştir.",
          ],
          [
            "İki ayrı stoma açıklığı.",
            "Gözenekler damar içindeki ksilem ve floem yolları değildir.",
          ],
        ],
        knowledge: [
          "Tipik yaprak damarında su–mineral yolu ksilem, organik madde yolu floemdir.",
        ],
        strategy:
          "Konumdan önce verilen iki iletim görevini doğru doku adlarıyla bağla.",
        steps: [
          "K’nin su ve mineralle, F’nin organik maddeyle ilişkilendirildiğini ayır.",
          "Bu görevleri ksilem ve floem adlarına eşleştir.",
          "Üst–alt yönlerin de verilen tipik modelle tutarlı olduğunu kontrol et; çizim yönüne yeni kural ekleme.",
        ],
        commonError:
          "Gövdenin merkez–dış referansını yaprak yüzey yönüyle koşulsuz aynı saymak.",
        check:
          "Doğru sıra hem görevi hem soruda tanımlanan yaprak yüzlerini koruyor.",
      },
      {
        prompt:
          "Karanlıkta bulunan canlı bir yaprakta net solunum vardır. Stomalar açıktır; yaprak içindeki CO₂ derişimi dış havadan yüksek, O₂ derişimi ise dış havadan düşüktür. Bu koşullarda stomadan beklenen net gaz yönleri hangisidir?",
        correct: "O₂ içeri, CO₂ dışarı.",
        reason:
          "Difüzyon her gazın kendi derişim farkına göre değerlendirilir; verilen iki fark zıt yöndedir.",
        wrong: [
          [
            "O₂ dışarı, CO₂ içeri.",
            "Bu yönler verilen iki derişim farkına da terstir.",
          ],
          [
            "Her iki gaz da yalnız içeri.",
            "İçeride fazla olan CO₂ için verilen net yön dışarıdır.",
          ],
          [
            "Her iki gaz da yalnız dışarı.",
            "Dışarıda daha fazla olan O₂ için net yön içeri olur.",
          ],
          [
            "Karanlıkta hiçbir gaz hareket edemez.",
            "Canlı yaprağın solunumu ve gaz difüzyonu karanlıkta da sürer.",
          ],
        ],
        knowledge: [
          "Net gaz difüzyonu, gazın iki taraftaki derişim farkıyla ilişkilidir.",
        ],
        strategy: "O₂ ve CO₂ için iki ayrı karşılaştırma yap.",
        steps: [
          "O₂ için dış derişimin daha yüksek olduğunu okuyup dışarıdan içeriye oku kur.",
          "CO₂ için iç derişimin yüksek olduğunu okuyup içeriden dışarıya oku kur.",
          "İki oku birleştir; gündüz fotosentez örneğinin yönünü karanlığa ezberden taşıma.",
        ],
        commonError: "Gaz yönünü yalnız saat adına göre ezberlemek.",
        check: "Seçilen her ok kendi gazı için yüksekten düşüğe yöneliyor.",
      },
      {
        prompt:
          "Bir su molekülü yaprak damarındaki ksilemden mezofil hücre çeperinin ıslak yüzeyine, oradan hücreler arası hava boşluğuna ve açık stomadan dış havaya geçiyor. Sıvıdan gaza geçiş bu verilen yolda hangi aşamayla ilişkilidir?",
        correct: "Islak çeper yüzeyinden hava boşluğuna geçerken buharlaşma.",
        reason:
          "Ksilem ve çeper filmi sıvı evresidir; hava boşluğuna geçen su, verilen terleme yolunda buhar hâlindedir.",
        wrong: [
          [
            "Ksilem içinde suyun her mineral iyonuna dönüşmesi.",
            "Su molekülü mineral iyonuna dönüşmez; burada kimyasal kimlik değil fiziksel hâl değişir.",
          ],
          [
            "Stoma bekçi hücrelerinin birer sıvı boruya dönüşmesi.",
            "Bekçi hücreler açıklığı düzenler; hava yoluna dönüşen borular değildir.",
          ],
          [
            "Floem şekerinin çekirdekte kopyalanması.",
            "Verilen yol floem veya DNA kopyalanmasıyla ilgili değildir.",
          ],
          [
            "Dış havadaki buharın soğuk yüzeyde damlaya dönüşmesi.",
            "Bu yoğuşmadır; verilen yön sıvı filmden buharadır.",
          ],
        ],
        knowledge: [
          "Terlemede sıvı suyun buharlaşması ile oluşan buharın dışarı difüzyonu birbirine bağlı ama ayrı basamaklardır.",
        ],
        strategy: "Fiziksel hâli yolun her durağında izle.",
        steps: [
          "Ksilem ve ıslak çeper durağına sıvı etiketi koy.",
          "Hava boşluğundaki molekülün su buharı olduğunu belirle.",
          "İki hâl arasındaki geçişi çeper yüzeyinde buharlaşma olarak seç.",
        ],
        commonError: "Terlemeyi sıvı damlanın stomadan pompalanması sanmak.",
        check: "Hâl değişiminden sonraki yol gaz boşluğu ve stomayla tutarlı.",
      },
      {
        prompt:
          "İzlenen iki yapraktan R, büyümekte ve net olarak organik madde almaktadır. S, olgunlaşmış ve net olarak organik madde göndermektedir. O anki kaynak–havuz ilişkisi hangisidir?",
        correct: "S kaynak, R havuzdur.",
        reason:
          "Kaynak ve havuz, net organik madde verme veya alma rolünü anlatır; yaprak adının tek başına sabit rolü değildir.",
        wrong: [
          [
            "R kaynak, S havuzdur.",
            "Verilen net alışveriş yönleri ters çevrilmiştir.",
          ],
          [
            "İkisi de yaprak olduğu için ikisi de daima kaynaktır.",
            "Büyüyen R için net alım açıkça verilmiştir.",
          ],
          [
            "İkisi de kök olmadığı için havuz olamaz.",
            "Genç yaprak gibi büyüyen organlar da havuz olabilir.",
          ],
          [
            "Kaynak–havuz yalnız ksilem içindeki mineral adlarıdır.",
            "Bu bağlamda roller organik madde ekonomisine aittir.",
          ],
        ],
        knowledge: [
          "Bir organın kaynak veya havuz oluşu, incelenen dönemdeki net organik madde akışına bağlıdır.",
        ],
        strategy: "Organın isminden önce verilen net alışverişi kullan.",
        steps: [
          "R’nin net alımını büyümesi için dışarıdan karbon gereksinimiyle bağla.",
          "S’nin net gönderimini başka bölgelere organik madde sağlama rolüyle bağla.",
          "Vericiye kaynak, alıcıya havuz adını ver.",
        ],
        commonError:
          "Yeşil olan her organı her dönemde net kaynak kabul etmek.",
        check: "Doğru etiketler R’ye gelen ve S’den çıkan akışları koruyor.",
      },
      {
        prompt:
          "Bir deneyde iki eş yaprağın yalnız kütikula geçirgenliği farklıdır. Sıcaklık, yüzey alanı ve diğer koşullar sabittir. Yalnız kütikula üzerinden geçen su buharı ölçülüyor. Daha az geçirgen kütikulalı yaprak için hangi çıkarım doğrudur?",
        correct:
          "Ölçülen kütikular su kaybının daha az olması beklenir; bundan bütün yaprağın toplam su kaybı için koşulsuz oran çıkarılmaz.",
        reason:
          "Deney yalnız belirli bir yolu ölçmektedir; stoma yolu ve bütün yaprağın toplam kaybı ayrıca değerlendirilir.",
        wrong: [
          [
            "Kütikula daha az geçirgense bütün stoma sayısı zorunlu olarak sıfırdır.",
            "Geçirgenlik ile stoma sayısı aynı özellik değildir.",
          ],
          [
            "Kütikula mutlaka canlı bir bekçi hücresine dönüşür.",
            "Kütikula hücresiz dış örtüdür.",
          ],
          [
            "Kütikula yolundaki azalma her koşulda fotosentezin durduğunu kanıtlar.",
            "Tek su kaybı yolu gözlemi bütün metabolizmanın durmasını kanıtlamaz.",
          ],
          [
            "Su kütikuladan geçtiğinde kimyasal olarak glikoza dönüşür.",
            "Su kaybı, karbon bağlanması tepkimesi değildir.",
          ],
        ],
        knowledge: [
          "Kütikula su kaybını sınırlar; ölçülen yol ile toplam kayıp birbirinden ayrılmalıdır.",
        ],
        strategy: "Deneyde ölçülen değişkenin kapsamını koru.",
        steps: [
          "Değiştirilen özelliğin yalnız kütikula geçirgenliği olduğunu saptayarak diğer koşulları sabit tut.",
          "Ölçümün yalnız kütikular yola ait olduğunu belirle.",
          "Düşük geçirgenliği o yoldaki düşük geçişle bağla; verilmemiş stoma oranı ekleme.",
        ],
        commonError:
          "Bir yoldaki değişimi bütün bitkinin ölçülmemiş değişkenlerine yaymak.",
        check: "Doğru çıkarım ölçülen yolun sınırını açıkça söylüyor.",
      },
      {
        prompt:
          "Su yüzeyinde yüzen bir yaprağın alt yüzü suyla, üst yüzü havayla temas ediyor. Bu örnekte stomalar yalnız üst epidermiste bulunuyor. Bu yerleşimin gaz alışverişiyle ilişkisi en uygun nasıl açıklanır?",
        correct:
          "Üstteki stomalar havaya açık bir bağlantı sunar; bu örnek bütün su bitkilerinin aynı yapıda olduğunu göstermez.",
        reason:
          "Verilen yüzen yaprakta havayla temas eden yüzeyde stoma bulunması gaz yoluyla uyumludur.",
        wrong: [
          [
            "Stomalar havaya baktığı için yaprakta hiç solunum olamaz.",
            "Gaz yolu canlı dokuların solunumuyla uyumludur.",
          ],
          [
            "Suda bulunan her yaprağın iki yüzünde de aynı sayıda stoma zorunludur.",
            "Verilen tek örnek böyle bir genelleme yapmaz; yüzen ve su altı yapraklar farklı olabilir.",
          ],
          [
            "Üst epidermisteki boşluklar kök nodülü bakterileridir.",
            "Stoma açıklığı ile nodül ortaklığı farklı yapılardır.",
          ],
          [
            "Alt yüz suya değdiğinde üst yüzün ışık alması fiziksel olarak olanaksızdır.",
            "Verilen yüzen yaprak düzeni bunun tersine uygundur.",
          ],
        ],
        knowledge: [
          "Bir yaprağın çevreyle bağlantısı, yüzen veya suya batık olmasına göre farklılaşabilir.",
        ],
        strategy: "Verilen yaprağın iki yüzünü iki farklı ortamla eşleştir.",
        steps: [
          "Alt yüzü su, üst yüzü hava olarak etiketle.",
          "Üstteki stomanın hangi ortama doğrudan açıldığını belirle.",
          "Bu yerleşimi açıklayan fakat bütün su bitkileri için zorunluluk üretmeyen yorumu seç.",
        ],
        commonError:
          "Yüzen yaprak örneğini bütün sulak ortam bitkilerinin tek planı saymak.",
        check: "Doğru yorum üst yüz–hava bağlantısını koruyor.",
      },
      {
        prompt:
          "Bir yaprağın üst yüzünde 0,50 mm² alanda 20, alt yüzünde 0,20 mm² alanda 18 stoma sayılıyor. Örnek alanlar temsil edicidir. Alt yüz stoma yoğunluğunun üst yüze oranı kaçtır?",
        correct: "2,25.",
        reason:
          "Üst yoğunluk 20/0,50=40; alt yoğunluk 18/0,20=90 stoma/mm². Oran 90/40=2,25 olur.",
        wrong: [
          [
            "0,90.",
            "Bu, ham sayıları 18/20 oranlar; farklı örnek alanlarını hesaba katmaz.",
          ],
          [
            "0,40.",
            "0,40, sayım alanlarının 0,20/0,50 oranıdır; stoma sayıları ve alanlar birlikte kullanılmadan yoğunluk oranı bulunmaz.",
          ],
          [
            "4,00.",
            "Yoğunluklar 90 ve 40 stoma/mm² olduğundan oran 90/40=2,25’tir;4,00 sonucu için payı 160 saymak gerekir ve böyle bir yoğunluk verilmemiştir.",
          ],
          [
            "9,00.",
            "90/40 sonucu 9 değildir; birim alanlar doğru kullanılmalıdır.",
          ],
        ],
        knowledge: ["Yoğunluk, sayının sayım alanına bölünmesiyle bulunur."],
        strategy: "Önce iki sayımı aynı alan birimine getir, sonra oranla.",
        steps: [
          "Üst yüz için 20 stoma sayısını 0,50 mm²’ye bölüp 40 stoma/mm² bul.",
          "Alt yüz için 18’i 0,20’ye bölüp 90 stoma/mm² bul.",
          "İstenen alt/üst oranını 90/40 olarak hesapla; bunu ölçülmemiş terleme oranı sayma.",
        ],
        commonError: "Farklı alanlardaki ham sayıları doğrudan oranlamak.",
        check: "Her iki yoğunluğun birimi aynı; oran birimsizdir.",
      },
      {
        prompt:
          "Alt yüzünde stoma bulunan bir yaprağın üst yüzünde stoma yoktur. İki grupta eş yaprakların ya üstüne ya altına aynı saydam ve gaz geçirmeyen ince örtü yerleştiriliyor; ışık ve sıcaklık eş tutuluyor. Alt yüzü örtülen grupta gaz geçişinin daha çok azalması öncelikle neyi destekler?",
        correct:
          "Bu yaprakta alt yüz stomalarının dış ortamla gaz bağlantısına katkısını.",
        reason:
          "Yerleşim ve kontrollü kapatma, gaz yolunun hangi yüzeyden geçtiğine ilişkin kanıt verir.",
        wrong: [
          [
            "Alt örtünün bütün ışığı kesmesi gerektiğini.",
            "Örtü saydam ve ışık koşulları eş verilmiştir.",
          ],
          [
            "Üst yüzün canlı hücre içermediğini.",
            "Stoma bulunmaması epidermisin cansız olduğunu göstermez.",
          ],
          [
            "Stomaların yalnız topraktan mineral emdiğini.",
            "Verilen müdahale gaz alışverişini ölçer; kök emilimini değil.",
          ],
          [
            "Alt yüz kapatılınca bütün yaprağın her türlü madde alışverişinin kesin sıfırlandığını.",
            "Ölçülen azalma, bütün yolların ve madde türlerinin yokluğunu göstermez.",
          ],
        ],
        knowledge: [
          "Bir yapının işlevini sınamak için etkisini doğrudan değiştiren müdahale ve uygun karşılaştırma gerekir.",
        ],
        strategy:
          "Saydamlık kontrolünü ve hangi yüzeyin kapandığını birlikte kullan.",
        steps: [
          "Stomaların yalnız alt yüzde bulunduğunu başlangıç koşulu olarak kaydet.",
          "İki örtünün ışık geçirgenliği eş olduğundan ışığı açıklama olarak ayır.",
          "Alt yüz kapandığında azalan gaz geçişini o yüzün stoma bağlantısıyla ilişkilendir.",
        ],
        commonError:
          "Gaz geçişini kapatan saydam örtüyü ışığı yok eden karanlıkla karıştırmak.",
        check:
          "Çıkarım müdahale edilen gaz yolunu açıklar; daha geniş iddia kurmaz.",
      },
      {
        prompt:
          "Bir yaprakta işaretli CO₂ önce stomadan hava boşluğuna ulaşıyor, sonra mezofil hücresinin kloroplastında organik bileşiğin karbonuna katılıyor. Bu iki gözlem arasındaki temel ayrım nedir?",
        correct:
          "İlki fiziksel ulaşım yolunu, ikincisi hücre içindeki kimyasal karbon bağlanmasını gösterir.",
        reason:
          "CO₂’nin dokulara ulaşması ile karbonun organik moleküle katılması aynı basamak değildir.",
        wrong: [
          [
            "İlk geçişte CO₂ mutlaka bir DNA molekülüne dönüşür.",
            "Hava boşluğuna difüzyon böyle bir dönüşümü gerektirmez.",
          ],
          [
            "Hava boşluğu kloroplastın çekirdeğidir.",
            "Hücreler arası boşluk organel içi yapı değildir.",
          ],
          [
            "Her iki gözlem aynı noktadaki yalnız su yoğuşmasıdır.",
            "Birinci gaz ulaşımı, ikinci kimyasal karbon katılımıdır.",
          ],
          [
            "Kloroplast karbon bağladığı için CO₂’nin hücre yüzeyine ulaşması gerekmez.",
            "Tepkimeye katılacak maddenin ilgili hücre ve yapıya ulaşması gerekir.",
          ],
        ],
        knowledge: [
          "Yaprakta madde yolu ile o maddenin metabolik dönüşümü farklı düzeylerde açıklanır.",
        ],
        strategy: "İzlenen karbonun konumunu ve kimyasal biçimini ayrı sor.",
        steps: [
          "İlk gözlemde CO₂’nin yalnız konum değiştirdiğini belirle.",
          "İkinci gözlemde karbonun organik bileşiğe katıldığını ayır.",
          "Yolu difüzyonla, organik katılımı hücresel kimyasal süreçle eşleştir.",
        ],
        commonError:
          "Bir geçit yapısına o geçitten geçen maddenin bütün kimyasal görevlerini yüklemek.",
        check: "Doğru açıklama hava boşluğunu kloroplastın yerine koymuyor.",
      },
      {
        prompt:
          "Bir bitkide su depolayan etli yapı, gövde düğümünden çıkan ve koltuğunda tomurcuk bulunan değişmiş yaprak olarak belirleniyor. Aynı bitkinin yeşil gövdesi de fotosentez yapıyor. Hangi sonuç uygundur?",
        correct:
          "Yaprak depo görevine, gövde fotosenteze katılabilir; görev değişikliği organ kökenlerini tek başına değiştirmez.",
        reason:
          "Organın morfolojik kökeni ile hangi göreve ağırlık verdiği ayrı değerlendirilir.",
        wrong: [
          [
            "Su depolayan her yapı zorunlu olarak köktür.",
            "Depo işlevi tek başına kök kökeni kanıtı değildir; burada yaprak bağlantısı verilmiştir.",
          ],
          [
            "Fotosentez yapan her hücre zorunlu olarak yaprak ayasıdır.",
            "Yeşil gövde gibi başka yapılar da fotosenteze katılabilir.",
          ],
          [
            "Yaprak depo yaparsa bitkide artık iletim dokusu bulunamaz.",
            "Bir organın depo görevi bütün iletim sistemini ortadan kaldırmaz.",
          ],
          [
            "Koltuk tomurcuğu suyun mineralden oluştuğunu kanıtlar.",
            "Tomurcuk bağlantı ve organ yapısıyla ilişkilidir; suyun kimyasal kökeniyle değil.",
          ],
        ],
        knowledge: [
          "Değişmiş organlarda kökeni yapısal bağlantılar, işlevi ise yapılan görev gösterir.",
        ],
        strategy: "Önce organ bağlantısını, sonra verilen işlevi oku.",
        steps: [
          "Etli yapının yaprak kökeninin bağlantı verisiyle belirlendiğini kaydet.",
          "Su depolama ve fotosentez görevlerini verilen iki organa ayrı bağla.",
          "İşlev değişikliğini köken değişikliği saymayan açıklamayı seç.",
        ],
        commonError: "Organın adını yalnız tek bir göreve göre koymak.",
        check:
          "Doğru açıklama hem yaprak bağlantısını hem yeşil gövdenin fotosentezini içeriyor.",
      },
    ],
  },
  {
    id: "bitki-madde-tasinmasi",
    topic: "detail-349",
    title: "Bitkilerde taşıma: zardan su sütununa, kaynaktan havuza",
    minutes: 125,
    objectives: [
      "Zardan alım, kök içindeki radyal yol ve uzun mesafe kütlesel akışı birbirinden ayır.",
      "Su potansiyeli ve basınç farkını verilen koşullarda kullanarak akış yönünü belirle.",
      "Mineral gereksinimi, ksilem gerilimi ve floem kaynak–havuz ilişkisini deney kanıtıyla açıkla.",
    ],
    source:
      "Aurelia YKS arşivindeki MEBİ AYT Biyoloji Konu Özetleri, köklerde emilim ve ksilem–floem taşınması; OGM Bitkilerde Madde Taşınması I–III sunuları; Dersler Cepte Bitkilerin Yapısı karşılaştırılarak hazırlanmış özgün anlatım, modeller ve beş seçenekli alıştırmalar.",
    sections: [
      {
        title: "Üç ölçeği ayrı tut",
        paragraphs: [
          "Bir su molekülünü topraktan yaprağa izlemek tek bir taşıma mekanizması söylemekle bitmez. Önce kökün canlı hücre zarlarıyla alışveriş vardır; sonra kök yüzeyinden merkezdeki iletim dokusuna radyal geçiş; en sonunda ksilem boruları boyunca uzun mesafe akış bulunur. Kök ve gövde anatomisi bu üç ölçeğe yer sağlar.",
          "Zarda osmoz veya iyon taşıması, uzun boruda ise su ile çözünmüş maddelerin birlikte kütlesel akışı düşünülebilir. Bir ölçekte ATP kullanılması bütün yolun her milimetresinde aynı taşımanın olduğu anlamına gelmez. Ok çizmeden önce okun bir zarı mı, hücreler arası yolu mu, yoksa uzun bir boruyu mu geçtiğini sor.",
        ],
      },
      {
        title: "Mineral, organik besinle aynı kaynak değildir",
        paragraphs: [
          "Bitki karbonunun büyük bölümünü fotosentez için aldığı CO₂ üzerinden organik bileşiklere katar. Su, mineral iyonlar ve ışık bununla ilişkili fakat farklı girdilerdir. Toprak çözeltisindeki nitratı hazır protein, fosfatı hazır DNA gibi adlandırma; hücre bunları metabolik yollarla organik yapılara katabilir.",
          "Azot amino asit ve nükleotit yapılarıyla, fosfor nükleik asitler ve ATP gibi moleküllerle, magnezyum klorofille ilişkilidir. Potasyum da iyon dengesi ve enzimlerin çalışmasına katkı verir. Bir elementin her görevi bu örneklerden ibaret değildir; ancak mineral gereksiniminin yalnız gövdeyi sertleştirmek olmadığını gösterir.",
        ],
      },
      {
        title: "Makro ve mikro sözcüklerini miktarla oku",
        paragraphs: [
          "Makroelement, bitkinin daha büyük miktarda gereksindiği; mikroelement daha küçük miktarda gereksindiği elementtir. Az miktarda gerekmesi önemsiz ya da eksikliğinin zararsız olması değildir. C, H, O, N, P, K, S, Ca ve Mg makroelementler arasında; Fe, Mn, Zn, Cu, B, Mo, Cl ve Ni mikroelementler arasında değerlendirilir.",
          "Mg klorofil molekülünün yapısında bulunur; Fe klorofil senteziyle ilgili süreçler için gerekir ama klorofilin merkez atomu değildir. Bu ayrım yapı maddesi ve süreç gereksinimini ayırır. Bir mineralin eksikliği bütün diğerlerini sınırsız artırarak giderilemez; doz fazlalığı da toksisite ve iyon dengesizliği oluşturabilir.",
        ],
      },
      {
        title: "Minimum yasasında ham miktarı değil yeterliliği karşılaştır",
        paragraphs: [
          "Bir büyüme hedefi için gereken miktarlarla sağlanan miktarlar birlikte verilirse her kaynak için sağlanan/gereken oranını hesaplayabilirsin. Diğer koşullar uygunken en düşük yeterlilik oranı hedefe ulaşmayı sınırlayabilir. En az miligram bulunan elementi doğrudan sınırlayıcı seçmek, farklı gereksinimleri yok sayar.",
          "Bu bir öğretim modelidir; gerçek büyümede element etkileşimleri ve çevre de önemlidir. Sınırlayıcı kaynağı artırınca başka bir kaynak yeni sınır olabilir. Hidroponik eksiltme deneyinde bütün çözelti kontrolü, belirli elementin çıkarıldığı çözelti ve eksikliğin geri eklemeyle düzelmesi birlikte daha güçlü kanıt oluşturur.",
        ],
      },
      {
        title: "Kök yüzeyinde su ile iyon için aynı açıklamayı kullanma",
        paragraphs: [
          "Emici tüyler toprak çözeltisiyle temas alanını artırır. Su, suya geçirgen bir zar üzerinden uygun su potansiyeli farkıyla osmozla geçebilir; iyonlar ise seçici kanallar, taşıyıcılar ve pompalar aracılığıyla alınabilir. Her iyon her koşulda yalnız aktif taşınır diye bir kural yoktur.",
          "Bir iyonun elektrokimyasal farkına karşı biriktirilmesi enerji bağlantılı taşıma gerektirebilir. Bazı taşımalar ATP kullanan pompaların kurduğu proton farkından dolaylı yararlanır. Suyun kendisinin ATP ile pompalandığını söylemek bu dolaylı ilişkiyi yanlış yere taşır; canlı hücrelerin enerji kullanımı suyun izleyeceği koşulları etkileyebilir.",
        ],
      },
      {
        title: "Su potansiyelinde işareti ve kapsamı yaz",
        paragraphs: [
          "Aynı yükseklikte, diğer bileşenlerin ihmal edildiği verilen modelde Ψ = Ψs + Ψp kullanılır. Çözünen potansiyeli genellikle sıfır veya negatiftir; turgor basıncı pozitif katkı yapabilir. Suya geçirgen bir bağlantıda net su yönü daha yüksek toplam Ψ değerinden daha düşük değere doğrudur.",
          "Örneğin −0,2 MPa, −0,9 MPa değerinden yüksektir. Yalnız çözünen miktarına bakmak, karşı taraftaki basıncı görmezden gelebilir. Farklı yüksekliklerde yerçekimi bileşeni de dikkate alınmalıdır; etkileşimde ksilem için verilen değerler bu katkıları içeren toplam su potansiyelleri olarak tanımlanır.",
        ],
      },
      {
        title: "Havasız ve tuzlu toprak aynı nedenden etkilemez",
        paragraphs: [
          "Kök hücreleri enerji üretmek için solunum yapar. Toprakta O₂ azalınca oksijenli solunumun katkısı ve ATP gerektiren iyon biriktirme basamakları olumsuz etkilenebilir. Toprağın suyla dolması her zaman kökün daha rahat su alması demek değildir; gözeneklerde hava azalabilir.",
          "Tuzluluk ise dış çözeltinin çözünen potansiyelini daha negatif yaparak su girişini zorlaştırabilir; ayrıca belirli iyonların toksik etkileri olabilir. Bu iki mekanizmayı tek bir susuzluk etiketiyle birleştirme. Kontrollü deneyde oksijen, tuzluluk, sıcaklık ve pH ayrı ayrı değiştirilirse açıklamanın gücü artar.",
        ],
      },
      {
        title: "Radyal yolda duvar ve sitoplazmayı ayır",
        paragraphs: [
          "Apoplast yol hücre çeperleri ve hücreler arası alanlarla; simplast yol plazmodezmlerle bağlantılı sitoplazmalarla ilişkilidir. Simplasta ilk girişte zar aşılır. Transmembran yolda ise komşu hücrelere geçerken zarlar tekrar tekrar aşılabilir. Bunlar kök yüzeyinden merkeze giden yolların adlarıdır.",
          "Endodermisteki Kaspari şeridi, çeper boyunca merkeze kesintisiz ilerleyen apoplast geçişi sınırlar. Seçici zardan geçişe zorlanmak, alınan maddelerin denetimine katkı verir. Şeridi bütün suyu geçirmez bir organ kapağı veya bütün iyonları hiç seçmeden hızlandıran bir oluk gibi düşünme.",
        ],
      },
      {
        title: "Ksilem borusunda suyu birlikte hareket eden sıvı olarak izle",
        paragraphs: [
          "Olgun trake ve trakeitler canlı içeriklerini kaybetmiş, ligninli çeperli iletim elemanlarıdır. İletimde su ve çözünmüş iyonlar basınç ve su potansiyeli farklarıyla birlikte kütlesel hareket eder. Bir ölü boru elemanı her iyon için ATP harcayan zar pompası değildir.",
          "Canlı kök hücreleri ksileme iyon yüklenmesine katkı verebilir; yapraklar da buharlaşmayla çekim oluşturur. Böylece canlı dokuların etkinliği ve ölü iletim yolunun fiziksel akışı birlikte çalışır. Bir borunun ölü olması bitkinin bütün taşımasının canlılıktan bağımsız olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Kök basıncı alttan iten bir katkıdır",
        paragraphs: [
          "Uygun koşulda kök dokularının ksileme iyon yüklemesi, suyun ksileme girişini destekler; oluşan pozitif basınç sıvıyı yukarı itebilir. Bu kök basıncı, özellikle terlemenin düşük olduğu bazı bitkilerde gözlenebilir. Canlı kökün metabolik etkinliğiyle ilişkili oluşum basamağını ayırt et.",
          "Kök basıncı yüksek ağaçlarda suyu tek başına her yüksekliğe taşıyan evrensel motor değildir. Her bitkide ve her saatte aynı ölçülmez. Hidatottan mineralli sıvı damlaması bu katkıyla ilişkili olabilir; yalnız havanın nemli olması kök basıncının veya gutasyonun kesin varlığını kanıtlamaz.",
        ],
      },
      {
        title: "Kohezyon ve adhezyonu iki temasla tanı",
        paragraphs: [
          "Su molekülleri arasındaki çekim kohezyondur; su ile ksilem çeperi gibi farklı yüzeyler arasındaki çekim adhezyondur. Dar bir boruda kılcallık sıvının yükselmesine katkı verebilir. Ancak yalnız kılcallık, uzun bir ağacın bütün su gereksinimini ve yüksekliğini açıklamaya yetmez.",
          "Bu fiziksel etkiler için her boru elemanının canlı olması gerekmez. Kohezyon, çekilme etkisinin süreklilik taşıyan su sütununda iletilmesine yardım eder; adhezyon suyun çepere tutunmasına katkı verir. İki sözcüğü yalnız yukarı ve aşağı yön etiketleri olarak ezberleme; hangi iki şey arasında çekim bulunduğunu belirt.",
        ],
      },
      {
        title: "Terleme çekimini buharlaşma yüzeyinde başlat",
        paragraphs: [
          "Mezofil çeperlerindeki ince su filmi buharlaşınca iç hava boşluklarına su buharı geçer. Uygun buhar basıncı farkında buhar stomadan dışarı yayılır. Su filmi yenilenirken ksilemden su çekilir; su sütununda gerilim yani negatif basınç oluşabilir. Bu, kohezyon–gerilim açıklamasının başlangıcıdır.",
          "Sütundaki kohezyon çekimi köke doğru iletir; kökten yeni su girişi kaybı karşılar. Su sütununun hava kabarcığıyla kesilmesi bazı iletim yollarında iletkenliği azaltabilir. Emboli şeması çizmek gerçek akış hızını ölçmek değildir; etkileşimde yol kesildiğinde sıfır gösterimi yalnız seçilmiş tek bağlantının modelidir.",
        ],
      },
      {
        title: "Çevre etkisini diğer koşullarla birlikte değerlendir",
        paragraphs: [
          "Aynı açıklık ve sıcaklıkta dış havanın daha nemli olması iç-dış su buharı farkını azaltabilir. Ilımlı hava hareketi yüzey yakınındaki nemli tabakayı uzaklaştırabilir. Fakat çok şiddetli rüzgâr, su stresi ve stoma kapanması gibi ek etkiler sonucu değiştirebilir. Tek değişkene sınırsız doğrusal grafik yükleme.",
          "Işık, sıcaklık, yaprak alanı ve stoma yoğunluğu da koşula bağlı katkı yapar. Büyük yaprak her koşulda küçükten daha hızlı terler demek için diğer özellikler denetlenmelidir. Ölçülen toplam kütle kaybında toprak buharlaşmasını engellemek, terlemeyi bitki dışı kayıptan ayırmaya yardım eder.",
        ],
      },
      {
        title: "Floemin canlı iletim yapısını tanı",
        paragraphs: [
          "Çiçekli bitkilerin floemindeki olgun kalburlu boru elemanları canlıdır fakat çekirdeklerini kaybeder; metabolik destek sağlayan arkadaş hücreleriyle yakın ilişkilidir. Kalburlu plaklar boyunca sıvı akışı bulunur. Çekirdeksiz olmak ölü olmakla eş anlamlı değildir.",
          "Floem öz suyunda başta sakkaroz gibi organik maddeler, amino asitler ve bazı başka çözünenler taşınabilir. Ksilem de yalnız saf su içeren bir boşluk değildir. Yine de temel okul karşılaştırmasında ksilemin su–mineral, floemin organik madde dağıtımındaki rolünü koru; iki dokuyu aynı boru sayma.",
        ],
      },
      {
        title: "Kaynak ve havuz kalıcı organ adları değildir",
        paragraphs: [
          "Kaynak, o dönemde taşınabilir organik maddeyi dışarı veren; havuz ise onu kullanan veya depolayan bölgedir. Olgun fotosentetik yaprak çoğu kez kaynaktır; gelişen meyve, genç sürgün ve kök havuz olabilir. Konumun üstte veya altta olması tek başına rolü belirlemez.",
          "Depo kök ilkbaharda depolarını yeni sürgüne verince kaynak davranabilir. Genç yaprak başlangıçta havuzken yeterli net üretime ulaştığında kaynak olabilir. Kaynak–havuz haritasını mevsim ve gelişim evresiyle birlikte çiz. Yer altında olan her organın sürekli havuz olduğunu varsayma.",
        ],
      },
      {
        title: "Yükleme su girişine, su girişi basınca bağlanır",
        paragraphs: [
          "Kaynakta organik maddeler floeme yüklendiğinde çözünen potansiyeli düşebilir. Suya geçirgen bağlantılar üzerinden suyun girişi kalburlu borudaki turgor basıncını artırır. Böylece kaynağın yüksek basınçlı bölgesi ile havuzun daha düşük basınçlı bölgesi arasında akış koşulu oluşur.",
          "Bazı yükleme ve boşaltma yolları aktif taşıma veya proton farkıyla enerji kullanır; bazıları simplast bağlantılarla gerçekleşebilir. Boru içindeki kütlesel akış ise basınç farkıyla açıklanır. Enerji gerektiren hazırlıkla sıvının basınçla ilerlemesini aynı mekanizma diye anlatma.",
        ],
      },
      {
        title: "Havuzda boşalma farkın sürmesine yardım eder",
        paragraphs: [
          "Havuzda şekerin alınması, tüketilmesi ya da nişasta gibi başka biçime dönüştürülmesi floemdeki çözünen durumunu etkiler. Su bu bölgede çevre dokulara ve uygun koşullarda ksileme dönebilir. Kaynak–havuz arasındaki basınç farkı, yükleme ve boşaltmanın sürmesiyle korunabilir.",
          "Bir depoda nişasta birikmesi şekerin ksilemle geldiğini kanıtlamaz; etiketli karbonun önce floemde izlenmesi daha belirleyicidir. Basınç akış teorisi yalnız şeker moleküllerinin kendi aralarında difüzyonunu değil, su içindeki maddelerin birlikte hareketini açıklar.",
        ],
      },
      {
        title: "Çift yönlülüğü ayrı borulara yerleştir",
        paragraphs: [
          "Bir kaynak yaprağın üstündeki genç sürgüne ve altındaki köke organik madde gönderilebilir. Bu nedenle bitkinin floem sistemi içinde hem yukarı hem aşağı taşıma gözlenebilir. Ancak aynı kalburlu boru yolunda aynı anda iki zıt kütlesel akış gösterilmez; farklı bağlantılar ve borular ayrılır.",
          "Etkileşimde A ve B uçlarına verilen basınçları değiştirdiğinde seçili borudaki yön değişir. Bu, bir anda aynı boruda iki zıt ok değil, farklı koşullarda tek net yöndür. Yükseklikle basıncı karıştırma: bir havuz kaynağın üzerinde olsa da uygun basınç farkıyla organik madde alabilir.",
        ],
      },
      {
        title: "Halka çıkarma deneyinde erken ve geç etkiyi ayır",
        paragraphs: [
          "Yalnız floem halkası kesilip ksilem korunursa yapraktan aşağıdaki köke organik madde taşınması kesilebilir. İlk anda ksilem su iletiminin doğrudan kesilmesi beklenmez. Kesinin üstünde organik madde birikimi görülebilir; hangi yan dal ve yaprakların bağlı kaldığı önemlidir.",
          "Uzun sürede kök deposunun tükenmesi ve canlılığın bozulması su ve mineral alımını da etkileyebilir. Erken gözlem ve geç gözlemi aynı nedene bağlamadan sırala. Deneyde ksilem de zarar gördüyse yalnız floem sonucunu çıkaramazsın; kesinin kapsamı mutlaka verilmelidir.",
        ],
      },
      {
        title: "İzotoplu karbonu molekül dönüşümüyle izle",
        paragraphs: [
          "Bir yaprağa işaretli CO₂ verilince fotosentezle oluşan organik maddelerde işaretli karbon bulunabilir. İşaretin sonra floemde ve uzak bir depo organda görülmesi organik maddenin kaynaktan havuza taşınmasını destekler. İzlenen atom ile taşınan molekülün bütün süreç boyunca değişmez olduğu söylenmez.",
          "Depo dokuda işaretli nişasta bulunması, taşınan karbonun orada nişastaya katılabileceğini gösterir. Kontrol bitkisinin işaretsiz CO₂ alması arka plan sinyalini ayırmaya yardım eder. İşaretli karbonu su molekülünün karbon içerdiği gibi kimyasal olarak olanaksız bir açıklamaya yerleştirme.",
        ],
      },
      {
        title: "Akış modelindeki işaretin ne anlattığını hesapla",
        paragraphs: [
          "Özgün öğretim modelinde seçili yol sağlamken Q = G × fark kullanılır. Ksilem için fark A ve B uçlarının verilen toplam su potansiyelleri, floem için verilen basınçları arasındadır. G pozitif bir iletkenlik parametresidir; pozitif Q A→B, negatif Q B→A yönünü temsil eder.",
          "Eşit uç değerlerinde net Q sıfırdır. Bağlantı deneysel olarak kesilirse seçili yolun Q değeri de sıfır alınır. Sayıların birimi öğretim birimidir; gerçek bitkide ölçülmüş mL/s sonucu üretilmez. Yönü önce farktan, büyüklüğü sonra iletkenlikten hesaplamak işaret hatasını azaltır.",
        ],
      },
      {
        title: "Yeni bir deneyi açıklamanın omurgası",
        paragraphs: [
          "Bir veri tablosunu okurken önce değiştirilen etkeni, sabit tutulan koşulları ve ölçülen sonucu yaz. Su alımının azalması, hangi basamağın etkilendiğine ilişkin ek kanıt olmadan yalnız tek bir mekanizmayı kanıtlamaz. Örneğin tuzluluk, kök hasarı ve stoma kapanması farklı yollarla aynı sonuca katkı verebilir.",
          "Açıklamanı yapı, itici fark ve zaman üzerinden kur: hangi yol var; fark hangi yönde; enerji nereye bağlı; ilk ve sonraki sonuç ne? Böylece bir iyonun zardan alımı ile floemde şeker dağılımını karşılaştırırken ortak ve farklı basamakları güvenle gösterebilirsin.",
        ],
      },
    ],
    examples: [
      {
        title: "Toplam potansiyeli iki terimle hesapla",
        prompt:
          "Aynı yükseklikteki kök hücresinde Ψs = −1,4 MPa ve Ψp = +0,6 MPa; dış çözeltide Ψ = −0,5 MPa veriliyor. Diğer bileşenler ihmal edilip zar suya geçirgense ilk net yön nedir?",
        strategy:
          "Hücre toplamını bul; negatif sayıları sayı doğrusunda karşılaştır.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "Hücrede −1,4 + 0,6 = −0,8 MPa hesapla.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "Dıştaki −0,5 değeri içerideki −0,8’den yüksektir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "İlk net su dıştan hücreye geçer; bu anlık yön nihai hacmi vermez.",
          },
        ],
        answer: "Su hücreye doğru.",
        check: "Çözünen potansiyelini toplam potansiyel yerine koymadın mı?",
        pitfall: "Yalnız tuz yoğunluğuna bakıp basınç katkısını unutmak.",
      },
      {
        title: "Yeterlilik oranını aynı hedefe bağla",
        prompt:
          "Bir hedef büyüme için N 24 mg, P 6 mg ve K 16 mg gerekiyor. Çözelti sırasıyla 18, 6 ve 20 mg sağlıyor. Diğer etkenler uygun ve verilen doğrusal model geçerliyse ilk sınır hangisi?",
        strategy: "Her miktarı kendi gereksinimine böl.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "N için 18/24 = 0,75; P için 6/6 = 1; K için 20/16 = 1,25 bul.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "En küçük oran N’ye aittir; ham miktarı en küçük olan P değildir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Yalnız N artınca hedef bir sonraki kısıta kadar gelişebilir; sonsuz büyüme sonucu çıkmaz.",
          },
        ],
        answer: "İlk sınırlayıcı N.",
        check: "Üç oran da aynı hedef büyümeye mi göre kuruldu?",
        pitfall: "6 mg en küçük diye fosforu seçmek.",
      },
      {
        title: "Aşağıdan yukarıya kaynak değişimi",
        prompt:
          "İlkbaharda bir depo kök nişastasını çözüp şekeri yeni tomurcuklara gönderiyor. O sırada genç yapraklar net şeker dışa veremiyor. Kaynak ve havuzları nasıl gösterirsin?",
        strategy:
          "Üreten organ ezberinden önce o andaki dışa verme ve alma rolünü oku.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Depo kökün dışa şeker verdiğini, genç sürgünün aldığını kaydet.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Kökü kaynak, yeni tomurcukları havuz yap; floem yolunu bu rollere göre çiz.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Kaynağın altta olması yukarı organik madde taşınmasını engellemez.",
          },
        ],
        answer: "Kaynak depo kök; havuz gelişen tomurcuklar.",
        check:
          "Genç yaprağı sırf yeşil diye otomatik kaynak yazmadığını denetle.",
        pitfall: "Kaynak her zaman üstteki yapraktır sanmak.",
      },
      {
        title: "Basınç farkıyla ters yönü bul",
        prompt:
          "Seçili sağlam floem yolunda A basıncı 0,7, B basıncı 1,3 ve G = 4 öğretim birimi veriliyor. Q = G(PA−PB); pozitif yön A→B olarak tanımlı. Sonuç nedir?",
        strategy: "Önce farkın işaretini, sonra çarpımı hesapla.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "PA−PB = 0,7−1,3 = −0,6 bul.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "4 × (−0,6) = −2,4 hesapla.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Negatif işaret B→A yönüdür; büyüklük 2,4 öğretim birimidir.",
          },
        ],
        answer: "Q = −2,4; yön B→A.",
        check: "Negatif akışı madde yokluğu diye yorumlamadın mı?",
        pitfall: "Basıncı yüksek ucu aşağıda/üstte diye değiştirmek.",
      },
      {
        title: "Kontrol saksısıyla buharlaşmayı ayır",
        prompt:
          "Bir saat içinde bitkili kap 14 g, eş biçimli bitkisiz nemli toprak kabı 5 g kaybediyor. Koşullar eş, toprağın buharlaşma katkısının 5 g olduğu bu karşılaştırma için kabul ediliyor. Bitkiye bağlanan yaklaşık kayıp kaç gramdır?",
        strategy: "Ölçülen toplamdan verilen bitki dışı katkıyı çıkar.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Bitkili toplamın yalnız yaprak kaybı olmadığını fark et.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "14−5 = 9 g hesapla.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Sonuç bir saatlik düzeltilmiş tahmindir; stoma sayısını veya fotosentez hızını vermez.",
          },
        ],
        answer: "Yaklaşık 9 g.",
        check: "Çıkarılan değer eş koşullu kontrol kabından mı geliyor?",
        pitfall: "Toplam kütle kaybını bütünüyle terleme saymak.",
      },
      {
        title: "Erken gözlemden geç sonuca sıçrama",
        prompt:
          "Bir dalın yalnız floemi çevre boyunca çıkarılıyor; ksilem sağlam. İlk gün su alımı sürüyor, ikinci haftada kesinin altındaki köklerin depo şekeri azalıyor. İki bulguyu nasıl bağlarsın?",
        strategy: "Doku yolunu ve zaman aralığını ayrı kullan.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Sağlam ksilemin erken su aktarımını sürdürebileceğini belirle.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Floem kopmasıyla aşağı organik madde desteğinin azalmasını kök deposuyla ilişkilendir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Uzun vadeli kök bozulması olasıdır; ilk gün verisinden anlık bütün taşıma kaybı çıkarma.",
          },
        ],
        answer:
          "Erken su yolu korunabilir; organik madde kesintisi kökü gecikmeli etkiler.",
        check: "Erken ve geç bulguya aynı doğrudan mekanizmayı yüklemedin mi?",
        pitfall: "Floem kesilmesini ksilem anında kesilmiş gibi okumak.",
      },
    ],
    recall: [
      {
        prompt:
          "Bir taşıma oku zarı geçiyorsa neyi, boru içinde gidiyorsa neyi ayrıca sorgularsın?",
        answer:
          "Zarda seçicilik, osmoz/iyon yolu ve enerji bağlantısını; boruda kütlesel akışın basınç veya su potansiyeli farkını sorgularım.",
      },
      {
        prompt: "Mikroelement neden önemsiz element demek değildir?",
        answer:
          "Mikro sözcüğü gereksinim miktarını anlatır; az miktarı bile özgül işlevi için zorunlu olabilir.",
      },
      {
        prompt: "Kohezyon ve adhezyonun tarafları nelerdir?",
        answer:
          "Kohezyonda su–su; adhezyonda su–çeper gibi farklı maddeler arasındaki çekim söz konusudur.",
      },
      {
        prompt: "Floemde enerji ve basınç akışını nasıl ayırırsın?",
        answer:
          "Yükleme/boşaltmanın bazı yolları enerjiye bağlıdır; boru içindeki sıvı kütlesel olarak basınç farkıyla ilerler.",
      },
      {
        prompt: "Bir organ ne zaman kaynak rolünden havuz rolüne geçebilir?",
        answer:
          "Dışa verdiği organik madde yerine net olarak madde almaya başladığında; gelişim ve mevsim rolü değiştirebilir.",
      },
      {
        prompt: "Q sıfırsa yalnız hangi tek nedeni kesin söyleyemezsin?",
        answer:
          "Yol kopmuş veya uç farkı sıfır olabilir; verilen diğer değişkenleri bilmeden sıfırdan tek neden çıkaramam.",
      },
    ],
    items: [
      {
        prompt:
          "Bir mineral iyonu canlı kök hücresinde enerji bağlantılı olarak biriktiriliyor; sonra aynı iyon ksilem öz suyuyla yaprağa ilerliyor. İki basamağı doğru ayıran açıklama hangisidir?",
        correct:
          "Zardan biriktirme enerjiye bağlı olabilir; ksilem borusundaki uzun mesafe taşıma basınç farklarıyla kütlesel akıştır.",
        reason:
          "Canlı hücre zarındaki seçici taşıma ile boru boyunca çözeltinin birlikte ilerlemesi farklı ölçeklerdir.",
        wrong: [
          [
            "Her iki basamakta da ölü ksilem hücreleri ATP ile iyon pompalar.",
            "Olgun boru elemanları canlı içeriklerini kaybetmiştir; kökteki zar taşımasını onlar yapmaz.",
          ],
          [
            "İyonun ksilemde bulunması kök yüzeyinde hiç zar geçmediğini kanıtlar.",
            "Ksileme ulaşmış olması önceki radyal geçiş ve zar aşamalarını ortadan kaldırmaz.",
          ],
          [
            "Suyun boruda yükselmesi bütün yol boyunca osmoz yapıldığını gösterir.",
            "Osmoz suya geçirgen zar gerektirir; boru boyunca kütlesel sıvı akışı aynı olay değildir.",
          ],
          [
            "Kökte enerji kullanıldığı için basınç farkı taşımanın hiçbir aşamasında etkili olamaz.",
            "Enerji bağlantılı yükleme, fiziksel basınçla akışın oluşmasına katkı verebilir.",
          ],
        ],
        knowledge: [
          "Zar geçişi ve uzun mesafe kütlesel akış ayrı süreçlerdir.",
        ],
        strategy: "İki oku geçtikleri yapıya göre sınıflandır.",
        steps: [
          "İlk oku canlı kök hücresi zarı üzerindeki biriktirmeye yerleştir.",
          "İkinci oku ksilem borusu boyunca su–iyon çözeltisinin hareketi olarak belirle.",
          "Enerjiyi ilk, basınç farkını uzun mesafe basamağıyla ilişkilendir.",
        ],
        commonError:
          "Kökteki aktif taşımayı ölü borunun bütün uzunluğuna yaymak.",
        check:
          "Açıklama hem verilen enerji bağımlılığını hem ksilemde çözeltinin birlikte akışını koruyor.",
      },
      {
        prompt:
          "Aynı yükseklikteki bir hücrede Ψs = −1,1 MPa, Ψp = +0,4 MPa; dış ortamda Ψ = −0,3 MPa. Diğer bileşenler ihmal ediliyor ve zar suya geçirgen. İlk net su yönü nedir?",
        correct: "Dış ortamdan hücreye; hücrenin toplam Ψ değeri −0,7 MPa’dır.",
        reason:
          "−1,1 + 0,4 = −0,7 ve −0,3 > −0,7 olduğundan su dıştan içe geçer.",
        wrong: [
          [
            "Hücreden dışarı; negatif sayılarda −0,7 daha yüksektir.",
            "Sayı doğrusunda −0,3 daha yüksektir; büyüklüklerin mutlak değerini karşılaştırma.",
          ],
          [
            "Net geçiş yok; basınç ve çözünen etkileri her zaman birbirini götürür.",
            "Verilen +0,4, −1,1 değerini sıfırlamaz; toplam −0,7’dir.",
          ],
          [
            "Dışarıdan içeri yalnız su ATP ile pompalanırsa geçer.",
            "Verilen fark osmozu destekler; su için doğrudan ATP pompası gerekmez.",
          ],
          [
            "Hücre toplamı −1,5 MPa olduğu için yön dışarıdır.",
            "+0,4 basınç katkısı çıkarılmaz; toplandığında −0,7 elde edilir.",
          ],
        ],
        knowledge: [
          "Ψ toplamı verilen bileşenlerle hesaplanır; su yüksek Ψ’den düşüğe ilerler.",
        ],
        strategy: "Topla, sonra iki negatif değeri karşılaştır.",
        steps: [
          "Hücre Ψ değerini −1,1+0,4 = −0,7 hesapla.",
          "Dıştaki −0,3 değerinin daha yüksek olduğunu belirle.",
          "Yüksek dıştan düşük içe net su yönünü seç.",
        ],
        commonError: "Pozitif turgor terimini yanlış işaretle eklemek.",
        check:
          "Seçtiğin yön hem −0,7 toplamıyla hem −0,3 dış değerle uyumlu mu?",
      },
      {
        prompt:
          "Bir hedef büyüme için N 12 mg, P 4 mg, K 10 mg gerekiyor. Çözelti N 9 mg, P 2 mg ve K 15 mg sağlıyor. Yalnız bu yeterlilik oranlarının sınırlayıcı olduğu verilen modelde ilk sınırlayıcı hangisidir?",
        correct: "Fosfor; sağlanan/gereken oranı 0,5 ile en düşüktür.",
        reason:
          "N 0,75, P 0,5, K 1,5 yeterliliğindedir; hedefe göre en düşük oran P’dir.",
        wrong: [
          [
            "Azot; sağlanan miktarı potasyumdan küçüktür.",
            "Kısmi ham miktar karşılaştırması yerine üç gereksinime göre oran gerekir.",
          ],
          [
            "Potasyum; gereken miktarı fosfordan büyüktür.",
            "K için 15/10 = 1,5 ile hedefin üzerinde yeterlilik verilmiştir.",
          ],
          [
            "Hiçbiri; her elementten sıfırdan büyük miktar vardır.",
            "Pozitif bulunmak hedef gereksinimin karşılandığı anlamına gelmez.",
          ],
          [
            "Üçü eşit; mg birimi aynı olduğunda oran hesabına gerek yoktur.",
            "Aynı birimdeki miktarlar farklı gereksinimlere bölününce farklı yeterlilik verir.",
          ],
        ],
        knowledge: [
          "Minimum yasasının verilen oran modelinde sınırlayıcı en düşük yeterliliktir.",
        ],
        strategy: "Her kaynağı kendi hedef gereksinimine böl.",
        steps: [
          "N için 9/12 = 0,75 hesapla.",
          "P için 2/4 = 0,5 ve K için 15/10 = 1,5 bul.",
          "En düşük 0,5 oranını P ile eşleştir.",
        ],
        commonError: "Element miktarını gereksinimden bağımsız değerlendirmek.",
        check:
          "Karşılaştırdığın üç sayı mg değil, aynı hedef için yeterlilik oranlarıdır.",
      },
      {
        prompt:
          "Tam besin çözeltisinde büyüyen bitki sağlıklı. Yalnız Fe çıkarılan çözeltide kloroz gelişiyor; Fe geri eklendiğinde düzelme görülüyor. Mg miktarı bütün gruplarda aynı ve yeterli. Hangi yorum uygundur?",
        correct:
          "Fe, klorofil senteziyle ilişkili süreçler için gereklidir; bu sonuç Fe’nin klorofilin merkez atomu olduğunu göstermez.",
        reason:
          "Mg klorofil yapısında yer alırken Fe sentez süreçlerine katkı verir; kontrollü geri ekleme Fe eksikliği açıklamasını güçlendirir.",
        wrong: [
          [
            "Klorofilin merkezinde Fe vardır; Mg hiçbir yapıya katılmaz.",
            "Klorofilin merkez atomu Mg’dir; Fe gereksinimi aynı yapısal yer demek değildir.",
          ],
          [
            "Fe mikroelement olduğu için eksikliği metabolizmayı etkileyemez.",
            "Mikro gereksinim miktarıdır; zorunlu işlevi ve eksiklik etkisini dışlamaz.",
          ],
          [
            "Fe eklemesi Mg miktarının başlangıçta yetersiz olduğunu kesin kanıtlar.",
            "Mg yeterli ve eşit tutulmuştur; değişen etken Fe’dir.",
          ],
          [
            "Kloroz tek başına bütün kloroplastların kalıcı olarak yok olduğunu kanıtlar.",
            "Renk azalması bu organel kaybı ve kalıcılık sonucunu tek başına vermez.",
          ],
        ],
        knowledge: [
          "Elementin sentez için gerekliliği ile moleküldeki yapısal yeri farklıdır.",
        ],
        strategy: "Değiştirilen elementi, kontrollü Mg bilgisinden ayır.",
        steps: [
          "Yalnız Fe eksiltildiğini ve geri eklenince düzelme olduğunu kaydet.",
          "Mg’nin eşit ve yeterli olduğunu koru.",
          "Fe gereksinimini sentezle ilişkilendir; merkez atom sonucuna geçme.",
        ],
        commonError:
          "Bir sentez gereksinimini molekülün merkez atomuyla eşitlemek.",
        check: "Fe etkisi açıklanırken sabit Mg verisiyle çelişilmiyor.",
      },
      {
        prompt:
          "Aynı tür bitkilerde kök sıcaklığı ve mineral derişimi sabitken yalnız kök ortamının O₂ miktarı azaltılıyor. İncelenen iyonun birikimi ATP bağlantılı bir taşıma basamağı gerektiriyor. En uygun beklenti nedir?",
        correct:
          "Oksijenli solunumun enerji katkısındaki azalma, ATP bağlantılı birikimi zorlaştırabilir.",
        reason:
          "O₂ değişimi enerji üretimi üzerinden verilen ATP gerektiren basamağa bağlanabilir; bütün pasif geçişlerin sıfırlanması gerekmez.",
        wrong: [
          [
            "İyon birikimi kesin artar; O₂ ile ATP arasında hiçbir bağlantı yoktur.",
            "Oksijenli solunum O₂ gerektirir; verilen mekanizmada enerji bağlantısı göz ardı edilemez.",
          ],
          [
            "Her su molekülünün zardan geçişi anında ve kesin sıfır olur.",
            "Su osmozu ile ATP bağlantılı iyon biriktirme aynı süreç değildir.",
          ],
          [
            "Sabit tutulan mineral derişimi zorunlu olarak iki katına çıkar.",
            "Deney koşulu derişimin sabit tutulduğunu açıkça belirtir.",
          ],
          [
            "Sonuç yalnız toprağın tuzlanmasıyla açıklanır.",
            "Tuz derişimi değiştirilmiyor; deneyde değişen etken O₂’dir.",
          ],
        ],
        knowledge: [
          "Canlı kökte solunumla enerji sağlanır; bazı iyon alım basamakları bu enerjiye bağlıdır.",
        ],
        strategy:
          "O₂ → enerji katkısı → verilen taşıma basamağı zincirini kur.",
        steps: [
          "Deneyde yalnız O₂’nin azaldığını belirle.",
          "ATP bağlantılı taşımanın enerji üretimine bağımlılığını kullan.",
          "Olası zorlaşmayı seç; bütün su ve pasif geçiş için kesin sıfır ekleme.",
        ],
        commonError: "Havasızlık deneyini derişim değişimi deneyi gibi okumak.",
        check:
          "Sonuç değişmeyen mineral derişimine dokunmadan O₂ değişimini açıklıyor.",
      },
      {
        prompt:
          "Kök hücresinin başlangıç toplam Ψ değeri −0,6 MPa iken dış çözeltinin Ψ değeri −0,2 MPa. Hücre değeri ilk anda değişmeden dışarıya tuz eklenip dış Ψ −0,9 MPa yapılıyor. Suya geçirgen zarda ilk yön nasıl değişir?",
        correct: "İçeri net geçişten dışarı net geçişe döner.",
        reason:
          "Başlangıçta −0,2 > −0,6; tuz eklenince hücredeki −0,6 dıştaki −0,9’dan yüksek olur.",
        wrong: [
          [
            "Her iki durumda da içeri olur; kök her ortamdan zorunlu su alır.",
            "Dış ortam daha düşük Ψ’ye geldiğinde verilen anlık fark dışarı yönü destekler.",
          ],
          [
            "Her iki durumda da dışarı olur; bütün Ψ değerleri negatiftir.",
            "Negatif işaret tek başına yön vermez; iki değerin sırası gerekir.",
          ],
          [
            "İlk durumda sıfır, ikinci durumda içeri olur.",
            "Başlangıç değerleri eşit değildir; ikinci durumda düşük değer dışarıdadır.",
          ],
          [
            "İkinci durumda yön bilinemez; toplam Ψ verilmesi hiçbir bilgi sağlamaz.",
            "Suya geçirgenlik ve anlık toplam değerler ilk net yönü belirlemeye yeterlidir.",
          ],
        ],
        knowledge: [
          "Su yönü toplam Ψ sıralamasına bağlıdır; tuzluluk dış Ψ’yi düşürebilir.",
        ],
        strategy: "Önce ve sonra için ayrı ikili karşılaştırma yap.",
        steps: [
          "İlk karşılaştırmada yüksek −0,2’den düşük −0,6’ya yönü içeri bul.",
          "Yeni dış −0,9 değerini değişmeyen hücre −0,6 ile karşılaştır.",
          "İkinci durumda yüksek içten düşük dışa yönü seç.",
        ],
        commonError: "Kökün her tuzlulukta su alacağını varsaymak.",
        check:
          "İki karşılaştırmada hücrenin ilk anda −0,6 kaldığı koşulu korundu.",
      },
      {
        prompt:
          "Kök korteksinde yalnız çeperlerden ilerleyen ve hücre zarını geçemeyen bir boya izleniyor. Kaspari şeridi sağlam. Boyanın endodermisteki doğrudan çeper yoluyla ksileme geçmesi için hangi yorum uygundur?",
        correct:
          "Doğrudan apoplast yol engellenir; zar geçemeyen boya bu yoldan merkeze devam edemez.",
        reason:
          "Kaspari şeridi apoplast sürekliliğini keser; gerekli zar aşımını yapamayan boya aynı duvar yolundan geçemez.",
        wrong: [
          [
            "Kaspari şeridi boya için seçici bir ATP pompasıdır ve geçişi zorunlu hızlandırır.",
            "Şerit pompa değildir; duvar yolunda bariyer oluşturur.",
          ],
          [
            "Boya ksileme ancak fotosentezle suya dönüşürse geçer.",
            "Böyle bir kimyasal dönüşüm verilmemiştir; soru fiziksel yolun sürekliliğidir.",
          ],
          [
            "Boya bir kez çepere girdiği için hiçbir bariyerden etkilenmez.",
            "Çeper yolu endodermiste Kaspari şeridiyle kesintiye uğrar.",
          ],
          [
            "Kaspari şeridi simplasttaki bütün plazmodezmleri bütünüyle yok eder.",
            "Apoplast engeli, bütün sitoplazma bağlantılarının yok olması demek değildir.",
          ],
        ],
        knowledge: [
          "Kaspari şeridi kesintisiz apoplast yolu sınırlar; merkeze geçişte zar denetimi gerekir.",
        ],
        strategy: "Boyanın zar geçemezliğini bariyerin konumuyla birleştir.",
        steps: [
          "Boya yolunu sitoplazma yerine çepere yerleştir.",
          "Endodermiste apoplastın kesildiğini belirle.",
          "Zarı aşamayan boyanın bu doğrudan yoldan ksileme ilerleyemeyeceğini seç.",
        ],
        commonError: "Kaspari şeridini geçişi hızlandıran açık kanal sanmak.",
        check:
          "Sonuç hem sağlam şerit hem zar geçirmeyen boya koşulunu kullanıyor.",
      },
      {
        prompt:
          "Gece terlemesi düşük bir otsu bitkinin yaprak kenarındaki hidatotlardan mineral içeren sıvı damlalar çıkıyor. Kök hücrelerinin ksileme iyon yüklediği de biliniyor. En uygun açıklama hangisidir?",
        correct:
          "Kök basıncı sıvıyı hidatotlara iterek gutasyona katkı vermiş olabilir.",
        reason:
          "İyon yükleme, su girişi ve pozitif kök basıncıyla ilişkili hidatot damlası gutasyonla uyumludur.",
        wrong: [
          [
            "Damla kesin çiydir; mineral içeriği ve iç ksilem bağlantısı önemsizdir.",
            "Çiy dış buharın yoğuşmasıdır; verilen hidatot çıkışı iç kaynağı destekler.",
          ],
          [
            "Bu olay stomadan su buharı çıkışıyla tamamen aynı hâldedir.",
            "Verilen sıvı damladır; terlemede su buharı çıkar.",
          ],
          [
            "Her yüksek ağacın suyunu yalnız bu mekanizma taşır.",
            "Kök basıncı bazı koşullarda katkıdır; bütün yüksek ağaçlar için tek motor değildir.",
          ],
          [
            "Hidatot damlası bitkinin su almak için ATP ile su molekülü pompaladığını kanıtlar.",
            "İyon yükleme enerjiyle ilişkili olabilir; suyun doğrudan pompalanması sonucu çıkmaz.",
          ],
        ],
        knowledge: [
          "Gutasyon iç ksilem sıvısının hidatottan çıkışıdır; çiy ve terlemeden ayrılır.",
        ],
        strategy: "Çıkış yerini, maddenin hâlini ve basınç kaynağını eşleştir.",
        steps: [
          "Hidatottan çıkan maddenin mineral içeren sıvı olduğunu belirle.",
          "Kökün iyon yüklemesini su girişi ve pozitif basınçla ilişkilendir.",
          "Gutasyon açıklamasını çiy ve su buharı seçeneklerinden ayır.",
        ],
        commonError: "Yaprak üzerindeki her damlayı atmosferik çiy saymak.",
        check:
          "Seçenek hidatot çıkışı ve kök iyon yüklemesi verilerini birlikte açıklıyor.",
      },
      {
        prompt:
          "Bir su molekülünün diğer su molekülüne çekimi X; suyun ksilem çeperine çekimi Y olarak adlandırılıyor. Doğru eşleştirme hangisidir?",
        correct: "X kohezyon, Y adhezyondur.",
        reason:
          "Aynı madde molekülleri arasındaki çekim kohezyon; farklı madde/yüzeyler arasındaki çekim adhezyondur.",
        wrong: [
          [
            "X adhezyon, Y kohezyondur.",
            "Tanımlardaki aynı ve farklı madde ilişkileri ters çevrilmiştir.",
          ],
          [
            "X aktif taşıma, Y osmozdur.",
            "İki olay çekim ilişkisi olarak verilmiş; zar pompası veya osmoz tanımı değildir.",
          ],
          [
            "X ve Y yalnız canlı hücre zarları varsa oluşur.",
            "Bu fiziksel çekimler cansız boru yüzeylerinde de bulunabilir.",
          ],
          [
            "X floem yüklemesi, Y fotosentezdir.",
            "Verilenler şeker yükleme veya karbon bağlama değil moleküler çekimdir.",
          ],
        ],
        knowledge: [
          "Kohezyon su–su; adhezyon su–çeper çekimiyle örneklendirilebilir.",
        ],
        strategy: "Her temasın iki tarafını adlandır.",
        steps: [
          "X’in iki su molekülü arasında olduğunu kaydet.",
          "Y’nin su ile farklı bir yüzey arasında olduğunu kaydet.",
          "Aynı maddeye kohezyon, farklı yüzeye adhezyon adını bağla.",
        ],
        commonError: "Kohezyon ve adhezyonu yön sözcükleri gibi ezberlemek.",
        check: "Eşleştirme temasın taraflarını değişmeden koruyor.",
      },
      {
        prompt:
          "Terleyen yaprakta mezofil çeperinin su filmi buharlaşıyor, ksilemde gerilim artıyor ve su sütunu sürekliliğini koruyor. Hangi açıklama bu gözlemleri birleştirir?",
        correct:
          "Yapraktaki buharlaşma çekim oluşturur; kohezyon bu etkiyi su sütunu boyunca iletmeye yardım eder.",
        reason:
          "Buharlaşma yüzeyindeki gerilim, kohezyonlu ksilem sıvısına aktarılarak kökten yaprağa akışı destekler.",
        wrong: [
          [
            "Yaprakta kaybolan her su molekülü kökte fotosentezle yeniden üretilir.",
            "Kök su alımı ile moleküllerin yeniden üretimi aynı şey değildir.",
          ],
          [
            "Ölü ksilem hücreleri her molekülü tek tek yukarı taşımak için ATP yakar.",
            "Olgun iletim elemanlarında böyle çalışan canlı zar pompaları yoktur.",
          ],
          [
            "Akış yalnız yerçekimi suyu yukarı ittiği için gerçekleşir.",
            "Yerçekimi yukarı iten bir kuvvet olarak açıklanamaz; verilen çekim mekanizması farklıdır.",
          ],
          [
            "Kohezyon ortadan kalkarsa su sütunu aynı biçimde zorunlu devam eder.",
            "Sütun sürekliliği ve çekimin iletilmesinde kohezyonun rolü göz ardı edilmiştir.",
          ],
        ],
        knowledge: [
          "Kohezyon–gerilim açıklaması buharlaşma, negatif basınç ve su sütunu sürekliliğini bağlar.",
        ],
        strategy: "İlk olayı yaprak yüzeyine yerleştirip geriye doğru izle.",
        steps: [
          "Su filminin buharlaşmasını başlangıç olarak al.",
          "Ksilemde oluşan çekilme etkisini su–su kohezyonuyla bağla.",
          "Kökten gelen sıvının çekimle kaybı yenilemesini seç.",
        ],
        commonError: "Terleme çekimini borudaki ATP pompalarıyla değiştirmek.",
        check:
          "Açıklama başlangıcı yaprakta, iletim yolunu süreklilik taşıyan su sütununda gösteriyor.",
      },
      {
        prompt:
          "Aynı sıcaklıkta, aynı yaprak ve aynı stoma açıklığında dış havanın bağıl nemi artırılıyor. Su stresi veya başka değişim oluşmadığı verilen kısa sürede hangi beklenti uygundur?",
        correct: "İç ve dış su buharı farkı azalacağı için terleme azalabilir.",
        reason:
          "Diğer koşullar sabitken dış nemin artması yapraktan dışarı buhar yayılmasının itici farkını azaltır.",
        wrong: [
          [
            "Terleme kesin artar; dış havada daha fazla su vardır.",
            "Dış su buharının artması iç-dış farkını büyütmez, küçültür.",
          ],
          [
            "Stoma açıklığı sabit olsa bile bütün gaz yolları anında yok olur.",
            "Nem değişimi fiziksel farkı etkiler; verilen yapıların yokluğunu göstermez.",
          ],
          [
            "Nem artışı her koşulda kesin gutasyon başlatır.",
            "Gutasyon için uygun kök basıncı ve hidatot koşulları da gerekir.",
          ],
          [
            "Terleme yalnız fotosentez hızıdır; nemin buhar kaybına etkisi olmaz.",
            "Terleme su buharı kaybıdır ve buhar farkından etkilenir.",
          ],
        ],
        knowledge: [
          "Sabit diğer koşullarda su buharı gradiyenti terlemeyi etkiler.",
        ],
        strategy: "Stoma açıklığını değiştirmeden buhar farkını karşılaştır.",
        steps: [
          "Yaprak ve sıcaklığın sabit kaldığını kaydet.",
          "Dış nem artınca iç-dış su buharı farkının küçüldüğünü belirle.",
          "Azalan farkı daha düşük terleme beklentisine bağla.",
        ],
        commonError:
          "Dışarıda fazla su buharını daha hızlı dışarı kayıp nedeni saymak.",
        check:
          "Sonuç açıkça verilen kısa süre ve sabit açıklık koşuluyla sınırlı.",
      },
      {
        prompt:
          "Bir saksının toprağı buhar geçirmez örtüyle kapatılıyor. Bir saatte bitkili sistemin kütlesi 8 g azalıyor; sızma ve diğer kütle alışverişleri bu modelde ihmal ediliyor. Hangi sonuç ölçümle doğrudan desteklenir?",
        correct: "Bu modelde bitkiden yaklaşık 8 g su kaybı hesaplanabilir.",
        reason:
          "Toprak buharlaşması ve diğer kütle katkıları dışlandığı için kalan kayıp bitkinin su çıkışıyla ilişkilendirilebilir.",
        wrong: [
          [
            "Bitki bir saatte kesin 8 g glikoz üretmiştir.",
            "Su kaybı ölçümü glikoz üretim kütlesini doğrudan vermez.",
          ],
          [
            "Kayıp yalnız hidatottan olmuştur; stoma bilgisi gerekmez.",
            "Toplam kayıp çıkış yolunu tek başına ayırmaz.",
          ],
          [
            "Bitkinin bütün stomalarının sayısı kesin 8’dir.",
            "Gram cinsinden kütle kaybından stoma sayısı elde edilemez.",
          ],
          [
            "Örtü kökün bütün su alımını anında durdurmuştur.",
            "Buharlaşmayı önleyen toprak örtüsü kök–su bağlantısının kesildiğini göstermez.",
          ],
        ],
        knowledge: [
          "Kontrol edilen kütle bilançosu toplam su kaybını verebilir; yol veya fotosentezi tek başına vermez.",
        ],
        strategy: "İhmal edilen katkıları toplam kütle bilançosundan ayır.",
        steps: [
          "Toprak buharlaşmasının örtüyle sınırlandığını belirle.",
          "Diğer kütle değişimlerinin ihmal edildiği koşulu kullan.",
          "8 g’ı bitki su kaybına bağla; çıkış yolunu ayrıca uydurma.",
        ],
        commonError: "Kütle kaybından fotosentez üretimini hesaplamak.",
        check:
          "Sonuç yalnız ölçülen su kaybı miktarını söylüyor; yol ve şeker miktarı eklemiyor.",
      },
      {
        prompt:
          "Çiçekli bir bitkinin iletim dokusunda çekirdeksiz fakat canlı kalburlu boru elemanları ve onlarla ilişkili çekirdekli arkadaş hücreleri görülüyor. Hangi yorum doğrudur?",
        correct:
          "Bu yapı floemle uyumludur; çekirdeksiz olmak tek başına ölü olmak değildir.",
        reason:
          "Olgun kalburlu boru elemanları canlı kalırken çekirdeklerini yitirir ve arkadaş hücrelerinin desteğiyle işlev görür.",
        wrong: [
          [
            "Çekirdeksiz bütün hücreler ölüdür; bu nedenle verilen canlılık olanaksızdır.",
            "Olgun kalburlu boru elemanları bu genellemenin karşı örneğidir.",
          ],
          [
            "Arkadaş hücreleri ksilemin ölü trake boşluklarında fotosentez yapar.",
            "Verilen eşleşme kalburlu boru–arkadaş hücresi yani floem yapısıdır.",
          ],
          [
            "Kalburlu borular yalnız havadaki CO₂’yi köke iletir.",
            "Floem esas olarak çözeltideki organik madde dağıtımında rol alır; gaz borusu değildir.",
          ],
          [
            "Bu doku bütün hücreleri ligninli ve ölü primer ksilem olmak zorundadır.",
            "Canlı kalburlu eleman ve arkadaş hücresi verileriyle çelişir.",
          ],
        ],
        knowledge: [
          "Kalburlu boru ve arkadaş hücresi floemin farklılaşmış canlı elemanlarıdır.",
        ],
        strategy:
          "Çekirdek varlığını canlılıkla otomatik eşitlemeden doku çiftini tanı.",
        steps: [
          "Kalburlu boru elemanı ile arkadaş hücresini iki ayrı hücre tipi olarak kaydet.",
          "Çekirdeksiz fakat canlı koşulunu koru.",
          "Floem eşleştirmesini ölü ksilem iddiasından ayır.",
        ],
        commonError:
          "Çekirdek yokluğunu bütün hücre tiplerinde ölümle eşitlemek.",
        check: "Seçenek hem canlılık hem arkadaş hücresi bilgisini açıklıyor.",
      },
      {
        prompt:
          "Olgun bir yaprak net şeker dışa veriyor; onun üstündeki yeni sürgün ve altındaki kök şeker alıyor. Bu dönemin kaynak–havuz haritası hangisidir?",
        correct: "Olgun yaprak kaynak; yeni sürgün ve kök havuzdur.",
        reason:
          "Roller konuma değil, o dönemde organik maddeyi dışa verme veya alma durumuna göre belirlenir.",
        wrong: [
          [
            "Yalnız üstteki organ kaynak olabilir; yeni sürgün kaynaktır.",
            "Üstte bulunmak kaynak ölçütü değildir; sürgünün şeker aldığı verilmiştir.",
          ],
          [
            "Kök her zaman kaynaktır; yaprak her zaman havuzdur.",
            "Bu deneyde dışa veren yaprak, alan köktür; kalıcı organ etiketleri kullanılamaz.",
          ],
          [
            "Yaprak kaynaksa köke floemle hiçbir organik madde gidemez.",
            "Kaynak yapraktan kök havuzuna organik madde taşınabilir.",
          ],
          [
            "İki havuz bulunduğu için aynı boruda aynı anda zıt akış zorunludur.",
            "Farklı havuzlar ayrı floem yollarıyla beslenebilir; aynı boruda karşı akış sonucu çıkmaz.",
          ],
        ],
        knowledge: [
          "Kaynak ve havuz organın anlık net organik madde verme/alma rolünü anlatır.",
        ],
        strategy: "Üç organı verilen net madde alışverişine göre işaretle.",
        steps: [
          "Yaprağın net dışa verdiği şekeri kaynak ölçütü olarak al.",
          "Sürgün ve kökün aldığını iki havuz olarak belirle.",
          "Üst-alt konumunu rol ölçütü yerine koymayan seçeneği seç.",
        ],
        commonError: "Kaynak–havuz rolünü organ yüksekliğine sabitlemek.",
        check: "Üç organın rolü de verilen net alışverişle uyumlu.",
      },
      {
        prompt:
          "Başlangıçta net şeker alan bir genç yaprak birkaç hafta sonra ürettiğinden daha azını tüketip net şeker dışa vermeye başlıyor. Hangi değişim doğrudur?",
        correct: "Genç yaprak havuz rolünden kaynak rolüne geçmiştir.",
        reason:
          "Rol değişimi başlangıçta net alımdan sonra net dışa verime geçişle belirlenir.",
        wrong: [
          [
            "Yaprak olduğu için başlangıçtan itibaren zorunlu kaynaktır.",
            "Organ adı, başlangıçta net şeker aldığı verisini geçersiz kılmaz.",
          ],
          [
            "Şeker dışa verme başladığında iletim dokusu yok olur.",
            "Net dışa verim iletim dokusunun yokluğunu göstermez.",
          ],
          [
            "Kaynak–havuz rolü yaşam boyunca hiçbir organda değişemez.",
            "Verilen gelişim süreci doğrudan rol değişimine örnektir.",
          ],
          [
            "Havuzdan kaynağa geçiş bitkinin artık solunum yapmadığını kanıtlar.",
            "Net şeker fazlası solunumun sıfır olduğu anlamına gelmez.",
          ],
        ],
        knowledge: [
          "Net organik madde dengesi gelişim boyunca kaynak–havuz rolünü değiştirebilir.",
        ],
        strategy: "Önce ve sonraki net şeker bilançosunu iki satırda oku.",
        steps: [
          "Başlangıç net alımı havuzla eşleştir.",
          "Sonraki net dışa vermeyi kaynakla eşleştir.",
          "Değişimi gelişimsel rol değişimi olarak adlandır.",
        ],
        commonError:
          "Yeşil yaprağı yaştan ve bilançosundan bağımsız sürekli kaynak saymak.",
        check: "Başlangıçtaki alım ve sonraki dışa verme birlikte açıklanıyor.",
      },
      {
        prompt:
          "Kaynak yaprakta sakkaroz floeme yüklendikten sonra suyun floeme girişi artıyor. Basınç akış açıklamasında bir sonraki bağlantı hangisidir?",
        correct:
          "Su girişi kaynak ucundaki turgor basıncını yükselterek düşük basınçlı havuza kütlesel akışı destekler.",
        reason:
          "Yükleme çözünen durumunu, su girişi basıncı, basınç farkı ise boru içi kütlesel akışı etkiler.",
        wrong: [
          [
            "Su girişi basıncı her koşulda sıfırlar ve akış oluşamaz.",
            "Verilen kaynak yükleme bağlamında su girişi turgoru yükseltebilir.",
          ],
          [
            "Sakkaroz bütün boru boyunca yalnız ATP pompalarıyla tek tek taşınır.",
            "Boru içindeki kütlesel akış basınç farkıyla açıklanır; yükleme mekanizmasıyla karıştırılmaz.",
          ],
          [
            "Floeme su girerse şekerin karbon atomları zorunlu olarak minerale dönüşür.",
            "Su girişinin böyle bir kimyasal dönüşüm zorunluluğu yoktur.",
          ],
          [
            "Basınç farkı yalnız ksilemde etkilidir, floemde etkisizdir.",
            "Floem için basınç akış teorisinin merkezinde basınç farkı vardır.",
          ],
        ],
        knowledge: [
          "Floem yükleme → su girişi → kaynak basıncı → kütlesel akış zinciriyle açıklanır.",
        ],
        strategy: "Sakkaroz ve su değişiminden borunun basınç farkına geç.",
        steps: [
          "Yüklemeyle kaynak floeminin çözünen durumunun değiştiğini al.",
          "Verilen su girişini artan turgorla ilişkilendir.",
          "Kaynak–havuz basınç farkının sıvıyı birlikte ilerletmesini seç.",
        ],
        commonError:
          "Yükleme enerjisini borudaki kütlesel akışın doğrudan pompası saymak.",
        check:
          "Yanıt şeker yüklemesi, su girişi ve basınç farkını aynı sırayla bağlıyor.",
      },
      {
        prompt:
          "Bir kaynak yapraktan köke doğru A floem yolunda, üstteki meyveye doğru B floem yolunda eş zamanlı organik madde taşınıyor. Hangi sonuç çıkar?",
        correct:
          "Floem sistemi farklı yollarda yukarı ve aşağı taşıyabilir; aynı boruda eş zamanlı zıt kütlesel akış kanıtlanmış değildir.",
        reason:
          "İki ayrı yolun farklı yönleri sistem düzeyinde çift yönlülük gösterir; tek boruda karşı akış sonucu vermez.",
        wrong: [
          [
            "Her iki yolun da ksilem olması zorunludur; floem yalnız aşağı taşır.",
            "Floemde havuzun konumuna göre yukarı veya aşağı farklı yollar bulunabilir.",
          ],
          [
            "A ve B farklı yol olsa da aynı boruda zorunlu karşı akış vardır.",
            "Verilen ayrı bağlantılar tek borunun aynı anda iki yön taşıdığını göstermez.",
          ],
          [
            "Meyve üstteyse organik madde alamaz.",
            "Uygun kaynak–havuz ve basınç bağlantısı üstteki havuza taşımayı destekler.",
          ],
          [
            "Kök organik madde aldığı için fotosentez hızı kesin sıfırdır.",
            "Organik madde alımı bütün organın her metabolik etkinliğini nicel belirlemez.",
          ],
        ],
        knowledge: [
          "Sistem düzeyindeki çift yönlülük ile tek borudaki net yön farklıdır.",
        ],
        strategy: "Yol sayısı ile yön sayısını ayrı kaydet.",
        steps: [
          "A ve B’nin ayrı floem yolları olduğunu belirle.",
          "A’da aşağı, B’de yukarı organik madde hareketini işaretle.",
          "Sistem çift yönlülüğünü seçip tek boruda karşı akış iddiasını dışla.",
        ],
        commonError: "İki ayrı yolu aynı kalburlu boru sanmak.",
        check: "Seçenek hem iki yol ayrımını hem iki farklı yönü koruyor.",
      },
      {
        prompt:
          "Yalnız floem çevre boyunca çıkarılmış, ksilem sağlam bırakılmış bir gövdede kaynak yapraklar kesinin üstünde, kökler altındadır. İlk birkaç saatte hangi sonuç doğrudan beklenir?",
        correct:
          "Yapraktan köke organik madde akışı kesilebilir; ksilem su yolu ilk anda doğrudan kesilmiş sayılmaz.",
        reason:
          "Dokuya özgü erken etki floem bağlantısının kaybıdır; sağlam ksilemin fiziksel yolu korunmuştur.",
        wrong: [
          [
            "Kök ve yaprak bütün hücreleri aynı anda zorunlu ölür.",
            "Erken floem kesintisi bütün hücrelerin anlık ölümü sonucunu vermez.",
          ],
          [
            "Ksilem sağlam olsa da su yolu fiziksel olarak kesin kesilmiştir.",
            "Deney özellikle ksilemin sağlam kaldığını belirtir.",
          ],
          [
            "Kök aşağıda olduğu için organik madde artık doğrudan havadan alınır.",
            "Kök organik karbon gereksinimi böyle otomatik bir yolla karşılanmaz.",
          ],
          [
            "Kesinin üstünde şeker birikmesi hiçbir koşulda gerçekleşemez.",
            "Aşağı taşımanın engellenmesi üst tarafta birikmeye yol açabilir.",
          ],
        ],
        knowledge: [
          "Halka çıkarma deneyinde kesilen doku ve zaman dilimi birlikte yorumlanır.",
        ],
        strategy: "İlk etkiyi yalnız hasar verilen bağlantıya bağla.",
        steps: [
          "Floem kesisi ile ksilem sağlamlığını ayrı yaz.",
          "Üst kaynaktan alt köke organik madde yolunu kesilmiş işaretle.",
          "Erken su yolunun doğrudan kesilmediği yanıtı seç.",
        ],
        commonError:
          "Geç dönemdeki kök bozulmasını ilk birkaç saatin doğrudan sonucu saymak.",
        check:
          "Yanıt ilk saat kapsamını ve ksilem sağlamlığı koşulunu değiştirmiyor.",
      },
      {
        prompt:
          "Bir yaprağa işaretli karbon içeren CO₂ veriliyor. İşaret önce yaprak şekerinde, sonra gövde floeminde, daha sonra kök nişastasında görülüyor. Hangi sıra bu gözlemlerle uyumludur?",
        correct:
          "Karbonun fotosentez ürününe katılması → floemle dağılım → kökte nişastaya katılma.",
        reason:
          "İşaretli karbon organik maddeye katılıp kaynak–havuz yoluyla taşınabilir ve depoda farklı moleküle girebilir.",
        wrong: [
          [
            "CO₂’nin su molekülündeki karbona dönüşmesi → ksilem → nişasta.",
            "Su molekülünde karbon yoktur; verilen iz floemde ve organik maddelerdedir.",
          ],
          [
            "Kökte nişasta sentezi → yaprak CO₂ alımı → işaretin ilk kez floeme girişi.",
            "Verilen zaman sırası yaprak şekerinden başlayıp floeme ve köke gider.",
          ],
          [
            "İşaretin floemde bulunması bütün taşınmanın gaz hâlinde olduğunu gösterir.",
            "Karbon atomu organik moleküllere katılmış olabilir; atom izi gaz hâlini korumaz.",
          ],
          [
            "Kökteki nişastanın tamamı molekül yapısı değişmeden yapraktan taşınmıştır.",
            "Nişastadaki işaret, taşınan karbonun kökte nişasta sentezine katılmasına uygundur.",
          ],
        ],
        knowledge: [
          "İşaretli atomun izlenmesi, bütün molekülün süreç boyunca değişmeden kaldığını göstermez.",
        ],
        strategy: "Zaman sırasını karbonun kimyasal biçimiyle birlikte oku.",
        steps: [
          "İlk işareti yaprak şekerindeki fotosentetik karbon katılımına bağla.",
          "Sonraki floem sinyalini organik madde dağılımına yerleştir.",
          "Kök nişastasını havuzda dönüşüm/depolama basamağı olarak seç.",
        ],
        commonError:
          "İşaretli karbonun her aşamada CO₂ veya değişmemiş nişasta olarak kaldığını sanmak.",
        check:
          "Seçtiğin sıra yaprak şekeri, floem ve kök nişastası gözlem sırasını koruyor.",
      },
      {
        prompt:
          "Sağlam seçili ksilem yolunda A toplam Ψ = −0,4, B toplam Ψ = −1,2 MPa ve G = 3 veriliyor. Q = G(ΨA−ΨB), pozitif Q A→B yönüdür. Sonuç hangisidir?",
        correct: "Q = +2,4 öğretim birimi; A→B yönü.",
        reason: "Fark −0,4−(−1,2) = +0,8; 3 × 0,8 = +2,4 hesaplanır.",
        wrong: [
          [
            "Q = −2,4; B→A yönü.",
            "İki negatif değerin çıkarılmasında işaret ters alınmıştır.",
          ],
          [
            "Q = +4,8; A→B yönü.",
            "Toplamın mutlak değeri değil farkın değeri +0,8 kullanılmalıdır.",
          ],
          [
            "Q = 0; iki Ψ de negatif olduğundan akış olamaz.",
            "Negatif değerlerde de fark vardır; −0,4 daha yüksektir.",
          ],
          [
            "Q = +2,4 mL/s; gerçek bitki hızı kesin ölçülmüştür.",
            "Model öğretim birimi verir; gerçek mL/s ölçümü veya kalibrasyonu verilmemiştir.",
          ],
        ],
        knowledge: [
          "Q = G × uç farkı modelinde işaret yönü, mutlak değer büyüklüğü gösterir.",
        ],
        strategy:
          "Önce parantezli farkı, sonra pozitif iletkenlikle çarpımı bul.",
        steps: [
          "−0,4−(−1,2) = +0,8 hesapla.",
          "3 ile çarpıp +2,4 elde et.",
          "Pozitifi A→B olarak oku ve öğretim birimini koru.",
        ],
        commonError: "Negatif su potansiyelinin akışı engellediğini sanmak.",
        check: "Hem yön hem sayı hem de öğretim birimi doğru tutuldu.",
      },
      {
        prompt:
          "Sağlam seçili floem yolunda PA = 1,1, PB = 0,5; G = 5. Model Q = G(PA−PB). Daha sonra yalnız seçili bağlantı bütünüyle kesiliyor. Diğer değerler ilk anda aynı. İki Q değeri hangisidir?",
        correct: "Önce +3,0; bağlantı kesilince bu yol için 0.",
        reason:
          "İlk fark 0,6 ve akış 5×0,6 = 3,0’dır; modelde kesilen yol iletmez.",
        wrong: [
          [
            "Önce 0; kesilince +3,0.",
            "Sağlam yol ve pozitif fark başlangıçta akış verir; kesmek yolu açmaz.",
          ],
          [
            "Önce +8,0; kesilince +8,0.",
            "Basınçların toplamı değil farkı kullanılır; kesilen yol aynı akışı korumaz.",
          ],
          [
            "Önce +3,0; kesilince bütün bitkinin bütün yolları zorunlu sıfır.",
            "Kesinti yalnız seçili bağlantı içindir; başka yolların durumu verilmemiştir.",
          ],
          [
            "Önce −3,0; kesilince −3,0.",
            "Başlangıç farkının işareti pozitiftir; ayrıca kesinti bu yolun akışını sıfırlar.",
          ],
        ],
        knowledge: [
          "Seçili yolun iletimi hem fark hem yol bütünlüğüne bağlıdır.",
        ],
        strategy: "Aynı basınçlarda sağlam ve kopuk yol için ayrı sonuç bul.",
        steps: [
          "1,1−0,5 = 0,6 farkını hesapla.",
          "Sağlamken 5×0,6 = +3,0 bul.",
          "Kopuk model yolunu sıfır al; sonucu bütün bitkiye genişletme.",
        ],
        commonError:
          "Tek bağlantı kesintisini bütün iletim sisteminin kesin durması saymak.",
        check:
          "İlk akışın hesabı ve ikinci sonucun yalnız seçili yol kapsamı korunuyor.",
      },
      {
        prompt:
          "Seçili sağlam boru modelinde G pozitiftir ve A ile B uçlarının itici değerleri eşittir. Başka pompa veya ek fark temsil edilmiyor. Hangi sonuç zorunludur?",
        correct:
          "Modelde net Q sıfırdır; bu, sıvı moleküllerinin hiçbir hareket yapmadığı anlamına gelmez.",
        reason:
          "Q = G×0 = 0 net kütlesel akış verir; mikroskobik hareketle net akış ayrı kavramlardır.",
        wrong: [
          [
            "G pozitifse eşit uçlarda da zorunlu A→B akış vardır.",
            "İletkenlik tek başına yön vermez; temsil edilen fark sıfırdır.",
          ],
          [
            "Q sıfırsa bağlantı kesin kopuktur.",
            "Sağlam yol ve eşit uçlar da sıfır net akış üretebilir.",
          ],
          [
            "Q sıfırsa bütün moleküller kimyasal olarak yok olmuştur.",
            "Net akış sıfırı madde yokluğu anlamına gelmez.",
          ],
          [
            "Eşit uçlar her koşulda iki yönlü eşit olmayan net akış verir.",
            "Verilen modelde tek net sonuç sıfırdır; ek fark temsil edilmiyor.",
          ],
        ],
        knowledge: [
          "Net akışın sıfır olması moleküler hareketin veya madde varlığının yokluğu değildir.",
        ],
        strategy: "Formülde farkı sıfır yapıp kapsamı sınırla.",
        steps: [
          "Eşit uç değerleri için farkı 0 yaz.",
          "Pozitif G ile çarpıp net Q = 0 bul.",
          "Sıfırın net taşınım olduğunu, bağlantı kopukluğu veya madde yokluğu olmadığını seç.",
        ],
        commonError: "Net akış sıfırını boruda su bulunmamasıyla eşitlemek.",
        check:
          "Yanıt yalnız temsil edilen farkın sıfırına dayanıyor; ek pompa varsaymıyor.",
      },
    ],
  },
  {
    id: "stoma-nodul-mikoriza",
    topic: "detail-350",
    title: "Stoma, nodül ve mikoriza: denetlenen geçit ve kök ortakları",
    minutes: 105,
    objectives: [
      "Stoma açıklığını iyon, su, turgor ve çeper düzeni sırasıyla açıkla.",
      "Rhizobium nodülü ile mantar mikorizasını ortak canlı ve madde alışverişi bakımından ayır.",
      "Işık, su stresi ve besin kısıtı deneylerini doğru kontrollerle yorumla.",
    ],
    source:
      "Aurelia YKS arşivindeki MEBİ AYT Biyoloji Konu Özetleri, suyun taşınmasında stomalar ve köklerde emilim; OGM Madde Taşınması I–III ve ilgili konu özetleri; Dersler Cepte Bitkilerin Yapısı karşılaştırılarak hazırlanmış özgün anlatım, şekiller ve sorular.",
    sections: [
      {
        title: "Üç yapıyı yer ve görevden ayır",
        paragraphs: [
          "Stoma yaprağın ya da genç yeşil gövdenin yüzeyindeki denetlenen gaz geçididir. Nodül bazı bitkilerin kökünde azot bağlayan bakterilerle gelişen yapıdır. Mikoriza bitki kökü ile mantar arasındaki ortaklıktır. Üçünün de bitkinin çevreyle madde ilişkisine katkı vermesi onları tek bir doku veya tek mekanizma yapmaz.",
          "Önkoşul olarak örtü dokuyu, kökte su–mineral alımını ve organik maddenin floemle dağılımını hatırla. Stomada bekçi hücreleri bitkiye aittir; nodül ve mikorizada bitkiden ayrı canlı ortaklar bulunur. Açıklamada önce yapının yerini, sonra kimlerin katıldığını ve hangi maddenin hangi tarafa geçtiğini yaz.",
        ],
      },
      {
        title: "Açıklık hücre değil, iki hücre arasındaki geçittir",
        paragraphs: [
          "Bir stoma sisteminde iki canlı bekçi hücresi aradaki açıklığı çevreler. Bekçi hücrelerinde çoğunlukla kloroplast ve çekirdek bulunur; açıklığın kendisi organel taşıyan bir hücre değildir. Komşu epidermis hücreleri de hücresel çevrenin parçasıdır. Şekilde yeşil renk görülen her alanı boşluk sanma.",
          "Böbrek biçimli bekçi hücreleri birçok geniş yapraklıda, halter benzeri tipler buğdaygillerde görülebilir. Mekanizmayı tek zorunlu şekle bağlamak yerine çeper mimarisiyle birlikte turgor değişimine bağla. Etkileşimdeki özgün böbrek biçimli çizim, verilmiş bir örneği gösterir; bütün türlerin ölçekli fotoğrafı değildir.",
        ],
      },
      {
        title: "İyon değişimi önce osmotik durumu etkiler",
        paragraphs: [
          "Açılmaya uygun bir koşulda zar pompaları ve kanalların etkinliği bekçi hücrelerinde K⁺ ve eş iyonlar gibi çözünenlerin artmasına katkı verebilir. Şeker ve organik çözünenler de sürece katılır. Artan çözünen miktarı uygun durumda hücrenin çözünen potansiyelini düşürür.",
          "Su potansiyeli farkı su girişini destekliyorsa bekçi hücrelerine su osmozla geçer. İyon taşımasının enerji bağlantısı, suyun doğrudan ATP pompasıyla taşınması demek değildir. Aşamalı modelde önce iyon olayı, sonra su olayı seçilir; ilk sinyali görür görmez açıklığın büyüdüğünü varsayma.",
        ],
      },
      {
        title: "Turgoru açıklığa çeper düzeni bağlar",
        paragraphs: [
          "Su girişi bekçi hücrelerinin turgorunu artırır. Çeper kalınlığı, selüloz mikrofibrillerinin yönelimi ve hücre geometrisi, şişmenin hangi şekle dönüştüğünü belirler. Uygun bekçi hücreleri bu düzenle birbirinden uzaklaşıp açıklığı genişletebilir. Hücre yalnız hacmi büyüyen eş esnek bir balon değildir.",
          "Kapanmaya uygun sinyalde iyon çıkışı ve su kaybı turgoru azaltabilir; açıklık daralır. Turgorun bir anlık ölçümü gerçek gözenek çapını tek başına vermez. Çeper ve komşu hücre koşulları da önemlidir. Modeldeki kapalı, dar ve açık aşamalar nicel çap ölçümü değil nedensel sırayı görünür kılan şemadır.",
        ],
      },
      {
        title: "Işığı koşuluyla birlikte kullan",
        paragraphs: [
          "Birçok gündüz etkin bitkide ışık açılmayı destekler; mezofilin CO₂ tüketimi, bekçi hücresi sinyalleri ve iç saat de etkilidir. Uygun su durumu ve diğer koşullar belirtilmeden ışıkta her stoma mutlaka tamamen açılır denemez. Birden fazla etken aynı hücreye sinyal verir.",
          "Su stresi sürerken güneşli bir günde kapanma gözlenebilir. CO₂’nin iç ve dış düzeyi ile türün özellikleri de yanıtı etkiler. Deneyde yalnız ışık değiştirilmişse ışığın o koşuldaki etkisini değerlendir; sonucu bütün sıcaklık, su ve türlere otomatik taşıma.",
        ],
      },
      {
        title: "ABA bir sinyal zincirine katılır",
        paragraphs: [
          "Absisik asit, su stresiyle ilişkili stoma kapanması yanıtında önemlidir. Sinyal yolları iyon kanallarını ve iyon hareketini etkiler; ardından su çıkışı, turgor azalması ve açıklığın daralması görülebilir. Mekanizmayı yalnız adındaki asit sözcüğüyle bütün dokunun asitleşmesine indirgeme.",
          "ABA’nın tek işi stoma kapanması değildir; hormonlar ünitesinde dormansi gibi bağlamlar ayrıca ele alınır. Burada verilen su stresi deneyinde neden–sonuç zincirini koru. ABA uygulamasıyla açıklığın azaldığını görmek, bitkinin bütün gaz alışverişinin veya kütikular su kaybının kesin sıfır olduğunu göstermez.",
        ],
      },
      {
        title: "Gece davranışında CAM örneğini tanı",
        paragraphs: [
          "Birçok türde gündüz daha açık, karanlıkta daha kapalı stoma örüntüsü görülür. CAM metabolizmalı bazı bitkilerde CO₂ alımı ağırlıkla geceye kaydırılmıştır; bu düzen su kaybını azaltmaya yardım eder. Gece sözcüğü tek başına her bitkide aynı açıklığı belirlemez.",
          "Modelde CAM-gece seçimi, açılmaya uygun verilen bir CAM örneğinin sırasını gösterir. Kuraklığın şiddeti ve başka koşullar yine önemlidir. İstisnayı öğrenmek çoğu türün gündüz örüntüsünü yok saymak değil, genellemenin kapsamını doğru yazmaktır.",
        ],
      },
      {
        title: "Su kaybı ve karbon alımı bir denge kurar",
        paragraphs: [
          "Açık stoma uygun derişim farkında CO₂ girişini desteklerken su buharı kaybı yolunu da açık tutar. Kapanma su tasarrufuna katkı sağlayabilir ama fotosentez için gaz alışverişini sınırlayabilir. Aynı açıklık değişiminin iki sonucu birbirinden kopuk değildir.",
          "Terleme yaprağı soğutmaya ve ksilem çekimine katkı verir; bu nedenle sıfır su kaybı her durumda en iyi büyüme koşulu diye düşünülmez. Kuraklıkta hangi avantajın öne çıktığı su durumu, ışık, sıcaklık ve türle ilişkilidir. Deney sonucu büyüme değil açıklık ölçtüyse büyüme miktarı için kesin sayı uydurma.",
        ],
      },
      {
        title: "Çevresel grafikte sabitleri ara",
        paragraphs: [
          "Hava nemi artınca, diğer koşullar aynıysa iç-dış buhar farkı azalabilir. Ilımlı rüzgâr yüzeydeki nemli tabakayı uzaklaştırabilir; aşırı rüzgâr veya su stresi kapanmayı tetikleyebilir. Sıcaklık artışının da tek ve sınırsız doğrusal etkisi yoktur.",
          "Stoma yoğunluğu, yaprak alanı, kütikula ve tüylenme gibi yapısal özellikler aynı anda değişiyorsa tek etkenli nedensellik çıkarma. Bir karşılaştırmada açıklığı sabit tutmakla stoma sayısını sabit tutmak farklı kontrollerdir. Grafik eksenlerini ve hangi değişkenin gerçekten ölçüldüğünü ilk adımda oku.",
        ],
      },
      {
        title: "Diğer yüzey yollarını stomadan ayır",
        paragraphs: [
          "Stoma bekçi hücreleriyle denetlenen gaz ve su buharı yoludur. Hidatot çoğunlukla yaprak uç/kenarında ksilem sıvısının gutasyonla çıkışına olanak verir. Lentisel peridermli yüzeyde gaz alışverişine katkı veren gevşek doku bölgesidir; aynı hızlı bekçi hücresi düzenine sahip değildir.",
          "Kütikula su kaybını sınırlar fakat bütün geçişi mutlak sıfırlayan bir duvar değildir. Stomanın kapanması yalnız onun temsil edilen yolunu sınırlar. Mineralli sıvı damlası, su buharı ve atmosferden yoğuşan çiy farklı köken/hâl kanıtlarıyla ayrılır; yalnız yaprak üzerinde su görmek yeterli değildir.",
        ],
      },
      {
        title: "Azot gazını doğrudan protein sayma",
        paragraphs: [
          "Havanın yaklaşık yüzde 78’i N₂’dir; bu bolluk bitkinin N₂’yi doğrudan amino asitlere katabildiği anlamına gelmez. Bitkiler azotu çoğunlukla nitrat ve amonyum gibi kullanılabilir biçimlerden sağlar. Biyolojik azot bağlama bazı prokaryotların N₂’yi indirgenmiş azot biçimine dönüştürmesidir.",
          "Azot bağlama, amonyumun nitrite ve nitrata yükseltgendiği nitrifikasyonla aynı işlem değildir. İki süreç azot döngüsünün farklı basamaklarıdır. Nodülde bakteri ortağının katkısını adlandırırken girdi N₂ ile ürünün kullanılabilir azot olduğunu birlikte yaz; yalnız azotu artırır demek mekanizmayı gizler.",
        ],
      },
      {
        title: "Nodülde bitki ve bakterinin katkısını iki okla çiz",
        paragraphs: [
          "Baklagil–Rhizobium örneğinde kökte nodül adı verilen ortaklık yapıları gelişebilir. Bakteri N₂ bağlayarak bitkinin azot beslenmesine katkı verir; bitki ise fotosentez kökenli organik karbon ve uygun yaşam ortamı sağlar. Nodül yalnız kökün besin depolayan bir şişkinliği değildir.",
          "Bakteri organik maddeyi bitkiye kloroplastıyla üretmez; Rhizobium bir bitki hücresi değildir. Ortakların kimliğini ve alışveriş yönünü ayır. Her kök şişkinliği de Rhizobium nodülü değildir; hastalık veya başka gelişim nedenleri olabilir. Azot bağlama kanıtı ortaklık tanısını güçlendirir.",
        ],
      },
      {
        title: "Azot bağlama enerji ve oksijen koşulları gerektirir",
        paragraphs: [
          "Biyolojik N₂ bağlama enerji gerektiren bir süreçtir. Nodüldeki uygun ortam, bakterinin solunumla enerji sağlayabilmesi ile azot bağlayan enzim sisteminin fazla O₂’den zarar görmesinin sınırlanması arasında bir denge kurar. Leghemoglobin gibi bileşenler O₂ durumunun düzenlenmesine katkı verir.",
          "Bu yüzden ortamda ne kadar çok O₂ varsa o kadar sınırsız azot bağlanır denemez; tamamen enerji üretilemeyen bir durum da yararlı değildir. Öğretim düzeyinde temel sonuç, nodül işlevinin yalnız bakterinin orada bulunmasına bağlı olmadığıdır. Tür uyumu, karbon desteği ve çevre koşulları gerekir.",
        ],
      },
      {
        title: "Mikorizada hifi kök tüyü sanma",
        paragraphs: [
          "Mikoriza, bitki kökü ve mantarın ortaklığıdır. Mantar hifleri toprağa uzanarak özellikle fosfat ve uygun koşullarda su gibi kaynakların edinimine katkı verebilir. Hif, bitkinin epidermis uzantısı olan emici tüyden farklı canlıya ait bir yapıdır; bağlantılar aynı kaynak alanına uzanabilir.",
          "Bitki mantara organik karbon sağlar. Mantar fotosentezle şeker üretip bu ortaklığa o yoldan katılıyor değildir. Nodülle ortak yön karbon alışverişi ve olası karşılıklı yarardır; farklı yön mantarın başlıca temsil edilen toprak kaynağı katkısıdır. Mantara otomatik Rhizobium’un N₂ bağlama işini yükleme.",
        ],
      },
      {
        title: "Mikoriza tiplerini tek dış kılıfa indirgeme",
        paragraphs: [
          "Ektomikorizada kök dışını saran mantar kılıfı ve hücreler arası bağlantılar bulunabilir. Arbusküler endomikorizada mantar yapıları kök korteks hücrelerinin içinde gelişir; bitki zarı ortaklık arayüzünü çevreler. Hücre içine uzanma, mantarın bitki sitoplazmasıyla bütünüyle karışması demek değildir.",
          "Bu iki örnek bütün mikoriza çeşitlerini bitirmez ama dıştan sarar cümlesinin her mikoriza için yeterli olmadığını gösterir. Model kök–mantar arayüzü ve alışveriş yönünü şematik gösterir; gerçek türlerin tam anatomisini tek şekle sıkıştırmaz. Ortaklık varlığıyla işlev ölçümünü de ayrı değerlendir.",
        ],
      },
      {
        title: "Karşılıklı yarar koşula bağlıdır",
        paragraphs: [
          "Su veya fosfat kıtlığında mantarın ek erişim alanı bitkiye büyük katkı sağlayabilir; bitki de bunun için karbon ayırır. Mineralin bol olduğu başka bir koşulda net büyüme yararı aynı olmayabilir. Mutualizm sözcüğü her ortamda aynı büyüme yüzdesi garanti etmez.",
          "Benzer biçimde nodül katkısı azot sınırlaması ve işlevsel bakteri uyumuna bağlıdır. Ortaklı bitki daha büyük bulunduğunda ışık ve genotip gibi değişkenler denetlenmeden nedeni yalnız ortaklığa yükleme. Yapılan ölçüm kuru kütle, alınan P veya bağlanan N₂ ise bunları birbirinin yerine yazma.",
        ],
      },
      {
        title: "Deneyi ortak ve mineral kurtarmasıyla kur",
        paragraphs: [
          "Aynı genotip ve koşullarda ortak eklenmeyen kontrol, Rhizobium eklenen grup, mantar eklenen grup ve her ikisinin bulunduğu grup karşılaştırılabilir. Azotça veya fosfatça kısıtlı ortamları ayrı kullanmak katkıları ayırmaya yardım eder. Her grup eşit ışık, su ve başlangıç büyüklüğüyle başlamalıdır.",
          "Azot eksik ortamda mineral azot eklenmesiyle düzelme, fosfat eksik ortamda fosfat eklenmesiyle düzelme özgül kısıtı sınar. Ortak eklemekle mineral eklemek aynı uygulama değildir; ancak uygun kurtarma kontrolü mekanizmayı destekleyebilir. Her iki ortak var diye sonuçların basitçe toplanacağını varsayma.",
        ],
      },
      {
        title: "Kanıttan ilişki çiz, ölçülmeyeni ekleme",
        paragraphs: [
          "Bir izleme deneyinde bakteriden bitkiye kullanılan azot, topraktan hif üzerinden bitkiye P ve bitkiden ortağa organik karbon oklarını ayrı çiz. Karbon okunun ters olması mantarın veya bakterinin fotosentetik kaynak olduğu anlamına gelmez. İzlenen maddenin kimliğini her basamakta koru.",
          "Stoma modeli zaman basamaklarında hücresel sıra; ortaklık modeli madde alışverişi yolları gösterir. İkisini aynı renk değişen kart düzenine indirmeden mekanizmayı kendi yapısında sorgula. Son açıklamanda hangi yolun gösterildiğini, hangi koşulda işlediğini ve neyin henüz ölçülmediğini açıkça söyle.",
        ],
      },
    ],
    examples: [
      {
        title: "Sinyalden şekle hemen sıçrama",
        prompt:
          "Uygun su koşulundaki gündüz etkin bir türde ışık veriliyor. Önce bekçi hücresi iyon alımı, sonra su girişi, sonra açıklık artışı ölçülüyor. Sırayı mekanizmayla açıkla.",
        strategy:
          "Ölçülen üç olayı çözünen, turgor ve çeper üzerinden birleştir.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "İyon alımının hücrenin çözünen durumunu değiştirdiğini belirle.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Uygun Ψ farkında suyun girmesiyle turgorun arttığını bağla.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Çeper düzeni turgor değişimini açıklık artışına çevirir; ilk ışık anını son çapla eşitleme.",
          },
        ],
        answer: "İyon artışı → su girişi → turgor artışı → açıklık artışı.",
        check: "Zar taşınmasıyla suyun osmozunu ayrı söyledin mi?",
        pitfall: "Işığın fiziksel deliği tek adımda açtığını söylemek.",
      },
      {
        title: "Açıklık azalması neyi kanıtlar?",
        prompt:
          "Aynı bitkinin iki eş yaprağından birine ABA, diğerine çözücü veriliyor. ABA grubunda ortalama açıklık 7’den 2 şematik birime düşüyor. Ölçüm yalnız stoma açıklığıdır. Hangi sonuç güçlü, hangisi erken?",
        strategy: "Ölçülen yanıtı ve ölçülmeyen toplam kaybı ayır.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Çözücü kontrolüne göre ABA’nın bu koşulda kapanmayı desteklediğini belirt.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "İyon–su–turgor zincirinin bu yanıtla uyumlu olduğunu kur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Toplam terleme veya büyüme ölçülmediği için kesin sıfır su kaybı ve büyüme sayısı çıkarma.",
          },
        ],
        answer:
          "Bu koşulda ABA kapanmayı destekler; bütün su kaybının sıfırı ölçülmemiştir.",
        check: "Son cümlen ölçülen açıklıkla sınırlı mı?",
        pitfall: "Açıklık ölçümünü bütün bitkinin su bilançosu sanmak.",
      },
      {
        title: "Azot katkısını kurtarma kontrolüyle ayır",
        prompt:
          "Azotça kısıtlı steril ortamda kontrol bitkileri 1,8 g, işlevli Rhizobium eklenenler 3,2 g, mineral azot eklenenler 3,3 g kuru kütleye ulaşıyor. Diğer koşullar eş. Ne desteklenir?",
        strategy:
          "Ortak uygulamasıyla azot eklemesinin benzer yönde kısıtı azaltmasını karşılaştır.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Kontrolün azot kısıtı altında düşük kütle verdiğini al.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Bakteri ve mineral azot gruplarının artışını N katkısıyla uyumlu gör.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Bu tablo bakterinin bütün ortamlarda aynı yararı veya kesin bağladığı N miktarını vermez.",
          },
        ],
        answer: "Rhizobium’un bu azot kısıtını azaltmasıyla uyumlu kanıt.",
        check: "Kuru kütleyi doğrudan bağlanan azot gramı diye yazmadın mı?",
        pitfall: "Kütle farkını aynı miktarda N₂ bağlandı sonucu sanmak.",
      },
      {
        title: "Mantar yolunu atomun kimliğiyle izle",
        prompt:
          "Kökün erişemediği dar bir bölmeye işaretli fosfat konuyor; hifler bu bölmeye ulaşabiliyor. Mantar bulunan bitkide işaret P bitki dokusunda, mantarsız kontrolde ise yok. Nasıl açıklarsın?",
        strategy:
          "Erişim yolunu ve işaretli kaynağın kimliğini birlikte kullan.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Kökün doğrudan erişemediği, hiflerin eriştiği yolu belirle.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Mantar grubundaki işaretli P’yi hif–kök arayüzünden taşınma kanıtıyla bağla.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Kontrol, işaretin bitkiye başka yoldan geçişi açıklamasını zayıflatır; N₂ bağlama sonucu çıkmaz.",
          },
        ],
        answer: "Mikoriza üzerinden P edinimiyle uyumlu.",
        check: "İzlenen elementin P olduğunu bütün açıklamada korudun mu?",
        pitfall: "P taşınmasını atmosferik azot bağlama diye adlandırmak.",
      },
      {
        title: "Gece fotoğrafını tür koşuluyla oku",
        prompt:
          "Aynı su koşulunda gece ölçülen X türünün stomaları daha açık, Y türünün daha kapalı. X’in CAM metabolizmalı olduğu verilmiştir. Çelişki var mı?",
        strategy: "Genellemeyi türün metabolik koşuluyla sınırla.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "X için CAM’de gece CO₂ alımıyla uyumlu açıklığı belirle.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Y’nin gündüz etkin tür örüntüsüyle kapanabileceğini ayır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Bütün bitkiler gece kapanır iddiası yerine iki verilen türü kendi koşulunda açıkla.",
          },
        ],
        answer: "Çelişki yok; türlerin gece programları farklı olabilir.",
        check: "X’in CAM verisini görmezden gelmedin mi?",
        pitfall: "Gece saatini tek başına bütün türler için sonuç saymak.",
      },
      {
        title: "İki kaynak kısıtını ayrı oranla gör",
        prompt:
          "Hedef büyüme için N 15, P 5 birim gerekiyor; başlangıçta N 9, P 2 birim sağlanıyor. Bu yalnız yeterlilik modelinde ortaklık N’yi 15’e çıkarıyor fakat P’yi değiştirmiyor. İlk ve sonraki kısıtı karşılaştır.",
        strategy: "N ve P oranlarını iki durumda hesapla.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "Başlangıç N 9/15 = 0,6; P 2/5 = 0,4 bulunur.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "N katkısı sonrası N 1,0 olur ama P 0,4 kalır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "En küçük oran iki durumda da P’dir; N artışı tek başına hedefi tamamlamaz.",
          },
        ],
        answer: "Başlangıç ve sonda P sınırlayıcı.",
        check:
          "Bir kaynağın artmasını bütün kısıtların giderilmesi sanmadın mı?",
        pitfall:
          "Yararlı ortak varlığının her koşulda hedef büyümeyi garanti ettiğini düşünmek.",
      },
    ],
    recall: [
      {
        prompt:
          "Bekçi hücresinin açıklığı artırmasına giden dört ana basamak nedir?",
        answer:
          "Uygun sinyal ve iyon/çözünen değişimi → su girişi → turgor artışı → çeper mimarisine bağlı şekil ve açıklık artışı.",
      },
      {
        prompt: "Stoma kapanınca hangi su kaybı sonucu otomatik çıkmaz?",
        answer:
          "Bütün su kaybının kesin sıfırı çıkmaz; kütikula ve diğer yollar ayrıca vardır.",
      },
      {
        prompt: "Rhizobium ve bitkinin alışverişini iki yönde çiz.",
        answer:
          "Bakteri N₂’yi kullanılabilir azota dönüştürerek bitkiye katkı verir; bitki fotosentez kökenli organik karbon ve uygun ortam sağlar.",
      },
      {
        prompt: "Mikoriza hifi ile emici tüyün canlı kökeni nasıl ayrılır?",
        answer:
          "Hif mantara aittir; emici tüy bitkinin epidermis hücresi uzantısıdır.",
      },
      {
        prompt:
          "Azot bağlama ve nitrifikasyon arasındaki girdi–çıktı farkı nedir?",
        answer:
          "Azot bağlamada N₂ indirgenmiş kullanılabilir azota; nitrifikasyonda amonyum nitrit/nitrata dönüştürülür.",
      },
      {
        prompt:
          "Ortaklı bitkinin daha büyük olması hangi kontrolleri gerektirir?",
        answer:
          "Aynı genotip, başlangıç büyüklüğü, su, ışık ve mineral koşulları; ortak bulunmayan ve uygun mineral kurtarma grupları gerekir.",
      },
    ],
    items: [
      {
        prompt:
          "Bir yaprak yüzeyinde iki canlı, kloroplastlı bekçi hücresinin ortasında gaz geçişine açık bir boşluk görülüyor. Yapı için hangi ifade doğrudur?",
        correct:
          "Kloroplastlar bekçi hücrelerindedir; aradaki açıklık bir hücre değildir.",
        reason:
          "Stoma açıklığı iki hücre arasındaki geçittir; hücresel organeller bekçi hücrelerine aittir.",
        wrong: [
          [
            "Açıklığın içinde ayrı bir çekirdek ve kloroplast bulunması zorunludur.",
            "Açıklık bir hücre olmadığından organel taşımaz.",
          ],
          [
            "Kloroplast görüldüğü için bütün epidermis hücreleri aynı sayıda kloroplast taşır.",
            "Bekçi hücresi özelleşmesi bütün epidermis için eşit organel sonucu vermez.",
          ],
          [
            "İki bekçi hücresi bulunması yapının kök emici tüyü olduğunu gösterir.",
            "Emici tüy bir epidermis hücresi uzantısıdır; iki hücreli gözenek sistemi değildir.",
          ],
          [
            "Gaz geçişi görülmesi bu hücrelerin ölü olmasını gerektirir.",
            "Bekçi hücreleri açıklığı denetleyen canlı hücrelerdir.",
          ],
        ],
        knowledge: ["Stoma hücreleri ile stoma açıklığı ayrı yapılardır."],
        strategy: "Şekilde organel taşıyan yapıyı boşluktan ayır.",
        steps: [
          "İki bekçi hücresini canlı birimler olarak işaretle.",
          "Aradaki alanı gaz geçiş boşluğu olarak belirle.",
          "Organelleri boşluğa değil hücrelere bağlayan seçeneği seç.",
        ],
        commonError: "Boşluk ile onu çevreleyen hücreyi tek yapı saymak.",
        check: "Yanıt hem iki hücreyi hem hücre olmayan açıklığı koruyor.",
      },
      {
        prompt:
          "Su yeterli bir türde açılmaya uygun sinyalden sonra şu olaylar bekleniyor: I bekçi hücresine su girişi, II iyon/çözünen artışı, III turgor artışı, IV çeper düzeniyle açıklık genişlemesi. Nedensel sıra hangisidir?",
        correct: "II → I → III → IV",
        reason:
          "Çözünen değişimi uygun su farkını oluşturur; su girişi turgoru, turgor çeper düzeniyle açıklığı etkiler.",
        wrong: [
          [
            "I → IV → II → III",
            "Açıklık artışı turgor ve uygun çeper yanıtından önce konmuştur.",
          ],
          [
            "IV → III → I → II",
            "Son mekanik yanıt başlangıca alınarak nedensel sıra ters çevrilmiştir.",
          ],
          [
            "II → IV → I → III",
            "Çözünen artışından su ve turgor basamakları olmadan açıklığa sıçranmıştır.",
          ],
          [
            "III → II → IV → I",
            "Turgor artışı su girişinden önce ve açıklık su girişinden önce konmuştur.",
          ],
        ],
        knowledge: [
          "İyon–su–turgor–çeper ilişkisi açılmanın aşamalı açıklamasıdır.",
        ],
        strategy: "Önce osmotik değişimi, sonra mekanik yanıtı sırala.",
        steps: [
          "Çözünen artışını II ile başlat.",
          "Su girişini I, turgor artışını III olarak ardına koy.",
          "Son şekil yanıtını IV ile tamamla.",
        ],
        commonError: "Işık/iyon sinyalinden açıklığa ara basamaksız geçmek.",
        check:
          "Dört olayın hiçbiri kaybolmadan osmotik ve mekanik sıra korunuyor.",
      },
      {
        prompt:
          "Bekçi hücrelerinden iyon çıkışı artıyor; uygun su farkında hücrelerden su da çıkıyor. Tipik kapanma modeli için hangi devam beklenir?",
        correct: "Turgor azalır ve açıklık daralır.",
        reason:
          "Su kaybı bekçi hücresi turgorunu düşürerek uygun çeper geometrisinde kapanmayı destekler.",
        wrong: [
          [
            "Turgor zorunlu artar ve açıklık sürekli büyür.",
            "Su kaybı verilen koşulda turgor artışına değil azalışına bağlanır.",
          ],
          [
            "İyon çıkışı hücreyi anında ksilem borusuna dönüştürür.",
            "İyon hareketi doku kimliğinin böyle bir dönüşümü değildir.",
          ],
          [
            "Su çıkarsa çeper mimarisi artık hiçbir rol oynayamaz.",
            "Şekil yanıtı turgorla birlikte çeper özelliklerine bağlıdır.",
          ],
          [
            "Açıklık daralınca bütün kütikula hücreleri ortadan kalkar.",
            "Kütikula hücresiz örtüdür; stoma daralması onun yokluğu demek değildir.",
          ],
        ],
        knowledge: ["Kapanma modelinde iyon ve su kaybı turgoru azaltır."],
        strategy: "Su kaybının basınç ve şekil sonucunu ardışık bağla.",
        steps: [
          "Verilen iyon çıkışını çözünen azalmasıyla eşleştir.",
          "Suyun çıktığı koşulda turgorun azalışını belirle.",
          "Tipik çeper yanıtında açıklığın daralmasını seç.",
        ],
        commonError: "Su çıkışıyla turgor artışını aynı yönde düşünmek.",
        check:
          "Yanıt iyon, su ve turgor değişimlerinin aynı kapanma zincirinde tutarlı olmasını sağlıyor.",
      },
      {
        prompt:
          "Su stresi altındaki gündüz etkin bir bitkide ışık sürmesine rağmen ABA sinyaliyle stomalar daralıyor. Hangi yorum uygundur?",
        correct:
          "Işık tek başına her koşulda açılmayı zorunlu kılmaz; su stresi sinyali kapanmayı destekleyebilir.",
        reason:
          "Stoma birden fazla sinyali bütünleştirir; ABA bağlantılı iyon ve su değişimleri gündüz kapanmasını destekleyebilir.",
        wrong: [
          [
            "Işık varken kapanma olamaz; gözlem biyolojik olarak olanaksızdır.",
            "Su stresi ve ABA kapanmayı gündüz de destekleyebilir.",
          ],
          [
            "ABA adı asit içerdiği için yalnız bütün dokunun asit içinde erimesidir.",
            "ABA sinyal yolları ve iyon kanalları üzerinden etki eder; bu bir doku erimesi açıklaması değildir.",
          ],
          [
            "Gündüz kapanan her bitki kesin CAM olmak zorundadır.",
            "Kuraklık yanıtı CAM sınıflamasını tek başına kanıtlamaz.",
          ],
          [
            "Stoma daralması bütün yaprak hücrelerinin anında ölmesini gerektirir.",
            "Denetlenen kapanma canlı bekçi hücrelerinin işlevsel yanıtıdır.",
          ],
        ],
        knowledge: [
          "Stoma yanıtı ışık, su ve hormonal sinyallerin koşula bağlı bileşkesidir.",
        ],
        strategy:
          "Işığı korunmuş, su stresi sinyalini değişmiş etken olarak birlikte oku.",
        steps: [
          "Işığın sürdüğünü ve su stresinin bulunduğunu kaydet.",
          "ABA yanıtını iyon–su–turgor kapanma zincirine bağla.",
          "Koşulsuz ışıkta açılma genellemesini reddeden açıklamayı seç.",
        ],
        commonError:
          "Işığı stoma açıklığının tek zorunlu belirleyicisi saymak.",
        check:
          "Seçenek hem gündüz koşulunu hem su stresi verisini aynı anda açıklıyor.",
      },
      {
        prompt:
          "X bitkisinin CAM metabolizmalı olduğu ve verilen su koşulunda gece CO₂ aldığı biliniyor. Gece ölçümünde hangi stoma yorumu uygundur?",
        correct: "Bu örnekte gece açıklık bulunması CAM örüntüsüyle uyumludur.",
        reason:
          "CAM’de CO₂ alımının geceye kayması, bütün türlerin gece mutlaka kapandığı genellemesini sınırlar.",
        wrong: [
          [
            "Gece olduğu için ölçülen her açıklık kesin çizim hatasıdır.",
            "Verilen CAM koşulu gece açıklığını biyolojik olarak mümkün kılar.",
          ],
          [
            "CAM bulunması bitkinin hiçbir gece su kaybetmediğini kanıtlar.",
            "Gece açıklığı su kaybını mutlak sıfırlamaz.",
          ],
          [
            "Gece CO₂ alımı yalnız hidatotlardan sıvı şeker çıkışıdır.",
            "CO₂ gaz alımı ile hidatottan sıvı çıkışı farklı olaylardır.",
          ],
          [
            "X’in davranışı bütün bitkilerin her gece tamamen açık olduğunu kanıtlar.",
            "Tek türün koşullu örüntüsü bütün bitkilere genellenemez.",
          ],
        ],
        knowledge: [
          "Gece stoma davranışını türün metabolik programıyla birlikte değerlendirmek gerekir.",
        ],
        strategy: "Gece bilgisini CAM koşulundan ayırma.",
        steps: [
          "X’in CAM olarak verildiğini belirle.",
          "Gece CO₂ alımı için açıklık bulunmasını uygun gaz yoluyla ilişkilendir.",
          "Yorumu yalnız verilen örneğe bağla; bütün türlere yayma.",
        ],
        commonError:
          "Geceyi tür ve koşuldan bağımsız kesin kapanma etiketi yapmak.",
        check:
          "CAM koşulu açıklamada kullanıldı; sonuç bütün geceler için mutlaklaştırılmadı.",
      },
      {
        prompt:
          "Diğer koşullar sabitken stomaların açıklığı azaltılıyor. Deneyde net CO₂ girişi ve su buharı kaybı da ölçülüyor. Bu iki değişken için hangi genel mekanistik beklenti uygundur?",
        correct:
          "Her ikisinin stoma üzerinden geçişi sınırlanabilir; su tasarrufu ile karbon alımı arasında denge vardır.",
        reason:
          "Aynı açıklık hem CO₂ difüzyonuna hem su buharı çıkışına yol sağladığından kapanma iki akışı da etkileyebilir.",
        wrong: [
          [
            "Su kaybı azalırken CO₂ geçişi açıklıktan bağımsız olarak sınırsız artmak zorundadır.",
            "Açıklık CO₂ için de bir yol olduğundan sınırsız artış çıkarılamaz.",
          ],
          [
            "Stoma yalnız mineralli sıvı taşır; gaz değişkenleriyle ilişkisi yoktur.",
            "Stoma gaz ve su buharı geçididir; mineralli damla hidatotla ilişkilidir.",
          ],
          [
            "Açıklık azalması bitkinin artık hiçbir enerji dönüşümü yapmadığını gösterir.",
            "Gaz yolundaki sınırlama bütün metabolizmanın yokluğunu kanıtlamaz.",
          ],
          [
            "Su kaybının düşmesi her ortamda büyümeyi kesin artırır.",
            "CO₂ alımı ve sıcaklık gibi ek sonuçlar büyümeyi koşula bağlı etkiler.",
          ],
        ],
        knowledge: [
          "Stoma açıklığı CO₂ alımı ve su kaybının ortak geçiş koşullarından biridir.",
        ],
        strategy: "İki ölçümü aynı geçidin farklı maddeleri olarak bağla.",
        steps: [
          "CO₂ ve su buharının stomadan geçtiğini ayrı kaydet.",
          "Açıklık azalmasının iki geçişi de sınırlayabileceğini belirle.",
          "Su–karbon dengesini söyleyen, kesin büyüme eklemeyen yanıtı seç.",
        ],
        commonError:
          "Su tasarrufunu her koşulda tek başına büyüme garantisi saymak.",
        check:
          "Beklenti iki ölçülen gaz akışına bağlı; ölçülmeyen büyümeye kesin sayı vermiyor.",
      },
      {
        prompt:
          "Aynı türün eş yapraklarında sıcaklık ve açıklık aynı tutulup yalnız dış nem artırılıyor. Bu kısa süreli deneyin terleme yorumu hangisidir?",
        correct:
          "Dış nem arttığında iç-dış su buharı farkı küçülebilir; terleme azalması beklenebilir.",
        reason:
          "Sabit diğer koşullarda su buharı gradiyentinin azalması dışarı net geçişi sınırlar.",
        wrong: [
          [
            "Nem artışı bütün hidatotların kesin damlamasını zorunlu kılar.",
            "Gutasyon için kök basıncı ve başka uygun koşullar da gerekir.",
          ],
          [
            "Nem arttığı için yaprakla hava arasındaki buhar farkı zorunlu büyür.",
            "Dış havadaki su buharının artışı verilen durumda farkı küçültür.",
          ],
          [
            "Terleme azalırsa stoma yoğunluğu bir dakika içinde kesin yarıya iner.",
            "Kısa sürede akış değişimi yapısal stoma sayısının böyle değiştiğini göstermez.",
          ],
          [
            "Açıklık sabitse çevresel nem su kaybını hiçbir biçimde etkileyemez.",
            "Sabit açıklıkta da buhar gradiyenti akışı etkiler.",
          ],
        ],
        knowledge: ["Buhar gradiyenti ve açıklık ayrı değişkenlerdir."],
        strategy:
          "Açıklığı sabit kabul edip yalnız dış buhar değerini değiştir.",
        steps: [
          "Aynı sıcaklık ve açıklık koşullarını koru.",
          "Dış nemle buhar farkının azalışını belirle.",
          "Bu farkı düşük terleme beklentisine bağla.",
        ],
        commonError: "Stoma sayısını anlık terleme değişimiyle karıştırmak.",
        check:
          "Yanıt yalnız değişen nemi kullanıyor; yapı değişimi uydurmuyor.",
      },
      {
        prompt:
          "Üç yapı inceleniyor: A’da bekçi hücreli gaz açıklığı, B’de ksilemle bağlantılı mineralli sıvı çıkışı, C’de peridermde gevşek gaz alışveriş dokusu var. Eşleştirme hangisidir?",
        correct: "A stoma, B hidatot, C lentisel.",
        reason:
          "Hücre denetimi, sıvı çıkışı ve periderm bağlamları üç yapıyı ayırır.",
        wrong: [
          [
            "A hidatot, B stoma, C lentisel.",
            "A’daki bekçi hücreleri stoma; B’deki ksilem sıvısı hidatot özelliğidir.",
          ],
          [
            "A stoma, B lentisel, C hidatot.",
            "B’nin sıvı yolu ve C’nin periderm gaz dokusu ters eşleştirilmiştir.",
          ],
          [
            "Üçü de aynı bekçi hücresi çiftiyle açılır.",
            "Hidatot ve lentisel aynı hızlı bekçi hücresi denetimine sahip değildir.",
          ],
          [
            "Üçü de toprak çözeltisinden azot bağlayan bakteridir.",
            "Verilenler bitki yüzey yapılarıdır; bakteri nodülü değildir.",
          ],
        ],
        knowledge: [
          "Stoma, hidatot ve lentisel yer, hücre yapısı ve maddenin hâliyle ayrılır.",
        ],
        strategy: "Her yapının ayırt edici kanıtını tek adla eşleştir.",
        steps: [
          "A’nın bekçi hücresini stomaya bağla.",
          "B’nin mineralli sıvı ve ksilem ilişkisini hidatota bağla.",
          "C’nin periderm gaz dokusunu lentisel olarak tamamla.",
        ],
        commonError: "Bütün yüzey geçitlerini aynı hücresel kapak sanmak.",
        check: "Üç ayırt edici veri de doğru adla eşleşiyor.",
      },
      {
        prompt:
          "Azotça yetersiz ortamda bir baklagilin kök nodüllerindeki Rhizobium bakterileri N₂’yi kullanılabilir azota dönüştürüyor. Bitkinin bakteri ortağına temel katkısı hangisidir?",
        correct:
          "Fotosentez kökenli organik karbon ve uygun yaşam ortamı sağlamak.",
        reason:
          "Nodül ortaklığında bitkiden bakteriye organik karbon; bakteriden azot beslenmesine katkı vardır.",
        wrong: [
          [
            "Bakterinin kloroplastlarını yapraklarına taşımak.",
            "Rhizobium kloroplast taşıyan bir bitki hücresi değildir.",
          ],
          [
            "N₂’yi bitkinin çekirdeğinde fotosentezle doğrudan şekere çevirmek.",
            "Azot bağlama N₂’nin kullanılabilir azota dönüşümüdür; şekere doğrudan dönüşüm değildir.",
          ],
          [
            "Bakteriden gelen bütün karbonu yaprakta ilk kez üretmek.",
            "Bitki organik karbonu fotosentezle sağlar; yön ters verilmiştir.",
          ],
          [
            "Bakteriye su sağladığı için bitkinin artık hiç karbon ayırmaması.",
            "Ortaklığın karbon desteği yalnız su verildi diye ortadan kalkmaz.",
          ],
        ],
        knowledge: [
          "Nodülde karşılıklı alışverişin tarafları ve yönleri ayrılmalıdır.",
        ],
        strategy:
          "Bakterinin N katkısını kabul edip ters yöndeki bitki katkısını ara.",
        steps: [
          "N₂ bağlama işini bakteriye yerleştir.",
          "Bitkinin fotosentetik kaynak organlarını hatırla.",
          "Bitkiden bakteriye organik karbon desteğini seç.",
        ],
        commonError: "Rhizobium’u fotosentez yapan bitki hücresi gibi görmek.",
        check:
          "İki yönlü alışverişte N ve organik karbonun tarafları doğru kaldı.",
      },
      {
        prompt:
          "N₂’nin indirgenmiş kullanılabilir azota dönüşümü X; amonyumun önce nitrite sonra nitrata dönüşümü Y olarak veriliyor. Doğru adlandırma hangisidir?",
        correct: "X biyolojik azot bağlama, Y nitrifikasyondur.",
        reason:
          "İlk süreç atmosferik N₂’yi sisteme katar; ikincisi amonyumun yükseltgenme basamaklarıdır.",
        wrong: [
          [
            "X nitrifikasyon, Y azot bağlamadır.",
            "Girdiler ve dönüşüm yönleri iki ad için ters verilmiştir.",
          ],
          [
            "Her ikisi de fotosentezde CO₂ bağlamadır.",
            "Verilen element ve substratlar azot döngüsüne aittir; CO₂ değildir.",
          ],
          [
            "X yalnız suyun ksilemde yükselmesidir.",
            "N₂ kimyasal dönüşümü sıvının fiziksel taşınması değildir.",
          ],
          [
            "Y’de nitrat doğrudan atmosferik N₂’ye çevrilir.",
            "Verilen Y girdisi amonyum, son ürünü nitrattır; yön korunmamıştır.",
          ],
        ],
        knowledge: [
          "Azot döngüsü basamaklarının adı girdi ve ürüne göre ayırt edilir.",
        ],
        strategy: "Her okun başlangıç ve bitişini koru.",
        steps: [
          "X’te N₂’den indirgenmiş azota dönüşümü belirle.",
          "Y’de amonyum → nitrit → nitrat sırasını kaydet.",
          "X’i bağlama, Y’yi nitrifikasyon olarak eşleştir.",
        ],
        commonError: "Bütün azot dönüşümlerine azot bağlama demek.",
        check: "Her iki süreçte verilen girdi ve ürün doğru adlandırıldı.",
      },
      {
        prompt:
          "Bir bitkinin kökünde şişkinlik görülüyor; henüz ortak canlı veya N₂ bağlama ölçülmemiş. En uygun bilimsel yorum nedir?",
        correct:
          "Nodül olasılığı incelenebilir; yalnız şişkinlik işlevli Rhizobium ortaklığını kesin kanıtlamaz.",
        reason:
          "Kök şişkinliği farklı nedenlerle oluşabilir; ortak kimliği ve işlev kanıtı tanıyı güçlendirir.",
        wrong: [
          [
            "Her şişkinlik kesin Rhizobium nodülüdür ve aynı hızda N₂ bağlar.",
            "Görüntüden ortak kimliği ve nicel işlev çıkarılamaz.",
          ],
          [
            "Şişkinlik varsa kök artık bitkiye ait değildir.",
            "Ortaklık yapısı gelişmesi bitki dokusu kimliğini ortadan kaldırmaz.",
          ],
          [
            "Şişkin kökler hiçbir koşulda canlı hücre taşımaz.",
            "Şişkinlik canlılık için böyle bir zorunlu sonuç vermez.",
          ],
          [
            "N₂ bağlama ölçülmeden bakterinin tam türü görselden kesin belirlenir.",
            "Morfoloji tek başına bu özgül mikrobiyolojik tanıyı sağlamaz.",
          ],
        ],
        knowledge: [
          "Yapısal görünüm ile ortak kimliği ve işlev ölçümü aynı kanıt değildir.",
        ],
        strategy: "Gözleneni, henüz ölçülmeyen iki özellikten ayır.",
        steps: [
          "Gözlemin yalnız kök şişkinliği olduğunu yaz.",
          "Ortak canlı ve N₂ bağlama verisinin yokluğunu koru.",
          "Olasılığı açık tutan ama kesin tanı vermeyen yanıtı seç.",
        ],
        commonError:
          "Tek dış görünüşten ortak kimliği ve işlev hızını kesinleştirmek.",
        check:
          "Sonuç elde olmayan mikrobiyolojik veya işlevsel bilgiyi eklemiyor.",
      },
      {
        prompt:
          "Nodülde N₂ bağlayan bakteri enerji için solunumdan yararlanıyor; enzim sistemi fazla O₂’ye duyarlı. Hangi açıklama uygundur?",
        correct:
          "Enerji gereksinimiyle enzimin O₂’den korunması arasında düzenlenmiş bir denge gerekir.",
        reason:
          "N₂ bağlama enerji gerektirirken yüksek O₂ duyarlılığı, O₂’nin koşulsuz artırılmasını yararlı kılmaz.",
        wrong: [
          [
            "Ne kadar çok O₂ olursa bağlama her koşulda sınırsız artar.",
            "Enzimin fazla O₂’ye duyarlılığı bu genellemeyi sınırlar.",
          ],
          [
            "Enerji üretimi bütünüyle kesilirse bağlama zorunlu en yüksek olur.",
            "N₂ bağlama enerji gerektirir; enerji kaybı sınırsız işlev sağlamaz.",
          ],
          [
            "N₂ bağlama yalnız bakterinin kloroplastında gerçekleşir.",
            "Rhizobium kloroplast taşımaz; verilen süreç solunum enerjisi ve azot bağlamadır.",
          ],
          [
            "O₂ duyarlılığı bakterinin bitkiye hiç karbon gereksinimi olmadığını kanıtlar.",
            "Oksijen duyarlılığı karbon ve enerji ihtiyacını ortadan kaldırmaz.",
          ],
        ],
        knowledge: [
          "Nodül işlevi enerji ve O₂ koşullarının birlikte uygunluğuna bağlıdır.",
        ],
        strategy: "İki koşulu birini silmeden birlikte değerlendir.",
        steps: [
          "Solunum enerjisinin gerekli olduğunu kaydet.",
          "Fazla O₂’nin enzim sistemine zarar verebildiğini ekle.",
          "Düzenlenmiş dengeyi seç; en çok O₂ veya sıfır enerji uçlarını dışla.",
        ],
        commonError:
          "Tek koşulu sınırsız artırmanın bütün ortaklık işlevini artıracağını varsaymak.",
        check: "Yanıt hem enerji gereğini hem O₂ duyarlılığını açıklıyor.",
      },
      {
        prompt:
          "Kök çevresinden toprağın dar gözeneklerine uzanan hifler bir mantara ait. İşaretli fosfat hiflerden kök arayüzüne, oradan bitkiye ulaşıyor. Yapı ve katkı nasıl adlandırılır?",
        correct: "Mikoriza; mantar hifleri fosfat edinimine katkı veriyor.",
        reason:
          "Mantar kökenli hif ve kökle alışveriş ilişkisi mikorizayla; izlenen P ise fosfat katkısıyla uyumludur.",
        wrong: [
          [
            "Rhizobium nodülü; hifler atmosferik N₂’yi doğrudan klorofile çeviriyor.",
            "Mantar hifi bakteri değildir ve işaretli madde fosfattır.",
          ],
          [
            "Kök emici tüyü; bütün hifler bitki epidermisinin uzantısıdır.",
            "Hiflerin mantara ait olduğu açıkça verilmiştir.",
          ],
          [
            "Stoma; fosfat havadan gaz hâlinde açıklığa giriyor.",
            "Yol toprak hif–kök arayüzüdür; yüzey gaz açıklığı değildir.",
          ],
          [
            "Lentisel; periderm bekçi hücreleriyle N₂ pompalar.",
            "Lentisel gaz alışveriş dokusudur; verilen mantar–kök fosfat yolunu açıklamaz.",
          ],
        ],
        knowledge: [
          "Mikoriza mantar–kök ortaklığıdır; hifler mineral erişimine katkı verebilir.",
        ],
        strategy: "Önce hifin canlı kökenini, sonra izlenen elementi tanı.",
        steps: [
          "Hifleri bitki değil mantar yapısı olarak belirle.",
          "İşaretli fosfatın hif–kök arayüzünden bitkiye yolunu izle.",
          "Mikoriza ve P katkısını birlikte seç.",
        ],
        commonError:
          "Mantar hifini bitkinin emici tüyüyle aynı canlı kökeninde saymak.",
        check: "Yapı adı ve taşınan element verilen iki kanıtla da uyumlu.",
      },
      {
        prompt:
          "Mikorizalı bitkiden mantara işaretli organik karbon geçtiği ölçülüyor. Hangi yorum doğrudur?",
        correct:
          "Bitki fotosentez kökenli karbonu ortağa sağlayabilir; mantarın fotosentez yaptığı sonucu çıkmaz.",
        reason:
          "Karbonun bitkiden mantara yönü ortaklıkta bitkinin organik madde desteğiyle uyumludur.",
        wrong: [
          [
            "Mantar bütün şekerini kloroplastla üretir; bitkiden gelen işaret bu yüzden önemsizdir.",
            "Mantar fotosentez yapan kloroplastlı bir ortak değildir; verilen yön bitki katkısıdır.",
          ],
          [
            "İşaret mantarda görüldüğü için karbon atmosferdeki N₂’ye dönüşmüştür.",
            "Elementin kimliği korunur; karbon işareti N₂’ye dönüşüm değildir.",
          ],
          [
            "Bitki mantara karbon verirse mantarın mineral katkısı hiçbir koşulda olamaz.",
            "Karbon desteği ile mantardan mineral katkısı karşılıklı alışverişin iki yönü olabilir.",
          ],
          [
            "Karbonun yönü bitkiden mantara olduğuna göre kök su alamaz.",
            "Organik karbon alışverişi kökün su alımının yokluğunu göstermez.",
          ],
        ],
        knowledge: [
          "Mikorizada bitkiden mantara organik karbon desteği bulunabilir.",
        ],
        strategy: "İşaretin kaynağı ve yönünü kimyasal kimliğiyle koru.",
        steps: [
          "Karbonun başlangıcını bitkiye yerleştir.",
          "Mantardaki işareti bitkiden aktarım kanıtı olarak al.",
          "Mantar fotosentezi eklemeyen karbon desteği yorumunu seç.",
        ],
        commonError:
          "İşaretli karbonu alan ortağın karbonu mutlaka kendisinin ürettiğini sanmak.",
        check: "Yanıt verilen bitki→mantar yönünü ters çevirmiyor.",
      },
      {
        prompt:
          "A ortaklığında kök dışı mantar kılıfı ve hücreler arası hifler; B’de korteks hücreleri içinde bitki zarıyla çevrelenen arbusküller görülüyor. Hangi yorum uygundur?",
        correct:
          "Mikoriza tipleri farklı arayüzler kurabilir; B’de hücre içine uzanma sitoplazmaların bütünüyle karışması değildir.",
        reason:
          "Ektomikoriza ve arbusküler endomikoriza örnekleri tek dış kılıf genellemesini sınırlar; bitki zarı arayüzü korur.",
        wrong: [
          [
            "Bütün mikorizalar yalnız kökü dıştan sarar; B gözlemi olanaksızdır.",
            "Arbusküler tipte hücre içinde zarla çevrili mantar yapıları gelişebilir.",
          ],
          [
            "B’de mantar bitki hücresine girince kesin kloroplasta dönüşür.",
            "Mantar yapısının konumu organel kimliğine dönüşmesi demek değildir.",
          ],
          [
            "A’daki hifler mutlaka kök emici tüyleridir.",
            "Yapıların mantara ait olduğu verilmiştir; bitki tüyü değildir.",
          ],
          [
            "İki yapı da iki bekçi hücresinden oluşan stomadır.",
            "Veriler kök–mantar arayüzleri; stoma yüzey sistemi değildir.",
          ],
        ],
        knowledge: [
          "Mikoriza ortaklık arayüzleri çeşitlidir; mantar ve bitki hücresi kimlikleri korunur.",
        ],
        strategy:
          "Dış kılıf ile hücre içindeki zarla çevrili arayüzü karşılaştır.",
        steps: [
          "A’nın kök dışı ve hücreler arası hif düzenini kaydet.",
          "B’de arbuskülün çevresindeki bitki zarını belirle.",
          "Çeşitliliği kabul eden, sitoplazma karışması eklemeyen yanıtı seç.",
        ],
        commonError:
          "Bütün mikorizayı yalnız dış yüzeyi saran kılıf olarak tanımlamak.",
        check:
          "Her iki anatomik gözlem de açıklanıyor; zar arayüzü kaybedilmiyor.",
      },
      {
        prompt:
          "Aynı genotip bitkiler fosfatça kısıtlı eş ortamda yetiştiriliyor. Mantar eklenenler daha fazla P alıyor ve daha yüksek kuru kütleye ulaşıyor. Hangi sonuç bu deneyin sınırına uygundur?",
        correct:
          "Bu koşulda mantar katkısıyla P edinimi ve büyüme artışı uyumludur; bütün ortamlar için aynı yarar garanti edilmez.",
        reason:
          "Kontrollü bu fosfat kısıtı deneyinde ilişki desteklenir; mineral bolluğu ve karbon maliyeti farklı sonuç verebilir.",
        wrong: [
          [
            "Mantar her türde her ortamda aynı yüzde büyüme artışı sağlar.",
            "Tek koşuldaki ölçüm evrensel ve aynı nicel yararı kanıtlamaz.",
          ],
          [
            "Mantar P sağladığı için bitki mantara karbon ayırmaz.",
            "Mineral katkısı ortaklığın karbon maliyetini otomatik yok etmez.",
          ],
          [
            "Yüksek kuru kütle kesin daha fazla N₂ bağlandığını gösterir.",
            "İzlenen mineral P’dir; N₂ bağlama ölçümü verilmemiştir.",
          ],
          [
            "Bitkinin genotipi aynı tutulduğu için çevrenin hiçbir etkisi olamaz.",
            "Genotip kontrolü çevresel etkenlerin biyolojik rolünü ortadan kaldırmaz.",
          ],
        ],
        knowledge: [
          "Ortaklığın net yararı kaynak kısıtı ve maliyetlere bağlı olabilir.",
        ],
        strategy:
          "Deneyin sabitlerini ve fosfat kısıtını sonuçla birlikte taşı.",
        steps: [
          "Genotip ve ortam eşitliğini karşılaştırmanın kontrolü olarak al.",
          "Ölçülen P ve kuru kütle artışını bu koşuldaki katkıyla ilişkilendir.",
          "Sonucu bütün tür ve ortamlara yaymayan yanıtı seç.",
        ],
        commonError:
          "Koşullu ortaklık yararını evrensel büyüme garantisi yapmak.",
        check:
          "P ölçümü ve kuru kütle sonucunun ikisi de bu deney koşulunda tutuldu.",
      },
      {
        prompt:
          "Azotça kısıtlı steril ortamda baklagillerin kontrolü düşük büyüyor; işlevli Rhizobium ve ayrıca mineral N verilen ayrı gruplar kontrolün üzerinde büyüyor. Diğer koşullar eş. Hangi ek gözlem azot bağlama mekanizmasına en doğrudan kanıt ekler?",
        correct:
          "İşaretli N₂’den gelen azotun bakteri ortaklığı üzerinden bitki organik maddesinde saptanması.",
        reason:
          "Atmosferik N₂ kökeninin izlenmesi, yalnız büyüme artışından daha doğrudan bağlama ve aktarım kanıtı sağlar.",
        wrong: [
          [
            "Yalnız yaprak renginin iki fotoğrafta farklı görünmesi.",
            "Renk genel beslenmeyle ilişkili olabilir ama N₂ kaynağını doğrudan izlemez.",
          ],
          [
            "Bütün gruplara son gün farklı miktarda su verilmesi.",
            "Bu işlem yeni karıştırıcı etken oluşturur; mekanizma kanıtını güçlendirmez.",
          ],
          [
            "Mantar hiflerinin uzunluğunun ölçülmesi ama bakterinin hiç incelenmemesi.",
            "Bu ölçüm Rhizobium üzerinden N₂ bağlamayı doğrudan sınamaz.",
          ],
          [
            "Kökün yalnız toprak altında bulunduğunun gösterilmesi.",
            "Organın konumu azotun atmosferik kaynağını veya dönüşümünü kanıtlamaz.",
          ],
        ],
        knowledge: [
          "İşaretli kaynak izlemesi, bir elementin hangi girdiden geldiğini sınayabilir.",
        ],
        strategy: "Büyüme korelasyonundan girdiyi doğrudan izleyen kanıta geç.",
        steps: [
          "Temel deneyde N kısıtı ve iki kurtarma yönünü belirle.",
          "Sorunun büyüme değil N₂ kökenini doğrudan kanıtlamayı istediğini ayır.",
          "İşaretli N₂’nin bitki maddesine geçişini seç.",
        ],
        commonError:
          "Büyüme artışını azot atomunun kaynağını doğrudan ölçmüş gibi sunmak.",
        check:
          "Ek gözlem atmosferik N₂ girdisini ve bitkiye aktarımı birlikte izliyor.",
      },
      {
        prompt:
          "İşlevleri verilen iki ortaklık modelinde X, Rhizobium–baklagil nodülü; Y, mantar–kök mikorizasıdır. Her ikisinde de bitkiden ortağa organik karbon aktarımı var. Doğru ayrım hangisidir?",
        correct:
          "X’te temsil edilen özgül katkı N₂ bağlama; Y’de fosfat ve su edinimidir.",
        reason:
          "Modellerin ortak karbon alışverişi farklı ortak canlı ve kaynak katkılarını ortadan kaldırmaz.",
        wrong: [
          [
            "Her ikisi de aynı mantarın N₂ bağlamasıdır.",
            "X bakteri, Y mantar ortaklığıdır; verilen işlevler farklıdır.",
          ],
          [
            "X yalnız CO₂ gazını stomadan geçirir, Y yalnız su buharı atar.",
            "Bunlar yüzey stoma işlevleridir; kök ortaklıkları değildir.",
          ],
          [
            "Karbon alışverişi ortak olduğu için iki ortağın canlı kimliği de aynıdır.",
            "Aynı maddeyi almak bakteri ve mantarı aynı canlı grubu yapmaz.",
          ],
          [
            "Y’de P edinimi varsa bitkide hiç azot bulunamaz.",
            "Bir kaynak katkısı diğer elementin bitkide bulunmasını dışlamaz.",
          ],
        ],
        knowledge: [
          "Ortak karbon desteği, nodül ve mikorizanın farklı canlı ve işlevlerini birleştirmez.",
        ],
        strategy: "Ortak oku koruyup farklı girdileri ayır.",
        steps: [
          "İki modelde bitki→ortak karbon okunu ortak özellik olarak belirle.",
          "X’te bakterinin N₂ katkısını ayır.",
          "Y’de mantarın P/su yolunu farklı işlev olarak eşleştir.",
        ],
        commonError:
          "Karbon alışverişi benzerliğinden iki ortaklığı aynı mekanizma saymak.",
        check:
          "Yanıt ortak karbonu ve farklı kaynak katkılarını birlikte koruyor.",
      },
      {
        prompt:
          "Bir hedef için N 20, P 8 birim gerekiyor. Verilen doğrusal yeterlilik modelinde sağlanan N 10, P 6 birim. İşlevli nodül N’yi 20’ye çıkarıyor, P’yi değiştirmiyor. İlk ve sonraki sınırlayıcı nasıl değişir?",
        correct: "İlk N, sonra P sınırlayıcı olur.",
        reason:
          "İlk oranlar N 0,5 ve P 0,75; sonra N 1,0 ve P 0,75 olduğundan en küçük oran P’ye geçer.",
        wrong: [
          [
            "İlk P, sonra N olur.",
            "Verilen oranlar başlangıçta N’nin, son durumda P’nin daha düşük olduğunu gösterir.",
          ],
          [
            "İki durumda da N’dir; organ adı nodülse başka kaynak sınırlayamaz.",
            "N yeterliliği 1’e çıkınca P 0,75’te kalır; başka kaynak yeni kısıt olabilir.",
          ],
          [
            "İki durumda da sınırlayıcı yoktur; miktarlar pozitiftir.",
            "Pozitif miktar hedefin karşılandığı anlamına gelmez.",
          ],
          [
            "N artınca P de otomatik 8’e yükselmek zorundadır.",
            "Soruda P’nin değişmediği belirtilmiştir.",
          ],
        ],
        knowledge: [
          "Bir kısıt giderildiğinde başka bir kaynak yeni minimum olabilir.",
        ],
        strategy: "Önce ve sonra iki yeterlilik tablosu kur.",
        steps: [
          "İlk durumda N 10/20 = 0,5 ve P 6/8 = 0,75 hesapla.",
          "N katkısından sonra N oranını 1,0 yap, P’yi 0,75 tut.",
          "En düşük oranların N’den P’ye değiştiğini seç.",
        ],
        commonError:
          "Bir mineral kısıtı giderilince bütün kısıtların yok olduğunu sanmak.",
        check:
          "Her iki durumda verilen/gereken oranı kullanıldı; P sabit kaldı.",
      },
      {
        prompt:
          "Aşamalı stoma modelinde açılmaya uygun sinyalden sonra ikinci basamakta iyon alımı gösteriliyor; su girişi ve turgor değişimi henüz gösterilmemiş. Hangi tahmin daha doğrudur?",
        correct:
          "İyon aşamasında açıklığın şimdiden en geniş olması zorunlu değildir; su ve mekanik yanıt izlenmelidir.",
        reason:
          "Bir önceki sinyal/iyon olayı sonraki su–turgor–çeper basamaklarının tamamlandığını kanıtlamaz.",
        wrong: [
          [
            "İyon oku çizildiği anda en geniş açıklık biyolojik olarak zorunludur.",
            "Aşamalı mekanizmada su ve turgor yanıtı henüz gerçekleşmemiş olabilir.",
          ],
          [
            "Su girişi sonraki aşamadaysa iyonlar hücreye hiç etki etmez.",
            "İyonlar osmotik durumu hazırlayabilir; etkinin sırayla olması etkisizlik değildir.",
          ],
          [
            "Turgor gösterilmiyorsa bekçi hücreleri artık ölüdür.",
            "Modelin aşama seçimi hücre canlılığı kaybı demek değildir.",
          ],
          [
            "Her aşama aynı anda bütün bitkinin ölçülmüş gerçek saniyesini verir.",
            "Aşama modeli nedensel sırayı gösterir; gerçek zaman kalibrasyonu verilmemiştir.",
          ],
        ],
        knowledge: [
          "Aşamalı öğretim modeli olayların nedensel sırasını gösterir; tamamlanma ve zaman ölçümü değildir.",
        ],
        strategy: "Gösterilen basamakla henüz gösterilmeyenleri ayır.",
        steps: [
          "İkinci basamakta yalnız iyon alımının temsil edildiğini kaydet.",
          "Suyu, turgoru ve şekil yanıtını sonraki olaylar olarak sırala.",
          "Erken en geniş açıklığı zorunlu saymayan tahmini seç.",
        ],
        commonError: "Modelde sonraki mekanik sonucu ilk sinyal anına taşımak.",
        check:
          "Yanıt aşama sınırını koruyor ve modele gerçek saniye yüklemiyor.",
      },
    ],
  },
];
const positions024A = [
  [2, 1, 0, 2, 4, 2, 3, 2, 4, 0, 1, 3, 1, 4, 0, 0, 1, 3],
  [4, 0, 4, 1, 1, 3, 0, 3, 1, 1, 0, 2, 4, 2, 3, 2, 2, 0],
  [4, 4, 3, 2, 2, 0, 0, 1, 3, 2, 0, 4, 1, 1, 0, 0, 2, 4, 1, 1, 3, 3],
  [1, 1, 2, 4, 0, 0, 3, 0, 3, 2, 1, 0, 3, 4, 4, 2, 4, 3, 2, 1],
];

export const forge024BiologyATopics: Record<string, string> =
  Object.fromEntries(units024A.map((u) => [u.id, u.topic]));
export const forge024BiologyAGuides: LessonGuide[] = units024A.map(
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
export const forge024BiologyALessons: Lesson[] = units024A.map((u, j) => ({
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
    const answer = positions024A[j][i];
    const options = item.wrong.map(([text]) => text),
      optionReasons = item.wrong.map(([, reason]) => reason);
    options.splice(answer, 0, item.correct);
    optionReasons.splice(answer, 0, item.reason);
    return {
      id: `f024-bio-a-${u.id}-${i + 1}`,
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
