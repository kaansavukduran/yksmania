import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const factorizationSource028Sections: GuideSection[] = [
  {
    title: "Geçici kökün gerçek x karşılığını bul",
    paragraphs: [
      "u=x² yazınca u’nun alabileceği değerler sıfır ve pozitif sayılardır. u=9 için x²=9 olur ve x=−3, 3 çıkar. u=0 yalnız x=0 verir. u=−2 için x²=−2 olacağından gerçek çözüm çıkmaz.",
      "u yerine başka bir ifade kullanırsan koşulu yeniden kur. Örneğin u=x+4 için u=−2 mümkündür ve x=−6 verir. Önce geçici denklemdeki bütün kökleri belirle. Sonra her birini seçtiğin dönüşümle asıl değişkene geri taşı.",
      "Bir kökün çokluğu, x−r çarpanının ifadede kaç kez yer aldığını gösterir. (x²−4)²=(x−2)²(x+2)² için x=−2 ve x=2 ikişer kez gelir. Her iki noktada da grafik sıfıra değip geri döner. Tek çoklukta işaret değiştiği için eğri ekseni keser.",
    ],
  },
  {
    title: "Toplam ve çarpımdan kareleri ve küpleri çıkar",
    paragraphs: [
      "x+y=S ve xy=P verilirse (x+y)² açılımı x²+2xy+y² olur. Buradan x²+y²=S²−2P. Küp açılımında ara terimler 3x²y+3xy²=3xy(x+y) olduğundan x³+y³=S³−3PS.",
      "Örneğin S=7 ve P=12 için kareler toplamı 49−24=25, küpler toplamı 343−252=91. Kontrol için x=3 ve y=4 seçilebildiğini fark edersen 9+16=25 ile 27+64=91 görürsün. Özdeşlikler sonucu tek tek kök aramadan verir.",
      "Sonucu yazmadan önce verilenlerin hangi nicelikler olduğunu işaretle. x=y=1 iken x³+y³=2 ve (x+y)³=8. Aradaki 6, 3xy(x+y) terimidir.",
    ],
  },
  {
    title: "Sadeleşmeden önce paydayı sıfır yapan değerleri yaz",
    paragraphs: [
      "(x³−64)/(x²−16) için ilk payda (x−4)(x+4) olduğundan x=−4 ve x=4 dışarıda kalır. Pay (x−4)(x²+4x+16) olur. İzinli değerlerde ortak çarpanı kaldırınca (x²+4x+16)/(x+4) elde edilir.",
      "Yeni payda yalnız −4’te sıfır olur. Başlangıçta dışarıda bıraktığın 4’ü de sonucun yanında taşı. 4’ü ilk ifadeye koyunca 0/0 oluşur. x=0 kontrolünde ilk kesir (−64)/(−16)=4 ve sade biçim 16/4=4 verir.",
      "Ortak çarpan ayırırken 6x²=3x·2x çarpımını doğrudan kurabilirsin. x=0 için iki taraf da 0 olur. Sayısal olarak 6x²’yi 3x’e bölmek istediğinde ise 3x sıfırdan farklı olmalıdır.",
    ],
  },
  {
    title: "Karede her parçayı iki kenarıyla ölç",
    paragraphs: [
      "Kenar uzunluğu a olan bir karenin hem yatay hem dikey kenarında b ve a−b parçaları olsun. 0<b<a iken bir köşedeki alan b², karşı köşedeki alan (a−b)² olur. Diğer iki bölgenin her biri b(a−b) alanlıdır. a=2b olursa dört bölge de aynı boyda kare olur.",
      "Karşı köşelerdeki iki bölgenin toplam alanı b²+(a−b)²=a²−2ab+2b². Dört parçayı birlikte sayınca a² geri gelir. Her iki hesabı aynı bölme çizgileriyle kontrol edebilirsin.",
    ],
    table: {
      headers: ["İlk bakış", "Başlangıç işlemi", "Kontrol"],
      rows: [
        [
          "Her terimde ortak bir yapı",
          "Ortak çarpanı dışarı al",
          "Geri çarpınca bütün terimler döner",
        ],
        [
          "İki küp veya kare",
          "İşarete göre özdeşliği seç",
          "Ara terimlerin açılımını denetle",
        ],
        [
          "Aynı iç ifade tekrarlanıyor",
          "İç ifadeyi u ile yaz",
          "Bulduğun u’ları asıl değişkene geri taşı",
        ],
        [
          "Pay ve paydada çarpım",
          "İlk paydanın sıfırlarını yaz",
          "Sadeleşen çarpanın yasak değerini koru",
        ],
      ],
    },
  },
];

export const factorizationSource028Examples: WorkedExample[] = [
  {
    title: "Sıfır ve negatif geçici kökü ayır",
    prompt: "x⁴+5x²=0 denkleminin gerçek köklerini ve varsa çokluğunu bul.",
    strategy: "u=x² ile çarpanlara ayır. Sonra her geçici kökü geri taşı.",
    steps: [
      {
        label: "Geçici denklem",
        expression: "u(u+5)=0",
        explanation: "Ortak u çarpanını ayırınca u=0 veya u=−5 çıkar.",
      },
      {
        label: "Geri dön",
        expression: "x²=0 veya x²=−5",
        explanation:
          "İlk eşitlik x=0 verir. İkinci eşitlik için gerçek x yoktur.",
      },
      {
        label: "Çokluk",
        expression: "x·x·(x²+5)",
        explanation: "x çarpanı iki kez bulunduğundan 0 çift çokluklu köktür.",
      },
    ],
    answer: "Tek ayrı gerçek kök x=0, çokluğu 2.",
    check: "x=0 için ifade 0 olur. x≠0 için x² ve x²+5 pozitiftir.",
    pitfall:
      "u=−5 değerinden x=±√5 çıkarmak, asıl eşitlikte işareti değiştirir.",
  },
  {
    title: "Sade kesirle bulunan adayı asıl denklemde denetle",
    prompt: "(x³−1)/(x²−1)=3/2 denkleminin gerçek çözüm kümesini bul.",
    strategy: "İlk tanım kümesini yazıp yalnız ortak x−1 çarpanını sadeleştir.",
    steps: [
      {
        label: "Tanım koşulu",
        expression: "x≠−1 ve x≠1",
        explanation:
          "İlk payda (x−1)(x+1) olduğundan iki değer de dışarıda kalır.",
      },
      {
        label: "Çarpanları ayır",
        expression: "(x²+x+1)/(x+1)=3/2",
        explanation: "x³−1=(x−1)(x²+x+1); x−1 izinli alanda sadeleşir.",
      },
      {
        label: "Adayları denetle",
        expression: "2x²−x−1=(2x+1)(x−1)=0",
        explanation: "x=1 ilk paydada yasaktır. x=−1/2 tanım kümesindedir.",
      },
    ],
    answer: "{−1/2}",
    check: "x=−1/2 için ilk pay −9/8, payda −3/4. Bölüm 3/2.",
    pitfall: "Yeni payda x=1’de sıfır olmadığı için bu adayı kabul etmek.",
  },
];

export const factorizationSource028Recall = [
  {
    prompt: "u=x² çözümünde u=0 ve u>0 kaç gerçek x verir?",
    answer: "u=0 tek x=0 verir. Pozitif bir u için x=−√u ve x=√u çıkar.",
  },
  {
    prompt: "x³+y³’ü toplam ve çarpımla nasıl hesaplarız?",
    answer: "S=x+y ve P=xy ise x³+y³=S³−3PS.",
  },
  {
    prompt: "Çarpan sadeleşince ilk yasak değer nerede tutulur?",
    answer:
      "İlk tanım koşulu çözüme eklenir. Son adaylar asıl ifadede denetlenir.",
  },
  {
    prompt: "Bir kareyi b ve a−b uzunluklarında böldüğünde dört alan nedir?",
    answer: "b², b(a−b), b(a−b) ve (a−b)².",
  },
];

type PracticeInput = {
  id: string;
  prompt: string;
  options: [string, string, string, string, string];
  answer: number;
  hint: string;
  guidance: QuestionGuidance;
};

function practice({
  id,
  prompt,
  options,
  answer,
  hint,
  guidance,
}: PracticeInput): Question {
  return {
    id: `carpanlara-ayirma-028-${id}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "carpanlara-ayirma",
    guidance,
  };
}

export const factorizationSource028Practice: Question[] = [
  practice({
    id: "gecici-negatif-koku-ele",
    prompt: "x⁴−x²−12=0 denkleminin gerçek çözüm kümesi nedir?",
    options: ["{−2, 2}", "{−3, 4}", "{−√3, −2, √3, 2}", "{2}", "{−2, 0, 2}"],
    answer: 0,
    hint: "u=x² yaz. Geçici denklemin negatif kökünü asıl eşitlikle denetle.",
    guidance: {
      knowledge: ["Gerçek bir sayının karesi sıfır veya pozitif olabilir."],
      strategy:
        "İkinci dereceden geçici denklemi çöz, sonra x² eşitliklerine dön.",
      steps: [
        "u²−u−12=(u−4)(u+3).",
        "u=4 veya u=−3. x²=4 için x=−2 ve x=2.",
        "x²=−3 için gerçek x çıkmaz.",
      ],
      optionReasons: [
        "İki değer x²=4 koşulunu yerine getirir.",
        "−3 ve 4, u için bulunan değerlerdir. x’e geri dönmek gerekir.",
        "±√3 için x²=3 olur. Asıl geçici kök −3’tür.",
        "x=−2 de karesi 4 olan gerçek sayıdır.",
        "x=0 koyunca ilk ifade −12 verir.",
      ],
      commonError: "Geçici kökleri doğrudan ilk değişkenin kökü olarak yazmak.",
      check: "Her iki x için 16−4−12=0.",
    },
  }),
  practice({
    id: "iki-cift-koku-tani",
    prompt: "x⁴−8x²+16=0 denkleminin ayrı gerçek kökleri ve çoklukları nedir?",
    options: [
      "0 tek kök, çokluğu 4",
      "−4 ve 4, her birinin çokluğu 2",
      "−2 ve 2, her birinin çokluğu 2",
      "−2 ve 2, her birinin çokluğu 1",
      "2 tek kök, çokluğu 4",
    ],
    answer: 2,
    hint: "İlk ifadeyi bir tam kare olarak gör. Kare içindeki ifadeyi de çarpanlarına ayır.",
    guidance: {
      knowledge: ["Aynı doğrusal çarpanın kuvveti kökün çokluğunu gösterir."],
      strategy: "u=x² ile tam kareyi ayır, sonra doğrusal çarpanları bul.",
      steps: [
        "u²−8u+16=(u−4)².",
        "u=4, yani x²=4. Ayrı kökler −2 ve 2.",
        "(x²−4)²=(x−2)²(x+2)². İki kök de çift çoklukludur.",
      ],
      optionReasons: [
        "x=0 için ifade 16’dır.",
        "x=±4 için x²=16 olur. Tam kareyi sıfırlayan değer x²=4’tür.",
        "İlgili doğrusal çarpanların üsleri 2’dir.",
        "İlk ifadede kare kuvveti iki doğrusal çarpana da uygulanır.",
        "x=−2 de köktür. İki ayrı kökün çokluğu ikişerdir.",
      ],
      commonError: "u=4 bulduktan sonra yalnız pozitif karekökü almak.",
      check: "İki çarpanın üsleri toplamı 4. x=±2 için ilk ifade 16−32+16=0.",
    },
  }),
  practice({
    id: "toplam-carpim-iki-us",
    prompt:
      "Gerçek x ve y sayıları için x+y=6, xy=8. x²+y² ve x³+y³ sırasıyla kaçtır?",
    options: ["20 ve 216", "36 ve 72", "28 ve 168", "20 ve 72", "20 ve 96"],
    answer: 3,
    hint: "S=x+y ve P=xy yaz. Karede 2P, küpte 3PS ara terimlerini hesapla.",
    guidance: {
      knowledge: ["Toplamın küpündeki iki ara terimin ortak çarpanı 3xy’dir."],
      strategy: "Açılımlarda yalnız istenen iki kuvveti bırak.",
      steps: [
        "Karelerin toplamı S²−2P=36−16=20.",
        "Küplerin toplamı S³−3PS=216−3·8·6.",
        "216−144=72. Sonuç 20 ve 72.",
      ],
      optionReasons: [
        "216 toplamın küpüdür. 144 olan ara terim çıkarılmalıdır.",
        "36 toplamın karesidir. Karelerin toplamı için 16 çıkarılır.",
        "Kare hesabında P iki kez, küpte 3PS olarak yer alır.",
        "İki açılım da verilen toplam ve çarpımla eşleşir.",
        "Küp için 216’dan 144 çıkarınca 72 kalır.",
      ],
      commonError: "Küplerde 3xy(x+y) katkısını gözden kaçırmak.",
      check:
        "2 ve 4, toplamı 6 ve çarpımı 8 olan iki sayıdır. 4+16=20, 8+64=72.",
    },
  }),
  practice({
    id: "paydada-iki-yasak-deger",
    prompt:
      "(x³−27)/(x²−9) ifadesinin sade biçimi ve başlangıçtan gelen koşulu hangisidir?",
    options: [
      "(x²+3x+9)/(x+3), x≠−3",
      "(x²+3x+9)/(x+3), x≠−3 ve x≠3",
      "(x²−3x+9)/(x+3), x≠−3 ve x≠3",
      "(x²+3x+9)/(x−3), x≠−3 ve x≠3",
      "x+3, x≠3",
    ],
    answer: 1,
    hint: "Payı küp farkı, paydayı kare farkı ile ayır. İlk paydanın iki sıfırını yaz.",
    guidance: {
      knowledge: [
        "Sadeleştirmeden önce paydanın sıfır olduğu değerler dışlanır.",
      ],
      strategy: "Yalnız ortak doğrusal çarpanı sadeleştir.",
      steps: [
        "Payda (x−3)(x+3), dolayısıyla x≠3 ve x≠−3.",
        "Pay (x−3)(x²+3x+9).",
        "Ortak x−3 sadeleşir. Sonuç (x²+3x+9)/(x+3) ve ilk iki yasak değer.",
      ],
      optionReasons: [
        "Yeni paydada görünmese bile ilk koşuldaki x=3 yasağı sürer.",
        "Pay, payda ve ilk tanım koşulu bir arada doğru yazılmıştır.",
        "Bu küp farkında üç terimli çarpanın x katsayısı +3’tür.",
        "Ortak çarpan x−3 kaldırılır. Paydada x+3 kalır.",
        "Küp farkı açıldığında üç terimli çarpan kalır. x=−3 de başlangıçta dışlanır.",
      ],
      commonError: "İlk payda yerine yalnız sade biçimdeki paydayı denetlemek.",
      check: "x=0 için ilk kesir 3, yeni biçim 9/3=3.",
    },
  }),
  practice({
    id: "dogrusal-gecici-degisken",
    prompt: "(t+2)²−2(t+2)−3=0 denkleminin gerçek çözümleri hangisidir?",
    options: ["{−1, 3}", "{1}", "{−3, 1}", "{−3, 3}", "{−1, 1}"],
    answer: 2,
    hint: "u=t+2 seç. Bu dönüşümde u negatif olabilir.",
    guidance: {
      knowledge: [
        "Bir sayıya sabit eklemek, geçici değerlerin işaretini sınırlamaz.",
      ],
      strategy: "Tekrarlanan iç ifadeyi adlandır, çarpanları ayır ve t’ye dön.",
      steps: [
        "u=t+2 ile u²−2u−3=(u−3)(u+1).",
        "Geçici kökler 3 ve −1.",
        "t=u−2 olduğundan t=1 ve t=−3.",
      ],
      optionReasons: [
        "Bu sayılar u’nun kökleridir. t için her birinden 2 çıkar.",
        "u=−1 için t=−3 de geçerlidir.",
        "İki geçici kök de doğru dönüşümle t’ye taşınmıştır.",
        "t=3 için u=5 olur ve geçici ifade 12 verir.",
        "t=−1 için u=1 olur ve geçici ifade −4 verir.",
      ],
      commonError:
        "Her geçici değişkeni x² gibi ele alıp negatif olanı elemek.",
      check: "t=−3 için 1+2−3=0, t=1 için 9−6−3=0.",
    },
  }),
  practice({
    id: "iki-kose-kare-alani",
    prompt:
      "Bir karenin kenarı 9 cm. Üst ve sol kenarda aynı köşeden 4 cm işaretlenip bu işaretlerden karşı kenarlara paralel çizgiler çiziliyor. Oluşan dört bölgeden kare olan ikisinin alanları toplamı kaç cm²’dir?",
    options: ["16", "25", "40", "81", "41"],
    answer: 4,
    hint: "Her iki yönde kalan kenar uzunluğu 9−4 cm. Karşı köşedeki karenin alanını da al.",
    guidance: {
      knowledge: ["Bir karenin alanı kenar uzunluğunun karesidir."],
      strategy: "İki karenin kenarlarını önce ayırıp alanlarını topla.",
      steps: [
        "İşaretlenen parçalar 4 cm, kalan parçalar 5 cm.",
        "Bir köşedeki karenin alanı 4²=16, karşı köşedeki karenin alanı 5²=25.",
        "Toplam kare alanı 16+25=41 cm².",
      ],
      optionReasons: [
        "16 yalnız ilk karenin alanıdır.",
        "25 yalnız karşı köşedeki karenin alanıdır.",
        "40, alanı 20 olan iki dikdörtgenin toplamıdır.",
        "81 dört bölgenin tamamının alanıdır.",
        "4² ve 5² iki kareyi bir araya getirir.",
      ],
      commonError:
        "Diğer iki dikdörtgenin alanını iki karenin alanıyla karıştırmak.",
      check: "16+25+20+20=81, bütün karenin alanına eşittir.",
    },
  }),
  practice({
    id: "kup-toplaminin-ara-terimleri",
    prompt:
      "x³+125 için ilk çarpan x+5. Çarpım geri açıldığında yalnız x³ ve 125’in kalması için ikinci çarpan ne olmalı?",
    options: ["x²+5x+25", "x²−25", "x²−5x+25", "(x+5)²", "x²−5x−25"],
    answer: 2,
    hint: "x ile 5’in ürettiği x² terimlerinin katsayıları birbirini götürmeli.",
    guidance: {
      knowledge: [
        "İki polinom çarpılırken her terim diğer parantezdeki her terimle çarpılır.",
      ],
      strategy: "İkinci çarpanı x²+px+q yaz. Sabit ve ara terimlere bak.",
      steps: [
        "Sabit 5q=125 olduğundan q=25.",
        "x²’nin katsayısı p+5, sıfır olması için p=−5.",
        "x’in katsayısı q+5p=25−25=0. İkinci çarpan x²−5x+25.",
      ],
      optionReasons: [
        "x²’nin katsayısı 5+5=10 kalır.",
        "Sabit terim 5·(−25)=−125 olur.",
        "Katsayılar x² ve x terimlerini yok eder. Sabit 125 kalır.",
        "(x+5)³ açılımında x² ve x terimleri bulunur.",
        "Sabit terim −125 olur ve x’in katsayısı −50 kalır.",
      ],
      commonError:
        "İlk parantezdeki artı işaretini ikinci çarpanın orta katsayısında da yazmak.",
      check: "(x+5)(x²−5x+25)=x³−5x²+25x+5x²−25x+125=x³+125.",
    },
  }),
];

export const factorizationSource028Summary =
  "Aurelia 028 Çarpanlara Ayırma, biçim 5 ve içerik 5.1 (19 Kasım 2026), PDF s. 1–12. MEB/OGM Matematik 10, gruplandırma ve özdeşlikler, basılı s. 176. OGM Çarpanlara Ayırma–Polinomlar Video Ders Notu, PDF s. 24–27. Geçmiş sınavlardan öğren bölümünde 2018 TYT Temel Matematik 11 için asıl kitapçık ve anahtar bağlantısı bulunur.";

export const factorizationSource028SheetText = new Map<string, string[]>([
  [
    "Geçici kökün gerçek x karşılığını bul",
    [
      "u=x² için u>0 iki ayrı x, u=0 tek x, u<0 sıfır gerçek x verir. u=x+4 gibi başka dönüşümde koşulu yeniden kur.",
      "x−r çarpanının üssü kök çokluğudur. Tek çokluk grafikte ekseni keser, çift çokluk eksene değer.",
    ],
  ],
  [
    "Toplam ve çarpımdan kareleri ve küpleri çıkar",
    [
      "S=x+y ve P=xy ise x²+y²=S²−2P, x³+y³=S³−3PS.",
      "Küpte iki ara terim 3x²y+3xy²=3xy(x+y) olur. Kalanı yazmadan bu katkıyı çıkar.",
    ],
  ],
  [
    "Sadeleşmeden önce paydayı sıfır yapan değerleri yaz",
    [
      "İlk paydayı çarpanlarına ayır ve bütün sıfırları dışla. Ortak çarpan sadeleşse de bu değerleri yanında taşı.",
      "x³−64 ile x²−16’nın ortak çarpanı x−4’tür. Son biçimde x+4 paydada kalsa da x=4 ve x=−4 başlangıçta dışlanır.",
    ],
  ],
  [
    "Karede her parçayı iki kenarıyla ölç",
    [
      "Kenarları b ve a−b olarak böl. Karşı köşelerin toplam alanı b²+(a−b)². Öbür iki bölgenin alanı ayrı ayrı b(a−b).",
      "Dört bölgenin toplamı a² olmalı. a=2b ise dört bölge de eş kare olur.",
    ],
  ],
]);
