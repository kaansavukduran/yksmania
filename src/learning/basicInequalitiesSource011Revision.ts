import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { CheatExample, CheatSection } from "./cheatsheetContent";
import type { GuideSection, WorkedExample } from "./guides/types";

type Source011Item = QuestionGuidance & { code: string; prompt: string; options: string[] };

export const source011Figure = {
  conditions: ["x≥1", "y≥0", "x+y≤4"],
  boundaries: ["x=1", "y=0", "x+y=4"],
  vertices: [[1, 0], [4, 0], [1, 3]],
  interval: 1,
  summary: "x yatay, y düşey eksendir. Ortak bölge x=1’in sağında, y=0’ın üstünde ve x+y=4’ün (0,0)’ı içeren tarafındadır. (1,0), (4,0) ve (1,3) köşelerinin belirlediği üçgenin içi ve kenarları dahildir.",
  strictSummary: "x+y<4 olursa eğik kenarın tamamı, (4,0) ve (1,3) dahil, dışarıda kalır. (1,0) ve kalan iki kenarın eğik kenara ulaşmadan önceki bölümleri içeridedir.",
  referencePages: [
    "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/matematik/09/unite3/files/basic-html/page56.html",
    "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/matematik/09/unite3/files/basic-html/page57.html",
  ],
} as const;

export const source011PracticeItemCodes = ["Q08", "Q09", "Q10", "Q11", "Q12", "Q13", "Q14", "Q19", "Q46", "Q47"] as const;

const sections: (GuideSection & { code: string })[] = [
  {
    code: "S31",
    title: "Bağımsız aralıklarda toplam ve fark",
    paragraphs: [
      "a ve b bağımsız seçilebiliyorsa birinin her izinli değeri ötekinin her izinli değeriyle eşleşebilir. 1<a<3 ve 2≤b≤4 için en küçük toplam 1+2’ye, en büyük toplam 3+4’e yaklaşır. 1 ve 3, a’nın aralığında olmadığından bu iki toplam alınamaz: 3<a+b<7.",
      "Farkta b yerine −b aralığını kullan. b’nin aralığı [2,4] ise −b’nin aralığı [−4,−2] olur. Böylece alt sınır 1−4, üst sınır 3−2: −3<a−b<1. Bir izinli çiftten ötekine her değişkeni kendi aralığı içinde sürekli değiştirirsen toplam ve fark da kesintisiz değişir. Bu yüzden sınırlar arasında boşluk kalmaz.",
      "Eşitsizlik toplarken iki ilişkiyi aynı yöne yaz. a<b ve c≤d ise a+c<b+d olur. Sıkı ilk koşul, toplamdaki eşitliği engeller. Çarpım ve bölüm için ayrıca işaret ve sıfır koşullarını incele.",
    ],
    table: {
      headers: ["İşlem", "Alt sınır için yaklaş", "Üst sınır için yaklaş"],
      rows: [["a+b", "a küçük, b küçük", "a büyük, b büyük"], ["a−b", "a küçük, b büyük", "a büyük, b küçük"]],
    },
  },
  {
    code: "S32",
    title: "Çarpımda işaret ve uç kabulü",
    paragraphs: [
      "İki çarpan pozitifse biri artarken diğeri sabit tutulduğunda çarpım artar. 1<a<3 ve 2≤b≤4 için 2<ab<12. İşaret değişebiliyorsa, bağımsız ve sonlu aralıkların her iki ucundan oluşan dört köşedeki çarpımı hesapla. Bir çarpanı sabit tutunca ürün öteki çarpanın doğrusal bir ifadesidir. Bu yüzden en küçük ve büyük sınırlar köşelerde belirlenir. İzinli çiftler arasında kesintisiz değişirken çarpım da kesintisiz değişir.",
      "−2≤a≤3 ve 1≤b≤4 için dört köşe çarpımı −2, −8, 3 ve 12’dir. Çarpım [−8,12] aralığındadır. İki uç da b=4 ile, sırasıyla a=−2 ve a=3 seçilerek alınır.",
      "Uç dahil mi diye, o sonucu veren en az bir izinli çift ara. 0≤a<2 ve 1<b<3 için ab=0, a=0 ile b’nin herhangi bir izinli değerinde alınır. Üst sınır 6’ya ulaşılamaz. Sonuç [0,6) olur.",
    ],
  },
  {
    code: "S33",
    title: "Tersini alırken paydayı sıfırdan ayır",
    paragraphs: [
      "0<a<b veya a<b<0 ise ab pozitiftir. Eşitsizliğin iki tarafını ab’ye bölünce 1/b<1/a elde edilir. Bu yüzden 1/b ifadesi, b sıfırın aynı tarafında kaldığı sürece b büyüdükçe küçülür.",
      "−2≤b≤3 için b=0’ın tersini alamazsın. Negatif dalda 1/b∈(−∞,−1/2], pozitif dalda 1/b∈[1/3,∞) olur. b sıfıra soldan yakınlaşırken 1/b çok negatif, sağdan yakınlaşırken çok pozitif olur. Birleşimde iki parça arasındaki boşluk kalır.",
      "Bağımsız 1<a<3 ve 2≤b≤4 için a/b=a·(1/b). 1/4≤1/b≤1/2 olduğundan 1/4<a/b<3/2. Pay pozitifken pay büyüdükçe bölüm büyür ve pozitif payda büyüdükçe bölüm küçülür. Pay negatifse bu son yön değişebilir. Emin olmak için paydayı sıfırdan ayır ve 1/b aralıklarının her birini pay aralığıyla çarp.",
    ],
  },
  {
    code: "S34",
    title: "Aynı değişken iki kez geçiyorsa bağı denetle",
    paragraphs: [
      "a=b koşulu a ve b’yi birbirine bağlar. 1<a<3 ve 2≤b≤4 verilse bile bu ek koşul varsa izinli çiftler a=b∈[2,3) noktalarından oluşur ve a−b daima 0’dır. Bağımsız aralık hesabı bu durumda ancak daha geniş bir sınır verebilir.",
      "a²=a·a ifadesinde iki a aynı anda aynı değeri alır. −2<a<3 için a=0 izinlidir, dolayısıyla en küçük kare 0’dır. Mutlak büyüklüğü 3’e soldan yaklaşan pozitif a değerleri kareyi 9’a yaklaştırır. 3 ve −3 izinli olmadığından 9 alınamaz: 0≤a²<9.",
      "ax<b ifadesinde a=0 ise geriye 0<b kalır. 0x<4 için her gerçek x uygundur. 0x<−1 için hiçbir x uygun değildir. Bu dalda sabit karşılaştırmayı doğrudan denetle.",
    ],
  },
  {
    code: "S35",
    title: "Sınır doğrusu ve yarı düzlem",
    paragraphs: [
      "İki bilinmeyenli doğrusal eşitsizliğin bir çözümü (x,y) sıralı ikilisidir. x yatay, y düşey eksendeki değerdir. a ve b aynı anda 0 olmadığında ax+by=c, düzlemi iki tarafa ayıran sınır doğrusudur. ≤ veya ≥ sınırı kabul eder ve çizgisi kesiksizdir. < veya > sınırı dışarıda bırakır ve çizgisi kesiklidir.",
      "Boyanacak tarafı bulmak için doğrunun üzerinde olmayan bir nokta seç. Koordinatları ilk eşitsizlikte yerine koy. Koşulu sağlıyorsa noktanın olduğu tarafı, sağlamıyorsa karşı tarafı al. Örneğin (0,0), y=0 sınırında olduğu için y≥0 yönünü seçmeye yaramaz. (0,1) üst tarafı doğrular.",
      "Bir sistemde her koşulun tarafını ayrı belirle, sonra kesişimi al. Bir köşe iki sınırın kesişiminden doğabilir. Köşenin bölgeye dahil olup olmadığını bütün ilk koşullarda denetle.",
    ],
  },
  {
    code: "S36",
    title: "Üç yarı düzlemin ortak bölgesi",
    paragraphs: [
      source011Figure.summary,
      "(2,1) için 2≥1, 1≥0 ve 2+1≤4 doğrudur. (0,2) son iki koşulu sağlar fakat ilkini sağlamaz. Eğik kenardaki (2,2), 2+2=4 olduğundan x+y≤4 ile kabul edilir.",
      source011Figure.strictSummary,
    ],
    table: {
      headers: ["Sınır", "Tarafı bulmak için deneme", "Kalan taraf"],
      rows: [["x=1", "(2,0): 2≥1", "Sağ"], ["y=0", "(0,1): 1≥0", "Üst"], ["x+y=4", "(0,0): 0≤4", "Başlangıç noktasını içeren taraf"]],
    },
  },
  {
    code: "S37",
    title: "Katsayıyı ayır, iki sınırı taşı, adedi seç",
    paragraphs: [
      "M1 · Doğrusal ifadeyi ayır. −2x+3<11 için −2x<8 ve x>−4. Yakın örnek x−2<11’de iki tarafa 2 eklenir ve x<13. Aynı negatif katsayı yapısı, başlangıçta 3 °C olup saatte 2 °C azalan sıcaklıkta 3−2t<−5 yoluyla t>4 saati verir. Süre t≥0’dır.",
      "M2 · İki sınırı birlikte taşı. 1<2x+3≤9 için −1<x≤3. −2<x<4 aralığını −2’ye bölersen iki yön de değişir; küçükten büyüğe −2<−x/2<1 olur. Depoda 7 L’den fazla ve en çok 11 L hedeflenirse, 7<3+2t≤11 ile 2<t≤4 dakika bulunur.",
      "M3 · Adet için izinli tam sayıyı seç. 50+12n≤100 sınırı n≤25/6 verir. Son uygun tam sayı 4’tür. n≥25/6 olsaydı ilk uygun tam sayı 5 olurdu. 20 L’ye 3 L’lik tam kaplar ekleyerek en az 31 L’ye varmak için n≥11/3 ve en az 4 kap gerekir.",
    ],
  },
  {
    code: "S38",
    title: "Başa başı, parametre işaretini ve bağlacı ayır",
    paragraphs: [
      "M4 · Geliri giderle karşılaştır. 5n gelir, 30+2n gider için kâr n>10, zarar etmeme n≥10 verir. n=10 başa baştır. Etkinlikte gelir 8n ve gider 50+3n ise kâr için n>10, yani en az 11 kişi gerekir.",
      "M5 · Parametrenin işaretine göre durumları ayır. ax<4 için a>0 iken x<4/a, a<0 iken x>4/a, a=0 iken x∈ℝ. a=−2 için x>−2; x=0 bunu doğrular. 10+rt<14, t≥0 modelinde r>0 iken 0≤t<4/r gerekir, r≤0 iken her t≥0 uygundur.",
      "M6 · Koşulların bağlacını belirle. x>1 ve x≤4 için (1,4]; x≤1 veya x>4 için (−∞,1]∪(4,∞). x≤1 ve x>4 ise ortak değer yoktur. Sıcaklık 1 °C’den büyük ve en çok 4 °C olmalıysa 1 dışarıda, 4 içeridedir.",
    ],
  },
  {
    code: "S39",
    title: "Aralık hesabı ile düzlem kesişimini ayır",
    paragraphs: [
      "M7 · Aralıkta işlem. Bağımsız 2<a<4 ve 1≤b≤3 için küçük a ile büyük b, farkı −1’e yaklaştırır. Büyük a ile küçük b, farkı 3’e yaklaştırır. Böylece −1<a−b<3 ve 2<ab<12. Aynı a ile hesaplanan a²’de bağı kontrol et: −2<a<3 iken a=0 da izinlidir. Bağımsız 2<u<4 cm ve 1≤v≤3 cm ölçüleriyle dikdörtgen alanı 2<A<12 cm² olur.",
      "M8 · Düzlemde yarı düzlemleri kesiştir. x≥0, y≥0 ve x+y≤3 için (1,1) içeride, (2,2) dışarıdadır. (3,0) sıralı ikilisi sınıra dahildir. x+y<3 olursa (3,0) dışarıda kalır. En çok 3 kg taşıyan kutuda x ve y iki farklı yükün kütlesiyse (1,2) uygundur; (2,2) izin verilen toplamı aşar.",
    ],
  },
  {
    code: "S40",
    title: "Karışık prova",
    paragraphs: [
      "Notu kapatıp aşağıdaki on soruyu çöz. Ardından Çözümlü örnekler bölümünü aç ve adımları karşılaştır. İçeriden, dışarıdan ve varsa sınırdan bir değer seçip ilk koşullarda denetle.",
      "−5<2x+1≤9 için önce üç taraftan aynı sabiti çıkar. Sonra her sınırda eşitlik durumunu düşün ve aralık gösterimini tamamla. Kendi yanıtından sonra «Eksik adımları gerekçeyle tamamla» örneğiyle karşılaştır.",
      "Düzlemde tam sayı sorusunda önce bir koordinatın mümkün değerlerini bul, sonra öteki koordinatı her satır için say. Aralık aktarımında her uç için izinli bir çift göster veya neden yalnız yaklaşılabildiğini açıkla.",
    ],
  },
];

const examples: (WorkedExample & { code: string })[] = [
  {
    code: "E35",
    title: "İki pozitif aralıkla dört işlem",
    prompt: "Bağımsız 1<a<3 ve 2≤b≤4 için a+b, a−b, ab ve a/b ifadelerinin tam aralıklarını bul.",
    strategy: "Önce her ifade için alt ve üst sınırı veren yönü seç. Sonra iki sınırın alınıp alınmadığını denetle.",
    steps: [
      { label: "Topla", expression: "1+2=3, 3+4=7", explanation: "İki değişken büyüyünce toplam büyür." },
      { label: "Farkı toplam yap", expression: "−4≤−b≤−2", explanation: "Küçük a ile büyük b, farkın alt sınırını verir. Üst sınır için bunun tersi." },
      { label: "Pozitif çarpımı karşılaştır", expression: "1·2=2, 3·4=12", explanation: "İki çarpan pozitif olduğu için ikisi büyüdükçe çarpım büyür." },
      { label: "Paydayı ters çevir", expression: "1/4≤1/b≤1/2", explanation: "Pozitif payla çarparken en küçük payı en büyük paydayla, en büyük payı en küçük paydayla eşleştir." },
    ],
    answer: "a+b∈(3,7), a−b∈(−3,1), ab∈(2,12), a/b∈(1/4,3/2).",
    check: "a=2,b=3 için sırasıyla 5, −1, 6 ve 2/3 elde edilir. Sınırların her birinde a, 1 veya 3 olmalıydı. İki değer de açık uç.",
    pitfall: "Farkın alt sınırı için iki alt ucu kullanırsan 1−2=−1 çıkar. a=3/2 ve b=4 ise fark −5/2 olduğundan bu sınırı aşar.",
  },
  {
    code: "E36",
    title: "Dört köşe çarpımından sınırları seç",
    prompt: "Bağımsız −2≤a≤3 ve 1≤b≤4 için ab’nin tam aralığını bul.",
    strategy: "a’nın işareti değişebildiği için bütün köşe çarpımlarını karşılaştır.",
    steps: [
      { label: "Negatif uç", expression: "(−2)·1=−2, (−2)·4=−8", explanation: "Pozitif b büyüdükçe negatif çarpım küçülür." },
      { label: "Pozitif uç", expression: "3·1=3, 3·4=12", explanation: "Pozitif b büyüdükçe pozitif çarpım büyür." },
      { label: "Aradaki değerler", explanation: "b=4 sabitken a, −2 ile 3 arasındaki bütün değerleri alabildiği için çarpım −8 ile 12 arasındaki her değeri alır." },
    ],
    answer: "ab∈[−8,12].",
    check: "a=−2,b=4 alt ucu; a=3,b=4 üst ucu; a=0 ve izinli herhangi bir b sıfırı verir.",
    pitfall: "Yalnız alt-alt ve üst-üst çarpılırsa −8 yerine −2 yazılır.",
  },
  {
    code: "E37",
    title: "Sıfırdan geçen aralığın tersini bul",
    prompt: "−2≤b≤3 ve b≠0 iken 1/b hangi değerleri alır?",
    strategy: "b’nin negatif ve pozitif parçalarını ayrı ters çevir.",
    steps: [
      { label: "Negatif parça", expression: "−2≤b<0 → 1/b≤−1/2", explanation: "b sıfıra negatif taraftan yaklaştığında 1/b sınırsız küçülür." },
      { label: "Pozitif parça", expression: "0<b≤3 → 1/b≥1/3", explanation: "b sıfıra pozitif taraftan yaklaştığında 1/b sınırsız büyür." },
      { label: "Birleştir", explanation: "Payda bu iki parçadan birinde olabilir. İkisinin birleşimini al." },
    ],
    answer: "1/b∈(−∞,−1/2]∪[1/3,∞).",
    check: "b=−2 ve b=3 sonlu uçları verir. 0, 1/b olamaz. b=1/4 sonucu 4 yapar, yani sağ parça 1/3’ten yukarı uzanır.",
    pitfall: "Sıfırın üzerinden tek bir yönle ters çevirirsen iki parça arasındaki yasak bölgeyi yanlışlıkla eklersin.",
  },
  {
    code: "E38",
    title: "a²’de aynı a’yı iki kez kullan",
    prompt: "−2<a<3 için a²’nin tam değer aralığını bul.",
    strategy: "Kareyi, a’nın sıfırdan uzaklığının karesi olarak düşün. a=0’ın izinli olup olmadığını denetle.",
    steps: [
      { label: "En küçük değer", expression: "a=0 → a²=0", explanation: "Sıfır aralığın içindedir ve kare negatif olamaz." },
      { label: "Üst sınır", expression: "|a|<3 → a²<9", explanation: "a=3’e soldan yaklaşılır fakat aralıktaki bir değer 9 karesini vermez." },
      { label: "Aradaki değerler", explanation: "İstenen herhangi bir 0≤k<9 değeri için a=√k seçilebilir. Bu a izinli ve a²=k’dır." },
    ],
    answer: "0≤a²<9.",
    check: "a=1 için kare 1, a=5/2 için 25/4. İkisi de aralıkta.",
    pitfall: "Eksi ve artı uçları çarpıp negatif kare üretme. İki çarpan aynı a’dır.",
  },
  {
    code: "E39",
    title: "Açık bir çarpan aralığında 0 alınabilir",
    prompt: "Bağımsız 0≤a<2 ve 1<b<3 için ab’nin tam aralığını bul.",
    strategy: "Sınırlar için dört köşeyi düşün, uç kabulünü gerçek bir çiftle denetle.",
    steps: [
      { label: "En küçük değer", expression: "a=0,b=2 → ab=0", explanation: "b’nin uçlarının açık olması 0’ı engellemez." },
      { label: "Üst sınır", expression: "ab<2·3=6", explanation: "İzinli iki pozitif değer ilgili üst sınırlarının altında. İkisi de üst sınırına yaklaşabilir." },
    ],
    answer: "ab∈[0,6).",
    check: "a=19/10 ve b=29/10 için 551/100, 6’ya 5’ten daha yakındır. İki değişken üst uçlarına daha da yaklaştırılabilir.",
    pitfall: "Minimum köşelerindeki b uçları açık diye 0’ı açık yazma. a=0 doğrusu boyunca içteki b değerleri de 0 verir.",
  },
  {
    code: "E40",
    title: "x≥1, y≥0 ve x+y≤4 koşullarını çiz",
    prompt: "Ortak bölgeyi, köşeleri ve x+y<4 değişikliğinin etkisini belirle.",
    strategy: "Önce üç sınırı çiz. Her birinin kabul edilen tarafını bir deneme noktasıyla belirle, sonra ortak bölgeyi al.",
    steps: [
      { label: "İki eksene paralel sınır", expression: "x=1, y=0", explanation: "x=1’in sağı ve y=0’ın üstü seçilir. İki sınır dahil." },
      { label: "Eğik sınır", expression: "x+y=4", explanation: "Doğru, (0,4) ve (4,0)’dan geçer. (0,0) bu eşitsizliği sağladığı için onun bulunduğu taraf seçilir. (0,0) bütün sistemi sağlamaz." },
      { label: "Köşeleri bul", expression: "(1,0), (4,0), (1,3)", explanation: "Bu üç nokta iki sınırın kesişimidir ve üç ilk koşulun hepsini sağlar." },
      { label: "İşareti değiştir", expression: "x+y<4", explanation: "Eğik kenar kesikli olur. Eğik kenardaki (4,0) ve (1,3) çıkarken (1,0) kalır." },
    ],
    answer: "İlk sistemde üçgenin içi ve bütün kenarları dahildir. < değişikliğinde yalnız x+y=4 üzerindeki bölüm hariçtir.",
    check: "(2,1) iki durumda da içeride. (2,2) ilkinde dahil, ikinci durumda dışarıda. (0,2) x≥1’i sağlamadığından iki durumda da dışarıda.",
    pitfall: "(0,0)’ın bir tek koşulu sağlamasını sistemin tamamının çözümüyle karıştırma.",
  },
  {
    code: "E41",
    title: "Tam sayı çiftlerini ilk koordinata göre say",
    prompt: "x≥0, y≥0 ve 2x+y≤6 koşullarını sağlayan kaç tam sayı (x,y) ikilisi vardır?",
    strategy: "Önce x için bir üst sınır bul. Her tam sayı x için y=0’dan başlayarak izinli değerleri say.",
    steps: [
      { label: "x sınırı", expression: "2x≤6 → x∈{0,1,2,3}", explanation: "y≥0 olduğu için 2x, 2x+y’den büyük olamaz." },
      { label: "Sütunları say", expression: "y=0,…,6−2x", explanation: "x=0 için 7, x=1 için 5, x=2 için 3, x=3 için 1 değer vardır. Sıfır da sayılır." },
      { label: "Topla", expression: "7+5+3+1=16", explanation: "Her sıralı ikili yalnız kendi x sütununda sayılır." },
    ],
    answer: "16 tam sayı sıralı ikilisi. Bütün sınırlar dahil.",
    check: "(3,0) eğik sınırda ve içeride. (3,1) için 2x+y=7, dışarıda. Gerçek sayı kısıtında (0,0) ile (0,6) arasındaki tüm y değerleri bile sonsuz çözüm verir.",
    pitfall: "y’nin en büyük değerini o sütundaki sayı sanma. y=0 da dahil olduğu için 6−2x+1 çift vardır.",
  },
  {
    code: "E42",
    title: "Fark ile bölümün kapalı üst sınırını doğrula",
    prompt: "Bağımsız 3<a≤5 ve 1≤b<2 için a−b ve a/b’nin tam aralıklarını bul.",
    strategy: "Fark için −b, bölüm için pozitif 1/b aralığını yaz. Sonlu uçları veren çiftleri denetle.",
    steps: [
      { label: "Farkı topla", expression: "−2<−b≤−1 → 1<a−b≤4", explanation: "Alt sınır için a 3’e, b 2’ye yaklaşır. Her iki değerin de o ucu açıktır." },
      { label: "Tersiyle çarp", expression: "1/2<1/b≤1 → 3/2<a/b≤5", explanation: "Pozitif pay ve ters payda için alt sınırlar çarpılır, üst sınırlar çarpılır." },
      { label: "Alınabilen uçlar", expression: "(a,b)=(5,1)", explanation: "Bu çift izinli. Farkı 4, bölümü 5 yapar." },
    ],
    answer: "1<a−b≤4 ve 3/2<a/b≤5.",
    check: "a=31/10,b=19/10 için fark 6/5, bölüm 31/19. a 3’e ve b 2’ye yaklaşınca değerler sırasıyla 1 ve 3/2’ye yaklaşır.",
    pitfall: "Paydanın üst ucunu bölümün üst ucuyla eşleştirme. Pozitif payda küçüldükçe pozitif bölüm büyür.",
  },
  {
    code: "E43",
    title: "Hızın işaretine göre izinli süreyi bul",
    prompt: "Bir nicelik başlangıçta 10 birim. Sabit r hızıyla değişen miktarın 14’ün altında kaldığı t≥0 sürelerini r’ye göre yaz.",
    strategy: "10+rt<14 koşulundan rt<4’e geç. r’nin işaretini ve t’nin bağlam aralığını birlikte kullan.",
    steps: [
      { label: "Pozitif hız", expression: "r>0 → 0≤t<4/r", explanation: "Bölme yönü korur. t=4/r anında değer 14 olur ve sıkı koşul bozulur." },
      { label: "Sıfır hız", expression: "r=0 → 10<14", explanation: "Miktar sabit olduğu için bütün t≥0 uygundur." },
      { label: "Negatif hız", expression: "r<0 ve t≥0 → rt≤0", explanation: "Miktar 10’u aşmaz. Böylece bütün t≥0 uygundur." },
    ],
    answer: "r>0 için [0,4/r); r≤0 için [0,∞).",
    check: "r=2 iken t=2 dışarıda. r=−2 iken t=2 için miktar 6 ve uygun.",
    pitfall: "r<0 iken t>4/r yazıp bırakma. 4/r negatiftir, fakat aranan süreler t≥0’dır.",
  },
  {
    code: "E44",
    title: "En küçük kap sayısını ilk koşulda doğrula",
    prompt: "Depoda 20 L su var. Her tam kap 3 L ekliyorsa en az 31 L için kaç tam kap gerekir?",
    strategy: "n’nin negatif olmayan tam sayı olduğunu yaz. Bulunan alt sınırın üstündeki ilk uygun tam sayıyı seç.",
    steps: [
      { label: "Model", expression: "20+3n≥31", explanation: "«En az» 31 L’ye eşitliği de kabul eder." },
      { label: "Çöz", expression: "n≥11/3", explanation: "Her iki taraftan 20 çıkar ve pozitif 3’e böl." },
      { label: "İzinli ilk tam sayı", expression: "n=4", explanation: "3<11/3≤4. 3 kap sınırı tutturamaz." },
    ],
    answer: "En az 4 tam kap.",
    check: "3 kapla 29 L, 4 kapla 32 L elde edilir.",
    pitfall: "Adet seçimini olağan yuvarlamaya bağlama. Alt sınır isteniyorsa eşitsizliği sağlayan ilk tam sayı seçilir.",
  },
];

const recall = [
  { prompt: "a−b’nin alt sınırı için a ve b hangi uçlara yaklaşır?", answer: "a alt ucuna, b üst ucuna yaklaşır. Eşdeğer olarak −b’nin alt ucunu a’nın alt ucuyla topla." },
  { prompt: "Bağımsız −2≤a≤3 ve 1≤b≤4 için çarpımda hangi iki köşe belirleyicidir?", answer: "Alt uç (a,b)=(−2,4) ile −8; üst uç (3,4) ile 12. İkisi de izinli." },
  { prompt: "Payda aralığı sıfırı içeriyorsa 1/b’yi nasıl bulursun?", answer: "b=0 tanımsızdır. Negatif ve pozitif dalları ayrı ters çevirip çıkan kümeleri birleştir." },
  { prompt: "−2<a<3 iken a² neden 0 alabilir ve 9 alamaz?", answer: "a=0 izinlidir. 9 için a=3 veya a=−3 gerekir. İkisi de izinli değildir." },
  { prompt: "a=b ek koşulu fark aralığına ne yapar?", answer: "İzinli ortak a ve b değerleri varsa fark her zaman 0’dır. a ile b’nin uçlarını bağımsız seçemezsin." },
  { prompt: "Bir sınır noktasını boyanacak yarı düzlemi bulmak için kullanabilir misin?", answer: "Hayır. Sınır hangi tarafın kabul edildiğini ayırt etmez. Üzerinde olmayan bir nokta seç." },
  { prompt: "x≥1, y≥0 ve x+y<4 için hangi köşeler dışarı çıkar?", answer: "(4,0) ve (1,3) çıkar çünkü x+y=4. (1,0) üç koşulu da sağladığından kalır." },
  { prompt: "x≥0, y≥0, 2x+y≤6 için x=2’de kaç tam sayı y vardır?", answer: "0≤y≤2 olduğundan 0, 1, 2 olmak üzere 3 değer. x=2 sütununda üç sıralı ikili vardır." },
];

const items: Source011Item[] = [
  {
    code: "Q46",
    prompt: "x≥0, y≥0 ve 2x+y≤6 sistemini sağlayan kaç tam sayı (x,y) sıralı ikilisi vardır ve sınırlar dahil midir?",
    options: ["16 ikili, üç sınır da dahil.", "12 ikili, üç sınır da dahil.", "15 ikili, üç sınır da dahil.", "16 ikili, eğik sınır hariç.", "Sonsuz ikili, üç sınır da dahil."],
    knowledge: ["Çözüm bir sıralı ikilidir ve bütün koşulları aynı anda sağlamalıdır.", "y=0’dan başlayarak y=k’ye kadar k+1 tam sayı vardır."],
    strategy: "y≥0 ile x’in en büyük değerini bul. Her x için y’leri 0’dan başlayarak say.",
    steps: ["2x≤6 ve x≥0: x=0, 1, 2, 3.", "y üst sınırları sırasıyla 6, 4, 2, 0. Sütun başına 7, 5, 3, 1 değer.", "Toplam 16. Üç eşitsizlik de eşitliği kabul eder."],
    optionReasons: [
      "7+5+3+1=16 ve eşitliğe izin veren üç çizgi de bölgedeki parçalarıyla dahildir.",
      "6+4+2+0, her sütundaki y=0 noktasını atlar.",
      "x=3 için izinli (3,0) ikilisi varsa yalnız ilk üç sütunun toplamı olan 15’te durulamaz.",
      "(3,0) ve (2,2) eğik sınırda 2x+y=6’yı sağlar. Bu koşul sınırı kabul eder.",
      "Gerçek sayı ikilileri sonsuzdur. Burada her koordinat bir tam sayı ve iki koordinat da üstten sınırlı.",
    ],
    commonError: "Sıfırı geçerli tam sayı olarak saymayı veya x=3 sütununu eklemeyi unutmak.",
    check: "(3,0) dahil, (3,1) hariç. x=4, y≥0 iken mümkün değildir.",
  },
  {
    code: "Q47",
    prompt: "a ve b bağımsız, 3<a≤5 ve 1≤b<2. a−b ve a/b hangi tam değer aralıklarını alır?",
    options: ["a−b∈(1,4], a/b∈(3/2,5]", "a−b∈[1,4], a/b∈[3/2,5]", "a−b∈(1,4), a/b∈(3/2,5)", "a−b∈(2,3], a/b∈(5/2,3]", "a−b∈(1,4], a/b∈(3/2,5/2]"],
    knowledge: ["Çıkarma, ikinci aralığı −1 ile çarpıp toplamak demektir.", "Pozitif payda için 1/b aralığının yönü b’nin yönüne terstir."],
    strategy: "Alt ve üst sınırlar için farklı payda uçlarını kullan. Üst değerleri alan bir çift bul.",
    steps: ["1≤b<2 → −2<−b≤−1 → 1<a−b≤4.", "1≤b<2 → 1/2<1/b≤1 → 3/2<a/b≤5.", "(a,b)=(5,1) iki girdi aralığına da uyar ve 4 ile 5’i verir. Alt sınırlarda a=3 ve b=2 gerekirdi ve bunlar hariç."],
    optionReasons: [
      "İzinli (5,1) üst uçları verir. Alt uçlarda iki girdi de dışarıda olduğu için alt sınırlar açık.",
      "a>3 ve b<2 olduğundan a−b>1 ve a/b>3/2. Alt uçlarda eşitliğe ulaşılamaz.",
      "(5,1) izinlidir ve 4 ile 5 gerçekten alınır. Üst uçları açık bırakmazsın.",
      "Aynı yöndeki uçları eşleştirmek fark ve bölümde doğru sınırları vermez. (5,1) bu seçenekteki üst sınırların ikisini de aşar.",
      "a=5 ve b=1, a/b=5 verir. 5/2 üst değer olamaz.",
    ],
    commonError: "Pay ve paydayı aynı yöndeki uçlardan seçmek veya alınabilen 5’i dışarıda bırakmak.",
    check: "a=5,b=1 için fark 4 ve bölüm 5. a 3’e yukarıdan, b 2’ye aşağıdan yaklaşınca sonuçlar alt sınırlara yaklaşır.",
  },
  {
    code: "Q48",
    prompt: "a ve b bağımsız. −2≤a<3 ve 1≤b≤4 için ab’nin tam aralığı hangisidir?",
    options: ["[−8,12)", "(−8,12)", "[−2,12)", "[−8,12]", "[−8,3)"],
    knowledge: ["Karışık işaretli aralıkta dört köşe çarpımı alt ve üst sınırları belirler.", "Uç değerin alınması için izinli bir a,b çifti gerekir."],
    strategy: "Dört köşeyi karşılaştır; a’nın iki sınırının farklı uç kabulüne dikkat et.",
    steps: ["Köşe çarpımları −2, −8, 3, 12.", "(−2,4) izinli, dolayısıyla −8 alınır. a<3 olduğundan 12 alınamaz.", "b=4 sabitken −2≤a<3 boyunca 4a bütün [−8,12) aralığını tarar."],
    optionReasons: [
      "−8 izinli bir çiftle alınır. 12 için gereken a=3 dışarıda olduğundan üst uç açıktır.",
      "a=−2,b=4 izinlidir ve ab=−8. Bu ucu açık bırakamazsın.",
      "a=−2,b=4 ürünü −8 olur. Aralığın −2’den küçük değerleri de vardır.",
      "a pozitifse a<3 ve b≤4 birlikte ab<12 verir. a≤0 iken ab zaten pozitif 12 olamaz.",
      "a=2,b=4 izinlidir ve ab=8. Üst sınır 3’ün ötesine uzanır.",
    ],
    commonError: "İki aralığı alt-alt ve üst-üst çarpmak veya a’nın açık sağ ucunu kapalı sanmak.",
    check: "(−2,4) alt ucu tam verir. (29/10,4) ürünü 58/5 ile 12’nin hemen altındadır.",
  },
  {
    code: "Q49",
    prompt: "−2≤b≤3 ve b≠0 için 6/b’nin alabileceği bütün değerler hangileridir?",
    options: ["(−∞,−3]∪[2,∞)", "[−3,2]", "(−∞,−3)∪(2,∞)", "[2,∞)", "ℝ"],
    knowledge: ["Sıfıra bölme tanımsızdır. Bölüm, paydanın negatif ve pozitif parçalarında ayrı ele alınır."],
    strategy: "Her işaret dalında sonlu ucu 6/b ile denetle. Payda sıfıra yaklaşırken değerin hangi yönde gittiğini düşün.",
    steps: ["−2≤b<0 → 6/b≤−3.", "0<b≤3 → 6/b≥2.", "İki aralığı birleştir. b=−2 ve b=3 sonlu uçları verir."],
    optionReasons: [
      "b=−2’de −3, b=3’te 2 alınır. Sıfıra yakın paydalar iki dış yönde sınırsız değer üretir.",
      "b=1 için 6 ve b=−1 için −6 elde edilir. İkisi de bu aralığın dışında.",
      "−3 ve 2 sırasıyla izinli b=−2 ve b=3 ile alınır. Bu uçlar kapalıdır.",
      "b=−1 için −6 elde edilir. Negatif dalı çıkarmak izinli değer kaybettirir.",
      "6/b hiçbir zaman 0 olamaz. Ayrıca −3 ile 2 arasındaki değerleri de almaz.",
    ],
    commonError: "Sıfırı aşan payda aralığının uçlarını doğrudan ters çevirip aradaki değerleri çözüm sanmak.",
    check: "b=−1/2 ile −12, b=1/2 ile 12 elde edilir. 6/b=1 için b=6 gerekirdi; b=6 izinli değildir.",
  },
  {
    code: "Q50",
    prompt: "−2<a<3, −2<b<3 ve a=b ise a−b ve ab’nin tam değer kümeleri hangileridir?",
    options: ["a−b∈{0}, ab∈[0,9)", "a−b∈(−5,5), ab∈(−6,9)", "a−b∈{0}, ab∈(4,9)", "a−b∈{0}, ab∈(−6,9)", "a−b∈{0}, ab∈[0,9]"],
    knowledge: ["a=b koşulu değerleri birbirine bağlar. ab artık a²’dir.", "Bir gerçek sayının karesi negatif olamaz."],
    strategy: "Her iki ifadede b yerine a yaz. a=0 ve a’nın 3’e yaklaşması durumlarını ayrı düşün.",
    steps: ["a−a=0, her izinli a için.", "a²≥0 ve a=0 izinli olduğundan alt sınır alınır.", "−2<a<3 → |a|<3; a²<9. 0≤k<9 için a=√k ile her k alınabilir."],
    optionReasons: [
      "Fark her zaman 0, çarpım [0,9) aralığındaki karedir.",
      "a ve b bağımsız seçilemez. Fark 1 veya çarpım −1 olamaz.",
      "a=b=0 izinlidir ve çarpım 0’dır. Alt sınır 4 değildir.",
      "a=b iken ab=a² olduğundan negatif değer çıkamaz.",
      "9 için a=3 veya a=−3 gerekir. İkisi de aralığın dışında.",
    ],
    commonError: "Her iki değişken aynı değeri almasına rağmen farklı uçlardan bağımsız seçim yapmak.",
    check: "a=b=2 için fark 0, çarpım 4. a=b=29/10 için çarpım 841/100 ile 9’a yaklaşır.",
  },
  {
    code: "Q51",
    prompt: "Bağımsız 0≤a<4 ve 2<b<5 için ab’nin tam değer aralığı hangisidir?",
    options: ["[0,20)", "(0,20)", "[0,20]", "[0,8)", "(8,20)"],
    knowledge: ["Sonlu uç adayının alınması eşitliği sağlayan izinli bir çift olup olmamasına bağlıdır.", "Çarpanlardan biri 0 ise diğer çarpan sonucu değiştirmez."],
    strategy: "0 için izinli bir örnek ara. Pozitif en büyük sonucun hangi iki sınıra ihtiyaç duyduğunu belirle.",
    steps: ["a=0,b=3 seçildiğinde ab=0. 0 dışarıda bırakılamaz.", "Pozitif a<4,b<5 için ab<20. Her iki girdi üst ucuna yaklaşabildiğinden sınır 20.", "Seçilen herhangi bir 0<k<20 için 2<b<5 ve b>k/4 olacak bir b seçilebilir. a=k/b ile k elde edilir."],
    optionReasons: [
      "a=0 ile alt uç alınır. Her iki pozitif üst uç dışarıda olduğu için çarpım 20’ye yalnız yaklaşır.",
      "a=0, b=3 verirken çarpım 0. 0’ı dahil etmelisin.",
      "a<4 ve b<5 koşullarında a·b=20 mümkün değildir.",
      "a=3,b=4 ile ab=12 elde edilir. 8 bir üst sınır olamaz.",
      "a=0,b=3 için ab=0; a=1,b=3 için ab=3. İkisi de izinli.",
    ],
    commonError: "b’nin her iki ucu açık diye çarpımın iki ucunu da açık yazmak.",
    check: "a=39/10,b=49/10 için çarpım 1911/100; 20’ye yaklaşır. 0 örneğinde b herhangi bir izinli değerdir.",
  },
  {
    code: "Q52",
    prompt: "x≥1, y≥0 ve x+y<4 için (1,0), (1,3), (4,0), (2,2) ve (2,1) noktalarından hangileri ortak bölgeye dahildir?",
    options: ["(1,0) ve (2,1)", "(1,0), (1,3), (4,0) ve (2,1)", "Yalnız (2,1)", "(1,3) ve (4,0)", "(1,0), (2,2) ve (2,1)"],
    knowledge: ["≤ ve ≥, sınırı eşitlikle sağlar. < ve >, kendi sınırını dışarıda bırakır.", "Noktanın ortak bölgede olması için üç koşulu da sağlaması gerekir."],
    strategy: "Her noktanın x+y toplamına bak. Kalanlar için x≥1 ve y≥0 koşullarını kontrol et.",
    steps: ["(1,3), (4,0) ve (2,2) için x+y=4 olduğundan üçü de dışarıda.", "(1,0) ve (2,1) sırasıyla 1 ve 3 toplamını verir. İkisi de x≥1 ve y≥0 koşullarını sağlar."],
    optionReasons: [
      "İki nokta da bütün koşulları sağlar. (1,0), kapalı x ve y sınırlarına oturur.",
      "(1,3) ve (4,0) eğik sınırdadır. Sıkı x+y<4 bunları dışarıda bırakır.",
      "(1,0) her iki kapalı eksen sınırında ve x+y=1<4. O da izinli.",
      "İki noktanın da toplamı 4. Sıkı eşitsizlikte ikisi de dışarıda.",
      "(2,2) toplamı tam 4 verir ve üçüncü koşulu sağlamaz.",
    ],
    commonError: "Her köşeden geçen sınırların hepsini kontrol etmemek veya bir sınır açılınca diğer ikisini de açık sanmak.",
    check: "(1,0) üç ilk eşitsizlikte doğru. (4,0) için ilk ikisi doğru, 4<4 yanlış.",
  },
  {
    code: "Q53",
    prompt: "2≤5−x<7 koşulunu sağlayan gerçek x değerleri hangi aralıktadır?",
    options: ["(−2,3]", "[−2,3)", "(−2,3)", "(−3,2]", "[3,∞)"],
    knowledge: ["Negatif sayıya bölme iki ilişkiyi de ters çevirir.", "Uç eşitliğini ilk koşulda sınamak, açık ve kapalı yerini doğrular."],
    strategy: "Üç taraftan 5 çıkar. −1’e böldükten sonra sınırları küçükten büyüğe sırala.",
    steps: ["−3≤−x<2.", "−1’e bölünce 3≥x>−2.", "−2<x≤3, yani (−2,3]."],
    optionReasons: [
      "x=−2 ilk ifadenin üst sınırını ve x=3 alt sınırını verir. Bu nedenle sol açık, sağ kapalı.",
      "−2 için 5−(−2)=7 dışarıda, 3 için 5−3=2 içeride. Burada uçların kabulü ters yazılmış.",
      "x=3 için 2≤2<7 doğrudur. Sağ uç da alınır.",
      "x=−5/2 için 5−x=15/2>7. Bu seçenek geçersiz bir sayı ekler.",
      "x=0 ilk eşitsizliği sağlar ama bu aralıkta yoktur. x=4 ise ilk koşulu sağlamaz.",
    ],
    commonError: "−1 ile bölmede ikinci işareti çevirmemek veya uçları yeniden sıralarken açık ve kapalı durumları yer değiştirmeden bırakmak.",
    check: "x=−2 için 2≤7<7 yanlış. x=3 için 2≤2<7 doğru.",
  },
  {
    code: "Q54",
    prompt: "Bir atölye 45 TL sabit ücret ve parça başına 14 TL alıyor. Toplam 115 TL’den az kalacaksa en çok kaç parça işlenebilir?",
    options: ["4 parça", "5 parça", "3 parça", "6 parça", "0 parça"],
    knowledge: ["«115 TL’den az» sıkı sınırdır. Parça adedi negatif olmayan tam sayıdır."],
    strategy: "Önce gerçek sayı sınırını bul. Sınırdaki adetle hemen önceki adedi başlangıçtaki maliyette dene.",
    steps: ["45+14n<115.", "14n<70 → n<5.", "İzinli en büyük tam sayı 4."],
    optionReasons: [
      "4 parça 101 TL, sonraki 5 parça 115 TL. Yalnız 4 bu ikisi arasında koşula uyar.",
      "5 parça 115 TL ile sınırda. Soruda sıkı «daha az» şartı var.",
      "3 parça uygundur, ancak 4 parça da 101 TL ile uygundur.",
      "6 parça 129 TL tutar ve 115 TL’den az değildir.",
      "Başlangıç ücreti ödense de 1 ve daha çok parça için bütçe yeterli. 4 parça hâlâ uygundur.",
    ],
    commonError: "«Daha az» ifadesini «en çok» gibi yorumlayıp 5’i dahil etmek.",
    check: "45+14·4=101<115, 45+14·5=115.",
  },
  {
    code: "Q55",
    prompt: "Bir ölçüm 12 birimde başlıyor ve sabit r hızıyla değişiyor. 12+rt<18 koşulunu sağlayan t≥0 süreleri hangileridir?",
    options: ["r>0 iken [0,6/r); r≤0 iken [0,∞).", "Her r≠0 için [0,6/r); r=0 için boş küme.", "r>0 iken [0,6/r]; r≤0 iken [0,∞).", "r>0 iken (6/r,∞); r≤0 iken [0,∞).", "r>0 iken [0,6/r); r≤0 iken boş küme."],
    knowledge: ["Parametrenin işareti, bölme yönünü ve sıfır dalındaki işlemi değiştirir.", "Sürenin izinli alanı t≥0 ile cebirsel çözümü kesiştir."],
    strategy: "rt<6’ya ulaş. r≤0 iken t≥0 bilgisini doğrudan çarpıma uygula.",
    steps: ["r>0 ise t<6/r: t≥0 ile [0,6/r).", "r=0 iken 0<6 her t≥0 için doğrudur.", "r<0 ve t≥0 iken rt≤0<6. Her t≥0 uygun."],
    optionReasons: [
      "Pozitif r için bitiş sınırı açıktır. Pozitif olmayan r ve t≥0 için miktar 12’yi aşmaz.",
      "r<0 iken yanlış yönde bölünmüş. r=0 için 12<18 zaten sağlanır.",
      "r>0 iken t=6/r, 12+rt=18 yapar ve sıkı koşulu sağlamaz.",
      "r>0 ve t>6/r iken 12+rt>18. Doğru yön t<6/r.",
      "r≤0, t=0 iken 12<18 doğrudur. Hatta bu hızlarda her t≥0 uygundur.",
    ],
    commonError: "r’nin bütün işaretlerinde aynı yönde bölmek veya r=0’ı tanımsız sayıp çözümden atmak.",
    check: "r=3, t=2 için ölçüm 18, hariç. r=−3, t=2 için ölçüm 6, dahil.",
  },
];

const sheet: CheatSection[] = [
  {
    title: "Aralık hesabı: işareti ve uçları seç",
    text: [
      "Bağımsız değişkenlerle a+b için alt-alt ve üst-üst. a−b için alt-üst ve üst-alt. Farkta −b’nin sınırlarını yönleriyle yeniden yaz.",
      "Pozitif çarpanlarda çarpım her iki girdiyle artar. İşaretler değişiyorsa sonlu aralıkların dört köşe çarpımını karşılaştır. Her uç için sonucu veren izinli bir çift ara. 0≤a<2 ve 1<b<3 için a=0, b=2 alt ucu verir: 0≤ab<6.",
    ],
    table: {
      headers: ["Bağımsız 1<a<3, 2≤b≤4", "Tam aralık"],
      rows: [["a+b", "(3,7)"], ["a−b", "(−3,1)"], ["ab", "(2,12)"], ["a/b", "(1/4,3/2)"]],
    },
  },
  {
    title: "Ters alma ve bölme: önce sıfırı ayır",
    text: [
      "Payda 0 olamaz. 1/b, sıfırın her bir tarafında b büyüdükçe küçülür. Negatif ve pozitif dalları ayrı ters çevir, sonra birleştir. Örnek: −2≤b≤3, b≠0 → 1/b∈(−∞,−1/2]∪[1/3,∞).",
      "a/b=a·(1/b). Bağımsız 3<a≤5 ve 1≤b<2 için 3/2<a/b≤5. (5,1) ile 5 alınır. Aynı çift a−b=4 verir ve fark 1<a−b≤4 aralığındadır.",
    ],
  },
  {
    title: "Bağlı değişkenler ve sıfır katsayı",
    text: [
      "a=b iken a−b=0, ab=a². −2<a<3 için 0≤a²<9. Sıfır içeride, 9’u verecek ±3 dışarıda.",
      "ax<b eşitsizliğinde a=0 ise 0<b doğru olduğunda bütün gerçekler, yanlış olduğunda boş küme. Diğer dallarda bölme yönünü a’nın işareti belirler.",
    ],
  },
  {
    title: "Düzlemde eşitsizlik sistemi",
    text: [
      "ax+by=c sınırını çiz, a ve b birlikte 0 olmasın. < ve > kesikli, ≤ ve ≥ kesiksiz. Sınır üzerinde olmayan bir deneme noktası seç. Her koşulun kabul ettiği tarafı bul, sonra ortak bölgeyi al.",
      source011Figure.summary,
      source011Figure.strictSummary,
    ],
  },
  {
    title: "Düzlemde tam sayı ikilileri",
    text: [
      "x≥0, y≥0, 2x+y≤6 için x∈{0,1,2,3}. Her x için 0≤y≤6−2x ve y tam sayı. Sırasıyla 7, 5, 3, 1 değer, toplam 16 sıralı ikili.",
      "Başlangıç 0 dahilse üst sınır 6 için 7 değer vardır. Bu örnekte üç sınır kapalıdır. Gerçek sayı ikilileri, tam sayılarla sınırlanmadığında sonsuzdur.",
    ],
  },
];

const sheetExamples: CheatExample[] = [
  {
    title: "Açık ve kapalı uçla fark ve bölüm",
    prompt: "Bağımsız 3<a≤5 ve 1≤b<2.",
    steps: ["Farkta −2<−b≤−1 yaz ve a ile topla.", "Bölümde 1/2<1/b≤1 yaz ve pozitif a ile çarp.", "a=5,b=1 izinli. Alt sınırların iki girdisi de uca ancak yaklaşır."],
    answer: "a−b∈(1,4], a/b∈(3/2,5].",
  },
  {
    title: "Sınırdaki noktayı denetle",
    prompt: "x≥1, y≥0; eğik kenarda (4,0) ve (1,3) noktaları var. x+y≤4, x+y<4 olursa ne değişir?",
    steps: ["İki nokta için de x+y=4.", "< işareti ikisini ve bütün eğik kenarı dışarıda bırakır.", "(1,0) ve (2,1) üç ilk koşulu da sağlamaya devam eder."],
    answer: "Eğik kenar hariç. Diğer iki kenar, eğik kenarla birleştiği noktaya kadar dahil.",
  },
];

export const source011Revision = {
  source: "Aurelia 011 · TYT Matematik · Basit Eşitsizlikler, Format V5, içerik 1.1 (19.11.2026). Güncel 15 sayfanın metni ve sayfa görüntüleri önceki 9 sayfayla karşılaştırıldı. Aralık işlemleri, düzlemde doğrusal eşitsizlik, yöntem örnekleri ve karışık prova özgün öğretim uyarlamasıdır. Düzlemde sınır çizgileri ve ortak bölge için MEB OGM Matematik 9, Ünite 3, basılı s. 134–135, HTML s. 56–57. 2024 TYT Temel Matematik 8 için doğrulanmış kitapçık ve cevap anahtarı atfı korunur. Arşiv kapsamı: PARTIAL.",
  objectives: [
    "Bağımsız aralıklarda dört işlemi işaret, sıfır ve uç kabulüne göre yap. Bağlı değişkende aralığı ilk ilişkiye göre kur.",
    "Doğrusal eşitsizliklerin yarı düzlemlerini kesiştir. Sınırları, köşeleri ve tam sayı sıralı ikililerini ilk koşullarda denetle.",
  ],
  sections,
  examples,
  recall,
  items,
  sheet,
  sheetExamples,
  sheetRecall: [recall[0], recall[2], recall[6], recall[7]],
  sheetCautions: [
    "Farkın alt sınırı için küçük a ile büyük b’yi eşleştir. a ve b pozitifse a/b’nin alt sınırında da aynı eşleme geçerlidir.",
    "Payda 0’ı içeriyorsa 0’ı ayır ve her işaret dalını ayrı çöz. Bağlı iki girdiyi bağımsız seçme.",
    "Bir noktanın boyalı bölgede olması için bütün koşulları sağlaması gerekir. Sınır dahilini çizgi türü ve eşitlik denetimiyle göster.",
  ],
};
