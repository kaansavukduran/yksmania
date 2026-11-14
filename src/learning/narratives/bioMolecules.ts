import { node as n, type NarrativePack } from "./types";
const subjectId = "tyt-biyoloji";
const part1 =
  "OGM Dersler Cepte, Canlıların Yapısında Bulunan Temel Bileşikler I";
const part2 =
  "OGM Dersler Cepte, Canlıların Yapısında Bulunan Temel Bileşikler II";
export const bioMolecules: NarrativePack[] = [
  {
    id: "su-asit-baz-tuz",
    topicId: "detail-4",
    subjectId,
    title: "Su, asit–baz ve tuz: etkileşimden iç dengeye",
    minutes: 25,
    source: `${part1}, PDF/basılı s.10–12.`,
    objectives: [
      "Suyun kutupluluğunu çözücü ve ısıl özellikleriyle ilişkilendir.",
      "pH değerini asitlik, bazlık ve on katlık değişimle yorumla.",
      "İyon, tuz ve organik yakıt rollerini ayır.",
    ],
    body: [
      {
        title: "Aynı su molekülünün iki farklı etkileşimi",
        text: "Su molekülünün O–H bağları kovalenttir; moleküller arasında hidrojen bağları kurulabilir. Molekül içindeki bağ ile moleküller arası etkileşimi ayır. Suyun kutuplu yapısı iyonlar ve birçok kutuplu maddeyle etkileşmesini sağlar; bu yüzden iyi bir çözücüdür. Ancak bütün maddeler suda çözünmez. Yağın suyla karışmaması çözücü olmanın sınırını gösterir. Çözünme, bir maddenin mutlaka kimyasal olarak başka bir maddeye dönüştüğü anlamına gelmez.",
      },
      {
        title: "Isıyı almak, sıcaklığın hızla artması değildir",
        text: "Su, yüksek özgül ısısı sayesinde belirli miktarda ısı alırken birçok maddeye göre daha yavaş sıcaklık değiştirir. Buharlaşan su çevresinden ısı alabilir; terlemenin soğutmaya katkısı bununla ilişkilidir. Terin yalnız ciltte birikmesi ile buharlaşması aynı etki değildir. Buzun sıvı sudan daha düşük yoğunluklu olması yüzeyde kalmasını sağlar. Bu örnekleri ‘su daima aynı sıcaklıktadır’ veya ‘suyun her hâli aynı yoğunluktadır’ genellemesine dönüştürme.",
      },
      {
        title: "Kohezyon ve adhezyonun taraflarını bul",
        text: "Kohezyon su moleküllerinin birbirini çekmesi; adhezyon suyun başka yüzeylerle etkileşmesidir. Bitkide suyun taşınmasında su sütununun sürekliliği, yüzeylerle etkileşim ve terlemeyle oluşan çekim birlikte önem taşır. Yalnız kılcallığın çok uzun bir ağacın bütün taşıma olayını tek başına açıkladığını söyleme. Yüzey gerilimi suyun yüzeyindeki etkileşimlerle ilişkilidir; suyun üstündeki her cismin yoğunluğu sudan küçüktür sonucu çıkmaz.",
      },
      {
        title: "pH ölçeği eşit miktarlı bir cetvel değildir",
        text: "Bu anlatımda 25 °C’de sulu çözeltiler için pH 7 nötr, 7’nin altı asidik ve üstü bazik olarak kullanılır. pH azaldıkça hidrojen iyonu derişimi artar. Bir pH birimi fark on kat derişim farkına karşılık gelir: pH 3’teki H⁺ derişimi pH 5’tekinden yüz kat büyüktür. pH değeri asit veya bazın kuvvetini tek başına göstermez; derişim de önemlidir. Bir maddenin tadına veya dokusuna bakarak laboratuvarda tanımlama yapılmaz; gösterge veya ölçüm aracı kullanılır.",
      },
      {
        title: "Tuz ve inorganik maddeyi yakıt sanma",
        text: "NaCl gibi bir tuz suda iyonlarına ayrılabilir; iyonların dengesi hücrelerin işlevleri için önemlidir. HCl ile NaOH’nin uygun miktarlarda tepkimesi tuz ve su oluşumuna örnektir; her asit–baz karışımının son pH’ı mutlaka 7 olmaz. Canlılar bazı inorganik maddeleri metabolik tepkimelerle oluşturabilir; örneğin su açığa çıkabilir. ‘İnorganiktir, bu yüzden hiçbir canlı üretemez’ genellemesi doğru değildir. İnsan beslenmesindeki su ve mineraller organik yakıt gibi enerji sağlamaz; düzenleyici ve yapısal roller ayrıdır.",
      },
    ],
    pitfalls: [
      {
        label: "Hidrojen bağı ile O–H bağını karıştırma",
        reason:
          "Biri moleküller arası etkileşim, diğeri molekül içindeki kovalent bağdır.",
      },
      {
        label: "pH 3 ile 5 arasında iki kat fark yoktur",
        reason: "İki pH birimi 10², yani yüz kat H⁺ derişim farkıdır.",
      },
      {
        label: "Her inorganik madde dışarıdan alınmak zorunda değildir",
        reason:
          "Metabolik tepkimelerde su gibi inorganik ürünler oluşabilir; beslenme sınıflaması üretim yasağı değildir.",
      },
    ],
    cases: [
      {
        name: "Terin buharlaşması",
        question:
          "Terin soğutmaya katkısında hangi hâl değişimi belirleyicidir?",
        conclusion:
          "Su buharlaşırken enerji alır; bu, yüzeyden ısı uzaklaşmasına katkıda bulunur. Terin yalnız var olması ile etkili buharlaşma aynı değildir.",
        nodes: [
          n("Sıvı su", "Ter cilt yüzeyine ulaşır.", "water"),
          n(
            "Enerji alımı",
            "Buharlaşma için çevreden enerji alınır.",
            "energy",
          ),
          n("Buharlaşma", "Bazı su molekülleri gaz fazına geçer.", "water"),
          n(
            "Soğumaya katkı",
            "Isı aktarımı yüzey sıcaklığının düzenlenmesine yardım eder.",
            "chart",
          ),
        ],
      },
      {
        name: "İki pH değeri",
        question: "pH 3 ile pH 5’in H⁺ derişimleri nasıl karşılaştırılır?",
        conclusion:
          "pH 3 daha asidiktir. İki birimlik fark 10×10=100 olduğundan H⁺ derişimi yüz kat büyüktür; pH sayılarının oranı alınmaz.",
        nodes: [
          n("pH 3", "Daha yüksek H⁺ derişimi vardır.", "number", "3"),
          n(
            "İki birim fark",
            "5−3=2; farkı onluk üs olarak yorumla.",
            "number",
            "2",
          ),
          n("10²", "Her birim on kat; iki birim yüz kattır.", "number", "100"),
          n(
            "Karşılaştırma",
            "Sonucu küçük pH’ın daha yüksek H⁺ derişimi taşıdığı yönüyle kontrol et.",
            "document",
          ),
        ],
      },
      {
        name: "Bitkide su sütunu",
        question: "Su–su ve su–çeper etkileşimleri aynı adla mı anılır?",
        conclusion:
          "Su–su etkileşimi kohezyon, suyun çeperle etkileşimi adhezyondur. Terlemeyle oluşan çekimle birlikte taşıma bağlamında düşünülür.",
        nodes: [
          n("Su molekülleri", "Birbirlerini çekmeleri kohezyondur.", "water"),
          n("Çeper yüzeyi", "Başka bir yüzeye tutunma adhezyondur.", "plant"),
          n(
            "Terleme çekimi",
            "Yapraktan su kaybı taşıma sistemini etkiler.",
            "plant",
          ),
          n(
            "Taşıma",
            "Birlikte işleyen mekanizmaları tek bir kuvvete indirgeme.",
            "water",
          ),
        ],
      },
    ],
    recall: [
      {
        prompt: "pH 4 ile pH 6 için H⁺ derişimlerini nasıl kıyaslarsın?",
        answer:
          "İki birim fark vardır; pH 4’teki H⁺ derişimi yüz kat fazladır. Daha küçük pH, daha büyük H⁺ derişimine karşılık gelir.",
      },
      {
        prompt: "Kohezyon ile adhezyonu bir bitki örneğiyle ayır.",
        answer:
          "Su moleküllerinin birbirini çekmesi kohezyon; suyun taşıma borusunun çeperiyle etkileşmesi adhezyondur. Terlemeyle oluşan çekim de taşıma bağlamına katılır.",
      },
    ],
    modelLimit:
      "Su çizimi ve taşıma akışı şematiktir. pH karşılaştırması 25 °C’de sulu ortam varsayar; gerçek organların pH düzenlenmesini veya deney güvenliğini modellemez.",
  },
  {
    id: "karbohidratlar",
    topicId: "detail-5",
    subjectId,
    title: "Karbohidratlar: birim, bağ ve görev",
    minutes: 25,
    source: `${part1}, PDF/basılı s.15–17.`,
    objectives: [
      "Mono–di–polisakkarit ayrımını yapı birimi üzerinden kur.",
      "Glikozit bağı ile su sayısını doğru koşullarda hesapla.",
      "Depo ve yapı polisakkaritlerini karşılaştır.",
    ],
    body: [
      {
        title: "Şekerin adı kadar birim sayısını da oku",
        text: "Monosakkaritler sindirimle daha küçük şekerlere ayrılmayan basit birimlerdir. Glikoz, fruktoz ve galaktoz altı karbonlu; riboz ve deoksiriboz beş karbonludur. Aynı kapalı formüle sahip glikoz, fruktoz ve galaktozun yapı düzenleri farklıdır; aynı isim veya aynı görevde sayılmazlar. RNA ve ATP’de riboz, DNA’da deoksiriboz bulunur. Kökündeki ‘şeker’ sözcüğünden bütününün yalnız enerji amacıyla kullanıldığını çıkarma.",
      },
      {
        title: "İki birim birleşince ne oluşur?",
        text: "İki monosakkarit arasında glikozit bağı kurulmasıyla bir disakkarit oluşabilir. TYT dehidrasyon sayımında bir bağ için bir su açığa çıkışı izlenir. Maltoz glikoz+glikoz, sakkaroz glikoz+fruktoz, laktoz glikoz+galaktoz bileşimindedir. Hidroliz bu bağın su kullanılarak ayrılmasıdır. Disakkarit ile iki serbest monosakkaritin bulunduğu karışım aynı yapı değildir; bağ kurulup kurulmadığını kontrol et.",
      },
      {
        title: "Polisakkaritlerde görev ve bağlanma biçimi",
        text: "Nişasta bitkilerin, glikojen hayvan ve mantarların başlıca depo polisakkaritlerindendir; bazı prokaryotlarda da glikojen bulunur. Selüloz bitki hücre duvarında yapısal görev taşır. Kitin mantar duvarı ve eklem bacaklı dış iskeletiyle ilişkilidir; azot da içerir. Glikoz içeren iki polisakkaritin aynı olması gerekmez: bağlanma biçimi ve dallanma farklılıkları özellikleri değiştirir. İnsan selülozu parçalayan kendi sindirim enzimiyle donanmış değildir; selülozun insanda sindirilememesi onun hiçbir işlevi olmadığı anlamına gelmez.",
      },
      {
        title: "Bağ sayısında zincir sayısını unutma",
        text: "Birbirine bağlı, halka içermeyen tek zincirde n monomerden n−1 bağ kurulur. Örneğin beş birimlik zincirde dört bağ ve TYT sayımında dört su açığa çıkışı vardır. Toplam beş monomer iki ayrı zincire dağılmışsa toplam bağ sayısı beş−iki=üç olur. Bu sayım varsayımı bir molekülü gözünden kaçırmamayı sağlar. Başlangıçta zaten bağlı bir zincir verilmişse sıfırdan sentez suyu ile yalnız yeni bağların suyunu karıştırma.",
      },
      {
        title: "Bir soruda önce yapı mı görev mi soruluyor?",
        text: "‘Yapı birimi glikozdur’ bilgisi nişasta, glikojen ve selülozu tek başına ayırmaz. Sorudaki organizma, depo/duvar işlevi ve enzimle sindirilebilme gibi ikinci bilgileri kullan. Bütün karbonhidratlar aynı hızda zar geçmez; küçük ve büyük molekül ayrımı ve taşıma mekanizması önemlidir. Karbohidratların enerji, yapı ve nükleotit bileşeni rollerini ayrı örneklerle hatırla; tek bir ‘enerji maddesi’ etiketi konuya yetmez.",
      },
    ],
    pitfalls: [
      {
        label: "Aynı monomer, aynı polimer demek değildir",
        reason:
          "Selüloz ve nişasta glikoz içerir ama bağlanma düzenleri farklıdır.",
      },
      {
        label: "n−1 yalnız doğru yapı varsayımıyla kullanılır",
        reason:
          "Birden çok ayrı, halkasız zincirde toplam bağ n−zincir sayısıdır.",
      },
      {
        label: "Riboz DNA’nın şekeri değildir",
        reason: "Riboz RNA/ATP, deoksiriboz DNA ile ilişkilidir.",
      },
    ],
    cases: [
      {
        name: "Maltoz ve laktoz",
        question: "İki şeker birimi içeren her molekül maltoz mudur?",
        conclusion:
          "Hayır. Maltoz iki glikoz; laktoz glikoz ve galaktoz içerir. Birim sayısıyla birim kimliği farklı bilgilerdir.",
        nodes: [
          n(
            "İki monomer",
            "Birimler yalnız sayılmamalı, türleri de okunmalıdır.",
            "molecule",
            "2",
          ),
          n("Glikozit bağı", "Bağ kurulması disakkarit oluşturur.", "molecule"),
          n(
            "Monomer kimliği",
            "İki glikoz mu, glikoz+galaktoz mu?",
            "document",
          ),
          n(
            "Doğru ad",
            "Bileşime göre maltoz veya laktoz seçilir.",
            "molecule",
          ),
        ],
      },
      {
        name: "Tek zincir",
        question:
          "Altı monomerden bir halkasız zincir oluşursa kaç bağ kurulur?",
        conclusion:
          "Altı birimi tek bağlı zincir hâline getirmek için beş bağ gerekir. Hidrolizle tüm bağları ayırmak için TYT sayımında beş su kullanılır.",
        nodes: [
          n(
            "6 serbest birim",
            "Başlangıçta birbirine bağlı değildir.",
            "number",
            "6",
          ),
          n("Tek zincir", "Birimler bir bağlı yapı hâline gelir.", "molecule"),
          n(
            "5 bağ",
            "6−1=5; monomer ve bağ sayıları aynı değildir.",
            "number",
            "5",
          ),
          n(
            "Su dengesi",
            "Sentezde açığa çıkan, hidrolizde kullanılan suyu yönüyle belirt.",
            "water",
          ),
        ],
      },
      {
        name: "Duvar ve depo",
        question:
          "Bir bitki hücresindeki selüloz ile nişasta aynı görevi mi yapar?",
        conclusion:
          "Selüloz duvarın yapısal bileşenidir; nişasta depodur. Ortak glikoz birimleri görevlerini aynı yapmaz.",
        nodes: [
          n(
            "Glikoz birimleri",
            "Başlangıç birimlerinin ortak olması yeterli ayırım sağlamaz.",
            "molecule",
          ),
          n(
            "Bağlanma düzeni",
            "Molekülün yapısı özellikleri etkiler.",
            "molecule",
          ),
          n("Selüloz duvar", "Yapısal görev ön plandadır.", "plant"),
          n("Nişasta deposu", "Depolama görevi ön plandadır.", "plant"),
        ],
      },
    ],
    recall: [
      {
        prompt:
          "Sekiz monomer iki halkasız zincire ayrılırsa toplam bağ sayısı nedir?",
        answer:
          "Sekiz−iki=altı bağdır. n−1 hesabını iki zincirin her birine uygulayıp toplamak aynı sonucu verir.",
      },
      {
        prompt: "Nişasta ile selülozun farklı olmasını tek cümleyle açıkla.",
        answer:
          "İkisinde de glikoz bulunabilir fakat bağlanma biçimleri ve yapıları farklı olduğu için depo/yapı görevleri ve sindirilebilirlikleri farklıdır.",
      },
    ],
    modelLimit:
      "Bağ sayımı halkasız zincirler için TYT dehidrasyon/hidroliz modelidir; şema gerçek şeker stereokimyasını veya dallanmanın bütün ayrıntılarını göstermez.",
  },
  {
    id: "lipitler",
    topicId: "detail-6",
    subjectId,
    title: "Lipitler: depo, zar ve düzenleyici yapı",
    minutes: 25,
    source: `${part1}, PDF/basılı s.18.`,
    objectives: [
      "Trigliserit ile fosfolipit yapısını ayır.",
      "Ester bağı ve yapı bileşenlerini say.",
      "Doymuş–doymamış ve temel yağ asidi kavramlarını doğru kullan.",
    ],
    body: [
      {
        title: "Lipit bir tek molekül adı değildir",
        text: "Lipitler suda genel olarak az çözünen, farklı yapılı organik molekül gruplarını kapsar. Trigliseritler enerji deposu; fosfolipitler zarın başlıca bileşenleri; steroidler ise kolesterol ve bazı hormonlarla ilişkili gruptur. Bu üç grubu aynı çizimin farklı adları gibi ezberleme. Her lipit gliserol ve üç yağ asidinden oluşmaz. Örneğin steroidlerin halkalı yapısı bu trigliserit tasarımına uymaz.",
      },
      {
        title: "Bir trigliseritin parçalarını birleştir",
        text: "Bir gliserol ile üç yağ asidinin bağlanmasıyla bir trigliserit oluşur. TYT esterleşme sayımında üç ester bağı ve üç su açığa çıkışı izlenir. Monomer–polimer zinciri gibi tekrar eden tek bir yapı biriminin dizilimi söz konusu olmadığı için trigliserit klasik bir polimer sayılmaz. Hidrolizde üç bağın ayrılmasıyla gliserol ve yağ asitleri açığa çıkar. ‘Üç yağ asidi’ bilgisini ‘üç gliserol’ diye okumamak için farklı parçaları ayrı çiz.",
      },
      {
        title: "Yağ asidi zincirindeki bağa bak",
        text: "Doymuş yağ asidinin karbon zincirinde karbon–karbon çift bağı bulunmaz; doymamışta bir veya daha çok çift bağ bulunur. Bağ düzeni moleküllerin yerleşmesini ve erime davranışını etkiler. Oda sıcaklığındaki katı/sıvı örnekleri genel eğilimi öğretir; zincir uzunluğu ve karışım bileşimi gibi başka etkenleri yok sayan mutlak bir kural değildir. İnsan tarafından yeterli biçimde sentezlenemeyip besinle alınması gereken temel yağ asitleri, ‘vücut hiçbir yağı sentezleyemez’ anlamına gelmez.",
      },
      {
        title: "Fosfolipitte iki farklı uç",
        text: "Fosfolipidin kutuplu baş bölgesi suyla etkileşirken yağ asidi kuyrukları sudan kaçınma eğilimi gösterir. Bu iki özellik çift katlı zar düzenini anlamaya yardım eder. Suyla etkileşen başların dış ve iç sulu ortama, kuyrukların birbirine dönük yerleşimini takip et. Çift katlı zar iki ayrı organel zarı değildir. Zarın yapısındaki fosfolipit ile yağ deposundaki trigliseriti aynı işlevli sayma.",
      },
      {
        title: "Enerji deposu olmak tek görev değildir",
        text: "Yağlar birim kütlede yüksek enerji deposudur; yalıtım ve mekanik korumaya da katkı verebilir. Kolesterol hayvan hücre zarlarında özelliklerin düzenlenmesine ve bazı steroid ürünlerin sentezine katılır. ‘Kolesterolün hiçbir görevi yoktur’ sonucu çıkarma. Yağda çözünen vitaminlerle ilişki, bütün vitaminlerin steroid yapılı olduğu anlamına gelmez. Lipit sorusunda önce yapı türünü seç, sonra depo, zar veya düzenleyici işlevi yorumla.",
      },
    ],
    pitfalls: [
      {
        label: "Her lipit trigliserit değildir",
        reason:
          "Fosfolipit ve steroidler aynı bileşen sayımıyla tarif edilmez.",
      },
      {
        label: "Trigliserit bir monomer zinciri değildir",
        reason:
          "Bir gliserol ve üç yağ asidinin bağlanması, tekrar eden birimlerden klasik polimer oluşturmaz.",
      },
      {
        label: "Fosfolipit başı ve kuyruğu aynı su davranışına sahip değildir",
        reason:
          "Kutuplu baş ve apolar kuyrukların farklı etkileşimi zar düzenini açıklar.",
      },
    ],
    cases: [
      {
        name: "Trigliserit kur",
        question: "Bir trigliserit için kaç gliserol ve kaç yağ asidi gerekir?",
        conclusion:
          "Bir gliserol ve üç yağ asidi gerekir; TYT sayımında üç ester bağı ile üç su açığa çıkışı bulunur. Bileşen sayısı bağ sayısıyla ayrı kontrol edilir.",
        nodes: [
          n(
            "1 gliserol",
            "Üç bağlanma yeri olan gliserol bileşenidir.",
            "molecule",
            "1",
          ),
          n(
            "3 yağ asidi",
            "Gliserol ile aynı molekül türü değildir.",
            "molecule",
            "3",
          ),
          n("3 ester bağı", "Bağlanma noktalarını say.", "number", "3"),
          n(
            "Trigliserit",
            "Depo lipit türüdür; her lipidin modeli değildir.",
            "molecule",
          ),
        ],
      },
      {
        name: "Zarın yerleşimi",
        question: "Fosfolipit kuyrukları neden suya bakan iki yüzeye yönelmez?",
        conclusion:
          "Kuyrukların suyla etkileşimi baş bölgesinden farklıdır. Çift katlı düzende kuyruklar içe, suyla etkileşen başlar sulu yüzeylere yönelir.",
        nodes: [
          n("Sulu ortam", "Zarın iki tarafında sulu ortam bulunur.", "water"),
          n("Kutuplu baş", "Suyla etkileşim kurabilen bölgedir.", "molecule"),
          n(
            "Yağ asidi kuyruğu",
            "Apolar bölüm suya doğrudan açık olmaktan kaçınır.",
            "molecule",
          ),
          n(
            "Çift katlı düzen",
            "Tek bir biyolojik zarın temel düzenidir.",
            "cell",
          ),
        ],
      },
      {
        name: "Çift bağ ekle",
        question: "Doymuş–doymamış ayrımı hangi bağ bilgisine dayanır?",
        conclusion:
          "Yağ asidinin karbon zincirinde C=C bulunup bulunmamasına bakılır. Genel erime eğilimi bu yapıyla ilişkilidir; yalnız besinin adına bakarak kesin moleküler sonuç çıkarılmaz.",
        nodes: [
          n("Karbon zinciri", "Yağ asidinin iskeletine bak.", "molecule"),
          n(
            "C=C kontrolü",
            "Çift bağ varsa doymamış sınıfındadır.",
            "document",
          ),
          n(
            "Yerleşim farkı",
            "Bağ düzeni yakın paketlenmeyi etkileyebilir.",
            "molecule",
          ),
          n(
            "Erime davranışı",
            "Başka yapısal etkenlerin de bulunduğunu unutma.",
            "chart",
          ),
        ],
      },
    ],
    recall: [
      {
        prompt: "Trigliserit ile fosfolipidi tek bir yapı farkıyla ayır.",
        answer:
          "Trigliserit bir gliserole üç yağ asidi bağlı depo lipittir. Yaygın fosfolipit modelinde iki yağ asidi ve fosfat içeren kutuplu baş bulunur; bu iki yapı aynı değildir.",
      },
      {
        prompt:
          "Bir trigliseritin tüm ester bağları hidroliz edilirse TYT sayımında kaç su gerekir?",
        answer:
          "Üç ester bağının ayrılması için üç su kullanılır; bir gliserol ve üç yağ asidi açığa çıkar.",
      },
    ],
    modelLimit:
      "Çizimler bileşen ve etkileşim ilişkisidir; gerçek molekül geometrisi, erime sıcaklığı tahmini veya beslenme önerisi değildir.",
  },
  {
    id: "proteinler",
    topicId: "detail-7",
    subjectId,
    title: "Proteinler: dizilişten üç boyutlu işleve",
    minutes: 25,
    source: `${part1}, PDF/basılı s.19.`,
    objectives: [
      "Amino asit, peptit bağı ve protein ilişkisini kur.",
      "Diziliş ile katlanmanın işlev üzerindeki etkisini ayır.",
      "Denatürasyon ile hidrolizi karıştırma.",
    ],
    body: [
      {
        title: "Yapı birimi amino asittir",
        text: "Proteinlerin temel yapı birimleri amino asitlerdir. Standart protein sentezinde yirmi yaygın amino asit çeşidi üzerinden düşünülür; her proteinin bunların hepsini içerdiği sonucu çıkmaz. Amino asitler ortak amino ve karboksil gruplarına, farklılaşabilen yan gruplara sahiptir. Sayı, çeşit ve özellikle diziliş değiştikçe oluşan polipeptit farklılaşabilir. Aynı harflerden farklı sözcükler kurulması gibi, aynı tür amino asitlerin farklı sıraları aynı proteini garanti etmez.",
      },
      {
        title: "Peptit bağını doğru say",
        text: "İki amino asit arasında peptit bağı kurulması dipeptit; üçü tripeptit oluşturabilir. Tek, halkasız bir polipeptitte n amino asit için n−1 peptit bağı sayılır. İki ayrı zincir verilmişse toplam bağ, toplam amino asit sayısından zincir sayısının çıkarılmasıyla bulunur. TYT dehidrasyon/hidroliz sayımında bu bağların oluşma ve ayrılma yönüne göre su hesabı yapılır. Bir proteinin birden fazla polipeptit içerebileceğini unutma; zincirler arası her etkileşim peptit bağı değildir.",
      },
      {
        title: "Dizi ile şekil birlikte işlev üretir",
        text: "Ribozom amino asitleri bilgiye uygun sırada bağlar. Polipeptidin işlevsel üç boyutlu yapı kazanması ayrıca önemlidir. Bir enzimde aktif bölgenin veya bir taşıyıcıda bağlanma yerinin şekli işlevi etkileyebilir. DNA bilgisindeki her değişimin mutlaka bir protein işlevini bozacağı genellemesi de doğru değildir; değişimin türü ve bağlamı incelenir. Bu konuda temel yol bilgi → amino asit dizisi → katlanma → işlev ilişkisidir.",
      },
      {
        title: "Denatürasyon, tüm bağların kesilmesi değildir",
        text: "Uygun olmayan sıcaklık, pH veya başka koşullar proteinin katlanma düzenini ve işlevini bozabilir; buna denatürasyon denir. Bu olay tipik olarak polipeptidin bütün peptit bağlarının kopup serbest amino asitlere ayrılması değildir. Hidroliz ise peptit bağlarını ayırarak daha küçük peptit veya amino asitler oluşturur. Bazı proteinler uygun koşullarda yeniden katlanabilir, bazıları geri dönemez; ‘denatüre olan her protein mutlaka eski hâline döner’ diye düşünme.",
      },
      {
        title: "Tek bir görev ezberleme",
        text: "Proteinler taşıma, yapı, savunma, hareket ve kataliz gibi farklı görevler alır. Hemoglobin taşıma, keratin yapı, antikor savunma, aktin–miyozin hareket bağlamında örneklerdir. Protein yapılı enzimler katalizör olarak çalışır. Bazı hormonlar proteindir, tüm hormonlar değil. ‘Her protein enzimdir’ ve ‘protein yalnız kaslarda bulunur’ genellemeleri geçersizdir. Proteinlerin enerji için kullanılabilmesi, onların tek veya temel görevinin enerji depolamak olduğu anlamına gelmez.",
      },
    ],
    pitfalls: [
      {
        label: "Aynı amino asit sayısı aynı protein değildir",
        reason: "Çeşit, sıra, zincir yapısı ve katlanma da önemlidir.",
      },
      {
        label: "Denatürasyon ile sindirimi eşitleme",
        reason:
          "Katlanma bozulması ve peptit bağlarının hidrolizi farklı olaylardır.",
      },
      {
        label: "Her protein enzim veya hormon değildir",
        reason:
          "Taşıma, yapı ve savunma gibi başka görevleri bulunur; tüm hormonlar da protein değildir.",
      },
    ],
    cases: [
      {
        name: "Dizilişi değiştir",
        question:
          "Aynı çeşit ve sayıda amino asit farklı sıradaysa aynı işlev zorunlu mudur?",
        conclusion:
          "Hayır. Amino asit dizisi katlanmayı, katlanma da işlevsel bölgeleri etkileyebilir. Yalnız toplam sayıyı karşılaştırmak yeterli değildir.",
        nodes: [
          n("Amino asitler", "Yapı birimleri seçilir.", "molecule"),
          n("Diziliş", "Bağlanma sırası bilgiyi taşır.", "document"),
          n("Katlanma", "Üç boyutlu düzen oluşur.", "molecule"),
          n(
            "İşlev",
            "Bağlanma veya kataliz gibi işlevler bu yapıyla ilişkilidir.",
            "cell",
          ),
        ],
      },
      {
        name: "Isıtma mı hidroliz mi?",
        question:
          "Şekli bozulan protein mutlaka tek tek amino asitlere ayrılmış mıdır?",
        conclusion:
          "Hayır. Denatürasyonda katlanma bozulabilir; hidrolizde peptit bağları ayrılır. Sorudaki değişimin hangi düzeye ait olduğunu belirle.",
        nodes: [
          n(
            "Katlanmış protein",
            "Başlangıçta işlevsel düzen bulunur.",
            "molecule",
          ),
          n(
            "Koşul değişimi",
            "Sıcaklık veya pH gibi etki yapıyı bozabilir.",
            "energy",
          ),
          n(
            "Denatürasyon",
            "Bütün peptit bağlarının kopması zorunlu değildir.",
            "molecule",
          ),
          n(
            "Hidroliz ayrı süreç",
            "Bağ kesilmesi ve küçük ürünlerin oluşması ayrıca verilmelidir.",
            "water",
          ),
        ],
      },
      {
        name: "İki polipeptit",
        question:
          "Toplam on amino asit iki ayrı halkasız zincirdeyse toplam peptit bağı kaçtır?",
        conclusion:
          "On−iki=sekizdir. Her zincirin sonu farklı olduğundan tek zincir için olan n−1’i bütün moleküle körlemesine uygulama.",
        nodes: [
          n("10 amino asit", "Toplam birim sayısıdır.", "number", "10"),
          n(
            "2 ayrı zincir",
            "Her zincirin kendi sonları vardır.",
            "number",
            "2",
          ),
          n("8 peptit bağı", "10−2=8 toplam bağdır.", "number", "8"),
          n(
            "Yön kontrolü",
            "Hidrolizde bu bağların ayrılmasıyla oluşacak birimleri kontrol et.",
            "document",
          ),
        ],
      },
    ],
    recall: [
      {
        prompt:
          "Denatürasyon neden ‘protein amino asitlere ayrıldı’ demek değildir?",
        answer:
          "Denatürasyon katlanmayı ve işlevi bozabilir. Serbest amino asitlere ayrılmak için peptit bağlarının hidrolizi gerekir; bunlar farklı düzeyde değişimlerdir.",
      },
      {
        prompt:
          "Dokuz amino asit üç ayrı zincirdeyse toplam peptit bağı kaçtır?",
        answer:
          "Halkasız zincir varsayımıyla dokuz−üç=altı bağ vardır. Her zincirde ayrı ayrı n−1 sayıp toplamak da altı verir.",
      },
    ],
    modelLimit:
      "Dizi ve katlanma çizimleri şematiktir. Bağ sayımı halkasız polipeptitlerin TYT modelidir; ribozomal sentezin tüm enerji ve kimyasal ara basamaklarını göstermez.",
  },
  {
    id: "enzimler",
    topicId: "detail-8",
    subjectId,
    title: "Enzimler: enerji engeli, özgüllük ve koşullar",
    minutes: 30,
    source: `${part2}, PDF/basılı s.10–11.`,
    objectives: [
      "Aktivasyon enerjisi ile tepkimenin enerji farkını ayır.",
      "Enzim–substrat özgüllüğü ve yeniden kullanımını açıkla.",
      "Sıcaklık, pH ve doygunluk grafiklerini koşullarıyla yorumla.",
    ],
    body: [
      {
        title: "Enzim enerji engelini değiştirir",
        text: "Enzim biyolojik katalizördür; tepkimenin uygun koşullarda daha hızlı gerçekleşmesine yardımcı olur. Alternatif bir yol sunarak aktivasyon enerjisini düşürür. Başlangıç ve ürün arasındaki toplam enerji farkını değiştirmez, enerjiyi yoktan üretmez ve denge konumunu tek başına kaydırmaz. Enzimler hem yapım hem yıkım süreçlerinde görev alabilir. ‘Yalnız enerji açığa çıkaran tepkimeler enzimlidir’ veya ‘enzim tepkimeyi enerji bakımından her koşulda mümkün yapar’ genellemelerini kullanma.",
      },
      {
        title: "Özgüllük ve çevrim",
        text: "Enzimin etki ettiği madde substrattır. Substrat aktif bölgeyle etkileşir, ürün oluşur ve enzim yeni bir çevrimde kullanılabilir. Anahtar–kilit benzetmesi özgüllüğü anlatır; gerçek molekülleri tamamen katı parçalar saymak için kullanılmaz. Bir enzimin bir çevrimde tüketilmemesi onun sonsuza dek bozulmayacağı anlamına gelmez. Hücreler enzimleri sentezler ve yeniler. Protein yapılı enzimler hücre dışında da çalışabilir; örneğin sindirim kanalındaki boşluk bu bağlamdadır.",
      },
      {
        title: "Yardımcı parça her enzimde aynı değildir",
        text: "Bazı enzimler protein kısmıyla işlev görür; bazıları yardımcı bileşene ihtiyaç duyar. Protein kısmı apoenzim, gerekli yardımcıyla çalışan bütün holoenzim olarak adlandırılabilir. İnorganik metal iyonu gibi kofaktörler ile organik koenzimlerin ayrımını yap. Vitamin kökenli yardımcılar buna örnektir; bütün vitaminleri ve bütün enzimleri tek bir yardımcı formülüne indirgeme. Bu TYT anlatımında protein enzimler odaktadır; katalitik RNA gibi ileri düzey istisnalar ‘bütün katalizörler proteindir’ genellemesini sınırlar.",
      },
      {
        title: "Sıcaklık ve pH: her artış daha hızlı değildir",
        text: "Sıcaklık artışı belirli bir aralıkta hızı artırabilir; daha yüksek sıcaklıkta protein yapısının bozulması etkinliği düşürebilir. Düşük sıcaklıkta yavaşlama ile denatürasyonu aynı olay sayma. Enzimlerin uygun pH aralıkları farklıdır; mide ve ince bağırsak enzimlerinin koşulları aynı değildir. Her enzim için kesin ortak sıcaklık veya pH optimumu yoktur. Grafik sorusunda hangi enzimin ve hangi koşulların verildiğini oku; tek grafikten bütün canlılara sonuç taşıma.",
      },
      {
        title: "Substrat artarken hız neden sınırlanabilir?",
        text: "Enzim miktarı sabit tutulup substrat artırıldığında başlangıç hızı önce artabilir, sonra enzimler doygunluğa yaklaştığı için üst sınıra yaklaşır. Substrat fazlasında daha çok substrat eklemek her zaman aynı miktarda hız artışı sağlamaz. Enzim miktarı, inhibitörler ve diğer koşullar değişiyorsa aynı grafiği otomatik uygulama. Aktivasyon enerjisi, başlangıç hızı, belirli sürede ürün miktarı ve denge miktarı farklı niceliklerdir; eksenlerin neyi gösterdiğini önce belirle.",
      },
    ],
    pitfalls: [
      {
        label: "Aktivasyon enerjisi toplam enerji farkı değildir",
        reason:
          "Katalizör engeli düşürebilir; başlangıç ve ürünün enerji farkını değiştirmez.",
      },
      {
        label: "Enzim substrata dönüşmez",
        reason:
          "Ürün oluşur, enzim çevrim sonunda yeniden kullanılabilir durumda kalır.",
      },
      {
        label: "Substrat artışı sınırsız hız artışı sağlamaz",
        reason:
          "Sabit miktardaki enzimin çevrim kapasitesi doygunluğa yaklaşabilir.",
      },
    ],
    cases: [
      {
        name: "Enzim çevrimi",
        question: "Bir enzim bir kez ürün oluşturunca yok olmak zorunda mıdır?",
        conclusion:
          "Hayır. Enzim çevrim sonunda yeniden kullanılabilir. Zaman içinde hasar görme ve yenilenme, tek bir kataliz çevriminde tüketilmekten farklıdır.",
        nodes: [
          n("Enzim", "Aktif bölge substratla etkileşir.", "molecule", "E"),
          n("Enzim–substrat", "Geçici etkileşim oluşur.", "molecule", "ES"),
          n(
            "Ürün ayrılır",
            "Substrat dönüşür, ürün ortamdan ayrılabilir.",
            "molecule",
            "P",
          ),
          n(
            "Yeni çevrim",
            "Enzim yeni substratla çalışabilir.",
            "molecule",
            "E",
          ),
        ],
      },
      {
        name: "Substratı artır",
        question:
          "Enzim miktarı sabitse substratın iki katına çıkması hızı her zaman iki kat yapar mı?",
        conclusion:
          "Hayır. Başlangıç hızı doygunluğa yaklaştıkça ek substratın etkisi küçülebilir. Veriler şematik bir örnektir; evrensel bir hız sabiti verilmez.",
        nodes: [
          n("Az substrat", "Boş etkin bölgeler daha çok olabilir.", "molecule"),
          n("Daha çok karşılaşma", "Başlangıç hızı artabilir.", "sample"),
          n(
            "Doygunluğa yaklaşma",
            "Enzim miktarı sınırlayıcı olabilir.",
            "molecule",
          ),
          n(
            "Üst hız sınırı",
            "Ek substrat sınırsız orantılı artış sağlamaz.",
            "chart",
          ),
        ],
        data: {
          labels: ["Az", "Orta", "Çok", "Daha çok"],
          values: [1, 3, 4, 4.2],
          unit: "göreli hız",
          caption: "Sabit enzim için özgün şematik başlangıç hızı verisi.",
        },
      },
      {
        name: "Enerji engeli",
        question: "Enzimli tepkimede enerji grafiğinin hangi özelliği azalır?",
        conclusion:
          "Reaktanlardan geçiş durumuna aşılması gereken engel azalır. Reaktan ile ürünün enerji farkı ve kimyasal denge katalizör tarafından değiştirilmez.",
        nodes: [
          n("Başlangıç", "Reaktanların enerji düzeyi aynı kalır.", "energy"),
          n("Daha düşük engel", "Alternatif tepkime yolu sağlanır.", "chart"),
          n("Ürün", "Son enerji düzeyi aynı kalır.", "energy"),
          n(
            "Hız değişir",
            "Denge konumu değil, ona ulaşma hızı etkilenir.",
            "chart",
          ),
        ],
      },
    ],
    recall: [
      {
        prompt:
          "Enzim neden tepkimenin denge ürün miktarını artırmak zorunda değildir?",
        answer:
          "İleri ve geri süreçlerin hızını etkileyebilir ama başlangıç–ürün enerji farkını ve denge konumunu değiştirmez. Hızlanma ile denge miktarı farklıdır.",
      },
      {
        prompt:
          "Düşük sıcaklıkta yavaşlayan enzim mutlaka denatüre olmuş mudur?",
        answer:
          "Hayır. Yavaşlama moleküler hareket ve karşılaşmalarla ilişkili olabilir; denatürasyon yapısal bozulmadır. Koşullar düzelince hızın geri gelmesiyle kalıcı yapı hasarını ayır.",
      },
    ],
    modelLimit:
      "Grafik özgün şematik veridir, ölçülmüş kinetik sabit değildir. Enzim sembolleri gerçek konformasyonları veya bütün düzenleyici mekanizmaları göstermez.",
  },
  {
    id: "vitaminler",
    topicId: "detail-9",
    subjectId,
    title: "Vitaminler: çözünürlük, düzenleme ve sınırlar",
    minutes: 20,
    source: `${part2}, PDF/basılı s.12–13.`,
    objectives: [
      "Yağda ve suda çözünen vitamin gruplarını ayır.",
      "Düzenleyici rolü enerji sağlama ile karıştırma.",
      "Depolama ve gereksinim genellemelerinde istisnaları gözet.",
    ],
    body: [
      {
        title: "Az miktarla işlev, sıfır gereksinim demek değildir",
        text: "Vitaminler çeşitli metabolik ve düzenleyici görevlerde bulunan organik bileşiklerdir. Birçoğu özellikle koenzimlerle ilişkilidir; bütün vitaminlerin tek görevi koenzim olmak değildir. İnsan enerji sağlamak için vitaminleri karbonhidrat veya yağ gibi yakıt saymaz. ‘Organik olan her besin enerji verir’ genellemesi bu yüzden yanlıştır. Vitamin gereksinimi ve kullanılma biçimi vitamin türüne göre değişir; tek bir vitamin diğerinin rastgele yerine geçmez.",
      },
      {
        title: "İki çözünürlük grubunu ayrı tut",
        text: "A, D, E ve K yağda çözünen; B grubu ve C suda çözünen vitaminlerdir. Çözünürlük emilim, taşınma ve depolanma özellikleriyle ilişkilidir. Yağda çözünenlerin vücutta birikebilmesi, fazlasının her zaman güvenli veya yararlı olduğu anlamına gelmez. Suda çözünenlerin genel olarak daha az depolanması da hiçbir istisna olmadığı demek değildir; B12 için anlamlı depolar bulunabilir. Kaynaktaki basit grup kuralını bütün vitaminler için mutlak depo yasağına dönüştürme.",
      },
      {
        title: "İşlevi vitamin adıyla eşleştir",
        text: "A vitamini görme ve epitel işlevleriyle; D vitamini kalsiyum–fosfor dengesi ve kemik mineralizasyonuyla; K vitamini pıhtılaşmayla ilişkili proteinlerin uygun işleviyle; E vitamini antioksidan savunmayla ilişkilidir. C vitamini kolajen yapımı gibi süreçlere destek olur. B grubu birçok farklı vitamini kapsar; tek bir molekül değildir. Bir tabloda B1 ile B12’nin farklı görev ve eksiklikleri veriliyorsa ‘B vitamini’ adını tek görev etiketi gibi okumamak gerekir.",
      },
      {
        title: "Sentez ve dönüşüm aynı şey değildir",
        text: "İnsan bazı vitaminleri veya öncüllerinden ürünleri belirli koşullarda oluşturabilir; örneğin D vitamini oluşumunda deride başlayan süreç bulunur. A vitamininin bazı öncülleri de dönüşüme uğrayabilir. Bunlar ‘insan bütün vitaminleri yeterince sentezler’ sonucunu vermez. Bazı bağırsak mikroorganizmalarının vitamin üretmesi de bütün gereksinimin her zaman karşılandığını göstermez. Hangi canlı, hangi vitamin ve hangi koşul sorularını birlikte değerlendir.",
      },
      {
        title: "Tablo sorusunda üç ayrı bilgiyi oku",
        text: "Önce vitaminin grubu, sonra görevi, sonra verilen koşul veya eksiklik bilgisini ayır. ‘Düzenleyicidir’ ifadesi vitaminin mineral olduğunu göstermez; ikisinin organik–inorganik ayrımı vardır. Yağda çözünmek, molekülün trigliserit olması değildir. Eksikliklerle ilgili verilen okul örneklerinden gerçek bir kişiye tek belirtiyle tanı koyma veya doz önerme sonucu çıkarılmaz. Buradaki hedef kavram eşleştirmesi ve doğru genellemedir.",
      },
    ],
    pitfalls: [
      {
        label: "Vitamin enerji hammaddesi değildir",
        reason:
          "Organik olup düzenleyici işlev görmek, yakıt olarak enerji vermekle aynı şey değildir.",
      },
      {
        label: "B12 depolanma genellemesinin istisnasıdır",
        reason:
          "Suda çözünenler için ‘hiçbiri depolanamaz’ biçiminde mutlak bir cümle kullanma.",
      },
      {
        label: "Yağda çözünen vitamin, yağ molekülü demek değildir",
        reason:
          "Çözünürlük özelliği ile yapısal molekül sınıfı farklı bilgilerdir.",
      },
    ],
    cases: [
      {
        name: "Yağda çözünenler",
        question:
          "A, D, E ve K vitaminlerini ortak yapan çözünürlük özelliği nedir?",
        conclusion:
          "Yağda çözünürler. Birikme olasılığı bulunması ‘ne kadar fazla, o kadar iyi’ anlamına gelmez; yalnız kavramsal grup eşleştirmesi yapılır.",
        nodes: [
          n("A · D · E · K", "Yağda çözünen vitaminlerdir.", "molecule"),
          n(
            "Lipit ortamı",
            "Çözünürlük emilim ve taşınmayı etkiler.",
            "molecule",
          ),
          n("Depo olasılığı", "Bazı dokularda birikebilirler.", "cell"),
          n(
            "Ölçülü genelleme",
            "Bu özellik, sınırsız alımın yararlı olacağını söylemez.",
            "document",
          ),
        ],
      },
      {
        name: "Enerji mi yardımcı mı?",
        question:
          "Bir koenzime katkı veren vitamin glikozla aynı enerji rolünü mü üstlenir?",
        conclusion:
          "Hayır. Metabolik bir işleme yardımcı olmak, o işlemin organik yakıtı olmak değildir. Vitamin ile enerji sağlayan besini ayrı sınıflandır.",
        nodes: [
          n("Vitamin", "Düzenleyici organik bileşendir.", "molecule"),
          n(
            "Koenzim ilişkisi",
            "Özellikle bazı vitaminler yardımcı yapılara katılır.",
            "molecule",
          ),
          n(
            "Enzim işlevi",
            "Uygun tepkimelerin işlemesine destek olur.",
            "molecule",
          ),
          n(
            "Yakıt ayrı",
            "Glikoz gibi enerji hammaddesiyle aynı rol değildir.",
            "energy",
          ),
        ],
      },
      {
        name: "D ve kalsiyum",
        question:
          "D vitamini ile kalsiyumun ilişkisi onların aynı madde olduğunu mu gösterir?",
        conclusion:
          "Hayır. D vitamini organik bir düzenleyici, kalsiyum mineral bileşendir. Aynı süreçte yer almak aynı molekül veya aynı sınıf olmak değildir.",
        nodes: [
          n(
            "D vitamini",
            "Kalsiyum–fosfor dengesinde rol alır.",
            "molecule",
            "D",
          ),
          n("Kalsiyum", "Mineral bileşenidir.", "molecule", "Ca"),
          n(
            "Kemik bağlamı",
            "Farklı bileşenler aynı sistemin işleyişine katkı verir.",
            "cell",
          ),
          n("Rol ayrımı", "İlişkiyi kur, özdeşlik çıkarma.", "document"),
        ],
      },
    ],
    recall: [
      {
        prompt: "Yağda çözünen dört vitamini ve bu bilginin sınırını söyle.",
        answer:
          "A, D, E ve K’dır. Depolanabilme özelliği, fazlasının her koşulda yararlı veya güvenli olduğu anlamına gelmez.",
      },
      {
        prompt:
          "Vitaminle mineralin ortak ve farklı bir özelliğini karşılaştır.",
        answer:
          "İkisi de düzenleyici işlevlere katkı verebilir ve insan için organik yakıt gibi enerji sağlamaz. Vitaminler organik, mineraller inorganik besin bileşenleridir.",
      },
    ],
    modelLimit:
      "Gruplama ve işlev çizimleri öğretim içindir; gerçek bireysel gereksinim, eksiklik tanısı, doz veya tedavi modeli değildir.",
  },
  {
    id: "nukleik-asitler",
    topicId: "detail-10",
    subjectId,
    title: "DNA ve RNA: birimden bilgi akışına",
    minutes: 30,
    source: `${part2}, PDF/basılı s.14–16.`,
    objectives: [
      "Baz, şeker, nükleozit ve nükleotiti ayır.",
      "Zincir omurgası ile karşılıklı baz eşleşmesini ayırt et.",
      "DNA/RNA özelliklerini ve eşitliklerin geçerli olduğu ölçeği belirle.",
    ],
    body: [
      {
        title: "Üç parçalı birimi kur",
        text: "Nükleotit; azotlu organik baz, beş karbonlu şeker ve fosfat grubundan oluşur. Baz+şeker nükleozittir; fosfat eklenince nükleotit olur. DNA’nın şekeri deoksiriboz, RNA’nın şekeri ribozdur. Adenin, guanin ve sitozin ikisinde de bulunur; tipik hücresel DNA’da timin, RNA’da urasil kullanılır. Bir bazın adını söylemek bütün nükleotitin molekül türünü belirlemeye her zaman yetmez; şeker bilgisini de kontrol et.",
      },
      {
        title: "Omurga ile karşı zincir bağını ayrı çiz",
        text: "Aynı zincirde komşu nükleotitler şeker–fosfat omurgasında fosfodiester bağlarıyla bağlanır. Çift zincirli DNA’da karşılıklı bazlar A–T ve G–C eşleşir; bunların arasında hidrojen bağları bulunur. Birincisi zinciri oluşturan kovalent bağlantı, ikincisi karşılıklı baz etkileşimidir. Hidrojen bağı kurulmasını her seferinde su açığa çıkaran dehidrasyon gibi sayma. DNA’nın yapısını öğrenirken ‘hangi iki parça bağlanıyor?’ sorusu bağ adını ezberden daha güvenilir kılar.",
      },
      {
        title: "A=T eşitliğini nereye uyguladın?",
        text: "Tamamlayıcı çift zincirli DNA’nın tümü için A sayısı T’ye, G sayısı C’ye eşittir. Tek zincirin kendi içinde aynı eşitlikler zorunlu değildir; karşı zincirle tamamlanır. A–T çiftinde iki, G–C çiftinde üç hidrojen bağı modeli kullanılır. Örneğin dört A–T ve üç G–C çifti için toplam 2×4+3×3=17 bağ sayılır. Yalnız toplam nükleotit sayısından her bazın eşit sayıda olduğunu çıkaramazsın; baz çifti bileşimi ayrıca gerekir.",
      },
      {
        title: "Bilgi, kopyalama ve kullanım",
        text: "Hücresel canlılarda DNA kalıtsal bilginin temel taşıyıcısıdır. DNA bilgisinin RNA’ya aktarılması ve uygun RNA’ların protein sentezindeki görevleri farklı süreçlerdir. mRNA mesajı, tRNA amino asitlerin taşınmasını, rRNA ribozomun yapısal ve katalitik işlevlerini destekler. RNA genellikle tek zincirli olsa da kendi üzerinde katlanıp baz eşleşmeleri kurabilir; ‘RNA’da hiç hidrojen bağı bulunamaz’ genellemesi doğru değildir. Bu hücresel çerçeveyi virüslerin bütün genom ve çoğalma yollarına aynen uygulama.",
      },
      {
        title: "Bulunduğu yer ile yönetici rolünü karıştırma",
        text: "Ökaryot hücrede çekirdek DNA’sı bulunur; mitokondri ve plastitlerin de kendi DNA’ları olabilir. Prokaryotlarda zarla çevrili çekirdek olmadan DNA bulunur. ‘DNA yalnız çekirdekte bulunur’ ve ‘çekirdeksiz hücrede DNA olamaz’ çıkarımları geçersizdir. Özel hücrelerin istisnalarını tüm organizmaya yayma. Nükleotit çeşitlerinin aynı olması bilgilerin aynı olması demek değildir; sayı ve diziliş farklı olabilir. Bir metinde bilgi akışı mı, molekül miktarı mı, baz sayısı mı sorulduğunu önce belirle.",
      },
    ],
    pitfalls: [
      {
        label: "Baz ile nükleotit aynı parça değildir",
        reason:
          "Nükleotit baz, şeker ve fosfatın bütünüdür; yalnız A harfi bütün yapıyı tarif etmez.",
      },
      {
        label: "A=T tek zincire otomatik uygulanmaz",
        reason:
          "Eşitlik tamamlayıcı çift zincirli molekülün tümü için geçerlidir.",
      },
      {
        label: "RNA’da hiç hidrojen bağı olmaz deme",
        reason: "Tek zincirli RNA katlanıp kendi içinde eşleşmeler kurabilir.",
      },
    ],
    cases: [
      {
        name: "Nükleotiti kur",
        question: "Baz ve şekere hangi parça eklenince nükleotit tamamlanır?",
        conclusion:
          "Fosfat grubu eklenir. Baz+şeker nükleozit, baz+şeker+fosfat nükleotittir; üç bileşeni birbirinin yerine adlandırma.",
        nodes: [
          n(
            "Azotlu baz",
            "A, G, C ve moleküle uygun T/U seçenekleri vardır.",
            "molecule",
          ),
          n("Pentoz şeker", "Riboz veya deoksiribozdur.", "molecule"),
          n("Fosfat", "Bütünün üçüncü parçasıdır.", "molecule", "P"),
          n("Nükleotit", "Üç bileşenli yapı birimidir.", "molecule"),
        ],
      },
      {
        name: "İki zinciri tamamla",
        question:
          "Bir zincirde A fazla bulunması, o zincirde T’nin de eşit olmasını zorunlu kılar mı?",
        conclusion:
          "Hayır. Tamamlayıcı eşleşme karşı zincirle kurulur. Molekülün iki zincirini birlikte saydığında A=T ve G=C eşitliği elde edilir.",
        nodes: [
          n(
            "Birinci zincir",
            "Kendi içinde baz sayıları eşit olmak zorunda değildir.",
            "molecule",
          ),
          n("A–T eşleşmesi", "A’nın karşısında T bulunur.", "molecule", "A–T"),
          n("G–C eşleşmesi", "G’nin karşısında C bulunur.", "molecule", "G–C"),
          n(
            "Bütün DNA",
            "İki zincirin toplamı üzerinden eşitlik kurulur.",
            "document",
          ),
        ],
      },
      {
        name: "Bağları say",
        question: "Dört A–T ve üç G–C çifti kaç hidrojen bağı içerir?",
        conclusion:
          "A–T için 4×2=8, G–C için 3×3=9; toplam 17’dir. Baz çifti sayısını tek tek nükleotit sayısıyla karıştırma.",
        nodes: [
          n(
            "4 A–T çifti",
            "Her biri iki hidrojen bağıyla eşleşir.",
            "number",
            "8",
          ),
          n(
            "3 G–C çifti",
            "Her biri üç hidrojen bağıyla eşleşir.",
            "number",
            "9",
          ),
          n("Toplam", "8+9=17 hidrojen bağıdır.", "number", "17"),
          n(
            "Omurga ayrı",
            "Fosfodiester bağları bu hesaba eklenmez.",
            "document",
          ),
        ],
      },
    ],
    recall: [
      {
        prompt: "Nükleozit ile nükleotit arasındaki farkı açıkla.",
        answer:
          "Nükleozit baz+şekerdir; buna fosfat eklendiğinde nükleotit olur. Nükleotit nükleik asidin yapı birimidir.",
      },
      {
        prompt: "Bir DNA zincirinde A=7 ve T=3 olabilir mi?",
        answer:
          "Olabilir. Tek zincirde A=T zorunlu değildir. Tamamlayıcı karşı zincirde bunlara uygun T=7 ve A=3 bulunduğunda iki zincirin toplamları eşitlenir.",
      },
    ],
    modelLimit:
      "Model tipik hücresel DNA/RNA ve tamamlayıcı çift zincirli DNA sayımı içindir. Virüs genomlarının tüm çeşitlerini veya gerçek atomik geometrileri göstermez.",
  },
];
