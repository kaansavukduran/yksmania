import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const ratioSource016Summary =
  "Aurelia 016 Oran Orantı, içerik 1.2 (19 Kasım 2026), PDF s. 1–11. MEBİ TYT Matematik Konu Özeti, basılı s. 45–46 (PDF s. 47–48). Altın oran kavramı için MEB TTKB 2026 YKS, PDF s. 128. Prova soruları özgündür. 2026 TYT Temel Matematik 2 kaynak kaydı Geçmiş sınavlardan öğren bölümündedir.";

const methodHeaders = [
  "İlk hamle",
  "Geçerli örnek",
  "Yöntemin durduğu yer",
  "Aynı yapıda bir uygulama",
];

export const ratioSource016Sections: GuideSection[] = [
  {
    title: "Altın oranı iki karşılaştırmayla tanı",
    paragraphs: [
      "Bir doğru parçasını, biri öbüründen uzun iki parçaya ayır. Uzun parçaya a, kısa parçaya b dersek a>b>0 olur. Bütün/uzun parça ile uzun/kısa parça oranlarını sırayla yaz. (a+b)/a=a/b sağlanıyorsa bu ortak orana altın oran denir ve φ ile gösterilir. Uzunluklar aynı birimde olduğundan φ birimsizdir. Değeri yaklaşık 1,618’dir.",
      "Örneğin kısa parça 2 cm, uzun parça 3 cm olursa bütün 5 cm’dir. 5/3 ile 3/2 eşit mi? Çapraz çarpımlar 10 ve 9 olur, dolayısıyla bu bölme altın oranı vermez. Aynı parçalar başka bir uzunluk biriminde yazıldığında iki oran da değişmez. Yaklaşık değer benzer görünebilir. Tanımı belirleyen, iki oranın tam eşitliğidir.",
    ],
  },
  {
    title: "Karışımda önce bütünün kaç parça olduğunu bul",
    paragraphs: [
      "Bir içecekte öz:su=3:5 olsun ve toplam hacim 32 L verilsin. Bütünü 3+5=8 eşit pay gibi düşün; her pay 4 L’dir. Öz 3·4=12 L, su 5·4=20 L olur. Özün karışımdaki yüzdesi 12/32=3/8=%37,5’tir. Özün suya oranı olan 3/5, yüzde hesabında bütünün paydası olamaz.",
      "Karışımı aynı tada sahip olacak biçimde büyütürken iki bileşeni de aynı katsayıyla çarp. 12 L öz ve 20 L suya yalnız 8 L su eklersen karışım 40 L’ye çıkar fakat öz 12 L kalır. Yeni öz payı 12/40=%30’dur. Önce hangi miktarların değiştiğini yaz, sonra yeni toplam ve oranı kur.",
    ],
  },
  {
    title: "İş miktarıyla günlük süre aynı değişken değildir",
    paragraphs: [
      "İş miktarını W, kişi başına saatlik verimi v, kişi sayısını n, günde çalışılan saati h ve çalışma günü sayısını d ile göster. Herkes aynı sabit hızda çalışırsa W=v·n·h·d olur. Kişi, saat ve gün çarpımı toplam kişi-saati verir. W ve v sabitse n veya h arttığında d azalır. W artarsa aynı kişi ve saatle daha çok gün gerekir.",
      "5 kişinin 3 gün boyunca günde 4 saat çalışması 60 kişi-saattir. Aynı ekip, kişi başına günde 6 saate çıkarsa 60/30=2 günde aynı işi tamamlar. İş aynı anda iki katına çıkarsa hedef 120 kişi-saat olur ve 120/30=4 gün gerekir. Sadece kişi veya gün sayısına bakmadan önce verilen işi, kapasiteyi ve günlük saatleri ayır.",
    ],
  },
  {
    title: "Ardışık sabit oranda geçiş sayısını say",
    paragraphs: [
      "Pozitif miktarlarda her geçişin katsayısı r ise bir sonraki değer Nₖ₊₁=r·Nₖ olur. İki geçişte Nₖ₊₂=r²·Nₖ, m geçişte rᵐ·Nₖ elde edilir. 2. adımdan 5. adıma 2→3→4→5, yani üç geçiş vardır. Toplam katsayıyı tek geçiş sanma. 2. değer 16, 5. değer 128 ise r³=8 ve r=2’dir.",
      "Geri giderken her ok için r’ye böl. Bu örnekte 1. değer 16/2=8’dir. Aynı sayıda adım her seferinde aynı katsayıyı verir. Pozitif r≠1 iken farklı geçiş sayıları farklı katsayılar verir. r=1 durumunda tüm terimler aynı değerde kalır ve kaç adım atılırsa atılsın katsayı 1 olur.",
    ],
  },
  {
    title: "Oranı yaz, sabiti ve birimi kontrol et",
    paragraphs: [
      "Pay ve paydanın hangi miktarları anlattığını belirle. a:b=m:n için b≠0 ve n≠0 olmalıdır. Ortak ölçek t=b/n olduğundan sıfır olamaz. Pozitif miktarlarda pozitif ölçek kullanılır. Sonucu hem başlangıç oranıyla hem soruda verilen toplam ya da farkla denetle.",
      "Doğru orantı y=kx biçimindedir. x=0 iken y=0’dır ve y/x oranı hesaplanamaz. Ters orantı y=k/x biçimindedir, x ve k sıfırdan farklıdır. Süre ve iş gibi pozitif nicelikler için k>0’dır. Tablodan bir çözüm yolu seçmeden önce bu koşulları kontrol et.",
    ],
    table: {
      headers: methodHeaders,
      rows: [
        [
          "Parçaları ölçekle",
          "A:B=3:7 ve toplam 50 ise 10t=50. A=15, B=35.",
          "3 ve 7’yi doğrudan miktar saymak toplamı 10’da bırakır.",
          "15 açık, 35 koyu plaka için açık:bütün=15:50=3:10.",
        ],
        [
          "Eşit oranı çöz",
          "5/8=x/40. İki payda da tanımlı. 8x=200, x=25.",
          "x/0=5/8 tanımsızdır. Çapraz çarpım x=0 verse bile oran kurulamaz.",
          "Aynı kaplama miktarıyla 4 L boya 18 m² kaplıyorsa 6 L, 27 m² kaplar.",
        ],
        [
          "Bölümün sabitliğine bak",
          "7 m kumaş 84 TL ise birim fiyat 12 TL/m. 10 m, 120 TL.",
          "20 TL sabit ücret varken toplam ücretin metre başına bölümü değişir.",
          "Sabit 42 km/saat hızla 1,5 saatte 63 km gidilir.",
        ],
        [
          "Çarpımın sabitliğine bak",
          "10 özdeş makine 9 saatte bitirirse aynı işi 15 makine 6 saatte yapar.",
          "İş iki katına çıkarsa 15 makine için süre de 6’dan 12 saate çıkar.",
          "Alanı 72 cm² kalan dikdörtgende 8 cm’ye 9 cm, 12 cm’ye 6 cm eşleşir.",
        ],
        [
          "Ölçeği aynı birimde uygula",
          "1:250 ölçekte 3,6 cm gerçekte 900 cm=9 m olur.",
          "250 ile çarpımın birimi hâlâ cm’dir. 900 m demek 100 kat hatadır.",
          "1:80 makette 2,5 cm uzunluk gerçekte 200 cm=2 m’dir.",
        ],
      ],
    },
  },
  {
    title: "Ortak terimi ve değişen koşulu ayır",
    paragraphs: [
      "Aynı harfin aynı çokluğu gösterdiğini kontrol et. Süre, verim ve iş miktarından biri değişiyorsa önce hangi çarpanın değiştiğini yaz. Adımlı bir modelde verilen iki konumu işaretle ve aradaki okları say. Bunlar benzer görünen sorularda ilk işlem hatalarını önler.",
    ],
    table: {
      headers: methodHeaders,
      rows: [
        [
          "Ortak çokluğu eşitle",
          "A:B=3:5 ve B:C=10:7 ise A:B:C=6:10:7.",
          "3:5:7 yazmak ikinci orandaki B=10 bilgisini kaybeder.",
          "3 sepet 5 kutuyla, 10 kutu 7 çantayla aynı toplam kapasitedeyse 6 sepet=10 kutu=7 çantadır.",
        ],
        [
          "Ters ağırlıkları kullan",
          "130 TL, 5 ve 8 ile ters paylaşılırsa pay oranı 8:5, paylar 80 ve 50 TL’dir.",
          "50 ve 80 TL, 5 ve 8 ile aynı yönde orantı kurar.",
          "Bir ürünü 5 ve 8 dakikada üreten makineler aynı sürede 8:5 oranında üretir.",
        ],
        [
          "Çarpanları ayrı taşı",
          "3 kişi × 4 saat/gün × 6 gün ile 6 kişi × 3 saat/gün × 4 gün, 72 kişi-saat eder.",
          "Kişi sayısı ikiye katlanırken günlük saat ve gün değişir. Üretim yalnız kişiye göre hesaplanamaz.",
          "2 özdeş fırın 5 saatte 70 ürün pişirirse 5 fırın 2 saatte aynı miktarı pişirir.",
        ],
        [
          "Adımlar boyunca katsayıyı çarp",
          "N₁=4, N₃=36, N₅=324. İki adımlık oran 9, tek adım katsayısı 3.",
          "N₁→N₂ bir, N₂→N₅ üç adımdır. r=3 iken bu katsayılar 3 ve 27’dir.",
          "Bir görsel her aşamada 2 kat büyütülüyorsa üç aşamada 2³=8 kat olur.",
        ],
      ],
    },
  },
];

export const ratioSource016Examples: WorkedExample[] = [
  {
    title: "Çalışma gününün kesrini saate çevir",
    prompt:
      "Aynı sabit hızda 4 baskı makinesi günde 3 saat çalışarak 4 günde 144 afiş üretiyor. 6 özdeş makine, günde 5 saat çalışarak 225 afişi kaç çalışma gününde tamamlar? Son günün çalışma süresini de yaz.",
    strategy:
      "Önce bir makinenin bir saatte kaç afiş bastığını bul. Sonra yeni bir günlük üretimi hesapla.",
    steps: [
      {
        label: "Toplam çalışma",
        explanation: "İlk durumda dört makinenin saatleri toplanır.",
        expression: "4·3·4=48 makine-saat",
      },
      {
        label: "Saatlik verim",
        explanation: "Her makine aynı hızdayken 144 afişi toplam saate böl.",
        expression: "144/48=3 afiş/(makine-saat)",
      },
      {
        label: "Yeni günlük üretim",
        explanation: "Altı makinenin her biri bir günde beş saat çalışır.",
        expression: "3·6·5=90 afiş/gün",
      },
      {
        label: "Dolmayan gün",
        explanation:
          "İki günde 180 afiş basılır. Kalan 45 afiş, günlük üretimin yarısıdır. Beş saatlik bir çalışma gününün yarısı 2,5 saattir.",
      },
    ],
    answer: "İki tam çalışma günü ve üçüncü gün 2 saat 30 dakika.",
    check: "6·(5+5+2,5)·3=225 afiş.",
    pitfall: "Yarım çalışma gününü 24 saatin yarısı olarak okumak.",
  },
  {
    title: "Eksik adımları önce kendin doldur",
    prompt:
      "Pozitif bir dizide her geçiş aynı katsayıyla yapılıyor. 2. terim 18, 4. terim 162. 18·r^(□)=162 bağıntısında önce kutudaki üssü, sonra birinci terimi bul.",
    strategy: "2 ile 4 arasındaki ok sayısı, üs kutusuna gelir.",
    steps: [
      {
        label: "Okları say",
        explanation: "2→3 ve 3→4 iki geçiştir.",
        expression: "18r²=162",
      },
      {
        label: "Katsayı",
        explanation:
          "İki tarafı 18’e böl. Terimler pozitif olduğu için pozitif kökü seç.",
        expression: "r²=9 ⇒ r=3",
      },
      {
        label: "Geri git",
        explanation: "2. terimden ilkine bir geçiş geri gidilir.",
        expression: "18/3=6",
      },
    ],
    answer: "Üs 2, birinci terim 6.",
    check: "Terimler 6, 18, 54, 162 sırasını verir.",
    pitfall: "Terimler arasındaki toplam çarpanı 9’u tek adım çarpanı saymak.",
  },
];

export const ratioSource016Recall = [
  {
    prompt: "Altın oran için bir doğru parçasındaki hangi iki oran eşit olur?",
    answer: "Bütün/uzun parça ile uzun/kısa parça. a>b>0 için (a+b)/a=a/b.",
  },
  {
    prompt:
      "Pozitif, sabit oranlı bir dizide 2. terimden 6. terime kaç geçiş vardır?",
    answer: "Dört geçiş. Tek geçiş katsayısı r ise N₆/N₂=r⁴ olur.",
  },
  {
    prompt:
      "İş miktarı, eş verimli kişi sayısı ve günlük çalışma süresi birlikte değişirse neyi yazarsın?",
    answer:
      "İş miktarı = kişi başına saatlik verim × kişi sayısı × günlük çalışma saati × gün sayısı. Hangi niceliklerin sabit kaldığını ayrıca denetlerim.",
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
    id: `oran-oranti-016-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "Oran Orantı",
    guidance,
  };
}

export const ratioSource016Practice = [
  practice({
    key: "karisim-butunu",
    prompt:
      "Bir içecekte elma suyu ile suyun hacim oranı 3:7’dir. Toplam içecek 40 L ise elma suyu miktarı ve karışım içindeki yüzdesi sırasıyla nedir?",
    options: [
      "28 L ve %70",
      "3 L ve %7,5",
      "12 L ve %42,86",
      "12 L ve %30",
      "40 L ve %100",
    ],
    answer: 3,
    hint: "3 ve 7 paylarının toplamı 40 L’yi temsil ediyor. Bir payın kaç litre olduğunu bul.",
    guidance: {
      knowledge: [
        "Bir bileşenin yüzdesi, kendi miktarının bütün karışıma oranından hesaplanır.",
      ],
      strategy:
        "Oran paylarının toplamından bir payın hacmini, sonra elma suyu payını bul.",
      steps: [
        "Toplam 3+7=10 paydır ve 40 L olduğundan her pay 4 L’dir.",
        "Elma suyu 3·4=12 L, su 7·4=28 L’dir.",
        "Elma suyu payı 12/40=3/10=%30’dur.",
      ],
      optionReasons: [
        "28 L ve %70 suyun miktarı ve oranıdır.",
        "3 bir oran payıdır. Bir payın 4 L olması hesaba katılmamıştır.",
        "%42,86 yaklaşık 3/7’nin yüzdesidir. Bu oran elma suyunu yalnız suyla karşılaştırır.",
        "Elma suyunun 12 L hacmi toplam 40 L’nin %30’udur.",
        "40 L tek bileşenin değil, karışımın miktarıdır.",
      ],
      commonError:
        "Yüzde hesabında bütünün yerine diğer bileşeni paydaya koymak.",
      check: "12+28=40 ve 12:28=3:7.",
    },
  }),
  practice({
    key: "esit-gecisler",
    prompt:
      "Pozitif bir sayı dizisinde her terim, önceki terimin aynı pozitif katsayıyla çarpımıdır. 3. terim 45, 6. terim 1215 ise 1. terim kaçtır?",
    options: ["15", "5", "45", "5/3", "135"],
    answer: 1,
    hint: "3. terimden 6. terime, ardından 3. terimden 1. terime kaç ok gidildiğini ayrı say.",
    guidance: {
      knowledge: [
        "Pozitif sabit katsayı r, her geçişte bir kez çarpılır. Geri geçişte bir kez r’ye bölünür.",
      ],
      strategy:
        "Bilinen terimler arasındaki toplam çarpandan bir geçiş katsayısını çıkar. Sonra 3. terimden iki adım geri git.",
      steps: [
        "3→4→5→6 üç geçiştir. 1215/45=27=r³.",
        "Pozitif r=3’tür.",
        "3. terimden 1. terime iki geçiş geri vardır. 45/3²=5.",
      ],
      optionReasons: [
        "45/3=15, 2. terimdir.",
        "45/3²=5, iki geçiş geri gidildiğinde bulunur.",
        "45 üçüncü terim olarak verilmiştir.",
        "45/27=5/3, geri giderken iki yerine üç geçiş uygular.",
        "45·3=135, geri yerine bir adım ileri gider.",
      ],
      commonError: "İki farklı terim aralığını aynı sayıda geçiş saymak.",
      check: "5, 15, 45, 135, 405, 1215 dizisi verilen iki terime de uyar.",
    },
  }),
  practice({
    key: "iki-kat-is",
    prompt:
      "10 özdeş makine bir işi 12 saatte bitiriyor. İkinci işte 15 özdeş makine, ilk işin iki katı miktarda iş yapacak. Makinelerin saatlik kapasiteleri aynı ve sabit. İkinci iş kaç saat sürer?",
    options: ["16", "8", "18", "20", "24"],
    answer: 0,
    hint: "Makine sayısını değiştirmeden önce ilk ve ikinci işin kaç makine-saat gerektirdiğini belirle.",
    guidance: {
      knowledge: [
        "Eş hızdaki özdeş makinelerde toplam iş, makine sayısı ile çalışma süresinin çarpımına orantılıdır.",
      ],
      strategy:
        "Toplam işi makine-saat olarak ifade et ve yeni makine sayısına böl.",
      steps: [
        "İlk iş 10·12=120 makine-saat gerektirir.",
        "İki kat iş 240 makine-saat gerektirir.",
        "15 makine için 240/15=16 saat gerekir.",
      ],
      optionReasons: [
        "15·16=240, iki kat iş için gereken toplam çalışmadır.",
        "120/15=8, iş miktarı değişmezse geçerlidir.",
        "12·15/10=18, makine sayısını süreyle aynı yönde değiştirir ve yeni işi hesaba katmaz.",
        "15·20=300 makine-saat eder, hedef 240’tır.",
        "12 saati ikiye katlamak, makine sayısını 10’da bırakır.",
      ],
      commonError: "İş sabitmiş gibi yalnız makine sayısı değişimine bakmak.",
      check: "15·16=240=2·10·12.",
    },
  }),
  practice({
    key: "fark-ve-oran-onar",
    prompt:
      "Bir öğrenci C:D=5:9 gördüğünde C=5 ve D=9 sonucuna varıyor. C ve D pozitif, D−C=28 ise öğrencinin modelini düzelten ve C, D değerlerini sırayla veren seçenek hangisidir?",
    options: [
      "C=5, D=9",
      "C=28, D=56",
      "C=7, D=35",
      "C=63, D=35",
      "C=35, D=63",
    ],
    answer: 4,
    hint: "İki miktarı ortak t ile yaz. Bu kez toplam değil, büyük miktar ile küçük miktarın farkı verilmiş.",
    guidance: {
      knowledge: [
        "Oran iki miktarın göreli büyüklüğünü verir. Ortak katsayıyı bulmak için toplam, fark veya tek bir miktar gibi ek bilgi gerekir.",
      ],
      strategy: "C=5t ve D=9t yazıp D−C’nin 28 olması koşulunu kullan.",
      steps: ["D−C=9t−5t=4t.", "4t=28 ise t=7’dir.", "C=5·7=35, D=9·7=63."],
      optionReasons: [
        "Oran sağlanır fakat fark yalnız 4’tür.",
        "Fark 28’dir fakat 28:56=1:2’dir.",
        "Fark 28’dir fakat 7:35=1:5’tir.",
        "Büyüklük sırası ters çevrilirse D−C negatif olur.",
        "63−35=28 ve 35:63=5:9; iki koşul da sağlanır.",
      ],
      commonError:
        "Oranı, ortak ölçek değişemeyecekmiş gibi doğrudan gerçek miktar saymak.",
      check: "Farkı ve oranı birlikte sağlamak gerekir. 63−35=28, 35/63=5/9.",
    },
  }),
  practice({
    key: "kisi-saat-ve-gun",
    prompt:
      "5 eş verimli kişi, günde 4 saat çalışarak 3 günde 180 parça üretiyor. Aynı sabit verimle çalışan 6 kişi, günde 5 saat çalışırsa 210 parçayı ne zaman tamamlar?",
    options: [
      "İkinci günün sonunda",
      "Üçüncü gün 2 saat 30 dakika çalışınca",
      "Üçüncü gün 1 saat 40 dakika çalışınca",
      "Üçüncü günün sonunda",
      "Üçüncü gün 8 saat çalışınca",
    ],
    answer: 2,
    hint: "Önce bir kişi-saatin üretimini bul. İki tam çalışma gününden sonra kaç parça kalır?",
    guidance: {
      knowledge: [
        "İş = kişi başına saatlik verim × kişi sayısı × günlük saat × çalışma günü. Kesirli çalışma gününü o günün çalışma saatine uygula.",
      ],
      strategy:
        "Kişi başına saatlik verimi, yeni günlük üretimi ve son günün kalan süresini ayrı bul.",
      steps: [
        "İlk durumda 5·4·3=60 kişi-saatte 180 parça üretilir. Bir kişi-saatte 3 parça çıkar.",
        "Yeni ekip saatte 6·3=18, günde 5·18=90 parça üretir.",
        "İki tam günde 180 parça çıkar. Son gün kalan 30 parça 30/18=5/3 saat, yani 1 saat 40 dakika sürer.",
      ],
      optionReasons: [
        "İki tam gün yalnız 180 parça verir.",
        "2,5 saatte fazladan 45 parça üretilir. Hedefe daha erken ulaşılır.",
        "180 parça iki tam günde, kalan 30 parça bir saat kırk dakikada üretilir.",
        "Üç tam günde 270 parça üretilir. Hedef üçüncü gün dolmadan tamamlanır.",
        "Bir üçüncü çalışma günü en fazla 5 saattir. Bir takvim gününün üçte birini almak bu çalışma planına uymaz.",
      ],
      commonError:
        "Çalışma gününün bir kesrini takvim gününün kesri gibi hesaplamak.",
      check: "6·(5+5+5/3)·3=210 parça.",
    },
  }),
];
