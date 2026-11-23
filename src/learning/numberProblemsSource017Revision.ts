import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const numberProblemsSource017Summary =
  "Aurelia 017 Sayı Problemleri, içerik 1.1 (19 Kasım 2026), PDF s. 1–9. MEBİ TYT Matematik Konu Özetleri, basılı s. 47 (PDF s. 49). Prova alıştırmaları özgündür. Geçmiş sınavlardan öğren bölümünde 2026 TYT Temel Matematik 18 kaynak kaydı yer alır.";

export const numberProblemsSource017Sections: GuideSection[] = [
  {
    title: "İkinci kesrin hangi miktara ait olduğunu yaz",
    paragraphs: [
      "Başlangıç miktarı N olsun. Önce bunun p/q’si kullanılırsa ara miktar K=N·(1−p/q) olur. “Kalanın r/s’si” ifadesi rK/s kadar ikinci kullanım demektir. “Başlangıcın r/s’si” denirse aynı kesir rN/s kadar kullanımı anlatır. Aradaki fark, iki cümlenin hangi bütünü seçtiğidir.",
      "Örneğin 120 L suyun önce 1/3’ü kullanılırsa 80 L kalır. Kalanın 1/4’ü 20 L eder, son durumda 60 L kalır. İkinci kullanım başlangıcın 1/4’ü olsaydı 30 L kullanılır ve 50 L kalırdı. Bir sayı adedi soruluyorsa her ara grubun tam sayı olduğunu da denetle.",
    ],
  },
  {
    title: "Farklı nesne sayısı ile toplam kullanımı ayrı say",
    paragraphs: [
      "Her kullanım grubunu ayrı tut. Bir kez kullanılan a, iki kez kullanılan b, üç kez kullanılan c farklı nesne varsa D=a+b+c farklı nesne, U=a+2b+3c kullanım vardır. İlk denklemin her nesneye verdiği katsayı 1’dir. İkincide katsayı o gruptaki her nesnenin kaç kez kullanıldığını gösterir.",
      "Kısa yol işe yarar: 3D−U=2a+b olur. Üç kez kullanılan grubun katsayısı 3−3=0 olduğu için c sadeleşir. Bu yoldan bulunan değerleri her iki denkleme geri koy. D≤N ve a,b,c’nin negatif olmayan tam sayılar olması gerekir. Yalnız D’yi kullanıp N−D bulmak diğer verilerin geçerli olduğunu göstermez.",
    ],
    table: {
      headers: [
        "Grup",
        "Farklı nesne sayısına katkı",
        "Kullanım sayısına katkı",
      ],
      rows: [
        ["Bir kez kullanılan", "a", "a"],
        ["İki kez kullanılan", "b", "2b"],
        ["Üç kez kullanılan", "c", "3c"],
        ["Hiç kullanılmayan", "0", "0"],
      ],
    },
  },
  {
    title: "Kapasiteyi tek birimle say",
    paragraphs: [
      "Bir alan ya 24 otomobil ve 11 kamyon ya da 18 otomobil ve 13 kamyon alıyor. Otomobil başına alan a, kamyon başına alan b olsun. Aynı alan dolduğundan 24a+11b=18a+13b yazılır. Her iki taraftan 18a+11b çıkarınca 6a=2b kalır. Bir kamyon üç otomobillik yer kaplar. Kapasite her iki düzende 24+11·3=18+13·3=57 otomobil yeridir.",
      "24+11=35, ilk düzende duran araçların toplam adedidir. Kapasiteyi ‘yalnız otomobil’ birimiyle sayarken her kamyonun ne kadar yer tuttuğunu hesaba kat. Düzenler aynı alanı doldurmalı ve her araç kendi türünde aynı büyüklükte olmalı.",
    ],
  },
  {
    title: "Denklemi seç, sonra hangi koşula dayandığını kontrol et",
    paragraphs: [
      "Sorulan niceliğin adını ve birimini yaz. Bir cümledeki işlem sırasını parantezle göster, iki düzeni aynı toplamı anlatıyorsa eşitle. Ardışık sayılarda ortak farkı metinden al. Bir sonucun geçerli olması için yalnız denklemin kökü olmak yetmez. Tam sayı adedini, boş ve kısmi grupları, kalan miktarı ve ağırlıklı toplamı denetle.",
      "Kısa yol, normal çözümde hangi bilginin kullanıldığını görünür tutmalıdır. Birden çok bilgi verilmişse birini kullanarak sonuç bulduktan sonra diğerlerini de yerine koy. Farklı nesne sayısı sağlanırken kullanım sayısı sağlanmıyorsa, matematiksel olarak uygulanabilir bir model kurulamamıştır.",
    ],
    table: {
      headers: [
        "İlk hamle",
        "Geçerli örnek",
        "Yöntemin durduğu yer",
        "Aynı yapıda bir uygulama",
      ],
      rows: [
        [
          "Cümlenin sıra düzenini koru",
          "3 katının 4 fazlası: 3x+4.",
          "4 fazlasının 3 katı: 3(x+4). x=2’de sonuçlar 10 ve 18’dir.",
          "Üç çıtanın her biri x cm ve her birine 4 cm eklenirse toplam 3(x+4) cm gerekir.",
        ],
        [
          "Ortak farkı belirle",
          "15, 19, 23 eşit aralıklıdır. Ortadaki 19 ve fark 4 diğerlerini belirler.",
          "Yalnız toplam 57 bilinirse 14, 18, 25 de mümkün olur; bu üçü eşit aralıklı değildir.",
          "Saat 10.05, 10.10, 10.15 ölçümlerinin aralığı beş dakikadır.",
        ],
        [
          "Aynı toplamı iki kez yaz",
          "Üçerli kutulamada 2 artıyor, dörderli kutulamada 2 kutu boş: 3s+2=4(s−2). s=10 ve toplam 32.",
          "Boş kutuları sayarsan ikinci toplam hatalı olarak 4s olur.",
          "Bir sırada iki kişi varsa tam dolu sıralardan ayrı sayılıp iki kişi eklenir.",
        ],
        [
          "Her kesrin tabanını adlandır",
          "80 L’nin 1/4’ü, sonra kalanın 1/3’ü kullanılırsa 40 L kalır.",
          "İki kesri de 80 L’ye uygulamak farklı bir cümleyi çözer.",
          "Aynı kesirle yapılan iki indirimde ikinci indirim yeni fiyattan hesaplanır.",
        ],
        [
          "Nesne adedi ile katkıyı ayır",
          "8 paketten x’i 5 kg, kalanları 2 kg ve toplam 25 kg ise 5x+2(8−x)=25. x=3.",
          "x+(8−x)=25 yazmak paket adedine kilogram değeri yükler.",
          "Bir, iki ve üç defa okunan kartların her biri bir farklı karttır; okumaya katkıları değişir.",
        ],
        [
          "Büyüklükleri aynı birime çevir",
          "12 dar+4 geniş veya 6 dar+7 geniş bölme aynı yeri doldurur. Bir geniş iki dar, toplam 20 dar yer.",
          "Bir düzende daha çok boşluk varsa kullanılan alanları doğrudan eşitleme.",
          "12 tek ve 4 çift koltuk, 6 tek ve 7 çift koltukla aynı 20 kişilik kapasiteyi verir.",
        ],
      ],
    },
  },
];

export const numberProblemsSource017Examples: WorkedExample[] = [
  {
    title: "İki veriyi aynı anda sağlayan model var mı?",
    prompt:
      "50 kartın 1/5’i bir, kalan kartların yarısı iki ve arta kalan kartların bazıları üç kez kullanılıyor. 32 farklı kartla 55 kullanım yazılmış. Bu iki sayı birlikte gerçekleşebilir mi?",
    strategy:
      "Birinci ve ikinci grubu bul. Üçüncü grubu farklı kart sayısından tamamla, sonra kullanım sayısını bağımsız kontrol et.",
    steps: [
      {
        label: "İlk iki grup",
        explanation: "50’nin 1/5’i 10. Geriye kalan 40 kartın yarısı 20.",
        expression: "a=10, b=20",
      },
      {
        label: "Farklı kart sayısı",
        explanation:
          "Üç kez kullanılan kartların her biri, farklı kart sayısına bir ekler.",
        expression: "10+20+c=32 ⇒ c=2",
      },
      {
        label: "Kullanım denetimi",
        explanation: "Her grubu kendi kullanım sıklığıyla çarp.",
        expression: "10+2·20+3·2=56",
      },
    ],
    answer: "Veriler çelişiyor. İkisini aynı anda sağlayan bir model yok.",
    check:
      "50−32=18 yalnız farklı kart bilgisiyle uyumludur. Kullanım sayısının da doğru olması için 55 yerine 56 gerekir.",
    pitfall:
      "İlk denklemin verdiği adedi ikinci denklemi sınamadan sonuç kabul etmek.",
  },
];

export const numberProblemsSource017Recall = [
  {
    prompt:
      "D farklı nesne sayısı, U toplam kullanım ise 3D−U ile hangi grup sadeleşir?",
    answer:
      "Üç kez kullanılan grup. Bir kez kullanılan a, iki kez kullanılan b ise 3D−U=2a+b olur.",
  },
  {
    prompt:
      "Toplam 50, kullanılan farklı kart sayısı 32 ise 50−32 her durumda geçerli sonuç verir mi?",
    answer:
      "Kullanım toplamı da verilen tüm gruplarla uyuşmalıdır. Uyuşmuyorsa bütün verileri sağlayan sonuç yoktur.",
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
    id: `sayi-problemleri-017-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "Sayı Problemleri",
    guidance,
  };
}

export const numberProblemsSource017Practice = [
  practice({
    key: "kismi-ve-bos-sira",
    prompt:
      "Bir sınıfta sıralar dörderli dolunca 3 öğrenci ayakta kalıyor. Beşerli düzende 2 sıra tamamen boş, bir sırada 2 öğrenci, öteki sıralar tam doludur. Sıra ve öğrenci sayısı sırasıyla kaçtır?",
    options: [
      "13 sıra, 55 öğrenci",
      "16 sıra, 67 öğrenci",
      "16 sıra, 65 öğrenci",
      "11 sıra, 47 öğrenci",
      "18 sıra, 75 öğrenci",
    ],
    answer: 1,
    hint: "s sıra varsa ikinci düzende hem iki boş sırayı hem kısmen dolu sırayı tam dolulardan çıkar.",
    guidance: {
      knowledge: [
        "Sıra ve öğrenci toplamları farklı niceliklerdir. İki düzenin aynı öğrenci sayısını vermesi gerekir.",
      ],
      strategy:
        "İki öğrenci toplamını s ile yaz ve kısmen dolu sıradaki iki kişiyi ayrıca ekle.",
      steps: [
        "Dörderli düzen 4s+3 öğrenci sayar.",
        "Beşerli düzende s−3 sıra tam doludur. O düzen 5(s−3)+2 öğrenci sayar.",
        "4s+3=5s−13 ise s=16. Öğrenci sayısı 4·16+3=67.",
      ],
      optionReasons: [
        "13, tam dolu sıranın sayısıdır. Sınıfta ayrıca 3 sıra vardır.",
        "4·16+3=5·13+2=67, iki düzen de aynı toplamı verir.",
        "65 yalnız beşer dolu sıralardaki öğrencileri sayar. Kısmi sıradaki iki öğrenci ayrı eklenir.",
        "s=11 iken ilk düzen 47, ikinci düzen 42 öğrenci sayar.",
        "s=18 iken ilk düzen 75, ikinci düzen 77 öğrenci sayar.",
      ],
      commonError:
        "Kısmen dolu sırayı tam dolu saymak veya içindeki öğrencileri atlamak.",
      check: "13 tam dolu, 1 kısmen dolu ve 2 boş sıra toplam 16 sıra eder.",
    },
  }),
  practice({
    key: "kalan-ve-baslangic",
    prompt:
      "İki depoda, her deponun başlangıç suyunun 1/4’ü kullanılıyor. Sonra ilk depoda kalanın 1/5’i, ikinci depoda kendi başlangıcının 1/5’i kullanılıyor. Her depoda 66 L kalıyor. Başlangıç miktarları ilk ve ikinci depo sırasıyla kaç litredir?",
    options: [
      "120 ve 110",
      "120 ve 120",
      "110 ve 110",
      "88 ve 132",
      "110 ve 120",
    ],
    answer: 4,
    hint: "İlk deponun ikinci kullanımını ara kalana, ikinci deponunkini başlangıca bağla. İki denklem ayrı olacak.",
    guidance: {
      knowledge: [
        "Kalanın kesrinde ardışık kalan çarpanları çarpılır. Aynı başlangıcın iki ayrı parçası çıkarılırken iki kesir toplanır.",
      ],
      strategy:
        "Her deponun 66 L’ye karşılık gelen son kalan oranını ayrı bul.",
      steps: [
        "İlk depoda son kalan (3/4)·(4/5)=3/5 oranındadır. Başlangıç 66·5/3=110 L.",
        "İkinci depoda iki kesir de başlangıca ait. Son kalan 1−1/4−1/5=11/20 oranındadır.",
        "İkinci başlangıç 66·20/11=120 L.",
      ],
      optionReasons: [
        "İki başlangıç miktarı yer değiştirmiştir.",
        "İlk depo 120 L’den başlasa 72 L kalır.",
        "İkinci depo 110 L’den başlasa 60,5 L kalır.",
        "88, ilk aşamadan 66 L’ye ulaşır ve ikinci kullanımı atlar. İkinci deponun son oranı 1/2 değildir.",
        "110·3/5=66 ve 120·11/20=66. Her deponun kendi koşulu sağlanır.",
      ],
      commonError: "İkinci kullanımın tabanını iki depoda da aynı almak.",
      check:
        "İkinci kullanım miktarları sırasıyla 16,5 L ve 24 L’dir. İlk kullanımlar çıkarıldıktan sonra her depoda 66 L kalır.",
    },
  }),
  practice({
    key: "iki-sayimla-kullanilmayan",
    prompt:
      "Bir oyunda pul grubunun 1/4’ü bir kez okutuluyor. Geriye kalanların 1/3’ü iki kez, daha önce okutulmamış bazı pullar da üç kez okutuluyor. 45 farklı pul için toplam 75 okutma yapılıyor. Kaç pul hiç okutulmadı?",
    options: ["15", "20", "35", "45", "80"],
    answer: 2,
    hint: "Farklı pul sayısı ile toplam okutma sayısı için iki denklem yaz. Üç kez okutulan grubu yok etmeyi dene.",
    guidance: {
      knowledge: [
        "Aynı pulun üç kez okutulması, farklı pul sayısına bir ve toplam okutmaya üç ekler.",
      ],
      strategy:
        "N toplam pul, t üç kez okutulan pul olsun. İlk iki grubu N ile bul. Farklı pul denkleminin üç katından okutma denklemini çıkar.",
      steps: [
        "Bir kez okutulan N/4. Geriye kalan 3N/4’ün üçte biri de N/4 pul eder.",
        "Farklı pul denklemi N/2+t=45. Okutma denklemi 3N/4+3t=75.",
        "3·45−75=60, yani 3N/4=60. N=80 ve t=5.",
        "Hiç okutulmayan pul 80−45=35.",
      ],
      optionReasons: [
        "15, okutma sayısından bulunan bir grup adedi değildir.",
        "20, bir kez ve iki kez okutulan grupların her birindeki pul sayısıdır.",
        "80 puldan 45 farklı pul okutulmuştur. Geriye 35 pul kalır.",
        "45, okutulan farklı pul adedidir.",
        "80, tüm pulların sayısıdır.",
      ],
      commonError: "Toplam 75 okutmayı 75 farklı pul gibi işlemek.",
      check: "20+20+5=45 farklı pul ve 20+2·20+3·5=75 okutma vardır.",
    },
  }),
  practice({
    key: "celisen-kullanim-onar",
    prompt:
      "60 kartın 1/4’ü bir kez, geriye kalanların 1/3’ü iki kez, daha önce kullanılmayan bazı kartlar da üç kez kullanılıyor. Bir rapor 34 farklı kart ve 56 kullanım yazıyor. Bu rapor hakkında hangi sonuç doğrudur?",
    options: [
      "Veriler çelişir. 34 farklı kartın toplam kullanımı 57 olmalıdır.",
      "Bütün veriler uyumludur, 26 kart hiç kullanılmamıştır.",
      "Üç kez kullanılan kart sayısı 3’tür, böylece kullanım 56 olur.",
      "İkinci grup 20 karttır, çünkü 60/3=20.",
      "56 kullanım, 56 farklı kart demektir.",
    ],
    answer: 0,
    hint: "Önce 34 farklı karta ulaşmak için üçüncü grubu bul. Ardından kullanım toplamını kendi denklemiyle denetle.",
    guidance: {
      knowledge: [
        "Bir veriyle bir aday hesaplamak, aynı adayın diğer verileri sağladığını göstermez.",
      ],
      strategy:
        "İlk iki grubun adedini bul, farklı kart sayısıyla üçüncü grubu tamamla ve kullanım sayısını yeniden hesapla.",
      steps: [
        "Bir kez kullanılan 60/4=15 kart var. Kalan 45 kartın üçte biri de 15’tir.",
        "34−15−15=4 kart üç kez kullanılmış olmalıdır.",
        "15+2·15+3·4=57 kullanım çıkar. Rapor 56 söylediği için koşullar birlikte sağlanamaz.",
      ],
      optionReasons: [
        "Farklı kart sayısı üçüncü grubu 4 yapar. Bu durumda kullanım zorunlu olarak 57’dir.",
        "60−34=26 yalnız farklı kart sayısını kullanır. 56 koşulunu doğrulamaz.",
        "3 kart üç kez kullanılırsa 33 farklı kart ve 54 kullanım çıkar.",
        "Üçte bir, başlangıçtaki 60 karta değil kalan 45 karta uygulanır.",
        "Bir karta birden fazla kullanım düşebildiğinden bu iki toplam aynı değildir.",
      ],
      commonError:
        "Farklı kart sayısıyla bulunan 26’yı diğer veriyle çelişse de nihai cevap saymak.",
      check:
        "56−15−30=11, üç kullanımın katı değildir. Raporu kullanım denkleminden başlayarak da eleyebilirsin.",
    },
  }),
];
