import { txt, type Lesson } from "../domain/model";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
import {
  scientificNotationExamples,
  scientificNotationPractice,
  scientificNotationSections,
} from "./scientificNotation014";

type RawQuestion = [string, string[], number, string, string, string];
type Pack = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  questions: RawQuestion[];
  source: string;
};
const section = (
  title: string,
  first: string,
  second: string,
): GuideSection => ({ title, paragraphs: [first, second] });
const worked = (
  title: string,
  prompt: string,
  strategy: string,
  steps: [string, string, string?][],
  answer: string,
  check: string,
  pitfall: string,
): WorkedExample => ({
  title,
  prompt,
  strategy,
  steps: steps.map(([label, explanation, expression]) => ({
    label,
    explanation,
    ...(expression ? { expression } : {}),
  })),
  answer,
  check,
  pitfall,
});

const absolute: Pack = {
  id: "mutlak-deger",
  topic: "detail-205",
  title: "Mutlak değer: uzaklıktan çözüm kümesine",
  minutes: 60,
  objectives: [
    "Mutlak değeri uzaklık ve parçalı tanım olarak birlikte yorumla.",
    "Denklem ve eşitsizliklerde sağ tarafın işaretini, iç/dış bölgeyi ve uç noktaları denetle.",
    "Değişkenli sağ taraf, uzaklık toplamı ve iç içe mutlak değerde adayları özgün ifadede kontrol et.",
  ],
  sections: [
    section(
      "İşareti silmekten önce uzaklığı düşün",
      "|x|, gerçek x sayısının sayı doğrusunda sıfıra uzaklığıdır. −6 ile +6 karşı yönlerde fakat aynı uzaklıktadır; ikisinin mutlak değeri 6 olur. Uzaklık negatif olamaz ve yalnız x=0 iken sıfırdır. |a−b| de a ve b noktalarının birbirine uzaklığıdır; ölçüm yönünü ters çevirince |b−a| ile aynı sonuç çıkar.",
      "Mutlak değer işaretinin içindeki ifade önce bir bütün olarak hesaplanır. |2−7|=|−5|=5 iken |2|−|7|=−5'tir. Mutlak değeri toplama veya çıkarma üzerine dağıtmak aynı işlemi anlatmaz. Atölyede nokta ile merkezi hareket ettirip yönlü fark x−a ile yönsüz uzaklık |x−a| arasındaki farkı gözle.",
    ),
    section(
      "Parçalı tanım iç ifadenin işaretine bağlıdır",
      "Gerçek A için A≥0 ise |A|=A, A<0 ise |A|=−A'dır. −A yazmak her zaman negatif sayı üretmez: A=−4 ise −A=4'tür. |2x−6| ifadesinin kırıldığı yer x=0 değil, 2x−6=0 veren x=3'tür. x≥3 için 2x−6; x<3 için 6−2x yazılır.",
      "Eşik noktasında iki parça da sıfır verir; sınırı bir tarafta içerip öbür tarafta dışarıda bırakabilirsin. |A|=−A eşitliği A≤0 için doğrudur, A=0'ı unutma. Birden fazla mutlak değer varsa bütün içleri sıfır yapan noktaları sırala ve her aralıkta işaretleri ayrı belirle. Sonuç her parçada başlangıç koşuluyla birlikte okunmalıdır.",
    ),
    section(
      "Eşitlik iki simetrik uzaklık noktası verir",
      "|x−a|=r denkleminde önce r'yi kontrol et. r<0 ise çözüm yoktur; r=0 ise yalnız x=a; r>0 ise x=a−r veya x=a+r'dir. İki kola ayrılma, merkezin hem solunda hem sağında aynı uzaklığın bulunmasından gelir. Sonuçtaki iki aday, r=0'da aynı noktaya düşer ve iki ayrı kök sayılmaz.",
      "|mx+n|=r için r≥0 olduğunda mx+n=r veya mx+n=−r kurulur. m=0 ise otomatik olarak m'ye bölme: denklem sabit |n|=r hâline gelir ve ya bütün gerçekler ya boş küme olur. m≠0 durumunda bulunan adayları yerine yazmak hem işlem hatasını hem koşullara uymayan adayı yakalar.",
    ),
    section(
      "Küçüklük içeriyi, büyüklük dışarıyı seçer",
      "r>0 için |x−a|<r, a−r<x<a+r iç aralığıdır. Küçük eşit olduğunda uçlar dâhildir: [a−r,a+r]. |x−a|>r ise x<a−r veya x>a+r olmak üzere iki dış bölge gelir. Burada ve ile veya farkı çözüm kümesini değiştirir; dış bölgelerin aynı anda sağlanması beklenmez.",
      "Sıfır ve negatif sağ tarafı ayrı düşün: |A|<0 hiçbir zaman, |A|≤0 yalnız A=0 iken sağlanır. |A|≥0 her gerçek A için, |A|>0 ise A≠0 için doğrudur. Negatif r için |A|≤r boş, |A|>r bütün gerçek değerlerdir. Aralık uçlarını açık ya da kapalı çizmek eşitlik işaretinin anlamını görünür kılar.",
    ),
    section(
      "Sağ tarafta değişken varsa önce mümkünlüğü yaz",
      "|A(x)|=B(x) denkleminin sağ tarafı da sıfır veya pozitif olmalıdır. B(x)≥0 koşulu yazılmadan sadece iki kol çözülürse sahte adaylar kalabilir. Örneğin |x−2|=2x+1 denkleminde x≥−1/2 gerekir; ayrıca iç ifadenin işaretine göre ayrılan her dalın kendi x koşulu vardır.",
      "İki kolu cebirle çözebilirsin, fakat her adayı ilk denklemde dene. |A|=B ifadesini A²=B²'ye dönüştürmek de B'nin işaretini kaybettirir. Eşitsizliklerde B değişkense pozitif, sıfır, negatif hâlleri farklı sonuç doğurur; sabit pozitif r için öğrendiğin iç/dış aralık kuralını koşulsuz taşımak doğru değildir.",
    ),
    section(
      "Toplam uzaklık ve üçgen eşitsizliği",
      "a≤b için |x−a|+|x−b| en az b−a'dır. x iki nokta arasındayken toplam tam aradaki uzaklıktır; dışarı çıkınca uzaklaşılan parça iki kez eklenir. Bu yüzden minimum yalnız tek noktada değil, [a,b] aralığının tamamında alınabilir. Üç veya daha çok uzaklıkta aralıkları işaret tablosuyla incelemek güvenilir bir yoldur.",
      "Genel üçgen eşitsizliği |u+v|≤|u|+|v|'dir. u ve v aynı işaret yönündeyse veya biri sıfırsa eşitlik olur; zıt yönlü katkılar toplamda birbirini azaltabilir. Ters üçgen eşitsizliği ||u|−|v||≤|u−v| karşılaştırma sınırı verir. Bunlar |u+v| her zaman |u|+|v| eşittir demek değildir; u=3,v=−5 karşı örnektir.",
    ),
    section(
      "İç içe işarette dış katmandan ilerle",
      "||x−a|−b|=r gibi bir denklemde önce dış mutlak değeri aç: |x−a|−b=r veya −r. Böylece |x−a|=b+r veya b−r çıkar. Her sağ taraf için negatif/sıfır/pozitif ayrımını yeniden yap; her dış kolun iki geçerli iç kökü olacağını varsayma.",
      "Aynı aday iki farklı koldan gelebilir; çözüm kümesinde bir kez sayılır. b−r<0 ise o kolun hiç kökü yoktur. İşlemi katman katman yazmak eksi işaretinin hangi ifadeye ait olduğunu korur. Bir sayısal kontrol için bulduğun x'i önce en iç ifadeye, sonra dış işarete taşı; yalnız son ara denklemi kontrol etmek yetmez.",
    ),
    section(
      "Grafik ve karekök bağlantısını birlikte oku",
      "y=|x−a|+b grafiğinin tepesi (a,b), simetri ekseni x=a'dır; dışarıdaki pozitif katsayı kolların dikliğini artırır. y=−|x−a|+b aşağı açılır. x ekseniyle kesişim için y=0 kur ve elde edilen uzaklığın negatif olamayacağını denetle. Ötelemede içeride x−a yazılması tepeyi a'ya taşır.",
      "√(A²)=|A| gerçek A için geçerlidir; karekök negatif olmayan esas değeri seçer. Bu yüzden x<3 iken √((x−3)²)=3−x olur. Grafik çizmek, uzaklık anlatımı ve parçalı tanım aynı yapının farklı görünümleridir. Modelde renkli aralık üzerinde seçilen noktanın üyeliğini gerekçelendir; renk görmek tek başına çözüm kanıtı değildir.",
    ),
  ],
  examples: [
    worked(
      "İki kolu özgün eşitlikle doğrula",
      "Gerçek x için |3x−2|=7 denklemini çöz.",
      "Önce pozitif uzaklığı, sonra iki yönü ele al.",
      [
        ["Mümkünlük", "Sağ taraf 7 pozitiftir; iki kol kurulabilir."],
        ["Birinci kol", "İç ifade 7'ye eşit olsun.", "3x−2=7 ⇒ x=3"],
        ["İkinci kol", "İç ifade −7'ye eşit olsun.", "3x−2=−7 ⇒ x=−5/3"],
        [
          "Sağlama",
          "İki adayda iç değer sırasıyla 7 ve −7 olur; mutlak değerleri 7'dir.",
        ],
      ],
      "Çözüm kümesi {−5/3,3}.",
      "İki farklı kök vardır; her ikisi ilk eşitliği sağlar.",
      "İç ifadeyi yalnız 7'ye eşitleyip sol taraftaki uzaklık noktasını kaybetmek.",
    ),
    worked(
      "Kapalı iç aralık",
      "Gerçek x için |2x+1|≤5 eşitsizliğini çöz.",
      "Küçük eşit pozitif sınır çift eşitsizlik verir.",
      [
        ["İç bölge", "−5 ile 5 arasındaki iç ifadeleri seç.", "−5≤2x+1≤5"],
        ["Ötele", "Üç taraftan 1 çıkar.", "−6≤2x≤4"],
        ["Ölçek", "Pozitif 2'ye böl; yön değişmez.", "−3≤x≤2"],
        [
          "Uçları dene",
          "x=−3 ve x=2 için uzaklık tam 5'tir, eşitlik nedeniyle dâhildir.",
        ],
      ],
      "[−3,2].",
      "x=0 içerde ve sağlar; x=3 dışarda ve sağlamaz.",
      "≤ işaretine rağmen uçları açık çizmek.",
    ),
    worked(
      "Değişkenli sağ taraf",
      "Gerçek x için |x−2|=2x+1 denklemini çöz.",
      "Sağ tarafın işaretini koru; iki kol adaylarını ele.",
      [
        ["Ön koşul", "Sağ taraf negatif olamaz.", "2x+1≥0 ⇒ x≥−1/2"],
        ["Pozitif kol", "x−2=2x+1 eşitliği x=−3 verir; ön koşulu sağlamaz."],
        ["Negatif kol", "x−2=−(2x+1) eşitliğini çöz.", "3x=1 ⇒ x=1/3"],
        ["İlk eşitlik", "x=1/3 için iki taraf 5/3 olur; kabul edilir."],
      ],
      "x=1/3.",
      "Reddedilen −3 için |−5|=5 fakat sağ taraf −5'tir.",
      "Kare alma veya iki kol sonrası özgün denklem denetimini atlamak.",
    ),
    worked(
      "Minimum bir aralıkta alınır",
      "Gerçek x için |x+2|+|x−4| ifadesinin minimumunu ve aldığı x değerlerini bul.",
      "−2 ile 4 arasındaki toplam yolu düşün.",
      [
        ["Noktalar", "Terimler x'in −2'ye ve 4'e uzaklıklarıdır."],
        ["İçerisi", "−2≤x≤4 iken işaretleri kullan.", "(x+2)+(4−x)=6"],
        ["Dışarısı", "x<−2 için toplam −2x+2>6; x>4 için 2x−2>6 olur."],
        [
          "Sonuç",
          "Minimum 6, yalnız bir tepe noktasında değil tüm kapalı aralıkta alınır.",
        ],
      ],
      "Minimum 6; x∈[−2,4].",
      "x=0 ve x=4 toplam 6; x=5 toplam 8 verir.",
      "Minimum değeri bulup yalnız orta noktayı çözüm sanmak.",
    ),
    worked(
      "İki katmanı sırasıyla çöz",
      "Gerçek x için ||x−1|−3|=2 denkleminin bütün köklerini bul.",
      "Dış uzaklığı aç; her yeni sağ tarafı kontrol et.",
      [
        [
          "Dış kollar",
          "İçteki ifade 2 veya −2 olabilir.",
          "|x−1|−3=2 veya |x−1|−3=−2",
        ],
        ["İç uzaklıklar", "Her kolda 3 ekle.", "|x−1|=5 veya |x−1|=1"],
        [
          "Noktalar",
          "Merkez 1 çevresindeki uzaklık noktalarını yaz.",
          "x=−4,6 veya x=0,2",
        ],
        [
          "Kontrol",
          "Dört farklı x için dış mutlak değer 2'dir; yinelenen yoktur.",
        ],
      ],
      "{−4,0,2,6}.",
      "Örneğin x=0: ||−1|−3|=|−2|=2.",
      "Dıştaki −3'ü her iki kolda farklı işaretle yanlış taşımak.",
    ),
  ],
  recall: [
    {
      prompt: "|A|=−A hangi işaret koşulunda doğrudur?",
      answer:
        "A≤0; sıfır da eşitliği sağlar. Bu dalı A<0 ile tanımlamak parçalı yazım tercihidir, eşitliğin kendisi sıfırda da doğrudur.",
    },
    {
      prompt: "|x−a|>r, r>0 için iç aralık mı iki dış aralık mı?",
      answer: "x<a−r veya x>a+r; uçlar eşitlik olmadığı için dışarıdadır.",
    },
    {
      prompt: "|A(x)|=B(x) için çözmeye başlamadan hangi zorunlu koşul var?",
      answer: "B(x)≥0. Sonra her adayı özgün eşitlikte denemek gerekir.",
    },
    {
      prompt: "√((x−3)²) neden her x için x−3 değildir?",
      answer:
        "Esas karekök negatif olamaz; doğru ifade |x−3|'tür. x<3 iken 3−x olur.",
    },
    {
      prompt: "İki noktaya uzaklık toplamının minimumu nerede alınır?",
      answer:
        "İki nokta arasındaki kapalı aralığın tamamında; değer noktalar arasındaki uzaklıktır.",
    },
  ],
  questions: [
    [
      "|−7|−|−2| işleminin sonucu kaçtır?",
      ["5", "−5", "9", "−9", "14"],
      0,
      "İki mutlak değeri ayrı hesapla; dışarıdaki çıkarma kalır.",
      "İşlem 7−2=5'tir.",
      "Mutlak değeri dışarıdaki çıkarma üzerine de uygulamak veya tüm farkı tek mutlak değere toplamak farklı işlem olur.",
    ],
    [
      "Gerçek x için |3x−2|=7 denkleminin çözüm kümesi hangisidir?",
      ["{3}", "{−3,3}", "{−5,3}", "{−5/3,3}", "∅"],
      3,
      "İç ifadeyi 7 ve −7'ye eşitle.",
      "3x−2=7 kolundan 3; 3x−2=−7 kolundan −5/3 gelir. İkisi de ilk eşitliği sağlar.",
      "Tek kolu çözmek bir kökü; 3'e bölmeyi unutmak doğru konumu kaybettirir.",
    ],
    [
      "Gerçek x için |2x+1|≤5 eşitsizliğinin çözümü hangisidir?",
      ["(−3,2)", "[−2,3]", "[−3,2]", "x≤−3 veya x≥2", "[−5,5]"],
      2,
      "Pozitif üst sınır,−5≤2x+1≤5 demektir.",
      "Üç taraftan 1 çıkarıp pozitif 2'ye bölünce −3≤x≤2 bulunur. Uçlarda uzaklık 5 olduğu için dâhildir.",
      "Küçüklükte dış bölgeleri almak veya eşitlik varken uçları açmak farklı kümeler verir.",
    ],
    [
      "Gerçek x için |x−4|>2 eşitsizliği hangi değerleri seçer?",
      ["2<x<6", "[2,6]", "x≤2 veya x≥6", "x>6", "x<2 veya x>6"],
      4,
      "4 merkezinden 2 birimden daha uzak noktaları seç.",
      "Açık dış bölgeler x<4−2=2 ve x>4+2=6'dır. 2 ve 6'da uzaklık tam 2 olduğundan alınmaz.",
      "İki dış bölge veya ile bağlanır; biri sağda biri solda olduğu için ikisini aynı anda istemek çözümü yok eder.",
    ],
    [
      "Gerçek x için |x−2|=2x+1 denkleminin tek çözümü kaçtır?",
      ["−3", "1/3", "3", "−1/3", "2"],
      1,
      "Sağ taraf 2x+1 sıfır veya pozitif olmalıdır.",
      "İki kol x=−3 ve x=1/3 adaylarını verir. −3 için sağ taraf −5 olduğu için aday elenir; 1/3 için iki taraf 5/3 olur.",
      "|A|=B'den iki aday çıkması ikisinin de geçerli olduğunu garanti etmez; özgün eşitlik denetlenir.",
    ],
    [
      "x<3 olan gerçek x için √((x−3)²) ifadesi hangisine eşittir? √ işareti esas karekökü gösterir.",
      ["x−3", "3+x", "−x−3", "3−x", "±(x−3)"],
      3,
      "Karekök, karesini aldığın ifadenin mutlak değerini verir.",
      "√((x−3)²)=|x−3|. x<3 iken iç ifade negatif olduğundan−(x−3)=3−x olur.",
      "Kare ile kökü koşulsuz silmek negatif bir esas karekök üretir;± denklem köklerinde kullanılır.",
    ],
    [
      "Gerçek x için |x+2|+|x−4| ifadesinin alabileceği en küçük değer kaçtır?",
      ["6", "0", "2", "3", "8"],
      0,
      "−2 ile 4 arasındaki uzaklığı hesapla.",
      "İki noktaya uzaklık toplamı en az noktalar arası 6'dır; −2≤x≤4 boyunca(x+2)+(4−x)=6 olur.",
      "Her iki terimi ayrı sıfır yapmaya çalışmak mümkün değildir; x aynı anda −2 ve 4 olamaz.",
    ],
    [
      "Gerçek sayılarda |x−1|<−2 eşitsizliğinin çözüm kümesi hangisidir?",
      ["(−1,3)", "ℝ", "∅", "{1}", "x<−1 veya x>3"],
      2,
      "Uzaklığın en küçük olası değerini düşün.",
      "Mutlak değer her zaman ≥0'dır. Sıfırdan küçük bir değerden de küçük olamaz; hiçbir x eşitsizliği sağlamaz.",
      "Pozitif sağ taraf için kullanılan iç aralık kalıbını negatif sayıya uygulamak geçersizdir.",
    ],
    [
      "Gerçek x için ||x−1|−3|=2 denkleminin kaç farklı çözümü vardır?",
      ["2", "4", "1", "3", "0"],
      1,
      "Önce |x−1|=5 veya |x−1|=1 elde et.",
      "İlk uzaklık x=−4,6; ikinci x=0,2 verir. Dört aday farklıdır ve hepsi özgün eşitliği sağlar.",
      "Bir dış kolu unutmak veya her katmandaki eksi işaretini tek seferde kaldırmak kök kaybettirir.",
    ],
    [
      "y=|x+2|−3 grafiğinin tepe noktası hangisidir?",
      ["(2,3)", "(2,−3)", "(−2,3)", "(0,−1)", "(−2,−3)"],
      4,
      "Mutlak değerin içini sıfır yapan x'i bul.",
      "x+2=0 için x=−2; bu x'te y=0−3=−3. Grafik bu noktadan iki doğrusal kola ayrılır.",
      "İçteki+2'yi doğrudan sağa 2 birim diye okumak ötelemenin yönünü ters çevirir.",
    ],
  ],
  source:
    "MEBİ TYT Matematik Konu Özeti, basılı s. 36–38 (PDF 38–40); Aurelia 012 Mutlak Değer, PDF s. 2–5. Kaynaklarla karşılaştırılarak yazılmış özgün açıklamalar ve sorular; resmî soru aktarımı değildir.",
};

const exponents: Pack = {
  id: "uslu-sayilar",
  topic: "detail-206",
  title: "Üslü sayılar: işaret, işlem ve büyüklük",
  minutes: 65,
  objectives: [
    "Taban, üs ve parantez kapsamını doğru oku; sıfır ve negatif üs koşullarını koru.",
    "İşlem türüne uygun üs kuralını gerekçelendir ve ortak tabanla denklemleri çöz.",
    "Tabanın 1'e göre konumuyla karşılaştırmayı, tanım kümesiyle rasyonel üsleri denetle.",
  ],
  sections: [
    section(
      "Üs çarpan sayısını anlatır",
      "Pozitif tam sayı n için aⁿ, n tane a çarpanının çarpımıdır; a taban, n üs veya kuvvettir. 3⁴=3·3·3·3=81'dir; 3·4 değildir. a¹=a özel durumu bir çarpanı gösterir. Aynı tabanın kuvvetleri, bir başlangıcın sabit katsayıyla tekrar ölçeklenmesini anlatmak için de kullanılır.",
      "Pozitif tam sayı tanımını negatif veya sıfır üssüne çarpan sayısı diye aynen taşımayız; bu kuvvetleri işlem kurallarını tutarlı sürdürerek tanımlarız. Atölyedeki tekrar çarpım dizisi yalnız pozitif üs için gösterilir. Negatif üsse geçtiğinde görsel tersini almayı, sıfır üste geçtiğinde tanım koşulunu açıkça gösterir.",
    ),
    section(
      "Parantez tabanın sınırıdır",
      "(−3)⁴ ifadesinde taban −3'tür; dört negatif çarpan pozitif 81 verir. −3⁴ ise üs yalnız 3'ün üzerindedir ve baştaki eksi en son uygulanır:−81. Pozitif çift tam kuvvet negatif tabanın işaretini kaldırır; tek kuvvet negatif işareti korur. Üssün negatif olması ise sonuç negatif demek değildir.",
      "(−2)⁻³=1/(−2)³=−1/8, fakat 2⁻³=1/8'dir. Önce parantezi, sonra üs türünü, sonra işareti belirlemek iki farklı eksi görevini ayırır. Kesirde üs tüm parantezi kapsıyorsa pay ve paydaya uygulanır; yalnız payın üzerinde yazılıysa paydaya kendiliğinden aktarılmaz.",
    ),
    section(
      "Sıfırıncı ve negatif kuvvette sıfır taban sınırı",
      "a≠0 için a⁰=1'dir. Çünkü aᵐ/aᵐ=1 ve üs kuralıyla aᵐ⁻ᵐ=a⁰ olur. Bu kanıtta bölme bulunduğu için sıfır taban dışarıda kalır. 0'ın pozitif tam kuvveti 0; 0'ın negatif kuvveti tanımsızdır. 0⁰ bu dersin elementer sayı hesabında tanımlanmaz; bazı başka bağlamların kabulünü buraya taşıma.",
      "Pozitif tam n ve a≠0 için a⁻ⁿ=1/aⁿ'dir. Negatif üs, çarpmanın tersini anlatır: (2/3)⁻²=(3/2)²=9/4. Sadece üssün eksi işaretini silmek sayıyı değiştirmeden işlem yapmak değildir. 1'in tanımlı bütün gerçek kuvvetleri 1; −1'in tam sayı kuvvetleri tek–çiftliğe göre −1 veya 1 olur.",
    ),
    section(
      "Çarpma ve bölmede ortak tabanı izle",
      "Aynı tabanlı kuvvetler çarpılırken üsler toplanır: aᵐ·aⁿ=aᵐ⁺ⁿ. Pozitif üslerde bu, çarpanları birleştirmektir. Tam sayı üslerin genel kullanımı için taban ve ifadeler tanımlı olmalıdır; negatif üs veya bölüm varsa a≠0 gerekir. Bölmede üsler çıkarılır: aᵐ/aⁿ=aᵐ⁻ⁿ.",
      "Tabanları farklıysa önce ortak taban veya ortak üs arayabilirsin:8=2³,4=2². Fakat 2³·3⁴ için tabanları toplayıp 5⁷ yazılmaz. Aynı üs n varsa aⁿbⁿ=(ab)ⁿ kullanılabilir; negatif üs durumunda ilgili tabanlar sıfır olamaz. Her kuralın hangi yapıyı eşleştirdiğini söylemek ezberleri birbirinden ayırır.",
    ),
    section(
      "Üssün üssü ile çarpımın üssü",
      "Tam sayı üslerde tanımlı ifadeler için (aᵐ)ⁿ=aᵐⁿ'dir. 2³'ün dördüncü kuvveti, dört tane 2³ çarpanı içerir; toplam on iki 2 çarpanı elde edilir. aᵐⁿ yazımında hangi üssün paranteze ait olduğu önemlidir: (2³)²=2⁶ iken 2^(3²)=2⁹'dur; üst üste üsler parantez kapsamı belirtilmeden aynı işlem sayılmaz.",
      "(ab)ⁿ=aⁿbⁿ ve b≠0 olmak üzere(a/b)ⁿ=aⁿ/bⁿ kuralları tam sayı üslerde tanım koşulları korunarak kullanılır. Toplamın kuvveti böyle dağılmaz:(a+b)²=a²+2 ab+b²'dir. Rasyonel üslerde bu kuralları negatif tabanlara körlemesine taşımak işaret sorunları yaratır; bu derste kesirli üs dönüşümleri pozitif taban koşuluyla verilir.",
    ),
    section(
      "Toplama üs toplamak değildir",
      "aᵐ+aⁿ genellikle tek kuvvet yapısına doğrudan birleşmez. 2³+2⁴=8+16=24 iken 2⁷=128'dir. Taban ve üs tamamen aynı olduğunda katsayılar toplanır:3·2⁵+5·2⁵=8·2⁵. Katsayı ile üs farklı görevler taşır; 3·2⁵ ifadesindeki 3 yeni bir üs değildir.",
      "Farklı üsler bulunan toplamda ortak en küçük kuvvet çarpan alınabilir:2³+2⁵=2³(1+2²)=40. Çarpanın içindeki 1, ilk terimin kendisine bölünmesinden gelir; onu unutmak sık bir hatadır. Ardışık kuvvet farklarında da aynı yöntem geçerlidir; önce işlem türünü belirle, sonra çarpma kuralını yalnız çarpım olan bölüme uygula.",
    ),
    section(
      "Sıralamada taban 1'in hangi yanında?",
      "a>1 ise üs büyüdükçe aˣ büyür; 0<a<1 ise üs büyüdükçe aˣ küçülür. Örneğin 2⁵>2³ fakat(1/2)⁵<(1/2)³'tür. Bu monotonluk kuralı pozitif tabanlar içindir; negatif tabanda gerçek üslerin her değeri tanımlı olmadığı gibi tam sayı kuvvetlerde tek–çift işareti de değişir.",
      "Farklı tabanlı ifadeleri ortak tabana dönüştür:8⁴=2¹² ve 4⁵=2¹⁰ olduğundan ilki büyüktür. Ortak üs varsa pozitif tabanları karşılaştır; iki taraf negatif olabiliyorsa işareti önce belirle. Ortak taban bulunamadığında komşu kuvvetlerle sınır koymak yaklaşık ondalık hesaplamadan daha güvenilir olabilir.",
    ),
    section(
      "Üslü denklemi koşuluyla çöz",
      "a>0,a≠1 için aᵘ=aᵛ eşitliği u=v verir. 4^(x+1)=8^(x−1) denklemini 2 tabanına çevirince 2x+2=3x−3 bulunur. Taban 1 olursa üsler eşit olmak zorunda değildir; 1²=1⁷ karşı örnektir. Taban −1 için tam üslerin tek–çiftliği,0 için tanım ve pozitiflik koşulları ayrı ele alınır.",
      "Pozitif tabanlı eşitsizlikte a>1 ise üslerin sırası korunur; 0<a<1 ise ters döner. Eşit üslerde x²=y², x=y veya x=−y anlamına gelebilir; karesinin eşitliği işareti tek başına belirlemez. Her çözümde başlangıçtaki ifadelerin tanımlı kaldığını kontrol et; üs eşitlemek bu denetimin yerine geçmez.",
    ),
    section(
      "Kesirli üs ve tekrarlanan büyüme",
      "a>0, m tam sayı ve n pozitif tam sayı için a^(m/n)=ⁿ√(aᵐ) yazılabilir. 8^(2/3)=(∛8)²=4'tür. Pozitif taban koşulu, gerçek kök ve üs kurallarını tutarlı kullanmayı sağlar. Negatif tabanda tek köklerle bazı rasyonel kuvvetler tanımlı olabilir; kesri eşdeğer bir kesre genişletip kök derecesini değiştirmek koşulsuz güvenli bir yöntem değildir.",
      "Başlangıç değeri B, sabit çarpan r ve adım sayısı n ise son değer B·rⁿ'dir. Her adımda iki katına çıkmak, her adımda 2 eklemek değildir. Üç adım sonunda 8 kat olur; aradaki adım sayısını doğru say. Bilimsel gösterim sonraki başlıkta 10'un kuvvetlerini büyük ve küçük sayıların ölçeği olarak ayrıca geliştirir.",
    ),
  ],
  examples: [
    worked(
      "Üç tabanı tek tabana indir",
      "(2⁵·8⁻¹)/4⁻¹ işlemini hesapla.",
      "Önce 2 tabanına çevir; bölmede eksi üs çıkarmaya dikkat et.",
      [
        ["Ortak taban", "8=2³ ve 4=2².", "8⁻¹=2⁻³; 4⁻¹=2⁻²"],
        ["Çarpım", "Paydaki üsler toplanır.", "2⁵·2⁻³=2²"],
        ["Bölüm", "Paydanın −2 üssü çıkarılır.", "2²/2⁻²=2^(2−(−2))=2⁴"],
        ["Doğrula", "32·(1/8)/(1/4)=4/(1/4)=16."],
      ],
      "16.",
      "Sıfır taban yoktur; bütün negatif kuvvetler tanımlıdır.",
      "Bölmede 2−(−2) yerine 2−2 yazmak.",
    ),
    worked(
      "Parantez sonucu değiştirir",
      "−3⁴+(−3)⁴+(−3)³ ifadesini hesapla.",
      "Üssün tabana mı baştaki eksiye de mi uygulandığını ayır.",
      [
        ["İlk terim", "Eksi parantezsiz; üs önce uygulanır.", "−3⁴=−81"],
        [
          "İkinci terim",
          "Negatif tabanın çift kuvveti pozitiftir.",
          "(−3)⁴=81",
        ],
        [
          "Üçüncü terim",
          "Negatif tabanın tek kuvveti negatiftir.",
          "(−3)³=−27",
        ],
        ["Topla", "İlk iki terim birbirini götürür.", "−81+81−27=−27"],
      ],
      "−27.",
      "İlk iki terimi eşit işaretli almak toplamı değiştirir.",
      "Parantezsiz −3⁴'ü negatif tabanlı kuvvet sanmak.",
    ),
    worked(
      "Üs eşitleme için geçerli taban",
      "Gerçek x için 4^(x+1)=8^(x−1) denklemini çöz.",
      "Taban 2 pozitiftir ve 1 değildir; üs eşitliği geçerlidir.",
      [
        ["Yeniden yaz", "4=2² ve 8=2³.", "2^(2x+2)=2^(3x−3)"],
        [
          "Üsler",
          "Taban 2'nin gerçek kuvvet fonksiyonu bire birdir.",
          "2x+2=3x−3",
        ],
        ["Çöz", "Doğrusal denklemi düzenle.", "x=5"],
        ["Sağla", "Her iki taraf 2¹²'ye eşittir."],
      ],
      "x=5.",
      "4⁶=8⁴=4096.",
      "Çarpan 2 ve 3'ü üslerin tamamına dağıtmamak.",
    ),
    worked(
      "Toplamı çarpıma dönüştür",
      "2⁴+2⁶+2⁷ işlemini ortak kuvvet kullanarak hesapla.",
      "En küçük kuvvet 2⁴'ü dışarı al.",
      [
        ["Ortak çarpan", "Her terimi 2⁴ ile böl.", "2⁴(1+2²+2³)"],
        ["İçi hesapla", "Katsayıları topla.", "1+4+8=13"],
        ["Çarp", "Dıştaki 16 ile çarp.", "16·13=208"],
        ["Kontrol", "Ayrı hesap:16+64+128=208."],
      ],
      "208.",
      "Sonuç 2^(4+6+7) değildir; işlem toplamdır.",
      "Parantezde ilk 1'i unutmak.",
    ),
  ],
  recall: [
    {
      prompt: "a⁰=1 ve a⁻³=1/a³ için hangi koşul zorunlu?",
      answer:
        "a≠0. 0⁰ bu temel işlem bağlamında tanımlanmaz; 0'ın negatif kuvveti de tanımsızdır.",
    },
    {
      prompt: "(−2)⁴ ile −2⁴ neden farklıdır?",
      answer:
        "İlkinde taban −2 ve sonuç 16; ikincide üs yalnız 2'ye ait, sonuç −16'dır.",
    },
    {
      prompt: "0<a<1 için üs büyürse kuvvet ne yapar?",
      answer:
        "Küçülür. Örneğin(1/2)⁴<(1/2)²; eşitsizlikte üs sırası ters okunur.",
    },
    {
      prompt: "2³+2⁵'i neden 2⁸ yapamazsın?",
      answer: "Üs toplama çarpım kuralıdır. Toplam 2³(1+2²)=40'tır.",
    },
    {
      prompt:
        "aᵘ=aᵛ'den u=v sonucunu gerçek üslerde ne zaman güvenle çıkarırsın?",
      answer:
        "Pozitif ve 1'den farklı ortak taban için. 0,1 ve negatif tabanlar ayrıca incelenir.",
    },
  ],
  questions: [
    [
      "−2⁴+(−2)⁴ işleminin sonucu kaçtır? Üs önceliği standarttır.",
      ["0", "32", "−32", "16", "−16"],
      0,
      "İlk eksi parantez içinde değildir.",
      "−2⁴=−16, (−2)⁴=16; toplam 0'dır.",
      "İki ifadenin taban kapsamını aynı okumak işaret hatası yaratır.",
    ],
    [
      "2⁻³ sayısı hangisine eşittir?",
      ["−8", "−1/8", "8", "1/8", "1/6"],
      3,
      "Negatif üs çarpma tersini anlatır.",
      "2⁻³=1/2³=1/8. Pozitif tabanlı bir kuvvetin üssünün negatif olması sonucu negatif yapmaz.",
      "Eksi üssü sonuç önüne taşımak ters alma işlemi değildir.",
    ],
    [
      "Aşağıdaki ifadelerden hangisi bu dersin elementer gerçek sayı hesabında tanımsızdır?",
      ["(−5)⁰", "0⁵", "0⁻²", "1⁻⁸", "(−1)³"],
      2,
      "Sıfırın çarpma işlemine göre tersi var mı?",
      "0⁻²=1/0²=1/0 gerektirir ve tanımsızdır. Diğerleri sırasıyla 1,0,1 ve −1'dir.",
      "a⁰=1 kuralının sıfırdan farklı taban koşulunu unutma; burada tanımsız olan negatif sıfır kuvvetidir.",
    ],
    [
      "(3²·3⁵)/3³ işleminin değeri kaçtır?",
      ["9", "27", "243", "729", "81"],
      4,
      "Çarpımda üsleri topla, bölümde çıkar.",
      "Aynı ve sıfırdan farklı taban için 3^(2+5−3)=3⁴=81 bulunur.",
      "Çarpma ve bölmede üsleri çarpmak üssün üssü kuralıyla karışıklık yaratır.",
    ],
    [
      "2³+2⁵ işleminin sonucu kaçtır?",
      ["256", "40", "64", "32", "16"],
      1,
      "2³'ü ortak çarpan al.",
      "2³(1+2²)=8·5=40'tır; doğrudan 8+32 de aynı sonucu verir.",
      "Toplamda üsleri toplayıp 2⁸ yapmak geçersizdir.",
    ],
    [
      "(1/2)ˣ<(1/2)³ eşitsizliği gerçek sayılarda hangi koşula eşdeğerdir?",
      ["x<3", "x≤3", "x=3", "x>3", "x≥3"],
      3,
      "Taban 0 ile 1 arasında olduğunda kuvvet azalandır.",
      "Taban 1/2 için üs büyüdükçe değer küçülür; sıkı eşitsizlik x>3 verir.",
      "Tabanı 1'den büyük gibi kabul etmek eşitsizlik yönünü ters sonuca götürür.",
    ],
    [
      "Gerçek x için 4^(x+1)=8^(x−1) ise x kaçtır?",
      ["5", "−5", "1", "3", "2"],
      0,
      "İki tabanı 2'nin kuvveti olarak yaz.",
      "2^(2x+2)=2^(3x−3); ortak taban pozitif ve 1'den farklı olduğundan 2x+2=3x−3, x=5 olur.",
      "Üssün içindeki+1 ve −1'e katsayıyı dağıtmamak yanlış denklem kurar.",
    ],
    [
      "a=8⁴ ve b=4⁵ pozitif sayıları için hangi karşılaştırma doğrudur?",
      ["a=b", "a<b", "a>b", "a=2b", "b=4a"],
      2,
      "İkisini de 2 tabanına çevir.",
      "a=2¹², b=2¹⁰. Ortak taban 2>1 olduğundan 12>10 ile a>b bulunur; ayrıca a=4b'dir.",
      "Yalnız taban 8>4'e veya yalnız üs 4<5'e bakarak karar verme.",
    ],
    [
      "8^(2/3) sayısının pozitif gerçek değeri kaçtır?",
      ["2", "4", "8/3", "16", "64"],
      1,
      "Önce küpkök alıp sonra karesini alabilirsin.",
      "8 pozitif olduğundan 8^(2/3)=(∛8)²=2²=4'tür.",
      "Üssü 2/3 ile çarpmak veya kökün derecesini 2 sanmak farklı işlemler verir.",
    ],
    [
      "Başlangıçta 3 hücreli bir kültürde her adım sonunda hücre sayısı tam iki katına çıkıyor. Ölüm ve başka değişim olmadığı varsayılıyor. 4 adım sonra kaç hücre vardır?",
      ["11", "24", "96", "12", "48"],
      4,
      "Başlangıç değeriyle 2⁴'ü çarp.",
      "Dört katlanma sonunda 3·2⁴=3·16=48 olur. Ara sıra 6,12,24,48'dir.",
      "Başlangıcı ilk katlanma saymak veya her adımda 2 eklemek modelin koşulunu değiştirir.",
    ],
  ],
  source:
    "MEBİ TYT Matematik Konu Özeti, basılı s. 39–41 (PDF 41–43); Aurelia 013 Üslü Sayılar, PDF s. 2–5. Pozitif taban ve tam sayı üs koşulları açık tutularak yazılmış özgün anlatım ve sorular; resmî soru aktarımı değildir.",
};

const scientific: Pack = {
  id: "bilimsel-gosterim-katsayi",
  topic: "detail-207",
  title: "Bilimsel gösterim ve katsayı: aynı değeri farklı ölçekte oku",
  minutes: 55,
  objectives: [
    "Sıfırdan farklı sayıyı 1≤|a|<10 koşuluyla a×10ⁿ biçimine getir.",
    "Normalleştirme sırasında katsayı ve üssü ters yönde değiştirerek değeri koru.",
    "Dört işlem, işaret ve birim dönüşümlerini birlikte denetle.",
  ],
  sections: [
    section(
      "Katsayı sayı türünü, üs ölçeği görünür kılar",
      "Sıfırdan farklı bir gerçek sayı a×10ⁿ biçiminde,1≤|a|<10 ve n tam sayı koşullarıyla yazıldığında standart bilimsel gösterimdedir. a katsayı, n üs; 10ⁿ ise ölçek çarpanıdır. 4,7×10⁵ ile 470000 aynı sayıdır. Burada 10⁵, katsayıya beş eklemek değil 100000 ile çarpmaktır.",
      "Negatif sayılar da bu tanıma girer:−6,2×10³ geçerlidir, çünkü katsayının mutlak değeri 6,2'dir. 10 veya −10 katsayıları sınırın dışında; 1 ve −1 içindedir. Sıfır için 1≤|a| koşulu sağlanamaz; standart sıfırdan farklı sayı tanımı içinde zorla bir katsayı seçilmez. Atölye sıfırı ayrıca belirtir ve sahte normalleştirme üretmez.",
    ),
    section(
      "Virgülün yeri ile üs birlikte hareket eder",
      "Olağan sayıdan bilimsel gösterime geçerken ilk sıfır olmayan rakamdan sonra virgül bırak. 720000 sayısında 7,2 elde etmek için beş basamak sola gidilir; sayı 7,2×10⁵'tir. Virgülün başlangıcı son sıfırın sağıdır; onu 7 ile 2 arasına taşıyan hareketleri say. Basamakları tek tek saymak ezberlenmiş sıfır sayısından daha güvenilirdir.",
      "0,000072 için 7,2'ye ulaşmak virgülü beş basamak sağa götürür; üs −5 olur. Bilimsel gösterimden olağan yazıma dönerken 10'un pozitif kuvveti virgülü sağa, negatif kuvveti sola taşır. İki dönüşümün yönünü karıştırmamak için çarpanı açık yaz:10⁻⁵=0,00001; 7,2 katı 0,000072'dir. Yaklaşık büyüklük kontrolü son basamak kadar önemlidir.",
    ),
    section(
      "Normalleştirmede değeri koru",
      "84×10⁻⁵ bir sayıyı doğru belirtir ama katsayı 84 olduğu için standart biçimde değildir. 84=8,4×10 olduğundan 84×10⁻⁵=8,4×10⁻⁴ yapılır. Katsayı 10'a bölünürken üs 1 artar; iki değişim birbirini dengeler. 0,84×10⁻⁵'te katsayı 10 ile çarpılırken üs 1 azalır:8,4×10⁻⁶.",
      "Atölyedeki katsayıyı 10'a böl veya 10 ile çarp işlemleri tam bu dengeyi gösterir. Ölçek değişirken olağan sayı sabit kalmalıdır. Katsayı 10'a eşit olduğunda hâlâ bir adım gerekir; doğru sınır 1≤|a|<10'dur. Son sayıdaki işaret normalleştirme sırasında korunur; negatif katsayıyı pozitif yapmak değeri koruyan işlem değildir.",
    ),
    section(
      "Toplama ve çıkarmada ortak ölçek kur",
      "3,2×10⁵+7×10⁴ ifadesinde doğrudan katsayıları toplayamazsın; birimler gibi ölçekler eşit olmalıdır. 7×10⁴=0,7×10⁵ yazınca toplam 3,9×10⁵ olur. İstersen küçük üssü ortak alıp(32+7)×10⁴=39×10⁴ yazabilir, sonra normalleştirebilirsin. İki yöntem aynı sayıyı verir.",
      "Çıkarmada da önce üsleri eşitle. Sonuç sıfırdan farklıysa katsayının mutlak değeri 1’den küçük veya 10’a eşit ya da büyük olduğunda yeniden normalleştir. 5×10³−4,8×10³=0,2×10³=2×10². Toplamada üsleri toplamak çarpım kuralını yanlış yere taşır. Sayıları olağan biçime açarak kaba sonuç kontrolü yapmak sıfırların arasında kaybolmayı önler.",
    ),
    section(
      "Çarpma ve bölmede katsayı ile ölçeği ayır",
      "(a×10ᵐ)(b×10ⁿ)=(ab)×10ᵐ⁺ⁿ'dir. Katsayılar çarpılır, üsler toplanır; ardından standart katsayı aralığı denetlenir. Örneğin(6×10⁻³)(4×10⁵)=24×10²=2,4×10³. Ara katsayı 24 geçerlilik hatası değildir; sadece son bilimsel biçime henüz getirilmemiştir.",
      "Bölmede b≠0 koşuluyla katsayılar bölünür ve üsler çıkarılır:(a×10ᵐ)/(b×10ⁿ)=(a/b)×10ᵐ⁻ⁿ. Paydadaki üs negatifse çıkarılan eksi işaretini koru. Bir sonucun üssünü söylemek tek başına sayıyı belirlemez; katsayı, işaret ve varsa fiziksel birim birlikte yazılmalıdır.",
    ),
    section(
      "Karşılaştırmada önce işaret ve standart biçim",
      "Pozitif, standart bilimsel gösterimlerde üs daha büyükse sayı daha büyüktür; üsler eşitse katsayıya bakılır. 9×10⁻⁸,2×10⁻⁹'dan büyüktür:−8>−9 veya ilkini 90×10⁻⁹ yazarak görebilirsin. Katsayılar standart değilse yalnız üs karşılaştırması güvenilir değildir; 0,01×10⁶ ile 9×10⁵ bunun nedenini gösterir.",
      "Negatif sayılarda önce mutlak büyüklüğü karşılaştırıp sayı doğrusundaki yönü hatırla:−8×10⁴=−80000,−2×10³=−2000'den küçüktür. Negatif bir üs sayıyı negatif yapmaz; işaret katsayıdan gelir. 10'un eşit üs aralıklarını gösteren çizgi logaritmik bir ölçektir; eşit aralıklar eşit toplamsal fark değil, eşit çarpan değişimi belirtir.",
    ),
    section(
      "Birim değişimi de 10'un kuvvetidir",
      "1 m=10³ mm olduğundan milimetre değerini metreye çevirirken 10³'e böl. 3,2×10⁶ mm=3,2×10³ m. Sayıdaki üssün değişmesi tek başına ölçülen uzunluğun değiştiği anlamına gelmez; kullanılan birim büyümüştür. Birim dönüşümü yapılmadan iki uzunluk sayısını doğrudan oranlamak yanlış model kurabilir.",
      "Alan ve hacim dönüşümünde uzunluk çarpanını sırasıyla karesine ve küpüne yükselt:1 m²=10⁶ mm²,1 m³=10⁹ mm³. Hız gibi türetilmiş birimlerde pay ve paydayı ayrı dönüştür. Bilimsel gösterim yalnız sıfırları kısaltma tekniği değil, işlemde boyutu ve büyüklüğü korumayı kolaylaştıran bir yazımdır.",
    ),
    section(
      "Kesin değer, yaklaşık değer ve ölçüm ayrımı",
      "Bir sayıyı tam olarak başka biçimde yazmak yuvarlama değildir:0,00000064=6,4×10⁻⁷ eşitliği kesindir. Katsayıyı 6 diye yuvarlarsan yaklaşık değer üretirsin ve≈ işaretiyle belirtmelisin. Soru yaklaşık bir sonuç istemiyorsa rakamları sırf kısa görünsün diye atma; son karşılaştırma veya işlem sonucu değişebilir.",
      "Ölçümün anlamlı basamakları deneysel kesinlik konusudur; bilimsel gösterimde katsayı kullanmak tek başına ölçüm hatasını bildirmez. Soru verilen sayıları tam kabul ediyorsa tam işle; ölçüm hassasiyeti veya yuvarlama kuralı verilmişse onu ayrıca uygula. Son kontrol: katsayı aralıkta mı, üs tam sayı mı, işaret ve birim doğru mu, geri açılan sayı başlangıçla aynı mı?",
    ),
    ...scientificNotationSections,
  ],
  examples: [
    worked(
      "Küçük sayıdaki sıfırları tek tek izle",
      "0,0000072 sayısını bilimsel gösterime getir.",
      "İlk sıfır olmayan 7'den sonra virgül bırak; geri açarak dene.",
      [
        ["Katsayı", "Katsayı 7,2 seçilince 1≤7,2<10 olur."],
        [
          "Basamak",
          "Olağan sayıdan 7,2'ye geçişte virgül altı basamak sağa taşınır.",
          "n=−6",
        ],
        ["Yazım", "Ölçeği negatif kuvvetle belirt.", "7,2×10⁻⁶"],
        ["Geri aç", "7,2·0,000001=0,0000072."],
      ],
      "7,2×10⁻⁶.",
      "Sayı 1'den küçüktür; pozitif katsayının üssünün negatif olması tutarlıdır.",
      "Sıfır sayısını basamak hareketiyle karıştırıp üssü bir eksik yazmak.",
    ),
    worked(
      "Standart olmayan katsayı",
      "84×10⁻⁵ ifadesini değeri değişmeden normalleştir.",
      "Katsayıyı 10'a bölürken 10'un üssünü 1 artır.",
      [
        ["Koşul", "84 katsayısı 10'dan büyük olduğu için standart değildir."],
        ["Ayrıştır", "84=8,4×10.", "84×10⁻⁵=8,4×10¹×10⁻⁵"],
        ["Birleştir", "Üsleri topla.", "8,4×10⁻⁴"],
        ["Kontrol", "Her iki yazım 0,00084'tür."],
      ],
      "8,4×10⁻⁴.",
      "Katsayı küçülürken üs büyür; değer korunur.",
      "Katsayıyı 10'a bölüp üssü de azaltmak sayıyı 100'e bölmüş olur.",
    ),
    worked(
      "Çarpımdan sonra bir adım daha",
      "(6×10⁻³)(4×10⁵) ifadesini standart biçimde hesapla.",
      "Katsayıları ve üsleri ayrı izle.",
      [
        ["Katsayı", "6·4=24."],
        ["Ölçek", "Çarpımda üsler toplanır.", "−3+5=2"],
        ["Ara sonuç", "24×10² doğrudur ama standart katsayı değildir."],
        ["Son biçim", "24=2,4×10 ile bir üs ekle.", "2,4×10³"],
      ],
      "2,4×10³.",
      "0,006·400000=2400.",
      "Üsleri çarpmak veya 24 katsayısını son standart cevap olarak bırakmak.",
    ),
    worked(
      "Ortak üs olmadan toplama yapma",
      "3,2×10⁵+7×10⁴ işlemini bilimsel gösterimde yaz.",
      "Büyük ölçeği ortak al; küçük terimi buna dönüştür.",
      [
        ["Eşitle", "7×10⁴=0,7×10⁵."],
        ["Topla", "Aynı ölçeğin katsayıları toplanır.", "(3,2+0,7)×10⁵"],
        ["Normalleştir", "3,9 katsayısı koşulu zaten sağlar.", "3,9×10⁵"],
        ["Kontrol", "320000+70000=390000."],
      ],
      "3,9×10⁵.",
      "Toplam iki pozitif toplananın her birinden büyüktür.",
      "Katsayıları 3,2+7 yapıp üsleri de toplamak.",
    ),
    worked(
      "Bölüm ve birim dönüşümü",
      "4,5×10⁶ mm yolu 1,5×10² s sürede sabit hızla alan cismin hızını m/s olarak bul. 1 m=10³ mm.",
      "Önce hızın mm/s değerini, sonra birimi dönüştür.",
      [
        ["Katsayı", "4,5/1,5=3."],
        ["Üs", "Bölümde 6−2=4.", "v=3×10⁴ mm/s"],
        [
          "Birim",
          "Milimetreden metreye geçerken 10³'e böl.",
          "3×10⁴/10³=3×10¹ m/s",
        ],
        ["Yorum", "Sonuç 30 m/s; süre 150 s ve yol 4500 m ile de doğrulanır."],
      ],
      "3×10¹ m/s=30 m/s.",
      "Hız birimi uzunluk/zaman; sadece üssü değil birimi de yazdın.",
      "mm ve m'yi aynı birim saymak.",
    ),
    ...scientificNotationExamples,
  ],
  recall: [
    {
      prompt: "Katsayı sınırında 1 ve 10'dan hangisi dâhil?",
      answer:
        "1 dâhil,10 hariç:1≤|a|<10. İşaret katsayının mutlak değeriyle denetlenir.",
    },
    {
      prompt: "Katsayıyı 10'a bölerken değeri korumak için üs nasıl değişir?",
      answer: "Üs 1 artar. Örneğin 42×10³=4,2×10⁴.",
    },
    {
      prompt: "Toplamada ilk işlem nedir?",
      answer:
        "10'un üslerini eşitlemek; sonra katsayıları toplayıp sonucu normalleştirmek.",
    },
    {
      prompt: "Negatif üs, negatif sayı demek midir?",
      answer:
        "Hayır; 10⁻³ pozitif 0,001'dir. Sayının işareti katsayıdan gelir.",
    },
    {
      prompt: "mm²'den m²'ye hangi çarpanla geçilir?",
      answer: "10⁶'ya bölünür; uzunluk dönüşümünün karesi kullanılır.",
    },
    {
      prompt: "İki büyütme art arda uygulanırsa toplam oran nasıl bulunur?",
      answer: "İlk oranı ikinci oranla çarp. Birimsiz oranların çarpımı uzunluk birimini değiştirmez.",
    },
  ],
  questions: [
    [
      "0,000072 sayısının standart bilimsel gösterimi hangisidir?",
      ["7,2×10⁻⁵", "7,2×10⁵", "0,72×10⁻⁴", "72×10⁻⁶", "7,2×10⁻⁶"],
      0,
      "7,2'ye ulaşmak için virgül kaç basamak sağa gider?",
      "Virgül beş basamak sağa taşınır; sayı 7,2×10⁻⁵'tir. Katsayı 7,2 koşulu sağlar.",
      "0,72 veya 72 katsayıları sayısal eşitlik verebilir ama standart katsayı koşulunu sağlamaz.",
    ],
    [
      "48×10⁶ ifadesinin standart bilimsel gösterimi hangisidir?",
      ["4,8×10⁵", "4,8×10⁶", "48×10⁶", "4,8×10⁷", "0,48×10⁸"],
      3,
      "Katsayı 10'a bölünürse üs 1 artmalıdır.",
      "48=4,8×10 olduğundan 48×10⁶=4,8×10⁷ olur.",
      "Katsayı ve üssü aynı yönde azaltmak değeri korumaz; 0,48 standart değildir.",
    ],
    [
      "Standart bilimsel gösterim a×10ⁿ için 1≤|a|<10 ve n tam sayı koşulları kullanılıyor. Hangisi bu koşulları sağlar?",
      ["0,5×10⁴", "10×10³", "−1×10⁴", "0×10⁸", "−12×10²"],
      2,
      "Katsayının işaretine değil mutlak değer aralığına bak.",
      "−1 katsayısının mutlak değeri 1'dir ve sınırdadır; üs 4 tam sayıdır. Diğer katsayılar aralık dışındadır.",
      "Negatif katsayıyı otomatik geçersiz saymak veya 10 sınırını dâhil etmek yanlıştır.",
    ],
    [
      "(6×10⁻³)(4×10⁵) işleminin standart bilimsel gösterimi hangisidir?",
      ["24×10²", "2,4×10²", "2,4×10⁻¹⁵", "1×10²", "2,4×10³"],
      4,
      "Önce 24×10² elde et; sonra katsayıyı normalleştir.",
      "Katsayı 6·4=24, üs −3+5=2; 24×10²=2,4×10³.",
      "24×10² aynı sayıdır fakat sorulan standart biçim değildir; üsler çarpılmaz.",
    ],
    [
      "3,2×10⁵+7×10⁴ işleminin sonucu hangisidir?",
      ["10,2×10⁹", "3,9×10⁵", "1,02×10⁶", "3,27×10⁵", "3,9×10⁴"],
      1,
      "7×10⁴'ü0,7×10⁵ olarak yaz.",
      "Aynı ölçekle(3,2+0,7)×10⁵=3,9×10⁵; olağan değer 390000'dir.",
      "Toplamda üs toplamak veya eşitlenmemiş katsayıları birleştirmek farklı sayı üretir.",
    ],
    [
      "(8,4×10⁷)/(2,1×10³) işleminin sonucu hangisidir?",
      ["4×10¹⁰", "4×10³", "0,4×10⁴", "4×10⁴", "6,3×10⁴"],
      3,
      "Katsayıları böl ve üsleri çıkar.",
      "8,4/2,1=4; 7−3=4. Sonuç 4×10⁴'tür ve standarttır.",
      "Bölmede üsleri toplamak çarpım kuralını yanlış kullanmaktır.",
    ],
    [
      "a=9×10⁻⁸ ve b=2×10⁻⁹ pozitif sayıları için hangi karşılaştırma doğrudur?",
      ["a>b", "a<b", "a=b", "a=9b", "b=2a"],
      0,
      "a'yı 10⁻⁹ ölçeğinde yazabilirsin.",
      "a=90×10⁻⁹, b=2×10⁻⁹ olduğundan a>b; a/b=45'tir.",
      "Negatif üsleri karşılaştırırken −8'in −9'dan büyük olduğunu unutma.",
    ],
    [
      "1 m=10³ mm olduğuna göre 3,2×10⁶ mm kaç metredir?",
      ["3,2×10⁹", "3,2×10⁶", "3,2×10³", "3,2×10⁻³", "3,2×10²"],
      2,
      "Milimetre sayısını 1000'e böl.",
      "3,2×10⁶/10³=3,2×10³ m olur; aynı uzunluk 3200 metredir.",
      "Birim büyürken sayısal değeri de büyütmek dönüşümün yönünü ters çevirir.",
    ],
    [
      "a=−8×10⁴ ve b=−2×10³ için hangi ifade doğrudur?",
      ["a>b", "a<b", "a=b", "a=4b", "a ve b pozitiftir"],
      1,
      "Önce iki sayıyı sayı doğrusundaki yerleriyle düşün.",
      "a=−80000, b=−2000. Sıfırın daha solundaki −80000 daha küçüktür.",
      "Pozitif standart gösterimlerdeki büyük üs kuralını işaret denetlemeden negatif sayılara taşımak yanlış yön verir.",
    ],
    [
      "6,4×10⁻⁷ sayısının olağan ondalık yazımı hangisidir?",
      ["64000000", "0,0000064", "0,000064", "0,000000064", "0,00000064"],
      4,
      "6,4'ün virgülünü yedi basamak sola taşı.",
      "10⁻⁷=0,0000001; 6,4 katı 0,00000064'tür.",
      "Virgül basamak sayısını ilk sıfır olmayan rakamdan önceki sıfırların sayısıyla aynı saymak bir basamak kaydırabilir.",
    ],
  ],
  source:
    "Aurelia 014 Bilimsel Gösterim ve Katsayı içerik 1.1, PDF s. 1–10. Üs işlemleri için MEBİ TYT Matematik Konu Özeti basılı s. 39–41 (PDF s. 41–43). Bu dersteki alıştırmalar özgündür. Soru çalışmasının sonunda Geçmiş sınavlardan öğren bölümündeki 2021 TYT Temel Matematik 3 kaynak kaydına ulaşabilirsin.",
};

const roots: Pack = {
  id: "koklu-sayilar",
  topic: "detail-208",
  title: "Köklü sayılar: esas değer, alan ve güvenli dönüşüm",
  minutes: 70,
  objectives: [
    "Esas kök ile denklemin köklerini ayır; çift/tek derece ve tanım kümesini denetle.",
    "Kare çarpan ayırma, benzer terim, eşlenik ve karşılaştırmayı gerekçeli uygula.",
    "Kare almanın sahte aday üretebildiğini özgün denklem kontrolüyle göster.",
  ],
  sections: [
    section(
      "Karekök bir değer, denklem iki çözüm verebilir",
      "a≥0 için √a, karesi a olan sayıların negatif olmayanıdır; esas karekök denir. √49=7'dir. Buna karşılık x²=49 denkleminin iki gerçek çözümü x=7 ve x=−7'dir. Kök işaretinin sonucu ile denklemin çözüm kümesi farklı sorulardır; √a'nın önüne kendiliğinden± eklenmez.",
      "Alanı a birim² olan karenin kenar uzunluğu √a birimdir; uzunluk negatif olamaz. Atölyede alanı değiştirirken karenin kenarı doğrusal değil karekök ilişkisiyle değişir. Alan dört katına çıkarsa kenar iki katına çıkar. Bu model, esas kökün neden tek ve negatif olmayan değer seçtiğini geometrik olarak görünür kılar.",
    ),
    section(
      "Kök derecesi ve gerçek sayı koşulu",
      "Kök derecesi n,2 veya daha büyük bir tam sayıdır. Çift dereceli gerçek kökte kök içi ≥0 olmalıdır; √(−4) gerçek sayı değildir. Tek dereceli kökler negatif değerlerde de tanımlıdır:∛(−8)=−2. Negatif sayının çift dereceden kökünü gerçek sayı gibi kullanarak işlem kuralı uygulama.",
      "Köklü ifade paydadaysa hem kökün tanımı hem paydanın sıfır olmaması gerekir. √(x−1)/√(5−x) için x−1≥0 ve 5−x>0 birlikte x∈[1,5) verir. İlk kökün sıfır olması serbest, paydadakinin sıfır olması yasaktır. Tanım kümesini işlem sonunda değil başta yazmak sadeleştirmede kaybolan yasak değerleri korur.",
    ),
    section(
      "Kareden çıkarken mutlak değer kalır",
      "Gerçek A için √(A²)=|A|; çünkü esas karekök negatif değildir. A=−6 iken √36=6, A'nın kendisi −6 değildir. Çift derece n içinⁿ √(Aⁿ)=|A|; tek derece için aynı yapı A verir. Kuralın hangi derecede olduğunu söylemeden kökle kuvveti silmek işareti kaybettirir.",
      "√((x−2)²) ifadesi x≥2'de x−2, x<2'de 2−x'tir. Atölyede negatif bir x seçip kare alanından geri döndüğünde kenarın |x| olduğunu izle. Buradaki x işaretli bir cebirsel sayı, karenin kenarı ise uzunluktur; ikisinin aynı sembolle temsil edilmesi ancak x≥0 koşuluyla yapılabilir.",
    ),
    section(
      "Tam kare çarpanı dışarı çıkar",
      "√72=√(36·2)=6√2. Kök içini en büyük tam kare çarpan ile kalan biçiminde ayırmak en sade gösterime hızlı ulaştırır. Küçük bir kareyle başlamak da doğrudur:√72=√(4·18)=2√18; fakat √18'in hâlâ sadeleşmesi gerekir. Dışarı çıkan sayının karesi, içeriden çıkardığın çarpanı vermelidir.",
      "Pozitif katsayıyı kök içine alırken karesini al:3√5=√45. Negatif katsayıyı kare içine gizleyip işaretini yok etme:−3√5=−√45'tir. Kök içinden değişkenli kare çarpan çıkarırken √(x²y)=|x|√y için y≥0 koşulunu koru. Sayısal yöntem, değişkende mutlak değer ve tanım denetimine ihtiyaç duyar.",
    ),
    section(
      "Toplamada önce benzer kökü oluştur",
      "a√m+b√m=(a+b)√m; burada ortak kök yapısı aynıdır. √12+√27 önce 2√3+3√3'e, sonra 5√3'e dönüşür. √2+√3 için bu birleştirme yapılamaz; kök içlerini toplayıp √5 yazmak geçersizdir. Bir terimin kök dışı katsayısının görünmemesi 1 olduğu anlamına gelir.",
      "Çıkarmada da kökleri önce sadeleştir ve katsayıların işaretlerini koru. 5√12−2√27=10√3−6√3=4√3. Sonucu kontrol etmek için yaklaşık değer veya karesini alma kullanılabilir; fakat karesini alırken çapraz terimleri unutma.(√a+√b)²=a+b+2√(ab), yalnız a+b değildir.",
    ),
    section(
      "Çarpma ve bölmede tanımı koru",
      "a,b≥0 için √a·√b=√(ab). a≥0,b>0 için √a/√b=√(a/b). Koşullar, gerçek kareköklerin ve bölümün tanımlı olmasını sağlar. √2·√8=√16=4'tür. √(−1)·√(−1) için bu gerçek sayı kuralını kullanıp yanlış sonuca gitme; ilk iki ifade zaten bu alanda tanımlı değildir.",
      "Katsayıları ve kök içlerini ayrı çarp: (2√3)(5√6)=10√18=30√2. Farklı kök derecelerini eşitleme işlemi özellikle negatif içlerde işaret sorunu çıkarabilir; bu derste böyle genişletmeler pozitif içlerle sınırlanır. İç içe kökte derece çarpımı, pozitif tanım koşulları altında kullanılabilir; parantezin hangi bölümü kapsadığı açık olmalıdır.",
    ),
    section(
      "Eşlenik değeri değil gösterimi değiştirir",
      "Paydayı rasyonelleştirmek için payı ve paydayı aynı sıfırdan farklı ifadeyle çarparız; aslında 1 ile çarpmış oluruz. 3/√5=3√5/5. İki terimli √7−2 paydasında eşlenik √7+2 seçilirse çarpım 7−4=3 olur. Böylece 3/(√7−2)=√7+2 elde edilir.",
      "Bu derste eşlenik sözcüğü, karekök içeren iki terimde ortadaki işaretin değiştirilmesini anlatır: (a+√b)(a−√b)=a²−b. Payda ve çarpan sıfır olmamalıdır. Rasyonelleştirme zorunlu bir sayı değişimi değildir; eşdeğer yazım sağlar. Soru hangi biçimi istiyorsa o biçimde yanıtla ve sadeleşen ifadenin başlangıçtaki tanım kümesini sakla.",
    ),
    section(
      "Sıralamada pozitiflik ve tam kare aralığı",
      "25<30<36 olduğundan 5<√30<6. Karekök, negatif olmayan sayılarda artandır; kök içlerinin sırası korunur. 3√2 ile 2√5 pozitif olduğundan karelerini karşılaştırabiliriz:18<20, yani 3√2<2√5. Her iki tarafın negatif olmadığını söylemek yöntemin parçasıdır.",
      "Negatif iki sayıda kareleri karşılaştırmak aynı yönü korumaz; −5<−2 fakat 25>4'tür. Farklı derecelerde kökler için iç değer 1'in hangi yanında olduğuna dikkat et:8'in karekökü küpkökünden büyükken 1/8'in karekökü küpkökünden küçüktür. Kök derecesi büyürse değer daima küçülür gibi koşulsuz bir ezber kullanma.",
    ),
    section(
      "Köklü denklemde önce koşul, sonra kare",
      "√(2x+3)=x denkleminde sol taraf ≥0 olduğundan x≥0 gerekir. Kare almak x²=2x+3 verir; bundan çıkan −1 ve 3 adaylarından yalnız 3 ön koşulu ve özgün eşitliği sağlar. Kare alma iki farklı işareti aynı sonuca götürebildiği için geri dönüşü otomatik eşdeğer değildir.",
      "Önce köklü terimi yalnız bırak; iki tarafın işaretini incele; sonra uygun kuvvet al. Birden fazla kök varsa bu işlemi kademeli yap. Adayları yalnız karesi alınmış son denklemde değil ilk köklü denklemde dene. Koşulu sağlamayan adaya sahte kök demek, bütün cebir yanlış demek değildir; dönüşümün aday kümesini genişletmiş olduğunu anlatır.",
    ),
    section(
      "Özel kökü açarken eşleşen toplam ve çarpımı bul",
      "m,n≥0 için(√m+√n)²=m+n+2√(mn). Bu nedenle √(a+2√b) yapısında m+n=a ve mn=b sağlayan sayılar aranabilir; dış kök esas değeri seçer. √(7+4√3) için m=4,n=3 uygundur ve sonuç 2+√3'tür. Yapıyı iki ayrı köke dağıtmak yerine özdeşliği tersten kullanmış oluruz.",
      "Eksi durumda √(a−2√b)=|√m−√n|'dir; m≥n seçilirse mutlak değer √m−√n olur. Kök içinin gerçek ve negatif olmayan kaldığını kontrol et. Böyle bir eşleşme her verilen a,b için basit tam sayılarla bulunmayabilir; bulunamaması sayı tanımsızdır demek değildir. Yöntem seçiminde önce sorunun gerçekten bu özdeşlik yapısında olup olmadığına bak.",
    ),
  ],
  examples: [
    worked(
      "Alanı kenara dönüştür",
      "Alanı 72 birim² olan karenin kenarını ve çevresini tam köklü biçimde bul.",
      "Alan=kenar², kenar ≥0; sonra tam kare çarpanı ayır.",
      [
        ["Esas kök", "Kenar uzunluğu √72'dir; negatif kök uzunluk değildir."],
        ["Sadeleştir", "72=36·2.", "√72=6√2"],
        ["Çevre", "Dört eşit kenarı topla.", "4·6√2=24√2"],
        ["Alanı geri kur", "(6√2)²=36·2=72."],
      ],
      "Kenar 6√2 birim; çevre 24√2 birim.",
      "Alan birimi kare, çevre birimi uzunluktur.",
      "Alan 72 iken kenarı 36 veya±6√2 yazmak.",
    ),
    worked(
      "Benzer kökü önce üret",
      "5√12−2√27 işlemini sadeleştir.",
      "İki kökü de √3 katına dönüştür.",
      [
        ["İlk kök", "12=4·3.", "5√12=10√3"],
        ["İkinci kök", "27=9·3.", "2√27=6√3"],
        ["Katsayılar", "Kök yapısı aynı olduğu için çıkar.", "(10−6)√3=4√3"],
        ["Kontrol", "Yaklaşık 17,32−10,39≈6,93 ve 4√3≈6,93."],
      ],
      "4√3.",
      "Kök içleri benzeşmeden katsayı birleştirmedin.",
      "√12−√27'yi √(12−27) yapmak.",
    ),
    worked(
      "Eşlenikle aynı değeri koru",
      "3/(√7−2) ifadesinin paydasını rasyonelleştir.",
      "Pay ve paydayı √7+2 ile çarp; sıfır olmama koşulunu denetle.",
      [
        ["Tanım", "√7≠2 olduğundan ilk payda sıfır değildir; √7+2 pozitiftir."],
        [
          "Bir ile çarp",
          "Aynı ifadeyi paya ve paydaya koy.",
          "3(√7+2)/((√7−2)(√7+2))",
        ],
        ["Fark kareleri", "Payda 7−4=3 olur."],
        ["Sadeleştir", "Ortak 3'ü kaldır.", "√7+2"],
      ],
      "√7+2.",
      "Sonuç yaklaşık 4,646; ilk kesir de 3/0,646≈4,646.",
      "Eşleniği yalnız paydaya uygulayarak sayıyı değiştirmek.",
    ),
    worked(
      "Sahte adayı özgün denklemde ele",
      "Gerçek x için √(2x+3)=x denklemini çöz.",
      "Sağ tarafın negatif olamayacağını önce yaz.",
      [
        ["Koşul", "x≥0; bu koşul kök içinin de tanımlı olmasını sağlar."],
        ["Kare", "İki tarafın karesini al.", "2x+3=x²"],
        ["Adaylar", "Çarpanlara ayır.", "(x−3)(x+1)=0 ⇒ x=3 veya −1"],
        ["Sağlama", "3 için √9=3; −1 için √1=1≠−1."],
      ],
      "Çözüm kümesi{3}.",
      "Kare alınmış denklemin iki kökü, ilk denklemin iki kökü demek değildir.",
      "−1'i ilk denklem yerine yalnız ikinci dereceden denklemde denemek.",
    ),
    worked(
      "Paydaki ve paydadaki sıfırın farkı",
      "√(x−1)/√(5−x) ifadesinin gerçek sayılarda tanım kümesini bul.",
      "İki kökün tanımını ve paydanın sıfır yasağını birlikte uygula.",
      [
        ["Pay", "x−1≥0 gerekir.", "x≥1"],
        ["Payda", "Kök tanımlı ve sıfırdan farklı olmalıdır.", "5−x>0 ⇒ x<5"],
        ["Kesişim", "İki koşulu aynı anda sağla.", "1≤x<5"],
        [
          "Uçlar",
          "x=1 payı sıfır yapar ve kabul; x=5 paydayı sıfır yapar ve yasak.",
        ],
      ],
      "[1,5).",
      "x=3 her iki kökü ve bölümü tanımlı yapar.",
      "Paydadaki kök için yalnız ≥0 koşulu kullanmak.",
    ),
  ],
  recall: [
    {
      prompt: "√49 ile x²=49'un cevabı aynı biçimde mi?",
      answer: "Hayır. √49 tek esas değer 7; denklemin çözüm kümesi{−7,7}.",
    },
    {
      prompt: "√(A²)'nin doğru genel karşılığı nedir?",
      answer: "Gerçek A için |A|. A≥0 bilinirse A, A<0 ise−A olur.",
    },
    {
      prompt: "√a/√b için gerçek sayılarda koşullar?",
      answer: "a≥0,b>0; paydadaki kök sıfır da olamaz.",
    },
    {
      prompt: "Kare alma neden sahte kök üretebilir?",
      answer:
        "İşaret bilgisini kaybeder. Her aday ilk köklü denklemde ve tanım kümesinde denenmelidir.",
    },
    {
      prompt:
        "√(a−2√b)'yi iki kök farkına açarken hangi işaret denetimi kalır?",
      answer:
        "m+n=a,mn=b,m,n≥0 ise sonuç |√m−√n| olur; m≥n seçmeden mutlak değeri silme.",
    },
  ],
  questions: [
    [
      "√49 ifadesinin esas gerçek değeri kaçtır?",
      ["7", "−7", "±7", "49", "14"],
      0,
      "Kök işareti negatif olmayan tek değeri seçer.",
      "7²=49 ve 7≥0; √49=7'dir.",
      "±7, x²=49 denkleminin iki çözümünü ifade eder; √49'un tek değeri değildir.",
    ],
    [
      "x<2 için √((x−2)²) ifadesi hangisine eşittir? x gerçektir,√ esas kareköktür.",
      ["x−2", "x+2", "−x−2", "2−x", "±(x−2)"],
      3,
      "Önce |x−2| yaz.",
      "Kareden köke geçiş |x−2| verir; x<2 olduğundan−(x−2)=2−x olur.",
      "Kök ile kareyi koşulsuz silmek negatif sonuç oluşturur.",
    ],
    [
      "√72'nin en sade köklü biçimi hangisidir?",
      ["36√2", "3√8", "6√2", "2√18", "8√3"],
      2,
      "72 içindeki en büyük tam kare 36'dır.",
      "√72=√(36·2)=6√2. 3√8 ve 2√18 sayısal olarak eşit olsa da hâlâ sadeleşir.",
      "Sorulan en sade biçimdir; eşdeğer ama sadeleşmemiş seçenek son cevap değildir.",
    ],
    [
      "√12+√27 işleminin en sade sonucu hangisidir?",
      ["√39", "5√6", "3√3", "6√3", "5√3"],
      4,
      "İki kökü de √3 katı yap.",
      "√12=2√3 ve √27=3√3; toplam 5√3 olur.",
      "Karekök toplama üzerine dağılmaz; kök içlerini 39 yaparak toplamak geçersizdir.",
    ],
    [
      "√(x−1)/√(5−x) ifadesinin gerçek sayılarda tanım kümesi hangisidir?",
      ["[1,5]", "[1,5)", "(1,5)", "(−∞,5)", "[5,∞)"],
      1,
      "Pay kökü için ≥0, payda kökü için>0 gerekir.",
      "x−1≥0 ile 5−x>0 koşullarının kesişimi 1≤x<5'tir.",
      "Payın sıfır olması serbesttir; paydanın sıfır olması yasaktır.",
    ],
    [
      "3/(√7−2) ifadesinin paydası rasyonelleştirilmiş eşdeğeri hangisidir?",
      ["√7−2", "3√7+2", "(√7+2)/3", "√7+2", "7+2"],
      3,
      "Pay ve paydayı √7+2 ile çarp.",
      "Payda 7−4=3; pay 3(√7+2) olduğundan ortak 3 sadeleşir ve √7+2 kalır.",
      "Eşleniği yalnız paydaya uygulamak veya paydaki 3'ü unutmak değeri değiştirir.",
    ],
    [
      "Gerçek x için √(2x+3)=x denkleminin çözüm kümesi hangisidir?",
      ["{3}", "{−1,3}", "{−1}", "{1,3}", "∅"],
      0,
      "Sol taraf negatif olamaz; x≥0 koşulunu koru.",
      "Kare alma(x−3)(x+1)=0 verir. −1 için ilk eşitlik 1=−1 yanlıştır; 3 için √9=3 doğrudur.",
      "Karelenmiş denklemin bütün kökleri ilk denklemin kökü olmayabilir.",
    ],
    [
      "a=3√2 ve b=2√5 pozitif sayıları için hangi karşılaştırma doğrudur?",
      ["a=b", "a>b", "a<b", "a=2b", "b=3a"],
      2,
      "İkisi pozitif olduğundan karelerini karşılaştır.",
      "a²=18,b²=20; pozitif kareköklerde sıra korunduğundan a<b.",
      "Yalnız dış katsayı 3>2'ye bakmak kök içlerinin etkisini yok sayar.",
    ],
    [
      "Alanı 72 birim² olan karenin çevresi kaç birimdir?",
      ["12√2", "24√2", "36", "288", "72√2"],
      1,
      "Önce pozitif kenarı √72 olarak bul.",
      "Kenar √72=6√2; dört kenarın toplamı 24√2'dir. Kenarın karesi 72 alanını geri verir.",
      "Alanı doğrudan 4 ile çarpmak uzunlukla alanı karıştırır.",
    ],
    [
      "∛(−8)+√16 işleminin gerçek değeri kaçtır?",
      ["6", "−6", "−2", "Gerçek sayı değildir", "2"],
      4,
      "Tek dereceli kökte negatif iç tanımlıdır.",
      "∛(−8)=−2,√16=4; toplam 2'dir.",
      "Her negatif kök içini tanımsız saymak, tek ve çift kök ayrımını kaybettirir.",
    ],
  ],
  source:
    "MEBİ TYT Matematik Konu Özeti, basılı s. 42–44 (PDF 44–46); Aurelia 015 Köklü Sayılar, PDF s. 1–3. Esas kök/denklem kökü ve negatif taban koşulları ayrılarak yazılmış özgün anlatım, model ve sorular; resmî soru aktarımı değildir.",
};

const ratio: Pack = {
  id: "oran-oranti",
  topic: "detail-209",
  title: "Oran orantı: sabit olanı bul, modeli doğrula",
  minutes: 65,
  objectives: [
    "Parçanın parçaya ve bütüne oranını ayır; birim ve sıralamayı koru.",
    "Doğru orantıda bölümün, ters orantıda çarpımın sabitliğini veri ve grafikle denetle.",
    "Paylaştırma, birleşik oran ve ölçek sorularını koşullu bir modele çevir.",
  ],
  sections: [
    section(
      "Oran iki çokluğun hangi sırayla karşılaştırıldığıdır",
      "a'nın b'ye oranı a/b veya a:b yazılır; b≠0 olmalıdır. 15 kırmızı ve 25 mavi boncuk için kırmızı:mavi=3:5'tir; kırmızı:toplam=15:40=3:8 olur. Oranın paydasının başka parçayı mı bütünü mü anlattığını sözcükle belirt. Oranın tersini almak, aynı soruya farklı bir cevap vermektir.",
      "Aynı tür çoklukların oranında birimleri önce eşitle:1 m ile 25 cm için 100/25=4 bulunur; 1/25 değil. Farklı tür çoklukların bölümü birim oran verebilir:150 TL/kg, belirli ürünün kilogram başına ücretidir. Birimsiz oran ile birimli oranı ayırmak sonucun neyi anlattığını korur. Sıfır pay olabilir; sıfır payda olmaz.",
    ),
    section(
      "Eşdeğer oran ve çapraz çarpım koşulu",
      "a/b=c/d orantısında b,d≠0 iken iki tarafı bd ile çarparak ad=bc elde ederiz. İçler–dışlar kuralı bu cebirsel işlemin kısa adıdır. Pay ve paydayı aynı sıfırdan farklı katsayıyla çarpmak oranı korur; aynı sayıyı eklemek genel olarak korumaz:2/3≠3/4.",
      "Bir eşitliği oranlara ayırırken yeni paydaların sıfır olmadığını ayrıca denetle. a/b=c/d=k ise(a+c)/(b+d)=k ancak b+d≠0 olduğunda yazılabilir. Katsayılı toplamlar için de yeni paydanın sıfır olmaması gerekir. Ezberlenmiş bir orantı özelliği, tanımsız bir kesri geçerli yapmaz.",
    ),
    section(
      "Oran gerçek miktarı tek başına belirlemez",
      "a:b=m:n verildiğinde a=mt,b=nt yazmak ortak ölçek katsayısını görünür kılar. m ve n, miktarların kendisi olmak zorunda değildir; aynı oranın sonsuz farklı büyüklükte örneği vardır. Fiziksel pozitif miktarlarda t>0 seçilir. Toplam verilirse(m+n)t; fark verilirse uygun sırayla(m−n)t denklemi kurulur.",
      "a:b=3:5 ve toplam 64 için 8t=64, t=8; miktarlar 24 ve 40'tır. Büyük parçanın 45 olduğu 3:5 paylaşımda ise 5t=45'ten küçük parça 27 olur. Her iki örnekte de iki koşulu birlikte kullanırsın: oran ve toplam ya da bilinen parça. Sonucu hem toplam hem oranla kontrol etmek tek denklem kontrolünden güçlüdür.",
    ),
    section(
      "Doğru orantı: artış değil sabit bölüm",
      "y=kx doğru orantısında, x≠0 olan veriler için y/x=k sabittir. Pozitif miktarlarda x iki kat olunca y iki kat olur. Sabit birim fiyatlı alışveriş, başka ücret yoksa bu modele uyar. Grafik orijinden geçen doğrudur; modelin x=0 noktasında y=0 vermesi, veri bağlamının sıfıra uzatılabildiği durumda anlamlıdır.",
      "y=x+3 de x artarken artar ama y/x sabit değildir; dolayısıyla doğru orantı değildir. Sabit giriş ücreti veya indirim eşiği olan alışverişte saf doğru orantı modeli bozulabilir. Atölye aynı başlangıç noktasından üç farklı eğriyi karşılaştırır; yalnız iki niceliğin aynı yönde gitmesi yerine sabit oranı ve başlangıç koşulunu denetle.",
    ),
    section(
      "Ters orantı: sabit işte çarpım",
      "y=k/x ve x≠0 ters orantısında xy=k sabittir. Pozitif x iki kat olunca y yarıya iner. Aynı işi, aynı verimle, aynı günlük çalışma süresinde yapan işçi sayısı ile tamamlanma günü bu modele uyabilir. 6 eş verimli işçi 10 günde bitiriyorsa toplam 60 işçi-gün; 15 işçi için 4 gün gerekir.",
      "Her azalan ilişki ters orantı değildir. y=10−x azalır fakat xy sabit değildir. İşçiler birbirini engelliyor, çalışma saatleri değişiyor veya iş miktarı artıyorsa basit işçi-gün modeli geçerli olmayabilir. Soruda sabit tutulanları yaz: toplam iş, kişi başına hız, günlük süre. Sıfır işçi ile süre hesabı yapmaya çalışmak modelin tanımını aşar.",
    ),
    section(
      "Ters orantılı paylaştırmada ağırlıkları ters çevir",
      "Bir toplam 3, 4 ve 6 sayılarıyla ters orantılı paylaştırılacaksa paylar 3t, 4t, 6t değildir; k/3, k/4, k/6 olur. Pay oranı 1/3:1/4:1/6=4:3:2 biçiminde yazılabilir. Verilen sayı büyüdükçe alınan pay küçülür; bu yön kontrolü doğru modelin hızlı bir denetimidir.",
      "216 birim için toplam oran 9 parça, bir parça 24; paylar 96, 72, 48 olur. Eşit toplamı doğru orantılı paylaştırmak bambaşka bir dağılım verir. Sonucu denetlerken paylar toplamının bütünü vermesinin yanında her payın karşısındaki sayıyla çarpımını da karşılaştır; üçü de 288 olmalıdır.",
    ),
    section(
      "Birleşik oranlarda ortak bağlantıyı eşitle",
      "A:B=4:7 ve B:C=14:15 oranlarında B aynı miktarı temsil eder. İlk oranı 2 ile genişletip A:B=8:14 yapınca A:B:C=8:14:15 bulunur. B'yi iki orandan doğrudan yan yana yazıp 4:7:15 demek, ortak bağlantının iki ayrı ölçeğini karıştırır.",
      "Cebirsel olarak A/B ve B/C oranları çarpıldığında B≠0 koşuluyla A/C elde edilir. Bu işlem aynı adları taşıyan gerçek ortak niceliklere uygulanmalıdır; iki farklı sorudaki B harfi aynı miktar demek değildir. Toplam veya miktar bilgisi sonradan verilirse bir ortak t ile bütün oranı ölçekle. Birimlerin uyumu birleşik oranda da korunur.",
    ),
    section(
      "Ölçek uzunluk oranıdır; alan ve hacim farklı büyür",
      "1:s uzunluk ölçeği, çizimdeki uzunluğun gerçeğe oranının 1/s olduğunu anlatır. 1:25000 haritada 7,2 cm gerçekte 180000 cm=1,8 km'dir. Önce aynı birimle çarp, sonra istenen birime dönüştür. Harita üzerindeki sayıyı doğrudan kilometre kabul etme.",
      "Benzer şekillerde bütün uzunluklar k katına çıkarsa alan k², hacim k³ katına çıkar. Bunlar kenar uzunluğuyla doğru orantılı değil, onun karesi veya küpüyle doğru orantılı ilişkilerdir. Her orantının hangi niceliğe kurulduğunu açık yaz: y, x² ile doğru orantılıysa y/x² sabit olur; y/x sabit olmak zorunda değildir.",
    ),
    section(
      "Bileşik koşulu tek model gibi ezberleme",
      "Bir nicelik x ile doğru, z ile ters orantılıysa y=kx/z yazılabilir; z≠0 ve koşullar tanımlı olmalıdır. Önce bir değişkeni sabit tutarak yönü incele, sonra sabiti verilen bir durumdan bul. Örneğin üretim miktarı aynı verimli kişi sayısı ve süreyle birlikte artabilir; hangi değişkenin sabit olduğu söylenmeden tek bir oran kurmak eksik olur.",
      "Çözüm yolu: sorulan oranı sırayla yaz, birimleri eşitle, sabit bölümü veya çarpımı belirle, ortak katsayıyı bul, yeni durumu hesapla, başlangıç verisiyle kontrol et. Değişen bir sabit ücret veya verim varsa bunu modelin dışında bırakma. Atölyedeki nokta ve tablolar, koşulları değiştirmenin neden aynı orantı sabitini korumadığını görünür kılar.",
    ),
  ],
  examples: [
    worked(
      "Parçaya oran ile bütüne oran",
      "Bir kutuda 15 kırmızı,25 mavi boncuk var. Kırmızının maviye ve toplam boncuğa oranlarını bul.",
      "Önce paydanın hangi çokluk olduğunu sözcükle yaz.",
      [
        ["Parçalar", "Kırmızı:mavi=15:25.", "15/25=3/5"],
        ["Bütün", "Toplam 15+25=40 boncuk."],
        ["Bütüne oran", "Kırmızı:toplam=15:40.", "15/40=3/8"],
        ["Kontrol", "Kırmızı azınlıktadır; bütüne oranı 1/2'den küçüktür."],
      ],
      "Kırmızı:mavi=3:5; kırmızı:toplam=3:8.",
      "İki cevap farklı karşılaştırmaları anlatır; birbirinin yerine kullanılmaz.",
      "3:5 oranını kırmızının bütüne oranı sanmak.",
    ),
    worked(
      "Toplamdan ortak ölçeği bul",
      "Pozitif A ve B miktarları 3:5 oranında ve toplam 64'tür. A ile B'yi bul.",
      "Miktarları 3t ve 5t yaz.",
      [
        ["Model", "A=3t, B=5t; t>0."],
        ["Toplam", "Sekiz parça 64 eder.", "8t=64 ⇒ t=8"],
        ["Miktarlar", "Oran katsayılarıyla çarp.", "A=24; B=40"],
        ["Kontrol", "24+40=64 ve 24/40=3/5."],
      ],
      "A=24, B=40.",
      "B büyük olduğundan 5 pay alan parçayla uyumludur.",
      "Oran katsayılarını doğrudan miktarlar 3 ve 5 sanmak.",
    ),
    worked(
      "Aynı iş, eş verim, farklı kişi sayısı",
      "Aynı işi 6 işçi 10 günde yapıyor. Her işçinin günlük çalışma süresi ve verimi aynı kalırsa 15 işçi kaç günde bitirir?",
      "Toplam işçi-gün sabittir; kişi sayısı artınca süre azalır.",
      [
        ["Sabit iş", "6·10=60 işçi-gün."],
        ["Yeni durum", "15 işçinin t günlük emeğini eşitle.", "15t=60"],
        ["Çöz", "Pozitif 15'e böl.", "t=4 gün"],
        [
          "Koşul denetimi",
          "Verim ve günlük saatlerin değişmediği belirtilmiştir; model buna dayanır.",
        ],
      ],
      "4 gün.",
      "İşçi sayısı 2,5 kat, süre 1/2,5 kat olur; çarpım 60 kalır.",
      "İşçi sayısıyla süreyi aynı yönde doğru orantılı almak.",
    ),
    worked(
      "Ters ağırlıkla paylaşım",
      "216 jeton, 3, 4 ve 6 sayılarıyla ters orantılı üç paya ayrılıyor. Payları bul.",
      "1/3:1/4:1/6 oranını tam sayı ağırlıklara çevir.",
      [
        ["Ters oran", "Paylar k/3, k/4, k/6; oran 4:3:2."],
        ["Parça toplamı", "Dokuz parça 216'dır.", "216/9=24"],
        ["Dağıt", "4, 3 ve 2 ile çarp.", "96, 72, 48"],
        ["Çarpım kontrolü", "96·3=72·4=48·6=288; toplam 216."],
      ],
      "96, 72, 48.",
      "En büyük karşı sayı 6, en küçük pay 48'i alır.",
      "Ters sözcüğünü atlayıp 3:4:6 ile dağıtmak.",
    ),
    worked(
      "Ölçekle birim dönüşümünü ayır",
      "1:25000 ölçekli haritada bir yol 7,2 cm ölçülüyor. Gerçek uzunluğu km olarak bul. 1 km=100000 cm.",
      "Önce gerçek santimetreyi bul; sonra kilometreye dönüştür.",
      [
        ["Uzunluk oranı", "Çizim/gerçek=1/25000."],
        [
          "Gerçek cm",
          "Harita değerini ölçek paydasıyla çarp.",
          "7,2·25000=180000 cm",
        ],
        ["Birim", "100000 cm bir kilometredir.", "180000/100000=1,8 km"],
        [
          "Kontrol",
          "1,8 km'yi santimetreye çevirip 25000'e bölünce 7,2 cm döner.",
        ],
      ],
      "1,8 km.",
      "Ölçek uzunluk oranıdır; burada alan çarpanı kullanılmaz.",
      "180000 sonucunu birim değiştirmeden km diye etiketlemek.",
    ),
  ],
  recall: [
    {
      prompt: "a:b=3:5 verilince miktarlar kesin olarak 3 ve 5 midir?",
      answer:
        "Hayır; a=3t,b=5t yazılır. Miktarları bulmak için toplam, fark veya bir miktar gibi ek bilgi gerekir.",
    },
    {
      prompt: "Artan iki çokluk doğru orantılı olduğunu nasıl kanıtlar?",
      answer:
        "Yalnız artmaları yetmez; y/x sabit olmalıdır. y=x+3 bunun karşı örneğidir.",
    },
    {
      prompt: "Ters orantıda kontrol edeceğin sabit hangisi?",
      answer:
        "x·y çarpımı; doğru orantıda y/x bölümü. Paylaşımda ters ağırlıklar kullanılır.",
    },
    {
      prompt: "a/b=c/d'den(a+c)/(b+d)=k yazarken ek koşul?",
      answer:
        "Başlangıç paydalarına ek olarak b+d≠0 gerekir; yeni paydanın sıfır olması oranı tanımsız yapar.",
    },
    {
      prompt: "Uzunluk 3 katına çıktığında benzer şeklin alanı ve hacmi?",
      answer:
        "Alan 9, hacim 27 kat. İlgili sabitler alanda A/x², hacimde V/x³ biçimindedir.",
    },
  ],
  questions: [
    [
      "Bir kutuda 15 kırmızı ve 25 mavi boncuk vardır. Kırmızı boncuk sayısının bütün boncuk sayısına oranı kaçtır?",
      ["3/8", "3/5", "5/3", "5/8", "2/5"],
      0,
      "Bütün boncuk sayısı 40'tır.",
      "İstenen 15/(15+25)=15/40=3/8'dir.",
      "3/5 kırmızının maviye oranıdır; soruda istenen parça/bütün farklıdır.",
    ],
    [
      "Pozitif A ve B miktarları için A:B=3:5 ve A+B=64 ise A kaçtır?",
      ["3", "8", "40", "24", "32"],
      3,
      "A=3t,B=5t yaz.",
      "8t=64 ile t=8; A=3·8=24. Diğer miktar 40'tır ve oran 3/5'i verir.",
      "Oran tek başına gerçek miktarı vermez; 3 sayısını doğrudan A kabul etmek toplamı sağlamaz.",
    ],
    [
      "x/36=7/9 eşitliğini sağlayan gerçek x kaçtır?",
      ["4", "21", "28", "35", "252"],
      2,
      "Payda 9'dan 36'ya 4 katına çıktı.",
      "Oranı korumak için pay da 4 katına çıkar: x=7·4=28; çapraz çarpım 9x=252 de aynı sonucu verir.",
      "Pay ve paydaya aynı sayıyı eklemek oranı korumaz.",
    ],
    [
      "Birim fiyatı sabit ve ek ücret yokken 4 defter 60 TL'dir. Aynı defterlerden 7 tane kaç TL'dir?",
      ["67", "90", "100", "420", "105"],
      4,
      "Önce 1 defterin ücretini bul.",
      "60/4=15 TL/defter; 7·15=105 TL. Ücret/adet oranı 15 olarak sabittir.",
      "Ek ücret veya değişen indirim olmadığı koşulu saf doğru orantıyı mümkün kılar.",
    ],
    [
      "Aynı işi 6 eş verimli işçi 10 günde bitiriyor. Günlük saatler ve verim aynı kalırsa 15 işçi kaç günde bitirir?",
      ["25", "4", "6", "15", "40"],
      1,
      "Aynı iş için kişi·gün sabittir.",
      "6·10=15t; t=60/15=4 gün.",
      "İşçi artarken aynı işin süresini de artırmak ters orantının yönünü yanlış okumaktır.",
    ],
    [
      "x>0 için y=x+3 ilişkisi veriliyor. y ile x'in doğru orantılı olup olmadığına ilişkin hangi yorum doğrudur?",
      [
        "İkisi de arttığı için doğru orantılıdır",
        "y−x sabit olduğu için doğru orantılıdır",
        "xy=3 olduğu için ters orantılıdır",
        "y/x=1+3/x sabit olmadığı için doğru orantılı değildir",
        "Bütün x değerlerinde y/x=3'tür",
      ],
      3,
      "Doğru orantıda sabit olması gereken fark değil bölümdür.",
      "y/x=(x+3)/x=1+3/x, x'e bağlı değişir. Grafik orijinden geçmez; ilişki artan olsa da doğru orantı değildir.",
      "Her artan ilişkinin doğru orantı olduğunu söylemek koşulu zayıflatır.",
    ],
    [
      "Pozitif A,B,C miktarları için A:B=4:7 ve B:C=14:15. A:B:C oranı hangisidir?",
      ["8:14:15", "4:7:15", "4:14:15", "8:7:15", "4:7:30"],
      0,
      "İki orandaki B'yi aynı miktara genişlet.",
      "İlk oranı 2 ile çarpınca A:B=8:14; ikinciyle ortak B=14 olur. Birleşik oran 8:14:15'tir.",
      "Ortak B'nin farklı ölçeklerini doğrudan birleştirmek aynı miktarı iki farklı değer sanır.",
    ],
    [
      "216 jeton 3, 4 ve 6 sayılarıyla ters orantılı paylaştırılıyor. En küçük pay kaç jetondur?",
      ["24", "36", "48", "72", "96"],
      2,
      "Pay oranı 1/3:1/4:1/6=4:3:2'dir.",
      "Toplam 9 parça 216 ise bir parça 24; en küçük pay 2·24=48'dir. 6 ile 48'in çarpımı 288, diğer payların karşı sayılarıyla çarpımlarına eşittir.",
      "Doğru orantılı 3:4:6 paylaşımı ters orantı koşulunu sağlamaz.",
    ],
    [
      "1:25000 ölçekli haritada 7,2 cm olan uzunluk gerçekte kaç km'dir? 1 km=100000 cm.",
      ["18", "1,8", "180", "0,18", "180000"],
      1,
      "Gerçek uzunluğu önce cm olarak bul.",
      "7,2·25000=180000 cm; 100000'e bölünce 1,8 km olur.",
      "Ölçek çarpımı santimetre verir; birim değiştirmeden kilometre etiketi konmaz.",
    ],
    [
      "y pozitif x'in karesiyle doğru orantılıdır. x=2 iken y=12. x=3 iken y kaçtır?",
      ["18", "24", "36", "12", "27"],
      4,
      "Sabit y/x değil y/x²'dir.",
      "y=kx²; 12=4k ile k=3. x=3 için y=3·9=27.",
      "x'i3/2 ile çarparken y'yi de 3/2 ile çarpmak, kareyle orantıyı x ile orantı sanmaktır.",
    ],
  ],
  source:
    "MEBİ TYT Matematik Konu Özeti, basılı s. 45–46 (PDF 47–48); Aurelia 016 Oran Orantı, PDF s. 1–3. Verim, iş, ücret ve birim koşulları açık tutulan özgün anlatım ve sorular; resmî soru aktarımı değildir.",
};

const packs: Pack[] = [absolute, exponents, scientific, roots, ratio];
export const forge093MathGuides: LessonGuide[] = packs.map(
  ({ id, minutes, objectives, sections, examples, recall, source }) => ({
    id,
    minutes,
    objectives,
    sections,
    examples,
    recall,
    source,
  }),
);
// Native lesson id -> detailed curriculum topic id, matching studyPlan.lessonTopic.
export const forge093MathTopics: Record<string, string> = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const forge093MathLessons: Lesson[] = packs.map((p) => ({
  id: p.id,
  subjectId: "tyt-matematik",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  body: p.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: [
    ...p.questions.map(
      ([prompt, options, answer, hint, explanation, misconception], i) => ({
        id: `${p.id}-093-${i + 1}`,
        prompt: txt(prompt),
        options: options.map(txt),
        answer,
        hint: txt(hint),
        explanation: txt(`${explanation} Dikkat: ${misconception}`),
        skill: p.title,
      }),
    ),
    ...(p === scientific ? scientificNotationPractice : []),
  ],
  source: txt(p.source),
  tags: [p.topic, "Özgün öğretim soruları"],
}));

export function absoluteMembership(
  x: number,
  center: number,
  radius: number,
  mode: string,
) {
  const distance = Math.abs(x - center);
  return {
    distance,
    member:
      mode === "inside"
        ? distance < radius
        : mode === "closed"
          ? distance <= radius
          : mode === "outside"
            ? distance > radius
            : distance === radius,
  };
}
export function integerPower(base: number, exponent: number, grouped: boolean) {
  if (!Number.isFinite(base) || !Number.isInteger(exponent)) return null;
  if (base === 0 && exponent <= 0) return null;
  return grouped
    ? base ** exponent
    : base < 0
      ? -(Math.abs(base) ** exponent)
      : base ** exponent;
}
export function normalizeScientific(coefficient: number, exponent: number) {
  if (
    coefficient === 0 ||
    !Number.isFinite(coefficient) ||
    !Number.isInteger(exponent)
  )
    return null;
  const shift = Math.floor(Math.log10(Math.abs(coefficient)));
  return {
    coefficient: coefficient / 10 ** shift,
    exponent: exponent + shift,
    value: coefficient * 10 ** exponent,
  };
}
export function simplifySquareRoot(n: number) {
  if (n < 0 || !Number.isInteger(n)) return null;
  if (n === 0) return { outside: 0, inside: 1, value: 0 };
  for (let k = Math.floor(Math.sqrt(n)); k >= 1; k--)
    if (n % (k * k) === 0)
      return { outside: k, inside: n / (k * k), value: Math.sqrt(n) };
  return null;
}
export function proportionValue(
  mode: string,
  x: number,
  k: number,
  fee: number,
) {
  if (mode === "inverse") return x === 0 ? null : k / x;
  return mode === "affine" ? k * x + fee : k * x;
}
