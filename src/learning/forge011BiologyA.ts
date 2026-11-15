import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

export const virusStages = [
  "Bağlanma",
  "Genomun hücreye ulaşması",
  "Genom ve protein sentezi",
  "Yeni virionların birleşmesi",
  "Hücreden çıkış",
] as const;
export function viralExperiment(
  stage: number,
  alive: boolean,
  receptor: boolean,
  compatible: boolean,
) {
  if (!Number.isInteger(stage) || stage < 0 || stage > 4)
    throw new RangeError("VIRAL_STAGE");
  const block = !receptor
    ? "Uygun reseptör yok: bağlanma gerçekleşmiyor."
    : !alive
      ? "Canlı konak sistemi yok: yeni parçacık üretilemiyor."
      : !compatible
        ? "Bağlanma var; hücre içi uyumluluk yok: üretim engelleniyor."
        : "";
  const reached = !receptor
    ? -1
    : !alive
      ? 0
      : !compatible
        ? Math.min(stage, 1)
        : stage;
  return {
    reached,
    block,
    productive: !block && stage >= 3,
    released: !block && stage === 4,
    label: block || virusStages[stage],
  };
}
export type ProkaryoteProcess = "division" | "transfer" | "endospore";
export function prokaryoteExperiment(
  initial: number,
  process: ProkaryoteProcess,
) {
  if (!Number.isInteger(initial) || initial < 2 || initial > 8)
    throw new RangeError("PROKARYOTE_COUNT");
  if (!["division", "transfer", "endospore"].includes(process))
    throw new RangeError("PROKARYOTE_PROCESS");
  return {
    individuals: process === "division" ? initial * 2 : initial,
    active:
      process === "endospore"
        ? 0
        : process === "division"
          ? initial * 2
          : initial,
    spores: process === "endospore" ? initial : 0,
    dnaTransfer: process === "transfer",
    label:
      process === "division"
        ? "Bölünme birey sayısını artırdı."
        : process === "transfer"
          ? "DNA aktarıldı; birey sayısı değişmedi."
          : "Dayanıklı endospor oluştu; birey sayısı artmadı.",
  };
}
export const protistExamples = [
  {
    id: "amoeba",
    name: "Amip",
    movement: "Yalancı ayak",
    nutrition: "Heterotrof; fagositoz",
    chloroplast: false,
  },
  {
    id: "paramecium",
    name: "Paramesyum",
    movement: "Sil",
    nutrition: "Heterotrof",
    chloroplast: false,
  },
  {
    id: "euglena",
    name: "Öglena",
    movement: "Kamçı",
    nutrition: "Koşula bağlı miksotrofi",
    chloroplast: true,
  },
  {
    id: "alga",
    name: "Yeşil alg örneği",
    movement: "Bu örnekte hareket yapısı gösterilmiyor",
    nutrition: "Fotoototrof",
    chloroplast: true,
  },
  {
    id: "plasmodium",
    name: "Plasmodium",
    movement: "Bu şemada hareket yapısı gösterilmiyor",
    nutrition: "Parazit",
    chloroplast: false,
  },
  {
    id: "slime",
    name: "Cıvık mantar",
    movement: "Amipsi hareket",
    nutrition: "Heterotrof",
    chloroplast: false,
  },
] as const;
export function protistExperiment(
  id: string,
  light: boolean,
  organic: boolean,
  fresh: boolean,
) {
  const item = protistExamples.find((x) => x.id === id);
  if (!item) throw new RangeError("PROTIST_EXAMPLE");
  const photosynthesis = item.chloroplast && light;
  const euglenaFood = photosynthesis
    ? "Işıkla organik madde üretimi mümkün."
    : organic
      ? "Seçilmiş öglena örneği hazır organik maddeden yararlanabilir."
      : "Bu koşulda iki besin kaynağı da sağlanmadı; sürekli büyüme çıkarılamaz.";
  return {
    item,
    photosynthesis,
    waterLoad: fresh && ["amoeba", "paramecium", "euglena"].includes(id),
    nutrition: id === "euglena" ? euglenaFood : item.nutrition,
    summary: `${item.name}: ökaryot; ${item.movement}. ${id === "euglena" ? euglenaFood : item.nutrition + "."}`,
  };
}
export type Evidence = "unknown" | "yes" | "no";
export const plantGroups = [
  {
    id: "moss",
    name: "Kara yosunu",
    group: "Damarsız tohumsuz",
    vascular: false,
    seed: false,
    fruit: false,
  },
  {
    id: "fern",
    name: "Eğrelti",
    group: "Damarlı tohumsuz",
    vascular: true,
    seed: false,
    fruit: false,
  },
  {
    id: "pine",
    name: "Çam",
    group: "Açık tohumlu",
    vascular: true,
    seed: true,
    fruit: false,
  },
  {
    id: "apple",
    name: "Elma",
    group: "Kapalı tohumlu",
    vascular: true,
    seed: true,
    fruit: true,
  },
] as const;
export function plantEvidence(
  vascular: Evidence,
  seed: Evidence,
  fruit: Evidence,
) {
  if (
    ![vascular, seed, fruit].every((v) => ["unknown", "yes", "no"].includes(v))
  )
    throw new RangeError("PLANT_EVIDENCE");
  return plantGroups.filter((p) =>
    [
      [vascular, p.vascular],
      [seed, p.seed],
      [fruit, p.fruit],
    ].every(([a, b]) => a === "unknown" || (a === "yes") === b),
  );
}
export function fungalNutrition(stage: number, enzyme: boolean) {
  if (!Number.isInteger(stage) || stage < 0 || stage > 2)
    throw new RangeError("FUNGAL_STAGE");
  const digested = enzyme && stage >= 1;
  return {
    polymers: digested ? 0 : 2,
    outsideMonomers: digested ? (stage === 2 ? 2 : 6) : 0,
    insideMonomers: digested && stage === 2 ? 4 : 0,
    totalMonomerUnits: 6,
    label:
      !enzyme && stage > 0
        ? "Dış enzim yok: büyük besin parçalanmadı; emilim ilerlemedi."
        : stage === 0
          ? "İki büyük besin zinciri hücre dışında."
          : stage === 1
            ? "Dış sindirim: altı küçük ürün hücre dışında."
            : "Emilim: dört küçük ürün içeride, iki ürün dışarıda.",
  };
}

const section = (title: string, a: string, b: string): GuideSection => ({
  title,
  paragraphs: [a, b],
});
const example = (
  title: string,
  prompt: string,
  strategy: string,
  steps: [string, string, string][],
  answer: string,
  check: string,
  pitfall: string,
): WorkedExample => ({
  title,
  prompt,
  strategy,
  steps: steps.map(([label, explanation, expression]) => ({
    label,
    explanation,
    expression,
  })),
  answer,
  check,
  pitfall,
});
const question = (
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  hint: string,
  explanation: string,
  skill: string,
): Question => ({
  id,
  prompt: txt(prompt),
  options: options.map(txt),
  answer,
  hint: txt(hint),
  explanation: txt(explanation),
  skill,
});

const virusGuide: LessonGuide = {
  id: "virusler",
  minutes: 65,
  objectives: [
    "Virionun kapsid, genom ve koşullu zarfını hücresel yapılardan ayır.",
    "Bağlanma, hücre içi uyumluluk ve yeni virion üretimini ayrı kanıtlarla değerlendir.",
    "Çoğalma basamaklarında eksilen bileşenin sonucunu açıkla.",
    "Viral hastalık örneklerini konak, bağışıklık ve bulaş yolu düzeyinde karşılaştır.",
  ],
  sections: [
    section(
      "Virüs neden bir hücre değildir?",
      "Bir hücrede zarla sınırlanmış sitoplazma, kalıtsal bilgi ve ribozomla sürdürülen bir metabolik düzen bulunur. Virüsün olgun parçacığına virion denir. Virion, genom ve onu çevreleyen kapsid etrafında örgütlenir; kendi sitoplazması ve ribozomu bulunmaz. Bu yüzden onu ‘çok küçük tek hücreli’ diye adlandırmak yapısal bir yanlıştır.",
      "Virüs kalıtsal bilgi taşıyabilir, konak içinde yeni parçacıklar oluşturabilir ve popülasyonu evrimleşebilir. Buna karşılık bağımsız enerji üretimi ve protein sentezi yapamaz. ‘Canlı mı?’ sorusunu tek etiketle geçmek yerine hücresellik, metabolizma ve kalıtsal değişim kanıtlarını ayrı sırala. Güncel canlı sınıflandırmasının üç üst âlemine bir hücre gibi yerleştirme.",
    ),
    section(
      "Genom, kapsid ve zarfı katman katman oku",
      "Tipik viral genom DNA ya da RNA’dır; iki nükleik asit türünü aynı anda genom olarak taşıması gerekmez. Proteinlerden oluşan kapsid genomu korur ve parçacığın biçimine katılır. Bazı virüslerde kapsidin dışında konak zarlarından köken alan lipit zarf ve bağlanmada görevli yüzey proteinleri bulunur. Zarfsız bir virüs de genom ve kapsid düzeni taşıyabilir.",
      "Şekilde gördüğün dış halkayı bütün virüslerde zorunlu sanma. Bakteriyofajın baş, kuyruk ve tutunma lifleri de tüm virüslerin ortak anatomisi değildir. Bazı virionlar polimeraz gibi enzimler taşıyabilir; ‘hiçbir virüste enzim yok’ kuralı yanlıştır. Taşınan enzim, bağımsız hücresel metabolizma veya ribozom sistemi anlamına gelmez.",
    ),
    section(
      "Konak özgüllüğü: kapıya uymak ve içeride çalışabilmek",
      "Yüzeydeki viral yapı uygun hücre reseptörüyle etkileşirse bağlanma mümkün olur. Fakat bağlanma tek başına başarılı çoğalma değildir. Giriş, genomun açığa çıkması, hücrenin uygun sentez sistemleri ve savunmayı aşabilme gibi hücre içi koşullar da gerekir. Aynı virüsün iki hücreye bağlanıp yalnız birinde yeni virion üretmesi bu ayrımı gösterir.",
      "Bakterileri enfekte eden virüslere bakteriyofaj denir. Hepatit virüslerinde karaciğer, kuduzda sinir sistemi, HIV’de bağışıklık hücreleri öğretici hedef örnekleridir; her örneğin tüm dokulardaki davranışını bu kısa eşleştirmeden çıkarmayız. Virüsün bir canlıyla temas etmesi o canlının her hücresinde çoğalacağını kanıtlamaz.",
    ),
    section(
      "Çoğalma: parçalar üretilir, virion birleştirilir",
      "Seçilmiş litik bakteriyofaj modelinde sıralama bağlanma, genomun hücreye ulaşması, viral genom ve proteinlerin sentezi, birleşme ve çıkıştır. Konak hücrenin ribozomları viral proteinlerin üretiminde kullanılır. Genom ve kapsid proteinleri ayrı bileşenlerdir; yalnız birinin çoğalması, tam ve bulaştırıcı yeni parçacığın oluştuğunu göstermez.",
      "Virüs hücre gibi büyüyüp ikiye bölünmez. Yeni parçacıklar bileşenlerin düzenlenmesiyle kurulur. Bazı fajlarda litik çıkış konak hücreyi parçalar; zarflı virüslerin bir bölümü tomurcuklanarak çıkabilir. Etkileşimli şekil tek bir temel yolun mantığını gösterir; her viral grubun bütün basamak ayrıntılarını veya gerçek üretim sayısını ölçmez.",
    ),
    section(
      "Bekleme, kalıtsal değişim ve sayımın sınırı",
      "Bazı faj genomları bakteri kalıtsal materyaliyle ilişkili bir bekleme evresine girebilir; konak bölünürken bu bilgi aktarılır, uygun koşulda litik üretime geçilebilir. Bu, dışarıda bağımsız viral metabolizma kurulduğu anlamına gelmez. Hücre içindeki viral genom sayısı ile çevreye çıkmış virion sayısı farklı değişkenlerdir.",
      "Mutasyon ve seçilim viral popülasyonların değişmesine katkı sağlar. Değişimin hızı grubun genomu ve kopyalama mekanizmasına bağlıdır; bütün RNA virüsleri aynı hızda değişir veya her mutasyon konağı değiştirir denemez. Bazı virüslerin kristalleştirilebilmesi de hepsinin her dış ortamda zorunlu kristal hâlde bulunduğu anlamına gelmez.",
    ),
    section(
      "Deneyde canlı hücre bağımlılığını kanıtla",
      "Eşit başlangıç virionu canlı uygun hücre, öldürülmüş hücre ve hücresiz besiyeri içeren kaplarda karşılaştırılabilir. Yalnız canlı uygun hücre kabında yeni parçacık sayısının artması, belirtilen koşullarda hücresel sisteme bağımlılığı destekler. Aynı besin ve sıcaklığı kullanmak değişkenleri ayırmayı kolaylaştırır.",
      "Başlangıçta 50 ve 500 parçacık bulunan iki kabın son sayılarını doğrudan karşılaştırmak yanıltıcıdır. Yeni üretimi başlangıca göre değişimle değerlendir. Reseptör kapatılınca üretimin durması bağlanmanın gerekli olduğuna kanıt sağlayabilir; reseptörü açmak tek başına bütün sonraki basamakların başarılı olduğunu kanıtlamaz. Deneyin ölçmediği hastalık şiddetini grafiğe ekleme.",
    ),
    section(
      "Viral hastalıklar ve bağışıklığı mekanizmayla eşleştir",
      "İnfluenza ve kuduz virüslerinde RNA, herpes virüslerinde DNA genomu öğretici örneklerdir. Hepatit farklı virüslerin neden olabildiği bir karaciğer hastalığı grubudur; bütün hepatit virüslerini tek genom veya tek bulaş yoluyla eşitleme. HIV enfeksiyonu bağışıklık sistemiyle ilişkilidir; HIV taşıma ile ileri bağışıklık yetmezliği evresini aynı kavram sayma.",
      "Aşı bağışıklık sistemini belirli hedeflere karşı hazırlayabilir; antikor içeren serum hazır bağışıklık bileşenleri sağlar. İnterferonlar hücresel antiviral yanıtın düzenleyicileridir. Bakteriyel duvar veya bakteriyel ribozom hedefli antibiyotiğin virüste bu hedefleri yoktur. Antiviral etki farklı hedeflerle ilişkilidir; bu biyolojik ayrım belirli bir ilaç veya tedavi seçimi vermez.",
    ),
    section(
      "Bulaş ve biyoteknolojide aynı virüs kavramını farklı kullan",
      "Bulaş yolu virüse göre değişir: bazıları solunum parçacıklarıyla, bazıları kan veya belirli vücut sıvılarıyla, bazıları vektörlerle taşınır. Tek bir virüs için verilen yolu bütün virüslere genelleme. Enfeksiyon oluşması uygun giriş ve konak koşullarını da gerektirir; gündelik yakınlık sözcükleri mekanizmanın yerini tutmaz.",
      "Viral taşıyıcılar araştırmada gen aktarımı için düzenlenebilir; bakteriyofajlar moleküler biyolojide önemli deney araçlarıdır. Bir biyoteknolojik taşıyıcının seçilmiş hücreye bağlanması, her hücreye aynı genin gireceğini veya güvenliğin kendiliğinden sağlandığını göstermez. Yapı, hedef ve deneyin ölçtüğü sonucu birlikte kullan; şeklin kolay görünmesi biyolojik sürecin her koşulda aynı olduğu anlamına gelmez.",
    ),
  ],
  examples: [
    example(
      "Bağlanma neden yetmedi?",
      "A ve B canlı hücrelerinin ikisine de V virüsü bağlanıyor. A’da viral kapsid proteini oluşmuyor; B’de yeni virion oluşuyor. Başlangıç miktarı ve süre eşit. Reseptör eksikliği A’nın sonucu için yeterli açıklama mı?",
      "Gerçekleştiği ölçülmüş basamağı, başarısız olabilecek sonraki basamaktan ayır.",
      [
        [
          "Gözlem",
          "A’ya bağlanma doğrudan gözlenmiştir; bağlanmaya uygun yüzey etkileşimi vardır.",
          "A: bağlanma +",
        ],
        [
          "Üretim",
          "A’da protein üretiminin gerçekleşmediği biliniyor; giriş sonrası uyumluluk veya sentez engeli araştırılır.",
          "A: yeni protein −",
        ],
        [
          "Sınır",
          "B sonucu uygun konak sistemini gösterir; A’daki engelin tek moleküler nedeni verilmemiştir.",
          "Bağlanma ≠ üretim",
        ],
      ],
      "Hayır; bağlanma olmuş, sonraki üretim basamağı başarısızdır.",
      "Reseptör hiç çalışmasaydı gözlenen bağlanma da açıklanmalıydı.",
      "Bir basamağın gerekliliğini, bütün sürecin yeterli koşulu sanma.",
    ),
    example(
      "Genom var, kapsid yok",
      "Uygun hücrede viral genom kopyalanıyor. Viral protein sentezi seçici olarak engelleniyor. Dışarıdan hazır kapsid verilmediği bu deneyde tam yeni virion üretimi beklenir mi?",
      "Tam parçacığı kuran iki bileşeni listele.",
      [
        [
          "Genom",
          "Genom kopyaları oluşur; bu sadece kalıtsal bileşeni sağlar.",
          "Genom +",
        ],
        [
          "Kapsid",
          "Protein üretimi engellendiğinden yeni kapsid bileşeni sağlanmaz.",
          "Kapsid −",
        ],
        [
          "Birleştirme",
          "Genomun kapsidle birleşmesi için iki bileşen de gerekir.",
          "Tam virion −",
        ],
      ],
      "Beklenmez; genom artışı tam virion artışı değildir.",
      "Başlangıç parçacıklarının ortamda kalması yeni üretim diye sayılmaz.",
      "Ölçülen genom sayısını bulaştırıcı parçacık sayısıyla özdeşleştirme.",
    ),
    example(
      "Kontrol kabını seç",
      "Üç kaba eşit 100 virion konuyor. Eşit sürede canlı uygun hücre kabı 900’e, öldürülmüş hücre ve hücresiz besiyeri kapları 100’de kalıyor. Bu deneyin en dar sonucu nedir?",
      "Yalnız değiştirilen canlı hücre koşulunu yorumla.",
      [
        [
          "Başlangıç",
          "Üç kap aynı sayıda başlar; başlangıç eşitsizliği yoktur.",
          "100 = 100 = 100",
        ],
        [
          "Değişim",
          "Yalnız uygun canlı hücrede 800 yeni parçacık artışı ölçülmüştür.",
          "900 − 100 = 800",
        ],
        [
          "Çıkarım",
          "Besin veya hücre kalıntısı bu koşulda yeterli olmamıştır.",
          "Canlı konak gerekliliği",
        ],
      ],
      "Bu virüs belirtilen koşullarda yeni üretim için canlı uygun hücresel sisteme bağımlıdır.",
      "Her başka canlı hücrenin de uygun olduğu sonucu çıkmaz.",
      "Tek deneyden tüm türler ve tüm koşullar hakkında sınırsız genelleme kurma.",
    ),
    example(
      "Hedef yoksa gerekçe değişir",
      "Bir madde yalnız bakterilerin peptidoglikan yapımını engelliyor. Virion genom ve kapsid taşırken peptidoglikan duvar taşımıyor. Madde neden doğrudan bu viral yapımı hedeflemez?",
      "İlacın adından önce biyolojik hedefi karşılaştır.",
      [
        [
          "Hedef",
          "Madde peptidoglikan sentez basamağına etki eder.",
          "Bakteriyel duvar",
        ],
        ["Virion", "Virionda bu hücresel duvar yapısı bulunmaz.", "Hedef yok"],
        [
          "Sonuç",
          "Bakteriye etkili olmak, virüsün kapsid veya genom sentezine doğrudan etki kanıtı değildir.",
          "Etki genellenemez",
        ],
      ],
      "Seçilmiş bakteriyel hedef virüste bulunmadığı için.",
      "Virüsün bazı enzimler taşıması peptidoglikan duvar kazandırmaz.",
      "‘Enfeksiyon’ sözcüğünü etken sınıfının yerine kullanma.",
    ),
  ],
  recall: [
    {
      prompt: "Virüste ortak kapsid ile koşullu zarfı nasıl ayırırsın?",
      answer:
        "Kapsid protein kılıftır; lipit zarf yalnız bazı virüslerde bulunur.",
    },
    {
      prompt: "Reseptöre bağlanan virüs neden çoğalamayabilir?",
      answer:
        "Giriş sonrası hücresel uyumluluk ve sentez koşulları sağlanmayabilir.",
    },
    {
      prompt: "Viral genom artışı neyi tek başına kanıtlamaz?",
      answer: "Tam ve bulaştırıcı yeni virion oluştuğunu kanıtlamaz.",
    },
    {
      prompt: "Virüsün taşıdığı polimeraz neden onu hücre yapmaz?",
      answer:
        "Bir enzim ribozom, sitoplazma ve bağımsız metabolizma sistemi sağlamaz.",
    },
    {
      prompt: "Antibiyotik için hangi karşılaştırma önce gelir?",
      answer: "Seçilmiş bakteriyel hedefin virüste bulunup bulunmadığı.",
    },
  ],
  source:
    "MEBİ TYT Biyoloji Konu Özetleri, Virüsler (basılı 98–100); Aurelia Virüsler kopya kağıdının yapı, deney ve hata çözümleme kapsamı. Özgün anlatım, şema ve alıştırmalar; resmî sınav sorusu değildir.",
};

const bacteriaGuide: LessonGuide = {
  id: "bakteri-ve-arke",
  minutes: 75,
  objectives: [
    "Ortak prokaryot yapıları koşullu kapsül, kamçı, plazmit ve endospordan ayır.",
    "Bakteri ile arkeyi birden çok moleküler kanıtla karşılaştır.",
    "Bölünme, yatay DNA aktarımı ve dayanıklılığı farklı sonuçlarla eşleştir.",
    "Enerji, karbon kaynağı ve oksijen gereksinimini ayrı sınıflandır.",
  ],
  sections: [
    section(
      "Çekirdeksiz hücre kalıtsız değildir",
      "Bakteri ve arke hücreleri prokaryot düzenindedir: DNA zarla çevrili çekirdekte değildir; sitoplazma, ribozom ve hücre zarı vardır. Zarlı organellerin bulunmaması hücresel işlevlerin yokluğu değildir. Ribozom protein sentezler; enzimler sitoplazmada veya zarlarla ilişkili bölgelerde çalışır. Bu iki grup tek hücrelidir fakat her tek hücreli canlı prokaryot değildir.",
      "Tipik çizim bir türün fotoğrafı değil, karşılaştırma modelidir. Çoğu okul örneğinde ana kromozom halkasaldır; bunu bütün bakterilerin tek ve değişmez kromozom biçimi diye evrenselleştirme. Plazmitler kromozomdan ayrı kalıtsal elemanlar olabilir. DNA’nın çekirdek zarı dışında bulunması onun işlevsiz veya düzensiz olduğu anlamına gelmez.",
    ),
    section(
      "Duvar, kapsül, pilus ve kamçıyı işleve bağla",
      "Hücre zarı seçici alışveriş sınırıdır. Bakterilerin çoğunda peptidoglikan içeren duvar destek sağlar; duvarsız bakteri örnekleri nedeniyle duvarı bütün bakteriler için mutlak koşul yapmayız. Kapsül bazı türlerde yüzeye tutunma ve korunmaya katkı verir. Kamçı hareketle, bazı piluslar tutunma veya DNA aktarımını kuran etkileşimle ilişkilidir.",
      "Kapsül, kamçı, pilus, endospor veya plazmit her türde ortak değildir. Bakterinin küre veya çomak biçimi kamçı durumunu tek başına belirlemez. Bir yapının çizimde bulunmaması gerçek türde kesin yokluk kanıtı olmayabilir; soru açıkça ‘incelendi ve bulunmadı’ diyorsa gözlem güçlüdür. Yapı sorusunda önce zorunlu ile koşullu sütunlarını ayır.",
    ),
    section(
      "Arkeyi sıcaklık etiketiyle değil kanıtla ayır",
      "Arkeler bakterilerden ayrı bir üst âlem çizgisidir. Çekirdeksizlik ikisinde ortaktır; ayrım için zar lipitleri, ribozomal RNA ve genetik işleyiş gibi moleküler veriler kullanılır. Bakteriyel zarlarda tipik ester bağlı yağ asitleri, arkelerde tipik eter bağlı izopren zincirleri karşılaştırılabilir. Bazı arke zarları tek katlı özel düzenler de kurabilir.",
      "Arkelerde peptidoglikan bulunmaz; bazı türlerde psödopeptidoglikan, bazılarında proteinli yüzey katmanları veya başka duvar düzenleri vardır. ‘Peptidoglikan yok’ tek başına kesin arke demek değildir; duvarsız bakteriler de vardır. Birçok arkede histon proteinleri bulunması önemli bir benzerliktir; bütün arke gruplarını aynı DNA-protein yapısına indirgemeyiz.",
    ),
    section(
      "Beslenme ile ATP üretimini iki ayrı eksende düşün",
      "Ototrof canlı karbon kaynağı olarak CO₂ gibi inorganik karbonu kullanarak organik bileşik üretir. Fotoototrofta enerji ışık, kemoototrofta belirli kimyasal oksidasyonlardan gelir. Heterotrofta organik karbon dışarıdan alınır. Bir bakteri kloroplast taşımadan fotosentez yapabilir; pigment ve ilgili zar düzeni kloroplastla aynı kavram değildir.",
      "Oksijenli solunum, oksijensiz solunum ve fermantasyon enerji elde etme yollarıdır; bütün türlerde aynı yol bulunmaz. Mitokondri yokluğu oksijenli solunumu dışlamaz, çünkü prokaryotta solunumun elektron taşıma basamakları hücre zarıyla ilişkilendirilebilir. Her fotosentetik bakteri oksijen salmaz; siyanobakteri ile oksijensiz fotosentez yapan grupların koşullarını ayır.",
    ),
    section(
      "İkiye bölünmede sayı artar",
      "Bölünmeden önce kalıtsal materyal kopyalanır, hücresel bileşenler ayrılır ve bir hücreden iki hücre oluşur. Prokaryot ikiye bölünmesi mitoz değildir; çekirdek ve mitotik iğ düzeni yoktur. Her hücre aynı sürede bir kez bölünür ve ölüm olmazsa bir kuşak sonunda sayı iki katına çıkar: N = N₀·2ᵏ.",
      "Bu üstel ifade sınırsız gerçek kültür yasası değildir. Besin, atık, yer, sıcaklık ve ölüm sayıyı sınırlar. ‘Yirmi dakika’ bazı uygun kültürler için örnek olabilir; bütün bakterilerin sabit bölünme süresi değildir. Soru bir dönem için bu süreyi açıkça verirse kullan, verilmezse ezberden süre ekleme.",
    ),
    section(
      "DNA aktarımı, üreme ve endospor farklıdır",
      "Konjugasyon seçilmiş verici ve alıcı arasında DNA aktarımı sağlayabilir. Başlangıçta iki hücre varken olay sonunda yine iki hücre olabilir; alıcının kalıtsal içeriği değişirken sayı artmak zorunda değildir. Mutasyon, dönüşüm veya faj aracılı aktarım da çeşitliliğe katkı verebilir. Bakteriler arası tüm gen aktarımlarını aynı türle sınırlı saymayız.",
      "Bazı bakterilerin endosporu elverişsiz koşulda dayanıklı bir duruma geçiştir. Bir hücre bir endospora, ardından uygun koşulda bir etkin hücreye döner; bu hat üzerinde birey sayısı artmaz. Mantarların üreme sporuyla aynı sonuç değildir. Dayanıklılık metabolizmanın hızlı sürdüğü anlamına gelmez; etkin metabolizma ciddi biçimde azalabilir.",
    ),
    section(
      "Arke çeşitliliği: metanojen, halofil ve termofil",
      "Metanojen arkeler uygun oksijensiz koşullarda metan üretir. Aşırı tuzu seven halofil veya yüksek sıcaklığa uyumlu termofil arke türleri vardır. Bu örnekler arkelerin tümünün aşırı koşullarda yaşadığını ya da her arkenin metan ürettiğini göstermez. Denizlerde, toprakta ve canlılarla ilişkili ortamlarda ılımlı koşullarda yaşayan arkeler de bulunur.",
      "Yüksek sıcaklıkta çalışan enzimler endüstriyel süreçler için yararlı olabilir; metanojenler biyogaz oluşumunda rol oynar. Güncel temel öğretimde doğrulanmış klasik arke patojenleri bilinmemesi, gelecekte her ilişki için koşulsuz zararsızlık yasası kurmak değildir. Ekolojik işlevi grubun bütün üyelerine yükleme; ölçülen tür veya sürecin sınırını koru.",
    ),
    section(
      "Madde döngüsü, biyoteknoloji ve direnç",
      "Ayrıştırıcı bakteriler organik maddenin dönüşümüne; belirli türler azotun bağlanması veya başka azot dönüşümlerine katkı sağlar. Yoğurt yapımında laktik asit bakterileri, sirke oluşumunda asetik asit bakterileri örnektir. Gen aktarımıyla düzenlenmiş bakteriler uygun üretim koşullarında protein üretiminde kullanılabilir. Bütün bakterileri patojen saymak bu çeşitliliği siler.",
      "Antibiyotik etkisi hedefe, hücre yapısına ve direnç mekanizmasına bağlıdır; bütün bakteriler aynı duyarlılığı göstermez, arkelerin tüm ilaçlara mutlak dirençli olduğu da söylenmez. Bir kültürde ilaç sonrasında dirençli hücrelerin oranı artabilir; bu durum ilacın gerekli direnç genini amaçlı ürettiğini göstermez. Önceden var olan farklılık ve seçilim ihtimalini kontrol grubuyla değerlendir.",
    ),
  ],
  examples: [
    example(
      "Duvar yokluğu neden yetmez?",
      "X ve Y çekirdeksizdir. X’te peptidoglikan saptanıyor; Y’de saptanmıyor, başka veri yok. İkisini kesin bakteri ve arke diye ayırabilir miyiz?",
      "Pozitif ayırıcı kanıt ile tek başına yetersiz yokluğu ayır.",
      [
        [
          "X",
          "Peptidoglikan prokaryot X için bakteriyi destekler.",
          "X: bakteri",
        ],
        [
          "Y",
          "Duvarsız bakteri olasılığı yalnız bu veriyle elenmez.",
          "Y: ek kanıt gerekir",
        ],
        [
          "Ek inceleme",
          "Zar lipitleri veya moleküler dizilimler sınıflamayı güçlendirir.",
          "Çoklu kanıt",
        ],
      ],
      "X bakteriyle uyumludur; Y’nin arke olduğu kesinleşmez.",
      "İki grup da çekirdeksiz olduğundan çekirdeksizlik ayrım yapmaz.",
      "Bir özellik arkeye uyuyor diye tek olası açıklama sanma.",
    ),
    example(
      "Üç işlemde dört hücre",
      "Başlangıçta 4 bakteri var. Bağımsız üç deneyin birinde her hücre bir kez bölünüyor; diğerinde yalnız DNA aktarımı, üçüncüde her hücre bir endospor oluşturuyor. Ölüm yok. Birey sayıları?",
      "Aynı başlangıçtan üç farklı sonucu ayrı hesapla.",
      [
        ["Bölünme", "Her hücre iki hücreye dönüşür.", "4 × 2 = 8"],
        ["Aktarım", "DNA aktarımı yeni hücre kurmaz.", "4 → 4"],
        ["Dayanıklılık", "Dört hücre dört dayanıklı birime geçer.", "4 → 4"],
      ],
      "Sırasıyla 8, 4 ve 4.",
      "Endosporu hem ana hücre hem yeni yavru diye iki kez sayma.",
      "Genetik değişimi veya dayanıklılığı otomatik çoğalma sanma.",
    ),
    example(
      "Süre verilen büyüme hesabı",
      "Başlangıçta 3 bakteri bulunan seçilmiş kültürde her hücre 30 dakikada bir bölünüyor. İlk 90 dakikada ölüm ve sınırlandırıcı etki olmadığı özellikle belirtilmiş. Son sayı?",
      "Önce kuşak sayısını bul, yalnız verilen zaman aralığında modeli uygula.",
      [
        ["Kuşak", "90 dakika üç bölünme dönemidir.", "90/30 = 3"],
        ["Artış", "Her dönemde sayı iki kat olur.", "3 → 6 → 12 → 24"],
        [
          "Denetim",
          "Üç kat değil, üç kez iki katına çıkma hesaplanır.",
          "3 · 2³ = 24",
        ],
      ],
      "24 bakteri.",
      "Gerçek uzun dönem kültürde bu model besin ve ölüm nedeniyle bozulabilir.",
      "Dakika sayısını doğrudan üssün yerine yazma.",
    ),
    example(
      "Mitokondrisiz solunum",
      "Bir bakteri oksijen tüketiyor ve ATP üretiyor; mitokondri taşımıyor. Solunum elektron taşıma elemanları zarında saptanıyor. Veriler çelişkili mi?",
      "İşlevi yalnız ökaryot organeline bağlama.",
      [
        ["Hücre tipi", "Prokaryotta mitokondri bulunmaz.", "Prokaryot"],
        [
          "Yer",
          "Elektron taşıma basamakları hücre zarıyla ilişkilidir.",
          "Zar + ETS",
        ],
        [
          "Sonuç",
          "Oksijenli solunum mitokondri zorunluluğu olmadan mümkün olabilir.",
          "Çelişki yok",
        ],
      ],
      "Çelişki yok; verilen zar düzeni ATP üretimiyle uyumludur.",
      "Bu gözlem bütün bakterilerin oksijenli solunum yaptığını kanıtlamaz.",
      "Mitokondri yokluğundan bütün ATP üretimini dışlama.",
    ),
  ],
  recall: [
    {
      prompt: "Bakteri ve arkede ortak dört yapıyı say.",
      answer: "Hücre zarı, sitoplazma, DNA ve ribozom.",
    },
    {
      prompt: "Peptidoglikan yokluğu neden kesin arke demek değildir?",
      answer: "Duvarsız bakteriler de bulunur; ek moleküler kanıt gerekir.",
    },
    {
      prompt: "Konjugasyon neden tek başına üreme değildir?",
      answer: "DNA aktarır; birey sayısının artması gerekmez.",
    },
    {
      prompt: "Bakteri endosporu ile mantar sporu aynı sonuç mu?",
      answer:
        "Hayır; ilki dayanıklılık durumu, ikincisi üremeye katılabilen yapıdır.",
    },
    {
      prompt: "Ototrofluk ile oksijenli solunum aynı sınıflama mı?",
      answer:
        "Hayır; biri karbon kaynağı, diğeri enerji metabolizmasıyla ilgilidir.",
    },
  ],
  source:
    "MEBİ TYT Biyoloji Konu Özetleri, Bakteriler ve Arkeler (basılı 77–81); Aurelia Bakteri ve Arke kopya kağıdının ortaklık, deney ve hata çözümleme kapsamı. Koşullu bilimsel anlatım ve özgün alıştırmalar.",
};

const protistGuide: LessonGuide = {
  id: "protista",
  minutes: 65,
  objectives: [
    "Ökaryot ortaklığı ile beslenme, hareket ve organizasyon çeşitliliğini ayır.",
    "Amip, paramesyum, öglena, alg ve parazit örneklerini kanıtlarla karşılaştır.",
    "Kontraktil kofulun görevini ortamın ozmotik koşuluyla açıkla.",
    "Bölünme ve konjugasyonun sonuçlarını ayrı yorumla.",
  ],
  sections: [
    section(
      "Protista bir tek hücre şablonu değildir",
      "Okul sınıflamasında Protista; bitki, hayvan ve gerçek mantar gruplarına yerleştirilmeyen çeşitli ökaryot örnekleri bir araya getirir. Çoğu tek hücrelidir; koloni veya çok hücreli alg örnekleri de vardır. Çekirdekli hücre düzeni temel ortaklıktır. Buna karşılık her örnekte aynı organelin, hücre duvarının, hareket yapısının veya beslenme yolunun bulunması gerekmez.",
      "Modern soy ilişkilerinde geleneksel Protista tek bir doğal soy çizgisi değildir. Bu ders okulun karşılaştırma başlığını kullanırken bütün grubu ‘en ilkel canlılar’ gibi tek basamaklı bir gelişmişlik sırasına sokmaz. Tek hücrelilik prokaryotluk demek değildir; amibin bir hücresi de ökaryottur. Su ortamı veya yeşil renk tek başına sınıflama kanıtı olamaz.",
    ),
    section(
      "Amip: geçici uzantı, hareket ve besin alma",
      "Amip benzeri örnekler yalancı ayak denen geçici sitoplazmik uzantılar çıkarabilir. Bu uzantılar hem hareket hem uygun büyük parçacığı sarmak için kullanılabilir. Zarın parçacığı çevreleyip hücre içine alması fagositozdur. Oluşan besin kofulunda sindirim gerçekleşebilir; sindirim enziminin senteziyle kofulun sindirim ortamı olması farklı görevlerdir.",
      "Amibin değişen biçimi hücre zarının ve iç iskelet düzeninin hareketine dayanır; kalıcı bir bacak değildir. Her amip hastalık etkeni değildir; parazit olan ve serbest yaşayan örnekler ayrılır. Bir canlıda çekirdek ve fagositoz görülmesi, yalnız sucul tek hücreli olması bilgisinden daha güçlü hücresel kanıttır. Bakteriyle benzer küçük boyut aynı hücre tipi anlamına gelmez.",
    ),
    section(
      "Paramesyum: siller ve görev paylaşımı",
      "Paramesyumun yüzeyindeki çok sayıda sil hareket ve besin akışına katılır. Tipik öğretim örneğinde büyük ve küçük çekirdek bulunur; büyük çekirdek günlük hücresel işleyişle, küçük çekirdek eşeysel süreçlerde kalıtsal değişimle ilişkilidir. Besin kofulu, kontraktil koful ve çekirdek aynı görevli boşluklar değildir.",
      "Paramesyum ikiye bölündüğünde hücre sayısı artar. Konjugasyonda eşleşen hücreler kalıtsal bilgi alışverişi yapabilir; olayın kendisi yeni birey sayısını artırmak zorunda değildir. Genetik değişim ile sayı artışı sorularını ayrı çöz. Konjugasyonun bakteri ve paramesyumda kullanılması, iki hücresel mekanizmanın tüm ayrıntılarıyla aynı olduğunu göstermez.",
    ),
    section(
      "Tatlı suda kontraktil koful neden çalışır?",
      "İç çözünenlere göre daha seyreltik tatlı su ortamında su hücreye ozmozla girebilir. Uygun tatlı su protistinin kontraktil kofulu fazla suyu toplayıp uzaklaştırarak hacim dengesine katkı sağlar. Bu düzenek ATP kullanan hücresel süreçlerle desteklenir; ozmotik su girişinin kendisi aktif taşıma diye adlandırılmaz.",
      "Ortam hücreyle izotonik olursa sürekli fazla su girişi beklentisi azalır; kofulun yükü de değişebilir. Bütün protistlerde kontraktil koful bulunması gerekmez. Besin kofuluyla karıştırırsan yanlış işlem önerirsin: biri sindirim ortamı, diğeri su düzenleme görevi taşır. Model tatlı su örneğinde su yükünü gösterir; gerçek hacim, patlama süresi veya bütün türlerin pompalama hızını ölçmez.",
    ),
    section(
      "Öglenada koşul, beslenme sonucunu değiştirir",
      "Seçilmiş öglena örneği çekirdek, kamçı, kloroplast ve ışığa yönelmede rol alan duyusal düzeneklerle gösterilir. Uygun ışıkta fotosentezle organik madde üretebilir. Bazı öglena türleri uygun dış organik maddeleri de kullanabilir; bu çeşitlilik miksotrofi başlığıyla incelenir. Işık algılayan yapı göz veya görme duyusu olarak insan gözüne eşitlenmez.",
      "Karanlıkta fotosentez durur; fakat bundan bütün metabolizmanın anında durduğu çıkmaz. Seçtiğimiz deney örneğinin hazır organik maddeden yararlanabildiği ayrıca belirtilmiştir. Böylece ışık ve besin koşullarını ayrı değiştirerek geçerli sonuç kurarsın. Kamçılı bütün protistlerin kloroplastlı veya miksotrof olduğu genellemesini yapma; bu özellikler seçilmiş örneğindir.",
    ),
    section(
      "Algler: üretici çeşitliliği ve hücre düzeni",
      "Alg adı tek, koloni veya çok hücreli çeşitli fotosentetik ökaryotlar için kullanılabilir. Pigment farkları farklı renkler doğurabilir; yeşil olmak tek seçenek değildir. Sucul besin ağlarının üretici basamağında ve oksijen üretiminde önemlidirler. Bazı gruplarda hücre duvarı bulunur; bütün alglerin duvar bileşimini tek madde sayma.",
      "Çok hücreli bir algin yaprak benzeri görünmesi gerçek kök, gövde, yaprak ve iletim dokularını kanıtlamaz. Okul karşılaştırmasında bitki benzeri protist olmak Bitkiler âlemine otomatik yerleşmek değildir. Bazı yeşil alglerin modern sınıflamada bitkilerle yakın soy ilişkileri ayrıca incelenir; burada tek bir pigmentten tüm sınıflandırmayı üretmiyoruz. Diyatomların silisli yapıları ile genel alg pigmentlerini de ayrı özellikler olarak oku.",
    ),
    section(
      "Parazit ve mantar benzeri örnekler",
      "Plasmodium sıtmaya neden olabilen parazit protist cinsidir; yaşam döngüsünde belirli konaklar ve taşıyıcılar vardır. Parazit örneği bütün protistlerin hastalık yaptığını göstermez. Hücre içi yaşamı onu virüs yapmaz; ökaryot hücresel düzeni önemli bir ayrımdır. ‘Sporlu’ adı da bitki veya mantar sporlarının bütün süreçleriyle özdeşlik kurdurmaz.",
      "Cıvık mantar adı gerçek mantar âlemi anlamına gelmez. Bazı evrelerde amipsi hareket ve fagositoz gibi özellikler görülür; yaşam döngüsünün evresine göre yapı değişebilir. Bu nedenle bir örneğin tek evresinden bütün yaşam boyu aynı biçimi taşıdığı sonucunu çıkarma. Ortak isim yerine çekirdek, hücresel düzen ve beslenme kanıtını kullan.",
    ),
    section(
      "Çeşitliliği ortaklık sorusuna dönüştür",
      "Amip, paramesyum, öglena ve algi karşılaştırırken önce hücre tipi ortak sütununa yazılır. Sonra hareket, fotosentez, fagositoz ve su düzenlemesi örneğe göre doldurulur. ‘Hepsinde’ sorusu bu sütunların kesişimini; ‘bazısında’ sorusu en az bir geçerli örneği ister. Çoğunluk ifadesini tümü anlamına çevirmek sınavdaki temel hatalardandır.",
      "Ekonomik önem de tek görev değildir: algler besin ve endüstriyel ürünlere, bazı protistler ayrıştırmaya, bazıları hastalık süreçlerine katılır. Ekosistemde üretici, tüketici ve ayrıştırıcı rollerini canlı adına göre otomatik atama. Deneyde ışık, karbon kaynağı veya ortam derişimini değiştirirken diğer koşulları sabit tut; değişen sonucun hangi kanıtı desteklediğini bir cümleyle açıkla.",
    ),
  ],
  examples: [
    example(
      "Yeşil olmak hangi kanıtı vermez?",
      "X tek hücreli, çekirdekli, kamçılı ve ışıkta fotosentez yapıyor. Seçilmiş X örneği karanlıkta hazır organik maddeden de yararlanıyor. Hangi beslenme düzeni desteklenir?",
      "Işık ve organik karbon kullanımını ayrı oku.",
      [
        ["Hücre", "Çekirdek ökaryot düzeni destekler.", "Ökaryot"],
        [
          "Işık",
          "Işıkta inorganik karbonla üretim fotoototrofiyle uyumludur.",
          "Fotosentez",
        ],
        [
          "Karanlık",
          "Verilen organik madde kullanımı heterotrof yolu da destekler.",
          "İki yol",
        ],
      ],
      "Miksotrofi; öglena benzeri seçilmiş örnekle uyumludur.",
      "Bu kanıt tek başına bütün kamçılıların aynı olduğunu göstermez.",
      "Kloroplast görünce yalnız üretici seçeneğine kilitlenme.",
    ),
    example(
      "Koful durursa",
      "Tatlı suda yaşayan seçilmiş paramesyumda su sürekli içeri giriyor. Kontraktil kofulun su uzaklaştırma işlevi durduruluyor; başka su dengelemesi değişmiyor. Beklenen ilk sorun?",
      "Giriş ve çıkışı iki ayrı okla düşün.",
      [
        ["Giriş", "Hipotonik dış ortam su girişini sürdürür.", "İçe su +"],
        ["Çıkış", "Koful su uzaklaştırması azalmıştır.", "Dışa su −"],
        [
          "Bilanço",
          "Su birikimi ve hacim artışı eğilimi oluşur.",
          "Giriş > çıkış",
        ],
      ],
      "Fazla su birikimi ve ozmotik denge bozulması.",
      "Bu veriyle kesin patlama zamanı hesaplanmaz.",
      "Kontraktil kofulu sindirim enzimi üreten organel sanma.",
    ),
    example(
      "Aynı sayı, farklı kalıtsal bilgi",
      "İki paramesyum konjugasyona giriyor. Süreç sonunda iki hücre var fakat kalıtsal düzen değişmiş. Üreme gerçekleşmedi demek olayın anlamsız olduğunu mu gösterir?",
      "Birey sayısı ile kalıtsal çeşitliliği ayrı ölç.",
      [
        [
          "Sayı",
          "İki hücre yine iki hücredir; doğrudan sayı artışı yoktur.",
          "2 → 2",
        ],
        [
          "Bilgi",
          "Genetik alışveriş farklı kombinasyonlar sağlayabilir.",
          "Kalıtsal değişim",
        ],
        [
          "Yorum",
          "Sayı artmaması genetik sonuç olmadığı anlamına gelmez.",
          "İki farklı sonuç",
        ],
      ],
      "Hayır; konjugasyon doğrudan sayı artışı olmadan kalıtsal değişim sağlayabilir.",
      "Sonraki bölünmelerin sayı artışı ayrı olaydır.",
      "Çeşitlilik ve çoğalmayı eşanlamlı kullanma.",
    ),
    example(
      "Bir ortak ve bir karşı örnek",
      "Amip, paramesyum, öglena ve çok hücreli bir alg karşılaştırılıyor. Bütün örneklerde çekirdekli düzen var; yalnız bazılarında fotosentez ölçülüyor. Ortak özellik hangisi?",
      "Ortaklığı dört örneğin kesişiminde ara.",
      [
        ["Hücre tipi", "Dördünde ökaryot hücre düzeni vardır.", "4/4"],
        ["Fotosentez", "Amip ve paramesyum heterotroftur.", "Tümünde değil"],
        [
          "Organizasyon",
          "Çok hücreli alg tek hücrelilik genellemesini de bozar.",
          "Tek hücreli ≠ ortak",
        ],
      ],
      "Ökaryot hücre düzeni.",
      "Kamçı veya kontraktil koful da bütün örneklerde zorunlu değildir.",
      "Bir iyi bilinen örneği bütün grup yerine koyma.",
    ),
  ],
  recall: [
    {
      prompt: "Protista için güvenilir ortak hücresel düzen nedir?",
      answer: "Ökaryot hücre düzeni; hareket ve beslenme biçimleri çeşitlidir.",
    },
    {
      prompt: "Amipte yalancı ayak iki hangi işleve katılır?",
      answer: "Hareket ve uygun parçacığı fagositozla alma.",
    },
    {
      prompt: "Tatlı suda kontraktil kofulun yükü neden artabilir?",
      answer: "Ozmozla giren fazla suyu uzaklaştırması gerekir.",
    },
    {
      prompt: "Öglenayı miksotrof diye adlandırırken hangi koşulu belirtirsin?",
      answer:
        "Seçilmiş türün uygun ışıkta fotosentez, uygun organik besinde heterotrofi yapabilmesi.",
    },
    {
      prompt: "Cıvık mantar adı neden sınıflama için yeterli değildir?",
      answer:
        "Ad benzerliği gerçek mantarlarla aynı hücresel ve beslenme düzenini kanıtlamaz.",
    },
  ],
  source:
    "MEBİ TYT Biyoloji Konu Özetleri, Protista (basılı 82–84); Aurelia Protista kopya kağıdının örnekler, su dengesi ve karşılaştırma kapsamı. Okul sınıflaması ve seçilmiş deney varsayımlarıyla özgün öğretim.",
};

const plantsGuide: LessonGuide = {
  id: "bitkiler",
  minutes: 70,
  objectives: [
    "Bitkilerin ortak hücresel düzenini tohum, damar, çiçek ve meyve gibi koşullu özelliklerden ayır.",
    "Dört öğretici bitki grubunu bağımsız kanıtlarla sınıflandır.",
    "Kök, iletim dokusu, yaprak ve üreme yapılarının görevlerini ilişkilendir.",
    "Spor, gamet, tohum ve meyvenin kökenlerini karıştırmadan açıkla.",
  ],
  sections: [
    section(
      "Bitkide ortak düzen ve fotosentez istisnası",
      "Bitkiler ökaryot ve çok hücrelidir; hücre duvarlarının temel bileşenlerinden biri selülozdur. Çoğu bitkide kloroplastlı dokular ışık enerjisiyle su ve CO₂’den organik madde sentezler. Glikozun bir bölümü nişasta olarak depolanabilir. Fakat kök gibi her hücre fotosentez yapmaz; bazı tam parazit bitkiler de gerekli organik maddeyi konaktan sağlar.",
      "Fotosentez yapmak hücresel solunum yapmamak değildir. Bitki hücreleri kullanılabilir enerji için solunumu gündüz ve gece sürdürebilir. Hareketsiz görünmeleri de canlılık işlevlerinin yokluğu anlamına gelmez. Bir soruda ‘bütün bitkiler’ dendiğinde kloroplastı her hücreye, fotosentezi tüm türlere veya çiçeği tüm gruplara yayma.",
    ),
    section(
      "Damarlanma ve gerçek organlar",
      "İletim dokuları su, mineral ve organik maddelerin organlar arasında taşınmasına katılır. Ksilem ve floem bu karşılaştırmanın iki temel adıdır. Damarlı bitkilerde gerçek kök, gövde ve yaprak farklı görevleri üstlenir. Kök topraktan su ve mineral alımına, tutunmaya ve bazı türlerde depolamaya katılır; bitkinin organik besinini genel olarak topraktan hazır aldığı söylenmez.",
      "Kara yosunlarında damar ve gerçek kök düzeni bulunmaz; tutunmaya yarayan rizoidler kökün tüm işlevleriyle eşdeğer değildir. İletim dokusu bulunan eğrelti yine de tohum oluşturmaz. Bu nedenle ‘damar varsa tohum vardır’ kısa yolu geçersizdir. Soruyu taşıma dokusu ve üreme yapısı olarak iki ayrı sütunda çöz.",
    ),
    section(
      "Damarsız ve damarlı tohumsuzları ayır",
      "Kara yosunu damarsız tohumsuz, eğrelti damarlı tohumsuz öğretici örneklerdir. İki grupta da tohum ve meyve bulunmaz; yaşam döngüsünde spor oluşumu yer alır. Tohum yokluğu bu iki grubu birbirinden ayırmaz. Gerçek ayırıcı kanıt damar ve ilgili organ düzenidir.",
      "Spor ile gamet aynı hücre değildir. Bitki döl almaşında diploit sporofit mayozla haploit sporlar, gametofit ise gametler oluşturur; döllenme yeni diploit evreye geçiş sağlar. ‘Spor var, öyleyse bütün yaşam döngüsü eşeysizdir’ sonucu yanlıştır. Temel grupları öğrenirken döngünün hangi evresinin çizildiğini belirtmek bu karışıklığı önler.",
    ),
    section(
      "Açık ve kapalı tohumlunun kanıtı",
      "Çam gibi açık tohumlularda iletim dokusu ve tohum bulunur; tohum taslakları kapalı bir yumurtalığın içinde değildir. Kozalak tohumla ilişkili yapı olabilir fakat meyve değildir. Elma veya buğday gibi kapalı tohumlularda çiçek ve meyveyle ilişkili üreme düzeni bulunur; tohumlar yumurtalık kökenli meyve yapısının içinde yer alır.",
      "‘Tohumlu’ sözcüğü iki grubu birlikte kapsar; meyveli demek değildir. Odunsu gövde de tek başına açık tohumluyu kanıtlamaz, çünkü çok sayıda kapalı tohumlu ağaç vardır. Kanıtları birleştir: damar var + tohum var + meyve yok açık tohumlu örneğe; meyve var kapalı tohumlu örneğe yöneltir. Belirsiz veriyle kesin tür adı üretme.",
    ),
    section(
      "Çiçekte yapı ile ürünü eşleştir",
      "Erkek organın başçığında polen oluşur. Dişi organdaki yumurtalık içinde tohum taslakları bulunur; döllenme sonrası tipik gelişimde tohum taslağı tohuma, yumurtalık meyveye dönüşür. Polen tohum değildir, meyve de tohumun büyümüş hâli değildir. Bir şemayı çözmeden önce yapı–ürün çizgilerini tek tek kur.",
      "Çiçek bulunması her koşulda tohum oluştuğunu göstermez; tozlaşma, döllenme ve gelişme koşulları önemlidir. Bazı bitkilerde döllenmesiz meyve gelişimi de olabildiğinden meyve için bütün türlerde tek zorunlu süreç kurmayız. Örnek soruda ‘tipik döllenme sonrası gelişim’ deniyorsa bu sınır içinde yumurtalık ve tohum taslağı kökenlerini kullan.",
    ),
    section(
      "Yaprak, stoma ve su dengesi",
      "Yaprak yüzeyindeki stoma açıklıkları gaz alışverişi ve terlemeye katılır. Kütikula su kaybını sınırlandırabilir. Kurak ortam uyarlanmalarında yaprak alanının azalması, kalın kütikula veya su depolayan dokular görülebilir; hepsi bütün bitkiler için aynı düzen değildir. Stomaların yalnız alt yüzde olduğu da evrensel bir koşul değildir.",
      "Su kökten alınabilir, iletim dokusuyla taşınır ve yapraklardan buharlaşabilir; bu akışı fotosentezin karbon kaynağıyla karıştırma. Organik maddenin karbonu temel olarak CO₂’den gelir. Aynı bitkide yönelim ve ırganım gibi hareketler de görülebilir; yer değiştirmemesi her türlü hareketi dışlamaz. Dış koşula verilen yanıtın hangi organ ve süreçte olduğunu açıkla.",
    ),
    section(
      "Tek ve çift çenekliler: tek belirtiyi abartma",
      "Okul karşılaştırmasında tek çeneklilerde bir çenek, çoğunlukla paralel damarlanma ve saçak kök; çift çenekli örneklerde iki çenek, çoğunlukla ağsı damarlanma ve kazık kök birlikte incelenir. Buğday bir tek çenekli; fasulye çift çenekli öğretici örnektir. Bunlar kapalı tohumlu kapsamının iç karşılaştırmalarıdır, tüm bitkileri bölmez.",
      "Bir yaprağın yalnız görünüşünden çenek sayısını kesin tayin etmek yerine tohum ve başka kanıtları da ara. Damar örüntüsü ve kök biçimi tipik ilişkiler olarak verilmiştir; her özellik tüm türlerde istisnasız değildir. Sorunun açıkça tanımladığı örnekleri kullan; botanik sınıflandırmanın bütün modern soy ayrıntılarını iki yaprak çizgisine indirgeme.",
    ),
    section(
      "Ekolojik rolü kanıtla ve doğru sırada sınıflandır",
      "Bitkiler birincil üretim, yaşam alanı sağlama, toprağı tutma, su ve karbon döngüleri gibi işlevlere katılır. Besin, ahşap, lif ve çeşitli endüstriyel maddeler bakımından önem taşırlar. ‘Bitki varsa küresel ısınma tamamen engellenir’ gibi tek nedenli sonuçlar kurma; ekosistemde üretim, solunum, ayrışma ve çevresel koşullar birlikte etkilidir.",
      "Sınıflama akışında önce bilineni ve bilinmeyeni ayır. Damar varsa eğrelti ile tohumlular hâlâ adaydır; tohum yok bilgisi eğreltiyi seçer. Sadece meyve yok bilgisi kara yosunu, eğrelti ve çamı ayırmaz. Etkileşimli kanıt ağacı dört öğretici örnek arasında süzme yapar; bütün bitki türleri için otomatik tür teşhis sistemi değildir.",
    ),
  ],
  examples: [
    example(
      "İki kanıtı kesiştir",
      "X bitkisinde iletim demeti var, tohum yok. Dört aday kara yosunu, eğrelti, çam ve elma. Hangi aday kalır?",
      "Damar ve tohum kanıtlarını sırayla uygula.",
      [
        ["Damar", "Kara yosunu elenir; diğer üç örnek damarlıdır.", "3 aday"],
        ["Tohum", "Çam ve elma tohumlu olduğundan elenir.", "1 aday"],
        [
          "Denetim",
          "Eğrelti damarlı ve tohumsuzdur; her iki veriyi sağlar.",
          "Eğrelti",
        ],
      ],
      "Eğrelti; damarlı tohumsuz örnek.",
      "Sporla üreme damarsızlık için yeterli ölçüt değildir.",
      "Tohum yokluğunu damar yokluğu diye okuma.",
    ),
    example(
      "Tohum meyve değildir",
      "Y bitkisinde damar, tohum ve kozalak var; meyve yok. Elma mı çam mı daha uygun öğretici aday?",
      "İki ortak özellikten sonra ayırıcı yapıyı seç.",
      [
        [
          "Ortaklık",
          "Damar ve tohum her iki örnekte bulunabilir.",
          "Damar + tohum",
        ],
        [
          "Ayırıcı",
          "Meyve yok ve kozalak var bilgisi açık tohumlu örneğe uyar.",
          "Meyve −",
        ],
        [
          "Sonuç",
          "Çam modelle uyumludur; kozalak meyve diye etiketlenmez.",
          "Çam",
        ],
      ],
      "Çam, açık tohumlu örnek.",
      "Bu veriler bütün açık tohumlu türler arasında kesin tür teşhisi yapmaz.",
      "Tohumu taşıyan her yapıya meyve deme.",
    ),
    example(
      "Ürünün kökenini bul",
      "Tipik döllenme sonrası gelişen kapalı tohumlu çiçekte P yumurtalık, Q tohum taslağı, R başçık olarak tanımlanıyor. Meyve, tohum ve poleni eşleştir.",
      "Organ adını ürüne giden ayrı okla bağla.",
      [
        ["P", "Yumurtalık meyve gelişiminin temel kökenidir.", "P → meyve"],
        ["Q", "Tohum taslağı döllenme sonrası tohumu oluşturur.", "Q → tohum"],
        ["R", "Başçık polenin oluştuğu yapıdır.", "R → polen"],
      ],
      "P–meyve, Q–tohum, R–polen.",
      "Meyve kökeni ile içinde bulunan tohumun kökeni farklıdır.",
      "Meyveyi tohumun büyümesiyle oluşmuş sanma.",
    ),
    example(
      "Bir bilinmeyen üç aday bırakır",
      "Kara yosunu, eğrelti, çam ve elma arasında yalnız ‘meyve yok’ gözlemi verilmiştir. Türü kesin belirlemek mümkün mü?",
      "Olumsuz kanıtın kaç aday bıraktığını say.",
      [
        ["Eleme", "Elma meyveli örnek olduğundan elenir.", "4 − 1"],
        ["Kalanlar", "Diğer üçünde meyve yoktur.", "3 aday"],
        [
          "Ek veri",
          "Tohum ve damar bilgileri kalanları ayırabilir.",
          "Belirsizlik sürer",
        ],
      ],
      "Hayır; üç aday kalır.",
      "Tek kanıtın sonucu her zaman tek aday olmak zorunda değildir.",
      "Eksik bilgiyi tahminle doldurup kesin sonuç kurma.",
    ),
  ],
  recall: [
    {
      prompt: "Eğrelti ile kara yosununu hangi kanıt ayırır?",
      answer: "İletim dokusu; eğrelti damarlı, kara yosunu damarsızdır.",
    },
    {
      prompt: "Tohumlu bütün bitkiler meyveli midir?",
      answer: "Hayır; açık tohumlularda tohum vardır fakat meyve yoktur.",
    },
    {
      prompt: "Tipik gelişimde tohumun ve meyvenin kökeni?",
      answer: "Tohum taslağı → tohum; yumurtalık → meyve.",
    },
    {
      prompt: "Spor varlığı neden bütün döngünün eşeysizliğini göstermez?",
      answer:
        "Döl almaşında mayoz, gamet oluşumu ve döllenme farklı evrelerde yer alabilir.",
    },
    {
      prompt: "Her bitki hücresi fotosentez yapar mı?",
      answer:
        "Hayır; örneğin tipik kök hücreleri kloroplastlı fotosentetik hücreler değildir.",
    },
  ],
  source:
    "MEBİ TYT Biyoloji Konu Özetleri, Bitkiler (basılı 85–87); Aurelia Bitki kopya kağıdının damar, spor, tohum, meyve ve organ–ürün kapsamı. Koşulları belirtilmiş özgün anlatım ve alıştırmalar.",
};

const fungiGuide: LessonGuide = {
  id: "mantarlar",
  minutes: 65,
  objectives: [
    "Mantarları hücre tipi, duvar, depo ve beslenme kanıtlarıyla ayır.",
    "Dış sindirim ile emilimi doğru sıraya yerleştir.",
    "Hif, miselyum ve üreme gövdesinin farklı ölçeklerini açıkla.",
    "Saprotrofluk, parazitlik, mikoriza ve likeni tarafların sonuçlarıyla karşılaştır.",
  ],
  sections: [
    section(
      "Mantarın hücresi bitkinin kopyası değildir",
      "Mantarlar ökaryot ve heterotroftur; kloroplastla fotosentez yapmazlar. Hücre duvarlarında kitin gibi bileşenler, depo karbonhidratı olarak glikojen bulunabilir. Bu kanıtları birlikte düşünmek hareketsiz ve duvarlı olmayı tek başına ‘bitki’ saymaktan daha güçlüdür. Hayvanlarla paylaşılan glikojen ve heterotrofluk da mantarları hayvan hücresiyle tamamen aynı yapmaz.",
      "Mayalar tek hücreli örneklerdir; küf ve şapkalı mantarlar çoğunlukla çok hücreli düzen gösterir. Çok hücrelilik, şapka veya toprakta yaşama bütün mantarlara ortak değildir. Kitin de tek başına canlı âlemi belirleyen sihirli sözcük değildir; hücresellik, çekirdek ve beslenme düzenini birlikte değerlendir. Mantarların besini yutması yerine emilimle alması temel işlev ayrımıdır.",
    ),
    section(
      "Önce dışarıda parçala, sonra küçük ürünü al",
      "Büyük organik polimerler hücre zarından aynı büyüklükte geçmez. Mantar dışarı enzim salgılayabilir; bu enzim uygun büyük molekülü daha küçük ürünlere parçalar. Çözünmüş küçük ürünler daha sonra zar üzerinden alınır. Dış sindirim ile emilim iki ayrı basamaktır; enzimlerin hücre dışında çalışması enzimlerin orada kendiliğinden oluştuğu anlamına gelmez.",
      "Bir deneyde dış enzimi engellemek, büyük besinden yararlanmayı azaltabilir; doğrudan küçük şeker verilirse sindirim basamağına gerek kalmadan alım mümkün olabilir. Bu karşılaştırma mekanizmayı sınar. Modelde iki üçlü zincirin toplam altı monomer birimi korunur; gerçek sindirim hızı veya ATP bilançosu ölçülmez. Molekül sayısı değişirken madde birimlerinin korunmasını takip et.",
    ),
    section(
      "Hif, miselyum ve görünen şapka",
      "Hif ipliksi mantar yapısıdır; dallanan hifler miselyum denen ağı kurar. Bu ağ substratın içine yayılmayı, yüzey alanını ve besine erişimi artırabilir. Hifler gerçek bitki kökü değildir; su ve besinle ilişkili işlev benzerliği aynı organ kökenini göstermez. Bazı hiflerde bölmeler, bazı düzenlerde çok çekirdekli sürekli sitoplazma görülebilir.",
      "Şapkalı mantarda görünen yapı çoğu zaman spor üretimine katılan üreme gövdesidir; mantarın tümünü yalnız şapka oluşturmaz. Yüzey altındaki miselyumu yok sayarsan organizmanın yayılımını yanlış yorumlarsın. Tek hücreli mayada tipik geniş hif ağı zorunlu değildir; bazı mayalar belirli koşullarda uzamış veya ipliksi düzenler kurabilir. Bir istisnayı yeni bir mutlak kurala çevirmeden temel farkı koru.",
    ),
    section(
      "Ayrıştırma: organik besinden madde döngüsüne",
      "Saprotrof mantarlar ölü organik maddeden yararlanır. Hücre dışı enzimlerle büyük moleküller parçalanır, küçük organik ürünler alınır; metabolik süreçler ve ayrışma sonucunda inorganik maddeler çevreye dönebilir. ‘Enzim dışarıda çalıştı, her ürün anında inorganik oldu’ açıklaması ara basamakları atlar. Dış sindirim ürünleri çoğu kez küçük organik moleküllerdir.",
      "Ayrıştırma madde döngüsüne katkı verir; ekosistemde enerji ise döngüsel olarak yeniden üretilmez, dönüşür ve ısı olarak dağılır. Canlı konaktan zarar vererek beslenen mantar parazit örnektir; ölü yaprağı ayrıştıran mantarla aynı etkileşim sonucu yoktur. Her mantarı hem ayrıştırıcı hem parazit sayma; soru hangi türün hangi kaynağı kullandığını belirtmelidir.",
    ),
    section(
      "Mikorizada iki tarafın kazancını izle",
      "Bazı mantarlar bitki kökleriyle mikoriza ilişkisi kurar. Mantarın geniş hif ağı bitkinin su ve mineral alımına katkı sağlayabilir; bitki de mantara organik karbon verir. Her iki taraf için yarar gösterilmişse ilişki karşılıklı yarar örneğidir. Kök çevresinde mantar bulunması tek başına mikoriza veya yarar kanıtı değildir.",
      "Deneyde mantarlı ve mantarsız bitkileri aynı toprak ve ışıkta karşılaştırırken mineral alımı ve büyümeyi ölçebilirsin. Ancak bitkinin zarar gördüğü veya hiçbir yarar gösterilmediği farklı durumda sonucu yeniden değerlendirmek gerekir. Mantarın organik besin aldığını, bitkinin mineral aldığını ayrı oklarla göster; su ve organik karbonu iki yöne aynı madde diye yazma.",
    ),
    section(
      "Liken bir yaşam birliğidir",
      "Liken oluşumunda mantar ile fotosentetik ortak birlikte yaşar; ortak bir alg veya siyanobakteri olabilir. Fotosentetik ortak organik madde sağlayabilir, mantar yapısı da su, mineral ve korunma koşullarına katkı verir. Birliğin fotosentez yapması mantar hücresinin kloroplast kazandığını göstermez. Aynı yapıda farklı hücresel taraflar bulunur.",
      "Mikorizada bitki kökü, likende fotosentetik ortak farkını kullan. Likenin görünüşü bir tek canlı hücre türü olduğunu kanıtlamaz. Bu ders karşılıklı katkı örneğini temel alır; gerçek ilişkilerin çevreye göre değişebilen maliyetlerini tek bir sonsuz yarar yasasına dönüştürmez. Ortaklığı çözmek için taraf ve madde akışını adlandırmak isim ezberinden daha dayanıklıdır.",
    ),
    section(
      "Üreme sporu, endospor ve maya tomurcuğu",
      "Mantarların eşeysiz veya eşeyli döngülerinde sporlar oluşabilir. Uygun ortamda spor gelişerek yeni mantar düzenine katılabilir; bu nedenle bakteriyel endosporun yalnız dayanıklılık amacıyla bir hücreyi korumasıyla aynı sayı sonucu yoktur. Spor tohum değildir; tohumdaki embriyo ve besin yapısını taşıdığı varsayılmaz.",
      "Mayalarda tomurcuklanma veya bazı türlerde bölünme eşeysiz çoğalmaya örnek olabilir. Eşeyli döngülerin ayrıntıları gruba göre farklılaşır; her mantarın aynı sırada aynı çekirdek evrelerini gösterdiğini söylemeyiz. ‘Spor’ sözcüğünü görünce önce hangi canlı grubu ve hangi süreç soruluyor diye bak. Dayanıklılık kazanmak ile yeni birey oluşturmak ayrı sonuçlardır.",
    ),
    section(
      "Gıda ve ilaç örneklerini doğru gruba bağla",
      "Ekmek hamurunda seçilmiş maya mantarları fermantasyonla CO₂ oluşturarak kabarmaya katkı verir; bazı ürünlerde alkol oluşur. Yoğurt üretiminin temel etkenleri laktik asit bakterileridir. Fermantasyon kelimesi tek başına mantar kanıtı değildir. Bazı küflerden elde edilen antibiyotik örnekleri de bütün mantar türlerinin aynı maddeyi ürettiği anlamına gelmez.",
      "Bazı mantarlar gıda, enzim veya ilaç üretiminde yararlı; bazıları bozulma, toksin veya hastalık nedeniyle zararlı olabilir. Görünüşle yabani mantarın yenilebilirliğine karar verilmez. Sınavda ürün–organizma ve yapı–işlev eşleştirmelerini açık kanıtlarla kur. Tek bir şapka rengi, ‘küf’ ortak adı veya bir fermantasyon ürünü bütün âlemi teşhis etmeye yetmez.",
    ),
  ],
  examples: [
    example(
      "Altı birim nereye gitti?",
      "Kapalı öğretim modelinde hücre dışında her biri üç monomer birimli iki polimer var. Dış enzim bunları tamamen parçalıyor; dört monomer hücreye alınıyor. Dışarıda kaç monomer kalır?",
      "Polimer sayısı yerine toplam yapı birimini koru.",
      [
        [
          "Başlangıç",
          "İki zincir toplam altı monomer birimi içerir.",
          "2 × 3 = 6",
        ],
        [
          "Sindirim",
          "Parçalanma toplamı değiştirmeden altı küçük ürün verir.",
          "6 birim",
        ],
        [
          "Alım",
          "Dört birim içerideyse iki birim dışarıda kalır.",
          "6 − 4 = 2",
        ],
      ],
      "Dışarıda 2, içeride 4 monomer; toplam 6 birim.",
      "Modelde metabolik tüketim ve dış kayıp özellikle yoktur.",
      "Polimerin iki molekül olmasını iki monomer sanma.",
    ),
    example(
      "Enzim kapalı, küçük şeker açık",
      "A kabında büyük nişasta, B’de doğrudan uygun küçük şeker var. Aynı mantarda dış sindirim enzimi baskılanmış; zar alımı korunmuş. Hangi kapta yalnız bu engel aşılmış olur?",
      "Engellenen basamaktan sonraki ürünü bul.",
      [
        [
          "Engel",
          "A’daki büyük besinin önce parçalanması gerekir.",
          "Polimer → küçük ürün",
        ],
        [
          "B",
          "Küçük ürün doğrudan verilmiştir; dış sindirim gerekmeyebilir.",
          "Hazır küçük şeker",
        ],
        [
          "Sınır",
          "Zar alımı ve diğer yaşama koşulları ayrıca korunmuştur.",
          "Engel atlanır",
        ],
      ],
      "B’de dış sindirim engeli atlanmış olur.",
      "Bu deney bütün besinler için sınırsız büyüme garantisi vermez.",
      "Sindirim ile emilimi aynı basamak sayma.",
    ),
    example(
      "Mikorizanın karşılıklı bilançosu",
      "Bitki mantarlı koşulda daha fazla fosfat alıyor; mantar bitkiden organik karbon kazanıyor. Koşullar diğer yönlerden eşit. İlişkiyi ve madde yönlerini belirt.",
      "Tarafların kazancını iki ayrı okla yaz.",
      [
        [
          "Bitki",
          "Mantar hifleri mineral alımına katkı vermiştir.",
          "Mantar → bitki: mineral katkısı",
        ],
        [
          "Mantar",
          "Fotosentetik bitkiden organik karbon alır.",
          "Bitki → mantar: organik karbon",
        ],
        ["İlişki", "İki tarafın da yararı gözlenmiştir.", "Mikoriza"],
      ],
      "Mikoriza; bitkiye mineral alım katkısı, mantara organik karbon.",
      "Her kök mantarı otomatik bu yararlı örnek değildir.",
      "Mantarın fotosentez yaparak bitkiye şeker verdiğini yazma.",
    ),
    example(
      "Bir üretim hatasını onar",
      "Bir tabloda ‘yoğurt: maya mantarı; ekmek: laktik asit bakterisi’ yazıyor. Temel üretici örnekleri bakımından eşleştirmeyi düzelt.",
      "İşlem adından önce ürünün seçilmiş mikroorganizmasını sor.",
      [
        [
          "Yoğurt",
          "Temel fermantasyon etkenleri laktik asit bakterileridir.",
          "Yoğurt → bakteri",
        ],
        [
          "Ekmek",
          "Hamurun kabarmasında seçilmiş maya mantarı kullanılır.",
          "Ekmek → maya",
        ],
        [
          "Denetim",
          "Fermantasyon iki grupta da örneklenebilir; tek gruba özgü değildir.",
          "Ürün ve tür",
        ],
      ],
      "Yoğurt–laktik asit bakterisi; ekmek–maya mantarı.",
      "Bazı başka gıda ürünlerinde karma topluluklar bulunabilmesi bu temel eşleşmeyi bozmaz.",
      "Fermantasyon varsa kesin mantar vardır kuralı kurma.",
    ),
  ],
  recall: [
    {
      prompt: "Mantar büyük besinden yararlanırken iki temel basamak?",
      answer:
        "Önce dış enzimle küçük ürünlere sindirim, sonra ürünlerin emilimi.",
    },
    {
      prompt: "Hif ve miselyum nasıl ilişkilidir?",
      answer: "Hif ipliksi yapı; miselyum hiflerin oluşturduğu ağdır.",
    },
    {
      prompt: "Mikorizada bitki ve mantarın örnek kazancı?",
      answer: "Bitki su/mineral alımı; mantar organik karbon.",
    },
    {
      prompt: "Likenin fotosentezi mantarın kloroplastlı olduğunu gösterir mi?",
      answer: "Hayır; fotosentetik ortak alg veya siyanobakteridir.",
    },
    {
      prompt: "Mantar sporu neden bakteriyel endosporla aynı değildir?",
      answer:
        "Mantar sporu üremeye katılabilir; bakteriyel endospor bir hücrenin dayanıklı durumudur.",
    },
  ],
  source:
    "MEBİ TYT Biyoloji Konu Özetleri, Mantarlar (basılı 88–89); Aurelia Mantar kopya kağıdının yapı, dış sindirim, ekolojik ortaklık ve üretim kapsamı. Özgün modeller ve alıştırmalar; resmî soru değildir.",
};

const virusQuestions: Question[] = [
  question(
    "f011-viruses-1",
    "Protein kapsid ve RNA genomu taşıyan bir parçacığın sitoplazma ve ribozomu yoktur. Parçacık yalnız uygun canlı hücrede yeni parçacıklar oluşturuyor. Hangi yorum yapısal verilerle uyumludur?",
    [
      "Hücresel olmayan bir virüs örneği olabilir",
      "Kesinlikle tek hücreli bakteridir",
      "Kendi ribozomuyla protein sentezler",
      "Mutlaka lipit zarf taşır",
      "RNA taşıdığı için kalıtsal bilgi taşıyamaz",
    ],
    0,
    "Hücre olmak için kapsid ve genomdan fazlası gerekir.",
    "Kapsid, genom ve konak bağımlı üretim virüsle uyumludur. Ribozom ve sitoplazma yokluğu bakteriyel hücre düzenini desteklemez; bağımsız protein sentezi çıkarılamaz. Lipit zarf yalnız bazı virüslerde bulunur. RNA da kalıtsal bilgi taşıyabilir; DNA yokluğu kalıtsızlık değildir.",
    "viral-yapi",
  ),
  question(
    "f011-viruses-2",
    "V virüsü A ve B canlı hücrelerine bağlanabiliyor. Yalnız B’de yeni virionlar oluşuyor. İki hücre için başka moleküler veri verilmemiştir. Hangi çıkarım en sınırlıdır?",
    [
      "A’da uygun yüzey etkileşimi kesin yoktur",
      "Bağlanma tek başına başarılı üretim için yeterli değildir",
      "B’de virüs ikiye bölünerek çoğalmıştır",
      "A’da virüsün genomu kesin değişmiştir",
      "A ve B’nin bütün proteinleri aynıdır",
    ],
    1,
    "Gözlenen bağlanma ile yeni üretimi ayrı basamak say.",
    "Bağlanma her iki hücrede ölçülürken üretim yalnız B’de vardır; bu nedenle bağlanma yeterli koşul değildir. A’nın engeli giriş sonrası bir basamakta olabilir fakat kesin molekülü verilmemiştir. Virüs ikiye bölünen hücre değildir. Genom değişimi ve tüm protein eşitliği de bu deneyde ölçülmemiştir.",
    "konak-uyumlulugu",
  ),
  question(
    "f011-viruses-3",
    "Seçilmiş virüs deneyinde yeni genom kopyaları oluşuyor. Viral kapsid proteinlerinin üretimi tamamen durduruluyor ve dışarıdan hazır kapsid sağlanmıyor. Hangi sonuç beklenir?",
    [
      "Genom kopyası yok olur",
      "Virüs ribozom kurar",
      "Tam yeni virionların birleşmesi engellenir",
      "Kapsid lipide dönüşür",
      "Virüs bakteriye dönüşür",
    ],
    2,
    "Tam parçacık için gereken genom ve kılıfı ayrı düşün.",
    "Yeni virionun birleşmesi için genom yanında uygun kapsid bileşenleri de gerekir. Protein üretiminin engellenmesi bu bileşeni eksiltir; genom artışı tam virion artışı değildir. Genomun zorunlu yok olması, ribozom kurulması, kapsidin lipide veya virüsün bakteriye dönüşmesi veriden çıkmaz.",
    "viral-bilesenler",
  ),
  question(
    "f011-viruses-4",
    "Eşit 50 virion üç kaba konuyor. Birinci kap canlı uygun hücre, ikinci öldürülmüş hücre, üçüncü hücresiz besiyeri içeriyor. Eşit süre sonunda sayılar sırasıyla 650, 50 ve 50. Hangi yorum desteklenir?",
    [
      "Besiyeri her virüsü yok etmiştir",
      "Bütün canlı hücreler bu virüse uygundur",
      "Öldürülmüş hücrede bağımsız protein sentezi başlamıştır",
      "Bu koşulda yeni üretim canlı uygun hücresel sisteme bağlıdır",
      "Virüsün kalıtsal materyali yoktur",
    ],
    3,
    "Başlangıç sayısını ve hangi kapta arttığını karşılaştır.",
    "Yalnız canlı uygun hücre kabında 600 parçacıklık artış vardır. Öldürülmüş hücre ve besiyeri bu koşulda yeterli olmamıştır. Sonuç bütün canlı hücrelerin uygun olduğunu göstermez. Hücresiz kapta sayı sıfırlanmadığından tüm virüslerin yok olması da çıkarılamaz; genom yokluğu ve bağımsız sentez için kanıt yoktur.",
    "viral-deney",
  ),
  question(
    "f011-viruses-5",
    "Bir antibakteriyel madde yalnız peptidoglikan sentez basamağını engelliyor. İncelenen virüste genom, protein kapsid ve lipit zarf var. Maddenin virüse doğrudan aynı hedef üzerinden etki etmemesinin gerekçesi hangisi?",
    [
      "Virüs çok büyük olduğu için",
      "Lipit zarf her maddeyi kesin dışladığı için",
      "RNA hiçbir molekülle etkileşmediği için",
      "Virüs hiçbir koşulda protein kullanmadığı için",
      "Virüste peptidoglikan hücre duvarı bulunmadığı için",
    ],
    4,
    "Maddenin biyolojik hedefini yapıyla eşleştir.",
    "Seçilmiş hedef peptidoglikan yapımıdır; viral kapsid veya lipit zarf bu bakteriyel duvar değildir. Boyut, bütün maddeleri dışlayan zarf ya da RNA’nın etkileşmemesi gerekçe olamaz. Virüs protein kullanır; kapsid zaten proteindir. Bu soru belirli hedefin yokluğunu anlatır, tüm maddelere etki yasası kurmaz.",
    "hedef-karsilastirma",
  ),
  question(
    "f011-viruses-6",
    "Seçilmiş litik bakteriyofaj yolunda bağlanma, genomun hücreye ulaşması, viral bileşenlerin sentezi, birleşme ve çıkış gözleniyor. Hangi sıralama geçerlidir?",
    [
      "Bağlanma → genomun ulaşması → sentez → birleşme → çıkış",
      "Çıkış → birleşme → bağlanma → sentez → genomun ulaşması",
      "Birleşme → çıkış → bağlanma → genomun ulaşması → sentez",
      "Sentez → bağlanma → çıkış → genomun ulaşması → birleşme",
      "Bağlanma → çıkış → birleşme → sentez → genomun ulaşması",
    ],
    0,
    "Yeni parçacık çıkmadan önce bileşenler üretilip birleşmelidir.",
    "Tanımlanan modelde önce uygun hücreye bağlanma, ardından genomun ulaşması ve bileşen sentezi gerçekleşir; yeni parçacıklar birleşip çıkar. Diğer sıralamalar çıkışı üretimden veya birleşmeyi bileşen sentezinden önceye koyar. Bu temel litik model bütün virüslerin ayrıntılı giriş ve çıkış yollarının aynı olduğunu söylemez.",
    "viral-sira",
  ),
  question(
    "f011-viruses-7",
    "Bir virionda genomun kopyalanmasında görevli bir polimeraz enzimi saptanıyor. Kendi ribozomu ve bağımsız ATP üretim sistemi yok. Hangi ifade doğrudur?",
    [
      "Enzim taşıdığı için kesin bakteridir",
      "Enzim taşıması bağımsız hücresel metabolizma kurduğu anlamına gelmez",
      "Kendi proteinlerini mutlaka bağımsız sentezler",
      "Bütün virüsler aynı polimerazı taşır",
      "Kalıtsal bilgi taşıması mümkün değildir",
    ],
    1,
    "Tek enzim ile bütün bir hücresel sistemi ayır.",
    "Bazı virionlar enzim taşıyabilir; bu, ribozom ve bağımsız enerji metabolizması sağlamaz. Enzim saptanması bakteriye dönüşme veya bütün virüslerde aynı enzimin varlığı kanıtı değildir. Verilen parçacık genom taşır; kalıtsızlık sonucu yanlıştır. Protein sentezi için konak hücrenin sistemi önemini korur.",
    "viral-enzim",
  ),
  question(
    "f011-viruses-8",
    "Bir virüs popülasyonunda çoğalma sırasında bazı kalıtsal değişiklikler oluşuyor; belirli çevrede bunların bir bölümü daha fazla yayılıyor. Hangisi bu veriyi aşar?",
    [
      "Popülasyonda genetik çeşitlilik bulunabilir",
      "Çevresel koşullar varyantların yayılımını etkileyebilir",
      "Her mutasyon virüsü mutlaka yeni bir konak türüne geçirir",
      "Virüsün kalıtsal materyali değişebilir",
      "Yeni varyantlar aynı başarıyla yayılmak zorunda değildir",
    ],
    2,
    "Kalıtsal değişim varlığı ile her değişimin zorunlu sonucunu ayır.",
    "Her mutasyonun yeni konak türü sağladığı genellemesi geçersizdir; etkiler nötr, zararlı veya koşula göre yararlı olabilir. Diğer seçenekler gözlenen kalıtsal çeşitlilik ve farklı yayılım ile uyumludur. Bu deney bir mutasyon hızı veya bütün viral gruplar için değişmez konak sonucu vermemektedir.",
    "viral-degisim",
  ),
  question(
    "f011-viruses-9",
    "X virüsünde lipit zarf var; Y virüsünde lipit zarf yok. Her ikisinde protein kapsid ve genom saptanıyor. Hangi sonuç geçerlidir?",
    [
      "Y kesin hücredir",
      "X’te kapsid bulunamaz",
      "Y’nin genom taşıması imkânsızdır",
      "Lipit zarf bütün virüsler için zorunlu yapı değildir",
      "Her ikisinde ribozom bulunması zorunludur",
    ],
    3,
    "İki geçerli örneğin ortak ve farklı yapısını karşılaştır.",
    "Y örneği genom ve kapsidli fakat zarfsızdır; bu, zarfın bütün virüslere zorunlu olmadığını doğrudan gösterir. Zarf kapsidi ortadan kaldırmaz. Virüsün ribozomu bulunmaz ve zarfsızlık hücresellik anlamına gelmez. Genomun varlığı da zarf koşuluna bağlanamaz.",
    "viral-ortaklik",
  ),
  question(
    "f011-viruses-10",
    "K deneyinde viral genom sayısı, L deneyinde hücre dışına çıkmış tam virion sayısı ölçülüyor. K artarken L sabit kalıyor; başka ölçüm yok. Hangi yorum verinin sınırına uygundur?",
    [
      "Tam yeni virion artışı kesin ölçülmüştür",
      "İki ölçüm zorunlu aynı değişkendir",
      "Her genom kopyası otomatik yeni viriondur",
      "Virüsün enerji üretimi bağımsızlaşmıştır",
      "Genom kopyalanması artmış olabilir; birleşme veya çıkış ayrıca incelenmelidir",
    ],
    4,
    "Kalıtsal bileşen ile tamamlanmış parçacığın sayımı farklıdır.",
    "Genom sayımı tam ve dışarı çıkmış parçacık sayımıyla aynı değildir. Kopyalar artarken kapsid üretimi, birleşme veya çıkış sınırlı olabilir; hangisinin engellendiği ayrıca ölçülmelidir. Diğer seçenekler ölçülmeyen üretimi, iki değişkenin eşitliğini veya bağımsız metabolizmayı kanıtsız kabul eder.",
    "olcum-ayrimi",
  ),
];

const bacteriaQuestions: Question[] = [
  question(
    "f011-prokaryotes-1",
    "Bir hücrede DNA, ribozom, sitoplazma ve hücre zarı bulunuyor; zarla çevrili çekirdek yok. Başka veri verilmemiş. En sınırlı sonuç nedir?",
    [
      "Prokaryot düzenle uyumludur; bakteri–arke ayrımı için ek kanıt gerekir",
      "Kesin arke değildir",
      "Kesin mantardır",
      "Protein sentezleyemez",
      "DNA taşımadığı kanıtlanmıştır",
    ],
    0,
    "Çekirdeksizlik iki farklı prokaryot grupta görülebilir.",
    "Verilen ortak yapılar prokaryot hücre düzeniyle uyumludur. Bakteri ve arke ayrımı için duvar, zar veya moleküler veriler gerekir. Mantar ökaryottur; ribozom protein sentezini mümkün kılar ve DNA zaten gözlenmiştir. Çekirdek yokluğu kalıtsal materyal yokluğu değildir.",
    "prokaryot-ortaklik",
  ),
  question(
    "f011-prokaryotes-2",
    "X prokaryotunun duvarında peptidoglikan var. Y’de peptidoglikan saptanmıyor; Y için başka yapı bilgisi yok. Hangi sonuç güvenilirdir?",
    [
      "Y kesin arke olduğu için ek veri gereksizdir",
      "X bakteriyi destekler; Y’nin arke olduğu tek başına kesinleşmez",
      "X kesin ökaryottur",
      "Y’de DNA bulunamaz",
      "İki örnek mutlaka aynı türdür",
    ],
    1,
    "Duvarsız bakteriler yokluk kanıtını nasıl sınırlar?",
    "Peptidoglikan X’i bakterilerle eşleştirir. Y’de yokluğu arkeye uyabilir fakat duvarsız bakteri olasılığını tek başına elemez; ek moleküler kanıt gerekir. DNA yokluğu, ökaryotluk ve aynı tür sonucu bu ölçümden çıkmaz. Pozitif ayırıcı veriyle yetersiz olumsuz veriyi ayırmak gerekir.",
    "duvar-kaniti",
  ),
  question(
    "f011-prokaryotes-3",
    "İncelenen 4 bakterinin her biri bir kez ikiye bölünüyor. Ölüm ve başka olay yok. Son birey sayısı kaçtır?",
    ["2", "4", "8", "12", "16"],
    2,
    "Her başlangıç hücresi iki yavru hücre verir.",
    "Bir kuşakta 4 başlangıç hücresi 4×2=8 hücre oluşturur. Dörtte kalmak sayı artışını yok sayar; 16 iki kuşak bölünmeye, 12 ise verilen tek bölünmeyle uyuşmayan bir artışa karşılık gelir. Soru yalnız bir kuşağı tanımlar; genel süre veya sınırsız kültür büyümesi varsayılmaz.",
    "bolunme-sayimi",
  ),
  question(
    "f011-prokaryotes-4",
    "İki bakteriden verici olanı alıcıya plazmit DNA aktarıyor. Bu sırada hücre bölünmesi ve ölüm yok. Hangi sonuç beklenir?",
    [
      "Hücre sayısı dört olur",
      "Alıcı kesin mitokondri kazanır",
      "Verici kesin çekirdek oluşturur",
      "Hücre sayısı iki kalabilir; alıcının kalıtsal içeriği değişebilir",
      "Plazmit DNA olamayacağı için deney imkânsızdır",
    ],
    3,
    "Aktarılan şeyi ve yeni hücre oluşup oluşmadığını ayrı izle.",
    "Konjugasyonla DNA aktarımı alıcının kalıtsal içeriğini değiştirebilir; bölünme olmadığından birey sayısının artması gerekmez. Plazmit DNA içerebilir fakat çekirdek veya mitokondri oluşturmaz. Dört hücre sonucu gen aktarımını yeni birey oluşumuyla karıştırır.",
    "dna-aktarimi",
  ),
  question(
    "f011-prokaryotes-5",
    "Bir bakteri tek endospor oluşturuyor. Uygun koşullar geri geldiğinde bu endospordan tek etkin hücre gelişiyor; başka bölünme yok. Hangi yorum doğrudur?",
    [
      "Endospor iki yeni birey oluşturmuştur",
      "Olay kesin eşeyli üremedir",
      "DNA ortadan kalkmıştır",
      "Bu yapı mantarın çok sayıda üreme sporuyla aynı sayı sonucunu verir",
      "Dayanıklılık durumu sağlanmıştır; bu hat üzerinde birey sayısı artmamıştır",
    ],
    4,
    "Başlangıçtaki ve son etkin bireyi say.",
    "Bir hücre→bir endospor→bir etkin hücre hattı sayıyı artırmaz; dayanıklılık ve yeniden etkinleşme anlatır. Endosporu ana hücreye ek bir yavru saymak yanlış olur. Bu olay eşeyli üreme veya DNA yokluğu değildir; mantarın üreme sporunun oluşturduğu yeni bireylerle aynı şekilde sayılmaz.",
    "endospor",
  ),
  question(
    "f011-prokaryotes-6",
    "Oksijen tüketerek ATP üreten bir bakteride mitokondri yok; elektron taşıma elemanları hücre zarında saptanıyor. Hangi yorum uygundur?",
    [
      "Prokaryotta oksijenli solunum mitokondri olmadan da gerçekleşebilir",
      "Oksijen tüketimi mutlaka kloroplast gerektirir",
      "Veriler bakterinin mantar olduğunu kanıtlar",
      "Hücre zarı ATP üretim süreçleriyle ilişkili olamaz",
      "Bütün bakteriler aynı solunumu yapmak zorundadır",
    ],
    0,
    "İşlev ile ökaryotik organeli özdeşleştirme.",
    "Prokaryotlarda oksijenli solunumun zarla ilişkili basamakları mitokondri olmadan yürüyebilir. Kloroplast oksijen tüketimi için zorunlu değildir. Tek örneğin metabolizması tüm bakterilere genellenemez. Verilen bulgu hücreyi mantar yapmaz ve zarın enerji süreçlerine katılmasını dışlamaz.",
    "prokaryot-solunum",
  ),
  question(
    "f011-prokaryotes-7",
    "Bir arke örneği normal tuzlulukta ve ılımlı sıcaklıkta yaşamını sürdürüyor. Bu gözlem hangi genellemeyi doğrudan çürütür?",
    [
      "Arkeler prokaryot düzenindedir",
      "Bütün arkeler yalnız aşırı koşullarda yaşayabilir",
      "Bazı arkeler yüksek sıcaklığa uyumludur",
      "Arke ve bakteride DNA bulunabilir",
      "Metanojen arke örnekleri vardır",
    ],
    1,
    "Tek karşı örnek yalnız hangi tümel önermeyi bozar?",
    "Ilımlı koşulda yaşayan geçerli arke örneği, bütün arkelerin yalnız aşırı ortamlarda yaşayabileceği önermesini çürütür. Bazı türlerin sıcaklığa uyumu veya metanojen örneklerin varlığı bununla çelişmez. Prokaryot düzen ve DNA varlığı da sıcaklık koşulundan dolayı ortadan kalkmaz.",
    "arke-cesitliligi",
  ),
  question(
    "f011-prokaryotes-8",
    "Seçilmiş bir bakteri karanlıkta belirli inorganik maddeleri oksitleyerek elde ettiği enerjiyle CO₂’den organik madde üretiyor. En uygun beslenme yorumu hangisi?",
    [
      "Işık zorunlu fotoototrofluk",
      "Yalnız dışarıdan organik karbon alma",
      "Kemoototrofluk",
      "Kesin fagositoz",
      "Bağımsız virion üretimi",
    ],
    2,
    "Enerji kaynağı ve karbon kaynağını ayrı belirle.",
    "Enerji kimyasal oksidasyondan, organik maddenin karbonu CO₂’den geliyor; bu kemoototroflukla uyumludur. Fotoototrofluk ışığı enerji kaynağı ister. Dış organik karbon, fagositoz veya viral üretim verilmemiştir. Karanlıkta üretim görülmesi fotosentez sürdüğü anlamına gelmez.",
    "enerji-karbon",
  ),
  question(
    "f011-prokaryotes-9",
    "Başlangıçta 5 bakterilik kültürde her hücre 40 dakikada bir bölünüyor. İlk 80 dakikada ölüm ve sınırlandırıcı etki olmadığı verilmiş. Son sayı kaçtır?",
    ["10", "15", "16", "20", "40"],
    3,
    "Seksen dakikada kaç bölünme dönemi var?",
    "80/40=2 kuşak vardır. Sayı 5→10→20 biçiminde iki kez iki katına çıkar: 5·2²=20. On tek kuşak, kırk üç kuşak sonucudur; diğer sayılar verilen modelle uyuşmaz. Bu hesap yalnız sorunun koşulları açıkça koruduğu dönem için geçerlidir.",
    "bakteri-buyume",
  ),
  question(
    "f011-prokaryotes-10",
    "Bir araştırmacı bakteride ortak yapı arıyor. Seçeneklerde ribozom, kamçı, kapsül, endospor ve plazmit var. Hangisi temel hücresel protein senteziyle ilişkili ortak yapıdır?",
    ["Kamçı", "Kapsül", "Endospor", "Plazmit", "Ribozom"],
    4,
    "Hareket veya dayanıklılık değil protein üretimi soruluyor.",
    "Ribozom hücresel protein sentezini yapar ve temel ortak yapıdır. Kamçı, kapsül, endospor ve plazmit bazı tür veya koşullarda bulunabilir; hepsine zorunlu değildir. Sorunun ortaklık ölçütü ile bir çizimde gösterilen zengin yapı listesini karıştırmamak gerekir.",
    "zorunlu-kosullu",
  ),
];

const protistQuestions: Question[] = [
  question(
    "f011-protists-1",
    "Amip, paramesyum, öglena ve çok hücreli bir alg okulun Protista başlığı altında karşılaştırılıyor. Hangisi bu dört örneğin hücresel ortaklığıdır?",
    [
      "Ökaryot hücre düzeni",
      "Yalnız tek hücrelilik",
      "Hepsinde kamçı",
      "Hepsinde fotosentez",
      "Hepsinde parazit beslenme",
    ],
    0,
    "Organizasyon, hareket ve beslenme çeşitlenirken hücre tipi korunur.",
    "Dört örnekte ökaryot hücre düzeni vardır. Çok hücreli alg tek hücrelilik genellemesini bozar; amip ve paramesyum fotosentez yapmaz. Kamçı ve parazitlik de tüm örneklere ortak değildir. Okulun Protista başlığını tek bir beslenme veya hareket tipine indirgememek gerekir.",
    "protist-ortaklik",
  ),
  question(
    "f011-protists-2",
    "Seçilmiş bir amip, geçici sitoplazmik uzantıyla büyük bir besin parçacığını sarıp zar kesesi içinde hücreye alıyor. Hangi yapı–işlem eşleştirmesi uygundur?",
    [
      "Sil–fotosentez",
      "Yalancı ayak–fagositoz",
      "Kamçı–protein sentezi",
      "Hücre duvarı–ATP sentezi",
      "Kontraktil koful–polen üretimi",
    ],
    1,
    "Geçici uzantıyı ve büyük parçacığın alınmasını birlikte tanı.",
    "Yalancı ayak amipsi hareket ve parçacığı sarmaya katılır; büyük parçanın zarla alınması fagositozdur. Siller veya kamçı burada tanımlanan yapı değildir. Protein sentezi, polen ve fotosentez de verilen gözlemin karşılığı değildir. Yapıyı yalnız hareketle sınırlamadan besin alma işleviyle ilişkilendir.",
    "yalanci-ayak",
  ),
  question(
    "f011-protists-3",
    "Tatlı suda yaşayan seçilmiş paramesyum sürekli ozmozla su alıyor. Kontraktil kofulun işlevi hangisidir?",
    [
      "Genomu kapsidle sarmak",
      "Hücre dışında nişasta sindirmek",
      "Fazla suyu uzaklaştırarak hacim dengesine katkı sağlamak",
      "Polen üretmek",
      "Fotosentezle bütün suyu yok etmek",
    ],
    2,
    "Ortamdaki su girişinin bilançosunu düşün.",
    "Kontraktil koful fazla suyu uzaklaştırarak tatlı su hücresinin ozmotik dengesine katkı verir. Sindirim, viral kapsid veya polen görevleri farklı yapılara aittir. Bu işlem bütün protistlerin aynı kofulu taşıdığını göstermez; verilen tatlı su ve sürekli giriş koşulları önemlidir.",
    "kontraktil-koful",
  ),
  question(
    "f011-protists-4",
    "Seçilmiş öglena örneği uygun ışıkta fotosentez yapıyor; karanlıkta uygun dış organik maddeden yararlanabiliyor. Bu iki gözlemin birlikte yorumu nedir?",
    [
      "Bütün hücreleri prokaryottur",
      "Yalnız zorunlu parazittir",
      "Karanlıkta da ışık enerjisi üretir",
      "Miksotrof beslenme gösterebilir",
      "Her kamçılı protist aynı özelliktedir",
    ],
    3,
    "Aynı örnekte iki farklı karbon kazanma yolu verilmiş.",
    "Uygun ışıkta üretim ve uygun organik besinden yararlanma, seçilmiş örnek için miksotrofiyle uyumludur. Karanlıkta fotosentez olduğu söylenmemiştir. Sonuç bütün kamçılılara genellenemez ve ökaryot örneği prokaryot yapmaz. Parazitlik de dış organik madde kullanmanın zorunlu tek biçimi değildir.",
    "miksotrofi",
  ),
  question(
    "f011-protists-5",
    "İki paramesyum arasında konjugasyon görülüyor. Bölünme ve ölüm yok; olay sonunda iki hücre kalıyor. Hangi ifade doğrudur?",
    [
      "Sayı artmadığından kalıtsal değişim imkânsızdır",
      "İki hücre mutlaka dört olmalıdır",
      "Olay hücre duvarı sentezidir",
      "Konjugasyon kesin fotosentezdir",
      "Kalıtsal değişim olabilir; konjugasyon doğrudan birey sayısını artırmak zorunda değildir",
    ],
    4,
    "Sayı ve genetik bilgiyi iki ayrı sonuç olarak değerlendir.",
    "Konjugasyon kalıtsal bilgi alışverişiyle çeşitliliğe katkı sağlayabilir fakat olayın kendisi yeni hücre oluşturmayabilir. İki hücrenin iki kalması çelişki değildir. Bölünme olmadığı için dört hücre beklemek yanlıştır; fotosentez veya duvar sentezi sonucu da verilmemiştir.",
    "protist-konjugasyon",
  ),
  question(
    "f011-protists-6",
    "X tek hücreli ve sucul; başka veri yok. Y tek hücreli, çekirdekli ve büyük parçacığı fagositozla alıyor. Hangisi kanıtın sınırını korur?",
    [
      "X’in Protista olduğu kesin değildir; Y ökaryot düzeni destekler",
      "X kesin bakteridir",
      "Y kesin virüstür",
      "Tek hücrelilik her iki hücreyi prokaryot yapar",
      "Fagositoz ribozomun görevidir",
    ],
    0,
    "Ortam ve hücre sayısı, çekirdek kanıtının yerini tutmaz.",
    "Tek hücreli sucul canlı bakteri veya protist gibi farklı gruplara uyabilir; X için kesin sınıflama yapılamaz. Y’de çekirdek ve fagositoz ökaryot hücresel düzeni destekler. Virüs hücre değildir; tek hücrelilik prokaryotlukla özdeş değildir. Fagositoz ribozomun protein sentezi göreviyle karıştırılmaz.",
    "protist-kanit",
  ),
  question(
    "f011-protists-7",
    "Bir cıvık mantar örneğinin belirli evresinde amipsi hareket ve parçacıkları yutarak beslenme gözleniyor. İsminde ‘mantar’ geçmesine dayanarak ne söylenebilir?",
    [
      "Kesin gerçek Mantarlar âlemindedir",
      "Ortak isim yeterli değildir; hücresel ve beslenme kanıtlarıyla sınıflama gerekir",
      "Kesin kloroplast taşır",
      "Bütün yaşam evreleri aynı görünüştedir",
      "Hiçbir kalıtsal materyali yoktur",
    ],
    1,
    "Ad benzerliğiyle biyolojik akrabalığı özdeşleştirme.",
    "Cıvık mantarlar okul karşılaştırmasında protist örneklerdir; ortak isim gerçek mantar âlemini kanıtlamaz. Yaşam döngüsü evreleri değişebilir. Gözlenen beslenme kloroplast, kalıtsızlık veya bütün evrelerin aynı biçimde olması sonucunu vermez. İsim yerine gerçek yapısal kanıt kullanılmalıdır.",
    "ortak-ad",
  ),
  question(
    "f011-protists-8",
    "Seçilmiş tatlı su protisti izotonik dış ortama aktarılıyor. Zar bütünlüğü ve diğer koşullar korunuyor. Başlangıçtaki sürekli fazla su girişine göre hangi beklenti daha uygundur?",
    [
      "Su moleküllerinin tüm hareketi biter",
      "Bütün kofullar hücreden atılır",
      "Sürekli net su girişinin yükü azalabilir",
      "Hücre otomatik bakteriye dönüşür",
      "Fotosentez zorunlu başlar",
    ],
    2,
    "Net akış ile moleküler hareketi ayır.",
    "İzotonik ortamda sürekli net su girişinin yükü azalabilir; iki yöndeki su hareketi tamamen durmaz. Bu koşul kofulların atılması, bakteriye dönüşme veya fotosentezin zorunlu başlamasını gerektirmez. Sonucu yalnız ozmotik farkın azalması ve verilen korunmuş koşullar düzeyinde tutmak gerekir.",
    "protist-ozmoz",
  ),
  question(
    "f011-protists-9",
    "Çok hücreli bir algde fotosentez ve pigmentler görülüyor; gerçek kök, gövde, yaprak veya iletim dokusu kanıtı verilmemiş. Hangi çıkarım geçersizdir?",
    [
      "Ökaryotik alg örneği olabilir",
      "Fotosentetik üretime katılabilir",
      "Pigmentleri farklı renkler sağlayabilir",
      "Fotosentez yapması tek başına damarlı kara bitkisi olduğunu kanıtlar",
      "Çok hücrelilik tek hücrelilik genellemesini sınırlar",
    ],
    3,
    "İşlev ortaklığı tüm organ düzenini kanıtlamaz.",
    "Fotosentez alglerde de bulunabilir; tek başına damarlı kara bitkisi veya gerçek kök–gövde–yaprak kanıtı değildir. Diğer seçenekler verilen alg ve pigment gözlemleriyle uyumludur. Hücresel organizasyon ve taşıma dokuları ayrıca incelenmeden tek işlevden bütün sınıflama çıkarılamaz.",
    "alg-bitki-ayrimi",
  ),
  question(
    "f011-protists-10",
    "Plasmodium örneği konak hücreleriyle ilişkili parazit bir ökaryottur. Hangi yorum verileri aşar?",
    [
      "Protistler içinde parazit örnekler bulunur",
      "Hücre içi yaşam tek başına virüs olmayı göstermez",
      "Ökaryot düzeni prokaryot hücreden ayrılır",
      "Bir protist konaktan yararlanabilir",
      "Bütün protistler parazittir ve aynı hastalığı yapar",
    ],
    4,
    "Bir örneğin özelliğini grubun tümüne yayma.",
    "Plasmodium’un parazitliği bütün protistlerin parazit veya aynı hastalığın etkeni olduğu sonucunu vermez. Amip, alg ve diğer örneklerde farklı yaşam biçimleri vardır. Ökaryot hücresellik virüsten önemli ayrımdır; konak hücre içinde bulunmak tek başına virüs sınıflaması kurmaz.",
    "protist-genelleme",
  ),
];

const plantQuestions: Question[] = [
  question(
    "f011-plants-1",
    "Dört öğretici bitki adayı kara yosunu, eğrelti, çam ve elmadır. X’te iletim dokusu var, tohum yok. Hangisi iki kanıtı birlikte sağlar?",
    ["Eğrelti", "Çam", "Elma", "Kara yosunu", "Dördü de"],
    0,
    "Damar ve tohum bilgisini ayrı ayrı süz.",
    "Eğrelti damarlı tohumsuz örnektir. Kara yosunu damar kanıtını, çam ve elma tohum yokluğu kanıtını sağlamaz. İki özelliğin kesişimi tek adayı bırakır; sporla çoğalma ifadesini doğrudan damarsızlık saymak kara yosunuyla eğreltiyi yanlış birleştirir.",
    "bitki-kanit",
  ),
  question(
    "f011-plants-2",
    "Seçilmiş bitki örneğinde iletim dokusu ve tohum bulunuyor; meyve yok, tohumlar kozalak pullarıyla ilişkili. En uygun grup hangisidir?",
    [
      "Damarsız tohumsuz",
      "Açık tohumlu",
      "Damarlı tohumsuz",
      "Yalnız maya mantarı",
      "Zorunlu bütün kapalı tohumlular",
    ],
    1,
    "Tohum ile meyveyi aynı yapı sayma.",
    "Tohum taşıyıp meyve oluşturmayan kozalaklı öğretici örnek açık tohumludur. Damarsız veya damarlı tohumsuz gruplar tohum bilgisini karşılamaz. Kapalı tohumluda yumurtalık ve meyve düzeni bulunur; mantar örneği de bu bitkisel organ düzeniyle uyumsuzdur.",
    "acik-tohumlu",
  ),
  question(
    "f011-plants-3",
    "Tipik döllenme sonrası gelişen bir çiçekte P yumurtalık, Q tohum taslağı olarak tanımlanıyor. Hangi ürün eşleştirmesi doğrudur?",
    [
      "P–polen, Q–kök",
      "P–tohum, Q–meyve",
      "P–meyve, Q–tohum",
      "P–ribozom, Q–kapsid",
      "P–gamet, Q–stoma",
    ],
    2,
    "Meyvenin ve içindeki tohumun gelişim kökenleri farklıdır.",
    "Tipik gelişimde yumurtalık meyveye, tohum taslağı tohumu oluşturacak yapıya dönüşür. Polen erkek organın başçığıyla ilişkilidir. Diğer eşleştirmeler ürün kökenlerini değiştirir veya ilgisiz hücresel yapılara taşır. Sorunun tipik döllenme sonrası gelişim koşulu korunmalıdır.",
    "organ-urun",
  ),
  question(
    "f011-plants-4",
    "Kara yosunu, eğrelti, çam ve elma için yalnız ‘meyve yok’ bilgisi verilmiş. Başka gözlem yok. Hangi sonuç doğru?",
    [
      "Kesin çamdır",
      "Kesin kara yosunudur",
      "Kesin eğreltidir",
      "İlk üç aday kalır; tek aday için ek kanıt gerekir",
      "Dört adayın hepsi elenir",
    ],
    3,
    "Olumsuz tek kanıtın kaç örnekte sağlandığını say.",
    "Kara yosunu, eğrelti ve çam meyvesiz öğretici örneklerdir; yalnız elma elenir. Dolayısıyla damar veya tohum gibi ek kanıt gerekir. Birden fazla aday varken kesin tür adı vermek ölçülmeyen bilgiyi eklemektir. Model tüm bitkiler değil dört tanımlı örnek arasındaki süzmeyi sınar.",
    "eksik-bitki-kaniti",
  ),
  question(
    "f011-plants-5",
    "Bir öğrenci ‘bitkide spor gördüm, bu yüzden yaşam döngüsünün tamamında döllenme olamaz’ diyor. Hangi yanıt doğrudur?",
    [
      "Spor her zaman tohumdur",
      "Spor her zaman hayvan gametidir",
      "Spor bulunan bütün canlılar bakteridir",
      "Döllenme varsa bitki olamaz",
      "Sporlu bitki döngüsünde farklı evrelerde gamet oluşumu ve döllenme bulunabilir",
    ],
    4,
    "Döngünün tek evresini bütün yaşamın yerine koyma.",
    "Bitki döl almaşında sporofit mayozla spor oluşturabilir; gametofit gamet üretir ve döllenme diploit evreye geçişi sağlayabilir. Sporun bulunması tüm döngüyü eşeysiz yapmaz. Spor tohum veya zorunlu hayvan gameti değildir; bütün sporluları bakteriye veya bitki dışına taşımak hatalıdır.",
    "spor-dongusu",
  ),
  question(
    "f011-plants-6",
    "Tipik bir bitkinin fotosentetik yaprak hücresi ve kloroplast taşımayan kök hücresi inceleniyor. Hangi ifade uygundur?",
    [
      "Her bitki hücresinin fotosentez yapması gerekmez; kök hücresinde solunum sürebilir",
      "Kök hücresi canlı değildir",
      "Bitkide solunum yalnız gece olur",
      "Kloroplast yoksa DNA da yoktur",
      "Kök hücresi otomatik prokaryottur",
    ],
    0,
    "Doku farklılaşmasını hücre tipi ve canlılıkla karıştırma.",
    "Bitkinin bütün hücreleri kloroplastlı fotosentetik hücre değildir. Kök hücresi ökaryot ve canlı olabilir; kullanılabilir enerji için solunum sürer. Solunum yalnız geceye özgü değildir. Kloroplast yokluğu DNA’nın veya çekirdekli hücre düzeninin yokluğu anlamına gelmez.",
    "bitki-hucre",
  ),
  question(
    "f011-plants-7",
    "İki bitkinin ikisi de spor oluşturuyor. Birinde iletim dokusu saptanmazken diğerinde saptanıyor. Bu veri hangi iki öğretici örneği ayırabilir?",
    [
      "Çam ile elma",
      "Kara yosunu ile eğrelti",
      "İki farklı virion",
      "Maya ile bakteri",
      "İki kapalı tohumlu meyve",
    ],
    1,
    "Ortak spor bilgisinden sonra ayırıcı damar kanıtını kullan.",
    "Kara yosunu damarsız tohumsuz, eğrelti damarlı tohumsuzdur. İkisi de sporlu döngü taşırken iletim dokusu farkıyla ayrılır. Çam ve elma tohumlu örneklerdir; diğer seçenekler bitkisel damar–spor karşılaştırmasının konusu değildir. Spor görünce ikisini aynı alt grupta eşitlemek doğru değildir.",
    "damarlanma",
  ),
  question(
    "f011-plants-8",
    "Bir yaprakta stoma açıklıklarının kapanmasıyla su buharı kaybı azalıyor. Bu gözlemin en doğrudan ilişkili olduğu işlev hangisidir?",
    [
      "Kapsid üretimi",
      "DNA’nın tamamen yok olması",
      "Gaz alışverişi ve terleme düzenlenmesi",
      "Meyvenin tohuma dönüşmesi",
      "Bakteriyel endospor oluşumu",
    ],
    2,
    "Değişen ölçüm su buharı kaybıdır.",
    "Stomalar gaz alışverişi ve terlemeyle ilişkilidir; kapanma su buharı çıkışını azaltabilir. Kapsid, endospor veya DNA yokluğu verilmemiştir. Meyve ve tohumun kökenleri ayrı konudur. Bu deney bütün bitkilerde stomaların yalnız aynı yüzeyde bulunduğu sonucunu da vermez.",
    "stoma",
  ),
  question(
    "f011-plants-9",
    "Seçilmiş kapalı tohumlu tohumunda bir çenek, yaprakta tipik paralel damarlanma ve saçak kök birlikte görülüyor. Okul karşılaştırmasında hangi grup desteklenir?",
    [
      "Damarsız tohumsuz",
      "Açık tohumlu",
      "Mantar",
      "Tek çenekli",
      "Kesin bütün çift çenekliler",
    ],
    3,
    "Çenek sayısını ve tipik eşlik eden iki veriyi birlikte kullan.",
    "Bir çenek bilgisi tek çenekliyi destekler; paralel damar ve saçak kök tipik eşlik eden örneklerdir. Bu bitki zaten kapalı tohumlu tanımlandığından açık tohumlu veya tohumsuz seçenekleri uymaz. Yaprak tek başına bütün türlerde istisnasız teşhis yasası değildir; çoklu kanıt burada önemlidir.",
    "cenek",
  ),
  question(
    "f011-plants-10",
    "Bir bitkinin organik maddesindeki karbonun kaynağı araştırılıyor. Uygun ışıkta CO₂ kullanarak fotosentez yaptığı verilmiş. Temel karbon kaynağı için hangi yanıt uygundur?",
    [
      "Yalnız topraktan hazır nişasta",
      "Yalnız kökün yaptığı kapsid",
      "Atmosferdeki azot her zaman tek kaynak",
      "İletim dokusunun hücre dışı sindirimi",
      "Fotosentezde kullanılan CO₂",
    ],
    4,
    "Su-mineral alımı ile organik maddenin karbonunu ayır.",
    "Fotosentezle yapılan organik maddenin karbonu kullanılan CO₂’den gelir. Kökün su ve mineral alması bitkinin tüm organik besinini topraktan hazır aldığı anlamına gelmez. Diğer seçenekler karbonla azotu karıştırır veya bitki organlarına ilgisiz viral ve sindirim görevleri yükler.",
    "bitki-karbon",
  ),
];

const fungiQuestions: Question[] = [
  question(
    "f011-fungi-1",
    "Çekirdekli, kloroplastsız, kitin içeren duvarlı bir canlı büyük besinleri dışarı salgıladığı enzimlerle parçalayarak küçük ürünleri emiyor. Hangi grup güçlü biçimde desteklenir?",
    [
      "Mantarlar",
      "Bütün virüsler",
      "Kesin siyanobakteri",
      "Damarlı kara bitkisi",
      "Zorunlu metanojen arke",
    ],
    0,
    "Hücre tipi, duvar ve beslenmeyi üç kanıt olarak birleştir.",
    "Ökaryotluk, kitinli duvar ve dış sindirim–emilim düzeni mantarı destekler. Virüs hücre değildir; siyanobakteri ve arke prokaryottur. Bitki örneğinde selülozlu duvar ve çoğunlukla fotosentetik dokular beklenir. Tek bir benzerlik yerine üç kanıtın birleşimi kullanılmalıdır.",
    "mantar-kanit",
  ),
  question(
    "f011-fungi-2",
    "Bir mantarın hücre dışında bulunan büyük polimerden yararlanma sırası hangisidir?",
    [
      "Büyük polimeri çekirdeğe al → genomu yok et → dışarı enzim üret",
      "Dışarı enzim salgıla → büyük besini küçük ürünlere parçala → küçük ürünleri em",
      "Kapsid oluştur → RNA’yı polene çevir → endospor kur",
      "Önce nişastayı aynı büyüklükte zar içinden geçir → sonra dışarı sindir",
      "Kloroplast kur → polimeri fotosentezle yut → kitini kaldır",
    ],
    1,
    "Sindirimin yeri ve emilimin ürün büyüklüğünü kontrol et.",
    "Temel mantar beslenmesinde dış enzim büyük besini daha küçük ürünlere parçalar; bu ürünler zar üzerinden alınır. Diğer sıralamalar büyük polimeri doğrudan geçirme, sindirim yerini ters çevirme veya mantara viral ve fotosentetik yapılar yükleme hataları içerir. Enzim salgısı, parçalama ve emilim ayrı basamaklardır.",
    "mantar-beslenme",
  ),
  question(
    "f011-fungi-3",
    "Kapalı öğretim modelinde her biri üç monomer birimli iki polimer tamamen sindiriliyor. Dört monomer içeri alınırken kayıp ve tüketim yok. Dışarıda kaç monomer kalır?",
    ["0", "1", "2", "4", "6"],
    2,
    "Toplam yapı birimi sindirimle değişmez.",
    "Başlangıç 2×3=6 monomer birimidir. Sindirim zincirleri ayırır, toplam birimi artırmaz; 4 birim içeri alınınca 6−4=2 dışarıda kalır. İki polimeri iki monomer sanmak veya içeri alınan miktarı toplamdan çıkarmamak yanlış sonuç verir. Kapalı ve tüketimsiz model koşulu önemlidir.",
    "besin-korunumu",
  ),
  question(
    "f011-fungi-4",
    "Şapkalı mantarda toprak altında dallanan ipliksi ağ inceleniyor. Tek ipliksi yapıya hif deniyor. Ağın adı ve temel rolü hangisidir?",
    [
      "Kapsid; genomu paketleme",
      "Polen; tohum oluşturma",
      "Stoma; terleme",
      "Miselyum; yayılma ve besine erişime katkı",
      "Gerçek kök; yalnız fotosentez",
    ],
    3,
    "Tek iplik ile ipliklerin ağını ayrı adlandır.",
    "Hiflerin oluşturduğu ağ miselyumdur; substratta yayılma ve besinle etkileşime katkı sağlar. Şapka çoğu zaman üreme gövdesidir; ana ağla aynı ölçek değildir. Kapsid, polen ve stoma başka biyolojik düzenlerdir. Miselyumu bitkinin gerçek kökü veya fotosentetik organı saymak yanlıştır.",
    "hif-miselyum",
  ),
  question(
    "f011-fungi-5",
    "Bitki köküyle ilişkili mantar bitkinin fosfat alımını artırıyor; bitki mantara organik karbon sağlıyor. Her iki taraf için yarar gözleniyor. En uygun ad hangisi?",
    [
      "Yalnız tek taraflı parazitlik",
      "Virion birleşmesi",
      "Bakteriyel endosporlaşma",
      "Bitkinin mantara dönüşmesi",
      "Mikoriza",
    ],
    4,
    "Tarafları ve iki farklı madde katkısını yaz.",
    "Bitki kökü–mantar arasındaki bu karşılıklı yarar örneği mikorizadır. Mantarın mineral alımına katkısı ile bitkinin organik karbon vermesi farklı yönlerdir. Verilen iki yarar tek taraflı parazitlikle uyumlu değildir; diğer seçenekler ilişkiye ilgisiz süreçlerdir. Her kök mantarının yararlı olması ayrıca varsayılmaz.",
    "mikoriza",
  ),
  question(
    "f011-fungi-6",
    "Bir likende mantar ve fotosentetik alg hücreleri birlikte gözleniyor. Organik madde üretiminin ışığa bağlı bölümü alg hücrelerinde ölçülüyor. Hangi çıkarım doğrudur?",
    [
      "Birliğin fotosentezi mantar hücresinin kloroplastlı olduğunu kanıtlamaz",
      "Her mantar algdir",
      "Mantar kesin prokaryottur",
      "Fotosentez kapsidde gerçekleşir",
      "Liken yalnız bitki köküdür",
    ],
    0,
    "Aynı yapıdaki farklı hücresel tarafların işini ayır.",
    "Fotosentez alg ortak hücrelerinde ölçülmüştür; mantarın kloroplast kazandığı sonucu çıkmaz. Liken bir yaşam birliğidir, yalnız bitki kökü veya tek hücre türü değildir. Mantar ökaryottur; kapsid de hücresel fotosentez organeli değildir. Ortaklık düzeyiyle hücre düzeyini karıştırmamak gerekir.",
    "liken",
  ),
  question(
    "f011-fungi-7",
    "Aynı mantarın zarla küçük şeker alımı korunuyor. Hücre dışı nişasta sindirim enzimi engelleniyor. Biri nişasta, diğeri doğrudan uygun küçük şeker içeren iki ortamdan hangisi bu belirli sindirim engelini atlar?",
    [
      "Yalnız nişastalı ortam",
      "Küçük şekerli ortam",
      "İki ortam da kesin aynı engeli taşır",
      "Hiçbir hücre küçük molekül alamaz",
      "Yalnız hücresiz virion ortamı",
    ],
    1,
    "Engellenen basamağın ürünü doğrudan sağlanırsa ne değişir?",
    "Küçük şeker doğrudan verildiğinde dış nişasta sindirimi gerekmeyebilir; soruda zar alımı korunmuştur. Nişasta ise büyük besinin parçalanmasına ihtiyaç duyar. Bu sonuç tüm yaşamsal koşullardan bağımsız büyüme garantisi değildir; yalnız belirtilen sindirim engelinin atlanmasını anlatır.",
    "sindirim-deneyi",
  ),
  question(
    "f011-fungi-8",
    "Bir bakterinin tek endosporu bir etkin hücreye dönüyor. Başka bir deneyde mantarın çok sayıda üreme sporu uygun ortamda yeni bireyler oluşturuyor. Hangi karşılaştırma uygundur?",
    [
      "Her iki olayda zorunlu aynı birey artışı vardır",
      "Her spor kesin tohumdur",
      "Bakteriyel endospor dayanıklılık durumudur; mantar sporu üremeye katılabilir",
      "Endospor DNA taşıyamaz",
      "Mantar sporunun gelişmesi bakteriyi bitkiye çevirir",
    ],
    2,
    "Aynı ad parçasının farklı gruplardaki sonucunu ayır.",
    "Bakteriyel endospor bir hücrenin dayanıklı durumunu sürdürür; tek hat üzerinde sayı artışı gerektirmez. Mantar sporları yeni birey gelişimine katılabilir. Sporlar tohumla özdeş değildir. DNA yokluğu veya gruplar arası dönüşüm bu olayların sonucu değildir; süreç ve sayı ayrı incelenmelidir.",
    "spor-ayrimi",
  ),
  question(
    "f011-fungi-9",
    "Ölü yapraktan beslenen mantar ile canlı bitkiye zarar vererek beslenen mantar karşılaştırılıyor. İlk ve ikinci için doğru sıralama hangisidir?",
    [
      "İkisi de mutlaka fotosentetik",
      "Parazit–fotoototrof",
      "Metanojen–virion",
      "Saprotrof–parazit",
      "Liken–damarsız bitki",
    ],
    3,
    "Besin kaynağı ölü mü, zarar gören canlı konak mı?",
    "Ölü organik maddeden yararlanan saprotrof, canlı konağa zarar vererek yararlanan parazittir. İki mantar da heterotrof olabilir fakat etkileşim sonucu farklıdır. Fotosentez, metanojenez ve bitki damar sınıflaması bu gözlemin karşılığı değildir. Bir mantarın özelliğini bütün mantarlara yaymamak gerekir.",
    "mantar-ekoloji",
  ),
  question(
    "f011-fungi-10",
    "Temel gıda üretimi örneklerinde yoğurt laktik asit bakterileriyle, ekmek hamurunun kabarması seçilmiş maya mantarıyla ilişkilendiriliyor. Hangi sonuç geçersizdir?",
    [
      "Farklı mikroorganizmalar gıda üretimine katılabilir",
      "Maya bir mantar örneğidir",
      "Yoğurdun temel fermantasyon etkenleri bakterilerdir",
      "Ürün adıyla kullanılan organizmayı ayrıca eşleştirmek gerekir",
      "Fermantasyon yapan her canlı zorunlu mantardır",
    ],
    4,
    "Bir süreç birden fazla canlı grubunda örneklenebilir.",
    "Yoğurt bakterileri fermantasyonun yalnız mantarlara ait olmadığına karşı örnektir. Maya mantardır fakat bütün fermantatif canlıları kapsamaz. Diğer seçenekler verilen ürün–organizma eşleştirmeleriyle uyumludur. Bir işlem adını canlı grubunun kesin teşhisi olarak kullanmak hatalıdır.",
    "mantar-uretim",
  ),
];

export const forge011BiologyAGuides: LessonGuide[] = [
  virusGuide,
  bacteriaGuide,
  protistGuide,
  plantsGuide,
  fungiGuide,
];
export const forge011BiologyATopics: Record<string, string> = {
  virusler: "detail-14",
  "bakteri-ve-arke": "detail-15",
  protista: "detail-16",
  bitkiler: "detail-17",
  mantarlar: "detail-18",
};
const titles: Record<string, string> = {
  virusler: "Virüsler: yapı, konak ve çoğalma",
  "bakteri-ve-arke": "Bakteri ve arke: ortak hücre, farklı kanıtlar",
  protista: "Protista: çeşitlilik ve koşula bağlı yaşam",
  bitkiler: "Bitkiler: damardan tohuma, kanıttan gruba",
  mantarlar: "Mantarlar: dış sindirimden yaşam ortaklığına",
};
const banks = [
  virusQuestions,
  bacteriaQuestions,
  protistQuestions,
  plantQuestions,
  fungiQuestions,
];
export const forge011BiologyALessons: Lesson[] = forge011BiologyAGuides.map(
  (g, i) => ({
    id: g.id,
    subjectId: "tyt-biyoloji",
    title: txt(titles[g.id]),
    minutes: g.minutes,
    objectives: g.objectives.map(txt),
    body: g.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: banks[i],
    source: txt(g.source),
    tags: ["kaynakli", "etkilesimli", "forge011"],
  }),
);
