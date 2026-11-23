import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide } from "./guides/types";
import type { CheatSheet } from "./cheatsheetContent";
import { lineAngles042 } from "./geometryConditions042Teaching";
import { lineAnglesPractice042 } from "./geometryConditions042Practice";

export const geometrySourceAngles032Id = "tyt-geo-acilar-kaynak-pekitirme-032";
const id = geometrySourceAngles032Id;
const source =
  `Aurelia, Geometrinin Dili ve Doğruda Açılar kopya kağıdı: 14 Kasım 2026 tarihli yedi sayfalık sürüm ve önceki dört sayfalık sürüm. Kavram ve sayısal örnekler yeniden açıklanmış, özgün öğretim soruları geliştirilmiştir. Alıştırmalar resmî sınav sorusu değildir; kaynakta atıf yapılan MEB arşivinin tamamını temsil etmez. ${lineAngles042.source}.`;

const guide: LessonGuide = {
  id,
  minutes: 42,
  objectives: [
    "Nokta, doğru, ışın ve doğru parçasını çizimin uçlarından ayır.",
    "Açı adını köşe ve kollarıyla oku; ölçüyü kol uzunluğundan ayır.",
    "Açı ilişkisinin koşulunu belirleyip eşitlik ya da toplam denklemi kur.",
    "Paralellik gerektiren açı çiftlerini aynı kesişimdeki ters açılardan ayır.",
  ],
  sections: [
    {
      title: "Çizginin ucunu oku",
      paragraphs: [
        "Nokta, büyüklüğü olan küçük bir top değil, bir konumdur. Çizimde görünür olması için bir benekle gösterilir. A, B ve C gibi büyük harfler bu konumları adlandırır. A ve B farklı iki nokta olduğunda ikisinden geçen tek bir doğru vardır.",
        "AB doğrusu iki yönde sınırsız uzanır; [AB ışını A’dan başlar ve B yönünde sınırsız uzanır; [AB] doğru parçası A ve B ile sınırlıdır. Ok çizimin devam ettiğini, dolu uç ise o nesnenin uç noktasını anlatır. Doğru parçasını uzatıp doğru elde etmek, ilk nesnenin tanımını değiştiren yeni bir işlemdir.",
      ],
    },
    {
      title: "Açı adından köşeye ve kollara git",
      paragraphs: [
        "Açı, başlangıcı ortak iki ışın arasındaki açıklıktır. ∠ABC yazımında ortadaki B köşedir. Kollar B’den A’ya ve B’den C’ye yönelen [BA ve [BC ışınlarıdır. m(∠ABC), bu açının ölçüsünü söyler; B noktasının uzunluğu anlamına gelmez.",
        "Kolların sayfadaki çizimini uzatmak açıyı büyütmez. Ölçü, bir koldan ötekine dönüşle ilgilidir ve burada dereceyle verilir. Görünüşü 90°ye benziyor diye diklik varsayma; ölçü, diklik işareti veya açık bir koşul gerekir.",
      ],
    },
    {
      title: "Ölçü aralığıyla adlandır",
      paragraphs: [
        "0°<α<90° dar, α=90° dik, 90°<α<180° geniş açıdır. 90° sınırı dar ve geniş aralığının hiçbirine dahil değildir. Örneğin 87° dar, 93° geniştir; ikisinin de 90°ye yakın olması sınıflarını aynı yapmaz.",
        "180° doğru açı, yani yarım dönüş; 360° tam açı, yani tam dönüştür. Bir noktanın çevresini boşluksuz ve örtüşmesiz kaplayan açıların toplamı 360°dir. Bir çözümde 0° veya 180° bulduğunda soruda dar ya da geniş açı istenip istenmediğini yeniden kontrol et.",
      ],
    },
    {
      title: "Komşuluk ile toplam koşulunu ayır",
      paragraphs: [
        "Komşu açılar köşeyi ve bir kolu paylaşır, iç bölgeleri kesişmez. Bu koşullar tek başına toplamın 180° olduğunu söylemez: aynı köşede komşu 30° ve 40° açıları birlikte 70° eder. Komşu olmayan açılar da tümler veya bütünler olabilir.",
        "Tümler açıların toplamı 90°, bütünler açıların toplamı 180°dir. Komşu açıların ortak olmayan kolları ayrıca zıt ışınsa doğrusal çift oluşur; bu durumda 180° toplamı zorunludur. Önce ilişkinin adını ve koşulunu yaz, ardından cebirsel ifadeleri yerleştir.",
      ],
    },
    {
      title: "Aynı kesişimde ters açıları bul",
      paragraphs: [
        "İki doğru kesiştiğinde karşı karşıya duran açılar ters açılardır ve eşittir. Bu sonuç için başka bir doğruya paralellik gerekmez. Birbirinin yanında duran açılar ters değil, doğrusal çiftin parçalarıdır; toplamları 180°dir.",
        "Örneğin ters iki açı 93° ise komşuları 87°dir: 93+87=180. Dört açı sırasıyla 93°,87°,93°,87° olur ve 360°yi tamamlar. Ters açıyı ararken önce aynı kesişimde olduğundan emin ol; farklı iki kesişimdeki açıları konuma göre ayrıca adlandır.",
      ],
    },
    {
      title: "Paralellerde konumu tarif et",
      paragraphs: [
        "Paralel d₁ ve d₂ doğrularını bir kesen kestiğinde, iki kesişimde aynı köşe konumundaki açılar yöndeştir. Paraleller arasında ve kesenin karşı yanlarında olanlar iç ters; paralellerin dışında ve kesenin karşı yanlarında olanlar dış terstir. Bu üç çift türünde ölçüler eşittir.",
        "Paraleller arasında kesenin aynı yanında bulunan iki iç açının toplamı 180°dir. İçeride–dışarıda ve aynı yanda–karşı yanda ayrımını çizim döndüğünde de koru. Buradaki yöndeş/iç ters/dış ters sonuçları paralellik koşuluna dayanır; aynı kesişimdeki ters açı eşitliği ise yalnız iki doğrunun kesişmesine dayanır.",
      ],
    },
    {
      title: "Bilinmeyen ile istenen ölçüyü ayır",
      paragraphs: [
        "Tümler örnekte x+(2x+6)=90 kurulur; paralellerin aynı yan iç örneğinde (3x+10)+(2x+20)=180; aynı kesişimde ters açılarda 4x−7=3x+18. Üç denklem arasındaki fark bir işlem ezberi değil, seçilen geometrik ilişkinin sonucudur.",
        "Denklemden x’i bulmak her zaman soruyu bitirmez. x=25 iken açı 4x−7=93° olabilir; istenen onun komşusuysa 180−93=87° hesaplanır. Sonuçta hem denklemi hem sorulan açıyı hem de sınıfını kontrol et. Aşağıdaki örneklerde her adımı açıp kendi gerekçenle karşılaştır.",
      ],
    },
    {
      title: "Kendi çözümünü kısa bir gerekçeyle denetle",
      paragraphs: [
        "Çözümüne bir cümle ekle: “Ters oldukları için eşit”, “Tümler oldukları için 90°”, “Paralellerin aynı yan iç açıları oldukları için 180°.” Sadece bir sayı yazmak yerine ilişkiyi söylemek, yanlış eşitliğin nerede kurulduğunu görünür yapar.",
        "Bir şekil büyüdüğünde ölçülerin büyüdüğünü, her komşu çiftin bütünler olduğunu veya paralellik işareti olmadan iki kesişimdeki açılara eşitlik verebildiğini düşünüyorsan önce modeli değiştirerek karşı örnek ara. Bağımsız sorular kendi verileriyle çözülür; keşif modelini açmak ya da çözümü okumak doğru cevap yerine geçmez.",
      ],
    },
  ],
  examples: [
    {
      title: "Tümler iki açıyı tanımdan çöz",
      prompt:
        "Tümler iki açıdan büyük olanı, küçük olanın iki katından 6° fazladır. Küçük ve büyük açıların ölçüleri nedir?",
      strategy: "Küçüğe x de, büyüğü 2x+6 yaz ve tümler toplamını uygula.",
      steps: [
        {
          label: "Ölçüleri temsil et",
          explanation:
            "Küçük açı x°, büyük açı (2x+6)°dir. Tümler sözcüğü 90° toplamını verir.",
        },
        {
          label: "Denklemi çöz",
          explanation: "x+2x+6=90, 3x=84 ve x=28 bulunur.",
        },
        {
          label: "İki ölçüyü geri koy",
          explanation:
            "Büyük açı 2·28+6=62°dir. Küçük 28° ve büyük 62° bulunur.",
        },
      ],
      answer: "Küçük açı 28°, büyük açı 62°dir.",
      check: "28+62=90 ve 62=2·28+6 koşulları birlikte sağlanır.",
      pitfall:
        "İki kat ifadesini atlayıp büyüğü x+6 yazmak kaynak verisini değiştirir.",
    },
    {
      title: "Paralellerin aynı yan iç açılarını topla",
      prompt:
        "Paralel d₁ ve d₂ doğrularını bir kesen kesiyor. Paraleller arasında, kesenin aynı yanındaki iki iç açının ölçüleri (3x+10)° ve (2x+20)°dir. İki açı kaç derecedir?",
      strategy:
        "Aynı yan iç ve paralellik koşullarını birlikte kullanarak toplamı 180° yap.",
      steps: [
        {
          label: "Konumun sonucunu yaz",
          explanation:
            "Paralellik ve aynı yan iç konumu nedeniyle (3x+10)+(2x+20)=180 yazılır.",
        },
        {
          label: "Bilinmeyeni bul",
          explanation: "5x+30=180, 5x=150 ve x=30 olur.",
        },
        {
          label: "Açıları hesapla",
          explanation: "3·30+10=100° ve 2·30+20=80° bulunur.",
        },
      ],
      answer: "Açılar 100° ve 80°dir.",
      check: "100+80=180; bir açı geniş, diğeri dardır.",
      pitfall:
        "Aynı yan iç açıları eşitlemek iç ters ilişkisiyle karıştırmaktır.",
    },
    {
      title: "Ters açıdan komşusuna geç",
      prompt:
        "Kesişen iki doğruda ters iki açının ölçüleri (4x−7)° ve (3x+18)°dir. Bu açılar ve her birinin komşusu kaç derecedir?",
      strategy:
        "Önce tersleri eşitle, ardından komşu doğrusal çiftin 180° toplamını kullan.",
      steps: [
        {
          label: "Ters açı eşitliği",
          explanation:
            "4x−7=3x+18 eşitliği x=25 verir; paralellik koşulu aranmaz.",
        },
        {
          label: "Ters ölçüleri bul",
          explanation:
            "4·25−7=93 ve 3·25+18=93 olduğundan terslerin ikisi de 93°dir.",
        },
        {
          label: "Komşuya geç",
          explanation:
            "Komşu açı 180−93=87°dir; kesişimde ölçüler sırayla 93°,87°,93°,87° olur.",
        },
      ],
      answer: "Ters açılar 93°, komşuları 87°dir.",
      check: "2·93+2·87=360° ve her doğrusal çiftin toplamı 180°dir.",
      pitfall: "x=25 değerini istenen açı sanma; 4x−7 ifadesine geri koy.",
    },
    {
      title: "Hatırlama sorusunu denklemle doğrula",
      prompt:
        "Kesişen iki doğruda karşılıklı duran ters iki açının ölçüleri (5x−10)° ve (3x+30)°dir. x ve açı ölçülerini bul.",
      strategy: "Ters açıları eşitle; x’i iki ifadede ayrı ayrı denetle.",
      steps: [
        {
          label: "Eşitlik",
          explanation: "Ters açılar eşit olduğundan 5x−10=3x+30 yazılır.",
        },
        { label: "Çözüm", explanation: "2x=40 ve x=20 bulunur." },
        {
          label: "Denetim",
          explanation:
            "5·20−10=90 ve 3·20+30=90 olduğundan iki ölçü de 90°dir. Komşular da 90°dir.",
        },
      ],
      answer: "x=20, açı ölçülerinin her biri 90°dir.",
      check: "İki ifade aynı 90°yi verir; doğrular bu örnekte diktir.",
      pitfall: "x=20 ile açı 20° sonucunu birbirine karıştırma.",
    },
  ],
  recall: [
    {
      prompt: "∠ABC açısının köşesi ve kolları nelerdir?",
      answer: "Köşe B; kollar [BA ve [BC ışınlarıdır.",
    },
    {
      prompt: "Ters açılar 5x−10° ve 3x+30° ise x kaçtır?",
      answer: "5x−10=3x+30; 2x=40 ve x=20. Açıların her biri 90°dir.",
    },
    {
      prompt: "Paralellerin aynı yan iç açıları için hangi eşitlik kullanılır?",
      answer:
        "İki açının ölçüleri toplamı 180°dir; paralellik ve aynı yan iç konumu gereklidir.",
    },
    {
      prompt:
        "Komşu iki açının bütünler olması için hangi ek koşul yeterlidir?",
      answer:
        "Ortak olmayan kolların zıt ışın olması; böylece doğrusal çift oluşur.",
    },
    {
      prompt: "Aynı kesişimdeki ters açı eşitliği paralellik ister mi?",
      answer:
        "Hayır. İki doğrunun kesişmesi yeterlidir; paralellik iki kesişimdeki yöndeş/iç ters/dış ters ilişkilerinde gerekir.",
    },
  ],
  source,
};

interface Item extends QuestionGuidance {
  prompt: string;
  options: string[];
}
const items: Item[] = [
  {
    prompt: "∠ABC açısının köşesi hangi noktadır?",
    options: [
      "B",
      "A",
      "C",
      "A ile C’nin orta noktası",
      "Üç harfin hepsi ayrı birer köşedir",
    ],
    knowledge: [
      "Üç harfle yazılmış bir açıda köşe ortadaki harfle gösterilir.",
      "Açının iki kolu köşeden çıkan ışınlardır.",
    ],
    strategy: "Ortadaki harfi bul, iki ışının ortak başlangıcıyla doğrula.",
    steps: [
      "ABC yazımındaki orta harf B’dir.",
      "Kollar B’den A’ya ve B’den C’ye yönelen [BA ve [BC ışınlarıdır.",
      "İki ışının ortak başlangıcı B olduğundan köşe B’dir.",
    ],
    optionReasons: [
      "B ortadaki harf ve iki kolun ortak başlangıcıdır.",
      "A ilk kolun yönünü gösterir; bu yazımda köşe değildir.",
      "C ikinci kolun yönünü gösterir; bu yazımda köşe değildir.",
      "Soruda orta nokta verilmez; açı adlandırması bir orta nokta işlemi değildir.",
      "Bir açının tek ortak başlangıç noktası vardır; üç ayrı köşe yoktur.",
    ],
    commonError: "Köşeyi ilk harften seçmek.",
    check:
      "∠CBA aynı B köşesini kullanır; kolların yazım sırası tersine dönmüştür.",
  },
  {
    prompt:
      "Tümler iki açıdan büyük olanı, küçük olanın iki katından 6° fazladır. Küçük açı kaç derecedir?",
    options: ["28°", "42°", "62°", "58°", "26°"],
    knowledge: [
      "Tümler iki açının toplamı 90°dir.",
      "Küçük x ise büyük 2x+6 olarak yazılır.",
    ],
    strategy: "x+(2x+6)=90 toplamını kur.",
    steps: [
      "Küçük x, büyük 2x+6 olsun; ikisi de açı ölçüsüdür.",
      "Tümler toplamı x+2x+6=90 verir; 3x=84 ve x=28 bulunur.",
      "Büyük açı 62°dir; 28+62=90 ve 62=2·28+6 denetlenir.",
    ],
    optionReasons: [
      "28° hem toplamı hem iki katından 6° fazla koşulunu sağlar.",
      "42°, büyüğü x+6 yazarak iki kat koşulunu atlamaktan gelir.",
      "62° büyük açıdır; küçük açı soruluyor.",
      "58°, tümler yerine 180° toplamı kullanıldığında bulunan küçük açıdır.",
      "26° seçilirse büyük 58° ve toplam 84° olur; tümler koşulu sağlanmaz.",
    ],
    commonError:
      "Tümler sözcüğüne180° toplamı vermek veya iki kat koşulunu atlamak.",
    check: "Doğru küçük 28° ve büyük 62° pozitiftir; toplam 90°dir.",
  },
  {
    prompt:
      "Paralel iki doğruyu bir kesen kesiyor. Paraleller arasında kesenin aynı yanındaki iç açıların ölçüleri (3x+10)° ve (2x+20)°dir. Bu açılardan büyük olanı kaç derecedir?",
    options: ["100°", "80°", "30°", "40°", "180°"],
    knowledge: [
      "Paralellerin aynı yan iç açıları bütünlerdir.",
      "Denklemdeki x ile açı ölçüsü farklı olabilir.",
    ],
    strategy: "İki ifadeyi 180°ye topla, ardından x’i her birinde yerine koy.",
    steps: [
      "Paralellik ve aynı yan iç koşulu (3x+10)+(2x+20)=180 verir.",
      "5x+30=180, x=30 bulunur.",
      "Açılar 100° ve 80°dir; büyük olan 100°dir.",
    ],
    optionReasons: [
      "3·30+10=100° büyük açı ölçüsüdür.",
      "2·30+20=80° küçük açıdır.",
      "30 bilinmeyen x’in değeridir; açı ölçüsü değildir.",
      "40°, aynı yan iç açıları yanlışlıkla eşitleyince iki ifadede çıkan değerdir; toplam 80° olur.",
      "180° iki açının toplamıdır; tek bir açının ölçüsü değildir.",
    ],
    commonError: "Aynı yan iç ilişkisinde eşitlik kurmak.",
    check: "100+80=180 ve 100>80; iki koşul doğrulanır.",
  },
  {
    prompt:
      "Kesişen iki doğru üzerindeki ters iki açının ölçüleri (4x−7)° ve (3x+18)°dir. Bu açılardan birine komşu olan açı kaç derecedir?",
    options: ["87°", "93°", "25°", "90°", "180°"],
    knowledge: [
      "Aynı kesişimdeki ters açılar eşittir.",
      "Kesişen doğruların komşu açıları doğrusal çift oluşturur ve 180°ye tamamlanır.",
    ],
    strategy: "Önce tersleri eşitle, sonra bulduğun açıyı180°den çıkar.",
    steps: [
      "4x−7=3x+18 eşitliğinden x=25 bulunur.",
      "Ters açılardan her biri 4·25−7=93°dir.",
      "Komşu açı 180−93=87°dir; istenen sonuç budur.",
    ],
    optionReasons: [
      "87° ile 93° birlikte180° eder; komşu doğrusal çift koşulunu sağlar.",
      "93° ters iki açının ölçüsüdür; onların komşusu değildir.",
      "25 bilinmeyen x’tir; açı ölçüsüne geri konmalıdır.",
      "90° ancak doğrular dikse çıkar; verilen ölçüler93°yi verir.",
      "180° doğrusal çiftin toplamıdır; tek komşu açının ölçüsü değildir.",
    ],
    commonError: "x’i veya ters açı ölçüsünü komşu açı diye yanıtlamak.",
    check: "Kesişim çevresi 93+87+93+87=360°dir.",
  },
  {
    prompt:
      "Kesişen iki doğruda ters iki açının ölçüleri (5x−10)° ve (3x+30)°dir. x kaçtır?",
    options: ["20", "90", "10", "40", "30"],
    knowledge: [
      "Ters açıların ölçüleri eşittir; x’in kendisi açı ölçüsü olmayabilir.",
    ],
    strategy: "5x−10=3x+30 eşitliğini çöz.",
    steps: [
      "Ters olma koşulu iki ölçüyü eşitler: 5x−10=3x+30.",
      "Her iki taraftan 3x çıkarıp 10 ekleyince2x=40 elde edilir.",
      "x=20; iki açı da 90° olarak doğrulanır.",
    ],
    optionReasons: [
      "x=20 iki ifadeyi90’a eşitler.",
      "90 açı ölçüsüdür; x’in değeri değildir.",
      "x=10 için ölçüler 40° ve 60° olur; eşit değildir.",
      "40, 2x’in değeridir; ikiye bölünmelidir.",
      "x=30 için ölçüler 140° ve 120° olur; ters açı eşitliği sağlanmaz.",
    ],
    commonError: "2x=40 denkleminde ikiye bölmeyi unutmak.",
    check: "5·20−10=90=3·20+30.",
  },
  {
    prompt:
      "İki doğru O’da kesişiyor. Başka bir paralellik koşulu verilmemiştir. Bu kesişim için kesin doğru ifade hangisidir?",
    options: [
      "O’daki ters açılar eşittir.",
      "O’daki her komşu açı eşittir.",
      "O’daki bütün açılar 90°dir.",
      "Farklı bir doğru üzerindeki yöndeş gibi görünen açı da aynı ölçüdedir.",
      "O’daki komşu açıların toplamı 90°dir.",
    ],
    knowledge: [
      "Ters açı eşitliği kesişen iki doğruya dayanır.",
      "Komşu doğrusal çiftte toplam 180°dir; eşitlik yalnız diklikte gerçekleşir.",
    ],
    strategy:
      "Verilen tek koşulun kesişme olduğunu koru; ilave diklik veya paralellik varsayma.",
    steps: [
      "İki doğru kesiştiğinde karşılıklı açılar ters olur.",
      "Ters açı eşitliği için başka bir paralel doğru gerekmez.",
      "Örneğin60°, 120°, 60°, 120° kesişimi diğer seçeneklerin neden zorunlu olmadığını gösterir.",
    ],
    optionReasons: [
      "Ters açı eşitliği yalnız iki doğrunun kesişmesiyle elde edilir.",
      "60° ve 120° komşu olabilir; komşuların eşitliği zorunlu değildir.",
      "Diklik verilmediğinden bütün açıları 90° yapamazsın.",
      "İki ayrı kesişimde yöndeş eşitliği için uygun paralellik koşulu gerekir.",
      "Komşu doğrusal çiftin toplamı 90° değil 180°dir.",
    ],
    commonError:
      "Kaynakta geçen 'ters' sözcüğünü iç tersle karıştırıp bütün ters açıların paralellik istediğini sanmak.",
    check:
      "60°, 120°, 60°, 120° örneği 360°yi kaplar ve karşılıklılar eşittir.",
  },
  {
    prompt:
      "A ve B farklı noktalardır. [AB ışını için hangi açıklama doğrudur?",
    options: [
      "A’dan başlar, B yönünde sınırsız uzanır.",
      "B’den başlar, A yönünde sınırsız uzanır.",
      "A ve B arasında iki uçla sınırlıdır.",
      "İki yönde sınırsız uzanır ve başlangıcı yoktur.",
      "Çizimdeki ok büyütülünce ışının açı ölçüsü büyür.",
    ],
    knowledge: [
      "[AB ışınında ilk harf başlangıcı, ikinci harf yönü belirler.",
      "Işın tek yönde sınırsız, doğru iki yönde sınırsız, doğru parçası iki uçla sınırlıdır.",
    ],
    strategy:
      "Gösterimdeki başlangıcı bul ve diğer nesnelerle sınırlarını karşılaştır.",
    steps: [
      "[AB gösteriminin başlangıcı A’dır.",
      "Işın B’den geçerek B yönünde devam eder; B bir uç sınır değildir.",
      "Bu nedenle yalnız A’dan başlayıp B yönünde sınırsız uzanan açıklama uygundur.",
    ],
    optionReasons: [
      "A başlangıç ve B yön koşullarının ikisini de doğru verir.",
      "Bu açıklama [BA ışınına aittir; yön ters çevrilmiştir.",
      "Bu, [AB] doğru parçasının tanımıdır.",
      "Bu, AB doğrusunun özelliğidir; ışının başlangıcı vardır.",
      "Tek ışının kendi başına açı ölçüsü yoktur; çizim boyu açıklık ölçüsü değildir.",
    ],
    commonError: "B noktasını ışının sonu sanmak.",
    check:
      "Modelde B’yi ileri taşıdığında başlangıç A değişmez, ok aynı yönde devam eder.",
  },
  {
    prompt:
      "Aynı köşeyi ve bir kolu paylaşan, iç bölgeleri ayrık 30° ve 40°lik iki açı için hangisi doğrudur? Ortak olmayan kolların zıt ışın olduğu verilmemiştir.",
    options: [
      "Komşudurlar; toplamları 70° olduğundan doğrusal çift oluşturmazlar.",
      "Komşu oldukları için toplamları 180°dir.",
      "Toplamları 90° olduğundan tümlerdir.",
      "Ters açı olduklarından eşittirler.",
      "İç bölgeleri ayrık olduğundan açı adları kullanılamaz.",
    ],
    knowledge: [
      "Komşuluk, ortak köşe/kol ve ayrık iç bölgeler demektir.",
      "Doğrusal çift için ortak olmayan kolların zıt ışın olması gerekir.",
    ],
    strategy:
      "Verilen konumu adlandır, ardından gerçek ölçülerin toplamını hesapla.",
    steps: [
      "Ortak köşe ve ortak kol ile ayrık iç bölgeler komşuluk koşullarını sağlar.",
      "30+40=70°dir; ölçüler bu toplamla birlikte değerlendirilir.",
      "70° ne 90° ne 180° olduğundan çift tümler, bütünler veya doğrusal çift değildir.",
    ],
    optionReasons: [
      "Komşuluk koşulları sağlanır; 70° toplamı doğrusal çift olmadıklarını gösterir.",
      "Her komşu çift bütünler değildir; burada toplam 70°dir.",
      "30+40=70° olur; 90° değildir.",
      "Ters açılar ortak kol paylaşan komşu bölgeler değil, karşılıklı açılardır; 30≠40.",
      "İç bölgelerin ayrık olması komşuluğun tanımına dahildir; açı adlandırmasını engellemez.",
    ],
    commonError: "Komşu kelimesini doğrudan 180° toplamına çevirmek.",
    check:
      "180°ye tamamlamak için 70°den 110° daha gerekir; bu başka bir bölgedir.",
  },
];

guide.sections.push({
  title: "Koşul değiştiğinde çözüm yolunu değiştir",
  paragraphs: [
    "Bir problemde tümler deniyorsa toplam 90°, bütünler deniyorsa180° yazılır; aynı köşede olmaları gerekmez. Bir dik açıyı iki bölgeye ayırmak tümler ilişkiye yeni bir örnektir. İki doğrunun kesişimindeki ters açı eşitliğini komşu doğrusal toplamıyla karıştırma. Sayısal cevabının yanında neden o işlemi seçtiğini bir cümleyle açıkla.",
    "Paralellikte iç ters açıları eşitlemek için önce paralelliği doğrula. Kırık bir yol üzerinde açı ararken köşeden mevcut paralellere paralel bir yardımcı doğru çizmek, açıları iç ters veya yöndeş ilişkiyle taşımayı sağlar. Çizgi eklemek tek başına eşitlik yaratmaz; yeni doğrunun hangi doğruya paralel seçildiğini belirt. Karışık provada notu kapat, önce bağımsız çöz; gerekçeyle denetledikten sonra farklı verilerle yeniden dene.",
  ],
});
guide.examples.push(
  ...[
    {
      title: "Doğrusal çiftte toplamın nedenini söyle",
      prompt:
        "Doğrusal çift oluşturan iki komşu açının ölçüleri x° ve (2x+12)°dir. İki açı kaç derecedir?",
      strategy: "Zıt dış kolların verdiği 180° toplamını yaz.",
      steps: [
        {
          label: "Koşulu adlandır",
          explanation:
            "Doğrusal çiftte ortak olmayan kollar zıt ışındır; iki ölçünün toplamı180°dir.",
        },
        {
          label: "Denklemi çöz",
          explanation: "x+(2x+12)=180, 3x=168 ve x=56 bulunur.",
        },
        {
          label: "Ölçülere dön",
          explanation: "Diğer açı 2·56+12=124°dir; iki açı 56° ve 124°dir.",
        },
      ],
      answer: "56° ve 124°.",
      check: "56+124=180 ve 124=2·56+12 koşulları sağlanır.",
      pitfall:
        "Komşuluk yerine özellikle doğrusal çift koşulunu kullan; tümler toplamı90° değildir.",
    },
    {
      title: "127° ile kesişimin dört açısını tamamla",
      prompt:
        "Kesişen iki doğrunun oluşturduğu açılardan biri 127°dir. Tam karşısındaki ve ona komşu açılar kaç derecedir?",
      strategy: "Aynı kesişimde ters eşitlik ve doğrusal çift toplamını ayır.",
      steps: [
        {
          label: "Karşıya geç",
          explanation: "Tam karşıdaki açı ters olduğundan127°dir.",
        },
        { label: "Komşuya geç", explanation: "Komşu açı 180−127=53°dir." },
        {
          label: "Çevreyi tamamla",
          explanation: "Ölçüler sırayla127°,53°,127°,53° olur; toplam 360°dir.",
        },
      ],
      answer: "Karşı açı 127°, komşu açılar 53°dir.",
      check: "2·127+2·53=360.",
      pitfall:
        "Ters karşılıklı, komşu yan yana demektir; aynı ilişki değildir.",
    },
    {
      title: "İç ters açıları eşitle",
      prompt:
        "Paralel d₁ ve d₂ doğrularını bir kesen kesiyor. İç ters iki açının ölçüleri (3x+10)° ve (5x−20)°dir. x ve ortak açı ölçüsü nedir?",
      strategy:
        "Paralellik ve iç ters konumu eşitlik verir; toplam 180° kurma.",
      steps: [
        {
          label: "Koşulu yaz",
          explanation: "İç ters ve paralellik nedeniyle3x+10=5x−20.",
        },
        { label: "Bilinmeyeni bul", explanation: "30=2x ve x=15." },
        {
          label: "İki ifadeyi denetle",
          explanation: "3·15+10=55° ve 5·15−20=55°dir.",
        },
      ],
      answer: "x=15; ortak açı 55°dir.",
      check: "Her iki ifade55° verir; x=15 açı ölçüsüyle karıştırılmaz.",
      pitfall: "Paralellerde her çift180° toplamaz; iç ters çift eşittir.",
    },
    {
      title: "Tam turda eksik bölgeyi bul",
      prompt:
        "Bir noktanın çevresini boşluk ve örtüşme olmadan kaplayan dört açının üçü30°,85° ve 120°dir. Dördüncü açı kaç derecedir?",
      strategy: "Tam tur360°den bilinenlerin toplamını çıkar.",
      steps: [
        {
          label: "Bütünü seç",
          explanation:
            "Dört bölge bir tam çevreyi kapladığından toplam 360°dir.",
        },
        { label: "Bilinenleri topla", explanation: "30+85+120=235°." },
        {
          label: "Eksik açıyı bul",
          explanation: "360−235=125°; eksik bölge125°dir.",
        },
      ],
      answer: "125°.",
      check: "30+85+120+125=360.",
      pitfall:
        "180° yalnız yarım dönüş içindir; burada bütün nokta çevresi veriliyor.",
    },
    {
      title: "Desteği azalt: aynı yan iç açı",
      prompt:
        "Paralel iki doğruyu kesen bir doğrunun aynı yan iç açılarından biri 68°dir. Diğeri kaç derecedir?",
      strategy: "Önce ilişkiyi kendin adlandır, sonra farkı hesapla.",
      steps: [
        {
          label: "İlişki",
          explanation: "Paralellik ve aynı yan iç konumu toplam 180° verir.",
        },
        { label: "Hesap", explanation: "Diğer açı 180−68=112°dir." },
        {
          label: "Denetim",
          explanation: "68+112=180; biri dar, diğeri geniştir.",
        },
      ],
      answer: "112°.",
      check: "68° ile 112° bütünlerdir; eşit olmak zorunda değildir.",
      pitfall:
        "Aynı yan iç açıyla iç ters açıyı karıştırırsan68°yi yinelersin.",
    },
  ],
);
guide.recall.push(
  ...[
    {
      prompt: "37°nin tümleri kaç derecedir? Hangi toplamı kullandın?",
      answer: "90−37=53°. Tümler toplamı90°dir; komşuluk şartı yoktur.",
    },
    {
      prompt: "118°nin bütünleri kaç derecedir?",
      answer: "180−118=62°; iki ölçü 180°yi tamamlar.",
    },
    {
      prompt: "Kesişen iki doğruda82°nin ters açısı kaçtır?",
      answer: "82°; aynı kesişimde karşılıklı açılar eşittir.",
    },
    {
      prompt: "Paralellerin aynı yan iç açılarından biri 122° ise diğeri?",
      answer: "180−122=58°. Eşitlik değil toplam 180° kullanılır.",
    },
    {
      prompt: "Tam tur altı eş açıya ayrılırsa her birinin ölçüsü nedir?",
      answer: "360/6=60°. Eş parça sayısına tam dönüş bölünür.",
    },
  ],
);
items.push(
  ...[
    {
      prompt:
        "Doğrusal çift oluşturan iki komşu açının ölçüleri x° ve (2x+12)°dir. Küçük açı kaç derecedir?",
      options: ["56°", "124°", "26°", "84°", "60°"],
      knowledge: [
        "Doğrusal çiftte ortak olmayan kollar zıt ışındır; toplam 180°dir.",
      ],
      strategy: "x+(2x+12)=180 kur.",
      steps: ["x+2x+12=180.", "3x=168, x=56.", "Diğer açı 124°; küçük56°dir."],
      optionReasons: [
        "56° için diğeri 124° ve toplam 180°dir.",
        "124° büyük açıdır; küçük açı soruluyor.",
        "26°, tümler toplamı90° kullanıldığında çıkar; doğrusal çiftte yanlış bütündür.",
        "84°, 2x+12 yerine x+12 yazılıp iki kat koşulu atlandığında çıkar.",
        "60° için diğeri 132° olur; toplam 192°dir.",
      ],
      commonError:
        "x’i bulduktan sonra hangi ölçünün küçük olduğunu kontrol et.",
      check: "56+124=180 ve 124=2·56+12.",
    },
    {
      prompt:
        "İki doğru kesişiyor. Açılardan biri 127°dir. Bu açıya komşu açı kaç derecedir?",
      options: ["53°", "127°", "63°", "37°", "180°"],
      knowledge: ["Kesişen doğrularda komşu açılar doğrusal çift oluşturur."],
      strategy: "127°yi180°ye tamamla.",
      steps: [
        "Komşu doğrusal çiftin toplamı180°dir.",
        "180−127=53.",
        "Sorulan komşu açı 53°dir; ters açı ise127° olurdu.",
      ],
      optionReasons: [
        "53+127=180; komşu koşulu sağlanır.",
        "127° tam karşıdaki ters açının ölçüsüdür.",
        "63+127=190 olduğundan doğrusal çift sağlamaz.",
        "37+127=164 olduğundan doğrusal çift sağlamaz.",
        "180° iki açının toplamıdır, tek açı değildir.",
      ],
      commonError: "Ters açı ile komşu açıyı ayır.",
      check: "Kesişimde127°,53°,127°,53° toplam 360° eder.",
    },
    {
      prompt:
        "Paralel iki doğruyu kesen bir doğrunun iç ters açılarının ölçüleri (3x+10)° ve (5x−20)°dir. Ortak açı ölçüsü kaç derecedir?",
      options: ["55°", "15°", "95°", "125°", "30°"],
      knowledge: ["Paralellerin iç ters açıları eşittir."],
      strategy: "3x+10=5x−20 denklemini çöz ve açı ifadesine koy.",
      steps: [
        "3x+10=5x−20, 30=2x.",
        "x=15 bulunur.",
        "3·15+10=55 ve 5·15−20=55; ortak ölçü 55°dir.",
      ],
      optionReasons: [
        "İki açı ifadesi de55° verir.",
        "15 yalnız x’in değeridir.",
        "95° olması için ilk ifadeden x=85/3 gerekir; ikinci ölçü365/3° olur ve95°ye eşit değildir.",
        "125° doğru açının180°ye tamamlayıcısıdır; sorulan eşit çiftte yoktur.",
        "30=2x’tir; açı ölçüsü değildir.",
      ],
      commonError: "İç ters çiftte180° toplamı kurma.",
      check: "Eşitlik ve paralellik koşulları birlikte kullanıldı.",
    },
    {
      prompt:
        "Bir noktanın çevresini boşluk ve örtüşme bırakmadan kaplayan dört açıdan üçü 30°,85° ve 120°dir. Dördüncü açı kaç derecedir?",
      options: ["125°", "235°", "55°", "180°", "115°"],
      knowledge: ["Bir tam dönüş360°dir."],
      strategy: "Bilinen üç açının toplamını360°den çıkar.",
      steps: [
        "30+85+120=235.",
        "Dört bölge tam tur olduğundan toplam 360°dir.",
        "Eksik360−235=125°dir.",
      ],
      optionReasons: [
        "235+125=360; tam çevre tamamlanır.",
        "235° bilinen üç açının toplamıdır; eksik bölge değildir.",
        "55° için toplam 290° olur;70° eksik kalır.",
        "180° eklenirse toplam 415° olur.",
        "115° eklenirse toplam 350° olur;10° eksik kalır.",
      ],
      commonError: "Tam çevrede180° yerine360° kullan.",
      check: "30+85+120+125=360.",
    },
    {
      prompt:
        "Paralel iki doğruyu kesen bir doğrunun aynı yan iç açılarından biri 68°dir. Diğerinin ölçüsü kaç derecedir?",
      options: ["112°", "68°", "22°", "292°", "122°"],
      knowledge: ["Paralellerin aynı yan iç açıları bütünlerdir."],
      strategy: "180−68 hesapla.",
      steps: [
        "Paralellik ve aynı yan iç konumunu birlikte kullan.",
        "Toplam 180° olduğundan diğer açı 180−68.",
        "Diğer açı 112°dir.",
      ],
      optionReasons: [
        "68+112=180 koşulu sağlanır.",
        "68° iç ters veya yöndeş eş açı ilişkisinden gelebilirdi; burada aynı yan iç çift var.",
        "22° tümler toplamı90° kullanır.",
        "292° tam tur360°ye tamamlar; burada180° gerekir.",
        "122° ile 68° toplam 190° olur.",
      ],
      commonError: "Paralel doğrulardaki her çiftin eşit olduğunu düşünme.",
      check: "112° geniş,68° dar ve birlikte180°dir.",
    },
    {
      prompt: "37°ölçülü bir açının tümleri kaç derecedir?",
      options: ["53°", "143°", "37°", "63°", "323°"],
      knowledge: [
        "Tümler iki açının toplamı90°dir; komşuluk zorunlu değildir.",
      ],
      strategy: "90−37 hesapla.",
      steps: [
        "Tümler toplamı90°dir.",
        "Bilinmeyen 90−37=53.",
        "37+53=90° ile denetle.",
      ],
      optionReasons: [
        "53° doğru toplamı sağlar.",
        "143° bütünler ölçüsüdür;180−37 hesabıdır.",
        "37+37=74°; tümler olmaz.",
        "37+63=100°;90°yi aşar.",
        "323° tam dönüşe tamamlar; tümler toplamı değildir.",
      ],
      commonError: "Tümler ile bütünleri karıştırma.",
      check: "53° pozitif ve 90°den küçüktür.",
    },
    {
      prompt: "118°ölçülü bir açının bütünleri kaç derecedir?",
      options: ["62°", "28°", "118°", "242°", "72°"],
      knowledge: ["Bütünler toplamı180°dir."],
      strategy: "180−118 hesapla.",
      steps: [
        "118° verildi ve bütünleri isteniyor.",
        "Bilinmeyen 180−118=62.",
        "118+62=180° denetlenir.",
      ],
      optionReasons: [
        "62° doğru bütünü tamamlar.",
        "28° için toplam 146° olur.",
        "118+118=236°; bütünler olmaz.",
        "242° tam dönüşe tamamlar;360° toplamını kullanır.",
        "72° için toplam 190° olur.",
      ],
      commonError:
        "Açı geniş olsa da bütünleri dar olabilir;90°yi yanlış bütün seçme.",
      check: "118° geniş ve 62° dar birlikte180°dir.",
    },
    {
      prompt:
        "İki doğru kesişiyor. Açılardan biri 82°ise tam karşısındaki ters açı kaç derecedir?",
      options: ["82°", "98°", "8°", "164°", "278°"],
      knowledge: ["Aynı kesişimde ters açılar eşittir."],
      strategy: "Karşılıklı konumu belirle ve ölçüyü eşitle.",
      steps: [
        "Sorulan açı aynı kesişimde tam karşıdadır.",
        "Ters açı eşitliği82°=sorulan açı verir.",
        "Sorulan82°; komşu sorulsaydı98° olurdu.",
      ],
      optionReasons: [
        "82° ters açı eşitliğini sağlar.",
        "98° komşu açının ölçüsüdür.",
        "8° tümler hesabıdır; burada gerekmez.",
        "164° iki ters açının toplamıdır, tek açı değildir.",
        "278° tam dönüşe tamamlar; ters ilişki değildir.",
      ],
      commonError: "Karşıdakiyle yanındakini ayır.",
      check: "82+98+82+98=360°.",
    },
    {
      prompt:
        "Paralel iki doğruyu kesen bir doğrunun aynı yan iç açılarından biri 122°dir. Diğer açı kaç derecedir?",
      options: ["58°", "122°", "32°", "238°", "68°"],
      knowledge: ["Paralellerin aynı yan iç açıları180°ye tamamlanır."],
      strategy: "180−122 hesapla.",
      steps: [
        "Açıların konumu aynı yan iç olarak verildi.",
        "Paralellik sayesinde toplam 180°dir.",
        "Diğer açı 180−122=58°dir.",
      ],
      optionReasons: [
        "122+58=180° olur.",
        "122° eş açı varsayar; aynı yan iç çiftte toplam kullanılır.",
        "32° için toplam 154° olur.",
        "238° tam dönüşe tamamlar; istenen çift180° toplar.",
        "68° için toplam 190° olur.",
      ],
      commonError: "İç ters çiftle aynı yan iç çifti karıştırma.",
      check: "58° pozitif ve 122° ile bütünlerdir.",
    },
    {
      prompt:
        "Bir tam dönüş altı eş açı bölgesine ayrılıyor. Her parçanın ölçüsü kaç derecedir?",
      options: ["60°", "30°", "90°", "120°", "6°"],
      knowledge: ["Tam dönüş360°dir; eş parçaların ölçüleri aynıdır."],
      strategy: "360°yi parça sayısına böl.",
      steps: [
        "Bütün360°, eş parça sayısı6.",
        "Bir parça360/6=60.",
        "Altı parça6·60=360° verir.",
      ],
      optionReasons: [
        "60° altı kez360°yi tamamlar.",
        "30°yarım dönüş180°yi altıya bölmekten çıkar.",
        "90° dört eş parçaya karşılık gelir.",
        "120° üç eş parçaya karşılık gelir.",
        "6°parça sayısını ölçü sanır;6·6=36°dir.",
      ],
      commonError: "Parça sayısı ile dereceyi birbirine karıştırma.",
      check: "60° dar açıdır ve 6·60=360°dir.",
    },
  ],
);

guide.sections.push({
  title: "Bir tam turdan ÖSYM çözümüne geç",
  paragraphs: [
    "Dikdörtgen duvarlar içindeki bir noktadan saat yönünde eşit açılarla sıralanan ışınları düşün. İlk ışının altıncıda, arada yalnız bir tam tur tamamlanarak yinelenmesi beş eş dönüş aralığı verir: 360°/5=72°. Burada altı ışın etiketi olması altı farklı aralık olduğu anlamına gelmez; 1’den 2’ye ilk, 5’ten 6’ya beşinci aralıktır. Modelde Sonraki dönüş düğmesiyle her aralığı ayrı izle.",
    "Örnekte2. ışının alt yatay duvarla yaptığı dar açı,3. ışının sol düşey duvarla yaptığı dar açıya eşittir. Yatay ve düşey90° oluşturur; ardışık iki ışın arasındaki72° çıkarıldığında 18° kalır. Eş iki payın her biri 9°dir. Böylece3. ışın yataya9° uzaktır; sonraki72° dönüşle4. ışının üst yatay duvarla yaptığı dar açı 72°−9°=63° olur. Bu çözüm,2024 TYT Temel Matematik 31. sorunun resmî kitapçık ve cevap anahtarıyla karşılaştırılmış özgün açıklamasıdır: D seçeneği 63°. O soru ile uygulamanın özgün alıştırmalarının kimlikleri ayrı tutulur; sayfadaki tek örnek bütün geçmiş sınav arşivini temsil etmez.",
  ],
});

guide.sections.push(...lineAngles042.sections);
guide.examples.push(...lineAngles042.examples);
guide.recall.push(...lineAngles042.recall);

export const geometrySourceAngles032Guides: LessonGuide[] = [guide];
export const geometrySourceAngles032Lessons: Lesson[] = [
  {
    id,
    subjectId: "tyt-geometri",
    title: txt("Geometrinin dili: kaynakla pekiştir"),
    minutes: guide.minutes,
    objectives: guide.objectives.map(txt),
    source: txt(source),
    tags: ["temel-geometri", "kaynakli-anlatim", "Özgün öğretim soruları"],
    body: guide.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: [...items.map((item, index): Question => {
      const order = item.options.map((_, j) => (j + 2 * index + 1) % 5);
      const guidance: QuestionGuidance = {
        knowledge: item.knowledge,
        strategy: item.strategy,
        steps: item.steps,
        optionReasons: order.map((j) => item.optionReasons[j]),
        commonError: item.commonError,
        check: item.check,
      };
      return {
        id: `f032-${id}-${index + 1}`,
        prompt: txt(item.prompt),
        options: order.map((j) => txt(item.options[j])),
        answer: order.indexOf(0),
        hint: txt(item.strategy),
        explanation: txt(item.steps.join(" ") + " Denetim: " + item.check),
        skill: id,
        guidance,
      };
    }), ...lineAnglesPractice042],
  },
];
export const geometrySourceAngles032Sheets: CheatSheet[] = [
  {
    topicId: `topic-${id}`,
    lessonId: id,
    title: "Geometrinin dili ve açı ilişkileri",
    subjectId: "tyt-geometri",
    sections: [
      {
        title: "Nesneyi uçlarından ayır",
        text: [
          "Nokta konumdur. Doğru iki yönde sınırsız; [AB ışını A başlangıçlı ve B yönünde sınırsız; [AB] iki uçla sınırlıdır.",
        ],
      },
      {
        title: "Köşe ve ölçü",
        text: [
          "∠ABC’de köşe B, kollar [BA ve [BC. Dar 0°–90° ve geniş 90°–180° aralıklarında uçlar dahil değil; dik 90°, doğru 180°, tam 360°.",
        ],
      },
      {
        title: "Toplam ilişkileri",
        text: [
          "Tümler 90°, bütünler 180°. Komşuluk tek başına toplam vermez; ortak olmayan kollar zıt ışınsa doğrusal çift ve 180° toplamı oluşur.",
        ],
      },
      {
        title: "Ters ve paralel açıları",
        text: [
          "Aynı kesişimde ters açılar eşittir; paralellik gerekmez. Paralellerde yöndeş/iç ters/dış ters eşit, aynı yan iç açıların toplamı180°dir.",
        ],
      },
      {
        title: "Denklemden soruya dön",
        text: [
          "x’i bulduktan sonra açı ifadesine koy; komşu soruluyorsa180°den çıkar. Görünüşten ölçü veya paralellik çıkarma; verilen koşulu kullan.",
        ],
      },
      ...lineAngles042.sheet,
    ],
    examples: [guide.examples[4], guide.examples[6], ...lineAngles042.examples].map((e) => ({
      title: e.title,
      prompt: e.prompt,
      steps: e.steps.map((s) => s.label + ": " + s.explanation),
      answer: e.answer + " " + e.check,
    })),
    cautions: [
      "İki katından 6° fazla, 2x+6 demektir; x+6 değildir.",
      "x=25, ölçünün 25° olduğu anlamına gelmez.",
      "Ters açı ile iç ters açı farklı konumları adlandırır.",
    ],
    recall: [...guide.recall.slice(0, 3), ...lineAngles042.recall],
    source,
  },
];
