import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
const clamp = (x: number, min: number, max: number) =>
  Number.isFinite(x) ? Math.min(max, Math.max(min, x)) : min;
export function waterBudget(
  flow: number,
  minutes: number,
  repeats: number,
  leak: number,
) {
  const oldUse = 12 * 5 * clamp(repeats, 1, 5),
    used = clamp(flow, 2, 16) * clamp(minutes, 1, 10) * clamp(repeats, 1, 5),
    loss = clamp(leak, 0, 100),
    old = oldUse + loss;
  return {
    oldUse,
    old,
    used,
    loss,
    total: used + loss,
    saving: old - used - loss,
    percent: (100 * (old - used - loss)) / old,
  };
}
export function carbonateBalance(progress: number, open: boolean) {
  const fraction = clamp(progress, 0, 100) / 100,
    unreacted = 100 * (1 - fraction),
    solid = 56 * fraction,
    gas = 44 * fraction;
  return {
    fraction,
    unreacted,
    solid,
    gas,
    measured: open ? unreacted + solid : 100,
    closedTotal: unreacted + solid + gas,
    carbon: 12,
    oxygen: 48,
    calcium: 40,
  };
}
export function ironSulfur(fe: number, sulfur: number, progress = 100) {
  const iron = clamp(fe, 0, 35),
    s = clamp(sulfur, 0, 20),
    capacity = Math.min(iron / 7, s / 4),
    extent = (capacity * clamp(progress, 0, 100)) / 100;
  const consumedFe = 7 * extent,
    consumedS = 4 * extent,
    product = 11 * extent;
  const limiter =
    iron === 0 && s === 0
      ? "none"
      : Math.abs(iron / 7 - s / 4) < 1e-10
        ? "both"
        : iron / 7 < s / 4
          ? "iron"
          : "sulfur";
  return {
    iron,
    s,
    extent,
    consumedFe,
    consumedS,
    product,
    leftFe: Math.max(0, iron - consumedFe),
    leftS: Math.max(0, s - consumedS),
    total: iron + s,
    limiter,
  };
}
export const multiplePairs = [
  {
    id: "co",
    names: ["CO", "CO₂"],
    x: "C",
    y: "O",
    ax: 12,
    ay: 16,
    a: [1, 1],
    b: [1, 2],
    valid: true,
  },
  {
    id: "no",
    names: ["NO", "NO₂"],
    x: "N",
    y: "O",
    ax: 14,
    ay: 16,
    a: [1, 1],
    b: [1, 2],
    valid: true,
  },
  {
    id: "n2o4",
    names: ["NO₂", "N₂O₄"],
    x: "N",
    y: "O",
    ax: 14,
    ay: 16,
    a: [1, 2],
    b: [2, 4],
    valid: false,
  },
] as const;
export function multipleRatio(
  pairId: string,
  fixed: "x" | "y",
  target: number,
) {
  const pair = multiplePairs.find((p) => p.id === pairId) ?? multiplePairs[0],
    m = clamp(target, 1, 48),
    index = fixed === "x" ? 0 : 1,
    other = 1 - index;
  const weights = [pair.ax, pair.ay],
    first =
      (m * pair.a[other] * weights[other]) / (pair.a[index] * weights[index]),
    second =
      (m * pair.b[other] * weights[other]) / (pair.b[index] * weights[index]);
  return {
    pair,
    fixed: fixed === "x" ? pair.x : pair.y,
    other: fixed === "x" ? pair.y : pair.x,
    target: m,
    first,
    second,
    ratio: first / second,
    valid: pair.valid,
  };
}
export const formulaSamples = [
  {
    id: "water",
    formula: "H₂O",
    kind: "molecule",
    mass: 18,
    atoms: { H: 2, O: 1 },
    ions: [],
    ionTotal: 0,
  },
  {
    id: "carbon",
    formula: "CO₂",
    kind: "molecule",
    mass: 44,
    atoms: { C: 1, O: 2 },
    ions: [],
    ionTotal: 0,
  },
  {
    id: "calcium",
    formula: "Ca(OH)₂",
    kind: "formula",
    mass: 74,
    atoms: { Ca: 1, O: 2, H: 2 },
    ions: [
      { name: "Ca²⁺", count: 1, charge: 2 },
      { name: "OH⁻", count: 2, charge: -1 },
    ],
    ionTotal: 3,
  },
  {
    id: "aluminium",
    formula: "Al₂(SO₄)₃",
    kind: "formula",
    mass: 342,
    atoms: { Al: 2, S: 3, O: 12 },
    ions: [
      { name: "Al³⁺", count: 2, charge: 3 },
      { name: "SO₄²⁻", count: 3, charge: -2 },
    ],
    ionTotal: 5,
  },
];
export function formulaCount(id: string, moles: number) {
  const sample = formulaSamples.find((x) => x.id === id) ?? formulaSamples[2],
    n = clamp(moles, 0, 3),
    atoms = Object.entries(sample.atoms)
      .filter((e): e is [string, number] => typeof e[1] === "number")
      .map(([symbol, count]) => ({ symbol, count, moles: n * count }));
  return {
    sample,
    moles: n,
    atoms,
    atomMoles: atoms.reduce((a, e) => a + e.moles, 0),
    ionMoles: n * sample.ionTotal,
    ions: sample.ions.map((i) => ({ ...i, moles: i.count * n })),
    netCharge: sample.ions.reduce((a, i) => a + i.count * i.charge * n, 0),
  };
}
export const avogadroApprox = 6.02e23;
export function massAmount(id: string, grams: number) {
  const sample = formulaSamples.find((x) => x.id === id) ?? formulaSamples[1],
    mass = clamp(grams, 0, 342),
    moles = mass / sample.mass;
  // This amount range can exceed the exploration's 3 mol limit; mass calculations must not clip it.
  const atomFactor = Object.values(sample.atoms).reduce<number>(
    (a, n) => a + (n ?? 0),
    0,
  );
  return {
    sample,
    mass,
    moles,
    number: moles * avogadroApprox,
    atomMoles: moles * atomFactor,
    oneMass: sample.mass / avogadroApprox,
  };
}

const unitData = [
  {
    id: "su-hayat-cevre",
    minutes: 45,
    objectives: [
      "Suyu yaşama bağlayan özellikler",
      "Bir yüzdeyi okumadan önce paydasını sor",
      "Su bütçesi: hacmi debiden kur",
      "Tasarruf yüzdesinin tabanı",
    ],
    sections: [
      {
        title: "Suyu yaşama bağlayan özellikler",
        paragraphs: [
          "Su, hücrelerde pek çok tepkimenin gerçekleştiği ortamdır; birçok iyonik ve polar maddeyi çözerek taşınmalarına yardım eder. Ancak her maddeyi sınırsız çözmez. Bir yağ damlasının suyla ayrı faz oluşturması, “iyi çözücü” ifadesinin “her şeyi çözer” anlamına gelmediğini gösterir.",
          "Yüksek özgül ısı, birim kütlede suyun sıcaklığını değiştirmek için görece çok enerji gerekmesi demektir. Terin buharlaşırken enerji alması sıcaklık düzenlenmesine katkı sağlar. Su bir besin yakıtı gibi enerji vermez; canlılığın sürmesi için miktarının, içeriğinin ve ulaşılabilirliğinin birlikte değerlendirilmesi gerekir.",
        ],
      },
      {
        title: "Bir yüzdeyi okumadan önce paydasını sor",
        paragraphs: [
          "Dünya yüzeyinin suyla kaplı bölümünü anlatan yüzde, toplam su kütlesinin tatlı su oranıyla aynı nicelik değildir. Bir pasta grafik hangi toplamı temsil ettiğini belirtmiyorsa iki yüzdeyi doğrudan çarpma veya toplama. Verinin yılı, bölgesi ve “erişilebilir” tanımı sonucu değiştirir.",
          "Örnek bir dağılımda toplam suyun %3’ünün tatlı olduğu verilse bile bunun tamamı kullanılabilir içme suyu sayılmaz. Buzullar, yer altı rezervleri, taşıma olanakları ve su kalitesi ayrıca sınırlayıcıdır. Uygulamadaki sayılar hesap öğretimi için verilen kurmaca veri olduğunda gerçek bir bölgenin güncel rezervi diye sunulmaz.",
        ],
      },
      {
        title: "Su bütçesi: hacmi debiden kur",
        paragraphs: [
          "Debi, birim zamanda geçen hacimdir. Musluk 12 L/dk akıyorsa 5 dakikalık tek kullanım 60 L su gerektirir. Günde üç kullanım için önce bir kullanımın hacmini bul, sonra tekrar sayısıyla çarp. L/dk ile dakikayı çarptığında dakika birimi sadeleşir; kalan birim litredir.",
          "Bir iyileştirme hem debiyi hem süreyi değiştirebilir. Eski ve yeni toplamları ayrı hesaplamak çift saymayı önler. Modelde aynı işi sağlayan kullanımları karşılaştırıyoruz; gerekli hijyenin, sağlık gereksinimlerinin veya tarımsal ihtiyacın sırf sayaç küçülsün diye kaldırılmasını önermiyoruz. Kaçak kaybı da kullanım dışı ayrı bir kalemdir.",
        ],
      },
      {
        title: "Tasarruf yüzdesinin tabanı",
        paragraphs: [
          "Tasarruf hacmi eski tüketimden yeni tüketimi çıkararak bulunur. Yüzde için bu farkı eski tüketimle bölüp 100 ile çarp. Eski 60 L, yeni 32 L ise fark 28 L ve tasarruf yaklaşık %46,67’dir. Yeni hacmi payda seçersen başka bir soruya, artış oranına cevap vermiş olursun.",
          "Birden çok önlem aynı suyu etkiliyorsa yüzdeleri körlemesine toplama. Debi yarıya iner ve kullanım süresi de yarıya inerse yeni hacim eskisinin dörtte biridir; tasarruf %75 olur. Günlük farkı otuzla çarpmak yalnız her gün aynı düzenin tekrarlandığı varsayımıyla otuz günlük fark verir.",
        ],
      },
      {
        title: "Kalite, kullanım amacına bağlı bir sorudur",
        paragraphs: [
          "İçme, sulama, soğutma ve temizlik aynı kalite ölçütlerinin tamamını paylaşmaz. Toplanan yağmur suyunun berrak olması, çatıda veya depoda mikroorganizma ve kimyasal kirletici bulunmadığını kanıtlamaz. Bir gözlem “renksiz” bilgisini verir; bütün analizlerin yerine geçmez.",
          "İçme suyu değerlendirmesinde ilgili mikrobiyolojik ve kimyasal ölçütler birlikte aranır. Sulamada tuzluluk ve bazı iyonların birikimi önemli olabilir. Buradaki amaç gerçek bir örneğe kullanım izni vermek değil, verilen ölçümün hangi iddiayı desteklediğini ayırmaktır. Yetersiz veri varsa doğru sonuç “kesin karar için ek veri gerekli” olabilir.",
        ],
      },
      {
        title: "Sertlik ile güvenliği birbirine karıştırma",
        paragraphs: [
          "Sertlik özellikle Ca²⁺ ve Mg²⁺ iyonlarıyla ilişkilidir; sabun tüketimi ve ısıtıcı yüzeylerinde birikim gibi sonuçlar doğurabilir. Suda bu iyonların az bulunması mikroorganizmaların veya bütün zararlı çözünmüş maddelerin yok olduğu anlamına gelmez. Yumuşaklık bir özellik, içilebilirlik çok ölçütlü bir değerlendirmedir.",
          "Bikarbonat kaynaklı geçici sertliğin bir kısmı uygun ısıtmayla çökelti oluşturarak azaltılabilir. Her sertlik türünün yalnız kaynatmayla giderildiği söylenemez. Saf suya da “hiçbir yararı olmayan su” denmez; laboratuvar ve çeşitli teknik işlemlerde değerlidir. Hangi suyun uygun olduğu, kullanım amacı ve ölçülen içerikle belirlenir.",
        ],
      },
      {
        title: "Sanal su ve görünmeyen kullanım",
        paragraphs: [
          "Evde sayaçtan geçen doğrudan suyun yanında besin ve ürünlerin üretiminde kullanılan su da vardır. Su ayak izi bir tedarik zincirini tanımlayan yönteme, bölgeye ve döneme bağlıdır. Bu yüzden her ürün için tek, değişmez bir litre değeri ezberlemek yerine sistem sınırını ve verinin nasıl üretildiğini sorgula.",
          "Aynı kilogram ürün farklı iklim ve üretim koşullarında farklı su gerektirebilir. Yağmur suyu katkısını, yüzey veya yer altı suyu çekimini ve kirlilikle ilişkili göstergeleri aynı anlamda okumamak gerekir. Verilen iki üretim verisi karşılaştırılırken ürün miktarını eşitlemek, birim ürün başına tüketimi bulmak için iyi bir başlangıçtır.",
        ],
      },
      {
        title: "Kaynağı koru, kullanım zincirini izle",
        paragraphs: [
          "Bir su yönetimi problemi kaynak, taşıma, kullanım, arıtım ve alıcı ortam zinciriyle düşünülür. Kaçağı onarmak çekilen suyu azaltabilir; kirleticiyi kaynağında önlemek sonraki arıtım yükünü azaltabilir. Bu iki etki aynı nicelik değildir: az su kullanmak, atığın otomatik zararsız olduğu anlamına gelmez.",
          "Tekrar kullanım kararında önce önceki kullanımdan suya ne geçtiğini, ardından hedef kullanımın ne gerektirdiğini sor. Uygun arıtım, izleme ve yerel kurallar gerekebilir. Modelde hacim kazancı hesaplanabilir; fakat ölçülmemiş bir kalite değişimi hesap sonucu gibi üretilmez. İyi çözüm hem miktar hem kalite için hangi kanıta sahip olduğunu açıklar.",
        ],
      },
      {
        title: "Derişimi eşitle, sertlikte eksik veriyi ara",
        paragraphs: [
          "Bir kirleticinin veya sertlik göstergesinin toplam miktarı, farklı hacimli örnekleri doğrudan sıralamaya yetmez. Önce aynı birime geç: 1000 mg = 1 g, 1000 mL = 1 L. Aynı CaCO₃ eşdeğeri tanımıyla A örneğinde 240 mg / 3 L = 80 mg/L, B’de 180 mg / 1,5 L = 120 mg/L bulunur. A’da toplam gösterge kütlesi daha büyükken B’nin birim hacimdeki eşdeğer sertliği daha büyüktür; derişim ile toplam kütle farklı sorulara cevap verir.",
          "“mg/L CaCO₃ eşdeğeri” bütün sertlik katkılarını ortak bir karşılaştırma ölçeğine taşır; suda gerçekten bu kadar çözünmüş CaCO₃ molekülü bulunduğu anlamına gelmez. Yalnız Mg²⁺ derişimi verilmiş, Ca²⁺ ve diğer katkılar bilinmiyorsa toplam sertlik kesin sıralanamaz. Farklı iyonların ham mg/L değerlerini gerekli eşdeğer dönüşümü verilmeden körlemesine toplama. Ayrıca bir analizde “saptanmadı” sonucu yöntem ve algılama sınırıyla sınırlıdır; bütün kirleticilerin mutlak sıfır olduğu iddiası değildir.",
        ],
        table: {
          headers: [
            "Örnek",
            "Ortak tanımdaki miktar",
            "Hacim",
            "CaCO₃ eşdeğeri derişim",
          ],
          rows: [
            ["A", "240 mg", "3 L", "80 mg/L"],
            ["B", "180 mg", "1,5 L", "120 mg/L"],
            ["C", "50 mg", "1 L", "50 mg/L"],
          ],
        },
      },
    ],
    examples: [
      {
        title: "Debi ile süre birlikte değişiyor",
        prompt:
          "Eski musluk 12 L/dk hızla 5 dakika; yeni düzen 8 L/dk hızla 4 dakika kullanılıyor. Her gün bir kullanım varsa 7 günlük hacim kazancı nedir?",
        strategy:
          "Önce iki günlük hacmi ayrı bul, sonra farkı gün sayısıyla çarp.",
        steps: [
          {
            label: "1. adım",
            explanation: "Eski günlük hacim 12 × 5 = 60 L olur.",
          },
          {
            label: "2. adım",
            explanation:
              "Yeni günlük hacim 8 × 4 = 32 L; günlük fark 60 − 32 = 28 L olur.",
          },
          {
            label: "3. adım",
            explanation: "Yedi aynı gün için 28 × 7 = 196 L kazanç vardır.",
          },
        ],
        answer: "196 L",
        check: "Eski 420 L − yeni 224 L = 196 L.",
        pitfall:
          "Debi farkı ile süre farkını çarpmak iki hacim arasındaki farkı vermez.",
      },
      {
        title: "Kaçağın görünmeyen bütçesi",
        prompt:
          "Bir depoda 0,2 L/dk kaçak gün boyunca kesintisiz sürüyor. Kaçak onarılırsa bir günde kaç L kayıp önlenir?",
        strategy: "Dakikayı günün toplam dakikasına bağla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Bir gün 24 × 60 = 1440 dakikadır.",
          },
          {
            label: "2. adım",
            explanation: "Kaçak hacmi 0,2 × 1440 = 288 L olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Onarımın kaçağı tamamen durdurduğu varsayımıyla önlenen kayıp 288 L/gündür.",
          },
        ],
        answer: "288 L/gün",
        check: "Saatlik 12 L × 24 saat de 288 L verir.",
        pitfall:
          "0,2 L/dk değerini doğrudan 24 ile çarpmak saat–dakika hatasıdır.",
      },
      {
        title: "Bir üretimi eşit temelde karşılaştır",
        prompt:
          "A düzeni 100 kg ürün için 800 L, B düzeni 50 kg için 500 L su çekiyor. Birim ürün başına hangisi daha az çeker?",
        strategy: "Ürün miktarını 1 kg temelinde eşitle.",
        steps: [
          {
            label: "1. adım",
            explanation: "A için 800/100 = 8 L/kg bulunur.",
          },
          {
            label: "2. adım",
            explanation: "B için 500/50 = 10 L/kg bulunur.",
          },
          {
            label: "3. adım",
            explanation:
              "A birim ürün başına 2 L/kg daha az çeker; bu veri tek başına kaliteyi göstermez.",
          },
        ],
        answer: "A düzeni, 8 L/kg",
        check: "100 kg B ürünü 1000 L; aynı miktarda A ürünü 800 L gerektirir.",
        pitfall:
          "Toplam 500 L küçüktür diye B’yi daha verimli sanma; ürün miktarları farklıdır.",
      },
      {
        title: "Veri ile iddia arasındaki mesafe",
        prompt:
          "Bir su örneği renksiz ve düşük sertlikli ölçülüyor. Mikrobiyolojik ölçüm yapılmıyor. Bu örneğin içilebilir olduğu kesin midir?",
        strategy:
          "Ölçülen özellikleri güvenlik için gereken veriyle karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Renksizlik gözlemi görünür renk hakkında bilgi verir.",
          },
          {
            label: "2. adım",
            explanation:
              "Düşük sertlik Ca²⁺/Mg²⁺ ile ilgili bir özelliğe işaret eder; tüm kirleticileri ölçmez.",
          },
          {
            label: "3. adım",
            explanation:
              "Mikrobiyolojik ve diğer gerekli kimyasal ölçütler bilinmeden içilebilirlik kesinleştirilemez.",
          },
        ],
        answer: "Kesinleştirilemez; ek uygun analiz gerekir.",
        check:
          "Hiçbir adım ölçülmeyen mikroorganizma miktarını sıfır kabul etmedi.",
        pitfall:
          "Berraklığı veya yumuşaklığı bütün güvenlik testlerinin yerine koyma.",
      },
    ],
    recall: [
      {
        prompt: "Debi × süre işleminin birimi nedir?",
        answer: "L/dk × dk = L; tekrar sayısı birimsizdir.",
      },
      {
        prompt: "Tasarruf yüzdesinde hangi hacim paydaya yazılır?",
        answer: "Karşılaştırmanın başlangıçtaki, eski hacmi.",
      },
      {
        prompt: "Yumuşak su kesin içilebilir midir?",
        answer:
          "Hayır; sertlik dışındaki gerekli kalite ölçütleri de değerlendirilmelidir.",
      },
      {
        prompt: "İki üretim sürecinin su tüketimi nasıl karşılaştırılır?",
        answer:
          "Aynı ürün miktarı ve aynı sistem sınırı için, örneğin L/kg ile.",
      },
    ],
    source:
      "MEBİ TYT Kimya Konu Özetleri PDF 56–60 (basılı 54–58); OGM 9. Sınıf Dersler Cepte, Su ve Hayat–Çevre Kimyası PDF 10–12, 15–20 doğrudan incelendi. Özgün su bütçesi ve kanıt değerlendirme etkinlikleri; veriler öğretim içindir, gerçek suya içilebilirlik onayı verilmez. Aurelia TYT Kimya 029 kopya kağıdı, canlı Drive’dan yeniden indirilerek ilgili öğretim ve çözüm sayfaları doğrudan karşılaştırıldı; resmî soru metni veya anahtar aktarılmadı.",
    title: "Su ve hayat: bütçe, kalite ve kullanım amacı",
    topic: "detail-167",
    items: [
      [
        "Bir musluk 9 L/dk debiyle 4 dakika akıyor. Kaç L su geçer?",
        "36 L",
        ["2,25 L", "13 L", "45 L", "360 L"],
        "Debiyi süreyle çarp.",
        "9 L/dk × 4 dk = 36 L; zaman birimi sadeleşir.",
      ],
      [
        "Aynı iş için eski tüketim 80 L, yeni tüketim 60 L oluyor. Eski değere göre tasarruf yüzde kaçtır?",
        "%25",
        ["%20", "%33,33", "%60", "%75"],
        "Farkı eski hacme böl.",
        "(80 − 60)/80 × 100 = %25. Yeni hacme bölmek başka bir oran verir.",
      ],
      [
        "0,1 L/dk kaçak 10 saat kesintisiz sürerse kaç L su kaybolur?",
        "60 L",
        ["1 L", "6 L", "100 L", "600 L"],
        "10 saati dakikaya çevir.",
        "10 saat 600 dakikadır; 0,1 × 600 = 60 L.",
      ],
      [
        "Bir su yalnız renksiz ve kokusuz bulundu. Başka analiz yok. Hangi sonuç desteklenir?",
        "Bu gözlemler tek başına içilebilirliği kanıtlamaz.",
        [
          "Bütün mikroorganizmalar yoktur.",
          "Suda hiçbir çözünmüş iyon yoktur.",
          "Su kesin damıtılmıştır.",
          "Her kullanım için kesin güvenlidir.",
        ],
        "Gözlemlerin ölçmediği özellikleri düşün.",
        "Görünüş ve koku, gerekli mikrobiyolojik ve kimyasal ölçütlerin tümünü göstermez.",
      ],
      [
        "Bir suyun Ca²⁺ ve Mg²⁺ miktarı düşürülüyor, başka ölçüm yapılmıyor. Hangi yorum uygundur?",
        "Sertlik azalabilir; tüm güvenlik ölçütleri bu işlemle kanıtlanmaz.",
        [
          "Bütün mikroorganizmalar zorunlu sıfırlanır.",
          "Su artık hiçbir atom içermez.",
          "Her çözünmüş organik madde kesin yok olur.",
          "Su gaz hâline dönüşmek zorundadır.",
        ],
        "İşlemin doğrudan hangi özelliği etkilediğini ayır.",
        "Ca²⁺ ve Mg²⁺ sertlikte önemlidir. Bunların azalması bütün kirletici kategorilerini ölçmez.",
      ],
      [
        "Kurmaca bir depoda 1000 L suyun %4’ü kullanılabilir bölümdür. Bu bölümün yarısı ayrılırsa kaç L ayrılır?",
        "20 L",
        ["2 L", "40 L", "50 L", "200 L"],
        "Önce verilen toplamın %4’ünü bul.",
        "1000 × 0,04 = 40 L; bunun yarısı 20 L. Paydası farklı yüzdeleri karıştırma.",
      ],
      [
        "A çiftliği 120 kg ürün için 960 L, B çiftliği 80 kg için 720 L su çekiyor. Aynı ürün için birim tüketim nasıldır?",
        "A: 8 L/kg; B: 9 L/kg; A daha azdır.",
        [
          "A: 9 L/kg; B: 8 L/kg; B daha azdır.",
          "İkisi de 8 L/kg’dır.",
          "Toplamı küçük olduğu için B kesin daha az L/kg kullanır.",
          "A: 0,125 L/kg; B: 0,111 L/kg’dır.",
        ],
        "Her hacmi kendi ürün kütlesine böl.",
        "960/120 = 8 ve 720/80 = 9 L/kg. Toplam hacimlerin doğrudan karşılaştırılması adil değildir.",
      ],
      [
        "Toplanan yağmur suyu için içme amacı değerlendiriliyor. Hangi yaklaşım uygundur?",
        "Toplama ve depolama etkilerini de kapsayan gerekli kalite analizlerini istemek",
        [
          "Yağmurdan geldiği için otomatik saf saymak",
          "Berraksa mikrobiyolojik ölçümü gereksiz saymak",
          "Sertlik düşükse her kimyasalı yok saymak",
          "Yalnız hacim ölçerek kullanım izni vermek",
        ],
        "Suyun geçtiği yüzey ve depoyu düşün.",
        "Yağmur suyu toplama yüzeyi ve depoda kirlenebilir. İçme amacı için ilgili ölçütler ayrıca doğrulanmalıdır.",
      ],
      [
        "Debi ve kullanım süresi ayrı ayrı yarıya indiriliyor; tekrar sayısı sabit. Başlangıca göre yeni hacim kaç kat olur?",
        "1/4",
        ["0", "1/2", "3/4", "2"],
        "Hacimde iki çarpan var.",
        "V = Q × t olduğundan yeni hacim (1/2) × (1/2) = 1/4 olur; tasarruf %75’tir.",
      ],
      [
        "Bir suyun teknik soğutmada uygun bulunması için verilen ölçütler sağlanmış, içme suyu analizleri yapılmamış. Hangi sonuç doğrudur?",
        "Bu uygunluk tek başına içme amacı için uygunluk anlamına gelmez.",
        [
          "Her kullanımın kalite ölçütleri aynıdır.",
          "Su kesinlikle hiçbir çözünmüş madde içermez.",
          "Teknik uygunluk içilebilirliği kesin kanıtlar.",
          "Su artık tüketim bütçesine katılmaz.",
        ],
        "Uygunluğun hangi amaç için belirlendiğini sor.",
        "Farklı kullanım amaçlarının gereksinimleri farklı olabilir; birinin onayı diğerinin bütün ölçütlerini göstermez.",
      ],
    ],
  },
  {
    id: "kutle-korunumu-sabit-oran",
    minutes: 45,
    objectives: [
      "Önce sistemin sınırını çiz",
      "Ürün toplamı ile son karışım farklıdır",
      "Görünür artış da madde alışverişidir",
      "Sabit oran, tüketilen kütlelerin oranıdır",
    ],
    sections: [
      {
        title: "Önce sistemin sınırını çiz",
        paragraphs: [
          "Kütle korunumu bir tartı ezberi değil, madde hesabıdır. Olağan kimyasal tepkimede atomlar yeniden düzenlenir; toplam kütle korunur. Ancak hangi maddeleri tarttığını belirtmeden “son kütle” diyemezsin. Kap, içindeki katı, sıvı ve gaz birlikte tartılıyorsa hepsi aynı sistem hesabına girer.",
          "Kapalı bir sistemde madde giriş çıkışı yoktur. Gaz çıkışı olan açık bir kapta yalnız kapta kalan kısmın kütlesi azalabilir; bu, atomların yok olduğu anlamına gelmez. Genel madde hesabını son = ilk + giren − çıkan şeklinde kurmak, deneyin görünen değişimini korunma ilkesiyle bağdaştırır.",
        ],
      },
      {
        title: "Ürün toplamı ile son karışım farklıdır",
        paragraphs: [
          "Bir tepkime tamamlansa bile başlangıçtaki maddelerden biri artabilir. Son karışımda ürünlerin yanında tepkimeye girmemiş madde de bulunur. Bu nedenle “ürün kütlesi başlangıç toplamına eşittir” ifadesi ancak tüm başlangıç maddeleri ürünlere katılmış ve sistem doğru seçilmişse doğrudur.",
          "Örneğin 14 g demir ve 12 g kükürtten 22 g FeS oluşuyorsa 4 g kükürt artar. Başlangıç 26 g, son karışım 22 + 4 = 26 g olur. Ürünün 22 g olması kütle kaybı değildir. Hangi maddenin arttığını bulma yöntemini sonraki sınırlayıcı madde ünitesinde derinleştireceksin.",
        ],
      },
      {
        title: "Görünür artış da madde alışverişidir",
        paragraphs: [
          "Açık havada bir metal oksitlenirken katının kütlesi artabilir. Oksijeni sistem dışında sayıp yalnız metali başlangıç kabul edersen “kütle üretildi” gibi görünür. Oysa havadan katıya oksijen katılmıştır; oksijen de başlangıç madde hesabına alındığında eşitlik sağlanır.",
          "119 g Sn ile 16 g O birleşip 135 g SnO oluşturuyorsa artış dışarıdan katılan 16 g oksijendir. Deney kabı, hava ve terazi sınırı aynı şey değildir. Sorudaki tartımın yalnız katıyı mı, bütün kabı mı, yoksa kapalı düzeneği mi kapsadığını bir cümleyle not etmek hatayı azaltır.",
        ],
      },
      {
        title: "Sabit oran, tüketilen kütlelerin oranıdır",
        paragraphs: [
          "Sabit oranlar kanunu, belirli saf bir bileşikte elementlerin sabit kütle oranıyla bulunmasını anlatır. Örneğin su için H = 1 ve O = 16 alındığında H₂O’daki hidrojen/oksijen kütle oranı 2/16 = 1/8’dir. Örnek büyüdükçe her iki elementin kütlesi aynı katsayıyla büyür.",
          "Başlangıçta kaba konan her şey bileşiğe katılmak zorunda değildir. Bu nedenle sabit oranı, artan maddeyi içeren ilk karışımın kütlelerinden rastgele kurma. Ayrıca çözelti ve alaşım gibi karışımların bileşimi değişebilir; sabit bileşik bileşimi ile değişken karışım oranı aynı kural değildir.",
        ],
      },
      {
        title: "Atom oranı, kütle oranı değildir",
        paragraphs: [
          "CO₂’de bir karbon atomuna iki oksijen atomu karşılık gelir; atom oranı C/O = 1/2’dir. C = 12 ve O = 16 için aynı formülün kütle oranı C/O = 12/32 = 3/8 olur. İki doğru oran farklı nicelikleri ölçtüğü için birbirinin yerine geçirilemez.",
          "Formülden kütle oranına geçerken her elementin atom sayısını kendi atom kütlesiyle çarp. Ters yönde formül bulurken element kütlelerini atom kütlelerine bölerek mol oranına ulaş. Verilen kütle oranını alt indis diye doğrudan yazmak çoğu zaman yanlış bir formül üretir.",
        ],
      },
      {
        title: "Bileşiğin tamamından element payına",
        paragraphs: [
          "Bir bileşikte elementin kütle payı, o elementin formüle katkısının toplam mol kütlesine oranıdır. CO₂ için karbon payı 12/44, oksijen payı 32/44’tür. Yüzde istediğinde bu kesirleri 100 ile çarp; toplamları saf bileşiğin tüm elementleri kapsanıyorsa %100 olmalıdır.",
          "22 g CO₂ örneğinde karbon kütlesi 22 × 12/44 = 6 g, oksijen kütlesi 16 g olur. Bu, örneğin moleküllerini tek tek saymadan kütle paylaşımı yapar. Verilen örneğin saf CO₂ olduğu koşulu önemlidir; karışıma aynı çarpanı koşulsuz uygulayamazsın.",
        ],
      },
      {
        title: "Grafikte korunumu takip et",
        paragraphs: [
          "Kütle–tepkime ilerlemesi grafiğinde girenlerin azalan çizgileri tüketilen miktarı, ürünün artan çizgisi oluşan miktarı gösterir. Bir giren sıfıra ulaşırken diğeri pozitif kalıyorsa ikincisi artmıştır. Başlangıç ile son arasındaki fark, her madde için ayrı okunmalıdır.",
          "Buradaki ilerleme ekseni gerçek zaman değildir; aynı ilerleme aralığının her zaman eşit saniyede geçtiği varsayılmaz. Her noktada girenlerin kalanı ile ürünler birlikte toplandığında kapalı sistem kütlesi sabit kalır. Ürün çizgisinin tek başına başlangıç toplamına ulaşması zorunlu değildir.",
        ],
      },
      {
        title: "Bir soruyu iki bağımsız yoldan denetle",
        paragraphs: [
          "Önce toplam kütle eşitliğini, ardından bileşiğin sabit element oranını kontrol et. Bir sonuç toplam kütleyi sağladığı hâlde yanlış bileşim verebilir; yalnız tek denklem her soruyu çözmez. Örneğin 20 g ürün dağılımı sayısal olarak mümkün görünse bile FeS için 7:4 kütle oranına uymayabilir.",
          "Son cevabı birimiyle yaz ve artan madde varsa açıkça ayır. Açık düzende çıkan gazı gizli bir kayıp olarak bırakma; miktarı ayrı bir kalem yap. Kütle, atom sayısı ve enerji farklı niceliklerdir; bu ünitedeki hesap olağan kimyasal dönüşümlerin madde bilançosudur, nükleer süreçlere ilişkin bir iddia değildir.",
        ],
      },
      {
        title: "Element kütlesi grafiğinde eksenleri oku",
        paragraphs: [
          "Saf su için H = 1 ve O = 16 alındığında 1 g H’ye 8 g O, 2 g H’ye 16 g O karşılık gelir. Yatay eksen H kütlesi, dikey eksen O kütlesiyse doğru orijinden geçer ve eğim Δm(O)/Δm(H) = 8 olur. Eksenleri değiştirip H’yi dikeye koyarsan eğim 1/8’dir. Aynı deney verisinden farklı eksen yönleriyle farklı eğim çıkması çelişki değildir; sabit tutulan nicelik ve oran yönü değişmiştir.",
          "Grafiğin her noktası saf bileşiğin içindeki element kütlelerini temsil etmelidir. Başlangıç karışımına eklenen ama artan hidrojen bu doğruya ürün bileşimiymiş gibi yerleştirilmez. Orijinden geçme koşulu da sıfır örnekte sıfır element kütlesi bulunmasına dayanır. CO₂ için C = 12, O = 16 seçildiğinde O dikey/C yatay eğim 32/12 = 8/3 olur; atom sayısı oranı 2’yi kütle grafiği eğimi diye yazamazsın.",
        ],
        table: {
          headers: ["Saf H₂O kütlesi", "İçerilen H", "İçerilen O"],
          rows: [
            ["9 g", "1 g", "8 g"],
            ["18 g", "2 g", "16 g"],
            ["27 g", "3 g", "24 g"],
            ["36 g", "4 g", "32 g"],
          ],
        },
      },
    ],
    examples: [
      {
        title: "Açık kapta çıkan gaz",
        prompt:
          "100 g saf CaCO₃ bütünüyle CaO ve CO₂’ye ayrılıyor. Ca = 40, C = 12, O = 16. CO₂ açık kaptan kaçarsa kalan katı kaç g olur?",
        strategy: "Formül kütlelerinden ürün paylarını kur.",
        steps: [
          {
            label: "1. adım",
            explanation: "CaCO₃ = 100, CaO = 56 ve CO₂ = 44 g/mol bulunur.",
          },
          {
            label: "2. adım",
            explanation: "100 g CaCO₃ için 56 g CaO ve 44 g CO₂ oluşur.",
          },
          {
            label: "3. adım",
            explanation:
              "Katı tartımı 56 g; katı ile çıkan gazın toplamı 100 g olur.",
          },
        ],
        answer: "56 g katı",
        check: "56 + 44 = 100 g; madde yok olmadı.",
        pitfall:
          "Açık kaptaki kalan katıyı kapalı sistem toplamıyla karıştırma.",
      },
      {
        title: "Kapalı karışımda artan madde",
        prompt:
          "Kapalı sistemde 14 g Fe ve 12 g S kullanılıyor. 22 g FeS oluşuyor. Son karışımın kütlesi ve artan madde toplamı nedir?",
        strategy: "Korunumu ürünle sınırlama.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk toplam 14 + 12 = 26 g bulunur.",
          },
          {
            label: "2. adım",
            explanation: "Kapalı sistemin son toplamı da 26 g olmalıdır.",
          },
          {
            label: "3. adım",
            explanation: "Ürün dışındaki madde toplamı 26 − 22 = 4 g olur.",
          },
        ],
        answer: "Son karışım 26 g; artan madde 4 g",
        check: "22 + 4 = 26 g.",
        pitfall:
          "Yalnız bu kütle hesabı artanın kimliğini belirlemez; bileşim bilgisi ayrıca gerekir.",
      },
      {
        title: "CO₂ içindeki iki oran",
        prompt:
          "C = 12 ve O = 16 iken 22 g saf CO₂’deki karbon ve oksijen kütlelerini bulun.",
        strategy: "Önce formülün toplam kütlesini hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation: "CO₂’nin mol kütlesi 12 + 2 × 16 = 44 g/mol olur.",
          },
          {
            label: "2. adım",
            explanation: "Karbon 22 × 12/44 = 6 g bulunur.",
          },
          {
            label: "3. adım",
            explanation: "Oksijen 22 × 32/44 = 16 g bulunur.",
          },
        ],
        answer: "6 g C ve 16 g O",
        check: "6 + 16 = 22; 6/16 = 3/8.",
        pitfall: "Atom sayısı oranı 1/2’yi kütle oranı sanma.",
      },
      {
        title: "Eksik ürün kütlesi",
        prompt:
          "Kapalı sistemde 8 g A ile 12 g B tamamen tepkimeye giriyor; yalnız C ve D oluşuyor. C 7 g ise D kaç g’dır?",
        strategy: "Tüm başlangıç kütlesini iki ürüne paylaştır.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk toplam 8 + 12 = 20 g olur.",
          },
          {
            label: "2. adım",
            explanation:
              "Artan giren olmadığı ve yalnız iki ürün olduğu verilmiştir.",
          },
          {
            label: "3. adım",
            explanation: "7 + m(D) = 20 denkleminden m(D) = 13 g bulunur.",
          },
        ],
        answer: "13 g",
        check: "7 + 13 = 8 + 12.",
        pitfall:
          "Soruda tam tüketim veya tek ürün bilgisi verilmeden bu eşitliği daraltma.",
      },
    ],
    recall: [
      {
        prompt: "Açık kapta kütle azalması korunuma aykırı mıdır?",
        answer:
          "Hayır; çıkan maddenin kütlesi sistem sınırı hesabına eklenmelidir.",
      },
      {
        prompt: "Sabit oran hangi kütlelerle kurulur?",
        answer: "Bileşiğe katılan, tepkimede tüketilen element kütleleriyle.",
      },
      {
        prompt: "CO₂’de C/O atom oranı ve kütle oranı nedir?",
        answer: "1/2 ve C = 12, O = 16 için 3/8.",
      },
      {
        prompt: "Ürün ile son karışım ne zaman farklıdır?",
        answer:
          "Tepkimeye girmeyen veya başka kalan maddeler de son karışımda bulunduğunda.",
      },
    ],
    source:
      "MEBİ TYT Kimya Konu Özetleri PDF 61–62 (basılı 59–60); OGM 10. Sınıf Dersler Cepte, Kimyanın Temel Kanunları PDF 10, 13–15 doğrudan incelendi. Özgün açık/kapalı sistem ve bileşim hesapları. Aurelia TYT Kimya 030 kopya kağıdı, canlı Drive’dan yeniden indirilerek ilgili öğretim ve çözüm sayfaları doğrudan karşılaştırıldı; resmî soru metni veya anahtar aktarılmadı.",
    title: "Kütlenin korunumu ve sabit oranlar",
    topic: "detail-168",
    items: [
      [
        "Kapalı kapta 9 g A ile 6 g B tamamen birleşip tek ürün oluşturuyor. Ürün kütlesi kaç g’dır?",
        "15 g",
        ["3 g", "6 g", "9 g", "54 g"],
        "Tek ürün ve tam tüketim koşullarını kullan.",
        "Kapalı sistemde 9 + 6 = 15 g. Artan giren olmadığı için tamamı tek üründedir.",
      ],
      [
        "100 g CaCO₃ ayrışınca 56 g katı ve açık kaptan çıkan bir gaz oluşuyor. Başka madde girişi yoksa gaz kaç g’dır?",
        "44 g",
        ["28 g", "56 g", "100 g", "156 g"],
        "Kalan ile çıkan toplamı başlangıca eşitle.",
        "100 = 56 + gaz; gaz 44 g. Katı tartımındaki azalma bu madde çıkışıdır.",
      ],
      [
        "Açık havada oksitlenen bir metalin katı kütlesi 12 g’dan 16 g’a çıkıyor. Yalnız oksijen katıldığına göre eklenen oksijen kaç g’dır?",
        "4 g",
        ["0 g", "12 g", "16 g", "28 g"],
        "Artışı son eksi ilk ile bul.",
        "16 − 12 = 4 g oksijen dışarıdan katılmıştır; toplam madde hesabına hava da girer.",
      ],
      [
        "H = 1 ve O = 16 alındığında saf H₂O’da H/O kütle oranı nedir?",
        "1/8",
        ["1/2", "2/1", "1/16", "8/1"],
        "İki H atomunun kütlesini bir O ile karşılaştır.",
        "H katkısı 2, O katkısı 16; 2/16 = 1/8. Atom oranı ise 2/1’dir.",
      ],
      [
        "C = 12 ve O = 16 alındığında CO₂ için C/O atom sayısı oranı ve kütle oranı sırasıyla nedir?",
        "1/2 ve 3/8",
        ["1/2 ve 1/2", "3/8 ve 1/2", "2/1 ve 8/3", "1/1 ve 3/4"],
        "Alt indis ve atom kütlesini ayrı tut.",
        "Bir C ve iki O vardır. Kütleleri 12 ve 32 olduğundan kütle oranı 3/8 olur.",
      ],
      [
        "Saf CO₂’de C/O kütle oranı 3/8’dir. 55 g CO₂ kaç g karbon içerir?",
        "15 g",
        ["8 g", "20 g", "24 g", "40 g"],
        "Toplam 11 kütle payının 3’ü karbondur.",
        "55 × 3/11 = 15 g karbon; kalan 40 g oksijendir.",
      ],
      [
        "Bir saf bileşikte X/Y kütle oranı 2/3’tür. 20 g bileşikte Y kaç g’dır?",
        "12 g",
        ["4 g", "6 g", "8 g", "18 g"],
        "Toplam pay 2 + 3’tür.",
        "Bileşik toplam 2 + 3 = 5 kütle payıdır. Y payı 3/5 olduğundan 20 × 3/5 = 12 g Y bulunur; kalan 8 g X ile toplam 20 g sağlanır.",
      ],
      [
        "Kapalı sistemde ilk toplam 30 g’dır. Tepkime sonunda 24 g ürün ve yalnız artan giren bulunuyor. Artan girenin kütlesi kaç g’dır?",
        "6 g",
        ["0 g", "12 g", "24 g", "54 g"],
        "Son karışım ürün artı artandır.",
        "30 = 24 + artan; artan 6 g. Ürün kütlesi tek başına son toplam değildir.",
      ],
      [
        "Aşağıdakilerden hangisine saf bileşikler için sabit element kütle oranı kuralı doğrudan uygulanamaz?",
        "Farklı derişimlerde hazırlanabilen tuzlu su karışımına",
        ["Saf H₂O’ya", "Saf CO₂’ye", "Saf NaCl’ye", "Saf MgO’ya"],
        "Bileşik ile karışımı ayır.",
        "Tuzlu suyun tuz/su oranı değişebilir. Sabit oran belirli bileşiğin element bileşimi içindir.",
      ],
      [
        "Bir saf bileşikte X’in kütlece yüzdesi %40, geri kalanı yalnız Y’dir. X/Y kütle oranı nedir?",
        "2/3",
        ["3/2", "2/5", "3/5", "1/4"],
        "100 g temelinde düşün.",
        "100 g bileşikte 40 g X ve 60 g Y vardır; 40/60 = 2/3.",
      ],
    ],
  },
  {
    id: "sinirlayici-artan-madde",
    minutes: 45,
    objectives: [
      "Tarif katsayıları tüketimi belirler",
      "Mümkün ürün miktarını iki yoldan bul",
      "Artan ile tüketileni ayrı kaydet",
      "Tam oranlı karışımda iki giren de biter",
    ],
    sections: [
      {
        title: "Tarif katsayıları tüketimi belirler",
        paragraphs: [
          "Bir ürünün belirli bileşimde oluşması için girenlerin uygun oranda tüketilmesi gerekir. FeS için Fe/S kütle oranı 7/4 verilmişse her 7 g Fe, 4 g S ile birleşir. Bu oran tepkimenin “tarifi”dir; elindeki toplam demir ve kükürt miktarı bu tarife kaç kez uyulabileceğini belirler.",
          "Önce daha küçük görünen gram değerini seçmek doğru yöntem değildir. 7 g demir ile 5 g kükürtte demir sınırlayıcıdır; gram olarak daha küçük kükürt yine de artar. Karşılaştırılması gereken ham kütle değil, her girenin tarifteki kendi gereksinimine bölünmüş miktarıdır.",
        ],
      },
      {
        title: "Mümkün ürün miktarını iki yoldan bul",
        paragraphs: [
          "Her gireni tek başına tamamen tüketilmiş varsayarak oluşturabileceği en fazla ürünü hesapla. Gerçekte küçük ürün kapasitesi sınırdır, çünkü daha fazlası için gereken girenlerden biri tükenmiştir. Bu işlem tepkimenin tamamlandığı ve hedef ürün dışında yan tepkime olmadığı modelinde kullanılır.",
          "FeS tarifinde 14 g Fe iki tarif, 12 g S üç tarif sağlar. Gerçek ilerleme iki tarifle sınırlıdır; 14 g Fe ve 8 g S tüketilir. 22 g FeS oluşur, 4 g S artar. Büyük kapasitenin tamamını ürün saymak, eksik gireni yoktan üretmek anlamına gelir.",
        ],
      },
      {
        title: "Artan ile tüketileni ayrı kaydet",
        paragraphs: [
          "Bir girenin artan kütlesi başlangıç eksi tüketilen kütledir. Tüketilen miktar da ortak tepkime ilerlemesi ile o girenin tarif katsayısının çarpımıdır. Bu ayrım hem tablolarda hem kütle grafiğinde başlangıç değerini yanlış yerde kullanmayı önler.",
          "Artan madde ürün değildir ve kimyasal kimliği değişmemiş olabilir. Bir karışımı filtrelemek gibi ayırma işlemleri sonra yapılabilir; hesapta henüz yapılmamış bir ayırmayı varsayma. Soruda “son karışım”, “saf ürün” veya “artan giren” denmesi farklı büyüklükler istediğini gösterir.",
        ],
      },
      {
        title: "Tam oranlı karışımda iki giren de biter",
        paragraphs: [
          "Başlangıç oranı tam tarife uyduğunda iki giren birlikte tükenir. Fe/S = 7/4 olan 21 g Fe ve 12 g S buna örnektir. Bu durumda artan giren yoktur; birini keyfî olarak “fazla” ilan etmek doğru değildir. Model bunu tam oranlı karışım diye ayrı etiketler.",
          "İki madde aynı gramda verilmişse de tam oranlı oldukları çıkmaz. Eşit gramlar ancak tarifteki kütle gereksinimleri eşitse uyumludur. Önce oranı incele, sonra “her ikisi biter” sonucunu kur. Ölçüm belirsizliği içermeyen sorularda tam eşitlik hesaplanabilir; gerçek deneyde ölçüm hatası ayrıca değerlendirilir.",
        ],
      },
      {
        title: "Katsayı bir mol oranıysa gramla doğrudan çarpma",
        paragraphs: [
          "Denklemdeki 2H₂ + O₂ → 2H₂O katsayıları tanecik ve mol oranıdır. H₂ = 2, O₂ = 32, H₂O = 18 g/mol iken kütle tarifi 4 g H₂ + 32 g O₂ → 36 g H₂O olur. Katsayı 2 diye iki gram hidrojen her durumda yeterli değildir.",
          "Mol kütleleri kullanılarak n = m/M ile her girenin molünü bulup n/katsayı değerlerini karşılaştırabilirsin. En küçük değer ilerlemeyi sınırlar. Böylece aynı yöntem hem verilen gram tariflerinde hem dengelenmiş denklemde çalışır; yalnız kullanılan nicelik ve birim açık olmalıdır.",
        ],
      },
      {
        title: "Tepkime ilerlemesini aşama aşama izle",
        paragraphs: [
          "Tamamlanmadan önce modelde bütün maddeler bir arada bulunabilir. İlerleme kesri yarımken son durumda tüketilecek miktarın yarısı tüketilmiştir. Bu, gerçek tepkime hızının sabit olduğu anlamına gelmez; yalnız başlangıç ile son arasında madde hesabını görselleştiren bir parametredir.",
          "Örneğin son durumda 22 g FeS oluşacaksa yarı ilerlemede 11 g FeS bulunur. Başlangıç 14 g Fe ve 12 g S ise bu anda 7 g Fe ile 8 g S kalır. Toplam 7 + 8 + 11 = 26 g’dır. Sıfıra ulaşmayan bir çizgiyi “hiç tepkimeye girmedi” diye yorumlama.",
        ],
      },
      {
        title: "Sınırlayıcı madde eklemek neyi değiştirir?",
        paragraphs: [
          "Tepkime tamamlandıktan sonra yalnız artan maddeden biraz daha eklemek, öteki giren yoksa yeni hedef ürün oluşturmaz. Buna karşılık tükenen giren eklenirse artanla tepkimeye girebilir. Yeni hesap başlangıcı eski artan ile yeni eklenen maddenin toplamıdır; eski ürünü yeniden giren sayma.",
          "Birden fazla ekleme sorusunda her aşamanın sonunu ayrı tabloya yaz. İlk karışımın oranını bütün eklemelere sabit uygulamak yerine her adımda hangi maddenin elde kaldığını izle. Amaç çok işlem yapmak değil, madde hikâyesini doğru sırayla kurmaktır.",
        ],
      },
      {
        title: "Hesabı korunma ve oranla sınavdan geçir",
        paragraphs: [
          "Sonuçtaki ürün, tüketilen girenlerin toplamına eşit olmalıdır; son karışım ise başlangıç toplamına eşittir. Ayrıca tüketilen Fe/S oranı 7/4 olmalıdır. Bu iki kontrol aynı anda sağlanmıyorsa yanlış kapasiteyi seçmiş veya artanı ürüne katmış olabilirsin.",
          "Bir soru verim yüzdesi, saflık veya farklı ürünler içeriyorsa bunlar ayrıca modele eklenir. Buradaki tam tepkime hesapları bunların verilmediği basit modele aittir. Tüm tepkimelerin FeS gibi tek ürün verdiğini varsayma; verilen dengelenmiş denklem ve koşullar kararını yönetir.",
        ],
      },
      {
        title: "Ürün platosunu ve ters soruyu çöz",
        paragraphs: [
          "Aynı sabit miktarda saf X’e ayrı denemelerde Y ekleniyor ve tek saf ürün oluşuyor: 2 g Y ile 6 g, 4 g Y ile 12 g, 6 g Y ile yine 12 g ürün ölçülüyor. Tam ve yan tepkimesiz modelde ilk artış Y’nin o aşamada tüketildiğini gösterir: 6 − 2 = 4 g X, yani X/Y = 2/1. Ürün 12 g’da plato yaptığında X tükenmiştir; 4 g Y ve 8 g X ürüne katılır. Son denemede 6 − 4 = 2 g Y artar. Bu eksen Y ekleme miktarıdır; gerçek tepkime zamanı değildir.",
          "Ürün miktarından geriye de gidebilirsin: başlangıçta 16 g X ve 8 g Y olsun; Y’nin tamamen bittiği ve yalnız 22 g ürün oluştuğu verilsin. Üründeki X = 22 − 8 = 14 g, tüketilen X/Y = 14/8 = 7/4 ve artan X = 2 g bulunur. Birden çok ürün veya verimi düşüren kayıp varsa tek ürün tartımı bu hesabı tek başına belirlemez. Ürün verim yüzdesi de yan tepkime ve kayıp nedenleri bilinmeden bütün artan miktarlarını otomatik belirleyen bilgi değildir.",
        ],
        table: {
          headers: ["Ayrı denemedeki Y", "Ürün", "Yorum"],
          rows: [
            ["2 g", "6 g", "Y sınırlayıcı; X henüz bitmez."],
            ["4 g", "12 g", "Tam oranlı eşik; X ve Y tükenir."],
            ["6 g", "12 g", "X sınırlar; 2 g Y artar."],
          ],
        },
      },
    ],
    examples: [
      {
        title: "Gramca büyük olan sınırlayıcı olabilir",
        prompt:
          "Fe/S tüketim kütle oranı 7/4’tür. 14 g Fe ile 12 g S tam tepkimeye giriyor. Ne oluşur, ne artar?",
        strategy: "Her girenin tarif kapasitesini karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Fe kapasitesi 14/7 = 2; S kapasitesi 12/4 = 3 bulunur.",
          },
          {
            label: "2. adım",
            explanation: "Küçük kapasite 2; 14 g Fe ve 8 g S tüketilir.",
          },
          {
            label: "3. adım",
            explanation: "22 g FeS oluşur ve 12 − 8 = 4 g S artar.",
          },
        ],
        answer: "22 g FeS; 4 g S artar",
        check: "22 + 4 = 14 + 12 = 26 g.",
        pitfall: "Kükürdün gramı küçük diye onu sınırlayıcı seçme.",
      },
      {
        title: "Tam oranlı karışım",
        prompt:
          "Fe/S kütle oranı 7/4 iken 21 g Fe ve 12 g S kullanılıyor. Artan madde var mıdır?",
        strategy: "İki kapasitenin eşitliğini denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Fe için 21/7 = 3 tarif bulunur.",
          },
          {
            label: "2. adım",
            explanation: "S için 12/4 = 3 tarif bulunur.",
          },
          {
            label: "3. adım",
            explanation: "İkisi birlikte tükenir; 21 + 12 = 33 g FeS oluşur.",
          },
        ],
        answer: "Artan yok; 33 g FeS",
        check: "Tüketilen oran 21/12 = 7/4.",
        pitfall: "Eşit kapasiteyi tek bir artan madde varmış gibi etiketleme.",
      },
      {
        title: "Denklemden kütle tarifine",
        prompt:
          "2H₂ + O₂ → 2H₂O; mol kütleleri 2, 32, 18 g/mol. 6 g H₂ ile 32 g O₂ için su ve artan nedir?",
        strategy: "Önce gramları mollere çevir.",
        steps: [
          {
            label: "1. adım",
            explanation: "H₂ 6/2 = 3 mol; O₂ 32/32 = 1 mol olur.",
          },
          {
            label: "2. adım",
            explanation: "Kapasiteler 3/2 = 1,5 ve 1/1 = 1; O₂ sınırlayıcıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "2 mol su, yani 36 g oluşur. H₂’den 2 mol = 4 g tüketilir, 2 g artar.",
          },
        ],
        answer: "36 g H₂O; 2 g H₂ artar",
        check: "36 + 2 = 6 + 32 = 38 g.",
        pitfall: "Mol katsayısını doğrudan gram katsayısı sanma.",
      },
      {
        title: "İkinci ekleme",
        prompt:
          "İlk aşama sonunda 4 g S ve ürün FeS vardır; Fe kalmamıştır. Fe/S = 7/4 kütle oranına göre 7 g Fe eklenirse kaç g ek FeS oluşur?",
        strategy: "Eski ürünü koru; yalnız kalan girenleri eşleştir.",
        steps: [
          {
            label: "1. adım",
            explanation: "Eldeki yeni girenler 7 g Fe ve 4 g S’dir.",
          },
          {
            label: "2. adım",
            explanation:
              "Bu iki kütle tam bir tarif oluşturur ve ikisi tüketilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Ek ürün 7 + 4 = 11 g FeS olur; önceki ürün bu miktara dahil değildir.",
          },
        ],
        answer: "11 g ek FeS",
        check: "Yeni eklenen Fe ile eski artanın toplamı 11 g.",
        pitfall:
          "“Ek ürün” ile önceki ürünün de dahil olduğu toplamı karıştırma.",
      },
    ],
    recall: [
      {
        prompt: "Sınırlayıcı madde gramca en az olan mıdır?",
        answer:
          "Hayır; gereksinim katsayısına göre en küçük ürün kapasitesini sağlayandır.",
      },
      {
        prompt: "Artan nasıl bulunur?",
        answer: "Başlangıç miktarı − tüketilen miktar.",
      },
      {
        prompt: "İki giren ne zaman birlikte biter?",
        answer: "Başlangıç oranı tam stokiyometrik tarife uyduğunda.",
      },
      {
        prompt: "Artan maddeden daha fazla eklemek tek başına ürün verir mi?",
        answer:
          "Diğer gerekli giren kalmadıysa vermez; modelin gerektirdiği tüm girenler bulunmalıdır.",
      },
    ],
    source:
      "MEBİ TYT Kimya Konu Özetleri PDF 61–62; OGM 10. Sınıf Dersler Cepte, Kimyanın Temel Kanunları PDF 13–15 doğrudan incelendi. Tek ürün, tam tepkime ve verilen kütle oranı varsayımlarıyla özgün alıştırmalar. Aurelia TYT Kimya 031 (iki sürüm) kopya kağıdı, canlı Drive’dan yeniden indirilerek ilgili öğretim ve çözüm sayfaları doğrudan karşılaştırıldı; resmî soru metni veya anahtar aktarılmadı.",
    title: "Sınırlayıcı madde ve artan madde",
    topic: "detail-169",
    items: [
      [
        "Fe/S tüketim kütle oranı 7/4’tür. 14 g Fe ve 12 g S’den en fazla kaç g FeS oluşur?",
        "22 g",
        ["14 g", "18 g", "26 g", "33 g"],
        "İki tarif kapasitesinin küçüğünü kullan.",
        "14/7 = 2, 12/4 = 3; iki tarif için ürün 2 × 11 = 22 g.",
      ],
      [
        "Fe/S tüketim kütle oranı 7/4’tür. 14 g Fe ve 12 g S tam tepkimeye girince ne artar?",
        "4 g S",
        ["4 g Fe", "2 g S", "8 g Fe", "Hiçbir madde artmaz."],
        "14 g Fe’nin kaç g S gerektirdiğini bul.",
        "14 g Fe 8 g S tüketir. 12 − 8 = 4 g S kalır.",
      ],
      [
        "Fe/S tüketim kütle oranı 7/4’tür. 17,5 g Fe ve 8 g S’den en fazla kaç g FeS oluşur?",
        "22 g",
        ["19 g", "25,5 g", "27,5 g", "33 g"],
        "S miktarı iki tarif sağlar.",
        "8/4 = 2 tarif; 14 g Fe ile 8 g S tüketilir. Ürün 22 g; 3,5 g Fe artar.",
      ],
      [
        "Fe/S tüketim kütle oranı 7/4’tür. Hangi başlangıç karışımı ikisinin de artmadan tükenmesini sağlar?",
        "21 g Fe ve 12 g S",
        [
          "7 g Fe ve 7 g S",
          "14 g Fe ve 4 g S",
          "7 g Fe ve 12 g S",
          "28 g Fe ve 8 g S",
        ],
        "Fe kütlesini 7’ye, S kütlesini 4’e böl.",
        "21/7 = 12/4 = 3. Diğer seçeneklerde kapasiteler eşit değildir.",
      ],
      [
        "2H₂ + O₂ → 2H₂O. H₂ = 2, O₂ = 32 g/mol. 6 g H₂ ile 32 g O₂ için sınırlayıcı hangisidir?",
        "O₂",
        [
          "H₂",
          "İkisi aynı anda tükenir.",
          "Ürün H₂O",
          "Mol kütleleri verilse de belirlenemez.",
        ],
        "Mol miktarını denklem katsayısına böl.",
        "H₂ 3 mol, O₂ 1 mol; 3/2 > 1/1 olduğundan O₂ önce tükenir.",
      ],
      [
        "X/Y tüketim kütle oranı 2/3; tek ürün XY’dir. 10 g X ve 9 g Y tam tepkimeye girerse son karışımda kaç g X kalır?",
        "4 g",
        ["0 g", "1 g", "6 g", "10 g"],
        "9 g Y için gereken X’i bul.",
        "9 g Y 6 g X tüketir; 10 − 6 = 4 g X kalır. Ürün 15 g olur.",
      ],
      [
        "X/Y tüketim kütle oranı 2/3; tek ürün oluşuyor. Başlangıç 10 g X ve 9 g Y. Tepkime sonunda yalnız artan X’e 3 g Y ekleniyor. Kaç g ek ürün oluşur?",
        "5 g",
        ["2 g", "3 g", "7 g", "9 g"],
        "İlk aşamada kalan X 4 g’dır.",
        "Yeni 3 g Y, kalan X’in 2 g’ını tüketir ve 5 g ek ürün verir. 2 g X yine artar.",
      ],
      [
        "Fe/S tüketim kütle oranı 7/4. Başlangıç 14 g Fe ve 12 g S. Tam tepkimenin yarısı kadar ilerleme olduğunda FeS 11 g’dır. Fe ve S sırasıyla kaç g kalır?",
        "7 g Fe ve 8 g S",
        [
          "7 g Fe ve 6 g S",
          "0 g Fe ve 4 g S",
          "14 g Fe ve 1 g S",
          "3 g Fe ve 12 g S",
        ],
        "11 g FeS için 7 g Fe ve 4 g S gerekir.",
        "14 − 7 = 7 g Fe; 12 − 4 = 8 g S. Toplam 7 + 8 + 11 = 26 g korunur.",
      ],
      [
        "Fe ile S tepkimesi sonunda Fe tamamen tükenmiş, S artmıştır. Yalnız daha çok S eklenirse, başka işlem yokken ek FeS için hangisi doğrudur?",
        "Fe bulunmadığı için ek FeS oluşmaz.",
        [
          "Eklenen bütün S FeS olur.",
          "Mevcut FeS kütlesi iki katına çıkar.",
          "S kendi kendine Fe atomlarına dönüşür.",
          "Artan S anında yok olur.",
        ],
        "Ürünün gerektirdiği ikinci elementi kontrol et.",
        "FeS için Fe de gerekir; daha fazla artan giren tek başına eksik elementi sağlayamaz.",
      ],
      [
        "Tam tepkimede X tamamen bitiyor, Y artıyor. Son ürünün kütlesi hangisine eşittir? Tek ürün var ve sistem kapalıdır.",
        "Tüketilen X ile tüketilen Y kütlelerinin toplamına",
        [
          "Başlangıçtaki bütün Y kütlesine",
          "Artan Y kütlesine",
          "Her durumda başlangıç toplamına",
          "Yalnız tüketilen X kütlesine",
        ],
        "Artan madde ürüne katılmamıştır.",
        "Ürün, gerçekten tüketilen girenlerden oluşur. Başlangıç toplamı ürün + artan Y’ye eşittir.",
      ],
    ],
  },
  {
    id: "katli-oranlar",
    minutes: 45,
    objectives: [
      "Aynı iki element, farklı bileşim",
      "Referans elementi sabit tut",
      "Eşitleme bir örnek büyütmesidir",
      "Birinci bölü ikinci yönünü yaz",
    ],
    sections: [
      {
        title: "Aynı iki element, farklı bileşim",
        paragraphs: [
          "Katlı oranlar, aynı iki elementin oluşturduğu farklı bileşimli bileşikleri karşılaştırır. Elementlerden birinin kütlesi eşitlendiğinde diğeriyle birleşen kütleler küçük tam sayılarla ifade edilebilen oranlar verir. Önce koşulları denetlemek, ardından oran kurmak gerekir.",
          "CO ve CO₂ aynı C ve O elementlerini içerir; bir C başına O sayısı farklıdır. CO₂ ve SO₂ ise ortak oksijen içerse de aynı iki elementten oluşmaz. İkinci çift için bu okul düzeyi karşılaştırmayı uygulamak, karbon ile kükürdü aynı elementmiş gibi saymak olur.",
        ],
      },
      {
        title: "Referans elementi sabit tut",
        paragraphs: [
          "CO ve CO₂’yi C = 12, O = 16 atom kütleleriyle karşılaştır. CO’da 12 g C’ye 16 g O, CO₂’de 12 g C’ye 32 g O karşılık gelir. Karbon kütleleri zaten eşit olduğundan oksijen kütleleri oranı CO/CO₂ sırasıyla 16/32 = 1/2’dir.",
          "Soruda oksijenler eşitlenirse karşılaştırılan nicelik değişir. 32 g O için CO’da 24 g C, CO₂’de 12 g C gerekir; karbon oranı bu kez 2’dir. “Katlı oran kaç?” sorusunun cevabı hangi elementin eşitlendiğine ve hangi bileşiğin paya yazıldığına bağlıdır.",
        ],
      },
      {
        title: "Eşitleme bir örnek büyütmesidir",
        paragraphs: [
          "Bir formülü ikiyle çarparak 2 CO yazmak, CO₂ adlı başka bir bileşik oluşturmak değildir. Bu yalnız karşılaştırmada iki CO birimi aldığını anlatır; toplam C ve O sayıları aynı katsayıyla büyür. Tepkime gerçekleştiği bilgisi yoksa formülleri eşitleme işlemi kimyasal dönüşüm sayılmaz.",
          "C₂O₂ biçimindeki karşılaştırma toplamı CO ile aynı C/O oranına sahiptir. Ama iki CO’nun toplamını tek bir molekülün yapısı diye yorumlayamazsın. Tanecik sayısını, formüldeki alt indisi ve örneği ölçekleyen dış katsayıyı üç ayrı anlam olarak okumak bu ayrımı korur.",
        ],
      },
      {
        title: "Birinci bölü ikinci yönünü yaz",
        paragraphs: [
          "Oran sorularında önce bir satırla neyi böldüğünü belirt: “eşit C kütlesine karşılık O(I)/O(II)”. Böylece CO/CO₂ ile CO₂/CO cevaplarının ters olduğunu unutmazsın. Eşitleme kütlesini iki katına çıkarmak her iki karşılığı iki kat yapar, son oranı değiştirmez.",
          "İlk örnekte 6 g C temel alırsan O miktarları 8 ve 16 g olur; yine 1/2 bulunur. Sorudaki örnek kütlelerinin eşit olması ise elementlerden birinin eşit olduğu anlamına gelmez. Eşit toplam bileşik kütlesi yerine doğru element payını eşitlemelisin.",
        ],
      },
      {
        title: "Kütle verilerinden oran bul",
        paragraphs: [
          "Formüller verilmediğinde her örnekte seçilen element başına diğerinin kütlesini bulabilirsin. I’de 3 g X ile 4 g Y, II’de 6 g X ile 16 g Y birleşmişse I’i iki katına getir: 6 g X’e 8 g Y. II’de aynı X’e 16 g Y vardır; Y(I)/Y(II) = 1/2.",
          "Burada başlangıçtan artan maddeler değil, saf bileşikte gerçekten bulunan kütleler gerekir. Artanı hesaba katmak sabit bileşimi bozar. Kütlelerden doğrudan atom oranı çıkarmak istersen atom kütlelerini de bilmelisin; katlı karşılaştırmanın bu adımıysa aynı elementler olduğundan bunlar oran içinde sadeleşebilir.",
        ],
      },
      {
        title: "Aynı basit oran, farklı molekül büyüklüğü",
        paragraphs: [
          "NO₂ ile N₂O₄ aynı N/O basit oranına sahiptir: 1/2. Eşit N kütlesine karşılık O kütleleri de eşit olur; oran 1 çıkar. Bu çift farklı molekül büyüklüklerine sahip olsa da okul düzeyindeki farklı basit bileşim örneği olarak kullanılmaz.",
          "Bu sonuç “iki madde aynı formüle sahip” demek değildir. Molekül formülü ile en sade element oranı farklı düzeylerde bilgidir. Katlı oran sorusunun aradığı bileşim farkını, moleküler özelliklerin bütün farklarıyla eşitleme. Bir oran 1 çıktığında ilk iş örneklerin en sade oranlarını kontrol etmektir.",
        ],
      },
      {
        title: "Formül tahmininde eksik bilgiyi gör",
        paragraphs: [
          "Bir çiftin katlı oranı biliniyor diye her iki kesin molekül formülü tek başına belirlenmez. Bir referans formül veya ek bileşim bilgisi gerekir. Örneğin eşit X için II’nin Y miktarı I’in iki katıysa Y/X oranının ikiye katlandığı bilinir; mutlak X ve Y alt indisleri henüz bilinmeyebilir.",
          "Bir formül önerisi sorulduğunda verilen referansı açıkça kullan. I = XY ve II’de Y/X iki katı denirse II için en sade oran XY₂ olur. Bunun tam molekül formülü olduğunu söylemek için molekül büyüklüğünü belirleyen ek veri gerekebilir; sorunun “basit formül” ifadesini atlama.",
        ],
      },
      {
        title: "Üç farklı oranı birlikte denetle",
        paragraphs: [
          "Atom oranı aynı formül içindeki atom sayılarını, sabit kütle oranı tek bileşiğin element kütlelerini, katlı oran ise iki bileşikte eşit referansa karşılık diğer elementin kütlelerini karşılaştırır. Bunları isimleriyle birlikte yazmak hangi adımda atom kütlesi gerekeceğini görünür kılar.",
          "Sonucu denetlerken önce aynı iki element koşulunu, sonra farklı basit bileşimi, ardından eşitlenen elementi ve oran yönünü kontrol et. Bu sırayla ilerlemek çoğu çeldiriciyi işlem yapmadan eler. Küçük tam sayı oranı kimyasal bileşim modelinin sonucudur; ölçümleri keyfî yuvarlayıp istediğin orana uydurmak değildir.",
        ],
      },
      {
        title: "Bilinmeyen kütlede önce ortak ölçeği çöz",
        paragraphs: [
          "I bileşiğinde 4 g X ile 6 g Y; II bileşiğinde 12 g X ile z g Y bulunsun. Eşit X için Y(I)/Y(II) = 2/3 verilsin. Önce II’yi 4 g X temeline getir: bu ölçekte Y miktarı z/3’tür. 6 / (z/3) = 2/3 denkleminden z/3 = 9 ve z = 27 g bulunur. Denetim: I için Y/X = 6/4, II için 27/12; bu iki oranı bölmek 2/3 verir. 9 g, eşitlenmiş örneğe aittir; asıl II örneğinin 27 g’ı yerine yazılmaz.",
          "Formülden verilen bir başka çift XY₂ ile X₂Y₃ olsun. X sayısı 2’de eşitlenince iki XY₂ ile bir X₂Y₃ karşılaştırılır ve Y(I)/Y(II) = 4/3 olur. Y sayısı 6’da eşitlenince üç XY₂ ile iki X₂Y₃ karşılaştırılır; bu kez X(I)/X(II) = 3/4 çıkar. Bileşik sırası aynı kalıp eşitlenen element değiştiğinde bu iki oran birbirinin tersidir. Her iki işlemde de maddelerin kimliği korunur; yalnız karşılaştırma için alınan örnek miktarı değişir.",
        ],
      },
    ],
    examples: [
      {
        title: "Eşit karbon temelinde",
        prompt:
          "C = 12, O = 16. CO ve CO₂’de eşit karbon kütlesine karşılık oksijen kütlelerinin CO/CO₂ oranı nedir?",
        strategy: "Birer formül miktarı zaten eşit C içerir.",
        steps: [
          {
            label: "1. adım",
            explanation: "CO için 12 g C’ye 16 g O karşılık gelir.",
          },
          {
            label: "2. adım",
            explanation: "CO₂ için 12 g C’ye 32 g O karşılık gelir.",
          },
          {
            label: "3. adım",
            explanation: "O(CO)/O(CO₂) = 16/32 = 1/2 olur.",
          },
        ],
        answer: "1/2",
        check: "6 g C temelinde 8/16 da aynı sonucu verir.",
        pitfall: "Oranı ters sırada yazarsan 2 bulursun.",
      },
      {
        title: "Eşit oksijen temelinde",
        prompt:
          "CO ile CO₂’de oksijen kütleleri 32 g olarak eşitleniyor. C = 12, O = 16. C(CO)/C(CO₂) kaçtır?",
        strategy: "Bu kez karbonu karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation: "CO’da 16 g O’ya 12 g C; 32 g O’ya 24 g C gerekir.",
          },
          {
            label: "2. adım",
            explanation: "CO₂’de 32 g O’ya 12 g C karşılık gelir.",
          },
          {
            label: "3. adım",
            explanation: "Karbon oranı 24/12 = 2 bulunur.",
          },
        ],
        answer: "2",
        check:
          "Birinci örneğin referans elementi değiştiği için sonuç aynı olmak zorunda değildir.",
        pitfall:
          "Eşitlenen elementin kütlelerini birbirine bölmek her zaman 1 verir; istenen diğeridir.",
      },
      {
        title: "Verilen kütleler farklıysa",
        prompt:
          "I saf bileşiği 3 g X ve 4 g Y; II saf bileşiği 6 g X ve 16 g Y içeriyor. Eşit X için Y(I)/Y(II) nedir?",
        strategy: "I örneğini ortak X miktarına büyüt.",
        steps: [
          {
            label: "1. adım",
            explanation: "I’in tüm kütlelerini ikiyle çarp: 6 g X ve 8 g Y.",
          },
          {
            label: "2. adım",
            explanation: "II zaten 6 g X ve 16 g Y içeriyor.",
          },
          {
            label: "3. adım",
            explanation: "Y oranı 8/16 = 1/2 bulunur.",
          },
        ],
        answer: "1/2",
        check: "Birim X başına Y oranları 4/3 ve 16/6; bölümleri yine 1/2.",
        pitfall:
          "İlk 4 g ile 16 g’ı eşitlemeden karşılaştırmak 1/4 yanılgısıdır.",
      },
      {
        title: "Farklı molekül ama aynı basit bileşim",
        prompt:
          "NO₂ ile N₂O₄ için eşit N kütlesine karşılık O oranını inceleyin.",
        strategy: "Formüllerin en sade N/O oranını karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation: "NO₂ için N/O = 1/2’dir.",
          },
          {
            label: "2. adım",
            explanation:
              "N₂O₄ için 2/4 = 1/2; NO₂ örneği ikiyle ölçeklenince sayılar eşitlenir.",
          },
          {
            label: "3. adım",
            explanation:
              "Eşit N için O miktarları eşittir; oran 1’dir. Bu çift farklı basit bileşim örneği değildir.",
          },
        ],
        answer: "Oran 1; farklı basit bileşim yok",
        check: "Her iki formülde O/N = 2.",
        pitfall:
          "Molekül büyüklüğü farkını otomatik farklı basit formül sanma.",
      },
    ],
    recall: [
      {
        prompt: "Katlı oran için önce hangi koşul aranır?",
        answer:
          "Aynı iki elementten oluşan, farklı basit bileşimli bileşikler.",
      },
      {
        prompt: "CO/CO₂ için eşit C’ye karşılık O oranı nedir?",
        answer: "1/2; oran yönü CO bölü CO₂’dir.",
      },
      {
        prompt: "2 CO yazmak CO₂ üretmek midir?",
        answer:
          "Hayır; karşılaştırma için örnek miktarını büyütür, formül alt indisini değiştirmez.",
      },
      {
        prompt: "NO₂ ile N₂O₄ bu kapsamda neden elenir?",
        answer: "Basit N/O oranları aynıdır; eşit N için O oranı 1 çıkar.",
      },
    ],
    source:
      "MEBİ TYT Kimya Konu Özetleri PDF 62 (basılı 60); OGM 10. Sınıf Dersler Cepte, Kimyanın Temel Kanunları PDF 16–17 doğrudan incelendi. Özgün normalleştirme, oran yönü ve basit formül alıştırmaları. Aurelia TYT Kimya 032 kopya kağıdı, canlı Drive’dan yeniden indirilerek ilgili öğretim ve çözüm sayfaları doğrudan karşılaştırıldı; resmî soru metni veya anahtar aktarılmadı.",
    title: "Katlı oranlar: eşitle, karşılaştır, yorumla",
    topic: "detail-170",
    items: [
      [
        "CO ve CO₂ için eşit C kütlesine karşılık O(CO)/O(CO₂) oranı nedir?",
        "1/2",
        ["2", "1", "1/4", "3/2"],
        "Bir C başına oksijen sayılarını karşılaştır.",
        "Aynı C için bir ve iki O vardır. Aynı elementin atom kütlesi sadeleşir; oran 1/2 olur.",
      ],
      [
        "CO ve CO₂ için eşit O kütlesine karşılık C(CO)/C(CO₂) oranı nedir?",
        "2",
        ["1/2", "1", "1/4", "4"],
        "CO örneğini ikiyle ölçekle.",
        "2 CO ile 1 CO₂ toplam iki O içerir; karbon sayıları 2 ve 1 olduğundan oran 2’dir.",
      ],
      [
        "I bileşiği 4 g X ve 6 g Y, II bileşiği 8 g X ve 24 g Y içeriyor. Eşit X için Y(I)/Y(II) kaçtır?",
        "1/2",
        ["1/4", "2", "1", "3/4"],
        "I’de X’i 8 g’a çıkar.",
        "I iki katına alınırsa Y 12 g olur. 12/24 = 1/2.",
      ],
      [
        "Hangi çift aynı iki elementten oluşan farklı basit bileşimli bileşik örneğidir?",
        "NO ve NO₂",
        ["CO₂ ve SO₂", "NO₂ ve N₂O₄", "H₂SO₃ ve H₂SO₄", "NaCl ve KCl"],
        "Hem element türlerini hem sade oranı denetle.",
        "NO ve NO₂ aynı N/O elementlerini farklı 1:1 ve 1:2 oranlarında içerir. Diğerleri farklı element çiftleri, üç element veya aynı basit orandır.",
      ],
      [
        "NO₂ ve N₂O₄’te eşit N kütlesine karşılık O kütlelerinin oranı 1’dir. Bunun doğru yorumu nedir?",
        "Aynı basit N/O oranına sahiptirler.",
        [
          "Aynı molekül formülüne sahiptirler.",
          "Birinde oksijen yoktur.",
          "Azot atom kütlesi iki katına çıkmıştır.",
          "Kütlenin korunumu geçersizdir.",
        ],
        "2/4 oranını sadeleştir.",
        "NO₂’de 1/2, N₂O₄’te 2/4 = 1/2. Bu molekül formüllerini özdeş yapmaz.",
      ],
      [
        "X₂Y ve XY₂’de eşit X atomu sayısı için Y(X₂Y)/Y(XY₂) kütle oranı nedir?",
        "1/4",
        ["1/2", "2", "4", "1"],
        "İki XY₂ alarak X sayısını eşitle.",
        "Bir X₂Y ile iki XY₂ ikişer X içerir. Y sayıları 1 ve 4; aynı Y’nin kütle oranı 1/4’tür.",
      ],
      [
        "Bir öğrenci eşit X kütlesi için Y(I)/Y(II) = 2 buluyor. Referans X kütlesi iki katına çıkarılırsa oran ne olur?",
        "2 olarak kalır.",
        ["1 olur.", "4 olur.", "1/2 olur.", "0 olur."],
        "İki Y miktarı da aynı katsayıyla büyür.",
        "Pay ve payda birlikte iki katına çıkar; oran değişmez.",
      ],
      [
        "Karşılaştırmada “2 CO” yazılması ne anlatır?",
        "CO örneğinin iki formül miktarı alındığını",
        [
          "CO’nun kendiliğinden CO₂’ye dönüştüğünü",
          "Bir CO molekülünde iki O olduğunu",
          "Karbon atom kütlesinin iki katına çıktığını",
          "Oksijenin yok olduğunu",
        ],
        "Dış katsayı ile alt indis ayrımını koru.",
        "Dış katsayı bütün formülü ölçekler; bir CO içindeki C/O oranını değiştirmez.",
      ],
      [
        "I’in basit formülü XY’dir. Eşit X için II’deki Y miktarı I’in iki katıdır. II’nin basit formülü nedir?",
        "XY₂",
        ["X₂Y", "X₂Y₂", "XY", "X₃Y"],
        "Y/X oranını iki katına çıkar.",
        "I’de Y/X = 1; II’de 2 olur. En sade atom oranı X:Y = 1:2’dir.",
      ],
      [
        "CO₂ ve SO₂ için okul düzeyindeki iki elementli katlı oran karşılaştırmasının temel koşulu neden sağlanmaz?",
        "İki bileşiğin element çiftleri aynı değildir.",
        [
          "İkisinde de oksijen bulunur.",
          "İkisinde de iki O vardır.",
          "Bileşikler saf olabilir.",
          "Toplam kütle korunabilir.",
        ],
        "Ortak tek element bulunması yeterli midir?",
        "CO₂, C ve O; SO₂, S ve O içerir. C ile S farklı elementtir; aynı iki element koşulu yoktur.",
      ],
    ],
  },
  {
    id: "mol-tanecik-iliskisi",
    minutes: 45,
    objectives: [
      "Mol saymadan önce neyi saydığını söyle",
      "Bir örnekten varlık sayısına köprü",
      "Molekülün içindeki atomları ayrıca say",
      "İyonik bileşikte formül birimi kullan",
    ],
    sections: [
      {
        title: "Mol saymadan önce neyi saydığını söyle",
        paragraphs: [
          "Mol madde miktarının birimidir ve sayılan varlık mutlaka belirtilmelidir. Bir mol atom, bir mol molekül ve bir mol iyon aynı sayıda belirtilmiş varlık içerir; bu varlıkların kütleleri ve içerdikleri atom sayıları aynı olmak zorunda değildir. Güncel tanıma göre bir mol tam olarak 6,02214076 × 10²³ belirtilmiş varlıktır.",
          "Hesaplarda aksi verilmedikçe Nₐ için yaklaşık 6,02 × 10²³ mol⁻¹ kullanılabilir. Kesin tanım ile yuvarlatılmış hesap değerini karıştırma. “Bir mol oksijen” ifadesi O atomu mu O₂ molekülü mü dediğini açıklamıyorsa belirsizdir; uygulamada her soruda varlık adı açık yazılır.",
        ],
      },
      {
        title: "Bir örnekten varlık sayısına köprü",
        paragraphs: [
          "N = n × Nₐ bağıntısında n mol cinsinden madde miktarı, N ise belirtilmiş varlıkların sayısıdır. 0,5 mol CO₂ molekülü, 0,5 Nₐ moleküldür. Birim kontrolünde mol × mol⁻¹ sadeleşir; sonuç sayıdır, gram değildir.",
          "Sayı Nₐ katsayısı biçiminde bırakılabilir. 0,25 Nₐ ile 1,505 × 10²³ aynı yaklaşık sayıyı ifade eder; ilki mol ilişkisini daha görünür kılar. Büyük tanecik sayıları nedeniyle çizimdeki birkaç simge bire bir gerçek tanecik değildir. Diyagram temsildir; kesin miktar modelin sayısal metninde belirtilir.",
        ],
      },
      {
        title: "Molekülün içindeki atomları ayrıca say",
        paragraphs: [
          "Bir CO₂ molekülü bir C ve iki O atomu içerir. Bu yüzden n mol CO₂ molekülünde n mol C atomu, 2n mol O atomu ve toplam 3n mol atom bulunur. Toplam atom sayısı istenirse 3n ile Nₐ çarpılır; molekül sayısı istenirse yalnız n ile çarpılır.",
          "Birbirine bağlı atomları saymak kimyasal bağları koparmak anlamına gelmez. CO₂ içinde oksijen atomlarının bulunması, örnekte serbest O₂ molekülü bulunduğunu kanıtlamaz. “İçerdiği O atomu” ile “serbest oksijen gazı” farklı varlıklardır; her soruda isimlere geri dön.",
        ],
      },
      {
        title: "İyonik bileşikte formül birimi kullan",
        paragraphs: [
          "NaCl ve Ca(OH)₂ gibi iyonik katılar ayrık moleküllerden oluşmuş gibi sayılmaz. Formül birimi, kristaldeki iyonların en sade oranını gösteren sayım birimidir. Bir mol Ca(OH)₂ formül birimi için bir mol Ca, iki mol O ve iki mol H atomu bileşimde bulunur.",
          "Formüldeki atomları saymak bileşikte serbest nötr atomların bulunduğu iddiası değildir. Kristalde Ca²⁺ ve OH⁻ iyonları vardır; element bileşimini atom sayısı olarak ifade etmek başka, hareketli iyon sayısını hesaplamak başkadır. Diyagramın model birimi ile gerçek örgünün yapısı bu nedenle ayrı açıklanır.",
        ],
      },
      {
        title: "Parantez dışındaki alt indis tüm gruba uygulanır",
        paragraphs: [
          "Ca(OH)₂ yazımında parantez sonundaki 2, hem O hem H sayısını ikiyle çarpar. Toplam bir Ca, iki O ve iki H, yani beş atom vardır. Al₂(SO₄)₃ için iki Al, üç S ve on iki O, toplam on yedi atom bulunur.",
          "Dıştaki örnek katsayısı bundan da ayrıdır: 2 Ca(OH)₂ iki formül birimini anlatır ve toplam Ca sayısı iki, O dört, H dört olur. Parantez çarpanını yalnız son harfe uygulamak veya dış katsayıyla alt indisi birbirine katmak sık görülen iki ayrı hatadır. Önce tek birimi aç, sonra örnek miktarıyla çarp.",
        ],
      },
      {
        title: "İyon sayısı için ayrışma koşulunu açık kur",
        paragraphs: [
          "Yeterince seyreltik sulu çözeltide çözündüğü ve tamamen ayrıştığı varsayılan Ca(OH)₂ için Ca(OH)₂ → Ca²⁺ + 2 OH⁻ yazılır. Çözünen n mol formül miktarı n mol Ca²⁺ ve 2n mol OH⁻, toplam 3n mol iyon verir. Gerçek çözünürlük sınırı bu varsayımdan ayrı bir sorudur.",
          "OH⁻ tek bir çok atomlu iyondur; içindeki O ve H’yi ayrı iyon diye sayma. Tam ayrışma denklemi her moleküler maddeye uygulanmaz: örneğin suda çözünen şekerin tamamı iyonlara dönüşmez. Katı örneğin miktarını doğrudan “çözeltideki iyon” sayısına çevirmek için çözünme ve ayrışma bilgisi gerekir.",
        ],
      },
      {
        title: "Yük bilançosu, tanecik sayısı değildir",
        paragraphs: [
          "Bir mol Ca²⁺ ile iki mol OH⁻ toplam üç mol iyondur. Fakat yükleri +2 ve −1 olduğundan toplam yük +2 − 2 = 0’dır. İyonların sayısı üç, net yükün sıfır olması çelişki değildir; farklı nicelikler sayılır.",
          "Elektron sayısı sorulursa atom numarası ve iyon yükü ayrıca gereklidir. Pozitif iyon elektron kaybetmiştir; negatif iyon elektron kazanmıştır. Proton sayısı element kimliğini korur. Bu ünitedeki atom bileşimi hesabına, verilmemiş atom numaralarını veya nötr atom elektron sayısını sessizce ekleme.",
        ],
      },
      {
        title: "Çok adımlı sayımı tek soruyla kontrol et",
        paragraphs: [
          "Önce verilen miktarın hangi varlığa ait olduğunu yaz, sonra istenen varlığa her birim başına kaç tane düştüğünü bul. Son olarak mol isteniyorsa bu katsayıyla, tane isteniyorsa ayrıca Nₐ ile çarp. Böylece birim dönüşümü ile kimyasal sayımı iki ayrı adımda yapmış olursun.",
          "Kontrolde formüldeki atom toplamını ve varsa iyon yüklerinin toplamını kullan. 0,25 mol Ca(OH)₂ için toplam atom miktarı 1,25 mol; tam ayrışma varsayımında toplam iyon miktarı 0,75 moldür. Bunların farklı olması gerekir: bir OH⁻ iyonu iki atom içerdiği için atom ve iyon sayımları aynı sonuç vermez.",
        ],
      },
      {
        title: "Karışımda toplam ve hedef atom denklemini ayır",
        paragraphs: [
          "Daha çok molekül her zaman daha çok hedef atom demek değildir. 0,20 mol CO₂ ile 0,30 mol CO karşılaştırılırsa molekül miktarı CO’da daha fazladır; O atomu miktarı ise CO₂ için 0,40 mol, CO için 0,30 moldür. Karışımda her bileşenin hedef atom katkısını kendi alt indisiyle hesaplayıp sonra topla. NH₃ ile H₂O karışımında bütün moleküllere tek bir H çarpanı uygulayamazsın; ilki üç, ikincisi iki H atomu içerir.",
          "CO/CO₂ karışımının toplamı 1,00 mol ve içerdiği O atomu miktarı 1,40 mol olsun. x mol CO₂ seçersen CO miktarı 1,00 − x olur. O denklemi 2x + (1,00 − x) = 1,40; buradan x = 0,40 mol CO₂ ve 0,60 mol CO çıkar. Geri kontrol: 0,80 + 0,60 = 1,40 mol O. Yalnız toplam 1,00 mol verilseydi bileşim tek değere inmezdi. Bu karışımda O atomu miktarı toplam molün bir ile iki katı arasında olmalıdır; sınır dışı veri varsayımlarla tutarsızdır.",
        ],
      },
    ],
    examples: [
      {
        title: "Molekül ile atomu ayır",
        prompt:
          "0,5 mol CO₂ molekülünde molekül, O atomu ve toplam atom sayısını Nₐ cinsinden bulun.",
        strategy: "Önce tek molekülün içeriğini yaz.",
        steps: [
          {
            label: "1. adım",
            explanation: "Her CO₂ bir C ve iki O, toplam üç atom içerir.",
          },
          {
            label: "2. adım",
            explanation:
              "Molekül sayısı 0,5 Nₐ; O atomu sayısı 2 × 0,5 Nₐ = 1 Nₐ olur.",
          },
          {
            label: "3. adım",
            explanation: "Toplam atom sayısı 3 × 0,5 Nₐ = 1,5 Nₐ bulunur.",
          },
        ],
        answer: "0,5 Nₐ molekül; 1 Nₐ O atomu; 1,5 Nₐ toplam atom",
        check: "C atomları 0,5 Nₐ; O ile toplam 1,5 Nₐ.",
        pitfall: "O atomu sayısını serbest O₂ molekülü sayısı sanma.",
      },
      {
        title: "Parantezli formül birimi",
        prompt:
          "0,25 mol Ca(OH)₂ formül biriminde Ca, O, H ve toplam atom miktarları nedir?",
        strategy: "Önce parantezi tek birim için aç.",
        steps: [
          {
            label: "1. adım",
            explanation: "Bir birim Ca₁O₂H₂; toplam beş atom içerir.",
          },
          {
            label: "2. adım",
            explanation: "Ca = 0,25 mol; O = 0,50 mol; H = 0,50 mol atom olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Toplam atom miktarı 0,25 + 0,50 + 0,50 = 1,25 moldür.",
          },
        ],
        answer: "Toplam 1,25 mol atom",
        check: "5 × 0,25 = 1,25 mol atom.",
        pitfall: "İyonik Ca(OH)₂ için ayrık molekül sözcüğünü kullanma.",
      },
      {
        title: "Aynı örnek, farklı sayım",
        prompt:
          "0,25 mol Ca(OH)₂’nin tamamının çözündüğü ve tam ayrıştığı varsayılıyor. Ca²⁺, OH⁻ ve toplam iyon miktarı nedir?",
        strategy: "Ayrışma katsayılarını kullan.",
        steps: [
          {
            label: "1. adım",
            explanation: "Bir formül miktarı bir Ca²⁺ ile iki OH⁻ verir.",
          },
          {
            label: "2. adım",
            explanation: "Ca²⁺ 0,25 mol ve OH⁻ 0,50 mol olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Toplam iyon miktarı 0,75 mol; net yük 2 × 0,25 − 0,50 = 0’dır.",
          },
        ],
        answer: "0,25 mol Ca²⁺; 0,50 mol OH⁻; 0,75 mol iyon",
        check: "OH⁻ içindeki atomlar ayrı iyon sayılmadı.",
        pitfall: "Çözünme/tam ayrışma koşulunu verilmeden varsayma.",
      },
      {
        title: "Daha büyük parantez",
        prompt:
          "0,10 mol Al₂(SO₄)₃ formül biriminde toplam O atomu sayısı nedir?",
        strategy: "Dıştaki üçü SO₄ grubunun tamamına uygula.",
        steps: [
          {
            label: "1. adım",
            explanation: "Tek formül biriminde 3 × 4 = 12 O atomu vardır.",
          },
          {
            label: "2. adım",
            explanation: "0,10 mol birim, 0,10 × 12 = 1,20 mol O atomu içerir.",
          },
          {
            label: "3. adım",
            explanation: "O atomu sayısı 1,20 Nₐ olur.",
          },
        ],
        answer: "1,20 Nₐ O atomu",
        check: "İki Al + üç S + on iki O = on yedi atom; yalnız O istenmiştir.",
        pitfall: "Üç sülfat grubunu üç O atomu sanma.",
      },
    ],
    recall: [
      {
        prompt: "N = nNₐ’da sayılan varlık neden yazılır?",
        answer:
          "Mol, atom veya molekül veya iyon gibi belirtilmiş varlıkların sayısına bağlanır.",
      },
      {
        prompt: "Bir Ca(OH)₂ formül biriminde toplam kaç atom vardır?",
        answer: "Bir Ca, iki O, iki H; toplam beş atom.",
      },
      {
        prompt: "Tam ayrışmış Ca(OH)₂ için neden üç iyon sayılır?",
        answer: "Bir Ca²⁺ ve iki OH⁻ vardır; OH⁻ çok atomlu tek bir iyondur.",
      },
      {
        prompt: "Toplam iyon sayısı ile net yük aynı mıdır?",
        answer:
          "Hayır. Üç iyonun yükleri birbirini dengeleyip toplam yükü sıfır yapabilir.",
      },
    ],
    source:
      "MEBİ TYT Kimya Konu Özetleri PDF 63–65 (basılı 61–63); OGM 10. Sınıf Dersler Cepte, Mol Kavramı–Mol Hesaplamaları PDF 10–12, 17–18 doğrudan incelendi. Güncel SI mol tanımıyla özgün varlık, parantez ve koşullu iyon sayımı. Aurelia TYT Kimya 033–034 kopya kağıdı, canlı Drive’dan yeniden indirilerek ilgili öğretim ve çözüm sayfaları doğrudan karşılaştırıldı; resmî soru metni veya anahtar aktarılmadı.",
    title: "Mol ve tanecik: molekül, formül birimi, atom, iyon",
    topic: "detail-172",
    items: [
      [
        "0,5 mol H₂O molekülü kaç molekül içerir? Nₐ Avogadro sabitidir.",
        "0,5 Nₐ",
        ["Nₐ", "1,5 Nₐ", "2 Nₐ", "3 Nₐ"],
        "Sayılan varlık moleküldür.",
        "N = nNₐ = 0,5 Nₐ molekül. Molekülün üç atom içermesi molekül sayısını üçle çarpmaz.",
      ],
      [
        "0,5 mol CO₂ molekülünde kaç mol O atomu vardır?",
        "1 mol",
        ["0,25 mol", "0,5 mol", "1,5 mol", "2 mol"],
        "Bir molekülde iki O bulunur.",
        "0,5 × 2 = 1 mol O atomu; bu serbest O₂ miktarı demek değildir.",
      ],
      [
        "0,25 mol Ca(OH)₂ formül biriminde toplam kaç mol atom bulunur?",
        "1,25 mol",
        ["0,25 mol", "0,50 mol", "0,75 mol", "1 mol"],
        "Tek birimdeki beş atomu say.",
        "Ca₁O₂H₂ toplam 5 atom içerir. 0,25 × 5 = 1,25 mol atom.",
      ],
      [
        "Bir Al₂(SO₄)₃ formül biriminde O atomu sayısı kaçtır?",
        "12",
        ["3", "4", "7", "17"],
        "Parantez çarpanını O’nun alt indisine uygula.",
        "Üç SO₄ grubu vardır; 3 × 4 = 12 O atomu. 17 ise bütün atomların toplamıdır.",
      ],
      [
        "0,20 mol Ca(OH)₂ tamamen çözünüp tam ayrışıyor: Ca²⁺ + 2 OH⁻. Toplam iyon miktarı kaç moldür?",
        "0,60 mol",
        ["0,20 mol", "0,40 mol", "0,80 mol", "1 mol"],
        "Bir formül miktarı üç iyon verir.",
        "0,20 mol Ca²⁺ ile 0,40 mol OH⁻ toplam 0,60 mol iyondur.",
      ],
      [
        "0,20 mol Ca(OH)₂ tamamen çözünüp tam ayrışıyor. Oluşan OH⁻ iyonu sayısı kaçtır? Nₐ Avogadro sabitidir.",
        "0,40 Nₐ",
        ["0,20 Nₐ", "0,60 Nₐ", "0,80 Nₐ", "Nₐ"],
        "OH⁻ sayısı formül miktarının iki katıdır.",
        "0,20 × 2 = 0,40 mol OH⁻; sayısı 0,40 Nₐ. O ve H ayrı iyonlara ayrılmış sayılmaz.",
      ],
      [
        "Bir mol Ca²⁺ ve iki mol OH⁻ için iyon miktarı ve net yük yorumu hangisidir?",
        "Toplam 3 mol iyon vardır; net yük sıfırdır.",
        [
          "Toplam 0 mol iyon vardır; net yük sıfırdır.",
          "Toplam 3 mol iyon vardır; net yük +3’tür.",
          "Toplam 5 mol iyon vardır; net yük sıfırdır.",
          "Yalnız 1 mol iyon vardır; net yük +2’dir.",
        ],
        "İyonların sayısı ile yük katsayılarını ayrı topla.",
        "Miktar 1 + 2 = 3 mol; yük katkıları +2 ve 2 × (−1) dengelenir.",
      ],
      [
        "İyonik Ca(OH)₂ katısı için en uygun sayım ifadesi hangisidir?",
        "Ca(OH)₂ formül birimi",
        [
          "Ayrık Ca(OH)₂ molekülü",
          "Serbest Ca gazı molekülü",
          "OH₂ nötr atomu",
          "Yalnız elektron kümesi",
        ],
        "İyonik kristalin oranını gösteren birimi düşün.",
        "İyonik kristallerde formül en sade iyon oranını gösterir; ayrık molekül varlığı varsayılmaz.",
      ],
      [
        "Nₐ = 6,02 × 10²³ mol⁻¹ alınırsa 1,204 × 10²³ CO₂ molekülü kaç moldür?",
        "0,20 mol",
        ["0,02 mol", "0,50 mol", "2 mol", "5 mol"],
        "N’yi Nₐ’ya böl.",
        "n = 1,204/6,02 = 0,20 mol; on üzeri 23 çarpanları sadeleşir.",
      ],
      [
        "Bir çözeltide şeker moleküllerinin değişmeden dağıldığı ve iyonlaşmadığı veriliyor. 0,3 mol şeker için hangisi kesin doğrudur?",
        "Çözünmüş şeker molekülü sayısı 0,3 Nₐ’dır.",
        [
          "Şekerden 0,6 mol iyon oluşur.",
          "Her şeker molekülü tek atoma dönüşür.",
          "Bütün atomlar çözünmeyle kaybolur.",
          "Molekül sayısı sıfır olur.",
        ],
        "Çözünmenin burada kimyasal değişim oluşturmadığı verilmiş.",
        "Moleküller korunduğundan nNₐ = 0,3 Nₐ’dır. Çözünmeyi otomatik iyonlaşma sayma.",
      ],
    ],
  },
  {
    id: "mol-kutle-iliskisi",
    minutes: 45,
    objectives: [
      "Bağıl atom kütlesi ile mol kütlesi",
      "Formülden mol kütlesine",
      "n = m/M bağıntısının anlamı",
      "Eşit kütle ile eşit tanecik farklıdır",
    ],
    sections: [
      {
        title: "Bağıl atom kütlesi ile mol kütlesi",
        paragraphs: [
          "Bağıl atom kütlesi bir referansa göre oran olduğu için birimsizdir. Bir atomun kütlesi u birimiyle, bir mol atomun kütlesi ise gram cinsinden ifade edilebilir. Okul hesaplarında C için 12, O için 16 kullanıldığında sayısal bağlantı kolaydır; fakat niceliklerin adları ve birimleri aynı değildir.",
          "Mol kütlesi M, maddenin kütlesinin madde miktarına oranıdır ve g/mol gibi birimle yazılır. “Bir mol karbonun kütlesi 12 g” ile “karbonun mol kütlesi 12 g/mol” aynı bağlantıyı farklı niceliklerle söyler. Bir molün kütlesine g/mol birimi yazmak birim hatasıdır.",
        ],
      },
      {
        title: "Formülden mol kütlesine",
        paragraphs: [
          "Bir formülde her elementin atom sayısını o elementin verilen atom kütlesiyle çarpıp tüm katkıları topla. CO₂ için 12 + 2 × 16 = 44 g/mol bulunur. Parantez varsa önce iç grubun toplam katkısını, sonra dış katsayısını uygula.",
          "Ca(OH)₂ için Ca = 40, O = 16, H = 1 alındığında 40 + 2 × (16 + 1) = 74 g/mol olur. Aynı sonuç 40 + 32 + 2 şeklinde açılarak da bulunabilir. İyonik bir formülün mol kütlesi hesaplanabilir; bu işlem onun ayrık moleküllerden oluştuğu anlamına gelmez.",
        ],
      },
      {
        title: "n = m/M bağıntısının anlamı",
        paragraphs: [
          "Kütleden mol bulurken kütleyi mol kütlesine böl. 22 g CO₂, M = 44 g/mol için 0,5 moldür. Birim kontrolü g/(g/mol) = mol olur. Mol miktarından kütleye dönüyorsan m = nM kullan; aynı bağıntıyı her soruda yeniden yorumlayabilirsin.",
          "M aynı madde ve verilen bileşim için sabittir. Örneği iki kat büyütmek m ile n’yi birlikte ikiye katlar; mol kütlesini ikiye katlamaz. Aynı maddenin farklı örneklerini karşılaştırırken m ile n doğru orantılıdır. Farklı maddelerde ise M değiştiğinden eşit gramlar eşit mol olmak zorunda değildir.",
        ],
      },
      {
        title: "Eşit kütle ile eşit tanecik farklıdır",
        paragraphs: [
          "Eşit kütledeki iki moleküler maddeden mol kütlesi küçük olan daha çok molekül içerir. Örneğin H₂ = 2 ve O₂ = 32 g/mol iken 4 g H₂ iki mol, 4 g O₂ 0,125 moldür; molekül sayıları 16 kat farklıdır. Eşit gramları eşit sayıda varlık kabul etmek bu nedenle yanlıştır.",
          "Buna karşılık eşit mol miktarları aynı tür sayım düzeyinde eşit sayıda belirtilmiş varlık içerir. 1 mol H₂ molekülü ile 1 mol O₂ molekülünün sayıları eşittir; kütleleri 2 ve 32 g’dır. Her ikisi iki atomlu olduğu için bu özel çiftte toplam atom sayıları da eşittir; bunu bütün formüllere genelleme.",
        ],
      },
      {
        title: "Kütleden içerilen atomlara",
        paragraphs: [
          "Bir bileşiğin kütlesi verildiğinde önce bileşiğin mol miktarını bul. Sonra tek formüldeki istenen atom sayısıyla çarp. Örneğin 37 g Ca(OH)₂, M = 74 g/mol için 0,5 mol formül miktarıdır; 1 mol O atomu ve toplam 2,5 mol atom içerir.",
          "Soru tanecik sayısını isterse son mol değerini Nₐ ile çarp. Bu üç adımı bir anda ezberlenmiş tek orantıya sıkıştırmak yerine “gram → mol bileşik → mol istenen atom → tane” yolunu çiz. Bileşikteki O atomlarının sayısı, örnekte serbest O₂ gazı olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Tek taneciğin kütlesi",
        paragraphs: [
          "Bir mol belirtilmiş varlık Nₐ tane olduğuna göre tek varlığın ortalama kütlesi M/Nₐ’dır. Bir CO₂ molekülü için M = 44 g/mol ve Nₐ ≈ 6,02 × 10²³ mol⁻¹ kullanılırsa yaklaşık 7,31 × 10⁻²³ g bulunur. Çok küçük bir sayı beklenir.",
          "Bilimsel gösterimde üssün işareti denetim için önemlidir: tek molekülün gram kütlesi, bir molün gram kütlesinden çok küçüktür. 10²³ ile bölme 10⁻²³ ölçeği oluşturur. Uygulama ayrıca Nₐ katsayısını gösterir; çizimdeki birkaç taneciğin gerçek sayı olduğu iddiasında bulunmaz.",
        ],
      },
      {
        title: "Karışımda her bileşeni ayrı çöz",
        paragraphs: [
          "Bir karışım için tek mol kütlesi verilmiyorsa bütün gramları bir bileşiğin M değeriyle bölme. 18 g H₂O ile 44 g CO₂, her birinden bir mol içerir; toplam molekül miktarı 2 moldür. Toplam atom miktarı ise her bir molekül üç atomlu olduğundan 6 moldür.",
          "“Toplam mol” denirken hangi varlıkların toplandığını açıkça belirt. Moleküllerle formül birimlerini belirsiz bir toplam içinde karıştırmak kavramsal hata yaratabilir. Eşit kütleli bileşenler, saflık yüzdesi veya izotop bileşimi verildiğinde her birinin miktarını önce kendi verisiyle hesapla.",
        ],
      },
      {
        title: "Hacim ancak koşullarıyla köprü olur",
        paragraphs: [
          "n = m/M ve N = nNₐ belirli varlıklar için temel dönüşümlerdir. Gaz hacmi kullanılacaksa sıcaklık, basınç ve kullanılan model de gerekir. İdeal gaz yaklaşımında 0 °C ve 1 atm için molar hacim yaklaşık 22,4 L/mol olabilir; bunu sıvılara, katılara veya her sıcaklıktaki gaza koşulsuz uygulama.",
          "Bir hesapta birim, tahmini büyüklük ve ters işlem üçlü kontrol sağlar. 11 g CO₂ için 0,25 mol bulduğunda 0,25 × 44 = 11 g ile geri dön. Soru koşul vermiyorsa kendi kendine “normal koşul” ekleme. Bilgisi eksik bir hacim sorusunda kesin sonuç olmadığını fark etmek de doğru kimyasal akıl yürütmedir.",
        ],
      },
      {
        title: "Karışımın ortalama mol kütlesini türet",
        paragraphs: [
          "Mol miktarı ve örnek kütlesi verilirse M = m/n bağıntısı kullanılır; n sıfır olamaz. Örneğin 5 g saf örnek 3,01 × 10²³ belirtilmiş varlık içeriyorsa Nₐ = 6,02 × 10²³ mol⁻¹ ile n = 0,50 mol ve M = 5/0,50 = 10 g/mol bulunur. Bu sonuç maddenin kimliğini tek başına belirlemez; aynı mol kütlesine sahip farklı maddeler olabilir. Sayılan varlığın atom mu molekül mü formül birimi mi olduğu yine belirtilmelidir.",
          "Karışımda ortalama mol kütlesi, aynı sayım türü için toplam kütlenin toplam mol miktarına oranıdır. 16 g O₂ ve 44 g CO₂ için M değerleri 32 ve 44 g/mol verilsin: miktarlar 0,50 ve 1,00 mol; toplam 60 g ve 1,50 moldür. Ortalama M = 60/1,50 = 40 g/mol olur ve bileşenlerin değerleri arasında kalır. (32 + 44)/2 = 38 işlemi burada yanlıştır; basit aritmetik ortalama yalnız bileşenlerin mol miktarları eşitse geçerlidir. Bu ortalama, tek bir yeni molekülün oluştuğunu göstermez.",
        ],
      },
    ],
    examples: [
      {
        title: "Parantezli mol kütlesi ve örnek kütlesi",
        prompt:
          "Ca = 40, O = 16, H = 1. 0,25 mol Ca(OH)₂ formül miktarının kütlesi nedir?",
        strategy: "Önce mol kütlesini açarak hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "M = 40 + 2 × (16 + 1) = 74 g/mol. Parantezdeki O ve H katkıları birlikte ikiyle çarpılır; Ca katkısı yalnız bir kez alınır.",
          },
          {
            label: "2. adım",
            explanation: "m = nM = 0,25 × 74 g hesaplanır.",
          },
          {
            label: "3. adım",
            explanation: "Örnek kütlesi 18,5 g bulunur.",
          },
        ],
        answer: "18,5 g",
        check: "18,5/74 = 0,25 mol.",
        pitfall: "OH grubunu ikiyle çarparken Ca’yı da ikiyle çarpma.",
      },
      {
        title: "Gramdan atom sayısına",
        prompt:
          "C = 12, O = 16. 11 g CO₂ kaç O atomu içerir? Nₐ cinsinden yazın.",
        strategy: "Gramdan bileşik molüne, sonra O molüne geç.",
        steps: [
          {
            label: "1. adım",
            explanation: "M(CO₂) = 44 g/mol; n = 11/44 = 0,25 mol.",
          },
          {
            label: "2. adım",
            explanation: "O atomu miktarı 2 × 0,25 = 0,50 mol olur.",
          },
          {
            label: "3. adım",
            explanation: "O atomu sayısı 0,50 Nₐ bulunur.",
          },
        ],
        answer: "0,50 Nₐ O atomu",
        check: "Karbon 0,25 Nₐ ve toplam atom 0,75 Nₐ’dır.",
        pitfall: "11 gramı doğrudan ikiyle çarparak atom sayısı bulamazsın.",
      },
      {
        title: "Eşit gram, farklı molekül sayısı",
        prompt:
          "H₂ = 2 ve O₂ = 32 g/mol. 4’er gram H₂ ve O₂’deki molekül sayılarının H₂/O₂ oranı nedir?",
        strategy: "Eşit kütlede mol kütlelerini ters orantılı kullan.",
        steps: [
          {
            label: "1. adım",
            explanation: "H₂ miktarı 4/2 = 2 mol.",
          },
          {
            label: "2. adım",
            explanation: "O₂ miktarı 4/32 = 0,125 mol.",
          },
          {
            label: "3. adım",
            explanation: "Molekül sayıları oranı 2/0,125 = 16 olur.",
          },
        ],
        answer: "16",
        check: "Eşit kütlede oran M(O₂)/M(H₂) = 32/2 de 16’dır.",
        pitfall:
          "İki atomlu olmaları kütlelerinin veya molekül sayılarının eşitliğini gerektirmez.",
      },
      {
        title: "Bir molekül ne kadar hafif?",
        prompt:
          "CO₂’nin mol kütlesi 44 g/mol; Nₐ = 6,02 × 10²³ mol⁻¹. Bir molekülün kütlesi yaklaşık kaç gramdır?",
        strategy: "Bir molün kütlesini bir moldeki sayıya böl.",
        steps: [
          {
            label: "1. adım",
            explanation: "Tek molekül kütlesi 44/(6,02 × 10²³) g yazılır.",
          },
          {
            label: "2. adım",
            explanation: "44/6,02 ≈ 7,31 bulunur.",
          },
          {
            label: "3. adım",
            explanation: "Sonuç 7,31 × 10⁻²³ g olur.",
          },
        ],
        answer: "Yaklaşık 7,31 × 10⁻²³ g",
        check: "Bu kütle Nₐ ile çarpılınca yaklaşık 44 g verir.",
        pitfall: "Bilimsel gösterimde negatif üssü kaybetme.",
      },
    ],
    recall: [
      {
        prompt: "Mol kütlesinin birimi nedir?",
        answer: "Örneğin g/mol; bir mol örneğin kütlesinin birimi ise g’dır.",
      },
      {
        prompt: "Eşit gramda mol sayısı hangi maddede daha büyüktür?",
        answer: "Mol kütlesi küçük olan maddede.",
      },
      {
        prompt: "37 g Ca(OH)₂ kaç moldür? M = 74 g/mol.",
        answer: "0,5 mol formül miktarıdır.",
      },
      {
        prompt: "22,4 L/mol her maddeye uygulanır mı?",
        answer:
          "Hayır; örneğin ideal gaz yaklaşımında 0 °C, 1 atm koşulları gibi açık koşullar gerekir.",
      },
    ],
    source:
      "MEBİ TYT Kimya Konu Özetleri PDF 63–65 (basılı 61–63); OGM 10. Sınıf Dersler Cepte, Mol Kavramı–Mol Hesaplamaları PDF 10–12, 17–18 doğrudan incelendi. Özgün mol kütlesi, varlık başına kütle ve çok adımlı hesaplar. Aurelia TYT Kimya 035 kopya kağıdı, canlı Drive’dan yeniden indirilerek ilgili öğretim ve çözüm sayfaları doğrudan karşılaştırıldı; resmî soru metni veya anahtar aktarılmadı.",
    title: "Mol ve kütle: birimlerden çok adımlı hesaba",
    topic: "detail-173",
    items: [
      [
        "C = 12 ve O = 16 için CO₂’nin mol kütlesi nedir?",
        "44 g/mol",
        ["28 g/mol", "32 g/mol", "44 g", "12 g/mol"],
        "O’nun alt indisini kullan.",
        "12 + 2 × 16 = 44 g/mol. 44 g bir örnek kütlesidir, mol kütlesi birimi değildir.",
      ],
      [
        "Ca = 40, O = 16, H = 1 için Ca(OH)₂’nin mol kütlesi nedir?",
        "74 g/mol",
        ["57 g/mol", "58 g/mol", "114 g/mol", "42 g/mol"],
        "İki OH grubu vardır.",
        "40 + 2 × (16 + 1) = 74 g/mol. Parantezdeki O ve H katkıları birlikte ikiyle çarpılır; Ca katkısı yalnız bir kez alınır.",
      ],
      [
        "Mol kütlesi 44 g/mol olan CO₂’nin 11 gramı kaç moldür?",
        "0,25 mol",
        ["0,125 mol", "0,5 mol", "2 mol", "4 mol"],
        "n = m/M kullan.",
        "n = m/M = 11 g / (44 g/mol) = 0,25 mol CO₂ molekülü. Gramlar sadeleşir; mol miktarını tekrar 44 g/mol ile çarpmak 11 g verir.",
      ],
      [
        "Mol kütlesi 74 g/mol olan Ca(OH)₂’nin 0,5 mol formül miktarı kaç gramdır?",
        "37 g",
        ["18,5 g", "74 g", "148 g", "0,00676 g"],
        "m = nM kullan.",
        "m = nM = 0,5 mol × 74 g/mol = 37 g. Burada 74 g/mol maddenin mol kütlesi, 37 g ise seçilen örneğin kütlesidir.",
      ],
      [
        "H₂ = 2 ve O₂ = 32 g/mol. Eşit 4 g örneklerde molekül sayılarının H₂/O₂ oranı nedir?",
        "16",
        ["1/16", "1", "2", "8"],
        "Eşit kütlede mol kütlelerinin tersini karşılaştır.",
        "H₂ miktarı 4/2 = 2 mol, O₂ miktarı 4/32 = 0,125 moldür. Molekül sayıları nNₐ ile bulunur; oranda Nₐ sadeleşir ve 2/0,125 = 16 kalır.",
      ],
      [
        "Mol kütlesi 74 g/mol olan 37 g Ca(OH)₂’de kaç mol O atomu bulunur?",
        "1 mol",
        ["0,25 mol", "0,5 mol", "2 mol", "2,5 mol"],
        "Önce formül miktarını, sonra O sayısını bul.",
        "37/74 = 0,5 mol birim; iki O ile 1 mol O atomu bulunur.",
      ],
      [
        "Al = 27, S = 32, O = 16 alınırsa Al₂(SO₄)₃ mol kütlesi kaç g/mol olur?",
        "342",
        ["123", "150", "246", "438"],
        "İki Al ve üç SO₄ katkısını topla.",
        "2 × 27 + 3 × (32 + 4 × 16) = 54 + 288 = 342 g/mol.",
      ],
      [
        "18 g H₂O ve 44 g CO₂ karışımında toplam kaç mol molekül vardır? M(H₂O) = 18, M(CO₂) = 44 g/mol.",
        "2 mol",
        ["1 mol", "3 mol", "6 mol", "62 mol"],
        "Her bileşenin molünü ayrı hesapla.",
        "18/18 + 44/44 = 1 + 1 = 2 mol molekül. Toplam gramları tek M’ye bölme.",
      ],
      [
        "Bir moleküler maddenin mol kütlesi M g/mol; Avogadro sabiti Nₐ mol⁻¹. Tek molekülün gram kütlesi hangi bağıntıyla bulunur?",
        "M/Nₐ",
        ["M × Nₐ", "Nₐ/M", "M + Nₐ", "1/M"],
        "Bir molün kütlesini bir moldeki sayıya böl.",
        "(g/mol)/(mol⁻¹) = g; tek molekül kütlesi M/Nₐ’dır.",
      ],
      [
        "Sıcaklık, basınç ve gazın ideal kabulü verilmeden 1 mol bir gazın hacmi soruluyor. Hangisi doğrudur?",
        "Verilenler tek başına kesin hacmi belirlemez.",
        [
          "Her koşulda 22,4 L’dir.",
          "Her koşulda 1 L’dir.",
          "Mol kütlesiyle aynı sayıda litredir.",
          "Gaz olduğu için hacmi sıfırdır.",
        ],
        "Gaz hacmini etkileyen değişkenleri düşün.",
        "Miktar tek başına hacmi belirlemez; sıcaklık, basınç ve model koşulları gerekir.",
      ],
    ],
  },
];

type Item = [string, string, string[], string, string];
export const forge014ChemistryGuides: LessonGuide[] = unitData.map(
  ({ items, title, topic, ...guide }) => guide,
);
export const forge014ChemistryTopics: Record<string, string> =
  Object.fromEntries(unitData.map((u) => [u.id, u.topic]));
export const forge014ChemistryLessons: Lesson[] = unitData.map((u) => ({
  id: u.id,
  subjectId: "tyt-kimya",
  title: txt(u.title),
  minutes: u.minutes,
  objectives: u.objectives.map(txt),
  body: u.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: (u.items as Item[]).map(
    ([prompt, correct, wrong, hint, explanation], i): Question => {
      const answer = i % 5,
        options = [...wrong];
      options.splice(answer, 0, correct);
      return {
        id: `f014-chem-${u.id}-${i + 1}`,
        prompt: txt(prompt),
        options: options.map(txt),
        answer,
        hint: txt(hint),
        explanation: txt(explanation),
        skill: u.id,
      };
    },
  ),
  source: txt(u.source),
  tags: [u.id, "kaynakli-anlatim"],
}));
