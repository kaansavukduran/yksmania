import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const percentProblemsSource020Summary =
  "Aurelia 020 Yüzde Problemleri, içerik 1.1 (19 Kasım 2026), PDF s. 1–19. MEBİ TYT Matematik Konu Özetleri, basılı s. 51 (PDF s. 53). MEBİ TYT Matematik Tarama Testi 10, basılı s. 53–55. OGM Fen Lisesi Matematik 9, Denklemler ve Eşitsizlikler, basılı s. 193. Geçmiş sınavlardan öğren bölümünde 2026 TYT Temel Matematik 19 bulunur.";

const titles = {
  containers: "Kalan miktarları eşitlerken kapasiteleri yaz",
  groups: "Grup büyüklüğünü ve ortak üyeleri hesaba kat",
  amounts: "Yüz birimiyle gerçek tutar arasındaki ölçeği bul",
  rectangle: "Değişen iki kenarı ve birim maliyeti izle",
  firstMethods: "Parça, zincir ve grup için tabanı seç",
  lastMethods: "Bölüm, çarpım ve yüzde farkını ayır",
};

const headers = [
  "Yöntem",
  "Geçerli örnek",
  "Yöntemin sınırı",
  "Başka bir kullanım",
];

export const percentProblemsSource020Sections: GuideSection[] = [
  {
    title: titles.containers,
    paragraphs: [
      "Doluluk oranı kapasiteye uygulanır. Tüketim yüzdesi mevcut içerik üzerinden verildiyse ikinci işlemin tabanı o içeriktir. Kapasite C, başlangıç doluluk kesri d ve tüketilen içerik kesri t için kalan miktar C·d·(1−t) olur. Kalanların eşitliği litre veya gram gibi ortak birimde kurulur.",
      "Bir kap 160 L kapasiteli ve %75 dolu olsun. İçeriğin %25’i kullanıldığında 160·0,75·0,75=90 L kalır. Diğer kap 240 L kapasiteli ve içeriğinin %25’i kullanılmışsa başlangıçta 90/0,75=120 L vardır. İkinci kap başlangıçta 120/240=%50 doludur. Bulduğun başlangıç miktarı sıfır ile kapasite arasında olmalı.",
      "Kapasiteler aynı ve pozitifse eşitliğin iki tarafından ortak kapasiteyi sadeleştir. Kapasiteler farklıysa kendi katsayılarıyla kalır. İkinci kapta kalan çarpan sıfırsa son miktar sıfırdır. İlk kapta pozitif miktar kalmışsa eşitlik kurulamaz, iki kalan da sıfırsa ikinci başlangıç doluluğu bu koşulla belirlenemez.",
    ],
  },
  {
    title: titles.groups,
    paragraphs: [
      "İki ayrı üretim partisinde toplam 120 ürün var. Birinci partinin %10’u, ikincinin %30’u kusurlu. Toplam 20 kusurlu varsa ikinci partinin büyüklüğü b için 0,10(120−b)+0,30b=20 yazılır. 12+0,20b=20 olduğundan b=40. Birinci partide 8, ikinci partide 12 kusurlu ürün bulunur. İki payı da aynı birimle, ürün adediyle yazdık.",
      "Gruplar kesişiyorsa birleştirilmiş kişi sayısından ortak kişileri bir kez çıkar. Aynı düzeltmeyi koşulu sağlayan kişiler için de yap. 40 ve 60 kişilik iki kulüpte sırasıyla 20 ve 24 kişi bir çalışmaya katılmış olsun. Her iki kulübe kayıtlı 10 kişiden 4’ü katılmışsa toplam 90 farklı kişi ve 40 farklı katılımcı vardır. Birleşik katılım 40/90=4/9’dur. Yalnız 10 ortak üye bilgisi verilseydi, ortak üyeler arasındaki katılım sayısı da gerekirdi.",
    ],
  },
  {
    title: titles.amounts,
    paragraphs: [
      "Soru yalnız göreli sonucu istiyorsa başlangıcı 100 ölçek birimiyle gösterebilirsin. Gerçek tutar 100k TL ise %30 ve %10 indirimli iki değer sırasıyla 70k ve 90k TL’dir. Son tutarlar arasında 30 TL fark verilirse 20k=30, k=1,5 ve gerçek başlangıç 150 TL olur.",
      "Sabit para veya adet de varsa her adımın birimini yaz. “%30 indirim” başlangıcın 0,70 katını, “30 TL indirim” ise başlangıçtan 30 TL çıkarılmasını söyler. Son tutar 70 TL olduğunda birincide başlangıç 100 TL, ikincide de 100 TL çıkar. Bu yalnız bir eşleşmedir. Son tutar 140 TL olursa başlangıçlar sırasıyla 200 TL ve 170 TL olur.",
    ],
  },
  {
    title: titles.rectangle,
    paragraphs: [
      "Bir dikdörtgende uzun kenar %20 artıp kısa kenar %25 azalırsa alan çarpanı 1,20·0,75=0,90’dır. Metrekare fiyatı %20 artarsa ve sabit bedel yoksa toplam bedel 0,90·1,20=1,08 katına çıkar, yani %8 artar.",
      "Aynı örnekte kısa kenar değişmeseydi onun çarpanı 1 olurdu. Uzun kenar ve metrekare fiyatı yine 1,20 kat olduğundan toplam bedel 1,44 katına çıkar, yani %44 artardı. Sabit hizmet bedeli verilseydi önce değişen alan bedelini hesaplar, sabit bedeli ekler, sonra iki toplamı karşılaştırırdın.",
    ],
  },
  {
    title: titles.firstMethods,
    paragraphs: [
      "İlk işlemi seçmeden önce yüzdeyi, tabanını ve aranan birimi yan yana yaz.",
    ],
    table: {
      headers,
      rows: [
        [
          "Parçayı bütüne bağla",
          "240 g’ın %15’i 36 g. %15’i 36 g olan toplam 36/0,15=240 g.",
          "%0’ı 0 olan bir toplamın tek değeri bulunmaz.",
          "%8 kusur oranıyla 12 kusur varsa toplam 12/0,08=150 ürün.",
        ],
        [
          "Her değişime kendi çarpanını ver",
          "500 mL’nin %20’si, sonra kalanın %25’i kullanılırsa 500·0,80·0,75=300 mL kalır.",
          "İkinci adım 25 mL ise 500·0,80−25=375 mL kalır.",
          "Bir ödemenin %30’unun %40’ı, ödemenin %12’sidir.",
        ],
        [
          "Ayrı gruplarda adetleri topla",
          "30 ürünün %20’si ile 70 ürünün %60’ı birlikte (6+42)/100=%48 eder.",
          "Gruplar kesişiyorsa toplam üründe ve kusurlu ürünlerde ortak adetleri bir kez çıkar.",
          "25 L’nin %20’si ile 75 L’nin %40’ı aynı maddeyse karışımda 5+30=35 L, yani %35 vardır.",
        ],
      ],
    },
  },
  {
    title: titles.lastMethods,
    paragraphs: [
      "Aradığın niceliğin bölüm, çarpım veya oran farkı olduğunu belirle. Aynı birimleri karşılaştır.",
    ],
    table: {
      headers,
      rows: [
        [
          "Bölümün iki tarafını izle",
          "Fiyat 0,84, miktar 0,70 katına çıkarsa birim fiyat 0,84/0,70=1,20 kattır.",
          "Sıfır miktardan birim fiyat çıkmaz. Yalnız etiketin değişimi de yeterli değildir.",
          "Yol aynı, süre 0,80 katına inerse ortalama hız 1/0,80=1,25 katına çıkar.",
        ],
        [
          "Çarpımdaki her etkeni yaz",
          "İki kenar 1,15 ve 0,80 kat ise alan 0,92 kat olur.",
          "Toplamda sabit ücret varsa değişen kısma ait çarpanı toplam ücrete uygulama.",
          "Çalışan sayısı 1,20 ve kişi başı üretim 1,10 kat ise toplam üretim 1,32 kattır.",
        ],
        [
          "Farkın türünü ve yönünü yaz",
          "Bir oran %20’den %30’a çıktıysa artış 10 yüzde puan ve göreli %50’dir.",
          "%0’dan %30’a geçiş 30 yüzde puandır. Başlangıç sıfır olduğundan göreli artış tanımsızdır.",
          "10’dan 16’ya artış %60, 16’dan 10’a azalış %37,5’tir.",
        ],
      ],
    },
  },
];

export const percentProblemsSource020SheetText = new Map<string, string[]>([
  [
    titles.containers,
    [
      "Kalan = kapasite · doluluk kesri · (1 − tüketilen içerik kesri). Eşit kalanları aynı miktar biriminde karşılaştır.",
      "Ortak pozitif kapasite sadeleşir. Kalan çarpanı sıfırsa son miktardan tek bir başlangıç bulunamaz.",
    ],
  ],
  [
    titles.groups,
    [
      "Ayrı gruplarda olumlu adetleri topla ve toplam adede böl. Bir grup büyüklüğü bilinmiyorsa diğerini toplamdan çıkarıp denklem kur.",
      "Kesişen gruplarda ortak toplamı ve ortak olumlu adedi kendi toplamlarından ayrı ayrı çıkar.",
    ],
  ],
  [
    titles.amounts,
    [
      "Yalnız oran varsa 100 ölçek birimi seçilebilir. Gerçek TL farkı verilirse başlangıcı 100k TL yaz ve k’yı farktan bul.",
      "Kalan çarpanın tersi bölmedir. Sabit miktar çıkarılmışsa başlangıca dönmek için o miktarı ekle.",
    ],
  ],
  [
    titles.rectangle,
    [
      "Toplam alan bedeli çarpanı = uzun kenar çarpanı · kısa kenar çarpanı · m² fiyatı çarpanı. Sabit kenarın çarpanı 1, sabit ücret ayrı terimdir.",
    ],
  ],
  [
    titles.firstMethods,
    [
      "Parçada tabanı, zincirde geçerli adımı, grupta birimi ve kesişimi kontrol et.",
    ],
  ],
  [
    titles.lastMethods,
    [
      "Birim nicelikte bölüm, toplam üründe çarpım, iki oranın doğrudan farkında yüzde puanı kullan.",
    ],
  ],
]);

export const percentProblemsSource020Examples: WorkedExample[] = [
  {
    title: "Başlangıç oranını verilen eşitlikle tamamla",
    prompt:
      "50 kişiden ilk uygulamayı kullananların oranı %p. Toplam kişi sayısı aynıyken uygulamayı kullananların sayısı 10 artıyor ve yeni oran %60 oluyor. 50·p/100 + … = 50·…/100 eşitliğindeki boşlukları doldur. İlk oranı ve yüzde puan artışını bul.",
    strategy:
      "Çözüm adımlarını açmadan önce başlangıç ve son kullanıcı adetlerini aynı 50 kişi üzerinden yaz.",
    steps: [
      {
        label: "Boşlukları doldur",
        explanation: "Artan adet sol tarafa, yeni oran sağ tarafa girer.",
        expression: "50·p/100+10=50·60/100",
      },
      {
        label: "Başlangıca dön",
        explanation: "Son kullanıcı adedi 30. İlk kullanıcı adedi 30−10=20.",
        expression: "100·20/50=40 ⇒ p=40",
      },
      {
        label: "Puan farkını yaz",
        explanation:
          "Her iki oran da aynı 50 kişiye ait. Artış 60−40=20 yüzde puandır.",
      },
    ],
    answer: "İlk oran %40. Artış 20 yüzde puan.",
    check:
      "20+10=30 ve 30/50=%60. Eski 20 kullanıcıya göre göreli artış ayrı bir hesapla %50’dir.",
    pitfall: "10 kişi artışını 10 yüzde puan gibi p’ye eklemek.",
  },
  {
    title: "MEBİ ile çalışma · Üç ayrı grubun katılımı",
    prompt:
      "Bir atölyede katılımcılar çakışmayan üç gruba ayrılmış. Toplam 150 kişinin %40’ı C grubunda. A grubunun %30’u, B grubunun %60’ı ve C grubunun %50’si bir çalışmayı tamamlıyor. Tamamlayan 75 kişinin kaçı B grubunda?",
    strategy:
      "Önce C’nin kişi ve tamamlayan sayılarını bul. Sonra A ve B için kalan toplamları kullan.",
    steps: [
      {
        label: "C grubunu ayır",
        explanation:
          "C’de 150·0,40=60 kişi, bunların 60·0,50=30’u çalışmayı tamamladı.",
      },
      {
        label: "Kalan grup ve tamamlayan adedi",
        explanation:
          "A ve B’nin toplamı 90, bu iki grupta tamamlayanların toplamı 45. B’de b kişi varsa A’da 90−b kişi var.",
        expression: "0,30(90−b)+0,60b=45",
      },
      {
        label: "İstenen adede dön",
        explanation:
          "27+0,30b=45 olduğundan b=60. B grubunda tamamlayan kişi sayısı 0,60·60=36.",
      },
    ],
    answer: "B grubundan 36 kişi çalışmayı tamamladı.",
    check:
      "Grup büyüklükleri 30, 60 ve 60. Tamamlayanların toplamı 9+36+30=75.",
    pitfall:
      "B grubundaki 60 kişiyi tamamlayan sayısı olarak vermek veya üç oranı doğrudan ortalamak.",
  },
];

export const percentProblemsSource020Recall = [
  {
    prompt:
      "Eşit miktar kalmış iki kapta hangi koşulla kapasiteyi sadeleştirebilirsin?",
    answer:
      "Kapasiteler eşit ve pozitifse ortak kapasite sadeleşir. Farklıysa iki kapasiteyi de eşitlikte tut.",
  },
  {
    prompt:
      "İki grubun kaç ortak üyesi olduğunu bilmek birleşik katılım yüzdesi için ne zaman yetersizdir?",
    answer:
      "Ortak üyelerden kaçının etkinliğe katıldığı bilinmiyorsa katılan farklı kişilerin sayısı bulunamaz.",
  },
  {
    prompt: "Başlangıç tutarını 100k TL yazdığında k neyi belirler?",
    answer:
      "Bir ölçek biriminin TL karşılığını belirler. Verilen sabit TL farkını bu ölçeği bulmak için kullan.",
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
    id: `yuzde-problemleri-020-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "Yüzde Problemleri",
    guidance,
  };
}

export const percentProblemsSource020Practice: Question[] = [
  practice({
    key: "farkli-kapasite",
    prompt:
      "240 L kapasiteli ilk depo başlangıçta %50 dolu. İlk deponun içeriğinin %30’u, 150 L kapasiteli ikinci deponun içeriğinin %20’si kullanılıyor. Sonra iki depoda eşit miktarda sıvı var. İkinci depo başlangıçta yüzde kaç doludur?",
    options: ["%35", "%43,75", "%70", "%56", "%84"],
    answer: 2,
    hint: "İki kalan miktarı litre cinsinden eşitle. Her doluluk kendi kapasitesine bağlı.",
    guidance: {
      knowledge: [
        "Başlangıç doluluğu kapasiteyi, tüketim yüzdesi ise mevcut içeriği taban alır.",
      ],
      strategy:
        "İlk deponun kalan litresini hesapla. İkinci deponun başlangıcına kalan çarpandan geri dön.",
      steps: [
        "İlk depoda başlangıçta 240·0,50=120 L var. Bunun 120·0,70=84 L’si kalır.",
        "İkinci deponun başlangıcı 84/0,80=105 L’dir.",
        "İkinci deponun kapasitesi 150 L. 105/150=0,70, dolayısıyla başlangıç doluluğu %70.",
      ],
      optionReasons: [
        "%35, ilk deponun son doluluğudur.",
        "%43,75, kapasiteler eşitmiş gibi 0,35’i 0,80’e bölmekten çıkar.",
        "İkinci depo 105 L ile başlar. Bu kendi kapasitesinin %70’idir.",
        "%56, ikinci deponun son doluluğudur.",
        "84, kullanılan yüzdeye dönmeden önceki kalan litre miktarıdır.",
      ],
      commonError: "Litre eşitliğini doluluk yüzdeleri eşitliği gibi kurmak.",
      check: "İlk depodan 36 L, ikinciden 21 L kullanılır. 120−36=105−21=84 L.",
    },
  }),
  practice({
    key: "grup-buyuklugu",
    prompt:
      "Çakışmayan A ve B gruplarında toplam 120 öğrenci var. A’dakilerin %25’i, B’dekilerin %50’si bir yarışmaya katılıyor. Toplam 50 öğrenci katıldığına göre B grubundan kaç öğrenci katılır?",
    options: ["20", "25", "30", "40", "80"],
    answer: 3,
    hint: "B’deki öğrenci sayısını b yaz. Katılanların toplamını iki ayrı gruptan kur.",
    guidance: {
      knowledge: [
        "Ayrı gruplarda her katılım yüzdesinin tabanı kendi grubunun büyüklüğüdür.",
      ],
      strategy:
        "Önce B’nin büyüklüğünü bul. Sonra bu grubun katılım yüzdesini uygula.",
      steps: [
        "Katılanların toplamı 0,25(120−b)+0,50b=50.",
        "30+0,25b=50 ve b=80.",
        "B grubundan katılan sayı 80·0,50=40.",
      ],
      optionReasons: [
        "20, yüzde farkıyla oluşan ara değerdir. B’nin katılımı 0,50b’dir.",
        "50 toplam katılan sayıdır. Yarısı B’den geliyor diye bir bilgi verilmez.",
        "30, iki grubu 60’ar kişi varsaymaktan çıkar.",
        "B’de 80 öğrenci var ve 40’ı katılıyor.",
        "80, B grubunun tamamıdır.",
      ],
      commonError:
        "Grup büyüklüğünü başlangıçta eşit varsaymak veya istenen katılan sayısı yerine grubun tamamını vermek.",
      check: "A’dan 40·0,25=10, B’den 80·0,50=40. Toplam 50 öğrenci katılır.",
    },
  }),
  practice({
    key: "tutar-olcegi",
    prompt:
      "Başlangıç etiketleri aynı olan iki kulaklıktan birine %25, diğerine %10 indirim uygulanıyor. İndirimli fiyatlar arasında 36 TL fark var. İndirimli iki fiyatın toplamı kaç TL’dir?",
    options: ["180", "216", "240", "360", "396"],
    answer: 4,
    hint: "İki indirimli tutarı başlangıç fiyatının katsayısıyla yaz. Katsayı farkı gerçek TL farkını verir.",
    guidance: {
      knowledge: [
        "Aynı ilk fiyatta iki indirim sonrası fiyat arasındaki fark, kalan çarpanların farkı ile ilk fiyatın çarpımıdır.",
      ],
      strategy: "İlk fiyatı F TL yaz ve 36 TL farkı kullanarak F’yi çöz.",
      steps: [
        "Son fiyatlar 0,75F ve 0,90F. 0,15F=36 olduğundan F=240 TL.",
        "İlk kulaklık 180 TL, ikinci 216 TL.",
        "Toplam 180+216=396 TL.",
      ],
      optionReasons: [
        "180 TL yalnız daha çok indirim yapılan kulaklığın son fiyatıdır.",
        "216 TL yalnız daha az indirim yapılan kulaklığın son fiyatıdır.",
        "240 TL kulaklıkların ortak başlangıç etiketidir.",
        "360 TL her iki ürüne de %25 indirim uygulanmış gibi hesaplanır.",
        "180 TL ve 216 TL indirimli fiyatlarının toplamı 396 TL’dir.",
      ],
      commonError:
        "36 TL gerçek fark varken 100 TL’yi kesin başlangıç tutarı almak.",
      check: "216−180=36 TL. 180/240=0,75 ve 216/240=0,90.",
    },
  }),
  practice({
    key: "kenar-kosulu",
    prompt:
      "Dikdörtgen bir panonun uzun kenarı %40 büyütülüyor, kısa kenarı %25 kısaltılıyor ve kaplamanın metrekare fiyatı %20 artıyor. Sabit ücret yok. Bu planda ve kısa kenarın değişmediği alternatif planda toplam kaplama bedeli sırasıyla yüzde kaç artar?",
    options: [
      "%26 ve %68",
      "%5 ve %40",
      "%35 ve %60",
      "%68 ve %26",
      "%20 ve %68",
    ],
    answer: 0,
    hint: "İki planın her biri için uzun kenar, kısa kenar ve metrekare fiyatı çarpanlarını yaz.",
    guidance: {
      knowledge: [
        "Kaplama bedeli alan ile metrekare fiyatının çarpımıdır. Sabit bir kenarın çarpanı 1’dir.",
      ],
      strategy:
        "İki planda yalnız kısa kenar çarpanı değişir. Her çarpımın 1’den farkını yüzde olarak al.",
      steps: [
        "İlk planda alan çarpanı 1,40·0,75=1,05. Bedel çarpanı 1,05·1,20=1,26, artış %26.",
        "Alternatifte alan çarpanı 1,40·1=1,40. Bedel çarpanı 1,40·1,20=1,68, artış %68.",
      ],
      optionReasons: [
        "İki sonuç da alan ve metrekare fiyatı değişimini birlikte içerir.",
        "Bu oranlar yalnız alan değişimlerini içerir.",
        "40−25+20 ve 40+20 toplamları, farklı etkenlerin çarpımını vermez.",
        "İki planın sonuçları ters sırada verilmiş.",
        "İlk planda yalnız %20 fiyat artışı yok. Alan ayrıca %5 artar.",
      ],
      commonError:
        "Yüzde değişimlerini toplamak veya sabit kısa kenarın etkisini öteki planda da kullanmak.",
      check:
        "Başlangıç bedeli 100 ölçek birimse plan bedelleri 126 ve 168 birimdir.",
    },
  }),
  practice({
    key: "yuzde-ve-litre-onar",
    prompt:
      "Bir tanktaki başlangıç suyunun %30’u boşaltıldıktan sonra 84 L kalıyor. Bir öğrenci ‘84+30=114 L’ diye çözüyor. Buna benzer ikinci tankta başlangıç suyundan tam 30 L boşaltılınca 84 L kalıyor. İki tankın başlangıç miktarı sırasıyla nedir?",
    options: [
      "114 L ve 114 L",
      "120 L ve 114 L",
      "120 L ve 120 L",
      "109,2 L ve 114 L",
      "114 L ve 120 L",
    ],
    answer: 1,
    hint: "İlk tankta %30 bir oran, ikinci tankta 30 L sabit miktar. Başlangıç için ayrı denklemler yaz.",
    guidance: {
      knowledge: [
        "Yüzde başlangıç değerine bağlıdır. Litre sabit miktar birimidir.",
      ],
      strategy:
        "Önce kalan oran veya litre farkıyla son miktarı yaz. Sonra her işlemi geri al.",
      steps: [
        "İlk tankta 0,70x=84, yani x=120 L.",
        "İkinci tankta y−30=84, yani y=114 L.",
      ],
      optionReasons: [
        "İlk tankta 30, litre sayısı değildir. 114 L’nin %70’i 79,8 L kalır.",
        "120·0,70=84 ve 114−30=84. İki koşul da sağlanır.",
        "İkinci tank 120 L ile başlasaydı 90 L kalırdı.",
        "109,2, 84 L’ye %30 eklemekten çıkar. Eski tabanı geri kurmaz.",
        "İki doğru başlangıç miktarının sırası ters verilmiş.",
      ],
      commonError:
        "Başlangıcın yüzdesini son miktara sabit litre gibi eklemek.",
      check:
        "İlk tanktan 36 L boşalır. İkinci tanktan 30 L boşalır. Her ikisinde de 84 L kalır.",
    },
  }),
  practice({
    key: "ortak-katilan",
    prompt:
      "Bir okulda 36 kişilik A kulübünden 18, 44 kişilik B kulübünden 20 öğrenci bir etkinliğe katılıyor. İki kulübe birden üye olan 10 öğrenciden 3’ü etkinliğe katıldı. En az bir kulübe üye olan farklı öğrencilerin yüzde kaçı katılmıştır?",
    options: ["%43,75", "%47,5", "%50", "%54,29", "%57,14"],
    answer: 2,
    hint: "Ortak üyeleri toplam kişi sayısından, ortak katılanları katılan sayısından ayrı çıkar.",
    guidance: {
      knowledge: [
        "Grupları birleştirirken ortak kişileri, sayıldıkları her toplamda yalnız bir kez tut.",
      ],
      strategy:
        "Çift sayılan kayıtları çıkarıp benzersiz katılan ve toplam kişi sayılarını oluştur.",
      steps: [
        "Toplam farklı öğrenci 36+44−10=70.",
        "Farklı katılımcı 18+20−3=35.",
        "35/70=0,50, yani %50.",
      ],
      optionReasons: [
        "35/80, katılanda kesişimi düzeltir ama toplam üyede düzeltmez.",
        "38/80, ortak kişileri hem katılan sayısında hem toplamda iki kez sayar.",
        "35 farklı katılımcı, 70 farklı üyenin yarısıdır.",
        "38/70 yaklaşık %54,29 eder. Toplam üye düzeltilmiş ama ortak katılımcılar iki kez sayılmıştır.",
        "%57,14, verilen iki kulüpteki toplam 38 katılımcı kaydından bile fazla kişiyi gerektirir.",
      ],
      commonError:
        "Ortak kişileri yalnız katılan sayısından ya da yalnız üye sayısından çıkarmak.",
      check:
        "Yalnız A’da 26 üye ve 15 katılımcı, yalnız B’de 34 üye ve 17 katılımcı, ortak kümede 10 üye ve 3 katılımcı vardır. 15+17+3=35.",
    },
  }),
];
