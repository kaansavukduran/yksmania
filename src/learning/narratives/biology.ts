import { bioMolecules } from "./bioMolecules";
import { node as n, type NarrativePack } from "./types";
const subjectId = "tyt-biyoloji";
export const biologyNarratives: NarrativePack[] = [
  {
    id: "canli-ozellikleri",
    topicId: "detail-1",
    subjectId,
    title: "Canlıların ortak özellikleri: tek belirtiyle karar verme",
    minutes: 25,
    source:
      "MEBİ TYT Biyoloji Konu Özetleri, PDF s.11–17 (basılı s.9–15); OGM Dersler Cepte, Biyoloji ve Canlıların Ortak Özellikleri, PDF/basılı s.10–17.",
    objectives: [
      "Hücresel yapı, enerji dönüşümü ve düzenleme arasındaki ilişkiyi kur.",
      "Prokaryot–ökaryot ile tek–çok hücreli ayrımlarını karıştırma.",
      "Bireyin yaşaması, türün devamı ve nesiller boyu uyumu ayır.",
    ],
    body: [
      {
        title: "Canlılık bir özellikler bütünüdür",
        text: "Bir otomobil hareket eder ve yakıt tüketir; kristal büyüyebilir. Bu iki gözlem onları canlı yapmaz. Canlıyı hücresel yapı, düzenlenmiş metabolizma, çevreyle madde ve enerji alışverişi, uyarılara tepki ve kalıtsal bilgi gibi ilişkili özelliklerle değerlendir. Hücre, canlılık işlevlerinin gerçekleştiği en küçük yapısal ve işlevsel birimdir. Virüsleri hücresiz yapıları ve konağa bağımlılıklarıyla ayrı başlıkta ele al; tek bir üreme görüntüsünden bütün canlılık ölçütlerini sağladıklarını çıkarma.",
      },
      {
        title: "İki farklı sınıflama ekseni",
        text: "Prokaryot hücrede zarla çevrili çekirdek ve zarlı organeller bulunmaz; DNA ve ribozom bulunur. Bakteriler ve arkeler bu gruptadır. Ökaryot hücre düzeninde çekirdek ve zarlı organeller vardır; amip, mantar, bitki ve hayvanlar örnektir. Tek hücreli demek prokaryot demek değildir: amip tek hücreli bir ökaryottur. Tek bir özelleşmiş hücrenin istisnasını tüm organizmanın hücre tipine genelleme; olgun memeli alyuvarı gibi örneklerin bağlamını ayrıca kontrol et.",
      },
      {
        title: "Besin üretmek ve ATP üretmek farklı işlerdir",
        text: "Ototrof canlı, inorganik maddelerden organik besin sentezleyebilir; heterotrof organik besini dışarıdan alır. İkisi de kullanılabilir enerjiye ihtiyaç duyar. Yeşil bir bitki fotosentez yaparken aynı zamanda hücresel solunumla ATP üretir; bütün canlılar oksijen kullanmak zorunda değildir. Fermantasyon ile oksijensiz solunumu aynı mekanizma diye birleştirme. Metabolizma, yapım (anabolizma) ve yıkımın (katabolizma) bütünüdür; sindirim bir yıkım örneğidir, hücresel solunumla aynı olay değildir.",
      },
      {
        title: "Denge, hiç değişmemek değildir",
        text: "Homeostazi, değişen koşullara rağmen iç ortamın uygun sınırlar içinde düzenlenmesidir. İnsanda terleme ve buharlaşma, artan sıcaklığın düşmesine katkı verir. Bu örnekten bütün canlıların vücut sıcaklığını aynı değerde tuttuğunu çıkaramazsın. Böbreğin atık uzaklaştırması da su dengesinin korunması da düzenlemeyle ilişkilidir. Boşaltım metabolik atıkları uzaklaştırır; sindirilmemiş besinlerin dışarı atılmasıyla kapsamı aynı değildir. Bitkiler de hareket ve uyarıya tepki gösterir; hareket yalnız yer değiştirme değildir.",
      },
      {
        title: "Birey ve nesil ölçeğini seç",
        text: "Üreme türün devamını sağlar; her bireyin yaşaması için o bireyin mutlaka üremesi gerekmez. Kısır bir birey canlıdır. Büyüme hacim/kütle ve çok hücrelilerde hücre sayısındaki artışla, gelişme işlevsel olgunlaşmayla ilgilidir. Tek hücreli canlının bölünmesi yeni birey oluşturabilir; çok hücreli organizmada her hücre bölünmesi üreme değildir. Adaptasyon kalıtsal özelliklerin nesiller boyunca yaşama ve üreme başarısıyla ilişkilidir; bir insanın bir akşam üşümesi ya da kas geliştirmesi tek başına kalıtsal adaptasyon örneği olmaz.",
      },
    ],
    pitfalls: [
      {
        label: "Her tek hücreli prokaryot değildir",
        reason:
          "Amip tek hücrelidir ama çekirdekli ökaryot düzene sahiptir. İki sınıflama eksenini ayrı oku.",
      },
      {
        label: "Bütün canlılar oksijenli solunum yapmaz",
        reason: "ATP ihtiyacı ortak, ATP üretim yolları farklı olabilir.",
      },
      {
        label: "Her bireyin üremesi zorunlu değildir",
        reason:
          "Üreme türün sürekliliğiyle ilgilidir; kısır bireyin canlılığını ortadan kaldırmaz.",
      },
    ],
    cases: [
      {
        name: "Karanlıkta çimlenen tohum",
        question:
          "Işık almayan bir tohum ilk günlerde büyümek için enerjiyi nasıl bulabilir?",
        conclusion:
          "Depolanmış organik besinler yıkılır, ATP üretilir ve yeni yapıların sentezinde kullanılır. İlk büyüme için o anda fotosentez yapılması zorunlu değildir; büyüme süresiz ve kaynaksız sürmez.",
        nodes: [
          n(
            "Depo besin",
            "Tohumun sınırlı organik rezervidir; yeni besin üretimiyle aynı şey değildir.",
            "plant",
          ),
          n(
            "Hücresel yıkım",
            "Rezervlerin parçalanması kullanılabilir enerji aktarımını sağlar.",
            "molecule",
          ),
          n(
            "ATP kullanımı",
            "Enerji, sentez ve taşıma gibi hücresel işlere aktarılır.",
            "energy",
            "ATP",
          ),
          n(
            "Büyüyen fide",
            "Yapım ve yıkım birlikte sürer; birinin varlığı diğerini dışlamaz.",
            "plant",
          ),
        ],
        links: ["yıkım", "enerji aktarımı", "yapım"],
      },
      {
        name: "Tek hücreli amip",
        question: "Tek hücreli olmak çekirdeğin olmadığını gösterir mi?",
        conclusion:
          "Hayır. Amip tek hücreli bir ökaryottur. Hücre sayısı ve çekirdeğin zarla çevrili olması farklı bilgilerdir.",
        nodes: [
          n(
            "Bir hücre",
            "Organizmanın işlevleri aynı hücre içinde yürütülür.",
            "cell",
          ),
          n(
            "Çekirdek",
            "DNA zarla çevrili çekirdek içinde bulunur.",
            "nucleus",
          ),
          n(
            "Organel iş bölümü",
            "Zarlı organeller farklı işlevlere katkı verir.",
            "molecule",
          ),
          n(
            "Bir organizma",
            "Tek hücreli olması canlılık işlevlerini eksik yaptığı anlamına gelmez.",
            "cell",
          ),
        ],
      },
      {
        name: "Isınan insan",
        question: "Terleme, iç ortamın hiç değişmediğini mi gösterir?",
        conclusion:
          "Hayır. Değişim algılanır, karşı yönde bir yanıt oluşur ve uygun aralığa yaklaşılır. Bu düzenleme homeostazidir.",
        nodes: [
          n(
            "Sıcaklık artışı",
            "Egzersiz gibi bir koşul ısı üretimini artırabilir.",
            "energy",
          ),
          n("Algılama", "Düzenleyici sistem değişime yanıt verir.", "cell"),
          n(
            "Terin buharlaşması",
            "Buharlaşan su çevresinden ısı alır.",
            "water",
          ),
          n(
            "Dengeye yaklaşma",
            "İç ortam dinamik biçimde düzenlenir; her canlı için aynı sıcaklık değeri varsayılmaz.",
            "chart",
          ),
        ],
        links: ["uyaran", "yanıt", "düzenleme"],
      },
    ],
    recall: [
      {
        prompt: "Amip neden ‘tek hücreli = prokaryot’ genellemesini çürütür?",
        answer:
          "Amip tek hücreden oluşur fakat çekirdek ve zarlı organellere sahiptir; dolayısıyla ökaryottur. Hücre sayısıyla hücre tipini aynı ölçüt saymak hatadır.",
      },
      {
        prompt:
          "Kısır bir bireyin canlı olması ile üremenin ortak özellik olması nasıl bağdaşır?",
        answer:
          "Üreme, canlı gruplarında soyun devamını sağlayan süreçtir. Her bireyin kendi yaşamını sürdürmesi için üremesi zorunlu değildir.",
      },
    ],
    modelLimit:
      "Şemalar ilişki ve süreç içindir; gerçek hücre boyutlarını, metabolik hızları veya bütün canlıların tüm istisnalarını göstermez.",
  },
  {
    id: "bilimsel-yontem",
    topicId: "detail-2",
    subjectId,
    title: "Bilimsel yöntem: sorudan kontrollü karşılaştırmaya",
    minutes: 25,
    source:
      "Aurelia TYT Biyoloji Bilimsel Yöntem ve Çalışma Basamakları kopya kağıdı, PDF s.1–7. Kaynağın atıf yaptığı bütün özgün yayınlar ayrıca doğrulanmış sayılmaz.",
    objectives: [
      "Hipotez ile sınanabilir tahmini ayır.",
      "Değiştirilen, ölçülen ve sabit tutulan değişkenleri bul.",
      "Verinin desteklediği sonucu sınırlarıyla ifade et.",
    ],
    body: [
      {
        title: "Bir soru ile başla, tek ezber sıraya kilitlenme",
        text: "Bilimsel çalışma doğal olayları gözlem, ölçüm ve gerekçeli karşılaştırmalarla açıklamaya çalışır. Gözlem, kaydedilen olay veya ölçümdür; çıkarım onun ne anlama geldiğine ilişkin yorumdur. Araştırma her zaman tek çizgili bir basamak dizisi izlemez: beklenmeyen veri soruyu değiştirebilir, önceki bir açıklama yeniden sınanabilir. Soru metninde basamağın sıradaki yerine değil yaptığı işe bak. ‘Bitkiler üç santimetre uzadı’ ölçüm; ‘uzamanın nedeni daha çok ışıktır’ bir açıklama iddiasıdır.",
      },
      {
        title: "Hipotez, tahmin ve ölçüm",
        text: "Hipotez, gözlemler için sınanabilir bir açıklama önerir. Tahmin, hipotez ve koşullar doğruysa ne gözleneceğini söyler. ‘Işık süresi büyümeyi etkiler’ açıklama düzeyindedir; ‘diğer koşullar eşitken altı saat ışık alan grubun ortalama uzaması iki saat alandan yüksek olacak’ bir tahmindir. Tahminin yanlış çıkabilmesini sağlayan ölçülebilir bir sonuç tanımla. Herhangi bir gözlemle uyumlu olacak kadar belirsiz bir önerme, güçlü bir sınama sunmaz.",
      },
      {
        title: "Neyi değiştirdin, neyi ölçtün?",
        text: "Araştırmacının değiştirdiği koşul bağımsız değişken, ölçtüğü yanıt bağımlı değişkendir. Işık süresinin gövde uzamasına etkisinde ışık süresi bağımsız; santimetre cinsinden uzama bağımlıdır. Bitki türü, başlangıç boyu, su ve sıcaklık gibi koşullar mümkün olduğunca eşit tutulur. Kontrol grubu her deneyde ‘hiçbir şey yapılmayan’ grup değildir; anlamlı karşılaştırma için seçilen referanstır. Bir değişkenin adını bulurken ‘hangi soru sınanıyor?’ diye yeniden sor.",
      },
      {
        title: "Karşılaştırmayı bozacak ikinci değişkeni ara",
        text: "Bir gruba hem daha fazla ışık hem daha fazla su verilirse, sonuçtaki farkı yalnız ışığa yükleyemezsin. İki etki karışmıştır. Tek bir saksı yerine tekrarlı örnekler kullanmak bireysel farklılıkların etkisini değerlendirmeye yardım eder; yalnız örnek sayısını artırmak sistematik ölçüm hatasını düzeltmez. Grupların seçimi ve ölçüm yöntemi de önemlidir. Bu konudaki örnek grafikler öğretim için oluşturulmuş varsayımsal verilerdir; yapılmış bir araştırma gibi sunulmaz.",
      },
      {
        title: "Destek, kanıt ve genellemenin sınırı",
        text: "Sonuçlar bir hipotezi destekleyebilir veya onunla çelişebilir; tek çalışma bütün olası koşullarda kesin doğruluk sağlamaz. Birlikte değişen iki özellik doğrudan neden–sonuç ilişkisini kanıtlamaz. Grafikte eksen, birim, örnek sayısı ve karşılaştırılan aralığı oku. Deney dışında kalan türlere veya sıcaklıklara kesin sonuç taşıma. Teori, çok sayıda kanıtı ilişkilendiren açıklayıcı çerçevedir; yasa ise ilişkileri betimleyebilir. Bir teori yeterince bekleyince ‘yasaya dönüşen tahmin’ değildir.",
      },
    ],
    pitfalls: [
      {
        label: "Birlikte değişme tek başına neden değildir",
        reason:
          "Üçüncü bir değişken iki ölçümü de etkiliyor olabilir. Kontrollü karşılaştırma ve araştırma tasarımı gerekir.",
      },
      {
        label: "Tekrar, her hatayı ortadan kaldırmaz",
        reason:
          "Yanlış ayarlanmış cetvelle çok sayıda ölçüm yapmak sistematik yanlılığı sürdürebilir.",
      },
      {
        label: "Teori yasaya terfi etmez",
        reason:
          "Açıklama ve betimleme rolleri farklıdır; bilgi türlerini bir güven sıralaması gibi ezberleme.",
      },
    ],
    cases: [
      {
        name: "Yalnız ışık değişsin",
        question:
          "Su ve sıcaklık sabitken ışık süresi değiştirilirse hangi değişkenin etkisi sınanır?",
        conclusion:
          "Işık süresi bağımsız, uzama bağımlı değişkendir. Bu örnek aralıkta artış gözlenmesi, daha uzun her ışık süresinin her bitkide daha iyi olacağını kanıtlamaz.",
        nodes: [
          n(
            "Araştırma sorusu",
            "Işık süresi ile uzama arasındaki ilişki soruluyor.",
            "document",
          ),
          n(
            "Işık süresi",
            "Araştırmacının ayarladığı koşuldur.",
            "energy",
            "saat",
          ),
          n(
            "Eşit su ve sıcaklık",
            "Diğer etkiler karşılaştırmayı bozmasın diye denetlenir.",
            "water",
          ),
          n(
            "Ölçülen uzama",
            "Aynı süre sonunda aynı yöntemle ölçülür.",
            "chart",
            "cm",
          ),
        ],
        data: {
          labels: ["2 saat", "4 saat", "6 saat"],
          values: [1, 2, 3],
          unit: "cm",
          caption:
            "Aynı sürede ortalama gövde uzaması; özgün varsayımsal örnek veri.",
        },
      },
      {
        name: "Işık ve su birlikte değişsin",
        question:
          "İkinci grup hem daha çok ışık hem daha çok su alıyorsa uzamayı yalnız ışığa bağlayabilir misin?",
        conclusion:
          "Hayır. Işık ile su etkisi karışmıştır. Grupları yeniden kurmak veya etkileri ayrı sınayabilen bir tasarım kullanmak gerekir.",
        nodes: [
          n("Grup A", "Az ışık ve az su alıyor.", "plant"),
          n("Grup B", "Hem ışık hem su miktarı artırıldı.", "plant"),
          n(
            "İki değişiklik",
            "Tek bir koşulun etkisi ayrılamıyor.",
            "document",
            "?",
          ),
          n(
            "Sınırlı çıkarım",
            "Gözlenen farkın hangi etkiden doğduğunu bu tasarım tek başına söylemez.",
            "chart",
          ),
        ],
        data: {
          labels: ["A", "B"],
          values: [1, 4],
          unit: "cm",
          caption:
            "İki koşul birlikte değişti; sayılar tek başına nedensellik sağlamaz.",
        },
      },
      {
        name: "Açıklama ile tahmin",
        question:
          "‘Dört saat ışık alanlar daha çok uzayacak’ sözü ölçülmüş sonuç mudur?",
        conclusion:
          "Henüz değil. Bu bir tahmindir; ölçüm yapıldıktan sonra gözlenen veriyle karşılaştırılır. Sonucun metinde beklenen diye mi, ölçülen diye mi verildiğini kontrol et.",
        nodes: [
          n(
            "Hipotez",
            "Işığın büyüme üzerine etkili olabileceği açıklanıyor.",
            "document",
          ),
          n(
            "Tahmin",
            "Belirli koşullarda beklenen ölçülebilir sonuç söyleniyor.",
            "chart",
          ),
          n("Ölçüm", "Gerçek gözlem kaydediliyor.", "sample"),
          n(
            "Değerlendirme",
            "Beklenen ve gözlenen karşılaştırılıyor.",
            "document",
          ),
        ],
        links: ["koşul kur", "sına", "karşılaştır"],
      },
    ],
    recall: [
      {
        prompt:
          "İki grupta hem sıcaklık hem ışık farklıysa neden tek etkiyi ayıramazsın?",
        answer:
          "Bağımsız olduğu düşünülen iki koşul aynı anda değiştiği için sonuç farkının ne kadarının hangi koşuldan kaynaklandığı belirsizleşir. Tek etki için diğer koşulları denetlemek gerekir.",
      },
      {
        prompt: "Neden teori ile yasa bir merdivenin basamakları değildir?",
        answer:
          "Teori kanıtları açıklayan bir çerçeve, yasa ise gözlenen ilişkiyi betimleyen bir ifade olabilir. Biri yeterince doğrulanınca diğerine dönüşmez.",
      },
    ],
    modelLimit:
      "Grafiklerdeki sayılar özgün öğretim örnekleridir. Gerçek bir bitki deneyi veya deneyden çıkarılmış evrensel büyüme yasası değildir.",
  },
  {
    id: "mineraller",
    topicId: "detail-3",
    subjectId,
    title: "Mineraller: yapı, iyon dengesi ve kofaktör",
    minutes: 20,
    source:
      "MEBİ TYT Biyoloji Konu Özetleri, PDF s.20–21 (basılı s.18–19); OGM Dersler Cepte, Temel Bileşikler I, PDF/basılı s.12–14; Aurelia Mineraller kopya kağıdı PDF s.1–3.",
    objectives: [
      "Mineralin enerji hammaddesi olmasıyla düzenleyici rolünü ayır.",
      "Demir, magnezyum, iyot, fosfor ve kalsiyumu bağlamıyla eşleştir.",
      "Bir mineralin diğerinin yerini tutacağı çıkarımını ele.",
    ],
    body: [
      {
        title: "Az miktar, önemsiz görev demek değildir",
        text: "Mineraller vücudun dış ortamdan aldığı inorganik besin bileşenleridir. Yapıya katılabilir, iyon dengesinde görev alabilir ve bazı enzimlerin çalışmasına yardımcı olabilirler. İnsan için ATP üretiminde organik yakıtın yerini almazlar; bir mineralin ATP ile ilişkili olması, o mineralin yakılarak enerji verdiğini göstermez. Su ve besinlerle alınan her mineralin gereksinimi ve görevleri farklıdır. Bu anlatım görev eşleştirmeyi öğretir; besin desteği dozu veya hastalık tanısı vermez.",
      },
      {
        title: "Bir atom, farklı yapılara katılabilir",
        text: "Demir, hemoglobinin hem grubunda oksijenle ilişkili görev taşır ve bazı elektron aktarım proteinlerinde bulunur. Magnezyum klorofil yapısıyla ve enzim işlevleriyle ilişkilidir; hemoglobinin merkez atomu diye seçilmez. İyot, tiroit hormonlarının yapısına katılır. Fosfor; nükleik asit, ATP ve fosfolipitlerin fosfat gruplarıyla ilişkilidir. Aynı mineralin birden çok görevde bulunması, bütün minerallerin birbirinin yerine geçebileceği anlamına gelmez.",
      },
      {
        title: "Yapısal rol ve düzenleyici rol",
        text: "Kalsiyum kemik ve dişlerin mineral yapısında görev alırken kas kasılması, hücre içi sinyal ve kanın pıhtılaşmasıyla da ilişkilidir. Sodyum ve potasyum gibi iyonların hücre zarının iki tarafındaki dağılımı, sinir ve kas hücrelerinin işlevleri için önemlidir. Bir tabloda yalnız ‘yapıya katılır’ veya yalnız ‘düzenleyici’ başlığını görmekten, mineralin diğer rolü bulunmadığını çıkarma. Rolü, verilen molekül veya olayla birlikte oku.",
      },
      {
        title: "Kofaktör, yakıt değildir",
        text: "Bazı enzimlerin çalışması için metal iyonu gibi protein dışı bir yardımcıya ihtiyaç vardır. Böyle bir inorganik yardımcı kofaktör olabilir. Organik yardımcı koenzimle aynı ad değildir; vitamin kökenli koenzimler bu ayrımı anlamaya yardım eder. Enzim–kofaktör ilişkisinde yardımcı parçanın bulunması, her enzim için aynı mineralin zorunlu olduğu anlamına gelmez. Eksik bir parçanın etkisini değerlendirirken hangi tepkimenin veya yapının etkilendiğine bak.",
      },
      {
        title: "Tablo sorusunu işlev üzerinden çöz",
        text: "Önce metindeki yapı ya da olayı işaretle: hemoglobin, klorofil, tiroit hormonu, ATP veya sinir iletimi. Sonra mineral–işlev eşleşmesini kontrol et. ‘En çok bulunan her işi yapar’ ve ‘daha fazla alınması daima daha iyidir’ gibi genellemeleri kullanma. Bir mineralin eksikliğiyle verilen belirti, tek başına kişide tanı koymaya yetmez; sınav sorusundaki kapalı bağlam ile gerçek sağlık değerlendirmesi farklıdır.",
      },
    ],
    pitfalls: [
      {
        label: "Mineral ATP’nin yakıtı değildir",
        reason:
          "Fosfat ATP’nin yapısında, magnezyum birçok enzim işlevinde bulunabilir; bu, mineralin organik besin gibi parçalanarak enerji verdiği anlamına gelmez.",
      },
      {
        label: "Demir ile magnezyumu değiş tokuş etme",
        reason: "Hemoglobin–Fe, klorofil–Mg bağlamları farklıdır.",
      },
      {
        label: "Her kofaktör koenzim değildir",
        reason:
          "İnorganik metal iyonu ve organik yardımcı molekül aynı alt grupta değildir.",
      },
    ],
    cases: [
      {
        name: "Demir ve hemoglobin",
        question:
          "Hemoglobinin demirle ilişkisi, demirin hücreye enerji veren yakıt olduğunu mu gösterir?",
        conclusion:
          "Hayır. Demir yapısal/işlevsel bir parçadır. Oksijen taşınması enerji metabolizmasını etkileyebilir; bu dolaylı ilişki demiri organik yakıt yapmaz.",
        nodes: [
          n("Demir", "Hem grubuyla ilişkili elementtir.", "molecule", "Fe"),
          n(
            "Hemoglobin",
            "Oksijenin taşınmasına katkı verir.",
            "molecule",
            "Hb",
          ),
          n(
            "Oksijen taşınması",
            "Hücrelerin oksijen erişimini etkileyen bir basamaktır.",
            "molecule",
            "O₂",
          ),
          n(
            "Hücresel işlev",
            "Yakıt, oksijen ve enzim rolleri ayrı değerlendirilir.",
            "cell",
          ),
        ],
      },
      {
        name: "Magnezyum ve klorofil",
        question:
          "Yeşil pigment ile ilişkili mineral neden otomatik olarak demir seçilmez?",
        conclusion:
          "Klorofildeki merkez mineral magnezyumdur. Yapı adını okuyup doğru eşlemeyi seç; benzer biyolojik önem, aynı kimyasal bileşim demek değildir.",
        nodes: [
          n("Magnezyum", "Klorofil yapısında yer alır.", "molecule", "Mg"),
          n("Klorofil", "Işığın soğurulmasıyla ilişkili pigmenttir.", "plant"),
          n(
            "Işık enerjisi",
            "Enerjinin kaynağı mineralin parçalanması değildir.",
            "energy",
          ),
          n(
            "Fotosentez bağlamı",
            "Pigment, mineral ve enerji kaynağı farklı rollerdedir.",
            "plant",
          ),
        ],
      },
      {
        name: "Fosfat içeren yapılar",
        question:
          "DNA, ATP ve fosfolipidin ortak mineral bağlantısı hangi gruptur?",
        conclusion:
          "Üçünde de fosfat içeren yapılar bulunur. Ancak ATP enerji aktarımıyla, DNA bilgiyle, fosfolipit zar yapısıyla ilişkilidir; ortak parça bütün molekülleri aynı işlevli yapmaz.",
        nodes: [
          n("Fosfor", "Fosfat gruplarında bulunur.", "molecule", "P"),
          n(
            "Fosfat grubu",
            "Farklı büyük moleküllerin bir parçası olabilir.",
            "molecule",
            "PO₄",
          ),
          n(
            "DNA · ATP · zar",
            "Ortak bileşene rağmen farklı yapılardır.",
            "molecule",
          ),
          n(
            "İşlevi bağlamla bul",
            "Bilgi, enerji aktarımı ve zar işlevlerini ayrı tut.",
            "document",
          ),
        ],
      },
    ],
    recall: [
      {
        prompt:
          "Minerallerin enerji metabolizmasında görev alması neden ‘enerji verir’ demek değildir?",
        answer:
          "Yapısal parça veya enzim yardımcısı olarak bir süreci mümkün kılmak, enerji sağlayan yakıt olarak parçalanmaktan farklıdır.",
      },
      {
        prompt:
          "Bir mineral eksikliği neden rastgele başka bir mineralle giderilemez?",
        answer:
          "Molekül ve enzimlerde atom/iyon türüne özgü ilişkiler vardır. Demir, magnezyum ve iyot aynı biyolojik parçanın değiştirilebilir adları değildir.",
      },
    ],
    modelLimit:
      "Semboller işlev eşleştirmesidir; gerçek molekül geometrisi, bireysel gereksinim veya klinik tedavi modeli göstermez.",
  },
  ...bioMolecules,
];
