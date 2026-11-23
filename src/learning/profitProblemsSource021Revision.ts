import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const profitProblemsSource021Summary =
  "Aurelia 021 Kâr Zarar Problemleri, içerik 1.1 (19 Kasım 2026), PDF s. 1–15. MEBİ TYT Matematik Konu Özetleri, basılı s. 52 (PDF s. 54). MEBİ TYT Matematik Tarama Testi 10, basılı s. 54–55. Geçmiş sınavlardan öğren bölümünde 2024 TYT Temel Matematik 8 bulunur.";

const titles = {
  goal: "İndirim sınırını korunacak kâra göre hesapla",
  equal: "Eşit satışta oranların büyüklüğünü denetle",
  stock: "Kayıp ve ikinci satışın gelirini ayrı yaz",
  quantity: "Üretilen ve satılan adetleri ayır",
  ranges: "İki satış koşulunu aynı maliyette kesiştir",
  firstMethods: "Tabanı, fiyat zincirini ve eşit olan tutarı seç",
  lastMethods: "Kayıp, adet sınırı ve toplam maliyeti izle",
};

const headers = [
  "Yöntem",
  "Geçerli örnek",
  "Yöntemin sınırı",
  "Başka bir kullanım",
];

export const profitProblemsSource021Sections: GuideSection[] = [
  {
    title: titles.goal,
    paragraphs: [
      "En az kâr oranı r ise önce gerekli satış tutarını M(1+r) olarak yaz. İndirim kesri d, etiket E>0 için E(1−d)≥M(1+r) olmalı. Etiket hedef tutarın altındaysa indirim yapmadan bile hedef tutmaz. Etiket hedefe eşitse yalnız d=0 geçerlidir.",
      "Maliyet 300 TL, etiket 450 TL olsun. En az %20 kâr için satış en az 360 TL olmalıdır. En çok 90 TL, yani etiketin %20’si indirilebilir. Yalnız zarar etmeme koşulunda en düşük satış 300 TL, indirim üst sınırı etiketin 1/3’üdür. Soru başabaş mı, belli bir kâr mı istediğini söyleyince sağ taraf değişir.",
    ],
  },
  {
    title: titles.equal,
    paragraphs: [
      "İki ürünün satışları eşitse her birinin maliyetini kendi satış çarpanına bölerek bul. Eşit büyüklükte zıt oranlardan çıkan r² kısa yolu, oran büyüklükleri değişince uygulanmaz.",
      "Örneğin iki ürün de 300 TL’ye satılıyor. Biri %50 kârla, diğeri %25 zararla satılmışsa maliyetler 300/1,50=200 ve 300/0,75=400 TL’dir. Gelir ve maliyet ayrı ayrı 600 TL eder. Birinci ürünün 100 TL kârı ile ikincinin 100 TL zararı dengelenir.",
      "Birleşik kâr oranı, her grubun toplam maliyetine göre ağırlıklandırılır. Kâr/zarar oranlarını r₁ ve r₂, toplam grup maliyetlerini M₁ ve M₂ yazarsan birleşik oran (M₁·r₁+M₂·r₂)/(M₁+M₂) olur. Zarar oranını eksi işaretli yaz. Grup maliyetleri eşitse düz ortalama kullanılabilir.",
    ],
  },
  {
    title: titles.stock,
    paragraphs: [
      "Alınan her birimin bedelini bir kez gider olarak yaz. Sağlam ürünler, indirimle satılan ürünler ve gelir getirmeyen fire için ayrı satırlar aç. Bir miktar ilk partinin yüzdesi olarak verilirse, fireyi çıkardıktan sonraki adedi taban yapma.",
      "36 kg ürünün alış bedeli 15 TL/kg, taşıma 60 TL olsun. 24 kg 25 TL/kg, 8 kg 10 TL/kg satılıyor, 4 kg gelir getirmiyor. Başlangıçtaki 36 kg için toplam maliyet 600 TL. Toplam gelir 24·25+8·10=680 TL. Kâr 80 TL, oran 80/600=2/15. 24+8+4=36 kontrolü, bütün miktarın yalnız bir kez ayrıldığını gösterir.",
    ],
    table: {
      headers: ["Kısım", "Miktar", "Satış fiyatı", "Gelir"],
      rows: [
        ["Sağlam", "24 kg", "25 TL/kg", "600 TL"],
        ["Düşük fiyatla satılan", "8 kg", "10 TL/kg", "80 TL"],
        ["Gelir getirmeyen", "4 kg", "0 TL/kg", "0 TL"],
      ],
    },
  },
  {
    title: titles.quantity,
    paragraphs: [
      "F sabit gider, a birim üretim maliyeti, v birim satış tutarı olsun. Üretilen u, satılan s adet için kâr K=vs−(F+au). Aynı n ancak üretilenlerin tamamı satılıyorsa iki tarafta da kullanılır.",
      "Sabit gider 205 TL, her satış için 18 TL’ye bir ürün üretiliyor ve ayrıca 5 ürün üretilip gelir getirmiyor. Satış 38 TL/adetse s satışta K=38s−[205+18(s+5)]=20s−295 olur. Eşitlik s=14,75 verir. İzinli adet tam sayı olduğundan zarar etmemek ve kesin kâr için ilk adet 15’tir. En az 45 TL kâr için 20s−295≥45, yani s≥17 gerekir. 16 satışta kâr 25 TL, 17 satışta 45 TL’dir.",
    ],
  },
  {
    title: titles.ranges,
    paragraphs: [
      "Aynı ürün grubu farklı fiyatlarla satılabiliyorsa maliyet bir kez yazılır. Kâr koşulunda satış−maliyet>0, zarar koşulunda satış−maliyet<0. Çıkan aralıkları birlikte uygula. Bir fark verilen bütün x değerlerinde uygun işaretliyse o senaryo yeni sınır getirmez.",
      "Toplam maliyet x+96 TL olsun. İki ayrı satış senaryosunda kâr isteniyor. 2x+12 TL satıştan gelen fark x−84 olduğundan x>84. x+111 TL satışta fark 15 TL ve her x için pozitiftir. İki koşulun ortak sonucu x>84. x=84’te ilk satış başabaştır.",
    ],
  },
  {
    title: titles.firstMethods,
    paragraphs: [
      "Yüzdeleri hesaplamadan önce hangi tutarla karşılaştırıldığını ve hangi iki tutarın eşit verildiğini işaretle.",
    ],
    table: {
      headers,
      rows: [
        [
          "Kâr oranında aynı kapsam",
          "Maliyet 180 TL, gelir 225 TL. Kâr 45/180=%25.",
          "45/225 satış marjı %20’dir. Maliyet sıfırsa standart kâr oranı tanımsızdır.",
          "Etkinlik gideri 480 TL, gelir 600 TL ise maliyete göre fazlalık %25’tir.",
        ],
        [
          "Fiyat zincirinde doğru taban",
          "180 TL maliyet, 240 TL etiket, etikete %25 indirim. Satış 180 TL, başabaş.",
          "İndirim maliyetin %25’i tutarında olsaydı 45 TL çıkarılır, satış 195 TL olurdu.",
          "Liste fiyatı 160 TL, etiket üzerinden %25 indirim ve ardından 8 TL kuponla tahsilat 112 TL olur.",
        ],
        [
          "Eşit satışta maliyeti geri bul",
          "Satışlar 144’er TL, oranlar +%20 ve −%20. Maliyet 120+180=300 TL; 288 TL gelirle %4 zarar.",
          "Maliyetler 120’şer TL olsaydı 144+96=240 TL gelirle başabaş olurdu.",
          "İki bilet aynı bedelle devredildiğinde alış tutarları kendi satış çarpanlarına bölünerek bulunur.",
        ],
      ],
    },
  },
  {
    title: titles.lastMethods,
    paragraphs: [
      "Toplamı kurarken miktar ile birim fiyatı çarp. Satılamayanların giderini ve her sınırdaki eşitlik durumunu düşün.",
    ],
    table: {
      headers,
      rows: [
        [
          "Kayıpta maliyeti baştan yaz",
          "12 kg’ın maliyeti 300 TL. 9 kg 40 TL/kg satılırsa gelir 360 TL, kâr %20.",
          "Kalan 3 kg ayrıca 10 TL/kg satılırsa gelir 390 TL’ye çıkar ve kâr %30 olur.",
          "Atölyede 12 ürün üretilip 9’u satılırsa üretim gideri 12, satış geliri 9 ürün üzerinden yazılır.",
        ],
        [
          "Eşitliği ve hedefi ayır",
          "K=12n−96 için 8 başabaş, 9 ilk kesin kâr adedi; en az 48 TL için n≥12.",
          "K=12n−100 için zarar etmeyen ve kesin kâr eden ilk adet 9’dur. Eşitlik tam sayıda gerçekleşmez.",
          "Etkinlikte her katılımcı sabit gidere 15 TL katkı veriyorsa 120 TL gider 8 katılımcıda karşılanır.",
        ],
        [
          "Grupları maliyetle ağırlıklandır",
          "200 TL maliyette %30 kâr, 300 TL maliyette %10 zarar. Net 30 TL, toplamda %6 kâr.",
          "Oranları düz ortalamak %10 verir. İki grup maliyeti eşit olmadığında sonuç değişir.",
          "10 ürünün her biri 20 TL’ye alınır. Dördü 25, altısı 30 TL’ye satılırsa 280 TL gelire karşı 200 TL maliyetle %40 kâr vardır.",
        ],
      ],
    },
  },
];

export const profitProblemsSource021SheetText = new Map<string, string[]>([
  [
    titles.goal,
    [
      "Hedef kâr kesri r için asgari satış M(1+r). E(1−d)≥M(1+r) koşulunda d etiket indirim kesridir.",
      "E asgari satıştan küçükse uygun indirim yok. E eşitse yalnız d=0.",
    ],
  ],
  [
    titles.equal,
    [
      "Eşit satışlarda her maliyet kendi çarpanından bulunur. r² zarar yalnız eşit satış ve eşit büyüklükte zıt oranlarda, ek gider yoksa geçerli.",
      "Birleşik kâr oranı için toplam kâr tutarını toplam maliyete böl. Eşit grup maliyetlerinde oranların düz ortalaması alınabilir.",
    ],
  ],
  [
    titles.stock,
    [
      "Maliyet = ilk miktarın alış bedeli + belirtilen giderler. Gelir = her grubun satılan miktarı × kendi satış fiyatının toplamı.",
      "Miktar gruplarını bir kez say. Her yüzdenin ilk miktara mı, kalana mı uygulandığını belirt.",
    ],
  ],
  [
    titles.quantity,
    [
      "Üretilen u, satılan s ise K=vs−(F+au). Hepsi satılıyorsa u=s=n.",
      "Zarar yok K≥0, kesin kâr K>0, en az H TL kâr K≥H. Tam sayı adayın bir öncesini de dene.",
    ],
  ],
  [
    titles.ranges,
    [
      "Her ayrı satıştan aynı toplam maliyeti çıkar. İşaret koşullarının kesişimini al. Başabaş sınırı sıkı eşitsizliğe dahil olmaz.",
    ],
  ],
  [
    titles.firstMethods,
    [
      "Kâr tabanı maliyet, indirim tabanı soruda belirtilen fiyat, eşitlik tabanı verilen tutardır.",
    ],
  ],
  [
    titles.lastMethods,
    [
      "Fireyi gelirde, üretimi maliyette, tam sayı sınırını kâr koşulunda kontrol et.",
    ],
  ],
]);

export const profitProblemsSource021Examples: WorkedExample[] = [
  {
    title: "Etiket verilince kârın son iki adımını tamamla",
    prompt:
      "Etiket 900 TL. Maliyet etiketten %20 düşük, satış etiketten %20 yüksek. M=720 TL ve S=1080 TL verilmiş. Kâr=… TL, kâr yüzdesinin paydası=… TL. Boşlukları doldurup kâr yüzdesini bul.",
    strategy:
      "Çözümü açmadan önce iki fiyat arasındaki farkı ve o farkı hangi tutara böleceğini yaz.",
    steps: [
      {
        label: "Kâr tutarı",
        explanation: "Satıştan maliyeti çıkar.",
        expression: "1080−720=360 TL",
      },
      {
        label: "Kâr oranı",
        explanation:
          "Verilen etiket iki fiyatı kurmak için kullanıldı. Standart kâr yüzdesinde payda maliyet 720 TL’dir.",
        expression: "360/720=%50",
      },
      {
        label: "Başka yoldan denetle",
        explanation:
          "Etiket E ise S/M=(1,20E)/(0,80E)=1,50. Satış maliyetin 1,50 katıdır.",
      },
    ],
    answer: "Kâr 360 TL. Payda 720 TL, kâr %50.",
    check:
      "720·1,50=1080. Etikete göre fark 360/900=%40 olsa da kâr oranının tabanı maliyettir.",
    pitfall: "İki fiyatı etiketten kurduktan sonra kârı da etikete bölmek.",
  },
  {
    title: "MEBİ ile çalışma · Aynı başlangıçtan üç ürün grubu",
    prompt:
      "Aynı maliyetle alınan 80 üründe, başlangıç adedinin %20’si gelir getirmiyor. Başlangıç adedinin %30’u maliyetinin yarısına, geri kalanı %80 kârla satılıyor. Ek gider yok. Toplam kâr yüzdesi nedir?",
    strategy:
      "Yüzdeleri ilk 80 ürün üzerinden adede çevir. Birim maliyeti ortak birim olarak kullan.",
    steps: [
      {
        label: "Partileri ayır",
        explanation:
          "16 ürün gelirsiz, 24 ürün düşük fiyatla satılıyor. Kalan 40 ürün yüksek fiyatla satılıyor.",
        expression: "80−16−24=40",
      },
      {
        label: "Aynı birimde gelir",
        explanation:
          "Birim maliyet m TL ise toplam maliyet 80m TL. İki satış grubunun gelirleri 24·0,50m ve 40·1,80m TL.",
        expression: "12m+72m=84m",
      },
      {
        label: "Toplam kâr yüzdesi",
        explanation:
          "Kâr 4m TL’dir. Başlangıç partisi için ödenen 80m TL’ye böl.",
        expression: "4m/(80m)=0,05",
      },
    ],
    answer: "Toplamda %5 kâr.",
    check: "m=10 TL ise maliyet 800, gelir 120+720=840 TL. 40/800=%5.",
    pitfall:
      "%30’luk bölümü gelirsiz parçadan sonra kalan 64 ürünün yüzdesi olarak almak.",
  },
];

export const profitProblemsSource021Recall = [
  {
    prompt:
      "Etiket, korunması gereken en düşük satış tutarından küçükse indirim işe yarar mı?",
    answer: "Hayır. İndirimsiz etiket zaten gereken tutarın altındadır.",
  },
  {
    prompt:
      "Üretilen u ve satılan s farklıysa toplam kârı hangi iki tutardan kurarsın?",
    answer: "Gelir v·s, maliyet F+a·u. Kâr bunların farkıdır.",
  },
  {
    prompt:
      "Aynı maliyetli iki satış senaryosunun birinde satış−maliyet farkı her x için pozitifse ne olur?",
    answer:
      "Bu senaryo kesin kâr koşuluna yeni sınır eklemez. Diğer senaryonun koşulunu ve x’in tanım aralığını uygula.",
  },
];

type PracticeInput = {
  key: string;
  prompt: string;
  options: [string, string, string, string, string];
  answer: number;
  hint: string;
  guidance: QuestionGuidance;
};

function practice({
  key,
  prompt,
  options,
  answer,
  hint,
  guidance,
}: PracticeInput): Question {
  return {
    id: `kar-zarar-problemleri-021-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "Kâr Zarar Problemleri",
    guidance,
  };
}

export const profitProblemsSource021Practice: Question[] = [
  practice({
    key: "korunan-kar-indirim",
    prompt:
      "Maliyeti 480 TL, etiketi 720 TL olan bir üründe en az %20 kâr korunacak. Etiket fiyatına en fazla yüzde kaç indirim uygulanabilir?",
    options: ["%0", "%20", "%25", "%33⅓", "%40"],
    answer: 1,
    hint: "Önce %20 kâr için gereken en düşük satış tutarını bul. Sonra etiketten en çok kaç TL çıkarılabileceğini hesapla.",
    guidance: {
      knowledge: [
        "Kârın yüzdesi maliyete, indirimin yüzdesi etikete uygulanır.",
      ],
      strategy: "Gerekli satıştan etiket indirim sınırına geri dön.",
      steps: [
        "Gerekli satış tutarı en az 480·1,20=576 TL.",
        "Etiketten en çok 720−576=144 TL indirilebilir.",
        "144/720=0,20. En yüksek indirim %20.",
      ],
      optionReasons: [
        "İndirimsiz satış hedefi aşar. 144 TL’ye kadar indirim yapılabilir.",
        "720 TL’ye %20 indirim, gereken 576 TL satış tutarını verir.",
        "%25 indirimde satış 540 TL, kâr 60 TL ve kâr oranı %12,5 olur.",
        "Bu, satış tutarını 480 TL maliyete indiren başabaş sınırıdır.",
        "%40 indirimle satış 432 TL’ye düşer ve zarar oluşur.",
      ],
      commonError: "Zarar etmeme sınırını en az %20 kârın sınırı sanmak.",
      check:
        "576−480=96 TL ve 96/480=%20. Daha büyük her indirim satış tutarını 576 TL’nin altına indirir.",
    },
  }),
  practice({
    key: "gider-adet-ayri",
    prompt:
      "Atölyenin sabit gideri 230 TL, üretim maliyeti 14 TL/adet ve satış fiyatı 39 TL/adet. n adet satıldığında n+5 adet üretiliyor ve fazladan 5 adet hiç gelir getirmiyor. Zarar etmemek, kesin kâr etmek ve en az 100 TL kâr etmek için gereken en az satış adetleri sırasıyla nedir?",
    options: [
      "12, 12 ve 16",
      "13, 13 ve 16",
      "12, 13 ve 16",
      "12, 13 ve 15",
      "10, 10 ve 14",
    ],
    answer: 2,
    hint: "Maliyeti üretilen ürün üzerinden kur. Üç koşul için kârın hangi değere eşit olabileceğini ayrı belirle.",
    guidance: {
      knowledge: [
        "Gelir satılan, birim üretim gideri üretilen adet üzerinden hesaplanır.",
      ],
      strategy:
        "Kâr ifadesini kur. Sıfır ve 100 TL sınırlarının hangi koşulda dahil olduğunu denetle.",
      steps: [
        "Gelir 39n ve maliyet 230+14(n+5). Kâr 25n−300.",
        "K≥0 için n≥12. K>0 için n>12, ilk uygun tam sayı 13.",
        "K≥100 için 25n≥400, yani n≥16.",
      ],
      optionReasons: [
        "12 satış başabaştır. Kesin kâr için 13 satış gerekir.",
        "Zarar etmemek için sıfır kâr da kabul edildiğinden ilk adet 12’dir.",
        "12 satış sıfır, 13 satış 25 TL ve 16 satış 100 TL kâr verir.",
        "15 satışta 75 TL kâr vardır. 100 TL koşulu sağlanmaz.",
        "Bu sayılar, gelir getirmeyen 5 ürünün üretim maliyetini hesaba katmayan modelden çıkar.",
      ],
      commonError:
        "Satılan ve üretilen adedi aynı alıp 5 ürünün bedelini giderden silmek.",
      check:
        "11 satışta zarar, 12’de başabaş. 15’te 75 TL, 16’da 100 TL kâr vardır.",
    },
  }),
  practice({
    key: "fireli-gelir",
    prompt:
      "80 kg meyve 18 TL/kg’den alınıyor ve 160 TL taşıma ödeniyor. 60 kg meyve 30 TL/kg, zedelenen 20 kg da 10 TL/kg fiyatla satılıyor. Toplam kâr yüzdesi nedir?",
    options: ["%12,5", "%20", "%38,89", "%25", "%61,29"],
    answer: 3,
    hint: "Zedelenen meyvenin bir fiyatı var. İki satış gelirini ve ödenen bütün maliyeti ayrı topla.",
    guidance: {
      knowledge: [
        "Ödenen gider tüm alış miktarını içerir. Ayrı satılan kısımların gelirleri birbirine eklenir.",
      ],
      strategy:
        "Toplam geliri iki satıştan, toplam maliyeti tüm parti ve taşımadan kur.",
      steps: [
        "Maliyet 80·18+160=1600 TL.",
        "Gelir 60·30+20·10=2000 TL.",
        "Kâr 400 TL, oran 400/1600=%25.",
      ],
      optionReasons: [
        "Zedelenen bölümün 200 TL geliri atlanırsa 200/1600=%12,5 çıkar.",
        "400/2000 satışa göre marjı verir.",
        "Taşıma unutulursa kâr 560 TL, maliyet 1440 TL ve oran yaklaşık %38,89 çıkar.",
        "İki satıştan 2000 TL gelir sağlanır. 400 TL kâr, 1600 TL maliyetin dörtte biridir.",
        "Yalnız sağlam miktara alış bedeli yazılırsa yaklaşık %61,29 çıkar. 20 kg için de alış bedeli ödenmiştir.",
      ],
      commonError:
        "Zedelenmiş ürünün alış giderini silmek veya verilen satış gelirini eklememek.",
      check: "60+20=80 kg, toplam gelir 1800+200=2000 TL. 1600·1,25=2000.",
    },
  }),
  practice({
    key: "grupta-eksik-fiyat",
    prompt:
      "Bir satıcı A grubundaki 6 ürünü tanesi 40 TL’ye, B grubundaki 4 ürünü tanesi 55 TL’ye alıyor. A grubunun hepsini tanesi 64 TL’ye satıyor. B grubu tek bir fiyattan tamamen satılacak. Toplam maliyete göre tam %20 kâr için B grubunda bir ürün kaça satılmalı?",
    options: ["40 TL", "46 TL", "55 TL", "66 TL", "42 TL"],
    answer: 4,
    hint: "Tüm ürünlerde gereken geliri bul ve A grubundan zaten gelen tutarı çıkar.",
    guidance: {
      knowledge: [
        "Toplam kâr hedefi her grubun kâr oranını ayrı ayrı belirlemez. Hedef toplam gelir, toplam maliyete uygulanır.",
      ],
      strategy:
        "Hedef geliri ve A gelirini kullanarak B’nin gerekli gelirini bul.",
      steps: [
        "Toplam maliyet 6·40+4·55=460 TL. Hedef gelir 460·1,20=552 TL.",
        "A geliri 6·64=384 TL. B’den 552−384=168 TL gelmeli.",
        "Dört B ürünü aynı fiyatla satılırsa her biri 168/4=42 TL.",
      ],
      optionReasons: [
        "40 TL ilk grubun alış tutarıdır. İkinci grup 40 TL’den satılırsa toplam gelir 544 TL olur.",
        "46 TL, 460 TL maliyetin 10 ürüne bölünmesiyle elde edilen ortalama alış tutarıdır.",
        "55 TL B grubunun alış fiyatıdır. Bu fiyatta toplam gelir hedefi aşar.",
        "66 TL her B ürünü için ayrı %20 kâr sağlar. Hedef bütün ürünlerin ortak kârıdır.",
        "B’nin toplam geliri 4·42=168 TL. İki grubun geliri 552 TL’ye ulaşır.",
      ],
      commonError: "Toplam kâr oranı her grupta aynıdır diye varsaymak.",
      check:
        "A grubu 144 TL kâr, B grubu 52 TL zarar eder. Net kâr 92 TL ve 92/460=%20.",
    },
  }),
  practice({
    key: "esit-satis-farkli-oran",
    prompt:
      "İki ürünün her biri 180 TL’ye satılıyor. İlk satışta ilk ürünün maliyetine göre %50 kâr, ikinci satışta ikinci ürünün maliyetine göre %25 zarar var. Başka gider yok. Toplam satışın sonucu nedir?",
    options: [
      "Başabaş.",
      "%6,25 zarar.",
      "%25 kâr.",
      "%12,5 kâr.",
      "%25 zarar.",
    ],
    answer: 0,
    hint: "Aynı satıştan iki farklı maliyeti geri hesapla. Oranların büyüklüklerinin eşit olup olmadığını kontrol et.",
    guidance: {
      knowledge: [
        "Birleşik sonuç için toplam satış ile toplam maliyet karşılaştırılır.",
      ],
      strategy:
        "İki maliyeti kendi çarpanından bul ve satışların toplamıyla karşılaştır.",
      steps: [
        "İlk maliyet 180/1,50=120 TL, ikinci maliyet 180/0,75=240 TL.",
        "Toplam maliyet 360 TL, toplam satış da 360 TL.",
        "Fark sıfır. Toplam sonuç başabaş.",
      ],
      optionReasons: [
        "İlk 60 TL kâr ve ikinci 60 TL zarar tutar olarak eşittir.",
        "Aynı büyüklükte zıt oran şartı sağlanmadığı için 0,25² uygulanamaz.",
        "50−25 hesabı iki farklı maliyet tabanını karıştırır.",
        "Oranların ortalaması maliyetler eşit olsaydı kullanılabilirdi.",
        "%25 yalnız ikinci üründeki zarar oranıdır.",
      ],
      commonError:
        "Eşit satışın tek başına r² zarar kısa yolunu yeterli kıldığını sanmak.",
      check: "120·1,50=180 ve 240·0,75=180. 120+240=180+180.",
    },
  }),
  practice({
    key: "iki-satis-siniri",
    prompt:
      "Bir takımın maliyeti 2x+168 TL’dir. Ayrı satış senaryolarında takım 4x+24 TL’ye satıldığında da 2x+203 TL’ye satıldığında da kesin kâr ediliyor. x pozitif gerçek sayıysa hangi değerleri alabilir?",
    options: ["x>0", "x≥72", "x>72", "x≥73", "0<x<72"],
    answer: 2,
    hint: "İki senaryoda da aynı maliyeti çıkar. Farkların her birinin pozitif olması gerekiyor.",
    guidance: {
      knowledge: [
        "Kesin kâr satış−maliyet>0 koşuludur. İki senaryo birlikte isteniyorsa koşullar kesiştirilir.",
      ],
      strategy:
        "Farkı ayrı hesapla. Her zaman pozitif olan fark yeni sınır oluşturmaz.",
      steps: [
        "İlk fark (4x+24)−(2x+168)=2x−144. Pozitif olması için x>72.",
        "İkinci fark (2x+203)−(2x+168)=35. Her pozitif x için sağlanır.",
        "Ortak sınır x>72. İlk satış 72’de başabaştır.",
      ],
      optionReasons: [
        "İkinci şart her pozitif x için geçerli. İlk şart ayrıca x>72 ister.",
        "x=72 iken ilk satış zarar etmese de kesin kâr etmez.",
        "Bu açık aralık ilk şartı sağlar. İkinci şart zaten 35 TL kâr verir.",
        "x tam sayı olmak zorunda değildir. Örneğin x=72,50 iki koşulu da sağlar.",
        "Bu aralıkta ilk satış farkı 2x−144 negatiftir.",
      ],
      commonError:
        "İlk eşitliği dahil etmek veya ikinci senaryoda olmayan bir sınır üretmek.",
      check: "x=72,50 için farklar 1 TL ve 35 TL. x=72 için ilk fark 0 TL.",
    },
  }),
];
