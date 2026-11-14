import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";

const source =
  "OGM Materyal Tarih 10 konu özetleri: Fetih ve Fatih; II. Bayezid ve Cem Sultan; Gücünün Zirvesinde Osmanlı; 1520–1595 siyasi gelişmeleri; Kapitülasyon Siyaseti; Stratejik Rakipler; Dünya Gücü Hâline Gelme; Karaların ve Denizlerin Hâkimi; Hint Deniz Seferleri (her biri s. 1). Aurelia Dünya Gücü Osmanlı kopya kağıdı s. 2–10 ile karşılaştırılmış özgün öğretim. Aşağıdaki sorular özgündür; resmî ÖSYM soruları değildir.";

export const worldPowerOttomanGuide: LessonGuide = {
  id: "dunya-gucu-osmanli",
  minutes: 65,
  objectives: [
    "1453–1595 olaylarını dönem, rakip, coğrafya ve sonuçla birlikte açıklamak.",
    "İstanbul’un fethinde neden, hazırlık, süreç ve sonuç ayrımını kurmak.",
    "Doğu, batı ve deniz siyasetini tek zafer listesi yerine ilişkili amaçlar üzerinden karşılaştırmak.",
    "Antlaşma, ticari ayrıcalık ve askerî harekâtın farklı işlevlerini kanıtla açıklamak.",
    "Kuşatmayı fetih, üstünlüğü rakipsizlik, bir yenilgiyi bütün gücün sonu sayan çıkarımları düzeltmek.",
  ],
  sections: [
    {
      title: "Dünya gücü ne demek? Önce ölçeği kur",
      paragraphs: [
        "1453–1595 dönemindeki Osmanlı’yı anlamak için yalnız toprakların büyümesini izlemek yetmez. Bir devletin farklı bölgelerdeki ticaret yollarını, askerî dengeleri ve diplomatik ilişkileri etkileyebilmesi dünya gücünün önemli göstergeleridir. İstanbul’un başkent olması, Orta Avrupa’daki kara harekâtları, Safevilerle doğu rekabeti ve Akdeniz’deki donanma aynı dönemin birbirini etkileyen parçalarıdır. Buradaki ‘dünya’, bugünkü anlamıyla her kıtada eşit denetim veya bütün ülkeleri yönetmek demek değildir.",
        "Her olay için dört soruyu sırayla sor: Ne zaman oldu? Hangi rakiple ve hangi coğrafyada gerçekleşti? Amaç neydi? Gerçekte hangi sonuç elde edildi? Amaç ile sonuç aynı olmayabilir: Viyana kuşatıldı, fakat alınamadı; Hint Okyanusu’nda Portekiz etkisi sınırlandırılmak istendi, fakat Portekiz bütünüyle uzaklaştırılamadı. Etkileşimli zaman çizelgesinde bir dönüm noktasını seç, sonra verilen kanıtın taşıyabildiği yorumu bul. Bu keşif öğrenme puanı veya konu tamamlama kaydı oluşturmaz.",
      ],
    },
    {
      title: "1453: İstanbul neden hedeflendi, nasıl hazırlandı?",
      paragraphs: [
        "Bizans’ın başkenti İstanbul, Osmanlı’nın Anadolu ve Rumeli toprakları arasında stratejik bir konumdaydı. Şehrin alınması iki yakadaki hareket ve güvenliği güçlendirebilir, önemli kara ve deniz geçişleri üzerinde denetim sağlayabilirdi. Bizans’ın Osmanlı iç mücadelelerinde ve dış ittifaklarda rol oynayabilmesi de siyasi bir sorundu. Bu nedenle fetih hedefini tek başına zenginlik, dinî düşünce veya bir hükümdarın kişisel isteğiyle açıklamak eksik kalır; siyasi, askerî, ekonomik ve sembolik amaçlar birlikte değerlendirilir.",
        "II. Mehmet, Rumeli Hisarı’nı yaptırarak Boğaz’dan gelecek yardımı sınırlamaya çalıştı; toplar, donanma ve kara ordusu kuşatma için hazırlandı. Diplomatik düzenlemeler ve çevredeki kuvvetlerin hareketleri, şehre dış destek gelmesini engelleme amacını taşıyordu. Gemilerin Haliç’e indirilmesi ve surlara farklı yönlerden baskı uygulanması kuşatma sürecine aittir. Hisarın yapılması ‘hazırlık’, şehrin 29 Mayıs 1453’te alınması ‘olay’, Doğu Roma’nın sona ermesi ‘sonuç’tur. Bir soruda bunları yer değiştirerek okumamak gerekir.",
      ],
    },
    {
      title: "Fetih bir şehirden fazlasını değiştirdi",
      paragraphs: [
        "İstanbul’un fethiyle Doğu Roma İmparatorluğu sona erdi ve şehir Osmanlı başkenti oldu. Anadolu–Rumeli bağlantısının güçlenmesi, merkezî yönetimin konumu ve geçiş yolları üzerindeki denetim birlikte değişti. II. Mehmet’in ‘Kayser-i Rum’ unvanı Roma siyasi mirasına sahip çıkma iddiasını, kara ve deniz hâkimiyetini vurgulayan unvanlar ise geniş egemenlik tasavvurunu anlatır. Unvan bir siyasi iddianın kanıtıdır; tek başına dünya üzerindeki bütün kara ve denizlerin gerçekten ele geçirildiğini göstermez.",
        "Yeni başkentin yaşaması için iskân, imar, eğitim, ticaret ve dinî kurumlar da gerekliydi. Fethedilen şehrin nüfus ve üretiminin canlandırılması, yalnız askerî başarıyla kalıcı düzen kurulamayacağını gösterir. Ortodoks Patrikhanesi’nin devamı, farklı toplulukların yönetimi ve Avrupa’daki dinî ayrılıklar dış siyasetin de parçalarıydı. Fetih sonrasında bilim ve sanatın gelişmesi veya Avrupa’daki değişimler anlatılırken uzun süreçler tek bir güne indirgenmez: Rönesans’ın, merkezî krallıkların ve coğrafi keşiflerin birden çok nedeni vardır.",
      ],
    },
    {
      title: "Fatih’ten II. Bayezid’e: kara, deniz ve iç istikrar",
      paragraphs: [
        "Fatih döneminde Balkanlar, Karadeniz, Ege ve Anadolu’ya yönelik siyaset yeni başkentin güvenliğiyle bağlantılıydı. Trabzon’un 1461’de alınması Karadeniz kıyısındaki siyasi yapıyı değiştirdi; 1473 Otlukbeli zaferi Akkoyunlu rekabetinde Osmanlı üstünlüğünü güçlendirdi. Venedik ve Ceneviz gibi denizci aktörlerle ilişkiler bazen savaş, bazen ticari ayrıcalık ve antlaşma biçimindeydi. Aynı devletle ticaret yapılması, siyasi rekabetin hiç bulunmadığı anlamına gelmez.",
        "1481’de Fatih’in ölümü üzerine II. Bayezid ile Cem Sultan arasında taht mücadelesi yaşandı. Cem’in önce Memlûklere, daha sonra Rodos Şövalyeleri ve Avrupa’daki güçlere sığınması, içeride başlayan soruna dış aktörlerin müdahale edebilmesini sağladı. Bu süreç Osmanlı dış siyasetindeki hareket serbestisini daraltan bir baskı aracına dönüştü. ‘İç sorun dış sorun oldu’ demek, Avrupa devletlerinin Osmanlı tahtını fiilen ele geçirdiği demek değildir; hanedan mensubunu diplomatik baskı için kullanabilmeleri demektir.",
      ],
    },
    {
      title: "I. Selim: doğu ve güneyi aynı rakip sanma",
      paragraphs: [
        "Safevi Devleti ile Osmanlı arasındaki rekabet; Doğu Anadolu’da siyasi nüfuz, ticaret yolları, sınır güvenliği ve mezhebî etkilerle ilişkiliydi. Mezhep boyutu önemlidir, fakat rekabeti yalnız inanç farklılığına indirgemek iktidar ve coğrafya boyutunu siler. 1514 Çaldıran Muharebesi’nde I. Selim’in ordusu Şah İsmail’in kuvvetlerini yendi. Bu zafer Safevi baskısını geriletti ve Osmanlı’nın doğudaki konumunu güçlendirdi; Safevi Devleti ortadan kalkmadı. 1515 Turnadağ’da Dulkadiroğulları hâkimiyetinin sona ermesi Anadolu’daki siyasi birlik açısından önemli bir adımdı.",
        "1516 Mercidabık ve 1517 Ridaniye ise Safevilere değil Memlûklere karşı yapıldı. Kuzeyden güneye ilerleyişi düşün: Mercidabık Suriye’ye, Ridaniye Mısır’a uzanan sürecin ayırt edici olaylarıdır. Memlûk Devleti sona erdi; Suriye, Filistin, Mısır ve Hicaz’la ilişkili yeni bir hâkimiyet alanı oluştu. Kutsal yerlerle ve ticaret güzergâhlarıyla kurulan ilişki Osmanlı’nın İslam dünyasındaki nüfuzunu artırdı. Hilafetin devrine dair sonraki anlatıları tek bir kesin tören ayrıntısı gibi ezberlemek yerine, bu ünitede açık siyasi sonuçları ve kaynakta verilen kanıtı esas al.",
      ],
      table: {
        headers: ["Tarih ve olay", "Rakip", "Ayırt edici sonuç"],
        rows: [
          [
            "1514 · Çaldıran",
            "Safevi",
            "Doğudaki rekabette üstünlük; rakip devlet sürer.",
          ],
          [
            "1515 · Turnadağ",
            "Dulkadiroğulları",
            "Anadolu siyasi birliğini güçlendiren adım.",
          ],
          ["1516 · Mercidabık", "Memlûk", "Suriye’ye uzanan hâkimiyet."],
          [
            "1517 · Ridaniye",
            "Memlûk",
            "Mısır’ın alınması; Memlûk Devleti’nin sonu.",
          ],
        ],
      },
    },
    {
      title: "Kanuni’nin batı siyaseti: üs, savaş, kuşatma, antlaşma",
      paragraphs: [
        "Kanuni Sultan Süleyman döneminde Belgrad’ın 1521’de alınması Orta Avrupa seferleri için stratejik bir dayanak sağladı. Üs; ikmal, geçiş, askerî hareket ve sonraki harekâtın güvenliğiyle ilişkilidir. 1522’de Rodos’un alınması ise Doğu Akdeniz’deki deniz yolları bakımından önemlidir. 1526 Mohaç Meydan Muharebesi Macar Krallığı’nın siyasi düzenini değiştirdi; Macar tahtı üzerindeki mücadele Osmanlı ile Habsburgları karşı karşıya getirdi. Bunlar tek bir fetih değil, farklı işlevli olaylardır.",
        "1529 I. Viyana Kuşatması şehrin alınmasıyla sonuçlanmadı. Sefer mevsimi, ikmal, kuşatma hazırlığı ve savunma gibi etkenler askerî hedefin sonucunu etkiler; ‘güçlü devlet her harekâtta kazanır’ düşüncesi tarihsel değildir. 1533 İstanbul Antlaşması batıdaki rekabetin diplomatik boyutunu gösterir; dönemin protokolünde Avusturya arşidükünün Osmanlı sadrazamına denk kabul edilmesi Osmanlı siyasi üstünlüğünün bir göstergesidir. Bu protokol, bütün Habsburg topraklarının Osmanlı’ya katıldığı veya rekabetin sonsuza dek bittiği anlamına gelmez.",
      ],
    },
    {
      title: "Kanuni’nin doğu siyaseti: harekâttan Amasya’ya",
      paragraphs: [
        "Kanuni döneminde Safevilerle mücadele devam etti. Irakeyn Seferi sırasında Bağdat’ın 1534’te alınması, yalnız bir şehir kazanımı değil Irak ve Basra yönündeki siyasi ve ticari bağlantılar açısından da önem taşıdı. Batıda Habsburglarla, doğuda Safevilerle ilişkiler birbirinden kopuk değildi: bir cephedeki savaş veya barış diğer cepheye ayrılabilecek zaman ve kaynağı etkileyebilirdi. Bu ilişki, her savaşın aynı anda ve aynı nedenle yapıldığını göstermez.",
        "1555 Amasya Antlaşması Osmanlı ile Safeviler arasındaki ilk resmî antlaşma olarak öğrenilir. Antlaşma doğudaki ilişkileri bir süre düzenledi; askerî rekabetin diplomasiye de dönüşebildiğini gösterdi. 1533 İstanbul Antlaşması ile karıştırmamak için yılın yanına rakibi yaz: İstanbul–Habsburg, Amasya–Safevi. 1590 Ferhat Paşa Antlaşması ise daha sonraki Osmanlı–Safevi savaşlarının sonucudur; Amasya’dan önceye veya Kanuni’nin hükümdarlık dönemine yerleştirilmez.",
      ],
    },
    {
      title: "Akdeniz’de güç: deniz zaferi ile kalıcı denetim arasındaki bağ",
      paragraphs: [
        "Akdeniz siyaseti donanma, liman, ada, ikmal ve diplomasiyle birlikte yürütüldü. Barbaros Hayrettin Paşa’nın Osmanlı hizmetine girmesi, Kuzey Afrika’daki bağlantılar ve 1538 Preveze Deniz Savaşı deniz gücünün yükselişinde önemlidir. Preveze, Osmanlı donanmasının Haçlı donanmasına karşı kazandığı zaferdir. Trablusgarp’ın 1551’de alınması ve 1560 Cerbe zaferi bu geniş deniz siyasetinin başka halkalarıdır. ‘Akdeniz’de üstünlük’ ifadesi, rakip limanların ve donanmaların yok olduğu anlamına gelmez.",
        "1571’de Kıbrıs’ın Venedik’ten alınması Doğu Akdeniz’deki konumu güçlendirdi. Aynı yıl İnebahtı’nda Osmanlı donanması ağır yenilgiye uğradı. Bir yıl içinde hem toprak kazanımı hem büyük deniz kaybı yaşanabildiğini görmek, tek yönlü başarı anlatısını önler. Donanmanın yeniden kurulması ve 1574’te Tunus’un alınması deniz mücadelesinin sürdüğünü gösterir; yeniden gemi yapmak yetişmiş denizci kaybını ve ekonomik maliyeti önemsizleştirmez. Kıbrıs ve İnebahtı’nın ikisi de 1571’dedir diye aynı sonuçla etiketlenemez.",
      ],
    },
    {
      title: "Hint Deniz Seferleri: hedefi ve erişilen sonucu ayrı oku",
      paragraphs: [
        "Portekiz’in Ümit Burnu üzerinden Hint Okyanusu’na ulaşması, ticaret ve deniz gücü rekabetini genişletti. Osmanlı; Kızıldeniz, Basra Körfezi ve Hint Okyanusu bağlantılarında eski ticaret yollarını korumak, kutsal yerlere yönelik tehdidi sınırlamak ve Portekiz’e karşı yardım isteyen bölgesel güçlerle ilişki kurmak istedi. Mısır’daki Süveyş ve Basra çevresindeki denizcilik altyapısı bu siyasetin dayanaklarıydı. Buradaki rakip Portekiz’dir; Akdeniz’deki her rakibi otomatik olarak Hint Okyanusu’na taşımamak gerekir.",
        "Hadım Süleyman Paşa, Piri Reis, Murat Reis ve Seydi Ali Reis’in seferleri aynı genel mücadele içinde değerlendirilir. Açık deniz koşulları, farklı gemi türleri, uzak mesafe, ikmal ve yerel destek sorunları hedeflere ulaşmayı sınırladı. Portekizliler bütünüyle bölgeden çıkarılamadı; buna karşılık Osmanlı’nın Kızıldeniz ve Basra çevresindeki konumu ile rekabetin sürmesi de önemlidir. ‘Tam başarı yok’ ile ‘hiç etki yok’ aynı yargı değildir. Sonuç sorularında başarıyı belirtilen hedef ve bölgeye göre tart.",
      ],
    },
    {
      title: "Stratejik rakipler ve ittifaklar: aynı dinden olmak yetmez",
      paragraphs: [
        "Habsburg hanedanının Orta Avrupa’daki ve İspanya’daki gücü, Osmanlı’yla farklı bölgelerde karşılaşmasına yol açtı. Venedik deniz ticareti ve adalar; Safeviler doğu nüfuzu ve sınırlar; Portekiz Hint Okyanusu bağlantıları açısından önemli rakiplerdi. Bu aktörleri yalnız ‘doğu’ veya ‘batı’ kutularına ayırmak yerine çıkarlarını öğren: Hangi geçit, liman, ticaret veya siyasi bağlılık üzerinde etkili olmak istiyorlardı? Aynı aktör bir yerde ticaret ortağı, başka bir yerde askerî rakip olabilir.",
        "Fransa’nın Habsburglarla rekabeti, Osmanlı–Fransız yakınlaşmasına zemin hazırladı. Avrupa’daki Katolik–Protestan ayrılığı ve devletler arası çıkar çatışmaları, birleşik bir Osmanlı karşıtı cephe kurulmasını zorlaştırabiliyordu. Osmanlı bu ayrılıkları diplomatik denge için değerlendirdi. Bu durum dinin siyaset üzerinde etkisiz olduğunu değil, dinî bağların yanında hanedan çıkarı, ticaret ve güvenlik hesabının da belirleyici olabildiğini gösterir. İttifakın varlığından tam siyasi birlik veya bütün politikaların ortaklaşması çıkarılamaz.",
      ],
    },
    {
      title: "Kapitülasyonlar ve değişen ticaret dünyası",
      paragraphs: [
        "Kapitülasyon, belirli yabancı topluluklara ticari ve hukuki kolaylıklar tanınmasıdır. Erken dönemdeki amaçları arasında limanlara ticaret çekmek, gümrük gelirini artırmak ve rakiplere karşı diplomatik ortak kazanmak bulunur. Fransa’yla yakınlaşmayı bu çerçevede değerlendir. 1530’lardaki görüşmeler, daha sonraki resmî düzenlemeler ve yenilemeler aynı tarihsel işlemin tek anı gibi sunulmamalıdır; ayrıcalıkların kapsamı ve sürekliliği zamanla değişti. Sonraki yüzyılların ekonomik zararını, ilk verilişin tek amacı gibi geriye taşımak anakronizmdir.",
        "Coğrafi keşiflerde ticaret yolu arayışı, denizcilik bilgisi ve gemi teknolojisi, hükümdar desteği, değerli maden ve yayılma isteği birlikte etkiliydi. Atlantik güzergâhlarının güçlenmesi Akdeniz’in göreli konumunu etkiledi, fakat Akdeniz ticareti bir anda bütünüyle bitmedi. Yeni kıtalardaki sömürgeleştirme ve kaynak aktarımı Avrupa’da sermaye ve güç dengelerini değiştirdi. ‘İstanbul fethedildi, ertesi gün bütün ticaret sona erdi’ biçimindeki tek nedenli açıklama hem süreçleri hem devam eden ticareti gözden kaçırır.",
      ],
    },
    {
      title: "1566–1595: büyük gücü sürdürmenin koşulları",
      paragraphs: [
        "Kanuni, 1566 Zigetvar Seferi sırasında öldü. Sonraki II. Selim ve III. Murat dönemlerinde kara ve deniz siyaseti devam etti; bu yüzden üniteyi yalnız Kanuni’nin hayatıyla sınırlamak doğru değildir. Kıbrıs’ın alınması, İnebahtı yenilgisi ve Tunus’un fethi Kanuni sonrasındadır. Büyük bir donanmayı yeniden kurmak, uzak kaleleri beslemek ve birden çok cephede asker bulundurmak insan, para, malzeme ve örgütlenme gerektirir. Toprak kazanımı ile bu kazanımı sürdürebilme kapasitesi birbirine bağlı, fakat ayrı sorulardır.",
        "Doğuda yeniden başlayan Osmanlı–Safevi savaşlarının ardından 1590 Ferhat Paşa Antlaşması imzalandı. Antlaşmayla doğuda geniş kazanımlar elde edilmesi, 1555 Amasya barışının sonsuza dek sürmediğini gösterir. Batıda Habsburg rekabeti ve denizde başka güçlerle mücadele de devam ediyordu. 1595 bu ünitenin dönem sınırıdır; bütün rekabetin o tarihte sona erdiği bir çizgi değildir. Tarih aralığına bir olayı yerleştirirken hükümdarı ve olayın sonucunu birlikte kontrol et; dönem adları tek başına kesintisiz yükseliş veya çöküş hükmü vermez.",
      ],
    },
    {
      title: "Olay listesinden gerekçeli yoruma geç",
      paragraphs: [
        "Kronoloji bir başlangıç aracıdır: 1453 İstanbul; 1514 Çaldıran; 1516–1517 Mercidabık–Ridaniye; 1521 Belgrad; 1526 Mohaç; 1529 Viyana; 1538 Preveze; 1555 Amasya; 1571 Kıbrıs ve İnebahtı; 1590 Ferhat Paşa. Sonra her birini işlevine bağla: fetih, meydan savaşı, kuşatma, deniz savaşı veya antlaşma. Aynı çizgide yan yana bulunmaları, her olayın hemen sonraki olayın tek nedeni olduğu anlamına gelmez. Tarih şeridi sıra gösterir; nedensellik ayrıca açıklama ve kanıt ister.",
        "Soru çözerken önce kökün ‘ulaşılabilir’ mi ‘ulaşılamaz’ mı olduğunu belirle. Sonra kanıtı, iddiayı ve iddianın sınırını karşılaştır. ‘Bütün, tamamen, hiç’ gibi kapsam bildiren sözcükler tek başına yanlışlık işareti değildir; fakat tüm kapsamı destekleyen kanıt gerekir. Bir zaferden rakipsizlik, bir kuşatmadan fetih, bir antlaşmadan sonsuz barış sonucu çıkarmak için eldeki bilgi yetmez. Son kontrolde aynı yüzyıldan yakın bir karşı örnek düşün: Preveze sonrası İnebahtı; Çaldıran sonrası Safevilerle Amasya Antlaşması, aşırı genellemeleri sınırlar.",
      ],
    },
  ],
  examples: [
    {
      title: "Hisar, fetih ve unvanı doğru kutuya koy",
      prompt:
        "Bir araştırma kartında Rumeli Hisarı’nın yapılması, İstanbul’un 29 Mayıs 1453’te alınması ve II. Mehmet’in Kayser-i Rum unvanını kullanması yazıyor. Bunları hazırlık–olay–siyasi sonuç bakımından nasıl ayırırsın?",
      strategy: "Önce zamansal konumu, sonra her bilginin işlevini belirle.",
      steps: [
        {
          label: "Hazırlığı bul",
          explanation:
            "Rumeli Hisarı fetih öncesinde Boğaz’dan yardımı sınırlamak için yapıldı; sonucun kendisi değildir.",
        },
        {
          label: "Olayı tarihine bağla",
          explanation:
            "29 Mayıs 1453, kuşatmanın şehrin alınmasıyla sonuçlandığı tarihtir.",
        },
        {
          label: "Sembolü siyasi anlama çevir",
          explanation:
            "Kayser-i Rum, fethedilen Roma başkentiyle bağlantılı siyasi miras iddiasını anlatır.",
        },
      ],
      answer:
        "Hisar hazırlık; İstanbul’un alınması olay; Roma mirası iddiası siyasi ve sembolik sonuçtur.",
      check:
        "Unvanın açıklaması yalnız bir deniz zaferiyle değil Roma başkentinin fethiyle uyumludur.",
      pitfall:
        "Unvanın kara ve deniz vurgusunu bütün dünyaya fiilen sahip olmak sanmak.",
    },
    {
      title: "Aynı hükümdar, iki farklı rakip",
      prompt:
        "1514’te Safevi kuvvetleri yeniliyor; 1516’da Suriye yolu açılıyor; 1517’de Mısır alınıp Memlûk Devleti sona eriyor. ‘Bu üç savaş Safevi Devleti’ni yıktı’ yorumunu nasıl düzeltirsin?",
      strategy: "Her yılın yanına rakibi ve sonucun kapsamını yaz.",
      steps: [
        {
          label: "1514’ü ayır",
          explanation:
            "Çaldıran’ın rakibi Safevilerdir. Yenilgi, bu devletin ortadan kalkması değildir.",
        },
        {
          label: "1516–1517’yi eşleştir",
          explanation:
            "Mercidabık ve Ridaniye Memlûklere karşıdır; Suriye’den Mısır’a ilerleyen süreci gösterir.",
        },
        {
          label: "Sona eren devleti belirle",
          explanation:
            "Ridaniye sonrası sona eren devlet Memlûk Devleti’dir. Safevilerle mücadele sonraki dönemde de sürer.",
        },
      ],
      answer:
        "Çaldıran Safevileri geriletti; Mercidabık–Ridaniye süreci Memlûk Devleti’ni sona erdirdi.",
      check:
        "1555’te Safevilerle Amasya Antlaşması yapılabilmesi, Safevi Devleti’nin 1514’te yok olmadığını doğrular.",
      pitfall:
        "Üç olay da I. Selim dönemindedir diye rakip ve sonuçlarını özdeşleştirmek.",
    },
    {
      title: "Üs kazanımı ile hedefin alınmasını ayır",
      prompt:
        "Belgrad 1521’de alınıyor, Mohaç 1526’da kazanılıyor; Viyana 1529’da kuşatılıyor ama alınamıyor. Osmanlı’nın batıdaki gücü hakkında hangi yorum savunulabilir?",
      strategy: "Başarı göstergelerini ve erişilemeyen hedefi birlikte kullan.",
      steps: [
        {
          label: "Üssün işlevini açıkla",
          explanation:
            "Belgrad sonraki seferler için geçiş ve ikmal kolaylığı sağlar.",
        },
        {
          label: "Savaşın etkisini ayır",
          explanation:
            "Mohaç Macaristan’daki siyasi dengeyi değiştirip Habsburg rekabetini artırır.",
        },
        {
          label: "Sınırı koru",
          explanation:
            "Viyana’nın alınamaması, batıdaki etkili güç olma durumu ile her hedefe ulaşma iddiasının farklı olduğunu gösterir.",
        },
      ],
      answer:
        "Osmanlı Orta Avrupa’da etkili askerî ve siyasi güçtür; bütün bölgeyi ele geçirdiği söylenemez.",
      check:
        "Kuşatma kelimesini fetih diye değiştirmeden sonucun tamamını kullanabildin mi?",
      pitfall:
        "Bir kuşatmanın gerçekleşmesini şehrin Osmanlı toprağı olduğuna kanıt saymak.",
    },
    {
      title: "1571’de iki olay, iki ayrı sonuç",
      prompt:
        "Kıbrıs 1571’de Venedik’ten alınıyor. Aynı yıl İnebahtı’nda donanma ağır kayıp veriyor; daha sonra yeniden kuruluyor ve 1574’te Tunus alınıyor. ‘Deniz gücü 1571’de tamamen bitti’ yargısını değerlendir.",
      strategy: "Kısa vadeli kaybı inkâr etmeden sonraki devam kanıtını oku.",
      steps: [
        {
          label: "Sonuçları karıştırma",
          explanation:
            "Kıbrıs toprak kazanımıdır; İnebahtı büyük deniz yenilgisidir.",
        },
        {
          label: "Devam kanıtını bul",
          explanation:
            "Donanmanın yeniden kurulması ve sonraki harekât deniz siyasetinin sürmesini gösterir.",
        },
        {
          label: "Maliyeti unutma",
          explanation:
            "Yeniden inşa, yetişmiş personel ve gemi kayıplarını önemsiz yapmaz. Gücün sürmesi kayıp yaşanmadığı demek değildir.",
        },
      ],
      answer:
        "Ağır yenilgi yaşandı; fakat deniz gücünün ve mücadelesinin tamamen sona erdiği çıkarılamaz.",
      check: "Yorum hem yenilgiyi hem sonraki yeniden inşayı açıklıyor.",
      pitfall:
        "Devam ettiğini görünce yenilgiyi önemsiz saymak veya yenilgiyi görünce bütün sonraki faaliyetleri yok saymak.",
    },
    {
      title: "Ticari ayrıcalıkta amaç ve uzun vadeli etki",
      prompt:
        "Bir Osmanlı yönetimi belirli yabancı tüccarlara kolaylık tanırken liman ticaretini artırmayı ve Habsburg karşısında ortak bulmayı hedefliyor. Sonraki yüzyıllarda benzer ayrıcalıkların ekonomik bağımlılığı artırdığı biliniyor. İlk uygulamanın amacı nasıl değerlendirilir?",
      strategy:
        "Olayın kendi zamanındaki amaçla daha sonraki güç dengesindeki sonucu ayır.",
      steps: [
        {
          label: "Doğrudan kanıtı çıkar",
          explanation:
            "Ticaret artışı ekonomik; Habsburg karşısında ortaklık siyasi amaçtır.",
        },
        {
          label: "Zamanı denetle",
          explanation:
            "Sonraki yüzyıllardaki ekonomik etki, ilk kararın tek amacı veya zorunlu nedeni değildir.",
        },
        {
          label: "Aşırı sonuca gitme",
          explanation:
            "Bu bilgiler ayrıcalıkların her dönemde aynı koşulla ve aynı yararla verildiğini de kanıtlamaz.",
        },
      ],
      answer:
        "Kapitülasyonlar bu bağlamda ekonomik canlandırma ve siyasi denge aracı olarak kullanılmıştır.",
      check: "Her iddia için aynı döneme ait bir kanıt cümlesi bulunuyor mu?",
      pitfall:
        "Daha sonraki Sanayi Devrimi şartlarını 16. yüzyıldaki kararın hazır nedeni saymak.",
    },
  ],
  recall: [
    {
      prompt:
        "İstanbul’un fethi için bir hazırlık, bir siyasi ve bir şehircilik sonucu söyle.",
      answer:
        "Rumeli Hisarı’nın yapılması hazırlıktır. Doğu Roma’nın sona ermesi ve yeni başkent siyasi sonuçtur. İskân, imar ve eğitim kurumlarıyla şehir hayatının canlandırılması kalıcı düzenin şehircilik boyutudur.",
    },
    {
      prompt: "Çaldıran–Mercidabık–Ridaniye sırasını rakip ve sonuçla açıkla.",
      answer:
        "1514 Çaldıran: Safevi, rakip devleti sona erdirmeyen zafer. 1516 Mercidabık: Memlûk, Suriye yönü. 1517 Ridaniye: Memlûk, Mısır’ın alınması ve devletin sona ermesi.",
    },
    {
      prompt:
        "1533 İstanbul ile 1555 Amasya antlaşmalarını hangi ipucuyla ayırırsın?",
      answer:
        "Rakip: İstanbul batıda Habsburg/Avusturya; Amasya doğuda Safevi. Antlaşma askerî muharebeden farklı olarak ilişkileri diplomatik biçimde düzenler.",
    },
    {
      prompt:
        "Preveze, İnebahtı ve Hint Deniz Seferleri için neden tek bir ‘deniz zaferleri’ etiketi kullanılamaz?",
      answer:
        "1538 Preveze Akdeniz’de zafer; 1571 İnebahtı ağır yenilgi; Hint Deniz Seferleri Portekiz’i bütünüyle uzaklaştıramayan fakat Kızıldeniz/Basra rekabetini sürdüren çok aşamalı mücadeledir.",
    },
    {
      prompt:
        "Fransa’yla yakınlaşma ve kapitülasyonlarda hangi iki amacı birlikte ararsın?",
      answer:
        "Habsburg karşısında diplomatik denge/ortaklık ve ticareti canlandırma. Sonraki ekonomik etkiler başlangıç amacıyla özdeşleştirilmez.",
    },
  ],
  source,
};

export interface OttomanTurningPoint {
  year: number;
  label: string;
  title: string;
  area: "Başkent" | "Doğu" | "Güney" | "Batı" | "Deniz";
  actor: string;
  goal: string;
  outcome: string;
  limit: string;
  evidence: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export const worldPowerTurningPoints: OttomanTurningPoint[] = [
  {
    year: 1453,
    label: "İstanbul’un fethi",
    title: "İstanbul: hazırlıktan siyasi dönüşüme",
    area: "Başkent",
    actor: "II. Mehmet · Bizans",
    goal: "Anadolu–Rumeli bağlantısını ve yeni başkent üzerindeki egemenliği güçlendirmek.",
    outcome:
      "Doğu Roma sona erdi; İstanbul başkent oldu. Roma mirası iddiası yeni siyasi sembollerle ifade edildi.",
    limit:
      "Roma mirası iddiası bütün eski Roma topraklarının fiilen ele geçirildiği anlamına gelmez.",
    evidence:
      "Rumeli Hisarı kuşatma öncesinde yapıldı. İstanbul alındıktan sonra II. Mehmet, Roma siyasi mirasını vurgulayan Kayser-i Rum unvanını kullandı.",
    choices: [
      "Hisar bir sonuç, unvan ise kuşatma hazırlığıdır.",
      "Hisar hazırlık; unvan fethin siyasi ve sembolik sonucudur.",
      "Unvan bütün Roma topraklarının aynı yıl alındığını kanıtlar.",
    ],
    answer: 1,
    explanation:
      "Hisar olaydan önce ve kuşatmayı kolaylaştırmak için vardır; unvan olaydan sonra siyasi miras iddiasını anlatır. İddia ile fiilî toprak denetimi aynı şey değildir.",
  },
  {
    year: 1514,
    label: "Çaldıran",
    title: "Çaldıran: zafer ile devletin sonunu ayır",
    area: "Doğu",
    actor: "I. Selim · Safevi Devleti",
    goal: "Doğu Anadolu’daki nüfuz ve güvenlik sorunlarında Safevi baskısını geriletmek.",
    outcome:
      "Osmanlı ordusu Safevi kuvvetlerini yendi; doğudaki konumu güçlendi.",
    limit:
      "Safevi Devleti sona ermedi; sonraki dönemde de siyasi ve askerî rakipti.",
    evidence:
      "Osmanlı 1514’te Safevi ordusunu yendi. 1555’te Osmanlı ile Safevi Devleti arasında Amasya Antlaşması imzalandı.",
    choices: [
      "1514 zaferi Safevi Devleti’ni sona erdirmemiştir.",
      "1555 Antlaşması 1514 zaferinden önce yapılmıştır.",
      "Çaldıran Memlûk Devleti’ni sona erdirmiştir.",
    ],
    answer: 0,
    explanation:
      "1555’te antlaşmanın tarafı olabilen Safevi Devleti 1514’te ortadan kalkmış olamaz. Muharebe yenilgisi ile devletin sona ermesi ayrı sonuçlardır.",
  },
  {
    year: 1517,
    label: "Ridaniye",
    title: "Ridaniye: Mısır’a uzanan sonuç",
    area: "Güney",
    actor: "I. Selim · Memlûk Devleti",
    goal: "Güneydeki rakiple mücadele ederek Mısır ve çevresinde hâkimiyet kurmak.",
    outcome:
      "Mısır alındı; Memlûk Devleti sona erdi. Ticaret güzergâhları ve İslam dünyasındaki nüfuz bakımından yeni bir konum oluştu.",
    limit:
      "Bu sonuç Safevi Devleti’nin sona erdiği anlamına gelmez; doğudaki rakip farklıdır.",
    evidence:
      "1516 Mercidabık sonrası Suriye’ye ilerleyen Osmanlı, 1517 Ridaniye sonrasında Mısır’da hâkimiyet kurdu ve Memlûk Devleti sona erdi.",
    choices: [
      "Suriye ve Mısır olayları farklı hükümdarların birbirinden ilgisiz savaşlarıdır.",
      "Ridaniye Safevilerle yapılan ilk antlaşmadır.",
      "Aynı rakibe karşı kuzeyden güneye ilerleyen bir askerî süreç vardır.",
    ],
    answer: 2,
    explanation:
      "Mercidabık–Ridaniye sırası Suriye’den Mısır’a uzanır; iki olayda rakip Memlûk Devleti’dir. Tarih, coğrafya ve aktör birlikte uyuşur.",
  },
  {
    year: 1529,
    label: "Viyana Kuşatması",
    title: "Viyana: kuşatma fetih demek değildir",
    area: "Batı",
    actor: "Kanuni Sultan Süleyman · Habsburglar",
    goal: "Macaristan’daki Osmanlı etkisini ve batıdaki siyasi konumu güçlendirmek.",
    outcome: "Viyana kuşatıldı; şehir alınamadı.",
    limit: "Kuşatma yapılması şehrin Osmanlı toprağına katıldığını göstermez.",
    evidence:
      "Osmanlı 1521’de Belgrad’ı aldı, 1526’da Mohaç’ı kazandı. 1529 Viyana Kuşatması ise şehrin alınmasıyla sonuçlanmadı.",
    choices: [
      "Belgrad bir üs olsa da her sonraki hedef mutlaka alınmaz.",
      "Viyana 1529’da fethedilmiştir.",
      "Mohaç Akdeniz’de kazanılan bir deniz savaşıdır.",
    ],
    answer: 0,
    explanation:
      "Belgrad geçiş ve ikmal için avantaj sağladı; bu avantaj Viyana’nın alındığı anlamına gelmez. Bir aşamadaki başarı sonraki sonucun garantisi değildir.",
  },
  {
    year: 1538,
    label: "Preveze",
    title: "Preveze: deniz üstünlüğünün kapsamı",
    area: "Deniz",
    actor: "Barbaros Hayrettin Paşa · Haçlı donanması",
    goal: "Akdeniz’de Osmanlı deniz gücünü ve hareket serbestisini güçlendirmek.",
    outcome:
      "Osmanlı donanması deniz zaferi kazandı; Akdeniz’deki üstünlüğü güçlendi.",
    limit: "Bütün denizlerde kalıcı, rakipsiz egemenlik kurulmuş değildir.",
    evidence:
      "Preveze’de Osmanlı donanması 1538’de zafer kazandı. Venedik ve İspanya gibi denizci rakiplerle mücadele sonraki yıllarda sürdü.",
    choices: [
      "Zaferle birlikte dünyadaki bütün rakip donanmalar yok oldu.",
      "Zafer önemliydi; sonraki rekabet üstünlüğün sınırsız olmadığını gösterir.",
      "Preveze Osmanlı–Safevi barış antlaşmasıdır.",
    ],
    answer: 1,
    explanation:
      "Kanıt hem zaferi hem devam eden rakipleri içerir. Akdeniz’de üstünlüğü ‘bütün denizlerde rakipsizlik’ diye genişletmek desteklenmez.",
  },
  {
    year: 1555,
    label: "Amasya Antlaşması",
    title: "Amasya: doğu rekabetinin diplomatik düzeni",
    area: "Doğu",
    actor: "Kanuni Sultan Süleyman · Safevi Devleti",
    goal: "Doğudaki ilişkileri antlaşmayla düzenlemek.",
    outcome:
      "Osmanlı–Safevi ilk resmî antlaşması imzalandı; bir süre barış sağlandı.",
    limit: "Antlaşma bütün sonraki Osmanlı–Safevi savaşlarını önlemedi.",
    evidence:
      "Osmanlı ile Safeviler 1555’te Amasya Antlaşması’nı yaptı; daha sonraki savaşların ardından 1590’da Ferhat Paşa Antlaşması imzalandı.",
    choices: [
      "Amasya’dan sonra iki devlet arasında sonsuza dek savaş olmamıştır.",
      "Amasya batıda Avusturya’yla yapılmıştır.",
      "Diplomatik düzenleme yapılmış, fakat rekabet bütünüyle sona ermemiştir.",
    ],
    answer: 2,
    explanation:
      "Sonraki savaş ve antlaşma, 1555 düzenlemesini kalıcı rakipsizlik diye okumayı engeller. Amasya’nın rakibi Safevilerdir.",
  },
  {
    year: 1571,
    label: "İnebahtı",
    title: "İnebahtı: yenilgi ve yeniden inşa",
    area: "Deniz",
    actor: "II. Selim dönemi · Haçlı donanması",
    goal: "Akdeniz’de Osmanlı donanmasının ve deniz siyasetinin devamını sağlamak.",
    outcome:
      "Osmanlı donanması ağır yenilgiye uğradı. Sonraki yeniden inşa ve 1574 Tunus harekâtı deniz mücadelesinin sürdüğünü gösterir.",
    limit:
      "Yeniden inşa kayıpları önemsiz yapmaz; yenilgi de deniz gücünün tamamen bittiğini göstermez.",
    evidence:
      "1571 İnebahtı’nda Osmanlı donanması ağır kayıp verdi. Donanma yeniden kuruldu; 1574’te Tunus Osmanlı yönetimine girdi.",
    choices: [
      "1571’den sonra hiçbir Osmanlı deniz faaliyeti gerçekleşmedi.",
      "Donanma ağır kayıp aldı; yeniden kurulması deniz mücadelesinin sürdüğünü gösterir.",
      "Donanmanın yeniden kurulması 1571’de kayıp olmadığını kanıtlar.",
    ],
    answer: 1,
    explanation:
      "İlk cümle ağır kaybı, sonraki gelişmeler devamı gösterir. İkisini birlikte açıklayan yorum gerekir; yenilgi veya yeniden inşa silinemez.",
  },
];

const q = (
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  hint: string,
  explanation: string,
  skill: string,
  passage?: string,
) => ({
  id,
  prompt: txt(prompt),
  options: options.map(txt),
  answer,
  hint: txt(hint),
  explanation: txt(explanation),
  skill,
  ...(passage ? { passage: txt(passage) } : {}),
});

export const worldPowerOttomanLesson: Lesson = {
  id: worldPowerOttomanGuide.id,
  subjectId: "tyt-tarih",
  title: txt("Dünya Gücü Osmanlı"),
  minutes: worldPowerOttomanGuide.minutes,
  objectives: worldPowerOttomanGuide.objectives.map(txt),
  body: worldPowerOttomanGuide.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  source: txt(source),
  tags: [
    "detail-236",
    "Osmanlı",
    "1453–1595",
    "kronoloji",
    "kanıt",
    "dünya gücü",
  ],
  questions: [
    q(
      "dgo-1",
      "Bu gelişmelerin hazırlık–olay–siyasi sonuç sırası hangi seçenekte doğru verilmiştir?",
      [
        "Kayser-i Rum unvanı – Rumeli Hisarı – İstanbul’un alınması",
        "İstanbul’un alınması – Kayser-i Rum unvanı – Rumeli Hisarı",
        "Rumeli Hisarı – İstanbul’un alınması – Kayser-i Rum unvanı",
        "Rumeli Hisarı – Kayser-i Rum unvanı – İstanbul’un alınması",
        "İstanbul’un alınması – Rumeli Hisarı – Kayser-i Rum unvanı",
      ],
      2,
      "Fetihten önce ne yapıldığını ve Roma mirası iddiasının hangi olaydan sonra anlam kazandığını düşün.",
      "Rumeli Hisarı kuşatma öncesi hazırlıktır. Şehrin alınması olaydır. Kayser-i Rum unvanı ise Roma başkentinin fethinden sonraki siyasi miras iddiasını gösterir.",
      "neden-süreç-sonuç",
      "II. Mehmet İstanbul kuşatması öncesinde Rumeli Hisarı’nı yaptırdı. 29 Mayıs 1453’te İstanbul alındı. Fetih sonrasında kullandığı Kayser-i Rum unvanı Roma siyasi mirasına sahip çıkma iddiasını yansıttı.",
    ),
    q(
      "dgo-2",
      "Cem Sultan olayının bir iç sorunken dış siyasetin konusu hâline geldiğini en doğrudan hangi gelişme gösterir?",
      [
        "Taht mücadelesinin bir hanedan içinde başlaması",
        "Avrupa güçlerinin Cem’i Osmanlı’ya karşı baskı aracı olarak kullanabilmesi",
        "İstanbul’un başkent olarak kalması",
        "Fatih’in ölümünden sonra II. Bayezid’in tahta çıkması",
        "Osmanlı’da kara ordusunun bulunması",
      ],
      1,
      "Dış aktörlerin soruna müdahale etmesini gösteren seçeneği ara.",
      "Cem’in Osmanlı dışındaki güçlerin elinde diplomatik baskı aracına dönüşmesi, iç hanedan mücadelesinin devletler arası ilişkilere taşındığının doğrudan göstergesidir. Diğer bilgiler dış müdahaleyi kanıtlamaz.",
      "iç-dış-siyaset",
    ),
    q(
      "dgo-3",
      "1514 Çaldıran Muharebesi ile 1517 Ridaniye Muharebesi için doğru rakip–sonuç eşleştirmesi hangisidir?",
      [
        "Çaldıran: Memlûk, devlet sona erdi; Ridaniye: Safevi, devlet sona erdi.",
        "Çaldıran: Habsburg, Viyana alındı; Ridaniye: Venedik, Kıbrıs alındı.",
        "Çaldıran: Safevi, devlet sona erdi; Ridaniye: Memlûk, rekabet aynı devletle devam etti.",
        "Çaldıran: Safevi, rakip devlet sona ermedi; Ridaniye: Memlûk, devlet sona erdi.",
        "Çaldıran: Portekiz, okyanus denetimi kuruldu; Ridaniye: Safevi, Amasya imzalandı.",
      ],
      3,
      "Bir muharebede yenilgi, devletin mutlaka ortadan kalkması demek değildir.",
      "Çaldıran Safevilere karşı kazanıldı, ancak Safevi Devleti devam etti. Ridaniye Memlûklere karşıdır; Mısır’ın alınması ve Memlûk Devleti’nin sona ermesiyle ilişkilidir.",
      "rakip-sonuç",
    ),
    q(
      "dgo-4",
      "Bu bilgilere dayanarak hangi yargıya ulaşılabilir?",
      [
        "Orta Avrupa’daki bütün şehirler 1529’da Osmanlı’ya katılmıştır.",
        "Bir stratejik üssün alınması sonraki bütün kuşatmaların başarıyla sonuçlanmasını sağlar.",
        "Mohaç Akdeniz’deki deniz üstünlüğünü sağlamıştır.",
        "Viyana’nın alınamaması Belgrad’ın daha önce alınmadığını gösterir.",
        "Osmanlı Orta Avrupa’da etkili olmuş, ancak her askerî hedefine ulaşamamıştır.",
      ],
      4,
      "Üç olayı da açıklayan, kuşatmayı fetih saymayan yorumu seç.",
      "Belgrad ve Mohaç batıdaki askerî etkiyi gösterir; Viyana’nın alınamaması bütün hedeflere ulaşıldığı iddiasını sınırlar. Bir üs harekâtı kolaylaştırır, sonucu garanti etmez.",
      "stratejik-üs-ve-sınır",
      "Osmanlı Belgrad’ı 1521’de alarak Orta Avrupa harekâtı için bir üs kazandı. 1526 Mohaç zaferi Macaristan’daki siyasi dengeyi değiştirdi. 1529 Viyana Kuşatması şehrin alınmasıyla sonuçlanmadı.",
    ),
    q(
      "dgo-5",
      "1555 Amasya Antlaşması’nın tarafı ve ayırt edici niteliği hangi seçenekte doğrudur?",
      [
        "Safevi Devleti – Osmanlı ile yapılan ilk resmî antlaşma",
        "Avusturya – Viyana’nın Osmanlı’ya bırakılması",
        "Venedik – Kıbrıs’ın Osmanlı’ya bırakılması",
        "Memlûk Devleti – Mısır’da devletin yeniden kurulması",
        "Portekiz – Hint Okyanusu’ndan bütünüyle çekilme",
      ],
      0,
      "Amasya doğu cephesiyle ilgilidir; 1533 İstanbul Antlaşması’yla karıştırma.",
      "Amasya 1555’te Osmanlı–Safevi ilişkilerini düzenleyen ilk resmî antlaşmadır. Avusturya/Habsburg ilişkileriyle ilgili 1533 İstanbul Antlaşması farklıdır; Amasya sonsuz barış garantisi de değildir.",
      "antlaşma-aktör",
    ),
    q(
      "dgo-6",
      "Bu gelişmeler birlikte değerlendirildiğinde hangi yorum en uygundur?",
      [
        "İnebahtı’ndan sonra Osmanlı’nın bütün deniz faaliyetleri sona ermiştir.",
        "Kıbrıs’ın alınması İnebahtı’nda da zafer kazanıldığını gösterir.",
        "Büyük bir donanma kaybına rağmen Osmanlı’nın deniz siyaseti devam etmiştir.",
        "Yeniden inşa yapıldığına göre İnebahtı’nda maddi kayıp olmamıştır.",
        "Tunus 1574’te alındığı için Kıbrıs 1571’de kaybedilmiştir.",
      ],
      2,
      "Yorum hem yenilgiyi hem sonraki deniz harekâtını birlikte açıklamalı.",
      "İnebahtı ağır bir deniz yenilgisidir. Yeniden kurulan donanma ve Tunus harekâtı deniz siyasetinin sürdüğünü gösterir. Devam eden güç, kayıpların yaşanmadığı veya önemsiz olduğu anlamına gelmez.",
      "kayıp-ve-devam",
      "Osmanlı 1571’de Kıbrıs’ı Venedik’ten aldı. Aynı yıl İnebahtı’nda donanması ağır yenilgiye uğradı. Donanma yeniden kuruldu ve 1574’te Tunus Osmanlı yönetimine girdi.",
    ),
    q(
      "dgo-7",
      "Bu parçada ticari ayrıcalıkların hangi iki amaçla kullanıldığı belirtilmektedir?",
      [
        "Roma mirasını üstlenmek ve Viyana’yı doğrudan yönetmek",
        "Doğu sınırlarını kaldırmak ve bütün vergileri sona erdirmek",
        "Denizciliği bırakmak ve iç pazarı kapatmak",
        "Ticareti canlandırmak ve Habsburg karşısında siyasi denge kurmak",
        "Avrupa’daki bütün devletleri tek yönetimde birleştirmek ve rekabeti bitirmek",
      ],
      3,
      "Tüccar ve gümrük bilgisiyle ortak arayışının hangi alanlara ait olduğunu ayır.",
      "Tüccarları limanlara çekmek ve gümrük geliri sağlamak ekonomik; Habsburg karşısında ortak kazanmak siyasi amaçtır. Bu iki kanıt ayrıcalıkların bu bağlamdaki işlevini açıklar.",
      "kapitülasyon-amaç",
      "16. yüzyılda Osmanlı yönetimi, bazı yabancı tüccarlara ticari ve hukuki kolaylıklar tanıyarak limanlara ticaret çekmeyi ve gümrük gelirini artırmayı amaçladı. Fransa’yla yakınlaşmasında Habsburg karşısında diplomatik ortak arayışı da etkili oldu.",
    ),
    q(
      "dgo-8",
      "Osmanlı’nın Hint Deniz Seferleri hakkında aşağıdaki değerlendirmelerden hangisi doğrudur?",
      [
        "Temel rakip Safevilerdir ve bütün seferler Hazar Denizi’nde yapılmıştır.",
        "Portekiz bölgeden bütünüyle çıkarılamamış; buna karşılık Kızıldeniz ve Basra çevresindeki mücadele sürmüştür.",
        "Bütün seferler dünya denizlerinde kalıcı ve rakipsiz Osmanlı egemenliği kurmuştur.",
        "Seferlerin ticaret yolları ve bölgesel yardım talepleriyle hiçbir ilişkisi yoktur.",
        "Osmanlı bölgeye donanma göndermeden yalnız kara savaşları yapmıştır.",
      ],
      1,
      "Hedeflenen sonuçla gerçekleşen sonucun aynı olup olmadığını kontrol et.",
      "Hint Deniz Seferleri Portekiz’le rekabet, ticaret yolları ve bölgesel destek amaçlarıyla ilişkilidir. Portekiz bütünüyle uzaklaştırılamadı; ancak Osmanlı’nın Kızıldeniz ve Basra çevresindeki etkisi ve mücadele devam etti.",
      "hedef-sonuç",
    ),
    q(
      "dgo-9",
      "Bu bilgilerden hangisi çıkarılamaz?",
      [
        "Osmanlı kara ve deniz gücünü farklı bölgelerde kullanmıştır.",
        "Diplomasi, askerî harekâtın yanında bir dış siyaset aracı olmuştur.",
        "Doğudaki ve batıdaki rakipler aynı değildir.",
        "Osmanlı farklı siyasi dengeleri etkilemiştir.",
        "Osmanlı’ya karşı koyabilecek bütün devletler ortadan kalkmıştır.",
      ],
      4,
      "Üç olay geniş etkiyi gösterir; bütün rakiplerin yok olduğuna ilişkin kanıt aramalısın.",
      "Mohaç batıdaki kara gücünü; Preveze Akdeniz donanmasını; Amasya doğudaki diplomatik düzenlemeyi gösterir. Bu örnekler bütün devletlerin veya rakiplerin ortadan kalktığını kanıtlamaz.",
      "kanıt-kapsam",
      "Osmanlı 1526 Mohaç zaferiyle Macaristan’daki siyasi dengeyi etkiledi. 1538 Preveze’de Haçlı donanmasına karşı zafer kazandı. 1555 Amasya Antlaşması’yla Safevilerle ilişkilerini düzenledi.",
    ),
    q(
      "dgo-10",
      "Coğrafi keşifler ve Osmanlı ticareti hakkında en uygun değerlendirme hangisidir?",
      [
        "Yeni deniz yolları ticaretin göreli ağırlığını değiştirmiş; Akdeniz ticareti bütünüyle sona ermemiştir.",
        "Keşiflerin tek nedeni 1453’te bütün dünya ticaretinin durmasıdır.",
        "Yeni deniz yollarının devletler arası güç ve gelir dengelerine etkisi olmamıştır.",
        "Denizcilik teknolojisi ve hükümdar desteği keşiflerde rol oynamamıştır.",
        "Atlantik ticaretinin artması Akdeniz’de tek bir geminin bile kalmadığını kanıtlar.",
      ],
      0,
      "Bir güzergâhın göreli öneminin azalmasıyla tamamen ortadan kalkmasını ayır.",
      "Coğrafi keşiflerin teknolojik, ekonomik ve siyasi birden çok nedeni vardır. Atlantik güzergâhları güçlenirken Akdeniz ticareti devam etti; göreli ağırlık değişimi mutlak sona eriş değildir.",
      "çok-nedenli-süreç",
    ),
  ],
};
