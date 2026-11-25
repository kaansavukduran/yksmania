import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
import type { CheatSheet, CheatSection } from "./cheatsheetContent";

interface PolygonQuestion032 extends QuestionGuidance {
  prompt: string;
  options: string[];
}
interface PolygonPack032 {
  id: string;
  title: string;
  minutes: number;
  source: string;
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: PolygonQuestion032[];
  sheet: CheatSection[];
}
// Original questions; source books and private file identifiers stay outside Git.
const packs: PolygonPack032[] = [
  {
    title: "Çokgenler: açı, köşegen ve düzgün şekiller",
    sections: [
      {
        title: "Önce kapalı şekli ve köşeleri tanı",
        paragraphs: [
          "Çokgen, düzlemde doğru parçalarının sırayla birleşip kapandığı şekildir. Bu derste kenarlar yalnız komşu uçlarda kesişir; üst üste binmez ve birbirini ortadan kesmez. Böylece basit çokgenlerden söz ederiz. Bir köşede doğrusal devam eden iki parçayı ayrı iki kenar saymayız. En az üç köşe gerekir; n kenar sayısıysa n≥3 bir tam sayıdır.",
          "Kenar iki komşu köşeyi birleştirir. Köşegen ise komşu olmayan iki köşeyi birleştiren doğru parçasıdır. Dört köşeli bir şeklin dört kenarı ve dört köşesi vardır; kenarı uzatmak yeni köşe oluşturmaz. Kendi içinden geçen yıldız çizimlerine bu dersteki açı toplamlarını doğrudan uygulama.",
        ],
      },
      {
        title: "Dışbükey ve içbükey: çizimdeki fark",
        paragraphs: [
          "Her iç açı 180°den küçükse basit çokgen dışbükeydir. En az bir iç açı 180°den büyükse içbükeydir; o köşede şekil içeri çöker. İçbükey bir çokgen de basit ve kapalı olabilir. Çizimin görünüşünü kontrol ederken bir kenar uzantısını yeni kenar diye sayma.",
          "Dışbükey bir çokgende seçtiğin köşeden diğer uygun köşelere çizilen köşegenler içeride kalır. İçbükeyde bazı köşegenler dışarı taşabilir. Bu nedenle bütün köşegenleri tek köşeden çizerek üçgenlere ayırma açıklamasını dışbükey şekil üzerinde yaparız; basit içbükey çokgen de uygun köşegenlerle n−2 üçgene ayrılır.",
        ],
      },
      {
        title: "İç açı toplamını üçgenlerden çıkar",
        paragraphs: [
          "Dışbükey n kenarlı bir çokgende bir köşeden başlayıp komşu olmayan bütün köşelere köşegen çiz. Şekil n−2 üçgene ayrılır. Her üçgende iç açı toplamı 180° olduğundan toplam (n−2)·180°dir. Örneğin yedigen beş üçgene ayrılır ve toplam 900° olur.",
          "Bu toplam için kenarların veya açıların eşit olması gerekmez. Fakat toplamı n’ye bölüp tek bir iç açıyı bulmak için bütün iç açıların eşit olduğu ayrıca bilinmelidir. Bir açı 180°den büyükse toplam formülü bozulmaz; içbükey açıyı küçük açıyla değiştirmek toplamı bozar.",
        ],
      },
      {
        title: "Dış açıda aynı dönüş yönünü koru",
        paragraphs: [
          "Dışbükey çokgenin çevresinde aynı yönde yürüdüğünü düşün. Her köşede ileriye uzatılmış kenardan sonraki kenara dönersin. Her köşeden bu biçimde bir dış açı seçince bir tam dönüş yapılır: toplam 360°dir. Her iç açı ile yanındaki böyle bir dış açı bütünlerdir; toplamları 180°dir.",
          "Aynı köşedeki iki farklı dış açıyı birden toplama ve bazı köşelerde yön değiştirme. İçbükey çokgende yönlü dönüşler kullanılır; içeri çöken köşenin dönüşü ters işaretlidir. Bütün dönüş büyüklüklerini pozitif alarak 360° demek genel olarak doğru değildir.",
        ],
      },
      {
        title: "Köşegenleri çift saymadan say",
        paragraphs: [
          "Bir köşeden kendisine veya iki komşusuna köşegen çizilemez; bu yüzden o köşeden n−3 köşegen çıkar. Bütün n köşede sayarsan n(n−3) elde edersin; fakat her köşegeni iki ucundan da saymış olursun. Farklı köşegen sayısı D=n(n−3)/2 olur.",
          "Köşegen sayısı kenar sayısının iki katıysa n(n−3)/2=2n olur. n en az 3 olduğu için iki tarafı n’ye böl. n−3=4 ve n=7 bulunur. Yedigen düzgünse her iç açı 900/7° olur. Modelde 7 kenarı seçip 14 köşegenle doğrula.",
          "Sekizgende bir köşeden 5, toplamda 20 köşegen vardır. Bir köşeden çizilen köşegen sayısı ile ortaya çıkan üçgen sayısı aynı değildir: ilki n−3, ikincisi n−2’dir. D verilen bir soruda n≥3 tam sayı koşulunu sağlayan kökü seç; negatif kök bir çokgeni temsil etmez.",
        ],
      },
      {
        title: "Düzgün olmak iki eşitlik ister",
        paragraphs: [
          "Düzgün çokgende bütün kenar uzunlukları birbirine eşit ve bütün iç açı ölçüleri birbirine eşittir. Yalnız eş kenarlı bir eşkenar dörtgenin açıları 60° ve 120° olabilir; düzgün değildir. Yalnız eş açılı bir dikdörtgenin komşu kenarları 3 ve 5 olabilir; o da düzgün değildir.",
          "Düzgün n-gende bir dış açı δ=360°/n, bir iç açı α=180°−δ olur. Tersi yönde n=360°/δ=360°/(180°−α) yazılır. Sonuç en az 3 olan tam sayı değilse verilen açıyla düzgün çokgen yoktur. Örneğin 145° iç açı 35° dış açı verir; 360/35 tam sayı değildir.",
        ],
      },
      {
        title: "Merkez açısı, çevre ve alanı ilişkilendir",
        paragraphs: [
          "Düzgün çokgenin merkezi bütün köşelere aynı R uzaklığındadır; R çevrel çember yarıçapıdır. Merkezi ardışık iki köşeye bağladığında merkez açısı 360°/n olur. Bu merkez açısı bir dış açıyla aynı ölçüdedir; farklı yerlerdeki iki açıdan söz ediyoruz. Kenar uzunluğu a ise çevre Ç=n·a’dır.",
          "Merkezden bir kenara indirilen dik uzaklığa apotem denir ve ρ ile gösterilir. Merkezden bütün köşelere çizilen parçalar n eş ikizkenar üçgen oluşturur. Her birinin tabanı a, yüksekliği ρ olduğundan toplam alan S=n·a·ρ/2=Ç·ρ/2 olur. Köşeye uzaklık R ile kenara dik uzaklık ρ’yu birbirine karıştırma.",
        ],
      },
      {
        title: "Düzgün altıgeni altı eşkenar üçgenle gör",
        paragraphs: [
          "Düzgün altıgende merkez açısı 60°dir. Merkezden komşu iki köşeye çizilen R uzunlukları bir ikizkenar üçgen kurar; tepe açısı 60° olunca öteki iki açı da 60° olur. Üçgen eşkenardır, bu yüzden R=a’dır. Apotem bu üçgenin yüksekliğidir: ρ=a√3/2.",
          "Altı eşkenar üçgenin alanından S=6·a²√3/4=3√3·a²/2 bulunur. Çevre 6 a’dır. Bir köşe atlayan kısa köşegen a√3, karşı köşelere giden uzun köşegen 2 a’dır. Örneğin a=4 ise kısa köşegen 4√3, uzun köşegen 8 ve alan 24√3 olur.",
        ],
      },
      {
        title: "Genel çember formülünün arkasındaki dik üçgen",
        paragraphs: [
          "Düzgün n-genin merkezini ve bir kenarının iki ucunu birleştir; sonra merkezden kenara dikme indir. İkizkenar üçgen iki eş dik üçgene ayrılır. Bu yarım üçgende açı θ=180°/n, hipotenüs R, karşı kenar a/2 ve komşu kenar ρ’dur. Dik üçgende sin θ=karşı/hipotenüs, cos θ=komşu/hipotenüs, tan θ=karşı/komşu olarak tanımlanır.",
          "Buradan a=2 R·sin(180°/n), ρ=R·cos(180°/n), S=nR²·sin(360°/n)/2 ve S=n·a²/[4 tan(180°/n)] elde edilir. Bu tamamlayıcı bağıntılarda açı birimi derecedir. Önce şekli tanıdığın üçgenlere ayırmak, özellikle kare ve altıgende daha az işlem gerektirir; trigonometrik bağıntılar bu ayrımın genel yazımıdır.",
        ],
      },
      {
        title: "Beşgenin özel oranı ve sonuç denetimi",
        paragraphs: [
          "Düzgün beşgende iç açı 108°, dış açı 72°dir. Köşegenin kenara oranı (1+√5)/2’dir; bu sayıya altın oran denir. Kenar a ise her köşegen a·(1+√5)/2 olur. Bu bağıntı düzgün beşgene aittir; sıradan beşgenin köşegenleri eşit olmak zorunda değildir.",
          "Çözüm sonunda hem n’nin tam sayı olduğunu hem de istenenin açı mı uzunluk mu alan mı olduğunu denetle. Uzunluk birimle, alan birimkareyle yazılır. Düzgünlük yoksa eşit açı veya eşit kenar varsayma. Modelde köşegenleri açıp kapatmak bir açıklama aracıdır; bağımsız soru başarısının yerine geçmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Bir köşeden tüm şekle",
        prompt:
          "Dışbükey bir çokgende bir köşeden 9 köşegen çiziliyor. Bütün köşegenlerin sayısı kaçtır?",
        strategy: "Önce n−3’ten kenar sayısını, sonra çift saymayı düzelt.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Bir köşedeki köşegen sayısı n−3=9 olduğundan n=12 bulunur.",
          },
          {
            label: "2. adım",
            explanation:
              "Her köşede 9 köşegen sayılırsa 12·9=108 uç sayımı olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Her köşegen iki kez sayıldığı için 108/2=54 farklı köşegen vardır.",
          },
        ],
        answer: "54 köşegen.",
        check:
          "Onikigenin iç açı toplamı ayrıca 10·180°=1800° olur; n≥3 tam sayıdır.",
        pitfall: "9 sayısını çokgenin kenar sayısı sanma.",
      },
      {
        title: "Açıdan kenar sayısına",
        prompt:
          "Düzgün bir çokgenin bir iç açısı 156°dir. Kenar sayısı ve köşegen sayısı kaçtır?",
        strategy: "İç açıyı komşu dış açıya dönüştür.",
        steps: [
          {
            label: "1. adım",
            explanation: "Dış açı 180°−156°=24°dir.",
          },
          {
            label: "2. adım",
            explanation:
              "Aynı yöndeki dış açılar 360°yi tamamlar: n=360/24=15.",
          },
          {
            label: "3. adım",
            explanation: "Toplam köşegen sayısı 15·(15−3)/2=90 bulunur.",
          },
        ],
        answer: "15 kenar ve 90 köşegen.",
        check: "15·24°=360°;15·156°=2340°=(15−2)·180°.",
        pitfall: "156°yi doğrudan 360°ye bölme.",
      },
      {
        title: "Altıgen alanını parçalarla bul",
        prompt: "Düzgün altıgenin kenarı 4 cm. Uzun köşegeni ve alanı nedir?",
        strategy: "Merkezden altı eşkenar üçgen oluştur.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Merkez açısı 360°/6=60° olduğu için merkezden köşeye uzaklık da 4 cm olur.",
          },
          {
            label: "2. adım",
            explanation:
              "Karşı iki köşe merkezden geçtiğinden uzun köşegen 2·4=8 cm’dir.",
          },
          {
            label: "3. adım",
            explanation:
              "Her eşkenar üçgenin alanı 4²√3/4=4√3 cm², altısının toplamı 24√3 cm²’dir.",
          },
        ],
        answer: "Uzun köşegen 8 cm, alan 24√3 cm².",
        check: "Çevre 24 cm ve apotem 2√3 cm olduğundan Ç·ρ/2=24√3 cm².",
        pitfall: "Kısa köşegen 4√3 ile uzun köşegen 8’i karıştırma.",
      },
      {
        title: "Verilen açıyla şekil kurulabilir mi?",
        prompt:
          "Bütün kenarları ve iç açıları eşit bir çokgenin iç açısı 145° olabilir mi?",
        strategy: "Bulduğun n’yi tam sayı koşuluyla denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "İç açı 145° ise dış açı 180°−145°=35° olur.",
          },
          {
            label: "2. adım",
            explanation:
              "Düzgün çokgende n·35°=360° olmalı, buradan n=72/7 çıkar.",
          },
          {
            label: "3. adım",
            explanation:
              "Kenar sayısı tam sayı olmalıdır;72/7 bu koşulu sağlamaz. Böyle bir düzgün çokgen kurulamaz.",
          },
        ],
        answer: "Hayır, kurulamaz.",
        check:
          "n=10 için iç açı 144°, n=11 için yaklaşık 147,27°dir;145° arada kalır.",
        pitfall: "Ondalıklı kenar sayısını yuvarlayıp başka bir çokgen üretme.",
      },
    ],
    recall: [
      {
        prompt: "İç açı toplamını n−2 üçgenle açıkla.",
        answer:
          "Dışbükey n-gen bir köşeden n−2 üçgene ayrılır; her üçgen 180°verir, toplam(n−2)·180°dir.",
      },
      {
        prompt:
          "Bir köşeden çıkan köşegenle bütün köşegenleri neden farklı sayarsın?",
        answer:
          "Bir köşeden n−3 çıkar; tüm köşelerden sayım her köşegeni iki uçtan gördüğü için toplam n(n−3)/2 olur.",
      },
      {
        prompt: "Düzgün çokgende iç açıdan n’yi nasıl bulur ve denetlersin?",
        answer:
          "δ=180°−α, n=360°/δ; n≥3 tam sayı olmalıdır. Kenar ve açı eşitliği birlikte gerekir.",
      },
      {
        prompt:
          "Düzgün altıgende R, a, apotem ve iki köşegen türünü karşılaştır.",
        answer: "R=a, apotem a√3/2; kısa köşegen a√3, uzun köşegen 2 a’dır.",
      },
    ],
    items: [
      {
        prompt:
          "Basit ve dışbükey bir yedigenin iç açıları toplamı kaç derecedir?",
        options: ["900°", "1260°", "720°", "1080°", "360°"],
        knowledge: ["Basit n-gende iç açı toplamı(n−2)·180°dir."],
        strategy: "Yedi kenarı formüle yerleştir.",
        steps: [
          "n=7 alınır.",
          "Yedigen bir köşeden 5 üçgene ayrılır.",
          "5·180°=900° bulunur.",
        ],
        optionReasons: [
          "Beş üçgenin toplamı 900°dir.",
          "7·180° köşe sayısını üçgen sayısı sanır.",
          "720°altıgenin toplamıdır.",
          "1080°sekizgenin toplamıdır.",
          "360°dış açıların toplamıdır.",
        ],
        commonError: "İç açı toplamını dış açı toplamıyla karıştırma.",
        check: "(900/180)+2=7 kenar geri elde edilir.",
      },
      {
        prompt: "Dışbükey bir onbirgenin farklı köşegen sayısı kaçtır?",
        options: ["44", "88", "8", "9", "55"],
        knowledge: ["Köşegen sayısı n(n−3)/2’dir."],
        strategy: "Uçlardan çift saymayı ikiye böl.",
        steps: [
          "n=11 olduğundan bir köşeden 8 köşegen çıkar.",
          "11·8=88 uç sayımı olur.",
          "Her köşegenin iki ucu olduğu için 88/2=44.",
        ],
        optionReasons: [
          "11·8/2=44 doğru sayımdır.",
          "88 her köşegeni iki kez sayar.",
          "8 yalnız bir köşeden çizilen sayıdır.",
          "9 bir köşeden oluşan üçgen sayısıdır.",
          "55 bütün köşe çiftleri olup 11 kenarı da içerir.",
        ],
        commonError: "Kenarları köşegen sayımına katma.",
        check: "11·10/2−11=55−11=44.",
      },
      {
        prompt:
          "Dışbükey bir çokgenin bir köşesinden 9 köşegen çıkıyor. Bütün köşegenleri kaç tanedir?",
        options: ["54", "108", "36", "45", "66"],
        knowledge: ["Bir köşeden çıkan köşegen sayısı n−3’tür."],
        strategy: "Önce n’yi bul, sonra toplam köşegenleri say.",
        steps: [
          "n−3=9 eşitliğinden n=12.",
          "Oniki köşede 12·9=108 uç sayımı vardır.",
          "108/2=54 farklı köşegen bulunur.",
        ],
        optionReasons: [
          "n=12 için 12·9/2=54.",
          "108 iki uçtan yapılan çift sayımdır.",
          "36,9’u kenar sayısı sanıp 9·8/2 köşe çiftini, kenarlar dahil sayar; verilen 9 bir köşeden çıkan köşegendir.",
          "45 n=10 için bütün köşe çiftlerini sayar; burada n=12.",
          "66 oniki köşenin bütün çiftlerini sayar, kenarları çıkarmaz.",
        ],
        commonError: "Bir köşeye ait sayı ile bütün şekle ait sayıyı ayır.",
        check: "12·11/2−12=54.",
      },
      {
        prompt: "Düzgün bir çokgenin bir dış açısı 24°dir. Kaç kenarı vardır?",
        options: ["15", "24", "12", "18", "30"],
        knowledge: [
          "Düzgün çokgende aynı yöndeki dış açıların toplamı 360°dir.",
        ],
        strategy: "360°yi tek dış açıya böl.",
        steps: [
          "Bütün dış açılar 24°dir.",
          "n·24°=360°eşitliği kurulur.",
          "n=15 bulunur.",
        ],
        optionReasons: [
          "360/24=15.",
          "24 açının ölçüsüdür, kenar sayısı değildir.",
          "12 kenar 30°dış açı verir.",
          "18 kenar 20°dış açı verir.",
          "30 kenar 12°dış açı verir.",
        ],
        commonError: "İç açı toplamı formülüyle gereksiz denklem kurma.",
        check: "15·24°=360°.",
      },
      {
        prompt:
          "Bir iç açısı 156°olan düzgün çokgenin farklı köşegen sayısı kaçtır?",
        options: ["90", "105", "15", "180", "77"],
        knowledge: ["İç açı ile komşu dış açı 180°yi tamamlar; D=n(n−3)/2."],
        strategy: "Önce dış açıdan n’yi hesapla.",
        steps: [
          "Dış açı 180−156=24°dir.",
          "Kenar sayısı 360/24=15’tir.",
          "D=15·12/2=90 bulunur.",
        ],
        optionReasons: [
          "Onbeşgende 90 köşegen vardır.",
          "105 bütün köşe çiftleridir;15 kenar çıkarılmalıdır.",
          "15 kenar sayısıdır, köşegen sayısı değil.",
          "180 her köşegeni iki kez sayar.",
          "77 ondörtgenin köşegen sayısıdır.",
        ],
        commonError: "156°yi doğrudan 360°ye bölme.",
        check: "15·14/2−15=90.",
      },
      {
        prompt:
          "Düzgün bir çokgenin bir iç açısı 140°dir. Bu çokgen kaç üçgene bir köşeden ayrılır?",
        options: ["7", "9", "6", "8", "14"],
        knowledge: [
          "Dış açı 180°−iç açı; dışbükey n-gen bir köşeden n−2 üçgene ayrılır.",
        ],
        strategy: "Önce kenar sayısını sonra üçgen sayısını bul.",
        steps: [
          "Dış açı 40°dir.",
          "n=360/40=9 bulunur.",
          "Bir köşeden 9−2=7 üçgen oluşur.",
        ],
        optionReasons: [
          "Dokuzgende yedi üçgen oluşur.",
          "9 kenar sayısıdır.",
          "6 bir köşeden çıkan köşegen sayısıdır.",
          "8 üçgen elde etmek için n=10 gerekir.",
          "14 üçgen sayısını iki kez sayar.",
        ],
        commonError: "Köşegen sayısıyla üçgen sayısı bir farklıdır.",
        check: "7·180°=1260°ve 9·140°=1260°.",
      },
      {
        prompt:
          "Aşağıdaki iç açı ölçülerinden hangisi bir düzgün çokgene ait OLAMAZ?",
        options: ["145°", "60°", "90°", "120°", "150°"],
        knowledge: ["Düzgün çokgende n=360/(180−α), n≥3 tam sayı olmalıdır."],
        strategy: "Her seçeneğin verdiği dış açıyı denetle.",
        steps: [
          "145°için dış açı 35°olur.",
          "360/35=72/7 tam sayı değildir.",
          "60°, 90°, 120° ve 150° iç açıları sırasıyla 3, 4, 6 ve 12 kenara karşılık gelir.",
        ],
        optionReasons: [
          "145°tam sayı kenar sayısı vermez.",
          "60°eşkenar üçgenin iç açısıdır.",
          "90°karenin iç açısıdır.",
          "120°düzgün altıgenin iç açısıdır.",
          "150°düzgün onikigenin iç açısıdır.",
        ],
        commonError: "Kenar sayısında yaklaşık tam sayı kabul etme.",
        check: "72/7’yi yuvarlamak verilen açıyı değiştirir.",
      },
      {
        prompt:
          "Dışbükey bir sekizgende aynı yönde seçilmiş yedi dış açının toplamı 318°dir. Kalan dış açı kaç derecedir?",
        options: ["42°", "138°", "102°", "48°", "72°"],
        knowledge: [
          "Her köşeden aynı yönde bir dış açı seçilince toplam 360°olur.",
        ],
        strategy: "Bilinen toplamı bir tam dönüşten çıkar.",
        steps: [
          "Sekiz dış açının toplamı 360°dir.",
          "Yedisi 318°olduğuna göre 318+x=360 kurulur.",
          "x=42°bulunur.",
        ],
        optionReasons: [
          "360−318=42°dir.",
          "138°bulunan dış açının komşu iç açısıdır.",
          "102°360°toplam koşulunu sağlamaz.",
          "48°için toplam 366°olurdu.",
          "72°düzgün beşgenin dış açısıdır; sekizgen düzgün verilmedi.",
        ],
        commonError: "Düzgünlük verilmeden 360/8 yapma.",
        check: "318+42=360 ve 42>0.",
      },
      {
        prompt: "Kenar uzunluğu 4 cm olan düzgün altıgenin alanı kaç cm²dir?",
        options: ["24√3", "16√3", "48√3", "24", "48"],
        knowledge: [
          "Düzgün altıgen altı eşkenar üçgene ayrılır; eşkenar üçgen alanı a²√3/4’tür.",
        ],
        strategy: "Bir küçük üçgenin alanını altıyla çarp.",
        steps: [
          "a=4 olduğunda bir üçgenin alanı 16√3/4=4√3.",
          "Altı eş üçgen vardır.",
          "Toplam alan 6·4√3=24√3 cm²dir.",
        ],
        optionReasons: [
          "Altı eşkenar üçgen 24√3 alan verir.",
          "16√3 dört küçük üçgeni sayar.",
          "48√3 alanı iki kat alır.",
          "24 çevrenin sayısal değeridir; alan değildir.",
          "48 apotem yerine kenarı yükseklik alır.",
        ],
        commonError: "Kenar uzunluğunu eşkenar üçgenin yüksekliği sanma.",
        check: "Çevre 24, apotem 2√3;24·2√3/2=24√3.",
      },
      {
        prompt:
          "Düzgün bir altıgende bir köşe atlayan kısa köşegen 6√3 birimdir. Çevre kaç birimdir?",
        options: ["36", "18", "12√3", "36√3", "72"],
        knowledge: ["Düzgün altıgende kısa köşegen a√3, çevre 6 a’dır."],
        strategy: "Önce kısa köşegenden a’yı bul.",
        steps: [
          "a√3=6√3 eşitliğinde a=6.",
          "Altı eş kenarın her biri 6 birimdir.",
          "Çevre 6·6=36 birim olur.",
        ],
        optionReasons: [
          "Altı kenarın toplamı 36’dır.",
          "18 kenar sayısını üç alır.",
          "12√3 iki kısa köşegenin toplamıdır.",
          "36√3 kısa köşegeni kenar sanır.",
          "72 uzun köşegeni kenar yerine kullanır.",
        ],
        commonError:
          "Kısa köşegen ile karşı köşeleri birleştiren uzun köşegeni ayır.",
        check: "Kenar 6 ise kısa köşegen 6√3 verilenle aynıdır.",
      },
      {
        prompt:
          "Düzgün bir dörtgenin kenarı 6 birim, merkezinin bir kenara dik uzaklığı 3 birimdir. Çevre ve apotemi kullanarak bulunan alan kaç birimkaredir?",
        options: ["36", "72", "18", "24", "9"],
        knowledge: ["Düzgün çokgende S=çevre·apotem/2’dir."],
        strategy: "Önce çevreyi sonra üçgen alanlarının toplamını bul.",
        steps: [
          "Çevre 4·6=24 birimdir.",
          "Apotem merkezden kenara dik olan 3 birimdir.",
          "Alan 24·3/2=36 birimkaredir.",
        ],
        optionReasons: [
          "24·3/2=36 doğru alan hesabıdır.",
          "72 yarım çarpanını unutur.",
          "18 yalnız kenarla apotemin çarpımıdır; dört üçgenin toplamı değildir.",
          "24 çevredir, alan değildir.",
          "9 yalnız apotemin karesidir.",
        ],
        commonError: "Apotemi merkezden köşeye uzaklık sanma.",
        check: "Düzgün dörtgen kare olduğundan 6²=36 sonucu da aynı olmalıdır.",
      },
      {
        prompt:
          "Bir basit çokgenin düzgün olduğunu kesin olarak gösteren koşul hangisidir?",
        options: [
          "Bütün kenarları ve bütün iç açıları eşittir.",
          "Bütün kenarları eşittir.",
          "Bütün iç açıları eşittir.",
          "Köşegenlerinden ikisi eşittir.",
          "İç açıları toplamı 360°dir.",
        ],
        knowledge: [
          "Düzgünlük hem eş kenar hem eş açı koşulunu birlikte gerektirir.",
        ],
        strategy: "Tek koşula karşı örnek ara.",
        steps: [
          "Eşkenar ama 60°–120°açılı dörtgen düzgün değildir.",
          "Dört dik açılı 3×5 dikdörtgen de düzgün değildir.",
          "İki eşitliğin birlikte verilmesi düzgünlük tanımını sağlar.",
        ],
        optionReasons: [
          "Tanımın iki gerekli koşulu da verilir.",
          "Eşkenar dörtgen kare olmayabilir.",
          "Dikdörtgenin kenarları eşit olmayabilir.",
          "İki eş köşegen bütün kenar ve açıları belirlemez.",
          "Her basit dörtgenin toplamı 360°dir; düzgünlük çıkmaz.",
        ],
        commonError: "Bir özelliği tanımın tamamı sanma.",
        check: "Kare hem eş kenarlı hem eş açılıdır.",
      },
      {
        prompt:
          "Düzgün bir beşgenin kenarı 2 birimdir. Bir köşegeninin uzunluğu kaç birimdir?",
        options: ["1+√5", "2√5", "√5", "4", "2+√5"],
        knowledge: ["Düzgün beşgende köşegen/kenar oranı(1+√5)/2’dir."],
        strategy: "Oranı kenar uzunluğuyla çarp.",
        steps: [
          "Köşegen d için d/2=(1+√5)/2 yazılır.",
          "İki taraf 2 ile çarpılır.",
          "d=1+√5 birim bulunur.",
        ],
        optionReasons: [
          "2·(1+√5)/2=1+√5.",
          "2√5 orandaki 1 ve 2 bölenini yanlış işler.",
          "√5 toplamdaki 1’i düşürür.",
          "4 düzgün altıgenin 2 aolan uzun köşegenini beşgene taşır.",
          "2+√5 yalnız 1 terimini 2 ile çarpıp√5’i değiştirmez.",
        ],
        commonError: "Altıgen köşegen formülünü beşgene uygulama.",
        check: "1+√5 yaklaşık 3,236 olup kenardan büyüktür.",
      },
      {
        prompt:
          "Çevrel çemberinin yarıçapı 10 cm olan düzgün altıgenin alanı kaç cm²dir?",
        options: ["150√3", "300√3", "50√3", "100√3", "60"],
        knowledge: ["Düzgün altıgende çevrel yarıçap kenara eşittir."],
        strategy: "R=aile eşkenar üçgenlere geç.",
        steps: [
          "R=10 cm olduğundan a=10 cm.",
          "Alan 3√3·a²/2 formülü uygulanır.",
          "3√3·100/2=150√3 cm²bulunur.",
        ],
        optionReasons: [
          "3√3·100/2=150√3.",
          "300√3 bir bölü iki çarpanını unutur.",
          "50√3 yalnız iki eşkenar üçgenin alanıdır.",
          "100√3 altı yerine dört üçgeni sayar.",
          "60 çevredir; alan birimi değildir.",
        ],
        commonError: "Yarıçapı çap gibi ikiye bölme.",
        check: "Apotem 5√3, çevre 60;60·5√3/2=150√3.",
      },
    ],
    sheet: [
      {
        title: "Çokgen ve köşegen",
        figureTitle: "Köşegenleri çift saymadan say",
        text: [
          "Basit çokgende n≥3 tam sayı; köşegen komşu olmayan köşeleri birleştirir. Bir köşeden n−3, tümünde n(n−3)/2 köşegen.",
          "D=2n ise n’ye bölerek (n−3)/2=2 yaz. n=7 için D=14 olur. Düzgün yedigende iç açı toplamı 900°, her iç açı 900/7° olur.",
        ],
      },
      {
        title: "İç ve dış açı toplamları",
        text: [
          "Basit n-gende iç açı toplamı(n−2)·180°. Dışbükeyde aynı yönde birer dış açı toplam 360°; içbükeyde yönlü dönüş işareti gerekir.",
        ],
      },
      {
        title: "Düzgünlük ve varlık",
        text: [
          "Bütün kenarlar ve bütün iç açılar eşit olmalı. δ=360°/n, α=180°−δ. n=360°/δ en az 3 tam sayı olmalı.",
        ],
      },
      {
        title: "Merkez, çevre ve alan",
        text: [
          "Kenar a, apotemρ ise Ç=na, S=naρ/2. Çevrel yarıçap R: a=2 Rsin(180°/n),ρ=Rcos(180°/n).",
        ],
      },
      {
        title: "Altıgen ve beşgen",
        text: [
          "Düzgün altıgende R=a,ρ=a√3/2, S=3√3 a²/2; kısa köşegen a√3, uzun 2 a. Düzgün beşgende köşegen/kenar=(1+√5)/2.",
        ],
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri: Çokgenler (basılı 139/PDF 141); Aurelia Tüm Geometri Özeti PDF 9 ve Çokgenler PDF fiziksel 5 (G1). Kaynak kavramlarından yazılmış özgün anlatım ve öğretim soruları.",
    minutes: 42,
    id: "tyt-geo-cokgenler-032",
  },
  {
    title: "Dörtgenler: sınıflar, köşegenler ve yamuk",
    sections: [
      {
        title: "Dört köşe, iki köşegen ve bir kapalı çevre",
        paragraphs: [
          "Dörtgeni adlandırırken köşeleri çevre boyunca sırayla yaz: ABCD dörtgeninde kenarlar AB, BC, CD, DA; köşegenler AC veBD’dir. Birbirini kesen papyon çizimini bu dersteki basit dörtgenler sınıfına katmayız. Herhangi üç köşenin aynı doğru üzerinde olmadığı, kenarların yalnız komşu uçlarda birleştiği durumları inceleriz.",
          "Dışbükey dörtgenin bütün iç açıları 180°den küçüktür ve iki köşegen de içeride kalır. İçbükey dörtgende bir iç açı 180°den büyüktür. Çizimdeki küçük boşluğu ölçüp iç açı yerine koymak hatalıdır; hangi bölgenin şeklin içinde kaldığını belirle.",
        ],
      },
      {
        title: "360° toplamının gerekçesi",
        paragraphs: [
          "Dışbükey bir dörtgende bir köşegen şekli iki üçgene böler. İki üçgenin açıları birlikte dörtgenin dört iç açısını verir; toplam 180°+180°=360°dir. Basit içbükey dörtgende uygun iç köşegenle yine iki üçgen oluşur ve iç açı toplamı 360°kalır.",
          "Dışbükeyde çevre boyunca aynı yönde seçilen birer dış açının toplamı da 360°dir. Dışbükey olmak bütün açıların eşit olduğunu söylemez. Dört iç açı eşitse her biri 90°olur; şekil dikdörtgendir, ama kare demek için kenar eşitliği de gerekir.",
        ],
      },
      {
        title: "Sınıfları birbiri içinde oku",
        paragraphs: [
          "Bu derste MEBİ’nin kapsayıcı tanımı kullanılır: en az bir çift karşı kenarı paralel olan dörtgen yamuktur. İki karşı kenar çifti paralelse paralelkenardır; bu yüzden her paralelkenar aynı zamanda yamuktur. Bazı kaynaklar yamuğu yalnız bir paralel kenar çiftiyle sınırlar; böyle bir soruda verilen tanım ayrıca okunmalıdır.",
          "Dikdörtgen dört dik açılı paralelkenardır. Eşkenar dörtgen dört eş kenarlı paralelkenardır. Kare ikisinin ortak özel durumudur: dört kenarı ve dört açısı eşittir. Eşkenar dörtgen aynı zamanda deltoiddir. Bir kareye dikdörtgen demek yanlış değildir; bu sözcük ek özelliği yok saymaz, daha geniş sınıfı belirtir.",
        ],
      },
      {
        title: "Deltoidde komşu eş çiftleri bul",
        paragraphs: [
          "Dışbükey ABCD dörtgeninde AB=AD veCB=CD ise şekil bir deltoiddir. Eş uzunluklar komşu kenarlardadır; yalnız AB=CD veBC=AD yazmak deltoid tanımı değil, karşı kenar eşitliğidir. ABC ileADC üçgenleri üç kenardan eştir.",
          "AC doğrusu simetri eksenidir; A veC açılarını ikiye böler, BD’ye diktir veBD’yi ortalar. B ileD açıları eşittir. BD’nin AC’yi ortalaması veya köşegenlerin eşit olması genel olarak gerekmez. Köşegenler dik olduğu için alan S=AC·BD/2’dir. AB=a, BC=b ise çevre 2(a+b) olur.",
        ],
      },
      {
        title: "Paralel tabanlar açıları ve alanı bağlar",
        paragraphs: [
          "AB∥CD olan dışbükey yamukta AB veCD tabandır. Bu tabanlar arasındaki dik uzaklık h yüksekliktir; eğik yan kenar h değildir. AD yan kenarındaki A veD iç açıları, BC yan kenarındaki B veC iç açıları bütünlerdir. Genel yamukta aynı tabanın iki açısı eşit olmak zorunda değildir.",
          "Taban uzunlukları a veb ise alan S=(a+b)h/2 olur. İki eş yamuğu ters yönlerle birleştirdiğinde tabanı a+b, yüksekliği h olan paralelkenar oluşur; bir yamuğun alanı bunun yarısıdır. Alanla çevreyi ayır: çevre için dört kenar gerekir, taban ve yükseklik tek başına yetmez.",
        ],
      },
      {
        title: "Orta taban ve köşegenlerdeki küçük parçalar",
        paragraphs: [
          "Yamuğun paralel olmayan yan kenarlarının orta noktalarını birleştiren EF parçası tabanlara paraleldir ve orta tabandır. Uzunluğu(a+b)/2’dir. Bu yüzden alanı orta taban·yükseklik olarak da yazabilirsin. Orta taban köşegen değildir; uçları karşı köşeler değil, kenar orta noktalarıdır.",
          "Alt taban a≥b üst taban olsun. Köşegenlerin orta tabanla kesiştiği iki nokta arasındaki parça(a−b)/2, orta tabanın iki ucunda kalan parçalar b/2’dir. Toplam b/2+(a−b)/2+b/2=(a+b)/2 olur. a=b olduğunda ortadaki parça sıfırdır; paralelkenarın köşegenleri aynı orta noktada buluşur.",
        ],
      },
      {
        title: "Dik ve ikizkenar yamukta yardımcı dikmeler",
        paragraphs: [
          "Dik yamukta tabanlara dik olan yan kenar yüksekliktir. Diğer yan kenar h ve|a−b| ile dik üçgen oluşturur; uzunluğu√(h²+(a−b)²) olur. Çizimde diklik verilmeden bir yan kenarı yükseklik sayma.",
          "İkizkenar yamukta yan kenarlar eşittir; aynı tabana komşu açılar ve iki köşegen eşittir. Tabanlar a≥b, yan kenar ℓ ise kısa tabanın uçlarından dikmeler inince fark ikiye bölünür:(a−b)/2. Pisagor’dan h=√(ℓ²−((a−b)/2)²) çıkar. Yükseklik pozitif olmalıdır. Paralelkenar sınırında ek dik açı koşulu yoksa eş yan kenar tek başına klasik ikizkenar yamuk simetrisini zorunlu kılmaz; bu paragrafta a>b durumu kullanılır.",
        ],
      },
      {
        title: "Köşegenleri dik olan her şekil kare değildir",
        paragraphs: [
          "Dışbükey dörtgende köşegenler AC veBD O’da dik kesişsin. Dört küçük dik üçgen için Pisagor yazıldığında AB²=AO²+BO², BC²=CO²+BO², CD²=CO²+DO² veDA²=AO²+DO² olur. Böylece AB²+CD²=BC²+DA² elde edilir.",
          "Bu kareler toplamı eşitliği köşegenleri dik olan genel dörtgene aittir; bütün kenarların veya köşegenlerin eşit olduğu anlamına gelmez. Dik köşegenli dışbükey dörtgenin alanı AC·BD/2’dir. Köşegenler arasında θ açısı varsa genel alan AC·BD·sinθ/2 olur;θ=90°için sinθ=1’e iner.",
        ],
      },
      {
        title: "Kenar orta noktaları gizli bir paralelkenar kurar",
        paragraphs: [
          "Dışbükey ABCD dörtgeninde E, F, G, H sırasıyla AB, BC, CD, DA’nın orta noktaları olsun. ABC üçgeninin orta tabanından EF∥AC veEF=AC/2 bulunur. ADC üçgeninden HG∥AC veHG=AC/2 gelir. Benzer biçimde FG veEH, BD’ye paralel veBD/2 uzunluğundadır.",
          "Dik köşegenli örnekte AC=8, BD=14 birim olsun. Orta noktaların kurduğu dikdörtgenin kenarları 4 ve 7, çevresi 22 birim ve alanı 28 birim²’dir. İlk dörtgenin alanı 8·14/2=56 olduğundan sonuç alanın yarısıdır.",
          "Bu nedenle EFGH her zaman paralelkenardır; ilk dörtgenin de paralelkenar olması gerekmez. Çevresi AC+BD, alanı ilk dörtgenin alanının yarısıdır. Köşegenler dikse orta noktalar şekli dikdörtgen; köşegenler eşitse eşkenar dörtgen olur. Hem dik hem eş köşegenler varsa orta noktalar şekli karedir.",
        ],
      },
      {
        title: "Açıortaylarda hangi açıları yarıya böldüğünü yaz",
        paragraphs: [
          "Dışbükey ABCD dörtgeninde B veC iç açılarının açıortayları E’de kesişsin. BEC üçgeninde B açısı B/2, C açısı C/2’dir. O halde ∠BEC=180°−(B+C)/2=(A+D)/2 olur. Formülün harfleri, hangi komşu iki köşenin açıortayını aldığınla birlikte okunmalıdır.",
          "Karşı iki köşenin açıortay doğruları için küçük açı, diğer karşı açılar farkının mutlak değerinin yarısına bağlıdır. Örneğin B veD açıortay doğruları kesişiyorsa küçük açı |A−C|/2’dir. A=C sınırında doğrular paralel veya çakışık olabilir; her durumda varmış gibi bir kesişim noktası tanımlama. Şekil içindeki belirli bir geniş açıyı soruyorsa küçük açının bütünlerine geçmek gerekebilir.",
        ],
      },
      {
        title: "Yamukta köşegen oranı ve benzerlik",
        paragraphs: [
          "AB∥CD, AB=a, CD=b olan dışbükey yamukta köşegenler O’da kesişsin. AOB ileCOD üçgenlerinin tepe açıları ters, açı çiftleri paralellikten eşittir; iki üçgen benzerdir. Karşılıkları A↔C, B↔D olduğundan AO/OC=BO/OD=a/b’dir.",
          "Oranı rastgele çaprazlamadan önce büyük ve küçük tabanı aynı sırayla yaz. a=b olduğunda oran 1 olur ve köşegenler birbirini ortalar; bu paralelkenar durumudur. Genel yamukta bir köşegenin iki parçasının eşit olduğunu varsayma. Orta tabanla kesişim noktaları ile iki köşegenin kendi kesişimini de ayrı adlandır.",
        ],
      },
      {
        title: "Çember koşulları ve kullanmadan önce kontrol",
        paragraphs: [
          "Dışbükey bir dörtgenin bütün köşeleri aynı çember üzerindeyse çemberseldir; karşı iç açıları toplam 180°dir. Bir dış açı da karşı köşedeki iç açıya eşittir. Bu özellik, üzerinde çember çizilmemiş herhangi bir dörtgende kendiliğinden kullanılamaz.",
          "Bir çember dışbükey dörtgenin dört kenarına içeriden teğetse aynı köşeden çıkan teğet parçaları eşittir. Buradan karşı kenar toplamları AB+CD=BC+DA ve alan S=r·s çıkar; r içteğet çemberin yarıçapı, s çevrenin yarısıdır. Yarıçapı bulurken çember merkezinin kenarlara dik uzaklıklarının eşitliğini kullan. Çevre bilgisi tek başına yarıçapın sayısal değerini vermez.",
        ],
      },
    ],
    examples: [
      {
        title: "Kapsayıcı sınıfı doğru seç",
        prompt:
          "Bütün kenarları eşit ve dört açısı dik olan dörtgen hangi sınıflara girer?",
        strategy: "En özel addan başlayıp içerdiği geniş sınıflara çık.",
        steps: [
          {
            label: "1. adım",
            explanation: "Dört eş kenar ve dört dik açı kareyi tanımlar.",
          },
          {
            label: "2. adım",
            explanation:
              "Kare aynı zamanda dikdörtgen, eşkenar dörtgen ve deltoiddir.",
          },
          {
            label: "3. adım",
            explanation:
              "İki karşı kenar çifti paralel olduğundan paralelkenar ve bu dersteki tanımla yamuktur.",
          },
        ],
        answer:
          "Kare, dikdörtgen, eşkenar dörtgen, deltoid, paralelkenar, yamuk ve dörtgen.",
        check: "Kare olmak daha geniş bir sınıfa ait olmayı engellemez.",
        pitfall: "Sınıfları birbirinden tamamen ayrı kutular sanma.",
      },
      {
        title: "Orta tabandan alana",
        prompt:
          "Bir dışbükey yamuğun paralel tabanları 6 cm ve 12 cm, yüksekliği 5 cm. Orta taban ve alan kaçtır?",
        strategy: "İki tabanın ortalamasını yükseklikle ilişkilendir.",
        steps: [
          {
            label: "1. adım",
            explanation: "Orta taban(6+12)/2=9 cm’dir.",
          },
          {
            label: "2. adım",
            explanation: "Alan orta taban·yükseklik olduğundan 9·5=45 cm²dir.",
          },
          {
            label: "3. adım",
            explanation: "Doğrudan(6+12)·5/2 hesabı da 45 cm²verir.",
          },
        ],
        answer: "Orta taban 9 cm, alan 45 cm².",
        check: "Yükseklik tabanlara dik ölçülür.",
        pitfall: "Eğik yan kenarı yüksekliğin yerine koyma.",
      },
      {
        title: "Köşegenlerden orta noktalar çevresine",
        prompt:
          "Dışbükey bir dörtgenin köşegenleri 10 birim ve 18 birim. Kenar orta noktaları sırayla birleştirilince oluşan şeklin çevresi kaçtır?",
        strategy: "Üçgen orta tabanından yeni kenarları bul.",
        steps: [
          {
            label: "1. adım",
            explanation: "Orta noktalar şeklinin iki kenarı 10/2=5 birimdir.",
          },
          {
            label: "2. adım",
            explanation: "Diğer iki kenarı 18/2=9 birimdir.",
          },
          {
            label: "3. adım",
            explanation: "Çevre 2·5+2·9=28 birim olur.",
          },
        ],
        answer: "28 birim.",
        check: "Bu sonuç köşegenlerin dik veya eş olmasını gerektirmez.",
        pitfall: "Köşegenleri yeni şeklin tam kenarı sanıp çevreyi 56 bulma.",
      },
      {
        title: "Kareler toplamını gerekçelendir",
        prompt:
          "Köşegenleri dik kesişen dışbükey ABCD dörtgeninde AB=5, BC=√52 veCD=10 birim. DA kaç birimdir?",
        strategy:
          "Dört küçük dik üçgende Pisagor’un ortak parçalarını eşleştir.",
        steps: [
          {
            label: "1. adım",
            explanation: "AB²+CD²=BC²+DA²olmalıdır.",
          },
          {
            label: "2. adım",
            explanation: "25+100=52+DA²eşitliğinden DA²=73 bulunur.",
          },
          {
            label: "3. adım",
            explanation: "Kenar uzunluğu pozitif olduğu için DA=√73 birimdir.",
          },
        ],
        answer: "√73 birim.",
        check:
          "25+100=52+73=125; örneğin AO=3, BO=4, CO=6, DO=8 koordinat parçaları bütün kenarları gerçekleştirir.",
        pitfall:
          "Kenar uzunluklarını doğrudan toplama; kareler toplamı gerekir.",
      },
      {
        title: "Komşu açıortayların kesişimi",
        prompt:
          "Dışbükey ABCD dörtgeninde A=80°, D=100°. B veC iç açılarının açıortayları E’de kesişiyor. ∠BEC kaçtır?",
        strategy: "BEC üçgeninde yarım açıları kullan.",
        steps: [
          {
            label: "1. adım",
            explanation: "Dörtgen toplamından B+C=360−80−100=180°bulunur.",
          },
          {
            label: "2. adım",
            explanation:
              "BEC üçgeninde B veC köşelerindeki açılar B/2 veC/2 olduğundan toplamları 90°dir.",
          },
          {
            label: "3. adım",
            explanation: "Üçgenin kalan açısı 180−90=90°olur.",
          },
        ],
        answer: "90°.",
        check: "(A+D)/2=(80+100)/2=90°aynı sonucu verir.",
        pitfall:
          "Açıortayların bulunduğu köşelerle tamamlayıcı iki köşeyi karıştırma.",
      },
    ],
    recall: [
      {
        prompt: "Kareye yamuk demek hangi tanımda doğrudur?",
        answer:
          "Yamuk en az bir çift karşı kenarı paralel dörtgen olarak tanımlandığında kare de yamuktur.",
      },
      {
        prompt: "Deltoidde hangi köşegen diğerini ortalar?",
        answer:
          "AB=AD ve CB=CD ise AC simetri köşegeni BD’yi ortalar ve ona diktir; BD’nin AC’yi ortalaması gerekmez.",
      },
      {
        prompt:
          "Kenar orta noktaları şeklinin çevresini eski köşegenlerle açıkla.",
        answer:
          "Yeni şeklin iki kenarı AC/2, diğer ikisi BD/2 olduğundan çevresi AC+BD’dir; alanı eski alanın yarısıdır.",
      },
      {
        prompt:
          "Yamuğun orta tabanı ile köşegenler arasındaki küçük parçayı ayır.",
        answer:
          "Tabanlar a≥b ise orta taban(a+b)/2, orta tabanda köşegenler arasında kalan parça(a−b)/2’dir.",
      },
    ],
    items: [
      {
        prompt:
          "Basit bir dışbükey ABCD dörtgeninde A=78°, B=104°, C=91°dir. D kaç derecedir?",
        options: ["87°", "93°", "47°", "180°", "273°"],
        knowledge: ["Basit dörtgende iç açı toplamı 360°dir."],
        strategy: "Bilinen üç açının toplamını çıkar.",
        steps: [
          "78+104+91=273°bulunur.",
          "273+D=360 eşitliği kurulur.",
          "D=87°olur.",
        ],
        optionReasons: [
          "360−273=87°dir.",
          "93°toplamı 366°yapar.",
          "47°için toplam 320°kalır.",
          "180°dışbükey köşe koşuluna da uymaz.",
          "273°bilinen üç açının toplamıdır.",
        ],
        commonError: "Üçgen toplamı 180°yi dörtgene taşıma.",
        check: "78+104+91+87=360°.",
      },
      {
        prompt:
          "Basit bir içbükey dörtgenin üç iç açısı 220°,40°ve 50°dir. Dördüncü iç açı kaç derecedir?",
        options: ["50°", "130°", "90°", "140°", "−130°"],
        knowledge: ["Basit içbükey dörtgende de iç açı toplamı 360°dir."],
        strategy: "İçeri çöken köşeyi 220°olarak koru.",
        steps: [
          "Verilen iç açılar 220+40+50=310°eder.",
          "Kalan açı 360−310 ile bulunur.",
          "Sonuç 50°dir.",
        ],
        optionReasons: [
          "310+50=360°doğru toplamdır.",
          "130°220°yerine 140°kullanma yanılgısıyla oluşabilir.",
          "90°toplamı 400°yapar.",
          "140°içbükey köşenin dıştaki küçük açısıdır.",
          "−130°üçgen toplamı 180°yi kullanmaktan doğar.",
        ],
        commonError:
          "Çökük köşenin büyük iç açısını 180°den küçük açıyla değiştirme.",
        check: "220°içbükeydir; öteki üç açı pozitif ve 180°den küçüktür.",
      },
      {
        prompt:
          "Basit bir dörtgenin bütün iç açıları eşittir. Bu bilgiyle hangisi kesin söylenir?",
        options: [
          "Dikdörtgendir; kenarlarının hepsi eşit olmak zorunda değildir.",
          "Karedir.",
          "Bütün kenarları eşittir.",
          "Bir iç açısı 60°dir.",
          "Köşegenleri diktir.",
        ],
        knowledge: ["Dört eş iç açının toplamı 360°dir."],
        strategy: "Açı eşitliğini kenar eşitliğinden ayır.",
        steps: [
          "Her açı 360/4=90°olur.",
          "Dört dik açı dikdörtgen tanımını sağlar.",
          "3×5 dikdörtgen karşı örneği kare zorunluluğunu kaldırır.",
        ],
        optionReasons: [
          "Dört dik açı yeterlidir; eş kenar bilgisi yoktur.",
          "Kare için ayrıca dört kenarın eşitliği gerekir.",
          "Eş açıdan eş kenar çıkmaz.",
          "60°için toplam 240°olurdu.",
          "Genel dikdörtgenin köşegenleri dik değildir.",
        ],
        commonError: "Bir özel örneği bütün sınıfın zorunlu özelliği sanma.",
        check: "Kare de bu sınıfa girer; fakat bütün örnekler kare değildir.",
      },
      {
        prompt:
          "Dışbükey bir dörtgenin dört kenarı eşittir. Başka bilgi verilmediyse hangisi kesin doğrudur?",
        options: [
          "Eşkenar dörtgendir; dik açı koşulu zorunlu değildir.",
          "Mutlaka karedir.",
          "Her iç açısı 90°dir.",
          "Köşegenleri kesin eşit uzunluktadır.",
          "Komşu iç açıları mutlaka eşittir.",
        ],
        knowledge: ["Dört eş kenarlı dışbükey dörtgen eşkenar dörtgendir."],
        strategy: "60°–120°açılı eşkenar dörtgeni karşı örnek olarak düşün.",
        steps: [
          "Dört eş kenar eşkenar dörtgen sınıfını verir.",
          "Bu sınıfta 60°ve 120°açıları olan örnek vardır.",
          "Bu örnek kare, her yerde 90°veeş köşegen iddialarını zorunlu olmaktan çıkarır.",
        ],
        optionReasons: [
          "Eşkenar dörtgen olabilir, kare olmak zorunda değildir.",
          "Dik açı bilgisi olmadan kare denemez.",
          "60°–120°örneği bu iddiayı çürütür.",
          "Eşkenar dörtgenin köşegenleri genel olarak farklıdır.",
          "Komşu açılar bütünlerdir, eş olmaları ancak 90°durumunda gerçekleşir.",
        ],
        commonError: "Eş kenarı eş açıyla özdeşleştirme.",
        check: "Dört eş kenar ile dört dik açı ayrı koşullardır.",
      },
      {
        prompt:
          "Yamuk, en az bir çift karşı kenarı paralel dörtgen olarak tanımlanıyor. Buna göre hangi ifade kesin doğrudur?",
        options: [
          "Her kare aynı zamanda yamuk, dikdörtgen ve deltoiddir.",
          "Hiçbir paralelkenar yamuk değildir.",
          "Her yamuk karedir.",
          "Her deltoid dikdörtgendir.",
          "Her dikdörtgen eşkenar dörtgendir.",
        ],
        knowledge: [
          "Kapsayıcı sınıflandırmada kare daha geniş sınıfların koşullarını da sağlar.",
        ],
        strategy: "Her sınıfın tanımındaki koşulu ayrı denetle.",
        steps: [
          "Karenin karşı kenarları paraleldir; yamuk koşulu sağlanır.",
          "Dört dik açı dikdörtgen, dört eş kenar komşu eş çiftleriyle deltoid verir.",
          "Ters yönlü her iddia ek koşul ister.",
        ],
        optionReasons: [
          "Karenin bütün sayılan sınıfların koşulları vardır.",
          "İki paralel çift, bir paralel çift koşulunu zaten sağlar.",
          "Eşit açı ve kenar verilmeyen yamuk kare değildir.",
          "Deltoidin açıları 90°olmak zorunda değildir.",
          "Dikdörtgenin komşu kenarları 3 ve 5 olabilir.",
        ],
        commonError: "Tanımdaki en az ifadesini yalnız bir diye okuma.",
        check:
          "Kareyi sınıflandırmak onu yeniden çizmek veya değiştirmek değildir.",
      },
      {
        prompt:
          "Dışbükey bir yamuğun paralel tabanları 8 cm ve 14 cm. Yan kenarların orta noktalarını birleştiren orta taban kaç cm’dir?",
        options: ["11", "22", "6", "7", "3"],
        knowledge: [
          "Yamukta orta taban paralel tabanların aritmetik ortalamasıdır.",
        ],
        strategy: "Toplamı ikiye böl.",
        steps: [
          "Paralel taban toplamı 8+14=22 cm’dir.",
          "Orta taban=(8+14)/2 yazılır.",
          "Sonuç 11 cm’dir.",
        ],
        optionReasons: [
          "22/2=11 doğru ortalamadır.",
          "22 tabanların toplamıdır.",
          "6 tabanların farkıdır.",
          "7 yalnız uzun tabanın yarısıdır.",
          "3 taban farkının yarısıdır.",
        ],
        commonError:
          "Orta taban ile köşegenlerin ortalarını birleştiren parçayı ayır.",
        check: "8<11<14; ortalama iki tabanın arasındadır.",
      },
      {
        prompt:
          "Paralel tabanları 6 birim ve 12 birim, bu tabanlar arasındaki dik uzaklığı 5 birim olan dışbükey yamuğun alanı kaç birimkaredir?",
        options: ["45", "90", "30", "60", "18"],
        knowledge: [
          "Yamuğun alanı tabanlar toplamı ile yüksekliğin çarpımının yarısıdır.",
        ],
        strategy: "Dik uzaklığı yükseklik olarak kullan.",
        steps: [
          "Tabanlar toplamı 18 birimdir.",
          "(6+12)·5/2 işlemi kurulur.",
          "18·5/2=45 birimkare bulunur.",
        ],
        optionReasons: [
          "18·5/2=45.",
          "90 iki eş yamuğun oluşturduğu paralelkenarın alanıdır.",
          "30 yalnız küçük tabanla yüksekliğin çarpımıdır.",
          "60 yalnız büyük tabanla yüksekliğin çarpımıdır.",
          "18 taban uzunluklarının toplamıdır, alan değildir.",
        ],
        commonError: "Alan için eğik kenarı yükseklik yerine kullanma.",
        check: "Orta taban 9, yükseklik 5;9·5=45.",
      },
      {
        prompt:
          "Dışbükey ABCD yamuğunda AB∥CD, AB=16 veCD=6 birimdir. Yan kenarların orta noktalarından geçen orta taban, iki köşegeni K veL’de kesiyor. KL kaç birimdir?",
        options: ["5", "11", "3", "8", "10"],
        knowledge: [
          "Orta tabanda köşegenler arasında kalan parça taban farkının yarısıdır.",
        ],
        strategy: "Küçük uç parçalarıyla toplamı denetle.",
        steps: [
          "Orta taban(16+6)/2=11 birimdir.",
          "İki uçta kalan parçalar 6/2=3’er birimdir.",
          "KL=11−3−3=5 birimdir.",
        ],
        optionReasons: [
          "(16−6)/2=5 doğru uzunluktur.",
          "11 orta tabanın tamamıdır.",
          "3 orta tabanın bir ucundaki parçadır.",
          "8 yalnız büyük tabanın yarısıdır.",
          "10 taban farkıdır, ikiye bölünmelidir.",
        ],
        commonError:
          "Orta tabanı köşegenler arasında kalan küçük parçayla karıştırma.",
        check: "3+5+3=11.",
      },
      {
        prompt:
          "Dışbükey ABCD yamuğunda AB∥CD ve A=68°dir. A ile aynı yan kenardaki D iç açısı kaç derecedir?",
        options: ["112°", "68°", "22°", "124°", "292°"],
        knowledge: [
          "Paralel tabanlar arasında aynı yan kenardaki iç açılar bütünlerdir.",
        ],
        strategy: "A+D=180°ilişkisini kur.",
        steps: [
          "AD yan kenarı iki paralel tabanı keser.",
          "68+D=180 eşitliği yazılır.",
          "D=112°bulunur.",
        ],
        optionReasons: [
          "180−68=112°dir.",
          "68°A’nın ölçüsüdür; D de 68°olsaydı aynı yan kenardaki toplam 136°olurdu. İkizkenar yamukta da A+D=180°korunur.",
          "22°tümler açıdır; burada 90°toplamı yoktur.",
          "124°toplamı 192°yapar.",
          "292°360−68 hesabıdır; aynı yan kenar ilişkisi 180°dir.",
        ],
        commonError:
          "Aynı tabana komşu açılarla aynı yan kenardaki açıları ayır.",
        check: "68+112=180°.",
      },
      {
        prompt:
          "Dışbükey bir dörtgenin köşegenleri dik kesişiyor ve uzunlukları 13 cm ile 10 cm. Alanı kaç cm²dir?",
        options: ["65", "130", "23", "32,5", "115"],
        knowledge: [
          "Dik köşegenli dışbükey dörtgende alan köşegenler çarpımının yarısıdır.",
        ],
        strategy: "Diklik koşuluyla sin 90°=1 kullan.",
        steps: [
          "d₁=13, d₂=10 alınır.",
          "S=13·10/2 yazılır.",
          "Alan 65 cm²bulunur.",
        ],
        optionReasons: [
          "13·10/2=65.",
          "130 yarım çarpanını unutur.",
          "23 iki köşegenin toplamıdır.",
          "32,5 alanı iki kez yarıya indirir.",
          "115 verilen çarpım bağıntısını sağlamaz.",
        ],
        commonError:
          "Köşegenler dik verilmemişse aynı formülde sinθçarpanını unutma.",
        check:
          "İki köşegen, dört küçük dik üçgenin yüksekliklerini paylaştırır.",
      },
      {
        prompt:
          "Dışbükey bir dörtgenin köşegenleri 10 ve 18 birimdir. Kenar orta noktalarını sırayla birleştiren paralelkenarın çevresi kaç birimdir?",
        options: ["28", "56", "14", "36", "180"],
        knowledge: [
          "Yeni paralelkenarın kenarları eski köşegenlerin yarılarıdır.",
        ],
        strategy: "İki 5 veiki 9 uzunluğunu topla.",
        steps: [
          "Bir kenar çifti 10/2=5 birimdir.",
          "Diğer kenar çifti 18/2=9 birimdir.",
          "Çevre 2·5+2·9=28 birimdir.",
        ],
        optionReasons: [
          "Çevre eski iki köşegenin toplamı 28’dir.",
          "56 köşegenleri yarıya bölmeyi unutur.",
          "14 yalnız iki komşu kenarın toplamıdır.",
          "36 yalnız 18 uzunluğunu ikiye katlar.",
          "180 iki köşegenin çarpımıdır, çevre bağıntısı değildir.",
        ],
        commonError: "Orta taban uzunluğunun köşegenin yarısı olduğunu koru.",
        check: "5+9+5+9=28.",
      },
      {
        prompt:
          "Köşegenleri dik kesişen dışbükey ABCD dörtgeninde AB=5, BC=√52 veCD=10 birim. DA kaç birimdir?",
        options: ["√73", "√177", "√23", "15−√52", "√125"],
        knowledge: ["Dik köşegenler AB²+CD²=BC²+DA²eşitliğini verir."],
        strategy: "Kareler toplamı eşitliğinde bilinmeyeni ayır.",
        steps: [
          "5²+10²=(√52)²+DA²yazılır.",
          "125=52+DA²olduğundan DA²=73.",
          "Uzunluk pozitif olduğu için DA=√73 birimdir.",
        ],
        optionReasons: [
          "125−52=73 ve pozitif kök√73’tür.",
          "√177,52’yi çıkarmak yerine ekler.",
          "√23 olsaydı 52+23=75 olurdu; öteki karşı kareler toplamı 125 ile eşit değildir.",
          "15−√52 uzunlukları doğrudan toplar; eşitlik kareler içindir.",
          "√125, BC²terimini yok sayar.",
        ],
        commonError: "Kareler toplamı eşitliğini uzunluklar toplamına çevirme.",
        check:
          "AO=3, BO=4, CO=6, DO=8 dik kesişim parçaları bu uzunlukları gerçekleştirir.",
      },
      {
        prompt:
          "Dışbükey ABCD dörtgeninde A=80°veD=100°. B ile C iç açılarının açıortayları E’de kesişiyor. ∠BEC kaç derecedir?",
        options: ["90°", "180°", "40°", "50°", "80°"],
        knowledge: ["BEC üçgeninin B ve C köşelerindeki açılar B/2 veC/2’dir."],
        strategy: "Dörtgen toplamından B+C’yi bul.",
        steps: [
          "B+C=360−80−100=180°dir.",
          "B/2+C/2=90°olur.",
          "BEC üçgeninin kalan açısı 180−90=90°dir.",
        ],
        optionReasons: [
          "(80+100)/2=90°doğru sonuçtur.",
          "180°B+C toplamıdır; istenen açı değildir.",
          "40°yalnız A/2’dir.",
          "50°yalnız D/2’dir.",
          "80°A’nın ölçüsüdür, BEC değildir.",
        ],
        commonError:
          "Açıortayların çıktığı B, C ile karşılarında tamamlayan A, D’yi ayır.",
        check: "BEC açısı pozitif ve 180°den küçüktür.",
      },
      {
        prompt:
          "Dışbükey ABCD deltoidinde AB=AD ve CB=CD’dir. Köşegenler AC=15 cm veBD=8 cm. Alan kaç cm²dir?",
        options: ["60", "120", "30", "23", "46"],
        knowledge: [
          "Deltoidin bu eş kenar çiftleri AC simetri köşegenini veAC⊥BD koşulunu verir.",
        ],
        strategy: "Köşegenleri diklik koşuluyla kullan.",
        steps: [
          "AB=AD ve CB=CD olduğundan köşegenler diktir.",
          "S=AC·BD/2 formülüne 15 ve 8 yerleştirilir.",
          "15·8/2=60 cm²bulunur.",
        ],
        optionReasons: [
          "Deltoidin dik köşegen çarpımının yarısı 60’tır.",
          "120 dik köşegenler çarpımıdır, ikiye bölünmelidir.",
          "30 alanı bir kez daha yarıya indirir.",
          "23 köşegenler toplamıdır, alan değildir.",
          "46 köşegenler toplamının iki katıdır, çevre de bundan bulunmaz.",
        ],
        commonError: "Deltoidi mutlaka eşkenar dörtgen sanma.",
        check: "İki köşegenin 15 ve 8 olması bütün kenarları eşit yapmaz.",
      },
    ],
    sheet: [
      {
        title: "Dörtgen ve sınıflar",
        text: [
          "Basit dörtgende iç açı toplam 360°. Dışbükeyde bütün iç açılar 180°den küçük. Bu derste yamuk:en az bir paralel karşı kenar çifti. Kare, hem dikdörtgen hem eşkenar dörtgendir.",
        ],
      },
      {
        title: "Yamuk",
        text: [
          "Tabanlar a, b; dik yükseklik h. Orta taban(a+b)/2, alan(a+b)h/2. Aynı yan kenarın iki iç açısı toplam 180°.",
          "a≥b iken orta tabanda köşegenler arasındaki parça(a−b)/2; uç parçalar b/2. Köşegen kesişiminde AO/OC=BO/OD=a/b.",
        ],
      },
      {
        title: "Deltoid ve dik köşegen",
        text: [
          "AB=AD, CB=CD ise AC⊥BD; AC, BD’yi ortalar. Alan AC·BD/2. Dik köşegenli genel dörtgende AB²+CD²=BC²+DA².",
        ],
      },
      {
        title: "Orta noktalar ve açıortay",
        figureTitle: "Kenar orta noktaları gizli bir paralelkenar kurar",
        text: [
          "Kenar orta noktaları paralelkenar kurar; çevresi AC+BD, alanı eski alanın yarısıdır. B, C iç açıortayları E’de kesişiyorsa ∠BEC=(A+D)/2.",
        ],
      },
      {
        title: "Ek koşulu önce oku",
        text: [
          "İkizkenar yamukta farklı tabanlar a>b için h=√(ℓ²−((a−b)/2)²). Çembersel dörtgende karşı açılar 180°. İçteğet çemberde AB+CD=BC+DA ve S=r·s; r yarıçap, s yarı çevredir.",
        ],
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri: Dörtgenler ve Özellikleri, Özel Dörtgenler (basılı 140–141/PDF 142–143); Aurelia Tüm Geometri Özeti PDF 8 ve Genel Dörtgenler PDF fiziksel 2 ve 5 (G2). Kaynak kavramlarından yazılmış özgün anlatım ve öğretim soruları.",
    minutes: 48,
    id: "tyt-geo-dortgen-hiyerarsi-032",
  },
];

export const geometryPolygons032Guides: LessonGuide[] = packs.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  source: p.source,
  objectives: [
    "Tanımı ve geçerli koşulları şekille ilişkilendir.",
    "Bağıntıyı üçgenlere ayırarak gerekçelendir.",
    "Bağımsız soruyu çöz; sonucunu koşullarla denetle.",
  ],
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
}));
export const geometryPolygons032Lessons: Lesson[] = packs.map((p, family) => ({
  id: p.id,
  subjectId: "tyt-geometri",
  title: txt(p.title),
  minutes: p.minutes,
  source: txt(p.source),
  tags: ["kaynakli-anlatim", "Özgün öğretim soruları", "geometri"],
  objectives: geometryPolygons032Guides[family].objectives.map(txt),
  body: p.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: p.items.map((item, index): Question => {
    const shift = (index * 2 + family + 1) % 5;
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
}));
export const geometryPolygons032Sheets: CheatSheet[] = packs.map((p) => ({
  topicId: `topic-${p.id}`,
  lessonId: p.id,
  title: p.title,
  subjectId: "tyt-geometri",
  source: p.source,
  sections: p.sheet,
  cautions: p.examples.slice(0, 3).map((e) => e.pitfall),
  examples: p.examples
    .slice(0, 2)
    .map((e) => ({
      title: e.title,
      prompt: e.prompt,
      steps: e.steps.map((s) => s.explanation),
      answer: e.answer,
    })),
  recall: p.recall.slice(0, 3),
}));
