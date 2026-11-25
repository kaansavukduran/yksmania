import type { LessonGuide } from "./guides/types";
import type { CheatSheet } from "./cheatsheetContent";

type Supplement = Pick<
  LessonGuide,
  "sections" | "examples" | "recall" | "source"
> & {
  sheet: CheatSheet["sections"];
};

export const lineAngles042: Supplement = {
  source:
    "Aurelia 001 Geometrinin Dili ve Doğruda Açılar, içerik 5.1, fiziksel s. 1–12",
  sections: [
    {
      title: "Komşu açıların dış kollarını kontrol et",
      figureTitle: "Doğrusal çiftte açıortaylar",
      paragraphs: [
        "Yan yana duran 30° ve 40° iki açı aralarında ortak kol paylaşabilir. Dış kolları zıt yönlü değilse 70° toplamı çizime uygundur. 180° beklemek için dış kolların aynı doğru üzerinde ters yönlere uzandığını görmen ya da bu bilgiyi soruda okuman gerekir. 90° toplamı veren iki açı tümlerdir ve ortak köşeleri olmayabilir.",
        "Bir doğrusal çiftin açıları α ve 180°−α olsun. İç açıortaylar ortak kolun iki tarafında α/2 ile (180°−α)/2 kadar gider. Toplam 90° eder. İki açı 60° ve 120° olduğunda 30°+60°=90° görürsün. Açılar yalnız komşu olup doğrusal çift kurmuyorsa aynı sonuç çıkmaz.",
      ],
    },
    {
      title: "Paralellik kalkarsa hangi eşitlik kalır?",
      paragraphs: [
        "Bir kesen iki paraleli kestiğinde yöndeş ve iç ters açılar eşittir. Aynı yandaki iç açılarda 180° toplamı kullanılır. Çizimde benzer görünen iki açıyı önce doğru konuma yerleştir. Paralellik verilmediyse ölçüyü bir kesişimden diğerine taşıyamazsın. Bir kesişimdeki ters açılar ise iki doğru hangi yönlerde olursa olsun eşittir.",
        "İki rayı kesen yol ilk rayla 55° yapıyorsa ikinci paralel raydaki yöndeş açı 55°, aynı yandaki iç açı 125° olur. İkinci rayı döndürürsen bu iki sonuç değişebilir. İlk raydaki kendi komşu ve ters açıları değişmez. Kırık çizgide bir köşeden verilen doğrulara paralel yardımcı çizgi geçirmek, iki kesişimi bu koşulla bağlar.",
      ],
    },
  ],
  examples: [
    {
      title: "Bütünler açıların iki açıortayını birleştir",
      prompt:
        "Aynı doğru üzerindeki bitişik açılar 2x+14 ve 3x+6 derecedir. İç açıortayları arasındaki açı kaç derecedir?",
      strategy: "Dış kollar zıt ışın. Ölçüleri topla, sonra yarılarını al.",
      steps: [
        {
          label: "Denklem",
          expression: "5x+20=180 ⇒ x=32",
          explanation: "Bitişik açıların toplamı 180°.",
        },
        {
          label: "Yarılar",
          expression: "(2·32+14)°/2=39°, (3·32+6)°/2=51°",
          explanation: "İki açıortay kendi açısını iki eş parçaya böler.",
        },
        {
          label: "Açıortaylar arası",
          expression: "39°+51°=90°",
          figureTitle: "Doğrusal çiftte açıortaylar",
          explanation:
            "Açıortaylar ortak kolun farklı taraflarında olduğu için iki yarıyı topla.",
        },
      ],
      answer: "90°.",
      check:
        "Açıların tam ölçüleri 78° ve 102°. Toplamı önce ikiye bölmek de 180°/2=90° verir.",
      pitfall:
        "Dış kolların zıt olduğu bilgisi olmadan iki yarım açıyı 90° sayma.",
    },
  ],
  recall: [
    {
      prompt: "30° ve 40° iki komşu açı çelişkili mi?",
      answer:
        "Hayır. Dış kolların zıt ışın olduğu da verilseydi toplam 180° gerekirdi.",
    },
    {
      prompt: "Paralellik silinince hangi eşitlik korunur?",
      answer:
        "Bir kesişimdeki ters açı eşitliği. İki farklı kesişimdeki açıları taşımak için koşul gerekir.",
    },
  ],
  sheet: [
    {
      title: "Açıortaydan dik açıya",
      figureTitle: "Doğrusal çiftte açıortaylar",
      text: [
        "α ile 180°−α doğrusal çiftse açıortaylar arasındaki açı α/2+(180°−α)/2=90°.",
        "Paralellik kalkınca kesişimler arasındaki yöndeş ve iç ters eşitliğini kullanma. Aynı kesişimdeki tersler eşit kalır.",
      ],
    },
  ],
};

export const triangleAngles042: Supplement = {
  source: "Aurelia 002 Üçgende Açılar, içerik 5.1, fiziksel s. 1–12. Aurelia 005 İkizkenar Üçgen 5.2, fiziksel s. 6–7",
  sections: [
    {
      title: "Açıortay dışarı çıkarsa kesişimdeki açı değişir",
      paragraphs: [
        "B’nin ve C’nin iç açıortayları I’da kesiştiğinde BIC üçgeninin taban açıları B/2 ve C/2 olur. Toplamı tamamlayınca ∠BIC=90°+A/2. B veya C’de bir dış açıortay seçersen o köşedeki iç açıortay doğrusuna dik bir doğru elde edersin. Çünkü yan yana duran iç ve dış açıların yarıları toplam 90° eder.",
        "Yalnız C’nin açıortayını dışarı çevirirsen B’nin iç açıortayı ile C’nin dış açıortayı dışarıda kesişir. Kesişimdeki dar açı ∠BXC=A/2 olur. İkisini de dış seçersen B ve C açıortaylarının kesişiminden B’ye ve C’ye giden kollar ∠BXC=90°−A/2 yapar. İki doğru dört bölge doğurur. Yayın gösterdiği açıyı, bütünleriyle karıştırma.",
        "Atölyede B ve C için çizgileri sırayla değiştir. A aynı kalırsa üç olası sonuç da aynı kalır. B’nin değeri ve şekil değişebilir. Bu bağ, B+C toplamının 180°−A olmasından gelir.",
      ],
    },
    {
      title: "Dış açı iki uzak açıyı oranla verir",
      paragraphs: [
        "Dış açı 132° ve uzak iki iç açı 5:6 oranında olsun. Bir oran payına t dersen 5t+6t=132° ve t=12° olur. Uzak açılar 60° ve 72°. Dış açıya komşu iç açı 180°−132°=48°. Üç iç açının toplamını geri kontrol et.",
        "Bir dış açının 120° olduğunu bilmek iki uzak iç açının ayrı ayrı 60° olduğunu göstermez. 50° ve 70° de mümkündür. Eş kenar ya da eş açı bilgisi gelirse iki uzak açı eşitlenebilir. İç açıortay verilen köşe açısını ikiye böler, bir kenarortay yalnızca karşı kenarı eşler.",
      ],
    },
    {
      title: "Orta nokta ile açıortayın kestiği noktayı ayır",
      figureTitle: "Açıortay ve orta nokta",
      paragraphs: [
        "B köşesinden AC’nin orta noktasına çizilen BM, AC’yi iki eş parçaya ayırır. B açısını ikiye bölmek için BD açıortayı gerekir. Şekilde D ile M ayrı noktalardır. B’nin çevresindeki açı işaretlerini ve AC’deki eş uzunluk çizgilerini ayrı oku.",
        "D, AC üzerinde olduğu için ∠BCD, büyük üçgendeki C açısıyla aynıdır. B açısı 50°, C açısı 60° ise ∠DBC=25° ve küçük BDC üçgeninde ∠BDC=180°−60°−25°=95° olur.",
      ],
    },
    {
      title: "Tabandaki noktadan eş kenarlara dik uzaklık",
      figureTitle: "İki dik uzaklığın toplamı",
      paragraphs: [
        "AB=AC=a ve P, BC doğru parçası üzerinde olsun. P’den AB ve AC doğrularına dik indir. Bu dik parçaların uzunlukları d₁ ve d₂’dir. AP çizgisi üçgeni ABP ve APC olarak ikiye ayırır. Bu iki alanın tabanları eş uzunluktadır, dolayısıyla S=a·d₁/2+a·d₂/2=a(d₁+d₂)/2.",
        "Aynı üçgenin alanını AB tabanı ve ona ait yükseklikle yaz: S=a·hₐ/2. Buradan d₁+d₂=hₐ=2S/a. Tepe yüksekliği A’dan BC’ye ölçülür. P’yi tabandan üçgenin içine alırsan BPC alanı toplamın dışında kalır. Buna karşılık hareketli modelde P, BC üzerinde kaldığı sürece bir uzaklık artarken diğeri aynı miktarda azalır.",
      ],
    },
  ],
  examples: [
    {
      title: "Aynı üçgende üç açıortay seçimini karşılaştır",
      prompt:
        "A=58°, B=66° ve C=56°. B ve C köşelerindeki iki iç, bir iç bir dış, iki dış açıortayı ayrı ayrı karşılaştır.",
      strategy: "Önce BIC üçgeninin iki köşesindeki yarım açıları bul.",
      steps: [
        {
          label: "İki iç",
          expression: "180°−33°−28°=119°",
          explanation: "BIC üçgeninde iki taban açısı B/2 ve C/2 olur.",
        },
        {
          label: "Bir iç bir dış",
          expression: "119°−90°=29°",
          explanation:
            "Yalnız bir doğrunun dik eşini alırsan kesişimdeki dar açı 29° olur.",
        },
        {
          label: "İki dış",
          expression: "180°−119°=61°",
          explanation:
            "İki doğrunun dik eşlerini al. Kesişimden B ve C’ye giden kollar bu kez bütünler bölgeyi işaretler.",
        },
      ],
      answer: "119°, 29° ve 61°.",
      check: "A/2=29°. Diğer değerler 90°+29° ve 90°−29°.",
      pitfall: "Kesişim noktasında gösterilen yayı onun komşusuyla karıştırma.",
    },
    {
      title: "Dış açı ve açıortayla küçük üçgeni tamamla",
      prompt:
        "A’nın dış açısı 132° olan ABC üçgeninde B=2C. B’den çizilen iç açıortay AC’yi D’de kesiyor. ∠BDC kaç derecedir?",
      strategy: "Dış açıyı B+C olarak yaz. Sonra BDC üçgenine geç.",
      steps: [
        {
          label: "Uzak açılar",
          expression: "2C+C=132° ⇒ C=44°, B=88°",
          explanation: "A’daki dış açı B ile C’nin toplamıdır.",
        },
        {
          label: "Küçük üçgen",
          expression: "∠DBC=44°, ∠BCD=44°",
          explanation:
            "Açıortay B’yi ikiye böler. D noktası AC üzerinde olduğundan C’deki kol değişmez.",
        },
        {
          label: "Son açı",
          expression: "∠BDC=180°−44°−44°",
          explanation: "BDC’nin iki taban açısını 180°den çıkar.",
        },
      ],
      answer: "92°.",
      check:
        "A=48° ve 48°+88°+44°=180°. D’nin A tarafındaki komşu açı 88° olur.",
      pitfall:
        "D köşesinde ∠BDA’yı hesapladıysan bütünlerini alarak ∠BDC’ye geç.",
    },
    {
      title: "Bölünen açıyı küçük üçgende kullan",
      prompt: "B=64° ve C=48° olan ABC üçgeninde B’nin iç açıortayı AC’yi D’de kesiyor. ∠BDC kaç derece?",
      strategy: "B açısının yarısını al. C açısının aynı kaldığını gör ve BDC üçgenini tamamla.",
      steps: [
        { label: "B açısının yarısı", expression: "64° ÷ 2 = 32°", explanation: "D, açıortay üzerinde olduğu için ∠DBC=32°." },
        { label: "C açısını küçük üçgene taşı", expression: "∠BCD=48°", explanation: "D, A ile C arasında olduğu için CD ve CA aynı yöndedir." },
        { label: "Küçük üçgenin üçüncü açısı", expression: "180°−48°−32°=100°", explanation: "BDC üçgeninde B ve C açıları belli, D açısı toplamı 180°ye tamamlar." },
      ],
      answer: "100°.",
      check: "32°+48°+100°=180°.",
      pitfall: "AC’nin orta noktasını seçmek B açısının bölündüğünü göstermez.",
    },
    {
      title: "Tepe yüksekliğini yan yüksekliğe dönüştür",
      prompt: "AB=AC=5, BC=6. P, BC parçasında ve AC’ye dik uzaklığı 8/5. AB’ye dik uzaklığı bul.",
      strategy: "Önce alanı BC ile bul, sonra eş yan kenarlara ait iki alanı topla.",
      steps: [
        { label: "Alanı bul", expression: "h²=5²−3²=16 → S=6·4/2=12", explanation: "Tepe yüksekliği, 6 birimlik tabanı iki eş parçaya ayırır." },
        { label: "İki dik uzaklığın toplamı", expression: "d₁+d₂=2·12/5=24/5", explanation: "İki küçük üçgenin taban olarak alınan yan kenarları 5’er birimdir." },
        { label: "Verilen uzaklığı çıkar", expression: "24/5−8/5=16/5", figureTitle: "İki dik uzaklığın toplamı", explanation: "AB’ye ait dik uzaklığı kalan alan belirler." },
      ],
      answer: "AB’ye dik uzaklık 16/5 birim.",
      check: "5·(16/5)/2+5·(8/5)/2=8+4=12.",
      pitfall: "Tepe yüksekliği 4’ten değil, yan yüksekliği 24/5’ten çıkar.",
    },
  ],
  recall: [
    {
      prompt: "İki iç açıortayda 90°ye hangi köşenin yarısını eklersin?",
      answer: "Açıortayı seçilmeyen üçüncü köşenin yarısını.",
    },
    {
      prompt:
        "B ile C’nin iç açıortaylarından yalnız C’yi dışa çevirirsen dar açı nedir?",
      answer:
        "A/2. B ve C’nin iki dış açıortayında işaretli küçük açı 90°−A/2’dir.",
    },
  ],
  sheet: [
    {
      title: "Üç açıortay kesişimini ayır",
      text: [
        "B ile C’de iki iç açıortay için ∠BIC=90°+A/2. B iç ve C dış için dar açı A/2. İki dış için B ve C’ye giden kollar arasında 90°−A/2.",
        "Her dış açıortay aynı köşedeki iç açıortaya diktir. Önce iki köşeyi, sonra kesişimdeki yayı açıkça seç.",
      ],
    },
    {
      title: "Açıortay ve kenarortay",
      figureTitle: "Açıortay ve orta nokta",
      text: ["Açıortay köşedeki açıyı, kenarortay karşı kenarı ikiye böler. C açısı aynı kalan BDC’de B’nin yarısını ve C’yi 180°den çıkar."],
    },
    {
      title: "Eş kenarlara inen dik uzaklıklar",
      figureTitle: "İki dik uzaklığın toplamı",
      text: [
        "AB=AC=a ve P ∈ [BC] ise alan toplamından d₁+d₂=2S/a. Bu AB’ye veya AC’ye ait yüksekliktir. P taban dışına çıktığında bu toplamı doğrudan kullanma.",
      ],
    },
  ],
};

const angleClassAfterExistence = {
  layout: "table" as const,
  headers: ["x", "Karar", "Gerekçe"],
  rows: [8, 9, 10, 11, 12].map((x) => {
    const squares = 5 ** 2 + 7 ** 2;
    if (x >= 5 + 7) return [String(x), "Üçgen kurulmaz", `5 + 7 = ${x}. Köşeler aynı doğru üzerinde.`];
    const obtuse = x ** 2 > squares;
    return [String(x), obtuse ? "Geniş açılı" : "Dar açılı", `${x ** 2} ${obtuse ? ">" : "<"} ${squares}`];
  }),
};

export const triangleSides042: Supplement = {
  source: "Aurelia 003 Açı Kenar Bağıntıları, içerik 5.1, fiziksel s. 1–12",
  sections: [
    {
      title: "Ortak kenarı iki aralığa birden yerleştir",
      paragraphs: [
        "İki üçgenin ortak kenarı x olsun. Birinde diğer kenarlar 4 ve 9, ötekinde 6 ve 8 birim. İlk üçgende 5<x<13, ikincide 2<x<14. İkisini aynı anda kurmak için 5<x<13 gerekir. Tam sayılar 6’dan 12’ye kadar yedi tanedir. x=5 veya x=13 ilk üçgende eşitliğe düşer, o üçgenin alanı sıfır olur.",
        "Atölyede ikinci üçgenin iki kenarından birini büyüt. Ortak aralığı yeni alt ve üst sınırlar belirler. Alt sınır üst sınıra eşit ya da daha büyük olursa ortak uzunluk yoktur. Üçgenlerden yalnız birinin çizilebilmesi iki koşulun birden sağlandığını göstermez.",
      ],
    },
    {
      title: "Önce geçerli uzunluk, sonra açı türü",
      paragraphs: [
        "İki kenar 6 ve 8, üçüncü kenar x ve en uzun olsun. Gerçek üçgen için 2<x<14 ve x≥8 olmalı. En büyük açının geniş olması için x²>6²+8²=100, yani x>10. Tam sayı sorusunda 11, 12 ve 13 kalır. 10 geçerli bir üçgendir fakat dik açılıdır. 14 eşitlik sınırında üçgen vermez.",
        "Çevre 18 birimse en uzun kenar kalan iki kenarın toplamından küçük olmalıdır. Bu yüzden uzunluğu 9’dan küçüktür. En uzun tam sayı 8 olabilir. Örneğin 4, 6 ve 8 üçgeni bu çevreyle gerçekleşir. Yalnız üst sınırı bulmak yetmez, seçtiğin değere uyan üç kenarı göster.",
      ],
    },
    {
      title: "İki üçgeni ortak veya eş uzunlukla bağla",
      paragraphs: [
        "ABC’de A=72°, B=51°, C=57° ise BC>AB. Aynı BC kenarlı BCD’de C=73°, D=64°, B=43° ise BD>BC. Artık BD>BC>AB zincirini yazabilirsin. Eşit veya ortak bir kenar kurulamazsa iki üçgendeki açı ölçülerini doğrudan karşılaştırarak kenar uzunluğu çıkarma.",
        "Katlama, şekli kat çizgisine göre yansıtır. Bir noktayla görüntüsünün kat çizgisine uzaklıkları eşittir, kat çizgisi üzerindeki noktalara olan uzaklık da korunur. Eş uzunluk için bu ilişkiyi kullan ve sonra açının karşısındaki kenarı bul. Kâğıdın çizimdeki genişliğini ölçü sayma.",
      ],
    },
    {
      title: "Açı koşulunu yalnız kurulabilen üçgenlerde dene",
      paragraphs: [
        "Kenarlar 5, 7 ve x olsun. x en uzun kenarsa ve üçgen kurulacaksa 7<x<12. Geniş açı için x²>5²+7²=74 gerekir. Önce üçgenin koşulunu denetle, sonra kareleri karşılaştır.",
        "x=8 uzunlukça geçerlidir ama 64<74 olduğundan dar açılıdır. x=9, 10, 11 iki koşulu da sağlar. x=12’de kare karşılaştırması tek başına büyük görünür, fakat şekil kapanamaz.",
      ],
      table: angleClassAfterExistence,
    },
  ],
  examples: [
    {
      title: "Ortak kenarın birden fazla koşulunu denetle",
      prompt:
        "İlk üçgende iki kenar 4 ve 9 birim. İkincide 3 ve 14 birim. Ortak kenar x tam sayıysa kaç değer kalır?",
      strategy: "Her iki açık aralığı kur, sonra kesişimde tam sayı say.",
      steps: [
        {
          label: "İlk üçgen",
          expression: "5<x<13",
          explanation: "9−4=5, 9+4=13.",
        },
        {
          label: "İkinci üçgen",
          expression: "11<x<17",
          explanation: "14−3=11, 14+3=17.",
        },
        {
          label: "Kesişim",
          expression: "11<x<13",
          explanation:
            "Altta 11 daha büyük, üstte 13 daha küçük. Sadece 12 arada kalır.",
        },
      ],
      answer: "Bir değer, x=12.",
      check:
        "Üstte 4+9=13>12. Altta 3+12=15>14. En uzun iki kenarın koşulu da sağlanır.",
      pitfall:
        "11 ve 13 sınırın parçası. İkisinde de en az bir üçgenin alanı sıfırdır.",
    },
    {
      title: "En uzun kenarın iki koşulu",
      prompt: "Kenarları 4, 9 ve x cm olan üçgen geniş açılı. x diğer iki kenardan uzun ve tam sayıysa x hangi değerleri alır?",
      strategy: "Üçgenin kapanması için üst sınırı bul, sonra kare karşılaştırmasını uygula.",
      steps: [
        { label: "Üçgenin izin verdiği uzunluk", expression: "9<x<4+9=13", explanation: "x, 9’dan uzun. En uzun kenar, öteki ikisinin toplamından kısa olmalı." },
        { label: "Açı sınıfının sınırı", expression: "x²>4²+9²=97", explanation: "x en uzun kenar olduğu için bu eşitsizlik onun karşısındaki açıyı geniş yapar." },
        { label: "Tam sayıları seç", expression: "10²=100>97 → x=10, 11, 12", explanation: "10 en küçük tam sayı adayıdır. Daha büyük adayların kareleri de koşulu sağlar, ancak 13’e ulaşılamaz." },
      ],
      answer: "10, 11 ve 12 cm.",
      check: "4+9=13 olduğundan 12 üçgen kurar, 13 sınırda kalır.",
      pitfall: "13²>97 olsa da 13 bir üçgen kenarı olamaz.",
    },
  ],
  recall: [
    {
      prompt: "Aynı açık sınır iki üçgene de verilirse uçta üçgen var mı?",
      answer: "Hayır. Uçta en az bir üçgen doğrusal kalır.",
    },
    {
      prompt: "Üç ayrı kenarla açı türü için ilk iki adım ne?",
      answer:
        "Önce üçgen varlığını denetle. Sonra en uzun kenarın karesini öteki ikisinin kareleri toplamıyla karşılaştır.",
    },
  ],
  sheet: [
    {
      title: "Açık sınırı koru, sonra ek koşulu uygula",
      text: [
        "Ortak kenar için alt sınırların büyüğünü, üst sınırların küçüğünü seç. Sınırlar birbirine eşit olsa bile aralık boştur.",
        "En büyük açı geniş olacaksa en uzun kenarın karesi öteki iki karenin toplamından büyük. Önce üçgen eşitsizliği, sonra kare karşılaştırması.",
      ],
    },
    {
      title: "Önce üçgen, sonra açı sınıfı",
      text: ["5 ve 7 sabit, x en uzunsa 7<x<12. Geniş açı için x²>74 koşulu da gerekir. Tam sayı x değerleri 9, 10 ve 11."],
      table: angleClassAfterExistence,
    },
  ],
};
