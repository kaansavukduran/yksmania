import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const speedProblemsSource026Summary =
  "Aurelia 026 Hız Problemleri, içerik 1.2 (19 Kasım 2026), PDF s. 1–10. MEBİ TYT Matematik Konu Özetleri basılı s. 54/PDF s. 56. OGM Problemler Video Ders Notu, PDF s. 16–21. Geçmiş sınavlardan öğren bölümünde 2026 TYT Temel Matematik, 22 ve 24. sorular bulunur.";

const titles = {
  visits: "Ardışık geçişlerin arasındaki yolu izle",
  circuit: "Pistte hareket yönlerinin kapattığı yayı seç",
  signed: "Yeni hareket evresinde konumu yeniden kur",
  intervals: "Pozitif süre aralığını sürat sınırına çevir",
  intersection: "Birden çok günün sürat sınırını birleştir",
  routeMethods: "Birim, toplam zaman ve geçiş yöntemleri",
  conditionMethods: "Akıntı, pist, konum ve ortak aralık yöntemleri",
};

const headers = [
  "Yöntem",
  "Geçerli örnek",
  "Koşul değişirse",
  "Başka bir kullanım",
];

export const speedProblemsSource026Sections: GuideSection[] = [
  {
    title: titles.visits,
    paragraphs: [
      "Bir araç ara duraktan geçtikten sonra bir uçta dönüp aynı ara durağa geliyorsa aradaki saat farkı üç parçadır. Önce uca ulaşır, uçta bekler, aynı ara durağa döner. Beklemeyi geçen süreden çıkar. Aynı kesitte gidiş ve dönüş süratleri eşitse kalan süreyi ikiye böl.",
      "İki geçiş arası 66 dk ve dönüş ucundaki bekleme 10 dk ise bir yön 28 dk sürer. Sonraki iki geçiş arasında araç öteki uçta döner. Orada bekleme 20 dk ve toplam ara 70 dk ise ara duraktan öteki uca tek yön 25 dk. Bir terminalden diğerine kesintisiz hareket 28+25=53 dk sürer. Gidiş ve dönüş süratleri eşit verilmemişse iki eş süre varsayamazsın.",
    ],
  },
  {
    title: titles.circuit,
    paragraphs: [
      "İki koşucu birbirine doğru ilerliyorsa ikisinin o anda kapattığı yayı kullan. Çevresi 500 m pistte A’dan B’ye saat yönünde 140 m olsun. A saat yönünde, B ters yönde ilerlerse ilk karşılaşmada kapanan yay 140 m’dir. İkisi de yön değiştirirse ilk kapanan yay 500−140=360 m olur.",
      "İlk karşılaşmadan sonra tekrar ayrıldıklarında aynı yönde sürat farkı, zıt yönde sürat toplamı kullanılır. Pozitif kapanma hızıyla sonraki her karşılaşma arasında göreli olarak bir çevre alınır. İlk karşılaşma ve sonraki karşılaşmalar farklı zaman aralıkları kullanabilir.",
    ],
  },
  {
    title: titles.signed,
    paragraphs: [
      "Konum grafiği başlangıçtan beri alınan yolu değil, seçilen sıfıra göre o andaki yeri gösterir. Bir aracın −12 m’den +8 m’ye hareketi +20 m yer değiştirmedir. Geri dönüp +3 m’de durduğunda toplam yol 20+5=25 m, net yer değiştirme +15 m olur.",
      "Dönüşten sonraki konum denkleminde, dönüş anındaki konumu ve o andan beri geçen süreyi kullan. Hareketsizken konum sabit kalır. Bir konum eşitliğini çözdüğünde bulunan anın iki denklemin de geçerli olduğu aralıkta kaldığını kontrol et.",
    ],
  },
  {
    title: titles.intervals,
    paragraphs: [
      "Uzunluğu H saat olan bir günde t>0 saat hareket ettiysen hareket dışı süre H−t’dir. Örneğin 1 < (18−t)/t < 2 koşulunda t pozitif olduğu için çarpınca yönler aynı kalır. 2t<18<3t olduğundan 6<t<9 saattir.",
      "Sabit sürat v>0 ve yol d>0 için t=d/v. 0<L<t<U ise d/U<v<d/L olur. Uzun süre daha düşük sürate karşılık gelir. Örneğin 60 km için 6<t<9 şartı 20/3<v<10 verir. Kesin sınırları koru ve gerekiyorsa sonucu en sonda yuvarla.",
    ],
  },
  {
    title: titles.intersection,
    paragraphs: [
      "Aynı süratle iki ayrı gün yol alınıyorsa her günün açık aralığını yaz. Ortak alt sınır, alt sınırların en büyüğü. Ortak üst sınır, üst sınırların en küçüğü. İki sınır da açık olduğunda ortak alt sınırın üst sınırdan küçük olması gerekir.",
      "Yollar 30 ve 60 km, süreler iki günde de 3<t<6 saat ise aralıklar 5<v<10 ve 10<v<20 olur. Aralıklar 10’da birbirine değer ama ortak sürat yoktur. 10 km/sa bir günde 3, ötekinde 6 saat verir. İkisi de süre koşulunun dışında kalır.",
    ],
  },
  {
    title: titles.routeMethods,
    paragraphs: [
      "Aranan niceliği, ortak birimi ve ölçümün başladığı anı belirle. Mola ve geçiş sınırlarını zaman çizgisine yaz.",
    ],
    table: {
      headers,
      rows: [
        [
          "Sabit parçada yol, süre, sürat",
          "18 km/sa ile 2 dk, 5 m/sn · 120 sn=600 m.",
          "Durma evresinde sürat 0’dır. Pozitif yol için d/0 yazılamaz. Evreyi bekleme olarak kaydet.",
          "Dakikada 45 m yürüyen biri 0,9 km’yi 20 dk’da alır.",
        ],
        [
          "Ortalama sürat",
          "90 km, 2 hareket saati ve 15 dk mola ile ortalama 90/(9/4)=40 km/sa.",
          "Yalnız hareket süresi sorulursa 90/2=45 km/sa. Sürülen yol aynı kalır.",
          "Toplam 18 m, 3 dk çalışma ve 2 dk duraklama ile çevrim ortalaması 18/5 m/dk.",
        ],
        [
          "Göreli aralığın yönü",
          "Aynı yönde öndeki 9, arkadaki 12 m/sn. 30 m aralık 10 sn’de kapanır.",
          "Öndeki 12, arkadaki 9 m/sn ise aralık her saniye 3 m büyür.",
          "12 m arayla birbirine doğru 2 ve 1 m/sn gelen iki robot 4 sn’de buluşur.",
        ],
        [
          "Tam geçiş ve iki uç",
          "85 m tren 65 m peronu 15 m/sn ile 10 sn’de tamamen geçer.",
          "Trenin yalnız ön ucu için 65/15 sn. Başlangıç anı ön ucun perona vardığı andır.",
          "9 m ve 6 m araçlar zıt yönde 4 ve 1 m/sn ile ilk temas hizasından itibaren 3 sn’de tamamen ayrılır.",
        ],
      ],
    },
  },
  {
    title: titles.conditionMethods,
    paragraphs: [
      "Kıyı, pist ve konum için ortak referansı yaz. Ortak sürat gerekiyorsa her koşulu aynı v üzerinde denetle.",
    ],
    table: {
      headers,
      rows: [
        [
          "Akıntıda kıyıya göre sürat",
          "Durgun su 13, akıntı 5 km/sa. Aşağı 18, yukarı 8 km/sa.",
          "Tekne akıntıya karşı yönelmişken akıntı 13 olursa kıyıya göre sabit kalır. Akıntı daha hızlıysa aşağı sürüklenir.",
          "Yürüyen bantta 2 m/sn, bant 1/2 m/sn ise bant yönünde yere göre 2,5 m/sn.",
        ],
        [
          "Pistte ilk ve sonraki karşılaşmalar",
          "Çevre 300 m. Hızlı olan 45 m geride, aynı yönde fark 3 m/sn ise ilk yetişme 15 sn.",
          "Sonraki yetişme için 300 m göreli yol gerekir. İlk andan 100 sn sonra yeniden yan yana gelirler.",
          "Bir tur arayla geçen aynı işaret, sonraki tam çevre süresini ölçmek için kullanılabilir.",
        ],
        [
          "Konum ve geçerli an",
          "xA=−4+3t ve xB=8−t için t=3, x=5. Birimler m ve sn ise ortak konum 5 m.",
          "B 2. saniyede durursa xB=6’da kalır. Yeni buluşma zamanı xA=6’dan 10/3 sn.",
          "Bir cihazın konumu bekleme boyunca sabitse konum grafiği o aralıkta yataydır.",
        ],
        [
          "Ortak hız aralığı",
          "4<t<8 saat, yollar 40 ve 56 km. Aralıklar 5<v<10 ve 7<v<14. Ortak 7<v<10.",
          "İkinci yol 80 km olsaydı alt sınır 10 olurdu. Açık aralıklarda ortak sürat kalmaz.",
          "Aynı yazıcı hızı iki farklı boyuttaki paket için verilen süre sınırlarının ikisini de sağlamalıdır.",
        ],
      ],
    },
  },
];

export const speedProblemsSource026SheetText = new Map<string, string[]>([
  [
    titles.visits,
    [
      "Ara noktadan aynı ara noktaya dönüşte uç beklemesini çıkar. Eş süreli gidiş ve dönüşte kalan ikiye bölünür.",
    ],
  ],
  [
    titles.circuit,
    [
      "İlk karşılaşmada kapanan yayı yönlerden seç. Daha sonraki karşılaşmaların arası bir çevre / göreli sürat.",
    ],
  ],
  [
    titles.signed,
    [
      "Yeni evreyi son konumdan ve evrenin başlangıç anından kur. Etkin denklemlerin zaman aralıklarını kontrol et.",
    ],
  ],
  [
    titles.intervals,
    [
      "d,v>0 ve 0<L<U için L<d/v<U ise d/U<v<d/L. Uzun süre alt sürat sınırına karşılık gelir.",
    ],
  ],
  [
    titles.intersection,
    [
      "Alt sınırların büyüğünü ve üst sınırların küçüğünü al. Açık sınırlar birbirine eşitse ortak çözüm yoktur.",
    ],
  ],
  [
    titles.routeMethods,
    [
      "Birimleri önce eşitle. Yol paya, sorunun kapsadığı hareket ve bekleme süreleri paydaya girer.",
    ],
  ],
  [
    titles.conditionMethods,
    [
      "Kıyıya göre hareket yönünü u−a’nın işaretinden belirle. Pistte ilk yay ile tam çevreyi, konumda işaretli değişimle toplam yolu ayır.",
    ],
  ],
]);

export const speedProblemsSource026Examples: WorkedExample[] = [
  {
    title: "Bekleme ve dönüşten sonra yolu ve konumu ayır",
    prompt:
      "Robot x=−10 m’den sağa doğru 3 dk boyunca 5 m/dk ile ilerliyor. Sonra 2 dk bekliyor ve 3 dk boyunca sola 8 m/dk ile gidiyor. İlk evrenin sonu x=5 m. Toplam yolu ve yer değiştirmeyi bul.",
    strategy:
      "Bekleme ve dönüşü ayrı yaz. Yer değiştirmede son konumdan ilk konumu çıkar.",
    steps: [
      { label: "İlk hareket", explanation: "Sağa 3·5=15 m gider, x=5 m." },
      {
        label: "Bekleme ve dönüş",
        explanation: "Beklemede x aynı kalır, dönüşte sola 3·8=24 m gider.",
        expression: "xson=5−24=−19 m",
      },
      {
        label: "Yol ve yer değiştirme",
        explanation: "Yol 15+24=39 m, yer değiştirme −19−(−10)=−9 m.",
      },
    ],
    answer: "Toplam yol 39 m, yer değiştirme −9 m.",
    check: "Sağa 15 ve sola 24 m hareketin yönlü toplamı 15−24=−9 m.",
    pitfall: "Dönüş yolunu negatif uzunluk sayıp toplam yol olarak 9 m vermek.",
  },
  {
    title: "Açık aralıklarda ortak uç değeri denetle",
    prompt:
      "Bir araç iki ayrı günde aynı sabit süratle 45 ve 75 km yol alıyor. Her gün hareket süresi kesin olarak 3 saatten fazla ve 5 saatten az olmalı. Tek bir sürat iki koşulu sağlayabilir mi?",
    strategy:
      "Her gün için olası sürat aralığını yaz ve aralıkların dokunduğu değeri gerçek sürelerle test et.",
    steps: [
      { label: "İlk gün", explanation: "45 km için 45/5<v<45/3, yani 9<v<15." },
      {
        label: "İkinci gün",
        explanation: "75 km için 75/5<v<75/3, yani 15<v<25.",
      },
      {
        label: "Ortak hız",
        explanation:
          "Birinci gün 15’ten küçük, ikinci gün 15’ten büyük sürat ister.",
      },
    ],
    answer: "İki koşulu aynı anda sağlayan sürat yoktur.",
    check: "15 km/sa ilk günü 3, ikinciyi 5 saat yapar. İki uç da dışarıdadır.",
    pitfall: "Aralıkların birbirine değdiği 15’i çözüm olarak almak.",
  },
];

export const speedProblemsSource026Recall = [
  {
    prompt:
      "Bir araç ara duraktan bir terminale gidip dönerek aynı duraktan tekrar geçiyor. İki geçiş arası 58 dk ve o uçta 18 dk bekliyor. Gidiş ve dönüş eş süreliyse ara durakla uç arası kaç dk?",
    answer: "20 dk. Bekleme çıktıktan sonra 40 dk iki eş yol süresidir.",
  },
  {
    prompt:
      "Aynı yönlü iki trenin tamamen ayrılması için hangi uzunluklar kullanılır?",
    answer:
      "İlk hizalanmadan itibaren iki trenin uzunlukları, arada başlangıç boşluğu varsa ölçümün başında o boşluk da eklenir.",
  },
  {
    prompt:
      "d>0 için t aralığı 4<t<6 ise sürat aralığının küçük ucunda d/4 mü, d/6 mı vardır?",
    answer:
      "d/6. Aynı yolda daha uzun geçen süre daha düşük sürattir. Uçlar açık kalır.",
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
    id: `hiz-problemleri-026-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "Hız Problemleri",
    guidance,
  };
}

export const speedProblemsSource026Practice: Question[] = [
  practice({
    key: "ara-durak-iki-farkli-bekleme",
    prompt:
      "Bir tramvay batı ve doğu terminalleri arasında gidip geliyor. Her yol kesitini iki yönde de aynı sürede alıyor. Ara duraktan sırasıyla doğuya 09.18, batıya 10.10 ve doğuya 11.14’te geçiyor. Batı terminalinde 16 dk, doğuda 12 dk bekliyor. Bir terminalden ötekine beklemesiz hareket süresi kaç dakikadır?",
    options: ["44 dk", "29 dk", "52 dk", "58 dk", "72 dk"],
    answer: 0,
    hint: "09.18–10.10 arasında hangi terminalde dönüyor? Bu aralıktan o durağın beklemesini çıkar.",
    guidance: {
      knowledge: [
        "Ara noktadan bir uca gidip aynı noktaya dönmek, o kesiti iki kez almak demektir.",
      ],
      strategy:
        "Ardışık geçişlerin farklarından, dönülen uçtaki beklemeyi çıkar.",
      steps: [
        "İlk iki geçiş arası 52 dk. Doğuda 12 dk bekler. Ara durak ile doğu arasında tek yön (52−12)/2=20 dk.",
        "Son iki geçiş arası 64 dk. Batıda 16 dk bekler. Ara durak ile batı arasında tek yön (64−16)/2=24 dk.",
        "Terminaller arası beklemesiz hareket 20+24=44 dk.",
      ],
      optionReasons: [
        "Tek yönlü 20 ve 24 dakikalık iki kesit arka arkaya alınır.",
        "29 dk, 52 ve 64’ün toplamını dörde bölerek çıkar. Bu işlem beklemeyi çıkarmaz ve tek kesit ortalamasını verir.",
        "52 dk ilk iki geçiş arasındaki doğu gidiş-dönüşü ile beklemenin toplamıdır.",
        "58 dk, (52+64)/2’dir. İki terminal beklemesi içinden toplam 28 dakika önce çıkarılmalıdır.",
        "72 dk, doğru 44 dakikaya iki beklemeyi ekler. Soru beklemesiz hareketi sorar.",
      ],
      commonError:
        "İki geçiş arasındaki tüm sürenin hareket süresi olduğunu varsaymak.",
      check: "20+12+20=52 dk ve 24+16+24=64 dk, iki saat farkıyla eşleşir.",
    },
  }),
  practice({
    key: "hareket-ve-yolculuk-ortalamasi",
    prompt:
      "Sürücü 42 km’yi 42 km/sa, ardından 18 km’yi 36 km/sa sabit süratle alıyor. Arada 30 dk boyunca duruyor. Tüm yolculuk ve yalnız hareket için ortalama süratleri sırasıyla kaç km/sa olur?",
    options: ["30 ve 30", "30 ve 40", "40 ve 40", "39 ve 40", "40 ve 30"],
    answer: 1,
    hint: "Toplam yol her iki ortalamada aynı. İki toplam sürede molanın yerini ayrı yaz.",
    guidance: {
      knowledge: [
        "Ortalama sürat, kapsanan toplam yolun kapsanan toplam süreye bölümüdür.",
      ],
      strategy:
        "Her yol süresini saat cinsinden bul. Önce molalı, sonra molasız ortalamayı hesapla.",
      steps: [
        "Hareket süreleri 42/42=1 saat ve 18/36=1/2 saat. Toplam yol 60 km.",
        "Mola ile toplam 1+1/2+1/2=2 saat. Yolculuk ortalaması 60/2=30 km/sa.",
        "Yalnız hareket 3/2 saat. Hareket ortalaması 60/(3/2)=40 km/sa.",
      ],
      optionReasons: [
        "30 km/sa hesaplanırken mola da sayılır. Yalnız hareket için payda daha küçüktür.",
        "Yol aynı 60 km. İki süre sırasıyla 2 ve 3/2 saattir.",
        "40 km/sa, molasız ortalamadır. Tüm yolculukta mola süreyi artırır.",
        "39, 42 ve 36’nın aritmetik ortalamasıdır. İki süratte geçen süreler eşit değildir ve mola da vardır.",
        "Mola ortalama sürati düşürür. 30 km/sa tüm yolculuğa aittir.",
      ],
      commonError:
        "Her iki ortalamada aynı süreyi almak veya iki sürati eşit ağırlıklı saymak.",
      check: "30·2=60 ve 40·1,5=60 km.",
    },
  }),
  practice({
    key: "iki-trenin-tam-gecisi",
    prompt:
      "Paralel raylarda aynı yönde giden 180 m uzunluğundaki hızlı tren 90 km/sa, 120 m uzunluğundaki diğer tren 54 km/sa sabit süratle ilerliyor. Başlangıçta hızlı trenin önü, öndeki trenin arkasının 60 m gerisinde. Bu andan itibaren hızlı trenin önü, yavaş trenin arkasıyla kaçıncı saniyede hizalanır? Hızlı trenin arkası, yavaş trenin önüne ulaştığında tam geçiş kaçıncı saniyede tamamlanır?",
    options: ["6 ve 30", "15 ve 36", "6 ve 36", "0 ve 30", "6 ve 24"],
    answer: 2,
    hint: "Hız farkını m/sn’ye çevir. İlk hizalanmada yalnız boşluk, tam geçişte iki trenin uzunluğu da kapanır.",
    guidance: {
      knowledge: [
        "İki tren için aynı yönde göreli sürat, öndeki daha yavaşsa sürat farkıdır.",
      ],
      strategy:
        "Yavaş trenin referansından, hızlı trenin önünün göreli hareketini kullan.",
      steps: [
        "Sürat farkı 90−54=36 km/sa=10 m/sn.",
        "İlk hizalanmaya kadar 60 m boşluk kapanır. 60/10=6 sn.",
        "Tam geçişe kadar 60+120+180=360 m göreli yol gerekir. 360/10=36 sn.",
      ],
      optionReasons: [
        "30 sn ilk hizalanmadan sonraki geçiş süresidir. Başlangıçtan 6 sn daha sayılır.",
        "15 sn için 150 m göreli yol gerekir. İlk hizalanmaya yalnız 60 m yeter.",
        "İlk ölçüm 6 sn, iki uzunluk için ek 30 sn. Tam geçiş başlangıçtan 36 sn sonra.",
        "İlk anda 60 m boşluk var. İki tren henüz hizalanmış değildir.",
        "24 sn’de 240 m göreli yol alınır. Tamamlanma için gereken 360 m’den azdır.",
      ],
      commonError:
        "Ön uç hizalanınca bütün trenin geçtiğini sanmak veya süreyi hizalanma anından saymak.",
      check:
        "Başlangıçta yavaş trenin arkası 0, önü 120 m olsun. Hızlı trenin arkası −240 m’den 36·10=360 m ilerleyip 120 m’ye gelir.",
    },
  }),
  practice({
    key: "akinti-esiginde-kiyiya-gore",
    prompt:
      "Bir tekne aynı akıntıda kıyıya göre akıntıyla 21 km’yi 1,5 saatte, akıntıya karşı 20 km’yi 2,5 saatte alıyor. Sonra akıntı sürati 11 km/sa olan başka bir yerde teknenin suya göre sürati değişmiyor ve tekne akıntıya karşı yöneliyor. Durgun sudaki sürati ve bu yeni yerde kıyıya göre hareketi nedir?",
    options: [
      "14 km/sa ve akıntı yönüne sürüklenir.",
      "8 km/sa ve kıyıya göre yerinde kalır.",
      "11 km/sa ve akıntı yönüne sürüklenir.",
      "11 km/sa ve kıyıya göre yerinde kalır.",
      "22 km/sa ve kıyıya göre yerinde kalır.",
    ],
    answer: 3,
    hint: "Önce iki kıyı süratini bul. Toplamlarının yarısı, teknenin suya göre süratidir.",
    guidance: {
      knowledge: [
        "Akıntı yönündeki ve karşısındaki kıyı süratleri u+a ve u−a’dır. Karşı yöndeki sonuç sıfırsa kıyıya göre ilerleme olmaz.",
      ],
      strategy: "İlk iki ölçümle u’yu bul. Yeni akıntıyı bu u’dan çıkar.",
      steps: [
        "Akıntıyla sürat 21/1,5=14 km/sa, akıntıya karşı sürat 20/2,5=8 km/sa.",
        "u+a=14 ve u−a=8. Toplayınca 2u=22, u=11 km/sa.",
        "Yeni durumda u−a=11−11=0. Kıyıya göre yerinde kalır.",
      ],
      optionReasons: [
        "14 km/sa ilk yerdeki akıntıyla kıyı süratidir. Teknenin suya göre sürati farklıdır.",
        "8 km/sa ilk yerdeki akıntıya karşı kıyı süratidir. Yeni akıntıyla dengelenen suya göre sürat 11’dir.",
        "Suya göre 11, yeni akıntının da 11 olması tam denge verir.",
        "Suya göre hareket ile akıntı eş büyüklükte ve ters yönlerde. Kıyı hızı 0.",
        "22 km/sa iki kıyı süratinin toplamıdır. Suya göre süratin iki katıdır.",
      ],
      commonError:
        "Ölçülen kıyı süratini suya göre sürat olarak kullanmak veya yönü unutmak.",
      check:
        "İlk akıntı 3 km/sa’dır. 11+3=14 ve 11−3=8. Yeni akıntı 11 olduğu için 11−11=0.",
    },
  }),
  practice({
    key: "yonlu-yay-ucuncu-karsilasma",
    prompt:
      "Çevresi 360 m olan pistte A’nın başlangıç noktasından B’nin başlangıç noktasına saat yönündeki yay 100 m. Aynı anda A saat yönünde 7 m/sn, B ters yönde 3 m/sn sabit süratle koşuyor. Başlangıçtan sonraki üçüncü karşılaşma kaçıncı saniyededir?",
    options: ["10", "36", "72", "98", "82"],
    answer: 4,
    hint: "İlk karşılaşmada saat yönündeki 100 m’lik yay kapanır. Sonraki karşılaşmaların arası bir çevrelik göreli harekettir.",
    guidance: {
      knowledge: [
        "Zıt yönde koşanların göreli kapanma sürati, süratlerin toplamıdır.",
      ],
      strategy:
        "İlk yaklaşma aralığını ve karşılaşmalar arasındaki süreyi ayrı bul.",
      steps: [
        "İlk kapanan yay 100 m. Sürat toplamı 7+3=10 m/sn. İlk karşılaşma 100/10=10. saniye.",
        "Sonraki her karşılaşma için 360/10=36 sn daha gerekir.",
        "Üçüncü karşılaşma 10+2·36=82. saniye.",
      ],
      optionReasons: [
        "10. saniye ilk karşılaşmadır.",
        "36 sn ilk buluşma zamanı değil, sonraki iki karşılaşma arasındaki süredir.",
        "72 sn ilk ve üçüncü karşılaşmalar arasındaki süredir. Başlangıçtan ilk buluşmaya 10 sn de eklenir.",
        "98 sn, ilk karşılaşmayı 260 m’lik ters yay ile hesaplar. Verilen yönlerde ilk kapanan 100 m’dir.",
        "10 ve 46’dan sonra üçüncü karşılaşma 82. saniyededir.",
      ],
      commonError: "İlk kapanacak yayı tam tur veya diğer yay olarak almak.",
      check:
        "82 saniyede A, 574 m ilerler. Aynı saat yönü ekseninde B’nin yeri 100−246=−146 m; koordinat farkı 720 m, tam iki tur.",
    },
  }),
  practice({
    key: "iki-gun-acik-surat-araligi",
    prompt:
      "Bir sürücü iki ayrı günün her birindeki 18 saatlik plan boyunca, araç kullandığı kısımlarda aynı sabit v süratiyle yol alıyor. İlk gün 72, ikinci gün 96 km gidiyor. Her gün plan içindeki sürüş dışı sürenin sürüş süresine oranı 2’den büyük, 7/2’den küçük. İki koşulu da sağlayan v değerleri hangileridir? Sürat birimi km/sa.",
    options: ["12<v<18", "16<v<24", "16<v<18", "16≤v≤18", "18<v<24"],
    answer: 2,
    hint: "Pozitif sürüş süresine t de. Önce 2<(18−t)/t<7/2 eşitsizliğinden t aralığını bul.",
    guidance: {
      knowledge: [
        "Pozitif t ve v ile çarpınca eşitsizlik yönü korunur. Aynı v iki günün de koşulunu sağlamalıdır.",
      ],
      strategy:
        "Sürüş süresi aralığını her günün yoluyla ayrı ayrı sürat aralığına çevir ve kesişimi al.",
      steps: [
        "2<(18−t)/t<7/2 eşitsizliğinden 3t<18 ve 18<(9/2)t çıkar. Dolayısıyla 4<t<6.",
        "İlk gün 72/6<v<72/4, yani 12<v<18. İkinci gün 96/6<v<96/4, yani 16<v<24.",
        "Alt sınırların büyüğü 16, üst sınırların küçüğü 18. İkisi de açık.",
      ],
      optionReasons: [
        "Bu yalnız ilk günün aralığıdır. Örneğin 14 km/sa ikinci günü 6 saatten uzun yapar.",
        "Bu yalnız ikinci günün aralığıdır. Örneğin 20 km/sa ilk günü 4 saatten kısa yapar.",
        "16’dan büyük, 18’den küçük her sürat iki açık aralığın da içindedir.",
        "16 ikinci günü 6 saat, 18 ilk günü 4 saat yapar. İki eşitlik de yasaktır.",
        "18’den büyük süratler ilk gün 72 km’yi 4 saatten kısa sürede tamamlar.",
      ],
      commonError:
        "İki günün aralıklarının birleşimini almak veya açık uçları çözüme katmak.",
      check:
        "17 için 4<72/17<6 ve 4<96/17<6. Alt ve üst sınırın ikisi de dışarıdadır.",
    },
  }),
];
