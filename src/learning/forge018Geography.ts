import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";
const checked018 = (n: number, min: number, max: number) => {
  if (!Number.isFinite(n) || n < min || n > max)
    throw new RangeError("GEOGRAPHY_018_RANGE");
  return n;
};
const option018 = <T extends object>(map: T, key: string): T[keyof T] => {
  if (!Object.hasOwn(map, key)) throw new RangeError("GEOGRAPHY_018_OPTION");
  return map[key as keyof T];
};
const flag018 = (v: boolean) => {
  if (typeof v !== "boolean") throw new RangeError("GEOGRAPHY_018_FLAG");
  return v;
};
export const worldPlaces018 = {
  asia: {
    name: "Doğu ve Güney Asya ovaları",
    lat: 25,
    lon: 110,
    kind: "Yoğunlaşma örneği",
    proof:
      "Pirinç tarımı ve eski yerleşme ağına sanayi, kent ve ulaşım eklenir. Bütün Asya aynı yoğunlukta değildir.",
  },
  europe: {
    name: "Batı Avrupa",
    lat: 50,
    lon: 5,
    kind: "Yoğunlaşma örneği",
    proof:
      "Sanayi, hizmet, ulaşım ve uzun yerleşme geçmişi birlikte etkili; kıtanın her noktası aynı değildir.",
  },
  america: {
    name: "ABD doğusu",
    lat: 40,
    lon: -75,
    kind: "Yoğunlaşma örneği",
    proof:
      "Sanayi, ticaret ve ulaşım ağları kentlerde yoğunlaşır; nüfusu yalnız tarıma bağlama.",
  },
  nile: {
    name: "Nil Vadisi",
    lat: 27,
    lon: 31,
    kind: "Yerel yoğunlaşma",
    proof:
      "Çevredeki kurak alana karşı su ve sulanabilir dar vadi öne çıkar. Çölün tamamına yayılmış eşit yoğunluk yoktur.",
  },
  sahara: {
    name: "Sahra iç kesimi",
    lat: 24,
    lon: 10,
    kind: "Seyrek alan örneği",
    proof:
      "Su azlığı ve kuraklık temel kısıt; vaha ve kentler yerel istisnadır. Her çöl sıcak değildir.",
  },
  arctic: {
    name: "Kuzey Kanada",
    lat: 70,
    lon: -100,
    kind: "Seyrek alan örneği",
    proof:
      "Uzun soğuk dönem, don ve üretim koşulları kısıtlayıcıdır. Bu neden Sahra ile aynı sıcaklık koşulu değildir.",
  },
  mountain: {
    name: "Himalayalar",
    lat: 30,
    lon: 85,
    kind: "Seyrek alan örneği",
    proof:
      "Yüksek ve engebeli alanlarda soğuk, dar tarım alanı ve ulaşım güçlüğü birlikte etkilidir; vadiler farklılaşır.",
  },
  amazon: {
    name: "Amazon iç havzası",
    lat: -5,
    lon: -65,
    kind: "Seyrek alan örneği",
    proof:
      "Çok nemli orman içi alanlarda ulaşım ve yerel yaşam koşulları önemlidir. Yağışın çokluğu tek başına her yerde seyrek nüfus yaratmaz.",
  },
} as const;
export function worldDistribution018(
  place: string,
  clustered: boolean,
  total: number,
  area: number,
) {
  const p = option018(worldPlaces018, place);
  flag018(clustered);
  checked018(total, 100, 1000000);
  checked018(area, 4, 100000);
  const shares = clustered ? [70, 10, 10, 10] : [25, 25, 25, 25];
  return {
    ...p,
    total,
    area,
    shares,
    counts: shares.map((v) => (total * v) / 100),
    localDensities: shares.map((v) => (total * v) / 100 / (area / 4)),
    density: total / area,
    clustered,
    limit:
      "Dört eş alanlı hücre özgün bir sayı örneğidir; seçilen gerçek bölgenin sayımı değildir. Harita noktaları kabaca konumu gösterir, kesin sınır veya yoğunluk vermez.",
  };
}
export const pyramidAges018 = [
  "0–4",
  "5–9",
  "10–14",
  "15–19",
  "20–24",
  "25–29",
  "30–34",
  "35–39",
  "40–44",
  "45–49",
  "50–54",
  "55–59",
  "60–64",
  "65–69",
  "70–74",
  "75+",
] as const;
export const pyramidProfiles018 = {
  concave: {
    name: "İçe çökük tip",
    weights: [20, 17, 14, 11, 9, 7, 5, 4, 3, 2.5, 2, 1.5, 1, 0.8, 0.5, 0.3],
    proof:
      "Geniş taban ve hızlı daralan üst kesim; ders tipinde yüksek doğum ve ölüm koşullarıyla birlikte ele alınır.",
  },
  triangle: {
    name: "Düzgün üçgen",
    weights: [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1.5, 1, 0.5],
    proof:
      "Ders tipinde doğumlar yüksek kalırken ölüm koşullarının iyileşmesiyle daha çok kuşak ileri yaşlara ulaşır.",
  },
  asymmetric: {
    name: "Tabanı daralan tip",
    weights: [6, 8, 10, 12, 13, 12, 11, 10, 9, 8, 7, 6, 4, 3, 2, 1],
    proof:
      "Son çocuk kuşakları daha dardır. Geçmiş doğurganlık düşüşü bir yorumdur; göç ve kayıt bilgisi ayrıca gerekir.",
  },
  hive: {
    name: "Arı kovanı tipi",
    weights: [6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 6, 5, 4, 3],
    proof:
      "Yaş kuşakları görece dengeli ve üst bölüm daha geniştir; düşük doğum ve uzun yaşam ders bağlamıyla ilişkilidir.",
  },
  bell: {
    name: "Çan tipi",
    weights: [9, 8, 6, 5, 6, 7, 8, 8, 8, 7, 6, 5, 4, 3, 2, 1],
    proof:
      "En yeni kuşakların önceki çocuk kuşaklarından genişlemesi görülür; doğumun yeniden artması ders senaryosudur.",
  },
} as const;
function allocate018(weights: number[], total: number) {
  const sum = weights.reduce((a, b) => a + b, 0),
    raw = weights.map((w) => (w / sum) * total),
    values = raw.map(Math.floor),
    order = raw
      .map((r, i) => ({ i, remainder: r - values[i] }))
      .sort((a, b) => b.remainder - a.remainder || a.i - b.i);
  const missing = total - values.reduce((a, b) => a + b, 0);
  for (let n = 0; n < missing; n++) values[order[n].i]++;
  return values;
}
export function pyramid018(profile: string, total: number, departure: boolean) {
  const p = option018(pyramidProfiles018, profile);
  checked018(total, 10000, 10000000);
  if (!Number.isInteger(total)) throw new RangeError("GEOGRAPHY_018_INTEGER");
  flag018(departure);
  const weights = p.weights.flatMap((w, i) => [
      w * (i >= 13 ? 0.4 : 0.5),
      w * (i >= 13 ? 0.6 : 0.5),
    ]),
    values = allocate018(weights, total),
    male = values.filter((_, i) => i % 2 === 0),
    female = values.filter((_, i) => i % 2 === 1);
  const removed = departure ? Math.min(Math.round(total * 0.01), male[4]) : 0;
  male[4] -= removed;
  const final = total - removed,
    groups = male.map((n, i) => n + female[i]),
    young = groups.slice(0, 3).reduce((a, b) => a + b, 0),
    working = groups.slice(3, 13).reduce((a, b) => a + b, 0),
    old = groups.slice(13).reduce((a, b) => a + b, 0);
  return {
    ...p,
    initial: total,
    total: final,
    male,
    female,
    groups,
    removed,
    young,
    working,
    old,
    dependency: ((young + old) / working) * 100,
    shares: groups.map((n) => (n / final) * 100),
    limit:
      "Özgün tip çizimleri, gerçek ülke veya yıl sayımı değildir. Çıkış açıkken yalnız 20–24 yaş erkek grubundan başlangıç nüfusunun %1’i kadar kişi çıkar; doğum ve ölüm yoktur. Tek bir gerçek piramit bu nedeni tek başına kanıtlamaz.",
  };
}
export const turkeyContexts018 = {
  marmara: {
    name: "Marmara sanayi ağı",
    proof:
      "Çatalca–Kocaeli ve Bursa çevresinde sanayi, ticaret ve ulaşım önemlidir. Yıldız Dağları ile Biga iç kesimleri aynı yoğunlukta değildir.",
  },
  blacksea: {
    name: "Karadeniz kıyı ve iç kesim",
    proof:
      "Kıyı tarımı ve kentler ile dağlık iç kesimler farklıdır. Zonguldak–Karabük madencilik ve sanayi örneğidir; her yağışlı yerde aynı yoğunluk olmaz.",
  },
  mediterranean: {
    name: "Akdeniz ova ve dağ",
    proof:
      "Çukurova ve kıyı kentlerinde tarım, sanayi, liman ve turizm birlikte; Taşeli ve yüksek Toros kesimlerinde engebe ve yerel su koşulları kısıtlayıcı olabilir.",
  },
  interior: {
    name: "İç ve doğu kesim",
    proof:
      "Ankara yönetim ve ulaşım; Gaziantep sanayi örneğidir. Tuz Gölü çevresinde kuraklık, yüksek doğu kesimlerinde soğuk ve engebe önemlidir; bütün iç kesimler seyrek değildir.",
  },
} as const;
export function turkeyPopulation018(
  context: string,
  expanded: boolean,
  visitors: number,
) {
  const c = option018(turkeyContexts018, context);
  flag018(expanded);
  checked018(visitors, 0, 500000);
  if (!Number.isInteger(visitors))
    throw new RangeError("GEOGRAPHY_018_INTEGER");
  const units = [
      { id: "A", residents: 400000, area: 1000, urban: true },
      { id: "B", residents: 300000, area: 3000, urban: expanded },
      { id: "C", residents: 200000, area: 2000, urban: expanded },
      { id: "D", residents: 100000, area: 4000, urban: false },
    ],
    resident = 1000000,
    urban = units.filter((u) => u.urban).reduce((s, u) => s + u.residents, 0);
  return {
    ...c,
    units: units.map((u) => ({ ...u, density: u.residents / u.area })),
    resident,
    area: 10000,
    density: 100,
    urban,
    urbanShare: (urban / resident) * 100,
    visitors,
    present: resident + visitors,
    expanded,
    limit:
      "A–D birimleri gerçek il veya ilçe değildir. Temsilî bir milyon yerleşik kişi sabit; B ve C’nin idari etiketi değişir. Ziyaretçiler ayrı geçici kalabalıktır, adres nüfusuna otomatik eklenmez.",
  };
}
export const migrationStories018 = {
  work: {
    name: "Van’dan Bursa’ya yerleşme",
    scope: "İç göç",
    duration: "Sürekli",
    will: "Gönüllü",
    proof:
      "Kişi Türkiye içinde uzun süreli bir iş için kendi kararıyla yerleşiyor. İl sınırı ülke sınırı değildir.",
  },
  harvest: {
    name: "Hasat için üç aylık iş",
    scope: "İç göç",
    duration: "Mevsimlik",
    will: "Gönüllü",
    proof:
      "İşçi Türkiye içinde başka ilde üç ay yaşıyor ve dönüyor. Günlük gidiş gelişten farklı geçici yaşam düzeni verilmiştir.",
  },
  research: {
    name: "Yurt dışında uzmanlık işi",
    scope: "Dış göç",
    duration: "Sürekli",
    will: "Gönüllü",
    proof:
      "Araştırmacı başka ülkeye uzun süreli çalışmaya yerleşiyor; nitelikli iş gücü hareketi beyin göçü kapsamında incelenebilir.",
  },
  flood: {
    name: "Sel sonrası başka ilçe",
    scope: "İç göç",
    duration: "Verilmedi",
    will: "Zorunlu",
    proof:
      "Afet nedeniyle aynı ülke içinde güvenli ilçeye taşınılıyor. Dönüş zamanı verilmediği için süre kesinleştirilemez.",
  },
  protection: {
    name: "Çatışma nedeniyle sınır aşma",
    scope: "Dış göç",
    duration: "Verilmedi",
    will: "Zorunlu",
    proof:
      "Çatışmadan kaçan aile ülke sınırı aşıyor. Mülteci, sığınmacı ve geçici koruma gibi hukuki statüler ayrıca belirlenir; yalnız bu kısa olaydan atanmaz.",
  },
} as const;
export function migration018(
  story: string,
  internal: number,
  incoming: number,
  outgoing: number,
  reverse: boolean,
) {
  const s = option018(migrationStories018, story);
  [internal, incoming, outgoing].forEach((n) => {
    checked018(n, 0, 5000);
    if (!Number.isInteger(n)) throw new RangeError("GEOGRAPHY_018_INTEGER");
  });
  flag018(reverse);
  const move = reverse ? -internal : internal,
    x = 30100 - move - outgoing,
    y = 20200 + move + incoming,
    z = 50000 + outgoing - incoming,
    natural = 300,
    net = incoming - outgoing;
  return {
    ...s,
    internal,
    incoming,
    outgoing,
    reverse,
    x,
    y,
    z,
    natural,
    net,
    country: x + y,
    initialCountry: 50000,
    change: natural + net,
    world: x + y + z,
    limit:
      "X ve Y aynı ülkede, Z dışarıdadır. Özgün bir yıllık örnekte X’te 200 doğum/100 ölüm, Y’de 400 doğum/200 ölüm vardır; Z’de doğal fark sıfırdır. Olay kartı sınıflaması ile sayısal akış ağı ayrı örneklerdir.",
  };
}
export const economicChains018 = {
  cotton: {
    name: "Pamuktan kumaşa",
    tasks: [
      "Tarlada pamuk yetiştirme",
      "İplik ve kumaş üretme",
      "Kumaşı taşıma ve satma",
      "Dokuma için veri ve yazılım",
      "Üst düzey yatırım kararı",
    ],
  },
  copper: {
    name: "Cevherden tele",
    tasks: [
      "Cevheri yer altından çıkarma",
      "Cevheri işleyip tel üretme",
      "Teli taşıma ve satma",
      "Yeni alaşım araştırması",
      "Şirketin stratejik kararı",
    ],
  },
  milk: {
    name: "Sütten peynire",
    tasks: [
      "Çiftlikte süt elde etme",
      "Fabrikada peynir üretme",
      "Peyniri taşıma ve satma",
      "Soğuk zincir yazılımı",
      "Üst düzey tesis kararı",
    ],
  },
  energy: {
    name: "Kömürden elektriğe",
    tasks: [
      "Kömürü yer altından çıkarma",
      "Santralde elektrik üretme",
      "Enerji ticareti hizmeti",
      "Şebeke verisi için yazılım",
      "Üst düzey enerji kararı",
    ],
  },
} as const;
export function economy018(
  chain: string,
  stage: number,
  five: boolean,
  machine: boolean,
) {
  const c = option018(economicChains018, chain);
  checked018(stage, 0, 4);
  if (!Number.isInteger(stage)) throw new RangeError("GEOGRAPHY_018_INTEGER");
  flag018(five);
  flag018(machine);
  const workers = [machine ? 50 : 100, 200, 300, 50, 50],
    value = [100, 400, 600, 300, 200],
    total = workers.reduce((a, b) => a + b, 0),
    totalValue = 1600,
    groups = five
      ? workers
      : [workers[0], workers[1], workers.slice(2).reduce((a, b) => a + b, 0)],
    sector = five ? stage + 1 : Math.min(stage + 1, 3);
  return {
    ...c,
    stage,
    task: c.tasks[stage],
    sector,
    workers,
    value,
    total,
    totalValue,
    groups,
    shares: groups.map((n) => (n / total) * 100),
    employment: (workers[stage] / total) * 100,
    valueShare: (value[stage] / totalValue) * 100,
    five,
    machine,
    limit:
      "Özgün çalışan ve katma değer birimleri; gerçek ülke, gelir veya ücret verisi değildir. Makine örneğinde ilk aşama 100 yerine 50 kişiyle aynı 100 değer birimini verir; ayrılan kişilerin yeni işi ve işsizliği verilmez. Üçlü ayrımda bilgi ve üst yönetim hizmet içinde toplanır.",
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
    id: "dunya-nufus-dagilisi",
    topic: "detail-65",
    title: "Dünya’da nüfusun dağılışı: haritadan nedene",
    minutes: 75,
    objectives: [
      "Yoğunluk, toplam ve mekânsal dağılımı ayrı oku.",
      "Doğal ve beşerî etkenleri gerçek bölge örnekleriyle birlikte açıkla.",
      "Aynı ortalamanın farklı yerel kümeleri gizleyebildiğini hesapla.",
    ],
    sections: [
      {
        title: "Bir harita hangi soruyu yanıtlar?",
        paragraphs: [
          "Nüfus dağılışı insanların nerelerde yaşadığını gösterir. Toplam nüfus haritası bir alandaki kişi sayısını, yoğunluk haritası ise kişi sayısının alanla oranını verir. Nüfus artışı başka bir dönem karşılaştırmasıdır; bu üç ölçünün renkleri aynı anlama gelmez.",
          "Önce başlık, tarih, gösterge ve alan sınırını oku. Büyük bir yüzölçümüne sahip yer, çok kişi barındırıp düşük ortalama yoğunluğa sahip olabilir. Bir ilin veya ülkenin tek rengi, bütün mahallelerin ve vadilerin aynı kalabalıkta olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Yoğunluğun pay ve paydasını kur",
        paragraphs: [
          "Aritmetik nüfus yoğunluğu, aynı sınır içindeki nüfusun aynı alanın yüzölçümüne bölünmesidir. Birim kişi/km² olur. Bir milyon kişiyi 10.000 km²’ye bölersen 100 kişi/km² bulursun; km²/kişi bunun tersidir ve aynı gösterge değildir.",
          "Alan değişmeden kişi sayısı iki katına çıkarsa yoğunluk da iki kat olur. Nüfus aynı kalırken alan yarıya inerse yine yoğunluk iki katına çıkar. Sınırları veya yılları değişen iki veriyi fark etmeden bölmek, gerçek bir göç olmadan bile yanıltıcı karşılaştırma üretir.",
        ],
      },
      {
        title: "Su ve sıcaklık birlikte yaşamı etkiler",
        paragraphs: [
          "Sahra, Arabistan içi, Kalahari, Gobi, Taklamakan ve Atacama gibi kurak alanlarda su azlığı tarımı ve yerleşmeyi sınırlar. Kuraklık sıcaklıkla aynı nicelik değildir; Gobi gibi kışları çok soğuk çöller de vardır. Vahalar ve suya erişen kentler çevrelerinden daha yoğun olabilir.",
          "Kuzey Kanada, Grönland’ın geniş iç kesimleri, Sibirya ve Antarktika çevresinde çok düşük sıcaklık ve uzun don dönemi belirgin kısıttır. Sahra ile kuzeydeki seyrek alanın ortak sonucu seyrek nüfus olabilir; bu ortak sonuç iki yerin de sıcak veya aynı ölçüde susuz olduğunu göstermez.",
        ],
      },
      {
        title: "Yükseklik ve eğimi tek yasa sanma",
        paragraphs: [
          "Himalayalar, Andlar, Alpler ve Kayalık Dağları’nın yüksek kesimlerinde düşük sıcaklık, dar tarım alanı, eğim ve ulaşım güçlüğü birlikte etkili olabilir. Vadi tabanı ile sarp yamaç aynı koşulu taşımaz. Dağ adı tek başına her noktanın nüfusunu vermez.",
          "Sıcak ve çok nemli ekvatoral alçak alanlarda bazı yüksek kesimler daha elverişli yaşam koşulları sunabilir. Bu yüzden yükselti arttıkça nüfus her yerde aynı oranda azalır denmez. İş, yol, su ve tarihî yerleşme ağı doğal kısıtın nasıl yaşandığını değiştirebilir.",
        ],
      },
      {
        title: "Toprak, su ve tarımın bağı",
        paragraphs: [
          "Güney ve Doğu Asya’nın bazı ovalarında verimli toprak, su ve uzun tarım geçmişi kalabalık kırsal nüfusu desteklemiştir. Muson yağışları ve pirinç tarımı bu bağlamdaki örneklerdir; bütün Asya’yı veya her muson alanını tek yoğunlukla göstermek doğru olmaz.",
          "Nil Vadisi, kurak çevre içinde suya ve sulanabilir araziye bağlı yerel yoğunlaşmanın güçlü örneğidir. Toprak verimliliği olan her yerde aynı sayıda insan yaşamaz; makineleşme, üretim biçimi ve kentlere göç de belirleyicidir. Doğal potansiyeli doğrudan kişi sayısına çeviren bir formül yoktur.",
        ],
      },
      {
        title: "Sanayi, hizmet ve bağlantı ağları",
        paragraphs: [
          "Batı Avrupa ve ABD’nin doğu kesiminde sanayi, ticaret, limanlar ve ulaşım ağları önemli yoğunlaşma etkenleridir. Bir liman yalnız denizin varlığıyla açıklanmaz; hinterland bağlantısı, pazar ve iş olanakları da gerekir. Tarım dışı faaliyetler büyük kentleri büyütebilir.",
          "Doğal maden yatağı bir yer altı kaynağıdır; onu çıkarıp işleyen yatırım, iş ve yol ağı beşerî süreçlerdir. Aynı örnekte bu iki etken birlikte bulunabilir. Kaynak tükenmesi veya işlerin değişmesiyle nüfus çekimi de değişebilir; eski sanayi merkezi sonsuza dek aynı hızda büyümez.",
        ],
      },
      {
        title: "Tarih, din ve turizm de mekânsaldır",
        paragraphs: [
          "Uzun süredir ticaret, yönetim veya dinî merkez olan yerlerde birikmiş yapı, hizmet ve bağlantılar nüfusu etkiler. Eski yerleşme geçmişi açıklayıcı olabilir; fakat eski olan her yerin yeni kentlerden daha kalabalık olduğu biçiminde zorunlu bir kural kurulamaz.",
          "Turizm iş ve hizmet talebi oluşturarak yerleşik nüfusu etkileyebilir. Sezonluk ziyaretçi kalabalığı ise yıl sonu adres nüfusu ile aynı ölçü değildir. Bir kıyının yaz görüntüsünden bütün yılın nüfus yoğunluğu okunmaz; dönem ve hangi insanların sayıldığı ayrıca belirtilmelidir.",
        ],
      },
      {
        title: "Kuzey yarım küre ve kıta ortalamaları",
        paragraphs: [
          "Dünya nüfusunun büyük bölümü Kuzey Yarım Küre’dedir. Karaların ve tarihsel nüfus merkezlerinin dağılışı bu örüntüyle ilişkilidir. Güney Yarım Küre’de geniş okyanus alanları ve Antarktika gibi yerleşimi sınırlı alanlar bulunur; bu bir enlemden kişi hesaplama kuralı değildir.",
          "Asya büyük nüfus barındırırken kendi içinde çöl, dağ ve yoğun ova örnekleri taşır. Kıta toplamını kıta yoğunluğuyla karıştırma. Okyanusların alana katılıp katılmadığı ve Antarktika’nın karşılaştırmaya alınıp alınmadığı değişirse sıralama sorusunun kapsamı da değişebilir.",
        ],
      },
      {
        title: "Aynı ortalama, farklı mahalleler",
        paragraphs: [
          "Dört eş alanlı hücrenin toplam nüfusu 10.000 ve toplam alanı 100 km² olsun. Her hücrede 2.500 kişi varsa yerel yoğunlukların hepsi 100 kişi/km² olur. Aynı toplamın 7.000 kişisi tek hücrede toplanırsa o hücrenin yoğunluğu 280 kişi/km²’ye çıkar.",
          "Öteki üç hücrede biner kişi kalır ve her birinin yoğunluğu 40 kişi/km² olur. Bölgenin ortalaması yine 100 kişi/km²’dir; çünkü toplam ve toplam alan değişmemiştir. Etkileşimdeki sayılar bu ilişkiyi gösteren özgün örnektir, seçilen gerçek dünyanın güncel sayımı değildir.",
        ],
      },
      {
        title: "Nedeni kanıtla seç, karşı örnekle denetle",
        paragraphs: [
          "Amazon ve Kongo iç havzalarının bazı kesimlerinde çok nemli orman ortamı, ulaşım ve yerel üretim koşulları seyrekliği açıklamaya katılır. Bu, yağışın çok olduğu bütün yerlerin seyrek olduğu anlamına gelmez; yoğun nüfuslu muson ovaları buna karşı örnek sağlar.",
          "Bir soruyu çözerken önce işaretli yerin yaklaşık konumunu, sonra verilen sıcaklık, su, eğim ve iş verisini eşleştir. Aynı sonucu veren farklı nedenleri ayır. Genel eğilimi yerel istisnayı silen kesin yasa yapma; eksik nedensel bilgiyi haritanın rengine kendin ekleme.",
        ],
      },
      {
        title: "Dünya nüfusunun uzun zaman çizgisi",
        paragraphs: [
          "Ders kaynağı dünya nüfusundaki belirgin artışları üç büyük dönüşümle ilişkilendirir: Paleolitik dönemde alet kullanımıyla beslenme ve korunmanın gelişmesi; Neolitik dönemde tarım, hayvanların evcilleştirilmesi ve yerleşik hayat; Sanayi Devrimi sonrasında üretim ve sağlık koşullarındaki değişim.",
          "Bu şema her dönüşümün tek tarihte bütün dünyada aynı sıçramayı yarattığı kesin bir ölçüm değildir. Eski dönemlerin nüfusları arkeolojik ve üretim kapasitesine dayalı tahminlerdir. Salgın, kıtlık ve savaşlar belirli yer ve dönemlerde düşüş yaratabilir; uzun dönem artışı her yıl kesintisiz artış sanma.",
        ],
      },
      {
        title: "Yakın dönem miktarı ve artış hızını ayır",
        paragraphs: [
          "Sanayileşme sonrasında beslenme, barınma ve hastalıklarla mücadeledeki değişimler ölümlerin azalmasına katkı verdi; doğumlar sürerken nüfus daha hızlı büyüyebildi. Kaynak 2022 için yaklaşık 8 milyarı tarihli örnek olarak verir. Bu sayı uygulamanın yeni bir güncel dünya sayımı değildir.",
          "Bir yandan dünya toplamı artarken yıllık artış oranı düşebilir. Kaynakların ileri yıllara ait sayıları gözlem değil varsayımlı projeksiyondur; hangi doğum, ölüm ve göç koşuluna dayandığı önemlidir. Yerel bir bölgenin azalması ile dünya toplamının artması aynı anda mümkündür.",
        ],
      },
      {
        title: "Başka yoğunlaşma örneklerini yerelleştir",
        paragraphs: [
          "Nil Vadisi ve Nijerya çevresi Afrika’daki; Meksika çevresi ve Brezilya’nın doğu kıyıları Amerika’daki önemli nüfus yoğunlaşma örnekleridir. Sanayi, kentleşme, tarım, ticaret ve bağlantı ağlarının ağırlığı her yerde aynı değildir. Bütün kıtanın aynı yoğunluğu taşıdığı sonucu çıkmaz.",
          "Türkiye’nin de içinde bulunduğu Güneybatı Asya tek bir çöl veya tek nüfus rengi değildir; suya erişen vadiler, kıyı kentleri ve tarihî ticaret merkezleri iç kısımlardan ayrılır. Haritadaki bölge adı yalnız konum verir; hangi alt alan ve hangi ölçünün karşılaştırıldığı ayrıca okunur.",
        ],
      },
    ],
    examples: [
      {
        title: "Toplamdan yoğunluğa",
        prompt:
          "Bir bölgenin aynı yıl ve aynı sınır içindeki nüfusu 1.800.000 kişi, alanı 12.000 km²’dir. Aritmetik yoğunluğu hesapla.",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "Pay nüfustur: 1.800.000 kişi; payda 12.000 km²’dir.",
          },
          {
            label: "2. adım",
            explanation:
              "1.800.000 / 12.000 işlemini yap; ortak sıfırları sadeleştir.",
          },
          {
            label: "3. adım",
            explanation:
              "Sonucun birimi kişi/km² olur; 150 × 12.000 ilk nüfusu geri verir.",
          },
        ],
        answer: "Yoğunluk 150 kişi/km²’dir.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall: "Kişi sayısını km²/kişi biçimindeki ters oranla karıştırma.",
      },
      {
        title: "Aynı toplam, yarı alan",
        prompt:
          "X ve Y’nin nüfusu ayrı ayrı 600.000 kişidir. X’in alanı 3.000 km², Y’nin alanı 6.000 km²’dir. İki yoğunluğu kıyasla.",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "X için 600.000 / 3.000 = 200 kişi/km².",
          },
          {
            label: "2. adım",
            explanation: "Y için 600.000 / 6.000 = 100 kişi/km².",
          },
          {
            label: "3. adım",
            explanation: "Eşit pay yarı paydaya bölünürse oran iki kat olur.",
          },
        ],
        answer: "X’in yoğunluğu Y’nin iki katıdır.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall:
          "Nüfus toplamlarının eşit olması yoğunlukların eşit olmasını gerektirmez.",
      },
      {
        title: "Ortalama yerel kümeyi gizler",
        prompt:
          "Toplam 100 km²’lik dört eş hücrede 7.000, 1.000, 1.000, 1.000 kişi vardır. Toplam ve en yoğun hücrenin yoğunluğunu bul.",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "Her hücrenin alanı 100 / 4 = 25 km²’dir.",
          },
          {
            label: "2. adım",
            explanation: "Toplam 10.000 / 100 = 100 kişi/km² olur.",
          },
          {
            label: "3. adım",
            explanation: "En yoğun hücre 7.000 / 25 = 280 kişi/km²’dir.",
          },
        ],
        answer: "Bölge 100, en yoğun hücre 280 kişi/km²’dir.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall: "Bir hücreyi toplam alan olan 100 km²’ye bölme.",
      },
      {
        title: "Benzer sonuç, farklı kısıt",
        prompt:
          "Sahra iç kesimi ile Kuzey Kanada’nın geniş iç alanlarının ikisi de seyrek nüfusludur. Birinde kuraklık, diğerinde uzun don dönemi verilmiştir. Ortak ve farklı yanı açıkla.",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "Ortak gözlem, nüfusun geniş alanda seyrek olmasıdır.",
          },
          {
            label: "2. adım",
            explanation:
              "Sahra’da verilen kısıt su azlığı; Kuzey Kanada’da düşük sıcaklık ve dondur.",
          },
          {
            label: "3. adım",
            explanation:
              "Aynı sonuçtan aynı sıcaklık veya aynı kuraklık çıkarılamaz.",
          },
        ],
        answer: "Seyreklik ortaktır; baskın doğal kısıt farklıdır.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall: "Çöl kelimesinden her durumda sıcak iklim çıkarma.",
      },
    ],
    recall: [
      {
        prompt: "Yoğunluk birimini pay ve payda ile yaz.",
        answer: "Kişi / km²; nüfus ve alan aynı sınır ve döneme ait olmalı.",
      },
      {
        prompt: "Aynı ortalama her hücreyi eşit gösterir mi?",
        answer:
          "Hayır; toplam aynı kalırken insanlar belli hücrelerde toplanabilir.",
      },
      {
        prompt: "Nil Vadisi çöl çevresinden neden ayrılır?",
        answer: "Su ve sulanabilir dar vadi yerel yoğunlaşmayı destekler.",
      },
      {
        prompt: "Bir limanın iş çekmesi yalnız doğal etken midir?",
        answer:
          "Hayır; kıyı konumuna yatırım, ulaşım, ticaret ve iş ağı eklenir.",
      },
    ],
    items: [
      [
        "Nüfusu 720.000 kişi, alanı 4.800 km² olan bir bölgenin aritmetik nüfus yoğunluğu kaçtır?",
        "150 kişi/km²",
        ["15 kişi/km²", "6.667 kişi/km²", "3.456 kişi/km²", "720.000 kişi/km²"],
        "Kişi sayısını aynı alanın km² değerine böl.",
        "720.000 / 4.800 = 150 kişi/km²’dir. Alan ile kişi sayısının çarpımı veya ters oranı aritmetik nüfus yoğunluğu değildir.",
      ],
      [
        "X ve Y’nin nüfusu eşittir. X’in yüzölçümü Y’nin üçte biridir. X’in aritmetik yoğunluğu Y’ye göre nasıldır?",
        "Üç katıdır.",
        ["Üçte biridir.", "Eşittir.", "Dokuz katıdır.", "Nüfusu üç katıdır."],
        "Eşit payın daha küçük paydaya bölümünü düşün.",
        "D=N/A iken X’in alanı A/3 ise yoğunluğu 3 N/A olur. Toplamların eşitliği korunur; üç kat olan nüfus değil yoğunluktur.",
      ],
      [
        "Sahra’nın kurak iç kesimi ile Kuzey Kanada’nın uzun don dönemli iç kesimi seyrek nüfusludur. Bu veriler hangi yargıyı destekler?",
        "Benzer nüfus sonucu farklı doğal kısıtlarla ilişkili olabilir.",
        [
          "İki alanın sıcaklıkları eşittir.",
          "İkisi de sıcak çöldür.",
          "Seyrek nüfusun tek nedeni işsizliktir.",
          "Bütün kıyılar bu iki alandan seyrektir.",
        ],
        "Ortak sonucu, ayrı verilmiş nedenlerden ayır.",
        "Seyreklik ortak gözlem olsa da Sahra’da su kıtlığı, Kuzey Kanada’da soğuk ve don öne çıkar. Kıyı veya işsizlik hakkında ek veri verilmemiştir.",
      ],
      [
        "Bir çöl içinde akarsu vadisi sulanabilir toprak ve yerleşmeleri bir araya getiriyor. Bu örnekte çevreye göre yerel yoğunlaşmayı en doğrudan açıklayan bileşim hangisidir?",
        "Su erişimi ve sulanabilir arazi",
        [
          "Kutup gecesi ve don",
          "Bütün çölün eşit nüfuslanması",
          "Tek başına yüksek enlem",
          "Her vadide aynı sanayi üretimi",
        ],
        "Verilen yerel farkı yaratan özelliği seç.",
        "Vadi suyu ve tarıma uygun arazi, kurak çevreden ayrılan somut verilerdir. Bu örnek Nil benzeri yerel yoğunlaşmayı anlatır; her vadide aynı sanayi olduğu söylenmez.",
      ],
      [
        "Dört eş alanlı hücrenin nüfusu önce 2.500’er kişidir. Sonra aynı toplam 7.000, 1.000, 1.000, 1.000 olarak dağılır; toplam alan değişmez. Hangisi doğrudur?",
        "Bölge yoğunluğu aynı kalır, yerel yoğunluklar değişir.",
        [
          "Bölge yoğunluğu mutlaka iki kat olur.",
          "Toplam nüfus azalır.",
          "Her hücrenin yoğunluğu eşit kalır.",
          "Toplam alan dört katına çıkar.",
        ],
        "Ortalama için yalnız toplam nüfus ve toplam alan gerekir.",
        "Toplam her iki durumda 10.000 kişidir ve alan sabittir. Bu nedenle bölge ortalaması korunur; kişilerin hücrelere dağılımı ve her hücrenin oranı değişir.",
      ],
      [
        "Bir kentte liman, demiryolu, sanayi tesisi ve hizmet işleri birlikte gelişmiştir. Yoğun nüfusu yalnız verimli toprağa bağlayan açıklamanın eksikliği nedir?",
        "Verilen beşerî bağlantı ve iş etkenlerini dışlar.",
        [
          "Toprak hiçbir yerde etkili olamaz.",
          "Ulaşım yalnız sıcaklığı değiştirir.",
          "Limanlar her zaman nüfussuzdur.",
          "Hizmet işi doğal bitki örtüsüdür.",
        ],
        "Sorudaki açıklayıcı verilerin tümünü kullan.",
        "Sanayi, ulaşım ve hizmetler verilen beşerî etkenlerdir. Tarım bazı yerlerde etkili olsa da bunları yok saymak çok etkenli nüfus dağılışını eksik açıklar.",
      ],
      [
        "Bir haritada her ilin kesin toplam nüfusu ve haritanın yılı yazılmış, renk lejantı da verilmiştir; yüzölçümleri yoktur. Yalnız bu verilerden hangi değer kesin hesaplanamaz?",
        "İllerin aritmetik nüfus yoğunluğu",
        [
          "Verilen toplam nüfus",
          "Renklerin göstergeye karşılığı",
          "Haritanın üzerinde yazan yılı",
          "Bir ilin toplamının diğerinden büyük olup olmadığı",
        ],
        "Yoğunluğun paydasında hangi veri eksik?",
        "Toplam nüfus yoğunluğun yalnız payıdır. Her ilin alanı olmadan kişi/km² hesaplanamaz; haritada açık verilen tarih ve toplamlar ise doğrudan okunabilir.",
      ],
      [
        "Amazon iç havzasının bazı orman alanları seyrek, bazı muson ovaları yoğundur. Bu iki örnek hangi genellemeyi çürütür?",
        "Yağışlı her alan mutlaka seyrek nüfusludur.",
        [
          "Nüfus birçok etkene bağlıdır.",
          "Ulaşım yerel yoğunlaşmayı etkileyebilir.",
          "Tarım nüfusla ilişkili olabilir.",
          "Aynı kıtada farklı yoğunluklar bulunabilir.",
        ],
        "Mutlaka sözüne karşı örnek ara.",
        "Yağışlı muson ovalarının yoğun olması, yağışın her yerde seyrek nüfus yarattığı iddiasına karşı örnektir. Diğer seçenekler bu iki durumla çelişmez.",
      ],
      [
        "Nüfus 80.000 kişiden 120.000 kişiye çıkarken sınır ve alan 400 km² olarak sabit kalıyor. Yoğunluk değişimi nedir?",
        "200’den 300 kişi/km²’ye çıkar.",
        [
          "300’den 200 kişi/km²’ye iner.",
          "200 kişi/km² olarak kalır.",
          "Alan 600 km² olur.",
          "Toplam nüfus %25 azalır.",
        ],
        "İki dönemde aynı paydadan ayrı oran kur.",
        "80.000 / 400 = 200 ve 120.000 / 400 = 300’dür. Kişi sayısı %50 artmış, sabit alan nedeniyle yoğunluk da aynı oranda yükselmiştir.",
      ],
      [
        "Dağlık bir bölgede nüfus ana yolun ve suyun bulunduğu vadi tabanında toplanmış, sarp yamaçlarda seyrekleşmiştir. En uygun açıklama hangisidir?",
        "Yerel doğal koşullar ve ulaşım birlikte etkilidir.",
        [
          "Yükselti her yerde aynı nüfusu zorunlu kılar.",
          "Bölgenin bütün noktaları eşit yoğundur.",
          "Yol varlığı doğal bir iklim elemanıdır.",
          "Vadi bilgisi nüfusla ilişkilendirilemez.",
        ],
        "Vadi, yol ve sarp yamaç verilerini birlikte oku.",
        "Su ve daha elverişli taban doğal koşullardır; yol beşerî erişim sağlar. Yerel kümelenme, bütün dağa tek yoğunluk veya tek neden atamaya izin vermez.",
      ],
    ],
    source:
      "Aurelia 029 Dünyada Nüfusun Dağılışı PDF 1–7; OGM Dersler Cepte Nüfus PDF 12–14,18–21; MEBİ TYT Coğrafya PDF 98–99 ile karşılaştırılmış özgün anlatım, sayısal modeller ve sorular. Kaynakta atıf yapılan resmî sorular bu özgün banka kopyalanmadı.",
  },
  {
    id: "nufus-piramitleri",
    topic: "detail-66",
    title: "Nüfus piramitleri: kuşakları ve ölçeği oku",
    minutes: 75,
    objectives: [
      "Yaş ve cinsiyet çubuklarını aynı paydada birlikte yorumla.",
      "Beş ders tipinin olumlu özelliklerini ve çıkarım sınırını açıkla.",
      "Pay, kişi sayısı, yaş bağımlılığı ve gerçek istihdamı ayır.",
    ],
    sections: [
      {
        title: "Önce iki ekseni ve paydayı tanı",
        paragraphs: [
          "Nüfus piramidi belirli bir yerde ve tarihte yaş gruplarının cinsiyete göre dağılımıdır. Dikey eksende yaş aralığı, yatay eksende kişi sayısı veya yüzde bulunur. Sol tarafın erkek, sağ tarafın kadın olması yaygın bir düzen olsa da gösterge mutlaka kontrol edilir.",
          "Yüzdeler toplam nüfusa göre verilmişse iki cinsiyetin aynı yaş grubu payları toplanır. Her taraf kendi cinsiyet toplamına göre verilmişse doğrudan toplanamaz; iki cinsiyetin sayıları da gerekir. Ölçeği görmeden geniş çubuğu daha çok kişi diye yorumlama.",
        ],
      },
      {
        title: "Yaş aralıkları eşit olmayabilir",
        paragraphs: [
          "0–4, 5–9 ve 10–14 beşer yıllık gruplardır. Buna karşılık 75+ açık uçlu bir gruptur; 75 yaş ve üzerindeki bütün kişileri birleştirir. Aynı genişlik, farklı yaş aralığı tanımında aynı yaş başına nüfus anlamına gelmez. İki grafiği aynı gruplarla karşılaştır.",
          "Keşifte çocuklar 0–14, çalışma çağı 15–64 ve ileri yaş 65+ olarak toplanır. İlk üç çubuğun toplamı çocukları, sonraki on çubuk çalışma çağını, son üç çubuk 65+ grubunu verir. Bu yaş tanımı bir ders hesabıdır; tek tek herkesin iş durumunu söylemez.",
        ],
      },
      {
        title: "Taban, orta ve üst olumlu olarak ne anlatır?",
        paragraphs: [
          "Toplam nüfusa göre geniş taban yüksek çocuk payını, orta kuşakların genişliği çalışma çağının ağırlığını, üst bölüm ileri yaş payını gösterir. Pay ile kişi sayısı ayrıdır: küçük bir ülkenin yüksek yaşlı payı, büyük bir ülkenin düşük payından az kişiye karşılık gelebilir.",
          "Çocuk payının yüksek oluşu okul ve çocuk sağlığı ihtiyacını, ileri yaş payının artışı erişilebilir bakım ve sağlık planını düşündürür. Hizmetin kesin kapasitesi için sayı, yerel dağılım ve mevcut tesisler de gerekir. Piramit okul sayısını veya kişi başı geliri doğrudan hesaplatmaz.",
        ],
      },
      {
        title: "İçe çökük ve düzgün üçgen tipleri",
        paragraphs: [
          "Kenarları içe çökük ders tipinde taban çok geniş, ileri yaş kuşakları hızla dardır. Kaynak bu görünümü yüksek doğum ve yüksek ölüm koşullarıyla birlikte açıklar. Yüksek doğum, tek başına çok yüksek net nüfus artışını zorunlu kılmaz; ölüm ve göç de hesaba katılır.",
          "Düzgün üçgen tipinde geniş çocuk kuşakları yukarıya daha düzenli daralır. Ders bağlamında doğumların yüksek kaldığı ve ölüm koşullarının iyileştiği geçiş anlatılır. Kaynaklardaki ülke adları döneme ait örneklerdir; bu görünüm bir ülkenin değişmez kimliği veya güncel ölçümü değildir.",
        ],
      },
      {
        title: "Tabanı daralan asimetrik tip",
        paragraphs: [
          "Kaynağın asimetrik dediği tipte daha eski genç kuşaklar, en yeni çocuk kuşaklarından geniştir. Buradaki sözcük mutlaka kadın ve erkek taraflarının eşitsizliği anlamına gelmez; tabanın önceki kuşaklara göre daralması anlatılır. Yaş biçimi ile cinsiyet dengesini ayrı oku.",
          "Ders açıklaması önce yüksek olan doğurganlığın sonradan düşmesini ele alır. Gerçek bir piramitte göç ve kuşakların ölüm geçmişi de biçimi değiştirebilir. Sadece şekle bakarak kesin doğum oranı, gelir düzeyi veya bütün yaş gruplarının gelecekteki sayısı yazılmaz.",
        ],
      },
      {
        title: "Arı kovanı ve çan tipi",
        paragraphs: [
          "Arı kovanı tipinde yaş kuşaklarının genişlikleri daha dengelidir; çocuk payı görece düşük, ileri yaşların payı daha belirgindir. Kaynak bunu düşük doğum ve ölüm, uzun yaşam bağlamıyla ilişkilendirir. Aynı görünümden belirli bir yılın beklenen yaşam süresi sayısal bulunmaz.",
          "Çan tipinde en yeni çocuk kuşakları, bir önceki dar kuşaklara göre yeniden genişler. Kaynak düşük doğum sonrasındaki artışın izini anlatır. Ancak tek bir kesit artışın nedeninin mutlaka belirli bir politika olduğunu kanıtlamaz; doğum serisi ve göç verisiyle sınanır.",
        ],
      },
      {
        title: "Çentik, göç ve kuşak etkisi",
        paragraphs: [
          "Belirli bir yaş ve cinsiyet çubuğunun dar oluşu, o kuşağın azlığını gösterir. Daha az doğum, geçmiş kayıp, göç veya kayıt kapsamı bunun nedenleri olabilir. Komşu çubuklardan küçük olması tek başına bu olasılıklardan hangisinin gerçekleştiğini söylemez.",
          "Keşifte çıkış düğmesini açınca açıkça 20–24 yaş erkek grubundan kişi çıkarılır; diğer gruplar sabit kalır. Burada neden bilinir, çünkü kullanıcı bir müdahale yapmıştır. Gerçek hayatta neden bilinmeden görülen bir çentiği bu hazırlanmış deneyle özdeşleştirmemek gerekir.",
        ],
      },
      {
        title: "Yaşa bağlı oranı istihdam sanma",
        paragraphs: [
          "Yaş bağımlılık oranı bu derste (0–14 + 65+) / 15–64 × 100 olarak hesaplanır. Çalışma çağında 64 kişi ve diğer yaşlarda 36 kişi bulunan 100 kişilik örnekte oran %56,25 olur. Bu oran her yüz çalışma çağı kişiye düşen diğer yaş grubunu anlatır.",
          "15–64 yaşındaki herkes çalışmaz; öğrenci, işsiz veya iş gücüne katılmayan kişiler de bu yaşlarda olabilir. 65+ yaşta çalışan da bulunabilir. Bu yüzden yaş hesabına dayanan bağımlılık, gerçek çalışan başına bakılan kişi sayısı veya ekonomik bağımlılık ölçümüyle aynı değildir.",
        ],
      },
      {
        title: "Aynı payı farklı toplamla çarp",
        paragraphs: [
          "Bir grubun kişi sayısı, toplam nüfus ile o grubun payının çarpımıdır. %20 payın 1 milyon kişide karşılığı 200.000 iken %10 payın 3 milyon kişide karşılığı 300.000’dir. Büyük yüzde her zaman büyük kişi sayısı değildir.",
          "Keşfin sayıları gerçek bir ülke sayımı değil, beş biçimi kıyaslamak için yazılmış özgün dağılımlardır. Tam kişi sayısına yuvarlama toplamı koruyacak şekilde yapılır; bu nedenle çok küçük yüzde farkları oluşabilir. Bütün çubuklar aynı nüfus toplamına göre yeniden hesaplanır.",
        ],
      },
      {
        title: "Zaman serisi ile tek kesiti ayır",
        paragraphs: [
          "İki tarihin aynı sınır ve ölçekteki piramitleri doğurganlık geçişi, yaşlanma ve kuşakların ilerleyişi hakkında daha güçlü karşılaştırma sağlar. Beş yıl sonraki yaş grubunda doğum, ölüm ve göç birlikte rol alır; bir kuşağın herkesinin yaşadığı varsayılmadıkça çubuk aynen taşınmaz.",
          "Kaynaklardaki geniş taban–hızlı artış ilişkisini dersin demografik koşullarıyla birlikte öğren. Gerçek artış için doğum eksi ölüm ve net göç; beklenen yaşam için ölüm koşulları; eğitim ve gelir için kendi verisi gerekir. Güçlü bir yorum, gözlenen biçim ile ayrıca varsayılan nedeni açıkça ayırır.",
        ],
      },
    ],
    examples: [
      {
        title: "İki taraf aynı toplamda",
        prompt:
          "Bir piramitte 0–14 yaş erkek payı toplam nüfusun %12’si, kadın payı %11’idir. Toplam nüfus 400.000 kişidir. Çocuk payını ve sayısını hesapla.",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İki payın aynı toplam nüfusa ait olduğu açıkça verilmiştir.",
          },
          {
            label: "2. adım",
            explanation: "Çocuk payı 12 + 11 = %23 olur.",
          },
          {
            label: "3. adım",
            explanation: "400.000 × 0,23 = 92.000 kişi hesaplanır.",
          },
        ],
        answer: "Çocuk payı %23, çocuk sayısı 92.000 kişidir.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall:
          "Her tarafın yalnız kendi cinsiyetine göre yüzde verdiği grafikte aynı toplama işlemi kullanılamaz.",
      },
      {
        title: "Düşük pay, yüksek sayı",
        prompt:
          "X’in nüfusu 800.000, 65+ payı %25; Y’nin nüfusu 3.000.000, 65+ payı %10’dur. Hangi yerde daha çok 65+ kişi vardır?",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "X için 800.000 × 0,25 = 200.000 kişi.",
          },
          {
            label: "2. adım",
            explanation: "Y için 3.000.000 × 0,10 = 300.000 kişi.",
          },
          {
            label: "3. adım",
            explanation: "Oran X’te büyük, kişi sayısı Y’de büyüktür.",
          },
        ],
        answer: "Y’de 100.000 daha fazla ileri yaş kişi vardır.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall: "Yüzde büyüklüğünü kişi sayısı büyüklüğü sanma.",
      },
      {
        title: "Yaş bağımlılığı",
        prompt:
          "Özgün bir nüfusun %24’ü 0–14, %64’ü 15–64 ve %12’si 65+ yaştadır. Yaşa dayalı bağımlılık oranı nedir; gerçek istihdam bulunabilir mi?",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "Yaş tanımına göre diğer gruplar 24 + 12 = %36’dır.",
          },
          {
            label: "2. adım",
            explanation: "36 / 64 × 100 = %56,25 hesaplanır.",
          },
          {
            label: "3. adım",
            explanation:
              "15–64 yaş grubunun çalışıp çalışmadığı verilmediğinden çalışan sayısı bulunmaz.",
          },
        ],
        answer: "Yaş bağımlılığı %56,25; gerçek istihdam belirsizdir.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall:
          "Paydaya toplam nüfusu koyarsan bağımlılık oranı yerine yaş grubu payını bulursun.",
      },
      {
        title: "Açık müdahale ile açıklama",
        prompt:
          "Başlangıç nüfusu 100.000 olan bir örnekte 20–24 yaş erkek sayısı 5.000’dir. Yalnız bu gruptan 1.000 kişi çıkar; başka olay yoktur. Yeni grup sayısı ve toplam nedir?",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Gruptan yalnız verilen 1.000 kişiyi çıkar: 5.000 − 1.000 = 4.000.",
          },
          {
            label: "2. adım",
            explanation: "Toplam da 100.000 − 1.000 = 99.000 olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Yeni grup payı 4.000 / 99.000 × 100 ≈ %4,04’tür; eski toplamı kullanma.",
          },
        ],
        answer: "Grupta 4.000, toplamda 99.000 kişi kalır.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall:
          "Gerçek bir çentiği yalnız biçimine bakarak kesin dış göçe bağlama.",
      },
    ],
    recall: [
      {
        prompt: "Grafikte %12 ve %11 ne zaman toplanır?",
        answer: "İkisi aynı toplam nüfus paydasında ve aynı yaş aralığındaysa.",
      },
      {
        prompt: "15–64 payı çalışan payını verir mi?",
        answer: "Hayır; yaş grubu gerçek iş durumundan ayrıdır.",
      },
      {
        prompt: "Bir çentik kesin göç kanıtı mıdır?",
        answer: "Hayır; neden için kuşak ve zaman serisi verisi gerekir.",
      },
      {
        prompt: "75+ çubuğu beş yıllık mıdır?",
        answer:
          "Hayır; 75 ve üzerindeki bütün yaşları kapsayan açık uçlu gruptur.",
      },
    ],
    items: [
      [
        "Bir piramitte 0–14 erkek payı toplam nüfusun %13’ü, aynı yaş kadın payı %12’sidir. Toplam çocuk payı nedir?",
        "%25",
        ["%13", "%12", "%50", "%1"],
        "İki tarafın aynı toplam paydasını kontrol edip topla.",
        "Her iki yüzde aynı toplam nüfusa göre verildiği için 13 + 12 = %25 olur. Bir tarafın payını tüm çocuk payı sanmak kadın veya erkek grubunu eksik bırakır.",
      ],
      [
        "Toplam 300.000 kişinin %18’i 0–14 yaştadır. Bu yaş grubunda kaç kişi vardır?",
        "54.000",
        ["18.000", "16.667", "250.000", "5.400"],
        "Yüzdeyi 0,18 olarak toplamla çarp.",
        "300.000 × 18 / 100 = 54.000 kişidir. Yüzdeyi 18 ile doğrudan çarpıp yüz çarpanını unutmak kişi sayısını yanlış büyütür.",
      ],
      [
        "X’in 65+ payı %20 ve toplamı 500.000; Y’nin 65+ payı %10 ve toplamı 2.000.000’dur. Hangisi doğrudur?",
        "Y’de 65+ kişi sayısı daha fazladır.",
        [
          "X’te 65+ kişi sayısı iki kat fazladır.",
          "İkisinde 65+ sayısı eşittir.",
          "Y’nin yaşlı payı daha büyüktür.",
          "Toplamlar kişi hesabında kullanılamaz.",
        ],
        "Her oranı kendi toplamına uygula.",
        "X’te 100.000, Y’de 200.000 ileri yaş kişi vardır. Oran X’te daha büyük olsa da toplam farkı nedeniyle kişi sayısı Y’de iki kattır.",
      ],
      [
        "Bir grafikte 15–64 yaş grubunun payı %66’dır. İş durumu hakkında başka bilgi yoktur. Hangi yargı kesin kurulamaz?",
        "Nüfusun %66’sı fiilen çalışmaktadır.",
        [
          "Verilen yaş grubunun payı %66’dır.",
          "Geri kalan yaş grupları toplamı %34’tür.",
          "Bu yaş aralığı çalışma çağı hesabında kullanılmıştır.",
          "Yaş payı ile istihdam payı farklı ölçülerdir.",
        ],
        "Yaş tanımını gerçek çalışma kaydıyla karıştırma.",
        "Çalışma çağında öğrenci, işsiz ve iş gücüne katılmayan kişiler olabilir. Grafikten yaş payı okunur; gerçek istihdam için ayrı veri gerekir.",
      ],
      [
        "Bir ülkenin tek piramidinde 20–24 yaş erkek çubuğu komşu yaş gruplarından dardır. Nedene dair ek kayıt yoktur. En doğru yorum hangisidir?",
        "Kuşak daha azdır; kesin neden için ek veri gerekir.",
        [
          "Kesin olarak tümü dışarı göç etmiştir.",
          "Kesin olarak savaş yaşanmıştır.",
          "Bu yaşta hiç doğum olmamıştır.",
          "Okuryazarlık oranı doğrudan bulunur.",
        ],
        "Gözlenen çubuk ile nedeni ayır.",
        "Dar çubuk o yaş-cinsiyet grubunun azlığını gösterir. Doğum geçmişi, kayıp, göç veya kayıt etkisi olasıdır; hangisi olduğu yalnız tek biçimden kesinleşmez.",
      ],
      [
        "0–14 payı %20, 15–64 payı %70 ve 65+ payı %10’dur. Yaşa dayalı bağımlılık oranı (çocuk +65+) / 15–64 ×100 olarak tanımlanıyor. Sonuç yaklaşık kaçtır?",
        "%42,86",
        ["%30", "%70", "%23,33", "%233,33"],
        "Diğer iki grubun toplamını çalışma çağına böl.",
        "(20 + 10) / 70 × 100 ≈ %42,86’dır. %30 diğer yaş gruplarının toplam nüfustaki payıdır; tanımlanan bağımlılık oranının paydası toplam değil çalışma çağıdır.",
      ],
      [
        "Kaynakta tabanı önceki genç kuşaklara göre daralan tip, “asimetrik” adıyla anlatılıyor. Bu ad tek başına hangisini zorunlu kılmaz?",
        "Kadın ve erkek toplamlarının eşitsiz olmasını",
        [
          "Çocuk kuşağının önceki genç kuşaklardan dar olmasını",
          "Yaş biçiminin incelenmesini",
          "Tabanın eski kuşaklarla kıyaslanmasını",
          "Doğum serisine bakmanın yararlı olmasını",
        ],
        "Buradaki ders tipi adı yaş biçimini anlatır.",
        "Asimetrik tip adı bu bağlamda taban daralması için kullanılmıştır. Kadın ve erkek taraflarının toplamları yine eşit olabilir; iki ayrı simetri sorusunu karıştırma.",
      ],
      [
        "Bir ders senaryosunda doğum oranı bir süre düşük kalmış, sonra artmıştır. Yeni 0–4 kuşağı 5–9 kuşağından genişlemiştir. Kaynağın hangi tip açıklamasıyla uyumludur?",
        "Çan tipi",
        [
          "Yalnız içe çökük tip",
          "Hiç çocuk bulunmayan tip",
          "Sıfır nüfus tipi",
          "Yalnız göç verisi grafiği",
        ],
        "Son çocuk kuşağındaki yeniden genişlemeyi düşün.",
        "Çan tipi ders açıklaması, düşen doğum sonrasındaki yeniden artışla tabanın genişlemesini ele alır. Gerçek tek grafikte nedenin politika olduğu ayrıca kanıtlanmalıdır.",
      ],
      [
        "Bir piramidin yatay ekseni her cinsiyet için kişi sayısını, üst yaş grubu ise 75+ yaşları gösteriyor. 75+ çubuğunu 70–74 ile kıyaslarken hangi uyarı gerekir?",
        "75+ açık uçlu, 70–74 beş yıllık aralıktır.",
        [
          "75+ kesin beş yıllık aralıktır.",
          "75+ yalnız 75 yaşındakileri içerir.",
          "Eksen yüzde olmak zorundadır.",
          "İki grupta yaş başına kişi sayısı kesin aynıdır.",
        ],
        "Aralıkların kaç yılı kapsadığını kontrol et.",
        "75+ grubu 75 ve üzerindeki tüm yaşları toplar; 70–74 ise beş yılı kapsar. Toplam çubukları doğrudan yaş başına eşit aralıklı yoğunluk sanmak doğru değildir.",
      ],
      [
        "Özgün bir piramitte toplam 100.000 kişidir. Yalnız 20–24 yaş erkek grubundan 1.000 kişinin dışarı göç ettiği açıkça verilmiştir; başka olay yoktur. Yeni toplam nedir?",
        "99.000 kişi",
        ["101.000 kişi", "100.000 kişi", "90.000 kişi", "1.000 kişi"],
        "Tek verilen çıkışı başlangıç toplamından çıkar.",
        "100.000 − 1.000 = 99.000 kişidir. Bu örnekte neden açık müdahaleyle verilmiştir; gerçek bir çentiğin nedenini sırf şekilden saptama iddiası yoktur.",
      ],
    ],
    source:
      "Aurelia 030 Nüfus Piramitleri PDF 1–7; OGM Dersler Cepte Nüfus PDF 15,18–21; MEBİ TYT Coğrafya PDF 99–100 ve 103 gerçek şekilleriyle karşılaştırılmış özgün öğretim ve sorular. Beş model tipi gerçek ülke sayımı değildir; kesin neden ve gelecek tahmini vermez.",
  },
  {
    id: "turkiye-nufusu",
    topic: "detail-67",
    title: "Türkiye’de nüfus: tarih, dağılış ve kayıt sınırı",
    minutes: 75,
    objectives: [
      "Tarihî sayım, adres kaydı ve geçici kalabalığı ayır.",
      "Türkiye’de yoğun ve seyrek yerleri yerel etkenleriyle eşleştir.",
      "Miktar, artış hızı, yaş yapısı ve idari etiket değişimini ayrı hesapla.",
    ],
    sections: [
      {
        title: "Sayımın amacı ve kapsamı değişir",
        paragraphs: [
          "Osmanlı döneminde 1831 sayımı askerlik ve vergi amaçlarıyla, bugünkü bütün yaş ve cinsiyetleri aynı biçimde kapsayan bir kayıt sistemi olmadan yapılmıştır. Bu yüzden tarihî bir sayımı modern Türkiye’nin aynı sınır ve kapsamındaki nüfusu gibi okumak doğru değildir.",
          "Cumhuriyet’in ilk genel nüfus sayımı 1927’dedir; kaynak yaklaşık 13,6 milyon kişi verir. 1935’ten sonra beş yıllık sayım dönemleri, sonrasında 2000 genel sayımı ve 2007’den başlayan Adrese Dayalı Nüfus Kayıt Sistemi önemli dönüm noktalarıdır. Yöntem ve sınır değişimleri karşılaştırmada belirtilir.",
        ],
      },
      {
        title: "Adres kaydı anlık kalabalık değildir",
        paragraphs: [
          "ADNKS kişileri yerleşim yeri adresiyle ilişkilendiren kayıt sistemidir. Bir sahilde yaz günü görülen turist ve mevsimlik çalışan sayısı ile yıl sonu kayıtlı yerleşik nüfus aynı ölçü değildir. Sayımın hangi kişiyi, hangi tarihte ve hangi adreste kapsadığı açıklanmalıdır.",
          "Bir ilçenin gündüz nüfusu işe gelenlerle büyüyebilir; bu günlük dolaşım otomatik kalıcı göç değildir. Geçici kalabalık su, ulaşım ve sağlık talebini etkileyebilir. Buna rağmen ziyaretçi sayısını doğrudan adres nüfusuna eklemek hem kişi toplamını hem yoğunluğu yanlış adlandırır.",
        ],
      },
      {
        title: "Artış miktarı ile artış hızı",
        paragraphs: [
          "İki dönemin nüfus farkı kişi sayısıyla, artış hızı ise belirli bir dönem ve oran tanımıyla anlatılır. Hız düşerken pozitif kaldığı sürece nüfus artabilir. Bir grafikte hızın aşağı yönelmesi, nüfus sütunlarının da küçüldüğünü tek başına göstermez.",
          "MEBİ’nin 1927–2023 serisi miktarın arttığını, artış hızının dalgalandığını gösterir. Kaynakta 2023 için 85.372.377 kişi ve yıllık yaklaşık binde 1,1 artış verilir; bunlar tarihli ders verileridir, uygulamanın güncel 2026 sayımı değildir. Binde 1,1 yüzde 1,1 değildir.",
        ],
      },
      {
        title: "Erken dönem ve savaş etkisi",
        paragraphs: [
          "Cumhuriyet’in ilk yıllarında savaşların ardından nüfusu artırmaya yönelik yaklaşımlar, doğumlar ve dışarıdan gelen göçler etkili olmuştur. 1939’da Hatay’ın katılması ülke sınırının değişmesine de örnektir; böyle bir artışın tamamı doğum diye açıklanamaz.",
          "Türkiye İkinci Dünya Savaşı’na fiilen girmese de uzun süreli askerlik, evlilik ve doğumların etkilenmesi ile ekonomik koşullar 1940–1945 dönemindeki artış hızını düşürmüştür. Bu dönem yorumunda savaşta bütün nüfusun öldüğü gibi bir iddia kurulmaz; dolaylı sosyal etki ayrılır.",
        ],
      },
      {
        title: "Sağlık ve toplumsal dönüşüm",
        paragraphs: [
          "Savaş sonrası sağlık koşullarının iyileşmesi ve ölümlerin azalması artışa katılmış; kaynak 1955 ve 1960 sayım dönemlerini yüksek artış hızlarıyla ele almıştır. Aynı süreçte göçler ve doğum davranışı da rol oynar. Tek bir etken her dönem için yeterli açıklama değildir.",
          "1960 sonrası aile planlaması, kentleşme, eğitim, evlilik yaşı ve iş yaşamındaki değişimler doğurganlık ve artış hızını etkilemiştir. Dış işçi göçü de toplam değişime katılır. Bu uzun dönüşüm, kişilerin bireysel kararlarını veya bütün illerin aynı hızda ilerlediğini söyleyen bir yasa değildir.",
        ],
      },
      {
        title: "Sanayi ve hizmet merkezlerini konumlandır",
        paragraphs: [
          "Çatalca–Kocaeli Platosu, İstanbul çevresi ve Bursa; sanayi, ticaret ve ulaşım ağlarının nüfusla ilişkisini gösterir. İzmir–Manisa–Aydın çevresinde tarım, sanayi ve bağlantılar birlikte; Ankara’da yönetim, ulaşım ve hizmetler öne çıkar. Tek işlevli kent varsayma.",
          "Adana–Mersin çevresinde verimli ova, sanayi ve liman; Gaziantep’te sanayi ve ulaşım; Zonguldak–Karabük’te madencilik ve sanayi kaynak örnekleridir. Antalya kıyılarında tarım, hizmet ve turizm etkilidir. Bütün kıyının veya bütün batının aynı yoğunlukta olduğu sonucu çıkmaz.",
        ],
      },
      {
        title: "Seyrek alanların farklı nedenleri",
        paragraphs: [
          "Yıldız Dağları, Biga iç kesimi, Menteşe ve Taşeli gibi alanlarda engebe, ulaşım ve yerel tarım-su koşulları önemlidir. Tuz Gölü çevresinde kuraklık ve elverişsiz topraklar farklı bir kısıttır. Aynı seyrek sonucu her yerde tek nedene bağlama.",
          "Hakkâri’nin yüksek dağlık kesimleri ile Erzurum–Kars’ın yüksek ve soğuk alanları, dar üretim mevsimi ve erişim koşullarıyla değerlendirilir. Sinop–Kastamonu’nun dağlık iç kesimi kıyı kentleriyle aynı değildir. İl ortalaması, vadi ile sarp yamaç arasındaki farkı gizleyebilir.",
        ],
      },
      {
        title: "Kıyı ile iç kesimi koşullarıyla kıyasla",
        paragraphs: [
          "Karadeniz kıyılarında su, kıyı tarımı ve yerleşme ağı; geride ise kısa mesafede yükselen dağlar bulunur. Doğu Karadeniz’in her noktası eşit kalabalık değildir. Bir ana ulaşım vadisi, aynı yükseltideki yoldan uzak yamaçtan farklı yoğunlaşma gösterebilir.",
          "Konya, Kayseri, Eskişehir, Malatya ve Elâzığ gibi iç kent ve ova örnekleri, iç kesimlerin tümünün seyrek olduğu genellemesine uymaz. Doğal sınırlar, sanayi, yönetim, tarım ve ulaşım birlikte okunur. Konumdan doğrudan güncel kişi sayısı üreten bir ölçek yoktur.",
        ],
      },
      {
        title: "Yaş yapısı ve ortanca yaş",
        paragraphs: [
          "MEBİ’nin tarihli örneğinde 2023 nüfusu 0–14 yaşta %21,4; 15–64 yaşta %68,3; 65+ yaşta %10,2 olarak verilir. Yuvarlama nedeniyle toplam %99,9 olabilir; eksik binde bir yeni bir yaş grubu değildir. Yaş paylarını tam kişi sayısı gibi kullanma.",
          "Aynı kaynak 2007 ortanca yaşını 28,3, 2023 değerini 34 olarak karşılaştırır. Ortanca, yaşlar sıralandığında ortayı bölen değerdir; aritmetik yaş ortalaması değildir. Piramidin üst kesiminin genişlemesi ileri yaş payını düşündürür; tek başına herkesin aynı süre yaşadığını kanıtlamaz.",
        ],
      },
      {
        title: "Cinsiyet, eğitim ve beklenen yaşam",
        paragraphs: [
          "Kaynağın 2023 örneğinde kadın ve erkek payları yaklaşık %49,9 ve %50,1’dir. Yerel eğitim, askerî birlik veya yaşa-cinsiyete seçici göç bu dengeyi etkileyebilir. Ancak göç alan her ilçenin mutlaka erkek çoğunluklu olacağı gibi kesin bir kural kurulmaz.",
          "MEBİ 2020–2022 döneminde doğuşta beklenen yaşamı 77,5 yıl; erkeklerde 74,8, kadınlarda 80,3 yıl örneğiyle verir. Bu, o dönemin ölüm koşullarına dayalı bir göstergedir; herkesin ölüm yaşı veya nüfusun yaş ortalaması değildir. Eğitim için de okuryazarlık ve bitirilen okul ayrı ölçülerdir.",
        ],
      },
      {
        title: "İstihdam ve eğitimde payda önemlidir",
        paragraphs: [
          "Kaynakta 2023 okuryazarlığı yaklaşık %97,6 olarak örneklenir; eğitim göstergesinin kapsadığı yaş ve tanım korunmadan bebekleri de okuryazar saymak doğru değildir. Okuryazarlık, üniversite mezuniyeti veya bütün becerilerle aynı gösterge değildir.",
          "MEBİ’nin 2022 çalışan dağılımı tarım %15,8, sanayi %27,7, hizmet %56,5 örneğidir. Payda çalışanlardır; toplam nüfus veya 15–64 yaş grubunun tamamı değildir. Aynı kişi sayısından gelir payı da çıkarılamaz; üretim ve katma değer ayrı ölçülür.",
        ],
      },
      {
        title: "İdari kent oranını gerçek taşınmadan ayır",
        paragraphs: [
          "İl-ilçe merkezi, köy-belde veya farklı yoğunluk ölçütlerine göre kentsellik sınıflamaları farklı sonuç verebilir. Büyükşehir düzenlemeleri bazı yerleşmelerin idari statüsünü değiştirmiştir. Bir yerin etiketinin değişmesi, sakinlerinin aynı gün fiziksel olarak başka eve taşındığını göstermez.",
          "Kaynağın %93 kent ve %7 kır gibi tarihli idari örnekleri bu kapsamla okunur; evrensel fiziksel kentleşme oranı sayılmaz. Keşifte B ve C’nin etiketi değişirken bir milyon yerleşik kişinin tamamı yerinde kalır. Eski ve yeni oranı aynı tanım olmadan göç hesabına dönüştürme.",
        ],
      },
      {
        title: "Doğal fark ve net göçü iki satırda tut",
        paragraphs: [
          "Doğal nüfus değişimi doğum eksi ölümdür. Net göç, gelen eksi gidendir. Aynı sınır ve dönem için toplam fark bu ikisinin toplamıdır. Doğumlar fazla olduğu hâlde dışarı gidenler daha büyükse yerel nüfus azalabilir.",
          "Aynı ülke içindeki bir ilden diğerine taşınma il toplamlarını değiştirir; ülkenin bütünündeki kişi sayısını sırf yer değiştirme ile artırmaz. Ülke toplamı için sınır dışı giriş-çıkış ayrıca izlenir. İdari sınır değişiyorsa denkleme kapsam düzeltmesi de gerekebilir.",
        ],
      },
    ],
    examples: [
      {
        title: "Hız düşüyor, miktar artıyor",
        prompt:
          "Özgün bir örnekte aynı sınırlı ülke nüfusu ilk yıl 1.000.000, sonraki yıl 1.010.000, üçüncü yıl 1.015.050 kişidir. Basit yıllık oranları kıyasla.",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk fark 10.000; 10.000 / 1.000.000 ×100 = %1.",
          },
          {
            label: "2. adım",
            explanation: "İkinci fark 5.050; 5.050 / 1.010.000 ×100 = %0,5.",
          },
          {
            label: "3. adım",
            explanation:
              "Her iki fark pozitif olsa da ikinci büyüme oranı daha düşüktür.",
          },
        ],
        answer: "Nüfus artmaya devam eder; basit hız %1’den %0,5’e düşer.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall: "Azalan artış hızını azalan toplam nüfus diye adlandırma.",
      },
      {
        title: "Doğum toplam artış değildir",
        prompt:
          "Bir ilçede aynı yılda 900 doğum, 600 ölüm, 700 gelen ve 1.100 giden vardır. Sınır değişimi yoktur. Toplam kişi farkını hesapla.",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "Doğal fark 900 − 600 = +300 kişi.",
          },
          {
            label: "2. adım",
            explanation: "Net göç 700 − 1.100 = −400 kişi.",
          },
          {
            label: "3. adım",
            explanation: "İki bileşeni topla: +300 − 400 = −100 kişi.",
          },
        ],
        answer: "Nüfus 100 kişi azalır.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall: "Doğal +300 değerini toplam fark sanma.",
      },
      {
        title: "İdari etiket deneyi",
        prompt:
          "Temsilî bir ilde A 400.000, B 300.000, C 200.000 ve D 100.000 yerleşik kişi vardır. Önce yalnız A, sonra A +B +C idari kent sınıfındadır; kimse taşınmıyor. Oranlar nedir?",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Toplam 400.000 + 300.000 + 200.000 + 100.000 = 1.000.000.",
          },
          {
            label: "2. adım",
            explanation: "İlk kent payı 400.000 / 1.000.000 = %40.",
          },
          {
            label: "3. adım",
            explanation:
              "Yeni kent payı 900.000 / 1.000.000 = %90; kişi toplamı değişmez.",
          },
        ],
        answer: "Etiket oranı %40’tan %90’a çıkar; fiziksel göç verilmemiştir.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall:
          "İdari yeniden sınıflamayı 500.000 kişinin taşınması diye okuma.",
      },
      {
        title: "Ziyaretçi ve adres nüfusu",
        prompt:
          "Bir yerin yıl sonu adres nüfusu 80.000 kişidir. Yaz gününde buna ek 20.000 ziyaretçi bulunduğu, adres kaydı değişmediği verilmiştir. İki ölçüyü ayır.",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "Adres nüfusu 80.000 kişi olarak kalır.",
          },
          {
            label: "2. adım",
            explanation:
              "O andaki toplam bulunan kişi sayısı 80.000 + 20.000 = 100.000 olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Geçici hizmet talebi artabilir; bu yeni adres nüfusu kaydı değildir.",
          },
        ],
        answer:
          "Yerleşik 80.000; verilen andaki mevcut kalabalık 100.000 kişidir.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall: "Bir ziyaret gününü yıl sonu kayıtlı nüfusla eşitleme.",
      },
    ],
    recall: [
      {
        prompt: "Cumhuriyet’in ilk genel sayımı ve ADNKS başlangıcı?",
        answer: "1927 genel sayım; 2007’den itibaren adres kayıt sistemi.",
      },
      {
        prompt: "Binde 1,1 yüzde kaçtır?",
        answer: "%0,11; binde ile yüzde aynı ölçek değildir.",
      },
      {
        prompt: "İdari kent payı kimse taşınmadan değişebilir mi?",
        answer: "Evet; sınıf ve sınır tanımı değişirse oran değişebilir.",
      },
      {
        prompt: "Doğal +300, net göç −400 ise toplam?",
        answer: "Aynı sınır ve dönemde toplam −100 kişi.",
      },
    ],
    items: [
      [
        "Cumhuriyet Dönemi’nin ilk genel nüfus sayımı hangi yılda yapılmıştır?",
        "1927",
        ["1831", "1939", "2007", "2023"],
        "Osmanlı asker-vergi sayımı ile Cumhuriyet genel sayımını ayır.",
        "Cumhuriyet’in ilk genel sayımı 1927’dedir. 1831 farklı dönem ve kapsamın asker-vergi amaçlı sayımıdır; 2007 ise adres kayıt sisteminin başlangıcıdır.",
      ],
      [
        "Nüfus artış hızı iki yılda pozitif %1’den pozitif %0,5’e düşüyor. Aynı sınır ve tanım korunuyor. Hangisi doğrudur?",
        "Nüfus artar; oransal artış yavaşlamıştır.",
        [
          "Nüfus kesin azalmıştır.",
          "Nüfus kesin yarıya inmiştir.",
          "Nüfus değişmemiştir.",
          "Göç kesin sıfırdır.",
        ],
        "Hızın işareti ile önceki yıla göre büyüklüğünü ayrı oku.",
        "Her iki oran pozitif olduğundan toplam artar. İkinci oranın daha küçük olması daha yavaş oransal artıştır; doğum ve göç bileşenleri ayrıca verilmemiştir.",
      ],
      [
        "Bir ilçede 800 doğum, 500 ölüm, 400 gelen ve 900 giden vardır. İdari sınır değişmiyor. Yıllık toplam nüfus farkı nedir?",
        "−200 kişi",
        ["+300 kişi", "−500 kişi", "+800 kişi", "+200 kişi"],
        "Önce doğal farkı, sonra gelen-giden farkını hesapla.",
        "Doğal fark +300, net göç −500 kişidir. Toplam +300 − 500 = −200 olur; yalnız doğum-ölüm farkı toplam nüfus değişimi değildir.",
      ],
      [
        "Yazın bir kıyı ilçesinde 30.000 ziyaretçi bulunuyor; yıl sonu kayıtlı nüfus 90.000 kişi, ziyaretçilerin adresi değişmiyor. Hangi yorum doğrudur?",
        "Geçici kalabalık ile kayıtlı yerleşik nüfus ayrı ölçüdür.",
        [
          "Kayıtlı nüfus kesin 120.000 olur.",
          "Bütün ziyaretçiler sürekli göçmendir.",
          "İlçede hizmet talebi değişemez.",
          "Kayıtlı nüfus kesin 30.000 azalır.",
        ],
        "O anda bulunmak ile adres kaydını ayır.",
        "Ziyaretçiler hizmet talebini artırabilir; fakat verilen koşulda adres nüfusuna eklenmezler. Bir yaz günü gözlemini yıl sonu nüfus kaydı olarak adlandırma.",
      ],
      [
        "Temsilî bir ilde bir milyon yerleşik kişi sabittir. Kent sınıfındaki 400.000 kişiye, tanım değişince yerinde kalan 500.000 kişi daha dâhil oluyor. Yeni idari kent payı nedir?",
        "%90",
        ["%40", "%50", "%140", "%10"],
        "Yeni sınıfın sayısını değişmeyen toplamla oranla.",
        "400.000 + 500.000 = 900.000 kişi yeni sınıfta yer alır; bir milyona oranı %90’dır. Bu değişim kimsenin fiziksel göçünü zorunlu kılmaz.",
      ],
      [
        "Kaynakta 2023 yıllık artışı yaklaşık binde 1,1 olarak verilen tarihli bir örnek bulunuyor. Aynı oran yüzde ölçeğinde nedir?",
        "%0,11",
        ["%1,1", "%11", "%0,011", "%110"],
        "Binde bin, yüzde yüz üzerinden tanımlıdır.",
        "1,1 / 1000 = 0,0011 ve yüzde biçimi 0,11’dir. Kaynak yılı korunmalıdır; bu sayı güncel 2026 artışının ölçümü diye sunulamaz.",
      ],
      [
        "Çatalca–Kocaeli çevresindeki nüfus yoğunlaşmasını hangi beşerî bileşim en doğrudan açıklar?",
        "Sanayi, ticaret ve ulaşım ağı",
        [
          "Yalnız kutup iklimi",
          "Bütün Marmara’nın eşit yüksekliği",
          "Sadece kalıcı buz örtüsü",
          "Bütün işlerin tarımsal olması",
        ],
        "Kaynakta bu alanla eşleşen iş ve bağlantıları seç.",
        "Çatalca–Kocaeli sanayi, ticaret ve ulaşım örneğidir. Bu durum Marmara’nın her noktasının aynı yoğunlukta olduğu veya doğal koşulların hiç etkili olmadığı anlamına gelmez.",
      ],
      [
        "Tuz Gölü çevresinin bazı kesimleri ile Hakkâri’nin sarp yüksek kesimleri seyrektir. Verilen yerleri aynı nedene indirmeyen açıklama hangisidir?",
        "İlkinde kuraklık ve toprak; ikincide engebe, soğuk ve erişim etkili olabilir.",
        [
          "İkisinde de yıl boyu aynı sıcaklık vardır.",
          "İkisi de kutup kıyısıdır.",
          "İkisi de yalnız turizmle açıklanır.",
          "Bütün Türkiye aynı yoğunluktadır.",
        ],
        "Kurak iç havza ile yüksek dağ koşulunu ayır.",
        "Tuz Gölü çevresindeki kuraklık ve toprak koşulları, Hakkâri’nin sarp ve yüksek kesimlerindeki koşullarla aynı değildir. Sonucun benzerliği bütün nedenleri özdeş yapmaz.",
      ],
      [
        "MEBİ’nin 2022 örneğinde hizmetlerde çalışan payı %56,5 olarak veriliyor. Bu yüzdede doğru payda hangisidir?",
        "Verideki toplam çalışan kişi sayısı",
        [
          "Türkiye’nin bütün yüzölçümü",
          "Bütün çocuklar",
          "Yalnız işsizler",
          "Bütün kişi başı gelirler",
        ],
        "Çalışan dağılımının toplamı kimlerden oluşur?",
        "Sektörel çalışan payı o sektörde çalışanların toplam çalışanlara oranıdır. Toplam nüfus, çalışma çağı ve gelir payı farklı paydalardır; aynı değer kabul edilemez.",
      ],
      [
        "Bir kaynak 2020–2022 dönemi için doğuşta beklenen yaşamı 77,5 yıl veriyor. En doğru açıklama hangisidir?",
        "Dönemin ölüm koşullarına dayalı bir yaşam göstergesidir.",
        [
          "Her kişinin kesin ölüm yaşıdır.",
          "Toplam nüfusun aritmetik yaş ortalamasıdır.",
          "2026’da yeniden ölçülmüş kesin değerdir.",
          "Bütün ilçelerde aynı hayat öyküsüdür.",
        ],
        "Göstergeyi bireysel kader veya yaş ortalamasıyla eşitleme.",
        "Beklenen yaşam belirli dönemin ölüm koşullarına dayalı istatistiksel göstergedir. Her bireyin kaç yıl yaşayacağını veya nüfustaki kişilerin ortalama yaşını söylemez.",
      ],
    ],
    source:
      "Aurelia 031 Türkiye’de Nüfus PDF 1–7; OGM Dersler Cepte Nüfus PDF 16–21; MEBİ TYT Coğrafya PDF 101–103 tarihli veri ve gerçek şekilleriyle karşılaştırılmış özgün öğretim/sorular. Sayısal yerel deney gerçek il sayımı değildir; kaynak yılları güncel veri gibi sunulmaz.",
  },
  {
    id: "dunya-turkiye-gocler",
    topic: "detail-68",
    title: "Dünya ve Türkiye’de göçler: sınır, süre ve akış",
    minutes: 75,
    objectives: [
      "Sınır, süre ve irade ölçütlerini aynı olayda ayrı sınıfla.",
      "Tarihsel ve Türkiye örneklerini neden-sonuç zinciriyle açıkla.",
      "İç hareketi ülke dışı akıştan ayırarak toplamları koru.",
    ],
    sections: [
      {
        title: "Göçü günlük dolaşımdan ayır",
        paragraphs: [
          "Göç, insanların yaşadıkları yeri sürekli veya belirli bir süre için değiştirmesidir. Her yolculuk, işe günlük gidiş geliş veya kısa turistik ziyaret göç değildir. Yaşam düzeni, kalış süresi ve kullanılan istatistik tanımı açık olmalıdır. Derslerdeki mevsimlik yer değiştirme ile yıllık adres göçü aynı kayıt olmayabilir.",
          "Bir kişi hem iç göç yapan, hem geçici kalan, hem de kendi isteğiyle giden biri olabilir. Bunlar birbirini dışlayan tek bir liste değildir; farklı soruların cevaplarıdır. Çıkış ve varış, ülke sınırı, süre ve nedeni ayrı satırlara yazmak sınıflama hatalarını azaltır.",
        ],
      },
      {
        title: "Üç sınıflama ekseni",
        paragraphs: [
          "Ülke içinde yaşam yeri değiştirme iç göç, ülke sınırı aşma dış veya uluslararası göçtür. İl veya bölge sınırı ülke sınırı değildir. Aynı ülkenin iki uzak ili arasında taşınma da iç göçtür; yakın iki sınır kenti arasında ülke değiştirme dış göç olabilir.",
          "Sürekli göç uzun süreli yerleşme amacı taşır; mevsimlik göç belirli iş veya geçim dönemi sonunda dönmeyi içerir. Gönüllü ve zorunlu ayrımı ise irade ve baskı koşuluyla ilgilidir. Afet nedeniyle taşınmanın dönüş tarihi verilmemişse sırf afet sözcüğünden sürekli veya mevsimlik sonucu çıkarılmaz.",
        ],
      },
      {
        title: "İtici ve çekici etkenleri yönüyle yaz",
        paragraphs: [
          "İşsizlik, geçim sıkıntısı, toprağın parçalanması ve ekonomik belirsizlik kaynak yerde itici olabilir. Hedef yerde iş, gelir, ulaşım ve eğitim olanakları çekicidir. Aynı ekonomik başlık kaynakta sorun, hedefte fırsat olarak farklı yönlerde çalışabilir.",
          "Kuraklık, sel, deprem ve güvenlik sorunu da yer değiştirmeye yol açabilir. Eğitim, sağlık, aile bağı, evlilik, tayin ve sosyal yaşam gibi nedenler ekonomik nedenlerle birlikte bulunabilir. Göç kararını bütün bireylerde tek nedene veya tek ülkenin değişmez özelliğine indirgeme.",
        ],
      },
      {
        title: "Orta Asya’dan farklı yönlere hareketler",
        paragraphs: [
          "Ders kaynakları Orta Asya’dan göçleri uzun bir döneme yayılan hareketler olarak ele alır. Otlak ve su koşulları, geçim baskısı, siyasi mücadele ve dış baskılar birlikte anlatılır. Kuzeyde Sibirya, doğuda Çin çevresi, güneyde Hindistan-Afganistan, batıda Hazar çevresi ve Anadolu yönleri kaynak haritasında ayrılır.",
          "Dördüncü yüzyılda Hunların batıya ilerleyişi ve başka toplulukların yer değiştirmesi Kavimler Göçü bağlamında işlenir. Bu tek seferde bütün insanların aynı yolu izlediği olay değildir. Roma dünyasındaki değişimleri yalnız bir göç okunun kaçınılmaz sonucu saymak yerine uzun siyasi ve toplumsal süreçle ilişkilendir.",
        ],
      },
      {
        title: "Yeni Dünya hareketleri ve zorla taşınma",
        paragraphs: [
          "Coğrafi keşifler ve kolonileşme sonrasında Avrupa’dan Amerika’ya, daha sonra Avustralya ve Yeni Zelanda’ya yerleşme hareketleri gelişmiştir. Kaynak siyasi-dinî baskı, geçim ve yeni fırsatları birlikte ele alır. Bu yerler göçlerden önce de yerli toplumların yaşadığı alanlardı; boş kıta gibi anlatılmaz.",
          "Afrika’dan Amerika’ya köleleştirilerek götürülen insanlar gönüllü işçi göçü yapmamıştır; zorla yerinden edilme ve insan sömürüsü söz konusudur. Göçün gerçekleşmesi onun herkes için eşit yarar veya özgür seçim olduğu anlamına gelmez. Tarihî toplamlar kaynak ve dönem kapsamına göre değişebildiği için bu derste uydurma tek kesin sayı verilmez.",
        ],
      },
      {
        title: "Mübadele ve hukuki kapsam",
        paragraphs: [
          "Mübadele, devletler arası anlaşmanın belirlediği nüfus gruplarının karşılıklı yer değiştirmesidir. Türkiye ile Yunanistan arasında 30 Ocak 1923 tarihli düzenleme önemli ders örneğidir. Bu zorunlu hareket iki ülkenin bütün vatandaşlarının istisnasız yer değiştirmesi olarak okunmaz.",
          "Kaynaklardaki yaklaşık kişi toplamları aynı olay için farklı kapsam ve değerler kullanabildiğinden bu derste çelişkili sayılar kesin ölçüm gibi tekrarlanmaz. Olayın türü, karşılıklılığı ve anlaşma koşulu öğrenilir. Bir yönün toplamı diğer yöne eşit olmak zorunda değildir; karşılıklı sözü eşit sayıda kişi demek değildir.",
        ],
      },
      {
        title: "İşçi ve nitelikli iş gücü hareketi",
        paragraphs: [
          "İkinci Dünya Savaşı sonrası Avrupa’nın iş gücü talebi, Türkiye’den özellikle 1960’lı yıllarda Almanya ve başka Avrupa ülkelerine göçlerle ilişkilidir. Daha sonra Orta Doğu, Kuzey Afrika ve eski Sovyet coğrafyasındaki işler farklı dönemlerde hedef olmuştur. Bütün dönemleri aynı iş ve hedefle açıklama.",
          "Beyin göçü nitelikli iş gücünün başka yerde çalışma ve yaşama olanaklarını seçmesiyle ele alınır. Araştırma ortamı, gelir, özgürlük ve mesleki fırsat etkili olabilir. Sadece düşük gelirli ülkeden yüksek gelirliye hareketle sınırlı evrensel yasa değildir; dönüş ve bilgi paylaşımı da ayrı incelenebilir.",
        ],
      },
      {
        title: "Zorunlu hareket ve koruma",
        paragraphs: [
          "Savaş, baskı ve çatışma nedeniyle insanlar ülke içinde yerinden edilebilir veya sınır aşabilir. Afet sonrası geçici ya da uzun süreli taşınma da mümkündür. Aynı doğal olayın etkisi konut, güvenli alan ve destek olanaklarına göre değişebilir.",
          "Mülteci, sığınmacı ve geçici koruma günlük dilde birbirinin yerine geçen basit nüfus etiketleri değildir; hukuki tanım ve süreçler taşır. Kısa bir göç kartında yalnız ülke ve neden verilmesiyle kişiye kesin hukuki statü atama. Önce zorunluluk ve sınır ölçütünü açık verilerle belirle.",
        ],
      },
      {
        title: "Türkiye’de sürekli iç göç",
        paragraphs: [
          "Türkiye’de özellikle 1950 sonrası kırdan kente hareketlerde tarımda makineleşme, parçalanan toprak, kırsal iş ve hizmet koşulları ile kentlerin çekimi birlikte etkilidir. İstanbul, İzmir, Ankara, Bursa ve Kocaeli farklı sektör ve hizmet ağlarına örnek olur; her kent aynı koşulu taşımaz.",
          "Kentten kente, kentten kıra ve kırdan kıra hareketler de iç göçtür. Kaynakların tersine göç dediği kentten kıra taşınma tek başına tüm kırsal alanların yeniden kalabalıklaştığını göstermez. Tayin, evlilik, eğitim ve afet de yön ve süreyi değiştirebilir.",
        ],
      },
      {
        title: "Mevsimlik iş ve yer değiştirme",
        paragraphs: [
          "Pamuk için Adana–Aydın–Şanlıurfa, fındık için Ordu–Giresun–Sakarya, üzüm için Manisa ve şeker pancarı için Konya–Kayseri–Eskişehir kaynak örnekleridir. Burada ürünün iş dönemi ile başka yerde yaşayıp çalışma ilişkisi kurulur; herkesin her yıl aynı yoldan gittiği varsayılmaz.",
          "Turizm ve inşaatın dönemsel iş talebi ile Karadeniz ve Akdeniz dağ kuşağındaki yaylacılık da ders örnekleridir. Kısa bir ziyaret veya her hafta aynı evden işe gidip gelme bunlarla otomatik eşitlenmez. Süre ve yaşam düzeni verilmeden hareketi istatistikte kesin göç diye sayma.",
        ],
      },
      {
        title: "Göç alan ve veren yerde etkiler",
        paragraphs: [
          "Göç alan yerde iş gücü, kültürel etkileşim, üretim ve pazar büyüyebilir. Konut, su, ulaşım, okul ve sağlık kapasitesi gereksinimi de artabilir. Planlı altyapı bu talebe yanıt verebilir; göçün her yerde zorunlu olarak aynı trafik veya çevre sorununu yarattığı söylenmez.",
          "Göç veren yerde iş gücü ve bazı yaş grupları azalabilir; boş konutlar veya kullanılmayan kamu hizmetleri ortaya çıkabilir. Öte yandan para transferi, bağlantı ve geri dönüş farklı etkiler yaratabilir. Bütün sonuçları yalnız olumlu veya yalnız olumsuz tek listeye indirgemek yerine koşulu belirt.",
        ],
      },
      {
        title: "Ülke içi akışta kişi korunur",
        paragraphs: [
          "X ve Y aynı ülkede olsun. X’ten Y’ye 2.000 kişi taşınırsa X 2.000 kaybeder, Y 2.000 kazanır. Başka olay yoksa ülke toplamı değişmez. İllerin göç toplamlarını kişiyi iki kez sayacak şekilde ülke nüfusuna ekleme.",
          "Keşifte Z ülke dışındadır. Z’den gelenler ülke toplamını artırır, Z’ye gidenler azaltır. İç akışın yönünü ters çevirince yerel toplamlar değişir; ülkenin dış net göçü aynı kalır. Şemadaki bütün yerler özgün sayısal düğümlerdir, gerçek şehir sayımı değildir.",
        ],
      },
      {
        title: "Net göç toplam değişim değildir",
        paragraphs: [
          "Net göç gelen eksi giden; doğal fark doğum eksi ölümdür. Aynı sınır ve dönem için toplam nüfus farkı ikisinin toplamıdır. Net göçü negatif olan bir yer, doğal artışı daha büyükse toplamda büyüyebilir.",
          "Bir akış sayısı ile o yerin dönem sonu stoku da farklıdır. Başlangıç nüfusu, doğum, ölüm, giriş ve çıkış ayrı gösterilmelidir. Kapalı sayısal deneyde tüm düğümlerin toplamını denetlemek hem yön hatasını hem aynı kişiyi iki kez eklemeyi yakalar.",
        ],
      },
      {
        title: "Mübadelede dinî kapsam ve istisna",
        paragraphs: [
          "1923 sözleşmesinin 1. maddesi Türkiye’de yerleşik Rum Ortodoks dininden Türk uyruklular ile Yunanistan’da yerleşik Müslüman dininden Yunan uyrukluların zorunlu değişimini düzenler. Kapsam yalnız günlük dildeki etnik adlarla veya iki ülkenin bütün vatandaşlarıyla eşitlenemez.",
          "Sözleşmenin 2. maddesinde tanımlanan İstanbul Rumları ve Batı Trakya Müslümanları değişimin dışında tutulmuştur; İstanbul için 1912 yasasının belirlediği Şehremaneti alanında 30 Ekim 1918’den önce yerleşmiş olma koşulu vardır. Bu nedenle şehirde bulunmuş her kişiyi otomatik istisna saymak da doğru değildir. Türü öğrenirken anlaşmanın kapsamını ve istisnasını birlikte koru.",
        ],
      },
      {
        title: "Türkiye’ye yönelen tarihli dış göç örnekleri",
        paragraphs: [
          "Mübadele kapsamında Yunanistan’dan Türkiye’ye gelenler, Cumhuriyet döneminin önemli dış göç örneğidir. 1989’da Bulgaristan’daki baskılarla Türkiye’ye yönelen hareket, siyasi ve toplumsal koşulların göçteki rolünü gösterir. Sayı ve hukuki kayıt dönemi ayrı belirlenmeden tek güncel toplam yazılmaz.",
          "1990’larda eski Yugoslavya coğrafyasındaki çatışmalar, Balkanlardan Türkiye’ye ve başka ülkelere yönelen hareketlerle ilişkilidir; bütün Yugoslavya göçlerini tek 1997 yılına sıkıştırma. Komşu ülkelerdeki çatışmalar ve eğitim-iş bağlantıları da farklı dönemlerde girişler oluşturur. Gelenlerin hepsinin aynı süre, neden ve statüyü taşıdığı varsayılmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Üç ölçütte tek olay",
        prompt:
          "Bir tarım işçisi kendi kararıyla Türkiye içinde başka ilde üç ay yaşayıp hasat bitince eski evine dönüyor. Sınır, süre ve irade bakımından sınıfla.",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "Ülke sınırı aşılmadığı için iç göç örneğidir.",
          },
          {
            label: "2. adım",
            explanation:
              "Üç aylık iş dönemi ve dönüş verildiğinden mevsimliktir.",
          },
          {
            label: "3. adım",
            explanation:
              "Kendi kararı verildiği için gönüllüdür; ekonomik neden süreyi tek başına belirlemez.",
          },
        ],
        answer: "İç, mevsimlik ve gönüllü hareket birlikte bulunur.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall:
          "İç ile mevsimlik sözcüklerini aynı sınıf listesindeki rakip seçenekler sanma.",
      },
      {
        title: "Doğal artış göç kaybını aşar",
        prompt:
          "Bir yerin dönem başında 50.000 kişisi vardır; 600 doğum, 300 ölüm, 1.200 gelen ve 1.400 giden kaydedilmiştir. Sınır değişmiyor. Son nüfus nedir?",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "Doğal fark 600 − 300 = +300 kişidir.",
          },
          {
            label: "2. adım",
            explanation: "Net göç 1.200 − 1.400 = −200 kişidir.",
          },
          {
            label: "3. adım",
            explanation: "Toplam fark +100; dönem sonu 50.100 kişidir.",
          },
        ],
        answer: "Net göç kaybına rağmen nüfus 100 kişi artar.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall: "Gelen ve gideni toplayıp net göç diye adlandırma.",
      },
      {
        title: "İç akış ülkeyi büyütmez",
        prompt:
          "A ülkesinde X 30.000 ve Y 20.000 kişi bulunuyor. X’ten Y’ye 4.000 kişi taşınıyor; doğum, ölüm veya dış göç yoktur. Yerel ve ülke toplamlarını bul.",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "X’in yeni stoku 30.000 − 4.000 = 26.000.",
          },
          {
            label: "2. adım",
            explanation: "Y’nin yeni stoku 20.000 + 4.000 = 24.000.",
          },
          {
            label: "3. adım",
            explanation:
              "26.000 + 24.000 = 50.000; başlangıç ülke toplamı korunur.",
          },
        ],
        answer: "X 26.000, Y 24.000, ülke 50.000 kişidir.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall: "Bir iç göçü ülkeye yeni 4.000 kişi girmiş gibi ekleme.",
      },
      {
        title: "Sınır ve süreyi kanıtla",
        prompt:
          "Sel nedeniyle bir aile aynı ülkenin başka ilçesine güvenli konuta taşınıyor. Dönüş tarihi veya orada kalma niyeti verilmemiştir. Hangi sınıflar kesindir?",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "Aynı ülke içinde olduğundan iç göçtür.",
          },
          {
            label: "2. adım",
            explanation: "Afet baskısı nedeniyle zorunlu hareket verilmiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "Dönüş veya kalıcı yerleşme bilgisi yok; süre tipi belirlenemez.",
          },
        ],
        answer: "İç ve zorunlu; sürekli/mevsimlik ayrımı için ek veri gerekir.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall: "Zorunlu olmayı otomatik olarak ömür boyu kalmayla eşitleme.",
      },
    ],
    recall: [
      {
        prompt: "Net göçün işaret sırası nedir?",
        answer: "Gelen − giden; pozitif değer net giriş demektir.",
      },
      {
        prompt: "İç göç ülke toplamını tek başına artırır mı?",
        answer: "Hayır; aynı kişiler ülke içinde yer değiştirir.",
      },
      {
        prompt: "Afet sözcüğü süreyi kesinleştirir mi?",
        answer: "Hayır; geçici veya sürekli kalış ayrıca verilmelidir.",
      },
      {
        prompt: "Mübadele karşılıklılığı eşit kişi sayısı mıdır?",
        answer:
          "Hayır; anlaşma kapsamında iki yönlüdür, sayılar eşit olmak zorunda değildir.",
      },
    ],
    items: [
      [
        "Bir kişi Van’dan Bursa’ya uzun süreli iş için kendi kararıyla yerleşiyor. Ülke sınırı aşılmıyor. Hangi sınıflama doğrudur?",
        "İç, sürekli ve gönüllü göç",
        [
          "Dış, sürekli ve gönüllü göç",
          "İç, zorunlu ve kesin mevsimlik göç",
          "Yalnız günlük işe gidiş geliş",
          "Kesin mübadele göçü",
        ],
        "Sınır, süre ve iradeyi ayrı kontrol et.",
        "Van ve Bursa aynı ülkede olduğundan iç; uzun süreli yerleşme sürekli; kendi kararı gönüllüdür. Üç ölçüt aynı olayda birlikte kullanılabilir.",
      ],
      [
        "Bir işçi başka ilde üç ay yaşayıp fındık hasadında çalışıyor ve eski yaşam yerine dönüyor. Süre ölçütünde hangi türdür?",
        "Mevsimlik göç",
        [
          "Sınır değişikliği",
          "Kesin ömür boyu yerleşme",
          "Mübadele",
          "Yalnız günlük servis yolculuğu",
        ],
        "Belirli iş dönemi ve dönüş açıkça verilmiştir.",
        "Üç ay başka yerde yaşama ve iş bitince dönme mevsimlik örnektir. Süre türünü ülke içi/dışı ayrımından veya her günlük yolculuktan ayrı tut.",
      ],
      [
        "Bir yıl 900 kişi gelen, 1.200 kişi giden; 700 doğum ve 300 ölüm olan bir yerde toplam nüfus farkı nedir?",
        "+100 kişi",
        ["−300 kişi", "+400 kişi", "+700 kişi", "−700 kişi"],
        "Doğal fark ve net göçü ayrı bulup topla.",
        "Net göç −300, doğal fark +400 kişidir. Toplam +100 olur; negatif net göç tek başına toplam nüfusun azaldığını kanıtlamaz.",
      ],
      [
        "X ve Y aynı ülkededir. X’ten Y’ye 5.000 kişi taşınıyor; başka olay yoktur. Ülke toplamı nasıl değişir?",
        "Değişmez.",
        [
          "5.000 artar.",
          "5.000 azalır.",
          "10.000 artar.",
          "Yerel sayılar da değişmez.",
        ],
        "X’teki eksilme Y’deki artışın aynısıdır.",
        "İç göçte X −5.000, Y +5.000 değişir; toplam sıfırdır. Yerel dağılım değişirken ülkeye yeni kişi girmiş sayılmaz.",
      ],
      [
        "Çatışmadan kaçan bir aile başka bir ülkeye geçiyor; kalış süresi ve hukuki kararı verilmemiştir. Hangisi kesin söylenebilir?",
        "Zorunlu ve dış göçtür; süre/statü için ek veri gerekir.",
        [
          "Kesin sürekli ve tek bir hukuki statüdedir.",
          "İç göçtür.",
          "Gönüllü tatildir.",
          "Günlük işe gidip gelmedir.",
        ],
        "Neden ve sınır verisi ile eksik süre/statüyü ayır.",
        "Çatışma zorunluluğu, ülke sınırı dış göçü destekler. Mülteci veya başka koruma statüsü hukuki süreç ister; kalışın süresi de verilmemiştir.",
      ],
      [
        "İşsizliğin kaynak yerde artması, hedef yerde iş ve eğitim olanaklarının bulunması verilmiştir. Doğru eşleme hangisidir?",
        "Kaynakta itici, hedefte çekici etkenler vardır.",
        [
          "Kaynakta çekici, hedefte itici etkenler vardır.",
          "İki bilgi de yalnız iklimdir.",
          "İki bilgi de ülke sınırının değişmesidir.",
          "Göç nedeni hiçbir biçimde yorumlanamaz.",
        ],
        "Etkenin kişinin çıktığı mı seçtiği yerde mi olduğuna bak.",
        "Kaynakta işsizlik ayrılmayı itebilir; hedefte iş ve eğitim seçimi çekebilir. Aynı olayın farklı yönleri birbirini dışlamaz; iklim veya sınır değişimi verilmemiştir.",
      ],
      [
        "Bir araştırmacı daha iyi laboratuvar ve mesleki olanak için başka ülkeye çalışmaya yerleşiyor. Nitelikli iş gücü açısından hangi kavramla ilişkilendirilebilir?",
        "Beyin göçü",
        [
          "Yalnız yaylacılık",
          "Kesin nüfus mübadelesi",
          "Kutup göçü",
          "Günlük alışveriş gezisi",
        ],
        "Kişinin uzmanlığı ve başka yerde yaşam kurması birlikte verilmiştir.",
        "Uzman kişinin başka ülkeye mesleki fırsat için yerleşmesi beyin göçü bağlamıdır. Bu ad hareketin mutlaka her durumda kalıcı zarar veya hiç dönüş olmayacağı anlamına gelmez.",
      ],
      [
        "Bir anlaşma kapsamındaki nüfus grupları Türkiye ile Yunanistan arasında karşılıklı yer değiştiriyor. Bu örnek hangi türdür?",
        "Mübadele göçü",
        [
          "Yalnız serbest turistik gezi",
          "Günlük işe gidiş",
          "İl içi banliyö hareketi",
          "Doğum artışı",
        ],
        "Devletler arası anlaşma ve karşılıklı yer değiştirme birlikte önemlidir.",
        "Anlaşma çerçevesindeki zorunlu karşılıklı nüfus değişimi mübadeledir. Karşılıklı oluş, bütün vatandaşların veya eşit sayıda kişinin hareket ettiği anlamına gelmez.",
      ],
      [
        "Göç alan bir kentte okul ve konut talebi artıyor. Hangi yorum verilen durumu aşmadan kurulabilir?",
        "Artan talep için planlı hizmet ve altyapı gerekebilir.",
        [
          "Göç her yerde zorunlu olarak aynı suça yol açar.",
          "Kentte üretim hiçbir zaman artamaz.",
          "Göç veren bütün köyler tamamen boşalmıştır.",
          "Her yeni sakin aynı meslek ve yaştadır.",
        ],
        "Koşullu hizmet gereksinimini mutlak genellemeden ayır.",
        "Daha fazla sakin hizmet talebini artırabilir; planlama ve kapasite sonuçları etkiler. Veriler suç, bütün köylerin boşalması veya herkesin aynı özellikte oluşunu desteklemez.",
      ],
      [
        "A ülkesine dışarıdan 2.000 kişi geliyor, 1.500 kişi dışarı gidiyor. Aynı dönemde doğal fark +300 kişidir. İç hareketler ülke içinde dengeleniyor. Ülke toplam farkı nedir?",
        "+800 kişi",
        ["+500 kişi", "+3.500 kişi", "−200 kişi", "−800 kişi"],
        "Dış net akışa doğal farkı ekle.",
        "Dış net göç 2.000 − 1.500 = +500; doğal farkla toplam +800 kişidir. İç göç ülke toplamına eklenmez; gelen ve gideni toplamak net değildir.",
      ],
    ],
    source:
      "Aurelia 032 Dünya ve Türkiye’de Göçler PDF 1–7; OGM Dersler Cepte Göç/Ekonomi PDF 10–14,21; MEBİ TYT Coğrafya PDF 104–107 ile karşılaştırılmış özgün öğretim ve sorular. Tarihî toplamların çelişkili kapsamı kesin sayı olarak aktarılmadı; hukuki koruma statüsü modelden atanmaz. Ayrıca 30 Ocak 1923 Nüfus Mübadelesi Sözleşmesi madde 1–2, League of Nations Treaty Series cilt 32, fiziksel PDF77 metni ile dinî kapsam ve istisna doğrulandı.",
  },
  {
    id: "ekonomik-faaliyetler",
    topic: "detail-69",
    title: "Ekonomik faaliyetler: üründen işlev ve değere",
    minutes: 75,
    objectives: [
      "Beş faaliyet grubunu yapılan somut işten ayır.",
      "Üçlü ve beşli sınıflamada aynı işi tutarlı topla.",
      "Çalışan payı, katma değer ve verimliliği ayrı oranlarla karşılaştır.",
    ],
    sections: [
      {
        title: "Kurum adı değil yapılan iş",
        paragraphs: [
          "Ekonomik faaliyetler ihtiyaçları karşılamak ve geçimi sağlamak için yapılan üretim ve hizmet işleridir. Aynı ürünün tarlada yetişmesi, fabrikada işlenmesi, kamyonla taşınması ve mağazada satılması farklı süreçlerdir. Yalnız ürünün adını bilmek sektörü belirlemez.",
          "Bir fabrikada üretim operatörü, malı taşıyan sürücü, yeni yazılım geliştiren ekip ve stratejik karar veren yönetici farklı işler yapabilir. Sorunun bireyin işi mi yoksa işletmenin ana faaliyeti mi istediği belirtilmelidir. Meslek adı bağlamı yoksa görev tanımıyla tamamlanır.",
        ],
      },
      {
        title: "Birincil: doğal ortamdan ürün ve hammadde",
        paragraphs: [
          "Tarım, hayvancılık, balıkçılık, ormancılık ve madencilik birincil faaliyet örnekleridir. Buğday yetiştirme, süt veya yün elde etme, balık avlama-yetiştirme, tomruk sağlama ve cevher çıkarma doğal ortamdan ürün veya hammadde elde etme aşamalarıdır.",
          "Birincil sözcüğü basit teknoloji veya yalnız köy anlamına gelmez. İleri teknolojiyle çalışan bir balık çiftliği de yaptığı işlem bakımından bu grupta olabilir. Madenden çıkarma ile cevheri metale dönüştürme ayrılır; aynı yer altı kaynağının adı iki aşamayı tek sektör yapmaz.",
        ],
      },
      {
        title: "İkincil: dönüştürme, inşaat ve enerji",
        paragraphs: [
          "Hammadde veya yarı mamulden yeni kullanılabilir ürün elde etme ikincil faaliyettir. Pamuktan iplik-kumaş, sütten peynir, buğdaydan un, cevherden metal üretimi örneklenir. Küçük atölye ve büyük fabrika arasında ölçek farkı olsa da süreç aynı grupta olabilir.",
          "Kaynağın ders sınıflamasında inşaat ve elektrik üretimi de ikincil gruptadır. Kömür çıkarma birincil, kömürden santralde elektrik üretme ikincildir. Yapının otel olması inşaatı turizm hizmeti yapmaz; otel binasını yapmakla orada konaklama hizmeti sunmak farklı işlerdir.",
        ],
      },
      {
        title: "Üçüncül: insanlara ve işlere hizmet",
        paragraphs: [
          "Taşıma, ticaret, bankacılık, sigorta, turizm, eğitim, sağlık, güvenlik, hukuk ve büro işleri üçüncül faaliyettir. Öğretmenin öğretmesi veya sürücünün yük taşıması somut hizmet üretir. Bu grupta fiziksel mal imalatının bulunmaması ekonomik değer üretilmediği anlamına gelmez.",
          "Ticaret mal ve hizmetin alım-satımını ve pazara ulaşmasını; ulaşım kişi veya yükün yer değiştirmesini sağlar. Bir gıda ürünüyle çalışan market satıcısı, ürünün tarımsal kökeni nedeniyle çiftçi sayılmaz. Sektör, malın adı yerine verilen sürece göre belirlenir.",
        ],
      },
      {
        title: "Hizmet kollarını birbirinden tanı",
        paragraphs: [
          "İletişim haber ve bilginin aktarılması; finans bankacılık, sigorta ve ilgili işlemler; turizm rehberlik, konaklama ve seyahat hizmetleriyle örneklenir. Eğitim ve sağlık hizmetlerinin kamu veya özel kurumda verilmesi aynı işlevi otomatik farklı ana sektöre taşımaz.",
          "Her bilgi kullanan iş dördüncül diye etiketlenmez. Bir öğretmenin hazır bilgiyi öğreterek eğitim hizmeti vermesi ile yeni yöntem veya yazılım geliştiren araştırma ekibinin görevi ayrılabilir. Kaynağın sınıflama kuralı ve soruda verilen işin çıktısı birlikte dikkate alınır.",
        ],
      },
      {
        title: "Dördüncül: bilgi üretimi ve işleme",
        paragraphs: [
          "Beşli ders ayrımında araştırma-geliştirme, yazılım, ağ ve bilgi işleme, grafik-tasarım ve coğrafi bilgi sistemleri dördüncül örnekleridir. Belirleyici unsur yalnız bilgisayar kullanmak değil, soruda bilgi ve yöntem üretme-işleme işinin verilmesidir.",
          "Bir mağaza kasiyerinin bilgisayarla satış yapması tek başına onu yazılım araştırmacısı yapmaz. Buna karşılık üretim hattının veri modelini geliştiren ekip malın kendisini imal etmek yerine bilgi işi yapar. Aynı kurum içinde farklı işlevler bulunması bu ayrımı öğrenmeye yardım eder.",
        ],
      },
      {
        title: "Beşincil: üst düzey yön ve karar",
        paragraphs: [
          "Beşincil faaliyet kamu ve özel sektörde üst düzey stratejik karar ve kontrol işleriyle ele alınır. Büyük şirketin yatırım yönünü belirlemek veya üst düzey kamu politikasını yönetmek kaynak örnekleridir. Az sayıda kişinin kararları geniş ekonomik alanı etkileyebilir.",
          "Her iş sırasında küçük bir karar verilmesi o işi beşincil yapmaz. Bir sürücünün güzergâh seçmesi hâlâ taşıma hizmetidir; bütün şirketin stratejik yatırım politikasını belirlemek farklı düzeyde iştir. Görevin yetki ve kapsamı açık olmalıdır.",
        ],
      },
      {
        title: "Üçlü ve beşli ayrımı çifte sayma",
        paragraphs: [
          "Tarım-sanayi-hizmet gibi üçlü ayrımda bilgi ve üst yönetim işleri geniş hizmet grubu içinde ele alınabilir. Beşli ayrım bu hizmetleri daha ayrıntılı böler. Aynı kişiyi hem hizmet toplamına hem ayrıca dördüncül toplamına ekleyerek toplam çalışanı iki kez sayma.",
          "Keşifte her kişi bir ana görev grubunda tutulur. Üçlü görünümde son üç grubun kişi sayıları tek hizmet grubunda toplanır; beşli görünümde tekrar ayrılır. Sınıf sayısı değişirken toplam çalışan ve toplam değer değişmez, yalnız gruplanma değişir.",
        ],
      },
      {
        title: "Çalışan payı ayrı, değer payı ayrı",
        paragraphs: [
          "Sektörün çalışan payı o sektördeki çalışanların toplam çalışanlara oranıdır. Katma değer payı ise sektörün katma değerinin toplam katma değere oranıdır. İki oranın pay ve paydası farklıdır; %20 çalışan olması %20 gelir veya ürün üretilmesini zorunlu kılmaz.",
          "Katma değer ile satış hasılatı da aynı şey değildir; aradaki üretim girdilerinin nasıl ele alındığı önemlidir. Keşfin değer birimleri yalnız açıkça tanımlanmış özgün katkı miktarlarıdır, maaş veya gerçek ülke GSYH’si değildir. Bir kişiye hangi ücretin ödendiği bu modelden çıkmaz.",
        ],
      },
      {
        title: "Makineleşme ve payın değişmesi",
        paragraphs: [
          "Tarımda makineleşme aynı ürünü daha az çalışanla sağlayabilir. Böylece birincil çalışan payı azalırken üretimin yok olması gerekmez. Çalışan başına üretim veya değer artabilir; işten ayrılanların başka iş bulup bulmadığı ayrı veridir.",
          "Keşifte ilk aşama 100 yerine 50 kişiyle aynı 100 değer birimini verir. Toplam çalışan 700’den 650’ye iner; bu yalnız hazırlanmış deneydir. Daha az çalışan payından otomatik işsizlik, toplam ülke nüfusu düşüşü veya bütün insanların daha çok ücret aldığı sonucu çıkarılmaz.",
        ],
      },
      {
        title: "Gelişmişliği tek sektörden hükmetme",
        paragraphs: [
          "Kaynaklar gelişme sürecinde birincil çalışan payının düşmesi, sanayi ve özellikle hizmetlerin ağırlığının artması eğilimini anlatır. Bu, her ülkenin aynı sırayı aynı hızla geçtiği veya tarımın değersiz olduğu anlamına gelmez. Teknoloji, üretkenlik ve ticaret yapısı da rol oynar.",
          "Kişi başı gelir, eğitim, sağlık ve beklenen yaşam, teknoloji üretimi, işsizlik ve gelir dağılımı gibi birden çok gösterge birlikte okunur. Yalnız hizmet payı yüksek diye herkesin yüksek gelire veya iyi çalışma koşuluna sahip olduğu kesinleşmez. Tarihli ülke grafiği değişmez ulusal kimlik değildir.",
        ],
      },
      {
        title: "Ekonomik ağın yerel ve küresel bağı",
        paragraphs: [
          "Ulaşım ve iletişim, hammadde ile pazar arasındaki bağlantıları genişletir. Limanlar, kanallar, boğazlar, kara ve demir yolları ürün akışına katılır. İnternet ve haberleşme reklam, bilgi ve hizmetlerin uzaktaki insanlara ulaşmasını kolaylaştırır.",
          "Türkiye’de iklim, yer şekilleri, kaynak ve nüfus yapısının çeşitliliği farklı faaliyetleri destekler. Verimli ova, sanayi kenti, turizm kıyısı ve bilgi hizmeti ağı birbirini tamamlayabilir. Üretim zincirinde bir aşamanın yeri değişince diğer aşamalarla bağın nasıl değiştiğini sorarak ezberden ilişkiye geç.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı gıdanın farklı işleri",
        prompt:
          "Bir çiftlik süt elde ediyor, başka tesiste peynir yapılıyor, kamyon peyniri mağazaya taşıyor. Bu üç somut görevi kaynak sınıflamasında sırala.",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Sütü hayvandan elde etme doğal ortamdan ürün sağlar: birincil.",
          },
          {
            label: "2. adım",
            explanation: "Sütü peynire dönüştürme yeni mal üretir: ikincil.",
          },
          {
            label: "3. adım",
            explanation: "Peyniri taşıma yük hizmetidir: üçüncül.",
          },
        ],
        answer: "Sıra birincil → ikincil → üçüncüldür.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall: "Gıda adının ortaklığı görevleri aynı sektöre toplamaz.",
      },
      {
        title: "Çalışan oranı",
        prompt:
          "Bir işletmeler kümesinde yalnız verilen ana görevler sayılıyor: 80 kişi hammadde elde ediyor, 120 kişi mal işliyor, 200 kişi hizmet veriyor. İkincil çalışan payı nedir?",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "Toplam çalışan 80 + 120 + 200 = 400’dür.",
          },
          {
            label: "2. adım",
            explanation: "İkincil çalışan 120 kişidir; pay 120 / 400’dür.",
          },
          {
            label: "3. adım",
            explanation:
              "0,30 ×100 = %30; bu çalışan payıdır, gelir payı değildir.",
          },
        ],
        answer: "İkincil çalışan payı %30’dur.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall: "Paydaya yalnız diğer sektörleri veya bütün nüfusu koyma.",
      },
      {
        title: "Yüksek pay, düşük kişi sayısı",
        prompt:
          "X’te 500.000 çalışanın %20’si, Y’de 200.000 çalışanın %40’ı birincil iş yapıyor. Birincil kişi sayılarını kıyasla.",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "X: 500.000 ×0,20 = 100.000 kişi.",
          },
          {
            label: "2. adım",
            explanation: "Y: 200.000 ×0,40 = 80.000 kişi.",
          },
          {
            label: "3. adım",
            explanation:
              "Y’nin oranı daha büyük; X’in kişi sayısı 20.000 daha çoktur.",
          },
        ],
        answer: "Birincil çalışan X’te 100.000, Y’de 80.000 kişidir.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall: "Farklı çalışan toplamlarında yalnız yüzdeleri kıyaslama.",
      },
      {
        title: "İş gücü ve değer ayrımı",
        prompt:
          "Özgün bir zincirde ilk aşama önce 100, makine örneğinde 50 çalışanla aynı 100 değer birimini sağlıyor. Diğer aşamalar 600 çalışan ve 1.500 değer biriminde sabit. İki payı bul.",
        strategy:
          "Önce ölçüyü ve verilen koşulları ayır; her adımın birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Önce toplam 700 çalışan; ilk aşama payı 100 /700 ≈ %14,29.",
          },
          {
            label: "2. adım",
            explanation:
              "Sonra toplam 650 çalışan; ilk aşama payı 50 /650 ≈ %7,69.",
          },
          {
            label: "3. adım",
            explanation:
              "Değer toplamı 1.600 ve ilk aşama 100 sabit: değer payı her iki durumda %6,25.",
          },
        ],
        answer: "Çalışan payı düşer, verilen değer payı %6,25 kalır.",
        check: "Sonucu ilk veriler ve kullanılan payda ile geri denetle.",
        pitfall:
          "Ayrılan 50 kişinin gelecekteki işini veya ücretini verilmeden belirleme.",
      },
    ],
    recall: [
      {
        prompt: "Cevher çıkarmak ile metal üretmek aynı grup mu?",
        answer: "Hayır; çıkarma birincil, dönüştürme ikincildir.",
      },
      {
        prompt: "Otel inşaatı ile otelde resepsiyon hizmeti?",
        answer: "İnşaat ikincil, konaklama hizmeti üçüncüldür.",
      },
      {
        prompt: "Beşli ayrımda yazılım ve stratejik yönetim?",
        answer: "Bilgi işi dördüncül, üst düzey karar beşincildir.",
      },
      {
        prompt: "Çalışan payı değer payına eşit olmak zorunda mı?",
        answer: "Hayır; farklı pay ve paydalarla ölçülür.",
      },
    ],
    items: [
      [
        "Bir görev yer altından bakır cevheri çıkarmak, diğeri cevheri işleyerek tel üretmektir. Kaynağın ders ayrımında sıra hangisidir?",
        "Birincil, ikincil",
        [
          "İkincil, birincil",
          "Üçüncül, üçüncül",
          "Beşincil, birincil",
          "İkisi de yalnız ulaşım",
        ],
        "Doğal ortamdan alma ile malı dönüştürmeyi ayır.",
        "Cevher çıkarma madencilik olarak birincil; cevheri kullanılabilir tel ürününe dönüştürme ikincildir. Aynı hammaddenin adı süreci tek sektöre indirmez.",
      ],
      [
        "Bir kişi yeni bir otel binasının inşaatında, diğeri tamamlanmış otelin resepsiyonunda konaklama hizmetinde çalışıyor. Sıra hangisidir?",
        "İkincil, üçüncül",
        [
          "İkisi de birincil",
          "Üçüncül, ikincil",
          "İkisi de beşincil",
          "Dördüncül, birincil",
        ],
        "Bina yapmak ile hizmet sunmak farklı aşamadır.",
        "İnşaat kaynak sınıflamasında ikincil; resepsiyon konaklama hizmeti olarak üçüncüldür. İşyerinin ortak otel adı, verilen iki somut görevi aynı yapmaz.",
      ],
      [
        "Beşli ders sınıflamasında bir ekip yeni şebeke yazılımı geliştiriyor; başka ekip şirketin ülke çapındaki stratejik yatırım kararını veriyor. Sıra hangisidir?",
        "Dördüncül, beşincil",
        [
          "Birincil, birincil",
          "İkincil, üçüncül",
          "Üçüncül, birincil",
          "Beşincil, ikincil",
        ],
        "Bilgi üretimi ile üst düzey karar düzeyini ayır.",
        "Yeni yazılım bilgi işi olarak dördüncül; şirketin geniş stratejik yönünü belirleyen karar beşincildir. Her bilgisayar kullanımı veya küçük günlük karar bu etiketleri almaz.",
      ],
      [
        "Toplam 600 çalışanın 150’si mal işleme görevindedir. Bu ikincil grubun çalışan payı nedir?",
        "%25",
        ["%15", "%40", "%75", "%4"],
        "Grubu toplam çalışan sayısına böl.",
        "150 /600 ×100 = %25’tir. Payda toplam çalışanlardır; yalnız başka sektörler veya toplam nüfus kullanılırsa aynı gösterge elde edilmez.",
      ],
      [
        "Bir sektörde çalışan payı %20 olarak biliniyor; katma değer veya gelir verilmemiştir. Hangisi kesin söylenemez?",
        "Toplam katma değerin %20’si bu sektörden gelir.",
        [
          "Toplam çalışanların beşte biri bu sektördedir.",
          "Çalışan payı bir oran göstergesidir.",
          "Gelir payı için ayrı veri gerekir.",
          "Payın paydası toplam çalışandır.",
        ],
        "Çalışan ile değerin ölçüleri farklıdır.",
        "İnsan sayısı payı aynı değer üretimini zorunlu kılmaz. Katma değer payı için sektör ve toplam katma değer ayrıca gerekir; %20 çalışan tek başına bu bilgiyi taşımaz.",
      ],
      [
        "Üçlü ayrımda bilgi işi ve üst yönetim hizmet içinde toplanıyor. Beşli ayrımda bunlar dördüncül ve beşincil olarak ayrılıyor. Aynı kişiler korunuyorsa toplam çalışan ne olur?",
        "Değişmez; yalnız gruplama değişir.",
        [
          "İki kat olur.",
          "Kesin azalır.",
          "Bilgi işi yapanlar iki kez eklenir.",
          "Bütün çalışanlar birincil olur.",
        ],
        "Aynı kişilerin yeni başlıklar altında toplanmasını düşün.",
        "Sınıflama değişimi yeni kişi üretmez. Geniş hizmet toplamındaki kişiler ayrıntılı gruplara bölünür; hem geniş toplamı hem alt grupları tekrar eklemek çifte sayımdır.",
      ],
      [
        "Bir tarım aşaması aynı ürün miktarını 100 yerine 50 kişiyle sağlıyor. Diğer çalışanlar 600 kişide sabit. Bu verilerle hangi sonuç doğrudur?",
        "Bu aşamanın çalışan payı azalır; üretim sabit verilmiştir.",
        [
          "Ürün miktarı kesin yarıya inmiştir.",
          "Ayrılan herkesin işi kesin bellidir.",
          "Ülke nüfusu kesin 50 azalmıştır.",
          "Bütün ücretler iki katına çıkmıştır.",
        ],
        "Verilen sabit üretim ile değişen çalışanı ayır.",
        "Pay 100/700’den 50/650’ye düşer; üretim koşul gereği sabittir. Ayrılanların yeni işi, toplam nüfus ve ücretleri hakkında veri yoktur.",
      ],
      [
        "Bir sürücü kamyonla peyniri fabrikadan mağazaya taşıyor. Görev tanımı bakımından hangi ana gruptadır?",
        "Üçüncül",
        ["Birincil", "İkincil", "Kesin beşincil", "Yalnız tarımsal üretim"],
        "Ürünün kökeni yerine yapılan hizmeti seç.",
        "Sürücünün görevi taşıma hizmetidir ve üçüncül gruptadır. Peyniri imal etmiyor veya süt elde etmiyor; gıdayla çalışması bu işlevi değiştirmez.",
      ],
      [
        "X’te 400.000 çalışanın %30’u, Y’de 200.000 çalışanın %50’si birincil sektördedir. Hangisinde daha çok birincil çalışan vardır?",
        "X; 120.000 kişiye karşı 100.000 kişi",
        [
          "Y; oranı yüksek olduğu için her zaman daha çoktur.",
          "İkisinde de 50.000 kişi vardır.",
          "X; 30.000 kişiye karşı 50.000 kişi",
          "Toplamlar verilse bile hesaplanamaz.",
        ],
        "Her yüzdeyi kendi çalışan toplamıyla çarp.",
        "X 400.000 ×0,30 =120.000; Y 200.000 ×0,50 =100.000 kişidir. Y’nin payı büyük fakat toplam çalışanı daha küçük olduğundan kişi sayısı daha azdır.",
      ],
      [
        "Bir ülkenin hizmet çalışan payı yüksek olarak verilmiştir. Gelişmişlik için en uygun yaklaşım hangisidir?",
        "Gelir, eğitim, sağlık ve üretkenlik gibi ek göstergeleri birlikte incelemek",
        [
          "Bütün bireylerin gelirinin yüksek olduğuna kesin karar vermek",
          "Tarımın hiç değer üretmediğini söylemek",
          "Ülkenin tüm bölgelerini aynı saymak",
          "Bu tek paydan her ücreti hesaplamak",
        ],
        "Genel eğilim tek başına tüm yaşam koşullarını belirlemez.",
        "Sektörel yapı bir göstergedir; gelir dağılımı, üretkenlik, eğitim ve sağlıkla birlikte değerlendirilir. Tek hizmet payı herkesin ücretini veya bütün bölgelerin durumunu vermez.",
      ],
    ],
    source:
      "Aurelia 033 Ekonomik Faaliyetler PDF 1–7; OGM Dersler Cepte Göç/Ekonomi PDF 17–18,22; MEBİ TYT Coğrafya PDF 108–109 ile karşılaştırılmış özgün öğretim ve sorular. Çalışan/değer deneyleri gerçek ülke, maaş veya GSYH ölçümü değildir.",
  },
];
export const forge018GeographyTopics: Record<string, string> =
  Object.fromEntries(data.map((d) => [d.id, d.topic]));
export const forge018GeographyGuides: LessonGuide[] = data.map(
  ({ items: _i, topic: _p, title: _t, ...d }) => d,
);
function question018(
  d: Unit018,
  item: Unit018["items"][number],
  i: number,
): Question {
  const [prompt, correct, wrong, hint, explanation] = item,
    answer = (i * 3 + 1) % 5,
    options = [...wrong];
  options.splice(answer, 0, correct);
  return {
    id: `f018-geo-${d.id}-${i + 1}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(explanation),
    skill: `f018-geo-${d.id}-${i + 1}`,
  };
}
export const forge018GeographyLessons: Lesson[] = data.map((d) => ({
  id: d.id,
  subjectId: "tyt-cografya",
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
