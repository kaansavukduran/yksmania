import { probabilityReference036, statisticsReference037 } from "../learning/probabilityStatistics041Official";
import {
  lineAnglesReference042, triangleAnglesReference042, triangleSidesReference042,
} from "../learning/geometryConditions042Official";
import { combinationReference034, binomialReference035 } from "../learning/countingSources034035Official";
import { permutationReference032, repeatedPermutationReference033 } from "../learning/permutationSources032033Official";
import { source031Reference } from "../learning/logicSource031Official";
import { source030Reference } from "../learning/cartesianSource030Official";
import booklets from "../data/official-booklets.json";
import { source028Reference } from "../learning/factorizationSource028Official";
import { source029Reference } from "../learning/setsSource029Official";
export const officialBooklets = booklets;
export interface PastExamReference {
  id: string;
  bookletId: string;
  test: string;
  question: number;
  page: number;
  answerPage: number;
  answerSource?: {
    url: string;
    pages: number;
    sha256: string;
  };
  answer: string;
  topicIds: string[];
  title: string;
  connection: string;
  solution: string[];
}
// Question bodies/images stay in their official PDFs or the user's local copy.
// Every association below was checked on the question page and answer source.
export const pastExamReferences: PastExamReference[] = [
  {
    id: "2021-TYT-MAT-1",
    bookletId: "2021-tyt",
    test: "Temel Matematik",
    question: 1,
    page: 26,
    answerPage: 45,
    answer: "E",
    topicIds: ["detail-202"],
    title: "Doğru bütünü seçerek oran kurma",
    connection:
      "Rasyonel sayılar: kap kütlesini çıkarma ve kesri sadeleştirme.",
    solution: [
      "Boş kap 280 g. Tam dolu su 400−280=120 g, kısmi su 355−280=75 g.",
      "Doluluk oranı 75/120=5/8’dir. 355/400 kabı da hesaba katacağı için su doluluğunu vermez.",
      "Kontrol: 120×5/8=75; 75+280=355 g. Resmî anahtar E ile eşleşir.",
    ],
  },
  {
    id: "2021-TYT-FEN-8",
    bookletId: "2021-tyt",
    test: "Fen Bilimleri",
    question: 8,
    page: 40,
    answerPage: 45,
    answer: "A",
    topicIds: ["detail-141"],
    title: "Sistematik addan yaygın ada",
    connection:
      "Kimyanın sembolik dili: azot ve hidrojen sembollerini adla eşleştirme.",
    solution: [
      "Verilen addaki azot N, hidrojen H ile gösterilir; tri üç hidrojen belirtir.",
      "NH₃’ün yaygın adı amonyaktır. Formüldeki atom sayısı oranı N:H=1:3’tür.",
      "Sonuç A; resmî anahtar da A’dır. Bu tek ad örneği tüm bileşikler için genel adlandırma kuralı değildir.",
    ],
  },
  {
    id: "2021-TYT-FEN-9",
    bookletId: "2021-tyt",
    test: "Fen Bilimleri",
    question: 9,
    page: 40,
    answerPage: 45,
    answer: "C",
    topicIds: ["detail-146"],
    title: "Dış katmandaki elektronları karşılaştırma",
    connection: "Periyodik sistem: helyumun dış katman istisnası.",
    solution: [
      "Temel halde He’nin dış katmanı 2, N’ninki 5, Mg’ninki 2 elektron içerir.",
      "Bu nedenle N > Mg = He. Helyumu sırf 18. grupta diye sekiz dış elektronlu sayma.",
      "C seçeneği bu ilişkiyi verir ve resmî anahtarla eşleşir.",
    ],
  },
  {
    id: "2018-TYT-FEN-1",
    bookletId: "2018-tyt",
    test: "Fen Bilimleri",
    question: 1,
    page: 34,
    answerPage: 42,
    answer: "E",
    topicIds: ["detail-2", "detail-139"],
    title: "Bilimsel bilgiye ulaşma yolları",
    connection:
      "Bilimsel yöntemle doğrudan; simyadan kimyaya geçişle bağlantılıdır. Doğrudan simya tarihi sorusu değildir.",
    solution: [
      "Deney koşulları sınar, gözlem veri sağlar, akıl yürütme veriler arasında gerekçeli ilişki kurar.",
      "Üçünün de kullanılabilmesi E sonucunu verir; resmî anahtar E’dir.",
      "Kullanılabilirlik, her araştırmanın aynı sabit sırayla ilerlemesi veya üç yolun her seferinde zorunlu birlikte bulunması demek değildir.",
    ],
  },
  {
    id: "2018-TYT-FEN-12",
    bookletId: "2018-tyt",
    test: "Fen Bilimleri",
    question: 12,
    page: 37,
    answerPage: 42,
    answer: "E",
    topicIds: ["detail-139"],
    title: "Mürekkebin bileşenlerini işleviyle eşleştirme",
    connection:
      "Tarihsel ürünlerle bağlantılı uygulama sorusudur; doğrudan simya tarihi sorusu değildir.",
    solution: [
      "Boya veya pigment renk, uygun uçucu çözücü kuruma, bağlayıcı yüzeye tutunma işleviyle değerlendirilir.",
      "Verilen üç işlev birlikte değerlendirilince E sonucu çıkar; resmî anahtar da E’dir.",
      "Bir ürünün tarihsel kullanımı, güncel bileşenlerinin kimyayla incelenmesini engellemez.",
    ],
  },
  {
    id: "2026-ALES2-SAY-4",
    bookletId: "2026-ales2",
    test: "Sayısal",
    question: 4,
    page: 3,
    answerPage: 3,
    answer: "C",
    topicIds: ["detail-202"],
    title: "Ondalık bölmelerde ölçeği koruma",
    connection:
      "Rasyonel sayılarla bağlantılı ondalık işlem; ortak payda ve işlem sırası.",
    solution: [
      "Her bölmede bölen virgülden kurtarılırken bölünen de aynı 10 kuvvetiyle çarpılmalıdır.",
      "İlk bölüm 10, ikinci bölüm 0,1 verir. Aradaki çıkarma 10−0,1=9,9’dur.",
      "C seçeneği. Bu %10 kitapçığında doğru cevap soru sayfasında C olarak verilmiştir.",
    ],
  },
  {
    id: "2026-DGS-SAY-1",
    bookletId: "2026-dgs",
    test: "Sayısal",
    question: 1,
    page: 3,
    answerPage: 3,
    answer: "E",
    topicIds: ["detail-202"],
    title: "Çok katlı kesirde gruplama",
    connection: "Rasyonel sayılar: üst ve alt grupları ayrı bitirip bölme.",
    solution: [
      "Üstte 1/2+5=11/2; altta 1/2+3/5=11/10 bulunur.",
      "(11/2)÷(11/10)=(11/2)×(10/11)=5.",
      "E seçeneği. %10 kitapçığının aynı sayfasındaki cevap E ile eşleşir.",
    ],
  },
  {
    id: "2026-KPSS-GY-33",
    bookletId: "2026-kpss",
    test: "Genel Yetenek",
    question: 33,
    page: 13,
    answerPage: 13,
    answer: "C",
    topicIds: ["detail-208"],
    title: "Kökleri ortak çarpana dönüştürme",
    connection:
      "Köklü sayılar: karekök ve dördüncü dereceden kök, ortak çarpanla sadeleştirme.",
    solution: [
      "√96=4√6 ve ⁴√4=√2; pay 4√12=8√3 olur.",
      "Payda √75−√27=5√3−3√3=2√3. Bölüm 4’tür.",
      "C seçeneği; aynı sayfadaki resmî doğru cevap C’dir. Kök derecesini atlama.",
    ],
  },
  {
    id: "2021-TYT-MAT-5",
    bookletId: "2021-tyt",
    test: "Temel Matematik",
    question: 5,
    page: 27,
    answerPage: 45,
    answer: "C",
    topicIds: ["detail-198", "topic-tyt-mat-faktoriyel-kaynak-033"],
    title: "Katmanlı adetlerden faktöriyel zincirine",
    connection:
      "Faktöriyel: katman adetlerini çarpma ve 11’den 14’e ardışık çarpımı 14!/10! ile yazma.",
    solution: [
      "Verilen katman adetlerinin çarpımı 11·12·13·2·7’dir; her katman sayısı ayrı bir faktöriyel değildir.",
      "2·7=14 birleşince 11·12·13·14 kalır. 14!=14·13·12·11·10! olduğundan çarpım 14!/10!’tır.",
      "Bağımsız sayısal kontrol 132·182=24.024 verir. Resmî soru için C anahtarıyla eşleşir; buradaki öğretim açıklaması resmî kurum çözümü değildir.",
    ],
  },
  {
    id: "2021-TYT-MAT-15",
    bookletId: "2021-tyt",
    test: "Temel Matematik",
    question: 15,
    page: 30,
    answerPage: 45,
    answer: "A",
    topicIds: ["detail-201", "topic-tyt-mat-ebob-ekok-kaynak-034"],
    title: "Bölünebilme koşullarını ortak katta birleştirme",
    connection: "EBOB ve EKOK: 9 ve 5 için ortak kat 45, 9 ve 12 için ortak kat 36 üzerinden rakam koşullarını denetleme.",
    solution: [
      "Üç basamaklı gösterimlerde A sıfır olamaz; AAB=110A+B ve ABA=101A+10B yazılır. İkisinin rakam toplamı da 2A+B’dir; 9’a bölünebilme ortak koşuldur.",
      "5’e bölünen sayı AAB ise B=0 veya 5; ABA ise A=5 olur. Her dalda diğer sayının 12’ye bölünmesini, yani 3 ve 4 koşullarını da koru. A=1…9 ve B=0…9 içindeki 90 çifti bu iki olasılıkla tüketince tek uygun çift A=2, B=5’tir.",
      "Kontrol: 225 hem 9’a hem 5’e; 252 hem 9’a hem 12’ye tam bölünür. A+B=7, resmî anahtar A ile eşleşir. Bu adımlar özgün öğretim açıklamasıdır; resmî kurum çözümü değildir.",
    ],
  },
  {
    "id": "2024-TYT-MAT-3",
    "bookletId": "2024-tyt",
    "test": "Temel Matematik",
    "question": 3,
    "page": 24,
    "answerPage": 43,
    "answer": "A",
    "topicIds": ["detail-206"],
    "title": "Sabit artış ile katlanmalı örüntüyü ayırma",
    "connection": "Denklem kurmadan önce üretim kuralını belirle. Bu seçili resmî örnek katlanmalıdır; doğrusal 241→81 alıştırması bu sorunun özeti değildir.",
    "solution": [
      "Her yeni katmanda sayı iki katına çıkar: 1, 2, 4, …; ilk üç katman toplamı 7’dir.",
      "12. adım toplamından 10. adım toplamını çıkarınca yalnız 11. ve 12. katman kalır: 2¹⁰+2¹¹=3×2¹⁰=3072.",
      "Resmî A seçeneği 3×2¹⁰’dur. Sabit fark varsayımı kullanılamaz; bu özgün öğretim açıklaması resmî kurum çözümü değildir."
    ]
  },
  {
    id: "2024-TYT-MAT-17",
    bookletId: "2024-tyt",
    test: "Temel Matematik",
    question: 17,
    page: 29,
    answerPage: 43,
    answer: "C",
    topicIds: ["detail-210"],
    title: "Günlük süre toplamından ilk günü bulma",
    connection: "Birinci dereceden denklem kurarken artan ve azalan günleri ayrı say, tepe gününü bir kez al.",
    solution: [
      "İlk gün x dakika. 15. gün x+14, azalışın başladığı 16. gün x+13, son gün x−1 olur.",
      "İlk 15 gün 15x+105, son 15 gün 15x+90 dakika. 30x+195=1395, yani 30x=1200.",
      "x=40 dakika. İlk bölüm 705, ikinci bölüm 690 ve toplam 1395 dakikadır. Resmî anahtar C.",
    ],
  },
  {
    "id": "2024-TYT-MAT-8",
    "bookletId": "2024-tyt",
    "test": "Temel Matematik",
    "question": 8,
    "page": 26,
    "answerPage": 43,
    "answer": "A",
    "topicIds": [
      "topic-tyt-mat-basit-esitsizlikler-kaynak-037"
    ],
    "title": "Kâr ve zarar koşullarının ortak aralığı",
    "connection": "Basit eşitsizlikler: aynı maliyetle iki satış koşulunu kesiştir. Resmî b TL’dir; bin TL ölçeği ayrı u=b/1000 değişkenidir.",
    "solution": [
      "Toplam maliyet 18.000+22.000+b=40.000+b TL. Kâr koşulu 2b+30.000>40.000+b olduğundan b>10.000 TL.",
      "Zarar koşulu 3b−20.000<40.000+b olduğundan 2b<60.000 ve b<30.000 TL. Birlikte 10.000<b<30.000.",
      "Merkez 20.000, yarıçap 10.000 TL’dir: |b−20.000|<10.000. Resmî anahtar A’dır. u=b/1000 seçilirse 10<u<30; b=20 TL denmez."
    ]
  },
  {
    id: "2021-TYT-MAT-3",
    bookletId: "2021-tyt",
    test: "Temel Matematik",
    question: 3,
    page: 26,
    answerPage: 45,
    answer: "D",
    topicIds: ["detail-207"],
    title: "Bağlı büyütmelerde uzunluğu bulma",
    connection: "Bilimsel gösterimle verilen uzunluğa art arda iki birimsiz çarpan uygula.",
    solution: [
      "4 ve 40 toplam olarak değil, sırayla uygulanır. Toplam büyütme oranı 4·40=160’tır.",
      "12,5×10⁻³ mm için ilk aşama 0,05 mm, son aşama 2 mm’dir.",
      "Büyütme oranının birimi yoktur. Sonuç 2 mm ve resmî anahtar D’dir.",
    ],
  },
  {
    id: "2023-TYT-MAT-4",
    bookletId: "2023-tyt",
    test: "Temel Matematik",
    question: 4,
    page: 24,
    answerPage: 42,
    answer: "D",
    topicIds: ["detail-208"],
    title: "Kare alanından olası köklü kenar yazımlarını bulma",
    connection: "Kenar uzunluğu A√B biçimindeyse alan A²B’dir. Doğal sayı olan A ve B, aynı uzunluğu birden çok biçimde yazabilir.",
    solution: [
      "720 pozitif olduğundan A ve B pozitiftir. A²B=720 ve 720=2⁴·3²·5. 720’nin asal çarpan üslerini ikiye bölüp tam kısmını al. Böylece A, 2’yi en çok iki, 3’ü en çok bir kez içerebilir. 5, A’da yer alamaz.",
      "A değerleri 1, 2, 3, 4, 6 ve 12. Her biri için B=720/A² hesaplanınca A+B toplamları sırasıyla 721, 182, 83, 49, 26 ve 17 olur.",
      "127 bu listede yer almaz. Kitapçıkta D olarak verilen bu sonuç, fiziksel PDF sayfası 42’deki resmî anahtarla eşleşir. Soru fiziksel PDF sayfası 24, basılı sayfa 22’dedir.",
    ],
  },
  {
    id: "2026-TYT-MAT-2",
    bookletId: "2026-tyt",
    test: "Temel Matematik",
    question: 2,
    page: 25,
    answerPage: 45,
    answer: "B",
    topicIds: ["detail-209"],
    title: "Ardışık eşit oranlarda ileri ve geri adım",
    connection:
      "İki bilinen değerin oranı iki geçişi kapsıyorsa önce tek geçiş katsayısını bul, sonra istenen nesle geri dön.",
    solution: [
      "Ardışık işlemci nesillerinin işlem sayıları aynı pozitif r katsayısıyla değişir. İkinci neslin değeri 10⁸, dördüncü neslin değeri 4·10¹² işlem/s. İkiden dörde iki geçiş olduğundan r²=(4·10¹²)/10⁸=40.000 ve r=200.",
      "İlk nesilden ikinciye bir geçiş vardır. İlk neslin işlem sayısı 10⁸/200=5·10⁵ işlem/s’dir. Kontrol için sırayla 200 ile çarpınca 10⁸, 2·10¹⁰ ve 4·10¹² elde edilir.",
      "Bu sonuç resmî B anahtarıyla eşleşir. Temel Matematik 2, fiziksel PDF sayfası 25 (basılı 23), cevap anahtarı fiziksel PDF sayfası 45’tedir.",
    ],
  },
  {
    id: "2026-TYT-MAT-18",
    bookletId: "2026-tyt",
    test: "Temel Matematik",
    question: 18,
    page: 30,
    answerPage: 45,
    answer: "C",
    topicIds: ["detail-210"],
    title: "Farklı tuşlarla toplam basışları ayrı sayma",
    connection:
      "Farklı tuş sayısı her grubu bir kez sayar. Toplam basış sayısı her grubu kullanım sıklığıyla çarpar.",
    solution: [
      "Toplam tuş N, üç kez kullanılan tuşların adedi t olsun. Bir kez kullanılan N/3 tuş, iki kez kullanılan ise geriye kalan 2N/3’ün altıda biri N/9 tuştur.",
      "Farklı tuş sayısı 4N/9+t=37 ve toplam basış 5N/9+3t=69. İlk denklemin üç katından ikincisini çıkarınca 7N/9=42 olur. Buradan N=54.",
      "Bir kez basılan 18, iki kez basılan 6, üç kez basılan 13 tuş vardır. Bunlar 37 farklı tuş ve 18+12+39=69 basış verir. Hiç basılmayan 54−37=17 tuş, C anahtarıyla eşleşir.",
    ],
  },
  {
    id: "2023-TYT-MAT-3",
    bookletId: "2023-tyt",
    test: "Temel Matematik",
    question: 3,
    page: 23,
    answerPage: 42,
    answer: "D",
    topicIds: ["detail-211"],
    title: "Ardışık artışların değişen bütünleri",
    connection:
      "Her yıllık artış bir önceki yıla aittir. Dört kez tekrarlanan iki dönem çarpanı, iki ayrı üs olarak taşınır.",
    solution: [
      "810.000 başlangıç değerine ilk dört yılda her yıl 11/10, sonraki dört yılda her yıl 12/11 çarpanı uygulanır. Son değer 810.000·(11/10)⁴·(12/11)⁴ olur.",
      "İki dönemde de dört geçiş olduğundan çarpanlar (11/10·12/11)⁴=(6/5)⁴ biçiminde birleşir. 810.000=30⁴ olduğundan sonuç (30·6/5)⁴=36⁴=6⁸=1.679.616’dır.",
      "Bu sonuç D anahtarıyla eşleşir. Soru fiziksel PDF sayfası 23 (basılı 21), resmî cevap anahtarı fiziksel PDF sayfası 42’dedir.",
    ],
  },
  {
    id: "2023-TYT-MAT-26",
    bookletId: "2023-tyt",
    test: "Temel Matematik",
    question: 26,
    page: 30,
    answerPage: 42,
    answer: "E",
    topicIds: ["detail-212"],
    title: "Kuruluş yılıyla iki doğum yılını bulma",
    connection:
      "İşletmenin takvim yılı ile kuruluşundan beri geçen süreyi ayır. İki kişinin yaşını aynı hedef yılda hesapla.",
    solution: [
      "1949’da büyük kişi 11 yaşında olduğundan yıl modelinde doğum yılı 1949−11=1938’dir. Küçük kişinin doğum yılı işletmenin açılışından 40 yıl sonra, 1949+40=1989’dur.",
      "2022’de yaşlar 2022−1938=84 ve 2022−1989=33’tür. Toplam 117’dir. Alternatif olarak 2022, açılıştan 73 yıl sonra olduğu için aynı yaşlar 11+73 ve 73−40 diye yazılabilir.",
      "117 sonucu E anahtarıyla eşleşir. Soru fiziksel PDF sayfası 30 (basılı 28), anahtar fiziksel PDF sayfası 42’dedir.",
    ],
  },
  {
    id: "2026-TYT-MAT-21",
    bookletId: "2026-tyt",
    test: "Temel Matematik",
    question: 21,
    page: 30,
    answerPage: 45,
    answer: "E",
    topicIds: ["detail-212"],
    title: "İki eski tarih ve iki ayrı hedef yaş",
    connection:
      "2013’te iki kişinin yaşı, 1999’da yalnız annenin yaşı gerekir. Bugünkü hedefleri her eski sütunda yeniden hesaplama.",
    solution: [
      "Annenin 2025 yaşı A, çocuğunki Ç olsun. 2013, 12 yıl öncedir. Verilen yaş toplamı (A−12)+(Ç−12)=A eder. Buradan Ç=24 çıkar.",
      "1999, 26 yıl öncedir. O tarihteki anne yaşı çocuğun 2025 yaşına eşit olduğu için A−26=24 ve A=50 olur.",
      "2013’te yaşların toplamı 38+12=50’dir. 1999’da anne 24 yaşında, çocuk henüz doğmamıştır. İkinci koşul çocuğun o tarihteki yaşını kullanmaz. 2025 toplamı 74, resmî anahtar E’dir.",
    ],
  },
  {
    id: "2026-TYT-MAT-19",
    bookletId: "2026-tyt",
    test: "Temel Matematik",
    question: 19,
    page: 30,
    answerPage: 45,
    answer: "E",
    topicIds: ["detail-213"],
    title: "İki kapta kalan miktarların eşitliği",
    connection:
      "Başlangıç doluluğunda kapasiteyi, tüketimde mevcut içeriği taban al. İki kabın kalan miktarını aynı birimde eşitle.",
    solution: [
      "Ortak pozitif kapasite C, ikinci kabın başlangıç doluluk kesri x olsun. Birinci kabın başlangıç içeriği 0,80C, kalanı 0,80·0,84C=0,672C’dir.",
      "İkinci kapta başlangıç içeriğinin %96’sı kalır. Eşitlik 0,672C=0,96xC. Ortak C’yi sadeleştirip 0,96’ya bölersen x=0,70 çıkar.",
      "0,70·0,96C=0,672C kontrolü iki kalanı eşitler. Başlangıç doluluğu %70, resmî anahtar E’dir. Soru fiziksel PDF sayfası 30 (basılı 28), anahtar fiziksel PDF sayfası 45’tedir.",
    ],
  },
  {
    id: "2013-ALES-ILKBAHAR-SAY1-20",
    bookletId: "2013-ales-ilkbahar",
    test: "Sayısal-1",
    question: 20,
    page: 7,
    answerPage: 61,
    answer: "A",
    topicIds: ["detail-215"],
    title: "Aynı anaparada iki faiz oranını karşılaştırma",
    connection:
      "2013 ALES İlkbahar · Aynı anapara ve bir yıllık süre için faiz oranı ile TL getirisinin birimini ayrı tut.",
    solution: [
      "İlk yıllık yüzde p, ortak anapara P olsun. Bir yıldaki faizler P·p/100=200 ve P·(p−2)/100=100 TL’dir.",
      "İki denklemi çıkar. 100=P·2/100 olduğundan P=5.000 TL bulunur. İlk yılın yüzdesi 200/5.000·100=4. İkinci getiri sıfır olmadığı için p/(p−2)=200/100 üzerinden de p=4 bulunabilir.",
      "5.000 TL’nin %4’ü 200, %2’si 100 TL’dir. İlk oran %4 ve resmî anahtar A. Soru fiziksel PDF s. 7 (basılı s. 5), anahtar fiziksel PDF s. 61.",
    ],
  },
  {
    id: "2013-ALES-ILKBAHAR-SAY1-18",
    bookletId: "2013-ales-ilkbahar",
    test: "Sayısal-1",
    question: 18,
    page: 7,
    answerPage: 61,
    answer: "B",
    topicIds: ["detail-216"],
    title: "Saf bileşen eklenince toplam da büyür",
    connection:
      "2013 ALES İlkbahar · Eklenen saf şeker, hem ölçülen şeker miktarına hem toplam kütleye katılır.",
    solution: [
      "Başlangıçta 10 kg karışımın %12’si şekerdir. Şeker kütlesi 10·0,12=1,2 kg.",
      "Eklenen 1 kg saf şekerle şeker 2,2 kg, toplam karışım 11 kg olur. 100·2,2/11=%20.",
      "11 kg’ın %20’si 2,2 kg’dır. Resmî anahtar B. Soru fiziksel PDF s. 7 (basılı s. 5), anahtar fiziksel PDF s. 61.",
    ],
  },
  {
    id: "2011-YGS-MAT-22",
    bookletId: "2011-ygs",
    test: "Temel Matematik",
    question: 22,
    page: 31,
    answerPage: 1,
    answerSource: {
      url: "https://dokuman.osym.gov.tr/web/eskidosyalar/210.pdf",
      pages: 1,
      sha256: "aa288f6ad5e2e4f5e4fff7bd26ddec15c791b916c77c48580370854f6e39671b",
    },
    answer: "B",
    topicIds: ["detail-217"],
    title: "İki farklı grup hızından yeni ekibin hızına geçme",
    connection:
      "2011 YGS · Aynı işi bitiren her grupta önce kişi başı günlük hızı çıkar. Yeni ekipte her türün kişi sayısını kendi hızıyla çarp.",
    solution: [
      "Aynı iş için ilk beş kişilik grubun günlük hızı 1/20, ikinci grubun 1/30. Her grup içinde eş hız kabul edilince kişi hızları 1/100 ve 1/150 iş/gün olur.",
      "Her gruptan iki kişiyle yeni toplam hız 2/100+2/150=1/30 iş/gündür. Bu hızla süre 30 gündür.",
      "30 günde ilk iki kişi 3/5, diğer iki kişi 2/5 iş yapar. Resmî anahtar B. Kitapçık M9991.01001, soru fiziksel s. 31 (basılı s. 29), ayrı cevap PDF’si s. 1.",
    ],
  },
  {
    id: "2013-YGS-MAT-37",
    bookletId: "2013-ygs",
    test: "Temel Matematik",
    question: 37,
    page: 39,
    answerPage: 56,
    answer: "C",
    topicIds: ["detail-218"],
    title: "Gecikmeli dolan depolarda eşit seviyeyi bulma",
    connection:
      "2013 YGS · Her deponun hacimsel debisini kendi taban alanına böl. Zamanı sorunun istediği musluğun açıldığı anda başlat.",
    solution: [
      "Geniş deponun kesiti 9π m², dar deponunki 4π m². Yalnız geniş depo dolarken 5 dakikada 18π m³ su girmiştir. Ortak debi 18π/5 m³/dk.",
      "Dar deponun musluğu açıldığında genişte 2 m su vardır. Bu andan sonraki t dakikada, taşma öncesi seviyeler genişte 2+2t/5, darda 9t/10 metredir.",
      "2+2t/5=9t/10 denklemi 20+4t=9t verir. t=4 dakikada iki seviye 3,6 m’dir. Kitapçık basılı s. 37, PDF s. 39. Aynı PDF s. 56’daki anahtar C’dir.",
    ],
  },
  {
    id: "2026-TYT-MAT-22",
    bookletId: "2026-tyt",
    test: "Temel Matematik",
    question: 22,
    page: 31,
    answerPage: 45,
    answer: "A",
    topicIds: ["detail-219"],
    title: "Ara durak geçişlerini belirleyen gidiş, dönüş ve bekleme",
    connection:
      "Bir ara noktaya geri gelene kadar alınan yol kesitini iki kez say. Uçta beklemeyi geçen saate bir kez ekle.",
    solution: [
      "İkinci ara durak geçişi 11.30, üçüncüsü 14.40. Arada araç ilk şehre gidip 30 dk bekler ve ara durağa döner. 190−30=160 dk iki eş harekete ait olduğundan ilk kentten ara durağa tek yön 80 dk sürer.",
      "08.00’den ikinci geçişe 210 dk vardır. İlk 80 dk, diğer uçtaki 30 dk bekleme ve ara durakla öteki uç arasındaki iki eş yol bu süreyi oluşturur. Öteki kesit tek yönde (210−80−30)/2=50 dk sürer.",
      "14.40’taki üçüncü geçişten sonraki dönüş 50+30+50=130 dk alır. Dördüncü geçiş 16.50, resmî anahtar A. Soru PDF s. 31 (basılı s. 29), anahtar PDF s. 45.",
    ],
  },
  {
    id: "2026-TYT-MAT-24",
    bookletId: "2026-tyt",
    test: "Temel Matematik",
    question: 24,
    page: 31,
    answerPage: 45,
    answer: "C",
    topicIds: ["detail-219"],
    title: "İki günün açık sürat aralıklarını kesiştirme",
    connection:
      "Pozitif sürüş süresinin sınırlarını bul. Her mesafe aynı süratle gidileceği için iki aralığı tek v üzerinde birleştir.",
    solution: [
      "Sürüş süresi t>0 saattir. Her 24 saatlik günde 2<(24−t)/t<3 olduğundan pozitif t ile çarp. 2t<24−t<3t, yani 6<t<8.",
      "88 km için 11<v<44/3, 108 km için 27/2<v<18 bulunur. Ortak aralık 27/2<v<44/3’tür. Uç noktalar eşitlik verir ve dışarıda kalır.",
      "14 km/sa için süreler 44/7 ve 54/7 saattir. İkisi de 6’dan büyük, 8’den küçüktür. Resmî anahtar C. Soru PDF s. 31 (basılı s. 29), anahtar PDF s. 45.",
    ],
  },
  {
    id: "2018-TYT-MAT-14",
    bookletId: "2018-tyt",
    test: "Temel Matematik",
    question: 14,
    page: 25,
    answerPage: 42,
    answer: "A",
    topicIds: ["detail-220"],
    title: "Üç grafikte sıralama ve koşulun başladığı aralık",
    connection:
      "Aynı x’teki düşey değerleri karşılaştır. Her önermede başlangıç koşulunun hangi aralıkta doğru olduğunu ayır.",
    solution: [
      "0<x<2 içinde üç grafiğin ortak kesişimine b de. 0<x<b olduğunda h(x)<g(x)<f(x), b<x<2 olduğunda f(x)<g(x)<h(x). x=b’de üç değer eşittir.",
      "I’in ilk koşulu sağ aralıkta gerçekleşir ve orada g(x)<h(x) doğrudur. II’nin ilk koşulu da sağdadır fakat orada h(x)<f(x) yanlıştır. III’ün ilk koşulu soldadır ve orada f(x)<g(x) yanlıştır.",
      "Kesişimde sıkı başlangıç koşullarının hiçbiri sağlanmaz. Sağ ve sol aralıklardaki denetim yalnız I sonucunu verir. Resmî anahtar A. Soru PDF s. 25 (basılı s. 23), anahtar PDF s. 42.",
    ],
  },
  source028Reference,
  source029Reference,
  source031Reference,
  source030Reference,
  permutationReference032,
  repeatedPermutationReference033,
  combinationReference034,
  binomialReference035,
  probabilityReference036,
  statisticsReference037,
  lineAnglesReference042,
  triangleAnglesReference042,
  triangleSidesReference042,
];
// Selected companion links leave all earlier source records and their topic lists intact.
const sourceCompanionReferences: Record<string, readonly string[]> = {
  "topic-tyt-mat-rasyonel-kaynak-035": ["2021-TYT-MAT-1"],
  "topic-tyt-mat-dogrusal-denklemler-kaynak-036": ["2024-TYT-MAT-17"],
  "detail-214": ["2024-TYT-MAT-8"],
};
export function pastExamReferencesForTopic(topicId?: string) {
  return pastExamReferences.filter((reference) => Boolean(topicId && (
    reference.topicIds.includes(topicId) ||
    sourceCompanionReferences[topicId]?.includes(reference.id)
  )));
}
export const officialExamArchives = [
  { exam: "TYT / AYT", url: "https://osym.gov.tr/SinavGrubu/Index/2" },
  { exam: "ALES", url: "https://osym.gov.tr/SinavGrubu/Index/5" },
  { exam: "DGS", url: "https://osym.gov.tr/SinavGrubu/Index/8" },
  { exam: "KPSS", url: "https://www.osym.gov.tr/SinavGrubu/Menu/344" },
  { exam: "Diğer ÖSYM sınavları", url: "https://osym.gov.tr/SinavGrubu/Hepsi" },
];
