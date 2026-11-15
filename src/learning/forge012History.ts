import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

const authoredGuides = [
  {
    id: "milli-mucadele",
    title: "Millî Mücadele: yerel direnişten bağımsız devlete",
    source:
      "OGM Dersler Cepte T.C. İnkılap Tarihi 12, 3. sayı PDF s.10–21 ve 4. sayı PDF s.10–18; Aurelia 020 Millî Mücadele öğretim s.1–4 ile karşılaştırılmış özgün anlatım ve sorular. Resmî ÖSYM soruları kopyalanmamıştır.",
    minutes: 75,
    objectives: [
      "Bağımsızlık ve millî egemenlik hedeflerini belge ve kurumlarla ilişkilendir.",
      "Genelge, kongre, meclis, cephe ve antlaşmaları kronolojik olarak ayır.",
      "Askerî gelişmenin diplomatik konumu nasıl etkilediğini gerekçelendir.",
      "İmza, onay, uygulama ve kalıcı barış arasındaki farkı yeni bir soruya uygula.",
    ],
    sections: [
      {
        title: "İşgali, direnişi ve egemenliği birlikte düşün",
        paragraphs: [
          "Mondros sonrasındaki işgaller, Osmanlı yönetiminin etkili bir savunma kuramaması ve yerel halkın güvenlik kaygıları Millî Mücadele’nin ortamını oluşturdu. Müdafaa-i Hukuk cemiyetleri hakları savunmak ve kamuoyu oluşturmak; Kuvay-ı Millîye ise silahlı yerel direniş için ortaya çıktı. Cemiyet, kongre, temsil kurulu ve ordu birbirinin yerine kullanılan adlar değildir.",
          "Bir tarih sorusunda önce hangi sorunla karşılaşıldığını, kararı kimin aldığını ve bunun hangi sonucu doğurduğunu ayır. İşgale karşı çıkmak bağımsızlıkla; yönetme yetkisinin millete dayanması millî egemenlikle ilgilidir. İki hedef birbirini destekler ama bir dış askerî başarının kendiliğinden bütün iç siyasal kurumları kurduğu söylenemez.",
        ],
      },
      {
        title: "Samsun, Havza ve Amasya: görevden örgütlenmeye",
        paragraphs: [
          "Mustafa Kemal Paşa 19 Mayıs 1919’da müfettişlik göreviyle Samsun’a çıktı. Resmî görevlendirme ile geliştirdiği millî direniş stratejisini ayrı oku. Havza Genelgesi işgallere karşı miting ve protestolarla halkın bilinçlendirilmesini istedi; silahsız kamuoyu faaliyeti ile cephe muharebesi aynı yöntem değildir.",
          "22 Haziran 1919 Amasya Genelgesi tehlikeyi, İstanbul yönetiminin sorumluluğunu yerine getirememesini ve milletin azim ve kararına dayanan çözümü birlikte açıkladı. Sivas’ta bir millî kongre çağrısı örgütlenme yöntemiydi. Bu belge gelecekteki egemenlik anlayışını gösterir; TBMM’nin o gün açıldığı veya cumhuriyetin ilan edildiği anlamına gelmez.",
        ],
      },
      {
        title: "Erzurum ve Sivas: toplanış ile karar kapsamı",
        paragraphs: [
          "Erzurum Kongresi 23 Temmuz–7 Ağustos 1919 arasında doğu illerine dönük girişimle toplandı. Vatanın bütünlüğü, manda ve himayenin reddi ve millî irade gibi kararları bölgesel sınırı aşan nitelikteydi. Toplanışın bölgesel olması ile kararların millî olması aynı anda mümkündür. Temsil Heyeti kongre kararlarını yürütmek için oluşturuldu.",
          "4–11 Eylül 1919 Sivas Kongresi’nde cemiyetler Anadolu ve Rumeli Müdafaa-i Hukuk çatısında birleşti; Temsil Heyeti’nin bütün vatanı temsil etme niteliği güçlendi. Manda konusu tartışılıp reddedildi. Sonuca bakarak hiç tartışma yaşanmadığı söylenemez. Askerî komutan atama gibi yürütme işlevleri, heyetin yalnız bir düşünce topluluğu olmadığını gösterir.",
        ],
      },
      {
        title: "Amasya Görüşmeleri, Ankara ve Misak-ı Millî",
        paragraphs: [
          "Ekim 1919 Amasya Görüşmeleri’nde İstanbul hükûmeti ile Temsil Heyeti arasında görüşme yapıldı ve meclisin yeniden toplanması gündeme geldi. Amasya Genelgesi ile Amasya Görüşmeleri farklı tarih, aktör ve belge türleridir. Temsil Heyeti 27 Aralık’ta Ankara’ya geldi; ulaşım-haberleşme, güvenlik ve Batı Cephesi’ne yakınlık tercihinde etkiliydi.",
          "Son Osmanlı Mebusan Meclisi 28 Ocak 1920’de Misak-ı Millî’yi kabul etti. Ulusal sınır, bağımsızlık ve ekonomik-hukuki egemenlik hedefleri bu çerçevededir. Belgeyi ilk kabul eden kurum TBMM değildir. İstanbul’un 16 Mart 1920’de resmen işgali ve meclisin çalışamaz hâle gelmesi Ankara’da yeni meclisin toplanması sürecini hızlandırdı.",
        ],
      },
      {
        title: "TBMM: temsil ile olağanüstü yetki",
        paragraphs: [
          "23 Nisan 1920’de Ankara’da açılan TBMM, millet egemenliğine dayanan yeni yönetimin merkezi oldu. Yasama ve yürütme yetkilerinin mecliste toplanması güçler birliğidir; bakanların meclisçe ayrı ayrı seçilmesi meclis hükûmeti sistemini açıklar. Savaş koşullarında hızlı karar ihtiyacı ile temsilin kaynağını birlikte değerlendirmek gerekir.",
          "20 Ocak 1921 Teşkilat-ı Esasiye Kanunu millî egemenlik esasını anayasal düzeyde ifade etti. Meclisin açılışı, ilk anayasa, saltanatın kaldırılması ve cumhuriyetin ilanı farklı adımlardır. Ankara meclisine karşı ayaklanmalar asker ve kaynak ihtiyacını artırdı; Hıyanet-i Vataniye Kanunu ve İstiklal Mahkemeleri gibi önlemler bu olağanüstü ortamda değerlendirilir.",
        ],
      },
      {
        title: "Sevr ile imza, onay ve uygulama ayrımı",
        paragraphs: [
          "10 Ağustos 1920’de Osmanlı heyeti Sevr metnini imzaladı; TBMM bunu reddetti. Paylaşım ve egemenlik sınırlamaları bağımsızlık hedefleriyle bağdaşmıyordu. İmzalanmış bir metnin hukukça onaylanması, karşı taraflarca kabulü ve fiilen uygulanması ayrı sorulardır; Sevr kalıcı ve uygulanmış bir barış düzeni hâline gelmedi.",
          "Soru metnindeki fiili dikkatle oku: önerildi, imzalandı, onaylandı ve yürürlüğe girdi aynı olayı anlatmaz. Millî Mücadele’nin askerî-diplomatik sonucu, Sevr’e dayalı paylaşım yerine Lozan’la yeni bir barış düzeninin kurulmasına yol açtı. Lozan’ı Sevr’in birkaç küçük düzeltmeyle uygulanması olarak tanımlamak bu temel farkı siler.",
        ],
      },
      {
        title: "Doğu ve Güney cepheleri: aynı yöntem yok",
        paragraphs: [
          "Doğu Cephesi’nde Kâzım Karabekir komutasındaki düzenli birlikler Ermenistan kuvvetleriyle mücadele etti; Aralık 1920 Gümrü Antlaşması TBMM hükûmetinin ilk antlaşması olarak önem taşır. Doğu sınırının sonraki biçimlenişinde 1921 Moskova ve Kars antlaşmaları da rol oynadı. Bir başlangıç antlaşmasını bütün sınırların değişmez son hâli sayma.",
          "Güneyde Antep, Maraş ve Urfa çevresindeki yerel direniş Fransız işgaline karşı etkiliydi. Fransa’yla 20 Ekim 1921 Ankara Antlaşması çatışmaların sonlandırılması ve diplomatik tanınma bakımından önemlidir; Hatay hemen Türkiye’ye katılmadı. Cephe adı sorulduğunda coğrafya, karşı taraf ve kuvvet türünü birlikte kullan; bütün cephelere aynı ordu ve aynı antlaşmayı atama.",
        ],
      },
      {
        title: "Batı Cephesi ve düzenli ordu",
        paragraphs: [
          "Kuvay-ı Millîye ilk direnişte önemliydi; merkezî komuta, disiplin ve ikmal eksikleri büyük ölçekli muharebelerde sorun yaratıyordu. Düzenli ordunun kurulması yerel direnişin hiç yararı olmadığı anlamına gelmez. I. İnönü Ocak 1921’de yeni düzenli ordunun Batı Cephesi’ndeki başarısı olarak tanınır; bütün Millî Mücadele’nin ilk askerî başarısı diye koşulsuz genelleme yapma.",
          "1921 Londra Konferansı, Afganistan’la dostluk ve Moskova Antlaşması aynı dönemin diplomatik gelişmeleridir. Bir muharebe itibar ve pazarlık konumunu etkileyebilir; her antlaşmanın tek nedeni olduğunu göstermez. II. İnönü’den sonra Kütahya-Eskişehir’de geri çekilme yaşanması, sürecin kesintisiz zaferler dizisi olmadığını gösterir.",
        ],
      },
      {
        title: "Sakarya’ya hazırlanmak: ordu, kaynak ve eğitim",
        paragraphs: [
          "Kütahya-Eskişehir sonrasında ordunun Sakarya’nın doğusuna çekilmesi kuvvetleri koruyup toparlanma amacı taşıdı. 5 Ağustos 1921 Başkomutanlık Kanunu ile Mustafa Kemal’e süreli olarak askerî kararları hızlandıran yetkiler verildi. Tekâlif-i Millîye emirleri silah, giyecek, taşıma ve üretim kaynaklarını seferber etmeye yöneliktir.",
          "Temmuz 1921 Maarif Kongresi savaş sürerken eğitim geleceğinin de tartışıldığını gösterir. Bir kaynağın aynı yılı vermesi kongreyi askerî antlaşma yapmaz. 23 Ağustos–13 Eylül 1921 Sakarya Muharebesi Yunan ilerleyişini durdurdu; savunma üstünlüğü ile kesin taarruzun tamamlanmasını ayır. Kars ve Ankara antlaşmalarının zamanı bu askerî-diplomatik ilişkiyi gösterir.",
        ],
      },
      {
        title: "Büyük Taarruz, Mudanya ve Lozan",
        paragraphs: [
          "26 Ağustos 1922’de başlayan Büyük Taarruz ve 30 Ağustos Başkomutan Meydan Muharebesi Batı Anadolu’daki işgalin sona erdirilmesinde belirleyici oldu. 9 Eylül’de İzmir’e girilmesi bu takibin parçasıdır. Sonuçtan önceki hazırlık, kaynak ve komuta düzenini görmeden başarıyı tek güne indirgeme.",
          "11 Ekim 1922 Mudanya bir ateşkestir; Doğu Trakya’nın çatışma olmadan devralınmasının yolunu açtı. 24 Temmuz 1923 Lozan ise barış antlaşmasıdır. Kapitülasyonlar kaldırıldı; borçlar ve sınırlar düzenlendi, Musul meselesi sonraki görüşmelere kaldı. Boğazların 1923 statüsüyle 1936 Montrö düzenini karıştırma: her egemenlik meselesi aynı gün aynı ölçüde çözümlenmedi.",
        ],
      },
    ],
    examples: [
      {
        title: "İki Amasya, iki işlev",
        prompt:
          "Bir kart 22 Haziran 1919’da bütün millete çağrıyı; başka kart Ekim 1919’da İstanbul hükûmeti temsilcisiyle görüşmeyi anlatıyor. Aynı olay mı?",
        strategy: "Tarih, aktör ve fiili ayrı sütunlara koy.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Haziran kartı Amasya Genelgesi: gerekçe ve millî örgütlenme yöntemi.",
          },
          {
            label: "2. adım",
            explanation:
              "Ekim kartı Amasya Görüşmeleri: Temsil Heyeti ile hükûmet temsilcisi arasında görüşme.",
          },
          {
            label: "3. adım",
            explanation:
              "Yer adı aynı olsa da belge türü ve katılımcılar farklıdır.",
          },
        ],
        answer: "Hayır; genelge ile görüşme ayrı olaylardır.",
        check: "TBMM iki tarihte de henüz açılmamıştır.",
        pitfall: "Yer adından doğrudan tek olay seçmek.",
      },
      {
        title: "Kongrede kapsam",
        prompt:
          "Doğu illerinin temsilcileri, bütün vatanın parçalanamaz olduğunu ve mandayı kabul etmeyeceklerini bildiriyor. Bölgesel toplantı millî karar alabilir mi?",
        strategy: "Çağrı alanı ile kararın nesnesini ayır.",
        steps: [
          {
            label: "1. adım",
            explanation: "Katılımcı tabanı doğu illeri: toplantı bölgeseldir.",
          },
          {
            label: "2. adım",
            explanation:
              "Karar bütün vatan ve bağımsızlık hakkında: kapsam millîdir.",
          },
          {
            label: "3. adım",
            explanation: "Bu iki veri Erzurum Kongresi’yle birlikte uyumludur.",
          },
        ],
        answer: "Evet; Erzurum’un toplanışı bölgesel, kararları millîdir.",
        check: "Sivas’ın örgütsel birleşmesi ayrı bir kanıttır.",
        pitfall:
          "Bölgesel sözcüğünü kararların da yerel kalması zorunluluğu saymak.",
      },
      {
        title: "Cephe belgesi",
        prompt:
          "Bir metinde Fransa, yerel şehir direnişleri ve 20 Ekim 1921’de çatışmanın sona ermesi birlikte geçiyor. Hangi cephe ve antlaşma?",
        strategy: "Karşı tarafı, coğrafyayı ve tarihi eşleştir.",
        steps: [
          {
            label: "1. adım",
            explanation: "Fransa ve şehir direnişi Güney Cephesi’ni destekler.",
          },
          {
            label: "2. adım",
            explanation: "20 Ekim 1921 belgesi Ankara Antlaşması’dır.",
          },
          {
            label: "3. adım",
            explanation:
              "Hatay’ın 1939’da katılması ayrı süreçtir; bu belgeye taşınamaz.",
          },
        ],
        answer: "Güney Cephesi ve Ankara Antlaşması.",
        check:
          "Gümrü’nün karşı tarafı Ermenistan, Mudanya’nın türü ateşkestir.",
        pitfall: "Bütün cephelerin Mudanya’yla kapandığını varsaymak.",
      },
      {
        title: "Savaştan barışa",
        prompt:
          "Sakarya 1921, Büyük Taarruz Ağustos 1922, Mudanya Ekim 1922, Lozan Temmuz 1923. Hangisi kalıcı barış düzenini kurar?",
        strategy: "Önce olay türlerini ayır, sonra sırala.",
        steps: [
          {
            label: "1. adım",
            explanation: "Sakarya ve Büyük Taarruz askerî muharebelerdir.",
          },
          {
            label: "2. adım",
            explanation: "Mudanya çatışmanın durdurulması için ateşkestir.",
          },
          {
            label: "3. adım",
            explanation:
              "Lozan sınır, egemenlik ve devletler arası statüyü düzenleyen barış antlaşmasıdır.",
          },
        ],
        answer: "Lozan Barış Antlaşması.",
        check:
          "Musul’un sonraya kalması, her sorunun aynı gün bitmediğini gösterir.",
        pitfall: "En son askerî zaferi doğrudan barış antlaşması saymak.",
      },
    ],
    recall: [
      {
        prompt: "Misak-ı Millî’yi ilk hangi kurum kabul etti?",
        answer: "Son Osmanlı Mebusan Meclisi, 28 Ocak 1920.",
      },
      {
        prompt: "Amasya Genelgesi ile TBMM arasındaki egemenlik farkı?",
        answer:
          "Genelge millî iradeye dayalı yöntemi ilan etti; TBMM bunu yönetim kurumuna dönüştürdü.",
      },
      {
        prompt: "1921 Ankara ile 1922 Mudanya’yı ayır.",
        answer:
          "Ankara Fransa’yla Güney Cephesi bağlamındaki antlaşma; Mudanya Batı’daki kesin taarruz sonrasında ateşkestir.",
      },
      {
        prompt:
          "1923 Lozan’da Musul ve Boğazlar tamamen bugünkü durumuna mı geldi?",
        answer:
          "Hayır. Musul sonraki görüşmelere kaldı; Boğazların statüsü 1936 Montrö’yle değişti.",
      },
    ],
  },
  {
    id: "ataturkculuk-inkilap",
    title: "Atatürkçülük ve inkılaplar: amaçtan kurumlara",
    source:
      "OGM Dersler Cepte İnkılap Tarihi 12, 4. sayı PDF s.19–22 ve 5. sayı PDF s.10–18; Aurelia 021 öğretim s.1–4. Özgün açıklama ve uygulamalar; resmî ÖSYM sorusu değildir.",
    minutes: 75,
    objectives: [
      "Altı ilkeyi reformların açık amaçlarıyla ilişkilendir.",
      "Medeni hak, siyasal temsil ve eğitim yönetimi alanlarını ayır.",
      "Kabul, yürürlük ve uygulama tarihlerini karşılaştır.",
      "Kamu yatırımı, özel girişim ve hizmet erişiminden sınırlı çıkarım yap.",
    ],
    sections: [
      {
        title: "İlke ile düzenlemeyi ayrı sor",
        paragraphs: [
          "İnkılap kurum ve uygulamada köklü değişim; ilke bu değişime yön veren temel düşüncedir. Bir kanun birden çok ilkeyle ilişkili olabilir. Sorunun verdiği amaç, bütün olası ilişkilerden hangisinin öne çıktığını belirler. Millî egemenlik deniyorsa karar yetkisinin kaynağını, eşitlik deniyorsa ayrıcalığı, laikleşme deniyorsa hukukun ve yönetimin dayanağını incele.",
          "Altı ilke cumhuriyetçilik, milliyetçilik, halkçılık, devletçilik, laiklik ve inkılapçılıktır. Bunları yalnız eşleştirme listesi olarak öğrenmek yerine amaç–araç–sonuç dizisi kur. Bir kurumun açılması başarı hedefini gösterir; hedefin toplumun her noktasında hemen tamamlandığını tek başına kanıtlamaz. İlkeler 1937’de Anayasa’ya girdi; uygulamalarının tümü o yıl başlamadı.",
        ],
      },
      {
        title: "Millî egemenliğin siyasal adımları",
        paragraphs: [
          "TBMM’nin açılması 1920, saltanatın kaldırılması 1 Kasım 1922, Ankara’nın başkent olması 13 Ekim 1923, cumhuriyetin ilanı 29 Ekim 1923’tür. Saltanatın kaldırılması hanedan yönetimine, cumhuriyetin ilanı devletin yönetim biçimi ve cumhurbaşkanlığı düzenine ilişkindir. Birbirine yakın siyasal sonuçlar aynı olay değildir.",
          "Cumhuriyetin ilanıyla cumhurbaşkanı ve başbakanın yer aldığı kabine sistemine geçildi. Millî egemenlik ilkesinin ifade edilmesi ile bütün demokratik katılım haklarının aynı anda tamamlanması da farklıdır. Soru, “hükûmet kurma bunalımı” diyorsa yürütmenin kuruluşunu; “karar millete aittir” diyorsa egemenlik dayanağını düşün.",
        ],
      },
      {
        title: "Laiklik ve 3 Mart 1924 düzenlemeleri",
        paragraphs: [
          "3 Mart 1924’te halifelik kaldırıldı, Tevhid-i Tedrisat kabul edildi ve Şeriye ve Evkaf Vekâleti kaldırıldı. Aynı tarihteki ayrı kanunların nesneleri farklıdır: dinî-siyasal makam, eğitim yönetimi ve bakanlık düzeni. Bu adımlar hukuk ve kamu yönetiminin laikleşmesiyle ilişkilidir. Saltanat ise bu tarihten önce kaldırılmıştır.",
          "Laiklik bireyin inancının yok edilmesi veya herkesin aynı inanca zorlanması değildir. Devletin hukuk ve kamu yönetiminde dinî otoritenin belirleyiciliğinin ayrılması, vicdan özgürlüğü ve eşit yurttaşlıkla ilişkilidir. Bir okulun denetimi ile bir kişinin inanç tercihinin niteliğini ayrı değerlendir; kurumsal düzenlemeyi kişisel inanç hakkında kesin çıkarıma dönüştürme.",
        ],
      },
      {
        title: "Medeni Kanun: kabul, yürürlük ve hak alanı",
        paragraphs: [
          "Türk Medeni Kanunu 17 Şubat 1926’da kabul edildi, 4 Ekim 1926’da yürürlüğe girdi. Aile, evlenme, boşanma, miras ve kişiler hukukunda laik ve birlikçi düzen kurdu. Resmî nikâh, tek eşlilik ve kadınların medeni hakları bu bağlamda değerlendirilir. Kanunun kabulüyle uygulamaya girişinin ayrı tarihler olduğunu not et.",
          "Kadınların milletvekili seçim hakkı Medeni Kanun’un verdiği hak değildir. Belediye 1930, köy muhtarlığı ve ihtiyar heyeti 1933, milletvekili seçme-seçilme 1934 adımlarını ayrı izle. Aile ve miras eşitliğini siyasal temsil hakkıyla karıştırmak, doğru tarihleri ezberlesen bile yanlış sonuca götürür.",
        ],
      },
      {
        title: "Eğitim birliği ve okuryazarlık",
        paragraphs: [
          "Tevhid-i Tedrisat Kanunu eğitim yönetiminin Millî Eğitim Bakanlığında birleştirilmesine yöneldi. Program, denetim ve kurum birliği hedefi ile bütün öğrencilerin aynı sürede aynı başarıya ulaşması farklıdır. Azınlık ve yabancı okulların denetlenmesi de egemenlik ve eğitim birliği kapsamındadır.",
          "1 Kasım 1928’de yeni Türk harflerinin kabulü yazı sistemini değiştirdi. 1929 Millet Mektepleri yetişkinlerin yeni harflerle okuryazarlığına yönelikti. Bir alfabenin kabulü hukuki düzenleme, onu öğrenmek için okul açılması uygulama aracıdır. Bu ikisini neden–araç ilişkisiyle bağla; “tek günde okuryazarlık tamamlandı” sonucu çıkarma.",
        ],
      },
      {
        title: "Dil, tarih, üniversite ve sanat",
        paragraphs: [
          "Türk Tarih Kurumu 1931, Türk Dil Kurumu 1932 bağlamında millî kültür ve bilimsel araştırma kurumlaşması ele alınır. Milliyetçilik ortak tarih, dil ve bağımsızlık bilinciyle ilgilidir; ırk üstünlüğü iddiasıyla eşitlenmez. Dilin araştırılması ile yeni alfabenin kabul edilmesi farklı çalışma alanlarıdır.",
          "1933 Üniversite Reformu İstanbul Üniversitesinin kuruluş sürecini ifade eder. Öğretmen yetiştirme, konservatuvar, müze, resim ve tiyatro girişimleri kültür-eğitimin farklı boyutlarıdır. Kurumun niteliğini tarihle birlikte tanı; her okulun askerî okul veya her kültür kurumunun yalnız bir sınav dersini öğretmek için açıldığı söylenemez.",
        ],
      },
      {
        title: "Toplumsal düzen ve ortak ölçüler",
        paragraphs: [
          "Şapka Kanunu, tekke ve zaviyelerin kapatılması, takvim-saat-ölçü değişimleri ve Soyadı Kanunu toplumsal hayatta farklı sorunları hedefledi. Miladi takvimin 1926’da kullanılmaya başlaması ve metre-kilogram gibi ortak ölçüler, uluslararası ilişkiler ve gündelik işlemlerde birliği kolaylaştırdı. Hedeflenen alanı adından değil işlevinden tanı.",
          "Soyadı Kanunu 21 Haziran 1934’te kabul edildi; resmî kimlik ve kayıtların düzenlenmesini sağladı. TBMM’nin 24 Kasım’da Mustafa Kemal’e Atatürk soyadını vermesi ayrı işlemdir. Unvanların kaldırılması toplumsal ayrıcalıkların azaltılmasıyla ilişkilidir. Her düzenlemeyi alfabe değişikliği veya her tarih farkını yeni bir anayasa sanma.",
        ],
      },
      {
        title: "Ekonomik bağımsızlık ve devletçilik",
        paragraphs: [
          "1923 İzmir İktisat Kongresi savaş sonrasının ekonomik hedef ve ihtiyaçlarını tartıştı. Özel girişim, yerli üretim, tarım ve ticaretin güçlendirilmesi hedeflendi. 1925’te aşarın kaldırılması tarımsal yükü; kabotaj düzeni kıyı taşımacılığındaki egemenliği; demiryolu ve banka girişimleri üretim-finansman altyapısını ilgilendirir.",
          "1930’larda devletin sanayi yatırımı ve planlama rolü arttı; 1934 Birinci Beş Yıllık Sanayi Planı devletçilik kapsamında incelenir. Bu ilke bütün özel mülkiyetin yasaklandığı anlamına gelmez. Kongre 1923, plan 1934: aynı hedefin farklı dönemlerde farklı araçlarla izlenebileceğini gör. Başarı oranı soruluyorsa yalnız karar metni değil üretim ve uygulama verisi gerekir.",
        ],
      },
      {
        title: "Halkçılık ve koruyucu sağlık",
        paragraphs: [
          "Halkçılık hukuk önünde eşitlik, ayrıcalıkların azaltılması ve kamusal hizmetlerin toplumun geniş kesimlerine ulaşmasıyla ilgilidir. Hıfzıssıhha Müessesesinin 1928’de kurulması ve 1930 Umumi Hıfzıssıhha Kanunu salgınlarla mücadele ve koruyucu sağlık altyapısına örnektir. Sağlık kurumu açılmasıyla hastalığın o gün bütünüyle ortadan kalkması aynı şey değildir.",
          "Bir metin ücretsiz ya da yaygın eğitim-sağlık hizmetini vurguluyorsa erişim ve sosyal eşitlik boyutunu ara. Kurumun bilimsel yöntemi akılcılıkla, devlet yatırımı kamunun ekonomik rolüyle ayrıca ilişkili olabilir. Doğru sınav cevabı, kökün özellikle istediği ilişkiye dayanır; birden çok ilkeyle ilişkili olabilmeyi belirsizlik gibi görmeden verilen kanıta odaklan.",
        ],
      },
      {
        title: "Kronolojiyi bir karşılaştırma aracı yap",
        paragraphs: [
          "1922 saltanat, 1923 cumhuriyet, 1924 eğitim birliği-halifelik, 1926 Medeni Kanun, 1928 harfler, 1931 tarih, 1932 dil, 1933 üniversite, 1934 siyasal hak ve soyadı, 1937 ilkeler dizisini bir zaman çizgisine yerleştir. Bu liste bütün düzenlemelerin eksiksiz takvimi değildir; temel bağlantılar için işaret noktalarıdır.",
          "Örneğin 1933 tarihli bir konuşmadan 1934 milletvekili hakkının zaten verildiği sonucunu çıkaramazsın. “Önce”, “sonra”, “aynı yıl” ve “aynı gün” farklı ilişkilerdir. Kabul-yürürlük ve kurum-faaliyet ayrımını yaparak aynı olayın iki tarihini iki ayrı reform sanma. Modelde tarih ile reformun değiştirdiği hak alanını birlikte kontrol et.",
        ],
      },
    ],
    examples: [
      {
        title: "Hangi hak?",
        prompt:
          "1926 tarihli bir düzenleme evlenme ve miras ilişkilerini değiştiriyor. Milletvekili seçimi hakkını da verdiği söylenebilir mi?",
        strategy: "Düzenlemenin hak alanını tespit et.",
        steps: [
          {
            label: "1. adım",
            explanation: "Evlenme-miras medeni hukuk alanıdır.",
          },
          {
            label: "2. adım",
            explanation: "1926 Medeni Kanun bu alanı düzenler.",
          },
          {
            label: "3. adım",
            explanation:
              "Milletvekili seçimi siyasal haktır ve kadınlar açısından 1934 adımıdır.",
          },
        ],
        answer: "Hayır; iki ayrı hak alanı ve tarih vardır.",
        check:
          "Belediye ve köy seçimleri de milletvekili hakkından önce ayrı adımlardır.",
        pitfall: "Kadın hakları ifadesi geçen her olayı tek tarihe toplamak.",
      },
      {
        title: "Amaç ve araç",
        prompt:
          "Yeni alfabe kanunundan sonra yetişkinler için Millet Mektepleri açılıyor. Aralarındaki ilişki nedir?",
        strategy: "Yasal değişim ile onu öğreten kurumu ayır.",
        steps: [
          {
            label: "1. adım",
            explanation: "1928 düzenlemesi yazı sistemini değiştirir.",
          },
          {
            label: "2. adım",
            explanation: "1929 Millet Mektepleri yetişkin öğretimini yürütür.",
          },
          {
            label: "3. adım",
            explanation:
              "Okul açılması uygulama aracıdır, herkesin hemen öğrendiği kanıtı değildir.",
          },
        ],
        answer:
          "Yeni harflerin halka öğretilmesi için eğitim aracı kurulmuştur.",
        check: "Tevhid-i Tedrisat 1924 eğitim yönetimi birliğidir.",
        pitfall: "Üç eğitim adımını aynı kurum adı saymak.",
      },
      {
        title: "Devletçilikte sınır",
        prompt:
          "Devlet bir sanayi planıyla fabrika kuruyor; metin özel işletmelerin sürdüğünü de belirtiyor. Devletçilikle çelişir mi?",
        strategy: "Kamunun rolü ile özel mülkiyetin durumunu ayrı izle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Fabrika ve plan kamu yatırımını gösterir.",
          },
          {
            label: "2. adım",
            explanation:
              "Özel işletmelerin devamı tüm üretimin devletçe tekelleştirilmediğini gösterir.",
          },
          {
            label: "3. adım",
            explanation:
              "Devletçilik özel girişimin koşulsuz yasaklanması değildir.",
          },
        ],
        answer:
          "Hayır; devlet öncülüğündeki kalkınmayla özel girişim birlikte bulunabilir.",
        check: "1923 kongresiyle 1934 planının tarihlerini ayrı tut.",
        pitfall: "Devletçiliği her özel işletmenin kapanması diye tanımlamak.",
      },
      {
        title: "Zaman sınırı",
        prompt:
          "1933 tarihli konuşmaya ilişkin bir soruda seçeneklerde 1928 alfabe,1931 tarih kurumu ve 1934 milletvekili hakkı var. Hangisi henüz sonradır?",
        strategy: "Kritik tarih çizgisi koy.",
        steps: [
          {
            label: "1. adım",
            explanation: "1928 ve 1931,1933’ten öncedir.",
          },
          {
            label: "2. adım",
            explanation: "1934,1933’ten sonradır.",
          },
          {
            label: "3. adım",
            explanation: "Yalnız tarihin izin verdiği bilgiye karar ver.",
          },
        ],
        answer: "1934 kadınların milletvekili seçim hakkı sonradır.",
        check: "Medeni hakların da 1934’e kadar hiç olmadığı sonucu çıkmaz.",
        pitfall: "Bir hakkın sonraki tarihiyle bütün hakları yok saymak.",
      },
    ],
    recall: [
      {
        prompt: "Devletçilik özel girişimi ortadan kaldırır mı?",
        answer:
          "Hayır; kamu yatırım ve planlama rolü özel girişimle birlikte bulunabilir.",
      },
      {
        prompt: "Tevhid-i Tedrisat ve harf inkılabının nesneleri?",
        answer:
          "İlki eğitim yönetiminde birlik; ikincisi yazı sistemi değişikliğidir.",
      },
      {
        prompt: "Medeni Kanun kabul ve yürürlük tarihleri?",
        answer:
          "17 Şubat 1926 kabul;4 Ekim 1926 yürürlük. Kadınların milletvekili hakkı 1934’tür.",
      },
      {
        prompt: "1937 neyin başlangıcı değil, neyin tarihi?",
        answer:
          "Bütün reformların başlangıcı değil, altı ilkenin Anayasa’ya girmesi tarihidir.",
      },
    ],
  },
  {
    id: "iki-savas-arasi-turkiye-dunya",
    title: "İki savaş arasında Türkiye: iç siyaset ve diplomasi",
    source:
      "OGM Dersler Cepte İnkılap Tarihi 12, 5. sayı PDF s.19–21; OGM 124 Atatürk Dönemi Dış Politika ders notlarının ilgili öğretim sayfaları; OGM 125 PDF s.16–17,21–22,29–32. Bu ünitede Türkiye odaklı gelişmeler, sonraki ünitede küresel düzen işlenir. Aurelia 020/021 bağlantı bilgileriyle karşılaştırılmış özgün öğretimdir.",
    minutes: 75,
    objectives: [
      "Çok partili denemeleri aktör, tarih ve kapanış türüyle karşılaştır.",
      "Musul, mübadele, Montrö ve Hatay süreçlerini taraf ve konularıyla ayır.",
      "Bölgesel paktların üyelerini ve güvenlik amaçlarını açıkla.",
      "Diplomatik başlangıç, ara aşama ve sonuç tarihlerini birbirine karıştırmadan yorumla.",
    ],
    sections: [
      {
        title: "Aynı dönem, farklı inceleme ölçeği",
        paragraphs: [
          "1919–1938 dünya tarihi ile Türkiye’nin iç ve dış siyaseti iç içedir; bu ünitede odağımız Türkiye’de temsil, yönetim ve Lozan sonrası diplomasi sorunlarıdır. Sonraki “Küresel savaşlar arasında” ünitesinde Milletler Cemiyetinin yapısı,1929 bunalımının yayılması ve siyasal rejimler ele alınır. Tarihler ortak olabilir; aynı konunun iki kez bitirilmesi hedeflenmez.",
          "Bir dış politika sorununu taraf–konu–yöntem–sonuç tablosuna yerleştir. Musul Irak sınırını, mübadele nüfus değişimini, Montrö Boğazların güvenlik ve geçiş düzenini, Hatay ayrı bir sınır-statü sürecini anlatır. Bir antlaşmanın adı tek başına yeterli değildir: Ankara 1921 ile Ankara 1926 farklı taraf ve konulara sahiptir.",
        ],
      },
      {
        title: "Meclisler ve siyasal temsil",
        paragraphs: [
          "I. TBMM Millî Mücadele’yi yönetti;1923 seçimleriyle II. TBMM çalışmaya başladı ve reformların önemli bölümü bu dönemde gerçekleştirildi. Meclis içindeki I. ve II. gruplarla farklı tarihlerde kurulan siyasal partileri birbirine karıştırma. Bir grup adı, tek başına bugünkü anlamıyla ayrı bir parti örgütünün tüm özelliklerini göstermez.",
          "1923 Halk Fırkası,1924 Terakkiperver Cumhuriyet Fırkası ve 1930 Serbest Cumhuriyet Fırkası farklı girişimlerdir. Muhalefetin hükûmeti denetlemesi siyasal çoğulculukla ilgilidir. Partinin kurulması kalıcı çok partili hayatın hemen yerleştiğini, kapanması ise toplumda bütün farklı görüşlerin yok olduğunu göstermez; kurum ve toplumsal görüş ayrı düzeylerdir.",
        ],
      },
      {
        title: "Çok partili denemeler ve güvenlik olayları",
        paragraphs: [
          "Terakkiperver Cumhuriyet Fırkası 1924’te kuruldu;1925 Şeyh Said İsyanı ve Takrir-i Sükûn ortamında kapatıldı.1930’da Fethi Okyar’ın kurduğu Serbest Cumhuriyet Fırkası aynı yıl kendisini feshetti. Kapatılma ile kurucusunun fesih kararı aynı hukuki süreç değildir. İzmir suikast girişimi 1926, Menemen Olayı 1930 kronolojisindedir.",
          "Muhalefet partisi, isyan ve tek tek insanların suçları otomatik olarak aynı şey sayılamaz. Metnin açıkça verdiği bağ ile senin kurduğun varsayımı ayır. Dersin hedefi olayları aktör, tarih ve devletin aldığı önlemle anlamaktır; tek bir sloganla bütün aktörlerin niyetini kesin biçimde açıklamak değil. Olağanüstü güvenlik önlemlerinin siyasal katılım üzerindeki etkisi ayrıca değerlendirilir.",
        ],
      },
      {
        title: "Lozan sonrası sorunlara yöntemle yaklaş",
        paragraphs: [
          "Türkiye’nin 1923–1930 dış politikasında Lozan’dan kalan sorunlar öne çıktı.1930’larda Avrupa’daki yayılmacılığın büyümesi bölgesel güvenlik ve barış iş birliğini daha önemli kıldı. Bu dönemleme bütün ilişkilerin bir günde değiştiği anlamına gelmez; aynı süreçte ekonomik, sınır ve güvenlik sorunları birlikte sürüyordu.",
          "Bağımsızlık ve barışçılık birbirine karşıt değildir. Görüşme, uluslararası kurum başvurusu, satın alma veya sözleşme değişikliği birer diplomatik araçtır. “Barışçı politika” her talebin kabul edilmesi veya güvenlik tedbirlerinden vazgeçilmesi demek değildir. Sonucu değerlendirirken kararın hangi egemenlik alanını etkilediğini açıkça belirt.",
        ],
      },
      {
        title: "Musul: Lozan’dan 1926 Ankara’ya",
        paragraphs: [
          "Musul konusu Lozan’da çözümlenmeyip Türkiye ile İngiltere arasındaki görüşmelere bırakıldı.1924 Haliç görüşmelerinden sonuç alınamayınca mesele Milletler Cemiyeti sürecine taşındı.1926 Ankara Antlaşması ile Türkiye-Irak sınırı düzenlendi; Musul Irak’ta kaldı. Ekonomik kaynak ve uluslararası güç ilişkileri konunun önemini artırıyordu.",
          "Bu belge 1921’de Fransa’yla yapılan Ankara Antlaşması değildir. Aynı şehir adı antlaşmaları tekleştirmez. İç güvenlik sorunları ve dış diplomatik koşullar kararı birlikte etkiledi; tek bir olay bütün nedenleri açıklamaz. Soruda “Lozan’da kaldı”, “Haliç” ve “İngiltere” kanıtları birleşiyorsa önce Musul sürecini yerleştir.",
        ],
      },
      {
        title: "Mübadele, okullar ve borçlar",
        paragraphs: [
          "Türk-Yunan nüfus mübadelesinde yerleşik sayılma tartışmaları yaşandı;1930 uzlaşması iki ülke ilişkilerinin iyileşmesini destekledi. İstanbul Rumları ve Batı Trakya Türkleri için istisna koşulları önemlidir; “bütün nüfus istisnasız değiştirildi” genellemesi yanlıştır. Mübadele, vatandaşların kendiliğinden günlük yer değiştirmesi değil devletler arası düzenlemedir.",
          "Yabancı okulların Türk hukukuna göre denetlenmesi iç egemenlik meselesi olarak ele alındı. Osmanlı borçlarının ödeme koşulları ve demiryollarının millîleştirilmesi ekonomik-mali başlıklardır. Bir ülkeyle birden çok uyuşmazlık yaşanabilir; borç sorununu nüfus mübadelesi veya okul denetimiyle aynı nesne sayma. Millîleştirme bazı örneklerde satın alma yoluyla gerçekleşmiştir.",
        ],
      },
      {
        title: "Milletler Cemiyeti, Balkan Antantı ve Sadabat",
        paragraphs: [
          "Türkiye 1932’de Milletler Cemiyetine katıldı.1934 Balkan Antantı Türkiye, Yunanistan, Yugoslavya ve Romanya arasında bölgesel güvenliği amaçladı.1937 Sadabat Paktı Türkiye, İran, Irak ve Afganistan arasında komşuluk ve saldırmazlık çerçevesi oluşturdu. Bu oluşumlar aynı üye listesine veya aynı coğrafi kapsama sahip değildir.",
          "Bir örgüte katılmak bütün uyuşmazlıkların biteceği garantisi değildir. Bulgaristan ve Arnavutluk Balkan Antantı’na, Suriye ise Sadabat Paktı’na katılmadı. Haritada yakın görünmek hukuki üyelik kanıtı sayılmaz. Dış politika modelinde üyeleri ve sorunun niteliğini birlikte karşılaştır; barış hedefini gerçekleşmiş kesin güvenlikle eşitleme.",
        ],
      },
      {
        title: "Montrö: güvenlik ile geçişi birlikte oku",
        paragraphs: [
          "1923 Lozan düzeninde Boğazlarda uluslararası komisyon ve askerden arındırma hükümleri vardı. Türkiye değişen güvenlik ortamında statünün yeniden görüşülmesini istedi.20 Temmuz 1936 Montrö Boğazlar Sözleşmesi komisyonu kaldırdı, Türkiye’nin savunma yetkisini güçlendirdi ve savaş gemilerinin geçişini koşullara bağladı.",
          "Boğazların savunmasının Türkiye’ye bırakılması her geminin her koşulda yasaklandığı demek değildir. Ticaret gemileriyle savaş gemileri, barışla savaş durumları aynı rejimde değerlendirilmez. Bir sözleşmeyi yalnız “tam egemenlik” etiketiyle öğrenmek ayrıntıyı örter; hangi sınırlamanın kalktığını ve hangi geçiş kurallarının sürdüğünü belirt.",
        ],
      },
      {
        title: "Hatay: aşamalar ve 1938 sınırı",
        paragraphs: [
          "1936’da Fransa-Suriye ilişkilerinin yeniden düzenlenmesi planı Hatay’ın statüsünü gündeme getirdi. Milletler Cemiyeti süreci,1938 Hatay Devleti’nin kurulması ve 1939 Türkiye’ye katılma kararı farklı aşamalardır. Diplomasi ile güvenlik hazırlıkları aynı süreçte rol oynadı; her gelişme tek bir günün kararı değildir.",
          "Atatürk 10 Kasım 1938’de öldü; Hatay’ın Türkiye’ye katılması 1939’da gerçekleşti. “Atatürk döneminde başlayan çözüm çabası” ile “onun yaşadığı sırada tamamlanan sonuç” ayrılmalıdır. Bir kronoloji çizgisinin 1938’de bitmesi daha sonraki sonucu açıklamaya engel değildir;1939 köprü adımı açıkça etiketlenir,1938’e taşınmaz.",
        ],
      },
      {
        title: "1938’de süreklilik ve tarihsel kanıt",
        paragraphs: [
          "Atatürk’ün ölümünden sonra TBMM 11 Kasım 1938’de İsmet İnönü’yü cumhurbaşkanı seçti. Devlet başkanlığı değişimi kurumların devamlılığıyla birlikte incelenir. Atatürk’ün naaşının 1938’de geçici kabre,1953’te Anıtkabir’e nakli aynı tarih değildir. Anma, seçim ve diplomasi olaylarını nesnelerine göre ayır.",
          "Bir belgede görüşme yapıldığı bilgisi anlaşmanın imzalandığını, imza da bütün amaçların gerçekleştiğini tek başına kanıtlamaz. Özellikle “ilk”, “kesin” ve “tamamen” ifadelerinin kapsamını denetle. Sonraki ünitede Türkiye’nin bu kararlarını çevreleyen uluslararası kredi, güvenlik ve rejim değişimlerine geçerek yerel olayla küresel koşulu bağlayacaksın.",
        ],
      },
    ],
    examples: [
      {
        title: "İki Ankara antlaşması",
        prompt:
          "Bir kart Fransa ve 1921, diğeri İngiltere-Irak ve 1926 diyor. Aynı antlaşma mı?",
        strategy: "Şehir adını kapatıp taraf ve konuyu oku.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Fransa 1921 Güney Cephesi ve Suriye sınırı bağlamıdır.",
          },
          {
            label: "2. adım",
            explanation: "1926 İngiltere-Irak Musul ve Türkiye-Irak sınırıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Ad benzerliği ayrı belgelerin tarih ve kapsamını birleştirmez.",
          },
        ],
        answer: "İki ayrı antlaşmadır.",
        check: "Hatay 1939 ayrı sonuçtur.",
        pitfall:
          "Antlaşma adı aynı diye bütün maddelerini aynı bankaya atamak.",
      },
      {
        title: "Montrö’nün ölçüsü",
        prompt:
          "Komisyon kaldırılıyor, Boğazların savunması Türkiye’ye veriliyor, savaş gemilerine geçiş şartı getiriliyor. Bütün ticaret gemileri yasaklandı mı?",
        strategy: "Savunma yetkisi ile gemi türüne göre geçişi ayır.",
        steps: [
          {
            label: "1. adım",
            explanation: "Komisyonun kalkması yönetim yetkisini değiştirir.",
          },
          {
            label: "2. adım",
            explanation:
              "Savunma yetkisi bölgenin askerî güvenliğine ilişkindir.",
          },
          {
            label: "3. adım",
            explanation:
              "Ticaret ve savaş gemileri farklı geçiş hükümlerine tabidir.",
          },
        ],
        answer: "Hayır; verilenler ticaretin tamamen yasaklandığını göstermez.",
        check: "Lozan 1923 ile Montrö 1936 iki ayrı statüdür.",
        pitfall: "Egemenliği her türlü geçişin kapanması sanmak.",
      },
      {
        title: "Üye listesinin kanıtı",
        prompt:
          "Bir belgede Türkiye, İran, Irak ve Afganistan imzacı olarak veriliyor. Balkan Antantı denebilir mi?",
        strategy: "Coğrafi çağrışım yerine açık imza listesini kullan.",
        steps: [
          {
            label: "1. adım",
            explanation: "Dört ülke listesi 1937 Sadabat Paktı’na uyar.",
          },
          {
            label: "2. adım",
            explanation:
              "Balkan Antantı’nda Yunanistan, Romanya, Yugoslavya ve Türkiye vardır.",
          },
          {
            label: "3. adım",
            explanation: "Aynı barış amacı üyeleri aynı yapmaz.",
          },
        ],
        answer: "Hayır; Sadabat Paktı’dır.",
        check: "Suriye’yi yakın olduğu için listeye ekleme.",
        pitfall: "İki bölgesel girişimi tek güvenlik örgütü saymak.",
      },
      {
        title: "Başlangıç ve sonuç yılı",
        prompt:
          "Hatay için 1936 statü tartışması,1938 devlet,1939 Türkiye’ye katılma veriliyor.1938’de tamamlandığı söylenebilir mi?",
        strategy: "Sonucu belirten fiili bul.",
        steps: [
          {
            label: "1. adım",
            explanation: "Statü tartışması süreç başlangıcıdır.",
          },
          {
            label: "2. adım",
            explanation: "1938 devlet kurulması ara aşamadır.",
          },
          {
            label: "3. adım",
            explanation: "Türkiye’ye katılma 1939 sonuç adımıdır.",
          },
        ],
        answer: "Hayır; katılma 1939’dadır.",
        check: "Atatürk’ün 1938 ölüm tarihiyle karıştırma.",
        pitfall: "Süreci başlatan tarih ile sonucun tarihini eşitlemek.",
      },
    ],
    recall: [
      {
        prompt: "Musul’u 1921 Ankara Antlaşması mı çözdü?",
        answer:
          "Hayır; Musul 1926 Ankara Antlaşması ile Türkiye-Irak sınırı bağlamında düzenlendi.",
      },
      {
        prompt: "Montrö’de savunma ve geçiş aynı kavram mı?",
        answer:
          "Hayır. Türkiye’nin savunma yetkisi güçlenirken gemi türü ve koşullara bağlı geçiş kuralları düzenlendi.",
      },
      {
        prompt: "İki çok partili denemenin kapanışı aynı mı?",
        answer:
          "Hayır. Terakkiperver kapatıldı; Serbest Fırka 1930’da kendisini feshetti.",
      },
      {
        prompt: "1938 Hatay Devleti ile 1939 neyi ayırırsın?",
        answer:
          "1938 ayrı devletin kuruluşu,1939 Türkiye’ye katılma sürecinin sonucudur.",
      },
    ],
  },
  {
    id: "kuresel-savaslar-arasinda-turkiye-dunya",
    title: "Küresel savaşlar arasında: barış arayışı, kriz ve rejimler",
    source:
      "OGM 126 Atatürk’ün ölümü sonrası Türkiye’de ve dünyada yaşanan gelişmeler ders notu PDF s.4–11,14–19,22–31,35–38,41–52,56–62 içindeki öğretim sayfaları. Kaynağın dosya adına rağmen bu bölümün gövdesi 1917–1930’lar küresel gelişmeleridir;247 Türkiye odaklı,248 uluslararası sistem odaklıdır. Özgün anlatım ve sorular.",
    minutes: 75,
    objectives: [
      "Barış örgütü ve paktların amacıyla uygulama sınırını karşılaştır.",
      "1929 krizinin kredi, üretim ve talep üzerinden yayılmasını açıkla.",
      "Faşizm, Nazizm ve Rusya’daki dönüşümleri dönem ve kanıtlarıyla ayır.",
      "Uluslararası koşulları Türkiye’nin kararlarıyla ilişkilendirirken tek nedenli açıklamadan kaçın.",
    ],
    sections: [
      {
        title: "1919’dan 1939’a: barış yalnız imza değildir",
        paragraphs: [
          "I. Dünya Savaşı sonrası barış düzeni yeni sınırlar, tazminatlar ve güvenlik sorunları doğurdu. Galiplerin çıkarlarıyla yenilen devletlerin talepleri arasındaki gerilim sürdü. Revizyonist yaklaşım mevcut antlaşma ve sınırları değiştirmeyi; statükocu yaklaşım düzeni korumayı amaçlar. Bu etiketler her ülkede her olayın bütün nedenini açıklayan değişmez kişilikler değildir.",
          "1917 Rusya devrimleri,1920 Milletler Cemiyeti,1925 Locarno,1928 Briand-Kellogg,1929 ekonomik kriz ve 1930’ların yayılmacılığı aynı zaman çizgisindeki farklı olay türleridir. Sonuçtan geriye bakıp savaşı tek bir antlaşmanın kaçınılmaz sonucu sayma; kararlar, kurumların zayıflığı ve ekonomik-siyasal koşullar arasındaki ara mekanizmaları kur.",
        ],
      },
      {
        title: "Milletler Cemiyeti: amaç ve yaptırım açığı",
        paragraphs: [
          "Milletler Cemiyeti 1920’de uluslararası barış ve ortak güvenlik amacıyla faaliyete başladı; merkezi Cenevre’ydi. Wilson’un fikri desteklemesi ile ABD’nin üyeliği aynı şey değildir: ABD örgüte katılmadı. Türkiye 1932’de üye oldu. Cemiyet ile 1945 Birleşmiş Milletler farklı tarih ve kurumsal yapılardır.",
          "Ortak güvenlik, saldırının yalnız hedef devletin sorunu sayılmaması düşüncesidir. Büyük güçlerin çıkar çatışmaları ve etkili ortak uygulama eksikliği örgütün başarısını sınırladı. Bir örgütün kurulması savaşların hemen yok olduğu anlamına gelmez; başarısız bazı örnekler de her diplomatik görüşmenin değersiz olduğunu göstermez. Hedefle ölçülmüş sonuç ayrımını koru.",
        ],
      },
      {
        title: "Locarno ve Briand-Kellogg: belge türünü tanı",
        paragraphs: [
          "1925 Locarno düzenlemeleri Almanya ile komşuları arasındaki güvenlik ve uzlaşma arayışının bir parçasıydı; Almanya 1926’da Milletler Cemiyetine girdi. Batı sınırlarına verilen güvencelerin kapsamını bütün dünya sınırlarının aynı biçimde garanti altına alınması diye genişletme. Konferans, antlaşma ve üyelik üç ayrı işlemdir.",
          "1928 Briand-Kellogg Paktı uyuşmazlık çözümünde savaşın ulusal politika aracı olarak kullanılmasını reddetme taahhüdü getirdi. Taahhüt ile etkili yaptırım farklıdır. Belgenin varlığı 1930’larda saldırıların önlenebildiğini göstermez. Bir soruda savaşın hukuki-siyasal araç olarak reddi geçiyorsa ekonomik kredi programı veya askerî saldırı planı seçenekleri aynı nesne değildir.",
        ],
      },
      {
        title: "1929 bunalımı: görünür tetikleyici ve yapı",
        paragraphs: [
          "1929’da New York Borsasındaki çöküş finansal krizin görünür işaretlerinden biriydi. Krediyle büyüyen alımlar, spekülasyon, banka kırılganlıkları ve üretim-talep dengesizlikleri daha geniş yapının parçalarıydı. Krizi yalnız tek bir günde hisselerin düşmesine indirgemek hem öncesindeki koşulları hem sonraki yayılma mekanizmasını saklar.",
          "Bir banka kayıp yaşayıp kredi vermeyi azaltınca işletmeler yatırım ve üretimi kısabilir; işsizlik artışı tüketimi daha da azaltabilir. Bu, birbirini besleyen bir süreçtir. Modelde neden–mekanizma–sonuç bağlarını açarken her okun neyi anlattığını söyle. İki göstergenin birlikte düşmesi tek başına aralarında tek yönlü ve tek nedenli bağ kurmaya yetmez.",
        ],
      },
      {
        title: "Krizin sınır aşması ve Türkiye",
        paragraphs: [
          "Uluslararası borç, kredi ve ticaret bağlantıları ekonomik bunalımın ülke sınırlarını aşmasına yardım etti. Tarım ürünlerinin fiyatlarının düşmesi ihracatçı ülkelerin gelirini etkiledi; gümrük ve korumacı politikalar ticareti ayrıca daraltabildi. Her ülke aynı gün aynı oranda etkilenmedi; tek bir dünya ortalaması her yerel sonucu vermez.",
          "Türkiye’de dış ticaret ve tarımsal gelir baskıları kalkınma araçları tartışmasını etkiledi.1930’lardaki devlet öncülüğünde sanayileşme bu uluslararası ortamla birlikte incelenebilir. Bununla birlikte devletin rolünün yalnız 1929’da sıfırdan başladığı veya bütün özel girişimin ortadan kalktığı söylenemez.247’deki Türkiye kararlarını buradaki küresel koşullarla bağla, aynı konuyu iki kez sayma.",
        ],
      },
      {
        title: "Faşizm ve Nazizm: benzerliği özdeşlik sanma",
        paragraphs: [
          "İtalya’da Mussolini’nin 1922’de iktidara gelmesi ve Almanya’da Hitler’in 1933’te yönetimi ele geçirmesi farklı tarihsel süreçlerdir. Her iki rejimde tek lider-parti, muhalefetin bastırılması ve yayılmacılık görülür. İktisadi kriz, savaşın mirası ve kurumsal kararlar bu yükselişleri etkiledi; tek bir ekonomik veri bütün siyasi sonuçları zorunlu kılmaz.",
          "Nazizm ırk üstünlüğü iddiası, antisemitizm ve sistematik dışlama ile belirginleşti. Bu iddialar tarihsel olarak incelenen ayrımcı ideolojinin savlarıdır; bilimsel gerçek veya dersin onayladığı değerler değildir. Faşizm ve Nazizmin ortak otoriter özelliklerini görürken ülke, lider, tarih ve özgül politika farklarını koru. Bir hareketin propaganda dili bağımsız kanıt yerine geçmez.",
        ],
      },
      {
        title: "Rusya:1917 devrimlerinden yeni ekonomi politikasına",
        paragraphs: [
          "1917’de Çarlık yönetimi yıkıldı; geçici hükûmetin ardından Bolşevikler iktidarı aldı. Rusya Brest-Litovsk ile savaştan çekildi. Savaş yorgunluğu, toprak ve geçim sorunları toplumsal desteği etkiliyordu. “1917 devrimi” tek bir anda bütün idari ve ekonomik meselelerin çözüldüğü anlamına gelmez; farklı aşamalar ve aktörler vardır.",
          "İç savaş ve ekonomik yıkımın ardından Lenin döneminde NEP, bazı küçük işletme ve piyasa faaliyetlerine sınırlı izin veren bir politika olarak uygulandı. Büyük sanayi, ulaşım ve bankacılıkta devletin rolü sürdü. Bu örnek, sosyalist bir yönetimdeki her dönemin bütün ekonomik araçlarının aynı olmadığını gösterir; siyasi rejim etiketi tek başına her mülkiyet biçimini açıklamaz.",
        ],
      },
      {
        title: "Yayılmacılık ve ortak güvenliğin aşınması",
        paragraphs: [
          "Japonya’nın Mançurya’da, İtalya’nın Habeşistan’da ve Almanya’nın Avrupa’da genişleme girişimleri uluslararası güvenlik düzenini zorladı. Milletler Cemiyetinin saldırıları durduramaması, ittifak ve bölgesel güvenlik arayışlarını güçlendirdi. Türkiye’nin Balkan Antantı ve Sadabat girişimleri bu ortamda anlam kazanır; her pakt aynı üyelerle kurulmadı.",
          "Ulusal güvenliği koruma gerekçesiyle yapılan diplomatik düzenleme ile başka ülkeye saldırı aynı eylem değildir. Bir ülkenin verdiği gerekçeyi doğrudan tarafsız olay tanımı sayma; ne yaptığını, hangi sınıra girdiğini ve hangi belgeyi ihlal ettiğini ayrı incele.1939’a yaklaşırken oluşan krizler, sonraki ünitedeki savaş başlangıcının yakın bağlamıdır.",
        ],
      },
      {
        title: "Kaynak okuma: niyet, veri ve sonuç",
        paragraphs: [
          "Bir antlaşma niyet ve yükümlülük; işsizlik tablosu ölçülen ekonomik durum; propaganda konuşması ise ikna amacı taşıyan söylem hakkında bilgi verir. Hepsini aynı kanıt türü sayarsan örgüt kurulduğu için barışın sağlandığını veya bir lider öyle dediği için hedefin gerçekleştiğini sanabilirsin. Belgenin neyi gösterebildiğini açıkça sınırla.",
          "Karşılaştırmada önce tarih, sonra özne ve nesne seç:1920 Cemiyet,1928 savaşın reddi,1929 kriz,1933 Almanya’da iktidar,1945 Birleşmiş Milletler. Gelecekteki bir kurumu önceki kriz anına taşıma. Etkileşimli kanıt zincirinde her bağlantı verilerle desteklenmeli; bir olası etkiyi kesin ve tek sonuç diye işaretlememelisin.",
        ],
      },
    ],
    examples: [
      {
        title: "Örgüt ve garanti",
        prompt:
          "1920’de barış örgütü kuruluyor;1930’larda saldırıları durduramıyor. Kurulma kararı yanlış mı okunmalı?",
        strategy: "Hedef ile gerçekleşen etkiyi ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Kurulma barış için kurumsal araç oluşturulduğunu gösterir.",
          },
          {
            label: "2. adım",
            explanation:
              "Saldırılar yaptırım ve ortak hareketin yetersiz kalabildiğini gösterir.",
          },
          {
            label: "3. adım",
            explanation: "İkisi çelişmez; hedef başarı garantisi değildir.",
          },
        ],
        answer: "Örgüt barış hedefiyle kurulmuş, etkisi sınırlı kalmıştır.",
        check: "1945 Birleşmiş Milletler bu kurumla aynı değildir.",
        pitfall: "Kuruldu sözcüğünü başarıldı diye okumak.",
      },
      {
        title: "Kredi zinciri",
        prompt:
          "Bankalar kredi musluğunu kısıyor; işletmeler yatırım ve istihdamı azaltıyor. Hangi ara mekanizma kurulabilir?",
        strategy: "Paranın üretime nasıl ulaştığını göster.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Krediye erişim işletmelerin harcama imkanını etkiler.",
          },
          {
            label: "2. adım",
            explanation:
              "Yatırımın ve üretimin daralması istihdamı azaltabilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Gelir kaybı talebi de düşürerek süreci güçlendirebilir.",
          },
        ],
        answer:
          "Kredi daralması→üretim-yatırım kısıntısı→işsizlik ve talep düşüşü.",
        check: "Her işletmenin aynı ölçüde etkilendiği verilmemiştir.",
        pitfall: "Ekonomik olayı yalnız tek bir liderin kararıyla açıklamak.",
      },
      {
        title: "İki rejim",
        prompt:
          "Bir kart Mussolini 1922 İtalya, diğeri Hitler 1933 Almanya diyor. İki olay aynı mı?",
        strategy: "Ülke, tarih ve özgül ideolojiyi karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation: "İtalya 1922 faşist yönetimin yükselişidir.",
          },
          {
            label: "2. adım",
            explanation: "Almanya 1933 Nazi iktidarı bağlamıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Ortak totaliter özellikler aynı ülke ve tarihi göstermez.",
          },
        ],
        answer:
          "Farklı süreçlerdir; karşılaştırılabilir ortak özellikleri vardır.",
        check: "Nazizmin ırkçı savları bilimsel gerçek değildir.",
        pitfall: "Benzer otoriterliği bütün ayrıntılarda özdeşlik saymak.",
      },
      {
        title: "NEP ve etiket",
        prompt:
          "Bir sosyalist yönetim bazı küçük işletmelerde özel faaliyete izin veriyor, büyük sanayi devlette kalıyor. Tam serbest piyasa denebilir mi?",
        strategy: "Sektörlere göre mülkiyet ve denetimi ayır.",
        steps: [
          {
            label: "1. adım",
            explanation: "Küçük özel faaliyete sınırlı izin verilmiştir.",
          },
          {
            label: "2. adım",
            explanation: "Büyük sanayi ve bankacılıkta devlet rolü sürer.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu farklılık bütün ekonominin tek modelde olmadığını gösterir.",
          },
        ],
        answer: "Hayır; NEP bağlamındaki sınırlı piyasa düzenlemesidir.",
        check: "Bir sektör hakkındaki izin bütün sektörlere genişletilmez.",
        pitfall: "Rejim etiketini her işlemin ayrıntılı tarifi sanmak.",
      },
    ],
    recall: [
      {
        prompt: "1920’de kurulan örgüt ve 1945’te kurulan örgüt?",
        answer:
          "Milletler Cemiyeti ve Birleşmiş Milletler; aynı kurum değildir.",
      },
      {
        prompt: "1929 krizinde borsa düşüşü neden tek açıklama değil?",
        answer:
          "Kredi, banka kırılganlığı, üretim-talep ve uluslararası bağlantılar daha geniş mekanizmadır.",
      },
      {
        prompt: "Faşizm ve Nazizmi bir benzerlik bir farkla ayır.",
        answer:
          "Muhalefetin bastırılması ve yayılmacılık ortak; İtalya-Mussolini 1922 ile Almanya-Hitler 1933 farklıdır.",
      },
      {
        prompt: "Pakt imzası savaşı önlediğini kanıtlar mı?",
        answer:
          "Hayır; yükümlülük ve niyet ile etkili uygulama ayrı kanıt ister.",
      },
    ],
  },
  {
    id: "ikinci-dunya-savasi-sonrasi",
    title: "II. Dünya Savaşı: küresel çatışmadan yeni düzene",
    source:
      "OGM 127 Türkiye’de II. Dünya Savaşı sürecinde yaşanan iç ve dış gelişmeler ders notu: savaşın nedenleri/seyrinin ve Birleşmiş Milletler/Türkiye öğretim sayfaları, PDF s.8–45 ve 48–76 içindeki ilgili metinler. İlk savaş sonrası 1945–1946 geçişi kapsanır; sonraki on yılların tamamı işlenmiş değildir. Özgün açıklama ve sorular.",
    minutes: 75,
    objectives: [
      "1939 başlangıcı,1941 genişlemesi ve 1945 bitiş aşamalarını ayır.",
      "Savaş ilanı, diplomatik görüşme ve fiilî muharebe arasındaki farkı açıkla.",
      "Savaş ekonomisinin üretim, paylaşım ve vergi araçlarını sonuçlarıyla karşılaştır.",
      "BM’nin kuruluşunu ve 1945–1946 ilk siyasal geçişini doğru kurum ve tarihlerle ilişkilendir.",
    ],
    sections: [
      {
        title: "Uzun neden ile savaşı başlatan olayı ayır",
        paragraphs: [
          "Versay düzeninin tartışılması, yayılmacı rejimler, ekonomik bunalım ve ortak güvenliğin zayıflığı II. Dünya Savaşı’nın geniş bağlamıdır.1 Eylül 1939’da Almanya’nın Polonya’yı işgali Avrupa’da savaşın başlamasındaki yakın tetikleyicidir.3 Eylül’de İngiltere ve Fransa Almanya’ya savaş ilan etti. Bağlam ile kesin tarihli başlangıç olayı aynı açıklama düzeyinde değildir.",
          "Mihverin başlıca güçleri Almanya, İtalya ve Japonya; Müttefiklerin önemli güçleri İngiltere, Fransa, SSCB ve ABD’ydi. Bu liste her devletin aynı gün savaşa girdiği anlamına gelmez.1939’da başlamış bir savaşa 1941’de yeni bir büyük gücün katılması kronolojik olarak mümkündür; ittifakların zaman içindeki değişimini izle.",
        ],
      },
      {
        title: "Savaşın ilk aşaması: hızlı ilerleme ve direniş",
        paragraphs: [
          "Almanya 1939–1940 döneminde Polonya ve Batı Avrupa’da hızlı askerî başarılar kazandı;1940’ta Fransa yenildi. Hava ve kara unsurlarının hızlı, eşgüdümlü kullanımı yıldırım harbi olarak anılır. Bir stratejinin bazı cephelerde başarılı olması bütün coğrafyalarda aynı sonucu vereceği garantisi değildir.",
          "İngiltere’ye yönelik hava saldırıları ülkeyi savaş dışı bırakamadı. Bütün Avrupa’nın istisnasız işgal edildiği iddiası doğru değildir; tarafsız kalan ülkeler de vardı. Harita üzerinde işgal, müttefiklik ve tarafsızlık ayrı durumlar olarak okunmalı. Aynı renge boyanmış geniş bölgeyi her yerde aynı yönetim biçimi ve aynı tarih diye yorumlama.",
        ],
      },
      {
        title: "1941: savaş alanı ve kaynaklar genişliyor",
        paragraphs: [
          "Almanya Haziran 1941’de SSCB’ye saldırdı. Japonya 7 Aralık 1941’de Pearl Harbor’a saldırdı; ABD savaşa girdi. Bu iki gelişme farklı cephe ve aktörlere aittir fakat savaşın coğrafyasını ve insan-sanayi kaynaklarının ölçeğini büyüttü. Pearl Harbor Avrupa’daki 1939 başlangıcının diğer adı değildir.",
          "Kaynak ve üretim kapasitesi savaşın gidişini etkiler; tek başına sonucun o gün kesinleştiği anlamına gelmez. İkmal mesafeleri, coğrafya, insan kaybı, cephe kararları ve ittifaklar birlikte rol oynadı. Kronoloji modelinde 1941 işaretine geldiğinde daha önceki 1939 olayını silmek yerine iki aşamayı birbirine bağla.",
        ],
      },
      {
        title: "Dönüm noktaları ve 1945’in iki bitişi",
        paragraphs: [
          "1942–1943 Stalingrad süreci, Kuzey Afrika’daki Müttefik başarıları ve 1943 İtalya çıkarmaları Mihver aleyhine dönüm noktalarıydı.6 Haziran 1944 Normandiya Çıkarması Batı Avrupa’da yeni bir cephe açtı. Bir muharebenin sonucunu bütün savaşın aynı gün bitişiyle eşitlememelisin.",
          "Almanya Mayıs 1945’te teslim oldu; Avrupa’daki savaş sona ererken Asya-Pasifik’te çatışma sürdü. Hiroşima ve Nagasaki’ye atılan atom bombaları ile Sovyetlerin Japonya’ya karşı savaşa girmesi Ağustos 1945 son aşamasının parçalarıdır. Japonya’nın teslimiyle savaşın küresel bitişi Eylül 1945’te gerçekleşti. Sivil kayıplar ve yıkım bu kronolojinin insani boyutudur.",
        ],
      },
      {
        title: "İnsan kaybı, ırkçı politika ve savaş sonrası sorumluluk",
        paragraphs: [
          "Savaş yalnız cephe hareketlerinden ibaret değildi: sivillerin kitlesel ölümü, zorunlu göçler, şehirlerin yıkımı ve Nazi yönetiminin Yahudilere ve başka gruplara yönelik sistematik zulmü yaşandı. İdeolojinin kendisini haklı gösteren propagandası ile tarihsel olgular aynı kanıt türü değildir. Irk üstünlüğü iddiaları ayrımcı politikaların gerekçesi olarak incelenir, onaylanmaz.",
          "Yeni düzen arayışı güvenliğin yanında insan hakları ve uluslararası sorumluluk tartışmalarını da güçlendirdi. Bir antlaşmanın kurulması mağduriyetlerin tamamen giderildiğini göstermez. Sınavda insani sonuç, askerî sonuç ve kurumsal sonuç ifadelerini ayır; tek bir başlık diğerlerini görünmez kılmamalıdır.",
        ],
      },
      {
        title: "Birleşmiş Milletler:1941’den 1945’e",
        paragraphs: [
          "1941 Atlantik Bildirisi ve 1942 Birleşmiş Milletler Bildirisi savaş sonrasına ilişkin ilke ve iş birliği adımlarıydı.1945 San Francisco Konferansı’nda Birleşmiş Milletler Şartı hazırlandı; örgüt 24 Ekim 1945’te yürürlüğe giren Şart’la resmen kuruldu. Bildiri, konferans, imza ve yürürlük aynı işlem değildir.",
          "Genel Kurulda üyelerin temsili ile Güvenlik Konseyindeki beş daimi üyenin özel konumu farklıdır. ABD, SSCB, İngiltere, Fransa ve Çin daimi üyelerdi; veto bu konseyin karar usulüyle ilgilidir. Bütün üyelere her organda aynı veto yetkisi verildiği söylenemez. Milletler Cemiyetinin başarısızlıkları yeni kurum arayışının bağlamını oluşturdu.",
        ],
      },
      {
        title: "Türkiye: fiilî çatışmadan uzak kalma",
        paragraphs: [
          "Türkiye savaş boyunca farklı tarafların baskı ve taleplerini dengelemeye, askerî hazırlıklarını korumaya ve fiilî çatışmaya girmemeye çalıştı.1943 Adana ve Kahire görüşmeleri Türkiye’nin savaşa katılması talepleriyle ilişkilidir. Görüşmeye katılmak, o gün savaşa asker gönderildiği kanıtı değildir.",
          "23 Şubat 1945’te Türkiye Almanya ve Japonya’ya savaş ilan etti; bu hukuki-siyasal adım, cephelerde fiilen savaşılmasıyla karıştırılmamalıdır. Birleşmiş Milletlerin kurucu üyeleri arasında yer alma süreciyle bağlantılıdır. “Türkiye hiçbir biçimde savaş ilan etmedi” ile “Türkiye fiilî muharebelere katılmadı” farklı iddialardır; yalnız ikincisi bu ayrımı korur.",
        ],
      },
      {
        title: "Savaşın ekonomi üzerindeki yükü",
        paragraphs: [
          "Fiilî çatışmaya katılmamak savaş ekonomisinden etkilenmemek demek değildir. Seferberlik üretken nüfusu ve bütçeyi etkiledi; ithalat güçlükleri, mal darlığı ve fiyat baskısı yaşandı.1940 Millî Korunma Kanunu devletin üretim, tüketim ve fiyat alanındaki müdahale imkânlarını genişletti. Kanun çıkarmak hedeflenen üretim artışının kesin gerçekleştiği anlamına gelmez.",
          "1942 ekmek karnesi temel ihtiyaçların paylaştırılmasıyla ilgilidir. Karne, vergi ve fabrika yatırımı aynı araç değildir. Arz yetersizliği ve karaborsa sorunlarının her yerde aynı ölçüde yaşandığını varsayma. Bir gelir tablosunda nominal ücret sabitken fiyatlar yükseliyorsa gerçek alım gücünün düştüğünü ayrıca açıklayabilmelisin.",
        ],
      },
      {
        title: "Vergiler: amaç ile uygulamanın etkisi",
        paragraphs: [
          "1942 Varlık Vergisi savaş ortamında servet üzerinden bir defalık gelir sağlamayı amaçladı. Uygulamadaki eşitsizlikler, özellikle gayrimüslim yurttaşlar üzerindeki ağır yük, kısa ödeme süreleri ve çalışma yükümlülüğü ciddi haksızlıklara yol açtı. Politikanın gerekçesini anlatmak uygulamadaki ayrımcılığı ve sonuçlarını yok saymayı gerektirmez.",
          "Toprak Mahsulleri Vergisi tarımsal üretimden alınan savaş dönemi yükümlülüğüdür;1925’te kaldırılan aşarla veya 1950’lerin tarım politikasıyla aynı düzenleme değildir. Kaynaklarda ilk düzenleme ve sonraki değişiklik tarihleri farklı verilebilir; verginin temel nesnesini ve savaş dönemi bağlamını kavra. Verginin konulması toplumun bütün kesimlerinin refahının arttığı kanıtı değildir.",
        ],
      },
      {
        title: "Savaş sonrası ilk geçiş: güvenlik ve çoğulculuk",
        paragraphs: [
          "1945 sonrasında ABD ve SSCB başlıca güçler olarak öne çıktı; eski savaş ittifakının bütün çıkarları aynı kalmadı. Türkiye’nin Boğazlar ve sınırlar üzerindeki Sovyet taleplerinden duyduğu kaygı dış güvenlik tercihlerinde etkiliydi. İttifakların savaş bittikten sonra değişebileceğini görmek, geçmiş dostluğu bütün zamanlar için değişmez sanmayı önler.",
          "İçeride savaş ekonomisine tepkiler ve siyasal temsil talepleri çoğulculuk arayışına katıldı.1945 Millî Kalkınma Partisi ve 1946 Demokrat Parti farklı kuruluşlardır; Demokrat Parti ilk kurulan muhalefet partisi diye koşulsuz tanıtılamaz. Bu ünite ilk savaş sonrası 1945–1946 geçişini öğretir; sonraki bütün Soğuk Savaş ve yakın dönem tarihi tamamlandı anlamına gelmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Başlangıç mı genişleme mi?",
        prompt:
          "Polonya 1939, SSCB’ye saldırı 1941 ve Pearl Harbor 1941 kartları var. Hangisi Avrupa savaşının başlangıç olayıdır?",
        strategy: "Coğrafya ve zamanı açık tut.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Polonya’nın işgali 1 Eylül 1939 başlangıç tetikleyicisidir.",
          },
          {
            label: "2. adım",
            explanation: "1941 SSCB saldırısı doğudaki cepheyi genişletir.",
          },
          {
            label: "3. adım",
            explanation:
              "Pearl Harbor ABD’nin savaşa girişini tetikler;1939’u yeniden tarihlemez.",
          },
        ],
        answer: "Polonya’nın işgali.",
        check: "ABD’nin girdiği yıl bütün savaşın başlangıç yılı değildir.",
        pitfall: "En çok bilinen saldırıyı her cephe için başlangıç saymak.",
      },
      {
        title: "İlan ve fiilî katılım",
        prompt:
          "Türkiye 1945’te savaş ilan ediyor fakat cephelerde fiilî muharebeye katılmıyor. Çelişki var mı?",
        strategy: "Hukuki statü ile askerî eylemi ayır.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlan devletler arası hukuki-siyasi karardır.",
          },
          {
            label: "2. adım",
            explanation: "Fiilî katılım askerî muharebe eylemidir.",
          },
          {
            label: "3. adım",
            explanation:
              "İki veri ayrı düzeylerde olduğu için birlikte doğru olabilir.",
          },
        ],
        answer: "Hayır; ilan vardır, fiilî muharebe yoktur.",
        check: "23 Şubat 1945 ve BM kurucu üyelik bağlamını koru.",
        pitfall:
          "Savaş ilanı yokmuş gibi yazmak veya otomatik cephe savaşı çıkarmak.",
      },
      {
        title: "Karne neyi gösterir?",
        prompt:
          "1942’de ekmek karnesi uygulanıyor; ithalat ve üretim sorunları anlatılıyor. Türkiye’nin etkilenmediği çıkar mı?",
        strategy: "Aracın hedeflediği kıtlık sorununu ara.",
        steps: [
          {
            label: "1. adım",
            explanation: "Karne temel gıdanın paylaştırılması aracıdır.",
          },
          {
            label: "2. adım",
            explanation: "Üretim ve ithalat güçlüğü arz baskısını gösterir.",
          },
          {
            label: "3. adım",
            explanation:
              "Fiilî çatışma olmaması ekonomik etkilerin yokluğunu göstermez.",
          },
        ],
        answer: "Savaş Türkiye’de de ekonomik ve gündelik yaşamı etkilemiştir.",
        check: "Vergiyle karne aynı işlem değildir.",
        pitfall: "Cepheye asker gitmedi diye kaynak sorunu da yok saymak.",
      },
      {
        title: "Her üyede veto mu?",
        prompt:
          "BM’de Genel Kurul temsilinden ve beş daimi üyenin Güvenlik Konseyindeki vetosundan söz ediliyor. Her devlet veto eder mi?",
        strategy: "Örgüt ile organın karar usulünü ayır.",
        steps: [
          {
            label: "1. adım",
            explanation: "Genel Kurul üyelik-temsil organıdır.",
          },
          {
            label: "2. adım",
            explanation: "Beş daimi üye Güvenlik Konseyinde özel konumdadır.",
          },
          {
            label: "3. adım",
            explanation:
              "Konseye özgü vetoyu bütün üyelere yaymak kapsam hatasıdır.",
          },
        ],
        answer: "Hayır; bütün BM üyelerinin aynı veto yetkisi yoktur.",
        check: "Milletler Cemiyeti 1920, BM 1945 farklıdır.",
        pitfall:
          "Eşit temsil ile her organda eşit özel yetkiyi aynı şey saymak.",
      },
    ],
    recall: [
      {
        prompt: "1939 başlangıcı ile 1941 Pearl Harbor farkı?",
        answer:
          "Polonya işgali Avrupa savaşını başlattı; Pearl Harbor ABD’nin girişini tetikledi.",
      },
      {
        prompt: "Türkiye 1945’te ne yaptı, ne yapmadı?",
        answer:
          "Almanya ve Japonya’ya savaş ilan etti; cephelerde fiilî muharebeye katılmadı.",
      },
      {
        prompt: "Karne, vergi, Millî Korunma üç aynı araç mı?",
        answer:
          "Hayır. Paylaştırma, gelir/yükümlülük ve ekonomik müdahale yetkileri farklıdır.",
      },
      {
        prompt: "1946 Demokrat Parti için ilk muhalefet partisi denir mi?",
        answer:
          "Hayır;1920’lerdeki denemeler ve 1945 Millî Kalkınma Partisi gibi önceki kuruluşlar vardır.",
      },
    ],
  },
];

const banks: Record<string, Question[]> = {
  "milli-mucadele": [
    {
      id: "f12h-milli-mucadele-01",
      passage: {
        tr: "Bir belge milletin bağımsızlığını yine milletin azim ve kararının kurtaracağını bildiriyor ve Sivas’ta kongre toplanmasını istiyor.",
      },
      prompt: {
        tr: "Belge ve işlevi hangi seçenekte birlikte doğrudur?",
      },
      options: [
        {
          tr: "Amasya Genelgesi: millî iradeye dayalı örgütlenme çağrısı",
        },
        {
          tr: "Lozan: kesin barışın imzalanması",
        },
        {
          tr: "Mudanya: ateşkes hükümlerinin uygulanması",
        },
        {
          tr: "Montrö: Boğazlar Komisyonunun kaldırılması",
        },
        {
          tr: "Medeni Kanun: miras düzenlemesi",
        },
      ],
      answer: 0,
      hint: {
        tr: "Kongre çağrısı ile egemenlik kaynağını birlikte kullan.",
      },
      explanation: {
        tr: "Amasya Genelgesi tehlike, millet iradesi ve örgütlenme yöntemini birleştirir. Lozan, Mudanya ve Montrö farklı tarihlerde devletler arası belgelerdir; miras düzenlemesi ise bu çağrının konusu değildir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-milli-mucadele-02",
      passage: {
        tr: "Doğu illerinden gelen temsilciler bir kongrede bütün vatanın bölünmezliğini ve mandanın reddini kararlaştırıyor.",
      },
      prompt: {
        tr: "Toplanış ve karar kapsamı nasıl değerlendirilmeli?",
      },
      options: [
        {
          tr: "Toplanış ve kararlar yalnız bir şehrin belediye işidir.",
        },
        {
          tr: "Toplanış bölgesel, kararlar millîdir.",
        },
        {
          tr: "Millî karar alınması katılımcıların her ülkeden geldiğini gösterir.",
        },
        {
          tr: "Bölgesel toplanan hiçbir kurul genel karar alamaz.",
        },
        {
          tr: "Mandanın reddi ekonomik bağımsızlığın bütünüyle kaldırılmasıdır.",
        },
      ],
      answer: 1,
      hint: {
        tr: "Katılımcı alanıyla kararın nesnesi farklıdır.",
      },
      explanation: {
        tr: "Erzurum örneğinde temsil tabanı bölgesel olduğu hâlde vatanın bütünlüğüne ilişkin kararlar millîdir. Millî kapsam uluslararası katılım demek değildir; toplantının niteliği kararın bütün coğrafyasını zorunlu olarak sınırlamaz.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-milli-mucadele-03",
      passage: {
        tr: "4–11 Eylül 1919 toplantısında çeşitli Müdafaa-i Hukuk cemiyetleri tek çatı altında birleşiyor ve temsil kurulunun yetki alanı genişliyor.",
      },
      prompt: {
        tr: "En doğrudan hangi sonuç desteklenir?",
      },
      options: [
        {
          tr: "Bütün ülkelerin tek devlet olması sağlanmıştır.",
        },
        {
          tr: "Boğazların 1936 geçiş rejimi kurulmuştur.",
        },
        {
          tr: "Millî hareketin örgütsel birliği güçlenmiştir.",
        },
        {
          tr: "Cumhurbaşkanı doğrudan halkça seçilmiştir.",
        },
        {
          tr: "Osmanlı borçları tamamen o gün ödenmiştir.",
        },
      ],
      answer: 2,
      hint: {
        tr: "Cemiyetlerin birleşmesi hangi düzeyde bir değişimdir?",
      },
      explanation: {
        tr: "Sivas Kongresi’ndeki birleşme millî direnişin örgütsel koordinasyonunu güçlendirir. Bu karar uluslararası bütünleşme, cumhurbaşkanı seçimi veya borçların tamamının ödenmesi değildir; verilen verinin alanı örgütlenmedir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-milli-mucadele-04",
      passage: {
        tr: "Bir tarihçi 28 Ocak 1920’de kabul edilen Misak-ı Millî’yi,23 Nisan 1920’de açılan Ankara meclisinden önceye yerleştiriyor.",
      },
      prompt: {
        tr: "Belgeyi ilk kabul eden kurum hangisidir?",
      },
      options: [
        {
          tr: "1923’te açılan II. TBMM",
        },
        {
          tr: "1932 Milletler Cemiyeti",
        },
        {
          tr: "1920’den önceki Ankara Belediye Meclisi",
        },
        {
          tr: "Son Osmanlı Mebusan Meclisi",
        },
        {
          tr: "1938 Hatay Meclisi",
        },
      ],
      answer: 3,
      hint: {
        tr: "Verilen tarihte hangi meclisin çalıştığını düşün.",
      },
      explanation: {
        tr: "Misak-ı Millî Son Osmanlı Mebusan Meclisinde kabul edildi. TBMM daha sonra bu bağımsızlık hedeflerini benimsedi; belgenin benimsenmesi ilk kabulün hangi kurumda yapıldığını değiştirmez.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-milli-mucadele-05",
      passage: {
        tr: "23 Nisan 1920’de açılan meclis hem yasama hem yürütme yetkisini kullanıyor; bakanları kendi içinden ayrı ayrı seçiyor.",
      },
      prompt: {
        tr: "Anlatılan yönetim özelliği nedir?",
      },
      options: [
        {
          tr: "Yasama yetkisinin yabancı komisyonda toplanması",
        },
        {
          tr: "Mutlak saltanata koşulsuz dönüş",
        },
        {
          tr: "Bütün yürütmenin bağımsız özel şirketlere bırakılması",
        },
        {
          tr: "1936 Boğazlar geçiş tarifesi",
        },
        {
          tr: "Güçler birliği ve meclis hükûmeti sistemi",
        },
      ],
      answer: 4,
      hint: {
        tr: "Yetkilerin hangi kurumda toplandığını ve bakan seçimini izle.",
      },
      explanation: {
        tr: "Yasama-yürütme mecliste toplandığı için güçler birliği, bakanların ayrı ayrı seçilmesi nedeniyle meclis hükûmeti sistemi söz konusudur. Yabancı komisyon veya özel şirket verilen yönetim düzeninin aktörü değildir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-milli-mucadele-06",
      passage: {
        tr: "Bir metinde Kâzım Karabekir, Doğu Cephesi ve Aralık 1920’de Ermenistan’la imzalanan ilk TBMM antlaşması birlikte anılıyor.",
      },
      prompt: {
        tr: "Hangi antlaşma anlatılmaktadır?",
      },
      options: [
        {
          tr: "Gümrü",
        },
        {
          tr: "1922 Mudanya",
        },
        {
          tr: "1936 Montrö",
        },
        {
          tr: "1923 Lozan",
        },
        {
          tr: "1934 Balkan Antantı",
        },
      ],
      answer: 0,
      hint: {
        tr: "Karşı taraf ve tarih iki ayrı ayırt edici kanıttır.",
      },
      explanation: {
        tr: "Gümrü TBMM hükûmetinin Ermenistan’la yaptığı ilk antlaşmadır. Mudanya ateşkes, Lozan genel barış, Montrö Boğazlar ve Balkan Antantı 1934 bölgesel güvenlik bağlamındadır; verilen doğu cephesi koşulunu karşılamazlar.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-milli-mucadele-07",
      passage: {
        tr: "Fransız kuvvetlerine karşı yerel şehir direnişleri yaşanıyor;20 Ekim 1921 Ankara Antlaşması’yla bu cephede çatışma sona eriyor.",
      },
      prompt: {
        tr: "Hangi cephe söz konusudur?",
      },
      options: [
        {
          tr: "Kafkasya’da 1877 cephesi",
        },
        {
          tr: "Güney Cephesi",
        },
        {
          tr: "Batı Cephesi’nin 1922 kesin taarruzu",
        },
        {
          tr: "1941 Pasifik Cephesi",
        },
        {
          tr: "I. Dünya Savaşı Çanakkale Cephesi",
        },
      ],
      answer: 1,
      hint: {
        tr: "Fransa ve şehir direnişini birlikte oku.",
      },
      explanation: {
        tr: "Güney Cephesi’nde yerel direniş ve Fransa’yla 1921 Ankara Antlaşması ayırt edicidir. Batı’da Yunan kuvvetleriyle mücadele, Doğu’da Ermenistan ve Gümrü söz konusudur; başka savaşların cepheleri buraya taşınamaz.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-milli-mucadele-08",
      passage: {
        tr: "Bir kaynak Sakarya’yı 23 Ağustos–13 Eylül 1921, Büyük Taarruz’u 26 Ağustos 1922, Mudanya’yı 11 Ekim 1922 olarak tarihlendiriyor.",
      },
      prompt: {
        tr: "Bu verilerden hangisi çıkarılabilir?",
      },
      options: [
        {
          tr: "Mudanya Sakarya’dan önce imzalanmıştır.",
        },
        {
          tr: "Üç olay aynı gün gerçekleşmiştir.",
        },
        {
          tr: "Sakarya’nın ardından kesin taarruz ve ateşkes aşamaları gelmiştir.",
        },
        {
          tr: "Büyük Taarruz 1921’in başında bitmiştir.",
        },
        {
          tr: "Ateşkes varken 1921’de hiç savaş yapılmamıştır.",
        },
      ],
      answer: 2,
      hint: {
        tr: "Yılı, ardından ay ve günü karşılaştır.",
      },
      explanation: {
        tr: "Sakarya 1921’dedir; Büyük Taarruz ve Mudanya 1922’de sırayla gelir. Ateşkesin daha sonraki varlığı önceki savaşları yok saydırmaz. Üç olayın aynı savaşla ilgili olması aynı gün oldukları anlamına gelmez.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-milli-mucadele-09",
      passage: {
        tr: "1921’de Tekâlif-i Millîye emirleriyle giyecek, silah, taşıma ve üretim kaynaklarının ordunun ihtiyacı için seferber edilmesi isteniyor.",
      },
      prompt: {
        tr: "Bu düzenlemenin temel amacı nedir?",
      },
      options: [
        {
          tr: "Boğazlar Komisyonuna üye seçmek",
        },
        {
          tr: "Kadınların milletvekili seçilme yaşını düzenlemek",
        },
        {
          tr: "Yeni Türk alfabesini kabul etmek",
        },
        {
          tr: "Ordunun ikmal ve kaynak ihtiyacını karşılamak",
        },
        {
          tr: "1945 Birleşmiş Milletleri kurmak",
        },
      ],
      answer: 3,
      hint: {
        tr: "Listelenen malların hangi kuruma gittiğini sor.",
      },
      explanation: {
        tr: "Emirlerdeki giyecek, silah, taşıma ve üretim ortak askerî ihtiyaçlara yöneliktir. Kaynak seferberliği bir alfabe, siyasal hak veya uluslararası örgüt kararı değildir; kararın nesnesi ve dönemi birlikte korunmalıdır.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-milli-mucadele-10",
      passage: {
        tr: "Bir kart 11 Ekim 1922’de çatışmanın durdurulmasını, başka kart 24 Temmuz 1923’te sınır ve egemenlik konularındaki kalıcı barışı anlatıyor.",
      },
      prompt: {
        tr: "İki belge nasıl sıralanır?",
      },
      options: [
        {
          tr: "Lozan ateşkesi → Mudanya anayasası",
        },
        {
          tr: "Montrö kongresi → Erzurum barışı",
        },
        {
          tr: "Sevr belediye kanunu → Misak-ı Millî vergi tarifesi",
        },
        {
          tr: "Balkan Antantı → Amasya Görüşmeleri",
        },
        {
          tr: "Mudanya ateşkesi → Lozan barışı",
        },
      ],
      answer: 4,
      hint: {
        tr: "Belge türü ile tarihi aynı anda eşleştir.",
      },
      explanation: {
        tr: "Mudanya 1922 bir ateşkes, Lozan 1923 barış antlaşmasıdır. Çatışmanın durması kalıcı barış düzeninin bütün maddelerinin o gün belirlendiği anlamına gelmez; diğer seçenekler hem türü hem kronolojiyi karıştırır.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
  ],
  "ataturkculuk-inkilap": [
    {
      id: "f12h-ataturkculuk-inkilap-01",
      passage: {
        tr: "Bir düzenleme karar yetkisinin hanedandan değil milletten gelmesini ve yönetimin temsil esasına dayanmasını vurguluyor.",
      },
      prompt: {
        tr: "En doğrudan ilgili ilke hangisidir?",
      },
      options: [
        {
          tr: "Cumhuriyetçilik",
        },
        {
          tr: "Yalnız dış ticaret korumacılığı",
        },
        {
          tr: "Hanedan üstünlüğü",
        },
        {
          tr: "Merkantilizm",
        },
        {
          tr: "Sömürgecilik",
        },
      ],
      answer: 0,
      hint: {
        tr: "Yetkinin kime ait olduğunu belirle.",
      },
      explanation: {
        tr: "Millî egemenlik ve temsil cumhuriyetçiliğin ayırt edici yönüdür. Verilen kanıt ekonomik korumacılık veya hanedan üstünlüğünü desteklemez. İlke seçimi yalnız bir tarih etiketine değil düzenlemenin açık amacına dayanır.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ataturkculuk-inkilap-02",
      passage: {
        tr: "Bir kanun 17 Şubat 1926’da kabul edilip 4 Ekim’de yürürlüğe giriyor ve evlenme, boşanma, miras ilişkilerini düzenliyor.",
      },
      prompt: {
        tr: "Hangi alan ve düzenleme söz konusudur?",
      },
      options: [
        {
          tr: "Boğazlar geçişi: Montrö",
        },
        {
          tr: "Medeni hukuk: Türk Medeni Kanunu",
        },
        {
          tr: "Ordu ikmali: Tekâlif-i Millîye",
        },
        {
          tr: "1920 meclis açılışı: Misak-ı Millî",
        },
        {
          tr: "1934 milletvekili seçimi: kabotaj",
        },
      ],
      answer: 1,
      hint: {
        tr: "Miras ve evlenme hangi hukuk alanındadır?",
      },
      explanation: {
        tr: "Bu bilgiler Medeni Kanun ve medeni hukuk alanını gösterir. Kadınların milletvekili hakkı ayrı bir 1934 siyasal düzenlemedir. Kabul ve yürürlük tarihlerinin farklı olması iki farklı kanun bulunduğu anlamına gelmez.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ataturkculuk-inkilap-03",
      passage: {
        tr: "Kadınlara belediye seçimlerinde 1930, köy yönetiminde 1933 ve milletvekili seçimlerinde 1934’te haklar verildiği belirtiliyor.",
      },
      prompt: {
        tr: "Bu sıralamayı nasıl yorumlamak gerekir?",
      },
      options: [
        {
          tr: "Bütün haklar tek günde verilmiştir.",
        },
        {
          tr: "1934’ten önce hiçbir medeni hak yoktur.",
        },
        {
          tr: "Siyasal haklar farklı yönetim düzeylerinde aşamalarla genişlemiştir.",
        },
        {
          tr: "Belediye seçimi ile miras hakkı aynı işlemdir.",
        },
        {
          tr: "Milletvekili hakkı 1920’den önce tamamlanmıştır.",
        },
      ],
      answer: 2,
      hint: {
        tr: "Yönetim düzeyleri ve tarihler birbirinden farklıdır.",
      },
      explanation: {
        tr: "Verilen sıra yerel ve ulusal temsil haklarının aşamalı gelişimini gösterir. Bundan kadınların daha önce hiçbir medeni hakkı bulunmadığı çıkarılamaz. Belediye, köy ve milletvekili seçimi farklı temsil alanlarıdır.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ataturkculuk-inkilap-04",
      passage: {
        tr: "3 Mart 1924 tarihli bir kanun eğitim kurumlarının yönetim ve denetimini Millî Eğitim Bakanlığında birleştirmeyi amaçlıyor.",
      },
      prompt: {
        tr: "Hangi düzenleme anlatılmaktadır?",
      },
      options: [
        {
          tr: "Soyadı Kanunu",
        },
        {
          tr: "Kabotaj Kanunu",
        },
        {
          tr: "1926 Ankara Antlaşması",
        },
        {
          tr: "Tevhid-i Tedrisat",
        },
        {
          tr: "1934 Balkan Antantı",
        },
      ],
      answer: 3,
      hint: {
        tr: "Eğitimde birlik kararını ara.",
      },
      explanation: {
        tr: "Tevhid-i Tedrisat eğitimde yönetim birliğiyle ilgilidir. Soyadı resmî kimlik, kabotaj kıyı taşımacılığı, Ankara 1926 sınır ve Balkan Antantı bölgesel güvenlik konusudur. Aynı dönemin bütün düzenlemeleri aynı amacı taşımaz.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ataturkculuk-inkilap-05",
      passage: {
        tr: "1928’de yeni harfler kabul ediliyor;1929’da okul çağını geçmiş yetişkinlerin bu yazı sistemini öğrenmesi için kurumlar açılıyor.",
      },
      prompt: {
        tr: "Bu kurumlar hangisidir?",
      },
      options: [
        {
          tr: "İstiklal Mahkemeleri",
        },
        {
          tr: "Boğazlar Komisyonu",
        },
        {
          tr: "Son Osmanlı Mebusan Meclisi",
        },
        {
          tr: "1938 Hatay Meclisi",
        },
        {
          tr: "Millet Mektepleri",
        },
      ],
      answer: 4,
      hint: {
        tr: "Yetişkin okuryazarlığı amacı belirleyicidir.",
      },
      explanation: {
        tr: "Millet Mektepleri yeni harflerle yetişkin okuryazarlığına yönelik uygulama aracıdır. Hukuki alfabe değişikliğiyle onu öğretme faaliyeti ayrılır. Mahkeme, komisyon ve meclis seçenekleri verilen öğretim amacını karşılamaz.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ataturkculuk-inkilap-06",
      passage: {
        tr: "1934’te kamu eliyle sanayi yatırımları planlanıyor; metin aynı dönemde özel işletmelerin de bulunduğunu açıkça belirtiyor.",
      },
      prompt: {
        tr: "Hangi yorum verilenle uyumludur?",
      },
      options: [
        {
          tr: "Devletçilik kamu yatırımını özel girişimle birlikte içerebilir.",
        },
        {
          tr: "Özel girişimin varlığı devlet yatırımı yapılmadığını kanıtlar.",
        },
        {
          tr: "Devletçilik her özel mülkiyetin kaldırılması demektir.",
        },
        {
          tr: "Planlama yalnız hanedana oy verilmesidir.",
        },
        {
          tr: "Fabrika planı alfabenin değiştiğini gösterir.",
        },
      ],
      answer: 0,
      hint: {
        tr: "Ekonomideki iki aktörü birbirini yok saymadan değerlendir.",
      },
      explanation: {
        tr: "Veri hem kamu yatırımını hem özel işletmeleri içerir; devletçilik bu birlikte varlıkla çelişmez. Bütün özel mülkiyetin kaldırıldığı sonucu metni aşar. Bir sanayi planını siyasal seçim veya alfabe düzenlemesine çevirmek konu alanını değiştirir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ataturkculuk-inkilap-07",
      passage: {
        tr: "Bir metin Türk Tarih Kurumunun 1931 ve Türk Dil Kurumunun 1932’de millî kültür araştırmaları için kurulduğunu bildiriyor.",
      },
      prompt: {
        tr: "En doğrudan hangi amaç desteklenir?",
      },
      options: [
        {
          tr: "Bütün özel fabrikaları kapatmak",
        },
        {
          tr: "Ortak tarih ve dil bilincini bilimsel çalışmalarla geliştirmek",
        },
        {
          tr: "Orduyu yabancı komisyona bağlamak",
        },
        {
          tr: "Yalnız kıyı gemilerinin tarifesini belirlemek",
        },
        {
          tr: "Halkın okumasını yasaklamak",
        },
      ],
      answer: 1,
      hint: {
        tr: "Kurumların araştırdığı nesne tarih ve dildir.",
      },
      explanation: {
        tr: "Kurum adları ve araştırma amacı millî kültürün geliştirilmesini destekler. Bundan ırk üstünlüğü veya bütün ekonomik araçların değiştirilmesi çıkmaz. Eğitim-kültür verisi, ilgisiz askerî ve ticari iddialara kanıt yapılamaz.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ataturkculuk-inkilap-08",
      passage: {
        tr: "Bir kanun ailelerin resmî kayıtlarda ayırt edilmesini kolaylaştırmak için 1934’te soyadı kullanılmasını düzenliyor.",
      },
      prompt: {
        tr: "Düzenlemenin temel nesnesi hangisidir?",
      },
      options: [
        {
          tr: "Doğrudan yeni alfabe tasarımı",
        },
        {
          tr: "Uluslararası deniz savaş gemisi sayısı",
        },
        {
          tr: "Resmî kimlik ve toplumsal kayıt düzeni",
        },
        {
          tr: "1921 ordu ikmali",
        },
        {
          tr: "1939 Polonya sınırının işgali",
        },
      ],
      answer: 2,
      hint: {
        tr: "Soruda hangi gündelik işlem kolaylaşıyor?",
      },
      explanation: {
        tr: "Soyadı Kanunu resmî kimlik ve kayıtlarla ilgilidir. Harf inkılabı yazı sistemidir ve 1928 bağlamındadır; iki farklı düzenlemeyi tekleştirmek hem amaç hem tarih hatasıdır. Diğer alanlar bu kanunun nesnesi değildir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ataturkculuk-inkilap-09",
      passage: {
        tr: "Bir kaynak 1928 Hıfzıssıhha Müessesesinin halk sağlığı laboratuvar hizmetlerini,1930 kanununun salgın bildirimini düzenlediğini belirtiyor.",
      },
      prompt: {
        tr: "Hangi çıkarım desteklenir?",
      },
      options: [
        {
          tr: "Bütün hastalıklar aynı gün yok olmuştur.",
        },
        {
          tr: "Kanun yalnız demiryolu satın alınması içindir.",
        },
        {
          tr: "Devlet sağlık alanından tamamen çekilmiştir.",
        },
        {
          tr: "Koruyucu sağlık hizmetlerinin kurumsallaştırılmasına çalışılmıştır.",
        },
        {
          tr: "Yeni bir askerî ateşkes imzalanmıştır.",
        },
      ],
      answer: 3,
      hint: {
        tr: "Kurumun hedefini sonuç garantisiyle karıştırma.",
      },
      explanation: {
        tr: "Laboratuvar ve salgın bildirimi koruyucu sağlık altyapısının kurulmasına yöneliktir. Bundan bütün hastalıkların anında ortadan kalktığı çıkarılamaz. Kurum oluşturma hedef ve araç kanıtıdır; başarı düzeyi ayrıca verilerle ölçülmelidir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ataturkculuk-inkilap-10",
      passage: {
        tr: "Bir konuşma 1933’te yapılmıştır. Seçeneklerde 1928 harf değişimi,1931 tarih kurumu,1932 dil kurumu ve 1934 kadınların milletvekili hakkı sayılıyor.",
      },
      prompt: {
        tr: "Hangisi konuşma tarihinden sonradır?",
      },
      options: [
        {
          tr: "1928 harflerin kabulü",
        },
        {
          tr: "1931 tarih kurumunun kuruluşu",
        },
        {
          tr: "1932 dil kurumunun kuruluşu",
        },
        {
          tr: "1924 eğitimde birlik kanunu",
        },
        {
          tr: "1934 kadınların milletvekili seçim hakkı",
        },
      ],
      answer: 4,
      hint: {
        tr: "1933 sınırının iki yanını ayır.",
      },
      explanation: {
        tr: "1934,1933’ten sonradır; öteki seçeneklerdeki yıllar önce gelir. Kadınların başka medeni veya yerel siyasal haklarının da 1934’e kadar hiç olmadığı sonucu çıkarılamaz. Soruda yalnız verilen olayların zaman ilişkisi istenmektedir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
  ],
  "iki-savas-arasi-turkiye-dunya": [
    {
      id: "f12h-iki-savas-arasi-turkiye-dunya-01",
      passage: {
        tr: "1926’da Türkiye, İngiltere ve Irak arasındaki sınır düzenleniyor; Musul Irak’ta kalıyor.",
      },
      prompt: {
        tr: "Hangi belge ve sorun söz konusudur?",
      },
      options: [
        {
          tr: "1926 Ankara Antlaşması: Musul",
        },
        {
          tr: "1921 Ankara Antlaşması: Fransa cephesi",
        },
        {
          tr: "1936 Montrö: okul denetimi",
        },
        {
          tr: "1934 Balkan Antantı: Medeni Kanun",
        },
        {
          tr: "1928 alfabe kanunu: mübadele",
        },
      ],
      answer: 0,
      hint: {
        tr: "Tarafları ve yılı birlikte kullan.",
      },
      explanation: {
        tr: "Türkiye-İngiltere-Irak ve 1926 kanıtları Musul meselesindeki Ankara Antlaşmasını gösterir.1921’de Fransa’yla aynı şehir adıyla anılan belge farklıdır. Şehir adının ortaklığı antlaşmanın taraf ve konusunu değiştirmez.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-iki-savas-arasi-turkiye-dunya-02",
      passage: {
        tr: "1923 Lozan düzenindeki uluslararası komisyon 1936’da kaldırılıyor; Boğazların savunması Türkiye’ye bırakılırken gemilerin geçişi için hükümler konuluyor.",
      },
      prompt: {
        tr: "Bu değişiklik hangi belgeye aittir?",
      },
      options: [
        {
          tr: "1920 Misak-ı Millî",
        },
        {
          tr: "Montrö Boğazlar Sözleşmesi",
        },
        {
          tr: "1921 Tekâlif-i Millîye",
        },
        {
          tr: "1925 Soyadı Kanunu",
        },
        {
          tr: "1930 Serbest Fırka programı",
        },
      ],
      answer: 1,
      hint: {
        tr: "Komisyonun kalkması ve 1936 iki belirgin kanıttır.",
      },
      explanation: {
        tr: "Montrö 1936 Boğazların savunma ve geçiş statüsünü düzenledi. Verilenler bütün ticaret gemilerinin yasaklandığı anlamına gelmez. Diğer seçenekler Boğazlar Komisyonunu kaldıran devletler arası sözleşmeler değildir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-iki-savas-arasi-turkiye-dunya-03",
      passage: {
        tr: "Türkiye, Yunanistan, Romanya ve Yugoslavya 1934’te bölgesel güvenlik amacıyla ortak bir antant imzalıyor.",
      },
      prompt: {
        tr: "Hangi oluşum anlatılmaktadır?",
      },
      options: [
        {
          tr: "Türkiye-İran-Irak-Afganistan Sadabat Paktı",
        },
        {
          tr: "1920 Milletler Cemiyetinin bütün kurucu üyeleri",
        },
        {
          tr: "Balkan Antantı",
        },
        {
          tr: "1945 BM Güvenlik Konseyinin daimi üyeleri",
        },
        {
          tr: "1923 Lozan’daki bütün devletler",
        },
      ],
      answer: 2,
      hint: {
        tr: "Açık üye listesi coğrafi tahminden güçlüdür.",
      },
      explanation: {
        tr: "Dört ülke ve 1934 tarihi Balkan Antantına uyar. Sadabat 1937’de farklı üyelerle kurulmuştur. Birlikte barış amacı taşımaları bütün bölgesel veya küresel örgütlerin aynı hukuki yapı olduğu anlamına gelmez.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-iki-savas-arasi-turkiye-dunya-04",
      passage: {
        tr: "1937’de Türkiye, İran, Irak ve Afganistan saldırmazlık ve iyi komşuluk çerçevesinde bir pakt kuruyor.",
      },
      prompt: {
        tr: "Hangi devletin bu imzacı listesinde bulunduğu söylenemez?",
      },
      options: [
        {
          tr: "Türkiye",
        },
        {
          tr: "İran",
        },
        {
          tr: "Irak",
        },
        {
          tr: "Suriye",
        },
        {
          tr: "Afganistan",
        },
      ],
      answer: 3,
      hint: {
        tr: "Soruda verilen üyeleri doğrudan listele.",
      },
      explanation: {
        tr: "Açık imzacı listesinde Suriye yoktur; diğer dört ülke Sadabat Paktının üyeleridir. Komşuluk veya haritadaki yakınlık kendiliğinden üyelik oluşturmaz. Olumsuz kökte listede olanı değil dışarıda kalanı seçmelisin.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-iki-savas-arasi-turkiye-dunya-05",
      passage: {
        tr: "Hatay için 1936 statü tartışması,1938 ayrı devletin kurulması ve 1939 Türkiye’ye katılma kararı veriliyor.",
      },
      prompt: {
        tr: "Bu verilerle hangi yargı uyuşmaz?",
      },
      options: [
        {
          tr: "Statü konusu katılmadan önce tartışılmıştır.",
        },
        {
          tr: "Ayrı devlet aşaması 1938’dedir.",
        },
        {
          tr: "Katılma 1939’da gerçekleşmiştir.",
        },
        {
          tr: "Süreç birden çok aşamadan oluşmuştur.",
        },
        {
          tr: "Hatay 1938’de Türkiye’ye katılmıştır.",
        },
      ],
      answer: 4,
      hint: {
        tr: "Ara aşamayla nihai sonucu aynı tarihe koyma.",
      },
      explanation: {
        tr: "1938 verilenlere göre ayrı devletin yılıdır; Türkiye’ye katılma 1939’dadır. Diğer seçenekler bu sırayı korur. Aynı siyasi sürecin parçası olmak bütün adımların aynı gün veya aynı yıl tamamlandığını göstermez.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-iki-savas-arasi-turkiye-dunya-06",
      passage: {
        tr: "Bir parti 1924’te kurulup 1925’te kapatılıyor; başka parti 1930’da kurulup kurucusunun kararıyla aynı yıl kendisini feshediyor.",
      },
      prompt: {
        tr: "Bu iki kapanış nasıl yorumlanmalıdır?",
      },
      options: [
        {
          tr: "Kapatılma ile kendini feshetme farklı işlemlerdir.",
        },
        {
          tr: "İkisi de 1934 Medeni Kanununun kabulüdür.",
        },
        {
          tr: "İki parti aynı isim ve tarihte kurulmuştur.",
        },
        {
          tr: "Her iki olay da doğrudan askerî ateşkestir.",
        },
        {
          tr: "Fesih bir partinin hiç kurulmadığını kanıtlar.",
        },
      ],
      answer: 0,
      hint: {
        tr: "Kararı alan aktör ve fiilin anlamına bak.",
      },
      explanation: {
        tr: "Terakkiperver Cumhuriyet Fırkasının kapatılması ile Serbest Cumhuriyet Fırkasının kendi feshi aynı süreç değildir. Fesih partinin önceden varlığını silmez. Veriler farklı tarih ve karar mekanizmalarını açıkça ayırmaktadır.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-iki-savas-arasi-turkiye-dunya-07",
      passage: {
        tr: "Bir uyuşmazlıkta İstanbul Rumları ile Batı Trakya Türklerinin yerleşik sayılma koşulları görüşülüyor ve 1930’da uzlaşma sağlanıyor.",
      },
      prompt: {
        tr: "Uyuşmazlığın ana konusu nedir?",
      },
      options: [
        {
          tr: "Musul petrol paylarının 1936 dağılımı",
        },
        {
          tr: "Türk-Yunan nüfus mübadelesi",
        },
        {
          tr: "Boğazlardaki savaş gemilerinin tonajı",
        },
        {
          tr: "1928 alfabenin harf sayısı",
        },
        {
          tr: "Sakarya’da ordunun ikmal miktarı",
        },
      ],
      answer: 1,
      hint: {
        tr: "Yerleşik statüsünün hangi insanlar için tartışıldığına bak.",
      },
      explanation: {
        tr: "İstanbul Rumları ve Batı Trakya Türkleri yerleşik/mübadele istisnaları bağlamındadır. Musul, Boğazlar, alfabe ve ikmal farklı nesnelere sahiptir. Nüfusla ilgili her belgeyi genel göç veya asker sayısı diye yorumlamak kapsamı kaybettirir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-iki-savas-arasi-turkiye-dunya-08",
      passage: {
        tr: "Bir devlet yabancı okulların kendi eğitim mevzuatına göre denetlenmesini bir iç mesele kabul ediyor ve dış müdahaleyi reddediyor.",
      },
      prompt: {
        tr: "En doğrudan hangi ilkeyle bağlantı kurulabilir?",
      },
      options: [
        {
          tr: "Bütün okulların yabancı devlete devri",
        },
        {
          tr: "Yabancı komisyonun koşulsuz üstünlüğü",
        },
        {
          tr: "Ulusal egemenlik ve hukuk yetkisi",
        },
        {
          tr: "Deniz ticaretinin tamamen yasaklanması",
        },
        {
          tr: "Tüm ekonomik borçların anında ödenmesi",
        },
      ],
      answer: 2,
      hint: {
        tr: "Denetim yetkisinin kime ait olduğunu belirle.",
      },
      explanation: {
        tr: "Okulların ülkenin hukukuna göre denetlenmesi ulusal egemenlik ve düzenleme yetkisiyle ilgilidir. Verilen karar borçların ödendiğini veya deniz ticaretinin yasaklandığını göstermez; başka alanlarda sonuç çıkarmak kanıt sınırını aşar.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-iki-savas-arasi-turkiye-dunya-09",
      passage: {
        tr: "Bir kaynak 1932 Türkiye’nin Milletler Cemiyetine katılmasını ve 1934 Balkan Antantını kronolojiye yerleştiriyor.",
      },
      prompt: {
        tr: "Hangi çıkarım verilerle desteklenmez?",
      },
      options: [
        {
          tr: "Katılım Balkan Antantından öncedir.",
        },
        {
          tr: "İki gelişme farklı tarihlerdedir.",
        },
        {
          tr: "Birisi uluslararası örgüte katılımdır.",
        },
        {
          tr: "Üyelikten sonra bütün uyuşmazlıklar kesinlikle sona ermiştir.",
        },
        {
          tr: "Diğeri bölgesel güvenlik girişimidir.",
        },
      ],
      answer: 3,
      hint: {
        tr: "Kurumsal araç ile bütün sorunların bitişini ayır.",
      },
      explanation: {
        tr: "Üyelik barışçı iş birliğine yönelik bir araçtır; bütün uyuşmazlıkların kesin bitişi için kanıt değildir. Öteki seçenekler verilen tarih ve oluşum türlerini korur. Hedefin ilanı ile ölçülen sonuç farklıdır.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-iki-savas-arasi-turkiye-dunya-10",
      passage: {
        tr: "Atatürk 10 Kasım 1938’de ölüyor; ertesi gün TBMM yeni cumhurbaşkanını seçiyor.",
      },
      prompt: {
        tr: "Seçilen kişi kimdir?",
      },
      options: [
        {
          tr: "Mustafa Kemal Atatürk",
        },
        {
          tr: "Fethi Okyar",
        },
        {
          tr: "Kâzım Karabekir",
        },
        {
          tr: "Rauf Orbay",
        },
        {
          tr: "İsmet İnönü",
        },
      ],
      answer: 4,
      hint: {
        tr: "Devlet başkanlığı değişimi ile parti kuruluşunu ayır.",
      },
      explanation: {
        tr: "TBMM 11 Kasım 1938’de İsmet İnönü’yü cumhurbaşkanı seçti. Bu tarih 1930 Serbest Fırka kuruluşu veya Millî Mücadele komutanlıklarıyla karıştırılmamalıdır. Kurumsal seçim devletin sürekliliği bağlamında değerlendirilir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
  ],
  "kuresel-savaslar-arasinda-turkiye-dunya": [
    {
      id: "f12h-kuresel-savaslar-arasinda-turkiye-dunya-01",
      passage: {
        tr: "1920’de merkezi Cenevre olan uluslararası örgüt barışı korumak için faaliyete başlıyor; fikri destekleyen ABD örgüte katılmıyor.",
      },
      prompt: {
        tr: "Örgütün adı nedir?",
      },
      options: [
        {
          tr: "Milletler Cemiyeti",
        },
        {
          tr: "1945 Birleşmiş Milletler",
        },
        {
          tr: "1934 Balkan Antantı",
        },
        {
          tr: "1937 Sadabat Paktı",
        },
        {
          tr: "1923 Türkiye Büyük Millet Meclisi",
        },
      ],
      answer: 0,
      hint: {
        tr: "Kuruluş yılı, merkez ve ABD’nin durumunu birlikte kullan.",
      },
      explanation: {
        tr: "1920 ve Cenevre Milletler Cemiyetini gösterir. Birleşmiş Milletler 1945’te kuruldu; Balkan ve Sadabat bölgesel girişimlerdir. Bir fikri desteklemek hukuki üyelikle aynı olmadığı için ABD’nin durumu ayrıca belirtilmiştir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-kuresel-savaslar-arasinda-turkiye-dunya-02",
      passage: {
        tr: "1928 tarihli bir pakt, uyuşmazlıkları çözmede savaşın ulusal politika aracı olarak kullanılmasını reddediyor; sonraki saldırıları durdurmakta yetersiz kalıyor.",
      },
      prompt: {
        tr: "Bu iki bilgi birlikte nasıl yorumlanmalıdır?",
      },
      options: [
        {
          tr: "İmza hiçbir barış hedefi bulunmadığını kanıtlar.",
        },
        {
          tr: "Barış taahhüdü, etkili uygulama garantisi değildir.",
        },
        {
          tr: "Savaşlar imza günü kesin olarak bitmiştir.",
        },
        {
          tr: "Belge bütünüyle bir borsa alım emridir.",
        },
        {
          tr: "Sonraki savaşlar 1928’den önce gerçekleşmiştir.",
        },
      ],
      answer: 1,
      hint: {
        tr: "Taahhüt ile yaptırım iki ayrı basamaktır.",
      },
      explanation: {
        tr: "Briand-Kellogg Paktı barışçı yöntem taahhüdü getirdi; saldırıların sürmesi uygulama ve yaptırımın sınırlılığını gösterir. Bu iki bilgi çelişmez. Hedefi başarı garantisi saymak veya ekonomik işlem diye yorumlamak verilen nesneyi değiştirir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-kuresel-savaslar-arasinda-turkiye-dunya-03",
      passage: {
        tr: "1929’da bankalar kayıp yaşıyor, kredi daralıyor; firmalar yatırım ve üretimi azaltıyor, işsizlik artıyor.",
      },
      prompt: {
        tr: "Hangi neden-mekanizma-sonuç zinciri veriye uygundur?",
      },
      options: [
        {
          tr: "İşsizlik artışı → bütün borçların yok olması → sınırsız kredi",
        },
        {
          tr: "Yeni alfabe → otomatik kredi artışı → bütün firmaların büyümesi",
        },
        {
          tr: "Kredi daralması → üretim-yatırım kısıntısı → işsizlik artışı",
        },
        {
          tr: "Barış antlaşması → her fiyatın sabit kalması → işsizliğin kesin yokluğu",
        },
        {
          tr: "Banka kaybı → bütün işyerlerinin aynı gün aynı oranda büyümesi",
        },
      ],
      answer: 2,
      hint: {
        tr: "Aradaki finansman mekanizmasını görünür kıl.",
      },
      explanation: {
        tr: "Kredi işletmelerin harcama imkânını etkileyebildiği için daralma yatırım ve üretim üzerinden istihdama yansıyabilir. Verilen zincir bunu gösterir; her firmanın eşit etkilenmesi veya borçların yok olması bilgisi verilmemiştir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-kuresel-savaslar-arasinda-turkiye-dunya-04",
      passage: {
        tr: "Bir ekonomi krizinde dış kredi ve uluslararası ticaret azalıyor; tarım ürünü ihraç eden ülkelerin gelirleri düşüyor.",
      },
      prompt: {
        tr: "Krizin yayılmasına ilişkin hangi çıkarım yapılabilir?",
      },
      options: [
        {
          tr: "Her ülke tam olarak aynı gün aynı oranda etkilenir.",
        },
        {
          tr: "Yalnız askerî işgal yaşayan ülkeler etkilenebilir.",
        },
        {
          tr: "Ticaret bağlantıları hiçbir ekonomik sonuç doğuramaz.",
        },
        {
          tr: "Ülkeler arası ekonomik bağlantılar etkileri sınırların ötesine taşıyabilir.",
        },
        {
          tr: "Tarım ürünleri bütün ülkelerde aynı fiyatla sonsuza kadar satılır.",
        },
      ],
      answer: 3,
      hint: {
        tr: "Bir bağlantı mekanizması mı, evrensel eşit etki mi anlatılıyor?",
      },
      explanation: {
        tr: "Dış kredi ve ticaret etkilerin ülkeler arasında aktarılmasını sağlayabilir. Bu, her ülkenin aynı ölçüde etkileneceği anlamına gelmez. Yerel üretim ve ekonomi yapısı farklı olduğundan evrensel aynı oran iddiası verilenleri aşar.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-kuresel-savaslar-arasinda-turkiye-dunya-05",
      passage: {
        tr: "Bir kart Mussolini’nin 1922 İtalya’da, bir kart Hitler’in 1933 Almanya’da iktidara gelişini ve muhalefetin bastırılmasını anlatıyor.",
      },
      prompt: {
        tr: "Hangi yorum yanlıştır?",
      },
      options: [
        {
          tr: "İki süreçte otoriter ortak özellikler bulunabilir.",
        },
        {
          tr: "Ülke ve yıl farkı korunmalıdır.",
        },
        {
          tr: "Ortak özellikler bütün ayrıntıların özdeşliğini göstermez.",
        },
        {
          tr: "Nazizmin özgül ırkçı politikaları ayrıca incelenmelidir.",
        },
        {
          tr: "İki lider aynı ülkede aynı yılda iktidara gelmiştir.",
        },
      ],
      answer: 4,
      hint: {
        tr: "Benzerlik ülke ve tarih farkını silmez.",
      },
      explanation: {
        tr: "Verilen açık ülke-yıl çiftleri farklıdır. Ortak otoriter özellikler karşılaştırma yapılmasına izin verir ama olayları tekleştirmez. Diğer seçenekler ortaklık ve farklılığı birlikte korurken yanlış seçenek doğrudan veriyi tersine çevirir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-kuresel-savaslar-arasinda-turkiye-dunya-06",
      passage: {
        tr: "Bir kaynak Nazi propagandasındaki ırk üstünlüğü ve antisemitizm iddialarını, rejimin dışlama politikalarını açıklamak için inceliyor.",
      },
      prompt: {
        tr: "Bu iddialar ders içinde nasıl ele alınmalıdır?",
      },
      options: [
        {
          tr: "Ayrımcı ideolojinin tarihsel savları olarak, doğruluk veya onay atfedilmeden",
        },
        {
          tr: "Bütün insanlar için bilimsel olarak kanıtlanmış gerçekler olarak",
        },
        {
          tr: "Gelecekte uygulanması gereken ders hedefleri olarak",
        },
        {
          tr: "Sadece bir ses dalgası deneyi olarak",
        },
        {
          tr: "Her demokratik rejimin zorunlu tanımı olarak",
        },
      ],
      answer: 0,
      hint: {
        tr: "Bir ideolojiyi açıklamak onun savını onaylamak değildir.",
      },
      explanation: {
        tr: "Tarihsel inceleme propagandayı ideolojinin bir iddiası olarak çözümler; ırk üstünlüğüne bilimsel doğruluk veya ahlaki onay vermez. İncelenen politika ile dersin benimsediği değerleri karıştırmamak kanıt okumanın temel sınırıdır.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-kuresel-savaslar-arasinda-turkiye-dunya-07",
      passage: {
        tr: "1917’de Çarlık yıkılıyor, geçici hükûmet kuruluyor; daha sonra Bolşevikler iktidarı alıp Brest-Litovsk’la savaştan çekiliyor.",
      },
      prompt: {
        tr: "Süreç için hangi yorum uygundur?",
      },
      options: [
        {
          tr: "Bütün aşamalar aynı hükümetin değişmeden devamıdır.",
        },
        {
          tr: "1917’de farklı aktörlerin yer aldığı birden çok siyasal aşama vardır.",
        },
        {
          tr: "Brest-Litovsk 1928 alfabe düzenlemesidir.",
        },
        {
          tr: "1917’de hiçbir savaş etkisi yoktur.",
        },
        {
          tr: "Geçici hükümet 1945 BM Güvenlik Konseyidir.",
        },
      ],
      answer: 1,
      hint: {
        tr: "Aynı yıl içinde aktör değişimini izle.",
      },
      explanation: {
        tr: "Çarlık, geçici hükûmet ve Bolşevik iktidar farklı aşamalardır. Aynı yılın içinde olmaları aynı yönetimin hiç değişmediğini göstermez. Savaştan çekilme kararı da önceki geçici hükûmetin savaşı sürdürmesiyle ayrı değerlendirilir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-kuresel-savaslar-arasinda-turkiye-dunya-08",
      passage: {
        tr: "NEP döneminde bazı küçük özel işletmelere izin veriliyor; büyük sanayi, ulaşım ve bankacılıkta devletin rolü sürüyor.",
      },
      prompt: {
        tr: "Hangi yargı veriyi aşar?",
      },
      options: [
        {
          tr: "Sektörler arasında farklı uygulamalar vardır.",
        },
        {
          tr: "Küçük işletmeler için sınırlı piyasa alanı tanınmıştır.",
        },
        {
          tr: "Bütün sektörlerde devlet rolü tamamen sona ermiştir.",
        },
        {
          tr: "Rejim etiketi her ekonomik işlemin ayrıntısını tek başına vermez.",
        },
        {
          tr: "Büyük sanayiyle küçük işletmeler ayrı ele alınmalıdır.",
        },
      ],
      answer: 2,
      hint: {
        tr: "“Bazı” sözcüğünü “bütün”e dönüştürme.",
      },
      explanation: {
        tr: "Özel faaliyete bazı alanlarda izin verilmesi bütün devlet rolünün bittiğini göstermez; metin büyük sektörlerde rolün sürdüğünü açıkça söyler. Öteki seçenekler bu sektör farkını korur ve kanıtın kapsamını genişletmez.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-kuresel-savaslar-arasinda-turkiye-dunya-09",
      passage: {
        tr: "Bir belge 1925 Locarno düzenlemelerini ve Almanya’nın 1926’da Milletler Cemiyetine katılmasını peş peşe anlatıyor.",
      },
      prompt: {
        tr: "Hangi ayrım doğrudur?",
      },
      options: [
        {
          tr: "İki tarih tek bir aynı günün iki yazımıdır.",
        },
        {
          tr: "Örgüte üyelik doğrudan işgal ilanıdır.",
        },
        {
          tr: "1926,1925’ten önce gelir.",
        },
        {
          tr: "Antlaşma ile örgüte üyelik farklı işlemlerdir.",
        },
        {
          tr: "Her iki işlem 1939’daki Polonya işgalidir.",
        },
      ],
      answer: 3,
      hint: {
        tr: "Belge türünü tarih sırasıyla birlikte incele.",
      },
      explanation: {
        tr: "Locarno bir diplomatik düzenlemeler dizisi, Cemiyete katılım ise üyelik işlemidir. Birbirini izlemeleri türlerini aynı yapmaz. Diğer seçenekler tarihe aykırı veya bütünüyle farklı olayları bu iki gelişmeye taşımaktadır.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-kuresel-savaslar-arasinda-turkiye-dunya-10",
      passage: {
        tr: "1930’larda bazı devletler antlaşma ve sınırların kendi lehlerine değiştirilmesini savunurken başkaları mevcut düzeni korumak istiyor.",
      },
      prompt: {
        tr: "İlk tutum hangi kavramla adlandırılır?",
      },
      options: [
        {
          tr: "Statükoyu koruma",
        },
        {
          tr: "Yalnız iç okul denetimi",
        },
        {
          tr: "Tarafsız bir laboratuvar ölçümü",
        },
        {
          tr: "Kıtalar arası iklim göçü",
        },
        {
          tr: "Revizyonist politika",
        },
      ],
      answer: 4,
      hint: {
        tr: "Değiştirme ile koruma ayrımını kullan.",
      },
      explanation: {
        tr: "Mevcut uluslararası düzeni değiştirmeyi amaçlayan tutum revizyonisttir; statükoculuk düzeni korumayı ifade eder. Bu kavramlar her ülkenin bütün dönemlerdeki değişmez karakterini değil somut dış politika yaklaşımını açıklamak için kullanılır.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
  ],
  "ikinci-dunya-savasi-sonrasi": [
    {
      id: "f12h-ikinci-dunya-savasi-sonrasi-01",
      passage: {
        tr: "Almanya 1 Eylül 1939’da Polonya’yı işgal ediyor; İngiltere ve Fransa 3 Eylül’de Almanya’ya savaş ilan ediyor.",
      },
      prompt: {
        tr: "Avrupa’da II. Dünya Savaşı’nı başlatan yakın gelişme hangisidir?",
      },
      options: [
        {
          tr: "Polonya’nın işgali",
        },
        {
          tr: "1945 San Francisco Konferansı",
        },
        {
          tr: "1934 kadınların seçim hakkı",
        },
        {
          tr: "1946 Demokrat Parti kuruluşu",
        },
        {
          tr: "1923 İzmir İktisat Kongresi",
        },
      ],
      answer: 0,
      hint: {
        tr: "Uzun dönem nedenlerden kesin tarihli tetikleyiciyi ayır.",
      },
      explanation: {
        tr: "1 Eylül 1939 Polonya işgali yakın başlangıç olayıdır. San Francisco savaşın sonuna, öteki seçenekler Türkiye’nin farklı iç gelişmelerine aittir. Ekonomik ve siyasal uzun nedenler bulunması bu belirli başlangıç olayını değiştirmez.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ikinci-dunya-savasi-sonrasi-02",
      passage: {
        tr: "Almanya Haziran 1941’de SSCB’ye saldırıyor; Japonya Aralık 1941’de Pearl Harbor’a saldırıyor ve ABD savaşa giriyor.",
      },
      prompt: {
        tr: "İki olayın ortak sonucu nasıl ifade edilir?",
      },
      options: [
        {
          tr: "Her iki olay savaşın 1945’teki kesin barış imzasıdır.",
        },
        {
          tr: "Savaşın coğrafyası ve başlıca güçlerin katılımı genişlemiştir.",
        },
        {
          tr: "ABD 1939’dan önce bu saldırıyla savaşa girmiştir.",
        },
        {
          tr: "İki saldırıyı da aynı gün aynı ülke yapmıştır.",
        },
        {
          tr: "Polonya işgali 1941’den sonraya kaymıştır.",
        },
      ],
      answer: 1,
      hint: {
        tr: "Ortak etkiyi bulurken aktör ve tarihi birleştirme.",
      },
      explanation: {
        tr: "1941 saldırıları SSCB ve ABD’nin savaşın içinde doğrudan büyük rol almasına yol açtı; farklı aktör ve cepheler söz konusudur. Bu gelişmeler 1939 başlangıcını sonradan yeniden tarihlemez ve savaşın bittiği anlamına gelmez.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ikinci-dunya-savasi-sonrasi-03",
      passage: {
        tr: "Almanya Mayıs 1945’te teslim oluyor; Asya-Pasifik’te Japonya’yla çatışma sürüyor ve Japonya Eylül 1945’te teslim oluyor.",
      },
      prompt: {
        tr: "Bu veriler hangi ayrımı destekler?",
      },
      options: [
        {
          tr: "Savaş bütün dünyada 1939’dan önce bitmiştir.",
        },
        {
          tr: "Japonya Almanya’dan önce teslim olmuştur.",
        },
        {
          tr: "Avrupa’daki bitiş ile savaşın küresel bitişi aynı tarih değildir.",
        },
        {
          tr: "Mayıs ve Eylül aynı ayın adıdır.",
        },
        {
          tr: "Avrupa’da teslimiyet hiç yaşanmamıştır.",
        },
      ],
      answer: 2,
      hint: {
        tr: "Cephe ölçeği ile bütün savaşın ölçeğini ayır.",
      },
      explanation: {
        tr: "Avrupa’daki Mayıs bitişi Asya-Pasifik’te sürmekte olan çatışmayı o gün sona erdirmez. Japonya’nın Eylül teslimi küresel bitiş bağlamındadır. Aynı yıl içinde olmak aynı olay veya aynı tarih demek değildir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ikinci-dunya-savasi-sonrasi-04",
      passage: {
        tr: "1945 San Francisco Konferansı’nda hazırlanan Şart 24 Ekim’de yürürlüğe giriyor; yeni bir uluslararası barış örgütü kuruluyor.",
      },
      prompt: {
        tr: "Hangi örgüt anlatılmaktadır?",
      },
      options: [
        {
          tr: "1920 Milletler Cemiyeti",
        },
        {
          tr: "1934 Balkan Antantı",
        },
        {
          tr: "1921 Temsil Heyeti",
        },
        {
          tr: "Birleşmiş Milletler",
        },
        {
          tr: "1930 Serbest Cumhuriyet Fırkası",
        },
      ],
      answer: 3,
      hint: {
        tr: "Şartın yürürlüğü ve 1945 birlikte ayırt edicidir.",
      },
      explanation: {
        tr: "Birleşmiş Milletler 1945’te kuruldu; Milletler Cemiyeti 1920’deki ayrı örgüttür. Bölgesel antant, temsil kurulu ve parti farklı hukuki yapılardır. Bir barış hedefini paylaşmak bunları aynı kurum yapmaz.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ikinci-dunya-savasi-sonrasi-05",
      passage: {
        tr: "Birleşmiş Milletlerde bütün üyeler Genel Kurulda temsil ediliyor; Güvenlik Konseyinin beş daimi üyesinin veto yetkisi olduğu belirtiliyor.",
      },
      prompt: {
        tr: "Hangi çıkarım yanlıştır?",
      },
      options: [
        {
          tr: "Genel Kurul ve Güvenlik Konseyi farklı organlardır.",
        },
        {
          tr: "Daimi üyelerin özel konumu vardır.",
        },
        {
          tr: "Temsil ile veto aynı kavram değildir.",
        },
        {
          tr: "Veto Güvenlik Konseyinin karar usulüyle ilgilidir.",
        },
        {
          tr: "Bütün üyeler bütün organlarda aynı veto yetkisine sahiptir.",
        },
      ],
      answer: 4,
      hint: {
        tr: "Bir organa ait yetkiyi bütün örgüte yayma.",
      },
      explanation: {
        tr: "Metin beş daimi üyenin özel veto yetkisini belirtir; bunu bütün üyelere yaymak yanlıştır. Genel Kurul temsili ile Konseyin özel karar usulü farklıdır. Diğer seçenekler bu ayrımı korumaktadır.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ikinci-dunya-savasi-sonrasi-06",
      passage: {
        tr: "Türkiye 1943 Adana ve Kahire görüşmelerinde savaşa katılma talepleriyle karşılaşıyor; askerî hazırlık ihtiyacını öne sürüyor.",
      },
      prompt: {
        tr: "Yalnız bu görüşme bilgisinden hangisi çıkarılamaz?",
      },
      options: [
        {
          tr: "Türkiye o gün cephelerde fiilî muharebeye girmiştir.",
        },
        {
          tr: "Türkiye’ye katılım yönünde talepler vardır.",
        },
        {
          tr: "Diplomatik görüşmeler yapılmıştır.",
        },
        {
          tr: "Askerî hazırlık konusu gündeme gelmiştir.",
        },
        {
          tr: "Görüşmeye katılmakla savaşa asker göndermek farklı eylemlerdir.",
        },
      ],
      answer: 0,
      hint: {
        tr: "Diplomasi fiilini askerî çatışma fiiline dönüştürme.",
      },
      explanation: {
        tr: "Görüşme bilgisi talep ve diplomatik teması kanıtlar; fiilî cephe katılımı için yeterli değildir. Türkiye savaşta fiilî muharebelerden uzak kaldı. Kararın hukuki ve askerî aşamalarını ayrı değerlendirmek gerekir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ikinci-dunya-savasi-sonrasi-07",
      passage: {
        tr: "23 Şubat 1945’te Türkiye Almanya ve Japonya’ya savaş ilan ediyor; ancak fiilî muharebelere katılmıyor.",
      },
      prompt: {
        tr: "Hangi yorum iki bilgiyi de korur?",
      },
      options: [
        {
          tr: "Türkiye hiçbir zaman savaş ilan etmemiştir.",
        },
        {
          tr: "Hukuki-siyasi ilan vardır; fiilî cephe savaşı farklı bir eylemdir.",
        },
        {
          tr: "İlan otomatik olarak Normandiya’da savaşmak demektir.",
        },
        {
          tr: "Fiilî çatışma yokluğu diplomasinin de yokluğunu gösterir.",
        },
        {
          tr: "Türkiye 1939’da Polonya’yı işgal etmiştir.",
        },
      ],
      answer: 1,
      hint: {
        tr: "İlan ile fiilî katılımı aynı ölçüt sayma.",
      },
      explanation: {
        tr: "Veriler 1945 ilanını ve fiilî muharebe bulunmamasını birlikte gösterir. Birincisini yok saymak da cephe savaşını otomatik varsaymak da yanlıştır. Türkiye’nin BM kurucu üyelik süreci bu diplomatik bağlamla ilişkilidir.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ikinci-dunya-savasi-sonrasi-08",
      passage: {
        tr: "Türkiye’de savaş yıllarında seferberlik, ithalat güçlüğü, mal darlığı ve 1942 ekmek karnesi uygulanıyor.",
      },
      prompt: {
        tr: "Hangi sonuç en doğrudan desteklenir?",
      },
      options: [
        {
          tr: "Ekonomide hiçbir kaynak sorunu yoktur.",
        },
        {
          tr: "Bütün yurttaşların geliri aynı oranda artmıştır.",
        },
        {
          tr: "Fiilî muharebeye katılmadan da savaşın ekonomik etkileri yaşanmıştır.",
        },
        {
          tr: "Karne yeni alfabenin harf listesidir.",
        },
        {
          tr: "Ekmek karnesi doğrudan bir ateşkes antlaşmasıdır.",
        },
      ],
      answer: 2,
      hint: {
        tr: "Gündelik yaşam aracının hangi sorunu hedeflediğini belirle.",
      },
      explanation: {
        tr: "Karne temel ihtiyacın sınırlı arzda paylaştırılmasıyla ilişkilidir. Seferberlik ve dış ticaret sorunları savaşın dolaylı ekonomik yükünü gösterir. Fiilî cephe savaşı olmaması bu etkileri ortadan kaldırmaz veya herkesin refahının arttığını kanıtlamaz.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ikinci-dunya-savasi-sonrasi-09",
      passage: {
        tr: "1942 Varlık Vergisinin servet üzerinden gelir sağlama amacı olduğu; uygulamada eşitsizlik, ağır yük ve çalışma yükümlülüğü doğurduğu belirtiliyor.",
      },
      prompt: {
        tr: "Tarihsel değerlendirmede hangisi uygundur?",
      },
      options: [
        {
          tr: "Amaç varsa hiçbir haksızlık yaşanamayacağını varsaymak",
        },
        {
          tr: "Bütün grupların kesin aynı yükü taşıdığını söylemek",
        },
        {
          tr: "Vergiyi bir uluslararası savaş gemisi sözleşmesi saymak",
        },
        {
          tr: "Politikanın ilan edilen amacı ile uygulamadaki haksızlıkları ayrı incelemek",
        },
        {
          tr: "Çalışma yükümlülüğünü okuryazarlık kursuyla eşitlemek",
        },
      ],
      answer: 3,
      hint: {
        tr: "Gerekçe sonuçların yerine geçmez.",
      },
      explanation: {
        tr: "Bir verginin gelir sağlama gerekçesi uygulamadaki eşitsizliği yok saydırmaz. Özellikle gayrimüslim yurttaşlara yönelen ağır yük ve çalışma uygulaması somut sonuçlarıyla ele alınmalıdır. Amaç ile etkiyi ayrı okumak kanıtı korur.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
    {
      id: "f12h-ikinci-dunya-savasi-sonrasi-10",
      passage: {
        tr: "Savaş sonrası ilk dönemde 1945 Millî Kalkınma Partisi ve 1946 Demokrat Parti kuruluyor. Daha önce 1920’lerde de muhalefet partisi denemeleri vardır.",
      },
      prompt: {
        tr: "Hangi iddia verilenlerle uyuşmaz?",
      },
      options: [
        {
          tr: "1946 kuruluşu 1945’ten sonradır.",
        },
        {
          tr: "Muhalefet girişimlerinin tarihi 1946’dan önceye uzanır.",
        },
        {
          tr: "Parti kuruluşları farklı dönemlerde gerçekleşmiştir.",
        },
        {
          tr: "Demokrat Parti çok partili hayatın gelişiminde önemli bir aktördür.",
        },
        {
          tr: "Demokrat Parti Türkiye tarihinin ilk muhalefet partisidir.",
        },
      ],
      answer: 4,
      hint: {
        tr: "“İlk” iddiasını bütün verilen tarihlerle denetle.",
      },
      explanation: {
        tr: "Önceki muhalefet girişimleri ve 1945 partisi açıkça verildiği için Demokrat Partiyi koşulsuz ilk muhalefet partisi saymak yanlıştır. Bu, onun çok partili hayatın gelişimindeki önemini reddetmez; ilk olma ile önemli olma farklı iddialardır.",
      },
      skill:
        "Tarihsel kanıtı kronoloji, kurum ve çıkarım sınırıyla değerlendirme",
    },
  ],
};

export const forge012HistoryTopics: Record<string, string> = {
  "milli-mucadele": "detail-245",
  "ataturkculuk-inkilap": "detail-246",
  "iki-savas-arasi-turkiye-dunya": "detail-247",
  "kuresel-savaslar-arasinda-turkiye-dunya": "detail-248",
  "ikinci-dunya-savasi-sonrasi": "detail-249",
};
export const forge012HistoryGuides: LessonGuide[] = authoredGuides.map(
  ({ title: _title, ...guide }) => guide,
);
export const forge012HistoryLessons: Lesson[] = authoredGuides.map((guide) => ({
  id: guide.id,
  subjectId: "tyt-tarih",
  title: txt(guide.title),
  minutes: guide.minutes,
  objectives: guide.objectives.map(txt),
  body: guide.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: banks[guide.id],
  source: txt(guide.source),
  tags: [
    "kaynakli-anlatim",
    "etkilesimli",
    "ozgun-sorular",
    forge012HistoryTopics[guide.id],
  ],
}));
export interface History012Event {
  name: string;
  date: string;
  year: number;
  actor: string;
  kind: string;
  evidence: string;
  chain: string[];
  details: string[];
  choices: string[];
  answer: number;
  limit: string;
}
export const history012Events: Record<string, History012Event[]> = {
  "milli-mucadele": [
    {
      name: "Amasya Genelgesi",
      date: "22 Haziran 1919",
      year: 1919,
      actor: "Mustafa Kemal ve millî hareket",
      kind: "Genelge",
      evidence:
        "Bağımsızlığın tehlikede olduğu ve çözümün milletin azim ve kararına dayanacağı belirtiliyor.",
      chain: [
        "İşgal ve yönetim sorunu",
        "Millî örgütlenme çağrısı",
        "Sivas’ta kongre hazırlığı",
      ],
      details: [
        "Tehlike ve sorumluluğun yerine getirilmemesi gerekçe olarak gösterilir.",
        "Millet iradesi çözümün dayanağı olarak açıklanır.",
        "Güvenilir temsilcilerle millî kongre hedeflenir.",
      ],
      choices: [
        "Millî iradeye dayalı yöntem",
        "Cumhuriyetin aynı gün ilanı",
        "Boğazlar geçişinin düzenlenmesi",
      ],
      answer: 0,
      limit:
        "Geleceğe ilişkin egemenlik düşüncesi TBMM’nin o gün açıldığı anlamına gelmez.",
    },
    {
      name: "Sivas Kongresi",
      date: "4–11 Eylül 1919",
      year: 1919,
      actor: "Kongre ve Temsil Heyeti",
      kind: "Kongre kararı",
      evidence:
        "Farklı Müdafaa-i Hukuk cemiyetleri tek çatı altında birleşiyor; temsil heyetinin kapsamı genişliyor.",
      chain: ["Yerel örgütler", "Ortak çatı ve temsil", "Ulusal örgütlenme"],
      details: [
        "Başlangıçta farklı bölgelerin ayrı örgütleri vardır.",
        "Anadolu ve Rumeli Müdafaa-i Hukuk çatısı ortak temsil oluşturur.",
        "Ortak yönetim millî hareketin bütününe yayılır.",
      ],
      choices: [
        "Bütün orduların 1919’da dağıtılması",
        "Ulusal örgütlenme",
        "1934 seçim hakkı",
      ],
      answer: 1,
      limit:
        "Örgütsel birleşme savaştaki bütün sonuçların o gün tamamlandığı kanıtı değildir.",
    },
    {
      name: "TBMM’nin açılması",
      date: "23 Nisan 1920",
      year: 1920,
      actor: "Türkiye Büyük Millet Meclisi",
      kind: "Temsil kurumu",
      evidence:
        "Ankara’da meclis açılıyor; yasama ve yürütme mecliste toplanıyor.",
      chain: [
        "Temsilcilerin toplanması",
        "Mecliste karar yetkisi",
        "Millî egemenliğin kurumu",
      ],
      details: [
        "Seçim ve temsil temelinde yeni merkez oluşur.",
        "Yasama ve yürütme yetkileri mecliste birleşir.",
        "Millî irade yönetimin kurumsal dayanağı olur.",
      ],
      choices: [
        "1936 askerî komisyon",
        "Yalnız okul müfredatı",
        "Güçler birliği",
      ],
      answer: 2,
      limit:
        "Meclisin açılması, saltanatın kaldırılması ve cumhuriyetin ilanı ayrı tarihlerdir.",
    },
    {
      name: "Sakarya",
      date: "23 Ağustos–13 Eylül 1921",
      year: 1921,
      actor: "TBMM ordusu",
      kind: "Askerî muharebe",
      evidence:
        "Yunan ilerleyişi durduruluyor; sonraki dönemde Kars ve Ankara antlaşmaları yapılıyor.",
      chain: [
        "Savunma ve kaynak",
        "İlerleyişin durması",
        "Diplomatik konumun güçlenmesi",
      ],
      details: [
        "Ordu korunup hazırlanır; ikmal seferber edilir.",
        "Sakarya’da saldırı durdurulur.",
        "Askerî sonuç yeni antlaşmalar için ortamı etkiler.",
      ],
      choices: [
        "Savunmadan taarruz hazırlığına",
        "Lozan’ın aynı gün imzalanması",
        "Misak-ı Millî’nin ilk kabulü",
      ],
      answer: 0,
      limit:
        "Askerî başarı diplomasiye etki eder; her antlaşmanın tek nedeni olduğu söylenemez.",
    },
    {
      name: "Mudanya",
      date: "11 Ekim 1922",
      year: 1922,
      actor: "TBMM ve İtilaf temsilcileri",
      kind: "Ateşkes",
      evidence:
        "Büyük Taarruz sonrasında çatışmanın durması ve Doğu Trakya’nın devri düzenleniyor.",
      chain: ["Askerî üstünlük", "Ateşkes görüşmesi", "Çatışmanın durması"],
      details: [
        "Batıdaki kesin taarruz diplomatik zemini değiştirir.",
        "Mudanya’da çatışmayı durduran hükümler belirlenir.",
        "Kalıcı barış görüşmelerinin yolu açılır.",
      ],
      choices: ["Anayasa kabulü", "Ateşkes", "Yeni alfabe"],
      answer: 1,
      limit: "Ateşkes Lozan’daki bütün barış hükümlerinin aynısı değildir.",
    },
    {
      name: "Lozan",
      date: "24 Temmuz 1923",
      year: 1923,
      actor: "Türk heyeti ve konferans tarafları",
      kind: "Barış antlaşması",
      evidence:
        "Sınır, borç, kapitülasyon ve uluslararası statü konuları görüşülüyor.",
      chain: ["Müzakere", "Egemenlik düzenlemesi", "Barış antlaşması"],
      details: [
        "Maddeler ve uyuşmazlıklar konferansta tartışılır.",
        "Kapitülasyonlar kaldırılır; bazı meseleler sonraya kalır.",
        "Yeni uluslararası barış düzeni kabul edilir.",
      ],
      choices: [
        "Bütün borçların anında bitmesi",
        "1920 meclisinin kapanması",
        "Kalıcı barış düzeni",
      ],
      answer: 2,
      limit:
        "Musul sonraki görüşmelere bırakılmıştır; bütün hedefler aynı gün tamamlanmadı.",
    },
  ],
  "ataturkculuk-inkilap": [
    {
      name: "Saltanatın kaldırılması",
      date: "1 Kasım 1922",
      year: 1922,
      actor: "TBMM",
      kind: "Siyasal düzenleme",
      evidence:
        "Hanedan egemenliğine son veriliyor; millet egemenliği esas alınıyor.",
      chain: ["Hanedan yetkisi", "Meclis kararı", "Millî egemenlik"],
      details: [
        "Eski yönetim yetkisinin kaynağı hanedandır.",
        "TBMM saltanatı kaldırır.",
        "Siyasal meşruiyet millet iradesine bağlanır.",
      ],
      choices: [
        "Cumhuriyetçilik",
        "Bütün özel fabrikaların kapanması",
        "Alfabe değişimi",
      ],
      answer: 0,
      limit: "Cumhuriyetin ilanı 29 Ekim 1923’teki ayrı adımdır.",
    },
    {
      name: "Medeni Kanun",
      date: "17 Şubat 1926",
      year: 1926,
      actor: "TBMM",
      kind: "Medeni hukuk",
      evidence:
        "Evlenme, boşanma ve miras ilişkileri laik bir hukuk düzeninde ele alınıyor.",
      chain: ["Aile ve miras alanı", "Ortak hukuk kuralları", "Medeni haklar"],
      details: [
        "İncelenen nesne aile ve kişiler hukukudur.",
        "17 Şubat kabul; 4 Ekim yürürlük tarihidir.",
        "Medeni haklar ve hukuk birliği hedeflenir.",
      ],
      choices: [
        "Milletvekili hakkı 1934’te hiç olmadı",
        "Medeni haklar",
        "Boğazlar askerî geçişi",
      ],
      answer: 1,
      limit:
        "Milletvekili seçme-seçilme hakkı 1934 siyasal düzenlemesidir; bu kanunla aynı değildir.",
    },
    {
      name: "Harf ve Millet Mektepleri",
      date: "1928–1929",
      year: 1928,
      actor: "TBMM ve eğitim kurumları",
      kind: "Kanun ve eğitim aracı",
      evidence:
        "Yeni harfler kabul ediliyor; yetişkin okuryazarlığı için Millet Mektepleri açılıyor.",
      chain: [
        "Yazı sistemi değişimi",
        "Yetişkin öğretimi",
        "Okuryazarlık hedefi",
      ],
      details: [
        "1928 kanunu yeni harfleri kabul eder.",
        "1929 Millet Mektepleri öğretim aracıdır.",
        "Öğrenme için kurumsal uygulama yürütülür.",
      ],
      choices: [
        "Savaş tazminatı",
        "Sınır askerî harekâtı",
        "Amaç ile öğretim aracı",
      ],
      answer: 2,
      limit:
        "Okul açılması bütün yetişkinlerin aynı gün okuryazar olduğunu kanıtlamaz.",
    },
    {
      name: "Sanayi Planı",
      date: "1934",
      year: 1934,
      actor: "Devlet ve sanayi kuruluşları",
      kind: "Ekonomik plan",
      evidence:
        "Kamu öncülüğünde sanayi yatırımları planlanıyor; özel işletmeler de varlığını sürdürüyor.",
      chain: [
        "Sermaye ve üretim ihtiyacı",
        "Kamu yatırımı ve plan",
        "Sanayileşme hedefi",
      ],
      details: [
        "Yatırım imkânları ve yerli üretim ihtiyacı değerlendirilir.",
        "Devlet fabrika ve planlama rolünü artırır.",
        "Üretimin güçlendirilmesi hedeflenir.",
      ],
      choices: [
        "Devletçilik",
        "Bütün özel mülkiyetin bitişi",
        "Sadece alfabe düzeni",
      ],
      answer: 0,
      limit:
        "Planın ilanı bütün hedeflerin başarıyla tamamlandığı anlamına gelmez.",
    },
    {
      name: "İlkelerin Anayasa’ya girmesi",
      date: "5 Şubat 1937",
      year: 1937,
      actor: "TBMM",
      kind: "Anayasa değişikliği",
      evidence:
        "Altı ilke Anayasa metnine ekleniyor; reformların önemli kısmı daha önce yapılmış.",
      chain: [
        "Önceki uygulamalar",
        "Anayasal ifade",
        "İlkelerin metne girmesi",
      ],
      details: [
        "Cumhuriyet, eğitim ve hukuk düzenlemeleri önceki yıllardadır.",
        "İlkeler anayasal düzeyde ifade edilir.",
        "5 Şubat 1937 metne eklenme tarihidir.",
      ],
      choices: [
        "Bütün inkılaplar o gün başladı",
        "Anayasal ifade tarihi",
        "Millet Mektepleri o gün ilk açıldı",
      ],
      answer: 1,
      limit:
        "Bir düşüncenin Anayasa’da yer alması tüm uygulamalarının ilk kez o tarihte başlaması değildir.",
    },
  ],
  "iki-savas-arasi-turkiye-dunya": [
    {
      name: "Terakkiperver Fırka",
      date: "1924–1925",
      year: 1924,
      actor: "Siyasi parti ve hükûmet",
      kind: "Muhalefet denemesi",
      evidence: "1924’te kurulan muhalefet partisi 1925’te kapatılıyor.",
      chain: ["Parti kuruluşu", "Muhalefet ve gerilim", "Kapatılma"],
      details: [
        "Farklı görüşler parti çatısında örgütlenir.",
        "Güvenlik ve siyaset sorunları aynı dönemdedir.",
        "1925’te parti kapatılır.",
      ],
      choices: ["Kapatılma", "Kendisini 1930’da fesih", "1936 Boğazlar rejimi"],
      answer: 0,
      limit:
        "Bir partinin varlığı ile isyana katılan her kişinin niyeti otomatik olarak aynı sayılamaz.",
    },
    {
      name: "Musul ve Ankara",
      date: "5 Haziran 1926",
      year: 1926,
      actor: "Türkiye, İngiltere ve Irak",
      kind: "Sınır antlaşması",
      evidence:
        "Lozan’dan kalan Musul meselesi görüşülüyor; Türkiye-Irak sınırı düzenleniyor.",
      chain: ["Lozan’dan kalan sorun", "Görüşme ve karar", "Irak sınırı"],
      details: [
        "Musul Lozan’da sonraya kalmıştır.",
        "Haliç görüşmeleri ve Milletler Cemiyeti süreci yaşanır.",
        "1926 Ankara Antlaşması sınırı düzenler.",
      ],
      choices: [
        "1921 Fransa cephesi",
        "Musul ve Irak sınırı",
        "Alfabe öğretimi",
      ],
      answer: 1,
      limit: "Aynı şehir adı 1921 Ankara Antlaşmasını aynı belge yapmaz.",
    },
    {
      name: "Milletler Cemiyetine katılım",
      date: "18 Temmuz 1932",
      year: 1932,
      actor: "Türkiye ve Milletler Cemiyeti",
      kind: "Örgüt üyeliği",
      evidence:
        "Türkiye, barışçı iş birliği amacıyla Cemiyetin üyelik davetini kabul ediyor.",
      chain: ["Barışçı ilişkiler", "Üyelik daveti", "Uluslararası katılım"],
      details: [
        "Komşularla ilişkiler ve iş birliği geliştirilir.",
        "Üyelik için davet kabul edilir.",
        "Türkiye 1932’de örgüte katılır.",
      ],
      choices: [
        "1920’de Türkiye kurucudur",
        "Bütün savaşlar kesin biter",
        "Örgüt üyeliği",
      ],
      answer: 2,
      limit: "Üyelik bütün uyuşmazlıkların sona erdiğini göstermez.",
    },
    {
      name: "Balkan Antantı",
      date: "9 Şubat 1934",
      year: 1934,
      actor: "Türkiye, Yunanistan, Romanya, Yugoslavya",
      kind: "Bölgesel güvenlik",
      evidence:
        "Dört ülke Balkanlar’daki güvenlik kaygılarıyla antant kuruyor.",
      chain: [
        "Yayılmacılık kaygısı",
        "Dört ülkenin iş birliği",
        "Bölgesel güvenlik hedefi",
      ],
      details: [
        "1930’lar güvenlik ortamı değişmektedir.",
        "Dört imzacı ülke bir araya gelir.",
        "Bölgesel güvenliğin güçlenmesi amaçlanır.",
      ],
      choices: [
        "Balkan Antantı",
        "Sadabat üyelerinin tamamı",
        "BM’nin kuruluşu",
      ],
      answer: 0,
      limit: "Bulgaristan ve Arnavutluk bu antantın üyeleri değildir.",
    },
    {
      name: "Montrö",
      date: "20 Temmuz 1936",
      year: 1936,
      actor: "Türkiye ve sözleşme tarafları",
      kind: "Boğazlar sözleşmesi",
      evidence:
        "Komisyon kaldırılıyor; savunma Türkiye’ye veriliyor ve savaş gemilerine geçiş koşulları konuluyor.",
      chain: [
        "Güvenlik ihtiyacı",
        "Statünün yeniden görüşülmesi",
        "Savunma ve geçiş düzeni",
      ],
      details: [
        "1930’ların ortamı askerden arındırma düzenini sorunlu kılar.",
        "Türkiye diplomatik yolla değişiklik ister.",
        "Komisyon kalkar; savunma yetkisi ve geçiş kuralları düzenlenir.",
      ],
      choices: [
        "Bütün gemilerin koşulsuz yasağı",
        "Savunma yetkisi güçlenir",
        "Alfabe değişikliği",
      ],
      answer: 1,
      limit:
        "Ticaret gemisi ve savaş gemisi rejimi aynı değildir; her türlü geçiş kapatılmamıştır.",
    },
    {
      name: "Sadabat Paktı",
      date: "8 Temmuz 1937",
      year: 1937,
      actor: "Türkiye, İran, Irak, Afganistan",
      kind: "Saldırmazlık paktı",
      evidence:
        "Dört ülke iyi komşuluk ve saldırmazlık için Tahran’da pakt imzalıyor.",
      chain: [
        "Komşuluk ve güvenlik",
        "Dört ülkenin anlaşması",
        "Saldırmazlık çerçevesi",
      ],
      details: [
        "Bölgesel güvenlik iş birliği aranır.",
        "Türkiye, İran, Irak ve Afganistan imzacıdır.",
        "İyi komşuluk ve saldırmazlık düzenlenir.",
      ],
      choices: [
        "Yalnız Avrupa içi birlik",
        "Suriye’nin otomatik üyeliği",
        "Sadabat Paktı",
      ],
      answer: 2,
      limit: "Suriye imzacı değildir; coğrafi yakınlık üyelik sayılmaz.",
    },
  ],
  "kuresel-savaslar-arasinda-turkiye-dunya": [
    {
      name: "Milletler Cemiyeti",
      date: "1920",
      year: 1920,
      actor: "Uluslararası örgüt",
      kind: "Ortak güvenlik",
      evidence:
        "Barış için uluslararası örgüt kuruluyor; ABD fikri desteklese de katılmıyor.",
      chain: ["Barış hedefi", "Örgüt ve ortak karar", "Uygulama ihtiyacı"],
      details: [
        "Büyük savaş sonrasında kalıcı güvenlik aranır.",
        "Cemiyet kurumsal bir araç olarak oluşturulur.",
        "Etkili ortak uygulama ayrıca gereklidir.",
      ],
      choices: [
        "Hedef başarı garantisi değildir",
        "Bütün devletler kesin üye",
        "1945 BM’nin aynı adı",
      ],
      answer: 0,
      limit: "Örgütün varlığı saldırıların hepsini durdurduğu kanıtı değildir.",
    },
    {
      name: "Briand-Kellogg Paktı",
      date: "1928",
      year: 1928,
      actor: "Paktı imzalayan devletler",
      kind: "Savaşın reddi taahhüdü",
      evidence:
        "Uyuşmazlık çözümünde savaşın ulusal politika aracı olmasından vazgeçiliyor.",
      chain: [
        "Uyuşmazlık",
        "Barışçı yöntem taahhüdü",
        "Uygulama ve yaptırım sorunu",
      ],
      details: [
        "Devletler arası çatışma riskine çözüm aranır.",
        "Savaş dışındaki çözüm yöntemleri taahhüt edilir.",
        "Yaptırım zayıflığı sonraki olaylarda önem taşır.",
      ],
      choices: [
        "Borsa yatırımı emri",
        "Barışçı yöntem taahhüdü",
        "1920 TBMM’nin açılması",
      ],
      answer: 1,
      limit: "İmza 1930’lardaki bütün saldırıların önlendiği anlamına gelmez.",
    },
    {
      name: "Dünya Ekonomik Bunalımı",
      date: "1929",
      year: 1929,
      actor: "Bankalar, firmalar ve çalışanlar",
      kind: "Ekonomik kriz",
      evidence:
        "Banka kayıpları ve daralan kredi işletmelerin yatırımını ve iş gücü talebini azaltıyor.",
      chain: [
        "Kredi daralması",
        "Üretim ve yatırım kısıntısı",
        "İşsizlik ve talep düşüşü",
      ],
      details: [
        "Finansmana erişim azalır.",
        "İşletmeler harcama ve üretimi azaltabilir.",
        "İş kaybı gelir ve tüketimi düşürebilir.",
      ],
      choices: [
        "Bütün fiyatlar aynı kalır",
        "Her ülkede eşit büyüme",
        "Kredi ve üretim bağlantısı",
      ],
      answer: 2,
      limit:
        "Şema nedensel mekanizmayı gösterir; her ülkede aynı oran ölçülmüş değildir.",
    },
    {
      name: "Nazi iktidarı",
      date: "1933",
      year: 1933,
      actor: "Almanya’daki Nazi yönetimi",
      kind: "Totaliter rejim",
      evidence:
        "Muhalefet bastırılıyor; ırkçı ve antisemitik propaganda devlet politikasına dönüşüyor.",
      chain: [
        "Siyasal iktidar",
        "Muhalefetin bastırılması",
        "Ayrımcı ve yayılmacı politika",
      ],
      details: [
        "Savaş mirası ve kriz siyasal ortamı etkiler.",
        "Tek lider-parti egemenliği güçlendirilir.",
        "Ayrımcılık ve genişleme politikaları yürütülür.",
      ],
      choices: [
        "Totaliter rejim",
        "Bilimsel ırk üstünlüğü kanıtı",
        "1923 demokratik barış kurulu",
      ],
      answer: 0,
      limit:
        "Propagandanın ırk üstünlüğü iddiası bilimsel gerçek veya dersin onayı değildir.",
    },
  ],
  "ikinci-dunya-savasi-sonrasi": [
    {
      name: "Polonya’nın işgali",
      date: "1 Eylül 1939",
      year: 1939,
      actor: "Almanya ve Polonya",
      kind: "Savaşın başlangıcı",
      evidence:
        "Almanya Polonya’ya saldırıyor; İngiltere ve Fransa ardından savaş ilan ediyor.",
      chain: ["İşgal", "Savaş ilanları", "Avrupa savaşının başlaması"],
      details: [
        "Saldırı 1 Eylül 1939’da gerçekleşir.",
        "İngiltere ve Fransa 3 Eylül’de savaş ilan eder.",
        "Yerel saldırı geniş savaşın yakın tetikleyicisi olur.",
      ],
      choices: [
        "Yakın başlangıç olayı",
        "1945 barış örgütü",
        "1929 borsa çöküşü",
      ],
      answer: 0,
      limit:
        "Uzun dönem ekonomik-siyasal nedenler bu yakın tetikleyiciden ayrı düzeydedir.",
    },
    {
      name: "Millî Korunma Kanunu",
      date: "1940",
      year: 1940,
      actor: "Türkiye’de hükûmet ve ekonomi",
      kind: "Savaş ekonomisi",
      evidence:
        "Üretim ve ithalat sorunları karşısında ekonomik müdahale yetkileri genişletiliyor.",
      chain: [
        "Seferberlik ve darlık",
        "Ekonomik müdahale",
        "Tedarik hedefi ve yükler",
      ],
      details: [
        "Üretken nüfus ve dış ticaret baskı altındadır.",
        "Devlete üretim ve fiyat düzenleme yetkisi verilir.",
        "Hedef ve gerçek uygulama sonucu ayrı ölçülür.",
      ],
      choices: [
        "Türkiye hiç etkilenmedi",
        "Bütün fiyatlar kesin düştü",
        "Dolaylı ekonomik etkiler",
      ],
      answer: 2,
      limit:
        "Kanunun çıkması bütün sorunların çözüldüğü veya herkesin refahının arttığı kanıtı değildir.",
    },
    {
      name: "Pearl Harbor",
      date: "7 Aralık 1941",
      year: 1941,
      actor: "Japonya ve ABD",
      kind: "Savaşın genişlemesi",
      evidence: "Japonya Pearl Harbor’a saldırıyor; ABD savaşa giriyor.",
      chain: [
        "Pasifik saldırısı",
        "ABD’nin katılımı",
        "Savaşın ölçeği genişler",
      ],
      details: [
        "Saldırı Pasifik’teki Amerikan üssüne yöneliktir.",
        "ABD savaşa girer.",
        "Coğrafya ve üretim kapasitesi dengesi değişir.",
      ],
      choices: [
        "Avrupa savaşının 1939 başlangıcı",
        "ABD’nin savaşa girişi",
        "Bütün çatışmaların bitmesi",
      ],
      answer: 1,
      limit: "Pearl Harbor 1939 başlangıcını 1941’e taşımaz.",
    },
    {
      name: "Adana ve Kahire görüşmeleri",
      date: "1943",
      year: 1943,
      actor: "Türkiye ve Müttefik temsilciler",
      kind: "Diplomatik görüşmeler",
      evidence:
        "Türkiye’ye savaşa katılma talepleri iletiliyor; askerî hazırlık koşulları görüşülüyor.",
      chain: [
        "Katılım talebi",
        "Diplomatik görüşme",
        "Fiilî çatışmadan uzak kalma",
      ],
      details: [
        "Müttefikler yeni cephe arayışındadır.",
        "Türkiye askerî yeterlilik ve zaman konusunu öne sürer.",
        "Görüşme otomatik cephe katılımı oluşturmaz.",
      ],
      choices: [
        "Görüşme ile muharebe ayrıdır",
        "Türkiye Pearl Harbor’ı yaptı",
        "Görüşme 1945 BM Şartıdır",
      ],
      answer: 0,
      limit:
        "Diplomatik temasın tarihi tek başına askerî harekâtın gerçekleştiğini göstermez.",
    },
    {
      name: "Türkiye’nin savaş ilanı",
      date: "23 Şubat 1945",
      year: 1945,
      actor: "TBMM ve Türkiye hükûmeti",
      kind: "Hukuki-siyasi ilan",
      evidence:
        "Türkiye Almanya ve Japonya’ya savaş ilan ediyor; fiilî muharebeye katılmıyor.",
      chain: ["Uluslararası ortam", "Savaş ilanı", "BM kurucu üyelik süreci"],
      details: [
        "Savaşın sonuna doğru yeni örgüt hazırlıkları vardır.",
        "23 Şubat 1945’te hukuki-siyasi ilan yapılır.",
        "Türkiye kurucu üyeler arasında yer alır.",
      ],
      choices: [
        "Hiç savaş ilan edilmedi",
        "İlan ile fiilî muharebe farklıdır",
        "1939’da Polonya işgal edildi",
      ],
      answer: 1,
      limit:
        "İlan 1945’teki gerçektir; fiilî cephe savaşı yapıldığı anlamına gelmez.",
    },
    {
      name: "BM’nin kuruluşu",
      date: "24 Ekim 1945",
      year: 1945,
      actor: "Birleşmiş Milletler kurucu üyeleri",
      kind: "Uluslararası örgüt",
      evidence:
        "San Francisco’da hazırlanan Şart yürürlüğe giriyor; yeni barış örgütü kuruluyor.",
      chain: [
        "Savaş sonrası güvenlik",
        "Şart ve kurum tasarımı",
        "Yeni uluslararası örgüt",
      ],
      details: [
        "Savaşın yıkımı yeni ortak güvenlik arayışını güçlendirir.",
        "Genel Kurul ve Güvenlik Konseyi farklı yetkilerle düzenlenir.",
        "Şartın yürürlüğüyle örgüt resmen kurulur.",
      ],
      choices: [
        "Bütün üyeler her yerde veto eder",
        "1920 Cemiyeti aynı kurumdur",
        "Birleşmiş Milletler",
      ],
      answer: 2,
      limit:
        "Beş daimi üyenin vetosu bütün üyelerin bütün organlardaki yetkisi değildir.",
    },
  ],
};
export function history012State(id: string, rawEvent: number, rawStep: number) {
  const rows = history012Events[id];
  if (!rows) return null;
  const bounded = (n: number, max: number) =>
    Number.isFinite(n) ? Math.min(max, Math.max(0, Math.trunc(n))) : 0;
  const index = bounded(rawEvent, rows.length - 1),
    step = bounded(rawStep, 2);
  return {
    index,
    step,
    event: rows[index],
    revealed: rows[index].chain.slice(0, step + 1),
  };
}
