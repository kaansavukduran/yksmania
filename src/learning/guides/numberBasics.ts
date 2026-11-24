import type { LessonGuide } from "./types";

export const basicsGuide: LessonGuide = {
  id: "temel-kavramlar",
  minutes: 45,
  objectives: [
    "Rakam, sayı ve basamak değerini ayır; değeri hesaplayıp sayı kümesini belirle.",
    "İşlem özelliklerini gerekçelendir; parantez, üs, kök ve işlem önceliğini uygula.",
    "Sadeleştirmede başlangıç koşullarını koru; evrensel yargıyı karşı örnekle sına.",
    "Sayı seçme problemlerinde tam sayı, pozitiflik ve farklılık koşullarını birlikte kullan.",
  ],
  sections: [
    {
      title: "Rakam yazım aracıdır, sayı bir değerdir",
      paragraphs: [
        "Onluk sistemde kullanılan on rakam 0, 1, …, 9’dur. 47 iki rakamla yazılmış bir sayıdır; 4 ve 7 onun rakamlarıdır. 47’de 4’ün sayı değeri 4, basamak değeri 40’tır. ab iki basamaklı sayısı 10a+b anlamına gelir; a ve b’nin çarpımı değildir. a sıfır olamaz, b sıfır olabilir. Bir soruda ‘a bir rakamdır’ deniyorsa a için 12 veya −1 seçilemez.",
        "Önce sözel bilgiyi matematiğe çevir: ‘rakamları farklı’ a≠b, ‘iki basamaklı’ a∈{1,…,9} ve b∈{0,…,9} demektir. Koşul listesi, hesap kadar önemlidir. Büyük bir onlar basamağı, birler basamağındaki değişimden daha güçlüdür; bu yüzden en büyük iki basamaklı sayı aranırken önce a belirlenir.",
      ],
    },
    {
      title: "Sayı kümelerinde önce değeri hesapla",
      paragraphs: [
        "Bu anlatımda ℕ={0,1,2,…}; sayma sayıları 1’den başlar. ℤ negatif tam sayıları da kapsar. ℚ, a ve b tam sayı, b≠0 olmak üzere a/b biçimindeki sayılardır. ℝ ise rasyonel ve irrasyonel gerçek sayıları birlikte içerir. ℕ⊂ℤ⊂ℚ⊂ℝ olduğundan 6 tek bir kümeye sıkışmaz: dört kümeye de aittir.",
        "√36=6 ve 12/4=3 önce hesaplanır; ikisi de doğal sayıdır. √3 rasyonel değildir; 0,272727… ise 27 sürekli tekrarlanıyorsa rasyoneldir. ‘Sonsuz ondalık’ tek başına irrasyonellik kanıtı değildir; sonlu olmayan ve devirli olmayan ondalık açılım ayırt edicidir. Gerçek sayılarda √(−4) tanımlı değildir; bunu negatif bir gerçek sayı sanma.",
        "Aşağıdaki modelde aynı sayı için bütün doğru kümeleri seç. En dar kümeyi bilmek, onu içeren kümeleri dışlamak anlamına gelmez. Bir kutunun büyük çizilmesi eleman sayısının daha fazla olduğu anlamına gelmez; şema yalnız içerme ilişkisini gösterir.",
      ],
    },
    {
      title: "İşlem özellikleri hangi dönüşüme izin verir?",
      paragraphs: [
        "Toplamada ve çarpmada sıra değişebilir: a+b=b+a, ab=ba. Gruplama da değişebilir: (a+b)+c=a+(b+c). Çıkarma ve bölme için bu özellikler genel olarak yoktur: 8−3 ile 3−8 farklıdır; 12/(3/2)=8 iken (12/3)/2=2’dir.",
        "Toplamanın etkisiz elemanı 0, çarpmanın etkisiz elemanı 1’dir. Çarpmada 0 yutandır: a×0=0. Toplama tersi −a her gerçek sayı için vardır; çarpma tersi 1/a yalnız a≠0 için vardır. Dağılma kuralı a(b+c)=ab+ac, bir toplamı çarpıma dönüştürmenin ve ortak çarpan ayırmanın dayanağıdır.",
      ],
    },
    {
      title: "İşlem önceliği ve eksi işaretinin kapsamı",
      paragraphs: [
        "Önce parantezin içindeki işlem, sonra üs ve kökün kapsadığı işlem, sonra çarpma-bölme, en son toplama-çıkarma yapılır. Aynı öncelikte soldan sağa ilerlenir: 24÷4×3=6×3=18. Çarpmayı bölmenin önüne geçirmek farklı bir ifade hesaplamaktır. Uzun kesir çizgisi de parantez gibi payın ve paydanın tamamını gruplar.",
        "−5²=−(5²)=−25; (−5)²=25. Birincisinde üs yalnız 5’e, ikincisinde −5’e uygulanır. √25=5’tir; x²=25 denkleminin çözümleri ise −5 ve 5’tir. Karekök sembolünün sonucu negatif olamaz; dolayısıyla √(x²)=|x|. x=−8 için sonuç −8 değil 8’dir.",
      ],
    },
    {
      title: "Tanım koşulunu sadeleştirerek silemezsin",
      paragraphs: [
        "Bir kesirde payda sıfır olamaz. (3x−6)/(x−2) ifadesinde daha işlem yapmadan x≠2 yazılır. Pay 3(x−2) olduğundan izinli değerlerde sonuç 3’tür. Fakat x=2’yi sonradan eklemek başlangıçtaki 0/0’a değer vermek olur. Sadeleşen ortak çarpan, başlangıç koşulunu ortadan kaldırmaz.",
        "Sadeleştirme ortak çarpanlar arasında yapılır; toplamın içinden rastgele terim çizilmez. (x+4)/x, x≠0 için 1+4/x’tir. Her iki terimi x’e bölmüş olduk. Bir eşitliği bilinmeyen içeren ifadeye bölmeden önce o ifadenin sıfır olabildiği durumu ayır; x(x−3)=0’ı x’e bölmek x=0 çözümünü kaybettirir.",
      ],
    },
    {
      title: "Sayı seçerken bütün koşulları aynı anda uygula",
      paragraphs: [
        "a+b=12 ve a,b pozitif tam sayıysa a=1, b=11 seçilebilir; sıfır kullanılamaz. ‘Farklı’ koşulu da varsa a=b=6 yasaktır. En küçük veya en büyük değer, sayının ait olduğu kümeye bağlıdır. Pozitif gerçek sayılarda a değeri sıfıra yaklaşabilir ama sıfır olamaz; bu durum pozitif tam sayıdaki en küçük değer 1 ile aynı değildir.",
        "Bir ifadeyi büyütmek için bütün değişkenleri en büyük seçmek her zaman doğru değildir. 2a−b’de a’yı büyütmek ve b’yi küçültmek sonucu büyütür. Ayrıca a ile b’yi bağlayan koşul varsa bağımsız seçemezsin. Seçtiğin adayları başlangıç cümlesine geri koy: sayı türü, sıfır, farklılık ve eşitsizlikler korunuyor mu?",
      ],
    },
    {
      title: "Bir örnek ispat değildir; karşı örnek yargıyı çürütür",
      paragraphs: [
        "‘İki irrasyonelin toplamı daima irrasyoneldir’ yanlıştır: √2+(−√2)=0. ‘Rasyonel ile irrasyonelin çarpımı irrasyoneldir’ yargısında rasyonelin sıfır olmadığı koşulu gerekir; 0×√2=0’dır. Bir doğru örnek bütün olasılıkları ispatlamaz, fakat geçerli bir karşı örnek ‘her zaman’ iddiasını çürütür.",
        "Soruyu bitirirken küçük bir kontrol rutini kullan: ifade tanımlı mı, işaret mantıklı mı, seçtiğim sayı izinli mi, işlem yaklaşık mı kesin mi? Kesir sonucu için ondalık kontrol yararlı olabilir; 1/3≈0,333 yazarken yaklaşık işaretini koru. Hesap makinesi yuvarlamasını kesin eşitlik diye aktarma.",
      ],
    },
    {
      title: "Sayı doğrusunda sırayı ve uzaklığı ayır",
      figureTitle: "Sayı doğrusunda sırayı ve uzaklığı ayır",
      paragraphs: [
        "Sayı doğrusunda sağdaki sayı büyüktür. −3 solda, 2 sağda olduğu için −3<2. Mutlak değer, sıfıra uzaklıktır. −3 sıfırdan 3 birim, 2 ise 2 birim uzaktadır. Bu yüzden |−3|>|2|. Sayı sırası ile sıfıra uzaklık iki ayrı karşılaştırmadır.",
        "İki sınır arasındaki tam sayıları sayarken önce uçların dahil olup olmadığına bak. −2<x≤1 aralığında adaylar −1, 0 ve 1’dir. Açık sınır boş, dahil sınır dolu noktayla gösterilir.",
      ],
    },
  ],
  examples: [
    {
      title: "Önce değer, sonra küme",
      prompt:
        "A=√64, B=−9/3 ve C=0,121212… olsun. Her biri için en dar sayı kümesini belirle; C’de 12 sürekli tekrar ediyor.",
      strategy:
        "Yazılışla karar verme; önce kök, bölüm veya devirli ondalığın değerini incele.",
      steps: [
        {
          label: "Kök ve bölümü hesapla",
          expression: "A=8, B=−3",
          explanation: "8 doğal sayıdır. −3 tam sayıdır; doğal sayı değildir.",
        },
        {
          label: "Devri kesre dönüştür",
          expression: "100C−C=12 → C=12/99=4/33",
          explanation:
            "Sonsuz tekrar eden ondalık rasyoneldir; bu kesir tam sayı değildir.",
        },
      ],
      answer: "A için ℕ, B için ℤ, C için ℚ en dar kümelerdir.",
      check: "Üçü de ℝ içindedir; A ve B aynı zamanda ℚ içindedir.",
      pitfall:
        "Bir sayıya en dar kümeyi vermek, üst kümelere ait olmadığı anlamına gelmez.",
    },
    {
      title: "Öncelik ve parantez birlikte",
      prompt: "−4²+18÷3×2 işlemini hesapla.",
      strategy: "Üssün tabanını ve aynı öncelikteki işlemlerin yönünü belirle.",
      steps: [
        {
          label: "Üs kapsamını koru",
          expression: "−4²=−16",
          explanation: "Eksi işareti parantezle tabana alınmamıştır.",
        },
        {
          label: "Soldan sağa ilerle",
          expression: "18÷3×2=6×2=12",
          explanation: "Çarpma ve bölme aynı önceliktedir.",
        },
        {
          label: "Son toplam",
          expression: "−16+12=−4",
          explanation: "İşaretli sayıları en son toplarız.",
        },
      ],
      answer: "−4",
      check: "(−4)² yazılmış olsaydı farklı bir ifade ve 28 sonucu olurdu.",
      pitfall: "Üs tabanını kendiliğinden parantez içine alma.",
    },
    {
      title: "Sadeleşen ifadenin yasak değeri",
      prompt:
        "(5x+15)/(x+3) ifadesini sadeleştir ve geçerli x değerlerini belirt.",
      strategy: "Önce paydayı sıfır yapan değeri dışla.",
      steps: [
        {
          label: "Başlangıç koşulu",
          expression: "x≠−3",
          explanation: "Payda sıfır olamaz.",
        },
        {
          label: "Ortak çarpanı göster",
          expression: "5(x+3)/(x+3)=5",
          explanation: "x+3 sıfır olmadığı için sadeleşebilir.",
        },
      ],
      answer: "x≠−3 için değer 5’tir.",
      check: "x=0 yazınca 15/3=5; x=−3 yazınca başlangıç ifadesi tanımsızdır.",
      pitfall: "Sonucun sabit olması bütün gerçek x değerlerine izin vermez.",
    },
    {
      title: "Açık ve kapalı sınırdan tam sayıları bul",
      prompt: "−7≤2x+1<5 koşulunu sağlayan tam sayıları bul.",
      strategy: "Üç ifadeye aynı işlemi yap. Sonra uçları kendi eşitsizlik işaretleriyle oku.",
      steps: [
        {
          label: "Başlangıçtaki sınırları dönüştür",
          expression: "−8≤2x<4 → −4≤x<2",
          explanation: "Her ifadeden 1 çıkar. Sonra her ifadeyi pozitif 2’ye böl. İşaretlerin yönü korunur.",
        },
        {
          label: "Sınırları ve adayları işaretle",
          expression: "−4, −3, −2, −1, 0, 1",
          explanation: "−4 dahil olduğu için dolu, 2 hariç olduğu için boş nokta çiz. Aradaki tam sayıları sırala.",
          figureTitle: "Açık ve kapalı sınırdan tam sayıları bul",
        },
      ],
      answer: "Altı tam sayı vardır.",
      check: "x=−4 için 2x+1=−7, sol sınır sağlanır. x=2 için 2x+1=5, sağ koşul sağlanmaz.",
      pitfall: "Sağ uçta < işareti var. x=2’yi listeye ekleme.",
    },
    {
      title: "Farklı rakamlarla en büyük değer",
      prompt:
        "a ve b farklı rakamlar, a≠0. 3a−b ifadesinin en büyük değeri kaçtır?",
      strategy:
        "Artı katsayılı rakamı büyüt, eksi katsayılı rakamı küçült; farklılığı kontrol et.",
      steps: [
        {
          label: "İzinli adayları seç",
          expression: "a=9, b=0",
          explanation:
            "Sıfır bir rakamdır ve a’dan farklıdır; a sıfır değildir.",
        },
        {
          label: "Değeri hesapla",
          expression: "3×9−0=27",
          explanation:
            "a en büyük, b en küçük izinli değerdedir; başka seçim sonucu büyütemez.",
        },
      ],
      answer: "27",
      check: "a=9,b=1 sonucu 26 olur; b’nin pozitif olma koşulu verilmemiştir.",
      pitfall: "Rakam ile pozitif rakam aynı küme değildir.",
    },
  ],
  recall: [
    {
      prompt: "0/0 neden 1 değildir?",
      answer:
        "Bölüm tek bir sayı olmalıdır; 0×c=0 her c için sağlandığından tek bir bölüm belirlenemez. 0/0 tanımsızdır.",
    },
    {
      prompt: "√(x²)=x eşitliğinin koşulu nedir?",
      answer: "x≥0. Genel eşitlik √(x²)=|x|’tir.",
    },
    {
      prompt: "Bir irrasyonellik iddiasını nasıl sınarsın?",
      answer:
        "Önce değeri hesaplar ve tanımı kullanırım. ‘Her zaman’ ifadesini çürüten izinli bir karşı örnek yeterlidir; birkaç doğru örnek ispat değildir.",
    },
    {
      prompt: "Sadeleştirme öncesinde hangi koşul yazılır?",
      answer:
        "Başlangıç ifadesindeki bütün paydaların sıfırdan farklı olması; gerekli kök ve diğer tanım koşulları da korunur.",
    },
  ],
  source:
    "MEBİ TYT Matematik Konu Özetleri PDF s.11–13 (basılı 9–11); OGM Video Ders Notu Temel Kavramlar–Sayılar PDF s.1–2; Aurelia Temel Kavramlar kopya kağıdı içerik 5.1, fiziksel s.1–6 ve 11 ile karşılaştırılmış özgün anlatım, modeller ve çözümler. Resmî soru değildir.",
};

export const parityGuide: LessonGuide = {
  id: "tek-cift-isaret",
  minutes: 40,
  objectives: [
    "Tam sayıda tek–çift özelliğini işaretten ayrı belirle.",
    "Toplam, çarpım ve üs kurallarını tanımlardan türet; sıfır ve bölme istisnalarını ayır.",
    "Bir koşuldan kesin çıkan bilgiyi, yalnız mümkün olan bilgiden ayır.",
  ],
  sections: [
    {
      title: "İki bağımsız soru: işaret ve tek–çift",
      paragraphs: [
        "Pozitiflik x>0, negatiflik x<0 demektir ve gerçek sayılara uygulanır. Tek–çift sınıflaması ise tam sayılar içindir. 1/2 pozitiftir ama tek veya çift değildir. −8 negatif ve çifttir; −5 negatif ve tektir. Sıfır 2×0 biçiminde yazıldığından çifttir; ne pozitif ne negatiftir.",
        "k tam sayı olmak üzere çiftler 2k, tekler 2k+1 biçiminde yazılır. Negatif tekler de bu yazıma uyar: −7=2(−4)+1. ‘Sayının işaretini değiştirmek’ ile ‘tek–çift özelliğini değiştirmek’ aynı şey değildir; 6 ve −6 aynı pariteye sahiptir.",
      ],
    },
    {
      title: "Toplam ve farkın kuralını ikili gruplardan çıkar",
      paragraphs: [
        "Çift bir miktar ikişerli eşleşince açıkta birim bırakmaz; tek miktar bir birim bırakır. İki tek miktarın açıkta kalanları yeni bir çift oluşturur. Bu yüzden tek+tek çift, çift+çift çift, tek+çift tektir. Çıkarma için de aynı sınıflama geçerlidir; bir tam sayının ters işaretlisi aynı pariteye sahiptir.",
        "Genel gerekçe: (2a+1)+(2b+1)=2(a+b+1) çifttir. (2a+1)−2b=2(a−b)+1 tektir. Bir toplamın tek olduğunu bilmek toplananların biri tek biri çift olduğunu söyler; hangisinin tek olduğunu tek başına söylemez. Modelde toplama ve çarpma arasında geçiş yapıp aynı girdileri karşılaştır.",
      ],
      table: {
        headers: ["A ve B", "A+B / A−B", "A×B"],
        rows: [
          ["Çift, çift", "Çift", "Çift"],
          ["Tek, tek", "Çift", "Tek"],
          ["Tek, çift", "Tek", "Çift"],
        ],
      },
    },
    {
      title: "Çarpımda bir çift yeter; işarette sıfır önce gelir",
      paragraphs: [
        "Tam sayı çarpımında en az bir çift çarpan varsa sonuç çifttir. Sonuç tekse bütün tam sayı çarpanlar tektir. Tersine ‘sonuç çiftse bütün çarpanlar çift’ denemez: 3×4 çifttir. İki tek sayının çarpımı (2a+1)(2b+1)=2(2ab+a+b)+1 biçiminde olduğundan tektir.",
        "İşaret için önce çarpanlardan biri sıfır mı diye bak. Varsa çarpım sıfırdır. Yoksa negatif çarpan sayısı tek olduğunda sonuç negatif, çift olduğunda pozitiftir. a×b>0 ise ikisi aynı işaretlidir; mutlaka ikisi de pozitif değildir. a×b<0 ise ikisi ters işaretlidir ve sıfır olamazlar.",
      ],
    },
    {
      title: "Üslerde koşulu ve tabanı koru",
      paragraphs: [
        "Pozitif tam üs, tam sayı tabanın tek–çift özelliğini korur. Fakat sıfırıncı üs için genelleme yapılamaz: 4⁰=1 tektir. Sıfırdan farklı tabanda çift üs sonucu pozitiftir; tek üs tabanın işaretini korur. 0’ın pozitif tam kuvveti 0’dır ve pozitif değildir. Bu düzeyde 0⁰’a değer atamayız.",
        "−2⁴=−16 iken (−2)⁴=16’dır; ilk eksi üs kapsamının dışındadır. Tabanın negatif olup olmadığını işaretten önce parantezle belirle. Negatif üs a⁻ⁿ=1/aⁿ anlamına geldiği için a≠0 şartı ve sonucun tam sayı olup olmadığı yeniden kontrol edilir; parite kuralı gelişigüzel taşınmaz.",
      ],
    },
    {
      title: "Bölümün paritesinden önce tam sayı oluşunu denetle",
      paragraphs: [
        "Bölen sıfır olamaz. Bölüm tanımlı olsa da tam sayı olmak zorunda değildir. Çift/çift için 14/2=7 tek, 16/2=8 çift, 2/4=1/2 ise tam sayı değildir. Bu nedenle çift/çift için tek sonuç yazan bir tablo yanlıştır.",
        "Tek bir tam sayının çift bir tam sayıya bölümü tam sayı olamaz; çift×tam sayı sonucu tek olamazdı. Tek/tek bölüm tam sayıysa tek, çift/tek bölüm tam sayıysa çifttir. Örneğin 15/3=5 tek; fakat 3/5 için tek–çift denmez. İşaret ile pariteyi iki ayrı satırda kontrol et.",
      ],
    },
    {
      title: "Kesinlik sorularında koşulları cebirle birleştir",
      paragraphs: [
        "‘Kesinlikle’ isteniyorsa bir uygun örnek bulmak yetmez. a,b tam sayı ve a(b+1) tekse iki çarpan da tektir; a tek, b+1 tek ve dolayısıyla b çift olur. Sonucun hangi çarpanın paritesini zorunlu kıldığını tek tek çıkar.",
        "Bir işaret sorusunda a²b<0 ise a≠0 olduğu için a²>0’dır, dolayısıyla b<0 gerekir. a’nın işareti belirlenmez: hem a=2 hem a=−2 koşulu sağlayabilir. Kareyi pozitif sayarken a=0 olasılığını eşitsizliğin dışladığını açıkça söyle. ‘Olabilir’ ile ‘olmak zorunda’ ayrımını örnek ve karşı örnekle denetle.",
      ],
    },
  ],
  examples: [
    {
      title: "Tek çarpımdan geriye git",
      prompt:
        "a,b tam sayıdır. a(b+3) tek olduğuna göre a ve b’nin paritesi nedir?",
      strategy: "Tek çarpımın her iki çarpanının da tek olduğunu kullan.",
      steps: [
        {
          label: "Çarpanları ayır",
          expression: "a tek, b+3 tek",
          explanation: "Çift bir çarpan sonucu çift yapardı.",
        },
        {
          label: "b’yi belirle",
          expression: "b=(b+3)−3: tek−tek=çift",
          explanation: "3 tek olduğu için b çifttir.",
        },
      ],
      answer: "a tek, b çift.",
      check: "a=−3,b=2 seçilirse −3×5=−15 tektir; pozitiflik şartı yoktur.",
      pitfall: "Tek çarpımın pozitif olduğunu sanma.",
    },
    {
      title: "İşareti kesin, taban işareti belirsiz",
      prompt:
        "Gerçek a,b sayıları için a²b<0. Hangilerinin işareti belirlenir?",
      strategy: "Önce sıfırın dışlanmasını, sonra çift kuvveti kullan.",
      steps: [
        {
          label: "Sıfırı dışla",
          expression: "a≠0, b≠0",
          explanation: "Çarpım kesinlikle negatif; sıfır olamaz.",
        },
        {
          label: "Pozitif çarpanı ayır",
          expression: "a²>0 → b<0",
          explanation:
            "Pozitif bir sayıyla çarpım ancak b negatifse negatif olur.",
        },
      ],
      answer: "b negatiftir; a pozitif veya negatif olabilir.",
      check: "a=2,b=−1 ve a=−2,b=−1 aynı negatif çarpımı verir.",
      pitfall: "a²>0’dan a>0 sonucu çıkmaz.",
    },
    {
      title: "Bölmede karşı örnek kur",
      prompt: "İki çift sayının bölümü daima çift midir? Bölen sıfır değil.",
      strategy:
        "Tek bir sınıflamaya zorlamak yerine mümkün sonuç türlerini dene.",
      steps: [
        {
          label: "İki tam sayı örneği",
          expression: "18/6=3; 24/6=4",
          explanation: "Aynı koşullardan hem tek hem çift sonuç elde edilir.",
        },
        {
          label: "Tam sayı olmayan örnek",
          expression: "2/6=1/3",
          explanation: "Tanımlı bölümün tam sayı olması ayrıca gereklidir.",
        },
      ],
      answer: "Hayır; tek, çift veya tam sayı olmayan sonuç olabilir.",
      check: "Her örnekte pay ve payda çift, payda sıfırdan farklıdır.",
      pitfall: "Bölüm tam sayı değilse ona tek veya çift deme.",
    },
    {
      title: "Sıfırıncı üssü genellemeye katma",
      prompt:
        "n doğal sayı olmak üzere 2ⁿ+3 ifadesi hangi n değerlerinde çifttir?",
      strategy: "n=0 durumunu pozitif üslerden ayır.",
      steps: [
        {
          label: "Sınır değer",
          expression: "n=0 → 1+3=4",
          explanation: "Sonuç çifttir.",
        },
        {
          label: "Pozitif üsler",
          expression: "n≥1 → çift+tek=tek",
          explanation: "2ⁿ içinde en az bir 2 çarpanı vardır.",
        },
      ],
      answer: "Yalnız n=0 için çifttir.",
      check: "n=1 için 5, n=2 için 7 elde edilir.",
      pitfall:
        "‘Çiftin kuvveti çifttir’ kuralında pozitif tam üs koşulunu unutma.",
    },
  ],
  recall: [
    {
      prompt: "−1/2 tek midir?",
      answer:
        "Hayır. Tam sayı olmadığı için paritesi yoktur; yalnız işareti negatiftir.",
    },
    {
      prompt: "ab çiftse a ve b için ne kesin söylenir?",
      answer:
        "a,b tam sayıysa en az biri çifttir; ikisinin de çift olması gerekmez.",
    },
    {
      prompt: "Bir kare ne zaman kesinlikle pozitiftir?",
      answer: "Gerçek taban sıfırdan farklıysa. Sıfırın karesi 0’dır.",
    },
  ],
  source:
    "MEBİ TYT Matematik Konu Özetleri PDF s.14–16 (basılı 12–14); OGM Temel Kavramlar–Sayılar PDF s.4,8; Aurelia Tek Çift Pozitif Negatif Sayılar s.1–4. Özgün açıklama, etkileşim ve öğretim örnekleri; resmî soru değildir.",
};
