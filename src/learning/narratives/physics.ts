import { node as n, type NarrativePack } from "./types";

export const physicsNarratives: NarrativePack[] = [
  {
    id: "fizik-bilimine-giris",
    topicId: "detail-114",
    subjectId: "tyt-fizik",
    title: "Fizik bilimine giriş: ölç, modelle, sınırını bil",
    minutes: 25,
    source:
      "OGM 9. Sınıf Fizik Bilimine Giriş konu özeti, PDF s.1; Aurelia TYT Fizik Fizik Bilimine Giriş kopya kağıdı, PDF s.1–5. Kurum örnekleri kaynak bağlamındadır; güncel proje veya yönetim iddiası değildir.",
    objectives: [
      "Gözlem, model, çıkarım ve ölçümü ayır.",
      "Yedi SI temel büyüklüğünü birimleriyle eşleştir.",
      "Skaler–vektörel ile temel–türetilmiş ayrımlarını bağımsız kullan.",
    ],
    body: [
      {
        title: "Fizik sorusu ölçülebilir ilişki arar",
        text: "Fizik; madde, enerji, hareket ve etkileşimleri modeller ve kanıtlarla inceler. Gözlem başlangıç sağlar, fakat bir olayın ardından başka bir olay görülmesi tek başına neden–sonuç kanıtı değildir. Öngörü belirli koşullarda sınanır; ölçümün belirsizliği ve modelin kapsamı belirtilir. Sürtünmesiz yüzey, noktasal cisim veya ideal gaz gerçekliğin bütün ayrıntısı değil, belirli soruları çözmek için kullanılan kabullerdir. Bir model bazı koşullarda başarılı olduğu için her ölçekte ve her ortamda aynen kullanılamaz.",
      },
      {
        title: "Alanları sorudaki mekanizmaya göre ayır",
        text: "Mekanik hareket ve kuvveti; termodinamik ısıl süreçleri; optik ışığı; elektromanyetizma elektrik ve manyetik olayları inceler. Atom fiziği atomun yapısı ve enerji düzeyleriyle, nükleer fizik çekirdek ve çekirdek tepkimeleriyle ilgilenir. Katıhal fiziği kristal ve yarı iletken gibi katıların özelliklerini, yüksek enerji ve plazma fiziği ilgili enerji ölçeklerini ve iyonlaşmış ortamları ele alır. Bir teknolojinin birden fazla alanla ilişkisi olabilir: tıbbi görüntülemenin yöntemi değiştikçe fiziksel mekanizması da değişir. Yalnız cihaz adını ezberlemek yerine ‘hangi etkileşim kullanılıyor?’ diye sor.",
      },
      {
        title: "Yedi temel büyüklük; yedi temel birim",
        text: "SI sisteminde uzunluk metre (m), kütle kilogram (kg), zaman saniye (s), elektrik akımı amper (A), termodinamik sıcaklık kelvin (K), madde miktarı mol (mol), ışık şiddeti kandela (cd) ile ifade edilir. Birim simgelerinin büyük–küçük harfi anlamlıdır: kelvin K, saniye s yazılır; K’nin önüne derece işareti konmaz. Kilogramın temel birim olması, gramın hiç kullanılamayacağı anlamına gelmez; hesapta tutarlı birim seçmek gerekir. Madde miktarı ile kütle aynı büyüklük değildir.",
      },
      {
        title: "Türetilmiş olmak, daha az önemli olmak değildir",
        text: "Alan m², hacim m³, sürat m/s ve yoğunluk kg/m³ gibi büyüklükler temel büyüklüklerden türetilir. Kuvvetin birimi newtondur: N=kg·m/s². Enerjinin joule, gücün watt olması onların ayrı SI temel büyüklükleri olduğu anlamına gelmez. Denklemde iki tarafın birimleri uyumlu olmalıdır; fakat birim uyumu tek başına katsayının veya fiziksel modelin doğru olduğunu kanıtlamaz. ‘Mesafe bölü zaman’ hız boyutundadır; sorunun yön bilgisi ve hangi mesafeyi kullandığı ayrıca incelenir.",
      },
      {
        title: "İki sınıflamayı çapraz kontrol et",
        text: "Skaler büyüklük değer ve birimle, vektörel büyüklük ayrıca yön bilgisiyle tanımlanır. Kütle ve sıcaklık skaler; yer değiştirme, hız, ivme ve kuvvet vektöreldir. Alınan yol ve sürat skaler, yer değiştirme ve hız vektöreldir. Temel–türetilmiş ayrımı ise büyüklüğün diğer büyüklüklerden tanımlanmasıyla ilgilidir: sürat hem türetilmiş hem skaler, kuvvet hem türetilmiş hem vektöreldir. Negatif bir sayı görmek otomatik olarak ‘vektör’ demek değildir; −5 °C skaler sıcaklık değeridir. Vektörlerde eksi işareti seçilen eksenin ters yönünü gösterebilir.",
      },
      {
        title: "Ölçümün yanında yöntemini de söyle",
        text: "Bir ölçüm yalnız sayı değildir; birim, kullanılan araç, çözünürlük ve koşullar sonucu etkiler. Çok haneli sonuç yazmak ölçümü kendiliğinden daha hassas yapmaz. Tekrarlı ölçümler rastgele değişimi değerlendirmeyi kolaylaştırır, fakat yanlış ayarlanmış bir aracın sistematik hatasını mutlaka ortadan kaldırmaz. TÜBİTAK, TENMAK, ASELSAN, CERN ve NASA gibi kurumlar kaynakta bilim–teknoloji örnekleri olarak yer alır; görevleri aynı değildir. Bir uygulamayı değerlendirirken fizik ilkesi, mühendislik çözümü ve araştırma kurumunun rolünü ayrı düşün.",
      },
    ],
    pitfalls: [
      {
        label: "Temel ile skaler eş anlamlı değildir",
        reason:
          "Biri tanımsal bağımlılığı, diğeri yön bilgisini anlatır. İki sınıflamayı ayrı uygula.",
      },
      {
        label: "Negatif sayı tek başına vektör kanıtı değildir",
        reason:
          "Sıcaklık negatif ifade edilebilir ve skalerdir; yön gereksinimi tanıma bağlıdır.",
      },
      {
        label: "Atom ile çekirdeği karıştırma",
        reason:
          "Elektron enerji düzeyleri atom fiziğiyle, çekirdekteki dönüşümler nükleer fizikle ilişkilendirilir.",
      },
    ],
    cases: [
      {
        name: "İki ayrı etiket",
        question: "Sürat neden hem skaler hem türetilmiştir?",
        conclusion:
          "Süratte yön bilgisi bulunmaz; bu yüzden skaler. Uzunluk ve zamandan tanımlandığı için türetilmiştir. Etiketler birbiriyle yarışmaz.",
        nodes: [
          n("Yol", "Uzunluk boyutunda, skaler.", "number", "m"),
          n("Zaman", "SI temel büyüklüğü.", "number", "s"),
          n("Yol / zaman", "Sürat için ortalama tanımı.", "chart"),
          n("m/s", "Türetilmiş ve skaler.", "number", "m/s"),
        ],
      },
      {
        name: "Modelin kabulü",
        question:
          "Sürtünmesiz yüzey kabulü gerçek yüzeyi tamamen anlattığı anlamına gelir mi?",
        conclusion:
          "Hayır. Sürtünmenin etkisi ihmal edilerek belirli ilişkiyi görmek amaçlanır. Gerçek deneyle fark oluştuğunda kabul ve ölçüm koşulları değerlendirilir.",
        nodes: [
          n("Gerçek yüzey", "Birden fazla etki bulunur.", "sample"),
          n("Sadeleştirme", "Soruda sürtünme ihmal edilir.", "document"),
          n("Öngörü", "Seçilen modele göre hesap yapılır.", "chart"),
          n("Karşılaştırma", "Fark varsa varsayımlara dön.", "document"),
        ],
      },
      {
        name: "Birim denetimi",
        question: "Kuvvetin N birimi temel büyüklük olduğunu mu gösterir?",
        conclusion:
          "Özel birim adı ayrı bir SI temel büyüklüğü oluşturmaz. N=kg·m/s² olarak temel birimlerle yazılabilir.",
        nodes: [
          n("Kütle", "kg.", "number", "kg"),
          n("İvme", "m/s².", "number", "m/s²"),
          n("Çarpım", "Kütle × ivme.", "chart"),
          n("Newton", "kg·m/s² için özel birim adı.", "number", "N"),
        ],
      },
    ],
    recall: [
      {
        prompt: "Kütle, sürat ve kuvveti iki sınıflamayla ayır.",
        answer:
          "Kütle temel ve skaler; sürat türetilmiş ve skaler; kuvvet türetilmiş ve vektöreldir. Temel–türetilmiş ile skaler–vektörel farklı ölçütlerdir.",
      },
      {
        prompt: "Bir ölçümün tekrar edilmesi neden her hatayı düzeltmez?",
        answer:
          "Tekrarlı ölçümler rastgele değişimi görmeyi sağlar; yanlış kalibrasyon gibi sistematik bir etki bütün ölçümleri aynı yönde etkileyebilir.",
      },
    ],
    modelLimit:
      "Şemalar büyüklük ve yöntem ilişkilerini gösterir; gerçek deney ölçümü değildir. Kurum örnekleri güncel faaliyetlerin eksiksiz listesi değildir.",
  },
  {
    id: "madde-ozkutle",
    topicId: "detail-115",
    subjectId: "tyt-fizik",
    title: "Madde ve özellikleri: kütleden yoğunluğa",
    minutes: 35,
    source:
      "OGM Dersler Cepte 9. Sınıf Madde ve Özkütle – Dayanıklılık – Yapışma ve Birbirini Tutma – Kılcallık, PDF s.10–17. Karışım ve dayanıklılık bağıntıları kabulleri belirtilerek açıklanmıştır.",
    objectives: [
      "Kütle, hacim, ağırlık ve yoğunluğu ayır.",
      "Yoğunluk grafiklerini ve birim dönüşümlerini yorumla.",
      "Dayanıklılık, adezyon, kohezyon ve kılcallığı koşullarıyla ilişkilendir.",
    ],
    body: [
      {
        title: "Kütle ağırlıkla aynı değildir",
        text: "Madde kütlesi ve hacmiyle ele alınır. Kütle kg ile, ağırlık bir kuvvet olarak N ile ifade edilir; ağırlık yerçekimi alanına bağlıdır. Aynı cismin kütlesi farklı gezegenlerde aynı kabul edilirken ağırlığı değişebilir. Katı, sıvı ve gazların tanecik düzenleri ve sıkıştırılabilirlikleri farklıdır. Sıvı kabın şeklini alır, fakat mutlaka kabın tamamını doldurmaz; gaz uygun koşullarda kabın kullanılabilir hacmine yayılır. Hacim ve yoğunluk sıcaklık ile basınç koşullarından etkilenebilir.",
      },
      {
        title: "Hacim ölçerken boşluk ve batma koşuluna bak",
        text: "Dikdörtgenler prizmasında hacim üç dik kenarın çarpımıdır. 1 L=1 dm³=1000 cm³ ve 1 mL=1 cm³’tür. Uzunluk dönüşümünü hacimde aynen kullanma: 1 m=100 cm ise 1 m³=1 000 000 cm³ olur. Dereceli kapta su seviyesi farkı, cismin sıvı içinde yer kaplayan hacmini verir. Cisim tamamen batmış, çözünmemiş ve sıvı emmemişse bu fark dış hacmi ölçmekte kullanılabilir. Yüzen bir cisimde yalnız batmış kısmın hacmini görürsün; onu toplam hacim sanma.",
      },
      {
        title: "Özkütle oranı neden miktara bağlı değildir?",
        text: "Özkütle ya da yoğunluk ρ=m/V ile tanımlanır. Aynı saf maddenin aynı hâl, sıcaklık ve basınçta iki kat miktarı alındığında kütle ve hacim birlikte iki katına çıkar; oran değişmez. Bu koşullar altında yoğunluk ayırt edici özellik olarak kullanılabilir. Aynı yoğunluk tek başına iki örneğin kesin aynı madde olduğunu kanıtlamaz. m–V grafiğinde düşey eksen kütle ve yatay eksen hacimse doğrunun eğimi yoğunluktur; eksenler ters çevrilirse eğim 1/ρ olur. Modelde hem kütleyi hem hacmi değiştirerek sabit oranı gör.",
      },
      {
        title: "Birimleri ve karışım kabulünü açık yaz",
        text: "1 g/cm³=1000 kg/m³’tür; sayı birimiyle birlikte anlam taşır. Yoğunluğu 2 g/cm³ olan 30 cm³ örneğin kütlesi 60 g’dır. Bir karışımda toplam kütle korunuyorsa ρkarışım=mtoplam/Vson kullanılır. Vson’un hacimlerin toplamı olması ayrıca bir kabuldür; bazı sıvılar karışınca hacim büzülmesi olabilir. Hacimlerin toplandığı eşit hacimli iki sıvı modelinde yoğunluk aritmetik ortalamadır. Eşit kütleli örneklerde aynı ortalama kullanılamaz; hacimleri m/ρ ile ayrı hesaplanır. Ölçülen son hacim varsa kabule değil o değere başvur.",
      },
      {
        title: "Boyut büyütme ve dayanıklılık",
        text: "Aynı maddeden, benzer biçimde oluşturulan ve kendi ağırlığı altında incelenen cisimlerde boyut L ile ölçeklenirse kesit alanı L², hacim ve ağırlık L³ ile değişir. Kesit/hacim oranı 1/L ile azalır. Bu nedenle tüm boyutları iki katına çıkan modelin kesiti dört, hacmi sekiz katına çıkar; kendi ağırlığına göre dayanıklılık ölçütü yarıya iner. Bu, büyük cismin mutlak olarak daha az kuvvet taşıdığı demek değildir. Malzeme, biçim, yükleme yönü ve iç yapı değişirse bu basit benzerlik modeli doğrudan kullanılamaz.",
      },
      {
        title: "Yapışma, yüzey ve kılcal boru",
        text: "Kohezyon aynı tür tanecikler arasındaki, adezyon farklı maddelerin tanecikleri arasındaki çekimle ilişkilidir. Sıvının bir yüzeyi ıslatması bu etkileşimler ve yüzey koşullarıyla açıklanır. Yüzey gerilimi sıvı yüzeyinin alanını artırmaya karşı enerji gereksinimiyle ilgilidir; yüzey sert bir zar değildir. Su–cam örneğinde kılcal boruda yükselme, cıva–cam örneğinde alçalma görülebilir. Aynı sıvı, boru malzemesi ve koşullarda dar boruda seviye farkının büyüklüğü daha fazladır. ‘Her sıvı her dar boruda yükselir’ diye genelleme yapma; sıcaklık ve yüzeye eklenen maddeler sonucu değiştirebilir.",
      },
    ],
    pitfalls: [
      {
        label: "Büyük kütle otomatik büyük yoğunluk değildir",
        reason:
          "Yoğunluk oran olduğundan hacimle birlikte karşılaştırılır. Aynı koşuldaki madde miktarı değişebilir.",
      },
      {
        label: "Karışımda son hacmi varsayma",
        reason:
          "Hacimlerin toplandığı açıkça verilmedikçe yoğunluğu yalnız başlangıç hacimleriyle hesaplamak hatalı olabilir.",
      },
      {
        label: "Dar boru her sıvıyı yükseltmez",
        reason:
          "Yükselme veya alçalma sıvı–yüzey etkileşimine bağlıdır; daralma seviye farkının büyüklüğünü etkiler.",
      },
    ],
    cases: [
      {
        name: "Aynı maddenin iki örneği",
        question: "Kütle de hacim de iki katına çıkarsa yoğunluk ne olur?",
        conclusion:
          "m/V oranı değişmez. Koşullar ve madde aynıysa miktar artışı yoğunluk artışı demek değildir.",
        nodes: [
          n("30 g / 10 cm³", "Yoğunluk 3 g/cm³.", "sample"),
          n("İki kat miktar", "Hem kütle hem hacim artar.", "chart"),
          n("60 g / 20 cm³", "Oran yine 3 g/cm³.", "sample"),
          n("Aynı eğim", "m–V grafiğinde yoğunluk sabittir.", "chart"),
        ],
      },
      {
        name: "Karışımın şartı",
        question:
          "Yoğunlukları 1 ve 3 g/cm³ olan eşit hacimler hangi koşulda 2 g/cm³ verir?",
        conclusion:
          "Her birinden 10 cm³ alınırsa toplam kütle 10+30=40 g. Son hacim 20 cm³ ise sonuç 2 g/cm³ olur. Son hacim farklıysa bu sonuç da değişir.",
        nodes: [
          n("Birinci örnek", "10 cm³ × 1 g/cm³ = 10 g.", "sample"),
          n("İkinci örnek", "10 cm³ × 3 g/cm³ = 30 g.", "sample"),
          n(
            "Son hacmi kontrol et",
            "20 cm³ olduğu kabul ediliyor.",
            "document",
          ),
          n("40 / 20", "Bu kabul altında 2 g/cm³.", "number", "2"),
        ],
      },
      {
        name: "Ölçeği ikiye katla",
        question: "Benzer cismin kesit/hacim oranı neden yarıya iner?",
        conclusion:
          "Alan dört, hacim sekiz kat olur. Oran 4/8=1/2’dir; bu, aynı malzeme ve biçimde kendi ağırlığına göre yapılan bir karşılaştırmadır.",
        nodes: [
          n(
            "Boyut ×2",
            "Her doğrusal uzunluk iki katına çıkar.",
            "number",
            "2",
          ),
          n("Kesit ×4", "Alan uzunluğun karesiyle ölçeklenir.", "chart"),
          n("Hacim ×8", "Hacim uzunluğun küpüyle ölçeklenir.", "sample"),
          n(
            "Oran ×1/2",
            "Mutlak taşıma kuvvetiyle özdeş değildir.",
            "number",
            "½",
          ),
        ],
      },
    ],
    recall: [
      {
        prompt:
          "80 g ve 20 cm³ örneğin yoğunluğunu bul; miktarı yarıya inse ne olur?",
        answer:
          "ρ=80/20=4 g/cm³. Aynı madde ve koşullarda 40 g ile 10 cm³ kalır; yoğunluk yine 4 g/cm³ olur.",
      },
      {
        prompt:
          "Yüzen cismin su seviyesinde oluşturduğu artış neden toplam hacmi olmayabilir?",
        answer:
          "Yer değiştiren sıvı hacmi cismin suya batmış kısmına karşılık gelir. Su üstünde kalan bölümün hacmi bu ölçüme dahil değildir.",
      },
    ],
    modelLimit:
      "Yoğunluk keşfi seçilen pozitif kütle ve hacimlerden oran hesaplar; gerçek madde türünü, yüzme koşulunu veya sıcaklık etkisini simüle etmez. Dayanıklılık için benzer biçim ve aynı malzeme kabul edilir.",
  },
  {
    id: "dogrusal-hareket",
    topicId: "detail-116",
    subjectId: "tyt-fizik",
    title: "Doğrusal hareket: yol, yön ve grafik",
    minutes: 35,
    source:
      "OGM Dersler Cepte 9. Sınıf Hareket ve Çeşitleri – Konum, Alınan Yol, Yer Değiştirme, Sürat ve Hız – Düzgün Doğrusal Hareket, PDF s.10–16. İşaretli alan ve ortalama tanımları eksen seçimiyle açıklanmıştır.",
    objectives: [
      "Referans noktası ve pozitif yönü belirle.",
      "Yol–yer değiştirme ve sürat–hız ayrımını hesapla.",
      "Konum, hız ve ivme grafiklerinde eğim ve alanı doğru yorumla.",
    ],
    body: [
      {
        title: "Hareket gözlemci ve referansla tanımlanır",
        text: "Bir cismin seçilen referansa göre konumu zamanla değişiyorsa o referansa göre hareketlidir. Trende oturan yolcu trene göre durgun, yere göre hareketli olabilir. Doğrusal harekette bir başlangıç noktası ve pozitif eksen yönü seçilir. x konum, Δx=xson−xilk yer değiştirmedir. Negatif konum cismin eksenin eksi tarafında olduğunu, negatif hız ise eksi yönde hareket ettiğini belirtir; bunlar aynı bilgi değildir. Bir cisim negatif konumdayken pozitif yönde ilerleyebilir.",
      },
      {
        title: "Gittiğin yol ile vardığın yer aynı şey değil",
        text: "Alınan yol hareket boyunca geçilen uzunlukların toplamıdır ve negatif olmaz. Yer değiştirme başlangıçtan sona yönlü değişimdir; ara güzergâhı içermez. +8 m gidip −3 m geri gelen cismin yolu 11 m, yer değiştirmesi +5 m’dir. Başlangıca dönerse yer değiştirme sıfır olsa da yol sıfır olmak zorunda değildir. Her zaman yol ≥ |yer değiştirme| olur. Tek doğrultuda yön değiştirmeden ilerleyen hareketlerde eşitlik sağlanır.",
      },
      {
        title: "İki ortalamanın payları farklı",
        text: "Ortalama sürat toplam yol/toplam zaman, ortalama hız toplam yer değiştirme/toplam zamandır. Az önceki 8 m ileri, 3 m geri hareket toplam 5 s sürerse ortalama sürat 11/5=2,2 m/s; ortalama hız +5/5=+1 m/s olur. Zaman pozitif olmalı ve bekleme varsa toplam süreye dahil edilmelidir. İki bölümün süratinin aritmetik ortalaması yalnız eşit süreli bölümlerde uygun sonucu verir. Eşit yollarda farklı süreler oluşacağı için toplam yol/toplam zaman kullanılır. 36 km/h=10 m/s dönüşümünde kilometre ve saati birlikte dönüştürürüz.",
      },
      {
        title: "Düzgün hareket ve ivme",
        text: "Doğrusal harekette hız sabitse eşit zaman aralıklarında eşit yer değiştirme vardır: x=x0+vt. İvme a=Δv/Δt hız değişimini ifade eder; ortalama ivme bu oranla tanımlanır. Hızın büyüklüğü sabit, yönü değişiyorsa vektörel hız değişebilir; doğrusal modelin dışındaki dönüşlerde bu ayrım önemlidir. Hız ve ivme aynı işaretliyse sürat artar, zıt işaretliyse o aralıkta sürat azalır. Negatif ivme tek başına yavaşlama demek değildir: v<0 ve a<0 iken sürat büyür. İvmenin sıfır olması hızın sıfır olmasını gerektirmez.",
      },
      {
        title: "Grafik okurken önce eksenlere bak",
        text: "Konum–zaman grafiğinin eğimi hızdır. Hız–zaman grafiğinde eğim ivme, işaretli alan yer değiştirmedir. Yol için hız–zaman grafiğindeki alanların mutlak büyüklükleri toplanır. Zaman ekseninin altındaki hız alanı ‘negatif yol’ değildir; eksi yönlü yer değiştirme katkısıdır. İvme–zaman grafiğinin işaretli alanı hız değişimini verir. Grafiğin çizgisi gerçek yolun haritası değildir: konum–zaman grafiğinde aşağı eğimli çizgi cismin yokuş aşağı indiğini değil, konumunun zamanla azaldığını gösterir.",
      },
      {
        title: "İşaret ve birimle son kontrol",
        text: "Çözüme referans ve yön yazarak başla; sonra başlangıç–son konumları, süreleri ve yön değişimlerini ayrı kaydet. Eksi işaretini işlemin sonunda rastgele ekleme. Birimler hızda m/s, ivmede m/s² olmalıdır. Örneğin v=−4 m/s iken a=+2 m/s², iki saniye sonra v=0 verir; aynı ivme sürerse bundan sonra pozitif yönde sürat artar. ‘Yavaşlıyor’ ifadesi bütün sonsuz süre için geçerli değildir. İki parçalı keşifte her parçada hız sabit kabul edilir; gerçek dönüş anının kısa süreli ivmesi ayrıca modellenmez.",
      },
    ],
    pitfalls: [
      {
        label: "Ortalama hız ile ortalama sürat farklı olabilir",
        reason:
          "Birinde yer değiştirme, diğerinde yol paya yazılır. Aynı toplam süre kullanılır.",
      },
      {
        label: "Negatif ivme her zaman yavaşlatmaz",
        reason:
          "Sürat değişimi hızın ve ivmenin birlikte işaretine bağlıdır. İkisi negatifse sürat artabilir.",
      },
      {
        label: "Grafiğin alanı her grafikte yol değildir",
        reason:
          "v–t işaretli alanı yer değiştirme, a–t alanı hız değişimi verir. Önce eksen ve birimi oku.",
      },
    ],
    cases: [
      {
        name: "Geri dönmek",
        question: "8 m ileri ve 3 m geri gidilirse neden iki ayrı sonuç var?",
        conclusion:
          "Yol |8|+|−3|=11 m, yer değiştirme 8−3=+5 m. İlki geçilen uzunluk, ikincisi son konum değişimidir.",
        nodes: [
          n("Başlangıç 0", "Pozitif yön sağa seçildi.", "number", "0"),
          n("İlk bölüm +8 m", "Konum +8 m’ye gelir.", "chart"),
          n("İkinci bölüm −3 m", "Son konum +5 m olur.", "chart"),
          n("Yol 11, Δx +5", "İki farklı büyüklük hesaplandı.", "number"),
        ],
      },
      {
        name: "Başlangıca dönüş",
        question:
          "Toplam 20 m yol alan bir hareketin ortalama hızı sıfır olabilir mi?",
        conclusion:
          "Evet. Başlangıca dönmüşse yer değiştirme sıfırdır. Pozitif toplam sürede ortalama hız sıfır, ortalama sürat ise pozitiftir.",
        nodes: [
          n("İleri 10 m", "İlk parça pozitif.", "chart"),
          n("Geri 10 m", "İkinci parça negatif.", "chart"),
          n("Yer değiştirme 0", "Başlangıç ve son konum aynı.", "number", "0"),
          n("Yol 20 m", "Geçilen uzunluklar iptal olmaz.", "number", "20"),
        ],
      },
      {
        name: "Eksi hız ve eksi ivme",
        question: "v=−2 m/s, a=−1 m/s² iken bir saniye sonra sürat artar mı?",
        conclusion:
          "Hız −3 m/s olur; sürat 2’den 3 m/s’ye çıkar. Eksi yön ile yavaşlamayı birbirine eşitleme.",
        nodes: [
          n("v₀ = −2", "Başlangıç hareketi eksi yönde.", "number", "−2"),
          n("Δv = −1", "Bir saniyelik hız değişimi.", "number", "−1"),
          n("v = −3", "Hız daha negatif oldu.", "number", "−3"),
          n("Sürat 3", "Hız büyüklüğü arttı.", "number", "3"),
        ],
      },
    ],
    recall: [
      {
        prompt:
          "Bir tur sonunda başlangıca dönen koşucunun yolu ve yer değiştirmesi için ne söylersin?",
        answer:
          "Koşu boyunca aldığı yol pozitiftir; başlangıç ve son konumu aynı olduğundan yer değiştirmesi sıfırdır. Toplam pozitif sürede ortalama hızı sıfır, ortalama sürati pozitiftir.",
      },
      {
        prompt:
          "Hız–zaman grafiğinin altında kalan eksi alanı yol hesabında nasıl kullanırsın?",
        answer:
          "Yer değiştirmede işaretiyle toplarım; yol için her bölgenin alan büyüklüğünü toplarım. Eksi alan negatif yol değil, eksi yönde yer değiştirme katkısıdır.",
      },
    ],
    modelLimit:
      "Keşif bir boyutta iki sabit hızlı parçayı kullanır. Dönüş anındaki ivme, sürtünme ve gerçek deney belirsizliği modellenmez; animasyon ölçüm değildir.",
  },
];
