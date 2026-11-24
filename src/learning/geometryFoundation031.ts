import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide, WorkedExample, GuideSection } from "./guides/types";
import type { CheatSheet } from "./cheatsheetContent";
import {
  triangleAngles042, triangleSides042,
} from "./geometryConditions042Teaching";
import {
  triangleAnglesPractice042, triangleSidesPractice042,
} from "./geometryConditions042Practice";

interface FoundationItem031 extends QuestionGuidance {
  prompt: string;
  options: string[];
}
interface FoundationPack031 {
  id: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: FoundationItem031[];
  source: string;
}
// These are additional foundation units. Their progress never aliases old workbook IDs.
// All exercises are original teaching questions, not reproductions of official questions.
const packs031: FoundationPack031[] = [
  {
    id: "tyt-geo-temel-acilar-031",
    title: "Geometrinin dili: temel açılar ve paralellik",
    minutes: 36,
    objectives: [
      "Nokta, doğru, ışın ve doğru parçasını ayır; açı adından köşeyi belirle.",
      "Tümler, bütünler, ters ve komşu açı ilişkilerinin koşullarını açıkla.",
      "Paralel doğrularda açı çiftini konumundan seç; eşitlik veya toplam bağıntısı kur.",
      "Şeklin görünüşü yerine verilen işaretlerle çözümünü gerekçelendir.",
    ],
    sections: [
      {
        title: "Şekli okumaya isimlerden başla",
        paragraphs: [
          "Nokta bir konumu gösterir; uzunluğu olan küçük bir disk anlamına gelmez. A ve B’den geçen doğru iki yönde sınırsız uzanır. [AB] doğru parçası iki uçla sınırlıdır; [AB ışınının başlangıcı A’dır, B ise yönünü belirler. Bu üç nesnenin aynı çizgi üzerinde görünmesi onları aynı nesne yapmaz.",
          "∠ABC yazıldığında köşe ortadaki B’dir; açının kolları [BA ve [BC ışınlarıdır. Bir açıyı araştırırken önce köşeyi, sonra hangi iki ışın arasındaki bölgenin sorulduğunu belirle. Sayfada çizilen kolun uzatılması, ışının yönü aynı kaldığı sürece açının ölçüsünü değiştirmez.",
        ],
      },
      {
        title: "Açıyı uzunlukla değil dönüşle ölç",
        paragraphs: [
          "Bir tam dönüş 360°, yarım dönüş 180°, çeyrek dönüş 90°dir. Dar açı 0° ile 90° arasında, geniş açı 90° ile 180° arasındadır; sınır değerler bu aralıklara dahil değildir. 90° dik, 180° doğru, 360° tam açıdır.",
          "İki kısa kol arasında çizilmiş 60° ile iki uzun kol arasındaki 60° aynı ölçüdedir. Şeklin geniş görünmesi bir veri değildir; ölçü, diklik karesi, eş açı yayı veya yazılı koşul gerekir. Sayısal sonuç 0° ya da 180° olursa sorudaki dar veya geniş açı koşulunu yeniden denetle.",
        ],
      },
      {
        title: "Toplam mı eşitlik mi?",
        paragraphs: [
          "Tümler iki açının toplamı 90°, bütünler iki açının toplamı 180°dir. Bu iki kavram açının konumundan çok ölçüler arasındaki ilişkiyi söyler; açıların aynı köşede veya yan yana olması gerekmez. Bir açının tümleri 90°−α, bütünleri 180°−α ile bulunur; negatif değer çıkıyorsa seçtiğin ilişki uygun değildir.",
          "Komşu açılar aynı köşeyi ve bir kolu paylaşır; iç bölgeleri örtüşmez. Komşu olmaları tek başına 180° toplamı vermez. Ortak olmayan iki kol ayrıca zıt ışınsa doğrusal çift oluşur ve toplam 180° olur. Bir noktanın çevresini boşluk veya örtüşme bırakmadan kaplayan açılar ise toplam 360°dir.",
        ],
      },
      {
        title: "Kesişen doğrularda ters açıları izle",
        paragraphs: [
          "İki doğru kesiştiğinde karşı karşıya duran açı çiftleri ters açılardır ve ölçüleri eşittir. Yan yana duranlar ise doğrusal çift oluşturur. Örneğin bir açı 68° ise karşısı 68°, komşularının her biri 112°dir; dört açının toplamı 360° çıkar.",
          "Ters açı eşitliği paralellik gerektirmez; aynı kesişimde iki doğru olması yeterlidir. Farklı iki kesişimde karşılıklı gibi duran açıları hemen ters açı sayma. Bir denklem kurarken hangi eşitliğin aynı köşeden, hangisinin paralellikten geldiğini söylemek gereksiz hesapları azaltır.",
        ],
      },
      {
        title: "Paralellik açıları birbirine bağlar",
        paragraphs: [
          "d₁ ve d₂ paralel iki doğruyu bir kesen kestiğinde, iki kesişimde aynı köşe konumundaki açılar yöndeştir ve eşittir. Paralellerin arasında, kesenin karşı yanlarında bulunan iç ters açılar da eşittir. Dış ters çiftler paralellerin dışında ve kesenin karşı yanlarında yer alır.",
          "Paraleller arasında kesenin aynı yanındaki iki iç açı ise bütünlerdir: toplam 180°dir. İlişkiyi harf şekli ezberinden önce konumla bul: içeride mi dışarıda mı, aynı yanda mı karşı yanda mı? Sayfa veya şekil dönse de bu koşullar korunur. Paralellik verilmemişse bu sonuçları görünüşe dayanarak kullanamazsın.",
        ],
      },
      {
        title: "Açıortay ve yardımcı çizgiyle yükü azalt",
        paragraphs: [
          "Açıortay, verilen açının iç bölgesinden geçen ve onu eş ölçülü iki açıya ayıran ışındır. Açının tamamı 2x ise her parça x’tir. Komşu bütünler iki açının iç açıortayları arasındaki açı, 180°nin yarısı olduğu için 90°dir. Burada hem komşuluk hem bütünlerlik hem de iç açıortay koşulu önemlidir.",
          "Paraleller arasındaki kırık bir yol üzerinde açı ararken kırılma noktasından paralellere paralel yardımcı bir doğru çizmek işe yarar. Böylece tek karışık açı, iç ters veya yöndeş açıyla taşınabilen iki parçaya ayrılır. Yardımcı çizginin neden paralel seçildiğini belirt; sadece çizgi eklemek yeni bir eşitlik yaratmaz.",
        ],
      },
      {
        title: "Denklemden sonra şekle geri dön",
        paragraphs: [
          "Önce ilişkiyi sözcükle söyle: ters oldukları için eşit; doğrusal çift oldukları için toplamları 180° gibi. Sonra cebirsel ifadeleri yerleştir. Bulduğun x her zaman istenen açının ölçüsü değildir; soru 3x+8°yi soruyorsa x’i geri koymalısın.",
          "Son kontrolde her açının ölçüsünü, dar/geniş sınıfını ve kullanılan koşulu birlikte denetle. Eşit çıkan iki açı uygun konumdaki yöndeş açılarsa paralellik ters yönde de kanıtlanabilir. Fakat farklı konumda seçilmiş iki rastgele açının eşitliği tek başına paralellik kanıtı değildir.",
        ],
      },
    ],
    examples: [
      {
        title: "Tümler iki açıyı tek bilinmeyenle kur",
        prompt:
          "Tümler iki açıdan büyük olanı küçük olanın 2 katından 12° fazladır. Küçük açı kaç derecedir?",
        strategy:
          "Önce 90° toplamını seç; sonra büyük açıyı küçük açı cinsinden yaz.",
        steps: [
          {
            label: "İlişkiyi belirle",
            explanation:
              "Küçük açı x ise büyük açı 2x+12°dir. Tümler oldukları için toplam 90° olmalıdır.",
          },
          {
            label: "Denklemi çöz",
            explanation: "x+(2x+12)=90 eşitliği 3x=78 ve x=26 verir.",
          },
          {
            label: "Ölçülere dön",
            explanation:
              "Diğer açı 64°dir. 26+64=90 ve 64=2·26+12 koşullarının ikisi de sağlanır.",
          },
        ],
        answer: "Küçük açı 26°dir.",
        check: "İki açı da pozitiftir ve 90°den küçüktür.",
        pitfall: "Tümler sözcüğünü bütünlerle karıştırıp 180° kullanma.",
      },
      {
        title: "Ters açıdan komşu açıya geç",
        prompt:
          "İki doğru O’da kesişiyor. Ters iki açının ölçüleri 5x−8° ve 3x+24°dir. Bu açılardan birine komşu olan açı kaç derecedir?",
        strategy:
          "Önce ters açı eşitliğinden x’i, ardından doğrusal çiftten komşuyu bul.",
        steps: [
          {
            label: "Eşitliği kur",
            explanation: "Ters açılar eşit olduğundan 5x−8=3x+24 yazılır.",
          },
          {
            label: "Bilinmeyeni bul",
            explanation: "2x=32, x=16; ters açıların her biri 72°dir.",
          },
          {
            label: "İstenen açıyı ayır",
            explanation:
              "Komşu açı 180−72=108°dir; x=16 veya 72° sorunun son cevabı değildir.",
          },
        ],
        answer: "Komşu açı 108°dir.",
        check: "72+108=180 ve 2·72+2·108=360.",
        pitfall: "Denklemdeki x’i doğrudan istenen açı sanma.",
      },
      {
        title: "Paralellerde aynı yandaki iç açı",
        prompt:
          "Paralel d₁ ve d₂ doğrularını bir kesen kesiyor. Aynı yandaki iki iç açı 4x+16° ve 2x+20°dir. Büyük açı kaç derecedir?",
        strategy:
          "Konum aynı yan iç olduğundan açıları eşitlemek yerine toplamlarını 180° al.",
        steps: [
          {
            label: "Koşulu kullan",
            explanation:
              "Paralellik verildiği için (4x+16)+(2x+20)=180 yazılır.",
          },
          {
            label: "Hesapla",
            explanation: "6x+36=180, x=24 bulunur. Açılar 112° ve 68°dir.",
          },
          {
            label: "Soruyu yanıtla",
            explanation:
              "Büyük açı 112°dir; diğerinin dar olması ve toplamın 180° çıkması konumla uyumludur.",
          },
        ],
        answer: "Büyük açı 112°dir.",
        check:
          "112+68=180; bulunan iki açı birbirine eşit olmak zorunda değildir.",
        pitfall: "İç ters ile aynı yan iç çiftini karıştırma.",
      },
    ],
    recall: [
      {
        prompt: "∠PQR açısının köşesi neresidir? Kolları nasıl adlandırılır?",
        answer: "Köşe Q’dur; kollar [QP ve [QR ışınlarıdır.",
      },
      {
        prompt:
          "Komşu iki açının bütünler olduğunu söylemek için hangi ek koşul yeterlidir?",
        answer:
          "Ortak olmayan kolların zıt ışın olması gerekir; bu durumda doğrusal çift oluşur.",
      },
      {
        prompt:
          "Paralel iki doğruyu kesen bir doğrunun aynı yan iç açıları neden eşit olmak zorunda değildir?",
        answer:
          "Bu çiftin zorunlu ilişkisi eşitlik değil, ölçüleri toplamının 180° olmasıdır.",
      },
      {
        prompt:
          "Ters açı eşitliği ile yöndeş açı eşitliğinin koşul farkı nedir?",
        answer:
          "Ters açılar aynı kesişimde iki doğruyla oluşur. Farklı kesişimlerde yöndeşlerin eşitliği için paralellik gerekir.",
      },
    ],
    items: [
      {
        prompt:
          "∠KLM açısı [LK ve [LM ışınlarıyla oluşturulmuştur. Açının köşesi hangi noktadır?",
        options: [
          "L",
          "K",
          "M",
          "KM parçasının orta noktası",
          "Işınların uzunlukları verilmeden bulunamaz.",
        ],
        knowledge: [
          "Üç harfli açı adında köşe ortadaki harftir.",
          "Açının kolları aynı başlangıç noktasına sahiptir.",
        ],
        strategy: "Açı adını ve ışınların başlangıcını karşılaştır.",
        steps: [
          "∠KLM adının ortasındaki harf L’dir.",
          "[LK ve [LM ışınlarının ikisi de L’den başlar.",
          "Bu ortak başlangıç açının köşesi olduğundan cevap L’dir.",
        ],
        optionReasons: [
          "L hem ortadaki harf hem iki ışının ortak başlangıcıdır.",
          "K, [LK ışınının yönünü belirler; ortak başlangıç değildir.",
          "M, [LM ışınının üzerindeki bir noktadır; köşe değildir.",
          "Açı için KM parçasının orta noktası kullanılmaz.",
          "Kol uzunlukları köşenin belirlenmesini etkilemez.",
        ],
        commonError: "Açı adındaki ilk harfi otomatik olarak köşe seçmek.",
        check:
          "∠MLK aynı iki ışını ters sırayla adlandırır ve yine L köşelidir.",
      },
      {
        prompt:
          "α=124° ve β=56° olan iki açı farklı köşelerdedir. Bu iki açı için kesin doğru olan hangisidir?",
        options: [
          "Bütünlerdir.",
          "Tümlerdir.",
          "Ters açılardır.",
          "Komşu açılardır.",
          "İkisi de geniş açıdır.",
        ],
        knowledge: [
          "Bütünler açıların toplamı 180°dir.",
          "Bütünlerlik aynı köşede bulunmayı gerektirmez.",
        ],
        strategy: "Ölçü toplamını hesapla; konum gerektiren adları ayır.",
        steps: [
          "124+56=180 hesaplanır.",
          "Bu toplam bütünler açı tanımıdır.",
          "Köşeler farklı olduğu için ters veya komşu olma sonucu çıkarılamaz.",
        ],
        optionReasons: [
          "Ölçüleri toplamı 180° olduğu için bütünlerdir.",
          "Tümlerlik 90° toplamı gerektirir.",
          "Ters açıların ortak bir kesişim köşesi vardır.",
          "Komşu açıların köşesi ve bir kolu ortak olmalıdır.",
          "56° dar açıdır; iki açı birden geniş değildir.",
        ],
        commonError:
          "Bütünler açıların mutlaka yan yana olması gerektiğini sanmak.",
        check: "124°nin bütünleri 180−124=56°dir.",
      },
      {
        prompt:
          "Tümler iki açıdan biri diğerinden 18° büyüktür. Küçük açı kaç derecedir?",
        options: ["36", "54", "72", "81", "18"],
        knowledge: ["Tümler iki açı toplamı 90°dir."],
        strategy: "Küçük açıya x, büyüğe x+18 de.",
        steps: [
          "x+(x+18)=90 yazılır.",
          "2x=72 olduğundan x=36 bulunur.",
          "Diğer açı 54°dir; istenen küçük açı 36°dir.",
        ],
        optionReasons: [
          "36+54=90 ve fark 18 olduğundan 36 doğrudur.",
          "54° büyük açıdır; küçük açı sorulmaktadır.",
          "72, denklemde 2x’in değeridir.",
          "81 ile 99 farkı 18 olsa da toplamları 180 olur.",
          "18 verilen farktır; açı ölçüsü değildir.",
        ],
        commonError: "Tümlerlik yerine 180° toplamı kurmak.",
        check: "90−36=54 ve 54−36=18.",
      },
      {
        prompt:
          "İki doğru O noktasında kesişiyor. Birbirine ters iki açı 4x+5° ve 2x+43°dir. Bu açılardan birine komşu olan açı kaç derecedir?",
        options: ["99", "81", "19", "137", "90"],
        knowledge: ["Ters açılar eşittir.", "Doğrusal çiftin toplamı 180°dir."],
        strategy: "Önce x’i, sonra ters açıyı, en son komşusunu bul.",
        steps: [
          "4x+5=2x+43 eşitliğinden x=19 bulunur.",
          "Verilen ters açıların ölçüsü 4·19+5=81°dir.",
          "Komşu açı 180−81=99°dir.",
        ],
        optionReasons: [
          "99° ile 81° doğrusal çift oluşturur.",
          "81° verilen ters açılardan biridir; komşusu soruluyor.",
          "19 cebirsel x değeridir; açı 4x+5 biçimindedir.",
          "137, x’i yanlış ifadeye yerleştirmekten doğar; 81 ile bütünler değildir.",
          "Verilen ters açı 81° olduğundan komşusu 99°dir; 90° bu verilerle çelişir.",
        ],
        commonError: "x’i açıyla veya ters açıyı komşusuyla karıştırmak.",
        check: "Dört açı 81,99,81,99 olup toplamları 360°dir.",
      },
      {
        prompt:
          "A, O, B aynı doğru üzerinde ve O, A ile B arasındadır. [OC ışını ∠AOB doğru açısının bir yarı düzlemindeki iç bölgesinde kalıyor. m(∠AOC)=3x+12° ve m(∠COB)=2x+18° ise x kaçtır?",
        options: ["30", "12", "36", "60", "75"],
        knowledge: ["OA ve OB zıt ışındır.", "Doğru açı 180°dir."],
        strategy: "İki parçanın doğru açıyı birlikte kapladığını kullan.",
        steps: [
          "A,O,B sırası OA ile OB’nin zıt ışın olduğunu söyler.",
          "(3x+12)+(2x+18)=180, yani 5x+30=180 yazılır.",
          "5x=150 ve x=30 bulunur; parçalar 102° ile 78°dir.",
        ],
        optionReasons: [
          "x=30 için iki parça 102° ve 78° olup 180°yi tamamlar.",
          "12, sabit terimlerden biridir; denklemin çözümü değildir.",
          "36 seçilirse toplam 210° olur.",
          "60 seçilirse toplam 330° olur.",
          "75 seçilirse toplam 405° olur.",
        ],
        commonError:
          "Her komşu çifti koşulsuz bütünler saymak; burada zıt ışın koşulu açıkça vardır.",
        check: "3·30+12+2·30+18=180.",
      },
      {
        prompt:
          "Bir noktanın çevresini örtüşmeden ve boşluk bırakmadan kaplayan dört açı x°, 2x°, 80° ve 100°dir. En küçük açı kaç derecedir?",
        options: ["60", "80", "90", "100", "120"],
        knowledge: ["Bir noktanın çevresindeki tam açı 360°dir."],
        strategy:
          "Dört parçanın toplamından x’i bul, sonra ölçüleri karşılaştır.",
        steps: [
          "x+2x+80+100=360 yazılır.",
          "3x=180 olduğundan x=60 çıkar.",
          "Ölçüler 60,120,80,100 olduğundan en küçük 60°dir.",
        ],
        optionReasons: [
          "60° bulunan dört ölçünün en küçüğüdür.",
          "80° verilen bir parçadır ama 60°den büyüktür.",
          "x=90 seçilirse dört açının toplamı 90+180+80+100=450° olur; 360° koşulunu bozar.",
          "100° verilen parçalardan biridir; en küçük değildir.",
          "120°, 2x’in değeridir; en büyük parçadır.",
        ],
        commonError:
          "Tam tur yerine 180° kullanmak veya x ile 2x’i aynı açı sanmak.",
        check: "60+120+80+100=360.",
      },
      {
        prompt:
          "Paralel d₁ ve d₂ doğrularını bir kesen kesmektedir. Yöndeş iki açının ölçüleri 3x+7° ve 5x−29°dir. Bu açılardan her biri kaç derecedir?",
        options: ["61", "18", "119", "83", "36"],
        knowledge: ["Paralel doğrularda yöndeş açılar eşittir."],
        strategy: "Aynı konumdaki açıları eşitle, bulunan x’i geri yerleştir.",
        steps: [
          "3x+7=5x−29 eşitliği yazılır.",
          "2x=36 olduğundan x=18 bulunur.",
          "Açı ölçüsü 3·18+7=61°dir; diğer ifade de 61 verir.",
        ],
        optionReasons: [
          "Her iki ifade x=18 için 61° verir.",
          "18 değişkenin değeridir; istenen açı değildir.",
          "119°, 61°nin komşu bütünleridir; yöndeş çift değildir.",
          "83 iki ifadeden birine doğru yerleştirmeyle elde edilmez.",
          "36, 2x’in değeridir; açı değildir.",
        ],
        commonError: "Yöndeş açıları toplamları 180° olacak biçimde ele almak.",
        check: "5·18−29=61.",
      },
      {
        prompt:
          "Paralel d₁ ve d₂ doğrularını bir kesen kesiyor. Aynı yandaki iki iç açının ölçüleri 2x+15° ve 3x−5°dir. Küçük açı kaç derecedir?",
        options: ["83", "97", "34", "90", "68"],
        knowledge: ["Paralellerin aynı yan iç açıları bütünlerdir."],
        strategy: "İfadelerin toplamını 180° al, iki sonucu karşılaştır.",
        steps: [
          "(2x+15)+(3x−5)=180 yazılır.",
          "5x+10=180 olduğundan x=34 bulunur.",
          "Açılar 83° ve 97°dir; küçük olan 83°dir.",
        ],
        optionReasons: [
          "83° iki açıdan küçüğüdür ve 97° ile toplamı 180°dir.",
          "97° büyük açı olduğundan istenen değildir.",
          "34 değişkenin değeridir.",
          "Verilen iki ifade aynı x ile 90° olamaz; x=34 için ölçüler 83° ve 97°dir.",
          "68 yalnız 2x’tir; +15 sabit terimi eksiktir.",
        ],
        commonError: "Aynı yan iç açıları iç ters sanıp eşitlemek.",
        check: "2·34+15=83 ve 3·34−5=97.",
      },
      {
        prompt:
          "A, O, B aynı doğru üzerinde ve O aradadır. [OC ışını doğru açıyı iki komşu açıya ayırıyor. [OD, ∠AOC’nin; [OE, ∠COB’nin iç açıortayıdır. Bu açıortayların aynı yarı düzlemde kalan ∠DOE açısı kaç derecedir?",
        options: ["90", "45", "60", "120", "Verilen bilgilerle belirlenemez."],
        knowledge: [
          "Komşu bütünler açıların toplamı 180°dir.",
          "İç açıortay her açıyı yarıya böler.",
        ],
        strategy: "Açıları α ve β diye adlandır, yarımlarının toplamını al.",
        steps: [
          "∠AOC=α ve ∠COB=β ise α+β=180°dir.",
          "OD ile OE arasındaki açı α/2+β/2’dir.",
          "(α+β)/2=180/2=90° bulunur.",
        ],
        optionReasons: [
          "90°, bütünler açıların yarımlarının toplamıdır.",
          "45°, toplam 90° olsaydı elde edilirdi; burada doğru açı 180°dir.",
          "Bu iki iç açıortay arasındaki toplam 90° olduğundan 60° uymaz.",
          "120°, yarımların toplamı 90°yle çelişir.",
          "Tek tek α ve β bilinmese de yarımların toplamı sabittir.",
        ],
        commonError:
          "Açıortayların arasındaki açıyı ilk açılardan yalnız birinin yarısı sanmak.",
        check:
          "Örneğin 70° ve 110° seçildiğinde 35+55=90 çıkar; toplamın değişmemesi cebirle kanıtlandı.",
      },
      {
        prompt:
          "Ayrı iki doğruyu bir kesen kesiyor. Yöndeş konumdaki iki açının ölçüleri eşit bulunuyor. Öklid düzleminde aşağıdaki sonuçlardan hangisi zorunludur?",
        options: [
          "Bu iki doğru paraleldir.",
          "Kesen iki doğruya da diktir.",
          "Bütün açılar 90°dir.",
          "İki doğru çakışıktır.",
          "Yalnız şeklin ölçeği bilinirse karar verilebilir.",
        ],
        knowledge: ["Yöndeş açı eşitliğinin tersi paralellik ölçütüdür."],
        strategy:
          "Eşitliğin yalnız sayı değil uygun konum koşuluyla verildiğini kullan.",
        steps: [
          "Açılar ayrı kesişimlerde yöndeş konumdadır.",
          "Bu iki açının eşitliği, doğruların kesene göre aynı yönü yaptığını gösterir.",
          "Yöndeşlik ölçütünün tersinden doğrular paraleldir.",
        ],
        optionReasons: [
          "Uygun konumdaki yöndeş açı eşitliği paralelliği kanıtlar.",
          "Yöndeşler 40° de olabilir; diklik zorunlu değildir.",
          "Eşitlik 90° değerini zorunlu kılmaz.",
          "Ayrı doğrular verildiğinden çakışıklık sonucu çıkmaz.",
          "Açı ölçütü ölçekten bağımsızdır.",
        ],
        commonError:
          "Eşit herhangi iki açıdan paralellik çıkarmak; burada yöndeş konum şarttır.",
        check:
          "40° yöndeş açıları olan paralel doğrular örneği dikliğin gerekli olmadığını gösterir.",
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri, PDF 113–115 (basılı111–113); Aurelia Geometrinin Dili ve Doğruda Açılar, PDF 1–4; Aurelia TYT Geometri Tüm Konular ve Formüller, PDF 2. Kaynak ilişkileri karşılaştırılarak yazılmış özgün anlatım ve özgün öğretim soruları.",
  },
  {
    id: "tyt-geo-ucgende-acilar-031",
    title: "Üçgende açılar: iç açıdan yardımcı çizgiye",
    minutes: 38,
    objectives: [
      "Üçgenin varlık koşulunu ve iç-dış açı ilişkilerini açıkla.",
      "İkizkenar ve eşkenar üçgenlerde eş kenarları doğru karşı açılarla eşleştir.",
      "İç açıortayların ve tepe yüksekliğinin oluşturduğu açıları gerekçeyle hesapla.",
      "Birleşik şekillerde her üçgenin açı toplamını ayrı kullan.",
    ],
    sections: [
      {
        title: "Üç köşe bir üçgeni nasıl oluşturur?",
        paragraphs: [
          "Bir düzlemde aynı doğru üzerinde olmayan A, B ve C noktalarını [AB], [BC], [CA] parçalarıyla birleştirdiğinde üçgen oluşur. Noktalar aynı doğru üzerindeyse kapalı bir iç bölge oluşmaz. Bu nedenle üçgenin iç açıları pozitiftir ve her biri 180°den küçüktür.",
          "Açının adı kadar hangi üçgene ait olduğu da önemlidir. Bir şekle D noktası veya yardımcı doğru eklendiğinde ABC’nin açısı ile ABD’nin açısı aynı olmak zorunda değildir. Bilinen ölçüyü tam olarak ilgili köşedeki iki kolun arasına yaz; aynı harfin çevresindeki her bölgeye taşımamaya dikkat et.",
        ],
      },
      {
        title: "İç açı toplamını paralellikten gör",
        paragraphs: [
          "Üçgenin iç açıları toplamı 180°dir. A köşesinden BC’ye paralel doğru çizildiğinde B ve C açıları iç ters açı olarak A’nın yanına taşınır. A’daki üç açı birlikte bir doğru açı oluşturur. Böylece toplam bir ezberden öte, paralellik yardımıyla açıklanan bir ilişkiye dönüşür.",
          "İki iç açı 46° ve 71° ise üçüncü açı 180−46−71=63°dir. İç açılar x,2x,3x gibi verilirse aynı toplamı denklem olarak kullanırsın. Sonuçların her birinin pozitif olmasını kontrol et; yalnız toplamın 180 çıkması, negatif bir açıyı geçerli yapmaz.",
        ],
      },
      {
        title: "Dış açı uzak iki iç açıyı toplar",
        paragraphs: [
          "Bir kenarı köşenin ötesine uzattığında oluşan ve iç açıya komşu olan dış açı, o iç açıyla toplam 180° verir. İç açı toplamındaki diğer iki açıyı yerine koyarsan dış açının bu uzak iki iç açının toplamı olduğunu görürsün. Bu nedenle dış açı, bu iki iç açının her birinden büyüktür.",
          "Üçgenin her köşesinden aynı dolaşım yönünde birer dış açı seçildiğinde toplam 360°dir. Her köşedeki iki olası dış açıyı birden toplamak veya bir köşede iç açı seçmek aynı kural değildir. Çözümünde hangi kenarı hangi yönde uzattığını sözcükle veya işaretle belirt.",
        ],
      },
      {
        title: "Eş kenarın karşısına eş açı yaz",
        paragraphs: [
          "AB=AC ise ABC ikizkenar üçgeninin B ve C taban açıları eşittir. Eşlik işaretinin yanındaki açıları değil, eş kenarların tam karşısındaki açıları eşitle. Tepe açısı α ise taban açıları (180−α)/2 olur; taban açısı β verilirse tepe açısı 180−2β’dir.",
          "Bir ikizkenarın tepe açısı dar, dik veya geniş olabilir; taban açıları ise daima dardır. Eşkenar üçgende üç kenar ve üç açı eşittir; toplam 180° olduğundan her açı 60°dir. Tersine bir üçgende iki açı eşitse onların karşısındaki iki kenar da eşittir; bu çıkarımı farklı iki üçgenin kenarlarını karşılaştırmak için kullanamazsın.",
        ],
      },
      {
        title: "Açıortayları küçük üçgenlerde çalıştır",
        paragraphs: [
          "Bir iç açıortay, köşedeki açıyı eşit iki parçaya ayırır. İki iç açıortay I noktasında kesişiyorsa I’nın üçgenin içinde kaldığı küçük üçgeni seç. Örneğin B ve C açıortayları için BIC üçgenindeki B açısı B/2, C açısı C/2’dir; I açısı 180−(B+C)/2=90+A/2 olur.",
          "Bu formülde 90°ye eklenen yarım açı, açıortayları çizilmeyen A köşesinin açısıdır. İç ve dış açıortayları karıştırırsan farklı bir bölgeyi hesaplarsın. Önce küçük üçgeni kurup toplam180°den çıkarmak, formülü yanlış köşeye uygulamaktan daha güvenilir bir başlangıçtır.",
        ],
      },
      {
        title: "İkizkenarda aynı çizgi farklı görevler taşır",
        paragraphs: [
          "AB=AC olan ikizkenar üçgende A’dan BC’ye çizilen yükseklik, tabanı iki eş parçaya ayırır ve tepe açısını da iki eş açıya böler. Oluşan iki dik üçgen aynı hipotenüse ve ortak yüksekliğe sahip olduğundan eştir. Bu nedenle burada yükseklik, kenarortay ve açıortay tek çizgide birleşir.",
          "Bu birliktelik her üçgende geçerli değildir. Genel bir üçgende bir yüksekliğin açıortay olduğunu söylemek için ek koşul gerekir. A’dan gelen yükseklik ile iç açıortay arasındaki küçük açı, B ve C açılarının farkının yarısıdır: |B−C|/2. Önce hangi çizginin dikliği, hangisinin açı eşitliği sağladığını ayır.",
        ],
      },
      {
        title: "Birleşik şekillerde çözümü parçalara ayır",
        paragraphs: [
          "D noktası BC kenarının içindeyse ABD ve ACD ayrı üçgenlerdir. BD ile DC zıt yönlü olduğundan D’de bu iki üçgene ait komşu açılar toplam180°dir. Birinden bulduğun D açısını ötekine doğrudan eşit taşımak yerine bütünlerini kullanmalısın.",
          "Şekilde görünmeyen eşitlikler ekleme. D’nin BC üzerinde olduğu, bir noktanın içeride olduğu veya bir ışının açıortay olduğu yazılıysa kullan; sadece çizimden öyle görünmesi yeterli değildir. Her adımın yanına toplam180°, doğrusal çift, eş kenar karşısı veya açıortay gibi kısa gerekçesini koy.",
        ],
      },
    ],
    examples: [
      {
        title: "Dış açıdan eksik iç açı",
        prompt:
          "ABC üçgeninde BC, C’nin ötesinde D’ye uzatılıyor. m(∠ACD)=126°, m(∠ABC)=49°dir. A açısı kaç derecedir?",
        strategy: "Dış açıyı uzak iki iç açının toplamı olarak kullan.",
        steps: [
          {
            label: "Dış açıyı tanı",
            explanation:
              "∠ACD, C iç açısına komşudur; B ve A açılarının toplamına eşittir.",
          },
          {
            label: "Eksik açıyı hesapla",
            explanation: "A+49=126 denkleminden A=77° bulunur.",
          },
          {
            label: "İç toplamı denetle",
            explanation: "C=180−126=54°dir;77+49+54=180 olur.",
          },
        ],
        answer: "A açısı 77°dir.",
        check: "Dış açı 126°, uzak açılar 77° ve 49°nin ikisinden de büyüktür.",
        pitfall: "126°yi C’nin iç açısı gibi toplam 180° denklemine koyma.",
      },
      {
        title: "Tepe açısı mı taban açısı mı?",
        prompt:
          "ABC üçgeninde AB=AC ve B açısı 67°dir. A’dan BC’ye çizilen AH yüksekliği ile AC kenarı arasındaki açı kaç derecedir?",
        strategy:
          "İkizkenar taban açılarını eşitle; tepe yüksekliğinin açıortay olduğunu kullan.",
        steps: [
          {
            label: "Taban açılarını yerleştir",
            explanation: "AB=AC olduğundan B=C=67°dir.",
          },
          {
            label: "Tepe açısını bul",
            explanation: "A=180−67−67=46° olur.",
          },
          {
            label: "Yüksekliğin görevini kullan",
            explanation:
              "İkizkenarda A’dan tabana yükseklik tepe açısını ikiye böler; ∠HAC=46/2=23°dir.",
          },
        ],
        answer: "İstenen açı 23°dir.",
        check: "AHC dik üçgeninde 90+67+23=180.",
        pitfall:
          "Yüksekliğin her üçgende açıortay olduğunu varsayma; burada ikizkenarlık gereklidir.",
      },
      {
        title: "İki iç açıortayın yaptığı açı",
        prompt:
          "ABC üçgeninde A açısı64°dir. B ve C iç açıortayları I’da kesişiyor. m(∠BIC) kaç derecedir?",
        strategy: "BIC küçük üçgenindeki yarım açıları kullan.",
        steps: [
          {
            label: "Toplamı ayır",
            explanation: "B+C=180−64=116°dir.",
          },
          {
            label: "Yarım açıları topla",
            explanation: "BIC üçgeninde B/2+C/2=58° olur.",
          },
          {
            label: "Üçgeni tamamla",
            explanation: "∠BIC=180−58=122°dir; aynı sonuç90+64/2 ile bulunur.",
          },
        ],
        answer: "∠BIC=122°dir.",
        check:
          "122°nin geniş olması, iki iç açıortay arasındaki bu bölgeyle uyumludur.",
        pitfall: "90−A/2 hesaplamak I’daki sorulan iç bölgeyi vermez.",
      },
    ],
    recall: [
      {
        prompt: "Bir dış açı neden uzak iki iç açının her birinden büyüktür?",
        answer:
          "Dış açı bu iki pozitif iç açının toplamıdır; toplama eklenen diğer açı sıfırdan büyüktür.",
      },
      {
        prompt: "AB=BC olan ABC üçgeninde eş açılar hangileridir?",
        answer:
          "AB’nin karşısı C, BC’nin karşısı A olduğundan A=C olur; tepe açısı B’dir.",
      },
      {
        prompt:
          "Bir üçgenin tepe yüksekliğinin açıortay olduğunu yalnız diklikten çıkarabilir misin?",
        answer:
          "Hayır. İkizkenarlık gibi ek bir koşul gerekir; genel üçgende farklı çizgilerdir.",
      },
      {
        prompt:
          "B ve C iç açıortayları I’da buluşursa ∠BIC hesabında hangi köşenin yarısı kullanılır?",
        answer:
          "A köşesinin yarısı: ∠BIC=90°+A/2. Bu sonuç BIC üçgeninin açı toplamından gelir.",
      },
    ],
    items: [
      {
        prompt: "ABC üçgeninde A=48° ve B=67°dir. C açısı kaç derecedir?",
        options: ["65", "115", "48", "67", "75"],
        knowledge: ["Üçgenin iç açıları toplamı 180°dir."],
        strategy: "Verilen iki açının toplamını 180°den çıkar.",
        steps: [
          "A+B=48+67=115° hesaplanır.",
          "C=180−115=65° bulunur.",
          "65° pozitif olduğu için verilenlerle geçerli bir iç açı elde edilir.",
        ],
        optionReasons: [
          "48+67+65=180 olduğundan 65 doğrudur.",
          "115° verilen iki açının toplamıdır; üçüncü açı değildir.",
          "48°nin tekrarlandığını gösteren eş kenar koşulu yoktur.",
          "67°nin tekrarlandığını gösteren ikizkenarlık verilmemiştir.",
          "75° ile toplam 190° olur.",
        ],
        commonError: "Üçgen toplamını 90° veya 360° almak.",
        check: "48+67+65=180.",
      },
      {
        prompt:
          "ABC üçgeninde BC, C’nin ötesinde D’ye uzatılıyor. m(∠ACD)=132° ve A=57°dir. B açısı kaç derecedir?",
        options: ["75", "48", "123", "57", "105"],
        knowledge: ["C’deki dış açı A+B’ye eşittir."],
        strategy: "Komşu olmayan iki iç açı toplamını kullan.",
        steps: [
          "∠ACD dış açısıdır; 132=A+B yazılır.",
          "A=57 olduğundan B=132−57=75°dir.",
          "C=48° olur; 57+75+48=180.",
        ],
        optionReasons: [
          "75° ile 57° toplamı dış açı 132°yi verir.",
          "48° C iç açısıdır; B değildir.",
          "123°, A’nın bütünleridir; istenen B değildir.",
          "57° seçilirse dış açı 114° olur.",
          "105° seçilirse A+B=162° çıkar.",
        ],
        commonError: "Dış açıyı iç açı gibi 180° toplamına katmak.",
        check: "B=75 için uzak iki iç açının toplamı 57+75=132 olur.",
      },
      {
        prompt:
          "ABC üçgeninde AB=AC ve tepe açısı A=38°dir. B açısı kaç derecedir?",
        options: ["71", "142", "38", "76", "19"],
        knowledge: ["Eş kenarların karşısındaki açılar eşittir."],
        strategy: "B=C eşitliğini iç toplamla birleştir.",
        steps: [
          "AB=AC olduğundan B=C=x denir.",
          "38+2x=180 eşitliğinden 2x=142 bulunur.",
          "x=71°dir; iki taban açısı da 71° olur.",
        ],
        optionReasons: [
          "38+71+71=180 olduğundan 71 doğrudur.",
          "142 iki taban açısının toplamıdır.",
          "38 tepe açısıdır; tabanla eşitliği verilmemiştir.",
          "76, tepe açısının iki katıdır; toplam koşulunu sağlamaz.",
          "19, tepe açısının yarısıdır; taban açısı değildir.",
        ],
        commonError: "İkizkenarın bütün açılarını eşit sanmak.",
        check: "İki taban açısı da dardır; 71+71=142.",
      },
      {
        prompt: "ABC üçgeninde AB=BC ve A=64°dir. B açısı kaç derecedir?",
        options: ["52", "64", "58", "116", "32"],
        knowledge: [
          "AB’nin karşısındaki açı C, BC’nin karşısındaki açı A’dır.",
        ],
        strategy: "Eş kenarların karşı açılarını dikkatle belirle.",
        steps: [
          "AB=BC olduğundan C=A=64°dir.",
          "İç toplamdan B=180−64−64 yazılır.",
          "B=52° bulunur; tepe B köşesindedir.",
        ],
        optionReasons: [
          "52°, iki 64°lik taban açısıyla toplam 180° verir.",
          "64°, A ve C açılarının ölçüsüdür; B değildir.",
          "58° seçilirse toplam 186° olur.",
          "116° ile iki 64°lik açı toplam 244° verir.",
          "32+64+64=160° olur; 180° iç açı toplamını sağlamaz.",
        ],
        commonError:
          "Eş kenarların bulunduğu köşeleri değil karşılarını eşitlemek gerektiğini unutmak.",
        check:
          "AB ve BC, B’de birleşir; eş iki kenarın arasındaki tepe açısı 52°dir.",
      },
      {
        prompt:
          "Bir üçgenin her köşesinden aynı dolaşım yönünde birer komşu dış açı seçiliyor. Bu dış açılardan ikisi 114° ve 128°dir. Üçüncü dış açı kaç derecedir?",
        options: ["118", "62", "242", "52", "90"],
        knowledge: [
          "Üç köşede aynı yönde seçilmiş birer dış açının toplamı 360°dir.",
        ],
        strategy: "Dış açı toplamından verilen ikisini çıkar.",
        steps: [
          "114+128=242° hesaplanır.",
          "Üçüncü dış açı 360−242=118°dir.",
          "Karşılık gelen iç açılar 66°, 52°, 62° olup toplamları 180°dir.",
        ],
        optionReasons: [
          "118° ile 114° ve 128°nin toplamı 360°dir.",
          "62° üçüncü köşenin iç açısıdır; dış açı soruluyor.",
          "242° verilen iki dış açının toplamıdır.",
          "52° ikinci köşenin iç açısıdır.",
          "90° seçilirse dış toplam 332° olur.",
        ],
        commonError: "Dış açıların toplamını da 180° sanmak.",
        check: "(180−114)+(180−128)+(180−118)=180.",
      },
      {
        prompt:
          "ABC üçgeninde iç açıların ölçüleri sırasıyla x°, 2x° ve 3x°dir. En büyük açıya komşu dış açı kaç derecedir?",
        options: ["90", "30", "60", "120", "180"],
        knowledge: [
          "Üçgenin iç açıları toplamı 180°dir.",
          "İç açı ile komşu dış açının toplamı 180°dir.",
        ],
        strategy: "Önce açıları bul; sonra en büyüğün bütünlerini al.",
        steps: [
          "x+2x+3x=180, yani 6x=180 olduğundan x=30°dir.",
          "İç açılar 30°, 60°, 90°dir; en büyük 90°dir.",
          "Bu açıya komşu dış açı 180−90=90° olur.",
        ],
        optionReasons: [
          "En büyük iç açı 90° ve komşu dışı da 90°dir.",
          "30° en küçük iç açıdır.",
          "60° ortanca iç açıdır.",
          "120°, 60°lik iç açının komşu dışıdır.",
          "180° bir doğru açıdır; komşu iç açının sıfır olması gerekirdi.",
        ],
        commonError: "3x’i bulmadan x’i sorulan değer sanmak.",
        check: "Uzak iki iç açının toplamı 30+60=90 olup dış açıyla uyuşur.",
      },
      {
        prompt:
          "ABC üçgeninde A=72°dir. B ve C köşelerinin iç açıortayları I noktasında kesişiyor. m(∠BIC) kaç derecedir?",
        options: ["126", "108", "54", "144", "36"],
        knowledge: [
          "İç açıortaylar B ve C açılarını yarıya böler.",
          "BIC de bir üçgendir.",
        ],
        strategy: "BIC’nin B ve C açılarını topla.",
        steps: [
          "B+C=180−72=108°dir.",
          "BIC içindeki iki açı toplamı (B+C)/2=54°dir.",
          "I’daki açı 180−54=126° olur.",
        ],
        optionReasons: [
          "126°, 90+72/2 sonucudur.",
          "108°, ABC’de B+C toplamıdır; I açısı değildir.",
          "54°, BIC’de iki küçük açının toplamıdır.",
          "144° seçilirse BIC’de toplam 198° olur.",
          "36°, A’nın yarısıdır; 90 eklenmemiştir.",
        ],
        commonError: "90+A/2 yerine 90−A/2 kullanmak.",
        check: "126+54=180; I’daki sorulan iç bölge açısı geniştir.",
      },
      {
        prompt:
          "ABC ikizkenar üçgeninde AB=AC ve A=50°dir. H, BC üzerinde ve AH⊥BC’dir. m(∠HAC) kaç derecedir?",
        options: ["25", "50", "65", "40", "90"],
        knowledge: [
          "İkizkenarda tepe yüksekliği aynı zamanda tepe açıortayıdır.",
        ],
        strategy: "Açıyı yarıya böl; dik üçgenle kontrol et.",
        steps: [
          "AB=AC olduğundan AH, tepe A açısını iki eş parçaya böler.",
          "∠HAC=50/2=25° bulunur.",
          "C=(180−50)/2=65° olur; AHC’de 90+65+25=180 sağlanır.",
        ],
        optionReasons: [
          "25°, tepe açısının yarısıdır.",
          "50°, tepe açısının tamamıdır.",
          "65°, taban C açısıdır.",
          "40° için verilenlerle uyumlu açı toplamı yoktur.",
          "90°, AHC’de H köşesidir; HAC’nin köşesi A’dır.",
        ],
        commonError:
          "∠HAC açısının köşesini H sanmak veya tepe yüksekliğinin yarımlama özelliğini kaçırmak.",
        check: "HAC adında ortadaki A’dır; 25° bu köşededir.",
      },
      {
        prompt:
          "ABC üçgeninde B=68° ve C=44°dir. A’dan BC doğrusuna indirilen AH yüksekliği ile A’nın iç açıortayı AE arasındaki küçük açı kaç derecedir? H ve E, BC kenarı üzerindedir.",
        options: ["12", "24", "34", "22", "56"],
        knowledge: [
          "Yükseklik BC’ye 90° yapar.",
          "Açıortay A’yı iki eş parçaya böler.",
        ],
        strategy: "A’nın yarısını ve AB ile AH arasındaki açıyı ayrı bul.",
        steps: [
          "A=180−68−44=68° olduğundan BAE=34°dir.",
          "ABH dik üçgeninde BAH=90−68=22°dir.",
          "A’daki iki ışın arasındaki küçük açı 34−22=12°dir.",
        ],
        optionReasons: [
          "12°=|68−44|/2 sonucuyla da uyumludur.",
          "24°, taban açılarının farkıdır; yarısı alınmamıştır.",
          "34°, BAE açısıdır; yükseklik ile açıortay arasındaki fark değildir.",
          "22°, BAH açısıdır; AE ışını kullanılmamıştır.",
          "56° seçilirse A’daki iki ışının hesaplanan farkıyla çelişir.",
        ],
        commonError: "Yüksekliği açıortay sayıp sonucu 0 bulmak.",
        check:
          "|B−C|/2=24/2=12; H ve E’nin içte olması verilen modelle uyumludur.",
      },
      {
        prompt:
          "ABC üçgeninde B=40° ve C=60°dir. D noktası BC kenarının içindedir. m(∠BAD)=30° olduğuna göre m(∠ADC) kaç derecedir?",
        options: ["70", "110", "50", "80", "100"],
        knowledge: [
          "Bütün A açısı 180−B−C’dir.",
          "D, B ve C doğrusal olduğundan D’deki iki komşu açı bütünlerdir.",
        ],
        strategy: "Önce A’nın diğer parçasını bul; ACD üçgenini tamamla.",
        steps: [
          "A=180−40−60=80°dir.",
          "DAC=80−30=50° olur.",
          "ACD üçgeninde ADC=180−50−60=70° bulunur.",
        ],
        optionReasons: [
          "70°, ACD’de 50° ve 60°yi 180°ye tamamlar.",
          "110°, ABD üçgenindeki ADB açısıdır; ADC onun bütünleridir.",
          "50°, DAC açısıdır; köşe A’dadır.",
          "80°, ABC’nin A açısıdır.",
          "100°, A’nın komşu dış açısıdır; D’deki istenen bölge değildir.",
        ],
        commonError:
          "D’deki komşu açıları eşit sanıp ADB değerini ADC’ye taşımak.",
        check: "ABD’de ADB=180−30−40=110; 110+70=180.",
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri, PDF 116–117 (basılı114–115); Aurelia TYT Geometri Tüm Konular ve Formüller, PDF 2. Kaynak koşulları korunarak yazılmış özgün öğretim içeriği ve özgün sorular.",
  },
  {
    id: "tyt-geo-ucgen-esitsizligi-031",
    title: "Üçgen eşitsizliği ve açı–kenar ilişkileri",
    minutes: 40,
    objectives: [
      "Verilen üç pozitif uzunluğun gerçek bir üçgen oluşturup oluşturmadığını denetle.",
      "Bilinmeyen kenar için sıkı alt ve üst sınır bul; uygun tam sayıları say.",
      "Aynı üçgende karşı açı ve kenar sıralamasını iki yönde kur.",
      "En büyük kenarın karesiyle dar, dik, geniş açı sınıfını belirle; önce üçgen varlığını kontrol et.",
    ],
    sections: [
      {
        title: "Uzunluk listesi her zaman üçgen değildir",
        paragraphs: [
          "İki kenarı uçlarından birleştirip açtığında serbest uçların arasındaki üçüncü kenarın alabileceği uzunluk sınırsız değildir. İki kenarın toplamı üçüncü kenara yetişmezse uçlar kapanamaz; tam toplam kadar olursa da noktalar tek doğruya dizilir. İç bölgesi olan bir üçgen için toplam kesinlikle daha büyük olmalıdır.",
          "Pozitif a, b, c için a<b+c, b<a+c, c<a+b koşulları birlikte geçerlidir. Kenarları küçükten büyüğe sıralarsan yalnız en büyüğün diğer ikisinin toplamından küçük olduğunu denetlemek yeterlidir; pozitiflik sayesinde diğer iki koşul zaten sağlanır. Örneğin 2, 3, 6 için 2+3<6 olduğundan üçgen yoktur.",
        ],
      },
      {
        title: "Bilinmeyen kenarı iki açık sınır arasında tut",
        paragraphs: [
          "a ve b biliniyorsa üçüncü kenar c için |a−b|<c<a+b elde edilir. Sağ sınır kapanmak için yeterli toplam uzunluğunu, sol sınır uzun iki parçanın birbirini tamamen geçememesini anlatır. Mutlak değer, hangi bilinen kenarın büyük olduğundan bağımsız aynı formülü kullanmanı sağlar.",
          "Eşitlik işaretlerini ekleme: 4 ve 9 bilinen kenarları için 5<c<13 olmalıdır. c=5 veya c=13 durumunda köşeler doğrusal olur. c=6 gibi aradaki her değer ise bir düzlem üçgeni için uygundur; şeklin ikizkenar veya çeşitkenar olması kurulabilirlik testinden ayrı bir özelliktir.",
        ],
      },
      {
        title: "Tam sayı sayarken uçları dışarıda bırak",
        paragraphs: [
          "Soru c’nin tam sayı olduğunu söylüyorsa açık aralıktaki tam sayıları listeler veya uygun başlangıç ve son değeri seçersin. 5<c<13 için 6, 7, 8, 9, 10, 11, 12 olmak üzere 7 değer vardır. Aralık uçlarını dahil eden bir sayma işlemi yapılırsa iki fazla değer sayılabilir.",
          "Kesirli sınırda da aynı mantık geçerlidir: 2,5<c<7,5 aralığındaki tam sayılar 3, 4, 5, 6, 7’dir. Bulduğun en küçük ve en büyük adayları bağıntıya geri koymak, özellikle cebirsel kenarlı sorularda hızlı bir denetimdir. Uzunluk ifadesinin kendisi de pozitif olmalıdır.",
        ],
      },
      {
        title: "Birden fazla üçgende aralıkların kesişimini al",
        paragraphs: [
          "İki üçgen ortak bir kenarı paylaşıyorsa ortak kenar her iki üçgenin koşulunu aynı anda sağlamalıdır. İlki 3<x<11, ikincisi 5<x<9 veriyorsa ortak izin 5<x<9’dur. Sınırlar birleştirilirken alt sınırların büyüğü ve üst sınırların küçüğü seçilir.",
          "Aralıkları birleşim biçiminde toplamak uygun değildir: x’in yalnız bir üçgene uygun olması yetmez. Örneğin ilk koşul 2<x<6, ikincisi 7<x<13 ise ortak değer yoktur; verilen uzunluklarla iki üçgen birlikte kurulamaz. Bu durumda bir uzunluk uydurmak yerine geçersizliği açıklamak gerekir.",
        ],
      },
      {
        title: "Büyük açının karşısında büyük kenar bulunur",
        paragraphs: [
          "ABC üçgeninde a=BC, b=CA, c=AB olarak adlandırıldığında A>B ise a>b’dir; ters yönde a>b ise A>B çıkar. Karşı kenar, köşeye dokunmayan kenar olarak bulunabilir. Kenarın yanındaki harfi çözüme doğrudan taşımadan köşe ile kenarı eşleştir.",
          "Eşit açılar karşısında eş kenarlar bulunur; eş kenarlar karşısında da eş açılar bulunur. Bu ilişki aynı üçgenin içindedir. Farklı üçgenler aynı açılara sahip olup farklı ölçekte olabilir; bu yüzden iki ayrı üçgende 40° karşısındaki uzunlukların sırf eşit açıdan ötürü eşit olduğu söylenemez.",
        ],
      },
      {
        title: "En büyük açı üzerinden türü belirle",
        paragraphs: [
          "Önce üçgen varlığını denetle ve sonra kenarları a≤b≤c şeklinde sırala. c², a²+b²’ye eşitse diklik vardır; küçükse dar açılı, büyükse geniş açılı üçgen vardır. En büyük kenar c’nin karşısındaki en büyük açıyı sınamak, dar üçgende üç açının da dar olduğunu belirlemeye yeter.",
          "Bu karşılaştırmada c’yi rastgele seçersen sonuç yanlış olabilir. Örneğin 4, 5, 6 üçgeninde 6²<4²+5² olduğundan dar üçgen vardır. Aynı kenarlarda 4² ile 5²+6²’yi karşılaştırmak da küçük çıkar; fakat en büyük açıyı sınamadığın için bu işlem türü kanıtlamaz. Ayrıca 1, 2, 4 üçgen olmadığından 4² büyük diye ona geniş açılı üçgen denilemez.",
        ],
      },
      {
        title: "Kesin sonucu verilmemiş ölçüden ayır",
        paragraphs: [
          "Yalnız iki kenar verildiyse üçüncü kenar bir sayı değil, genellikle bir aralıktır. Soru en küçük değer, en büyük değer, tam sayı adedi, çevre veya açı türü isteyebilir; istenen büyüklük hangisiyse aralık üzerinde onu ara. Gerçel sayılarda açık aralığın alt ve üst uçları alınamadığı için en küçük ve en büyük değer her zaman yoktur.",
          "Örneğin 3<x<9 için x’in en küçük gerçel değeri yoktur; hangi izinli değeri seçersen seç, onunla 3 arasında daha küçük bir izinli değer bulunabilir. Ancak x tam sayı ise en küçük 4 ve en büyük 8’dir. Tam sayı koşulunun verilip verilmediğini okumak, hesap tekniği kadar önemlidir. Son cevabı birim, koşul veya gerekli aralıkla beraber söyle.",
        ],
      },
    ],
    examples: [
      {
        title: "Bilinmeyen kenarın tam sayılarını say",
        prompt:
          "Bir üçgenin iki kenarı 5 cm ve 8 cm, üçüncü kenarı x cm’dir. x pozitif tam sayı ise kaç farklı değer alabilir?",
        strategy: "Mutlak fark ile toplam arasındaki açık aralığı kur.",
        steps: [
          {
            label: "Sınırları çıkar",
            explanation: "|8−5|<x<8+5, yani 3<x<13 olmalıdır.",
          },
          {
            label: "Tam sayıları seç",
            explanation: "x=4, 5, 6, 7, 8, 9, 10, 11, 12 değerleri uygundur.",
          },
          {
            label: "Say ve kontrol et",
            explanation:
              "12−4+1=9 değer vardır; 3 ve 13 doğrusal durum oluşturduğu için alınmaz.",
          },
        ],
        answer: "x, 9 farklı değer alabilir.",
        check: "En küçük aday 4 için 5+4>8; en büyük aday 12 için 5+8>12.",
        pitfall: "Açık aralığın sınırlarını da sayıp 11 değer bulma.",
      },
      {
        title: "İki üçgenin ortak kenarı",
        prompt:
          "ABC ve DBC üçgenleri BC kenarını paylaşıyor. AB=6, AC=10, DB=4, DC=7 ve BC=x tam sayıdır. x kaç farklı değer alır?",
        strategy:
          "Her üçgenin işlemini ayrı yap, sonra aralıkların ortak kısmını bul.",
        steps: [
          {
            label: "İlk aralığı bul",
            explanation: "ABC için |10−6|<x<10+6, yani 4<x<16.",
          },
          {
            label: "İkinci aralığı bul",
            explanation: "DBC için |7−4|<x<7+4, yani 3<x<11.",
          },
          {
            label: "Kesişimi say",
            explanation:
              "Ortak koşul 4<x<11’dir; x=5, 6, 7, 8, 9, 10 olmak üzere 6 değer bulunur.",
          },
        ],
        answer: "x, 6 farklı tam sayı değeri alır.",
        check:
          "x=5 ve x=10 iki üçgende de geçerlidir; x=11 ikinci üçgeni doğrusal hale getirir.",
        pitfall: "Aralıkların birleşimini alıp 3<x<16 yazma.",
      },
      {
        title: "Üçgenin açı türünü uzunluklardan tanı",
        prompt:
          "Kenarları 7 cm, 8 cm ve 10 cm olan üçgenin dar, dik veya geniş açılı olduğunu belirle.",
        strategy:
          "Önce kurulabilirliği, sonra en büyük karenin karşılaştırmasını yap.",
        steps: [
          {
            label: "Üçgeni doğrula",
            explanation:
              "En büyük kenar 10’dur ve 7+8=15>10; üçgen kurulabilir.",
          },
          {
            label: "Kareleri karşılaştır",
            explanation: "10²=100, 7²+8²=49+64=113 olduğundan 100<113.",
          },
          {
            label: "Açı sınıfını açıkla",
            explanation:
              "En büyük açı bile 90°den küçüktür; dolayısıyla üçgen dar açılıdır.",
          },
        ],
        answer: "Üçgen dar açılıdır.",
        check:
          "En büyük kenar doğru seçilmiş ve önce üçgen eşitsizliği sağlanmıştır.",
        pitfall: "Her farklı kenarlı üçgeni gelişigüzel geniş açılı sayma.",
      },
    ],
    recall: [
      {
        prompt:
          "Kenarlar a, b, c pozitifken yalnız a<b+c yazmak neden her durumda yeterli değildir?",
        answer:
          "a en büyük değilse kalan büyük kenar eşitsizliği bozabilir. Örneğin 1<1+5 doğru ama 1, 1, 5 üçgen oluşturmaz.",
      },
      {
        prompt:
          "4<x<10 ve 6<x<12 koşullarını aynı anda sağlayan ortak aralık nedir?",
        answer:
          "6<x<10. Alt sınırların büyüğü 6, üst sınırların küçüğü 10 seçilir.",
      },
      {
        prompt: "Bir üçgende AB>AC ise hangi açı hangisinden büyüktür?",
        answer:
          "AB’nin karşısındaki C açısı, AC’nin karşısındaki B açısından büyüktür: C>B.",
      },
      {
        prompt:
          "a≤b≤c iken c²>a²+b² bulmak ne zaman geniş açılı üçgen kanıtıdır?",
        answer:
          "a, b, c pozitif olup üçgen eşitsizliğini sağladığında. Önce üçgenin varlığı denetlenir.",
      },
    ],
    items: [
      {
        prompt:
          "Bir üçgenin iki kenarı 4 cm ve 9 cm’dir. Üçüncü kenar x cm olduğuna göre x hangi aralıkta olmalıdır?",
        options: ["5<x<13", "5≤x≤13", "0<x<13", "4<x<9", "x>13"],
        knowledge: [
          "Üçüncü kenar bilinen iki kenarın mutlak farkından büyük, toplamından küçüktür.",
        ],
        strategy: "Alt ve üst sınırı ayrı hesapla.",
        steps: [
          "Mutlak fark |9−4|=5’tir.",
          "Toplam 9+4=13’tür.",
          "Gerçek üçgen için eşitlikler dışlanır; 5<x<13 elde edilir.",
        ],
        optionReasons: [
          "Açık 5 ve 13 sınırları bütün üçgen eşitsizliklerini birlikte sağlar.",
          "x=5 ve x=13 doğrusal durumdur; üçgen oluşmaz.",
          "0<x≤5 bölümü uzun iki kenarın kapanmasını sağlamaz.",
          "4<x<9 bazı geçersiz değerleri alır ve geçerli değerleri dışlar.",
          "13’ten büyük kenar, 4 ve 9’un toplamıyla kapanamaz.",
        ],
        commonError:
          "Farkı negatif almak veya eşitlik sınırlarını dahil etmek.",
        check: "x=6 geçerlidir; 5 ve 13 sınırları geçersizdir.",
      },
      {
        prompt:
          "Kenarları 6 cm, 10 cm ve x tam sayı cm olan bir üçgende x kaç farklı değer alabilir?",
        options: ["11", "10", "12", "13", "9"],
        knowledge: ["Üçgen eşitsizliği 4<x<16 verir."],
        strategy: "Açık aralıktaki tam sayıları say.",
        steps: [
          "|10−6|<x<10+6 koşulundan 4<x<16 bulunur.",
          "Uygun tam sayılar 5’ten 15’e kadardır.",
          "15−5+1=11 farklı değer vardır.",
        ],
        optionReasons: [
          "5, 6, …, 15 dizisinde 11 tam sayı vardır.",
          "10 bulmak son−ilk hesabında +1’i unutmaktır.",
          "12 bulmak sınır değerlerden birini yanlış dahil eder.",
          "13 bulmak hem 4’ü hem 16’yı dahil eder.",
          "9 bulmak izinli aralığın iki yanındaki geçerli adayları gereksiz dışlar.",
        ],
        commonError: "Sınırları geçerli kenar saymak.",
        check: "6+5>10 ve 6+10>15; uç adaylar uygundur.",
      },
      {
        prompt:
          "Aşağıdaki uzunluk üçlülerinden hangisi gerçek bir üçgen oluşturur? Bütün uzunluklar cm’dir.",
        options: ["4,6,9", "2,3,5", "1,4,6", "3,3,6", "2,2,5"],
        knowledge: [
          "Pozitif kenarlarda en büyük kenar diğer ikisinin toplamından küçük olmalıdır.",
        ],
        strategy: "Her üçlüde en büyüğü bul ve toplamla sına.",
        steps: [
          "4, 6, 9 için 4+6=10>9 olduğundan üçgen vardır.",
          "2, 3, 5 ve 3, 3, 6 toplam eşitliğiyle doğrusal duruma düşer.",
          "1+4<6 ve 2+2<5 olduğundan kalanlar da kapanmaz.",
        ],
        optionReasons: [
          "En büyük 9, diğer iki kenarın toplamı 10’dan küçüktür.",
          "2+3=5 eşitliği gerçek üçgen vermez.",
          "1+4=5<6 olduğundan üçgen yoktur.",
          "3+3=6 eşitliği iç bölge oluşturmaz.",
          "2+2=4<5 olduğundan üçgen yoktur.",
        ],
        commonError:
          "Toplamın üçüncüye yetişmesinin yeterli olduğunu sanmak; kesin büyüklük gerekir.",
        check: "4, 6, 9 için 2<9<10 koşulu da sağlanır.",
      },
      {
        prompt:
          "ABC ve DBC üçgenleri BC kenarını paylaşıyor. AB=5, AC=8, DB=7, DC=9 ve BC=x tam sayıdır. x kaç farklı değer alabilir?",
        options: ["9", "13", "11", "8", "12"],
        knowledge: [
          "Ortak kenar her iki üçgenin eşitsizliğini karşılamalıdır.",
        ],
        strategy: "İki aralık çıkar ve kesişimde tam sayı say.",
        steps: [
          "ABC için 3<x<13 elde edilir.",
          "DBC için 2<x<16 elde edilir.",
          "Kesişim 3<x<13 olup x=4, …, 12 için 9 değer vardır.",
        ],
        optionReasons: [
          "4’ten 12’ye kadar 9 ortak uygun değer vardır.",
          "13 bulmak ikinci aralıktaki 3’ten 15’e kadar değerleri sayar; ilk üçgeni ihmal eder.",
          "11 bulmak 3 ve 13 sınırlarını yanlış dahil eder.",
          "8 bulmak doğru listede +1 sayım düzeltmesini unutur.",
          "12 bulmak ortak aralık dışındaki bazı değerleri katmış olur.",
        ],
        commonError: "Ortak koşulları birleşim gibi almak.",
        check: "x=12 için 5+8>12; x=13 ilk üçgeni kapatmaz.",
      },
      {
        prompt:
          "ABC üçgeninde A=82°, B=57° ve C=41°dir. Kenarları küçükten büyüğe sıralayan hangisidir?",
        options: ["AB<AC<BC", "BC<AC<AB", "AC<AB<BC", "AB<BC<AC", "AC<BC<AB"],
        knowledge: ["Aynı üçgende büyük açının karşısında büyük kenar vardır."],
        strategy: "Önce açıları, sonra karşı kenarları sırala.",
        steps: [
          "Açıların sırası C<B<A’dır.",
          "C’nin karşısı AB, B’nin karşısı AC, A’nın karşısı BC’dir.",
          "Bu nedenle AB<AC<BC yazılır.",
        ],
        optionReasons: [
          "41°, 57°, 82° karşısındaki kenarlar doğru sıradadır.",
          "En büyük açının karşısındaki BC’yi en küçük yapar.",
          "AC’nin karşısı 57° olduğu için 41° karşısındaki AB’den küçük olamaz.",
          "BC, 82° karşısında olduğundan AC’den büyük olmalıdır.",
          "AB, 41° karşısında olduğundan en büyük olamaz.",
        ],
        commonError: "Açıya dokunan kenarı karşı kenar sanmak.",
        check:
          "En büyük açının A olması en büyük kenarın BC olduğunu doğrular.",
      },
      {
        prompt:
          "ABC üçgeninde AB=9 cm, AC=12 cm ve BC=14 cm’dir. İç açıların küçükten büyüğe sırası hangisidir?",
        options: ["C<B<A", "A<B<C", "B<C<A", "C<A<B", "B<A<C"],
        knowledge: ["Aynı üçgende büyük karşı kenar büyük açıyı gösterir."],
        strategy: "Kenarları karşı köşelerle eşleştir.",
        steps: [
          "9<12<14 sırası AB<AC<BC demektir.",
          "AB’nin karşısı C, AC’nin karşısı B, BC’nin karşısı A’dır.",
          "Böylece C<B<A sonucu çıkar.",
        ],
        optionReasons: [
          "Karşı kenarları 9, 12, 14 olan açılar C, B, A’dır.",
          "A, 14 karşısında olduğundan en küçük olamaz.",
          "B, 12 karşısında; C, 9 karşısında olduğundan B<C yanlıştır.",
          "A, 14 karşısında olduğundan B’den küçük olamaz.",
          "C, 9 karşısında olduğundan en büyük olamaz.",
        ],
        commonError: "Kenar adındaki harfi aynı köşeyle eşleştirmek.",
        check: "9+12>14 olduğundan geçerli üçgende karşılaştırma yapılmıştır.",
      },
      {
        prompt:
          "Kenar uzunlukları 6 cm, 8 cm ve 10 cm olan üçgeni açılarına göre sınıflandır.",
        options: [
          "Dik açılıdır.",
          "Dar açılıdır.",
          "Geniş açılıdır.",
          "Üçgen oluşturmaz.",
          "Yalnız kenar ölçüleriyle türü bilinemez.",
        ],
        knowledge: [
          "En büyük kare, diğer iki karenin toplamına eşitse diklik vardır.",
        ],
        strategy: "Üçgen varlığını ve karesel ilişkiyi kontrol et.",
        steps: [
          "6+8=14>10 olduğundan üçgen kurulabilir.",
          "En büyük kenar 10 için 10²=100; 6²+8²=36+64=100.",
          "Eşitlik Pisagor teoreminin tersini verir; 10 karşısındaki açı 90°dir.",
        ],
        optionReasons: [
          "En büyük karenin diğer iki karenin toplamına eşitliği dikliği kanıtlar.",
          "Dar açılı olması için 100<100 gerekirdi; sağlanmaz.",
          "Geniş açılı olması için 100>100 gerekirdi.",
          "Üçgen eşitsizliği sağlanmıştır.",
          "Üç kenar uzunluğu açı türünü belirlemeye yeterlidir.",
        ],
        commonError:
          "Pisagor bağıntısının tersinin kullanılabileceğini unutmak.",
        check: "Bu, 3–4–5 dik üçgeninin 2 katıdır.",
      },
      {
        prompt:
          "Kenarları 4 cm, 5 cm ve 6 cm olan üçgen açılarına göre hangi türdedir?",
        options: [
          "Dar açılı",
          "Dik açılı",
          "Geniş açılı",
          "Üçgen oluşmaz.",
          "En azbir iç açısı180°dir.",
        ],
        knowledge: [
          "En büyük kenar c iken c²<a²+b² ise dar açılı üçgen vardır.",
        ],
        strategy: "Önce üçgeni kur, sonra en büyük kareyi sına.",
        steps: [
          "4+5=9>6 olduğundan üçgen vardır.",
          "En büyük kenar 6’dır; 6²=36 ve 4²+5²=41.",
          "36<41 olduğundan en büyük açı 90°den küçüktür; üçgen dardır.",
        ],
        optionReasons: [
          "En büyük açının da dar olması bütün açıları dar yapar.",
          "36 ile 41 eşit olmadığından dik değildir.",
          "Geniş olması için 36>41 gerekirdi.",
          "En büyük kenar diğer iki kenarın toplamından küçüktür.",
          "180° iç açı gerçek üçgende olamaz.",
        ],
        commonError:
          "Kenarları sıralamadan herhangi bir karesel karşılaştırmayı kullanmak.",
        check:
          "En büyük kenar 6 seçildi; bu nedenle sınıflandırma tüm üçgeni kapsar.",
      },
      {
        prompt:
          "Kenarları 3 cm, 4 cm ve 6 cm olan üçgen açılarına göre hangi türdedir?",
        options: [
          "Geniş açılı",
          "Dar açılı",
          "Dik açılı",
          "Üçgen oluşmaz.",
          "Eşkenar",
        ],
        knowledge: ["En büyük kenar c iken c²>a²+b² ise geniş açılıdır."],
        strategy: "Üçgen kurulabilirliği ile genişlik testini ardışık uygula.",
        steps: [
          "3+4=7>6 olduğundan üçgen vardır.",
          "6²=36 ve 3²+4²=9+16=25 hesaplanır.",
          "36>25 olduğundan 6 karşısındaki açı 90°den büyüktür.",
        ],
        optionReasons: [
          "36>25 geniş açı olduğunu gösterir.",
          "Dar olması için 36<25 gerekirdi.",
          "Dik olması için 36=25 gerekirdi.",
          "6<3+4 olduğundan üçgen oluşur.",
          "Üç kenar birbirine eşit değildir.",
        ],
        commonError:
          "3 ve 4 sayılarını görünce üçüncü kenarın otomatik olarak 5 olduğunu sanmak.",
        check:
          "6 birim uzunluk 5 birimlik dik üçgen hipotenüsünden büyüktür; karşı açı genişler.",
      },
      {
        prompt:
          "Bir üçgenin iki kenarı 5 cm ve 7 cm’dir. Üçüncü kenar x tam sayı cm ve çevre 20 cm’den küçüktür. x’in alabileceği en büyük değer kaçtır?",
        options: ["7", "8", "11", "12", "6"],
        knowledge: ["Üçgen eşitsizliği ve çevre koşulu birlikte uygulanır."],
        strategy: "Önce kenar aralığını, sonra çevreden üst sınırı bul.",
        steps: [
          "|7−5|<x<7+5, yani 2<x<12 yazılır.",
          "Çevre 5+7+x<20 koşulundan x<8 bulunur.",
          "Ortak koşul 2<x<8’dir; tam sayılar 3, 4, 5, 6, 7 olduğundan en büyük 7’dir.",
        ],
        optionReasons: [
          "7 hem üçgen koşulunu hem 19 cm çevreyi sağlar.",
          "8 için çevre 20 olur; 20’den küçük değildir.",
          "11 üçgen kurabilir ama çevre 23 olup koşulu bozar.",
          "12 hem üçgen eşitsizliği sınırıdır hem çevreyi aşar.",
          "6 geçerlidir ama daha büyük uygun 7 vardır.",
        ],
        commonError:
          "İki ayrı koşuldan birini çözümde unutmak veya < işaretini ≤ gibi okumak.",
        check: "5+7+7=19<20 ve 5+7>7; 8 ise çevre sınırında dışlanır.",
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri, PDF 118–119 (basılı116–117); Aurelia TYT Geometri Tüm Konular ve Formüller, PDF 2. Üçgen varlığı ve açık aralık koşulları denetlenerek yazılmış özgün anlatım ve özgün öğretim soruları.",
  },
  {
    id: "tyt-geo-dik-ucgen-031",
    title: "Dik üçgen: Pisagor, özel açılar ve Öklid bağıntıları",
    minutes: 46,
    source:
      "MEBİ TYT Matematik Konu Özetleri: üçgenlerde eşlik, benzerlik, yardımcı elemanlar ve dik üçgen seçili sayfaları; Aurelia TYT Geometri özetindeki ilgili ilişkilerle karşılaştırılarak hazırlanmış özgün anlatım, örnek ve sorular. Eğim, Aurelia Dik Üçgenler 5.2, fiziksel s.5 ve 8 ile karşılaştırıldı. Sorular resmî sınav sorusu değildir.",
    objectives: [
      "Hipotenüsü doğru seçerek Pisagor bağıntısını ve tersini uygula.",
      "30°–60°–90° ve 45°–45°–90° üçgenlerinde karşılıkları ayır.",
      "Hipotenüse indirilen yükseklikten doğan üç benzer üçgeni ilişkilendir.",
      "Öklid bağıntılarını izdüşüm, alan ve ölçü denetimiyle kullan.",
    ],
    sections: [
      {
        title: "Dik köşeyi ve hipotenüsü önce işaretle",
        paragraphs: [
          "Bir üçgenin bir iç açısı 90° ise diğer iki açı pozitiftir ve toplamları 90° olur. Dik açıyı oluşturan kenarlara dik kenar, onun karşısındaki kenara hipotenüs denir. Hipotenüs her zaman en uzun kenardır; çizimin kâğıtta yatay, eğik veya dik durması bu tanımı değiştirmez.",
          "ABC üçgeninde A=90° yazıldığında hipotenüs BC’dir. AB ve AC’yi dik kenar olarak okumadan formüle geçme. Her dikme, ana üçgenin dik olduğunu göstermez: herhangi bir üçgende çizilen yükseklik yalnız ayırdığı küçük üçgenlerde dik açı oluşturur.",
        ],
      },
      {
        title: "Pisagor: karelerin alanından uzunluğa",
        paragraphs: [
          "Dik kenarlar a ve b, hipotenüs c olmak üzere a²+b²=c²’dir. Üç kenarın üzerine kurulan karelerin alanları düşünülürse iki küçük karenin toplam alanı büyük karenin alanına eşittir. Uzunlukları doğrudan toplamak aynı ilişkiyi vermez.",
          "Eksik dik kenar bulunurken b²=c²−a² yazılır; sonuç uzunluk olduğundan pozitif kök alınır. Bir kenarı 6, hipotenüsü 10 olan üçgende diğer dik kenar √(100−36)=8 olur. Karekök almadan 64 cevabını vermek alanı uzunluk sanmaktır.",
        ],
      },
      {
        title: "Ters Pisagor ve ölçünün gerçekliği",
        paragraphs: [
          "Pozitif üç uzunluk önce üçgen oluşturmalıdır. En büyük kenar c seçildiğinde a²+b²=c² ise üçgen diktir. a²+b²>c² dar açılı, a²+b²<c² geniş açılı bir üçgen verir; son iki sınıflama da geçerli üçgen için yapılır.",
          "3–4–5, 5–12–13 ve 8–15–17 ailelerini tanımak işlemi hızlandırır; katları da aynı şekli korur. Buna rağmen yalnız iki sayıyı görüp ezber üçlüyü tamamlama. Veride hipotenüs belirtilmediyse en büyük kenarı ve diklik koşulunu ayrıca kontrol et.",
        ],
      },
      {
        title: "Özel üçgenler: açı hangi kenarın karşısında?",
        paragraphs: [
          "45°–45°–90° üçgeninde eş dar açıların karşısındaki dik kenarlar eşittir; a ve a için hipotenüs a√2 olur. 30°–60°–90° üçgeninde 30° karşısı a ise 60° karşısı a√3, hipotenüs 2a’dır. Bu oranlar her uzunluk biriminde aynıdır.",
          "30° karşısındaki kenar ile 30° açısına komşu dik kenarı ayır. Eşkenar üçgenin bir yüksekliği onu iki 30°–60°–90° üçgenine böler: kenar 2a, yarım taban a ve yükseklik a√3 olur. Özel açı açıkça verilmedikçe şeklin görüntüsünden 30° veya 45° varsayma.",
        ],
      },
      {
        title: "Hipotenüse yükseklik indir: üç benzer üçgen",
        paragraphs: [
          "ABC’de A=90°, H noktası BC üzerinde ve AH⊥BC olsun. BH=p, HC=q, BC=c=p+q diyelim. ABH ve AHC üçgenleri hem birbirine hem ABC’ye benzer; her birinde bir dik açı ve ana üçgenle ortak bir dar açı bulunur.",
          "Eş açıları aynı sırada eşleştirmek AB²=BC·BH=c·p ve AC²=BC·HC=c·q ilişkilerini verir. AB’nin izdüşümü BH, AC’nin izdüşümü HC’dir. Harfleri şekle yazmadan “kenarın karesi” formülünü kullanmak p ile q’yu kolayca karıştırır.",
        ],
      },
      {
        title: "Öklid yüksekliği ve alanla ikinci yol",
        paragraphs: [
          "Aynı modelde AH=h için h²=pq’dur. Burada çarpılanlar hipotenüsün iki parçasıdır; h²’nin p²+q² olması gerekmez. c=p+q ile birlikte bu bağıntılar bütün uzunlukları birbirine bağlar. p ve q pozitif olmalıdır; biri sıfır olursa gerçek üçgen çöker.",
          "Alanı dik kenarlardan AB·AC/2, hipotenüs ve yükseklikten c·h/2 hesaplayabiliriz. Böylece AB·AC=c·h elde edilir. Bu ikinci yol, Öklid hesabının sonucunu denetler ve iki dik kenar bilindiğinde hipotenüse ait yüksekliği doğrudan verir.",
        ],
      },
      {
        title: "Yardımcı dik üçgeni bir durumdan üret",
        paragraphs: [
          "Duvara dayalı merdivende duvarla zemin dikse merdiven hipotenüstür. Uzaklık sorusunda yükseklik ile yatay mesafe birbirine diktir; eğik yolun uzunluğu ikisinin toplamı değildir. Önce hangi doğruların dik olduğunu metindeki veriden belirt.",
          "Bileşik şekilde aynı uzunluk birden fazla dik üçgende yer alabilir. İlk bulduğun uzunluğu ikinci üçgene taşı, fakat ortak çizgi üzerindeki parçaların toplamını ana kenarla karıştırma. Cevap yaklaşık bir ölçüyse verilen kesin uzunlukları erken yuvarlama; son adımda yaklaşık değer kullan.",
        ],
      },
      {
        title: "Son kontrol: en uzun kenar, birim ve iki bağımsız eşitlik",
        paragraphs: [
          "Hipotenüs bulunan her sonuç diğer iki kenardan büyük olmalıdır. Öklid modelinde BH+HC=BC ve AH²=BH·HC birlikte sağlanmalıdır. Alanla AB·AC=BC·AH eşitliğini ayrıca denetlemek yanlış parçayla çarpımı yakalar.",
          "Hipotenüsün orta noktasına dik köşeden çizilen kenarortay hipotenüsün yarısıdır; bu parça üç köşeye eş uzaklık özelliğiyle açıklanır. Kenarortayı hipotenüse ait yükseklikle karıştırma: bunlar genel bir dik üçgende farklı parçalardır. Çizimdeki kareler alan gösteriyorsa sayının birimi cm²; kenar veya yükseklik gösteriyorsa cm’dir. Her soru için bir kez “H hangi doğru üzerinde, dik açı nerede, en büyük kenar hangisi?” diye sor. Hatırlama çalışmasında şekli kapatıp bu üç bilgiyle modeli yeniden kur.",
        ],
      },
      {
        title: "Eğim için yatay uzunluğu bul",
        figureTitle: "Dik yolda eğim ve uzunluk",
        paragraphs: [
          "Bir yol 12 m yatay ilerleyip 5 m yükseliyor. Yolun yatayla yaptığı α açısında karşı dik kenar 5 m, komşu dik kenar 12 m’dir. Eğim, bu iki uzunluğun oranı olan tan α=5/12’dir. İki kenar aynı birimde ölçülür, oran birimsizdir.",
          "Eğik yol, Pisagor’la √(12²+5²)=13 m bulunur. 5/13 oranı aynı açının sinüsüdür. Eğim sorusunda payda yatay ilerleme, eğik yol uzunluğu değildir. Şekilde yükselmeyi değiştirirken yatay ilerleme 12 m kalır.",
        ],
      },
    ],
    examples: [
      {
        title: "Merdivenin yatay uzaklığı",
        prompt:
          "13 m uzunluğundaki merdiven dik bir duvarda yerden 12 m yüksekliğe dayanıyor. Düz zemin duvara diktir. Ayağın duvara yatay uzaklığı kaç metredir?",
        strategy: "Merdiveni hipotenüs, yüksekliği bir dik kenar seç.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Duvar, zemin ve merdiven bir dik üçgen oluşturur; hipotenüs 13, bir dik kenar 12’dir.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "x²+12²=13² yazılır; x²=169−144=25 bulunur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Uzaklık pozitif olduğundan x=5 m alınır; 5²+12²=169 denetimi yapılır.",
          },
        ],
        answer: "5 m",
        check: "13>12 ve 13>5; üçgenin uzunluk sıralaması da doğrudur.",
        pitfall:
          "13−12=1, yatay uzaklık değildir; fark hesabı dik üçgeni yok sayar.",
      },
      {
        title: "İzdüşümlerden bütün kenarlara",
        prompt:
          "ABC’de A=90°, AH⊥BC, H∈BC, BH=9 cm ve HC=16 cm. AH, AB ve AC kaç cm’dir?",
        strategy:
          "Önce hipotenüsü topla, sonra üç Öklid eşitliğini doğru parçalarla eşleştir.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "BC=9+16=25 cm; p=9 ve q=16 olarak yazılır.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "AH²=9·16=144, AB²=25·9=225, AC²=25·16=400 bulunur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Pozitif kökler AH=12, AB=15, AC=20 verir. 15·20=25·12 alan kontrolü sağlanır.",
          },
        ],
        answer: "AH=12 cm, AB=15 cm, AC=20 cm",
        check: "15²+20²=25²; hem Pisagor hem alan aynı şekli doğrular.",
        pitfall:
          "AB²’yi 25·16 almak, AB’nin BH üzerindeki izdüşümünü karıştırır.",
      },
      {
        title: "30° karşısını belirle",
        prompt: "ABC’de A=90°, B=30° ve AC=7 cm. AB ile BC kaç cm’dir?",
        strategy: "30° karşısındaki AC’yi kısa dik kenar seç.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "B=30° olduğundan karşısındaki AC=7, a rolündedir; BC hipotenüstür.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "30–60–90 oranı a:a√3:2a olduğundan AB=7√3 ve BC=14 yazılır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "49+147=196=14² ile Pisagor kontrol edilir; kalan açı C=60° olur.",
          },
        ],
        answer: "AB=7√3 cm, BC=14 cm",
        check: "En uzun kenar 14; 30° karşısındaki 7 en kısa kenardır.",
        pitfall:
          "AB’yi 7/√3 seçmek, 7’yi yanlışlıkla 60° karşısındaki kenar kabul eder.",
      },
      {
        title: "Alanla hipotenüs yüksekliği",
        prompt:
          "Dik kenarları 6 ve 8 cm olan üçgenin hipotenüsüne ait yüksekliği kaç cm’dir?",
        strategy: "Aynı alanı iki farklı tabanla yaz.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "Hipotenüs c=√(6²+8²)=10 cm olur.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "Alan 6·8/2=24 cm²; aynı alan 10·h/2’dir.",
          },
          {
            label: "Sonucu denetle",
            explanation: "10h=48 olduğundan h=24/5=4,8 cm bulunur.",
          },
        ],
        answer: "24/5 cm",
        check: "İzdüşümler 36/10 ve 64/10’dur; çarpımları 23,04=4,8² çıkar.",
        pitfall:
          "Yüksekliği dik kenarlardan biri sanma; hangi tabana ait olduğu sonucu değiştirir.",
      },
    ],
    recall: [
      {
        prompt: "Pisagor’u kullanmadan önce hangi kenarı tanımlamalısın?",
        answer:
          "90° karşısındaki hipotenüsü; c en uzun kenar seçilir ve a²+b²=c² yazılır.",
      },
      {
        prompt: "A=90°, BH=p, HC=q, AH⊥BC modelinde üç Öklid bağıntısı nedir?",
        answer: "AB²=(p+q)p, AC²=(p+q)q ve AH²=pq.",
      },
      {
        prompt: "30° karşısı a olan dik üçgende diğer iki kenar nedir?",
        answer:
          "Diğer dik kenar a√3, hipotenüs 2a; 30° karşısı en kısa kenardır.",
      },
      {
        prompt:
          "Dik kenarları a,b ve hipotenüsü c olan üçgende hipotenüs yüksekliği nasıl bulunur?",
        answer: "Alanları eşitleyerek h=ab/c; a·b=c·h.",
      },
    ],
    items: [
      {
        prompt: "ABC üçgeninde A=90°, AB=7 cm ve AC=24 cm. BC kaç cm’dir?",
        options: ["25", "31", "17", "49", "√527"],
        knowledge: [
          "Hipotenüs 90° karşısındadır.",
          "Dik kenarların karelerinin toplamı hipotenüsün karesidir.",
        ],
        strategy: "BC’yi hipotenüs seç ve iki dik kenarı kullan.",
        steps: [
          "BC²=7²+24² yaz.",
          "49+576=625 bul.",
          "Pozitif uzunluk için BC=25 al.",
        ],
        optionReasons: [
          "25²=625; iki kareyi doğru toplar.",
          "31, kenarları doğrudan toplamaktır.",
          "17, kenar farkını almaktır.",
          "49 yalnız 7’nin karesidir.",
          "527, kareleri çıkararak yanlışlıkla dik kenar arar.",
        ],
        commonError: "Hipotenüsü bulurken kareleri çıkarmak.",
        check: "25>24 ve 25>7; 49+576=625.",
      },
      {
        prompt: "ABC’de B=90°, AC=15 cm ve AB=9 cm. BC kaç cm’dir?",
        options: ["12", "6", "√306", "24", "10"],
        knowledge: [
          "AC hipotenüstür.",
          "Eksik dik kenar için kareler çıkarılır.",
        ],
        strategy: "BC²=AC²−AB² kur.",
        steps: [
          "Dik açının karşısındaki AC=15’i işaretle.",
          "BC²=225−81=144 hesapla.",
          "BC=12 cm; pozitif kökü seç.",
        ],
        optionReasons: [
          "12²+9²=225; doğrudur.",
          "6, 15−9 farkıdır.",
          "√306, iki karenin toplamıdır ve hipotenüsü yanlış seçer.",
          "24, verilen kenarların toplamıdır.",
          "10 için 100+81≠225 olur.",
        ],
        commonError: "Şekil yönüne bakıp 15’i dik kenar sanmak.",
        check: "9–12–15, 3–4–5 üçgeninin üç katıdır.",
      },
      {
        prompt:
          "Aşağıdaki kenar üçlülerinden hangisi bir dik üçgen oluşturur? Tüm uzunluklar cm’dir.",
        options: ["8, 15, 17", "4, 5, 6", "5, 6, 8", "6, 8, 11", "7, 8, 10"],
        knowledge: ["Ters Pisagor en büyük kenar için sınanır."],
        strategy: "Her seçenekte en büyük uzunluğun karesini karşılaştır.",
        steps: [
          "8²+15²=64+225=289 hesapla.",
          "17²=289 ile eşitliği gör.",
          "8+15>17 olduğundan üçgenin varlığını da doğrula.",
        ],
        optionReasons: [
          "64+225=289=17²; dik üçgendir.",
          "16+25=41, 36 değildir.",
          "25+36=61, 64 değildir.",
          "36+64=100, 121 değildir.",
          "49+64=113, 100 değildir.",
        ],
        commonError:
          "Yalnız en büyük kenarın diğerlerinden büyük olmasını diklik sanmak.",
        check: "Her üçlü gerçek üçgendir; yalnız ilki kare eşitliğini sağlar.",
      },
      {
        prompt: "ABC’de A=90°, B=45° ve AB=6 cm. Hipotenüs BC kaç cm’dir?",
        options: ["6√2", "12", "3√2", "6", "6√3"],
        knowledge: [
          "Diğer dar açı da 45° olur.",
          "Eş dar açıların karşısındaki dik kenarlar eşittir.",
        ],
        strategy: "İki dik kenarı 6 al.",
        steps: [
          "C=180−90−45=45° bul.",
          "AC=AB=6 yaz; BC²=36+36=72.",
          "BC=√72=6√2 cm al.",
        ],
        optionReasons: [
          "6√2 eş dik kenarlı üçgenin hipotenüsüdür.",
          "12 iki dik kenarın toplamıdır.",
          "3√2 hipotenüs verilmiş gibi ters oran kullanır.",
          "6 dik kenar uzunluğudur; hipotenüs daha büyük olmalıdır.",
          "6√3, 30–60–90 oranını yanlış duruma taşır.",
        ],
        commonError: "Her özel üçgende aynı √3 oranını aramak.",
        check: "(6√2)²=72 ve 36+36=72.",
      },
      {
        prompt:
          "ABC’de A=90°, B=30° ve BC=18 cm. 30° açısının karşısındaki AC kaç cm’dir?",
        options: ["9", "9√3", "18√3", "6", "18"],
        knowledge: ["30° karşısı hipotenüsün yarısıdır."],
        strategy: "BC’nin hipotenüs olduğunu belirle.",
        steps: [
          "A=90° olduğundan BC=18 hipotenüstür.",
          "30° karşısı AC=a, hipotenüs 2a olarak yazılır.",
          "2a=18’den a=9 bulunur.",
        ],
        optionReasons: [
          "9, hipotenüsün yarısıdır.",
          "9√3, 60° karşısındaki AB’dir.",
          "18√3 hipotenüsten de büyüktür.",
          "6 için 1:3 oranı varsayılmış olur.",
          "18 hipotenüsle eşit uzunluk vererek dik üçgeni bozar.",
        ],
        commonError: "30° karşısıyla komşu dik kenarı karıştırmak.",
        check: "Diğer dik kenar 9√3 alınırsa 81+243=324=18².",
      },
      {
        prompt:
          "ABC’de A=90°, H∈BC ve AH⊥BC. BH=4 cm, HC=9 cm ise AH kaç cm’dir?",
        options: ["6", "13", "√97", "36", "5"],
        knowledge: [
          "Hipotenüse ait yüksekliğin karesi iki izdüşümün çarpımıdır.",
        ],
        strategy: "h²=BH·HC uygula.",
        steps: [
          "BH ve HC’nin hipotenüsün parçaları olduğunu belirle.",
          "AH²=4·9=36 yaz.",
          "AH=6 cm al; karekökü unutma.",
        ],
        optionReasons: [
          "6²=4·9; doğrudur.",
          "13 hipotenüsün toplam uzunluğudur.",
          "√97 parçaları dik kenar gibi Pisagor’a koyar.",
          "36 yüksekliğin karesidir.",
          "5 için kare25 olur; çarpım36’ya uymaz.",
        ],
        commonError: "h²=pq eşitliğindeki kareyi atlamak.",
        check: "BC=13; h=6, BC’den küçüktür ve pq=36’dır.",
      },
      {
        prompt:
          "ABC’de A=90°, H∈BC ve AH⊥BC. BH=5 cm, HC=20 cm. AB kaç cm’dir?",
        options: ["5√5", "10", "10√5", "25", "15"],
        knowledge: ["AB’nin BC üzerindeki izdüşümü BH’dir."],
        strategy: "AB²=BC·BH kullan.",
        steps: [
          "BC=5+20=25 cm bul.",
          "AB²=25·5=125 yaz.",
          "AB=√125=5√5 cm al.",
        ],
        optionReasons: [
          "5√5’in karesi125’tir; AB’ye ait BH kullanılır.",
          "10, AH=√(5·20) yüksekliğidir.",
          "10√5, AC’nin uzunluğudur.",
          "25 hipotenüstür.",
          "15 için225≠125 olur.",
        ],
        commonError: "AB² ile AC²’de kullanılan izdüşümleri değiştirmek.",
        check: "AC²=25·20=500; 125+500=625=25².",
      },
      {
        prompt:
          "ABC dik üçgeninde dik kenarlar 9 cm ve 12 cm’dir. Hipotenüse ait yükseklik kaç cm’dir?",
        options: ["36/5", "15/2", "9", "12", "5"],
        knowledge: [
          "Alan iki dik kenardan veya hipotenüs-yükseklikten bulunabilir.",
        ],
        strategy: "Önce hipotenüsü bul, sonra alanları eşitle.",
        steps: [
          "c=√(81+144)=15 cm hesapla.",
          "9·12/2=15·h/2 yaz.",
          "h=108/15=36/5 cm bul.",
        ],
        optionReasons: [
          "36/5,108/15 oranının sade hâlidir.",
          "15/2 hipotenüse ait kenarortaydır.",
          "9 bir dik kenardır; hipotenüs yüksekliği değildir.",
          "12 diğer dik kenardır.",
          "h=5 olsaydı15h=75≠108=9·12 olurdu; alanlar eşit çıkmazdı.",
        ],
        commonError: "Yükseklik ve kenarortay uzunluklarını aynı kabul etmek.",
        check: "15·(36/5)=108=9·12.",
      },
      {
        prompt:
          "Bir dik üçgende hipotenüs 20 cm’dir. Dik köşeden hipotenüsün orta noktasına çizilen kenarortay kaç cm’dir?",
        options: ["10", "20", "5", "10√2", "15"],
        knowledge: [
          "Dik üçgende hipotenüsün orta noktası üç köşeye eşit uzaklıktadır.",
        ],
        strategy: "Hipotenüsün yarısını al.",
        steps: [
          "Hipotenüsün orta noktasını M olarak adlandır.",
          "M’den iki hipotenüs ucuna uzaklık20/2=10’dur.",
          "Dik köşeden M’ye uzaklık da10 cm olur.",
        ],
        optionReasons: [
          "10, hipotenüsün yarısıdır.",
          "20 tüm hipotenüsü alır.",
          "5 yarıyı yeniden yarıya böler.",
          "Hipotenüs20 olduğundan kenarortay her durumda10’dur;10√2 bu sabit özelliğe aykırıdır.",
          "15, orta nokta özelliğine uymaz.",
        ],
        commonError: "Hipotenüse ait kenarortayı yükseklikle karıştırmak.",
        check:
          "Kenarortayın 10 olması, M merkezli10 yarıçaplı çemberin üç köşeden geçtiğini söyler.",
      },
      {
        prompt:
          "ABC’de A=90°, H∈BC ve AH⊥BC. AH=12 cm, BH=9 cm ise HC kaç cm’dir?",
        options: ["16", "3", "21", "15", "144"],
        knowledge: ["AH²=BH·HC."],
        strategy: "Eksik izdüşümü çarpım eşitliğinden çöz.",
        steps: [
          "HC=q>0 seç ve 12²=9q yaz.",
          "144=9q eşitliğini9’a böl.",
          "q=16 cm bul; BH+HC=25 cm olur.",
        ],
        optionReasons: [
          "16,144/9 değeridir.",
          "3,12−9 farkıdır.",
          "21,12+9 toplamıdır.",
          "15, bu modelde AB’dir; HC değildir.",
          "144 yüksekliğin karesidir, henüz9’a bölünmemiştir.",
        ],
        commonError: "Yüksekliği ve izdüşümü doğrusal toplamak.",
        check: "9·16=144=12²; model15–20–25 dik üçgenini verir.",
      },
    ],
  },
  {
    id: "tyt-geo-eslik-benzerlik-031",
    title: "Üçgenlerde eşlik ve benzerlik: eşleme, ölçek ve paralellik",
    minutes: 47,
    source:
      "MEBİ TYT Matematik Konu Özetleri: üçgenlerde eşlik, benzerlik, yardımcı elemanlar ve dik üçgen seçili sayfaları; Aurelia TYT Geometri özetindeki ilgili ilişkilerle karşılaştırılarak hazırlanmış özgün anlatım, örnek ve sorular. Sorular resmî sınav sorusu değildir. Eşkenar Üçgen 5.1, fiziksel s. 1 ve 4: eş yükseklikli alan şeritleri.",
    objectives: [
      "Karşılıklı köşeleri belirterek eşlik ve benzerliği ayır.",
      "KKK, KAK, AKA eşlik ve AA, KAK, KKK benzerlik koşullarını gerekçelendir.",
      "Paralel doğruların oluşturduğu orantılı parçaları doğru eşleştir.",
      "Uzunluk, çevre ve alan oranlarını aynı yönde hesapla.",
    ],
    sections: [
      {
        title: "Aynı biçim ile aynı büyüklüğü ayır",
        paragraphs: [
          "İki üçgen eştir denildiğinde karşılıklı açıları eşit ve karşılıklı kenarları aynı uzunluktadır. Birini döndürmek, taşımak veya yansıtmak eşliği bozmaz. Eşlik, şeklin sayfa üzerindeki yönünden bağımsızdır; kenar uzunlukları ve açı ölçüleri korunur.",
          "Benzer üçgenlerde karşılıklı açılar eşit, karşılıklı kenarlar aynı pozitif oranda değişmiştir. Eş üçgenler benzerliğin oranı 1 olan özel hâlidir. Yalnız üç açının eşitliği boyutu belirlemez: 3–4–5 ile 6–8–10 üçgenleri benzerdir, eş değildir.",
        ],
      },
      {
        title: "Köşe sırası bir bilgi taşır",
        paragraphs: [
          "ABC∼DEF yazımı A↔D, B↔E ve C↔F eşlemesini belirtir. Buna göre AB↔DE, AC↔DF ve BC↔EF olur. Eşlik yazımında da aynı sıra okunur. Kâğıtta soldaki kenarın karşılık olarak mutlaka soldaki kenara gitmesi gerekmez; şekil dönebilir.",
          "Oranı yeni/eski veya küçük/büyük olarak bir kez seçip bütün kenarlarda koru. AB/DE yazdıysan sonraki oran AC/DF olmalıdır; DF/AC yazmak oranı ters çevirir. Önce eş açıları aynı işaretle göster, sonra karşılarındaki kenarları eşleştir; çıplak sayıların yakınlığına göre eşleme yapma.",
        ],
      },
      {
        title: "Eşliği hangi veriler kanıtlar?",
        paragraphs: [
          "KKK eşliğinde üç karşılıklı kenar eşittir. KAK eşliğinde iki karşılıklı kenar ve bu iki kenarın ARASINDA kalan açı eşittir. AKA eşliğinde iki karşılıklı açı ve aralarındaki kenar eşittir; iki açı üçüncüyü de belirlediği için uygun karşılıklı bir kenarla da eşlik kurulabilir.",
          "“Üç eleman eşitse her zaman eşlik vardır” genellemesi yanlıştır. Üç açı yalnız benzerlik verir; rastgele iki kenar ve aralarında olmayan açı da genel durumda tek üçgen belirlemez. Dik üçgenlerde hipotenüs ve bir dik kenar eşitse Pisagor diğer dik kenarı da eşitler ve KKK ile eşlik kurulabilir.",
        ],
      },
      {
        title: "Benzerliği hangi veriler kanıtlar?",
        paragraphs: [
          "AA benzerliğinde iki karşılıklı açı eşit olunca üçüncü açılar da 180° toplamından eşit olur. KAK benzerliğinde iki karşılıklı kenar aynı oranda ve aralarındaki açılar eşit olmalıdır. KKK benzerliğinde üç karşılıklı kenar oranı aynıdır.",
          "Bir oran yazmak benzerlik kanıtı değildir; önce bu üç koşuldan birini kur. İki üçgende birer açı eşit ve birer kenar orantılı verilmesi yeterli olmaz. Kum saati görünümünde ortak köşedeki ters açı eşliği yalnız bir açı çifti sağlar; ikinci açı için paralellik veya başka açık bir veri gerekir.",
        ],
      },
      {
        title: "Paralel kesitte küçük üçgeni gör",
        paragraphs: [
          "ABC üçgeninde D, AB üzerinde; E, AC üzerinde ve DE∥BC olsun. ADE ile ABC üçgenleri A açısını paylaşır; paralellik diğer karşılıklı açıları eşitler. Bu nedenle AD/AB=AE/AC=DE/BC=t olur. D ve E iç nokta ise 0<t<1’dir.",
          "Aynı modelde AD/DB=AE/EC de doğrudur; fakat bu parça/parça oranı t ile aynı sayı değildir. Örneğin AD/AB=2/5 iken DB/AB=3/5 ve AD/DB=2/3 olur. Denklemde AD+DB=AB toplamını görünür tutmak yanlış payda seçimini önler.",
        ],
      },
      {
        title: "Orta taban ve Thales: ayrı şekiller, aynı oran fikri",
        paragraphs: [
          "İki kenarın orta noktalarını birleştiren doğru parçası üçüncü kenara paraleldir ve onun yarısıdır. Küçük üçgenin bütün uzunlukları ana üçgenin yarısı, çevresi de yarısı olur. Orta taban yalnız ortadan geçtiği açıkça verilmiş ya da kanıtlanmış noktalar için kullanılır.",
          "Üç veya daha çok paralel doğru iki keseni keserse, kesenlerde karşılıklı aralıklar orantılıdır. Bir kesendeki üst aralık / alt aralık oranını, diğer kesendeki üst aralık / alt aralık ile eşleştir. Aralık yerine bütün uzunluğu kullanacaksan iki kesende de aynı tür toplamı seç.",
        ],
      },
      {
        title: "Uzunluk k iken alan neden k²?",
        paragraphs: [
          "Benzerlik oranı yeni/eski=k ise her kenar, çevre, yükseklik, kenarortay ve açıortay uzunluğu k ile çarpılır. Alan taban×yükseklik/2 olduğundan iki bağımsız uzunluk da k ile değişir; alan k² ile çarpılır. Hacim sorularında benzer cisim için k³ gerekir, fakat bu ünite düzlem üçgenleri üzerinde çalışır.",
          "Alan oranı 9/25 ise aynı yöndeki pozitif uzunluk oranı 3/5’tir. DE∥BC modelinde t=2/3 için üst üçgenin alanı ana alanın 4/9’u, kalan yamuğun alanı 5/9’udur. Yamuğun alanını doğrudan t ile çarpmak şekillerin hangisinin benzer olduğunu unutmaya yol açar.",
        ],
      },
      {
        title: "Gölge ve ölçek problemlerinde varsayımı yaz",
        paragraphs: [
          "Aynı anda düz zemindeki dik nesneler için güneş ışınları paralel kabul edilirse, yükseklik–gölge üçgenleri AA ile benzerdir. Yükseklik/gölge oranı ortaktır. Farklı saatte veya eğimli zeminde aynı oranı gerekçe vermeden kullanmak modelin koşullarını değiştirir.",
          "Soru çözümünde üç kısa kontrol yeterlidir: karşılıklı köşe sırası, bütün oranların yönü, uzunluk–alan ayrımı. Bir figürün büyütülmesi açıyı büyütmez; açıların eşit kalması benzerliğin bir parçasıdır. Sonucu ikinci bir kenar çifti veya alan oranıyla denetle.",
        ],
      },
      {
        title: "Eş yükseklikli şeritlerin alanları neden farklı?",
        figureTitle: "Eş yükseklik, farklı alan",
        paragraphs: [
          "Eşkenar üçgende tabana paralel kesimler yüksekliği tepeden itibaren üç eş parçaya ayırsın. Tepeden birinci ve ikinci kesime kadar olan şekiller, büyük üçgene sırasıyla 1/3 ve 2/3 uzunluk oranıyla benzerdir. Yükseklik oranı kadar taban oranı da değişir. Bu yüzden biriken alan payları 1/9, 4/9 ve 1 olur.",
          "Şerit alanı bulmak için iki biriken alanı çıkar. Baştan sona eş yükseklikli üç şeridin alan payları 1/9, 3/9 ve 5/9’dur. En alttaki şerit daha geniş tabanlara yayıldığı için en büyüktür. Eğer kesimler paralel değilse önce benzerliğin geçerli olup olmadığını kontrol et.",
        ],
      },
    ],
    examples: [
      {
        title: "Paralel kesitte eksik kenar",
        prompt:
          "ABC’de D∈AB, E∈AC ve DE∥BC. AD=6, DB=4, AC=15 cm. AE kaç cm’dir?",
        strategy:
          "Önce AB bütününü bul, sonra aynı yönde küçük/büyük oranı kur.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "AB=6+4=10 cm; ADE∼ABC, çünkü ortak A açısı ve paralel doğruların açıları eşittir.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "AD/AB=AE/AC verir;6/10=AE/15 yazılır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "AE=9 cm olur; EC=6 ve AD/DB=6/4=9/6 oranı ayrıca doğrulanır.",
          },
        ],
        answer: "9 cm",
        check: "Küçük/büyük oran3/5’tir;9/15 de3/5.",
        pitfall:
          "6/4=AE/15 kurmak parça/parça ile parça/bütün oranlarını karıştırır.",
      },
      {
        title: "Alan oranından çevre oranına",
        prompt:
          "Benzer iki üçgenin küçük/büyük alan oranı 16/49’dur. Büyük üçgenin çevresi 42 cm ise küçük üçgenin çevresi kaç cm’dir?",
        strategy: "Alan oranının pozitif kareköküyle uzunluk oranına dön.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Alan oranı k²=16/49 olduğundan k=4/7 bulunur; uzunluk oranı pozitiftir.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Çevre uzunluk olduğu için küçük çevre/büyük çevre=4/7 yazılır.",
          },
          {
            label: "Sonucu denetle",
            explanation: "Küçük çevre42·4/7=24 cm olur.",
          },
        ],
        answer: "24 cm",
        check: "24/42=4/7; bunun karesi16/49’dur.",
        pitfall: "Çevreyi16/49 ile çarpmak alan oranını uzunluğa taşır.",
      },
      {
        title: "Gölgeden yüksekliğe",
        prompt:
          "Aynı anda yatay zemindeki dik bir çubuğun boyu1,5 m, gölgesi2 m’dir. Aynı zemindeki dik ağacın gölgesi8 m. Güneş ışınları paralel kabul edildiğinde ağacın boyu kaç metredir?",
        strategy:
          "İki dik üçgende ortak ışın açısı üzerinden AA benzerliği kur.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Dik nesneler ve yatay zemin90° oluşturur; paralel ışınlar diğer açı çiftini eşitler.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "Ağaç/çubuk ölçeği gölgelerden8/2=4’tür.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Ağacın boyu1,5·4=6 m bulunur; yükseklik/gölge oranı iki üçgende3/4’tür.",
          },
        ],
        answer: "6 m",
        check: "6/8=1,5/2=0,75.",
        pitfall: "Gölge farkını nesne boyuna eklemek aynı ölçeği korumaz.",
      },
      {
        title: "Orta şeridin alanını ayır",
        prompt: "Alanı 81 birim² olan eşkenar üçgenin yüksekliği tabana paralel çizgilerle üç eş parçaya ayrılıyor. Ortadaki şerit kaç birim²?",
        strategy: "Tepeden biriken alanları bul. İki biriken alanın farkını al.",
        steps: [
          { label: "Uzunluk oranları", expression: "1/3 ve 2/3", explanation: "Tabana paralel kesimlerin oluşturduğu iki küçük üçgen ana üçgene benzerdir." },
          { label: "Biriken alanlar", expression: "81·(1/3)²=9, 81·(2/3)²=36", explanation: "Hem taban hem yükseklik değişir. Alan için uzunluk oranının karesi gerekir." },
          { label: "Orta şeridi ayır", expression: "36−9=27", figureTitle: "Eş yükseklik, farklı alan", explanation: "İkinci kesimin üstündeki 36 birim² içinde ilk 9 birim² de bulunur." },
        ],
        answer: "27 birim².",
        check: "Üst, orta ve alt şeritler sırasıyla 9, 27 ve 45 birim². Toplam 81.",
        pitfall: "Eş yüksekliklerden üç eş alan sonucu çıkmaz. Bu örnekte yalnız orta şerit 27 çıkar.",
      },
    ],
    recall: [
      {
        prompt: "Üç açının eşitliği neden eşliği zorunlu kılmaz?",
        answer:
          "Açılar biçimi belirler, boyutu değil;3–4–5 ile6–8–10 benzer fakat eş değildir.",
      },
      {
        prompt: "KAK koşulunda açının hangi konumda olması gerekir?",
        answer: "Eş veya orantılı verilen iki kenarın arasında olmalıdır.",
      },
      {
        prompt: "AD/AB=2/5 ise AD/DB kaçtır?",
        answer:
          "DB/AB=3/5 olduğundan AD/DB=2/3; parça/bütün ile parça/parça farklıdır.",
      },
      {
        prompt: "Küçük/büyük uzunluk oranı3/4 ise alan oranı nedir?",
        answer: "9/16; taban ve yükseklik ayrı ayrı3/4 ile değişir.",
      },
    ],
    items: [
      {
        prompt:
          "ABC≅DEF eşlemesinde A↔D, B↔E ve C↔F’dir. AB=7, BC=9 ve AC=11 cm ise DF kaç cm’dir?",
        options: ["11", "7", "9", "18", "22"],
        knowledge: ["Eşlikte karşılıklı kenarlar eşittir."],
        strategy: "DF’nin hangi kenara karşılık geldiğini köşelerden oku.",
        steps: [
          "D köşesinin A’ya, F köşesinin C’ye karşılık geldiğini belirle.",
          "Bu nedenle DF↔AC eşlemesini yaz.",
          "AC=11 olduğundan DF=11 cm bul.",
        ],
        optionReasons: [
          "DF,AC’ye karşılık gelir;11 doğrudur.",
          "7,AB ve DE’nin uzunluğudur.",
          "9,BC ve EF’nin uzunluğudur.",
          "18,9’u iki katına çıkarır; eşlik oranı1’dir.",
          "22,11’i iki katına çıkarır; eşlikte ölçek büyümez.",
        ],
        commonError: "Şeklin sayfadaki yerine göre kenar eşlemek.",
        check: "DE=7,EF=9,DF=11 yazımı eşleme sırasını korur.",
      },
      {
        prompt:
          "İki üçgende karşılıklı iki kenar 5 ve 8 cm’dir. Bu iki kenar arasındaki açı iki üçgende de40°’dir. Hangi gerekçe eşliği doğrudan kanıtlar?",
        options: [
          "Kenar–Açı–Kenar eşliği",
          "Yalnız Açı–Açı benzerliği",
          "Yalnız üç açı eşliği",
          "Çevrelerin eşitliği",
          "Alanların eşitliği",
        ],
        knowledge: ["KAK eşliği iki kenar ve aralarındaki açıyı kullanır."],
        strategy: "Verilerin sırasını kenar–aradaki açı–kenar olarak eşleştir.",
        steps: [
          "5 ve8 uzunluklarının iki üçgende de eş olduğunu yaz.",
          "40° açısının bu iki kenarın arasında verildiğini belirt.",
          "KAK eşliği ile üçgenlerin eş olduğunu sonuçlandır.",
        ],
        optionReasons: [
          "İki kenar ve aralarındaki açı verisi tam KAK koşuludur.",
          "AA için iki açı gerekir ve yalnız benzerlik boyutu belirlemez.",
          "Üç açı verilmediği gibi yalnız açılar eşliğe yetmez.",
          "Çevre eşitliği tek başına şekli belirlemez.",
          "Alan eşitliği tek başına eşlik vermez.",
        ],
        commonError: "Aralarında olmayan açıyı da koşulsuz KAK saymak.",
        check:
          "Açı yerini değiştirmek veriyi değiştirir; burada40° açıkça5 ve8 arasındadır.",
      },
      {
        prompt:
          "Aşağıdaki bilgilerden hangisi iki üçgenin eşliğini tek başına zorunlu kılmaz?",
        options: [
          "Karşılıklı üç açının eşit olması",
          "Karşılıklı üç kenarın eşit olması",
          "İki karşılıklı kenar ve aralarındaki açının eşit olması",
          "İki karşılıklı açı ve aralarındaki kenarın eşit olması",
          "Dik üçgenlerde hipotenüs ve bir dik kenarın eşit olması",
        ],
        knowledge: [
          "Benzerlikte boyut değişebilir.",
          "Eşlikte en az bir uzunlukla ölçek belirlenmelidir.",
        ],
        strategy: "Üç açı verisi için farklı boyutlu bir karşı örnek kur.",
        steps: [
          "3–4–5 ve6–8–10 dik üçgenlerini seç.",
          "Üç açıları eşit, karşılıklı kenarları2 kat olduğundan eş olmadıklarını gör.",
          "Yalnız açı eşitliği seçeneğinin eşliği zorunlu kılmadığını belirle.",
        ],
        optionReasons: [
          "Üç açı aynı biçimi verir; ölçeği1’e zorlamaz.",
          "KKK eşliği yeterlidir.",
          "KAK eşliği yeterlidir.",
          "AKA eşliği yeterlidir.",
          "Pisagor üçüncü kenarı da eşitler; dik üçgende yeterlidir.",
        ],
        commonError: "Benzerlikle eşliği aynı anlamda kullanmak.",
        check:
          "3–4–5 ve6–8–10 karşı örneği ilk ifadenin yetersizliğini gösterir.",
      },
      {
        prompt:
          "ABC∼DEF; A↔D, B↔E, C↔F. AB=6 cm, DE=9 cm, AC=10 cm ise DF kaç cm’dir?",
        options: ["15", "20/3", "13", "18", "12"],
        knowledge: ["Bütün karşılıklı uzunluklar aynı oranda değişir."],
        strategy: "DEF/ABC oranını DE/AB’den kur.",
        steps: [
          "Yeni/eski oranını9/6=3/2 seç.",
          "DF,AC’ye karşılık geldiği için DF/10=3/2 yaz.",
          "DF=15 cm bul.",
        ],
        optionReasons: [
          "15/10=9/6; doğrudur.",
          "20/3 ters oranla çarpmaktan gelir.",
          "13,iki kenara sabit3 eklemeyi varsayar.",
          "18,6’yı ikiye katlayıp ölçeği yanlış seçer.",
          "12,10’a2 ekler; benzerlikte sabit artış yoktur.",
        ],
        commonError: "Bir oranı yeni/eski diğerini eski/yeni kurmak.",
        check: "DF/AC=15/10=1,5=DE/AB.",
      },
      {
        prompt:
          "Benzer iki üçgende küçük/büyük alan oranı9/25’tir. Büyük üçgende bir yüksekliğin uzunluğu20 cm ise karşılık gelen küçük yükseklik kaç cm’dir?",
        options: ["12", "36/5", "15", "25/3", "18"],
        knowledge: [
          "Alan oranı uzunluk oranının karesidir.",
          "Karşılıklı yükseklikler kenarlarla aynı oranda değişir.",
        ],
        strategy: "Alan oranından pozitif uzunluk oranına dön.",
        steps: [
          "k²=9/25’ten k=3/5 bul.",
          "Küçük yükseklik/20=3/5 yaz.",
          "Küçük yükseklik12 cm hesapla.",
        ],
        optionReasons: [
          "12=20·3/5; uzunluk oranını kullanır.",
          "36/5=20·9/25; alan oranını doğrudan kullanır.",
          "15,ölçeği3/4 seçer; verilen alana uymaz.",
          "25/3 ters ve ilgisiz oran üretir.",
          "18,20’den sabit2 çıkarır; ölçek ilişkisi değildir.",
        ],
        commonError: "Alan oranını yükseklik oranı sanmak.",
        check: "(12/20)²=9/25.",
      },
      {
        prompt:
          "ABC’de D,AB’nin; E,AC’nin iç noktasıdır ve DE∥BC. AD=4 cm, DB=6 cm, BC=15 cm. DE kaç cm’dir?",
        options: ["6", "10", "9", "25/4", "12"],
        knowledge: ["ADE∼ABC olduğundan DE/BC=AD/AB."],
        strategy: "Önce AB bütününü4+6 bul.",
        steps: ["AB=10 cm hesapla.", "DE/15=4/10 yaz.", "DE=6 cm bul."],
        optionReasons: [
          "6/15=4/10; doğrudur.",
          "10,AB’nin uzunluğudur.",
          "9,alt parça6’nın bütün10’a oranını kullanır.",
          "25/4 oranı ters ve yanlış parçalardan kurar.",
          "12,4’ü3 ile çarpar; karşılıklılık yoktur.",
        ],
        commonError: "AD/DB oranını DE/BC’ye eşitlemek.",
        check: "DE<BC; t=0,4 için6=0,4·15.",
      },
      {
        prompt:
          "ABC’de D∈AB, E∈AC ve DE∥BC. AD:DB=2:3, AE=8 cm. EC kaç cm’dir?",
        options: ["12", "20", "16/3", "4", "24"],
        knowledge: ["Paralel kesit iki kenarı aynı parça oranında böler."],
        strategy: "AD/DB=AE/EC kullan.",
        steps: [
          "AD/DB=2/3 olarak yaz.",
          "8/EC=2/3 kur;2EC=24 olur.",
          "EC=12 cm bul.",
        ],
        optionReasons: [
          "8/12=2/3; doğrudur.",
          "20,AC bütünüdür; EC soruluyor.",
          "16/3,8’i2/3 ile çarpıp oranı ters kullanır.",
          "4,parçalar arasında sabit fark varsayar.",
          "24,çapraz çarpımı2’ye bölmeden bırakır.",
        ],
        commonError: "AE’yi AC bütünü sanmak.",
        check: "AC=20; AE/AC=8/20=2/5=AD/AB.",
      },
      {
        prompt:
          "Bir üçgende iki kenarın orta noktalarını birleştiren orta taban7 cm’dir. Üçüncü kenarın uzunluğu kaç cm’dir?",
        options: ["14", "7/2", "7", "21", "28"],
        knowledge: ["Orta taban paralel olduğu kenarın yarısıdır."],
        strategy: "DE=BC/2 eşitliğini kullan.",
        steps: [
          "İki noktanın gerçekten orta nokta verildiğini belirt.",
          "7=BC/2 yaz.",
          "BC=14 cm bul.",
        ],
        optionReasons: [
          "14’ün yarısı7’dir.",
          "7/2 bir kez daha yarıya böler.",
          "7 eşlik varsayar; küçük üçgen yarım ölçeklidir.",
          "21 üçte bir oranını kullanır; burada yarıdır.",
          "28 iki kez büyütür.",
        ],
        commonError:
          "Her paralel kesiti orta taban sanmak; burada orta noktalar açıkça verilmiştir.",
        check: "Küçük/büyük uzunluk oranı1/2 olur.",
      },
      {
        prompt:
          "ABC’de D∈AB, E∈AC, DE∥BC ve AD/AB=2/3. ABC’nin alanı81 cm² ise DECB yamuğunun alanı kaç cm²’dir?",
        options: ["45", "36", "54", "27", "63"],
        knowledge: [
          "ADE’nin alanı,ABC alanının(2/3)²’sidir.",
          "Yamuk büyük üçgenden küçük üçgen çıkarılarak bulunur.",
        ],
        strategy: "Önce üst üçgenin alanını hesapla.",
        steps: [
          "ADE alanı81·4/9=36 cm² bul.",
          "DECB bölgesinin kalan alan olduğunu belirle.",
          "81−36=45 cm² hesapla.",
        ],
        optionReasons: [
          "45,81−36 değeridir.",
          "36 üstteki ADE üçgeninin alanıdır.",
          "54,81’i uzunluk oranı2/3 ile çarpar.",
          "27,uzunlukta kalan1/3’ü alan sanır.",
          "63,alan oranını2/9 gibi yanlış seçer.",
        ],
        commonError: "Yamuğun üçgenle benzer olduğunu varsaymak.",
        check: "45/81=5/9=1−4/9; iki parçanın toplamı81.",
      },
      {
        prompt:
          "Birbirine paralel üç doğru iki keseni A,B,C ve D,E,F sırasıyla kesiyor. A,B,C aynı kesen üzerinde; D,E,F diğerindedir. AB=6, BC=9, DE=4 cm ise EF kaç cm’dir?",
        options: ["6", "8/3", "13", "9", "10"],
        knowledge: [
          "Paralel doğrular iki kesendeki karşılıklı aralıkları orantılı böler.",
        ],
        strategy: "Üst aralık/alt aralık oranını iki kesende aynı yönde kur.",
        steps: [
          "AB/BC=DE/EF yaz.",
          "6/9=4/EF;6EF=36 olur.",
          "EF=6 cm hesapla.",
        ],
        optionReasons: [
          "6/9=4/6; Thales oranı sağlanır.",
          "8/3,4’ü6/9 ile çarpıp ters yönde kullanır.",
          "13,9+4 toplamıdır; ilgili oran değildir.",
          "9,kesenlerdeki alt aralıkları eşit varsayar.",
          "10,6+4 toplamıdır; EF’yi belirlemez.",
        ],
        commonError: "Bir kesende aralık diğerinde toplam uzunluk almak.",
        check:
          "AD gibi iki kesen arasında tanımsız bir parçaya ihtiyaç yoktur; aralıklar açıkça verilmiştir.",
      },
    ],
  },
  {
    id: "tyt-geo-ucgen-merkezleri-031",
    title: "Üçgende yardımcı elemanlar: açıortay, kenarortay ve merkezler",
    minutes: 55,
    source:
      "MEBİ TYT Matematik Konu Özetleri: üçgenlerde eşlik, benzerlik, yardımcı elemanlar ve dik üçgen seçili sayfaları; Aurelia TYT Geometri özetindeki ilgili ilişkilerle karşılaştırılarak hazırlanmış özgün anlatım, örnek ve sorular. Sorular resmî sınav sorusu değildir.",
    objectives: [
      "Açıortay, kenarortay, yükseklik ve orta dikmenin farklı tanımlarını ayır.",
      "İç ve dış açıortay oranlarını noktanın konumuyla uygula.",
      "Ağırlık merkezinin2:1 oranını ve eş alan parçalarını gerekçelendir.",
      "İç merkez, çevrel merkez ve diklik merkezinin eş uzaklıklarını ve konumlarını karşılaştır.",
    ],
    sections: [
      {
        title: "Dört çizginin dört ayrı görevi",
        paragraphs: [
          "Kenarortay bir köşeden karşı kenarın orta noktasına gider. Açıortay köşedeki açıyı iki eş açıya ayırır. Yükseklik köşeden karşı kenarın doğrusuna dik iner. Kenar orta dikmesi bir kenarın orta noktasından ona dik geçen doğrudur; genel üçgende karşı köşeden geçmesi gerekmez.",
          "Bir çizginin şekle bakınca ortadan geçmesi veya dik görünmesi yeterli veri değildir. Orta nokta için eş parça işaretlerini, açıortay için eş açı işaretlerini ve yükseklik için90° işaretini ara. Genel üçgende bu görevler farklı doğrulardır; ikizkenar veya eşkenar gibi özel hâllerde birleşebilirler.",
        ],
      },
      {
        title: "Açıortay eş açı kurar, eş kenar parçası zorunlu değildir",
        paragraphs: [
          "A açısının iç açıortayı AD ve D∈BC olsun. ABD ile ACD üçgenlerinde A açısındaki paylar eşittir. Açıortay üzerindeki bir noktanın açının iki koluna dik uzaklıkları eşittir. Dik uzaklık, eğik bir köşeye uzaklıkla aynı şey değildir.",
          "İç açıortay teoremi BD/DC=AB/AC verir. Eş bölünen açı iken karşı kenar genellikle eş bölünmez. AB=6, AC=9 ve BC=10 için karşı kenar2:3 oranında4 ve6 olarak bölünür. Parçaları bulurken oran paylarını topla ve bütün kenarı bu toplama böl.",
        ],
      },
      {
        title: "İç açıortayın uzunluğu ve alanla anlamı",
        paragraphs: [
          "AB=c, AC=b, BD=m, DC=n ve AD iç açıortay olduğunda AD²=bc−mn’dir. Burada b ile c, açıortayın çıktığı köşeye komşu iki kenardır; m ile n karşı kenarın parçalarıdır. Kullanımdan önce m/n=c/b koşulu da sağlanmalıdır.",
          "ABD ve ACD aynı yüksekliği paylaştığından alanları BD/DC oranındadır; dolayısıyla iç açıortayın ayırdığı alanların oranı AB/AC olur. Üçgenin kenarları5,5 ve6 ise tepe açıortayı tabanı3 ve3 böler; uzunluğu√(25−9)=4’tür. Bu özel örnekte açıortay yükseklik ve kenarortayla aynı parçadır.",
        ],
      },
      {
        title: "Dış açıortayda nokta uzantıda olur",
        paragraphs: [
          "A köşesindeki bir dış açının açıortayı BC doğrusunu E’de kesiyorsa E,BC doğru parçasının dışındadır ve |BE|/|CE|=AB/AC olur. İç açıortayda parçalar toplanarak BC’yi verir; dış açıortayda ilgili büyük ve küçük uzaklığın farkı BC’dir.",
          "AB=AC ise A’daki dış açıortay BC’ye paraleldir; sonlu bir kesişim noktası varmış gibi oran denklemi kurma. AB<AC olduğunda |BE|<|CE| olacağı için E,B tarafındaki uzantıda bulunur. Önce B,C,E sırasını yerleştirmek toplam–fark hatasını önler.",
        ],
      },
      {
        title: "İç merkez I: kenarlara eş dik uzaklık",
        paragraphs: [
          "Üç iç açıortay üçgenin içinde tek bir I noktasında kesişir. I’nın üç kenarın doğrularına dik uzaklıkları eşittir; bu ortak r uzaklığı iç teğet çemberin yarıçapıdır. Köşelere olan IA,IB,IC uzaklıklarının eşit olması gerekmez.",
          "BIC üçgeninde B ve C açıları ana üçgendeki açıların yarılarıdır. Bu yüzden ∠BIC=180°−(B+C)/2=90°+A/2 olur. A’nın karşısındaki dış teğet çember merkezi Iₐ, B ve C’nin dış açıortaylarının uygun kesişimidir; ∠BIₐC=90°−A/2 olur. İç merkezle dış merkezdeki artı–eksi işaretlerini ayrı düşün.",
        ],
      },
      {
        title: "Kenarortay ve ağırlık merkezi G",
        paragraphs: [
          "A’dan BC’nin orta noktası M’ye çizilen AM bir kenarortaydır. BM=MC olduğundan ABM ile ACM’nin tabanları eşit ve yükseklikleri ortaktır; alanları eşittir. Üç kenarortay her zaman üçgenin içinde ağırlık merkezi G’de kesişir.",
          "G her kenarortayı köşeden başlayarak2:1 oranında böler: AG=2AM/3 ve GM=AM/3. Uzun parça köşeye yakındır. Üç kenarortay birlikte altı eş alanlı küçük üçgen oluşturur. Bu eşlik alan içindir; altı küçük üçgenin kenarları genel durumda eş değildir.",
        ],
      },
      {
        title: "Kenarortay uzunluğu ve dik üçgendeki özel hâl",
        paragraphs: [
          "BC=a, CA=b ve AB=c ise A’dan çizilen kenarortayın uzunluğu mₐ için4mₐ²=2b²+2c²−a²’dir. Bu ifade orta noktanın iki yanındaki küçük üçgenlerde kurulan uzunluk ilişkilerinin toplamından gelir. Dik olmayan üçgende mₐ’yı yükseklik sanarak Pisagor kullanmak doğru değildir.",
          "Dik üçgende hipotenüsün orta noktası üç köşeye eşit uzaklıktadır; bu nedenle dik köşeden hipotenüse çizilen kenarortay hipotenüsün yarısıdır. Bu özellik her kenara ait kenarortay için geçerli değildir. Hipotenüse ait yüksekliğin aynı değer olması ancak ikizkenar dik üçgen gibi ek bir koşulda gerçekleşir.",
        ],
      },
      {
        title: "Yükseklikler ve diklik merkezi H",
        paragraphs: [
          "Bir yükseklik karşı kenarın kendisine veya uzantısına dik iner. Üç yükseklik doğrusu diklik merkezi H’de kesişir. Dar açılı üçgende H içeride, dik üçgende dik açının köşesinde, geniş açılı üçgende dışarıdadır. Geniş üçgende uzantıları çizmek hata değil tanımın gereğidir.",
          "Yüksekliğin boyunu bulmak için hangi tabana ait olduğunu belirt. Aynı üçgende alan a·hₐ/2=b·hᵦ/2=c·h𝚌/2 olduğundan büyük kenara ait yükseklik daha kısa olur. Yüksekliğin dik olduğu doğruyla köşenin karşısındaki kenarın yönü aynı olmalıdır; herhangi bir90° işareti yeterli değildir.",
        ],
      },
      {
        title: "Kenar orta dikmeleri ve çevrel merkez O",
        paragraphs: [
          "Bir doğru parçasının orta dikmesi üzerindeki her nokta iki uca eşit uzaklıktadır. Üçgenin üç kenarının orta dikmeleri O noktasında birleşir; OA=OB=OC=R olur. O çevrel çemberin merkezidir; burada eşit olan uzaklıklar kenarlara değil köşeleredir.",
          "O dar üçgende içeride, dik üçgende hipotenüsün orta noktasında, geniş üçgende dışarıdadır. I ile O’nun eş uzaklık tanımlarını karşılaştır: I’dan kenarlara dik uzaklıklar, O’dan köşelere uzaklıklar eşittir. Bir noktaya “merkez” denmesi bu iki özelliği birlikte taşıdığını söylemez.",
        ],
      },
      {
        title: "Simetri ne zaman çizgileri ve merkezleri birleştirir?",
        paragraphs: [
          "AB=AC olan ikizkenar üçgende A’dan BC tabanına çizilen açıortay, kenarortay ve yükseklik aynı doğru parçasıdır. Bu doğru aynı zamanda BC’nin orta dikmesi üzerindedir. İki küçük üçgen KAK eşliğiyle eş olur; eş parçalar ve diklik buradan gerekçelendirilebilir.",
          "Eşkenar üçgende bütün yükseklik, kenarortay ve açıortay doğruları aynı üç simetri doğrusu olduğundan I,G,H,O tek noktada birleşir. Kenarı a olan eşkenarda yükseklik a√3/2’dir; ağırlık merkezi oranından R=2h/3 ve r=h/3 çıkar. Bu birleşmeyi her üçgene genelleme.",
        ],
      },
      {
        title: "Merkez seçerken hangi bilgiye ihtiyacın var?",
        paragraphs: [
          "“İki eş açı” verisinden iç açıortaya; “karşı kenar eş iki parça” verisinden kenarortaya; “köşeden90°” verisinden yüksekliğe; “orta noktadan90°” verisinden orta dikmeye yönel. Bir merkez sorusunda önce hangi doğruların kesiştiğini adlandır.",
          "Sonra oranı veya eş uzaklığı uygula ve modelde kontrol et: G için2:1, I için kenarlara eş dik uzaklık, O için köşelere eş uzaklık, H için yüksekliklerin dikliği. Etkileşimli şekli değiştirirken genel üçgendeki bu görev farklarını izle; görseldeki tek bir özel duruma dayanarak kural çıkarma.",
        ],
      },
    ],
    examples: [
      {
        title: "İç açıortayla tabanı paylaştır",
        prompt:
          "ABC’de AB=8, AC=12 ve BC=15 cm. AD iç açıortay ve D∈BC ise BD ve DC kaç cm’dir?",
        strategy: "Karşı kenarı komşu kenarların oranıyla paylaş.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "BD/DC=AB/AC=8/12=2/3; BD=2t,DC=3t yazılır.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "BD+DC=BC olduğundan5t=15 ve t=3 bulunur.",
          },
          {
            label: "Sonucu denetle",
            explanation: "BD=6,DC=9 cm olur;6/9=8/12 eşitliği sağlanır.",
          },
        ],
        answer: "BD=6 cm, DC=9 cm",
        check: "6+9=15; hem bütün hem oran doğru.",
        pitfall: "Açı iki eş parçaya ayrıldı diye BC’yi7,5 ve7,5 bölme.",
      },
      {
        title: "Ağırlık merkezi oranını ters çevirme",
        prompt:
          "ABC’de AM kenarortay, G ağırlık merkezi ve AG=10 cm. GM ile AM kaç cm’dir?",
        strategy: "Köşeye yakın parçanın iki pay olduğunu kullan.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "AG:GM=2:1 olduğundan AG=2t ve GM=t yazılır.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "2t=10’dan t=5 cm bulunur.",
          },
          {
            label: "Sonucu denetle",
            explanation: "GM=5 ve AM=AG+GM=15 cm olur.",
          },
        ],
        answer: "GM=5 cm, AM=15 cm",
        check: "AG/AM=10/15=2/3; GM/AM=1/3.",
        pitfall: "10’u üçe bölmek AG’yi bütün kenarortay sanır.",
      },
      {
        title: "İç merkez açısını üçgenden çıkar",
        prompt:
          "ABC’de A=68° ve I iç açıortayların kesişimi. ∠BIC kaç derecedir?",
        strategy: "BIC üçgeninin B ve C açılarının toplamını bul.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "B+C=180−68=112°; iç açıortaylar BIC içindeki açıları B/2 ve C/2 yapar.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "Bu iki küçük açının toplamı112/2=56° olur.",
          },
          {
            label: "Sonucu denetle",
            explanation: "BIC açısı180−56=124°; aynı sonuç90+68/2 ile bulunur.",
          },
        ],
        answer: "124°",
        check: "124+56=180; iç merkezdeki açı90°’den büyüktür.",
        pitfall: "90−A/2=56° dış teğet merkezine ait başka ilişkidir.",
      },
      {
        title: "Kenarortay uzunluğunu bağımsız denetle",
        prompt:
          "ABC’de AB=5, AC=7, BC=8 cm ve M,BC’nin orta noktası. AM kaç cm’dir?",
        strategy: "Kenarortay formülünde karşı kenarı a=8 seç.",
        steps: [
          {
            label: "Veriyi kur",
            explanation: "a=8,b=7,c=5 yaz;4AM²=2·49+2·25−64 olur.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "4AM²=84 olduğundan AM²=21 bulunur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "AM=√21 cm; BM=MC=4 ve komşu üçgenlerde üçgen eşitsizlikleri sağlanır.",
          },
        ],
        answer: "√21 cm",
        check:
          "5 ile√21 ve4;7 ile√21 ve4 iki gerçek üçgen oluşturur. Koordinat denetiminde B=(0,0),C=(8,0),A=(5/2,5√3/2) ve M=(4,0) için AM²=21 olur.",
        pitfall:
          "AM’yi yüksekliğe eşitleyip5²−4² almak genel üçgende geçersizdir.",
      },
    ],
    recall: [
      {
        prompt: "Açıortay, kenarortay ve yükseklik genel üçgende aynı mıdır?",
        answer:
          "Hayır. Sırasıyla açıyı eş böler, karşı kenarı eş böler, karşı kenarın doğrusuna dik iner. İkizkenarda tepeye ait olanlar çakışabilir.",
      },
      {
        prompt:
          "İç merkez ile çevrel merkezin eş uzaklıkları arasındaki fark nedir?",
        answer:
          "İç merkez I’nın kenarlara dik uzaklıkları eşit; çevrel merkez O’nun köşelere uzaklıkları eşittir.",
      },
      {
        prompt: "G ağırlık merkezi, AM kenarortay üzerindeyse oran nedir?",
        answer: "AG:GM=2:1; AG=2AM/3,GM=AM/3. Uzun parça köşeye yakındır.",
      },
      {
        prompt: "Dış açıortayda BC bütününü bulurken neden fark kullanılır?",
        answer:
          "Kesişim E,BC’nin uzantısındadır; B ve C’ye uzaklıkların farkı BC’dir. İç açıortayda D içeride olduğundan BD+DC=BC olur.",
      },
      {
        prompt: "Geniş açılı üçgende I,G,H,O’nun konumları nasıldır?",
        answer: "I ve G içeridedir; H ve O dışarıdadır.",
      },
      {
        prompt: "Eşkenar üçgende bütün merkezler neden birleşir?",
        answer:
          "Simetri doğruları açıortay,kenarortay,yükseklik ve orta dikme görevlerini aynı anda üstlenir.",
      },
    ],
    items: [
      {
        prompt:
          "ABC’de AB=6,AC=9 ve BC=10 cm. AD iç açıortay,D∈BC. BD kaç cm’dir?",
        options: ["4", "5", "6", "20/3", "3"],
        knowledge: ["İç açıortay teoremi BD/DC=AB/AC."],
        strategy: "BC’yi2:3 oranında paylaştır.",
        steps: [
          "BD/DC=6/9=2/3 yaz.",
          "BD=2t,DC=3t ve5t=10 kur.",
          "t=2’den BD=4 cm bul.",
        ],
        optionReasons: [
          "4,toplamın2/5’idir ve4/6=6/9.",
          "5,tabanı eş böler; açıortay genelde eş bölmez.",
          "6,DC’nin uzunluğudur.",
          "20/3,parça/bütün oranını2/3 sanır.",
          "3,kenar farkını BD sanır.",
        ],
        commonError: "Eş açının karşı kenarda eş parçalar verdiğini varsaymak.",
        check: "DC=6;4+6=10 ve4/6=2/3.",
      },
      {
        prompt:
          "ABC’de AM kenarortay,G ağırlık merkezi ve AM=18 cm. AG kaç cm’dir?",
        options: ["12", "6", "9", "27", "18"],
        knowledge: ["Ağırlık merkezi kenarortayı köşeden2:1 oranında böler."],
        strategy: "Bütün kenarortayın2/3’ünü al.",
        steps: [
          "AM=18’i bütün uzunluk olarak seç.",
          "AG=2AM/3 yaz.",
          "AG=12 cm ve GM=6 cm bul.",
        ],
        optionReasons: [
          "12,18’in2/3’üdür.",
          "6,GM’nin uzunluğudur.",
          "9,orta nokta gibi1:1 bölme yapar.",
          "27,verilen bütünü yanlışlıkla uzun parça kabul eder.",
          "18,AG’yi bütün kenarortaya eşitler.",
        ],
        commonError: "Uzun parçanın hangi tarafta olduğunu karıştırmak.",
        check: "12:6=2:1 ve12+6=18.",
      },
      {
        prompt:
          "ABC’nin alanı48 cm². M,BC’nin orta noktası; AM kenarortay. ABM üçgeninin alanı kaç cm²’dir?",
        options: ["24", "16", "12", "32", "48"],
        knowledge: [
          "Ortak yüksekliğe sahip üçgenlerin alanları tabanlarıyla orantılıdır.",
        ],
        strategy: "BM=MC ve ortak A yüksekliğini kullan.",
        steps: [
          "M orta nokta olduğu için BM=MC yaz.",
          "ABM ve ACM’nin yükseklikleri aynıdır; alanları eşittir.",
          "Toplam48 olduğundan her bir alan24 cm²’dir.",
        ],
        optionReasons: [
          "24,48’in yarısıdır.",
          "16,üç eş parça varmış gibi böler.",
          "12,dörde bölme yapar; yalnız bir kenarortay vardır.",
          "32,alanları2:1 varsayar;2:1 G’nin uzunluk oranıdır.",
          "48,ABM’yi tüm üçgen sanır.",
        ],
        commonError: "Ağırlık merkezi2:1 oranını her alana taşımak.",
        check: "24+24=48; taban oranı1:1’dir.",
      },
      {
        prompt:
          "ABC’de A=80°. I,üç iç açıortayın kesişimidir. ∠BIC kaç derecedir?",
        options: ["130", "50", "100", "140", "40"],
        knowledge: ["İç merkezde ∠BIC=90°+A/2."],
        strategy: "B ve C’nin yarım açılarının toplamından ilerle.",
        steps: [
          "B+C=180−80=100° hesapla.",
          "BIC üçgenindeki B ve C açıları toplamı100/2=50° olur.",
          "BIC=180−50=130° bul.",
        ],
        optionReasons: [
          "130=90+80/2; iç merkez açısıdır.",
          "50,iki yarım açının toplamı veya dış merkez ilişkisidir.",
          "100,B+C toplamıdır.",
          "140,80’in yarısını yanlışlıkla50 alır.",
          "40,yalnız A/2’dir.",
        ],
        commonError:
          "İç merkezle dış teğet merkezinin artı–eksi işaretlerini değiştirmek.",
        check: "130+50=180 ve130>90.",
      },
      {
        prompt:
          "Bir ABC üçgeninde I’dan AB,BC ve CA doğrularına indirilen dikmelerin uzunlukları eşittir ve I üçgenin içindedir. Bu noktanın adı hangisidir?",
        options: [
          "İç teğet çemberin merkezi",
          "Ağırlık merkezi",
          "Diklik merkezi",
          "Çevrel çemberin merkezi",
          "Herhangi bir kenarın orta noktası",
        ],
        knowledge: ["İç merkez kenarlara eş dik uzaklıktadır."],
        strategy: "Eşitliğin köşelere değil kenarlara olduğunu ayır.",
        steps: [
          "Verilen uzaklıkların üç kenara dik olduğunu belirle.",
          "I içeride ve üç kenara eş uzaklıkta olduğundan bu yarıçapla üç kenara teğet çember çizilebilir.",
          "I’yı iç teğet çemberin merkezi olarak adlandır.",
        ],
        optionReasons: [
          "Üç kenara eş dik uzaklık bu merkezin tanımlayıcı özelliğidir.",
          "G kenarortay kesişimidir; genel durumda kenarlara eş uzak değildir.",
          "H yükseklik kesişimidir; bu uzaklık koşulunu taşıması gerekmez.",
          "O köşelere eş uzaklıktadır.",
          "Bir kenar orta noktası genel durumda diğer kenarlara eş uzak değildir.",
        ],
        commonError: "Kenar uzaklığıyla köşe uzaklığını aynı koşul sanmak.",
        check:
          "Yarıçaplar kenarlara dik iner; köşelere çizilen eğik parçalar bu yarıçaplar değildir.",
      },
      {
        prompt:
          "ABC üçgeninin A açısı90° ve BC=26 cm. O çevrel çemberin merkezi ise OA kaç cm’dir?",
        options: ["13", "26", "6,5", "13√2", "19,5"],
        knowledge: ["Dik üçgende çevrel merkez hipotenüsün orta noktasıdır."],
        strategy: "BC’nin yarısını çevrel yarıçap seç.",
        steps: [
          "A=90° olduğundan BC hipotenüstür.",
          "O,BC’nin orta noktasıdır; OB=OC=26/2=13.",
          "OA=OB=OC olduğundan OA=13 cm bul.",
        ],
        optionReasons: [
          "13,çevrel yarıçap ve hipotenüsün yarısıdır.",
          "26 çapın tamamıdır.",
          "6,5 yarıçapı tekrar yarıya böler.",
          "Hipotenüs26 olduğundan çevrel yarıçap her durumda13’tür;13√2 bu sabit özelliğe aykırıdır.",
          "19,5,hipotenüsün3/4’ünü alır; merkez orta noktadır.",
        ],
        commonError: "Çapla yarıçapı veya O ile G’yi karıştırmak.",
        check: "O’nun üç köşeye uzaklığı13’tür; hipotenüs çapı26 olur.",
      },
      {
        prompt:
          "ABC geniş açılı bir üçgendir. Ağırlık merkezi G, iç merkez I, diklik merkezi H ve çevrel merkez O için hangisi doğrudur?",
        options: [
          "G ve I içeride; H ve O dışarıdadır.",
          "Dördü de içeridedir.",
          "G dışarıda; I,H,O içeridedir.",
          "G ve H içeride; I ve O dışarıdadır.",
          "Dördü de aynı noktadır.",
        ],
        knowledge: [
          "G ve I her gerçek üçgende içeridedir.",
          "H ile O’nun konumu açı türüne bağlıdır.",
        ],
        strategy: "Her merkezin hangi doğruların kesişimi olduğunu hatırla.",
        steps: [
          "Kenarortaylar ve iç açıortaylar iç bölgedeki G ve I’da kesişir.",
          "Geniş üçgende yükseklik uzantıları H’de; orta dikmeler O’da dışarıda birleşir.",
          "İç/dış sırasını G,I içeride;H,O dışarıda olarak seç.",
        ],
        optionReasons: [
          "Dört merkezin genel konumları doğru ayrılmıştır.",
          "H ve O geniş üçgende dışarıdadır.",
          "G hiçbir gerçek üçgende dışarıda değildir.",
          "I içeridedir; H geniş üçgende dışarıdadır.",
          "Dört merkez eşkenar gibi özel durumda birleşir; geniş üçgen eşkenar olamaz.",
        ],
        commonError:
          "Etkileşimli şeklin dar üçgen durumunu bütün üçgenlere genellemek.",
        check:
          "Geniş açı90°’den büyüktür; dar üçgendeki iç H/O konumu korunmaz.",
      },
      {
        prompt:
          "ABC’de AB=AC ve M,BC’nin orta noktasıdır. A’dan çizilen AM için hangisi zorunludur?",
        options: [
          "AM hem kenarortay,hem açıortay,hem yüksekliktir.",
          "AM yalnızca kenarortay olabilir; açıortay olamaz.",
          "AM,BC’ye paraleldir.",
          "AM uzunluğu her zaman BC’ye eşittir.",
          "A açısı mutlaka60°’dir.",
        ],
        knowledge: [
          "İkizkenarda tepeye ait kenarortay iki eş üçgen oluşturur.",
        ],
        strategy: "ABM ile ACM’yi KKK ile eşleştir.",
        steps: [
          "AB=AC, BM=MC ve AM ortak olduğundan küçük üçgenler eştir.",
          "A’daki iki açı eş; M’deki komşu iki açı eş olur.",
          "M’deki açıların toplamı180° olduğundan her biri90°; AM üç görevi taşır.",
        ],
        optionReasons: [
          "Eş küçük üçgenler hem açıortayı hem dikliği kanıtlar.",
          "KKK eşliği açıortaylığı da zorunlu kılar.",
          "AM,BC’yi M’de keser ve ona diktir; paralel değildir.",
          "Kenar uzunlukları bu eşitliği zorunlu kılmaz.",
          "İkizkenar her zaman eşkenar değildir; A60° olmak zorunda değildir.",
        ],
        commonError: "İkizkenarla eşkenarı aynı koşul sanmak.",
        check: "Örneğin5–5–6 üçgeninde AM=4’tür; BC6 ve A açısı60° değildir.",
      },
      {
        prompt:
          "ABC’de AB=6 cm,AC=9 cm,BC=5 cm. A’daki dış açıortay BC doğrusunu E’de kesiyor. B ve C aynı ışın üzerinde E’den bu sırayla görülüyor; yani noktalar E–B–C sırasındadır. BE kaç cm’dir?",
        options: ["10", "2", "15", "5", "20/3"],
        knowledge: [
          "Dış açıortayda BE/CE=AB/AC.",
          "E–B–C sırası CE=BE+BC verir.",
        ],
        strategy: "Nokta sırasını kullanarak toplamı dış uzaklıkta yaz.",
        steps: [
          "BE=x>0 seç; CE=x+5 olur.",
          "x/(x+5)=6/9=2/3 kur;3x=2x+10.",
          "x=10 cm bul.",
        ],
        optionReasons: [
          "10/15=2/3; sıra ve oran birlikte sağlanır.",
          "2,iç açıortayda taban paylaşımı sonucu olur; E içeride değildir.",
          "15,CE’nin uzunluğudur.",
          "5,BC’yi BE’ye eşitler; oran sağlamaz.",
          "20/3,bütünü parça oranıyla yanlış çarpar.",
        ],
        commonError: "Dış açıortayda BE+CE=BC yazmak.",
        check: "CE=15 ve CE−BE=5=BC; iki kontrol de doğrudur.",
      },
      {
        prompt:
          "ABC’de AB=AC=5 cm,BC=6 cm. AD,A köşesinin iç açıortayı ve D∈BC ise AD kaç cm’dir?",
        options: ["4", "3", "√34", "5", "2√7"],
        knowledge: [
          "İkizkenarda tepe açıortayı tabanı eş böler ve ona dik iner.",
        ],
        strategy: "Tabanı yarıya bölüp dik üçgende Pisagor kullan.",
        steps: [
          "BD=DC=3 cm ve AD⊥BC olduğunu belirt.",
          "ABD’de AD²+3²=5² yaz.",
          "AD²=16’dan AD=4 cm bul.",
        ],
        optionReasons: [
          "4²+3²=5²; doğrudur.",
          "3,tabanın yarısıdır.",
          "√34,5²+3² toplayıp hipotenüsü yanlış seçer.",
          "5,eş kenar uzunluğudur; yükseklik değildir.",
          "2√7’nin karesi28; gerekli16 değildir.",
        ],
        commonError:
          "Genel üçgende de açıortayı dik varsaymak; burada dikliği AB=AC koşulu sağlar.",
        check: "Açıortay uzunluğu bağıntısı da AD²=5·5−3·3=16 verir.",
      },
    ],
  },
];

const revisions042: Readonly<Record<string, (typeof triangleAngles042 & { questions: Question[] }) | undefined>> = {
  "tyt-geo-ucgende-acilar-031": { ...triangleAngles042, questions: triangleAnglesPractice042 },
  "tyt-geo-ucgen-esitsizligi-031": { ...triangleSides042, questions: triangleSidesPractice042 },
};

export const geometryFoundation031Topics: Record<string, string> =
  Object.fromEntries(packs031.map((p) => [p.id, `topic-${p.id}`]));
export const geometryFoundation031Guides: LessonGuide[] = packs031.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: [...p.sections, ...(revisions042[p.id]?.sections ?? [])],
  examples: [...p.examples, ...(revisions042[p.id]?.examples ?? [])],
  recall: [...p.recall, ...(revisions042[p.id]?.recall ?? [])],
  source: revisions042[p.id] ? `${p.source} ${revisions042[p.id]!.source}.` : p.source,
}));
export const geometryFoundation031Lessons: Lesson[] = packs031.map(
  (p, family) => ({
    id: p.id,
    subjectId: "tyt-geometri",
    title: txt(p.title),
    minutes: p.minutes,
    objectives: p.objectives.map(txt),
    source: txt(geometryFoundation031Guides[family].source),
    tags: ["temel-geometri", "kaynakli-anlatim", "Özgün öğretim soruları"],
    body: geometryFoundation031Guides[family].sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: [...p.items.map((item, index): Question => {
      // Keep each reason attached to its option when distributing the answer letters.
      const shift = (2 * index + family + 1) % 5;
      const order = item.options.map((_, j) => (j + shift) % 5);
      const guidance: QuestionGuidance = {
        knowledge: item.knowledge,
        strategy: item.strategy,
        steps: item.steps,
        optionReasons: order.map((j) => item.optionReasons[j]),
        commonError: item.commonError,
        check: item.check,
      };
      return {
        id: `f031-${p.id}-${index + 1}`,
        prompt: txt(item.prompt),
        options: order.map((j) => txt(item.options[j])),
        answer: order.indexOf(0),
        hint: txt(item.strategy),
        explanation: txt(item.steps.join(" ") + " Denetim: " + item.check),
        skill: p.id,
        guidance,
      };
    }), ...(revisions042[p.id]?.questions ?? [])],
  }),
);
interface FoundationQuickSheet031 {
  sections: CheatSheet["sections"];
  cautions: string[];
  exampleIndexes: number[];
  recallIndexes: number[];
}
// Separate source-derived revision cards: the full explanations stay in the guides.
const quickSheets031: Record<string, FoundationQuickSheet031> = {
  "tyt-geo-temel-acilar-031": {
    sections: [
      {
        title: "Şeklin dili ve açı türü",
        text: [
          "∠ABC’nin köşesi B; kolları BA ve BC ışınlarıdır. Doğru iki yönde, ışın bir başlangıçtan tek yönde uzar; parça iki uçla sınırlıdır.",
          "Dar:0°<α<90°; dik:90°; geniş:90°<α<180°; doğru:180°; tam:360°. Kolun çizilen uzunluğu açı ölçüsünü değiştirmez.",
        ],
      },
      {
        title: "Toplamları ayır",
        text: [
          "Tümler:α+β=90°. Bütünler:α+β=180°. Açılar farklı köşelerde de tümler veya bütünler olabilir.",
          "Bir noktanın çevresini boşluk/örtüşme olmadan kaplayan açıların toplamı360°’dir. Komşu olmak tek başına180° toplamını vermez.",
        ],
      },
      {
        title: "İki doğrunun kesişimi",
        text: [
          "Ters açılar eşittir. Doğrusal çiftte ortak olmayan kollar zıt ışındır; komşu iki açı toplam180° olur.",
          "Bir açı α ise dört açı sırasıyla α,180°−α,α,180°−α’dır. Ters açı eşitliği paralellik gerektirmez.",
        ],
      },
      {
        title: "Paralel doğrular ve kesen",
        text: [
          "d∥e ise yöndeş, iç ters ve dış ters açılar eşittir. Aynı yandaki iç açılar toplam180°’dir.",
          "Önce iç/dış ve aynı/karşı yan konumunu belirle. Ayrı iki kesişimde uygun yöndeş açıların eşitliği ters yönde paralelliği de kanıtlar.",
        ],
      },
      {
        title: "Açıortay ve kısa çözüm yolu",
        text: [
          "Açıortay α açısını α/2 ve α/2 böler. Komşu bütünler iki açının iç açıortayları arasındaki açı90°’dir.",
          "Kırık çizgide gerekirse kırılma noktasından verilen paralellere paralel yardımcı çizgi geçir. Denklemde x’i bulunca sorulan açı ifadesine geri koy.",
        ],
      },
    ],
    cautions: [
      "Paralellik veya uygun konum verilmeden farklı kesişimlerde açı eşitleme.",
      "Görünüşten diklik, eş açı veya ölçülü çizim varsayma.",
      "x değişkeni her zaman istenen açı değildir; pozitiflik ve dar/geniş koşulunu kontrol et.",
    ],
    exampleIndexes: [0, 1],
    recallIndexes: [0, 1, 2],
  },
  "tyt-geo-ucgende-acilar-031": {
    sections: [
      {
        title: "İç ve dış açı toplamı",
        text: [
          "Gerçek üçgen:doğrusal olmayan üç köşe; her iç açı0° ile180° arasındadır. A+B+C=180°.",
          "Komşu dış açı=180°−iç açı=uzak iki iç açının toplamı. Her köşeden aynı dolaşım yönünde birer dış açı seçilirse toplam360°’dir.",
        ],
      },
      {
        title: "İkizkenar ve eşkenar",
        text: [
          "AB=AC⇔B=C. Tepe A=α ise B=C=(180°−α)/2. Taban açısı β ise tepe180°−2β.",
          "Eşkenarda A=B=C=60°. İkizkenarın taban açıları dardır; tepe açısı dar, dik veya geniş olabilir.",
        ],
      },
      {
        title: "İç açıortayların açısı",
        text: [
          "B ve C iç açıortayları I’da kesişirse BIC küçük üçgeninde B açısı B/2, C açısı C/2’dir.",
          "∠BIC=180°−(B+C)/2=90°+A/2. Yarım alınan A, açıortayları seçilmeyen köşenin açısıdır.",
        ],
      },
      {
        title: "Yükseklik ile açıortay",
        text: [
          "AB=AC ise A’dan BC tabanına çizilen yükseklik aynı zamanda kenarortay ve iç açıortaydır. Genel üçgende bu üç görev farklıdır.",
          "A’dan BC doğrusuna indirilen yükseklik ile A’nın iç açıortayı arasındaki küçük açı |B−C|/2’dir; hangi ışının dik, hangisinin eş açı kurduğunu ayır.",
        ],
      },
      {
        title: "Birleşik şekilde üçgeni seç",
        text: [
          "D,BC’nin içindeyse ABD ve ACD ayrı üçgenlerdir. ∠ADB+∠ADC=180°; birindeki D açısını diğerine eşit taşıma.",
          "Önce büyük üçgendeki toplamı bul; sonra bölünen açıyı çıkar; son olarak ilgili küçük üçgende180° toplamını uygula.",
        ],
      },
    ],
    cautions: [
      "Eş kenarın yanındaki değil karşısındaki açıları eşitle.",
      "Bir köşeden birden fazla dış açı toplama;360° kuralının seçim koşulunu koru.",
      "Açıortay ve yükseklik aynı çizgi ancak gerekçeli özel koşulda olur.",
    ],
    exampleIndexes: [0, 1],
    recallIndexes: [0, 1, 2],
  },
  "tyt-geo-ucgen-esitsizligi-031": {
    sections: [
      {
        title: "Önce gerçek üçgen var mı?",
        text: [
          "Pozitif a,b,c için |a−b|<c<a+b. Eşitlikte noktalar doğrusal olur; iç bölgesi olan üçgen oluşmaz.",
          "Kenarlar sıralıysa en büyük kenar<diğer ikisinin toplamı yeterlidir. Pozitiflik şartını unutma.",
        ],
      },
      {
        title: "Açık aralık ve tam sayı",
        text: [
          "5<x<13 için tam sayılar6,…,12; adet12−6+1=7. Açık sınırlar alınmaz.",
          "3<x<9 gerçek aralığında en küçük/en büyük değer yoktur. x tam sayıysa en küçük4, en büyük8’dir.",
        ],
      },
      {
        title: "Birden çok kısıt",
        text: [
          "Ortak kenar her iki üçgenin aralığında olmalı:kesişim alınır. Alt sınırların büyüğünü, üst sınırların küçüğünü seç.",
          "Çevre veya başka koşul da aynı anda uygulanır. Örneğin2<x<12 ve x<8 birlikte2<x<8 verir. Boş kesişimde uygun şekil yoktur.",
        ],
      },
      {
        title: "Açı–kenar sırası",
        text: [
          "ABC’de a=BC,b=CA,c=AB. Aynı üçgende A>B⇔a>b; A=B⇔a=b.",
          "Açının karşı kenarı o köşeye değmeyen kenardır. Farklı üçgenlerde eş açı, eş uzunluk garantisi vermez.",
        ],
      },
      {
        title: "Dar, dik, geniş sınıflaması",
        text: [
          "Önce üçgeni doğrula; sonra a≤b≤c seç. c²=a²+b² ise dik; c²<a²+b² ise dar; c²>a²+b² ise geniş açılıdır.",
          "En büyük kenarın karşısındaki en büyük açı sınanır. Üçgen oluşturmayan1,2,4 üçlüsüne geniş açılı üçgen denemez.",
        ],
      },
    ],
    cautions: [
      "Yalnız bir rastgele toplam eşitsizliğini denetlemek yeterli değildir.",
      "Alt/üst sınırı dahil etmek ve tam sayı sayımında+1’i unutmak farklı hatalardır.",
      "Ek kısıtları birleştirmek için birleşim değil kesişim kullan.",
    ],
    exampleIndexes: [0, 1],
    recallIndexes: [0, 1, 2],
  },
  "tyt-geo-dik-ucgen-031": {
    sections: [
      {
        title: "Hipotenüs ve Pisagor",
        text: [
          "A=90° ise BC hipotenüstür; AB²+AC²=BC². Eksik dik kenar için kareler çıkarılır, uzunluk için pozitif kök alınır.",
          "Geçerli üçgende en büyük kenarın karesi diğer iki karenin toplamına eşitse üçgen diktir. Tanıdık aileler:3–4–5,5–12–13,7–24–25,8–15–17 ve katları.",
        ],
      },
      {
        title: "Özel açıların karşı kenarları",
        text: [
          "45°–45°–90°:dik kenarlar a,a; hipotenüs a√2.",
          "30°–60°–90°:30° karşısı a,60° karşısı a√3,hipotenüs2a. Açının komşu kenarıyla karşı kenarını karıştırma.",
        ],
      },
      {
        title: "Öklid: önce modeli yaz",
        text: [
          "A=90°,H∈BC,AH⊥BC; BH=p>0,HC=q>0,BC=c=p+q,AH=h.",
          "AB²=c·p; AC²=c·q; h²=pq. AB’nin hipotenüsteki izdüşümü BH,AC’ninki HC’dir.",
        ],
      },
      {
        title: "Alanla yükseklik kontrolü",
        text: [
          "Alan=AB·AC/2=BC·AH/2. Buradan AB·AC=BC·AH ve AH=AB·AC/BC.",
          "Öklid hesabını alanla denetle. Hipotenüs iki dik kenardan da uzundur; p+q hipotenüsü vermelidir.",
        ],
      },
      {
        title: "Kenarortay yüksekliğin aynısı değildir",
        text: [
          "Dik köşeden hipotenüsün orta noktasına çizilen kenarortay hipotenüsün yarısıdır. Genel dik üçgende hipotenüs yüksekliğiyle farklıdır.",
          "Uzunluk cm, karelerin alanı cm² ile ifade edilir. Duvar–zemin gibi uygulamalarda dikliğin verildiğini belirt; çizimden özel açı varsayma.",
        ],
      },
      {
        title: "Eğim ile eğik yol ayrı büyüklüklerdir",
        figureTitle: "Dik yolda eğim ve uzunluk",
        text: ["Eğim = dikey fark / yatay ilerleme. 5 m yükselme ve 12 m yatay ilerleme eğimi 5/12 yapar. Eğik yol 13 m, sinüs 5/13."],
      },
    ],
    cautions: [
      "Sıradan üçgendeki herhangi bir yükseklik için h²=pq kullanılmaz; ana üçgenin dikliği gerekir.",
      "Hipotenüsü ararken kareler toplanır; dik kenarı ararken hipotenüsün karesinden çıkarılır.",
      "30° karşısı en kısa,90° karşısı en uzun kenardır.",
    ],
    exampleIndexes: [0, 1],
    recallIndexes: [0, 1, 2],
  },
  "tyt-geo-eslik-benzerlik-031": {
    sections: [
      {
        title: "Eşleme ve ölçeğin yönü",
        text: [
          "ABC∼DEF demek A↔D,B↔E,C↔F demektir:AB↔DE,AC↔DF,BC↔EF.",
          "Bütün oranları aynı yönde kur. Benzerlik aynı biçim; eşlik aynı biçim ve aynı büyüklüktür. Eşlik,benzerlik oranının1 olduğu durumdur.",
        ],
      },
      {
        title: "Eşlik için yeterli koşullar",
        text: [
          "KKK:üç karşılıklı kenar eş. KAK:iki karşılıklı kenar ve ARALARINDAKİ açı eş. AKA:iki karşılıklı açı ve aralarındaki kenar eş.",
          "Dik üçgende hipotenüs+bir dik kenar eşliği yeterlidir. Yalnız üç açı eşliği veya rastgele iki kenar+aralarında olmayan açı genel olarak eşliği belirlemez.",
        ],
      },
      {
        title: "Benzerlik için yeterli koşullar",
        text: [
          "AA:iki karşılıklı açı eş. KAK:iki karşılıklı kenar aynı oranda ve aralarındaki açılar eş. KKK:üç karşılıklı kenar oranı aynı.",
          "Önce benzerliği kanıtla,sonra oran yaz. Kum saati görünümünde ters açı yalnız bir açı çifti verir; ikinci çift için gerekçe gerekir.",
        ],
      },
      {
        title: "Paralel kesit,orta taban,Thales",
        text: [
          "D∈AB,E∈AC iç noktaları ve DE∥BC ise AD/AB=AE/AC=DE/BC=t; AD/DB=AE/EC=t/(1−t).",
          "D,E orta noktaysa t=1/2,DE=BC/2. En az üç paralelin iki kesende ayırdığı karşılıklı aralıklar orantılıdır; aralık/bütün ayrımını koru.",
        ],
      },
      {
        title: "Uzunluk k,alan k²",
        text: [
          "Yeni/eski uzunluk oranı k>0 ise kenar,çevre,yükseklik,kenarortay,açıortay oranı k; alan oranı k².",
          "Paralel kesitte üst küçük üçgenin alanı t², kalan yamuğun alanı1−t² katıdır. Alan oranı9/25 ise aynı yöndeki uzunluk oranı3/5’tir.",
        ],
      },
      {
        title: "Üç eş yükseklikli şerit",
        figureTitle: "Eş yükseklik, farklı alan",
        text: ["Tepeden alan payları 1/9 → 4/9 → 9/9 birikir. Ardışık farklar 1/9, 3/9 ve 5/9. Toplam alan 81 ise şeritler 9, 27 ve 45 birim²."],
      },
    ],
    cautions: [
      "Parça/parça AD/DB ile parça/bütün AD/AB aynı oran değildir.",
      "Alanı uzunluk oranıyla çarpma;k² gerekir.",
      "Gölge modeli aynı anda,düz zemin,dik nesne ve paralel ışın koşullarına dayanır.",
    ],
    exampleIndexes: [0, 1, 3],
    recallIndexes: [0, 1, 2],
  },
  "tyt-geo-ucgen-merkezleri-031": {
    sections: [
      {
        title: "Dört ayrı görev",
        text: [
          "Kenarortay:köşeden karşı kenarın orta noktasına. Açıortay:köşedeki açıyı ikiye. Yükseklik:köşeden karşı kenarın doğrusuna dik.",
          "Orta dikme:bir kenarın orta noktasından ona dik geçen doğru; genel durumda karşı köşeden geçmez.",
        ],
      },
      {
        title: "İç ve dış açıortay",
        text: [
          "AD iç açıortay,D∈BC; AB=c,AC=b,BD=m,DC=n ise m/n=c/b ve AD²=bc−mn. Alan(ABD)/Alan(ACD)=m/n.",
          "Dış açıortay BC’yi E’de keserse E uzantıdadır,BE/CE=AB/AC; büyük–küçük uzaklık farkı BC’dir. AB=AC ise dış açıortay BC’ye paraleldir.",
          "İç merkez I için ∠BIC=90°+A/2. A karşısındaki dış teğet merkez Iₐ için ∠BIₐC=90°−A/2.",
        ],
      },
      {
        title: "Kenarortay ve ağırlık merkezi",
        text: [
          "M,BC’nin ortası ve G ağırlık merkezi:AG:GM=2:1,AG=2AM/3,GM=AM/3. Bir kenarortay iki eş alan;üçü birlikte altı eş alan verir.",
          "BC=a,CA=b,AB=c için4mₐ²=2b²+2c²−a². Altı küçük üçgenin alanları eşit diye kenarları eşit değildir.",
        ],
      },
      {
        title: "Merkezlerin eş uzaklıkları ve konumu",
        text: [
          "I:iç açıortaylar;kenarlara eş dik uzaklık r. O:orta dikmeler;köşelere eş uzaklık R. H:yükseklikler. G:kenarortaylar.",
          "I ve G her zaman içeride. H ve O dar üçgende içeride,genişte dışarıda;dik üçgende H dik köşede,O hipotenüsün ortasında.",
        ],
      },
      {
        title: "Özel üçgen ve ortak alan",
        text: [
          "AB=AC ise A’dan tabana çizilen açıortay,kenarortay,yükseklik çakışır. Eşkenarda I,G,H,O tek noktadır.",
          "Eşkenarda h=a√3/2,R=2h/3,r=h/3. Dik üçgende hipotenüse ait kenarortay hipotenüsün yarısıdır.",
          "Her üçgende alan=a·hₐ/2=b·hᵦ/2=c·h𝚌/2; büyük kenara ait yükseklik daha kısadır.",
        ],
      },
    ],
    cautions: [
      "Açıortay karşı kenarı her zaman eş bölmez;oran komşu kenarlardan gelir.",
      "2:1 köşeden G’ye ve G’den orta noktaya aittir;taban parçalarının oranı değildir.",
      "I’nın kenarlara,O’nun köşelere eş uzaklığını karıştırma.",
      "Geniş üçgende dışarı çıkan H/O’yu şeklin içine taşıma.",
    ],
    exampleIndexes: [0, 1],
    recallIndexes: [0, 1, 2],
  },
};
export const geometryFoundation031Sheets: CheatSheet[] = packs031.map((p) => {
  const summary = quickSheets031[p.id];
  const revision = revisions042[p.id];
  return {
    topicId: `topic-${p.id}`,
    lessonId: p.id,
    title: p.title,
    subjectId: "tyt-geometri",
    sections: [...summary.sections, ...(revision?.sheet ?? [])],
    examples: [...summary.exampleIndexes.map((index) => p.examples[index]), ...(revision?.examples ?? [])].map((e) => {
      return {
        title: e.title,
        prompt: e.prompt,
        steps: e.steps.map((step) => step.label + ": " + step.explanation),
        answer: e.answer + " " + e.check,
      };
    }),
    cautions: summary.cautions,
    recall: [...summary.recallIndexes.map((index) => p.recall[index]), ...(revision?.recall ?? [])],
    source: revision ? `${p.source} ${revision.source}.` : p.source,
  };
});
