import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
import type { CheatSheet } from "./cheatsheetContent";

interface SolidItem032 extends QuestionGuidance {
  prompt: string;
  options: string[];
}
interface SolidPack032 {
  id: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: SolidItem032[];
  source: string;
}
// Additional independent units; previous IDs, questions and saved progress are untouched.
// Questions are original teaching items, not reproductions of official examination questions.
const solidPacks032: SolidPack032[] = [
  {
    id: "tyt-geo-dik-prizmalar-032",
    title: "Dik prizmalar: açınım, yüzey ve hacim",
    minutes: 48,
    objectives: [
      "Dik prizmanın tabanını, yan yüzünü ve dik yüksekliğini ayır.",
      "Hacim ve alanı açınımdan gerekçelendir; köşe, ayrıt ve yüz sayılarını denetle.",
      "Yüz köşegeni, uzay köşegeni ve yüzey yolunu farklı geometrik koşullarla hesapla.",
      "Ölçek, kapaksız kap ve birleşik cisimde dış sınırı doğru say.",
    ],
    sections: [
      {
        title: "Üç boyutlu cismi iki boyutlu çizimden oku",
        paragraphs: [
          "Bir çokgensel bölgeyi kendi düzlemi dışına, o düzleme dik ve sabit bir uzaklık boyunca taşıdığını düşün. Başlangıç ve bitişteki iki eş çokgen taban; karşılıklı köşeleri birleştiren doğru parçaları yan ayrıt; arada kalan dikdörtgenler yan yüz olur. Bu cisim dik prizmadır. Bir çizimin perspektifte eğik görünmesi, cismin eğik prizma olduğu anlamına gelmez; diklik verilen geometrik koşuldur.",
          "Tabanın kenarı bir boyutlu uzunluk, tabanın kapladığı bölge iki boyutlu alan, cismin içi üç boyutlu hacimdir. Bir yüzün şekli ile cismin adını ayır: üçgen dik prizmanın üçgen tabanları ve dikdörtgen yan yüzleri bulunur. Kesikli çizgi, çoğu zaman arkada kalan ayrıtı gösterir; ayrıtın yok olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Diklik, yükseklik ve düzgünlük ayrı bilgilerdir",
        paragraphs: [
          "Dik prizmada yan ayrıt taban düzlemine diktir ve uzunluğu taban düzlemleri arasındaki uzaklık olan h yüksekliğine eşittir. Bir üçgenin taban alanını hesaplarken kullandığın üçgen yüksekliği ise başka bir uzunluktur. Önce tabandaki alanı, sonra cismin dik yüksekliğini belirle; aynı h harfini ikisi için kullanmak karışıklık yaratır.",
          "Tabanı düzgün çokgen olan dik prizmaya düzgün prizma denir. Her üçgen dik prizmanın tabanı eşkenar değildir; dik olmak yan ayrıtın yönünü, düzgün olmak tabanın kenar ve açılarını ilgilendirir. Kare dik prizmanın yüksekliği kare kenarına eşitse özel olarak küp oluşur. Kare tabanlı her dik prizma küp değildir.",
        ],
      },
      {
        title: "Köşe, ayrıt ve yüzleri sayarak modeli denetle",
        paragraphs: [
          "Tabanı n kenarlı bir dik prizmanın her tabanında n köşe bulunduğundan toplam 2n köşe vardır. İki tabandaki 2n ayrıt ve bunları birleştiren n yan ayrıt toplam 3n ayrıt eder. İki taban ve n yan yüz toplam n+2 yüz verir. Burada n en az 3 olan bir tam sayıdır; silindir için bu çokgen sayımını kullanmayız.",
          "Üçgen prizmada 6 köşe, 9 ayrıt ve 5 yüz; altıgen prizmada 12 köşe, 18 ayrıt ve 8 yüz vardır. Bir sayı verilince diğerlerini denetlemek için önce n değerini bul. Köşe−ayrıt+yüz=2 eşitliği kapalı dışbükey prizmalarda ikinci bir tutarlılık kontrolüdür; bu kontrol, tabanın şeklini tek başına belirlemez.",
        ],
      },
      {
        title: "Hacmi taban alanından kur",
        paragraphs: [
          "Taban alanı B olan dik prizmayı, tabana paralel çok ince eş dilimlerle düşün. Her dilimin kesit alanı B olarak kalır; bu alan dik yükseklik h boyunca biriktiğinde V=B·h olur. B birimi cm², h birimi cm ise hacim cm³ çıkar. Taban çevresini B yerine yazmak bir alanı değil uzunluğu kullanır ve birim kontrolünde açığa çıkar.",
          "Dik üçgen tabanlı bir prizmada önce üçgenin alanını dik kenarların çarpımının yarısı olarak hesapla. Örneğin tabanın dik kenarları 3 ve 4 ise B=6 olur; prizmanın yüksekliği 10 ise V=60 bulunur. Tabanın hipotenüsü 5, bu hacim hesabına gerekli değildir; yan yüz alanında ise çevrenin parçası olarak gerekir.",
        ],
      },
      {
        title: "Açınım yüzey alanını görünür yapar",
        paragraphs: [
          "Yan yüzleri ortak yan ayrıtlarından kesip düzleme açtığında yükseklikleri h olan n dikdörtgeni yan yana elde edersin. Genişliklerinin toplamı taban çevresi p olduğundan yanal alan p·h olur. Kapalı cismin toplam alanı iki eş tabanı da içerir: S=2B+p·h. Bu yanal alan formülü dik prizma içindir; eğik yan ayrıtı her durumda h yerine koyamazsın.",
          "Dikdörtgenler prizmasının ayrıtları a, b, c ise karşılıklı yüzler eş olduğundan S=2(ab+ac+bc), V=abc olur. Açık bir kutuda bulunmayan kapağı sayma; 2B yerine yalnız bir taban alanı kalır. Açınımdaki dikdörtgenlerin yapışma kenarları dış yüzeye yeni alan eklemez. Bir küpün geçerli açınımında altı kare katlanınca her yüzü tam bir kez kapatır; altı kareli her şekil geçerli açınım değildir.",
        ],
      },
      {
        title: "Yüz köşegeni ile cisim köşegenini ayır",
        paragraphs: [
          "Dikdörtgenler prizmasının a ve b ayrıtlı bir yüzünde Pisagor, d_yüz²=a²+b² verir. Karşı köşeleri cismin içinden birleştiren uzay köşegeni bu yüz köşegeni ile c ayrıtının oluşturduğu dik üçgenin hipotenüsüdür: d_uzay²=a²+b²+c². Bir yüzün dışına çıkmayan çizgiye üç ayrıtı birden ekleme.",
          "Küpte bütün ayrıtlar a olduğundan yüz köşegeni a√2, uzay köşegeni a√3, toplam yüzey alanı 6a² ve hacim a³ olur. Yüz köşegeni verildiyse önce a değerini bul; köşegenin kendisini ayrıt sanarak küpünü alma. Uzay köşegeni, bütün yüz köşegenlerinden uzundur; bu karşılaştırma sonucu denetler.",
        ],
      },
      {
        title: "Yüzeydeki en kısa yolu açınımla bul",
        paragraphs: [
          "Cismin içinden gidilebiliyorsa karşı köşeler arasındaki en kısa yol uzay köşegenidir. Yalnız dış yüzey üzerinde yürünebiliyorsa bu doğru parçası yasaktır. Komşu yüzleri düzleme aç; belirlenen açınım üzerindeki en kısa yol düz doğru parçasıdır. Yolu farklı yüz sıralarıyla kuran açınımları karşılaştırmak gerekir.",
          "Ayrıtları a, b, c olan kapalı dikdörtgenler prizmasının karşı köşeleri için yüzey yolu adayları √[(a+b)²+c²], √[(a+c)²+b²] ve √[(b+c)²+a²] olur. Pozitif ayrıtlarla en küçüğünü seç. Örneğin a=2, b=3, c=4 için kareler 41, 45, 53 çıkar; en kısa yüzey yolu √41 olur. İç yol √29 daha kısadır ama yüzey koşulunu sağlamaz.",
        ],
      },
      {
        title: "Kesit, ölçek ve birleşik cisimde sınırı izle",
        paragraphs: [
          "Dik prizmanın tabana paralel kesiti tabana eş bir çokgensel bölgedir; piramitteki gibi küçülmez. Dikdörtgenler prizmasında bir düşey kesitin şekli, kesit düzleminin yönüne bağlıdır. Sadece çizimin görünüşünden kesitin kare olduğunu varsayma. Geometrik modelde kesilen yüzey ile cismin dış yüzeyi farklı alan sorularıdır.",
          "Bütün uzunluklar k>0 katsayısıyla değişirse alanlar k², hacim k³ katına çıkar. Yalnız yüksekliği iki katına çıkarmak ise taban alanını değiştirmez; hacmi ve yanal alanı iki katına çıkarır, toplam yüzey alanını genellikle iki katına çıkarmaz. İki cisim tam bir yüz boyunca yapışırsa hacimleri toplanır; dış yüzey alanından ortak yüz iki kez çıkarılır. Delik açılmış birleşik cisimlerde yeni iç yüzeyleri de ayrıca düşün.",
        ],
      },
    ],
    examples: [
      {
        title: "Üçgen taban, iki farklı yükseklik",
        prompt:
          "Tabanı dik kenarları 3 cm ve 4 cm olan dik üçgen, prizma yüksekliği 10 cm olan kapalı dik prizmanın hacmi ve toplam alanı nedir?",
        strategy:
          "Taban alanı ve çevresini ayrı bul; ikisini doğru yerde kullan.",
        steps: [
          {
            label: "Tabanı çöz",
            explanation:
              "Hipotenüs √(3²+4²)=5; B=3·4/2=6 cm² ve p=3+4+5=12 cm.",
          },
          {
            label: "Cismi hesapla",
            explanation: "V=B·h=6·10=60 cm³; yanal alan p·h=12·10=120 cm².",
          },
          {
            label: "İki kapağı ekle",
            explanation: "S=2B+p·h=12+120=132 cm².",
          },
        ],
        answer: "Hacim 60 cm³, toplam alan 132 cm².",
        check: "Yan yüzleri 30, 40, 50 cm² olarak ayrı toplamak da 120 verir.",
        pitfall: "Prizma yüksekliği 10’u tabandaki üçgen alanında kullanma.",
      },
      {
        title: "Köşegeni iki dik üçgenden çıkar",
        prompt:
          "Bir dikdörtgenler prizmasının birbirine dik ayrıtları 3 cm, 4 cm ve 12 cm. Uzay köşegeni kaç cm?",
        strategy: "Önce bir yüz köşegenini, sonra uzay köşegenini bul.",
        steps: [
          {
            label: "Yüzde Pisagor",
            explanation: "3 ve 4 ayrıtlı yüzün köşegeni √(9+16)=5 cm.",
          },
          {
            label: "Uzayda Pisagor",
            explanation:
              "Bu 5 cm ile ona dik 12 cm üçüncü ayrıt, yeni bir dik üçgen kurar.",
          },
          {
            label: "Karekökü al",
            explanation: "d²=5²+12²=169, d=13 cm.",
          },
        ],
        answer: "13 cm.",
        check: "13, en uzun ayrıt 12’den büyüktür; d²=3²+4²+12² sağlanır.",
        pitfall: "Yüz köşegeni 5’i uzay köşegeni diye bırakma.",
      },
      {
        title: "Kapaksız kutuda olmayan yüzü çıkar",
        prompt:
          "Dikdörtgen tabanı 5 cm×4 cm, yüksekliği 3 cm olan üstü açık kutu sıfır kalınlıklı malzemeden yapılacak. İç-dış çift sayım yapılmadan gereken yüzey alanı kaç cm²?",
        strategy: "Bir taban ve dört yan yüzü say.",
        steps: [
          {
            label: "Tabanı bul",
            explanation: "B=5·4=20 cm²; yalnız alt kapak var.",
          },
          {
            label: "Yanları aç",
            explanation: "İki 5×3 ve iki 4×3 dikdörtgen 30+24=54 cm² eder.",
          },
          {
            label: "Topla",
            explanation: "S_açık=20+54=74 cm².",
          },
        ],
        answer: "74 cm².",
        check:
          "Kapalı kutu alanı 94’ten eksik üst yüz 20 çıkarılınca 74 kalır.",
        pitfall: "Üst kapağı ekleme; malzemenin iki yanını ayrıca sayma.",
      },
      {
        title: "Yüzey koşulu yolu değiştirir",
        prompt:
          "Ayrıtları 2 cm, 3 cm ve 4 cm olan kapalı dikdörtgenler prizmasının karşı köşeleri arasında yalnız yüzey üzerinde en kısa yol kaç cm?",
        strategy: "Üç yüz açınımını karşılaştır; uzay köşegenini ele.",
        steps: [
          {
            label: "Adayları kur",
            explanation:
              "Yüzey yolu kareleri (2+3)²+4²=41, (2+4)²+3²=45 ve(3+4)²+2²=53.",
          },
          {
            label: "En küçüğünü seç",
            explanation:
              "Pozitif karekök artan olduğundan 41’in karekökü en küçük.",
          },
          {
            label: "Koşulu denetle",
            explanation:
              "√29 uzunluklu uzay köşegeni cismin içinden geçer ve yüzeyde kalmaz.",
          },
        ],
        answer: "√41 cm.",
        check: "Yaklaşık 6,40 cm, iç köşegen√29≈5,39’dan uzundur.",
        pitfall: "İzin verilen yolun yüzey üzerinde olmasını atlama.",
      },
    ],
    recall: [
      {
        prompt: "Üçgen dik prizmanın tabanı mutlaka eşkenar mıdır?",
        answer:
          "Hayır. Dik, yan ayrıtın tabana dikliğidir; düzgünlük tabanın ayrıca düzgün çokgen olmasını gerektirir.",
      },
      {
        prompt: "S=2B+p·h içindeki 2B neyi sayar?",
        answer:
          "Alt ve üstteki iki eş kapalı tabanı. Bir kapak yoksa yalnız o yüz alanı çıkarılır.",
      },
      {
        prompt: "Küpün yüz köşegeni ile uzay köşegeni nasıl ayrılır?",
        answer:
          "Yüz köşegeni a√2 tek yüzdedir; uzay köşegeni a√3 karşı köşeleri içeriden birleştirir.",
      },
      {
        prompt:
          "İki küp yüz yüze yapışınca neden ortak alan iki kez çıkarılır?",
        answer:
          "Ayrı alan toplamı her küpün ortak yüzünü bir kez içerir; yapışınca iki yüz de dışarıya kapanır.",
      },
    ],
    items: [
      {
        prompt:
          "Tabanı yedigen olan bir dik prizmanın toplam kaç köşesi vardır?",
        options: ["14", "7", "9", "21", "28"],
        knowledge: ["n kenarlı prizmanın iki tabanında n’er köşe vardır."],
        strategy: "Önce tabanın kenar sayısını n ile eşleştir.",
        steps: [
          "Yedigen için n=7.",
          "Alt taban 7, üst taban 7 farklı köşe taşır.",
          "Toplam 2n=14 köşe vardır.",
        ],
        optionReasons: [
          "Doğru: iki tabanda 7+7=14 köşe vardır.",
          "7 yalnız bir tabanın köşelerini sayar.",
          "9=n+2, köşe değil yüz sayısıdır.",
          "21=3n ayrıt sayısıdır.",
          "28 köşe sayısını bir kez daha ikiyle çarpar.",
        ],
        commonError: "Köşe, ayrıt ve yüz sayılarını aynı formülle bulma.",
        check: "14−21+9=2 tutarlıdır.",
      },
      {
        prompt:
          "Tabanı sekizgen olan bir dik prizmanın toplam ayrıt sayısı kaçtır?",
        options: ["24", "16", "10", "8", "32"],
        knowledge: [
          "İki tabanda 2n ayrıt ve tabanları birleştiren n yan ayrıt bulunur.",
        ],
        strategy: "Taban ve yan ayrıtları ayrı say.",
        steps: [
          "n=8.",
          "Taban ayrıtları 2·8=16; yan ayrıtlar 8.",
          "Toplam 16+8=24.",
        ],
        optionReasons: [
          "Doğru:3·8=24 ayrıt.",
          "16 yalnız taban ayrıtlarını sayar.",
          "10=n+2 yüz sayısıdır.",
          "8 yalnız yan ayrıtları sayar.",
          "32=4n olur; dördüncü n ayrıt grubu yoktur.",
        ],
        commonError: "Üst ve alt tabanı sayıp yan ayrıtları unutma.",
        check: "Köşe 16, yüz 10:16−24+10=2.",
      },
      {
        prompt:
          "Tabanı dik kenarları 3 cm ve 4 cm olan dik üçgen, yüksekliği 10 cm olan dik prizmanın hacmi kaç cm³?",
        options: ["60", "120", "30", "24", "600"],
        knowledge: ["V=B·h; dik üçgen alanı dik kenar çarpımının yarısıdır."],
        strategy: "Önce tabanın alanını hesapla.",
        steps: ["B=3·4/2=6 cm².", "Prizma yüksekliği 10 cm.", "V=6·10=60 cm³."],
        optionReasons: [
          "Doğru:6·10=60 cm³.",
          "120, üçgen alanındaki 1/2’yi unutur.",
          "30, alanı iki kez yarıya indirir.",
          "24, verilen yüksekliği kullanmaz.",
          "600, yüksekliği iki kez çarpar.",
        ],
        commonError: "Tabanın yüksekliği ile cismin yüksekliğini karıştırma.",
        check: "Birim cm²·cm=cm³.",
      },
      {
        prompt:
          "Tabanı dik kenarları 3 cm ve 4 cm olan dik üçgen, yüksekliği 10 cm olan kapalı dik prizmanın toplam yüzey alanı kaç cm²?",
        options: ["132", "120", "126", "60", "144"],
        knowledge: ["S=2B+p·h; tabanın hipotenüsü çevreye katılır."],
        strategy: "B ve p’yi farklı büyüklükler olarak hesapla.",
        steps: [
          "B=6; hipotenüs 5 ve p=12.",
          "Yanal alan 12·10=120.",
          "İki taban 12 eklenir:132.",
        ],
        optionReasons: [
          "Doğru:120+2·6=132.",
          "120 yalnız yan yüzlerin alanıdır.",
          "126 tek taban ekler; kapalı prizmanın iki tabanı vardır.",
          "60 hacmin sayısal değeridir; yüzey değildir.",
          "144 taban alanını 6 yerine 12 alır.",
        ],
        commonError: "Çevreyi taban alanı yerine koyma.",
        check: "Üç yan yüz 30+40+50 ve iki taban 6+6 toplam 132.",
      },
      {
        prompt:
          "Dikdörtgenler prizmasının birbirine dik üç ayrıtı 3 cm, 4 cm ve 12 cm. Uzay köşegeni kaç cm?",
        options: ["13", "5", "19", "√153", "√119"],
        knowledge: ["Uzay köşegeni d²=a²+b²+c² sağlar."],
        strategy: "Üç dik doğrultunun karelerini topla.",
        steps: ["3²+4²=25.", "25+12²=169.", "Pozitif uzunluk d=√169=13."],
        optionReasons: [
          "Doğru:13²=169.",
          "5 yalnız 3×4 yüzünün köşegenidir.",
          "19 ayrıtları doğrusal toplar.",
          "153, 4² terimini dışarıda bırakır.",
          "119 doğru kareler toplamı değildir; 12² tek başına 144 eder.",
        ],
        commonError: "Kareleri toplamadan uzunlukları toplama.",
        check: "Sonuç 12’den büyük olmalıdır.",
      },
      {
        prompt: "Bir küpün bir yüz köşegeni 6√2 cm. Küpün hacmi kaç cm³?",
        options: ["216", "72", "432", "36", "108"],
        knowledge: ["Küpün yüz köşegeni a√2; hacmi a³."],
        strategy: "Önce köşegenden ayrıtı çıkar.",
        steps: ["a√2=6√2.", "Pozitif√2’ye bölünce a=6.", "V=6³=216."],
        optionReasons: [
          "Doğru:ayrıt 6, hacim 216.",
          "72=2·6², hacim değildir.",
          "432, doğru hacmi gereksiz ikiyle çarpar.",
          "36 bir yüz alanıdır.",
          "108 doğru hacmin yarısıdır; küp hacminde 1/2 yoktur.",
        ],
        commonError: "Köşegen 6√2’nin küpünü alma.",
        check: "Yüz köşegeni/ayrıt oranı√2 olarak kalır.",
      },
      {
        prompt:
          "Ayrıtları 2 cm, 3 cm ve 4 cm olan kapalı dikdörtgenler prizmasının toplam yüzey alanı kaç cm²?",
        options: ["52", "24", "26", "48", "104"],
        knowledge: ["S=2(ab+ac+bc)."],
        strategy: "Üç farklı yüz alanını bul; her birinden iki tane vardır.",
        steps: [
          "ab=6, ac=8, bc=12.",
          "Üç farklı yüz alanı toplam 26.",
          "Karşı yüzlerle 2·26=52.",
        ],
        optionReasons: [
          "Doğru:2(6+8+12)=52.",
          "24 hacmin sayısal değeridir.",
          "26 yalnız üç farklı yüzü sayar.",
          "48, hacmi ikiyle çarpar; yüz alanı hesaplanmaz.",
          "104 her yüzü iki kez saymış olur.",
        ],
        commonError: "Altı yüzün üç eş çift oluşturduğunu kullan.",
        check: "Alan birimi cm²dir.",
      },
      {
        prompt:
          "Tabanı 5 cm×4 cm, yüksekliği 3 cm olan dikdörtgenler prizması biçimindeki kutunun üst kapağı yok. Sıfır kalınlıklı kutunun malzeme alanı, iç-dış çift sayılmadan kaç cm²?",
        options: ["74", "94", "54", "40", "148"],
        knowledge: ["Açık kutu alanı B+p·h; olmayan üst kapak eklenmez."],
        strategy: "Bir taban ve dört yan yüzü say.",
        steps: ["B=20; p=18.", "Yanal alan 18·3=54.", "Toplam 20+54=74."],
        optionReasons: [
          "Doğru:74 cm².",
          "94 kapalı kutunun iki tabanlı alanıdır.",
          "54 alt tabanı unutur.",
          "40 yalnız iki tabanın alanıdır ve yanları atlar.",
          "148 iç ve dışı ayrıca sayarak belirtilen modeli ihlal eder.",
        ],
        commonError: "Soruda kapalı mı açık mı olduğunu kontrol et.",
        check: "Kapalı 94−üst 20=74.",
      },
      {
        prompt:
          "Ayrıtı 2 cm olan kapalı küpün karşı köşeleri arasında yalnız yüzey üzerinde gidilen en kısa yol kaç cm?",
        options: ["2√5", "2√3", "4", "6", "4√2"],
        knowledge: [
          "Karşı köşeler için iki komşu yüz açıldığında 2a×a dikdörtgeni oluşur.",
        ],
        strategy: "Yüzey yolunu açınımın köşegeni olarak kur.",
        steps: [
          "a=2; açınım ölçüleri 4 ve2.",
          "Yol²=4²+2²=20.",
          "Yol=√20=2√5.",
        ],
        optionReasons: [
          "Doğru:yüzeyde en kısa yol 2√5.",
          "2√3 cismin içinden geçen uzay köşegenidir.",
          "4, açınımın uzun kenarıdır; son noktaya tek başına ulaşmaz.",
          "6, üç ayrıt boyunca yürümektir ve daha uzundur.",
          "4√2, iki yüz köşegenini toplar; açınımda düz yol daha kısadır.",
        ],
        commonError: "İç köşegeni yüzey yolu sayma.",
        check: "2√3<2√5<6; yasak iç yol daha kısadır.",
      },
      {
        prompt:
          "Bir dik prizmanın bütün uzunlukları 3 katına çıkarılıyor. Yeni hacmin eski hacme oranı kaçtır?",
        options: ["27", "3", "6", "9", "81"],
        knowledge: ["Üç boyutta aynı k ölçeği hacmi k³ katına çıkarır."],
        strategy: "Taban ve yüksekliğin ölçeklerini birlikte kullan.",
        steps: [
          "Taban alanı 3²=9 kat olur.",
          "Yükseklik 3 kat olur.",
          "V_yeni/V_eski=9·3=27.",
        ],
        optionReasons: [
          "Doğru:3³=27.",
          "3 yalnız yükseklik değişseydi hacim oranı olabilirdi.",
          "6 boyutsal ölçek kuralı değildir.",
          "9 alan oranıdır; hacim için bir 3 daha gerekir.",
          "81=3⁴ olup gereksiz bir boyut ekler.",
        ],
        commonError: "Alan ölçeğini hacme taşımadan üçüncü boyutu ekle.",
        check: "Örneğin 1 birim küp 3 birim küpe dönüşür; hacimler 1 ve27.",
      },
      {
        prompt:
          "Ayrıtları 2 cm olan iki dolu küp, birer kare yüzleri tam örtüşecek biçimde yapıştırılıyor. Oluşan cismin dış yüzey alanı kaç cm²?",
        options: ["40", "48", "44", "32", "16"],
        knowledge: [
          "Yapışan iki yüz dışarıya açık değildir; ortak yüz alanı iki kez çıkarılır.",
        ],
        strategy: "Önce ayrı toplam alanı, sonra gizlenen iki yüzü bul.",
        steps: [
          "Bir küp 6·2²=24 cm²; iki küp 48.",
          "Ortak yüz 4 cm²; iki yüz gizlenir.",
          "Dış alan 48−2·4=40.",
        ],
        optionReasons: [
          "Doğru:40 cm².",
          "48 yapışma yüzlerini dışarıda sayar.",
          "44 yalnız bir gizli yüzü çıkarır.",
          "32 dört yüzü çıkarır; yalnız iki yüz gizlenir.",
          "16 toplam hacmin sayısal değeridir.",
        ],
        commonError: "Ortak yüzün her iki cisme ait birer yüz olduğunu unutma.",
        check: "Birleşim 4×2×2 prizmasıdır:2(8+8+4)=40.",
      },
      {
        prompt:
          "Taban alanı 15 cm² olan bir dik prizmanın hacmi 120 cm³. Prizmanın yüksekliği kaç cm?",
        options: ["8", "18", "105", "1800", "4"],
        knowledge: ["V=B·h eşitliğinde alanla hacmi bölmek uzunluk verir."],
        strategy: "Bilinmeyen h’yi yalnız bırak.",
        steps: [
          "120=15h.",
          "İki tarafı 15’e böl: h=8.",
          "15·8=120 doğrulanır.",
        ],
        optionReasons: [
          "Doğru:h=8 cm.",
          "18, verilerden hacim eşitliğini sağlamaz; 15·18=270.",
          "105 hacimden alanı çıkarır; farklı boyutlar çıkarılamaz.",
          "1800 hacimle alanı çarpar; h için bölmek gerekir.",
          "4, doğru 120/15=8 sonucunu gereksiz yarıya indirir; 15·4=60 olup 120 etmez.",
        ],
        commonError: "Prizma hacmine piramidin 1/3 katsayısını getirme.",
        check: "cm³/cm²=cm.",
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri, Dik Prizmalar ve Küp (PDF 154–156/basılı 152–154); Aurelia TYT Geometri Tüm Konular ve Formüller, PDF 13. Kavramlardan geliştirilmiş özgün anlatım ve özgün öğretim soruları.",
  },
  {
    id: "tyt-geo-piramitler-032",
    title: "Piramitler: yükseklik, alan ve benzer kesit",
    minutes: 52,
    objectives: [
      "Genel, dik ve düzgün piramidin koşullarını ayır.",
      "Dik yükseklik, yan yüz yüksekliği ve yan ayrıtı doğru üçgenlerle ilişkilendir.",
      "Piramit ve düzgün dört yüzlünün alan ve hacmini gerekçelendir.",
      "Paralel kesitte uzunluk, alan ve hacim oranlarını ayır; kesik piramidi farkla hesapla.",
    ],
    sections: [
      {
        title: "Piramidi bir taban ve bir tepeyle kur",
        paragraphs: [
          "Bir çokgensel taban ile bu tabanın düzleminde bulunmayan tek bir tepe noktası seç. Tabanın her kenarı tepeyle bir üçgensel yan yüz oluşturur. Tabanı üçgense üçgen piramit, beşgense beşgen piramit adını alır. Bir prizmanın iki eş tabanı varken piramidin bir tabanı ve tek tepesi vardır; piramidin yan yüzleri üçgendir.",
          "Tabanı n kenarlı bir piramitte n+1 köşe, n taban ve n yan ayrıtla 2n ayrıt, bir taban ve n yan yüzle n+1 yüz vardır. Üçgen piramitte 4 köşe ve 4 yüz bulunur; bu yüzden dört yüzlü de denir. Her dört yüzlünün bütün ayrıtları eş değildir. Düzgün dört yüzlü, bunun özel bir türüdür.",
        ],
      },
      {
        title: "Yükseklik, yan yüz yüksekliği ve yan ayrıtı ayır",
        paragraphs: [
          "Piramidin yüksekliği h, tepenin taban düzlemine dik uzaklığıdır. Yan yüz yüksekliği ℓ, tepenin belirli bir taban kenarına o üçgensel yüz içinde çizilen dikmesidir. Yan ayrıt e ise tepeden tabandaki bir köşeye gider. Üçü farklı uç noktaları birleştirir. Hacim için h, bir yan üçgenin alanı için o yüzün ℓ değeri gerekir.",
          "Dik piramitte tepenin taban düzlemine izdüşümü tabanın ağırlık merkezidir. Taban düzgün çokgen ve yan yüzler eş ikizkenar üçgense düzgün dik piramit elde edilir; yan yüz yükseklikleri ve yan ayrıtlar kendi aralarında eş olur. Genel bir piramitte bunların eş olduğunu varsayma; yan yüz alanlarını ayrı ayrı toplamak gerekebilir.",
        ],
      },
      {
        title: "Düzgün kare piramitte iki farklı dik üçgen vardır",
        paragraphs: [
          "Kare tabanın kenarı a, merkezi O, bir kenarının orta noktası M, bir köşesi A ve tepe T olsun. TM yan yüz yüksekliği ℓ, TO dik yükseklik h, TA yan ayrıt e’dir. OM=a/2 olduğu için TOM dik üçgeninde ℓ²=h²+(a/2)² bulunur. OA=a√2/2 olduğundan TOA dik üçgeninde e²=h²+a²/2 çıkar.",
          "Örneğin a=6 ve h=4 ise ℓ=√(16+9)=5 olur; e=√(16+18)=√34 çıkar. ℓ=5 ile e=√34 aynı sayı değildir. Düzgün n-gen tabanda da aynı düşünce sürer: tabanın iç yarıçapıρ için ℓ²=h²+ρ², çevrel yarıçapı R için e²=h²+R². Bu bağıntılarda dik izdüşümün merkezde olma koşulu gereklidir.",
        ],
      },
      {
        title: "Yanal alanı üçgenlerden, toplam alanı sınırlardan bul",
        paragraphs: [
          "Bir yan üçgenin alanı taban kenarı ile o yüzün yüksekliği çarpımının yarısıdır. Düzgün piramitte bütün yan yüz yükseklikleri ortak ℓ olduğundan kenarları toplamak yanal alan A_y=p·ℓ/2 verir. Kapalı piramidin toplam yüzey alanı S=B+p·ℓ/2 olur; B çokgensel tabanın alanıdır.",
          "Kare taban kenarı 6 ve ℓ=5 için çevre 24, yanal alan 24·5/2=60 ve toplam alan 36+60=96’dır. Hacimde kullanılan dik yükseklik 4’ü buraya koyarsan her yüzün gerçek yüksekliğini küçültmüş olursun. Düzgün olmayan piramitte tek bir ℓ verilmeden p·ℓ/2 kullanılamaz; her yan üçgen için ayrı alan bulunur.",
        ],
      },
      {
        title: "Hacimde üçte bir neden vardır?",
        paragraphs: [
          "Her piramidin hacmi V=B·h/3’tür; h taban düzlemine dik uzaklıktır. Taban biçiminin düzgün olması hacim formülü için gerekmez. Aynı taban alanına ve dik yüksekliğe sahip prizmanın hacminin üçte biri elde edilir. Bu, yalnız şeklin kâğıtta sivri görünmesine dayanarak konan bir katsayı değildir.",
          "Bir üçgen dik prizma, uygun köşeleri birleştiren düzlemlerle üç eş hacimli üçgen piramide ayrılabilir. Komşu parçaların eş taban alanları ve aynı yükseklikleri eş hacim ilişkisini verir; toplamları prizmanın hacmidir. Başka bir taban çokgeni de üçgenlere ayrılıp aynı taban düzlemine göre yükseklik ortak tutularak toplanabilir. Böylece taban alanı B için aynı 1/3 ilişkisi sürer.",
        ],
      },
      {
        title: "Düzgün dört yüzlüyü özel olarak çöz",
        paragraphs: [
          "Düzgün dört yüzlünün dört yüzü eşkenar üçgendir; bütün altı ayrıtı aynı a uzunluğundadır. Bir yüzün yüksekliği a√3/2, alanı a²√3/4; toplam yüzey alanı a²√3 olur. Yan yüz yüksekliği ile cismin dik yüksekliğini ayırmak burada da gerekir.",
          "Tepe izdüşümü eşkenar tabanın ağırlık merkezindedir. Bu merkezden bir köşeye uzaklık, taban yüksekliğinin 2/3’ü yani a√3/3’tür. Tepe-köşe ayrıtı a ile Pisagor kurunca h²=a²−a²/3=2a²/3 ve h=a√6/3 çıkar. Hacim B·h/3=a³√2/12 olur. Bu sonuçlar bütün üçgen piramitlere değil, düzgün dört yüzlüye aittir.",
        ],
      },
      {
        title: "Paralel kesitte uzaklığın nereden ölçüldüğünü söyle",
        paragraphs: [
          "Piramidin tabanına paralel bir düzlem tepeyle taban arasında kesit alırsa tepe tarafında küçük benzer bir piramit oluşur. Küçük piramidin dik yüksekliği tepe-kesit uzaklığıdır. Bu uzaklığın tam yüksekliğe oranı k ise bütün karşılıklı uzunlukların oranı k, kesit alanının taban alanına oranı k² ve küçük hacmin tam hacme oranı k³ olur.",
          "Tepe-kesit uzaklığı toplam yüksekliğin yarısı olduğunda küçük hacim 1/8, altta kalan kesik cismin hacmi 7/8’dir; yarı hacim değildir. Soruda tabandan kesite uzaklık verilmişse önce toplam yükseklikten çıkararak tepe-kesit uzaklığını bul. Kesit düzlemi tabana paralel değilse bu benzerlik ölçeklerini otomatik kullanma.",
        ],
      },
      {
        title: "Kesik piramidi büyükten küçüğü çıkararak anla",
        paragraphs: [
          "Tabana paralel kesimden sonra tepesi kaldırılan alt bölüm kesik piramittir. Alt ve üst tabanları paralel ve benzer, alanları B₁ ve B₂, aralarındaki dik uzaklık h ise hacim h(B₁+B₂+√(B₁B₂))/3 olur. Bu formülde B₁ ile B₂ uzunluk değil alan; karekök terimi de alan birimindedir.",
          "Formülü ezberlemeden büyük piramidi yeniden kur. Örneğin alt kare kenarı 6, üst kare kenarı 3 olduğunda uzunluk oranı 1/2’dir. Kesik yükseklik 4 ise büyük yükseklik 8, küçük yükseklik 4 olur. Hacimler 36·8/3=96 ve9·4/3=12; fark 84’tür. Kesik cismin yüksekliğini büyük piramidin tamamına ait yükseklik sanmak sonucu bozar.",
        ],
      },
    ],
    examples: [
      {
        title: "Üç uzunluğu doğru işte kullan",
        prompt:
          "Düzgün kare piramidin taban kenarı 6 cm, dik yüksekliği 4 cm. Yan yüz yüksekliği, toplam alanı ve hacmi nedir?",
        strategy:
          "Merkezden kenar ortasına dik üçgen kur; alan ve hacimde farklı yükseklik kullan.",
        steps: [
          {
            label: "Yan yüksekliği bul",
            explanation:
              "Taban merkezinden kenar ortasına uzaklık 3 cm. ℓ²=4²+3²=25, ℓ=5.",
          },
          {
            label: "Alanı hesapla",
            explanation: "B=36, p=24. Yanal alan 24·5/2=60; toplam 96 cm².",
          },
          {
            label: "Hacmi hesapla",
            explanation: "V=36·4/3=48 cm³. Hacimdeℓ değil dik h kullanıldı.",
          },
        ],
        answer: "ℓ=5 cm, S=96 cm², V=48 cm³.",
        check: "Aynı 48 sayısı ile 96 alanını birimlerle ayır:cm³ vecm².",
        pitfall: "Hacimde 5, yanal alanda 4 kullanma.",
      },
      {
        title: "Düzgün dört yüzlüde yüksekliği çıkar",
        prompt: "Bütün ayrıtları 6 cm olan düzgün dört yüzlünün hacmi kaç cm³?",
        strategy: "Eşkenar tabanın merkezini bulup dik yüksekliği hesapla.",
        steps: [
          {
            label: "Tabanı bul",
            explanation:
              "Eşkenar taban alanı 6²√3/4=9√3 cm²; merkez-köşe uzaklığı 6√3/3=2√3 cm.",
          },
          {
            label: "Dik yüksekliği bul",
            explanation: "h²=6²−(2√3)²=36−12=24, h=2√6 cm.",
          },
          {
            label: "Hacmi kur",
            explanation: "V=(9√3·2√6)/3=6√18=18√2 cm³.",
          },
        ],
        answer: "18√2 cm³.",
        check: "Genel ifade a³√2/12 için a=6 koymak aynı sonucu verir.",
        pitfall: "6√3/2 yan yüz yüksekliğini cismin yüksekliği sanma.",
      },
      {
        title: "Kesit oranını tepeye göre ölç",
        prompt:
          "Bir piramidin taban alanı 144 cm², dik yüksekliği 12 cm. Tabana paralel kesit tepeden 3 cm dik uzaklıkta. Kesit alanı ve üst küçük piramidin hacmi nedir?",
        strategy: "Tepe-kesit uzaklığını tam yüksekliğe böl.",
        steps: [
          {
            label: "Oranı bul",
            explanation: "k=3/12=1/4.",
          },
          {
            label: "Alanı ölçekle",
            explanation: "Kesit alanı 144·(1/4)²=9 cm².",
          },
          {
            label: "Hacmi ölçekle",
            explanation: "Tam hacim 144·12/3=576; küçük hacim 576/64=9 cm³.",
          },
        ],
        answer: "Kesit alanı 9 cm², küçük hacim 9 cm³.",
        check: "Küçük piramitte doğrudan 9·3/3=9 cm³.",
        pitfall: "Alan için k, hacim için k² kullanma.",
      },
      {
        title: "Kesik piramidi iki hacimle hesapla",
        prompt:
          "Düzgün kare kesik piramidin alt taban kenarı 6 cm, üst taban kenarı 3 cm, tabanlar arası dik uzaklığı 4 cm. Hacmi nedir?",
        strategy: "Eksik tepeyi ekleyip benzer küçük piramidi çıkar.",
        steps: [
          {
            label: "Yükseklikleri kur",
            explanation:
              "Üst/alt kenar oranı 1/2 olduğundan küçük yükseklik büyük yüksekliğin yarısı. Aradaki 4 cm diğer yarıdır; büyük 8, küçük 4.",
          },
          {
            label: "İki hacmi bul",
            explanation: "Büyük 36·8/3=96; küçük 9·4/3=12.",
          },
          {
            label: "Çıkar ve denetle",
            explanation: "Kesik hacim 96−12=84. Alternatif 4(36+9+18)/3=84.",
          },
        ],
        answer: "84 cm³.",
        check:
          "Sonuç aynı yükseklikte taban alanı 9 ve36 olan prizmaların 36–144 cm³ aralığındadır.",
        pitfall:
          "Kesik yüksekliği 4’ü büyük piramidin tam yüksekliği yerine kullanma.",
      },
    ],
    recall: [
      {
        prompt: "Hacim için hangi yükseklik gerekir?",
        answer:
          "Tepeden taban düzlemine dik uzaklık h; yan yüz üzerindekiℓ veya yan ayrıt değil.",
      },
      {
        prompt: "p·ℓ/2 her piramidin yanal alanı mıdır?",
        answer:
          "Hayır. Ortak yan yüz yüksekliğiℓ koşulu gerekir; burada düzgün piramitte uygulanır. Genel durumda yan üçgenleri ayrı topla.",
      },
      {
        prompt:
          "Tepeye uzaklık oranı 1/2 olan paralel kesitte üst hacim oranı nedir?",
        answer:
          "(1/2)³=1/8. Kesit alanı oranı 1/4; altta kalan hacim oranı 7/8 olur.",
      },
      {
        prompt: "Düzgün dört yüzlüde cismin yüksekliği neden a√3/2 değildir?",
        answer:
          "a√3/2 bir eşkenar yüzün yüksekliğidir. Tepe-taban merkezi dik üçgeninden cismin yüksekliği a√6/3 çıkar.",
      },
    ],
    items: [
      {
        prompt:
          "Düzgün kare piramidin taban kenarı 6 cm, dik yüksekliği 4 cm. Hacmi kaç cm³?",
        options: ["48", "144", "72", "60", "36"],
        knowledge: ["V=B·h/3; kare taban alanıa²."],
        strategy: "Önce taban alanını bul.",
        steps: [
          "B=6²=36 cm².",
          "Prizma karşılığı 36·4=144.",
          "Piramidin hacmi 144/3=48.",
        ],
        optionReasons: [
          "Doğru:48 cm³.",
          "144 aynı tabanlı ve aynı yükseklikli prizmanın hacmidir.",
          "72, 1/3 yerine 1/2 kullanır.",
          "60 bu piramidin yanal alanının sayısal değeridir.",
          "36 taban alanıdır; hacim değildir.",
        ],
        commonError: "Hacimde 1/3 katsayısını unutma.",
        check: "3·48=144 aynı taban ve yükseklikteki prizma hacmi.",
      },
      {
        prompt:
          "Düzgün kare piramidin taban kenarı 6 cm, dik yüksekliği 4 cm. Bir yan üçgensel yüzün yüksekliği kaç cm?",
        options: ["5", "4", "√34", "3", "7"],
        knowledge: [
          "Yan yüz yüksekliği tepeyi taban kenarının orta noktasına bağlar.",
        ],
        strategy: "Dik yüksekliği ve yarım taban kenarını kullan.",
        steps: [
          "Merkez-kenar ortası uzaklık 6/2=3.",
          "ℓ²=4²+3²=25.",
          "ℓ=5 cm.",
        ],
        optionReasons: [
          "Doğru:5 cm yan yüz yüksekliğidir.",
          "4 cismin dik yüksekliğidir.",
          "√34 tepe-köşe yan ayrıtıdır.",
          "3 taban merkezinden kenar ortasına uzaklıktır.",
          "7, 3+4 toplar; dik üçgende hipotenüs böyle hesaplanmaz.",
        ],
        commonError: "Yarım köşegen ile yarım kenarı karıştırma.",
        check: "3, 4, 5 dik üçgeni oluşur.",
      },
      {
        prompt:
          "Düzgün kare piramidin taban kenarı 6 cm, dik yüksekliği 4 cm. Kapalı piramidin toplam yüzey alanı kaç cm²?",
        options: ["96", "60", "84", "48", "120"],
        knowledge: ["S=B+pℓ/2; ℓ yan yüz yüksekliğidir."],
        strategy: "Önceℓ’yi hesapla; tabanı ayrıca ekle.",
        steps: [
          "ℓ=√(4²+3²)=5.",
          "Yanal alan 4·6·5/2=60.",
          "Taban 36 ile toplam 96.",
        ],
        optionReasons: [
          "Doğru:36+60=96.",
          "60 yalnız yanal alandır.",
          "84, yan yüz yüksekliği yerine dik yüksekliği 4 kullanır.",
          "48 hacmin sayısal değeridir.",
          "120 yan üçgenlerde 1/2 kullanmadan yalnız yanları toplar.",
        ],
        commonError: "Toplam alana tabanı eklemeyi unutma.",
        check: "Dört yan yüzün her biri 15; 4·15+36=96.",
      },
      {
        prompt:
          "Düzgün kare piramidin taban kenarı 6 cm, dik yüksekliği 4 cm. Tepeden bir taban köşesine giden yan ayrıt kaç cm?",
        options: ["√34", "5", "4", "√52", "6"],
        knowledge: ["Taban merkezinden köşeye uzaklık a√2/2’dir."],
        strategy: "Dik üçgeni tepe-merkez-köşe noktalarıyla kur.",
        steps: [
          "Merkez-köşe uzaklığı 3√2.",
          "e²=4²+(3√2)²=16+18=34.",
          "e=√34.",
        ],
        optionReasons: [
          "Doğru:√34 yan ayrıtıdır.",
          "5, kenar orta noktasına inen yan yüz yüksekliğidir.",
          "4 cismin dik yüksekliğidir.",
          "√52, taban kenarı 6’yı merkez-köşe uzaklığı sanır.",
          "6 yalnız taban kenarıdır; yan ayrıtın ona eşit olduğu verilmemiştir.",
        ],
        commonError: "Tepe-kenar ortası ile tepe-köşe parçalarını ayır.",
        check: "e²−ℓ²=34−25=9=(a/2)².",
      },
      {
        prompt:
          "Düzgün olması gerekmeyen bir piramidin taban alanı 18 cm², tepesinin taban düzlemine dik uzaklığı 10 cm. Hacmi kaç cm³?",
        options: ["60", "180", "90", "28", "540"],
        knowledge: ["Genel piramitte V=B·h/3; düzgünlük gerekmez."],
        strategy: "Verilen dik uzaklığı doğrudan h olarak kullan.",
        steps: ["B=18 cm², h=10 cm.", "B·h=180 cm³.", "V=180/3=60 cm³."],
        optionReasons: [
          "Doğru:60 cm³; tabanın düzgün olması gerekmez.",
          "180, 1/3 katsayısını atlar.",
          "90, 1/2 kullanır; piramit hacmi değildir.",
          "28, alanla uzunluğu toplar; birimler uyuşmaz.",
          "540, bölmek yerine 3’le çarpar.",
        ],
        commonError: "Düzgün değil diye hacmin hesaplanamayacağını düşünme.",
        check:
          "Aynı taban ve dik yükseklikteki bütün piramitlerin hacmi 60 olur.",
      },
      {
        prompt:
          "Bir piramit, tepe ile taban arasındaki dik yüksekliğin tam ortasından tabana paralel düzlemle kesiliyor. Tepede kalan küçük piramidin hacminin ilk hacme oranı kaçtır?",
        options: ["1/8", "1/2", "1/4", "7/8", "1/3"],
        knowledge: [
          "Paralel kesit benzer küçük piramit oluşturur; hacim uzunluk oranının küpüyle ölçeklenir.",
        ],
        strategy: "Tepeye göre uzunluk oranını bul.",
        steps: [
          "Küçük/büyük yükseklik oranı 1/2.",
          "Bütün karşılıklı uzunluk oranları 1/2.",
          "Hacim oranı(1/2)³=1/8.",
        ],
        optionReasons: [
          "Doğru:1/8 üst parçanın oranıdır.",
          "1/2 yükseklik oranıdır; hacim oranı değildir.",
          "1/4 kesit alanının taban alanına oranıdır.",
          "7/8 altta kalan kesik cismin hacim oranıdır.",
          "1/3 hacim formülündeki katsayıdır; iki benzer hacimde sadeleşir.",
        ],
        commonError:
          "Kesitin alanı ile üst parçanın hacmini aynı oranda küçültme.",
        check: "Küçük 1/8 ve kalan 7/8 toplam 1.",
      },
      {
        prompt:
          "Taban alanı 144 cm² ve dik yüksekliği 12 cm olan piramit, tepeden 3 cm dik uzaklıkta tabana paralel kesiliyor. Kesit alanı kaç cm²?",
        options: ["9", "36", "48", "108", "12"],
        knowledge: [
          "Paralel kesit alanı B·k², k=tepe-kesit uzaklığı/tam yükseklik.",
        ],
        strategy: "Uzaklığın tepeden ölçüldüğünü kullan.",
        steps: ["k=3/12=1/4.", "Alan oranı 1/16.", "144/16=9 cm²."],
        optionReasons: [
          "Doğru:9 cm².",
          "36 alanı uzunluk oranı 1/4 ile çarpar.",
          "48, 144’ü3’e böler; doğru oran 12’ye göre kurulmalıdır.",
          "108, tabanda kalmış uzunluk payını doğrudan alanla çarpar.",
          "12 yalnız tam yüksekliğin sayısal değeridir.",
        ],
        commonError: "Tabandan ölçülen uzaklıkla tepeden ölçüleni ayır.",
        check: "Küçük kesit uzunlukları 1/4, alanı 1/16 olur.",
      },
      {
        prompt:
          "Bütün ayrıtları 6 cm olan düzgün dört yüzlünün dik yüksekliği kaç cm?",
        options: ["2√6", "3√3", "6", "2√3", "√6"],
        knowledge: [
          "Düzgün dört yüzlüde tepe izdüşümü eşkenar tabanın ağırlık merkezidir.",
        ],
        strategy: "Merkez-köşe uzaklığını 6√3/3 olarak kullan.",
        steps: [
          "Taban merkezinden köşeye uzaklık 2√3.",
          "h²=6²−(2√3)²=24.",
          "h=√24=2√6.",
        ],
        optionReasons: [
          "Doğru:2√6 cm.",
          "3√3, eşkenar yüzün yüksekliğidir.",
          "6 yan ayrıtın uzunluğudur; dik yükseklik daha kısadır.",
          "2√3 taban merkez-köşe uzaklığıdır.",
          "√6, doğru yüksekliğin yarısıdır.",
        ],
        commonError: "Yan yüz yüksekliğini cismin dik yüksekliği yerine koyma.",
        check: "24+12=36=6².",
      },
      {
        prompt:
          "Bütün ayrıtları 6 cm olan düzgün dört yüzlünün toplam yüzey alanı kaç cm²?",
        options: ["36√3", "9√3", "18√3", "72√3", "36"],
        knowledge: ["Dört eşkenar üçgenin her birinin alanı a²√3/4."],
        strategy: "Bir yüzü bulup 4’le çarp.",
        steps: [
          "Bir yüz 6²√3/4=9√3.",
          "Dört yüz eş alanlıdır.",
          "Toplam 4·9√3=36√3.",
        ],
        optionReasons: [
          "Doğru:36√3 cm².",
          "9√3 yalnız bir yüzün alanıdır.",
          "18√3 yalnız iki yüzü sayar.",
          "72√3 toplam alanı gereksiz ikiyle çarpar.",
          "36 kare taban alanı gibi a² kullanır; yüzler eşkenar üçgendir.",
        ],
        commonError: "Dört yüzlünün yüzlerini kare sanma.",
        check: "Dört kez 9√3, 36√3 eder.",
      },
      {
        prompt: "Bütün ayrıtları 6 cm olan düzgün dört yüzlünün hacmi kaç cm³?",
        options: ["18√2", "54√2", "18√3", "36√2", "9√2"],
        knowledge: ["Eşkenar taban alanı 9√3 ve dik yükseklik 2√6; V=B·h/3."],
        strategy: "Alan ve dik yüksekliği çarpıp 3’e böl.",
        steps: ["B=6²√3/4=9√3.", "h=6√6/3=2√6.", "V=(9√3·2√6)/3=18√2."],
        optionReasons: [
          "Doğru:18√2 cm³.",
          "54√2, 1/3 katsayısını unutur.",
          "18√3, köklü çarpımı yanlış sadeleştirir; √18=3√2.",
          "36√2 doğru hacmi iki kat sayar.",
          "9√2 doğru hacmin yarısıdır; ilave 1/2 gerekmez.",
        ],
        commonError: "Yüz yüksekliğini dik yükseklik yerine kullanma.",
        check: "a³√2/12 için 6³√2/12=18√2.",
      },
      {
        prompt: "Tabanı beşgen olan bir piramidin toplam ayrıt sayısı kaçtır?",
        options: ["10", "15", "6", "5", "12"],
        knowledge: ["Piramitte n taban ayrıtı ve n yan ayrıt bulunur."],
        strategy: "Prizmanın 3n kuralını kullanmadan iki grubu say.",
        steps: [
          "n=5.",
          "Tabandaki 5 ayrıtın her köşesinden tepeye bir yan ayrıt gider:5 tane.",
          "Toplam 5+5=10.",
        ],
        optionReasons: [
          "Doğru:2·5=10 ayrıt.",
          "15=3n aynı tabanlı prizmanın ayrıt sayısıdır.",
          "6 bu piramidin köşe ve yüz sayısıdır.",
          "5 yalnız taban ayrıtlarını sayar.",
          "12, n yerine köşe sayısı 6’yı ikiyle çarpar.",
        ],
        commonError: "Tek tepeyi ikinci eş taban sanma.",
        check: "Köşe 6−ayrıt 10+yüz 6=2.",
      },
      {
        prompt:
          "Bir düzgün kare kesik piramidin paralel alt ve üst tabanlarının kenarları 6 cm ve3 cm; taban düzlemleri arasındaki dik uzaklık 4 cm. Hacmi kaç cm³?",
        options: ["84", "96", "60", "48", "12"],
        knowledge: [
          "Kesik piramit büyük piramitten benzer küçük piramit çıkarılarak hesaplanır.",
        ],
        strategy: "Kenar oranından tam ve küçük yükseklikleri bul.",
        steps: [
          "Kenar oranı 3/6=1/2; kesik yükseklik 4 büyük yüksekliğin yarısıdır, büyük h=8, küçük h=4.",
          "Büyük hacim 36·8/3=96, küçük hacim 9·4/3=12.",
          "Fark 96−12=84.",
        ],
        optionReasons: [
          "Doğru:84 cm³.",
          "96 küçük tepe parçasını çıkarmaz.",
          "60, 4(36+9)/3 hesabıyla geometrik ortalama terimini atlar.",
          "48 kesik yüksekliği 4’ü büyük piramidin tam yüksekliği sayar.",
          "12 yalnız çıkarılan küçük piramidin hacmidir.",
        ],
        commonError:
          "Kesik yüksekliğiyle tam piramidin yüksekliğini karıştırma.",
        check: "4(36+9+√324)/3=4·63/3=84.",
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri, Dik Piramit ve Düzgün Dört Yüzlü (PDF 157–158/basılı 155–156); Aurelia TYT Geometri Tüm Konular ve Formüller, PDF 14’ün piramit/kesit bölümleri. Özgün anlatım ve özgün öğretim soruları.",
  },
];

export const geometrySolids032Guides: LessonGuide[] = solidPacks032.map(
  ({ items: _items, title: _title, ...guide }) => guide,
);
export const geometrySolids032Lessons: Lesson[] = solidPacks032.map(
  (p, family) => ({
    id: p.id,
    subjectId: "tyt-geometri",
    title: txt(p.title),
    minutes: p.minutes,
    objectives: p.objectives.map(txt),
    source: txt(p.source),
    tags: ["katı-cisimler", "kaynaklı-anlatım", "Özgün öğretim soruları"],
    body: p.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: p.items.map((item, index): Question => {
      const shift = (index + 2 * family + 1) % 5;
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
        id: `f032-${p.id}-${index + 1}`,
        prompt: txt(item.prompt),
        options: order.map((j) => txt(item.options[j])),
        answer: order.indexOf(0),
        hint: txt(item.strategy),
        explanation: txt(item.steps.join(" ") + " Denetim: " + item.check),
        skill: p.id,
        guidance,
      };
    }),
  }),
);
interface SolidSheet032 {
  sections: CheatSheet["sections"];
  cautions: string[];
  exampleIndexes: number[];
  recallIndexes: number[];
}
const solidSheets032: SolidSheet032[] = [
  {
    sections: [
      {
        title: "Dik prizmanın modeli",
        text: [
          "Tabanlar eş ve paraleldir. Yan ayrıt tabana dik, uzunluğu h; yan yüzler dikdörtgendir. Düzgün prizma ayrıca düzgün çokgen taban gerektirir.",
        ],
      },
      {
        title: "Sayım",
        text: [
          "n-gen taban:n≥3; köşe 2n, ayrıt 3n, yüzn+2. Silindire çokgen sayımı uygulanmaz.",
        ],
      },
      {
        title: "Hacim ve yüzey",
        text: [
          "V=B·h; yanal alan=p·h; kapalı toplam S=2B+p·h. Açık kapta bulunmayan yüzü çıkar. Birleşimde ortak iki yüzü dış alandan çıkar.",
        ],
      },
      {
        title: "Dikdörtgenler prizması ve küp",
        text: [
          "Dikdörtgenler prizması:V=abc, S=2(ab+ac+bc), d=√(a²+b²+c²).",
          "Küp:V=a³, S=6a², yüz köşegenia√2, uzay köşegenia√3.",
        ],
      },
      {
        title: "Yol ve ölçek",
        text: [
          "Karşı köşeler yüzey yolu:√[(a+b)²+c²], √[(a+c)²+b²], √[(b+c)²+a²] adaylarının en küçüğü.",
          "Bütün uzunluklar k katıysa alan k², hacim k³; tek ayrıt değişiminde bütüne uygulama.",
        ],
      },
    ],
    cautions: [
      "Alan ve hacmin birimleri farklıdır.",
      "Yüzey yolunda iç uzay köşegeni kullanılamaz.",
      "Tabanı üçgen diye eşkenar varsayma.",
    ],
    exampleIndexes: [0, 3],
    recallIndexes: [0, 1, 2],
  },
  {
    sections: [
      {
        title: "Model ve sayım",
        text: [
          "n-gen piramit:tek taban, tek tepe; n+1 köşe, 2n ayrıt, n+1 yüz. Düzgün piramitte taban düzgün, tepe izdüşümü merkezde.",
        ],
      },
      {
        title: "Üç uzunluk",
        text: [
          "h dik yükseklik, ℓ yan yüz yüksekliği, e yan ayrıt. Düzgün piramitteℓ²=h²+ρ², e²=h²+R²; ρ taban iç yarıçapı, R çevrel yarıçapı.",
        ],
      },
      {
        title: "Alan ve hacim",
        text: [
          "Her piramitte V=B·h/3. Düzgün piramitte yanal alan pℓ/2; kapalı toplam B+pℓ/2. Genel yan üçgenler ayrı hesaplanır.",
        ],
      },
      {
        title: "Düzgün dört yüzlü",
        text: [
          "Ayrıt a:yüz yüksekliğia√3/2, cisim yüksekliğia√6/3, toplam alan a²√3, hacim a³√2/12.",
        ],
      },
      {
        title: "Paralel kesit ve kesik piramit",
        text: [
          "Tepe-kesit/tam yükseklik=k; uzunluk k, alan k², küçük hacim k³ oranındadır. Alt parça hacmi(1−k³)V.",
          "Kesik piramit:paralel benzer taban alanlarıB₁, B₂, dik h için V=h(B₁+B₂+√(B₁B₂))/3; veya büyükten küçüğü çıkar.",
        ],
      },
    ],
    cautions: [
      "Hacimde dik h; yanal alanda uygun yan yüz yüksekliği kullanılır.",
      "Her üçgen piramit düzgün dört yüzlü değildir.",
      "Paralel olmayan kesitte k²/k³ benzerliği otomatik değildir.",
    ],
    exampleIndexes: [0, 2],
    recallIndexes: [0, 1, 2],
  },
];
export const geometrySolids032Sheets: CheatSheet[] = solidPacks032.map(
  (p, i) => ({
    topicId: `topic-${p.id}`,
    lessonId: p.id,
    subjectId: "tyt-geometri",
    title: p.title,
    sections: solidSheets032[i].sections,
    cautions: solidSheets032[i].cautions,
    examples: solidSheets032[i].exampleIndexes.map((j) => ({
      title: p.examples[j].title,
      prompt: p.examples[j].prompt,
      steps: p.examples[j].steps.map((s) => s.explanation),
      answer: p.examples[j].answer,
    })),
    recall: solidSheets032[i].recallIndexes.map((j) => p.recall[j]),
    source: p.source,
  }),
);
