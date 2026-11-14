import type { LessonGuide } from "./types";
export const disciplinesGuide: LessonGuide = {
  id: "kimya-disiplinleri",
  minutes: 35,
  objectives: [
    "Başlıca yedi kimya disiplinini araştırma sorusuna göre ayır.",
    "Nitel ve nicel analizi örnekle; sektör ile disiplinin farklı sınıflar olduğunu açıkla.",
    "Kimyayla ilgili meslekleri, endüstrileri ve ortak çalışmayı ilişkilendir.",
  ],
  sections: [
    {
      title: "Madde aynı, sorulan soru farklı olabilir",
      paragraphs: [
        "Bir su örneğinde hangi iyonların bulunduğunu belirlemek, iyonların miktarını ölçmek ve suyun bir tesiste nasıl arıtılacağını planlamak aynı iş değildir. Aynı maddeye farklı araştırma sorularıyla yaklaşılır. Disiplin adını yalnız madde adına bakarak seçmek yerine yapılan işi bir fiille özetle: belirlemek, miktarını ölçmek, yapısını incelemek, hızını araştırmak veya üretimi geliştirmek.",
        "Kimyanın alt dalları birbirinden kopuk değildir. Bir ilaç projesinde molekülün sentezi, saflık kontrolü, organizmadaki dönüşümleri ve büyük ölçekte üretimi farklı uzmanların ortak çalışmasını gerektirebilir. Sınav sorusunda çoğunlukla anlatılan belirli işin baskın alanı istenir; ‘ilaç’ sözcüğü görüldü diye her aşama biyokimya sayılmaz.",
      ],
    },
    {
      title: "Analitik kimya: ne var, ne kadar var?",
      paragraphs: [
        "Analitik kimya bir örneğin bileşenlerini belirleme ve miktarlarını ölçmeyle ilgilenir. Nitel, yani kalitatif analizde ‘hangi madde var?’ sorusuna cevap aranır. Nicel, yani kantitatif analizde ‘ne kadar var?’ sorusu ölçülür. Bir su örneğinde kalsiyum bulunduğunun belirlenmesi nitel; kalsiyum derişiminin mg/L olarak ölçülmesi niceldir.",
        "Gözlem ile analizin amacı farklı düzeylerdir. Bir rengin gözle görülmesi nitel gözlemdir; uygun ölçüm yöntemi ve kalibrasyonla bir bileşenin miktarını belirlemek nicel analize dönüşebilir. Analiz ilaçta, gıdada, arkeolojik örnekte veya kanda yapılabilir; örneğin canlıdan alınması, yapılan bütün ölçümleri tek başına biyokimya olarak sınıflandırmaz.",
      ],
    },
    {
      title: "Organik ve anorganik kimya",
      paragraphs: [
        "Organik kimya karbon bileşiklerinin yapısını, özelliklerini ve tepkimelerini inceler. Petrol türevleri, birçok ilaç, boya ve plastik bu alanla ilişkilidir. Fakat ‘karbon içeriyor’ tek başına bütün bileşikleri organik saydıran bir kural değildir; CO, CO₂ ve karbonatlar gibi örnekler anorganik kimya kapsamında ele alınır.",
        "Anorganik kimya; metaller, mineraller, birçok asit, baz ve tuz gibi organik olmayan türlerle ilgilenir. ‘Canlıdan gelmişse organik, laboratuvarda üretilmişse anorganik’ ayrımı yanlıştır. Aynı organik bileşik doğal kaynaktan elde edilebilir veya sentezlenebilir; sınıflandırma üretim yerinden değil yapı ve kimyasal türden hareket eder.",
      ],
    },
    {
      title: "Fizikokimya, biyokimya ve polimer kimyası",
      paragraphs: [
        "Fizikokimya enerji, sıcaklık, basınç, derişim ve tepkime hızı gibi ilişkileri inceler. ‘Sıcaklık artınca tepkime hızı nasıl değişir?’ veya ‘pilin enerji dönüşümü nasıl açıklanır?’ bu alana örnektir. Her ölçüm yapmak analitik kimya demek değildir; ölçümün hangi ilişkiyi sınadığına bakılır.",
        "Biyokimya canlıların kimyasal yapılarını ve kimyasal süreçlerini inceler: enzim etkinliği, proteinlerin yapısı, metabolik yollar ve bir ilacın organizmadaki kimyasal dönüşümleri gibi. Biyolojik örnekte belirli bir maddenin yalnız miktarını tayin etmek analitik yöntemlerle de yapılabilir; amaçlar kesişebilir.",
        "Polimer kimyası monomerlerin birleşmesiyle oluşan büyük moleküllerin yapısı, oluşumu ve özellikleriyle ilgilenir. Selüloz ve proteinler doğal; naylon ve birçok plastik sentetik polimer örneğidir. Monomer sayısı ile monomer türü sayısı farklıdır. Her polimerin sentetik veya her karbon içeren maddenin polimer olduğu söylenemez.",
      ],
    },
    {
      title: "Endüstriyel kimya ve üretim ölçeği",
      paragraphs: [
        "Endüstriyel kimyada bir üretim sürecinin verimi, kalitesi, maliyeti, enerji gereksinimi ve çevresel etkileri birlikte değerlendirilir. Laboratuvarda elde edilen bir ürünü sürekli ve güvenilir biçimde büyük ölçekte üretmek ek sorunlar doğurur. Araştırmada sıcaklığın hıza etkisi fizikokimyaya, bu bilgiyi tesis üretimini iyileştirmekte kullanmak endüstriyel çalışmaya bağlanabilir.",
        "İlaç, gübre, petrokimya, boya, tekstil ve arıtım birer sektör veya uygulama alanıdır. Disiplinler bu sektörlerde birlikte çalışır. Tekstilde lifin polimer yapısını tasarlamak, boyanın bileşimini belirlemek ve kumaşa bağlanma koşullarını geliştirmek ayrı araştırma sorularıdır.",
      ],
    },
    {
      title: "Meslek ile disiplin adını ayır",
      paragraphs: [
        "Kimyager maddelerin yapısı, analizi ve tepkimeleri üzerine araştırma ve ölçümler yapabilir. Kimya mühendisi üretim süreçlerinin tasarımı ve işletilmesiyle; metalurji ve malzeme mühendisi malzemelerin üretimi, yapısı ve özellikleriyle çalışabilir. Eczacı ilaçlarla ilgili uzmanlık, kimya öğretmeni öğretim görevleri üstlenir. Bunlar birbiriyle çalışan mesleklerdir; bir meslek bütün kimya disiplinleriyle eş anlamlı değildir.",
        "Soruyu çözerken önce görev fiilini işaretle, sonra amacı söyle, en son disiplin adını seç. İki alan arasında kaldığında sorudaki özgül işlemi tekrar oku. ‘Kandaki X miktarını belirleme’ ile ‘X’in hücrede hangi tepkimeyle parçalandığını araştırma’ aynı örnek kaynağına sahip olsa da aynı amacı taşımaz.",
      ],
    },
  ],
  examples: [
    {
      title: "Kan örneği iki ayrı soruyu cevaplar",
      prompt:
        "A çalışmasında kandaki bir maddenin derişimi ölçülüyor. B çalışmasında aynı maddenin enzimle hangi ürünlere dönüştüğü araştırılıyor. Baskın alanları ayır.",
      strategy: "Örneğin alındığı yere değil araştırmanın amacına bak.",
      steps: [
        {
          label: "A’nın amacı",
          explanation:
            "Maddenin ne kadar bulunduğu belirleniyor; nicel analizdir.",
        },
        {
          label: "B’nin amacı",
          explanation:
            "Canlıdaki kimyasal dönüşüm ve enzim ilişkisi araştırılıyor.",
        },
        {
          label: "Adları eşleştir",
          explanation:
            "A’da analitik kimya; B’de biyokimya öne çıkar. Kullanılan yöntemler kesişebilir.",
        },
      ],
      answer: "A: analitik kimya; B: biyokimya.",
      check:
        "İkisi de kanla çalışıyor; farklılığı belirleyen madde kaynağı değil amaç.",
      pitfall: "Canlıdan alınmış her örneği yalnız biyokimyaya bağlama.",
    },
    {
      title: "Bir tekstil projesinde üç iş",
      prompt:
        "Bir ekip yeni lifin zincir yapısını tasarlıyor; diğeri boyanın saflığını ölçüyor; üçüncüsü üretimde enerji tüketimini düşürüyor. Hangi alanlar öne çıkar?",
      strategy: "Her işi ayrı sınıflandır; tekstil tek bir disiplin değildir.",
      steps: [
        {
          label: "Lif zinciri",
          explanation:
            "Büyük molekül yapısının tasarımı polimer kimyasıyla ilişkilidir.",
        },
        {
          label: "Saflık ölçümü",
          explanation:
            "Bileşen ve miktar belirleme analitik kimyayla ilişkilidir.",
        },
        {
          label: "Üretim süreci",
          explanation:
            "Tesis ölçeğinde enerji ve verim iyileştirme endüstriyel kimyayla ilişkilidir.",
        },
      ],
      answer: "Sırasıyla polimer, analitik ve endüstriyel kimya.",
      check: "Aynı sektörde üç disiplinin birlikte çalışabilmesi tutarlıdır.",
      pitfall: "Sektörün adını kimyanın bir alt dalı yerine kullanma.",
    },
    {
      title: "Karbon içeren her madde organik mi?",
      prompt:
        "CO₂ ile bir organik ilaç molekülünün yalnız karbon içerdiği bilgisiyle aynı kimya alanında sınıflandırılması yeterli midir?",
      strategy: "Genel alan tanımını istisnasız sözcük kuralına dönüştürme.",
      steps: [
        {
          label: "Kuralın sınırı",
          explanation:
            "Organik kimya karbon bileşikleriyle ilgilense de karbonun anorganik bileşikleri de vardır.",
        },
        {
          label: "Karşı örnek",
          explanation: "CO₂ ve karbonatlar anorganik kapsamda ele alınır.",
        },
      ],
      answer: "Hayır; yapı ve madde türü incelenmelidir.",
      check:
        "Doğal veya sentetik oluş da tek başına bu sınıflandırmayı belirlemez.",
      pitfall: "Bir anahtar kelimeyi bütün koşulların yerine koyma.",
    },
  ],
  recall: [
    {
      prompt: "Nitel ve nicel analiz farkı nedir?",
      answer:
        "Nitel: hangi bileşen var? Nicel: ne kadar var? Aynı örnekte ikisi de yapılabilir.",
    },
    {
      prompt: "İlaç sektörü neden tek bir disiplinle eşleşmez?",
      answer:
        "Sentez, miktar/saflık tayini, biyolojik dönüşüm ve üretim süreci farklı sorular ve disiplinler gerektirir.",
    },
    {
      prompt: "Sıcaklığın tepkime hızına etkisi hangi alana örnek?",
      answer:
        "Fizikokimya. Amaç bileşenin miktarını tayin etmek değil fiziksel koşulla hız arasındaki ilişkiyi açıklamaktır.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri, PDF s.14–15 / basılı s.12–13; OGM Dersler Cepte Kimya 9, 1. sayı s.11 ve önceki kaynak karşılaştırması. Sektör–disiplin ve örnek–amaç ayrımlarıyla genişletilmiş özgün öğretim.",
};
export const safetyGuide: LessonGuide = {
  id: "kimya-guvenlik",
  minutes: 40,
  objectives: [
    "Tehlike türüyle maruz kalma koşulunu birlikte değerlendir.",
    "Uyarı işaretlerini işlevleriyle ilişkilendir; yanıcı ile oksitleyiciyi ayır.",
    "Temel laboratuvar araçlarını amaç ve ölçüm hassasiyetine göre seç.",
    "Madde türü, kimyasal biçim, miktar ve çevre ilişkisini genelleme yapmadan açıkla.",
  ],
  sections: [
    {
      title: "Tehlike ve risk aynı bilgi değildir",
      paragraphs: [
        "Bir maddenin tehlikesi zarar verme özelliğidir. Risk değerlendirmesinde miktar, derişim, temas yolu, süre ve kullanılan önlemler de dikkate alınır. Etiketteki işaret tek başına bir deneyin bütün çalışma koşullarını vermez. Maddenin güvenlik bilgi formu ve öğretmenin belirlediği yönerge çalışma koşullarını tamamlar.",
        "‘Kimyasal’ sözcüğü ‘zehirli’ sözcüğüyle eş anlamlı değildir; su da kimyasal maddedir. Buna karşılık doğal oluş güvenli olmayı, hoş koku zararsız olmayı, renksizlik tehlikesiz olmayı kanıtlamaz. Güvenli karar görüntüye değil maddenin tanımlanmış özelliklerine ve kullanım koşuluna dayanır.",
      ],
    },
    {
      title: "Yanıcı ile oksitleyici farklıdır",
      paragraphs: [
        "Alev işareti yangın tehlikesiyle ilişkili sınıfları belirtir. Oksitleyici işaretinde alev bir çember üzerindedir; madde başka maddelerin yanmasını başlatabilir veya şiddetlendirebilir. Oksitleyici olması maddenin kendisinin mutlaka yakıt gibi yanması demek değildir. Oksijenin yanmayı desteklemesi, oksijeni yanıcı bir yakıtla aynı sınıfa koydurmaz.",
        "İşareti gördüğünde adı, tehlikeyi ve uygun önlemi birlikte söyle. Örneğin ateş ve kıvılcım kaynaklarının kontrolü, yanıcı ve oksitleyici maddelerin uygun biçimde ayrı tutulması farklı amaçlara hizmet eder. Aşağıdaki etkileşimli örnekte iki şekli karşılaştır; yalnız alev benzerliğine bakarak aynı cevabı verme.",
      ],
    },
    {
      title: "Diğer işaretleri etkileriyle ayır",
      paragraphs: [
        "Aşındırıcı işareti deri, göz veya bazı malzemelerde aşındırma tehlikesini; kafatası işareti akut toksisiteyi; ünlem işareti tahriş gibi ilgili daha düşük kategorili sağlık tehlikelerini gösterebilir. Göğsünde yıldız biçimi bulunan insan silüeti, belirli ciddi veya uzun süreli sağlık tehlikelerinin işaretidir. Aynı madde birden fazla işaret taşıyabilir.",
        "Patlayan bomba patlama tehlikesiyle, gaz tüpü basınç altındaki gazlarla, ölü balık–ağaç işareti sucul çevre tehlikeleriyle ilişkilidir. Tehlike piktogramıyla zorunlu koruyucu donanım işaretini ayır: gözlük takma işareti alınacak önlemi, kimyasal tehlike işareti maddenin tehlikesini anlatır. Radyasyon işareti ayrı bir uyarı sistemidir; her tehlikeyi aynı simge ailesi sanma.",
      ],
    },
    {
      title: "Çalışma öncesi, sırası ve sonrası",
      paragraphs: [
        "Çalışma öncesinde yönerge, etiket, araçların sağlamlığı ve gerekli koruyucu donanım kontrol edilir. Laboratuvarda yiyecek ve içecek bulundurulmaz; kimyasalın tadına bakılmaz, bilinmeyen madde doğrudan koklanmaz. Pipetle sıvı alma ağızla yapılmaz; uygun pipet yardımcısı kullanılır. Saç ve giysi gibi hareketli parçalar çalışma alanını güvenli tutacak şekilde düzenlenir.",
        "Uygulama sırasında maddeler etiketsiz bırakılmaz; artan madde stok şişesine geri dökülmez, aynı araçla farklı maddeler kirletilmez. Kimyasal atıklar ‘suyla gider’ varsayımıyla lavaboya boşaltılmaz. Atık türü ve kurumun yönergesi izlenir. Çalışma sonrasında düzenek, enerji kaynakları, atıklar ve çalışma yüzeyi yönergeye göre kontrol edilir.",
        "Temizlik ürünleri daha güçlü bir karışım elde etmek için birbirine katılmaz. Özellikle çamaşır suyu ile asitli ürünlerin karıştırılması tehlikeli gaz açığa çıkarabilir. Bir kazada deneyi sürdürmek veya ürünü rastgele başka bir maddeyle nötralleştirmeye çalışmak yerine sorumlu öğretmene haber verilir ve kurumun acil durum planı uygulanır.",
      ],
    },
    {
      title: "Araç seçimi: ne yapmak istiyorsun?",
      paragraphs: [
        "Beher ve erlen karıştırma, aktarma ve uygun koşullarda çözeltiyle çalışma için kullanılır; üzerindeki yaklaşık çizgiler hassas hacim ölçümünün yerine geçmez. Mezür dereceli silindirdir. Pipet belirli küçük hacimleri daha hassas aktarmaya, büret ise kontrollü hacim vermeye ve titrasyonda verilen hacmi izlemeye yarar.",
        "Balon joje belirli son hacimde çözelti hazırlamak için kalibre edilir ve boynunda bir ölçü çizgisi bulunur. Cam balonla aynı araç değildir; balon joje sıradan ısıtma kabı gibi kullanılmaz. Ölçümde hangi aracın kalibre edildiği, hangi hacmi verdiği veya içerdiği ve ölçüm koşulları önemlidir. ‘Üzerinde çizgi var’ tek başına eşit hassasiyet kanıtı değildir.",
        "Spatül katı madde almaya, baget karıştırmaya, huni aktarmaya ve uygun filtreyle süzmeye, ayırma hunisi ise birbiriyle karışmayan sıvı fazları ayırmaya yarar. Havan öğütme, kroze uygun yüksek sıcaklık işlemleri, termometre sıcaklık ölçme amacı taşır. Aynı yuvarlak gövde veya musluk benzerliği aynı görev demek değildir.",
      ],
    },
    {
      title: "Sağlık ve çevrede türü ve miktarı birlikte düşün",
      paragraphs: [
        "Canlıların yapısında ve işleyişinde suya ve çeşitli iyonlara ihtiyaç vardır. Besinlerdeki sodyum iyonuyla metalik sodyum, klorür iyonuyla klor gazı aynı kimyasal tür değildir. Bir elementin adını bilmek, onun her biçiminin aynı etkide olacağını göstermez. Gerekli bir maddenin eksikliği de aşırılığı da sorun oluşturabilir; bu dersteki sınıflandırma kişisel beslenme miktarı belirlemez.",
        "Kurşun ve cıva gibi kirleticilerin çevreye yayılması ve besin zincirine girmesi önemlidir. Bazı azot ve kükürt oksitleri asit yağmurlarıyla, atmosferdeki sera gazlarının artışı iklim değişikliğiyle ilişkilidir. CO ile CO₂ farklı maddelerdir; yalnız ortak C ve O harflerinden aynı sağlık ve çevre etkisi çıkarılmaz. Atığın görünmemesi etkisinin ortadan kalktığını göstermez.",
      ],
    },
  ],
  examples: [
    {
      title: "Alevli iki işaret aynı mı?",
      prompt:
        "Bir etikette alev, diğerinde çember üzerinde alev var. İkinci madde mutlaka bir yakıt mıdır?",
      strategy: "Simgenin tamamını tanı ve tehlikeyi fiille anlat.",
      steps: [
        {
          label: "İlk simge",
          explanation: "Alev, yangınla ilgili tehlike sınıflarını belirtir.",
        },
        {
          label: "Çember üzerinde alev",
          explanation:
            "Oksitleyici maddeyi gösterir; başka maddelerin yanmasını destekleyebilir.",
        },
        {
          label: "Kararı sınırla",
          explanation:
            "Yanmayı desteklemek ile yakıt olarak yanmak aynı özellik değildir.",
        },
      ],
      answer: "Hayır; ikinci simge oksitleyici tehlikeyi gösterir.",
      check:
        "Oksijen yanmayı destekler; tek başına yakıt gibi sınıflandırılmaz.",
      pitfall: "İşaretin yalnız alev parçasına bakıp altındaki çemberi atlama.",
    },
    {
      title: "Hassas son hacim için araç seç",
      prompt:
        "Bir çözeltiyi belirli bir son hacimde hazırlamak için balon joje mi, sıradan beher mi seçilir?",
      strategy: "Karıştırabilmek ile son hacme kalibrasyon farklıdır.",
      steps: [
        {
          label: "İstenen özellik",
          explanation:
            "Belirli son hacmi güvenilir biçimde ayarlamak isteniyor.",
        },
        {
          label: "Araçların rolü",
          explanation:
            "Balon joje belirli hacme kalibredir; beherin çizgileri yaklaşık ölçüm içindir.",
        },
      ],
      answer: "Belirli hacme uygun balon joje.",
      check:
        "Balon joje seçmek onu ısıtma kabı yapmaz. Kullanım koşulu aracın görevine uygun olmalıdır.",
      pitfall:
        "Cam balonla balon jojeyi veya karıştırma kabıyla hassas hacim kabını aynı sayma.",
    },
    {
      title: "İki musluk, iki farklı amaç",
      prompt:
        "Ayırma hunisi ile büretin ikisi de muslukludur. Bu yüzden aynı işlemde birbirinin yerine kullanılabilir mi?",
      strategy: "Görsel benzerlikten önce işlevi ve ölçüm amacını belirle.",
      steps: [
        {
          label: "Ayırma hunisi",
          explanation:
            "Birbiriyle karışmayan sıvı fazları ayırmak için kullanılır.",
        },
        {
          label: "Büret",
          explanation:
            "Kontrollü sıvı verir; verilen hacim izlenir, örneğin titrasyonda kullanılır.",
        },
      ],
      answer: "Hayır; musluk benzerliği görev eşdeğerliği değildir.",
      check:
        "Birinde fazları ayırma, diğerinde hacmi kontrollü verme amacı vardır.",
      pitfall: "Aracı sadece dış görünüşündeki ortak parçaya göre seçme.",
    },
  ],
  recall: [
    {
      prompt: "Doğal bir ürün neden otomatik güvenli sayılmaz?",
      answer:
        "Kaynağı, tehlikeyi ve maruz kalma koşullarını tek başına belirlemez; kimyasal tür ve kullanım koşulu incelenir.",
    },
    {
      prompt: "Atık neden rastgele lavaboya dökülmez?",
      answer:
        "Çevreye, tesisata veya başka maddelerle etkileşime ilişkin riskler bulunabilir. Atık türüne ve kurum yönergesine göre ayrılır.",
    },
    {
      prompt: "Na ile Na⁺ aynı sağlık etkisini varsaydırır mı?",
      answer:
        "Hayır. Element sembolü ortak olsa da metalik sodyumla sodyum iyonu farklı kimyasal türlerdir.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri, PDF s.18–24 / basılı s.16–22; OGM güvenlik konu notlarıyla karşılaştırılan özgün anlatım. Ürünleri karıştırmama ilkesi CDC temizlik rehberiyle kontrol edildi (14.11.2026). Kişisel doz veya deney tarifi verilmez.",
};
