import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const graphProblemsSource027Summary =
  "Aurelia 027 Grafik Problemleri, biçim 5 ve içerik 5.1 (19 Kasım 2026), PDF s. 1–12. MEB/OGM Matematik 9, Grafik Yorumlama, basılı s. 166. OGM Problemler Video Ders Notu, PDF s. 16–19. MEBİ TYT Matematik Konu Özetleri, PDF s. 109–112. Geçmiş sınavlardan öğren bölümünde 2018 TYT Temel Matematik, soru 14 bulunur.";

const titles = {
  segments: "Eş olmayan sürelerin değişimini birleştir",
  populations: "Grupları kişi sayısına çevirip yeni bütünü kur",
  histogram: "Sınıf frekansından hangi değerin bilindiğini belirle",
  overlap: "Ortak üyelikte sayılan grubu ve paydayı ayır",
  intersection: "Eşitlik, sıralama ve koşulun geçerli olduğu aralığı bul",
  values: "Değer, değişim ve pay yöntemleri",
  limits: "Ara değer, sınıf sınırı ve kesişim koşulları",
};

const headers = [
  "Yöntem",
  "Geçerli örnek",
  "Koşul değişirse",
  "Başka bir kullanım",
];

export const graphProblemsSource027Sections: GuideSection[] = [
  {
    title: titles.segments,
    paragraphs: [
      "Bütün aralığın ortalama değişimi, son ve ilk ölçüm arasındaki farkın geçen toplam süreye bölümüdür. Parça hızları verilirse her hızı kendi süresiyle çarparak o parçanın işaretli değişimini bul. Bu değişimleri topla ve toplam süreye böl.",
      "Hacim 0. saatte 14 L, 2. saatte 30 L, 6. saatte 22 L olsun. İlk hız 8 L/saat, ikinci −2 L/saat. Bütün aralıkta artış 8·2+(−2)·4=8 L, ortalama 8/6=4/3 L/saat. İkinci aralık düz bir çizgiyse 4. saatte 30−2·2=26 L bulunur. Yalnız uç ölçümleri biliniyorsa 26 L kesinleşmez.",
    ],
  },
  {
    title: titles.populations,
    paragraphs: [
      "180 kişilik grubun bir dilimi 80° olduğunda o dilimde 40 kişi vardır. 360 kişilik grupta 50° dilim 50 kişidir. Küçük dilim daha büyük bir gruba aitse daha çok kişi gösterebilir. Gruplar ayrık ve kategori aynıysa birleşik pay (40+50)/(180+360)=1/6, birleşik açı 60° olur.",
      "Üyelik sayısı 18’den 27’ye yükselirken toplam 60’tan 90’a çıkarsa her iki dönemde pay %30’dur. Üye sayısı (27−18)/18=%50 artmıştır. Grafiğin kişi sayısı mı grup içi pay mı verdiğini oku. Paydaki değişimi hesaplarken eski payı, kişi sayısındaki değişimde eski kişi sayısını başlangıç al.",
    ],
  },
  {
    title: titles.histogram,
    paragraphs: [
      "[0,4), [4,8), [8,12) sınıflarının frekansları 1, 2, 1 olsun. En az 4 olan gözlem sayısı 3’tür. En az 6 olanların sayısı ise 1, 2 veya 3 olabilir. Çünkü orta sınıftaki gözlemler 6’nın iki yanında da bulunabilir. Eşik bir sınıfın içine düşerse sınıf frekansı tek başına yeterli olmaz.",
      "0, 4, 4, 8 ve 3, 7, 7, 11 listeleri aynı histogramı verir. Ortalamaları sırasıyla 4 ve 7’dir. Sınıf orta noktalarıyla (2+2·6+10)/4=6 bulunur. Bu yaklaşık bir temsildir. İki liste frekanslarla uyumlu olduğu için histogram kesin ham listeyi veya kesin ortalamayı belirlemez.",
    ],
  },
  {
    title: titles.overlap,
    paragraphs: [
      "60 öğrencinin 30’u A, 22’si B kulübünde. 10 öğrenci her ikisinde ise en az birinde olanların sayısı 30+22−10=42. İki frekansı toplamak ortak öğrencileri iki kez sayar. Etiketleri çakışan iki sütun, tek başına birbirinden ayrık iki daire dilimi oluşturmaz.",
      "Her iki kulüpte olanların tüm okuldaki payı 10/60, en az bir kulüpte olanlar içindeki payı 10/42, A üyeleri içindeki payı 10/30’dur. Üçünün payı aynı sayıdan başlar ama bütünü farklıdır. Ortak üyelik belli olmasaydı 42 sonucu da belirlenemezdi.",
    ],
  },
  {
    title: titles.intersection,
    paragraphs: [
      "Düşey sıralamayı aynı yatay değerde oku. Bir koşulu sağlayan x’leri önce ayır, ardından istenen öteki koşulu yalnız o aralıkta sına. İkisi birden gerekiyorsa aralıkları kesiştir. Sıkı karşılaştırma eşitlik noktasını dışarıda bırakır. Eşitliğe izin veren koşulda o nokta diğer şartları da sağlıyorsa kalır.",
      "0≤x≤4 için A=7, B=7+(x−2)² ise iki değer yalnız x=2’de eşittir. x=2’nin iki yanında da B>A olduğundan sıralama değişmez. Bir eşitlikte iki yanın sırasını ayrı kontrol et. Grafiğin tanımlandığı aralığın dışındaki değerler için ek bir bağıntı gerekir.",
    ],
  },
  {
    title: titles.values,
    paragraphs: [
      "Soru tek ölçüm, ölçümler arasındaki fark, birim zaman başına değişim veya bütün içindeki paydan hangisini istiyor? Sonucun birimini baştan yaz.",
      "Aynı sayı farklı işlemde farklı anlam taşır. Bir satış grafiğinde 54 satış seviyedir. İki dönem arasındaki 9 satış farktır. Farkı süreye bölünce birim zaman başına değişim çıkar.",
    ],
    table: {
      headers,
      rows: [
        [
          "Seviye ve değişim hızı",
          "10’dan 22’ye 3 saatte çıkış. Son seviye 22, değişim 12, ortalama hız 4 birim/saat.",
          "Başlangıç 16 olursa aynı son seviye ve sürede ortalama hız 2 birim/saat olur.",
          "26’dan 17 dereceye 3 saatte iniş, −3 derece/saat ortalama değişim verir.",
        ],
        [
          "Yüzde değişimin tabanı",
          "80’den 104’e çıkışta artış 24/80=%30.",
          "104’ten 80’e dönüşte azalış 24/104=3/13, yaklaşık %23,08.",
          "Bir ürün %10 artıp yeni fiyatından %10 inerse son çarpan 1,1·0,9=0,99.",
        ],
        [
          "Açı ve bütün",
          "150 kişilik bütünde 120° dilim 50 kişi.",
          "Toplam verilmediyse 120° yalnız 1/3 payı belirler.",
          "24 L’lik tüketimin 6 L’si 1/4 paydır. Tam dairede 90° eder.",
        ],
      ],
    },
  },
  {
    title: titles.limits,
    paragraphs: [
      "Eksen sınırı, kategori kapsamı ve çizginin hangi aralıkta geçerli olduğu sonucu belirler. Sınır noktasında eşitlik ya da sınıfa dahil olma koşulunu oku.",
      "Yalnız verilen ölçüm ve koşulları kullan. Örneğin bir çizgi iki gün arasında doğrusal olsa bile başka günlerde aynı şekilde süreceği ayrıca belirtilmelidir.",
    ],
    table: {
      headers,
      rows: [
        [
          "İki uç ve ara değer",
          "(0,6) ve (4,18) arasında doğrusal değişim verilirse x=2’de değer 12.",
          "Yalnız iki uç ölçülmüşse x=2’de 12 olacağı kesinleşmez.",
          "İki ölçümün ortasındaki sıcaklık, değişim doğrusal verilince uç sıcaklıkların ortalamasıdır.",
        ],
        [
          "Histogramda sınıfa üyelik",
          "[5,10) ve [10,15) sınıflarında 10, ikinci sınıftadır.",
          "Eşik 12 olursa ikinci sınıfın tamamı sayılmaz. Tekil ölçümleri veya daha ayrıntılı sınıfları ara.",
          "Fiyat bandı [100,150) verilmişse 150 TL o banda girmez.",
        ],
        [
          "Kesişim ve iki koşul",
          "x>2 ve x≤5 birlikte sağlanıyorsa ortak aralık (2,5].",
          "x>5 ve x≤5 koşullarının ortak değerleri yoktur.",
          "Süre 2 saatten uzun, 5 saati aşmıyorsa 5 kabul edilir ve 2 kabul edilmez.",
        ],
      ],
    },
  },
];

export const graphProblemsSource027SheetText = new Map<string, string[]>([
  [
    titles.segments,
    [
      "Bütün aralığın ortalama değişimi = toplam işaretli değişim / toplam süre. Parça hızlarını birleştirirken her birini kendi süresiyle ağırlıklandır.",
    ],
  ],
  [
    titles.populations,
    [
      "Ayrık gruplarda önce her grubun kendi payını sayıya çevir. Birleşik pay = birleşik sayı / birleşik toplam.",
    ],
  ],
  [
    titles.histogram,
    [
      "[a,b) sınıflarında ‘en az’ eşiği sınıf başındaysa uygun frekansları topla. Sınıfı bölen eşik ve kesin ortalama daha ayrıntılı veri ister.",
    ],
  ],
  [
    titles.overlap,
    [
      "En az bir gruptaki kişi sayısı = A ve B üye sayıları toplamı − ortak üye sayısı. Paydada sorunun saydığı öğrenci grubunu kullan.",
    ],
  ],
  [
    titles.intersection,
    [
      "Önce her koşulun x aralığını yaz. İkisi birden için kesiştir. Sıkı eşitsizlik eşitlik noktasını içermez.",
    ],
  ],
  [
    titles.values,
    [
      "Değer eksenden, fark son−ilk ile, hız fark/süre ile okunur. Değişim yüzdesinin paydası ilk değerdir.",
    ],
  ],
  [
    titles.limits,
    [
      "Doğrusallık yalnız verildiği aralık için geçerlidir. Açık uç sınıfa veya çözüm aralığına dahil değildir.",
    ],
  ],
]);

export const graphProblemsSource027Examples: WorkedExample[] = [
  {
    title: "İki farklı süreyle bütün aralığı tamamla",
    prompt:
      "Bir tankın 1, 3 ve 8. saatlerdeki su hacimleri 17, 25 ve 15 L. Ardışık ölçümler arasında değişim doğrusal. İlk parça 4 L/saat artıyor. İkinci parçanın hızını, 1–8. saatler arasının ortalama değişimini ve 6. saatteki hacmi bul.",
    strategy:
      "Önce ikinci parçada zaman farkını yaz. Ortalama için parçaların saat numaralarını değil, bütün zaman aralığını kullan.",
    steps: [
      {
        label: "İkinci hız",
        explanation: "15−25=−10 L değişim 8−3=5 saatte olur.",
        expression: "−10/5=−2 L/saat",
      },
      {
        label: "Bütün ortalama",
        explanation:
          "İlk ve son hacimleri karşılaştır. Toplam süre 8−1=7 saattir.",
        expression: "(15−17)/7=−2/7 L/saat",
      },
      {
        label: "Ara değer",
        explanation: "6. saat ikinci parçanın başından 3 saat sonra.",
        expression: "25−2·3=19 L",
      },
    ],
    answer: "−2 L/saat, −2/7 L/saat ve 19 L.",
    check: "2·4+5·(−2)=−2 L. İkinci parçada 25−2·5=15 L son ölçümdür.",
    pitfall:
      "Parça süreleri 2 ve 5 saatken (4−2)/2 almak ya da ara değer için bütün aralığın eğimini uygulamak.",
  },
  {
    title: "Aynı histogramla farklı ham listeler kur",
    prompt:
      "[10,20) sınıfında 4, [20,30) sınıfında 2 ölçüm var. En az 20 olanların payını bul. Aynı frekansları veren iki farklı ölçüm listesiyle kesin ortalamanın bulunup bulunamayacağını göster.",
    strategy:
      "20’nin hangi sınıfa girdiğini oku. Her sınıfta gerçekten bulunabilecek iki ayrı değer seç.",
    steps: [
      {
        label: "Kesin pay",
        explanation: "En az 20 olanlar ikinci sınıftaki iki ölçümdür.",
        expression: "2/6=1/3",
      },
      {
        label: "Birinci liste",
        explanation: "10, 10, 10, 10, 20, 20 ile iki frekans da korunur.",
        expression: "(4·10+2·20)/6=40/3",
      },
      {
        label: "İkinci liste",
        explanation: "18, 18, 18, 18, 28, 28 de aynı frekansları verir.",
        expression: "(4·18+2·28)/6=64/3",
      },
    ],
    answer: "En az 20 olanların payı 1/3. Kesin ortalama belirlenemez.",
    check:
      "Orta noktalar 15 ve 25 seçilirse tahmin 55/3 olur. Kesin ortalamalar için iki farklı olasılık bulundu.",
    pitfall:
      "Aralıkların orta noktalarını bütün gözlemlerin gerçek değeri sanmak.",
  },
];

export const graphProblemsSource027Recall = [
  {
    prompt:
      "İlk aralık 2, ikinci aralık 5 saat ise bu aralıklardaki iki hızı aynı ağırlıkla ortalamak uygun mu?",
    answer:
      "Genel olarak hayır. Her hız kendi süresiyle çarpılır, bulunan toplam değişim 7 saate bölünür.",
  },
  {
    prompt:
      "İki farklı grubun dairelerinde aynı açıyı görmek aynı kişi sayısı verir mi?",
    answer:
      "Aynı payı verir. Kişi sayılarının eşitliği için grupların toplamlarının da eşit olması gerekir.",
  },
  {
    prompt:
      "Histogramda [8,12) sınıfının frekansı 5 ise bu sınıftaki kaç ölçümün 10 veya üstünde olduğunu bilir miyiz?",
    answer:
      "Hayır. 10 sınıfın içinde kalır, beş gözlemin tekil değerleri verilmemiştir.",
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
    id: `grafik-problemleri-027-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "Grafik Problemleri",
    guidance,
  };
}

export const graphProblemsSource027Practice: Question[] = [
  practice({
    key: "es-olmayan-grafik-araliklari",
    prompt:
      "Bir tankın zaman–hacim grafiğinde 2, 6 ve 9. saatlerdeki değerler 18, 42 ve 33 L. Ardışık noktalar arasında değişim doğrusal. 2–9. saatler arasındaki ortalama değişim hızı ve 8. saatteki hacim sırasıyla nedir?",
    options: [
      "15/7 L/saat ve 36 L",
      "3/2 L/saat ve 36 L",
      "5 L/saat ve 36 L",
      "15/7 L/saat ve 30 L",
      "5/3 L/saat ve 36 L",
    ],
    answer: 0,
    hint: "Bütün ortalamada t=2 ve t=9’u kullan. 8. saatin bulunduğu parçanın eğimini ayrı hesapla.",
    guidance: {
      knowledge: [
        "Parçalı grafikte yerel ara değer, bulunduğu parçanın bağıntısıyla hesaplanır.",
      ],
      strategy:
        "Bütün değişimi toplam süreye böl. Sonra 6–9 saat aralığındaki eğimi bul.",
      steps: [
        "Bütün değişim 33−18=15 L, süre 9−2=7 saat. Ortalama 15/7 L/saat.",
        "İkinci parçanın eğimi (33−42)/(9−6)=−3 L/saat.",
        "8. saat 6. saatten iki saat ileridir. 42+2·(−3)=36 L.",
      ],
      optionReasons: [
        "Bütün aralık 7 saattir. Son parçada 8. saatte 36 L bulunur.",
        "6 ve −3 L/saat hızlarının eşit ağırlıklı ortalaması 3/2’dir. Parçalar 4 ve 3 saat sürmüştür.",
        "15/3 bütün değişimi yalnız ikinci parçanın süresine böler.",
        "Hacim 6. saatten 9. saate 42’den 33’e doğrusal azalır. 8. saatte 30 olamaz.",
        "15/9 hesabı başlangıcı 0. saat kabul eder. Gözlenen bütün aralık 2–9. saatlerdir.",
      ],
      commonError:
        "Parça eğimlerinin düz ortalamasını almak veya zaman farkı yerine son zaman etiketini kullanmak.",
      check: "İlk parça 4·6=24 L, ikinci parça 3·(−3)=−9 L değişir. Net 15 L.",
    },
  }),
  practice({
    key: "iki-daire-yeni-butun",
    prompt:
      "Birbirinden ayrık 160 kişilik A grubu ve 240 kişilik B grubu için aynı etkinliğe katılanların daire dilimleri 90° ve 75°. İki grup birleştiğinde etkinliğe katılan toplam kişi sayısı ve birleşik dairedeki dilimin açısı nedir?",
    options: [
      "90 kişi ve 82,5°",
      "90 kişi ve 81°",
      "90 kişi ve 22,5°",
      "75 kişi ve 67,5°",
      "90 kişi ve 90°",
    ],
    answer: 1,
    hint: "Her açıyı kendi grubunun toplamıyla kişi sayısına çevir. Yeni açıyı 400 kişilik bütünde hesapla.",
    guidance: {
      knowledge: [
        "Bir dilim açısı, kendi dairesinin kapsadığı bütüne göre bir paydır.",
      ],
      strategy:
        "İki katılımcı sayısını ayrı bul, topla ve yeni dairede 400’e böl.",
      steps: [
        "A grubunda 160·90/360=40 kişi, B’de 240·75/360=50 kişi katılır.",
        "Birlikte 90 katılımcı ve 160+240=400 kişi var. Pay 90/400=9/40.",
        "Birleşik açı 360·9/40=81°.",
      ],
      optionReasons: [
        "82,5° iki açının aritmetik ortalamasıdır. İki grubun kişi sayıları eşit değil.",
        "40+50=90 kişi, 90/400 payı da 81° eder.",
        "22,5 payın yüzde sayısıdır. Merkez açısı için payı 360 ile çarp.",
        "75 katılımcı, grupların verdiği 40+50 ile uyuşmaz.",
        "90° yalnız A grubundaki 1/4 paydır. Birleşik pay 90/400’dür.",
      ],
      commonError:
        "Büyük açının her zaman daha çok kişi gösterdiğini varsaymak veya iki açıyı eşit ağırlıkla almak.",
      check:
        "81/360=9/40=90/400. B’nin açısı küçük olsa da katılımcısı daha fazla.",
    },
  }),
  practice({
    key: "histogram-esik-sinifin-icinde",
    prompt:
      "Eş genişlikli bir histogramda [0,6), [6,12) ve [12,18) sınıflarının frekansları sırasıyla 3, 4 ve 3. Tekil ölçümler bilinmiyor. Değeri en az 10 olan gözlem sayısının alabileceği en küçük ve en büyük değer nedir?",
    options: ["3 ve 3", "0 ve 10", "3 ve 7", "4 ve 7", "7 ve 10"],
    answer: 2,
    hint: "10’un hangi sınıfın içine düştüğünü bul. O sınıfın en az ve en çok kaç gözlemi sağlayabileceğini düşün.",
    guidance: {
      knowledge: [
        "Bir sınıf eşiğin bütünüyle üstündeyse frekansının tamamı sayılır. Eşik sınıfı bölüyorsa tekil değerler gerekir.",
      ],
      strategy:
        "İlk ve son sınıfların kesin katkısını yaz. Ortadaki sınıfın iki uç durumunu kur.",
      steps: [
        "İlk sınıf hiç katkı vermez. Son sınıftaki 3 ölçümün hepsi en az 10’dur.",
        "Orta sınıfta 6 da 10 da olabilir. O dört ölçümün tamamı 6 ise eklenen 0, tamamı 10 ise 4’tür.",
        "Bu iki geçerli durumda toplam 3 ve 7 olur.",
      ],
      optionReasons: [
        "3 en küçük değerdir. Orta sınıftaki dört gözlem 10 olursa sayı 7 olur.",
        "Son sınıftan 3 gözlem mutlaka sayılır ve ilk sınıftan 3 gözlem hiçbir zaman sayılmaz.",
        "Orta sınıfın 0 ile 4 arasındaki katkısına son sınıftan 3 eklenir.",
        "Orta sınıftaki hiçbir gözlem 10’a ulaşmayabilir. Bu durumda değeri en az 10 olan gözlem sayısı 3 olur.",
        "En büyük değer 7’dir. İlk sınıfın gözlemlerinin tümü 6’dan küçüktür.",
      ],
      commonError:
        "Bir eşiği kesen sınıfın tümünü koşulu sağlamış veya sağlamamış kabul etmek.",
      check:
        "[6,12) içindeki dört ölçümün tümünü 6 veya 10 seçmek aynı histogramı korur.",
    },
  }),
  practice({
    key: "ortak-uyelerin-kosullu-payi",
    prompt:
      "90 öğrenciden 48’i A kulübüne, 32’si B kulübüne, 14’ü her iki kulübe üye. En az bir kulübe üye olanlar içinde her iki kulübe üye olanların payı kaçtır?",
    options: ["7/45", "7/24", "7/16", "7/33", "7/40"],
    answer: 3,
    hint: "Paydada sadece en az bir kulübe üye olanlar var. İki kulübü toplarken ortak öğrencileri bir kez say.",
    guidance: {
      knowledge: [
        "Ortak öğrenciler iki ayrı üyelik toplamında yer alır. Birleşimde her öğrenci bir kez sayılır.",
      ],
      strategy:
        "İki sütunun toplamından ortak üyeliği çıkar. Ortak sayıyı bu yeni bütüne böl.",
      steps: [
        "En az bir kulübe üye 48+32−14=66 öğrenci var.",
        "İki kulübe birden üye 14 öğrenci olduğundan pay 14/66=7/33.",
        "Sınıfın tamamındaki 90 öğrenci ve tek kulüpteki üye sayıları farklı paydalar olurdu.",
      ],
      optionReasons: [
        "7/45, iki kulübe üyeliğin tüm 90 öğrenci içindeki payıdır.",
        "7/24 paydasında yalnız A kulübünün 48 üyesi var.",
        "7/16 paydasında yalnız B kulübünün 32 üyesi var.",
        "A ve B üyelerinin birleşimi 66, iki kulübün ortak üyesi 14 kişidir.",
        "7/40 hesabı 48+32=80’i kullanır. Ortak 14 öğrenci paydada iki kez yer alır.",
      ],
      commonError:
        "Sorudaki 'en az bir kulübe üye olanlar içinde' koşulunu atlamak.",
      check: "Yalnız A’da 34, yalnız B’de 18 ve ikisinde 14 kişi. Toplam 66.",
    },
  }),
  practice({
    key: "ayrik-olcum-ve-bilinmeyen-ara-deger",
    prompt:
      "Sıcaklık yalnız 1, 5 ve 8. saatlerde ölçülüyor. Sonuçlar sırasıyla 12, 20 ve 17 °C. Ölçümler arasında ve sonrasında değişimin nasıl sürdüğü verilmemiş. I. 1–5. saatlerde ortalama değişim 2 °C/saat. II. 3. saatte sıcaklığın kesin değeri bilinemez. III. 9. saatte sıcaklık kesinlikle 17 °C’nin altındadır. Hangileri çıkarılabilir?",
    options: ["Yalnız II", "Yalnız III", "I ve III", "II ve III", "I ve II"],
    answer: 4,
    hint: "İki uç ölçümle ortalama değişimi bulabilirsin. Ara değer ve ölçüm aralığı dışı için ayrıca bağıntı gerekir.",
    guidance: {
      knowledge: [
        "Ortalama değişim hızı iki uç değerden hesaplanır, ara ölçümleri belirlemez.",
      ],
      strategy:
        "I için hesapla, II ve III için bu saatlerin gerçekten ölçülüp ölçülmediğini veya bir model olup olmadığını denetle.",
      steps: [
        "I doğrudur çünkü (20−12)/(5−1)=2 °C/saat.",
        "II doğrudur. 3. saatin ölçümü veya ara değişim kuralı verilmemiştir.",
        "III çıkarılamaz. 5–8 saatleri arasındaki azalma, 8’den sonra da azalacağını garanti etmez.",
      ],
      optionReasons: [
        "II doğrudur. Ayrıca uç değerlerden I de hesaplanır.",
        "9. saatte ölçüm veya bir devam modeli bulunmadığı için III kesin değildir.",
        "I hesaplanır ama III elde edilmez.",
        "II elde edilir ama III için grafiğin geleceği bilinmez.",
        "Uçlardan ortalama bulunur. Ara ölçüm belirlenmez. Bu nedenle I ve II çıkarılabilir.",
      ],
      commonError:
        "Bir aralıkta gözlenen yönü geleceğe taşımak ya da ortalama değişimi her anın değişimi saymak.",
      check:
        "3. saatte 16 °C doğrusal bir olasılıktır. Örneğin 15 °C de aynı iki uçla uyumlu olabilir.",
    },
  }),
  practice({
    key: "siki-ve-dahil-uc-kesisimi",
    prompt:
      "0≤x≤7 aralığında çizilmiş üç grafiğin değerleri A(x)=16−2x, B(x)=4+x ve C(x)=7. A(x)>B(x) ve B(x)≥C(x) birlikte hangi x aralığında sağlanır?",
    options: ["[3,4]", "(3,4)", "[3,4)", "[0,4)", "[3,7]"],
    answer: 2,
    hint: "Her eşitsizliği ayrı çöz. 3 ve 4 uçlarını iki koşula birden koy.",
    guidance: {
      knowledge: [
        "Eşzamanlı iki koşul için aralıkların kesişimi gerekir. > sıkı, ≥ eşitliğe izin veren koşuldur.",
      ],
      strategy:
        "Önce A’nın B’nin üstünde olduğu, sonra B’nin C’ye ulaştığı x değerlerini bul ve kesiştir.",
      steps: [
        "16−2x>4+x ⇒ 12>3x ⇒ x<4.",
        "4+x≥7 ⇒ x≥3.",
        "0≤x≤7 içinde iki koşulun ortak aralığı [3,4).",
      ],
      optionReasons: [
        "4’te A ve B eşit, bu yüzden 4 aralıkta olamaz.",
        "3’te A=10>B=7 ve B=C=7. Eşitliğe izin verildiği için 3 kalmalı.",
        "3 dahil ve 4 hariçtir. Aradaki değerler iki koşulu da sağlar.",
        "0’da B=4<C=7. İlk koşul doğru olsa bile ikinci sağlanmaz.",
        "Örneğin x=5’te A=6 ve B=9, ilk koşul sağlanmaz.",
      ],
      commonError:
        "İki ayrı koşulun aralıklarını birleştirmek veya bir uçtaki eşitlik koşulunu ötekine taşımak.",
      check:
        "x=3,5 için A=9, B=7,5, C=7. x=3 geçerli, x=4 eşitlikten dışarıda.",
    },
  }),
];
