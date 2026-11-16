import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

export type HistoryEra026 = "MÖ" | "MS";

function year026(year: number, era: HistoryEra026) {
  if (!Number.isSafeInteger(year) || year < 1 || year > 4000)
    throw new RangeError("HISTORY026_YEAR");
  if (era !== "MÖ" && era !== "MS") throw new RangeError("HISTORY026_ERA");
}

export function historyYear026(year: number, era: HistoryEra026) {
  year026(year, era);
  const century = Math.floor((year - 1) / 100) + 1;
  const chronologicalPosition =
    era === "MS" ? ((year - 1) % 100) + 1 : century * 100 - year + 1;
  const firstYear = era === "MS" ? (century - 1) * 100 + 1 : century * 100;
  const lastYear = era === "MS" ? century * 100 : (century - 1) * 100 + 1;
  return {
    year,
    era,
    century,
    half: Math.ceil(chronologicalPosition / 50),
    quarter: Math.ceil(chronologicalPosition / 25),
    chronologicalPosition,
    firstYear,
    lastYear,
    label: `${era} ${year}`,
  };
}

export function historyInterval026(
  fromYear: number,
  fromEra: HistoryEra026,
  toYear: number,
  toEra: HistoryEra026,
) {
  year026(fromYear, fromEra);
  year026(toYear, toEra);
  // A sequence index counts year starts. Index 0 names MÖ 1, not a year 0.
  const fromIndex = fromEra === "MÖ" ? 1 - fromYear : fromYear;
  const toIndex = toEra === "MÖ" ? 1 - toYear : toYear;
  const intervals = Math.abs(toIndex - fromIndex);
  return {
    from: historyYear026(fromYear, fromEra),
    to: historyYear026(toYear, toEra),
    direction:
      toIndex > fromIndex ? "ileri" : toIndex < fromIndex ? "geri" : "aynı",
    intervals,
    inclusiveYearLabels: intervals + 1,
    assumption:
      "Geleneksel MÖ–MS dizisi, yıl 0 yok. Süre aynı ay ve günün yıl içindeki karşılığı arasında düşünülür; takvimler arası tam gün dönüşümü yapılmaz.",
  };
}

export type MilitaryIncome026 = "bilinmiyor" | "ulufe" | "dirlik";
export type MilitaryFormation026 = "bilinmiyor" | "piyade" | "süvari";
export type MilitaryTask026 =
  | "bilinmiyor"
  | "çarpışma"
  | "silah bakımı"
  | "top atışı"
  | "ağır top taşıma"
  | "cebelü";
const militaryRows026 = [
  {
    name: "Yeniçeri",
    income: "ulufe",
    formation: "piyade",
    tasks: ["çarpışma"],
  },
  {
    name: "Cebeci",
    income: "ulufe",
    formation: "piyade",
    tasks: ["silah bakımı"],
  },
  { name: "Topçu", income: "ulufe", formation: "piyade", tasks: ["top atışı"] },
  {
    name: "Top arabacısı",
    income: "ulufe",
    formation: "piyade",
    tasks: ["ağır top taşıma"],
  },
  {
    name: "Kapıkulu sipahisi",
    income: "ulufe",
    formation: "süvari",
    tasks: ["çarpışma"],
  },
  {
    name: "Tımarlı sipahi",
    income: "dirlik",
    formation: "süvari",
    tasks: ["çarpışma", "cebelü"],
  },
] as const;

export function militaryMatch026(
  income: MilitaryIncome026,
  formation: MilitaryFormation026,
  task: MilitaryTask026,
) {
  if (!["bilinmiyor", "ulufe", "dirlik"].includes(income))
    throw new RangeError("HISTORY026_INCOME");
  if (!["bilinmiyor", "piyade", "süvari"].includes(formation))
    throw new RangeError("HISTORY026_FORMATION");
  if (
    ![
      "bilinmiyor",
      "çarpışma",
      "silah bakımı",
      "top atışı",
      "ağır top taşıma",
      "cebelü",
    ].includes(task)
  )
    throw new RangeError("HISTORY026_TASK");
  const candidates = militaryRows026
    .filter(
      (row) =>
        (income === "bilinmiyor" || row.income === income) &&
        (formation === "bilinmiyor" || row.formation === formation) &&
        (task === "bilinmiyor" ||
          row.tasks.some((candidateTask) => candidateTask === task)),
    )
    .map((row) => ({ ...row, tasks: [...row.tasks] }));
  return {
    income,
    formation,
    task,
    candidates,
    result:
      candidates.length === 0
        ? "Bu tabloda uyan aday yok"
        : candidates.length === 1
          ? `Tabloda tek aday: ${candidates[0].name}`
          : "Birden çok aday açık",
    limit:
      "Bu öğretim tablosunda yalnız altı aday var. Piyade ve süvari, birliğin bu tablodaki türünü anlatır; tek yolculukta ata binmek ölçüt değildir. Ana işler listelenir; her birliğin her çağdaki bütün işleri verilmez. Tabloda aday kalmaması, bu işin tüm Osmanlı ordusunda hiç yapılmadığı anlamına gelmez.",
  };
}

export type EvidenceState026 = "destekli" | "çelişkili" | "kararsız";

const politicsFiles026 = [
  { title: "Yalnız sıra", first: 1400, next: 1410, mechanism: false },
  { title: "Sıra ve ikmal kaydı", first: 1400, next: 1410, mechanism: true },
  { title: "Ters sıra", first: 1410, next: 1400, mechanism: false },
] as const;
const politicsClaims026 = [
  "A olayı, B olayından önce oldu.",
  "A, B'ye giden ikmale katkı sağladı.",
  "B'nin tek nedeni A idi.",
] as const;

/** Fictional evidence, not a proposed reconstruction of an Ottoman event. */
export function politicsEvidence026(
  file: number,
  claim: number,
  otherCause: boolean,
) {
  if (!Number.isInteger(file) || file < 0 || file >= politicsFiles026.length)
    throw new RangeError("HISTORY026_FILE");
  if (
    !Number.isInteger(claim) ||
    claim < 0 ||
    claim >= politicsClaims026.length
  )
    throw new RangeError("HISTORY026_CLAIM");
  if (typeof otherCause !== "boolean") throw new RangeError("HISTORY026_OTHER");
  const row = politicsFiles026[file];
  const before = row.first < row.next;
  let state: EvidenceState026;
  let explanation: string;
  if (claim === 0) {
    state = before ? "destekli" : "çelişkili";
    explanation = `A için ${row.first}, B için ${row.next} yılı verildi. Yalnız bu dosyanın zaman sırası sınanır.`;
  } else if (claim === 1) {
    state = !before ? "çelişkili" : row.mechanism ? "destekli" : "kararsız";
    explanation = !before
      ? "Bu modelde ikmal katkısı B'den önce olmalı. Dosyada A, B'den sonra; öne sürülen bu katkı bağı sıra koşuluyla çelişir."
      : row.mechanism
        ? "Ek sevk kaydı, A ile açılan yolun B öncesi ikmalde kullanımını açıkça bildiriyor. Katkı desteklenir; tek neden sonucu çıkmaz."
        : "A'nın önce olması, ikmalin bu yoldan geçtiğini bildirmez. Mekanizma kaydı eksik; katkı iddiası kararsız kalır.";
  } else {
    state = otherCause || !before ? "çelişkili" : "kararsız";
    explanation = otherCause
      ? "Ayrı belge, C'nin de B'ye katkısını açıkça kaydediyor. Tek neden iddiası bu çok neden verisiyle çelişir."
      : !before
        ? "Bu modelde B'den sonra olan A, B'nin önceki ve tek nedeni olamaz."
        : "Sıra veya belirli bir katkı, başka bütün etkenlerin yokluğunu kanıtlamaz. Tek neden için yeterli veri yok.";
  }
  return {
    title: row.title,
    claim: politicsClaims026[claim],
    state,
    explanation,
    events: [
      { name: "A", year: row.first },
      { name: "B", year: row.next },
    ],
    records: [
      `Tarih kaydı: A ${row.first}, B ${row.next}.`,
      row.mechanism
        ? "Sevk kaydı: A ile açılan yol, B öncesi ikmalde kullanıldı."
        : "A ile B arasında ikmal bağı gösteren sevk kaydı yok.",
      otherCause
        ? "Ayrı belge: C de B'ye somut katkı sağladı."
        : "C veya başka etkenler için ek belge yok; bu, onların hiç olmadığı demek değil.",
    ],
    limit:
      "Yıllar ve dosyalar kurmacadır. Ok, sınanan kanıt bağını gösterir; zaman sırası tek başına nedensellik değildir.",
  };
}

const foundationProfiles026 = [
  { name: "Çeşme ve eğitim", maintenance: 3, education: 5, food: 2 },
  { name: "İmaret ve eğitim", maintenance: 4, education: 6, food: 3 },
  { name: "Küçük hizmet ağı", maintenance: 2, education: 4, food: 1 },
] as const;

export function foundationBudget026(
  profile: number,
  income: number,
  deed: boolean,
) {
  if (
    !Number.isInteger(profile) ||
    profile < 0 ||
    profile >= foundationProfiles026.length
  )
    throw new RangeError("HISTORY026_PROFILE");
  if (!Number.isInteger(income) || income < 0 || income > 24)
    throw new RangeError("HISTORY026_REVENUE");
  if (typeof deed !== "boolean") throw new RangeError("HISTORY026_DEED");
  const row = foundationProfiles026[profile];
  const total = row.maintenance + row.education + row.food;
  const balance = income - total;
  return {
    ...row,
    income,
    total,
    balance,
    finance:
      balance < 0
        ? "Gelir açığı var"
        : balance === 0
          ? "Gelir ve gider eşit"
          : "Gider sonrası pay var",
    allocation: deed
      ? "Verilen vakfiye, bu üç hizmete bu tahsisi açıkça izinli kılıyor."
      : "Tahsis belgesi verilmedi; nakit yeterliği tek başına harcama yetkisini göstermez.",
    costs: [
      { name: "Bakım", amount: row.maintenance },
      { name: "Eğitim", amount: row.education },
      { name: "İaşe", amount: row.food },
    ],
    limit:
      "Birimler ve tutarlar kurmaca. Yalnız bu dönem hesabı yapılır. Sayıların yetmesi, hizmetlerin fiilen verildiğini veya her vakfın aynı şartı taşıdığını kanıtlamaz.",
  };
}

const layerNames026 = ["A: alt", "B: orta", "C: üst"] as const;
export function stratigraphy026(
  layer: number,
  disturbed: boolean,
  claim: number,
) {
  if (!Number.isInteger(layer) || layer < 0 || layer >= 3)
    throw new RangeError("HISTORY026_LAYER");
  if (typeof disturbed !== "boolean")
    throw new RangeError("HISTORY026_DISTURBED");
  if (!Number.isInteger(claim) || claim < 0 || claim >= 3)
    throw new RangeError("HISTORY026_LAYER_CLAIM");
  const letters = ["A", "B", "C"];
  const claims = [
    `Seçili ${letters[layer]} buluntusu, altta kalan tabakadaki buluntudan daha sonra bağlama girdi.`,
    `Seçili ${letters[layer]} nesnesinin kesin takvim yılı bu kesitten bilinir.`,
    `Seçili ${letters[layer]} nesnesinin derinliği, tarihinin yıl sayısına eşittir.`,
  ];
  const state: EvidenceState026 =
    claim === 2
      ? "çelişkili"
      : claim === 1 || disturbed || layer === 0
        ? "kararsız"
        : "destekli";
  const explanation =
    claim === 2
      ? "Derinlik bir uzunluktur; yıl sayısı değildir. Bu kesit için derinlikten yıla dönüşüm verilmedi."
      : claim === 1
        ? "Kesitte mutlak tarihleme verisi yok. Göreli sıra, kesin takvim yılı üretmez."
        : disturbed
          ? "Seçili nesnenin bağlamı sonradan açılan çukura ait olabilir. Bu buluntu için bozulmamış birikim kabulü geçerli değil."
          : layer === 0
            ? "A'nın altında kıyas için tabaka yer almıyor. Eksik veriyi uydurma."
            : `Seçili ${letters[layer]} nesnesi, bozulmamış birikim kabulüyle alttaki ${letters[layer - 1]} nesnesine göre sonra bağlama girdi.`;
  return {
    layer: layerNames026[layer],
    disturbed,
    claim: claims[claim],
    state,
    explanation,
    layers: layerNames026.map((name, index) => ({
      name,
      selected: index === layer,
    })),
    limit:
      "Kesit kurmaca. Bağlam bozulmamış ise art arda birikimde nesnelerin tabakaya giriş sırası kıyaslanır; üretim tarihleri, eşit süreler veya bütün bölge için evrensel çağ sınırları çıkarılmaz.",
  };
}

type HistoryCard026 = {
  passage: string;
  prompt: string;
  options: [string, string, string, string, string];
  steps:
    | [string, string, string]
    | [string, string]
    | [string, string, string, string];
  reasons: [string, string, string, string, string];
  knowledge: string;
  strategy: string;
  error: string;
  check: string;
};

type HistoryPack026 = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: HistoryCard026[];
};

const historySource026 =
  "MEB Tarih 9 ders kitabı ünite 2, OGM Tarih 9 Dersler Cepte (2023) ve Tarih 10 konu özetleriyle karşılaştırılan özgün öğretim. Göbeklitepe işlev yorumlarında UNESCO Dünya Mirası tanımının olasılık sınırı korunur. Tarihsel yıl numaralandırmasında US Naval Observatory’nin yıl 0 bulunmayan MÖ–MS ve 1–100 yüzyıl sınırı açıklaması esas alınır. Etkinlik dosyaları kurmacadır; kronolojik sıra tek başına nedensellik kanıtı sayılmaz.";

const historyPacks026: HistoryPack026[] = [
  {
    id: "osmanli-kurulus-siyaseti",
    topic: "detail-233",
    title: "Beylikten devlete Osmanlı siyaseti: kuruluş, fetih ve kalıcılık",
    minutes: 135,
    objectives: [
      "Kuruluşu açıklayan görüşleri olay bilgisinden ayır; çok nedenli açıklama kur.",
      "Bizans, Rumeli ve Anadolu siyasetlerini aynı kronoloji içinde farklı hedeflerle ilişkilendir.",
      "İskân, istimâlet, savaş, satın alma, çeyiz ve mirası somut kanıttan tanı.",
      "1402 Ankara yenilgisi ile 1402–1413 Fetret sürecini ve toparlanmayı birbirine bağla.",
    ],
    sections: [
      {
        title: "Önce haritada üç ayrı soruyu kur",
        paragraphs: [
          "Kuruluş dönemini yalnız padişah ve savaş listesi olarak okumak, bir beyliğin nasıl kalıcı bir yönetime dönüştüğünü açıklamaz. Kuzeybatı Anadolu’daki uç çevresi için ‘kimler, hangi koşullarda bir araya geldi?’; Rumeli için ‘geçiş ve fetih nasıl kalıcı oldu?’; Anadolu için ‘öteki Türk beylikleriyle hangi yollar kullanıldı?’ sorularını ayrı kur. Bu hatlar aynı yüzyılda birlikte işleyebilir. Batıya yönelmek, Anadolu siyasetinin tamamen bırakıldığı anlamına gelmez. Bir olayın hem askerî hem ekonomik hem de toplumsal sonucu olabilir; sorunun hangi boyutu istediğine bak.",
          "Söğüt ve Domaniç çevresinden Bursa, İznik ve Rumeli yönüne uzanan hareketi üç ayrı alan üzerinde izle. Uç, iki siyasi gücün yalnız cetvelle ayrıldığı çizgi değildir; alışveriş, göç, ittifak ve çatışmanın kesiştiği bir çevredir. Bir beyliğin savaşçı toplaması, bir şehri sürekli yönetmesi ve vergi düzeni kurması farklı kapasitelerdir. Böylece genişleme ile devletleşmeyi ilişkilendirirken ikisini eş anlamlı saymamış olursun.",
        ],
      },
      {
        title: "Uç ortamı bir fırsattır; tek başına açıklama değildir",
        paragraphs: [
          "Türkiye Selçuklu otoritesinin zayıflaması, İlhanlı etkisi ve beyliklerin ortaya çıkışı Anadolu’da parçalı bir siyasi çevre oluşturdu. Bizans’ın taht mücadeleleri ve sınırdaki tekfurların merkezden görece bağımsız hareket etmesi, Osmanlıların çevresindeki güç ilişkilerini esnek kıldı. Uçtaki Türkmen savaşçıları, göçler, geçiş güzergâhları, yerel ittifaklar, esnaf ve derviş çevreleri de önemlidir. Coğrafya uygun diye büyümenin kendiliğinden gerçekleştiği söylenmez: liderlerin kararları, insan gücü, üretim ve kurumlar bu zeminde etkili olur. ‘Bizans zayıftı’ ile ‘yalnız Bizans’ın zayıflığı yeterliydi’ farklı yargılardır.",
          "Kolaylaştırıcı koşul, belirli bir sonuca ulaşmayı mümkün veya daha elverişli kılan durumdur; yeterli neden ise başka hiçbir koşula gerek bırakmadan sonucu doğurduğu ileri sürülen iddiadır. Bizans merkezinin zorlanması ilk türden bir etkendir. Aynı uç bölgesindeki bütün beyliklerin aynı ölçüde büyümemesi, uygun çevreyle birlikte insan gücü, örgütlenme ve kararların da araştırılmasını gerektirir. Bir açıklamada askeri, ekonomik ve toplumsal bağlantıları ayrı adlandır.",
        ],
      },
      {
        title: "Kuruluş tarihi ile kuruluş üzerine görüşü ayır",
        paragraphs: [
          "Erken Osmanlı tarihi için kaynaklar sınırlıdır; olaylardan sonra yazılan kronikler ile çağdaş veya yakın dönem farklı kaynaklar eleştirel karşılaştırılır. Ders geleneğinde Osmanlı hanedanı Oğuzların Bozok kolu, Gün Han soyu ve Kayı boyu ile ilişkilendirilir; bu soy anlatısı, kuruluşun bütün ayrıntılarının tartışmasız kanıtlandığı anlamına gelmez. Paul Wittek gaza tezini öne çıkarır. Mehmet Fuad Köprülü, Anadolu Türk-İslam birikimiyle uç çevresinin çoklu toplumsal ve kurumsal etkenlerini vurgular. Halil İnalcık da gaza unsurunu tek başına yeterli görmeden kaynakları, göç ve nüfus baskısını, uç koşullarını birlikte değerlendirir. ‘Wittek neyi savundu?’ bir görüş sorusudur; ‘hangi savaş hangi gelişmeden önce oldu?’ bir olay sorusudur.",
          "Tarihsel uç bağlamında gaza, İslam uğruna mücadele anlayışıyla ilişkilendirilen dinî-siyasi faaliyet ve meşruiyet dilidir; gazi bu mücadeleye katılan savaşçı için kullanılan unvandır. Örneğin bir kitabede tek savaşçının gazi unvanıyla anılması, onun bütün geçim kaynaklarını veya bütün uç halkının niyetlerini açıklamaz. Bu unvanın dinî-siyasi anlamı araştırılırken kişilerin başka ekonomik ve toplumsal ilişkileri ayrıca incelenir. Kronik, geçmiş olayları sıralayan tarih anlatısıdır. Olaydan daha sonra yazılması onu bütünüyle değersiz yapmaz; hangi önceki rivayet ve belgelere dayandığı sorulur. Bir yazmanın kopya tarihi ile anlattığı olayın tarihi de farklı olabilir. Aynı kaynaktan alınmış iki anlatıyı iki bağımsız tanıklık gibi saymamak gerekir. Kuruluş araştırmasında görüşün kime ait olduğu, hangi kanıta dayandığı ve neyi açıklamayı amaçladığı birlikte belirtilir.",
        ],
      },
      {
        title: "Osman Bey: tekfurla yalnız savaşılmaz",
        paragraphs: [
          "Osman Bey çevresinde alpler ve gaziler gibi uç savaşçıları bulunurken bazı yerel Bizans yöneticileriyle de iş birliği kurulabildi. Bir tekfurla ittifak, bütün Bizans’ın Osmanlılara bağlandığını göstermez. Başka bir tekfurla mücadele edilmesi de bütün yerel ilişkilerin sürekli düşmanca olduğu anlamına gelmez. 1302 Koyunhisar, Osman Bey’in Bizans kuvvetlerine karşı başarısıyla siyasi ağırlığının arttığı bir dönüm noktasıdır. Fethedilen şehirlerin çevresini denetlemek, yardım ve iaşe hatlarını kesmek, kuşatma ve anlaşma gibi farklı araçlar kullanılabildi. Olayı okurken yerel aktör ile merkezî devleti, kısa süreli ittifak ile kalıcı bağlılığı ayır.",
          "Tekfur, Bizans çevresindeki yerel yöneticiler için kullanılan unvandır. Uçta bir yerel aktörle kurulan iş birliği, öteki aktörle mücadeleyi dışlamaz. Mihail/Mihal gibi kişi adlarıyla ilgili anlatıları okurken yerel ittifakın kapsamını bütün imparatorluğa yayma. Koyunhisar/Bafeus adıyla anılan 1302 karşılaşmasını, şehirlerin her birinin aynı anda ele geçirildiği bir toplu fetih gibi de düşünme; askeri başarı ile sonraki denetim süreçleri ayrı izlenir.",
        ],
      },
      {
        title: "Şehir almak, yönetim kapasitesi kazanmaktır",
        paragraphs: [
          "1326’da Bursa’nın Orhan Bey döneminde alınması, yalnız haritada bir alanın boyanması değildir: şehir, pazar ve üretim ağıyla yönetim için yeni imkânlar sunar. 1329 Palekanon/Maltepe başarısı Bizans’ın yardım girişimini zayıflatıp İznik çevresindeki Osmanlı ilerleyişini kolaylaştırdı. Bir kalenin veya şehrin fethiyle ulaşım, ticaret ve merkezî teşkilatın gelişmesi arasında bağ kur; fakat her kurumun tam o gün kurulduğunu varsayma. Osman Bey zamanında başlayan kuşatma veya hazırlık, Orhan Bey döneminde sonuçlanabilir. Başlatan kişi, sonuçlandıran kişi ve olayın tarihi aynı sorunun üç ayrı parçasıdır.",
          "Bursa, İznik ve İzmit gibi şehirlerin alınması, pazar, üretim, ulaşım ve yönetim merkezlerinin yeni bir siyasi düzenle ilişkilenmesidir. İznik’in 1331, İzmit’in 1337’de Orhan Bey döneminde alınması bu ilerleyişin aşamaları arasında öğrenilir. Bu tarihler bir şehir ağının zaman içinde genişlediğini gösterir; her kurumun fetih günü tamamlandığını kanıtlamaz. Örneğin kuşatmayı başlatan, anlaşmayı yürüten ve yeni idari düzeni kuran aktörler aynı kişi olmak zorunda değildir.",
        ],
      },
      {
        title: "Karesi ve boğaz geçişi: insan, araç ve konum",
        paragraphs: [
          "1345’te Karesi Beyliği’nin Osmanlılara katılması, toprak yanında denizcilik birikimi ve tecrübeli komutanlar sağladı. Bu birikim Rumeli’ye geçiş şartlarını güçlendirdi; Rumeli’ye geçişin yalnız bu tek olaydan kaynaklandığı söylenmez. Bizans iç mücadelelerinde kurulan ilişkiler de rol oynadı. 1353’te Çimpe’nin elde edilmesi, boğazın batısında bir üs ve sonraki ilerleyiş için hareket alanı oluşturdu. ‘Karesi’nin katılması’ ile ‘Rumeli’de ilk kalıcı üs’ farklı gelişmelerdir. Birincisi Anadolu’daki siyasi genişleme, ikincisi Rumeli’de tutunma bağlamında okunur. Kurulan ittifakın amacı ve elde edilen imkân birbirine bağlanmalıdır.",
          "Boğaz geçişi için yalnız kıyıya ulaşmak yetmez; deniz aracı, karşı kıyıda tutunacak yer ve geçişi sürdürecek insan ve iaşe bağlantısı gerekir. Karesi çevresinden gelen denizcilik birikimi ile Çimpe’nin üs olarak kullanılması bu zincirin farklı parçalarıdır. Üs bir hareket noktasıdır; bütün Balkanların yönetiminin tek günde kazanılması değildir. Şemadaki ok bu nedenle hazır bir zorunlu sonuç değil, belirli imkânların sonraki harekete katkısını anlatır.",
        ],
      },
      {
        title: "Rumeli’de askerî başarıyı kalıcılığa dönüştür",
        paragraphs: [
          "Balkanlarda siyasi parçalanmışlık ve yerel mücadeleler Osmanlı ilerleyişini kolaylaştıran koşullardandı. Edirne’nin alınması ve merkez olarak önem kazanması, Rumeli seferlerinin yönetimini ve yollar üzerindeki denetimi destekledi. İskân, nüfusun belirli bölgelere yerleştirilmesidir; üretim, güvenlik, ulaşım ve yerleşme ağına katkı sağlar. İstimâlet ise yerel halkın güvenini ve bağlılığını kazanmaya dönük uzlaştırıcı siyasettir; can-mal güvenliği, yerel şartları gözetme ve yönetilebilirlik bağlarıyla düşünülür. İskân bir nüfus hareketini, istimâlet halkla ilişki biçimini anlatır. Bu uygulamalardan bütün toplumun kültürel farklılıklarının hemen silindiği sonucu çıkarılmaz.",
          "İskân, üretim ve yol güvenliği gibi amaçlarla hanelerin bir bölgeye yerleştirilmesini içerebilir; yer seçimi, ailelerin geçimi ve taşınmanın şartları politikanın parçalarıdır. İstimâlet, yerel halkın güvenini kazanmaya dönük yönetim yaklaşımıdır. Bu iki araç aynı yerde birlikte uygulanabilir. Bir yönetimin uzlaştırıcı siyaset izlemesi, her görevlinin her olayda aynı davrandığına ilişkin evrensel bir sonuç vermez; politika, uygulama kaydı ve sonuç ayrı kanıtlarla incelenir.",
        ],
      },
      {
        title: "Balkan savaşlarını doğru padişah ve sonuçla eşleştir",
        paragraphs: [
          "1389 I. Kosova, I. Murad döneminde Haçlı ittifakına karşı başarıyla ve I. Murad’ın savaş sonrasında hayatını kaybetmesiyle ilişkilidir. 1396 Niğbolu, Yıldırım Bayezid dönemindedir; Haçlı kuvvetlerinin yenilmesi Osmanlıların Balkanlardaki gücünü artırdı. 1444 Varna ve 1448 II. Kosova ise II. Murad bağlamında öğrenilir. II. Kosova’nın Balkanlardaki Osmanlı hâkimiyetini güçlendiren etkisi, bölgedeki her sorunun sonsuza kadar bittiği anlamına gelmez. I. ve II. Kosova aynı olay değildir; tarih, hükümdar ve verilen sonuç birlikte kontrol edilir. Zaman şemasını bu üç alanla kurmak, yalnız isim benzerliğinden kaynaklanan hatayı azaltır.",
          "Bir savaş için yıl, siyasi yönetim, fiilen komuta eden kişi ve sonuç ayrı sütunlara yazılabilir. Varna 1444 bağlamında II. Murad’ın komutasıyla II. Mehmet’in ilk saltanatı birbirine karıştırılmamalıdır. Bir hükümdarın yeniden ordunun başına geçmesi, saltanat tarihlerindeki bütün ayrıntıların tek bir adla özetlenebileceğini göstermez. Ayrıca bir savaşın başarıyla sonuçlanması, bölgedeki sonraki bütün mücadelelerin sona erdiği anlamına gelmez.",
        ],
      },
      {
        title: "Anadolu’da birliği yalnız savaşla arama",
        paragraphs: [
          "Anadolu Türk siyasi birliği, farklı beyliklerin Osmanlı yönetimi çevresinde birleştirilmesi hedefidir. I. Murad döneminde Germiyanoğullarından bazı yerlerin çeyiz yoluyla, Hamitoğullarından bazı yerlerin satın alma yoluyla alınması farklı araçları gösterir. Germiyan topraklarının II. Murad döneminde vasiyetle katılması da çeyiz olayından ayrıdır. Beyliklerin iç mücadelelerinde uygun adayları desteklemek, yerel yönetimi bir süre korumak veya şehzade/sancak düzenine geçirmek de kullanılan yöntemlerdendir. Yıldırım Bayezid döneminde askerî güç ve doğrudan hâkimiyet daha belirginleşti. ‘Türk siyasi birliğini sağlama’ bir amaçtır; savaş, satın alma veya hanedan evliliği bu amaca ulaşmanın araçlarıdır.",
          "Çeyiz, satın alma, vasiyet ve savaş aynı siyasi hedefe hizmet etseler de mülki veya idari geçişin farklı araçlarıdır. Aynı beyliğin farklı parçaları farklı tarihlerde ve farklı yollarla katılabilir. Germiyan’dan bazı yerlerin çeyiz olarak alınmasıyla daha sonraki vasiyet ilişkisini tek olaymış gibi birleştirme. Bir belge hangi toprağın, hangi taraflar arasında, hangi şartla verildiğini gösteriyorsa çözümünü o kadarla sınırla.",
        ],
      },
      {
        title: "1402: bir savaşın birden fazla sonucu olur",
        paragraphs: [
          "Yıldırım Bayezid ile Timur arasındaki güç ve hâkimiyet mücadelesi 1402 Ankara Savaşı’nda Osmanlı yenilgisine yol açtı. Beyliklerin ve sığınan yöneticilerin durumu, Anadolu’daki hızlı genişleme ve üstünlük iddiaları bu siyasi çevrede değerlendirilir. Sonrasında bazı Anadolu beyliklerinin yeniden ortaya çıkması siyasi birliği sarstı. Bayezid’in oğulları arasındaki mücadele 1402–1413 Fetret Devri’ni oluşturdu. Yenilgi, merkezî otorite krizi ve bütün devletin hukuken başka bir hanedana geçmesi aynı şey değildir. Bazı toprakların elden çıkması da bütün bölgelerde aynı anda denetimin kaybedildiği anlamına gelmez.",
          "Ankara Savaşı’nın öncesinde Timur ile Bayezid’in üstünlük iddiaları, sığınan hükümdar ve beylerin durumu ve Anadolu’daki güç dengesi bulunur. Sonraki taht mücadeleleri savaşın nedeni olarak geriye taşınamaz. Neden ile sonucu ayırmanın ilk denetimi zaman sırasıdır; sıranın doğru olması tek başına nedenselliği ispatlamaz. Örneğin 1402 ile 1453 arasında 51 yıl bulunması, fetih başka şartlarda tam 51 yıl önce olurdu iddiasını kanıtlamaz.",
        ],
      },
      {
        title: "1413 toparlanma, ardından yeni denge",
        paragraphs: [
          "I. Mehmet’in 1413’te üstünlük kurması Fetret’e son verdi; bu yüzden kendisi toparlanma ve siyasi birliğin yeniden kurulmasıyla ilişkilendirilir. Fetret’in sonu, önceki bütün sorunların aynı anda çözüldüğü anlamına gelmez. Anadolu’daki birlik aşamalarla yeniden kurulurken Rumeli’deki hâkimiyetin önemli bölümü sürdü. Önceki iskân, yerel uyum ve yönetim bağları bu dayanıklılığı açıklayan etkenlerdendir; tek ve mutlak neden değildir. II. Murad döneminin Varna ve II. Kosova başarıları, daha sonra 1453 İstanbul’un fethine uzanan siyasal zeminin parçalarıdır. 1453 başka hükümdarın, II. Mehmet’in dönemidir; yakın tarihler hükümdarları birbirine karıştırmasın.",
          "Mehmet Çelebi’nin 1413’te mücadeleden üstün çıkması, hanedan içindeki iktidarın yeniden tek merkezde toplanmasıyla ilgilidir. Anadolu’daki her eski sınırın ve her siyasi ilişkinin aynı anda geri döndüğü söylenmez. Çelebi Mehmet ve II. Murad dönemlerinde beyliklerle ilişkiler, isyanlar ve dış mücadeleler sürer. Şeyh Bedreddin hareketi gibi olaylarda siyasi, toplumsal ve dinî unsurlar birlikte araştırılır; bütün katılımcılara tek bir gizli amaç yüklemek kaynakta görünmeyen bir kesinlik ekler.",
        ],
      },
      {
        title: "Çözüm yolu: özne, araç, kanıt, sınır",
        paragraphs: [
          "Tarih paragrafında önce özneyi belirle: Osmanlı yönetimi mi, yerel tekfur mu, bir tarihçi mi? Sonra eylemi ayır: yerleştirmek iskânı; güven kazanmak istimâleti; bedel ödemek satın almayı; hanedan evliliği çeyizi düşündürür. Sonucu metindeki somut kanıta bağla. Bir metin yalnız bir beyliğin topraklarının katıldığını söylüyorsa donanma ve komutan aktarımı ayrıca verilmeden kesinleştirilemez; bu konu bilgisiyle metin çıkarımının sınırını ayırır. ‘İlk’, ‘tamamı’, ‘yalnız’ gibi sözcükleri kontrol et. Öğrendiğin modeli kapatıp bir olayın önceki iki koşulunu ve sonraki iki etkisini kendi cümlelerinle kurmak, ezber sırasını açıklamaya dönüştürür.",
          "Aynı olayı iki farklı soruya veri olarak kullanabilirsin: bir şehirde yeni pazar kurulması ekonomik örgütlenmeye, orada bir idari görevlinin atanması yönetim örgütlenmesine ışık tutar. Her iki bilgi devletleşmeyle ilişkili olsa da birbirinin yerine geçmez. Açıklamanı özne, eylem, araç ve desteklenen sonuçla kur. Örneğin yalnız savaş tarihini bilmek, iskânın ailelerin geçimi üzerindeki etkisini kendiliğinden açıklamaz; o ilişki için yerleşme ve üretim kaydı aranır.",
        ],
      },
      {
        title: "Kuşatma, geçiş ve kalıcılık farklı işlerdir",
        paragraphs: [
          "Kuşatma bir yerin dışarıyla bağlantısını sınırlayarak askeri ve siyasi baskı kurabilir. Boğaz geçişi karşı kıyıya kuvvet ve malzeme ulaştırmayı, kalıcılık ise alınan yerde yönetim ve gündelik hizmeti sürdürebilmeyi gerektirir. Bir geçiş aracının bulunması şehirdeki bütün ihtiyaçları çözmez; bir şehirde pazar kurulması da askeri tehdidin bittiğini göstermez. Fetih ile sonrasındaki düzeni bu farklı ihtiyaçlar üzerinden ilişkilendir.",
          "Kurmaca bir araştırma dosyasında geçiş yolu, depo ve idari görevli için ayrı kayıtlar bulunabilir. Yol kaydı hareket imkânına, depo iaşeye, görevli ataması yönetime kanıttır. Bunların birlikte verilmesi açıklamayı zenginleştirir; metinde hiç verilmeyen nüfus sayısını, herkese eşit güvenliği veya gelecekteki bütün zaferleri hesaplamaya izin vermez. Şemanın oku, hangi kayıtla hangi sınırlı bağın kurulduğunu göstermelidir.",
        ],
      },
      {
        title: "Dönüm noktalarını karşılaştırmalı çizelgede oku",
        paragraphs: [
          "Bursa’nın alınması şehir merkezi ve kaynak ağıyla, Karesi’nin katılması Anadolu’daki genişleme ve denizcilik birikimiyle, Çimpe Rumeli’de üs edinmeyle, Ankara Savaşı ise siyasi otorite krizine giden sonuçlarla ilişkilidir. Bir çizelgede aynı sütuna yalnız olay adını değil, hangi coğrafya ve hangi kapasiteyle ilgili olduğunu da yazmak farklı gelişmeleri tek tür fetih gibi görmeni önler.",
          "Tarihi bilinen olayların sırası ile nedenleri farklı sorulardır. Bursa 1326, Koyunhisar 1302’den sonradır; bu sıra bütün Bursa sürecinin yalnız o savaştan doğduğunu söylemez. Ankara 1402’den sonra 1413 toparlanma gelir; bu da aradaki tüm çatışmaların tek nedene indirgenebileceğini göstermez. Nedensel açıklama için aktörlerin kararları, kaynaklar ve işleyen mekanizma da gösterilir.",
        ],
        table: {
          headers: ["Gelişme", "Öne çıkan bağ", "Tek başına çıkarılamayan"],
          rows: [
            [
              "Bursa’nın alınması",
              "Şehir, pazar ve yönetim imkânları",
              "Bütün kurumların aynı gün kurulması",
            ],
            [
              "Karesi’nin katılması",
              "Toprak, komutan ve denizcilik birikimi",
              "Rumeli’nin tümü üzerinde anında hâkimiyet",
            ],
            [
              "Çimpe’nin elde edilmesi",
              "Karşı kıyıda hareket üssü",
              "Bütün Balkan sorunlarının bitmesi",
            ],
            [
              "1413 toparlanma",
              "Hanedan içi iktidarın tek merkezde toplanması",
              "Her eski sınırın aynı anda geri alınması",
            ],
          ],
        },
      },
      {
        title: "Kanıt güçlendikçe açıklama nasıl değişir?",
        paragraphs: [
          "Bir kaynak yalnız iki olayın art arda geldiğini söylüyorsa sıralama kurulabilir. Kaynak ayrıca bir malzeme, insan gücü veya yönetim kararının sonraki işi nasıl desteklediğini belirtiyorsa açıklayıcı bağ güçlenir. Buna rağmen bütün başka etkenlerin yokluğu ayrı bir iddiadır. Örneğin deniz araçlarının geçişe katkısı, ittifakların veya karşı kıyıdaki siyasi durumun önemsiz olduğunu göstermez.",
          "Yeni belge eski anlatının tamamını otomatik silmek zorunda değildir; bazı tarihleri, aktörleri veya kapsamı düzeltip öteki bilgileri koruyabilir. Kaynakta yalnız bir bölge için verilen hükmü bütün Osmanlı coğrafyasına yaymamak gerekir. Bu yüzden sonuç cümlende yer, zaman ve kesinlik derecesini açık tut: hangi kaydın hangi ilişkiyi desteklediğini söyle, ardından verilmeyen ilişkiyi araştırma sorusu olarak bırak.",
        ],
      },
    ],
    examples: [
      {
        title: "Nüsha tarihi ile olay tarihi",
        prompt:
          "Bir kroniğin elimizdeki nüshası 1560’ta kopyalanmıştır. Metin, daha eski bir anlatıyı aktardığını açıkça söylüyor ve 1330’lardaki olayları konu alıyor. Bir öğrenci “1560’ta kopyalandığı için 1330’larla hiçbir ilgisi olamaz” diyor. İlk araştırma ne olmalıdır?",
        strategy:
          "Nüshanın üretimiyle aktarılan anlatının kökenini iki ayrı zaman bilgisi olarak ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "1560 mevcut nüshanın kopya tarihidir; metnin anlattığı olayın tarihi değildir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Aktarılan önceki metin, kaynak bağlantıları ve bağımsız kayıtlarla karşılaştırma araştırılır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Sonraki bir nüsha eski bilgiyi taşıyabilir; bu olasılık bütün ayrıntılarının doğru olduğunu da garanti etmez.",
          },
        ],
        answer:
          "Önce metnin aktarım zinciri ve önceki kaynaklarla ilişkisi araştırılır; yalnız nüsha tarihinden ilgisizlik kararı verilmez.",
        check:
          "Sonuç hem eski bilginin aktarılabileceğini hem ayrıca eleştiri gerektiğini koruyor mu?",
        pitfall: "Geç nüsha ile geç olay anlatısını aynı şey sanmak.",
      },
      {
        title: "Geçiş yolu kapanınca hangi bağ değişir?",
        prompt:
          "Özgün kurmaca dosyada bir Rumeli üssüne iaşe, tek açık deniz geçişinden taşınıyor. Dosya, kara yoluyla ek taşıma veya yerel stok bilgisi vermiyor. Geçiş geçici olarak kapanıyor. Önce hangi ilişkiyi yeniden denetlemek gerekir?",
        strategy:
          "Değişen koşulun doğrudan etkilediği taşıma bağını seç; ordunun bütün varlığına hüküm verme.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Verilen tek iaşe bağlantısı deniz geçişidir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Kapanma bu bağlantının o sırada kullanılmasını engeller; dosyadaki düzenli ikmal varsayımı yeniden sınanmalıdır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Yerel stok ve alternatif yol verilmediğinden bütün kuvvetin yok olduğu veya üssün kesin düştüğü söylenemez.",
          },
        ],
        answer:
          "Üs ile iaşe kaynağı arasındaki taşıma bağı yeniden denetlenir; tek lojistik kesintiden bütün siyasi sonucu kesinleştiremeyiz.",
        check:
          "Kayıp bağın ikmal olduğunu gösterdin mi; verilmemiş düşüş tarihini ekledin mi?",
        pitfall:
          "İkmal yolunun kapanmasını bütün yerleşimin anında ortadan kalkmasıyla eşitlemek.",
      },
      {
        title: "Saltanat kaydı ile komuta kaydı",
        prompt:
          "Bir kart 1444 Varna sırasında II. Mehmet’in ilk saltanatını, başka bir kart Varna ordusunun başında II. Murad’ın bulunduğunu bildiriyor. İki kayıt mutlaka çelişir mi?",
        strategy:
          "İki kartın aynı niteliği mi yoksa farklı görevleri mi söylediğini belirle.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "İlk kart saltanatın kime ait olduğu alanını doldurur.",
          },
          {
            label: "Adım 2",
            explanation:
              "İkinci kart belirli savaşta fiilen komuta eden kişiyi bildirir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Alanlar farklıdır; verilen iki kayıt birlikte okunabilir. Saltanat ve komuta adlarını zorla tek kutuya indirmek gerekmez.",
          },
        ],
        answer:
          "Çelişki zorunlu değildir; saltanat ve savaş komutası farklı bilgiler olarak kaydedilir.",
        check: "Her kartın verdiği alanı ayrı yazınca çelişki kalıyor mu?",
        pitfall:
          "Bir savaşın komutan adını aynı andaki saltanat bilgisinin yerine koymak.",
      },
      {
        title: "Toparlanmanın hangi ekseni?",
        prompt:
          "Kurmaca bir çizelgede 1413 için “tahtın tek sahibi belirlendi”, aynı tarihli bölge kaydında ise “A bölgesindeki eski beylik ayrı yönetimini sürdürüyor” yazıyor. İlk kayıt ikinciyi kendiliğinden geçersiz kılar mı?",
        strategy:
          "Merkezdeki iktidar birliğiyle her bölgenin idari bağlılığını ayrı sütunda incele.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Taht kaydı hanedan içindeki iktidar ekseniyle ilgilidir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Bölge kaydı ayrı bir yerdeki yerel yönetimin durumunu bildirir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Tek hükümdarın bulunması her eski toprağın aynı anda bağlandığını gerektirmez; iki kayıt bu kapsamlarıyla birlikte doğru olabilir.",
          },
        ],
        answer:
          "Hayır; merkezde iktidar birliği ile bütün bölgelerin yeniden katılması farklı sonuçlardır.",
        check:
          "Verilen A bölgesini bütün devletin çöktüğüne veya tamamen birleştiğine dönüştürdün mü?",
        pitfall:
          "Bir eksendeki toparlanmayı bütün coğrafyanın aynı andaki durumuna taşımak.",
      },
    ],
    recall: [
      {
        prompt: "Uç çevresini neden yalnız bir sınır çizgisi gibi düşünmeyiz?",
        answer:
          "Göç, ticaret, ittifak, çatışma ve farklı toplumsal çevrelerin kesiştiği insan ilişkileri alanıdır.",
      },
      {
        prompt:
          "Kopya tarihi, anlatılan olayın tarihiyle aynı olmak zorunda mı?",
        answer:
          "Hayır. Sonraki nüsha eski anlatıyı aktarabilir; aktarım zinciri ve içerik ayrıca eleştirilir.",
      },
      {
        prompt: "Karesi ile Çimpe hangi farklı imkânları öne çıkarır?",
        answer:
          "Karesi toprak, komutan ve denizcilik birikimi; Çimpe karşı kıyıda üs ve hareket imkânı sağlar.",
      },
      {
        prompt: "İskân ile istimâletin temel ayrımı nedir?",
        answer:
          "İskân yerleşme ve nüfus düzenini; istimâlet yerel halkın güvenini kazanmaya dönük yönetim yaklaşımını anlatır.",
      },
      {
        prompt:
          "1413’te merkezî toparlanmadan her eski sınırın geri geldiği çıkar mı?",
        answer:
          "Hayır. Hanedan içi iktidar birliği ile her bölgenin bağlılığı ayrı kanıtlarla incelenir.",
      },
      {
        prompt:
          "1402 ile 1453 arasındaki 51 yıl hangi iddiayı tek başına kanıtlamaz?",
        answer:
          "Ankara yenilgisi olmasaydı fethin tam 51 yıl önce olacağını; zaman farkı karşıolgusal nedeni ölçmez.",
      },
    ],
    items: [
      {
        passage:
          "Bir araştırma dosyası, erken Osmanlı uç çevresinde üç bağlantıyı birlikte veriyor: Bizans merkezindeki taht mücadeleleri yerel güçleri hareketlendirmiş; bir geçiş güzergâhının denetlenmesi gelir ve ulaşımı desteklemiş; bazı yerel yöneticilerle ittifak kurulmuş. Dosya bunların her birini büyümeyi kolaylaştıran koşul olarak tanımlıyor.",
        prompt: "Bu dosyanın açıklamasını koruyan sonuç hangisidir?",
        options: [
          "Siyasi, ekonomik ve yerel ilişki etkenleri birlikte değerlendirilmektedir.",
          "Büyümenin tek ve yeterli nedeni Bizans’ın taht mücadeleleridir.",
          "Ulaşım ve gelirin siyasi gelişmeyle hiçbir ilişkisi kurulmamıştır.",
          "Her yerel yöneticiyle mutlaka savaşılmıştır.",
          "Uygun güzergâhın bulunması bütün beyliklere aynı sonucu garanti etmiştir.",
        ],
        steps: [
          "Dosyadaki üç etkeni siyasi durum, gelir-ulaşım ve yerel ittifak olarak ayır.",
          "Her biri kolaylaştırıcı diye verilmiş; hiçbiri tek başına yeterli neden ilan edilmemiş.",
          "Sonucu üç bağlantıyı birlikte koruyacak kapsamda kur.",
        ],
        reasons: [
          "Üç farklı etken ve bunların birlikte ele alındığı doğrudan verilmiştir.",
          "Tek ve yeterli ifadesi dosyada olmayan bir zorunluluk ekler.",
          "Güzergâhın gelir ve ulaşımı desteklediği açıkça söylenmiştir.",
          "Bazı yerel yöneticilerle ittifak bilgisi bütün ilişkilerin savaş olduğu iddiasını çürütür.",
          "Dosya bütün beylikleri karşılaştırmadığı gibi aynı sonuç garantisi de vermez.",
        ],
        knowledge:
          "Kuruluşu açıklayan koşullar birbirini tamamlayabilir; kolaylaştırıcı etken tek başına yeterli neden değildir.",
        strategy:
          "Her açıklama unsurunu sınıfla ve sonucun kaçını veride tuttuğunu denetle.",
        error:
          "Çok etkenli bir açıklamada tek bir koşulu yeterli neden ilan etmek.",
        check:
          "Seçtiğin cümle üç etkeni de koruyor mu; ek bir başarı garantisi üretiyor mu?",
      },
      {
        passage:
          "Bir uç bölgesi kaydında Osman Bey’in X adlı yerel Bizans yöneticisiyle belirli bir sefer için iş birliği yaptığı, aynı sırada Y adlı başka bir yerel yöneticiyle mücadele ettiği yazılıdır. Kayıtta Bizans imparatorunun bağlılık kararı yoktur.",
        prompt: "Bu kayıt yerel ilişkiler için hangi yorumu destekler?",
        options: [
          "İttifak ve mücadele farklı yerel aktörlerle aynı dönemde bulunabilir.",
          "X ile iş birliği bütün Bizans İmparatorluğu’nun bağlılığını kanıtlar.",
          "Y ile mücadele X hakkındaki iş birliği kaydını zorunlu olarak geçersiz kılar.",
          "Bütün yerel yöneticiler Osman Bey’e aynı biçimde davranmıştır.",
          "Belirli seferdeki iş birliği sonsuza kadar değişmeyecek ittifak demektir.",
        ],
        steps: [
          "X ve Y’nin iki farklı yerel aktör olduğunu işaretle.",
          "İş birliği belirli seferle, mücadele başka aktörle sınırlandırılmış.",
          "İki ilişkiyi birlikte koru; imparatorluk çapında veya sürekli bağlılık ekleme.",
        ],
        reasons: [
          "İki ayrı aktörle farklı ilişkiler kayıtta birlikte açıkça verilmiştir.",
          "Yerel bir yöneticinin kararı imparatorun ve bütün devletin kararının yerine geçmez.",
          "Aktörler farklı olduğundan bu iki eylem kendi başına çelişki oluşturmaz.",
          "X’in iş birliği ile Y’nin mücadelesi aynı davranış değildir.",
          "Kayıt belirli seferi anlatır; gelecekteki bütün ilişkileri tanımlamaz.",
        ],
        knowledge:
          "Yerel aktör, merkezî siyasi yapı ve ilişkinin zaman kapsamı ayrı kavramlardır.",
        strategy: "Özne ve zaman sınırını her önermenin yanında tut.",
        error:
          "Tek bir yerel ittifakı bütün imparatorluğun kalıcı bağlılığına genişletmek.",
        check: "Cümlende X’in kararıyla imparatorun kararı aynılaştırılmış mı?",
      },
      {
        passage:
          "Bir araştırmacı Bursa’nın 1326’da Orhan Bey döneminde alınmasından sonraki yıllara ait pazar düzenlemeleri ve idari görevlendirme kayıtlarını karşılaştırıyor. Araştırmada bu kayıtların tam olarak fetih gününde düzenlendiği söylenmiyor.",
        prompt: "Araştırmacının bulguları hangi sonucu en doğrudan destekler?",
        options: [
          "Şehrin alınmasını izleyen ekonomik ve idari düzenleme süreçleri araştırılabilir.",
          "Bütün Osmanlı kurumları 1326’daki fetih günü tamamlanmıştır.",
          "Fetih yalnız askeri bir eylem olduğundan pazar kayıtları tarihsel açıklamada kullanılamaz.",
          "Pazar düzenlemesi ile idari atama tek ve aynı işlem olarak birleştirilmelidir.",
          "Bursa’nın alınmasıyla bütün Anadolu aynı anda tek idareye bağlanmıştır.",
        ],
        steps: [
          "Pazar kaydını ekonomik, görevlendirmeyi idari veri olarak ayır.",
          "Kayıtlar fetih sonrasına ait; aynı gün tamamlanma bilgisi yok.",
          "Şehir kazanımıyla sonraki örgütlenme süreçleri arasındaki araştırılabilir bağı seç.",
        ],
        reasons: [
          "Verilen iki kayıt türü, fetih sonrasındaki ekonomi ve yönetim örgütlenmesine bilgi sağlar.",
          "Bütün kurumlar ve aynı gün ifadeleri araştırmanın verdiği zaman kapsamını aşar.",
          "Askeri gelişme sonrasındaki ekonomik kayıtlar da insan ve toplum faaliyetlerine ilişkin tarihsel kaynaktır.",
          "Pazar düzeni ekonomik, görevlendirme idari işlevi gösterir; aynı işlem sayılmaları gerekmez.",
          "Araştırmanın mekânı Bursa’dır; bütün Anadolu’nun aynı andaki durumu verilmemiştir.",
        ],
        knowledge:
          "Fetih ile bir şehrin ekonomik ve idari örgütlenmesi ilişkili fakat zamansal olarak ayrı süreçlerdir.",
        strategy:
          "Kayıtların işlevini ve tarih aralığını iki bağımsız sütunda karşılaştır.",
        error:
          "Bir dönüm noktasını izleyen bütün kurumları o gün tamamlanmış saymak.",
        check:
          "Sonucun gerçekten Bursa ve verilen sonraki kayıtlarla sınırlı mı?",
      },
      {
        passage:
          "Bir çizelge I. Murad döneminde Germiyanoğullarından bazı yerlerin çeyiz yoluyla alındığını, II. Murad döneminde ise Germiyan topraklarının vasiyet ilişkisiyle katıldığını ayrı satırlarda veriyor. Satırlar farklı dönem ve farklı geçiş aracı gösteriyor.",
        prompt: "Çizelge okunurken hangi ayrım korunmalıdır?",
        options: [
          "Aynı beylikle ilişkili iki gelişmenin dönemi ve katılma aracı farklıdır.",
          "Beylik adı aynı olduğu için iki satır kesinlikle aynı olaydır.",
          "Vasiyet satırı, önceki çeyiz kaydının hiç yaşanmadığını gösterir.",
          "İki gelişmenin de zorunlu olarak yalnız savaşla gerçekleştiği kabul edilir.",
          "Araçlar ayrı olsa da hükümdar ve dönem alanı göz ardı edilebilir.",
        ],
        steps: [
          "Ortak beylik adına rağmen I. Murad ve II. Murad dönemlerini ayrı tut.",
          "Çeyiz ile vasiyetin farklı geçiş araçları olduğunu belirle.",
          "İki kaydı olay, dönem ve araç bakımından ayrı satırlarda koru.",
        ],
        reasons: [
          "Gövde iki farklı dönem ve iki farklı araç bilgisini açıkça verir.",
          "Ortak özne adı olayın zamanını ve aracını özdeşleştirmez.",
          "Sonraki vasiyet, önceki kısmi çeyiz geçişini mantıken ortadan kaldırmaz.",
          "Her iki satırda da savaş dışında araç adı verilmiştir.",
          "Dönem, iki olayın ayrımında açıkça verilen bilgidir; araç farklılığı onu gereksiz kılmaz.",
        ],
        knowledge:
          "Aynı siyasi yapının farklı parçaları veya ilişkileri farklı zamanlarda farklı araçlarla değişebilir.",
        strategy:
          "Ortak ada göre birleştirmeden önce tarih ve araç sütunlarını denetle.",
        error: "Aynı beylik adı geçen iki farklı gelişmeyi tek olaya indirmek.",
        check:
          "Çözümünde hem iki dönemi hem çeyiz/vasiyet ayrımını korudun mu?",
      },
      {
        passage:
          "Kurmaca bir Rumeli yerleşme dosyası yeni gelen hanelerin belirli köylere yerleştirildiğini, tarla kullanımının düzenlendiğini ve yol üstündeki üretimin sürdürülmesinin amaçlandığını bildiriyor. Dosya, bütün eski sakinlerin uzaklaştırıldığını veya her hanenin aynı gelire ulaştığını söylemiyor.",
        prompt: "Bu dosyada yerleştirmenin hangi bağı açıkça kurulmuştur?",
        options: [
          "Nüfusun yerleştirilmesi ile üretim ve yol çevresindeki devamlılık arasında amaç ilişkisi.",
          "Bütün eski sakinlerin zorunlu olarak ortadan kaldırılması.",
          "Her hanenin gelirinin aynı ve sürekli garantili olması.",
          "Üretimin yönetim için hiçbir önem taşımaması.",
          "Köylere yerleştirme yapılmasının her türlü askeri tedbiri gereksiz kılması.",
        ],
        steps: [
          "Dosyadaki eylemi haneleri yerleştirme, amacı üretimi sürdürme olarak ayır.",
          "Tarla ve yol bilgisi geçim ile ulaşım çevresini aynı düzen içinde bağlıyor.",
          "Açık amaç ilişkisini seç; nüfusun tümü, eşit gelir veya askeri kesinlik ekleme.",
        ],
        reasons: [
          "Haneler, tarla ve yol çevresindeki üretim amacı birlikte verilmiştir.",
          "Eski sakinlerin tamamının uzaklaştırılması dosyada söylenmemiştir.",
          "Yerleşme ve tarla düzeni her hanenin eşit veya garantili gelirini kanıtlamaz.",
          "Üretimin sürmesi açıkça amaç olarak gösterildiğinden bu iddia veriye ters düşer.",
          "Dosya askeri tehdit ve tedbirlerin tümünü değerlendirmemektedir.",
        ],
        knowledge:
          "İskân, nüfusun yerleştirilmesiyle üretim ve ulaşım ağının devamlılığını ilişkilendirebilir.",
        strategy:
          "Politikanın bildirilmiş amacıyla gerçekleştiği iddia edilmeyen bütün sonuçları ayır.",
        error:
          "Yerleşme amacını her kişi için gerçekleşmiş ekonomik başarı garantisi sanmak.",
        check:
          "Seçeneğin yalnız amaçlanan bağı mı anlatıyor, verilmemiş sonuç mu üretiyor?",
      },
      {
        passage:
          "Bir karşılaştırma kartı I. Kosova’yı 1389’da I. Murad bağlamında, II. Kosova’yı 1448’de II. Murad bağlamında gösteriyor. İki kartta yer adı benzer; tarih ve hükümdar numarası farklıdır.",
        prompt: "Karşılaştırmayı doğru tutan işlem hangisidir?",
        options: [
          "Aynı yer adı çevresindeki iki farklı karşılaşmayı yıl ve hükümdarıyla ayrı kaydetmek.",
          "1389’u II. Murad, 1448’i I. Murad ile eşleştirmek.",
          "1389 ve 1448’i tek savaşın başlangıç ve bitiş yılları saymak.",
          "II. Kosova’nın verilen tarihini I. Kosova kartına aktarmak.",
          "Yalnız ortak yer adını tutup hükümdar ve sıra numarasını kaldırmak.",
        ],
        steps: [
          "Ortak olan yer adını, farklı olan yıl ve hükümdardan ayır.",
          "1389/I. Murad ile 1448/II. Murad iki ayrı olay kaydı oluşturur.",
          "Sonuçları da ait olduğu kayıtta tut; isim benzerliğiyle birleştirme.",
        ],
        reasons: [
          "İki kartın ortak ve farklı alanları birlikte korunur.",
          "Bu eşleştirme kartlarda verilen hükümdarları tersine çevirir.",
          "Kartlar uzun süren tek savaşı değil iki farklı karşılaşmayı tanımlar.",
          "1448 II. Kosova’ya aittir; I. Kosova’nın 1389 tarihinin yerine geçirilemez.",
          "Hükümdar ve sıra numarası iki olayı ayıran gerekli kimlik alanlarıdır.",
        ],
        knowledge:
          "Benzer savaş adlarında yer, sıra numarası, yıl ve hükümdar birlikte denetlenir.",
        strategy:
          "İki kartın eşleşen ve değişen alanlarını karşılaştırmalı satırlarda göster.",
        error:
          "Benzer özel adı, olayın bütün kimlik alanlarının eşitliği sanmak.",
        check: "Her yıl kendi hükümdarıyla aynı satırda kaldı mı?",
      },
      {
        passage:
          "Bir dosya Ankara Savaşı öncesinde Timur ve Bayezid’in üstünlük mücadelesini, sığınan bey ve yöneticilerle ilgili anlaşmazlıkları anlatıyor. İkinci bölümde 1402 yenilgisinin ardından Bayezid’in oğulları arasında gelişen iktidar mücadeleleri yer alıyor.",
        prompt: "Dosyanın zaman yönünü bozmayan açıklama hangisidir?",
        options: [
          "Sığınan yöneticilerle ilgili anlaşmazlıklar savaş öncesi bağlamda, oğulların mücadeleleri ise yenilgi sonrası süreçte değerlendirilir.",
          "Yenilgiden sonra başlayan oğulların mücadelesi, dosyada savaş öncesinde gerçekleşmiş gösterilmelidir.",
          "Üstünlük mücadelesi ancak savaş bittikten sonra başlayabildiği için ilk bölüm geçersizdir.",
          "Fetret mücadeleleri ile Ankara Savaşı aynı anda başlayan tek ve özdeş olaydır.",
          "İki bölümün farklı zamanı anlatması neden ve sonuç araştırmasını bütünüyle imkânsızlaştırır.",
        ],
        steps: [
          "Dosyanın öncesinde ve ardından ifadelerini zaman işaretleri olarak ayır.",
          "Sığınma anlaşmazlıklarını savaş öncesi, oğulların iktidar mücadelesini sonrası satırına yerleştir.",
          "Sonraki gelişmeyi geriye taşıyarak savaşın önceden gerçekleşmiş nedeni gibi kullanma.",
        ],
        reasons: [
          "Gövdenin verdiği önce/sonra ayrımı bu seçenekte korunur.",
          "Sonraki olayın tarihi geriye taşınarak dosyanın açık zaman yönü bozulur.",
          "Dosya üstünlük mücadelesini açıkça savaş öncesi bağlamda anlatmıştır.",
          "Savaş ile yenilgi sonrası hanedan mücadelesi ilişkili fakat farklı gelişmelerdir.",
          "Zaman ayrımı araştırmayı düzenler; tek başına nedenselliği ispatlamasa da araştırmayı imkânsız kılmaz.",
        ],
        knowledge:
          "Nedensel açıklamada sonuçlar geriye taşınıp önceden gerçekleşmiş neden gibi sunulamaz.",
        strategy:
          "Önce olayların zaman yönünü koru, ardından hangi bağın ayrıca kanıt gerektirdiğini düşün.",
        error:
          "Yenilgiden sonraki taht mücadelesini savaşın önceden oluşmuş nedeni saymak.",
        check: "Öncesi ve sonrası kayıtları çözümünde yer değiştirdi mi?",
      },
      {
        passage:
          "Bir tarihçi kuruluşta gaza düşüncesinin etkisini araştırıyor. Yeni belge hem gaza dilini kullanan savaşçıları hem ticari çıkarla katılan bir grubu hem de yerel güvenlik için ittifak yapan bir yöneticiyi ayrı ayrı kaydediyor. Tarihçi, bütün katılımcıların yalnız tek amaç taşıdığı iddiasını sınamak istiyor.",
        prompt: "Yeni belge karşısında hangi sonuç uygundur?",
        options: [
          "Gaza etkisi araştırılabilir; fakat bütün katılımcıların yalnız aynı amacı taşıdığı iddiası bu farklı kayıtlarla korunamaz.",
          "Ticari çıkar kaydı, gaza dilini kullananların hiç bulunmadığını kanıtlar.",
          "Gaza ifadesinin bulunması ticari çıkar kaydını okunamaz hâle getirir.",
          "Bir grubun güvenlik amacı bütün grupların aynı amaçta olduğunu zorunlu kılar.",
          "Farklı amaçlar bulunduğu için bu aktörlerin aynı siyasi çevrede ilişkilenmesi imkânsızdır.",
        ],
        steps: [
          "Belgenin gaza, ticari çıkar ve güvenliği farklı aktörlerle ilişkilendirdiğini sapta.",
          "Bir amacın varlığı öteki kaydı silmez; farklı aktörler farklı amaç taşıyabilir.",
          "Tek amaç evrenselliğini reddederken gaza etkisinin araştırılabilir oluşunu koru.",
        ],
        reasons: [
          "Çeşitli amaçları birlikte korur ve yalnız aynı amaç ifadesinin kapsamını sınırlar.",
          "Bir grubun ticari amacı başka bir grubun gaza dilini kullanmasını mantıken dışlamaz.",
          "İki kayıt farklı aktörlere aittir; biri ötekinin okunmasını engellemez.",
          "Tek bir aktörün amacı bütün katılımcılara genellenemez.",
          "Farklı çıkarlarla aynı siyasi çevrede iş birliği veya ilişki kurulması mümkündür.",
        ],
        knowledge:
          "Tarihsel bir düşüncenin etkisini kabul etmek bütün aktörlere tek ve aynı niyet yüklemek değildir.",
        strategy:
          "Etkili unsur iddiasını bütün katılımcılara yayılan tek amaç iddiasından ayır.",
        error:
          "Tek neden genellemesini reddederken kanıtlanmış bir unsurun bütün varlığını da reddetmek.",
        check:
          "Hem gaza kaydını hem ticari ve güvenlik kaydını çözümünde korudun mu?",
      },
      {
        passage:
          "Bir ders kartı Anadolu Türk siyasi birliğini farklı beyliklerin Osmanlı yönetimi çevresinde birleştirilmesi hedefi olarak tanımlıyor. Kart, hedefin siyasal yönetim ilişkisiyle ilgili olduğunu; bütün yerel geleneklerin, mesleklerin ve toplumsal grupların aynılaşmasını tanımlamadığını ayrıca belirtiyor.",
        prompt: "Bu tanım hangi ayrımı gerektirir?",
        options: [
          "Siyasi yönetim çevresinde birleşme ile bütün toplumsal ve kültürel özelliklerin özdeşleşmesi farklı iddialardır.",
          "Siyasi birliği tanımlamak için bütün bölgelerin kültürel özelliklerinin aynı olduğu da varsayılmalıdır.",
          "Birlik hedefi, bütün yerel geleneklerin aynı anda yok olduğunu tanımlar.",
          "Kültürel benzerlik kaydı siyasi bağlılığın ayrıca belgelenmesini gereksiz kılar.",
          "Siyasi birliğin amacı tek başına hangi toprakların hangi yöntemle katıldığını da bildirir.",
        ],
        steps: [
          "Tanımın öznesini beylikler, ilişkisini ortak siyasi yönetim olarak belirle.",
          "Toplumsal ve kültürel özdeşlik tanımda ayrıca dışarıda bırakılmış.",
          "Siyasi hedefi kültürel tekbiçimlilik veya ayrıntılı katılma yöntemi yerine kullanma.",
        ],
        reasons: [
          "Kart siyasi yönetim ile kültürel-toplumsal özdeşliği açıkça ayırır.",
          "Tanım siyasi yönetim ilişkisini yeterli alan olarak verir; kültürel özdeşliği gerekli koşul yapmaz.",
          "Yerel geleneklerin bütünüyle yokluğu kartın tanımladığı siyasi ilişki değildir.",
          "Kültürel benzerlik siyasi yetki ve bağlılık bilgisinin yerine geçmez.",
          "Amaç ile o amaca ulaşırken kullanılan somut araç ve olaylar ayrı bilgilerdir.",
        ],
        knowledge:
          "Siyasi birliğin yönetim ölçütü ile toplumsal-kültürel özelliklerin benzerliği birbirinin yerine kullanılamaz.",
        strategy:
          "Tanımın hangi ilişkiyi kapsadığını ve hangi alanları tanımlamadığını belirle.",
        error:
          "Siyasi birlik kavramını bütün yerel hayatın aynılaşması diye genişletmek.",
        check:
          "Sonucun siyasi yönetim ölçütünde mi, kartın vermediği toplumsal sonuçlarda mı?",
      },
      {
        passage:
          "Kurmaca iki yönetim kaydı karşılaştırılıyor. A kaydında yalnız bir sefer için savaşçıların toplandığı yazıyor. B kaydında ise belirli bölgelerde görevlilerin sürekli kayıt tuttuğu, gelirlerin izlendiği ve yerel kararların merkezle yazışıldığı belirtiliyor. Araştırmanın sorusu sürekli yönetim işlerinin görünür olup olmadığıdır.",
        prompt:
          "Bu araştırma sorusu bakımından B kaydının eklediği doğrudan bilgi hangisidir?",
        options: [
          "Sürekli kayıt, gelir izleme ve merkezle yazışma biçimindeki yönetim işleri.",
          "Her görevlinin bütün kararlarının mutlaka adil olduğu.",
          "A’daki sefer için toplanma kaydı, B’deki bütün gelir ve yazışma işlerini de doğrudan bildirir.",
          "B kaydının bulunduğu bütün bölgelerde askeri çatışmanın sonsuza dek bittiği.",
          "B’de kayıt tutulduğu için A ile B’nin örgütlenme özellikleri tamamen aynı kabul edilir.",
        ],
        steps: [
          "Araştırmanın sefer başarısını değil sürekli yönetim işini sorduğunu belirle.",
          "B’nin süreklilik taşıyan kayıt, gelir ve yazışma eylemlerini işaretle.",
          "Bu ek örgütlenme bilgisini seç; adalet ve gelecekteki barış garantisi ekleme.",
        ],
        reasons: [
          "B’de araştırılan sürekli yönetim işlerinin üç somut örneği verilmiştir.",
          "Kayıt mekanizmasının bulunması bütün uygulamaların adaletini tek başına kanıtlamaz.",
          "A yalnız bir sefer için toplanmayı söyler; sürekli gelir ve yazışma işleri B’de ayrıca verilmiştir.",
          "Sürekli yönetim kaydı gelecekteki bütün askeri olayları belirlemez.",
          "B’nin eklediği süreklilik ve idari işler, A’daki tek seferlik toplanmayla özdeş değildir.",
        ],
        knowledge:
          "Sefer için toplanma ile sürekli kayıt ve idari bağlantı farklı örgütlenme özellikleridir.",
        strategy:
          "Kaynakları araştırmanın sorduğu süreklilik ölçütüne göre karşılaştır.",
        error:
          "Bir idari mekanizmanın varlığını bütün sonuçların kusursuzluğu garantisi saymak.",
        check:
          "Seçtiğin bilgi B’deki somut eylemleri mi söylüyor, verilmemiş başarı mı vaat ediyor?",
      },
    ],
  },
  {
    id: "osmanli-askeri-teskilat",
    topic: "detail-234",
    title: "Osmanlı askerî teşkilatı: savaşçıdan düzenli orduya",
    minutes: 135,
    objectives: [
      "İlk uç kuvvetleri ile ilk düzenli yaya/müsellem birliklerini ayır.",
      "Kapıkulu ve tımarlı kuvvetleri bağlılık, gelir ve görevle karşılaştır.",
      "Pençik ile devşirmeyi; Acemi Ocağı ile son görev birliğini ayır.",
      "Vergi, üretim, merkezî otorite ve ordu arasındaki işlev bağlarını açıkla.",
    ],
    sections: [
      {
        title: "Büyüyen sınır, değişen asker ihtiyacı",
        paragraphs: [
          "Osmanlı Beyliği’nin ilk fetihlerinde Osman Bey’in çevresindeki alpler, gaziler, Türkmen aşiret savaşçıları ve gönüllü çevreler etkiliydi. Bu güçleri doğrudan sonraki yüzyılların tam kurumlaşmış merkez ordusu gibi çizme. Sefer zamanında bir araya gelmek ile sürekli eğitim, ödeme ve komuta düzenine bağlı olmak farklı özelliklerdir. Toprak büyüdükçe kuşatma, kaleleri tutma, uzak sefer ve yönetim için daha sürekli kuvvet ihtiyacı doğdu. Askerî kurumlaşmayı yalnız yeni birlik adı ezberlemek yerine bu ihtiyaçlara verilen cevap olarak öğren.",
          "Uzakta ve uzun süre görev yapan bir kuvvetin yalnız savaşçı sayısı değil, iaşe, silah, taşıma, ödeme ve komuta sürekliliği de önemlidir. Kuşatma için gerekli araçlarla sınır boyunda hareketli keşif için gerekli araçlar aynı değildir. Devletleşme sürecinde görevlerin ayrılması bu çeşitlenen ihtiyaçlarla ilişkilidir. Bir uzman ocağının kurulmasını önceki bütün kuvvetlerin aynı gün ortadan kalkması gibi okuma; eski ve yeni unsurlar bir süre birlikte çalışabilir.",
        ],
      },
      {
        title: "Uç çevreleri hem insan hem dayanışma sağlar",
        paragraphs: [
          "Gaziyân-ı Rûm savaşçı uç çevreleriyle; Ahiyân-ı Rûm esnaf, ahlak ve meslek dayanışmasıyla; Abdalân-ı Rûm derviş çevreleriyle; Bâcıyân-ı Rûm da kaynaklarda anılan kadın çevreleriyle ilişkilendirilir. Bu tarihsel toplulukların örgütlenme biçimlerine ilişkin bilgilerin kapsamı aynı değildir; hepsini tek ve değişmez askerî ocak gibi kabul etme. Ahilerin veya dervişlerin kuruluş ve yerleşmeye katkısı, onların bütün faaliyetlerinin profesyonel askerlik olduğu anlamına gelmez. Metin sosyal, ekonomik, dinî ve askerî işlevlerden hangisini veriyorsa çıkarımını o kanıta bağla.",
          "Ahiyân-ı Rûm, Gaziyân-ı Rûm ve Abdalân-ı Rûm adlarındaki ortak Rûm sözcüğü bu bağlamda Anadolu çevresini belirtir; bütün mensupların aynı etnik kökenden veya aynı görevden olduğu anlamını taşımaz. Bâcıyân-ı Rûm hakkında kaynaklar ve tarihçilerin yorumları sınırlı ve tartışmalıdır. Bir anlatıda kadınların toplumsal katkısının anılmasıyla bütün kadınların tek askerî birlik oluşturduğu iddiası farklıdır. Kaynağın verdiği faaliyet kadar sonuç kurulur.",
        ],
      },
      {
        title: "Orhan Bey: yaya ve müsellem",
        paragraphs: [
          "Orhan Bey döneminde ilk düzenli birlikler olarak yaya ve müsellemler oluşturuldu. Yaya piyade, müsellem atlı birliktir. Seferde ücret, barış döneminde kendilerine ayrılan yerlerde üretim ve belirli muafiyetler gibi uygulamalarla desteklendiler. Bu yapı, ilk uç savaşçılarıyla sonraki kapıkulu sistemi arasında bir kurumlaşma aşamasıdır. ‘İlk düzenli ordu’ sorusunda doğrudan Yeniçeri Ocağı’nı seçmek yanlıştır. Sonraki yüzyıllarda yaya ve müsellemlerin görevleri değişebilir; kuruluş dönemindeki işlevi bütün Osmanlı tarihine değişmeden yayma.",
          "Düzenli birliğin varlığı, her asker için bütün yıl aynı işin yapıldığı anlamına gelmez. Yaya ve müsellemlerin kuruluş aşamasında sefer zamanı ücretle desteklenmesi, barış zamanında üretim ve muafiyet ilişkileri içinde bulunması birlikte öğrenilir. Kapıkulu ocaklarının gelişmesiyle önceki birliklerin bir bölümünün taşıma, yol veya yardımcı hizmetlere yönelmesi görevlerin zamanla değişebildiğini gösterir. Bir kurum adını bütün yüzyıllarda değişmez tek işleve eşitleme.",
        ],
      },
      {
        title: "Kapıkulu: merkeze bağlı sürekli kuvvet",
        paragraphs: [
          "Kapıkulu, doğrudan padişaha ve merkezî düzene bağlı kuvvetleri kapsar. Merkez hazinesinden alınan düzenli ödeme ulufedir. Kapıkulunun tamamı yeniçeri veya tamamı piyade değildir: piyade ocakları ile kapıkulu süvarileri ayrılır. Yeniçeri sürekli merkez piyadesidir; sipah, silahtar, sağ ve sol ulufeciler ile sağ ve sol garipler kapıkulu süvarileri içinde öğrenilir. I. Murad döneminde yeniçeri ve kapıkulu kurumlaşması belirginleşir. ‘Sipahi’ sözcüğü tek başına yeterli ayraç değildir; kapıkulu sipahisi ile tımarlı sipahi aynı gelir ve bağlılık düzenine sahip değildir.",
          "Kapıkulu bir üst başlıktır. Piyade ocakları içinde yeniçerilerle birlikte farklı uzmanlıklar; süvari kısmında sipah, silahtar, sağ ve sol ulufeciler ile sağ ve sol garipler bulunur. Buradaki sipah/sipahi adı, dirlik geliriyle hizmet eden taşra sipahisini tek başına tanımlamaz. Ulufe merkez hazinesinden yapılan düzenli ödemedir; bir birliğin o anda başkent dışında görev yapması onun ödeme ve bağlılık düzenini kendiliğinden değiştirmez.",
        ],
      },
      {
        title: "Ocak adı yerine yaptığı işe bak",
        paragraphs: [
          "Cebeci silahların hazırlanması, bakımı ve dağıtımıyla; topçu top dökümü ve kullanımıyla; top arabacıları ağır topların taşınmasıyla; lağımcı kuşatmada tünel ve lağım çalışmalarıyla ilişkilidir. Humbaracı patlayıcı humbara mühimmatıyla, bostancı saray ve çevresinin korunması gibi görevlerle düşünülür. Bu ocakların tamamı aynı tarihte ve aynı biçimde ortaya çıkmış değildir; ilk kuruluş birimlerinin yanına zamanla yeni uzmanlıklar eklenmiştir. Bir soruda ‘mühimmatın taşınması’ deniyorsa silahı kullanma işini otomatik seçme. Lojistik, üretim, bakım ve cephede kullanma aynı ordunun farklı işleridir.",
          "Silahın yapılması, kullanıma hazırlanması, depodan dağıtılması, taşınması ve cephede kullanılması bir iş zinciridir. Cebeci silah donanımının bakım ve dağıtımında; topçu topun dökümü ve kullanımında; top arabacısı ağır topun taşınmasında ayırt edilir. Bir kayıtta yalnız top sözcüğünün bulunması hangi işlemin yapıldığını göstermez. Taşıma görevi verilen kişi o kayıttan dolayı topu kullanan kişi sayılmaz; bakım kaydı da silahın kimin adına üretildiğini her zaman bildirmez.",
        ],
      },
      {
        title: "Pençik: savaş esiri temelli kaynak",
        paragraphs: [
          "Pençik, savaş esirlerinin beşte biri ilkesine dayanan bir insan kaynağı düzenidir. Uygun bulunanların askerî hizmet için hazırlanması, kapıkulu insan gücünün ilk kaynaklarından biridir. Buradaki beşte bir oranını Osmanlı tebaasının bütün çocuklarından alınan sabit bir pay gibi yorumlama. Savaşta ele geçirilen esir ile devletin kendi tebaası içinden seçilen kişi farklı başlangıç durumlarıdır. Eğitim ve görevlendirme aşamaları bulunsa da pençik ile devşirme kaynak bakımından aynı yöntem değildir. Soru, oranı mı yoksa kimden ve hangi koşulda alınmayı mı ayırmanı istiyor, önce bunu belirle.",
          "Pençik sözcüğündeki beşte bir ilkesi savaş esiri kaynağıyla ilgilidir; bütün tebaa ailelerinin oğullarından otomatik beşte bir alınması değildir. Bir kaydın savaş esiriyle başlaması, daha sonraki eğitimin her ayrıntısını kendiliğinden vermez. Kimlerin seçildiği, hangi hazırlıktan geçtiği ve hangi hizmete ayrıldığı için ayrı bilgi gerekir. Bu tarihsel zorunlu hizmet düzenini yalnız bir oran hesabına indirgemek, insan kaynağının niteliğini gözden kaçırır.",
        ],
      },
      {
        title: "Devşirme ve Acemi Ocağı: seçimden eğitime",
        paragraphs: [
          "Devşirme, belirli Hristiyan tebaa ailelerinin oğulları arasından kurallar çerçevesinde seçilmesine dayanır. Türk aileleri yanında dil ve kültür öğrenme, Acemi Ocağı’nda eğitim ve yeteneğe göre farklı hizmetlere ayrılma gibi aşamalar vardır. Acemi Ocağı bir hazırlık kurumudur; Yeniçeri Ocağı ise eğitim sonrasındaki görev yerlerinden biridir. Devşirmelerin tamamı yeniçeri olmaz; saray veya başka merkezî hizmetlere ayrılanlar da vardır. Seçim ve uygulama kuralları dönemle değişebilmiştir. Bu tarihsel, zorunlu insan kaynağı uygulamasını günümüzdeki gönüllü okul tercihiyle aynılaştırma; ‘bütün Hristiyan çocuklar’ gibi kapsamsız genelleme de yapma.",
          "Eğitim yolları tek bir düz çizgi olarak çizilmemelidir. Bazı adaylar saray hizmetleri için ayrılırken askerî ocaklara hazırlananların Acemi Ocağı ve sonraki görevlendirme yolu öne çıkar. Seçim, hazırlık ve nihai görev aynı aşama değildir. Yeniçeri, cebeci veya saray görevi gibi farklı sonuçların bulunması, her adayın aynı yerde aynı süreyi tamamladığı anlamına gelmez. Uygulamaların kuralları ve kapsamı dönemlere göre değişebildiğinden sabit bir yaş veya yıl sayısı bütün tarihe yayılmaz.",
        ],
      },
      {
        title: "Tımar: toprağın kendisi değil vergi geliri",
        paragraphs: [
          "Tımar sisteminde belirli vergi gelirlerini toplama ve kullanma yetkisi hizmet karşılığında tahsis edilir. Bu yetki, sipahiye toprağı modern özel mülk olarak satma veya istediği gibi miras bırakma hakkı vermez. Üretici köylü, toprağı işleyen ve kanunlarla yükümlülükleri belirlenen kişidir. Sipahi kanunda belirtilenden fazla vergi isteyemez; karşılıksız çalıştırma gibi keyfî müdahaleler yetki sınırları içinde değildir. Toprağın tasarrufu, devletin mülkiyeti ve vergi gelirinin tahsisi aynı kavram değildir. Soruda ‘geliri tahsis etmek’ ifadesini görüp ‘toprağın mülkiyetini devretmek’ sonucuna atlama.",
          "Mülkiyet, toprağı kullanma hakkı ve vergi geliri toplama yetkisi ayrı hukuki ilişkilerdir. Dirlik tahsisi hizmetle bağlantılı gelir yetkisi verir; köylünün tasarruf koşulları ve devletin denetimi de bu düzenin parçalarıdır. Sipahinin geliri toplaması onu sınırsız yetkili özel mülk sahibi yapmaz. Tımarın her Osmanlı eyaletinde aynı biçimde bulunduğu da söylenmez; coğrafya ve dönem farklılıkları dikkate alınır.",
        ],
      },
      {
        title: "Vergi gelirinden cebelüye ve üretime",
        paragraphs: [
          "Tımarlı sipahi, dirlik geliri karşılığında askerî ve idari hizmet yüklenir; gelirin büyüklüğüne göre cebelü adı verilen atlı asker yetiştirir ve seferde onlarla katılır. Gelir taşrada değerlendirilerek merkez hazinesinden bütün bu askerler için doğrudan maaş çıkması azaltılır. Aynı sistemin üretimin devamı, verginin toplanması, yerel güvenlik ve düzenle bağlantıları vardır. Bu nedenle tımar yalnız asker toplama tekniği veya yalnız vergi yöntemi değildir. Has, zeamet ve tımar, dirlik gelirlerinin büyüklüğüne göre ayrımlardır; hepsini aynı asker sayısı ve aynı gelir eşiğiyle düşünme. Bu modelde kişiye özgü keyfî cebelü oranı uydurulmaz.",
          "Dirliğin gelir miktarıyla hizmet yükümlülüğü ilişkilidir; ancak tarihî yükümlülükleri hesaplamak için ilgili dönemin kanunu ve gelir türü bilinmelidir. Öğretim etkinliğinde verilen kurmaca bir oran gerçek bütün tımarlara uygulanamaz. Gelirin taşrada değerlendirilmesi merkezden doğrudan nakit maaş ödeme ihtiyacını azaltabilir; bu, merkez hazinesinin hiçbir askerî harcaması kalmadığı anlamına gelmez. Üretim, tahsil ve asker yetiştirme bağları ayrı ayrı gösterilir.",
        ],
      },
      {
        title: "Kapıkulu ile tımarlı sipahiyi üç eksende ayır",
        paragraphs: [
          "Bir profil için gelir kaynağını, bağlılık/yerini ve görev türünü birlikte oku. Hazineden ulufe alan merkez piyadesi yeniçeriyi; dirlik geliri karşılığında cebelüyle sefere gelen taşra atlısı tımarlı sipahiyi düşündürür. Fakat atlı olmak tek başına tımarlı sipahiyi kanıtlamaz: kapıkulu süvarileri de vardır ve merkezden ulufe alırlar. Benzer biçimde ‘merkeze bağlı’ olmak bütün kuvvetlerin aynı görev ve toplumsal kökene sahip olduğu anlamına gelmez. İki veya üç somut özellik bir araya geldiğinde ayırıcı sınıflandırma daha güvenilir olur.",
          "Bir kuvvet profili için önce ödeme kaynağı, sonra teşkilat sınıfı ve ayırıcı görev belirlenir. Ulufe bilgisi merkez ödeme düzenini gösterir; fakat tek başına yeniçeriyi cebeciden ayırmaz. Atlı teşkilat bilgisi, merkezden ulufe alan süvari ile dirlik geliri kullanan taşra sipahisini de tek başına ayırmaz. Birlik adı için yeterli ayırt edici kayıt yoksa belirli adayları açık bırakmak, olmayan görevi uydurmaktan daha doğrudur.",
        ],
      },
      {
        title: "Akıncı, azeb ve yardımcı kuvvetler",
        paragraphs: [
          "Akıncılar sınır boylarında keşif, akın, öncülük ve hareketli görevlerle ilişkilendirilen atlı kuvvetlerdir. Azebler gönüllü Türk gençlerinden seçilebilen hafif piyade çevresidir; sefer, öncü veya kale hizmetleri bağlamında görülür. Bunları sırf ‘asker’ oldukları için ulufeli kapıkulu piyadesiyle özdeşleştirme. Ordu, merkez, taşra ve yardımcı kuvvetlerin birlikte çalışmasıyla görev yapar. Belirli bir birlik, farklı dönemlerde farklı hizmetlerde kullanılabileceğinden sadece ‘kalede bulundu’ gibi tek bir konumdan bütün teşkilat kimliğini kesinleştirme; gelir ve komuta bilgisine de ihtiyaç vardır.",
          "Akıncılar uçta hareketli görevler yaparken azebler piyade görevleriyle ilişkilidir; diğer yardımcı kuvvetlerin yol, taşıma ve kale hizmetleri de bulunabilir. Görevin yapıldığı yer her zaman birliğin bütün kimliğini belirlemez. Bir merkez birliği taşrada güvenlik işinde bulunabilir; bir yardımcı kuvvet kuşatmaya katılabilir. Sınıflandırmada yalnız konuma değil, komuta, ödeme ve tanımlanan görev bilgisine birlikte bakılır.",
        ],
      },
      {
        title: "Merkezî otoriteyi ilişki üzerinden açıkla",
        paragraphs: [
          "Doğrudan merkezden eğitim, görevlendirme ve ödeme, hükümdarın taşradaki yerel güçlere bağımlılığını azaltabilir. Tımar ise vergi ve askerî hizmeti taşrada örgütler. Bu iki düzeni birlikte düşünmek, Osmanlı askerî sistemini yalnız tek bir sınıfa dayalı sanmayı önler. Eğitimli merkez kuvvetinin bulunması bütün taht kavgalarının veya siyasi sorunların ortadan kalktığı anlamına gelmez. Çözümde ‘hangi kurum hangi ihtiyacı hangi araçla karşılıyor?’ sorusunu sor. Gelir kaynağı değiştiğinde profilin hangi özelliği değişir, hangisi değişmez? Böyle bir karşı örnek kurmak, yalnız birlik adını hatırlamaktan daha güçlü bir kontrol sağlar.",
          "Merkez kuvveti, taşra atlısı ve yardımcı kuvvetin farklı kaynaklarla desteklenmesi, devletin aynı anda farklı askerî ihtiyaçları karşılayabilmesini sağlayabilir. Ancak kurumların varlığı bütün dönemlerde aynı disiplin, sayı veya siyasi sonuç garantisi değildir. Kaynakta asker sayısı veriliyorsa sayının hangi tarihe, hangi sınıfa ve hangi kayıt türüne ait olduğu sorulur. Bir yüzyıla ait sayıyı başka yüzyıldaki ordunun değişmez büyüklüğü gibi kullanma.",
        ],
      },
      {
        title: "Aynı silah çevresinde farklı uzmanlıklar",
        paragraphs: [
          "Bir kuşatma yalnız atış anından oluşmaz. Mühimmatın hazırlanması, topun yola çıkarılması, arazide mevziye ulaştırılması ve kullanılması birbirine bağlı işlerdir. Uzmanlıkları iş zincirinde ayırmak, benzer ocak adlarını doğru göreve bağlamayı sağlar. Bir aşamadaki kaydın öteki aşamanın bütün ayrıntılarını kanıtlamadığı korunur.",
          "Karşılaştırma tablosunda ocağın adını ezber işareti olarak bırakma; karşısına ayırıcı fiili yaz. Bakım kaydı, taşıma kaydı ve atış kaydı farklı eylemlerdir. Aynı kişi başka bir zamanda başka iş yapmış olabilir; bu olasılık verilen kayıttaki ana görevin açık sınıflandırılmasını engellemez. Buradaki tablo görevleri öğretir, her ocağın bütün tarih boyunca hiç değişmediği iddiasını taşımaz.",
        ],
        table: {
          headers: ["Ocak", "Ayırıcı iş", "Yakın fakat ayrı iş"],
          rows: [
            [
              "Cebeci",
              "Silah donanımının bakım ve dağıtımı",
              "Ağır topu taşıma",
            ],
            ["Topçu", "Top dökümü ve kullanımı", "Yalnız taşıma"],
            ["Top arabacısı", "Ağır topun taşınması", "Topu cephede kullanma"],
            ["Lağımcı", "Kuşatmada tünel ve lağım işleri", "Medresede öğretim"],
          ],
        },
      },
      {
        title: "Hazırlık yolu ile nihai görev ayrı düğümlerdir",
        paragraphs: [
          "İnsan kaynağına ilişkin bir şema başlangıçtaki kaynağı, hazırlığı ve görev yerini ayrı kutularda göstermelidir. Savaş esiri kaynağı pençikle, belirli tebaa ailelerinden kurallı seçim devşirmeyle ilişkilidir. Hazırlık kurumu olan Acemi Ocağı bu iki başlangıç tanımının yerine geçmez; nihai görev de hazırlık aşamasının adı değildir.",
          "Bir şema saray hizmetine ayrılan aday ile askerî ocağa hazırlanan adayı farklı yollara ayırabilir. Bu ayrım, yolların dönemle değişmeyen tek biçim olduğu anlamına gelmez. Tarihsel zorunlu seçim, din değiştirme ve devlet hizmetine bağlanma boyutları modern gönüllü bir okul başvurusuyla eşitlenmez. Öğretimde amaç bu kurumların tarihsel işleyişini açıklamaktır; geçmiş uygulamadan bugüne kişisel görev veya değer sonucu üretilmez.",
        ],
      },
      {
        title: "Gelir, bağlılık ve işlevi aynı tabloya yerleştir",
        paragraphs: [
          "Merkez hazinesinden ödeme alan bir atlı kuvvet kaydı, kapıkulu süvarileriyle uyumlu olabilir. Dirlik geliri ve cebelü yükümlülüğü verilen taşra atlısı ise başka bir gelir-hizmet ilişkisini gösterir. İkisinin de atlı olması ödeme kaynaklarının aynı olduğunu gerektirmez. Benzer biçimde aynı merkezden ödeme almak da iki ocağın silah ve uzmanlığını özdeşleştirmez.",
          "Bazı kayıtlarda yalnız bir sütun doludur. Örneğin ulufe yazıp görevi belirtmeyen bir belge, merkez piyadesindeki belirli ocağı tek başına seçtirmez. Ek görev kaydı geldiğinde adaylar daralabilir. Birbiriyle uyuşmayan özellikler verildiğinde bunları zorla tek birime yapıştırmak yerine kaydın tutarlılığı ve aday listesinin kapsamı yeniden incelenir. Bu, tarihte hiçbir başka birliğin bulunmadığı hükmü değildir.",
        ],
      },
    ],
    examples: [
      {
        title: "Bakım zincirinde eksik halka",
        prompt:
          "Kurmaca bir kuşatma dosyasında silahlar depodan teslim edilmiş, fakat arızalı donanımın onarıldığına ilişkin kayıt yoktur. Dosyada cebecilerin bakım ve dağıtım işlerinden sorumlu olduğu ayrıca tanımlanmıştır. Hangi görev kaydı istenmelidir?",
        strategy:
          "Zincirin tamamlanan dağıtım adımıyla eksik bakım adımını ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Teslim kaydı silah dağıtımını belgeliyor.",
          },
          {
            label: "Adım 2",
            explanation:
              "Onarımın yapıldığı bu kayıttan çıkmaz; bakım için ayrı işlem kaydı gerekir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Dosyada bakım cebeci görevi olarak tanımlandığından aranan belge o bakım işinin kaydıdır.",
          },
        ],
        answer:
          "Cebeci bakım/onarım kaydı istenir; silahın teslim edilmiş olması onarımın yapıldığını tek başına göstermez.",
        check: "Eldeki teslim kaydını yok saymadan eksik işlemi belirledin mi?",
        pitfall:
          "Aynı silahla ilgili bütün işlemleri teslim belgesinden çıkarma.",
      },
      {
        title: "Aynı birlik adı, farklı dönem görevi",
        prompt:
          "İki öğretim kartından ilki yaya ve müsellemlerin Orhan Bey dönemindeki düzenli sefer görevini, ikincisi sonraki dönemde bazı mensupların yol ve taşıma hizmetini anlatıyor. Bir öğrenci ad aynıysa işin de mutlaka aynı kaldığını söylüyor. Kayıtlar nasıl okunur?",
        strategy: "Kurum adını zaman ve görev alanlarıyla birlikte izle.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "İlk kart kuruluş aşamasındaki sefer görevini anlatır.",
          },
          {
            label: "Adım 2",
            explanation:
              "İkinci kart sonraki dönem ve bazı mensuplarla sınırlı yardımcı hizmet verir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Kurumun görevleri zamanla değişebildiğinden ad ortaklığı iki kaydı çelişik yapmaz.",
          },
        ],
        answer:
          "Dönem ve görev alanları ayrılır; aynı ad tek ve değişmez işlev garantisi değildir.",
        check:
          "İkinci karttaki bazı sözcüğünü bütün mensuplara genişlettin mi?",
        pitfall: "Bir kurum adını bütün yüzyıllarda tek işleve sabitlemek.",
      },
      {
        title: "Eğitim şemasında iki yol",
        prompt:
          "Kurmaca şemada P adayı saray hazırlığına, Q adayı Acemi Ocağı üzerinden askerî ocağa hazırlığa ayrılmıştır. Her iki seçimin de yetenek ve görevlendirme kaydıyla yapıldığı belirtiliyor. Şema P’nin de zorunlu olarak Q’nun bütün kurumlarından geçtiğini gösterir mi?",
        strategy:
          "Ortak başlangıcı bütün sonraki kutuların ortaklığı gibi yorumlama.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "P ile Q’nun sonraki görev hazırlıkları iki ayrı yola ayrılmış.",
          },
          {
            label: "Adım 2",
            explanation:
              "Acemi Ocağı Q’nun yolunda açıkça verilmiş; P’nin yolunda verilmemiş.",
          },
          {
            label: "Adım 3",
            explanation:
              "P’nin bütün Q aşamalarından geçmesi için ek kayıt gerekir; iki yolun aynılaştırılması doğru değildir.",
          },
        ],
        answer:
          "Hayır; şema farklı görevlere hazırlık yollarını ayırır, her aday için tek doğrusal eğitim zorunluluğu kurmaz.",
        check:
          "Sonucunda yalnız çizilmiş yolları mı kullandın, araya verilmemiş kurum mu ekledin?",
        pitfall:
          "Aynı insan kaynağından gelen her adayın bütün hazırlık aşamalarını aynı sanmak.",
      },
      {
        title: "Yerel gelir hangi gideri destekliyor?",
        prompt:
          "Tamamen kurmaca bir hizmet hesabında yerel vergi gelirinin 12 birimi sipahinin ve yanında sefere gelen askerlerin donanımına ayrılıyor. Aynı dosyada merkez hazinesinin başka birliklere 30 birim ödediği yazıyor. İlk kayıttan merkezî askerî harcamanın sıfırlandığı çıkar mı?",
        strategy:
          "Yerel tahsis ile bütün merkez giderini iki ayrı hesapta tut.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "12 birim belirli yerel gelirden belirli hizmete ayrılmış.",
          },
          {
            label: "Adım 2",
            explanation:
              "Merkezdeki başka birliklerin 30 birimlik ödemesi ayrıca verilmiş.",
          },
          {
            label: "Adım 3",
            explanation:
              "Yerel tahsis bazı doğrudan merkez ödemelerinin yerini tutabilir; bütün merkez harcamasını ortadan kaldırdığı sonucu çıkmaz.",
          },
        ],
        answer:
          "Hayır; yerel tahsis ile merkezde süren ödeme birlikte bulunur. 12 ve 30 kurmaca hesap birimleridir, tarihî tımar oranı değildir.",
        check:
          "İki gelir-hizmet bağını birbirine karıştırmadan ayrı gösterebildin mi?",
        pitfall:
          "Bir yerel tahsisi bütün devlet giderlerinin sona ermesi gibi genellemek.",
      },
    ],
    recall: [
      {
        prompt: "Kapıkulu neden yeniçeriyle eş anlamlı değildir?",
        answer:
          "Kapıkulu üst başlığında başka piyade ocakları ve süvari birlikleri de bulunur; yeniçeri bunlardan biridir.",
      },
      {
        prompt: "Silah bakımını topun taşınmasından hangi fiille ayırırsın?",
        answer:
          "Bakım-onarım/dağıtım cebeci işini, ağır topun taşınması top arabacısı işini ayırt eder.",
      },
      {
        prompt: "Pençikteki beşte bir hangi başlangıç grubuyla ilişkilidir?",
        answer:
          "Savaş esirleriyle; bütün tebaa ailelerinin çocuklarından aynı pay alınması değildir.",
      },
      {
        prompt: "Acemi Ocağı ile Yeniçeri Ocağı aynı aşama mıdır?",
        answer:
          "Hayır; Acemi Ocağı hazırlık kurumudur, Yeniçeri Ocağı eğitim sonrasındaki görev yerlerinden biridir.",
      },
      {
        prompt:
          "Tımar tahsisi toprağı keyfî özel mülk olarak satma hakkı verir mi?",
        answer:
          "Hayır; hizmet karşılığı gelir tahsisi, mülkiyet ve kullanım haklarının bütününü sınırsız devretmez.",
      },
      {
        prompt:
          "Ulufe ve atlı teşkilat bilgisi tımarlı sipahiyi zorunlu kılar mı?",
        answer:
          "Hayır; kapıkulu süvarileri de vardır. Dirlik geliri, bağlılık ve cebelü gibi ayırıcı kayıtlar ayrıca değerlendirilir.",
      },
    ],
    items: [
      {
        passage:
          "Bir teşkilat şeması kapıkulu başlığının altında yeniçeri ve cebeci gibi piyade ocaklarını, ayrıca sipah ve silahtar gibi süvari birliklerini gösteriyor. Şema bu birliklerin doğrudan merkezî düzene bağlı olduğunu, ayırıcı görevlerinin ise farklı bulunduğunu bildiriyor.",
        prompt:
          "Şemanın üst başlık ile alt birim ilişkisini koruyan yorum hangisidir?",
        options: [
          "Yeniçeri kapıkulu içindeki bir birimdir; kapıkulunun bütününü tek başına karşılamaz.",
          "Kapıkulu yalnız yeniçerilerin başka adıdır.",
          "Kapıkulu başlığı altında süvari bulunması şemanın mutlaka yanlış olduğunu gösterir.",
          "Merkeze bağlı bütün birimler aynı silah ve göreve sahip olmalıdır.",
          "Cebeci ile silahtarın aynı üst başlıkta olması ikisini aynı ocak yapar.",
        ],
        steps: [
          "Kapıkulunu üst başlık, verilen dört adı alt birimler olarak ayır.",
          "Piyade ve süvari kollarının ikisinin de şemada bulunduğunu denetle.",
          "Ortak bağlılık bilgisini korurken birimlerin görev ayrımını silmeyen yorumu seç.",
        ],
        reasons: [
          "Yeniçeri kapsanan birimdir; diğer piyade ve süvari kolları üst başlığın daha geniş olduğunu gösterir.",
          "Şemada yeniçeri dışında birimler de açıkça kapıkulu altında verilmiştir.",
          "Kapıkulu süvarileri bulunduğu gövdede açıkça tanımlanmıştır.",
          "Ortak merkez bağlılığı görev ve silahların aynı olmasını gerektirmez.",
          "Aynı üst grupta olmak ayrı alt birimleri özdeşleştirmez.",
        ],
        knowledge:
          "Kapıkulu, piyade ocakları ve süvari birliklerini içeren geniş bir teşkilat başlığıdır.",
        strategy:
          "Grubun bütünüyle tek bir üyesini karıştırmadan kapsama ilişkisini izle.",
        error: "Yeniçeriyi kapıkulunun bütününün eş anlamlısı saymak.",
        check:
          "Seçimin şemadaki hem piyade hem süvari kollarına yer bırakıyor mu?",
      },
      {
        passage:
          "Bir öğretim tablosu iki profili karşılaştırıyor: K kapıkulu süvarisidir ve merkez hazinesinden ulufe alır; T tımarlı sipahidir ve hizmeti karşılığında tahsis edilen dirlik gelirinden yararlanır. Her iki profil de atlı teşkilattadır. Yeni bir kayıtta yalnız atlı teşkilat bilgisi bulunuyor.",
        prompt:
          "Yeni kaydı bu iki aday arasında ayırmak için hangi ek bilgi doğrudan belirleyicidir?",
        options: [
          "Ödemenin merkez hazinesinden mi, tahsis edilen yerel vergi gelirinden mi karşılandığı.",
          "Kayıtta atlı sözcüğünün ikinci kez geçip geçmediği.",
          "İki adayın da askeri görev üstlenip üstlenmediğinin yeniden söylenmesi.",
          "Her iki adın da Osmanlı teşkilatıyla ilgili olduğunun belirtilmesi.",
          "Yeni kaydın hangi yazı rengiyle tutulduğu.",
        ],
        steps: [
          "Atlı teşkilatın hem K hem T için ortak olduğunu belirle.",
          "Tabloda iki adayı ayıran doğrudan değişken gelir kaynağıdır.",
          "Yeni kayıtta o gelir bilgisini istemek iki ortak özelliği tekrarlamaktan farklıdır.",
        ],
        reasons: [
          "Ulufe ile dirlik tabloda farklı adayları ayıran ödeme kaynaklarıdır.",
          "Ortak olan atlı bilgisi tekrar edilse de adaylar ayrılmaz.",
          "İki aday da askeri profil olduğundan bu tekrar ayırıcı değildir.",
          "Ortak Osmanlı bağlamı gelir düzenlerinin farkını belirlemez.",
          "Yazı rengi verilen sınıflandırma ölçütlerinden biri değildir; ayrıca görevin mali kaynağını bildirmez.",
        ],
        knowledge:
          "Kapıkulu süvarisi ile tımarlı sipahi atlı olabilir; ulufe ve dirlik gelirleri farklıdır.",
        strategy:
          "Ortak özellikleri elemeden önce hangi sütunun adayları gerçekten ayırdığını bul.",
        error:
          "İki adayda ortak olan atlı bilgisini tek başına ayırıcı kanıt saymak.",
        check: "İstediğin ek bilgi K ve T için farklı değer alıyor mu?",
      },
      {
        passage:
          "Sınırlı bir aday listesinde A ve B adlı iki kapıkulu süvari birliği bulunuyor. Tabloda ikisi de ulufeli ve atlı olarak tanımlanmış; özel görevleri yazılmamış. İncelenen belgede de yalnız merkez hazinesinden ödeme ve atlı teşkilat bilgisi var.",
        prompt: "Yalnız bu tablo ve belgeyle hangi sonuca varılmalıdır?",
        options: [
          "A ile B arasında tek birim seçilemez; verilen iki özellik ikisine de uyar.",
          "Ulufe bilgisi bulunduğu için A kesin, B imkânsızdır.",
          "Atlı bilgisi bulunduğu için B kesin, A imkânsızdır.",
          "İki ortak özellik bulunduğu için A ve B mutlaka aynı birimin iki adıdır.",
          "Özel görev yazılmadığından belgedeki ulufe bilgisi de geçersiz sayılmalıdır.",
        ],
        steps: [
          "Belgedeki ödeme ve teşkilat bilgilerini iki adayın satırıyla karşılaştır.",
          "Her iki özellik A’da da B’de de bulunuyor; ayırıcı görev verisi yok.",
          "İki adayı açık bırak; eksik ayrımdan tek kimlik veya aynı ocak sonucu üretme.",
        ],
        reasons: [
          "A ve B verilen iki koşulu birlikte sağlıyor; tek seçim için başka ayırıcı kayıt gerekir.",
          "Tablo ulufeyi yalnız A’ya özgü vermemiştir.",
          "Tablo atlı teşkilatı yalnız B’ye özgü vermemiştir.",
          "Ortak özellikler iki ayrı birimin mutlaka aynı ad olduğunu göstermez.",
          "Bir alanın eksikliği öteki açık alanın varlığını ortadan kaldırmaz.",
        ],
        knowledge:
          "Bir kaydın bazı özellikleri belirlemesi, belirli alt birimi tek başına kesinleştirmesine yetmeyebilir.",
        strategy:
          "Bütün verilen koşulları sağlayan aday sayısını denetle; tek aday yoksa ek kayıt iste.",
        error:
          "Ortak iki özelliği, aday listesindeki tek bir adın zorunlu kanıtı gibi kullanmak.",
        check:
          "Öteki aday seçilen iki koşuldan herhangi biriyle gerçekten çelişiyor mu?",
      },
      {
        passage:
          "Pençik açıklamasında, savaş esirlerinin beşte biri ilkesine dayanan bir insan kaynağı düzeninden söz ediliyor. İncelenen dosyada tebaa ailelerinden çocuk seçilmesine ilişkin ayrı bir kayıt yoktur.",
        prompt: "Açıklamadaki beşte bir oranının başlangıç grubu hangisidir?",
        options: [
          "Savaşta ele geçirilen esirler.",
          "Ülkedeki bütün köylü hanelerinin oğulları.",
          "Merkez hazinesinden maaş alan bütün memurlar.",
          "Bir tımarın yıllık ürün vergisinin tamamı.",
          "Acemi Ocağı’ndan mezun olmuş askerlerin tamamı.",
        ],
        steps: [
          "Oranın hangi isim grubuyla birlikte verildiğine bak: savaş esirleri.",
          "Başlangıç kaynağını tebaa ailesi, gelir veya eğitim sonrasındaki görev grubuyla değiştirme.",
          "Beşte birin esir kaynağına ait olduğu seçeneği belirle.",
        ],
        reasons: [
          "Gövde oranı doğrudan savaş esirleriyle ilişkilendirmiştir.",
          "Tebaa ailelerinden çocuk seçimi ayrı devşirme bağlamıdır; bütün hanelere aynı oran uygulanmış diye verilmemiştir.",
          "Maaşlı memurlar pençik oranının başlangıç grubu olarak tanımlanmamıştır.",
          "Tımar geliri bir mali tahsistir; burada insan kaynağı oranı anlatılmaktadır.",
          "Eğitim sonrası mezun grubu ile başlangıçtaki savaş esiri kaynağı farklı aşamalardır.",
        ],
        knowledge:
          "Pençikteki beşte bir ilkesi savaş esiri kaynağına aittir; devşirme, gelir tahsisi veya mezuniyet oranı değildir.",
        strategy:
          "Oranı hesaplamadan önce paydanın hangi insan grubunu ifade ettiğini belirle.",
        error:
          "Savaş esiri oranını bütün tebaa ailelerinin çocuklarına taşımak.",
        check: "Seçtiğin grup açıklamadaki başlangıç kaynağıyla aynı mı?",
      },
      {
        passage:
          "Bir tarihsel açıklama, devşirmeyi belirli tebaa ailelerinin oğulları arasından devletin koyduğu kurallarla yapılan zorunlu seçim ve hazırlık düzeni olarak tanımlıyor. Uygulamanın kapsam ve kurallarının dönemlere göre değiştiği de belirtiliyor.",
        prompt:
          "Bu tanım günümüzdeki gönüllü bir okul başvurusundan hangi bakımdan ayrılır?",
        options: [
          "Başlangıçtaki seçim, adayın serbest başvurusuyla aynılaşmayan tarihsel bir devlet yükümlülüğüne dayanır.",
          "Her adayın bütün çağlarda aynı yaşta ve aynı yılda seçildiğini gösterir.",
          "Bütün Hristiyan ailelerin bütün oğullarının alındığını zorunlu kılar.",
          "Hazırlık bulunduğu için uygulamanın gönüllü olduğu sonucunu verir.",
          "Dönem değişikliği bulunduğu için hiçbir seçim kuralı olmadığını gösterir.",
        ],
        steps: [
          "Tanımdaki zorunlu seçim ile gönüllü başvuru ifadelerini karşılaştır.",
          "Hazırlık eğitimi bulunması başlangıçtaki zorunluluk niteliğini kendiliğinden değiştirmez.",
          "Dönemle değişen tarihsel kuralları, her aday için sabit veya sınırsız bir toplama hükmüne çevirmeden ayrımı seç.",
        ],
        reasons: [
          "Gövde devlet kurallarıyla zorunlu seçimi tanımlar; modern serbest başvuruyla özdeşlik kurmaz.",
          "Kapsam ve kuralların dönemle değiştiği açıkça verilmiştir.",
          "Belirli aileler ifadesi bütün ailelerin bütün oğulları şeklinde genişletilemez.",
          "Eğitimin varlığı seçimde rıza bulunduğunun kanıtı değildir.",
          "Kuralların değişmesi, her dönemde kuralsız seçim yapıldığı anlamına gelmez.",
        ],
        knowledge:
          "Devşirme tarihsel zorunlu insan kaynağı düzenidir; modern gönüllü eğitim tercihiyle aynı kurum değildir.",
        strategy:
          "Hazırlık işlevi ile başlangıçtaki seçim ve yükümlülük biçimini ayrı değerlendir.",
        error:
          "Eğitim içeren her tarihsel uygulamayı gönüllü okul seçimi sanmak.",
        check: "Gövdenin belirli ve dönemle değişen sınırlarını korudun mu?",
      },
      {
        passage:
          "Tamamen kurmaca bir tımar belgesinde bir vergi kalemi için kanuni yükümlülük 6 hesap birimi olarak tanımlanıyor. Görevlinin aynı kalemde 8 birim isteme yetkisi verilmemiş. Metin, görevlinin yalnız belirlenen vergileri tahsil edebildiğini bildiriyor. Bu sayılar gerçek tarihî kanun oranı değildir.",
        prompt: "Belgenin çizdiği yetki sınırına göre hangi işlem desteklenir?",
        options: [
          "Belirlenen 6 birimin tahsil edilmesi; ek 2 birim için ayrıca hukuki dayanak aranması.",
          "Vergiyi topladığı için görevlinin sınırsız yeni miktar koyabilmesi.",
          "6 birimlik tahsisin toprağın bütün mülkiyet haklarını devretmesi.",
          "Askerî hizmet karşılığı gelir verildiği için kanuni yükümlülüğün dikkate alınmaması.",
          "Görevlinin 8 istemesinin, belgede de mutlaka 8 yazdığını göstermesi.",
        ],
        steps: [
          "Belgedeki kanuni yükümlülüğü 6, talep edilen miktarı 8 olarak ayrı yaz.",
          "Ek 2 için yetki verildiği söylenmemiş; tahsil yetkisi sınırsız miktar belirleme yetkisi değildir.",
          "Yalnız açık tahsili destekle ve ek talep için ayrı dayanak gerektiğini belirt.",
        ],
        reasons: [
          "6 açık yükümlülüktür; fazladan 2 için belgede yetki yoktur.",
          "Tahsil görevi ile yeni vergi koyma veya keyfî miktar artırma yetkisi aynı değildir.",
          "Gelir tahsil yetkisi toprağın bütün mülkiyet haklarını kendiliğinden devretmez.",
          "Hizmet karşılığı tahsis kanuni vergi sınırını ortadan kaldırmaz.",
          "Talep ile belgenin bildirdiği yükümlülük farklı veriler olabilir; biri diğerini yeniden yazmaz.",
        ],
        knowledge:
          "Tımarda gelir tahsil yetkisi, kanun dışında sınırsız vergi isteme veya toprağı özel mülk sayma yetkisi değildir.",
        strategy:
          "Belgede izin verilen miktarla fiilen talep edilen miktarı karşılaştır.",
        error:
          "Gelir tahsil görevini sınırsız miktar belirleme yetkisi gibi yorumlamak.",
        check: "Ek 2 birim için gerçekten ayrı yetki verisi buldun mu?",
      },
      {
        passage:
          "Bir kaynak, tımarlı sipahinin gelirinin büyüklüğüne göre cebelü yetiştirme yükümlülüğü bulunduğunu bildiriyor. İncelenen kayıt hangi dönemin düzenlemesinin uygulandığını, hesapta hangi gelir türünün esas alındığını veya belirli bir cebelü oranını vermiyor.",
        prompt:
          "Belirli bir sipahinin kesin cebelü sayısını hesaplamak için öncelikle hangi ek veri gerekir?",
        options: [
          "İlgili dönemin yükümlülük kuralı ve hesapta esas alınan gelir bilgisi.",
          "Sipahi sözcüğünün belgede kaç kez tekrar edildiği.",
          "Başka bir yüzyıldaki rastgele bir tımarın oranının otomatik kullanılması.",
          "Dirlik kelimesinin bulunmasının her zaman tek asker gerektirdiğinin kabul edilmesi.",
          "Aynı dönemde başkentte kaç müderris bulunduğunun tek başına öğrenilmesi.",
        ],
        steps: [
          "Kaydın gelir ile yükümlülük arasında bağ verdiğini fakat sayısal kural vermediğini sapta.",
          "Kesin sayı için hangi gelir ve hangi döneme ait kuralın uygulandığı belirlenmelidir.",
          "Rastgele oran veya sabit asker sayısı eklemeden gerekli iki veriyi iste.",
        ],
        reasons: [
          "Kesin hesap bu kayıtta bulunmayan gelir tabanı ve dönem kuralına dayanmalıdır.",
          "Sözcüğün tekrar sayısı asker yetiştirme yükümlülüğünü ölçmez.",
          "Başka dönemin oranı ilgili kayda kanıtsız taşınamaz.",
          "Metin gelire göre yükümlülük der; her dirlik için tek asker kuralı vermez.",
          "Müderris sayısı bu gelir-hizmet yükümlülüğünün hesap kuralı değildir.",
        ],
        knowledge:
          "Cebelü yükümlülüğü gelirle bağlantılıdır; belirli sayı için ilgili tarihsel düzenleme ve gelir tabanı bilinmelidir.",
        strategy:
          "Nitel bağı sayısal formül gibi kullanmadan önce eksik hesap koşullarını belirle.",
        error:
          "Gelire göre yükümlülük bilgisinden uydurma ve bütün dönemlere ortak bir oran üretmek.",
        check:
          "Kullandığın oranı ve gelir tabanını kayıt gerçekten veriyor mu?",
      },
      {
        passage:
          "Bir kuşatma dosyasında topu kullanan topçu, ağır topu taşıyan top arabacısı ve sur altına tünel açan lağımcı ayrı görevler olarak tanımlanıyor. İncelenen yeni kayıtta yalnız surun altına doğru ilerleyen tünelin hazırlanması anlatılıyor.",
        prompt:
          "Verilen ayırıcı göreve göre yeni kayıt hangi birimle ilişkilidir?",
        options: [
          "Lağımcılar.",
          "Topçular.",
          "Top arabacıları.",
          "Kapıkulu süvarileri.",
          "Cebelü yükümlülüğü taşıyan tımarlı sipahiler.",
        ],
        steps: [
          "Yeni kaydın ana fiilini sur altına tünel hazırlamak olarak belirle.",
          "Dosyada bu fiil lağımcıya bağlanmış; atış ve taşıma ayrı verilmiş.",
          "Kuşatma ortak bağlamına rağmen ayırıcı tünel görevini esas al.",
        ],
        reasons: [
          "Tünel ve lağım çalışması dosyada açıkça lağımcıya bağlanmıştır.",
          "Topçu top kullanımıyla tanımlanmıştır; yeni kaydın ayırıcı fiili bu değildir.",
          "Top arabacısı ağır topun taşınmasıyla tanımlanmıştır; tünel kaydı verilmiştir.",
          "Atlı kapıkulu teşkilatı, verilen sur altı tünel işinin tanımı değildir.",
          "Dirlik ve cebelü yükümlülüğü gelir-hizmet ilişkisini gösterir; tünel kaydının ayırıcı görevi olarak verilmemiştir.",
        ],
        knowledge:
          "Aynı kuşatmada top kullanımı, ağır topun taşınması ve tünel çalışması farklı uzmanlıklardır.",
        strategy: "Ortak savaş bağlamından önce kayıttaki ayırıcı işlemi seç.",
        error:
          "Kuşatma kelimesini görüp bütün uzmanlıkları top kullanımıyla özdeşleştirmek.",
        check: "Seçtiğin birimin tanımı doğrudan tünel fiilini karşılıyor mu?",
      },
      {
        passage:
          "Bir kayıtta merkez hazinesinden ulufe alan ve kapıkulu düzenine bağlı bir birliğin bir taşra kalesinde belirli süre güvenlik görevi yaptığı yazılıdır. Kayıt, birliğin ödeme kaynağının değiştirilmediğini ayrıca belirtir.",
        prompt:
          "Bu kayıt bağlılık ve görev yeri bakımından hangi yorumu destekler?",
        options: [
          "Taşrada görev yapmak, verilen merkezî bağlılık ve ulufe düzenini kendiliğinden değiştirmez.",
          "Başkent dışında bulunduğu için birliğin geliri zorunlu olarak tımar vergisine dönüşmüştür.",
          "Kalede bulunan bütün kuvvetler aynı teşkilat birimidir.",
          "Merkezden ödeme almak her askerin bütün yıl fiziksel olarak başkentte bulunduğunu gerektirir.",
          "Görev yeri yazıldığı için ödeme kaynağı bilgisi karşılaştırmada kullanılamaz.",
        ],
        steps: [
          "Kaydın ödeme kaynağını merkez hazinesi, yerini taşra kalesi olarak ayrı tut.",
          "Ödeme düzeninin değişmediği açıkça belirtilmiş; konumdan yeni gelir biçimi üretme.",
          "Bağlılık ile fiziksel görev yerinin farklı alanlar olduğunu koruyan yorumu seç.",
        ],
        reasons: [
          "Gövde taşra göreviyle merkezî ödeme-bağlılığı birlikte verir.",
          "Ödeme kaynağının değişmediği açıkça söylenmiş; tımar geliri eklemek veriye aykırıdır.",
          "Ortak görev yeri bütün birimlerin kimliğini ve işlevini özdeşleştirmez.",
          "Kayıt, merkeze bağlı birliğin taşrada görevlendirildiğini açıkça göstermektedir.",
          "Yer ve ödeme kaynağı ayrı ve birlikte kullanılabilir bilgilerdir.",
        ],
        knowledge:
          "Merkezî bağlılık, birliğin bütün zamanlarda yalnız başkentte bulunması demek değildir.",
        strategy:
          "Finansman, teşkilat ve konumu birbirinin yerine koymadan üç ayrı alanda oku.",
        error:
          "Taşrada bulunmayı otomatik olarak tımar geliriyle hizmet etme saymak.",
        check:
          "Yer değişikliğinden, kaydın açıkça sabit tuttuğu ödeme kaynağını da değiştirdin mi?",
      },
      {
        passage:
          "Bir öğretim kartında akıncılar sınırda keşif ve hareketli öncülükle ilişkili atlı kuvvet; azebler ise çeşitli sefer ve kale görevlerinde bulunabilen hafif piyade çevresi olarak tanımlanıyor. Yeni dosyanın K kaydı atlı keşfi, L kaydı yaya olarak öncü görevini bildiriyor; iki kayıt için gelir kaynağı verilmemiş.",
        prompt:
          "Yalnız verilen görev ve teşkilat tanımlarına göre hangi eşleştirme uygundur?",
        options: [
          "K akıncı, L azeb ile uyumludur; gelir düzenleri için ayrıca bilgi gerekir.",
          "K azeb, L akıncı ile uyumludur; atlı-yaya ayrımı ters alınmalıdır.",
          "K ve L yalnız kalede bulunabilecekleri için zorunlu olarak aynı ocaktır.",
          "K atlı olduğundan kesin ulufeli kapıkulu süvarisidir; keşif tanımı önemsizdir.",
          "L yaya olduğu için karttaki azeb tanımı elenmeli, gelirinin dirlik olduğu kabul edilmelidir.",
        ],
        steps: [
          "K’nin atlı keşif, L’nin yaya öncülük verisini ayrı yaz.",
          "Karttaki akıncı ve azeb tanımlarını bu iki özellikle karşılaştır.",
          "Görev eşleşmesini kur; verilmeyen gelir kaynağını ayrıca açık bırak.",
        ],
        reasons: [
          "K ve L verilen tanımlara uyar; ödeme kaynağı ise gerçekten belirtilmemiştir.",
          "Kart atlı keşfi akıncıya, hafif piyadeyi azebe bağlamıştır; ters eşleştirme bunu bozar.",
          "Olası ortak görev yeri iki farklı teşkilat tanımını ortadan kaldırmaz.",
          "Atlı olmak tek başına ulufe veya kapıkulu mensubiyeti kanıtı değildir; verilen keşif tanımı yok sayılamaz.",
          "Yaya görev azeb tanımıyla uyumludur; ayrıca dirlik geliri verilmemiştir.",
        ],
        knowledge:
          "Akıncı ve azeb görevleri karşılaştırılırken atlı-yaya niteliği ile keşif-öncü işi birlikte okunur; gelir ayrıca belgelenir.",
        strategy:
          "Her kaydın iki açık özelliğini eşleştirip boş mali alanı doldurmadan bırak.",
        error:
          "Görev ve teşkilat eşleşmesinden kayıtta bulunmayan ödeme kaynağını kesinleştirmek.",
        check:
          "Hem K hem L için karttaki iki özelliği ayrı ayrı doğruladın mı?",
      },
    ],
  },
  {
    id: "osmanli-medeniyeti",
    topic: "detail-235",
    title: "Osmanlı medeniyeti: kurum, insan, kültür ve şehir",
    minutes: 145,
    objectives: [
      "Medeniyeti yalnız sanat eserine indirgemeden kurum ve işlev ilişkileriyle açıkla.",
      "Askerî sınıf/reaya ve seyfiye/kalemiye/ilmiye ayrımlarını doğru kullan.",
      "Kadı, müftü, müderris; medrese, tekke ve vakıf rollerini somut örnekte ayır.",
      "Sözlü/kitabî kültür ve fetih sonrası şehir dönüşümünü kaynak kanıtıyla ilişkilendir.",
    ],
    sections: [
      {
        title: "Medeniyet bir eser listesi değildir",
        paragraphs: [
          "Bir toplumun medeniyetini yalnız cami, köprü veya sanatçı adlarıyla öğrenmek eksik kalır. Yönetim, hukuk, eğitim, inanç, üretim, sosyal yardım, şehir ve kültür birlikte bir düzen oluşturur. Bir külliyeye baktığında ‘hangi bina?’ yanında ‘kim kullanır, hangi ihtiyacı karşılar, geliri nasıl sürer?’ sorularını da kur. Aynı kurumun birden fazla işlevi bulunabilir; bir medrese eğitim verirken çevresinde barınma, kitap ve gündelik hizmet ilişkileri de doğabilir. Ancak bütün kurumların her şehirde aynı tarihte ve aynı ölçekte bulunduğunu varsayma.",
          "Kurum, belirli işlerin kişilerden daha uzun süre devam edebilmesini sağlayan kural ve ilişki düzeniyle düşünülür. Bir medresede öğretici, öğrenci, kitap, gelir ve yapı; bir çarşıda usta, çırak, ürün, müşteri ve denetim birlikte çalışır. Bir yapının adını bilmek bu ilişkilerin bütününü açıklamaz. Örneğin bir dükkân gelirinin bir imareti desteklemesi ticaret ile sosyal hizmeti aynı şehir ağı içinde bağlar; dükkân ile imaret aynı bina olmak zorunda değildir.",
        ],
      },
      {
        title: "Toplumsal aktarımın farklı taşıyıcıları",
        paragraphs: [
          "Anadolu’daki âlim, mutasavvıf, şair ve esnaf çevreleri bilgi, ahlak, inanç ve dayanışma aktarımında rol oynadı. Ahmet Yesevî hikmet ve Yesevîlik; Mevlânâ Mevlevîlik ve Mesnevî çevresi; Yunus Emre anlaşılır Türkçeyle şiir ve insan sevgisi; Hacı Bektâş-ı Velî Bektaşîlik ve birleştirici öğretiler; Hacı Bayrâm-ı Velî Ankara çevresi ve Bayramîlik; Ahî Evran ise meslek ahlakı ve esnaf dayanışmasıyla ilişkilendirilir. Bunlar aynı zamanda yaşamış veya hepsi doğrudan Osmanlı devlet görevlisi olmuş kişiler değildir. Ortak kültürel etki ile aynı kurum ve aynı dönem üyeliğini ayır.",
          "Ahmet Yesevî’nin etkisinin Anadolu’da görülmesi onun mutlaka Anadolu’da yaşadığını göstermez. Eserler, öğrenciler, sözlü aktarım ve farklı tasavvuf çevreleri bilgi ve öğretiyi taşıyabilir. Mevlânâ, Yunus Emre, Hacı Bektaş-ı Velî ve Hacı Bayrâm-ı Velî gibi isimler farklı dönem ve çevrelerde incelenir. Ortak ahlaki temaların bulunması, bu şahsiyetlerin tek bir kurumun aynı tarihteki görevlileri olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Âlim, mutasavvıf ve meslek erbabı",
        paragraphs: [
          "Âlim ilim alanında yetişmiş kişiyi, mutasavvıf tasavvufi eğitim ve irşatla öne çıkan kişiyi anlatır. Tarihsel bir kişi birden fazla alana katkı yapabilir; sınıflandırmada sorunun verdiği faaliyeti esas al. Bir meslek örgütünün eğitim ve ahlaka önem vermesi onu otomatik medrese yapmaz. Ahilikte iş ahlakı, mesleki yetişme ve dayanışma; tekke çevresinde tasavvufi terbiye, sohbet ve sosyal hizmet; medresede belirli ilimlerin düzenli öğretimi öne çıkar. ‘Hepsi insan yetiştirir’ ortak paydası, ayırıcı kurumsal özellikleri ortadan kaldırmaz.",
          "Ahilikte mesleki yeterlik ile güvenilir davranışın birlikte gözetilmesi, işin yalnız teknik üretim olmadığına işaret eder. Usta-çırak ilişkisi bir becerinin uygulamayla aktarılmasını, dayanışma ise üyelerin ortak ihtiyaçlarını anlatabilir. Medrese öğretimi ile tekke sohbetinde de öğrenme bulunur; fakat öğretici, yöntem ve yetki aynı değildir. Bir kişinin hem eser yazması hem tasavvufi çevrede bulunması, tek bir sözcükle bütün faaliyetlerinin tüketilemeyeceğini gösterir.",
        ],
      },
      {
        title: "Askerî sınıf sözü yalnız savaşçıyı anlatmaz",
        paragraphs: [
          "Osmanlı toplumunda askerî sınıf, padişahın dinî veya idari yetki tanıdığı yönetenler bütününü ifade eder. Seyfiye, kalemiye ve ilmiye bu kapsamda değerlendirilir. Reaya ise yönetilen nüfustur; üretim ve vergiyle düzenin sürmesine katkı sağlar. Reayayı yalnız bir dinî toplulukla veya yalnız köylülerle sınırlama; şehirli üreticiler ve farklı topluluklar da bu başlıkta düşünülür. Bugünkü günlük dildeki asker sözcüğünü tarihsel askerî sınıfa aynen taşımak, kadı veya müderrisin yönetenler içinde olduğunu kaçırmana yol açar.",
          "Askerî sınıf tarihsel olarak yönetenler statüsünü anlatırken reaya üretim ve vergiyle ilişkili yönetilen kesimdir. Bir kadının veya müderrisin elinde kılıçla savaşmaması, onu sırf bu nedenle askerî sınıfın dışında bırakmaz. Aynı zamanda reaya başlığını yalnız çiftçi erkeklerle sınırlandırmak da şehirli zanaatkârları ve başka üretici çevreleri gözden kaçırır. Bu ayrım, geçmiş toplumun hukuki ve idari sınıflamasıdır; bugünün meslek veya yurttaşlık düzeniyle birebir aynı değildir.",
        ],
      },
      {
        title: "Seyfiye: yönetim ve askerlik",
        paragraphs: [
          "Seyfiye kılıç ehli olarak adlandırılan askerî-idari görevler çevresidir. Vezir, beylerbeyi, sancakbeyi gibi görevler bu alanda düşünülür. Bir sancaktaki güvenlik ve yönetim yetkisi, yalnız sınıfta ders verme veya yalnız yazışma kaydı tutmadan farklıdır. Bir yönetici yazı da yazabilir; sınıflandırma kişinin her günlük eylemine değil, görevin temel yetkisine dayanır. Sorudaki ‘savaşta komuta, eyalet yönetimi, güvenlik’ gibi eylemleri işaretle; kavramı yalnız kılıç resmi gördüğün için seçme.",
          "Vezir ve sadrazamın merkezî siyasi-askerî yönetim, beylerbeyi ve sancakbeyinin eyalet-sancak yönetimi içindeki yeri seyfiye çerçevesinde ele alınır. Bir belgenin birden fazla görevliye ulaşması görevlerin aynı olduğunu göstermez. Örneğin mali kayıtla ilgilenen görevli ile o kayda dayanarak idari emir veren yönetici aynı işlem zincirinde farklı yetkiler kullanır. Karşılaştırmada belgeyi kimin yazdığıyla kararın kime ait olduğunu ayrı belirt.",
        ],
      },
      {
        title: "Kalemiye: yazı, kayıt, maliye ve diplomasi",
        paragraphs: [
          "Kalemiye kalem ehli olarak yazışma, mali kayıt, belge ve diplomasi işleriyle ilişkilidir. Nişancı, defterdar ve reisülküttap gibi görevleri burada düşün. Bir belgenin padişah emri taşıması, belgeyi düzenleyen bürokratik görevin seyfiye olduğu anlamına gelmez. Ferman hükümdar emri, berat ise görev, yetki veya ayrıcalık tanınması bağlamında kullanılan belge türüdür. Yazılı belge örneğinde hem belge türünü hem onu oluşturan yönetim işlevini sorabilirler; bu iki sınıflandırmayı birbirinin yerine kullanma.",
          "Nişancı padişah tuğrası ve kayıt işleriyle, defterdar mali hesaplarla, reisülküttap yazışma ve diplomasi çevresiyle ilişkilendirilir. Bu görevlerin yetki ve örgütlenmeleri tarih boyunca değişebilir. Tuğra hükümdarlık işaretidir; belgedeki tuğranın varlığı bütün metni hükümdarın bizzat kaleme aldığını kanıtlamaz. Yazıyı yazan, yetki veren ve belgenin muhatabı farklı kişiler olabilir.",
        ],
      },
      {
        title: "İlmiye: ders, hüküm ve görüşü ayır",
        paragraphs: [
          "İlmiye eğitim, yargı ve dinî-hukuki görüş alanlarını kapsar. Müderris medresede ders verir; kadı yargılama ve mahkeme kaydı yanında şehir yönetimiyle ilgili idari, beledî, mali ve noterlik türü işler de yürütür; müftü ise fetva denilen dinî-hukuki görüş bildirir. Kazasker ve şeyhülislam gibi görevler de ilmiye çerçevesindedir. Fetva ile mahkeme hükmünü eşitleme. Bir metin ‘dinî-hukuki görüş istedi’ diyorsa müftü; ‘uyuşmazlığı karara bağlayıp kayda geçirdi’ diyorsa kadı öne çıkar. Her iki görev aynı ilmiye ailesinde olsa da işlemleri farklıdır.",
          "Fetva belirli bir soruya verilen dinî-hukuki görüştür; mahkemenin somut uyuşmazlık hakkında verdiği hükümle aynı belge türü değildir. Kadı yargılama ve kayıt yanında bazı idari işleri de yürütürken müderrisin ayırıcı işi öğretimdir. Aynı aile içinde bulunan görevlerin farklı yetkilere sahip olması olağandır. Bir görüş kaydını bulmak, o görüşün her olayda aynı şekilde hükme dönüştüğünü tek başına göstermez; somut uygulama için karar ve sicil kayıtları da araştırılır.",
        ],
      },
      {
        title: "Medrese ve tekke aynı eğitim alanı değildir",
        paragraphs: [
          "Medrese, dönemin dinî ilimleri yanında matematik, astronomi, mantık ve tıp gibi aklî ilimlerle de ilişkili öğretim kurumudur; bütün medreselerde bütün derslerin aynı biçimde okutulduğu genellenmez. Tekke ve zaviye tasavvufi terbiye, halkın din eğitimi ve dayanışma gibi işlevler taşır; bazıları konaklama ve yardım hizmetleri de sunabilir. Bir tekkede sohbet yapılması resmî medrese diploması verildiğini kanıtlamaz. Akşemseddin ve Ali Kuşçu gibi şahsiyetler farklı bilgi alanlarına katkılarıyla öğrenilir; bir tarihî tıp görüşünü bugünkü deneysel mikrobiyolojiyle aynı kanıt düzeyinde sunma.",
          "Medresede okutulan dersler kurumun derecesi, dönemi ve öğreticilerine göre incelenir. Dinî ilimlerle matematik veya astronominin birlikte okutulduğu örnekler, bilgi alanlarının aynı kurumda ilişkilendirilebildiğini gösterir. Bu bilgi bütün medreselerin aynı ders çizelgesine sahip olduğu iddiası değildir. Tekke ve zaviyelerin halk eğitimi, sohbet ve bazı yerlerde barınma gibi işlevleri de kendi kayıtlarıyla öğrenilir; tek bir işlev bütün kurumları özdeşleştirmez.",
        ],
      },
      {
        title: "Medrese ve bilim çevrelerini dönemle eşleştir",
        paragraphs: [
          "Fatih Sultan Mehmet’in Sahn-ı Seman medreseleri ile Kanuni Sultan Süleyman’ın Süleymaniye medreseleri, hükümdar ve kurum eşleştirmesinin önemli örnekleridir. Ali Kuşçu’nun İstanbul’daki matematik ve astronomi çalışmalarını; Akşemseddin’in dinî ilimler ve tıp alanındaki katkılarını kendi bağlamlarında öğren. Uluğ Bey ise Timur’un torunu ve Semerkant’taki medrese/gözlemevi çalışmalarıyla ilişkilidir; onu Osmanlı hükümdarı gibi sınıflandırma. Bir düşünürün başka bir ülkedeki bilgi birikimi, yetiştirdiği insanlar veya eserler yoluyla farklı merkezlere ulaşabilir. Bilgi dolaşımı, bütün bilim insanlarının aynı devletin hizmetinde olması demek değildir. Tarihî bir hastalık açıklamasına katkıdan çağdaş deneysel tıbbın bütün bulgularının o dönemde kanıtlandığı sonucu çıkarılmaz.",
          "Sahn-ı Seman ile Süleymaniye kurumlarını hükümdar, şehir ve dönem bilgisiyle ayrı kaydetmek, ad benzerliğiyle karışmayı azaltır. Ali Kuşçu’nun farklı ilim çevrelerinden İstanbul’a taşıdığı matematik ve astronomi birikimi, bilginin yalnız tek devlet içinde gelişmediğini gösterir. Uluğ Bey’in Semerkant çalışmaları aynı bilgi ağının başka siyasi çevredeki örneğidir. Bir âlimin eserinden yararlanılması, o âlimin bütün hayatının eserin kullanıldığı devlette geçtiği anlamına gelmez.",
        ],
      },
      {
        title: "Vakıf: mal, gelir, amaç ve yönetim zinciri",
        paragraphs: [
          "Vakıf, belirli mal veya gelirlerin kalıcı bir hayır/hizmet amacına tahsis edilmesiyle düşünülür. Vakfiye, tahsis edilen malı, işletme ve gelir biçimini, hangi hizmetlerin destekleneceğini ve yönetim koşullarını belirleyebilir. Mütevelli yönetim göreviyle, kadı ise hukuk ve denetim boyutuyla ilişkilidir. Bir dükkânın gelirinin imarete ayrılması, üretim/ticaret geliriyle sosyal hizmet arasında bağ kurar. Vakıf yalnız nakit dağıtmak değildir; okul, sağlık, su, yol, barınma ve başka hizmetleri sürdürebilir. Kurucunun ölümü vakfın kendiliğinden sona erdiği anlamına gelmez; belge koşulları ve süreklilik düzeni değerlendirilir.",
          "Vakfiyede gelir getiren mal, desteklenen hizmet, harcama koşulu ve yönetici görevi ayrı ayrı tanımlanabilir. Bir mütevellinin geliri yönetmesi, kurucu veya o gelirin tamamının kişisel sahibi olduğu anlamına gelmez. Kadının hukuk ve denetim rolü de aynı kurum çevresinde farklı yetkiyi gösterir. Bir gelir kaynağı eksildiğinde hangi hizmetin etkileneceği, vakfiyenin belirlediği tahsis ve başka kaynaklara bağlıdır; her vakıf için tek sabit dağıtım oranı yoktur.",
        ],
      },
      {
        title: "Sözlü ve kitabî kültür birbirini tamamlar",
        paragraphs: [
          "Şiir, hikâye, sohbet ve halk anlatıları sözlü aktarımın; ferman, berat, risale, telif ve tercüme eserler kitabî kültürün örnekleridir. Yazılı/görsel eserler ve sözlü anlatılar farklı hedef kitle ve aktarım ortamlarına sahip olabilir. Sözlü kültürün varlığı bütün insanların okuma yazma bilmediğini, kitabî kültürün varlığı da sözlü anlatının değersizleştiğini kanıtlamaz. II. Murad döneminde Türkçe eser yazımı ve çeviri faaliyetlerinin desteklenmesi, dil ve kültür aktarımıyla ilişkilendirilir. Tek bir eser örneğinden ülkedeki herkesin aynı dili ve eğitim düzeyini paylaştığı sonucu çıkarılmaz.",
          "Bir hikâye yazıya geçirildikten sonra da topluluk içinde anlatılabilir; yazılı şiir sesli okunabilir. Dolayısıyla sözlü ve kitabî kültür yalnız iki ayrı insan grubunu anlatan kapalı kutular değildir. Ferman ve berat idari işlevleriyle, risale belirli konudaki yazılı eseriyle, tercüme farklı dildeki bilginin aktarımıyla değerlendirilir. Eserin yazılması, kopyalanması, çevrilmesi ve sözlü icrası farklı üretim ve aktarım eylemleridir.",
        ],
      },
      {
        title: "Şehir dönüşümü: fetih, imar ve gündelik yaşam",
        paragraphs: [
          "Fethedilen bir şehirde cami, medrese, imaret, çarşı ve hamam çevresinde gelişen hizmet ağı, yalnız askerî denetimin ötesinde toplumsal ve ekonomik dönüşümü gösterir. Külliye, farklı hizmet yapılarının birlikte düşünülmesini sağlar; vakıf gelirleri bu hizmetlerin sürmesine destek verebilir. Ahşap ve taş işçiliği, dokuma, çinicilik ve hat gibi üretim ve sanat alanları da şehir hayatının parçalarıdır. Ancak yakın duran bütün binaların aynı tarihte veya tek kurucuyla yapıldığı çıkarılamaz. Yeni kurumların kurulması ile eski sakinlerin, üretim ağlarının ve kültürel birikimin bütünüyle yok olması aynı şey değildir.",
          "İmar, bir yerin yol, su, yapı ve hizmetlerle düzenlenmesini kapsar. Cami, medrese, imaret, hamam ve çarşı arasındaki ilişki hem gündelik ihtiyaçları hem üretim ve gelir ağını etkileyebilir. Aynı şehirde eski ve yeni yapılar birlikte bulunabilir; yeni bir külliye kurulması kentin önceki bütün kültürünün silindiğini göstermez. Yapıların tarihlerinin farklı olması da bunların daha sonra aynı hizmet ağında ilişkilenmesini engellemez.",
        ],
      },
      {
        title: "Kurum sorusunu ad değil eylem çözer",
        paragraphs: [
          "Bir görev veya kurum sorusunda önce özneyi ve eylemi ayır. ‘Medresede ders verir’ müderrisi; ‘mali hesap tutar’ kalemiyeyi; ‘hukuki görüş bildirir’ müftüyü; ‘vakıf gelirinin koşullarını belgeye bağlar’ vakfiye ve hukuk düzenini düşündürür. Kaynak metinli soruda doğru bir genel bilgi, metinden zorunlu olarak çıkmayabilir. Soru ‘ulaşılamaz’ diyorsa verilen dört kanıtı ayrı işaretle, dayanağı olmayanı seç. Her yanlışta ‘isim benzerliği mi, görev karışması mı, metne dış bilgi ekleme mi?’ diye nedenini bul; cevabı kapatıp farklı kurumla aynı ayrımı tekrar kur.",
          "Sanat dalında da eylem ve malzeme birlikte okunur. Hat yazıyı estetik kurallarla biçimlendirme; tezhip özellikle yazma sayfalarını bezeme; minyatür resimle tasvir; çini ise sırlı pişmiş toprak yüzeylerle bezeme çevresinde öğrenilir. Aynı yazmada hat, tezhip ve minyatür birlikte bulunabilir. Bu birliktelik dalları tek teknik yapmaz; eser sahibi, metnin yazarı, müstensih ve resimleyen sanatçı da ayrı görevler üstlenebilir.",
        ],
      },
      {
        title: "Belge, görev ve yetkiyi üç ayrı alanda oku",
        paragraphs: [
          "Bir belgenin adına bakmak yalnız ilk adımdır. Ferman hükümdar emriyle, berat görev veya yetki tanımayla, vakfiye ise mal ve gelirin belirli amaçla tahsisiyle ilişkilidir. Bu belgelerin her biri yazılıdır; yazılı olmaları aynı hukuki işlemi yaptıkları anlamına gelmez. Belgenin düzenleyeni, onaylayanı, uygulayanı ve yararlananı ayrı kişiler olabilir.",
          "Aynı yönetim zincirinde bir defterdar hesap tutabilir, bir nişancı tuğra ve kayıt işiyle ilgilenebilir, bir kadı uyuşmazlığı değerlendirebilir. Birinin varlığı ötekinin işini otomatik olarak yerine getirmez. Bu nedenle unvan, belge türü ve yapılan eylem karşılaştırılır; herhangi birini yalnız kalem veya mühür resmiyle seçmek yeterli değildir.",
        ],
        table: {
          headers: ["Alan", "Ayırıcı örnek", "Karıştırılmayan şey"],
          rows: [
            [
              "Belge türü",
              "Vakfiye: tahsis ve koşullar",
              "Yalnızca yazıyı kimin yazdığı",
            ],
            [
              "Görev",
              "Müderris: öğretim",
              "Bütün ilmiye görevlerinin aynı yetkisi",
            ],
            [
              "İşlem",
              "Kadı: hüküm ve sicil",
              "Fetvanın tek başına mahkeme kararı olması",
            ],
            [
              "İşaret",
              "Tuğra: hükümdarlık işareti",
              "Metnin her satırının bizzat hükümdarca yazılması",
            ],
          ],
        },
      },
      {
        title: "Şair sultan, mahlas ve eser ilişkisi",
        paragraphs: [
          "Mahlas, şairin eserinde kullandığı ad olarak düşünülür. Fatih Sultan Mehmet’in Avnî, Kanuni Sultan Süleyman’ın Muhibbî mahlasıyla şiir yazması, hükümdarlık ile sanat faaliyetinin aynı kişide bulunabildiğini gösterir. Mahlasın farklı olması her zaman yeni ve bağımsız bir kişi bulunduğu anlamına gelmez; kişinin resmî adıyla şiirde kullandığı adı ilişkilendiren kayıt gerekir.",
          "Bir hükümdarın şairleri veya çeviri çalışmalarını desteklemesi, desteklenen her eseri kendisinin yazdığı anlamına gelmez. Yazar, müstensih, çevirmen, resimleyen sanatçı ve himaye eden kişi farklı roller üstlenir. Eser tarihiyle himaye döneminin uyuşması da önce kontrol edilir; yalnız aynı dilde eser olması bir hükümdarın onu mutlaka sipariş ettiği sonucunu vermez.",
        ],
      },
      {
        title: "Kültür ağı ortaklık ve farklılığı birlikte taşır",
        paragraphs: [
          "Bir medrese, tekke, esnaf çevresi veya saray kütüphanesi kültürel aktarımın farklı düğümleri olabilir. Bilgi yalnız yüz yüze aynı yerde yaşayan kişilerle taşınmaz; kitap, çeviri, öğrenci ve sözlü icra yeni çevrelere ulaşabilir. Aynı düşüncenin farklı şehirlerde görülmesi, her şehrin aynı siyasal yönetimde bulunduğu veya bütün aktörlerin orada yaşadığı anlamına gelmez.",
          "Medeniyet tarihini araştırırken ekonomik, kurumsal ve kültürel bağları aynı haritada gösterebilirsin: dükkân geliri imareti destekler, kütüphane eserleri öğretimde kullanılır, bir şiir hem yazılı nüshada hem sözlü icrada dolaşır. Şema gerçek mesafe ve zaman ölçeği vermedikçe ok uzunluğundan yolculuk süresi hesaplanmaz. Her bağ, onu destekleyen belge veya anlatım kadar güçlüdür.",
        ],
      },
    ],
    examples: [
      {
        title: "Metnin yazarı ile resmi yapan kişi",
        prompt:
          "Kurmaca yazma eser kaydında metni Z’nin yazdığı, nüshayı K’nin kopyaladığı, tasvirleri R’nin yaptığı belirtiliyor. Bir araştırmacı tasvirlerin üslubunu inceliyor. Bu işlemde hangi rol öne çıkar; metnin yazarı değişir mi?",
        strategy: "Yazar, müstensih ve resimleyeni üç ayrı rol olarak ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Z metnin yazarı, K nüshayı çoğaltan müstensih, R tasvirleri yapan sanatçıdır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Tasvir üslubu incelemesi en doğrudan R’nin resimleme işiyle ilgilidir.",
          },
          {
            label: "Adım 3",
            explanation:
              "R’nin işi Z’yi metnin yazarı olmaktan çıkarmaz; aynı eserde farklı roller birlikte bulunur.",
          },
        ],
        answer:
          "Tasvir üslubu için R’nin resimleme rolü incelenir; Z’nin metin yazarlığı bu nedenle değişmez.",
        check: "Bir rolü seçerken öteki kayıtlı rollerden birini sildin mi?",
        pitfall: "Aynı yazmada görev yapan bütün kişileri tek yazar sanmak.",
      },
      {
        title: "Gelirin tahsisi ve kalan tutar",
        prompt:
          "Tamamen kurmaca vakfiye hesabında dükkânlardan 12 hesap birimi geliyor; 4 birim yapı bakımı, 6 birim imaret hizmeti için ayrılıyor. Belge artanın başka hizmete aktarıldığını söylemiyor. Açık tahsisler ve kalan tutar nasıl gösterilir?",
        strategy:
          "Toplam geliri belirtilen iki hizmetten ve henüz amacı verilmemiş artandan ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Belirtilen harcama 4+6=10 birimdir.",
          },
          {
            label: "Adım 2",
            explanation:
              "12−10=2 birim kalır; belgenin bu artan için bir hizmet adı vermediği korunur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Gelirden belirli hizmetlere iki kanıtlı bağ çizilir; kalan 2 için yeni bir yararlanıcı uydurulmaz.",
          },
        ],
        answer:
          "Bakım 4, imaret 6, tahsis amacı verilmemiş kalan 2 birimdir. Sayılar kurmaca öğretim hesabıdır.",
        check:
          "4+6+2 toplamı 12 ediyor mu; son 2 için verilmemiş kurum adı ekledin mi?",
        pitfall:
          "Artan her geliri kayıtsız olarak seçilen başka hizmete bağlamak.",
      },
      {
        title: "Bir eser, iki ayrı nüsha",
        prompt:
          "Kurmaca katalogda K kütüphanesinde Mevlânâ’nın Mesnevî metninin 1470 tarihli bir nüshası, L kütüphanesinde aynı metnin 1530 tarihli başka bir nüshası kayıtlıdır. Fiziksel inceleme bunların iki ayrı yazma nesne olduğunu doğrulamıştır. Eser ve nüsha sayısı nasıl ayrılır?",
        strategy: "Metnin eser kimliğiyle onun fiziksel çoğaltımını ayrı say.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "İki kayıt aynı Mesnevî metniyle ilişkilendirilmiş; eserin adı ve müellifi ortaktır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Fiziksel inceleme iki ayrı yazma nesne verdiği için nüsha sayısı ikidir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Bir eserin iki nüshasının bulunması iki farklı müellif veya iki ayrı eser olduğunu gerektirmez.",
          },
        ],
        answer:
          "Aynı esere ait iki farklı nüsha vardır; metin kimliğiyle fiziksel nesne kimliği aynı ölçüt değildir.",
        check:
          "Eser adını sayarken fiziksel nüshaları birleştirdin mi, nüshaları sayarken iki yeni eser mi ürettin?",
        pitfall:
          "Her ayrı yazma nüshayı bağımsız bir eser veya her ortak metni tek fiziksel nesne sanmak.",
      },
      {
        title: "Mahlasla kişi sayısını karıştırma",
        prompt:
          "Öğretim kartı “Fatih Sultan Mehmet — Avnî” ve “Kanuni Sultan Süleyman — Muhibbî” eşleştirmelerini veriyor. Dört adın dört ayrı kişiye ait olduğunu söylemek neden yanlıştır?",
        strategy:
          "Resmî ad ile mahlas eşleştirmelerini kişi kimliği üzerinden oku.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Avnî ilk kartta Fatih’in şiirde kullandığı ad olarak tanımlanmıştır.",
          },
          {
            label: "Adım 2",
            explanation: "Muhibbî ikinci kartta Kanuni’nin mahlasıdır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Dört ad iki kişiyle ilişkilidir; mahlas yeni bir hükümdar veya üçüncü kişi yaratmaz.",
          },
        ],
        answer: "Kartta iki kişi ve bu kişilerin iki mahlası vardır.",
        check:
          "Her mahlası doğru hükümdara bağlayınca kişi sayısı iki kalıyor mu?",
        pitfall: "Her farklı adı bağımsız bir kişi saymak.",
      },
    ],
    recall: [
      {
        prompt: "Askerî sınıf neden yalnız savaşçı anlamına gelmez?",
        answer:
          "Tarihsel yönetenler statüsü seyfiye, kalemiye ve ilmiyeyi de kapsar; yargı veya öğretim görevi bunun dışında değildir.",
      },
      {
        prompt: "Tuğralı bir belgenin her satırını hükümdar mı yazmıştır?",
        answer:
          "Bu sonuç gerekmez; hükümdarlık işareti, yetki ve yazıyı kaleme alan kişi ayrı alanlardır.",
      },
      {
        prompt: "Fetva ile mahkeme hükmü aynı işlem midir?",
        answer:
          "Hayır; fetva dinî-hukuki görüş, mahkeme hükmü somut uyuşmazlık hakkında yargı kararıdır.",
      },
      {
        prompt: "Vakıf düzeninde gelir kaynağı ile hizmet amacı nasıl ayrılır?",
        answer:
          "Dükkân gibi mal gelir sağlayabilir; imaret gibi hizmet bu gelirin tahsis edildiği amaç olabilir. Vakfiye koşulları bağı belirler.",
      },
      {
        prompt:
          "Yazılı bir şiirin sesli okunması hangi iki aktarım ortamını birleştirir?",
        answer:
          "Yazılı nüsha kitabî aktarımı, sesli icra sözlü aktarımı gösterir; ikisi birbirini zorunlu olarak bitirmez.",
      },
      {
        prompt: "Sahn-ı Seman ile Süleymaniye hangi hükümdarlarla ilişkilidir?",
        answer:
          "Sahn-ı Seman Fatih Sultan Mehmet, Süleymaniye Kanuni Sultan Süleyman ile ilişkilidir; kurum ve dönemleri ayrı kaydedilir.",
      },
    ],
    items: [
      {
        passage:
          "Bir Osmanlı kurum kaydında müderrisin öğretim, kadının yargılama ve bazı idari işler yaptığı belirtiliyor. Kayıt bu görevlileri ilmiye içinde, ilmiyeyi de tarihsel yönetenler yani askerî sınıf kapsamında gösteriyor. İncelemenin sorusu görevle statünün birbirine karıştırılıp karıştırılmadığıdır.",
        prompt: "Hangi yorum kayıttaki görev ve statü ayrımını korur?",
        options: [
          "Öğretim veya yargı görevi yapmak, tarihsel askerî sınıf statüsünün dışında kalmayı tek başına gerektirmez.",
          "Askerî sınıfta bulunmak bu iki görevin de yalnız savaş komutası olduğu anlamına gelir.",
          "Müderris ders verdiğinden kayıt onu zorunlu olarak yalnız reaya içinde göstermiştir.",
          "Kadı ilmiye içinde bulunduğu için müderrisle bütün yetkileri aynıdır.",
          "Günümüzdeki asker mesleği tanımı kayıttaki tarihsel statünün bütün anlamını karşılar.",
        ],
        steps: [
          "Öğretim ve yargı görevlerini, yönetenler statüsü bilgisinden ayrı işaretle.",
          "Kayıt ilmiyeyi askerî sınıf içine açıkça koyuyor; savaşmama ölçütüyle bu statüyü silme.",
          "Ortak statüyle farklı görevin birlikte korunabildiği yorumu seç.",
        ],
        reasons: [
          "Gövde iki sivil işlevi tarihsel yönetenler statüsü içinde birlikte vermiştir.",
          "Statü başlığı öğretim ve yargı eylemlerini savaş komutasına dönüştürmez.",
          "Kayıt müderrisi ilmiye ve yönetenler içinde göstermiştir; bu önerme statüyü tersine çevirir.",
          "Aynı görev ailesinde bulunmak bütün yetkilerin aynı olduğu anlamını taşımaz.",
          "Gövde tarihsel yönetenler terimini kullanır; güncel meslek tanımıyla birebir eşitlenemez.",
        ],
        knowledge:
          "Osmanlı askerî sınıfı yönetenler statüsüdür; ilmiye içindeki öğretim ve yargı görevlerini de kapsar.",
        strategy:
          "Bir kişinin yaptığı işle tarihsel statüsünü iki ayrı sınıflama olarak oku.",
        error:
          "Tarihsel askerî sınıfı yalnız savaş alanında çarpışanlarla sınırlamak.",
        check:
          "Sonucunda hem ilmiye statüsü hem farklı öğretim-yargı işleri duruyor mu?",
      },
      {
        passage:
          "Bir öğretim kartında nişancı tuğra ve kayıt işleriyle, defterdar mali hesaplarla ilişkilendiriliyor. Yeni dosyanın K bölümünde gelir-gider hesaplarının denetlendiği; L bölümünde hükümdarlık işaretinin belgede düzenlendiği yazıyor.",
        prompt: "Ayırıcı işlevlere göre K ve L hangi eşleştirmeyle tamamlanır?",
        options: [
          "K defterdar, L nişancı.",
          "K nişancı, L defterdar.",
          "K müderris, L kadı.",
          "K kadı, L müftü.",
          "K beylerbeyi, L müderris.",
        ],
        steps: [
          "K’nin ana işini mali hesap, L’ninkini tuğra işi olarak ayır.",
          "Kartta mali hesap defterdara, tuğra nişancıya bağlanmış.",
          "İki eşleştirmeyi birlikte doğru tutan seçeneği seç.",
        ],
        reasons: [
          "Her iki görev de kartta verilen ayırıcı işle eşleşir.",
          "Mali hesap ile tuğra görevlerini birbirinin yerine geçirir.",
          "Öğretim ve yargı unvanları verilen mali hesap-tuğra çiftini karşılamaz.",
          "Yargı ve fetva işleri bu kartın iki ayırıcı görevi değildir.",
          "Eyalet yönetimi ve öğretim, verilen mali hesap-tuğra tanımlarının yerine geçmez.",
        ],
        knowledge:
          "Defterdar mali hesap, nişancı tuğra ve kayıt çevresiyle ilişkilidir; ortak kalemiye bağlamı işleri özdeşleştirmez.",
        strategy:
          "Unvanı belge üzerindeki somut işlevle eşleştir; iki satırı ayrı denetle.",
        error:
          "İki kalemiye görevlisini işlevleri ayırmadan birbirinin yerine kullanmak.",
        check: "K için hesap, L için tuğra koşulunu ikisi de sağlıyor mu?",
      },
      {
        passage:
          "Bir araştırmacı bir uyuşmazlık hakkında müftünün verdiği fetva metnini buluyor. Dosyada fetva dinî-hukuki görüş olarak tanımlanmış. Aynı uyuşmazlığın kadı hükmü ve mahkeme sicili henüz bulunmamıştır.",
        prompt:
          "Araştırmacı bu dosyaya dayanarak hangi sonucu doğrudan söyleyebilir?",
        options: [
          "Uyuşmazlık hakkında bir dinî-hukuki görüş verilmiştir; somut mahkeme kararı için ayrıca kayıt gerekir.",
          "Mahkeme hükmünün her ayrıntısı fetva metniyle kesin olarak belirlenmiştir.",
          "Fetva bulunduğundan uyuşmazlığın hiç mahkemeye gitmediği kanıtlanmıştır.",
          "Dinî-hukuki görüş bulunması kadı ile müftünün bütün yetkilerinin aynı olduğunu gösterir.",
          "Mahkeme sicili bulunmadığı için eldeki görüş metninin varlığı da reddedilmelidir.",
        ],
        steps: [
          "Bulunan metnin türünü görüş, henüz bulunmayanı hüküm ve sicil olarak ayır.",
          "Görüşün verilmiş olması somut kararın nasıl çıktığını kendiliğinden bildirmez.",
          "Açık görüş kaydını koru ve mahkeme uygulamasını ek araştırma alanı olarak bırak.",
        ],
        reasons: [
          "Eldeki metnin işlevini doğru korur; eksik mahkeme kararı için yeni bilgi uydurmaz.",
          "Fetva ile somut yargı kararının aynı olduğu verilmemiştir.",
          "Hüküm kaydının henüz bulunmaması, hiç yargılama yapılmadığının kanıtı değildir.",
          "Görüş bildirme ile somut uyuşmazlığı hükme bağlama farklı yetkilerdir.",
          "Bir başka kaydın eksikliği bulunan belgenin varlığını ortadan kaldırmaz.",
        ],
        knowledge:
          "Fetva ile mahkeme hükmü farklı işlemlerdir; görüşün varlığı uygulamanın bütün ayrıntılarını tek başına vermez.",
        strategy:
          "Eldeki belge türüyle araştırılan uygulama arasındaki eksik bağı belirle.",
        error: "Görüş kaydını somut yargı kararının tam yerine koymak.",
        check:
          "Mahkemenin kararını gerçekten belgeleyen bir kayıt dosyada var mı?",
      },
      {
        passage:
          "Bir medresenin belirli döneme ait ders kaydı fıkıh ve tefsir yanında matematik ile astronomi okutulduğunu gösteriyor. Araştırma başka medreselerin ders çizelgelerini veya bu kurumun bütün yüzyıllardaki programını vermiyor.",
        prompt: "Bu kayıt hangi yorumu destekler?",
        options: [
          "İncelenen kurum ve dönemde dinî ve aklî ilimlerle ilişkili dersler birlikte okutulmuştur.",
          "Bütün medreselerde bütün yüzyıllar boyunca aynı ders çizelgesi uygulanmıştır.",
          "Matematik okutulduğu için fıkıh kaydı geçersizdir.",
          "Astronomi dersinin varlığı her öğrencinin aynı mesleğe atandığını gösterir.",
          "Fıkıh ile tefsirin bulunması kurumda başka alanın öğretilemeyeceği anlamına gelir.",
        ],
        steps: [
          "Kayıttaki dersleri iki bilgi alanıyla ilişkilendirerek listele.",
          "Kanıtın tek kurum ve belirli dönemle sınırlı olduğunu koru.",
          "Birlikte öğretimi kabul et; bütün kurum ve dönemlere aynı programı yayma.",
        ],
        reasons: [
          "Kayıt iki tür dersin aynı kurum ve dönemde birlikte bulunduğunu açıkça verir.",
          "Başka kurum ve dönemlere ilişkin çizelge bulunmadığından bu evrensel sonuç çıkmaz.",
          "İki ders alanı aynı kurumda bulunabilir; biri ötekinin kaydını silmez.",
          "Ders listesi her öğrencinin nihai görevlendirmesini bildirmez.",
          "Gövde matematik ve astronomiyi de açıkça vermektedir.",
        ],
        knowledge:
          "Medrese öğretimi dinî ve aklî ilimlerle ilişkilendirilebilir; programların kuruma ve döneme göre incelenmesi gerekir.",
        strategy:
          "Derslerin birlikte varlığını kurum ve zaman sınırını aşmadan yorumla.",
        error:
          "Bir kurumun belirli ders çizelgesini bütün medreselerin değişmez programı saymak.",
        check: "Sonucun bu medrese ve kaydın ait olduğu dönemle sınırlı mı?",
      },
      {
        passage:
          "Bir tarih çizelgesi Sahn-ı Seman medreselerini Fatih Sultan Mehmet’le, Süleymaniye medreselerini Kanuni Sultan Süleyman’la ilişkilendiriyor. Bir öğrenci iki kurumun da İstanbul’da olması nedeniyle hükümdar alanlarını yer değiştirebileceğini söylüyor.",
        prompt: "Çizelgenin bilgilerini koruyan değerlendirme hangisidir?",
        options: [
          "Ortak şehir, kurum-hükümdar eşleştirmelerini değiştirmenin gerekçesi değildir.",
          "Aynı şehirde bulunan iki kurum mutlaka aynı hükümdarca kurulmuştur.",
          "Sahn-ı Seman ile Süleymaniye tek kurumun zorunlu olarak aynı dönemdeki iki adıdır.",
          "Kurum adı bilindiğinde dönem ve hükümdar bilgileri karşılaştırmada kullanılamaz.",
          "İstanbul ortaklığı Sahn-ı Seman’ı Kanuni’ye, Süleymaniye’yi Fatih’e bağlamayı gerektirir.",
        ],
        steps: [
          "Ortak olan şehir bilgisini iki ayrı kurum-hükümdar eşleşmesinden ayır.",
          "Çizelgenin her kurum için verdiği hükümdarı aynı satırda tut.",
          "Ortak mekândan tarihsel kişi ve kurum kimliğinin özdeşliği sonucuna atlama.",
        ],
        reasons: [
          "Şehir ortaklığı çizelgede verilen iki farklı hükümdar bağını ortadan kaldırmaz.",
          "Aynı şehirde farklı dönem ve kurucuların kurumları bulunabilir.",
          "Çizelge iki kurumu farklı hükümdarlarla ilişkilendirmiş; tek kurum kimliği vermemiştir.",
          "Hükümdar ve dönem bilgisi kurumun tarihsel bağlamını ayırmada kullanılabilir.",
          "Bu seçenek açık eşleştirmeleri tersine çevirir; ortak şehir bunu gerektirmez.",
        ],
        knowledge:
          "Sahn-ı Seman Fatih, Süleymaniye Kanuni ile ilişkilidir; mekân ortaklığı tarihsel eşleştirmeleri özdeşleştirmez.",
        strategy:
          "Ortak mekânı farklı kurum ve dönem alanlarının yerine koyma.",
        error:
          "Aynı şehirdeki kurumları aynı kurucu veya aynı dönemle zorunlu olarak birleştirmek.",
        check: "Her kurum çizelgedeki kendi hükümdarıyla aynı satırda mı?",
      },
      {
        passage:
          "Bir kaynak Uluğ Bey’i Timur hanedanı ve Semerkant’taki medrese-gözlemevi çalışmalarıyla tanıtıyor. Ayrı bir kart Ali Kuşçu’nun İstanbul’daki matematik ve astronomi katkılarını bildiriyor. Kaynak, farklı siyasi çevreler arasında bilgi birikiminin aktarılabildiğini söylüyor.",
        prompt:
          "Hangi yorum iki kartın siyasi ve bilimsel alanlarını karıştırmaz?",
        options: [
          "Ortak bilgi alanı, Uluğ Bey’i Osmanlı hükümdarı olarak sınıflandırmayı gerektirmez.",
          "Astronomiyle ilgilenen bütün kişiler aynı devletin hükümdarıdır.",
          "Ali Kuşçu’nun İstanbul katkısı Semerkant kartındaki hanedan bilgisini geçersiz kılar.",
          "İki kartta matematik ve astronomi bulunması çalışmaların aynı şehirde yapıldığını kanıtlar.",
          "Bilgi aktarımı mümkün olduğundan iki kişi tek kişinin farklı adları sayılmalıdır.",
        ],
        steps: [
          "İlk kartın hanedan ve şehir alanını, ikinci kartın katkı ve şehir alanını ayrı belirle.",
          "Ortak bilim alanı iki siyasi çevrenin özdeş olduğunu söylemiyor.",
          "Bilgi ilişkisini korurken Uluğ Bey’in verilen hanedan kimliğini değiştirmeyen yorumu seç.",
        ],
        reasons: [
          "Bilimsel ortaklık siyasi hanedan kimliğinin yerine geçmez; ilk kartın bilgisi korunur.",
          "Bilim alanı hükümdarlık veya aynı devlet üyeliği ölçütü değildir.",
          "Farklı şehirlerdeki bilim katkıları birbiriyle çelişmek zorunda değildir.",
          "Şehirler açıkça farklı verilmiştir; ortak alan mekânı özdeşleştirmez.",
          "Bilgi aktarımı iki ayrı kişiyi aynı kişi yapmaz.",
        ],
        knowledge:
          "Bilimsel bilgi ağları siyasi sınırları aşabilir; hanedan ve devlet kimliği katkı alanıyla aynı sınıflama değildir.",
        strategy:
          "Şehir, siyasi kimlik ve bilgi alanını birbirine dönüştürmeden karşılaştır.",
        error:
          "Aynı bilim alanına katkıyı aynı siyasi kimlik veya aynı kişi olma kanıtı saymak.",
        check:
          "Semerkant/Timur hanedanı verisini çözümünde başka bir devletle değiştirdin mi?",
      },
      {
        passage:
          "Kurmaca bir vakfiyede gelir getiren mal ve desteklenecek hizmet belirlenmiş; M kişisi mütevelli olarak yönetimle görevlendirilmiştir. Belge M’nin vakfı kurduğunu veya malların tamamının onun kişisel mülkü olduğunu söylemiyor.",
        prompt: "M’nin kayıttaki konumu için hangi sonuç doğrudan desteklenir?",
        options: [
          "Belirlenmiş koşullar içinde vakıf yönetimi görevi üstlenmiştir.",
          "Yönetici yazıldığı için zorunlu olarak vakfın kurucusudur.",
          "Yönetim görevi bütün gelirleri kişisel amacı için sınırsız kullanma hakkı verir.",
          "M’nin adı bulunduğundan vakfiyedeki hizmet amacı artık geçersizdir.",
          "Vakıf malını yönetmek ile o malın bütün mülkiyet haklarının sahibi olmak aynı şeydir.",
        ],
        steps: [
          "M için verilen açık rolü mütevelli yani yönetim görevi olarak belirle.",
          "Kuruculuk ve sınırsız kişisel mülkiyet ayrıca verilmemiş.",
          "M’nin görevini vakfiyenin belirlediği amaç ve koşullarla birlikte sınırlı olarak koru.",
        ],
        reasons: [
          "M için kayıtta açıkça yönetim görevlendirmesi yapılmıştır.",
          "Yönetici ile kurucu farklı roller olabilir; belge kuruculuğu vermemiştir.",
          "Görev vakfiyenin amaç ve koşulları içindedir; sınırsız kişisel kullanım yetkisi verilmemiştir.",
          "Yönetici atanması desteklenecek hizmet amacını kendiliğinden ortadan kaldırmaz.",
          "Yönetme yetkisi bütün kişisel mülkiyet haklarıyla eş anlamlı değildir.",
        ],
        knowledge:
          "Mütevelli vakıf yönetimiyle ilişkilidir; kuruculuk, hizmet amacı ve kişisel mülkiyet ayrı alanlardır.",
        strategy:
          "Görev tanımını belgede verilmeyen kuruculuk veya sahiplik iddialarına genişletme.",
        error:
          "Bir malın yöneticisini onun sınırsız kişisel sahibi veya zorunlu kurucusu saymak.",
        check:
          "M hakkında seçtiğin özellik gerçekten açık görev kaydında var mı?",
      },
      {
        passage:
          "Bir şiirin yazma nüshası kütüphanede saklanıyor. Aynı şiir bir topluluk önünde sesli okunuyor ve bazı dizeleri dinleyiciler tarafından yeniden anlatılıyor. Araştırmacı yazılı nüshayı ve sözlü icrayı ayrı kayıtlarla belgeliyor.",
        prompt: "Bu örnek kültürün aktarım ortamları için ne gösterir?",
        options: [
          "Kitabî ve sözlü aktarım aynı eser çevresinde birlikte bulunabilir.",
          "Yazılı nüsha bulunduğu için sözlü icra kaydı mutlaka yanlıştır.",
          "Sesli okuma yapıldığından şiirin hiçbir yazılı nüshası olamaz.",
          "İki aktarım ortamı bulunması bütün dinleyicilerin okuma yazma bildiğini kanıtlar.",
          "Dinleyicilerin dizeleri aktarması nüshanın hangi yılda kopyalandığını tek başına bildirir.",
        ],
        steps: [
          "Kütüphanedeki nesneyi yazılı nüsha, topluluk önündeki eylemi sözlü icra olarak ayır.",
          "Aynı şiir iki ortamda izlenmiş; biri diğerinin varlığını dışlamıyor.",
          "Birlikte aktarımı kabul et; dinleyicilerin bütün okuryazarlık veya nüsha tarihi bilgisini ekleme.",
        ],
        reasons: [
          "İki ortamın aynı eserle ilişkisi ayrı kayıtlarla açıkça verilmiştir.",
          "Yazı ile sözlü icra birlikte bulunabileceğinden zorunlu çelişki yoktur.",
          "Gövde yazılı nüshanın varlığını açıkça bildirmektedir.",
          "Sözlü dinleme veya aktarma bütün dinleyicilerin okuryazar olduğunu göstermez.",
          "Aktarım eylemi kopya tarihini kendi başına belirlemez.",
        ],
        knowledge:
          "Sözlü ve kitabî kültür birbirini zorunlu olarak sona erdiren kapalı dönemler veya gruplar değildir.",
        strategy:
          "Eserin kimliğiyle onun aktarım ortamlarını farklı alanlarda tut.",
        error:
          "Yazı kullanımıyla sözlü anlatının zorunlu olarak bittiğini varsaymak.",
        check: "Hem yazılı nüsha hem sesli icra çözümünde korunuyor mu?",
      },
      {
        passage:
          "Bir şehir araştırması farklı tarihlerde yapılmış medrese, hamam ve çarşının zamanla ortak hizmet ve gelir ağında ilişkilendiğini gösteriyor. Eski mahallelerin ve bazı önceki yapıların da kullanılmaya devam ettiği kayıtlıdır.",
        prompt: "Bu araştırma hangi şehirleşme yorumunu destekler?",
        options: [
          "Farklı zamanların yapıları yeni ve eski unsurların birlikte bulunduğu bir hizmet ağında ilişkilenebilir.",
          "Ortak hizmet ağına katılan bütün yapılar mutlaka aynı gün inşa edilmiştir.",
          "Yeni medrese kurulması önceki bütün mahallelerin yok edildiğini gösterir.",
          "Hamam, çarşı ve medrese ortak ağda bulunduğundan aynı işlevi yerine getirir.",
          "Eski bir yapının kullanılmaya devam etmesi yeni gelir ilişkilerinin kurulmasını imkânsızlaştırır.",
        ],
        steps: [
          "Yapım tarihlerinin farklı, sonradan kurulan bağın ortak ağ olduğunu ayır.",
          "Eski mahalle ve yapıların devam ettiğini bildiren kaydı koru.",
          "İlişkilenmeyi aynı tarihte yapılma veya bütün eski unsurların silinmesiyle eşitleme.",
        ],
        reasons: [
          "Farklı tarihler, sonradan ortak ağ ve eski kullanımların devamı birlikte bu yorumu destekler.",
          "Ortak kullanım ağı aynı inşa tarihi anlamına gelmez; tarihler farklı verilmiştir.",
          "Gövde eski mahallelerin de kullanıldığını açıkça söylemektedir.",
          "Aynı ağda eğitim, temizlik ve ticaret gibi farklı hizmetler bulunabilir.",
          "Eski yapıların sürmesi yeni ekonomik ve kurumsal bağlarla birlikte mümkündür.",
        ],
        knowledge:
          "İmar ve şehirleşme, eski ve yeni yapılar arasında zamanla gelişen farklı işlevli ağları içerebilir.",
        strategy:
          "Yapının kuruluş tarihi, süren kullanımı ve sonradan kurulan ilişkisini ayrı oku.",
        error:
          "Ortak hizmet ağını bütün yapıların aynı tarihte aynı işlevle kurulması sanmak.",
        check:
          "Araştırmanın farklı tarihler ve devam eden eski kullanım bilgilerini değiştirdin mi?",
      },
      {
        passage:
          "Bir sanat kartı hat sanatını yazıyı estetik kurallarla biçimlendirme, çiniyi sırlı pişmiş toprak yüzeylerle bezeme, minyatürü ise resimle tasvir olarak tanımlıyor. K örneğinde harfler estetik düzende yazılmış; L örneğinde sırlı pişmiş toprak parçalar bir yüzeyi bezemiştir.",
        prompt: "K ve L hangi eşleştirmeyle tanımlanır?",
        options: [
          "K hat, L çini.",
          "K çini, L hat.",
          "K minyatür, L hat.",
          "K hat, L minyatür.",
          "K ve L yalnız minyatürdür.",
        ],
        steps: [
          "K’deki ana işlemi harfleri estetik yazma, L’dekini sırlı pişmiş toprakla bezeme olarak belirle.",
          "Kartta bu iki işlem hat ve çini tanımlarına verilmiş.",
          "Resimle tasvir koşulunu bu örneklerde verilmiş gibi eklemeden iki eşleşmeyi kontrol et.",
        ],
        reasons: [
          "Her iki örnek verilen sanat tekniği ve malzemesiyle doğru eşleşir.",
          "Harf yazımı ile sırlı pişmiş toprak teknikleri tersine çevrilmiştir.",
          "K’de resimle tasvir değil estetik harf yazımı verilmiş; L de hat malzemesi değildir.",
          "K doğru eşleşse de L’nin malzemesi çiniyi gösterir; resimle tasvir verilmemiştir.",
          "İki örnekte de minyatürün ayırıcı resimle tasvir koşulu açıkça verilmemiştir.",
        ],
        knowledge:
          "Hat, çini ve minyatür aynı eserde bulunabilse de eylem ve malzeme bakımından farklı sanat dallarıdır.",
        strategy:
          "Her örneğin tekniğini ve malzemesini karttaki tanımla ayrı ayrı eşleştir.",
        error:
          "Yazı, sırlı yüzey ve resimleme tekniklerini ortak sanat başlığı içinde özdeşleştirmek.",
        check:
          "K için harf, L için sırlı pişmiş toprak koşulunu ikisi de karşılıyor mu?",
      },
    ],
  },
  {
    id: "tarih-zaman",
    topic: "detail-226",
    title: "Tarih ve zaman: kanıtı sıraya koy",
    minutes: 125,
    objectives: [
      "Kaynağı, yorumu ve çıkarımı ayır.",
      "Tarihleri MÖ–MS doğrultusunda sırala.",
      "Yüzyıl, yarı ve çeyreği sınır yıllarında da hesapla.",
    ],
    sections: [
      {
        title: "Önce insanı, yeri ve zamanı bul",
        paragraphs: [
          "Tarih, insan topluluklarının geçmişteki faaliyetlerini kanıtlara dayanarak, yer ve zaman içinde inceleyen sosyal bilimdir. Bir kuraklığın oluşumu doğa bilimleriyle araştırılır; kuraklığın göçe, üretime veya yönetim kararlarına etkisi tarih araştırmasına konu olabilir. Aynı olayın ekonomik, siyasi ve kültürel etkileri birlikte bulunabilir. Olayları yalnız hükümdar ve savaş adlarından ibaret görme; sıradan insanların üretimi, göçleri ve günlük hayatı da geçmişi açıklar.",
          "Tarih araştırmasının kaynağı yalnız devlet arşivi değildir. Bir üreticinin hesabı, göç eden kişinin anlatısı, yerleşim kalıntısı veya fotoğraf da araştırma sorusuna veri sağlayabilir. Kaynağın insan yaşamıyla ilgili hangi soruyu aydınlattığı belirlenir. Bir çevre değişikliğinin fiziksel ölçümü başka bir disiplinin işi olabilir; tarihçi bu ölçümü yerleşme, üretim ve karar kayıtlarıyla birlikte kullanabilir. Disiplinler arası iş birliği araştırmanın insan ve toplum odağını ortadan kaldırmaz.",
        ],
      },
      {
        title: "Kaynak tanıktır; otomatik olarak tarafsız değildir",
        paragraphs: [
          "Araştırılan olaya tanıklık eden birinin günlüğü birinci elden, o günlükleri daha sonra karşılaştıran bir inceleme ikinci elden kaynak olabilir. Bu sınıflama araştırma sorusuna bağlıdır: bir ders kitabı eski bir savaş için ikinci elden iken, yazıldığı dönemin eğitim anlayışını araştırırken doğrudan inceleme nesnesidir. Kaynağın yazarı, tarihi, amacı, muhatabı ve korunma koşulları sorulur. Tanık da yanılabilir veya propaganda yapabilir; birinci elden olmak doğruluğu tek başına garanti etmez. Bağımsız kaynaklarla karşılaştırma güveni artırır.",
          "Birinci ve ikinci el ayrımı kaynağın araştırılan olayla ilişkisidir; yazılı, sözlü, görsel veya maddi ayrımı ise biçimiyle ilgilidir. Aynı kaynak bu iki eksende birden sınıflanır. Dönemin fotoğrafı görsel ve doğrudan tanıklık niteliğinde, fotoğrafı sonradan yorumlayan makale yazılı ve sonraki araştırma olabilir. Bir tanık gördüğünü yanlış hatırlayabilir; bir araştırmacı da tanıkları dikkatle karşılaştırabilir. Bu yüzden kaynak türü doğruluk puanının yerine kullanılmaz.",
        ],
      },
      {
        title: "Kanıttan çıkarıma, çıkarımdan açıklamaya",
        paragraphs: [
          "Bir kazıda tahıl deposu bulunması depolama yapıldığına kanıttır; tek başına bütün toplumun zengin veya eşitlikçi olduğunu göstermez. Yazıtları epigrafi, eski yazıları paleografya, paraları nümizmatik; maddi kalıntıları arkeoloji, zaman sırasını kronoloji incelemeye yardımcı olur. Yazının henüz kullanılmadığı bir topluluğu araştırırken yazılı belge beklemek yerine maddi kalıntılardan yararlanılır. Yeni bulgu önceki yorumu geliştirebilir. Tarihsel olay deneyde aynı koşullarla yeniden kurulamaz; kaynak eleştirisi bu nedenle önemlidir.",
          "Bir buluntunun ortaya çıkarılması arkeolojiyle, eski yazının okunması paleografyayla, yazıtın bütünüyle incelenmesi epigrafiyle, dildeki değişim filolojiyle ilişkilidir. Diplomatik ise tarih araştırmasında resmî belgelerin türünü, biçimini ve düzenlenme özelliklerini inceler. Örneğin bir fermanın eski yazısını okumak paleografyanın, belgenin hitap, mühür ve düzenini kendi türünün kurallarıyla karşılaştırmak diplomatiğin işidir. Aynı nesne üzerinde bu işler birlikte yürütülebilir; yazının dilindeki anlam değişimini araştırmak da ayrı bir filoloji odağıdır. Yardımcı alanı yalnız nesnenin adına bakarak seçmek yerine araştırmacının hangi soruyu sorduğunu ve hangi işi yaptığını belirle.",
        ],
      },
      {
        title: "Sonra olması, tek başına neden olduğunu göstermez",
        paragraphs: [
          "Kronoloji neden–sonuç ilişkisini kurmayı kolaylaştırır, fakat art arda gelen her iki olay birbirinin nedeni değildir. Bir göçün kuraklık, otlak ihtiyacı, siyasi baskı ve ticaret gibi birden fazla nedeni olabilir. İnsanların davranışlarını kendi dönemlerinin koşullarıyla değerlendir; bugünkü kurumları geçmişte de aynı anlamla varmış gibi kullanmak anakronizme yol açar. Zamanı ve yeri belirli bir gelişmeyi olay, daha uzun sürede oluşan ortak değişimi olgu olarak ayırt edebilirsin; bir savaş ile uzun süreli şehirleşme aynı zaman ölçeğinde değildir.",
          "Nedensel açıklama, iki gelişmenin yalnız sırasını vermekten fazlasını ister. Hangi kararın, kaynak değişiminin veya toplumsal ilişkinin sonraki gelişmeye nasıl katkı yaptığı araştırılır. Bir göçün hemen öncesinde kuraklık bulunması zaman bağını gösterir; bütün göçmenlerin tek nedeninin bu olduğunu göstermez. Tarihsel empati ise dönemin insanlarının bilgi ve seçeneklerini anlamaya çalışmaktır; kölelik, savaş veya baskı gibi uygulamaları onaylamak zorunluluğu değildir.",
        ],
      },
      {
        title: "Takvimde üç farklı soru sor",
        paragraphs: [
          "Takvimin hangi gök hareketini esas aldığı, hangi olayı başlangıç kabul ettiği ve yılın hangi gün başladığı ayrı sorulardır. Güneş esaslı miladi takvim ile Ay esaslı hicri takvimin yıl uzunlukları farklıdır; hicri takvimin başlangıç olayı hicrettir. Miladi takvimde yıl 1 Ocak’ta başlar; bu, milat kavramının 1 Ocak anlamına geldiği demek değildir. Türklerin kullandığı takvimler arasında On İki Hayvanlı Türk, hicri, Celali, Rumi ve miladi takvimler bulunur; hepsini aynı esaslı sanma. Türkiye’de miladi takvim 1 Ocak 1926’dan itibaren kullanılmaya başlanmıştır.",
          "Hicrî takvim Ay evreleriyle, miladi takvim mevsim döngüsüne dayanan güneş yılıyla ilişkilidir. Rûmî takvim de güneş esaslı mali kullanım örneğidir; hicretle bağlantılı yıl sayımı onu hicrî gibi Ay esaslı yapmaz. Miladi gelenekte dönem sayımı İsa’nın doğumunu esas alan milat kabulüne dayanır; bu tarihsel takvim kabulü, doğumun gün ve yılının burada bağımsız olarak kanıtlandığı anlamına gelmez. Bir takvim için astronomik esas, yılların sayıldığı dönem başlangıcı ve yıl içindeki ilk gün ayrı tutulur. Tam gün dönüşümlerinde takvim reformları ve ay-gün bilgisi önemlidir; bütün dönemlerde sabit bir sayı ekleyerek kesin dönüşüm yapılamaz.",
        ],
      },
      {
        title: "Sıfır yılı yok; sınır yıllarını dene",
        paragraphs: [
          "Geleneksel MÖ–MS tarihlemesinde MÖ 1’in ardından MS 1 gelir; 0 yılı yoktur. MÖ’de küçük numaralı yıl zaman çizgisinde daha sonradır: MÖ 220, MÖ 300’den sonradır. MS 1–100 birinci, 101–200 ikinci yüzyıldır; dolayısıyla 1900 on dokuzuncu, 1901 yirminci yüzyıldadır. MS 1923, 20. yüzyılın ilk yarısının ilk çeyreğidir. MÖ’de aynı yüzyılın kronolojik ilerleme yönü ters olduğundan MÖ 220 üçüncü yüzyılın ikinci yarısının son çeyreğidir. Keşif modelinde yönü değiştir, özellikle 100 ve 101 sınırlarını dene. Yalnız yıl numaralarıyla MÖ 2’den MS 3’e aynı yıl noktasına süre hesabı 2+3−1=4 yıldır; tam gün hesabında ay ve gün de gerekir.",
          "Yüzyılın yüz yıllık aralığını önce belirle, sonra zamanın akış yönünü izle. MS 1501–1600 aralığında ilk çeyrek 1501–1525, son çeyrek 1576–1600’dür. MÖ 400–301 aralığında akış 400’den 301’e gider; ilk çeyrek 400–376, son çeyrek 325–301’dir. Bu anlatımda ilk ve son, sayının küçüklüğünü değil kronolojik sırayı belirtir. Bir yıllık aralık sayısı ile iki uç dahil yıl etiketlerinin sayısı da aynı ölçüt değildir.",
        ],
      },
      {
        title: "Kaynak biçimi ile araştırmaya uzaklığı ayrı eksenlerdir",
        paragraphs: [
          "Yazılı kaynaklar arasında mektup, ferman, tablet ve gazete; sözlü kaynaklarda anlatı ve tanıklık; görsel-işitsel kaynaklarda fotoğraf, film ve ses; maddi kalıntılarda araç ve yapı bulunabilir. Bir nesne birden fazla özellik taşıyabilir. Üzerinde yazı bulunan bir sikke hem maddi nesne hem okunabilir yazı içerir; hangi yönünün incelendiği araştırma sorusuyla belirlenir.",
          "Aynı kitabın kaynak konumu soruyla değişebilir. Eski bir savaşın bugünkü araştırma kitabı o savaş için sonraki yorumdur; kitabın yayımlandığı dönemde tarih eğitiminin nasıl verildiğini araştıran kişi için ise doğrudan inceleme nesnesidir. Bu değişim kitabın bir anda doğru veya yanlış olması değildir; kaynak ile araştırma konusu arasındaki ilişkinin değişmesidir.",
        ],
        table: {
          headers: ["Kaynak", "Biçim", "Belirtilen araştırmaya göre konum"],
          rows: [
            [
              "Olay sırasındaki mektup",
              "Yazılı",
              "Olay için doğrudan tanıklık olabilir",
            ],
            [
              "Bu mektubu yorumlayan yeni makale",
              "Yazılı",
              "Aynı olay için sonraki araştırma",
            ],
            [
              "Dönemin yapı kalıntısı",
              "Maddi",
              "İlgili yerleşme için doğrudan buluntu",
            ],
            [
              "Bugünkü ders kitabı",
              "Yazılı",
              "Bugünkü eğitim anlayışını araştırırken doğrudan inceleme nesnesi",
            ],
          ],
        },
      },
      {
        title: "Kaynak aramadan açıklama kurmaya beş işlem",
        paragraphs: [
          "Tarama kaynak aramayı, tasnif bulunanları zaman, yer veya konuya göre sınıflamayı, tahlil içeriği çözümlemeyi, tenkit köken ve içeriğin güvenilirliğini sınamayı, terkip ise denetlenmiş bulguları tutarlı bir açıklamada birleştirmeyi anlatır. Bir belgeye ulaşmak, onun içeriğini eleştirmiş veya sonuçları bir anlatıda birleştirmiş olmak değildir.",
          "Bu beş işlem katı ve geri dönülmez bir sıra gibi düşünülmez. Yeni belge bulunca sınıflama değişebilir; eleştiri sırasında başka kaynağa ihtiyaç duyulabilir; sentez kurulurken açıklanmayan boşluk fark edilebilir. Soruda tarihçinin fiilen ne yaptığı soruluyorsa aramak, sınıflamak, çözümlemek, sınamak ve birleştirmek eylemlerini ayır. İşlemin hedefi, yakın anlamlı sözcüklerden daha belirleyicidir.",
        ],
      },
      {
        title: "Dış tenkit ve iç tenkit birbirini destekler",
        paragraphs: [
          "Dış tenkit belgenin kimin tarafından, ne zaman ve nerede üretildiği, malzemesi, yazısı, imzası, asıl veya kopya oluşu gibi köken ve özgünlük alanlarını inceler. İç tenkit ise ne söylediği, yazarın olaya erişimi, amacı, taraflılığı, anlatımın tutarlılığı ve başka kanıtlarla uyumu üzerine çalışır. Aynı bulgu iki alana da yardımcı olabilir; sorulan denetimin amacı açık tutulur.",
          "Gerçek bir belge yanıltıcı iddia içerebilir; bir kopya da eski bir metni doğru aktarabilir. Bu yüzden sahihlik ile içerik doğruluğu aynı karar değildir. Bir yazarın taraf olması anlattığı her ayrıntıyı otomatik yanlış yapmaz; iddialar ayrı ayrı karşılaştırılır. Belgenin kimliği ve içeriği denetlenmeden yalnız eski görünüm veya ünlü adla sonuca gidilmez.",
        ],
      },
      {
        title: "Yardımcı alanı nesneden değil sorulan işlemden seç",
        paragraphs: [
          "Kronoloji zaman sırasına, coğrafya mekân ve insan ilişkilerine, arkeoloji maddi kalıntı ve buluntu bağlamına, paleografya eski yazıya, epigrafi yazıtlara, filoloji dilin yapısı ve tarihî değişimine yardımcı olur. Nümizmatik paraları, heraldik armaları, etnografya gelenek ve yaşayışı inceler. Antropoloji insan topluluklarının biyolojik ve kültürel yönlerini araştırır; yalnız eski bir ırk sınıflaması olarak tanımlanmaz.",
          "Kazıda bulunan bir paranın dolaşımını araştırmak nümizmatik, üzerindeki eski harfleri okumak paleografik iştir. İşlem değişince yardımcı alanın odağı değişebilir. Bir alanın en doğrudan ilgili olması ötekilerin hiçbir katkısı olamayacağı anlamına gelmez. Tarihsel olay aynı koşullarla yeniden yaşatılamasa da belge malzemesinin yaşı veya yapısı bilimsel ölçümle araştırılabilir; bu iş birliği tarihsel olayın laboratuvarda tekrar edildiği demek değildir.",
        ],
      },
      {
        title: "Takvimleri astronomik esas, başlangıç ve amaçla karşılaştır",
        paragraphs: [
          "On İki Hayvanlı Türk takvimi güneş yılı ve on iki yıllık hayvan adları döngüsüyle; hicrî takvim Ay yılı ve hicret başlangıcıyla; Celâlî takvim Melikşah dönemindeki güneş yılı düzeniyle; Rûmî takvim güneş yılına dayanan mali kullanımla; miladi takvim güneş yılı ve günümüzdeki sivil kullanımla ilişkilendirilir. Aynı özelliği paylaşan iki takvim başka alanlarda farklı olabilir.",
          "Ay yılı yaklaşık 354, güneş yılı yaklaşık 365 gün olarak okul düzeyinde karşılaştırılır; gerçek astronomik süreler ve artık gün kuralları daha ayrıntılıdır. Hicrî dinî günlerin miladi mevsimlerde kayması, iki yılın aynı uzunlukta olmamasıyla ilgilidir. Miladi yılın 1 Ocak’ta başlaması yıl içi başlangıç bilgisidir; milat ise dönem sayımının dayanağıdır. Türkiye’de miladi takvimin 1 Ocak 1926’da kullanılmaya başlaması da ayrı bir kabul tarihidir.",
        ],
        table: {
          headers: ["Takvim", "Yıl esası", "Ayırıcı bağ"],
          rows: [
            [
              "On İki Hayvanlı Türk",
              "Güneş",
              "On iki yıllık adlandırma döngüsü",
            ],
            [
              "Hicrî",
              "Ay",
              "Hicret başlangıcı; Hz. Ömer döneminde idari düzenleme",
            ],
            [
              "Celâlî",
              "Güneş",
              "Melikşah dönemi ve Ömer Hayyam başkanlığındaki çalışma",
            ],
            ["Rûmî", "Güneş", "Osmanlı mali kullanımı"],
            [
              "Miladi",
              "Güneş",
              "Sivil yıl; yılbaşı ve dönem başlangıcı ayrı bilgiler",
            ],
          ],
        },
      },
      {
        title: "MÖ ve MS yıllarını aynı tarih şeridinde sırala",
        paragraphs: [
          "Geleneksel tarihsel dizide MÖ 2, MÖ 1, MS 1, MS 2 gelir; yıl 0 bulunmaz. MÖ bölümünde numara küçüldükçe daha sonraki yıla, MS bölümünde büyüdükçe daha sonraki yıla geçilir. MÖ ve MS etiketleri kaldırılıp sayılar tek başına küçükten büyüğe sıralanırsa zaman yönü bozulabilir. Astronomide kullanılan farklı yıl numaralandırması bu dersin tarihsel dizisiyle karıştırılmaz.",
          "İki yılın aynı ay ve günündeki karşılıkları arasında geçen yıllık aralıklar sayılabilir. Aynı tarafta büyük-küçük farkı, miladı aşarken MÖ a ile MS b için a+b−1 aralık bulunur. İki uçtaki yıl etiketleri de dahil sayılıyorsa bu aralık sayısından bir fazla etiket vardır. Ay ve gün verilmeden tarih farkından tam gün veya kişinin kesin yaşı hesaplanamaz.",
        ],
      },
      {
        title: "Yarı ve çeyrek için kronolojik konumu kullan",
        paragraphs: [
          "Bir yüzyıl yüz yıl içerir. İlk yarı zaman sırasındaki ilk 50, ikinci yarı sonraki 50 yıldır; çeyrekler 25’er yıldır. MS 501–600 için ilk çeyrek 501–525, ikinci 526–550, üçüncü 551–575 ve dördüncü 576–600’dür. MÖ 600–501 için ise ilk çeyrek 600–576, ikinci 575–551, üçüncü 550–526 ve dördüncü 525–501’dir.",
          "Bu nedenle MÖ’de sayısal olarak büyük yıl ilk konumlarda bulunabilir. Tam yüzlü yılın hangi sınırı gösterdiğini her zaman dene: MS 600 bir yüzyılın sonu, MÖ 600 ise aynı numaralı yüzyılın kronolojik başlangıcıdır. Yıl 0 içeren 00–99 şeması bu anlatımın 1–100 tarihsel düzeniyle aynı değildir. Kullanılan diziyi ve çeyrek tanımını açıkça belirtmek sınır hatalarını önler.",
        ],
      },
      {
        title: "Dönemlendirme ve araştırma başlığı birer düzenleme aracıdır",
        paragraphs: [
          "Tarih zamana, yere ve konuya göre sınıflanabilir. On altıncı yüzyılda Anadolu ticareti başlığı üç ölçütü birlikte taşır: yüzyıl zaman, Anadolu yer, ticaret konudur. Bir başlığın bir ölçütü içermesi ötekileri dışlamaz. Kaynakta verilen zaman ve yerin kesinlik derecesi de korunur; yaklaşık tarih, kesin gün gibi yazılmaz.",
          "Tarih öncesi ve tarihî çağ ayrımı yazılı belge kullanımına dayanır; yazı bütün toplumlarda aynı anda kullanılmaya başlamaz. İlk, Orta, Yeni ve Yakın Çağ gibi okul dönemlerinin sınırları belirli olaylarla gösterilir; farklı tarihçilik geleneklerinde farklı sınırlar kullanılabilir. Bu etiketler her toplumun bir gecede aynı siyasi, ekonomik ve kültürel duruma geçtiği doğa yasaları değildir.",
        ],
      },
      {
        title: "Yeni kanıt, kapsamı ölçülü biçimde değiştirebilir",
        paragraphs: [
          "Tarihî açıklama kanıt ve yorumun birlikte çalışmasıyla kurulur. Yeni bir belge önceki tarihlemenin bir bölümünü değiştirebilir, bir aktörü ekleyebilir veya iddianın hangi bölge için geçerli olduğunu daraltabilir. Bu, geçmişteki her bilginin keyfî olduğu anlamına gelmez. Değişen kısmı belirleyip öteki kanıtların durumunu da korumak gerekir.",
          "Bir kaydın yokluğu, olayın kesinlikle hiç olmadığına her durumda yeterli değildir; arşivin nasıl oluştuğu ve nelerin korunabildiği araştırılır. Buna karşılık açık karşı kanıt bulunduğunda önceki iddia gerçekten sınırlandırılmalıdır. Sonuç cümlesinde bilinen, olası ve henüz belirlenemeyen alanları ayırmak; bütün ihtimalleri aynı ölçüde doğru saymak değildir.",
        ],
      },
    ],
    examples: [
      {
        title: "Yeni editör notu mu, eski metin mi?",
        prompt:
          "Bir belgenin 2025 tarihli dijital yayımında QR kod sözcüğü görülüyor. Yayımın açıklaması modern editör notlarının özgün metinden ayrı işaretlendiğini söylüyor; öğrenci henüz sözcüğün hangi alanda olduğunu kontrol etmemiş. Bundan eski belgenin bütünüyle sahte olduğu hemen çıkar mı?",
        strategy:
          "Özgün belgeyle modern yayım katmanını önce birbirinden ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "2025’te eklenen not ile eski belgenin özgün metni iki ayrı üretim katmanıdır.",
          },
          {
            label: "Adım 2",
            explanation:
              "QR kod ifadesinin editör notunda mı, özgün metin diye sunulan alanda mı bulunduğu denetlenir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Modern notta bulunması eski belgeyi tek başına sahte yapmaz; özgün metin iddiasında bulunması ise ayrıca köken incelemesi gerektirir.",
          },
        ],
        answer:
          "Önce ifadenin hangi katmana ait olduğu belirlenir; modern sözcükten bütün eski belgenin sahte olduğu doğrudan çıkarılmaz.",
        check:
          "Özgün metne ait olduğu verilmemiş bir notu onun içine taşıdın mı?",
        pitfall:
          "Modern yayımın bütün parçalarını tarihî belgenin aslı saymak.",
      },
      {
        title: "Harf biçimi değil, anlamın değişimi",
        prompt:
          "Araştırmacı aynı kelimenin iki dönemdeki metinlerde hangi anlamlarda kullanıldığını karşılaştırıyor. İki metnin harfleri uzmanlarca önceden okunmuş. Araştırmacının doğrudan sorusu dildeki anlam değişimidir. Hangi yardımcı alan öne çıkar?",
        strategy:
          "Önceden tamamlanan yazı okumasıyla şimdi araştırılan dil değişimini ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Harflerin okunması bu dosyada tamamlanmış bir hazırlık işidir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Yeni soru kelimenin iki dönemdeki anlamıdır; nesnenin yalnız yazılı olması ölçüt değildir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Dilin yapısı ve tarihî değişimiyle ilgilenen filoloji bu araştırmanın doğrudan odağıdır.",
          },
        ],
        answer:
          "Filoloji öne çıkar; paleografyanın katkısı dışlanmaz fakat burada istenen işlem harfleri ilk kez okumak değildir.",
        check:
          "Seçtiğin alanın tanımı anlam değişimini mi, sadece yazı biçimini mi açıklıyor?",
        pitfall:
          "Yazılı metin bulunan her araştırmayı yalnız paleografya saymak.",
      },
      {
        title: "İki tarih aralığının ortak kısmı",
        prompt:
          "Kurmaca bir dosyada aynı belgenin tarihi için bağımsız iki denetim verilmiştir: A denetimi MS 1460–1480, B denetimi MS 1468–1472 aralığını olası buluyor. İki denetimin de geçerli olduğu kabul ediliyor. Ortak tarih aralığı nedir?",
        strategy: "Her iki koşulu birlikte sağlayan yılları seç.",
        steps: [
          {
            label: "Adım 1",
            explanation: "A aralığı 1460’tan 1480’e kadar olan yılları içerir.",
          },
          {
            label: "Adım 2",
            explanation: "B’nin 1468–1472 aralığının tümü A’nın içinde kalır.",
          },
          {
            label: "Adım 3",
            explanation:
              "İki koşula birden uyan aralık 1468–1472’dir; tek bir kesin yıl seçilemez.",
          },
        ],
        answer:
          "MS 1468–1472 ortak olası aralıktır; bu beş yıl içinden tek tarih belirlenmiş değildir.",
        check:
          "Seçtiğin aralığın her yılı iki denetimde de var mı; dışarıda kalan yılı ekledin mi?",
        pitfall:
          "İki aralığı birleştirip daha geniş sonucu, ikisinin ortak koşulu sanmak.",
      },
      {
        title: "Yaklaşık yıl farkından yön bulma",
        prompt:
          "Yalnız öğretim için her güneş yılını 365, her Ay yılını 354 gün kabul eden basit modelde, başlangıçta aynı güne denk gelen bir Ay takvimi günü ikinci tekrarında güneş yılına göre hangi yönde ve yaklaşık kaç gün kayar? Gerçek takvim dönüşümü istenmiyor.",
        strategy:
          "Modelin açık yuvarlamasını kullan; sonucu gerçek ay ve güne çevirmeye çalışma.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Her tekrar için model farkı 365−354=11 gündür.",
          },
          {
            label: "Adım 2",
            explanation: "İki tekrarda toplam fark 2×11=22 gün olur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Daha kısa Ay yılı nedeniyle ilgili gün güneş yılına göre yaklaşık 22 gün daha erken gelir.",
          },
        ],
        answer:
          "Bu basit modelde yaklaşık 22 gün daha erken; gerçek tarih için artık gün, ay ve gözlem ayrıntıları gerekir.",
        check:
          "Kısalan takvimdeki tekrarın daha erken gelmesiyle farkın işareti uyumlu mu?",
        pitfall:
          "Yaklaşık 22 günü bütün yıllarda gerçek takvim dönüşümünün kesin sonucu saymak.",
      },
    ],
    recall: [
      {
        prompt:
          "Kaynağın yazılı olması onun mutlaka birinci el olduğunu gösterir mi?",
        answer:
          "Hayır. Biçim ile araştırılan olaya ilişki ayrı eksenlerdir; sonraki araştırma da yazılıdır.",
      },
      {
        prompt: "Tasnif, tenkit ve terkip hangi farklı işleri anlatır?",
        answer:
          "Sınıflama; köken ve içeriği güvenilirlik bakımından sınama; denetlenmiş bulguları tutarlı açıklamada birleştirme.",
      },
      {
        prompt:
          "Bir belgenin gerçek olması içindeki her iddianın doğru olduğunu gösterir mi?",
        answer:
          "Hayır. Dış tenkitte özgünlük, iç tenkitte iddianın tanıklığı, amacı ve başka kanıtlarla uyumu ayrı incelenir.",
      },
      {
        prompt: "MÖ 1’den sonra hangi tarihsel yıl gelir?",
        answer: "MS 1 gelir; bu geleneksel dizide yıl 0 yoktur.",
      },
      {
        prompt:
          "MS 600 ile MÖ 600 kendi yüzyıllarında aynı kronolojik konumda mıdır?",
        answer:
          "Hayır. MS 600 son yıldır; MÖ 600 ise MÖ 600–501 aralığının kronolojik ilk yılıdır.",
      },
      {
        prompt:
          "Takvimde yıl esası, yılbaşı ve dönem başlangıcı neden ayrı tutulur?",
        answer:
          "Gök hareketi, yıl içindeki başlangıç günü ve yılların sayıldığı tarihsel dayanak farklı özelliklerdir; biri diğerini tek başına belirlemez.",
      },
    ],
    items: [
      {
        passage:
          "Bir araştırmanın başlığı “On altıncı yüzyılda Anadolu’da ticaret yolları”dır. Öğretim tanımında zamana göre sınıflama dönemle, yere göre sınıflama coğrafyayla, konuya göre sınıflama incelenen faaliyetle ilişkilendirilmiştir.",
        prompt:
          "Başlıktaki üç sınıflama alanı hangi seçenekte doğru ayrılmıştır?",
        options: [
          "On altıncı yüzyıl zaman; Anadolu yer; ticaret yolları konudur.",
          "On altıncı yüzyıl yer; Anadolu konu; ticaret yolları zamandır.",
          "Anadolu zaman; ticaret yolları yer; on altıncı yüzyıl konudur.",
          "Başlık yer içerdiği için zaman ve konu sınıflaması yapılamaz.",
          "Başlık konu içerdiği için tek başına bütün tarih dönemlerini kapsar.",
        ],
        steps: [
          "Başlığın dönem, coğrafya ve faaliyet sözlerini ayrı işaretle.",
          "Yüzyılı zamana, Anadolu’yu yere, ticaret yollarını araştırma konusuna bağla.",
          "Birden fazla ölçütün aynı başlıkta bulunabileceğini koru.",
        ],
        reasons: [
          "Üç ifade gövdedeki dönem-coğrafya-faaliyet tanımlarıyla doğru eşleşir.",
          "Dönem ile coğrafya ve konu alanlarını yer değiştirmiştir.",
          "Anadolu bir zaman aralığı, yüzyıl da bir faaliyet konusu değildir.",
          "Sınıflama ölçütleri aynı başlıkta birlikte bulunabilir; biri ötekini dışlamaz.",
          "Belirli bir konunun bulunması başlıkta açıkça verilen yüzyıl sınırını kaldırmaz.",
        ],
        knowledge:
          "Tarih zamana, yere ve konuya göre sınıflanabilir; aynı araştırma bu üç alanı birlikte taşıyabilir.",
        strategy: "Başlıktaki her parçanın neyi sınırladığını ayrı tanımla.",
        error:
          "Bir ölçütün varlığını öteki sınıflama alanlarının yokluğu sanmak.",
        check: "Üç parçanın her biri kendi tanımına karşılık geliyor mu?",
      },
      {
        passage:
          "2020’de yayımlanmış bir tarih ders kitabı, 1500’lerdeki bir savaşı sonradan araştırıp anlatıyor. Bir ekip o savaşı, başka bir ekip ise 2020’de tarih eğitiminin nasıl sunulduğunu inceliyor. İkinci ekip kitabın kendisini doğrudan inceleme nesnesi olarak kullanıyor.",
        prompt:
          "Aynı kitabın iki araştırmadaki konumu için hangi açıklama uygundur?",
        options: [
          "Savaş araştırmasında sonraki yorum, 2020 tarih eğitimi araştırmasında doğrudan inceleme nesnesi olabilir.",
          "Bir kitap bir kez ikinci el sayıldıysa hiçbir başka araştırmada doğrudan kaynak olamaz.",
          "2020’de basılması, kitabı 1500’lerdeki savaşın bizzat tanığı yapar.",
          "İkinci ekibin konusu değiştiği için kitabın yayımlandığı tarih de değişir.",
          "Kaynak konumu soruya bağlıysa kitabın her iddiasının doğru olması zorunludur.",
        ],
        steps: [
          "İki araştırmanın konularını savaş ve 2020 tarih eğitimi olarak ayır.",
          "Kitap savaştan sonra yazılmış yorumdur; kendi dönemindeki eğitim anlayışı için doğrudan incelenir.",
          "Değişenin kitabın tarihi değil araştırmayla ilişkisi olduğunu koru.",
        ],
        reasons: [
          "Kaynağın araştırılan konuyla ilişkisi değiştiğinden verilen iki konum birlikte mümkündür.",
          "Birinci/ikinci el ayrımı araştırma sorusuna göre yapılır; nesneye her bağlamda sabitlenmez.",
          "Sonraki basım tarihi doğrudan savaş tanıklığı oluşturmaz.",
          "Araştırma sorusunun değişmesi kitabın gerçek basım tarihini değiştirmez.",
          "Kaynak konumu içerikteki bütün iddiaların doğruluk garantisi değildir.",
        ],
        knowledge:
          "Bir kaynağın birinci veya ikinci el konumu, araştırılan olay ve soruyla ilişkisine bağlıdır.",
        strategy: "Aynı nesneyi iki farklı araştırma sorusuna ayrı ayrı bağla.",
        error:
          "Kaynak konumunu araştırma sorusundan bağımsız değişmez bir nesne etiketi saymak.",
        check:
          "Kitabın sabit tarihiyle değişen araştırma ilişkisini ayırdın mı?",
      },
      {
        passage:
          "Bir kentte 1930’daki bir töreni araştıran ekip, tören sırasında çekilmiş fotoğrafla fotoğrafı 2025’te yorumlayan makaleyi kullanıyor. Fotoğraf görsel, makale yazılıdır; ekip bunların olayla zaman ve tanıklık ilişkisini de ayrıca sınıflıyor.",
        prompt: "Hangi eşleştirme iki sınıflama eksenini birlikte korur?",
        options: [
          "Fotoğraf görsel/doğrudan tanıklık; makale yazılı/sonraki araştırma niteliğindedir.",
          "Fotoğraf görsel olduğu için zorunlu olarak ikinci el; makale yazılı olduğu için zorunlu olarak birinci eldir.",
          "Fotoğraf ve makale aynı olayla ilgili olduğundan biçimleri de aynıdır.",
          "Yazılılık ile doğrudan tanıklık eş anlamlı olduğundan makale tek doğrudan kaynaktır.",
          "Kaynaklardan biri görsel ise ötekinin olayla ilişkisi araştırılamaz.",
        ],
        steps: [
          "Biçim alanında görsel fotoğrafı ve yazılı makaleyi ayrı tut.",
          "Olay sırasındaki kayıtla sonraki yorumu tanıklık ilişkisi bakımından karşılaştır.",
          "Biçimi tanıklık konumunun yerine koymayan çift eşleştirmeyi seç.",
        ],
        reasons: [
          "Hem biçim hem araştırılan olayla ilişki iki kaynak için doğru ayrılmıştır.",
          "Görsel/yazılı biçimler tek başına birinci/ikinci el ilişkisini belirlemez.",
          "Ortak olay iki farklı kaynak biçimini özdeşleştirmez.",
          "Yazılılık doğrudan tanıklıkla eş anlamlı değildir; makale sonraki yorumdur.",
          "Bir kaynağın biçimi diğer kaynağın köken ve konu ilişkisinin araştırılmasını engellemez.",
        ],
        knowledge:
          "Kaynak biçimi ile araştırılan olaya doğrudanlık, birlikte kullanılabilen ayrı sınıflama alanlarıdır.",
        strategy:
          "Her kaynak için biçim ve ilişkiyi iki farklı sütunda doldur.",
        error:
          "Görseli otomatik ikinci el, yazılıyı otomatik birinci el saymak.",
        check: "Eşleştirmende hem kaynak biçimi hem olayla ilişki doğru mu?",
      },
      {
        passage:
          "Bir tarihçi önce farklı arşivlerde araştırmasına uygun belgeleri arıyor. Sonra bulduklarını yer, zaman ve konu başlıklarıyla grupluyor. Öğretim tanımında tarama kaynak arama, tasnif kaynakları sınıflama işlemidir.",
        prompt: "Tarihçinin ilk ve ikinci işlemleri sırasıyla hangileridir?",
        options: [
          "Tarama ve tasnif.",
          "Tasnif ve tarama.",
          "Tenkit ve terkip.",
          "Terkip ve tahlil.",
          "Tahlil ve tenkit.",
        ],
        steps: [
          "İlk eylemi belge arama, ikinciyi bulunanları gruplama olarak ayır.",
          "Aramayı tarama, gruplamayı tasnif tanımıyla eşleştir.",
          "Sınıflamanın tek başına güvenilirlik denetimi veya sentez olmadığını kontrol et.",
        ],
        reasons: [
          "İki fiil gövdede verilen tarama ve tasnif tanımlarıyla bu sırada eşleşir.",
          "Arama ve sınıflama sırası ters çevrilmiştir.",
          "Gövde ilk adımda güvenilirlik sınaması, ikincide sentez kurma vermemektedir.",
          "Açıklama birleştirme ve içerik çözümleme bu iki eylemin tanımı değildir.",
          "İçeriği çözümleme ve güvenilirlik sınama, verilen arama-gruplama fiillerinin yerine geçmez.",
        ],
        knowledge:
          "Tarama kaynakları bulmaya, tasnif bulunan malzemeyi ölçütlere göre düzenlemeye yönelir.",
        strategy:
          "İşlemi adına göre tahmin etmek yerine tarihçinin fiilen yaptığı işi tanımla.",
        error:
          "Belgeyi bulma, sınıflama ve güvenilirliğini sınama işlemlerini aynı aşama saymak.",
        check:
          "İlk işlem henüz kaynak arıyor mu, yoksa bulunmuş içeriği mi denetliyor?",
      },
      {
        passage:
          "Bir araştırmacı belgelerin içeriklerini çözümlüyor, sonra köken ve güvenilirliklerini denetliyor. Son aşamada denetlenmiş bulgularını tutarlı bir açıklamada birleştiriyor. Dosya, yeni belge bulunduğunda önceki işlemlere dönülebildiğini ayrıca belirtiyor.",
        prompt: "Son aşamadaki birleştirme hangi işlemle ilişkilidir?",
        options: [
          "Terkip; önceki işlemlere geri dönülemeyeceği anlamına gelmez.",
          "Tarama; çünkü yalnız yeni belge bulmak açıklamayı tamamlamış sayılır.",
          "Tasnif; çünkü açıklama kurmak yalnız dosyaları rafa dizmektir.",
          "Dış tenkit; çünkü bütün içerikleri tek başına malzeme yaşı belirler.",
          "Tahlil; çünkü tutarlı bütünü kurmak hiçbir ayrıntının birleştirilmesini gerektirmez.",
        ],
        steps: [
          "Sorulan son eylemi denetlenmiş bulguları açıklamada birleştirmek olarak belirle.",
          "Bu eylem terkip yani sentezle ilişkilidir; önceki içerik ve güvenilirlik işleri ayrı durur.",
          "Dosyanın geri dönüşe izin veren çalışma düzenini de koru.",
        ],
        reasons: [
          "Terkip denetlenmiş bulguların tutarlı açıklamada birleştirilmesidir; süreç gerektiğinde yeniden açılabilir.",
          "Kaynak arama taramadır; gövdede son aşamada yeni belge bulma değil birleştirme anlatılır.",
          "Tasnif sınıflamadır; tutarlı açıklama kurmanın bütün işlevi bununla özdeş değildir.",
          "Belge malzemesini denetlemek içerikteki bütün açıklamayı tek başına kurmaz.",
          "Tahlil içeriği çözümlemeye, terkip parçaları açıklamada birleştirmeye yönelir.",
        ],
        knowledge:
          "Tahlil, tenkit ve terkip farklı düşünme işleridir; araştırma gerektikçe önceki işlemlere dönebilir.",
        strategy:
          "Sorulan eylemi sonucun hangi aşamada üretildiğine göre ayır.",
        error:
          "Araştırmayı geri dönüşü olmayan katı beş basamak veya yalnız belge toplama saymak.",
        check:
          "Seçtiğin tanım parçalara ayırmayı mı, denetlenmiş bulguları birleştirmeyi mi anlatıyor?",
      },
      {
        passage:
          "Bir belgenin kâğıdı, mürekkebi ve imzası iddia edilen döneme ait bulunuyor. Belgenin yazarı aynı zamanda olayın tarafıdır. Araştırmacı şimdi yazarın iddialarını bağımsız içerik kayıtlarıyla karşılaştırmak istiyor.",
        prompt: "Araştırmacının yeni çalışmasının gerekçesi hangisidir?",
        options: [
          "Kökenin doğrulanması, içerikteki her iddianın doğruluğunu tek başına garanti etmez.",
          "İmza gerçekse yazarın her cümlesi eleştiriden muaf olur.",
          "Yazar taraf olduğu için belgenin malzemesinin o döneme ait olması imkânsızdır.",
          "İçerik karşılaştırması yapılması belgenin bütününün önceden sahte ilan edildiğini gösterir.",
          "Bağımsız kayıt kullanmak, ilk belgenin araştırmada hiçbir bilgi sağlayamayacağı anlamına gelir.",
        ],
        steps: [
          "Tamamlanan denetimin malzeme ve imza yani köken alanında olduğunu belirle.",
          "Yeni işin yazarın içerik iddialarını başka verilerle karşılaştırmak olduğunu ayır.",
          "Özgünlük ile içerik doğruluğunu iki ayrı değerlendirme olarak koru.",
        ],
        reasons: [
          "Gerçek bir belge de taraflı veya hatalı iddia taşıyabilir; bu nedenle içerik ayrıca sınanır.",
          "Gerçek imza iddiaların doğruluk garantisi değildir.",
          "Taraf olmak ile döneme ait gerçek malzeme kullanmak birbiriyle çelişmez.",
          "Denetim yapmak sahtecilik hükmünü önceden vermek değildir.",
          "Karşılaştırma belgenin değerini sıfırlamak zorunda değildir; hangi iddianın desteklendiğini ayırır.",
        ],
        knowledge:
          "Dış tenkitte köken ve özgünlük; iç tenkitte iddiaların güvenilirliği ve başka kanıtlarla uyumu incelenir.",
        strategy:
          "Tamamlanan köken incelemesinden içerik hükmüne kanıtsız sıçrama yapma.",
        error: "Gerçek belgeyi içindeki her cümlenin doğruluk belgesi saymak.",
        check:
          "İmzanın gerçekliği dışında içerikteki iddiayı destekleyen veri var mı?",
      },
      {
        passage:
          "Bir laboratuvar belgedeki boya ve liflerin özelliklerini ölçüyor. Tarihçi bu ölçümü belgenin kökenini araştırırken kullanıyor. Tarihî olayın kendisinin aynı insanlarla ve aynı koşullarla laboratuvarda yeniden yaşatıldığı söylenmiyor.",
        prompt: "Bu çalışma için hangi yorum doğrudur?",
        options: [
          "Tarih araştırması bilimsel malzeme ölçümünden yararlanabilir; bu, olayın kendisini tekrar etmek değildir.",
          "Tarihte olay tekrar edilemediği için belgeye hiçbir laboratuvar ölçümü uygulanamaz.",
          "Lif ölçümü yapılması geçmişteki bütün insan kararlarının deneyle yeniden üretildiğini gösterir.",
          "Malzeme ölçümü tarihçinin kaynak eleştirisi yapmasını gereksiz kılar.",
          "Laboratuvar kullanılması araştırmanın belgeyle hiçbir ilişkisi olmadığını gösterir.",
        ],
        steps: [
          "Ölçülen şeyin geçmiş olay değil, bugün elde bulunan belge malzemesi olduğunu ayır.",
          "Malzeme ölçümü köken araştırmasına veri sağlar; insan kararlarını aynı koşullarla yeniden yaşatmaz.",
          "Disiplinler arası yardımla olayın tekrarı arasındaki farkı koru.",
        ],
        reasons: [
          "Çalışmada bugünkü nesne ölçülüyor ve tarihî kaynak incelemesine veri sağlanıyor.",
          "Olayın tekrarlanamaması eldeki malzemenin bilimsel yöntemlerle araştırılmasını engellemez.",
          "Lif ölçümü geçmiş insanların bütün kararlarını yeniden oluşturmaz.",
          "Ölçüm kaynak eleştirisinin bir verisidir; amaç, içerik ve bağlam denetiminin yerine geçmez.",
          "Gövde ölçümün doğrudan belge malzemesi üzerinde yapıldığını söylemektedir.",
        ],
        knowledge:
          "Tarihî olayı aynı koşullarda tekrar etmekle eldeki kalıntı ve malzemeyi bilimsel yöntemle incelemek farklıdır.",
        strategy: "Deneyin veya ölçümün nesnesini açıkça belirle.",
        error:
          "Olayın tekrarlanamamasını hiçbir bilimsel ölçüm kullanılamaması diye genişletmek.",
        check:
          "Laboratuvarda ölçülen nesne ile açıklanan geçmiş olay aynı şey mi?",
      },
      {
        passage:
          "Bir limanda önce yeni fener yapılmış, sonraki yıl ticaret hacmi artmıştır. Kayıt fenerin hangi gemilerin geçişini etkilediğini, vergi veya güvenlik koşullarının değişip değişmediğini henüz bildirmiyor. Araştırmacı fenerin ticarete katkısını sınamak istiyor.",
        prompt: "Yalnız bu kayıtla hangi sonuç kurulabilir?",
        options: [
          "İki gelişmenin sırası belirlenir; ticaret artışının tek nedeninin fener olduğu ayrıca kanıtlanmalıdır.",
          "Önce gelme, fenerin artışın tek ve yeterli nedeni olduğunu ispatlar.",
          "Ticaret sonra arttığından fenerin hiçbir katkısı bulunamayacağı kesinleşir.",
          "Neden henüz belirlenmediği için olayların hangi sırada olduğu da bilinemez.",
          "İki olayın aynı limanda olması aralarında her türlü araştırma bağını imkânsızlaştırır.",
        ],
        steps: [
          "Kayıttaki açık bilgiyi fenerin önce, artışın sonra gelmesi olarak belirle.",
          "Katkı mekanizması ve başka koşullar henüz verilmemiş; tek neden hükmüne geçme.",
          "Sıra bilgisini koruyup nedensel açıklamayı ek araştırmaya açık tut.",
        ],
        reasons: [
          "Zaman sırası açıktır; tek neden iddiası için gereken mekanizma ve kapsam bilgisi eksiktir.",
          "Ardışıklık tek ve yeterli nedenin ispatı değildir.",
          "Kanıt eksikliği katkının imkânsızlığını da tek başına göstermez.",
          "Nedenin belirsizliği açıkça verilen zaman sırasını ortadan kaldırmaz.",
          "Ortak liman araştırma bağını engellemez; hangi bağın desteklendiği ayrıca incelenebilir.",
        ],
        knowledge:
          "Kronoloji nedensel açıklamayı düzenler; ardışıklık tek başına zorunlu veya tek neden kanıtı değildir.",
        strategy:
          "Sıra bilgisini katkı ve tek neden iddialarından ayrı değerlendir.",
        error: "Önce oldu ifadesini yalnız bu yüzden oldu hükmüne çevirmek.",
        check:
          "Mekanizma veya başka etkenlerin yokluğu kayıtla gösterilmiş mi?",
      },
      {
        passage:
          "Bir araştırmacı geçmişteki bir yöneticinin kararını o dönemin haberleşme araçları, bilgi kaynakları ve seçenekleri içinde anlamaya çalışıyor. Araştırma, kararın bütün sonuçlarını ahlaken doğru kabul ettiğini söylemiyor.",
        prompt: "Bu yaklaşım hangi ayrımı korur?",
        options: [
          "Tarihsel koşulları anlamaya çalışmak ile davranışı ahlaken onaylamak farklıdır.",
          "Dönemin koşullarını incelemek bütün davranışları onaylamayı zorunlu kılar.",
          "Bugünkü bütün araçların geçmişte de var olduğunu kabul etmek gerekir.",
          "Kararın sonuçlarını değerlendirmek için dönemin bilgi koşulları araştırılamaz.",
          "Tarihsel empati, kaynağa başvurmadan yöneticinin gizli niyetini kesin bilmek demektir.",
        ],
        steps: [
          "Araştırmanın hedefini dönemin bilgi ve seçeneklerini anlamak olarak belirle.",
          "Anlama işlemi ahlaki onayla aynı hüküm olarak verilmemiş.",
          "Geçmişe bugünün imkânlarını taşımadan bu iki değerlendirmeyi ayrı tut.",
        ],
        reasons: [
          "Gövde koşullar içinde anlamayı anlatır ve bunu ahlaki onayla özdeşleştirmez.",
          "Anlamak, her davranışı doğru bulmayı zorunlu kılmaz.",
          "Bugünkü araçları geçmişte var saymak anakronizme yol açabilir.",
          "Dönemin bilgi koşulları kararın bağlamını araştırmada kullanılabilir.",
          "Empati kaynak gereğini veya niyet hakkındaki belirsizliği ortadan kaldırmaz.",
        ],
        knowledge:
          "Tarihsel empati dönemin koşullarını anlamaya yönelir; ahlaki onay veya kanıtsız niyet okuması değildir.",
        strategy:
          "Araştırmanın açıklama hedefiyle değer hükmünü aynı işlem sayma.",
        error:
          "Dönem koşullarını anlamayı davranışın bütün sonuçlarını onaylamakla eşitlemek.",
        check:
          "Sonucun araştırmacının açık hedefini mi, verilmemiş onayını mı söylüyor?",
      },
      {
        passage:
          "Bir taş yazıt üzerinde iki iş yürütülüyor. K işlemi eski harflerin biçimini çözerek metni okuyor. L işlemi yazıtı bir tarihsel kitabe olarak bütün bağlamıyla inceliyor. Öğretim tanımında paleografya eski yazıyla, epigrafi yazıtlarla ilgilidir.",
        prompt: "K ve L’nin doğrudan odakları hangi eşleştirmeyle ayrılır?",
        options: [
          "K paleografya, L epigrafi.",
          "K epigrafi, L nümizmatik.",
          "K kronoloji, L paleografya.",
          "K etnografya, L heraldik.",
          "K nümizmatik, L kronoloji.",
        ],
        steps: [
          "K’nin fiilini harfleri okuyup çözmek, L’ninkini yazıtı bütün olarak incelemek diye ayır.",
          "Verilen tanımları bu iki işlemle eşleştir.",
          "Aynı taş üzerinde farklı odakların birlikte bulunabileceğini koru.",
        ],
        reasons: [
          "K eski yazıyı okuma, L yazıt inceleme odağıyla verilen tanımlara uyar.",
          "K’nin özel fiili eski harfleri okumaktır; L para incelemesi olarak verilmemiştir.",
          "K zaman sırasını kurmuyor, harfleri okuyor; L de yalnız yazı biçimine indirgenmemiştir.",
          "Gelenek ve arma incelemesi bu iki işlemin tanımı değildir.",
          "Para ve zaman sırası, verilen yazı okuma-yazıt inceleme fiillerini karşılamaz.",
        ],
        knowledge:
          "Paleografik yazı okuması ile epigrafik yazıt incelemesi aynı nesne üzerinde farklı odaklarla yürütülebilir.",
        strategy:
          "Nesnenin taş oluşundan önce her uzmanın yaptığı işi tanımla.",
        error:
          "Aynı nesne üzerinde çalışan alanların bütün işlemlerini aynı saymak.",
        check:
          "Seçtiğin her alan K ve L için verilen özel fiili karşılıyor mu?",
      },
      {
        passage:
          "Bu soruda geleneksel tarihsel yıl dizisi kullanılıyor. İkinci yüzyıl MS 101–200; MÖ ikinci yüzyıl ise zamanın akışında MÖ 200’den MÖ 101’e uzanır. İlk yıl, belirtilen yüzyılın kronolojik ilk yılı anlamındadır.",
        prompt:
          "MS 101 ile MÖ 101’in kendi ikinci yüzyıllarındaki konumu hangisinde doğru verilmiştir?",
        options: [
          "MS 101 ilk, MÖ 101 son yıldır.",
          "İkisi de ilk yıldır.",
          "İkisi de son yıldır.",
          "MS 101 son, MÖ 101 ilk yıldır.",
          "Yıl numaraları aynı olduğundan aynı tarihsel yıldır.",
        ],
        steps: [
          "MS aralığının 101’den 200’e, MÖ aralığının 200’den 101’e aktığını izle.",
          "101 etiketinin MS’de başlangıca, MÖ’de sona denk geldiğini belirle.",
          "Ortak sayıdan aynı kronolojik konum veya aynı tarih sonucu çıkarma.",
        ],
        reasons: [
          "Verilen iki akış yönünde 101’in yeri bu şekilde ayrılır.",
          "MÖ 101, MÖ 200–101 dizisinin başlangıcı değil sonudur.",
          "MS 101, MS 101–200 dizisinin sonu değil başlangıcıdır.",
          "İki akışın konumları ters yazılmıştır.",
          "MÖ ve MS tarafları farklı olduğundan aynı numara aynı tarih değildir.",
        ],
        knowledge:
          "MÖ ve MS yüzyıllarında kronolojik ilerleme yönü farklıdır; aynı sayı aynı konumu göstermez.",
        strategy:
          "Yılın kendi yüzyılındaki baştan sona yönünü açık aralık üzerinde izle.",
        error:
          "MÖ ile MS etiketlerini kaldırarak yılın yüzyıldaki konumunu aynı sanmak.",
        check:
          "İlk sözcüğünü sayısal küçüklük mü, zaman sırası mı olarak kullandın?",
      },
      {
        passage:
          "Bu soruda MS 1701–1800 bir yüzyıl olarak, ilk çeyrek 1701–1725 ve ikinci çeyrek 1726–1750 olarak tanımlanmıştır. Yarılar 50’şer, çeyrekler 25’er yıl içerir.",
        prompt: "MS 1725 ve MS 1726 için hangi karşılaştırma doğrudur?",
        options: [
          "Aynı ilk yarıdadırlar;1725 ilk,1726 ikinci çeyrektedir.",
          "Farklı yüzyıllardadırlar.",
          "İkisi de ikinci çeyrektedir.",
          "1725 ikinci yarıda,1726 ilk yarıdadır.",
          "Çeyrek değiştiği için aralarına bir yıl 0 eklenir.",
        ],
        steps: [
          "İlk yarının 1701–1750 olduğunu, iki çeyreğin 1725/1726 sınırında ayrıldığını yaz.",
          "İki yılı kendi çeyrek aralıklarına yerleştir.",
          "Çeyrek değişiminin yüzyıl veya yarı değişimini zorunlu kılmadığını denetle.",
        ],
        reasons: [
          "İki yıl 1701–1750 ilk yarısındadır; verilen çeyrek sınırı onları ayırır.",
          "İki yıl da açıkça 1701–1800 aralığındadır.",
          "1725 ilk çeyreğin son yılı olarak tanımlanmıştır.",
          "İki yıl da ilk yarıdadır;1725’i ikinci yarıya taşıma veriyi bozar.",
          "Çeyrek sınırı tarihsel diziye yeni bir yıl eklemez; yıl 0 yoktur.",
        ],
        knowledge:
          "Çeyrek sınırı geçildiğinde her zaman yarı veya yüzyıl değişmez.",
        strategy:
          "Yüzyıl, yarı ve çeyrek aralıklarını aynı ölçekte ayrı denetle.",
        error:
          "Bir çeyrek değişimini zorunlu olarak yeni yarı veya yüzyıl başlangıcı sanmak.",
        check: "İki yılın da ilk 50 yıl içinde kaldığını kontrol ettin mi?",
      },
      {
        passage:
          "MÖ üçüncü yüzyıl bu soruda zaman sırasıyla 300’den 201’e uzanıyor. İlk 25 yıl 300–276, sonraki 25 yıl 275–251 aralığıdır. İlk ve ikinci, sayının büyüklüğüne değil zaman sırasına göre kullanılıyor.",
        prompt: "MÖ 276 ile MÖ 275 için hangi yerleştirme uygundur?",
        options: [
          "276 ilk çeyreğin sonu,275 ikinci çeyreğin başlangıcıdır.",
          "276 ikinci çeyreğin,275 ilk çeyreğin başlangıcıdır.",
          "İki yıl da ilk çeyrek dışındadır.",
          "275 sayısı daha küçük olduğu için 276’dan daha eski olmalıdır.",
          "İki yıl arasına farklı bir milat dönemi girmelidir.",
        ],
        steps: [
          "MÖ akışını 300’den 201’e doğru izle;276’dan sonra 275 gelir.",
          "Verilen 25’er yıllık aralıklarda 276’yı ilk grubun sonuna,275’i ikinci grubun başına yerleştir.",
          "Sınırın yalnız çeyreği değiştirdiğini, MÖ tarafını veya yüzyılı değiştirmediğini kontrol et.",
        ],
        reasons: [
          "İki yıl, gövdede verilen komşu çeyrek aralıklarının sınırındadır.",
          "İki yılın aralıkları ve kronolojik konumları ters yazılmıştır.",
          "276 ilk çeyrek aralığında açıkça bulunur.",
          "MÖ’de sayı küçüldükçe daha sonraki yıla ilerlenir.",
          "İki yıl da aynı MÖ yüzyılındadır; milat sınırı aralarında değildir.",
        ],
        knowledge:
          "MÖ’de çeyrekler büyük yıl numarasından küçüğe ilerleyen kronolojik sıraya göre belirlenir.",
        strategy:
          "Çeyrek sınırlarını zaman akışı yönünde say; sayı küçüklüğünü eskilik yerine kullanma.",
        error:
          "MÖ çeyreklerini MS yönünde okuyarak sınır yıllarını ters yerleştirmek.",
        check: "276’dan sonra hangi yıl geldiğini doğru yönde gösterdin mi?",
      },
      {
        passage:
          "Bir karşılaştırma kartı hicrî takvimi Ay yılı, Rûmî takvimi ise güneş yılına dayanan mali kullanım örneği olarak veriyor. Kart, hicretle bağlantılı dönem başlangıcının tek başına yılın astronomik esasını belirlemediğini söylüyor.",
        prompt: "Karttaki karşılaştırma hangi sonucu destekler?",
        options: [
          "Başlangıç olayıyla yıl esası ayrı özelliklerdir; Rûmîyi yalnız hicret bağı yüzünden Ay esaslı sayamayız.",
          "Hicretle ilişkilendirilen her takvim zorunlu olarak aynı uzunlukta Ay yılı kullanır.",
          "Mali amaçla kullanılan bir takvimin güneş esaslı olması imkânsızdır.",
          "İki takvim aynı toplumda kullanılmışsa bütün kuralları aynıdır.",
          "Yıl esası bilindiğinde başlangıç ve kullanım amacı da otomatik olarak aynılaşır.",
        ],
        steps: [
          "Kartta yıl esaslarının Ay ve güneş olarak ayrı verildiğini işaretle.",
          "Başlangıç ilişkisinin bu ayrımı tek başına değiştirmediğini koru.",
          "Rûmîyi hicrîyle aynı astronomik esaslı sayan genellemeyi reddet.",
        ],
        reasons: [
          "Kartın iki bağımsız özellik olarak verdiği başlangıç ve yıl esası korunur.",
          "Kart Rûmîyi güneş esaslı örnek vererek bu zorunluluk iddiasını sınırlar.",
          "Gövde Rûmîyi güneş yılı ve mali kullanımla açıkça ilişkilendirir.",
          "Ortak toplum farklı amaç ve kurallardaki takvimleri birlikte kullanabilir.",
          "Yıl esası, başlangıç ve amaç birbirinin bütün bilgisini otomatik vermez.",
        ],
        knowledge:
          "Takvimlerin gök hareketi esası, dönem başlangıcı ve kullanım amacı bağımsız karşılaştırma alanlarıdır.",
        strategy:
          "Takvimleri ortak tek özelliğe göre değil her verilen sütuna göre denetle.",
        error: "Hicret başlangıcını bütün takvimlerde Ay yılına eşitlemek.",
        check: "Rûmî için kartta açıkça verilen güneş koşulunu korudun mu?",
      },
      {
        passage:
          "Bir dönemlendirme çalışması, A bölgesinde yazılı belgelerin kullanıldığı sırada B bölgesinde henüz yazılı belge bulunmadığını bildiriyor. Çalışma tarihî çağlara geçişi ilgili toplumun yazılı belge kullanımıyla ilişkilendiriyor; bütün toplumların aynı yılda geçtiğini söylemiyor.",
        prompt: "Bu çalışma hangi dönemlendirme ilkesini destekler?",
        options: [
          "Yazılı belgeye dayalı tarihî dönem sınırı bölgelere göre farklılaşabilir.",
          "Aynı takvim yılında bütün toplumlar mutlaka aynı tarihsel dönem etiketini taşır.",
          "Yazılı belge bulunmayan toplumun hiçbir kültürü veya kuralı olamaz.",
          "A’da yazı bulunduğu için B’deki bütün maddi kalıntılar geçersizdir.",
          "B’de yazı bulunmaması A’daki yazının da var olmadığını kanıtlar.",
        ],
        steps: [
          "A ve B için yazılı belge durumunun farklı verildiğini belirle.",
          "Kullanılan dönem ölçütünü ilgili toplumun yazılı kaydı olarak koru.",
          "Bir bölgenin durumunu ötekine veya kültürün bütünüyle yokluğuna genelleme.",
        ],
        reasons: [
          "Gövde aynı sırada farklı yazılı belge durumlarıyla yerel dönem sınırlarının ayrılabildiğini verir.",
          "Çalışma eş zamanlı zorunlu geçişi açıkça ileri sürmemiştir.",
          "Yazı yokluğu kültür, toplumsal kural veya maddi birikim yokluğu değildir.",
          "B’nin maddi kalıntıları yazılı belge olmasa da tarih öncesini araştırmada kullanılabilir.",
          "İki bölgenin belge durumu birbirinin varlığını mantıken ortadan kaldırmaz.",
        ],
        knowledge:
          "Dönemlendirme ölçütleri, bütün toplumların aynı anda aynı aşamayı yaşadığı evrensel bir sıra değildir.",
        strategy: "Kullanılan ölçütü ve her bölgenin açık verisini ayrı tut.",
        error:
          "Bir toplumun dönem sınırını aynı yılda bütün dünyaya uygulamak.",
        check:
          "A’daki ve B’deki açık belge durumlarını birbirine dönüştürdün mü?",
      },
    ],
  },
  {
    id: "insanligin-ilk-donemleri",
    topic: "detail-227",
    title: "İnsanlığın ilk dönemleri: yerleşimden yazıya",
    minutes: 190,
    objectives: [
      "Üretim, yerleşme, uzmanlaşma ve yönetim ilişkisini açıkla.",
      "Medeniyetleri coğrafi koşullarıyla karşılaştır.",
      "Yazı ve hukukun etkilerini kanıt sınırları içinde yorumla.",
    ],
    sections: [
      {
        title: "Araçtan yaşam biçimine çıkarım yap",
        paragraphs: [
          "İlk toplulukların yaşamını taş alet, kemik, barınak, tohum ve insan kalıntıları üzerinden araştırırız. Avcılık ve toplayıcılık yaygınken mevsim ve kaynaklara göre hareketlilik önemlidir. Tarım ve hayvanların evcilleştirilmesi bazı bölgelerde daha sürekli yerleşimleri, nüfus artışını ve depolamayı destekledi. Bu bir gecede ve her yerde aynı sırayla gerçekleşmedi; tarım yapan topluluklar avcılığı da sürdürebilir. Bir alet bulmak bütün bir topluluğun her özelliğini kanıtlamaz. Taş ve maden dönemleri, bölgelerin aynı tarihte ulaştığı evrensel basamaklar değildir.",
          "Bir buluntunun bağlamı, nerede ve hangi tabakada bulunduğu, başka nesnelerle ilişkisi ve sonradan taşınıp taşınmadığıdır. Aynı taş alet farklı yaşam biçimlerinde kullanılabilir; aletin varlığıyla bütün üretim ve yönetim düzeni tek başına kurulamaz. Yabani tahılı toplamak, ekim yapmak ve evcilleşmiş tür yetiştirmek farklı faaliyetlerdir. Bitki kalıntısı, kullanım izi, yapı ve çevre verileri bir araya geldikçe açıklamanın dayanağı güçlenir.",
        ],
      },
      {
        title: "Anadolu yerleşimlerini tek etikete indirgeme",
        paragraphs: [
          "Bereketli Hilal, erken tarım ve yerleşimlerin incelendiği geniş bir bölgedir. Göbeklitepe erken anıtsal ortak yapıları ve olası ritüel işlevleriyle, Çatalhöyük yerleşim dokusu ve duvar resimleriyle, Çayönü üretime geçiş ve yerleşme izleriyle ele alınır. Göbeklitepe, her yerde önce tarım sonra ortak anıtsal yapı biçiminde katı bir sıra kurulamayacağını düşündürür. Üç yerleşimi aynı tarih, aynı işlev ve aynı kent yapısı gibi görme. Kazı bulguları arttıkça yorumlar gelişebilir; ‘ilk’ sözcüğünü hangi ölçüte ve mevcut kanıta göre kullandığını belirt.",
          "UNESCO’nun güncel Göbeklitepe tanımı, Çanak Çömleksiz Neolitik avcı-toplayıcı grupların anıtsal ortak yapılarını ve olası ritüel işlevleri birlikte anlatır. Yeni kazılarda konutlarla ilişkili olabilecek anıtsal olmayan yapı kalıntıları da bildirilmiştir. Bu nedenle her yapının kesinlikle konut dışı olduğu veya bütün işlevlerin eksiksiz bilindiği söylenmez. Çatalhöyük ve Çayönü de kendi buluntu, yerleşme ve üretim kayıtlarıyla incelenir; tek bir en eski yer etiketi bütün farkları açıklamaz.",
        ],
      },
      {
        title: "Ürün fazlası yeni ilişkiler doğurur",
        paragraphs: [
          "Depolanabilen ürün, iş bölümünü ve zanaatları destekleyebilir. Üretim, dağıtım, savunma ve su yönetimi gibi ihtiyaçlar daha karmaşık yönetimlerle birlikte gelişir. Mezopotamya’da Dicle–Fırat çevresindeki şehir devletleri ile Nil çevresinde şekillenen Mısır aynı coğrafyaya sahip değildir. Sümerlerde şehir devletleri ve tapınakların ekonomik rolü; Mısır’da Nil’in tarımsal etkisi ve merkezi krallık birlikte düşünülür. Coğrafya fırsat ve sorun sunar; insan kararlarını tek başına zorunlu olarak belirleyen bir kader değildir.",
          "Artı ürün, yalnız depoda herhangi bir şey bulunması değil, temel tüketim ve sonraki üretim ihtiyacı ayrıldıktan sonra kalan fazladır. Bu fazlanın korunması ve kullanılması iş bölümünü ve değişimi destekleyebilir. Kimin ürünü denetlediği, nasıl dağıttığı ve hangi kuralların uygulandığı ayrıca araştırılır. Aynı ekonomik imkânın her yerde aynı devlet biçimini veya toplumsal eşitliği zorunlu olarak doğurduğu söylenemez.",
        ],
      },
      {
        title: "Yazı hafızayı dışarı taşır",
        paragraphs: [
          "Sümerlerin çivi yazısı, Mezopotamya’da ekonomik ve idari kayıtlarla ilişkilidir. Kayıtlar vergi, borç, ürün ve hukuk düzenini daha uzun süre izlemeyi kolaylaştırır. Yazının kullanımı okul düzeyinde tarih çağlarının başlangıcı kabul edilir; fakat bütün toplumlar yazıyı aynı tarihte kullanmaya başlamaz. Çivi yazısı ile Mısır hiyeroglifleri aynı yazı sistemi değildir. Fenikelilerin alfabe geleneği Akdeniz ticaret ağları üzerinden başka toplumlara aktarılmış, Yunan ve Latin alfabelerinin gelişimini etkilemiştir. Kültürel aktarım, bir icadın her yerde değişmeden kopyalanması demek değildir.",
          "Kil tablet, papirüs ve parşömen farklı yazı yüzeyleridir. Papirüs bitkisel malzemeden, parşömen işlenmiş hayvan derisinden hazırlanır; hiçbiri sırf yazı yüzeyi olduğu için diğerinin adıyla anılmaz. Resimsel işaret, çivi yazısı ve harf temelli alfabe de farklı yazı özellikleridir. Bir tekniğin başka topluma aktarılması, onu kullanan herkesin aynı dili veya aynı işaretlerin bütün biçimlerini değişmeden benimsediği anlamına gelmez.",
        ],
      },
      {
        title: "Medeniyetleri bir özellik listesi yerine bağlamıyla eşleştir",
        paragraphs: [
          "Anadolu’da Hititler Hattuşa, Pankuş ve anallar; Frigler Gordion ve tarım; Urartular Tuşpa, su yapıları ve madencilik; Lidyalılar Sardes, ticaret ve paranın kullanımı; İyonlar Ege kıyısındaki polisler, deniz ticareti ve düşünsel faaliyetlerle ilişkilendirilir. Asurluların ticaret kolonileri Anadolu’da yazının yayılmasında önemlidir. Perslerde satraplık geniş coğrafyanın yönetimini, yol ve haberleşme ağı merkezle bağlantıyı destekler. Bir özelliğin bir toplumda görülmesi başkasında hiç bulunmadığı anlamına gelmez. Kral Yolu farklı dönemlerde farklı güçlerin kullandığı bir ağdır; tek topluma değişmez biçimde aitmiş gibi düşünme.",
          "Medeniyet eşleştirmesinde coğrafya, merkez, kurum ve faaliyet birlikte kullanılır. Hattuşa ile Pankuş Hitit; Tuşpa ile su yapıları Urartu; Sardes ile sikke ve ticaret Lidya bağlamını güçlendirir. Yalnız tapınak, ticaret veya tarım gibi çok sayıda toplumda görülen tek özellik her zaman tek aday vermez. Ayrıca aynı toplumun farklı dönemlerdeki yönetim ve üretim biçimleri değişebilir; özellikler bütün yüzyıllara sınırsız aktarılmaz.",
        ],
      },
      {
        title: "Göç, ordu ve hukuk birlikte değişir",
        paragraphs: [
          "Nüfus hareketleri ekonomik sıkıntı, siyasi baskı, güvenlik ve doğal koşulların birleşiminden doğabilir. Kabile, şehir devleti ve imparatorluk aynı büyüklükte örgütler değildir; bütün toplumlar için tek doğrusal gelişme şeması kurulamaz. Yazılı kanunlar yöneticinin kararlarını görünür kılar ama otomatik olarak eşitlik getirmez. Hammurabi düzenlemelerinde toplumsal statüye göre farklı hükümler bulunur; Hitit hukukunda tazminatın önemli olması bütün cezaların yalnız para cezası olduğu demek değildir. Bir kanun metni olması, hükümlerin her olayda aynı biçimde uygulandığını tek başına kanıtlamaz.",
          "Hukukta kuralın sözlü veya yazılı oluşu, kime uygulandığı ve yaptırımının türü ayrı alanlardır. Kısas belirli koşullarda zarara denk bedensel karşılıkla, tazminat zararın mal veya para ile karşılanmasıyla, kolektif ceza ise yaptırımın suçlunun yakınları gibi başka kişilere de uzanmasıyla düşünülür. Aynı eylemde statü farkı ile kasıt-kaza gibi fiil koşulları karıştırılmaz. Bir kanun derlemesi uygulamanın bütün gerçek örneklerini tek başına bildirmez.",
        ],
      },
      {
        title: "Katmanın oluşumu, çukur ve nesnenin gelişi ayrı olaylardır",
        paragraphs: [
          "Bozulmamış bir yerleşim birikiminde alttaki tabaka genellikle üsttekinden daha eskidir. Ancak bu ilişki, daha sonra açılan bir çukurun içine bırakılmış nesneyi çevresindeki eski tabakayla otomatik olarak aynı yaşa getirmez. Kazıda tabakanın sınırları, kesilmeler, dolgu ve nesnelerin konumu birlikte belgelenir. Nesnenin üretildiği zaman ile o yere bırakıldığı zaman da aynı olmak zorunda değildir.",
          "Bir çukur önceden oluşmuş iki tabakayı kesiyorsa çukuru açma olayı kesilen tabakaların oluşumundan sonradır. Bu göreli sıra mutlak yıl vermez. Tabaka kalınlığından her birikimin eşit sayıda yıl sürdüğü hesaplanamaz; birikme hızı ve sonradan müdahaleler değişebilir. Şemada verilen derinlik fiziksel konumu gösterir, kendiliğinden takvim ölçeği değildir.",
        ],
      },
      {
        title: "Taş ve maden dönemlerini bölgesel özelliklerle öğren",
        paragraphs: [
          "Paleolitik avcılık-toplayıcılık ve yontma taş teknolojileriyle; Mezolitik bazı bölgelerde küçük taş aletler ve geçiş özellikleriyle; Neolitik farklı coğrafyalarda üretim, evcilleştirme ve kalıcı yerleşme gelişmeleriyle ilişkilendirilir. Neolitik içinde çanak çömleksiz dönemler de bulunduğundan seramik yokluğu bu olasılığı tek başına dışlamaz. Bütün avcı-toplayıcılar yalnız mağarada yaşamış değildir.",
          "Kalkolitikte bakırla taş araçlar birlikte kullanılabilir. Tunç, çoğunlukla bakırın kalayla alaşımıdır; demir kullanımı da farklı bölgelerde farklı tarihlerde yaygınlaşır. Yeni malzemenin görülmesi önceki bütün malzemeleri bir anda bitirmez. Bir nesnenin ithal edilmiş olabilmesi nedeniyle tek bir demir araç yerel demir işliğinin kesin kanıtı değildir.",
        ],
        table: {
          headers: ["Öğretim dönemi", "Öne çıkan özellik", "Korunan sınır"],
          rows: [
            [
              "Paleolitik",
              "Avcılık-toplayıcılık ve yontma taş",
              "Yalnız mağara yaşamı zorunlu değil",
            ],
            [
              "Mezolitik",
              "Bazı bölgelerde mikrolit ve geçiş",
              "Her yerde aynı tarihte zorunlu basamak değil",
            ],
            [
              "Neolitik",
              "Üretim, evcilleştirme ve yerleşme",
              "Seramikli ve seramiksiz evreler olabilir",
            ],
            [
              "Kalkolitik",
              "Bakır ve taşın birlikte kullanımı",
              "Taşın bütün kullanımının bitmesi değil",
            ],
            [
              "Tunç",
              "Alaşımlı metal teknolojisi",
              "Doğal tek element veya tek sabit reçete değil",
            ],
            [
              "Demir",
              "Demir işlemenin yaygınlaşması",
              "İthal nesne tek başına yerel üretim değil",
            ],
          ],
        },
      },
      {
        title: "Malzeme, ısı ve üretim işini ayır",
        paragraphs: [
          "Obsidyen keskin kenarlar verebilen doğal volkanik camdır; metal değildir. Çakmaktaşı, kemik ve ahşap gibi farklı malzemeler farklı işlerde kullanılabilir. Ateşin denetimli kullanımı pişirme, ısınma ve ışığa; daha ileri üretimlerde kilin pişirilmesi veya metal işlemlerine yardımcı olur. Bir ocak bulunması o topluluğun her metal türünü işlediğini göstermez.",
          "Bir alaşım örneğinde farklı metaller belirli özellikler için birleştirilir. Öğretim hesabındaki karışım oranı, bütün tarihî tunç eserlerin değişmez bileşimi olarak alınmaz. İşlik, fırın, üretim artığı ve yarım kalmış ürün gibi bağlamlar yerel üretim araştırmasını güçlendirebilir. Kullanılmış bir nesne, onu üreten işliğin de mutlaka aynı yerde bulunduğunu tek başına kanıtlamaz.",
        ],
      },
      {
        title: "Tarım, evcilleştirme ve yerleşiklik aynı kavram değildir",
        paragraphs: [
          "Tarım, bitkilerin ekim, bakım ve hasatla üretilmesidir. Evcilleştirme bitki veya hayvan topluluklarının insan yönetimi altında nesiller boyunca değişmesiyle ilişkilidir; bir yabani hayvanı bir kez yakalamak veya eğitmekle aynı değildir. Yerleşiklik ise bir yerde uzun süreli veya sürekli yaşama biçimini anlatır. Bu değişimler ilişkilidir ama her tür ve coğrafyada aynı sırada, aynı tarihte başlamaz.",
          "Tarım yapanlar avcılık ve toplayıcılığı sürdürebilir; hareketli hayvancılıkla yerleşik üretim aynı bölgesel ağda bulunabilir. Su, iklim, bitki ve hayvan kaynakları yer seçimine etki ederken insan kararları ve toplumsal ilişkiler de araştırılır. Bir çiftçinin depolama imkânı kazanması bütün bireylerin her koşulda daha sağlıklı veya daha eşit yaşadığının doğrudan ölçümü değildir.",
        ],
      },
      {
        title: "Anadolu yerleşimlerinde yer ve buluntuyu birlikte tut",
        paragraphs: [
          "Göbeklitepe Şanlıurfa, Çatalhöyük Konya-Çumra, Çayönü Diyarbakır çevresindeki farklı arkeolojik alanlardır. Göbeklitepe’nin anıtsal ortak yapılarını, Çatalhöyük’ün yoğun konut dokusunu ve Çayönü’nün üretime geçiş izlerini tek bir yerin bütün özellikleri gibi birleştirme. Her alandaki yorum buluntu bağlamı, tarihleme ve araştırma sorusuyla sınırlandırılır.",
          "Karain Antalya, Yarımburgaz İstanbul çevresindeki tarih öncesi insan izleriyle ilişkilidir. Bir mağarada kullanım izi bulunması bütün çağdaş toplulukların aynı barınma biçimini kullandığını göstermez. Bereketli Hilal erken üretim ve yerleşimlerin araştırıldığı geniş bir coğrafi adlandırmadır; tek devlet, aynı tarih veya bütün noktalarında özdeş iklim anlamına gelmez.",
        ],
      },
      {
        title: "Sözlü kültür hafıza taşır; her anlatı olay tutanağı değildir",
        paragraphs: [
          "Mit, efsane ve destanlar yaratılış, tufan, kahramanlık ve toplumsal kimliğe ilişkin anlatıları taşıyabilir. Ozan, anlatıcı ve kuşaklar arası hatırlama kültürün aktarım yollarıdır. Benzer motifler farklı toplumlarda görülebilir; aktarım, ortak çevre veya bağımsız benzerlik ihtimalleri ayrıca araştırılır. Tek bir ortak motif aynı soyun veya aynı olayın birebir yaşandığının kesin kanıtı değildir.",
          "Bir anlatının yazıya geçirilmesi sözlü icrayı zorunlu olarak sona erdirmez. Aynı geleneğin farklı nüsha ve anlatımları bulunabilir; değişen kısımlar da tarihsel araştırmanın verisidir. Sözlü kültürün bulunması bütün toplumun okuryazar olmadığı sonucunu, yazılı kaydın bulunması da bütün bireylerin okuryazar olduğu sonucunu tek başına vermez.",
        ],
      },
      {
        title: "Yazı araçları ile yazı sistemlerini ayrı karşılaştır",
        paragraphs: [
          "Mezopotamya’daki erken Sümer yazı örnekleri, özellikle MÖ 4. binyıl sonlarındaki Uruk kayıtları ürün, miktar ve hesap işleriyle ilişkilidir. Kil yüzeye bırakılan işaretler, çivi yazısının gelişimi ve yazıcı yetiştirme faaliyetleri kayıt düzeninin parçalarıdır. Yazı zamanla yönetim, hukuk, mektup, edebiyat ve başka alanlarda da kullanılır. Ekonomik kaydın varlığı bütün metinlerin yalnız ekonomi için yazıldığı anlamına gelmez.",
          "Mısır hiyeroglifleri, Mezopotamya çivi yazısı ve Fenike alfabe geleneği birbirinin tek adı değildir. Alfabe ile her işaretin tek sese karşılık gelmediği yazı sistemleri ayrılır. Fenike, Yunan ve Latin yazı gelenekleri arasında etkileşim bulunması bütün aşamalarda aynı işaretlerin değişmeden kaldığını göstermez. Papirüs, parşömen ve kâğıt ise işaretlerin yazıldığı malzemelerdir; sistem ile yüzey aynı sınıflama değildir.",
        ],
      },
      {
        title: "Mezopotamya tek devlet adı değildir",
        paragraphs: [
          "Dicle ve Fırat çevresindeki Mezopotamya, farklı dönemlerde Sümer, Akad, Babil ve Asur gibi siyasi ve kültürel oluşumların bulunduğu bölgedir. Sümerlerde şehir devletleri, erken çivi yazısı ve zigguratlarla ilişkili tapınak ekonomisi; Akadlarda daha geniş siyasi egemenlik; Babillerde Babil merkezi ve Hammurabi hukuk derlemesi; Asurlarda askerî yayılma ve Anadolu ile ticari bağlar öne çıkan öğretim bağlantılarıdır.",
          "Ziggurat, basamaklı tapınak yapısıdır; onu yalnız hükümdarın mezarı olarak tanımlamak doğru değildir. Tapınak çevresinde depolama, kayıt ve öğretim ilişkileri bulunabilir; her yapının her katının bütün tarihlerde aynı iş için kullanıldığı genellenmez. Eski gözlemler, hesaplar ve tablolar bilginin birikimine katkı sağlar; bütün modern astronomik doğrulukların o dönemde elde edildiği iddia edilmez.",
        ],
      },
      {
        title: "Anadolu uygarlıklarını özellik kümeleriyle ayır",
        paragraphs: [
          "Hititler Hattuşa, Pankuş meclisi, Tavananna ve anal denen yıllıklarla; Frigler Gordion, tarım-hayvancılık ve tapates denen halı-kilim türü dokumalarla; Lidyalılar Sardes, sikke kullanımı ve ticaretle; Urartular Tuşpa, su yapıları ve maden işçiliğiyle ilişkilendirilir. İyonlar ise Ege kıyısındaki farklı polisler ve denizcilik-düşünce ortamıyla öğrenilir; bütün İyon kentlerini tek başkentin yönetiminde göstermek doğru değildir.",
          "Hititlerde Tavananna, yönetimde etkili kraliçe için kullanılan unvandır; Pankuş ise kralın kararlarında danıştığı soylular meclisidir. Kraliçe ve meclisin varlığı, kralın yanında başka siyasi aktörlerin de bulunduğunu gösterir; bütün halkın eşit oyuyla yönetim kurulduğunu göstermez. Bu eşleştirmeler tek bir ortak kelimeye dayanmaz. Su yapısı yalnız Urartu’da, ticaret yalnız Lidya’da, meclis yalnız Hititlerde bulunmuş değildir. Sikke kullanımı ticaretin ilk kez o anda başladığı anlamına da gelmez; değiş-tokuş ve başka ödeme biçimleri önceden bulunabilir. Merkez, kurum ve faaliyet birlikte verildiğinde ayırıcı bağ daha güçlü kurulur.",
        ],
        table: {
          headers: ["Bağlam", "Merkez veya kurum", "Öne çıkan faaliyet"],
          rows: [
            [
              "Hitit",
              "Hattuşa; Pankuş; Tavananna",
              "Krallık, yıllıklar ve hukuk",
            ],
            ["Frig", "Gordion", "Tarım-hayvancılık, dokuma"],
            ["Lidya", "Sardes", "Sikke ve ticaret"],
            ["Urartu", "Tuşpa", "Su yapıları, taş ve maden işleri"],
            [
              "İyon kentleri",
              "Efes, Milet gibi polisler",
              "Deniz ticareti ve düşünsel faaliyetler",
            ],
          ],
        },
      },
      {
        title: "Mısır ve diğer havzalarda farklı sütunları birleştir",
        paragraphs: [
          "Mısır’da Nil havzası, tarım, firavun unvanı, hiyeroglif, güneş yılı ve mezar uygulamaları farklı alanlara ilişkin bilgilerdir. Bunlardan biri toplumsal tabakalaşmanın bulunmadığını tek başına göstermez. Perslerde satraplık eyalet yönetimini, posta ve yol ağı merkezle bağlantıyı destekler. Fenikeliler Doğu Akdeniz deniz ticareti ve alfabe aktarımıyla, İbraniler ise tek tanrılı inanç ve On Emir geleneğiyle ilişkilendirilir.",
          "Hindistan’da kast bağlamı kalıtsal statü ve toplumsal hareketlilik sınırlarıyla; Çin’de kâğıt, matbaa, pusula ve barut gibi farklı zamanlarda gelişen tekniklerle öğrenilir. Çin’le ilişkilendirilen bütün buluşlar tek seferde veya tek İlk Çağ yılında ortaya çıkmış değildir. İskender’in seferleri çevresinde Yunan, Anadolu, Mısır ve Pers gibi kültürler arasındaki etkileşim Helenizmle ilişkilendirilir. Roma ise krallık, cumhuriyet ve imparatorluk gibi farklı dönemleriyle incelenir. Tek toplum adı bütün yüzyılların değişmez yönetimi değildir.",
        ],
      },
      {
        title: "Mal, insan ve tekniğin hareketini ayrı izle",
        paragraphs: [
          "Göç, insanların yer değiştirmesidir; ticaret ise mal ve hizmet değişimiyle ilişkilidir. Aynı ilişkilerde teknik, dil ve kayıt uygulamaları da taşınabilir. Karum, Asur ticaret merkezleriyle ilişkili bir terimdir. Anadolu’daki bu merkezlerin tabletleri mal değişimi yanında kayıt uygulamalarına veri sağlar. Fenike deniz ağıyla Asur kara ticareti aynı ticari faaliyet başlığı altında bulunsa da güzergâh, kurum ve aktörleri farklı olabilir.",
          "Uzak kaynaklı bir malzeme temas ve dolaşım olasılığını destekler; bütün nüfusun o kaynaktan göç ettiğini tek başına kanıtlamaz. Koloni eski çağ bağlamında ana merkez dışındaki yerleşme veya bağlı alanı anlatabilir; her koloni modern dönemin sömürge kurumuyla birebir aynı değildir. Bir yolun farklı dönemlerde farklı devletlerce kullanılması, onun tek siyasi yapıya sonsuza kadar ait olduğunu göstermez.",
        ],
      },
      {
        title: "Siyasi ölçek ile yönetim biçimini ayır",
        paragraphs: [
          "Kabile ortak soy veya bu soya dayalı aidiyet çevresinde örgütlenebilir; kabileler daha geniş birliklerde de varlığını sürdürebilir. Şehir devleti kent ile çevresindeki alana dayanan siyasi birimdir: site, polis ve nom öğretim örnekleridir. İmparatorluk ise farklı halk ve bölgeleri geniş egemenlik altında toplar. Bu ölçek adları yöneticinin nasıl belirlendiğini veya herkesin hangi hakka sahip olduğunu tek başına bildirmez.",
          "Aynı ölçekteki şehirler farklı yönetim biçimleri kullanabilir. Bir eyaletin bulunması onun bağımsız devlet olduğunu gerektirmez; atama, vergi ve denetimle daha geniş merkeze bağlanabilir. Devlet oluşumunu bütün toplumların zorunlu olarak aynı basamakları aynı tarihte geçtiği çizgiye dönüştürme. Ekonomi, güvenlik, kaynaklar ve kurumlar belirli tarihsel bağlamda birlikte araştırılır.",
        ],
      },
      {
        title: "Gücün kimde olduğu ile meşruiyet kaynağı farklıdır",
        paragraphs: [
          "Monarşi gücün bir kişide toplanmasıyla, aristokrasi soylu çevrenin, oligarşi az sayıda kişinin yönetimde ağırlığıyla ilişkilidir. Tiranlık, eski Yunan bağlamında yerleşik düzeni aşarak gücü ele geçiren tek kişinin yönetimidir; yalnız güncel hakaret anlamıyla okunmaz. Teokratik meşruiyet, yönetme hakkına dinî dayanak verilmesini anlatır. Hükümdarın tanrının seçtiği veya temsil ettiği kişi sayılması, bizzat tanrı sayılmasıyla aynı ifade değildir. Bu iki iddia ancak kaynak hangi ilişkiyi veriyorsa o kapsamda kurulur.",
          "Demokrasi, kararların yönetilen yurttaşların katılımıyla alınması esasına dayanan yönetim anlayışıdır. Cumhuriyet, yönetimin bir hanedanın kalıtsal mülkü sayılmadığı ve kamusal makamlarla yürütüldüğü yönetim biçimidir; Roma’da krallık makamının yerini konsüllük ve senato gibi kurumların aldığı dönem bu bağlamda incelenir. İki kavram eş anlamlı değildir; cumhuriyet adı tek başına bütün halkın eşit katılımını garanti etmez. Bir meclisin veya seçimin varlığı da herkesin eşit oy hakkı olduğu anlamına gelmez. Antik yurttaşlıkta kadınlar, köleler ve yabancılar gibi grupların dışlanabildiği koşullar incelenir. Pankuş’un bulunması kral dışında aktörleri gösterir; modern genel oyla aynı kurum değildir. Yönetim ölçeği, karar verenlerin kimliği ve yetkinin kabul dayanağı ayrı sütunlarda tutulduğunda kavramlar daha açık karşılaştırılır.",
        ],
      },
      {
        title: "Hukuk derlemelerinde kaynak, yaptırım ve kapsam",
        paragraphs: [
          "Sözlü örf, âdet ve töre yazı olmadan da düzen ve yaptırım içerebilir. Urkagina düzenlemeleri erken hukuk örnekleri, Hammurabi derlemesi Babil’de aile, mal, borç ve ceza alanlarıyla, Hitit hukuk tabletleri ise çeşitli maddi ve başka yaptırımlarla öğrenilir. Birçok Hitit hükmünde tazminatın öne çıkması bütün ölüm cezalarının veya statü farklarının yok olduğu anlamına gelmez.",
          "On Emir geleneği, inanç anlatımında ilahî bildirimle ilişkilendirilir; tarihçi metnin dinî ve toplumsal işlevini kaynağın türünü koruyarak inceler. Yazılı olmak, adalet iddiası taşımak ve herkese aynı hakkı vermek farklı özelliklerdir. Bir karşılaştırmada aynı fiil, niyet ve diğer ilgili koşullar korunmadan yalnız ceza farkından statü eşitsizliği sonucu üretilmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Çukuru açma olayı hangi sıradadır?",
        prompt:
          "Kurmaca kazı kesitinde önce A tabakası, onun üstünde B tabakası birikmiştir. Daha sonra açıldığı belirlenen C çukuru, A ve B’nin ikisini de kesmektedir. Kesme ilişkisi, çukurun kesilen tabakalar oluştuktan sonra açıldığını gösterir. C’yi açma olayı hangi oluşumlardan sonradır?",
        strategy:
          "Nesnelerin derinliğini değil, tabaka birikimiyle kesme olayının sırasını karşılaştır.",
        steps: [
          {
            label: "Birikimleri ayır",
            explanation:
              "A ve B iki tabaka oluşumudur; A önce, B sonra birikmiş olarak verilmiştir.",
          },
          {
            label: "Kesme ilişkisini uygula",
            explanation:
              "C hem A’yı hem B’yi kestiğinden çukuru açma olayı iki tabaka da oluştuktan sonradır.",
          },
          {
            label: "Zaman ölçeğini sınırlı tut",
            explanation:
              "A oluşumu → B oluşumu → C’nin açılması göreli sırasını kurarız; bu ilişkiden kesin takvim yılı veya eşit süre çıkmaz.",
          },
        ],
        answer:
          "C’yi açma olayı hem A hem B oluşumundan sonradır. Göreli sıra A, B, C’dir.",
        check:
          "Çukurun derindeki kısmını sırf derin olduğu için A’dan eski saydın mı?",
        pitfall:
          "Sonradan kesen çukuru çevresindeki eski tabakayla aynı oluşum anına yerleştirmek.",
      },
      {
        title: "Bir örneğin reçetesi bütün çağı tanımlamaz",
        prompt:
          "Yalnız öğretim için verilen bir atölye reçetesinde 90 gram bakır ile 10 gram kalay, kayıp olmadan birleştiriliyor. Tunç burada bakır-kalay alaşımı olarak tanımlanmış. Örneğin toplamı ve malzeme sınıfı nedir? Verilen oran bütün tarihî tunçlara uygulanacak kural değildir.",
        strategy:
          "Örneğin kütle hesabını alaşım tanımıyla birleştir; reçetenin kapsamını genişletme.",
        steps: [
          {
            label: "Toplamı bul",
            explanation:
              "Kayıp olmadığı açıkça verildiğinden 90+10=100 gram malzeme bulunur.",
          },
          {
            label: "Sınıfı belirle",
            explanation:
              "İki metal birleştirilmiş ve reçete bakır-kalay alaşımı olarak tanımlanmıştır; örnek tunçtur, saf tek element değildir.",
          },
          {
            label: "Genellemeyi denetle",
            explanation:
              "Bu reçete tek örneğin oranını bildirir. Başka bir tunç eserin oranı için onun üretim kaydı veya malzeme ölçümü gerekir.",
          },
        ],
        answer:
          "100 gramlık bir tunç alaşımı örneğidir; 90/10 oranı bütün eserlerin değişmez formülü değildir.",
        check:
          "Toplam 100 gram mı; tek örneğin oranını bütün döneme taşıdın mı?",
        pitfall:
          "Tunç adıyla tek sabit bileşim veya doğal tek element varsaymak.",
      },
      {
        title: "Yazı yüzeylerini ayır",
        prompt:
          "Bir öğretim müzesinde P kartı, papirüs bitkisinden hazırlanan yazı yüzeyini; D kartı, işlenmiş hayvan derisinden hazırlanan parşömeni tanımlıyor. Bir öğrenci ikisini de yazı taşındığı için aynı malzeme sayıyor. Kartlar nasıl ayrılmalıdır?",
        strategy:
          "Ortak kullanım amacıyla maddi bileşimi ayrı özellikler olarak oku.",
        steps: [
          {
            label: "Ortak işlevi koru",
            explanation:
              "Her iki yüzeyde de yazı bulunabilmesi ortak kullanım özelliğidir.",
          },
          {
            label: "Malzemeyi ayır",
            explanation:
              "P bitkisel papirüs, D işlenmiş hayvan derisi olan parşömendir; başlangıç malzemeleri farklıdır.",
          },
          {
            label: "Sistemle karıştırma",
            explanation:
              "Yüzeyin malzemesi üzerindeki yazı sistemini veya hangi dilin yazıldığını tek başına belirlemez.",
          },
        ],
        answer:
          "P papirüs, D parşömendir; ortak yazı yüzeyi işlevi aynı malzeme olduklarını göstermez.",
        check:
          "Bitkisel yüzey ile hayvan derisini ayrı tutup yazının dilini uydurmadan bıraktın mı?",
        pitfall:
          "Ortak yazı işlevini aynı maddi yüzey veya aynı yazı sistemi sanmak.",
      },
      {
        title: "Artı ürünün miktarını verilen ihtiyaçlardan bul",
        prompt:
          "Tamamen kurmaca bir yerleşme hesabında 300 birim tahıl vardır. Temel tüketim için 200, sonraki ekim için tohum olarak 60 birim ayrılması gerekiyor; kayıp olmadığı varsayılıyor. Bu örnekte artı ürün, bu iki ihtiyaç dışındaki miktar olarak tanımlanmıştır. Kaç birim kalır?",
        strategy: "Toplamdan hem tüketimi hem sonraki üretim ihtiyacını ayır.",
        steps: [
          {
            label: "İhtiyaçları topla",
            explanation:
              "200 birim tüketim ile 60 birim tohum toplam 260 birimdir.",
          },
          {
            label: "Fazlayı hesapla",
            explanation:
              "300−260=40 birim, verilen iki ihtiyacın dışında kalır.",
          },
          {
            label: "Sonucun alanını koru",
            explanation:
              "40 birim miktar hesabıdır; kime dağıtıldığı veya hangi yönetim biçiminin bulunduğu ayrıca verilmemiştir.",
          },
        ],
        answer: "Verilen varsayımlar altında 40 birim artı ürün kalır.",
        check: "200+60+40 toplamı 300 ediyor mu; tohum ihtiyacını unuttun mu?",
        pitfall:
          "Bütün depoyu artı ürün saymak veya yalnız tüketimi çıkarıp tohum ihtiyacını atlamak.",
      },
      {
        title: "Pratik ihtiyaçtan iki bilgi alanına",
        prompt:
          "Bir Nil yerleşmesinin öğretim dosyasında K ekibi taşkın sonrası tarla sınırlarını uzunluk ve alan ölçüleriyle yeniden belirliyor. L ekibi mevsim döngüsünü izleyerek yılı düzenliyor. Geometri şekil ve ölçüyle, astronomi gök döngüleriyle ilişkilendirilmiş. İki iş nasıl ayrılır?",
        strategy:
          "Ortak tarımsal bağlamı koruyup ölçülen şeyin alan mı zaman döngüsü mü olduğunu belirle.",
        steps: [
          {
            label: "K’nin ölçüsünü belirle",
            explanation:
              "Tarla sınırının uzunluk ve alanla belirlenmesi geometrik ölçüm işidir.",
          },
          {
            label: "L’nin döngüsünü belirle",
            explanation:
              "Mevsim ve yıl düzeni gök döngülerinin izlenmesiyle ilişkilidir; astronomi-takvim alanı öne çıkar.",
          },
          {
            label: "Ortaklığı ve farkı koru",
            explanation:
              "İkisi de pratik ihtiyaca cevap verebilir; fakat aynı ölçüm veya yalnız tek bilgi alanı değildir.",
          },
        ],
        answer:
          "K geometri, L astronomi ve takvim bilgisiyle ilişkilidir; ortak ihtiyaç farklı bilgi alanlarını destekleyebilir.",
        check:
          "Alan ölçümüyle yılın düzenlenmesini iki ayrı iş olarak gösterdin mi?",
        pitfall:
          "Aynı tarım bağlamında yapılan bütün çalışmaları tek bilgi alanına indirgemek.",
      },
      {
        title: "Birim, yönetim ve meşruiyet için üç sütun",
        prompt:
          "Gerçek bir devletin kaydı olmayan özgün şehir dosyasında kent ve çevresindeki tarım alanları tek siyasi birimdir. Yönetim bir kralın elindedir. Kral, yönetme hakkını tanrının kendisini seçtiği iddiasına dayandırır; bizzat tanrı olduğunu söylemez. Şehir devleti siyasi ölçeği, monarşi tek kişide iktidarı, dinî meşruiyet iddiası ise yetkinin inançla gerekçelendirilmesini anlatır. Dosyanın siyasi ölçeği, yönetim biçimi ve meşruiyet iddiası hangi üç ayrı sütunda gösterilir?",
        strategy:
          "Siyasi birimin ölçeğini, karar sahibini ve yetki iddiasının dayanağını ayrı sütunlara yerleştir.",
        steps: [
          {
            label: "Ölçeği seç",
            explanation:
              "Kent ve çevresindeki alana dayanan tek birim, verilen tanıma göre şehir devletidir.",
          },
          {
            label: "Yönetim biçimini seç",
            explanation:
              "İktidarın bir kralda bulunması monarşi tanımıyla eşleşir.",
          },
          {
            label: "Dayanağı sınırlı kur",
            explanation:
              "Tanrının seçtiği kişi iddiası dinî meşruiyet iddiasıdır; bundan kişinin kendisinin tanrı olduğu sonucu zorunlu çıkmaz.",
          },
        ],
        answer:
          "Şehir devleti ölçeği, monarşi yönetimi ve dinî meşruiyet iddiası birlikte bulunur; üçü aynı sınıflama değildir.",
        check:
          "Kralın yetki iddiasını bizzat tanrı olma iddiasına dönüştürdün mü?",
        pitfall:
          "Siyasi ölçeği yönetim biçimiyle veya dinî dayanağı kişi-tanrı özdeşliğiyle karıştırmak.",
      },
    ],
    recall: [
      {
        prompt:
          "Bir nesnenin üretim tarihi ile bulunduğu tabakanın oluşumu aynı olmak zorunda mı?",
        answer:
          "Hayır. Nesne daha sonra taşınmış veya çukur dolgusuna girmiş olabilir; buluntu bağlamı ayrı araştırılır.",
      },
      {
        prompt:
          "Neolitik bir bağlamda seramik bulunmaması tek başına çelişki midir?",
        answer:
          "Hayır. Çanak Çömleksiz Neolitik evreler vardır; dönem tek bir nesne yokluğuyla elenmez.",
      },
      {
        prompt: "Obsidyen ve tunç hangi temel malzeme ayrımına sahiptir?",
        answer:
          "Obsidyen doğal volkanik cam, tunç çoğunlukla bakır-kalay alaşımıdır; ikisi aynı metal türü değildir.",
      },
      {
        prompt:
          "Tarım, evcilleştirme ve yerleşiklik neden tek sözcük sayılmaz?",
        answer:
          "Bitki üretimi, nesiller boyunca insan yönetimi altında değişim ve bir yerde yaşama biçimi farklı ölçütlerdir; her coğrafyada aynı sırada başlamazlar.",
      },
      {
        prompt: "Yazı yüzeyiyle yazı sistemine ikişer örnek ver.",
        answer:
          "Kil tablet ve papirüs yüzey; çivi yazısı ve hiyeroglif yazı sistemi örnekleridir. Malzeme ile işaret düzeni ayrı alanlardır.",
      },
      {
        prompt: "Pankuş ve Tavananna hangi Anadolu bağlamıyla ilişkilidir?",
        answer:
          "Hitit bağlamıyla; meclis ve kraliçenin etkisi kral dışında siyasi aktörler olduğunu gösterir, modern genel oyu tek başına vermez.",
      },
      {
        prompt: "Bir satraplık bütün şartlarda bağımsız devlet midir?",
        answer:
          "Hayır. Atama, vergi ve denetim ilişkileriyle geniş bir merkezî yönetimin eyaleti olabilir.",
      },
      {
        prompt:
          "Yazılı kanun, kısas ve herkese eşit uygulama aynı özellik midir?",
        answer:
          "Hayır. Kayıt biçimi, yaptırım türü ve hakların kimlere hangi koşulda tanındığı ayrı değerlendirilir.",
      },
    ],
    items: [
      {
        passage:
          "Bozulmadığı belirlenen bir yerleşim tabakasında kullanım izi taşıyan taş bıçaklarla bakır bizler birlikte bulunuyor. Araştırma, yeni malzeme kullanıldığında eski malzemenin bütün işlerde bırakılması gerektiği varsayımını kullanmıyor.",
        prompt: "Bu birliktelik için hangi yorum uygundur?",
        options: [
          "Taş ve bakır araçlar aynı bağlamda farklı işler için birlikte kullanılabilir.",
          "Bakır varsa taş araçların kullanılmış olması mutlaka imkânsızdır.",
          "İki malzemenin birlikte bulunması tabakanın kesinlikle yanlış kazıldığını gösterir.",
          "Bakırın varlığı bütün toplumun aynı anda yazıya geçtiğini gösterir.",
          "Taş bıçağın kullanılması bakır nesnelerin metal olmasını geçersiz kılar.",
        ],
        steps: [
          "İki araç türünün aynı bozulmamış bağlamda ve kullanım izleriyle verildiğini belirle.",
          "Yeni malzeme eski malzemenin bütün kullanımını zorunlu olarak bitirmez.",
          "Birlikte kullanımı kabul et; kazı hatası veya yazı başlangıcı için verilmemiş kanıt ekleme.",
        ],
        reasons: [
          "Farklı malzemelerin aynı bağlamda birlikte kullanılması verilenlerle uyumludur.",
          "Yeni malzeme eski aracın bütün işlevini kendiliğinden ortadan kaldırmaz.",
          "Birliktelik tek başına kazı hatası değildir; gövde bağlamın bozulmadığını da belirtir.",
          "Metal kullanımı ile yazılı belge kullanımı ayrı ölçütlerdir.",
          "Bir aracın kullanımı başka bir nesnenin maddi niteliğini değiştirmez.",
        ],
        knowledge:
          "Taş ve maden teknolojileri örtüşebilir; yeni bir malzeme öncekinin bütün kullanımını aynı anda bitirmez.",
        strategy:
          "Malzemelerin birlikte varlığını, dönemlerin zorunlu olarak birbirini silmesi varsayımı olmadan yorumla.",
        error:
          "Bakır bulunduğu anda bütün taş araçların işlevsizleştiğini varsaymak.",
        check: "Birlikte kullanımı yasaklayan bir koşul gerçekten verilmiş mi?",
      },
      {
        passage:
          "Bir araştırma notu Neolitik içinde çanak çömleksiz evreler de bulunduğunu belirtiyor. Yeni kazı dosyasında kalıcı yapı izleri ve üretimle ilişkili bağımsız bulgular var, fakat henüz seramik bulunmamış. Başka bir öğrenci yalnız seramik yokluğuyla Neolitik olasılığını kesin eliyor.",
        prompt: "Öğrencinin elemesindeki temel sorun hangisidir?",
        options: [
          "Seramik bulunmamasını, notun açıkça izin verdiği çanak çömleksiz evreleri dışlayacak zorunlu ölçüt sayması.",
          "Kalıcı yapı izlerini üretimle ilgili bulgularla birlikte incelemesi.",
          "Neolitik adını yalnız bir devletin resmi adı olarak doğru kullanması.",
          "Birden fazla bağımsız bulguyu aynı dosyada karşılaştırması.",
          "Seramik yokluğundan bütün yapıların kesinlikle aynı gün yapıldığını hesaplaması.",
        ],
        steps: [
          "Notun seramiksiz Neolitik evrelere açıkça yer verdiğini işaretle.",
          "Seramik yokluğu bu durumda tek başına kesin dışlama koşulu olamaz.",
          "Diğer bulgularla birlikte değerlendirmek gerekir; yokluk ölçütünü zorunlu kurala dönüştürme.",
        ],
        reasons: [
          "Eleme, gövdede belirtilen çanak çömleksiz olasılığı yok sayarak kesinlik üretmektedir.",
          "Öğrenci bu birlikte incelemeyi yapmıyor; tam tersine tek yoklukla kesin eliyor.",
          "Neolitik bir devletin resmi adı değildir; öğrenci de bunu söylemiş olarak verilmemiştir.",
          "Bağımsız bulguları karşılaştırmak sorun değil, uygun bir araştırma yoludur.",
          "Öğrencinin yaptığı eleme budur diye verilmemiş; sorun tarih hesabından önceki yanlış zorunluluk ölçütüdür.",
        ],
        knowledge:
          "Çanak Çömleksiz Neolitik bağlamlar bulunduğundan seramik yokluğu Neolitik olasılığını tek başına elemez.",
        strategy:
          "Eleme için kullanılan koşulun bütün ilgili evrelerde gerçekten zorunlu olup olmadığını denetle.",
        error:
          "Seramik bulunmamasını Neolitik araştırmasının tek ve kesin dışlama ölçütü yapmak.",
        check: "Notta verilen seramiksiz evre olasılığı çözümünde kaldı mı?",
      },
      {
        passage:
          "Bir yerleşimde ilk dosyada yalnız demir bir araç bulunuyor. Yeni dosyada ise aynı bağlamla ilişkili üretim fırını, metal işleme artıkları ve yarım kalmış ürünler belgeleniyor. Araştırmacı yerel üretim olasılığını inceliyor; tek bir ithal nesnenin bu olasılığı kesinleştirmediğini biliyor.",
        prompt: "Yeni dosya araştırmaya ne ekler?",
        options: [
          "Yalnız kullanım nesnesinden farklı olarak yerel üretim süreciyle ilişkili bağımsız bağlam verileri sağlar.",
          "Demir aracın bulunduğu anda bütün eski araçların kullanımdan kalktığını kanıtlar.",
          "Fırın bulunduğu için bütün toplumun gelir ve hukuk düzenini eksiksiz bildirir.",
          "Yerel üretim araştırmasını imkânsızlaştırır; artıklar hiçbir veri sayılamaz.",
          "Her yarım ürünün kesinlikle başka ülkeden getirildiğini zorunlu kılar.",
        ],
        steps: [
          "İlk dosyayı tek bitmiş araç, yenisini fırın-artık-yarım ürün bağlamı olarak ayır.",
          "Yeni veriler üretim işlemiyle doğrudan ilişki kurmaya yardımcıdır.",
          "Yerel üretim olasılığının dayanağının güçlendiğini seç; bütün toplum veya evrensel teknoloji değişimi ekleme.",
        ],
        reasons: [
          "Üretim sürecine ilişkin birden çok bağlam verisi tek kullanım nesnesinden daha ayrıntılı destek verir.",
          "Yerel üretim kanıtı eski bütün araçların aynı anda bırakıldığını göstermez.",
          "Fırın verisi bütün mali ve hukuki düzenin tam kaydı değildir.",
          "Fırın ve üretim artıkları yerel işlik araştırmasında kullanılabilir verilerdir.",
          "Yeni bağlam ithalat zorunluluğunu kurmaz; üretim sürecinin yerle ilişkisini araştırmayı destekler.",
        ],
        knowledge:
          "Bitmiş nesnenin kullanımı ile yerel üretim sürecinin kanıtı farklıdır; işlik bağlamı araştırmayı güçlendirir.",
        strategy:
          "Buluntuları kullanılmış ürün ve üretim sürecine ait izler olarak karşılaştır.",
        error:
          "Tek nesneyle yerel üretimi kesinleştirmek veya yeni işlik bağlamını değersiz saymak.",
        check:
          "Seçimin yeni dosyanın üretimle ilişkili hangi somut verileri eklediğini açıklıyor mu?",
      },
      {
        passage:
          "Bir alanın güncel tanımı, anıtsal ortak yapıların muhtemel sosyal ve ritüel işlevlerini bildiriyor. Ayrıca bazı anıtsal olmayan kalıntıların konutlarla ilişkili olabileceği söyleniyor. Metin bu işlev yorumlarında muhtemel ve olabilir sözcüklerini özellikle koruyor.",
        prompt: "Tanımın kesinlik düzeyini koruyan özet hangisidir?",
        options: [
          "Ortak ve olası ritüel işlevler araştırılmakta; bazı kalıntılar için konut ilişkisi olasılığı da bulunmaktadır.",
          "Alan bütün yapılarda kesinlikle konut dışıdır ve bütün işlevleri artık bilinmektedir.",
          "Konut olasılığı bulunduğu için bütün yapılar yalnız gündelik konuttur.",
          "Ritüel işlevin olası olması alanda hiçbir ortak yapı bulunmadığını gösterir.",
          "Muhtemel sözcüğü, araştırmada bütün yorumların aynı ölçüde kesin olduğunu bildirir.",
        ],
        steps: [
          "Anıtsal ortak yapılarla bazı anıtsal olmayan kalıntıları ayrı tut.",
          "İşlev yorumlarındaki muhtemel ve olabilir ifadelerini kesin hükme çevirmeden oku.",
          "Hem olası ritüel hem olası konut ilişkisini kendi kapsamıyla koruyan özeti seç.",
        ],
        reasons: [
          "Her iki buluntu türü ve yorumların olasılık derecesi korunmuştur.",
          "Bütün ve kesinlikle ifadeleri metindeki olasılık ve bazı sınırını aşar.",
          "Bazı kalıntılardaki konut olasılığı bütün yapılara ve tek işleve genellenemez.",
          "İşlev yorumu ile ortak yapıların varlığı farklı iddialardır; biri ötekini silmez.",
          "Muhtemel, bütün yorumların kesinliği veya eşit kanıt düzeyi anlamına gelmez.",
        ],
        knowledge:
          "Arkeolojik yapıların varlığı ile işlevlerinin yorumundaki kesinlik ayrı değerlendirilir.",
        strategy:
          "Buluntu kapsamıyla yorumun olasılık sözcüklerini aynı anda koru.",
        error:
          "Olası işlevi bütün yapılar için kesin ve eksiksiz bilgiye çevirmek.",
        check: "Bazı ve olabilir sözcükleri özetinde kaybolmuş mu?",
      },
      {
        passage:
          "Bir öğretim haritası Çatalhöyük’ü Konya-Çumra’da yoğun konut dokusuyla, Çayönü’nü Diyarbakır çevresinde üretime geçiş ve erken yerleşme izleriyle gösteriyor. Yeni müze kartında Diyarbakır çevresi ve üretime geçiş verileri birlikte yazılıdır.",
        prompt: "Yeni kart hangi harita kaydıyla doğrudan eşleşir?",
        options: ["Çayönü.", "Çatalhöyük.", "Sardes.", "Tuşpa.", "Hattuşa."],
        steps: [
          "Karttaki yer bilgisini Diyarbakır çevresi olarak belirle.",
          "Üretime geçiş bilgisini haritada aynı yerle birlikte verilen kayıtla eşleştir.",
          "İki açık koşulu birlikte sağlayan Çayönü’nü seç.",
        ],
        reasons: [
          "Haritada Diyarbakır çevresi ve üretime geçiş Çayönü’yle birlikte verilmiştir.",
          "Çatalhöyük haritada Konya-Çumra ile gösterilmiş; yer alanı uyuşmaz.",
          "Sardes bu iki harita koşulunun verildiği yer değildir; Lidya bağlamında öğrenilir.",
          "Tuşpa Urartu merkeziyle ilişkilidir; verilen Diyarbakır-üretime geçiş kaydı değildir.",
          "Hattuşa Hitit merkeziyle ilişkilidir; kartta verilen iki koşulu karşılamaz.",
        ],
        knowledge:
          "Çayönü Diyarbakır çevresindeki erken üretim ve yerleşme, Çatalhöyük Konya-Çumra konut dokusuyla ilişkilendirilir.",
        strategy: "Yer adıyla buluntu bağını aynı kartta birlikte denetle.",
        error:
          "Anadolu’daki bütün erken yerleşmeleri aynı şehir ve işlev altında toplamak.",
        check: "Seçtiğin alan hem coğrafya hem üretim koşuluna uyuyor mu?",
      },
      {
        passage:
          "Bir kazıda üzeri işaretli kil tablet bulunuyor. Henüz işaretler okunmamış ve içerik hakkında güvenilir çeviri yapılmamıştır. Araştırmacı tabletin maddi biçimini belgeleyebiliyor; borç, ürün veya başka bir konuyu kaydettiğini henüz bilmiyor.",
        prompt: "Bu aşamada hangi tutum uygundur?",
        options: [
          "Maddi buluntuyu koruyup içeriğe ilişkin hüküm için yazının okunmasını ve bağlam denetimini beklemek.",
          "Kil tablet olduğu için içeriğinin kesinlikle yalnız tahıl borcu olduğunu söylemek.",
          "Yazı okunmadığından maddi buluntunun da hiç var olmadığını kabul etmek.",
          "İşaretlerin biçimine bakmadan tabletin bütün toplumun eşitliğini kanıtladığını söylemek.",
          "Henüz çeviri olmamasını o toplumda hiçbir kayıt düzeni bulunmadığının kesin kanıtı yapmak.",
        ],
        steps: [
          "Eldeki maddi nesneyle henüz bilinmeyen içerik alanını ayır.",
          "Borç veya ürün bilgisi için okunmuş içerik verilmediğini kontrol et.",
          "Nesneyi reddetmeden, bilinmeyen içeriği kesin hükümle doldurmayan tutumu seç.",
        ],
        reasons: [
          "Buluntunun varlığı korunur; içeriğin henüz belirlenmediği sınırı aşılmaz.",
          "Malzemenin kil olması belirli bir içerik konusunu tek başına göstermez.",
          "Okuma eksikliği fiziksel nesnenin varlığını ortadan kaldırmaz.",
          "İşaretli nesne toplumsal eşitliğin bütün koşullarını bildirmez.",
          "Henüz okunmamış tek örnek kayıt düzeninin tüm yokluğunu kanıtlamaz.",
        ],
        knowledge:
          "Yazı yüzeyi ve işaretlerin varlığı, okunmamış metne belirli içerik atamaya tek başına yetmez.",
        strategy:
          "Buluntu biçimi ile henüz çözülmemiş metin içeriğini ayrı değerlendir.",
        error:
          "Kil tablet sözcüğünden okunmamış metne hazır borç veya ürün içeriği atamak.",
        check:
          "İddia ettiğin konuyu söyleyen güvenilir bir okuma gerçekten verilmiş mi?",
      },
      {
        passage:
          "Bir yazı tarihi dosyası, bir alfabe geleneğinin başka bir dili yazmak için yeni işaret ve kurallarla uyarlandığını bildiriyor. Dosya aktarımın ardından yerel dilin ihtiyaçlarına göre değişiklik yapıldığını açıkça belirtiyor.",
        prompt: "Bu kayıt kültürel aktarım için hangi yorumu destekler?",
        options: [
          "Alınan yazı tekniği yeni dilin ihtiyaçlarına göre değiştirilerek kullanılabilir.",
          "Aktarım varsa bütün işaretler her toplumda mutlaka değişmeden kalır.",
          "Yerel değişiklik yapılması önceki gelenekle hiçbir ilişki bulunmadığını kanıtlar.",
          "Bir alfabe uyarlanması bütün dillerin aynı anda tek dile dönüştüğünü gösterir.",
          "Yeni işaret eklenmesi bütün yazı türlerinin ilk kez o toplumda bulunduğu anlamına gelir.",
        ],
        steps: [
          "Dosyanın hem önceki gelenekten aktarımı hem yerel uyarlamayı verdiğini ayır.",
          "Değişiklik yapılması aktarımı, aktarım da yerel değişikliği zorunlu olarak dışlamaz.",
          "İki eylemi birlikte koruyup değişmez kopya veya bütün yazının ilk icadı iddiası ekleme.",
        ],
        reasons: [
          "Gövde, kültürel aktarım ile dil ihtiyacına göre değişikliği birlikte vermiştir.",
          "Metin yerel değişiklikleri açıkça bildirdiği için değişmezlik zorunluluğu yanlıştır.",
          "Uyarlama önceki gelenekle ilişkinin sürmesiyle birlikte mümkündür.",
          "Yazı tekniğinin kullanımı bütün dillerin aynılaşmasını gerektirmez.",
          "Uyarlama ve işaret ekleme bütün yazıların ilk icadını göstermez.",
        ],
        knowledge:
          "Yazı gelenekleri aktarılırken dil ve kullanım ihtiyaçlarına göre değişebilir; aktarım değişmez kopya değildir.",
        strategy:
          "Aktarım ile uyarlama fiillerini birbirini yok etmeden birlikte değerlendir.",
        error:
          "Teknik aktarımını her işaretin ve her dilin değişmeden kalması diye yorumlamak.",
        check:
          "Sonucun hem önceki gelenek bağını hem yerel değişikliği içeriyor mu?",
      },
      {
        passage:
          "Bir Sümer yerleşmesi dosyasında ziggurat basamaklı tapınak yapısı olarak tanımlanmış. Tapınak çevresinde ürün depolama, kayıt ve eğitimle ilişkili veriler de bulunuyor. Dosya her katın her dönemde aynı işte kullanıldığını söylemiyor.",
        prompt: "Bu dosya hangi yorumu destekler?",
        options: [
          "Tapınak çevresi dinî yapı yanında ekonomik ve kayıtla ilişkili işlevler de taşıyabilir.",
          "Ziggurat yalnız hükümdar mezarıdır; tapınak tanımı bırakılmalıdır.",
          "Depolama kaydı bulunduğu için tapınakla bütün bağ kesinlikle yoktur.",
          "Dosya her katın bütün dönemlerde aynı işlevde kaldığını kanıtlar.",
          "Eğitim verisi bulunduğu için yerleşmenin bütün halkı aynı eğitimi almıştır.",
        ],
        steps: [
          "Yapının tapınak tanımını, çevresindeki depolama-kayıt-eğitim verilerinden ayrı fakat ilişkili tut.",
          "Birden fazla işlevin aynı çevrede bulunabileceğini kabul et.",
          "Bütün katlar, bütün dönemler veya bütün halk için verilmemiş genellemeleri ekleme.",
        ],
        reasons: [
          "Tapınak çevresindeki farklı işlev verileri bu sınırlı birlikte varlığı destekler.",
          "Gövde zigguratı tapınak olarak tanımlar; yalnız mezar diye değiştirmek veriye aykırıdır.",
          "Ekonomik işlevler tapınak niteliğini zorunlu olarak ortadan kaldırmaz.",
          "Gövde böyle bir değişmezlik bilgisi vermediğini açıkça belirtir.",
          "Eğitimle ilişkili veri toplumdaki herkesin aynı eğitimini kanıtlamaz.",
        ],
        knowledge:
          "Zigguratla ilişkili tapınak ekonomisi ve kayıt çevresi birden fazla işlev içerebilir; bütün yapı ve dönemlere aynı düzen genellenmez.",
        strategy:
          "Yapı tanımını ve çevresindeki işlevleri kapsamlarını koruyarak birleştir.",
        error:
          "Bir yapıyı yalnız tek işlevli saymak veya bütün kat ve dönemlere tek biçim dayatmak.",
        check:
          "Gövdenin tanımını koruyup her yer ve zaman için aynı işlev iddiasından kaçındın mı?",
      },
      {
        passage:
          "Bir kronoloji dosyası Dicle-Fırat çevresinde farklı dönemlerde Sümer, Akad, Babil ve Asur siyasi oluşumlarını inceliyor. Dosya Mezopotamya sözcüğünü bu coğrafi bölge için kullanıyor; tek ve değişmeyen devlet adı olarak tanımlamıyor.",
        prompt: "Bu dosyada bölge ile siyasi oluşum ayrımı nasıl korunur?",
        options: [
          "Mezopotamya ortak coğrafi bağlam; sayılan oluşumlar farklı tarihsel siyasi yapılardır.",
          "Sayılan dört ad tek hükümdarın aynı dönemdeki dört unvanıdır.",
          "Ortak coğrafya bütün yönetimlerin her yüzyılda aynı kaldığını gösterir.",
          "Babil adının bulunması Dicle-Fırat çevresinin coğrafya olarak varlığını geçersiz kılar.",
          "Bir bölgede birden çok siyasi oluşum incelenmesi kronoloji kurulamayacağı anlamına gelir.",
        ],
        steps: [
          "Mezopotamya için verilen tanımı coğrafi bölge olarak belirle.",
          "Sayılan adların farklı dönemlerdeki siyasi oluşumlar olarak verildiğini koru.",
          "Ortak yerden tek devlet veya değişmez yönetim sonucu çıkarma.",
        ],
        reasons: [
          "Dosyanın bölge ve siyasi oluşum sınıflaması bu seçenekte doğru korunur.",
          "Gövde tek kişi ve unvanlar değil, farklı dönemlerdeki siyasi oluşumlar vermektedir.",
          "Mekân ortaklığı yönetimlerin tarih boyunca aynı kalmasını gerektirmez.",
          "Bir siyasi merkez adı bölgenin coğrafi tanımını ortadan kaldırmaz.",
          "Farklı dönemler kronolojinin inceleme alanıdır; sıralamayı imkânsızlaştırmaz.",
        ],
        knowledge:
          "Mezopotamya coğrafi bölgedir; onun farklı siyasi oluşumlarla ilişkisi tek ve değişmez devlet kimliği değildir.",
        strategy:
          "Bölge adını dönemlere göre değişen siyasi aktörlerden ayrı tut.",
        error:
          "Ortak coğrafyadaki farklı oluşumları tek ve sürekli devlet sanmak.",
        check: "Sonucun coğrafya ile siyasi kimliği birbirine dönüştürüyor mu?",
      },
      {
        passage:
          "Bir Hitit belgesi, kralın seferlerini ve başka faaliyetlerini yıllara göre sıralayan krallık anlatısıdır. Araştırmacı metnin hangi belge türüyle ilişkilendirildiğini soruyor; ticaret merkezi, eyalet, tapınak veya dokuma ürünü aramıyor.",
        prompt: "Bu tür krallık yıllıkları hangi adla ilişkilendirilir?",
        options: [
          "Anallar.",
          "Karumlar.",
          "Satraplıklar.",
          "Zigguratlar.",
          "Tapatesler.",
        ],
        steps: [
          "Verilen nesnenin yıllara göre düzenlenen yazılı krallık anlatısı olduğunu belirle.",
          "Hitit bağlamındaki bu yıllıklar anal adıyla ilişkilendirilir.",
          "Belge türünü ticaret merkezi, idari birim, yapı veya dokuma ürünüyle değiştirme.",
        ],
        reasons: [
          "Anal, Hititlerdeki krallık yıllıklarıyla ilişkilendirilen belge türüdür.",
          "Karum ticari örgütlenme ve merkez bağlamıdır; krallık yıllığı adı değildir.",
          "Satraplık eyalet yönetim birimidir; yıllık belge türü değildir.",
          "Ziggurat basamaklı tapınak yapısıdır; krallık anlatısının adı değildir.",
          "Tapates dokuma/halı-kilim bağlamında öğrenilir; yıllık belge türü değildir.",
        ],
        knowledge:
          "Hitit analları krallık faaliyetlerini yıllara göre anlatan kaynaklarla ilişkilidir; kurum ve ürün adlarından ayrılır.",
        strategy:
          "İstenen şeyin belge türü olduğunu belirleyip seçenekleri nesne türüne göre karşılaştır.",
        error:
          "Tarihsel bir metnin adını aynı döneme ait herhangi bir kurum veya ürün adıyla değiştirmek.",
        check:
          "Seçtiğin kavram gerçekten yıllara göre düzenlenmiş krallık anlatısını mı adlandırıyor?",
      },
      {
        passage:
          "Bir Urartu yerleşmesinin yakınındaki kanallar, suyu tarım alanlarına ulaştıracak biçimde düzenlenmiştir. İncelenen dosya kanal güzergâhı ile tarlaların bağlantısını gösteriyor; bütün kanalların askeri amaçla yapıldığını söylemiyor.",
        prompt: "Dosyanın doğrudan desteklediği işlev hangisidir?",
        options: [
          "Tarımsal üretim için suyun tarlalara ulaştırılması.",
          "Bütün uzak ticaretin yalnız deniz yoluyla yapılması.",
          "Her kanalın yalnız saray savunmasına ayrılması.",
          "Yazının o gün ilk kez bulunması.",
          "Her yerleşmenin aynı miktarda ürün yetiştirmesi.",
        ],
        steps: [
          "Kanalın ulaştığı yeri tarlalar olarak belirle.",
          "Su ile üretim alanı arasındaki açık bağlantıyı kullan.",
          "Bu işlevi seç; dosyada bulunmayan bütün toplum genellemelerini ekleme.",
        ],
        reasons: [
          "Kanal-tarla bağlantısı tarımda su kullanımını doğrudan destekler.",
          "Dosya deniz yolu veya bütün ticaretin güzergâhını vermiyor.",
          "Yalnız savunma iddiası açık tarla bağlantısını yok sayar.",
          "Su yapısının işlevi yazının başlangıcını tarihlendirmez.",
          "Kanal bulunması bütün yerleşmelerin eşit üretim yaptığı anlamına gelmez.",
        ],
        knowledge:
          "Urartu su yapıları, yerel bağlamlarıyla tarımsal üretim ve su yönetimi bakımından incelenebilir.",
        strategy: "Yapının nereye hizmet ettiğini veriden çıkar.",
        error:
          "Bir su yapısını bütün siyasi ve ekonomik düzenin tam kanıtı yapmak.",
        check: "Seçimin kanalın açıkça bağlandığı alanı koruyor mu?",
      },
      {
        passage:
          "Bir müze metni, Lidyalılarla ilişkilendirilen sikke kullanımını belirli ağırlık ve değer ölçülerini görünür kılan bir değişim aracı olarak anlatıyor. Aynı metin sikke öncesinde de mal değişimi bulunduğunu belirtiyor.",
        prompt: "Bu metinden hangi sonuç çıkarılabilir?",
        options: [
          "Sikke, daha önce var olan değişim ilişkilerinde ölçü ve ödeme uygulamalarını kolaylaştırabilir.",
          "İnsanlar sikke ortaya çıkmadan önce hiçbir mal değiştirmemiştir.",
          "Sikke bulunması bütün mal fiyatlarının her yerde aynı olduğunu kanıtlar.",
          "Sikke kullanılması tarımsal üretimi zorunlu olarak tamamen bitirir.",
          "Bir sikke örneği bütün ticaretin yalnız bir şehirde yapıldığını gösterir.",
        ],
        steps: [
          "Sikke öncesi mal değişiminin açıkça kabul edildiğini gör.",
          "Sikkenin verilen katkısını ölçü ve ödeme uygulaması olarak belirle.",
          "Kolaylaştırma ile ticareti sıfırdan başlatma iddialarını ayır.",
        ],
        reasons: [
          "Yeni araç, daha önce bulunan değişim ilişkisine belirli bir işlev ekler.",
          "Bu seçenek metnin sikke öncesi değişim bilgisiyle çelişir.",
          "Ölçü aracı bulunması bütün yerlerin fiyat eşitliği değildir.",
          "Ödeme aracı ile tarımın zorunlu olarak son bulması arasında verilen bir bağ yoktur.",
          "Tek nesne bütün ticaretin tek şehirde toplandığını kanıtlamaz.",
        ],
        knowledge:
          "Sikke kullanımı ticarette ödeme ve standartlaştırma bakımından önemlidir; ticaretin bütün tarihi sikkeyle başlamaz.",
        strategy: "Yeni aracın katkısını önceki faaliyetin varlığından ayır.",
        error: "Sikkeyi bütün değişim faaliyetinin mutlak başlangıcı saymak.",
        check: "Önceden var olan mal değişimini cevabın siliyor mu?",
      },
      {
        passage:
          "Kurmacalaştırılmış bir Pers yönetim dosyasında bölge yöneticileri merkez tarafından atanıyor; ayrıca merkezden gelen görevliler bölgesel uygulamaları denetliyor. Bölge yöneticilerine satrap deniyor. Dosyada bu kişilerin merkezden bütünüyle bağımsız olduğu yazmıyor.",
        prompt:
          "Atama ile denetimin birlikte verilmesi hangi yorumu destekler?",
        options: [
          "Bölgeler aracılığıyla yönetim kurulurken merkezle idari bağın sürdürülmesi amaçlanmaktadır.",
          "Her satrapın merkezden bağımsız ayrı bir egemen devlet kurduğu kesinleşmiştir.",
          "Bölge görevlileri yalnız halk oylamasıyla seçilmiştir.",
          "Merkez hiçbir taşra uygulamasını izleyememektedir.",
          "Denetim varsa bölgesel görevlilerin bulunması mantıken imkânsızdır.",
        ],
        steps: [
          "Satrapın bölgesel yönetici olduğunu belirle.",
          "Merkezin atama ve denetim araçlarını aynı dosyada birleştir.",
          "Bölgesel örgütlenme ile tam bağımsızlığı eş anlamlı sayma.",
        ],
        reasons: [
          "Atama ve denetim, bölgesel yönetimin merkezle bağını açıkça gösterir.",
          "Veriler bağımsız devlet ilanını değil merkezin iki denetim aracını anlatır.",
          "Halk oylaması verilmemiş; atama açıkça merkeze bağlanmıştır.",
          "Merkezden gelen denetim görevlileri bu iddiayla çelişir.",
          "Denetlenen bir bölgesel görevlinin bulunması tutarlıdır; iki araç birlikte işleyebilir.",
        ],
        knowledge:
          "Satraplık, Pers bağlamında bölgesel yönetimdir; merkezî atama ve denetim tam siyasi bağımsızlıkla karıştırılmaz.",
        strategy:
          "Yönetimin bölgesel örgütünü, merkezin uyguladığı araçlarla birlikte oku.",
        error: "Taşra yöneticisini kendiliğinden bağımsız hükümdar saymak.",
        check:
          "Atama ve denetim bilgisini seçeneğin ikisiyle de bağdaştırdın mı?",
      },
      {
        passage:
          "Bir antik polisin kurmaca kuralında karar toplantısına yalnız belirli statüdeki yetişkin erkek yurttaşların katılabildiği yazıyor. Kadınlar, köleler ve yurttaş statüsünde olmayan yerleşikler bu toplantıya katılamıyor. Soru yalnız bu kuralın katılım kapsamını soruyor.",
        prompt: "Hangi değerlendirme kuralla uyumludur?",
        options: [
          "Katılım belirli bir yurttaş grubuyla sınırlıdır; bütün yetişkinlere yaygın oy hakkı olarak sunulamaz.",
          "Yerleşimde yaşayan bütün yetişkinler aynı karar hakkına sahiptir.",
          "Toplantının bulunması hiçbir kişinin karar sürecine katılmadığını gösterir.",
          "Dışarıda bırakılanların tümünün başka bir şehirde yaşadığı kanıtlanmıştır.",
          "Kuralda belirtilen statü ayrımları katılım bakımından hiçbir fark yaratmaz.",
        ],
        steps: [
          "Katılabilen grubu belirli statüdeki erkek yurttaşlarla sınırla.",
          "Açıkça dışarıda bırakılan grupları da hesaba kat.",
          "Katılım varlığını korurken kapsamı bütün yetişkinlere genişletmeyen seçeneği seç.",
        ],
        reasons: [
          "Hem toplantıya katılım hem bu hakkın verilen sınırları korunur.",
          "Bu seçenek açıkça dışlanan grupları da hak sahibi sayar.",
          "Bazı yurttaşların katılması hiç kimsenin katılmaması değildir.",
          "Katılım dışında olmak başka şehirde yaşamanın kanıtı değildir.",
          "Kural statüyü doğrudan katılım koşulu yapmaktadır.",
        ],
        knowledge:
          "Antik siyasal katılım biçimleri kendi yurttaşlık sınırlarıyla incelenir; modern genel oyla özdeşleştirilmez.",
        strategy:
          "Katılımın varlığını ve katılan kitlenin kapsamını ayrı denetle.",
        error: "Toplantı varlığından bütün yetişkinlerin eşit oyunu çıkarmak.",
        check: "Dışlanan gruplar değerlendirmende hâlâ görünür mü?",
      },
      {
        passage:
          "Bir geçiş dönemi araştırmasında yerleşim yıkımı, kuraklık bulguları, ticaret ağındaki aksamalar ve dışarıdan gelen gruplarla ilgili kayıtlar birlikte inceleniyor. Dosya her bulgunun aynı tarihte ve aynı şiddette olduğunu henüz doğrulamamıştır.",
        prompt: "Bu dosya üzerinde hangi araştırma yolu uygundur?",
        options: [
          "Olası etkenleri ayrı tarihlendirip aralarındaki somut bağlantıları araştırmak.",
          "Dış gruplar geçtiği için öteki bütün verileri incelemeden tek neden ilan etmek.",
          "Kuraklık verisi varsa bütün yerleşimlerin aynı gün yıkıldığını söylemek.",
          "Birden çok veri bulunduğundan hiçbir açıklama araştırılamayacağını kabul etmek.",
          "Ticaret aksaması ile yıkımın aynı kelime olduğunu varsaymak.",
        ],
        steps: [
          "Dosyanın birden çok olası etken sunduğunu gör.",
          "Tarih ve bağlantıların henüz tamamlanmadığı sınırı koru.",
          "Tek neden ilan etmek yerine her kanıtı ve bağlantısını ayrı sınamayı seç.",
        ],
        reasons: [
          "Çok etkenli dosyada zaman ve bağlantı denetimi eksik halkaları araştırır.",
          "Bir etkenin varlığı diğerlerinin payını araştırmadan silemez.",
          "Kuraklık bulgusu bütün yıkımların aynı güne ait olduğunu bildirmez.",
          "Çok veri araştırmayı engellemez; veriler sınıflanarak sınanabilir.",
          "Ticaret sorunu ile fiziksel yıkım farklı olaylardır; ilişkileri araştırılır.",
        ],
        knowledge:
          "Geçiş ve çöküş süreçleri tek bir göç veya tek bir doğa olayıyla otomatik açıklanmaz.",
        strategy:
          "Veri çeşitlerini, tarihlerinin ve ilişkilerinin doğrulanma düzeyinden ayır.",
        error: "Bir bulguyu diğer bütün etkenlerin yokluğu saymak.",
        check:
          "Seçimin araştırılmamış tarih ve neden bağlarını peşinen kesinleştiriyor mu?",
      },
      {
        passage:
          "Bir yerleşimde bulunan obsidyenin kimyasal özellikleri uzak bir kaynak bölgeyle eşleşiyor. Dosya taşın el değiştirmiş olabileceğini belirtiyor; taşıyan kişilerin kimliği ve bütün yerleşim halkının nereden geldiği hakkında başka veri vermiyor.",
        prompt: "Hangi çıkarım bu aşamada en doğrudan desteklenir?",
        options: [
          "Malzemenin kaynak bölgeden yerleşime ulaşmış olması; insanların göçü için ayrıca kanıt aranması.",
          "Yerleşimdeki bütün insanların kaynak bölgeden topluca göç ettiği.",
          "İki bölge arasında hiçbir nesne hareketi bulunmadığı.",
          "Nesneyi yalnız tek bir adı bilinen kişinin taşıdığı.",
          "Malzemenin uzak kökenli olmasının yerleşimin kesin kuruluş yılını verdiği.",
        ],
        steps: [
          "Kimyasal eşleşmenin malzemenin kaynağına ilişkin olduğunu belirle.",
          "Taşıyan kişilerin kimliğinin verilmediğini not et.",
          "Nesne hareketini kabul et; bunu bütün halkın göçüne çevirmeyen seçeneği seç.",
        ],
        reasons: [
          "Malzemenin ulaşması desteklenirken insan hareketinin kapsamı açık bırakılır.",
          "Bütün halkın kökeni için verilmemiş nüfus ve göç kanıtı ekleniyor.",
          "Uzak kaynaklı nesnenin varlığı nesnenin ulaşmış olduğunu gösterir.",
          "Dosyada tek taşıyıcı kişinin adı yoktur.",
          "Kaynak eşleşmesi tek başına bir kuruluş yılı üretmez.",
        ],
        knowledge:
          "Mal dolaşımı ile kitlesel nüfus hareketi ayrı iddialardır; biri ötekinin kapsamını tek başına kanıtlamaz.",
        strategy: "Kanıtın nesneye mi insana mı ait olduğunu ayır.",
        error: "Uzak nesneyi bütün topluluğun ortak kökeni saymak.",
        check: "Kişi kimliği için metinde gerçekten bir kayıt var mı?",
      },
      {
        passage:
          "Bir tarih metni, eski Hindistan’daki belirli bir toplumsal düzeni doğumla ilişkilendirilen gruplar, gruplar arası geçiş sınırlamaları ve farklı statüler üzerinden anlatıyor. Metin her Hint topluluğunun bütün çağlarda aynı ayrıntılarla yaşadığını iddia etmiyor.",
        prompt: "Bu anlatım hangi kavram ve kapsamla eşleşir?",
        options: [
          "Kast bağlamındaki kalıtsal statü ayrımlarıyla; metnin belirttiği tarihsel düzen sınırı korunarak.",
          "Her yetişkinin bütün görevlere hiçbir koşul olmadan geçebildiği genel hareketlilikle.",
          "Roma’daki bütün yöneticilerin seçim tarihiyle.",
          "Mezopotamya’daki bütün şehirlerin tek başkentte birleşmesiyle.",
          "Her toplumda hiçbir statü ayrımı bulunmadığı iddiasıyla.",
        ],
        steps: [
          "Doğumla ilişkilendirilmiş statü ve geçiş sınırı verilerini birlikte oku.",
          "Bu özellikleri kast bağlamıyla eşleştir.",
          "Tarihsel kapsamı bütün çağ ve bütün topluluklara taşımadan koru.",
        ],
        reasons: [
          "Kavram açık statü özelliklerine uyar ve metnin kapsam sınırını sürdürür.",
          "Sınırsız geçiş, verilen hareketlilik kısıtlarıyla çelişir.",
          "Dosya Roma yönetici seçimini anlatmamaktadır.",
          "Verilen özellikler siyasi merkez sayısı değil toplumsal statüyle ilgilidir.",
          "Doğumla bağlı farklı statüler, ayrımın hiç bulunmadığı iddiasını dışlar.",
        ],
        knowledge:
          "Kast, Hint tarihi bağlamında kalıtsal toplumsal statü ve hareketlilik sınırlarıyla incelenir.",
        strategy:
          "Kavramı iki ayırt edici özellikten tanı, kapsamını gereksiz genişletme.",
        error:
          "Bir tarihsel düzenin bilgisini bütün topluluk ve çağlara değişmez yasa yapmak.",
        check: "Hem doğum bağı hem geçiş sınırı seçeneğinde karşılanıyor mu?",
      },
      {
        passage:
          "Bir öğretim tablosunda Asur tüccarlarının Anadolu içlerine uzanan kara bağlantıları, Fenike kentlerinin ise Akdeniz limanları arasındaki deniz bağlantıları gösteriliyor. Tablo hiçbiri için bütün dünya ticaretini tek başına denetleme iddiası kullanmıyor.",
        prompt: "Bu iki örnek hangi ortaklık ve farkla okunmalıdır?",
        options: [
          "İkisi de ticari ağdır; gösterilen başlıca güzergâh türleri kara ve deniz olarak farklıdır.",
          "Biri ticaretse ötekinin ticaret olması mantıken imkânsızdır.",
          "Her iki ağın bütün dünyada aynı tek limanı kullandığı kanıtlanmıştır.",
          "Kara ve deniz sözcükleri iki toplumun aynı siyasi devlet olduğunu gösterir.",
          "Tablo her iki toplumun da hiçbir mal değişimi yapmadığını söyler.",
        ],
        steps: [
          "İki ağın da mal değişimi bağlantıları olduğunu belirle.",
          "Asur için kara, Fenike için deniz ağı vurgusunu karşılaştır.",
          "Ortak faaliyeti koruyup güzergâh farkını silmeyen seçeneği seç.",
        ],
        reasons: [
          "Ortak ticari işlev ve açık güzergâh farkı birlikte korunur.",
          "Aynı faaliyetin farklı aktörlerce yapılması çelişki değildir.",
          "Tek küresel liman veya dünya tekeli verilmemiştir.",
          "Ulaşım türü aynı siyasi devlete aidiyet ölçütü değildir.",
          "Ticari ağ verisi mal değişiminin yokluğu anlamına gelmez.",
        ],
        knowledge:
          "Asur kara ticareti ile Fenike deniz ağları ortak ticari işlev altında farklı coğrafi örgütler olarak karşılaştırılır.",
        strategy: "Ortak işlev ile araç ve güzergâh farkını ayrı belirt.",
        error: "Bir ticaret ağını bütün dünya üzerinde değişmez tekel saymak.",
        check: "Ortaklık kurarken kara-deniz farkı kayboldu mu?",
      },
      {
        passage:
          "Kurmacalaştırılmış eski bir hukuk kaydında bir suçun yaptırımı yalnız faili değil, suçu işlemediği açıkça belirtilen aile üyelerini de cezalandırmaktadır. Bu soru yalnız yaptırımın kime yöneldiğini sorar; kaydı bütün eski hukukların ortak kuralı saymaz.",
        prompt: "Kayıttaki ayırt edici özellik hangisidir?",
        options: [
          "Yaptırımın fail dışındaki aile üyelerine de yayılması, yani kolektif cezalandırma.",
          "Yalnız failin kişisel sorumluluğunun gözetilmesi.",
          "Hiç kimseye yaptırım uygulanmaması.",
          "Cezanın yalnız para olarak ve yalnız failden alınacağının açıkça yazılması.",
          "Bütün kişilerin aynı siyasi göreve seçilmesi.",
        ],
        steps: [
          "Suçu işleyen fail ile işlemediği belirtilen aile üyelerini ayır.",
          "Yaptırımın her iki gruba yöneldiğini tespit et.",
          "Bu kapsamı kolektif cezalandırma olarak adlandır; bütün hukuklara genelleme yapma.",
        ],
        reasons: [
          "Açık kayıt, yaptırımı failin dışındaki aileye de yaymaktadır.",
          "Aile üyelerinin de cezalandırılması yalnız kişisel sorumlulukla uyuşmaz.",
          "Dosya yaptırımın bulunduğunu açıkça söylemektedir.",
          "Yaptırımın yalnız para ve yalnız failden alınması verilmediği gibi aile kapsamını da siler.",
          "Siyasi göreve seçilme, verilen cezanın kapsamıyla ilgili değildir.",
        ],
        knowledge:
          "Kişisel sorumluluk ile kolektif cezalandırma, yaptırımın kimlere uygulandığı üzerinden ayrılır.",
        strategy: "Yaptırım türünden önce cezalandırılan kişi kapsamını oku.",
        error:
          "Bir dosyanın yaptırımını bütün eski hukukların değişmez özelliği saymak.",
        check: "Fail dışındaki açık aile kapsamını cevabında korudun mu?",
      },
      {
        passage:
          "Yazılı belge bulunmayan kurmaca bir topluluğa ilişkin gözlem dosyası, ortak kullanım alanı için sözlü kurallar aktarıldığını ve ihlallerde topluluğun belirlediği yaptırım uygulandığını bildiriyor. Soru bu dosyada kuralın yazılı olup olmaması ile kuralın varlığını ayırmayı ister.",
        prompt: "Hangi sonuç dosyayla uyumludur?",
        options: [
          "Yazılı kayıt bulunmasa da sözlü kural ve yaptırım düzeni bulunabilir.",
          "Yazılı belge yoksa hiçbir toplumsal kuralın bulunması mümkün değildir.",
          "Sözlü aktarım varsa yaptırımın da bulunmadığı kesindir.",
          "Dosya bütün kuralların taş levhaya kazındığını göstermektedir.",
          "Bir sözlü kuralın varlığı bütün kişilerin her alanda eşit hakka sahip olduğunu kanıtlar.",
        ],
        steps: [
          "Yazılı belge yokluğu ile sözlü kural varlığının birlikte verildiğini gör.",
          "Dosyada ayrıca yaptırımın da bildirildiğini belirle.",
          "Kuralın varlığı ile yazıya geçirilmesini eş anlamlı saymayan sonucu seç.",
        ],
        reasons: [
          "Dosya yazısız aktarımın kural ve yaptırımla birlikte bulunabildiğini açıkça örnekler.",
          "Bu seçenek açık sözlü kural verisini imkânsız saymaktadır.",
          "Yaptırımın bulunduğu gövdede açıkça belirtilmiştir.",
          "Taş levhaya yazı bilgisi verilmemiş; yazılı belge yokluğu belirtilmiştir.",
          "Kuralın varlığı bütün hakların kapsam ve eşitliğinin tam kanıtı değildir.",
        ],
        knowledge:
          "Toplumsal kurallar sözlü aktarılabilir; yazılı hukuk, kural varlığının tek mümkün biçimi değildir.",
        strategy: "Kaydın biçimini kural ve yaptırımın varlığından ayır.",
        error: "Yazı yokluğunu toplumsal düzenin zorunlu yokluğu yapmak.",
        check:
          "Sözlü aktarım ve yaptırım bilgilerini aynı anda hesaba kattın mı?",
      },
    ],
  },
];

function shuffle026<T>(values: readonly T[], seed: number) {
  const out = [...values];
  let value = seed >>> 0;
  for (let i = out.length - 1; i > 0; i--) {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    const j = value % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const forge026HistoryLegacyIds = historyPacks026.map((p) => p.id);
export const forge026HistoryTopics: Record<string, string> = Object.fromEntries(
  historyPacks026.flatMap((p) => [
    [p.id, p.topic],
    [p.id + "-ileri", p.topic],
  ]),
);
export const forge026HistoryGuides: LessonGuide[] = historyPacks026.map(
  (p) => ({
    id: p.id,
    minutes: p.minutes,
    objectives: p.objectives,
    sections: p.sections,
    examples: p.examples,
    recall: p.recall,
    source: historySource026,
  }),
);
export const forge026HistoryLessons: Lesson[] = historyPacks026.map(
  (p, group) => {
    const targets = shuffle026(
      p.items.map((_, i) => i % 5),
      26951 + group * 1429,
    );
    return {
      id: p.id + "-ileri",
      subjectId: "tyt-tarih",
      title: txt(p.title + ": ileri uygulama"),
      minutes: 40,
      objectives: p.objectives.map(txt),
      body: [
        {
          title: txt("Özgün ileri soru seti"),
          text: txt(
            "Her kart kendi kanıtını ve gereken koşulları içerir. Etkinliğin son seçimine dayanmaz. Önce hangi bilginin verildiğini ve hangi sonucun istendiğini belirle; sonra zaman, kurum, kaynak ve kapsam bağını ayrı denetle.",
          ),
        },
      ],
      source: txt(historySource026),
      tags: [p.topic, "Özgün öğretim soruları", "ileri-soru-seti"],
      questions: p.items.map((c, i): Question => {
        const target = targets[i];
        const wrong = shuffle026([1, 2, 3, 4], 1643 + group * 977 + i * 43);
        const order = Array.from({ length: 5 }, (_, k) =>
          k === target ? 0 : wrong.shift()!,
        );
        return {
          id: `f026h-${p.id}-${i + 1}`,
          passage: txt(c.passage),
          prompt: txt(c.prompt),
          options: order.map((k) => txt(c.options[k])),
          answer: target,
          hint: txt(c.steps[0]),
          explanation: txt(c.steps.join(" ") + " " + c.reasons[0]),
          skill: p.id,
          guidance: {
            knowledge: [c.knowledge],
            strategy: c.strategy,
            steps: c.steps,
            optionReasons: order.map((k) => c.reasons[k]),
            commonError: c.error,
            check: c.check,
          },
        };
      }),
    };
  },
);
export const forge026HistoryAdvancedLessons = forge026HistoryLessons;
