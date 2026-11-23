import { questionIdentity, type HelpQuestion } from "./questionHelpModel";
import type { Question } from "./model";
import { signedWorkHintCopy, signedWorkQuestionId } from "../learning/signedWork055";

// Presentation revisions add the missing conditions without rewriting any
// accepted question, saved paper, answer, timestamp or learning record.
// A revision applies only to the complete, known original question identity.
type QuestionPresentationRevision = {
  id: string;
  revision: number;
  before: HelpQuestion;
  prompt?: string;
  options?: string[];
  hint?: string;
  explanation?: string;
};
export const questionPresentationRevisions: QuestionPresentationRevision[] = [
  {
    id: signedWorkQuestionId,
    revision: 2,
    before: {
      id: signedWorkQuestionId,
      prompt: "Cisim 5 m boyunca+x yönünde gidiyor. Seçili itiş kuvveti+10 N, direnç−4 N ve yer değiştirmeye dik normal 20 N; sabitler. Başka iş yapan kuvvet yok. İtişin işi, net iş ve kinetik enerji değişimi sırasıyla nedir?",
      options: ["+50 J;+70 J;+70 J", "+50 J;+30 J;−30 J", "+50 J;+30 J;+30 J", "+30 J;+30 J;+30 J", "+50 J;+130 J;+130 J"],
      answer: 2,
      hint: "İtiş işi 10·5=+50 J; direnç işi−4·5=−20 J; normal işi 0.",
      explanation: "İtiş işi 10·5=+50 J; direnç işi−4·5=−20 J; normal işi 0. Net iş 50−20=+30 J. Kinetik enerji değişimiΔK=+30 J’dir; tek itiş işi 50 J ile karıştırılmaz.",
    },
    hint: signedWorkHintCopy,
  },
  {
    id: "ns-motion-4",
    revision: 2,
    before: {
      id: "ns-motion-4",
      prompt:
        "Bir cismin hız–zaman ilişkisinin ilk bölümündeki işaretli alan +12 m, ikinci bölümündeki işaretli alan −5 m. Başka bölüm yoktur. Toplam yer değiştirme ve alınan yol nedir?",
      options: [
        "17 m ve 7 m",
        "+7 m ve 17 m",
        "−7 m ve −17 m",
        "+12 m ve 5 m",
        "+7 m ve 7 m",
      ],
      answer: 1,
      hint: "Yer değiştirmede işaretleri koru; yol için alan büyüklüklerini topla.",
      explanation:
        "İşaretli alanların toplamı +12−5=+7 m yer değiştirmedir. Yol 12+5=17 m’dir; eksi alan negatif yol değil eksi yönde hareket katkısıdır. Sayısal alanlar soruda verildiği için ayrı bir grafik gerekmez.",
    },
    prompt:
      "Doğrusal hareket yapan bir cismin hız–zaman ilişkisinin ilk bölümü boyunca hızı sıfır veya pozitif, ikinci bölümü boyunca sıfır veya negatiftir. İlk bölümdeki işaretli alan +12 m, ikinci bölümdeki işaretli alan −5 m’dir. Başka bölüm yoktur. Toplam yer değiştirme ve alınan yol nedir?",
  },
  {
    id: "ns-energy-4",
    revision: 2,
    before: {
      id: "ns-energy-4",
      prompt:
        "Bir sistemin başlangıç enerjisi 200 J. Son durumda 60 J yerçekimi potansiyel enerjisi var ve 40 J iç enerjiye aktarılmış. Başka enerji aktarımı yoksa son kinetik enerji nedir?",
      options: ["200 J", "140 J", "100 J", "60 J", "40 J"],
      answer: 2,
      hint: "Başlangıç enerjisini son potansiyel, kinetik ve iç enerji katkılarına paylaştır.",
      explanation:
        "200=60+K+40 olduğundan K=100 J’dir. Mekanik enerjinin bir bölümünün iç enerjiye aktarılması, enerjinin yok olması demek değildir; doğru sistem sınırında bütün katkılar toplanır.",
    },
    prompt:
      "Başlangıçta mekanik enerjisi 200 J olan bir sistemde mekanik enerji yalnız kinetik enerji ile yerçekimi potansiyel enerjisinin toplamıdır. Mekanik enerjinin 40 J kadarı iç enerjiye aktarılır; mekanik enerjiyi değiştiren başka bir aktarım yoktur. Son yerçekimi potansiyel enerjisi 60 J ise son kinetik enerji nedir?",
  },
  {
    id: "snd-10",
    revision: 1,
    before: {
      id: "snd-10",
      prompt:
        "‘Yarın başlayacak.’ cümlesindeki başlayacak sözcüğü hakkında hangisi doğrudur?",
      options: [
        "Başla kökündeki a, ı’ya daralmıştır.",
        "Başla kökünün a’sı korunur; -yor önündeki daralma bu gelecek zaman biçimine genellenmez.",
        "Kök başlangıçta başlı olduğu için ses olayı yoktur.",
        "Her y harfi ünsüz türemesi olduğu için iki y yazılmalıdır.",
        "Doğru yazım başlıyacak olmalıdır.",
      ],
      answer: 1,
      hint: "Doğru ilk tabanı ve kullanılan eki birbirinden ayır.",
      explanation:
        "Başla- tabanının a’sı başlayacak biçiminde durur. Yardımcı y ek sınırındadır; başlıyor örneğindeki -yor daralması -(y)acak önüne taşınmaz. Yanlış bir başlangıç kökü veya başlıyacak yazımı kurmak kuralı hatalı genişletir.",
    },
    options: [
      "Başla kökündeki a, ı’ya daralmıştır.",
      "Başla- tabanının a’sı korunur; -yor önündeki daralma bu gelecek zaman biçimine genellenmez.",
      "Kök başlangıçta başlı olduğu için ses olayı yoktur.",
      "Her y harfi ünsüz türemesi olduğu için iki y yazılmalıdır.",
      "Doğru yazım başlıyacak olmalıdır.",
    ],
  },
  {
    id: "periodic-4",
    revision: 1,
    before: {
      id: "periodic-4",
      prompt:
        "Nötr Al atomunun temel hâl katman dağılımı 2, 8, 3. Periyodu kaçtır?",
      options: ["13", "3", "5"],
      answer: 1,
      hint: "Dolu katmanları say; toplam elektronu değil.",
      explanation:
        "Üç dolu katman olduğu için 3. periyottadır. 13 ise atom numarasıdır.",
    },
    hint: "Periyot için elektron içeren katmanları say; katmanların tam dolu olması gerekmez.",
    explanation:
      "Al’nin nötr temel hâl dağılımı 2,8,3 olduğundan elektron içeren üç katmanı vardır ve element 3. periyottadır. Periyot için katmanların tam dolu olması gerekmez; son katmanda 3 elektron bulunur. Toplam 13 elektron, nötr Al’nin atom numarasıdır; periyot numarası değildir.",
  },
  {
    id: "eq-2",
    revision: 1,
    before: {
      id: "eq-2",
      prompt: "A ⇌ B dengesi için [A]=1 mol/L ve [B]=2 mol/L. Kc kaçtır?",
      options: ["0,5", "1", "2"],
      answer: 2,
      hint: "Denklem katsayıları 1: Kc=[B]/[A].",
      explanation: "Kc=2/1=2. Bu oran denge derişimleriyle hesaplanır.",
    },
    prompt:
      "Sabit sıcaklıkta, ideal gazların A(g) ⇌ B(g) homojen dengesinde [A]=1 mol/L ve [B]=2 mol/L’dir. Derişimler cinsinden denge sabiti Kc kaçtır?",
  },
  {
    id: "eq-5",
    revision: 1,
    before: {
      id: "eq-5",
      prompt:
        "A ⇌ B için Kc=2 ve toplam denge derişimi [A]+[B]=6 mol/L. Denge karışımı hangisidir?",
      options: ["[A]=3, [B]=3", "[A]=4, [B]=2", "[A]=2, [B]=4"],
      answer: 2,
      hint: "[B]=2[A] eşitliğini toplamla birlikte kullan.",
      explanation:
        "[A]+2[A]=6 olduğundan [A]=2, [B]=4 mol/L. Hem toplam 6 hem [B]/[A]=2 sağlanır.",
    },
    prompt:
      "Sabit sıcaklıkta, ideal gazların A(g) ⇌ B(g) homojen dengesi için Kc=2 ve toplam denge derişimi [A]+[B]=6 mol/L’dir. Denge karışımı hangisidir?",
  },
  {
    id: "iyonik-bilesik-adlandirma-q2",
    revision: 1,
    before: {
      id: "iyonik-bilesik-adlandirma-q2",
      prompt:
        "Fe₂O₃’te oksidin yükü −2’dir. Her Fe aynı yükü taşıdığına göre adı hangisidir?",
      options: [
        "Demir(I) oksit",
        "Demir(II) oksit",
        "Didemir trioksit",
        "Demir(III) oksit",
        "Demir(II) sülfür",
      ],
      answer: 3,
      hint: "Üç oksidin toplam yükünü iki Fe’ye paylaştır.",
      explanation:
        "Toplam −6 anyon yükünü dengeleyen iki Fe toplam +6 taşır. Fe başına +3 olduğundan demir(III) oksit denir.",
    },
    prompt:
      "Fe₂O₃’te oksidin yükü −2’dir ve her Fe aynı yükü taşır. Stock (Roma rakamlı) iyonik adlandırmaya göre bileşiğin adı hangisidir?",
  },
  {
    id: "f013-foundation-katman-elektron-dizilimi-3",
    revision: 1,
    before: {
      id: "f013-foundation-katman-elektron-dizilimi-3",
      prompt:
        "X²⁺ iyonunun temel hâl katman dağılımı 2,8,8 olarak veriliyor. X nötr atomunun temel hâl dağılımı ve elementin periyodu hangisidir?",
      options: [
        "2,8,8; 3. periyot",
        "2,8,6; 3. periyot",
        "2,8,8,2; 4. periyot",
        "2,8,10; 3. periyot",
        "2,8,8,1; 4. periyot",
      ],
      answer: 2,
      hint: "Önce iyonun elektronlarını topla; sonra pozitif yükü ekleyip Z’yi bul.",
      explanation:
        "İyonun elektron sayısı 18, yükü +2 olduğundan Z=e+q=18+2=20 olur. Nötr Ca atomunun temel hâl dağılımı 2,8,8,2 ve periyodu 4’tür. İyonun üç dolu katmanı elementin periyodunu 3’e indirmez.",
    },
    explanation:
      "İyonun elektron sayısı 18, yükü +2 olduğundan Z=e+q=18+2=20 olur. Nötr Ca atomunun temel hâl dağılımı 2,8,8,2 ve periyodu 4’tür. İyonun elektron içeren üç katmanı, elementin periyodunu 3’e indirmez.",
  },
  {
    id: "f013-foundation-katman-elektron-dizilimi-7",
    revision: 1,
    before: {
      id: "f013-foundation-katman-elektron-dizilimi-7",
      prompt:
        "Ne nötr atomu için Z=10, Na⁺ için Z=11, Mg²⁺ için Z=12 veriliyor. Bu üç tanecik için hangi açıklama doğrudur?",
      options: [
        "Üçü aynı elementtir; çünkü elektron sayıları eşittir.",
        "Üçü de 10 elektron taşıyabilir; proton sayıları ve element kimlikleri farklıdır.",
        "Mg²⁺ oluşurken proton sayısı 10’a düşmüştür.",
        "Na⁺ oluşurken çekirdeğe bir proton eklenmiştir.",
        "Ne nötr olduğu için elektron taşımaz.",
      ],
      answer: 1,
      hint: "Her birinde e=Z−q hesapla; elektron eşitliğini proton eşitliği sayma.",
      explanation:
        "Ne için e=10; Na⁺ için e=11−1=10; Mg²⁺ için e=12−2=10 bulunur. Katman dağılımları 2,8 olan bu türler izoelektroniktir. Proton sayıları 10,11,12 olarak farklı kaldığından aynı elemente dönüşmüş sayılmazlar.",
    },
    explanation:
      "Ne için e=10; Na⁺ için e=11−1=10; Mg²⁺ için e=12−2=10 bulunur. Proton sayıları 10,11,12 olarak farklı kaldığından aynı elemente dönüşmüş sayılmazlar. Temel hâlde ele alınırlarsa üçünün de katman dağılımı 2,8 olur; bu koşulda elektron sayıları ve dizilimleri aynı olduğundan izoelektroniktirler. Kökte temel hâl verildiği varsayılmaz.",
  },
  {
    id: "f093-membrane-4",
    revision: 1,
    before: {
      id: "f093-membrane-4",
      prompt:
        "Eşit sabit hacimli iki bölmede geçen X maddesi başlangıçta dışta 8, içte 2 derişim birimindedir. Kapalı sistemde tek bir adımda dıştan içe 1 birim X aktarılıyor; üretim ve tüketim yoktur. Yeni dış/iç değerleri hangisidir?",
      options: ["8 ve3", "9 ve1", "7 ve2", "7 ve3", "6 ve6"],
      answer: 3,
      hint: "Bir bölmenin kaybı diğerinin kazancı olmalı.",
      explanation:
        "Dış 8−1=7, iç 2+1=3 olur; toplam 10 korunur.8/3 madde yaratır;9/1 ters yönde aktarımı gösterir;7/2 madde kaybettirir.6/6 toplam 12 olduğu için korunumla çelişir. Verilen eşit sabit hacim koşulu, bu sayısal güncellemeyi geçerli kılar.",
    },
    prompt:
      "Her biri 1 L sabit hacimli iki bölmede X maddesinin başlangıç derişimi dışta 8 mol/L, içte 2 mol/L’dir. Kapalı sistemde tek bir adımda dıştan içe 1 mol X aktarılıyor; üretim ve tüketim yoktur. Yeni dış/iç derişimleri mol/L olarak hangisidir?",
    explanation:
      "Her bölmede derişim değişiminin büyüklüğü Δn/V=1 mol/1 L=1 mol/L’dir. Dış derişim 8−1=7 mol/L, iç derişim 2+1=3 mol/L olur. Toplam X miktarı 7×1+3×1=10 mol olarak korunur. 8/3 madde yaratır; 9/1 aktarım yönünü ters okur; 7/2 madde kaybettirir. 6/6 toplam 12 mol verdiği için korunumla çelişir. Sayısal derişim değişimi, yalnız eşit hacimden değil açıkça verilen 1 L hacim ve 1 mol aktarımdan hesaplanır.",
  },
  {
    id: "f093-noun-10",
    revision: 1,
    before: {
      id: "f093-noun-10",
      prompt:
        "‘Öğretmenin ve öğrencinin çantası kapıda duruyor.’ cümlesindeki öğretmenin ve öğrencinin çantası grubunda ortak kullanılan unsur hangisidir?",
      options: [
        "İlgi eki taşımayan okul adı",
        "İki ayrı sıfat-fiil",
        "Tamlanan olan çantası",
        "Tamlayan olan kapıda",
        "Ayrılma eki olan ve",
      ],
      answer: 2,
      hint: "İki ilgi ekli unsurun ortak olarak hangi asıl varlık adına bağlandığını bul.",
      explanation:
        "Öğretmenin ve öğrencinin iki tamlayandır; çantası ikisine bağlanan ortak tamlanandır. Ve bağlaçtır, bir durum eki değildir. Bu soru grubun dil bilgisel bağlantısını sorar; çantanın gerçek hayattaki paylaşımını ayrıca belirlemez.",
    },
    prompt:
      "‘Öğretmenin ve öğrencinin çantası kapıda duruyor.’ cümlesinde öğretmenin ve öğrencinin sözcükleri ilgi eki almış iki tamlayan olarak kullanılmıştır. Bu tamlama grubunda ortak kullanılan unsur hangisidir?",
  },
  {
    id: "f93h-b7",
    revision: 1,
    before: {
      id: "f93h-b7",
      prompt: "1711 Prut’ta Azak’ın geri alınmasından hangi sonuç çıkarılamaz?",
      options: [
        "Rusya’yla ilişkide bir kazanım elde edilmiştir.",
        "1700’deki Azak kaybı bakımından değişim olmuştur.",
        "Aynı yüzyılda farklı yönlü sonuçlar yaşanabilir.",
        "Karlofça’da kaybedilen bütün bölgeler geri alınmıştır.",
        "Tek bir yerin kazanımı bütün cepheleri açıklamaz.",
      ],
      answer: 3,
      hint: "Bir kalenin geri alınmasını bütün antlaşma kayıplarının giderilmesine genişletme.",
      explanation:
        "Azak’ın geri alınması Rusya cephesindeki somut kazanımdır. Karlofça’da başka taraflara bırakılan bütün yerlerin aynı işlemle geri alındığı söylenmez; ilk üç ve son seçenek bu sınırı korur.",
    },
    options: [
      "Rusya’yla ilişkide bir kazanım elde edilmiştir.",
      "1700’deki Azak kaybı bakımından değişim olmuştur.",
      "Farklı tarihlerde farklı yönlü sonuçlar yaşanabilir.",
      "Karlofça’da kaybedilen bütün bölgeler geri alınmıştır.",
      "Tek bir yerin kazanımı bütün cepheleri açıklamaz.",
    ],
  },
  {
    id: "f011-viruses-3",
    revision: 1,
    before: {
      id: "f011-viruses-3",
      prompt:
        "Seçilmiş virüs deneyinde yeni genom kopyaları oluşuyor. Viral kapsid proteinlerinin üretimi tamamen durduruluyor ve dışarıdan hazır kapsid sağlanmıyor. Hangi sonuç beklenir?",
      options: [
        "Genom kopyası yok olur",
        "Virüs ribozom kurar",
        "Tam yeni virionların birleşmesi engellenir",
        "Kapsid lipide dönüşür",
        "Virüs bakteriye dönüşür",
      ],
      answer: 2,
      hint: "Tam parçacık için gereken genom ve kılıfı ayrı düşün.",
      explanation:
        "Yeni virionun birleşmesi için genom yanında uygun kapsid bileşenleri de gerekir. Protein üretiminin engellenmesi bu bileşeni eksiltir; genom artışı tam virion artışı değildir. Genomun zorunlu yok olması, ribozom kurulması, kapsidin lipide veya virüsün bakteriye dönüşmesi veriden çıkmaz.",
    },
    prompt:
      "Seçilmiş virüs deneyinde yeni genom kopyaları oluşuyor. Başlangıçta kullanılabilir kapsid proteini veya hazır kapsid stoku bulunmuyor. Viral kapsid proteinlerinin üretimi tamamen durduruluyor; dışarıdan da kapsid proteini veya hazır kapsid sağlanmıyor. Hangi sonuç beklenir?",
  },
  {
    id: "f011-plants-1",
    revision: 1,
    before: {
      id: "f011-plants-1",
      prompt:
        "Dört öğretici bitki adayı kara yosunu, eğrelti, çam ve elmadır. X’te iletim dokusu var, tohum yok. Hangisi iki kanıtı birlikte sağlar?",
      options: ["Eğrelti", "Çam", "Elma", "Kara yosunu", "Dördü de"],
      answer: 0,
      hint: "Damar ve tohum bilgisini ayrı ayrı süz.",
      explanation:
        "Eğrelti damarlı tohumsuz örnektir. Kara yosunu damar kanıtını, çam ve elma tohum yokluğu kanıtını sağlamaz. İki özelliğin kesişimi tek adayı bırakır; sporla çoğalma ifadesini doğrudan damarsızlık saymak kara yosunuyla eğreltiyi yanlış birleştirir.",
    },
    prompt:
      "Dört öğretici bitki adayı kara yosunu, eğrelti, çam ve elmadır. Bilgiler, bireylerin o andaki görünümünü değil grupların yaşam döngüsü özelliklerini anlatır. X’in grubunda iletim dokusu vardır ve tohum oluşmaz. Hangisi iki kanıtı birlikte sağlar?",
  },
  {
    id: "f011-plants-4",
    revision: 1,
    before: {
      id: "f011-plants-4",
      prompt:
        "Kara yosunu, eğrelti, çam ve elma için yalnız ‘meyve yok’ bilgisi verilmiş. Başka gözlem yok. Hangi sonuç doğru?",
      options: [
        "Kesin çamdır",
        "Kesin kara yosunudur",
        "Kesin eğreltidir",
        "İlk üç aday kalır; tek aday için ek kanıt gerekir",
        "Dört adayın hepsi elenir",
      ],
      answer: 3,
      hint: "Olumsuz tek kanıtın kaç örnekte sağlandığını say.",
      explanation:
        "Kara yosunu, eğrelti ve çam meyvesiz öğretici örneklerdir; yalnız elma elenir. Dolayısıyla damar veya tohum gibi ek kanıt gerekir. Birden fazla aday varken kesin tür adı vermek ölçülmeyen bilgiyi eklemektir. Model tüm bitkiler değil dört tanımlı örnek arasındaki süzmeyi sınar.",
    },
    prompt:
      "Kara yosunu, eğrelti, çam ve elma grupları için yalnız ‘yaşam döngüsünde meyve oluşturmaz’ bilgisi verilmiş. Bu, bir bireyin o andaki meyvesiz görünümü değil grubun üreme özelliğidir. Başka bilgi yoksa hangi sonuç doğrudur?",
  },
  {
    id: "f011-chem-kovalent-adlandirma-metalik-bag-7",
    revision: 1,
    before: {
      id: "f011-chem-kovalent-adlandirma-metalik-bag-7",
      prompt:
        "Na₂O, Na⁺ ve O²⁻ iyonlarının oluşturduğu iyonik katıdır. Bu bileşiğin uygun adı hangisidir?",
      options: [
        "Disodyum monoksit",
        "Sodyum oksit",
        "Sodyum dioksit",
        "Sodyum peroksit",
        "Sodyum metal molekülü",
      ],
      answer: 1,
      hint: "Moleküler ön ek şemasından önce verilen yapı türünü kullan.",
      explanation:
        "İyonik adlandırmada katyon sodyum ve anyon oksit adı kullanılır. İki Na⁺ bir O²⁻ yükünü dengeler; bu oran bağımsız bir Na₂O molekülü için sayı ön ekleri kurmamızı gerektirmez. Peroksit farklı iyon yapısıdır; verilen O²⁻ ile aynı değildir.",
    },
    prompt:
      "Na₂O, Na⁺ ve O²⁻ iyonlarının oluşturduğu iyonik katıdır. TYT katyon–anyon adlandırma kuralına göre bu bileşiğin uygun adı hangisidir?",
  },
  {
    id: "f011-chem-maddenin-halleri-2",
    revision: 1,
    before: {
      id: "f011-chem-maddenin-halleri-2",
      prompt:
        "1 g, 0 °C buz tamamen eritilip 100 °C sıvı yapılacak. Lₑ=334 J/g, sıvı c=4,18 J/(g·°C), ısı kaybı yok. Gerekli toplam enerji kaç J?",
      options: ["334", "752", "418", "2256", "3008"],
      answer: 1,
      hint: "Önce mL, sonra mcΔT basamaklarını topla.",
      explanation:
        "Erime için 334 J, 0→100 °C sıvı ısınması için 1×4,18×100=418 J gerekir. Toplam 752 J’dir. 2256 J buharlaşma gizli ısısı, 3008 J ise bu örnekte tümünü 100 °C buhara çevirme toplamıdır. Soru yalnız 100 °C sıvı istediğinden son plato eklenmez.",
    },
    prompt:
      "1 atm basınçta, erime eşiğindeki 1 g, 0 °C saf su buzu tamamen eritilip 100 °C sıvı su yapılacak. Lₑ=334 J/g, sıvı c=4,18 J/(g·°C), ısı kaybı yok. Gerekli toplam enerji kaç J?",
  },
  {
    id: "dalgalara-giris-q10",
    revision: 1,
    before: {
      id: "dalgalara-giris-q10",
      prompt:
        "Bir noktadaki y–t grafiğinde art arda iki maksimum t=0,7 s ve t=1,2 s’de oluşuyor. Bu veriden doğrudan bulunanlar hangisidir?",
      options: [
        "λ=0,5 m ve v=2 m/s",
        "T=1,9 s ve f=0,5 Hz",
        "A=0,5 m ve λ=2 m",
        "T=2 s ve f=0,5 Hz",
        "T=0,5 s ve f=2 Hz",
      ],
      answer: 4,
      hint: "Yatay eksen zaman; maksimumlar arasındaki süreyi çıkar.",
      explanation:
        "T=1,2−0,7=0,5 s ve f=1/T=2 Hz. Konum veya dalga sürati verilmediği için λ bulunamaz; genlik için düşey eksen değerleri gerekir. Zaman aralığını metreyle etiketleme.",
    },
    prompt:
      "Sinüzoidal (harmonik) bir dalganın bir noktasına ait y–t grafiğinde art arda iki maksimum t=0,7 s ve t=1,2 s’de oluşuyor. Bu veriden doğrudan bulunanlar hangisidir?",
  },
  {
    id: "dalgalara-giris-q3",
    revision: 1,
    before: {
      id: "dalgalara-giris-q3",
      prompt:
        "Anlık y–x grafiğinde ardışık iki dalga tepesi x=0,3 m ve x=1,1 m konumundadır. Dalga boyu kaç m?",
      options: ["0,8", "1,4", "0,4", "1,1", "0,3"],
      answer: 0,
      hint: "Aynı evreli komşu tepelerin konum farkını al.",
      explanation:
        "λ=1,1−0,3=0,8 m. Tepe konumlarını toplama veya farkı ikiye bölme. λ/2 olan uzaklık sinüsoidal dalgada tepe ile hemen sonraki çukur arasındadır.",
    },
    prompt:
      "Sinüzoidal (harmonik) bir dalganın anlık y–x grafiğinde ardışık iki dalga tepesi x=0,3 m ve x=1,1 m konumundadır. Dalga boyu kaç m?",
  },
];
const revisions = new Map(
  questionPresentationRevisions.map((r) => [
    r.id,
    { ...r, identity: questionIdentity(r.before) },
  ]),
);
export function clarifiedQuestionView<T extends HelpQuestion>(question: T): T {
  const revision = revisions.get(question.id);
  if (!revision || questionIdentity(question) !== revision.identity)
    return question;
  const view = { ...question };
  if (revision.prompt !== undefined) view.prompt = revision.prompt;
  if (revision.options !== undefined) view.options = [...revision.options];
  if (revision.explanation !== undefined)
    view.explanation = revision.explanation;
  // A personal hint or a historical snapshot without a hint remains intact.
  if (revision.hint !== undefined && question.hint === revision.before.hint)
    view.hint = revision.hint;
  return view;
}
export function localizedQuestionView<T extends Question>(question: T): T {
  const original = {
    id: question.id,
    prompt: question.prompt.tr,
    passage: question.passage?.tr,
    options: question.options.map((o) => o.tr),
    answer: question.answer,
    explanation: question.explanation.tr,
    hint: question.hint.tr,
  };
  const view = clarifiedQuestionView(original);
  if (view === original) return question;
  return {
    ...question,
    ...(view.prompt !== original.prompt
      ? { prompt: { ...question.prompt, tr: view.prompt } }
      : {}),
    ...(view.options.some((s, i) => s !== original.options[i])
      ? {
          options: question.options.map((o, i) =>
            o.tr === view.options[i] ? o : { ...o, tr: view.options[i] },
          ),
        }
      : {}),
    ...(view.explanation !== original.explanation
      ? { explanation: { ...question.explanation, tr: view.explanation } }
      : {}),
    ...(view.hint !== original.hint
      ? { hint: { ...question.hint, tr: view.hint! } }
      : {}),
  };
}
