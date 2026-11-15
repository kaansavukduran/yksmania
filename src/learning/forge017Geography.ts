import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";
const bound = (n: number, min: number, max: number) => {
  if (!Number.isFinite(n) || n < min || n > max)
    throw new RangeError("GEOGRAPHY_017_RANGE");
  return n;
};
function pick<T extends object>(map: T, key: string): T[keyof T] {
  if (!Object.hasOwn(map, key)) throw new RangeError("GEOGRAPHY_017_KEY");
  return map[key as keyof T];
}
export const basins017 = {
  aras: {
    name: "Aras–Kura",
    end: "Hazar",
    closed: true,
    cross: true,
    route: "Türkiye → sınır ötesi → Hazar",
    proof:
      "Sınırı geçmek açık havza olmak değildir. Hazar, dünya okyanusuna doğal yüzey çıkışı olmayan kapalı alıcıdır.",
  },
  firat: {
    name: "Fırat–Dicle",
    end: "Basra Körfezi",
    closed: false,
    cross: true,
    route: "Türkiye → sınır ötesi → Basra Körfezi",
    proof:
      "Denize ulaşan son alıcı bu örnekte açık havzayı destekler; birden çok ülkeyi geçmesi ayrı bir özelliktir.",
  },
  coruh: {
    name: "Çoruh",
    end: "Karadeniz",
    closed: false,
    cross: true,
    route: "Türkiye → Gürcistan → Karadeniz",
    proof:
      "Çoruh Türkiye’den çıkar ve Gürcistan üzerinden denize ulaşır. Akarsu adı, ülke sınırı ve deniz aynı tür düğüm değildir.",
  },
  kizil: {
    name: "Kızılırmak",
    end: "Karadeniz",
    closed: false,
    cross: false,
    route: "Türkiye içi → Karadeniz",
    proof:
      "Kaynağı ve denize kavuştuğu kesim Türkiye içindedir. Dünya okyanusuna bağlı deniz son alıcıdır.",
  },
  konya: {
    name: "Konya çevresi",
    end: "İç kesimde kapalı alan",
    closed: true,
    cross: false,
    route: "İç akış → kapalı çukur",
    proof:
      "Denize doğal yüzey çıkışı olmayan iç havza seçilidir. Kapalı havza her mevsim büyük bir göl var demek değildir.",
  },
  meric: {
    name: "Meriç",
    end: "Ege Denizi",
    closed: false,
    cross: true,
    route: "Sınır ötesinden → sınır çevresi → Ege",
    proof:
      "Meriç dışarıda doğup Türkiye sınırı çevresine ulaşır. Sınır aşan her akarsu Türkiye’de doğmaz.",
  },
} as const;
export function turkeyWater017(basin: string, regulated: boolean) {
  const b = pick(basins017, basin),
    season = regulated ? [25, 25, 25, 25] : [40, 30, 20, 10];
  return {
    ...b,
    regulated,
    season,
    total: 100,
    range: Math.max(...season) - Math.min(...season),
    limit:
      "Dört mevsim için toplamı 100 olan özgün temsilî akış birimleri; gerçek nehir ölçümü, yağış normali veya baraj işletme tahmini değildir.",
  };
}
export const soilLayers017 = {
  O: {
    name: "O: organik örtü",
    role: "Yüzeydeki organik kalıntılar; her profilde aynı kalınlıkta bulunmaz.",
  },
  A: {
    name: "A: üst mineral kat",
    role: "Mineral malzeme ve organik katkı birlikte; kökler ve canlı etkinliği önemlidir.",
  },
  E: {
    name: "E: yıkanma katı",
    role: "Bazı profillerde belirgin madde kaybı; her toprağın zorunlu katı değildir.",
  },
  B: {
    name: "B: alt toprak",
    role: "Bazı maddelerin birikimi veya yerinde değişim; her B yalnız kireç değildir.",
  },
  C: {
    name: "C: ana malzeme",
    role: "Daha az değişmiş ana malzeme; taşınmış veya yerinde oluşmuş olabilir.",
  },
  R: {
    name: "R: sağlam kaya",
    role: "Bu çizimde alttaki sağlam kaya. Okulun D adı aynı alt kaya için kullanılır.",
  },
} as const;
export const soilProfiles017 = {
  laterit: {
    name: "Sıcak ve nemli örnek",
    family: "Lateritleşme",
    layers: ["O", "A", "B", "C", "R"],
    proof:
      "Sıcak-nemli koşullarda güçlü ayrışma ve yıkanma etkilidir. Kırmızı renk tek başına bu adı kanıtlamaz; hızlı organik döngü yüzeyde az humus bırakabilir.",
  },
  podzol: {
    name: "Serin ve nemli örnek",
    family: "Podzollaşma",
    layers: ["O", "A", "E", "B", "C", "R"],
    proof:
      "Serin-nemli ve uygun bitki/ana malzeme koşulunda açık renkli yıkanma katı gelişebilir. İğne yapraklı her ormanın altı aynı toprak değildir.",
  },
  cernozem: {
    name: "Serin çayır örneği",
    family: "Çernozyom örneği",
    layers: ["O", "A", "B", "C", "R"],
    proof:
      "Çayır kökleri organik madde katkısı sağlar. Koyu humuslu üst kat, tek başına gerçek tarım veriminin veya bütün besinlerin yeterli oluşunun ölçüsü değildir.",
  },
  calc: {
    name: "Kurakça örnek",
    family: "Kireç birikimi örneği",
    layers: ["A", "B", "C", "R"],
    proof:
      "Yıkanmanın sınırlı olduğu uygun koşulda alt katta kireç birikimi görülebilir. Bütün kurak topraklar aynı tuz, doku ve gelişim geçmişine sahip değildir.",
  },
} as const;
export function worldSoil017(
  profile: string,
  layer: string,
  transported: boolean,
) {
  const p = pick(soilProfiles017, profile),
    l = pick(soilLayers017, layer),
    layers: string[] = transported ? ["A", "C", "R"] : [...p.layers];
  return {
    profile,
    layer,
    ...p,
    selected: l,
    layers,
    present: layers.includes(layer),
    transported,
    proof: transported
      ? "Yeni taşınıp biriken sade örnekte gelişmiş katlar henüz verilmedi. Zamanla yeni kat gelişimi olabilir; taşınmış her toprak sonsuza dek katsız değildir."
      : p.proof,
  };
}
export const turkeySoils017 = {
  alluvium: {
    name: "Vadi tabanı",
    family: "Alüvyal",
    cause: "Akarsu tortusu",
    proof:
      "Akarsu taşır ve biriktirir. Tane boyu, drenaj, tuz ve kullanım ayrıca bilinmeden yüksek verim garantisi yoktur.",
  },
  terra: {
    name: "Akdeniz kalkerli alan",
    family: "Terra rossa örneği",
    cause: "Ana kaya ve ayrışma",
    proof:
      "Kalkerli çevrede kırmızı Akdeniz toprağı örneği. Üst kattaki kireç yıkanmış olabilir; renk veya ana kaya tek başına bütün kimyayı vermez.",
  },
  forest: {
    name: "Nemli orman yamacı",
    family: "Orman toprağı örneği",
    cause: "Nem ve bitki örtüsü",
    proof:
      "Orman, nem, ana malzeme ve yamaç koşulları birlikte etkilidir. Bu nemli kıyıda her nokta aynı toprak değildir.",
  },
  steppe: {
    name: "İç kesim bozkır",
    family: "Kahverengi örnek",
    cause: "Kurakça iklim ve otlar",
    proof:
      "Kurakça bozkır çevresinde kahverengi toprak okul örneği. Vadi içinde alüvyon veya tuzlu kapalı alan bulunabilir.",
  },
  grass: {
    name: "Yüksek çayır alanı",
    family: "Çernozyom örneği",
    cause: "Çayır ve serin koşul",
    proof:
      "Yüksek çayırda uygun serin koşul humusu destekler. Uzun soğuk dönem ve eğim, tarım türü ile verimi ayrıca sınırlar.",
  },
} as const;
export function turkeySoil017(site: string, saline: boolean, drained: boolean) {
  return {
    ...pick(turkeySoils017, site),
    site,
    saline,
    drained,
    waterRisk: !drained,
    saltRisk: saline,
    verdict:
      saline && !drained
        ? "Tuz ve su sorunu"
        : saline
          ? "Tuz koşulunu incele"
          : !drained
            ? "Drenajı incele"
            : "Ek veri gerekli",
    limit:
      "Risk kartları nitel bir kıyastır. Ekin türü, toprak analizi, iklim ve yönetim yokken ürün miktarı bulunmaz.",
  };
}
export const worldPlants017 = {
  rainforest: {
    name: "Ekvatoral orman",
    group: "Ağaç",
    canopy: 3,
    cold: false,
    proof:
      "Yıl boyu sıcak ve bol nemli uygun alanlarda katlı geniş yapraklı ormanlar. Tek bir enlem veya yağış toplamı bütün türleri belirlemez.",
  },
  savanna: {
    name: "Savan",
    group: "Ot ve seyrek ağaç",
    canopy: 1,
    cold: false,
    proof:
      "Sıcak koşullarda belirgin yağışlı-kurak mevsimler; uzun boylu otlar ve seyrek ağaçlar. Kurak mevsimin uzunluğu ve insan etkisi önemlidir.",
  },
  maki: {
    name: "Maki",
    group: "Çalı",
    canopy: 1,
    cold: false,
    proof:
      "Yaz kuraklığına uyumlu sert yapraklı çalı topluluğu. Her maki mutlaka aynı tek orman tahribinin ürünü değildir.",
  },
  steppe: {
    name: "Bozkır",
    group: "Ot",
    canopy: 0,
    cold: false,
    proof:
      "Yarı kurak çevrede otlar ve mevsimsel büyüme. Bütün otsu türler tek yıllık değildir; su ve otlatma koşulları değişebilir.",
  },
  taiga: {
    name: "Tayga",
    group: "Ağaç",
    canopy: 2,
    cold: true,
    proof:
      "Uzun soğuk dönemli uygun nemli alanların iğne yapraklı ormanları. Bütün iğne yapraklı türler her zaman yaprak tutmaz.",
  },
  tundra: {
    name: "Tundra",
    group: "Kısa ot ve yosun",
    canopy: 0,
    cold: true,
    proof:
      "Ağaç gelişimini sınırlayan çok kısa serin büyüme dönemi; yosun, liken ve kısa bitkiler. Bitkisiz çöl veya kalıcı buz alanıyla aynı değildir.",
  },
} as const;
export function worldPlant017(community: string, summerDry: boolean) {
  const p = pick(worldPlants017, community),
    monthly = summerDry
      ? [80, 80, 80, 80, 20, 20, 20, 20, 20, 60, 60, 60]
      : [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50];
  return {
    ...p,
    community,
    summerDry,
    monthly,
    total: monthly.reduce((a, b) => a + b, 0),
    minimum: Math.min(...monthly),
    limit:
      "600 mm toplamlı iki özgün yağış dizisi; gerçek bir kent normali değildir. Yağış dizisi tek başına seçili örtüyü kesin üretmez; sıcaklık, toprak ve geçmiş de gerekir.",
  };
}
export const turkeyPlants017 = {
  black: {
    name: "Karadeniz’e açık yamaç",
    base: "Nemli orman",
    proof:
      "Denize açık nemli yamaçta orman gelişebilir; bakı, yükselti, toprak ve insan etkisi yerel fark yaratır.",
  },
  med: {
    name: "Akdeniz çevresi",
    base: "Maki ve kızılçam çevresi",
    proof:
      "Yaz kuraklığına uyumlu çalı ve orman toplulukları bağlama göre birlikte veya ayrı yer alır. Maki için tek bir evrensel üst sınır yoktur.",
  },
  inner: {
    name: "İç kesim yarı kurak alan",
    base: "Bozkır çevresi",
    proof:
      "Yağış gölgesi ve karasallık ot topluluklarını destekleyebilir. Ağaç yokluğunun her yerde yalnız insan etkisinden geldiği söylenmez.",
  },
  east: {
    name: "Kuzeydoğu yüksek alan",
    base: "Yüksek çayır çevresi",
    proof:
      "Serin ve yaz nemi uygun yüksek alanlarda çayırlar gelişebilir. Her doğu yamacı veya bütün yükseltiler aynı bitki değildir.",
  },
} as const;
export function turkeyPlant017(
  site: string,
  elevation: number,
  disturbed: boolean,
) {
  bound(elevation, 0, 3000);
  const p = pick(turkeyPlants017, site);
  return {
    ...p,
    site,
    elevation,
    disturbed,
    band:
      elevation >= 2200
        ? "Yüksek kesim örneği"
        : elevation >= 1200
          ? "Orta yamaç örneği"
          : "Alt yamaç örneği",
    cover: disturbed ? "Örtü kaybı senaryosu" : p.base,
    limit:
      "1.200 ve 2.200 m çizgileri bu özgün kesitin görsel duraklarıdır; gerçek her dağın bitki sınırı değildir. Tahrip seçimi kesin bir türün ortaya çıkışını hesaplamaz.",
  };
}
export const settlementPatterns017 = {
  cluster: {
    name: "Toplu",
    points: [
      [135, 120],
      [175, 120],
      [215, 120],
      [255, 120],
      [135, 170],
      [175, 170],
      [215, 170],
      [255, 170],
    ],
  },
  dispersed: {
    name: "Dağınık",
    points: [
      [55, 60],
      [180, 60],
      [325, 60],
      [95, 145],
      [275, 145],
      [45, 230],
      [180, 230],
      [335, 230],
    ],
  },
  line: {
    name: "Çizgisel",
    points: [
      [45, 80],
      [85, 100],
      [125, 120],
      [165, 140],
      [205, 160],
      [245, 180],
      [285, 200],
      [325, 220],
    ],
  },
  circle: {
    name: "Dairesel",
    points: [
      [200, 60],
      [263, 86],
      [290, 150],
      [263, 214],
      [200, 240],
      [137, 214],
      [110, 150],
      [137, 86],
    ],
  },
} as const;
export function worldSettlement017(pattern: string, months: number) {
  if (!Number.isInteger(months)) throw new RangeError("SETTLEMENT_MONTH");
  bound(months, 1, 12);
  return {
    ...pick(settlementPatterns017, pattern),
    pattern,
    houses: 8,
    months,
    duration: months === 12 ? "Sürekli kullanım" : "Verilen mevsimlik kullanım",
    limit:
      "Sekiz konut aynı sayıda kalır; çizim doku farkını gösterir. Nüfus, idari statü ve ekonomik işlev bu şekilden tek başına çıkarılmaz.",
  };
}
export const turkeySettlements017 = {
  ankara: {
    name: "Ankara",
    functions: ["Yönetim", "Eğitim", "Hizmet"],
    proof:
      "Başkentlik yönetim işlevini belirgin kılar; şehir yalnız yönetimden oluşmaz.",
  },
  istanbul: {
    name: "İstanbul",
    functions: ["Ticaret", "Ulaşım", "Sanayi"],
    proof:
      "Birçok işlev birlikte bulunur. Liman ve ticaret, şehrin tek bir iş yaptığı anlamına gelmez.",
  },
  zonguldak: {
    name: "Zonguldak",
    functions: ["Madencilik", "Sanayi", "Hizmet"],
    proof:
      "Taş kömürü ve sanayi ilişkisi önemli bir okul örneğidir; bütün çalışanlar madenci değildir.",
  },
  antalya: {
    name: "Antalya",
    functions: ["Turizm", "Tarım", "Hizmet"],
    proof:
      "Turizmde mevsimsel dalgalanma bulunması şehrin yıl boyu yerleşim olmadığını göstermez.",
  },
  konya: {
    name: "Konya",
    functions: ["Tarım", "Sanayi", "Hizmet"],
    proof:
      "Tarım-sanayi bağlantısı ve hizmetler birlikte yer alır; il sınırının tamamı tek bir kent dokusu değildir.",
  },
} as const;
export function turkeySettlement017(city: string, seasonal: boolean) {
  const p = pick(turkeySettlements017, city);
  return {
    ...p,
    city,
    seasonal,
    occupied: seasonal
      ? [
          false,
          false,
          false,
          false,
          true,
          true,
          true,
          true,
          true,
          false,
          false,
          false,
        ]
      : Array<boolean>(12).fill(true),
    duration: seasonal
      ? "Ayrı yayla örneği: beş ay"
      : "Kent konutları: on iki ay",
    limit:
      "Takvim, seçili şehir nüfusu ölçümü değildir. Mevsimlik yayla kartı ayrı yerleşme örneğidir; kentin turizm mevsimiyle karıştırılmaz.",
  };
}
export const populationProfiles017 = {
  young: {
    name: "Genç payı yüksek örnek",
    male: [18, 29, 3],
    female: [17, 29, 4],
  },
  balanced: {
    name: "Karşılaştırma örneği",
    male: [12, 33, 6],
    female: [11, 31, 7],
  },
  aged: {
    name: "Yaşlı payı yüksek örnek",
    male: [8, 30, 10],
    female: [8, 30, 14],
  },
} as const;
export function population017(
  profile: string,
  total: number,
  area: number,
  births: number,
  deaths: number,
  inflow: number,
  outflow: number,
) {
  bound(total, 10000, 1000000);
  bound(area, 100, 10000);
  for (const n of [births, deaths, inflow, outflow]) bound(n, 0, 5000);
  const p = pick(populationProfiles017, profile),
    young = p.male[0] + p.female[0],
    working = p.male[1] + p.female[1],
    old = p.male[2] + p.female[2],
    natural = births - deaths,
    migration = inflow - outflow,
    change = natural + migration;
  return {
    ...p,
    profile,
    total,
    area,
    young,
    working,
    old,
    dependency: ((young + old) / working) * 100,
    density: total / area,
    natural,
    migration,
    change,
    final: total + change,
    rate: (change / total) * 1000,
    limit:
      "Yüzdeler toplam nüfusa göredir; 15–64 yaş grubu gerçek çalışan sayısı değildir. Dönem girişleri ayrı verilen özgün örnektir; beklenen ömür, gelir veya okuryazarlık bu veriden bulunmaz.",
  };
}

type Unit017 = {
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
const data: Unit017[] = [
  {
    id: "turkiye-sulari",
    topic: "detail-57",
    title: "Türkiye’de sular: havzadan kullanıma",
    minutes: 65,
    objectives: [
      "Akarsuyun geçtiği ülke ile son alıcısını ayrı izle.",
      "Göl oluşumu, çıkış ve su kimyasını farklı eksenlerde karşılaştır.",
      "Mevsimlik akış, deniz tabakaları ve su kullanımını kanıtla açıkla.",
    ],
    sections: [
      {
        title: "Önce suyun izlediği yolu kur",
        paragraphs: [
          "Türkiye’nin akarsuları yüksek ve engebeli alanlardan farklı son alıcılara yönelir. Akarsuyun doğduğu yer, ülke sınırını geçmesi ve sonunda hangi denize veya kapalı alana ulaştığı ayrı sorulardır. Bir ad ezberlemek yerine kaynaktan kola, ana yatağa ve son alıcıya uzanan ağı düşün. Havza, yüzey sularının belirli bir alıcıya yöneldiği drenaj alanıdır.",
          "Açık havza, dünya okyanusuna bağlı denizlere doğal yüzey akışıyla ulaşabilen sistemdir. Kapalı havzada yüzey çıkışı iç alanda sonlanır; Hazar gibi büyük bir alıcı da kapalı olabilir. Sınır aşan akarsu otomatik açık havza değildir. Aynı şekilde kapalı havzada yılın her günü geniş bir göl bulunması gerekmez; buharlaşma ve kullanım suyu azaltabilir.",
        ],
      },
      {
        title: "Sınır aşmak ile açık havza aynı karar değildir",
        paragraphs: [
          "Fırat ve Dicle, Türkiye’den sınır ötesine uzanıp Basra Körfezi’ne ulaşan sistemin parçalarıdır. Çoruh, Gürcistan üzerinden Karadeniz’e ulaşır. Aras, Kura sistemiyle Hazar’a yönelir. İlk iki örnekte son alıcı dünya denizlerine bağlıyken Hazar’ın doğal yüzey çıkışı yoktur. Ülkeler arası rota aynı havza türünü zorunlu kılmaz.",
          "Meriç dışarıda doğup Türkiye sınırı çevresine ulaşır; Asi de Türkiye dışından gelen akarsu örneğidir. Kızılırmak’ın kaynağı ve denize kavuştuğu kesim Türkiye içindedir. Soruda Türkiye’den doğanlar mı, Türkiye’den geçenler mi istendiğini ayır. Bir kolun yerel akışı ile bütün uluslararası havzanın alanını aynı sınır sanma.",
        ],
      },
      {
        title: "Rejimi toplam su miktarından ayır",
        paragraphs: [
          "Akarsu rejimi akımın yıl içindeki değişim düzenidir. Yağışın mevsimi, kar ve buz erimesi, yer altı suyu katkısı ve havza özellikleri bu düzeni etkiler. Karla beslenen yüksek bir havzada ilkbahar-yaz başı artışı görülebilir; yağışa dayanan kıyı havzalarının mevsimi farklı olabilir. Aynı yıllık toplam farklı aylara dağıtılabilir.",
          "Barajlar suyu bir dönemde depolayıp başka dönemde verebilir; aşağı kesimin akışı doğal rejimden ayrılabilir. Etkileşimde dört mevsimlik 40, 30, 20, 10 birimi 25’er birime dönüştüren özgün örnek kullanılır. Toplam korunur ve aralık azalır. Bu, gerçek bir nehrin normali veya her barajın aynı biçimde çalıştığı iddiası değildir.",
        ],
      },
      {
        title: "Enerji potansiyeli başka, her yerde ulaşım başka",
        paragraphs: [
          "Yatak eğimi ve yükselti farkı, akarsu suyunun enerji üretimindeki önemini etkiler. Türkiye’de birçok akarsuyun kısa mesafede yüksekten inmesi hidroelektrik potansiyelle ilişkilidir. Ancak üretim için debi, süreklilik, tesis ve çevre koşulları da gerekir. Yüksek eğim tek başına yıllık elektrik miktarını sayısal vermez.",
          "Aynı engebeli yatak koşulu büyük gemilerle düzenli iç ulaşımı sınırlayabilir. Sulama, içme-kullanma suyu, enerji, balıkçılık ve ekolojik işlevler birlikte değerlendirilir. Bir barajın elektrik üretmesi başka bütün yarar ve zararları çözdüğü anlamına gelmez. Tortu tutulması, akış zamanı ve aşağı kesimdeki canlıların gereksinimleri de kararın parçasıdır.",
        ],
      },
      {
        title: "Gölleri üç ayrı eksende oku",
        paragraphs: [
          "Gölün oluşum çukuru tektonik, karstik, volkanik, buzul veya bir setin gerisinde birikmeyle ilişkili olabilir. Tektonik hareket ve volkanik set gibi birden fazla süreç aynı gölde birleşebilir. Van Gölü’nün oluşumunu tek bir basit kutuya sıkıştırmak bu karma geçmişi gizler. Yapay baraj gölü ise insan yapımı setle ilişkilidir.",
          "Oluşum kökeni; gölden dışarı akış olup olmaması; tatlı, tuzlu veya sodalı su özellikleri ayrı alanlardır. Çıkışsız ve buharlaşması güçlü bir sistemde çözünmüş maddeler yoğunlaşabilir. Fakat yalnız köken adına bakarak kesin tuz oranı yazılmaz. Van’ın sodalı-tuzlu yapısı, göllerin hepsinin içme suyu olarak doğrudan kullanılabildiği genellemesine karşı örnektir.",
        ],
      },
      {
        title: "Doğal setler aynı malzemeden oluşmaz",
        paragraphs: [
          "Heyelan kütlesi, akarsuyun getirdiği alüvyon, lav, kıyı kordonu veya moren bir su yolunu kapatarak göl oluşumuna katkı verebilir. Setin maddesiyle göl çukurunun önceki kökeni ayrı olabilir. Kıyı set göllerinde denizle bağlantının daralması, baraj göllerinde ise mühendislik seti belirleyicidir. Her seti tektonik çukur diye adlandırma.",
          "Kaynaklar bazı karma örnekleri farklı başlık altında verebilir. Bu nedenle tartışmalı bir göl adına dayanan tek doğru sorusu yerine soruda setin lavdan, heyelan kütlesinden veya kıyı birikiminden oluştuğu açıkça belirtilir. Köken kanıtı eksikse kesin sınıf seçmek yerine hangi verinin gerektiğini söylemek daha doğru bir çözüm yoludur.",
        ],
      },
      {
        title: "Yer altı suyu görünmeyen bir ağdır",
        paragraphs: [
          "Geçirimli katmanlar ve çatlaklar suyun sızmasını ve yer altında taşınmasını sağlar; geçirimsiz birimlerin konumu depolanma ve çıkış biçimini etkiler. Karstik alanlarda çözünme boşlukları hızlı ve karmaşık yollar oluşturabilir. Bir kaynağın debisi yağış ve depolama koşullarıyla değişebilir; kaynak adı tek başına her ay aynı miktar garantisi vermez.",
          "Artezyen, basınçlı bir su katmanının uygun örtü ve beslenme ilişkisine dayanır. Her kuyu kendiliğinden fışkırmaz; basınç düzeyinin kuyu ağzına göre konumu önemlidir. Fayla ilişkili bütün kaynaklar sıcak değildir. Aşırı çekim, kirlenme ve kıyıda tuzlu su girişimi gibi süreçler kullanılabilir suyu etkiler; yer altı suyu sonsuz bir depo sayılmaz.",
        ],
      },
      {
        title: "Denizler ve boğazda iki yönlü akış",
        paragraphs: [
          "Türkiye’nin çevresindeki denizler sıcaklık, buharlaşma, tatlı su girişi ve bağlantılar bakımından farklılaşır. Kaynaklardaki tuzluluk değerleri çoğu zaman yaklaşık yüzey koşullarını anlatır; bütün derinliklerin ve mevsimlerin aynı ölçümü değildir. Karadeniz ile Akdeniz’i yalnız renk veya tek sabit sayı üzerinden karşılaştırmak bu dengeyi gizler.",
          "İstanbul Boğazı’nda üst tabaka genel olarak Karadeniz’den Marmara yönüne, daha tuzlu alt tabaka ters yöne akar. İki akış aynı anda farklı derinliklerde bulunabilir; tek bir bütün su oku yeterli değildir. Karadeniz’in derin oksijensiz alanlarında birçok büyük canlı sınırlanırken mikroorganizmalar yaşayabilir; belirli bir derinliğin altında hiçbir canlı yok sözü doğru değildir.",
        ],
      },
      {
        title: "Kullanımda kalite ve miktarı birlikte düşün",
        paragraphs: [
          "Su döngüsü yağış ve akışla havzaları besler; buna rağmen belirli yerde ve zamanda kullanılabilir temiz su sınırlıdır. Aynı su hacmi, tuzluluk veya kirlilik nedeniyle aynı amaçta kullanılamayabilir. İçme, sanayi ve sulama kalite gereksinimleri farklıdır. Baraj hacmini doğrudan kişi başına temiz içme suyu miktarı saymak eksik bir işlemdir.",
          "Sulamada verim, kaçakların azaltılması, havzanın bütününde izleme ve arıtma seçenekleri su baskısını azaltabilir. Çekilen suyun bir kısmı geri dönebilir; kirlenmiş dönüş aynı kalitede su değildir. Eski kaynaklardaki belirli yıla ait tüketim veya nüfus öngörüsü güncel ölçüm gibi sunulmaz. Hesapta dönem, hacim birimi ve hangi kullanımın verildiği açık olmalıdır.",
        ],
      },
      {
        title: "Nehir adlarını deniz havzalarına yerleştir",
        paragraphs: [
          "Susurluk Marmara havzasının önemli örneğidir. Karadeniz’e yönelen ağda Sakarya, Kızılırmak, Yeşilırmak, Filyos, Bartın ve Çoruh gibi nehirler bulunur. Ege’ye Meriç, Bakırçay, Gediz, Küçük Menderes ve Büyük Menderes ulaşır. Kızılırmak’ın ülke içinde başlayan ve denize ulaşan uzun rotasıyla Fırat’ın toplam uluslararası boyu farklı karşılaştırma sınırlarıdır.",
          "Akdeniz ağında Dalaman, Eşen, Aksu, Manavgat, Göksu, Seyhan, Ceyhan ve Asi örnekleri yer alır. Seyhan ve Ceyhan Çukurova birikim sistemine katılır. Fırat’ın Murat ve Karasu kolları, Dicle ile birlikte Basra yönlü ağı kurar. Bartın’ın uygun bazı kesimlerindeki sınırlı ulaşım, Türkiye akarsularında büyük gemi ulaşımı genellemesinin yerel istisnasıdır.",
        ],
        table: {
          headers: ["Örnek veya ad", "Süreç ve anlam"],
          rows: [
            [
              "Marmara",
              "Susurluk; yatak eğimi ve debi ayrıca değerlendirilir.",
            ],
            [
              "Karadeniz",
              "Sakarya, Kızılırmak, Yeşilırmak, Filyos, Bartın, Çoruh.",
            ],
            ["Ege", "Meriç, Bakırçay, Gediz, Küçük ve Büyük Menderes."],
            [
              "Akdeniz",
              "Dalaman, Aksu, Manavgat, Göksu, Seyhan, Ceyhan ve Asi.",
            ],
            ["Basra", "Fırat–Dicle sistemi; ülke sınırı dışında birleşen ağ."],
            ["Hazar", "Aras–Kura; son alıcı kapalıdır."],
          ],
        },
      },
      {
        title: "Beslenme örnekleri ve barajların konumu",
        paragraphs: [
          "Bakırçay ve Gediz’in yağmur katkısı, Aras ve Kura’nın kar-buz erimesi, Manavgat ve Göksu’nun karstik kaynak katkısı farklı beslenme örnekleridir. Eğirdir’den Kovada Çayı ve Beyşehir’den Çarşamba Suyu göl çıkışı bağlamını gösterir. Fırat ve Kızılırmak gibi geniş havzalarda birden fazla kaynak birlikte etkilidir; bir kaynak adı yılın tamamını tek nedene indirmez.",
          "Atatürk, Karakaya ve Keban Fırat üzerinde; Altınkaya Kızılırmak, Oymapınar Manavgat ve Deriner Çoruh üzerinde bilinen baraj örnekleridir. Depolama enerji ve sulamayı destekleyebilirken tortu ve aşağı kesim akışını da değiştirir. Kapuzbaşı, Şekerpınarı ve Düden karstik su yollarına; Sarayköy ve Germencik jeotermal kullanım bağlamına örnek olur. Bu adlar her kaynağın aynı debi veya sıcaklığı taşıdığı anlamına gelmez.",
        ],
      },
      {
        title: "Göl ve deniz örneklerini koşuluyla eşleştir",
        paragraphs: [
          "Manyas, Uluabat, İznik, Sapanca ve Tuz Gölü tektonik çukur örnekleri arasında; Nemrut ve Meke volkanik çukur, Kızören karstik obruk, yüksek dağlardaki sirk gölleri buzul köken bağlamında öğretilir. Beyşehir ve Eğirdir tektonik-karstik; Van tektonik ve volkanik set katkılı karma örneklerdir. Aynı ad farklı yerlerde kullanılabildiği için Acıgöl gibi örneklerde konum açıkça belirtilmelidir.",
          "Akdeniz, Ege, Marmara ve Karadeniz kıyıları farklı bağlantı ve kıyı biçimlerine sahiptir. Cebelitarık Akdeniz’i Atlas’a; İstanbul ve Çanakkale boğazları Karadeniz–Marmara–Ege ağını bağlar. Kaynağın yaklaşık yüzey tuzluluk sırası Akdeniz 38‰, Ege 35‰, Marmara 22‰, Karadeniz 18‰ biçimindedir; bu bütün derinliklerin güncel sabit ölçümü değildir. Çanakkale’de de yüzey ve alt tabaka ters yönlü olabilir.",
        ],
        table: {
          headers: ["Örnek veya ad", "Süreç ve anlam"],
          rows: [
            [
              "Heyelan seti",
              "Tortum, Sera ve Yedigöller okul örnekleri; set malzemesi kütle hareketidir.",
            ],
            [
              "Alüvyal set",
              "Bafa ve Eymir gibi okul örnekleri; akarsu birikimiyle tıkanma ilişkisi.",
            ],
            [
              "Kıyı seti",
              "Durusu, Büyükçekmece ve Küçükçekmece; kıyı birikimi bağlantısı.",
            ],
            [
              "Volkanik set",
              "Çıldır ve Erçek okul örnekleri; çukurun geçmişiyle seti ayrı düşün.",
            ],
            [
              "Sirk",
              "Kaçkar ve Uludağ’ın yüksek kesim örnekleri; buzul çanağı.",
            ],
          ],
        },
      },
      {
        title: "Bir Türkiye suyu sorusunu çözme sırası",
        paragraphs: [
          "Önce nesneyi seç: nehir rotası mı, mevsimlik akım mı, göl kökeni mi, su kalitesi mi? Havza sorusunda son alıcıya kadar izle; rejim sorusunda aynı zaman eksenini karşılaştır; göl sorusunda köken, çıkış ve kimyayı ayrı yaz. Bu sıra bir doğru bilgiyle ilgisiz başka bir özelliği kanıtlamanı önler.",
          "Temsilî modelde tahminini gerekçelendirip rota veya mevsim çizgisiyle karşılaştır. Akışın toplamı aynı kalırken dağılım değişebileceğini, sınır aşan bir nehrin kapalı alıcıya ulaşabileceğini yeni örneğe aktar. Şekli açmak veya zamanı tamamlamak ustalık kaydı değildir; bağımsız soruda doğru sonuca nasıl ulaştığını açıklaman gerekir.",
        ],
      },
    ],
    examples: [
      {
        title: "Aras’ta son alıcıyı izle",
        prompt:
          "Aras’ın Kura sistemiyle Hazar’a ulaştığı; Hazar’ın okyanusa doğal yüzey çıkışı olmadığı verilmiştir. Sınır aşan bu rota açık mı kapalı mı?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Ülke sınırını geçmek ayrı bir coğrafi özelliktir.",
          },
          {
            label: "2. adım",
            explanation:
              "Son alıcı Hazar’dır ve çıkış koşulu açıkça verilmiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "Dünya denizlerine yüzey çıkışı olmadığı için kapalı havza sonucu desteklenir.",
          },
        ],
        answer: "Kapalı; uluslararası rota bunu değiştirmez.",
        check: "Açık kararı için ülke sayısı kullanılmadı.",
        pitfall: "Sınır aşan her suya açık havza demek.",
      },
      {
        title: "Aynı toplam, daha düzenli dağılım",
        prompt:
          "Özgün dört mevsim akışı 40, 30, 20, 10 birimdir. Depolamayla her mevsim 25 birim verilirse toplam ve en büyük-en küçük farkı nasıl değişir?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk toplam 100; aralık 40−10=30 birimdir.",
          },
          {
            label: "2. adım",
            explanation: "Yeni toplam 4×25=100; aralık 25−25=0 olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Su yaratılmadı; bu örnekte dağılım düzenlendi. Gerçek kayıp veya işletme verisi ayrıca gerekir.",
          },
        ],
        answer: "Toplam 100 korunur; aralık 30’dan 0’a iner.",
        check: "Dört aynı uzunluklu mevsim kullanıldı.",
        pitfall: "Toplam artışıyla rejim düzenlenmesini aynı sanmak.",
      },
      {
        title: "Köken ile kimya farklıdır",
        prompt:
          "Bir gölün lav seti ardında oluştuğu ve yüzey çıkışı olmadığı veriliyor; kesin tuz yüzdesi verilmemiş. Neler söylenebilir?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Lav seti oluşumla ilgili kanıttır.",
          },
          {
            label: "2. adım",
            explanation: "Yüzey çıkışı yokluğu kapalı sistem bilgisidir.",
          },
          {
            label: "3. adım",
            explanation:
              "Kesin tuz oranı için çözünmüş madde ve su dengesi gerekir.",
          },
        ],
        answer:
          "Lav seti ilişkisi ve kapalı çıkış koşulu bilinir; kesin tuz yüzdesi bilinmez.",
        check: "Tatlı/tuzlu kararı tek köken adına dayandırılmadı.",
        pitfall: "Her volkanik gölü aynı kimyada saymak.",
      },
      {
        title: "Boğazda iki katman",
        prompt:
          "Verilen kesitte üst akış Karadeniz’den Marmara’ya, alt akış Marmara’dan Karadeniz’e yönelmiştir. Tek bir kuzey-güney oku yeterli mi?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Kesitte iki farklı derinlik vardır.",
          },
          {
            label: "2. adım",
            explanation: "Üst ve alt tabaka yönleri terstir.",
          },
          {
            label: "3. adım",
            explanation:
              "İki ayrı ok ve katman etiketi gereklidir; aynı anda bulunmaları çelişki değildir.",
          },
        ],
        answer: "İki derinlik ve iki karşıt ok gerekir.",
        check: "Yüzey yönü tüm derinliğe taşınmadı.",
        pitfall: "Boğazın bütün suyunu tek yönde çizmek.",
      },
    ],
    recall: [
      {
        prompt: "Sınır aşan nehir mutlaka açık havza mıdır?",
        answer: "Hayır; Aras–Hazar örneğinde son alıcı kapalıdır.",
      },
      {
        prompt: "Rejim ile yıllık toplam aynı mıdır?",
        answer: "Hayır; aynı toplam farklı mevsimlere dağılabilir.",
      },
      {
        prompt: "Göl kökeni kesin tuz yüzdesini verir mi?",
        answer: "Hayır; çıkış, su ve çözünmüş madde dengesi gerekir.",
      },
      {
        prompt: "Karadeniz’in derininde hiçbir canlı yok mudur?",
        answer:
          "Hayır; oksijensiz ortamda yaşayan mikroorganizmalar bulunabilir.",
      },
    ],
    items: [
      [
        "Aras’ın Kura ile Hazar’a ulaştığı, Hazar’ın dünya okyanusuna doğal yüzey çıkışı olmadığı veriliyor. En uygun sonuç nedir?",
        "Sınır aşan bu rota kapalı alıcıda sonlanır",
        [
          "Ülke sınırı geçtiği için mutlaka açık havzadır",
          "Hazar büyük olduğu için mutlaka okyanusa akar",
          "Akarsu başka ülkeye geçtiğinde havzası kalmaz",
          "Kapalı havzada hiçbir zaman su birikemez",
        ],
        "Ülke sınırı ile son alıcıyı ayır.",
        "Son alıcının doğal yüzey çıkışı yoktur. Uluslararası rota kapalı havza kararını değiştirmez.",
      ],
      [
        "Çoruh’un Türkiye’den Gürcistan’a geçip Karadeniz’e ulaştığı veriliyor. Hangisi birlikte doğrudur?",
        "Sınır aşar ve dünya denizlerine bağlı alıcıya ulaşır",
        [
          "Sınır aşması zorunlu kapalı havza yapar",
          "Karadeniz’e ulaşması ülke sınırı geçmediğini kanıtlar",
          "Bütün yolu yalnız Türkiye’dedir",
          "Bu bilgi yıllık debisini sayısal verir",
        ],
        "İki ayrı özelliği ayrı denetle.",
        "Rota sınırı geçer; son alıcı Karadeniz’dir. Bu bilgiler akımın miktarını veya her mevsimde aynı oluşunu vermez.",
      ],
      [
        "İlk özgün mevsim akışları 40, 30, 20, 10; ikinci düzenleme 25, 25, 25, 25 birimdir. Hangi sonuç doğrudur?",
        "Toplamlar eşit; ikinci dizinin mevsimler arası farkı küçüktür",
        [
          "İkinci toplam ilkinden 50 fazladır",
          "İlk dizinin en büyük-en küçük farkı 0’dır",
          "İkinci dizinin farkı 100’dür",
          "Dağılım değiştiyse toplam zorunlu iki kat olur",
        ],
        "Toplam ve aralığı ayrı hesapla.",
        "İki toplam 100’dür; ilk aralık 30, ikinci 0’dır. Bu özgün örnekte dağılım değişir, miktar yaratılmaz.",
      ],
      [
        "Bir göl için lav seti ve dışarı yüzey çıkışının yokluğu veriliyor. Ek veri olmadan hangisi bulunamaz?",
        "Kesin tuz yüzdesi",
        [
          "Setin volkanik malzemeyle ilişkisi",
          "Yüzey çıkışının verilmediği değil yok olarak tanımlandığı",
          "Kapalı çıkış koşulu",
          "Köken ile su kimyasının ayrı bilgiler olduğu",
        ],
        "Kimya için su ve madde dengesi gerekir.",
        "Oluşum ve çıkış koşulu verilmiştir. Kesin derişim için çözünmüş madde miktarı ve su hacmi gerekir; köken adı sayı üretmez.",
      ],
      [
        "Türkiye’de doğup sınır ötesine çıkan bir nehir ile dışarıda doğup Türkiye’ye ulaşan bir nehir karşılaştırılıyor. Hangi yaklaşım doğrudur?",
        "Kaynak yeri ile Türkiye’den geçiş durumunu ayrı kaydetmek",
        [
          "Türkiye’den geçen her nehrin burada doğduğunu varsaymak",
          "İki nehrin debilerini ülke sayısından eşit kabul etmek",
          "Sınır aşan her nehri denizsiz saymak",
          "Son alıcı yerine yalnız ilk sınır noktasını kullanmak",
        ],
        "Nerede doğar, nereden geçer, nereye ulaşır?",
        "Bu üç soru farklı özellikleri tanımlar. Meriç ve Asi gibi dışarıdan gelen örnekler kaynak yeri ile geçişi eşitlememeyi öğretir.",
      ],
      [
        "Bir baraj aşağı kesimin bahar akışını azaltıp yaz akışını artırıyor. Hangisi doğrudan desteklenir?",
        "Aşağı kesimin akış zamanlaması değişmiştir",
        [
          "Havzaya yeni su molekülleri yaratılmıştır",
          "Bütün ekolojik etkiler olumlu olmak zorundadır",
          "Yıllık elektrik miktarı kesin iki kat olmuştur",
          "Nehir artık bir göl kökeni türüdür",
        ],
        "Verilen değişim hangi eksendedir?",
        "Bahar-yaz dağılımı değişmiştir. Toplam, kayıp, üretim ve çevresel sonuçlar başka veriler gerektirir.",
      ],
      [
        "Bir boğaz kesitinde üstte Karadeniz→Marmara, altta Marmara→Karadeniz akışı veriliyor. En doğru temsil hangisidir?",
        "Farklı derinliklerde karşıt iki ok",
        [
          "Tüm derinlikte yalnız üst akış oku",
          "Tüm derinlikte yalnız alt akış oku",
          "İki yön olduğu için hiç akış yok çizimi",
          "Üst ve alt tabakayı aynı su noktası olarak çizmek",
        ],
        "Yön kadar derinlik de bilgidir.",
        "İki tabaka farklı derinliklerde ters yönde akabilir. Birbirini silen tek ok yapmak verilen mekânsal ayrımı kaybettirir.",
      ],
      [
        "Bir kaynak fay hattıyla ilişkili bulunmuştur; su sıcaklığı ölçülmemiştir. Hangisi kesin söylenemez?",
        "Suyun mutlaka sıcak olduğu",
        [
          "Fay bağlantısının verildiği",
          "Sıcaklığın ayrıca ölçülmesi gerektiği",
          "Konumla su sıcaklığının ayrı veri olduğu",
          "Tek konum bilgisinden kesin derece bulunamayacağı",
        ],
        "Fay ilişkisini evrensel sıcaklık yasası yapma.",
        "Faylar akış yolu oluşturabilir; bütün fay kaynakları sıcak değildir. Sıcaklık için derinlik ve ısı koşulları gibi ek veriler gerekir.",
      ],
      [
        "Kapalı bir havzada çekilen suyun kalitesi kirlenmeyle bozuluyor. Hangi ifade uygundur?",
        "Aynı hacim her amaç için aynı kullanılabilir su değildir",
        [
          "Su döngüsü olduğu için kirlenme önemsizdir",
          "Hacim aynıysa içme kalitesi zorunlu aynıdır",
          "Kapalı havzada hiç buharlaşma olmaz",
          "Tüm su kullanımı yalnız elektrik üretimidir",
        ],
        "Miktar ile kaliteyi ayrı düşün.",
        "Kullanıma uygunluk tuz ve kirletici koşullarına bağlıdır. Hacmin korunması temiz içme suyu niteliğini garanti etmez.",
      ],
      [
        "Karadeniz’in derin oksijensiz kesimleri için hangi genelleme hatalıdır?",
        "Belirli derinliğin altında hiçbir canlı yaşayamaz",
        [
          "Birçok oksijen isteyen büyük canlı sınırlanabilir",
          "Yüzeyle derin kesimin koşulları farklı olabilir",
          "Mikroorganizmalar oksijensiz koşullarda yaşayabilir",
          "Yaklaşık yüzey tuzluluğu tüm derinliklerin aynı değeri değildir",
        ],
        "Bütün canlıları tek solunum biçiminde sayma.",
        "Oksijensiz ortamda yaşayan mikroorganizmalar vardır. Oksijen gereksinimli büyük canlıların sınırlanması tüm yaşamın yokluğu değildir.",
      ],
    ],
    source:
      "Aurelia Türkiye’de Sular kopya kağıdı; OGM Dersler Cepte Sular PDF 14–17; MEBİ TYT Coğrafya PDF 83–85 seçili öğretim ve şekilleriyle karşılaştırılmış özgün anlatım ve sorular. Gerçek nehir ölçümü veya resmî sınav sorusu değildir.",
  },
  {
    id: "dunya-topraklari",
    topic: "detail-58",
    title: "Dünya’da topraklar: katlar, süreç ve kanıt",
    minutes: 65,
    objectives: [
      "Ayrışma ile toprak oluşumunu ve katların görevini ayır.",
      "İklim, canlı, ana malzeme, yer şekli ve zamanı birlikte kullan.",
      "Okul toprak sınıflamasını koşullarıyla yorumla; renkten kesin verim çıkarma.",
    ],
    sections: [
      {
        title: "Toprak yalnız ufalanmış taş değildir",
        paragraphs: [
          "Toprak; mineral taneler, organik maddeler, su, hava ve canlı etkinliğinin birlikte oluşturduğu dinamik yüzey ortamıdır. Ana malzemenin parçalanması başlangıç sağlayabilir, fakat yalnız kaya kırıntısı görmek gelişmiş toprak profili görmek değildir. Kökler, mikroorganizmalar, maddelerin çözünmesi ve taşınması zaman içinde yapıyı değiştirir.",
          "Katı taneler arasındaki gözeneklerin bir kısmı su, bir kısmı hava taşır. Yağışla nemin artması her gözenekte sürekli hava kalacağı anlamına gelmez; suya doygunluk havalanmayı etkileyebilir. Kum, mil ve kilin oranı dokuya; tanelerin kümelenmesi ise yapıya ilişkindir. Toprağın yalnız rengiyle su tutma veya verimi kesin belirlenmez.",
        ],
      },
      {
        title: "Fiziksel ayrışma ile kimyasal değişimi ayır",
        paragraphs: [
          "Sıcaklık değişimi, donma-çözülme, basınç kalkması ve kök etkisi kayaçları fiziksel parçalara ayırabilir. Parçanın küçülmesi yüzey alanını artırabilir; mineralin kimyasal bileşiminin aynı kalması bu olayı kimyasal değişimden ayırır. Ancak gerçek arazide süreçler birbirini destekleyebilir; bir örnekte yalnız tek süreç olmak zorunda değildir.",
          "Çözünme, oksitlenme ve hidroliz gibi kimyasal yollar mineralleri değiştirebilir. Su ve sıcaklık koşulları bu yolların etkinliğini etkiler; sıcak-nemli çevrede kimyasal ayrışma çoğu zaman güçlüdür. Aynı yıllık sıcaklığa bakıp bütün kayaçların aynı hızda değiştiğini söyleme. Mineral bileşimi, çatlaklar, suyun niteliği ve zaman da gerekir.",
        ],
      },
      {
        title: "Beş etken tek başına sıraya dizilmez",
        paragraphs: [
          "İklim, canlılar, ana malzeme, yer şekli ve zaman toprak oluşumunu birlikte etkiler. Yağış madde taşınmasını, sıcaklık canlı etkinliği ve tepkimeleri, bitki kalıntıları organik girdiyi değiştirir. Ana malzeme mineralleri sağlarken eğim suyun kalışını ve aşınmayı etkiler. Bu etkiler bağımsız puanlar gibi her yerde aynı katsayıyla toplanmaz.",
          "Dik yamaçta aşınma biriken malzemeyi uzaklaştırabilir; düz alanda birikim ve suya doygunluk farklılaşabilir. Eski bir yüzey uzun gelişim süresine sahip olabilir ama yeniden aşınma profili gençleştirebilir. Bir metre toprağın her yerde tam aynı yılda oluştuğu evrensel kural yoktur. Soruda hız verilmediyse yalnız kalınlıktan kesin yaş hesaplama.",
        ],
      },
      {
        title: "Profili yukarıdan aşağı oku",
        paragraphs: [
          "Bir toprak kesitinde özellikleri ayrılan katlara horizon denir. O organik örtüyü, A organik katkıyla mineral malzemenin karıştığı üst katı, C daha az değişmiş ana malzemeyi gösterebilir. O katı her yerde aynı kalınlıkta değildir; bazı profillerde seçilemeyebilir. Kesitteki renk farkı tek başına bütün kimyasal içeriği vermez.",
          "B alt toprakta birikim veya yerinde dönüşüm özellikleri taşıyabilir. Bazı profillerde yıkanmanın belirgin olduğu E katı bulunur; her toprakta zorunlu değildir. Sağlam kaya bu çizimde R ile gösterilir; okul şemalarının D dediği alt kaya bağlamı ayrıca açıklanır. Harfler toprakların hepsinin aynı sayıda ve aynı kalınlıkta katı olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Yıkanma ve birikim aynı yerde olmak zorunda değildir",
        paragraphs: [
          "Süzülen su bazı çözünmüş maddeleri veya ince parçacıkları üst kattan aşağı taşıyabilir. Kaynak katındaki madde kaybı ile alt kattaki birikim bağlantılı süreçlerdir; bir maddenin kaybolduğu sanılan yerden başka bir katmana taşınması mümkündür. E veya açık üst kat görürken verilen madde ve iklim koşulunu birlikte oku.",
          "B katındaki bütün maddeler mutlaka kireç değildir; kil, demir bileşikleri veya başka değişimler bulunabilir. Kurakça koşullarda sınırlı yıkanma ve uygun ana malzemeyle kireç ya da tuz birikimi gelişebilir. Kireçli ana kaya üst katın her zaman kireççe zengin kalacağını garanti etmez. Taşınma yönü ile net depolanmayı açık koşullarla yorumla.",
        ],
      },
      {
        title: "Zonal, intrazonal, azonal bir okul çerçevesidir",
        paragraphs: [
          "Okul kaynaklarında zonal topraklar iklim ve bitki ilişkilerinin belirginleştiği geniş bölgesel örnekleri toplar. İntrazonal örneklerde drenaj, tuzluluk veya ana malzeme gibi yerel etkenler öne çıkar. Azonal örneklerde taşınma, yeni birikim veya aşınma gibi gelişimi kesintiye uğratan koşullar belirgindir. Bu, öğretim amaçlı tarihsel sınıflama dilidir.",
          "Bu üçlü bütün modern toprak sınıflama sistemlerinin aynısı değildir. İntrazonal demek her zaman hiçbir kat gelişmemiş demek olmaz; taşınmış malzemede de zamanla yeni katlar gelişebilir. Aynı bölgede zonal bir yamaç toprağıyla akarsu tabanındaki alüvyon yan yana bulunabilir. Ölçek ve baskın süreç değiştiğinde farklı adlar birlikte görülebilir.",
        ],
      },
      {
        title: "Sıcak ve nemli toprakta humus birikimi zorunlu değildir",
        paragraphs: [
          "Lateritleşme örneğinde sıcaklık, nem, kimyasal ayrışma ve yıkanma önemlidir. Organik kalıntılar hızla parçalanabilir; gür bitki örtüsü her zaman kalın bir humus deposu oluşturmaz. Demir bileşikleri kırmızımsı rengi destekleyebilir. Ancak kırmızı rengi olan her toprağın aynı iklimde ve aynı süreçle oluştuğu sonucu çıkmaz.",
          "Akdeniz çevresinin terra rossa örneği de kırmızı olabilir; renk tek başına laterit-terra rossa ayrımını çözmez. İklim, ana kaya ve profil kanıtı gerekir. Toprağın besin durumu ile ormanın canlı biyokütlesindeki besin stoku farklı depolardır. Bir depo büyükken öteki sınırlı olabilir; bitki zenginliğini doğrudan analiz sonucu yerine koyma.",
        ],
      },
      {
        title: "Serin orman ve çayır örneklerini kıyasla",
        paragraphs: [
          "Podzollaşma, uygun serin-nemli orman ve ana malzeme koşullarında belirgin yıkanma katıyla ilişkilendirilebilir. İğne yapraklı her ormanın altında mutlaka aynı profil gelişmez. Çernozyom örneğinde çayır kökleriyle organik madde katkısı ve koyu üst kat öne çıkar. Burada bitki kalıntısının nereden ve hangi koşulda geldiğini takip et.",
          "Humusça zengin üst kat tarımsal açıdan önemli olabilir; fakat yetişme süresi, su, eğim, tuzluluk ve yönetim verilmeden kesin ürün miktarı bulunmaz. Tundra çevresinde kısa büyüme dönemi ve don koşulları başka sınırlamalar getirir. Koyu renkli her örneği çernozyom saymak, iklimi ve oluşum koşulunu yalnız renge indirgemektir.",
        ],
      },
      {
        title: "Taşınmış malzeme verim garantisi değildir",
        paragraphs: [
          "Akarsu alüvyonu, yamaç kolüvyonu, rüzgârın biriktirdiği lös ve buzulun taşıdığı moren farklı taşıyıcılarla ilişkilidir. Hepsine aynı tane boyu veya aynı geçirgenlik atamak doğru değildir. Akarsu değişen enerji koşullarında çakıldan ince mile kadar malzeme bırakabilir. Taşınma ve birikim geçmişi toprağın kullanımını etkiler.",
          "Yeni alüvyal alan verimli olabilir, fakat tuz, drenaj, taşkın, kirletici ve doku gibi koşullar ayrıca incelenir. İnce kilce zengin bir birikim kumlu tabakayla aynı su davranışını göstermez. Etkileşimde yeni birikim seçimi katları sadeleştirir; bu tüm taşınmış topraklar sonsuza dek kat geliştiremez demek değildir. Zamanı modele verilen sınırda tut.",
        ],
      },
      {
        title: "Yerel etkenin adını öğren: tuz, su ve kireç",
        paragraphs: [
          "Halomorfik, tuz birikiminin belirgin olduğu okul toprağı adıdır; kurakça kapalı tabanlar ve sulama-drenaj ilişkisi bu koşulu destekleyebilir. Hidromorfik, taban suyunun yüksekliği ve suya doygunlukla ilişkili özellikleri öne çıkarır. İkisi aynı ölçüt değildir; birinde tuz, ötekinde su-hava ve uzun doygunluk bağlamı önemlidir.",
          "Kalsimorfik başlığı kireçli-killi ana malzemenin önemini vurgular. Rendzina yumuşak kireçli malzeme üzerinde koyu organik katkılı üst kat örneğidir. Vertisol, uygun şişen kilin ıslanıp kurumasıyla çatlama ve karışma gösterebilir; dönen toprak adı buradan gelir. Bu okul sınıflaması her örnekte bütün B katlarının yok olduğunu veya her killi toprağın vertisol olduğunu kanıtlamaz.",
        ],
        table: {
          headers: ["Örnek veya ad", "Süreç ve anlam"],
          rows: [
            [
              "Halomorfik",
              "Tuz birikimi baskın; su alma koşulları bitkiye göre değerlendirilir.",
            ],
            [
              "Hidromorfik",
              "Yüksek taban suyu ve doygunluk; havalanma ayrıca önemlidir.",
            ],
            [
              "Rendzina",
              "Yumuşak kireçli ana malzeme ve koyu üst katın okul örneği.",
            ],
            [
              "Vertisol",
              "Şişen kil, kurak dönemde çatlaklar ve iç karışma ilişkisi.",
            ],
          ],
        },
      },
      {
        title: "Litosol ve regosolde yüzeyin geçmişini ayır",
        paragraphs: [
          "Litosol okul örneğinde engebeli ve zayıf örtülü yamaçta ince malzeme uzaklaşır, iri taşlı yüzey belirginleşir. Burada odak aşınmanın yüzeyi sürekli genç tutmasıdır. Regosol örneğinde gevşek ve az gelişmiş ana malzeme; Türkiye kaynaklarında özellikle volkanik kum ve tüf çevresi vurgulanır. Biri yalnız taş rengi, öteki kesin yüksek verim etiketi değildir.",
          "Alüvyon akarsuyla, kolüvyon yamaç hareketiyle, lös rüzgârla, moren buzulla taşınmış malzemeyle ilişkilidir. Taşıyıcıyı bulmak dokuyu ve oluşum geçmişini anlamaya yardım eder; bütün örnekler aynı incelikte veya aynı drenajda değildir. Yeni yüzeyin az gelişmiş olması bir yaşama engeli ya da sonsuza dek kat oluşmayacağı anlamına gelmez.",
        ],
        table: {
          headers: ["Örnek veya ad", "Süreç ve anlam"],
          rows: [
            [
              "Litosol",
              "İnce malzemenin aşınması sonrası taşlı ve sığ yamaç örneği.",
            ],
            [
              "Regosol",
              "Gevşek, az gelişmiş ana malzeme; volkanik kum/tüf okul örneği.",
            ],
            ["Lös", "Rüzgârın taşıyıp biriktirdiği ince malzeme."],
            ["Moren", "Buzulun taşıyıp bıraktığı farklı boylu malzeme."],
            [
              "Alüvyal / kolüvyal",
              "Akarsu tabanı ile yamaç eteğinin taşıyıcısını ayır.",
            ],
          ],
        },
      },
      {
        title: "Toprağı korumak üst katı ve işlevleri korumaktır",
        paragraphs: [
          "Bitki örtüsünün kaybı, yanlış eğim yönünde işleme ve aşırı otlatma aşınma baskısını artırabilir. Uygun örtü, eğime duyarlı kullanım, organik madde yönetimi ve suyun kontrollü yönlendirilmesi korumaya katkı sağlayabilir. Her yöntem her araziye aynı biçimde uygulanmaz; yerel eğim, yağış ve kullanım amacı birlikte değerlendirilir.",
          "Bir soruda önce süreç kanıtını bul: yerinde ayrışma mı, taşınma mı, yıkanma mı, tuz birikimi mi? Sonra profilde hangi katın neyi gösterdiğini açıkla. Adı en erken söylemeye çalışmak yerine kanıtın izin verdiği sınıfa ulaş. Renk, tek bir sıcaklık veya bir kullanım örneği bütün toprak özelliklerini tek başına kanıtlamaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Kat kaybı ile katı yok sayma",
        prompt:
          "Özgün profilde A ve E’den madde kaybı, B’de kil birikimi veriliyor. Süreç hangi yöndedir?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Üst katlar madde kaybının kaynak bölmesidir.",
          },
          {
            label: "2. adım",
            explanation: "Süzülen suyla aşağı taşınma verilmiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "B’de birikim üstten taşınma ile tutarlıdır; her B’nin yalnız kireç olduğu söylenmez.",
          },
        ],
        answer: "Üstten alta madde taşınması ve B’de birikim.",
        check: "Madde kaybı yok olma olarak anlatılmadı.",
        pitfall: "B harfini yalnız kireçle eşitlemek.",
      },
      {
        title: "Kırmızı iki örneği ayır",
        prompt:
          "X sıcak-nemli güçlü yıkanmalı; Y Akdeniz kalkerli alanda gelişmiş kırmızı toprak olarak tanımlanıyor. Renk tek başına ayrım yapar mı?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "İki örneğin rengi aynıdır.",
          },
          {
            label: "2. adım",
            explanation: "İklim ve ana malzeme bilgileri farklıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "X lateritleşme, Y terra rossa bağlamını destekler; renk tek başına yeterli değildir.",
          },
        ],
        answer: "Hayır; süreç ve çevre kanıtları gerekir.",
        check: "Tanı yalnız fotoğraf rengine bağlanmadı.",
        pitfall: "Her kırmızı toprağa laterit demek.",
      },
      {
        title: "Taşıyıcıyı kanıttan bul",
        prompt:
          "Yeni birikim akarsu tabanında oluşuyor; mevsimlik taşkınlar farklı tane boyu bırakıyor. Okul grubu ve oluşum süreci?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Akarsu taşıma ve birikimi açıktır.",
          },
          {
            label: "2. adım",
            explanation: "Bu alüvyal malzeme bağlamıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Yeni yüzeyde gelişmiş katlar henüz yoksa azonal okul örneği desteklenir; zamanla kat gelişebilir.",
          },
        ],
        answer: "Alüvyal birikim; verilen yeni yüzey azonal örneği.",
        check: "Bütün alüvyonların aynı dokuya sahip olduğu söylenmedi.",
        pitfall: "Azonalı sonsuza dek gelişimsiz sanmak.",
      },
      {
        title: "Kalınlıktan kesin yaş çıkmaz",
        prompt:
          "İki kesitte üst kat 50 cm. Ayrışma hızı, aşınma ve birikim bilgileri verilmiyor. Yaşları eşit denebilir mi?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Kalınlık yalnız bir ölçüdür.",
          },
          {
            label: "2. adım",
            explanation: "Birikim ve aşınma geçmişleri farklı olabilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Hız ve süreç verilmeden kalınlık kesin yaş veya eşitlik sağlamaz.",
          },
        ],
        answer: "Hayır; ek süreç ve hız verisi gerekir.",
        check: "Evrensel santimetre/yıl katsayısı uydurulmadı.",
        pitfall: "Her toprağa tek oluşum hızı kullanmak.",
      },
    ],
    recall: [
      {
        prompt: "Toprak neden yalnız ufalanmış taş değildir?",
        answer:
          "Organik madde, canlı, su-hava ve madde taşınması da yapıya katılır.",
      },
      {
        prompt: "E katı her profilde zorunlu mudur?",
        answer: "Hayır; bazı profillerde belirgin yıkanma katıdır.",
      },
      {
        prompt: "İntrazonal mutlaka katsız mı demektir?",
        answer: "Hayır; yerel etkenin baskınlığıyla ilgili okul grubudur.",
      },
      {
        prompt: "Alüvyal adı yüksek verimi garanti eder mi?",
        answer: "Hayır; doku, tuz, drenaj ve kullanım ayrıca önemlidir.",
      },
    ],
    items: [
      [
        "Bir örnekte yalnız kaya parçası ufalanıyor; mineral bileşimi değişmiyor. Doğrudan hangi süreç verilmiştir?",
        "Fiziksel ayrışma",
        [
          "Kimyasal bileşimin zorunlu dönüşmesi",
          "Bütün parçaların organik madde olması",
          "Tüm toprağın oluşumunun tamamlanması",
          "B katında zorunlu tuz birikimi",
        ],
        "Parça boyu ile kimyasal kimliği ayır.",
        "Ufalanma fiziksel ayrışmadır. Toprak oluşumunun bütün canlı ve profil süreçleri verilmediği için tamamlanmış toprak sonucu çıkmaz.",
      ],
      [
        "A ve E katlarında madde azalması, aşağıdaki B’de kil artışı verilmiştir. Hangi açıklama uygundur?",
        "Üstten alta taşınma ve alt katta birikim",
        [
          "Madde doğa yasası gereği tamamen yok olmuştur",
          "B her zaman yalnız saf kireçten oluşur",
          "Taşınma yalnız yukarı yönlü olabilir",
          "E bütün dünya topraklarında aynı kalınlıktadır",
        ],
        "Kaynak katı ve alıcı katı ilişkilendir.",
        "Süzülmeyle taşınma üstte kayıp ve altta birikimi birlikte açıklayabilir. Kat harfi her maddede aynı kimyayı zorunlu kılmaz.",
      ],
      [
        "Bir profil O, A, B, C ve altta sağlam kaya içeriyor. Başka profilde E de görülüyor. Hangi yorum doğrudur?",
        "Kat sayısı ve gelişimi koşullara göre farklı olabilir",
        [
          "E yoksa örnek kesin toprak değildir",
          "O her yerde zorunlu aynı kalınlıktadır",
          "Her B yalnız demir metalidir",
          "C yalnız canlı bitki yapraklarından oluşur",
        ],
        "İdeal şemayı evrensel zorunluluk sayma.",
        "Her toprak bütün katları aynı biçimde taşımaz. E bazı yıkanmış profillerde belirgindir; yokluğu toprağı yok saydırmaz.",
      ],
      [
        "Sıcak-nemli bir alanda güçlü yıkanma, hızlı organik ayrışma ve kırmızımsı profil veriliyor. Hangisi zorunlu değildir?",
        "Yüzeyde çok kalın humus birikmesi",
        [
          "Kimyasal ayrışmanın etkili olabilmesi",
          "Yıkanmayla madde taşınabilmesi",
          "Canlı biyokütlesiyle toprak deposunun farklı olması",
          "Rengin tek başına bütün kimyayı vermemesi",
        ],
        "Organik girdiyle birikim aynı net sonuç değildir.",
        "Hızlı parçalanma kalıntı birikimini sınırlayabilir. Gür bitki örtüsü veya kırmızı renk tek başına kalın humus garantisi değildir.",
      ],
      [
        "X sıcak-nemli güçlü yıkanmalı, Y Akdeniz’de kalkerli çevrede gelişmiş kırmızı bir topraktır. Hangi yaklaşım uygundur?",
        "İklim ve ana malzemeyi kullanıp renk benzerliğini tek tanı saymamak",
        [
          "İki kırmızı toprağı mutlaka aynı süreçte saymak",
          "Y’nin üst katı her zaman saf kalkerdir demek",
          "X’in gerçek ürün verimini yalnız renkten hesaplamak",
          "Her kırmızı profili zorunlu podzol seçmek",
        ],
        "Aynı renk farklı geçmişleri gizleyebilir.",
        "Lateritleşme ve terra rossa bağlamları farklı çevre kanıtlarına dayanır. Renk ortak olduğu için tek başına ayırt edici değildir.",
      ],
      [
        "Okulun zonal–intrazonal–azonal sınıflaması için hangisi uygundur?",
        "Baskın iklimsel veya yerel süreçleri ayıran öğretim çerçevesidir",
        [
          "Modern bütün toprak sistemlerinin birebir aynı adıdır",
          "İntrazonal her koşulda hiçbir horizon yok demektir",
          "Azonal malzeme asla yeni kat geliştiremez",
          "Aynı bölgede yalnız tek grup bulunabilir",
        ],
        "Grubun hangi ölçüte dayandığını oku.",
        "Bu tarihsel okul dili baskın oluşum bağlamını özetler. Gerçek profiller ve modern sınıflamalar daha ayrıntılıdır; taşınmış malzeme zamanla değişebilir.",
      ],
      [
        "Akarsu tabanında yeni, taşınmış birikim verilmiştir. Yüksek ürün verimi için hangisi ayrıca bilinmelidir?",
        "Doku, drenaj, tuz ve kullanım koşulları",
        [
          "Yalnız alüvyal adının yazılması yeterlidir",
          "Bütün tanelerin mutlaka aynı boyda olması",
          "Akarsuyun adındaki harf sayısı",
          "Birikimin hiçbir zaman su tutmaması",
        ],
        "Taşıyıcı adı ürün miktarı değildir.",
        "Alüvyal alanlar verimli olabilir; fakat kötü drenaj, tuzluluk veya kirlenme sınırlayabilir. Ad tek başına verim garantisi sağlamaz.",
      ],
      [
        "Aynı kalınlıktaki iki toprağın oluşum hızı ve aşınma geçmişi verilmemiştir. Hangisi bulunamaz?",
        "Kesin oluşum yaşlarının eşitliği",
        [
          "Kalınlıklarının eşit olarak verildiği",
          "Ek süreç verisine ihtiyaç olduğu",
          "Aşınmanın kalınlığı etkileyebileceği",
          "Zamanın toprak oluşumunda etken olduğu",
        ],
        "Kalınlık ile hız birlikte gerekir.",
        "Farklı birikim ve aşınma geçmişleri aynı kalınlığı verebilir. Evrensel bir oluşum hızı yokken kesin yaş eşitliği kurulamaz.",
      ],
      [
        "Serin çayır ortamında kök katkısı ve koyu humuslu üst kat verilmiştir. Bu bilgi hangisini tek başına vermez?",
        "Belirli bir ürünün hektar başına kesin verimi",
        [
          "Organik katkının verildiğini",
          "Bitki örtüsünün oluşuma katılabildiğini",
          "Üst katın koyu olarak tanımlandığını",
          "İklimin başka sınırlamalar getirebileceğini",
        ],
        "Toprak özelliğini tarım sonucu yerine koyma.",
        "Çernozyom bağlamı güçlü organik katkıyı gösterebilir. Ürün, su, sıcaklık ve yönetim verisi olmadan sayısal verim hesaplanmaz.",
      ],
      [
        "Toprak kaybını azaltmak isteyen eğimli bir arazide hangi yaklaşım uygundur?",
        "Örtü ve eğime duyarlı kullanımı yerel yağışla birlikte planlamak",
        [
          "Her eğimde bütün bitki örtüsünü kaldırmak",
          "Yağışı ve toprak dokusunu hiç dikkate almamak",
          "Üst kat kaybını yalnız renk değişimi saymak",
          "Bütün araziye tek yöntemin koşulsuz yettiğini varsaymak",
        ],
        "Koruma, arazi ve su koşuluna bağlıdır.",
        "Örtü ve uygun kullanım aşınmayı sınırlamaya katkı verir. Yöntem seçimi eğim, yağış ve toprağa göre yapılır; tek evrensel reçete değildir.",
      ],
    ],
    source:
      "Aurelia Dünya’da Topraklar kopya kağıdı; OGM Dersler Cepte Topraklar PDF 12–15; MEBİ TYT Coğrafya PDF 86–88 gerçek seçili metin ve horizon şekilleriyle karşılaştırılmış özgün öğretim ve sorular.",
  },
  {
    id: "turkiye-topraklari",
    topic: "detail-59",
    title: "Türkiye’de topraklar: aynı bölgede farklı profiller",
    minutes: 65,
    objectives: [
      "Türkiye’nin iklim ve yer şekli çeşitliliğini toprak mozaiğiyle bağla.",
      "Zonal örneği vadi, yamaç ve kapalı alanın yerel koşulundan ayır.",
      "Toprak kullanımında verim, drenaj, tuz ve erozyonu birlikte değerlendir.",
    ],
    sections: [
      {
        title: "Tek ülke, tek toprak değildir",
        paragraphs: [
          "Türkiye’de deniz etkisi, karasallık, yükselti, eğim, ana kaya ve bitki örtüsü kısa mesafelerde değişir. Bu değişimler toprakların da bir mozaik oluşturmasına katkı verir. Bir haritada geniş bir alanın tek renkle gösterilmesi her tarlada aynı profilin bulunduğu anlamına gelmez. Harita ölçeği ayrıntıyı sadeleştirir.",
          "Kıyıdan içeri ve yamaçtan vadiye inerken başka baskın süreçler görülebilir. Nemli bir yamaçta orman toprağı, altındaki taşkın düzlüğünde alüvyal birikim bulunabilir. İki örnek aynı ilin sınırında olduğu için çelişmez. İdari sınırı toprak oluşum sınırı gibi kullanmak yerine fiziksel çevre kanıtını izle.",
        ],
      },
      {
        title: "Nemli orman çevresinde yıkanmayı izle",
        paragraphs: [
          "Karadeniz’e açık nemli yamaçlarda orman örtüsü ve yıkanma önemlidir. Uygun koşullarda kahverengi orman veya daha güçlü yıkanmayla ilişkili profiller görülebilir. Bitki kalıntısının girişi, ayrışma ve suyla taşınma birlikte etkilidir. Yağışın çokluğu bütün üst katlarda bütün minerallerin aynı miktarda kaldığını göstermez.",
          "Aynı kıyı bölgesindeki dik yamaç, geçirgen kaya ve akarsu tabanı farklı su-tortu ilişkilerine sahiptir. Bu nedenle Karadeniz’in bütün toprakları tek tür ve aynı verimdedir denmez. Orman toprağının korunması yalnız ağaç adı bilmek değildir; örtü kaybının yüzey akışı ve üst kat kaybıyla ilişkisini de düşün.",
        ],
      },
      {
        title: "Terra rossa: kırmızı renk ve kalker bağlamı",
        paragraphs: [
          "Akdeniz ikliminin görüldüğü kalkerli çevrelerde terra rossa okul örneğidir. Demir bileşikleri kırmızı rengi destekler; ancak renk her kırmızı toprağı aynı gruba sokmaz. Ana kayadaki çözünmeyen malzemeler, ayrışma ve taşınmış katkılar oluşuma katılabilir. Gelişmiş üst katın kimyası sağlam kalkerle tamamen aynı olmak zorunda değildir.",
          "Kalkerli ana kaya üstte her zaman bol serbest kireç garantisi değildir; yıkanma ve profil gelişimi önemlidir. Aynı bölgede karstik çukurlarda birikim, dik yamaçlarda ince toprak veya alüvyon tabanlar bulunabilir. Sığ toprak ve yaz kuraklığı tarımı sınırlayabilir; sulama ve yönetim verilmeden kesin ürün verimi yazılmaz.",
        ],
      },
      {
        title: "Bozkır çevresinin kahverengi ve kestane renkli örnekleri",
        paragraphs: [
          "İç kesimlerin yarı kurak bozkır koşullarında kahverengi ve daha nemli bazı ot çevrelerinde kestane renkli toprak örnekleri öğretilir. Yağış, organik katkı ve yıkanma farkları profili etkiler. Bunlar yalnız boya tonundan seçilen sınıflar değildir; soruda iklim, bitki ve yer şekli kanıtını kullan.",
          "Yıkanmanın sınırlı olduğu uygun ortamlarda alt katta kireç birikimi görülebilir. Fakat bütün İç Anadolu yüzeyi aynı kuru ve aynı tuzlu topraktır denemez. Vadi alüvyonu, kapalı tabanların tuz etkisi ve eğimli alanların aşınması ayrı örneklerdir. Bölgesel iklim ile yerel su dengesini birlikte düşün.",
        ],
      },
      {
        title: "Yüksek çayırda koyu üst kat",
        paragraphs: [
          "Kuzeydoğudaki uygun yüksek çayır çevreleri çernozyom örnekleriyle ilişkilendirilir. Köklerin organik madde katkısı ve serin koşullar koyu üst katı destekleyebilir. Humus zenginliği bir toprak özelliğidir; bütün doğu illerinin veya her yükseltinin aynı toprağa sahip olduğu anlamına gelmez.",
          "Uzun soğuk dönem yetişme süresini, eğim mekanizasyonu ve su durumu kullanım biçimini etkileyebilir. Bu yüzden koyu humuslu toprağın bulunduğu her yerde her ürünün en yüksek verimle yetiştiği söylenmez. Çayır ve hayvancılık ilişkisi de toprak-iklim-kullanım bütününün sonucudur; yalnız renk açıklaması yeterli değildir.",
        ],
      },
      {
        title: "Yerel kaya ve su etkisi intrazonal örnekler verir",
        paragraphs: [
          "Killi ana malzemede şişme-büzülme davranışı gösteren vertisol örnekleri, kireçli malzemede gelişen bazı profiller ve suya doygun tabanların hidromorfik koşulları yerel etkenin önemini gösterir. Killi doku su davranışını etkileyebilir ama her kilce zengin toprağın bütün özellikleri aynı değildir.",
          "Kapalı ve kurakça tabanlarda tuzluluk gelişebilir; bu iklimin her noktada aynı tuz miktarını yarattığı anlamına gelmez. Sulama, drenaj ve yer altı suyu düzeyi de önemlidir. İntrazonal okul terimini hiç horizon bulunmaz diye çevirmek yanlış olur. Baskın yerel etkeni ve örnekte gerçekten verilen kanıtı belirt.",
        ],
      },
      {
        title: "Akarsuyun tabanı ve yamacın eteği ayrı taşıyıcılardır",
        paragraphs: [
          "Alüvyal malzeme akarsuların taşıyıp biriktirdiği tortuyla ilişkilidir. Delta, vadi tabanı veya taşkın düzlüğü bağlamında değişen tane boyları görülebilir. Yeni birikim gelişmiş katları örtebilir veya genç bir yüzey oluşturabilir. Alüvyonun her yerde yalnız ince kum olması gerekmez.",
          "Kolüvyal birikimde yamaçtan aşağı hareket eden daha kısa mesafeli ve çoğu zaman az boylanmış malzeme öne çıkar. Yamaç eteğinin her birikimini büyük nehrin deltası sayma. Taşıyıcı, yol ve birikim ortamını ayırmak iki okul örneğini anlaşılır kılar. Zamanla bu yeni malzemelerde de toprak gelişimi sürebilir.",
        ],
      },
      {
        title: "Alüvyal adının yanına drenaj ve tuzu ekle",
        paragraphs: [
          "Alüvyal alanlar tarımsal üretimde önemli olabilir, fakat verim için doku, su, besin, tuzluluk ve kullanım koşulları birlikte değerlendirilir. Kötü drenaj kök bölgesindeki havayı sınırlayabilir. Tuzun yükselmesi bitkinin su alımını güçleştirebilir; iki sorun birbirinden farklı mekanizmalardır.",
          "Etkileşimde aynı vadi tabanı için drenaj ve tuz kartlarını ayrı değiştirirsin. Temiz görünen çizim yüksek ürün miktarı vermez; yalnız hangi ek verilerin incelenmesi gerektiğini açıklar. Kötü drenajın olduğu her yerde aynı bitki veya aynı çözüm seçilmez. Ürün türü, su kaynağı ve arazi analizi ayrıca gerekir.",
        ],
      },
      {
        title: "Toprak kullanımı ülkenin tek bir yüzdesine indirgenmez",
        paragraphs: [
          "Tarım, orman, mera, yerleşme ve sanayi toprak üzerinde farklı baskılar oluşturur. Verimli ova tabanına yapılaşma, eğimli arazide örtü kaybı ve yanlış sulama işlev kaybına yol açabilir. Bir kullanımın kısa vadeli ekonomik getirisi bütün çevresel etkileri ortadan kaldırmaz; seçenekler uzun süreli etkilerle karşılaştırılır.",
          "Eski bir kaynakta verilen tarım alanı yüzdesi veya kayıp tahmini belirli yıl ve yönteme bağlıdır. Burada güncel ölçüm uydurulmaz. Soruda yüzde kullanılacaksa pay, payda ve yıl açıkça verilir. Erozyonun taşıdığı üst kat ile toprağın kimyasal kirlenmesi aynı olay değildir; koruma yaklaşımı baskının türüne uygun olmalıdır.",
        ],
      },
      {
        title: "Yerel örnekleri Türkiye haritasına bağla",
        paragraphs: [
          "Çukurova, Bafra, Çarşamba ve Menemen deltaları alüvyal alanlara; Ergene Havzası ve bazı eski göl tabanları vertisol bağlamına örnektir. Aydın Dağları, Bozdağlar ve Toros eteklerinde kolüvyal birikim görülebilir. İç ve Doğu Anadolu’nun uygun volkanik kumlu alanları regosol; ince malzemenin aşındığı iç yamaçlar litosol okul örneklerini destekler.",
          "Iğdır Ovası’nın bazı tabanları ve Burdur–Acıgöl kıyılarındaki uygun alanlar tuz etkisine, Sultansazlığı ve Işıklı çevresindeki suya doygun alanlar hidromorfik koşula örnektir. Bu yer adları bütün ovanın her parselinde aynı profil olduğunu söylemez. Kireçli ve killi depolardaki rendzina/vertisol ile iklimi yansıtan yamaç profili aynı bölgede yan yana bulunabilir.",
        ],
      },
      {
        title: "Toprakla ürünü eşleştir, garanti verime dönüştürme",
        paragraphs: [
          "Kaynakta alüvyal alanlar için pamuk, mısır ve yer fıstığı; step toprakları için buğday, arpa, nohut ve mercimek örneklenir. Terra rossa çevresinde zeytin ve turunçgil, uygun regosol çevresinde patates, soğan ve üzüm yetiştiriciliği anlatılır. Bunlar yetişme ilişkileridir; belirli ürünün bütün iklim ve sulama gereksinimlerini toprak adı tek başına karşılamaz.",
          "Nemli orman çevresinde çay, fındık ve kivi; kolüvyal eteklerde meyve ağaçları örnekleri yer alır. Bozkır-mera koşulları küçükbaş, uygun yüksek çayırlar büyükbaş hayvancılıkla ilişkilendirilebilir. Tarımsal kullanımda örtü ve su dengesi korunmalıdır; her mera aynı otlatma baskısını taşımaz. Ürün veya hayvan adı gerçek parselde kesin ekonomik sonuç değildir.",
        ],
        table: {
          headers: ["Örnek veya ad", "Süreç ve anlam"],
          rows: [
            [
              "Alüvyal alan",
              "Uygun iklim-su koşulunda pamuk, mısır, yer fıstığı.",
            ],
            ["Step çevresi", "Buğday, arpa, nohut, mercimek örnekleri."],
            [
              "Terra rossa çevresi",
              "Zeytin ve turunçgil; su ve sıcaklık ayrıca gerekir.",
            ],
            [
              "Uygun regosol çevresi",
              "Patates, soğan, üzüm; gerçek doku ve yönetim önemlidir.",
            ],
            [
              "Nemli orman çevresi",
              "Çay, fındık, kivi; bütün orman altlarının aynı ürün alanı olduğu söylenmez.",
            ],
          ],
        },
      },
      {
        title: "Kil, silis ve orman ürünü farklı hammaddelerdir",
        paragraphs: [
          "Killi hammaddeler tuğla, kiremit, seramik ve uygun bileşimli karışımlarla çimento-porselen üretiminde kullanılabilir. Silisçe zengin uygun kumlar cam üretiminde önemlidir; silis kaynağı olarak kuvars minerali öne çıkar. Her toprağın aynı saflıkta veya aynı fabrikaya doğrudan uygun olduğu sonucu çıkmaz; bileşim, tane boyu ve işlem şartları gerekir.",
          "Orman kullanımında kereste ve yakacak odunla birlikte reçine, kozalak ve orman meyveleri gibi yan ürünler bulunabilir. Orman yalnız hammadde deposu değildir; habitat, su ve yamaç işlevleri de vardır. Tarım, mera, ormancılık ve sanayi planı arazi niteliğiyle uyumlu kurulmalıdır. Kaynağın 2021 arazi kullanım grafiği güncel her yılın ölçümü sayılmaz; tarih ve payda korunur.",
        ],
      },
      {
        title: "Bir haritayı süreç kesitine dönüştür",
        paragraphs: [
          "Harita sorusunda önce geniş iklim bağlamını bul; sonra vadi, yamaç veya kapalı taban gibi yerel konumu ekle. Üçüncü adım ana malzeme ve örtüyü, son adım tuz-drenaj-kullanım bilgisini denetlemektir. Bir ilin adı veya tek renk bütün bu adımların yerine geçmez.",
          "Özgün kesitteki konumları karşılaştırırken toprağın adını bir sonuç garantisi olarak kullanma. Aynı alüvyon kartı tuz ve drenajla farklı risk taşır; aynı orman bölgesinin içinde yeni taşkın birikimi görülebilir. Keşifteki seçimler öğrenme puanı vermez; amaç yeni bir soruda hangi kanıtın neyi gösterdiğini açıkça söyleyebilmektir.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı ilde iki profil",
        prompt:
          "Nemli orman yamacında yerinde gelişmiş profil, yakın vadi tabanında yeni nehir tortusu veriliyor. Aynı ilde olmaları aynı toprak olmalarını gerektirir mi?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "İdari sınır oluşum süreci değildir.",
          },
          {
            label: "2. adım",
            explanation:
              "Yamaçta yerinde gelişme, tabanda taşınma-birikim farklıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Orman profili ve alüvyal malzeme yan yana bulunabilir.",
          },
        ],
        answer: "Hayır; yerel süreçler farklıdır.",
        check: "Harita ölçeğinin ayrıntıyı saklayabileceği düşünüldü.",
        pitfall: "İl sınırını toprak sınırı saymak.",
      },
      {
        title: "Koyu kat ve uzun kış",
        prompt:
          "Kuzeydoğu yüksek çayır örneğinde humuslu koyu üst kat ve kısa yetişme süresi verilmiştir. Her ürün en yüksek verime ulaşır mı?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Humus olumlu bir toprak özelliğidir.",
          },
          {
            label: "2. adım",
            explanation:
              "Kısa yetişme süresi bağımsız bir iklim sınırlamasıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Ürün ve diğer koşullar olmadan kesin verim söylenemez.",
          },
        ],
        answer: "Hayır; toprak özelliği bütün tarım sonucunu vermez.",
        check: "Humusla büyüme süresi ayrı tutuldu.",
        pitfall: "Her koyu toprağı koşulsuz tarım rekoru saymak.",
      },
      {
        title: "İki ayrı risk",
        prompt:
          "Bir alüvyal parselde yüksek tuz ve uzun suya doygunluk veriliyor. İki baskıyı ayır.",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Tuz, bitkinin su alımını etkileyebilir.",
          },
          {
            label: "2. adım",
            explanation:
              "Doygunluk, kök bölgesinin havalanmasını sınırlayabilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Alüvyal adı bu riskleri silmez; ürün ve analiz gerekir.",
          },
        ],
        answer: "Tuz ve drenaj iki ayrı inceleme başlığıdır.",
        check: "Ölçülmemiş ürün miktarı hesaplanmadı.",
        pitfall: "Verimli ova ifadesinden her parseli sorunsuz çıkarmak.",
      },
      {
        title: "Etek mi vadi tabanı mı?",
        prompt:
          "X’te yamaçtan kısa mesafeyle gelen az boylanmış malzeme; Y’de nehrin taşkında bıraktığı tortu var. Oluşum adlarını eşleştir.",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "X için yamaç hareketi kanıtı verilir.",
          },
          {
            label: "2. adım",
            explanation: "Y için akarsu taşıması ve birikimi verilir.",
          },
          {
            label: "3. adım",
            explanation: "X kolüvyal, Y alüvyal bağlamı destekler.",
          },
        ],
        answer: "X kolüvyal; Y alüvyal.",
        check: "Taşıyıcılar adlandırıldı, renk kullanılmadı.",
        pitfall: "Her birikimi aynı alüvyon saymak.",
      },
    ],
    recall: [
      {
        prompt: "Aynı ilde tek toprak mı bulunur?",
        answer:
          "Hayır; iklim, yamaç, vadi, ana malzeme ve kullanım mozaiği vardır.",
      },
      {
        prompt: "Terra rossa üzerindeki kat her zaman bol kireçli midir?",
        answer: "Hayır; ana kaya ile yıkanmış üst katın kimyası ayrılabilir.",
      },
      {
        prompt: "Çernozyom her ürüne kesin en yüksek verim sağlar mı?",
        answer: "Hayır; yetişme süresi, su ve yönetim de gerekir.",
      },
      {
        prompt: "Tuz ve kötü drenaj aynı sorun mudur?",
        answer:
          "Hayır; farklı mekanizmaları olan, birlikte de görülebilen risklerdir.",
      },
    ],
    items: [
      [
        "Nemli orman yamacıyla bitişik nehir tabanındaki yeni tortu aynı il içindedir. Hangisi doğrudur?",
        "Farklı oluşum koşulları farklı toprak örnekleri verebilir",
        [
          "Aynı ilde bütün profiller zorunlu aynıdır",
          "Vadi tabanında taşınma olamaz",
          "Orman varsa yakınında alüvyon bulunamaz",
          "İdari sınır ana kaya türünü tekleştirir",
        ],
        "İl sınırını fiziksel süreçle karıştırma.",
        "Yamaçta yerinde gelişme ve tabanda yeni birikim aynı idari alanda birlikte bulunabilir.",
      ],
      [
        "Akdeniz’de kalkerli çevrede kırmızı toprak veriliyor. Hangi ek genelleme hatalıdır?",
        "Üst katın her zaman saf ve bol kireçten oluşması",
        [
          "Terra rossa bağlamının düşünülebilmesi",
          "Rengin tek başına bütün bileşimi vermemesi",
          "Yıkanmanın üst katı değiştirebilmesi",
          "Aynı bölgede karst çukuru birikimi bulunabilmesi",
        ],
        "Ana kaya ile üst kat aynı kimyasal kopya değildir.",
        "Kalkerli çevre toprak oluşumunu etkiler, fakat yıkanma ve profil gelişimi üst katın kireç içeriğini değiştirebilir.",
      ],
      [
        "İç kesimde bozkır yamaçları ve aynı havzada tuzlu kapalı taban bulunuyor. Hangi yaklaşım uygundur?",
        "Bölgesel iklimle yerel su-drenaj koşullarını birlikte kullanmak",
        [
          "Bütün alanı tek tuz düzeyinde saymak",
          "Tuzun varlığını yalnız il adına bağlamak",
          "Bozkır varken alüvyonun olamayacağını söylemek",
          "Kapalı tabanın hiç buharlaşmadığını varsaymak",
        ],
        "Bölgesel ve yerel ölçekte etken değişir.",
        "İklim geniş bağlamı verir; tabandaki su dengesi ve drenaj yerel tuzluluğu açıklamaya katkı sağlar.",
      ],
      [
        "Yüksek çayır alanında humuslu koyu kat ve uzun soğuk dönem verilmiştir. Kesin söylenemeyecek olan nedir?",
        "Her tarım ürününün en yüksek verimi vereceği",
        [
          "Çayır köklerinin organik katkı sağlayabildiği",
          "Yetişme süresinin sınırlayıcı olabileceği",
          "Humusun bir toprak özelliği olduğu",
          "Ek ürün ve yönetim verisinin gerektiği",
        ],
        "Olumlu toprak özelliği bütün sınırlamaları silmez.",
        "Humus zenginliği önemlidir; uzun soğuk dönem ve ürün gereksinimi ayrıca etkilidir. Sayısal verim bu bilgilerden tek başına çıkmaz.",
      ],
      [
        "X yamaç eteğinde kısa mesafeli, az boylanmış malzeme; Y nehir taşkın tortusudur. En uygun eşleştirme?",
        "X kolüvyal; Y alüvyal",
        [
          "X alüvyal; Y yalnız volkanik lav",
          "İkisi de zorunlu aynı buzul moreni",
          "X yalnız kimyasal tuz; Y yalnız humus",
          "İkisi de taşıma görmemiş sağlam kaya",
        ],
        "Taşıyıcı kanıtını oku.",
        "Yamaç eteği malzemesi kolüvyal, akarsu tortusu alüvyal bağlamdadır; yeni yüzeylerde zamanla toprak gelişebilir.",
      ],
      [
        "Bir alüvyal parsel yüksek tuzludur ve kök bölgesi uzun süre suya doygundur. Hangi sonuç uygundur?",
        "Alüvyal adı tuz ve havalanma risklerini ortadan kaldırmaz",
        [
          "Alüvyal olduğu için analiz gereksizdir",
          "Yüksek tuz her bitkiye aynı yararı sağlar",
          "Suya doygunluk her zaman daha çok hava demektir",
          "Bu bilgiler kesin ton/ha verimini verir",
        ],
        "Doku adı ile kullanım sonucu farklıdır.",
        "Tuz su alımını, uzun doygunluk havalanmayı etkileyebilir. Ürün ve yönetim verilmeden verim hesaplanmaz.",
      ],
      [
        "Bir toprakta ana malzemenin şişen kili, başka örnekte taban suyu baskındır. Okul sınıflamasında hangi mantık önemlidir?",
        "Yerel etkenlerin baskın oluşu",
        [
          "Yalnız enlemden tek karar çıkması",
          "İki örneğin bütün katlarının zorunlu yokluğu",
          "Bütün Türkiye’nin aynı intrazonal profil olması",
          "Ana malzemenin hiçbir etkisi olmaması",
        ],
        "Grup adı kat yokluğu değil baskın etkenle ilgilidir.",
        "İntrazonal örneklerde ana malzeme veya drenaj gibi yerel koşullar öne çıkabilir; bu bütün horizonların yokluğu demek değildir.",
      ],
      [
        "Verimli ova tabanının yapılaşmayla kaplanması için hangi yorum uygundur?",
        "Toprağın üretim ve suyla ilişkili işlevleri kaybolabilir",
        [
          "Yalnız renk değişir, bütün işlevler zorunlu korunur",
          "Bütün yapılaşmalar toprağı sınırsız artırır",
          "Toprak koruma yalnız dağ zirvelerini ilgilendirir",
          "İdari kent sınırı tarımsal yeteneği otomatik yaratır",
        ],
        "Toprağı yüzey rengi değil işlevleriyle düşün.",
        "Örtülme üretim ve su akışı gibi işlevleri değiştirebilir. Karar yerel arazi niteliği ve uzun dönem etkileriyle değerlendirilir.",
      ],
      [
        "Bir kaynakta belirli yılın tarım alanı yüzdesi veriliyor. Güncel ölçüm diye kullanmak için hangisi gerekir?",
        "Yıl, payda ve güncel veri karşılaştırması",
        [
          "Yalnız sayıyı aynı biçimde kopyalamak",
          "Yüzdeyi tarih dışı sabit kabul etmek",
          "Payı ve paydayı eş anlamlı saymak",
          "Eski değerin her il için de aynı olduğunu varsaymak",
        ],
        "Yüzde zaman ve ölçüm sınırına bağlıdır.",
        "Arazi kullanım oranları yıl ve tanıma bağlıdır. Eski kaynak sayısı doğrulanmadan güncel ülke ölçümü sayılamaz.",
      ],
      [
        "Aynı eğimli toprakta bitki örtüsü kaldırılıp yüzey akışı artıyor. Hangi baskı doğrudan desteklenir?",
        "Üst katın taşınma riski artabilir",
        [
          "Toprak kesin anında yeni kaya olur",
          "Tuz miktarı zorunlu her yerde sıfırlanır",
          "Drenaj sorunu her koşulda tamamen çözülür",
          "Ürün verimi veri olmadan kesin iki kat olur",
        ],
        "Verilen süreç örtü ve akan su ilişkisidir.",
        "Örtü kaybı ve artan yüzey akışı aşınma riskini artırabilir. Tuz, drenaj ve verim için ayrı veriler gerekir.",
      ],
    ],
    source:
      "Aurelia Türkiye’de Topraklar kopya kağıdı; OGM Dersler Cepte Topraklar PDF 15–16; MEBİ TYT Coğrafya PDF 87–89 gerçek seçili öğretim ve Türkiye toprak şekilleriyle karşılaştırılmış özgün anlatım ve sorular.",
  },
  {
    id: "dunya-bitkileri",
    topic: "detail-60",
    title: "Dünya’da bitkiler: su, sıcaklık ve büyüme zamanı",
    minutes: 65,
    objectives: [
      "Ağaç, çalı ve ot topluluklarını yapı ve çevre koşullarıyla karşılaştır.",
      "Yıllık yağış toplamını mevsim dağılımından ayır.",
      "Enlem, yükselti, toprak ve insan etkisinin birlikte çalıştığını açıkla.",
    ],
    sections: [
      {
        title: "Bitki topluluğu tek bir tür değildir",
        paragraphs: [
          "Bitki örtüsü bir alandaki bitkilerin oluşturduğu bütünü, bitki topluluğu ise benzer yapı ve çevre ilişkileriyle ele alınan grupları anlatır. Orman, çalı ve ot gibi yapı farkları ilk ayrımı sağlar. Bir orman adı o alanda yalnız tek tür yaşadığını göstermez; katlar, yaşlar ve eşlik eden türler değişebilir.",
          "Ağaç, çalı ve otsu yapı bitkinin büyüme biçimiyle ilgilidir. Bütün otsu bitkiler tek yıllık değildir; çok yıllık otlar da bulunur. İğne yapraklı her türün bütün yıl yapraklarını koruduğu da doğru değildir. Sınıflama yaparken genel örüntüyü öğren, fakat gruptaki her türe koşulsuz aynı yaşam süresini atama.",
        ],
      },
      {
        title: "Yağışın miktarı kadar zamanı önemlidir",
        paragraphs: [
          "Bitkinin kullanabildiği su yalnız yıllık yağış toplamına bağlı değildir. Yağışın büyüme dönemine dağılımı, sıcaklıkla ilişkili su kaybı, toprağın depolaması ve kök erişimi önemlidir. Aynı 600 mm toplamı her ay 50 mm veya uzun bir kurak dönem içeren başka bir dizi oluşturabilir. İki yıllık toplam eşitken su stresi farklılaşabilir.",
          "Etkileşimdeki iki aylık dizi özgün temsildir; gerçek şehir normali değildir. Yaz kurak dizisini seçmek tek başına kesin maki veya kesin bozkır üretmez. Sıcaklık, toprak ve geçmiş gibi ek koşullar gerekir. Ama eşit toplamın eşit büyüme ortamı olmadığını gösterir; bu çıkarım başka bir iklim sorusuna da taşınabilir.",
        ],
      },
      {
        title: "Sıcaklık büyüme penceresini sınırlar",
        paragraphs: [
          "Bitkiler için sıcaklığın ortalaması yanında aşırı soğuk, don süresi ve büyüme döneminin uzunluğu önemlidir. Bir alan yeterli su alsa bile çok kısa serin dönem ağaç gelişimini sınırlayabilir. Ekvator çevresindeki yıl boyu sıcak koşulla kutba yakın kısa büyüme zamanı aynı su miktarında aynı sonucu vermez.",
          "Enlem ve yükselti sıcaklıkla bağlantılı genel örüntüler sağlar, fakat tek bir enlem bütün bitkiyi belirlemez. Deniz etkisi, bakı, hava hareketleri ve yerel toprak da devrededir. Yükselti artışındaki değişim, enlem boyunca değişime benzer bazı kuşaklar oluşturabilir; aynı türlerin aynı sırayla ve aynı metrelerde bulunacağı garantisi değildir.",
        ],
      },
      {
        title: "Ekvatoral ormanda katlı yapı",
        paragraphs: [
          "Yıl boyu sıcak ve bol nemli uygun alanlarda geniş yapraklı, sık ve katlı ormanlar gelişebilir. Üst ağaçlar, alt ağaç-çalı katları, sarılıcı ve başka yaşam biçimleri ışık ve su rekabetiyle ilişkilidir. Tek bir ağacın resmi bütün topluluğun çeşitliliğini veya kat yapısını temsil etmez.",
          "Ormanın gür olması toprağın sınırsız besin deposu olduğu anlamına gelmez. Besinlerin önemli bölümü canlı biyokütlede tutulabilir, hızlı döngü ve yıkanma yüzey stokunu etkileyebilir. Orman kaldırıldığında eski besin döngüsünün otomatik sürdüğü varsayılmaz. Bitki örtüsü, toprak ve kullanım etkisi ayrı depolar ve akışlar olarak düşünülür.",
        ],
      },
      {
        title: "Muson ve yaprak döken ormanları koşullandır",
        paragraphs: [
          "Sıcak kuşakta yağışlı-kurak mevsim ayrımı bazı ormanların yaprak davranışına yansıyabilir. Muson çevreleri geniş bir bölgesel örüntüyü anlatır; bütün noktaların aynı süreyle aynı miktarda yağış aldığı söylenmez. Ilıman nemli alanlarda geniş yapraklı ormanlar ve uygun geçişlerde karışık topluluklar görülebilir.",
          "Yaprak dökme soğuk veya kurak dönemin baskısına karşı farklı bağlamlarda gelişebilir. Aynı davranışın iki yerde bulunması iklimlerin bütün yönlerden aynı olduğunu kanıtlamaz. Yaprak tipi, sıcaklık ve yağış mevsimi birlikte okunmalıdır. Tek türün yerel varlığı da bölgenin doğal baskın topluluğunun kesin haritası yerine kullanılmaz.",
        ],
      },
      {
        title: "Tayga ve tundra farklı sınırlara sahiptir",
        paragraphs: [
          "Uzun soğuk dönemli uygun nemli kuzey alanlarda tayga adı verilen iğne yapraklı ormanlar yaygındır. Ağaç gövdeleri ve orman katı taygayı ağaçsız tundra görünümünden ayırır. Tundrada kısa büyüme dönemi, don ve zemin koşulları yosun, liken ve kısa bitki topluluklarıyla ilişkilidir.",
          "Tundra kalıcı buz örtüsünün veya bütünüyle bitkisiz çölün başka adı değildir. Soğuk baskısının varlığı her yerde aynı türün yaşayacağı anlamına gelmez; yerel su ve zemin de önemlidir. Bir fotoğrafta kısa bitki görmekle kesin tundra kararı verilmez; enlem-yükselti, büyüme süresi ve diğer kanıtlar aranır.",
        ],
      },
      {
        title: "Maki ve daha seyrek çalı örtüleri",
        paragraphs: [
          "Yaz kuraklığına uyumlu sert yapraklı çalı toplulukları Akdeniz iklimi çevresinin önemli örnekleridir. Maki bir çalı formasyonudur; yaprak özellikleri su kaybını sınırlamaya katkı verebilir. Her makinin tek bir geçmişte aynı ormanın yok edilmesiyle oluştuğu iddiası fazla geniştir; doğal ve insan etkili farklı gelişim yolları vardır.",
          "Daha seyrek, alçak çalı örtüleriyle maki arasındaki ilişkide toprak, yangın, otlatma ve tahrip geçmişi önemlidir. Garig gibi okul adlarını yalnız her yerde aynı ardışık basamağın zorunlu sonucu sayma. Bir değişim okunun doğru olması için başlangıç örtüsü, baskı ve zaman koşulu belirtilmelidir; çizim tek başına tarih yazmaz.",
        ],
      },
      {
        title: "Savan, bozkır, preri ve çayır",
        paragraphs: [
          "Savan sıcak koşullarda yağışlı-kurak mevsim ayrımıyla ilişkili uzun ot ve seyrek ağaç topluluklarını anlatır. Bozkır veya step yarı kurak çevrelerdeki otsu örtü örneğidir; mevsimsel büyüme suya bağlı olarak belirginleşebilir. Otların bulunması her iki topluluğu aynı sıcaklık ve aynı tür bileşimine sahip yapmaz.",
          "Preri ve pampa gibi bölgesel adlar geniş ot alanlarının coğrafi bağlamını anlatır. Dağ çayırlarında yükselti ve kısa büyüme dönemi başka koşullar getirir. Bir kıtanın adını görmek bütün ot alanının aynı kullanım geçmişine sahip olduğu anlamına gelmez. Otlatma, yangın ve tarıma açılma doğal topluluğu değiştirebilir.",
        ],
      },
      {
        title: "Çölde bitkisizlik ve tek tür genellemesinden kaçın",
        paragraphs: [
          "Su çok sınırlı olduğunda seyrek örtü ve kuraklığa uyumlu yapılar görülebilir; bazı dönemlerde kısa süreli büyüme de olur. Derin kök, su depolama veya küçük yaprak gibi farklı çözümler aynı işlevsel baskıya yanıt verebilir. Her çöl tamamen bitkisiz değildir; farklı kurak alanların türleri birbirinin aynısı değildir.",
          "Kaktüs resmi bütün dünya çöllerinin doğal bitkisini temsil etmez; türlerin doğal coğrafi geçmişi vardır. İnsanla taşınmış bir türün bulunması doğal yayılış kanıtıyla aynı değildir. Benzer biçim, akrabalık veya aynı kıta kökeni konusunda tek başına kesin sonuç sağlamaz. Şekli, işlevi ve doğal yayılışı ayrı yorumla.",
        ],
      },
      {
        title: "Maki, garig ve psödomakiyi olumlu özellikleriyle ayır",
        paragraphs: [
          "Maki için yabani zeytin, defne, mersin ve keçiboynuzu gibi sert yapraklı çalı veya bodur ağaç örnekleri verilir. Garig ya da frigana; Akdeniz çevresinde daha seyrek ve alçak çalı örtüsü bağlamıdır. Dikenli çalılar ve laden örneklenebilir; eğim, sığ toprak ve tahrip geçmişi gelişime katılır. Her garig için aynı tek geçmiş zorunlu değildir.",
          "Psödomaki, nemli ılıman orman çevresinde orman altı veya tahrip sonrası gelişen çalı topluluğu okul adıdır. Şimşir, çobanpüskülü, orman gülü ve kızılcık örnekleri bu bağlamı tanıtır. Toplulukta yaprak dökenler de bulunur; bütün türleri aynı yaprak davranışına zorlamak yanlıştır. Maki ile benzer çalı görünümü yağış ve soğuk dönem koşullarını eşitlemez.",
        ],
        table: {
          headers: ["Örnek veya ad", "Süreç ve anlam"],
          rows: [
            [
              "Maki",
              "Yaz kuraklığına uyumlu çalı-bodur ağaç; defne, mersin, yabani zeytin.",
            ],
            [
              "Garig / frigana",
              "Daha seyrek alçak çalı; sığ toprak, kuraklık ve baskı geçmişi önemli.",
            ],
            [
              "Psödomaki",
              "Nemli orman çevresi çalıları; şimşir, orman gülü, kızılcık örnekleri.",
            ],
          ],
        },
      },
      {
        title: "Dünya örneklerini haritaya yerleştir",
        paragraphs: [
          "Amazon ve Kongo havzaları ile Endonezya’nın uygun kesimleri ekvatoral yağmur ormanı örnekleridir. Güney-Güneydoğu Asya’nın muson ormanlarında tik ağacı karakteristik örnek olarak öğretilir. Kuzey Avrasya ve Kuzey Amerika’nın geniş soğuk orman kuşağı tayga bağlamındadır; ılıman nemli kuşakta kayın-gürgen ile ladin-sarıçam gibi geniş ve iğne yapraklılar birlikte veya ayrı topluluklar kurabilir.",
          "Maki benzeri Akdeniz tipi çalılar Akdeniz dışında Kaliforniya, Orta Şili, Kap çevresi ve Avustralya’nın uygun güneybatı kesimlerinde de görülür; türler birebir aynı değildir. Savan Afrika, Güney Amerika ve Avustralya’nın uygun sıcak mevsimsel yağış alanlarında bulunur. Polen-tohum taşıyan hayvanlar ve insan kullanımı yayılışı değiştirir. Kozmopolit geniş doğal yayılış, endemik ise tanımlı dar doğal alan ilişkisidir; nadirlik ayrı ölçüttür.",
        ],
      },
      {
        title: "Dünya haritasını tek nedene indirgeme",
        paragraphs: [
          "Bir topluluk seçerken sıcaklık, suyun mevsimi, büyüme zamanı, ana malzeme ve insan etkisini birlikte sırala. Harita genel kuşakları gösterebilir; dağların bakısı ve deniz etkisi küçük alanda büyük fark yaratır. Aynı enlemde orman, ot veya kurak alan bulunabilmesi bu çok etkenli yapıyla tutarlıdır.",
          "Şekildeki katları ve aylık yağış çubuklarını aynı veri gibi okuma: biri seçili topluluk şeması, diğeri bağımsız temsilî koşul dizisidir. Yağış değişimini kanıtla yorumla fakat eksik sıcaklıktan kesin tür üretme. Tahmin ve gerekçe öğrenme denemesidir; tek bir düğme gerçek arazi haritası veya doğru sınav yanıtı kaydı oluşturmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "600 mm iki ayrı yıl",
        prompt:
          "X her ay 50 mm; Y ilk dört ay 80, sonraki beş ay 20, son üç ay 60 mm alıyor. Toplam ve en düşük ayı karşılaştır.",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "X toplam 12×50=600 mm; minimum 50 mm.",
          },
          {
            label: "2. adım",
            explanation: "Y toplam 4×80+5×20+3×60=600 mm; minimum 20 mm.",
          },
          {
            label: "3. adım",
            explanation:
              "Yıllık eşitlik aylık su koşulunu eşitlemez; kesin bitki için sıcaklık ve toprak da gerekir.",
          },
        ],
        answer: "Toplamlar 600; minimumlar 50 ve 20 mm.",
        check: "Yağışın gerçek kent normali olduğu iddia edilmedi.",
        pitfall: "Eşit toplamdan aynı bitkiyi zorunlu çıkarmak.",
      },
      {
        title: "Ağaçlı soğuk alan mı, kısa örtü mü?",
        prompt:
          "X uzun soğuk dönemli iğne yapraklı orman, Y çok kısa büyüme dönemli ağaçsız yosun-liken alanı olarak verilmiştir. İki okul topluluğunu ayır.",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "X’in belirgin ağaç katı vardır.",
          },
          {
            label: "2. adım",
            explanation:
              "Y’de kısa büyüme dönemi ve ağaç sınırlaması verilmiştir.",
          },
          {
            label: "3. adım",
            explanation: "X tayga, Y tundra bağlamını destekler.",
          },
        ],
        answer: "X tayga; Y tundra.",
        check: "Y bütünüyle canlısız sayılmadı.",
        pitfall: "Soğuk olan her alana aynı orman adını vermek.",
      },
      {
        title: "Aynı enlem başka örtü",
        prompt:
          "Aynı enlemde X nemli kıyı, Y dağ arkasında kurak iç kesimdir. Aynı doğal topluluk zorunlu mu?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Enlem ortak bir etkendir.",
          },
          {
            label: "2. adım",
            explanation: "Nem ve deniz etkisi farklıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Tek ortak etken bütün çevreyi eşitlemez; farklı örtü mümkündür.",
          },
        ],
        answer: "Hayır; su ve yer şekli farkı önemlidir.",
        check: "Tür adı için verilmeyen ayrıntı uydurulmadı.",
        pitfall: "Enlemi tek belirleyici yapmak.",
      },
      {
        title: "Gür orman, sınırsız toprak deposu mu?",
        prompt:
          "Sıcak-nemli ormanda hızlı organik döngü ve güçlü yıkanma veriliyor. Gür orman kalın humusu kesin kanıtlar mı?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Canlı biyokütle ayrı bir besin deposudur.",
          },
          {
            label: "2. adım",
            explanation:
              "Hızlı ayrışma ve yıkanma yüzey stokunu sınırlayabilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Gür bitki örtüsü tek başına kalın humus veya yüksek ürün verimi değildir.",
          },
        ],
        answer: "Hayır; döngü ile stok ayrılmalıdır.",
        check: "Toprak ve canlıdaki miktar aynı sayılmadı.",
        pitfall: "Bitki görünümünü toprak analizi yerine koymak.",
      },
    ],
    recall: [
      {
        prompt: "Aynı yıllık yağış aynı ortam mıdır?",
        answer: "Hayır; mevsim dağılımı, sıcaklık ve toprak da gerekir.",
      },
      {
        prompt: "Bütün otlar tek yıllık mı?",
        answer: "Hayır; çok yıllık otsu türler de vardır.",
      },
      {
        prompt: "Tundra canlısız buz alanı mıdır?",
        answer: "Hayır; kısa ot, yosun ve liken gibi topluluklar bulunabilir.",
      },
      {
        prompt: "Aynı enlem tek bir bitki örtüsü verir mi?",
        answer: "Hayır; deniz etkisi, dağ, su ve insan geçmişi fark yaratır.",
      },
    ],
    items: [
      [
        "X her ay 50 mm, Y ilk dört ay 80, sonraki beş ay 20, son üç ay 60 mm yağış alır. Hangisi doğrudur?",
        "Toplamları 600 mm; aylık dağılımları farklıdır",
        [
          "X toplamı 600, Y toplamı 300 mm’dir",
          "Her ayın yağışı iki yerde zorunlu aynıdır",
          "Y’de kurakça ay minimumu 50 mm’dir",
          "Eşit toplam kesin aynı tür bileşimini verir",
        ],
        "Toplamı ve minimumu ayrı hesapla.",
        "X 600, Y 320+100+180=600 mm. Minimumlar 50 ve 20’dir; tek toplam mevsimsel su koşulunu eşitlemez.",
      ],
      [
        "Yıl boyu sıcak ve bol nemli alanda katlı geniş yapraklı orman tanımlanıyor. Hangi çıkarım zorunlu değildir?",
        "Toprakta sınırsız humus ve besin birikmesi",
        [
          "Farklı bitki katlarının bulunabilmesi",
          "Işık rekabetinin etkili olabilmesi",
          "Canlı biyokütlede besin bulunması",
          "Yıkanmanın toprak deposunu etkileyebilmesi",
        ],
        "Gür bitki ile kalıcı toprak stoku aynı değildir.",
        "Sıcak-nemli koşul hızlı döngü ve yıkanma yaratabilir. Gür orman kalın humusu veya sınırsız tarım verimini garanti etmez.",
      ],
      [
        "X iğne yapraklı ağaçların baskın olduğu uzun soğuk dönemli orman; Y kısa büyüme dönemli ağaçsız yosun-liken alanıdır. Eşleştirme?",
        "X tayga; Y tundra",
        [
          "X tundra; Y ekvatoral orman",
          "X savan; Y maki",
          "X çöl; Y muson ormanı",
          "X maki; Y tayga",
        ],
        "Ağaç katı ve büyüme süresini birlikte kullan.",
        "Verilen yapı ve koşullar tayga ile tundra farkını kurar; yalnız soğuk sözü iki alanı eşitlemez.",
      ],
      [
        "Yaz kuraklığına uyumlu sert yapraklı çalı topluluğu için hangi yaklaşım uygundur?",
        "Maki bağlamını düşünmek; bütün örneklere aynı geçmişi yüklememek",
        [
          "Her örneği mutlaka aynı insan tahribinden türemiş saymak",
          "Topluluğu zorunlu kalıcı buz alanı seçmek",
          "Bütün bitkileri tek yıllık çimen saymak",
          "Yaz kuraklığından kesin bir tür sayısı hesaplamak",
        ],
        "Topluluk yapısı ile oluşum geçmişi farklı bilgidir.",
        "Maki yaz kurak çevrenin önemli çalı topluluğudur. Doğal ve insan etkili yollar değişebilir; tek geçmiş zorunlu değildir.",
      ],
      [
        "Sıcak alanda yağışlı-kurak mevsim, uzun otlar ve seyrek ağaçlar veriliyor. En uygun okul topluluğu?",
        "Savan",
        [
          "Tayga",
          "Tundra",
          "Kalıcı buzul örtüsü",
          "Soğuk iğne yapraklı sık orman",
        ],
        "Ot-ağaç yapısını mevsim koşuluyla bağla.",
        "Sıcak mevsimsel yağış bağlamında uzun ot ve seyrek ağaç savanı destekler. Soğuk orman veya tundra için verilen koşullar uymaz.",
      ],
      [
        "Bütün otsu bitkiler hakkında hangi ifade yanlıştır?",
        "Hepsi mutlaka tek yıllıktır",
        [
          "Bazıları çok yıllık olabilir",
          "Otsu yapı yaşam süresinin tek ölçüsü değildir",
          "Ot toplulukları farklı iklimlerde bulunabilir",
          "Yapı ile doğal yayılış ayrı bilgiler olabilir",
        ],
        "Büyüme biçimi ile yaşam süresini ayır.",
        "Otsu türlerin hem tek hem çok yıllık örnekleri bulunur. Ot sözcüğü tek yıllılığı zorunlu kılmaz.",
      ],
      [
        "Aynı enlemde X nemli deniz kıyısı, Y dağ gerisinde kurak alan olarak verilmiştir. Hangisi doğrudur?",
        "Farklı su koşulları farklı örtüyü destekleyebilir",
        [
          "Enlem aynıysa tüm bitki türleri zorunlu aynıdır",
          "Dağların nem dağılımına hiçbir etkisi olamaz",
          "Yağış toplamına gerek olmadan kesin tür sayısı bulunur",
          "Yalnız saat dilimi doğal örtüyü belirler",
        ],
        "Enlem ortak olsa da diğer etkenler değişir.",
        "Deniz etkisi ve dağların nem üzerindeki etkisi aynı enlemde farklı büyüme ortamları oluşturabilir.",
      ],
      [
        "Kurak alanda seyrek bitkiler ve yağıştan sonra kısa büyüme görülüyor. Hangi genelleme yanlıştır?",
        "Bütün çöller tamamen bitkisiz ve doğal olarak kaktüslüdür",
        [
          "Kuraklığa farklı uyumlar bulunabilir",
          "Doğal türlerin kıtasal geçmişi önemlidir",
          "Su depolama ile kök derinliği farklı çözümlerdir",
          "Benzer şekil aynı tür kökenini tek başına kanıtlamaz",
        ],
        "Çölü tek bir çizimle bütün dünyaya taşıma.",
        "Çöllerde farklı seyrek topluluklar bulunabilir; kaktüs bütün dünya çöllerinin doğal ortak türü değildir.",
      ],
      [
        "Yükselti arttıkça bitki kuşakları değişiyor. Hangi sonuç verilmeden çıkarılamaz?",
        "Bütün dağlarda aynı türlerin aynı metrelerde bulunması",
        [
          "Sıcaklığın etkili olabilmesi",
          "Bakı ve nemin yerel fark yaratabilmesi",
          "Yükselti ile enlem örüntülerinin bazı benzerlikleri",
          "Tek bir etkenin yeterli olmayışı",
        ],
        "Genel kuşak örüntüsü sabit tür cetveli değildir.",
        "Sıcaklık ve büyüme koşulları değişir; ancak bakı, nem, toprak ve coğrafi geçmiş kesin tür ve sınırları farklılaştırır.",
      ],
      [
        "Doğal orman alanı tarıma açılıyor. Hangi yaklaşım uygundur?",
        "Örtü, toprak ve insan etkisini birlikte değerlendirmek",
        [
          "Yeni kullanımın eski besin döngüsünü zorunlu aynen koruduğunu söylemek",
          "Bir tarla fotoğrafından eski bütün türleri kesin saymak",
          "İnsan etkisinin bitki örtüsünü değiştiremeyeceğini varsaymak",
          "Orman kaybını yalnız yaprak rengi değişimi kabul etmek",
        ],
        "Toplulukla toprak arasındaki akışlar değişebilir.",
        "Örtünün kaldırılması madde döngüsü, su ve toprak ilişkilerini etkileyebilir. Yeni kullanım eski doğal döngünün aynısı değildir.",
      ],
    ],
    source:
      "Aurelia Dünya’da Bitkiler kopya kağıdı; OGM Dersler Cepte Bitkiler PDF 19–20; MEBİ TYT Coğrafya PDF 90–92 gerçek seçili harita ve metinleriyle karşılaştırılmış özgün öğretim. Aylık diziler temsilîdir, kent normali değildir.",
  },
  {
    id: "turkiye-bitkileri",
    topic: "detail-61",
    title: "Türkiye’de bitkiler: yamaç, yükselti ve geçmiş",
    minutes: 65,
    objectives: [
      "Kıyı, iç kesim ve yüksek alanlardaki bitki örüntülerini birlikte açıkla.",
      "Maki, orman, bozkır ve çayırı tek bir nedene indirgeme.",
      "Endemik ile relikt kavramlarını ve insan etkisini kanıtla ayır.",
    ],
    sections: [
      {
        title: "Çeşitlilik birden çok çevrenin kesişimidir",
        paragraphs: [
          "Türkiye’de denizlerle iç kesimlerin farklı nem ve sıcaklık koşulları, dağların yönü ve yükselti farkları kısa mesafede değişik yaşam ortamları oluşturur. Geçmiş iklim ve türlerin yayılış yolları da bugünkü çeşitliliğe katılır. Bu nedenle bitki haritası yalnız ülkenin ortalama sıcaklığının bir resmi değildir.",
          "Bir bölgedeki tür zenginliğiyle tek türün o bölgeye özgü olması farklı ölçütlerdir. Kaynaklarda verilen bitki takson sayısı ve orman oranı belirli tarihin verisi olabilir; burada güncel sayı uydurulmaz. Karşılaştırmada tanım, alan ve yıl aynı olmalıdır. Bir ili tek renkli haritada görmek bütün yamaçlarında aynı türün bulunduğunu göstermez.",
        ],
      },
      {
        title: "Karadeniz’e açık yamaçta nemin yolu",
        paragraphs: [
          "Denizden gelen nemli hava dağ yamacında yükselip soğuduğunda yağış koşulları desteklenebilir. Karadeniz’e açık uygun yamaçlarda nemli ormanlar bu bağlamla ilişkilidir. Geniş yapraklı, karışık ve iğne yapraklı kuşakların yerel dağılışı sıcaklık ve yükseltiyle de bağlantılıdır; kıyı adı tek başına bütün katları aynı yapmaz.",
          "Dağın iç kesime bakan tarafında deniz etkisi azalabilir. Bakı, vadi açıklığı, toprak ve insan kullanımı da fark yaratır. Her kuzey yamaç aynı yağışı alır veya her güney yamaç mutlaka daha az bitkilidir gibi evrensel sonuçlar çıkarılmaz. Deniz yönü ve yerel topografya soruda verilen koşullarla okunur.",
        ],
      },
      {
        title: "Akdeniz çevresinde yaz kuraklığı ve örtü mozaiği",
        paragraphs: [
          "Kızılçam çevreleri ve maki toplulukları yaz kuraklığı olan Akdeniz çevresinin önemli örnekleridir. Sert yapraklı çalıların su kaybını sınırlayan özellikleri kurak döneme uyumla ilişkilendirilebilir. Bu alanların hepsinin yalnız çalıdan veya yalnız aynı ağaç türünden oluştuğu söylenmez; yükselti ve kullanım farklı topluluklar yaratır.",
          "Maki her yerde yalnız tek bir ormanın yok edilmesinin zorunlu ürünüdür denmez; doğal ve ikincil gelişim yolları vardır. Tahripten sonra daha seyrek örtü oluşabilir, fakat sonuç yangın sıklığı, toprak ve yenilenme koşuluna bağlıdır. Etkileşimde tahrip düğmesi yalnız örtü kaybı senaryosunu gösterir; kesin yeni tür listesi üretmez.",
        ],
      },
      {
        title: "Yükselti sınırları bağlama bağlıdır",
        paragraphs: [
          "Yükseldikçe sıcaklığın azalması ve büyüme döneminin kısalması orman ve yüksek dağ bitkilerinin dağılışını etkiler. Bazı kesitlerde alt kuşakta maki veya kızılçam, daha yukarıda farklı ormanlar ve yükseklerde dağ çayırları gösterilebilir. Bu sıra her dağın aynı metrelerinde birebir tekrarlanan cetvel değildir.",
          "Maki veya orman üst sınırı; enlem, deniz etkisi, bakı, kar örtüsü ve insan geçmişiyle değişebilir. Modelde 1.200 ve 2.200 m çizgileri yalnız özgün kesitin görsel duraklarıdır. Bu sayılardan gerçek her yerde kesin tür adı çıkarılmaz. Soru belirli bir dağılışı veriyorsa o koşulda kıyas yapılır; verilmeyen gerçek sınırlar uydurulmaz.",
        ],
      },
      {
        title: "İç kesimde bozkır ve ağaç yokluğunun farklı nedenleri",
        paragraphs: [
          "Karasallık ve yarı kurak koşullar İç Anadolu gibi alanlarda bozkır topluluklarıyla ilişkilidir. Otsu örtü yağışlı dönemde büyüyüp kurak dönemde belirgin değişim gösterebilir. Ancak bütün iç alanlar dümdüz tek bir çayır veya tek toprak değildir; vadi, dağ ve suya erişim yerel orman parçaları ya da başka toplulukları destekleyebilir.",
          "Doğal bozkırla eski ormanın insan etkisiyle açıldığı alan aynı tarih değildir. Antropojen bozkır ifadesi insan etkili köken bağlamını anlatır; her ağaçsız alanın mutlaka eski orman olduğu kanıtlanmış sayılmaz. Geçmiş örtü, iklim ve kullanım verisi gerekir. Bir fotoğrafta yalnız ot görmek oluşum tarihini tek başına belirlemez.",
        ],
      },
      {
        title: "Kuzeydoğu yüksek alanlarında çayırlar",
        paragraphs: [
          "Uygun serin ve yaz nemi olan kuzeydoğu yüksek alanlarında çayırlar önemli örneklerdir. Uzun boylu otlar ve büyüme zamanı hayvancılıkla ilişki kurabilir. Fakat doğu yönü tek başına çayır demek değildir; yağış, yükselti ve yer şekli başka doğu alanlarında farklı örtüler oluşturabilir.",
          "Dağ çayırlarıyla iç kesimin kurakça bozkırı aynı ot topluluğunun her yerde aynı adı değildir. Yaz yağışı, büyüme dönemi ve tür bileşimi farklılaşabilir. Otlatma baskısı ve toprak kaybı bu alanları değiştirebilir. Bir kullanımın yaygın olması doğal üretimin sınırsız olduğu anlamına gelmez; yenilenme kapasitesi ve yerel koşul düşünülmelidir.",
        ],
      },
      {
        title: "Endemik: yayılış alanı sınırlı",
        paragraphs: [
          "Endemik tür, doğal yayılışı belirli bir bölgeyle sınırlı olan türü anlatır. Bölgenin büyüklüğü ve hangi coğrafi sınırın kastedildiği açık olmalıdır. Bir tür yalnız Türkiye’de doğal bulunabilir ama bulunduğu alanlarda çok sayıda bireye sahip olabilir. Bu yüzden endemik sözcüğü doğrudan az bireyli demek değildir.",
          "Nadirlik, tehdit düzeyi ve endemiklik ayrı değerlendirmelerdir. Dar yayılış, habitat kaybına karşı kırılganlığı artırabilir; yine de risk için gerçek dağılış ve baskı verileri gerekir. Bahçeye taşınmış bir birey doğal yayılış sınırının değiştiğini tek başına göstermez. Türün doğal alanı ile insan eliyle bulunduğu yer ayrı kaydedilir.",
        ],
      },
      {
        title: "Relikt: geçmiş dağılışın kalıntısı",
        paragraphs: [
          "Relikt topluluk veya tür, geçmişte daha geniş ya da farklı koşullarda yaygınken bugün sınırlı uygun alanlarda kalan örnekleri anlatır. Kavramın odağı tarihsel dağılış değişimidir; yalnız çok yaşlı tek bir ağacın yaşı değildir. Geçmiş iklim ve sığınak alan ilişkisi bu nedenle önemlidir.",
          "Bir tür hem endemik hem relikt olabilir, fakat iki küme aynı değildir. Endemiklik doğal coğrafi sınıra, reliktlik tarihsel yayılışın kalıntısı olma durumuna dayanır. Soruda iki koşul birlikte verilirse iki nitelik birlikte seçilebilir. Yalnız bir özelliğin verilmesi diğerini otomatik kanıtlamaz; harita ve zaman eksenini ayır.",
        ],
      },
      {
        title: "Ormanı kullanmak ve örtüyü korumak",
        paragraphs: [
          "Ormanlar yalnız odun stoku değil; su hareketi, yamaç dengesi, habitat ve karbon döngüsüyle ilişkili ekosistemlerdir. Yangın, aşırı otlatma, yapılaşma ve uygunsuz kesim örtüyü değiştirebilir. Her yangın sonrası aynı sürede aynı topluluk geri gelmez; tohum kaynağı, toprak ve tekrar baskısı önemlidir.",
          "Ağaçlandırma veya onarımda yerel iklim, tür seçimi ve su gereksinimi düşünülür. Doğal bozkırın her yerine yoğun orman dikmenin koşulsuz doğru olduğu varsayılmaz; mevcut ekosistemin işlevi de korunmalıdır. Uygun örtü koruma, erozyonu azaltma ve biyolojik çeşitlilik aynı plan içinde fakat ayrı gerekçelerle değerlendirilir.",
        ],
      },
      {
        title: "Orman bölgelerini tür örnekleriyle öğren",
        paragraphs: [
          "Karadeniz’in uygun nemli alt kesimlerinde ıhlamur, kayın ve gürgen gibi geniş yapraklılar; daha yüksek ve serin uygun kesimlerde ladin veya köknar gibi iğne yapraklılar görülebilir. Kayın–ladin–üstte çayır dizisi nemli düşey kuşak için güçlü bir ipucudur; tek bir tür tek başına bütün bölgeyi kesin kanıtlamaz. Kazdağı ve Uludağ’ın uygun kuzey yamaçları kayın, kestane, gürgen ve ıhlamur örnekleri taşır.",
          "Akdeniz ve Toros bağlamında kızılçam, karaçam, köknar ve sedir örnekleri; içe bakan dağ yamaçlarında meşe, karaçam ve ardıç toplulukları bulunabilir. Kuzeydoğuda Oltu, Sarıkamış, Şenkaya ve Göle çevresi sarıçam örnekleriyle anlatılır. İç bölgedeki ormanın parçalı oluşunda su kısıtı ve kullanım geçmişi birlikte etkili olabilir; bütün ağaçsızlık yalnız tahrip değildir.",
        ],
        table: {
          headers: ["Örnek veya ad", "Süreç ve anlam"],
          rows: [
            [
              "Kuzey Anadolu",
              "Nemli geniş yapraklı, karışık ve iğne yapraklı kuşaklar; kayın, gürgen, ladin örnekleri.",
            ],
            [
              "Akdeniz / Toros",
              "Kızılçam, karaçam, köknar, sedir; yerel yükselti ve nem koşulu gerekir.",
            ],
            [
              "Batı Anadolu",
              "Kazdağı–Uludağ uygun kuzey yamaçlarında kayın, kestane, gürgen, ıhlamur.",
            ],
            [
              "İç ve kuzeydoğu alanlar",
              "Meşe, ardıç, karaçam; uygun soğuk kuzeydoğu çevresinde sarıçam.",
            ],
          ],
        },
      },
      {
        title: "Çalı ve otların türlerini koşuluyla tanı",
        paragraphs: [
          "Türkiye makilerinde defne, mersin, menengiç, sakız ve keçiboynuzu örnekleri bulunur. Kaynakların Akdeniz için yaklaşık 1.000 m, Ege için 800 m, Marmara için 500 m maki üst sınırı değerleri bölgesel öğretim özetidir; gerçek her yamaç için kesin cetvel değildir. Karadeniz kıyısının uygun nemli alanlarında psödomaki orman altı veya açılmış alan çalılarını anlatır; garig Ege-Akdeniz çevresinde seyrek alçak çalı bağlamıdır.",
          "Geven, çoban yastığı, yavşan otu ve gelincik bozkır için verilen örneklerdir; her türün bütün yayılışı yalnız bozkırla sınırlı sayılmaz. Erzurum, Kars ve Ardahan’ın uygun yüksek nemli alanlarındaki uzun boylu çayırla yazın sararan yarı kurak bozkır farklı koşullar taşır. Alpin çayır, ağaç gelişiminin sınırlanabildiği yüksek dağ ot topluluğudur; kaynakta yaklaşık 2.000 m örneklenmesi evrensel sınır değildir.",
        ],
      },
      {
        title: "Kasnak meşesi ile sığlanın alan sınırını doğru kur",
        paragraphs: [
          "Kasnak meşesi, Quercus vulcanica, doğal alanı Türkiye olan endemik tür örneğidir; güneybatı Anadolu’nun uygun alanlarıyla ilişkilendirilir. Sığla, Liquidambar orientalis, geçmiş dağılışın kalıntısı olan relikt örneğidir. Kaynak iki adı endemik–relikt ilişkisini düşünmek için birlikte anabilir; her iki kavramın ölçütü yine ayrı kalır.",
          "Sığlanın doğal yayılışı Rodos ile batı-güneybatı Türkiye’yi de içerir. Bu nedenle sığla için Türkiye dışında doğal hiç yok demek doğru değildir; dar doğal alanı Doğu Akdeniz bölgesi ölçeğinde düşünmek gerekir. Bahçedeki dikilmiş birey doğal yayılış kanıtıyla aynı değildir. Tür adı, coğrafi sınır ve tarihsel dağılış birlikte yazılır; yalnız cins adına bakıp bütün türleri aynı ülke endemiği sayma.",
        ],
      },
      {
        title: "Kesiti yorumla, kesin tür uydurma",
        paragraphs: [
          "Önce denize açıklık ve nemi, sonra yükselti-bakıyı, ardından toprak ve insan geçmişini ekle. Şekilde üst kesim örneği seçmek yalnız konumu ve koşulu değiştirir; gerçek bir dağın tür haritası hesaplanmaz. Yazdığın tahmin, verilen kanıtla karşılaştırılır; eksik veri açıkça belirtilir.",
          "Bir soru endemikliği soruyorsa doğal yayılış sınırını; reliktliği soruyorsa geçmişten bugüne değişimi ara. Bozkır sorusunda doğal kuraklıkla insan etkisini ayır. Bu yöntem yalnız bitki adı ezberinden daha geniş aktarım sağlar. Model kullanımı puan veya konu tamamlama kanıtı değildir; yeni bağlamdaki soruda gerekçeli karar gerekir.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı yükseklikte iki yamaç",
        prompt:
          "Aynı yükseklikte X denizden nem alan yamaç, Y dağ gerisinde daha kuru alandır. Aynı örtü zorunlu mu?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Yükselti ortaktır.",
          },
          {
            label: "2. adım",
            explanation: "Nem ve denize açıklık farklıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Diğer etkenler aynı olmadığı için farklı örtü mümkün; kesin tür için ek veri gerekir.",
          },
        ],
        answer: "Hayır; nem farkı önemlidir.",
        check: "Yükseklik tek değişken yapılmadı.",
        pitfall: "Aynı metreyi aynı bitkiyle eşitlemek.",
      },
      {
        title: "İki kümenin ortak elemanı",
        prompt:
          "T türünün doğal yayılışı yalnız belirli bir bölgede; geçmişte daha geniş alandan kalan sığınak dağılışı da verilmiştir. İki kavram?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Doğal yayılış sınırı endemikliği destekler.",
          },
          {
            label: "2. adım",
            explanation:
              "Geçmiş geniş dağılışın kalıntısı reliktliği destekler.",
          },
          {
            label: "3. adım",
            explanation:
              "Koşullar birlikte verildiği için iki nitelik bir arada bulunabilir.",
          },
        ],
        answer: "T hem endemik hem relikt olarak tanımlanabilir.",
        check: "Nadir birey sayısı verilmedi; eklenmedi.",
        pitfall: "Endemik ve relikti eş anlamlı sanmak.",
      },
      {
        title: "Ot fotoğrafından geçmiş çıkmaz",
        prompt:
          "Bir alanda yalnız ot görülüyor; eski örtü ve insan kullanımı verilmemiştir. Antropojen bozkır kesin mi?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Görünüm ağaçsız örtüyü gösterir.",
          },
          {
            label: "2. adım",
            explanation:
              "Doğal yarı kurak koşul veya insan geçmişi ayırt edilmemiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "Antropojen köken için geçmiş ve kullanım kanıtı gerekir.",
          },
        ],
        answer: "Kesin değil; oluşum geçmişi eksiktir.",
        check: "Fotoğrafla tarih arasındaki sınır korundu.",
        pitfall: "Bütün ağaçsız alanı tahrip ormanı saymak.",
      },
      {
        title: "Temsilî çizgi gerçek sınır değildir",
        prompt:
          "Özgün kesitte 1.200 ve 2.200 m durakları verilmiştir; gerçek bir dağın tür ölçümü yoktur. 2.200 m her dağda aynı orman sınırı mıdır?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Sayılar bu çizimin konum duraklarıdır.",
          },
          {
            label: "2. adım",
            explanation: "Gerçek sınır nem, bakı ve enlemle değişebilir.",
          },
          {
            label: "3. adım",
            explanation: "Kesit duraklarından evrensel tür sınırı çıkarılmaz.",
          },
        ],
        answer: "Hayır; yalnız modelin konumu bilinir.",
        check: "Metre birimi gerçekliği ile veri kökeni ayrıldı.",
        pitfall: "Çizim etiketini bütün Türkiye ölçümü sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Endemik mutlaka nadir midir?",
        answer: "Hayır; doğal yayılış sınırı ile birey sayısı farklıdır.",
      },
      {
        prompt: "Relikt çok yaşlı tek ağaç mı demektir?",
        answer: "Hayır; geçmiş dağılışın kalıntısı olma ilişkisidir.",
      },
      {
        prompt: "Her bozkır eski orman tahribi midir?",
        answer: "Hayır; doğal kuraklık ve insan geçmişi ayrı kanıt ister.",
      },
      {
        prompt: "Orman sınırı her dağda aynı metre midir?",
        answer: "Hayır; enlem, nem, bakı ve geçmiş değiştirir.",
      },
    ],
    items: [
      [
        "Aynı yükseklikte bir yamaç deniz nemine açık, öteki dağ gerisinde daha kurudur. Hangi sonuç uygundur?",
        "Yükselti eşitliği aynı örtüyü zorunlu kılmaz",
        [
          "Her iki yamaçta bütün türler kesin aynıdır",
          "Nem bitki dağılışında hiçbir rol oynayamaz",
          "Yalnız metre sayısından kesin tür sayısı bulunur",
          "Dağın yönü nemin ulaşmasını etkileyemez",
        ],
        "Bir ortak etken bütün koşulları eşitlemez.",
        "Denize açıklık ve nem farkı bitkiyi etkileyebilir; kesin topluluk için diğer koşullar da gerekir.",
      ],
      [
        "Doğal yayılışı yalnız belirli bölgede bulunan T türü o bölgede çok sayıda bireye sahiptir. Hangi ifade doğrudur?",
        "Endemik olabilir; endemik sözcüğü mutlaka az bireyli demek değildir",
        [
          "Çok bireyli olduğu için endemik olamaz",
          "Endemik yalnız en yaşlı ağaç demektir",
          "Endemik her kıtada doğal yaygın demektir",
          "Birey sayısı tek başına geçmiş dağılışı kanıtlar",
        ],
        "Yayılış sınırı ile bolluğu ayır.",
        "Endemiklik doğal coğrafi yayılışla ilgilidir; nadirlik veya tehdit düzeyi ayrı ölçütlerdir.",
      ],
      [
        "T türü geçmişte daha geniş yayılırken bugün küçük uygun alanlarda kalmıştır. Hangi kavram doğrudan desteklenir?",
        "Relikt",
        [
          "Yalnız yıllık otsu",
          "Kesin tarım çeşidi",
          "Zorunlu her yerde istilacı",
          "Yalnız genç orman",
        ],
        "Zaman içindeki yayılış değişimi verilmiştir.",
        "Relikt geçmiş dağılışın kalıntısı bağlamıdır. Yalnız yaş veya bugünkü birey sayısı değil, tarihsel ilişki önemlidir.",
      ],
      [
        "Bir türün hem doğal yayılışı tek bölgeyle sınırlı hem eski geniş dağılışın kalıntısı olduğu veriliyor. Hangisi doğrudur?",
        "Hem endemik hem relikt niteliği taşıyabilir",
        [
          "İki kavram mantıken hiçbir zaman birlikte bulunamaz",
          "İki kavram bütün türlerde daima eş anlamlıdır",
          "Bu bilgiler kesin birey sayısını verir",
          "Bu bilgiler türün yalnız tek yıllık olduğunu kanıtlar",
        ],
        "İki ölçütün ayrı koşulları birlikte sağlanabilir.",
        "Endemik coğrafi sınırı, relikt tarihsel kalıntıyı anlatır. İki koşul aynı tür için birlikte bulunabilir.",
      ],
      [
        "Yalnız ot örtüsü fotoğrafı var; geçmiş orman ve insan etkisi bilinmiyor. Hangisi kesinleşmez?",
        "Alanın mutlaka insan tahribiyle antropojen bozkır olduğu",
        [
          "Otsu örtünün görüldüğü",
          "Geçmiş bilgisine ihtiyaç olduğu",
          "Doğal kuraklığın bir olasılık olabileceği",
          "Fotoğrafın geçmişi tek başına vermediği",
        ],
        "Görünüm ile kökeni ayır.",
        "Ağaçsız alan doğal veya insan etkili farklı yollarla oluşabilir. Antropojen köken için geçmiş ve kullanım kanıtı gerekir.",
      ],
      [
        "Bir özgün kesitte 1.200 ve 2.200 m görsel durakları var; saha ölçümü yok. Hangi yorum yanlıştır?",
        "2.200 m bütün dağların kesin ortak orman sınırıdır",
        [
          "Duraklar modeldeki konumu gösterir",
          "Gerçek sınırlar nemle değişebilir",
          "Bakı ve enlem ek koşullardır",
          "Kesin tür için saha verisi gerekir",
        ],
        "Model sayısını evrensel sınır yapma.",
        "Bu duraklar öğretim kesitinin konumlarıdır; bütün Türkiye’de aynı bitki sınırını ölçtükleri iddia edilmez.",
      ],
      [
        "Akdeniz çevresindeki maki için hangi genelleme uygun değildir?",
        "Her örnek mutlaka aynı ormanın aynı biçimde tahribinden doğar",
        [
          "Yaz kuraklığına uyumlu çalılar içerebilir",
          "Toprak ve kullanım geçmişi fark yaratabilir",
          "Doğal ve ikincil gelişim yolları bulunabilir",
          "Kızılçam çevreleriyle mozaik ilişkisi görülebilir",
        ],
        "Toplulukla geçmişi tek bir zorunlu yol sayma.",
        "Maki için farklı doğal ve insan etkili geçmişler bulunabilir. Tek tahrip dizisini bütün alanlara taşımak doğru değildir.",
      ],
      [
        "Yüksek kuzeydoğu alanında serin yaz, uygun nem ve çayır örtüsü veriliyor. Hangisi çıkarılamaz?",
        "Türkiye’nin her doğu yamacının aynı çayırla kaplı olduğu",
        [
          "Yaz neminin büyümeyi destekleyebildiği",
          "Yükselti ve sıcaklığın etkili olabileceği",
          "Otlatma baskısının örtüyü değiştirebileceği",
          "Verilen yerin çayır olarak tanımlandığı",
        ],
        "Yerel örneği yönün bütününe genelleme.",
        "Doğu geniş bir alandır; yağış, yükselti ve yamaç koşulları farklıdır. Yerel çayır örneği bütün doğuyu aynı yapmaz.",
      ],
      [
        "Doğal bozkır alanına ağaçlandırma planlanırken hangi yaklaşım uygundur?",
        "Yerel su koşulu ve mevcut ekosistemin işlevini değerlendirmek",
        [
          "Her ağaçsız alanı kusurlu ve ormansızlaştırılmış saymak",
          "Her yere aynı çok su isteyen türü dikmek",
          "Doğal bozkırın hiç canlı çeşitliliği olmadığını varsaymak",
          "Yalnız ağaç sayısını bütün başarı ölçüsü kabul etmek",
        ],
        "Mevcut örtü de bir ekosistemdir.",
        "Onarım ve kullanım kararı yerel iklim, doğal örtü ve suyla uyumlu olmalıdır. Bozkırın doğal işlevleri yok sayılmaz.",
      ],
      [
        "Eski kaynakta Türkiye bitki takson sayısı yazıyor. Güncel karşılaştırma için hangi bilgi gerekir?",
        "Tarih, takson tanımı ve güncel araştırma kapsamı",
        [
          "Sayıyı her yıl sabit doğa yasası kabul etmek",
          "Taksonu her durumda yalnız birey sayısı sanmak",
          "İl sayısından tür sayısını hesaplamak",
          "Bir bahçe fotoğrafını ulusal envanter saymak",
        ],
        "Sayımın tanımı ve zamanı önemlidir.",
        "Takson sayıları araştırma ve tanıma bağlı güncellenebilir. Eski değer doğrulanmadan bugünün kesin ulusal sayısı diye sunulmaz.",
      ],
    ],
    source:
      "Aurelia Türkiye’de Bitkiler kopya kağıdı; OGM Dersler Cepte Bitkiler PDF 20–21; MEBİ TYT Coğrafya PDF 92–93 gerçek seçili öğretim ve Türkiye bitki haritalarıyla karşılaştırılmış özgün anlatım ve sorular. Sığla ve kasnak meşesinin doğal yayılış sınırı Kew Plants of the World Online kayıtlarıyla ayrıca karşılaştırılmıştır.",
  },
  {
    id: "dunya-yerlesmeleri",
    topic: "detail-62",
    title: "Dünya’da yerleşmeler: doku, süre ve işlev",
    minutes: 65,
    objectives: [
      "Yerleşmenin yeri, dokusu, kullanım süresi ve işlevini ayrı ölçütlerle sınıfla.",
      "Doğal ve beşerî etkenleri farklı tarihsel bağlamlarda karşılaştır.",
      "Şekilden nüfus ve idari statü çıkarma sınırını koru.",
    ],
    sections: [
      {
        title: "Yerleşme bir bina resminden fazlasıdır",
        paragraphs: [
          "Yerleşme insanların barınma ve çeşitli etkinlikler için kullandığı yapı ve alanların örgütlenmesidir. Konutlar, yollar, üretim ve ortak hizmetler birlikte düşünülebilir. Tek bir yapı ile bütün yerleşmenin işlevi aynı ölçek değildir. Bir fotoğraf yapıları gösterebilir ama kaç kişinin yaşadığını veya yılın hangi aylarında kullanıldığını tek başına vermez.",
          "Yer seçimi, doku, büyüklük, süre ve ekonomik işlev farklı soruları yanıtlar. Sekiz yapı toplu veya dağınık yerleşebilir; aynı doku farklı nüfusları barındırabilir. Bir liman işlevi bulunan kent başka hizmetler de sunabilir. Ölçütleri birleştirmeden önce sorunun hangisini istediğini açıkça adlandırmak gerekir.",
        ],
      },
      {
        title: "İlk barınak ile tarıma dayalı sürekliliği ayır",
        paragraphs: [
          "İnsanlar tarımdan çok önce mağara, kaya altı ve başka barınma biçimlerini kullanmıştır. Tarım ve hayvan yetiştirme, uygun bölgelerde daha sürekli yerleşmelerin yaygınlaşmasına katkı vermiştir. Bu dönüşüm bütün insanların aynı gün göçebeliği bırakması değildir; farklı topluluklar farklı geçim ve hareket biçimlerini sürdürmüştür.",
          "Neolitik süreçleri ilk insanın ilk kez barındığı tarih diye anlatma. Bir tarihsel alanın törensel işlevi normal konut alanı olduğunun otomatik kanıtı değildir. Yeni bulgular tarihsel yorumu geliştirebilir; kaynakta verilen bir örneği bütün dünya yerleşmelerinin tek başlangıç noktası saymak yerine işlev ve kanıt türünü ayır.",
        ],
      },
      {
        title: "Su ve tarım önemli ama tek neden değildir",
        paragraphs: [
          "Tatlı su, uygun sıcaklık, yetiştirilebilir arazi ve ulaşım olanakları yer seçimini destekleyebilir. Kurak çevrede su noktası, dağlık çevrede geçit veya düzlük, kıyıda uygun liman önem kazanabilir. Kaynağın varlığı ile o kaynağa erişim ve riskler birlikte düşünülür; suya yakın her nokta aynı derecede güvenli değildir.",
          "Taşkın, heyelan, deprem ve kuraklık gibi tehlikeler; teknoloji, kültür, yönetim ve ekonomik tercihlerle birlikte yerleşmeyi etkiler. Aynı doğal alan farklı dönemlerde farklı kullanılabilir. Tek bir iklim ölçüsünden kesin nüfus veya kent büyüklüğü hesaplanmaz. Yerleşme dağılışı doğal koşullarla insan kararlarının birlikte tarihidir.",
        ],
      },
      {
        title: "Sürekli ve geçici kullanımda takvimi oku",
        paragraphs: [
          "Yıl boyunca yerleşik kullanımın sürdüğü örnek sürekli, yılın belirli döneminde kullanılan örnek mevsimlik olarak ele alınabilir. Yayla, oba, kom veya mevsimlik üretim alanları farklı bağlamlarda bu karşılaştırmaya katılır. Adın kendisi bütün yerlerde aynı kullanım takvimini garanti etmez; örnekteki gerçek süre belirtilmelidir.",
          "Bir turizm kentinde ziyaretçilerin yazın artması, kentte kimsenin kışın yaşamadığını göstermez. Turizm mevsimi ile yerleşmenin sürekliliği ayrı eksenlerdir. Modelde sekiz konut için altı ay kullanım verilirse yalnız o örneğin süresi değişir; yapı sayısı veya idari statü değişmiş sayılmaz. Ziyaretçi ve yerleşik nüfusu da ayır.",
        ],
      },
      {
        title: "Toplu ve dağınık doku",
        paragraphs: [
          "Toplu dokuda konutlar birbirine görece yakın, dağınık dokuda aralarında daha geniş aralıklar bulunur. Suya erişim, arazi parçalanması, tarla düzeni, güvenlik ve toplumsal tercihler dokuya katılabilir. Toplu yerleşme çok nüfuslu kent, dağınık yerleşme az nüfuslu alan demek değildir; konut aralığı başka bir ölçüttür.",
          "Nemli ve parçalı bazı arazilerde dağınık örnekler görülebilir; kurak alanda ortak su çevresinde toplu doku gelişebilir. Bu örüntüler evrensel zorunluluk değildir. Teknoloji, yol ve planlama değişimi eski ilişkiyi değiştirebilir. Tek bir yağış bilgisiyle bütün konut koordinatları kesin çıkarılmaz; soruda verilen etkenin neyi desteklediğini açıkla.",
        ],
      },
      {
        title: "Çizgisel ve dairesel düzeni göster",
        paragraphs: [
          "Yol, nehir vadisi veya kıyı boyunca uzanan yapı dizisi çizgisel dokuyu destekler. Bir merkez çevresindeki halka benzeri düzen dairesel örnektir. Gerçek yerleşmeler kusursuz geometrik şekiller olmayabilir; model aynı sekiz konutu farklı konumlara koyarak yalnız düzen farkını görünür kılar.",
          "Doku değişirken konut sayısı sabit kalabilir. Bir çizgisel yerleşmenin mutlaka yalnız ulaşım hizmeti verdiği veya bir dairesel yerleşmenin tek bir yönetim biçimine sahip olduğu söylenmez. Planın şekli ile işlevin verisi ayrı olmalıdır. Geometri hangi ölçütün gösterildiğini anlamaya yardım eder, eksik sosyal veri üretmez.",
        ],
      },
      {
        title: "Kır ve kenti tek evrensel eşikle ayırma",
        paragraphs: [
          "Kır-kent ayrımında nüfus büyüklüğü, yoğunluk, ekonomik etkinlik, hizmet ve idari tanım kullanılabilir. Ülkeler ve kaynaklar farklı eşikler benimseyebilir. Bu nedenle bir sayısal soru önce hangi sınıflama kuralını kullandığını belirtmelidir. Verilen eşik yalnız o soru bağlamında uygulanır; evrensel kent yasası sayılmaz.",
          "Bir kişinin tarımda çalışması yaşadığı alanın başka işlevleri bulunmadığı anlamına gelmez. Kentte tarımsal faaliyet, kırda hizmet etkinliği bulunabilir. İdari statü ile geçim yapısı birebir aynı eksen değildir. Bir nüfus eşiğini görmek bütün kültürel ve ekonomik farkların aynı sınırda kesildiğini garanti etmez.",
        ],
      },
      {
        title: "İşlevler birlikte bulunabilir",
        paragraphs: [
          "Tarım, sanayi, madencilik, ticaret, liman, yönetim, eğitim ve turizm yerleşme işlevlerine örnektir. Bir işlevin baskın olması bütün nüfusun aynı işi yaptığı veya diğer işlevlerin bulunmadığı anlamına gelmez. Büyük yerleşmeler çoğu zaman birden çok ağın düğümüdür; ulaşım ve hizmetler birbirini destekleyebilir.",
          "Bir ekonomik etkinliğin gelişimi göç ve büyümeyi etkileyebilir, fakat ilişki tek yönlü sabit bir formül değildir. Pazar, altyapı, kaynak ve politika koşulları sonucu değiştirir. Madenin varlığı tek başına kesin büyüklük veya herkes için iş garantisi vermez. Soruda hangi işlevin gerçekten kanıtlandığını seç; verilmeyeni ekleme.",
        ],
      },
      {
        title: "Doğal yayılış ile tarihsel karşılaşma farklıdır",
        paragraphs: [
          "Dünya yerleşme tarihi yalnız belirli bir toplumun bir kıtaya ilk varışıyla başlamaz. Amerika ve Avustralya gibi alanlarda Avrupa karşılaşmalarından önce de insan toplulukları ve yerleşme biçimleri vardı. Bir kaynakta keşif sözcüğünün kullanılması, o alanın önceden insansız olduğu kanıtı değildir.",
          "Harita yorumunda hangi dönemin, hangi ölçümün ve hangi toplumun bakışının verildiğini ayır. Aynı yerleşme zamanla işlev, büyüklük ve doku değiştirebilir; bugünkü şekil geçmişin bütün aşamalarını göstermez. Tarihsel neden için dönem kanıtı gerekir; modern bir fotoğraftan ilk kuruluş tarihini kesin hesaplayamazsın.",
        ],
      },
      {
        title: "Işınsal planı kümeyle karıştırma",
        paragraphs: [
          "Işınsal planda yollar veya yapı dizileri merkezden farklı doğrultulara uzanır; tekerleğin kollarına benzer bir ilişki vardır. Küme planda yakın yapı çekirdekleri düzensiz bir topluluk oluşturur. Dairesel düzen merkez çevresinde halka ilişkisini, çizgisel düzen ise belirli hat boyunca uzanmayı vurgular. Toplu doku bu planlardan birden fazlasıyla bir arada bulunabilir.",
          "Doku konutlar arası yakınlığı, plan ise diziliş biçimini ele alır. Bu yüzden toplu ve ışınsal sıfatları mantıken birbirini dışlamaz. Gerçek bir yerleşme büyüdükçe karma planlar oluşabilir. Modelin dört sade düzeni bütün dünya planlarının tam listesi değildir; yeni bir haritada eksik olan ışınsal veya küme düzenini tanımak için yol ve çekirdek ilişkisini izle.",
        ],
        table: {
          headers: ["Örnek veya ad", "Süreç ve anlam"],
          rows: [
            [
              "Işınsal",
              "Merkezden farklı doğrultulara uzanan yol ve yapı kolları.",
            ],
            [
              "Küme",
              "Birbirine yakın ama düzenli halka olmayan yapı çekirdekleri.",
            ],
            ["Dairesel", "Bir merkez çevresinde halka benzeri yerleşme."],
            ["Çizgisel", "Yol, vadi veya kıyı hattı boyunca uzanma."],
          ],
        },
      },
      {
        title: "Mesken malzemesini kaynak ve teknolojiyle bağla",
        paragraphs: [
          "Taş mesken yerel kalker, bazalt, granit veya andezit gibi malzemelerle ilişkilendirilebilir. Ahşap meskenlerde orman kaynağı ve işleme bilgisi önemlidir; Türkiye’nin Karadeniz kırsalında örnekleri vardır. Kerpiç, uygun toprağın biçimlenip kurutulmasıyla oluşan malzemedir; kurakça iç alanlardaki geleneksel meskenlerde örneklenir. Aynı iklim bütün evleri tek malzemeye zorlamaz.",
          "Betonarme, beton ve çelik donatının birlikte çalıştığı taşıyıcı sistemdir; tuğla veya briket duvar aynı sistemin dolgu malzemesi olabilir. Sanayi ve taşıma yerel malzeme sınırını gevşetir; yine de iklim ve afet tasarımı önemini kaybetmez. Taş ya da ahşap adı tek başına deprem güvenliği vermez; proje, bağlantı, uygulama ve bakım koşulları da gerekir.",
        ],
        table: {
          headers: ["Örnek veya ad", "Süreç ve anlam"],
          rows: [
            [
              "Taş",
              "Yerel kaya ve yapı tekniği; bütün taşlar aynı dayanımda değildir.",
            ],
            [
              "Ahşap",
              "Orman kaynağı, işleme ve bağlantılar; nem ve bakım önemlidir.",
            ],
            [
              "Kerpiç",
              "Toprak esaslı kurutulmuş malzeme; su ve yapı tekniği koşulu gerekir.",
            ],
            [
              "Betonarme",
              "Beton-çelik donatı sistemi; dolgu duvarla taşıyıcıyı ayır.",
            ],
          ],
        },
      },
      {
        title: "Sekiz konutla ölçütleri sınayabilirsin",
        paragraphs: [
          "Etkileşimde toplu, dağınık, çizgisel ve dairesel seçenekler aynı sekiz konutu yeniden yerleştirir. Her seçenek için önce düzeni tarif et, sonra olası yol-su-arazi ilişkisini düşün. Sayı değişmediği için doku değişimi nüfus artışı olarak kaydedilmez. Kullanım ayı seçimi de ayrı bir süre bilgisi sağlar.",
          "Soruyu çözerken ölçütü adlandır: nerede, nasıl dizilmiş, ne zaman kullanılıyor, kaç kişi veya hangi işlev? Bir ölçütün cevabını ötekinin kanıtı gibi kullanma. Özgün şema gerçek kent planı veya nüfus sayımı değildir. Tahminini gerekçeyle karşılaştırmak öğrenme denemesidir; modeli oynatmak ustalık ve XP kaydı oluşturmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı sekiz ev",
        prompt:
          "X’te sekiz ev yakın bir kümede, Y’de aynı sekiz ev geniş aralıklarla verilmiştir. Ne değişmiştir?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Yapı sayısı her ikisinde sekizdir.",
          },
          {
            label: "2. adım",
            explanation: "Konutlar arası aralık ve doku değişmiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "Nüfus verilmediğinden kent büyüklüğü veya kişi artışı çıkarılmaz.",
          },
        ],
        answer: "Toplu-dağınık doku farkı; yapı sayısı sabit.",
        check: "Ev sayısı kişi sayısına çevrilmedi.",
        pitfall: "Dağınık görünümü mutlaka az nüfus sanmak.",
      },
      {
        title: "Turizm mevsimi başka, konut takvimi başka",
        prompt:
          "Bir kentte yerleşikler 12 ay yaşar, ziyaretçiler yazın artar. Kent mevsimlik yerleşme midir?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Ziyaretçi yoğunluğu yazın değişir.",
          },
          {
            label: "2. adım",
            explanation: "Yerleşik kullanım yıl boyunca sürmektedir.",
          },
          {
            label: "3. adım",
            explanation: "Turizm mevsimi sürekli yerleşmeyi mevsimlik yapmaz.",
          },
        ],
        answer: "Verilen kent sürekli kullanılır.",
        check: "Yerleşik ve ziyaretçi ayrıldı.",
        pitfall:
          "Yalnız ekonomik mevsimden kentin kışın boş olduğunu çıkarmak.",
      },
      {
        title: "Verilen eşiği uygula",
        prompt:
          "Yalnız bu sorunun kuralı nüfusu 10.000 ve üstü alanı kent sayıyor. 9.800 ve 10.200 nüfuslu X/Y nasıl sınıflanır?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Kural ve sınır soruda açık verilmiştir.",
          },
          {
            label: "2. adım",
            explanation: "9.800 sınır altı, 10.200 üstüdür.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu kurala göre X kır, Y kenttir; evrensel bütün ülke eşiği olduğu söylenmez.",
          },
        ],
        answer: "Yalnız verilen kurala göre X kır, Y kent.",
        check: "Eşik dahil mi bilgisi denetlendi.",
        pitfall: "Bir kaynağın eşiğini bütün dünyaya yaymak.",
      },
      {
        title: "Yol boyunca aynı düzen",
        prompt:
          "Sekiz konut bir yol boyunca tek sıra uzanıyor. Ekonomik işlevi verilmemiş. Kesin ve belirsiz alanları ayır.",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Yol boyunca sıralanma geometrik kanıttır.",
          },
          {
            label: "2. adım",
            explanation: "Çizgisel doku desteklenir.",
          },
          {
            label: "3. adım",
            explanation:
              "Yalnız şekilden bütün nüfusun ulaşımda çalıştığı söylenmez.",
          },
        ],
        answer: "Çizgisel doku bilinir; baskın işlev bilinmez.",
        check: "Şekil ile işlev ayrıldı.",
        pitfall: "Çizgisel planı tek meslek kanıtı sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Toplu doku mutlaka büyük kent midir?",
        answer: "Hayır; doku konut düzeni, nüfus başka ölçüttür.",
      },
      {
        prompt: "Yaz turist artışı kenti mevsimlik mi yapar?",
        answer: "Hayır; yerleşik kullanım takvimi ayrıca gerekir.",
      },
      {
        prompt: "Kır-kent eşiği bütün dünyada tek mi?",
        answer: "Hayır; soruda kullanılan sınıflama açık verilmelidir.",
      },
      {
        prompt: "Tarım öncesi insanlar barınmıyor muydu?",
        answer:
          "Barınıyorlardı; tarıma bağlı süreklilik farklı bir tarihsel süreçtir.",
      },
    ],
    items: [
      [
        "X’te 8 ev yakın kümede, Y’de aynı 8 ev geniş aralıklıdır. Doğrudan ne farklıdır?",
        "Yerleşme dokusu",
        [
          "Kesin kişi sayısı",
          "Bütün evlerin zorunlu yaşı",
          "İdari statünün kesin değişmesi",
          "Yıllık gelir düzeyi",
        ],
        "Evlerin aralığı hangi ölçüttür?",
        "Sayı sabitken toplu-dağınık düzen değişir. Kişi, gelir ve statü şekilden tek başına bulunmaz.",
      ],
      [
        "Bir kentte yerleşik nüfus 12 ay yaşar, turist sayısı yazın yükselir. Hangisi uygundur?",
        "Sürekli yerleşmeyle mevsimsel turizm birlikte bulunur",
        [
          "Kentte kışın zorunlu hiç kimse yoktur",
          "Turizm varsa bütün konutlar geçicidir",
          "Ziyaretçi sayısı yerleşik sayısıyla aynı tanımdır",
          "Yaz mevsimi idari statüyü otomatik siler",
        ],
        "İktisadi mevsim ve konut takvimini ayır.",
        "Yıl boyu yerleşik kullanım sürekliliği destekler; turist artışı bununla çelişmez.",
      ],
      [
        "Yol boyunca tek sıra uzanan konutlar hangi dokuya örnektir?",
        "Çizgisel",
        [
          "Dairesel",
          "Mutlaka dağınık tarım",
          "Zorunlu tek büyük bina",
          "Yalnız nüfus piramidi",
        ],
        "Şeklin uzandığı hattı oku.",
        "Yol boyunca sıralanma çizgisel dokuyu gösterir. Bu bilgi tek başına nüfus veya ekonomik işlev değildir.",
      ],
      [
        "Bir merkez çevresinde halka biçiminde konut düzeni verilmiştir. En uygun doku adı?",
        "Dairesel",
        ["Çizgisel", "Mutlaka geçici", "Yalnız sanayi", "Kesin başkent"],
        "Geometri ile süre ve işlevi karıştırma.",
        "Merkez çevresindeki halka dairesel düzeni destekler; süre veya işlev ayrıca verilmelidir.",
      ],
      [
        "Yalnız bu kartta nüfusu 10.000 ve üstü kent sayılıyor. X 9.800, Y 10.200. Sınıflama?",
        "X kır; Y kent",
        [
          "X kent; Y kır",
          "İkisi de eşik altı",
          "İkisi de zorunlu başkent",
          "Bu sayılar yalnız doku verir",
        ],
        "Kartın açık eşiğini uygula.",
        "9.800 altında, 10.200 üstündedir. Bu sonuç verilen kurala aittir, bütün ülkelerin ortak yasası değildir.",
      ],
      [
        "İnsanların tarımdan önce de mağara ve başka barınaklar kullandığı veriliyor. Hangisi hatalıdır?",
        "İlk barınma yalnız tarımla başlamıştır",
        [
          "Tarım bazı alanlarda sürekliliği artırabilir",
          "Tarihsel dönüşüm her yerde aynı tarihte olmak zorunda değildir",
          "Barınma ve tarımsal üretim farklı kanıtlardır",
          "Farklı geçim biçimleri birlikte sürebilir",
        ],
        "İlk barınakla sürekli tarım yerleşmesini ayır.",
        "Tarım öncesi barınma verildiğine göre ilk barınmayı tarımla eşitlemek yanlıştır.",
      ],
      [
        "Bir liman kentinde ticaret, sanayi ve eğitim birlikte bulunuyor. Hangi yorum doğrudur?",
        "Birden çok işlev aynı yerleşmede bulunabilir",
        [
          "Liman varsa herkes yalnız denizci olmak zorundadır",
          "Eğitim sanayiyi mantıken imkânsız yapar",
          "Kent yalnız tek bir meslek grubundan oluşur",
          "İşlev adı kesin kişi sayısını verir",
        ],
        "Baskın işlev bütün diğer işleri dışlamaz.",
        "Yerleşmeler birden çok ekonomik ve sosyal ağın düğümü olabilir; işlevler birbirini dışlayan tek kutular değildir.",
      ],
      [
        "Nemli, parçalı arazide dağınık konut örneği verilmiştir. Hangisi fazla genellemedir?",
        "Dünyanın bütün nemli alanlarında doku zorunlu aynıdır",
        [
          "Arazi ve su erişimi dokuya katılabilir",
          "Planlama ve yol geçmişi fark yaratabilir",
          "Örnek kendi koşulunda yorumlanabilir",
          "Konut aralığı ile nüfus ayrı ölçüttür",
        ],
        "Yerel örüntüyü evrensel yasa yapma.",
        "Doğal ve beşerî etkenler birlikte çalışır. Nem tek başına bütün yerleşmelerin konumunu zorunlu belirlemez.",
      ],
      [
        "Bir kıtanın Avrupa toplumlarıyla karşılaşmasından önce de yerli topluluklar yaşadığı veriliyor. Hangi çıkarım yanlıştır?",
        "Karşılaşma öncesinde kıta tamamen insansızdı",
        [
          "Yerleşme tarihi tek bir toplumun varışıyla başlamaz",
          "Keşif sözcüğünün bakış açısı sorgulanabilir",
          "Önceki toplulukların barınma biçimleri bulunabilir",
          "Tarihsel kanıt dönemle birlikte okunmalıdır",
        ],
        "Verilen yerli varlığını silme.",
        "Önceden yaşayan toplulukların verildiği alana insansız demek açık çelişkidir. Karşılaşma yerleşmenin ilk başlangıcı değildir.",
      ],
      [
        "Özgün modelde aynı 8 konutun kullanım süresi 6 aydan 12 aya çıkarılıyor; koordinatlar sabit. Doğrudan hangi eksen değişir?",
        "Kullanım süresi",
        [
          "Konut sayısı",
          "Kesin kişi başı gelir",
          "Doku koordinatları",
          "Kentin ülke içindeki idari statüsü",
        ],
        "Değiştirilen veri hangisidir?",
        "Ay sayısı süreyi değiştirir. Yapı sayısı ve konum aynı kaldığından doku veya nüfus otomatik değişmiş olmaz.",
      ],
    ],
    source:
      "Aurelia Dünya’da Yerleşmeler kopya kağıdı; OGM Dersler Cepte Yerleşmeler PDF 10–16; MEBİ TYT Coğrafya PDF 51–54 gerçek seçili plan ve metinleriyle karşılaştırılmış özgün öğretim. Sekiz konut gerçek kent ölçümü değildir.",
  },
  {
    id: "turkiye-yerlesmeleri",
    topic: "detail-63",
    title: "Türkiye’de yerleşmeler: kent ağı ve kırın takvimi",
    minutes: 65,
    objectives: [
      "İl, kent, mahalle ve yerleşme biçimini aynı ölçüt sanma.",
      "Sürekli kır yerleşmeleriyle mevsimlik örnekleri gerçek kullanım süresiyle ayır.",
      "Türkiye kentlerinin birlikte bulunan işlevlerini ve yer seçimi koşullarını açıkla.",
    ],
    sections: [
      {
        title: "İl sınırı kentin yapı sınırı değildir",
        paragraphs: [
          "İl bir idari alandır; bu alan tek bir kesintisiz kentsel yapıdan oluşmak zorunda değildir. Kent dokusu, kırsal alanlar, tarım ve doğal alanlar aynı il sınırında bulunabilir. Bu nedenle bir ilin nüfusunu yalnız merkezdeki bitişik binaların nüfusu gibi okumak yanlış bir ölçüm sınırı kurar.",
          "Mahalle, belediye ve il farklı idari bağlamlardır; her mahalle ayrı yerel yönetim tüzel kişiliği sayılmaz. Bir idari değişiklikte yerin adı veya statüsü değişebilirken fiziksel doku hemen aynı kalabilir. Soru hangi idari tanımı ve dönemi kullandığını açıkça vermelidir; bugünkü hukuk sabit bir coğrafi nüfus formülü değildir.",
        ],
      },
      {
        title: "Kır-kent ayrımında kullanılan kuralı belirt",
        paragraphs: [
          "Kaynaklarda kır-kent ayrımı için farklı nüfus eşikleri bulunabilir; nüfus dışında ekonomik yapı ve idari statü de ele alınır. Bu öğretimde tek sayıyı bütün kaynakların ve bütün ülkelerin ortak yasası gibi sunmayız. Sayısal örnekte eşik açık verilir ve yalnız o kural uygulanır.",
          "Bir yerin nüfusunun artması bütün çalışanların tarımdan ayrıldığını veya yönetim statüsünün kendiliğinden değiştiğini kanıtlamaz. Büyükşehir gibi idari kararlar yalnız bir sayının aşılmasıyla otomatik gerçekleşen fiziksel olay değildir; yasal düzenleme bağlamı gerekir. Sayım tanımı ile yerleşmenin işlevini ayrı okumak karışıklığı azaltır.",
        ],
      },
      {
        title: "Köy ve köyden küçük örnekler aynı süreyi taşımaz",
        paragraphs: [
          "Köy, çiftlik, mezra, mahalle veya divan gibi adlar farklı bölgesel örgütlenmeleri anlatabilir. Bir çiftlikte üretim merkezi ve konut ilişkisi, küçük dağınık birimde arazi ve akrabalık bağlantıları öne çıkabilir. Adı tek başına görüp bütün örneklerin aynı nüfusa ve aynı hukuki statüye sahip olduğu söylenmez.",
          "Sürekli kullanım varsa yıl boyu konut ve etkinlik sürer; bir alt birimin adı onun her durumda geçici olduğunu kanıtlamaz. Soruda ailelerin kaç ay kaldığı, üretim ve konut ilişkisi açık verilir. Bölgesel adların gerçek kullanım çeşitliliği, ezberlenen tek bir tablonun sınırını gösterir.",
        ],
      },
      {
        title: "Yayla ve başka mevsimlik kullanımlarda takvim",
        paragraphs: [
          "Yayla, oba, kom, ağıl veya dam gibi örneklerde mevsimlik hayvancılık ve üretim bağlamları görülebilir. Bunların hepsi her bölgede aynı ay sayısıyla veya aynı yapısal işle kullanılıyor varsayılmaz. Bir yaylada aileler yalnız yaz döneminde kalıyorsa o verilen örnek mevsimlik kullanım olarak yorumlanabilir.",
          "Günümüzde bazı alanlarda turizm veya sürekli konut yeni takvimler oluşturabilir. Tarihsel adı bugün aynı kullanımı garanti etmez. Modelde beş ay kullanılan ayrı yayla kartı ile on iki ay kullanılan kent konutları karşılaştırılır; beş ay sayısı gerçek her yaylanın ölçümü değildir. Geçici olan turist ziyaretiyle yerleşmenin kullanımını da ayır.",
        ],
      },
      {
        title: "Karadeniz dokusunu bütün bölgeye genelleme",
        paragraphs: [
          "Nemli ve parçalı arazide suya erişim, küçük tarla parçaları ve eğim dağınık konut örneklerini destekleyebilir. Buna karşılık ortak su noktası, düz arazi veya planlama toplu dokuyu destekleyebilir. Türkiye’nin her bölgesinde bu etkenlerin karışımı değişir; tek bir yağış haritası bütün konut koordinatlarını vermez.",
          "Karadeniz’deki bütün köyler dağınıktır veya kurak alandaki her yapı mutlaka tek noktada toplanır gibi ifadeler çok geniştir. Yol yatırımı, güvenlik geçmişi ve arazi mülkiyeti örüntüyü değiştirebilir. Verilen köy planında konut aralıklarını önce gerçekten gözle; sonra sorudaki etkenlerle gerekçelendir.",
        ],
      },
      {
        title: "Ankara’da yönetim ve eğitim ağları",
        paragraphs: [
          "Ankara’nın başkentliği yönetim işlevini belirgin kılar; kamu kurumları ve bunlarla ilişkili hizmetler kent ağının parçalarıdır. Eğitim, sağlık, ticaret ve sanayi de bulunabilir. Yönetim kenti adı yalnız tek bir işin yapıldığı anlamına gelmez; baskın işlev kavramı bir vurgu sağlar.",
          "Başkentlik ile nüfus büyüklüğü aynı ölçüt değildir. Bir kentin neden büyüdüğünü incelerken ulaşım, kurumlar ve göç gibi etkenler birlikte düşünülür. Tek işlev etiketinden bütün kişilerin mesleği veya kesin gelir hesaplanmaz. Modelin bağlantı düğümleri işlev birlikteliğini gösterir; gerçek istihdam payı ölçümü değildir.",
        ],
      },
      {
        title: "İstanbul’da ağların kesişmesi",
        paragraphs: [
          "İstanbul’da ticaret, ulaşım, sanayi, kültür ve hizmet işlevleri birlikte bulunur. Boğaz ve liman bağlantıları farklı ölçeklerde etki yaratır; tarihsel birikim ve nüfus bu ağlarla karşılıklı ilişkilidir. Kentin coğrafi konumu tek başına bütün dönemlerin aynı ekonomik sonucunu zorunlu kılmaz.",
          "İl sınırındaki her nokta aynı yoğunlukta yapı veya aynı meslek dağılımında değildir. Merkez, sanayi alanı, kıyı, orman ve kırsal yerler ayrılabilir. Birçok işlevin varlığını kabul etmek hangi işlevin belirli soruda vurgulandığını bulmayı engellemez. Verilen kanıtın işaret ettiği ağı seç, öteki işlevleri yok sayma.",
        ],
      },
      {
        title: "Kaynak ve üretim kent örnekleri",
        paragraphs: [
          "Zonguldak taş kömürü ve madencilik-sanayi ilişkisiyle önemli bir okul örneğidir. Konya’da tarım, sanayi ve hizmet bağlantıları birlikte görülebilir. Bir üretim kaynağı yerleşmenin gelişimine katkı sağlayabilir; fakat bütün çalışanlar tek sektörde veya aynı ücrette değildir. İşlev adı toplam nüfusun meslek dökümü değildir.",
          "Maden veya tarımsal kaynak varlığı tek başına büyümeyi garanti etmez; ulaşım, yatırım, pazar ve çevresel koşullar da önemlidir. Kaynak tükenmesi ya da ekonomik dönüşüm işlevleri zamanla değiştirebilir. Güncel üretim yüzdesi verilmediyse tarihsel örnekten bugünün kesin payı hesaplanmaz. Model yalnız ilişkiyi açıklar, saha envanteri üretmez.",
        ],
      },
      {
        title: "Antalya’da turizm ve süreklilik",
        paragraphs: [
          "Antalya’da turizm belirgin işlevlerden biridir; tarım, ticaret ve diğer hizmetler de bulunur. Turist yoğunluğunun yazın artması kent konutlarının yıl boyunca kullanılmadığı anlamına gelmez. Kentteki ekonomik mevsim ile ayrı bir mevsimlik yaylanın kullanım ayları farklı verilerdir.",
          "Kıyı konumu ve iklim turizm için önemli olabilir; ulaşım, altyapı ve tercih de sonucu etkiler. Bir turizm kentinin bütün insanları aynı işi yapar veya yalnız turist varken yaşar sonucu çıkarılmaz. Mevsimsel ziyaretçi değişimi planlamada su, atık ve ulaşım yükünü değiştirebilir; bunun için gerçek sayım ve dönem verisi gerekir.",
        ],
      },
      {
        title: "Merkezî ve yerel yönetimde görevler",
        paragraphs: [
          "İlde vali, ilçede kaymakam merkezî yönetimin taşradaki görevleriyle ilişkilidir. Belediye başkanı ve belediye organları ise yerel hizmet yönetimi bağlamındadır. Köy ve mahallede muhtar bulunur; fakat mahalle bu yüzden belediye veya köy gibi ayrı yerel yönetim tüzel kişiliğine dönüşmez. Görev sahibinin adıyla kurumun hukukî niteliği ayrı sorulardır.",
          "İl özel idaresi, belediye ve köy yerel yönetim türleri arasında ele alınır; belirli yerdeki uygulama büyükşehir düzeni ve döneme bağlıdır. Vali ve kaymakam atanmış, belediye başkanı ve muhtar seçilmiş görevler bağlamında karşılaştırılır. Nüfus eşiği tek başına kendiliğinden büyükşehir statüsü yaratmaz; yasal karar ve düzenleme gerekir. İncelenen dönemin idari tanımı korunmalıdır.",
        ],
        table: {
          headers: ["Örnek veya ad", "Süreç ve anlam"],
          rows: [
            ["Vali", "İl düzeyinde merkezî yönetimin taşra görevi."],
            ["Kaymakam", "İlçe düzeyinde merkezî yönetim görevi."],
            ["Belediye", "Seçilmiş organlarla yerel hizmet yönetimi."],
            [
              "Muhtar",
              "Köy veya mahalle görevi; mahallenin ayrı tüzel kişiliği olduğu sonucu çıkmaz.",
            ],
          ],
        },
      },
      {
        title: "Anadolu’da barınak ile Neolitik yerleşmeyi ayır",
        paragraphs: [
          "İstanbul Yarımburgaz, Antalya Karain, Adıyaman Palanlı ve Hatay Üçağızlı gibi mağara alanları Anadolu’nun erken insan ve barınma tarihini örnekler. Bu tarih tarımdan daha eskidir. Kaynaktaki 10–12 bin yıllık vurgu tarım ve Neolitik dönüşüm bağlamıyla okunmalıdır; ilk insan barınmasının yalnız o tarihte başladığı anlamına gelmez.",
          "Çatalhöyük Konya, Çayönü Diyarbakır, Aşıklıhöyük Aksaray ve Hacılar Burdur çevresindeki Neolitik yerleşme örnekleridir. Şanlıurfa Göbeklitepe’de anıtsal ve törensel yapılar önemli kanıttır; bütün yapıları normal konut diye etiketlemek doğru değildir. Bir alanın farklı dönem ve işlevleri olabilir. Tarihsel örneği yer, dönem ve bulunan yapının işleviyle birlikte öğren.",
        ],
      },
      {
        title: "Dağılış ve kent işlevlerini somut örnekle bağla",
        paragraphs: [
          "Menteşe, Biga, Taşeli ve Teke çevresinde uygun kıyı iklimine rağmen engebeli arazi bazı alanlarda yerleşmeyi sınırlayabilir. Buna karşılık uygun ova, tarım ve ulaşım bağlantıları Bursa, Adana, İzmir ve Samsun çevresindeki yoğunlaşmalara katılır. Tuz Gölü çevresindeki kuraklık ile karstik tabanlarda su-toprak koşulu farklı sınırlayıcılardır; kıyı adı tek başına yoğunluk garantisi değildir.",
          "Türkiye’de sanayi-ticaret için Bursa, Kocaeli ve Gaziantep; liman için Mersin, İzmir ve Samsun; kültür-eğitim için Eskişehir ve Ankara; turizm için Nevşehir, Bodrum ve Marmaris örneklenebilir. Her şehir birden çok işlev taşır. Küçük-orta-büyük kent eşikleri bazı öğretim tablolarında nüfus aralıklarıyla verilir; bunlar yasal büyükşehir statüsü veya tek bir evrensel kent ölçüsü değildir.",
        ],
      },
      {
        title: "İşlev haritasını takvimle karıştırma",
        paragraphs: [
          "Etkileşimde şehir seçimi bağlantılı üç işlevi değiştirir; ayrı kullanım kartı ise kent konutları veya mevsimlik yayla örneğini gösterir. Çizimdeki aynı daire gerçek nüfus büyüklüğünü, bağlantı kalınlığı gerçek istihdam oranını temsil etmez. Her veri türünün anlamı görünür metinde açıklanır.",
          "Bir Türkiye yerleşme sorusunda önce sınırın idari mi fiziksel mi olduğunu denetle. Sonra nüfus kuralı, kullanım süresi, doku ve işlevi ayrı yaz. Bu düzen bir şehir adı ezberinden daha anlaşılır bir karar verir. Şema ile oynamak tamamlanma veya XP sağlamaz; soruda verilen yeni kanıtı bağımsız kullanman gerekir.",
        ],
      },
    ],
    examples: [
      {
        title: "İlin tamamı tek kent değil",
        prompt:
          "Bir ilin merkezinde yoğun kent, çevresinde köy ve tarım alanı veriliyor. İl nüfusu yalnız bitişik merkez yapıların nüfusu mudur?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "İl sınırı idari kapsamdır.",
          },
          {
            label: "2. adım",
            explanation: "Merkez dışında başka yerleşmeler de verilmiştir.",
          },
          {
            label: "3. adım",
            explanation: "İl toplamı merkez yapı sınırıyla eşit sayılamaz.",
          },
        ],
        answer: "Hayır; sayım sınırları farklıdır.",
        check: "Verilmeyen merkez oranı hesaplanmadı.",
        pitfall: "İl ve kenti aynı alan sanmak.",
      },
      {
        title: "Beş ay ile on iki ay",
        prompt:
          "X ayrı yayla konutları yalnız Mayıs–Eylül; Y kent konutları 12 ay kullanılıyor. Sürelerini sınıfla.",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Mayıs–Eylül dahil beş aydır.",
          },
          {
            label: "2. adım",
            explanation:
              "X’in verilmiş kullanımı mevsimlik; Y’ninki yıl boyudur.",
          },
          {
            label: "3. adım",
            explanation: "Y’de turist artışı olsa da bu süre bilgisi değişmez.",
          },
        ],
        answer: "X beş aylık mevsimlik; Y sürekli kullanım.",
        check: "Takvim aralığı iki uç dahil sayıldı.",
        pitfall: "Turizm işleviyle ikamet takvimini karıştırmak.",
      },
      {
        title: "Baskın işlev, tek iş demek değil",
        prompt:
          "Ankara için yönetim, eğitim ve hizmet bağlantıları verilmiştir. Kentte herkes yönetici midir?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Yönetim başkentlik bağlamında belirgindir.",
          },
          {
            label: "2. adım",
            explanation: "Eğitim ve hizmet de açıkça verilmiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "İşlevlerin birlikteliği tek meslek zorunluluğunu reddeder.",
          },
        ],
        answer: "Hayır; birden fazla işlev vardır.",
        check: "Kesin meslek yüzdesi uydurulmadı.",
        pitfall: "Baskın işlevi bütün bireylerin mesleği saymak.",
      },
      {
        title: "Turizm kenti ve ayrı yayla",
        prompt:
          "Antalya kentinde yıl boyu konut kullanımı; başka yaylada beş ay kalış var. Şehir yazın turist alıyor diye iki süre aynı mı?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Kent ikameti 12 aydır.",
          },
          {
            label: "2. adım",
            explanation: "Yayla ikameti verilen örnekte 5 aydır.",
          },
          {
            label: "3. adım",
            explanation: "Ziyaretçi mevsimi kent süresini 5 aya düşürmez.",
          },
        ],
        answer: "İki yerleşmenin kullanım süreleri farklıdır.",
        check: "İşlev ve ikamet eksenleri ayrı tutuldu.",
        pitfall: "Turizm mevsiminden kenti boş saymak.",
      },
    ],
    recall: [
      {
        prompt: "İl ve kent aynı sınır mıdır?",
        answer:
          "Hayır; il idari alandır ve farklı yerleşme/dokular içerebilir.",
      },
      {
        prompt: "Yerleşme adı her yerde aynı ayı verir mi?",
        answer: "Hayır; gerçek kullanım takvimi gerekir.",
      },
      {
        prompt: "Yönetim kenti herkes yönetici mi demektir?",
        answer: "Hayır; birden çok işlev birlikte bulunabilir.",
      },
      {
        prompt: "Turizm mevsimi kentin ikamet süresi midir?",
        answer: "Hayır; ziyaretçi ve yerleşik kullanım ayrı ölçülür.",
      },
    ],
    items: [
      [
        "Bir ilin sınırında yoğun kent merkezi, köyler ve tarım alanları var. Hangi yorum doğrudur?",
        "İl toplamı yalnız bitişik kent merkezinin kapsamı değildir",
        [
          "İlin her metrekaresi aynı kentsel dokudur",
          "Köy varsa il merkezi olamaz",
          "İdari sınır ile bina sınırı daima aynıdır",
          "İl adı bütün çalışanların mesleğini verir",
        ],
        "İdari ve fiziksel sınırı ayır.",
        "İl farklı yerleşmeleri kapsayan idari alandır. Merkez kent dokusuyla kapsamı zorunlu aynı değildir.",
      ],
      [
        "X yaylası yalnız Mayıs–Eylül dahil; Y kent konutları 12 ay kullanılıyor. En doğru sınıflama?",
        "X beş aylık mevsimlik; Y sürekli",
        [
          "İkisi de yalnız bir ay kullanılır",
          "X sürekli; Y zorunlu geçici",
          "Kullanım süresi iki yerin nüfusunu eşitler",
          "Mayıs–Eylül aralığı yedi aydır",
        ],
        "Takvimi iki uç dahil say.",
        "Mayıs, haziran, temmuz, ağustos, eylül beş aydır. Yıl boyu konut kullanımı sürekli yerleşme örneğidir.",
      ],
      [
        "Ankara için yönetim, eğitim ve hizmet işlevleri verilmiştir. Hangi sonuç yanlıştır?",
        "Bütün çalışanlar zorunlu yalnız yöneticidir",
        [
          "Yönetim işlevi belirgin olabilir",
          "Eğitim işlevi birlikte bulunabilir",
          "Birden çok ağ aynı kentte kesişebilir",
          "Kesin meslek oranı için ek veri gerekir",
        ],
        "İşlev etiketi bireylerin tamamını sınıflamaz.",
        "Bir işlevin belirginliği diğerlerini yok etmez. Verilen üç işlev de birlikteliği açıkça gösterir.",
      ],
      [
        "İstanbul’da ticaret, ulaşım ve sanayi birlikte veriliyor. Hangi yaklaşım uygundur?",
        "Çok işlevli ağ ilişkisini tanımak",
        [
          "Liman varsa sanayi bulunamaz demek",
          "Her noktayı aynı yoğunlukta kabul etmek",
          "İşlevlerden kesin toplam nüfus hesaplamak",
          "İl sınırındaki her alanı aynı meslek grubu saymak",
        ],
        "Kent ağı tek görevli kutu değildir.",
        "İşlevler birlikte bulunabilir; yoğunluk ve nüfus için ayrı sayım veya mekânsal veri gerekir.",
      ],
      [
        "Zonguldak taş kömürü-madencilik ilişkisiyle veriliyor. Hangisi çıkarılamaz?",
        "Bütün kent nüfusunun madenci olduğu",
        [
          "Madencilik işlevinin önemli olduğu",
          "Sanayiyle bağlantı kurulabileceği",
          "Başka hizmetlerin de bulunabileceği",
          "Güncel pay için ek veri gerektiği",
        ],
        "Baskın örnek bütün bireyleri kapsamaz.",
        "Madencilik önemli bir işlevdir; tüm meslekler veya güncel istihdam yüzdesi bu tek bilgiden çıkmaz.",
      ],
      [
        "Antalya kent konutları 12 ay kullanılıyor; turist sayısı yazın artıyor. Hangisi doğrudur?",
        "Turizm mevsimiyle sürekli kent ikameti birlikte bulunur",
        [
          "Kent kışın mutlaka tümüyle boşalır",
          "Turizm tüm başka işlevleri imkânsız yapar",
          "Konut kullanım süresi zorunlu 5 aya düşer",
          "Ziyaretçi ile yerleşik nüfus aynı tanımdır",
        ],
        "Mevsimsel ekonomi sürekliliği dışlamaz.",
        "Yıl boyu konut kullanımı açık verilmiştir; yazın ziyaretçi artışı farklı bir sayım ve işlevdir.",
      ],
      [
        "Karadeniz’de bir örnek köy dağınık dokuludur. Hangi genelleme aşırıdır?",
        "Bölgedeki bütün köyler zorunlu aynı dokudadır",
        [
          "Eğim ve suya erişim dokuya katılabilir",
          "Yol ve mülkiyet fark yaratabilir",
          "Örneğin konut aralıkları gözlenebilir",
          "Doku ile nüfus ayrı ölçütlerdir",
        ],
        "Bir yerel örnek bütün bölge değildir.",
        "Karadeniz’de yerel arazi ve beşerî geçmiş farklılaşır. Tek köy bütün yerleşmelere aynı düzeni zorunlu kılmaz.",
      ],
      [
        "Bir kart kent-kır sınıflaması için açık nüfus eşiği veriyor. En uygun yöntem?",
        "Yalnız verilen kuralı uygulayıp evrensel idari yasa saymamak",
        [
          "Bütün kaynakların eşiğini kendiliğinden eşit kabul etmek",
          "Eşik aşılınca yasal statünün otomatik değiştiğini varsaymak",
          "Nüfus sayısını bütün meslek yüzdeleri yerine kullanmak",
          "İdari dönemi hiç dikkate almamak",
        ],
        "Sınıflama kuralı ile hukuk farklı bağlamlardır.",
        "Kaynakların nüfus eşikleri değişebilir. İdari statü ayrıca yasal dönem ve düzenlemeye bağlıdır.",
      ],
      [
        "Konya’da tarım, sanayi ve hizmet ilişkisi veriliyor. Hangi çıkarım uygundur?",
        "Üretim ve hizmet işlevleri birlikte bulunabilir",
        [
          "İlin her alanı yalnız buğday tarlasıdır",
          "Sanayi varsa tarım bağlantısı olamaz",
          "Üç işlev bütün nüfusu üç eşit parçaya böler",
          "İşlevler tek başına kesin gelir verir",
        ],
        "Bağlantı varlığı sayısal pay değildir.",
        "İşlevlerin birlikte bulunması mümkündür; oran ve gelirler ayrıca ölçülmelidir. Üç etiket üç eşit nüfus payı anlamına gelmez.",
      ],
      [
        "Tarihsel olarak mevsimlik kullanılan bir yerde günümüzde yıl boyu konut başlamış. Hangi veri önceliklidir?",
        "İncelenen dönemin gerçek kullanım takvimi",
        [
          "Yalnız eski adından bütün yılları aynı saymak",
          "Yer adıyla kesin nüfus hesaplamak",
          "Yeni konutun hiçbir anlamı olmadığını söylemek",
          "Bütün yasal statülerin aynı anda değiştiğini varsaymak",
        ],
        "Yerleşmelerin kullanımı zamanla değişebilir.",
        "Süre sınıflaması incelenen dönemdeki kullanım verisine dayanmalıdır; tarihsel ad tek başına bugünkü takvimi garanti etmez.",
      ],
    ],
    source:
      "Aurelia Türkiye’de Yerleşmeler kopya kağıdı; OGM Dersler Cepte Yerleşmeler PDF 13–18 bağlamı; MEBİ TYT Coğrafya PDF 53–56 gerçek seçili öğretimle karşılaştırılmış özgün anlatım ve sorular. İşlev çizgileri gerçek istihdam payı değildir.",
  },
  {
    id: "nufus-onemi-ozellikleri",
    topic: "detail-64",
    title: "Nüfusun önemi ve özellikleri: payda, dönem ve kanıt",
    minutes: 65,
    objectives: [
      "Nüfus büyüklüğüyle yaş, cinsiyet, eğitim ve iş yapısını ayır.",
      "Piramit yüzdesini doğru paydadan kişi sayısına çevir.",
      "Doğal artış, net göç, yoğunluk ve gerçek artışı açık dönemle hesapla.",
    ],
    sections: [
      {
        title: "Nüfus bir yerde ve bir tarihte sayılır",
        paragraphs: [
          "Nüfus belirli bir yerde, belirli tarihte yaşayan insan sayısıdır. Yer ve zaman sınırı değişirse aynı sayıyı karşılaştırmak anlamını kaybedebilir. Bir ilin toplamı, kent merkezinin nüfusu veya yalnız çalışma çağındaki grup farklı paydalardır. Geçici ziyaretçilerin hangi tanıma katıldığı da ölçüm kuralına bağlıdır.",
          "Sayımlar ve kayıt sistemleri planlama için yaş, cinsiyet, eğitim ve yerleşme gibi özellikleri görünür kılar. Bir büyük toplam okul, sağlık ve ulaşım gereksinimini tek başına ayrıntılı hesaplatmaz; dağılış ve yapı da gerekir. Kişileri yalnız ekonomik yük olarak tanımlamak yerine veriyle gereksinim ve olanakları birlikte değerlendir.",
        ],
      },
      {
        title: "Nüfus bilgisi neden önemlidir?",
        paragraphs: [
          "Çocuk payı, okul ve bakım hizmetleri; yaşlı payı sağlık ve erişim planlaması; yerleşim dağılışı altyapı gereksinimleriyle ilişkilidir. Bu bağlar kesin tek katsayılı talep formülü değildir. Aynı yaş grubu içinde gereksinimler ve katılım farklı olabilir. Veri planlama sorusuna uygun ayrıntıda kullanılmalıdır.",
          "Nüfusun fazla olması tek başına kalkınma veya yoksulluk sonucu yaratmaz. Eğitim, istihdam, verimlilik, kaynak ve kurumlar sonucu etkiler. Genç nüfus uygun koşullarda fırsat, hizmet ve iş yetersizliğinde baskı oluşturabilir. Bir sonuç listesinde koşullar görünmeden herkes için kesin iyi veya kötü kararı verilmez.",
        ],
      },
      {
        title: "Yaş grubu çalışan kişi sayısı değildir",
        paragraphs: [
          "Okul karşılaştırmalarında 0–14 genç,15–64 çalışma çağındaki,65 ve üstü yaşlı grup olarak ele alınabilir. Bu bir yaş sınıflamasıdır;15–64 grubundaki herkes istihdamda değildir. Öğrenciler, iş arayanlar ve iş gücüne katılmayanlar bulunabilir;65 üstünde çalışan insanlar da olabilir.",
          "İş gücü ve istihdam ölçümleri yaş gruplamasından farklı tanım ve veri gerektirir. Modelde çalışma çağı payı görünür, fakat çalışan sayısı diye etiketlenmez. Yaşa dayalı bağımlılık oranı da bireysel bakım gereksiniminin veya bir insanın değerinin ölçüsü değildir. Yalnız tanımlı yaş grupları arasındaki demografik karşılaştırmayı gösterir.",
        ],
      },
      {
        title: "Cinsiyet ve yaş birlikte bir dağılım verir",
        paragraphs: [
          "Nüfus piramidinde yaş grupları dikey, iki cinsiyete ait barlar karşılıklı gösterilebilir. Yatay eksen kişi sayısı veya yüzde olabilir; önce eksen ve paydayı oku. Aynı uzunlukta bir barın her kentte aynı kişi sayısını temsil etmesi gerekmez. Yüzde için toplam nüfus mu yalnız ilgili cinsiyet mi kullanıldığı açık olmalıdır.",
          "Bu modelde erkek ve kadın yüzdeleri toplam nüfusa göredir; altı bar birlikte 100 eder. Tabanın genişliği genç payını, üst kısmın payı yaşlı yapısını karşılaştırmaya yardım eder. Piramit tek başına okuryazarlık, meslek, gelir veya beklenen yaşam süresini vermez. Göç geçmişi de biçimi etkileyebilir; yalnız doğuma bağlama.",
        ],
      },
      {
        title: "Pay ile kişi sayısını ayrı hesapla",
        paragraphs: [
          "Toplam 100.000 kişide 0–14 payı %23 ise 23.000 kişidir; aynı pay 200.000 toplamda 46.000 kişi verir. Yüzde biçimi aynı olsa da mutlak gereksinim ölçeği değişebilir. Buna karşılık kişi sayısı aynı kalıp toplam büyürse pay azalabilir. Pay ve büyüklük farklı karşılaştırma sorularını yanıtlar.",
          "Bir yüzdelik barı bütün erkek nüfusuna yeniden oranlamak istenirse yeni payda açıkça değiştirilmelidir. Önce verilen toplam ve grubu yaz, sonra yüzdeyi 100’e bölüp çarp. Yüzdeleri farklı paydalardan toplamak yanlış sonuç verir. Modelin bütün barları aynı toplam nüfusa göre tanımlandığı için birlikte 100 olmaları denetlenir.",
        ],
      },
      {
        title: "Yaşa dayalı bağımlılık oranı",
        paragraphs: [
          "Verilen okul modeli genç ve yaşlı toplamını çalışma çağındaki yaş grubuna böler ve 100 ile çarpar. Örneğin genç 23, yaşlı 13, çalışma çağı 64 ise oran 36/64×100=%56,25 olur. Bu, çalışma çağındaki 100 kişiye karşılık tanımlı diğer yaş gruplarında 56,25 kişi anlamına gelir; toplamın %56,25’i çocuk veya yaşlıdır demek değildir.",
          "Payda toplam nüfus değil çalışma çağı grubudur. Gerçek ekonomik bağımlılık; gelir, iş gücü katılımı, bakım ve sosyal düzenlemelerle farklılaşabilir. Bu yüzden oranı gerçek çalışanların her birinin kesin bakım yükü diye sunma. Aynı demografik oran farklı hizmet ve istihdam koşullarında farklı toplumsal sonuçlarla ilişkili olabilir.",
        ],
      },
      {
        title: "Doğal artış ile göçü ayır",
        paragraphs: [
          "Belirli dönemde doğum sayısından ölüm sayısı çıkarılırsa doğal değişim bulunur. Gelenlerden gidenleri çıkarmak net göçü verir. Toplam gerçek değişim bu iki net değerin toplamıdır; başlangıç nüfusuna eklenince dönem sonu nüfus bulunur. İşaretler önemlidir: net göç negatif olabilir, doğal artış da bazı koşullarda negatif olabilir.",
          "Oran isteniyorsa aynı dönemin başlangıç nüfusu veya soruda verilen uygun payda kullanılmalıdır. Binde ile yüzde farklı ölçeklerdir; binde 10, yüzde 1 ile aynı orandır. Salt doğum sayısı yüksek diye büyüme kesin yüksek denmez; ölüm, göç ve toplam nüfus da gerekir. Her hesap kartı kendi verisini açıkça vermelidir.",
        ],
      },
      {
        title: "Yoğunluk ortalamadır, her noktayı göstermez",
        paragraphs: [
          "Aritmetik nüfus yoğunluğu toplam kişi sayısının alanın km² değerine bölünmesidir. 100.000 kişi 1.000 km² alanda 100 kişi/km² ortalama verir. Bu, her kilometrekarede tam 100 kişinin eşit dağıldığı anlamına gelmez. Kent merkezi yoğun, bazı yamaçlar çok seyrek olabilir.",
          "Başka yoğunluk türleri farklı alan paydaları kullanabilir; aritmetik ortalamayla karıştırılmaz. Bir yoğunluk artışı nüfus artışından veya alan tanımının değişmesinden kaynaklanabilir. İki alanın yoğunluğu eşitken toplam nüfusları farklı olabilir. Önce pay ve paydayı aynı birim ve kapsamda yazmak bu hataları önler.",
        ],
      },
      {
        title: "Eğitim, iş ve ekonomik sektör ayrı verilerdir",
        paragraphs: [
          "Okuryazarlık ve eğitim düzeyi nüfusun niteliklerine ilişkin göstergelerdir; yaş-cinsiyet piramidinden doğrudan hesaplanmaz. Ekonomik etkinlikler tarım, sanayi ve hizmet gibi gruplarda karşılaştırılabilir. Hangi kişilerin paydada olduğu, örneğin çalışanlar mı bütün nüfus mu, açık verilmelidir.",
          "Hizmet payının yüksekliği tek başına bütün kişilerin gelirini veya çalışma koşullarını eşitlemez. Sektörler arasında verimlilik ve kayıt koşulları farklı olabilir. Çalışma çağındaki yaş payını tarım veya hizmet payıyla aynı veri sanma. Eğitim-istihdam ilişkisini düşünmek yararlıdır, fakat piramitte olmayan bir özelliği kesin sayı olarak üretmek doğru değildir.",
        ],
      },
      {
        title: "Kır-kent payı ve göç yapıyı değiştirir",
        paragraphs: [
          "Nüfusun kır veya kentteki payı kullanılan idari ve işlevsel tanıma bağlıdır. Sınır veya yasal statü değişikliği sayısal payı değiştirebilir; her değişim aynı miktarda fiziksel göç demek değildir. Göç ise toplamı ve yaş-cinsiyet yapısını da etkileyebilir; seçici hareketler belirli yaş barlarını genişletebilir.",
          "Bir yerin genç payının düşmesi yalnız daha uzun yaşama bağlanamaz; doğumların azalması veya gençlerin ayrılması gibi yollar mümkündür. Yaşlı payı ile beklenen yaşam süresi veya ortalama yaş farklı niceliklerdir. Kanıt hangi süreci ayırıyorsa onu söyle; biçimi tek nedene bağlamak yerine eksik veri ihtiyacını açıkla.",
        ],
      },
      {
        title: "Sayımların tarihini ve kapsamını oku",
        paragraphs: [
          "Tarihsel sayımlar vergi, askerlik veya yönetim amacıyla sınırlı grupları saymış olabilir. Osmanlı’nın 1831 sayımı erkek ve vergi-askerlik kapsamıyla,1927 ise Cumhuriyet’in ilk genel nüfus sayımı bağlamıyla ele alınır. Farklı kapsamdaki iki tarihsel sayıyı bütün nüfusun aynı yöntemle ölçülmüş dizisi gibi kullanma.",
          "Eski Roma gibi tarihsel örneklerde devletin dönem adı ve sayım kapsamı önemlidir. İlk ve tam gibi iddialar bağımsız tarihsel doğrulama gerektirir; belirsiz bir tarih ezber sorusuna dönüştürülmez. Bugünkü kayıt sistemleri de tanım ve güncelleme tarihine bağlıdır. Tarihsel bağlam, sayıların neden üretildiğini ve neyi dışarıda bıraktığını anlamaya yardım eder.",
        ],
      },
      {
        title: "Ortanca, ortalama ve beklenen ömür aynı sayı değildir",
        paragraphs: [
          "Ortanca yaş, yaşlar sıralandığında iki yanında nüfusun yarısı kalacak orta konumun değeridir. Tek sayıda kişide ortadaki yaş, çift sayıda basit veri grubunda ortadaki iki yaşın aritmetik ortalaması kullanılabilir. Aritmetik yaş ortalaması ise bütün yaşların toplamının kişi sayısına bölünmesidir. Özgün 5, 10, 15, 20, 80 dizisinde ortanca 15, ortalama 26 olur; uç yaş ortalamayı daha çok etkiler.",
          "Beklenen yaşam süresi, verilen yaşa özgü ölüm koşulları sürse bir kişinin ortalama kaç yıl yaşamasının bekleneceğini özetleyen yaşam tablosu ölçüsüdür. Genellikle doğuşta beklenen süre karşılaştırılır; bu her yeni doğanın kesin o yaşta öleceği tahmini değildir. Bir yılda ölenlerin yaş ortalaması, yaşayanların ortanca yaşı ve doğuşta beklenen ömür farklı verilerdir. Kaynağın 2021 haritası bugünün güncel ölçümü diye sunulmaz.",
        ],
      },
      {
        title: "Sayım günü bulunan kişi ile olağan adres kaydı",
        paragraphs: [
          "Bir sayım kuralı insanı sayım anında bulunduğu yerde kaydedebilir; başka yöntem olağan ikamet adresini esas alabilir. O gün başka şehirde misafir olan kişi iki kurala göre farklı yerde sayılabilir. Bu fark fiziksel bir doğum veya göç gerçekleşmeden yerel toplamları değiştirebilir. Klasik sayım günü, kayıt tabanlı sistem ve örnek araştırma aynı yöntem değildir.",
          "Demografi nüfusun büyüklüğü ve yapısını inceler; nüfus coğrafyası gelişim, dağılış ve hareketin mekânsal ilişkilerini ele alır. Modern veriler okul, sağlık, seçmen, göç, yaş ve hizmet planlamasına yol gösterir. Kayıt tarihinin güncelliği ve kapsanmayan gruplar yine denetlenir. Bir kayıt sistemini kullanmak, yöntem ve tanım hatalarının hiç olamayacağı garantisi değildir.",
        ],
      },
      {
        title: "Artışın sonuçlarını kaynak ve hizmetle birlikte kur",
        paragraphs: [
          "Nüfus artışı uygun iş, eğitim ve altyapıyla birlikte daha büyük talep, üretim ve vergi tabanı oluşturabilir. Kaynak ve hizmet büyümesi geride kalırsa okul, sağlık, konut ve istihdam baskısı artabilir. Kişi başına gelirin düşmesi toplam gelirin ve nüfusun göreli değişimine bağlıdır; tek başına nüfus artışının evrensel sonucu değildir. Aynı şekilde iş gücünün ucuzlaması herkes için olumlu bir yaşam koşulu sayılmaz.",
          "Sağlık, beslenme, salgınlar, savaş, afet, eğitim ve nüfus politikaları doğum, ölüm ve göç kanallarıyla yapıyı etkileyebilir. Yaşlanan toplumda bakım ve hizmet planı; genç toplumda eğitim ve istihdam planı farklılaşır. Kaynaktaki olumlu-olumsuz listeleri bu koşullu ilişkiler olarak öğren. Bir piramidi yalnız gelişmiş veya gelişmemiş etiketiyle açıklamak yerine gerçek yaş, göç, iş ve hizmet verisini birlikte kullan.",
        ],
      },
      {
        title: "Bir demografi sorusunda önce paydayı sor",
        paragraphs: [
          "Soruyu çözerken tarih ve yer sınırını, sonra kişi mi yüzde mi istendiğini yaz. Yaş tablosunda toplamı; değişimde doğum-ölüm-göç işaretlerini; yoğunlukta alan birimini denetle. Bu basit sıra çok sayıda ezber hatasını önler. Verilmeyen eğitim veya mesleği piramit biçiminden çıkarma.",
          "Etkileşimdeki üç yaş profili özgün karşılaştırmadır; gerçek ülkenin güncel sayımı değildir. Toplam ve alanı değiştirince yüzdeler aynı kalabilir ama kişi sayısı ve yoğunluk değişir. Gerekçeni görünür hesapla karşılaştır; bu keşif XP veya sınav doğruluğu sayılmaz. Bağımsız soru yeni verileri kendi kartında açıkça verir.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı pay, farklı kişi",
        prompt:
          "A’da 100.000, B’de 200.000 kişi var; her ikisinde genç payı %23. Genç sayıları?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Payı 0,23 olarak yaz.",
          },
          {
            label: "2. adım",
            explanation: "A:100.000×0,23=23.000; B:200.000×0,23=46.000.",
          },
          {
            label: "3. adım",
            explanation: "Aynı yüzde kişi sayısını eşitlemez.",
          },
        ],
        answer: "23.000 ve 46.000 kişi.",
        check: "İki payda aynı değildi.",
        pitfall: "Eşit yüzdeyi eşit kişi sanmak.",
      },
      {
        title: "Bağımlılık oranının paydası",
        prompt:
          "Genç %23, yaşlı %13, çalışma çağı %64. Yaşa dayalı oran (genç+yaşlı)/çalışma çağı×100. Sonuç?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Diğer yaş grupları 23+13=36.",
          },
          {
            label: "2. adım",
            explanation: "36/64×100=56,25.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu 100 çalışma çağı kişisine karşılık 56,25 diğer yaş grubu kişisidir; gerçek çalışan sayısı değildir.",
          },
        ],
        answer: "%56,25 yaşa dayalı oran.",
        check: "Payda toplam 100 değil 64’tür.",
        pitfall: "Oranı toplam nüfus içindeki pay sanmak.",
      },
      {
        title: "Doğal artış var, gerçek azalış var",
        prompt:
          "Başlangıç 100.000; doğum 1.200, ölüm 800, gelen 300, giden 900. Son nüfus ve binde değişim?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Doğal değişim 1.200−800=+400.",
          },
          {
            label: "2. adım",
            explanation: "Net göç 300−900=−600; gerçek değişim −200.",
          },
          {
            label: "3. adım",
            explanation: "Son 99.800; oran −200/100.000×1.000=−2‰.",
          },
        ],
        answer: "99.800 kişi; gerçek değişim −2‰.",
        check: "Doğal artış toplam artışla eşitlenmedi.",
        pitfall: "Göç işaretini veya binde katsayısını unutmak.",
      },
      {
        title: "Aynı yoğunluk, farklı toplam",
        prompt:
          "X 100.000 kişi/1.000 km²; Y 200.000 kişi/2.000 km². Yoğunluk ve dağılış?",
        strategy: "Verilen koşulu ayır, ilişkiyi kur, sonucu kanıtla sınırla.",
        steps: [
          {
            label: "1. adım",
            explanation: "X 100.000/1.000=100 kişi/km².",
          },
          {
            label: "2. adım",
            explanation: "Y 200.000/2.000=100 kişi/km².",
          },
          {
            label: "3. adım",
            explanation:
              "Ortalamalar eşit; toplamlar farklı ve her hücrenin eşit dolu olduğu bilinmez.",
          },
        ],
        answer: "İkisi 100 kişi/km²; toplamlar eşit değil.",
        check: "Ortalama mekânsal tekdüzelik sanılmadı.",
        pitfall: "Yoğunluk eşitliğinden nüfus eşitliği çıkarmak.",
      },
    ],
    recall: [
      {
        prompt: "15–64 yaş grubu gerçek çalışan sayısı mı?",
        answer: "Hayır; yaş grubu ile istihdam farklı tanımlardır.",
      },
      {
        prompt: "Binde 10 yüzde kaçtır?",
        answer: "Yüzde 1; ölçekler on kat farklıdır.",
      },
      {
        prompt: "Piramitten okuryazarlık bulunur mu?",
        answer: "Hayır; eğitim verisi ayrıca gerekir.",
      },
      {
        prompt: "Doğal artış pozitifken toplam azalış olabilir mi?",
        answer: "Evet; negatif net göç doğal artışı aşabilir.",
      },
    ],
    items: [
      [
        "Toplam 100.000 kişinin %23’ü 0–14 yaşta. Aynı pay 200.000 toplamda sürerse iki genç sayısı sırasıyla nedir?",
        "23.000 ve 46.000",
        [
          "23.000 ve 23.000",
          "46.000 ve 23.000",
          "2.300 ve 4.600",
          "77.000 ve 154.000",
        ],
        "Her toplamı 0,23 ile çarp.",
        "Aynı pay farklı toplamda farklı kişi sayısı verir:100.000×0,23=23.000,200.000×0,23=46.000.",
      ],
      [
        "Genç %23, yaşlı %13, çalışma çağı %64. (genç+yaşlı)/çalışma çağı×100 oranı kaçtır?",
        "%56,25",
        ["%36", "%64", "%156,25", "%23"],
        "Payda 64, pay 36 olmalıdır.",
        "(23+13)/64×100=56,25. Bu toplam nüfusun genç-yaşlı payı olan %36 ile aynı oran değildir.",
      ],
      [
        "Başlangıç 100.000; doğum 1.200, ölüm 800, gelen 300, giden 900. Dönem sonu nüfus kaçtır?",
        "99.800",
        ["100.400", "100.600", "100.200", "99.400"],
        "Doğal değişimle net göçü topla.",
        "Doğal değişim +400, net göç −600; toplam −200 olur. 100.000−200=99.800 kişi kalır. Doğumdan ölümü, gelenlerden gideni çıkarmak iki ayrı net değişimin işaretini korur.",
      ],
      [
        "Başlangıç 100.000 kişide gerçek değişim −200. Başlangıç nüfusuna göre binde oran kaçtır?",
        "−2‰",
        ["−0,2‰", "+2‰", "−20‰", "+0,2‰"],
        "Değişimi toplamla oranla,1.000 ile çarp.",
        "−200/100.000×1.000=−2‰. Aynı oran −%0,2 olarak da yazılır. Başlangıç nüfusu paydadır; binde için 1.000, yüzde için 100 katsayısı kullanılır.",
      ],
      [
        "X 100.000 kişi/1.000 km²; Y 200.000 kişi/2.000 km². Hangisi doğrudur?",
        "Yoğunluklar 100 kişi/km²; toplamlar farklı",
        [
          "Yoğunluklar eşitse toplamlar da zorunlu eşittir",
          "X yoğunluğu 200 kişi/km²’dir",
          "Y yoğunluğu 50 kişi/km²’dir",
          "Her kilometrekarede tam 100 kişi yaşadığı kesinleşir",
        ],
        "Aynı birimle böl; ortalamayı yerel sayı sanma.",
        "İki bölüm 100’dür. Alan ve toplam farklıdır; ortalama eşitliği her hücrede eşit yerleşimi göstermez.",
      ],
      [
        "Bir tabloda 15–64 yaş grubu %64 olarak verilmiştir. Hangisi kesin çıkarılamaz?",
        "Nüfusun %64’ünün fiilen çalıştığı",
        [
          "Yaş grubunun payının 64 olduğu",
          "İstihdam için ek veri gerektiği",
          "Bazı grup üyelerinin öğrenci olabileceği",
          "Yaş grubu ile iş gücünün farklı tanımlar olduğu",
        ],
        "Çalışma çağı istihdamın aynısı değildir.",
        "15–64 bir yaş sınıfıdır; herkes iş gücünde veya istihdamda değildir. Gerçek çalışan oranı ayrıca ölçülür.",
      ],
      [
        "Bir piramit yaş ve cinsiyet yüzdelerini toplam nüfusa göre veriyor. Toplam nüfus 100.000 kişi olarak verilmiştir. Ek veri olmadan hangisi hesaplanamaz?",
        "Okuryazar kişi sayısı",
        [
          "Genç yaş grubunun toplam payı",
          "Yaşlı grubun erkek-kadın pay toplamı",
          "Toplam verilirse bir yaş grubunun kişi sayısı",
          "Barların yüzde mi kişi mi olduğunun verilen eksenden okunması",
        ],
        "Eksenlerde olmayan niteliği şekilden üretme.",
        "Eğitim düzeyi yaş-cinsiyet dağılımında verilmemiştir. Okuryazarlık için ayrıca sayı veya oran gerekir.",
      ],
      [
        "Doğum sayısı ölümlerden 400 fazla, net göç −600. Hangi sonuç uygundur?",
        "Doğal artışa rağmen gerçek nüfus değişimi −200 olur",
        [
          "Doğal artış olduğu için toplam mutlaka +400’dür",
          "Göç yalnız pozitif olabilir",
          "Gerçek değişim +1.000’dir",
          "Doğal artış ile ölüm sayısı aynı tanımdır",
        ],
        "İki net değişimin işaretini koru.",
        "+400−600=−200. Doğal artış toplam değişimle aynı değildir; göç sonucu tersine çevirebilir.",
      ],
      [
        "Yaşlı payı yükselen bir yer için doğum ve göç geçmişi bilinmiyor. Hangisi zorunlu değildir?",
        "Beklenen yaşam süresinin kesin arttığı",
        [
          "Gençlerin ayrılmasının payı etkileyebilmesi",
          "Doğumların azalmasının yapıyı etkileyebilmesi",
          "Yaşlı payıyla ortalama yaşın ayrı nicelik olması",
          "Ek süreç verisine ihtiyaç duyulması",
        ],
        "Pay değişimi tek nedene bağlanmaz.",
        "Yaşlı payı göç veya doğum değişimleriyle de yükselebilir. Beklenen yaşam süresi için ölüm ve yaşam tablosu verileri gerekir.",
      ],
      [
        "Bir tarihsel sayım yalnız erkek/vergi-askerlik kapsamını, başka sayım bütün nüfusu hedefliyor. Karşılaştırmada ne gerekir?",
        "Tarih ve kapsam farkını açıkça dikkate almak",
        [
          "İki sayıyı yöntemi aynı tam nüfus dizisi saymak",
          "Kapsam değişimini yalnız doğum artışı kabul etmek",
          "Hiç sayılmayan grupların nüfusunu sıfır saymak",
          "Sayım amacının veriyi etkilemeyeceğini varsaymak",
        ],
        "Sayılmayan kişi yok kişi değildir.",
        "Farklı hedef gruplar toplamların anlamını değiştirir. Kapsam ve dönem doğrulanmadan bütün nüfusun gerçek artışı bu iki sayıdan doğrudan çıkarılmaz.",
      ],
    ],
    source:
      "Aurelia Nüfusun Önemi ve Özellikleri kopya kağıdı; OGM Dersler Cepte Nüfus PDF 10–11; MEBİ TYT Coğrafya PDF 94–97 gerçek seçili piramit ve öğretimle karşılaştırılmış özgün anlatım ve sorular. Profiller gerçek ülke sayımı değildir.",
  },
];
export const forge017GeographyTopics: Record<string, string> =
  Object.fromEntries(data.map((d) => [d.id, d.topic]));
export const forge017GeographyGuides: LessonGuide[] = data.map(
  ({ items: _items, topic: _topic, title: _title, ...d }) => d,
);
function question017(
  d: Unit017,
  item: Unit017["items"][number],
  i: number,
): Question {
  const [prompt, correct, wrong, hint, explanation] = item;
  const answer = i % 5,
    options = [...wrong];
  options.splice(answer, 0, correct);
  return {
    id: `f017-geo-${d.id}-${i + 1}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(explanation),
    skill: `f017-geo-${d.id}-${i + 1}`,
  };
}
export const forge017GeographyLessons: Lesson[] = data.map((d) => ({
  id: d.id,
  subjectId: "tyt-cografya",
  title: txt(d.title),
  minutes: d.minutes,
  objectives: d.objectives.map(txt),
  body: d.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join(" ")),
  })),
  questions: d.items.map((q, i) => question017(d, q, i)),
  source: txt(d.source),
  tags: ["kaynakli", "etkilesimli", "forge017"],
}));
