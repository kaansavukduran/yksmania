import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const workerProblemsSource024Summary =
  "Aurelia 024 İşçi Problemleri, içerik 1.2 (19 Kasım 2026), PDF s. 1–11. OGM Defterim Matematik 9, basılı s. 181. OGM Problemler Video Ders Notu, PDF s. 12–15. Geçmiş sınavlardan öğren bölümünde 2011 YGS Temel Matematik, soru 22 bulunur.";

const titles = {
  sharedUnit: "Hedefler farklıysa ortak iş birimine geç",
  effective: "Etkin çalışma ile geçen süreyi ayrı say",
  team: "Grup hızının ne zaman kişiye bölünebildiğini denetle",
  slowdown: "Birlikteki hızı tek başına hızla karşılaştır",
  capacity: "Üretim tahminini kapasiteyle karşılaştır",
  firstMethods: "Hızı ve çalışanları evreye göre seç",
  lastMethods: "Vardiya, verim ve kapasiteyi birbirinden ayır",
};

const headers = [
  "Yöntem",
  "Geçerli örnek",
  "Yöntemin sınırı",
  "Başka bir kullanım",
];

export const workerProblemsSource024Sections: GuideSection[] = [
  {
    title: titles.sharedUnit,
    paragraphs: [
      "İki süre aynı hedef için verildiyse her süreyi ters çevirip aynı iş biriminde yazabilirsin. Hedefler farklı büyüklükteyse önce sayfa, dosya veya metre gibi ortak bir birim seç. Örneğin 42 dosyayı 7 saatte işleyen bir kişi 6 dosya/saat, 48 dosyayı 6 saatte işleyen biri 8 dosya/saat hızındadır.",
      "Ayrı dosyalar üzerinde eşzamanlı ve sabit hızla çalışırlarsa toplam hız 14 dosya/saattir. 70 dosya 5 saatte biter. Örneklerde 7 ve 6 saatin terslerini doğrudan toplamak, 42 ve 48 dosyayı aynı büyüklükte iş sayardı.",
    ],
  },
  {
    title: titles.effective,
    paragraphs: [
      "İş katkısı hesaplanırken yalnız etkin çalışma saati kullanılır. Başlangıçtan bitişe kadar geçen süreye duraklama da girer. İlk 3 saat çalışılıp 2 saat ara veriliyor ve 4 saat daha çalışılıyorsa etkin süre 7 saat, geçen süre 9 saattir.",
      "Günde 7 saatlik vardiyada 20 etkin saat isteyen iş iki tam vardiyadan sonra 6 saat daha ister. İş üçüncü gün içinde biter. 20/7 sayısı gereken vardiya eşdeğeridir. Başlama saati veya molalar verilmedikçe günün hangi saatinde bittiği bulunamaz.",
    ],
  },
  {
    title: titles.team,
    paragraphs: [
      "Grupta kişi hızları eşit ve bağımsızsa grup hızını kişi sayısına böl. Farklı iki grubun kişi hızlarını ayrı yaz. Yeni ekibin hızını bulurken her gruptan seçilen kişi sayısını yalnız o grubun kişi hızıyla çarp.",
      "Üç kişinin birlikte hızı saatte 18 ürünse ortalama kişi hızı 6’dır. Kişiler eş verimli değilse seçilen birinin hızı 6 olmak zorunda değildir. Örneğin 4+6+8 ve 3+5+10 aynı 18’i verir. İlk kişinin hızı iki durumda farklıdır.",
    ],
  },
  {
    title: titles.slowdown,
    paragraphs: [
      "Hızlar değişmediğinde iki pozitif katkının toplamı tek başına en hızlı kişinin hızından büyüktür. Birlikte çalışma kişinin hızını düşürüyorsa önce yeni katkıları topla, ardından bu toplamı tek başına hızla karşılaştır. Yeni toplam küçükse iki kişi işi daha geç bitirebilir.",
      "A tek başına 10, B 40 saatte bitiriyor olsun. Birlikte A yarı hızda, B normal hızda çalışırsa toplam hız 1/20+1/40=3/40 iş/saat. Birlikte süre 40/3 saat, yani 13 saat 20 dakika. B’nin katkısı pozitif olsa da süre, A’nın tek başına 10 saatinden uzundur.",
    ],
  },
  {
    title: titles.capacity,
    paragraphs: [
      "Eş verimli bağımsız üretimde kişi-saat başına ürün sayısını bul. Bu hızı yeni kişi-saatle çarpmak işgücünün potansiyelini verir. Makine veya hammadde ayrıca sınır koyuyorsa bitmiş ürün sayısı bu sınırları aşamaz.",
      "İşgücü 60, makine 48, hammadde 52 ürünle sınırlıysa en küçük üst sınır 48’dir. İşleyişte başka engel yoksa ve aynı sürede bu sınırların hepsi kullanılabiliyorsa 48 ürün bitirilebilir. Tek bir sınırlı hedef tamamlanmışsa iş payı 1’de durur.",
    ],
  },
  {
    title: titles.firstMethods,
    paragraphs: [
      "Hedefi ve ortak zaman birimini belirle. Her evrede hangi katkının gerçekten sürdüğünü yaz.",
    ],
    table: {
      headers,
      rows: [
        [
          "Tek çalışan, sabit hız",
          "18 saatte biten işte 6 saat çalışma 6/18=1/3 iş verir.",
          "İlk 3 saatten sonra hız yarıya inerse 6 saatte 3/18+3/36=1/4 iş yapılır.",
          "45 dosyayı 9 saatte işleyen kişi 2 saatte 10 dosya işler.",
        ],
        [
          "Aynı işi birlikte yapma",
          "16 ve 24 saatlik çalışanlar 1/16+1/24=5/48 iş/saat. Süre 48/5 saat.",
          "Birlikte ilk hız yarıya inerse toplam 1/32+1/24=7/96. Süre 96/7 saat.",
          "Çakışmayan iki tarayıcı 3 ve 5 belge/dakika ile 40 belgeyi 5 dakikada işler.",
        ],
        [
          "Ayrılma ve gecikme",
          "20 ve 30 saatlik kişiler 3 saat birlikte işin 1/4’ünü yapar. İlk kişi kalırsa ek süre 15 saattir.",
          "İkisi de devam ederse kalan 3/4 iş 9 saatte biter. Aktif ekip değişince ek süre değişir.",
          "Önce 2 saatte 30 dosya bitmişse 90 dosyalık hedefin 60 dosyası kalır. Yeni hız 20 dosya/saatse ek süre 3 saat.",
        ],
        [
          "Grup hızını kişiye indir",
          "6 eş hızlı kişi işi 12 günde yaparsa kişi hızı 1/72. Aynı hızda 8 kişiyle süre 9 gün.",
          "Kişi hızları eşit değilse kişinin payı grup ortalamasından çıkarılamaz.",
          "5 eş yazıcı aynı paketi 6 saatte basarsa bir yazıcının hızı 1/30 paket/saat.",
        ],
      ],
    },
  },
  {
    title: titles.lastMethods,
    paragraphs: [
      "Etkin saatleri bulduktan sonra vardiyaya, değişen hızlara ve verilen üretim sınırına bak.",
    ],
    table: {
      headers,
      rows: [
        [
          "İş günü ve etkin saat",
          "4 vardiya, günde 7 saat. Toplam 28 etkin saat.",
          "Günde 5 saat çalışılırsa 28 etkin saat, 5 tam vardiya ve altıncı gün 3 saat sürer.",
          "Cihaz 2 saat süren 3 oturumda ölçüm yaparsa etkin süre 6 saattir. Aralar ölçüm süresine katılmaz.",
        ],
        [
          "Verim değiştiğinde yeni evre",
          "10 saatlik işin ilk 2 saati normal. Sonra hız yarıya inerse kalan 4/5 iş 16 saatte, tüm iş 18 saatte biter.",
          "Son hız iki katına çıksaydı kalan 4/5 iş 4 saatte biterdi. İlk 2 saatin katkısı aynı kalır.",
          "Saatte 12 parça üreten cihaz 3 saat sonra 8 parça/saat hızına inerse 76 parça için 3+40/8=8 saat gerekir.",
        ],
        [
          "Seri üretim ve kapasite",
          "4 kişi 3 saatte 36 ürün üretiyorsa kişi-saatte 3 ürün. 5 kişi 4 saatte 60 ürün potansiyeline ulaşır.",
          "Bu sürede makine en çok 48 ürün bitirebiliyorsa en çok 48 tamamlanır.",
          "2 eş yazıcı 3 saatte 120 sayfa basarsa, aynı koşulda 4 yazıcı 2 saatte 160 sayfa basar.",
        ],
      ],
    },
  },
];

export const workerProblemsSource024SheetText = new Map<string, string[]>([
  [
    titles.sharedUnit,
    [
      "Aynı işi 1 kabul et veya dosya, sayfa, metre gibi ortak birim seç. Yalnız ortak birimdeki hızlar toplanır.",
    ],
  ],
  [
    titles.effective,
    [
      "İş payı = hız · etkin süre. Geçen süreye bekleme de girer. Son vardiyanın kalan saatini ayrı yaz.",
    ],
  ],
  [
    titles.team,
    [
      "Kişi hızı = grup hızı / kişi sayısı, ancak grup eş verimliyse. Farklı türlerin kişi hızlarını ayrı kullan.",
    ],
  ],
  [
    titles.slowdown,
    [
      "Birlikteki yeni hızları topla. Toplam hız en hızlı tek kişi hızından küçükse ekip daha uzun sürede bitirir.",
    ],
  ],
  [
    titles.capacity,
    [
      "Ürün/kişi-saat · kişi-saat, işgücü potansiyelini verir. Makine ve hammadde üst sınırlarını ayrıca karşılaştır.",
    ],
  ],
  [
    titles.firstMethods,
    [
      "Her evrede aynı hedef, ortak zaman birimi ve gerçekten çalışan kişileri belirle.",
    ],
  ],
  [
    titles.lastMethods,
    [
      "Vardiyayı takvimle, yeni hızı eski katkıyla, kapasiteyi bitmiş ürün sayısıyla karıştırma.",
    ],
  ],
]);

export const workerProblemsSource024Examples: WorkedExample[] = [
  {
    title: "Bir çalışan ayrıldıktan sonraki adımları tamamla",
    prompt:
      "A aynı işi 15, B 30 saatte bitiriyor. Dört saat birlikte çalışınca B ayrılıyor. İlk dört saatin katkısı 4(1/15+1/30)=2/5. Kalan payı ve A’nın ek süresini bul.",
    strategy:
      "Çözümü açmadan önce ikinci evrede hangi kişinin çalıştığını yaz.",
    steps: [
      { label: "Kalan pay", explanation: "1−2/5=3/5 iş." },
      {
        label: "İkinci evrenin hızı",
        explanation: "A tek başına devam eder, hızı 1/15 iş/saat.",
      },
      {
        label: "Ek süre",
        explanation: "Kalanı A’nın hızına böl.",
        expression: "(3/5)÷(1/15)=9 saat",
      },
    ],
    answer: "A’nın ek süresi 9 saat.",
    check: "2/5+9/15=1. Başlangıçtan bitişe 4+9=13 saat geçer.",
    pitfall:
      "B’nin hızını ayrıldıktan sonra da toplamak veya toplam süreyi ek süre diye vermek.",
  },
  {
    title: "Grup hızından tek kişinin hızının çıkarılamadığı durum",
    prompt:
      "Üç çalışan, saat başına toplam 18 eş ürün hazırlıyor. Çalışanların hızları birbirinden farklı. İlk çalışanın tek başına hızını bu veriden belirleyebilir misin?",
    strategy: "Aynı grup toplamını sağlayan iki farklı kişi dağılımı kur.",
    steps: [
      {
        label: "Bir olasılık",
        explanation: "Hızlar 4, 6 ve 8 ürün/saat olabilir.",
      },
      {
        label: "Başka olasılık",
        explanation: "Hızlar 3, 5 ve 10 ürün/saat olabilir.",
      },
      {
        label: "Çıkarım",
        explanation:
          "İki grubun toplamı 18. İlk kişinin hızı birinde 4, diğerinde 3.",
      },
    ],
    answer: "İlk kişinin hızı tek değer olarak belirlenemez.",
    check:
      "18/3=6 grup ortalamasıdır. Kişilerin eş verimli olduğu bilgisi gerekir.",
    pitfall: "Ortalama kişi hızını seçilen her kişinin kendi hızı saymak.",
  },
];

export const workerProblemsSource024Recall = [
  {
    prompt:
      "İki kişinin birlikteki süresi en hızlı kişinin tek başına süresinden ne zaman uzun olabilir?",
    answer:
      "Birlikteki toplam gerçek hız, en hızlı kişinin tek başına hızının altına düşerse.",
  },
  {
    prompt:
      "Vardiyada 6 etkin saat ve 1 saat mola varsa iş hesabı ve geçen süre ne kullanır?",
    answer:
      "İş katkısı için 6 etkin saat, başlangıçtan sona geçen süre için 7 saat kullanılır.",
  },
  {
    prompt:
      "İşgücü 80, makine 55, hammadde 70 ürüne izin veriyorsa üst sınır nedir?",
    answer:
      "55 ürün. Bu üst sınıra ulaşmak için makine ve diğer kaynakların aynı sürede kullanılabilmesi gerekir.",
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
    id: `isci-problemleri-024-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "İşçi Problemleri",
    guidance,
  };
}

export const workerProblemsSource024Practice: Question[] = [
  practice({
    key: "ortak-dosya-birimi",
    prompt:
      "A, 60 dosyayı 5 saatte, B ise aynı türden 36 dosyayı 4 saatte işliyor. İkisi aynı anda, ayrı dosyalarda ve aynı sabit hızlarla çalışırsa 84 dosya ne kadar sürede biter?",
    options: ["3 saat", "4 saat", "5 saat", "8 saat", "9 saat"],
    answer: 1,
    hint: "İki süre farklı dosya sayıları için verilmiş. Önce ikisini de dosya/saat hızına çevir.",
    guidance: {
      knowledge: [
        "Hedef miktarları farklıysa iki süreyi aynı işin süreleri gibi kullanamazsın.",
      ],
      strategy: "İki çalışanın saat başına işlediği dosya sayılarını topla.",
      steps: [
        "A’nın hızı 60/5=12 dosya/saat, B’nin 36/4=9 dosya/saat.",
        "Toplam 12+9=21 dosya/saat.",
        "84/21=4 saat.",
      ],
      optionReasons: [
        "Üç saatte 63 dosya biter, 21 dosya kalır.",
        "Dört saatte 48+36=84 dosya biter.",
        "Beş saat A’nın 60 dosyalık solo süresidir. İki kişi 84 dosyayı daha önce tamamlar.",
        "Sekiz saat gerekli toplam sürenin iki katıdır.",
        "5+4 iki farklı solo sürenin toplamıdır. Birlikte çalışmayı göstermez.",
      ],
      commonError:
        "Farklı dosya miktarlarını aynı büyüklükte 1 iş kabul etmek.",
      check: "Her iki kişi 4 saat çalışırsa A 48, B 36 dosya işler. Toplam 84.",
    },
  }),
  practice({
    key: "iki-grubu-kisiye-indir",
    prompt:
      "Bir işi A ekibinden 4 kişi 9 günde, B ekibinden 6 kişi 8 günde bitiriyor. Her ekip içinde kişiler eş verimli, ekipler birbirinden farklı hızda olabilir. A’dan 3, B’den 2 kişi aynı işi sabit ve bağımsız hızlarla kaç günde bitirir?",
    options: ["6", "7", "8", "9", "12"],
    answer: 2,
    hint: "Her ekibin günlük hızını kendi kişi sayısına böl. Yeni ekipte bu hızların kaç kez kullanıldığını yaz.",
    guidance: {
      knowledge: [
        "Eş verimli bir ekibin tek kişi hızı, ekibin hızının kişi sayısına bölümüdür.",
      ],
      strategy:
        "İki türün kişi başı günlük hızını ayrı bul ve yeni ekipteki sayılarla çarp.",
      steps: [
        "Bir A çalışanı günde 1/(4·9)=1/36, bir B çalışanı 1/(6·8)=1/48 iş yapar.",
        "Yeni hız 3/36+2/48=1/12+1/24=1/8 iş/gün.",
        "İş 8 günde biter.",
      ],
      optionReasons: [
        "6 günde hız 1/8 ile işin 3/4’ü tamamlanır.",
        "7 günde 7/8 iş yapılır, 1/8 kalır.",
        "8·(3/36+2/48)=1.",
        "9 gün eski dört kişilik A ekibinin süresidir. Yeni ekip daha erken bitirir.",
        "1/12 yalnız üç A çalışanının katkısıdır. Yeni ekipte B çalışanları da katkı verir.",
      ],
      commonError:
        "9 ve 8 günü, ekiplerden tek bir kişinin bitirme süresi sanmak.",
      check: "8 günde A grubu 24/36=2/3, B grubu 16/48=1/3 iş yapar.",
    },
  }),
  practice({
    key: "vardiyada-bitis-saati",
    prompt:
      "A aynı işi, günde 6 etkin saat çalışarak 4 iş gününde, B ise 16 etkin saatte bitiriyor. İkisi aynı sabit ve bağımsız hızla her iş günü 09.00–11.00 ve 13.00–15.00 arasında birlikte çalışıyor. İlk gün 09.00’da başlarlarsa iş ne zaman biter?",
    options: [
      "2. iş günü, 14.36",
      "3. iş günü, 09.36",
      "3. iş günü, 10.06",
      "3. iş günü, 10.36",
      "3. iş günü, 13.36",
    ],
    answer: 3,
    hint: "Önce gereken toplam etkin saati bul. Tam vardiyaları çıkarıp kalanı son günün çalışma saatlerine yerleştir.",
    guidance: {
      knowledge: [
        "Vardiya arasındaki kapalı süre iş katkısı oluşturmaz. Ondalık saati dakikaya çevirmek için 60 ile çarpılır.",
      ],
      strategy:
        "İki solo süreyi etkin saat cinsine çevir ve ortak hızla gereken saati bul.",
      steps: [
        "A 24, B 16 etkin saatte bitirir. Birlikte hız 1/24+1/16=5/48, gerekli etkin süre 48/5=9,6 saat.",
        "İlk iki günde 8 etkin saat çalışılır. Üçüncü gün için 1,6 saat, yani 1 saat 36 dakika kalır.",
        "Üçüncü günün sabah çalışma aralığı 09.00–11.00. Kalan süre sabaha sığar ve iş 10.36’da biter.",
      ],
      optionReasons: [
        "İkinci gün 14.36’da toplam 7 saat 36 dakika etkin çalışma vardır. Gerekli 9 saat 36 dakikadan azdır.",
        "Üçüncü gün yalnız 36 dakika çalışmak, kalan tam bir saati atlar.",
        "0,6 saat 6 dakika değildir. 0,6·60=36 dakikadır.",
        "İlk 8 etkin saate 1 saat 36 dakika eklenince hedefe ulaşılır.",
        "Kalan süre sabah bitirilebilir. Öğleden sonraki vardiyayı beklemeye gerek yoktur.",
      ],
      commonError:
        "Mola süresini işe eklemek veya ondalık saati dakika gibi okumak.",
      check:
        "9,6·(5/48)=1. Üçüncü gün 09.00’dan 10.36’ya 1,6 etkin saat geçer.",
    },
  }),
  practice({
    key: "birlikte-daha-yavas",
    prompt:
      "A aynı işi tek başına 8 saatte, B 24 saatte bitiriyor. Birlikte çalışırken A’nın hızı yarıya düşüyor, B’nin hızı değişmiyor. Bu gerçek hızlarla ikisi işi kaç saatte tamamlar?",
    options: ["6 saat", "8 saat", "12 saat", "16 saat", "9 saat 36 dakika"],
    answer: 4,
    hint: "Önce A’nın birlikteki hızını güncelle. Bunun üzerine B’nin değişmeyen hızını ekle.",
    guidance: {
      knowledge: [
        "Birlikte çalışma, önceden verilen solo hızları değiştirebilir.",
      ],
      strategy:
        "Değişen hızı yalnız A’ya uygula ve yeni toplam hızı ters çevir.",
      steps: [
        "A’nın birlikteki hızı 1/16, B’nin hızı 1/24 iş/saat.",
        "Birlikte hız 1/16+1/24=5/48 iş/saat.",
        "Süre 48/5=9,6 saat, yani 9 saat 36 dakika. A’nın tek başına 8 saatinden uzundur.",
      ],
      optionReasons: [
        "6 saat, A’nın eskisi gibi çalıştığı 1/8+1/24 modelinden çıkar.",
        "Sekiz saatte yeni toplam hızla 5/6 iş biter.",
        "On ikinci saatte yeni hıza göre gereken süre çoktan aşılmıştır.",
        "16 saat yalnız yarı hızdaki A’ya ait süredir. B de çalışır.",
        "48/5 saat iki yeni hızın ortak bitirme süresidir.",
      ],
      commonError:
        "A’nın yeni hızını atlamak veya iki kişi varsa sürenin mutlaka 8 saatin altına ineceğini varsaymak.",
      check: "9,6/16=3/5, 9,6/24=2/5. Toplam bir iş.",
    },
  }),
  practice({
    key: "bitmis-urun-kapasitesi",
    prompt:
      "4 eş verimli çalışan 3 saatte 24 eş parça hazırlıyor. Aynı verimle 6 çalışan 5 saat çalışacak. Son makine saatte en çok 9 parça bitiriyor ve hammadde 52 parçaya yetiyor. Çalışma ve makine eşzamanlı başlıyor, makineye parça sürekli yetişiyor. Beş saatte en çok kaç parça bitirilebilir?",
    options: ["45", "52", "60", "54", "42"],
    answer: 0,
    hint: "İşgücü, makine ve hammadde için bu beş saatin ayrı üst sınırlarını yaz.",
    guidance: {
      knowledge: [
        "Bitmiş ürün sayısı, aynı üretim süresinde gerekli kaynakların hiçbirinin kapasitesini aşamaz.",
      ],
      strategy:
        "Kişi-saat başına hazırlanan parçayı bul. Makine ve hammaddeyle karşılaştır.",
      steps: [
        "Hazırlık hızı 24/(4·3)=2 parça/kişi-saat. Yeni ekip 6·5·2=60 parça hazırlayabilir.",
        "Makine 9·5=45 parça bitirebilir. Hammadde en çok 52 parça destekler.",
        "Makineye parça sürekli yetiştiğinden en küçük sınır olan 45 parçaya ulaşılır.",
      ],
      optionReasons: [
        "45 makinenin sınırıdır ve hazırlık ile hammadde bu sayıya yeter.",
        "52 hammadde sınırıdır. Makine 5 saatte o sayıya çıkamaz.",
        "60 hazırlık potansiyelidir. Bitirme aşamasının üst sınırını aşar.",
        "54 için makinenin 6 saat çalışması gerekir. Soru 5 saat veriyor.",
        "42 mümkün bir miktardır. Makine 45’e kadar bitirebildiği için en yüksek sayı değildir.",
      ],
      commonError:
        "Hazırlanan parça sayısını doğrudan bitmiş ürün sayısı olarak almak.",
      check: "Saatte hazırlık kapasitesi 12, makine 9. 5·9=45 ve 45≤52.",
    },
  }),
  practice({
    key: "ara-verip-ekip-olma",
    prompt:
      "A aynı işi 14 saatte, B 21 saatte bitirir. A önce 4 saat tek çalışıyor, sonra 2 saat hiç kimse çalışmıyor. Aradan sonra ikisi sabit ve bağımsız hızla işi tamamlıyor. Başlangıçtan geçen toplam süre ile B’nin etkin çalışma süresi sırasıyla nedir?",
    options: [
      "10 saat ve 6 saat",
      "12 saat ve 8 saat",
      "12 saat ve 6 saat",
      "14 saat ve 6 saat",
      "6 saat ve 6 saat",
    ],
    answer: 2,
    hint: "A’nın tek olduğu, işin durduğu ve iki kişinin çalıştığı üç evreyi ayrı yaz.",
    guidance: {
      knowledge: [
        "İş durduğunda ilerleme yoktur. Geçen süre sayacı buna rağmen ilerler.",
      ],
      strategy:
        "Kalan işi ortak hıza böl. B yalnız son evrede, toplam süre üç evrede sayılır.",
      steps: [
        "İlk 4 saatte 4/14=2/7 iş biter. İki saat arada pay değişmez.",
        "Birlikte hız 1/14+1/21=5/42. Kalan 5/7 iş için (5/7)÷(5/42)=6 saat.",
        "Başlangıçtan 4+2+6=12 saat geçer. B 6 saat çalışır.",
      ],
      optionReasons: [
        "10 saat, arayı çıkarınca kalan etkin zaman toplamıdır.",
        "B iki saatlik arada çalışmadı. Süresi 8 saat olamaz.",
        "Geçen süreye ara girer. B yalnız 6 saatlik son evrededir.",
        "14 saat A’nın tek başına bitirme süresidir. Bu planın üç evresini toplamaz.",
        "6 saat yalnız ortak bölümdür. İlk çalışma ve ara toplamda yer alır.",
      ],
      commonError:
        "Arada üretim varmış gibi saymak veya son evrenin süresini başlangıçtan geçen süre sanmak.",
      check:
        "A 10 etkin saatte 10/14=5/7, B 6 saatte 6/21=2/7 iş yapar. Toplam 1.",
    },
  }),
];
