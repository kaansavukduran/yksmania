import { guidedMathPractice } from "./guidedMathPractice";

export const lineAnglesPractice042 = guidedMathPractice(
  "tyt-geo-acilar-kaynak-pekitirme-032",
  [
    {
      id: "source-001-bisectors",
      prompt:
        "Yan yana duran 74° ve 106° iki açının dış kolları zıt ışındır. İç açıortayları arasındaki açı kaç derecedir?",
      options: [
        ["37°", "37°, yalnız 74°lik açının yarısı."],
        ["90°", "Açıortaylar ortak kolun iki tarafında 37° ve 53° uzaklıkta."],
        ["53°", "53°, yalnız 106°lik açının yarısı."],
        ["16°", "Fark alma, açıortaylar ortak kolun zıt tarafında."],
        ["180°", "180° dış kolların açısı. Açıortaylar içeride."],
      ],
      answer: 1,
      knowledge:
        "Doğrusal çift 180° eder. İç açıortay kendi açısını ikiye böler.",
      strategy: "İki yarım açıyı ortak koldan başlayarak topla.",
      steps: [
        "74° ve 106° ölçüleri 180° eder.",
        "74/2=37 ve 106/2=53.",
        "İki yarı 37+53=90° yapar.",
      ],
      commonError: "Açıortayların ortak kola uzaklıklarının farkını almak.",
      check: "Aynı sonuç 180°/2 ile bulunur.",
    },
    {
      id: "source-001-parallel-complement",
      prompt:
        "Bir kesen iki paralel doğruyu kesiyor. Aynı yandaki iç açıların ölçüleri (2x+14)° ve (4x−8)°. Dar açının tümleri kaç derecedir?",
      options: [
        ["72°", "Bu dar açının kendi ölçüsü."],
        ["108°", "Bu geniş açı ve dar açının bütünleri."],
        ["29°", "Bu denklemdeki x değeri. Sorulan açı değil."],
        ["18°", "Dar açı 72° olduğundan 90°−72°=18°."],
        ["28°", "28° eklemek 72°yi 100°ye ulaştırır."],
      ],
      answer: 3,
      knowledge:
        "Paralellerde aynı yandaki iç açılar bütünler. Tümlerinin toplamı 90°.",
      strategy:
        "Önce iç açıların toplamından x’i bul, sonra dar açıyı 90°ye tamamla.",
      steps: [
        "6x+6=180, x=29.",
        "Ölçüler 72° ve 108°.",
        "Dar açının tümleri 18°.",
      ],
      commonError:
        "Aynı yandaki iç açıları eşitlemek veya tümleri 180°ye tamamlamak.",
      check: "72+108=180 ve 72+18=90.",
    },
    {
      id: "source-001-no-parallel",
      prompt:
        "İki ayrı doğruyu bir kesen kesiyor. Doğruların paralel olduğu verilmemiş. Bir kesişimdeki açı 64°. Aşağıdakilerden hangisi kesin?",
      options: [
        [
          "Aynı kesişimde ters açı 64°.",
          "Ters açılar iki doğrunun aynı kesişiminde her zaman eşit.",
        ],
        [
          "Diğer kesişimde yöndeş açı 64°.",
          "Kesişimler arasında bu eşitlik için paralellik gerekir.",
        ],
        [
          "Diğer kesişimde iç ters açı 64°.",
          "Koşul verilmediğinden iç ters ölçü eşitliği çıkmaz.",
        ],
        [
          "Aynı kesişimde doğrusal komşu açı 64°.",
          "Doğrusal komşu 180−64=116° olur.",
        ],
        ["Kesen iki doğruya da dik.", "64° ölçülen kesişim dik değildir."],
      ],
      answer: 0,
      knowledge: "İlk olarak ölçüsü verilen tek kesişime bak. Bir doğru üzerindeki iki komşu açının toplamı 180°.",
      strategy: "64°nin komşusunu bulmak için aynı düz çizgi üzerindeki iki bölgeyi izle.",
      steps: [
        "64°ye doğrusal komşu 116°.",
        "Karşı açı da 116° ile doğrusal çift.",
        "180°−116°=64° kaldığı için karşı açı 64°.",
      ],
      commonError:
        "Ters ve iç ters açıları sırf adları benziyor diye aynı kural sanmak.",
      check: "Dört açı 64°, 116°, 64°, 116° olarak 360°yi tamamlar.",
    },
    {
      id: "source-001-adjacent-sum",
      prompt:
        "Komşu iki açının ölçüleri 35° ve 45°. Dış kolların aynı doğru üzerinde olması hakkında ne söylenebilir?",
      options: [
        ["Dış kollar zıt ışındır.", "Zıt ışın olsalardı toplam 180° olurdu."],
        ["Dış kollar dik.", "Dik dış kollar için iç tarafta 90° gerekir."],
        ["Dış kollar arası 80°.", "Komşu bölgeleri birleştirince 35°+45°=80°."],
        [
          "Dış kollar arası 10°.",
          "Fark, bölgeler aynı kolun aynı yanında örtüşseydi ilgili olabilirdi.",
        ],
        [
          "Bu iki açı komşu olamaz.",
          "Komşuluk için toplamın 180° olması gerekmez.",
        ],
      ],
      answer: 2,
      knowledge:
        "Komşuluk ortak köşe ve kolla ilgilidir. Böyle iki iç bölge örtüşmez.",
      strategy: "Komşu bölgeleri birleştir ve toplamı 180° ile karşılaştır.",
      steps: [
        "Komşu bölgelerin ortak kolunu bul.",
        "Dış kolların arası 35°+45°=80°.",
        "80° doğru açıdan küçük, kollar zıt değil.",
      ],
      commonError: "Her komşu açı çiftini doğrusal çift kabul etmek.",
      check: "80°lik açının içine bir ışın çizip 35° ve 45° ayırabilirsin.",
    },
  ],
);

export const triangleAnglesPractice042 = guidedMathPractice(
  "tyt-geo-ucgende-acilar-031",
  [
    {
      id: "source-002-two-exterior",
      prompt:
        "ABC üçgeninde A=56°. B ve C dış açıortayları X’te kesişiyor. ∠BXC kaç derecedir?",
      options: [
        ["118°", "Bu B ve C’nin iki iç açıortayı arasındaki I açısı."],
        ["28°", "Bu tek açıortay dışa çevrilirse oluşan dar açı."],
        ["62°", "İki dışın B ve C’ye giden kolları 90°−28° yapar."],
        ["56°", "56° A köşesindeki açı. X açısı başka bölgede."],
        ["124°", "Bu B+C toplamı. X’te işaretlenen açı değil."],
      ],
      answer: 2,
      knowledge:
        "B ve C dış açıortaylarının kesişiminde B ve C’ye giden açı 90°−A/2.",
      strategy: "İki dış seçildiği için A’nın yarısını 90°den çıkar.",
      steps: [
        "B ve C’de iki dış açıortay seçildiği için X’teki açı 90°−A/2.",
        "A’nın yarısı 56°/2=28°.",
        "∠BXC=90°−28°=62°.",
      ],
      commonError:
        "İki dış açıortaya iç merkezdeki 90°+A/2 kuralını uygulamak.",
      check: "İç merkezdeki 118° ve bu bölge 62° toplamı 180°.",
    },
    {
      id: "source-002-mixed",
      prompt:
        "A=76° olan ABC üçgeninde B’nin iç ve C’nin dış açıortay doğruları kesişiyor. Bu iki doğru arasındaki dar açı kaç derecedir?",
      options: [
        ["38°", "Bir iç ve bir dış açıortayda dar bölge A/2."],
        ["52°", "Bu iki dış açıortay için 90°−A/2 değeridir."],
        ["128°", "Bu iki iç açıortayın BIC bölgesi."],
        ["76°", "Bu A’nın yarısı değil tam ölçüsü."],
        ["104°", "Bu B+C toplamı. Açıortayların dar açısı değil."],
      ],
      answer: 0,
      knowledge: "Dış ve iç açıortay doğruları aynı köşede diktir.",
      strategy:
        "İki iç açıortay değerinden, tek doğrunun dik çevrilmesinin etkisini çıkar.",
      steps: [
        "A’nın yarısı 76°/2=38°.",
        "İki iç açıortayın BIC açısı 90°+38°=128°.",
        "C doğrusu 90° döndüğü için dar bölge 38°.",
      ],
      commonError: "Bir iç bir dış seçimini iki dışla karıştırmak.",
      check: "Dar bölge 38° ve öteki bölge 142°.",
    },
    {
      id: "source-002-reverse",
      prompt:
        "ABC üçgeninde B ile C’nin iç açıortayları I’da birleşiyor. ∠BIC=123° ise A kaç derecedir?",
      options: [
        ["33°", "90°den sonraki fark A’nın yarısı."],
        ["57°", "Bu I’daki 123°nin bütünleri."],
        ["66°", "Bir yarı 123°−90°=33°, tamamı 66°."],
        ["114°", "Bu B+C toplamı."],
        ["24°", "Yerine konursa 90°+12°=102° çıkar."],
      ],
      answer: 2,
      knowledge: "İki iç açıortay için ∠BIC=90°+A/2.",
      strategy: "Önce 90°yi çıkar, sonra farkı iki ile çarp.",
      steps: [
        "İki açıortay içte olduğundan 123°=90°+A/2.",
        "A/2=123°−90°=33°.",
        "Yarımı ikiyle çarpınca A=66°.",
      ],
      commonError: "A’nın tamamı ile yarısını karıştırmak.",
      check: "90+66/2=123.",
    },
    {
      id: "source-002-ratio",
      prompt:
        "Bir üçgende dış açı 135°. Bu dış açıya uzak iki iç açı 5:4 oranında. Üç iç açı hangi ölçülerdir?",
      options: [
        ["75°, 60°, 45°", "9 pay 135°, bir pay 15°. Komşu iç açı 45°."],
        ["75°, 60°, 135°", "135° dış açıdır ve iç açı listesine girmez."],
        ["80°, 55°, 45°", "Toplam doğru ama 80:55 oranı 5:4 değil."],
        [
          "100°, 80°, 45°",
          "Uzak açıları 180°ye bölüştürür. Bunların toplamı 135° olmalı.",
        ],
        ["50°, 40°, 90°", "Oran doğru fakat uzak açıların toplamı 90°."],
      ],
      answer: 0,
      knowledge: "Dış açı uzak iki iç açıyı toplar, komşu iç açıyla 180° olur.",
      strategy: "5t+4t=135° yaz ve üçüncü iç açıyı ayrıca bul.",
      steps: [
        "Uzak açıları 5t ve 4t yaz. Toplamları 9t=135°.",
        "Bir pay 15°, uzak açılar 75° ve 60°.",
        "Dış açıya komşu iç açı 180°−135°=45°.",
      ],
      commonError: "Dış açıyı üç iç açıdan biri olarak listelemek.",
      check: "75+60+45=180 ve 75:60=5:4.",
    },
    {
      id: "source-002-compound",
      prompt:
        "ABC üçgeninde A’daki dış açı 136°, B=3C. B’nin iç açıortayı AC’yi D’de kesiyor. ∠BDC kaç derecedir?",
      options: [
        ["85°", "Bu D’deki komşu ∠BDA. İstenen açı onun bütünleri."],
        ["95°", "BDC içinde B yarısı 51° ve C 34°. Fark 95°."],
        ["44°", "Bu ABC’nin A köşesindeki iç açı."],
        ["51°", "Bu ∠DBC, açının köşesi B."],
        ["129°", "Bu yalnız 51°yi 180°den çıkarır, C’yi de çıkarmalısın."],
      ],
      answer: 1,
      knowledge: "Açıortay B’yi eş böler. Her küçük üçgende açı toplamı 180°.",
      strategy: "Dış açıdan B ve C’yi bul, sonra yalnız BDC’ye bak.",
      steps: ["4C=136°, C=34°, B=102°.", "∠DBC=51°.", "∠BDC=180−51−34=95°."],
      commonError: "D’de istenen taraftaki açı yerine onun komşusunu seçmek.",
      check: "ABD’de 180−44−51=85 ve D’de 85+95=180.",
    },
  ],
);

export const triangleSidesPractice042 = guidedMathPractice(
  "tyt-geo-ucgen-esitsizligi-031",
  [
    {
      id: "source-003-common-integers",
      prompt:
        "İki üçgen bir x kenarını paylaşıyor. Birincinin öteki kenarları 5 ve 10, ikincinin 4 ve 15 birim. x kaç farklı tam sayı değeri alır?",
      options: [
        ["9", "5<x<15 ilk üçgen için dokuz değer. İkinciyi de denetle."],
        ["7", "11<x<19 ikinci üçgen için yedi değer. Birinciyi de denetle."],
        ["5", "11 ve 15 uçlarını gerçek üçgen saymak iki değer ekler."],
        ["3", "11<x<15 ortak aralığında 12, 13 ve 14 var."],
        ["0", "Ortak açık aralık boş değildir."],
      ],
      answer: 3,
      knowledge: "Ortak kenar, her iki açık aralığa birden girmeli.",
      strategy: "Alt sınırların büyüğünü ve üstlerin küçüğünü al.",
      steps: [
        "İlk üçgen 5<x<15, ikinci 11<x<19 verir.",
        "Kesişim 11<x<15.",
        "12, 13, 14 olmak üzere üç tam sayı var.",
      ],
      commonError: "Aralığın birini seçip öbür koşulu kontrol etmemek.",
      check: "11 ikinci üçgenin, 15 ilk üçgenin doğrusal sınırı.",
    },
    {
      id: "source-003-touching-bounds",
      prompt:
        "Birinci üçgende ortak kenar x dışındaki kenarlar 4 ve 6. İkinci üçgende 4 ve 14. İki gerçek üçgen aynı x ile kurulabilir mi?",
      options: [
        [
          "Evet, x=10.",
          "10 iki koşulda da açık uç. Her iki şekil doğrusal kalır.",
        ],
        ["Evet, 2<x<10.", "Bu aralık yalnız birinci üçgene uyar."],
        ["Evet, 10<x<18.", "Bu aralık yalnız ikinci üçgene uyar."],
        ["Evet, x=14.", "14, ilk üçgenin 10 üst sınırını geçer."],
        ["Hayır.", "Aralıklar 2<x<10 ve 10<x<18. Ortak değer yok."],
      ],
      answer: 4,
      knowledge:
        "Açık aralıklar aynı sayıda sonlanıp başlasa da o sayı dahil değildir.",
      strategy: "Her üçgen için ayrı fark ve toplam sınırı yaz.",
      steps: [
        "İlk üçgen aralığı (2,10).",
        "İkinci üçgen aralığı (10,18).",
        "Tek temas 10 ve iki aralıkta da açık.",
      ],
      commonError: "İki aralığın ortak sınır değerini izinli kabul etmek.",
      check: "4+6=10, 10+4=14. Her ikisinde de eşitlik alanı sıfır yapar.",
    },
    {
      id: "source-003-perimeter",
      prompt:
        "Çevresi 22 birim olan bir üçgenin kenarları pozitif tam sayı. En uzun kenarın alabileceği en büyük değer nedir?",
      options: [
        ["11", "Uzun kenar ile kalan toplam 11 olursa üçgen kapanmaz."],
        ["10", "x<11 olduğundan en çok 10. 5,7,10 bunu sağlar."],
        ["12", "Geriye toplam 10 kalır, 12’yi aşamaz."],
        ["9", "9 geçerli bir uzun kenar olabilir ama 10 da mümkün."],
        [
          "22",
          "Çevrenin tamamını bir kenar alsa diğer kenarlara uzunluk kalmaz.",
        ],
      ],
      answer: 1,
      knowledge: "En uzun kenar, öteki iki kenarın toplamından küçük.",
      strategy:
        "Kalan kenarların toplamını 22−x yaz. Bulduğun üst değere örnek ver.",
      steps: [
        "x<22−x ⇒ 2x<22 ⇒ x<11.",
        "Tam sayı en çok 10.",
        "5+7+10=22 ve 5+7>10.",
      ],
      commonError: "Yarı çevreye eşit uzunluğu gerçek üçgene dahil etmek.",
      check: "10’un mümkün olduğu örnekte en büyük kenarı 10 seçtik.",
    },
    {
      id: "source-003-obtuse",
      prompt:
        "İki kenarı 7 ve 9 birim olan bir üçgende üçüncü kenar x en uzunudur. Üçgen geniş açılıysa x için aşağıdakilerden hangisi mümkün?",
      options: [
        ["7 birim", "x, 9 birimden daha kısa olduğu için en uzun olamaz."],
        ["9 birim", "9², 7²+9²’den küçük. Bu koşulda üçgen dar."],
        ["11 birim", "11²=121<130. Geniş açılı olmaz."],
        ["12 birim", "12²=144>130 ve 2<12<16."],
        ["16 birim", "16 tam toplamdır, üçgenin alanı sıfır."],
      ],
      answer: 3,
      knowledge:
        "Üçgen varlığından sonra en uzun kenarın karesiyle açı türü bulunur.",
      strategy: "Önce 2<x<16, ardından x²>7²+9² koşulunu kur.",
      steps: [
        "En uzun kenar için x≥9 ve üçgen için 2<x<16. 12 ikisini de sağlar.",
        "Diğer iki kenarın karelerini topla: 7²+9²=130.",
        "12²=144>130 olduğu için 12’nin karşısındaki açı geniştir.",
      ],
      commonError: "Karesi yeterince büyük her uzunluğu geçerli üçgen sanmak.",
      check: "7+9=16>12, ayrıca 12 ikisinden de uzun.",
    },
    {
      id: "source-003-order-chain",
      prompt:
        "ABC’de A=75°, B=50°. BC ortak kenarlı BCD’de C=72°, D=65°. AB, BC ve BD için kesin sıralama hangisidir?",
      options: [
        [
          "BD>BC>AB",
          "ABC’de A 75>C 55. BCD’de C 72>D 65. Ortak BC iki eşitsizliği bağlar.",
        ],
        ["AB>BC>BD", "Karşı açıları ters eşler."],
        ["BC>BD>AB", "BCD’de BD’nin karşısı 72°, BC’nin karşısı 65°."],
        ["BD>AB>BC", "ABC’de AB’nin karşısı 55°, BC’nin karşısı 75°."],
        [
          "Kesin sıralama yok.",
          "Ortak BC aynı uzunluk olduğu için iki ayrı sıralama birleşir.",
        ],
      ],
      answer: 0,
      knowledge: "Aynı üçgende büyük açının karşısında büyük kenar vardır.",
      strategy: "İki üçgende BC’nin karşısını ayrı işaretle.",
      steps: [
        "ABC’de C=55°, A>C olduğu için BC>AB.",
        "BCD’de C>D, dolayısıyla BD>BC.",
        "Birleştirince BD>BC>AB.",
      ],
      commonError:
        "Farklı üçgenlerde yalnız açıları karşılaştırarak uzunluk zinciri kurmak.",
      check: "Her eşitsizlik, kendi üçgenindeki iki karşı kenara dayanır.",
    },
  ],
);
