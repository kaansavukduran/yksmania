import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

const titles = {
  difference: "Bir çiftin ürün dışında kalması için tek koşul yeter",
  diagonal: "Köşegeni ayır, kalan çiftleri eşleştir",
  inverse: "Nokta listesinden eksen kümelerini bul",
  choices: "Ürün koşulu alışverişte ve takvimde aynı çalışır",
};

export const cartesianSource030Sections: GuideSection[] = [
  {
    title: titles.difference,
    paragraphs: [
      "Bir (x,y) çifti A×B içindeyse x∈A ve y∈B’dir. Aynı ikilinin C×D’ye girmesi için x∈C ve y∈D birlikte gerekir. İlk veya ikinci koşuldan biri eksikse ikili (A×B)∖(C×D) içinde kalır.",
      "Örneğin A={1,2}, B={0,3}, C={2}, D={3} olsun. Dört başlangıç çiftinden yalnız (2,3) çıkar. (2,0) için ilk bileşen 2 C’de olmasına rağmen ikinci bileşen 0 D’de bulunmadığından ikili kalır.",
      "İki eksende birden dışarıda olmayı şart koşarsan yalnız (A∖C)×(B∖D) elde edilir ve bazı ikililer kaybolur. Tam fark [(A∖C)×B]∪[A×(B∖D)] biçimindedir. Her kalan ikili en az bir grupta görünür. Her iki grupta görünen aynı ikili sonuçta bir kez yazılır.",
    ],
  },
  {
    title: titles.diagonal,
    paragraphs: [
      "A×A’da (a,a) biçimindeki ikililer köşegendedir. A’nın n farklı elemanı varsa n köşegen ikilisi vardır. Köşegen dışında kalan her (a,b), (b,a) ile eşleşir. İkililerden biri artan, öteki azalan sıradadır.",
      "Böylece a<b için n(n−1)/2, a≤b için n(n−1)/2+n seçim çıkar. Bu simetri aynı sıralı kaynak küme iki eksende de kullanıldığında geçerlidir. A={1,2}, B={5,6} ise A×B’nin dört ikilisi de a<b koşulunu sağlar.",
    ],
  },
  {
    title: titles.inverse,
    paragraphs: [
      "Tam bir Kartezyen çarpım boş değilse noktaların farklı yatay değerleri ilk kümeyi, farklı düşey değerleri ikinci kümeyi geri verir. Aynı sırada birkaç nokta görmek, ilk bileşeni birden fazla kez saymayı gerektirmez.",
      "Ürün ∅, A ise boş değilse B boş olmalıdır. Çünkü B’nin bir elemanı olsaydı onunla A’nın herhangi bir elemanı ikili oluştururdu. A hakkında da bilgi verilmezse yalnız boş üründen hangi kaynağın boş olduğunu seçemeyiz.",
      "Şekilde yalnız a+b=8 gibi bir koşulu sağlayan çiftler kaldıysa ilk ve ikinci kaynakların bir bölümü görünmeyebilir. Kaynağı geri okuma, şekil bütün ürünü gösterdiğinde geçerlidir.",
    ],
  },
  {
    title: titles.choices,
    paragraphs: [
      "Üç forma ve iki şort varsa her forma her şortla kullanılabiliyorken 3·2=6 ikili vardır. Bir forma ve bir şort birlikte yasaksa yalnız o eşleşme çıkıp beş kalır. Formayı bütün öteki şortlardan çıkarmak farklı bir kural olur.",
      "İki sınıfın ortak boş zamanlarını bulurken günü ve saati aynı konumda karşılaştır. Ortak gün bir, ortak saat iki ise iki eşleşme ancak gün ile saatin bağımsız seçilebilmesi koşuluyla mümkündür. Takvim hazır randevu çiftleri veriyorsa iki listeyi doğrudan karşılaştır.",
    ],
    table: {
      headers: ["Verilen", "İlk işlem", "Kontrol"],
      rows: [
        [
          "İki sıralı ikili eşit",
          "Aynı konumları eşitle",
          "1. ile 1., 2. ile 2.",
        ],
        [
          "Ürünlerin kesişimi",
          "İki eksendeki ortakları ayrı al",
          "Her çift iki ortak değer taşıyor mu?",
        ],
        [
          "Ürünlerin farkı",
          "Çıkarılan çift için iki üyeliği sına",
          "Bir koşul bozuluyorsa çift kalır",
        ],
        [
          "A×A’da a<b",
          "Köşegeni çıkar ve tersleri eşleştir",
          "İki eksenin kaynağı aynı mı?",
        ],
      ],
    },
  },
];

export const cartesianSource030Examples: WorkedExample[] = [
  {
    title: "Tek bileşeni dışarıda olan çifti koru",
    prompt:
      "A={0,2}, B={1,3,5}, C={2,4}, D={3,5}. (A×B)∖(C×D) hangi ikilileri içerir?",
    strategy: "Başlangıç çiftleri içinde çıkarılacak ortak ürünü bul.",
    steps: [
      {
        label: "Başlangıç",
        expression: "A×B={(0,1),(0,3),(0,5),(2,1),(2,3),(2,5)}",
        explanation: "Her ilk bileşeni üç ikinci bileşenle eşleştir.",
      },
      {
        label: "Ortak",
        expression: "A∩C={2}, B∩D={3,5}",
        explanation: "Her iki ürünün ortak ikilileri (2,3) ve (2,5).",
      },
      {
        label: "Kalan",
        expression: "{(0,1),(0,3),(0,5),(2,1)}",
        explanation:
          "(2,1) için 2 C’ye girer fakat 1 D’ye girmez. Bu ikili kalır.",
      },
    ],
    answer: "{(0,1),(0,3),(0,5),(2,1)}.",
    check: "Altı başlangıç ikilisinden iki ortak ikili çıktı. Dört kaldı.",
    pitfall:
      "Her iki bileşenin de dışarıda olmasını isteyip yalnız (0,1) yazmak.",
  },
  {
    title: "Beş sayı ile artan ve azalmayan sırayı ayır",
    prompt: "A={0,1,3,4,8}. A×A’da a<b ve a≤b için ayrı ayrı kaç ikili vardır?",
    strategy:
      "Önce eşit bileşenlileri ayır, sonra kalanları tersleriyle eşleştir.",
    steps: [
      {
        label: "Bütün ürün",
        expression: "5·5=25",
        explanation: "Her sayının beş ikinci bileşen seçeneği var.",
      },
      {
        label: "Eşitler ve tersler",
        expression: "(25−5)/2=10",
        explanation:
          "Beş köşegen dışındaki yirmi ikili on artan ve on azalana ayrılır.",
      },
      {
        label: "Eşitliğe izin ver",
        expression: "10+5=15",
        explanation: "a≤b sorusu köşegendeki beş ikiliyi de kabul eder.",
      },
    ],
    answer: "a<b için 10, a≤b için 15.",
    check: "Artan çiftler ilk elemana göre 4+3+2+1+0=10.",
    pitfall: "Eşit bileşenlileri a<b sayımında tutmak.",
  },
];

export const cartesianSource030Recall = [
  {
    prompt: "(a,b) hangi durumda C×D’nin dışındadır?",
    answer:
      "a∉C veya b∉D ise dışarıdadır. İkisinin birden dışarıda olması gerekmez.",
  },
  {
    prompt: "A×A’nın köşegeninde kaç ikili vardır?",
    answer: "A’nın her elemanı kendiyle bir kez eşleşir. s(A) kadar.",
  },
  {
    prompt: "A×B boş ve B doluysa A hakkında ne bilirsin?",
    answer:
      "A boştur. İçinden bir eleman seçilebilseydi B’deki bir elemanla ürün çifti oluşurdu.",
  },
  {
    prompt: "Koşulla seçilmiş noktalardan kaynak kümeleri her zaman çıkar mı?",
    answer:
      "Hayır. Noktalar tam ve boş olmayan ürünü gösteriyorsa iki kaynak kesin olarak okunur. Süzülmüş bir grafikte bazı değerler eksik kalabilir.",
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
    id: `kartezyen-carpim-030-${id}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "kartezyen-carpim",
    guidance,
  };
}

export const cartesianSource030Practice: Question[] = [
  practice({
    id: "urun-farkinda-tek-kosul",
    prompt:
      "A={1,4}, B={0,2,5}, C={4,6}, D={2,3}. (A×B)∖(C×D) kümesinde kaç ikili vardır?",
    options: ["2", "4", "5", "6", "8"],
    answer: 2,
    hint: "Çıkarılan ikili iki üründe de bulunmalı. Eksen ortaklarını ayrı bul.",
    guidance: {
      knowledge: [
        "İki üründe birden olan bir ikilinin ilk ve ikinci bileşenleri ayrı ayrı ortak olmalı.",
      ],
      strategy: "Altı ikiliyle başla ve ortak ikili sayısını bir kez çıkar.",
      steps: [
        "A×B 2·3=6 ikili içerir.",
        "A∩C={4} ve B∩D={2}. Yalnız (4,2) ortak olduğundan 6−1=5.",
      ],
      optionReasons: [
        "2, iki eksende birden dışarıda (1,0) ve (1,5) olanları sayar.",
        "4 bulmak için iki başlangıç noktası silinmeli. Yalnız (4,2) silinir.",
        "Altı çiftten çıkarılacak tek ortak çift vardır.",
        "6, çıkarma işlemi yapılmadan önceki sayıdır.",
        "Fark alınırken başlangıç kümesi büyüyemez.",
      ],
      commonError:
        "Bir eksendeki ortak değeri kullanan bütün noktaları silmek.",
      check: "Kalanlar (1,0), (1,2), (1,5), (4,0), (4,5).",
    },
  }),
  practice({
    id: "kosullu-ikili-ve-kosegen",
    prompt:
      "A altı farklı sayıdan oluşuyor. A×A içinde a<b koşulunu sağlayan kaç (a,b) ikilisi vardır?",
    options: ["6", "12", "18", "15", "30"],
    answer: 3,
    hint: "Eşit bileşenlileri ayır. (a,b) ile (b,a) birlikte düşün.",
    guidance: {
      knowledge: [
        "Sayılar farklıysa ikisinin yalnız biri diğerinden küçüktür.",
      ],
      strategy: "Köşegen dışındaki ikilileri ikişerli eşleştir.",
      steps: [
        "6²=36 toplam ikilinin altısı köşegendedir.",
        "30 farklı bileşenli ikilinin yarısı artandır. Sonuç 15.",
      ],
      optionReasons: [
        "6 eşit bileşenli ikilidir. a<b koşulunu sağlamaz.",
        "12, köşegenin doğru çıkarılmasıyla oluşan otuz ikilinin yarısı değildir.",
        "18, köşegen dahil toplamın yarısıdır. Eşitler önce çıkarılır.",
        "Köşegen dışındaki 30 ikilinin yarısı 15’tir.",
        "30, artan ve azalan ikililerin toplamıdır.",
      ],
      commonError: "36’nın yarısını almak ve a=b olanları ayrı tutmamak.",
      check:
        "Sıralı listenin her elemanından sonra 5,4,3,2,1,0 seçenek var. Toplam 15.",
    },
  }),
  practice({
    id: "toplamla-uygun-yuvayi-bul",
    prompt:
      "A={0,2,5}, B={1,3,6}. A×B’de birinci ve ikinci bileşenlerinin toplamı 6 olan bütün ikililer hangileridir?",
    options: [
      "{(0,6),(5,1)}",
      "{(2,4),(5,1)}",
      "{(6,0),(1,5)}",
      "{(0,6)}",
      "{(0,6),(3,3),(5,1)}",
    ],
    answer: 0,
    hint: "Her a için b=6−a yaz ve b’nin B’de bulunup bulunmadığına bak.",
    guidance: {
      knowledge: ["Birinci yuva A’dan, ikinci yuva B’den gelir."],
      strategy: "Üç ilk elemanı tek tek ele, ikinci üyeliği kontrol et.",
      steps: [
        "a=0 için b=6, a=2 için b=4, a=5 için b=1 gerekir.",
        "B’de 6 ve 1 var. 4 yok, dolayısıyla (2,4) geçersiz.",
      ],
      optionReasons: [
        "Her iki ikili toplam koşulunu ve kendi küme üyeliklerini sağlar.",
        "4∉B, bu yüzden (2,4) üründe bulunmaz.",
        "Konumlar ters yazılmış. 6 ve 1 A’nın elemanı değildir.",
        "(5,1) de geçerli olduğu için liste eksik.",
        "3∉A, dolayısıyla (3,3) ilk koşulu sağlamaz.",
      ],
      commonError:
        "Yalnız toplamı kontrol edip sırayı ve üye kümelerini atlamak.",
      check: "0+6=5+1=6 ve her ikilinin elemanları doğru konumlarda.",
    },
  }),
  practice({
    id: "ortak-urun-dort-kume",
    prompt:
      "A={1,2,3}, B={0,4}, C={2,3,7}, D={4,8}. (A×B)∩(C×D) hangi kümedir?",
    options: [
      "{(4,2),(4,3)}",
      "{(2,0),(3,0)}",
      "{(2,4),(3,4)}",
      "{(2,4),(3,4),(7,4)}",
      "∅",
    ],
    answer: 2,
    hint: "İlk ve ikinci bileşenlerin ortak kümeleri birbirinden ayrı.",
    guidance: {
      knowledge: ["İlk yuva A∩C, ikinci yuva B∩D içinden gelir."],
      strategy: "Ortak eksen değerlerinden tam bir çarpım kur.",
      steps: ["A∩C={2,3}. B∩D={4}.", "Ortak ürün {(2,4),(3,4)} olur."],
      optionReasons: [
        "İlk ve ikinci bileşenler yer değiştirmiş.",
        "0, D’de olmadığı için ortak ikinci bileşen olamaz.",
        "2 ve 3 her iki ilk kümede, 4 her iki ikinci kümede.",
        "7, A’da yok. (7,4) yalnız C×D’de bulunabilir.",
        "İki eksende de ortak değer bulunduğundan ortak ürün boş değildir.",
      ],
      commonError: "İlk ve ikinci yuvaları çaprazlayarak ortaklık aramak.",
      check: "İlk yuvada iki, ikinci yuvada bir ortak değer var. 2·1=2 çift.",
    },
  }),
  practice({
    id: "bos-urun-kaynagi",
    prompt: "A={2,5} ve A×B=∅. B için hangisi kesinlikle doğrudur?",
    options: [
      "B={2,5}",
      "B={∅}",
      "B’de bir eleman vardır.",
      "B de A da boş.",
      "B=∅",
    ],
    answer: 4,
    hint: "B’de tek bir eleman bile olsaydı A’nın 2 elemanıyla kaç ikili kurulurdu?",
    guidance: {
      knowledge: [
        "İki kaynak da doluysa en az bir sıralı ikili oluşturulabilir.",
      ],
      strategy: "B’de bir b olduğunu varsay ve verilen ürünle karşılaştır.",
      steps: [
        "2∈A olduğundan b∈B olursa (2,b) A×B içinde bulunur.",
        "Ürün boş verildiği için böyle bir b yoktur. B=∅.",
      ],
      optionReasons: [
        "B dolu olursa iki kaynaktan çift oluşturulabilir.",
        "{∅} eleman olarak boş kümeyi içeren bir elemanlı kümedir.",
        "Tek b varsa (2,b) ve (5,b) üründe bulunur.",
        "A’nın 2 ve 5 elemanları zaten verilmiştir.",
        "B’nin boş olması ikinci bileşen seçimini engeller.",
      ],
      commonError: "∅ ile {∅} gösterimlerini aynı kabul etmek.",
      check: "İkinci kaynak boşsa 2·0=0 sonlu çift çıkar.",
    },
  }),
  practice({
    id: "dagilmada-cifti-tek-say",
    prompt: "A={2,4}, B={1,5,6}, C={5,7}. (A×B)∪(A×C) kaç ikili içerir?",
    options: ["8", "10", "6", "4", "7"],
    answer: 0,
    hint: "Önce ikinci bileşenlerin birleşimini al. Ortak 5 kaç kez kullanılmalı?",
    guidance: {
      knowledge: [
        "A×(B∪C), aynı ilk küme ile kurulan iki ürünün birleşimidir.",
      ],
      strategy: "B∪C’de farklı ikinci bileşenleri say ve A’nın boyuyla çarp.",
      steps: [
        "B∪C={1,5,6,7}. 5 bir kez yazılır.",
        "İki farklı ilk ve dört farklı ikinci bileşenle 2·4=8 ikili.",
      ],
      optionReasons: [
        "Ortak çiftleri tekrar saymadan oluşturulan tam ürün 8 elemanlıdır.",
        "10, (2,5) ve (4,5) çiftlerini iki kez sayar.",
        "6, yalnız A×B’yi sayar ve C’den gelen 7’yi dışlar.",
        "4, ikinci yuvaların sayısıdır. Her biri iki ilk değerle eşleşir.",
        "10’dan birinci ortak çiftin yanı sıra ikinciyi çıkarınca 8 kalır. 7, ortak olmayan bir çifti daha siler.",
      ],
      commonError:
        "Tek ortak ikinci değerin yalnız bir ortak çift oluşturacağını varsaymak.",
      check: "A×B 6, A×C 4, ortak iki çift. 6+4−2=8.",
    },
  }),
  practice({
    id: "eksende-farkli-degeri-say",
    prompt:
      "Tam ve boş olmayan (A∪B)×C ürününün noktalarında farklı yatay değerler {0,2,4,6,8}, farklı düşey değerler {1,3,7}. s(A)=4 ve s(B)=3 ise C×(A∩B) kaç ikili içerir?",
    options: ["15", "2", "7", "6", "3"],
    answer: 3,
    hint: "Önce yatay eksenden birleşim sayısını bul, sonra kesişimi hesapla.",
    guidance: {
      knowledge: ["Tam ürünün ilk ve ikinci izdüşümleri iki kaynak kümedir."],
      strategy:
        "Yatay ve düşey değerleri ayrı say ve iki kümeli birleşim kuralını uygula.",
      steps: [
        "Yatayda s(A∪B)=5, düşeyde s(C)=3.",
        "s(A∩B)=4+3−5=2. İstenen 3·2=6.",
      ],
      optionReasons: [
        "15, başlangıçtaki (A∪B)×C ürününün büyüklüğüdür.",
        "2 kesişim sayısıdır. C ile çarpılmalıdır.",
        "7, A ve B’nin toplamını verir ve ortakları iki kez içerir.",
        "C’nin üç elemanı ile iki ortak eleman altı çift oluşturur.",
        "3 yalnız C’nin büyüklüğüdür.",
      ],
      commonError: "Verilen ürün ile istenen ürünü aynı kabul etmek.",
      check:
        "A’nın yalnız 2, B’nin yalnız 1, ortak 2 elemanı var. Birleşim 2+1+2=5.",
    },
  }),
];

export const cartesianSource030Summary =
  "Aurelia 030 Kümeler: Kartezyen Çarpım, biçim 5 ve içerik 5.1 (19 Kasım 2026), fiziksel s. 1–12. MEB/OGM Matematik 9, Kartezyen Çarpım, web s. 33. 2022 AYT Matematik 12 için asıl kitapçık ve cevap anahtarı Geçmiş Sınavlar’da açılır.";

export const cartesianSource030SheetText = new Map<string, string[]>([
  [
    titles.difference,
    [
      "A×B içindeki bir (x,y) ikilisi x∉C veya y∉D ise farkta kalır.",
      "(A∖C)×(B∖D) yalnız iki koşulu birlikte bozanları seçer. Ortak ürünün sayısını başlangıçtan çıkar.",
    ],
  ],
  [
    titles.diagonal,
    [
      "A×A’da n eşit çift var. Ötekilerin yarısı a<b, yarısı a>b.",
      "a<b için n(n−1)/2, a≤b için ayrıca n köşegen ikilisini ekle.",
    ],
  ],
  [
    titles.inverse,
    [
      "Tam ve boş olmayan bir üründe yatay değerler ilk, düşey değerler ikinci kümeyi geri verir.",
      "Boş ürünün hangi kaynaktan geldiği tek başına belirlenemez. A dolu ve ürün boşsa B boştur.",
    ],
  ],
  [
    titles.choices,
    [
      "Koşul her çifte uygulanır. Yasak bir eşleşme, ilgili elemanın bütün eşleşmelerini silmez.",
      "Ortak randevuları bulurken gün ve saatin konumunu koru.",
    ],
  ],
]);
