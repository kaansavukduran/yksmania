import {
  binomialId,
  combinationId,
} from "../data/supplementalCountingTopics034035";
import { txt, type Question } from "../domain/model";

type Option = readonly [value: string, reason: string];
type CountingExercise = {
  id: string;
  prompt: string;
  options: readonly [Option, Option, Option, Option, Option];
  answer: number;
  knowledge: string;
  strategy: string;
  steps: string[];
  commonError: string;
  check: string;
};

function practice(skill: string, items: CountingExercise[]): Question[] {
  return items.map(
    ({
      id,
      prompt,
      options,
      answer,
      knowledge,
      strategy,
      steps,
      commonError,
      check,
    }) => ({
      id: `${skill}-${id}`,
      skill,
      prompt: txt(prompt),
      options: options.map(([value]) => txt(value)),
      answer,
      hint: txt(strategy),
      explanation: txt([...steps, check].join(" ")),
      guidance: {
        knowledge: [knowledge],
        strategy,
        steps,
        optionReasons: options.map(([, reason]) => reason),
        commonError,
        check,
      },
    }),
  );
}

export const combinationPractice034 = practice(combinationId, [
  {
    id: "ekip-rolsuz",
    prompt:
      "Bir kulüpte sekiz farklı aday var. Üçü aynı görevi yapacak bir ekip için seçiliyor. Ekip içinde sıra ve ayrı rol yok. Kaç ekip kurulabilir?",
    options: [
      ["336", "8·7·6 her ekibin altı farklı sıralamasını ayrı sayar."],
      ["56", "Her üç kişi bir ekip, altı sıra aynı ekip olduğu için 336/6=56."],
      [
        "24",
        "8·3 bir adayla bir yer arasındaki eşleşmeleri sayar. Üç farklı adayın birlikte seçimini hesaplamaz.",
      ],
      ["28", "C(8,2) iki kişilik ekiplerin sayısıdır."],
      ["512", "8³ sıralı yerleri ve aynı adayın yeniden seçilmesini sayar."],
    ],
    answer: 1,
    knowledge:
      "Aynı üyelerin yer değiştirmesi rol olmayan bir ekipte sonucu değiştirmez.",
    strategy:
      "İlk hesapta adayları sıralı al. Her ekibin kaç kez sayıldığını bul.",
    steps: [
      "Üç sırada 8, 7, 6 seçenek var, toplam 336 sıra.",
      "Her üç kişilik ekibin 3!=6 sırası bulunur.",
      "C(8,3)=336/6=56.",
    ],
    commonError: "8·7·6 sonucunu doğrudan grup sayısı yapmak.",
    check: "Ekiplerin her birine üç ayrı rol verilse 56·6=336 atama olurdu.",
  },
  {
    id: "disarida-kalanlar",
    prompt:
      "Dokuz farklı kitaptan yedisi çantaya konacak. Yalnız çantaya konan kitap kümesi önemlidir. Kaç seçim vardır?",
    options: [
      ["9", "Bu, yalnız bir kitabı dışarıda bırakma sayısıdır."],
      ["72", "Dışarıda bırakılan iki kitabı 9·8 sıralı sayar."],
      [
        "36",
        "İçerideki yedi kitap, dışarıdaki iki kitapla birebir belirlenir. C(9,2)=36.",
      ],
      ["84", "C(9,3)=84. Bu, dışarıda üç kitap kalsaydı uygun olurdu."],
      [
        "1",
        "Herkesin seçildiği veya hiç kimsenin seçilmediği durum tektir. Burada iki kitap dışarıda kalır.",
      ],
    ],
    answer: 2,
    knowledge: "İçerideki seçimin tümleyeni dışarıdaki öğe kümesidir.",
    strategy:
      "Yedi kitabı doğrudan seçmek yerine, dışarıda kalanların sayısını bul.",
    steps: [
      "9−7=2 kitap dışarıda kalır.",
      "Bu ikili 9·8/2=36 biçimde seçilir.",
      "Her dış ikili tam bir çanta seçimini belirler.",
    ],
    commonError: "İki kitabın hangisinin önce çıkarıldığını saymak.",
    check: "C(9,7)=9!/(7!·2!)=36.",
  },
  {
    id: "zorunlu-yasak",
    prompt:
      "On adaydan beş kişilik takım seçiliyor. Ada takımda olmak zorunda, Deniz takımda olamaz. Roller yok. Kaç takım kurulabilir?",
    options: [
      ["126", "C(9,4) Deniz’i kalan adaylar arasında bırakır."],
      [
        "56",
        "C(8,3) sabit Ada dışında sadece üç kişi seçer. Takım dört kişi olur.",
      ],
      ["252", "C(10,5) iki koşulu da uygulamaz."],
      [
        "70",
        "Ada bir yer doldurur. Ada ve Deniz dışındaki sekiz adaydan dördü seçilir.",
      ],
      ["35", "C(7,3) aday ve boş yer sayılarını birer eksik alır."],
    ],
    answer: 3,
    knowledge:
      "Zorunlu aday bir yeri doldurur. Yasak aday hiçbir yer doldurmaz.",
    strategy: "Kalan aday sayısını ve kalan yer sayısını ayrı yaz.",
    steps: [
      "Ada’yı takıma yaz. Dört boş yer kalır.",
      "Diğer adaylardan Deniz’i çıkar. Sekiz aday kalır.",
      "C(8,4)=70 takım.",
    ],
    commonError: "Yasak adayı çıkardıktan sonra bir boş yeri daha dolu saymak.",
    check:
      "Dokuz Ada-dışı adaydan dörtlü 126 idi. Deniz’in bulunduğu C(8,3)=56 tanesini çıkarınca 70 kalır.",
  },
  {
    id: "tam-iki",
    prompt:
      "Beş müzik ve dört tiyatro öğrencisi birbirinden farklı, her öğrenci yalnız bir grupta. Tam iki müzik ve iki tiyatro öğrencisi olan dört kişilik kaç ekip seçilir?",
    options: [
      ["16", "C(5,2)+C(4,2)=16 iki ayrı ikiliyi birbirine bağlamaz."],
      [
        "60",
        "C(5,2)=10 müzik ikilisi ve C(4,2)=6 tiyatro ikilisi her biçimde eşleşir.",
      ],
      ["120", "60’ı ikiye katlamak iki türün seçilme sırasını sayar."],
      ["126", "C(9,4) müzik ve tiyatro sayısı kısıtını kullanmaz."],
      ["40", "C(5,2)·4 yalnız bir tiyatro öğrencisi seçer."],
    ],
    answer: 1,
    knowledge:
      "Farklı türlerden gelen seçimlerin her çifti tek bir ekip kuruyorsa sayılar çarpılır.",
    strategy:
      "Önce müzik ikilisini, sonra bununla birleşen tiyatro ikililerini say.",
    steps: [
      "Müzik ikilisi 5·4/2=10.",
      "Tiyatro ikilisi 4·3/2=6.",
      "Her müzik ikilisi 6 tiyatro ikilisiyle birleşir. 10·6=60.",
    ],
    commonError: "Bir grubun seçim sayısını öteki grubunkiyle toplamak.",
    check:
      "Önce tiyatro ikilisi seçilse 6·10=60 elde edilir ve aynı ekipler sayılır.",
  },
  {
    id: "en-az-bir",
    prompt:
      "Üç farklı sarı ve dört farklı mavi karttan üç kart seçilecek. En az bir sarı içeren kaç farklı kart kümesi vardır?",
    options: [
      [
        "18",
        "3·C(4,2) tam bir sarılı grupları alır. İki veya üç sarı da uygun.",
      ],
      ["35", "C(7,3) hiç sarı içermeyen seçimleri de alır."],
      ["31", "C(7,3)−C(4,3)=35−4. Yalnız tamamen mavi gruplar çıkarılır."],
      ["4", "C(4,3) hiç sarı içermeyen grupları sayar."],
      [
        "30",
        "Tam bir ve tam iki sarılı grupların toplamı 18+12. Üç sarılı seçim de var.",
      ],
    ],
    answer: 2,
    knowledge: "En az bir sarının tümleyeni hiç sarı olmamasıdır.",
    strategy: "Bütün üçlülerden yalnız mavi olanları çıkar.",
    steps: [
      "Yedi karttan C(7,3)=35 üçlü seçilir.",
      "Tamamen mavi olan C(4,3)=4 üçlü vardır.",
      "35−4=31 üçlüde en az bir sarı bulunur.",
    ],
    commonError: "En az bir sarıyı tam bir sarı olarak okumak.",
    check: "Tam bir, iki ve üç sarılı durumlar 18, 12, 1. Toplamları 31.",
  },
  {
    id: "lazim-olan-alan",
    prompt:
      "Bir cihazdaki farklı dosyaların boyutları 2, 2, 2, 3, 3, 5 GB. İki dosya silinecek. En az 6 GB yer açan kaç dosya çifti vardır?",
    options: [
      [
        "5",
        "5 GB dosyayla eşleşen beş çifti sayar, iki 3 GB’lık dosyanın oluşturduğu çifti unutur.",
      ],
      ["9", "Yetersiz çiftlerin sayısı 3+6=9. Soru yeterli olanları istiyor."],
      ["15", "C(6,2) tüm çiftleri verir. 2+2 ve 2+3 eşik altındadır."],
      [
        "6",
        "Beş çift 5 GB dosyayı içerir. İki 3 GB dosyanın çifti de tam 6 GB.",
      ],
      ["3", "2+2 GB olan çiftlerin sayısıdır ve 6 GB’a yetmez."],
    ],
    answer: 3,
    knowledge:
      "Boyutu eşit dosyalar yine farklı öğelerdir. En az 6 GB, tam 6 GB’ı da alır.",
    strategy:
      "İkili boyutlarını karşılaştır. Küçük kalan iki türü çıkar veya yeterli çiftleri doğrudan say.",
    steps: [
      "Bütün C(6,2)=15 dosya çifti var.",
      "2+2 için C(3,2)=3, 2+3 için 3·2=6 yetersiz çift var.",
      "15−3−6=6 çift.",
    ],
    commonError: "2 GB olan üç farklı dosyayı tek dosya saymak.",
    check: "2+5 üç, 3+5 iki, 3+3 bir çift. 3+2+1=6.",
  },
  {
    id: "ayni-dogru",
    prompt:
      "Yedi farklı noktadan yalnız A, B, C, D aynı doğru üzerinde. Bu dördün oluşturdukları dışında doğrusal üçlü yok. Köşeleri bu noktalardan seçilen kaç üçgen ve bu noktaların çiftleriyle belirlenen kaç farklı doğru vardır?",
    options: [
      [
        "31 üçgen, 16 doğru",
        "35 üçlüden 4 çıkarılır. 21 çift içindeki 6 ortak doğru kaydı tek kayda düşer.",
      ],
      [
        "35 üçgen, 21 doğru",
        "Üçlülerin hepsini üçgen, çiftlerin hepsini ayrı doğru varsayar.",
      ],
      [
        "29 üçgen, 17 doğru",
        "C(4,2)=6’yı üçlülere, C(4,3)=4’ü çiftlere uygular.",
      ],
      [
        "31 üçgen, 15 doğru",
        "Altı ortak doğru kaydını çıkarır, gerçek ortak doğruyu geri eklemez.",
      ],
      [
        "34 üçgen, 16 doğru",
        "Aynı doğru üzerindeki dört farklı üçlüyü tek bir uygunsuz üçlü sayar.",
      ],
    ],
    answer: 0,
    knowledge:
      "Doğrusal üçlülerin alanı sıfırdır. Aynı doğru üzerindeki iki nokta çiftinin doğrusu aynı olabilir.",
    strategy:
      "Üçgenler için uygunsuz üçlüleri, doğrular için aynı doğruyu tekrarlayan çiftleri say.",
    steps: [
      "C(7,3)=35 üçlü ve C(4,3)=4 doğrusal üçlü var. 31 üçgen kalır.",
      "C(7,2)=21 çiftin C(4,2)=6 tanesi aynı doğruyu verir.",
      "21−6+1=16 farklı doğru.",
    ],
    commonError:
      "Üçgeni çıkarırken ve aynı doğruyu tekilleştirirken aynı seçim sayısını kullanmak.",
    check:
      "A, B, C, D ile dışarıdaki üç nokta arasında 12 doğru, dış noktalar arasında 3 ve ortak doğru 1. Toplam 16.",
  },
  {
    id: "dokuzgen-kosegen",
    prompt:
      "Bir dışbükey dokuzgende köşelerden seçilen iki komşu olmayan köşeyi birleştiren doğru parçasına köşegen denir. Kaç farklı köşegen vardır?",
    options: [
      ["36", "C(9,2) parçalarına dokuz kenar da dahildir."],
      [
        "54",
        "Her köşedeki altı köşegeni toplar, aynı parçayı iki uçtan sayar.",
      ],
      [
        "18",
        "Dokuz kenarı iki uçtan sayınca 18 çıkar. Sorulan parçalar komşu olmayan köşeleri bağlar.",
      ],
      ["27", "Dokuz köşenin 36 ikilisinden dokuz komşu çift çıkarılır."],
      ["45", "36’ya dokuz kenarı tekrar ekler. Bu kenarlar çıkarılmalı."],
    ],
    answer: 3,
    knowledge:
      "Her farklı köşe çifti tek parça verir. Komşu çiftler kenar oluşturur.",
    strategy: "Tüm köşe çiftlerini sayıp kenarları çıkar.",
    steps: [
      "C(9,2)=9·8/2=36 parça.",
      "Dokuz parça çokgenin kenarı.",
      "36−9=27 köşegen.",
    ],
    commonError: "İlk ve son köşenin de komşu olduğunu unutmak.",
    check: "Her köşeden altı köşegen çıkar. 9·6/2=27.",
  },
]);

export const binomialPractice035 = practice(binomialId, [
  {
    id: "pascal-komsular",
    prompt:
      "Pascal üçgeninde 5. satır soldan sağa 1, 5, 10, 10, 5, 1. 0. satırın 1 olduğu bu üçgende 6. satırın soldan dördüncü sayısı nedir?",
    options: [
      ["10", "Bu, üstteki iki komşudan yalnız birini alır."],
      [
        "15",
        "10+5 yanındaki bir konumu oluşturur. Dördüncünün iki üst komşusu da 10.",
      ],
      ["20", "Üst satırın üçüncü ve dördüncü sayısı 10. Toplamları 20."],
      ["30", "Üst satırın ikiden fazla konumunu sayar."],
      ["6", "1+5 ikinci konumu verir. Hedef dördüncüdür."],
    ],
    answer: 2,
    knowledge: "Pascal üçgeninin iç konumları üstteki iki komşunun toplamıdır.",
    strategy: "Üst satırın üçüncü ve dördüncü sayılarını topla.",
    steps: [
      "6. satırın dördüncü konumu C(6,3).",
      "Üst komşular C(5,2)=10 ve C(5,3)=10.",
      "10+10=20.",
    ],
    commonError: "Dördüncü konuma r=4 yazmak. Soldaki ilk konum r=0.",
    check: "C(6,3)=6·5·4/(3·2·1)=20.",
  },
  {
    id: "iki-secim",
    prompt: "(2x+3)⁴ açılımında x²’nin katsayısı nedir?",
    options: [
      ["6", "C(4,2) seçim sayısıdır. Her seçimin 2²·3² çarpanını içermez."],
      [
        "36",
        "2²·3² tek bir seçimden gelen katsayıdır. Altı aynı terim birleşir.",
      ],
      ["108", "Yalnız üç seçim sayılmış. İki çarpan için C(4,2)=6."],
      ["216", "C(4,2)·2²·3²=6·4·9=216."],
      [
        "324",
        "Her seçimin katsayısını dokuzla çarpar. Uygun seçim sayısı altıdır.",
      ],
    ],
    answer: 3,
    knowledge:
      "x üssü, x içeren çarpanın seçilme sayısıdır. Her seçimin sayısal çarpanı da vardır.",
    strategy:
      "x² üreten iki 2x ve iki 3 için önce yerleri, sonra katsayıyı bul.",
    steps: [
      "Dört çarpandan 2x seçilecek ikisini C(4,2)=6 biçimde seç.",
      "Herinde (2x)²·3²=36x² oluşur.",
      "Altı terim toplamı 216x², katsayı 216.",
    ],
    commonError: "Pascal üçgenindeki 6’yı katsayının tamamı almak.",
    check:
      "İkişer parantezi önce çarparsan (4x²+12x+9)² olur. x² katsayısı 2·4·9+12²=216.",
  },
  {
    id: "eksi-tek",
    prompt: "(x−2)⁵ açılımında x²’nin katsayısı nedir?",
    options: [
      ["80", "Büyüklük doğru. Üç tane −2 çarpıldığından işaret eksi."],
      ["−80", "Üç tane −2 seçilir. C(5,3)·(−2)³=−80."],
      ["−20", "(−2) yalnız bir kere çarpılmış. Sabit terim üç yerde seçilir."],
      ["40", "İki negatif sabit seçildiğinde x³ terimi 40x³’tür."],
      ["−8", "Tek bir yer seçiminin çarpanı −8. On konum seçimi vardır."],
    ],
    answer: 1,
    knowledge: "Tek sayıda negatif çarpanın çarpımı negatiftir.",
    strategy:
      "x² gelmesi için kaç parantezde x, kaçında −2 seçildiğini belirle.",
    steps: [
      "Beş çarpanda iki x, üç −2 kullan.",
      "C(5,3)=10 ve (−2)³=−8.",
      "Katsayı 10·(−8)=−80.",
    ],
    commonError:
      "x üssü 2 diye negatif terimin de iki kez seçildiğini düşünmek.",
    check: "x’lerin ikisinin yerini seçmek de C(5,2)=10 verir.",
  },
  {
    id: "paydali-sabit",
    prompt: "x≠0 için (x²+3/x)⁶ açılımında sabit terimin katsayısı nedir?",
    options: [
      ["15", "C(6,4) uygun seçimleri sayar. 3⁴ çarpanı da gerekir."],
      ["81", "3⁴ tek bir terimin katsayısı. 15 kez oluşur."],
      ["54", "C(6,1)·3² hesaplanmış fakat x üsleri birbirini götürmez."],
      ["1.215", "Genel üs 12−3r=0 için r=4. C(6,4)·3⁴=1.215."],
      [
        "180",
        "r=4 ile 3’ü dört kez çarpmak gerekir. C(6,4)·3·4 bunun yerini tutmaz.",
      ],
    ],
    answer: 3,
    knowledge:
      "Sabit terimin x üssü sıfırdır. Bu hesap, özgün ifade x=0’da tanımlı olmasa da yapılabilir.",
    strategy: "x üslerini topla. Toplam üssü sıfır yapan r’yi bul.",
    steps: [
      "İlk terim 6−r kez, ikinci terim r kez seçilirse üs 2(6−r)−r.",
      "12−3r=0 denklemi r=4 verir.",
      "C(6,4)·3⁴=15·81=1.215.",
    ],
    commonError: "Paydada x varken sabit terim için x=0 yazmak.",
    check: "İki x² ve dört 3/x seçimi x⁴·x⁻⁴=1 verir.",
  },
  {
    id: "birlesen-derece",
    prompt:
      "(3x−2x)⁴ ifadesinde aynı dereceli terimler birleştirildiğinde kaç sıfır dışı terim kalır ve x⁴’ün katsayısı nedir?",
    options: [
      [
        "5 terim, 1",
        "Beş seçim satırı vardır, hepsinin derecesi aynı olduğu için birleşir.",
      ],
      ["1 terim, 81", "81 yalnız dört 3x seçilen satırın katsayısıdır."],
      ["1 terim, 1", "Parantez x olur. Dördüncü kuvvet x⁴, katsayı 1."],
      ["0 terim, 0", "3x ve −2x toplamı x. Katsayılar tümüyle yok olmaz."],
      [
        "2 terim, 16",
        "Terimlerde aynı x üssü bulunur. (−2x)⁴ tek başına sonucu vermez.",
      ],
    ],
    answer: 2,
    knowledge:
      "Aynı x üssünü taşıyan terimler katsayıları toplanarak birleştirilir.",
    strategy: "Önce parantezin içindeki aynı dereceli ifadeleri birleştir.",
    steps: [
      "3x−2x=x.",
      "x’in dördüncü kuvveti x⁴.",
      "Yalnız bir sıfır dışı terim ve katsayısı 1.",
    ],
    commonError: "n+1 genel seçim satırını n+1 ayrı derece sanmak.",
    check: "Açılım katsayıları toplamı 81−216+216−96+16=1. Hepsi x⁴’e aittir.",
  },
  {
    id: "tek-cift-toplam",
    prompt:
      "P(x)=(3x−2)³ için çift dereceli katsayıların toplamı ile tek dereceli katsayıların toplamı sırasıyla nedir? Sabit terim çift derecededir.",
    options: [
      ["−62 ve 63", "P(1)=1, P(−1)=−125. Yarı toplam −62, yarı fark 63."],
      [
        "63 ve −62",
        "Yarı toplam çift dereceleri, yarı fark tek dereceleri verir. Sıralama ters.",
      ],
      [
        "1 ve −125",
        "Gösterilenler P(1) ve P(−1). Her biri iki grubu birlikte kullanır.",
      ],
      ["−54 ve 63", "−54 x²’nin katsayısı. Sabit −8 de çift toplamda bulunur."],
      [
        "−124 ve 126",
        "Çift ve tek toplamlar için P değerlerinin toplamı ve farkı ikiye bölünmeli.",
      ],
    ],
    answer: 0,
    knowledge: "P(1)=Ç+T, P(−1)=Ç−T. x=−1 tek derecelerin işaretini çevirir.",
    strategy: "Önce iki değeri hesapla. Sonra iki denklemi toplayıp çıkar.",
    steps: [
      "P(1)=(3−2)³=1. P(−1)=(−3−2)³=−125.",
      "Ç=(1−125)/2=−62.",
      "T=(1+125)/2=63.",
    ],
    commonError: "Çift dereceyi pozitif katsayı anlamında kullanmak.",
    check: "Açılım 27x³−54x²+36x−8. Çift −54−8, tek 27+36.",
  },
  {
    id: "simetrik-oran",
    prompt:
      "a>0 ve x≠0. (x+a/x)⁸ ifadesinde x⁻²’nin katsayısı x²’nin katsayısının 49 katıdır. a kaçtır?",
    options: [
      ["49", "Oranda a değil a² kalır."],
      ["14", "49’un pozitif karekökü 7. İkiyle çarpma gerekmez."],
      ["√7", "a⁴=49 olsaydı pozitif kök √7 olurdu. Burada güç farkı 2."],
      ["7", "Simetrik C(8,5) ve C(8,3) sadeleşir. a⁵/a³=a²=49."],
      ["1/7", "Bu, katsayıların oranını ters yazıp a⁻²=49 almaktan gelir."],
    ],
    answer: 3,
    knowledge:
      "Simetrik seçimlerde C(n,r)=C(n,n−r). Katsayı oranında ortak çarpanlar sadeleşir.",
    strategy: "İki üs için r’yi ayrı bul. Orandaki a kuvvetlerini karşılaştır.",
    steps: [
      "Genel üs 8−2r. x⁻² için r=5, x² için r=3.",
      "Oran C(8,5)a⁵/[C(8,3)a³]=a².",
      "a²=49. a>0, yani a=7.",
    ],
    commonError:
      "Pozitiflik koşulunu kullanmadan iki değer vermek veya oranı ters çevirmek.",
    check: "7⁵/7³=7²=49.",
  },
  {
    id: "gecersiz-us",
    prompt:
      "x≠0 için (x²+1/x)⁵ açılımında aşağıdaki kuvvetlerden hangisi bulunmaz?",
    options: [
      ["x¹⁰", "İkinci terim hiç seçilmezse üs 10."],
      ["x⁷", "İkinci terim bir kez seçilirse üs 7."],
      ["x⁴", "İkinci terim iki kez seçilirse üs 4."],
      ["x¹", "İkinci terim üç kez seçilirse üs 1."],
      [
        "x⁰",
        "10−3r=0 denkleminin r=10/3 çözümü tam sayı değildir. Bu yüzden bu kuvvet oluşmaz.",
      ],
    ],
    answer: 4,
    knowledge: "Seçim adedi r, 0 ile n arasında bir tam sayı olmalıdır.",
    strategy:
      "Genel üssü yaz ve verilen üslerin hangisinde geçerli r bulunmadığını kontrol et.",
    steps: [
      "Genel üs 2(5−r)−r=10−3r.",
      "r=0,1,2,3,4,5 için 10,7,4,1,−2,−5 oluşur.",
      "0 bu dizide bulunmaz, dolayısıyla x⁰ terimi yok.",
    ],
    commonError:
      "Üs denklemindeki kesirli r’yi bir terim seçimi olarak kabul etmek.",
    check: "Altı olası seçim satırı var ve altı farklı üs de listelendi.",
  },
]);
