import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
type SourceGuide024 = LessonGuide & { title: string; detail: string };
const sourceGuides024: SourceGuide024[] = [
  {
    id: "dunya-ve-ahiret",
    title: "Dünya ve ahiret: anlam, evreler ve uğurlama",
    detail: "detail-90",
    minutes: 110,
    objectives: [
      "Dünya hayatındaki sorumlulukla ahiret inancı arasındaki ilişkiyi dinî öğretinin kendi çerçevesinde açıkla.",
      "Berzah, kıyamet, ba’s, haşir, mahşer, hesap ve mizanı fiil, yer ve evre bakımından ayır.",
      "Cenazeye ilişkin hakları, hazırlık işlemlerini ve yakınlara desteği birbirine karıştırmadan tanı.",
      "Bakara 153–157’deki sabır, yardım isteme ve dönüş bilincini metnin sınırlarıyla yorumla.",
    ],
    source:
      "MEB onaylı 11. sınıf DKAB Dünya ve Ahiret ünitesi, bağlı okul özeti ve ilgili Aurelia kağıdı karşılaştırılarak hazırlanan özgün öğretim. Özgün alıştırmalar resmî sınav sorusu değildir.",
    sections: [
      {
        title: "Hayatın anlamını sormak",
        paragraphs: [
          "İnsan kendisi, hayatın amacı ve ölüm sonrası hakkında sorular sorabilir. İslam öğretisi insanı akıl ve irade sahibi, yaptıklarından sorumlu bir varlık olarak ele alır. Yaratılışın amaçlı oluşu, kulluk ve yararlı iş yapma bu anlam çerçevesinin parçalarıdır.",
          "Bu dinî çerçeveyi öğrenirken insanların değerini inancından çıkaran bir ölçüm yapılmaz. Bir metnin ne öğrettiğini açıklamakla bütün insanların nasıl davrandığına ilişkin deneysel bir yasa ileri sürmek farklıdır. Önce soruda öğretinin mi yoksa somut davranışın mı istendiğini belirle.",
        ],
      },
      {
        title: "Dünya hayatının işlevi",
        paragraphs: [
          "Dünya hayatı İslam inancında geçici olmakla birlikte seçim, çalışma ve sorumluluk alanıdır. İbadet, dürüst emek, hak gözetme ve yardım bu hayatın içinde gerçekleşir. Mülk 2’de hayat ve ölüm, güzel davranış bakımından sınanmayla ilişkilendirilir.",
          "Geçici olanın değersiz olduğu sonucu çıkmaz. Bir işin ne kadar sürdüğü ile hangi hakkı koruduğu aynı ölçüt değildir. Dünya-ahiret dengesi günlük sorumluluğu ertelemek yerine yapılanın anlamını ve sonucunu düşünmeyi öğretir.",
        ],
      },
      {
        title: "Ahiret: geniş üst kavram",
        paragraphs: [
          "Ahiret, İslam inancında ölüm sonrası hayatın bütününe verilen addır. Yeniden diriliş, toplanma, hesap ve karşılık bu geniş çerçevede anlatılır. Ahireti yalnız tek bir olayın başka adı saymak, kavramın kapsamını daraltır.",
          "Bir soru belirli fiili soruyorsa geniş üst başlık her zaman yeterli cevap olmaz. Örneğin yeniden dirilme ba’s, diriltilenlerin toplanması haşirdir. Üst kavramla onun içinde anlatılan evre arasındaki ilişkiyi bir bütün-parça ilişkisi olarak düşün.",
        ],
      },
      {
        title: "Bilginin kaynağı ve türü",
        paragraphs: [
          "Ünitedeki ahiret bilgisi Kur’an ve sünnete dayanan dinî öğretim olarak sunulur. Bu alan, gayb yani insanın doğrudan duyusal deneyimini aşan yönlerle ilişkilidir. Dinî anlatının anlamı ile laboratuvarda sınanan doğa açıklamasının kanıt türü aynı değildir.",
          "Mevsimlerin canlanması gibi benzetmeler, öğretide dirilişi düşündürmek için kullanılabilir. Bu benzetmeyi ölüm sonrası hayatın deneyle ölçüldüğü iddiasına dönüştürme. Soru dinî bir mesaj istiyorsa mesajı, bilimsel bir ölçüm istiyorsa gerçekten verilen veriyi kullan.",
        ],
      },
      {
        title: "Ölüm ve vefat",
        paragraphs: [
          "Ölüm dünya hayatının sona ermesi, vefat ise ölüm için kullanılan ifadelerdendir. İslam öğretisi ölümü mutlak yok oluş olarak görmez; ölüm sonrası hayatın başlangıcıyla ilişkilendirir. Ecel, kişinin dünya hayatının sonunu anlatan ilgili kavramdır.",
          "Ölümlülüğü bilmek her insanın hiç korku veya üzüntü yaşamayacağını göstermez. Bir yakını kaybetmek karşısında duygulanmakla dinî inancı anlamak birbirini dışlamaz. Metin yorumu, gerçek kişinin yasına veya ruh hâline not vermek değildir.",
        ],
      },
      {
        title: "Berzahın iki sınırı",
        paragraphs: [
          "Berzah ölümle başlayıp yeniden dirilişe kadar süren ara dönemdir. Kabir hayatı ifadesiyle de anılır. Buradaki kabir, öğretinin dönem adıdır; bedenin mutlaka toprağa gömülmüş olması bu dönemin başlaması için tanımda aranan koşul değildir.",
          "Evreyi tanımak için iki sınırı yaz: ölüm gerçekleşmiş, ba’s henüz gerçekleşmemiştir. Toplanma veya hesap anlatılmaya başlanmışsa aynı ara dönemden söz etmiyorsundur. Yalnız kelime benzerliği yerine olayların hangi tarafında bulunulduğunu denetle.",
        ],
      },
      {
        title: "Kıyametin kullanımları",
        paragraphs: [
          "Kıyamet dünya düzeninin son bulması ve ölüm sonrası büyük hesap günü bağlamlarında kullanılan geniş bir terimdir. Öğretici evre şemasında özellikle kozmik düzenin bozulması öne çıkarılır; ardından yeniden diriliş anlatılır. Sözcüğün bütün metinlerde yalnız dar bir fiile karşılık geldiği söylenmez.",
          "Bir soruda hangi anlamın kullanıldığını cümlenin fiili belirler. Kıyametin tarihini veya süresini bir şemadan hesaplayamazsın. A’râf 187 bağlamında vaktinin bilgisinin Allah’a ait olduğu öğretilir; çizelgedeki sıra bir takvim değildir.",
        ],
      },
      {
        title: "Ba’s: yeniden dirilme",
        paragraphs: [
          "Ba’s öldükten sonra yeniden diriltilme anlamındadır. Dinî anlatıda İsrafil’in sûra yeniden üflemesiyle ilişkilendirilir. Burada ayırt edici fiil canlanma veya diriltilmedir; insanların bir araya gelmesi ayrı bir eylemdir.",
          "Bir cümle hem dirilme hem toplanma içeriyorsa iki fiili iki ayrı kavramla eşleştir. Sorunun yalnız ilk eylemi istemesi ba’sı öne çıkarır. Sonradan aynı anlatıda hesap verilmesi, önceki her fiilin hesapla eş anlamlı olduğunu göstermez.",
        ],
      },
      {
        title: "Haşir ve mahşer",
        paragraphs: [
          "Haşir yeniden diriltilenlerin hesap için bir araya getirilmesi; mahşer ise bu toplanmanın yeridir. İki kelime aynı kökle ilişkili olsa da aynı soruya cevap vermez. Ne oldu sorusu eylemi, nerede sorusu yeri arar.",
          "Yer adı geçen bir cümlede eylemin de bulunması mümkündür. Yalnız mahşer sözcüğünü ezberlemek yerine toplanma fiilini ve toplanılan yeri ayrı göster. Böylece bir anlatım iki bilgiyi birlikte verdiğinde birini silmeden çözebilirsin.",
        ],
      },
      {
        title: "Amel defteri ve hesap",
        paragraphs: [
          "Amel, kişinin iş ve davranışları için kullanılan terimdir. Amel defteri bunların kaydıyla; hesap ise dünyada yapılanların değerlendirilmesi ve sorgulanmasıyla ilişkilidir. Kayıt ile kayda dayanarak değerlendirme aynı işlem değildir.",
          "Bu öğretide hiçbir davranışın önemsiz sayılmaması ve adalet vurgusu bulunur. Uygulamadaki bir tıklama veya doğru cevap dinî anlamda amel defteri hesabı değildir. Soruda kavramların ilişkisi öğretilir; kullanıcıya uhrevi puan verilmez.",
        ],
      },
      {
        title: "Mizan ve adalet",
        paragraphs: [
          "Mizan ahiret anlatısında amellerin tartılması ve değerlendirilmesiyle ilgili kavramdır. Kaynak bunun mahiyetini insanın bütünüyle ölçebileceği fiziksel bir terazi gibi açıklamaz. Enbiyâ 47 bağlamında haksızlık yapılmaması vurgulanır.",
          "Şemadaki kutulara sayı koymak gerçek bir kişinin nihai sonucunu hesaplamaya yetmez. Hesap sorgulama boyutunu, mizan tartı ve değerlendirme imgesini öne çıkarır. İlişkili kavramların farklı vurgularını korumak yakın seçenekleri ayırır.",
        ],
      },
      {
        title: "Cennet ve cehennem",
        paragraphs: [
          "Cennet İslam öğretisinde nimet ve mükâfat yurdu; cehennem ise ceza ve karşılık bağlamında anlatılır. Bunlar ahiret düşüncesinin sonuç kavramlarıdır. Cennet tasvirlerinde Allah’ın rızası da nimetlerin üstünde bir değer olarak vurgulanır.",
          "Bir tek davranıştan gerçek kişinin kesin ahiret sonucunu ilan edemezsin. Kavramın tanımını öğrenmekle birinin bütün koşullarını ve ilahî hükmü bilmek aynı şey değildir. Soru bir metni yorumlatıyorsa verilen öğretim çerçevesinde kal.",
        ],
      },
      {
        title: "Ahiret inancı ve davranış",
        paragraphs: [
          "Hesap vereceğine inanma, dinî öğretide insanı dürüstlük, adalet ve hak gözetmeye yönelten bir gerekçe olarak ele alınır. Kişinin kendini sorgulaması nefis muhasebesiyle ilişkilidir. Yaptığının sonucunu düşünmek günlük hayatta da sorumluluk taşımayı destekler.",
          "Bu ilişki, inanan herkesin her zaman hatasız davrandığını veya başka inançtaki insanların ahlaksız olduğunu kanıtlamaz. Normatif öğüt ile bütün insanlar hakkında ölçülmüş davranış sonucu ayrı tutulur. Bir kişinin beyanını kendi eylem verisiyle birlikte değerlendir.",
        ],
      },
      {
        title: "Vasiyet ve borç: farklı haklar",
        paragraphs: [
          "Vasiyet kişinin ölümünden sonra yerine getirilmesini istediği meşru taleplerle; borç ise başkalarına karşı mevcut yükümlülüklerle ilgilidir. Vefat sonrası işlemlerde hakların gözetilmesi öğretilir. Bunları kefenleme veya başsağlığı dileme gibi başka görevlerle karıştırma.",
          "Borcu gözetme ilkesi bütün mirasçıların koşulsuz kendi malından ödeme yapması gerektiği şeklinde basitleştirilmez. Borç, vasiyet ve mirasın özel hukuk ayrıntıları bu kavram alıştırmasının konusu değildir. Metnin vermediği oran veya kişisel ödeme yükümlülüğü eklenmez.",
        ],
      },
      {
        title: "Teçhiz ve alt işlemleri",
        paragraphs: [
          "Teçhiz vefat edenin defin için hazırlanması ve uğurlanmasına ilişkin işlemlerin genel adıdır. Gasil yıkama, tekfin kefenleme, teşyî cenazeyi taşıma ve uğurlama, defin toprağa verme anlamlarıyla ayırt edilir. Tekfin bu bütünün yalnız bir parçasıdır.",
          "Soruda yapılan işi nesnesiyle oku: bedenin yıkanması mı, kefene sarılması mı, kabre konulması mı? Aynı cenaze sürecinde bulunmaları bu fiilleri eş anlamlı yapmaz. Üst başlık isteniyorsa teçhiz, özel eylem isteniyorsa onun adı seçilir.",
        ],
      },
      {
        title: "Cenaze namazının niteliği",
        paragraphs: [
          "Cenaze namazı vefat eden Müslüman için topluca dua niteliğindedir. Ayakta kılınır, rükû ve secde içermez. Kaynakta dört tekbirli uygulama anlatılır; ayrıntılı kılınış biçimlerinde fıkhi geleneklerin farklılıkları bulunabilir.",
          "Farz-ı kifaye, gerekli görevin bir kesim tarafından yeterince yerine getirilmesiyle diğer sorumlulardan düşmesini anlatır. Hiç kimse yapmasa da otomatik yapılmış sayılması değildir. Bu toplumsal sorumluluk tanımını kişinin bütün ibadet yükümlülüklerine genelleme.",
        ],
      },
      {
        title: "Taziye ve somut destek",
        paragraphs: [
          "Taziye vefat edenin yakınlarına başsağlığı dileme, acıyı paylaşma ve destek olmaktır. Cenaze evinin işlerine yardım etmek veya aileye yemek götürmek gibi işler, yakınların yükünü hafifletebilir. Taziye yaşayan yakınlara yönelir; kefenleme bedenle ilgili başka işlemdir.",
          "Destek, yas tutan aileyi yeni bir gösteri veya ağır masraf yüküne sokmak anlamına gelmez. Kişinin acısını küçümseyen veya üzüntüyü yasaklayan sözler de tesellinin tanımı değildir. Verilen davranışın kimin ihtiyacını hangi yolla karşıladığına bak.",
        ],
      },
      {
        title: "Dua, hayır ve kalıcı yarar",
        paragraphs: [
          "Ölen kişinin ardından dua etmek ve onun adına hayır yapmak kaynakta yer alan uygulamalardır. Sadaka-i cariye, yararı devam eden hayırla ilişkilidir. Faydalı bilgi bırakma ve hayırlı evladın duası da ölüm sonrası yarar temasında anılır.",
          "Kur’an okuma ve dua geleneklerinin uygulama ayrıntıları farklılaşabilir. Bir uygulamayı anlatmak her tarihte ve her toplulukta bütün ayrıntıların aynı olduğunu söylemek değildir. Öğretim dinî anlamı açıklar; gerçek kişinin sevabını sayısal olarak hesaplamaz.",
        ],
      },
      {
        title: "Hakk’a uğurlama geleneği",
        paragraphs: [
          "Alevi-Bektaşi geleneğinde ölüm Hakk’a yürümek, cenaze uğurlaması Hakk’a Uğurlama Erkânı gibi ifadelerle anılır. Can, dua veya gülbank, helallik ve yakınlara destek bu kültürel-dinî bağlamda yer alabilir. Deyimler dönüş ve kavuşma anlayışını ifade eder.",
          "Kaynağın anlattığı belirli bir erkânı bütün Alevi-Bektaşi topluluklarında değişmez ayrıntılarla uygulanan tek biçim sanma. Gelenek içindeki yerel ve tarihî çeşitliliği koru. Terimi tanımak kişilerin mezhebini veya bütün uygulamalarını tek görünüşten belirlemek değildir.",
        ],
      },
      {
        title: "Bakara 153–157: sabır ve dönüş bilinci",
        paragraphs: [
          "Bu ayet grubunda sabır ve namazla yardım isteme, Allah yolunda öldürülenlere ilişkin dinî değer, korku ve kayıplarla sınanma, Allah’a ait olma ve O’na dönüş bilinci anlatılır. Sabredenlere rahmet ve müjde vurgusu bulunur. Her ayetin kendi temasını ayrı tanı.",
          "Sabır edilmesi korku, açlık, kayıp veya üzüntünün hiç yaşanmayacağı demek değildir. Yardım aramak, tedbir almak ve sorumluluğu sürdürmekle sabır birlikte düşünülebilir. Metin, acı çeken kişiyi suçlamayı veya her sorunun belirli günde çözüleceğini garanti etmeyi gerektirmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Dönem adı mezar adresi değildir",
        prompt:
          "Bir sözlük berzahı ölümle diriliş arasındaki dönem diye tanımlar. Başka bir not, mezar yeri bilinmeyen kişi için bu dönemin başlayamayacağını ileri sürer.\nHangi bilgi notu düzeltir?\nA) Berzahın mutlaka bir şehir adı olduğu. B) Dönemin başlangıç koşulunun ölüm, mezar adresinin ise ayrı bilgi olduğu. C) Dirilişin hiç anılmadığı. D) Her mezarın aynı yerde olduğu. E) Bütün dönemlerin aynı an olduğu.",
        strategy: "Tanımdaki koşulu sonradan eklenen mekân koşulundan ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Sözlüğün başlangıç koşulu ölümdür.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Mezar yerinin bilinmesi ayrıca tanım koşulu yapılmamıştır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "B, dönem adını fiziksel adres şartından ayırır; diğerleri tanımı değiştirir.",
          },
        ],
        answer:
          "B: Dönemin başlangıç koşulunun ölüm, mezar adresinin ise ayrı bilgi olduğu",
        check:
          "Mezar yeri bulunamadığında tanımın ölüm koşulu değişmiş olur mu?",
        pitfall:
          "Kabir hayatı deyimini yalnız fiziksel mezarın varlığına bağlamak.",
      },
      {
        title: "Temsilin nicel sınırı",
        prompt:
          "Bir ders şeması hesap ve mizan kutularını aynı büyüklükte çiziyor. Okur, kutu alanları eşit olduğu için iki kavramın fiziksel sürelerinin de eşit ölçüldüğünü söylüyor.\nBu okuma nasıl düzeltilir?\nA) Kutu boyutu öğretici düzenlemedir; süre ölçümü verilmez. B) Her kutu bir yıl ölçer. C) Eşit kutu her kavramı eş anlamlı yapar. D) Şema bütün kavramları yanlışlar. E) Alan verilince her kişinin sonucu bellidir.",
        strategy: "Şemanın görsel düzenini verilen veri türünden ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Şema kavram ilişkilerini göstermek için çizilmiştir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Kutu alanıyla süre arasında bir ölçek tanımlanmamıştır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "A gerekli ayrımı yapar; diğer seçenekler olmayan ölçü veya hüküm ekler.",
          },
        ],
        answer: "A: Kutu boyutu öğretici düzenlemedir; süre ölçümü verilmez",
        check:
          "Süre hesabı yapmak için hangi ölçek verisinin bulunması gerekirdi?",
        pitfall: "Bir şemadaki eşit görsel alanı eşit gerçek süre sanmak.",
      },
      {
        title: "Teselli cümlesini seç",
        prompt:
          "Yakınını kaybeden Aslı üzgün olduğunu söylüyor. Arkadaşı, sabrı “hiç duygu yaşamamak” diye yorumlayan bir cümle yazmak istiyor. Ders ise sabrın dayanma ve doğru tutumu sürdürme olduğunu belirtiyor.\nHangi cümle daha uygun bir destek olur?\nA) Üzülüyorsan bütün davranışların yanlıştır. B) Hiç konuşmadan her işi tek başına yapmalısın. C) Üzüntünü paylaşırım; bugün hangi işte yardımcı olabileceğimi söyle. D) Sabır bütün kayıpları geçmişten siler. E) Destek istemek sabırla her durumda çelişir.",
        strategy:
          "Öğretinin sabır tanımıyla kişiye yönelen destek sözünü birlikte düşün.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Aslı bir duygu beyanı vermektedir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Ders tanımı duyguyu tümden reddetmez; dayanmayı anlatır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "C duyguyu küçümsemeden destek sunar; diğerleri zorunlu suç veya yalnızlık ekler.",
          },
        ],
        answer:
          "C: Üzüntünü paylaşırım; bugün hangi işte yardımcı olabileceğimi söyle",
        check: "Seçtiğin söz duyguyu yok saymadan somut yardım sunuyor mu?",
        pitfall: "Sabır öğüdünü yas tutanın duygularını susturma aracı yapmak.",
      },
      {
        title: "Yardımın muhatabını belirle",
        prompt:
          "Üç gönüllüden biri cenaze evinin küçük çocuğunu okuldan alıyor, biri ailenin telefon işlerini yürütüyor, biri komşuların yemek planını düzenliyor.\nBu işlerin ortak yönü nedir?\nA) Üçünün de kefenleme olması. B) Üçünün de ahiretteki toplanmayı ölçmesi. C) Üçünün de yalnız kitap okuması. D) Yakınların günlük yükünü hafifletmeleri. E) Üç kişinin aynı tek işi yapması.",
        strategy: "Farklı işlerdeki ortak muhatabı ve ihtiyacı bul.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Fiiller okuldan alma, iletişim ve yemek planıdır.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Hepsi yaşayan ailenin yüküne yönelir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "D ortak desteği korur; yapılan işler tek bir cenaze beden işlemi değildir.",
          },
        ],
        answer: "D: Yakınların günlük yükünü hafifletmeleri",
        check: "Ortak amaç aynı görev yapıldığı anlamına geliyor mu?",
        pitfall:
          "Cenazeyle ilişkili her yardımı yalnız bedene yapılan işlem saymak.",
      },
      {
        title: "Yararın sürmesi bakım ister",
        prompt:
          "Bir aile yakını adına erişilebilir bir çeşme yaptırıyor. Bir süre sonra musluk arızalanıyor; aile bakım yaparak insanların yararlanmasını yeniden sağlıyor.\nSüreklilik yönünden hangi yorum gerekçelidir?\nA) Başlangıçta yapılan iş sonraki durumu hiçbir zaman etkilemez. B) Bakım varsa ilk iş hiç yapılmamıştır. C) Yararın sürmesi gerçek kullanım ve bakım koşullarıyla ilişkilidir. D) Bir arıza bütün geçmiş yararı siler. E) Çeşme yapımı herkesin kişisel sonucunu kesin hesaplar.",
        strategy: "Hayrın adıyla yararın fiilen sürmesini ayrı kontrol et.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Çeşme başlangıçta yarar sağlar.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Arıza kullanımı etkiler; bakım yararı yeniden mümkün kılar.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "C sürekliliğin somut koşulunu açıklar; diğerleri geçmişi siler veya kişisel hüküm ekler.",
          },
        ],
        answer:
          "C: Yararın sürmesi gerçek kullanım ve bakım koşullarıyla ilişkilidir",
        check: "Yararı sürdürmek için fiilen hangi iş yapılmıştır?",
        pitfall:
          "Kalıcı yarar adını kullanınca bakım ihtiyacının yok olduğunu sanmak.",
      },
      {
        title: "Öğüt ve gerçekleşmiş eylem",
        prompt:
          "Bir ders sorumluluğu anlatır. İki öğrenci aynı öğüdü duyar; biri ödünç kitabı zamanında iade eder, diğerinin ne yaptığına ilişkin kayıt yoktur.\nHangi değerlendirme kanıta uygundur?\nA) Öğüdü duyan herkes kitabı iade etmiştir. B) İkinci öğrenci kesin zarar vermiştir. C) Öğüt hiç verilmemiştir. D) İlk öğrencinin iade fiili kayıtlıdır; ikincinin davranışı için ek veri gerekir. E) Kayıt olmayan kişi hiç kitap görmemiştir.",
        strategy: "Sunulan öğretiyle kişilerin gerçekten yaptığı işi ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "İki öğrenci için ortak veri öğüdü duymalarıdır.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "İade fiili yalnız ilk öğrenci için verilmiştir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "D ortak bilgiyi ve farklı eylem kanıtını korur; diğer sonuçlar ek veri uydurur.",
          },
        ],
        answer:
          "D: İlk öğrencinin iade fiili kayıtlıdır; ikincinin davranışı için ek veri gerekir",
        check: "İkinci öğrencinin eylemini belirlemek için ne sorardın?",
        pitfall:
          "Bir öğüdün sunulmasını bütün muhatapların onu uyguladığına kanıt saymak.",
      },
    ],
    recall: [
      {
        prompt: "Berzahın başlangıç ve son sınırı nedir?",
        answer: "Ölüm ve yeniden diriliş.",
      },
      {
        prompt: "Ba’s, haşir ve mahşer nasıl ayrılır?",
        answer: "Diriltilme, toplanma eylemi ve toplanılan yer.",
      },
      {
        prompt: "Teçhiz ve tekfin ilişkisi nedir?",
        answer: "Teçhiz genel hazırlık; tekfin kefenleme alt işlemidir.",
      },
      {
        prompt: "Farz-ı kifayede sorumluluğu düşüren koşul nedir?",
        answer:
          "Gerekli görevin bir kesim tarafından yeterince yerine getirilmesi.",
      },
      {
        prompt: "Taziye kime yönelir?",
        answer:
          "Vefat edenin yaşayan yakınlarına başsağlığı ve destek sunmaya.",
      },
      {
        prompt: "Bakara 153–157 sabrı nasıl bir bağlamda verir?",
        answer:
          "Yardım isteme, kayıp ve sınanma, Allah’a dönüş bilinci ve müjdeyle birlikte.",
      },
    ],
  },
  {
    id: "yahudilik-ve-hristiyanlik",
    title: "Yahudilik ve Hristiyanlık: tarih, metin ve ritüel",
    detail: "detail-91",
    minutes: 125,
    objectives: [
      "İki dinin tarihî odaklarını ve temel inançlarını kendi gelenekleri içinde tanı.",
      "Tanah, Tora, Talmud, Kitab-ı Mukaddes ve Yeni Ahit arasındaki kapsam ilişkilerini açıkla.",
      "Mekân, ritüel, kutsal zaman ve simgeyi ayrı kanıtlarla eşleştir.",
      "Mezhep farklılığını din farkından ayır; tek örnekten bütün mensuplara genelleme yapma.",
    ],
    source:
      "OGM Yahudilik ve Hristiyanlık konu anlatımının 50 sayfası ve ilgili Aurelia kağıdı karşılaştırılarak hazırlanan özgün öğretim. Genellemeler ve kronoloji sorunları aktarılmamıştır; alıştırmalar resmî sınav sorusu değildir.",
    sections: [
      {
        title: "Dinleri karşılaştırmanın ölçütü",
        paragraphs: [
          "Karşılaştırma tarih, inanç, kutsal metin, ritüel, mekân ve simge gibi ayrı boyutlarla yapılır. Aynı sözcük farklı dinlerde veya farklı mezheplerde kullanılabilir. Bu nedenle tek bir genel kelimeden bütün bağlam belirlenmez.",
          "Dinî öğretiyi kendi iç anlamıyla anlatmak, kişinin değerini veya bir inancın doğruluğunu kullanıcı adına ölçmek değildir. Sorular metindeki bilgiyi ve kavram ilişkisini değerlendirir. Bir topluluğun tek örneği bütün üyelerin hayatının aynısı sayılmaz.",
        ],
      },
      {
        title: "Yahudiliğin tarihî kökleri",
        paragraphs: [
          "Yahudi geleneği kökenini İbrahim, İshak ve Yakub’la ilişkili İsrailoğulları anlatısına bağlar; Musa ve ahit geleneği dinî tarihte merkezî yer tutar. Mısır’dan çıkış ve Sina’da ahit anlatıları bu geleneğin kutsal metinlerinde bulunur.",
          "Anlatının hangi geleneğe ait olduğunu belirtmekle bütün ayrıntılarını bağımsız tarih ölçümü gibi kanıtlamak aynı şey değildir. Kaynak bir inanç anlatısını veriyorsa bunu o anlatının kimliğiyle aktar. Güncel bireyin bütün kimliğini eski bir olaydan çıkarma.",
        ],
      },
      {
        title: "İbrani, İsrail, Yahudi ve Musevi",
        paragraphs: [
          "Bu adlar tarih ve din bağlamında ilişkilidir. İsrail adı Yakub ve İsrailoğullarıyla, Musevi adı Musa’yla, Yahudi adı ise Yahuda ve tarihî Yahuda bölgesiyle ilişkilendirilir. Farklı adların işaret ettiği bağlam ve dönem aynı olmayabilir.",
          "Dinî gelenek, etnik aidiyet, dil ve güncel vatandaşlık ayrı kavramlardır. Yahudi sözcüğü geçen bir cümleyi otomatik güncel bir devletin bütün politikalarının beyanı sayma. Soruda tarihî topluluk mu, din mi, kişi mi anlatılıyor önce bunu belirle.",
        ],
      },
      {
        title: "Ahit ve tek Tanrı inancı",
        paragraphs: [
          "Ahit sözleşme veya antlaşma anlamıyla Tanrı ile topluluk arasındaki dinî ilişkiyi ifade eder. Yahudilikte tek Tanrı inancı merkezîdir. Seçilmişlik anlayışı gelenek içinde ahde bağlı sorumluluk ve özel ilişkiyle açıklanır.",
          "Bu öğretinin anlatılması insanların doğuştan ahlaken üstün olduğu veya başka toplulukların haklarının bulunmadığı sonucunu vermez. Aynı din içinde anlayış ve yorum farklılıkları da vardır. Dinî bir terimi güncel kişilere toplu karakter hükmü olarak kullanma.",
        ],
      },
      {
        title: "On Emir: inanç ve davranış",
        paragraphs: [
          "On Emir’de Tanrı’ya bağlılık, putlardan sakınma, kutsal güne saygı ve anne-babaya hürmet gibi vurgular bulunur. Öldürmeme, çalmama, zina etmeme, yalancı tanıklık yapmama ve başkasının malına göz dikmeme de bu çerçevede yer alır.",
          "Listede hem Tanrı’yla ilişki hem insanlarla ilgili ahlaki kurallar vardır. Yalnız ibadet veya yalnız beslenme listesi diye daraltma. Bir soruda verilen emrin hangi davranışı konu ettiğini incele; başka bütün ayrıntıların aynı cümlede bulunduğunu varsayma.",
        ],
      },
      {
        title: "Mabet, sürgün ve diaspora",
        paragraphs: [
          "Kudüs’teki mabet geleneği Davud ve Süleyman dönemi anlatılarıyla ilişkilidir. Mabedin yıkılması, sürgünler ve farklı ülkelere dağılma Yahudi tarihinin önemli süreçlerindendir. Diaspora, bir topluluğun anayurdu dışında dağınık yaşaması için kullanılan kavramdır.",
          "Dağılımın bulunması dinî ve kültürel bağların bütünüyle yok olduğunu göstermez. Aynı biçimde farklı ülkelerde yaşamak her kişinin aynı siyasal veya dinî tercihi taşıdığını kanıtlamaz. Tarihî olay, coğrafi dağılım ve kişisel tutumu ayrı düzeylerde oku.",
        ],
      },
      {
        title: "Tanahın üç ana bölümü",
        paragraphs: [
          "Tanah Yahudi kutsal yazılarının külliyatıdır. Tora, Neviim ve Ketuvim bu bütünün üç ana bölümüdür. Tora öğreti veya yasa, Neviim peygamberler, Ketuvim yazılar anlamıyla tanıtılır. Tanah ile yalnız Tora aynı kapsam değildir.",
          "Bir metin Tanah’ın tamamını istiyorsa ilk bölümü söylemek eksik kalır. Bütün-parça ilişkisini iç içe kutularla düşünebilirsin: Tora Tanah’ın içindedir. Bu ilişki başka bir dine ait bütün kutsal kitapların da aynı sıralama ve kapsamda olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Tora ve beş kitap",
        paragraphs: [
          "Tora, Tevrat adıyla da anılan ilk beş kitapla ilişkilidir: Tekvin, Çıkış, Levililer, Sayılar ve Tesniye. Yahudi ibadet ve hukuk geleneğinde merkezî önemi vardır. Soruda beş kitap veya Musa’yla ilişkili öğreti vurgusu ayırt edici olabilir.",
          "Bir sinagog sahnesi tek başına Tora’dan belirli bölümün okunduğunu kanıtlamaz; okuma eylemi veya eser adı ayrıca verilmelidir. Genel bilgide mümkün olması, kısa pasajda gerçekten anlatılmış olmasıyla aynı değildir. Metinden çıkarım sorusunda bu sınırı koru.",
        ],
      },
      {
        title: "Talmud: yorum ve tartışma",
        paragraphs: [
          "Talmud, Rabbanî Yahudilikte dinî-hukuki yorum ve tartışmaları içeren külliyattır. Mişna ve onun açıklama-tartışma geleneği olan Gemara ile ilişkilidir. Sözlü gelenekle bağlantılı olması günümüzde hiçbir yazılı biçiminin olmadığı demek değildir.",
          "Talmud ile Tora’yı tek kitap adı gibi değiştirme. Birinde kutsal yazıların belirli bölümü, diğerinde yorum ve tartışma birikimi öne çıkar. Aynı geleneğin metinleri arasında ilişki bulunması tanımların özdeş olmasını gerektirmez.",
        ],
      },
      {
        title: "Sinagog, havra ve haham",
        paragraphs: [
          "Sinagog veya havra Yahudi cemaatinin ibadet ve toplanma mekânıdır. Haham, dinî bilgi ve öğretimle ilişkili görev adıdır. Bina, topluluk ve görevli kişi üç ayrı tür bilgidir; biri ötekinin adı değildir.",
          "Bir gezi anlatımında sinagogun yakınından geçmek o kişinin orada ibadet ettiği anlamına gelmez. Yerle kişi arasındaki ilişkiyi fiil gösterir: gördü, ziyaret etti ve ibadet etti farklıdır. Bağlamı açıkça verilen eylemle sınırla.",
        ],
      },
      {
        title: "Şabat: haftalık kutsal zaman",
        paragraphs: [
          "Şabat cuma gün batımından cumartesi gün batımına uzanan kutsal dinlenme ve ibadet zamanıdır. Cumartesiyle ilişkilendirilir; başlangıcı gece yarısı diye öğretilmez. Geleneklere göre uygulama ayrıntıları farklılaşabilir.",
          "Bir kurumun haftalık kutsal zamanı ile yıl içindeki bayramı aynı şey değildir. Şabatı Hristiyanlığın pazar ibadeti veya Noel’le eşleme. Tanım sorusunda zaman aralığını, bağlam sorusunda dinî geleneği birlikte kullan.",
        ],
      },
      {
        title: "Yahudi bayramları",
        paragraphs: [
          "Fısıh Mısır’dan çıkışın, Şavuot Tora’nın verilişinin, Sukkot çölde yaşama hatırasının anılmasıyla ilişkilidir. Roş Haşana yılbaşı, Yom Kippur kefaret ve tövbe günü olarak tanıtılır. Hanuka mabet ve kandil geleneğiyle bağlantılı bayramdır.",
          "Bayramın anılan olayı ile ritüelde kullanılan nesneyi ayır. Bir kandillik görmek bütün bayramların aynı olay olduğu sonucunu vermez. Ayrıntılı tarih veya uygulama biçimi verilmemişse onları kısa metne kendin ekleme.",
        ],
      },
      {
        title: "Kipa ve kaşer",
        paragraphs: [
          "Kipa özellikle geleneksel ibadet bağlamlarında kullanılan baş örtüsü veya takkedir. Kaşer ya da koşer beslenmeye ilişkin dinî uygunluk kavramıdır. Biri giysi, diğeri beslenme ilkelerinin alanıdır.",
          "Bütün Yahudilerin her zaman aynı giysiyi kullandığı veya bütün grupların aynı beslenme uygulamasına sahip olduğu sonucu çıkarılmaz. Kaynakta bir kişinin ne yaptığıyla bütün bir dine ilişkin değişmez kişi tasnifini ayır. Görülen davranış kadar verilmeyen ayrıntıyı da fark et.",
        ],
      },
      {
        title: "Menora ve Davud Yıldızı",
        paragraphs: [
          "Geleneksel menora yedi kollu kandillik veya şamdan simgesidir. Davud Yıldızı altı köşeli yıldız motifi olarak Yahudi kimliğiyle ilişkilidir. Hanuka’da kullanılan dokuz kollu hanukiya, yedi kollu menorayla aynı biçim değildir.",
          "Görseli okurken önce kol mu köşe mi saydığını belirle. Yıldızdaki altı köşeyi kandilliğin kol sayısına taşıma. Bir simgeyi tanımak onu taşıyan her kişinin mezhebini, niyetini veya siyasal görüşünü kesin belirlemek değildir.",
        ],
      },
      {
        title: "Yahudilik içinde çeşitlilik",
        paragraphs: [
          "Ortodoks, Muhafazakâr, Reform ve Yeniden Yapılanmacı gibi farklı Yahudi gelenekleri bulunur. Kutsal metinlerin yorumu, geleneksel kuralların uygulanışı ve modern hayatla ilişki bakımından ayrışabilirler. Bütün mensuplar tek biçimde yaşayacak diye düşünülmez.",
          "Aynı ad başka bir dinde de kullanılabilir; Ortodoks sözcüğü için Yahudi veya Hristiyan bağlamını ayrıca aramak gerekir. Bir mezhebin adını, bütün dinin veya bütün etnik grubun eş anlamlısı yapma. Kimlik ilişkilerini kaynakta verildiği düzeyde koru.",
        ],
      },
      {
        title: "Hristiyanlığın tarihî odağı",
        paragraphs: [
          "Hristiyanlık İsa’nın hayatı ve ona ilişkin inançlar çevresinde gelişmiştir. İlk topluluklar Roma dünyasının Yahudi kültürüyle ilişkili ortamında ortaya çıkmıştır. Havariler, ilk cemaatler ve sonraki kilise örgütlenmeleri dinî tarihin parçalarıdır.",
          "Hristiyanlık öğretisindeki İsa anlayışı ile İslam öğretisindeki peygamber İsa anlayışını aynı beyan gibi aktarma. Hangi geleneğin ne söylediğini belirtmek doğru karşılaştırmanın koşuludur. Tarih, inanç anlatısı ve kişinin kendi kabulü ayrı tutulur.",
        ],
      },
      {
        title: "Pavlus, konsiller ve tarihî gelişim",
        paragraphs: [
          "Pavlus’un öğretileri ve erken toplulukların tartışmaları Hristiyanlığın gelişmesinde etkili olmuştur. Konsiller inanç ve kilise düzenine ilişkin meselelerin görüşüldüğü toplantılardır. Tarihî gelişim tek kişinin bir günde bütün geleneği oluşturmasına indirgenmez.",
          "Bir kronoloji sorusunda olayın tarihi kadar yüzyılın da tutarlı olması gerekir. Bu ünitede tartışmalı ayrıntılardan bir tarih yarışı kurulmaz; ilk topluluk, kurumsallaşma ve mezhepleşme arasındaki ilişki öğretilir. Bir toplantı bütün Hristiyanların her ayrıntıda aynılaşması demek değildir.",
        ],
      },
      {
        title: "Teslis: üç kişide birlik öğretisi",
        paragraphs: [
          "Ana akım Hristiyan öğretisinde teslis, Baba, Oğul ve Kutsal Ruh’la açıklanan tek Tanrı anlayışıdır. Öğreti üç ayrı tanrının var olduğu iddiası olarak sunulmaz. Bu tanım, Hristiyanlığın kendi inanç çerçevesinin açıklamasıdır.",
          "Tek Tanrı sözü iki dini ayırmak için tek başına yeterli olmayabilir. Soruda teslisin üç kişilik açıklaması veriliyorsa daha özel kanıt vardır. Dinî öğretiyi doğru temsil etmek, onu kullanıcının kabul ettiği inanç olarak varsaymak değildir.",
        ],
      },
      {
        title: "İsa, kurtuluş ve asli günah",
        paragraphs: [
          "Birçok Hristiyan gelenekte İsa’nın çarmıha gerilişi, dirilişi ve kurtarıcı rolü merkezîdir. Asli günah öğretisi insanlığın başlangıcına ilişkin günah ve kurtuluş anlayışıyla bağlantılıdır. Ancak bu konuların açıklanışında mezhepler arasında farklılıklar bulunur.",
          "Bir geleneğin öğretisini anlatırken her kişinin aynı cümleleri aynı yorumla benimsediği söylenmez. Özellikle vaftiz, günah ve kurtuluş arasındaki ilişkinin bütün mezheplerde tek ayrıntıyla açıklanması doğru değildir. Soru açık bir gelenek veya tanım veriyorsa onun kapsamını kullan.",
        ],
      },
      {
        title: "Kitab-ı Mukaddesin kapsamı",
        paragraphs: [
          "Hristiyan Kutsal Kitabı Eski Ahit ve Yeni Ahit adlı iki ana bölümden oluşur. Eski Ahit, Yahudi kutsal yazılarıyla önemli ilişki taşır; kitap listesi, sırası ve geleneklere göre kapsam farklılıkları olabilir. İlişki bulunması bütün metin düzenlerinin eksiksiz aynı olduğu anlamına gelmez.",
          "Yeni Ahit Hristiyan metinlerinin ayrı bölümüdür. Bir bütünün iki bölümünü saymak, bölümlerden her birinin bütünle eş anlamlı olduğu sonucunu vermez. Kapsam sorularında önce sorulanın bütün mü alt bölüm mü olduğunu belirle.",
        ],
      },
      {
        title: "Dört İncil ve Yeni Ahit",
        paragraphs: [
          "Matta, Markos, Luka ve Yuhanna adlı dört İncil İsa’nın hayatı ve öğretilerini anlatan metinlerdir. Yeni Ahit bunların yanında Elçilerin İşleri, mektuplar ve Vahiy gibi yazıları da içerir. Dolayısıyla Yeni Ahit yalnız dört İncil’den ibaret değildir.",
          "İncil sözcüğü günlük kullanımda daha geniş anlamlarla da kullanılabilir; bu ünitedeki teknik kapsam açıkça dört anlatıyı ayırır. Bir soruda kullanılan tanım verilmişse ona göre düşün. Sözcüğün farklı kullanımını gerekçe göstererek açık bütün-parça ilişkisini silme.",
        ],
      },
      {
        title: "Kilise ve din görevlileri",
        paragraphs: [
          "Kilise hem Hristiyan ibadet topluluğu hem ibadet binası için kullanılabilir. Rahip, papaz, piskopos, patrik ve papa gibi görev adlarının yetki ve kullanımı geleneğe göre değişir. Papa özellikle Katolik Kilisesiyle ilişkili dinî liderlik adıdır.",
          "Her kilisenin aynı yönetime bağlı olduğu veya her görevlinin aynı yetkiyi taşıdığı söylenmez. Bina adıyla lider unvanını ve mezhep adını ayrı sınıflandır. Böylece belirli bir görevli anıldığında bütün dinin tek merkezle yönetildiği gibi ek bir sonuç kurmazsın.",
        ],
      },
      {
        title: "Vaftiz ve evharistiya",
        paragraphs: [
          "Vaftiz suyla ilişkilenen kabul ve iman ritüelidir; yaş ve uygulanış biçimi farklı geleneklerde değişebilir. Evharistiya veya komünyon, İsa’nın son yemeğiyle ilişkili ekmek-şarap ayinidir. İki ritüelin nesnesi ve dinî anlamı aynı değildir.",
          "Kilisede toplanma tek başına vaftiz yapıldığını kanıtlamaz; suyla ilgili kabul töreni gibi ayrı veri gerekir. Aynı biçimde ekmek-şarap ayinini Şabat adlı haftalık kutsal zamanla eşleme. Her terim için ayrı nesne, fiil ve amaç ara.",
        ],
      },
      {
        title: "Sakramentlerin kapsamı",
        paragraphs: [
          "Sakrament kutsal ayin anlamıyla bazı Hristiyan geleneklerde kullanılan terimdir. Katolik gelenekte vaftiz, evharistiya, kuvvetlendirme, tövbe, hastalara yağ sürme, ruhbanlığa kabul ve evlilik yedi sakrament olarak ele alınır. Geleneklerin kabul ettiği sayı ve yorum aynı değildir.",
          "Bu yedi maddelik listeyi bütün Protestan veya başka Hristiyan topluluklara değişmeden genelleme. Bir törenin dinî değeriyle onun belirli gelenekte sakrament adı altında sınıflanması ayrı sorulardır. Kaynak hangi mezhebi veriyorsa sınırı koru.",
        ],
      },
      {
        title: "Noel, Paskalya ve simgeler",
        paragraphs: [
          "Noel İsa’nın doğumunun anılması; Paskalya ise Hristiyan inancında dirilişinin kutlanmasıdır. Haç çarmıha gerilişle ilişkili simgedir. Çan, bazı geleneklerde ayine çağrı ve önemli olayları duyurma işlevi görebilir.",
          "Bütün bunların İsa veya kiliseyle ilişkili olması onları eş anlamlı yapmaz. Kutlamada hangi olay anılıyor, nesne ne işe yarıyor diye sor. Bir simgeye rastlamak tek başına belirli bir kişinin bütün inanç veya mezhep durumunu açıklamaz.",
        ],
      },
      {
        title: "Katolik, Ortodoks ve Protestan",
        paragraphs: [
          "Bu başlıklar Hristiyanlık içindeki büyük tarihî gelenekleri ifade eder. Katolik gelenekte papa ve Vatikan’la ilişki; Ortodoks kiliselerde farklı patriklikler; Protestan geleneklerde Reform hareketleri ve kutsal metne vurgu öne çıkar. Protestanlığın kendi içinde de çeşitlilik vardır.",
          "Bunları üç ayrı din diye tanıtmak ortak Hristiyan çerçevesini siler. Ortak din de örgütlenme ve ritüel farklarını yok etmez. Reform 16. yüzyıl bağlamında ele alınır; başka dönem adlarını rastgele birbirine bağlama.",
        ],
      },
    ],
    examples: [
      {
        title: "Beslenme ilkesi ve giysi",
        prompt:
          "Bir kültür notunda kaşer, beslenmeye ilişkin dinî uygunluk; kipa ise bir baş örtüsü olarak tanımlanır. Öğrenci ikisini yalnız dış görünüşe ait iki giysi diye sınıflar.\nNasıl düzeltmelidir?\nA) İkisini de kutsal kitap yaparak. B) Kaşeri beslenme ilkesi, kipayı giysi olarak ayırarak. C) Kipayı yıllık bayram sayarak. D) Kaşerin yalnız yer adı olduğunu söyleyerek. E) İki kelimeyi tamamen silerek.",
        strategy: "Terimlerin nesne ve işlevini tanımlarıyla sınıfla.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "İlk terim ne yenebileceğiyle ilgili uygunluktur.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "İkinci terim kişi üzerindeki örtüdür.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "B iki türü doğru ayırır; diğerleri yeni sınıf icat eder.",
          },
        ],
        answer: "B: Kaşeri beslenme ilkesi, kipayı giysi olarak ayırarak",
        check: "Tanımın hangi kısmı beslenmeyi, hangi kısmı giysiyi gösterir?",
        pitfall: "Aynı dinle ilişkili iki kelimeyi aynı nesne türü sanmak.",
      },
      {
        title: "Benzer külliyat, farklı düzen",
        prompt:
          "Bir katalog, Tanah ile bazı Hristiyan Eski Ahit listeleri arasında ortak metinler bulunduğunu; kitap sırası ve kapsamın geleneklere göre farklılaşabildiğini açıkça söylüyor.\nHangi düzenleme daha doğrudur?\nA) Ortak metin varsa bütün listeleri her ayrıntıda aynı saymak. B) Bütün ortak metinleri reddetmek. C) Ortaklık ve belirtilen liste farklılıklarını ayrı sütunlarda tutmak. D) Eski Ahit’i yalnız bir giysi yapmak. E) Tanahı yalnız bir ayin adı saymak.",
        strategy: "Metin ilişkisini tam liste özdeşliğiyle karıştırma.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Katalog ortak metinler olduğunu verir.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Aynı katalog kapsam ve sıra farkını da belirtir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "C iki veriyi birlikte korur; ortaklık veya fark tek başına silinmez.",
          },
        ],
        answer:
          "C: Ortaklık ve belirtilen liste farklılıklarını ayrı sütunlarda tutmak",
        check: "Her ortaklık için tam özdeşlik kurmak zorunda mısın?",
        pitfall:
          "İlişkili metin geleneklerinin her listesini aynı kabul etmek.",
      },
      {
        title: "Dinî anlatıyı sahibine bağla",
        prompt:
          "Bir karşılaştırma İsa’nın Hristiyan öğretisinde kurtarıcı rolünü, İslam öğretisinde ise peygamber olarak konumunu ayrı sütunlarda anlatıyor.\nBu sunumun doğru özelliği nedir?\nA) İki geleneğin bütün inançlarını tek cümleye zorlaması. B) Kullanıcının bütün öğretileri kabul ettiğini ölçmesi. C) Her kişinin aynı fikri taşıdığını ilan etmesi. D) Her öğretinin hangi geleneğe ait olduğunu belirterek aktarması. E) Hiçbir inanç bilgisinin bulunmaması.",
        strategy: "Bir öğretiyi anlatırken söyleyen gelenek bilgisini koru.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "İki sütun farklı dinî çerçeveleri adlandırır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Her çerçevenin İsa’ya ilişkin ifadesi kendisine bağlanır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "D doğru atfı açıklar; diğerleri sunumun söylemediği kabul veya özdeşlik kurar.",
          },
        ],
        answer:
          "D: Her öğretinin hangi geleneğe ait olduğunu belirterek aktarması",
        check:
          "Bir cümleyi aktarırken hangi geleneğe ait olduğunu belirttin mi?",
        pitfall:
          "Farklı dinlerin aynı şahsiyet hakkındaki açıklamalarını aynı beyan saymak.",
      },
      {
        title: "Aynı ritüel, farklı uygulama",
        prompt:
          "Bir ders iki Hristiyan geleneğin vaftiz uygulamasını karşılaştırıyor: ilk örnekte bebek, ikinci örnekte yetişkin vaftizi anlatılıyor. Ders örneklerin her gruptaki bütün ayrıntıları vermediğini söylüyor.\nBu iki örnek nasıl okunmalıdır?\nA) Vaftizin uygulama ve yaş bakımından çeşitliliği olabilir. B) İkinci örnek su içermediği için otomatik yanlıştır. C) Bir din içinde hiçbir farklılık olamaz. D) Her Hristiyan mutlaka iki kez aynı biçimde vaftiz edilir. E) Yaş farkı iki örneğin farklı dinlere ait olduğunu kesinleştirir.",
        strategy: "Aynı ritüel adı altında verilen değişkeni belirle.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Ortak ritüel vaftizdir.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Değişen veri örneklerdeki katılımcının yaşıdır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "A örneklerin sınırlı çeşitliliğini korur; evrensel veya zorunlu din ayrımı eklenmez.",
          },
        ],
        answer: "A: Vaftizin uygulama ve yaş bakımından çeşitliliği olabilir",
        check: "İki örnekten bütün uygulama ayrıntıları öğrenilmiş olur mu?",
        pitfall:
          "Bir farklı uygulamayı ana dinin mutlaka farklı olduğu kanıtı saymak.",
      },
      {
        title: "Görselde hangi bilgi ölçülüyor?",
        prompt:
          "Bir çizim, menorayı yedi kollu; Davud Yıldızı’nı altı köşeli gösteriyor. Öğrenci iki nesnenin çizimde aynı yüksekliğe sahip olmasından gerçek tarihî nesnelerin de her zaman eşit boyda olduğunu çıkarıyor.\nHangi bilgi eksiktir?\nA) İki simgenin adlarının bulunması. B) Çizimin gerçek boyutu belirleyen bir ölçek veya ölçü vermesi. C) Kollu nesnenin çizilmiş olması. D) Yıldızda köşe bulunması. E) İki nesnenin yan yana olması.",
        strategy: "Biçim ayırt etme çizimi ile gerçek ölçüm arasını ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Çizim kol ve köşe özelliğini verir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Gerçek boyutları bağlayan bir ölçek belirtilmemiştir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "B eksik nicel bilgiyi gösterir; diğerleri zaten verilen çizim ayrıntılarıdır.",
          },
        ],
        answer:
          "B: Çizimin gerçek boyutu belirleyen bir ölçek veya ölçü vermesi",
        check: "Biçimi tanımak için gerçek boy ölçüsü gerekli mi?",
        pitfall:
          "Bir öğretim görselinin sayfa boyunu tarihî nesnenin gerçek boyu saymak.",
      },
      {
        title: "Tür ve birey düzeyini ayır",
        prompt:
          "Bir müze üç vitrine sırasıyla Katolik, Ortodoks ve Protestan tarihinden nesneler koyuyor. Ziyaretçiler farklı kişisel geçmişlere sahip; müze onların inancını sormuyor.\nVitrin başlıkları neyi sınıflar?\nA) Bütün ziyaretçilerin kişisel inancını. B) Ziyaretçilerin vatandaşlığını. C) Sergilenen nesnelerin ilişkilendirildiği tarihî gelenekleri. D) Her kişinin gelecekte yapacağı ritüeli. E) Bütün insanların tek mezhepte oluşunu.",
        strategy: "Sınıflanan şeyin nesne mi kişi mi olduğunu belirle.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Başlıklar vitrindeki nesnelere bağlanmıştır.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Ziyaretçilerin kişisel inancı hakkında veri yoktur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "C sergi sınıflamasını korur; kişi düzeyindeki diğer hükümler eklenemez.",
          },
        ],
        answer:
          "C: Sergilenen nesnelerin ilişkilendirildiği tarihî gelenekleri",
        check:
          "Başlık hangi özneye bağlı: vitrin nesnelerine mi ziyaretçiye mi?",
        pitfall:
          "Bir din tarihi sergisini gezen herkesin aynı inanca sahip olduğunu sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Tanah ve Tora ilişkisi nedir?",
        answer: "Tora, Neviim ve Ketuvim’den oluşan Tanah’ın ilk bölümüdür.",
      },
      {
        prompt: "Talmudun odak türü nedir?",
        answer: "Rabbanî yorum ve dinî-hukuki tartışma birikimi.",
      },
      {
        prompt: "Şabat hangi iki sınır arasındadır?",
        answer: "Cuma gün batımı ile cumartesi gün batımı.",
      },
      {
        prompt: "Menora ve Davud Yıldızı hangi biçimlerle ayrılır?",
        answer: "Yedi kollu kandillik ve altı köşeli yıldız.",
      },
      {
        prompt: "Dört İncil neden Yeni Ahit’in tamamı değildir?",
        answer: "Yeni Ahit başka yazıları da içerir.",
      },
      {
        prompt: "Teslis tanımında korunması gereken birlik nedir?",
        answer:
          "Ana akım öğretide üç kişiyle açıklanan tek Tanrı; üç ayrı tanrı diye aktarılmaz.",
      },
    ],
  },
  {
    id: "islam-ve-bilim",
    title: "İslam ve bilim: bilgi, kurum ve katkı",
    detail: "detail-92",
    minutes: 145,
    objectives: [
      "İslam öğretisindeki akıl ve ilim vurgusunu bilimsel yöntemin kanıt türlerinden ayırarak açıkla.",
      "Öğretim ve araştırma kurumlarını dönem, yer ve faaliyetleriyle tanı.",
      "Dinî, sosyal ve doğa bilimlerinin konularını; kişi, eser ve katkı ilişkilerini ayır.",
      "Çeviri, yeni gözlem ve özgün katkıyı karşılaştır; Fâtır 27–28’i metnin sınırlarıyla yorumla.",
    ],
    source:
      "MEB DKAB 12. sınıf İslam ve Bilim ünitesinin 36 sayfası ve Aurelia kağıdı karşılaştırılarak hazırlanan özgün öğretim. Doğrulanmamış tarihsel ilk ve icat atıfları kullanılmamıştır; alıştırmalar resmî sınav sorusu değildir.",
    sections: [
      {
        title: "İlim ve bilimin kapsamı",
        paragraphs: [
          "İlim bilgi ve öğrenme birikimi anlamıyla dinî ve başka araştırma alanlarını kapsayabilir. Bilim sistemli yöntem, gözlem, ölçüm, akıl yürütme ve eleştirel denetimle açıklama üretir. Âlim veya bilgin, bilgiyle uğraşan kişiyi belirtir; tek başına yalnız bir uzmanlık adı değildir.",
          "Tarihî bir terimin bugünkü kullanımına birebir eşit olması gerekmez. Bir kişiye âlim denmesi onu bütün bilimlerin kurucusu yapmaz. Soruda hangi çalışma, eser ve yöntem veriliyorsa alanını o somut veriden çıkar.",
        ],
      },
      {
        title: "Dinî anlam ve bilimsel açıklama",
        paragraphs: [
          "İslam öğretisi varlık, amaç, değer ve sorumlulukla ilgili dinî bir çerçeve kurar. Bilim doğa olaylarının nasıl gerçekleştiğini sınanabilir açıklamalarla araştırır. Tarih boyunca dinî amaçlar araştırmaya ilham verebilir; ilham ile sonucun deneysel kanıtı farklıdır.",
          "Bir ayetin araştırmaya yöneltmesi belirli bir fizik yasasının ölçümsüz doğrulandığı demek değildir. Bir kişinin deney yapması da bütün metafizik görüşlerini otomatik göstermez. İddianın türüne uygun kanıtı kullanmak hem metni hem araştırmayı doğru anlamayı sağlar.",
        ],
      },
      {
        title: "Akıl, vahiy ve tefekkür",
        paragraphs: [
          "Vahiy İslam inancında Allah’ın peygamberlere bildirdiği bilgidir. Akıl düşünme, değerlendirme ve gerekçe kurma yetisi; tefekkür ise bir konu üzerinde düşünmedir. Kur’an’daki okuma ve düşünme vurguları bu ünitede ilim öğrenmenin önemiyle ilişkilendirilir.",
          "Dinî teşvik cümlesini gerçek bir kişinin bütün düşüncelerini bildiren veri gibi kullanma. Soruda ayetin mesajı isteniyorsa açık fiile, bilimsel yöntem isteniyorsa ölçüm ve sınama işlemine dön. Öğrenme çağrısı ile öğrenmenin gerçekten gerçekleşmiş olması aynı olay değildir.",
        ],
      },
      {
        title: "Gözlem, deney ve çıkarım",
        paragraphs: [
          "Gözlem bir olayı sistemli biçimde izleyip kaydetme; deney ise koşulları düzenleyerek bir açıklamayı sınama işidir. Çıkarım, verilen öncüllerden gerekçeli sonuca yönelmektir. Aynı çalışmada üçü birlikte bulunabilir ama tanımları ayrı kalır.",
          "İki olayın birlikte görülmesi tek başına birinin ötekine neden olduğunu kanıtlamaz. Karşılaştırma, koşullar ve alternatif açıklamalar gerekebilir. Bir metin yalnız eski bir kitabın çevrildiğini söylüyorsa yeni deney yapıldığını ekleme.",
        ],
      },
      {
        title: "Bilimsel bilginin değişebilirliği",
        paragraphs: [
          "Bilimsel açıklamalar kanıta dayanır ve yeni, daha güvenilir veriyle düzeltilebilir. Bir açıklamanın hangi koşullarda geçerli olduğu da araştırmanın parçasıdır. Değişebilirlik her görüşün aynı derecede gerekçeli olduğu veya sonuçların keyfî seçildiği anlamına gelmez.",
          "Yeni verinin eski düşünceyi nasıl etkilediğini somutlaştır: ölçüm hatası mı düzeltildi, yeni bir etken mi bulundu? Sırf eski olması doğru veya yanlış olma ölçütü değildir. İddianın dayanağı ve sınama koşulları birlikte değerlendirilir.",
        ],
      },
      {
        title: "Faydalı ilim ve etik sorumluluk",
        paragraphs: [
          "Kaynak ilmin insanlığa yararlı olması, zararı önlemesi ve sorumlulukla kullanılması üzerinde durur. Bilgi üretme becerisiyle onun hangi amaçla kullanıldığı farklı boyutlardır. Bir teknik imkânın bulunması her kullanımının ahlaken uygun olduğu sonucunu vermez.",
          "Araştırmayı değerlendirmek için yöntem kadar insan ve çevre üzerindeki etkisini de sorabilirsin. Tarihî tıp bilgisi öğrenmek günümüzde bir tedaviyi denemek için yeterli gerekçe değildir. Bu ünite tarih ve kavram öğretir; güncel klinik karar üretmez.",
        ],
      },
      {
        title: "Çeviri ve bilgi dolaşımı",
        paragraphs: [
          "İslam medeniyetinde Yunanca, Süryanice, Farsça ve Hint bilgi geleneklerinden eserler çevrilmiş ve incelenmiştir. Daha sonra Arapçadan Latinceye çeviriler de birikimin dolaşmasına katkı sağlamıştır. Bilgi tarihi çok dilli ve çok aktörlü ilişkiler içerir.",
          "Çeviri kaynak metni başka dile aktarmadır; yeni ölçüm veya yöntem geliştirme ayrıca özgün katkı olabilir. Bu iki süreç birbirini dışlamaz. Bir uygarlığın katkısını anlamak, bütün bilimin yalnız tek kişi veya topluluk tarafından başlatıldığını söylemeyi gerektirmez.",
        ],
      },
      {
        title: "Dârülerkâm, mescit ve Suffe",
        paragraphs: [
          "İlk dönem Mekke’de Erkam’ın evi eğitim ortamları arasında anılır. Medine’de Mescid-i Nebî’ye bitişik Suffe’de eğitim ve öğrenim sürdürülmüştür. Aynı amaç çevresindeki bu yerler farklı olay ve dönemlerle ilişkilidir.",
          "Suffe’yi Bağdat’ta daha sonraki çeviri merkezinin başka adı sayma. Yer, dönem ve faaliyet üçlüsünü kullan. Erken bir eğitim ortamından söz edilmesi bugün bildiğimiz bütün uzmanlıkların orada aynı biçimde okutulduğunu göstermez.",
        ],
      },
      {
        title: "Cami ve ders halkaları",
        paragraphs: [
          "Camiler tarih boyunca ibadetin yanında ders ve öğrenme faaliyetlerine de ev sahipliği yapmıştır. Ders halkası öğreticinin çevresinde öğrenim görme biçimidir. Tefsir, hadis ve fıkıh gibi alanlar bu ortamlarda okutulmuştur.",
          "Medrese gibi yeni kurumların açılması camilerdeki eğitimin zorunlu olarak sona erdiği anlamına gelmez. Birlikte var olabilen kurumları tek birinin diğerini yok ettiği sıra gibi çizme. Metin devamlılığı veriyorsa onu koru; vermediği ayrıntıyı da ekleme.",
        ],
      },
      {
        title: "Mektep ve medrese",
        paragraphs: [
          "Mektep tarihî bağlamda temel okuma-yazma ve başlangıç öğretimiyle; medrese daha örgütlü ve ileri öğretimle ilişkilidir. Nizamiye, Sahn-ı Seman ve Süleymaniye medreseleri farklı dönemlerden örneklerdir. Bugünkü okul türleriyle karşılaştırma benzetmedir, tam kurum özdeşliği değildir.",
          "Her medrese yalnız tek ders okutmuş diye düşünme; programlar zamana ve yere göre değişebilir. Bir kurum adından bütün öğrencilerin aynı düzeyde veya aynı içerikle eğitim aldığını çıkaramazsın. Soruda verilen program ve faaliyet varsa onlara bak.",
        ],
      },
      {
        title: "Dârülkurra ve kıraat",
        paragraphs: [
          "Dârülkurra Kur’an’ın okunması ve kıraat alanında uzmanlaşmayla ilişkilidir. Hafızlık ve doğru okuma öğretimi bu bağlamda anılır. Kıraat metnin okunuşuyla ilgili özel alandır; her dinî ders aynı özel konu değildir.",
          "Bir kurumun İslamî eğitim vermesi onu otomatik dârülkurra yapmaz. Hadis rivayetlerinin aktarımı veya değerlendirilmesi başka bir uzmanlıktır. Önce öğretimin nesnesini açıkça yaz; sonra kurum adını seç.",
        ],
      },
      {
        title: "Dârülhadis ve hadis öğretimi",
        paragraphs: [
          "Dârülhadis hadis ilimlerinin öğretildiği ve uzmanlaşmanın yürütüldüğü kurumdur. Rivayetlerin aktarımı, açıklanması ve incelenmesiyle ilişkilidir. Daha önce camilerde yürütülen dersler sonradan özel kurumlar içinde de sürmüştür.",
          "Dârülhadis ile dârülkurra aynı üst eğitim alanında olsa da özel hedefleri ayrıdır. Kur’an okuma usulü veriliyorsa kıraat, Hz. Peygamber’e nispet edilen rivayetler veriliyorsa hadis odağı öne çıkar. Genel başlıktan özel kurum uydurma.",
        ],
      },
      {
        title: "Beytü’l-hikme",
        paragraphs: [
          "Beytü’l-hikme Abbasiler dönemi Bağdat’ındaki kitap, çeviri ve ilmî çalışma ortamıyla ilişkilendirilir. Farklı dillerdeki bilgi birikiminin aktarılması ve incelenmesinde rol oynayan bir kurum olarak öğretilir. Huneyn bin İshak çeviri faaliyetleriyle anılan isimlerdendir.",
          "Bugünkü üniversite veya akademiyle yapılan benzetme her örgütlenme ayrıntısının aynı olduğunu göstermez. Belirli bir çevrede çeviriler yapılması bütün araştırmaların yalnız o binada doğduğu sonucunu da vermez. Kurumun rolünü belgelenen faaliyetle sınırla.",
        ],
      },
      {
        title: "Kütüphane ve yazılı birikim",
        paragraphs: [
          "Kütüphaneler eserlerin korunması, çoğaltılması ve erişime sunulmasına katkı sağlar. Kitap üretimi, kâğıt kullanımı ve vakıf gibi destekler bu birikimle ilişkilidir. Medreseler veya başka kurumlar içinde kütüphaneler bulunabilir.",
          "Kitap sayısı erişim imkânının bir göstergesi olabilir ama bütün kitapların okunduğunu veya yeni buluş yapıldığını tek başına kanıtlamaz. Nicel envanterle öğrenme ve araştırma sonucu ayrı verilerdir. Bir sayıdan neden-sonuç bağı kurmak için mekanizmayı da göstermelisin.",
        ],
      },
      {
        title: "Rasathane ve astronomi",
        paragraphs: [
          "Rasathane gök cisimlerini sistemli gözlemeye ayrılmış kurumdur. Gözlem araçları, konum kayıtları ve astronomi cetvelleri bu faaliyete hizmet eder. Merâga, Semerkant ve İstanbul rasathaneleri farklı dönemlerdeki örneklerdendir.",
          "Kurumun hükümdar tarafından desteklenmesi onun yalnız siyasal karar merkezi olduğunu göstermez. Gözlemin nesnesi ve üretilen kayıt alanı belirler. Aynı anda matematikten yararlanılması astronomiyle matematiğin bütün konularının aynı olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Şifahane ve tıp öğretimi",
        paragraphs: [
          "Şifahane veya dârüşşifa hasta bakımı ve tedaviyle ilişkilidir; bazı örneklerde tıp öğretimi de yapılmıştır. Gevher Nesibe ve Divriği dârüşşifaları Anadolu’daki tarihî örneklerdir. Kurum adları ve örgütlenme dönemlere göre değişebilir.",
          "Tarihî tedavi uygulamalarının bulunması onların hepsinin bugün güvenli ve etkili olduğu anlamına gelmez. Modern tedavi kararı için güncel kanıt gerekir. Bu ünitede önemli olan kurumun sağlık ve öğrenme işlevini rasathanenin gök gözleminden ayırmaktır.",
        ],
      },
      {
        title: "Tefsir, hadis, fıkıh ve kelam",
        paragraphs: [
          "Tefsir Kur’an ayetlerini açıklama ve yorumlama; hadis rivayetleri derleme ve inceleme; fıkıh ibadet ve günlük hayatın hükümleri; kelam inanç esaslarını gerekçelendirme alanlarıdır. Müfessir, muhaddis ve fakih ilgili uzmanlık adlarıdır.",
          "Aynı âlim birden çok alanda eser verebilir; alanın konusu kişi adıyla tekleşmez. İbadetin uygulanışının hükmünü incelemekle inanç esasını savunmak farklı sorulardır. Önce tartışmanın nesnesini, sonra ilgili alanı belirle.",
        ],
      },
      {
        title: "Dil, tarih ve felsefe",
        paragraphs: [
          "Dil araştırmaları metni doğru anlamaya; tarih geçmiş olayların ve kaynakların incelenmesine; felsefe kavramsal sorunların gerekçeli tartışılmasına yönelir. İslam düşünce tarihinde bu alanlar farklı amaç ve yöntemlerle gelişmiştir. İbn Haldun tarih ve toplum düşüncesiyle anılan isimlerdendir.",
          "Bir eserde farklı alanların birlikte bulunması tanımların silindiği anlamına gelmez. Seyahatname bir yer ve toplum hakkında bilgi verebilir; bütün gözlemleri aynı kanıt gücünde kabul edilmez. Kaynağın gözlem, yorum ve aktarılan haber kısımlarını ayır.",
        ],
      },
      {
        title: "Coğrafya ve astronomi birikimi",
        paragraphs: [
          "Coğrafya yeryüzünü doğal ve beşerî yönleriyle inceler. Harita, seyahatname ve konum hesapları bu birikimin araçlarıdır. Bîrûnî, İdrisî, Pîrî Reis, Kâtip Çelebi ve Evliya Çelebi farklı eser ve çalışmalarla bu geniş tarihte yer alır.",
          "Bir kişinin bir haritası olması bütün coğrafya tarihinin tek kurucusu olduğu anlamına gelmez. Astronomiyle bağlantı kurulması da bütün araştırmanın yalnız gökyüzü hakkında olduğunu göstermez. Soruda harita mı, yıldız cetveli mi, gezi gözlemi mi verildiğini denetle.",
        ],
      },
      {
        title: "Hârizmî ve matematik",
        paragraphs: [
          "Hârizmî cebir ve hesaplama geleneğine yaptığı katkılarla tanınır. El-Cebr ve’l-Mukabele adlı eseri cebir tarihinin önemli metinlerindendir; adı algoritma teriminin tarihine de kaynaklık etmiştir. Matematik birikimi daha önceki ve sonraki birçok gelenekle gelişmiştir.",
          "Bu katkıyı sıfırı veya logaritmayı tek başına icat ettiği şeklinde genişletme. Bir terimin kişinin adıyla ilişkili olması bütün hesaplama yöntemlerinin yalnız ona ait olduğunu göstermez. Katkının eser, yöntem ve tarih bağlamını ayırmak daha doğru öğrenmedir.",
        ],
      },
      {
        title: "İbnü’l-Heysem ve optik",
        paragraphs: [
          "İbnü’l-Heysem ışık, görme ve görüntü üzerine geometrik ve deneysel araştırmalarıyla tanınır. Görmeyi cisimlerden göze ulaşan ışıkla açıklama ve karanlık oda incelemeleri bu bağlamda ele alınır. Çalışmalarının başka dillere aktarılması etkisinin yayılmasına katkı sağlamıştır.",
          "Optik çalışmasını yalnız gözden ışın çıkması varsayımıyla eşleme. Aynı zamanda başka alanlarda çalışmış olması da bu özel katkıyı ortadan kaldırmaz. Soruda verilen deney, nesne ve açıklamayı kişiyle birlikte kullan.",
        ],
      },
      {
        title: "Tıp tarihindeki eserler",
        paragraphs: [
          "İbn Sînâ el-Kânûn fi’t-Tıbb adlı eseriyle; Ebû Bekir er-Râzî tıp ve hastalıkların ayırt edilmesine ilişkin çalışmalarıyla; Zehrâvî cerrahi eserleriyle tanınır. İbnü’n-Nefîs küçük kan dolaşımına ilişkin açıklamalarıyla anılır. Her katkı kendi alan ve kapsamıyla öğrenilir.",
          "Bir tarihî hekimi bütün tıbbın tek kurucusu veya her tedavinin ilk uygulayıcısı diye tanıtma. Eski bir eserin yaygın okunması günümüzdeki bütün önerilerinin geçerli olduğunu kanıtlamaz. Tarihî etki ile güncel klinik kanıt ayrı değerlendirilir.",
        ],
      },
      {
        title: "Mekanik, astronomi ve güncel örnek",
        paragraphs: [
          "Cezerî su düzenekleri, saatler ve otomatlarla; Uluğ Bey Semerkant’taki astronomi çalışmaları ve cetvellerle; Ali Kuşçu astronomi ve matematik birikimiyle tanınır. Aziz Sancar DNA onarımı alanındaki çalışmalarıyla Nobel Kimya Ödülü alan güncel örnektir.",
          "Cezerî’nin otomatını modern dijital bilgisayarla aynı nesne yapma. Bir ödülün alanı da kişinin bütün çalışmasının yalnız tek terimle açıklanması demek değildir. Ortak olan araştırma ve katkı çabasıdır; dönem, araç ve problem farklıdır.",
        ],
      },
      {
        title: "Çok aşamalı katkı tarihini okumak",
        paragraphs: [
          "Bilgi üretiminde önceki eserleri öğrenme, çeviri, ölçüm, eleştiri ve yeni yöntem geliştirme gibi aşamalar bulunabilir. Bir medeniyetin katkısı başka kültürlerin etkisini tümden silmeden anlaşılabilir. Latin dünyasına aktarımlar da bu dolaşımın parçasıdır.",
          "Önce hangi eylem gerçekten yapılmış, sonra bunun neyi gösterdiğini sor. Yeni ölçüm verilmişse araştırma katkısı; yalnız çeviri verilmişse aktarım desteklenir. Her çeviriyi buluş, her ortaklığı tek kaynak veya her tarihî övgüyü ölçülmüş kanıt sayma.",
        ],
      },
      {
        title: "Fâtır 27–28: çeşitlilik ve bilgi",
        paragraphs: [
          "Ayet grubunda yağış, farklı renklerde ürünler, dağlar, insanlar ve canlı çeşitliliği anılır. Bu çeşitlilik düşünmeye ve yaratılış üzerinde tefekküre konu edilir. Bilgi sahiplerinin Allah’a karşı saygı ve sorumluluğu da dinî mesajın parçasıdır.",
          "Metin belirli bir genetik denklem, jeolojik tarih veya deney protokolü vermez. Doğaya dikkat çağrısını bu alanların ölçülmüş sonuçlarıyla aynılaştırma. Ayetin mesajını açıklarken verilen örnekleri, bilimsel iddia kurarken ayrıca gerekli verileri göster.",
        ],
      },
    ],
    examples: [
      {
        title: "Değişkeni sabit tut",
        prompt:
          "Kurmaca bir optik deneyinde iki gözlem aynı ışık kaynağı ve aynı ekranla yapılıyor; yalnız delik çapı değiştiriliyor. Araştırmacı görüntü farkının hangi değişkenle ilişkili olduğunu sınamak istiyor.\nHangi plan soruya daha uygundur?\nA) Her denemede bütün araçları değiştirmek. B) Görüntüye hiç bakmadan sonuç yazmak. C) Delik çapını değiştirirken diğer verilen koşulları sabit tutmak. D) Yalnız araştırmacının adını değiştirmek. E) Yeni veriyi kaydetmeden eskisini kopyalamak.",
        strategy: "Nedeni sınamak için değişen ve sabit kalanları ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Deney sorusu delik çapının etkisidir.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Işık kaynağı ve ekran sabit tutulacak koşullardır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "C karşılaştırılabilir denemeyi kurar; diğerleri etkiyi ayıracak veri üretmez.",
          },
        ],
        answer:
          "C: Delik çapını değiştirirken diğer verilen koşulları sabit tutmak",
        check:
          "İki denemede delik dışında neyin değişmediğini gösterebiliyor musun?",
        pitfall:
          "Bir etkiyi araştırırken bütün koşulları aynı anda değiştirmek.",
      },
      {
        title: "Çelişen katalog kayıtları",
        prompt:
          "Kurmaca iki katalog aynı yazmayı farklı yazarlara atfediyor. Birinde gerekçe yok, ötekinde sayfa sonundaki yazar kaydı ve başka nüshayla karşılaştırma açıklanıyor.\nİlk inceleme için hangi işlem daha uygundur?\nA) İlk görülen adı kesin kabul etmek. B) Yazar kaydı ve nüsha karşılaştırmasının dayanağını incelemek. C) İki ad benziyor diye yazmayı iki ayrı nesne saymak. D) Bütün katalogları gerekçesiz reddetmek. E) Yazmanın yalnız raf renginden yazarını seçmek.",
        strategy: "Atfı başlık sırasından değil somut dayanakla değerlendir.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "İki katalogda bir atıf çatışması vardır.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "İkinci kayıt incelenebilir belge gerekçesi sunar.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "B bu gerekçeyi denetler; henüz kesinlik ilan etmez ve diğer kaydı da körlemesine silmez.",
          },
        ],
        answer:
          "B: Yazar kaydı ve nüsha karşılaştırmasının dayanağını incelemek",
        check: "Dayanağı incelemekle hemen kesin hüküm vermek aynı mı?",
        pitfall:
          "Kaynak adının bulunmasını o kaynağın gerekçesinin doğrulandığı sanmak.",
      },
      {
        title: "İlk iddiasının kapsamı",
        prompt:
          "Kurmaca bir araştırma dosyası üç eski araç örneği buluyor. Belge tarihleri A örneğinin bu üç kayıt arasında en eski olduğunu gösteriyor. Bu sınırlı dosya, başka dillerdeki veya henüz incelenmemiş eserleri taramadan birini bütün dünya tarihinin ilk örneği ilan etmek istiyor.\nHangi ifade daha savunulabilirdir?\nA) Dünya tarihindeki bütün örnekler taranmıştır. B) İncelenen üç örnek arasında en eski görünen kayıt budur; küresel ilk iddiası ayrıca araştırılmalıdır. C) İncelenmemiş eserlerde kesin hiçbir bilgi yoktur. D) Tarihi eski olan her araç günümüzde güvenlidir. E) Bir örnek bulunması önceki bütün örneklerin yokluğunu kanıtlar.",
        strategy:
          "Tarama kapsamıyla tarihsel öncelik iddiasının kapsamını karşılaştır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Dosyanın incelenen kümesi üç örnektir; A bu üç kayıt içinde en eski tarihlidir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Bütün diller ve kaynaklar hakkında yokluk kanıtı yoktur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "B yerel karşılaştırmayı korur, küresel ilk hükmünü ayrı tutar.",
          },
        ],
        answer:
          "B: İncelenen üç örnek arasında en eski görünen kayıt budur; küresel ilk iddiası ayrıca araştırılmalıdır",
        check: "En eski incelenen ile tarihteki ilk aynı kapsam mı?",
        pitfall:
          "Sınırlı kaynak taramasından bütün tarih için kesin ilk sonucu çıkarmak.",
      },
      {
        title: "Bilim alanı tek kişi değildir",
        prompt:
          "Bir tarih panosu aynı kişinin bir optik deneyi, bir geometri açıklaması ve bir felsefe tartışmasını ayrı kartlarda gösteriyor.\nPano hangi düşünceyi destekler?\nA) Alanlar farklı olduğu için kartlardan ikisi silinmelidir. B) Bir kişide farklı problem alanları bulunabilir; kartların yöntemleri ayrı incelenir. C) Üç kart varsa bütün bilim dalları aynı yöntemdir. D) Bir kişinin yalnız tek soru sorması mümkündür. E) Felsefe kartı optik deneyin yapılmadığını kanıtlar.",
        strategy: "Kişiyi sabit tutup farklı araştırma nesnelerini ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Kartların ortak noktası aynı kişidir.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Araştırma konuları ışık, geometri ve felsefedir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "B çok yönlülüğü korur; konu farkını yöntem özdeşliği veya çelişki yapmaz.",
          },
        ],
        answer:
          "B: Bir kişide farklı problem alanları bulunabilir; kartların yöntemleri ayrı incelenir",
        check: "Her kart için farklı bir araştırma sorusu yazabiliyor musun?",
        pitfall: "Kişi ortaklığını bütün alanların aynı olduğu sanmak.",
      },
      {
        title: "Bilgi dolaşımında ortak emek",
        prompt:
          "Kurmaca bir eser yolculuğunda ilk yazar bir yöntem açıklıyor, çevirmen kavramları yeni dile aktarıyor, sonraki araştırmacı yeni karşı örnekle yöntemin sınırını belirliyor.\nKatkılar nasıl gösterilmelidir?\nA) Bütün katkıyı yalnız son kişiye vermek. B) Çevirmeni hiçbir bilgi işi yapmamış saymak. C) Önceki yazarı bütün sonraki verilerin tek sahibi yapmak. D) Yöntem, aktarım ve sınır belirleme katkılarını ayrı ayrı adlandırmak. E) Üç kişi varsa eserin hiç var olmadığını söylemek.",
        strategy: "Ortak eserde herkesin yaptığı somut işlemi görünür tut.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "İlk katkı yöntem açıklamasıdır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Çevirmen aktarır; sonraki kişi yeni karşı örnek sunar.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "D üç işlemi kendi sahibine bağlar; katkılardan biri diğerini silmez.",
          },
        ],
        answer:
          "D: Yöntem, aktarım ve sınır belirleme katkılarını ayrı ayrı adlandırmak",
        check:
          "Her katkıyı gerçekten verilen ayrı bir fiille açıklayabiliyor musun?",
        pitfall:
          "Bilgi tarihini yalnız bir kişiye ait tek aşama gibi anlatmak.",
      },
      {
        title: "Metnin hitabını çöz",
        prompt:
          "Fâtır 27–28 üzerine bir açıklama yağış ve farklı renklerde canlıları anıyor; ardından bilginin Allah’a karşı saygı ve sorumlulukla ilişkisini anlatıyor.\nAçıklamanın iki bağlantılı odağı hangileridir?\nA) Yalnız bina yüksekliği ve nüfus. B) Yalnız ayin sayısı ve takvim. C) Doğadaki çeşitlilik ve bilginin dinî-ahlaki değeri. D) Bütün canlıların aynı görünmesi ve bilginin yokluğu. E) Yalnız bir eserin yayın tarihi.",
        strategy: "Örnek listesini sonraki değer cümlesiyle birlikte oku.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "İlk bölüm çeşitliliği örnekler.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Sonraki cümle bilginin dinî-ahlaki anlamını verir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "C iki odağı korur; diğerleri örnek veya değer bağını siler.",
          },
        ],
        answer: "C: Doğadaki çeşitlilik ve bilginin dinî-ahlaki değeri",
        check: "Yalnız doğa listesini okuyunca ikinci mesaj gözden kaçıyor mu?",
        pitfall:
          "Bir ayet grubunun ilk örneklerini görüp sonraki mesajını atlamak.",
      },
    ],
    recall: [
      {
        prompt: "Suffe ile Beytü’l-hikme nasıl ayrılır?",
        answer:
          "Medine’de erken eğitim çevresi ile Abbasi Bağdat’ında çeviri ve ilmî çalışma ortamı.",
      },
      {
        prompt: "Dârülhadis ile dârülkurra hangi nesneleri inceler?",
        answer: "Hadis rivayetleri ve Kur’an kıraati.",
      },
      {
        prompt: "Rasathane ile şifahane hangi işlevlerle ayrılır?",
        answer: "Gök gözlemi ve sağlık/hasta bakımı.",
      },
      {
        prompt: "Çeviriyle yeni ölçüm aynı katkı mı?",
        answer:
          "Hayır; aktarım ve yeni kanıta dayalı katkı farklı ama ilişkili işlemlerdir.",
      },
      {
        prompt: "Hârizmî için hangi sağlam alan bağı öğrenilir?",
        answer: "Cebir ve hesaplama geleneği; El-Cebr ve’l-Mukabele eseri.",
      },
      {
        prompt: "Fâtır 27–28’in iki odağı nedir?",
        answer:
          "Doğa çeşitliliği üzerinde düşünme ve bilginin Allah’a saygıyla ilişkisi.",
      },
    ],
  },
  {
    id: "anadoluda-islam",
    title: "Anadolu’da İslam: süreç, şahsiyet ve kurum",
    detail: "detail-93",
    minutes: 130,
    objectives: [
      "Türk topluluklarının İslam’ı benimsemesini çok etkenli tarihî süreç olarak açıkla.",
      "Ribat, fütüvvet ve Ahiliğin farklı işlevlerini somut faaliyetlerle ilişkilendir.",
      "Dinî düşünceyi etkileyen şahsiyetleri alan, eser ve etki coğrafyasıyla tanı.",
      "Nisâ 69’daki mesajı ve tarihî kaynakların kanıt sınırlarını koru.",
    ],
    source:
      "MEB DKAB 12. sınıf Anadolu’da İslam ünitesinin 22 sayfası ve Aurelia kağıdı karşılaştırılarak hazırlanan özgün öğretim. Tarihî anlatı, menkıbe ve yorum ayrılmıştır; özgün alıştırmalar resmî sınav sorusu değildir.",
    sections: [
      {
        title: "Tek olay değil, tarihî süreç",
        paragraphs: [
          "Anadolu’da İslam başlığı Türk topluluklarının İslam’la temasından Anadolu’daki düşünce ve kurumların gelişimine uzanır. Savaş, ticaret, göç, eğitim ve farklı toplulukların ilişkileri bu süreci birlikte etkiler. Bütün topluluklar aynı gün ve aynı yoldan değişmemiştir.",
          "Bir olayın önemli olması bütün sürecin yalnız o olayla açıklandığı anlamına gelmez. Kişi, eser, kurum ve yayılma farklı kanıt düzeyleridir. Soruda bunlardan hangisi isteniyorsa onu belirle; tek tarihten bütün insanlara sınırsız sonuç çıkarma.",
        ],
      },
      {
        title: "İlk temaslar ve Maveraünnehir",
        paragraphs: [
          "Maveraünnehir Seyhun ve Ceyhun nehirleri arasında kalan tarihî bölgedir. Buhara ve Semerkant gibi şehirler Türk topluluklarıyla İslam dünyasının ilişkilerinde ve sonraki ilim hayatında önem taşır. Emevi ve Abbasi dönemlerinde farklı siyaset ve temas biçimleri görülmüştür.",
          "Bir yönetimin belirli uygulamasını bütün bir dinin veya bütün çağın değişmez özelliği sayma. Ticaret, şehir hayatı ve kişisel ilişkiler de etkili olabilir. Bir coğrafya adını ezberlemekten öte, hangi ilişkinin orada gerçekleştiğini açıklamaya çalış.",
        ],
      },
      {
        title: "Talas ve yakınlaşma",
        paragraphs: [
          "751 Talas Savaşı, bazı Türk topluluklarıyla Abbasiler arasındaki ilişkilerde önemli bir dönemeç olarak ele alınır. Savaş sonrasında artan temas ve iş birliği, İslamlaşma tarihinin unsurlarından biridir. Ancak bütün Türklerin o gün Müslüman olduğu sonucu çıkmaz.",
          "Önemli dönemeç ile tek ve yeterli neden farklıdır. Ticaret, eğitim, siyaset, göç ve yerel aktörler sonraki yüzyıllarda da etkili olmuştur. Soruda yalnız bir olay verildiyse bütün coğrafyanın bütün inanç tarihini onunla bitirme.",
        ],
      },
      {
        title: "Devletler ve farklı topluluklar",
        paragraphs: [
          "İdil Bulgarları, Karahanlılar ve daha sonra Selçuklular İslamlaşma sürecinde anılan farklı siyasî yapılardır. Satuk Buğra Han Karahanlı tarihiyle ilişkilidir. Toplulukların yeni dinle tanışma ve onu benimseme süreçleri aynı hızda ilerlememiştir.",
          "Bir devlette İslam’ın benimsenmesi bütün halkın her ayrıntıda aynılaşması demek değildir. Bir topluluğun sürecini başka birinin yerine tarih vermeden koyma. Devlet, topluluk, birey ve coğrafyayı aynı düzeyde tek özne yapmamak gerekir.",
        ],
      },
      {
        title: "Anadolu’ya göç ve kültürel aktarım",
        paragraphs: [
          "Selçuklu dönemindeki yerleşme ve farklı zamanlardaki göçler Anadolu’daki dinî ve toplumsal hayatı etkilemiştir. Gelenler arasında zanaatkâr, tüccar, âlim ve dervişler bulunur. Eser, sözlü öğüt ve kurumlar aracılığıyla farklı birikimler taşınmıştır.",
          "Bir düşüncenin Anadolu’da etkili olması onu geliştiren kişinin mutlaka Anadolu’da doğduğunu göstermez. İnsanların hareketiyle eserlerin ve fikirlerin dolaşımı ayrı ama ilişkili süreçlerdir. Kaynak hangisini veriyorsa sonucunu o veriyle sınırla.",
        ],
      },
      {
        title: "Ribatların değişen işlevi",
        paragraphs: [
          "Ribat sınır ve stratejik yerlerde askerî amaçlarla kullanılan sağlam yapılara verilen addır. Bazı dönem ve bölgelerde eğitim, tasavvufi faaliyet, konaklama ve yol güvenliği işlevleri de kazanmışlardır. Değişim zaman ve yer bağlamıyla anlatılır.",
          "Bir ribatın sonraki hizmetini bütün ribatların her çağdaki tek kuruluş amacı sayma. Aynı yapının zaman içinde farklı işlevler taşıması mümkündür. Soruda hangi dönemin ve hangi faaliyetin verildiğini ayırarak tarihî değişimi oku.",
        ],
      },
      {
        title: "Fütüvvet: değer ve davranış",
        paragraphs: [
          "Fütüvvet cömertlik, mertlik, dayanışma ve başkasının hakkını gözetme gibi değerlerle ilişkilidir. Ahi teşkilatındaki meslek ahlakının önemli dayanaklarındandır. Fütüvvetname bu anlayışın adap, ilke ve kurallarını anlatan yazılı metin adıdır.",
          "Değerler bütünü ile belirli meslek örgütünün adı aynı düzey değildir. Cömert davranan her kişiyi tarihî Ahi teşkilatının kayıtlı üyesi sayamazsın. Ortak ahlaki ilke, kurumların birebir aynı tarihî örgüt olduğunu tek başına kanıtlamaz.",
        ],
      },
      {
        title: "Ahilik: meslek ve dayanışma",
        paragraphs: [
          "Ahilik Anadolu’da esnaf ve zanaatkârların meslek eğitimi, çalışma ahlakı ve yardımlaşmasıyla ilişkilidir. Usta-kalfa-çırak ilişkisi becerinin kuşaktan kuşağa aktarılmasına katkı sağlar. Güvenilir üretim ve ticari dürüstlük toplumsal hayatla bağ kurar.",
          "Kurumsal çekirdeği yalnız iyi niyetle açıklama; hangi işi kimin nasıl öğrendiğini ve hangi hakkın korunduğunu göster. Kurumun şehir hayatında etkili olması her olası siyasî işin onun ana programı olduğu anlamına gelmez. Temel görev ile dolaylı etki ayrı değerlendirilir.",
        ],
      },
      {
        title: "Ahilikte konukseverlik ve yerleşme",
        paragraphs: [
          "Ahi birlikleri kaynaklarda yolcu ağırlama, ihtiyaç sahibine destek, meslek kazandırma ve göçmenlerin yerleşik hayata uyumu gibi hizmetlerle anlatılır. İbn Battûta’nın gözlemleri bu toplumsal yönü tasvir eden tarihî kaynaklardandır.",
          "Bir seyyahın övgüsü önemli tanıklıktır ama her şehirde her zaman kusursuzluk ölçümü değildir. Anlatılan somut faaliyetle genel değerlendirmeyi ayır. Tarihî örnekten bugünkü kurumun aynı ad ve örgütlenmeyle birebir devam ettiği sonucu da kendiliğinden çıkmaz.",
        ],
      },
      {
        title: "Âlim, fakih, mutasavvıf ve veli",
        paragraphs: [
          "Âlim bilgiyle uğraşan kişi; fakih fıkıh yani dinî hukuk alanında uzman; mutasavvıf manevi eğitim ve tasavvufla ilgilenen kişi olarak açıklanır. Veli dinî gelenekte Allah’a yakınlıkla anılan kişi için kullanılan terimdir. Aynı şahsiyet birden çok alanda etkili olabilir.",
          "Bu terimler kişiyi bütün hayatı boyunca tek işe kapatan etiketler değildir. Birinin fıkıh alanında tanınması başka konuda hiç eser vermediği anlamına gelmez. Soruda hangi alanı destekleyen eser veya fiil varsa onu kullan.",
        ],
      },
      {
        title: "Ebû Hanîfe ve hukukî düşünce",
        paragraphs: [
          "Asıl adı Numan bin Sabit olan Ebû Hanîfe, İmam-ı Âzam adıyla da anılır. Hukukî yorum ve içtihadın gelişimindeki rolüyle Hanefî fıkıh geleneğinin merkezî şahsiyetidir. İnanç meseleleri üzerine görüş ve eserleri de bulunur.",
          "Onu öncelikle fıkıhla tanıtmak bütün çalışmasının yalnız bundan ibaret olduğu iddiası değildir. Bir metin inanç konusundaki eserini soruyorsa o veriye göre düşünülür. Alanın baskın örneği ile kişinin bütün eser listesini ayrı tut.",
        ],
      },
      {
        title: "Cafer es-Sâdık ve Caferî gelenek",
        paragraphs: [
          "Cafer es-Sâdık hadis ve fıkıh birikimiyle tanınan, farklı İslam çevrelerinde saygıyla anılan şahsiyettir. Caferî fıkıh geleneği onun görüşleriyle ilişkilidir. On iki imamı esas alan İmamiye çerçevesiyle de tarihî ve düşünsel bağı bulunur.",
          "Fıkhi gelenek ile itikadi-siyasi çerçeveyi aynı tek tanım yapma. Bir soru ibadet ve işlemlerin hükümlerini istiyorsa fıkıh alanı öne çıkar. Ortak imamlık bağı bütün Şia alt ekollerinin her ayrıntıyı aynı yorumladığı sonucunu vermez.",
        ],
      },
      {
        title: "Mâtürîdî ve akıl-nakil ilişkisi",
        paragraphs: [
          "Ebû Mansur Mâtürîdî Semerkant çevresinde yetişmiş, kelam ve tefsir çalışmalarıyla tanınmıştır. Kitâbü’t-Tevhîd inanç esaslarını gerekçelendirme; Te’vîlâtü’l-Kur’an ise tefsir alanıyla ilişkilidir. Akıl, duyular ve doğru haber bilgi kaynakları arasında ele alınır.",
          "Akla yer verilmesi vahyin bütünüyle dışlandığı anlamına gelmez. Bir kişinin iki farklı eserinin bulunması alanların eş anlamlı olduğunu da göstermez. Eserin adı, konusu ve düşünürle bağlantısını birlikte kontrol et.",
        ],
      },
      {
        title: "Şâfiî ve fıkıh usulü",
        paragraphs: [
          "Muhammed bin İdris Şâfiî fıkıh usulünün sistemleştirilmesindeki katkısıyla tanınır. Er-Risâle yöntem tartışmalarıyla, el-Ümm fıkıh birikimiyle ilişkili eserleridir. Şâfiîlik onun görüşleri etrafında gelişen fıkhi gelenektir.",
          "Fıkıh usulü hüküm çıkarma yöntemlerini inceleyen alandır; yalnız kelamın başka adı değildir. Bir eser adındaki benzer kelimelerden yazarı tahmin etmek yerine açık kişi-eser bağını öğren. Aynı dönemdeki bilginler farklı eserler vermiş olabilir.",
        ],
      },
      {
        title: "Eş’arî ve kelam geleneği",
        paragraphs: [
          "Ebülhasan Eş’arî inanç esaslarının açıklanması ve savunulmasındaki çalışmalarıyla tanınır. Makâlâtü’l-İslâmiyyîn farklı görüşleri ele alan eserlerindendir. Eş’arîlik ve Mâtürîdîlik Ehlisünnet içindeki itikadi gelenekler olarak anılır.",
          "İki geleneğin bulunması bütün mensuplarının her konuda tamamen zıt olduğu anlamına gelmez. Metni önemsemek akıl yürütmenin hiç kullanılmaması değildir. Bir soruda hangi yöntem veya eser açıkça verilmişse ona dayan; tek anahtar kelimeden bütün düşünceyi çıkarma.",
        ],
      },
      {
        title: "Ahmed Yesevî ve hikmetler",
        paragraphs: [
          "Hoca Ahmed Yesevî Türkistan ve Yesi çevresindeki etkisiyle tanınır. Dinî ve ahlaki öğütlerin sade Türkçeyle aktarılması, düşüncelerinin yayılmasında önemli rol oynamıştır. Hikmet adı verilen manzumeler Divân-ı Hikmet geleneğinde toplanmıştır.",
          "Öğretinin Anadolu ve Balkanlar’da etkili olması Yesevî’nin bütün bu yerlerde yaşadığını kanıtlamaz. Etki, takipçiler ve eserler aracılığıyla da taşınabilir. Eser adını genel şiir türüyle eşitleme; her öğüt şiiri Divân-ı Hikmet değildir.",
        ],
      },
      {
        title: "Mevlânâ ve irfan edebiyatı",
        paragraphs: [
          "Mevlânâ Celâleddîn-i Rûmî Konya’yla ilişkili âlim, mutasavvıf ve şairdir. Mesnevî, Divân-ı Kebîr ve Fîhi Mâ Fîh eserleriyle tanınır. Düşüncelerinin okunması ve çevrilmesi etki alanını genişletmiştir.",
          "Eserlerinin başka ülkelerde okunması oralarda doğduğunu veya her okuyanın aynı geleneğe mensup olduğunu göstermez. Mevlevilik onun mirasının sonraki kurumsallaşmasıyla ilişkilidir. Kişinin hayatıyla sonraki geleneğin gelişimini aynı tek olay yapma.",
        ],
      },
      {
        title: "Ahi Evran ve Kırşehir",
        paragraphs: [
          "Ahi Evran Ahiliğin Anadolu’daki gelişiminde etkili âlim ve mutasavvıf olarak tanınır. Kırşehir, esnaf teşkilatlanması ve meslek ahlakı onunla ilişkilendirilen başlıca ipuçlarıdır. İş yerindeki usta-kalfa-çırak ilişkisiyle toplumsal dayanışma birlikte ele alınır.",
          "Ahi Evran’ı yalnız şehir adıyla değil yaptığı işle tanı. Kırşehir’de geçen her olay onunla ilgili değildir; meslek örgütlenmesi veya açık kişi bilgisi de aranır. Bir kurumun etkisini tek kişinin bütün faaliyetlerin tek başına yürütülmesi şeklinde yorumlama.",
        ],
      },
      {
        title: "Hacı Bektaş-ı Velî",
        paragraphs: [
          "Hacı Bektaş-ı Velî Horasan erenleri ve Sulucakarahöyük çevresiyle ilişkili şahsiyettir. Makâlât ona nispet edilen temel eserler arasında anılır. İnsana saygı, ahlaki eğitim ve kişinin eline, diline, davranışlarına sahip olması öğretileriyle tanınır.",
          "Kaynakların ayrıntılı hayat tarihlerinde farklılıklar bulunabilir; bu ünitede doğrulanmamış doğum-ölüm yarışı kurulmaz. Bektaşilik onun adına gelişen tarihî mirastır; bütün sonraki kurumsal biçimleri onun hayatıyla aynı zaman dilimine koyma.",
        ],
      },
      {
        title: "Yunus Emre ve Türkçe şiir",
        paragraphs: [
          "Yunus Emre dinî ve ahlaki anlamları halkın anlayacağı Türkçeyle işleyen şiirleriyle tanınır. Divan ve Risâletü’n-Nushiyye başlıca eser adlarıdır. Tapduk Emre’yle ilişkisi gelenek içinde anılır; ayrıntılı hayatı hakkında farklı rivayetler vardır.",
          "Yunus’u tanımak için her şiirin tek bir kişiye ait olduğunu varsayma. Aynı şekilde farklı yerlerde makamlarının bulunması bir bedenin bütün yerlerde gömülü olduğunun fiziksel kanıtı değildir. Makam, hatıra ve tarihî mezar bilgisini ayır.",
        ],
      },
      {
        title: "Sarı Saltuk: tarih ve menkıbe",
        paragraphs: [
          "Sarı Saltuk Anadolu ve Balkanlar’daki dinî-kültürel etkiyle ilişkili alperendir. Dobruca gibi bölgelerdeki tekke geleneği ve adına oluşan anlatılar kaynaklarda yer alır. Saltuknâme onun etrafındaki menkıbeleri de içeren edebî mirastır.",
          "Menkıbe dinî-kültürel hafızayı anlamaya yardım eder; her ayrıntısı bağımsız tarihî belgeyle aynı kanıt türünde değildir. Çok sayıda makamın anılması etki ve sahiplenmeyi gösterebilir. Bunlardan bütün olayların aynı biçimde gerçekleştiğini ölçmüş gibi sonuç çıkarma.",
        ],
      },
      {
        title: "Hacı Bayrâm-ı Velî ve dayanışma",
        paragraphs: [
          "Hacı Bayrâm-ı Velî Ankara’yla, öğretim hayatıyla ve toplumsal yardımlaşmayla ilişkilidir. Somuncu Baba’dan aldığı manevi eğitim gelenekte anılır. Üretim, yoksula yardım ve halkla birlikte yaşama, öğretisinin toplumsal boyutunu görünür kılar.",
          "Yardımlaşma tek başına her şahsiyeti ayırmayabilir; Ankara, öğretim ve açık isim gibi ek kanıtlar gerekir. Kişinin bir değerle tanınması başka kişilerde o değerin bulunmadığı anlamına gelmez. Ortak değer ve ayırt edici biyografik bilgi ayrı kullanılır.",
        ],
      },
      {
        title: "Etki coğrafyası ve eser ilişkisi",
        paragraphs: [
          "Bir şahsiyetin yaşadığı şehir, eserinin okunduğu yer ve sonraki kurumların yayıldığı bölge üç ayrı ilişkidir. Bir metnin çevrilmesi eseri yeni okurlara ulaştırabilir; bu yazarın oraya seyahat ettiğinin kanıtı değildir. Kültürel etki doğrudan ve dolaylı yollarla oluşabilir.",
          "Kişi-eser-yer tablosunda her oku ayrı gerekçeyle kur. Eser adı uyuşuyor diye bütün coğrafya iddialarını otomatik kabul etme. Yeni bir veri geldiğinde yalnız değişen ilişkiyi güncellemek, bilgi ağını toptan aynılaştırmaktan daha dikkatli bir okumadır.",
        ],
      },
      {
        title: "Nisâ 69: örneklik ve birlikte olma",
        paragraphs: [
          "Nisâ 69’da Allah’a ve elçiye itaat edenlerin peygamberler, sıddıklar, şehitler ve salihlerle birlikte olması anlatılır. Bu gruplar dinî örneklik ve iyi kimselerle beraberlik mesajıyla anılır. Sıddık doğrulukta samimiyet, salih iyi ve doğru davranışla ilişkilidir.",
          "Ayet Anadolu’daki bütün şahsiyetleri isim isim veya meslek kurumlarını programlarıyla saymaz. Bir kurumun ahlaki değerleriyle ilişki kurulabilir; fakat metinde bulunmayan eser adı, şehir veya meslek sıralaması açık ayet içeriği gibi sunulmaz. Her yorumun kanıtını ayrı göster.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı başlık, ayrı yazar",
        prompt:
          "Bir çalışma iki kart gösteriyor: Hacı Bektaş-ı Velî’ye nispet edilen Makâlât ve Eş’arî’nin Makâlâtü’l-İslâmiyyîn eseri. Öğrenci başlıklar benzediği için iki kartın aynı kitap olduğunu söylüyor.\nÖnce hangi kontrol gerekir?\nA) Yalnız ortak heceleri saymak. B) Eserin tam adı, ilgili şahsiyet ve konusunu karşılaştırmak. C) İki şahsiyeti aynı kişi ilan etmek. D) Bütün eser adlarını silmek. E) Bir eserin varlığını ötekinin yokluğu saymak.",
        strategy: "Benzer başlığı tam kimlik eşitliği yerine koyma.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "İki kartın eser adları tam olarak aynı değildir.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Şahsiyet bağları da farklıdır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "B tam ad ve bağlamı kontrol ederek karışıklığı giderir; benzerlik tek başına özdeşlik vermez.",
          },
        ],
        answer: "B: Eserin tam adı, ilgili şahsiyet ve konusunu karşılaştırmak",
        check: "Her iki eseri tam adı ve bağlı olduğu kişiyle yazdın mı?",
        pitfall: "Makâlât ortaklığından iki ayrı eseri tek kitap saymak.",
      },
      {
        title: "Şiirin temasından yazar çıkmaz",
        prompt:
          "Bir arşivde sevgi ve dürüstlüğü konu eden imzasız bir şiir bulunuyor. Görevli, yalnız bu temaları görüp şiirin kesin Yunus Emre’ye ait olduğunu ilan ediyor; nüsha veya yazar kaydı göstermiyor.\nHangi bilgi eklenmeden kesin atıf zayıftır?\nA) Şiirde bir tema bulunması. B) Şiirin Türkçe okunabilmesi. C) Yazarlığı destekleyen nüsha ve kaynak kaydı. D) Arşivin bir odada olması. E) Görevlinin bir yorum yapması.",
        strategy:
          "Ortak temayla özgül eser sahipliği arasındaki kanıt farkını koru.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Verilen kanıt genel ahlaki temalardır.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Bu temalar birden fazla şairde bulunabilir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "C özgül yazar atfı için gerekli belge türünü gösterir.",
          },
        ],
        answer: "C: Yazarlığı destekleyen nüsha ve kaynak kaydı",
        check: "Başka bir şair aynı temaları işleyebilir mi?",
        pitfall:
          "Bir şairin bilinen temasını bütün benzer şiirlerin sahiplik kanıtı saymak.",
      },
      {
        title: "Ahlak ilkesini işte görünür kıl",
        prompt:
          "Kurmaca bir Ahi atölyesinde usta, terazinin bozuk olduğunu görünce satışları durduruyor ve ölçüm düzeltilmeden mal teslim etmiyor.\nBu olayda meslek ahlakını somutlaştıran fiil nedir?\nA) Yalnız atölye adının bulunması. B) Yalnız ustanın yaşça büyük olması. C) Bütün esnafın hiç hata yapmadığının ilanı. D) Hak kaybını önlemek için hatalı ölçümle satışı durdurması. E) Devlet adamı yetiştirme programı açması.",
        strategy: "İlkeyi kişinin unvanından değil yaptığı işten çıkar.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Somut sorun bozuk terazidir.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Usta düzeltme öncesi satışı durdurur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "D müşteri hakkına dönük davranışı gösterir; unvan veya bütün esnaf hakkında garanti değildir.",
          },
        ],
        answer: "D: Hak kaybını önlemek için hatalı ölçümle satışı durdurması",
        check: "Ahlak yorumunu hangi gözlenen karar destekliyor?",
        pitfall:
          "Kurum adı görünce somut davranışa bakmadan kusursuzluk varsaymak.",
      },
      {
        title: "Tek zaman çizgisi herkesi kapsamaz",
        prompt:
          "Kurmaca bir kaynakta A topluluğunun erken bir tarihte, B topluluğunun ise daha sonraki dönemde yeni dinle temas kurduğu yazıyor. C topluluğunun tarihi belirtilmiyor.\nBu kaynakla hangi çizelge kurulabilir?\nA) A, B ve C aynı tarihte değişti. B) Yalnız B vardır, A silinmelidir. C) C’nin tarihi kesin A’dan öncedir. D) A ve B için ayrı kayıt korunur; C için tarih açık bırakılır. E) Tarih belirtilmeyen C hiç yaşamamıştır.",
        strategy: "Verilen tarihleri koru, boş hücreyi tahminle doldurma.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "A ve B için iki ayrı zaman verilir.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "C’nin zamanı belirtilmemiştir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "D iki kaydı tutar ve eksik tarihi açık bırakır; diğerleri kanıt ekler veya siler.",
          },
        ],
        answer:
          "D: A ve B için ayrı kayıt korunur; C için tarih açık bırakılır",
        check: "Bilinmeyen tarih yokluk veya aynı tarih demek mi?",
        pitfall:
          "Bir grubun tarihini bütün diğer topluluklara otomatik taşımak.",
      },
      {
        title: "Menkıbede ölçülen şey",
        prompt:
          "Bir Saltuknâme incelemesi aynı şahsiyet etrafında farklı bölgelerde anlatılan hikâyeleri topluyor. Araştırmacı bu örnekleri kültürel hafızanın yayılması bakımından kullanıyor.\nHangi soru bu kaynak türüne doğrudan uygundur?\nA) Hangi bölgelerde hangi anlatıların aktarıldığı. B) Bütün olayların kesin fiziksel dakika hesabı. C) Tek bir bedenin aynı anda kaç yerde bulunduğu. D) Her anlatının bağımsız deneyle doğrulandığı. E) Her dinleyicinin bütün inanç ayrıntısı.",
        strategy:
          "Kaynağı kendi cevaplayabildiği araştırma sorusuyla eşleştir.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "İnceleme anlatıları ve aktarıldıkları bölgeleri toplar.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Bu veri kültürel dolaşımı araştırmaya elverişlidir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "A doğrudan bu veriyi sorar; diğerleri verilmemiş fiziksel veya kişisel ölçüm ister.",
          },
        ],
        answer: "A: Hangi bölgelerde hangi anlatıların aktarıldığı",
        check:
          "Kültürel hafıza sorusunu belgeyle doğrulanmış olay sorusundan ayırdın mı?",
        pitfall: "Bir menkıbe derlemesinden deney veya dakika ölçümü istemek.",
      },
      {
        title: "Nitelikleri somut fiille gerekçelendir",
        prompt:
          "Alıştırmada sıddık, doğrulukta samimiyet; salih ise iyi ve yararlı davranışla ilişkilendirilir. Kurmaca bir kişi kendisine kazanç sağlayacak yanlış tanıklığı reddediyor; ayrıca komşusunun bozulan basamağını güvenli biçimde onarıyor. Alıştırma kişinin bütün dinî statüsünü ölçmüyor.\nVerilen tanımlarla hangi yorum gerekçelidir?\nA) İki fiilin bulunması kişiye bütün hayatı için kusursuzluk garantisi verir. B) Tanıklıkla onarım aynı fiziksel iştir. C) Doğru tanıklık hiçbir nitelikle ilişkilendirilemez. D) Tanıklıkta doğruluk, onarımda yararlı iş vurgusu ayrı ayrı gösterilebilir. E) Niteliklerden biri varsa diğerine ilişkin fiil silinmelidir.",
        strategy:
          "Tanımları ayrı somut fiillere bağla; kişiye bütüncül statü hükmü verme.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "İlk fiil kazanç uğruna yanlış tanıklık yapmayı reddetmektir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "İkinci fiil güvenli onarımla başkasına yarar sağlamaktır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "D her nitelik için ayrı fiil gösterir; diğer seçenekler fiilleri siler veya kişisel garanti ekler.",
          },
        ],
        answer:
          "D: Tanıklıkta doğruluk, onarımda yararlı iş vurgusu ayrı ayrı gösterilebilir",
        check: "Her nitelik için hangi ayrı fiili kanıt olarak kullandın?",
        pitfall:
          "Bir kavram alıştırmasını kişinin bütün dinî statüsünün kesin ölçümü saymak.",
      },
    ],
    recall: [
      {
        prompt:
          "Talas niçin bütün İslamlaşma sürecinin tek açıklaması değildir?",
        answer:
          "Farklı topluluklar, ticaret, göç, eğitim ve siyasal ilişkiler uzun sürece katılır.",
      },
      {
        prompt: "Fütüvvet ile Ahilik hangi düzeylerde ayrılır?",
        answer: "Ahlaki ilkeler bütünü ve onunla ilişkili meslek örgütlenmesi.",
      },
      {
        prompt: "Mâtürîdî’nin iki temel eserini alanlarıyla hatırla.",
        answer: "Kitâbü’t-Tevhîd kelam; Te’vîlâtü’l-Kur’an tefsir.",
      },
      {
        prompt:
          "Divân-ı Hikmet, Mesnevî, Risâletü’n-Nushiyye hangi şahsiyetlerle eşleşir?",
        answer: "Ahmed Yesevî, Mevlânâ ve Yunus Emre.",
      },
      {
        prompt: "Etki coğrafyası neden yaşam yeriyle özdeş değildir?",
        answer:
          "Eserler ve takipçiler kişinin gitmediği yerlere de düşünce taşıyabilir.",
      },
      {
        prompt: "Nisâ 69 hangi dört grubu anar?",
        answer: "Peygamberler, sıddıklar, şehitler ve salihler.",
      },
    ],
  },
];
type QuestionRow024 = {
  passage: string;
  prompt: string;
  options: string[];
  reasons: string[];
  steps: string[];
  knowledge: string[];
  strategy: string;
  commonError: string;
  check: string;
};
const questionRows024: QuestionRow024[][] = [
  [
    {
      passage:
        "Bir kavram panosu, “Ölüm gerçekleşti; yeniden diriliş henüz gerçekleşmedi.” açıklamasını veriyor. Pano başka bir olayın tarihini veya süresini belirtmiyor.",
      prompt: "Panodaki ara dönem hangi kavramdır?",
      options: ["Berzah", "Ba’s", "Haşir", "Mizan", "Tekfin"],
      reasons: [
        "Ölüm ve ba’s arasındaki dönem tanımıdır.",
        "Bu, dönemin sonundaki yeniden dirilme fiilidir.",
        "Diriltilenlerin toplanmasını anlatır.",
        "Amellerin değerlendirilmesiyle ilgilidir.",
        "Cenazenin kefenlenmesi işlemidir.",
      ],
      steps: [
        "Ölüm ilk sınır olarak gerçekleşmiştir.",
        "Diriliş henüz olmadığı için ba’s sonrası evreler seçilemez.",
        "İki sınır arasını karşılayan terim berzahtır.",
      ],
      knowledge: ["Evre tanımı başlangıç ve bitiş koşullarıyla belirlenir."],
      strategy: "İki olayın arasında kalanı bul.",
      commonError: "Ara dönemi onu sona erdiren olayla aynılaştırmak.",
      check:
        "Cevabın hem ölümden sonra hem dirilişten önce koşulunu karşılıyor mu?",
    },
    {
      passage:
        "Bir anlatıda insanlar yeniden diriltiliyor, ardından hesap vermek üzere bir araya getiriliyor. Soru, ilk fiilin değil ikinci fiilin adını istiyor.",
      prompt: "İkinci fiil hangisidir?",
      options: ["Haşir", "Ba’s", "Mahşer", "Berzah", "Hesap"],
      reasons: [
        "İkinci fiil diriltilenlerin toplanmasıdır.",
        "İlk fiili karşılar, sorulan ikinciyi değil.",
        "Toplanılan yerin adıdır.",
        "Dirilişten önceki ara dönemdir.",
        "Toplanmadan sonraki değerlendirme boyutudur.",
      ],
      steps: [
        "İlk eylem yeniden diriltilmedir.",
        "Kök özellikle ardından gelen bir araya getirilmeyi sorar.",
        "Toplanma eylemi haşirdir; yer adı mahşerle karıştırılmaz.",
      ],
      knowledge: ["Fiilin sırası ve türü birlikte okunmalıdır."],
      strategy: "Sorulan sırayı belirleyip eylemi adlandır.",
      commonError: "İlk tanıdık kavramı seçip ikinci fiili atlamak.",
      check: "Seçimin yalnız ikinci eyleme mi karşılık geliyor?",
    },
    {
      passage:
        "Bir öğrenci “Haşir toplanma eylemi, mahşer toplanma yeridir.” diye not alıyor. Ardından “İnsanlar hangi yerde bir araya getirildi?” sorusunu cevaplıyor.",
      prompt: "Bu soruda hangi terim istenir?",
      options: ["Mahşer", "Haşir", "Ba’s", "Mizan", "Teşyî"],
      reasons: [
        "Kök nerede sorusuyla yeri istemektedir.",
        "Ne oldu sorusuna karşılık gelen eylemdir.",
        "Dirilişin fiilidir, yer adı değildir.",
        "Tartı-değerlendirme kavramıdır.",
        "Cenazeyi taşıma ve uğurlamadır.",
      ],
      steps: [
        "Not iki terimin türünü ayrı verir.",
        "Yeni soru hangi yerde diyerek mekânı ister.",
        "Bu nedenle eylem haşir değil, yer mahşer seçilir.",
      ],
      knowledge: [
        "Aynı kökle ilişkili kelimeler farklı sorulara cevap verebilir.",
      ],
      strategy: "Soru sözcüğünün eylem mi yer mi istediğini denetle.",
      commonError: "Yakın kelimeleri yalnız sesinden ayırt etmeye çalışmak.",
      check: "Cevabını “toplanılan yer” diye açabiliyor musun?",
    },
    {
      passage:
        "Bir dinî metin yorumunda kıyamet, bir bölümde dünya düzeninin sonu; başka bölümde diriliş ve hesap günü bağlamında kullanılıyor. Öğrenci kelimenin her metinde yalnız tek dar olayı anlatmak zorunda olduğunu söylüyor.",
      prompt: "Hangi düzeltme uygundur?",
      options: [
        "Anlamı cümlenin bağlamı ve fiiliyle belirlemek gerekir.",
        "Kelime yalnız kefenleme anlamındadır.",
        "İki metinden biri yalnız kelime tekrarından dolayı yanlıştır.",
        "Kıyamet ile mahşer her durumda aynı tür yer adıdır.",
        "Kelimenin bütün kullanımları kesin bir takvim tarihi verir.",
      ],
      reasons: [
        "İki kullanımın varlığı bağlamın önemini gösterir.",
        "Her iki verilen bağlam da bu tanımı dışlar.",
        "Farklı kullanım tek başına çelişki değildir.",
        "Kıyamet yalnız mekân adı olarak verilmemiştir.",
        "Kullanımlar tarih bilgisi içermiyor.",
      ],
      steps: [
        "İlk parçada kozmik düzenin sonu vurgulanır.",
        "İkinci parçada daha geniş gün bağlamı vardır.",
        "Zorunlu tek dar anlam kuralı yerine bağlama göre okuma gerekir.",
      ],
      knowledge: [
        "Terimlerin anlam alanı öğretim şemasından daha geniş olabilir.",
      ],
      strategy: "Açık fiilleri iki kullanım arasında karşılaştır.",
      commonError: "Bir şemadaki dar kullanımı kelimenin bütün anlamı saymak.",
      check: "Düzeltmen iki cümleyi de açıklamaya izin veriyor mu?",
    },
    {
      passage:
        "Bir anlatı ölüm sonrası hayatı diriliş, toplanma, hesap ve karşılık boyutlarıyla ele alıyor. Yazar bu boyutların tamamını kapsayan üst kavramı soruyor.",
      prompt: "Hangi cevap kapsamı karşılar?",
      options: [
        "Ahiret",
        "Yalnız haşir",
        "Yalnız ba’s",
        "Yalnız tekfin",
        "Yalnız taziye",
      ],
      reasons: [
        "Ölüm sonrası hayatın geniş bütünüdür.",
        "Bütünün yalnız toplanma boyutudur.",
        "Yalnız yeniden dirilme fiilidir.",
        "Dünya hayatındaki cenaze hazırlığıdır.",
        "Yaşayan yakınlara destek uygulamasıdır.",
      ],
      steps: [
        "Liste birden fazla ölüm sonrası boyut içerir.",
        "Yalnız bir boyutun adı bütün listeyi karşılamaz.",
        "Geniş üst kavram ahiret olarak seçilir.",
      ],
      knowledge: ["Bütünün adı bir alt evreyle değiştirilmez."],
      strategy: "İstenen kapsamı listedeki bütün maddelerle sınayarak seç.",
      commonError: "Tek bir evreyi bütün ölüm sonrası hayatla özdeşleştirmek.",
      check: "Yanıtın dirilişi de hesabı da kapsıyor mu?",
    },
    {
      passage:
        "Bir ünitede, ölüm sonrası sorumluluk bilinci Kur’an ve sünnete dayanan dinî öğreti olarak anlatılıyor. Metinde laboratuvar ölçümü veya kontrollü deney raporu bulunmuyor.",
      prompt: "Bu bilgiyi sunmanın doğru yolu hangisidir?",
      options: [
        "Dinî öğretinin anlamını kendi kaynak çerçevesiyle açıklamak.",
        "Deney yapılmış gibi sayısal sonuç ilan etmek.",
        "Metni kimyasal tepkime denklemi saymak.",
        "Her insanın aynı davranışta bulunduğunu kanıtlamak.",
        "Okuyanın kişisel inancını otomatik ölçmek.",
      ],
      reasons: [
        "Verilen bilgi türü bu çerçevededir.",
        "Deney veya ölçüm verisi yoktur.",
        "Konu dinî öğretidir, tepkime değil.",
        "Kaynak türü evrensel davranış ölçümü vermez.",
        "Ders metni kullanıcının iç dünyasının verisi değildir.",
      ],
      steps: [
        "Kaynağın Kur’an ve sünnet olduğu belirtilir.",
        "Ölçüm veya deney sonucu sunulmamıştır.",
        "Anlam açıklaması dinî kaynak çerçevesinde tutulur.",
      ],
      knowledge: ["Kanıt türü iddianın sunuluşunu sınırlar."],
      strategy: "Kaynağı ve yapılan iddiayı ayrı belirle.",
      commonError: "Dinî anlatıyı yapılmamış deneyin sonucu gibi sunmak.",
      check: "Sunumunda gerçekten olmayan bir deney ekliyor musun?",
    },
    {
      passage:
        "Bir öğrenci “Bu bahçede bir mevsim çalışacağız; süre sınırlı olduğuna göre bitkilere ve ortak araçlara özen göstermenin değeri yok.” diyor. Arkadaşı geçiciliğin sorumluluğu ortadan kaldırmadığını hatırlatıyor.",
      prompt: "Öğrencinin eklediği varsayım hangisidir?",
      options: [
        "Geçici olan her işin değersiz olduğu.",
        "Bahçede çalışma süresinin sınırlı olduğu.",
        "Ortak araçların bulunduğu.",
        "Bitkilerin bahçede olduğu.",
        "Arkadaşının farklı yorum yaptığı.",
      ],
      reasons: [
        "Sınırlı süreden değersizliğe bu ek varsayımla atlıyor.",
        "Bu zaten verilmiş bilgidir.",
        "Bu da açık veridir.",
        "Bu ifade geçicilikten değersizliğe geçişi açıklamaz.",
        "Bu gözlem, hatalı mantık bağının kendisi değildir.",
      ],
      steps: [
        "Verilen olgu çalışma süresinin sınırlı oluşudur.",
        "Sonuç özenin değersiz olduğu iddiasıdır.",
        "Bu geçiş geçici olanı değersiz sayan kanıtsız varsayımı içerir.",
      ],
      knowledge: ["Süre ile ahlaki sorumluluk aynı ölçüt değildir."],
      strategy: "Öncülle sonuç arasındaki ek cümleyi bul.",
      commonError: "Geçiciliği otomatik değersizlikle eşitlemek.",
      check: "Varsayımın süre bilgisine eklenen değer hükmünü açıklıyor mu?",
    },
    {
      passage:
        "Bir dinî öğüt, hesap verme bilincinin insanı dürüst davranmaya yöneltebileceğini söylüyor. Başka biri buradan bu inanca sahip her kişinin bütün hayatında hiç hata yapmadığı sonucunu çıkarıyor.",
      prompt: "Bu çıkarımın sorunu nedir?",
      options: [
        "Yönelişten bütün kişiler için hatasızlık garantisi çıkarır.",
        "Dürüstlükten hiç söz edilmemiştir.",
        "Hesap kavramı yalnız gömme işlemidir.",
        "Yönelme sözcüğü davranışın imkânsız olduğunu kanıtlar.",
        "Öğüt yalnız mezar yerinin ölçüsünü verir.",
      ],
      reasons: [
        "Öğüt evrensel davranış ölçümü değildir.",
        "Dürüstlük açıkça öğüdün konusudur.",
        "Tanım başka alana taşınmıştır.",
        "Böyle bir olumsuzluk yoktur.",
        "Mekân ölçüsü sunulmuyor.",
      ],
      steps: [
        "Öğüt bir davranışa yöneltici ilişki kurar.",
        "Yeni iddia herkes ve hiç hata yapmama kapsamındadır.",
        "Bu evrensel garanti için pasajda veri bulunmaz.",
      ],
      knowledge: ["Normatif öğütle ölçülmüş davranış sonucu ayrıdır."],
      strategy: "Kapsamı büyüten niceleyicileri karşılaştır.",
      commonError:
        "Bir dinî değerden bütün mensuplar için kusursuzluk sonucu çıkarmak.",
      check: "Herkes ve bütün hayat sözlerinin ayrı kanıtı var mı?",
    },
    {
      passage:
        "Bir kavram kartı dünyadaki davranışların kaydedilmesini, ikinci kart bu davranışların sorgulanmasını anlatıyor. Kartların birbirinin aynı işlem olduğu ileri sürülüyor.",
      prompt: "Hangi ayrım doğrudur?",
      options: [
        "Amel defteri kayıtla, hesap değerlendirme ve sorgulamayla ilişkilidir.",
        "İki kart yalnız cenazenin taşınmasını anlatır.",
        "İki kavramın ikisi de yalnız yer adıdır.",
        "Kayıt bulunması sorgulama kavramını anlamsızlaştırır.",
        "Hesap yalnız kefen bezinin adıdır.",
      ],
      reasons: [
        "İki kartın ayrı işlevlerini karşılar.",
        "Taşıma fiili yoktur.",
        "Kayıt ve sorgulama mekân adı değildir.",
        "İşlevler ilişkili olarak birlikte bulunabilir.",
        "Kefenleme farklı kavramdır.",
      ],
      steps: [
        "İlk kartta yapılanlar kayda alınır.",
        "İkinci kartta yapılanlar sorgulanır.",
        "İlişkili iki işlev, aynı işlem sayılmadan adlandırılır.",
      ],
      knowledge: ["Bir kayıtla ona dayanan değerlendirme ayrı işlemlerdir."],
      strategy: "İki kartın yüklemlerini karşılaştır.",
      commonError: "İlişkili kavramların işlevini tekleştirmek.",
      check: "Her kavram için farklı bir fiil gösterebiliyor musun?",
    },
    {
      passage:
        "Bir açıklama, ahirette amellerin tartılmasını mizan kavramıyla ilişkilendiriyor. Açıklama insanın bu tartının mahiyetini bütünüyle bilip sayısal bir sonuç hesaplayabileceğini söylemiyor.",
      prompt: "Hangisi bu açıklamadan çıkarılamaz?",
      options: [
        "Bir kişinin nihai sonucunun uygulamada kesin sayısal puanla hesaplanması.",
        "Amellerin tartılmasıyla ilgili bir kavram kullanıldığı.",
        "Mizan teriminin anıldığı.",
        "Dinî bir değerlendirme bağlamı bulunduğu.",
        "Tartının mahiyetinin insana bütünüyle açıklanmadığı.",
      ],
      reasons: [
        "Böyle bir yöntem veya bilgi verilmemiştir.",
        "Bu doğrudan veridir.",
        "Açıklamada adı açıkça vardır.",
        "Ahiret ve amel bağlamı bunu verir.",
        "Parça bunu sınır olarak açıklar.",
      ],
      steps: [
        "Verilen tema amellerin tartılmasıdır.",
        "İnsana tam hesap yöntemi verildiği söylenmez.",
        "Kesin kişisel puan sonucu bu yüzden eklenemez.",
      ],
      knowledge: ["Şemadaki temsil gerçek kişiye ilahî hüküm üretmez."],
      strategy: "Olumsuz kökte eklenen ölçüm iddiasını ara.",
      commonError:
        "Dinî kavramı kullanıcı için kesin uhrevi puan sistemine çevirmek.",
      check: "Seçeneğinde metnin vermediği bir hesap yöntemi var mı?",
    },
    {
      passage:
        "Bir anlatı, cenneti mükâfat yurdu ve cehennemi ceza bağlamında açıklıyor. Sonra yalnız bir kişinin tek davranışından söz ediyor; kişinin bütün hayatı ve koşulları anlatılmıyor.",
      prompt: "Bu bilgiyle hangi sınır korunmalıdır?",
      options: [
        "Kavramlar açıklanabilir; kişinin kesin ahiret sonucu bu tek veriden ilan edilmez.",
        "Tek davranış bütün hayatı eksiksiz gösterir.",
        "Cennet yalnız cenazeyi yıkama işlemidir.",
        "Cehennem taziye için kullanılan giysidir.",
        "Kavramı öğrenen herkes başka kişilerin sonucunu kesin bilir.",
      ],
      reasons: [
        "Tanım bilgisi bütün kişisel hüküm bilgisi değildir.",
        "Diğer koşullar açıkça verilmemiştir.",
        "Kavramın türü değiştirilmiştir.",
        "Bu da verilen tanıma uymaz.",
        "Böyle bir yetki ve bilgi doğmaz.",
      ],
      steps: [
        "Parça iki sonuç kavramını tanımlar.",
        "Kişi için yalnız tek davranış verilir.",
        "Tanımın kapsamı korunur, eksik kişisel bilgiyle kesin hüküm kurulmaz.",
      ],
      knowledge: [
        "Kavram tanımını bilmek bütün bireysel koşulları bilmek değildir.",
      ],
      strategy: "Tanım ile kişiye atanan sonucu ayır.",
      commonError: "Tek davranışı insanın bütün dinî durumuna yaymak.",
      check:
        "Kişi hakkında verilmemiş başka koşulları kendin tamamlıyor musun?",
    },
    {
      passage:
        "Bir aile, vefat edenin meşru taleplerini ayrı bir dosyada, üçüncü kişilere mevcut borçlarını ayrı bir listede topluyor. Çalışma yalnız bu iki kavramı ayırmayı amaçlıyor; miras oranı hesaplanmıyor.",
      prompt: "Dosya ve liste sırasıyla hangi kavramlarla ilişkilidir?",
      options: [
        "Vasiyet ve borç",
        "Taziye ve tekfin",
        "Haşir ve mahşer",
        "Mizan ve ba’s",
        "Gasil ve defin",
      ],
      reasons: [
        "Ölüm sonrası taleple mevcut yükümlülük ayrılır.",
        "Bunlar başsağlığı ve kefenlemedir.",
        "Ahirette toplanma ve yer ilişkisidir.",
        "Tartı ve diriliş kavramlarıdır.",
        "Yıkama ve toprağa verme fiilleridir.",
      ],
      steps: [
        "Dosya ölüm sonrası yapılması istenen meşru taleplerdir.",
        "Liste başkalarına karşı mevcut yükümlülükleri içerir.",
        "Bu yüzden sırasıyla vasiyet ve borç seçilir; oran eklenmez.",
      ],
      knowledge: ["Vasiyetle borç farklı hak ilişkileridir."],
      strategy: "Belgenin konusu ve yükümlülüğün kaynağını ayır.",
      commonError: "Cenazeyle ilgili bütün hakları tek işlem sanmak.",
      check: "Yanıtın talep ile mevcut yükümlülüğü farklı tutuyor mu?",
    },
    {
      passage:
        "Bir görev çizelgesi cenazenin yıkanmasını, kefenlenmesini, taşınmasını ve defnini birlikte kapsıyor. Çizelgenin başlığı bu işlemlerin genel adını istemektedir.",
      prompt: "En uygun üst başlık hangisidir?",
      options: [
        "Teçhiz",
        "Yalnız tekfin",
        "Yalnız gasil",
        "Yalnız taziye",
        "Yalnız mahşer",
      ],
      reasons: [
        "Uğurlama ve hazırlık işlemlerinin bütününü kapsar.",
        "Sadece kefenleme alt işlemidir.",
        "Yalnız yıkama alt işlemidir.",
        "Yaşayan yakınlara destekle ilgilidir.",
        "Ahirette toplanılan yerin adıdır.",
      ],
      steps: [
        "Çizelgede birden fazla cenaze işlemi vardır.",
        "Kefenleme veya yıkama tek başına bütün listeyi kapsamaz.",
        "Genel başlık teçhizdir.",
      ],
      knowledge: ["Üst kavram birden fazla alt işlemi içerebilir."],
      strategy: "Başlığın listedeki tüm işlemleri kapsayıp kapsamadığını sına.",
      commonError: "Alt işlemin adını tüm hazırlık sürecine vermek.",
      check: "Seçimin taşıma ve defni de içine alıyor mu?",
    },
    {
      passage:
        "Bir anlatımda cenaze usulüne uygun yıkandıktan sonra kefene sarılıyor. Soru yalnız kefene sarılma fiilinin adını istiyor.",
      prompt: "Hangi kavram seçilir?",
      options: ["Tekfin", "Gasil", "Taziye", "Teşyî", "Ba’s"],
      reasons: [
        "Belirleyici fiil kefenlemedir.",
        "Önceki yıkama fiilidir.",
        "Yakınlara başsağlığı dilemektir.",
        "Taşıma ve uğurlama boyutudur.",
        "Ölüm sonrası yeniden dirilmedir.",
      ],
      steps: [
        "Önce yıkama, sonra kefenleme yapılmıştır.",
        "Kök yalnız ikinci somut fiili ister.",
        "Kefene sarılma tekfin olarak adlandırılır.",
      ],
      knowledge: [
        "Bir süreçte sıra kadar sorulan fiilin nesnesi de önemlidir.",
      ],
      strategy: "İstenen eylemi öncesindeki işten ayır.",
      commonError: "Kefenleme sorusunda önceki yıkamayı seçmek.",
      check: "Kefen sözcüğünün karşılığı yanıtında korunuyor mu?",
    },
    {
      passage:
        "Dinî sorumluluğu bulunan bir toplulukta gerekli cenaze görevi bir grup tarafından yeterince yerine getiriliyor. Tanım, bu durumda aynı görevin diğer sorumlulardan düştüğünü söylüyor.",
      prompt: "Bu sorumluluk türü hangisidir?",
      options: [
        "Farz-ı kifaye",
        "Farz-ı ayn",
        "Sırf âdet",
        "Henüz yapılmamış niyet",
        "Her durumda sorumluluk yokluğu",
      ],
      reasons: [
        "Yeterli yerine getirmeyle diğerlerinden düşen görevdir.",
        "Her kişinin bizzat yükümlü olduğu türdür.",
        "Verilen tanım dinî yükümlülük içerir.",
        "Görevin fiilen yapıldığı açıkça söylenir.",
        "Yeterli yerine getirme koşulu silinmektedir.",
      ],
      steps: [
        "Tanım toplumsal bir görevi verir.",
        "Bir grup görevi yeterince tamamlamıştır.",
        "Bu koşulla diğerlerinden düşmesi farz-ı kifayeyi gösterir.",
      ],
      knowledge: ["Koşullu yükümlülükte koşul gerçekten sağlanmalıdır."],
      strategy: "Görevin yapılmış olma şartını kontrol et.",
      commonError: "Kifaye görevini hiç yapılmasa da düşen sorumluluk saymak.",
      check: "Cevabın yeterince yerine getirme koşulunu içeriyor mu?",
    },
    {
      passage:
        "Bir bilgi notu cenaze namazının ayakta ve dua niteliğinde kılındığını, rükû ile secde içermediğini belirtiyor.",
      prompt: "Hangi yargı bu nota aykırıdır?",
      options: [
        "Cenaze namazında rükû ve secde zorunlu aşamalardır.",
        "Dua niteliği vardır.",
        "Ayakta kılınır.",
        "Vefat eden için dua bağlamı taşır.",
        "Bütün namaz biçimleri aynı hareket dizisine indirgenemez.",
      ],
      reasons: [
        "Not iki hareketin bulunmadığını açıkça söyler.",
        "Bu notta açıkça verilir.",
        "Duruş biçimi açıkça belirtilir.",
        "Cenaze namazının niteliğiyle uyumludur.",
        "Verilen örnek hareket farkını gösterir.",
      ],
      steps: [
        "Notta ayakta durma ve dua vardır.",
        "Rükû ve secde açıkça dışlanmıştır.",
        "Bu hareketleri zorunlu ekleyen yargı nota aykırıdır.",
      ],
      knowledge: [
        "Özel bir ibadet tanımı başka ibadetlerden aynen hareket aktararak kurulmaz.",
      ],
      strategy: "Açık dışlama ile seçeneğin eklediği hareketi karşılaştır.",
      commonError: "Bildiği namaz düzenini cenaze namazına bütünüyle taşımak.",
      check: "Seçtiğin yargı nottaki hangi açık olumsuzlukla çatışıyor?",
    },
    {
      passage:
        "Bir komşu, vefat edenin ailesine başsağlığı diliyor ve o günkü yemek hazırlığını üstlenerek yüklerini hafifletiyor. Metin cenazenin bedenine yapılan bir işlem anlatmıyor.",
      prompt: "En doğrudan hangi alan vardır?",
      options: [
        "Taziye ve yakınlara somut destek",
        "Tekfin",
        "Ba’s",
        "Mahşer",
        "Gasil",
      ],
      reasons: [
        "Söz ve emek yaşayan ailenin acı ve yüküne yönelir.",
        "Kefenleme fiili yoktur.",
        "Yeniden dirilme anlatılmıyor.",
        "Ahirette yer bilgisi verilmez.",
        "Bedenin yıkanması anlatılmıyor.",
      ],
      steps: [
        "Muhatap yaşayan aile üyeleridir.",
        "Başsağlığı ve yemek hazırlığı onların yükünü hafifletir.",
        "Bu, beden işlemlerinden ayrılan taziye ve destektir.",
      ],
      knowledge: ["Bir görevin kime yöneldiği kavramın alanını belirler."],
      strategy: "Muhatap ve karşılanan ihtiyacı bul.",
      commonError:
        "Cenazeyle ilişkili her yardımı bedenin hazırlanması saymak.",
      check: "Cevabın yakınlara yönelen iki destek fiilini koruyor mu?",
    },
    {
      passage:
        "Bakara 153–157’nin bir öğretim özeti sabır ve namazla yardım istemeyi, korku ve kayıplarla sınanmayı, Allah’a dönüş bilincini ve sabredenlere müjdeyi birlikte veriyor.",
      prompt: "Hangisi bu özetten çıkarılamaz?",
      options: [
        "Sabreden kişinin hiçbir kayıp veya üzüntü yaşamayacağı.",
        "Yardım isteme temasının bulunduğu.",
        "Korku ve kaybın anıldığı.",
        "Dönüş bilincinin bulunduğu.",
        "Sabra yönelik olumlu bildirim bulunduğu.",
      ],
      reasons: [
        "Kayıplar açıkça anılır; duygusuzluk garantisi verilmez.",
        "Sabır ve namazla yardım isteme verilmiştir.",
        "Özet bunu doğrudan söyler.",
        "Allah’a dönüş ifadesi vardır.",
        "Müjde bu yöndedir.",
      ],
      steps: [
        "Özet kaybı ve sabrı aynı bağlamda verir.",
        "Hiç kayıp yaşamama veya hiç üzülmeme sözü yoktur.",
        "Olumsuz kökün yanıtı olarak bu kanıtsız garanti seçilir.",
      ],
      knowledge: [
        "Sabır, güçlüğün ve duygunun hiç yaşanmaması demek değildir.",
      ],
      strategy:
        "Olumsuz kökte verilen sıkıntılarla garanti iddiasını karşılaştır.",
      commonError: "Sabır öğüdünü bütün acıları ortadan kaldıran vaat saymak.",
      check: "Seçtiğin çıkarım özetin açıkça andığı kaybı yok mu sayıyor?",
    },
    {
      passage:
        "Bir kültür incelemesi, Alevi-Bektaşi geleneğinde Hakk’a yürümek ve Hakk’a Uğurlama Erkânı ifadelerini açıklıyor. Yazı belirli bir yerde gözlenen uygulamaların bütün topluluklarda ayrıntısıyla aynı olduğunu söylemiyor.",
      prompt: "Hangi okuma kaynak sınırını korur?",
      options: [
        "Terim geleneği tanıtır; yerel uygulama bütün topluluklara değişmeden genellenmez.",
        "Gözlenen her ayrıntı herkes için tek zorunlu biçimdir.",
        "Erkân yalnız yıldız cetveli demektir.",
        "Gelenekte hiçbir dua bulunamaz.",
        "Terimi kullananın bütün kişisel inancı kesin ölçülmüştür.",
      ],
      reasons: [
        "Adlandırma ve çeşitlilik birlikte korunur.",
        "Kaynak böyle evrensellik vermiyor.",
        "Konu uğurlama geleneğidir.",
        "Bu mutlak dışlama verilmemiştir.",
        "Adlandırma iç dünyanın tam ölçümü değildir.",
      ],
      steps: [
        "Yazı bir gelenek ve onun terimlerini anlatır.",
        "Uygulamanın ayrıntıları belirli örneğe aittir.",
        "Terim öğrenilir, ayrıntılar bütün gruba zorunlu taşınmaz.",
      ],
      knowledge: ["Gelenek adı yerel ve tarihî çeşitliliği ortadan kaldırmaz."],
      strategy: "Terimle belirli gözlemin kapsamını ayır.",
      commonError:
        "Tek yerin erkânını bütün toplulukların eksiksiz modeli saymak.",
      check: "Sonucun yazının söylemediği her yer koşulunu ekliyor mu?",
    },
    {
      passage:
        "Bir kişi, vefat eden yakını adına sürekli yararlanılabilecek kitaplar bırakıyor. Açıklama bu hayrı yararı devam eden iyilikle ilişkilendiriyor; sevabı sayısal puanla ölçmüyor.",
      prompt: "Hangi kavram bu vurguya uygundur?",
      options: [
        "Sadaka-i cariye",
        "Yalnız tekfin",
        "Yalnız kıyamet",
        "Yalnız haşir",
        "Yalnız gasil",
      ],
      reasons: [
        "Yararının sürmesi belirleyici özelliktir.",
        "Kefenleme anlatılmamıştır.",
        "Evren düzeninin sonu değil hayır eylemi vardır.",
        "Toplanma fiili verilmez.",
        "Yıkama fiili yoktur.",
      ],
      steps: [
        "Eylem başkalarının kullanacağı kitapların bırakılmasıdır.",
        "Öne çıkan özellik yararın devam etmesidir.",
        "Bu süreklilik sadaka-i cariye kavramını destekler; puan eklenmez.",
      ],
      knowledge: ["Kalıcı yarar kavramı somut fayda ilişkisiyle anlaşılır."],
      strategy: "İyiliğin hangi özelliğinin vurgulandığını belirle.",
      commonError:
        "Hayırla ilgili bütün işleri cenaze hazırlık terimleriyle adlandırmak.",
      check: "Cevabının gerekçesi yararın sürmesi mi?",
    },
  ],
  [
    {
      passage:
        "Bir tarih panosu Yahudi geleneğini İbrahim, İshak ve Yakub’la ilişkili İsrailoğulları anlatısına; Musa dönemini ise Mısır’dan çıkış ve Sina’da ahit geleneğine bağlıyor.",
      prompt: "Panonun bilgilerini hangi yorum korur?",
      options: [
        "Tarihî kökler ve Musa’yla ilişkili ahit aynı geleneğin farklı bağlarıdır.",
        "Bütün adlar aynı tek kişiyi gösterir.",
        "Musa adı geçince diğer bütün tarihî bağlar silinir.",
        "Ahit yalnız bir ibadet binasının adıdır.",
        "Pano her güncel kişinin siyasî görüşünü açıklar.",
      ],
      reasons: [
        "İki ayrı tarihî bağ birlikte anlatılmıştır.",
        "Kişiler ayrı adlandırılmıştır.",
        "Pano bunları birlikte vermektedir.",
        "Metinde dinî antlaşma bağlamındadır.",
        "Güncel kişisel görüş verilmemiştir.",
      ],
      steps: [
        "İlk bağ topluluğun tarihî köklerine aittir.",
        "İkinci bağ Musa ve ahit anlatısını verir.",
        "İlişkili iki bağ korunur; kişiler veya güncel görüşler tekleştirilmez.",
      ],
      knowledge: [
        "Bir geleneğin tarihî anlatısı birden fazla şahsiyet ve olay içerir.",
      ],
      strategy: "Kişi ve olay ilişkilerini ayrı satırlara ayır.",
      commonError:
        "Tarihî bir bağı bütün diğer ilişkileri dışlayan tek kimlik saymak.",
      check: "Yorumun panodaki iki ilişkiyi de koruyor mu?",
    },
    {
      passage:
        "Bir karşılaştırmada Yahudilikte tek Tanrı inancı, ana akım Hristiyanlıkta ise Baba, Oğul ve Kutsal Ruh’la açıklanan tek Tanrı öğretisi belirtiliyor.",
      prompt: "İki dini ayırmada hangi veri daha özeldir?",
      options: [
        "Teslisin üç kişilik açıklaması",
        "Yalnız tek Tanrı ifadesi",
        "Yalnız dinî inanç bulunması",
        "Yalnız tarihî bir gelenek olması",
        "Yalnız bir toplulukta anlatılması",
      ],
      reasons: [
        "Bu, genel tek Tanrı ifadesinden daha ayırt edici öğedir.",
        "Parça bu üst ifadeyi iki gelenekte de verir.",
        "Bu ortak ve çok geniş bir özelliktir.",
        "İki din de tarihî gelenek olarak ele alınır.",
        "Her iki öğreti topluluk bağlamında verilir.",
      ],
      steps: [
        "Tek Tanrı üst ifadesi iki tarafta ortaktır.",
        "Baba, Oğul ve Kutsal Ruh açıklaması ikinci tarafta özeldir.",
        "Ayırıcı veri bu özel teslis açıklamasıdır.",
      ],
      knowledge: ["Ortak üst özellik her zaman ayırıcı kanıt değildir."],
      strategy: "Genel özellikten daha özel tanımı ayır.",
      commonError: "Tek Tanrı sözünü yalnız bir dine özgü sanmak.",
      check: "Seçtiğin veri iki açıklamada gerçekten aynı mı, farklı mı?",
    },
    {
      passage:
        "Bir notta On Emir’den anne-babaya hürmet, çalmama ve yalancı tanıklık yapmama maddeleri seçilmiş. Not bu üç maddeyi konu bakımından sınıflamayı istiyor.",
      prompt: "Hangi yorum uygundur?",
      options: [
        "İnsanlar arası davranış ve haklarla ilgili maddelerdir.",
        "Yalnız kandillik biçimini belirlerler.",
        "Yalnız yıllık bayram tarihlerini verirler.",
        "Tora’nın bütün kitap listesidirler.",
        "Bütün insanların bu kurallara eksiksiz uyduğunu kanıtlarlar.",
      ],
      reasons: [
        "Aile, mal ve tanıklık ilişkileri verilmiştir.",
        "Hiçbirinde simge biçimi yoktur.",
        "Takvim bilgisi sunulmaz.",
        "Bunlar davranış maddeleridir.",
        "Kural listesi davranış ölçümü değildir.",
      ],
      steps: [
        "Üç madde farklı ilişkilere yönelir.",
        "Hürmet, malı koruma ve doğru tanıklık davranışları vardır.",
        "Bu nedenle insanlar arası hak ve tutum alanı seçilir.",
      ],
      knowledge: ["Bir kuralın konusu onun uygulanma sıklığından ayrıdır."],
      strategy: "Her maddenin hangi ilişkiye yöneldiğini bul.",
      commonError:
        "Ahlaki kural listesini bütün insanların davranış raporu saymak.",
      check: "Sınıflaman üç maddeye de ayrı karşılık veriyor mu?",
    },
    {
      passage:
        "Bir içindekiler çizelgesinde üst başlık Tanah, onun altında Tora, Neviim ve Ketuvim yer alıyor. Öğrenci üst başlık yerine yalnız Tora yazmak istiyor.",
      prompt: "Bu değişiklik neden eksik olur?",
      options: [
        "Bütünün yerine yalnız ilk bölüm yazılmış olur.",
        "Tora Tanah’la hiçbir ilişki taşımaz.",
        "Neviim bir baş örtüsüdür.",
        "Ketuvim yalnız kilise lideridir.",
        "Tanah yalnız bir haftalık zaman aralığıdır.",
      ],
      reasons: [
        "Üç bölümden ikisi kapsam dışında kalır.",
        "Çizelge onu alt bölüm olarak verir.",
        "Kutsal yazı bölümü olarak gösterilir.",
        "Metin onu külliyatın bölümü yapar.",
        "Çizelge kutsal metin bütününü göstermektedir.",
      ],
      steps: [
        "Üst başlık üç bölümü kapsar.",
        "Tora bunların yalnız biridir.",
        "Üst başlığı Tora yapmak bütün-parça kapsamını daraltır.",
      ],
      knowledge: ["Bir alt küme bütünün her unsurunu kapsamaz."],
      strategy: "Başlık kapsamını alt bölümlerin tamamıyla karşılaştır.",
      commonError: "İlk bölümü bütün külliyatla özdeşleştirmek.",
      check: "Yeni başlık Neviim ve Ketuvim’i de kapsıyor mu?",
    },
    {
      passage:
        "Bir katalog Tekvin, Çıkış, Levililer, Sayılar ve Tesniye adlı beş kitabı aynı grup altında topluyor. Katalog, Tanah’ın bütününü değil bu ilk beşli grubu soruyor.",
      prompt: "İstenen ad hangisidir?",
      options: ["Tora", "Talmud", "Yeni Ahit", "Evharistiya", "Şabat"],
      reasons: [
        "İlk beş kitapla ilişkili bölüm adıdır.",
        "Yorum ve tartışma külliyatıdır.",
        "Hristiyan Kutsal Kitabı’nın ayrı bölümüdür.",
        "Ekmek-şarap ayininin adıdır.",
        "Haftalık kutsal zamandır.",
      ],
      steps: [
        "Liste beş kitap adını verir.",
        "Kök bütün Tanah’ı değil bu bölümü ister.",
        "Bu kapsam Tora ile karşılanır.",
      ],
      knowledge: ["Metin, ritüel ve zaman farklı kavram sınıflarıdır."],
      strategy: "Listelenen nesnenin kitap bölümü olduğunu belirle.",
      commonError: "Tanıdık bütün dinî terimleri aynı metin türü sanmak.",
      check: "Cevabın tam olarak beşli kitap grubunu mu adlandırıyor?",
    },
    {
      passage:
        "Bir çalışma Talmud’u Mişna ve Gemara’yla ilişkili yorum-tartışma birikimi olarak açıklıyor. “Sözlü gelenekle ilişkilidir.” cümlesinden günümüzde hiçbir yazılı biçimi olmadığı sonucu çıkarılıyor.",
      prompt: "Bu sonuç nasıl değerlendirilir?",
      options: [
        "Sözlü kökenle güncel yazılı biçimin yokluğu aynı iddia değildir.",
        "Kesin doğrudur; sözlü birikim hiçbir zaman yazılamaz.",
        "Talmud yalnız yedi kollu nesnedir.",
        "Gemara Şabat’ın başka günüdür.",
        "Mişna bir kilise bayramıdır.",
      ],
      reasons: [
        "İlk ifade ikinciyi zorunlu kılmaz.",
        "Böyle zorunlu dışlama yoktur.",
        "Verilen tanım metin ve yorum alanındadır.",
        "Çalışma onu yorum birikimiyle ilişkilendirir.",
        "Bu ilişki verilmemiştir.",
      ],
      steps: [
        "İlk bilgi geleneğin aktarım kökenine ilişkindir.",
        "Yeni iddia bugünkü yazılı biçimi bütünüyle reddeder.",
        "Bu ret ilk cümlenin zorunlu sonucu değildir.",
      ],
      knowledge: ["Aktarım kökeniyle mevcut biçim farklı özelliklerdir."],
      strategy: "İlk cümlenin zamanını ve kapsamını sonucunkiyle karşılaştır.",
      commonError: "Sözlü kökeni sonsuza dek yazılı olamama kuralına çevirmek.",
      check: "Yokluk iddiası için pasajda ayrıca hangi kanıt var?",
    },
    {
      passage:
        "Bir dinî takvimde kutsal dinlenme zamanı cuma gün batımında başlayıp cumartesi gün batımında bitiyor. Aynı sayfa bunun haftalık zaman olduğunu belirtiyor.",
      prompt: "Bu zaman hangisidir?",
      options: ["Şabat", "Noel", "Paskalya", "Yom Kippur", "Evharistiya"],
      reasons: [
        "Verilen başlangıç, bitiş ve haftalık nitelik tanıma uyar.",
        "İsa’nın doğumunun anılmasıdır.",
        "Dirilişin kutlanmasıdır.",
        "Yıllık kefaret günüyle ilişkilidir.",
        "Zaman aralığının değil bir ayinin adıdır.",
      ],
      steps: [
        "Takvim iki gün batımı sınırı verir.",
        "Sayfa haftalık kutsal dinlenmeyi sorar.",
        "Bu koşullar Şabatı destekler, yıllık bayram veya ayin adını değil.",
      ],
      knowledge: ["Kutsal zamanın aralığı ve sıklığı birlikte okunur."],
      strategy: "Haftalık-yıllık farkını başlangıç koşuluyla birleştir.",
      commonError: "Her dinî günü aynı yıllık bayram sanmak.",
      check: "Seçtiğin kavram haftalık ve iki gün batımıyla sınırlı mı?",
    },
    {
      passage:
        "Bir müze açıklaması Fısıh’ı Mısır’dan çıkışın, Şavuot’u Tora’nın verilişinin anılmasıyla ilişkilendiriyor. Öğrenci iki bayramı aynı tarihî olayı anıyor diye birleştiriyor.",
      prompt: "Hangi düzeltme gerekir?",
      options: [
        "Ortak dinî bağ korunur, anılan olaylar ayrı tutulur.",
        "İkisi de yalnız İsa’nın doğumudur.",
        "İki bayramdan biri mutlaka bir giysidir.",
        "Aynı dine ait olmak bütün olayları eşitler.",
        "Farklı olaylar aynı gelenekte bulunamaz.",
      ],
      reasons: [
        "Açıklama iki farklı olayı verir.",
        "Bu olaylardan söz edilmez.",
        "İkisi de bayram olarak tanıtılır.",
        "Üst ortaklık olay farkını silmez.",
        "Metin ikisini aynı gelenekte verir.",
      ],
      steps: [
        "İlk bayramın nesnesi çıkış anlatısıdır.",
        "İkincinin nesnesi Tora’nın verilişidir.",
        "Dinî ortaklık bu iki anma olayını tekleştirmez.",
      ],
      knowledge: ["Aynı geleneğin kutlamaları farklı olaylara yönelebilir."],
      strategy: "Her bayramın neyi andığını ayrı yaz.",
      commonError: "Ortak üst başlıktan tam olay özdeşliği çıkarmak.",
      check: "İki bayramı açıklarken iki ayrı olay kullanıyor musun?",
    },
    {
      passage:
        "Bir sergi etiketi bir nesneyi “Yahudi geleneğiyle ilişkili, yedi kollu kandillik” diye tanıtıyor. Yanındaki şekil altı köşeli yıldız olarak ayrı etiketlenmiş.",
      prompt: "İlk nesnenin doğru adı nedir?",
      options: ["Menora", "Davud Yıldızı", "Hanukiya", "Kipa", "Haç"],
      reasons: [
        "Yedi kollu kandillik tanımını karşılar.",
        "Yanındaki altı köşeli şekildir.",
        "Hanuka’da kullanılan dokuz kollu kandilliktir.",
        "Giysi türüdür, kandillik değildir.",
        "Farklı dinî bağlamdaki simgedir.",
      ],
      steps: [
        "İlk nesne kandillik ve yedi kolludur.",
        "İkinci nesne yıldız ve altı köşelidir.",
        "Kol ve köşe ayrımı ilkini menora olarak belirler.",
      ],
      knowledge: ["Simgede sayı kadar sayılan özelliğin türü de önemlidir."],
      strategy: "Kol ile köşeyi ayrı denetle.",
      commonError: "Altı köşeyi yedi kollu nesnenin özelliği sanmak.",
      check: "Cevabın nesnenin hem biçimine hem kol sayısına uyuyor mu?",
    },
    {
      passage:
        "Bir gezi yazarı sinagogda bir kişinin kipa kullandığını anlatıyor. Yazı başka kişilerin gündelik giysileri veya bütün Yahudi gelenekleri hakkında veri vermiyor.",
      prompt: "Hangisi bu gözlemin kapsamını aşar?",
      options: [
        "Bütün Yahudilerin her zaman kipa taktığı.",
        "Bir kişinin kipa kullandığı.",
        "Olayın sinagogda geçtiği.",
        "Yazarın bir giysi ayrıntısı anlattığı.",
        "Diğer kişilerin günlük kullanımı hakkında veri olmadığı.",
      ],
      reasons: [
        "Tek kişilik gözlem böyle evrensellik sağlamaz.",
        "Bu açık gözlemdir.",
        "Mekân doğrudan verilir.",
        "Kipa giysi bilgisi olarak verilmiştir.",
        "Pasaj bu sınırı açıklar.",
      ],
      steps: [
        "Gözlemin öznesi bir kişidir.",
        "Gözlemin zamanı o ziyarettir.",
        "Bütün kişiler ve her zaman sonucu iki kapsamı da büyütür.",
      ],
      knowledge: ["Tekil gözlem istisnasız evrensel kurala yetmez."],
      strategy: "Özne ve zamanı her seçenekte sabit tut.",
      commonError:
        "Bir kişinin giysisini bütün mensupların değişmez uygulaması yapmak.",
      check: "Seçeneğin gözlemlenmeyen kişileri ve zamanları da içeriyor mu?",
    },
    {
      passage:
        "Bir ders, teslisi ana akım Hristiyanlıkta Baba, Oğul ve Kutsal Ruh’la açıklanan tek Tanrı öğretisi olarak tanımlıyor. Öğrenci bunu üç bağımsız tanrı diye özetliyor.",
      prompt: "Hangi düzeltme tanımı korur?",
      options: [
        "Üç kişiyle açıklanan birlik öğretisi, üç ayrı tanrı iddiası olarak aktarılmaz.",
        "Baba, Oğul ve Kutsal Ruh üç bayramın adıdır.",
        "Teslis yalnız sinagog binasıdır.",
        "Tek Tanrı ifadesi kaynakta hiç yoktur.",
        "Teslis bütün Yahudi mezheplerinin ortak adı olarak verilmiştir.",
      ],
      reasons: [
        "Öğrencinin özeti tek Tanrı koşulunu silmiştir.",
        "Tanım onları inanç öğretisi içinde verir.",
        "Bina tanımı değildir.",
        "Kaynak bunu açıkça belirtir.",
        "Tanım Hristiyanlık bağlamını verir.",
      ],
      steps: [
        "Kaynak tek Tanrı koşulunu koyar.",
        "Öğrenci bağımsız üç tanrı ekler.",
        "Düzeltme tanımın birlik koşulunu ve üç kişi açıklamasını birlikte tutar.",
      ],
      knowledge: ["Bir öğretinin kendi tanımı aktarılırken koşulları korunur."],
      strategy: "Öğrenci özetini kaynak tanımındaki tek koşuluyla karşılaştır.",
      commonError: "Teslisi kaynağın söylemediği üçtanrıcılık olarak tanıtmak.",
      check: "Özetin tek Tanrı ifadesini görünür tutuyor mu?",
    },
    {
      passage:
        "Bir Hristiyan Kutsal Kitap panosu Eski Ahit ve Yeni Ahit’i iki ana bölüm olarak gösteriyor. İkinci bölümün içinde dört İncil’in yanı sıra başka yazılar da bulunuyor.",
      prompt: "Hangi kapsam ilişkisi doğrudur?",
      options: [
        "Dört İncil, Yeni Ahit’in; Yeni Ahit, Kitab-ı Mukaddes’in içindedir.",
        "Yeni Ahit yalnız dört İncil’den ibarettir.",
        "Eski Ahit, Kitab-ı Mukaddes’in dışında verilmiştir.",
        "Kitab-ı Mukaddes yalnız bir ayinin adıdır.",
        "İki ana bölüm birbirinin tam aynı tek metnidir.",
      ],
      reasons: [
        "İki düzeyli parça-bütün ilişkisi korunur.",
        "Başka yazılar bulunduğu açıkça verilir.",
        "Pano onu ana bölüm yapar.",
        "Metin külliyatı olarak gösterilir.",
        "Pano onları ayrı başlıklar olarak verir.",
      ],
      steps: [
        "Pano iki ana bölümü belirtir.",
        "Dört İncil ikinci bölümün içindeki alt gruptur.",
        "İç içe kapsam ilişkisi doğru sırayla korunur.",
      ],
      knowledge: ["Külliyatın alt bölümleri farklı kapsamlara sahiptir."],
      strategy: "İç içe iki sınırı ayrı kur.",
      commonError: "Alt grubu içinde yer aldığı bütünle eşitlemek.",
      check: "Yanıtın İncil dışındaki Yeni Ahit yazılarına yer bırakıyor mu?",
    },
    {
      passage:
        "Bir metin listesinde Matta, Markos, Luka ve Yuhanna birlikte yer alıyor. Soru, bu dört anlatının ortak tür adını istiyor; bütün Yeni Ahit’in adını sormuyor.",
      prompt: "En uygun yanıt hangisidir?",
      options: [
        "Dört İncil",
        "Talmud’un dört bölümü",
        "On Emir’in ilk dört maddesi",
        "Dört Yahudi bayramı",
        "Katolikliğin dört lider unvanı",
      ],
      reasons: [
        "İsa’nın hayatını ve öğretilerini anlatan dört metindir.",
        "Bu isimler Talmud bölümleri değildir.",
        "Bunlar kural maddesi olarak verilmemiştir.",
        "Bayram adları değildir.",
        "Görev unvanı olarak verilmez.",
      ],
      steps: [
        "Verilenler dört özel metin adıdır.",
        "Kök yalnız ortak türü ister.",
        "Dört İncil yanıtı kapsamı karşılar; Yeni Ahit’in tamamı denmez.",
      ],
      knowledge: [
        "Özel eser adlarını görev veya ritüel adlarıyla karıştırmamak gerekir.",
      ],
      strategy: "Liste türünü önce metin olarak belirle.",
      commonError: "Kutsal metin listesini mezhep veya görevli listesi sanmak.",
      check: "Cevabın dört adın hepsini aynı metin grubunda topluyor mu?",
    },
    {
      passage:
        "İki tören notundan ilki suyla yapılan kabul ve iman ritüelini, ikincisi İsa’nın son yemeğiyle ilişkili ekmek-şarap ayinini anlatıyor.",
      prompt: "Notlar sırasıyla hangi ritüellerdir?",
      options: [
        "Vaftiz ve evharistiya",
        "Evharistiya ve vaftiz",
        "Şabat ve Yom Kippur",
        "Kipa ve menora",
        "Noel ve Paskalya",
      ],
      reasons: [
        "Su ritüeli ve ekmek-şarap ayini ayrı adlandırılır.",
        "İki nesne ters eşleştirilmiştir.",
        "Bunlar verilen iki Hristiyan ritüeli değildir.",
        "Giysi ve simge, tören türleri değildir.",
        "Doğum ve diriliş anmaları bu nesnelerle özdeş değildir.",
      ],
      steps: [
        "İlk notun nesnesi su, işlevi kabul ve imandır.",
        "İkincinin nesneleri ekmek ve şarap, bağlamı son yemektir.",
        "Sıra vaftiz ve evharistiya olarak korunur.",
      ],
      knowledge: [
        "Aynı din içinde farklı ritüellerin ayırt edici nesneleri vardır.",
      ],
      strategy: "Her töreni kendi nesne ve amacıyla eşleştir.",
      commonError:
        "İki kilise ritüelinin adını sırayı denetlemeden değiştirmek.",
      check: "İlk cevap suyla, ikinci cevap ekmek-şarapla mı ilişkili?",
    },
    {
      passage:
        "Bir kutlama notu İsa’nın doğumunu, başka not Hristiyan inancındaki dirilişini anıyor. Her iki notun İsa’yla ilişkili olması aynı bayram oldukları iddiasına gerekçe yapılıyor.",
      prompt: "Hangi çift olay ayrımını doğru verir?",
      options: [
        "Noel doğum, Paskalya diriliş",
        "Noel diriliş, Paskalya doğum",
        "İkisi de yalnız Mısır’dan çıkış",
        "İkisi de yalnız haftalık Şabat",
        "İkisi de yalnız ruhbanlığa atama",
      ],
      reasons: [
        "İki kutlama farklı olayları anar.",
        "Olaylar ters eşleştirilmiştir.",
        "Bu olay iki notun konusu değildir.",
        "Notlar aynı haftalık zamanı anlatmıyor.",
        "Görev ataması verilmemiştir.",
      ],
      steps: [
        "İlk not doğumu, ikinci not dirilişi verir.",
        "İsa’yla ilişkili olma ortak üst özelliktir.",
        "Özel olay ayrımı Noel ve Paskalya eşlemesini belirler.",
      ],
      knowledge: ["Ortak kişi farklı anma olaylarını tek bayram yapmaz."],
      strategy: "İlişkili kişiden önce anılan olayı seç.",
      commonError: "Her İsa kutlamasını aynı olay sanmak.",
      check: "İki ayrı olay seçtiğin çiftte doğru sırayla duruyor mu?",
    },
    {
      passage:
        "Bir kaynak, Katolik gelenekte yedi sakrament listesini veriyor. Başka Hristiyan geleneklerde sayı ve yorumun değişebileceğini ayrıca belirtiyor.",
      prompt: "Hangi sonuç kaynağa uygundur?",
      options: [
        "Liste kendi geleneğinin kapsamında kullanılır; bütün gruplara aynı sayı zorunlu taşınmaz.",
        "Bütün Hristiyanlar her ayrıntıda aynı yedi uygulamaya sahiptir.",
        "Sakrament bütün dinlerin haftalık gününün tek adıdır.",
        "Katolik gelenekte hiçbir ayin bulunamaz.",
        "Sayı değişirse bütün gruplar farklı din olmak zorundadır.",
      ],
      reasons: [
        "Açık çeşitlilik koşulu korunur.",
        "Kaynağın farklılık kaydını yok sayar.",
        "Tanım kutsal ayinle ilgilidir.",
        "Liste ayinlerin bulunduğunu gösterir.",
        "Mezhep farklılığı tek başına ayrı din sonucu vermez.",
      ],
      steps: [
        "Kaynak listenin Katolik bağlamını belirtir.",
        "Diğer gelenekler için farklılık olabileceğini söyler.",
        "Bu nedenle sayı yalnız verilen kapsamda kullanılır.",
      ],
      knowledge: [
        "Bir mezhebin sınıflaması bütün ana dine zorunlu genellenmez.",
      ],
      strategy: "Listenin hangi topluluk için verildiğini kontrol et.",
      commonError:
        "Bir sakrament listesini dinin bütün üyelerinin değişmez programı saymak.",
      check: "Cevabın kaynakta belirtilen çeşitliliği koruyor mu?",
    },
    {
      passage:
        "Bir sınıf panosu Katolik, Ortodoks ve Protestan gelenekleri Hristiyanlık üst başlığına bağlıyor. Başka bir sütunda Ortodoks Yahudilik ifadesi yer alıyor.",
      prompt: "Bu düzenlemeden hangi sonuç çıkar?",
      options: [
        "Ortodoks sözcüğünün bağlamı üst din bilgisiyle belirlenmelidir.",
        "Ortodoks sözcüğü yalnız bir dinin her üyesini kapsar.",
        "Üç Hristiyan gelenek üç ayrı din olmak zorundadır.",
        "İki sütundaki bütün ritüeller kesin aynıdır.",
        "Üst din başlığı yorum farkını tümden yok eder.",
      ],
      reasons: [
        "Aynı sözcük iki farklı din bağlamında kullanılır.",
        "Pano iki bağlam gösterir.",
        "Aynı üst başlığa bağlı verilmiştir.",
        "Sözcük ortaklığı bu ayrıntıyı vermez.",
        "Ayrı alt gelenekler açıkça bulunur.",
      ],
      steps: [
        "Ortodoks adı iki sütunda görülür.",
        "Üst başlıklar Hristiyanlık ve Yahudiliktir.",
        "Tek sözcük yerine üst bağlam kullanılarak sınıflama yapılır.",
      ],
      knowledge: ["Aynı ad farklı sınıflama ağaçlarında kullanılabilir."],
      strategy: "Terimi üst başlığıyla birlikte oku.",
      commonError: "Bir ortak kelimeden bütün dinî bağlamı belirlemek.",
      check:
        "Ortodoks dediğinde hangi üst geleneği kastettiğini gösterebiliyor musun?",
    },
    {
      passage:
        "Bir notta papa, Vatikan ve Katolik Kilisesi arasında liderlik bağı kuruluyor. Not diğer bütün Hristiyan kiliselerinin aynı yönetim düzeninde olduğunu söylemiyor.",
      prompt: "Hangisi doğrudan desteklenir?",
      options: [
        "Papa unvanının Katolik liderlik bağlamıyla ilişkili olduğu.",
        "Bütün kiliselerin tek ve aynı yönetime zorunlu bağlı olduğu.",
        "Papa bir Yahudi kutsal günüdür.",
        "Vatikan Yeni Ahit’in dört İncil’inden biridir.",
        "Katolik sözcüğü yalnız baş örtüsüdür.",
      ],
      reasons: [
        "Üç bilgi bu bağı açıkça kurar.",
        "Bu evrensel yönetim bilgisi verilmez.",
        "Unvan kişi ve liderlik alanındadır.",
        "Yer-kurum ile metin türü karıştırılır.",
        "Metinde kilise geleneği olarak kullanılır.",
      ],
      steps: [
        "Unvan papa olarak verilir.",
        "Yer ve kurum bağı Vatikan-Katolik Kilisesidir.",
        "Bu sınırlı ilişki desteklenir, bütün kiliselere genişletilmez.",
      ],
      knowledge: [
        "Liderlik unvanı ile bütün dinin örgütlenmesi aynı kapsam değildir.",
      ],
      strategy: "Özel ilişkiyi genel yönetim iddiasından ayır.",
      commonError: "Tek liderlik örneğini bütün Hristiyan kurumlarına yaymak.",
      check: "Seçimin yalnız notun kurduğu üçlü ilişkiyle açıklanıyor mu?",
    },
    {
      passage:
        "Bir ziyaretçi sinagog binasının önünden geçtiğini yazıyor. Yazıda içeri girdiği, ibadete katıldığı veya bir kitaptan okuma dinlediği belirtilmiyor.",
      prompt: "Hangi sonuç metnin kesin verisidir?",
      options: [
        "Sinagogun önünden geçtiği.",
        "Tora’dan bir bölüm dinlediği.",
        "Orada ibadet ettiği.",
        "Binanın bütün üyeleriyle aynı inanca sahip olduğu.",
        "Ziyaretin Şabat günü olduğu.",
      ],
      reasons: [
        "Yazının doğrudan söylediği fiildir.",
        "Okuma ve dinleme eylemi verilmemiştir.",
        "İbadete katılma bilgisi yoktur.",
        "Kişisel inanç beyanı yoktur.",
        "Gün bilgisi verilmemiştir.",
      ],
      steps: [
        "Yazının açık fiili önünden geçmektir.",
        "İçeri girme, ibadet ve okuma verisi yoktur.",
        "Kesin sonuç yalnız açık hareketle sınırlandırılır.",
      ],
      knowledge: ["Mekâna yakınlık katılım ve inanç kanıtı değildir."],
      strategy: "Verilen fiili olası ama söylenmeyen fiillerden ayır.",
      commonError: "Dinî mekân adından yapılmamış ibadet ayrıntısı çıkarmak.",
      check:
        "Cevabını kanıtlamak için yazıda olmayan başka bir fiil gerekiyor mu?",
    },
    {
      passage:
        "Bir öğrenci kutsal mekân, simge ve takvim notlarını ayrı sütunlara koyuyor: sinagog, menora ve Şabat. Aynı dine ait oldukları için üçünün aynı tür terim olduğunu düşünüyor.",
      prompt: "Hangi sınıflama doğrudur?",
      options: [
        "Sinagog mekân, menora simge, Şabat kutsal zamandır.",
        "Üçü de yalnız kutsal kitabın bölümüdür.",
        "Üçü de yalnız mezhep lideridir.",
        "Sinagog zaman, menora kitap, Şabat giysidir.",
        "Aynı dine ait olmak bütün terimleri eş anlamlı yapar.",
      ],
      reasons: [
        "Din ortaklığı kavram türlerini silmez.",
        "Hiçbiri burada metin bölümü değildir.",
        "Kişi unvanları değildir.",
        "Üç eşleme de terim türüne uymaz.",
        "İşlevler farklıdır.",
      ],
      steps: [
        "Sinagog topluluk mekânını belirtir.",
        "Menora bir simge, Şabat ise zaman dilimidir.",
        "Ortak din altında üç farklı kavram sınıfı korunur.",
      ],
      knowledge: [
        "Dinî bağlam ortaklığı sözcük türü ve işlev özdeşliği değildir.",
      ],
      strategy: "Her terim için yer, nesne veya zaman sorusunu sor.",
      commonError: "Aynı gelenekteki bütün terimleri tek sınıfa toplamak.",
      check: "Üç sütunun her biri farklı bir soruya cevap veriyor mu?",
    },
  ],
  [
    {
      passage:
        "Bir çalışma, Hz. Muhammed döneminde Medine’de Mescid-i Nebî’ye bitişik bölümde sürdürülen eğitimi anlatıyor. Soru bu belirli ortamın adını istiyor.",
      prompt: "Hangi kurum adı uygundur?",
      options: [
        "Suffe",
        "Beytü’l-hikme",
        "Sahn-ı Seman",
        "Rasathane",
        "Dârüşşifa",
      ],
      reasons: [
        "Dönem ve mescide bitişik eğitim bölümü bu adı verir.",
        "Sonraki Abbasi Bağdat çeviri ortamıyla ilişkilidir.",
        "Osmanlı döneminin medrese örneğidir.",
        "Gök gözlemine ayrılan kurumdur.",
        "Sağlık ve hasta bakımı kurumudur.",
      ],
      steps: [
        "Yer Medine ve dönem Hz. Muhammed dönemi olarak verilir.",
        "Faaliyet mescide bitişik bölümde eğitimdir.",
        "Üç koşul Suffeyi belirler; sonraki veya farklı işlevli kurumlar elenir.",
      ],
      knowledge: ["Kurum eşlemesi yer, dönem ve faaliyetle yapılır."],
      strategy: "Üç ipucunu aynı adayda birleştir.",
      commonError:
        "Eğitimle ilgili bütün kurumları aynı dönem ve yerde sanmak.",
      check: "Cevabın mescide bitişik erken ortamı mı anlatıyor?",
    },
    {
      passage:
        "Bir tarih kaydı temel okuma-yazma öğretimini, başka kayıt daha ileri ve örgütlü dersleri konu ediyor. Ders, ilkini mektep; ikincisini medrese örnekleriyle açıklıyor.",
      prompt: "Kayıtların farkı hangi düzeydedir?",
      options: [
        "Öğretim odağı ve düzeyinde",
        "Birinin eğitimle hiçbir ilişkisi olmamasında",
        "Birinin yalnız yıldız adı olmasında",
        "Her öğrencinin kesin aynı düzeyde olmasında",
        "İki adın her ayrıntıda eş anlamlı olmasında",
      ],
      reasons: [
        "İki kayıt başlangıç öğretimiyle ileri öğretimi ayırır.",
        "İkisinde de öğretim vardır.",
        "Kurum ve derslerden söz edilir.",
        "Kayıtlar düzey farkı verir.",
        "Açık ayrım eş anlamlılığı engeller.",
      ],
      steps: [
        "İlk kayıtta temel okuma-yazma vardır.",
        "İkinci kayıtta daha ileri dersler anlatılır.",
        "Fark öğretim odağı ve düzeyidir; bugünkü kurumlarla tam özdeşlik eklenmez.",
      ],
      knowledge: [
        "Tarihî kurumları bugünkü okul türleriyle karşılaştırmak sınırlı bir benzetmedir.",
      ],
      strategy: "Faaliyet ve düzeyi adlardan önce belirle.",
      commonError: "Mektep ve medreseyi her ayrıntıda aynı kurum saymak.",
      check: "Seçimin iki kayıttaki düzey farkını koruyor mu?",
    },
    {
      passage:
        "Bir medresenin programında fıkıh, matematik ve astronomi birlikte listeleniyor. Kaynak, başka medreselerin bütün programlarının aynı olduğunu belirtmiyor.",
      prompt: "Hangi sonuç doğrudan desteklenir?",
      options: [
        "Bu programda farklı alanlar birlikte bulunmaktadır.",
        "Bütün medreselerde her zaman aynı üç ders vardır.",
        "Medresede hiçbir dinî ders yoktur.",
        "Astronomi bulununca matematik öğretilmiş sayılmaz.",
        "Program bir rasathanenin yalnız araç envanteridir.",
      ],
      reasons: [
        "Üç ayrı alan aynı programda verilmiştir.",
        "Bu genelleme için veri yoktur.",
        "Fıkıh açıkça listelenmiştir.",
        "İkisi de ayrı listelenmiştir.",
        "Kaynak onu medrese programı olarak verir.",
      ],
      steps: [
        "Listede bir dinî hukuk alanı ve iki nicel/doğa alanı vardır.",
        "Hepsi aynı programın parçasıdır.",
        "Sonuç bu programa özgü birlikte bulunmadır, bütün kurumlar için evrensellik değildir.",
      ],
      knowledge: [
        "Program listesi yalnız kapsamı verilen kurum için kanıttır.",
      ],
      strategy: "Aynı listedeki farklı alanları koru.",
      commonError:
        "Tek medrese programını bütün çağların eksiksiz programı saymak.",
      check: "Yargının öznesi bu program mı, bütün medreseler mi?",
    },
    {
      passage:
        "Bir tarihî kurumda Hz. Peygamber’e nispet edilen rivayetlerin aktarımı ve açıklanması üzerine uzmanlık dersleri yürütülüyor.",
      prompt: "Bu özel öğretim odağı hangi kurumla eşleşir?",
      options: ["Dârülhadis", "Dârülkurra", "Rasathane", "Şifahane", "Mektep"],
      reasons: [
        "Hadis ilimlerinde uzmanlaşma verilen içeriktir.",
        "Kur’an kıraati üzerine uzmanlaşır.",
        "Gök gözlemi temel işlevdir.",
        "Hasta bakımı ve tıp alanıdır.",
        "Bu özel rivayet uzmanlığının doğrudan adı değildir.",
      ],
      steps: [
        "Dersin nesnesi rivayetlerdir.",
        "İş aktarım ve açıklama uzmanlığıdır.",
        "Hadis odağı dârülhadis eşlemesini destekler.",
      ],
      knowledge: [
        "Özel dersin konusu genel dinî eğitim başlığından daha ayırt edicidir.",
      ],
      strategy: "Rivayet ile kıraat ayrımını koru.",
      commonError: "Dinî eğitim ortaklığından yanlış özel kurum seçmek.",
      check: "Cevabın doğrudan rivayet çalışmasını karşılıyor mu?",
    },
    {
      passage:
        "Bir kurum Kur’an’ın okunuş usullerini uzmanlık düzeyinde öğretiyor ve hafızlık çalışmalarına yer veriyor. Parça hadis rivayetlerini konu etmiyor.",
      prompt: "Hangi kurum daha doğrudandır?",
      options: [
        "Dârülkurra",
        "Dârülhadis",
        "Şifahane",
        "Beytü’l-hikme",
        "Rasathane",
      ],
      reasons: [
        "Kıraat ve hafızlık bu öğretim odağıdır.",
        "Verilmeyen hadis uzmanlığını ekler.",
        "Sağlık hizmeti anlatılmamıştır.",
        "Burada çeviri merkezinin faaliyeti verilmez.",
        "Gök gözleminden söz edilmez.",
      ],
      steps: [
        "Açık konu Kur’an okunuş usulleridir.",
        "Hafızlık bu odağı destekler.",
        "Kıraat uzmanlığı dârülkurra ile eşleştirilir.",
      ],
      knowledge: ["Kıraat, metnin okunuşuyla ilgili özel çalışma alanıdır."],
      strategy:
        "Olumlu içerik kanıtını ve dışlanan yakın alanı birlikte kullan.",
      commonError:
        "Kıraatla hadisi yalnız dinî olmaları nedeniyle tekleştirmek.",
      check: "Gerekçende okunuş usulleri bilgisi yer alıyor mu?",
    },
    {
      passage:
        "Bir kaynak Abbasiler dönemi Bağdat’ında farklı dillerden eserlerin çevrildiği, kitapların toplandığı ve incelendiği bir merkezden söz ediyor.",
      prompt: "Bu merkezin ders düzeyindeki karşılığı nedir?",
      options: [
        "Beytü’l-hikme",
        "Suffe",
        "Dârüşşifa",
        "Havra",
        "Sıbyan mektebi",
      ],
      reasons: [
        "Bağdat, Abbasi dönemi ve çeviri işlevi birlikte uyumludur.",
        "Medine’de erken dönem eğitim çevresidir.",
        "Parçada tedavi işlevi verilmez.",
        "Yahudi ibadet ve toplanma mekânıdır.",
        "Temel çocuk öğretimi bu pasajın odağı değildir.",
      ],
      steps: [
        "Dönem Abbasiler, yer Bağdat’tır.",
        "Faaliyet çeviri ve kitap incelemesidir.",
        "Bu üçlü Beytü’l-hikme bağını kurar.",
      ],
      knowledge: [
        "Bir kurumun tarihî kimliği yalnız eğitim sözcüğünden bulunmaz.",
      ],
      strategy: "Yer-dönem-işlev üçlüsünü çapraz denetle.",
      commonError: "Bağdat çeviri ortamını Medine Suffesiyle eşitlemek.",
      check:
        "Seçimin metindeki çeviri faaliyetini ve yeri birlikte açıklıyor mu?",
    },
    {
      passage:
        "Bir merkezde gök cisimlerinin konumları düzenli kaydediliyor, gözlem aletleriyle yeni astronomi cetvelleri hazırlanıyor. Merkezin maddi desteğini bir hükümdar sağlıyor.",
      prompt: "Bilimsel işlevi hangi kurum türüne uyar?",
      options: [
        "Rasathane",
        "Yalnız saray yönetim dairesi",
        "Yalnız şifahane",
        "Yalnız dârülkurra",
        "Yalnız taziye evi",
      ],
      reasons: [
        "Sistemli astronomi gözlemi ve cetvel hazırlama bu kurumun işidir.",
        "Destek veren kişi kurumun gözlem işlevini ortadan kaldırmaz.",
        "Hasta tedavisi verilmemiştir.",
        "Kıraat öğretimi anlatılmıyor.",
        "Cenaze yakınlarına destek konusu yoktur.",
      ],
      steps: [
        "Gözlenenler gök cisimleridir.",
        "Üretilenler astronomi kayıt ve cetvelleridir.",
        "İşlev rasathaneyi belirler; destekçinin unvanı alanı değiştirmez.",
      ],
      knowledge: [
        "Kurumu işleviyle, destekçiyi kendi rolüyle değerlendirmek gerekir.",
      ],
      strategy: "Araştırmanın nesnesi ve çıktısına odaklan.",
      commonError:
        "Siyasi destekten kurumun yalnız siyaset yaptığı sonucunu çıkarmak.",
      check: "Yanıtın gözlem araçları ve cetvellerle açıklanıyor mu?",
    },
    {
      passage:
        "Bir yapıda hastalara bakım verildiği ve hekim yetiştirme çalışmalarının yürütüldüğü anlatılıyor. Metin bu tarihî uygulamaların hepsinin günümüzde geçerli olduğunu söylemiyor.",
      prompt: "Hangi yorum uygundur?",
      options: [
        "Şifahane bağlamı vardır; tarihî kullanım güncel etkinlik kanıtı sayılmaz.",
        "Bu kesin bir rasathanedir.",
        "Eski her tedavi bugün mutlaka güvenlidir.",
        "Hekim yetişmesi hiçbir öğretim olmadığını gösterir.",
        "Tarihî olduğu için hiçbir sağlık işlevi olamaz.",
      ],
      reasons: [
        "Kurum tanımıyla kanıt sınırı birlikte korunur.",
        "Gök gözlemi değil sağlık hizmeti verilmiştir.",
        "Böyle bir güncel sınama sonucu verilmez.",
        "Yetiştirme öğretim bağını destekler.",
        "Tarihîlik işlevi yok etmez.",
      ],
      steps: [
        "Faaliyet hasta bakımı ve hekim öğretimidir.",
        "Bu, şifahane ve tıp bağlamını destekler.",
        "Güncel güvenlik veya etkinlik için ayrıca kanıt gerekir.",
      ],
      knowledge: ["Tarihî etkiyle güncel tıbbi kanıt ayrı değerlendirilir."],
      strategy:
        "Kurumun işlevini geçmiş uygulamanın bugünkü değeriyle karıştırma.",
      commonError: "Eski bir uygulamanın varlığını güncel tedavi onayı saymak.",
      check: "Cevabın güncel klinik sonuç için verilmemiş garanti ekliyor mu?",
    },
    {
      passage:
        "Bir kütüphane envanterinde kitap sayısının arttığı görülüyor. Araştırmacı yalnız bu sayıya bakarak her kitabın herkes tarafından okunduğunu ve yeni buluş yapıldığını ileri sürüyor.",
      prompt: "Araştırmacının eklediği kanıtsız sonuç nedir?",
      options: [
        "Kitap varlığını gerçekleşmiş okuma ve buluşla özdeşleştirmesi",
        "Kitap sayısının arttığını söylemesi",
        "Kütüphaneden söz etmesi",
        "Bir nicelik bilgisi kullanması",
        "Kitapların bir envanterde listelendiğini belirtmesi",
      ],
      reasons: [
        "Envanter bu iki sonucu tek başına vermez.",
        "Bu kayıt doğrudan envanterdedir.",
        "Kurum açıkça verilmiştir.",
        "Nicelik kullanımı tek başına hata değildir.",
        "Metinde açıkça bu kayıt vardır.",
      ],
      steps: [
        "Envanter erişilebilir birikimin niceliğini verir.",
        "Okuma ve özgün araştırma ayrıca gerçekleşmesi gereken eylemlerdir.",
        "Bu eylemler için veri olmadan sonuç ilan edilemez.",
      ],
      knowledge: [
        "Kaynak bulunması onun okunması ve yeni katkı üretilmesiyle aynı şey değildir.",
      ],
      strategy: "Sayının hangi eylemi gerçekten kanıtladığını sor.",
      commonError:
        "Katalog artışını otomatik öğrenme ve buluş başarısı saymak.",
      check: "Okuma ve buluş için sayının dışında somut veri var mı?",
    },
    {
      passage:
        "Bir çalışma Kur’an ayetlerinin anlamını yöntemli açıklıyor; başka çalışma Hz. Peygamber’e nispet edilen rivayetleri derleyip inceliyor.",
      prompt: "Alanlar sırasıyla hangileridir?",
      options: [
        "Tefsir ve hadis",
        "Hadis ve tefsir",
        "Fıkıh ve astronomi",
        "Optik ve coğrafya",
        "Kıraat ve yalnız mekanik",
      ],
      reasons: [
        "Ayet yorumu ve rivayet incelemesi bu sırayı verir.",
        "İki nesne ters sıraya konulmuştur.",
        "İlk konu hüküm araştırmasına daraltılmaz, ikincisi gök gözlemi değildir.",
        "Işık ve yeryüzü araştırması verilmez.",
        "Anlam açıklaması okunuş değildir, rivayet de makine değildir.",
      ],
      steps: [
        "İlk çalışmanın nesnesi ayet anlamıdır.",
        "İkinci çalışmanın nesnesi rivayettir.",
        "Sıra tefsir ve hadis olarak korunur.",
      ],
      knowledge: ["Alan seçimi araştırmanın nesnesine dayanır."],
      strategy: "Metin türünü ve yapılan işlemi birlikte yaz.",
      commonError: "Bütün dinî ilimleri aynı konu ve yöntem saymak.",
      check: "Her alan için pasajdan ayrı bir nesne gösterebiliyor musun?",
    },
    {
      passage:
        "Bir araştırma inanç esaslarını akli ve naklî delillerle açıklıyor. İkinci araştırma bir ticaret işleminin dinî hukuk bakımından şartlarını inceliyor.",
      prompt: "Hangi sınıflama doğrudur?",
      options: [
        "İlki kelam, ikincisi fıkıhtır.",
        "İlki fıkıh, ikincisi kelamdır.",
        "İkisi de yalnız kıraat öğretimidir.",
        "İlki rasathane, ikincisi optiktir.",
        "İki alanın farklı olması birlikte incelenmelerini imkânsız kılar.",
      ],
      reasons: [
        "İnanç temellendirme ve uygulama hükmü ayrılır.",
        "Konular ters eşleştirilmiştir.",
        "Okunuş usulü araştırılmıyor.",
        "Kurum ve ışık alanı veriye uymaz.",
        "Farklı alanlar aynı birikimde bulunabilir.",
      ],
      steps: [
        "İlk konu inancın gerekçeleridir.",
        "İkinci konu yapılan işlemin hükmüdür.",
        "Bu ayrım kelam ve fıkıh eşlemesini verir.",
      ],
      knowledge: [
        "Aynı gelenek içinde inanç ve hukuk farklı araştırma konularıdır.",
      ],
      strategy: "Gerekçelendirilen şeyin inanç mı işlem hükmü mü olduğunu bul.",
      commonError: "Konuya bakmadan alan adlarını ters çevirmek.",
      check: "Ticaret işleminin şartları yanıtında fıkıhla eşleşiyor mu?",
    },
    {
      passage:
        "Bir gezgin şehirler, yollar ve insan toplulukları hakkında gözlemler kaydediyor. Daha sonra bir tarihçi bu seyahatnameyi başka belgelerle karşılaştırıyor.",
      prompt: "Hangi değerlendirme uygundur?",
      options: [
        "Seyahatname coğrafi ve tarihî incelemeye kaynak olabilir; her cümlesi aynı kanıt türünde sayılmaz.",
        "Seyahatname yalnız cebir denklemlerinden oluşur.",
        "Kaynak eskiyse karşılaştırmaya hiç gerek yoktur.",
        "Bir gezginin her yorumu bütün çağlar için ölçülmüş yasadır.",
        "Başka belge kullanmak ilk kaynağı zorunlu değersiz yapar.",
      ],
      reasons: [
        "Gözlem ve yorum ayrı değerlendirilir.",
        "Verilen içerik şehir ve toplum gözlemleridir.",
        "Tarihçi açıkça karşılaştırmaktadır.",
        "Böyle evrensel kanıt verilmez.",
        "Karşılaştırma kaynak denetiminin parçasıdır.",
      ],
      steps: [
        "Gezgin yer ve toplum gözlemlerini kaydeder.",
        "Tarihçi bunları başka belgelerle denetler.",
        "Kaynak kullanılabilir ama bütün cümleleri aynı kesinlikte kabul edilmez.",
      ],
      knowledge: [
        "Kaynak incelemesi gözlem, yorum ve aktarılan haberi ayırır.",
      ],
      strategy: "İçerikle kanıt gücünü ayrı değerlendir.",
      commonError: "Bir kaynağı tümden kesin veya tümden değersiz saymak.",
      check: "Yanıtın hem kaynak değerini hem denetim ihtiyacını koruyor mu?",
    },
    {
      passage:
        "Bir ders Hârizmî’yi El-Cebr ve’l-Mukabele eseri, cebir ve hesaplama geleneğiyle ilişkilendiriyor. Öğrenci bu bilgiyi bütün modern hesaplama yöntemlerini tek başına icat ettiği şeklinde genişletiyor.",
      prompt: "Hangi düzeltme gerekir?",
      options: [
        "Somut cebir ve hesaplama katkısı korunur; bütün yöntemlerin tek mucidi sonucu çıkarılmaz.",
        "Hârizmî’nin hiçbir matematik çalışması olmadığı söylenir.",
        "El-Cebr yalnız cenaze hazırlığıdır.",
        "Katkı varsa önceki bütün gelenekler yok sayılır.",
        "Algoritma sözcüğü her modern makinenin aynı kişi tarafından yapıldığını kanıtlar.",
      ],
      reasons: [
        "Verilen eser bağı sınırsız icat iddiası değildir.",
        "Açık eser ve alan bilgisi reddedilmiş olur.",
        "Eser matematik bağlamındadır.",
        "Katkı önceki birikimi dışlamaz.",
        "Terim ilişkisi tüm araçların mucitliği değildir.",
      ],
      steps: [
        "Verilen kanıt bir eser ve belirli alanlardır.",
        "Yeni iddia bütün modern yöntemleri tek kişiye yükler.",
        "Düzeltme katkıyı korur, kapsamı büyüten mucitlik iddiasını kaldırır.",
      ],
      knowledge: [
        "Bir katkının önemini anlatmak tüm bir alanın tek sahipliğini gerektirmez.",
      ],
      strategy: "Eser bilgisini iddianın kapsamıyla karşılaştır.",
      commonError: "Tarihî katkıyı sınırsız tek mucit anlatısına dönüştürmek.",
      check:
        "Cevabında eserin katkısı korunurken hangi aşırı sonuç kaldırılıyor?",
    },
    {
      passage:
        "Bir tarihî bilgin ışığın cisimlerden göze ulaşmasıyla görmeyi açıklıyor ve karanlık oda üzerine incelemeler yapıyor. Ders bu çalışmalarını belirli bir alanla ilişkilendiriyor.",
      prompt: "Öne çıkan alan hangisidir?",
      options: [
        "Optik",
        "Fıkıh usulü",
        "Yalnız kronoloji",
        "Yalnız kıraat",
        "Yalnız diplomasi",
      ],
      reasons: [
        "Işık, görme ve görüntü araştırmaları bu alanı verir.",
        "Hukukî hüküm çıkarma yöntemi anlatılmıyor.",
        "Zaman sıralaması ana araştırma nesnesi değildir.",
        "Kur’an’ın okunuş usulü verilmez.",
        "Devletler arası temsil faaliyeti yoktur.",
      ],
      steps: [
        "Araştırılan nesne ışıktır.",
        "Sorun görme ve görüntünün oluşmasıdır.",
        "Bu özel konu optik olarak adlandırılır.",
      ],
      knowledge: ["Araştırma alanı somut problem ve nesnesiyle tanınır."],
      strategy: "Işık ve görme fiillerini alanla eşleştir.",
      commonError: "Bilginin adı yerine yalnız genel ilim sözcüğüne dayanmak.",
      check: "Seçtiğin alan ışık-görüntü ilişkisini gerçekten kapsıyor mu?",
    },
    {
      passage:
        "Bir katalog İbn Sînâ’nın el-Kânûn fi’t-Tıbb eserini sağlık ve hastalık bilgisi bağlamında tanıtıyor. Başka bir sayfa onun felsefe çalışmaları da olduğunu belirtiyor.",
      prompt: "Hangi sonuç iki bilgiyi birlikte korur?",
      options: [
        "Eser tıpla ilişkilidir; kişinin başka alanda çalışması bunu dışlamaz.",
        "Felsefe çalıştığı için eser tıpla ilişkili olamaz.",
        "Tıp eseri yazması bütün hayatında yalnız tıp yaptığına kanıttır.",
        "El-Kânûn yalnız astronomi cetvelidir.",
        "Bir kişinin iki alanı olması bütün alanları eş anlamlı yapar.",
      ],
      reasons: [
        "Eserin alanı ve kişinin çok yönlülüğü birlikte kalır.",
        "İki alanda çalışma zorunlu çelişki değildir.",
        "Başka alan açıkça verilmiştir.",
        "Katalog sağlık-hastalık içeriğini verir.",
        "Çok yönlülük tanım özdeşliği değildir.",
      ],
      steps: [
        "Katalog eserin sağlık-hastalık konusunu belirtir.",
        "Diğer sayfa kişiye ayrı bir felsefe çalışması bağlar.",
        "Eserin alanı korunur ve kişi tek alana kapatılmaz.",
      ],
      knowledge: [
        "Kişinin çalışma çeşitliliği tek eserin özel alanını değiştirmez.",
      ],
      strategy: "Eser düzeyiyle kişi düzeyini ayır.",
      commonError: "Bir bilginin tek eseriyle bütün kariyerini aynılaştırmak.",
      check: "Yanıtın hem tıp eserini hem felsefe bilgisini koruyor mu?",
    },
    {
      passage:
        "Bir sergi Cezerî’nin suyla çalışan düzeneklerini ve saat otomatlarını gösteriyor. Etiket bunları tarihî mekanik tasarım örnekleri olarak açıklıyor; modern dijital işlemci anlatmıyor.",
      prompt: "Hangisi etiketin sınırını aşar?",
      options: [
        "Sergilenen düzeneğin modern dijital bilgisayarla aynı nesne olduğu.",
        "Mekanik tasarım örneği bulunduğu.",
        "Su temelli düzenek anlatıldığı.",
        "Saat otomatlarının sergilendiği.",
        "Tarihî bir mühendislik çalışmasının gösterildiği.",
      ],
      reasons: [
        "Dönem ve çalışma aracı özdeş değildir.",
        "Etiket bunu açıkça belirtir.",
        "Verilen nesneler arasındadır.",
        "Metinde doğrudan vardır.",
        "Verilen tanımla uyumludur.",
      ],
      steps: [
        "Sergi su düzenekleri ve saatleri gösterir.",
        "Etiket bunları tarihî mekanik olarak tanımlar.",
        "Modern dijital işlemci özdeşliği verilen kanıtı aşar.",
      ],
      knowledge: ["Tarihî benzerlik modern araçla birebir özdeşlik değildir."],
      strategy: "Dönem, araç ve işlevi karşılaştır.",
      commonError:
        "Otomat sözcüğünü modern dijital bilgisayarın aynısı sanmak.",
      check: "Seçtiğin yargı metinde olmayan hangi aracı ekliyor?",
    },
    {
      passage:
        "Bir kısa biyografi Aziz Sancar’ın DNA onarımı çalışmalarını ve Nobel Kimya Ödülü’nü anıyor. Biyografi kişinin bütün bilim hayatının ayrıntılı listesini sunmuyor.",
      prompt: "Hangi ifade kanıta en uygundur?",
      options: [
        "DNA onarımı alanında önemli katkı ve belirtilen ödül ilişkisi vardır.",
        "Ödül bütün biyolojik sorunların çözüldüğünü kanıtlar.",
        "Biyografi yalnız rasathane inşasını anlatır.",
        "Kişinin bütün çalışmaları yalnız tek cümleden eksiksiz bilinir.",
        "Kimya ödülü alınması biyolojiyle hiçbir ilişki bulunamayacağını gösterir.",
      ],
      reasons: [
        "İki açık bilgi korunur.",
        "Böyle evrensel sonuç verilmez.",
        "Araştırma nesnesi DNA onarımıdır.",
        "Biyografi bu kapsamı vermiyor.",
        "Alanlar arasında araştırma ilişkisi bulunabilir.",
      ],
      steps: [
        "Biyografide özel çalışma DNA onarımıdır.",
        "Ödül bu katkı bağlamında anılır.",
        "Somut bağ korunur, bütün bilimi çözme iddiası eklenmez.",
      ],
      knowledge: [
        "Bir başarı bilgisi bütün araştırmaların tamamlandığı anlamına gelmez.",
      ],
      strategy: "Ödülün kanıtladığı ilişkiyi kapsamı büyütmeden ifade et.",
      commonError:
        "Tek ödülden bütün bilimsel problemlerin bittiğini çıkarmak.",
      check: "Yanıtın biyografideki özel çalışma konusuyla sınırlı mı?",
    },
    {
      passage:
        "Bir ekip önce eski astronomi metnini başka dile çeviriyor. Daha sonra yeni gözlemler toplayıp eski cetvelin bazı değerlerini değiştiriyor.",
      prompt: "İki aşama hangi sırayla ayrılır?",
      options: [
        "Bilgi aktarımı ve yeni kanıta dayalı katkı",
        "İkisinde de yalnız kopyalama",
        "İlk aşamada kesin yeni ölçüm, ikincide yalnız dil değiştirme",
        "İkisinde de yalnız taziye",
        "İkinci aşamada hiçbir kanıt kullanılmaması",
      ],
      reasons: [
        "Çeviriyle gözleme dayanan düzeltme farklı süreçlerdir.",
        "Yeni gözlem ve düzeltme silinir.",
        "Süreçler ters çevrilmiştir.",
        "Araştırma faaliyetiyle ilgisizdir.",
        "Yeni gözlemler açıkça verilir.",
      ],
      steps: [
        "İlk aşamada dil değişir, yeni veri belirtilmez.",
        "İkinci aşamada gözlem verisi ve cetvel düzeltmesi vardır.",
        "Sıra aktarım ve kanıta dayalı katkıdır.",
      ],
      knowledge: [
        "Çeviri ile özgün araştırma birlikte bulunabilir ama aynı işlem değildir.",
      ],
      strategy: "Her aşamada değişen şeyi belirle.",
      commonError:
        "Çeviriyi otomatik buluş veya yeni araştırmayı salt çeviri saymak.",
      check: "Yanıtında ikinci aşamanın yeni gözlem verisi korunuyor mu?",
    },
    {
      passage:
        "Bir araştırmacı önceki açıklamasına uymayan güvenilir yeni ölçümler elde ediyor. Yöntemini, ölçüm hatalarını ve alternatif açıklamaları denetleyerek modelini güncelliyor.",
      prompt: "Bu tutum bilimsel bilginin hangi yönünü gösterir?",
      options: [
        "Kanıta bağlı denetim ve düzeltilebilirlik",
        "Sonuçların keyfî seçildiğini",
        "Eski olan her bilginin otomatik yanlışlığını",
        "Yeni ölçümün hiçbir rolü olmadığını",
        "Bütün yöntemlerin eşit derecede sınandığını",
      ],
      reasons: [
        "Güncelleme yeni veri ve yöntem kontrolüne dayanır.",
        "Karar gerekçeli denetimle verilir.",
        "Yalnız belirli açıklama yeni kanıtla incelenir.",
        "Ölçümler güncellemenin açık nedenidir.",
        "Böyle kapsamlı karşılaştırma verilmez.",
      ],
      steps: [
        "Yeni ölçüm eski modelle uyuşmaz.",
        "Araştırmacı yöntem ve alternatifleri denetler.",
        "Güncelleme keyfîlik değil kanıta bağlı düzeltilebilirliktir.",
      ],
      knowledge: [
        "Bir açıklamanın değişmesi onu denetleyen yöntemden bağımsız değildir.",
      ],
      strategy: "Güncellemeyi doğuran kanıt ve kontrolü belirle.",
      commonError: "Değişebilirliği gerekçesiz görüş değişimi sanmak.",
      check:
        "Cevabın güvenilir yeni veri ile model güncellemesi arasındaki bağı koruyor mu?",
    },
    {
      passage:
        "Fâtır 27–28’in bir öğretim özeti yağış, farklı ürünler, dağlar ve canlı çeşitliliğine dikkat çekiyor; bilgiyi ve Allah’a saygıyı dinî mesajla ilişkilendiriyor. Özet herhangi bir deneyin sayısal sonucunu vermiyor.",
      prompt: "Hangi yorum bu çerçeveye uygundur?",
      options: [
        "Doğayı düşünme mesajı vardır; belirli fizik yasası için ayrıca bilimsel kanıt gerekir.",
        "Özet bütün genetik denklemleri ölçmüştür.",
        "Her çeşitlilik ifadesi tüm laboratuvarları gereksiz kılar.",
        "Ayetin yalnız cetvel üretim tarihi olduğu kanıtlanır.",
        "Bilgi ve saygı teması hiç bulunmaz.",
      ],
      reasons: [
        "Mesaj ve deneysel sonuç türleri ayrılır.",
        "Denklem veya ölçüm verilmez.",
        "Böyle yöntem dışlaması yoktur.",
        "Tarih bilgisi sunulmaz.",
        "Özet ikisini de açıkça belirtir.",
      ],
      steps: [
        "Özet doğa çeşitliliğini örnekler.",
        "Bunu bilgi ve saygı mesajıyla ilişkilendirir.",
        "Sayısal deney bulunmadığından özel bilimsel yasa ayrıca sınanmalıdır.",
      ],
      knowledge: [
        "Dinî tefekkür çağrısı belirli bir deney sonucunun yerine geçmez.",
      ],
      strategy: "Metnin açık mesajını eklenen ölçüm iddiasından ayır.",
      commonError: "Ayet yorumunu yapılmamış deneyin raporu saymak.",
      check: "Yanıtın özetin gerçekten verdiği temaları koruyor mu?",
    },
  ],
  [
    {
      passage:
        "Bir tarih anlatımı 751 Talas Savaşı’nı bir dönemeç olarak veriyor; ardından farklı Türk topluluklarında ticaret, eğitim ve siyasal ilişkilerle yüzyıllara yayılan değişim anlatıyor.",
      prompt: "Hangi özet metne uygundur?",
      options: [
        "Önemli olay, çok etkenli ve uzun süreç içinde yer alır.",
        "Bütün topluluklar aynı gün aynı biçimde değişmiştir.",
        "Talas’ın hiçbir tarihî önemi yoktur.",
        "Ticaretin hiç etkisi bulunamaz.",
        "Savaş ile süreç aynı tek saniyedir.",
      ],
      reasons: [
        "Savaşın rolü ile sonraki etkenler birlikte korunur.",
        "Sonraki yüzyıllar ve farklı etkenler bunu desteklemez.",
        "Metin onu dönemeç olarak verir.",
        "Ticaret açıkça etkenler arasındadır.",
        "Zaman kapsamı açıkça farklıdır.",
      ],
      steps: [
        "Anlatım Talası önemli bir olay olarak tanımlar.",
        "Ardından birden fazla etken ve uzun zaman verir.",
        "Doğru özet olayın önemini süreçle birlikte taşır.",
      ],
      knowledge: ["Bir dönemeç tek ve yeterli neden olmak zorunda değildir."],
      strategy: "Tek olayla zaman içinde gelişen dönüşümü ayır.",
      commonError: "Önemli savaşı bütün sürecin aynı gün bitmesi saymak.",
      check: "Özetin sonraki etken ve yüzyıllara yer bırakıyor mu?",
    },
    {
      passage:
        "Bir ticaret kaydı İdil bölgesindeki ilişkilerden, başka kayıt Karahanlı çevresindeki benimseme sürecinden söz ediyor. İki kayıt farklı topluluk ve yerleri anlatıyor.",
      prompt: "Bu kaynaklar nasıl birleştirilmelidir?",
      options: [
        "Farklı toplulukların temas yolları kendi bağlamlarıyla korunur.",
        "İki yer aynı şehir olmak zorundadır.",
        "Bir kaydın olayı bütün toplulukların aynı olayıdır.",
        "Devletin benimsemesi her bireyin her ayrıntıda aynılaşmasını kanıtlar.",
        "Farklı yollar aynı dinle ilişkili olamaz.",
      ],
      reasons: [
        "İki kayıt birbirinin yerine geçirilmez.",
        "Kaynaklar ayrı yerler verir.",
        "Bu evrensellik kurulmamıştır.",
        "Kayıtlar bireylerin bütün uygulamalarını vermez.",
        "Bir din farklı yollardan tanınabilir.",
      ],
      steps: [
        "Kayıtların öznesi ve coğrafyası farklıdır.",
        "Temas yolları da farklı ayrıntılar içerir.",
        "Birleştirme ortak süreci kurar ama tek olay veya tek topluluk üretmez.",
      ],
      knowledge: ["Topluluk, devlet ve birey aynı düzeyde özne değildir."],
      strategy: "Her olayın özne ve yerini ayrı yaz.",
      commonError: "Bir devlet kaydını bütün halkların aynı tecrübesi saymak.",
      check: "Her kaydın kendi topluluk bilgisi yorumunda duruyor mu?",
    },
    {
      passage:
        "Bir tarihî coğrafya notu Seyhun ve Ceyhun arasındaki bölgeyi, Buhara ve Semerkant gibi ilim merkezleriyle birlikte tanıtıyor.",
      prompt: "Bölgenin adı hangisidir?",
      options: [
        "Maveraünnehir",
        "Dobruca",
        "Sulucakarahöyük",
        "Kırşehir",
        "Konya",
      ],
      reasons: [
        "İki nehir arasındaki tarihî bölge tanımıdır.",
        "Balkanlar bağlamındaki farklı bölgedir.",
        "Anadolu’daki yerleşmeyle ilişkilidir.",
        "Anadolu şehridir; nehirler arası bölge değildir.",
        "Mevlânâ’yla ilişkili şehir, bu bölgenin adı değil.",
      ],
      steps: [
        "Not iki nehir sınırını belirtir.",
        "Şehir örnekleri Buhara ve Semerkanttır.",
        "Bu sınır ve örnekler Maveraünnehir eşlemesini verir.",
      ],
      knowledge: ["Coğrafi kimlik sınır ve yer örnekleriyle doğrulanır."],
      strategy: "Bölgeyi tek bir şehirle değiştirme.",
      commonError: "Bölge adını tanıdık Anadolu şehriyle karıştırmak.",
      check: "Yanıtın iki nehir arasında kalan geniş bölgeyi mi gösteriyor?",
    },
    {
      passage:
        "Bir yapının ilk kayıtlarında sınır güvenliği ve askerî hazırlık, sonraki kayıtlarında ise yolcu konaklatma ve eğitim görülüyor. Tarihçi bu değişimi bazı ribat örnekleriyle ilişkilendiriyor.",
      prompt: "Hangi yorum doğrudur?",
      options: [
        "Yapının işlevi zaman ve yer bağlamında değişmiş olabilir.",
        "Sonraki işlev ilk kayıttaki görevin hiç var olmadığını kanıtlar.",
        "Bütün ribatlar her çağda yalnız aynı işi yapar.",
        "Bir yapı iki işlev taşıyamaz.",
        "Ribat yalnız bir şiir kitabının adıdır.",
      ],
      reasons: [
        "Kayıtlar iki dönemde farklı işlevler verir.",
        "Yeni işlev geçmiş kaydı silmez.",
        "Verilen değişim bu genellemeyi desteklemez.",
        "Tarihî kayıtlar farklı işlevleri gösterir.",
        "Kurum ve yapı bağlamı verilmiştir.",
      ],
      steps: [
        "İlk kayıtta askerî işlev vardır.",
        "Sonraki kayıtta konaklama ve eğitim eklenir.",
        "Bu iki dönem işlev dönüşümünü gösterir; tüm yapılara aynı genelleme kurulmaz.",
      ],
      knowledge: ["Kurumların işlevi tarih içinde değişebilir."],
      strategy: "Her işlevi ait olduğu dönemle eşleştir.",
      commonError: "Bir kurumun sonraki görevini bütün geçmişine taşımak.",
      check: "Sonucun ilk ve sonraki kaydı birlikte açıklıyor mu?",
    },
    {
      passage:
        "Bir öğüt metni mertlik, cömertlik, hak gözetme ve dayanışma ilkelerini bir arada anlatıyor. Bunların Ahi teşkilatının meslek ahlakıyla ilişkisi kuruluyor.",
      prompt: "Burada hangi bağ vardır?",
      options: [
        "Fütüvvet değerleri ile meslek örgütlenmesinin ahlaki dayanağı",
        "Fütüvvet yalnız belirli bir yıldız cetvelidir.",
        "Cömert her kişi otomatik kayıtlı Ahi üyesidir.",
        "Ahilik yalnız tek kitap sayfasının adıdır.",
        "Değer ve kurum hiçbir şekilde ilişkilendirilemez.",
      ],
      reasons: [
        "Değer bütünü ve kurum ilişkisi ayrı düzeylerde kurulur.",
        "Öğüt ilkeleriyle uyuşmaz.",
        "Ortak değer kurumsal üyeliği kanıtlamaz.",
        "Teşkilat olarak verilmiştir.",
        "Metin ilişkiyi açıkça kurar.",
      ],
      steps: [
        "İlk veri ahlaki ilkelerdir.",
        "İkinci veri bu ilkelerle ilişkili meslek örgütlenmesidir.",
        "Fütüvvet-Ahilik bağı korunur, değerle üyelik tekleştirilmez.",
      ],
      knowledge: ["Bir kurumun değer kaynağıyla üyelik bilgisi farklıdır."],
      strategy: "İlkeyle örgütlenme düzeyini ayır.",
      commonError: "Ortak bir değerden tarihî kuruma üyelik üretmek.",
      check: "Yanıtın cömertlik değerini üyelik belgesi sayıyor mu?",
    },
    {
      passage:
        "Bir Ahi birliğinin kaydı çırak eğitimini, ölçü ve kaliteye özeni, zor durumdaki üyeye desteği anlatıyor. Bir yorumcu yalnız toplumsal etkisine bakıp asıl programını saray yöneticisi yetiştirme diye tanımlıyor.",
      prompt: "Yorumun hatası nedir?",
      options: [
        "Dolaylı toplumsal etkiyi belgelenen temel görevin yerine koyar.",
        "Çırak eğitiminin bulunduğunu söylemesi",
        "Dayanışma gördüğünü belirtmesi",
        "Kaliteye özenin önemini fark etmesi",
        "Ahiliğin toplumla ilişkisini incelemesi",
      ],
      reasons: [
        "Kayıtta mesleki-ahlaki ve sosyal hizmetler vardır.",
        "Bu kayıt doğrudan verilir.",
        "Destek eylemi açıkça anlatılır.",
        "Bu da kayıtla uyumludur.",
        "İncelemek tek başına hata değildir.",
      ],
      steps: [
        "Kaydın doğrudan işleri meslek eğitimi ve dayanışmadır.",
        "Yeni yorum saray yöneticisi programı ekler.",
        "Toplumsal etki bu özel temel programı kendiliğinden kanıtlamaz.",
      ],
      knowledge: [
        "Bir kurumun geniş etkisi ana hizmetiyle aynı kapsam değildir.",
      ],
      strategy: "Temel faaliyet listesini eklenen programa karşılaştır.",
      commonError: "Kurumun her etkisini onun kuruluş amacı saymak.",
      check: "Saray programı için kayıt dışında somut kanıt var mı?",
    },
    {
      passage:
        "Bir araştırmacı, Yesevî’nin hikmetlerinin Anadolu’da okunmasını onun bu bölgedeki her şehirde doğmuş ve yaşamış olmasına kanıt sayıyor. Kaynak yalnız eserlerin etkisini anlatıyor.",
      prompt: "Hangi ayrım gerekir?",
      options: [
        "Eserin etki coğrafyası ile yazarın yaşam yeri ayrıdır.",
        "Bir eser yalnız yazarın doğduğu yerde okunabilir.",
        "Etki varsa eser hiç aktarılmamıştır.",
        "Anadolu’da okunma Yesi bağını mutlaka siler.",
        "Kişinin adı geçince bütün coğrafya iddiaları doğrudur.",
      ],
      reasons: [
        "Okunma, yazarın orada yaşadığını kanıtlamaz.",
        "Bilginin dolaşımı böyle sınırlanmaz.",
        "Etki aktarım yoluyla da oluşabilir.",
        "İki farklı ilişki birlikte bulunabilir.",
        "Her iddia ayrı kanıt ister.",
      ],
      steps: [
        "Kaynakta aktarılan veri eserlerin okunmasıdır.",
        "Araştırmacı buna yazarın yaşamına ilişkin yeni sonuç ekler.",
        "Etki alanı ile yaşam yeri ayrılarak yanlış geçiş kaldırılır.",
      ],
      knowledge: [
        "Fikirlerin dolaşımı kişinin her yere gitmesini gerektirmez.",
      ],
      strategy: "Okunma fiilini yaşama fiilinden ayır.",
      commonError: "Kültürel etkiyi otomatik biyografi kanıtı saymak.",
      check: "Kişinin orada yaşadığına ilişkin ayrıca hangi belge verildi?",
    },
    {
      passage:
        "Bir kişi tanıtımında “Numan bin Sabit; İmam-ı Âzam adıyla tanınır; hukukî yorum ve içtihadın gelişiminde etkilidir.” deniliyor. Aynı not inanç konularında da görüşleri bulunduğunu ekliyor.",
      prompt: "Tanıtım için hangi yorum uygundur?",
      options: [
        "Ebû Hanîfe’nin fıkıhtaki rolü ve çok yönlü birikimi birlikte anlatılır.",
        "Kişi yalnız şiir yazmış, hukukla ilgilenmemiştir.",
        "İnanç görüşü bulunması fıkıh rolünü imkânsız kılar.",
        "İmam-ı Âzam bir yer adı olarak kullanılmıştır.",
        "Bir alanda tanınmak bütün diğer eserlerin yokluğunu kanıtlar.",
      ],
      reasons: [
        "Öncelikli alan başka konuları dışlamaz.",
        "Hukukî yorum açıkça verilmiştir.",
        "İki alan aynı kişide bulunabilir.",
        "Kişinin tanınma adı olarak verilmiştir.",
        "Not başka alanı ayrıca belirtir.",
      ],
      steps: [
        "Tam ad ve tanınma adı aynı kişiye bağlanır.",
        "Hukukî katkı fıkıh alanını gösterir.",
        "İnanç görüşleri de korunur; kişi tek alana kapatılmaz.",
      ],
      knowledge: [
        "Baskın alan kişinin bütün çalışma listesinin sınırı değildir.",
      ],
      strategy: "İsim, alan ve ek çalışma bilgisini birlikte tut.",
      commonError: "Öncelikli uzmanlığı mutlak tek çalışma alanı sanmak.",
      check: "Cevabın notun eklediği inanç çalışmalarına da yer bırakıyor mu?",
    },
    {
      passage:
        "Bir ders Cafer es-Sâdık’ın görüşleriyle ilişkili fıkhi bir gelenekten ve onun İmamiye çerçevesiyle tarihî bağından söz ediyor. Öğrenci bu iki düzlemi hiçbir ayrım olmadan aynı tek tanım yapıyor.",
      prompt: "Hangi düzeltme daha uygundur?",
      options: [
        "Fıkhi yöntemle itikadi-siyasi çerçeve ilişkili ama ayrı düzeylerdir.",
        "İlişki bulunması iki düzeyin her ayrıntıda aynı olmasıdır.",
        "Cafer es-Sâdık yalnız bir şehir adıdır.",
        "Fıkhi gelenek yalnız gök gözlemi yapar.",
        "Bir kişiyle bağlantılı iki kavramın ilişkisi olamaz.",
      ],
      reasons: [
        "Bağ korunurken alan farkı silinmez.",
        "Ortaklık tanım özdeşliği değildir.",
        "Metinde şahsiyet olarak anılır.",
        "Fıkıh hukuk ve uygulama hükümleriyle ilgilidir.",
        "Metin ilişkiyi açıkça kurar.",
      ],
      steps: [
        "Bir bilgi fıkhi yönteme ilişkindir.",
        "Diğeri daha geniş inanç ve tarih çerçevesine aittir.",
        "İki düzey arasındaki bağ korunur, tanımlar tekleştirilmez.",
      ],
      knowledge: [
        "İlişki bulunması sınıflama düzeylerinin aynı olduğu anlamına gelmez.",
      ],
      strategy: "Her terimin hangi alanı anlattığını ayrı belirle.",
      commonError:
        "Caferi ve İmamiye ilişkisini alan farkını silerek anlatmak.",
      check: "Düzeltmen hem ilişkiyi hem alan ayrımını koruyor mu?",
    },
    {
      passage:
        "Bir katalog Mâtürîdî’nin Kitâbü’t-Tevhîd eserini inanç esaslarını gerekçelendirmeyle, Te’vîlâtü’l-Kur’an eserini ayet yorumuyla ilişkilendiriyor.",
      prompt: "Bu iki kayıt hangi sonucu destekler?",
      options: [
        "Aynı şahsiyetin kelam ve tefsir alanlarıyla ilgili eserleri vardır.",
        "İki eser aynı kitabın zorunlu tek sayfasıdır.",
        "Ayet yorumu her durumda yalnız ticaret hükmüdür.",
        "İnanç gerekçelendirme yalnız rasathane kurmaktır.",
        "Bir eser varsa diğeri gerçek olamaz.",
      ],
      reasons: [
        "İki eserin konusu ayrı verilmiştir.",
        "Katalog iki eser adı verir.",
        "Tefsirin kapsamı böyle daraltılmaz.",
        "Alan ve faaliyet karıştırılmıştır.",
        "Bir kişinin birden fazla eseri bulunabilir.",
      ],
      steps: [
        "İlk eserin konusu inanç gerekçeleridir.",
        "İkincinin konusu ayet yorumudur.",
        "Bu iki kayıt kelam ve tefsir katkılarını aynı kişide birleştirir.",
      ],
      knowledge: ["Kişi ortaklığı eserlerin konu farkını silmez."],
      strategy: "Her eseri ayrı araştırma konusuyla eşleştir.",
      commonError: "Aynı yazara ait eserleri tek konu sanmak.",
      check: "Her iki eser için ayrı bir alan gerekçesi gösterebiliyor musun?",
    },
    {
      passage:
        "Bir kaynak Şâfiî’nin er-Risâle eserinde hüküm çıkarma yöntemlerini sistemleştirmesini anlatıyor. Başka eserlerinin de bulunduğunu belirtiyor.",
      prompt: "Kaynağın vurguladığı katkı hangisidir?",
      options: [
        "Fıkıh usulüne yöntem katkısı",
        "Bütün matematik işlemlerinin icadı",
        "Yalnız şehirlerin konaklama düzeni",
        "Yeni bir yıldız cetveli hazırlama",
        "Başka hiçbir eser yazmamış olması",
      ],
      reasons: [
        "Hüküm çıkarma yöntemleri bu alanın konusudur.",
        "Matematik araştırması verilmemiştir.",
        "Kurumun hizmeti değil yöntem eseridir.",
        "Gök gözlemi belirtilmez.",
        "Kaynak başka eserleri de bulunduğunu söyler.",
      ],
      steps: [
        "İncelenen şey hükmün hangi yöntemle çıkarıldığıdır.",
        "Bu soru fıkıh usulü alanına aittir.",
        "Er-Risâle’nin katkısı yöntem düzeyinde açıklanır; eser sayısı daraltılmaz.",
      ],
      knowledge: ["Usul, ilgili alanın yöntemlerini sistemli incelemektir."],
      strategy: "Araştırmanın sonucundan önce yöntem sorusunu fark et.",
      commonError:
        "Bir eser bilgisini başka bütün eserlerin yokluğuna çevirmek.",
      check: "Cevabın hüküm çıkarma yöntemi ifadesini karşılıyor mu?",
    },
    {
      passage:
        "Bir tanıtım Eş’arî’nin inanç konularındaki farklı görüşleri Makâlâtü’l-İslâmiyyîn adlı eserde topladığını söylüyor. Aynı tanıtım akıl yürütmeden yararlandığını da belirtiyor.",
      prompt: "Hangi yargı metinle çelişir?",
      options: [
        "Metni önemsemesi hiç akıl yürütmediğini kanıtlar.",
        "İnanç tartışmalarıyla ilgili bir eser anıldığı.",
        "Birden fazla görüşün ele alındığı.",
        "Akıl yürütmeden yararlanıldığı.",
        "Kişiyle eser arasında ilişki kurulduğu.",
      ],
      reasons: [
        "Akıl yürütme kullanımı açıkça verilmiştir.",
        "Bu doğrudan tanıtımdadır.",
        "Farklı görüşleri toplama bilgisi vardır.",
        "Açıkça belirtilmiştir.",
        "Eser Eş’arî’ye bağlanır.",
      ],
      steps: [
        "Tanıtım hem inanç eserini hem akıl kullanımını verir.",
        "Metni önemsemek diğer aracı otomatik dışlamaz.",
        "Hiç akıl yürütmeme iddiası açık veriyle çelişir.",
      ],
      knowledge: [
        "Bir yöntemi öncelemek başka yöntemlerin tümden yokluğu değildir.",
      ],
      strategy: "Mutlak yokluk iddiasını açık ikinci veriyle karşılaştır.",
      commonError: "Metin vurgusundan bütün akıl kullanımını silmek.",
      check: "Çelişen yargıyı metindeki hangi fiille karşılaştırdın?",
    },
    {
      passage:
        "Bir edebiyat dosyasında Türkçe hikmetler, dinî-ahlaki öğütler ve Yesi çevresindeki etki birlikte anlatılıyor. Dosya, bunları Divân-ı Hikmet geleneğiyle ilişkilendiriyor.",
      prompt: "Bu bilgiler hangi şahsiyetle birleşir?",
      options: [
        "Ahmed Yesevî",
        "Mevlânâ",
        "Yunus Emre",
        "Mâtürîdî",
        "Ahi Evran",
      ],
      reasons: [
        "Hikmet, eser ve Yesi bağı birlikte uyumludur.",
        "Mesnevî ve Konya bağlamıyla ayırt edilir.",
        "Divan ve Risâletü’n-Nushiyye ile tanınır.",
        "Kelam ve tefsir eserleriyle anılır.",
        "Kırşehir ve Ahilik bağı öne çıkar.",
      ],
      steps: [
        "İpuçları yalnız şiir değil, hikmet ve özel eser adıdır.",
        "Yesi çevresi ek coğrafi bağ sağlar.",
        "Bu üç veri Ahmed Yesevî’de birleşir.",
      ],
      knowledge: [
        "Genel eser türü yerine özel ad ve bağlam birlikte kullanılmalıdır.",
      ],
      strategy: "Eser ve yer bilgisini çapraz denetle.",
      commonError: "Her öğüt şiirini aynı yazara vermek.",
      check: "Cevabın Divân-ı Hikmet ile Yesi bilgisini birlikte açıklıyor mu?",
    },
    {
      passage:
        "Bir arşiv listesinde Mesnevî, Divân-ı Kebîr ve Fîhi Mâ Fîh aynı şahsiyet altında; Konya ise yaşam ve etki bağı olarak yer alıyor.",
      prompt: "Bu liste hangi şahsiyete aittir?",
      options: [
        "Mevlânâ Celâleddîn-i Rûmî",
        "Ahmed Yesevî",
        "Eş’arî",
        "Şâfiî",
        "Cafer es-Sâdık",
      ],
      reasons: [
        "Üç eser ve Konya bağı ona aittir.",
        "Divân-ı Hikmet farklı eser geleneğidir.",
        "Verilen edebî eserler onun kelam listesi değildir.",
        "Er-Risâle ve el-Ümm ile karıştırılır.",
        "Bu eser listesiyle eşleşmez.",
      ],
      steps: [
        "Liste üç özel eser adını verir.",
        "Konya bağı aynı şahsiyet için destekleyici bilgidir.",
        "Her iki kanıt Mevlânâ eşlemesini doğrular.",
      ],
      knowledge: ["Eser adları genel şiir ortaklığından daha ayırt edicidir."],
      strategy: "Birden fazla eserin aynı kişiyle bağını doğrula.",
      commonError: "Divan sözcüğü ortak diye farklı eserleri aynı sanmak.",
      check: "Üç eser de seçtiğin isimle eşleşiyor mu?",
    },
    {
      passage:
        "Bir kurum tarihi Ahi Evran’ı Kırşehir’deki esnaf teşkilatlanması, meslek eğitimi ve çalışma ahlakıyla ilişkilendiriyor.",
      prompt: "Tanıtımın iki ana alanı hangileridir?",
      options: [
        "Mesleki örgütlenme ve toplumsal-ahlaki eğitim",
        "Yalnız saray diplomasisi ve yıldız gözlemi",
        "Yalnız kitap cilt sayısı ve takvim tarihi",
        "Yalnız kelam tartışması ve kıraat usulü",
        "Bir şehir adı olduğu için hiçbir kurum ilişkisi",
      ],
      reasons: [
        "Verilen faaliyetlerin ikisi de korunur.",
        "Bu faaliyetler anlatılmaz.",
        "Metin bu iki niceliği vermez.",
        "Kurum faaliyetinin özel alanları farklıdır.",
        "Kırşehir’le birlikte açık faaliyetler de vardır.",
      ],
      steps: [
        "Kaynak esnaf teşkilatlanmasını belirtir.",
        "Meslek öğretimi ve ahlak eğitimi de eklenir.",
        "Doğru çift kurumsal ve eğitsel-toplumsal yönleri birlikte karşılar.",
      ],
      knowledge: ["Yer ipucu faaliyet kanıtıyla birlikte anlam kazanır."],
      strategy: "İki farklı fiile iki alan karşılığı bul.",
      commonError: "Kurumun meslek ve ahlak yönlerinden birini silmek.",
      check: "Yanıtın hem teşkilatlanmayı hem eğitimi açıklıyor mu?",
    },
    {
      passage:
        "Bir kaynak Hacı Bektaş-ı Velî’yi Sulucakarahöyük çevresiyle, Makâlât eserinin ona nispet edilmesiyle ve kişinin eline-diline-davranışına sahip olması öğüdüyle tanıtıyor.",
      prompt: "Hangi yorum bu tanıtımı korur?",
      options: [
        "Yer, eser ilişkisi ve ahlaki eğitim birlikte verilmiştir.",
        "Makâlât burada yalnız gök cetvelidir.",
        "Ahlaki öğüt kişinin bütün hayat tarihlerini kesin ölçer.",
        "Sulucakarahöyük bütün eserlerin aynı yazarı olduğunu kanıtlar.",
        "Nispet ifadesi hiçbir eser ilişkisinin kurulmadığını söyler.",
      ],
      reasons: [
        "Üç bilgi türü ayrı ama aynı şahsiyetle bağlantılıdır.",
        "Öğretim ve eser bağlamı farklıdır.",
        "Öğüt biyografik tarih ölçümü değildir.",
        "Yer tek başına böyle genel sonuç vermez.",
        "Kaynak sınırlı atıf ilişkisini açıkça kurar.",
      ],
      steps: [
        "Kaynak bir yer, bir eser nispeti ve bir öğüt verir.",
        "Bunlar farklı kanıt türleridir.",
        "Tanıtım bu üç bağı korur; verilmemiş kesin tarih veya eser sahipliği genellemesi eklemez.",
      ],
      knowledge: [
        "Eser nispeti anlatılırken kaynağın kesinlik derecesi korunur.",
      ],
      strategy: "Farklı bilgi türlerini aynı ölçüm gibi kullanma.",
      commonError: "Ahlaki öğüdü ayrıntılı biyografi kanıtı sanmak.",
      check: "Yorumunda yer, nispet ve öğüt ayrı ayrı karşılık buluyor mu?",
    },
    {
      passage:
        "Bir dosya Yunus Emre’nin anlaşılır Türkçeyle işlediği dinî-ahlaki şiirlerden, Divan ve Risâletü’n-Nushiyye eserlerinden söz ediyor. Dosyada farklı yerlerde makamlarının bulunduğu da belirtiliyor.",
      prompt: "Hangi sonuç için ayrıca tarihî kanıt gerekir?",
      options: [
        "Bedeninin bütün makam yerlerinde aynı anda gömülü olduğu.",
        "Eserlerle Yunus arasında bağ kurulduğu.",
        "Türkçe şiirlerin anıldığı.",
        "Dinî-ahlaki temaların işlendiği.",
        "Birden fazla yerde makam anıldığı.",
      ],
      reasons: [
        "Makam bilgisi böyle fiziksel sonucu vermez.",
        "Dosyada açıkça verilmiştir.",
        "Doğrudan metin bilgisidir.",
        "Dosya bu içeriği belirtir.",
        "Bu da doğrudan bilgidir.",
      ],
      steps: [
        "Dosya eser ve tema bilgilerini açıkça verir.",
        "Makamların çokluğu kültürel sahiplenme bağlamındadır.",
        "Tek bedenin bütün yerlerde bulunması ayrı ve kanıtsız fiziksel iddiadır.",
      ],
      knowledge: [
        "Makam ve hatıra ilişkisi tarihî mezar belgesiyle aynı şey değildir.",
      ],
      strategy: "Kültürel bağla fiziksel yer iddiasını ayır.",
      commonError:
        "Makam sayısını bedenin aynı anda farklı yerlerde bulunması sanmak.",
      check: "Seçeneğin dosyada verilmeyen bir fiziksel sonuç mu ekliyor?",
    },
    {
      passage:
        "Bir araştırma Sarı Saltuk’la ilgili belge kayıtlarını ve Saltuknâme’deki menkıbeleri ayrı başlıklarda inceliyor. İkisinin kültürel değeri bulunduğunu, kanıt türlerinin aynı olmadığını söylüyor.",
      prompt: "Bu yöntemin gerekçesi nedir?",
      options: [
        "Tarihî belge ile menkıbe farklı sorular için farklı biçimde değerlendirilir.",
        "Menkıbe varsa kültürel hiçbir bilgi edinilemez.",
        "Belgeyle menkıbenin her ayrıntısı aynı kesinliktedir.",
        "Sarı Saltuk yalnız bir matematik işleminin adıdır.",
        "İki kaynak türü varsa karşılaştırma imkânsızdır.",
      ],
      reasons: [
        "Kültürel değer kanıt türü ayrımını ortadan kaldırmaz.",
        "Kaynak ikisinin de kültürel değerini kabul eder.",
        "Araştırma bunun tersini belirtir.",
        "Kişi ve anlatı geleneği söz konusudur.",
        "Araştırma bunları ayrı değerlendirerek karşılaştırır.",
      ],
      steps: [
        "Araştırma iki kaynak türünü ayırır.",
        "İkisinin değerini tümden reddetmez.",
        "Ayırım her iddiaya uygun kanıtla yaklaşmayı sağlar.",
      ],
      knowledge: ["Kaynak türü, ondan çıkarılabilecek sonucun gücünü etkiler."],
      strategy: "Kaynağın değerini ve doğrulama yöntemini ayrı düşün.",
      commonError:
        "Kültürel anlatıyı ya tümden değersiz ya tümden belge saymak.",
      check:
        "Yanıtın iki kaynağın değerini korurken kanıt farkını açıklıyor mu?",
    },
    {
      passage:
        "Bir çalışma Hacı Bayrâm-ı Velî’yi Ankara’daki öğretim hayatı, Somuncu Baba’yla manevi eğitim ilişkisi ve ihtiyaç sahiplerine destek faaliyetleriyle tanıtıyor.",
      prompt: "Bu bilgiler nasıl okunmalıdır?",
      options: [
        "Öğrenme, şehir ve toplumsal hizmet bağları birlikte korunur.",
        "Destek verdiği için başka hiçbir kişi dayanışma göstermemiştir.",
        "Ankara adı bütün şahsiyetlerin burada doğduğunu kanıtlar.",
        "Manevi eğitim alınması öğretim hayatını imkânsız kılar.",
        "Yardımlaşma varsa kaynakta şehir bilgisi yoktur.",
      ],
      reasons: [
        "Üç farklı ilişki aynı şahsiyetin tanıtımında yer alır.",
        "Bir kişinin değeri başkalarını dışlamaz.",
        "Tek kişiyle ilgili yer bağı böyle genellenmez.",
        "İki yönün birlikte bulunması mümkündür.",
        "Ankara açıkça verilmiştir.",
      ],
      steps: [
        "Çalışma şehir bağını Ankara olarak verir.",
        "Öğrenme ilişkisi ve yardım faaliyetleri ayrı eklenir.",
        "Yorum üçünü de korur, ortak değerden dışlama üretmez.",
      ],
      knowledge: [
        "Kişi tanıtımında ortak değer ve ayırt edici bilgi birlikte kullanılır.",
      ],
      strategy: "Her ilişki için ayrı kaynak cümlesi göster.",
      commonError:
        "Bir şahsiyeti tanıtan değeri başka herkesten zorunlu dışlamak.",
      check:
        "Cevabın Ankara, eğitim ve yardım bağlarını birlikte açıklıyor mu?",
    },
    {
      passage:
        "Nisâ 69’un öğretim özeti, Allah’a ve elçiye itaat edenlerin peygamberler, sıddıklar, şehitler ve salihlerle birlikte olmasını anlatıyor. Özet herhangi bir şehir veya meslek örgütünü adlandırmıyor.",
      prompt: "Bu özetten hangisi çıkarılamaz?",
      options: [
        "Ahiliğin bütün işyeri kurallarının burada tek tek yazılı olduğu.",
        "Dinî örneklikle ilgili grupların anıldığı.",
        "Birlikte olma mesajının bulunduğu.",
        "İtaat konusuna yer verildiği.",
        "Salihlerin anıldığı.",
      ],
      reasons: [
        "Meslek örgütü ve programı verilmemiştir.",
        "Dört grup doğrudan belirtilir.",
        "Özet bu ilişkiyi açıkça anlatır.",
        "Başlangıç koşulu budur.",
        "Listede açıkça bulunur.",
      ],
      steps: [
        "Özet belirli dinî grupları ve birlikte olmayı verir.",
        "Şehir veya kurum programı sunmaz.",
        "Ahilik yönetmeliği sonucu bu nedenle metne eklenen ayrıntıdır.",
      ],
      knowledge: [
        "Değer ilişkisi kurumun ayrıntılı programının metinde bulunduğunu göstermez.",
      ],
      strategy:
        "Olumsuz kökte açık listeyle eklenen kurum iddiasını karşılaştır.",
      commonError:
        "Ayetin mesajından verilmeyen bütün tarihî kurum ayrıntılarını çıkarmak.",
      check:
        "Kanıtsız seçeneğin özetin hiç adlandırmadığı hangi kurumu eklediğini gördün mü?",
    },
  ],
];
const answerPositions024: number[][] = [
  [0, 2, 0, 1, 1, 4, 3, 1, 1, 2, 2, 4, 3, 4, 0, 2, 3, 3, 4, 0],
  [4, 0, 0, 3, 0, 4, 3, 2, 2, 1, 1, 2, 4, 0, 2, 1, 1, 3, 4, 3],
  [2, 1, 3, 4, 1, 4, 0, 1, 2, 4, 0, 0, 2, 3, 3, 0, 2, 3, 4, 1],
  [0, 3, 1, 3, 1, 2, 0, 2, 3, 1, 4, 2, 4, 0, 0, 3, 1, 4, 2, 4],
];
export const forge024HumanitiesTopics: Record<string, string> =
  Object.fromEntries(sourceGuides024.map((g) => [g.id, g.detail]));
export const forge024HumanitiesGuides: LessonGuide[] = sourceGuides024.map(
  ({ title: _title, detail: _detail, ...g }) => g,
);
export const forge024HumanitiesLessons: Lesson[] = sourceGuides024.map(
  (g, pack) => ({
    id: g.id,
    subjectId: "tyt-din",
    title: txt(g.title),
    minutes: g.minutes,
    objectives: g.objectives.map(txt),
    body: g.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: questionRows024[pack].map((q, i): Question => {
      const answer = answerPositions024[pack][i];
      const order = [0, 1, 2, 3, 4].map((j) => (j - answer + 5) % 5);
      return {
        id: `${g.id}-024-${i + 1}`,
        passage: txt(q.passage),
        prompt: txt(q.prompt),
        options: order.map((j) => txt(q.options[j])),
        answer,
        hint: txt(q.strategy),
        explanation: txt(q.steps.join(" ") + " " + q.reasons[0]),
        skill: g.id,
        guidance: {
          knowledge: q.knowledge,
          strategy: q.strategy,
          steps: q.steps,
          optionReasons: order.map((j) => q.reasons[j]),
          commonError: q.commonError,
          check: q.check,
        },
      };
    }),
    source: txt(g.source),
    tags: ["kaynakli-anlatim", "adim-adim", "Özgün öğretim soruları"],
  }),
);

export type EvidenceNode024 = { id: string; label: string; detail: string };
export type EvidenceLink024 = {
  from: string;
  to: string;
  valid: boolean;
  evidence: string;
};
export type HumanitiesScene024 = {
  title: string;
  context: string;
  nodes: EvidenceNode024[];
  links: EvidenceLink024[];
  result: string;
  explanation: string;
};
function bounded024(n: number, max: number) {
  if (!Number.isInteger(n) || n < 0 || n >= max)
    throw new RangeError("Seçim aralığı dışında.");
  return n;
}
function flag024(v: boolean) {
  if (typeof v !== "boolean")
    throw new TypeError("Koşul doğru veya yanlış olmalı.");
  return v;
}
export const humanitiesDefaults024 = {
  worldStory: 0,
  worldFocus: 0,
  worldDetail: false,
  item: 0,
  tradition: 0,
  category: 0,
  translation: true,
  observation: false,
  revision: false,
  institution: 0,
  person: 0,
  claim: 0,
  record: 0,
  reason: "",
  reveal: false,
};
export const worldStories024 = [
  "Toplanma anlatımı",
  "Ara dönem anlatımı",
  "Kozmik düzen ve sonraki olay",
  "Cenaze hazırlığı",
  "Yakınlara destek",
];
export const worldFocusLabels024 = [
  "Fiil veya dönem",
  "Yer ve muhatap bilgisi",
  "Süreçteki sınır",
];
export function worldEvidence024(
  story = 0,
  focus = 0,
  detail = false,
): HumanitiesScene024 {
  bounded024(story, 5);
  bounded024(focus, 3);
  flag024(detail);
  const rows = [
    {
      base: "İnsanlar yeniden diriltilmiş ve bir araya getirilmiştir.",
      extra: "Toplanılan yere mahşer adı verildiği de açık.",
      values: [
        "Haşir",
        detail ? "Mahşer adı açık" : "Yer adı yazılı değil",
        "Ba’s olmuş",
      ],
      why: "Toplanma fiili verilidir. Yer adı eklenmesi eylemi değiştirmez; yalnız mekân bilgisi kazandırır.",
    },
    {
      base: "Kişi ölmüş; yeniden diriliş henüz olmamış.",
      extra: "Ayrıca defin yapıldığı da kayıtlı.",
      values: [
        "Berzah",
        detail ? "Defin kaydı var" : "Defin kaydı verilmedi",
        "Ölüm ile ba’s arasında",
      ],
      why: "Berzahın iki sınırı ölüm ve yeniden diriliştir. Defin kaydının eklenmesi bu dönem tanımını değiştirmez.",
    },
    {
      base: "Birinci cümle dünya düzeninin son bulmasını anlatır.",
      extra: "İkinci cümle insanların yeniden diriltildiğini de anlatır.",
      values: [
        "Birinci olay: Kıyamet",
        "Yer bilgisi yok",
        detail ? "Ba’s ayrıca anlatıldı" : "Ba’s henüz yazılı değil",
      ],
      why: "İlk cümlenin fiili kozmik düzenin sonudur. Sonraki diriliş bilgisi eklenirse ba’s ayrıca desteklenir; iki olay tek fiil olmaz.",
    },
    {
      base: "Cenaze için genel defin hazırlığı anlatılır.",
      extra:
        "Yapılan belirli işlem olarak bedenin kefene sarıldığı ayrıca söylenir.",
      values: [
        detail ? "Özel işlem: Tekfin" : "Üst başlık: Teçhiz",
        "Vefat edenin bedeni",
        detail
          ? "Tekfin, teçhizin alt işlemidir"
          : "Alt işlem henüz ayrılmamış",
      ],
      why: "Genel hazırlık teçhizdir. Kefene sarma açıkça yazılıysa özel alt işlem tekfindir.",
    },
    {
      base: "Yakınlara başsağlığı dilenmiş ve ailenin yemek hazırlığına yardım edilmiştir.",
      extra: "Vefat eden için cenaze namazı kılındığı da kayıtlı.",
      values: [
        detail ? "Taziye ve cenaze namazı" : "Taziye ve somut destek",
        detail ? "Yakınlar ve vefat eden" : "Yaşayan yakınlar",
        "Farklı görevler birlikte bulunabilir",
      ],
      why: "Başsağlığı yaşayan yakınlara yönelir. Cenaze namazı kaydı, vefat eden için dua olan ayrı görevi ekler; önceki desteği silmez.",
    },
  ];
  const x = rows[story],
    context = x.base + (detail ? " " + x.extra : " Ek ayrıntı verilmedi.");
  return {
    title: "Veri değişince hangi sonuç değişir?",
    context,
    nodes: [
      { id: "record", label: worldStories024[story], detail: context },
      {
        id: "focus",
        label: worldFocusLabels024[focus],
        detail: "Soru yalnız bu boyut için açık kanıtı arar.",
      },
      { id: "result", label: x.values[focus], detail: x.why },
    ],
    links: [
      {
        from: "record",
        to: "focus",
        valid: true,
        evidence: "Verilen olay, sorulan boyuttan ayrı okunur.",
      },
      {
        from: "focus",
        to: "result",
        valid: !(story === 0 && focus === 1 && !detail),
        evidence: x.why,
      },
    ],
    result: x.values[focus],
    explanation:
      x.why +
      " Bu şema dinî kavram bağlarını gösterir; gerçek süreyi, yer ölçeğini veya bir kişinin ahiret sonucunu ölçmez.",
  };
}
export const traditionLabels024 = [
  "Yahudilik",
  "Hristiyanlık",
  "İki din için ortak üst özellik",
];
export const categoryLabels024 = [
  "Metin",
  "Mekân",
  "Kutsal zaman",
  "Ritüel",
  "Simge veya giysi",
  "Beslenme ilkesi",
  "İnanç",
];
const traditionItems024 = [
  [
    "Tanah",
    0,
    0,
    "Tora, Neviim ve Ketuvim adlı üç kısımdan oluşan kutsal yazılar bütünü.",
  ],
  ["Tora", 0, 0, "Tanah’ın ilk beş kitapla ilişkili bölümü."],
  ["Talmud", 0, 0, "Rabbanî yorum ve dinî-hukuki tartışma külliyatı."],
  ["Sinagog", 0, 1, "Yahudi cemaatinin ibadet ve toplanma mekânı."],
  [
    "Şabat",
    0,
    2,
    "Cuma gün batımından cumartesi gün batımına haftalık kutsal zaman.",
  ],
  [
    "Kipa",
    0,
    4,
    "Özellikle geleneksel ibadet bağlamında kullanılan baş örtüsü.",
  ],
  ["Menora", 0, 4, "Geleneksel yedi kollu kandillik simgesi."],
  ["Davud Yıldızı", 0, 4, "Altı köşeli yıldız motifi."],
  ["Kaşer", 0, 5, "Yahudilikte beslenmeye ilişkin dinî uygunluk."],
  [
    "Kitab-ı Mukaddes",
    1,
    0,
    "Hristiyan Kutsal Kitabı: Eski Ahit ve Yeni Ahit.",
  ],
  ["Yeni Ahit", 1, 0, "Dört İncil’in yanında başka yazılar da içeren bölüm."],
  [
    "Vaftiz",
    1,
    3,
    "Su ile ilişkili kabul ve iman ritüeli; uygulanış biçimleri değişebilir.",
  ],
  ["Evharistiya", 1, 3, "İsa’nın son yemeğiyle ilgili ekmek ve şarap ayini."],
  ["Noel", 1, 2, "İsa’nın doğumunu anma."],
  ["Paskalya", 1, 2, "Hristiyan inancında İsa’nın dirilişinin kutlanması."],
  ["Haç", 1, 4, "Çarmıha gerilişle ilişkilenen Hristiyan simgesi."],
  ["Kilise", 1, 1, "Hristiyan ibadet topluluğu veya ibadet binası."],
  [
    "Tek Tanrı",
    2,
    6,
    "Yahudilik ve ana akım Hristiyan öğretisinde ortak üst inanç özelliği; ayrıntılı yorumları aynı değildir.",
  ],
] as const;
export const traditionItemLabels024 = () => traditionItems024.map((x) => x[0]);
export function religionEvidence024(
  item = 0,
  tradition = 0,
  category = 0,
): HumanitiesScene024 {
  const x = traditionItems024[bounded024(item, traditionItems024.length)];
  bounded024(tradition, 3);
  bounded024(category, 7);
  const shared = x[1] === 2,
    traditionOK = shared || tradition === x[1],
    categoryOK = category === x[2];
  const result =
    traditionOK && categoryOK
      ? "İki sınıflama da uyumlu"
      : !traditionOK && !categoryOK
        ? "Gelenek ve kavram türü uyuşmuyor"
        : traditionOK
          ? "Kavram türü uyuşmuyor"
          : "Gelenek eşlemesi uyuşmuyor";
  return {
    title: "Gelenek ile kavram türünü ayrı denetle",
    context: x[3],
    nodes: [
      { id: "item", label: x[0], detail: x[3] },
      {
        id: "tradition",
        label: traditionLabels024[tradition],
        detail: shared
          ? "Bu üst özellik iki gelenekte de bulunur; tek başına ayırmaz."
          : `Verilen ders bağlamı ${traditionLabels024[x[1]]}.`,
      },
      {
        id: "category",
        label: categoryLabels024[category],
        detail: `Kavramın bu karttaki türü: ${categoryLabels024[x[2]]}.`,
      },
    ],
    links: [
      {
        from: "item",
        to: "tradition",
        valid: traditionOK,
        evidence: shared
          ? "Genel tek Tanrı ifadesi iki dinin ayrıntılı öğretisini özdeş yapmaz."
          : `Kart ${traditionLabels024[x[1]]} için verilmiş; her kişinin her işi için hüküm vermez.`,
      },
      {
        from: "item",
        to: "category",
        valid: categoryOK,
        evidence: `${x[0]} bu tanımda ${categoryLabels024[x[2]].toLocaleLowerCase("tr-TR")} sınıfındadır.`,
      },
    ],
    result,
    explanation: `Doğru ders bağı: ${traditionLabels024[x[1]]}; kavram türü: ${categoryLabels024[x[2]]}. Bir eşleşme ötekinin yerini tutmaz. ${shared ? "Ortak üst özellikten belirli din veya mezhep sonucu çıkmaz." : "Bu kartın ilişkisi, bütün kişilerin niyetini veya günlük pratiğini ölçmez."}`,
  };
}
export const institutionLabels024 = [
  "Rasathane",
  "Şifahane",
  "Dârülhadis",
  "Kütüphane",
];
export function scienceFlow024(
  translation = true,
  observation = false,
  revision = false,
  institution = 0,
): HumanitiesScene024 {
  flag024(translation);
  flag024(observation);
  flag024(revision);
  bounded024(institution, 4);
  const statements = [
    translation
      ? "Eski astronomi metninin başka dile çevrildiği kayıtlı."
      : "Çeviri kaydı yok.",
    observation
      ? "Yeni gök konumu ölçümleri kayıtlı."
      : "Yeni gök konumu ölçümü verilmedi.",
    revision
      ? "Eski cetveldeki değerlerin değiştiği söyleniyor."
      : "Cetvel düzeltmesi belirtilmedi.",
  ];
  const result = revision
    ? observation
      ? "Yeni gözleme dayalı cetvel düzeltmesi"
      : "Düzeltme iddiasında yeni gözlem kanıtı eksik"
    : observation
      ? "Yeni gözlem var; düzeltme belirtilmedi"
      : translation
        ? "Çeviri var; yeni ölçüm verilmedi"
        : "Araştırma eylemi belirtilmedi";
  const activityLabels = [
    translation ? "Çeviri kaydı var" : "Çeviri kaydı yok",
    observation ? "Yeni ölçüm var" : "Yeni ölçüm yok",
    revision ? "Düzeltme söyleniyor" : "Düzeltme yazılı değil",
  ];
  const nodes = activityLabels.map((label, i) => ({
    id: `step-${i}`,
    label,
    detail: statements[i],
  }));
  nodes.push({
    id: "venue",
    label: institutionLabels024[institution],
    detail: "Gökyüzü konumlarını ölçme hedefi için seçilmiş kurum adayı.",
  });
  return {
    title: "Aktarım, ölçüm ve yeni katkı",
    context:
      "Kurmaca araştırma gökteki konumları ölçmeyi amaçlıyor. " +
      statements.join(" "),
    nodes,
    links: [
      {
        from: "step-0",
        to: "step-1",
        valid: observation,
        evidence: observation
          ? "Yeni gözlem, çeviriden ayrı kanıt üretir."
          : "Çeviri bulunması yeni gözlem yapıldığını kanıtlamaz.",
      },
      {
        from: "step-1",
        to: "step-2",
        valid: observation && revision,
        evidence:
          revision && !observation
            ? "Cetvel değişmiş deniyor ama modelin aradığı yeni gözlem dayanağı verilmemiş."
            : observation && revision
              ? "Yeni veri, cetveldeki düzeltmeye dayanak olarak verilmiş."
              : "Yeni gözlem ve cetvel düzeltmesi ayrı ayrı kontrol edilir.",
      },
      {
        from: "venue",
        to: "step-1",
        valid: institution === 0,
        evidence:
          institution === 0
            ? "Rasathane gök gözlemi için doğrudan uygun kurumdur."
            : `${institutionLabels024[institution]} adı tek başına gök gözleminin kurum tanımı değildir; ${institution === 1 ? "hasta bakımı" : institution === 2 ? "hadis uzmanlığı" : "eserlerin korunması ve erişim"} odağı vardır.`,
      },
    ],
    result,
    explanation:
      result +
      ". Çeviri, gözlem ve düzeltme aynı işlem değildir. Kayıt yok diye bu iş hiç yapılamaz denemez; kanıt sınırı yalnız bu kurmaca veriye aittir.",
  };
}
const anatoliaPeople024 = [
  [
    "Ebû Hanîfe",
    "Fıkıh ve içtihad",
    "İmam-ı Âzam adıyla hukukî düşünceye katkı; inanç görüşleri de vardır.",
  ],
  [
    "Cafer es-Sâdık",
    "Caferî fıkıh geleneği",
    "Fıkhi gelenekle İmamiye çerçevesi ilişkili ama aynı alan değildir.",
  ],
  [
    "Mâtürîdî",
    "Kelam ve tefsir",
    "Kitâbü’t-Tevhîd ve Te’vîlâtü’l-Kur’an; Semerkant çevresi.",
  ],
  ["Şâfiî", "Fıkıh usulü", "Er-Risâle ve el-Ümm eserleriyle ilişki."],
  [
    "Eş’arî",
    "Kelam",
    "Makâlâtü’l-İslâmiyyîn eserinde farklı inanç görüşlerini ele alma.",
  ],
  [
    "Ahmed Yesevî",
    "Hikmet ve Türkçe öğüt",
    "Divân-ı Hikmet; Türkistan ve Yesi yöresinde etki.",
  ],
  [
    "Mevlânâ",
    "İrfan ve edebiyat",
    "Mesnevî, Divân-ı Kebîr ve Fîhi Mâ Fîh; Konya.",
  ],
  [
    "Ahi Evran",
    "Ahilik ve meslek ahlakı",
    "Kırşehir ve esnaf için örgüt kurma.",
  ],
  [
    "Hacı Bektaş-ı Velî",
    "Ahlaki ve manevi eğitim",
    "Sulucakarahöyük; Makâlât eserinin nispeti.",
  ],
  [
    "Yunus Emre",
    "Türkçe dinî-ahlaki şiir",
    "Divan ve Risâletü’n-Nushiyye; hayatı hakkında farklı rivayetler.",
  ],
  [
    "Sarı Saltuk",
    "Anadolu-Balkan kültürel etkisi",
    "Alperen geleneği ve Saltuknâme etrafındaki menkıbeler.",
  ],
  [
    "Hacı Bayrâm-ı Velî",
    "Öğretim ve toplumsal dayanışma",
    "Ankara; Somuncu Baba ile manevi eğitim ilişkisi.",
  ],
] as const;
export const anatoliaPersonLabels024 = () => anatoliaPeople024.map((x) => x[0]);
export const anatoliaClaimLabels024 = [
  "Eser, alan veya kurum bağı",
  "Yeni şehirde yaşamış olma",
  "Yeni şehirde kültürel etki",
];
export const anatoliaRecordLabels024 = [
  "Yeni şehirde mirasının anlatılması",
  "Orada yaşadığına ilişkin kurmaca belge",
  "Yalnız bir menkıbe kaydı",
];
export function anatoliaEvidence024(
  person = 0,
  claim = 0,
  record = 0,
): HumanitiesScene024 {
  const x = anatoliaPeople024[bounded024(person, 12)];
  bounded024(claim, 3);
  bounded024(record, 3);
  const conclusion =
    claim === 0
      ? x[1]
      : claim === 1
        ? record === 1
          ? "Kurmaca ek kayıtta yaşam bilgisi var"
          : record === 0
            ? "Yaşam yeri kanıtı yok"
            : "Yaşam yeri için menkıbe tek başına yetmez"
        : record === 0
          ? "Mirasın aktarımı için kayıt var"
          : record === 1
            ? "Yaşam kaydı etkinin kapsamını ölçmez"
            : "Kültürel anlatı kaydı var";
  const valid =
    claim === 0 ||
    (claim === 1 && record === 1) ||
    (claim === 2 && record !== 1);
  const extra = [
    "Kurmaca yeni kayıt: Bu kişinin mirası adı verilmeyen yeni bir şehirde anlatılmıştır.",
    "Kurmaca yeni kayıt: Güvenilir olduğu varsayılan bir belge kişinin o yeni şehirde yaşadığını bildiriyor.",
    "Kurmaca yeni kayıt: Bu şahsiyetle ilgili bir menkıbenin yeni şehirde anlatıldığı kayıtlı; bağımsız yaşam belgesi verilmiyor.",
  ][record];
  const why =
    claim === 0
      ? "Temel karttaki eser, alan veya kurum bilgisi kendi kapsamıyla geçerlidir; ek şehir kaydı onu başka bir eserle eşitlemez."
      : claim === 1
        ? record === 1
          ? "Bu kurmaca kabul, yaşam yeri iddiasına doğrudan belge sunar; gerçek kişinin yaşam öyküsüne yeni tarihî olay eklemez."
          : "Mirasın anlatımı veya menkıbe kaydı, kişinin orada yaşadığına tek başına belge olamaz."
        : "Bir yerde mirasın anlatılması veya anlatı geleneği bulunması kültürel kayıt verir. Yaşam belgesi tek başına bütün etkinin ölçüsünü göstermez.";
  return {
    title: "Eser, yaşam yeri ve etki aynı ilişki değildir",
    context: `Temel öğretim kartı: ${x[0]}. ${x[2]} ${extra}`,
    nodes: [
      { id: "person", label: x[0], detail: x[2] },
      { id: "record", label: anatoliaRecordLabels024[record], detail: extra },
      { id: "claim", label: conclusion, detail: anatoliaClaimLabels024[claim] },
    ],
    links: [
      {
        from: "person",
        to: "record",
        valid: true,
        evidence:
          "Ek kayıt eğitim için kurmacadır; gerçek biyografiye yeni olay eklemez.",
      },
      { from: "record", to: "claim", valid, evidence: why },
    ],
    result: conclusion,
    explanation:
      why +
      " Tek bir eksendeki kanıt başka bütün ilişkilere otomatik taşınmaz.",
  };
}
